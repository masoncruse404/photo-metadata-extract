//UTILS
import getBaseURL from "../../util/Constants";


//CONSTANTS
const BASE_URL = getBaseURL()

async function handleRegister(varToggleRegisterModal, varToggleModal, varIsPasswordValid, varIsEmailValid, varSetErrorMSG, varRef, varEmail, varPassword, setIsEmailTaken){
  var emailIn = varRef
  const email = varEmail
  const password = varPassword
  if(varIsPasswordValid && varIsEmailValid){

    const res = await fetch(BASE_URL+'register', {
      method:'POST',
      body: JSON.stringify({email, password}),
      headers: {'Content-Type':'application/json'},
    })
  if(res.status === 201){
    varToggleRegisterModal();
    varToggleModal();
  }

  if(res.status === 500){
    emailIn.classList.add('invalid')
    const errorResponse = await res.json()
    varSetErrorMSG(errorResponse.message)
  }

  if(res.status === 409){
    emailIn.classList.remove('valid')
    varRef.classList.add('invalid')
    setIsEmailTaken(true)
    const errorResponse = await res.json()
    varSetErrorMSG(errorResponse.message)
  }
 
}
}

export default handleRegister;