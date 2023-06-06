function createDb() {
  const btn = document.getElementById("createDbBtn");
  btn.textContent = "Creating...";
  const user = JSON.parse(localStorage.getItem("user"));
  fetch("http://localhost:3000/api/createDB", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: user.access_token,
    },
  }).then(() => {
    btn.textContent = "Database is created!!";
  });
}
export default createDb;
