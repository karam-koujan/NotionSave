import { createElement } from "../../../helpers";

function notionSave() {
  const saveText = createElement(
    "p",
    {
      style:
        "color:#e7e9ea;font-family:TwitterChirp;font-size:15px;font-weight:bold;padding:15px 0 12px 3rem;margin:0;",
    },
    "Save to Notion"
  );
  const wrapper = createElement(
    "div",
    { id: "notion", style: "cursor:pointer" },
    saveText
  );

  function setState(state) {
    if (state === "default") {
      saveText.textContent = "Save to Notion";
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
    ui: wrapper,
    setState,
  };
}
export default notionSave;
