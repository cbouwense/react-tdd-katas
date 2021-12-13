import { render, screen } from '@testing-library/react';
import App from './App';

describe("App", () => {
   beforeEach(() => {
      render(<App />);
   });

   it("should render \"Counter: \"", () => {
      const counter = screen.getByRole("heading", { name: /Counter: /, });
      expect(counter).toBeInTheDocument();
   });

   it("should render a button with the name \"-\"", () => {
      const button = screen.getByRole("button", { name: "-" });
      expect(button).toBeInTheDocument(); 
   });

   it("should render a button with the name \"+\"", () => {
      const button = screen.getByRole("button", { name: "+" });
      expect(button).toBeInTheDocument(); 
   });

   describe("before the user has interacted with the page", () => {
      it("should display a counter value with a role of \"status\"", () => {
         const counterValue = screen.getByRole("status");
         expect(counterValue).toBeInTheDocument();
      });

      it("should display a counter value of \"0\"", () => {
         const counterValue = screen.getByRole("status");
         expect(counterValue.textContent).toBe("0");
      });
   });
});
