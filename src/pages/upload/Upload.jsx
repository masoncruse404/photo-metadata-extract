
import React, { useEffect, useState } from 'react';


import Banner from '../../components/banner/banner';
import DownloadModal from '../../modals/DownloadModal/DownloadModal';
import UploadContainer from '../../components/UploadContainer/UploadContainer';

function Upload({activeProfileId, toggleDownloadModal}) {



  const [varFiles, setFiles] = useState([])
  const [isDownloadModal, setDownloadModal] = useState(false)
  const [isRegisterModal, setIsRegisterModal] = useState(false)
  const [isLoginModal, setIsLoginModal] = useState(false)
  const [key, setKey] = useState(1)
  const [varDownload, setDownload] = useState(0)


  function toggleDownloadModal(){
    setDownloadModal(!isDownloadModal)
  }


  const removeFile = (filename) => {
    setFiles(varFiles.filter(file => file.name !== filename) )
  }
   useEffect(() => {
       
    },[varFiles, varDownload])
   
 
  return (
  <>
    <DownloadModal  isDownloadModal={isDownloadModal} toggleDownloadModal={toggleDownloadModal} filepath={varDownload} key={key} setKey={setKey} />
    <Banner setKey={setKey} activeProfileId={activeProfileId} key={key} varFiles={varFiles} setDownload={setDownload} setFiles={setFiles} removeFile={removeFile} />
    <UploadContainer varFiles={varFiles} removeFile={removeFile} filepath={varDownload} toggleDownloadModal={toggleDownloadModal} />
   

  </>
  );
}

export default Upload;
