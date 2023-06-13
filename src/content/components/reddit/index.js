import getElementByAttr from "../../../helpers/getElementByAttr";
import createElement from "../../../helpers/createElement";
import bookmark from "../../../helpers/bookmark";
function reddit() {
  const saveText = createElement("span", {}, "Notion");
  const save = createElement(
    "div",
    {
      style:
        "display:flex;justify-content:center;align-items:center; margin-inline:.6rem;cursor:pointer;",
    },
    saveText
  );

  navigation.addEventListener("navigate", (navigateEvent) => {
    if (!navigateEvent.hashChange) {
      console.log(navigateEvent.destination.url);
      saveText.textContent = "Notion";
      let count = 0;
      const intervalID = setInterval(() => {
        console.log("interval");
        getElementByAttr(
          "[data-adclicklocation='fl_unknown']",
          (elements) => {
            for (let element of elements) {
              element.insertAdjacentElement("beforeend", save);
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
          element.insertAdjacentElement("beforeend", save);
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

  save.addEventListener("click", () => {
    const link = window.location.href;
    saveText.textContent = "Saving...";
    const regex = /\/([^/]+)\/$/;
    const match = regex.exec(link);
    const title = match ? match[1].replace(/_/g, " ") : "";
    const data = {
      link,
      type: "reddit",
      metaData: { title },
    };
    console.log(data);
    const save = bookmark(data);
    save
      .then(() => {
        saveText.textContent = "Saved";
      })
      .catch(() => {
        saveText.textContent = "Error";
      });
  });
}

export default reddit;
