import React from "react";
import "./noteform.css";
import Modal from "react-modal";
import { useEffect, useReducer } from "react";
// import EditNote from "./EditNote";
import {
  fetchNotesBackend,
  addNoteBackend,
  deleteNoteBackend,
  editNoteBackend,
} from "../backend";
import reducer, { initialState } from "../reducer";
Modal.setAppElement("#root");
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
    const newNote = await addNoteBackend(state.title, state.desc, props.day);

    dispatch({
      type: "SET_NOTES",
      payload: newNote,
    });
    dispatch({ type: "ADD_NOTE", payload: false });
  }

  async function fetchNotes() {
    const notes = await fetchNotesBackend(props.day);
    dispatch({ type: "FETCH_NOTES", payload: notes });
  }

  useEffect(() => {
    fetchNotes(props.day);
  }, []);

  async function deleteNote(id) {
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
    dispatch({ type: "TOGLLE_MODAL" });
  };

  return (
    <div className="lolek">
      {/* {state.notesDay ? (
        <> */}

      <div className="monday border">
        <Modal
          isOpen={state.modalOpen}
          contentLabel="Edytuj Notatkę"
          style={customStyles}
        >
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
            <button onClick={editNote}>Zapisz</button>
          </div>

          <button
            onClick={() => {
              dispatch({ type: "TOOGLE_MODAL" });
            }}
          >
            Anuluj{" "}
          </button>
        </Modal>
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
          ) : null}
        </div>
      </div>
      {/* </>
      ) : null} */}
    </div>
  );
}

export default NoteForm;
