import React, { useState, useEffect } from 'react'
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
//STYLES
import "./DownloadModal.css"

//IMAGES
import Advertise from "../../images/advertise.jpg"

//UTIL
import getBaseURL from '../../util/Constants';

function DownloadModal({isDownloadModal, toggleDownloadModal, filepath, id}) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [myKey, setMyKey] = useState(0)
    const [canDownload, setCanDownload] = useState(false)
    const DURATION = 10
    async function handleFileDownload(varFilePath){
        const filePath = varFilePath
      
        var BASE_URL = getBaseURL()
        window.open(BASE_URL+"download/"+varFilePath) 
        
    }
  function handleModalDownloadClick(e){
    e.preventDefault()
 
    handleFileDownload(filepath)
  
    toggleDownloadModal()
    setCanDownload(!canDownload)
    setIsPlaying(false)
  }    
  function handleModalClose(e){
    e.preventDefault()
    toggleDownloadModal()
    setCanDownload(!canDownload)
    setIsPlaying(false)
  }  
const prevKey = myKey

  useEffect(() => {
    setIsPlaying(isDownloadModal ? true : false)
    
  },[toggleDownloadModal])
  return (
   <div className={isDownloadModal ? 'modal-container  mx-w-100 d-flex justify-content-center align-items-center' : 'd-none'}>
    <div className='download-modal row'>
      <div onClick={e => handleModalClose(e)}>
        <i className='file-input-icon'> 
          <FontAwesomeIcon icon={faClose}   size="xl" />
        </i>
      </div>
   
        <div className='col-12 col-md-6'>
            <div className='d-flex justify-content-center align-items-center'>
                <div><img src={Advertise} height={300} widht={300}/></div>
            </div>
        </div>
        <div className='col-12 col-md-6 '>
            <div className='download-modal-con d-flex justify-content-center align-items-center h-100'>
                <div className={isPlaying ? '' : 'd-none'}>
                <CountdownCircleTimer
                    
                    isPlaying={isPlaying}
                    duration={DURATION}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[7, 5, 2, 0]}
                    key={myKey}
                    onComplete={() =>{
                          setMyKey(prevKey => prevKey +1)
                          setIsPlaying(false)
                          setCanDownload(!canDownload)
                    }}
                >
                {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>
                </div>
                <div 
                   
                    className={!isPlaying ? 'download-modal-btn-con d-flex justify-content-center align-items-center' : 'd-none'}> 
                    <div
                         onClick={e => handleModalDownloadClick(e)}
                        className='download-modal-btn d-flex-align-item-center justify-content-center'
                        >
                        <div>Download</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
 
   </div>
  )
}

export default DownloadModal