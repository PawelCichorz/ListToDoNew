import React from "react";
import { useEffect } from "react";
import * as S from "./NotesListStyles";
import { Note } from "./type";

type NotesListProps = {
  dayTitle: string;
  AddNoteHandler: () => void;
  deleteNote: (id: string) => void;
  openModal: (note: Note) => void;
  fetchNotes: () => void;
  notesDay: Note[];
};

function NotesList({
  dayTitle,
  AddNoteHandler,
  deleteNote,
  openModal,
  fetchNotes,
  notesDay,
}: NotesListProps) {
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <S.Container>
      <S.DayofWeek>{dayTitle} </S.DayofWeek>
      {notesDay.map((notatka) => (
        <S.OneFetchNotes key={notatka._id}>
          <S.TimeandDesc>
            <S.Time>Godzina:</S.Time> <div>{notatka.title}</div>
          </S.TimeandDesc>
          <S.TimeandDesc>
            <S.Time>Opis:</S.Time>
            <div> {notatka.body}</div>
          </S.TimeandDesc>

          <S.DivWithButton>
            <S.ButtonEdit onClick={() => openModal(notatka)}>
              Edytuj
            </S.ButtonEdit>
            <S.ButtonDelete onClick={() => deleteNote(notatka._id)}>
              Usuń
            </S.ButtonDelete>
          </S.DivWithButton>
        </S.OneFetchNotes>
      ))}

      <S.ButtonAddNote
        className="butt"
        onClick={() => {
          AddNoteHandler();
        }}
      >
        Dodaj
      </S.ButtonAddNote>
    </S.Container>
  );
}

export default NotesList;
