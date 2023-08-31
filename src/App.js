
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from "./components/navbar/navbar"
import Footer from "./components/footer/Footer"
import RegisterModal from './modals/RegisterModal/RegisterModal';
import LoginModal from './modals/LoginModal/LoginModal';

//PAGES
import Upload from './pages/upload/Upload';
import Profile from './pages/profile/Profile';


//API
import getUser from './api/GetUser/GetUser';
function App() {

  const [username, setUsername] = useState("John Doe");
  const [login, setLogin] = useState("");
  const [activeProfileId, setActiveProfileId] = useState(false);
  const [varFiles, setFiles] = useState([])
  const [isDownloadModal, setDownloadModal] = useState(false)
  const [isRegisterModal, setIsRegisterModal] = useState(false)
  const [isLoginModal, setIsLoginModal] = useState(false)

  function toggleRegisterModal(){
    setIsRegisterModal(!isRegisterModal)
  }
  function toggleDownloadModal(){
    setDownloadModal(!isDownloadModal)
  }

  function toggleLoginModal(){
    setIsLoginModal(!isLoginModal)
  }

   useEffect(() => {
        
        getUser(setUsername, setActiveProfileId)
        setLogin(activeProfileId ? true : false)
        
    },[varFiles])
   
  
  return (
  <>
     <Router>
          <LoginModal setLogin={setLogin} setActiveProfileId={setActiveProfileId} activeProfileId={activeProfileId} toggleLoginModal={toggleLoginModal} isLoginModal={isLoginModal} toggleRegisterModal={toggleRegisterModal} />
          <RegisterModal toggleLoginModal={toggleLoginModal} isRegisterModal={isRegisterModal} toggleRegisterModal={toggleRegisterModal}/>
          <Navbar activeProfileId={activeProfileId} setUsername={setUsername} login={login} toggleLoginModal={toggleLoginModal} toggleRegisterModal={toggleRegisterModal}/>
            
            <Routes>
                <Route exact path='/'  element={<Upload activeProfileId={activeProfileId} toggleDownloadModal={toggleDownloadModal}/>} />
                <Route path='/profile' element={<Profile toggleDownloadModal={toggleDownloadModal}/>} />  
            </Routes>

            <Footer />
      </Router>
  </>
  );
}

export default App;
