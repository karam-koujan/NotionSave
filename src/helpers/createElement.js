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

export default createElement ;