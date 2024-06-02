import { useContext } from "react";
import React from "react";
import EditingContext from "../context";
import { Note } from "./type";
import { addNoteBackend, editNoteBackend } from "../backend";
import * as S from "./NoteFormStyles";

type NotesProps = {
  day: string;
  editNoteDispatch: (note: Note) => void;
  editNote: Note;
  addNoteDispatch: (note: Note) => void;
};

function NoteForm({
  editNote,
  day,
  addNoteDispatch,
  editNoteDispatch,
}: NotesProps) {
  const { title, desc, isEditing, setTitle, setDesc, modalOpen, setModalOpen } =
    useContext(EditingContext);

  const addNote = async (day: string) => {
    const newNote = await addNoteBackend(title, desc, day);

    addNoteDispatch(newNote);

    setModalOpen(false);
  };

  const funEditNote = async (day: string) => {
    if (editNote) {
      const updatedNote = {
        ...editNote,
        title: title,
        body: desc,
      };
      console.log(day);
      await editNoteBackend(updatedNote, day);
      editNoteDispatch(updatedNote);
      setModalOpen(false);
    } else {
      console.log("chuja z tego");
    }
  };

  const saveNote = async (day: string) => {
    if (isEditing) {
      await funEditNote(day);
    } else {
      await addNote(day);
    }
  };

  return (
    <S.Container>
      <S.ModalDiv modalOpen={modalOpen}>
        <S.EditNoteDiv>
          <S.Label>Godzina:</S.Label>
          <S.Input
            value={title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
          <S.Label>Opis:</S.Label>
          <S.Input
            value={desc}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </S.EditNoteDiv>

        <S.Button onClick={() => saveNote(day)}>
          {isEditing ? "Zapisz" : "Dodaj"}
        </S.Button>
        <S.Button onClick={() => setModalOpen(false)}>Anuluj</S.Button>
      </S.ModalDiv>
    </S.Container>
  );
}

export default NoteForm;
