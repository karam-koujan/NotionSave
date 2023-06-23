(async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
  });
  console.log(tab);
  const response = await chrome.tabs.sendMessage(tab.id, { greeting: "hello" });
  // do something with response here, not outside the function
  console.log(response);
})();
