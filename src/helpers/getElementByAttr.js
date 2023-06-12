function getElementByAttr(attributeFilter, callback, all = false) {
  const element = !all
    ? document.querySelector(attributeFilter)
    : document.querySelectorAll(attributeFilter);
  if (element) {
    callback(element);
  } else {
    setTimeout(() => {
      getElementByAttr(attributeFilter, callback);
    }, 100); // Retry after 100 milliseconds
  }
}

export default getElementByAttr;
