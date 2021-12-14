import { render, screen } from '@testing-library/react';
import App from './App';

describe("given the pokemon data is not available client-side", () => {
   describe("when the page is viewed", () => {
      it("should render a status indicating that the page is loading pokemon", () => {
         render(<App />);
         expect(screen.getByRole("status")).toBeInTheDocument();
      });

      it("should render that status with the text \"loading...\"", () => {
         render(<App />);
         expect(screen.getByRole("status").textContent).toBe("loading...");
      });
   });
});