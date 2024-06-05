import React, { useReducer } from "react";
import NoteForm from "./NoteForm";
import NotesList from "./NotesList";
import EditingContext from "../context";
import reducer, { initialState } from "./reducerNotes";
import * as S from "./NotesStyles";

type NotesProps = {
  day: string;
  dayTitle: string;
};

function Notes(props: NotesProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <EditingContext.Provider value={{ state, dispatch }}>
      <S.Container>
        <NoteForm day={props.day} />
        <NotesList day={props.day} dayTitle={props.dayTitle} />
      </S.Container>
    </EditingContext.Provider>
  );
}

export default Notes;
