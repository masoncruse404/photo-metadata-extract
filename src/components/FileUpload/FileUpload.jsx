import { faDownload, faExclamationTriangle, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'

import "./FileUpload.css";
import Settings from '../Settings/Settings';

//UTIL
import getBaseURL from "../../util/Constants.js"
const FileUpload = ({setDownload, varFiles, setFiles, key, setKey, activeProfileId}) =>  {
    const tagList = ["File Name","GPS Latitude","GPS Longitude","File Modification Date/Time","Modify Date","Lens Make","Lens Model","Date/Time Original","Create Date","GPS Position","Device Manufacturer","Software","Camera Model Name","Make"]
    const [tagArr, setTagArr] = useState([])
    const [isSettingsModal, setIsSettingsModal] = useState(false)

    const fileExt = ['png', 'jpg', 'jpeg']
    var uploadedFiles = []
    function handleUploadClick(e){
 
        setIsSettingsModal(false)
    }
    const uploadHandler = async (event) => {
       
        setDownload(0)
        let var_key = key
        setKey(var_key+1)
        const myFiles = document.getElementById('myFiles').files

        const formData = new FormData()

        Object.keys(myFiles).forEach(key => {
            formData.append(myFiles.item(key).name, myFiles.item(key))
            myFiles.item(key).isUploading = true;
            uploadedFiles.push(myFiles.item(key))
            setFiles(uploadedFiles)
        })

        formData.append("profileID", activeProfileId)
      
        if(tagArr.length > 0){
            // Use selected tags for extraction 
            for(var tag in tagArr){
                formData.append("meta_tags", tagArr[tag])
            }
        }else{
            // No tag was specific for extraction extract every tag
            for(var tag in tagList){
                formData.append("meta_tags", tagList[tag])
            }
        }
            
        const base_url = getBaseURL()
        const response = await fetch(base_url+'upload', {
            method: 'POST',
            body: formData,
        })
   
        if(response.status === 200){
            const json = await response.json()
            setDownload(json.status)
       
            for(let file in uploadedFiles){
                uploadedFiles[file].isUploading = false
                setFiles([...uploadedFiles])
             
                
                

            }
        }

        if(response.status === 413){
            const jsonError = await response.json()
       
            const fileError = jsonError.status
   
            for(let error in fileError){
                for(let file in uploadedFiles){
                  
                    if(fileError[error] === uploadedFiles[file].name){
                        uploadedFiles[file].isError = true
                        uploadedFiles[file].errorMSG = 'Upload failed:' + ' ' + uploadedFiles[file].name + ' is larger than 5MB'
                    }
                }
            }

           

            setFiles([...uploadedFiles])
        }

        if(response.status === 422){
           
            const jsonError = await response.json()
           
            const fileError = jsonError.message
          
            for(let file in uploadedFiles){
          
              
                var uploadedFileExt = uploadedFiles[file].name.toLowerCase().split('.').pop();
                
                if(fileExt.includes(uploadedFileExt)){
                  /*   console.log('file ext error',uploadedFiles[file].name)
                    console.log('file error ext INCLUDES') */
                }else{
                   
                    uploadedFiles[file].isError = true
                    uploadedFiles[file].errorMSG = fileError
                }
            }
            setFiles([...uploadedFiles])
        }
       
       
       
   
    }
    useEffect(() => {
       
    },[varFiles, tagArr])
   
  return (
    <>  
           
        <div className='file-upload-con '>
            <div className='container p-3 d-flex'>

                <div className='upload-btn-con'>
                <div className='d-flex flex-row'>
                    <div className='file-inputs d-flex flex-row justify-content-center align-items-center '>
                        <div >
                            <i className='file-input-icon'> 
                                <FontAwesomeIcon icon={faExclamationTriangle}   size="xl" />
                            </i>
                        </div>
                        <input className='file-inputs-input' title=" " type='file' id='myFiles' accept="image/*" multiple onClick={e => handleUploadClick(e)} onChange={uploadHandler}/>
                        <span><span  className='bold-text extract-text' >Upload</span> <span className='bold-text metadata-text'>Images</span></span>
                        
                    
                    </div>
                    <Settings tagList={tagList} isSettingsModal={isSettingsModal} setIsSettingsModal={setIsSettingsModal} setTagArr={setTagArr}/>
                </div>
                <div className='supported-files-con d-flex flex-row  '>
                    <div>
                        <div>
                            <div className='convert-text mt-3'> Convert / Extract Images to PDF</div>
                        </div>
                        <div className='d-flex flex-row'>
                            <div className='main'>Supported files:</div>
                            <div className='mx-1 info'> JPEG, JPG, and PNG.</div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
       
    </>
  )
}

export default FileUpload;