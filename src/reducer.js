//state
export const initialState = {
  notesByDay: {
    m: [],
    t: [],
    w: [],
    th: [],
    f: [],
    s: [],
    su: [],
  },
  modalOpen: false,
  addOpen: false,
  descm: "",
  titlem: "",
  editNote: {},
};

console.log(initialState);

//funkcja reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "addModal":
      return { ...state, modalOpen: !state.modalOpen };
    case "addNote":
      return { ...state, addOpen: !state.addOpen };
    case "setTitlem":
      return { ...state, titlem: action.payload };
    case "setDescm":
      return { ...state, descm: action.payload };
    case "setNotes":
      return {
        ...state,
        notesByDay: {
          ...state.notesByDay,
          [action.payload.day]: action.payload,
        },
      };
    case "clearInputs":
      return { ...state, titlem: "", descm: "" };
    case "deleteNote": {
      const { id, day } = action.payload;
      const updatedNotes = state.notesByDay[day].filter(
        (note) => note._id !== id,
      );
      return {
        ...state,
        notesByDay: { ...state.notesByDay, [day]: updatedNotes },
      };
    }
    case "setEditNote":
      return { ...state, editNote: action.payload };
    case "fetchNotes":
      return {
        ...state,
        notesByDay: {
          ...state.notesByDay,
          [action.payload.day]: action.payload.notes,
        },
      };
  }
};
export default reducer;
