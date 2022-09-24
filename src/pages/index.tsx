import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

export default function Home() {
  const [ids, updateIds] = useState(() => getOptionsForVote());

  const [first, second] = ids;

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: first }]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }]);

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

  console.log(firstPokemon.data);
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokémon is Rounder?</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
        <div className="w-64 h-64 bg-red-800">
          <img
            src={firstPokemon.data?.sprites.front_default}
            className="w-full"
          ></img>
        </div>
        <div className="p-8">Vs</div>
        <div className="w-64 h-64 bg-red-800">
          <img
            src={secondPokemon.data?.sprites.front_default}
            className="w-full"
          ></img>
        </div>
      </div>
    </div>
  );
}

// Warning: Text content did not match. Server: "207" Client: "107"
// The useState runs on the server AND the client, so they have different default values
// The quick fix is to have :

// export getServerSideProps - in there defining the defaults and passing those in as props to Home
// and only updating after a vote
