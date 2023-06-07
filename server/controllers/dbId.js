const getDatabasesId = require("../helpers/getDatabasesId");
const dbIdController = async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  try {
    const dbId = await getDatabasesId("Social Media Bookmarks", token);
    res.json({ dbId, error: false });
  } catch {
    res.json({ error: true });
  }
};

module.exports = dbIdController;
