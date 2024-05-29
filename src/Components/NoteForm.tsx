import React from "react";

import * as S from "./NoteFormStyles";

type NotesProps = {
  isEditing: boolean;
  addNote: () => void;
  editNote: () => void;
  closeModal: () => void;
  modalOpen: boolean;
  editNoteTitle: string;
  editNoteDesc: string;
  setEditNoteTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setEditNoteDesc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  desc: string;
  setTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setDesc: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function NoteForm({
  isEditing,
  addNote,
  editNote,
  closeModal,
  modalOpen,
  editNoteTitle,
  editNoteDesc,
  title,
  desc,
  setEditNoteDesc,
  setEditNoteTitle,
  setTitle,
  setDesc,
}: NotesProps) {
  const saveNote = async () => {
    if (isEditing) {
      await editNote();
    } else {
      await addNote();
    }
  };

  return (
    <S.Container>
      <S.ModalDiv modalOpen={modalOpen}>
        {isEditing ? (
          <S.EditNoteDiv>
            <S.Label>Tytuł:</S.Label>

            <S.Input
              value={editNoteTitle}
              type="text"
              onChange={(e) => setEditNoteTitle(e)}
            ></S.Input>
            <S.Label>Opis:</S.Label>
            <S.Input
              value={editNoteDesc}
              type="text"
              onChange={(e) => setEditNoteDesc(e)}
            ></S.Input>
            <S.Button className="button2" onClick={() => saveNote()}>
              {isEditing ? "Zapisz" : "Dodaj"}
            </S.Button>
            <S.Button className="button1" onClick={() => closeModal()}>
              Anuluj{" "}
            </S.Button>
          </S.EditNoteDiv>
        ) : (
          <>
            <S.Label>Godzina:</S.Label>
            <S.Input
              value={title}
              type="text"
              onChange={(e) => setTitle(e)}
            ></S.Input>
            <S.Label>Opis:</S.Label>
            <S.Input
              value={desc}
              type="text"
              onChange={(e) => setDesc(e)}
            ></S.Input>
            <S.Button onClick={() => addNote()} className="later">
              Dodaj
            </S.Button>
            <S.Button className="button1" onClick={closeModal}>
              Anuluj{" "}
            </S.Button>
          </>
        )}
      </S.ModalDiv>
    </S.Container>
  );
}

export default NoteForm;
