import { bookmark } from "../../../helpers/";
import { getTheVideoTitle } from "./helpers";
import injectScript from "./injectScript";
import notionSave from "./ui";

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
    const save = bookmark(data);
    save
      .then((res) => {
        setState("success");
        return res.json();
      })
      .then((res) => console.log(res))
      .catch((err) => {
        setState("error");
      });
  });
}

export default youtube;
