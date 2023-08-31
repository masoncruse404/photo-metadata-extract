import React, {useState, useRef, useEffect} from 'react'
import { faClose, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//STYLES
import "./RegisterModal.css"


//api
import handleRegister from '../../api/HandleRegister/HandleRegister'
function RegisterModal({isRegisterModal, toggleRegisterModal, toggleLoginModal}) {
    
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isEmailTaken, setIsEmailTaken] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMSG, setErrorMSG] = useState("Please enter a valid email")
  const [errorMSGPassword, setErrorMSGPassword] = useState("Password must be larger than three characters")

  const ref = useRef(null);
  const refPassword = useRef(null);

  function handleRegisterModalClose(e){
    e.preventDefault()
    toggleRegisterModal()
  }

  function handleHaveAccountClick(e){
    e.preventDefault()
    toggleRegisterModal()
    toggleLoginModal()
  }

  function handleSubmit(e){
    e.preventDefault();
    handleRegister(toggleRegisterModal, toggleLoginModal,isPasswordValid,isEmailValid, setErrorMSG,ref.current, email, password, setIsEmailTaken);
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
       
    
        if(!emailValue){
            return;
        }
    
        var reg = /\S+@\S+\.\S+/;
        const validationValue = reg.test(emailValue)
    
        if (validationValue){
            if(isEmailTaken) {
                emailIn.classList.add('invalid')
                setErrorMSG("Email is taken")
                return
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
    <div className={isRegisterModal ? 'register-modal-con' : 'd-none'}>
        <div className='register-modal'>
            <div className='d-flex flex-column'>
                <div className='register-modal-close-con'>
                    <div onClick={e => handleRegisterModalClose(e)}>
                        <i className='file-input-icon'> 
                            <FontAwesomeIcon icon={faClose}   size="2xl" />
                        </i>
                    </div>
                </div>
                <div className='register-modal-header'>Create an Account</div>
                <div className='register-modal-text'>
                    <div>Email</div>
                </div>
                <div className='form-item'>
                <input  value={email}
                    ref={ref}
                    onChange={(e) => setEmail(e.target.value)} className='form-input-modal register-modal-input' type='text' />
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
                <div className='register-modal-text'>
                    <div>Password</div>
                </div>
                <div className='form-item'>
                    <input 
                     ref={refPassword}
                     value={password}
                     name='password'
                     onChange={(e) => setPassword(e.target.value)}
                    className='form-input-modal register-modal-input ' type='password' />
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
            <div onClick={e => handleSubmit(e)} className='register-modal-btn'>
                <div>Register</div>
            </div>
            <div className='register-modal-have-con'>
                <div onClick={e => handleHaveAccountClick(e)}>Already have an account?</div>
            </div>
                
        </div>
    </div>
  )
}

export default RegisterModal