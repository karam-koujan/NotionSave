import env from "../config/env";
function bookmark(data, { onError, onSuccess }) {
  const token = localStorage.getItem("token");
  const databaseId = localStorage.getItem("databaseId");
  const body = {
    databaseId,
    ...data,
  };
  fetch(`${env.hostname}/api/bookmark`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then(({ object }) => {
      if (object === "error") {
        return onError();
      }
      onSuccess();
    })
    .catch(() => onError());
}
export default bookmark;
