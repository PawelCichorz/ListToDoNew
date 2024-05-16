export const initialState = {
  notesDay: [],
  modalOpen: false,
  addOpen: false,
  descm: "",
  titlem: "",
  editNote: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGLLE_MODAL":
      return { ...state, modalOpen: !state.modalOpen };
    case "ADD_NOTE":
      return { ...state, addOpen: action.payload, titlem: "", descm: "" };
    case "SET_TITLE":
      return { ...state, titlem: action.payload };
    case "SET_DESC":
      return { ...state, descm: action.payload };
    case "SET-NOTES":
      return {
        ...state,
        notesDay: action.payload,
      };
    case "DELETE_NOTE": {
      const { id } = action.payload;
      const updatedNotes = state.notesDay.filter((note) => note._id !== id);
      return { ...state, notesDay: updatedNotes };
    }
    case "SET_EDITNOTE":
      return { ...state, editNote: action.payload };
    case "UPDATE_NOTES":
      return {
        ...state,
        notesDay: action.payload,
      };
  }
};
export default reducer;
