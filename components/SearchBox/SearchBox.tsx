"use client";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  searchNote: (query: string) => void;
}

const SearchBox = ({ searchNote }: SearchBoxProps) => {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={(e) => {
        searchNote(e.target.value);
      }}
    />
  );
};
export default SearchBox;
