import css from "../App/App.module.css"
import { fetchNotes } from "../../services/noteService"
import { useQuery, keepPreviousData  } from '@tanstack/react-query'
import NoteList from "../NoteList/NoteList"
import { useState } from "react"
import Pagination from "../Pagination/Pagination"
import NoteForm from "../NoteForm/NoteForm"
import Modal from "../Modal/Modal"
import SearchBox from "../SearchBox/SearchBox"
import { useDebouncedCallback } from 'use-debounce';
import Loader from "../Loader/Loader"
import ErrorMessage from "../ErrorMessage/ErrorMessage"


export default function App() {

    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const debouncedSetSearchQuery = useDebouncedCallback(
        setSearchQuery, 300);

    const { data, isError, isLoading } = useQuery({
    queryKey: ['Note', currentPage, searchQuery],
    queryFn: () => fetchNotes(currentPage, 12, searchQuery),
    placeholderData: keepPreviousData
    })

    const totalPages = data?.totalPages || 0;

    const notes = data?.notes ?? [];

    const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

    console.log(notes.length);
    console.log(notes)
    
    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox text={searchQuery} onSearch={debouncedSetSearchQuery} />
                {isLoading && <Loader />}
                {!isLoading && isError && <ErrorMessage />}
                {notes.length > 0  && <Pagination totalPages={totalPages} onPageChange={handlePageChange} forcePage={currentPage - 1}/>}
                <button className={css.button} onClick={openModal}>Create note +</button>
            </header>
            {notes.length > 0 && <NoteList notes={notes} />}
            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <NoteForm onClose={closeModal} onSuccess={closeModal} />
                </Modal>
      )}
        </div>
    )
}