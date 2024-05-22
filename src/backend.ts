import axios from "axios";
import { apiUrl } from "./BackendPaths";

interface Note {
  _id: string;
  title: string;
  body: string;
  __v: number;
}

export async function fetchNotesBackend(day: string) {
  const res = await axios.get(apiUrl + day);
  return res.data;
}

export async function deleteNoteBackend(id: string, day: string) {
  await axios.delete(`${apiUrl}${day}/${id}`);
}

export async function addNoteBackend(title: string, body: string, day: string) {
  const res = await axios.post(apiUrl + day, {
    title,
    body,
  });
  return res.data;
}

export async function editNoteBackend(note: Note, day: string) {
  await axios.put(`${apiUrl}${day}/${note._id}`, note);
}
