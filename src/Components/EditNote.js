import "./editnote.css";
import { useState } from "react";
import React from "react";

function EditNote(props) {
  const [title, Settitle] = useState(props.name);
  const [desc, Setdesc] = useState(props.description);

  const editNote = () => {
    const note = {
      title: title,
      body: desc,
      _id: props.id,
    };
    
    props.onEdit(note,props.day);
  };

  return (
    <div className="notesmaine">
      <label>Tytuł:</label>
      <input
        value={title}
        type="text"
        onChange={(e) => Settitle(e.target.value)}
      ></input>
      <label>Opis:</label>
      <input
        className="inputdown"
        value={desc}
        type="text"
        onChange={(e) => Setdesc(e.target.value)}
      ></input>
      <button onClick={() => editNote(props.day)}>Zapisz</button>
    </div>
  );
}

export default EditNote;

import "./editnote.css";
import { useState } from "react";
import React from "react";

function EditNote(props) {
  const [title, Settitle] = useState(props.name);
  const [desc, Setdesc] = useState(props.description);

  const editNote = () => {
    const note = {
      title: title,
      body: desc,
      _id: props.id,
    };

    props.onEdit(note, props.day);
  };
  console.log(props.day);
  return (
    <div className="notesmaine">
      <label>Tytuł:</label>
      <input
        value={title}
        type="text"
        onChange={(e) => Settitle(e.target.value)}
      ></input>
      <label>Opis:</label>
      <input
        className="inputdown"
        value={desc}
        type="text"
        onChange={(e) => Setdesc(e.target.value)}
      ></input>
      <button onClick={() => editNote(props.day)}>Zapisz</button>
    </div>
  );
}

export default EditNote;
