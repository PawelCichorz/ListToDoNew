import React from "react";
import Note from "./Note";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import EditNote from "./EditNote";
import {
  fetchNotesBackend,
  addNoteBackend,
  deleteNoteBackend,
  editNoteBackend,
} from "./backend";


  //wyłączenie modala buttonem anuluj
  const ToglleModal = (setModalOpen) => {
    setModalOpen(false)
  };

   //otwarcie inputów do dodawania notatki
   const openAdd = (setAddOpen) => {
    setAddOpen(true);
  };

   //pobieranie notatek
 async function fetchNotes(setNotesByDay,day) {
  const notes = await fetchNotesBackend(day);
  setNotesByDay((prevState) => ({
    ...prevState,
    [day]: notes,
  }));
}
  
 


function NoteForm(props) {
  //edytowana notatka
  const [editNote, Seteditnote] = useState({});
  //stan edytowanej notatki
  const [titlem, Settitlem] = useState("");
  const [descm, Setdescm] = useState("");
  //stan otwarcia dodawania nowej notatki
  const [addOpen, setAddOpen] = useState(false);
  //stan otwarcia się modalu
  const [modalOpen, setModalOpen] = useState(false);

  //stan notatki na dany dzień
  const [notesByDay, setNotesByDay] = useState({
    m: [],
    t: [],
    w: [],
    th: [],
    f: [],
    s: [],
    su: [],
  });



 

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
    setModalOpen(true);
    Seteditnote(note);
  };

 //dodawanie notatki

 async function addNote() {
  const newNote = await addNoteBackend(titlem, descm, props.day);
  setNotesByDay((prevState) => ({
    ...prevState,
    [props.day]: [...prevState[props.day], newNote],
  }));
  setAddOpen(!addOpen);
  Settitlem("");
  Setdescm("");
}
 



  useEffect(() => {
    fetchNotes(setNotesByDay,props.day);
  }, []);

  //usuwanie notatek
  async function deleteNote(id, day) {
    await deleteNoteBackend(id, day);
    setNotesByDay((prevState) => ({
      ...prevState,
      [day]: prevState[day].filter((note) => note._id !== id),
    }));
  }

  //edytowanie
  async function Editnote(note, day) {
    const notes = [...notesByDay[day]];
    const index = notes.findIndex((x) => x._id === note._id);
    notes[index] = note;
    await editNoteBackend(note, day);
    setNotesByDay((prevState) => ({
      ...prevState,
      [day]: notes,
    }));
    setModalOpen(!modalOpen);
  }
console.log(Seteditnote)
  return (
    <div className="lolek">
      {notesByDay ? (
        <>
          {" "}
          <div className="monday border">
            <Modal
              isOpen={modalOpen}
              contentLabel="Edytuj Notatkę"
              style={customStyles}
            >
              <EditNote
                name={editNote.title}
                description={editNote.body}
                id={editNote._id}
                onEdit={(note, day) => Editnote(note, day)}
                day={props.day}
              />
              <button onClick={() => ToglleModal(setModalOpen)}>Anuluj</button>
            </Modal>
            <p className="zada ">{props.dayTitle} </p>
            {notesByDay[props.day].map((notatka) => (
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
              <button className="butt" onClick={() => openAdd(setAddOpen)}>
                Dodaj{" "}
              </button>
              {addOpen ? (
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
                  <button onClick={() => addNote(props.day)}>Dodaj</button>
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
