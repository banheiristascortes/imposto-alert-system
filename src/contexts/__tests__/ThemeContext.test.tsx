import { render, screen, fireEvent } from "@testing-library/react";
import { useTheme, ThemeProvider } from "../ThemeContext";
import { act } from "react-dom/test-utils";

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <div data-testid="theme-value">{theme}</div>
      <button onClick={toggleTheme} data-testid="theme-toggle">
        Toggle Theme
      </button>
    </div>
  );
};

describe("ThemeContext", () => {
  beforeEach(() => {
    localStorage.clear();
    
    document.documentElement.classList.remove("light", "dark");
  });

  it("provides default theme as light", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
    expect(document.documentElement.classList.contains("light")).toBeTruthy();
  });

  it("toggles theme between light and dark", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByTestId("theme-toggle");

    expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
    expect(document.documentElement.classList.contains("light")).toBeTruthy();

    act(() => {
      fireEvent.click(toggleButton);
    });

    expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
    expect(document.documentElement.classList.contains("dark")).toBeTruthy();
    expect(document.documentElement.classList.contains("light")).toBeFalsy();
    expect(localStorage.getItem("theme")).toBe("dark");

    act(() => {
      fireEvent.click(toggleButton);
    });

    expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
    expect(document.documentElement.classList.contains("light")).toBeTruthy();
    expect(document.documentElement.classList.contains("dark")).toBeFalsy();
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("uses theme from localStorage if available", () => {
    localStorage.setItem("theme", "dark");

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
    expect(document.documentElement.classList.contains("dark")).toBeTruthy();
  });

  it("throws error when useTheme is used outside of ThemeProvider", () => {
    const consoleSpy = jest.spyOn(console, "error");
    consoleSpy.mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      "useTheme must be used within a ThemeProvider"
    );

    consoleSpy.mockRestore();
  });
});