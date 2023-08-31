import React, { useEffect } from 'react'
 
//STYLES
import FileUpload from '../FileUpload/FileUpload';
import "./banner.css";
function Banner(props) {

  useEffect(() => {

  }, [props.varFiles])
  return (
    <div className='banner-con'>
        <div className='container p-3'>
            <div className='d-flex flex-row justify-content-between'>
                <div className='banner-text-con col '>
                    <h3>Meta Data Extractor</h3>
                    
                    <h5>Extract metadata from Images to PDF</h5>
                    <span><span className='company-text'>photoExtract</span> creates a PDF containing the picture and metadata from uploaded images</span>
                </div>
                <div className='my-3 col'>
                 
                    <FileUpload activeProfileId={props.activeProfileId} key={props.key} setKey={props.setKey} setDownload={props.setDownload} varFiles={props.varFiles} setFiles={props.setFiles} removeFile={props.removeFile} />
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Banner