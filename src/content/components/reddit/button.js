import { componentsSetters, createElement } from "../../../helpers";

function notionSave() {
  const content = "notion";
  const saveText = createElement("span", {}, content);
  const save = createElement(
    "div",
    {
      style:
        "display:flex;justify-content:center;align-items:center; margin-inline:.6rem;cursor:pointer;",
    },
    saveText
  );

  return {
    ui: save,
    ...componentsSetters,
  };
}

export default notionSave;
