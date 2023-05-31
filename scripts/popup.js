document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('checkButton');
    if(localStorage.getItem("isDbCreated")){
        btn.textContent = "DataBase is created!!"
    }
    btn.addEventListener('click', function() {
        if(!localStorage.getItem("isDbCreated")){
            fetch("http://localhost:3000/api/createDB",{
                method:"POST",
                "Content-Type":"application/json",
            }).then(()=>{
                btn.textContent = "DataBase is created!!"
                localStorage.setItem("isDbCreated",true)
            
            })
        }
    });
});