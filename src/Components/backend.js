import axios from "axios";
import { apiUrl } from "../BackendPaths";

// Pobieranie notatek dla danego dnia
export async function fetchNotesBackend(day) {
  const res = await axios.get(apiUrl + day);
  return res.data;
}

// Usuwanie notatki
export async function deleteNoteBackend(id, day) {
  await axios.delete(`${apiUrl}${day}/${id}`);
}

// Dodawanie notatki
export async function addNoteBackend(title, body, day) {
  const res = await axios.post(apiUrl + day, {
    title,
    body,
  });
  return res.data;
}

// Edytowanie notatki
export async function editNoteBackend(note, day) {
  await axios.put(`${apiUrl}${day}/${note._id}`, note);
}
