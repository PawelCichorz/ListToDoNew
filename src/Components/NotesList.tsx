import React, { useContext, useEffect } from "react";
import * as S from "./NotesListStyles";
import { Note } from "./type";
import { fetchNotesBackend, deleteNoteBackend } from "../backend";
import EditingContext from "../context";

type NotesListProps = {
  day: string;
  dayTitle: string;
};

function NotesList({ day, dayTitle }: NotesListProps) {
  const { state, dispatch } = useContext(EditingContext);
  useEffect(() => {
    fetchNotes();
  }, [state.notesDay]);

  async function fetchNotes() {
    const notes = await fetchNotesBackend(day);
    dispatch({ type: "FETCH_NOTES", payload: notes });
  }

  async function deleteNote(id: string) {
    await deleteNoteBackend(id, day);
    dispatch({ type: "DELETE_NOTE", payload: { id } });
  }

  const openModalToEdit = (note: Note) => {
    dispatch({ type: "SET_MODALOPEN", payload: true });
    dispatch({ type: "SET_ISEDITING", payload: true });
    dispatch({ type: "SET_EDITNOTE", payload: note });
    dispatch({
      type: "SET_EDITNOTE",
      payload: note,
    });
  };

  const openModalToAdd = () => {
    dispatch({ type: "SET_MODALOPEN", payload: true });
    dispatch({ type: "SET_ISEDITING", payload: false });

    dispatch({
      type: "SET_EDITNOTE",
      payload: { _id: "", title: "", body: "" },
    });
  };

  return (
    <S.Container>
      <S.DayofWeek>{dayTitle}</S.DayofWeek>
      {state.notesDay.map((notatka) => (
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
