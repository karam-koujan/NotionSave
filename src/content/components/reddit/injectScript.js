import { getElementByAttr } from "../../../helpers";

function injectScript(ui) {
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
export default injectScript;
