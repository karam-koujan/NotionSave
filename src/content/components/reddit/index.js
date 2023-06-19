import { bookmark } from "../../../helpers/";
import notionSave from "./ui";
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

export default reddit;
