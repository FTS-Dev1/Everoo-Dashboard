import { CircularProgress, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';

// MUI | ANT-D :
import { Button, Rate, Select } from 'antd'

// Images
import star1 from "../../../../../../Assets/Images/Star1.png"


// Assets || ICONS :
import { RiInformationLine } from 'react-icons/ri'
import { MdDelete } from 'react-icons/md'
import { Filter } from 'iconsax-react'
// Components :
import ConfirmationModel from '../../../../../../Components/ConfirmationModel/ConfirmationModel';

// API :
import { DeleteBooksAPI, GetAllBooksAPI } from '../../../../../../API/books';

// Helpers :
import { toast } from 'react-toastify';
import ImgURLGEN from 'Utils/ImgUrlGen';

// Redux :
import { useSelector } from 'react-redux';

// CSS :
import "./AllBooks.scss";
import ROLES from 'Utils/Roles';
import PreLoader from 'Components/PreLoader/PreLoader';





const AllBooks = ({ page, setPage, setSelectedBook, data, setData, RoutePermissions }) => {

    const UserData = useSelector(state => state?.userData)

    const [loading, setLoading] = useState(true)
    const [refreshPage, setRefreshPage] = useState(false)
    const [selectData, setSelectData] = useState(data)
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        open: false,
        bookId: null,
        loading: false
    })

    const gettingAllBooks = async () => {
        setLoading(true)
        const res = await GetAllBooksAPI()
        if (res.error != null) {
            toast.error(res?.error)
        } else {
            let bookData = res.data.result
            setData(bookData || [])
            setSelectData(bookData)
        }
        setLoading(false)
    }
    useEffect(() => {
        gettingAllBooks()
    }, [page, refreshPage])

    const handleBookStatus = async (book) => {
        if ([ROLES.Admin, ROLES.SuperAdmin].includes(UserData?.role?.name) || UserData?.isSuperAdmin) {
            if (book?.status == "approved") {
                toast.warn("Already Approved")
            } else if (book?.status == "rejected") {
                toast.warn("Already Rejected")
            }
            else {
                handleReviewBook(book)
            }
        } else {
            toast.warn("Operation not allowed")
        }
    }

    const handleEditBook = async (book) => {
        if (!(UserData?.isSuperAdmin || RoutePermissions?.includes("edit"))) {
            return
        }
        setSelectedBook(book)
        setPage("edit")
    }
    const handleReviewBook = async (book) => {
        setSelectedBook(book)
        setPage("review")
    }

    const handleDeleteBookConfirmation = (book) => {
        setDeleteConfirmation({
            open: true,
            bookId: book?._id,
            loading: false
        })
    }


    // Filter Data
    const handleChange = (value) => {
        if (value == "all") {
            setSelectData(data)
        }
        else {
            let blogss = [];
            data?.map((val) => {
                if (val?.status == value) {
                    blogss.push(val)
                }
            })
            setSelectData(blogss)
        }
    };

    const handleDeleteBook = async (book) => {
        setDeleteConfirmation({
            ...deleteConfirmation,
            loading: true
        })
        const res = await DeleteBooksAPI(deleteConfirmation?.bookId)
        if (res.error != null) {
            toast.error(res.error)
        } else {
            toast.success(res.data?.message)
            setRefreshPage(!refreshPage)
        }
        setDeleteConfirmation({
            open: false,
            bookId: null,
            loading: false
        })
    }
    const handleNotDeleteBook = () => {
        setDeleteConfirmation({
            open: false,
            bookId: null,
            loading: false
        })
    }



    const [showFullHeading, setShowFullHeading] = useState(false);
    const [showFullDescription, setshowFullDescription] = useState(false);

    const shortenHeading = (text, maxLength) => {
        if (text?.length > maxLength) {
            return text.slice(0, maxLength) + "...";
        } else {
            return text;
        }
    };
    const shortenDescription = (text, maxLength) => {
        if (text?.length > maxLength) {
            return text.slice(0, maxLength) + "...";
        } else {
            return text;
        }
    };
    // this desc is for Rating module
    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

    return (
        <>
            <div className="allBooksContainer">
                <div className="flexLineSpace">
                    <div className="heading upper">Books</div>
                    <div className="buttonandFilter">
                        <div className="filterMain">
                            <Select
                                onChange={handleChange}
                                defaultValue={"Select"}
                                className='filterData '
                                // style={{
                                //     minwidth: 200,
                                // }}
                                suffixIcon={<Filter color="#FCD117" className='icon' />}
                                options={[
                                    {
                                        value: 'all',
                                        label: 'All',
                                    },
                                    {
                                        value: 'pending',
                                        label: 'Pending',
                                    },
                                    {
                                        value: 'approved',
                                        label: 'Approved',
                                    },
                                    {
                                        value: 'rejected',
                                        label: 'Rejected',
                                    },
                                ]}
                            />
                        </div>
                        {
                            (UserData?.isSuperAdmin || RoutePermissions?.includes("create")) &&
                            <Button className='dashboardBtn'  onClick={() => setPage("addBook")}> Add Book </Button>
                        }
                    </div>
                </div>
                <div className="BooksContainerMain">
                    {
                        loading ?
                            // <PreLoader />
                            <div className="skeleton">
                                <Skeleton className="skel" variant="rectangular" />
                                <Skeleton className="skel" variant="rectangular" />
                                <Skeleton className="skel" variant="rectangular" />
                                <Skeleton className="skel" variant="rectangular" />
                                <Skeleton className="skel" variant="rectangular" />
                                <Skeleton className="skel" variant="rectangular" />
                                <Skeleton className="skel" variant="rectangular" />
                                <Skeleton className="skel" variant="rectangular" />
                            </div>
                            :
                            !data || data?.length <= 0 ?
                                <>
                                    <div className="noDataBox">
                                        No Books Found
                                    </div>
                                </>
                                :
                                <>
                                    <div className="booksBox">
                                        {
                                            selectData?.map((book, i) => {
                                                return (
                                                    <>
                                                        <div className="book bookMainCart" key={i}

                                                        >
                                                            <div className='bookImage'>
                                                                <img src={ImgURLGEN(book?.image)} alt="ERROR" onClick={() => handleEditBook(book)} />
                                                                <div className="tag cursor" style={book?.status == "approved" ? { background: "var(--themeBackGreenGradient)", boxShadow: "var(--themeBackGreenBoxShadow)" } : book?.status == "rejected" ? { background: "var(--themeBackRedGradient)", boxShadow: "var(--themeBackRedBoxShadow)" } : { background: "var(--themeBackYellowGradient)", boxShadow: "var(--themeBackYellowBoxShadow)" }} onClick={() => handleBookStatus(book)}>{book?.status == "approved" ? "Approved" : book?.status == "rejected" ? "Rejected" : "Pending"}</div>
                                                                {
                                                                    (UserData?.isSuperAdmin || RoutePermissions?.includes("delete")) &&
                                                                    <Button className='delBtn' onClick={() => handleDeleteBookConfirmation(book)}><MdDelete className='icon' /></Button>
                                                                }
                                                                <div className="priceMain">
                                                                    <img src={star1} alt="Error" />
                                                                    <div className="priceBook"><p className='doller'>$ </p>{book?.price || "$50"}</div>
                                                                </div>
                                                            </div>
                                                            <div className="details" onClick={() => handleEditBook(book)}>
                                                                <div className="title">{showFullHeading ? book?.title?.replace(/<[^>]+>/g, '') : shortenHeading(book?.title, 20)}</div>
                                                                <Rate tooltips={desc} disabled value={book?.review || 3} />
                                                                <div className="autherName">By :{book?.auther?.firstName} <br />{book?.auther?.lastName}</div>
                                                                <div className="content">{showFullDescription ? book?.detail?.replace(/<[^>]+>/g, '') : shortenDescription(book?.detail?.replace(/<[^>]+>/g, ''), 100)}</div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                </>
                    }
                </div>
            </div>
            <ConfirmationModel open={deleteConfirmation.open} onOk={handleDeleteBook} onCancel={handleNotDeleteBook} confirmLoading={deleteConfirmation.loading} test={deleteConfirmation.bookId}>
                <div className="deleteModel">
                    <div className="titleBox">
                        <RiInformationLine className='icon' /> <div className="title"> Are you sure you want to delete this Book? </div>
                    </div>
                </div>
            </ConfirmationModel>
        </>
    )
}

export default AllBooks

