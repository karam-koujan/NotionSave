import { getElementByAttr } from "../../../helpers";
function injectScript(ui) {
  getElementByAttr("#actions", (element) => {
    element.insertAdjacentElement("afterbegin", ui);
  });
}
export default injectScript;
