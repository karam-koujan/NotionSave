const getDatabasesId = require("../helpers/getDatabasesId");
const generateNotionPageData = require("../helpers/generateNotionPageData");

const bookmarkController = async (req, res) => {
  const { databaseId, link, type, metaData } = req.body;
  try {
    const notionPagedata = generateNotionPageData({
      type: type,
      content: { ...metaData, link },
      dbId: databaseId,
    });

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Notion-Version": "2022-06-28",
        "content-type": "application/json",
        authorization: `Bearer ${req.headers.authorization}`,
      },
      body: JSON.stringify(notionPagedata),
    };

    const uri = "https://api.notion.com/v1/pages";
    const response = await fetch(uri, options);
    const resJson = await response.json();
    console.log(resJson);
    return res.status(201).json(resJson);
  } catch (err) {
    console.log(err);
  }
};

module.exports = bookmarkController;
