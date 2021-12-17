import { render, screen, waitFor } from "@testing-library/react";
import { Pokedex } from "./Pokedex";
import * as adapters from "./adapters/storageAdapter";
import { server } from "./mockServiceWorker";
import { rest } from "msw";

let getPokemonSpy;

afterEach(async () => {
   jest.restoreAllMocks();
});

describe("when the pokemon have yet to become available to the client", () => {     
   it("should render some status text", () => {
      render(<Pokedex />);
      expect(screen.getByRole("status")).toBeInTheDocument();
   });

   it("should render some status text saying \"loading...\"", () => {
      render(<Pokedex />);
      expect(screen.getByRole("status").textContent).toBe("loading...");
   });

   it("should make one attempt to get the pokemon data", () => {
      getPokemonSpy = jest.spyOn(adapters, "getPokemon");
      render(<Pokedex />);
      expect(getPokemonSpy).toHaveBeenCalledTimes(1);
   });
});

describe("given we have sent off the request for the pokemon", () => {      
   describe("when there is an error response", () => {         
      it("should display a status with the error message", async () => {
         server.use(rest.get("https://pokeapi.co/api/v2/pokemon/", (_, res, ctx) => {
            return res(ctx.status(500));
         }));
         render(<Pokedex />);
         await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Internal Server Error"));
      });
   });
});

