import React, { useState, useEffect } from 'react'

// Components
import AllBlogs from "./Components/AllBlogs/AllBlogs"
import ReviewBlog from './Components/ReviewBlog/ReviewBlog';
import AddBlog from './Components/AddBlog/AddBlog';

// CSS :
import './Blogs.scss'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";





const Blog = (props) => {
    let RoutePermissions = props?.permissions || [];

    const [allBlogs, setAllBlogs] = useState([])
    const [page, setPage] = useState("all")
    const [selectedBlog, setSelectedBlog] = useState(null)

    function closeSubPage() {
        setPage("all")
        setSelectedBlog(null)
    }
    return (
        <>
            <div className="dashboardBlogsContainer">
                {
                    page == "all" ?
                        <AllBlogs page={page} setPage={setPage} setSelectedBlog={setSelectedBlog} data={allBlogs} selectedBlog={selectedBlog} setData={setAllBlogs} RoutePermissions={RoutePermissions} />
                        :
                        page == "review" ?
                            <ReviewBlog page={page} closeSubPage={closeSubPage} setPage={setPage} setSelectedBlog={setSelectedBlog} selectedBlog={selectedBlog} setData={setAllBlogs} allBlogs={allBlogs} />
                            :
                            <AddBlog allBlogs={allBlogs} setAllBlogs={setAllBlogs} selectedBlog={selectedBlog} setSelectedBlog={setSelectedBlog} closeSubPage={closeSubPage} />
                }
            </div>
        </>
    )
}

export default Blog
