import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  return (
    <>
      <Head>
        <title>Roundest Mon</title>
        <meta name="description" content="The roundest pokemon!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="h-screen w-screen flex flex-col justify-center items-center">
          <div className="text-2xl text-center">Which Pokémon is Rounder?</div>
          <div className="p-2"></div>
          <div className="bg-pink-400 border rounded p-8 flex justify-between items-center max-w-2xl">
            <div className="w-16 h-16 bg-red-200"></div>
            <div className="p-8">Vs</div>
            <div className="w-16 h-16 bg-red-200"></div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

// type TechnologyCardProps = {
//   name: string;
//   description: string;
//   documentation: string;
// };

// const TechnologyCard = ({
//   name,
//   description,
//   documentation,
// }: TechnologyCardProps) => {
//   return (
//     <section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105">
//       <h2 className="text-lg text-gray-700">{name}</h2>
//       <p className="text-sm text-gray-600">{description}</p>
//       <a
//         className="mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2"
//         href={documentation}
//         target="_blank"
//         rel="noreferrer"
//       >
//         Documentation
//       </a>
//     </section>
//   );
// };
