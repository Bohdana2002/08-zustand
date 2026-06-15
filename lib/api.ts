import { Note, NoteData } from "@/types/note";
import axios from "axios";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}
export const fetchNotes = async (
  query: string,
  page: number,
  perPage: number,
  tag?: string,
): Promise<NoteResponse> => {
  const { data } = await axios.get<NoteResponse>("/notes", {
    params: { search: query, page, perPage, tag },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

  return data;
};
export const createNote = async (noteData: NoteData): Promise<Note> => {
  const { data } = await axios.post<Note>("/notes", noteData, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return data;
};
export const deleteNote = async (id: Note["id"]): Promise<Note> => {
  const { data } = await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return data;
};

export const fetchNoteById = async (noteId: Note["id"]): Promise<Note> => {
  const { data } = await axios.get<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return data;
};


