import { setupServer } from "msw/node";
import { rest } from "msw";

export const server = setupServer(
   rest.get("https://pokeapi.co/api/v2/pokemon/", (_, res, ctx) => {
      return res(ctx.json(
         {
            "count": 1118,
            "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
            "previous": null,
            "results": [
                {
                    "name": "bulbasaur",
                    "url": "https://pokeapi.co/api/v2/pokemon/1/"
                },
                {
                    "name": "ivysaur",
                    "url": "https://pokeapi.co/api/v2/pokemon/2/"
                },
                {
                    "name": "venusaur",
                    "url": "https://pokeapi.co/api/v2/pokemon/3/"
                },
            ]
        }
      ));
   }),
);
