import createDbBtn from "./popup/components/createDb/createDbBtn";
import login from "./popup/components/login/login";
import profile from "./popup/components/profile/profile";
import env from "./config/env";
window.onload = () => {
  const btn = document.getElementById("createDbBtn");
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user", user);
  if (user !== null) {
    fetch(`${env.hostname}/api/dbId`, {
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
          localStorage.setItem("databaseId", res.dbId[0]);
          btn.textContent = "database is created";
          btn.style.opacity = "0.8";
          btn.disabled = true;
        }
      });
    const databaseId = localStorage.getItem("databaseId");

    setTimeout(() => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { accessToken: user.access_token });
      });
    }, 500);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { accessToken: user.access_token });
    });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { databaseId });
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // create database button
  createDbBtn();
  const btn = document.getElementById("createDbBtn");
  const redirectUrlQuery = JSON.parse(localStorage.getItem("redirectUrlCode"));

  let user =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : undefined;

  if (!user && redirectUrlQuery) {
    console.log("dom", user);
    const redirectUri = `${env.hostname}/api/auth?code=${redirectUrlQuery.code}&error=${redirectUrlQuery.error}`;

    fetch(redirectUri)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          return;
        }
        setTimeout(() => {
          chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
              chrome.tabs.sendMessage(tabs[0].id, {
                accessToken: data.data.access_token,
              });
            }
          );
        }, 500);

        fetch(`${env.hostname}/api/dbId`, {
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
              setTimeout(() => {
                chrome.tabs.query(
                  { active: true, currentWindow: true },
                  function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                      databaseId: res.dbId[0],
                    });
                  }
                );
              }, 500);
              btn.textContent = "database is created";
              btn.style.opacity = "0.8";
              btn.disabled = true;
            }
          });
        const loginBtn = document.getElementById("login");
        localStorage.setItem("user", JSON.stringify(data.data));
        profile(data.data);
        if (loginBtn) {
          loginBtn.style.display = "none";
        }
        // create profile elements
        btn.style.display = "block";
        if (data.error) {
          return console.log("error");
        }
      });
  }
  user =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : undefined;
  if (!user) {
    // create login button
    login();
    btn.style.display = "none";
  } else {
    profile(user);
  }
});
