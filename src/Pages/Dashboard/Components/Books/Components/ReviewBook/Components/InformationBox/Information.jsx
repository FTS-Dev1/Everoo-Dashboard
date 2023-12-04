import React from 'react'

// MUI | ANT-D :
import { Select } from 'antd';

// CSS :
import './Information.scss'





const Infomation = ({ postData, enteringPostData }) => {

    return (
        <>

            <div className='blogForm'>
                <div className="mb-3">
                    <label className="form-label heading">Categories</label>
                    <Select
                        bordered = {false}
                        mode="tags"
                        placeholder="Category"
                        value={postData.categories}
                        onChange={(value) => enteringPostData({ target: { name: "categories", value: value } })}
                        style={{
                            width: '100%',
                        }}
                        dropdownStyle={{ display: "none" }}
                        className = "selectStyleReviewPage"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label heading">Tags</label>
                    <Select
                        bordered = {false}
                        mode="tags"
                        placeholder="Tag"
                        value={postData.tags}
                        onChange={(value) => enteringPostData({ target: { name: "tags", value: value } })}
                        style={{
                            width: '100%',
                        }}
                        dropdownStyle={{ display: "none" }}
                        className = "selectStyleReviewPage"
                    />
                </div>
            </div>
        </>
    )
}

export default Infomation
