import React from "react";
import Note from "./Note";
import Modal from "react-modal";
import {  useEffect,useReducer } from "react";
import EditNote from "./EditNote";
import {
  fetchNotesBackend,
  addNoteBackend,
  deleteNoteBackend,
  editNoteBackend,
} from "./backend";


  //wyłączenie modala buttonem anuluj
  const ToglleModal = (dispatch) => {
    dispatch({type:'addModal'})
  };

   //otwarcie inputów do dodawania notatki
   const openAdd = (dispatch) => {
    dispatch({type:'addNote'})
  };

   //pobieranie notatek
   async function fetchNotes(dispatch,day) {
    const notes = await fetchNotesBackend(day);
    dispatch({ type: 'fetchNotes', payload: { day, notes } });
  }
 


function NoteForm(props) {
  //edytowana notatka
  // const [editNote, Seteditnote] = useState({});
  //stan edytowanej notatki
  // const [titlem, Settitlem] = useState("");
  // const [descm, Setdescm] = useState("");
  //stan otwarcia dodawania nowej notatki
  // const [addOpen, setAddOpen] = useState(false);
  // //stan otwarcia się modalu
  // const [modalOpen, setModalOpen] = useState(false);

  //stan notatki na dany dzień
  // const [notesByDay, setNotesByDay] = useState({
  //   m: [],
  //   t: [],
  //   w: [],
  //   th: [],
  //   f: [],
  //   s: [],
  //   su: [],
  // });


//nowy stan za pomocą useReducera

const initialState = {
notesByDay: {
  m: [],
  t: [],
  w: [],
  th: [],
  f: [],
  s: [],
  su: [] },
  modalOpen:false,
  addOpen:false,
  descm:'',
  titlem:'',
  editNote:{},

}
 



//funkcja reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'addModal':
      return { ...state, modalOpen: !state.modalOpen };
    case 'addNote':
      return { ...state, addOpen: !state.addOpen };
    case 'setTitlem':
      return { ...state, titlem: action.payload };
    case 'setDescm':
      return { ...state, descm: action.payload };
      case 'setNotes':
        return { ...state, notesByDay: { ...state.notesByDay, [props.day]: action.payload } };
      case 'clearInputs':
      return { ...state, titlem: '', descm: '' };
      case 'deleteNote': {
      const { id, day } = action.payload;
      const updatedNotes = state.notesByDay[day].filter((note) => note._id !== id);
      return { ...state, notesByDay: { ...state.notesByDay, [day]: updatedNotes } }};
      case 'setEditNote':
  return { ...state, editNote: action.payload };
  case 'fetchNotes':
  return {
    ...state,
    notesByDay: {
      ...state.notesByDay,
      [action.payload.day]: action.payload.notes
    }
  };
  
  }
};
    
      const [state,dispatch] = useReducer(reducer,initialState)
      
      console.log(state.notesByDay.f,state.notesByDay.m)
  //style do modala
  const customStyles = {
    content: {
      height: "350px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
    },
  };

 

   //przycisk edytuj
   const EditNoteHandler = (note) => {
    dispatch({ type: 'addModal' }); 
    dispatch({ type: 'setEditNote', payload: note });
  };


  
 //dodawanie notatki

 async function addNote() {
  const newNote = await addNoteBackend(state.titlem, state.descm, props.day);
  
  dispatch({ type: 'setNotes', payload: [...state.notesByDay[props.day], newNote]  }); 
  dispatch({type:'addNote'})
  dispatch({ type: 'clearInputs' });
  
}
 



  useEffect(() => {
    fetchNotes(dispatch,props.day);
  }, []);

  //usuwanie notatek
  async function deleteNote(id, day) {
    await deleteNoteBackend(id, day);
    dispatch({ type: 'deleteNote', payload: { id, day } });
  }

  //edytowanie
  async function Editnote(note, day) {
    const notes = [...state.notesByDay[day]];
    const index = notes.findIndex((x) => x._id === note._id);
    notes[index] = note;

    await editNoteBackend(note, day);
    dispatch({ type: 'addModal' }); 
    dispatch({ type: 'setNotes', payload: notes })
  }

  return (
    <div className="lolek">
    
      {state.notesByDay ? (
        <>
          {" "}
          <div className="monday border">
            <Modal
              isOpen={state.modalOpen}
              contentLabel="Edytuj Notatkę"
              style={customStyles}
            >
              <EditNote
                name={state.editNote.title}
                description={state.editNote.body}
                id={state.editNote._id}
                onEdit={(note, day) => Editnote(note, day)}
                day={props.day}
              />
              <button onClick={() => ToglleModal(dispatch)}>Anuluj</button>
            </Modal>
            <p className="zada ">{props.dayTitle} </p>
            {state.notesByDay[props.day].length > 0 && state.notesByDay[props.day].map((notatka) => (
              <Note
                key={notatka._id}
                name={notatka.title}
                description={notatka.body}
                id={notatka._id}
                deleteNote={(id, day) => deleteNote(id, day)}
                EditNoteHandler={(note) => EditNoteHandler(note)}
                day={props.day}
              />
            ))}

            <div className="addnote">
              <button className="butt" onClick={() => openAdd(dispatch)}>
                Dodaj{" "}
              </button>
              {state.addOpen ? (
                <>
                  <label className="la">Godzina:</label>
                  <input
                    className="la"
                    value={state.titlem}
                    type="text"
                    onChange={(e) => dispatch({ type: 'setTitlem', payload: e.target.value })}
                  ></input>
                  <label className="la">Opis:</label>
                  <input
                    className="la"
                    value={state.descm}
                    type="text"
                    onChange={(e) => dispatch({ type: 'setDescm', payload: e.target.value })}
                  ></input>
                  <button onClick={() => addNote(props.day)} className="later">Dodaj</button>
                </>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default NoteForm;
