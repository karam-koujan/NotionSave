import { createElement } from "../../../helpers";

function notionSave({ content, loading, success, error }) {
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

  function setState(state) {
    if (state === "default") {
      youtubeSaveBtnTxt.textContent = content;
    }
    if (state === "loading") {
      youtubeSaveBtnTxt.textContent = loading ? loading : "loading";
    }
    if (state === "success") {
      youtubeSaveBtnTxt.textContent = success ? loading : "saved";
    }
    if (state === "error") {
      youtubeSaveBtnTxt.textContent = error ? loading : "error";
    }
  }
  return {
    ui: youtubeSaveBtn,
    setState,
  };
}

export default notionSave;
