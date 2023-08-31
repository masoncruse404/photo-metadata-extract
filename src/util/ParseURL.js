function parseURL(){
    const url =  window.location.href
  
    const parsed = url.split("/").slice(-1)
    const newUrl = parsed[0]
   
    return newUrl;
  }

export default parseURL;