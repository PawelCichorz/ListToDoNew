export interface Note {
  _id: string;
  title: string;
  body: string;
}

export interface State {
  notesDay: Note[];
  modalOpen: boolean;
  addOpen: boolean;
  desc: string;
  title: string;
  editNote: Note | any;
  editNoteTitle: string;
  editNoteDesc: string;
}

export const initialState: State = {
  notesDay: [],
  modalOpen: false,
  addOpen: false,
  desc: "",
  title: "",
  editNote: {},
  editNoteTitle: "",
  editNoteDesc: "",
};

export type Action =
  | { type: "SET_MODAL_OPEN" }
  | { type: "ADD_NOTE"; payload: boolean }
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_DESC"; payload: string }
  | { type: "SET_NOTES"; payload: Note }
  | { type: "DELETE_NOTE"; payload: { id: string } }
  | { type: "SET_EDITNOTE"; payload: Note }
  | { type: "FETCH_NOTES"; payload: Note[] }
  | { type: "SET_EDITNOTE_TITLE"; payload: string }
  | { type: "SET_EDITNOTE_DESC"; payload: string }
  | { type: "UPDATE_NOTE"; payload: Note };

const reducer = (state: State, action: Action) => {
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
