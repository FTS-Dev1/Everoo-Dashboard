import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// MUI | ANT-D :
import { Button } from 'antd'
import { CircularProgress, Skeleton } from '@mui/material';


// Assets || ICONS :
import { RiInformationLine } from 'react-icons/ri'
import { BagCross, Edit2, Filter } from 'iconsax-react'
// Components :
import ConfirmationModel from '../../../../../../Components/ConfirmationModel/ConfirmationModel';
import { Select } from 'antd';


// API :
import { DeleteBlogsAPI, GetAllBlogsAPI } from '../../../../../../API/blogs';

// Helpers :
import { toast } from 'react-toastify';
import ImgURLGEN from 'Utils/ImgUrlGen';
import ROLES from 'Utils/Roles'

// Redux :
import { useSelector } from 'react-redux';

// CSS :
import "./AllBlogs.scss";
import PreLoader from 'Components/PreLoader/PreLoader';





const AllBlogs = ({ page, setPage, setSelectedBlog, data, setData, RoutePermissions }) => {
    const UserData = useSelector(state => state?.userData)

    const [loading, setLoading] = useState(true)
    const [refreshPage, setRefreshPage] = useState(false)
    const [selectData, setSelectData] = useState(data)
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        open: false,
        blogId: null,
        loading: false
    })

    const gettingAllBlogs = async () => {
        setLoading(true)
        const res = await GetAllBlogsAPI()
        if (res.error != null) {
            toast.error("etwas ist schief gelaufen")
        } else {
            let blogData = res.data.result
            setData(blogData || [])
            setSelectData(blogData)
        }
        setLoading(false)
    }
    useEffect(() => {
        gettingAllBlogs()
    }, [page, refreshPage])

    const handleBlogStatus = async (blog) => {
        if ([ROLES.Admin, ROLES.SuperAdmin].includes(UserData?.role?.name) || UserData?.isSuperAdmin) {
            if (blog?.status == "approved") {
                toast.warn("Already Approved")
            } else if (blog?.status == "rejected") {
                toast.warn("Already Rejected")
            } else {
                handleReviewBlog(blog)
            }
        } else {
            toast.warn("Operation not allowed")
        }
    }

    const handleEditBlog = async (blog) => {
        setSelectedBlog(blog)
        setPage("edit")
    }
    const handleReviewBlog = async (blog) => {
        setSelectedBlog(blog)
        setPage("review")
    }

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


    const handleDeleteBlogConfirmation = (blog) => {
        setDeleteConfirmation({
            open: true,
            blogId: blog?._id,
            loading: false
        })
    }
    const handleDeleteBlog = async (blog) => {
        setDeleteConfirmation({
            ...deleteConfirmation,
            loading: true
        })
        const res = await DeleteBlogsAPI(deleteConfirmation?.blogId)
        if (res.error != null) {
            toast.error("etwas ist schief gelaufen")
        } else {
            toast.success("Operation erfolgreich")
            setRefreshPage(!refreshPage)
        }
        setDeleteConfirmation({
            open: false,
            blogId: null,
            loading: false
        })
    }
    const handleNotDeleteBlog = () => {
        setDeleteConfirmation({
            open: false,
            blogId: null,
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

    return (
        <>
            <div className="allBlogsContainer">
                <div className="flexLineSpace">
                    <div className="heading upper">Blogs</div>
                    <div className="buttonandFilter">
                        <div className="filterMain">
                            <Select
                                onChange={handleChange}
                                defaultValue={"Select"}
                                className='filterData '
                                style={{
                                    minwidth: 200,
                                }}
                                suffixIcon={<Filter color="#5E9894" />}
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
                            <Button className='dashboardBtn' style={{ width: "120px" }} onClick={() => setPage("edit")}> Add Blog </Button>
                        }
                    </div>
                </div>
                <div className="BlogContainerMain">
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

                            !data || data.length <= 0 ?
                                <>
                                    <div className="noDataBox">
                                        No Blogs Found
                                    </div>
                                </>
                                :
                                <>
                                    <div className="blogsBox">
                                        {
                                            selectData?.map((blog, i) => {
                                                return (
                                                    <>
                                                        <div className="blog" key={i}>
                                                            <div className='blogImage'>
                                                                <img src={ImgURLGEN(blog?.image)} alt="ERROR" />
                                                                <div className="tag cursor" style={blog?.status == "approved" ? { background: "var(--themeBackGreenGradient)", boxShadow: "var(--themeBackGreenBoxShadow)" } : blog?.status == "rejected" ? { background: "var(--themeBackRedGradient)", boxShadow: "var(--themeBackRedBoxShadow)" } : { background: "var(--themeBackYellowGradient)", boxShadow: "var(--themeBackYellowBoxShadow)" }} onClick={() => handleBlogStatus(blog)}>{blog?.status == "approved" ? "Approved" : blog?.status == "rejected" ? "Rejected" : "Pending"}</div>
                                                            </div>
                                                            <div className="details">
                                                                <div className="title">{showFullHeading ? blog?.title?.replace(/<[^>]+>/g, '') : shortenHeading(blog?.title, 52)}</div>
                                                                <div className="content">{showFullDescription ? blog?.detail?.replace(/<[^>]+>/g, '') : shortenDescription(blog?.detail?.replace(/<[^>]+>/g, ''), 160)}</div>
                                                            </div>
                                                            <div className="blogButtons">
                                                                {
                                                                    UserData._id == blog?.user?._id ?
                                                                        <>
                                                                            {
                                                                                (UserData?.isSuperAdmin || RoutePermissions?.includes("edit")) &&
                                                                                <Button className="greenGradientBtn" onClick={() => handleEditBlog(blog)}><Edit2 className='CommonBtnBlog' />Edit</Button>
                                                                            }
                                                                        </>
                                                                        :
                                                                        <>
                                                                            {
                                                                                (UserData?.isSuperAdmin || RoutePermissions?.includes("edit")) &&
                                                                                <Button className="greenGradientBtn" onClick={() => handleEditBlog(blog)}><Edit2 className='CommonBtnBlog' />Edit</Button>
                                                                            }
                                                                        </>
                                                                }
                                                                {
                                                                    (UserData?.isSuperAdmin || RoutePermissions?.includes("delete")) &&
                                                                    <Button className="redGradientBtn" onClick={() => handleDeleteBlogConfirmation(blog)}><BagCross className='CommonBtnBlog' />Delete</Button>
                                                                }
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
            <ConfirmationModel open={deleteConfirmation.open} onOk={handleDeleteBlog} onCancel={handleNotDeleteBlog} confirmLoading={deleteConfirmation.loading} test={deleteConfirmation.blogId}>
                <div className="deleteModel">
                    <div className="titleBox">
                        <RiInformationLine className='icon' /> <div className="title"> Are you sure you want to delete this Blog? </div>
                    </div>
                </div>
            </ConfirmationModel>
        </>
    )
}

export default AllBlogs

