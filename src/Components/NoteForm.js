import React from "react";
import "./noteform.css";
import Modal from "react-modal";
import { useEffect, useReducer } from "react";
import EditNote from "./EditNote";
import {
  fetchNotesBackend,
  addNoteBackend,
  deleteNoteBackend,
  editNoteBackend,
} from "../backend";
import reducer, { initialState } from "../reducer";

async function fetchNotes(dispatch, day) {
  const notes = await fetchNotesBackend(day);
  dispatch({ type: "UPDATE_NOTES", payload: notes });
}

function NoteForm(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const customStyles = {
    content: {
      height: "350px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
    },
  };

  const EditNoteHandler = (note) => {
    dispatch({ type: "TOGLLE_MODAL" });
    dispatch({ type: "SET_EDITNOTE", payload: note });
  };

  async function addNote() {
    const newNote = await addNoteBackend(state.titlem, state.descm, props.day);

    dispatch({
      type: "SET-NOTES",
      payload: [state.notesDay, newNote],
    });
    dispatch({ type: "ADD_NOTE", payload: false });
  }

  useEffect(() => {
    fetchNotes(dispatch, props.day);
  }, [state.notesDay]);

  async function deleteNote(id) {
    await deleteNoteBackend(id, props.day);
    dispatch({ type: "DELETE_NOTE", payload: { id } });
  }

  async function editNote(note) {
    const updatedNote = await editNoteBackend(note, props.day);
    const notes = state.notesDay.map((x) =>
      x._d === note._id ? updatedNote : note,
    );
    dispatch({ type: "TOGLLE_MODAL" });
    dispatch({ type: "SET_EDITNOTE", payload: notes });
  }

  return (
    <div className="lolek">
      {state.notesDay ? (
        <>
          {" "}
          <div className="monday border">
            <Modal
              isOpen={state.modalOpen}
              contentLabel="Edytuj Notatkę"
              style={customStyles}
            >
              <EditNote
                name={state.editNote.title}
                description={state.editNote.body}
                id={state.editNote._id}
                onEdit={(note, day) => editNote(note, day)}
                day={props.day}
              />
              <button
                onClick={() => {
                  dispatch({ type: "TOOGLE_MODAL" });
                }}
              >
                Anuluj
              </button>
            </Modal>
            <p className="zada ">{props.dayTitle} </p>
            {state.notesDay.length > 0 &&
              state.notesDay.map((notatka) => (
                // <Note
                //   key={notatka._id}
                //   name={notatka.title}
                //   description={notatka.body}
                //   id={notatka._id}
                //   deleteNote={(id) => deleteNote(id)}
                //   EditNoteHandler={(note) => EditNoteHandler(note)}
                // />

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
                  dispatch({ type: "ADD_NOTE", payload: !state.addOpen });
                }}
              >
                Dodaj
              </button>
              {state.addOpen ? (
                <>
                  <label className="la">Godzina:</label>
                  <input
                    className="la"
                    value={state.titlem}
                    type="text"
                    onChange={(e) =>
                      dispatch({ type: "SET_TITLE", payload: e.target.value })
                    }
                  ></input>
                  <label className="la">Opis:</label>
                  <input
                    className="la"
                    value={state.descm}
                    type="text"
                    onChange={(e) =>
                      dispatch({ type: "SET_DESC", payload: e.target.value })
                    }
                  ></input>
                  <button onClick={() => addNote(props.day)} className="later">
                    Dodaj
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default NoteForm;
