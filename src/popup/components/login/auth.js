import getCodeAndErrorFromRedirectUri from "../../../helpers/getCodeErrFromUri";

function auth() {
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
}

export default auth;
