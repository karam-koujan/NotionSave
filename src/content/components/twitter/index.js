import { getElementByAttr, bookmark } from "../../../helpers/";
import injectScript from "./injectScript";
import notionSave from "./button";

function twitter() {
  const { ui, setText } = notionSave();
  let tweetText = "";

  navigation.addEventListener("navigate", (navigateEvent) => {
    if (!navigateEvent.hashChange) {
      setText("save to notion");
      const intervalId = setInterval(() => {
        injectScript(ui);
        clearInterval(intervalId);
      });
    }
  });

  injectScript(ui);

  ui.addEventListener("click", () => {
    getElementByAttr("[data-testid='tweetText']", (element) => {
      tweetText = element.firstChild.textContent;
      tweetText = tweetText.length < 10 ? tweetText : tweetText.slice(0, 10);
    });
    const link = window.location.href;
    setText("loading...");
    const data = {
      link,
      type: "twitter",
      metaData: { title: tweetText },
    };
    const onSuccess = () => setText("saved");
    const onError = () => setText("error");
    bookmark(data, { onError, onSuccess });
  });
}

export default twitter;
