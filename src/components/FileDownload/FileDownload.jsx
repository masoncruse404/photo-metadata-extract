import React from 'react'
import FileDownloadItem  from '../FileDownloadItem/FileDownloadItem'

//STYLES
import "./FileDownload.css"
function FileDownload({filepath, toggleDownloadModal, toggleParam,downloadModalArray,setIsDownloadModalArray}) {

  
  return (
    <div className='container file-download-con' >
        {filepath ? <FileDownloadItem setIsDownloadModalArray={setIsDownloadModalArray} downloadModalArray={downloadModalArray} toggleParam={toggleParam} toggleDownloadModal={toggleDownloadModal} filepath={filepath} /> : null}
    </div>
  )
}

export default FileDownload