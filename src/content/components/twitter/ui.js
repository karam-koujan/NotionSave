import { createElement, notionSaveBtnState } from "../../../helpers";
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

  const setState = notionSaveBtnState(youtubeSaveBtnTxt, {
    content: "save to notion",
  });
  return {
    ui: wrapper,
    setState,
  };
}
export default notionSave;
