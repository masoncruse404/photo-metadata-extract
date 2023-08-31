import React, { useEffect, useState } from 'react';
//COMPONENTS
import FolderList from '../../components/FolderList/FolderList';

//API
import getUser from '../../api/GetUser/GetUser';
import getFolder from '../../api/GetFolders/GetFolders';



function Profile({toggleDownloadModal}) {

  const [username, setUsername] = useState("John Doe");
  const [login, setLogin] = useState("");
  const [activeProfileId, setActiveProfileId] = useState(false);
  const [varFiles, setFiles] = useState([])
  const [isDownloadModal, setDownloadModal] = useState(false)
  const [key, setKey] = useState(1)
  const [varDownload, setDownload] = useState(0)
 
  function toggleDownloadModal(){
    setDownloadModal(!isDownloadModal)
  }


   useEffect(() => {
       
        getUser(setUsername, setActiveProfileId)
        getFolder(activeProfileId, setFiles)
        setLogin(activeProfileId ? true : false)
        
    },[activeProfileId])
   
 
  return (
  <>
    

    <FolderList  isDownloadModal={isDownloadModal}  filepath={varDownload} key={key} setKey={setKey} toggleDownloadModal={toggleDownloadModal} varFiles={varFiles}/>
 
  </>
  );
}

export default Profile;
