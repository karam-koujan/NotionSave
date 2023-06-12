import getElementByAttr from "../../../helpers/getElementByAttr";
import createElement from "../../../helpers/createElement";

function reddit() {
  const saveText = createElement("span", {}, "Notion");
  const save = createElement(
    "div",
    {
      style:
        "display:flex;justify-content:center;align-items:center; margin-inline:.6rem;",
    },
    saveText
  );

  const saveToNotion = (element) => {
    const elementText = element.lastChild.textContent;
    if (elementText === "unsave") return;
    console.log(window.location.href, "work");
  };

  getElementByAttr(
    "[data-adclicklocation='fl_unknown']",
    (elements) => {
      console.log(elements);
      for (let element of elements) {
        element.insertAdjacentElement("beforeend", save);
        element.firstElementChild.addEventListener("click", () =>
          saveToNotion(element)
        );
      }
    },
    true
  );
  navigation.addEventListener("navigate", (navigateEvent) => {
    if (!navigateEvent.hashChange) {
      console.log("change");
      const intervalID = setInterval(() => {
        console.log("interval");
        getElementByAttr(
          "[data-adclicklocation='fl_unknown']",
          (elements) => {
            console.log(elements.length);
            if (elements.length === 2) {
              clearInterval(intervalID);
            }
            for (let element of elements) {
              element.insertAdjacentElement("beforeend", save);
              element.firstElementChild.addEventListener("click", () =>
                saveToNotion(element)
              );
            }
          },
          true
        );
      }, 500);
    }
  });
}

export default reddit;
