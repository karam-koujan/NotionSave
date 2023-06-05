import getElementByAttr from "../../helpers/getElementByAttr"

function getTheVideoTitle(parentAttr,callback){
    
    getElementByAttr(parentAttr,(element)=>{
      const parent = element.firstElementChild
      for (const child of parent.children) {
           if(child.tagName=== "H1"){
             callback(child.textContent)
           }
      }
    })
    
}

export {
    getTheVideoTitle
}