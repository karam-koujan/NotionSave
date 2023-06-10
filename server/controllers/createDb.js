const getPagesId = require("../helpers/getPagesId");
const createDbController = async (req, res) => {
  try {
    const idList = await getPagesId(req.headers.authorization);

    // get the first page and ingore all the other pages.
    const pageId = idList[0];
    const notionDbdata = {
      parent: {
        type: "page_id",
        page_id: pageId,
      },
      title: [{ type: "text", text: { content: "Social Media Bookmarks" } }],
      properties: {
        Title: { title: {} },
        "Social Media": {
          select: {
            options: [
              {
                name: "youtube",
                color: "red",
              },
              {
                name: "twitter",
                color: "blue",
              },
              {
                name: "linkedIn",
                color: "green",
              },
            ],
          },
        },
        Link: { url: {} },
      },
    };
    const url = "https://api.notion.com/v1/databases";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Notion-Version": "2022-06-28",
        "content-type": "application/json",
        authorization: `Bearer ${req.headers.authorization}`,
      },
      body: JSON.stringify(notionDbdata),
    };
    const response = await fetch(url, options);
    const resJson = await response.json();
    console.log("databaseisCreated", resJson);
    return res.json({
      message: "database is created",
      error: false,
      data: resJson,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = createDbController;
