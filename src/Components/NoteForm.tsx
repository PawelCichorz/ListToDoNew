import React from "react";
import "./noteform.css";

interface NotesProps {
  isOpen: boolean;
  isEditing: boolean;
  note: Note;
  addNote: () => void;
  editNote: () => void;
  closeModal: () => void;
  modalOpen: boolean;
  editNoteTitle: string;
  editNoteDesc: string;
  setEditNoteTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setEditNoteDesc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  desc: string;
  setTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setDesc: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
interface Note {
  _id: string;
  title: string;
  body: string;
}

function NoteForm(props: NotesProps) {
  const saveNote = async () => {
    if (props.isEditing) {
      await props.editNote();
    } else {
      await props.addNote();
    }
  };

  return (
    <div className="lolek">
      <div
        className="modal"
        style={{ display: props.modalOpen ? "flex" : "none" }}
      >
        {props.isEditing ? (
          <div className="notesmaine">
            <label>Tytuł:</label>

            <input
              className="inputdown"
              value={props.editNoteTitle}
              type="text"
              onChange={(e) => props.setEditNoteTitle(e)}
            ></input>
            <label>Opis:</label>
            <input
              className="inputdown"
              value={props.editNoteDesc}
              type="text"
              onChange={(e) => props.setEditNoteDesc(e)}
            ></input>
            <button className="button2" onClick={() => saveNote()}>
              {props.isEditing ? "Zapisz" : "Dodaj"}
            </button>
            <button className="button1" onClick={() => props.closeModal()}>
              Anuluj{" "}
            </button>
          </div>
        ) : (
          <>
            <label className="la">Godzina:</label>
            <input
              className="la"
              value={props.title}
              type="text"
              onChange={(e) => props.setTitle(e)}
            ></input>
            <label className="la">Opis:</label>
            <input
              className="la"
              value={props.desc}
              type="text"
              onChange={(e) => props.setDesc(e)}
            ></input>
            <button onClick={() => props.addNote()} className="later">
              Dodaj
            </button>
            <button className="button1" onClick={props.closeModal}>
              Anuluj{" "}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default NoteForm;
