import { act, render, screen } from "@testing-library/react";
import { Pokedex } from "./Pokedex";
import { getPokemon } from "./adapters/storageAdapter";

jest.mock("./adapters/storageAdapter");

const flushRemainingComponentUpdatesToAvoidActWarnings = async () => {
   await act(() => Promise.resolve());
};

describe("Pokedex", () => {
   beforeEach(() => {
      getPokemon.mockResolvedValue("mock pokemon data");
   });

   describe("when the pokemon have yet to become available to the client", () => {     
      it("should render some status text", async () => {
         render(<Pokedex />);
         expect(screen.getByRole("status")).toBeInTheDocument();
         await flushRemainingComponentUpdatesToAvoidActWarnings();
      });

      it("should render some status text saying \"loading...\"", async () => {
         render(<Pokedex />);
         expect(screen.getByRole("status").textContent).toBe("loading...");
         await flushRemainingComponentUpdatesToAvoidActWarnings();
      });
   
      it("should make one attempt to get the pokemon data", async () => {
         render(<Pokedex />);
         expect(getPokemon).toHaveBeenCalledTimes(1);
         await flushRemainingComponentUpdatesToAvoidActWarnings();
      });
   });

   describe("when the pokemon has become available to the client", () => {
      beforeEach(async () => {
         render(<Pokedex />);
         await flushRemainingComponentUpdatesToAvoidActWarnings();
      });
      
      it("should render some status text", () => {
         expect(screen.getByRole("status")).toBeInTheDocument();
      });

      it("should render some status text saying \"done!\"", () => {
         expect(screen.getByRole("status").textContent).toBe("done!");
      });
   });
});
