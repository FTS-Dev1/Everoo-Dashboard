import React, { useEffect, useState } from 'react';

// Asserts | ICONS : 
import { LoadingOutlined } from '@ant-design/icons';
import { BsArrowLeftShort } from "react-icons/bs"
import { Button, Input, Upload } from 'antd';
import ImgURLGEN from 'Utils/ImgUrlGen';
import { toast } from 'react-toastify';
import 'react-quill/dist/quill.snow.css';


// import Style this page
import './AddBlog.scss'
import { Blogger, Subtitle } from 'iconsax-react';
import ReactQuill from 'react-quill';



// API's
import { CreatBlogsAPI, UpdateBlogsAPI } from 'API/blogs';



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

export default function AddBlog({ allBlogs, selectedBlog, closeSubPage }) {

    const [formData, setFormData] = useState({
        title: "",
        detail: "",
        image: null,
        quote: "",
        slug: "",
        category: "646253f85332232a0e766ca6"

    })
    const [formError, setFormError] = useState({
        title: null,
        detail: null,
        quote: null,
        slug: null,
    })

    const [imageUrl, setImageUrl] = useState(null)

    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(null)


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
            case "quote":
                if (value.length <= 0) {
                    setFormError({
                        ...formError,
                        quote: "A quote is requried."
                    })

                } else {
                    setFormError({
                        ...formError,
                        quote: null
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
            case "slug":
                if (value.length <= 0) {
                    setFormError({
                        ...formError,
                        slug: "A slug is requried."
                    })

                } else {
                    setFormError({
                        ...formError,
                        slug: null
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

    const uploadButton = (
        <div>
            {loading && <LoadingOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    useEffect(() => {
        if (selectedBlog) {
            const findBlog = allBlogs?.find(val => val?._id == selectedBlog?._id)
            if (findBlog) {
                setFormData({
                    title: findBlog?.title,
                    quote: findBlog?.quote,
                    detail: findBlog?.detail,
                    slug: findBlog?.slug,
                    tag_name: findBlog?.tag_name && JSON.parse(findBlog?.tag_name),
                    categories: []
                })
                setImageUrl(ImgURLGEN(findBlog?.image))
            }
        } else {
            setFormData({
                title: "",
                quote: "",
                detail: "",
                slug: "",
                tag_name: [],
                categories: []
            })
            setImageUrl()
        }
    }, [selectedBlog])

    const handleUploadBlog = async () => {
        setLoading(true)
        let fData = new FormData()
        Object.keys(formData).map((key) => {
            if (formData[key]) {
                fData.append(key, formData[key])
            }

        })
        if (file) {
            fData.append("file", file)
        }
        let res;
        if (selectedBlog) {
            res = await UpdateBlogsAPI(selectedBlog?._id, fData)
        } else {
            res = await CreatBlogsAPI(fData)
        }
        if (res.error != null) {
            toast.error("etwas ist schief gelaufen")
        } else {
            toast.success("Operation erfolgreich")
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

    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
        'code-block',
        'align',
        'direction',
        'color',
        'background',
        'script',
        'super',
        'sub',
    ];

    const modules = {
        toolbar: toolbarOptions
    };
    const modulesMobile = {
        toolbar: toolbarOptionsMobile
    };

    return (
        <>
            <div className="AddBlogFormContainer">
                <div className="headingAddBlog">
                    <div className="headerleft heading upper flexLine">
                        <BsArrowLeftShort className='icon cursor' onClick={closeSubPage} />
                        <div className="heading">{selectedBlog ? "Edit Blog" : "Add Blog"}</div>
                    </div>

                </div>
                <div className="AddBlogBodyArea">
                    <>
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
                    </>
                    <div className="InputFields">
                        <div className="Inputfield">
                            <div className="field1 field">
                                <div className="lableName">Blog Title</div>
                                <Input prefix={<Subtitle />} size='large' className='blogInput' type="text" placeholder='Blog Title' name="title" onChange={enterFormData} value={formData?.title} />
                                {formError.title && <div className="errorMessage">{formError.title}</div>}
                            </div>
                            <div className="field2 field">
                                <div className="lableName">Blog Slug</div>
                                <Input prefix={<Subtitle />} size='large' className='blogInput' type="text" placeholder='Blog slug' name="slug" onChange={enterFormData} value={formData?.slug} />
                                {formError.slug && <div className="errorMessage">{formError.slug}</div>}
                            </div>

                        </div>
                        <div className="Inputfield">
                            <div className="field1 field">
                                <div className="lableName">Blog Quote</div>
                                <Input prefix={<Blogger />} size='large' className='blogInput' type="text" placeholder='Blog Quote' name="quote" onChange={enterFormData} value={formData?.quote} />
                                {formError.quote && <div className="errorMessage">{formError.quote}</div>}
                            </div>
                        </div>
                        <div className="field2 field descriptionMain">
                            <div className="descriptionHeader heading">
                                Blog Description
                            </div>
                            <div className="descriptionPara">
                                <ReactQuill theme='snow' formats={formats} modules={modules} style={{ height: "250px" }} className='contentPara' value={formData?.detail} name="detail" onChange={(val) => enterFormData({ target: { name: "detail", value: val } })} />
                            </div>
                            {/* <div className="descriptionParaMobile">
                                <ReactQuill theme='snow' formats={formats} modules={modulesMobile} style={{ height: "250px" }} className='contentPara' value={formData?.detail} name="detail" onChange={(val) => enterFormData({ target: { name: "detail", value: val } })} />
                            </div> */}
                        </div>
                        {
                            <Button className="yellowGraBtn uploadAddBlogBtn" onClick={handleUploadBlog}>{selectedBlog ? "Update Blog" : "Upload Blog"}</Button>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}
