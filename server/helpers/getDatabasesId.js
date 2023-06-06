const { Client } = require("@notionhq/client");

function getDatabasesId(query, token) {
  console.log(token);
  const notion = new Client({
    auth: token,
  });
  return new Promise((resolve, reject) => {
    notion
      .search({
        query,
        filter: {
          value: "database",
          property: "object",
        },
      })
      .then(({ results }) => resolve(results.map((result) => result.id)))
      .catch((err) => reject(err));
  });
}

module.exports = getDatabasesId;
