import React from "react";
import Note from "./Note";
import Modal from "react-modal";
import { useState } from "react";
import EditNote from "./EditNote";

function NoteForm(props) {
  const [editNote, Seteditnote] = useState({});
  const [titlem, Settitlem] = useState("");
  const [descm, Setdescm] = useState("");

  const ToglleModal = () => {
    props.openModal(props.day);
  };
  //Poniedzialek
  const EditNoteHandler = (note) => {
    props.openModal(props.day);

    Seteditnote(note);
  };
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
  const openAdd = () => {
    props.openAdd(props.day);
  };

  const AddNote = () => {
    props.AddNote(titlem, descm, props.day);

    Settitlem("");
    Setdescm("");
  };

  return (
    <div className="lolek">
      {props.notesByDay ? (
        <>
          {" "}
          <div className="monday border">
            <Modal
              isOpen={props.modalOpens}
              contentLabel="Edytuj Notatkę"
              style={customStyles}
            >
              <EditNote
                name={editNote.title}
                description={editNote.body}
                id={editNote._id}
                onEdit={(note, day) => props.Editnote(note, day)}
                day={props.day}
              />
              <button onClick={ToglleModal}>Anuluj</button>
            </Modal>
            <p className="zada ">{props.dayTitle} </p>
            {props.notesByDay.map((notatka) => (
              <Note
                key={notatka._id}
                name={notatka.title}
                description={notatka.body}
                id={notatka._id}
                deleteNote={(id, day) => props.deleteNote(id, day)}
                EditNoteHandler={(note, day) => EditNoteHandler(note, day)}
                day={props.day}
              />
            ))}

            <div className="addnote">
              <button className="butt" onClick={() => openAdd()}>
                Dodaj{" "}
              </button>
              {props.addOpens ? (
                <>
                  <label className="la">Godzina:</label>
                  <input
                    className="la"
                    value={titlem}
                    type="text"
                    onChange={(e) => Settitlem(e.target.value)}
                  ></input>
                  <label className="la">Opis:</label>
                  <input
                    className="la"
                    value={descm}
                    type="text"
                    onChange={(e) => Setdescm(e.target.value)}
                  ></input>
                  <button onClick={() => AddNote(props.day)}>Dodaj</button>
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
