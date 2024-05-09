import React from "react";
import Note from "./Note";
import Modal from "react-modal";
import { useState ,useEffect } from "react";
import EditNote from "./EditNote";
import {  fetchNotesBackend,addNoteBackend} from "./backend"

function NoteForm(props) {

  //edytowana notatka
  const [editNote, Seteditnote] = useState({});
  //stan edytowanej notatki 
  const [titlem, Settitlem] = useState("");
  const [descm, Setdescm] = useState("");
//stan otwarcia dodawania nowej notatki
  const [addOpen, setAddOpen] = useState(false);
  //stan otwarcia się modalu
  // const [modalOpen, setModalOpen] = useState(false);

  //stan notatki na dany dzień
  const [notesByDay, setNotesByDay] = useState([]);



console.log(notesByDay)



  //wyłączenie modala buttonem anuluj
  const ToglleModal = () => {
    props.openModal(props.day);
  };
  
  //przycisk edytuj
  const EditNoteHandler = (note) => {
    props.openModal(props.day);

    Seteditnote(note);
  };

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

  //otwarcie inputów do dodawania notatki
  const openAdd = () => {
  setAddOpen(true)
  };

  //dodawanie notatki
  // const AddNote = () => {
  //   props.AddNote(titlem, descm, props.day);

  //   Settitlem("");
  //   Setdescm("");
  // };


  async function addNote() {
    const newNote = await addNoteBackend(titlem, descm, props.day);
    setNotesByDay((prevState) => ([
      ...prevState, newNote]
    ));
    setAddOpen(!addOpen);
    Settitlem("");
    Setdescm("");
  }


  //pobieranie notatek
  async function fetchNotes() {
    const res = await fetchNotesBackend(props.day)

    const notes = res.data;
    setNotesByDay((prevState) => ([
      ...prevState,notes
    ]));
  }

  useEffect(() => {
    fetchNotes();
  }, []);

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
