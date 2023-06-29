import auth from "./auth";
import { createElement, componentsSetters } from "../../../helpers/";
function login() {
  const loginBtn = createElement(
    "button",
    { id: "login", class: "createDb" },
    "Connect to notion"
  );

  const loginWrapper = document.getElementById("connect");
  loginBtn.addEventListener("click", auth);

  loginWrapper.appendChild(loginBtn);
  const componentSettersMethods = componentsSetters(loginBtn);
  return { ui: loginBtn, ...componentSettersMethods };
}

export default login;
