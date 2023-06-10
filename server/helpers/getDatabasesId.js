function getDatabasesId(query, token) {
  return new Promise((resolve, reject) => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Notion-Version": "2022-06-28",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        filter: { value: "database", property: "object" },
      }),
    };

    fetch("https://api.notion.com/v1/search", options)
      .then((response) => response.json())
      .then(({ results }) => resolve(results.map((result) => result.id)))
      .catch((err) => reject(err));
  });
}

module.exports = getDatabasesId;
