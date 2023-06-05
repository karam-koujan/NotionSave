import youtubeSave from "./components/youtube/"; 
import twitterSave from "./components/twitter"; 

youtubeSave()
twitterSave()
  /*
  document.addEventListener('DOMSubtreeModified', (e) => {
        const roleMenu = e.target.getAttribute("role");
        let isElementExist = document.getElementById("notion")
        console.log(roleMenu)
        console.log(!isElementExist)
        if(roleMenu === "menu"&&!isElementExist){
          getElementByAttr("[data-testid='Dropdown']",(element)=>{
            console.log(element,"eleme")
            const saveText = createElement("p",{style:"color:#e7e9ea;font-family:TwitterChirp;font-size:15px;font-weight:bold;padding:15px 0 12px 3rem;margin:0;"},"Save to Notion")
            const wrapper = createElement("div",{id:"notion",style:"cursor:pointer"},saveText)
            element.insertAdjacentElement("afterbegin",wrapper) })
           isElementExist = true 
          }
        
         
  })
  */
  
  /*
  getElementByAttr("[data-testid='caret']",(element)=>{
    const icon = element.parentElement.parentElement.parentElement.parentElement
    const container = icon.parentElement
    const  youtubeSaveBtnTxt = createElement("span",{style:"color:#0f0f0f;font-size:14px;font-family:Roboto,Arial,sans-serif;font-weight:bold;text-transform:capitalize;"},"notion")
    const youtubeSaveBtn = createElement("div",{style:"display:flex;justify-content:center;align-item:center;padding:8px 16px;cursor:pointer; background:white;border-radius:18px;transition:opacity 0.6 ease-in;",onmouseover:"this.style.opacity=0.9",onmouseout:"this.style.opacity=1"}, youtubeSaveBtnTxt)
    const flex = createElement("div",{style:"display:flex;align-items:center;"},[youtubeSaveBtn,icon])
   container.appendChild(flex)
    console.log(parent)
  })
  */
  
  
  
  
  
  // Access the access token from the background script
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.accessToken) {
      var accessToken = message.accessToken;
      localStorage.setItem("token",accessToken)
      // Now you can use the accessToken variable in your content script
      console.log("f",accessToken);
    }
  });
  
   