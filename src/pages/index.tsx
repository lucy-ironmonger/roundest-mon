import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { inferQueryResponse } from "./api/trpc/[trpc]";

const btn = "bg-purple-500 border rounded mt-8";

export default function Home() {
  const [ids, updateIds] = useState(() => getOptionsForVote());
  const [first, second] = ids;

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: first }]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }]);

  const voteForRoundest = (selected: number) => {
    // persist data
    updateIds(getOptionsForVote());
  };

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="text-2xl text-center">Which Pokémon is Rounder?</div>
        <div className="p-8 flex justify-between items-center max-w-2xl">
          {!firstPokemon.isLoading &&
            !secondPokemon.isLoading &&
            // adding in firstPokemon.data stopped a potentially undefined
            // error with pokemon prop on PokemonListing
            firstPokemon.data &&
            secondPokemon.data && (
              <>
                <PokemonListing
                  pokemon={firstPokemon.data}
                  vote={() => voteForRoundest(first)}
                />
                <div className="p-8">Vs</div>
                <div className="w-64 h-64 flex flex-col"></div>
                <PokemonListing
                  pokemon={secondPokemon.data}
                  vote={() => voteForRoundest(second)}
                />
                <div className="m-2" />
              </>
            )}
        </div>
      </div>
    </>
  );
}

// We have an API we hit - get pokemon by id
// We hit it with an object, in it is a key of INPUT, the value of which is another object, the key in it is ID
// We pass this ID into the Pokemon API and resolve by returning an object with
// Pokemon NAME and Sprites
// PokemonFromServer represents this returned response
type PokemonFromServer = inferQueryResponse<"get-pokemon-by-id">;

// Our PokemonListing is of type React Functional Component - it is a piece of JSX
// The <> after React.FC are the types of props it takes
// the pokemon is of type PokemonFromServer (eg the object with name and sprites in it)
// The vote is what we'll call with the button
const PokemonListing: React.FC<{
  pokemon: PokemonFromServer;
  vote: () => void;
}> = (props) => {
  return (
    <>
      <div className="w-64 h-64 flex flex-col">
        <img src={props.pokemon.sprites.front_default!} className="w-full" />
        <div className="text-xl text-center capitalize mt-[1rem]">
          {props.pokemon.name}
        </div>
        <button
          className={btn}
          onClick={() => {
            props.vote();
          }}
        >
          Rounder
        </button>
      </div>
    </>
  );
};
