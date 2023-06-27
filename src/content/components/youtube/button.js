import { createElement } from "../../../helpers";
function notionSave() {
  const content = "notion";

  const youtubeSaveBtnTxt = createElement(
    "span",
    {
      style:
        "color:#0f0f0f;font-size:14px;font-family:Roboto,Arial,sans-serif;font-weight:bold;text-transform:capitalize;",
    },
    content
  );
  const youtubeSaveBtn = createElement(
    "div",
    {
      style:
        "display:flex;justify-content:center;align-item:center;padding:10px 16px;cursor:pointer; background:white;border-radius:18px;margin-right:.9rem;transition:opacity 0.6 ease-in;",
      onmouseover: "this.style.opacity=0.9",
      onmouseout: "this.style.opacity=1",
    },
    youtubeSaveBtnTxt
  );

  const setState = (text) => {
    saveText.textContent = text;
  };

  return {
    ui: youtubeSaveBtn,
    setState,
  };
}

export default notionSave;
