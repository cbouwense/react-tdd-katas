import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { Pokedex } from "./Pokedex";
import { getPokemon } from "./adapters/storageAdapter";

jest.mock("./adapters/storageAdapter");

describe("given the pokemon data is not available to the client", () => {
   describe("when the pokemon have yet to become available to the client", () => {
      beforeEach(() => {
         getPokemon.mockResolvedValue("mock res");
      });
      
      it("should render a status indicating that the page is loading pokemon", async () => {
         render(<Pokedex />);
         expect(screen.getByRole("status")).toBeInTheDocument();
         await waitForElementToBeRemoved(() => screen.getByRole("status"));
      });

      it("should render that status with the text \"loading...\"", async () => {
         render(<Pokedex />);
         expect(screen.getByRole("status").textContent).toBe("loading...");
         await waitForElementToBeRemoved(() => screen.getByRole("status"));
      });

      it("should request the pokemon once", async () => {
         render(<Pokedex />);
         expect(getPokemon).toHaveBeenCalledTimes(1);
         await waitForElementToBeRemoved(() => screen.getByRole("status"));
      });
   });
});
