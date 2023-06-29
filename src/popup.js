import createDbBtn from "./popup/components/createDb/button";
import login from "./popup/components/login/login";
import profile from "./popup/components/profile/profile";
import env from "./config/env";

document.addEventListener("DOMContentLoaded", () => {
  const createDb = createDbBtn();
  const redirectUrlQuery = JSON.parse(localStorage.getItem("redirectUrlCode"));
  let loginBtn;
  let user =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : undefined;

  if (!user) {
    // create login button
    loginBtn = login();
    createDb.setStyle("display", "none");
  } else {
    profile(user);
    fetch(`${env.hostname}/api/dbId`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.access_token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.error || res.dbId.length === 0) {
          createDb.setText("Create Notion Database");
        } else {
          localStorage.setItem("databaseId", res.dbId[0]);
          createDb.setText("database is created");
          createDb.setStyle("opacity", "0.8");
          createDb.setAttr("disabled", true);
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
        }
      });

    setTimeout(() => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { accessToken: user.access_token });
      });
    }, 500);
  }
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
            console.log(res);
            if (res.error || res.dbId.length === 0) {
              createDb.setText("Create Notion Database");
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
              createDb.setText("database is created");
              createDb.setStyle("opacity", "0.8");
              createDb.setAttr("disabled", true);
            }
          });
        localStorage.setItem("user", JSON.stringify(data.data));
        profile(data.data);
        if (loginBtn) {
          loginBtn.setStyle("display", "none");
        }
        // create profile elements
        createDb.setStyle("display", "block");

        if (data.error) {
          return console.log("error");
        }
      });
  }
});
