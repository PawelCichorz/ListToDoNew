export interface Note {
  _id: string;
  title: string;
  body: string;
}

export interface State {
  notesDay: Note[];
  modalOpen: boolean;
  desc: string;
  title: string;
  editNote: Note | any;
  editNoteTitle: string;
  editNoteDesc: string;
  isEditing: boolean;
}

export const initialState: State = {
  notesDay: [],
  modalOpen: false,
  desc: "",
  title: "",
  editNote: {},
  editNoteTitle: "",
  editNoteDesc: "",
  isEditing: false,
};

export type Action =
  | { type: "SET_MODAL_OPEN" }
  | { type: "CLEAR_INPUT" }
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_DESC"; payload: string }
  | { type: "SET_NOTES"; payload: Note }
  | { type: "DELETE_NOTE"; payload: { id: string } }
  | { type: "SET_EDITNOTE"; payload: Note }
  | { type: "FETCH_NOTES"; payload: Note[] }
  | { type: "SET_EDITNOTE_TITLE"; payload: string }
  | { type: "SET_EDITNOTE_DESC"; payload: string }
  | { type: "UPDATE_NOTE"; payload: Note }
  | { type: "SET_IS_EDITING"; payload: boolean };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_MODAL_OPEN":
      return { ...state, modalOpen: !state.modalOpen };
    case "CLEAR_INPUT":
      return { ...state, title: "", desc: "" };
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
    case "SET_IS_EDITING":
      return { ...state, isEditing: action.payload };
  }
};
export default reducer;
