import { componentsSetters, createElement } from "../../../helpers";
import createDb from "./createDb";
function createDbBtn() {
  const btn = createElement(
    "button",
    { class: "createDb", id: "createDbBtn" },
    "loading"
  );
  const wrapper = document.getElementById("createDb");
  btn.addEventListener("click", createDb);
  wrapper.appendChild(btn);
  const componentSettersMethods = componentsSetters(btn);

  return { ui: btn, ...componentSettersMethods };
}

export default createDbBtn;
