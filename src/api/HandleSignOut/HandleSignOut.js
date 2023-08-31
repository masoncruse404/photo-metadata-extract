import Cookies from "universal-cookie";

const cookies = new Cookies();
function signOut(e){
    // destroy the cookie
    cookies.remove("token", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/"
}

export default signOut