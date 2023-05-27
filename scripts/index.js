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

  // youtube
  getElementByAttr("[slot='dropdown-content']",(element)=>{

    const savePost = createElement("span",{style:"color:white;font-size:14px;font-family:Roboto,Arial, sans-serif;"},"Save Video To Notion")
    const menuItem = createElement(
        "div",
        {style : "padding:0px 12px 8px 55px;cursor:pointer;"},savePost)


      
    menuItem.style.color = "white"

    element.appendChild(menuItem)
    console.log("element",element)
  })
  
  // twitter