function componentsSetters(htmlElement) {
  function setText(state) {
    htmlElement.textContent = state;
  }
  function setStyle(attr, val) {
    htmlElement.style[attr] = val;
  }
  function setAttr(attr, val) {
    htmlElement[attr] = val;
  }
  return {
    setAttr,
    setStyle,
    setText,
  };
}

export default componentsSetters;
