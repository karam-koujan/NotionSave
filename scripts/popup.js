function createElement(tag,attributes,children){
  const parent = document.createElement(tag)
  
  // set parent's attributes
  if(attributes!==null){
      for(let keys in attributes){
         parent.setAttribute(keys,attributes[keys])
      }
  }
  
  
  if(children === undefined) return ;
  
  if (Array.isArray(children)){
     children.forEach(child=>{
         parent.appendChild(child)
     })
  }else if (typeof children === "string"){
      parent.textContent = children
  }else{
      parent.appendChild(children)
  }


         
  
  return parent 
}

function getCodeAndErrorFromRedirectUri(redirectUri) {
    const url = new URL(redirectUri);
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');
  
    return {
      code: code,
      error: error
    };
  }
  
const auth = ()=>{
  const loginBtn = document.getElementById("login")
  loginBtn.textContent = "Connecting..."
  var authUrl = "https://api.notion.com/v1/oauth/authorize?client_id=886c4ba1-a766-4abe-b227-68d823f578eb&response_type=code&owner=user&redirect_uri=https%3A%2F%2Flgfogmkjmheekcelnijmlmbojdbaoabh.chromiumapp.org%2F";
        chrome.identity.launchWebAuthFlow({
            url: authUrl,
            interactive: true,
            
          }, function(redirectUrl) {
            // Handle the response from the authorization flow
            if (chrome.runtime.lastError || !redirectUrl) {
              // Error occurred or user canceled the flow
              console.error(chrome.runtime.lastError);
              return;
            }
          console.log(redirectUrl)
            const redirectUrlQuery = getCodeAndErrorFromRedirectUri(redirectUrl)
            console.log("dd")
            if(redirectUrlQuery.code){
              fetch(`http://localhost:3000/api/auth?code=${redirectUrlQuery.code}&error=${redirectUrlQuery.error}`).
              then(res=>res.json())
              .then(data=>{
                console.log(data.data)
                localStorage.setItem("user",JSON.stringify(data.data))
                
                if(data.error){
                return  console.log("error")        
                }})
              }
            localStorage.setItem("redirectUrlCode",JSON.stringify(redirectUrlQuery))
          console.log("token letsift")

          // Extract the necessary information from the redirectUrl
          // ...
        });
        
        
        
        
    
    const user = JSON.parse(localStorage.getItem("user"))
    setTimeout(()=>{chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { accessToken: user.access_token });
    })},500)
    
    
}
document.addEventListener('DOMContentLoaded', function () {
    // Open a connection to the IndexedDB database
  const loginBtn = document.getElementById("login")
  const isLogged = JSON.parse(localStorage.getItem("redirectUrlCode"))
  loginBtn.addEventListener("click",auth)
  console.log("isLogged",isLogged)
  if(  isLogged!==null){
    loginBtn.parentElement.removeChild(loginBtn)
  }
 // Retrieve the access token from localStorage
var accessToken = localStorage.getItem('isDbCreated');
 
 // Send a message to the content script


    const btn = document.getElementById('checkButton');
    
    btn.addEventListener('click', function() {
            fetch("http://localhost:3000/api/createDB",{
                method:"POST",
                "Content-Type":"application/json",
            }).then(()=>{
                btn.textContent = "Database is created!!"
                localStorage.setItem("isDbCreated",true)
            
            })
        
    });
   const user = JSON.parse(localStorage.getItem("user"))
   console.log(user)
   const nameTag = createElement("p",{style:"color:#37352f;font-size:17px;text-align:center;font-weight:bold;margin-top:.5rem;"},user.owner.user.name) 
   const profileImg =  createElement("img",{style:"object-fit:cover;border-radius:50%;width:100%;display:block;",src:user.owner.user.avatar_url,alt:user.owner.user.name},"")
   const imgContainer = createElement("div",{style:"border-radius:50%; margin-inline:auto; width:100px; margin-top:1rem;"},profileImg)
   const parent = document.getElementById("parent")
   parent.appendChild(imgContainer)
   parent.appendChild(nameTag)
  });
