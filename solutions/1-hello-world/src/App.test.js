import { render, screen } from '@testing-library/react';
import App from './App';

describe("App", () => {
  it("should render the text \"Hello, World!\"", () => {
    render(<App />);
    const heading = screen.getByRole("heading", "Hello, World!");
    expect(heading).toBeInTheDocument();
  });
});
