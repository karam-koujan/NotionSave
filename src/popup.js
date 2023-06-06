import createDbBtn from "./popup/components/createDb/createDbBtn";
import login from "./popup/components/login/login";
import profile from "./popup/components/profile/profile";

window.onload = () => {
  const btn = document.getElementById("createDbBtn");
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    fetch("http://localhost:3000/api/dbId", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.access_token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error || res.dbId.length === 0) {
          btn.textContent = "Create Notion Database";
        } else {
          btn.textContent = "database is created";
          btn.style.opacity = "0.8";
          btn.disabled = true;
        }
      });
    setTimeout(() => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { accessToken: user.access_token });
      });
    }, 500);
  }
};
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = login;
  createDbBtn().render();
  login();
  createDbBtn();
  const btn = document.getElementById("createDbBtn");
  const redirectUrlQuery = JSON.parse(localStorage.getItem("redirectUrlCode"));
  const loginWrapper = document.getElementById("connect");
  const user =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : undefined;

  if (!user && redirectUrlQuery) {
    fetch(
      `http://localhost:3000/api/auth?code=${redirectUrlQuery.code}&error=${redirectUrlQuery.error}`
    )
      .then((res) => res.json())
      .then((data) => {
        fetch("http://localhost:3000/api/dbId", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: data.data.access_token,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.error || res.dbId.length === 0) {
              btn.textContent = "Create Notion Database";
            } else {
              btn.textContent = "database is created";
              btn.style.opacity = "0.8";
              btn.disabled = true;
            }
          });
        localStorage.setItem("user", JSON.stringify(data.data));

        loginWrapper.removeChild(loginBtn);
        profile(data.data).render();
        btn.style.display = "block";
        if (data.error) {
          return console.log("error");
        }
      });
  }
  if (!user) {
    loginBtn().render();
    btn.style.display = "none";
  } else {
    profile(user).render();
  }
});
