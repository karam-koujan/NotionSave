import { getElementByAttr, createElement, bookmark } from "../../../helpers/";
import notionSave from "./ui";
function reddit() {
  const { ui, setState } = notionSave();

  navigation.addEventListener("navigate", (navigateEvent) => {
    if (!navigateEvent.hashChange) {
      console.log(navigateEvent.destination.url);
      setState("default");

      let count = 0;
      const intervalID = setInterval(() => {
        console.log("interval");
        getElementByAttr(
          "[data-adclicklocation='fl_unknown']",
          (elements) => {
            for (let element of elements) {
              element.insertAdjacentElement("beforeend", ui);
            }
          },
          true
        );
        if (count === 2) {
          clearInterval(intervalID);
        }
        count++;
      }, 500);
    }
  });

  const intervalID = setInterval(() => {
    let count = 0;
    getElementByAttr(
      "[data-adclicklocation='fl_unknown']",
      (elements) => {
        console.log(elements);
        for (let element of elements) {
          element.insertAdjacentElement("beforeend", ui);
        }
        clearInterval(intervalID);
      },
      true
    );

    if (count === 2) {
      clearInterval(intervalID);
    }

    count++;
  }, 500);

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
      .then(() => {
        setState("success");
      })
      .catch(() => {
        setState("error");
      });
  });
}

export default reddit;
