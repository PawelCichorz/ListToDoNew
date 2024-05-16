import axios from "axios";
import { apiUrl } from "./BackendPaths";

export async function fetchNotesBackend(day) {
  const res = await axios.get(apiUrl + day);
  return res.data;
}

export async function deleteNoteBackend(id, day) {
  await axios.delete(`${apiUrl}${day}/${id}`);
}

export async function addNoteBackend(title, body, day) {
  const res = await axios.post(apiUrl + day, {
    title,
    body,
  });
  return res.data;
}

export async function editNoteBackend(note, day) {
  await axios.put(`${apiUrl}${day}/${note._id}`, note);
}
