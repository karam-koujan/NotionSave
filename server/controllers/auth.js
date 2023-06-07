const authController = async (req, res) => {
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
};

module.exports = authController;
