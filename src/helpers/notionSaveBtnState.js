function notionSaveBtnState(button, { content, loading, success, error }) {
  return (state) => {
    if (state === "default") {
      button.textContent = content;
    }
    if (state === "loading") {
      button.textContent = loading ? loading : "loading...";
    }
    if (state === "success") {
      button.textContent = success ? loading : "saved";
    }
    if (state === "error") {
      button.textContent = error ? loading : "error";
    }
  };
}
export default notionSaveBtnState;
