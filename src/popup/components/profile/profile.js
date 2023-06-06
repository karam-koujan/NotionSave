import profileImg from "./profileImg";
import profileName from "./profileName";
function profile({ owner }) {
  const parent = document.getElementById("parent");
  const imgContainer = profileImg({
    img: owner.user.avatar_url,
    alt: owner.user.name,
  });
  const nameTag = profileName({ name: owner.user.name });
  return {
    render: function () {
      parent.appendChild(imgContainer.img);
      parent.appendChild(nameTag.name);
    },
    parent,
  };
}
export default profile;
