import createElement from "../../../helpers/createElement";
import createDb from "./createDb";
function createDbBtn() {
  const btn = createElement(
    "btn",
    { class: "createDb", id: "createDbBtn" },
    "loading"
  );
  const wrapper = document.getElementById("createDb");
  btn.addEventListener("click", createDb);
  wrapper.appendChild(btn);

  function setState(state) {
    btn.textContent = state;
  }
  return { ui: btn, setState };
}

export default createDbBtn;
