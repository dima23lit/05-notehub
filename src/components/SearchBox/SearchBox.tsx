import css from "./SearchBox.module.css"

interface SearchBoxProps {
  text: string;
  onSearch: (newSearchQuery: string) => void;
  setPage: (currentPage: number) => void
}

export default function SearchBox({ text, onSearch, setPage }: SearchBoxProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(event.target.value);
      setPage(1)
  };

    return (
        <input
            className={css.input}
            type="text"
            placeholder="Search notes"
            defaultValue={text}
            onChange={handleChange}
        />
    )
}