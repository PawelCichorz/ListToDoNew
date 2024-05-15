import "./Note.css";
import React from "react";

function Note(props) {
  return (
    <div className="notesmain">
      <p className="zad">Godzina: {props.name} </p>
      <p className="zad">Opis: {props.description}</p>
      <div className="buttony">
        <button
          className="butty"
          onClick={() =>
            props.EditNoteHandler({
              title: props.name,
              body: props.description,
              _id: props.id,
            })
          }
        >
          Edytuj
        </button>
        <button className="buttys" onClick={() => props.deleteNote(props.id)}>
          Usuń
        </button>
      </div>
    </div>
  );
}

export default Note;
