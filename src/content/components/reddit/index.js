import { bookmark } from "../../../helpers/";
import notionSave from "./button";
import injectScript from "./injectScript";
function reddit() {
  const { ui, setText } = notionSave();

  navigation.addEventListener("navigate", (navigateEvent) => {
    if (!navigateEvent.hashChange) {
      setText("notion");
      injectScript(ui);
    }
  });

  injectScript(ui);

  ui.addEventListener("click", () => {
    const link = window.location.href;
    setText("loading");
    const regex = /\/([^/]+)\/$/;
    const match = regex.exec(link);
    const title = match ? match[1].replace(/_/g, " ") : "";
    const data = {
      link,
      type: "reddit",
      metaData: { title },
    };

    const onSuccess = () => setText("saved");
    const onError = () => setText("error");
    bookmark(data, { onSuccess, onError });
  });
}

export default reddit;
