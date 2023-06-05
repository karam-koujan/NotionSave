import createElement from "./helpers/createElement";
import createDB from "./popup/createDb";

function getCodeAndErrorFromRedirectUri(redirectUri) {
  const url = new URL(redirectUri);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  return {
    code: code,
    error: error,
  };
}

const auth = () => {
  const loginBtn = document.getElementById("login");
  loginBtn.textContent = "Connecting...";
  const authUrl =
    "https://api.notion.com/v1/oauth/authorize?client_id=886c4ba1-a766-4abe-b227-68d823f578eb&response_type=code&owner=user&redirect_uri=https%3A%2F%2Flgfogmkjmheekcelnijmlmbojdbaoabh.chromiumapp.org%2F";
  chrome.identity.launchWebAuthFlow(
    {
      url: authUrl,
      interactive: true,
    },
    function (redirectUrl) {
      if (chrome.runtime.lastError || !redirectUrl) {
        console.error(chrome.runtime.lastError);
        return;
      }
      console.log(redirectUrl);
      const redirectUrlQuery = getCodeAndErrorFromRedirectUri(redirectUrl);
      console.log("dd");
      if (redirectUrlQuery.code) {
      }
      localStorage.setItem("redirectUrlCode", JSON.stringify(redirectUrlQuery));
      console.log("token letsift");
    }
  );

  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    setTimeout(() => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { accessToken: user.access_token });
      });
    }, 500);
  }
};
window.onload = () => {
  const btn = document.getElementById("checkButton");

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

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
        console.log(res.dbId.length);
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
  const loginBtn = createElement(
    "button",
    { id: "login", class: "createDb" },
    "Connect to notion"
  );
  const loginWrapper = document.getElementById("connect");
  const btn = document.getElementById("checkButton");

  loginBtn.addEventListener("click", auth);
  const redirectUrlQuery = JSON.parse(localStorage.getItem("redirectUrlCode"));
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
        console.log("data", data.data);
        fetch("http://localhost:3000/api/dbId", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: data.data.access_token,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res.dbId.length);
            if (res.error || res.dbId.length === 0) {
              btn.textContent = "Create Notion Database";
            } else {
              btn.textContent = "database is created";
              btn.style.opacity = "0.8";
              btn.disabled = true;
            }
          });
        localStorage.setItem("user", JSON.stringify(data.data));

        loginBtn.parentElement.removeChild(loginBtn);
        const nameTag = createElement(
          "p",
          {
            style:
              "color:#37352f;font-size:17px;text-align:center;font-weight:bold;margin-top:.5rem;",
          },
          data.data.owner.user.name
        );
        const profileImg = createElement(
          "img",
          {
            style:
              "object-fit:cover;border-radius:50%;width:100%;display:block;",
            src: data.data.owner.user.avatar_url,
            alt: data.data.owner.user.name,
          },
          ""
        );
        const imgContainer = createElement(
          "div",
          {
            style:
              "border-radius:50%; margin-inline:auto; width:100px; margin-top:1rem;",
          },
          profileImg
        );
        const parent = document.getElementById("parent");
        parent.appendChild(imgContainer);
        parent.appendChild(nameTag);
        btn.style.display = "block";
        if (data.error) {
          return console.log("error");
        }
      });
  }
  const isLogged = JSON.parse(localStorage.getItem("user"));
  console.log("isLogged", isLogged);
  if (isLogged === null) {
    loginWrapper.appendChild(loginBtn);
  }

  if (!user) {
    btn.style.display = "none";
  }
  btn.addEventListener("click", () => {
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
  });
  if (user) {
    const nameTag = createElement(
      "p",
      {
        style:
          "color:#37352f;font-size:17px;text-align:center;font-weight:bold;margin-top:.5rem;",
      },
      user.owner.user.name
    );
    const profileImg = createElement(
      "img",
      {
        style: "object-fit:cover;border-radius:50%;width:100%;display:block;",
        src: user.owner.user.avatar_url,
        alt: user.owner.user.name,
      },
      ""
    );
    const imgContainer = createElement(
      "div",
      {
        style:
          "border-radius:50%; margin-inline:auto; width:100px; margin-top:1rem;",
      },
      profileImg
    );
    const parent = document.getElementById("parent");
    parent.appendChild(imgContainer);
    parent.appendChild(nameTag);
  }
});
