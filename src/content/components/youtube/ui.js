import { createElement } from "../../../helpers";

function notionSave() {
  const youtubeSaveBtnTxt = createElement(
    "span",
    {
      style:
        "color:#0f0f0f;font-size:14px;font-family:Roboto,Arial,sans-serif;font-weight:bold;text-transform:capitalize;",
    },
    "notion"
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

  function setState(state) {
    if (state === "default") {
      youtubeSaveBtnTxt.textContent = "Notion";
    }
    if (state === "loading") {
      youtubeSaveBtnTxt.textContent = "Saving...";
    }
    if (state === "success") {
      youtubeSaveBtnTxt.textContent = "Saved";
    }
    if (state === "error") {
      youtubeSaveBtnTxt.textContent = "Error";
    }
  }
  return {
    ui: youtubeSaveBtn,
    setState,
  };
}

export default notionSave;
