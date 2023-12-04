import React from 'react'
import './PreLoader.scss'
import { CircularProgress } from '@mui/material'

const PreLoader = ({ text = null }) => {
    return (
        <>
            <div className="PreLoaderMain">
                <CircularProgress className="progress" />
                {text && <> <div className="message"> {text} </div> </>}
            </div>
        </>
    )
}

export default PreLoader

