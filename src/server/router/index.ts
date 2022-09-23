import * as trpc from "@trpc/server";
import { z } from "zod";

// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";

export const appRouter = trpc.router().query("hello", {
  input: z.object({ text: z.string().nullish() }).nullish(),
  resolve({ input }) {
    return {
      greeting: `hello ${input?.text ?? "world"}`,
    };
  },
});
// export const appRouter = createRouter()
//   .transformer(superjson)
//   .merge("example.", exampleRouter)
//   .merge("auth.", protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
