import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
//page
import Home from "@/app/(site)/page";
//mock session, router
jest.mock("next-auth/react");
jest.mock("next/navigation");

describe("Home Page", () => {
  it("Should render title element & contain chit chat", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Chit Chat");
  });

  it("Should render create an account element", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Create an account");
  });
});
