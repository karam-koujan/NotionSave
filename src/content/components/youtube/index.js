import { bookmark } from "../../../helpers/";
import { getTheVideoTitle } from "./helpers";
import injectScript from "./injectScript";
import notionSave from "./button";

function youtube() {
  const { ui, setState } = notionSave();

  injectScript(ui);

  let youtubeVidTitle;

  navigation.addEventListener("navigate", (navigateEvent) => {
    if (!navigateEvent.hashChange) {
      setState("default");
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
    setState("loading");
    const data = {
      link,
      type: "youtube",
      metaData: { title: youtubeVidTitle },
    };
    const onSuccess = () => setState("saved");
    const onError = () => setState("error");
    bookmark(data, { onSuccess, onError });
  });
}

export default youtube;
