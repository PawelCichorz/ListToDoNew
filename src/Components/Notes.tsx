import React, { useReducer } from "react";
import NoteForm from "./NoteForm";
import NotesList from "./NotesList";
import {
  addNoteBackend,
  editNoteBackend,
  deleteNoteBackend,
  fetchNotesBackend,
} from "../backend";
import reducer, { initialState } from "./reducerNotes";
import "./Notes.css";

type NotesProps = {
  day: string;
  dayTitle: string;
};

interface Note {
  _id: string;
  title: string;
  body: string;
}

function Notes(props: NotesProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function fetchNotes() {
    const notes = await fetchNotesBackend(props.day);
    dispatch({ type: "FETCH_NOTES", payload: notes });
  }

  const openModaltoAdd = () => {
    dispatch({ type: "SET_MODAL_OPEN" });

    dispatch({ type: "SET_IS_EDITING", payload: false });
    dispatch({
      type: "SET_EDITNOTE",
      payload: { _id: "", title: "", body: "" },
    });
  };

  const addNote = async () => {
    const newNote = await addNoteBackend(state.title, state.desc, props.day);
    dispatch({ type: "SET_NOTES", payload: newNote });
    dispatch({ type: "SET_MODAL_OPEN" });
    dispatch({ type: "CLEAR_INPUT" });
  };

  async function deleteNote(id: string) {
    await deleteNoteBackend(id, props.day);
    dispatch({ type: "DELETE_NOTE", payload: { id } });
  }

  const editNote = async () => {
    const updatedNote = {
      ...state.editNote,
      title: state.editNoteTitle,
      body: state.editNoteDesc,
    };

    await editNoteBackend(updatedNote, props.day);
    dispatch({ type: "UPDATE_NOTE", payload: updatedNote });
    dispatch({ type: "SET_MODAL_OPEN" });
  };

  const openModalToEdit = (note: Note) => {
    dispatch({ type: "SET_MODAL_OPEN" });
    dispatch({ type: "SET_IS_EDITING", payload: true });
    dispatch({
      type: "SET_EDITNOTE",
      payload: note || { _id: "", title: "", body: "" },
    });
  };

  console.log(state.modalOpen);

  return (
    <div>
      <div className="lolek">
        <NoteForm
          isOpen={state.modalOpen}
          isEditing={state.isEditing}
          note={state.editNote}
          editNote={editNote}
          closeModal={() => dispatch({ type: "SET_MODAL_OPEN" })}
          addNote={() => addNote()}
          modalOpen={state.modalOpen}
          editNoteTitle={state.editNoteTitle}
          editNoteDesc={state.editNoteDesc}
          setEditNoteTitle={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: "SET_EDITNOTE_TITLE",
              payload: e.target.value,
            })
          }
          setEditNoteDesc={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: "SET_EDITNOTE_DESC",
              payload: e.target.value,
            })
          }
          setTitle={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: "SET_TITLE",
              payload: e.target.value,
            })
          }
          setDesc={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: "SET_DESC",
              payload: e.target.value,
            })
          }
          title={state.title}
          desc={state.desc}
        />
        <NotesList
          dayTitle={props.dayTitle}
          AddNoteHandler={() => openModaltoAdd()}
          deleteNote={(id: string) => deleteNote(id)}
          openModal={(note: Note) => openModalToEdit(note)}
          fetchNotes={() => fetchNotes()}
          notesDay={state.notesDay}
        />
      </div>
    </div>
  );
}

export default Notes;
