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
import * as S from "./NotesStyles";
import { Note } from "./type";

type NotesProps = {
  day: string;
  dayTitle: string;
};

function Notes({ day, dayTitle }: NotesProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function fetchNotes() {
    const notes = await fetchNotesBackend(day);
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
    const newNote = await addNoteBackend(state.title, state.desc, day);
    dispatch({ type: "SET_NOTES", payload: newNote });
    dispatch({ type: "SET_MODAL_OPEN" });
    dispatch({ type: "CLEAR_INPUT" });
  };

  async function deleteNote(id: string) {
    await deleteNoteBackend(id, day);
    dispatch({ type: "DELETE_NOTE", payload: { id } });
  }

  const editNote = async () => {
    const updatedNote = {
      ...state.editNote,
      title: state.editNoteTitle,
      body: state.editNoteDesc,
    };

    await editNoteBackend(updatedNote, day);
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

  return (
    <S.Container>
      <NoteForm
        isEditing={state.isEditing}
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
        dayTitle={dayTitle}
        AddNoteHandler={() => openModaltoAdd()}
        deleteNote={(id: string) => deleteNote(id)}
        openModal={(note: Note) => openModalToEdit(note)}
        fetchNotes={() => fetchNotes()}
        notesDay={state.notesDay}
      />
    </S.Container>
  );
}

export default Notes;
