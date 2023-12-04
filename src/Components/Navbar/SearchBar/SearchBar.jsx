import React, { useState } from 'react'

// Styling
import './SearchBar.scss'
import { RiSearchLine } from 'react-icons/ri'

// Helpers
import { Button, Input, Popover } from 'antd'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import ImgURL from 'Utils/ImgUrlGen'

// Api Search Data
import SearchDataAPI from 'API/search'
import { CircularProgress } from '@mui/material'



// --------------------------------------Start Component--------------------------------------------------
export default function SearchBar() {

    const [search, setSearch] = useState("")
    const [searchDataa, setSearchDataa] = useState()
    const [showBook, setShowBook] = useState(false)
    const [showBlog, setShowBlog] = useState(false)
    const [showUser, setShowUser] = useState(false)
    const [showTransaction, setShowTransaction] = useState(false)
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)


    const navigate = new useNavigate()
    const enteringData = async (e) => {
        setLoading(true)
        setSearch(e.target.value);
        let value = e.target.value
        let payload = {
            search: value
        }


        const res = await SearchDataAPI(payload)
        if (!res?.error == null) {
            toast.error(res?.data?.message)
        } else {
            setSearchDataa(res?.data?.result)
            setLoading(false)
        }


    }
    const hide = () => {
        setOpen(false)
    }
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen)
    }
    const toggleBook = (data) => {
        if (data?.id) {

            navigate(`/dashboard/books/?${data?._id}`)
        } else {
            navigate(`/dashboard/books`)
        }
        hide()
        setSearch()
        setSearchDataa()

    }
    const toggleBlog = (data) => {
        if (data?._id) {
            navigate(`/dashboard/blogs?${data?._id}`)
        }
        else {
            navigate(`/dashboard/blogs`)
        }
        hide()
        setSearch()
        setSearchDataa()

    }
    const toggleUser = (data) => {
        if (data?._id) {

            navigate(`/dashboard/users?${data?._id}`)
        } else {
            navigate('/dashboard/users')
        }
        hide()
        setSearch()
        setSearchDataa()

    }
    const toggleTransaction = (data) => {
        if (data?._id) {
            navigate(`/dashboard/transactions?${data?._id}`)
        } else {
            navigate('/dashboard/transactions')
        }
        hide()
        setSearch()
        setSearchDataa()

    }


    // --------------------Create Restriction------------------------------------------
    // Display Blog
    const displayReadingBook = showBook ? searchDataa?.[0]?.book : searchDataa?.[0]?.book.slice(0, 3);
    // Display Blog
    const displayReadingBlog = showBlog ? searchDataa?.[1]?.blog : searchDataa?.[1]?.blog.slice(0, 3);
    // Display User
    const displayReadingUser = showUser ? searchDataa?.[2]?.user : searchDataa?.[2]?.user.slice(0, 3);
    // display Transaction
    const displayReadingTransaction = showTransaction ? searchDataa?.[3]?.transaction : searchDataa?.[3]?.transaction.slice(0, 3);



    // ----------------------------Short handing and short Detail--------------------------

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

    // ------------------------------Content-------------------------------------
    let content;
    if (searchDataa) {


        content = () => {
            return (
                <>
                    <div className='search-popover'>
                        {/* ---------------------------------User Book Mapping----------------------------------------- */}

                        {
                            searchDataa?.[0]?.book[0] &&
                            <div className="books">Books</div>
                        }
                        {
                            <>{
                                displayReadingBook?.map((data, i) => {
                                    return (
                                        <>
                                            <div className="bookMain" key={i} onClick={() => toggleBook(data)}>
                                                <div className="title">
                                                    <img src={ImgURL(data?.image)} alt="Uploading" className='imageBook' />
                                                    <div className="booktitle">{showFullHeading ? data?.title?.replace(/<[^>]+>/g, '') : shortenHeading(data?.title, 15)}</div>
                                                </div>
                                                <div className="bookDetail">{showFullDescription ? data?.detail?.replace(/<[^>]+>/g, '') : shortenDescription(data?.detail?.replace(/<[^>]+>/g, ''), 30)}</div>
                                            </div>

                                        </>
                                    )
                                })
                            }{
                                    !showBook && searchDataa?.[0]?.book?.length > 3 && (
                                        <Button className="moreBtn" onClick={toggleBook} >More </Button>
                                    )
                                }
                            </>
                        }
                        {/* ---------------------------------User Bllog Mapping----------------------------------------- */}

                        {
                            searchDataa?.[1]?.blog[0] &&
                            <div className="books">Blogs</div>
                        }


                        {

                            <>
                                {
                                    displayReadingBlog?.map((data, i) => {
                                        return (
                                            <>
                                                <div className="bookMain" key={i} onClick={() => toggleBlog(data)}>
                                                    <div className="title">
                                                        <img src={ImgURL(data?.image)} alt="Uploading" className='imageBook' />
                                                        <div className="booktitle">{showFullHeading ? data?.title?.replace(/<[^>]+>/g, '') : shortenHeading(data?.title, 15)}</div>
                                                    </div>
                                                    <div className="bookDetail">{showFullDescription ? data?.detail?.replace(/<[^>]+>/g, '') : shortenDescription(data?.detail?.replace(/<[^>]+>/g, ''), 30)}</div>
                                                </div>

                                            </>
                                        )
                                    })
                                }
                                {
                                    !showBlog && searchDataa?.[1]?.blog?.length > 3 && (
                                        <Button className="moreBtn" onClick={toggleBlog} >More Blog </Button>
                                    )
                                }
                            </>
                        }


                        {/* ---------------------------------User Search Mapping----------------------------------------- */}


                        {
                            searchDataa?.[2]?.user[0] &&
                            <div className="books">Users</div>
                        }

                        {
                            <>
                                {
                                    displayReadingUser?.map((data, i) => {
                                        return (
                                            <>
                                                <div className="userMain" key={i} onClick={() => toggleUser(data)}>
                                                    <div className="title">
                                                        <img src={ImgURL(data?.image)} alt="Uploading" className='imageBook' />
                                                        <div className="name">{data?.firstName} {data?.lastName}</div>
                                                    </div>
                                                    <div className="email">{data?.email}</div>
                                                </div>

                                            </>
                                        )
                                    })
                                }
                                {
                                    !showUser && searchDataa?.[2]?.user?.length > 3 && (
                                        <Button className="moreBtn" onClick={toggleUser} >More User </Button>
                                    )
                                }

                            </>
                        }
                        {/* ---------------------------------User Transaction Mapping----------------------------------------- */}
                        {
                            searchDataa?.[3]?.transaction[0] && (
                                <div className="books">Transactions</div>
                            )
                        }
                        {
                            <div>
                                {
                                    displayReadingTransaction?.map((data, i) => {
                                        return (
                                            <>
                                                <div className="bookMain" key={i} onClick={() => toggleTransaction(data)}>
                                                    <div className="title">

                                                        <img src={ImgURL(data?.image)} alt="Uploading" className='imageBook' />
                                                        <div className="booktitle">{showFullHeading ? data?.title?.replace(/<[^>]+>/g, '') : shortenHeading(data?.title, 15)} </div>
                                                    </div>
                                                    <div className="detail">{data?.balance} <span className='transactionStatus'>{data?.status}</span></div>
                                                </div>

                                            </>
                                        )
                                    })
                                }
                                {
                                    !showTransaction && searchDataa?.[3]?.transaction?.length > 3 && (
                                        <Button className="moreBtn" onClick={toggleTransaction} >More Transaction</Button>
                                    )
                                }
                            </div>
                        }
                    </div>
                </>
            )
        }
    } else {
        content = () => {
            return (
                "Please Search Data"
            )
        }
    }


    return (
        <>
            <div className="searchBarMain">
                <Popover placement="bottomRight" onOpenChange={handleOpenChange} title={"Searching Result"} open={open} content={loading ? <CircularProgress className='loadingIcon' /> : content} trigger="click">
                    <div className='inputfield'>
                        <Input type="text" name='search' onChange={enteringData} value={search} placeholder='Search...' />
                        <RiSearchLine className="icon" />
                    </div>
                </Popover>
            </div>
        </>
    )
}
