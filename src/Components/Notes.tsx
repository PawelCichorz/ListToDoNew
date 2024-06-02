import React, { useReducer, useState } from "react";
import NoteForm from "./NoteForm";
import NotesList from "./NotesList";
import EditingContext from "../context";
import reducer, { initialState } from "./reducerNotes";
import * as S from "./NotesStyles";
import { Note } from "./type";

type NotesProps = {
  day: string;
  dayTitle: string;
};

function Notes(props: NotesProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [desc, setDescState] = useState<string>("");
  const [title, setTitleState] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const setDesc = (value: string | React.ChangeEvent<HTMLInputElement>) => {
    if (typeof value === "string") {
      setDescState(value);
    } else if (value && value.target) {
      setDescState(value.target.value);
    }
  };

  const setTitle = (value: string | React.ChangeEvent<HTMLInputElement>) => {
    if (typeof value === "string") {
      setTitleState(value);
    } else {
      setTitleState(value.target.value);
    }
  };

  return (
    <EditingContext.Provider
      value={{
        modalOpen,
        desc,
        title,
        isEditing,
        setDesc,
        setTitle,
        setIsEditing,
        setModalOpen,
        setTitleState,
        setDescState,
      }}
    >
      <S.Container>
        <NoteForm
          day={props.day}
          editNote={state.editNote}
          editNoteDispatch={(note: Note) =>
            dispatch({ type: "UPDATE_NOTE", payload: note })
          }
          addNoteDispatch={(note: Note) => {
            dispatch({ type: "SET_NOTES", payload: note });
          }}
        />
        <NotesList
          day={props.day}
          dayTitle={props.dayTitle}
          deleteNoteDispatch={(id: string) =>
            dispatch({ type: "DELETE_NOTE", payload: { id } })
          }
          openModalToEditDispatch={(note: Note) =>
            dispatch({
              type: "SET_EDITNOTE",
              payload: note,
            })
          }
          fetchNotesDispatch={(notes: Note[]) =>
            dispatch({ type: "FETCH_NOTES", payload: notes })
          }
          notesDay={state.notesDay}
        />
      </S.Container>
    </EditingContext.Provider>
  );
}

export default Notes;
