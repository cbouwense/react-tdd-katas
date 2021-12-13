import { render, screen } from '@testing-library/react';
import App from './App';

it("should render \"Counter: \"", () => {
   render(<App />);
   const counterText = screen.getByRole("heading", /Counter: /i);
   expect(counterText).toBeInTheDocument();
});
