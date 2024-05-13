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
  dispatch({ type: "addModal" });
};

//otwarcie inputów do dodawania notatki
const openAdd = (dispatch) => {
  dispatch({ type: "addNote" });
};

//pobieranie notatek
async function fetchNotes(dispatch, day) {
  const notes = await fetchNotesBackend(day);
  dispatch({ type: "fetchNotes", payload: { day, notes } });
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
    dispatch({ type: "addModal" });
    dispatch({ type: "setEditNote", payload: note });
  };

  //dodawanie notatki

  async function addNote() {
    const newNote = await addNoteBackend(state.titlem, state.descm, props.day);

    dispatch({
      type: "setNotes",
      payload: {
        day: props.day,
        notes: [...state.notesByDay[props.day], newNote],
      },
    });
    dispatch({ type: "addNote" });
    dispatch({ type: "clearInputs" });
  }

  useEffect(() => {
    fetchNotes(dispatch, props.day);
  }, [state.notesByDay]);

  //usuwanie notatek
  async function deleteNote(id, day) {
    await deleteNoteBackend(id, day);
    dispatch({ type: "deleteNote", payload: { id, day } });
  }

  //edytowanie
  async function Editnote(note, day) {
    const notes = [...state.notesByDay[day]];
    const index = notes.findIndex((x) => x._id === note._id);
    notes[index] = note;

    await editNoteBackend(note, day);
    dispatch({ type: "addModal" });
    dispatch({ type: "setNotes", payload: notes });
  }

  return (
    <div className="lolek">
      {state.notesByDay ? (
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
                onEdit={(note, day) => Editnote(note, day)}
                day={props.day}
              />
              <button onClick={() => ToglleModal(dispatch)}>Anuluj</button>
            </Modal>
            <p className="zada ">{props.dayTitle} </p>
            {state.notesByDay[props.day].length > 0 &&
              state.notesByDay[props.day].map((notatka) => (
                <Note
                  key={notatka._id}
                  name={notatka.title}
                  description={notatka.body}
                  id={notatka._id}
                  deleteNote={(id, day) => deleteNote(id, day)}
                  EditNoteHandler={(note) => EditNoteHandler(note)}
                  day={props.day}
                />
              ))}

            <div className="addnote">
              <button className="butt" onClick={() => openAdd(dispatch)}>
                Dodaj{" "}
              </button>
              {state.addOpen ? (
                <>
                  <label className="la">Godzina:</label>
                  <input
                    className="la"
                    value={state.titlem}
                    type="text"
                    onChange={(e) =>
                      dispatch({ type: "setTitlem", payload: e.target.value })
                    }
                  ></input>
                  <label className="la">Opis:</label>
                  <input
                    className="la"
                    value={state.descm}
                    type="text"
                    onChange={(e) =>
                      dispatch({ type: "setDescm", payload: e.target.value })
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
