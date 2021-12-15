import { act, render, screen } from "@testing-library/react";
import { Pokedex } from "./Pokedex";
import { getPokemon } from "./adapters/storageAdapter";

jest.mock("./adapters/storageAdapter");

const remainingComponentUpdatesToAvoidActWarnings = async () => {
   await act(async () => { await Promise.resolve() });
}

describe("Pokedex", () => {
   describe("when the pokemon have yet to become available to the client", () => {
      beforeEach(() => {
         getPokemon.mockResolvedValue("mock pokemon data");
      });
      
      it("should render some status text saying \"loading...\"", async () => {
         render(<Pokedex />);
         expect(screen.getByRole("status").textContent).toBe("loading...");
         await remainingComponentUpdatesToAvoidActWarnings();
      });
   
      it("should make one attempt to get the pokemon data", async () => {
         render(<Pokedex />);
         expect(getPokemon).toHaveBeenCalledTimes(1);
         await remainingComponentUpdatesToAvoidActWarnings();
      });
   });
});
