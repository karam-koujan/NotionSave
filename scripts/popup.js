function getCodeAndErrorFromRedirectUri(redirectUri) {
    const url = new URL(redirectUri);
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');
  
    return {
      code: code,
      error: error
    };
  }
  
window.onload = ()=>{
    let redirectUri = chrome.identity.getRedirectURL()
    var authUrl = "https://api.notion.com/v1/oauth/authorize?client_id=886c4ba1-a766-4abe-b227-68d823f578eb&response_type=code&owner=user&redirect_uri=https%3A%2F%2Flgfogmkjmheekcelnijmlmbojdbaoabh.chromiumapp.org%2F";
    const isLogged = localStorage.getItem("token")
    console.log(isLogged===null, isLogged.code === "null" ,isLogged.error)
    if(isLogged===null || isLogged.code === "null" || isLogged.error!==undefined){
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
            const token = getCodeAndErrorFromRedirectUri(redirectUrl)
            localStorage.setItem("token",JSON.stringify(token))
          console.log("token letsift")

          // Extract the necessary information from the redirectUrl
          // ...
        });
        
        
        
        
    }
    
    setTimeout(()=>{chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { accessToken: isLogged });
    })},500)
    
    
}
document.addEventListener('DOMContentLoaded', function () {
    // Open a connection to the IndexedDB database
    
 console.log(window.location.href)
 // Retrieve the access token from localStorage
var accessToken = localStorage.getItem('isDbCreated');
 localStorage.setItem("s","b")
 
 const v = localStorage.getItem("s") 
 // Send a message to the content script


    const btn = document.getElementById('checkButton');
    const link = document.getElementById("link");
    

   
    link.addEventListener("click",()=>{
        chrome.tabs.create({active: true, url: link.href});

    })
    btn.addEventListener('click', function() {
            fetch("http://localhost:3000/api/createDB",{
                method:"POST",
                "Content-Type":"application/json",
            }).then(()=>{
                btn.textContent = "Database is created!!"
                localStorage.setItem("isDbCreated",true)
            
            })
        
    });
});
