import React, { useEffect, useState } from 'react';

// Asserts | ICONS : 
import { LoadingOutlined } from '@ant-design/icons';
import { BsArrowLeftShort } from "react-icons/bs"
import { Button, Input, Upload } from 'antd';
import ImgURLGEN from 'Utils/ImgUrlGen';
import { toast } from 'react-toastify';


// import Style this page
import './AddBook.scss'
import { Book, DocumentUpload, DollarSquare, Subtitle } from 'iconsax-react';
import ReactQuill from 'react-quill';



// API's
import { CreatBooksAPI, UpdateBooksAPI } from 'API/books';



// these functions is for image uploading 
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        return console.log('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        return console.log('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

export default function AddBook({ openPage, selectedBook, allBooks, closeSubPage }) {

    const [formData, setFormData] = useState({
        title: "",
        detail: "",
        publisher: "",
        price: "0",
        category: "646253f85332232a0e766ca6",
        file: null
    })
    const [formError, setFormError] = useState({
        title: null,
        detail: null,
        publisher: null,
        price: null,
    })

    const [imageUrl, setImageUrl] = useState(null)
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)


    const enterFormData = (event) => {
        let { name, value } = event.target;

        switch (name) {
            case "title":
                if (value.length <= 0) {
                    setFormError({
                        ...formError,
                        title: "A Title is requried."
                    })

                } else {
                    setFormError({
                        ...formError,
                        title: null
                    })
                }
                break;
            case "file":
                if (value.length <= 0) {
                    setFormError({
                        ...formError,
                        file: "A file is requried."
                    })

                } else {
                    setFormError({
                        ...formError,
                        file: null
                    })
                }
                break;
            case "detail":
                if (value.length <= 0) {
                    setFormError({
                        ...formError,
                        detail: "A Detail is requried."
                    })

                } else {
                    setFormError({
                        ...formError,
                        detail: null
                    })
                }
                break;
            case "price":
                if (value.length <= 0) {
                    setFormError({
                        ...formError,
                        price: "A price is requried."
                    })

                } else {
                    setFormError({
                        ...formError,
                        price: null
                    })
                }
                break;
            default:
                break;
        }
        setFormData({
            ...formData,
            [name]: value
        })
    };

    const handleUploadChange = (info) => {
        getBase64(info.file.originFileObj, (url) => {
            setImageUrl(url);
        });

        setFile(info?.file?.originFileObj || null)
    };
    const handleFileUploadChange = (info) => {
        setFormData({
            ...formData,
            file: info?.file?.originFileObj || null
        })
    };

    useEffect(() => {
        if (selectedBook) {
            const findBook = allBooks?.find(val => val?._id == selectedBook?._id)
            if (findBook) {
                setFormData({
                    title: findBook?.title,
                    detail: findBook?.detail,
                    price: findBook?.price,
                    publisher: findBook?.publisher,
                    tag_name: findBook?.tag_name && JSON.parse(findBook?.tag_name),
                    categories: []
                })
                setImageUrl(ImgURLGEN(findBook?.image))
            }
        } else {
            setFormData({
                title: "",
                price: "",
                detail: "",
                publisher: "",
                tag_name: [],
                categories: [],
                file: null
            })
            setImageUrl()
        }
    }, [selectedBook])


    const uploadButton = (
        <div>
            {loading && <LoadingOutlined />}
            <div
                style={{
                    marginTop: 0,
                }}
            >
                Upload
            </div>
        </div>
    );


    const handleUploadBook = async () => {
        setLoading(true)
        let fData = new FormData()
        Object.keys(formData).map((key) => {
            if (formData[key]) {
                fData.append(key, formData[key])
            }

        })
        if (file) {
            fData.append("cover", file)
        }
        let res;
        if (selectedBook) {
            fData.append("_method", "PATCH")
            res = await UpdateBooksAPI(selectedBook?._id, fData)
        } else {
            res = await CreatBooksAPI(fData)
        }
        if (res.error != null) {
            toast.error(res.error)
        } else {
            toast.success(res?.data?.message)
            closeSubPage()
        }
        setLoading(false)
    }


    var toolbarOptions = [
        ['bold', 'italic'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],
        ['image', 'video'],                      // text direction

        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

    ];
    var toolbarOptionsMobile = [
        ['bold', 'italic'],
        [{ 'font': [] }],
        ['image'],
    ];

    const modules = {
        toolbar: toolbarOptions
    };
    const modulesMobile = {
        toolbar: toolbarOptionsMobile
    };

    const { TextArea } = Input



    return (
        <>
            <div className="AddBookFormContainer">
                <div className="headingAddBook">
                    <div className="headerleft heading upper flexLine">
                        <BsArrowLeftShort className='icon cursor' onClick={closeSubPage} />
                        <div className="heading">{selectedBook ? "Edit Book" : "Add Book"}</div>
                    </div>

                </div>
                <div className="AddBookBodyArea">
                    <Upload
                        name="image"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={handleUploadChange}
                    >
                        {imageUrl ? (
                            <div className="imgBox">
                                <img
                                    src={imageUrl}
                                    alt="avatar"
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </div>
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                    <div className="InputFields">
                        <div className="Inputfield">
                            <div className="field1 field">
                                <div className="lableName">Book Title</div>
                                <Input prefix={<Subtitle />} size='large' className='bookInput' type="text" placeholder='Book Title' name="title" onChange={enterFormData} value={formData?.title} />
                                {formError?.title && <div className="errorMessage">{formError?.title}</div>}
                            </div>
                            <div className="field2 field">
                                <div className="lableName">Book Title</div>
                                <div className='uploadBtn'>

                                    <div className="icon"><Book style={{ color: "black" }} /> {formData?.file ? formData?.file?.name : "Upload Your File Here"} </div>
                                    <Upload
                                        name="file"
                                        className="upload"
                                        showUploadList={false}
                                        beforeUpload={beforeUpload}
                                        onChange={handleFileUploadChange}
                                    >
                                        {formData?.file ? (
                                            <DocumentUpload />
                                        ) : (
                                            <DocumentUpload />
                                        )}
                                    </Upload>

                                    {formError?.file && <div className="errorMessage">{formError?.file}</div>}
                                </div>
                            </div>

                        </div>
                        <div className="Inputfield">
                            <div className="field1 field">
                                <div className="lableName">Book Publisher</div>
                                <Input prefix={<Book />} size='large' className='bookInput' type="text" placeholder='Book Publisher' name="publisher" onChange={enterFormData} value={formData?.publisher} />
                                {formError?.publisher && <div className="errorMessage">{formError?.publisher}</div>}
                            </div>
                            <div className="field2 field">
                                <div className="lableName">Book Price</div>
                                <Input prefix={<DollarSquare />} size='large' className='bookInput' type="text" placeholder='Book Price' name="price" onChange={enterFormData} defaultValue={0} value={formData?.price} />
                                {formError?.price && <div className="errorMessage">{formError?.price}</div>}
                            </div>
                        </div>
                        <div className="field2 field descriptionMain">
                            <div className="descriptionHeader heading">
                                Book Description
                            </div>
                            <div className="descriptionPara">
                                <ReactQuill parseWhitespace={true} theme='snow' style={{ height: "250px" }} modules={modules} className='contentPara' value={formData?.detail} name="detail" onChange={(val) => enterFormData({ target: { name: "detail", value: val } })} />
                            </div>
                            <div className="descriptionParaMobile">
                                {/* <ReactQuill parseWhitespace={true} theme='snow' style={{ height: "250px" }} modules={modulesMobile} className='contentPara' value={formData?.detail} name="detail" onChange={(val) => enterFormData({ target: { name: "detail", value: val } })} /> */}
                            </div>
                        </div>
                        {
                            <Button className="yellowGraBtn uploadAddBookBtn" onClick={handleUploadBook}>{selectedBook ? "Update Book" : "Upload Book"}</Button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
