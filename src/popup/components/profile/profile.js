import profileImg from "./profileImg";
import profileName from "./profileName";
import { componentsSetters } from "../../../helpers";
function profile({ owner }) {
  const parent = document.getElementById("profile");
  const imgContainer = profileImg({
    img: owner.user.avatar_url,
    alt: owner.user.name,
  });
  const nameTag = profileName({ name: owner.user.name });
  parent.appendChild(imgContainer.ui);
  parent.appendChild(nameTag.ui);
  const componentsSettersMethods = componentsSetters(nameTag);
  return { ui: parent, ...componentsSettersMethods };
}
export default profile;
