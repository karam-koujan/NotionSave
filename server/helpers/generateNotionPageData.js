function generateNotionPageData({ type, content, dbId }) {
  notionPagedata = {
    parent: {
      type: "database_id",
      database_id: dbId,
    },
    properties: {
      Title: {
        type: "title",
        title: [{ type: "text", text: { content: content.title } }],
      },
      "Social Media": {
        select: {
          name: type,
        },
      },
      Link: { url: content.link },
    },
    children: [
      {
        type: "embed",
        embed: { url: content.link },
      },
    ],
  };
  return notionPagedata;
}

module.exports = generateNotionPageData;
