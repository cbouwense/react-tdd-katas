import { render, screen, waitFor, within } from "@testing-library/react";
import { Pokedex } from "./Pokedex";
import * as adapters from "./adapters/storageAdapter";
import { makeServerReturnAStatusOf, makeServerReturnThreePokemon } from "./mockServiceWorker";

const silenceErrorConsole = () => {
   window.console.error = jest.fn();
}

const originalErrorLog = window.console.error;

afterEach(() => {
   jest.restoreAllMocks();
   window.console.error = originalErrorLog; 
});

describe("when the pokemon have yet to become available to the client", () => {     
   let getPokemonListSpy;

   beforeEach(() => {
      getPokemonListSpy = jest.spyOn(adapters, "getPokemonList");
      render(<Pokedex />);
   });
   
   it("should render some status text", () => {
      expect(screen.getByRole("status")).toBeInTheDocument();
   });

   it("should render some status text saying \"loading...\"", () => {
      expect(screen.getByRole("status").textContent).toBe("loading...");
   });

   it("should make one attempt to get the pokemon data", () => {
      expect(getPokemonListSpy).toHaveBeenCalledTimes(1);
   });
});

describe("given we have sent off the request for the pokemon", () => {      
   describe("when there is a 400 error status", () => {         
      it("should display a status with the error message", async () => {   
         silenceErrorConsole();
         makeServerReturnAStatusOf(404);
         render(<Pokedex />);
         await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Not Found"));
      });
   });
   
   describe("when there is a 500 error status", () => {        
      it("should display a status with the error message", async () => {
         silenceErrorConsole();
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

      it("should display a comma-separated list of the pokemon's types in its card", () => {
         expect(within(pokemonList).getAllByText("grass, poison")).toHaveLength(3);
      });

      it("should display an image of the pokemon's default sprite in its card", () => {
         const sprites = within(pokemonList).getAllByRole("img");

         expect(sprites[0]).toBeInTheDocument();
         expect(sprites[0]).toHaveAttribute("src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png");
         expect(sprites[0]).toHaveAttribute("alt", "bulbasaur default front sprite");
         expect(sprites[1]).toBeInTheDocument();
         expect(sprites[1]).toHaveAttribute("src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png");
         expect(sprites[1]).toHaveAttribute("alt", "ivysaur default front sprite");
         expect(sprites[2]).toBeInTheDocument();
         expect(sprites[2]).toHaveAttribute("src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png");
         expect(sprites[2]).toHaveAttribute("alt", "venusaur default front sprite");
      });
   });
});
