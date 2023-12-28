import React, { useState, useEffect } from 'react'

// MUI | ANT-D :
import { Input, Button, Image } from 'antd';

// Components
import Infomation from './Components/InformationBox/Information';

// Assets | ICONS :
import { ReactComponent as Save } from '../../../../../../Assets/Post/save.svg'
import Avater from '../../../../../../Assets/Images/profile.jpg'
import { BiArrowBack } from 'react-icons/bi';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';


// API :
import { CreatBooksAPI, UpdateBooksAPI, ApproveBooksAPI } from '../../../../../../API/books';

// Helpres :
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import ImgURLGEN from 'Utils/ImgUrlGen';

// CSS :
import "./ReviewBook.scss"
import 'react-quill/dist/quill.bubble.css';






const Book = ({ allBooks, selectedBook, closeSubPage }) => {

    const [postData, setPostData] = useState({
        title: "",
        quote: "",
        detail: "",
        file: null,
        slug: "",
        tags: [],
        categories: []
    })
    const [imageUrl, setImageUrl] = useState();
    const [loading, setLoading] = useState(false)

    const enteringPostData = (event) => {
        let { name, value } = event.target;

        setPostData({
            ...postData,
            [name]: value
        });
    };

    const handleReviewAcceptBook = async () => {
        let data = {
            bookId: selectedBook?._id,
            status: "approved"
        }
        const res = await ApproveBooksAPI(data)
        if (res.error != null) {
            toast.error("etwas ist schief gelaufen")
        } else {
            toast.success("Operation erfolgreich")
        }
        closeSubPage()
        setLoading(false)
    }
    const handleReviewRejectBook = async () => {
        let data = {
            bookId: selectedBook?._id,
            status: "rejected"
        }
        const res = await ApproveBooksAPI(data)
        if (res.error != null) {
            toast.error("etwas ist schief gelaufen")
        } else {
            toast.success("Operation erfolgreich")
        }
        closeSubPage()
        setLoading(false)
    }

    useEffect(() => {
        if (selectedBook) {
            const findBook = allBooks?.find(val => val?._id == selectedBook?._id)
            if (findBook) {
                setPostData({
                    title: findBook?.title,
                    detail: findBook?.detail,
                    file: null,
                    tags: findBook?.tags && JSON.parse(findBook?.tags),
                    categories: []
                })
                setImageUrl(findBook?.image?.url && ImgURLGEN(findBook?.image))
            }
        } else {
            setPostData({
                title: "",
                detail: "",
                file: null,
                tags: [],
                categories: []
            })
            setImageUrl()
        }
    }, [selectedBook])

    return (
        <>
            <div className='reviewBlogContainer'>
                <div className="flexLineSpace">
                    <div className="heading upper flexLine HeaderLeftReviewPage">
                        <BiArrowBack className='icon cursor' onClick={closeSubPage} />
                        <div className="heading">Review Books</div>
                    </div>
                    <div className="flexLine HeaderRightReviewPage">
                        <Button className='greenGradientBtn commonReviewBtn' onClick={handleReviewAcceptBook}> <DoneIcon className='commonIconReviewPage' />Approve </Button>
                        <Button className='redGradientBtn commonReviewBtn' onClick={handleReviewRejectBook} style={{ backgroundColor: "var(--danger)" }}> <CloseIcon className='commonIconReviewPage' /> Reject </Button>
                    </div>
                </div>
                <div className="box">
                    <div className="editor-section">
                        <div className="reviewImage">
                            <Image
                                // width={150}
                                className='ReviewImageHead'
                                src={ImgURLGEN(selectedBook?.image)}
                            />
                        </div>
                        <div className="contentAreaReviewPage">
                            <div className="flexLine">
                                <div className="inputBox">
                                    <div className="title">Title</div>
                                    <Input disabled size="large" placeholder="Title" value={postData.title} name="title" />
                                </div>
                                <div className="inputBox">
                                    <div className="title">Slug</div>
                                    <Input disabled size="large" placeholder="Slug" value={postData.slug} name="slug" />
                                </div>
                            </div>

                            <div className="flexLine" style={{ marginBottom: "3rem" }}>
                                <div className="inputBox">
                                    <div className="title">Content</div>
                                    <ReactQuill style={{ height: "250px" }} theme='bubble' className='contentPara' value={postData?.detail} readOnly onChange={null} />
                                </div>
                            </div>
                            <div className="flexLine">
                                <div className="inputBox">
                                    <div className="profileBox">
                                        <div className="avater">
                                            <img src={ImgURLGEN(selectedBook?.auther?.profileImage)} alt="Error" />
                                        </div>
                                        <div className="details ">
                                            <div className="name">{selectedBook?.auther?.firstName} {selectedBook?.auther?.lastName}</div>
                                            <div className="bio">{selectedBook?.auther?.bio}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="info-section">
                        <Infomation postData={postData} enteringPostData={enteringPostData} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Book
