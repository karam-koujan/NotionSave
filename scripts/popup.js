(()=>{"use strict";const e=function(e,t,o){const n=document.createElement(e);if(null!==t)for(let e in t)n.setAttribute(e,t[e]);if(void 0!==o)return Array.isArray(o)?o.forEach((e=>{n.appendChild(e)})):"string"==typeof o?n.textContent=o:n.appendChild(o),n},t=function(){const e=document.getElementById("createDbBtn");e.textContent="Creating...";const t=JSON.parse(localStorage.getItem("user"));fetch("http://localhost:3000/api/createDB",{method:"POST",headers:{"Content-Type":"application/json",Authorization:t.access_token}}).then((t=>(e.textContent="Database is created!!",t.json()))).then((({data:e})=>{console.log("data",e),localStorage.setItem("databaseId",e.id),chrome.tabs.query({active:!0,currentWindow:!0},(function(t){chrome.tabs.sendMessage(t[0].id,{databaseId:e.id})}))}))},o=function(){document.getElementById("login").textContent="Connecting...",chrome.identity.launchWebAuthFlow({url:"https://api.notion.com/v1/oauth/authorize?client_id=886c4ba1-a766-4abe-b227-68d823f578eb&response_type=code&owner=user&redirect_uri=https%3A%2F%2Flgfogmkjmheekcelnijmlmbojdbaoabh.chromiumapp.org%2F",interactive:!0},(function(e){if(chrome.runtime.lastError||!e)return void console.error(chrome.runtime.lastError);console.log(e);const t=function(e){const t=new URL(e);return{code:t.searchParams.get("code"),error:t.searchParams.get("error")}}(e);console.log("dd"),t.code,localStorage.setItem("redirectUrlCode",JSON.stringify(t))}));const e=JSON.parse(localStorage.getItem("user"));e&&setTimeout((()=>{chrome.tabs.query({active:!0,currentWindow:!0},(function(t){chrome.tabs.sendMessage(t[0].id,{accessToken:e.access_token})}))}),500)},n=function({owner:t}){const o=document.getElementById("profile"),n=function(t){const o=e("img",{style:"object-fit:cover;border-radius:50%;width:100%;display:block;",src:t.img,alt:t.name},"");return e("div",{style:"border-radius:50%; margin-inline:auto; width:100px; margin-top:1rem;"},o)}({img:t.user.avatar_url,alt:t.user.name}),a=(r={name:t.user.name},e("p",{style:"color:#37352f;font-size:17px;text-align:center;font-weight:bold;margin-top:.5rem;"},r.name));var r;return o.appendChild(n),o.appendChild(a),o};window.onload=()=>{const e=document.getElementById("createDbBtn"),t=JSON.parse(localStorage.getItem("user"));if(console.log("user",t),null!==t){fetch("http://localhost:3000/api/dbId",{method:"GET",headers:{"Content-Type":"application/json",Authorization:t.access_token}}).then((e=>e.json())).then((t=>{t.error||0===t.dbId.length?e.textContent="Create Notion Database":(e.textContent="database is created",e.style.opacity="0.8",e.disabled=!0)}));const o=localStorage.getItem("databaseId");setTimeout((()=>{chrome.tabs.query({active:!0,currentWindow:!0},(function(e){chrome.tabs.sendMessage(e[0].id,{accessToken:t.access_token})}))}),500),chrome.tabs.query({active:!0,currentWindow:!0},(function(e){chrome.tabs.sendMessage(e[0].id,{databaseId:o})}))}},document.addEventListener("DOMContentLoaded",(()=>{!function(){const o=e("btn",{class:"createDb",id:"createDbBtn"},"loading"),n=document.getElementById("createDb");o.addEventListener("click",t),n.appendChild(o)}();const a=document.getElementById("createDbBtn"),r=JSON.parse(localStorage.getItem("redirectUrlCode"));let c="undefined"!==localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):void 0;if(!c&&r){console.log("dom",c);const e=`http://localhost:3000/api/auth?code=${r.code}&error=${r.error}`;fetch(e).then((e=>e.json())).then((e=>{if(e.error)return;fetch("http://localhost:3000/api/dbId",{method:"GET",headers:{"Content-Type":"application/json",Authorization:e.data.access_token}}).then((e=>e.json())).then((e=>{e.error||0===e.dbId.length?a.textContent="Create Notion Database":(a.textContent="database is created",a.style.opacity="0.8",a.disabled=!0)}));const t=document.getElementById("login");return localStorage.setItem("user",JSON.stringify(e.data)),n(e.data),t&&(t.style.display="none"),a.style.display="block",e.error?console.log("error"):void 0}))}c="undefined"!==localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):void 0,c?n(c):(function(){const t=e("button",{id:"login",class:"createDb"},"Connect to notion"),n=document.getElementById("connect");t.addEventListener("click",o),n.appendChild(t)}(),a.style.display="none")}))})();