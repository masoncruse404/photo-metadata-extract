import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faDownload } from '@fortawesome/free-solid-svg-icons'


//STYLES
import "./FileDownloadItem.css"

export default function FileDownloadItem({filepath, toggleDownloadModal, toggleParam, id, setIsDownloadModalArray, downloadModalArray}) {

  function handleFileDownloadClick(e, id){
    e.preventDefault() 
    if(toggleParam){
      toggleParam(downloadModalArray[id], setIsDownloadModalArray, id, downloadModalArray)
      return
    }
    toggleDownloadModal()
  }
  
  return (
    <li 
   
    className='list-item bg-white py-3 d-flex flex-row border d-flex justify-content-center align-items-center'>

    <FontAwesomeIcon className='mx-3' size="lg"  icon={faFilePdf}/>
    <div className='w-100'>{filepath}.pdf</div>
    <div
    onClick={e => handleFileDownloadClick(e,id)}
    className='list-item-btn d-flex'><FontAwesomeIcon className='mx-3' size="lg"  icon={faDownload}/> <div className='file-download-item-btn-text'>PDF</div>
    </div>
</li>

   
  )
}
