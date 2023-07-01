import { createElement, componentsSetters } from "../../../helpers/";

function profileName(props) {
  const nameTag = createElement(
    "p",
    {
      style:
        "color:#37352f;font-size:17px;text-align:center;font-weight:bold;margin-top:.5rem;",
    },
    props.name
  );
  const componentsSettersMethods = componentsSetters(nameTag);
  return { ui: nameTag, ...componentsSettersMethods };
}

export default profileName;
