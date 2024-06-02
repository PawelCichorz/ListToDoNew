import React, { useContext, useEffect } from "react";
import * as S from "./NotesListStyles";
import { Note } from "./type";
import { fetchNotesBackend, deleteNoteBackend } from "../backend";
import EditingContext from "../context";

type NotesListProps = {
  day: string;
  dayTitle: string;
  fetchNotesDispatch: (notes: Note[]) => void;
  deleteNoteDispatch: (id: string) => void;
  notesDay: Note[];
  openModalToEditDispatch: (note: Note) => void;
};

function NotesList({
  openModalToEditDispatch,
  fetchNotesDispatch,
  day,
  dayTitle,
  deleteNoteDispatch,
  notesDay,
}: NotesListProps) {
  useEffect(() => {
    fetchNotes();
  }, []);

  const { setIsEditing, setTitle, setDesc, setModalOpen } =
    useContext(EditingContext);

  async function fetchNotes() {
    const notes = await fetchNotesBackend(day);
    fetchNotesDispatch(notes);
  }

  async function deleteNote(id: string) {
    await deleteNoteBackend(id, day);
    deleteNoteDispatch(id);
  }

  const openModalToEdit = (note: Note) => {
    setModalOpen(true);
    setIsEditing(true);
    setTitle(note.title);
    setDesc(note.body);
    openModalToEditDispatch(note);
  };

  const openModalToAdd = () => {
    setModalOpen(true);
    setIsEditing(false);
    setTitle("");
    setDesc("");
  };

  return (
    <S.Container>
      <S.DayofWeek>{dayTitle}</S.DayofWeek>
      {notesDay.map((notatka) => (
        <S.OneFetchNotes key={notatka._id}>
          <S.TimeandDesc>
            <S.Time>Godzina:</S.Time> <div>{notatka.title}</div>
          </S.TimeandDesc>
          <S.TimeandDesc>
            <S.Time>Opis:</S.Time>
            <div>{notatka.body}</div>
          </S.TimeandDesc>
          <S.DivWithButton>
            <S.ButtonEdit onClick={() => openModalToEdit(notatka)}>
              Edytuj
            </S.ButtonEdit>
            <S.ButtonDelete onClick={() => deleteNote(notatka._id)}>
              Usuń
            </S.ButtonDelete>
          </S.DivWithButton>
        </S.OneFetchNotes>
      ))}
      <S.ButtonAddNote onClick={() => openModalToAdd()}>Dodaj</S.ButtonAddNote>
    </S.Container>
  );
}

export default NotesList;
