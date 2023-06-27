import { createElement } from "../../../helpers";

function notionSave({ content, loading, success, error }) {
  const saveText = createElement("span", {}, content);
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
      saveText.textContent = content;
    }
    if (state === "loading") {
      saveText.textContent = loading ? loading : "loading...";
    }
    if (state === "success") {
      saveText.textContent = success ? loading : "saved";
    }
    if (state === "error") {
      saveText.textContent = error ? loading : "error";
    }
  }

  return {
    ui: save,
    setState,
  };
}

export default notionSave;
