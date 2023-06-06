import auth from "./auth";
import createElement from "../../../helpers/createElement";
function login() {
  const loginBtn = createElement(
    "button",
    { id: "login", class: "createDb" },
    "Connect to notion"
  );

  const loginWrapper = document.getElementById("connect");
  loginBtn.addEventListener("click", auth);

  return {
    render: function () {
      loginWrapper.appendChild(loginBtn);
    },
    loginBtn,
  };
}

export default login;
