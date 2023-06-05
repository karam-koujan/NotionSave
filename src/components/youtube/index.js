import createElement from "../../helpers/createElement"
import getElementByAttr from "../../helpers/getElementByAttr"
import { getTheVideoTitle } from "./helpers"


function youtubeSave(){

   // creating Notion button and styling it. 
   
   const youtubeSaveBtnTxt = createElement("span",{style:"color:#0f0f0f;font-size:14px;font-family:Roboto,Arial,sans-serif;font-weight:bold;text-transform:capitalize;"},"notion")
   const youtubeSaveBtn = createElement("div",{style:"display:flex;justify-content:center;align-item:center;padding:10px 16px;cursor:pointer; background:white;border-radius:18px;margin-right:.9rem;transition:opacity 0.6 ease-in;",onmouseover:"this.style.opacity=0.9",onmouseout:"this.style.opacity=1"},youtubeSaveBtnTxt)
      
      
    // get the parent element from youtube's html and adding Notion button.

    getElementByAttr("#actions",(element)=>{
        console.log("hi",youtubeSaveBtn)
        element.insertAdjacentElement("afterbegin",youtubeSaveBtn) 
      })
    
      let youtubeVidTitle;
      
      /* 

      This script run only once this, cause The page previous state to remain, when we use client side routing
      This is why I used navigate event
      
      */
     
     navigation.addEventListener("navigate",(navigateEvent)=>{
         if(!navigateEvent.hashChange){
             youtubeSaveBtnTxt.textContent = "Notion";
             getTheVideoTitle("above-the-fold",(title)=>{
                 youtubeVidTitle = title
                })
            }
        })
        
    // Get the video title 
        if (!youtubeVidTitle){
            getTheVideoTitle("#above-the-fold",(title)=>{
              youtubeVidTitle = title
            })
        }
      // Save the video to notion
      youtubeSaveBtn.addEventListener("click",()=>{
           const link = window.location.href
            youtubeSaveBtnTxt.textContent = "Saving..."
           const token = localStorage.getItem("token")
           const data = {link,type:"youtube",metaData:{title:youtubeVidTitle}}
           fetch("http://localhost:3000/api/bookmark",{
            method:"POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            },
            body : JSON.stringify(data)
           })
           .then(()=>{
             youtubeSaveBtnTxt.textContent = "Saved"
            
           })
           .catch(err=>{
            youtubeSaveBtn.textContent = "Error"
           })
       })
} 

  

export default youtubeSave;