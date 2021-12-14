import { render, screen, waitFor } from "@testing-library/react";
import { Pokedex } from "./Pokedex";
import { getPokemon } from "./adapters/storageAdapter";

jest.mock("./adapters/storageAdapter");

beforeAll(() => {
   jest.useFakeTimers();
});

afterAll(() => {
   jest.useRealTimers();
});

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
         getPokemon.mockResolvedValue([]);
         await waitFor(() => expect(getPokemon).toHaveBeenCalledTimes(1));
      });
   });

   xdescribe("when the pokemon have become available to the client", () => {
      beforeEach(() => {
         render(<Pokedex />);
         loadingStatus = screen.getByRole("status");
      });
      
      it("should stop rendering the loading status", () => {
         expect(loadingStatus).not.toBeInTheDocument();
      });
   });
});
