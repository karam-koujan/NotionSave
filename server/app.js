const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const getPagesId = require("./helpers/getPagesId");
const getDatabasesId = require("./helpers/getDatabasesId");
const { bookmarkController } = require("./controllers/bookmark");
const app = express();
const port = 3000;
require("dotenv").config();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/api/dbId", async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  try {
    const dbId = await getDatabasesId("Social Media Bookmarks", token);
    res.json({ dbId, error: false });
  } catch {
    res.json({ error: true });
  }
});
app.post("/api/createDB", async (req, res) => {
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
    const resJson = await res.json();
    console.log(resJson);
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/bookmark", bookmarkController);

////////////////////////////////////////////////

app.get("/api/auth", async (req, res) => {
  const { code, error } = req.query;
  console.log("code", req.query);
  console.log(error);
  if (error !== "null") {
    return res.json({ message: "request cancelled", error: true });
  }

  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const redirectUri = process.env.REDIRECT_URI;

  // encode in base 64
  const encoded = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  try {
    const response = await fetch("https://api.notion.com/v1/oauth/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${encoded}`,
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
      }),
    });

    const data = await response.json();
    console.log("data", data);
    if (data.error) {
      return res.json({ message: data.error, error: true });
    }
    console.log(data.owner.user.name);

    res.json({ message: "sucess", data, error: false });
  } catch (err) {
    console.log(err);
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
