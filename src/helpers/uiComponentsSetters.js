function setText(state) {
  btn.textContent = state;
}
function setStyle(attr, val) {
  btn.style[attr] = val;
}
function setAttr(attr, val) {
  btn[attr] = val;
}

const componentsSetters = {
  setAttr,
  setStyle,
  setAttr,
};
export default componentsSetters;
