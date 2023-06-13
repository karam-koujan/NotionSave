import { createElement } from "../../../helpers";

function notionSave() {
  const saveText = createElement("span", {}, "Notion");
  const save = createElement(
    "div",
    {
      style:
        "display:flex;justify-content:center;align-items:center; margin-inline:.6rem;cursor:pointer;",
    },
    saveText
  );

  function setState(state) {
    if (state === "default") {
      saveText.textContent = "Notion";
    }
    if (state === "loading") {
      saveText.textContent = "Saving...";
    }
    if (state === "success") {
      saveText.textContent = "Saved";
    }
    if (state === "error") {
      saveText.textContent = "Error";
    }
  }

  return {
    ui: save,
    setState,
  };
}

export default notionSave;
