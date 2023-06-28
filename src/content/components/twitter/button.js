import { componentsSetters, createElement } from "../../../helpers";
function notionSave() {
  const content = "save to notion";
  const saveText = createElement(
    "p",
    {
      style:
        "color:#e7e9ea;font-family:TwitterChirp;font-size:15px;font-weight:bold;padding:15px 0 12px 3rem;margin:0;",
    },
    content
  );
  const wrapper = createElement(
    "div",
    { id: "notion", style: "cursor:pointer" },
    saveText
  );

  return {
    ui: wrapper,
    ...componentsSetters,
  };
}
export default notionSave;
