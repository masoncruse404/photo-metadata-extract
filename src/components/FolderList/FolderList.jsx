import React, {useEffect, useState} from 'react'
import FileDownloadItem from '../FileDownloadItem/FileDownloadItem'
import FileDownload from '../FileDownload/FileDownload'

//STYLES
import "./FolderList.css"
import DownloadModal from '../../modals/DownloadModal/DownloadModal'

function FolderList({varFiles,toggleDownloadModal, isDownloadModal}) {

  const [isDownloadModalArray, setIsDownloadModalArray] = useState([])
  var downloadModalArray = []

  function toggleParam(varToggle, varSetIsDownloadModalArray, varIndex, varDownloadModalArray){
    let toggleVal = !varToggle
    varDownloadModalArray[varIndex] = toggleVal
    varSetIsDownloadModalArray(varDownloadModalArray)
    return toggleVal
  }

 useEffect(() => {
  

 }, [isDownloadModalArray, downloadModalArray])
  
  return (
    <ul className='file-list container folder-list-con'>
        <div className='m-3'><h1>My PDF's</h1></div>
        {
            varFiles &&
            varFiles.map((f,index) => 
            <FileDownload 
                toggleParam={toggleParam}
                key={index}
                id={index}
                file={f}
                filepath={f._id}
                downloadModalArray={downloadModalArray}
                setIsDownloadModalArray={setIsDownloadModalArray}
               
            />)
          
        }
        {
          varFiles &&
          varFiles.map((f,index) => 
            <DownloadModal id={index}  toggleParam={toggleParam}  isDownloadModalArray={isDownloadModalArray} setIsDownloadModalArray={setIsDownloadModalArray} downloadModalArray={downloadModalArray} isDownloadModal={isDownloadModal} toggleDownloadModal={toggleDownloadModal} filepath={f._id} />
          )
        }
        
    </ul>
  )
}

export default FolderList