import { render, screen, waitFor, within } from "@testing-library/react";
import { Pokedex } from "./Pokedex";
import * as adapters from "./adapters/storageAdapter";
import { makeServerReturnAStatusOf, makeServerReturnThreePokemon } from "./mockServiceWorker";

afterEach(() => {
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
      const getPokemonSpy = jest.spyOn(adapters, "getPokemon");
      render(<Pokedex />);
      expect(getPokemonSpy).toHaveBeenCalledTimes(1);
   });
});

describe("given we have sent off the request for the pokemon", () => {      
   describe("when there is a 400 error status", () => {         
      it("should display a status with the error message", async () => {   
         makeServerReturnAStatusOf(404);
         render(<Pokedex />);
         await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Not Found"));
      });
   });
   
   describe("when there is a 500 error status", () => {        
      it("should display a status with the error message", async () => {
         makeServerReturnAStatusOf(500);
         render(<Pokedex />);
         await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Internal Server Error"));
      });
   });

   describe("when there is a valid response", () => {         
      let pokemonList;   
   
      beforeEach(async () => {
         makeServerReturnThreePokemon();
         render(<Pokedex />);
         pokemonList = await screen.findByRole("list");
      });
      
      it("should display a list to contain the pokemon", async () => {
         await waitFor(() => expect(screen.getByRole("list")).toBeInTheDocument());
      });

      it("should display one card for each pokemon in that list", async () => {
         await waitFor(() => expect(screen.getAllByRole("listitem")).toHaveLength(3));
      });
   
      it("should display the pokemon's name in its card", () => {
         const pokemonNameElements = within(pokemonList).getAllByRole("heading");

         expect(pokemonNameElements[0].textContent).toBe("bulbasaur");
         expect(pokemonNameElements[1].textContent).toBe("ivysaur");
         expect(pokemonNameElements[2].textContent).toBe("venusaur");
      });

      it("should display the pokemon's id in its card", () => {
         expect(within(pokemonList).getByText("1")).toBeInTheDocument();
         expect(within(pokemonList).getByText("2")).toBeInTheDocument();
         expect(within(pokemonList).getByText("3")).toBeInTheDocument();
      });
   });
});
