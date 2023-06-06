import profileImg from "./profileImg";
import profileName from "./profileName";
function profile({ owner }) {
  const parent = document.getElementById("profile");
  const imgContainer = profileImg({
    img: owner.user.avatar_url,
    alt: owner.user.name,
  });
  const nameTag = profileName({ name: owner.user.name });
  parent.appendChild(imgContainer);
  parent.appendChild(nameTag);
  return parent;
}
export default profile;
