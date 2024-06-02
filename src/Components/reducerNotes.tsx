export interface Note {
  _id: string;
  title: string;
  body: string;
}

export interface State {
  notesDay: Note[];
  editNote: Note | any;
}

export const initialState: State = {
  notesDay: [],
  editNote: {},
};

export type Action =
  | { type: "SET_NOTES"; payload: Note }
  | { type: "DELETE_NOTE"; payload: { id: string } }
  | { type: "SET_EDITNOTE"; payload: Note }
  | { type: "FETCH_NOTES"; payload: Note[] }
  | { type: "UPDATE_NOTE"; payload: Note };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
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
      };
    case "FETCH_NOTES":
      return {
        ...state,
        notesDay: action.payload,
      };
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
