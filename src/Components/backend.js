import axios from "axios";
import { apiUrl } from '../BackendPaths'


// Pobieranie notatek dla danego dnia
export async function fetchNotes(day) {
  const res = await axios.get(`${apiUrl}/${day}`);
  return res.data;
}

// Usuwanie notatki
export async function deleteNote(id, day) {
  await axios.delete(`${apiUrl}/${day}/${id}`);
}

// Dodawanie notatki
export async function addNote(title, body, day) {
  const res = await axios.post(`${apiUrl}/${day}`, {
    title,
    body,
  });
  return res.data;
}

// Edytowanie notatki
export async function editNote(note, day) {
  await axios.put(`${apiUrl}/${day}/${note._id}`, note);
}