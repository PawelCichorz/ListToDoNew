//state
export const initialState = {
  notesDay: [],
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
    case "ADD_MODAL":
      return { ...state, modalOpen: !state.modalOpen };
    case "ADD_NOTE":
      return { ...state, addOpen: !state.addOpen };
    case "SET_TITLE":
      return { ...state, titlem: action.payload };
    case "SET_DESC":
      return { ...state, descm: action.payload };
    case "SET-NOTES":
      return {
        ...state,
        notesDay: action.payload.notes,
      };
    case "CLEAR_INPUTS":
      return { ...state, titlem: "", descm: "" };
    case "DELETE_NOTE": {
      const { id } = action.payload;
      const updatedNotes = state.notesDay.filter((note) => note._id !== id);
      return { ...state, notesDay: updatedNotes };
    }
    case "SET_EDITNOTE":
      return { ...state, editNote: action.payload };
    case "FETCH_NOTES":
      return {
        ...state,
        notesDay: action.payload.notes,
      };
  }
};
export default reducer;
