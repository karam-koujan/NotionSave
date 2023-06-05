import createElement from "../../../helpers/createElement";
import getElementByAttr from "../../../helpers/getElementByAttr";

function twitterSave() {
  const saveText = createElement(
    "p",
    {
      style:
        "color:#e7e9ea;font-family:TwitterChirp;font-size:15px;font-weight:bold;padding:15px 0 12px 3rem;margin:0;",
    },
    "Save to Notion"
  );
  const wrapper = createElement(
    "div",
    { id: "notion", style: "cursor:pointer" },
    saveText
  );
  let tweetText = "";

  navigation.addEventListener("navigate", (navigateEvent) => {
    if (!navigateEvent.hashChange) {
      setInterval(() => {
        getElementByAttr(
          "[data-testid='caret']",
          (element) => {
            element.addEventListener("click", () => {
              saveText.textContent = "Save to Notion";

              getElementByAttr("[data-testid='Dropdown']", (element) => {
                element.insertAdjacentElement("afterbegin", wrapper);
              });
            });
          },
          500
        );
      });
    }
  });

  getElementByAttr("[data-testid='caret']", (element) => {
    element.addEventListener("click", () => {
      saveText.textContent = "Save to Notion";
      getElementByAttr("[data-testid='Dropdown']", (element) => {
        element.insertAdjacentElement("afterbegin", wrapper);
      });
    });
  });

  wrapper.addEventListener("click", () => {
    getElementByAttr("[data-testid='tweetText']", (element) => {
      tweetText = element.firstChild.textContent;
      tweetText = tweetText.length < 10 ? tweetText : tweetText.slice(0, 10);
    });
    const link = window.location.href;
    saveText.textContent = "Saving...";
    const token = localStorage.getItem("token");
    const data = { link, type: "twitter", metaData: { title: tweetText } };
    fetch("http://localhost:3000/api/bookmark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        saveText.textContent = "Saved";
      })
      .catch(() => {
        saveText.textContent = "error";
      });
  });
}

export default twitterSave;
