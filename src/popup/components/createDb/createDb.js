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
  })
    .then((res) => {
      btn.textContent = "Database is created!!";
      return res.json();
    })
    .then(({ data }) => {
      console.log("data", data);
      localStorage.setItem("databaseId", data.id);
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { databaseId: data.id });
      });
    });
}
export default createDb;
