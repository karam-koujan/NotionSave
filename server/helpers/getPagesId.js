const { Client } = require("@notionhq/client");
function getPagesId(token) {
  const notion = new Client({
    auth: token,
  });
  return new Promise((resolve, reject) => {
    notion
      .search({
        filter: {
          value: "page",
          property: "object",
        },
      })
      .then(({ results }) => resolve(results.map((result) => result.id)))
      .catch((err) => reject(err));
  });
}

module.exports = getPagesId;
