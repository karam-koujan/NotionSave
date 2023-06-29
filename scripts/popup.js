(()=>{"use strict";const e="http://localhost:3000",t=function(e,t,o){const n=document.createElement(e);if(null!==t)for(let e in t)n.setAttribute(e,t[e]);if(void 0!==o)return Array.isArray(o)?o.forEach((e=>{n.appendChild(e)})):"string"==typeof o?n.textContent=o:n.appendChild(o),n},o=function(e){return{setAttr:function(t,o){e[t]=o},setStyle:function(t,o){e.style[t]=o},setText:function(t){e.textContent=t}}},n=function(){const t=document.getElementById("createDbBtn");t.textContent="Creating...";const o=JSON.parse(localStorage.getItem("user"));fetch(`${e}/api/createDB`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:o.access_token}}).then((e=>(t.textContent="Database is created!!",e.json()))).then((({data:e})=>{console.log("data",e),localStorage.setItem("databaseId",e.id),chrome.tabs.query({active:!0,currentWindow:!0},(function(t){chrome.tabs.sendMessage(t[0].id,{databaseId:e.id})}))}))},a=function(){document.getElementById("login").textContent="Connecting...",chrome.identity.launchWebAuthFlow({url:"https://api.notion.com/v1/oauth/authorize?client_id=886c4ba1-a766-4abe-b227-68d823f578eb&response_type=code&owner=user&redirect_uri=https%3A%2F%2Flgfogmkjmheekcelnijmlmbojdbaoabh.chromiumapp.org%2F",interactive:!0},(function(e){if(chrome.runtime.lastError||!e)return void console.error(chrome.runtime.lastError);console.log(e);const t=function(e){const t=new URL(e);return{code:t.searchParams.get("code"),error:t.searchParams.get("error")}}(e);console.log("dd"),t.code,localStorage.setItem("redirectUrlCode",JSON.stringify(t))}));const e=JSON.parse(localStorage.getItem("user"));e&&setTimeout((()=>{chrome.tabs.query({active:!0,currentWindow:!0},(function(t){chrome.tabs.sendMessage(t[0].id,{accessToken:e.access_token})}))}),500)},r=function({owner:e}){const o=document.getElementById("profile"),n=function(e){const o=t("img",{style:"object-fit:cover;border-radius:50%;width:100%;display:block;",src:e.img,alt:e.name},"");return t("div",{style:"border-radius:50%; margin-inline:auto; width:100px; margin-top:1rem;"},o)}({img:e.user.avatar_url,alt:e.user.name}),a=(r={name:e.user.name},t("p",{style:"color:#37352f;font-size:17px;text-align:center;font-weight:bold;margin-top:.5rem;"},r.name));var r;return o.appendChild(n),o.appendChild(a),o};document.addEventListener("DOMContentLoaded",(()=>{const s=function(){const e=t("button",{class:"createDb",id:"createDbBtn"},"loading"),a=document.getElementById("createDb");return e.addEventListener("click",n),a.appendChild(e),{ui:e,...o(e)}}(),c=JSON.parse(localStorage.getItem("redirectUrlCode"));let i,d="undefined"!==localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):void 0;if(d?(r(d),fetch(`${e}/api/dbId`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:d.access_token}}).then((e=>e.json())).then((e=>{console.log(e),e.error||0===e.dbId.length?s.setText("Create Notion Database"):(localStorage.setItem("databaseId",e.dbId[0]),s.setText("database is created"),s.setStyle("opacity","0.8"),s.setAttr("disabled",!0),setTimeout((()=>{chrome.tabs.query({active:!0,currentWindow:!0},(function(t){chrome.tabs.sendMessage(t[0].id,{databaseId:e.dbId[0]})}))}),500))})),setTimeout((()=>{chrome.tabs.query({active:!0,currentWindow:!0},(function(e){chrome.tabs.sendMessage(e[0].id,{accessToken:d.access_token})}))}),500)):(i=function(){const e=t("button",{id:"login",class:"createDb"},"Connect to notion"),n=document.getElementById("connect");return e.addEventListener("click",a),n.appendChild(e),{ui:e,...o(e)}}(),s.setStyle("display","none")),!d&&c){console.log("dom",d);const t=`${e}/api/auth?code=${c.code}&error=${c.error}`;fetch(t).then((e=>e.json())).then((t=>{if(!t.error)return setTimeout((()=>{chrome.tabs.query({active:!0,currentWindow:!0},(function(e){chrome.tabs.sendMessage(e[0].id,{accessToken:t.data.access_token})}))}),500),fetch(`${e}/api/dbId`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:t.data.access_token}}).then((e=>e.json())).then((e=>{console.log(e),e.error||0===e.dbId.length?s.setText("Create Notion Database"):(setTimeout((()=>{chrome.tabs.query({active:!0,currentWindow:!0},(function(t){chrome.tabs.sendMessage(t[0].id,{databaseId:e.dbId[0]})}))}),500),s.setText("database is created"),s.setStyle("opacity","0.8"),s.setAttr("disabled",!0))})),localStorage.setItem("user",JSON.stringify(t.data)),r(t.data),i&&i.setStyle("display","none"),s.setStyle("display","block"),t.error?console.log("error"):void 0}))}}))})();