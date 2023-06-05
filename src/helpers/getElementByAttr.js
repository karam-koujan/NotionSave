function getElementByAttr(attributeFilter, callback) {
  const element = document.querySelector(attributeFilter);
  if (element) {
    callback(element);
  } else {
    setTimeout(() => {
      getElementByAttr(attributeFilter, callback);
    }, 100); // Retry after 100 milliseconds
  }
}

export default getElementByAttr;
