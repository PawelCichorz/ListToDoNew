import "./noteform.css";
import React from "react";
import { useEffect } from "react";

interface Note {
  _id: string;
  title: string;
  body: string;
}

interface NotesListProps {
  dayTitle: string;
  AddNoteHandler: () => void;
  deleteNote: (id: string) => void;
  openModal: (note: Note) => void;
  fetchNotes: () => void;
  notesDay: Note[];
}

function NotesList(props: NotesListProps) {
  useEffect(() => {
    props.fetchNotes();
  }, []);

  return (
    <div className="monday border">
      <p className="zada ">{props.dayTitle} </p>
      {props.notesDay.map((notatka) => (
        <div className="notesmain" key={notatka._id}>
          <p className="zad">Godzina: {notatka.title} </p>
          <p className="zad">Opis: {notatka.body}</p>
          <div className="buttony">
            <button className="butty" onClick={() => props.openModal(notatka)}>
              Edytuj
            </button>
            <button
              className="buttys"
              onClick={() => props.deleteNote(notatka._id)}
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
            props.AddNoteHandler();
          }}
        >
          Dodaj
        </button>
      </div>
    </div>
  );
}

export default NotesList;
