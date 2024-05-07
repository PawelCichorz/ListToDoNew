import "./Notes.css";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import Note from "./Note";
// import Modal from "react-modal";
// import EditNote from "./EditNote";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NoteForm from "./NoteForm";
import { apiUrl } from './BackendPaths'

function Notes(props) {
  //stan otwarcia się formularza do dodawania notatek
  const [addOpen, setAddOpen] = useState({
    mOpen: false,
    tOpen: false,
    wOpen: false,
    thOpen: false,
    fOpen: false,
    sOpen: false,
    suOpen: false,
  });
  //stan otwarcia się modalu
  const [modalOpen, setModalOpen] = useState({
    mModal: false,
    tModal: false,
    wModal: false,
    thModal: false,
    fModal: false,
    sModal: false,
    suModal: false,
  });

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

  const history = useNavigate();

  //UNIWERSALNA FUNKCJA POBIERANIA I WYPAKOWYWANIA NOTATEK
  async function fetchNotes(day) {
    const res = await axios.get(`${apiUrl+day}`);

    const notes = res.data;
    console.log(notes);
    setNotesByDay((prevState) => ({
      ...prevState,
      [day]: notes,
    }));
  }

  // USE EFFECT WYPAKOWYWANIA NOTATEK
  useEffect(() => {
    fetchNotes("m");
  }, []);

  //UNIWERSALNA FUNKCJA USUWANIA
  async function deleteNote(id, day) {
    await axios.delete(`${apiUrl+day}/${id}`);
    setNotesByDay((prevState) => ({
      ...prevState,
      [day]: prevState[day].filter((note) => note._id !== id),
    }));
  }

  //UNIWERSALNA FUNKCJA DODAWANIA
  async function AddNote(title, body, day) {
    const res = await axios.post(`${apiUrl+ day}`, {
      title,
      body,
    });
    const newNote = res.data;
    setNotesByDay((prevState) => ({
      ...prevState,
      [day]: [...prevState[day], newNote],
    }));

    setAddOpen((prevState) => ({
      ...prevState,
      [day + "Open"]: !prevState,
    }));
  }

  //otwieranie formularza do dodania notatki
  const openAdd = (day) => {
    setAddOpen((prevState) => ({
      ...prevState,
      [day + "Open"]: true,
    }));
  };
  //otwieranie modalu
  const openModal = (day) => {
    setModalOpen((prevState) => ({
      ...prevState,
      [day + "Modal"]: !prevState[day + "Modal"],
    }));
  };

  //UNIWERSALNA FUNKCJA EDYTOWANIA
  async function Editnote(note, day) {
    const notes = [...notesByDay[day]];
    const index = notes.findIndex((x) => x._id === note._id);
    notes[index] = note;
    await axios.put(`${apiUrl+day}/${note._id}`, note);
    setNotesByDay((prevState) => ({
      ...prevState,
      [day]: notes,
    }));
    setModalOpen((prevState) => ({
      ...prevState,
      [day + "Modal"]: !prevState,
    }));
  }

  //inne funkcje

  const logOut = () => {
    const setSession = props.setSession;
    setSession(null);
    history("/");
  };

  return (
    <div className="lolek">
      <NoteForm
        notesByDay={notesByDay.m}
        Editnote={(note, day) => Editnote(note, day)}
        deleteNote={(id, day) => deleteNote(id, day)}
        AddNote={(title, body, day) => AddNote(title, body, day)}
        dayTitle={"Poniedziałek"}
        openDay={"mOpen"}
        openAdd={(day) => openAdd(day)}
        addOpens={addOpen.mOpen}
        day={"m"}
        openModal={(day) => openModal(day)}
        modalOpens={modalOpen.mModal}
      />
      <NoteForm
        notesByDay={notesByDay.t}
        Editnote={(note, day) => Editnote(note, day)}
        deleteNote={(id, day) => deleteNote(id, day)}
        AddNote={(title, body, day) => AddNote(title, body, day)}
        dayTitle={"Wtorek"}
        openDay={"tOpen"}
        openAdd={(day) => openAdd(day)}
        addOpens={addOpen.tOpen}
        day={"t"}
        openModal={(day) => openModal(day)}
        modalOpens={modalOpen.tModal}
      />
      <NoteForm
        notesByDay={notesByDay.w}
        Editnote={(note, day) => Editnote(note, day)}
        deleteNote={(id, day) => deleteNote(id, day)}
        AddNote={(title, body, day) => AddNote(title, body, day)}
        dayTitle={"Środa"}
        openDay={"wOpen"}
        openAdd={(day) => openAdd(day)}
        addOpens={addOpen.wOpen}
        day={"w"}
        openModal={(day) => openModal(day)}
        modalOpens={modalOpen.wModal}
      />
      <NoteForm
        notesByDay={notesByDay.th}
        Editnote={(note, day) => Editnote(note, day)}
        deleteNote={(id, day) => deleteNote(id, day)}
        AddNote={(title, body, day) => AddNote(title, body, day)}
        dayTitle={"Czwartek"}
        openDay={"thOpen"}
        openAdd={(day) => openAdd(day)}
        addOpens={addOpen.thOpen}
        day={"th"}
        openModal={(day) => openModal(day)}
        modalOpens={modalOpen.thModal}
      />
      <NoteForm
        notesByDay={notesByDay.f}
        Editnote={(note, day) => Editnote(note, day)}
        deleteNote={(id, day) => deleteNote(id, day)}
        AddNote={(title, body, day) => AddNote(title, body, day)}
        dayTitle={"Piątek"}
        openDay={"fOpen"}
        openAdd={(day) => openAdd(day)}
        addOpens={addOpen.fOpen}
        day={"f"}
        openModal={(day) => openModal(day)}
        modalOpens={modalOpen.fModal}
      />
      <NoteForm
        notesByDay={notesByDay.s}
        Editnote={(note, day) => Editnote(note, day)}
        deleteNote={(id, day) => deleteNote(id, day)}
        AddNote={(title, body, day) => AddNote(title, body, day)}
        dayTitle={"Sobota"}
        openDay={"sOpen"}
        openAdd={(day) => openAdd(day)}
        addOpens={addOpen.sOpen}
        day={"s"}
        openModal={(day) => openModal(day)}
        modalOpens={modalOpen.sModal}
      />
      <NoteForm
        notesByDay={notesByDay.su}
        Editnote={(note, day) => Editnote(note, day)}
        deleteNote={(id, day) => deleteNote(id, day)}
        AddNote={(title, body, day) => AddNote(title, body, day)}
        dayTitle={"Niedziela"}
        openDay={"suOpen"}
        openAdd={(day) => openAdd(day)}
        addOpens={addOpen.suOpen}
        day={"su"}
        openModal={(day) => openModal(day)}
        modalOpens={modalOpen.suModal}
      />
      <Link to={"/"}>Cofnij</Link>
      <button onClick={logOut}>Wyloguj</button>
    </div>
  );
}

export default Notes;
