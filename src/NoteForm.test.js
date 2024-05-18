import React from "react";
import NoteForm from "./Components/Notes";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
describe("Notes Component", () => {
  it("Should render Noest Component", () => {
    render(
      <MemoryRouter>
        <NoteForm />
      </MemoryRouter>,
    );
    screen.debug();
  });
});
