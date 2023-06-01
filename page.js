
CLIENT_SECRET="secret_IitQkg0KEAV5crGdtVXS0XeHZ5e0UBCZJriSnghzA55"
CLIENT_ID="886c4ba1-a766-4abe-b227-68d823f578eb"
redirectUri = "http://localhost:5500/page.html"
const querystring = location.search
const urlencoded = new URLSearchParams(querystring);
const code = urlencoded.get("code")
const error = urlencoded.get("error")
if(code){
  fetch(`http://localhost:3000/api/auth?code=${code}&error=${error}`).
  then(res=>res.json())
  .then(data=>{
    console.log(data.data)
    if(data.error){
    return  console.log("error")        
    }})
  }
    // Open a connection to the IndexedDB database
