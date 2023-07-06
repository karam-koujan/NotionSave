import { youtube, twitter, reddit } from "./content/components";

function injectScript({ hostname, script }) {
  if (location.hostname.indexOf(hostname) !== -1) {
    console.log(hostname);
    script();
  }
}

let isScriptInjected = false;
const token = localStorage.getItem("token");
const databaseId = localStorage.getItem("databaseId");
const socialMediaObj = { youtube, reddit, twitter };

if (token && databaseId) {
  isScriptInjected = true;
  Object.keys(socialMediaObj).forEach((socialMedia) => {
    injectScript({
      hostname: socialMedia,
      script: socialMediaObj[socialMedia],
    });
  });
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.accessToken) {
    localStorage.setItem("token", message.accessToken);
  }
  if (message.databaseId) {
    localStorage.setItem("databaseId", message.databaseId);
  }
  const token = localStorage.getItem("token");
  const databaseId = localStorage.getItem("databaseId");
  if (token && databaseId && !isScriptInjected) {
    isScriptInjected = true;
    Object.keys(socialMediaObj).forEach((socialMedia) => {
      injectScript({
        hostname: socialMedia,
        script: socialMediaObj[socialMedia],
      });
    });
  }
});
