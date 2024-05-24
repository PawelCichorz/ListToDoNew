import React from "react";

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ModalDiv = styled.div<{ modalOpen: boolean }>`
  display: ${({ modalOpen }) => (modalOpen ? "flex" : "none")};
  flex-direction: column;
  position: fixed;
  z-index: 1;
  top: 100px;
  margin: 0 auto;
  width: 300px;
  height: 350px;
  background-color: #332f2f;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const EditNoteDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 250px;
`;

const Label = styled.label`
  font-size: 15px;
  padding: 10px 25px;
  color: white;
`;

const Input = styled.input`
  font-size: 15px;
  padding: 10px 25px;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: white;
  border-radius: 8px;
  padding: 7px 13px;
  color: black;
  margin: 7px;
`;

interface NotesProps {
  isOpen: boolean;
  isEditing: boolean;
  note: Note;
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
}
interface Note {
  _id: string;
  title: string;
  body: string;
}

function NoteForm(props: NotesProps) {
  const saveNote = async () => {
    if (props.isEditing) {
      await props.editNote();
    } else {
      await props.addNote();
    }
  };

  return (
    <Container>
      <ModalDiv modalOpen={props.modalOpen}>
        {props.isEditing ? (
          <EditNoteDiv>
            <Label>Tytuł:</Label>

            <Input
              value={props.editNoteTitle}
              type="text"
              onChange={(e) => props.setEditNoteTitle(e)}
            ></Input>
            <Label>Opis:</Label>
            <Input
              value={props.editNoteDesc}
              type="text"
              onChange={(e) => props.setEditNoteDesc(e)}
            ></Input>
            <Button className="button2" onClick={() => saveNote()}>
              {props.isEditing ? "Zapisz" : "Dodaj"}
            </Button>
            <Button className="button1" onClick={() => props.closeModal()}>
              Anuluj{" "}
            </Button>
          </EditNoteDiv>
        ) : (
          <>
            <Label>Godzina:</Label>
            <Input
              value={props.title}
              type="text"
              onChange={(e) => props.setTitle(e)}
            ></Input>
            <Label>Opis:</Label>
            <Input
              value={props.desc}
              type="text"
              onChange={(e) => props.setDesc(e)}
            ></Input>
            <Button onClick={() => props.addNote()} className="later">
              Dodaj
            </Button>
            <Button className="button1" onClick={props.closeModal}>
              Anuluj{" "}
            </Button>
          </>
        )}
      </ModalDiv>
    </Container>
  );
}

export default NoteForm;
