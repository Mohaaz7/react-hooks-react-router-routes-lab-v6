import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import Actors from "../pages/Actors";
import actors from "../data/actors"; // mock this data or import it
import App from "../App";

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: () => Promise.resolve(actors),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("fetches and renders actor data on mount", async () => {
  const router = createMemoryRouter([
    {
      path: "/actors",
      element: <Actors />,
    },
  ], {
    initialEntries: ["/actors"],
  });

  render(<RouterProvider router={router} />);

  // ✅ Match what the component actually fetches
  expect(global.fetch).toHaveBeenCalledWith("http://localhost:4000/actors");

  for (const actor of actors) {
    await waitFor(() => {
      expect(screen.getByText(actor.name)).toBeInTheDocument();
    });
  }
});
