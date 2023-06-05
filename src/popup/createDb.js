function createDB() {
  btn.textContent = "Creating...";
  fetch("http://localhost:3000/api/createDB", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: user.access_token,
    },
  }).then(() => {
    btn.textContent = "Database is created!!";
    localStorage.setItem("isDbCreated", true);
  });
}
export default createDB;
