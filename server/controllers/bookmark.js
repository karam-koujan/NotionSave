const getDatabasesId = require("../helpers/getDatabasesId");
const generateNotionPageData = require("../helpers/generateNotionPageData");

const bookmarkController = async (req, res) => {
  const { link, type, metaData } = req.body;
  try {
    const dbId = await getDatabasesId(
      "Social Media Bookmarks",
      req.headers.authorization
    );

    const notionPagedata = generateNotionPageData({
      type: type,
      content: { ...metaData, link },
      dbId,
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
    return res.status(201).json({ message: "page is created", error: false });
  } catch (err) {
    console.log(err);
  }
};

module.exports = bookmarkController;
