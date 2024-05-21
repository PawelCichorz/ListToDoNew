import axios from "axios";
import { apiUrl } from "../BackendPaths";

export async function fetchNotesBackend(day: string) {
  const res = await axios.get(apiUrl + day);
  return res.data;
}

export async function deleteNoteBackend(id: any, day: any) {
  await axios.delete(`${apiUrl}${day}/${id}`);
}

export async function addNoteBackend(title: any, body: any, day: any) {
  const res = await axios.post(apiUrl + day, {
    title,
    body,
  });
  return res.data;
}

export async function editNoteBackend(note: any, day: any) {
  await axios.put(`${apiUrl}${day}/${note._id}`, note);
}
