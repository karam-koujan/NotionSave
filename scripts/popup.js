document.addEventListener('DOMContentLoaded', function () {
    // Open a connection to the IndexedDB database
      console.log(localStorage.getItem("t"))
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
});
chrome.identity.launchWebAuthFlow(true,(res)=>console.log(res))