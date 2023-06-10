import { describe, expect, vi, test } from "vitest";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import PersonList from "./PersonList";

vi.mock("axios");

describe("PersonList", () => {
  test("renders person data", async () => {
    const mockPersons = [
      {
        id: 1,
        name: "John Doe",
        username: "johndoe",
        website: "johndoe.com",
        company: {
          name: "Company JD",
        },
      },
      {
        id: 2,
        name: "Jane Smith",
        username: "janesmith",
        website: "janesmith.com",
        company: {
          name: "Company JM",
        },
      },
    ];

    (axios.get as jest.Mock).mockResolvedValue({ data: mockPersons });

    render(<PersonList />);

    // Wait for the data to be loaded
    await screen.findAllByRole("row");

    // Assert that the person data is rendered correctly
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("johndoe")).toBeInTheDocument();
    expect(screen.getByText("johndoe.com")).toBeInTheDocument();
    expect(screen.getByText("Company JD")).toBeInTheDocument();

    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("janesmith")).toBeInTheDocument();
    expect(screen.getByText("janesmith.com")).toBeInTheDocument();
    expect(screen.getByText("Company JM")).toBeInTheDocument();
  });

  test("displays error message on request failure", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("Request failed"));

    render(<PersonList />);

    // Wait for the error message to be rendered
    const errorMessage = await screen.findByText("Error retrieving data");

    // Assert that the error message is displayed
    expect(errorMessage).toBeInTheDocument();
  });
});
