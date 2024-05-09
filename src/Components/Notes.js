import "./Notes.css";
import React from "react";

import { Link } from "react-router-dom";
// import Note from "./Note";
// import Modal from "react-modal";
// import EditNote from "./EditNote";

import { useNavigate } from "react-router-dom";
import NoteForm from "./NoteForm";

function Notes(props) {
  const history = useNavigate();

  //inne funkcje

  const logOut = () => {
    const setSession = props.setSession;
    setSession(null);
    history("/");
  };

  return (
    <div className="lolek">
      <NoteForm dayTitle={"Poniedziałek"} openDay={"mOpen"} day={"m"} />
      <NoteForm dayTitle={"Wtorek"} openDay={"tOpen"} day={"t"} />
      <NoteForm dayTitle={"Środa"} openDay={"wOpen"} day={"w"} />
      <NoteForm dayTitle={"Czwartek"} openDay={"thOpen"} day={"th"} />
      <NoteForm dayTitle={"Piątek"} openDay={"fOpen"} day={"f"} />
      <NoteForm dayTitle={"Sobota"} openDay={"sOpen"} day={"s"} />
      <NoteForm dayTitle={"Niedziela"} openDay={"suOpen"} day={"su"} />
      <Link to={"/"}>Cofnij</Link>
      <button onClick={logOut}>Wyloguj</button>
    </div>
  );
}

export default Notes;
