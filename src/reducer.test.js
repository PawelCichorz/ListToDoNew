import reducer, { initialState } from "./reducer";

describe("reducer", () => {
  it("should return the initial state", () => {
    console.log("Initial state:", initialState);
    expect(reducer(initialState, {})).toEqual({
      notesDay: [],
      modalOpen: false,
      addOpen: false,
      desc: "",
      title: "",
      editNote: {},
      editNoteTitle: "",
      editNoteDesc: "",
    });
  });

  it("should handle UPDATE_NOTE", () => {
    const initialState = {
      notesDay: [
        { _id: 1, content: "Note 1" },
        { _id: 2, content: "Note 2" },
      ],
    };

    const action = {
      type: "UPDATE_NOTE",
      payload: { _id: 2, content: "Updated Note 2" },
    };

    const expectedState = {
      notesDay: [
        { _id: 1, content: "Note 1" },
        { _id: 2, content: "Updated Note 2" },
      ],
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it("should not update the state if note id does not match", () => {
    const initialState = {
      notesDay: [
        { _id: 1, content: "Note 1" },
        { _id: 2, content: "Note 2" },
      ],
    };

    const action = {
      type: "UPDATE_NOTE",
      payload: { _id: 3, content: "New Note" },
    };

    expect(reducer(initialState, action)).toEqual(initialState);
  });
});
