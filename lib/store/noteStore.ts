import { create } from "zustand";
import { NoteData } from "@/types/note";
import { persist } from "zustand/middleware";

interface NoteDraftStore {
  draft: NoteData;
  setDraft: (note: NoteData) => void;
  clearDraft: () => void;
}

export const initialDraft: NoteData = {
  title: "",
  content: "",
  tag: "Todo",
};
export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
