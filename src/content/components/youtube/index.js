import { bookmark } from "../../../helpers/";
import { getTheVideoTitle } from "./helpers";
import injectScript from "./injectScript";
import notionSave from "./button";

function youtube() {
  const { ui, setText } = notionSave();

  injectScript(ui);

  let youtubeVidTitle;

  navigation.addEventListener("navigate", (navigateEvent) => {
    if (!navigateEvent.hashChange) {
      setText("notion");
      console.log("change", youtubeVidTitle);
      getTheVideoTitle("#above-the-fold", (title) => {
        console.log(title);
        youtubeVidTitle = title;
      });
    }
  });

  if (!youtubeVidTitle) {
    getTheVideoTitle("#above-the-fold", (title) => {
      youtubeVidTitle = title;
    });
  }

  ui.addEventListener("click", () => {
    const link = window.location.href;
    setText("loading...");
    const data = {
      link,
      type: "youtube",
      metaData: { title: youtubeVidTitle },
    };
    const onSuccess = () => setText("saved");
    const onError = () => setText("error");
    bookmark(data, { onSuccess, onError });
  });
}

export default youtube;
