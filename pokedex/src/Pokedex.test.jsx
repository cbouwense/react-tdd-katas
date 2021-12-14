import { render, screen } from "@testing-library/react";
import { Pokedex } from "./Pokedex";
import { getPokemon } from "./services/storageAdapter";

jest.mock("./services/storageAdapter", () => ({ 
   getPokemon: jest.fn(),
}));

describe("given the pokemon data is not available to the client", () => {
   describe("when the pokemon have yet to become available to the client", () => {
      let loadingStatus;
      
      beforeEach(() => {
         render(<Pokedex />);
         loadingStatus = screen.getByRole("status");
      });
      
      it("should render a status indicating that the page is loading pokemon", () => {
         expect(loadingStatus).toBeInTheDocument();
      });

      it("should render that status with the text \"loading...\"", () => {
         expect(loadingStatus.textContent).toBe("loading...");
      });

      it("should request the pokemon once", () => {
         expect(getPokemon).toHaveBeenCalledTimes(1);
      });
   });
});
