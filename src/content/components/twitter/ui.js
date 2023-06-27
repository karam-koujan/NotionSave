import { createElement } from "../../../helpers";

function notionSave({ content, loading, success, error }) {
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
    ui: wrapper,
    setState,
  };
}
export default notionSave;
