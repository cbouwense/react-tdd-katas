import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { Pokedex } from "./Pokedex";
import { getPokemon } from "./adapters/storageAdapter";

jest.mock("./adapters/storageAdapter");

describe("given the pokemon data is not available to the client", () => {
   let loadingStatus;
   
   describe("when the pokemon have yet to become available to the client", () => {
      beforeEach(() => {
         render(<Pokedex />);
         loadingStatus = screen.getByRole("status");
      });
      
      it("should render a status indicating that the page is loading pokemon", async () => {
         expect(loadingStatus).toBeInTheDocument();
      });

      it("should render that status with the text \"loading...\"", () => {
         expect(loadingStatus.textContent).toBe("loading...");
      });

      it("should request the pokemon once", async () => {
         await waitFor(() => expect(getPokemon).toHaveBeenCalledTimes(1));
      });
   });
});
