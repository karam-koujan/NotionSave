import youtubeSave from "./content/components/youtube";
import twitterSave from "./content/components/twitter";

if (location.hostname.indexOf("youtube") !== -1) {
  console.log("youtube....");
  youtubeSave();
}

if (location.hostname.indexOf("twitter") !== -1) {
  twitterSave();
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
});
