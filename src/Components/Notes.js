import "./Notes.css";
import React from "react";

import { Link } from "react-router-dom";

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
      <NoteForm dayTitle={"Poniedziałek"} day={"m"} />
      <NoteForm dayTitle={"Wtorek"} day={"t"} />
      <NoteForm dayTitle={"Środa"} day={"w"} />
      <NoteForm dayTitle={"Czwartek"} day={"th"} />
      <NoteForm dayTitle={"Piątek"} day={"f"} />
      <NoteForm dayTitle={"Sobota"} day={"s"} />
      <NoteForm dayTitle={"Niedziela"} day={"su"} />
      <Link to={"/"}>Cofnij</Link>
      <button onClick={logOut}>Wyloguj</button>
    </div>
  );
}

export default Notes;
