import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImage, faSpinner, faCheck } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect } from 'react'


//STYLES
import "./FileItem.css"
const FileItem = ({file, id, error, errorMSG}) => {

  
  useEffect(() => {
  
  }, [file])
 
  return (
    <>
    <li 
        id={id}
        key={file.name}
        className='list-item  bg-white py-3 d-flex flex-row border '>

        <FontAwesomeIcon className='mx-3' size="lg"  icon={faFileImage}/>
        <div className='w-100'>{file.name}</div>
        <div className="actions mx-3">
            {file.isUploading && 
                <FontAwesomeIcon
                    icon={faSpinner} className='fa-spin'
                />
            } 
            {!file.isUploading && 
                <FontAwesomeIcon
                    size="lg" 
                    icon={faCheck} className='mx-3 fa-trash'
                   
                />
            }
        </div>
       
    </li>
     <div className='form-item '>
            <div className={error ? 'form-item-error' : 'd-none'}>
            <div>
                        <p class="error-msg p-3">{errorMSG}</p>
                    </div>
                    <div class="invalid-item">
                        <p class="error-msg p-3">{errorMSG}</p>
                    </div>
                    <div class="valid-item">
                        <p class="msg"></p>
                    </div>
                    </div>
    </div>
    </>
  )
}

export default FileItem