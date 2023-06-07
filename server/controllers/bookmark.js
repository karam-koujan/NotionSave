const getDatabasesId = require("../helpers/getDatabasesId");

exports.bookmarkController = async (req, res) => {
  const { link, type, metaData } = req.body;
  console.log("aut", req.headers.authorization);
  try {
    const dbId = await getDatabasesId(
      "Social Media Bookmarks",
      req.headers.authorization
    );
    let notionPagedata;
    if (type === "youtube") {
      notionPagedata = {
        parent: {
          type: "database_id",
          database_id: dbId[dbId.length - 1],
        },
        properties: {
          Title: {
            type: "title",
            title: [{ type: "text", text: { content: metaData.title } }],
          },
          "Social Media": {
            select: {
              name: "youtube",
            },
          },
          Link: { url: link },
        },
        children: [
          {
            type: "embed",
            embed: { url: link },
          },
        ],
      };
    } else {
      notionPagedata = {
        parent: {
          type: "database_id",
          database_id: dbId[dbId.length - 1],
        },
        properties: {
          Title: {
            type: "title",
            title: [{ type: "text", text: { content: metaData.title } }],
          },
          "Social Media": {
            select: {
              name: "twitter",
            },
          },
          Link: { url: link },
        },
        children: [
          {
            type: "embed",
            embed: { url: link },
          },
        ],
      };
    }

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
    return res.status(201).json({ message: "page is created" });
  } catch (err) {
    console.log(err);
  }
};
