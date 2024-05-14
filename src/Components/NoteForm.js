import React from "react";
import Note from "./Note";
import Modal from "react-modal";
import { useEffect, useReducer } from "react";
import EditNote from "./EditNote";
import {
  fetchNotesBackend,
  addNoteBackend,
  deleteNoteBackend,
  editNoteBackend,
} from "./backend";
import reducer, { initialState } from "../reducer";

//wyłączenie modala buttonem anuluj
const ToglleModal = (dispatch) => {
  dispatch({ type: "ADD_MODAL" });
};

//otwarcie inputów do dodawania notatki
const openAdd = (dispatch) => {
  dispatch({ type: "ADD_NOTE" });
};

//pobieranie notatek
async function fetchNotes(dispatch, day) {
  const notes = await fetchNotesBackend(day);
  dispatch({ type: "FETCH_NOTES", payload: notes });
}

function NoteForm(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  //style do modala
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

  //przycisk edytuj
  const EditNoteHandler = (note) => {
    dispatch({ type: "ADD_MODAL" });
    dispatch({ type: "SET_EDITNOTE", payload: note });
  };

  //dodawanie notatki
  async function addNote() {
    const newNote = await addNoteBackend(state.titlem, state.descm, props.day);

    dispatch({
      type: "SET-NOTES",
      payload: {
        notes: [...state.notesDay, newNote], // Dodaj nową notatkę do aktualnych notatek
      },
    });
    dispatch({ type: "ADD_NOTE" });
    dispatch({ type: "CLEAR_INPUTS" });
  }

  useEffect(() => {
    fetchNotes(dispatch, props.day);
  }, [state.notesDay]);

  //usuwanie notatek
  async function deleteNote(id) {
    await deleteNoteBackend(id, props.day);
    dispatch({ type: "DELETE_NOTE", payload: { id } });
  }

  //edytowanie
  async function editNote(note) {
    const notes = [...state.notesDay];
    const index = notes.findIndex((x) => x._id === note._id);
    notes[index] = note;

    await editNoteBackend(note, props.day);
    dispatch({ type: "ADD_MODAL" });
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
              <button onClick={() => ToglleModal(dispatch)}>Anuluj</button>
            </Modal>
            <p className="zada ">{props.dayTitle} </p>
            {state.notesDay.length > 0 &&
              state.notesDay.map((notatka) => (
                <Note
                  key={notatka._id}
                  name={notatka.title}
                  description={notatka.body}
                  id={notatka._id}
                  deleteNote={(id) => deleteNote(id)}
                  EditNoteHandler={(note) => EditNoteHandler(note)}
                />
              ))}

            <div className="addnote">
              <button className="butt" onClick={() => openAdd(dispatch)}>
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
