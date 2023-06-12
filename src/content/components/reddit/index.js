import getElementByAttr from "../../../helpers/getElementByAttr";
import createElement from "../../../helpers/createElement";
import bookmark from "../../../helpers/bookmark";
function reddit() {
  const saveText = createElement("span", {}, "Notion");
  let postTitle = "";
  const save = createElement(
    "div",
    {
      style:
        "display:flex;justify-content:center;align-items:center; margin-inline:.6rem;cursor:pointer;",
    },
    saveText
  );
  getElementByAttr("h1", (element) => {
    postTitle = element.textContent;
    console.log(postTitle);
  });

  navigation.addEventListener("navigate", (navigateEvent) => {
    if (!navigateEvent.hashChange) {
      saveText.textContent = "Notion";
      getElementByAttr("[data-adclicklocation='title']", (element) => {
        postTitle =
          element.firstElementChild.firstElementChild.firstElementChild
            .textContent;
        console.log(postTitle);
      });
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
      }, 500);
    }
  });
  if (!postTitle) {
    getElementByAttr("h1", (element) => {
      postTitle = element.textContent;
      console.log(postTitle);
    });
  }

  const intervalID = setInterval(() => {
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
  }, 500);

  save.addEventListener("click", () => {
    const link = window.location.href;
    saveText.textContent = "Saving...";
    const data = {
      link,
      type: "reddit",
      metaData: { title: postTitle },
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
