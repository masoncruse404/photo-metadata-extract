import React, {useState, useRef, useEffect} from 'react'
import { faClose, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//STYLES
import "./LoginModal.css"


//API
import handleLogin from '../../api/HandleLogin/HandleLogin'
function LoginModal({setLogin, isLoginModal, toggleLoginModal, toggleRegisterModal, setActiveProfileId,activeProfileId}) {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [noMatch, setNoMatch] = useState(false)
  const [password, setPassword] = useState("");
  const [notFoundEmail, setNotFoundEmail] = useState(false)
  const [errorMSG, setErrorMSG] = useState("Please enter a valid email")
  const [errorMSGPassword, setErrorMSGPassword] = useState("Password must be larger than three characters")

  const ref = useRef(null);
  const refPassword = useRef(null);

  function handleLoginModalClose(e){
    e.preventDefault()
    toggleLoginModal()
  }

  function handleSubmit(e){
    e.preventDefault();
    handleLogin(isEmailValid,setActiveProfileId,setLogin,toggleLoginModal,setErrorMSG,setErrorMSGPassword, email, password,  ref.current, refPassword.current, setNoMatch,setNotFoundEmail);
  }
 

  function handleNoAccountClick(e){
    toggleLoginModal()
    toggleRegisterModal()
  }

    //Email Validation
    const resetValidation = (element) => {
        var emailIn = element
        emailIn.classList.remove('valid')
        emailIn.classList.remove('invalid')
      }
      function onChangeEmail(element){
        setErrorMSG("Please enter a valid email")
        var emailIn = element
        resetValidation(element);
        var emailValue = email;
        console.log('email Value',emailValue)
    
        if(!emailValue){
            return;
        }
    
        var reg = /\S+@\S+\.\S+/;
        const validationValue = reg.test(emailValue)
    
        if (validationValue){
            if(notFoundEmail){
                emailIn.classList.add('invalid')
                setIsEmailValid(false)
            }
            emailIn.classList.add('valid')
            setIsEmailValid(true)
        }else{
            emailIn.classList.add('invalid')
            setIsEmailValid(false)
        }
    
      }

       //Password Validation
  const resetValidationPassword = () => {
    var passwordIn = refPassword.current
    passwordIn.classList.remove('valid')
    passwordIn.classList.remove('invalid')
  }

  function onChangePassword(element){ 
    var passwordIn = element
    resetValidationPassword(element);
    var passwordValue = password;
    console.log('email Value',passwordValue)
  
    if(!passwordValue){
        return;
    }

    //check if password is greater than 3 and less than 14
    if (passwordValue.length < 4){
        passwordIn.classList.add('invalid')
        setErrorMSGPassword("Password must be larger than three characters")
        setIsPasswordValid(false)
    }

    if (passwordValue.length > 13){
        passwordIn.classList.add('invalid')
        setErrorMSGPassword("Password must be smaller than fourteen characters")
        setIsPasswordValid(false)
    }

    if (passwordValue.length > 3 && passwordValue.length < 13)
    {
        if(noMatch){
            passwordIn.classList.remove('valid')
            passwordIn.classList.add('invalid')
            setErrorMSGPassword("Password does not match records")
            return
        }
        passwordIn.classList.add('valid')
        setIsPasswordValid(true)
    }

  }


      useEffect(() => {
        const emailRef = ref.current;
        const passwordRef = refPassword.current;
        onChangeEmail(emailRef)
        onChangePassword(passwordRef)
      })
  return (
    <div className={isLoginModal ? 'login-modal-con' : 'd-none'}>
        <div className='login-modal'>
            <div className='d-flex flex-column'>
                <div className='login-modal-close-con'>
                    <div onClick={e => handleLoginModalClose(e)}>
                        <i className='file-input-icon'> 
                            <FontAwesomeIcon icon={faClose}   size="2xl" />
                        </i>
                    </div>
                </div>
                <div className='login-modal-header'>Login</div>
                <div className='login-modal-text'>
                    <div>Email</div>
                </div>
                <div className='form-item'>
                <input  value={email}
                    ref={ref}
                    onChange={(e) => setEmail(e.target.value)} className='form-input-modal login-modal-input' type='text' />
                     <i class="valid-icon">
                          <FontAwesomeIcon icon={faCheck} />
                      </i>
          
                    <div class="invalid-item">
                        <p class="error-msg p-3">{errorMSG}</p>
                    </div>
                    <div class="valid-item">
                        <p class="msg"></p>
                    </div>
                </div>
                <div className='login-modal-text'>
                    <div>Password</div>
                </div>
                <div className='form-item'>
                    <input 
                     ref={refPassword}
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                    className='form-input-modal login-modal-input ' type='password' />
                      <i class="valid-icon">
                          <FontAwesomeIcon icon={faCheck} />
                      </i>
          
                    <div class="invalid-item">
                        <p class="error-msg p-3">{errorMSGPassword}</p>
                    </div>
                    <div class="valid-item">
                        <p class="msg"></p>
                    </div>
                </div>
            </div>
            <div onClick={e => handleSubmit(e)} className='login-modal-btn'>
                <div>Login</div>
            </div>
            <div className='login-modal-have-con'>
                <div onClick={e => handleNoAccountClick(e)}>Don't have an account?</div>
            </div>
                
        </div>
    </div>
  )
}

export default LoginModal