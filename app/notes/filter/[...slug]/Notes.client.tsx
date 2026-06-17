"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Loader from "@/components/Loader/Loader";
import { fetchNotes } from "@/lib/api";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import css from "./NotesClient.module.css";
import { useRouter } from "next/navigation";

interface Props {
  tag?: string;
}
const NotesClient = ({ tag }: Props) => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isError, isLoading } = useQuery({
    queryKey: ["notes", query, currentPage, 12, tag],
    queryFn: () => fetchNotes(query, currentPage, 12, tag),
    placeholderData: keepPreviousData,
  });
  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];
  const debouncedSearch = useDebouncedCallback((newQuery: string) => {
    setQuery(newQuery);
    setCurrentPage(1);
  }, 500);
  const router = useRouter();

  return (
    <>
      <div>
        <header className={css.header}>
          <SearchBox searchNote={debouncedSearch} />
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
          <button
            className={css.button}
            onClick={() => {
              router.push("/notes/action/create");
            }}
          >
            Create note +
          </button>
        </header>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {notes.length > 0 && <NoteList notes={notes} />}
      </div>
    </>
  );
};

export default NotesClient;
