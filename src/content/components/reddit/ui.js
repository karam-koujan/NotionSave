import { createElement, notionSaveBtnState } from "../../../helpers";

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

  const setState = notionSaveBtnState(youtubeSaveBtnTxt, {
    content,
    loading,
    success,
    error,
  });

  return {
    ui: save,
    setState,
  };
}

export default notionSave;
