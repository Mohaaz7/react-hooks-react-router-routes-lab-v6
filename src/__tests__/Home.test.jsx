import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import Home from "../pages/Home";
import movies from "../data"; // or mock data
import App from "../App";

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: () => Promise.resolve(movies),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("fetches movies data on mount", async () => {
  const routes = [
    {
      path: "/",
      element: <Home />,
    },
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
  });

  render(<RouterProvider router={router} />);

  // ✅ Correct URL expected
  expect(global.fetch).toHaveBeenCalledWith("http://localhost:4000/movies");

  for (const movie of movies) {
    await waitFor(() => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });
  }
});
