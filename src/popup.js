import createElement from "./helpers/createElement";
import createDbBtn from "./popup/components/createDb/createDbBtn";
import login from "./popup/components/login/login";

window.onload = () => {
  const btn = document.getElementById("createDbBtn");
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
  const loginBtn = login;
  createDbBtn().render();
  login();
  createDbBtn();
  const btn = document.getElementById("createDbBtn");
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

        loginBtn().loginBtn.parentElement.removeChild(loginBtn);
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
    loginBtn().render();
  }

  if (!user) {
    btn.style.display = "none";
  }

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
