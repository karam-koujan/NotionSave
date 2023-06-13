import { getElementByAttr } from "../../../helpers";
function injectScript(ui) {
  console.log("time");
  getElementByAttr("[data-testid='caret']", (element) => {
    element.addEventListener("click", () => {
      getElementByAttr("[data-testid='Dropdown']", (element) => {
        element.insertAdjacentElement("afterbegin", ui);
      });
    });
  });
}

export default injectScript;
