import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import Directors from "../pages/Directors";
import directors from "../data/directors"; // mock or import

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: () => Promise.resolve(directors),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("fetches and renders director data on mount", async () => {
  const router = createMemoryRouter([
    {
      path: "/directors",
      element: <Directors />,
    },
  ], {
    initialEntries: ["/directors"],
  });

  render(<RouterProvider router={router} />);

  // ✅ Correct fetch expectation
  expect(global.fetch).toHaveBeenCalledWith("http://localhost:4000/directors");

  for (const director of directors) {
    await waitFor(() => {
      expect(screen.getByText(director.name)).toBeInTheDocument();
    });
  }
});
