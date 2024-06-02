import axios from "axios";
import { apiUrl } from "./BackendPaths";
import { Note } from "./Components/type";

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

export async function loginBackend(email: string, password: string) {
  const res = await axios.post("http://localhost:3031/logowanie", {
    email: email,
    password: password,
  });
  console.log("Backend response:", res); // Dodaj logowanie do diagnostyki
  return res;
}

export async function registerBackend(email: string, password: string) {
  const res = await axios.post("http://localhost:3031/zarejestruj", {
    email: email,
    password: password,
  });
  return res;
}
