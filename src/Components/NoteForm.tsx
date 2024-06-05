import { useContext, useRef, useEffect } from "react";
import React from "react";
import EditingContext from "../context";

import { addNoteBackend, editNoteBackend } from "../backend";
import * as S from "./NoteFormStyles";

type NotesProps = {
  day: string;
};

function NoteForm({ day }: NotesProps) {
  const { state, dispatch } = useContext(EditingContext);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        dispatch({ type: "SET_MODALOPEN", payload: false });
      }
    }
    if (state.modalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  }, [state.modalOpen, dispatch]);

  const addNote = async (day: string) => {
    const newNote = await addNoteBackend(
      state.editNote!.title,
      state.editNote!.body,
      day,
    );

    dispatch({ type: "SET_NOTES", payload: newNote });
    dispatch({ type: "SET_MODALOPEN", payload: false });
    dispatch({ type: "SET_EDITNOTE", payload: null });
  };

  const funEditNote = async (day: string) => {
    if (state.editNote) {
      const updatedNote = {
        ...state.editNote,
      };
      await editNoteBackend(updatedNote, day);
      dispatch({
        type: "SET_EDITNOTE",
        payload: updatedNote,
      });
      dispatch({ type: "SET_MODALOPEN", payload: false });
      dispatch({ type: "SET_EDITNOTE", payload: null });
    } else {
      console.log("null");
    }
  };

  const saveNote = async (day: string) => {
    if (state.isEditing) {
      await funEditNote(day);
    } else {
      await addNote(day);
    }
  };

  useEffect(() => {
    if (state.modalOpen) {
      titleInputRef.current?.focus();
    }
  }, [state.modalOpen]);

  return (
    <S.Container ref={modalRef}>
      <S.ModalDiv modalOpen={state.modalOpen}>
        <S.EditNoteDiv>
          <S.Label>Godzina:</S.Label>
          <S.Input
            ref={titleInputRef}
            value={state.editNote?.title || ""}
            type="text"
            onChange={(e) =>
              dispatch({
                type: "UPDATE_EDIT_NOTE",
                payload: { title: e.target.value },
              })
            }
          />
          <S.Label>Opis:</S.Label>
          <S.Input
            value={state.editNote?.body || ""}
            type="text"
            onChange={(e) =>
              dispatch({
                type: "UPDATE_EDIT_NOTE",
                payload: { body: e.target.value },
              })
            }
          />
        </S.EditNoteDiv>

        <S.Button onClick={() => saveNote(day)}>
          {state.isEditing ? "Zapisz" : "Dodaj"}
        </S.Button>
        <S.Button
          onClick={() => dispatch({ type: "SET_MODALOPEN", payload: false })}
        >
          Anuluj
        </S.Button>
      </S.ModalDiv>
    </S.Container>
  );
}

export default NoteForm;
