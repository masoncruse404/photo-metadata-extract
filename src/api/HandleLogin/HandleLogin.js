import Cookies from "universal-cookie";

//UTILS
import getBaseURL from "../../util/Constants";


//CONSTANTS
const BASE_URL = getBaseURL()


async function handleLogin(varIsEmailValid,varSetActiveProfileId, varSetLogin, varToggleModal,varSetErrorMSG, varSetErrorMSGPassword, varEmail, varPassword, varRefEmail, varRefPassword, varSetNoMatch, varSetNotFoundEmail){
    
  const element = varRefEmail
  const elementPassword = varRefPassword
  const email = varEmail
  const password = varPassword

  if(!varIsEmailValid) return;

  const response = await fetch(BASE_URL+"login", {
    method: 'POST',
    body: JSON.stringify({email,password}),
    headers: {'Content-Type':'application/json'},  
  })

  if(response.status === 200){
    response.json().then(userInfo => {
    const cookies = new Cookies();
    varSetActiveProfileId(userInfo.userID)
    cookies.set("token", userInfo.token);
    varSetLogin(true)
    varToggleModal();
    })
  }
  
  if(response.status === 400){
    element.classList.add('invalid')
    varSetErrorMSG("No account found")
    varSetNoMatch(true)
    varSetLogin(false)
    return
  }
  
  if(response.status === 401){
    elementPassword.classList.add('invalid')
    varSetErrorMSGPassword("Invalid password")
    varSetLogin(false)
    return
  }

  if(response.status === 439){
    elementPassword.classList.add('invalid')
    varSetNotFoundEmail(true)
    varSetErrorMSGPassword("Email not found in records")
  }

}


export default handleLogin;
