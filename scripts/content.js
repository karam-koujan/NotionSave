(()=>{"use strict";const t="http://localhost:3000",e=function(e,{onError:n,onSuccess:o}){const a=localStorage.getItem("token"),i={databaseId:localStorage.getItem("databaseId"),...e};fetch(`${t}/api/bookmark`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:a},body:JSON.stringify(i)}).then((t=>t.json())).then((({object:t})=>{if("error"===t)return n();o()})).catch((()=>n()))},n=function(t,e,n){const o=document.createElement(t);if(null!==e)for(let t in e)o.setAttribute(t,e[t]);if(void 0!==n)return Array.isArray(n)?n.forEach((t=>{o.appendChild(t)})):"string"==typeof n?o.textContent=n:o.appendChild(n),o},o=function t(e,n,o=!1){const a=o?document.querySelectorAll(e):document.querySelector(e);a?n(a):setTimeout((()=>{t(e,n)}),100)},a=function(t){let e=0;const n=setInterval((()=>{console.log("interval"),o("[data-adclicklocation='fl_unknown']",(e=>{for(let n of e)n.insertAdjacentElement("beforeend",t)}),!0),2===e&&clearInterval(n),e++}),500)},i=function(){const{ui:t,setState:o}=function({content:t,loading:e,success:o,error:a}){const i=n("span",{},t);return{ui:n("div",{style:"display:flex;justify-content:center;align-items:center; margin-inline:.6rem;cursor:pointer;"},i),setState:function(n){"default"===n&&(i.textContent=t),"loading"===n&&(i.textContent=e||"loading..."),"success"===n&&(i.textContent=o?e:"saved"),"error"===n&&(i.textContent=a?e:"error")}}}({content:"notion"});navigation.addEventListener("navigate",(e=>{e.hashChange||(o("default"),a(t))})),a(t),t.addEventListener("click",(()=>{const t=window.location.href;o("loading");const n=/\/([^/]+)\/$/.exec(t),a=n?n[1].replace(/_/g," "):"";e({link:t,type:"reddit",metaData:{title:a}},{onSuccess:()=>o("success"),onError:()=>o("error")})}))},r=function(t){console.log("time"),o("[data-testid='caret']",(e=>{e.addEventListener("click",(()=>{o("[data-testid='Dropdown']",(e=>{e.insertAdjacentElement("afterbegin",t)}))}))}))},s=function(){const{ui:t,setState:a}=function({content:t,loading:e,success:o,error:a}){const i=n("p",{style:"color:#e7e9ea;font-family:TwitterChirp;font-size:15px;font-weight:bold;padding:15px 0 12px 3rem;margin:0;"},t);return{ui:n("div",{id:"notion",style:"cursor:pointer"},i),setState:function(n){"default"===n&&(i.textContent=t),"loading"===n&&(i.textContent=e||"loading..."),"success"===n&&(i.textContent=o?e:"saved"),"error"===n&&(i.textContent=a?e:"error")}}}({content:"save to notion"});let i="";navigation.addEventListener("navigate",(e=>{if(!e.hashChange){a("default");const e=setInterval((()=>{r(t),clearInterval(e)}))}})),r(t),t.addEventListener("click",(()=>{o("[data-testid='tweetText']",(t=>{i=t.firstChild.textContent,i=i.length<10?i:i.slice(0,10)}));const t=window.location.href;a("loading"),e({link:t,type:"twitter",metaData:{title:i}},{onError:()=>a("error"),onSuccess:()=>a("success")})}))};function c(t,e){o(t,(t=>{const n=t.firstElementChild;for(const t of n.children)"H1"===t.tagName&&e(t.textContent)}))}const l=function(){const{ui:t,setState:a}=function({content:t,loading:e,success:o,error:a}){const i=n("span",{style:"color:#0f0f0f;font-size:14px;font-family:Roboto,Arial,sans-serif;font-weight:bold;text-transform:capitalize;"},t);return{ui:n("div",{style:"display:flex;justify-content:center;align-item:center;padding:10px 16px;cursor:pointer; background:white;border-radius:18px;margin-right:.9rem;transition:opacity 0.6 ease-in;",onmouseover:"this.style.opacity=0.9",onmouseout:"this.style.opacity=1"},i),setState:function(n){"default"===n&&(i.textContent=t),"loading"===n&&(i.textContent=e||"loading"),"success"===n&&(i.textContent=o?e:"saved"),"error"===n&&(i.textContent=a?e:"error")}}}({content:"notion"});let i;(function(t){o("#actions",(e=>{e.insertAdjacentElement("afterbegin",t)}))})(t),navigation.addEventListener("navigate",(t=>{t.hashChange||(a("default"),console.log("change",i),c("#above-the-fold",(t=>{console.log(t),i=t})))})),i||c("#above-the-fold",(t=>{i=t})),t.addEventListener("click",(()=>{const t=window.location.href;a("loading"),e({link:t,type:"youtube",metaData:{title:i}},{onSuccess:()=>a("success"),onError:()=>a("error")})}))};let d=!1;const u=localStorage.getItem("token"),f=localStorage.getItem("databaseId");u&&f&&(d=!0,-1!==location.hostname.indexOf("youtube")&&(console.log("youtube...."),l()),-1!==location.hostname.indexOf("twitter")&&s(),-1!==location.hostname.indexOf("reddit")&&(console.log("working!!!"),i())),chrome.runtime.onMessage.addListener((function(t,e,n){if(t.accessToken){const e=t.accessToken;localStorage.setItem("token",e)}if(t.databaseId){const e=t.databaseId;localStorage.setItem("databaseId",e)}const o=localStorage.getItem("token"),a=localStorage.getItem("databaseId");o&&a&&!d&&(d=!0,-1!==location.hostname.indexOf("youtube")&&(console.log("youtube...."),l()),-1!==location.hostname.indexOf("twitter")&&s(),-1!==location.hostname.indexOf("reddit")&&(console.log("working!!!"),i()))}))})();