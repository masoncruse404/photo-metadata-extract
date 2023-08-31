import React from 'react'
import FileItem from '../FileItem/FileItem'


//STYLES
import "./FileList.css";
const FileList = ({varFiles}) => {
   
    
  return (
    <ul className='file-list  container'>
        {
            varFiles &&
            varFiles.map((f,index) => <FileItem 
                key={index}
                id={index}
                file={f}
                error={f.isError}
                errorMSG={f.errorMSG}
            />)
        }
    </ul>
  )
}

export default FileList