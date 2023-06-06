import createElement from "../../../helpers/createElement";

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

  return {
    img: imgContainer,
  };
}
export default profileImg;
