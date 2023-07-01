import { createElement, componentsSetters } from "../../../helpers/";

function profileImg(props) {
  const img = createElement(
    "img",
    {
      style: "object-fit:cover;border-radius:50%;width:100%;display:block;",
      src: props.img,
      alt: props.name,
    },
    ""
  );
  const imgContainer = createElement(
    "div",
    {
      style:
        "border-radius:50%; margin-inline:auto; width:100px; margin-top:1rem;",
    },
    img
  );
  const componentsSettersMethods = componentsSetters(img);

  return { ui: imgContainer, ...componentsSettersMethods };
}
export default profileImg;
