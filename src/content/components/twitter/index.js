import { getElementByAttr, bookmark } from "../../../helpers/";
import injectScript from "./injectScript";
import notionSave from "./ui";

function twitter() {
  const { ui, setState } = notionSave();
  let tweetText = "";

  navigation.addEventListener("navigate", (navigateEvent) => {
    if (!navigateEvent.hashChange) {
      setState("default");
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
    setState("loading");
    const data = {
      link,
      type: "twitter",
      metaData: { title: tweetText },
    };
    const save = bookmark(data);
    save
      .then((res) => res.json())
      .then(({ object }) => {
        if (object === "error") {
          return setState("error");
        }
        setState("success");
      })
      .catch(() => {
        setState("error");
      });
  });
}

export default twitter;
