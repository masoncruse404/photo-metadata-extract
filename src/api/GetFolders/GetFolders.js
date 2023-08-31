//UTILS
import getBaseURL from "../../util/Constants";
import Cookies from "universal-cookie";
//CONSTANTS
const BASE_URL = getBaseURL()

async function getFolder(varActiveProfileId, varSetFiles){
    
    const resp = await fetch(BASE_URL + 'profile', {
        method: 'POST',
        body: JSON.stringify({varActiveProfileId}),
        headers: {'Content-Type':'application/json'},
    })

    const json = await resp.json()
   
    varSetFiles(json.message)
}

export default getFolder