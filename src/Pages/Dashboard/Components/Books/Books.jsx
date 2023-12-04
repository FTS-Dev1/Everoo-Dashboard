import React, { useState, useEffect } from 'react'

// Components
import AllBooks from "./Components/AllBooks/AllBooks"
import ReviewBook from './Components/ReviewBook/ReviewBook';
import AddBook from './Components/AddBook/AddBook';

// CSS :
import './Books.scss'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";





const Books = (props) => {
    let RoutePermissions = props?.permissions || [];

    const [allBooks, setAllBooks] = useState([])
    const [page, setPage] = useState("all")
    const [selectedBook, setSelectedBook] = useState(null)

    const closeSubPage = () => {
        setPage("all")
        setSelectedBook(null)
    }
    return (
        <>
            <div className="dashboardBooksContainer">
                {
                    page == "all" ?
                        <AllBooks page={page} setPage={setPage} setSelectedBook={setSelectedBook} data={allBooks} setData={setAllBooks} RoutePermissions={RoutePermissions} />
                        :
                        page == "review" ?
                            <ReviewBook page={page} setPage={setPage} closeSubPage={closeSubPage} selectedBook={selectedBook} setSelectedBook={setSelectedBook} allBooks={allBooks} setData={setAllBooks} />
                            :
                            <AddBook setPage={setPage} allBooks={allBooks} setAllBooks={setAllBooks} selectedBook={selectedBook} setSelectedBook={setSelectedBook} closeSubPage={closeSubPage} />
                }
            </div>
        </>
    )
}

export default Books
