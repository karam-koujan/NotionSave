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
  return {
    render: () => {
      wrapper.appendChild(btn);
    },
    dbBtn: btn,
  };
}

export default createDbBtn;
