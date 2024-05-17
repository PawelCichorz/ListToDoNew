export const initialState = {
  notesDay: [],
  modalOpen: false,
  addOpen: false,
  desc: "",
  title: "",
  editNote: {},
  editNoteTitle: "",
  editNoteDesc: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MODAL_OPEN":
      return { ...state, modalOpen: !state.modalOpen };
    case "ADD_NOTE":
      return { ...state, addOpen: action.payload, title: "", desc: "" };
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_DESC":
      return { ...state, desc: action.payload };
    case "SET_NOTES":
      return {
        ...state,
        notesDay: [...state.notesDay, action.payload],
      };
    case "DELETE_NOTE": {
      const { id } = action.payload;
      const updatedNotes = state.notesDay.filter((note) => note._id !== id);
      return { ...state, notesDay: updatedNotes };
    }
    case "SET_EDITNOTE":
      return {
        ...state,
        editNote: action.payload,
        editNoteTitle: action.payload.title,
        editNoteDesc: action.payload.body,
      };
    case "FETCH_NOTES":
      return {
        ...state,
        notesDay: action.payload,
      };
    case "SET_EDITNOTE_TITLE": {
      return { ...state, editNoteTitle: action.payload };
    }
    case "SET_EDITNOTE_DESC": {
      return { ...state, editNoteDesc: action.payload };
    }
    case "UPDATE_NOTE": {
      const updatedNotes = state.notesDay.map((note) =>
        note._id === action.payload._id ? action.payload : note,
      );
      return {
        ...state,
        notesDay: updatedNotes,
      };
    }
  }
};
export default reducer;
