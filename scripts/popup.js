document.addEventListener('DOMContentLoaded', function () {
    // Open a connection to the IndexedDB database
      console.log(localStorage.getItem("t"))
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
chrome.identity.launchWebAuthFlow(true,(res)=>console.log(res))