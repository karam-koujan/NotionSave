
// Accessing the element's properties or modifying its contents
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

function getElementByAttr(attributeFilter, callback) {
    const element = document.querySelector(attributeFilter);
    if (element) {
      callback(element);
    } else {
      setTimeout(() => {
        getElementByAttr(attributeFilter, callback);
      }, 100); // Retry after 100 milliseconds
    }
  }

// Save to Notion Button  Youtube 


const saveSpan = createElement("span",{style:"color:#0f0f0f;font-size:14px;font-family:Roboto,Arial,sans-serif;font-weight:bold;text-transform:capitalize;"},"notion")
const saveButton = createElement("div",{style:"display:flex;justify-content:center;align-item:center;padding:10px 16px;cursor:pointer; background:white;border-radius:18px;margin-right:.9rem;transition:opacity 0.6 ease-in;",onmouseover:"this.style.opacity=0.9",onmouseout:"this.style.opacity=1"},saveSpan)

getElementByAttr("#actions",(element)=>{
  element.insertAdjacentElement("afterbegin",saveButton) 
})

const getLink = () => window.location.href
saveButton.addEventListener("click",()=>{
     const link = getLink()
     console.log(link)
     const data = {link,type:"youtube"}
     fetch("http://localhost:3000/api/bookmark",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body :  JSON.stringify(data)
     }).then(()=>{
      console.log("saved")
      saveSpan.textContent = "Saved"
     }).catch(err=>console.log(err))
 })

// Access the access token from the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.accessToken) {
    var accessToken = message.accessToken;
    localStorage.setItem("token",accessToken)
    // Now you can use the accessToken variable in your content script
    console.log("f",accessToken);
  }
});

