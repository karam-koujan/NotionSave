import { youtube, twitter, reddit } from "./content/components";

let isScriptInjected = false;
const token = localStorage.getItem("token");
const databaseId = localStorage.getItem("databaseId");

if (token && databaseId) {
  isScriptInjected = true;
  if (location.hostname.indexOf("youtube") !== -1) {
    console.log("youtube....");
    youtube();
  }

  if (location.hostname.indexOf("twitter") !== -1) {
    twitter();
  }

  if (location.hostname.indexOf("reddit") !== -1) {
    console.log("working!!!");
    reddit();
  }
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.accessToken) {
    const accessToken = message.accessToken;
    localStorage.setItem("token", accessToken);
  }
  if (message.databaseId) {
    const databaseId = message.databaseId;
    localStorage.setItem("databaseId", databaseId);
  }

  const token = localStorage.getItem("token");
  const databaseId = localStorage.getItem("databaseId");
  if (token && databaseId && isScriptInjected) {
    isScriptInjected = true;
    if (location.hostname.indexOf("youtube") !== -1) {
      console.log("youtube....");
      youtube();
    }

    if (location.hostname.indexOf("twitter") !== -1) {
      twitter();
    }

    if (location.hostname.indexOf("reddit") !== -1) {
      console.log("working!!!");
      reddit();
    }
  }
});
