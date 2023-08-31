import React from 'react'

import FileList from '../FileList/FileList'
import FileDownload from '../FileDownload/FileDownload'

//STYLES
import './UploadContainer.css'
function UploadContainer({varFiles,removeFile,filepath,toggleDownloadModal} ) {
  return (
    <div className='upload-container'>
        <FileList varFiles={varFiles} removeFile={removeFile} />
        <FileDownload filepath={filepath} toggleDownloadModal={toggleDownloadModal}/>
    </div>
  )
}

export default UploadContainer