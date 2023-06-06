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

  loginWrapper.appendChild(loginBtn);
  return loginBtn;
}

export default login;
