import createElement from "../../../helpers/createElement";

function profileName(props) {
  const nameTag = createElement(
    "p",
    {
      style:
        "color:#37352f;font-size:17px;text-align:center;font-weight:bold;margin-top:.5rem;",
    },
    props.name
  );
  return nameTag;
}

export default profileName;
