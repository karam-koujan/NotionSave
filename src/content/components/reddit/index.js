import { bookmark } from "../../../helpers/";
import notionSave from "./button";
import injectScript from "./injectScript";
function reddit() {
  const { ui, setState } = notionSave();

  navigation.addEventListener("navigate", (navigateEvent) => {
    if (!navigateEvent.hashChange) {
      setState("default");
      injectScript(ui);
    }
  });

  injectScript(ui);

  ui.addEventListener("click", () => {
    const link = window.location.href;
    setState("loading");
    const regex = /\/([^/]+)\/$/;
    const match = regex.exec(link);
    const title = match ? match[1].replace(/_/g, " ") : "";
    const data = {
      link,
      type: "reddit",
      metaData: { title },
    };

    const onSuccess = () => setState("success");
    const onError = () => setState("error");
    bookmark(data, { onSuccess, onError });
  });
}

export default reddit;
