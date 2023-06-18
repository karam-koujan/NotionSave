import env from "../config/env";
function bookmark(data) {
  const token = localStorage.getItem("token");
  const databaseId = localStorage.getItem("databaseId");
  const body = {
    databaseId,
    ...data,
  };
  return fetch(`${env.hostname}/api/bookmark`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(body),
  });
}
export default bookmark;
