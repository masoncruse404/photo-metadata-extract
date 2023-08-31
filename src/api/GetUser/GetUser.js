//UTILS
import getBaseURL from "../../util/Constants";
import Cookies from "universal-cookie";
//CONSTANTS
const BASE_URL = getBaseURL()



async function getUser(varSetUsername, varSetActiveProfileId){

    const cookies = new Cookies();  
    const token = cookies.get("token");
  
    const res = await fetch(BASE_URL+'get_user',{ 
     method: 'POST',
     body: JSON.stringify({token}),
     headers: {'Content-Type':'application/json'},
    })

    const data = await res.json()

    varSetUsername(data.message)

    varSetActiveProfileId(data.userId)
    
}
export default getUser