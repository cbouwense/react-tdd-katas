import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

   describe("when the user clicks on the decrement button", () => {
      it("should subtract one from the counter value", async () => {
         const decrementButton = screen.getByRole("button", { name: "-" });

         fireEvent.click(decrementButton);
         await waitFor(() => screen.getByRole("status"));

         expect(screen.getByRole("status").textContent).toBe("-1");
      });
   });

   describe("when the user clicks on the increment button", () => {
      it("should add one to the counter value", async () => {
         const incrementButton = screen.getByRole("button", { name: "+" });

         fireEvent.click(incrementButton);
         await waitFor(() => screen.getByRole("status"));

         expect(screen.getByRole("status").textContent).toBe("1");
      });
   });
});
