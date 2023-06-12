import youtubeSave from "./content/components/youtube";
import twitterSave from "./content/components/twitter";
import reddit from "./content/components/reddit";

if (location.hostname.indexOf("youtube") !== -1) {
  console.log("youtube....");
  youtubeSave();
}

if (location.hostname.indexOf("twitter") !== -1) {
  twitterSave();
}

if (location.hostname.indexOf("reddit") !== -1) {
  console.log("working!!!");
  reddit();
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
