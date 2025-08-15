import axios from "axios";
import { type Note, type NoteTag } from "../types/note"


const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

interface NotesHttpResponse {
    notes?: Note[],
    totalPages: number
}

if (!myKey) {
  throw new Error("VITE_NOTEHUB_TOKEN is not defined in the environment variables.");
}
const url = `https://notehub-public.goit.study/api/notes`;

export async function fetchNotes(page: number, perPage: number, searchTerm: string):
    Promise<NotesHttpResponse> {
    const { data } = await axios.get<NotesHttpResponse>(url, {
        params: {
            page: page,
            perPage: perPage,
            search: searchTerm,
    }, 
    headers: {
        Authorization: `Bearer ${myKey}`,
        Accept: 'application/json'
        }
    }) 
    
    return data
}

export async function deleteNote(id: string) {
    const res = await axios.delete<Note>(`${url}/${id}`, {
    headers: {
        Authorization: `Bearer ${myKey}`,
        Accept: 'application/json'
        }
    })

    return res
}

export async function createNote(newNote: NoteTag) {
    const res = await axios.post<Note>(`${url}`, newNote, {
    headers: {
        Authorization: `Bearer ${myKey}`,
        Accept: 'application/json'
        }
    })

    return res
}