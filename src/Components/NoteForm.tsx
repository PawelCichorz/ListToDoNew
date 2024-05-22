import React from "react";
import "./noteform.css";

import { useEffect, useReducer } from "react";
import {
  fetchNotesBackend,
  addNoteBackend,
  deleteNoteBackend,
  editNoteBackend,
} from "../backend";
import reducer, { initialState } from "../reducer";

interface NoteFormProps {
  day: string;
  dayTitle: string;
}

interface Note {
  _id: string;
  title: string;
  body: string;
}

function NoteForm(props: NoteFormProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const EditNoteHandler = (note: Note) => {
    dispatch({ type: "SET_MODAL_OPEN" });
    dispatch({ type: "SET_IS_EDITING", payload: true });
    dispatch({ type: "SET_EDITNOTE", payload: note });
  };

  const AddNoteHandler = () => {
    dispatch({ type: "SET_MODAL_OPEN" });
    dispatch({ type: "SET_IS_EDITING", payload: false });
    dispatch({
      type: "SET_EDITNOTE",
      payload: { _id: "", title: "", body: "" },
    });
  };

  async function addNote() {
    const newNote = await addNoteBackend(state.title, state.desc, props.day);

    dispatch({
      type: "SET_NOTES",
      payload: newNote,
    });
    dispatch({ type: "SET_MODAL_OPEN" });
    dispatch({ type: "CLEAR_INPUT" });
  }

  async function fetchNotes() {
    const notes = await fetchNotesBackend(props.day);
    dispatch({ type: "FETCH_NOTES", payload: notes });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

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
    console.log(state.editNote);
    await editNoteBackend(updatedNote, props.day);
    dispatch({ type: "UPDATE_NOTE", payload: updatedNote });
    dispatch({ type: "SET_MODAL_OPEN" });
  };

  const saveNote = async () => {
    if (state.isEditing) {
      await editNote();
    } else {
      await addNote();
    }
  };

  return (
    <div className="lolek">
      <div
        className="modal"
        style={{ display: state.modalOpen ? "flex" : "none" }}
      >
        {state.isEditing ? (
          <div className="notesmaine">
            <label>Tytuł:</label>

            <input
              className="inputdown"
              value={state.editNoteTitle}
              type="text"
              onChange={(e) =>
                dispatch({
                  type: "SET_EDITNOTE_TITLE",
                  payload: e.target.value,
                })
              }
            ></input>
            <label>Opis:</label>
            <input
              className="inputdown"
              value={state.editNoteDesc}
              type="text"
              onChange={(e) =>
                dispatch({
                  type: "SET_EDITNOTE_DESC",
                  payload: e.target.value,
                })
              }
            ></input>
            <button className="button2" onClick={saveNote}>
              {state.isEditing ? "Zapisz" : "Dodaj"}
            </button>
            <button
              className="button1"
              onClick={() => {
                dispatch({ type: "SET_MODAL_OPEN" });
              }}
            >
              Anuluj{" "}
            </button>
          </div>
        ) : (
          <>
            <label className="la">Godzina:</label>
            <input
              className="la"
              value={state.title}
              type="text"
              onChange={(e) =>
                dispatch({ type: "SET_TITLE", payload: e.target.value })
              }
            ></input>
            <label className="la">Opis:</label>
            <input
              className="la"
              value={state.desc}
              type="text"
              onChange={(e) =>
                dispatch({ type: "SET_DESC", payload: e.target.value })
              }
            ></input>
            <button onClick={() => addNote()} className="later">
              Dodaj
            </button>
          </>
        )}
      </div>
      <div className="monday border">
        <p className="zada ">{props.dayTitle} </p>
        {state.notesDay.map((notatka) => (
          <div className="notesmain" key={notatka._id}>
            <p className="zad">Godzina: {notatka.title} </p>
            <p className="zad">Opis: {notatka.body}</p>
            <div className="buttony">
              <button
                className="butty"
                onClick={() => EditNoteHandler(notatka)}
              >
                Edytuj
              </button>
              <button
                className="buttys"
                onClick={() => deleteNote(notatka._id)}
              >
                Usuń
              </button>
            </div>
          </div>
        ))}

        <div className="addnote">
          <button
            className="butt"
            onClick={() => {
              AddNoteHandler();
            }}
          >
            Dodaj
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteForm;
