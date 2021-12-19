import { setupServer } from "msw/node";
import { rest } from "msw";

export const mockResponseData = {
   successWithThreePokemon: {
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
   },
   bulbasaur: {
      "id": 1,
      "name": "bulbasaur",
      "sprites": {
         "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      },
      "types": [
            {
               "slot": 1,
               "type": {
                  "name": "grass",
                  "url": "https://pokeapi.co/api/v2/type/12/"
               }
            },
            {
               "slot": 2,
               "type": {
                  "name": "poison",
                  "url": "https://pokeapi.co/api/v2/type/4/"
               }
            }
      ],
   },
   ivysaur: {
      "id": 2,
      "name": "ivysaur",
      "sprites": {
         "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
      },
      "types": [
            {
               "slot": 1,
               "type": {
                  "name": "grass",
                  "url": "https://pokeapi.co/api/v2/type/12/"
               }
            },
            {
               "slot": 2,
               "type": {
                  "name": "poison",
                  "url": "https://pokeapi.co/api/v2/type/4/"
               }
            }
      ],
   },
   venusaur: {
      "id": 3,
      "name": "venusaur",
      "sprites": {
         "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      },
      "types": [
          {
              "slot": 1,
              "type": {
                  "name": "grass",
                  "url": "https://pokeapi.co/api/v2/type/12/"
              }
          },
          {
              "slot": 2,
              "type": {
                  "name": "poison",
                  "url": "https://pokeapi.co/api/v2/type/4/"
              }
          }
      ],
   }
};

export const server = setupServer(
   rest.get(
      "https://pokeapi.co/api/v2/pokemon/", 
      (_, res, ctx) => res(ctx.json(mockResponseData.successWithThreePokemon))
   ),
   rest.get(
      "https://pokeapi.co/api/v2/pokemon/1/", 
      (_, res, ctx) => res(ctx.json(mockResponseData.bulbasaur))
   ),
   rest.get(
      "https://pokeapi.co/api/v2/pokemon/2/", 
      (_, res, ctx) => res(ctx.json(mockResponseData.ivysaur))
   ),
   rest.get(
      "https://pokeapi.co/api/v2/pokemon/3/", 
      (_, res, ctx) => res(ctx.json(mockResponseData.venusaur))
   ),
);

export const makeServerReturnAStatusOf = (statusCode) => {
   server.use(
      rest.get(
         "https://pokeapi.co/api/v2/pokemon/", 
         (_, res, ctx) => res(ctx.status(statusCode))
      )
   );
};

export const makeServerReturnThreePokemon = () => {
   server.use(
      rest.get(
         "https://pokeapi.co/api/v2/pokemon/", 
         (_, res, ctx) => res(ctx.json(mockResponseData.successWithThreePokemon))
      )
   );
}
