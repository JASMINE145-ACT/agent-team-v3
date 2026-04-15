var gp=Object.defineProperty;var mp=(e,t,n)=>t in e?gp(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var N=(e,t,n)=>mp(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Os=globalThis,ba=Os.ShadowRoot&&(Os.ShadyCSS===void 0||Os.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,wa=Symbol(),Nl=new WeakMap;let Au=class{constructor(t,n,i){if(this._$cssResult$=!0,i!==wa)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(ba&&t===void 0){const i=n!==void 0&&n.length===1;i&&(t=Nl.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Nl.set(n,t))}return t}toString(){return this.cssText}};const yp=e=>new Au(typeof e=="string"?e:e+"",void 0,wa),Tu=(e,...t)=>{const n=e.length===1?e[0]:t.reduce((i,s,o)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[o+1],e[0]);return new Au(n,e,wa)},vp=(e,t)=>{if(ba)e.adoptedStyleSheets=t.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of t){const i=document.createElement("style"),s=Os.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=n.cssText,e.appendChild(i)}},Bl=ba?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const i of t.cssRules)n+=i.cssText;return yp(n)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:bp,defineProperty:wp,getOwnPropertyDescriptor:xp,getOwnPropertyNames:_p,getOwnPropertySymbols:kp,getPrototypeOf:$p}=Object,Lt=globalThis,zl=Lt.trustedTypes,Sp=zl?zl.emptyScript:"",Vo=Lt.reactiveElementPolyfillSupport,ki=(e,t)=>e,Ws={toAttribute(e,t){switch(t){case Boolean:e=e?Sp:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},xa=(e,t)=>!bp(e,t),Hl={attribute:!0,type:String,converter:Ws,reflect:!1,useDefault:!1,hasChanged:xa};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Lt.litPropertyMetadata??(Lt.litPropertyMetadata=new WeakMap);let Dn=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=Hl){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(t,n),!n.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,n);s!==void 0&&wp(this.prototype,t,s)}}static getPropertyDescriptor(t,n,i){const{get:s,set:o}=xp(this.prototype,t)??{get(){return this[n]},set(r){this[n]=r}};return{get:s,set(r){const a=s==null?void 0:s.call(this);o==null||o.call(this,r),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Hl}static _$Ei(){if(this.hasOwnProperty(ki("elementProperties")))return;const t=$p(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(ki("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ki("properties"))){const n=this.properties,i=[..._p(n),...kp(n)];for(const s of i)this.createProperty(s,n[s])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[i,s]of n)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[n,i]of this.elementProperties){const s=this._$Eu(n,i);s!==void 0&&this._$Eh.set(s,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)n.unshift(Bl(s))}else t!==void 0&&n.push(Bl(t));return n}static _$Eu(t,n){const i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(n=>n(this))}addController(t){var n;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((n=t.hostConnected)==null||n.call(t))}removeController(t){var n;(n=this._$EO)==null||n.delete(t)}_$E_(){const t=new Map,n=this.constructor.elementProperties;for(const i of n.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return vp(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(n=>{var i;return(i=n.hostConnected)==null?void 0:i.call(n)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(n=>{var i;return(i=n.hostDisconnected)==null?void 0:i.call(n)})}attributeChangedCallback(t,n,i){this._$AK(t,i)}_$ET(t,n){var o;const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const r=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:Ws).toAttribute(n,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,n){var o,r;const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const a=i.getPropertyOptions(s),l=typeof a.converter=="function"?{fromAttribute:a.converter}:((o=a.converter)==null?void 0:o.fromAttribute)!==void 0?a.converter:Ws;this._$Em=s;const c=l.fromAttribute(n,a.type);this[s]=c??((r=this._$Ej)==null?void 0:r.get(s))??c,this._$Em=null}}requestUpdate(t,n,i,s=!1,o){var r;if(t!==void 0){const a=this.constructor;if(s===!1&&(o=this[t]),i??(i=a.getPropertyOptions(t)),!((i.hasChanged??xa)(o,n)||i.useDefault&&i.reflect&&o===((r=this._$Ej)==null?void 0:r.get(t))&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,n,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,r??n??this[t]),o!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(n=void 0),this._$AL.set(t,n)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,r]of this._$Ep)this[o]=r;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,r]of s){const{wrapped:a}=r,l=this[o];a!==!0||this._$AL.has(o)||l===void 0||this.C(o,void 0,r,l)}}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),(i=this._$EO)==null||i.forEach(s=>{var o;return(o=s.hostUpdate)==null?void 0:o.call(s)}),this.update(n)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(n)}willUpdate(t){}_$AE(t){var n;(n=this._$EO)==null||n.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(n=>this._$ET(n,this[n]))),this._$EM()}updated(t){}firstUpdated(t){}};Dn.elementStyles=[],Dn.shadowRootOptions={mode:"open"},Dn[ki("elementProperties")]=new Map,Dn[ki("finalized")]=new Map,Vo==null||Vo({ReactiveElement:Dn}),(Lt.reactiveElementVersions??(Lt.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $i=globalThis,Ul=e=>e,Vs=$i.trustedTypes,ql=Vs?Vs.createPolicy("lit-html",{createHTML:e=>e}):void 0,Cu="$lit$",Et=`lit$${Math.random().toFixed(9).slice(2)}$`,Eu="?"+Et,Ap=`<${Eu}>`,pn=document,Ii=()=>pn.createComment(""),Oi=e=>e===null||typeof e!="object"&&typeof e!="function",_a=Array.isArray,Tp=e=>_a(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",Go=`[ 	
\f\r]`,ii=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,jl=/-->/g,Kl=/>/g,Gt=RegExp(`>|${Go}(?:([^\\s"'>=/]+)(${Go}*=${Go}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Wl=/'/g,Vl=/"/g,Ru=/^(?:script|style|textarea|title)$/i,Cp=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),f=Cp(1),Nt=Symbol.for("lit-noChange"),k=Symbol.for("lit-nothing"),Gl=new WeakMap,on=pn.createTreeWalker(pn,129);function Pu(e,t){if(!_a(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return ql!==void 0?ql.createHTML(t):t}const Ep=(e,t)=>{const n=e.length-1,i=[];let s,o=t===2?"<svg>":t===3?"<math>":"",r=ii;for(let a=0;a<n;a++){const l=e[a];let c,d,u=-1,h=0;for(;h<l.length&&(r.lastIndex=h,d=r.exec(l),d!==null);)h=r.lastIndex,r===ii?d[1]==="!--"?r=jl:d[1]!==void 0?r=Kl:d[2]!==void 0?(Ru.test(d[2])&&(s=RegExp("</"+d[2],"g")),r=Gt):d[3]!==void 0&&(r=Gt):r===Gt?d[0]===">"?(r=s??ii,u=-1):d[1]===void 0?u=-2:(u=r.lastIndex-d[2].length,c=d[1],r=d[3]===void 0?Gt:d[3]==='"'?Vl:Wl):r===Vl||r===Wl?r=Gt:r===jl||r===Kl?r=ii:(r=Gt,s=void 0);const g=r===Gt&&e[a+1].startsWith("/>")?" ":"";o+=r===ii?l+Ap:u>=0?(i.push(c),l.slice(0,u)+Cu+l.slice(u)+Et+g):l+Et+(u===-2?a:g)}return[Pu(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class Fi{constructor({strings:t,_$litType$:n},i){let s;this.parts=[];let o=0,r=0;const a=t.length-1,l=this.parts,[c,d]=Ep(t,n);if(this.el=Fi.createElement(c,i),on.currentNode=this.el.content,n===2||n===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=on.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(const u of s.getAttributeNames())if(u.endsWith(Cu)){const h=d[r++],g=s.getAttribute(u).split(Et),m=/([.?@])?(.*)/.exec(h);l.push({type:1,index:o,name:m[2],strings:g,ctor:m[1]==="."?Pp:m[1]==="?"?Mp:m[1]==="@"?Dp:po}),s.removeAttribute(u)}else u.startsWith(Et)&&(l.push({type:6,index:o}),s.removeAttribute(u));if(Ru.test(s.tagName)){const u=s.textContent.split(Et),h=u.length-1;if(h>0){s.textContent=Vs?Vs.emptyScript:"";for(let g=0;g<h;g++)s.append(u[g],Ii()),on.nextNode(),l.push({type:2,index:++o});s.append(u[h],Ii())}}}else if(s.nodeType===8)if(s.data===Eu)l.push({type:2,index:o});else{let u=-1;for(;(u=s.data.indexOf(Et,u+1))!==-1;)l.push({type:7,index:o}),u+=Et.length-1}o++}}static createElement(t,n){const i=pn.createElement("template");return i.innerHTML=t,i}}function zn(e,t,n=e,i){var r,a;if(t===Nt)return t;let s=i!==void 0?(r=n._$Co)==null?void 0:r[i]:n._$Cl;const o=Oi(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==o&&((a=s==null?void 0:s._$AO)==null||a.call(s,!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,i)),i!==void 0?(n._$Co??(n._$Co=[]))[i]=s:n._$Cl=s),s!==void 0&&(t=zn(e,s._$AS(e,t.values),s,i)),t}class Rp{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??pn).importNode(n,!0);on.currentNode=s;let o=on.nextNode(),r=0,a=0,l=i[0];for(;l!==void 0;){if(r===l.index){let c;l.type===2?c=new fo(o,o.nextSibling,this,t):l.type===1?c=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(c=new Lp(o,this,t)),this._$AV.push(c),l=i[++a]}r!==(l==null?void 0:l.index)&&(o=on.nextNode(),r++)}return on.currentNode=pn,s}p(t){let n=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,n),n+=i.strings.length-2):i._$AI(t[n])),n++}}let fo=class Mu{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,n,i,s){this.type=2,this._$AH=k,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=zn(this,t,n),Oi(t)?t===k||t==null||t===""?(this._$AH!==k&&this._$AR(),this._$AH=k):t!==this._$AH&&t!==Nt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Tp(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==k&&Oi(this._$AH)?this._$AA.nextSibling.data=t:this.T(pn.createTextNode(t)),this._$AH=t}$(t){var o;const{values:n,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=Fi.createElement(Pu(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===s)this._$AH.p(n);else{const r=new Rp(s,this),a=r.u(this.options);r.p(n),this.T(a),this._$AH=r}}_$AC(t){let n=Gl.get(t.strings);return n===void 0&&Gl.set(t.strings,n=new Fi(t)),n}k(t){_a(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let i,s=0;for(const o of t)s===n.length?n.push(i=new Mu(this.O(Ii()),this.O(Ii()),this,this.options)):i=n[s],i._$AI(o),s++;s<n.length&&(this._$AR(i&&i._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,n);t!==this._$AB;){const s=Ul(t).nextSibling;Ul(t).remove(),t=s}}setConnected(t){var n;this._$AM===void 0&&(this._$Cv=t,(n=this._$AP)==null||n.call(this,t))}},po=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,i,s,o){this.type=1,this._$AH=k,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=k}_$AI(t,n=this,i,s){const o=this.strings;let r=!1;if(o===void 0)t=zn(this,t,n,0),r=!Oi(t)||t!==this._$AH&&t!==Nt,r&&(this._$AH=t);else{const a=t;let l,c;for(t=o[0],l=0;l<o.length-1;l++)c=zn(this,a[i+l],n,l),c===Nt&&(c=this._$AH[l]),r||(r=!Oi(c)||c!==this._$AH[l]),c===k?t=k:t!==k&&(t+=(c??"")+o[l+1]),this._$AH[l]=c}r&&!s&&this.j(t)}j(t){t===k?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Pp=class extends po{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===k?void 0:t}},Mp=class extends po{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==k)}},Dp=class extends po{constructor(t,n,i,s,o){super(t,n,i,s,o),this.type=5}_$AI(t,n=this){if((t=zn(this,t,n,0)??k)===Nt)return;const i=this._$AH,s=t===k&&i!==k||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==k&&(i===k||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var n;typeof this._$AH=="function"?this._$AH.call(((n=this.options)==null?void 0:n.host)??this.element,t):this._$AH.handleEvent(t)}},Lp=class{constructor(t,n,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){zn(this,t)}};const Ip={I:fo},Qo=$i.litHtmlPolyfillSupport;Qo==null||Qo(Fi,fo),($i.litHtmlVersions??($i.litHtmlVersions=[])).push("3.3.2");const Op=(e,t,n)=>{const i=(n==null?void 0:n.renderBefore)??t;let s=i._$litPart$;if(s===void 0){const o=(n==null?void 0:n.renderBefore)??null;i._$litPart$=s=new fo(t.insertBefore(Ii(),o),o,void 0,n??{})}return s._$AI(e),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const cn=globalThis;let dn=class extends Dn{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var n;const t=super.createRenderRoot();return(n=this.renderOptions).renderBefore??(n.renderBefore=t.firstChild),t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Op(n,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return Nt}};var Su;dn._$litElement$=!0,dn.finalized=!0,(Su=cn.litElementHydrateSupport)==null||Su.call(cn,{LitElement:dn});const Yo=cn.litElementPolyfillSupport;Yo==null||Yo({LitElement:dn});(cn.litElementVersions??(cn.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ka=e=>(t,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Fp={attribute:!0,type:String,converter:Ws,reflect:!1,hasChanged:xa},Np=(e=Fp,t,n)=>{const{kind:i,metadata:s}=n;let o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),i==="setter"&&((e=Object.create(e)).wrapped=!0),o.set(n.name,e),i==="accessor"){const{name:r}=n;return{set(a){const l=t.get.call(this);t.set.call(this,a),this.requestUpdate(r,l,e,!0,a)},init(a){return a!==void 0&&this.C(r,void 0,e,a),a}}}if(i==="setter"){const{name:r}=n;return function(a){const l=this[r];t.call(this,a),this.requestUpdate(r,l,e,!0,a)}}throw Error("Unsupported decorator location: "+i)};function Ut(e){return(t,n)=>typeof n=="object"?Np(e,t,n):((i,s,o)=>{const r=s.hasOwnProperty(o);return s.constructor.createProperty(o,i),r?Object.getOwnPropertyDescriptor(s,o):void 0})(e,t,n)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function x(e){return Ut({...e,state:!0,attribute:!1})}const Bp="modulepreload",zp=function(e,t){return new URL(e,t).href},Ql={},Hp=function(t,n,i){let s=Promise.resolve();if(n&&n.length>0){let r=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};const a=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),c=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));s=r(n.map(d=>{if(d=zp(d,i),d in Ql)return;Ql[d]=!0;const u=d.endsWith(".css"),h=u?'[rel="stylesheet"]':"";if(!!i)for(let y=a.length-1;y>=0;y--){const _=a[y];if(_.href===d&&(!u||_.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${h}`))return;const m=document.createElement("link");if(m.rel=u?"stylesheet":Bp,u||(m.as="script"),m.crossOrigin="",m.href=d,c&&m.setAttribute("nonce",c),document.head.appendChild(m),u)return new Promise((y,_)=>{m.addEventListener("load",y),m.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${d}`)))})}))}function o(r){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=r,window.dispatchEvent(a),!a.defaultPrevented)throw r}return s.then(r=>{for(const a of r||[])a.status==="rejected"&&o(a.reason);return t().catch(o)})},Up={common:{health:"Health",ok:"OK",offline:"Offline",connect:"Connect",refresh:"Refresh",retry:"Retry",cancel:"Cancel",close:"Close",yes:"Yes",no:"No",prev:"Prev",next:"Next",errorTitle:"Request failed",enabled:"Enabled",disabled:"Disabled",na:"n/a",docs:"Docs",resources:"Resources",loading:"Loading…",save:"Save",edit:"Edit"},nav:{chat:"Chat",control:"Control",agent:"Agent",settings:"Settings",expand:"Expand sidebar",collapse:"Collapse sidebar"},tabs:{agents:"Agents",overview:"Overview",channels:"Business Knowledge",instances:"Out of Stock",sessions:"Procurement",work:"Quotation",cron:"Order Fulfill",skills:"Skills",reports:"Reports",nodes:"Nodes",chat:"Chat",config:"Config",debug:"Debug",logs:"Logs","admin-data":"Data"},subtitles:{agents:"Manage agent workspaces, tools, and identities.",overview:"Gateway status, entry points, and a fast health read.",channels:"Edit wanding_business_knowledge.md for selection and matching.",instances:"OOS dashboard: stats and product list without asking the agent.",sessions:"Procurement suggestions from shortage; approve to save and notify buyer.",work:"Batch quotation: upload files, identify, match price and stock, fill and save.",cron:"Pending quotation drafts; confirm to create order and lock stock.",skills:"Manage skill availability and API key injection.",reports:"Weekly sales invoice reports. Click a record to view full content.",nodes:"Paired devices, capabilities, and command exposure.",chat:"Direct gateway chat session for quick interventions.",config:"Edit ~/.openclaw/openclaw.json safely.",debug:"Gateway snapshots, events, and manual RPC calls.",logs:"Live tail of the gateway file logs.","admin-data":"Wanding price library and product mapping (admin password)."},overview:{health:{title:"Health & stats",subtitle:"High-level view of instances, sessions, and cron.",lastErrorLabel:"Last error",noError:"No recent errors."},access:{title:"Gateway Access",subtitle:"Where the dashboard connects and how it authenticates.",wsUrl:"WebSocket URL",token:"Gateway Token",password:"Password (not stored)",sessionKey:"Default Session Key",language:"Language",connectHint:"Click Connect to apply connection changes.",trustedProxy:"Authenticated via trusted proxy."},snapshot:{title:"Snapshot",subtitle:"Latest gateway handshake information.",status:"Status",uptime:"Uptime",tickInterval:"Tick Interval",lastChannelsRefresh:"Last Channels Refresh",channelsHint:"Use Channels to link WhatsApp, Telegram, Discord, Signal, or iMessage."},stats:{instances:"Instances",instancesHint:"Presence beacons in the last 5 minutes.",sessions:"Sessions",sessionsHint:"Recent session keys tracked by the gateway.",cron:"Cron",cronNext:"Next wake {time}"},notes:{title:"Notes",subtitle:"Quick reminders for remote control setups.",tailscaleTitle:"Tailscale serve",tailscaleText:"Prefer serve mode to keep the gateway on loopback with tailnet auth.",sessionTitle:"Session hygiene",sessionText:"Use /new or sessions.patch to reset context.",cronTitle:"Cron reminders",cronText:"Use isolated sessions for recurring runs."},auth:{required:"This gateway requires auth. Add a token or password, then click Connect.",failed:"Auth failed. Re-copy a tokenized URL with {command}, or update the token, then click Connect."},insecure:{hint:"This page is HTTP, so the browser blocks device identity. Use HTTPS (Tailscale Serve) or open {url} on the gateway host.",stayHttp:"If you must stay on HTTP, set {config} (token-only)."},oos:{title:"Out-of-stock overview",subtitle:"Recent out-of-stock stats; see Instances tab for full details.",stats:{totalRecords:"Total records",outOfStockCount:"Out-of-stock items",today:"Added today",reportedGe2:"Reported out-of-stock ≥2 times"},empty:"No stats yet; check back later on the Instances tab."},shortage:{title:"Shortage overview",subtitle:"Shortage stats after Work matching; focus on critical items.",stats:{totalRecords:"Total records",shortageProductCount:"Shortage items",today:"Added today",reportedGe2:"Reported shortage ≥2 times"},empty:"No stats yet; check back later on the Instances tab."},dashboard:{kpi:{oosProducts:"Out-of-stock products",shortageProducts:"Shortage products",pendingQuotations:"Pending quotations",todayNewQuotations:"New quotations today",shortageQuotations:"Shortage quotations",replenishmentDrafts:"Replenishment drafts"},chart:{quotationTrend:"Quotation trend (last 7 days)",stockTrend:"Out-of-stock / shortage trend (last 7 days)",quotationSeries:"Quotations",oosSeries:"Out-of-stock",shortageSeries:"Shortage",loading:"Loading...",empty:"No data"},error:"Dashboard data load failed: {error}"}},chat:{disconnected:"Disconnected from gateway.",refreshTitle:"Refresh chat data",thinkingToggle:"Toggle assistant thinking/working output",focusToggle:"Toggle focus mode (hide sidebar + page header)",onboardingDisabled:"Disabled during onboarding",ui:{compaction:{active:"Compacting context…",done:"Context compacted",divider:"Compaction"},attachments:{previewAlt:"Attachment preview",remove:"Remove attachment"},upload:{label:"Upload Excel or PDF",button:"Upload Excel/PDF",remove:"Remove uploaded file"},queue:{title:"Queued ({count})",imageItem:"Image ({count})",remove:"Remove queued message"},candidatesPreview:{query:"Searching: {keywords}",colCode:"Code",colName:"Product",colPrice:"Unit price",more:"…and {n} more",selecting:"AI is choosing the best match from {n} candidate(s)…"},compose:{placeholder:{withImages:"Add a message or paste more images…",default:"Message (↩ to send, Shift+↩ for line breaks; paste images or upload/drag Excel/PDF)",disconnected:"Connect to the gateway to start chatting…"},newMessages:"New messages",dropHint:"Drop to upload Excel/PDF",label:"Message",stop:"Stop",newSession:"New session",send:"Send",queue:"Queue",exitFocus:"Exit focus mode"}}},work:{runHint:"Please select at least one file before running.",saveConfirm:"Confirm save quotation draft and persist to database?",saveSuccessHint:"Saved. You can confirm it on the Order Fulfill page.",stageExtract:"Extract sheet data",stageMatch:"Match price & inventory",stageFill:"Fill quotation",uploadTitle:"Quotation files (multiple)",removeFile:"Remove",noFiles:"No files uploaded (.xlsx/.xls/.xlsm).",customerLevel:"Customer level",registerOos:"Register out-of-stock items",currentStage:"Current stage",running:"Running",run:"Run",cancel:"Cancel",statusLabel:"Status",awaitingTitle:"Need your choices",awaitingHint:"Select one option for each ambiguous item, then continue.",qty:"Qty",choiceSelect:"Candidate selection",choiceOos:"Mark as out of stock",resuming:"Resuming",resume:"Confirm and continue",savedDraftNo:"Quotation draft saved: {no}",pendingDraftTitle:"Pending quotation draft",pendingDraftHint:"Review and edit before saving to database.",saving:"Saving...",saveDraft:"Confirm and save",resultTitle:"Execution result",download:"Download {name}",trace:"Trace ({count})",traceTimelineTitle:"Execution steps",traceRawDebug:"Raw trace (debug)",traceStep:"Step {n}",traceTypeToolCall:"Call",traceTypeObservation:"Result",traceTypeMetrics:"Timing",traceToolExtract:"Extract quotation rows",traceToolMatch:"Match price & stock",traceToolFill:"Fill Excel",traceToolShortageReport:"Shortage report",traceToolFallback:"{name}",traceParseError:"Could not parse as JSON; raw content:",traceFieldSuccess:"Success",traceFieldRows:"Rows",traceFieldFilled:"Filled rows",traceFieldOutput:"Output file",traceFieldSummary:"Summary",traceFieldError:"Error",lineProduct:"Requested item name",lineSpec:"Requested spec",lineQty:"Qty",lineCode:"Product number",lineQuoteName:"Quoted item name",lineQuoteSpec:"Quoted spec",linePrice:"Unit price",lineAmount:"Total",lineAvailable:"Available",lineShortfall:"Shortfall",lineIsShortage:"Shortage",textInputTitle:"Text input (quotation)",textInputHint:"Enter product list (multi-line or semicolon/comma separated); generated file will run with uploaded files.",textInputPlaceholder:"e.g. Cable 3*2.5 100m; Switch 20 pcs",generateFromText:"Generate from text",textGenerating:"Generating…",priceLevels:{FACTORY_INC_TAX:"Factory price (incl. tax)",FACTORY_EXC_TAX:"Factory price (excl. tax)",PURCHASE_EXC_TAX:"Purchase price (excl. tax)",A_MARGIN:"Tier A (2nd-level agent) · margin",A_QUOTE:"Tier A (2nd-level agent) · quotation price",B_MARGIN:"Tier B (1st-level agent) · margin",B_QUOTE:"Tier B (1st-level agent) · quotation price",C_MARGIN:"Tier C (Juwan key account) · margin",C_QUOTE:"Tier C (Juwan key account) · quotation price",D_MARGIN:"Tier D (Qingshan key account) · margin",D_QUOTE:"Tier D (Qingshan key account) · quotation price",D_LOW:"Tier D (Qingshan key account) · reduced margin",E_MARGIN:"Tier E (Datang key account, freight included) · margin",E_QUOTE:"Tier E (Datang key account, freight included) · quotation price"},fileDisplayName:"Quotation file display name",status:{idle:"Idle",running:"Running",awaitingChoices:"Awaiting choices",resuming:"Resuming",done:"Done",error:"Error"},fallbackDraftName:"Untitled quotation"},fulfill:{title:"Pending quotation drafts",subtitle:"Load persisted drafts and confirm to create formal orders.",loading:"Loading...",refreshList:"Refresh list",filterPlaceholder:"Search by draft no/name/source",sortBy:"Sort by",sortDir:"Order",sortCreatedAt:"Created time",sortDraftNo:"Draft no",sortName:"Name",sortDesc:"Newest first",sortAsc:"Oldest first",pageSize:"Page size",total:"Total: {total}",page:"Page {current}/{total}",listTitle:"List",listSubtitle:"View detail first, then confirm order.",colDraftNo:"Draft No",colName:"Name",colSource:"Source",colCreatedAt:"Created At",colActions:"Actions",viewDetail:"View",confirmAction:"Confirm order",confirming:"Confirming...",detailTitle:"Draft detail · {draftNo}",closeDetail:"Close detail",lineProduct:"Product",lineSpec:"Spec",lineQty:"Qty",lineCode:"Code",lineQuoteName:"Quote name",lineQuoteSpec:"Quoted spec",linePrice:"Unit price",lineAmount:"Amount",lineAvailable:"Available",lineShortfall:"Shortfall",lineIsShortage:"Shortage",noDrafts:"No pending quotation drafts.",confirmTitle:"Order confirmed",confirmPrompt:"Confirm order? {count} line(s), total amount {amount}.",confirmPromptSimple:"Confirm to convert this quotation into a formal order?",orderId:"Order ID"},procurement:{title:"Procurement suggestions",subtitle:"Generated from shortage records; approve to persist and notify buyers.",loading:"Loading...",refreshList:"Refresh list",batchApprove:"Batch approve",approving:"Approving...",approveSingle:"Approve",approveConfirm:"Confirm approval and notify buyer?",approveBatchConfirm:"Confirm approval of {count} item(s) and notify buyer?",noSuggestions:"No shortage products; no procurement suggestions.",noPending:"No pending items (approved items are hidden).",listHint:"Select multiple to batch approve; click Approve to save and notify buyer.",filterPlaceholder:"Search by product/spec/code/key",sortBy:"Sort by",sortDir:"Order",sortUploadedAt:"Reported time",sortShortfall:"Shortfall",sortCount:"Report count",sortProduct:"Product name",sortDesc:"High to low / newest",sortAsc:"Low to high / oldest",pageSize:"Page size",total:"Total: {total}",page:"Page {current}/{total}",listTitle:"Shortage item list",selectAll:"Select all filtered items",selectItem:"Select item",colProduct:"Product",colSpec:"Spec",colShortfall:"Shortfall",colCode:"Code",colCount:"Count",colActions:"Actions",approvedCount:"Approved {count} item(s)."},replenishment:{title:"Replenishment",subtitle:"Enter product name or code and quantity to generate a draft; view and confirm in the list below to run inventory supplement.",productOrCodePlaceholder:"Product name or code",quantityPlaceholder:"Quantity",generateDraft:"Generate replenishment draft",creating:"Creating…",addRow:"Add row",removeRow:"Remove",refreshList:"Refresh list",loading:"Loading…",listTitle:"Replenishment drafts",listHint:"Drafts are created via LLM and inventory tools; confirm to run inventory changes.",noDrafts:"No replenishment drafts.",colDraftNo:"Draft No",colName:"Name",colCreatedAt:"Created",colStatus:"Status",colActions:"Actions",viewDetail:"View",confirm:"Confirm replenishment",confirming:"Executing…",confirmPrompt:"Confirm and run all inventory changes for this draft?",delete:"Delete",deleteConfirm:"Delete this replenishment draft? This cannot be undone.",detailTitle:"Draft detail ({no})",detailSubtitle:"Products, current stock and replenishment quantities.",colCode:"Code",colProduct:"Product",colSpec:"Spec",colCurrentQty:"Current qty",colQuantity:"Quantity"},oos:{title:"Out-of-stock dashboard",subtitle:"Overview and list of out-of-stock products, without asking the agent.",actions:{loading:"Loading…",refresh:"Refresh",addManual:"Add manually",confirm:"Confirm",delete:"Delete",deleteHint:"Delete this out-of-stock item"},db:{local:"Using local database"},stats:{totalRecords:"Total records",outOfStockCount:"Out-of-stock items",today:"New today",reportedGe2:"Reported out-of-stock ≥2 times",emailSentProductCount:"Products with email sent"},empty:{stats:"No stats yet.",list:"No out-of-stock records."},list:{title:"Out-of-stock product list",more:"Total {count} out-of-stock products; showing first 50 only",meta:"Qty: {qty} {unit} · Reported out-of-stock {count} time(s) · Email: {email}"},addForm:{title:"Add out-of-stock record",namePlaceholder:"Product name (required)",specPlaceholder:"Specification",qtyPlaceholder:"Quantity",unitPlaceholder:"Unit"},email:{sent:"Sent",notSent:"Not sent"},byFile:{title:"By file",empty:"None",count:"Records: {count}"},byTime:{title:"By time (last 30 days)",empty:"None",count:"New: {count}"}},shortage:{title:"Shortage records",subtitle:"Saved when Work detects insufficient stock; overview and list of shortage items.",actions:{loading:"Loading…",refresh:"Refresh",addManual:"Add manually",confirm:"Confirm",delete:"Delete",deleteHint:"Delete this shortage item"},db:{local:"Using local database"},stats:{totalRecords:"Total records",shortageProductCount:"Shortage products",today:"New today",reportedGe2:"Reported shortage ≥2 times"},empty:{stats:"No stats yet.",list:"No shortage records."},list:{title:"Shortage product list",more:"Total {count} shortage products; showing first 50 only",meta:"Required: {qty} · Available: {avail} · Shortfall: {diff} · Reported shortage {count} time(s)"},addForm:{title:"Add shortage record (product name, spec, required, available; shortfall will be auto-calculated)",namePlaceholder:"Product name (required)",specPlaceholder:"Specification",qtyPlaceholder:"Required",availPlaceholder:"Available",qtyTitle:"Required quantity",availTitle:"Available quantity",diffTitle:"Shortfall = required − available; auto-calculated on submit",diffText:"Shortfall: auto-calculated"},byFile:{title:"By file",empty:"None",count:"Records: {count}"},byTime:{title:"By time (last 30 days)",empty:"None",count:"New: {count}"}},businessKnowledge:{title:"Business knowledge",subtitle:"Edit wanding_business_knowledge.md for selection and matching. The LLM will use the latest content after saving.",lastSavedAt:"Saved at {time}",actions:{reloading:"Loading…",reload:"Reload",saving:"Saving…",save:"Save"},relatedFiles:{title:"Related data files",hint:"Selection and historical quotations rely on these Excel files. Copy the path to open them in Explorer or Excel when updating.",mappingTableLabel:"Inquiry mapping table (historical quotations):",priceLibraryLabel:"Wanding price library:",copyPath:"Copy path"},editor:{placeholder:`[Business knowledge]
1. …`}},agents:{reports:{whereHint:"Weekly reports live here: open Agents, pick an agent, then the Skills sub-tab (not the sidebar Skills catalog).",title:"Weekly reports",subtitle:"Scheduled tasks and recent runs for this agent.",tokenLabel:"Reports admin token",tasks:"Tasks",noTasks:"No report tasks configured.",enabled:"Enabled",cron:"Cron",timezone:"Timezone",run:"Run now",latestRecords:"Latest runs",noRecords:"No run history yet.",detailLoading:"Loading report...",detailEmpty:"Select a record on the left to view the report.",detailNoMd:"No report text is stored yet for this record.",copyBtn:"Copy",copiedBtn:"Copied!",reformatBtn:"Regenerate text",tabData:"Data Report",tabAnalysis:"AI Analysis",analysisLoading:"Generating analysis…",analysisPending:"Pending analysis, please wait…",analysisEmpty:"No analysis content yet.",analysisFailed:"Analysis generation failed.",reanalyzeBtn:"Re-analyze",metricTotal:"Total Invoice Amount",metricCount:"Invoice Count",tableDaily:"Daily Trend",tableCustomers:"Top 10 Customers",tableStatus:"Status Summary",colDate:"Date",colCount:"Count",colAmount:"Amount",colCustomer:"Customer",colStatus:"Status",colRank:"Rank"}},languages:{en:"English",zhCN:"简体中文 (Simplified Chinese)",zhTW:"繁體中文 (Traditional Chinese)",ptBR:"Português (Brazilian Portuguese)"}},qp=["en","zh-CN"];function $a(e){return e!=null&&qp.includes(e)}class jp{constructor(){this.locale="en",this.translations={en:Up},this.subscribers=new Set,this.loadLocale()}loadLocale(){const t=localStorage.getItem("openclaw.i18n.locale");let n;$a(t)?n=t:n=(navigator.language||"").startsWith("zh")?"zh-CN":"en",n==="en"?this.locale="en":this.setLocale(n)}getLocale(){return this.locale}async setLocale(t){if(this.locale!==t){if(!this.translations[t])try{let n;if(t==="zh-CN")n=await Hp(()=>import("./zh-CN-W9SVouFV.js"),[],import.meta.url);else return;this.translations[t]=n[t.replace("-","_")]}catch(n){console.error(`Failed to load locale: ${t}`,n);return}this.locale=t,localStorage.setItem("openclaw.i18n.locale",t),this.notify()}}registerTranslation(t,n){this.translations[t]=n}subscribe(t){return this.subscribers.add(t),()=>this.subscribers.delete(t)}notify(){this.subscribers.forEach(t=>t(this.locale))}t(t,n){const i=t.split(".");let s=this.translations[this.locale]||this.translations.en;for(const o of i)if(s&&typeof s=="object")s=s[o];else{s=void 0;break}if(s===void 0&&this.locale!=="en"){s=this.translations.en;for(const o of i)if(s&&typeof s=="object")s=s[o];else{s=void 0;break}}return typeof s!="string"?t:n?s.replace(/\{(\w+)\}/g,(o,r)=>n[r]||`{${r}}`):s}}const gn=new jp,p=(e,t)=>gn.t(e,t);class Kp{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){this.unsubscribe=gn.subscribe(()=>{this.host.requestUpdate()})}hostDisconnected(){var t;(t=this.unsubscribe)==null||t.call(this)}}async function St(e,t){if(!(!e.client||!e.connected)&&!e.channelsLoading){e.channelsLoading=!0,e.channelsError=null;try{const n=await e.client.request("channels.status",{probe:t,timeoutMs:8e3});e.channelsSnapshot=n,e.channelsLastSuccess=Date.now()}catch(n){e.channelsError=String(n)}finally{e.channelsLoading=!1}}}async function Wp(e,t){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const n=await e.client.request("web.login.start",{force:t,timeoutMs:3e4});e.whatsappLoginMessage=n.message??null,e.whatsappLoginQrDataUrl=n.qrDataUrl??null,e.whatsappLoginConnected=null}catch(n){e.whatsappLoginMessage=String(n),e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function Vp(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const t=await e.client.request("web.login.wait",{timeoutMs:12e4});e.whatsappLoginMessage=t.message??null,e.whatsappLoginConnected=t.connected??null,t.connected&&(e.whatsappLoginQrDataUrl=null)}catch(t){e.whatsappLoginMessage=String(t),e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function Gp(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{await e.client.request("channels.logout",{channel:"whatsapp"}),e.whatsappLoginMessage="Logged out.",e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}catch(t){e.whatsappLoginMessage=String(t)}finally{e.whatsappBusy=!1}}}function Ke(e){if(e)return Array.isArray(e.type)?e.type.filter(n=>n!=="null")[0]??e.type[0]:e.type}function Du(e){if(!e)return"";if(e.default!==void 0)return e.default;switch(Ke(e)){case"object":return{};case"array":return[];case"boolean":return!1;case"number":case"integer":return 0;case"string":return"";default:return""}}function Sa(e){return e.filter(t=>typeof t=="string").join(".")}function We(e,t){const n=Sa(e),i=t[n];if(i)return i;const s=n.split(".");for(const[o,r]of Object.entries(t)){if(!o.includes("*"))continue;const a=o.split(".");if(a.length!==s.length)continue;let l=!0;for(let c=0;c<s.length;c+=1)if(a[c]!=="*"&&a[c]!==s[c]){l=!1;break}if(l)return r}}function At(e){return e.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/\s+/g," ").replace(/^./,t=>t.toUpperCase())}function Yl(e,t){const n=e.trim();if(n==="")return;const i=Number(n);return!Number.isFinite(i)||t&&!Number.isInteger(i)?e:i}function Xl(e){const t=e.trim();return t==="true"?!0:t==="false"?!1:e}function Ct(e,t){if(e==null)return e;if(t.allOf&&t.allOf.length>0){let i=e;for(const s of t.allOf)i=Ct(i,s);return i}const n=Ke(t);if(t.anyOf||t.oneOf){const i=(t.anyOf??t.oneOf??[]).filter(s=>!(s.type==="null"||Array.isArray(s.type)&&s.type.includes("null")));if(i.length===1)return Ct(e,i[0]);if(typeof e=="string")for(const s of i){const o=Ke(s);if(o==="number"||o==="integer"){const r=Yl(e,o==="integer");if(r===void 0||typeof r=="number")return r}if(o==="boolean"){const r=Xl(e);if(typeof r=="boolean")return r}}for(const s of i){const o=Ke(s);if(o==="object"&&typeof e=="object"&&!Array.isArray(e)||o==="array"&&Array.isArray(e))return Ct(e,s)}return e}if(n==="number"||n==="integer"){if(typeof e=="string"){const i=Yl(e,n==="integer");if(i===void 0||typeof i=="number")return i}return e}if(n==="boolean"){if(typeof e=="string"){const i=Xl(e);if(typeof i=="boolean")return i}return e}if(n==="object"){if(typeof e!="object"||Array.isArray(e))return e;const i=e,s=t.properties??{},o=t.additionalProperties&&typeof t.additionalProperties=="object"?t.additionalProperties:null,r={};for(const[a,l]of Object.entries(i)){const c=s[a]??o,d=c?Ct(l,c):l;d!==void 0&&(r[a]=d)}return r}if(n==="array"){if(!Array.isArray(e))return e;if(Array.isArray(t.items)){const s=t.items;return e.map((o,r)=>{const a=r<s.length?s[r]:void 0;return a?Ct(o,a):o})}const i=t.items;return i?e.map(s=>Ct(s,i)).filter(s=>s!==void 0):e}return e}function mn(e){return typeof structuredClone=="function"?structuredClone(e):JSON.parse(JSON.stringify(e))}function Ni(e){return`${JSON.stringify(e,null,2).trimEnd()}
`}function Lu(e,t,n){if(t.length===0)return;let i=e;for(let o=0;o<t.length-1;o+=1){const r=t[o],a=t[o+1];if(typeof r=="number"){if(!Array.isArray(i))return;i[r]==null&&(i[r]=typeof a=="number"?[]:{}),i=i[r]}else{if(typeof i!="object"||i==null)return;const l=i;l[r]==null&&(l[r]=typeof a=="number"?[]:{}),i=l[r]}}const s=t[t.length-1];if(typeof s=="number"){Array.isArray(i)&&(i[s]=n);return}typeof i=="object"&&i!=null&&(i[s]=n)}function Iu(e,t){if(t.length===0)return;let n=e;for(let s=0;s<t.length-1;s+=1){const o=t[s];if(typeof o=="number"){if(!Array.isArray(n))return;n=n[o]}else{if(typeof n!="object"||n==null)return;n=n[o]}if(n==null)return}const i=t[t.length-1];if(typeof i=="number"){Array.isArray(n)&&n.splice(i,1);return}typeof n=="object"&&n!=null&&delete n[i]}async function $t(e){if(!(!e.client||!e.connected)){e.configLoading=!0,e.lastError=null;try{const t=await e.client.request("config.get",{});Xp(e,t)}catch(t){e.lastError=String(t)}finally{e.configLoading=!1}}}async function Qp(e){if(!(!e.client||!e.connected)&&!e.configSchemaLoading){e.configSchemaLoading=!0;try{const t=await e.client.request("config.schema",{});Yp(e,t)}catch(t){e.lastError=String(t)}finally{e.configSchemaLoading=!1}}}function Yp(e,t){e.configSchema=t.schema??null,e.configUiHints=t.uiHints??{},e.configSchemaVersion=t.version??null}function Xp(e,t){e.configSnapshot=t;const n=typeof t.raw=="string"?t.raw:t.config&&typeof t.config=="object"?Ni(t.config):e.configRaw;!e.configFormDirty||e.configFormMode==="raw"?e.configRaw=n:e.configForm?e.configRaw=Ni(e.configForm):e.configRaw=n,e.configValid=typeof t.valid=="boolean"?t.valid:null,e.configIssues=Array.isArray(t.issues)?t.issues:[],e.configFormDirty||(e.configForm=mn(t.config??{}),e.configFormOriginal=mn(t.config??{}),e.configRawOriginal=n)}function Jp(e){return!e||typeof e!="object"||Array.isArray(e)?null:e}function Ou(e){if(e.configFormMode!=="form"||!e.configForm)return e.configRaw;const t=Jp(e.configSchema),n=t?Ct(e.configForm,t):e.configForm;return Ni(n)}async function Lr(e){var t;if(!(!e.client||!e.connected)){e.configSaving=!0,e.lastError=null;try{const n=Ou(e),i=(t=e.configSnapshot)==null?void 0:t.hash;if(!i){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.set",{raw:n,baseHash:i}),e.configFormDirty=!1,await $t(e)}catch(n){e.lastError=String(n)}finally{e.configSaving=!1}}}async function Zp(e){var t;if(!(!e.client||!e.connected)){e.configApplying=!0,e.lastError=null;try{const n=Ou(e),i=(t=e.configSnapshot)==null?void 0:t.hash;if(!i){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.apply",{raw:n,baseHash:i,sessionKey:e.applySessionKey}),e.configFormDirty=!1,await $t(e)}catch(n){e.lastError=String(n)}finally{e.configApplying=!1}}}async function eg(e){if(!(!e.client||!e.connected)){e.updateRunning=!0,e.lastError=null;try{await e.client.request("update.run",{sessionKey:e.applySessionKey})}catch(t){e.lastError=String(t)}finally{e.updateRunning=!1}}}function Xo(e,t,n){var s;const i=mn(e.configForm??((s=e.configSnapshot)==null?void 0:s.config)??{});Lu(i,t,n),e.configForm=i,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=Ni(i))}function Jl(e,t){var i;const n=mn(e.configForm??((i=e.configSnapshot)==null?void 0:i.config)??{});Iu(n,t),e.configForm=n,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=Ni(n))}function tg(e){const t={name:(e==null?void 0:e.name)??"",displayName:(e==null?void 0:e.displayName)??"",about:(e==null?void 0:e.about)??"",picture:(e==null?void 0:e.picture)??"",banner:(e==null?void 0:e.banner)??"",website:(e==null?void 0:e.website)??"",nip05:(e==null?void 0:e.nip05)??"",lud16:(e==null?void 0:e.lud16)??""};return{values:t,original:{...t},saving:!1,importing:!1,error:null,success:null,fieldErrors:{},showAdvanced:!!(e!=null&&e.banner||e!=null&&e.website||e!=null&&e.nip05||e!=null&&e.lud16)}}async function ng(e,t){await Wp(e,t),await St(e,!0)}async function ig(e){await Vp(e),await St(e,!0)}async function sg(e){await Gp(e),await St(e,!0)}async function og(e){await Lr(e),await $t(e),await St(e,!0)}async function rg(e){await $t(e),await St(e,!0)}function ag(e){if(!Array.isArray(e))return{};const t={};for(const n of e){if(typeof n!="string")continue;const[i,...s]=n.split(":");if(!i||s.length===0)continue;const o=i.trim(),r=s.join(":").trim();o&&r&&(t[o]=r)}return t}function Fu(e){var n,i,s;return((s=(((i=(n=e.channelsSnapshot)==null?void 0:n.channelAccounts)==null?void 0:i.nostr)??[])[0])==null?void 0:s.accountId)??e.nostrProfileAccountId??"default"}function Nu(e,t=""){return`/api/channels/nostr/${encodeURIComponent(e)}/profile${t}`}function lg(e){var s,o,r;const t=(r=(o=(s=e.hello)==null?void 0:s.auth)==null?void 0:o.deviceToken)==null?void 0:r.trim();if(t)return`Bearer ${t}`;const n=e.settings.token.trim();if(n)return`Bearer ${n}`;const i=e.password.trim();return i?`Bearer ${i}`:null}function Bu(e){const t=lg(e);return t?{Authorization:t}:{}}function cg(e,t,n){e.nostrProfileAccountId=t,e.nostrProfileFormState=tg(n??void 0)}function dg(e){e.nostrProfileFormState=null,e.nostrProfileAccountId=null}function ug(e,t,n){const i=e.nostrProfileFormState;i&&(e.nostrProfileFormState={...i,values:{...i.values,[t]:n},fieldErrors:{...i.fieldErrors,[t]:""}})}function hg(e){const t=e.nostrProfileFormState;t&&(e.nostrProfileFormState={...t,showAdvanced:!t.showAdvanced})}async function fg(e){const t=e.nostrProfileFormState;if(!t||t.saving)return;const n=Fu(e);e.nostrProfileFormState={...t,saving:!0,error:null,success:null,fieldErrors:{}};try{const i=await fetch(Nu(n),{method:"PUT",headers:{"Content-Type":"application/json",...Bu(e)},body:JSON.stringify(t.values)}),s=await i.json().catch(()=>null);if(!i.ok||(s==null?void 0:s.ok)===!1||!s){const o=(s==null?void 0:s.error)??`Profile update failed (${i.status})`;e.nostrProfileFormState={...t,saving:!1,error:o,success:null,fieldErrors:ag(s==null?void 0:s.details)};return}if(!s.persisted){e.nostrProfileFormState={...t,saving:!1,error:"Profile publish failed on all relays.",success:null};return}e.nostrProfileFormState={...t,saving:!1,error:null,success:"Profile published to relays.",fieldErrors:{},original:{...t.values}},await St(e,!0)}catch(i){e.nostrProfileFormState={...t,saving:!1,error:`Profile update failed: ${String(i)}`,success:null}}}async function pg(e){const t=e.nostrProfileFormState;if(!t||t.importing)return;const n=Fu(e);e.nostrProfileFormState={...t,importing:!0,error:null,success:null};try{const i=await fetch(Nu(n,"/import"),{method:"POST",headers:{"Content-Type":"application/json",...Bu(e)},body:JSON.stringify({autoMerge:!0})}),s=await i.json().catch(()=>null);if(!i.ok||(s==null?void 0:s.ok)===!1||!s){const l=(s==null?void 0:s.error)??`Profile import failed (${i.status})`;e.nostrProfileFormState={...t,importing:!1,error:l,success:null};return}const o=s.merged??s.imported??null,r=o?{...t.values,...o}:t.values,a=!!(r.banner||r.website||r.nip05||r.lud16);e.nostrProfileFormState={...t,importing:!1,values:r,error:null,success:s.saved?"Profile imported from relays. Review and publish.":"Profile imported. Review and publish.",showAdvanced:a},s.saved&&await St(e,!0)}catch(i){e.nostrProfileFormState={...t,importing:!1,error:`Profile import failed: ${String(i)}`,success:null}}}function zu(e){var o;const t=(e??"").trim();if(!t)return null;const n=t.split(":").filter(Boolean);if(n.length<3||n[0]!=="agent")return null;const i=(o=n[1])==null?void 0:o.trim(),s=n.slice(2).join(":");return!i||!s?null:{agentId:i,rest:s}}const Ir=450;function Vi(e,t=!1,n=!1){e.chatScrollFrame&&cancelAnimationFrame(e.chatScrollFrame),e.chatScrollTimeout!=null&&(clearTimeout(e.chatScrollTimeout),e.chatScrollTimeout=null);const i=()=>{const s=e.querySelector(".chat-thread");if(s){const o=getComputedStyle(s).overflowY;if(o==="auto"||o==="scroll"||s.scrollHeight-s.clientHeight>1)return s}return document.scrollingElement??document.documentElement};e.updateComplete.then(()=>{e.chatScrollFrame=requestAnimationFrame(()=>{e.chatScrollFrame=null;const s=i();if(!s)return;const o=s.scrollHeight-s.scrollTop-s.clientHeight,r=t&&!e.chatHasAutoScrolled;if(!(r||e.chatUserNearBottom||o<Ir)){e.chatNewMessagesBelow=!0;return}r&&(e.chatHasAutoScrolled=!0);const l=n&&(typeof window>"u"||typeof window.matchMedia!="function"||!window.matchMedia("(prefers-reduced-motion: reduce)").matches),c=s.scrollHeight;typeof s.scrollTo=="function"?s.scrollTo({top:c,behavior:l?"smooth":"auto"}):s.scrollTop=c,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1;const d=r?150:120;e.chatScrollTimeout=window.setTimeout(()=>{e.chatScrollTimeout=null;const u=i();if(!u)return;const h=u.scrollHeight-u.scrollTop-u.clientHeight;(r||e.chatUserNearBottom||h<Ir)&&(u.scrollTop=u.scrollHeight,e.chatUserNearBottom=!0)},d)})})}function Hu(e,t=!1){e.logsScrollFrame&&cancelAnimationFrame(e.logsScrollFrame),e.updateComplete.then(()=>{e.logsScrollFrame=requestAnimationFrame(()=>{e.logsScrollFrame=null;const n=e.querySelector(".log-stream");if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;(t||i<80)&&(n.scrollTop=n.scrollHeight)})})}function gg(e,t){const n=t.currentTarget;if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;e.chatUserNearBottom=i<Ir,e.chatUserNearBottom&&(e.chatNewMessagesBelow=!1)}function mg(e,t){const n=t.currentTarget;if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;e.logsAtBottom=i<80}function Zl(e){e.chatHasAutoScrolled=!1,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1}function yg(e,t){if(e.length===0)return;const n=new Blob([`${e.join(`
`)}
`],{type:"text/plain"}),i=URL.createObjectURL(n),s=document.createElement("a"),o=new Date().toISOString().slice(0,19).replace(/[:T]/g,"-");s.href=i,s.download=`openclaw-logs-${t}-${o}.log`,s.click(),URL.revokeObjectURL(i)}function vg(e){if(typeof ResizeObserver>"u")return;const t=e.querySelector(".topbar");if(!t)return;const n=()=>{const{height:i}=t.getBoundingClientRect();e.style.setProperty("--topbar-height",`${i}px`)};n(),e.topbarObserver=new ResizeObserver(()=>n()),e.topbarObserver.observe(t)}async function go(e){if(!(!e.client||!e.connected)&&!e.debugLoading){e.debugLoading=!0;try{const[t,n,i,s]=await Promise.all([e.client.request("status",{}),e.client.request("health",{}),e.client.request("models.list",{}),e.client.request("last-heartbeat",{})]);e.debugStatus=t,e.debugHealth=n;const o=i;e.debugModels=Array.isArray(o==null?void 0:o.models)?o==null?void 0:o.models:[],e.debugHeartbeat=s}catch(t){e.debugCallError=String(t)}finally{e.debugLoading=!1}}}async function bg(e){if(!(!e.client||!e.connected)){e.debugCallError=null,e.debugCallResult=null;try{const t=e.debugCallParams.trim()?JSON.parse(e.debugCallParams):{},n=await e.client.request(e.debugCallMethod.trim(),t);e.debugCallResult=JSON.stringify(n,null,2)}catch(t){e.debugCallError=String(t)}}}const wg=2e3,xg=new Set(["trace","debug","info","warn","error","fatal"]);function _g(e){if(typeof e!="string")return null;const t=e.trim();if(!t.startsWith("{")||!t.endsWith("}"))return null;try{const n=JSON.parse(t);return!n||typeof n!="object"?null:n}catch{return null}}function kg(e){if(typeof e!="string")return null;const t=e.toLowerCase();return xg.has(t)?t:null}function $g(e){if(!e.trim())return{raw:e,message:e};try{const t=JSON.parse(e),n=t&&typeof t._meta=="object"&&t._meta!==null?t._meta:null,i=typeof t.time=="string"?t.time:typeof(n==null?void 0:n.date)=="string"?n==null?void 0:n.date:null,s=kg((n==null?void 0:n.logLevelName)??(n==null?void 0:n.level)),o=typeof t[0]=="string"?t[0]:typeof(n==null?void 0:n.name)=="string"?n==null?void 0:n.name:null,r=_g(o);let a=null;r&&(typeof r.subsystem=="string"?a=r.subsystem:typeof r.module=="string"&&(a=r.module)),!a&&o&&o.length<120&&(a=o);let l=null;return typeof t[1]=="string"?l=t[1]:!r&&typeof t[0]=="string"?l=t[0]:typeof t.message=="string"&&(l=t.message),{raw:e,time:i,level:s,subsystem:a,message:l??e,meta:n??void 0}}catch{return{raw:e,message:e}}}async function Aa(e,t){if(!(!e.client||!e.connected)&&!(e.logsLoading&&!(t!=null&&t.quiet))){t!=null&&t.quiet||(e.logsLoading=!0),e.logsError=null;try{const i=await e.client.request("logs.tail",{cursor:t!=null&&t.reset?void 0:e.logsCursor??void 0,limit:e.logsLimit,maxBytes:e.logsMaxBytes}),o=(Array.isArray(i.lines)?i.lines.filter(a=>typeof a=="string"):[]).map($g),r=!!(t!=null&&t.reset||i.reset||e.logsCursor==null);e.logsEntries=r?o:[...e.logsEntries,...o].slice(-wg),typeof i.cursor=="number"&&(e.logsCursor=i.cursor),typeof i.file=="string"&&(e.logsFile=i.file),e.logsTruncated=!!i.truncated,e.logsLastFetchAt=Date.now()}catch(n){e.logsError=String(n)}finally{t!=null&&t.quiet||(e.logsLoading=!1)}}}async function mo(e,t){if(!(!e.client||!e.connected)&&!e.nodesLoading){e.nodesLoading=!0,t!=null&&t.quiet||(e.lastError=null);try{const n=await e.client.request("node.list",{});e.nodes=Array.isArray(n.nodes)?n.nodes:[]}catch(n){t!=null&&t.quiet||(e.lastError=String(n))}finally{e.nodesLoading=!1}}}function Sg(e){e.nodesPollInterval==null&&(e.nodesPollInterval=window.setInterval(()=>void mo(e,{quiet:!0}),5e3))}function Ag(e){e.nodesPollInterval!=null&&(clearInterval(e.nodesPollInterval),e.nodesPollInterval=null)}function Ta(e){e.logsPollInterval==null&&(e.logsPollInterval=window.setInterval(()=>{e.tab==="logs"&&Aa(e,{quiet:!0})},2e3))}function Ca(e){e.logsPollInterval!=null&&(clearInterval(e.logsPollInterval),e.logsPollInterval=null)}function Ea(e){e.debugPollInterval==null&&(e.debugPollInterval=window.setInterval(()=>{e.tab==="debug"&&go(e)},3e3))}function Ra(e){e.debugPollInterval!=null&&(clearInterval(e.debugPollInterval),e.debugPollInterval=null)}async function Uu(e,t){if(!(!e.client||!e.connected||e.agentIdentityLoading)&&!e.agentIdentityById[t]){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{const n=await e.client.request("agent.identity.get",{agentId:t});n&&(e.agentIdentityById={...e.agentIdentityById,[t]:n})}catch(n){e.agentIdentityError=String(n)}finally{e.agentIdentityLoading=!1}}}async function qu(e,t){if(!e.client||!e.connected||e.agentIdentityLoading)return;const n=t.filter(i=>!e.agentIdentityById[i]);if(n.length!==0){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{for(const i of n){const s=await e.client.request("agent.identity.get",{agentId:i});s&&(e.agentIdentityById={...e.agentIdentityById,[i]:s})}}catch(i){e.agentIdentityError=String(i)}finally{e.agentIdentityLoading=!1}}}async function Pa(e){var t;if(!(!e.client||!e.connected)&&!e.agentsLoading){e.agentsLoading=!0,e.agentsError=null;try{const n=await e.client.request("agents.list",{});if(n){e.agentsList=n;const i=e.agentsSelectedId,s=n.agents.some(o=>o.id===i);(!i||!s)&&(e.agentsSelectedId=n.defaultId??((t=n.agents[0])==null?void 0:t.id)??null)}}catch(n){e.agentsError=String(n)}finally{e.agentsLoading=!1}}}async function ju(e){if(!e.agentInfoLoading){e.agentInfoLoading=!0,e.agentInfoError=null;try{const t=await fetch("/api/agent/info");if(!t.ok)throw new Error(`HTTP ${t.status}`);e.agentInfo=await t.json()}catch(t){e.agentInfoError=String(t)}finally{e.agentInfoLoading=!1}}}function Ma(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}async function Tg(e){try{const n=await(await fetch(Ma(e.basePath,"/api/business-knowledge/dependent-files"))).json().catch(()=>({}));n.success&&n.data?e.bkDependentFiles={mapping_table:n.data.mapping_table??"",price_library:n.data.price_library??""}:e.bkDependentFiles=null}catch{e.bkDependentFiles=null}}async function Ku(e){e.bkLoading=!0,e.bkError=null,Tg(e);try{const t=await fetch(Ma(e.basePath,"/api/business-knowledge")),n=await t.json().catch(()=>({}));n.success&&n.data&&typeof n.data.content=="string"?e.bkContent=n.data.content:(e.bkContent="",t.ok||(e.bkError=n.detail??`HTTP ${t.status}`))}catch(t){e.bkError=t instanceof Error?t.message:String(t),e.bkContent=""}finally{e.bkLoading=!1}}async function Cg(e,t){e.bkSaving=!0,e.bkError=null;try{const n=await fetch(Ma(e.basePath,"/api/business-knowledge"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:t})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(e.bkContent=t,e.bkLastSuccess=Date.now(),!0):(e.bkError=i.detail??`HTTP ${n.status}`,!1)}catch(n){return e.bkError=n instanceof Error?n.message:String(n),!1}finally{e.bkSaving=!1}}function Eg(e){if(e==null||!Number.isFinite(e))return"n/a";const t=Math.floor(e/1e3),n=Math.floor(t/60),i=Math.floor(n/60);return i>0?`${i}h`:n>0?`${n}m`:t>0?`${t}s`:"<1s"}function Gi(e){if(e==null||!Number.isFinite(e))return"n/a";const t=Date.now(),n=e-t,i=Math.abs(n),s=Math.floor(i/6e4),o=Math.floor(s/60),r=Math.floor(o/24);return n>0?s<1?"in <1m":s<60?`in ${s}m`:o<24?`in ${o}h`:`in ${r}d`:i<15e3?"just now":s<60?`${s}m ago`:o<24?`${o}h ago`:`${r}d ago`}function Rg(e,t){return!e||typeof e!="string"?"":e.replace(/<think>[\s\S]*?<\/think>/gi,"").trim()}function Pg(e){return!e&&e!==0?"n/a":new Date(e).toLocaleString()}function Or(e){return!e||e.length===0?"none":e.filter(t=>!!(t&&t.trim())).join(", ")}function Fr(e,t=120){return e.length<=t?e:`${e.slice(0,Math.max(0,t-1))}…`}function Wu(e,t){return e.length<=t?{text:e,truncated:!1,total:e.length}:{text:e.slice(0,Math.max(0,t)),truncated:!0,total:e.length}}function ec(e,t){const n=Number(e);return Number.isFinite(n)?n:t}function Jo(e){return Rg(e)}async function Vu(e){if(!(!e.client||!e.connected))try{const t=await e.client.request("cron.status",{});e.cronStatus=t}catch(t){e.cronError=String(t)}}async function Mg(e){if(!(!e.client||!e.connected)&&!e.cronLoading){e.cronLoading=!0,e.cronError=null;try{const t=await e.client.request("cron.list",{includeDisabled:!0});e.cronJobs=Array.isArray(t.jobs)?t.jobs:[]}catch(t){e.cronError=String(t)}finally{e.cronLoading=!1}}}function Zo(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams;for(const[r,a]of Object.entries(n))o.set(r,String(a));return`${s}?${o.toString()}`}async function Dg(e){e.dashboardLoading=!0,e.dashboardError=null;try{const[t,n,i]=await Promise.allSettled([fetch(Zo(e.basePath,"/api/quotation-drafts/stats",{days:7})),fetch(Zo(e.basePath,"/api/oos/by-time",{days:7})),fetch(Zo(e.basePath,"/api/shortage/by-time",{days:7}))]),s=[];if(t.status==="fulfilled"){const o=await t.value.json().catch(()=>({}));o.success&&o.data?e.quotationStats=o.data:(e.quotationStats=null,s.push(o.detail??`quotation/stats: ${t.value.status}`))}else e.quotationStats=null,s.push(`quotation/stats: ${String(t.reason)}`);if(n.status==="fulfilled"){const o=await n.value.json().catch(()=>({}));e.dashboardOosByTime=o.success&&Array.isArray(o.data)?o.data:[],o.success||s.push(o.detail??`oos/by-time: ${n.value.status}`)}else e.dashboardOosByTime=[],s.push(`oos/by-time: ${String(n.reason)}`);if(i.status==="fulfilled"){const o=await i.value.json().catch(()=>({}));e.dashboardShortageByTime=o.success&&Array.isArray(o.data)?o.data:[],o.success||s.push(o.detail??`shortage/by-time: ${i.value.status}`)}else e.dashboardShortageByTime=[],s.push(`shortage/by-time: ${String(i.reason)}`);e.dashboardError=s.length>0?s.join(" | "):null}catch(t){e.dashboardError=t instanceof Error?t.message:String(t),e.quotationStats=null,e.dashboardOosByTime=[],e.dashboardShortageByTime=[]}finally{e.dashboardLoading=!1}}class me extends Error{constructor(t,n){super(`Invalid response schema from ${t}: ${n}`),this.name="ResponseSchemaError",this.endpoint=t}}function Gu(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function se(e,t,n="response"){if(!Gu(e))throw new me(t,`${n} must be an object`);return e}function qt(e,t,n){if(!Array.isArray(e))throw new me(t,`${n} must be an array`);return e}function It(e,t,n){if(typeof e!="string")throw new me(t,`${n} must be a string`);return e}function yo(e,t,n){if(typeof e!="number"||Number.isNaN(e))throw new me(t,`${n} must be a number`);return e}function K(e){return typeof e=="string"?e:void 0}function be(e){return typeof e=="number"&&Number.isFinite(e)?e:void 0}function Da(e){return typeof e=="boolean"?e:void 0}function Ee(e,t){return Gu(e)?typeof e.detail=="string"&&e.detail.trim()?e.detail.trim():typeof e.error=="string"&&e.error.trim()?e.error.trim():typeof e.message=="string"&&e.message.trim()?e.message.trim():t:t}function de(e,t,n,i){return`${e}失败：${t}。影响：${n}。下一步：${i}`}const us="/api/quotation-drafts",tc="/api/quotation-drafts/{id}",Lg="/api/quotation-drafts/{id}/confirm",nc=new WeakMap;function Ig(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams(n);return`${s}?${o.toString()}`}function Og(e,t){var s;const n=globalThis,i=typeof((s=n.crypto)==null?void 0:s.randomUUID)=="function"?n.crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2,10)}`;return`${e}:${t}:${i}`}function Fg(e){let t=nc.get(e);return t||(t=new Map,nc.set(e,t)),t}function Qu(e,t){const n=se(e,t,"data[]"),s=be(n.id)??Number(n.id);return{id:Number.isFinite(s)?s:0,draft_no:It(n.draft_no,t,"data[].draft_no"),name:It(n.name,t,"data[].name"),source:K(n.source),file_path:typeof n.file_path=="string"?n.file_path:null,created_at:K(n.created_at)??null,status:It(n.status,t,"data[].status"),confirmed_at:K(n.confirmed_at)??null}}function Ng(e,t){const n=se(e,t,"data"),i=Qu(n,t),o=qt(n.lines,t,"data.lines").map(r=>{const a=se(r,t,"data.lines[]"),l=be(a.warehouse_qty),c=be(a.available_qty);return{...a,warehouse_qty:l??c??null}});return{...i,lines:o}}function Bg(e,t){const n=se(e,t),i=n.data!=null?se(n.data,t,"data"):{},s=K(i.order_id)??K(n.order_id),o=K(i.message)??K(n.message)??"已确认成单";return{order_id:s,message:o}}async function La(e){e.fulfillDraftsLoading=!0,e.fulfillDraftsError=null;try{const t=Ig(e.basePath,us,{status:"pending",limit:"50"}),n=await fetch(t),i=await n.json().catch(()=>({}));if(!n.ok){e.fulfillDraftsError=de("加载待确认报价单列表",Ee(i,`HTTP ${n.status}`),"无法查看最新待确认报价单","点击“重试”重新加载列表"),e.fulfillDrafts=[];return}const s=se(i,us),o=qt(s.data,us,"data");e.fulfillDrafts=o.map(r=>Qu(r,us)).filter(r=>r.id>0)}catch(t){const n=t instanceof me||t instanceof Error?t.message:String(t);e.fulfillDraftsError=de("加载待确认报价单列表",n,"列表可能为空或字段错位","检查后端返回字段后重试"),e.fulfillDrafts=[]}finally{e.fulfillDraftsLoading=!1}}async function zg(e,t){var n;e.fulfillDetailId=t;try{const i=(n=e.basePath)!=null&&n.trim()?`${e.basePath.replace(/\/$/,"")}/api/quotation-drafts/${t}`:`/api/quotation-drafts/${t}`,s=await fetch(i),o=await s.json().catch(()=>({}));if(!s.ok){e.fulfillDetail=null,e.fulfillConfirmResult={message:de("加载报价单详情",Ee(o,`HTTP ${s.status}`),"无法确认该报价单","点击“重试”或返回列表后重选")};return}const r=se(o,tc);e.fulfillDetail=Ng(r.data,tc)}catch(i){const s=i instanceof me||i instanceof Error?i.message:String(i);e.fulfillDetail=null,e.fulfillConfirmResult={message:de("加载报价单详情",s,"无法确认该报价单","点击“重试”或返回列表后重选")}}}async function Hg(e,t){const n=Fg(e),i=n.get(t);if(i)return i;const s=(async()=>{var o;e.fulfillConfirmBusy=!0,e.fulfillConfirmResult=null;try{const r=(o=e.basePath)!=null&&o.trim()?`${e.basePath.replace(/\/$/,"")}/api/quotation-drafts/${t}/confirm`:`/api/quotation-drafts/${t}/confirm`,a=Og("fulfill-confirm",String(t)),l=await fetch(r,{method:"PATCH",headers:{"X-Idempotency-Key":a,"Idempotency-Key":a}}),c=await l.json().catch(()=>({}));if(!l.ok)return e.fulfillConfirmResult={message:de("确认成单",Ee(c,`HTTP ${l.status}`),"该报价单仍为待确认，库存未锁定","点击“重试”再次确认")},e.fulfillConfirmResult;const d=Bg(c,Lg);return e.fulfillConfirmResult=d,e.fulfillDetail=null,e.fulfillDetailId=null,await La(e),d}catch(r){const a=r instanceof me||r instanceof Error?r.message:String(r);return e.fulfillConfirmResult={message:de("确认成单",a,"该报价单仍为待确认，库存未锁定","点击“重试”再次确认")},e.fulfillConfirmResult}finally{e.fulfillConfirmBusy=!1,n.delete(t)}})();return n.set(t,s),s}function Ye(e){return`${e.product_key??""}	${e.specification??""}	${e.code??""}`}const hs="/api/shortage/list",Si="/api/procurement/approve",he="/api/replenishment-drafts",ic=new WeakMap;function Ug(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams(n);return`${s}?${o.toString()}`}function qg(e,t){var s;const n=globalThis,i=typeof((s=n.crypto)==null?void 0:s.randomUUID)=="function"?n.crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2,10)}`;return`${e}:${t}:${i}`}function jg(e){let t=ic.get(e);return t||(t=new Map,ic.set(e,t)),t}function ft(e){const t=be(e);if(t!=null)return t;const n=Number(e);return Number.isFinite(n)?n:void 0}function Kg(e,t){const n=se(e,t,"data[]");return{id:ft(n.id),product_name:K(n.product_name),specification:K(n.specification),quantity:ft(n.quantity),available_qty:ft(n.available_qty),shortfall:ft(n.shortfall),code:K(n.code),quote_name:K(n.quote_name),unit_price:ft(n.unit_price),file_name:K(n.file_name),uploaded_at:K(n.uploaded_at)??null,product_key:K(n.product_key),count:ft(n.count)}}function Wg(e){const t=new Map;for(const n of e){const i=Ye(n);if(!i.trim())continue;const s=t.get(i);if(!s){t.set(i,n);continue}const o=Number(s.count??0),r=Number(n.count??0),a=s.uploaded_at?new Date(s.uploaded_at).getTime():0,l=n.uploaded_at?new Date(n.uploaded_at).getTime():0;(r>o||r===o&&l>=a)&&t.set(i,n)}return Array.from(t.values())}function Vg(e){const t=se(e,Si),n=t.data!=null?se(t.data,Si,"data"):{},i=be(t.approved_count)??be(n.approved_count)??(t.approved_count!=null?yo(t.approved_count,Si,"approved_count"):void 0),s=K(t.message)??K(n.message)??"已批准并通知采购员。";return{approved_count:i,message:s}}function Gg(e){return e.map(n=>`${n.product_key??""}|${n.product_name??""}|${n.specification??""}|${n.code??""}|${n.shortfall??0}`).sort().join(";")}async function Ia(e){e.procurementLoading=!0,e.procurementError=null;try{const t=Ug(e.basePath,hs,{limit:"200",unapproved_only:"1"}),n=await fetch(t),i=await n.json().catch(()=>({}));if(!n.ok){e.procurementError=de("加载采购建议列表",Ee(i,`HTTP ${n.status}`),"无法查看最新缺货采购建议","点击“重试”重新加载列表"),e.procurementSuggestions=[];return}const s=se(i,hs),o=qt(s.data,hs,"data");e.procurementSuggestions=Wg(o.map(r=>Kg(r,hs)))}catch(t){const n=t instanceof me||t instanceof Error?t.message:String(t);e.procurementError=de("加载采购建议列表",n,"列表可能为空或字段错位","检查后端返回字段后重试"),e.procurementSuggestions=[]}finally{e.procurementLoading=!1}}async function sc(e,t){if(!t.length)return null;const n=Gg(t),i=jg(e),s=i.get(n);if(s)return s;const o=(async()=>{var r;e.procurementApproveBusy=!0,e.procurementApproveResult=null;try{const a=(r=e.basePath)!=null&&r.trim()?`${e.basePath.replace(/\/$/,"")}${Si}`:Si,l=qg("procurement-approve",n||"single"),c=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json","X-Idempotency-Key":l,"Idempotency-Key":l},body:JSON.stringify({items:t})}),d=await c.json().catch(()=>({}));if(!c.ok)return e.procurementApproveResult={message:de("采购批准",Ee(d,`HTTP ${c.status}`),"这些缺货项仍待批准，采购员未收到通知","点击“重试”再次批准")},e.procurementApproveResult;const u=Vg(d);return e.procurementApproveResult=u,await Ia(e),u}catch(a){const l=a instanceof me||a instanceof Error?a.message:String(a);return e.procurementApproveResult={message:de("采购批准",l,"这些缺货项仍待批准，采购员未收到通知","点击“重试”再次批准")},e.procurementApproveResult}finally{e.procurementApproveBusy=!1,i.delete(n)}})();return i.set(n,o),o}async function Qi(e){var t;e.replenishmentLoading=!0,e.replenishmentError=null;try{const n=(t=e.basePath)!=null&&t.trim()?e.basePath.replace(/\/$/,""):"",i=n?`${n}${he}`:he,s=await fetch(i),o=await s.json().catch(()=>({}));if(!s.ok){e.replenishmentError=de("加载补货单列表",Ee(o,`HTTP ${s.status}`),"无法查看补货单列表","点击“重试”重新加载列表"),e.replenishmentDrafts=[];return}const r=se(o,he),a=qt(r.data,he,"data");e.replenishmentDrafts=a.map(l=>{const c=se(l,he,"data[]");return{id:yo(c.id,he,"id"),draft_no:K(c.draft_no)??"",name:K(c.name)??"",source:K(c.source)??void 0,created_at:K(c.created_at),status:K(c.status)??"",confirmed_at:K(c.confirmed_at)}})}catch(n){const i=n instanceof me||n instanceof Error?n.message:String(n);e.replenishmentError=de("加载补货单列表",i,"补货单列表可能为空或字段错位","检查后端返回字段后重试"),e.replenishmentDrafts=[]}finally{e.replenishmentLoading=!1}}async function Qg(e,t){var n;e.replenishmentLoading=!0,e.replenishmentError=null;try{const i=(n=e.basePath)!=null&&n.trim()?e.basePath.replace(/\/$/,""):"",s=i?`${i}${he}/${t}`:`${he}/${t}`,o=await fetch(s),r=await o.json().catch(()=>({}));if(!o.ok){e.replenishmentError=de("加载补货单详情",Ee(r,`HTTP ${o.status}`),"无法查看补货单详情","稍后重试"),e.replenishmentDetail=null,e.replenishmentDetailId=null;return}const a=se(r,he,"detail"),l=se(a.data,he,"data"),d=qt(l.lines,he,"data.lines").map(u=>{const h=se(u,he,"data.lines[]");return{id:ft(h.id),row_index:ft(h.row_index),code:K(h.code),product_name:K(h.product_name),specification:K(h.specification),quantity:ft(h.quantity)??0,current_qty:ft(h.current_qty),memo:K(h.memo)}});e.replenishmentDetail={id:yo(l.id,he,"id"),draft_no:K(l.draft_no)??"",name:K(l.name)??"",source:K(l.source)??void 0,created_at:K(l.created_at),status:K(l.status)??"",confirmed_at:K(l.confirmed_at),lines:d},e.replenishmentDetailId=e.replenishmentDetail.id}catch(i){const s=i instanceof me||i instanceof Error?i.message:String(i);e.replenishmentError=de("加载补货单详情",s,"无法查看补货单详情","稍后重试"),e.replenishmentDetail=null,e.replenishmentDetailId=null}finally{e.replenishmentLoading=!1}}async function Yg(e,t){var u;const n=t.filter(h=>{const g=typeof h.product_or_code=="string"?h.product_or_code.trim():"",m=Number(h.quantity);return g.length>0&&m>0});if(n.length===0)return null;const i={lines:n.map(h=>({product_or_code:typeof h.product_or_code=="string"?h.product_or_code.trim():"",quantity:Number(h.quantity)}))},s=(u=e.basePath)!=null&&u.trim()?e.basePath.replace(/\/$/,""):"",o=s?`${s}${he}`:he,r=await fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}),a=await r.json().catch(()=>({}));if(!r.ok)return e.replenishmentError=de("生成补货单",Ee(a,`HTTP ${r.status}`),"补货单未创建","请检查输入后重试"),null;const l=se(a,he),c=l.data!=null?se(l.data,he,"data"):{},d=yo(c.id,he,"data.id");return await Qi(e),{id:d}}async function Xg(e,t){var n;e.replenishmentConfirmBusy=!0,e.replenishmentConfirmResult=null;try{const i=(n=e.basePath)!=null&&n.trim()?e.basePath.replace(/\/$/,""):"",s=i?`${i}${he}/${t}/confirm`:`${he}/${t}/confirm`,o=await fetch(s,{method:"PATCH"}),r=await o.json().catch(()=>({}));if(!o.ok){e.replenishmentConfirmResult={message:de("确认补货单",Ee(r,`HTTP ${o.status}`),"补货未执行","稍后重试")};return}const a=se(r,he,"confirm"),l=se(a.data,he,"data"),c=be(l.executed),d=K(l.message);e.replenishmentConfirmResult={executed:c??void 0,message:d||`已执行 ${c??0} 条补货操作。`},await Qi(e)}catch(i){const s=i instanceof me||i instanceof Error?i.message:String(i);e.replenishmentConfirmResult={message:de("确认补货单",s,"补货未执行","稍后重试")}}finally{e.replenishmentConfirmBusy=!1}}async function Jg(e,t){var o;const n=(o=e.basePath)!=null&&o.trim()?e.basePath.replace(/\/$/,""):"",i=n?`${n}${he}/${t}`:`${he}/${t}`,s=await fetch(i,{method:"DELETE"});if(!s.ok){const r=await s.json().catch(()=>({}));return e.replenishmentError=de("删除补货单",Ee(r,`HTTP ${s.status}`),"补货单未删除","请重试"),!1}return e.replenishmentDetailId===t&&(e.replenishmentDetail=null,e.replenishmentDetailId=null),await Qi(e),!0}function Oa(e){return(e??"").trim().toLowerCase()||"viewer"}function Zg(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").map(t=>t.trim()).filter(Boolean):[]}const Yu="openclaw.device.auth.v1";function Fa(){try{const e=window.localStorage.getItem(Yu);if(!e)return null;const t=JSON.parse(e);return!t||t.version!==1||!t.deviceId||typeof t.deviceId!="string"||!t.tokens||typeof t.tokens!="object"?null:t}catch{return null}}function Xu(e){try{window.localStorage.setItem(Yu,JSON.stringify(e))}catch{}}function em(e){const t=Fa();if(!t||t.deviceId!==e.deviceId)return null;const n=Oa(e.role),i=t.tokens[n];return!i||typeof i.token!="string"?null:i}function Ju(e){const t=Oa(e.role),n={version:1,deviceId:e.deviceId,tokens:{}},i=Fa();i&&i.deviceId===e.deviceId&&(n.tokens={...i.tokens});const s={token:e.token,role:t,scopes:Zg(e.scopes),updatedAtMs:Date.now()};return n.tokens[t]=s,Xu(n),s}function Zu(e){const t=Fa();if(!t||t.deviceId!==e.deviceId)return;const n=Oa(e.role);if(!t.tokens[n])return;const i={...t,tokens:{...t.tokens}};delete i.tokens[n],Xu(i)}/*! noble-ed25519 - MIT License (c) 2019 Paul Miller (paulmillr.com) */const eh={p:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffedn,n:0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn,h:8n,a:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffecn,d:0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3n,Gx:0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an,Gy:0x6666666666666666666666666666666666666666666666666666666666666658n},{p:Te,n:Fs,Gx:oc,Gy:rc,a:er,d:tr,h:tm}=eh,yn=32,Na=64,nm=(...e)=>{"captureStackTrace"in Error&&typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(...e)},xe=(e="")=>{const t=new Error(e);throw nm(t,xe),t},im=e=>typeof e=="bigint",sm=e=>typeof e=="string",om=e=>e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array",jt=(e,t,n="")=>{const i=om(e),s=e==null?void 0:e.length,o=t!==void 0;if(!i||o&&s!==t){const r=n&&`"${n}" `,a=o?` of length ${t}`:"",l=i?`length=${s}`:`type=${typeof e}`;xe(r+"expected Uint8Array"+a+", got "+l)}return e},vo=e=>new Uint8Array(e),th=e=>Uint8Array.from(e),nh=(e,t)=>e.toString(16).padStart(t,"0"),ih=e=>Array.from(jt(e)).map(t=>nh(t,2)).join(""),bt={_0:48,_9:57,A:65,F:70,a:97,f:102},ac=e=>{if(e>=bt._0&&e<=bt._9)return e-bt._0;if(e>=bt.A&&e<=bt.F)return e-(bt.A-10);if(e>=bt.a&&e<=bt.f)return e-(bt.a-10)},sh=e=>{const t="hex invalid";if(!sm(e))return xe(t);const n=e.length,i=n/2;if(n%2)return xe(t);const s=vo(i);for(let o=0,r=0;o<i;o++,r+=2){const a=ac(e.charCodeAt(r)),l=ac(e.charCodeAt(r+1));if(a===void 0||l===void 0)return xe(t);s[o]=a*16+l}return s},oh=()=>globalThis==null?void 0:globalThis.crypto,rm=()=>{var e;return((e=oh())==null?void 0:e.subtle)??xe("crypto.subtle must be defined, consider polyfill")},Bi=(...e)=>{const t=vo(e.reduce((i,s)=>i+jt(s).length,0));let n=0;return e.forEach(i=>{t.set(i,n),n+=i.length}),t},am=(e=yn)=>oh().getRandomValues(vo(e)),Gs=BigInt,en=(e,t,n,i="bad number: out of range")=>im(e)&&t<=e&&e<n?e:xe(i),z=(e,t=Te)=>{const n=e%t;return n>=0n?n:t+n},rh=e=>z(e,Fs),lm=(e,t)=>{(e===0n||t<=0n)&&xe("no inverse n="+e+" mod="+t);let n=z(e,t),i=t,s=0n,o=1n;for(;n!==0n;){const r=i/n,a=i%n,l=s-o*r;i=n,n=a,s=o,o=l}return i===1n?z(s,t):xe("no inverse")},cm=e=>{const t=dh[e];return typeof t!="function"&&xe("hashes."+e+" not set"),t},nr=e=>e instanceof vn?e:xe("Point expected"),Nr=2n**256n,ut=class ut{constructor(t,n,i,s){N(this,"X");N(this,"Y");N(this,"Z");N(this,"T");const o=Nr;this.X=en(t,0n,o),this.Y=en(n,0n,o),this.Z=en(i,1n,o),this.T=en(s,0n,o),Object.freeze(this)}static CURVE(){return eh}static fromAffine(t){return new ut(t.x,t.y,1n,z(t.x*t.y))}static fromBytes(t,n=!1){const i=tr,s=th(jt(t,yn)),o=t[31];s[31]=o&-129;const r=lh(s);en(r,0n,n?Nr:Te);const l=z(r*r),c=z(l-1n),d=z(i*l+1n);let{isValid:u,value:h}=um(c,d);u||xe("bad point: y not sqrt");const g=(h&1n)===1n,m=(o&128)!==0;return!n&&h===0n&&m&&xe("bad point: x==0, isLastByteOdd"),m!==g&&(h=z(-h)),new ut(h,r,1n,z(h*r))}static fromHex(t,n){return ut.fromBytes(sh(t),n)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}assertValidity(){const t=er,n=tr,i=this;if(i.is0())return xe("bad point: ZERO");const{X:s,Y:o,Z:r,T:a}=i,l=z(s*s),c=z(o*o),d=z(r*r),u=z(d*d),h=z(l*t),g=z(d*z(h+c)),m=z(u+z(n*z(l*c)));if(g!==m)return xe("bad point: equation left != right (1)");const y=z(s*o),_=z(r*a);return y!==_?xe("bad point: equation left != right (2)"):this}equals(t){const{X:n,Y:i,Z:s}=this,{X:o,Y:r,Z:a}=nr(t),l=z(n*a),c=z(o*s),d=z(i*a),u=z(r*s);return l===c&&d===u}is0(){return this.equals(In)}negate(){return new ut(z(-this.X),this.Y,this.Z,z(-this.T))}double(){const{X:t,Y:n,Z:i}=this,s=er,o=z(t*t),r=z(n*n),a=z(2n*z(i*i)),l=z(s*o),c=t+n,d=z(z(c*c)-o-r),u=l+r,h=u-a,g=l-r,m=z(d*h),y=z(u*g),_=z(d*g),S=z(h*u);return new ut(m,y,S,_)}add(t){const{X:n,Y:i,Z:s,T:o}=this,{X:r,Y:a,Z:l,T:c}=nr(t),d=er,u=tr,h=z(n*r),g=z(i*a),m=z(o*u*c),y=z(s*l),_=z((n+i)*(r+a)-h-g),S=z(y-m),R=z(y+m),M=z(g-d*h),A=z(_*S),T=z(R*M),v=z(_*M),E=z(S*R);return new ut(A,T,E,v)}subtract(t){return this.add(nr(t).negate())}multiply(t,n=!0){if(!n&&(t===0n||this.is0()))return In;if(en(t,1n,Fs),t===1n)return this;if(this.equals(bn))return _m(t).p;let i=In,s=bn;for(let o=this;t>0n;o=o.double(),t>>=1n)t&1n?i=i.add(o):n&&(s=s.add(o));return i}multiplyUnsafe(t){return this.multiply(t,!1)}toAffine(){const{X:t,Y:n,Z:i}=this;if(this.equals(In))return{x:0n,y:1n};const s=lm(i,Te);z(i*s)!==1n&&xe("invalid inverse");const o=z(t*s),r=z(n*s);return{x:o,y:r}}toBytes(){const{x:t,y:n}=this.assertValidity().toAffine(),i=ah(n);return i[31]|=t&1n?128:0,i}toHex(){return ih(this.toBytes())}clearCofactor(){return this.multiply(Gs(tm),!1)}isSmallOrder(){return this.clearCofactor().is0()}isTorsionFree(){let t=this.multiply(Fs/2n,!1).double();return Fs%2n&&(t=t.add(this)),t.is0()}};N(ut,"BASE"),N(ut,"ZERO");let vn=ut;const bn=new vn(oc,rc,1n,z(oc*rc)),In=new vn(0n,1n,1n,0n);vn.BASE=bn;vn.ZERO=In;const ah=e=>sh(nh(en(e,0n,Nr),Na)).reverse(),lh=e=>Gs("0x"+ih(th(jt(e)).reverse())),ot=(e,t)=>{let n=e;for(;t-- >0n;)n*=n,n%=Te;return n},dm=e=>{const n=e*e%Te*e%Te,i=ot(n,2n)*n%Te,s=ot(i,1n)*e%Te,o=ot(s,5n)*s%Te,r=ot(o,10n)*o%Te,a=ot(r,20n)*r%Te,l=ot(a,40n)*a%Te,c=ot(l,80n)*l%Te,d=ot(c,80n)*l%Te,u=ot(d,10n)*o%Te;return{pow_p_5_8:ot(u,2n)*e%Te,b2:n}},lc=0x2b8324804fc1df0b2b4d00993dfbd7a72f431806ad2fe478c4ee1b274a0ea0b0n,um=(e,t)=>{const n=z(t*t*t),i=z(n*n*t),s=dm(e*i).pow_p_5_8;let o=z(e*n*s);const r=z(t*o*o),a=o,l=z(o*lc),c=r===e,d=r===z(-e),u=r===z(-e*lc);return c&&(o=a),(d||u)&&(o=l),(z(o)&1n)===1n&&(o=z(-o)),{isValid:c||d,value:o}},Br=e=>rh(lh(e)),Ba=(...e)=>dh.sha512Async(Bi(...e)),hm=(...e)=>cm("sha512")(Bi(...e)),ch=e=>{const t=e.slice(0,yn);t[0]&=248,t[31]&=127,t[31]|=64;const n=e.slice(yn,Na),i=Br(t),s=bn.multiply(i),o=s.toBytes();return{head:t,prefix:n,scalar:i,point:s,pointBytes:o}},za=e=>Ba(jt(e,yn)).then(ch),fm=e=>ch(hm(jt(e,yn))),pm=e=>za(e).then(t=>t.pointBytes),gm=e=>Ba(e.hashable).then(e.finish),mm=(e,t,n)=>{const{pointBytes:i,scalar:s}=e,o=Br(t),r=bn.multiply(o).toBytes();return{hashable:Bi(r,i,n),finish:c=>{const d=rh(o+Br(c)*s);return jt(Bi(r,ah(d)),Na)}}},ym=async(e,t)=>{const n=jt(e),i=await za(t),s=await Ba(i.prefix,n);return gm(mm(i,s,n))},dh={sha512Async:async e=>{const t=rm(),n=Bi(e);return vo(await t.digest("SHA-512",n.buffer))},sha512:void 0},vm=(e=am(yn))=>e,bm={getExtendedPublicKeyAsync:za,getExtendedPublicKey:fm,randomSecretKey:vm},Qs=8,wm=256,uh=Math.ceil(wm/Qs)+1,zr=2**(Qs-1),xm=()=>{const e=[];let t=bn,n=t;for(let i=0;i<uh;i++){n=t,e.push(n);for(let s=1;s<zr;s++)n=n.add(t),e.push(n);t=n.double()}return e};let cc;const dc=(e,t)=>{const n=t.negate();return e?n:t},_m=e=>{const t=cc||(cc=xm());let n=In,i=bn;const s=2**Qs,o=s,r=Gs(s-1),a=Gs(Qs);for(let l=0;l<uh;l++){let c=Number(e&r);e>>=a,c>zr&&(c-=o,e+=1n);const d=l*zr,u=d,h=d+Math.abs(c)-1,g=l%2!==0,m=c<0;c===0?i=i.add(dc(g,t[u])):n=n.add(dc(m,t[h]))}return e!==0n&&xe("invalid wnaf"),{p:n,f:i}},ir="openclaw-device-identity-v1";function Hr(e){let t="";for(const n of e)t+=String.fromCharCode(n);return btoa(t).replaceAll("+","-").replaceAll("/","_").replace(/=+$/g,"")}function hh(e){const t=e.replaceAll("-","+").replaceAll("_","/"),n=t+"=".repeat((4-t.length%4)%4),i=atob(n),s=new Uint8Array(i.length);for(let o=0;o<i.length;o+=1)s[o]=i.charCodeAt(o);return s}function km(e){return Array.from(e).map(t=>t.toString(16).padStart(2,"0")).join("")}async function fh(e){const t=await crypto.subtle.digest("SHA-256",e.slice().buffer);return km(new Uint8Array(t))}async function $m(){const e=bm.randomSecretKey(),t=await pm(e);return{deviceId:await fh(t),publicKey:Hr(t),privateKey:Hr(e)}}async function Ha(){try{const n=localStorage.getItem(ir);if(n){const i=JSON.parse(n);if((i==null?void 0:i.version)===1&&typeof i.deviceId=="string"&&typeof i.publicKey=="string"&&typeof i.privateKey=="string"){const s=await fh(hh(i.publicKey));if(s!==i.deviceId){const o={...i,deviceId:s};return localStorage.setItem(ir,JSON.stringify(o)),{deviceId:s,publicKey:i.publicKey,privateKey:i.privateKey}}return{deviceId:i.deviceId,publicKey:i.publicKey,privateKey:i.privateKey}}}}catch{}const e=await $m(),t={version:1,deviceId:e.deviceId,publicKey:e.publicKey,privateKey:e.privateKey,createdAtMs:Date.now()};return localStorage.setItem(ir,JSON.stringify(t)),e}async function Sm(e,t){const n=hh(e),i=new TextEncoder().encode(t),s=await ym(i,n);return Hr(s)}async function Kt(e,t){if(!(!e.client||!e.connected)&&!e.devicesLoading){e.devicesLoading=!0,t!=null&&t.quiet||(e.devicesError=null);try{const n=await e.client.request("device.pair.list",{});e.devicesList={pending:Array.isArray(n==null?void 0:n.pending)?n.pending:[],paired:Array.isArray(n==null?void 0:n.paired)?n.paired:[]}}catch(n){t!=null&&t.quiet||(e.devicesError=String(n))}finally{e.devicesLoading=!1}}}async function Am(e,t){if(!(!e.client||!e.connected))try{await e.client.request("device.pair.approve",{requestId:t}),await Kt(e)}catch(n){e.devicesError=String(n)}}async function Tm(e,t){if(!(!e.client||!e.connected||!window.confirm("Reject this device pairing request?")))try{await e.client.request("device.pair.reject",{requestId:t}),await Kt(e)}catch(i){e.devicesError=String(i)}}async function Cm(e,t){if(!(!e.client||!e.connected))try{const n=await e.client.request("device.token.rotate",t);if(n!=null&&n.token){const i=await Ha(),s=n.role??t.role;(n.deviceId===i.deviceId||t.deviceId===i.deviceId)&&Ju({deviceId:i.deviceId,role:s,token:n.token,scopes:n.scopes??t.scopes??[]}),window.prompt("New device token (copy and store securely):",n.token)}await Kt(e)}catch(n){e.devicesError=String(n)}}async function Em(e,t){if(!(!e.client||!e.connected||!window.confirm(`Revoke token for ${t.deviceId} (${t.role})?`)))try{await e.client.request("device.token.revoke",t);const i=await Ha();t.deviceId===i.deviceId&&Zu({deviceId:i.deviceId,role:t.role}),await Kt(e)}catch(i){e.devicesError=String(i)}}function Rm(e){if(!e||e.kind==="gateway")return{method:"exec.approvals.get",params:{}};const t=e.nodeId.trim();return t?{method:"exec.approvals.node.get",params:{nodeId:t}}:null}function Pm(e,t){if(!e||e.kind==="gateway")return{method:"exec.approvals.set",params:t};const n=e.nodeId.trim();return n?{method:"exec.approvals.node.set",params:{...t,nodeId:n}}:null}async function Ua(e,t){if(!(!e.client||!e.connected)&&!e.execApprovalsLoading){e.execApprovalsLoading=!0,e.lastError=null;try{const n=Rm(t);if(!n){e.lastError="Select a node before loading exec approvals.";return}const i=await e.client.request(n.method,n.params);Mm(e,i)}catch(n){e.lastError=String(n)}finally{e.execApprovalsLoading=!1}}}function Mm(e,t){e.execApprovalsSnapshot=t,e.execApprovalsDirty||(e.execApprovalsForm=mn(t.file??{}))}async function Dm(e,t){var n,i;if(!(!e.client||!e.connected)){e.execApprovalsSaving=!0,e.lastError=null;try{const s=(n=e.execApprovalsSnapshot)==null?void 0:n.hash;if(!s){e.lastError="Exec approvals hash missing; reload and retry.";return}const o=e.execApprovalsForm??((i=e.execApprovalsSnapshot)==null?void 0:i.file)??{},r=Pm(t,{file:o,baseHash:s});if(!r){e.lastError="Select a node before saving exec approvals.";return}await e.client.request(r.method,r.params),e.execApprovalsDirty=!1,await Ua(e,t)}catch(s){e.lastError=String(s)}finally{e.execApprovalsSaving=!1}}}function Lm(e,t,n){var s;const i=mn(e.execApprovalsForm??((s=e.execApprovalsSnapshot)==null?void 0:s.file)??{});Lu(i,t,n),e.execApprovalsForm=i,e.execApprovalsDirty=!0}function Im(e,t){var i;const n=mn(e.execApprovalsForm??((i=e.execApprovalsSnapshot)==null?void 0:i.file)??{});Iu(n,t),e.execApprovalsForm=n,e.execApprovalsDirty=!0}function Be(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams;for(const[r,a]of Object.entries(n))o.set(r,String(a));return`${s}?${o.toString()}`}async function bo(e,t){e.oosLoading=!0,e.oosError=null;try{const[s,o,r,a]=await Promise.all([fetch(Be(e.basePath,"/api/oos/stats")),fetch(Be(e.basePath,"/api/oos/list",{limit:100})),fetch(Be(e.basePath,"/api/oos/by-file",{limit:50})),fetch(Be(e.basePath,"/api/oos/by-time",{days:30}))]),l=await s.json().catch(()=>({})),c=await o.json().catch(()=>({})),d=await r.json().catch(()=>({})),u=await a.json().catch(()=>({}));l.success&&l.data?(e.oosStats=l.data,e.oosDb=l.db??null):(e.oosStats=null,s.ok||(e.oosError=l.detail??`stats: ${s.status}`)),c.success&&Array.isArray(c.data)?e.oosList=c.data:(e.oosList=[],!e.oosError&&!o.ok&&(e.oosError=c.detail??`list: ${o.status}`)),d.success&&Array.isArray(d.data)?e.oosByFile=d.data:e.oosByFile=[],u.success&&Array.isArray(u.data)?e.oosByTime=u.data:e.oosByTime=[]}catch(s){e.oosError=s instanceof Error?s.message:String(s),e.oosStats=null,e.oosList=[],e.oosByFile=[],e.oosByTime=[]}finally{e.oosLoading=!1}}async function Om(e,t){if(!(t!=null&&t.trim()))return!1;try{const n=await fetch(Be(e.basePath,"/api/oos/delete"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_key:t.trim()})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(await bo(e),!0):(e.oosError=i.detail??`删除失败: ${n.status}`,!1)}catch(n){return e.oosError=n instanceof Error?n.message:String(n),!1}}async function Fm(e,t){const n=(t.product_name||"").trim();if(!n)return!1;try{const i=await fetch(Be(e.basePath,"/api/oos/add"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_name:n,specification:(t.specification??"").trim(),quantity:t.quantity??0,unit:(t.unit??"").trim()})}),s=await i.json().catch(()=>({}));return i.ok&&s.success?(await bo(e),!0):(e.oosError=s.detail??`添加失败: ${i.status}`,!1)}catch(i){return e.oosError=i instanceof Error?i.message:String(i),!1}}async function Nm(e){try{const t=await fetch(Be(e.basePath,"/api/oos/stats")),n=await t.json().catch(()=>({}));if(t.ok&&n.success&&n.data)e.overviewOosStats=n.data,e.overviewOosError=null;else{e.overviewOosStats=null;const i=typeof n.detail=="string"?n.detail:n.message??n.error??`oos stats: ${t.status}`;e.overviewOosError=i}}catch(t){e.overviewOosStats=null,e.overviewOosError=t instanceof Error?t.message:String(t)}}async function wo(e,t){e.shortageLoading=!0,e.shortageError=null;try{const[s,o,r,a]=await Promise.all([fetch(Be(e.basePath,"/api/shortage/stats"),{method:"GET"}),fetch(Be(e.basePath,"/api/shortage/list",{limit:100}),{method:"GET"}),fetch(Be(e.basePath,"/api/shortage/by-file"),{method:"GET"}),fetch(Be(e.basePath,"/api/shortage/by-time",{days:30}),{method:"GET"})]),l=await s.json().catch(()=>({})),c=await o.json().catch(()=>({})),d=await r.json().catch(()=>({})),u=await a.json().catch(()=>({}));if(l.success&&l.data)e.shortageStats=l.data,e.shortageDb=l.db??null;else if(e.shortageStats=null,!e.shortageError&&!s.ok){const h=typeof l.detail=="string"?l.detail:l.message??l.error;e.shortageError=h??`stats: ${s.status} ${s.statusText}`}if(c.success&&Array.isArray(c.data))e.shortageList=c.data;else if(e.shortageList=[],!e.shortageError&&!o.ok){const h=typeof c.detail=="string"?c.detail:c.message??c.error;e.shortageError=h??`list: ${o.status} ${o.statusText}`}if(d.success&&Array.isArray(d.data))e.shortageByFile=d.data;else if(e.shortageByFile=[],!e.shortageError&&!r.ok){const h=typeof d.detail=="string"?d.detail:d.message??d.error;e.shortageError=h??`by-file: ${r.status} ${r.statusText}`}if(u.success&&Array.isArray(u.data))e.shortageByTime=u.data;else if(e.shortageByTime=[],!e.shortageError&&!a.ok){const h=typeof u.detail=="string"?u.detail:u.message??u.error;e.shortageError=h??`by-time: ${a.status} ${a.statusText}`}}catch(s){e.shortageError=s instanceof Error?s.message:String(s),e.shortageStats=null,e.shortageList=[],e.shortageByFile=[],e.shortageByTime=[]}finally{e.shortageLoading=!1}}async function Bm(e,t){if(!(t!=null&&t.trim()))return!1;try{const n=await fetch(Be(e.basePath,"/api/shortage/delete"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_key:t.trim()})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(await wo(e),!0):(e.shortageError=i.detail??`删除失败: ${n.status}`,!1)}catch(n){return e.shortageError=n instanceof Error?n.message:String(n),!1}}async function zm(e,t){const n=(t.product_name||"").trim();if(!n)return!1;try{const i=await fetch(Be(e.basePath,"/api/shortage/add"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_name:n,specification:(t.specification??"").trim(),quantity:t.quantity??0,available_qty:t.available_qty??0})}),s=await i.json().catch(()=>({}));return i.ok&&s.success?(await wo(e),!0):(e.shortageError=s.detail??`添加失败: ${i.status}`,!1)}catch(i){return e.shortageError=i instanceof Error?i.message:String(i),!1}}async function Hm(e){try{const t=await fetch(Be(e.basePath,"/api/shortage/stats"),{method:"GET"}),n=await t.json().catch(()=>({}));if(t.ok&&n.success&&n.data)e.overviewShortageStats=n.data,e.overviewShortageError=null;else{e.overviewShortageStats=null;const i=typeof n.detail=="string"?n.detail:n.message??n.error??`shortage stats: ${t.status}`;e.overviewShortageError=i}}catch(t){e.overviewShortageStats=null,e.overviewShortageError=t instanceof Error?t.message:String(t)}}async function Um(e){if(!(!e.client||!e.connected)&&!e.presenceLoading){e.presenceLoading=!0,e.presenceError=null,e.presenceStatus=null;try{const t=await e.client.request("system-presence",{});Array.isArray(t)?(e.presenceEntries=t,e.presenceStatus=t.length===0?"No instances yet.":null):(e.presenceEntries=[],e.presenceStatus="No presence payload.")}catch(t){e.presenceError=String(t)}finally{e.presenceLoading=!1}}}async function qa(e,t){if(!(!e.client||!e.connected)&&!e.sessionsLoading){e.sessionsLoading=!0,e.sessionsError=null;try{const n=(t==null?void 0:t.includeGlobal)??e.sessionsIncludeGlobal,i=(t==null?void 0:t.includeUnknown)??e.sessionsIncludeUnknown,s=(t==null?void 0:t.activeMinutes)??ec(e.sessionsFilterActive,0),o=(t==null?void 0:t.limit)??ec(e.sessionsFilterLimit,0),r={includeGlobal:n,includeUnknown:i};s>0&&(r.activeMinutes=s),o>0&&(r.limit=o);const a=await e.client.request("sessions.list",r);a&&(e.sessionsResult=a)}catch(n){e.sessionsError=String(n)}finally{e.sessionsLoading=!1}}}function Hn(e,t,n){if(!t.trim())return;const i={...e.skillMessages};n?i[t]=n:delete i[t],e.skillMessages=i}function xo(e){return e instanceof Error?e.message:String(e)}async function Yi(e,t){if(t!=null&&t.clearMessages&&Object.keys(e.skillMessages).length>0&&(e.skillMessages={}),!(!e.client||!e.connected)&&!e.skillsLoading){e.skillsLoading=!0,e.skillsError=null;try{const n=await e.client.request("skills.status",{});n&&(e.skillsReport=n)}catch(n){e.skillsError=xo(n)}finally{e.skillsLoading=!1}}}function qm(e,t,n){e.skillEdits={...e.skillEdits,[t]:n}}async function jm(e,t,n){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{await e.client.request("skills.update",{skillKey:t,enabled:n}),await Yi(e),Hn(e,t,{kind:"success",message:n?"Skill enabled":"Skill disabled"})}catch(i){const s=xo(i);e.skillsError=s,Hn(e,t,{kind:"error",message:s})}finally{e.skillsBusyKey=null}}}async function Km(e,t){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const n=e.skillEdits[t]??"";await e.client.request("skills.update",{skillKey:t,apiKey:n}),await Yi(e),Hn(e,t,{kind:"success",message:"API key saved"})}catch(n){const i=xo(n);e.skillsError=i,Hn(e,t,{kind:"error",message:i})}finally{e.skillsBusyKey=null}}}async function Wm(e,t,n,i){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const s=await e.client.request("skills.install",{name:n,installId:i,timeoutMs:12e4});await Yi(e),Hn(e,t,{kind:"success",message:(s==null?void 0:s.message)??"Installed"})}catch(s){const o=xo(s);e.skillsError=o,Hn(e,t,{kind:"error",message:o})}finally{e.skillsBusyKey=null}}}function tt(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams;for(const[r,a]of Object.entries(n))o.set(r,String(a));return`${s}?${o.toString()}`}function _o(e){return{"X-Admin-Token":e,"Content-Type":"application/json"}}function Z(e,t){e.adminData={...e.adminData,...t}}function Vm(){let e=null;return typeof sessionStorage<"u"&&(e=sessionStorage.getItem("admin_token")),{token:e,loginError:null,loginLoading:!1,activeSubTab:"price",priceItems:[],priceTotal:0,pricePage:1,pricePageSize:100,priceQuery:"",priceLoading:!1,priceError:null,priceUploading:!1,mappingItems:[],mappingTotal:0,mappingPage:1,mappingPageSize:100,mappingQuery:"",mappingLoading:!1,mappingError:null,mappingUploading:!1}}async function Gm(e,t){Z(e,{loginLoading:!0,loginError:null});try{const n=await fetch(tt(e.basePath,"/api/admin/login"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:t})}),i=await n.json().catch(()=>({}));if(n.status===503){Z(e,{loginError:"管理功能未启用（服务端未配置 ADMIN_PASSWORD）",loginLoading:!1});return}if(!n.ok){const s=i.detail,o=typeof s=="string"?s:Array.isArray(s)&&s[0]&&typeof s[0].msg=="string"?s[0].msg:"登录失败";Z(e,{loginError:o,loginLoading:!1});return}i.token?(sessionStorage.setItem("admin_token",i.token),Z(e,{token:i.token,loginLoading:!1,loginError:null})):Z(e,{loginError:"未返回 token",loginLoading:!1})}catch(n){Z(e,{loginError:String(n),loginLoading:!1})}}function Tt(e){sessionStorage.removeItem("admin_token"),Z(e,{token:null})}async function un(e){const t=e.adminData.token;if(t){Z(e,{priceLoading:!0,priceError:null});try{const n={q:e.adminData.priceQuery,page:e.adminData.pricePage,page_size:e.adminData.pricePageSize},i=await fetch(tt(e.basePath,"/api/admin/price-library",n),{headers:_o(t)});if(i.status===401){Tt(e);return}if(i.status===503){Z(e,{priceLoading:!1,priceError:"管理功能未启用（服务端未配置 ADMIN_PASSWORD）"});return}if(!i.ok){const o=await i.text();Z(e,{priceLoading:!1,priceError:o||`HTTP ${i.status}`});return}const s=await i.json();Z(e,{priceItems:s.items,priceTotal:s.total,priceLoading:!1})}catch(n){Z(e,{priceLoading:!1,priceError:String(n)})}}}function Qm(e,t,n){const i=e.adminData.priceItems.slice();t<0||t>=i.length||(i[t]={...i[t],...n},Z(e,{priceItems:i}))}function Ym(e){Z(e,{priceItems:[...e.adminData.priceItems,{material:"",description:"",price_a:null,price_b:null,price_c:null,price_d:null}]})}async function Xm(e,t){const n=e.adminData.token;if(!n)return;const i=t.id==null,s=i?tt(e.basePath,"/api/admin/price-library"):tt(e.basePath,`/api/admin/price-library/${t.id}`),o=await fetch(s,{method:i?"POST":"PUT",headers:_o(n),body:JSON.stringify({material:t.material,description:t.description,price_a:t.price_a,price_b:t.price_b,price_c:t.price_c,price_d:t.price_d})});if(o.status===401){Tt(e);return}if(!o.ok){Z(e,{priceError:await o.text()});return}await un(e)}async function Jm(e,t){const n=e.adminData.token;if(!n)return;const i=await fetch(tt(e.basePath,`/api/admin/price-library/${t}`),{method:"DELETE",headers:{"X-Admin-Token":n}});if(i.status===401){Tt(e);return}if(!i.ok){Z(e,{priceError:await i.text()||`HTTP ${i.status}`});return}await un(e)}async function Zm(e,t){const n=e.adminData.token;if(n&&confirm("将用上传文件全表替换万鼎价格库，确认？")){Z(e,{priceUploading:!0,priceError:null});try{const i=new FormData;i.append("file",t);const s=await fetch(tt(e.basePath,"/api/admin/price-library/upload"),{method:"POST",headers:{"X-Admin-Token":n},body:i});if(s.status===401){Tt(e);return}if(!s.ok){Z(e,{priceError:await s.text(),priceUploading:!1});return}await un(e),Z(e,{priceUploading:!1})}catch(i){Z(e,{priceError:String(i),priceUploading:!1})}}}async function hn(e){const t=e.adminData.token;if(t){Z(e,{mappingLoading:!0,mappingError:null});try{const n={q:e.adminData.mappingQuery,page:e.adminData.mappingPage,page_size:e.adminData.mappingPageSize},i=await fetch(tt(e.basePath,"/api/admin/product-mapping",n),{headers:_o(t)});if(i.status===401){Tt(e);return}if(i.status===503){Z(e,{mappingLoading:!1,mappingError:"管理功能未启用（服务端未配置 ADMIN_PASSWORD）"});return}if(!i.ok){Z(e,{mappingLoading:!1,mappingError:await i.text()});return}const s=await i.json();Z(e,{mappingItems:s.items,mappingTotal:s.total,mappingLoading:!1})}catch(n){Z(e,{mappingLoading:!1,mappingError:String(n)})}}}function ey(e,t,n){const i=e.adminData.mappingItems.slice();t<0||t>=i.length||(i[t]={...i[t],...n},Z(e,{mappingItems:i}))}function ty(e){Z(e,{mappingItems:[...e.adminData.mappingItems,{inquiry_name:"",spec:"",product_code:"",quotation_name:""}]})}async function ny(e,t){const n=e.adminData.token;if(!n)return;const i=t.id==null,s=i?tt(e.basePath,"/api/admin/product-mapping"):tt(e.basePath,`/api/admin/product-mapping/${t.id}`),o=await fetch(s,{method:i?"POST":"PUT",headers:_o(n),body:JSON.stringify({inquiry_name:t.inquiry_name,spec:t.spec,product_code:t.product_code,quotation_name:t.quotation_name})});if(o.status===401){Tt(e);return}if(!o.ok){Z(e,{mappingError:await o.text()});return}await hn(e)}async function iy(e,t){const n=e.adminData.token;if(!n)return;const i=await fetch(tt(e.basePath,`/api/admin/product-mapping/${t}`),{method:"DELETE",headers:{"X-Admin-Token":n}});if(i.status===401){Tt(e);return}if(!i.ok){Z(e,{mappingError:await i.text()||`HTTP ${i.status}`});return}await hn(e)}async function sy(e,t){const n=e.adminData.token;if(n&&confirm("将用上传文件全表替换产品映射表，确认？")){Z(e,{mappingUploading:!0,mappingError:null});try{const i=new FormData;i.append("file",t);const s=await fetch(tt(e.basePath,"/api/admin/product-mapping/upload"),{method:"POST",headers:{"X-Admin-Token":n},body:i});if(s.status===401){Tt(e);return}if(!s.ok){Z(e,{mappingError:await s.text(),mappingUploading:!1});return}await hn(e),Z(e,{mappingUploading:!1})}catch(i){Z(e,{mappingError:String(i),mappingUploading:!1})}}}function Un(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}function qn(e){return{"Content-Type":"application/json","x-reports-token":e}}async function jn(e){const t=await e.json().catch(()=>({}));if(!e.ok||!t.success){const n=t.detail;throw Array.isArray(n)?new Error(n.map(i=>JSON.stringify(i)).join("; ")):typeof n=="object"&&n!==null?new Error(JSON.stringify(n)):new Error(typeof n=="string"&&n||`HTTP ${e.status}`)}return t.data}async function ko(e){e.reportsLoading=!0,e.reportsError=null;try{const[t,n]=await Promise.all([fetch(Un(e.basePath,"/api/reports/tasks"),{headers:qn(e.reportsAdminToken)}),fetch(Un(e.basePath,"/api/reports/records?limit=20"),{headers:qn(e.reportsAdminToken)})]);e.reportsTasks=await jn(t),e.reportsRecords=await jn(n)}catch(t){e.reportsError=t instanceof Error?t.message:String(t)}finally{e.reportsLoading=!1}}async function oy(e,t){e.reportsError=null;try{const n=await fetch(Un(e.basePath,`/api/reports/tasks/${t}/run`),{method:"POST",headers:qn(e.reportsAdminToken)});await jn(n),await ko(e)}catch(n){e.reportsError=n instanceof Error?n.message:String(n)}}async function ry(e,t,n){e.reportsError=null;try{const i=await fetch(Un(e.basePath,`/api/reports/tasks/${t}`),{method:"PATCH",headers:qn(e.reportsAdminToken),body:JSON.stringify(n)});await jn(i),await ko(e)}catch(i){e.reportsError=i instanceof Error?i.message:String(i)}}async function ja(e,t,n){const i=(n==null?void 0:n.soft)===!0;i||(e.selectedRecordId=t,e.reportDetailLoading=!0,e.reportsError=null);const s=t;try{const o=await fetch(Un(e.basePath,`/api/reports/records/${t}`),{headers:qn(e.reportsAdminToken)}),r=await jn(o);if(e.selectedRecordId===s){e.reportDetail=r;const a=r==null?void 0:r.analysis_status;i||(a==="running"||a==="pending"?ph(e,t):On())}}catch(o){i||(e.reportsError=o instanceof Error?o.message:String(o)),e.selectedRecordId===s&&!i&&(e.reportDetail=null)}finally{!i&&e.selectedRecordId===s&&(e.reportDetailLoading=!1)}}let Ns=null,Bs=!1,Ur=0;const ay=80;function On(){Ns!==null&&(window.clearInterval(Ns),Ns=null),Bs=!1,Ur=0}function ph(e,t){On(),Ns=window.setInterval(async()=>{var n,i;if(e.selectedRecordId!==t){On();return}if(!Bs){if(Ur+=1,Ur>ay){On();const s=(n=e.reportDetail)==null?void 0:n.analysis_status;(s==="running"||s==="pending")&&e.reportsError==null&&(e.reportsError="智能分析等待超时。请检查服务端日志与 ANTHROPIC_API_KEY，或稍后点击「重新分析」。");return}Bs=!0;try{await ja(e,t,{soft:!0});const s=(i=e.reportDetail)==null?void 0:i.analysis_status;(s==="done"||s==="failed")&&On()}finally{Bs=!1}}},3e3)}async function ly(e,t){e.reportsError=null;try{const n=await fetch(Un(e.basePath,`/api/reports/records/${t}/reanalyze`),{method:"POST",headers:qn(e.reportsAdminToken)});await jn(n),await ja(e,t),ph(e,t)}catch(n){e.reportsError=n instanceof Error?n.message:String(n)}}const cy=[{label:"chat",tabs:["chat"]},{label:"control",tabs:["overview","channels","instances","sessions","work","cron"]},{label:"agent",tabs:["agents","skills","nodes","reports"]},{label:"settings",tabs:["config","debug","logs","admin-data"]}],gh={agents:"/agents",overview:"/overview",channels:"/channels",instances:"/instances",sessions:"/sessions",work:"/work",cron:"/cron",skills:"/skills",nodes:"/nodes",reports:"/reports",chat:"/chat",config:"/config",debug:"/debug",logs:"/logs","admin-data":"/admin-data"},mh=new Map(Object.entries(gh).map(([e,t])=>[t,e]));function Jn(e){if(!e)return"";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t==="/"?"":(t.endsWith("/")&&(t=t.slice(0,-1)),t)}function zi(e){if(!e)return"/";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t.length>1&&t.endsWith("/")&&(t=t.slice(0,-1)),t}function yh(e,t=""){const n=Jn(t),i=gh[e];return n?`${n}${i}`:i}function vh(e,t=""){const n=Jn(t);let i=e||"/";n&&(i===n?i="/":i.startsWith(`${n}/`)&&(i=i.slice(n.length)));let s=zi(i).toLowerCase();return s.endsWith("/index.html")&&(s="/"),s==="/"?"chat":mh.get(s)??null}function dy(e){let t=zi(e);if(t.endsWith("/index.html")&&(t=zi(t.slice(0,-11))),t==="/")return"";const n=t.split("/").filter(Boolean);if(n.length===0)return"";for(let i=0;i<n.length;i++){const s=`/${n.slice(i).join("/")}`.toLowerCase();if(mh.has(s)){const o=n.slice(0,i);return o.length?`/${o.join("/")}`:""}}return`/${n.join("/")}`}function uy(e){switch(e){case"agents":return"folder";case"chat":return"messageSquare";case"overview":return"barChart";case"channels":return"fileText";case"instances":return"radio";case"sessions":return"fileText";case"work":return"fileText";case"cron":return"loader";case"skills":return"zap";case"nodes":return"monitor";case"reports":return"barChart";case"config":return"settings";case"debug":return"bug";case"logs":return"scrollText";case"admin-data":return"database";default:return"folder"}}function qr(e){return p(`tabs.${e}`)}function hy(e){return p(`subtitles.${e}`)}const bh="openclaw.control.settings.v1";function fy(){const t={gatewayUrl:`${location.protocol==="https:"?"wss":"ws"}://${location.host}/ws`,token:"",sessionKey:"main",lastActiveSessionKey:"main",theme:"system",chatFocusMode:!1,chatShowThinking:!0,splitRatio:.6,navCollapsed:!1,navGroupsCollapsed:{}};try{const n=localStorage.getItem(bh);if(!n)return t;const i=JSON.parse(n);return{gatewayUrl:typeof i.gatewayUrl=="string"&&i.gatewayUrl.trim()?i.gatewayUrl.trim():t.gatewayUrl,token:typeof i.token=="string"?i.token:t.token,sessionKey:typeof i.sessionKey=="string"&&i.sessionKey.trim()?i.sessionKey.trim():t.sessionKey,lastActiveSessionKey:typeof i.lastActiveSessionKey=="string"&&i.lastActiveSessionKey.trim()?i.lastActiveSessionKey.trim():typeof i.sessionKey=="string"&&i.sessionKey.trim()||t.lastActiveSessionKey,theme:i.theme==="light"||i.theme==="dark"||i.theme==="system"?i.theme:t.theme,chatFocusMode:typeof i.chatFocusMode=="boolean"?i.chatFocusMode:t.chatFocusMode,chatShowThinking:typeof i.chatShowThinking=="boolean"?i.chatShowThinking:t.chatShowThinking,splitRatio:typeof i.splitRatio=="number"&&i.splitRatio>=.4&&i.splitRatio<=.7?i.splitRatio:t.splitRatio,navCollapsed:typeof i.navCollapsed=="boolean"?i.navCollapsed:t.navCollapsed,navGroupsCollapsed:typeof i.navGroupsCollapsed=="object"&&i.navGroupsCollapsed!==null?i.navGroupsCollapsed:t.navGroupsCollapsed,locale:$a(i.locale)?i.locale:void 0}}catch{return t}}function py(e){localStorage.setItem(bh,JSON.stringify(e))}const fs=e=>Number.isNaN(e)?.5:e<=0?0:e>=1?1:e,gy=()=>typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches??!1,ps=e=>{e.classList.remove("theme-transition"),e.style.removeProperty("--theme-switch-x"),e.style.removeProperty("--theme-switch-y")},my=({nextTheme:e,applyTheme:t,context:n,currentTheme:i})=>{var c;if(i===e)return;const s=globalThis.document??null;if(!s){t();return}const o=s.documentElement,r=s,a=gy();if(!!r.startViewTransition&&!a){let d=.5,u=.5;if((n==null?void 0:n.pointerClientX)!==void 0&&(n==null?void 0:n.pointerClientY)!==void 0&&typeof window<"u")d=fs(n.pointerClientX/window.innerWidth),u=fs(n.pointerClientY/window.innerHeight);else if(n!=null&&n.element){const h=n.element.getBoundingClientRect();h.width>0&&h.height>0&&typeof window<"u"&&(d=fs((h.left+h.width/2)/window.innerWidth),u=fs((h.top+h.height/2)/window.innerHeight))}o.style.setProperty("--theme-switch-x",`${d*100}%`),o.style.setProperty("--theme-switch-y",`${u*100}%`),o.classList.add("theme-transition");try{const h=(c=r.startViewTransition)==null?void 0:c.call(r,()=>{t()});h!=null&&h.finished?h.finished.finally(()=>ps(o)):ps(o)}catch{ps(o),t()}return}t(),ps(o)};function yy(){return typeof window>"u"||typeof window.matchMedia!="function"||window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function Ka(e){return e==="system"?yy():e}function Bt(e,t){var i;const n={...t,lastActiveSessionKey:((i=t.lastActiveSessionKey)==null?void 0:i.trim())||t.sessionKey.trim()||"main"};e.settings=n,py(n),t.theme!==e.theme&&(e.theme=t.theme,$o(e,Ka(t.theme))),e.applySessionKey=e.settings.lastActiveSessionKey}function wh(e,t){const n=t.trim();n&&e.settings.lastActiveSessionKey!==n&&Bt(e,{...e.settings,lastActiveSessionKey:n})}function vy(e){if(!window.location.search&&!window.location.hash)return;const t=new URL(window.location.href),n=new URLSearchParams(t.search),i=new URLSearchParams(t.hash.startsWith("#")?t.hash.slice(1):t.hash),s=n.get("token")??i.get("token"),o=n.get("password")??i.get("password"),r=n.get("session")??i.get("session"),a=n.get("gatewayUrl")??i.get("gatewayUrl");let l=!1;if(s!=null){const d=s.trim();d&&d!==e.settings.token&&Bt(e,{...e.settings,token:d}),n.delete("token"),i.delete("token"),l=!0}if(o!=null&&(n.delete("password"),i.delete("password"),l=!0),r!=null){const d=r.trim();d&&(e.sessionKey=d,Bt(e,{...e.settings,sessionKey:d,lastActiveSessionKey:d}))}if(a!=null){const d=a.trim();d&&d!==e.settings.gatewayUrl&&(e.pendingGatewayUrl=d),n.delete("gatewayUrl"),i.delete("gatewayUrl"),l=!0}if(!l)return;t.search=n.toString();const c=i.toString();t.hash=c?`#${c}`:"",window.history.replaceState({},"",t.toString())}function by(e,t){e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?Ta(e):Ca(e),t==="debug"?Ea(e):Ra(e),Ys(e),_h(e,t,!1)}function wy(e,t,n){my({nextTheme:t,applyTheme:()=>{e.theme=t,Bt(e,{...e.settings,theme:t}),$o(e,Ka(t))},context:n,currentTheme:e.theme})}async function Ys(e){var t,n,i,s,o,r;if(e.tab==="overview"&&(await kh(e),await Promise.all([Nm(e),Hm(e)])),e.tab==="channels"&&await Ku(e),e.tab==="instances"){const a=e;await bo(a),await wo(a)}if(e.tab==="sessions"&&(await Ia(e),await Qi(e)),e.tab==="cron"&&await La(e),e.tab==="skills"&&await Yi(e),e.tab==="reports"&&await ko(e),e.tab==="agents"){await Pa(e),ju(e),await $t(e);const a=((n=(t=e.agentsList)==null?void 0:t.agents)==null?void 0:n.map(c=>c.id))??[];a.length>0&&qu(e,a);const l=e.agentsSelectedId??((i=e.agentsList)==null?void 0:i.defaultId)??((r=(o=(s=e.agentsList)==null?void 0:s.agents)==null?void 0:o[0])==null?void 0:r.id);l&&Uu(e,l)}if(e.tab==="nodes"&&(await mo(e),await Kt(e),await $t(e),await Ua(e)),e.tab==="chat"&&(await Ph(e),Vi(e,!e.chatHasAutoScrolled)),e.tab==="config"&&(await Qp(e),await $t(e)),e.tab==="debug"&&(await go(e),e.eventLog=e.eventLogBuffer),e.tab==="logs"&&(e.logsAtBottom=!0,await Aa(e,{reset:!0}),Hu(e,!0)),e.tab==="admin-data"){const a=e;a.adminData.token&&(await un(a),await hn(a))}}function xy(){if(typeof window>"u")return"";const e=window.__OPENCLAW_CONTROL_UI_BASE_PATH__;return typeof e=="string"&&e.trim()?Jn(e):dy(window.location.pathname)}function _y(e){e.theme=e.settings.theme??"system",$o(e,Ka(e.theme))}function $o(e,t){if(e.themeResolved=t,typeof document>"u")return;const n=document.documentElement;n.dataset.theme=t,n.style.colorScheme=t}function ky(e){if(typeof window>"u"||typeof window.matchMedia!="function")return;if(e.themeMedia=window.matchMedia("(prefers-color-scheme: dark)"),e.themeMediaHandler=n=>{e.theme==="system"&&$o(e,n.matches?"dark":"light")},typeof e.themeMedia.addEventListener=="function"){e.themeMedia.addEventListener("change",e.themeMediaHandler);return}e.themeMedia.addListener(e.themeMediaHandler)}function $y(e){if(!e.themeMedia||!e.themeMediaHandler)return;if(typeof e.themeMedia.removeEventListener=="function"){e.themeMedia.removeEventListener("change",e.themeMediaHandler);return}e.themeMedia.removeListener(e.themeMediaHandler),e.themeMedia=null,e.themeMediaHandler=null}function Sy(e,t){if(typeof window>"u")return;const n=vh(window.location.pathname,e.basePath)??"chat";xh(e,n),_h(e,n,t)}function Ay(e){var s;if(typeof window>"u")return;const t=vh(window.location.pathname,e.basePath);if(!t)return;const i=(s=new URL(window.location.href).searchParams.get("session"))==null?void 0:s.trim();i&&(e.sessionKey=i,Bt(e,{...e.settings,sessionKey:i,lastActiveSessionKey:i})),xh(e,t)}function xh(e,t){e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?Ta(e):Ca(e),t==="debug"?Ea(e):Ra(e),e.connected&&Ys(e)}function _h(e,t,n){if(typeof window>"u")return;const i=zi(yh(t,e.basePath)),s=zi(window.location.pathname),o=new URL(window.location.href);t==="chat"&&e.sessionKey?o.searchParams.set("session",e.sessionKey):o.searchParams.delete("session"),s!==i&&(o.pathname=i),n?window.history.replaceState({},"",o.toString()):window.history.pushState({},"",o.toString())}function Ty(e,t,n){if(typeof window>"u")return;const i=new URL(window.location.href);i.searchParams.set("session",t),window.history.replaceState({},"",i.toString())}async function kh(e){await Promise.all([St(e,!1),Um(e),qa(e),Vu(e),go(e),Dg(e)])}async function $h(e){await Promise.all([St(e,!1),Vu(e),Mg(e)])}async function Cy(e){await La(e)}async function Ey(e){await Ia(e)}const uc=50,Ry=80,Py=12e4,My="[已渲染到前端]";function Dy(e){if(!e||typeof e!="object")return null;const t=e;if(typeof t.text=="string")return t.text;const n=t.content;if(!Array.isArray(n))return null;const i=n.map(s=>{if(!s||typeof s!="object")return null;const o=s;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(s=>!!s);return i.length===0?null:i.join(`
`)}function hc(e){if(e==null)return null;if(typeof e=="number"||typeof e=="boolean")return String(e);const t=Dy(e);let n;if(typeof e=="string")n=e;else if(t)n=t;else try{n=JSON.stringify(e,null,2)}catch{n=String(e)}const i=Wu(n,Py);return i.truncated?`${i.text}

鈥?truncated (${i.total} chars, showing first ${i.text.length}).`:i.text}function Ly(e){const t=[];return t.push({type:"toolcall",name:e.name,arguments:e.args??{}}),e.output&&t.push({type:"toolresult",name:e.name,text:e.output}),{role:"assistant",toolCallId:e.toolCallId,runId:e.runId,content:t,timestamp:e.startedAt}}function Iy(e){if(e.toolStreamOrder.length<=uc)return;const t=e.toolStreamOrder.length-uc,n=e.toolStreamOrder.splice(0,t);for(const i of n)e.toolStreamById.delete(i)}function Oy(e){e.chatToolMessages=e.toolStreamOrder.map(t=>{var n;return(n=e.toolStreamById.get(t))==null?void 0:n.message}).filter(t=>!!t)}function jr(e){e.toolStreamSyncTimer!=null&&(clearTimeout(e.toolStreamSyncTimer),e.toolStreamSyncTimer=null),Oy(e)}function Fy(e,t=!1){if(t){jr(e);return}e.toolStreamSyncTimer==null&&(e.toolStreamSyncTimer=window.setTimeout(()=>jr(e),Ry))}function So(e){e.toolStreamById.clear(),e.toolStreamOrder=[],e.chatToolMessages=[],jr(e)}function Ao(e){e.toolRenderData=null,e.toolRenderSeq=null,e.toolRenderItems=[],e.candidatePreviews=[]}const Ny=5e3;function By(e,t){var s;const n=t.data??{},i=typeof n.phase=="string"?n.phase:"";e.compactionClearTimer!=null&&(window.clearTimeout(e.compactionClearTimer),e.compactionClearTimer=null),i==="start"?e.compactionStatus={active:!0,startedAt:Date.now(),completedAt:null}:i==="end"&&(e.compactionStatus={active:!1,startedAt:((s=e.compactionStatus)==null?void 0:s.startedAt)??null,completedAt:Date.now()},e.compactionClearTimer=window.setTimeout(()=>{e.compactionStatus=null,e.compactionClearTimer=null},Ny))}function sr(e,t){if(!Array.isArray(e.candidatePreviews)||e.candidatePreviews.length===0)return;const n=e.candidatePreviews.findIndex(i=>i.runId===t);n!==-1&&(e.candidatePreviews=[...e.candidatePreviews.slice(0,n),...e.candidatePreviews.slice(n+1)])}function zy(e,t){const n=t.data??{},i=Array.isArray(n.candidates)?n.candidates:[];if(i.length===0)return;Array.isArray(e.candidatePreviews)||(e.candidatePreviews=[]);const s=e.candidatePreviews.length;e.candidatePreviews=[...e.candidatePreviews,{id:`${t.runId}:candidates:${s}`,runId:t.runId,keywords:typeof n.keywords=="string"?n.keywords:"",candidates:i,match_source:typeof n.match_source=="string"?n.match_source:""}]}function Hy(e,t){const n=t.data??{};if(typeof n.formatted_response!="string"||n.formatted_response.trim().length===0){console.warn("[tool_render] malformed payload:",n);return}const i=n.chosen_index;let s=0;if(typeof i=="number"&&Number.isFinite(i))s=i;else if(typeof i=="string"&&i.trim()){const d=Number(i);s=Number.isFinite(d)?d:0}const o=typeof n.match_source=="string"?n.match_source:"";e.toolRenderData={formatted_response:n.formatted_response,chosen:n.chosen??{},chosen_index:s,match_source:o,selection_reasoning:typeof n.selection_reasoning=="string"?n.selection_reasoning:"",batch_mode:!!n.batch_mode,resolved_items:Array.isArray(n.resolved_items)?n.resolved_items:[],pending_items:Array.isArray(n.pending_items)?n.pending_items:[],unmatched_items:Array.isArray(n.unmatched_items)?n.unmatched_items:[]},e.toolRenderSeq=t.seq,Array.isArray(e.toolRenderItems)||(e.toolRenderItems=[]);const r=`${t.runId}:${t.seq}`,a={id:r,runId:t.runId,seq:t.seq,ts:typeof t.ts=="number"?t.ts:Date.now(),sessionKey:typeof t.sessionKey=="string"?t.sessionKey:void 0,payload:e.toolRenderData},l=e.toolRenderItems.find(d=>d.id===r);if(l){l.payload=a.payload,l.ts=a.ts,l.sessionKey=a.sessionKey,sr(e,t.runId);return}const c=e.toolRenderItems.find(d=>d.runId===a.runId&&d.payload.formatted_response===a.payload.formatted_response);if(c){c.seq=a.seq,c.ts=a.ts,c.sessionKey=a.sessionKey,c.payload=a.payload,sr(e,t.runId);return}e.toolRenderItems.push(a),sr(e,t.runId)}function Uy(e,t){if(!t)return;if(t.stream==="compaction"){By(e,t);return}if(t.stream==="tool_candidates"){const u=typeof t.sessionKey=="string"?t.sessionKey:void 0;if(u&&u!==e.sessionKey||!u&&e.chatRunId&&t.runId!==e.chatRunId||e.chatRunId&&t.runId!==e.chatRunId||!e.chatRunId)return;zy(e,t);return}if(t.stream==="tool_render"){const u=typeof t.sessionKey=="string"?t.sessionKey:void 0;if(u&&u!==e.sessionKey||!u&&e.chatRunId&&t.runId!==e.chatRunId||e.chatRunId&&t.runId!==e.chatRunId||!e.chatRunId)return;Hy(e,t);return}if(t.stream!=="tool")return;const n=typeof t.sessionKey=="string"?t.sessionKey:void 0;if(n&&n!==e.sessionKey||!n&&e.chatRunId&&t.runId!==e.chatRunId||e.chatRunId&&t.runId!==e.chatRunId||!e.chatRunId)return;const i=t.data??{},s=typeof i.toolCallId=="string"?i.toolCallId:"";if(!s)return;const o=typeof i.name=="string"?i.name:"tool",r=typeof i.phase=="string"?i.phase:"",a=r==="start"?i.args:void 0,l=r==="update"?hc(i.partialResult):r==="result"?hc(i.result):void 0,c=Date.now();let d=e.toolStreamById.get(s);d?(d.name=o,a!==void 0&&(d.args=a),l!==void 0&&(d.output=l||void 0),d.updatedAt=c):(d={toolCallId:s,runId:t.runId,sessionKey:n,name:o,args:a,output:l||void 0,startedAt:typeof t.ts=="number"?t.ts:c,updatedAt:c,message:{}},e.toolStreamById.set(s,d),e.toolStreamOrder.push(s)),d.message=Ly(d),Iy(e),Fy(e,r==="result")}function or(e){return e==null?"":String(e).trim()}const rr=new WeakMap,ar=new WeakMap;function Kr(e){const t=e,n=typeof t.role=="string"?t.role:"",i=t.content;if(typeof i=="string")return n==="assistant"?Jo(i):or(i);if(Array.isArray(i)){const s=i.map(o=>{const r=o;return r.type==="text"&&typeof r.text=="string"?r.text:null}).filter(o=>typeof o=="string");if(s.length>0){const o=s.join(`
`);return n==="assistant"?Jo(o):or(o)}}return typeof t.text=="string"?n==="assistant"?Jo(t.text):or(t.text):null}function Ai(e){if(!e||typeof e!="object")return Kr(e);const t=e;if(rr.has(t))return rr.get(t)??null;const n=Kr(e);return rr.set(t,n),n}function fc(e){const n=e.content,i=[];if(Array.isArray(n))for(const a of n){const l=a;if(l.type==="thinking"&&typeof l.thinking=="string"){const c=l.thinking.trim();c&&i.push(c)}}if(i.length>0)return i.join(`
`);const s=jy(e);if(!s)return null;const r=[...s.matchAll(/<\s*think(?:ing)?\s*>([\s\S]*?)<\s*\/\s*think(?:ing)?\s*>/gi)].map(a=>(a[1]??"").trim()).filter(Boolean);return r.length>0?r.join(`
`):null}function qy(e){if(!e||typeof e!="object")return fc(e);const t=e;if(ar.has(t))return ar.get(t)??null;const n=fc(e);return ar.set(t,n),n}function jy(e){const t=e,n=t.content;if(typeof n=="string")return n;if(Array.isArray(n)){const i=n.map(s=>{const o=s;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(s=>typeof s=="string");if(i.length>0)return i.join(`
`)}return typeof t.text=="string"?t.text:null}function Ky(e){const t=e.trim();if(!t)return"";const n=t.split(/\r?\n/).map(i=>i.trim()).filter(Boolean).map(i=>`_${i}_`);return n.length?["_Reasoning:_",...n].join(`
`):""}const Sh="【以下为上传图片的识别结果】";function Wy(e){return e.includes(Sh)}function Vy(e){const t=e.indexOf(Sh);return t===-1?e:e.slice(0,t).trim()}let pc=!1;function gc(e){e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t="";for(let n=0;n<e.length;n++)t+=e[n].toString(16).padStart(2,"0");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}function Gy(){const e=new Uint8Array(16),t=Date.now();for(let n=0;n<e.length;n++)e[n]=Math.floor(Math.random()*256);return e[0]^=t&255,e[1]^=t>>>8&255,e[2]^=t>>>16&255,e[3]^=t>>>24&255,e}function Qy(){pc||(pc=!0,console.warn("[uuid] crypto API missing; falling back to weak randomness"))}function Wa(e=globalThis.crypto){if(e&&typeof e.randomUUID=="function")return e.randomUUID();if(e&&typeof e.getRandomValues=="function"){const t=new Uint8Array(16);return e.getRandomValues(t),gc(t)}return Qy(),gc(Gy())}async function Kn(e){if(!(!e.client||!e.connected)){e.chatLoading=!0,e.lastError=null;try{const t=await e.client.request("chat.history",{sessionKey:e.sessionKey,limit:200}),n=Array.isArray(t.messages)?t.messages:[];(n.length>0||e.chatMessages.length===0)&&(e.chatMessages=n),e.chatThinkingLevel=t.thinkingLevel??null}catch(t){e.lastError=String(t)}finally{e.chatLoading=!1}}}function Yy(e){const t=/^data:([^;]+);base64,(.+)$/.exec(e);return t?{mimeType:t[1],content:t[2]}:null}function Xy(e){if(!e||typeof e!="object")return null;const t=e;return t.role!=="assistant"||!("content"in t)||!Array.isArray(t.content)?null:t}async function Jy(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",i=n?`${n}/api/quotation/upload`:"/api/quotation/upload",s=new FormData;s.append("file",t);try{const o=await fetch(i,{method:"POST",body:s,credentials:"same-origin"});if(!o.ok){const l=await o.text();throw new Error(l||`Upload failed: ${o.status}`)}const r=await o.json(),a=(r==null?void 0:r.data)??r;return!a||typeof a.file_path!="string"?null:{file_id:a.file_id??"",file_path:a.file_path,file_name:a.file_name??t.name,summaryMeta:a.summary_meta}}catch(o){throw console.error("uploadChatFile",o),o}}async function Zy(e,t,n,i){if(!e.client||!e.connected)return null;const s=t.trim(),o=n&&n.length>0,r=!!(i!=null&&i.file_name);if(!s&&!o&&!r)return null;const a=Date.now(),l=[];if(s&&l.push({type:"text",text:s}),o)for(const h of n)l.push({type:"image",source:{type:"base64",media_type:h.mimeType,data:h.dataUrl}});i!=null&&i.file_name&&l.push({type:"file",file_name:i.file_name,file_path:i.file_path,summaryMeta:i.summaryMeta}),e.chatMessages=[...e.chatMessages,{role:"user",content:l,timestamp:a}],e.chatSending=!0,e.lastError=null;const c=Wa();e.chatRunId=c,e.chatStream="",e.chatStreamStartedAt=a;const d=o?n.map(h=>{const g=Yy(h.dataUrl);return g?{type:"image",mimeType:g.mimeType,content:g.content}:null}).filter(h=>h!==null):void 0,u=i&&i.file_path?{file_path:i.file_path,...i.file_id?{file_id:i.file_id}:{}}:void 0;try{return await e.client.request("chat.send",{sessionKey:e.sessionKey,message:s,deliver:!1,idempotencyKey:c,attachments:d,...u?{context:u,file_path:i.file_path}:{}}),e.chatUploadedFile=null,c}catch(h){const g=String(h);return e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,e.lastError=g,e.chatMessages=[...e.chatMessages,{role:"assistant",content:[{type:"text",text:"Error: "+g}],timestamp:Date.now()}],null}finally{e.chatSending=!1}}async function ev(e){if(!e.client||!e.connected)return!1;const t=e.chatRunId;try{return await e.client.request("chat.abort",t?{sessionKey:e.sessionKey,runId:t}:{sessionKey:e.sessionKey}),!0}catch(n){return e.lastError=String(n),!1}}function tv(e,t){if(!t||t.sessionKey!==e.sessionKey)return null;if(t.runId&&e.chatRunId&&t.runId!==e.chatRunId)return t.state==="final"?"foreign_final":null;if(t.state==="delta"){const n=Kr(t.message);if(typeof n=="string"){const i=e.chatStream??"";(!i||n.length>=i.length)&&(e.chatStream=n)}}else if(t.state==="final")e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null;else if(t.state==="aborted"){const n=Xy(t.message);if(n)e.chatMessages=[...e.chatMessages,n];else{const i=e.chatStream??"";i.trim()&&(e.chatMessages=[...e.chatMessages,{role:"assistant",content:[{type:"text",text:i}],timestamp:Date.now()}])}e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null}else t.state==="error"&&(e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null,e.lastError=t.errorMessage??"chat error");return t.state}const Ah=120;function Th(e){return e.chatSending||!!e.chatRunId}function nv(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/stop"?!0:n==="stop"||n==="esc"||n==="abort"||n==="wait"||n==="exit"}function iv(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/new"||n==="/reset"?!0:n.startsWith("/new ")||n.startsWith("/reset ")}async function Ch(e){e.connected&&(e.chatMessage="",await ev(e))}function sv(e,t,n,i){const s=t.trim(),o=!!(n&&n.length>0);!s&&!o||(e.chatQueue=[...e.chatQueue,{id:Wa(),text:s,createdAt:Date.now(),attachments:o?n==null?void 0:n.map(r=>({...r})):void 0,refreshSessions:i}])}async function Eh(e,t,n){var o,r;So(e),Ao(e),e.ocrResultCards=[];const i=await Zy(e,t,n==null?void 0:n.attachments,e.chatUploadedFile??void 0),s=!!i;return!s&&(n==null?void 0:n.previousDraft)!=null&&(e.chatMessage=n.previousDraft),!s&&(n!=null&&n.previousAttachments)&&(e.chatAttachments=n.previousAttachments),s&&wh(e,e.sessionKey),s&&(n!=null&&n.restoreDraft)&&((o=n.previousDraft)!=null&&o.trim())&&(e.chatMessage=n.previousDraft),s&&(n!=null&&n.restoreAttachments)&&((r=n.previousAttachments)!=null&&r.length)&&(e.chatAttachments=n.previousAttachments),Vi(e),s&&!e.chatRunId&&Rh(e),s&&(n!=null&&n.refreshSessions)&&i&&e.refreshSessionsAfterChat.add(i),s}async function Rh(e){if(!e.connected||Th(e))return;const[t,...n]=e.chatQueue;if(!t)return;e.chatQueue=n,await Eh(e,t.text,{attachments:t.attachments,refreshSessions:t.refreshSessions})||(e.chatQueue=[t,...e.chatQueue])}function ov(e,t){e.chatQueue=e.chatQueue.filter(n=>n.id!==t)}async function rv(e,t,n){var d;if(!e.connected)return;const i=e.chatMessage,s=(t??e.chatMessage).trim(),o=e.chatAttachments??[],r=t==null?o:[],a=r.length>0,l=!!((d=e.chatUploadedFile)!=null&&d.file_name);if(!s&&!a&&!l)return;if(nv(s)){await Ch(e);return}const c=iv(s);if(t==null&&(e.chatMessage="",e.chatAttachments=[]),Th(e)){sv(e,s,r,c);return}await Eh(e,s,{previousDraft:t==null?i:void 0,restoreDraft:!!(t&&(n!=null&&n.restoreDraft)),attachments:a?r:void 0,previousAttachments:t==null?o:void 0,restoreAttachments:!!(t&&(n!=null&&n.restoreDraft)),refreshSessions:c})}async function Ph(e,t){await Promise.all([Kn(e),qa(e,{activeMinutes:Ah}),Wr(e)]),(t==null?void 0:t.scheduleScroll)!==!1&&Vi(e)}const av=Rh;function lv(e){var s,o,r;const t=zu(e.sessionKey);if(t!=null&&t.agentId)return t.agentId;const n=(s=e.hello)==null?void 0:s.snapshot;return((r=(o=n==null?void 0:n.sessionDefaults)==null?void 0:o.defaultAgentId)==null?void 0:r.trim())||"main"}function cv(e,t){const n=Jn(e),i=encodeURIComponent(t);return n?`${n}/avatar/${i}?meta=1`:`/avatar/${i}?meta=1`}async function Wr(e){if(!e.connected){e.chatAvatarUrl=null;return}const t=lv(e);if(!t){e.chatAvatarUrl=null;return}e.chatAvatarUrl=null;const n=cv(e.basePath,t);try{const i=await fetch(n,{method:"GET"});if(!i.ok){e.chatAvatarUrl=null;return}const s=await i.json(),o=typeof s.avatarUrl=="string"?s.avatarUrl.trim():"";e.chatAvatarUrl=o||null}catch{e.chatAvatarUrl=null}}const dv={trace:!0,debug:!0,info:!0,warn:!0,error:!0,fatal:!0},uv={name:"",description:"",agentId:"",enabled:!0,scheduleKind:"every",scheduleAt:"",everyAmount:"30",everyUnit:"minutes",cronExpr:"0 7 * * *",cronTz:"",sessionTarget:"isolated",wakeMode:"now",payloadKind:"agentTurn",payloadText:"",deliveryMode:"announce",deliveryChannel:"last",deliveryTo:"",timeoutSeconds:""},hv=50,fv=200,pv="PT Vansting Agent";function mc(e,t){if(typeof e!="string")return;const n=e.trim();if(n)return n.length<=t?n:n.slice(0,t)}function Va(e){const t=mc(e==null?void 0:e.name,hv)??pv,n=mc((e==null?void 0:e.avatar)??void 0,fv)??null;return{agentId:typeof(e==null?void 0:e.agentId)=="string"&&e.agentId.trim()?e.agentId.trim():null,name:t,avatar:n}}async function Mh(e,t){if(!e.client||!e.connected)return;const n=e.sessionKey.trim(),i=n?{sessionKey:n}:{};try{const s=await e.client.request("agent.identity.get",i);if(!s)return;const o=Va(s);e.assistantName=o.name,e.assistantAvatar=o.avatar,e.assistantAgentId=o.agentId??null}catch{}}function Vr(e){return typeof e=="object"&&e!==null}function gv(e){if(!Vr(e))return null;const t=typeof e.id=="string"?e.id.trim():"",n=e.request;if(!t||!Vr(n))return null;const i=typeof n.command=="string"?n.command.trim():"";if(!i)return null;const s=typeof e.createdAtMs=="number"?e.createdAtMs:0,o=typeof e.expiresAtMs=="number"?e.expiresAtMs:0;return!s||!o?null:{id:t,request:{command:i,cwd:typeof n.cwd=="string"?n.cwd:null,host:typeof n.host=="string"?n.host:null,security:typeof n.security=="string"?n.security:null,ask:typeof n.ask=="string"?n.ask:null,agentId:typeof n.agentId=="string"?n.agentId:null,resolvedPath:typeof n.resolvedPath=="string"?n.resolvedPath:null,sessionKey:typeof n.sessionKey=="string"?n.sessionKey:null},createdAtMs:s,expiresAtMs:o}}function mv(e){if(!Vr(e))return null;const t=typeof e.id=="string"?e.id.trim():"";return t?{id:t,decision:typeof e.decision=="string"?e.decision:null,resolvedBy:typeof e.resolvedBy=="string"?e.resolvedBy:null,ts:typeof e.ts=="number"?e.ts:null}:null}function Dh(e){const t=Date.now();return e.filter(n=>n.expiresAtMs>t)}function yv(e,t){const n=Dh(e).filter(i=>i.id!==t.id);return n.push(t),n}function yc(e,t){return Dh(e).filter(n=>n.id!==t)}function vv(e){return{}}const vc={WEBCHAT:"webchat"},bc={CONTROL_UI:"control-ui"},bv=4008;class wv{constructor(t){this.opts=t,this.ws=null,this.pending=new Map,this.closed=!1,this.lastSeq=null,this.connectNonce=null,this.connectSent=!1,this.connectTimer=null,this.backoffMs=800}start(){this.closed=!1,this.connect()}stop(){var t;this.closed=!0,(t=this.ws)==null||t.close(),this.ws=null,this.flushPending(new Error("gateway client stopped"))}get connected(){var t;return((t=this.ws)==null?void 0:t.readyState)===WebSocket.OPEN}connect(){this.closed||(this.ws=new WebSocket(this.opts.url),this.ws.addEventListener("open",()=>this.queueConnect()),this.ws.addEventListener("message",t=>this.handleMessage(String(t.data??""))),this.ws.addEventListener("close",t=>{var i,s;const n=String(t.reason??"");this.ws=null,this.flushPending(new Error(`gateway closed (${t.code}): ${n}`)),(s=(i=this.opts).onClose)==null||s.call(i,{code:t.code,reason:n}),this.scheduleReconnect()}),this.ws.addEventListener("error",()=>{}))}scheduleReconnect(){if(this.closed)return;const t=this.backoffMs;this.backoffMs=Math.min(this.backoffMs*1.7,15e3),window.setTimeout(()=>this.connect(),t)}flushPending(t){for(const[,n]of this.pending)n.reject(t);this.pending.clear()}async sendConnect(){var d;if(this.connectSent)return;this.connectSent=!0,this.connectTimer!==null&&(window.clearTimeout(this.connectTimer),this.connectTimer=null);const t=typeof crypto<"u"&&!!crypto.subtle,n=["operator.admin","operator.approvals","operator.pairing"],i="operator";let s=null,o=!1,r=this.opts.token;if(t){s=await Ha();const u=(d=em({deviceId:s.deviceId,role:i}))==null?void 0:d.token;r=u??this.opts.token,o=!!(u&&this.opts.token)}const a=r||this.opts.password?{token:r,password:this.opts.password}:void 0;let l;if(t&&s){const u=Date.now(),h=this.connectNonce??void 0,g=vv({deviceId:s.deviceId,clientId:this.opts.clientName??bc.CONTROL_UI,clientMode:this.opts.mode??vc.WEBCHAT}),m=await Sm(s.privateKey,g);l={id:s.deviceId,publicKey:s.publicKey,signature:m,signedAt:u,nonce:h}}const c={minProtocol:3,maxProtocol:3,client:{id:this.opts.clientName??bc.CONTROL_UI,version:this.opts.clientVersion??"dev",platform:this.opts.platform??navigator.platform??"web",mode:this.opts.mode??vc.WEBCHAT,instanceId:this.opts.instanceId},role:i,scopes:n,device:l,caps:[],auth:a,userAgent:navigator.userAgent,locale:navigator.language};this.request("connect",c).then(u=>{var h,g,m;(h=u==null?void 0:u.auth)!=null&&h.deviceToken&&s&&Ju({deviceId:s.deviceId,role:u.auth.role??i,token:u.auth.deviceToken,scopes:u.auth.scopes??[]}),this.backoffMs=800,(m=(g=this.opts).onHello)==null||m.call(g,u)}).catch(()=>{var u;o&&s&&Zu({deviceId:s.deviceId,role:i}),(u=this.ws)==null||u.close(bv,"connect failed")})}handleMessage(t){var s,o,r,a,l;let n;try{n=JSON.parse(t)}catch{return}const i=n;if(i.type==="event"){const c=n;if(c.event==="connect.challenge"){const u=c.payload,h=u&&typeof u.nonce=="string"?u.nonce:null;h&&(this.connectNonce=h,this.sendConnect());return}const d=typeof c.seq=="number"?c.seq:null;d!==null&&(this.lastSeq!==null&&d>this.lastSeq+1&&((o=(s=this.opts).onGap)==null||o.call(s,{expected:this.lastSeq+1,received:d})),this.lastSeq=d);try{(a=(r=this.opts).onEvent)==null||a.call(r,c)}catch(u){console.error("[gateway] event handler error:",u)}return}if(i.type==="res"){const c=n,d=this.pending.get(c.id);if(!d)return;this.pending.delete(c.id),c.ok?d.resolve(c.payload):d.reject(new Error(((l=c.error)==null?void 0:l.message)??"request failed"));return}}request(t,n){if(!this.ws||this.ws.readyState!==WebSocket.OPEN)return Promise.reject(new Error("gateway not connected"));const i=Wa(),s={type:"req",id:i,method:t,params:n},o=new Promise((r,a)=>{this.pending.set(i,{resolve:l=>r(l),reject:a})});return this.ws.send(JSON.stringify(s)),o}queueConnect(){this.connectNonce=null,this.connectSent=!1,this.connectTimer!==null&&window.clearTimeout(this.connectTimer),this.connectTimer=window.setTimeout(()=>{this.sendConnect()},750)}}function lr(e,t){var a,l,c;const n=(e??"").trim(),i=(a=t.mainSessionKey)==null?void 0:a.trim();if(!i)return n;if(!n)return i;const s=((l=t.mainKey)==null?void 0:l.trim())||"main",o=(c=t.defaultAgentId)==null?void 0:c.trim();return n==="main"||n===s||o&&(n===`agent:${o}:main`||n===`agent:${o}:${s}`)?i:n}function xv(e,t){if(!(t!=null&&t.mainSessionKey))return;const n=lr(e.sessionKey,t),i=lr(e.settings.sessionKey,t),s=lr(e.settings.lastActiveSessionKey,t),o=n||i||e.sessionKey,r={...e.settings,sessionKey:i||o,lastActiveSessionKey:s||o},a=r.sessionKey!==e.settings.sessionKey||r.lastActiveSessionKey!==e.settings.lastActiveSessionKey;o!==e.sessionKey&&(e.sessionKey=o),a&&Bt(e,r)}function Lh(e){e.lastError=null,e.hello=null,e.connected=!1,e.execApprovalQueue=[],e.execApprovalError=null;const t=e.client,n=new wv({url:e.settings.gatewayUrl,token:e.settings.token.trim()?e.settings.token:void 0,password:e.password.trim()?e.password:void 0,clientName:"openclaw-control-ui",mode:"webchat",onHello:i=>{if(e.client===n){if(e.connected=!0,e.lastError=null,e.hello=i,$v(e,i),e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,So(e),Ao(e),e.ocrResultCards=[],Mh(e),Pa(e),mo(e,{quiet:!0}),Kt(e,{quiet:!0}),e.pendingVisibleRefreshHandler&&typeof document<"u"&&(document.removeEventListener("visibilitychange",e.pendingVisibleRefreshHandler),e.pendingVisibleRefreshHandler=null),typeof document>"u"||document.visibilityState==="visible")Ys(e);else if(typeof document<"u"){const s=()=>{document.visibilityState==="visible"&&(document.removeEventListener("visibilitychange",s),e.pendingVisibleRefreshHandler=null,!(e.client!==n||!e.connected)&&Ys(e))};e.pendingVisibleRefreshHandler=s,document.addEventListener("visibilitychange",s)}}},onClose:({code:i,reason:s})=>{e.client===n&&(e.connected=!1,i!==1012&&(e.lastError=`disconnected (${i}): ${s||"no reason"}`))},onEvent:i=>{e.client===n&&_v(e,i)},onGap:({expected:i,received:s})=>{e.client===n&&(e.lastError=`event gap detected (expected seq ${i}, got ${s}); refresh recommended`)}});e.client=n,t==null||t.stop(),n.start()}function _v(e,t){try{kv(e,t)}catch(n){console.error("[gateway] handleGatewayEvent error:",t.event,n)}}function kv(e,t){if(e.eventLogBuffer=[{ts:Date.now(),event:t.event,payload:t.payload},...e.eventLogBuffer].slice(0,250),e.tab==="debug"&&(e.eventLog=e.eventLogBuffer),t.event==="agent"){if(e.onboarding)return;Uy(e,t.payload);return}if(t.event==="chat"){const n=t.payload;n!=null&&n.sessionKey&&wh(e,n.sessionKey);const i=tv(e,n);let s=!1;if(i==="final"||i==="error"||i==="aborted"){So(e),Ao(e),av(e);const o=n==null?void 0:n.runId;o&&e.refreshSessionsAfterChat.has(o)&&(e.refreshSessionsAfterChat.delete(o),i==="final"&&qa(e,{activeMinutes:Ah})),i==="final"&&(n!=null&&n.newSessionKey)&&(e.sessionKey=n.newSessionKey,e.chatMessage="",e.chatAttachments=[],e.chatUploadedFile=null,e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.chatQueue=[],e.chatMessages=[],e.lastError=null,e.chatThinkingLevel=null,e.compactionStatus=null,e.compactionClearTimer!=null&&(clearTimeout(e.compactionClearTimer),e.compactionClearTimer=null),e.resetToolStream(),e.resetToolRender(),e.ocrResultCards=[],e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:n.newSessionKey,lastActiveSessionKey:n.newSessionKey}),e.loadAssistantIdentity(),Kn(e),s=!0)}(i==="final"||i==="foreign_final")&&(s||Kn(e));return}if(t.event==="presence"){const n=t.payload;n!=null&&n.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence,e.presenceError=null,e.presenceStatus=null);return}if(t.event==="cron"&&e.tab==="cron"&&$h(e),t.event==="ocr_result"){const n=t.payload,i=((n==null?void 0:n.text)??"").trim();if(i){const s=e;s.ocrResultCards=[...s.ocrResultCards,{id:`ocr-${Date.now()}`,text:i,createdAt:Date.now()}],s.requestUpdate()}return}if((t.event==="device.pair.requested"||t.event==="device.pair.resolved")&&Kt(e,{quiet:!0}),t.event==="exec.approval.requested"){const n=gv(t.payload);if(n){e.execApprovalQueue=yv(e.execApprovalQueue,n),e.execApprovalError=null;const i=Math.max(0,n.expiresAtMs-Date.now()+500);window.setTimeout(()=>{e.execApprovalQueue=yc(e.execApprovalQueue,n.id)},i)}return}if(t.event==="exec.approval.resolved"){const n=mv(t.payload);n&&(e.execApprovalQueue=yc(e.execApprovalQueue,n.id))}}function $v(e,t){const n=t.snapshot;n!=null&&n.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence),n!=null&&n.health&&(e.debugHealth=n.health),n!=null&&n.sessionDefaults&&xv(e,n.sessionDefaults)}const wc="/api/bootstrap";async function Sv(e){if(typeof window>"u"||typeof fetch!="function")return;const t=Jn(e.basePath??""),n=t?`${t}${wc}`:wc;try{const i=await fetch(n,{method:"GET",headers:{Accept:"application/json"},credentials:"same-origin"});if(!i.ok)return;const s=await i.json(),o=Va({agentId:s.assistantAgentId??null,name:s.assistantName,avatar:s.assistantAvatar??null});e.assistantName=o.name,e.assistantAvatar=o.avatar,e.assistantAgentId=o.agentId??null}catch{}}const Av="Untitled quotation",Tv=24e4,Cv=12e4,Ih=1,Oh=800,xc=new WeakMap,Ev={idle:["running"],running:["awaiting_choices","done","error","idle"],awaiting_choices:["resuming","running","error","idle"],resuming:["awaiting_choices","done","error","idle"],done:["running","idle","error"],error:["running","idle","resuming"]};class gt extends Error{constructor(t){super(t),this.name="RetryableWorkError"}}class Gr extends Error{constructor(t){super(t),this.name="RunIdInvalidError"}}function Xi(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}function Zn(e){let t=xc.get(e);return t||(t={controller:null,cancelRequested:!1,timeoutReached:!1},xc.set(e,t)),t}function Xs(e,t){const n=e.workRunStatus;if(n===t)return;if(!(Ev[n]??[]).includes(t))throw new Error(`invalid work state transition: ${n} -> ${t}`);e.workRunStatus=t}function Nn(e,t){e.workRunStatus=t}function Ga(e){e.workRunId=null,e.workPendingChoices=[],e.workSelections={}}function Fh(e){return(e||"").trim().replace(/\\/g,"/").toLowerCase()}function Rv(e,t){const n=(t.file_path||"").trim();if(n){const i=e.workOriginalFileNamesByPath[Fh(n)];if(typeof i=="string"&&i.trim())return i.trim()}return Ji(t)}function Ji(e){var i,s;const t=(i=e==null?void 0:e.name)==null?void 0:i.trim();if(t)return t;const n=(s=e==null?void 0:e.file_path)==null?void 0:s.trim();if(n){const o=n.replace(/\\/g,"/").split("/").filter(Boolean).pop();if(o)return o}return Av}function Pv(e){try{if(typeof e!="string"||!e.trim())return null;const t=e.trim();return t.startsWith("{")&&t.endsWith("}")||t.startsWith("[")&&t.endsWith("]")?JSON.parse(t):null}catch{return null}}function cr(e){if(typeof e!="string")return!1;const t=e.trim().toLowerCase();return t?t==="__oos__"||t==="oos"||t==="无货":!1}function Mv(e){const t=Array.isArray(e.fill_items_merged)?e.fill_items_merged:[];if(!t.length)return null;const n=Array.isArray(e.items)?e.items:[],i=Array.isArray(e.shortage)?e.shortage:[],s=new Map;for(const r of n)s.set(r.row,r);const o=t.map((r,a)=>{const l=r.row,c=s.get(l)??{},d=Number(r.qty??0),u=r.unit_price,h=u==null?null:Number(u),g=h==null||Number.isNaN(h)?null:h*d,m=String(r.code??""),y=String(r.quote_name??"").trim();let _=0,S=0,R=0;for(const A of i)if(A.row===l){S=Number(A.warehouse_qty??A.qty_warehouse??A.available_qty??0),_=Number(A.available_qty??0),R=Number(A.shortfall??0);break}const M=cr(m)||y.includes("库存不足");return!M&&R===0&&S===0&&m&&!cr(m)&&(S=d),!M&&R===0&&_===0&&m&&!cr(m)&&(_=d),{row_index:a,row:typeof l=="number"?l:void 0,product_name:String(c.product_name??""),specification:String(r.specification??c.specification??""),qty:d,code:m,quote_name:y,quote_spec:String(r.quote_spec??""),unit_price:h,amount:g,warehouse_qty:S,available_qty:_,shortfall:R,is_shortage:M?1:0,match_source:null}});return{name:Ji({name:typeof e.name=="string"?e.name:"",file_path:typeof e.file_path=="string"?e.file_path:null}),file_path:typeof e.file_path=="string"?e.file_path:null,source:"file",lines:o}}function Dv(e){if(!Array.isArray(e))return null;let t=null;for(const n of e){const i=n.type,s=n.content;if(i!=="observation"||typeof s!="string")continue;const o=Pv(s);if(!o||typeof o!="object")continue;const r=o.pending_quotation_draft;if(r&&Array.isArray(r.lines)){t={...r,name:Ji(r)};continue}const a=Mv(o);a&&(t=a)}return t}function Lv(e){const t=se(e,"/api/work","pending_choices[]"),i=qt(t.options,"/api/work","pending_choices[].options").map(s=>{const o=se(s,"/api/work","pending_choices[].options[]");return{code:It(o.code,"/api/work","pending_choices[].options[].code"),matched_name:K(o.matched_name),unit_price:be(o.unit_price),reasoning:K(o.reasoning)}});return{id:It(t.id,"/api/work","pending_choices[].id"),row:be(t.row),keywords:K(t.keywords),product_name:K(t.product_name),specification:K(t.specification),qty:be(t.qty)??K(t.qty),options:i}}function Iv(e){const t=se(e,"/api/work","pending_quotation_draft"),i=qt(t.lines,"/api/work","pending_quotation_draft.lines").map((s,o)=>{const r=se(s,"/api/work","pending_quotation_draft.lines[]"),a=be(r.qty)??Number(r.qty??0),l=r.unit_price==null?null:Number(r.unit_price);return{row_index:be(r.row_index)??o,row:be(r.row),product_name:K(r.product_name),specification:K(r.specification),qty:Number.isFinite(a)?a:0,code:K(r.code),quote_name:K(r.quote_name),quote_spec:K(r.quote_spec),unit_price:l==null||Number.isNaN(l)?null:l,amount:r.amount==null?null:Number(r.amount),warehouse_qty:be(r.warehouse_qty),available_qty:be(r.available_qty)??Number(r.available_qty??0),shortfall:be(r.shortfall)??Number(r.shortfall??0),is_shortage:be(r.is_shortage)??(Da(r.is_shortage)?1:0),match_source:K(r.match_source)??null}});return{name:Ji({name:K(t.name)??"",file_path:K(t.file_path)??null}),file_path:K(t.file_path)??null,source:K(t.source)??"file",lines:i}}function Qr(e,t){const n=se(e,t),s=(K(n.status)??"done")==="awaiting_choices"?"awaiting_choices":"done",o={status:s,success:Da(n.success)??!0,answer:K(n.answer)??"",trace:Array.isArray(n.trace)?n.trace:[],error:K(n.error)};if(n.pending_quotation_draft!=null&&(o.pending_quotation_draft=Iv(n.pending_quotation_draft)),s==="awaiting_choices"){o.run_id=It(n.run_id,t,"run_id");const r=qt(n.pending_choices,t,"pending_choices");o.pending_choices=r.map(a=>Lv(a))}return o}function Yr(e,t){if(e.workResult={success:t.success,answer:t.answer,trace:t.trace,error:t.error},e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null,t.status==="awaiting_choices"){Xs(e,"awaiting_choices"),e.workRunId=t.run_id??null,e.workPendingChoices=t.pending_choices??[];const n={};for(const i of e.workPendingChoices)n[i.id]="__OOS__";e.workSelections=n;return}if(Ga(e),t.pending_quotation_draft&&Array.isArray(t.pending_quotation_draft.lines))e.workPendingQuotationDraft={...t.pending_quotation_draft,name:Ji(t.pending_quotation_draft)};else{const n=Dv(t.trace);n&&(e.workPendingQuotationDraft=n)}t.success===!1||t.error&&t.error.trim()?(Nn(e,"error"),e.workError=de("执行报价流程",t.error??"后端返回失败状态","本次报价流程未完成","点击“重试”重新运行，或检查后端日志")):Xs(e,"done")}function Nh(e){return new Promise(t=>setTimeout(t,e))}function Bh(e){return e===408||e===429||e===500||e===502||e===503||e===504}function zh(e,t){const n=Zn(e),i=new AbortController;n.controller=i,n.timeoutReached=!1;const s=setTimeout(()=>{n.timeoutReached=!0,i.abort("timeout")},t);return{signal:i.signal,close:()=>{clearTimeout(s),n.controller===i&&(n.controller=null)}}}function Js(e){return e instanceof Error?e.name==="AbortError"||/aborted/i.test(e.message):!1}function Ov(e,t){Nn(e,"error"),Ga(e),e.workResult={success:!1,error:t},e.workError=de("执行报价流程",t,"流程被中断，未产出有效结果","点击“重试”再次执行")}function Qa(e){Nn(e,"idle"),e.workError="已取消当前流程。",e.workResult=null}async function Fv(e,t){const n={file_paths:e.workFilePaths,customer_level:e.workCustomerLevel,do_register_oos:e.workDoRegisterOos},{signal:i,close:s}=zh(e,Tv);try{const o=await fetch(Xi(e.basePath,t),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n),credentials:"same-origin",signal:i});if(!o.ok||!o.body){const d=await o.json().catch(()=>({})),u=Ee(d,`HTTP ${o.status}`);throw Bh(o.status)?new gt(u):new Error(u)}const r=o.body.getReader(),a=new TextDecoder;let l="",c=!1;for(;;){const{done:d,value:u}=await r.read();if(d)break;l+=a.decode(u,{stream:!0});const h=l.split(`
`);l=h.pop()??"";for(const g of h){if(!g.startsWith("data: "))continue;const m=g.slice(6).trim();if(!m)continue;const y=se(JSON.parse(m),t,"stream_event"),_=It(y.type,t,"stream_event.type");if(_==="stage"){const S=be(y.stage)??Number(y.stage);if(!Number.isFinite(S))throw new me(t,"stage must be a number");e.workProgressStage=S}else if(_==="result"){const S=Qr(y.payload,t);Yr(e,S),c=!0;break}}if(c)break}if(!c&&l.startsWith("data: ")){const d=l.slice(6).trim();if(d){const u=se(JSON.parse(d),t,"stream_event_tail");if(u.type==="result"){const h=Qr(u.payload,t);Yr(e,h),c=!0}}}if(!c)throw new me(t,"stream ended without result event")}catch(o){const r=Zn(e);throw r.cancelRequested?new Error("__WORK_CANCELLED__"):Js(o)&&r.timeoutReached?new gt("请求超时"):Js(o)?new Error("请求已中断"):o instanceof me||o instanceof gt?o:o instanceof Error&&/network|failed to fetch|load failed/i.test(o.message)?new gt(o.message):o}finally{s()}}function Nv(e,t){if(e===404||e===410)return!0;const n=Ee(t,"").toLowerCase();return n.includes("run_id")||n.includes("run id")}async function Bv(e,t,n){const i="/api/work/resume",{signal:s,close:o}=zh(e,Cv);try{const r=await fetch(Xi(e.basePath,i),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({run_id:t,selections:n}),credentials:"same-origin",signal:s}),a=await r.json().catch(()=>({}));if(!r.ok){if(Nv(r.status,a))throw new Gr(Ee(a,"run_id 已失效"));const c=Ee(a,`HTTP ${r.status}`);throw Bh(r.status)?new gt(c):new Error(c)}const l=Qr(a,i);Yr(e,l)}catch(r){const a=Zn(e);throw a.cancelRequested?new Error("__WORK_CANCELLED__"):r instanceof Gr?r:Js(r)&&a.timeoutReached?new gt("请求超时"):Js(r)?new Error("请求已中断"):r instanceof me||r instanceof gt?r:r instanceof Error&&/network|failed to fetch|load failed/i.test(r.message)?new gt(r.message):r}finally{o()}}function zv(e){var n;const t=Zn(e);t.cancelRequested=!0,(n=t.controller)==null||n.abort("user_cancel"),Qa(e),e.workRunning=!1}async function Hh(e){if(!e.workFilePaths.length){e.workError="请先上传至少一个报价单文件";return}const t=Zn(e);t.cancelRequested=!1,e.workRunning=!0,e.workError=null,e.workResult=null,e.workRunId=null,e.workPendingChoices=[],e.workSelections={},e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null,Xs(e,"running");let n=0;try{for(;;){n+=1;try{await Fv(e,"/api/work/run-stream");break}catch(i){if(i instanceof Error&&i.message==="__WORK_CANCELLED__"){Qa(e);break}if(i instanceof gt&&n<=Ih){await Nh(Oh*n);continue}const s=i instanceof me||i instanceof Error?i.message:String(i);Ov(e,s);break}}}finally{e.workRunning=!1}}async function Uh(e){const t=e.workRunId;if(!t||e.workPendingChoices.length===0){e.workError="缺少可继续的 run_id，请重新执行。",Nn(e,"error");return}const n=e.workPendingChoices.map(o=>({item_id:o.id,selected_code:e.workSelections[o.id]??"__OOS__"})),i=Zn(e);i.cancelRequested=!1,e.workRunning=!0,e.workError=null,Xs(e,"resuming");let s=0;try{for(;;){s+=1;try{await Bv(e,t,n);break}catch(o){if(o instanceof Error&&o.message==="__WORK_CANCELLED__"){Qa(e);break}if(o instanceof Gr){Ga(e),e.workResult={success:!1,error:o.message},e.workError=de("继续流程",o.message,"当前待选项无法继续提交","请重新执行一次 Work 流程"),Nn(e,"error");break}if(o instanceof gt&&s<=Ih){await Nh(Oh*s);continue}const r=o instanceof me||o instanceof Error?o.message:String(o);e.workResult={success:!1,error:r},e.workError=de("继续流程",r,"本次续跑失败，尚未生成完整结果","点击“重试”继续，或重新执行 Work"),Nn(e,"error");break}}}finally{e.workRunning=!1}}async function Hv(e){if(e.workRunId&&e.workPendingChoices.length>0){await Uh(e);return}await Hh(e)}async function Uv(e){const t=(e.workTextInput||"").trim();if(!t)return e.workTextError="请输入产品描述文字",!1;e.workTextGenerating=!0,e.workTextError=null;try{const n=await fetch(Xi(e.basePath,"/api/quotation/from-text"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t}),credentials:"same-origin"}),i=await n.json().catch(()=>({}));if(!n.ok){let a=typeof i.detail=="string"?i.detail:Ee(i,`HTTP ${n.status}`);return n.status===405&&(a="Method Not Allowed：该接口需 POST。请确认使用 python start.py 或 run_backend.py 启动前后端一体服务，且未通过仅支持 GET 的静态托管访问页面。"),e.workTextError=a,!1}const s=i&&typeof i.data=="object"?i.data:i,o=[],r={};if(Array.isArray(s.file_paths)){const a=Array.isArray(s.file_names)?s.file_names:[];s.file_paths.forEach((l,c)=>{if(typeof l!="string"||!l.trim())return;const d=l.trim();o.push(d);const u=typeof a[c]=="string"?a[c]:"";r[d]=u||d.split(/[/\\]/).pop()||d})}if(typeof s.file_path=="string"&&s.file_path.trim()){const a=s.file_path.trim();o.includes(a)||o.push(a);const l=typeof s.file_name=="string"?s.file_name:"";r[a]=l||a.split(/[/\\]/).pop()||a}if(!o.length)return e.workTextError="接口未返回 file_path/file_paths",!1;for(const a of o){e.workFilePaths.includes(a)||(e.workFilePaths=[...e.workFilePaths,a]);const l=Fh(a);if(l){const c=(r[a]||"").trim()||a.split(/[/\\]/).pop()||a;e.workOriginalFileNamesByPath={...e.workOriginalFileNamesByPath,[l]:c}}}return e.workTextError=null,!0}catch(n){const i=n instanceof Error?n.message:String(n);return e.workTextError=de("从文字生成报价单",i,"未生成文件","请检查网络或后端后重试"),!1}finally{e.workTextGenerating=!1}}async function qv(e){try{const t=Xi(e.basePath,"/api/config/price-levels"),n=await fetch(t);if(!n.ok)throw new Error(`HTTP ${n.status}`);const i=await n.json();i.success&&Array.isArray(i.data)&&(e.workPriceLevelOptions=i.data)}catch(t){console.warn("[work] 加载价格档位失败，使用本地默认值",t)}}async function jv(e){var n;const t=e.workPendingQuotationDraft;if(!((n=t==null?void 0:t.lines)!=null&&n.length))return e.workQuotationDraftSaveStatus={status:"error",error:"无报价明细可保存"},!1;e.workQuotationDraftSaveStatus={status:"saving"};try{const i=await fetch(Xi(e.basePath,"/api/quotation-drafts"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:Rv(e,t),source:t.source||"file",file_path:t.file_path??void 0,lines:t.lines.map(u=>({product_name:u.product_name??"",specification:u.specification??"",qty:Number(u.qty)||0,code:u.code??"",quote_name:u.quote_name??"",quote_spec:u.quote_spec??"",unit_price:u.unit_price!=null?Number(u.unit_price):null,amount:u.amount!=null?Number(u.amount):null,available_qty:Number(u.warehouse_qty??u.available_qty)||0,shortfall:Number(u.shortfall)||0,is_shortage:u.is_shortage?1:0,match_source:u.match_source??null}))}),credentials:"same-origin"}),s=await i.json().catch(()=>({}));if(!i.ok)return e.workQuotationDraftSaveStatus={status:"error",error:de("保存报价单",Ee(s,`HTTP ${i.status}`),"报价单仍停留在待保存状态","点击“重试”再次保存")},!1;const o=se(s,"/api/quotation-drafts"),r=Da(o.success),a=se(o.data,"/api/quotation-drafts","data"),l=It(a.draft_no,"/api/quotation-drafts","data.draft_no"),c=be(a.draft_id)??Number(a.draft_id),d=Number.isFinite(c)?c:0;if(r===!1)throw new me("/api/quotation-drafts","success is false");return e.workQuotationDraftSaveStatus={status:"ok",draft_no:l,draft_id:d},e.workPendingQuotationDraft=null,!0}catch(i){const s=i instanceof me||i instanceof Error?i.message:String(i);return e.workQuotationDraftSaveStatus={status:"error",error:de("保存报价单",s,"报价单仍停留在待保存状态","检查数据后重试")},!1}}function Kv(e){e.basePath=xy(),Sv(e),qv(e),vy(e),Sy(e,!0),_y(e),ky(e),window.addEventListener("popstate",e.popStateHandler),Lh(e),Sg(e),e.tab==="logs"&&Ta(e),e.tab==="debug"&&Ea(e)}function Wv(e){vg(e)}function Vv(e){var t;window.removeEventListener("popstate",e.popStateHandler),Ag(e),Ca(e),Ra(e),$y(e),(t=e.topbarObserver)==null||t.disconnect(),e.topbarObserver=null}function Gv(e,t){if(!(e.tab==="chat"&&e.chatManualRefreshInFlight)){if(e.tab==="chat"&&(t.has("chatMessages")||t.has("chatToolMessages")||t.has("chatStream")||t.has("chatLoading")||t.has("tab"))){const n=t.has("tab"),i=t.has("chatLoading")&&t.get("chatLoading")===!0&&!e.chatLoading;Vi(e,n||i||!e.chatHasAutoScrolled)}e.tab==="logs"&&(t.has("logsEntries")||t.has("logsAutoFollow")||t.has("tab"))&&e.logsAutoFollow&&e.logsAtBottom&&Hu(e,t.has("tab")||t.has("logsAutoFollow"))}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ya={CHILD:2},Xa=e=>(...t)=>({_$litDirective$:e,values:t});let Ja=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,i){this._$Ct=t,this._$AM=n,this._$Ci=i}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Xr extends Ja{constructor(t){if(super(t),this.it=k,t.type!==Ya.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===k||t==null)return this._t=void 0,this.it=t;if(t===Nt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}Xr.directiveName="unsafeHTML",Xr.resultType=1;const Wn=Xa(Xr);/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:qh,setPrototypeOf:_c,isFrozen:Qv,getPrototypeOf:Yv,getOwnPropertyDescriptor:Xv}=Object;let{freeze:De,seal:Ve,create:Jr}=Object,{apply:Zr,construct:ea}=typeof Reflect<"u"&&Reflect;De||(De=function(t){return t});Ve||(Ve=function(t){return t});Zr||(Zr=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),o=2;o<i;o++)s[o-2]=arguments[o];return t.apply(n,s)});ea||(ea=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const gs=Le(Array.prototype.forEach),Jv=Le(Array.prototype.lastIndexOf),kc=Le(Array.prototype.pop),si=Le(Array.prototype.push),Zv=Le(Array.prototype.splice),zs=Le(String.prototype.toLowerCase),dr=Le(String.prototype.toString),ur=Le(String.prototype.match),oi=Le(String.prototype.replace),eb=Le(String.prototype.indexOf),tb=Le(String.prototype.trim),Qe=Le(Object.prototype.hasOwnProperty),Pe=Le(RegExp.prototype.test),ri=nb(TypeError);function Le(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return Zr(e,t,i)}}function nb(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return ea(e,n)}}function Q(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:zs;_c&&_c(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const o=n(s);o!==s&&(Qv(t)||(t[i]=o),s=o)}e[s]=!0}return e}function ib(e){for(let t=0;t<e.length;t++)Qe(e,t)||(e[t]=null);return e}function at(e){const t=Jr(null);for(const[n,i]of qh(e))Qe(e,n)&&(Array.isArray(i)?t[n]=ib(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=at(i):t[n]=i);return t}function ai(e,t){for(;e!==null;){const i=Xv(e,t);if(i){if(i.get)return Le(i.get);if(typeof i.value=="function")return Le(i.value)}e=Yv(e)}function n(){return null}return n}const $c=De(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),hr=De(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),fr=De(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),sb=De(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),pr=De(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),ob=De(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Sc=De(["#text"]),Ac=De(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),gr=De(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Tc=De(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ms=De(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),rb=Ve(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ab=Ve(/<%[\w\W]*|[\w\W]*%>/gm),lb=Ve(/\$\{[\w\W]*/gm),cb=Ve(/^data-[\-\w.\u00B7-\uFFFF]+$/),db=Ve(/^aria-[\-\w]+$/),jh=Ve(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ub=Ve(/^(?:\w+script|data):/i),hb=Ve(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Kh=Ve(/^html$/i),fb=Ve(/^[a-z][.\w]*(-[.\w]+)+$/i);var Cc=Object.freeze({__proto__:null,ARIA_ATTR:db,ATTR_WHITESPACE:hb,CUSTOM_ELEMENT:fb,DATA_ATTR:cb,DOCTYPE_NAME:Kh,ERB_EXPR:ab,IS_ALLOWED_URI:jh,IS_SCRIPT_OR_DATA:ub,MUSTACHE_EXPR:rb,TMPLIT_EXPR:lb});const li={element:1,text:3,progressingInstruction:7,comment:8,document:9},pb=function(){return typeof window>"u"?null:window},gb=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const o="dompurify"+(i?"#"+i:"");try{return t.createPolicy(o,{createHTML(r){return r},createScriptURL(r){return r}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ec=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Wh(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:pb();const t=q=>Wh(q);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==li.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:o,HTMLTemplateElement:r,Node:a,Element:l,NodeFilter:c,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:u,DOMParser:h,trustedTypes:g}=e,m=l.prototype,y=ai(m,"cloneNode"),_=ai(m,"remove"),S=ai(m,"nextSibling"),R=ai(m,"childNodes"),M=ai(m,"parentNode");if(typeof r=="function"){const q=n.createElement("template");q.content&&q.content.ownerDocument&&(n=q.content.ownerDocument)}let A,T="";const{implementation:v,createNodeIterator:E,createDocumentFragment:P,getElementsByTagName:C}=n,{importNode:O}=i;let D=Ec();t.isSupported=typeof qh=="function"&&typeof M=="function"&&v&&v.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:F,ERB_EXPR:j,TMPLIT_EXPR:G,DATA_ATTR:L,ARIA_ATTR:H,IS_SCRIPT_OR_DATA:ee,ATTR_WHITESPACE:B,CUSTOM_ELEMENT:we}=Cc;let{IS_ALLOWED_URI:$e}=Cc,oe=null;const Ie=Q({},[...$c,...hr,...fr,...pr,...Sc]);let re=null;const He=Q({},[...Ac,...gr,...Tc,...ms]);let ne=Object.seal(Jr(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Se=null,W=null;const V=Object.seal(Jr(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let ae=!0,fe=!0,Ge=!1,is=!0,An=!1,ss=!0,Wt=!1,Fo=!1,No=!1,Tn=!1,os=!1,rs=!1,xl=!0,_l=!1;const ap="user-content-";let Bo=!0,ti=!1,Cn={},it=null;const zo=Q({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let kl=null;const $l=Q({},["audio","video","img","source","image","track"]);let Ho=null;const Sl=Q({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),as="http://www.w3.org/1998/Math/MathML",ls="http://www.w3.org/2000/svg",mt="http://www.w3.org/1999/xhtml";let En=mt,Uo=!1,qo=null;const lp=Q({},[as,ls,mt],dr);let cs=Q({},["mi","mo","mn","ms","mtext"]),ds=Q({},["annotation-xml"]);const cp=Q({},["title","style","font","a","script"]);let ni=null;const dp=["application/xhtml+xml","text/html"],up="text/html";let ve=null,Rn=null;const hp=n.createElement("form"),Al=function($){return $ instanceof RegExp||$ instanceof Function},jo=function(){let $=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Rn&&Rn===$)){if((!$||typeof $!="object")&&($={}),$=at($),ni=dp.indexOf($.PARSER_MEDIA_TYPE)===-1?up:$.PARSER_MEDIA_TYPE,ve=ni==="application/xhtml+xml"?dr:zs,oe=Qe($,"ALLOWED_TAGS")?Q({},$.ALLOWED_TAGS,ve):Ie,re=Qe($,"ALLOWED_ATTR")?Q({},$.ALLOWED_ATTR,ve):He,qo=Qe($,"ALLOWED_NAMESPACES")?Q({},$.ALLOWED_NAMESPACES,dr):lp,Ho=Qe($,"ADD_URI_SAFE_ATTR")?Q(at(Sl),$.ADD_URI_SAFE_ATTR,ve):Sl,kl=Qe($,"ADD_DATA_URI_TAGS")?Q(at($l),$.ADD_DATA_URI_TAGS,ve):$l,it=Qe($,"FORBID_CONTENTS")?Q({},$.FORBID_CONTENTS,ve):zo,Se=Qe($,"FORBID_TAGS")?Q({},$.FORBID_TAGS,ve):at({}),W=Qe($,"FORBID_ATTR")?Q({},$.FORBID_ATTR,ve):at({}),Cn=Qe($,"USE_PROFILES")?$.USE_PROFILES:!1,ae=$.ALLOW_ARIA_ATTR!==!1,fe=$.ALLOW_DATA_ATTR!==!1,Ge=$.ALLOW_UNKNOWN_PROTOCOLS||!1,is=$.ALLOW_SELF_CLOSE_IN_ATTR!==!1,An=$.SAFE_FOR_TEMPLATES||!1,ss=$.SAFE_FOR_XML!==!1,Wt=$.WHOLE_DOCUMENT||!1,Tn=$.RETURN_DOM||!1,os=$.RETURN_DOM_FRAGMENT||!1,rs=$.RETURN_TRUSTED_TYPE||!1,No=$.FORCE_BODY||!1,xl=$.SANITIZE_DOM!==!1,_l=$.SANITIZE_NAMED_PROPS||!1,Bo=$.KEEP_CONTENT!==!1,ti=$.IN_PLACE||!1,$e=$.ALLOWED_URI_REGEXP||jh,En=$.NAMESPACE||mt,cs=$.MATHML_TEXT_INTEGRATION_POINTS||cs,ds=$.HTML_INTEGRATION_POINTS||ds,ne=$.CUSTOM_ELEMENT_HANDLING||{},$.CUSTOM_ELEMENT_HANDLING&&Al($.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ne.tagNameCheck=$.CUSTOM_ELEMENT_HANDLING.tagNameCheck),$.CUSTOM_ELEMENT_HANDLING&&Al($.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ne.attributeNameCheck=$.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),$.CUSTOM_ELEMENT_HANDLING&&typeof $.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ne.allowCustomizedBuiltInElements=$.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),An&&(fe=!1),os&&(Tn=!0),Cn&&(oe=Q({},Sc),re=[],Cn.html===!0&&(Q(oe,$c),Q(re,Ac)),Cn.svg===!0&&(Q(oe,hr),Q(re,gr),Q(re,ms)),Cn.svgFilters===!0&&(Q(oe,fr),Q(re,gr),Q(re,ms)),Cn.mathMl===!0&&(Q(oe,pr),Q(re,Tc),Q(re,ms))),$.ADD_TAGS&&(typeof $.ADD_TAGS=="function"?V.tagCheck=$.ADD_TAGS:(oe===Ie&&(oe=at(oe)),Q(oe,$.ADD_TAGS,ve))),$.ADD_ATTR&&(typeof $.ADD_ATTR=="function"?V.attributeCheck=$.ADD_ATTR:(re===He&&(re=at(re)),Q(re,$.ADD_ATTR,ve))),$.ADD_URI_SAFE_ATTR&&Q(Ho,$.ADD_URI_SAFE_ATTR,ve),$.FORBID_CONTENTS&&(it===zo&&(it=at(it)),Q(it,$.FORBID_CONTENTS,ve)),$.ADD_FORBID_CONTENTS&&(it===zo&&(it=at(it)),Q(it,$.ADD_FORBID_CONTENTS,ve)),Bo&&(oe["#text"]=!0),Wt&&Q(oe,["html","head","body"]),oe.table&&(Q(oe,["tbody"]),delete Se.tbody),$.TRUSTED_TYPES_POLICY){if(typeof $.TRUSTED_TYPES_POLICY.createHTML!="function")throw ri('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof $.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ri('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');A=$.TRUSTED_TYPES_POLICY,T=A.createHTML("")}else A===void 0&&(A=gb(g,s)),A!==null&&typeof T=="string"&&(T=A.createHTML(""));De&&De($),Rn=$}},Tl=Q({},[...hr,...fr,...sb]),Cl=Q({},[...pr,...ob]),fp=function($){let I=M($);(!I||!I.tagName)&&(I={namespaceURI:En,tagName:"template"});const U=zs($.tagName),ue=zs(I.tagName);return qo[$.namespaceURI]?$.namespaceURI===ls?I.namespaceURI===mt?U==="svg":I.namespaceURI===as?U==="svg"&&(ue==="annotation-xml"||cs[ue]):!!Tl[U]:$.namespaceURI===as?I.namespaceURI===mt?U==="math":I.namespaceURI===ls?U==="math"&&ds[ue]:!!Cl[U]:$.namespaceURI===mt?I.namespaceURI===ls&&!ds[ue]||I.namespaceURI===as&&!cs[ue]?!1:!Cl[U]&&(cp[U]||!Tl[U]):!!(ni==="application/xhtml+xml"&&qo[$.namespaceURI]):!1},st=function($){si(t.removed,{element:$});try{M($).removeChild($)}catch{_($)}},Vt=function($,I){try{si(t.removed,{attribute:I.getAttributeNode($),from:I})}catch{si(t.removed,{attribute:null,from:I})}if(I.removeAttribute($),$==="is")if(Tn||os)try{st(I)}catch{}else try{I.setAttribute($,"")}catch{}},El=function($){let I=null,U=null;if(No)$="<remove></remove>"+$;else{const ge=ur($,/^[\r\n\t ]+/);U=ge&&ge[0]}ni==="application/xhtml+xml"&&En===mt&&($='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+$+"</body></html>");const ue=A?A.createHTML($):$;if(En===mt)try{I=new h().parseFromString(ue,ni)}catch{}if(!I||!I.documentElement){I=v.createDocument(En,"template",null);try{I.documentElement.innerHTML=Uo?T:ue}catch{}}const Ae=I.body||I.documentElement;return $&&U&&Ae.insertBefore(n.createTextNode(U),Ae.childNodes[0]||null),En===mt?C.call(I,Wt?"html":"body")[0]:Wt?I.documentElement:Ae},Rl=function($){return E.call($.ownerDocument||$,$,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Ko=function($){return $ instanceof u&&(typeof $.nodeName!="string"||typeof $.textContent!="string"||typeof $.removeChild!="function"||!($.attributes instanceof d)||typeof $.removeAttribute!="function"||typeof $.setAttribute!="function"||typeof $.namespaceURI!="string"||typeof $.insertBefore!="function"||typeof $.hasChildNodes!="function")},Pl=function($){return typeof a=="function"&&$ instanceof a};function yt(q,$,I){gs(q,U=>{U.call(t,$,I,Rn)})}const Ml=function($){let I=null;if(yt(D.beforeSanitizeElements,$,null),Ko($))return st($),!0;const U=ve($.nodeName);if(yt(D.uponSanitizeElement,$,{tagName:U,allowedTags:oe}),ss&&$.hasChildNodes()&&!Pl($.firstElementChild)&&Pe(/<[/\w!]/g,$.innerHTML)&&Pe(/<[/\w!]/g,$.textContent)||$.nodeType===li.progressingInstruction||ss&&$.nodeType===li.comment&&Pe(/<[/\w]/g,$.data))return st($),!0;if(!(V.tagCheck instanceof Function&&V.tagCheck(U))&&(!oe[U]||Se[U])){if(!Se[U]&&Ll(U)&&(ne.tagNameCheck instanceof RegExp&&Pe(ne.tagNameCheck,U)||ne.tagNameCheck instanceof Function&&ne.tagNameCheck(U)))return!1;if(Bo&&!it[U]){const ue=M($)||$.parentNode,Ae=R($)||$.childNodes;if(Ae&&ue){const ge=Ae.length;for(let Oe=ge-1;Oe>=0;--Oe){const vt=y(Ae[Oe],!0);vt.__removalCount=($.__removalCount||0)+1,ue.insertBefore(vt,S($))}}}return st($),!0}return $ instanceof l&&!fp($)||(U==="noscript"||U==="noembed"||U==="noframes")&&Pe(/<\/no(script|embed|frames)/i,$.innerHTML)?(st($),!0):(An&&$.nodeType===li.text&&(I=$.textContent,gs([F,j,G],ue=>{I=oi(I,ue," ")}),$.textContent!==I&&(si(t.removed,{element:$.cloneNode()}),$.textContent=I)),yt(D.afterSanitizeElements,$,null),!1)},Dl=function($,I,U){if(xl&&(I==="id"||I==="name")&&(U in n||U in hp))return!1;if(!(fe&&!W[I]&&Pe(L,I))){if(!(ae&&Pe(H,I))){if(!(V.attributeCheck instanceof Function&&V.attributeCheck(I,$))){if(!re[I]||W[I]){if(!(Ll($)&&(ne.tagNameCheck instanceof RegExp&&Pe(ne.tagNameCheck,$)||ne.tagNameCheck instanceof Function&&ne.tagNameCheck($))&&(ne.attributeNameCheck instanceof RegExp&&Pe(ne.attributeNameCheck,I)||ne.attributeNameCheck instanceof Function&&ne.attributeNameCheck(I,$))||I==="is"&&ne.allowCustomizedBuiltInElements&&(ne.tagNameCheck instanceof RegExp&&Pe(ne.tagNameCheck,U)||ne.tagNameCheck instanceof Function&&ne.tagNameCheck(U))))return!1}else if(!Ho[I]){if(!Pe($e,oi(U,B,""))){if(!((I==="src"||I==="xlink:href"||I==="href")&&$!=="script"&&eb(U,"data:")===0&&kl[$])){if(!(Ge&&!Pe(ee,oi(U,B,"")))){if(U)return!1}}}}}}}return!0},Ll=function($){return $!=="annotation-xml"&&ur($,we)},Il=function($){yt(D.beforeSanitizeAttributes,$,null);const{attributes:I}=$;if(!I||Ko($))return;const U={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:re,forceKeepAttr:void 0};let ue=I.length;for(;ue--;){const Ae=I[ue],{name:ge,namespaceURI:Oe,value:vt}=Ae,Pn=ve(ge),Wo=vt;let ke=ge==="value"?Wo:tb(Wo);if(U.attrName=Pn,U.attrValue=ke,U.keepAttr=!0,U.forceKeepAttr=void 0,yt(D.uponSanitizeAttribute,$,U),ke=U.attrValue,_l&&(Pn==="id"||Pn==="name")&&(Vt(ge,$),ke=ap+ke),ss&&Pe(/((--!?|])>)|<\/(style|title|textarea)/i,ke)){Vt(ge,$);continue}if(Pn==="attributename"&&ur(ke,"href")){Vt(ge,$);continue}if(U.forceKeepAttr)continue;if(!U.keepAttr){Vt(ge,$);continue}if(!is&&Pe(/\/>/i,ke)){Vt(ge,$);continue}An&&gs([F,j,G],Fl=>{ke=oi(ke,Fl," ")});const Ol=ve($.nodeName);if(!Dl(Ol,Pn,ke)){Vt(ge,$);continue}if(A&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!Oe)switch(g.getAttributeType(Ol,Pn)){case"TrustedHTML":{ke=A.createHTML(ke);break}case"TrustedScriptURL":{ke=A.createScriptURL(ke);break}}if(ke!==Wo)try{Oe?$.setAttributeNS(Oe,ge,ke):$.setAttribute(ge,ke),Ko($)?st($):kc(t.removed)}catch{Vt(ge,$)}}yt(D.afterSanitizeAttributes,$,null)},pp=function q($){let I=null;const U=Rl($);for(yt(D.beforeSanitizeShadowDOM,$,null);I=U.nextNode();)yt(D.uponSanitizeShadowNode,I,null),Ml(I),Il(I),I.content instanceof o&&q(I.content);yt(D.afterSanitizeShadowDOM,$,null)};return t.sanitize=function(q){let $=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},I=null,U=null,ue=null,Ae=null;if(Uo=!q,Uo&&(q="<!-->"),typeof q!="string"&&!Pl(q))if(typeof q.toString=="function"){if(q=q.toString(),typeof q!="string")throw ri("dirty is not a string, aborting")}else throw ri("toString is not a function");if(!t.isSupported)return q;if(Fo||jo($),t.removed=[],typeof q=="string"&&(ti=!1),ti){if(q.nodeName){const vt=ve(q.nodeName);if(!oe[vt]||Se[vt])throw ri("root node is forbidden and cannot be sanitized in-place")}}else if(q instanceof a)I=El("<!---->"),U=I.ownerDocument.importNode(q,!0),U.nodeType===li.element&&U.nodeName==="BODY"||U.nodeName==="HTML"?I=U:I.appendChild(U);else{if(!Tn&&!An&&!Wt&&q.indexOf("<")===-1)return A&&rs?A.createHTML(q):q;if(I=El(q),!I)return Tn?null:rs?T:""}I&&No&&st(I.firstChild);const ge=Rl(ti?q:I);for(;ue=ge.nextNode();)Ml(ue),Il(ue),ue.content instanceof o&&pp(ue.content);if(ti)return q;if(Tn){if(os)for(Ae=P.call(I.ownerDocument);I.firstChild;)Ae.appendChild(I.firstChild);else Ae=I;return(re.shadowroot||re.shadowrootmode)&&(Ae=O.call(i,Ae,!0)),Ae}let Oe=Wt?I.outerHTML:I.innerHTML;return Wt&&oe["!doctype"]&&I.ownerDocument&&I.ownerDocument.doctype&&I.ownerDocument.doctype.name&&Pe(Kh,I.ownerDocument.doctype.name)&&(Oe="<!DOCTYPE "+I.ownerDocument.doctype.name+`>
`+Oe),An&&gs([F,j,G],vt=>{Oe=oi(Oe,vt," ")}),A&&rs?A.createHTML(Oe):Oe},t.setConfig=function(){let q=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};jo(q),Fo=!0},t.clearConfig=function(){Rn=null,Fo=!1},t.isValidAttribute=function(q,$,I){Rn||jo({});const U=ve(q),ue=ve($);return Dl(U,ue,I)},t.addHook=function(q,$){typeof $=="function"&&si(D[q],$)},t.removeHook=function(q,$){if($!==void 0){const I=Jv(D[q],$);return I===-1?void 0:Zv(D[q],I,1)[0]}return kc(D[q])},t.removeHooks=function(q){D[q]=[]},t.removeAllHooks=function(){D=Ec()},t}var ta=Wh();function Za(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var $n=Za();function Vh(e){$n=e}var sn={exec:()=>null};function J(e,t=""){let n=typeof e=="string"?e:e.source,i={replace:(s,o)=>{let r=typeof o=="string"?o:o.source;return r=r.replace(Me.caret,"$1"),n=n.replace(s,r),i},getRegex:()=>new RegExp(n,t)};return i}var mb=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Me={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}>`)},yb=/^(?:[ \t]*(?:\n|$))+/,vb=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,bb=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Zi=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,wb=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,el=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,Gh=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Qh=J(Gh).replace(/bull/g,el).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),xb=J(Gh).replace(/bull/g,el).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),tl=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,_b=/^[^\n]+/,nl=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,kb=J(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",nl).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),$b=J(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,el).getRegex(),To="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",il=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Sb=J("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",il).replace("tag",To).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Yh=J(tl).replace("hr",Zi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",To).getRegex(),Ab=J(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Yh).getRegex(),sl={blockquote:Ab,code:vb,def:kb,fences:bb,heading:wb,hr:Zi,html:Sb,lheading:Qh,list:$b,newline:yb,paragraph:Yh,table:sn,text:_b},Rc=J("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Zi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",To).getRegex(),Tb={...sl,lheading:xb,table:Rc,paragraph:J(tl).replace("hr",Zi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Rc).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",To).getRegex()},Cb={...sl,html:J(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",il).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:sn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:J(tl).replace("hr",Zi).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Qh).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Eb=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Rb=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Xh=/^( {2,}|\\)\n(?!\s*$)/,Pb=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Co=/[\p{P}\p{S}]/u,ol=/[\s\p{P}\p{S}]/u,Jh=/[^\s\p{P}\p{S}]/u,Mb=J(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ol).getRegex(),Zh=/(?!~)[\p{P}\p{S}]/u,Db=/(?!~)[\s\p{P}\p{S}]/u,Lb=/(?:[^\s\p{P}\p{S}]|~)/u,ef=/(?![*_])[\p{P}\p{S}]/u,Ib=/(?![*_])[\s\p{P}\p{S}]/u,Ob=/(?:[^\s\p{P}\p{S}]|[*_])/u,Fb=J(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",mb?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),tf=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Nb=J(tf,"u").replace(/punct/g,Co).getRegex(),Bb=J(tf,"u").replace(/punct/g,Zh).getRegex(),nf="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",zb=J(nf,"gu").replace(/notPunctSpace/g,Jh).replace(/punctSpace/g,ol).replace(/punct/g,Co).getRegex(),Hb=J(nf,"gu").replace(/notPunctSpace/g,Lb).replace(/punctSpace/g,Db).replace(/punct/g,Zh).getRegex(),Ub=J("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Jh).replace(/punctSpace/g,ol).replace(/punct/g,Co).getRegex(),qb=J(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,ef).getRegex(),jb="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",Kb=J(jb,"gu").replace(/notPunctSpace/g,Ob).replace(/punctSpace/g,Ib).replace(/punct/g,ef).getRegex(),Wb=J(/\\(punct)/,"gu").replace(/punct/g,Co).getRegex(),Vb=J(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Gb=J(il).replace("(?:-->|$)","-->").getRegex(),Qb=J("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Gb).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Zs=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Yb=J(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Zs).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),sf=J(/^!?\[(label)\]\[(ref)\]/).replace("label",Zs).replace("ref",nl).getRegex(),of=J(/^!?\[(ref)\](?:\[\])?/).replace("ref",nl).getRegex(),Xb=J("reflink|nolink(?!\\()","g").replace("reflink",sf).replace("nolink",of).getRegex(),Pc=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,rl={_backpedal:sn,anyPunctuation:Wb,autolink:Vb,blockSkip:Fb,br:Xh,code:Rb,del:sn,delLDelim:sn,delRDelim:sn,emStrongLDelim:Nb,emStrongRDelimAst:zb,emStrongRDelimUnd:Ub,escape:Eb,link:Yb,nolink:of,punctuation:Mb,reflink:sf,reflinkSearch:Xb,tag:Qb,text:Pb,url:sn},Jb={...rl,link:J(/^!?\[(label)\]\((.*?)\)/).replace("label",Zs).getRegex(),reflink:J(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Zs).getRegex()},na={...rl,emStrongRDelimAst:Hb,emStrongLDelim:Bb,delLDelim:qb,delRDelim:Kb,url:J(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Pc).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:J(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Pc).getRegex()},Zb={...na,br:J(Xh).replace("{2,}","*").getRegex(),text:J(na.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ys={normal:sl,gfm:Tb,pedantic:Cb},ci={normal:rl,gfm:na,breaks:Zb,pedantic:Jb},e0={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Mc=e=>e0[e];function lt(e,t){if(t){if(Me.escapeTest.test(e))return e.replace(Me.escapeReplace,Mc)}else if(Me.escapeTestNoEncode.test(e))return e.replace(Me.escapeReplaceNoEncode,Mc);return e}function Dc(e){try{e=encodeURI(e).replace(Me.percentDecode,"%")}catch{return null}return e}function Lc(e,t){var o;let n=e.replace(Me.findPipe,(r,a,l)=>{let c=!1,d=a;for(;--d>=0&&l[d]==="\\";)c=!c;return c?"|":" |"}),i=n.split(Me.splitPipe),s=0;if(i[0].trim()||i.shift(),i.length>0&&!((o=i.at(-1))!=null&&o.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(Me.slashPipe,"|");return i}function di(e,t,n){let i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function t0(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function n0(e,t=0){let n=t,i="";for(let s of e)if(s==="	"){let o=4-n%4;i+=" ".repeat(o),n+=o}else i+=s,n++;return i}function Ic(e,t,n,i,s){let o=t.href,r=t.title||null,a=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:r,text:a,tokens:i.inlineTokens(a)};return i.state.inLink=!1,l}function i0(e,t,n){let i=e.match(n.other.indentCodeCompensation);if(i===null)return t;let s=i[1];return t.split(`
`).map(o=>{let r=o.match(n.other.beginningSpace);if(r===null)return o;let[a]=r;return a.length>=s.length?o.slice(s.length):o}).join(`
`)}var eo=class{constructor(e){N(this,"options");N(this,"rules");N(this,"lexer");this.options=e||$n}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:di(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],i=i0(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let i=di(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:di(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=di(t[0],`
`).split(`
`),i="",s="",o=[];for(;n.length>0;){let r=!1,a=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))a.push(n[l]),r=!0;else if(!r)a.push(n[l]);else break;n=n.slice(l);let c=a.join(`
`),d=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,s=s?`${s}
${d}`:d;let u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=u,n.length===0)break;let h=o.at(-1);if((h==null?void 0:h.type)==="code")break;if((h==null?void 0:h.type)==="blockquote"){let g=h,m=g.raw+`
`+n.join(`
`),y=this.blockquote(m);o[o.length-1]=y,i=i.substring(0,i.length-g.raw.length)+y.raw,s=s.substring(0,s.length-g.text.length)+y.text;break}else if((h==null?void 0:h.type)==="list"){let g=h,m=g.raw+`
`+n.join(`
`),y=this.list(m);o[o.length-1]=y,i=i.substring(0,i.length-h.raw.length)+y.raw,s=s.substring(0,s.length-g.raw.length)+y.raw,n=m.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:o,text:s}}}list(e){var n,i;let t=this.rules.block.list.exec(e);if(t){let s=t[1].trim(),o=s.length>1,r={type:"list",raw:"",ordered:o,start:o?+s.slice(0,-1):"",loose:!1,items:[]};s=o?`\\d{1,9}\\${s.slice(-1)}`:`\\${s}`,this.options.pedantic&&(s=o?s:"[*+-]");let a=this.rules.other.listItemRegex(s),l=!1;for(;e;){let d=!1,u="",h="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let g=n0(t[2].split(`
`,1)[0],t[1].length),m=e.split(`
`,1)[0],y=!g.trim(),_=0;if(this.options.pedantic?(_=2,h=g.trimStart()):y?_=t[1].length+1:(_=g.search(this.rules.other.nonSpaceChar),_=_>4?1:_,h=g.slice(_),_+=t[1].length),y&&this.rules.other.blankLine.test(m)&&(u+=m+`
`,e=e.substring(m.length+1),d=!0),!d){let S=this.rules.other.nextBulletRegex(_),R=this.rules.other.hrRegex(_),M=this.rules.other.fencesBeginRegex(_),A=this.rules.other.headingBeginRegex(_),T=this.rules.other.htmlBeginRegex(_),v=this.rules.other.blockquoteBeginRegex(_);for(;e;){let E=e.split(`
`,1)[0],P;if(m=E,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),P=m):P=m.replace(this.rules.other.tabCharGlobal,"    "),M.test(m)||A.test(m)||T.test(m)||v.test(m)||S.test(m)||R.test(m))break;if(P.search(this.rules.other.nonSpaceChar)>=_||!m.trim())h+=`
`+P.slice(_);else{if(y||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||M.test(g)||A.test(g)||R.test(g))break;h+=`
`+m}y=!m.trim(),u+=E+`
`,e=e.substring(E.length+1),g=P.slice(_)}}r.loose||(l?r.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(l=!0)),r.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(h),loose:!1,text:h,tokens:[]}),r.raw+=u}let c=r.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;r.raw=r.raw.trimEnd();for(let d of r.items){if(this.lexer.state.top=!1,d.tokens=this.lexer.blockTokens(d.text,[]),d.task){if(d.text=d.text.replace(this.rules.other.listReplaceTask,""),((n=d.tokens[0])==null?void 0:n.type)==="text"||((i=d.tokens[0])==null?void 0:i.type)==="paragraph"){d.tokens[0].raw=d.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),d.tokens[0].text=d.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let h=this.lexer.inlineQueue.length-1;h>=0;h--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[h].src)){this.lexer.inlineQueue[h].src=this.lexer.inlineQueue[h].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(d.raw);if(u){let h={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};d.checked=h.checked,r.loose?d.tokens[0]&&["paragraph","text"].includes(d.tokens[0].type)&&"tokens"in d.tokens[0]&&d.tokens[0].tokens?(d.tokens[0].raw=h.raw+d.tokens[0].raw,d.tokens[0].text=h.raw+d.tokens[0].text,d.tokens[0].tokens.unshift(h)):d.tokens.unshift({type:"paragraph",raw:h.raw,text:h.raw,tokens:[h]}):d.tokens.unshift(h)}}if(!r.loose){let u=d.tokens.filter(g=>g.type==="space"),h=u.length>0&&u.some(g=>this.rules.other.anyLine.test(g.raw));r.loose=h}}if(r.loose)for(let d of r.items){d.loose=!0;for(let u of d.tokens)u.type==="text"&&(u.type="paragraph")}return r}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var r;let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Lc(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(r=t[3])!=null&&r.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(let a of i)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Lc(a,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=di(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=t0(t[2],"()");if(o===-2)return;if(o>-1){let r=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(i);o&&(i=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),Ic(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Ic(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(i[1]||i[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...i[0]].length-1,o,r,a=s,l=0,c=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+s);(i=c.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(r=[...o].length,i[3]||i[4]){a+=r;continue}else if((i[5]||i[6])&&s%3&&!((s+r)%3)){l+=r;continue}if(a-=r,a>0)continue;r=Math.min(r,r+a+l);let d=[...i[0]][0].length,u=e.slice(0,s+i.index+d+r);if(Math.min(s,r)%2){let g=u.slice(1,-1);return{type:"em",raw:u,text:g,tokens:this.lexer.inlineTokens(g)}}let h=u.slice(2,-2);return{type:"strong",raw:u,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e,t,n=""){let i=this.rules.inline.delLDelim.exec(e);if(i&&(!i[1]||!n||this.rules.inline.punctuation.exec(n))){let s=[...i[0]].length-1,o,r,a=s,l=this.rules.inline.delRDelim;for(l.lastIndex=0,t=t.slice(-1*e.length+s);(i=l.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o||(r=[...o].length,r!==s))continue;if(i[3]||i[4]){a+=r;continue}if(a-=r,a>0)continue;r=Math.min(r,r+a);let c=[...i[0]][0].length,d=e.slice(0,s+i.index+c+r),u=d.slice(s,-s);return{type:"del",raw:d,text:u,tokens:this.lexer.inlineTokens(u)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let o;do o=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(o!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Xe=class ia{constructor(t){N(this,"tokens");N(this,"options");N(this,"state");N(this,"inlineQueue");N(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||$n,this.options.tokenizer=this.options.tokenizer||new eo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:Me,block:ys.normal,inline:ci.normal};this.options.pedantic?(n.block=ys.pedantic,n.inline=ci.pedantic):this.options.gfm&&(n.block=ys.gfm,this.options.breaks?n.inline=ci.breaks:n.inline=ci.gfm),this.tokenizer.rules=n}static get rules(){return{block:ys,inline:ci}}static lex(t,n){return new ia(n).lex(t)}static lexInline(t,n){return new ia(n).inlineTokens(t)}lex(t){t=t.replace(Me.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,o,r;for(this.options.pedantic&&(t=t.replace(Me.tabCharGlobal,"    ").replace(Me.spaceLine,""));t;){let a;if((o=(s=this.options.extensions)==null?void 0:s.block)!=null&&o.some(c=>(a=c.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.space(t)){t=t.substring(a.raw.length);let c=n.at(-1);a.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(a);continue}if(a=this.tokenizer.code(t)){t=t.substring(a.raw.length);let c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=(c.raw.endsWith(`
`)?"":`
`)+a.raw,c.text+=`
`+a.text,this.inlineQueue.at(-1).src=c.text):n.push(a);continue}if(a=this.tokenizer.fences(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.heading(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.hr(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.blockquote(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.list(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.html(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.def(t)){t=t.substring(a.raw.length);let c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=(c.raw.endsWith(`
`)?"":`
`)+a.raw,c.text+=`
`+a.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[a.tag]||(this.tokens.links[a.tag]={href:a.href,title:a.title},n.push(a));continue}if(a=this.tokenizer.table(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.lheading(t)){t=t.substring(a.raw.length),n.push(a);continue}let l=t;if((r=this.options.extensions)!=null&&r.startBlock){let c=1/0,d=t.slice(1),u;this.options.extensions.startBlock.forEach(h=>{u=h.call({lexer:this},d),typeof u=="number"&&u>=0&&(c=Math.min(c,u))}),c<1/0&&c>=0&&(l=t.substring(0,c+1))}if(this.state.top&&(a=this.tokenizer.paragraph(l))){let c=n.at(-1);i&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=(c.raw.endsWith(`
`)?"":`
`)+a.raw,c.text+=`
`+a.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(a),i=l.length!==t.length,t=t.substring(a.raw.length);continue}if(a=this.tokenizer.text(t)){t=t.substring(a.raw.length);let c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=(c.raw.endsWith(`
`)?"":`
`)+a.raw,c.text+=`
`+a.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(a);continue}if(t){let c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var l,c,d,u,h;let i=t,s=null;if(this.tokens.links){let g=Object.keys(this.tokens.links);if(g.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)g.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)o=s[2]?s[2].length:0,i=i.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);i=((c=(l=this.options.hooks)==null?void 0:l.emStrongMask)==null?void 0:c.call({lexer:this},i))??i;let r=!1,a="";for(;t;){r||(a=""),r=!1;let g;if((u=(d=this.options.extensions)==null?void 0:d.inline)!=null&&u.some(y=>(g=y.call({lexer:this},t,n))?(t=t.substring(g.raw.length),n.push(g),!0):!1))continue;if(g=this.tokenizer.escape(t)){t=t.substring(g.raw.length),n.push(g);continue}if(g=this.tokenizer.tag(t)){t=t.substring(g.raw.length),n.push(g);continue}if(g=this.tokenizer.link(t)){t=t.substring(g.raw.length),n.push(g);continue}if(g=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(g.raw.length);let y=n.at(-1);g.type==="text"&&(y==null?void 0:y.type)==="text"?(y.raw+=g.raw,y.text+=g.text):n.push(g);continue}if(g=this.tokenizer.emStrong(t,i,a)){t=t.substring(g.raw.length),n.push(g);continue}if(g=this.tokenizer.codespan(t)){t=t.substring(g.raw.length),n.push(g);continue}if(g=this.tokenizer.br(t)){t=t.substring(g.raw.length),n.push(g);continue}if(g=this.tokenizer.del(t,i,a)){t=t.substring(g.raw.length),n.push(g);continue}if(g=this.tokenizer.autolink(t)){t=t.substring(g.raw.length),n.push(g);continue}if(!this.state.inLink&&(g=this.tokenizer.url(t))){t=t.substring(g.raw.length),n.push(g);continue}let m=t;if((h=this.options.extensions)!=null&&h.startInline){let y=1/0,_=t.slice(1),S;this.options.extensions.startInline.forEach(R=>{S=R.call({lexer:this},_),typeof S=="number"&&S>=0&&(y=Math.min(y,S))}),y<1/0&&y>=0&&(m=t.substring(0,y+1))}if(g=this.tokenizer.inlineText(m)){t=t.substring(g.raw.length),g.raw.slice(-1)!=="_"&&(a=g.raw.slice(-1)),r=!0;let y=n.at(-1);(y==null?void 0:y.type)==="text"?(y.raw+=g.raw,y.text+=g.text):n.push(g);continue}if(t){let y="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(y);break}else throw new Error(y)}}return n}},to=class{constructor(e){N(this,"options");N(this,"parser");this.options=e||$n}space(e){return""}code({text:e,lang:t,escaped:n}){var o;let i=(o=(t||"").match(Me.notSpaceStart))==null?void 0:o[0],s=e.replace(Me.endingNewline,"")+`
`;return i?'<pre><code class="language-'+lt(i)+'">'+(n?s:lt(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:lt(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,i="";for(let r=0;r<e.items.length;r++){let a=e.items[r];i+=this.listitem(a)}let s=t?"ol":"ul",o=t&&n!==1?' start="'+n+'"':"";return"<"+s+o+`>
`+i+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let i="";for(let s=0;s<e.rows.length;s++){let o=e.rows[s];n="";for(let r=0;r<o.length;r++)n+=this.tablecell(o[r]);i+=this.tablerow({text:n})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+i+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${lt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let i=this.parser.parseInline(n),s=Dc(e);if(s===null)return i;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+lt(t)+'"'),o+=">"+i+"</a>",o}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));let s=Dc(e);if(s===null)return lt(n);e=s;let o=`<img src="${e}" alt="${lt(n)}"`;return t&&(o+=` title="${lt(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:lt(e.text)}},al=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Je=class sa{constructor(t){N(this,"options");N(this,"renderer");N(this,"textRenderer");this.options=t||$n,this.options.renderer=this.options.renderer||new to,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new al}static parse(t,n){return new sa(n).parse(t)}static parseInline(t,n){return new sa(n).parseInline(t)}parse(t){var i,s;let n="";for(let o=0;o<t.length;o++){let r=t[o];if((s=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&s[r.type]){let l=r,c=this.options.extensions.renderers[l.type].call({parser:this},l);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(l.type)){n+=c||"";continue}}let a=r;switch(a.type){case"space":{n+=this.renderer.space(a);break}case"hr":{n+=this.renderer.hr(a);break}case"heading":{n+=this.renderer.heading(a);break}case"code":{n+=this.renderer.code(a);break}case"table":{n+=this.renderer.table(a);break}case"blockquote":{n+=this.renderer.blockquote(a);break}case"list":{n+=this.renderer.list(a);break}case"checkbox":{n+=this.renderer.checkbox(a);break}case"html":{n+=this.renderer.html(a);break}case"def":{n+=this.renderer.def(a);break}case"paragraph":{n+=this.renderer.paragraph(a);break}case"text":{n+=this.renderer.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}parseInline(t,n=this.renderer){var s,o;let i="";for(let r=0;r<t.length;r++){let a=t[r];if((o=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&o[a.type]){let c=this.options.extensions.renderers[a.type].call({parser:this},a);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type)){i+=c||"";continue}}let l=a;switch(l.type){case"escape":{i+=n.text(l);break}case"html":{i+=n.html(l);break}case"link":{i+=n.link(l);break}case"image":{i+=n.image(l);break}case"checkbox":{i+=n.checkbox(l);break}case"strong":{i+=n.strong(l);break}case"em":{i+=n.em(l);break}case"codespan":{i+=n.codespan(l);break}case"br":{i+=n.br(l);break}case"del":{i+=n.del(l);break}case"text":{i+=n.text(l);break}default:{let c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},Is,yi=(Is=class{constructor(e){N(this,"options");N(this,"block");this.options=e||$n}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Xe.lex:Xe.lexInline}provideParser(){return this.block?Je.parse:Je.parseInline}},N(Is,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),N(Is,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Is),s0=class{constructor(...e){N(this,"defaults",Za());N(this,"options",this.setOptions);N(this,"parse",this.parseMarkdown(!0));N(this,"parseInline",this.parseMarkdown(!1));N(this,"Parser",Je);N(this,"Renderer",to);N(this,"TextRenderer",al);N(this,"Lexer",Xe);N(this,"Tokenizer",eo);N(this,"Hooks",yi);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(let o of e)switch(n=n.concat(t.call(this,o)),o.type){case"table":{let r=o;for(let a of r.header)n=n.concat(this.walkTokens(a.tokens,t));for(let a of r.rows)for(let l of a)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{let r=o;n=n.concat(this.walkTokens(r.items,t));break}default:{let r=o;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[r.type]?this.defaults.extensions.childTokens[r.type].forEach(a=>{let l=r[a].flat(1/0);n=n.concat(this.walkTokens(l,t))}):r.tokens&&(n=n.concat(this.walkTokens(r.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...r){let a=s.renderer.apply(this,r);return a===!1&&(a=o.apply(this,r)),a}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){let s=this.defaults.renderer||new to(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let r=o,a=n.renderer[r],l=s[r];s[r]=(...c)=>{let d=a.apply(s,c);return d===!1&&(d=l.apply(s,c)),d||""}}i.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new eo(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let r=o,a=n.tokenizer[r],l=s[r];s[r]=(...c)=>{let d=a.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new yi;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let r=o,a=n.hooks[r],l=s[r];yi.passThroughHooks.has(o)?s[r]=c=>{if(this.defaults.async&&yi.passThroughHooksRespectAsync.has(o))return(async()=>{let u=await a.call(s,c);return l.call(s,u)})();let d=a.call(s,c);return l.call(s,d)}:s[r]=(...c)=>{if(this.defaults.async)return(async()=>{let u=await a.apply(s,c);return u===!1&&(u=await l.apply(s,c)),u})();let d=a.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;i.walkTokens=function(r){let a=[];return a.push(o.call(this,r)),s&&(a=a.concat(s.call(this,r))),a}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Xe.lex(e,t??this.defaults)}parser(e,t){return Je.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let i={...n},s={...this.defaults,...i},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&i.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let r=s.hooks?await s.hooks.preprocess(t):t,a=await(s.hooks?await s.hooks.provideLexer():e?Xe.lex:Xe.lexInline)(r,s),l=s.hooks?await s.hooks.processAllTokens(a):a;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():e?Je.parse:Je.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let r=(s.hooks?s.hooks.provideLexer():e?Xe.lex:Xe.lexInline)(t,s);s.hooks&&(r=s.hooks.processAllTokens(r)),s.walkTokens&&this.walkTokens(r,s.walkTokens);let a=(s.hooks?s.hooks.provideParser():e?Je.parse:Je.parseInline)(r,s);return s.hooks&&(a=s.hooks.postprocess(a)),a}catch(r){return o(r)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let i="<p>An error occurred:</p><pre>"+lt(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},wn=new s0;function te(e,t){return wn.parse(e,t)}te.options=te.setOptions=function(e){return wn.setOptions(e),te.defaults=wn.defaults,Vh(te.defaults),te};te.getDefaults=Za;te.defaults=$n;te.use=function(...e){return wn.use(...e),te.defaults=wn.defaults,Vh(te.defaults),te};te.walkTokens=function(e,t){return wn.walkTokens(e,t)};te.parseInline=wn.parseInline;te.Parser=Je;te.parser=Je.parse;te.Renderer=to;te.TextRenderer=al;te.Lexer=Xe;te.lexer=Xe.lex;te.Tokenizer=eo;te.Hooks=yi;te.parse=te;te.options;te.setOptions;te.use;te.walkTokens;te.parseInline;Je.parse;Xe.lex;te.setOptions({gfm:!0,breaks:!0});const o0=["a","b","blockquote","br","code","del","em","h1","h2","h3","h4","hr","i","li","ol","p","pre","strong","table","tbody","td","th","thead","tr","ul","img"],r0=["class","href","rel","target","title","start","src","alt"],Oc={ALLOWED_TAGS:o0,ALLOWED_ATTR:r0,ADD_DATA_URI_TAGS:["img"]};let Fc=!1;const a0=14e4,l0=4e4,c0=200,mr=5e4,rn=new Map;function d0(e){const t=rn.get(e);return t===void 0?null:(rn.delete(e),rn.set(e,t),t)}function Nc(e,t){if(rn.set(e,t),rn.size<=c0)return;const n=rn.keys().next().value;n&&rn.delete(n)}function u0(){Fc||(Fc=!0,ta.addHook("afterSanitizeAttributes",e=>{!(e instanceof HTMLAnchorElement)||!e.getAttribute("href")||(e.setAttribute("rel","noreferrer noopener"),e.setAttribute("target","_blank"))}))}function Vn(e){const t=e.trim();if(!t)return"";if(u0(),t.length<=mr){const r=d0(t);if(r!==null)return r}const n=Wu(t,a0),i=n.truncated?`

… truncated (${n.total} chars, showing first ${n.text.length}).`:"";if(n.text.length>l0){const a=`<pre class="code-block">${af(`${n.text}${i}`)}</pre>`,l=ta.sanitize(a,Oc);return t.length<=mr&&Nc(t,l),l}const s=te.parse(`${n.text}${i}`,{renderer:rf}),o=ta.sanitize(s,Oc);return t.length<=mr&&Nc(t,o),o}const rf=new te.Renderer;rf.html=({text:e})=>af(e);function af(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function h0(e){const n={work_quotation_extract:"work.traceToolExtract",work_quotation_match:"work.traceToolMatch",work_quotation_fill:"work.traceToolFill",work_quotation_shortage_report:"work.traceToolShortageReport"}[e];return n?p(n):p("work.traceToolFallback",{name:e})}function f0(e){const t=typeof e=="number"?e:Number(e);if(!Number.isFinite(t)||t<0)return"—";if(t<1e3)return`${Math.round(t)} ms`;const n=t/1e3;return n>=10?`${Math.round(n)} s`:`${n.toFixed(1)} s`}function p0(e){if(typeof e!="string"||!e.trim())return"";const t=e.replace(/\\/g,"/"),n=t.split("/").filter(Boolean);return n.length?n[n.length-1]:t}function g0(e){if(e&&typeof e=="object"&&!Array.isArray(e))return e;if(typeof e!="string"||!e.trim())return null;try{return JSON.parse(e)}catch{return null}}function m0(e){try{return JSON.stringify(e??{},null,2)}catch{return String(e)}}function y0(e,t){if(!e){const r=typeof t=="string"?t:(()=>{try{return JSON.stringify(t,null,2)}catch{return String(t)}})();return f`
      <p class="muted work-trace__parse-fail">${p("work.traceParseError")}</p>
      <pre class="work-trace__fallback-pre">${r}</pre>
    `}const n=e.markdown,i=[];e.success!==void 0&&i.push(f`<div><span class="work-trace__k">${p("work.traceFieldSuccess")}</span> ${String(e.success)}</div>`),e.rows_count!==void 0&&i.push(f`<div><span class="work-trace__k">${p("work.traceFieldRows")}</span> ${String(e.rows_count)}</div>`),e.filled_count!==void 0&&i.push(f`<div><span class="work-trace__k">${p("work.traceFieldFilled")}</span> ${String(e.filled_count)}</div>`),e.output_path!==void 0&&i.push(f`
      <div>
        <span class="work-trace__k">${p("work.traceFieldOutput")}</span>
        ${p0(e.output_path)}
      </div>
    `),e.summary!==void 0&&typeof e.summary=="string"&&i.push(f`<div><span class="work-trace__k">${p("work.traceFieldSummary")}</span> ${e.summary}</div>`),e.error!=null&&String(e.error).trim()&&i.push(f`<div class="work-trace__err"><span class="work-trace__k">${p("work.traceFieldError")}</span> ${String(e.error)}</div>`);const s=typeof n=="string"&&n.trim().length>0,o=i.length>0;return f`
    ${o?f`<div class="work-trace__summary">${i}</div>`:k}
    ${s?f`
          <div class="work-trace__md markdown-body">${Wn(Vn(n))}</div>
        `:k}
    ${!o&&!s?f`<pre class="work-trace__json-pre">${JSON.stringify(e,null,2)}</pre>`:k}
  `}function v0(e,t){if(!e||typeof e!="object")return f`
      <div class="work-trace__card work-trace__card--unknown">
        <span class="work-trace__step-num">${p("work.traceStep",{n:String(t)})}</span>
        <pre class="work-trace__fallback-pre">${JSON.stringify(e)}</pre>
      </div>
    `;const n=e,i=n.type;if(i==="tool_call"){const s=String(n.name??"");return f`
      <div class="work-trace__card work-trace__card--tool">
        <div class="work-trace__card-head">
          <span class="work-trace__step-num">${p("work.traceStep",{n:String(t)})}</span>
          <span class="work-trace__type-tag">${p("work.traceTypeToolCall")}</span>
          <span class="work-trace__tool-name">${h0(s)}</span>
        </div>
        <pre class="work-trace__args-pre">${m0(n.arguments)}</pre>
      </div>
    `}if(i==="observation"){const s=n.content,o=g0(s);return f`
      <div class="work-trace__card work-trace__card--obs">
        <div class="work-trace__card-head">
          <span class="work-trace__step-num">${p("work.traceStep",{n:String(t)})}</span>
          <span class="work-trace__type-tag">${p("work.traceTypeObservation")}</span>
        </div>
        ${y0(o,s)}
      </div>
    `}if(i==="metrics"){const s=n.stage!=null?String(n.stage):"—",o=f0(n.duration_ms);return f`
      <div class="work-trace__card work-trace__card--metrics">
        <div class="work-trace__card-head">
          <span class="work-trace__step-num">${p("work.traceStep",{n:String(t)})}</span>
          <span class="work-trace__type-tag">${p("work.traceTypeMetrics")}</span>
        </div>
        <div class="work-trace__metrics-row">
          <span class="work-trace__badge">${s}</span>
          <span class="work-trace__duration">${o}</span>
        </div>
      </div>
    `}return f`
    <div class="work-trace__card work-trace__card--unknown">
      <span class="work-trace__step-num">${p("work.traceStep",{n:String(t)})}</span>
      <pre class="work-trace__fallback-pre">${JSON.stringify(e,null,2)}</pre>
    </div>
  `}function b0(e){return!Array.isArray(e)||e.length===0?f``:f`
    <div class="work-trace" aria-label=${p("work.traceTimelineTitle")}>
      <div class="work-trace__heading">${p("work.traceTimelineTitle")}</div>
      <ol class="work-trace__list">
        ${e.map((t,n)=>f`<li class="work-trace__li">${v0(t,n+1)}</li>`)}
      </ol>
      <details class="work-trace__raw">
        <summary class="work-trace__raw-summary">${p("work.traceRawDebug")}</summary>
        <pre class="work-trace__raw-pre">${JSON.stringify(e,null,2)}</pre>
      </details>
    </div>
  `}const w0=[{value:"FACTORY_INC_TAX",labelKey:"work.priceLevels.FACTORY_INC_TAX"},{value:"FACTORY_EXC_TAX",labelKey:"work.priceLevels.FACTORY_EXC_TAX"},{value:"PURCHASE_EXC_TAX",labelKey:"work.priceLevels.PURCHASE_EXC_TAX"},{value:"A_MARGIN",labelKey:"work.priceLevels.A_MARGIN"},{value:"A_QUOTE",labelKey:"work.priceLevels.A_QUOTE"},{value:"B_MARGIN",labelKey:"work.priceLevels.B_MARGIN"},{value:"B_QUOTE",labelKey:"work.priceLevels.B_QUOTE"},{value:"C_MARGIN",labelKey:"work.priceLevels.C_MARGIN"},{value:"C_QUOTE",labelKey:"work.priceLevels.C_QUOTE"},{value:"D_MARGIN",labelKey:"work.priceLevels.D_MARGIN"},{value:"D_QUOTE",labelKey:"work.priceLevels.D_QUOTE"},{value:"D_LOW",labelKey:"work.priceLevels.D_LOW"},{value:"E_MARGIN",labelKey:"work.priceLevels.E_MARGIN"},{value:"E_QUOTE",labelKey:"work.priceLevels.E_QUOTE"}];function Bc(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}function zc(e){try{if(typeof e!="string"||!e.trim())return null;const t=e.trim();return t.startsWith("{")&&t.endsWith("}")||t.startsWith("[")&&t.endsWith("]")?JSON.parse(t):null}catch{return null}}function Hc(e){if(!Array.isArray(e))return[];const t=[],n=i=>{if(typeof i!="string"||!i.trim())return;const s=i.replace(/\\/g,"/").split("/").filter(Boolean).pop()??"";s&&!t.includes(s)&&t.push(s)};for(const i of e){const s=i,o=s.type,r=s.content;if(o==="observation"&&typeof r=="string"){const a=zc(r);if(a&&typeof a=="object"){n(a.output_path??a.filled_path);const c=a.result,d=typeof c=="string"?zc(c):c&&typeof c=="object"?c:null;d&&typeof d=="object"&&n(d.output_path??d.filled_path)}const l=r.match(/[A-Za-z]:[^\s"]+\.xlsx|\/[^\s"]+\.xlsx|[^\s"']+\.xlsx/);l&&l[0]&&n(l[0])}n(s.output_path??s.filled_path)}return t}function x0(e,t,n){return f`
    <li style="margin-bottom: 14px; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
      <div style="font-size: 13px; margin-bottom: 8px;">
        ${e.product_name??e.keywords??""}
        ${e.specification?f`<span class="muted"> 路 ${e.specification}</span>`:k}
        ${e.qty!=null?f`<span class="muted"> 路 ${p("work.qty")}: ${e.qty}</span>`:k}
      </div>
      <select
        .value=${t}
        @change=${i=>n(i.target.value)}
        aria-label=${p("work.choiceSelect")}
        style="width: 100%; max-width: 460px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border);"
      >
        <option value="__OOS__">${p("work.choiceOos")}</option>
        ${(e.options??[]).map(i=>f`<option value=${i.code}>${i.code}${i.matched_name?` 路 ${i.matched_name}`:""}${i.unit_price!=null?` 路 ${i.unit_price}`:""}</option>`)}
      </select>
    </li>
  `}function _0(e){return(e||"").trim().replace(/\\/g,"/").toLowerCase()}function k0(e){var He,ne,Se;const{basePath:t,workFilePaths:n,workOriginalFileNamesByPath:i,workRunning:s,workProgressStage:o,workRunStatus:r,workPendingChoices:a,workSelections:l,workResult:c,workError:d,workCustomerLevel:u,workDoRegisterOos:h,workPendingQuotationDraft:g,workQuotationDraftSaveStatus:m,workTextInput:y,workTextGenerating:_,workTextError:S,workPriceLevelOptions:R,onAddFile:M,onRemoveFile:A,onRenameFileName:T,onWorkTextChange:v,onGenerateFromText:E,onCustomerLevelChange:P,onDoRegisterOosChange:C,onRun:O,onCancel:D,onRetry:F,onSelectionChange:j,onResume:G,onQuotationLineChange:L,onQuotationDraftSave:H,onQuotationDraftDismiss:ee}=e,B=[p("work.stageExtract"),p("work.stageMatch"),p("work.stageFill")],we=(()=>{switch(r){case"idle":return p("work.status.idle");case"running":return p("work.status.running");case"awaiting_choices":return p("work.status.awaitingChoices");case"resuming":return p("work.status.resuming");case"done":return p("work.status.done");case"error":default:return p("work.status.error")}})(),$e=W=>{const V=Bc(t,"/api/quotation/upload?with_summary=0"),ae=new FormData;ae.append("file",W),fetch(V,{method:"POST",body:ae,credentials:"same-origin"}).then(fe=>fe.json()).then(fe=>{if((fe==null?void 0:fe.success)===!1)return;const Ge=fe.data??fe;typeof Ge.file_path=="string"&&M(Ge.file_path,Ge.file_name??W.name)}).catch(fe=>{console.warn("[work] upload failed",fe)})},oe=W=>{var fe;const V=W.target,ae=(fe=V.files)==null?void 0:fe[0];ae&&($e(ae),V.value="")},Ie=W=>{var ae;W.preventDefault();const V=(ae=W.dataTransfer)==null?void 0:ae.files;if(!(!V||!V.length))for(let fe=0;fe<V.length;fe+=1){const Ge=V.item(fe);Ge&&$e(Ge)}},re=W=>{W.preventDefault(),W.dataTransfer&&(W.dataTransfer.dropEffect="copy")};return f`
    <section class="card work-quotation" style="margin-bottom: 16px;" aria-label=${p("tabs.work")}>
      <div class="work-quotation__inner">
        <header class="work-quotation__head">
          <div class="card-title">${p("tabs.work")}</div>
          <p class="muted">${p("subtitles.work")}</p>
        </header>

        <div
          class="work-quotation__panel work-quotation__panel--upload"
          @dragover=${re}
          @dragenter=${re}
          @drop=${Ie}
        >
          <label class="work-quotation__panel-label">${p("work.uploadTitle")}</label>
          <input
            type="file"
            accept=".xlsx,.xls,.xlsm"
            class="work-quotation__file-input"
            @change=${oe}
            aria-label=${p("work.uploadTitle")}
          />
          ${n.length?f`
                <ul class="work-quotation__file-list">
                  ${n.map((W,V)=>{const ae=_0(W),fe=W.split(/[/\\]/).pop()??W,Ge=ae&&i[ae]||fe;return f`
                        <li style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                          <input
                            type="text"
                            .value=${Ge}
                            @change=${is=>T(W,is.target.value)}
                            style="flex: 1 1 auto; min-width: 0; padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border); font-size: 13px; word-break: break-all;"
                            aria-label=${p("work.fileDisplayName")}
                          />
                          <button
                            type="button"
                            class="btn btn-sm"
                            style="padding: 2px 8px;"
                            @click=${()=>A(V)}
                            aria-label=${p("work.removeFile")}
                          >
                            ${p("work.removeFile")}
                          </button>
                        </li>
                      `})}
                </ul>
              `:f`<p class="muted" style="margin-top: 8px;">${p("work.noFiles")}</p>`}
        </div>

        <div class="work-quotation__panel">
          <label class="work-quotation__panel-label">${p("work.textInputTitle")}</label>
          <p class="muted work-quotation__panel-hint">${p("work.textInputHint")}</p>
          <textarea
            class="work-quotation__textarea"
            .value=${y}
            @input=${W=>v(W.target.value)}
            placeholder=${p("work.textInputPlaceholder")}
            rows="6"
            ?disabled=${_}
            aria-label=${p("work.textInputTitle")}
          ></textarea>
          <div class="work-quotation__text-actions">
            <button
              type="button"
              class="btn"
              style="background: var(--accent); color: var(--bg);"
              ?disabled=${!y.trim()||_}
              @click=${E}
              aria-label=${p("work.generateFromText")}
            >
              ${p(_?"work.textGenerating":"work.generateFromText")}
            </button>
            ${S?f`<span style="color: var(--danger, #c00); font-size: 13px;" role="alert">${S}</span>`:k}
          </div>
        </div>

        <div class="work-quotation__options">
          <div class="work-quotation__customer-level">
            <label>${p("work.customerLevel")}</label>
            ${(()=>{const W=R&&R.length>0?R:w0.map(V=>({value:V.value,label:p(V.labelKey)}));return f`<select
                .value=${u}
                @change=${V=>P(V.target.value)}
                style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 160px;"
                aria-label=${p("work.customerLevel")}
              >
                ${W.map(V=>f`<option value=${V.value}>${V.label}</option>`)}
              </select>`})()}
          </div>
          <label style="display: flex; align-items: center; gap: 6px; font-size: 13px;">
            <input
              type="checkbox"
              ?checked=${h}
              @change=${W=>C(W.target.checked)}
              aria-label=${p("work.registerOos")}
            />
            ${p("work.registerOos")}
          </label>
        </div>

        <div class="work-quotation__run-block">
          ${s?f`
                <div class="work-quotation__stages">
                  ${B.map((W,V)=>f`
                      <span
                        style="
                        padding: 6px 12px;
                        border-radius: 8px;
                        font-size: 13px;
                        background: ${o>=0&&V===o?"var(--accent)":"var(--bg-secondary, #eee)"};
                        color: ${o>=0&&V===o?"var(--bg)":"var(--muted)"};
                      "
                      >
                        ${V+1}. ${W}
                      </span>
                    `)}
                </div>
                <p class="muted" style="font-size: 12px; margin: 0;">
                  ${p("work.currentStage")}: ${o>=0&&o<B.length?B[o]:p("work.running")}
                </p>
              `:k}

          <div class="work-quotation__actions">
            <div class="work-quotation__action-row">
              <button
                class="btn"
                style="background: var(--accent); color: var(--bg);"
                ?disabled=${n.length===0||s}
                @click=${O}
                aria-label=${p("work.run")}
              >
                ${p(s?"work.running":"work.run")}
              </button>
              ${s?f`<button class="btn btn-sm" @click=${D} aria-label=${p("work.cancel")}>${p("work.cancel")}</button>`:k}
              ${r==="error"?f`<button class="btn btn-sm" @click=${F} aria-label=${p("common.retry")}>${p("common.retry")}</button>`:k}
            </div>
            ${n.length===0?f`<span class="muted work-quotation__status-line">${p("work.runHint")}</span>`:k}
            <span class="muted work-quotation__status-line">${p("work.statusLabel")}: ${we}</span>
          </div>
        </div>

        ${d?f`
              <div class="work-quotation__error-banner" role="alert" aria-live="assertive">
                <p style="margin: 0; color: var(--danger, #e53935); font-size: 13px;">${d}</p>
              </div>
            `:k}
      </div>
    </section>

    ${r==="awaiting_choices"&&a.length?(()=>{const W=r;return f`
            <section class="card work-quotation--follow" style="margin-bottom: 16px;" aria-live="polite">
              <div class="work-quotation__inner">
                <div class="card-title">${p("work.awaitingTitle")}</div>
                <p class="muted" style="margin-bottom: 14px;">${p("work.awaitingHint")}</p>
                <ul style="list-style: none; padding: 0; margin: 0;">
                  ${a.map(V=>x0(V,l[V.id]??"__OOS__",ae=>j(V.id,ae)))}
                </ul>
                <div style="display: flex; gap: 10px; margin-top: 14px; flex-wrap: wrap;">
                  <button class="btn" style="background: var(--accent); color: var(--bg);" ?disabled=${s} @click=${G}>
                    ${p(s||W==="resuming"?"work.resuming":"work.resume")}
                  </button>
                  ${W==="error"?f`<button class="btn btn-sm" @click=${F}>${p("common.retry")}</button>`:k}
                </div>
              </div>
            </section>
          `})():k}

    ${(m==null?void 0:m.status)==="ok"?f`
          <section class="card work-quotation--follow" style="margin-bottom: 16px;" role="status" aria-live="polite">
            <div class="work-quotation__inner">
              <p style="color: var(--success, #2e7d32); margin: 0 0 4px 0;">${p("work.savedDraftNo",{no:m.draft_no})}</p>
              <p class="muted" style="margin: 0 0 10px 0; font-size: 12px;">${p("work.saveSuccessHint")}</p>
              <button class="btn btn-sm" @click=${ee}>${p("common.close")}</button>
            </div>
          </section>
        `:(He=g==null?void 0:g.lines)!=null&&He.length?f`
            <section class="card work-quotation--follow" style="margin-bottom: 16px;">
              <div class="work-quotation__inner">
                <div class="card-title">${p("work.pendingDraftTitle")}</div>
                <p class="muted" style="margin-bottom: 12px;">${p("work.pendingDraftHint")}</p>
                <div style="overflow-x: auto; margin-bottom: 14px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                  <thead>
                    <tr style="background: var(--bg-secondary, #eee);">
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">#</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("work.lineProduct")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("work.lineSpec")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("work.lineQty")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("work.lineCode")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("work.lineQuoteName")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("work.lineQuoteSpec")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("work.linePrice")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("work.lineAmount")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("work.lineAvailable")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("work.lineShortfall")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("work.lineIsShortage")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${g.lines.map((W,V)=>f`
                        <tr>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${V+1}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${W.product_name??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${W.specification??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="number" min="0" step="1" .value=${String(W.qty??"")} @change=${ae=>L(V,"qty",ae.target.value)} style="width: 72px;" aria-label=${p("work.lineQty")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="text" .value=${W.code??""} @change=${ae=>L(V,"code",ae.target.value)} style="width: 90px;" aria-label=${p("work.lineCode")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="text" .value=${W.quote_name??""} @change=${ae=>L(V,"quote_name",ae.target.value)} style="width: 120px;" aria-label=${p("work.lineQuoteName")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="text" .value=${W.quote_spec??""} @change=${ae=>L(V,"quote_spec",ae.target.value)} style="width: 120px;" aria-label=${p("work.lineQuoteSpec")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="number" min="0" step="0.01" .value=${W.unit_price!=null?String(W.unit_price):""} @change=${ae=>L(V,"unit_price",ae.target.value)} style="width: 90px;" aria-label=${p("work.linePrice")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${W.amount!=null?W.amount:""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${W.warehouse_qty??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${W.shortfall??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${W.is_shortage?p("common.yes"):p("common.no")}</td>
                        </tr>
                      `)}
                  </tbody>
                </table>
              </div>

              ${(m==null?void 0:m.status)==="error"?f`<p style="color: var(--danger, #c00); margin-bottom: 10px;">${m.error}</p>`:k}

                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                  <button class="btn" style="background: var(--accent); color: var(--bg);" ?disabled=${(m==null?void 0:m.status)==="saving"} @click=${H}>
                    ${(m==null?void 0:m.status)==="saving"?p("work.saving"):p("work.saveDraft")}
                  </button>
                  <button class="btn btn-sm" ?disabled=${(m==null?void 0:m.status)==="saving"} @click=${ee}>
                    ${p("common.cancel")}
                  </button>
                </div>
              </div>
            </section>
          `:k}

    ${c&&!((ne=g==null?void 0:g.lines)!=null&&ne.length)?f`
          <section class="card work-quotation--follow">
            <div class="work-quotation__inner">
              <div class="card-title">${p("work.resultTitle")}</div>
              ${Hc(c.trace).length?f`
                    <div style="margin-bottom: 14px;">
                      ${Hc(c.trace).map(W=>f`
                          <a href=${Bc(t,`/api/quotation/download?path=${encodeURIComponent(W)}`)} download=${W} class="btn btn-sm" style="margin-right: 8px; margin-bottom: 6px; text-decoration: none;">
                            ${p("work.download",{name:W})}
                          </a>
                        `)}
                    </div>
                  `:k}

              ${c.answer?f`<div style="white-space: pre-wrap; margin-bottom: 14px;">${c.answer}</div>`:k}
              ${c.error?f`<p style="color: var(--danger, #e53935);">${c.error}</p>`:k}

              ${(Se=c.trace)!=null&&Se.length?f`<div style="margin-top: 16px;">${b0(c.trace)}</div>`:k}
            </div>
          </section>
        `:k}
  `}function vs(e){return(e||"").trim().replace(/\\/g,"/").toLowerCase()}function $0(e){return e.tab!=="work"?k:k0({basePath:e.basePath,workFilePaths:e.workFilePaths,workRunning:e.workRunning,workProgressStage:e.workProgressStage,workRunStatus:e.workRunStatus,workRunId:e.workRunId,workPendingChoices:e.workPendingChoices,workSelections:e.workSelections,workResult:e.workResult,workError:e.workError,workCustomerLevel:e.workCustomerLevel,workDoRegisterOos:e.workDoRegisterOos,workOriginalFileNamesByPath:e.workOriginalFileNamesByPath,workPendingQuotationDraft:e.workPendingQuotationDraft,workQuotationDraftSaveStatus:e.workQuotationDraftSaveStatus,workTextInput:e.workTextInput,workTextGenerating:e.workTextGenerating,workTextError:e.workTextError,workPriceLevelOptions:e.workPriceLevelOptions,onWorkTextChange:t=>{e.workTextInput=t},onGenerateFromText:()=>{Uv(e)},onAddFile:(t,n)=>{e.workFilePaths.includes(t)||(e.workFilePaths=[...e.workFilePaths,t]);const i=vs(t);i&&(e.workOriginalFileNamesByPath={...e.workOriginalFileNamesByPath,[i]:(n||"").trim()||t.split(/[/\\]/).pop()||t})},onRenameFileName:(t,n)=>{const i=vs(t);if(!i)return;const s=(n||"").trim(),o=t.split(/[/\\]/).pop()||t;e.workOriginalFileNamesByPath={...e.workOriginalFileNamesByPath,[i]:s||o};const r=e.workPendingQuotationDraft;r&&r.file_path&&vs(r.file_path)===i&&(e.workPendingQuotationDraft={...r,name:s||o})},onRemoveFile:t=>{const n=e.workFilePaths[t]??"";e.workFilePaths=e.workFilePaths.filter((s,o)=>o!==t);const i=vs(n);if(i&&e.workOriginalFileNamesByPath[i]!==void 0){const s={...e.workOriginalFileNamesByPath};delete s[i],e.workOriginalFileNamesByPath=s}},onCustomerLevelChange:t=>{e.workCustomerLevel=t},onDoRegisterOosChange:t=>{e.workDoRegisterOos=t},onRun:()=>void Hh(e),onCancel:()=>zv(e),onRetry:()=>void Hv(e),onSelectionChange:(t,n)=>{e.workSelections={...e.workSelections,[t]:n}},onResume:()=>void Uh(e),onQuotationLineChange:(t,n,i)=>{var a;const s=e.workPendingQuotationDraft;if(!((a=s==null?void 0:s.lines)!=null&&a.length)||t<0||t>=s.lines.length)return;const o=s.lines.slice(),r={...o[t]};if(n==="qty"){const l=Number(i);r.qty=Number.isFinite(l)?l:0}else if(n==="unit_price"){const l=String(i??"").trim();if(!l)r.unit_price=null;else{const c=Number(l);r.unit_price=Number.isFinite(c)?c:null}}else r[n]=i;if(n==="qty"||n==="unit_price"){const l=Number(r.qty??0),c=r.unit_price==null?NaN:Number(r.unit_price);r.amount=Number.isFinite(l)&&Number.isFinite(c)?l*c:null}o[t]=r,e.workPendingQuotationDraft={...s,lines:o}},onQuotationDraftSave:()=>{typeof window<"u"&&window.confirm(p("work.saveConfirm"))&&jv(e).then(t=>{t&&e.loadFulfillDrafts()})},onQuotationDraftDismiss:()=>{e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null}})}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:S0}=Ip,Uc=e=>e,A0=e=>e.strings===void 0,qc=()=>document.createComment(""),ui=(e,t,n)=>{var o;const i=e._$AA.parentNode,s=t===void 0?e._$AB:t._$AA;if(n===void 0){const r=i.insertBefore(qc(),s),a=i.insertBefore(qc(),s);n=new S0(r,a,e,e.options)}else{const r=n._$AB.nextSibling,a=n._$AM,l=a!==e;if(l){let c;(o=n._$AQ)==null||o.call(n,e),n._$AM=e,n._$AP!==void 0&&(c=e._$AU)!==a._$AU&&n._$AP(c)}if(r!==s||l){let c=n._$AA;for(;c!==r;){const d=Uc(c).nextSibling;Uc(i).insertBefore(c,s),c=d}}}return n},Qt=(e,t,n=e)=>(e._$AI(t,n),e),T0={},C0=(e,t=T0)=>e._$AH=t,E0=e=>e._$AH,yr=e=>{e._$AR(),e._$AA.remove()};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const jc=(e,t,n)=>{const i=new Map;for(let s=t;s<=n;s++)i.set(e[s],s);return i},lf=Xa(class extends Ja{constructor(e){if(super(e),e.type!==Ya.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,n){let i;n===void 0?n=t:t!==void 0&&(i=t);const s=[],o=[];let r=0;for(const a of e)s[r]=i?i(a,r):r,o[r]=n(a,r),r++;return{values:o,keys:s}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,i]){const s=E0(e),{values:o,keys:r}=this.dt(t,n,i);if(!Array.isArray(s))return this.ut=r,o;const a=this.ut??(this.ut=[]),l=[];let c,d,u=0,h=s.length-1,g=0,m=o.length-1;for(;u<=h&&g<=m;)if(s[u]===null)u++;else if(s[h]===null)h--;else if(a[u]===r[g])l[g]=Qt(s[u],o[g]),u++,g++;else if(a[h]===r[m])l[m]=Qt(s[h],o[m]),h--,m--;else if(a[u]===r[m])l[m]=Qt(s[u],o[m]),ui(e,l[m+1],s[u]),u++,m--;else if(a[h]===r[g])l[g]=Qt(s[h],o[g]),ui(e,s[u],s[h]),h--,g++;else if(c===void 0&&(c=jc(r,g,m),d=jc(a,u,h)),c.has(a[u]))if(c.has(a[h])){const y=d.get(r[g]),_=y!==void 0?s[y]:null;if(_===null){const S=ui(e,s[u]);Qt(S,o[g]),l[g]=S}else l[g]=Qt(_,o[g]),ui(e,s[u],_),s[y]=null;g++}else yr(s[h]),h--;else yr(s[u]),u++;for(;g<=m;){const y=ui(e,l[m+1]);Qt(y,o[g]),l[g++]=y}for(;u<=h;){const y=s[u++];y!==null&&yr(y)}return this.ut=r,C0(e,l),Nt}}),ye={messageSquare:f`
    <svg viewBox="0 0 24 24">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  `,barChart:f`
    <svg viewBox="0 0 24 24">
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  `,link:f`
    <svg viewBox="0 0 24 24">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  `,radio:f`
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="2" />
      <path
        d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"
      />
    </svg>
  `,fileText:f`
    <svg viewBox="0 0 24 24">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  `,database:f`
    <svg viewBox="0 0 24 24">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  `,zap:f`
    <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
  `,monitor:f`
    <svg viewBox="0 0 24 24">
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  `,settings:f`
    <svg viewBox="0 0 24 24">
      <path
        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
  `,bug:f`
    <svg viewBox="0 0 24 24">
      <path d="m8 2 1.88 1.88" />
      <path d="M14.12 3.88 16 2" />
      <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
      <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
      <path d="M12 20v-9" />
      <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
      <path d="M6 13H2" />
      <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
      <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
      <path d="M22 13h-4" />
      <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
    </svg>
  `,scrollText:f`
    <svg viewBox="0 0 24 24">
      <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
      <path d="M19 17V5a2 2 0 0 0-2-2H4" />
      <path d="M15 8h-5" />
      <path d="M15 12h-5" />
    </svg>
  `,folder:f`
    <svg viewBox="0 0 24 24">
      <path
        d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      />
    </svg>
  `,menu:f`
    <svg viewBox="0 0 24 24">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  `,x:f`
    <svg viewBox="0 0 24 24">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  `,check:f`
    <svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg>
  `,arrowDown:f`
    <svg viewBox="0 0 24 24">
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  `,copy:f`
    <svg viewBox="0 0 24 24">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  `,search:f`
    <svg viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  `,brain:f`
    <svg viewBox="0 0 24 24">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  `,book:f`
    <svg viewBox="0 0 24 24">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  `,loader:f`
    <svg viewBox="0 0 24 24">
      <path d="M12 2v4" />
      <path d="m16.2 7.8 2.9-2.9" />
      <path d="M18 12h4" />
      <path d="m16.2 16.2 2.9 2.9" />
      <path d="M12 18v4" />
      <path d="m4.9 19.1 2.9-2.9" />
      <path d="M2 12h4" />
      <path d="m4.9 4.9 2.9 2.9" />
    </svg>
  `,wrench:f`
    <svg viewBox="0 0 24 24">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      />
    </svg>
  `,fileCode:f`
    <svg viewBox="0 0 24 24">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="m10 13-2 2 2 2" />
      <path d="m14 17 2-2-2-2" />
    </svg>
  `,edit:f`
    <svg viewBox="0 0 24 24">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  `,penLine:f`
    <svg viewBox="0 0 24 24">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  `,paperclip:f`
    <svg viewBox="0 0 24 24">
      <path
        d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"
      />
    </svg>
  `,globe:f`
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  `,image:f`
    <svg viewBox="0 0 24 24">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  `,smartphone:f`
    <svg viewBox="0 0 24 24">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  `,plug:f`
    <svg viewBox="0 0 24 24">
      <path d="M12 22v-5" />
      <path d="M9 8V2" />
      <path d="M15 8V2" />
      <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
    </svg>
  `,circle:f`
    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
  `,puzzle:f`
    <svg viewBox="0 0 24 24">
      <path
        d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.076.874.54 1.02 1.02a2.5 2.5 0 1 0 3.237-3.237c-.48-.146-.944-.505-1.02-1.02a.98.98 0 0 1 .303-.917l1.526-1.526A2.402 2.402 0 0 1 11.998 2c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.236 3.236c-.464.18-.894.527-.967 1.02Z"
      />
    </svg>
  `};function R0(e){var s,o,r,a,l;const t=(s=e.hello)==null?void 0:s.snapshot,n=(r=(o=t==null?void 0:t.sessionDefaults)==null?void 0:o.mainSessionKey)==null?void 0:r.trim();if(n)return n;const i=(l=(a=t==null?void 0:t.sessionDefaults)==null?void 0:a.mainKey)==null?void 0:l.trim();return i||"main"}function P0(e,t){e.sessionKey=t,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:t,lastActiveSessionKey:t})}function M0(e,t){const n=yh(t,e.basePath);return f`
    <a
      href=${n}
      class="nav-item ${e.tab===t?"active":""}"
      @click=${i=>{if(!(i.defaultPrevented||i.button!==0||i.metaKey||i.ctrlKey||i.shiftKey||i.altKey)){if(i.preventDefault(),t==="chat"){const s=R0(e);e.sessionKey!==s&&(P0(e,s),e.loadAssistantIdentity())}e.setTab(t)}}}
      title=${qr(t)}
    >
      <span class="nav-item__icon" aria-hidden="true">${ye[uy(t)]}</span>
      <span class="nav-item__text">${qr(t)}</span>
    </a>
  `}function D0(e){const t=L0(e.hello,e.sessionsResult),n=F0(e.sessionKey,e.sessionsResult,t),i=e.onboarding,s=e.onboarding,o=e.onboarding?!1:e.settings.chatShowThinking,r=e.onboarding?!0:e.settings.chatFocusMode,a=f`
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path>
      <path d="M21 3v5h-5"></path>
    </svg>
  `,l=f`
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M4 7V4h3"></path>
      <path d="M20 7V4h-3"></path>
      <path d="M4 17v3h3"></path>
      <path d="M20 17v3h-3"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  `;return f`
    <div class="chat-controls">
      <label class="field chat-controls__session">
        <select
          .value=${e.sessionKey}
          ?disabled=${!e.connected}
          @change=${c=>{const d=c.target.value;e.sessionKey=d,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:d,lastActiveSessionKey:d}),e.loadAssistantIdentity(),Ty(e,d),Kn(e)}}
        >
          ${lf(n,c=>c.key,c=>f`<option value=${c.key} title=${c.key}>
                ${c.displayName??c.key}
              </option>`)}
        </select>
      </label>
      <button
        class="btn btn--sm btn--icon"
        ?disabled=${e.chatLoading||!e.connected}
        @click=${async()=>{const c=e;c.chatManualRefreshInFlight=!0,c.chatNewMessagesBelow=!1,await c.updateComplete,c.resetToolStream();try{await Ph(e,{scheduleScroll:!1}),c.scrollToBottom({smooth:!0})}finally{requestAnimationFrame(()=>{c.chatManualRefreshInFlight=!1,c.chatNewMessagesBelow=!1})}}}
        title=${p("chat.refreshTitle")}
      >
        ${a}
      </button>
      <span class="chat-controls__separator">|</span>
      <button
        class="btn btn--sm btn--icon ${o?"active":""}"
        ?disabled=${i}
        @click=${()=>{i||e.applySettings({...e.settings,chatShowThinking:!e.settings.chatShowThinking})}}
        aria-pressed=${o}
        title=${p(i?"chat.onboardingDisabled":"chat.thinkingToggle")}
      >
        ${ye.brain}
      </button>
      <button
        class="btn btn--sm btn--icon ${r?"active":""}"
        ?disabled=${s}
        @click=${()=>{s||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})}}
        aria-pressed=${r}
        title=${p(s?"chat.onboardingDisabled":"chat.focusToggle")}
      >
        ${l}
      </button>
    </div>
  `}function L0(e,t){var o,r,a,l,c;const n=e==null?void 0:e.snapshot,i=(r=(o=n==null?void 0:n.sessionDefaults)==null?void 0:o.mainSessionKey)==null?void 0:r.trim();if(i)return i;const s=(l=(a=n==null?void 0:n.sessionDefaults)==null?void 0:a.mainKey)==null?void 0:l.trim();return s||((c=t==null?void 0:t.sessions)!=null&&c.some(d=>d.key==="main")?"main":null)}const Hs={bluebubbles:"iMessage",telegram:"Telegram",discord:"Discord",signal:"Signal",slack:"Slack",whatsapp:"WhatsApp",matrix:"Matrix",email:"Email",sms:"SMS"},I0=Object.keys(Hs);function Kc(e){return e.charAt(0).toUpperCase()+e.slice(1)}function O0(e){if(e==="main"||e==="agent:main:main")return{prefix:"",fallbackName:"Main Session"};if(e.includes(":subagent:"))return{prefix:"Subagent:",fallbackName:"Subagent:"};if(e.includes(":cron:"))return{prefix:"Cron:",fallbackName:"Cron Job:"};const t=e.match(/^agent:[^:]+:([^:]+):direct:(.+)$/);if(t){const i=t[1],s=t[2];return{prefix:"",fallbackName:`${Hs[i]??Kc(i)} · ${s}`}}const n=e.match(/^agent:[^:]+:([^:]+):group:(.+)$/);if(n){const i=n[1];return{prefix:"",fallbackName:`${Hs[i]??Kc(i)} Group`}}for(const i of I0)if(e===i||e.startsWith(`${i}:`))return{prefix:"",fallbackName:`${Hs[i]} Session`};return{prefix:"",fallbackName:e}}function vr(e,t){var a,l;const n=((a=t==null?void 0:t.label)==null?void 0:a.trim())||"",i=((l=t==null?void 0:t.displayName)==null?void 0:l.trim())||"",{prefix:s,fallbackName:o}=O0(e),r=c=>s?new RegExp(`^${s.replace(/[.*+?^${}()|[\\]\\]/g,"\\$&")}\\s*`,"i").test(c)?c:`${s} ${c}`:c;return n&&n!==e?r(n):i&&i!==e?r(i):o}function F0(e,t,n){var a,l;const i=new Set,s=[],o=n&&((a=t==null?void 0:t.sessions)==null?void 0:a.find(c=>c.key===n)),r=(l=t==null?void 0:t.sessions)==null?void 0:l.find(c=>c.key===e);if(n&&(i.add(n),s.push({key:n,displayName:vr(n,o||void 0)})),i.has(e)||(i.add(e),s.push({key:e,displayName:vr(e,r)})),t!=null&&t.sessions)for(const c of t.sessions)i.has(c.key)||(i.add(c.key),s.push({key:c.key,displayName:vr(c.key,c)}));return s}const N0=["system","light","dark"];function B0(e){const t=Math.max(0,N0.indexOf(e.theme)),n=i=>s=>{const r={element:s.currentTarget};(s.clientX||s.clientY)&&(r.pointerClientX=s.clientX,r.pointerClientY=s.clientY),e.setTheme(i,r)};return f`
    <div class="theme-toggle" style="--theme-index: ${t};">
      <div class="theme-toggle__track" role="group" aria-label="Theme">
        <span class="theme-toggle__indicator"></span>
        <button
          class="theme-toggle__button ${e.theme==="system"?"active":""}"
          @click=${n("system")}
          aria-pressed=${e.theme==="system"}
          aria-label="System theme"
          title="System"
        >
          ${U0()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="light"?"active":""}"
          @click=${n("light")}
          aria-pressed=${e.theme==="light"}
          aria-label="Light theme"
          title="Light"
        >
          ${z0()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="dark"?"active":""}"
          @click=${n("dark")}
          aria-pressed=${e.theme==="dark"}
          aria-label="Dark theme"
          title="Dark"
        >
          ${H0()}
        </button>
      </div>
    </div>
  `}function z0(){return f`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2"></path>
      <path d="M12 20v2"></path>
      <path d="m4.93 4.93 1.41 1.41"></path>
      <path d="m17.66 17.66 1.41 1.41"></path>
      <path d="M2 12h2"></path>
      <path d="M20 12h2"></path>
      <path d="m6.34 17.66-1.41 1.41"></path>
      <path d="m19.07 4.93-1.41 1.41"></path>
    </svg>
  `}function H0(){return f`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
      ></path>
    </svg>
  `}function U0(){return f`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="20" height="14" x="2" y="3" rx="2"></rect>
      <line x1="8" x2="16" y1="21" y2="21"></line>
      <line x1="12" x2="12" y1="17" y2="21"></line>
    </svg>
  `}function oa(e){var t,n,i;return((t=e.name)==null?void 0:t.trim())||((i=(n=e.identity)==null?void 0:n.name)==null?void 0:i.trim())||e.id}function bs(e){const t=e.trim();if(!t||t.length>16)return!1;let n=!1;for(let i=0;i<t.length;i+=1)if(t.charCodeAt(i)>127){n=!0;break}return!(!n||t.includes("://")||t.includes("/")||t.includes("."))}function cf(e,t){var r,a,l,c,d,u;const n=(r=t==null?void 0:t.emoji)==null?void 0:r.trim();if(n&&bs(n))return n;const i=(l=(a=e.identity)==null?void 0:a.emoji)==null?void 0:l.trim();if(i&&bs(i))return i;const s=(c=t==null?void 0:t.avatar)==null?void 0:c.trim();if(s&&bs(s))return s;const o=(u=(d=e.identity)==null?void 0:d.avatar)==null?void 0:u.trim();return o&&bs(o)?o:""}function df(e,t){return t&&e===t?"default":null}const ws=[{id:"workspace",label:"Workspace Skills",sources:["openclaw-workspace"]},{id:"built-in",label:"Built-in Skills",sources:["openclaw-bundled"]},{id:"installed",label:"Installed Skills",sources:["openclaw-managed"]},{id:"extra",label:"Extra Skills",sources:["openclaw-extra"]}];function q0(e){var o;const t=new Map;for(const r of ws)t.set(r.id,{id:r.id,label:r.label,skills:[]});const n=ws.find(r=>r.id==="built-in"),i={id:"other",label:"Other Skills",skills:[]};for(const r of e){const a=r.bundled?n:ws.find(l=>l.sources.includes(r.source));a?(o=t.get(a.id))==null||o.skills.push(r):i.skills.push(r)}const s=ws.map(r=>t.get(r.id)).filter(r=>!!(r&&r.skills.length>0));return i.skills.length>0&&s.push(i),s}function j0(e){return[...e.missing.bins.map(t=>`bin:${t}`),...e.missing.env.map(t=>`env:${t}`),...e.missing.config.map(t=>`config:${t}`),...e.missing.os.map(t=>`os:${t}`)]}function K0(e){const t=[];return e.disabled&&t.push("disabled"),e.blockedByAllowlist&&t.push("blocked by allowlist"),t}function W0(e){const t=e.skill,n=!!e.showBundledBadge;return f`
    <div class="chip-row" style="margin-top: 6px;">
      <span class="chip">${t.source}</span>
      ${n?f`
              <span class="chip">bundled</span>
            `:k}
      <span class="chip ${t.eligible?"chip-ok":"chip-warn"}">
        ${t.eligible?"eligible":"blocked"}
      </span>
      ${t.disabled?f`
              <span class="chip chip-warn">disabled</span>
            `:k}
    </div>
  `}function V0(e){const{tools:t}=e;return t.length===0?f`
      <section class="card">
        <div class="card-title">Tools</div>
        <div class="muted" style="margin-top: 12px;">暂无已注册工具</div>
      </section>
    `:f`
    <section class="card">
      <div class="card-title">Tools</div>
      <div class="card-sub">${t.length} registered</div>
      <div style="margin-top: 12px; display: flex; flex-direction: column; gap: 4px;">
        ${t.map(n=>G0(n))}
      </div>
    </section>
  `}function G0(e){const t=JSON.stringify(e.parameters,null,2),n=e.description.length>80?e.description.slice(0,80)+"…":e.description;return f`
    <details class="tool-row">
      <summary class="tool-row-summary">
        <span class="mono" style="font-weight: 600; min-width: 220px; display: inline-block;"
          >${e.name}</span
        >
        <span class="muted">${n}</span>
      </summary>
      <pre class="tool-row-params">${t}</pre>
    </details>
  `}function Q0(e){var o,r,a,l;const t=((o=e.agentsList)==null?void 0:o.agents)??[],n=((r=e.agentsList)==null?void 0:r.defaultId)??null,i=e.selectedAgentId??n??((a=t[0])==null?void 0:a.id)??null,s=i?t.find(c=>c.id===i)??null:null;return f`
    <div class="agents-layout">
      <section class="card agents-sidebar">
        <div class="row" style="justify-content: space-between;">
          <div>
            <div class="card-title">Agents</div>
            <div class="card-sub">${t.length} configured.</div>
          </div>
          <button class="btn btn--sm" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"Loading…":"Refresh"}
          </button>
        </div>
        ${e.error?f`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:k}
        <div class="agent-list" style="margin-top: 12px;">
          ${t.length===0?f`
                  <div class="muted">No agents found.</div>
                `:t.map(c=>{const d=df(c.id,n),u=cf(c,e.agentIdentityById[c.id]??null);return f`
                    <button
                      type="button"
                      class="agent-row ${i===c.id?"active":""}"
                      @click=${()=>e.onSelectAgent(c.id)}
                    >
                      <div class="agent-avatar">${u||oa(c).slice(0,1)}</div>
                      <div class="agent-info">
                        <div class="agent-title">${oa(c)}</div>
                        <div class="agent-sub mono">${c.id}</div>
                      </div>
                      ${d?f`<span class="agent-pill">${d}</span>`:k}
                    </button>
                  `})}
        </div>
      </section>
      <section class="agents-main">
        ${s?f`
                ${Y0(s,n,e.agentIdentityById[s.id]??null)}
                ${X0(e.activePanel,c=>e.onSelectPanel(c))}
                ${e.activePanel==="overview"?J0({agentInfo:e.agentInfo,agentInfoLoading:e.agentInfoLoading,agentInfoError:e.agentInfoError}):k}
                ${e.activePanel==="tools"?V0({tools:((l=e.agentInfo)==null?void 0:l.tools)??[]}):k}
              `:f`
                <div class="card">
                  <div class="card-title">Select an agent</div>
                  <div class="card-sub">Pick an agent to inspect its workspace and tools.</div>
                </div>
              `}
      </section>
    </div>
  `}function Y0(e,t,n){var a,l;const i=df(e.id,t),s=oa(e),o=((l=(a=e.identity)==null?void 0:a.theme)==null?void 0:l.trim())||"Agent workspace and routing.",r=cf(e,n);return f`
    <section class="card agent-header">
      <div class="agent-header-main">
        <div class="agent-avatar agent-avatar--lg">${r||s.slice(0,1)}</div>
        <div>
          <div class="card-title">${s}</div>
          <div class="card-sub">${o}</div>
        </div>
      </div>
      <div class="agent-header-meta">
        <div class="mono">${e.id}</div>
        ${i?f`<span class="agent-pill">${i}</span>`:k}
      </div>
    </section>
  `}function X0(e,t){return f`
    <div class="agent-tabs">
      ${[{id:"overview",label:"Overview"},{id:"tools",label:"Tools"}].map(i=>f`
          <button
            class="agent-tab ${e===i.id?"active":""}"
            type="button"
            @click=${()=>t(i.id)}
          >
            ${i.label}
          </button>
        `)}
    </div>
  `}function J0(e){const{agentInfo:t,agentInfoLoading:n,agentInfoError:i}=e;if(n)return f`<section class="card"><div class="muted">Loading…</div></section>`;if(i)return f`<section class="card"><div class="callout danger">${i}</div></section>`;if(!t)return f`<section class="card"><div class="muted">No data.</div></section>`;const{llm:s,health:o,agent:r}=t;return f`
    <section class="card">
      <div class="card-title">${r.name}</div>
      <div class="card-sub" style="margin-bottom: 16px;">${r.version}</div>
      <div class="agents-overview-grid">
        <div class="agent-kv">
          <div class="label">Primary Model</div>
          <div class="mono">${s.primary_model}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Provider</div>
          <div class="mono">${s.primary_provider}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Fallback Model</div>
          ${s.fallback_configured?f`<div class="mono">${s.fallback_model}</div>`:f`<div class="muted">未配置</div>`}
        </div>
        <div class="agent-kv">
          <div class="label">Max Tokens</div>
          <div class="mono">${s.max_tokens.toLocaleString()}</div>
        </div>
        <div class="agent-kv">
          <div class="label">状态</div>
          <div>
            <span style="color: var(--color-success, #22c55e);">●</span>
            ${o.status}
          </div>
        </div>
        <div class="agent-kv">
          <div class="label">工具数</div>
          <div class="mono">${o.tool_count}</div>
        </div>
        <div class="agent-kv">
          <div class="label">活跃 Session</div>
          <div class="mono">${o.active_sessions??"—"}</div>
        </div>
      </div>
    </section>
  `}function Wc(e){var t;e&&((t=navigator.clipboard)==null||t.writeText(e).catch(()=>{}))}function Z0(e){const{loading:t,saving:n,error:i,content:s,lastSuccessAt:o,dependentFiles:r,onReload:a,onSave:l,onContentChange:c}=e,d=o!=null?new Date(o).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"";return f`
    <section class="card">
      <div class="row" style="justify-content: space-between; align-items: flex-start;">
        <div>
          <div class="card-title">${p("businessKnowledge.title")}</div>
          <div class="card-sub">
            ${p("businessKnowledge.subtitle")}
          </div>
        </div>
        <div class="row" style="gap: 8px; align-items: center;">
          ${d?f`<span class="muted">
                ${p("businessKnowledge.lastSavedAt",{time:d})}
              </span>`:k}
          <button class="btn" ?disabled=${t} @click=${a}>
            ${p(t?"businessKnowledge.actions.reloading":"businessKnowledge.actions.reload")}
          </button>
          <button class="btn btn--primary" ?disabled=${t||n} @click=${()=>l(s)}>
            ${p(n?"businessKnowledge.actions.saving":"businessKnowledge.actions.save")}
          </button>
        </div>
      </div>
      ${i?f`<div class="callout danger" style="margin-top: 12px;">${i}</div>`:k}
      ${r&&(r.mapping_table||r.price_library)?f`
            <div class="callout" style="margin-top: 12px; padding: 12px;">
              <div style="font-weight: 600; margin-bottom: 8px;">
                ${p("businessKnowledge.relatedFiles.title")}
              </div>
              <p class="muted" style="margin: 0 0 10px 0; font-size: 0.9rem;">
                ${p("businessKnowledge.relatedFiles.hint")}
              </p>
              ${r.mapping_table?f`
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; flex-wrap: wrap;">
                      <span style="min-width: 100px;">
                        ${p("businessKnowledge.relatedFiles.mappingTableLabel")}
                      </span>
                      <code style="flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; font-size: 0.85rem;">${r.mapping_table}</code>
                      <button
                        class="btn"
                        style="flex-shrink: 0;"
                        @click=${()=>Wc(r.mapping_table)}
                        title=${p("businessKnowledge.relatedFiles.copyPath")}
                      >
                        ${p("businessKnowledge.relatedFiles.copyPath")}
                      </button>
                    </div>
                  `:k}
              ${r.price_library?f`
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                      <span style="min-width: 100px;">
                        ${p("businessKnowledge.relatedFiles.priceLibraryLabel")}
                      </span>
                      <code style="flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; font-size: 0.85rem;">${r.price_library}</code>
                      <button
                        class="btn"
                        style="flex-shrink: 0;"
                        @click=${()=>Wc(r.price_library)}
                        title=${p("businessKnowledge.relatedFiles.copyPath")}
                      >
                        ${p("businessKnowledge.relatedFiles.copyPath")}
                      </button>
                    </div>
                  `:k}
            </div>
          `:k}
      <div style="margin-top: 16px;">
        <textarea
          class="code-block"
          style="width: 100%; min-height: 360px; font-family: var(--font-mono, monospace); font-size: 0.9rem; padding: 12px; resize: vertical; box-sizing: border-box;"
          .value=${s}
          ?disabled=${t}
          @input=${u=>{const h=u.target;c((h==null?void 0:h.value)??"")}}
          placeholder=${p("businessKnowledge.editor.placeholder")}
        ></textarea>
      </div>
    </section>
  `}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ti=(e,t)=>{var i;const n=e._$AN;if(n===void 0)return!1;for(const s of n)(i=s._$AO)==null||i.call(s,t,!1),Ti(s,t);return!0},no=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while((n==null?void 0:n.size)===0)},uf=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),nw(t)}};function ew(e){this._$AN!==void 0?(no(this),this._$AM=e,uf(this)):this._$AM=e}function tw(e,t=!1,n=0){const i=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(t)if(Array.isArray(i))for(let o=n;o<i.length;o++)Ti(i[o],!1),no(i[o]);else i!=null&&(Ti(i,!1),no(i));else Ti(this,e)}const nw=e=>{e.type==Ya.CHILD&&(e._$AP??(e._$AP=tw),e._$AQ??(e._$AQ=ew))};class iw extends Ja{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,n,i){super._$AT(t,n,i),uf(this),this.isConnected=t._$AU}_$AO(t,n=!0){var i,s;t!==this.isConnected&&(this.isConnected=t,t?(i=this.reconnected)==null||i.call(this):(s=this.disconnected)==null||s.call(this)),n&&(Ti(this,t),no(this))}setValue(t){if(A0(this._$Ct))this._$Ct._$AI(t,this);else{const n=[...this._$Ct._$AH];n[this._$Ci]=t,this._$Ct._$AI(n,this,0)}}disconnected(){}reconnected(){}}const br=new WeakMap,sw=Xa(class extends iw{render(e){return k}update(e,[t]){var i;const n=t!==this.G;return n&&this.G!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=(i=e.options)==null?void 0:i.host,this.rt(this.ct=e.element)),k}rt(e){if(this.isConnected||(e=void 0),typeof this.G=="function"){const t=this.ht??globalThis;let n=br.get(t);n===void 0&&(n=new WeakMap,br.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){var e,t;return typeof this.G=="function"?(e=br.get(this.ht??globalThis))==null?void 0:e.get(this.G):(t=this.G)==null?void 0:t.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),ow=new RegExp("\\p{Script=Hebrew}|\\p{Script=Arabic}|\\p{Script=Syriac}|\\p{Script=Thaana}|\\p{Script=Nko}|\\p{Script=Samaritan}|\\p{Script=Mandaic}|\\p{Script=Adlam}|\\p{Script=Phoenician}|\\p{Script=Lydian}","u");function hf(e,t=/[\s\p{P}\p{S}]/u){if(!e)return"ltr";for(const n of e)if(!t.test(n))return ow.test(n)?"rtl":"ltr";return"ltr"}const rw=1500,aw=2e3,ff="Copy as markdown",lw="Copied",cw="Copy failed";async function dw(e){if(!e)return!1;try{return await navigator.clipboard.writeText(e),!0}catch{return!1}}function xs(e,t){e.title=t,e.setAttribute("aria-label",t)}function uw(e){const t=e.label??ff;return f`
    <button
      class="chat-copy-btn"
      type="button"
      title=${t}
      aria-label=${t}
      @click=${async n=>{const i=n.currentTarget;if(!i||i.dataset.copying==="1")return;i.dataset.copying="1",i.setAttribute("aria-busy","true"),i.disabled=!0;const s=await dw(e.text());if(i.isConnected){if(delete i.dataset.copying,i.removeAttribute("aria-busy"),i.disabled=!1,!s){i.dataset.error="1",xs(i,cw),window.setTimeout(()=>{i.isConnected&&(delete i.dataset.error,xs(i,t))},aw);return}i.dataset.copied="1",xs(i,lw),window.setTimeout(()=>{i.isConnected&&(delete i.dataset.copied,xs(i,t))},rw)}}}
    >
      <span class="chat-copy-btn__icon" aria-hidden="true">
        <span class="chat-copy-btn__icon-copy">${ye.copy}</span>
        <span class="chat-copy-btn__icon-check">${ye.check}</span>
      </span>
    </button>
  `}function hw(e){return uw({text:()=>e,label:ff})}function Ln(e){const t=e;let n=typeof t.role=="string"?t.role:"unknown";const i=typeof t.toolCallId=="string"||typeof t.tool_call_id=="string",s=t.content,o=Array.isArray(s)?s:null,r=Array.isArray(o)&&o.some(u=>{const h=u,g=(typeof h.type=="string"?h.type:"").toLowerCase();return g==="toolresult"||g==="tool_result"}),a=typeof t.toolName=="string"||typeof t.tool_name=="string";(i||r||a)&&(n="toolResult");let l=[];typeof t.content=="string"?l=[{type:"text",text:t.content}]:Array.isArray(t.content)?l=t.content.map(u=>({type:u.type||"text",text:u.text,name:u.name,args:u.args||u.arguments})):typeof t.text=="string"&&(l=[{type:"text",text:t.text}]);const c=typeof t.timestamp=="number"?t.timestamp:Date.now(),d=typeof t.id=="string"?t.id:void 0;return{role:n,content:l,timestamp:c,id:d}}function Eo(e){const t=e.toLowerCase();return e==="user"||e==="User"?e:e==="assistant"?"assistant":e==="system"?"system":t==="toolresult"||t==="tool_result"||t==="tool"||t==="function"?"tool":e}function pf(e){const t=e,n=typeof t.role=="string"?t.role.toLowerCase():"";return n==="toolresult"||n==="tool_result"}function fw(e){return(e??"").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())||"Tool"}function pw(e){const t=(e??"").trim();return t?t.replace(/\s+/g,"_").toLowerCase():""}function gw(e){return(e??"").trim().toLowerCase()||"use"}const mw={icon:"puzzle",detailKeys:["command","path","url","targetUrl","targetId","ref","element","node","nodeId","id","requestId","to","channelId","guildId","userId","name","query","pattern","messageId"]},yw={bash:{icon:"wrench",title:"Bash",detailKeys:["command"]},process:{icon:"wrench",title:"Process",detailKeys:["sessionId"]},read:{icon:"fileText",title:"Read",detailKeys:["path"]},write:{icon:"edit",title:"Write",detailKeys:["path"]},edit:{icon:"penLine",title:"Edit",detailKeys:["path"]},attach:{icon:"paperclip",title:"Attach",detailKeys:["path","url","fileName"]},browser:{icon:"globe",title:"Browser",actions:{status:{label:"status"},start:{label:"start"},stop:{label:"stop"},tabs:{label:"tabs"},open:{label:"open",detailKeys:["targetUrl"]},focus:{label:"focus",detailKeys:["targetId"]},close:{label:"close",detailKeys:["targetId"]},snapshot:{label:"snapshot",detailKeys:["targetUrl","targetId","ref","element","format"]},screenshot:{label:"screenshot",detailKeys:["targetUrl","targetId","ref","element"]},navigate:{label:"navigate",detailKeys:["targetUrl","targetId"]},console:{label:"console",detailKeys:["level","targetId"]},pdf:{label:"pdf",detailKeys:["targetId"]},upload:{label:"upload",detailKeys:["paths","ref","inputRef","element","targetId"]},dialog:{label:"dialog",detailKeys:["accept","promptText","targetId"]},act:{label:"act",detailKeys:["request.kind","request.ref","request.selector","request.text","request.value"]}}},canvas:{icon:"image",title:"Canvas",actions:{present:{label:"present",detailKeys:["target","node","nodeId"]},hide:{label:"hide",detailKeys:["node","nodeId"]},navigate:{label:"navigate",detailKeys:["url","node","nodeId"]},eval:{label:"eval",detailKeys:["javaScript","node","nodeId"]},snapshot:{label:"snapshot",detailKeys:["format","node","nodeId"]},a2ui_push:{label:"A2UI push",detailKeys:["jsonlPath","node","nodeId"]},a2ui_reset:{label:"A2UI reset",detailKeys:["node","nodeId"]}}},nodes:{icon:"smartphone",title:"Nodes",actions:{status:{label:"status"},describe:{label:"describe",detailKeys:["node","nodeId"]},pending:{label:"pending"},approve:{label:"approve",detailKeys:["requestId"]},reject:{label:"reject",detailKeys:["requestId"]},notify:{label:"notify",detailKeys:["node","nodeId","title","body"]},camera_snap:{label:"camera snap",detailKeys:["node","nodeId","facing","deviceId"]},camera_list:{label:"camera list",detailKeys:["node","nodeId"]},camera_clip:{label:"camera clip",detailKeys:["node","nodeId","facing","duration","durationMs"]},screen_record:{label:"screen record",detailKeys:["node","nodeId","duration","durationMs","fps","screenIndex"]}}},cron:{icon:"loader",title:"Cron",actions:{status:{label:"status"},list:{label:"list"},add:{label:"add",detailKeys:["job.name","job.id","job.schedule","job.cron"]},update:{label:"update",detailKeys:["id"]},remove:{label:"remove",detailKeys:["id"]},run:{label:"run",detailKeys:["id"]},runs:{label:"runs",detailKeys:["id"]},wake:{label:"wake",detailKeys:["text","mode"]}}},gateway:{icon:"plug",title:"Gateway",actions:{restart:{label:"restart",detailKeys:["reason","delayMs"]},"config.get":{label:"config get"},"config.schema":{label:"config schema"},"config.apply":{label:"config apply",detailKeys:["restartDelayMs"]},"update.run":{label:"update run",detailKeys:["restartDelayMs"]}}},whatsapp_login:{icon:"circle",title:"WhatsApp Login",actions:{start:{label:"start"},wait:{label:"wait"}}},discord:{icon:"messageSquare",title:"Discord",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sticker:{label:"sticker",detailKeys:["to","stickerIds"]},poll:{label:"poll",detailKeys:["question","to"]},permissions:{label:"permissions",detailKeys:["channelId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},threadCreate:{label:"thread create",detailKeys:["channelId","name"]},threadList:{label:"thread list",detailKeys:["guildId","channelId"]},threadReply:{label:"thread reply",detailKeys:["channelId","content"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},searchMessages:{label:"search",detailKeys:["guildId","content"]},memberInfo:{label:"member",detailKeys:["guildId","userId"]},roleInfo:{label:"roles",detailKeys:["guildId"]},emojiList:{label:"emoji list",detailKeys:["guildId"]},roleAdd:{label:"role add",detailKeys:["guildId","userId","roleId"]},roleRemove:{label:"role remove",detailKeys:["guildId","userId","roleId"]},channelInfo:{label:"channel",detailKeys:["channelId"]},channelList:{label:"channels",detailKeys:["guildId"]},voiceStatus:{label:"voice",detailKeys:["guildId","userId"]},eventList:{label:"events",detailKeys:["guildId"]},eventCreate:{label:"event create",detailKeys:["guildId","name"]},timeout:{label:"timeout",detailKeys:["guildId","userId"]},kick:{label:"kick",detailKeys:["guildId","userId"]},ban:{label:"ban",detailKeys:["guildId","userId"]}}},slack:{icon:"messageSquare",title:"Slack",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},memberInfo:{label:"member",detailKeys:["userId"]},emojiList:{label:"emoji list"}}}},vw={fallback:mw,tools:yw},gf=vw,Vc=gf.fallback??{icon:"puzzle"},bw=gf.tools??{};function ww(e){if(!e)return e;const t=[{re:/^\/Users\/[^/]+(\/|$)/,replacement:"~$1"},{re:/^\/home\/[^/]+(\/|$)/,replacement:"~$1"},{re:/^C:\\Users\\[^\\]+(\\|$)/i,replacement:"~$1"}];for(const n of t)if(n.re.test(e))return e.replace(n.re,n.replacement);return e}function xw(e){const t=pw(e.name),n=t.toLowerCase(),i=bw[n],s=(i==null?void 0:i.icon)??Vc.icon??"puzzle",o=(i==null?void 0:i.title)??fw(t),r=(i==null?void 0:i.label)??o,a=e.args&&typeof e.args=="object"?e.args.action:void 0,l=typeof a=="string"?a.trim():void 0,c=n==="web_search"?"search":n==="web_fetch"?"fetch":n.replace(/_/g," ").replace(/\./g," "),d=gw(l??c);let u;n==="exec"&&(u=void 0),!u&&n==="read"&&(u=void 0),!u&&(n==="write"||n==="edit"||n==="attach")&&(u=void 0),!u&&n==="web_search"&&(u=void 0),!u&&n==="web_fetch"&&(u=void 0);const h=(i==null?void 0:i.detailKeys)??Vc.detailKeys??[];return!u&&h.length>0&&(u=void 0),!u&&e.meta&&(u=e.meta),u&&(u=ww(u)),{name:t,icon:s,title:o,label:r,verb:d,detail:u}}function _w(e){if(e.detail){if(e.detail.includes(" · ")){const t=e.detail.split(" · ").map(n=>n.trim()).filter(n=>n.length>0).join(", ");return t?`with ${t}`:void 0}return e.detail}}const kw=80,$w=2,Gc=100;function Sw(e){const t=e.trim();if(t.startsWith("{")||t.startsWith("["))try{const n=JSON.parse(t);return"```json\n"+JSON.stringify(n,null,2)+"\n```"}catch{}return e}function Aw(e){const t=e.split(`
`),n=t.slice(0,$w),i=n.join(`
`);return i.length>Gc?i.slice(0,Gc)+"…":n.length<t.length?i+"…":i}function Tw(e){const t=e,n=Cw(t.content),i=[];for(const s of n){const o=(typeof s.type=="string"?s.type:"").toLowerCase();(["toolcall","tool_call","tooluse","tool_use"].includes(o)||typeof s.name=="string"&&s.arguments!=null)&&i.push({kind:"call",name:s.name??"tool",args:Ew(s.arguments??s.args)})}for(const s of n){const o=(typeof s.type=="string"?s.type:"").toLowerCase();if(o!=="toolresult"&&o!=="tool_result")continue;const r=Rw(s),a=typeof s.name=="string"?s.name:"tool";i.push({kind:"result",name:a,text:r})}if(pf(e)&&!i.some(s=>s.kind==="result")){const s=typeof t.toolName=="string"&&t.toolName||typeof t.tool_name=="string"&&t.tool_name||"tool",o=Ai(e)??void 0;i.push({kind:"result",name:s,text:o})}return i}function Qc(e,t){var u,h;const n=xw({name:e.name,args:e.args}),i=_w(n),s=!!((u=e.text)!=null&&u.trim()),o=!!t,r=o?()=>{if(s){t(Sw(e.text));return}const g=`## ${n.label}

${i?`**Command:** \`${i}\`

`:""}*No output — tool completed successfully.*`;t(g)}:void 0,a=s&&(((h=e.text)==null?void 0:h.length)??0)<=kw,l=s&&!a,c=s&&a,d=!s;return f`
    <div
      class="chat-tool-card ${o?"chat-tool-card--clickable":""}"
      @click=${r}
      role=${o?"button":k}
      tabindex=${o?"0":k}
      @keydown=${o?g=>{g.key!=="Enter"&&g.key!==" "||(g.preventDefault(),r==null||r())}:k}
    >
      <div class="chat-tool-card__header">
        <div class="chat-tool-card__title">
          <span class="chat-tool-card__icon">${ye[n.icon]}</span>
          <span>${n.label}</span>
        </div>
        ${o?f`<span class="chat-tool-card__action">${s?"View":""} ${ye.check}</span>`:k}
        ${d&&!o?f`<span class="chat-tool-card__status">${ye.check}</span>`:k}
      </div>
      ${i?f`<div class="chat-tool-card__detail">${i}</div>`:k}
      ${d?f`
              <div class="chat-tool-card__status-text muted">Completed</div>
            `:k}
      ${l?f`<div class="chat-tool-card__preview mono">${Aw(e.text)}</div>`:k}
      ${c?f`<div class="chat-tool-card__inline mono">${e.text}</div>`:k}
    </div>
  `}function Cw(e){return Array.isArray(e)?e.filter(Boolean):[]}function Ew(e){if(typeof e!="string")return e;const t=e.trim();if(!t||!t.startsWith("{")&&!t.startsWith("["))return e;try{return JSON.parse(t)}catch{return e}}function Rw(e){if(typeof e.text=="string")return e.text;if(typeof e.content=="string")return e.content}function Pw(e){const n=e.content,i=[];if(!Array.isArray(n))return i;for(const s of n){if(typeof s!="object"||s===null)continue;const o=s;if(o.type!=="file"||typeof o.file_name!="string")continue;const r=o.summaryMeta;i.push({file_name:o.file_name,file_path:typeof o.file_path=="string"?o.file_path:void 0,rows_count:r==null?void 0:r.rows_count,preview_count:r==null?void 0:r.preview_count,truncated:r==null?void 0:r.truncated})}return i}function Mw(e){const n=e.content,i=[];if(Array.isArray(n))for(const s of n){if(typeof s!="object"||s===null)continue;const o=s;if(o.type==="image"){const r=o.source;if((r==null?void 0:r.type)==="base64"&&typeof r.data=="string"){const a=r.data,l=r.media_type||"image/png",c=a.startsWith("data:")?a:`data:${l};base64,${a}`;i.push({url:c})}else typeof o.url=="string"&&i.push({url:o.url})}else if(o.type==="image_url"){const r=o.image_url;typeof(r==null?void 0:r.url)=="string"&&i.push({url:r.url})}}return i}function Dw(e){return f`
    <div class="chat-group assistant">
      ${es("assistant",e)}
      <div class="chat-group-messages">
        <div class="chat-bubble chat-reading-indicator" aria-hidden="true">
          <span class="chat-reading-indicator__dots">
            <span></span><span></span><span></span>
          </span>
        </div>
      </div>
    </div>
  `}function Lw(e,t,n,i){const s=new Date(t).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}),o=(i==null?void 0:i.name)??"Assistant";return f`
    <div class="chat-group assistant">
      ${es("assistant",i)}
      <div class="chat-group-messages">
        ${mf({role:"assistant",content:[{type:"text",text:e}],timestamp:t},{isStreaming:!0,showReasoning:!1},n)}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${o}</span>
          <span class="chat-group-timestamp">${s}</span>
        </div>
      </div>
    </div>
  `}function Iw(e,t){const n=Eo(e.role),i=t.assistantName??"Assistant",s=n==="user"?"You":n==="assistant"?i:n,o=n==="user"?"user":n==="assistant"?"assistant":"other",r=new Date(e.timestamp).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return f`
    <div class="chat-group ${o}">
      ${es(e.role,{name:i,avatar:t.assistantAvatar??null})}
      <div class="chat-group-messages">
        ${e.messages.map((a,l)=>mf(a.message,{isStreaming:e.isStreaming&&l===e.messages.length-1,showReasoning:t.showReasoning},t.onOpenSidebar))}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${s}</span>
          <span class="chat-group-timestamp">${r}</span>
        </div>
      </div>
    </div>
  `}function es(e,t){var a,l;const n=Eo(e),i=((a=t==null?void 0:t.name)==null?void 0:a.trim())||"Assistant",s=((l=t==null?void 0:t.avatar)==null?void 0:l.trim())||"",o=n==="user"?"U":n==="assistant"?i.charAt(0).toUpperCase()||"A":n==="tool"?"⚙":"?",r=n==="user"?"user":n==="assistant"?"assistant":n==="tool"?"tool":"other";return s&&n==="assistant"?Ow(s)?f`<img
        class="chat-avatar ${r}"
        src="${s}"
        alt="${i}"
      />`:f`<div class="chat-avatar ${r}">${s}</div>`:f`<div class="chat-avatar ${r}">${o}</div>`}function Ow(e){return/^https?:\/\//i.test(e)||/^data:image\//i.test(e)||e.startsWith("/")}function Fw(e){return e.length===0?k:f`
    <div class="chat-message-images">
      ${e.map(t=>f`
          <img
            src=${t.url}
            alt=${t.alt??"Attached image"}
            class="chat-message-image"
            @click=${()=>window.open(t.url,"_blank")}
          />
        `)}
    </div>
  `}function Nw(e){return e.length===0?k:f`
    <div class="chat-message-files">
      ${e.map(t=>f`
          <span class="chat-message-file" title=${t.file_path??t.file_name}>
            <span class="chat-message-file__name">${t.file_name}</span>
            ${[t.rows_count!=null?`rows=${t.rows_count}`:"",t.preview_count!=null?`preview=${t.preview_count}`:"",t.truncated?"…truncated":""].filter(Boolean).length?f`<span class="chat-message-file__meta">
                  ${[t.rows_count!=null?`rows=${t.rows_count}`:"",t.preview_count!=null?`preview=${t.preview_count}`:"",t.truncated?"…truncated":""].filter(Boolean).join(" / ")}
                </span>`:k}
          </span>
        `)}
    </div>
  `}function mf(e,t,n){const i=e,s=typeof i.role=="string"?i.role:"unknown",o=pf(e)||s.toLowerCase()==="toolresult"||s.toLowerCase()==="tool_result"||typeof i.toolCallId=="string"||typeof i.tool_call_id=="string",r=Tw(e),a=r.length>0,l=Mw(e),c=l.length>0,d=Pw(e),u=d.length>0,h=Ai(e),g=t.showReasoning&&s==="assistant"?qy(e):null,m=h!=null&&h.trim()?h:null,y=g?Ky(g):null,_=Eo(s)==="user",S=!!(m&&_&&Wy(m)),R=S&&m?Vy(m):m,M=s==="assistant"&&!!(R!=null&&R.trim()),A=["chat-bubble",M?"has-copy":"",t.isStreaming?"streaming":"","fade-in"].filter(Boolean).join(" ");return!R&&a&&o?f`${r.map(T=>Qc(T,n))}`:!R&&!y&&!a&&!c&&!u?k:f`
    <div class="${A}">
      ${M?hw(R):k}
      ${Fw(l)}
      ${S&&l.length>0?f`<span class="chat-ocr-badge">已识别 ✓</span>`:k}
      ${Nw(d)}
      ${y?f`<div class="chat-thinking">${Wn(Vn(y))}</div>`:k}
      ${R?f`<div class="chat-text" dir="${hf(R)}">${Wn(Vn(R))}</div>`:k}
      ${r.map(T=>Qc(T,n))}
    </div>
  `}function Bw(e){return f`
    <div class="sidebar-panel">
      <div class="sidebar-header">
        <div class="sidebar-title">Tool Output</div>
        <button @click=${e.onClose} class="btn" title="Close sidebar">
          ${ye.x}
        </button>
      </div>
      <div class="sidebar-content">
        ${e.error?f`
              <div class="callout danger">${e.error}</div>
              <button @click=${e.onViewRawText} class="btn" style="margin-top: 12px;">
                View Raw Text
              </button>
            `:e.content?f`<div class="sidebar-markdown">${Wn(Vn(e.content))}</div>`:f`
                  <div class="muted">No content available</div>
                `}
      </div>
    </div>
  `}var zw=Object.defineProperty,Hw=Object.getOwnPropertyDescriptor,Ro=(e,t,n,i)=>{for(var s=i>1?void 0:i?Hw(t,n):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(s=(i?r(t,n,s):r(s))||s);return i&&s&&zw(t,n,s),s};let Gn=class extends dn{constructor(){super(...arguments),this.splitRatio=.6,this.minRatio=.4,this.maxRatio=.7,this.isDragging=!1,this.startX=0,this.startRatio=0,this.handleMouseDown=e=>{this.isDragging=!0,this.startX=e.clientX,this.startRatio=this.splitRatio,this.classList.add("dragging"),document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),e.preventDefault()},this.handleMouseMove=e=>{if(!this.isDragging)return;const t=this.parentElement;if(!t)return;const n=t.getBoundingClientRect().width,s=(e.clientX-this.startX)/n;let o=this.startRatio+s;o=Math.max(this.minRatio,Math.min(this.maxRatio,o)),this.dispatchEvent(new CustomEvent("resize",{detail:{splitRatio:o},bubbles:!0,composed:!0}))},this.handleMouseUp=()=>{this.isDragging=!1,this.classList.remove("dragging"),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}}render(){return k}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}};Gn.styles=Tu`
    :host {
      width: 4px;
      cursor: col-resize;
      background: var(--border, #333);
      transition: background 150ms ease-out;
      flex-shrink: 0;
      position: relative;
    }
    :host::before {
      content: "";
      position: absolute;
      top: 0;
      left: -4px;
      right: -4px;
      bottom: 0;
    }
    :host(:hover) {
      background: var(--accent, #007bff);
    }
    :host(.dragging) {
      background: var(--accent, #007bff);
    }
  `;Ro([Ut({type:Number})],Gn.prototype,"splitRatio",2);Ro([Ut({type:Number})],Gn.prototype,"minRatio",2);Ro([Ut({type:Number})],Gn.prototype,"maxRatio",2);Gn=Ro([ka("resizable-divider")],Gn);const Uw=5e3,wr=5,qw=/\.(xlsx|xls|xlsm|pdf)$/i;function jw(e){return Number.isFinite(e)?Number.isInteger(e)?String(e):e.toFixed(2):"—"}function Kw(e,t){const n=e.candidates,i=n.length,s=n.slice(0,wr),o=i>wr?i-wr:0;return f`
    <div class="chat-group assistant">
      ${es("assistant",t)}
      <div class="chat-group-messages">
        <div class="chat-tool-render chat-candidates-preview" role="status" aria-live="polite">
          <div class="candidates-preview-card">
            <div class="candidates-preview-card__title">
              ${ye.search}
              <span>${p("chat.ui.candidatesPreview.query",{keywords:e.keywords||"—"})}</span>
            </div>
            <table class="candidates-preview-card__table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>${p("chat.ui.candidatesPreview.colCode")}</th>
                  <th>${p("chat.ui.candidatesPreview.colName")}</th>
                  <th>${p("chat.ui.candidatesPreview.colPrice")}</th>
                </tr>
              </thead>
              <tbody>
                ${s.map((r,a)=>f`
                    <tr>
                      <td>${a+1}</td>
                      <td>${r.code}</td>
                      <td>${r.matched_name}</td>
                      <td>${jw(r.unit_price)}</td>
                    </tr>
                  `)}
              </tbody>
            </table>
            ${o>0?f`<p class="candidates-preview-card__more">
                  ${p("chat.ui.candidatesPreview.more",{n:String(o)})}
                </p>`:k}
            <div class="candidates-preview-card__status">
              ${ye.loader}
              <span>${p("chat.ui.candidatesPreview.selecting",{n:String(i)})}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}function Ww(e){for(let t=0;t<e.length;t++)if(qw.test(e[t].name))return e[t];return null}function Yc(e){e.style.height="auto",e.style.height=`${e.scrollHeight}px`}function Vw(e){return e?e.active?f`
      <div class="compaction-indicator compaction-indicator--active" role="status" aria-live="polite">
        ${ye.loader} ${p("chat.ui.compaction.active")}
      </div>
    `:e.completedAt&&Date.now()-e.completedAt<Uw?f`
        <div class="compaction-indicator compaction-indicator--complete" role="status" aria-live="polite">
          ${ye.check} ${p("chat.ui.compaction.done")}
        </div>
      `:k:k}function Gw(){return`att-${Date.now()}-${Math.random().toString(36).slice(2,9)}`}function Qw(e,t){var s;const n=(s=e.clipboardData)==null?void 0:s.items;if(!n||!t.onAttachmentsChange)return;const i=[];for(let o=0;o<n.length;o++){const r=n[o];r.type.startsWith("image/")&&i.push(r)}if(i.length!==0){e.preventDefault();for(const o of i){const r=o.getAsFile();if(!r)continue;const a=new FileReader;a.addEventListener("load",()=>{var u;const l=a.result,c={id:Gw(),dataUrl:l,mimeType:r.type},d=t.attachments??[];(u=t.onAttachmentsChange)==null||u.call(t,[...d,c])}),a.readAsDataURL(r)}}}function Yw(e){const t=e.attachments??[];return t.length===0?k:f`
    <div class="chat-attachments">
      ${t.map(n=>f`
          <div class="chat-attachment">
            <img
              src=${n.dataUrl}
              alt=${p("chat.ui.attachments.previewAlt")}
              class="chat-attachment__img"
            />
            <button
              class="chat-attachment__remove"
              type="button"
              aria-label=${p("chat.ui.attachments.remove")}
              @click=${()=>{var s;const i=(e.attachments??[]).filter(o=>o.id!==n.id);(s=e.onAttachmentsChange)==null||s.call(e,i)}}
            >
              ${ye.x}
            </button>
          </div>
        `)}
    </div>
  `}function Xw(e){const t=e.uploadedFile,n=e.onFileSelect,i=e.onClearUploadedFile;if(t!=null&&t.file_name){const s=t.summaryMeta;return f`
      <div class="chat-uploaded-file">
        <span class="chat-uploaded-file__name" title=${t.file_path}>${t.file_name}</span>
        <button
          type="button"
          class="btn chat-uploaded-file__clear"
          aria-label=${p("chat.ui.upload.remove")}
          @click=${i}
        >
          ${ye.x}
        </button>
        ${s?f`<span class="chat-uploaded-file__meta">
              ${[s.rows_count!=null?`rows=${s.rows_count}`:"",s.preview_count!=null?`preview=${s.preview_count}`:"",s.truncated?"…truncated":""].filter(Boolean).join(" / ")}
            </span>`:k}
      </div>
    `}return!n||!e.connected?k:f`
    <div class="chat-uploaded-file-row">
      <input
        type="file"
        accept=".xlsx,.xls,.xlsm,.pdf"
        aria-label=${p("chat.ui.upload.label")}
        class="chat-uploaded-file-input"
        @change=${async s=>{var a;const o=s.target,r=(a=o.files)==null?void 0:a[0];r&&(await n(r),o.value="")}}
      />
      <button
        type="button"
        class="btn chat-upload-file-btn"
        @click=${s=>{var o,r;return(r=(o=s.currentTarget.parentElement)==null?void 0:o.querySelector("input[type=file]"))==null?void 0:r.click()}}
      >
        ${p("chat.ui.upload.button")}
      </button>
    </div>
  `}function Jw(e){var _,S,R,M;const t=e.connected,n=e.sending||e.stream!==null,i=!!(e.canAbort&&e.onAbort),s=(S=(_=e.sessions)==null?void 0:_.sessions)==null?void 0:S.find(A=>A.key===e.sessionKey),o=e.showThinking&&(s==null?void 0:s.reasoningLevel)!=="off",r={name:e.assistantName,avatar:e.assistantAvatar??e.assistantAvatarUrl??null},a=(((R=e.attachments)==null?void 0:R.length)??0)>0;(M=e.uploadedFile)!=null&&M.file_name;const l=e.connected?p(a?"chat.ui.compose.placeholder.withImages":"chat.ui.compose.placeholder.default"):p("chat.ui.compose.placeholder.disconnected"),c=e.splitRatio??.6,d=!!(e.sidebarOpen&&e.onCloseSidebar),u=f`
    <div
      class="chat-thread"
      role="log"
      aria-live="polite"
      @scroll=${e.onChatScroll}
    >
      ${e.loading?f`
              <div class="muted">Loading chat…</div>
            `:k}
      ${lf(ex(e),A=>A.key,A=>A.kind==="divider"?f`
              <div class="chat-divider" role="separator" data-ts=${String(A.timestamp)}>
                <span class="chat-divider__line"></span>
                <span class="chat-divider__label">${A.label}</span>
                <span class="chat-divider__line"></span>
              </div>
            `:A.kind==="reading-indicator"?Dw(r):A.kind==="stream"?Lw(A.text,A.startedAt,e.onOpenSidebar,r):A.kind==="candidates-preview"?Kw(A.preview,r):A.kind==="ocr-result"?f`
              <div class="chat-group assistant">
                ${es("assistant",r)}
                <div class="chat-group-messages">
                  <div class="chat-ocr-card" role="region" aria-label="OCR">
                    <div class="chat-ocr-card__label">📄 图片识别结果</div>
                    <div class="chat-ocr-card__body">
                      ${Wn(Vn(A.card.text))}
                    </div>
                  </div>
                </div>
              </div>
            `:A.kind==="group"?Iw(A,{onOpenSidebar:e.onOpenSidebar,showReasoning:o,assistantName:e.assistantName,assistantAvatar:r.avatar}):k)}
    </div>
  `,h=A=>{var T;A.preventDefault(),A.stopPropagation(),A.dataTransfer&&(A.dataTransfer.dropEffect="copy"),(T=e.onComposeDragOver)==null||T.call(e)},g=A=>{var T;A.preventDefault(),A.stopPropagation(),A.dataTransfer&&(A.dataTransfer.dropEffect="copy"),(T=e.onComposeDragOver)==null||T.call(e)},m=A=>{var E;const T=A.currentTarget,v=A.relatedTarget;v!=null&&(T.contains(v)||(E=e.onComposeDragLeave)==null||E.call(e))},y=A=>{var v,E,P;A.preventDefault(),A.stopPropagation(),(v=e.onComposeDragLeave)==null||v.call(e);const T=(P=(E=A.dataTransfer)==null?void 0:E.files)!=null&&P.length?Ww(A.dataTransfer.files):null;T&&e.onComposeDrop&&e.onComposeDrop(T)};return f`
    <section
      class="card chat ${e.composeDragOver?"chat--drag-over":""}"
      @dragenter=${h}
      @dragover=${g}
      @dragleave=${m}
      @drop=${y}
    >
      ${e.disabledReason?f`<div class="callout">${e.disabledReason}</div>`:k}

      ${e.error?f`<div class="callout danger">${e.error}</div>`:k}

      ${e.focusMode?f`
            <button
              class="chat-focus-exit"
              type="button"
              @click=${e.onToggleFocusMode}
              aria-label=${p("chat.ui.compose.exitFocus")}
              title=${p("chat.ui.compose.exitFocus")}
            >
              ${ye.x}
            </button>
          `:k}

      <div
        class="chat-split-container ${d?"chat-split-container--open":""}"
      >
        <div
          class="chat-main"
          style="flex: ${d?`0 0 ${c*100}%`:"1 1 100%"}"
        >
          ${u}
        </div>

        ${d?f`
              <resizable-divider
                .splitRatio=${c}
                @resize=${A=>{var T;return(T=e.onSplitRatioChange)==null?void 0:T.call(e,A.detail.splitRatio)}}
              ></resizable-divider>
              <div class="chat-sidebar">
                ${Bw({content:e.sidebarContent??null,error:e.sidebarError??null,onClose:e.onCloseSidebar,onViewRawText:()=>{!e.sidebarContent||!e.onOpenSidebar||e.onOpenSidebar(`\`\`\`
${e.sidebarContent}
\`\`\``)}})}
              </div>
            `:k}
      </div>

      ${e.queue.length?f`
            <div class="chat-queue" role="status" aria-live="polite">
              <div class="chat-queue__title">
                ${p("chat.ui.queue.title",{count:String(e.queue.length)})}
              </div>
              <div class="chat-queue__list">
                ${e.queue.map(A=>{var T;return f`
                    <div class="chat-queue__item">
                      <div class="chat-queue__text">
                        ${(T=A.attachments)!=null&&T.length?f`<span class="chat-queue__ocr-status">🔍 识别中…</span>`:A.text||""}
                      </div>
                      <button
                        class="btn chat-queue__remove"
                        type="button"
                        aria-label=${p("chat.ui.queue.remove")}
                        @click=${()=>e.onQueueRemove(A.id)}
                      >
                        ${ye.x}
                      </button>
                    </div>
                  `})}
              </div>
            </div>
          `:k}

      ${Vw(e.compactionStatus)}

      ${e.showNewMessages?f`
            <button
              class="btn chat-new-messages"
              type="button"
              @click=${e.onScrollToBottom}
            >
              ${p("chat.ui.compose.newMessages")} ${ye.arrowDown}
            </button>
          `:k}

      <div class="chat-compose ${e.composeDragOver?"chat-compose--drag-over":""}">
        ${e.composeDragOver?f`<div class="chat-compose__drop-hint">
              ${p("chat.ui.compose.dropHint")}
            </div>`:k}
        ${Yw(e)}
        ${Xw(e)}
        <div class="chat-compose__row">
          <label class="field chat-compose__field">
            <span>${p("chat.ui.compose.label")}</span>
            <textarea
              ${sw(A=>A&&Yc(A))}
              .value=${e.draft}
              dir=${hf(e.draft)}
              ?disabled=${!e.connected}
              @keydown=${A=>{A.key==="Enter"&&(A.isComposing||A.keyCode===229||A.shiftKey||e.connected&&(A.preventDefault(),t&&e.onSend()))}}
              @input=${A=>{const T=A.target;Yc(T),e.onDraftChange(T.value)}}
              @paste=${A=>Qw(A,e)}
              placeholder=${l}
            ></textarea>
          </label>
          <div class="chat-compose__actions">
            <button
              class="btn"
              ?disabled=${!e.connected||!i&&e.sending}
              @click=${i?e.onAbort:e.onNewSession}
            >
              ${p(i?"chat.ui.compose.stop":"chat.ui.compose.newSession")}
            </button>
            <button
              class="btn primary"
              ?disabled=${!e.connected}
              @click=${e.onSend}
            >
              ${p(n?"chat.ui.compose.queue":"chat.ui.compose.send")}<kbd
                class="btn-kbd"
                >↵</kbd
              >
            </button>
          </div>
        </div>
      </div>
    </section>
  `}const Xc=200;function Zw(e){const t=[];let n=null;for(const i of e){if(i.kind!=="message"){n&&(t.push(n),n=null),t.push(i);continue}const s=Ln(i.message),o=Eo(s.role),r=s.timestamp||Date.now(),a=i.message.__openclaw;if((a==null?void 0:a.kind)==="tool_render"){n&&(t.push(n),n=null),t.push({kind:"group",key:`group:${o}:${i.key}`,role:o,messages:[{message:i.message,key:i.key}],timestamp:r,isStreaming:!1});continue}!n||n.role!==o?(n&&t.push(n),n={kind:"group",key:`group:${o}:${i.key}`,role:o,messages:[{message:i.message,key:i.key}],timestamp:r,isStreaming:!1}):n.messages.push({message:i.message,key:i.key})}return n&&t.push(n),t}function ex(e){var T,v,E,P;const t=[],n=new Set,i=Array.isArray(e.messages)?e.messages:[],s=Array.isArray(e.toolMessages)?e.toolMessages:[];let r=[...Array.isArray(e.toolRenderItems)?e.toolRenderItems:[]].sort((C,O)=>C.ts-O.ts);r.length===0&&e.toolRenderData&&r.push({id:`legacy:${e.toolRenderSeq??Date.now()}`,runId:"",seq:e.toolRenderSeq??0,ts:Date.now(),payload:e.toolRenderData});const a=new Set([My,"[已渲染到前端]"]),l=C=>{for(const O of a)if(O&&C.startsWith(O))return!0;return!1},c=C=>{const O=C.input_index;if(typeof O=="number"&&Number.isFinite(O))return O;if(typeof O=="string"){const D=Number(O);return Number.isFinite(D)?D:0}return 0},d=C=>{const O=(Array.isArray(C.resolved_items)?C.resolved_items:[]).slice().sort((L,H)=>c(L)-c(H)),D=(Array.isArray(C.pending_items)?C.pending_items:[]).slice().sort((L,H)=>c(L)-c(H)),F=(Array.isArray(C.unmatched_items)?C.unmatched_items:[]).slice().sort((L,H)=>c(L)-c(H)),j=[];j.push("**批处理总表**"),j.push(""),j.push("| 序号 | 状态 | 产品编号(code) | 产品名称 |"),j.push("|---|---|---|---|");const G=[];for(const L of O){const H=L.chosen??{},ee=c(L);G.push({idx:ee,line:`| ${ee+1} | matched | ${String(H.code??"—")} | ${String(H.matched_name??"—")} |`})}for(const L of D){const ee=(Array.isArray(L.options)?L.options:[])[0]??{},B=c(L);G.push({idx:B,line:`| ${B+1} | needs_selection | ${String(ee.code??"—")} | ${String(ee.matched_name??"待确认")} |`})}for(const L of F){const H=c(L);G.push({idx:H,line:`| ${H+1} | unmatched | — | — |`})}G.sort((L,H)=>L.idx-H.idx);for(const L of G)j.push(L.line);return j.join(`
`)},u=(C,O,D)=>{var j;const F=(C.payload.batch_mode?d(C.payload):((j=C.payload.formatted_response)==null?void 0:j.trim())??"").trim();F&&(t.push({kind:"message",key:`tool-render:${e.sessionKey}:${C.id}:${D}`,message:{role:"assistant",content:[{type:"text",text:F}],timestamp:O,__openclaw:{kind:"tool_render",runId:C.runId,seq:C.seq}}}),n.add(F))},h=Math.max(0,i.length-Xc),g=i.length>h?Ln(i[h]).timestamp??0:0,m=i.length>0?Ln(i[i.length-1]).timestamp??0:0,y=new Set,_=[];for(let C=h;C<i.length;C++){const O=i[C],D=Ln(O),F=((T=Ai(O))==null?void 0:T.trim())??"";D.role.toLowerCase()==="assistant"&&l(F)&&_.push(C)}const S=new Map;if(_.length>0&&r.length>0){const C=_.map(D=>{const F=i[D],j=Ln(F);return{index:D,timestamp:j.timestamp??0}}),O=[];for(const D of r){const F=typeof D.ts=="number"?D.ts:0;if(F<g)continue;let j=null;for(const L of C){const H=L.timestamp-F;H<0||(j==null||H<j.delta)&&(j={index:L.index,delta:H})}if(!j){F>m&&O.push(D);continue}const G=S.get(j.index);G?G.push(D):S.set(j.index,[D])}for(const D of S.values())D.sort((F,j)=>F.ts-j.ts);r=O}h>0&&t.push({kind:"message",key:"chat:history:notice",message:{role:"system",content:`Showing last ${Xc} messages (${h} hidden).`,timestamp:Date.now()}});for(let C=h;C<i.length;C++){const O=i[C],D=Ln(O),F=((v=Ai(O))==null?void 0:v.trim())??"",G=O.__openclaw;if(G&&G.kind==="compaction"){t.push({kind:"divider",key:typeof G.id=="string"?`divider:compaction:${G.id}`:`divider:compaction:${D.timestamp}:${C}`,label:p("chat.ui.compaction.divider"),timestamp:D.timestamp??Date.now()});continue}if(G&&G.kind==="ocr_result"&&typeof G.text=="string"){const H=G.text.trim();H&&(y.add(H),t.push({kind:"ocr-result",key:`history-ocr:${C}:${String(D.timestamp??0)}`,card:{id:`history-ocr-${C}-${String(D.timestamp??0)}`,text:H,createdAt:typeof D.timestamp=="number"?D.timestamp:Date.now()}}));continue}if(!e.showThinking&&D.role.toLowerCase()==="toolresult")continue;if(D.role.toLowerCase()==="assistant"&&l(F)){const H=S.get(C);if(H&&H.length>0)for(let ee=0;ee<H.length;ee++){const B=H[ee];u(B,D.timestamp??Date.now(),C*1e3+ee)}else t.push({kind:"message",key:xr(O,C),message:O});continue}const L=O.__openclaw;if((L==null?void 0:L.kind)==="tool_render"){const H=((E=Ai(O))==null?void 0:E.trim())??"";H&&n.add(H)}t.push({kind:"message",key:xr(O,C),message:O})}if(e.showThinking)for(let C=0;C<s.length;C++)t.push({kind:"message",key:xr(s[C],C+i.length),message:s[C]});const R=Array.isArray(e.candidatePreviews)?e.candidatePreviews:[];for(let C=0;C<R.length;C++)t.push({kind:"candidates-preview",key:`candidates-preview:${R[C].id}`,preview:R[C]});const M=Array.isArray(e.ocrResultCards)?e.ocrResultCards:[];for(const C of M){const O=(C.text??"").trim();!O||y.has(O)||t.push({kind:"ocr-result",key:C.id,card:C})}const A=new Set;for(let C=0;C<r.length;C++){const O=r[C],D=typeof O.ts=="number"?O.ts:0;if(g>0&&D<g)continue;const F=((P=O.payload.formatted_response)==null?void 0:P.trim())??"";F&&(n.has(F)||A.has(F)||(A.add(F),u(O,O.ts||Date.now(),i.length+C)))}if(e.stream!==null){const C=`stream:${e.sessionKey}:${e.streamStartedAt??"live"}`;e.stream.trim().length>0?t.push({kind:"stream",key:C,text:e.stream,startedAt:e.streamStartedAt??Date.now()}):t.push({kind:"reading-indicator",key:C})}return Zw(t)}function xr(e,t){const n=e,i=typeof n.toolCallId=="string"?n.toolCallId:"";if(i)return`tool:${i}`;const s=typeof n.id=="string"?n.id:"";if(s)return`msg:${s}`;const o=typeof n.messageId=="string"?n.messageId:"";if(o)return`msg:${o}`;const r=typeof n.timestamp=="number"?n.timestamp:null,a=typeof n.role=="string"?n.role:"unknown";return r!=null?`msg:${a}:${r}:${t}`:`msg:${a}:${t}`}const tx=new Set(["title","description","default","nullable"]);function nx(e){return Object.keys(e??{}).filter(n=>!tx.has(n)).length===0}function ix(e){if(e===void 0)return"";try{return JSON.stringify(e,null,2)??""}catch{return""}}const Hi={chevronDown:f`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,plus:f`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  `,minus:f`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  `,trash:f`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  `,edit:f`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  `};function xn(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:r,onPatch:a}=e,l=e.showLabel??!0,c=Ke(t),d=We(i,s),u=(d==null?void 0:d.label)??t.title??At(String(i.at(-1))),h=(d==null?void 0:d.help)??t.description,g=Sa(i);if(o.has(g))return f`<div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${u}</div>
      <div class="cfg-field__error">Unsupported schema node. Use Raw mode.</div>
    </div>`;if(t.anyOf||t.oneOf){const y=(t.anyOf??t.oneOf??[]).filter(T=>!(T.type==="null"||Array.isArray(T.type)&&T.type.includes("null")));if(y.length===1)return xn({...e,schema:y[0]});const _=T=>{if(T.const!==void 0)return T.const;if(T.enum&&T.enum.length===1)return T.enum[0]},S=y.map(_),R=S.every(T=>T!==void 0);if(R&&S.length>0&&S.length<=5){const T=n??t.default;return f`
        <div class="cfg-field">
          ${l?f`<label class="cfg-field__label">${u}</label>`:k}
          ${h?f`<div class="cfg-field__help">${h}</div>`:k}
          <div class="cfg-segmented">
            ${S.map(v=>f`
              <button
                type="button"
                class="cfg-segmented__btn ${v===T||String(v)===String(T)?"active":""}"
                ?disabled=${r}
                @click=${()=>a(i,v)}
              >
                ${String(v)}
              </button>
            `)}
          </div>
        </div>
      `}if(R&&S.length>5)return Zc({...e,options:S,value:n??t.default});const M=new Set(y.map(T=>Ke(T)).filter(Boolean)),A=new Set([...M].map(T=>T==="integer"?"number":T));if([...A].every(T=>["string","number","boolean"].includes(T))){const T=A.has("string"),v=A.has("number");if(A.has("boolean")&&A.size===1)return xn({...e,schema:{...t,type:"boolean",anyOf:void 0,oneOf:void 0}});if(T||v)return Jc({...e,inputType:v&&!T?"number":"text"})}}if(t.enum){const m=t.enum;if(m.length<=5){const y=n??t.default;return f`
        <div class="cfg-field">
          ${l?f`<label class="cfg-field__label">${u}</label>`:k}
          ${h?f`<div class="cfg-field__help">${h}</div>`:k}
          <div class="cfg-segmented">
            ${m.map(_=>f`
              <button
                type="button"
                class="cfg-segmented__btn ${_===y||String(_)===String(y)?"active":""}"
                ?disabled=${r}
                @click=${()=>a(i,_)}
              >
                ${String(_)}
              </button>
            `)}
          </div>
        </div>
      `}return Zc({...e,options:m,value:n??t.default})}if(c==="object")return ox(e);if(c==="array")return rx(e);if(c==="boolean"){const m=typeof n=="boolean"?n:typeof t.default=="boolean"?t.default:!1;return f`
      <label class="cfg-toggle-row ${r?"disabled":""}">
        <div class="cfg-toggle-row__content">
          <span class="cfg-toggle-row__label">${u}</span>
          ${h?f`<span class="cfg-toggle-row__help">${h}</span>`:k}
        </div>
        <div class="cfg-toggle">
          <input
            type="checkbox"
            .checked=${m}
            ?disabled=${r}
            @change=${y=>a(i,y.target.checked)}
          />
          <span class="cfg-toggle__track"></span>
        </div>
      </label>
    `}return c==="number"||c==="integer"?sx(e):c==="string"?Jc({...e,inputType:"text"}):f`
    <div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${u}</div>
      <div class="cfg-field__error">Unsupported type: ${c}. Use Raw mode.</div>
    </div>
  `}function Jc(e){const{schema:t,value:n,path:i,hints:s,disabled:o,onPatch:r,inputType:a}=e,l=e.showLabel??!0,c=We(i,s),d=(c==null?void 0:c.label)??t.title??At(String(i.at(-1))),u=(c==null?void 0:c.help)??t.description,h=((c==null?void 0:c.sensitive)??!1)&&!/^\$\{[^}]*\}$/.test(String(n??"").trim()),g=(c==null?void 0:c.placeholder)??(h?"••••":t.default!==void 0?`Default: ${String(t.default)}`:""),m=n??"";return f`
    <div class="cfg-field">
      ${l?f`<label class="cfg-field__label">${d}</label>`:k}
      ${u?f`<div class="cfg-field__help">${u}</div>`:k}
      <div class="cfg-input-wrap">
        <input
          type=${h?"password":a}
          class="cfg-input"
          placeholder=${g}
          .value=${m==null?"":String(m)}
          ?disabled=${o}
          @input=${y=>{const _=y.target.value;if(a==="number"){if(_.trim()===""){r(i,void 0);return}const S=Number(_);r(i,Number.isNaN(S)?_:S);return}r(i,_)}}
          @change=${y=>{if(a==="number")return;const _=y.target.value;r(i,_.trim())}}
        />
        ${t.default!==void 0?f`
          <button
            type="button"
            class="cfg-input__reset"
            title="Reset to default"
            ?disabled=${o}
            @click=${()=>r(i,t.default)}
          >↺</button>
        `:k}
      </div>
    </div>
  `}function sx(e){const{schema:t,value:n,path:i,hints:s,disabled:o,onPatch:r}=e,a=e.showLabel??!0,l=We(i,s),c=(l==null?void 0:l.label)??t.title??At(String(i.at(-1))),d=(l==null?void 0:l.help)??t.description,u=n??t.default??"",h=typeof u=="number"?u:0;return f`
    <div class="cfg-field">
      ${a?f`<label class="cfg-field__label">${c}</label>`:k}
      ${d?f`<div class="cfg-field__help">${d}</div>`:k}
      <div class="cfg-number">
        <button
          type="button"
          class="cfg-number__btn"
          ?disabled=${o}
          @click=${()=>r(i,h-1)}
        >−</button>
        <input
          type="number"
          class="cfg-number__input"
          .value=${u==null?"":String(u)}
          ?disabled=${o}
          @input=${g=>{const m=g.target.value,y=m===""?void 0:Number(m);r(i,y)}}
        />
        <button
          type="button"
          class="cfg-number__btn"
          ?disabled=${o}
          @click=${()=>r(i,h+1)}
        >+</button>
      </div>
    </div>
  `}function Zc(e){const{schema:t,value:n,path:i,hints:s,disabled:o,options:r,onPatch:a}=e,l=e.showLabel??!0,c=We(i,s),d=(c==null?void 0:c.label)??t.title??At(String(i.at(-1))),u=(c==null?void 0:c.help)??t.description,h=n??t.default,g=r.findIndex(y=>y===h||String(y)===String(h)),m="__unset__";return f`
    <div class="cfg-field">
      ${l?f`<label class="cfg-field__label">${d}</label>`:k}
      ${u?f`<div class="cfg-field__help">${u}</div>`:k}
      <select
        class="cfg-select"
        ?disabled=${o}
        .value=${g>=0?String(g):m}
        @change=${y=>{const _=y.target.value;a(i,_===m?void 0:r[Number(_)])}}
      >
        <option value=${m}>Select...</option>
        ${r.map((y,_)=>f`
          <option value=${String(_)}>${String(y)}</option>
        `)}
      </select>
    </div>
  `}function ox(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:r,onPatch:a}=e,l=We(i,s),c=(l==null?void 0:l.label)??t.title??At(String(i.at(-1))),d=(l==null?void 0:l.help)??t.description,u=n??t.default,h=u&&typeof u=="object"&&!Array.isArray(u)?u:{},g=t.properties??{},y=Object.entries(g).toSorted((A,T)=>{var P,C;const v=((P=We([...i,A[0]],s))==null?void 0:P.order)??0,E=((C=We([...i,T[0]],s))==null?void 0:C.order)??0;return v!==E?v-E:A[0].localeCompare(T[0])}),_=new Set(Object.keys(g)),S=t.additionalProperties,R=!!S&&typeof S=="object",M=f`
    ${y.map(([A,T])=>xn({schema:T,value:h[A],path:[...i,A],hints:s,unsupported:o,disabled:r,onPatch:a}))}
    ${R?ax({schema:S,value:h,path:i,hints:s,unsupported:o,disabled:r,reservedKeys:_,onPatch:a}):k}
  `;return i.length===1?f`
      <div class="cfg-fields">
        ${M}
      </div>
    `:f`
    <details class="cfg-object" open>
      <summary class="cfg-object__header">
        <span class="cfg-object__title">${c}</span>
        <span class="cfg-object__chevron">${Hi.chevronDown}</span>
      </summary>
      ${d?f`<div class="cfg-object__help">${d}</div>`:k}
      <div class="cfg-object__content">
        ${M}
      </div>
    </details>
  `}function rx(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:r,onPatch:a}=e,l=e.showLabel??!0,c=We(i,s),d=(c==null?void 0:c.label)??t.title??At(String(i.at(-1))),u=(c==null?void 0:c.help)??t.description,h=Array.isArray(t.items)?t.items[0]:t.items;if(!h)return f`
      <div class="cfg-field cfg-field--error">
        <div class="cfg-field__label">${d}</div>
        <div class="cfg-field__error">Unsupported array schema. Use Raw mode.</div>
      </div>
    `;const g=Array.isArray(n)?n:Array.isArray(t.default)?t.default:[];return f`
    <div class="cfg-array">
      <div class="cfg-array__header">
        ${l?f`<span class="cfg-array__label">${d}</span>`:k}
        <span class="cfg-array__count">${g.length} item${g.length!==1?"s":""}</span>
        <button
          type="button"
          class="cfg-array__add"
          ?disabled=${r}
          @click=${()=>{const m=[...g,Du(h)];a(i,m)}}
        >
          <span class="cfg-array__add-icon">${Hi.plus}</span>
          Add
        </button>
      </div>
      ${u?f`<div class="cfg-array__help">${u}</div>`:k}

      ${g.length===0?f`
              <div class="cfg-array__empty">No items yet. Click "Add" to create one.</div>
            `:f`
        <div class="cfg-array__items">
          ${g.map((m,y)=>f`
            <div class="cfg-array__item">
              <div class="cfg-array__item-header">
                <span class="cfg-array__item-index">#${y+1}</span>
                <button
                  type="button"
                  class="cfg-array__item-remove"
                  title="Remove item"
                  ?disabled=${r}
                  @click=${()=>{const _=[...g];_.splice(y,1),a(i,_)}}
                >
                  ${Hi.trash}
                </button>
              </div>
              <div class="cfg-array__item-content">
                ${xn({schema:h,value:m,path:[...i,y],hints:s,unsupported:o,disabled:r,showLabel:!1,onPatch:a})}
              </div>
            </div>
          `)}
        </div>
      `}
    </div>
  `}function ax(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:r,reservedKeys:a,onPatch:l}=e,c=nx(t),d=Object.entries(n??{}).filter(([u])=>!a.has(u));return f`
    <div class="cfg-map">
      <div class="cfg-map__header">
        <span class="cfg-map__label">Custom entries</span>
        <button
          type="button"
          class="cfg-map__add"
          ?disabled=${r}
          @click=${()=>{const u={...n};let h=1,g=`custom-${h}`;for(;g in u;)h+=1,g=`custom-${h}`;u[g]=c?{}:Du(t),l(i,u)}}
        >
          <span class="cfg-map__add-icon">${Hi.plus}</span>
          Add Entry
        </button>
      </div>

      ${d.length===0?f`
              <div class="cfg-map__empty">No custom entries.</div>
            `:f`
        <div class="cfg-map__items">
          ${d.map(([u,h])=>{const g=[...i,u],m=ix(h);return f`
              <div class="cfg-map__item">
                <div class="cfg-map__item-key">
                  <input
                    type="text"
                    class="cfg-input cfg-input--sm"
                    placeholder="Key"
                    .value=${u}
                    ?disabled=${r}
                    @change=${y=>{const _=y.target.value.trim();if(!_||_===u)return;const S={...n};_ in S||(S[_]=S[u],delete S[u],l(i,S))}}
                  />
                </div>
                <div class="cfg-map__item-value">
                  ${c?f`
                        <textarea
                          class="cfg-textarea cfg-textarea--sm"
                          placeholder="JSON value"
                          rows="2"
                          .value=${m}
                          ?disabled=${r}
                          @change=${y=>{const _=y.target,S=_.value.trim();if(!S){l(g,void 0);return}try{l(g,JSON.parse(S))}catch{_.value=m}}}
                        ></textarea>
                      `:xn({schema:t,value:h,path:g,hints:s,unsupported:o,disabled:r,showLabel:!1,onPatch:l})}
                </div>
                <button
                  type="button"
                  class="cfg-map__item-remove"
                  title="Remove entry"
                  ?disabled=${r}
                  @click=${()=>{const y={...n};delete y[u],l(i,y)}}
                >
                  ${Hi.trash}
                </button>
              </div>
            `})}
        </div>
      `}
    </div>
  `}const ed={env:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="3"></circle>
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
      ></path>
    </svg>
  `,update:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  `,agents:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path
        d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"
      ></path>
      <circle cx="8" cy="14" r="1"></circle>
      <circle cx="16" cy="14" r="1"></circle>
    </svg>
  `,auth:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  `,channels:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  `,messages:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  `,commands:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
  `,hooks:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
  `,skills:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      ></polygon>
    </svg>
  `,tools:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      ></path>
    </svg>
  `,gateway:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      ></path>
    </svg>
  `,wizard:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M15 4V2"></path>
      <path d="M15 16v-2"></path>
      <path d="M8 9h2"></path>
      <path d="M20 9h2"></path>
      <path d="M17.8 11.8 19 13"></path>
      <path d="M15 9h0"></path>
      <path d="M17.8 6.2 19 5"></path>
      <path d="m3 21 9-9"></path>
      <path d="M12.2 6.2 11 5"></path>
    </svg>
  `,meta:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
    </svg>
  `,logging:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  `,browser:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="4"></circle>
      <line x1="21.17" y1="8" x2="12" y2="8"></line>
      <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
      <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
    </svg>
  `,ui:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>
  `,models:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path
        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
      ></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  `,bindings:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
      <line x1="6" y1="6" x2="6.01" y2="6"></line>
      <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
  `,broadcast:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path>
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path>
      <circle cx="12" cy="12" r="2"></circle>
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path>
      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path>
    </svg>
  `,audio:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M9 18V5l12-2v13"></path>
      <circle cx="6" cy="18" r="3"></circle>
      <circle cx="18" cy="16" r="3"></circle>
    </svg>
  `,session:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  `,cron:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  `,web:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      ></path>
    </svg>
  `,discovery:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  `,canvasHost:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  `,talk:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line x1="12" y1="19" x2="12" y2="23"></line>
      <line x1="8" y1="23" x2="16" y2="23"></line>
    </svg>
  `,plugins:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M12 2v6"></path>
      <path d="m4.93 10.93 4.24 4.24"></path>
      <path d="M2 12h6"></path>
      <path d="m4.93 13.07 4.24-4.24"></path>
      <path d="M12 22v-6"></path>
      <path d="m19.07 13.07-4.24-4.24"></path>
      <path d="M22 12h-6"></path>
      <path d="m19.07 10.93-4.24 4.24"></path>
    </svg>
  `,default:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
    </svg>
  `},ll={env:{label:"Environment Variables",description:"Environment variables passed to the gateway process"},update:{label:"Updates",description:"Auto-update settings and release channel"},agents:{label:"Agents",description:"Agent configurations, models, and identities"},auth:{label:"Authentication",description:"API keys and authentication profiles"},channels:{label:"Channels",description:"Messaging channels (Telegram, Discord, Slack, etc.)"},messages:{label:"Messages",description:"Message handling and routing settings"},commands:{label:"Commands",description:"Custom slash commands"},hooks:{label:"Hooks",description:"Webhooks and event hooks"},skills:{label:"Skills",description:"Skill packs and capabilities"},tools:{label:"Tools",description:"Tool configurations (browser, search, etc.)"},gateway:{label:"Gateway",description:"Gateway server settings (port, auth, binding)"},wizard:{label:"Setup Wizard",description:"Setup wizard state and history"},meta:{label:"Metadata",description:"Gateway metadata and version information"},logging:{label:"Logging",description:"Log levels and output configuration"},browser:{label:"Browser",description:"Browser automation settings"},ui:{label:"UI",description:"User interface preferences"},models:{label:"Models",description:"AI model configurations and providers"},bindings:{label:"Bindings",description:"Key bindings and shortcuts"},broadcast:{label:"Broadcast",description:"Broadcast and notification settings"},audio:{label:"Audio",description:"Audio input/output settings"},session:{label:"Session",description:"Session management and persistence"},cron:{label:"Cron",description:"Scheduled tasks and automation"},web:{label:"Web",description:"Web server and API settings"},discovery:{label:"Discovery",description:"Service discovery and networking"},canvasHost:{label:"Canvas Host",description:"Canvas rendering and display"},talk:{label:"Talk",description:"Voice and speech settings"},plugins:{label:"Plugins",description:"Plugin management and extensions"}};function td(e){return ed[e]??ed.default}function lx(e,t,n){if(!n)return!0;const i=n.toLowerCase(),s=ll[e];return e.toLowerCase().includes(i)||s&&(s.label.toLowerCase().includes(i)||s.description.toLowerCase().includes(i))?!0:vi(t,i)}function vi(e,t){var i,s,o;if((i=e.title)!=null&&i.toLowerCase().includes(t)||(s=e.description)!=null&&s.toLowerCase().includes(t)||(o=e.enum)!=null&&o.some(r=>String(r).toLowerCase().includes(t)))return!0;if(e.properties){for(const[r,a]of Object.entries(e.properties))if(r.toLowerCase().includes(t)||vi(a,t))return!0}if(e.items){const r=Array.isArray(e.items)?e.items:[e.items];for(const a of r)if(a&&vi(a,t))return!0}if(e.additionalProperties&&typeof e.additionalProperties=="object"&&vi(e.additionalProperties,t))return!0;const n=e.anyOf??e.oneOf??e.allOf;if(n){for(const r of n)if(r&&vi(r,t))return!0}return!1}function cx(e){var u;if(!e.schema)return f`
      <div class="muted">Schema unavailable.</div>
    `;const t=e.schema,n=e.value??{};if(Ke(t)!=="object"||!t.properties)return f`
      <div class="callout danger">Unsupported schema. Use Raw.</div>
    `;const i=new Set(e.unsupportedPaths??[]),s=t.properties,o=e.searchQuery??"",r=e.activeSection,a=e.activeSubsection??null,c=Object.entries(s).toSorted((h,g)=>{var _,S;const m=((_=We([h[0]],e.uiHints))==null?void 0:_.order)??50,y=((S=We([g[0]],e.uiHints))==null?void 0:S.order)??50;return m!==y?m-y:h[0].localeCompare(g[0])}).filter(([h,g])=>!(r&&h!==r||o&&!lx(h,g,o)));let d=null;if(r&&a&&c.length===1){const h=(u=c[0])==null?void 0:u[1];h&&Ke(h)==="object"&&h.properties&&h.properties[a]&&(d={sectionKey:r,subsectionKey:a,schema:h.properties[a]})}return c.length===0?f`
      <div class="config-empty">
        <div class="config-empty__icon">${ye.search}</div>
        <div class="config-empty__text">
          ${o?`No settings match "${o}"`:"No settings in this section"}
        </div>
      </div>
    `:f`
    <div class="config-form config-form--modern">
      ${d?(()=>{const{sectionKey:h,subsectionKey:g,schema:m}=d,y=We([h,g],e.uiHints),_=(y==null?void 0:y.label)??m.title??At(g),S=(y==null?void 0:y.help)??m.description??"",R=n[h],M=R&&typeof R=="object"?R[g]:void 0,A=`config-section-${h}-${g}`;return f`
              <section class="config-section-card" id=${A}>
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${td(h)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${_}</h3>
                    ${S?f`<p class="config-section-card__desc">${S}</p>`:k}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${xn({schema:m,value:M,path:[h,g],hints:e.uiHints,unsupported:i,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})():c.map(([h,g])=>{const m=ll[h]??{label:h.charAt(0).toUpperCase()+h.slice(1),description:g.description??""};return f`
              <section class="config-section-card" id="config-section-${h}">
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${td(h)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${m.label}</h3>
                    ${m.description?f`<p class="config-section-card__desc">${m.description}</p>`:k}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${xn({schema:g,value:n[h],path:[h],hints:e.uiHints,unsupported:i,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})}
    </div>
  `}const dx=new Set(["title","description","default","nullable"]);function ux(e){return Object.keys(e??{}).filter(n=>!dx.has(n)).length===0}function yf(e){const t=e.filter(s=>s!=null),n=t.length!==e.length,i=[];for(const s of t)i.some(o=>Object.is(o,s))||i.push(s);return{enumValues:i,nullable:n}}function hx(e){return!e||typeof e!="object"?{schema:null,unsupportedPaths:["<root>"]}:Ci(e,[])}function Ci(e,t){const n=new Set,i={...e},s=Sa(t)||"<root>";if(e.anyOf||e.oneOf||e.allOf){const a=fx(e,t);return a||{schema:e,unsupportedPaths:[s]}}const o=Array.isArray(e.type)&&e.type.includes("null"),r=Ke(e)??(e.properties||e.additionalProperties?"object":void 0);if(i.type=r??e.type,i.nullable=o||e.nullable,i.enum){const{enumValues:a,nullable:l}=yf(i.enum);i.enum=a,l&&(i.nullable=!0),a.length===0&&n.add(s)}if(r==="object"){const a=e.properties??{},l={};for(const[c,d]of Object.entries(a)){const u=Ci(d,[...t,c]);u.schema&&(l[c]=u.schema);for(const h of u.unsupportedPaths)n.add(h)}if(i.properties=l,e.additionalProperties===!0)n.add(s);else if(e.additionalProperties===!1)i.additionalProperties=!1;else if(e.additionalProperties&&typeof e.additionalProperties=="object"&&!ux(e.additionalProperties)){const c=Ci(e.additionalProperties,[...t,"*"]);i.additionalProperties=c.schema??e.additionalProperties,c.unsupportedPaths.length>0&&n.add(s)}}else if(r==="array"){const a=Array.isArray(e.items)?e.items[0]:e.items;if(!a)n.add(s);else{const l=Ci(a,[...t,"*"]);i.items=l.schema??a,l.unsupportedPaths.length>0&&n.add(s)}}else r!=="string"&&r!=="number"&&r!=="integer"&&r!=="boolean"&&!i.enum&&n.add(s);return{schema:i,unsupportedPaths:Array.from(n)}}function fx(e,t){if(e.allOf)return null;const n=e.anyOf??e.oneOf;if(!n)return null;const i=[],s=[];let o=!1;for(const a of n){if(!a||typeof a!="object")return null;if(Array.isArray(a.enum)){const{enumValues:l,nullable:c}=yf(a.enum);i.push(...l),c&&(o=!0);continue}if("const"in a){if(a.const==null){o=!0;continue}i.push(a.const);continue}if(Ke(a)==="null"){o=!0;continue}s.push(a)}if(i.length>0&&s.length===0){const a=[];for(const l of i)a.some(c=>Object.is(c,l))||a.push(l);return{schema:{...e,enum:a,nullable:o,anyOf:void 0,oneOf:void 0,allOf:void 0},unsupportedPaths:[]}}if(s.length===1){const a=Ci(s[0],t);return a.schema&&(a.schema.nullable=o||a.schema.nullable),a}const r=new Set(["string","number","integer","boolean"]);return s.length>0&&i.length===0&&s.every(a=>a.type&&r.has(String(a.type)))?{schema:{...e,nullable:o},unsupportedPaths:[]}:null}const ra={all:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
  `,env:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="3"></circle>
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
      ></path>
    </svg>
  `,update:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  `,agents:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path
        d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"
      ></path>
      <circle cx="8" cy="14" r="1"></circle>
      <circle cx="16" cy="14" r="1"></circle>
    </svg>
  `,auth:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  `,channels:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  `,messages:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  `,commands:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
  `,hooks:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
  `,skills:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      ></polygon>
    </svg>
  `,tools:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      ></path>
    </svg>
  `,gateway:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      ></path>
    </svg>
  `,wizard:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M15 4V2"></path>
      <path d="M15 16v-2"></path>
      <path d="M8 9h2"></path>
      <path d="M20 9h2"></path>
      <path d="M17.8 11.8 19 13"></path>
      <path d="M15 9h0"></path>
      <path d="M17.8 6.2 19 5"></path>
      <path d="m3 21 9-9"></path>
      <path d="M12.2 6.2 11 5"></path>
    </svg>
  `,meta:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
    </svg>
  `,logging:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  `,browser:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="4"></circle>
      <line x1="21.17" y1="8" x2="12" y2="8"></line>
      <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
      <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
    </svg>
  `,ui:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>
  `,models:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path
        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
      ></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  `,bindings:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
      <line x1="6" y1="6" x2="6.01" y2="6"></line>
      <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
  `,broadcast:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path>
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path>
      <circle cx="12" cy="12" r="2"></circle>
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path>
      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path>
    </svg>
  `,audio:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M9 18V5l12-2v13"></path>
      <circle cx="6" cy="18" r="3"></circle>
      <circle cx="18" cy="16" r="3"></circle>
    </svg>
  `,session:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  `,cron:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  `,web:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      ></path>
    </svg>
  `,discovery:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  `,canvasHost:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  `,talk:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line x1="12" y1="19" x2="12" y2="23"></line>
      <line x1="8" y1="23" x2="16" y2="23"></line>
    </svg>
  `,plugins:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2v6"></path>
      <path d="m4.93 10.93 4.24 4.24"></path>
      <path d="M2 12h6"></path>
      <path d="m4.93 13.07 4.24-4.24"></path>
      <path d="M12 22v-6"></path>
      <path d="m19.07 13.07-4.24-4.24"></path>
      <path d="M22 12h-6"></path>
      <path d="m19.07 10.93-4.24 4.24"></path>
    </svg>
  `,default:f`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
    </svg>
  `},nd=[{key:"env",label:"Environment"},{key:"update",label:"Updates"},{key:"agents",label:"Agents"},{key:"auth",label:"Authentication"},{key:"channels",label:"Channels"},{key:"messages",label:"Messages"},{key:"commands",label:"Commands"},{key:"hooks",label:"Hooks"},{key:"skills",label:"Skills"},{key:"tools",label:"Tools"},{key:"gateway",label:"Gateway"},{key:"wizard",label:"Setup Wizard"}],id="__all__";function sd(e){return ra[e]??ra.default}function px(e,t){const n=ll[e];return n||{label:(t==null?void 0:t.title)??At(e),description:(t==null?void 0:t.description)??""}}function gx(e){const{key:t,schema:n,uiHints:i}=e;if(!n||Ke(n)!=="object"||!n.properties)return[];const s=Object.entries(n.properties).map(([o,r])=>{const a=We([t,o],i),l=(a==null?void 0:a.label)??r.title??At(o),c=(a==null?void 0:a.help)??r.description??"",d=(a==null?void 0:a.order)??50;return{key:o,label:l,description:c,order:d}});return s.sort((o,r)=>o.order!==r.order?o.order-r.order:o.key.localeCompare(r.key)),s}function mx(e,t){if(!e||!t)return[];const n=[];function i(s,o,r){if(s===o)return;if(typeof s!=typeof o){n.push({path:r,from:s,to:o});return}if(typeof s!="object"||s===null||o===null){s!==o&&n.push({path:r,from:s,to:o});return}if(Array.isArray(s)&&Array.isArray(o)){JSON.stringify(s)!==JSON.stringify(o)&&n.push({path:r,from:s,to:o});return}const a=s,l=o,c=new Set([...Object.keys(a),...Object.keys(l)]);for(const d of c)i(a[d],l[d],r?`${r}.${d}`:d)}return i(e,t,""),n}function od(e,t=40){let n;try{n=JSON.stringify(e)??String(e)}catch{n=String(e)}return n.length<=t?n:n.slice(0,t-3)+"..."}function yx(e){var v,E,P;const t=e.valid==null?"unknown":e.valid?"valid":"invalid",n=hx(e.schema),i=n.schema?n.unsupportedPaths.length>0:!1,s=((v=n.schema)==null?void 0:v.properties)??{},o=nd.filter(C=>C.key in s),r=new Set(nd.map(C=>C.key)),a=Object.keys(s).filter(C=>!r.has(C)).map(C=>({key:C,label:C.charAt(0).toUpperCase()+C.slice(1)})),l=[...o,...a],c=e.activeSection&&n.schema&&Ke(n.schema)==="object"?(E=n.schema.properties)==null?void 0:E[e.activeSection]:void 0,d=e.activeSection?px(e.activeSection,c):null,u=e.activeSection?gx({key:e.activeSection,schema:c,uiHints:e.uiHints}):[],h=e.formMode==="form"&&!!e.activeSection&&u.length>0,g=e.activeSubsection===id,m=e.searchQuery||g?null:e.activeSubsection??((P=u[0])==null?void 0:P.key)??null,y=e.formMode==="form"?mx(e.originalValue,e.formValue):[],_=e.formMode==="raw"&&e.raw!==e.originalRaw,S=e.formMode==="form"?y.length>0:_,R=!!e.formValue&&!e.loading&&!!n.schema,M=e.connected&&!e.saving&&S&&(e.formMode==="raw"?!0:R),A=e.connected&&!e.applying&&!e.updating&&S&&(e.formMode==="raw"?!0:R),T=e.connected&&!e.applying&&!e.updating;return f`
    <div class="config-layout">
      <!-- Sidebar -->
      <aside class="config-sidebar">
        <div class="config-sidebar__header">
          <div class="config-sidebar__title">Settings</div>
          <span
            class="pill pill--sm ${t==="valid"?"pill--ok":t==="invalid"?"pill--danger":""}"
            >${t}</span
          >
        </div>

        <!-- Search -->
        <div class="config-search">
          <svg
            class="config-search__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            class="config-search__input"
            placeholder="Search settings..."
            .value=${e.searchQuery}
            @input=${C=>e.onSearchChange(C.target.value)}
          />
          ${e.searchQuery?f`
                <button
                  class="config-search__clear"
                  @click=${()=>e.onSearchChange("")}
                >
                  ×
                </button>
              `:k}
        </div>

        <!-- Section nav -->
        <nav class="config-nav">
          <button
            class="config-nav__item ${e.activeSection===null?"active":""}"
            @click=${()=>e.onSectionChange(null)}
          >
            <span class="config-nav__icon">${ra.all}</span>
            <span class="config-nav__label">All Settings</span>
          </button>
          ${l.map(C=>f`
              <button
                class="config-nav__item ${e.activeSection===C.key?"active":""}"
                @click=${()=>e.onSectionChange(C.key)}
              >
                <span class="config-nav__icon"
                  >${sd(C.key)}</span
                >
                <span class="config-nav__label">${C.label}</span>
              </button>
            `)}
        </nav>

        <!-- Mode toggle at bottom -->
        <div class="config-sidebar__footer">
          <div class="config-mode-toggle">
            <button
              class="config-mode-toggle__btn ${e.formMode==="form"?"active":""}"
              ?disabled=${e.schemaLoading||!e.schema}
              @click=${()=>e.onFormModeChange("form")}
            >
              Form
            </button>
            <button
              class="config-mode-toggle__btn ${e.formMode==="raw"?"active":""}"
              @click=${()=>e.onFormModeChange("raw")}
            >
              Raw
            </button>
          </div>
        </div>
      </aside>

      <!-- Main content -->
      <main class="config-main">
        <!-- Action bar -->
        <div class="config-actions">
          <div class="config-actions__left">
            ${S?f`
                  <span class="config-changes-badge"
                    >${e.formMode==="raw"?"Unsaved changes":`${y.length} unsaved change${y.length!==1?"s":""}`}</span
                  >
                `:f`
                    <span class="config-status muted">No changes</span>
                  `}
          </div>
          <div class="config-actions__right">
            <button
              class="btn btn--sm"
              ?disabled=${e.loading}
              @click=${e.onReload}
            >
              ${e.loading?"Loading…":"Reload"}
            </button>
            <button
              class="btn btn--sm primary"
              ?disabled=${!M}
              @click=${e.onSave}
            >
              ${e.saving?"Saving…":"Save"}
            </button>
            <button
              class="btn btn--sm"
              ?disabled=${!A}
              @click=${e.onApply}
            >
              ${e.applying?"Applying…":"Apply"}
            </button>
            <button
              class="btn btn--sm"
              ?disabled=${!T}
              @click=${e.onUpdate}
            >
              ${e.updating?"Updating…":"Update"}
            </button>
          </div>
        </div>

        <!-- Diff panel (form mode only - raw mode doesn't have granular diff) -->
        ${S&&e.formMode==="form"?f`
              <details class="config-diff">
                <summary class="config-diff__summary">
                  <span
                    >View ${y.length} pending
                    change${y.length!==1?"s":""}</span
                  >
                  <svg
                    class="config-diff__chevron"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </summary>
                <div class="config-diff__content">
                  ${y.map(C=>f`
                      <div class="config-diff__item">
                        <div class="config-diff__path">${C.path}</div>
                        <div class="config-diff__values">
                          <span class="config-diff__from"
                            >${od(C.from)}</span
                          >
                          <span class="config-diff__arrow">→</span>
                          <span class="config-diff__to"
                            >${od(C.to)}</span
                          >
                        </div>
                      </div>
                    `)}
                </div>
              </details>
            `:k}
        ${d&&e.formMode==="form"?f`
              <div class="config-section-hero">
                <div class="config-section-hero__icon">
                  ${sd(e.activeSection??"")}
                </div>
                <div class="config-section-hero__text">
                  <div class="config-section-hero__title">
                    ${d.label}
                  </div>
                  ${d.description?f`<div class="config-section-hero__desc">
                        ${d.description}
                      </div>`:k}
                </div>
              </div>
            `:k}
        ${h?f`
              <div class="config-subnav">
                <button
                  class="config-subnav__item ${m===null?"active":""}"
                  @click=${()=>e.onSubsectionChange(id)}
                >
                  All
                </button>
                ${u.map(C=>f`
                    <button
                      class="config-subnav__item ${m===C.key?"active":""}"
                      title=${C.description||C.label}
                      @click=${()=>e.onSubsectionChange(C.key)}
                    >
                      ${C.label}
                    </button>
                  `)}
              </div>
            `:k}

        <!-- Form content -->
        <div class="config-content">
          ${e.formMode==="form"?f`
                ${e.schemaLoading?f`
                        <div class="config-loading">
                          <div class="config-loading__spinner"></div>
                          <span>Loading schema…</span>
                        </div>
                      `:cx({schema:n.schema,uiHints:e.uiHints,value:e.formValue,disabled:e.loading||!e.formValue,unsupportedPaths:n.unsupportedPaths,onPatch:e.onFormPatch,searchQuery:e.searchQuery,activeSection:e.activeSection,activeSubsection:m})}
                ${i?f`
                        <div class="callout danger" style="margin-top: 12px">
                          Form view can't safely edit some fields. Use Raw to avoid losing config entries.
                        </div>
                      `:k}
              `:f`
                <label class="field config-raw-field">
                  <span>Raw JSON5</span>
                  <textarea
                    .value=${e.raw}
                    @input=${C=>e.onRawChange(C.target.value)}
                  ></textarea>
                </label>
              `}
        </div>

        ${e.issues.length>0?f`<div class="callout danger" style="margin-top: 12px;">
              <pre class="code-block">
${JSON.stringify(e.issues,null,2)}</pre
              >
            </div>`:k}
      </main>
    </div>
  `}function rd(e){const t=(e??"").trim();return t?t==="Untitled quotation"||t==="未命名报价单"?p("work.fallbackDraftName"):t:""}function vx(e){if(!e)return"-";try{return new Date(e).toLocaleString()}catch{return e??"-"}}function bx(e,t,n,i){const s=i==="asc"?1:-1;if(n==="created_at"){const o=e.created_at?new Date(e.created_at).getTime():0,r=t.created_at?new Date(t.created_at).getTime():0;return(o-r)*s}return n==="name"?(e.name??"").localeCompare(t.name??"")*s:(e.draft_no??"").localeCompare(t.draft_no??"")*s}function wx(e){const{loading:t,error:n,drafts:i,detail:s,detailId:o,confirmBusy:r,confirmResult:a,filterQuery:l,sortBy:c,sortDir:d,page:u,pageSize:h,onRefresh:g,onSelectDraft:m,onConfirm:y,onClearDetail:_,onFilterQueryChange:S,onSortByChange:R,onSortDirChange:M,onPageChange:A,onPageSizeChange:T}=e,v=l.trim().toLowerCase(),P=[...v?i.filter(L=>`${L.draft_no??""}
${L.name??""}
${L.source??""}`.toLowerCase().includes(v)):i].sort((L,H)=>bx(L,H,c,d)),C=P.length,O=Math.max(1,h||10),D=Math.max(1,Math.ceil(C/O)),F=Math.min(Math.max(1,u),D),j=(F-1)*O,G=P.slice(j,j+O);return f`
    <section class="grid grid-cols-2" aria-label=${p("tabs.cron")}>
      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${p("fulfill.title")}</div>
        <div class="card-sub">${p("fulfill.subtitle")}</div>
        <div style="margin-top: 12px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <button class="btn" ?disabled=${t} @click=${g} aria-label=${p("fulfill.refreshList")}>
            ${p(t?"fulfill.loading":"fulfill.refreshList")}
          </button>
          <input
            type="search"
            .value=${l}
            placeholder=${p("fulfill.filterPlaceholder")}
            @input=${L=>S(L.target.value)}
            aria-label=${p("fulfill.filterPlaceholder")}
            style="min-width: 220px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border);"
          />
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${p("fulfill.sortBy")}</span>
            <select
              .value=${c}
              @change=${L=>R(L.target.value)}
              aria-label=${p("fulfill.sortBy")}
              style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 160px;"
            >
              <option value="created_at">${p("fulfill.sortCreatedAt")}</option>
              <option value="draft_no">${p("fulfill.sortDraftNo")}</option>
              <option value="name">${p("fulfill.sortName")}</option>
            </select>
          </label>
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${p("fulfill.sortDir")}</span>
            <select
              .value=${d}
              @change=${L=>M(L.target.value)}
              aria-label=${p("fulfill.sortDir")}
              style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 140px;"
            >
              <option value="desc">${p("fulfill.sortDesc")}</option>
              <option value="asc">${p("fulfill.sortAsc")}</option>
            </select>
          </label>
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${p("fulfill.pageSize")}</span>
            <select
              .value=${String(O)}
              @change=${L=>T(Number(L.target.value)||10)}
              aria-label=${p("fulfill.pageSize")}
              style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 120px;"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </label>
        </div>
      </div>

      ${n?f`
            <div class="card" style="grid-column: 1 / -1; border-color: var(--danger, #c62828);" role="alert" aria-live="assertive">
              <div class="card-title" style="color: var(--danger, #c62828);">${p("common.errorTitle")}</div>
              <div class="card-sub">${n}</div>
              <div style="margin-top: 10px;">
                <button class="btn" @click=${g}>${p("common.retry")}</button>
              </div>
            </div>
          `:k}

      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${p("fulfill.listTitle")}</div>
        <div class="card-sub">${p("fulfill.listSubtitle")}</div>

        ${t&&i.length===0?f`<p class="muted" style="margin-top: 12px;">${p("fulfill.loading")}</p>`:C===0?f`<p class="muted" style="margin-top: 12px;">${p("fulfill.noDrafts")}</p>`:f`
                <div class="muted" style="font-size: 12px; margin-top: 10px;">
                  ${p("fulfill.total",{total:String(C)})}
                </div>
                <div style="overflow-x: auto; margin-top: 8px;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <thead>
                      <tr style="background: var(--bg-secondary, #eee);">
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("fulfill.colDraftNo")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("fulfill.colName")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("fulfill.colSource")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("fulfill.colCreatedAt")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("fulfill.colActions")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${G.map(L=>f`
                          <tr style=${o===L.id?"background: var(--bg-secondary, #f5f5f5);":""}>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${L.draft_no}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${rd(L.name)}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${L.source??"-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${vx(L.created_at)}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border); display: flex; gap: 6px; flex-wrap: wrap;">
                              <button
                                class="btn btn-sm"
                                @click=${()=>m(L.id)}
                                aria-label=${p("fulfill.viewDetail")}
                              >
                                ${p("fulfill.viewDetail")}
                              </button>
                              <button
                                class="btn"
                                style="font-size: 12px; padding: 4px 8px;"
                                ?disabled=${r}
                                @click=${()=>y(L.id)}
                                aria-label=${p("fulfill.confirmAction")}
                              >
                                ${r&&o===L.id?p("fulfill.confirming"):p("fulfill.confirmAction")}
                              </button>
                            </td>
                          </tr>
                        `)}
                    </tbody>
                  </table>
                </div>

                <div style="display: flex; align-items: center; gap: 8px; margin-top: 10px;">
                  <button
                    class="btn btn-sm"
                    ?disabled=${F<=1}
                    @click=${()=>A(F-1)}
                    aria-label=${p("common.prev")}
                  >
                    ${p("common.prev")}
                  </button>
                  <span class="muted" style="font-size: 12px;">${p("fulfill.page",{current:String(F),total:String(D)})}</span>
                  <button
                    class="btn btn-sm"
                    ?disabled=${F>=D}
                    @click=${()=>A(F+1)}
                    aria-label=${p("common.next")}
                  >
                    ${p("common.next")}
                  </button>
                </div>
              `}
      </div>

      ${s?f`
            <div class="card" style="grid-column: 1 / -1;" tabindex="-1">
              <div class="card-title">${p("fulfill.detailTitle",{draftNo:s.draft_no})}</div>
              <div class="card-sub">${rd(s.name)}</div>
              <div style="margin-top: 8px; display: flex; gap: 8px;">
                <button class="btn btn-sm" @click=${_}>${p("fulfill.closeDetail")}</button>
                <button
                  class="btn"
                  style="background: var(--accent); color: var(--bg);"
                  ?disabled=${r}
                  @click=${()=>y(s.id)}
                >
                  ${p(r?"fulfill.confirming":"fulfill.confirmAction")}
                </button>
              </div>
              <div style="overflow-x: auto; margin-top: 12px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                  <thead>
                    <tr style="background: var(--bg-secondary, #eee);">
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">#</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("fulfill.lineProduct")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("fulfill.lineSpec")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("fulfill.lineQty")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("fulfill.lineCode")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("fulfill.lineQuoteName")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("fulfill.lineQuoteSpec")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("fulfill.linePrice")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("fulfill.lineAmount")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("fulfill.lineAvailable")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("fulfill.lineShortfall")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("fulfill.lineIsShortage")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${(s.lines??[]).map((L,H)=>f`
                        <tr>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${H+1}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${L.product_name??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${L.specification??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${L.qty??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${L.code??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${L.quote_name??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${L.quote_spec??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${L.unit_price??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${L.amount??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${L.warehouse_qty??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${L.shortfall??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${L.is_shortage?p("common.yes"):p("common.no")}</td>
                        </tr>
                      `)}
                  </tbody>
                </table>
              </div>
            </div>
          `:k}

      ${a?f`
            <div class="card" style="grid-column: 1 / -1; border-color: var(--success, #2e7d32);" role="status" aria-live="polite">
              <div class="card-title" style="color: var(--success, #2e7d32);">${p("fulfill.confirmTitle")}</div>
              ${a.order_id?f`<p style="margin: 0 0 4px 0; font-weight: 600;">${p("fulfill.orderId")}: ${a.order_id}</p>`:k}
              <div class="card-sub">${a.message??""}</div>
            </div>
          `:k}
    </section>
  `}function xx(e,t,n,i){const s=i==="asc"?1:-1;if(n==="uploaded_at"){const o=e.uploaded_at?new Date(e.uploaded_at).getTime():0,r=t.uploaded_at?new Date(t.uploaded_at).getTime():0;return(o-r)*s}return n==="shortfall"?(Number(e.shortfall??0)-Number(t.shortfall??0))*s:n==="count"?(Number(e.count??0)-Number(t.count??0))*s:(e.product_name??"").localeCompare(t.product_name??"")*s}function _x(e){const{loading:t,error:n,suggestions:i,selectedKeys:s,approvedKeys:o,approveBusy:r,approveResult:a,filterQuery:l,sortBy:c,sortDir:d,page:u,pageSize:h,onRefresh:g,onToggleSelect:m,onApprove:y,onApproveBatch:_,onFilterQueryChange:S,onSortByChange:R,onSortDirChange:M,onPageChange:A,onPageSizeChange:T}=e,v=i.filter(B=>!o.includes(Ye(B))),E=l.trim().toLowerCase(),P=E?v.filter(B=>`${B.product_name??""}
${B.specification??""}
${B.code??""}
${B.product_key??""}`.toLowerCase().includes(E)):v,C=[...P].sort((B,we)=>xx(B,we,c,d)),O=C.length,D=Math.max(1,h||10),F=Math.max(1,Math.ceil(O/D)),j=Math.min(Math.max(1,u),F),G=(j-1)*D,L=C.slice(G,G+D),H=P.filter(B=>s.includes(Ye(B))).length,ee=P.length>0&&P.every(B=>s.includes(Ye(B)));return f`
    <section class="grid grid-cols-2" aria-label=${p("tabs.sessions")}>
      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${p("procurement.title")}</div>
        <div class="card-sub">${p("procurement.subtitle")}</div>
        <div style="margin-top: 12px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <button class="btn" ?disabled=${t} @click=${g} aria-label=${p("procurement.refreshList")}>
            ${p(t?"procurement.loading":"procurement.refreshList")}
          </button>
          <input
            type="search"
            .value=${l}
            placeholder=${p("procurement.filterPlaceholder")}
            @input=${B=>S(B.target.value)}
            aria-label=${p("procurement.filterPlaceholder")}
            style="min-width: 240px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border);"
          />
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${p("procurement.sortBy")}</span>
            <select
              .value=${c}
              @change=${B=>R(B.target.value)}
              aria-label=${p("procurement.sortBy")}
              style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 160px;"
            >
              <option value="uploaded_at">${p("procurement.sortUploadedAt")}</option>
              <option value="shortfall">${p("procurement.sortShortfall")}</option>
              <option value="count">${p("procurement.sortCount")}</option>
              <option value="product_name">${p("procurement.sortProduct")}</option>
            </select>
          </label>
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${p("procurement.sortDir")}</span>
            <select
              .value=${d}
              @change=${B=>M(B.target.value)}
              aria-label=${p("procurement.sortDir")}
              style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 140px;"
            >
              <option value="desc">${p("procurement.sortDesc")}</option>
              <option value="asc">${p("procurement.sortAsc")}</option>
            </select>
          </label>
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${p("procurement.pageSize")}</span>
            <select
              .value=${String(D)}
              @change=${B=>T(Number(B.target.value)||10)}
              aria-label=${p("procurement.pageSize")}
              style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 120px;"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </label>
        </div>
      </div>

      ${n?f`
            <div class="card" style="grid-column: 1 / -1; border-color: var(--danger, #c62828);" role="alert" aria-live="assertive">
              <div class="card-title" style="color: var(--danger, #c62828);">${p("common.errorTitle")}</div>
              <div class="card-sub">${n}</div>
              <div style="margin-top: 10px;">
                <button class="btn" @click=${g}>${p("common.retry")}</button>
              </div>
            </div>
          `:k}

      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${p("procurement.listTitle")}</div>
        <div class="card-sub">${p("procurement.listHint")}</div>

        ${H>0?f`
              <div style="margin-top: 12px;">
                <button
                  class="btn"
                  style="font-size: 12px;"
                  ?disabled=${r}
                  @click=${_}
                  aria-label=${p("procurement.batchApprove")}
                >
                  ${r?p("procurement.approving"):`${p("procurement.batchApprove")} (${H})`}
                </button>
              </div>
            `:k}

        ${t&&i.length===0?f`<p class="muted" style="margin-top: 12px;">${p("procurement.loading")}</p>`:P.length===0?f`<p class="muted" style="margin-top: 12px;">${i.length===0?p("procurement.noSuggestions"):p("procurement.noPending")}</p>`:f`
                <div class="muted" style="font-size: 12px; margin-top: 10px;">
                  ${p("procurement.total",{total:String(O)})}
                </div>
                <div style="overflow-x: auto; margin-top: 8px;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <thead>
                      <tr style="background: var(--bg-secondary, #eee);">
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border); width: 36px;">
                          <input
                            type="checkbox"
                            .checked=${ee}
                            .indeterminate=${H>0&&H<P.length}
                            aria-label=${p("procurement.selectAll")}
                            @change=${()=>{ee?P.forEach(B=>m(Ye(B))):P.forEach(B=>{const we=Ye(B);s.includes(we)||m(we)})}}
                          />
                        </th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("procurement.colProduct")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("procurement.colSpec")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("procurement.colShortfall")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("procurement.colCode")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("procurement.colCount")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${p("procurement.colActions")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${L.map(B=>f`
                          <tr>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">
                              <input
                                type="checkbox"
                                .checked=${s.includes(Ye(B))}
                                aria-label=${p("procurement.selectItem")}
                                @change=${()=>m(Ye(B))}
                              />
                            </td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${B.product_name??"-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${B.specification??"-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${B.shortfall??0}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${B.code??"-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${B.count??0}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">
                              <button
                                class="btn"
                                style="font-size: 12px; padding: 4px 8px;"
                                ?disabled=${r}
                                @click=${()=>y(B)}
                                aria-label=${p("procurement.approveSingle")}
                              >
                                ${p(r?"procurement.approving":"procurement.approveSingle")}
                              </button>
                            </td>
                          </tr>
                        `)}
                    </tbody>
                  </table>
                </div>

                <div style="display: flex; align-items: center; gap: 8px; margin-top: 10px;">
                  <button
                    class="btn btn-sm"
                    ?disabled=${j<=1}
                    @click=${()=>A(j-1)}
                    aria-label=${p("common.prev")}
                  >
                    ${p("common.prev")}
                  </button>
                  <span class="muted" style="font-size: 12px;">${p("procurement.page",{current:String(j),total:String(F)})}</span>
                  <button
                    class="btn btn-sm"
                    ?disabled=${j>=F}
                    @click=${()=>A(j+1)}
                    aria-label=${p("common.next")}
                  >
                    ${p("common.next")}
                  </button>
                </div>
              `}
      </div>

      ${a?f`
            <div class="card" style="grid-column: 1 / -1;" role="status" aria-live="polite">
              <div class="card-sub">
                ${a.approved_count!=null?`${p("procurement.approvedCount",{count:String(a.approved_count)})} `:""}${a.message??""}
              </div>
            </div>
          `:k}

      <div class="card" style="grid-column: 1 / -1; margin-top: 16px;">
        <div class="card-title">${p("replenishment.title")}</div>
        <div class="card-sub">${p("replenishment.subtitle")}</div>
        <div style="margin-top: 12px;">
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
              <thead>
                <tr style="background: var(--bg-secondary, #eee);">
                  <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">
                    ${p("replenishment.productOrCodePlaceholder")}
                  </th>
                  <th style="padding: 6px 8px; text-align: right; border: 1px solid var(--border); width: 120px;">
                    ${p("replenishment.quantityPlaceholder")}
                  </th>
                  <th style="padding: 6px 8px; border: 1px solid var(--border); width: 60px;"></th>
                </tr>
              </thead>
              <tbody>
                ${e.replenishmentInputLines.map((B,we)=>f`
                    <tr>
                      <td style="padding: 6px 8px; border: 1px solid var(--border);">
                        <input
                          type="text"
                          .value=${B.product_or_code}
                          placeholder=${p("replenishment.productOrCodePlaceholder")}
                          @input=${$e=>e.onReplenishmentLineChange(we,"product_or_code",$e.target.value)}
                          style="width: 100%; padding: 6px 8px; border-radius: 4px; border: 1px solid var(--border);"
                          aria-label=${p("replenishment.productOrCodePlaceholder")}
                        />
                      </td>
                      <td style="padding: 6px 8px; border: 1px solid var(--border); text-align: right;">
                        <input
                          type="number"
                          min="1"
                          .value=${String(B.quantity||"")}
                          placeholder=${p("replenishment.quantityPlaceholder")}
                          @input=${$e=>{const oe=$e.target.value,Ie=oe===""?0:Number(oe);e.onReplenishmentLineChange(we,"quantity",Number.isFinite(Ie)?Ie:0)}}
                          style="width: 80px; padding: 6px 8px; border-radius: 4px; border: 1px solid var(--border); text-align: right;"
                          aria-label=${p("replenishment.quantityPlaceholder")}
                        />
                      </td>
                      <td style="padding: 6px 8px; border: 1px solid var(--border);">
                        ${e.replenishmentInputLines.length>1?f`
                              <button
                                type="button"
                                class="btn btn-sm"
                                style="font-size: 12px; padding: 4px 8px;"
                                @click=${()=>e.onReplenishmentRemoveLine(we)}
                                aria-label=${p("replenishment.removeRow")}
                              >
                                ${p("replenishment.removeRow")}
                              </button>
                            `:k}
                      </td>
                    </tr>
                  `)}
              </tbody>
            </table>
          </div>
          <div style="margin-top: 10px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <button
              class="btn btn-sm"
              @click=${e.onReplenishmentAddLine}
              aria-label=${p("replenishment.addRow")}
            >
              ${p("replenishment.addRow")}
            </button>
            <button
              class="btn"
              ?disabled=${e.replenishmentCreateBusy||e.replenishmentLoading}
              @click=${e.onCreateReplenishmentDraft}
              aria-label=${p("replenishment.generateDraft")}
            >
              ${e.replenishmentCreateBusy?p("replenishment.creating"):p("replenishment.generateDraft")}
            </button>
            <button
              class="btn"
              ?disabled=${e.replenishmentLoading}
              @click=${e.onReplenishmentRefresh}
              aria-label=${p("replenishment.refreshList")}
            >
              ${e.replenishmentLoading?p("replenishment.loading"):p("replenishment.refreshList")}
            </button>
          </div>
        </div>
      </div>

      ${e.replenishmentError?f`
            <div class="card" style="grid-column: 1 / -1; border-color: var(--danger, #c62828);" role="alert" aria-live="assertive">
              <div class="card-title" style="color: var(--danger, #c62828);">${p("common.errorTitle")}</div>
              <div class="card-sub">${e.replenishmentError}</div>
            </div>
          `:k}

      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${p("replenishment.listTitle")}</div>
        <div class="card-sub">${p("replenishment.listHint")}</div>

        ${e.replenishmentLoading&&e.replenishmentDrafts.length===0?f`<p class="muted" style="margin-top: 12px;">${p("replenishment.loading")}</p>`:e.replenishmentDrafts.length===0?f`<p class="muted" style="margin-top: 12px;">${p("replenishment.noDrafts")}</p>`:f`
                <div style="overflow-x: auto; margin-top: 8px;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <thead>
                      <tr style="background: var(--bg-secondary, #eee);">
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">
                          ${p("replenishment.colDraftNo")}
                        </th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">
                          ${p("replenishment.colName")}
                        </th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">
                          ${p("replenishment.colCreatedAt")}
                        </th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">
                          ${p("replenishment.colStatus")}
                        </th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">
                          ${p("replenishment.colActions")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      ${e.replenishmentDrafts.map(B=>f`
                          <tr>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${B.draft_no}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${B.name}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">
                              ${B.created_at?new Date(B.created_at).toLocaleString():"-"}
                            </td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${B.status}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">
                              <button
                                class="btn btn-sm"
                                style="font-size: 12px; padding: 4px 8px; margin-right: 6px;"
                                @click=${()=>e.onSelectReplenishmentDraft(B.id)}
                              >
                                ${p("replenishment.viewDetail")}
                              </button>
                              <button
                                class="btn btn-sm"
                                style="font-size: 12px; padding: 4px 8px;"
                                ?disabled=${e.replenishmentConfirmBusy||B.status==="confirmed"}
                                @click=${()=>e.onConfirmReplenishment(B.id)}
                              >
                                ${e.replenishmentConfirmBusy?p("replenishment.confirming"):p("replenishment.confirm")}
                              </button>
                              <button
                                class="btn btn-sm"
                                style="font-size: 12px; padding: 4px 8px; color: var(--danger, #c62828);"
                                @click=${()=>e.onDeleteReplenishmentDraft(B.id)}
                                aria-label=${p("replenishment.delete")}
                              >
                                ${p("replenishment.delete")}
                              </button>
                            </td>
                          </tr>
                        `)}
                    </tbody>
                  </table>
                </div>
              `}
      </div>

      ${e.replenishmentDetail&&e.replenishmentDetailId!=null?f`
            <div class="card" style="grid-column: 1 / -1;">
              <div class="card-title">
                ${p("replenishment.detailTitle",{no:e.replenishmentDetail.draft_no})}
              </div>
              <div class="card-sub">
                ${p("replenishment.detailSubtitle")}
              </div>
              <div style="overflow-x: auto; margin-top: 8px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                  <thead>
                    <tr style="background: var(--bg-secondary, #eee);">
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">
                        ${p("replenishment.colCode")}
                      </th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">
                        ${p("replenishment.colProduct")}
                      </th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">
                        ${p("replenishment.colSpec")}
                      </th>
                      <th style="padding: 6px 8px; text-align: right; border: 1px solid var(--border);">
                        ${p("replenishment.colCurrentQty")}
                      </th>
                      <th style="padding: 6px 8px; text-align: right; border: 1px solid var(--border);">
                        ${p("replenishment.colQuantity")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    ${e.replenishmentDetail.lines.map(B=>f`
                        <tr>
                          <td style="padding: 6px 8px; border: 1px solid var(--border);">${B.code??"-"}</td>
                          <td style="padding: 6px 8px; border: 1px solid var(--border);">${B.product_name??"-"}</td>
                          <td style="padding: 6px 8px; border: 1px solid var(--border);">${B.specification??"-"}</td>
                          <td style="padding: 6px 8px; text-align: right; border: 1px solid var(--border);">
                            ${B.current_qty??"-"}
                          </td>
                          <td style="padding: 6px 8px; text-align: right; border: 1px solid var(--border);">
                            ${B.quantity}
                          </td>
                        </tr>
                      `)}
                  </tbody>
                </table>
              </div>
              <div style="margin-top: 10px; display: flex; gap: 8px;">
                <button class="btn btn-sm" @click=${e.onClearReplenishmentDetail}>
                  ${p("common.close")}
                </button>
              </div>
            </div>
          `:k}

      ${e.replenishmentConfirmResult?f`
            <div class="card" style="grid-column: 1 / -1;" role="status" aria-live="polite">
              <div class="card-sub">${e.replenishmentConfirmResult.message??""}</div>
            </div>
          `:k}
    </section>
  `}function kx(e){return e?`${Pg(e)} (${Gi(e)})`:"n/a"}function $x(e){if(e==null)return"";try{return JSON.stringify(e,null,2)}catch{return String(e)}}function Sx(e){const t=e.status&&typeof e.status=="object"?e.status.securityAudit:null,n=(t==null?void 0:t.summary)??null,i=(n==null?void 0:n.critical)??0,s=(n==null?void 0:n.warn)??0,o=(n==null?void 0:n.info)??0,r=i>0?"danger":s>0?"warn":"success",a=i>0?`${i} critical`:s>0?`${s} warnings`:"No critical issues";return f`
    <section class="grid grid-cols-2">
      <div class="card">
        <div class="row" style="justify-content: space-between;">
          <div>
            <div class="card-title">Snapshots</div>
            <div class="card-sub">Status, health, and heartbeat data.</div>
          </div>
          <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"Refreshing…":"Refresh"}
          </button>
        </div>
        <div class="stack" style="margin-top: 12px;">
          <div>
            <div class="muted">Status</div>
            ${n?f`<div class="callout ${r}" style="margin-top: 8px;">
                  Security audit: ${a}${o>0?` · ${o} info`:""}. Run
                  <span class="mono">openclaw security audit --deep</span> for details.
                </div>`:k}
            <pre class="code-block">${JSON.stringify(e.status??{},null,2)}</pre>
          </div>
          <div>
            <div class="muted">Health</div>
            <pre class="code-block">${JSON.stringify(e.health??{},null,2)}</pre>
          </div>
          <div>
            <div class="muted">Last heartbeat</div>
            <pre class="code-block">${JSON.stringify(e.heartbeat??{},null,2)}</pre>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">Manual RPC</div>
        <div class="card-sub">Send a raw gateway method with JSON params.</div>
        <div class="form-grid" style="margin-top: 16px;">
          <label class="field">
            <span>Method</span>
            <input
              .value=${e.callMethod}
              @input=${l=>e.onCallMethodChange(l.target.value)}
              placeholder="system-presence"
            />
          </label>
          <label class="field">
            <span>Params (JSON)</span>
            <textarea
              .value=${e.callParams}
              @input=${l=>e.onCallParamsChange(l.target.value)}
              rows="6"
            ></textarea>
          </label>
        </div>
        <div class="row" style="margin-top: 12px;">
          <button class="btn primary" @click=${e.onCall}>Call</button>
        </div>
        ${e.callError?f`<div class="callout danger" style="margin-top: 12px;">
              ${e.callError}
            </div>`:k}
        ${e.callResult?f`<pre class="code-block" style="margin-top: 12px;">${e.callResult}</pre>`:k}
      </div>
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">Models</div>
      <div class="card-sub">Catalog from models.list.</div>
      <pre class="code-block" style="margin-top: 12px;">${JSON.stringify(e.models??[],null,2)}</pre>
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">Event Log</div>
      <div class="card-sub">Latest gateway events.</div>
      ${e.eventLog.length===0?f`
              <div class="muted" style="margin-top: 12px">No events yet.</div>
            `:f`
            <div class="list" style="margin-top: 12px;">
              ${e.eventLog.map(l=>f`
                  <div class="list-item">
                    <div class="list-main">
                      <div class="list-title">${l.event}</div>
                      <div class="list-sub">${new Date(l.ts).toLocaleTimeString()}</div>
                    </div>
                    <div class="list-meta">
                      <pre class="code-block">${$x(l.payload)}</pre>
                    </div>
                  </div>
                `)}
            </div>
          `}
    </section>
  `}function Ax(e){const t=Math.max(0,e),n=Math.floor(t/1e3);if(n<60)return`${n}s`;const i=Math.floor(n/60);return i<60?`${i}m`:`${Math.floor(i/60)}h`}function Yt(e,t){return t?f`<div class="exec-approval-meta-row"><span>${e}</span><span>${t}</span></div>`:k}function Tx(e){const t=e.execApprovalQueue[0];if(!t)return k;const n=t.request,i=t.expiresAtMs-Date.now(),s=i>0?`expires in ${Ax(i)}`:"expired",o=e.execApprovalQueue.length;return f`
    <div class="exec-approval-overlay" role="dialog" aria-live="polite">
      <div class="exec-approval-card">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">Exec approval needed</div>
            <div class="exec-approval-sub">${s}</div>
          </div>
          ${o>1?f`<div class="exec-approval-queue">${o} pending</div>`:k}
        </div>
        <div class="exec-approval-command mono">${n.command}</div>
        <div class="exec-approval-meta">
          ${Yt("Host",n.host)}
          ${Yt("Agent",n.agentId)}
          ${Yt("Session",n.sessionKey)}
          ${Yt("CWD",n.cwd)}
          ${Yt("Resolved",n.resolvedPath)}
          ${Yt("Security",n.security)}
          ${Yt("Ask",n.ask)}
        </div>
        ${e.execApprovalError?f`<div class="exec-approval-error">${e.execApprovalError}</div>`:k}
        <div class="exec-approval-actions">
          <button
            class="btn primary"
            ?disabled=${e.execApprovalBusy}
            @click=${()=>e.handleExecApprovalDecision("allow-once")}
          >
            Allow once
          </button>
          <button
            class="btn"
            ?disabled=${e.execApprovalBusy}
            @click=${()=>e.handleExecApprovalDecision("allow-always")}
          >
            Always allow
          </button>
          <button
            class="btn danger"
            ?disabled=${e.execApprovalBusy}
            @click=${()=>e.handleExecApprovalDecision("deny")}
          >
            Deny
          </button>
        </div>
      </div>
    </div>
  `}function Cx(e){const{pendingGatewayUrl:t}=e;return t?f`
    <div class="exec-approval-overlay" role="dialog" aria-modal="true" aria-live="polite">
      <div class="exec-approval-card">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">Change Gateway URL</div>
            <div class="exec-approval-sub">This will reconnect to a different gateway server</div>
          </div>
        </div>
        <div class="exec-approval-command mono">${t}</div>
        <div class="callout danger" style="margin-top: 12px;">
          Only confirm if you trust this URL. Malicious URLs can compromise your system.
        </div>
        <div class="exec-approval-actions">
          <button
            class="btn primary"
            @click=${()=>e.handleGatewayUrlConfirm()}
          >
            Confirm
          </button>
          <button
            class="btn"
            @click=${()=>e.handleGatewayUrlCancel()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  `:k}function Ex(e){const t=e.trim();if(t==="")return null;const n=Number(t);return Number.isFinite(n)?n:null}function Rx(e){const t=e.host.adminData;let n="";return f`
    <div class="admin-login">
      <h2 class="admin-login__title">数据管理 — 登录</h2>
      <input
        type="password"
        class="admin-input"
        placeholder="管理员密码"
        @input=${i=>{n=i.target.value}}
        @keydown=${i=>{i.key==="Enter"&&e.onLogin(n)}}
      />
      ${t.loginError?f`<p class="admin-err">${t.loginError}</p>`:k}
      <button
        class="admin-btn admin-btn--primary"
        ?disabled=${t.loginLoading}
        @click=${()=>e.onLogin(n)}
      >
        ${t.loginLoading?"登录中…":"登录"}
      </button>
    </div>
  `}function vf(e,t,n){return f`
    <label class="admin-upload">
      <input
        type="file"
        accept=".xlsx"
        ?disabled=${t}
        @change=${i=>{var o;const s=(o=i.target.files)==null?void 0:o[0];s&&n(s),i.target.value=""}}
      />
      <span>${t?"上传中…":e}</span>
    </label>
  `}function Px(e){const t=e.host.adminData;return t.token?f`
    <section class="admin-panel">
      <div class="admin-toolbar">
        <h2 class="admin-title">数据管理</h2>
        <button class="admin-btn admin-btn--ghost" type="button" @click=${e.onLogout}>退出登录</button>
      </div>
      <div class="admin-subtabs" role="tablist">
        <button
          type="button"
          class="admin-subtab ${t.activeSubTab==="price"?"is-active":""}"
          @click=${()=>e.onSubTab("price")}
        >
          万鼎价格库
        </button>
        <button
          type="button"
          class="admin-subtab ${t.activeSubTab==="mapping"?"is-active":""}"
          @click=${()=>e.onSubTab("mapping")}
        >
          产品映射表
        </button>
      </div>
      ${t.activeSubTab==="price"?Mx(e):Dx(e)}
    </section>
  `:f`<section class="admin-panel">${Rx(e)}</section>`}function Mx(e){const t=e.host.adminData;return f`
    <div class="admin-block">
      <div class="admin-row">
        <input
          type="search"
          class="admin-input admin-input--grow"
          placeholder="搜索料号 / 描述"
          .value=${t.priceQuery}
          @input=${n=>e.onPriceQueryInput(n.target.value)}
        />
        <button type="button" class="admin-btn" @click=${e.onPriceQueryApply}>应用筛选</button>
        <button type="button" class="admin-btn" @click=${e.onPriceRefresh}>刷新</button>
        ${vf("上传 Excel（全表替换）",t.priceUploading,e.onPriceUpload)}
        <button type="button" class="admin-btn admin-btn--primary" @click=${e.onPriceAddRow}>+ 新增一行</button>
      </div>
      ${t.priceError?f`<p class="admin-err">${t.priceError}</p>`:k}
      ${t.priceLoading?f`<p class="admin-muted">加载中…</p>`:k}
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>料号</th>
              <th>描述</th>
              <th>A</th>
              <th>B</th>
              <th>C</th>
              <th>D</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${t.priceItems.map((n,i)=>f`
                <tr>
                  <td>
                    <input
                      class="admin-cell"
                      .value=${n.material}
                      @input=${s=>e.onPriceFieldChange(i,{material:s.target.value})}
                    />
                  </td>
                  <td>
                    <input
                      class="admin-cell"
                      .value=${n.description}
                      @input=${s=>e.onPriceFieldChange(i,{description:s.target.value})}
                    />
                  </td>
                  ${["price_a","price_b","price_c","price_d"].map(s=>f`
                      <td>
                        <input
                          class="admin-cell admin-cell--num"
                          .value=${n[s]??""}
                          @input=${o=>e.onPriceFieldChange(i,{[s]:Ex(o.target.value)})}
                        />
                      </td>
                    `)}
                  <td class="admin-actions">
                    <button type="button" class="admin-btn admin-btn--sm" @click=${()=>e.onPriceSave(i)}>
                      保存
                    </button>
                    ${n.id!=null?f`<button
                          type="button"
                          class="admin-btn admin-btn--sm admin-btn--danger"
                          @click=${()=>{confirm("确认删除此行？")&&e.onPriceDelete(n.id)}}
                        >
                          删除
                        </button>`:k}
                  </td>
                </tr>
              `)}
          </tbody>
        </table>
      </div>
      <p class="admin-muted">共 ${t.priceTotal} 行（当前页 ${t.priceItems.length} 条）</p>
    </div>
  `}function Dx(e){const t=e.host.adminData;return f`
    <div class="admin-block">
      <div class="admin-row">
        <input
          type="search"
          class="admin-input admin-input--grow"
          placeholder="搜索询价名称 / 编号 / 报价名"
          .value=${t.mappingQuery}
          @input=${n=>e.onMappingQueryInput(n.target.value)}
        />
        <button type="button" class="admin-btn" @click=${e.onMappingQueryApply}>应用筛选</button>
        <button type="button" class="admin-btn" @click=${e.onMappingRefresh}>刷新</button>
        ${vf("上传 Excel（全表替换）",t.mappingUploading,e.onMappingUpload)}
        <button type="button" class="admin-btn admin-btn--primary" @click=${e.onMappingAddRow}>+ 新增一行</button>
      </div>
      ${t.mappingError?f`<p class="admin-err">${t.mappingError}</p>`:k}
      ${t.mappingLoading?f`<p class="admin-muted">加载中…</p>`:k}
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>询价名称</th>
              <th>规格</th>
              <th>产品编号</th>
              <th>报价名称</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${t.mappingItems.map((n,i)=>f`
                <tr>
                  <td>
                    <input
                      class="admin-cell"
                      .value=${n.inquiry_name}
                      @input=${s=>e.onMappingFieldChange(i,{inquiry_name:s.target.value})}
                    />
                  </td>
                  <td>
                    <input
                      class="admin-cell"
                      .value=${n.spec}
                      @input=${s=>e.onMappingFieldChange(i,{spec:s.target.value})}
                    />
                  </td>
                  <td>
                    <input
                      class="admin-cell"
                      .value=${n.product_code}
                      @input=${s=>e.onMappingFieldChange(i,{product_code:s.target.value})}
                    />
                  </td>
                  <td>
                    <input
                      class="admin-cell"
                      .value=${n.quotation_name}
                      @input=${s=>e.onMappingFieldChange(i,{quotation_name:s.target.value})}
                    />
                  </td>
                  <td class="admin-actions">
                    <button type="button" class="admin-btn admin-btn--sm" @click=${()=>e.onMappingSave(i)}>
                      保存
                    </button>
                    ${n.id!=null?f`<button
                          type="button"
                          class="admin-btn admin-btn--sm admin-btn--danger"
                          @click=${()=>{confirm("确认删除此行？")&&e.onMappingDelete(n.id)}}
                        >
                          删除
                        </button>`:k}
                  </td>
                </tr>
              `)}
          </tbody>
        </table>
      </div>
      <p class="admin-muted">共 ${t.mappingTotal} 行（当前页 ${t.mappingItems.length} 条）</p>
    </div>
  `}const ad=["trace","debug","info","warn","error","fatal"];function Lx(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleTimeString()}function Ix(e,t){return t?[e.message,e.subsystem,e.raw].filter(Boolean).join(" ").toLowerCase().includes(t):!0}function Ox(e){const t=e.filterText.trim().toLowerCase(),n=ad.some(o=>!e.levelFilters[o]),i=e.entries.filter(o=>o.level&&!e.levelFilters[o.level]?!1:Ix(o,t)),s=t||n?"filtered":"visible";return f`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Logs</div>
          <div class="card-sub">Gateway file logs (JSONL).</div>
        </div>
        <div class="row" style="gap: 8px;">
          <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"Loading…":"Refresh"}
          </button>
          <button
            class="btn"
            ?disabled=${i.length===0}
            @click=${()=>e.onExport(i.map(o=>o.raw),s)}
          >
            Export ${s}
          </button>
        </div>
      </div>

      <div class="filters" style="margin-top: 14px;">
        <label class="field" style="min-width: 220px;">
          <span>Filter</span>
          <input
            .value=${e.filterText}
            @input=${o=>e.onFilterTextChange(o.target.value)}
            placeholder="Search logs"
          />
        </label>
        <label class="field checkbox">
          <span>Auto-follow</span>
          <input
            type="checkbox"
            .checked=${e.autoFollow}
            @change=${o=>e.onToggleAutoFollow(o.target.checked)}
          />
        </label>
      </div>

      <div class="chip-row" style="margin-top: 12px;">
        ${ad.map(o=>f`
            <label class="chip log-chip ${o}">
              <input
                type="checkbox"
                .checked=${e.levelFilters[o]}
                @change=${r=>e.onLevelToggle(o,r.target.checked)}
              />
              <span>${o}</span>
            </label>
          `)}
      </div>

      ${e.file?f`<div class="muted" style="margin-top: 10px;">File: ${e.file}</div>`:k}
      ${e.truncated?f`
              <div class="callout" style="margin-top: 10px">Log output truncated; showing latest chunk.</div>
            `:k}
      ${e.error?f`<div class="callout danger" style="margin-top: 10px;">${e.error}</div>`:k}

      <div class="log-stream" style="margin-top: 12px;" @scroll=${e.onScroll}>
        ${i.length===0?f`
                <div class="muted" style="padding: 12px">No log entries.</div>
              `:i.map(o=>f`
                <div class="log-row">
                  <div class="log-time mono">${Lx(o.time)}</div>
                  <div class="log-level ${o.level??""}">${o.level??""}</div>
                  <div class="log-subsystem mono">${o.subsystem??""}</div>
                  <div class="log-message mono">${o.message??o.raw}</div>
                </div>
              `)}
      </div>
    </section>
  `}function Fx(e){return f`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">${p("oos.title")}</div>
          <div class="card-sub">${p("oos.subtitle")}</div>
        </div>
        <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
          ${e.loading?p("oos.actions.loading"):p("oos.actions.refresh")}
        </button>
      </div>
      ${e.db==="sqlite"?f`<div
            class="callout"
            style="margin-top: 12px; background: var(--bg-muted, #f5f5f5); color: var(--text-muted, #666);"
          >
            ${p("oos.db.local")}
          </div>`:k}
      ${e.error?f`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:k}
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        ${e.stats?Nx(e.stats):e.loading?k:f`<div class="muted">${p("oos.empty.stats")}</div>`}
      </div>
      <div style="margin-top: 24px;">
        <div class="row" style="justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="card-title" style="font-size: 1rem;">${p("oos.list.title")}</div>
          ${e.onOpenAddForm&&!e.showAddForm?f`<button class="btn btn--primary" ?disabled=${e.loading} @click=${e.onOpenAddForm}>${p("oos.actions.addManual")}</button>`:k}
        </div>
        ${e.showAddForm&&e.onAdd&&e.onCloseAddForm?f`
              <div class="callout" style="margin-bottom: 12px; padding: 12px;">
                <div style="font-weight: 600; margin-bottom: 8px;">${p("oos.addForm.title")}</div>
                <form @submit=${async t=>{var o,r,a,l,c,d,u;t.preventDefault();const n=t.target,i=((r=(o=n.querySelector('[name="oos_add_name"]'))==null?void 0:o.value)==null?void 0:r.trim())??"";if(!i)return;await e.onAdd({product_name:i,specification:((l=(a=n.querySelector('[name="oos_add_spec"]'))==null?void 0:a.value)==null?void 0:l.trim())??"",quantity:parseFloat(((c=n.querySelector('[name="oos_add_qty"]'))==null?void 0:c.value)??"0")||0,unit:((u=(d=n.querySelector('[name="oos_add_unit"]'))==null?void 0:d.value)==null?void 0:u.trim())??""})&&e.onCloseAddForm()}}>
                  <div class="row" style="gap: 8px; flex-wrap: wrap; align-items: center;">
                    <input
                      name="oos_add_name"
                      type="text"
                      placeholder=${p("oos.addForm.namePlaceholder")}
                      required
                      style="min-width: 140px;"
                    />
                    <input
                      name="oos_add_spec"
                      type="text"
                      placeholder=${p("oos.addForm.specPlaceholder")}
                      style="min-width: 80px;"
                    />
                    <input
                      name="oos_add_qty"
                      type="number"
                      placeholder=${p("oos.addForm.qtyPlaceholder")}
                      min="0"
                      step="1"
                      value="0"
                      style="width: 80px;"
                    />
                    <input
                      name="oos_add_unit"
                      type="text"
                      placeholder=${p("oos.addForm.unitPlaceholder")}
                      style="width: 60px;"
                    />
                    <button type="submit" class="btn btn--primary">
                      ${p("oos.actions.confirm")}
                    </button>
                    <button type="button" class="btn" @click=${e.onCloseAddForm}>
                      ${p("common.cancel")}
                    </button>
                  </div>
                </form>
              </div>
            `:k}
        <div class="list" style="margin-top: 8px;">
          ${e.list.length===0?f`<div class="muted">${p("oos.empty.list")}</div>`:e.list.slice(0,50).map(t=>Bx(t,e.onDelete))}
        </div>
        ${e.list.length>50?f`<div class="muted" style="margin-top: 8px;">
              ${p("oos.list.more",{count:String(e.list.length)})}
            </div>`:k}
      </div>
      <div class="row" style="margin-top: 24px; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">
            ${p("oos.byFile.title")}
          </div>
          <div class="list" style="margin-top: 8px;">
            ${e.byFile.length===0?f`<div class="muted">${p("oos.byFile.empty")}</div>`:e.byFile.slice(0,10).map(t=>zx(t))}
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">
            ${p("oos.byTime.title")}
          </div>
          <div class="list" style="margin-top: 8px;">
            ${e.byTime.length===0?f`<div class="muted">${p("oos.byTime.empty")}</div>`:e.byTime.slice(0,10).map(t=>Hx(t))}
          </div>
        </div>
      </div>
    </section>
  `}function Nx(e){return[{label:p("oos.stats.totalRecords"),value:e.total_records},{label:p("oos.stats.outOfStockCount"),value:e.out_of_stock_count},{label:p("oos.stats.today"),value:e.today_count},{label:p("oos.stats.reportedGe2"),value:e.notified_count},{label:p("oos.stats.emailSentProductCount"),value:e.email_sent_product_count}].map(n=>f`
      <div class="card stat-card" style="min-width: 100px;">
        <div class="stat-value">${n.value}</div>
        <div class="stat-label">${n.label}</div>
      </div>
    `)}function Bx(e,t){const n=e.product_name??"",i=e.specification??"",s=e.unit??"",o=e.quantity??"",r=e.count??1,a=(e.email_sent_count??0)>0||e.email_status==="sent",l=p(a?"oos.email.sent":"oos.email.notSent"),c=e.product_key??"";return f`
    <div class="list-item" style="display: flex; justify-content: space-between; align-items: center;">
      <div class="list-main">
        <div class="list-title">${n} ${i}</div>
        <div class="list-sub">
          ${p("oos.list.meta",{qty:String(o),unit:s,count:String(r),email:l})}
        </div>
      </div>
      ${t&&c?f`<button
            class="btn"
            style="flex-shrink: 0;"
            title=${p("oos.actions.deleteHint")}
            @click=${()=>t(c)}
          >
            ${p("oos.actions.delete")}
          </button>`:k}
    </div>
  `}function zx(e){const t=e.file_name??"",n=e.total_records??0,i=e.uploaded_at?String(e.uploaded_at).length>19?String(e.uploaded_at).slice(0,10)+" "+String(e.uploaded_at).slice(11,19):String(e.uploaded_at):"";return f`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${t}</div>
        <div class="list-sub">
          ${p("oos.byFile.count",{count:String(n)})}${i?` · ${i}`:""}
        </div>
      </div>
    </div>
  `}function Hx(e){return f`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.date??""}</div>
        <div class="list-sub">
          ${p("oos.byTime.count",{count:String(e.count??0)})}
        </div>
      </div>
    </div>
  `}function Ux(e){return f`
    <section class="card" style="margin-top: 24px;">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">${p("shortage.title")}</div>
          <div class="card-sub">${p("shortage.subtitle")}</div>
        </div>
        <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
          ${e.loading?p("shortage.actions.loading"):p("shortage.actions.refresh")}
        </button>
      </div>
      ${e.db==="sqlite"?f`<div
            class="callout"
            style="margin-top: 12px; background: var(--bg-muted, #f5f5f5); color: var(--text-muted, #666);"
          >
            ${p("shortage.db.local")}
          </div>`:k}
      ${e.error?f`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:k}
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        ${e.stats?qx(e.stats):e.loading?k:f`<div class="muted">${p("shortage.empty.stats")}</div>`}
      </div>
      <div style="margin-top: 24px;">
        <div class="row" style="justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="card-title" style="font-size: 1rem;">${p("shortage.list.title")}</div>
          ${e.onOpenAddForm&&!e.showAddForm?f`<button class="btn btn--primary" ?disabled=${e.loading} @click=${e.onOpenAddForm}>${p("shortage.actions.addManual")}</button>`:k}
        </div>
        ${e.showAddForm&&e.onAdd&&e.onCloseAddForm?f`
              <div class="callout" style="margin-bottom: 12px; padding: 12px;">
                <div style="font-weight: 600; margin-bottom: 8px;">
                  ${p("shortage.addForm.title")}
                </div>
                <form @submit=${async t=>{var a,l,c,d,u,h;t.preventDefault();const n=t.target,i=((l=(a=n.querySelector('[name="shortage_add_name"]'))==null?void 0:a.value)==null?void 0:l.trim())??"";if(!i)return;const s=parseFloat(((c=n.querySelector('[name="shortage_add_qty"]'))==null?void 0:c.value)??"0")||0,o=parseFloat(((d=n.querySelector('[name="shortage_add_avail"]'))==null?void 0:d.value)??"0")||0;await e.onAdd({product_name:i,specification:((h=(u=n.querySelector('[name="shortage_add_spec"]'))==null?void 0:u.value)==null?void 0:h.trim())??"",quantity:s,available_qty:o})&&e.onCloseAddForm()}}>
                  <div class="row" style="gap: 8px; flex-wrap: wrap; align-items: center;">
                    <input
                      name="shortage_add_name"
                      type="text"
                      placeholder=${p("shortage.addForm.namePlaceholder")}
                      required
                      style="min-width: 140px;"
                    />
                    <input
                      name="shortage_add_spec"
                      type="text"
                      placeholder=${p("shortage.addForm.specPlaceholder")}
                      style="min-width: 80px;"
                    />
                    <input
                      name="shortage_add_qty"
                      type="number"
                      placeholder=${p("shortage.addForm.qtyPlaceholder")}
                      min="0"
                      step="1"
                      value="0"
                      style="width: 80px;"
                      title=${p("shortage.addForm.qtyTitle")}
                    />
                    <input
                      name="shortage_add_avail"
                      type="number"
                      placeholder=${p("shortage.addForm.availPlaceholder")}
                      min="0"
                      step="1"
                      value="0"
                      style="width: 80px;"
                      title=${p("shortage.addForm.availTitle")}
                    />
                    <span
                      class="muted"
                      style="font-size: 0.9rem;"
                      title=${p("shortage.addForm.diffTitle")}
                    >
                      ${p("shortage.addForm.diffText")}
                    </span>
                    <button type="submit" class="btn btn--primary">
                      ${p("shortage.actions.confirm")}
                    </button>
                    <button type="button" class="btn" @click=${e.onCloseAddForm}>
                      ${p("common.cancel")}
                    </button>
                  </div>
                </form>
              </div>
            `:k}
        <div class="list" style="margin-top: 8px;">
          ${e.list.length===0?f`<div class="muted">${p("shortage.empty.list")}</div>`:e.list.slice(0,50).map(t=>jx(t,e.onDelete))}
        </div>
        ${e.list.length>50?f`<div class="muted" style="margin-top: 8px;">
              ${p("shortage.list.more",{count:String(e.list.length)})}
            </div>`:k}
      </div>
      <div class="row" style="margin-top: 24px; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">
            ${p("shortage.byFile.title")}
          </div>
          <div class="list" style="margin-top: 8px;">
            ${e.byFile.length===0?f`<div class="muted">${p("shortage.byFile.empty")}</div>`:e.byFile.slice(0,10).map(t=>Kx(t))}
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">
            ${p("shortage.byTime.title")}
          </div>
          <div class="list" style="margin-top: 8px;">
            ${e.byTime.length===0?f`<div class="muted">${p("shortage.byTime.empty")}</div>`:e.byTime.slice(0,10).map(t=>Wx(t))}
          </div>
        </div>
      </div>
    </section>
  `}function qx(e){return[{label:p("shortage.stats.totalRecords"),value:e.total_records},{label:p("shortage.stats.shortageProductCount"),value:e.shortage_product_count},{label:p("shortage.stats.today"),value:e.today_count},{label:p("shortage.stats.reportedGe2"),value:e.reported_ge2_count}].map(n=>f`
      <div class="card stat-card" style="min-width: 100px;">
        <div class="stat-value">${n.value}</div>
        <div class="stat-label">${n.label}</div>
      </div>
    `)}function jx(e,t){const n=e.product_name??"",i=e.specification??"",s=e.quantity??0,o=e.available_qty??0,r=e.shortfall??0,a=e.count??1,l=e.product_key??"";return f`
    <div class="list-item" style="display: flex; justify-content: space-between; align-items: center;">
      <div class="list-main">
        <div class="list-title">${n} ${i?` · ${i}`:""}</div>
        <div class="list-sub">
          ${p("shortage.list.meta",{qty:String(s),avail:String(o),diff:String(r),count:String(a)})}
        </div>
      </div>
      ${t&&l?f`<button
            class="btn"
            style="flex-shrink: 0;"
            title=${p("shortage.actions.deleteHint")}
            @click=${()=>t(l)}
          >
            ${p("shortage.actions.delete")}
          </button>`:k}
    </div>
  `}function Kx(e){const t=e.file_name??"",n=e.total_records??0,i=e.uploaded_at?String(e.uploaded_at).length>19?String(e.uploaded_at).slice(0,10)+" "+String(e.uploaded_at).slice(11,19):String(e.uploaded_at):"";return f`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${t}</div>
        <div class="list-sub">
          ${p("shortage.byFile.count",{count:String(n)})}${i?` · ${i}`:""}
        </div>
      </div>
    </div>
  `}function Wx(e){return f`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.date??""}</div>
        <div class="list-sub">
          ${p("shortage.byTime.count",{count:String(e.count??0)})}
        </div>
      </div>
    </div>
  `}const Ot="__defaults__",ld=[{value:"deny",label:"Deny"},{value:"allowlist",label:"Allowlist"},{value:"full",label:"Full"}],Vx=[{value:"off",label:"Off"},{value:"on-miss",label:"On miss"},{value:"always",label:"Always"}];function cd(e){return e==="allowlist"||e==="full"||e==="deny"?e:"deny"}function Gx(e){return e==="always"||e==="off"||e==="on-miss"?e:"on-miss"}function Qx(e){const t=(e==null?void 0:e.defaults)??{};return{security:cd(t.security),ask:Gx(t.ask),askFallback:cd(t.askFallback??"deny"),autoAllowSkills:!!(t.autoAllowSkills??!1)}}function Yx(e){const t=(e==null?void 0:e.agents)??{},n=Array.isArray(t.list)?t.list:[],i=[];return n.forEach(s=>{if(!s||typeof s!="object")return;const o=s,r=typeof o.id=="string"?o.id.trim():"";if(!r)return;const a=typeof o.name=="string"?o.name.trim():void 0,l=o.default===!0;i.push({id:r,name:a||void 0,isDefault:l})}),i}function Xx(e,t){const n=Yx(e),i=Object.keys((t==null?void 0:t.agents)??{}),s=new Map;n.forEach(r=>s.set(r.id,r)),i.forEach(r=>{s.has(r)||s.set(r,{id:r})});const o=Array.from(s.values());return o.length===0&&o.push({id:"main",isDefault:!0}),o.sort((r,a)=>{var d,u;if(r.isDefault&&!a.isDefault)return-1;if(!r.isDefault&&a.isDefault)return 1;const l=(d=r.name)!=null&&d.trim()?r.name:r.id,c=(u=a.name)!=null&&u.trim()?a.name:a.id;return l.localeCompare(c)}),o}function Jx(e,t){return e===Ot?Ot:e&&t.some(n=>n.id===e)?e:Ot}function Zx(e){var u;const t=e.execApprovalsForm??((u=e.execApprovalsSnapshot)==null?void 0:u.file)??null,n=!!t,i=Qx(t),s=Xx(e.configForm,t),o=r_(e.nodes),r=e.execApprovalsTarget;let a=r==="node"&&e.execApprovalsTargetNodeId?e.execApprovalsTargetNodeId:null;r==="node"&&a&&!o.some(h=>h.id===a)&&(a=null);const l=Jx(e.execApprovalsSelectedAgent,s),c=l!==Ot?((t==null?void 0:t.agents)??{})[l]??null:null,d=Array.isArray(c==null?void 0:c.allowlist)?c.allowlist??[]:[];return{ready:n,disabled:e.execApprovalsSaving||e.execApprovalsLoading,dirty:e.execApprovalsDirty,loading:e.execApprovalsLoading,saving:e.execApprovalsSaving,form:t,defaults:i,selectedScope:l,selectedAgent:c,agents:s,allowlist:d,target:r,targetNodeId:a,targetNodes:o,onSelectScope:e.onExecApprovalsSelectAgent,onSelectTarget:e.onExecApprovalsTargetChange,onPatch:e.onExecApprovalsPatch,onRemove:e.onExecApprovalsRemove,onLoad:e.onLoadExecApprovals,onSave:e.onSaveExecApprovals}}function e_(e){const t=e.ready,n=e.target!=="node"||!!e.targetNodeId;return f`
    <section class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <div>
          <div class="card-title">Exec approvals</div>
          <div class="card-sub">
            Allowlist and approval policy for <span class="mono">exec host=gateway/node</span>.
          </div>
        </div>
        <button
          class="btn"
          ?disabled=${e.disabled||!e.dirty||!n}
          @click=${e.onSave}
        >
          ${e.saving?"Saving…":"Save"}
        </button>
      </div>

      ${t_(e)}

      ${t?f`
            ${n_(e)}
            ${i_(e)}
            ${e.selectedScope===Ot?k:s_(e)}
          `:f`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load exec approvals to edit allowlists.</div>
            <button class="btn" ?disabled=${e.loading||!n} @click=${e.onLoad}>
              ${e.loading?"Loading…":"Load approvals"}
            </button>
          </div>`}
    </section>
  `}function t_(e){const t=e.targetNodes.length>0,n=e.targetNodeId??"";return f`
    <div class="list" style="margin-top: 12px;">
      <div class="list-item">
        <div class="list-main">
          <div class="list-title">Target</div>
          <div class="list-sub">
            Gateway edits local approvals; node edits the selected node.
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>Host</span>
            <select
              ?disabled=${e.disabled}
              @change=${i=>{var r;if(i.target.value==="node"){const a=((r=e.targetNodes[0])==null?void 0:r.id)??null;e.onSelectTarget("node",n||a)}else e.onSelectTarget("gateway",null)}}
            >
              <option value="gateway" ?selected=${e.target==="gateway"}>Gateway</option>
              <option value="node" ?selected=${e.target==="node"}>Node</option>
            </select>
          </label>
          ${e.target==="node"?f`
                <label class="field">
                  <span>Node</span>
                  <select
                    ?disabled=${e.disabled||!t}
                    @change=${i=>{const o=i.target.value.trim();e.onSelectTarget("node",o||null)}}
                  >
                    <option value="" ?selected=${n===""}>Select node</option>
                    ${e.targetNodes.map(i=>f`<option
                          value=${i.id}
                          ?selected=${n===i.id}
                        >
                          ${i.label}
                        </option>`)}
                  </select>
                </label>
              `:k}
        </div>
      </div>
      ${e.target==="node"&&!t?f`
              <div class="muted">No nodes advertise exec approvals yet.</div>
            `:k}
    </div>
  `}function n_(e){return f`
    <div class="row" style="margin-top: 12px; gap: 8px; flex-wrap: wrap;">
      <span class="label">Scope</span>
      <div class="row" style="gap: 8px; flex-wrap: wrap;">
        <button
          class="btn btn--sm ${e.selectedScope===Ot?"active":""}"
          @click=${()=>e.onSelectScope(Ot)}
        >
          Defaults
        </button>
        ${e.agents.map(t=>{var i;const n=(i=t.name)!=null&&i.trim()?`${t.name} (${t.id})`:t.id;return f`
            <button
              class="btn btn--sm ${e.selectedScope===t.id?"active":""}"
              @click=${()=>e.onSelectScope(t.id)}
            >
              ${n}
            </button>
          `})}
      </div>
    </div>
  `}function i_(e){const t=e.selectedScope===Ot,n=e.defaults,i=e.selectedAgent??{},s=t?["defaults"]:["agents",e.selectedScope],o=typeof i.security=="string"?i.security:void 0,r=typeof i.ask=="string"?i.ask:void 0,a=typeof i.askFallback=="string"?i.askFallback:void 0,l=t?n.security:o??"__default__",c=t?n.ask:r??"__default__",d=t?n.askFallback:a??"__default__",u=typeof i.autoAllowSkills=="boolean"?i.autoAllowSkills:void 0,h=u??n.autoAllowSkills,g=u==null;return f`
    <div class="list" style="margin-top: 16px;">
      <div class="list-item">
        <div class="list-main">
          <div class="list-title">Security</div>
          <div class="list-sub">
            ${t?"Default security mode.":`Default: ${n.security}.`}
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>Mode</span>
            <select
              ?disabled=${e.disabled}
              @change=${m=>{const _=m.target.value;!t&&_==="__default__"?e.onRemove([...s,"security"]):e.onPatch([...s,"security"],_)}}
            >
              ${t?k:f`<option value="__default__" ?selected=${l==="__default__"}>
                    Use default (${n.security})
                  </option>`}
              ${ld.map(m=>f`<option
                    value=${m.value}
                    ?selected=${l===m.value}
                  >
                    ${m.label}
                  </option>`)}
            </select>
          </label>
        </div>
      </div>

      <div class="list-item">
        <div class="list-main">
          <div class="list-title">Ask</div>
          <div class="list-sub">
            ${t?"Default prompt policy.":`Default: ${n.ask}.`}
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>Mode</span>
            <select
              ?disabled=${e.disabled}
              @change=${m=>{const _=m.target.value;!t&&_==="__default__"?e.onRemove([...s,"ask"]):e.onPatch([...s,"ask"],_)}}
            >
              ${t?k:f`<option value="__default__" ?selected=${c==="__default__"}>
                    Use default (${n.ask})
                  </option>`}
              ${Vx.map(m=>f`<option
                    value=${m.value}
                    ?selected=${c===m.value}
                  >
                    ${m.label}
                  </option>`)}
            </select>
          </label>
        </div>
      </div>

      <div class="list-item">
        <div class="list-main">
          <div class="list-title">Ask fallback</div>
          <div class="list-sub">
            ${t?"Applied when the UI prompt is unavailable.":`Default: ${n.askFallback}.`}
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>Fallback</span>
            <select
              ?disabled=${e.disabled}
              @change=${m=>{const _=m.target.value;!t&&_==="__default__"?e.onRemove([...s,"askFallback"]):e.onPatch([...s,"askFallback"],_)}}
            >
              ${t?k:f`<option value="__default__" ?selected=${d==="__default__"}>
                    Use default (${n.askFallback})
                  </option>`}
              ${ld.map(m=>f`<option
                    value=${m.value}
                    ?selected=${d===m.value}
                  >
                    ${m.label}
                  </option>`)}
            </select>
          </label>
        </div>
      </div>

      <div class="list-item">
        <div class="list-main">
          <div class="list-title">Auto-allow skill CLIs</div>
          <div class="list-sub">
            ${t?"Allow skill executables listed by the Gateway.":g?`Using default (${n.autoAllowSkills?"on":"off"}).`:`Override (${h?"on":"off"}).`}
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>Enabled</span>
            <input
              type="checkbox"
              ?disabled=${e.disabled}
              .checked=${h}
              @change=${m=>{const y=m.target;e.onPatch([...s,"autoAllowSkills"],y.checked)}}
            />
          </label>
          ${!t&&!g?f`<button
                class="btn btn--sm"
                ?disabled=${e.disabled}
                @click=${()=>e.onRemove([...s,"autoAllowSkills"])}
              >
                Use default
              </button>`:k}
        </div>
      </div>
    </div>
  `}function s_(e){const t=["agents",e.selectedScope,"allowlist"],n=e.allowlist;return f`
    <div class="row" style="margin-top: 18px; justify-content: space-between;">
      <div>
        <div class="card-title">Allowlist</div>
        <div class="card-sub">Case-insensitive glob patterns.</div>
      </div>
      <button
        class="btn btn--sm"
        ?disabled=${e.disabled}
        @click=${()=>{const i=[...n,{pattern:""}];e.onPatch(t,i)}}
      >
        Add pattern
      </button>
    </div>
    <div class="list" style="margin-top: 12px;">
      ${n.length===0?f`
              <div class="muted">No allowlist entries yet.</div>
            `:n.map((i,s)=>o_(e,i,s))}
    </div>
  `}function o_(e,t,n){var r;const i=t.lastUsedAt?Gi(t.lastUsedAt):"never",s=t.lastUsedCommand?Fr(t.lastUsedCommand,120):null,o=t.lastResolvedPath?Fr(t.lastResolvedPath,120):null;return f`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${(r=t.pattern)!=null&&r.trim()?t.pattern:"New pattern"}</div>
        <div class="list-sub">Last used: ${i}</div>
        ${s?f`<div class="list-sub mono">${s}</div>`:k}
        ${o?f`<div class="list-sub mono">${o}</div>`:k}
      </div>
      <div class="list-meta">
        <label class="field">
          <span>Pattern</span>
          <input
            type="text"
            .value=${t.pattern??""}
            ?disabled=${e.disabled}
            @input=${a=>{const l=a.target;e.onPatch(["agents",e.selectedScope,"allowlist",n,"pattern"],l.value)}}
          />
        </label>
        <button
          class="btn btn--sm danger"
          ?disabled=${e.disabled}
          @click=${()=>{if(e.allowlist.length<=1){e.onRemove(["agents",e.selectedScope,"allowlist"]);return}e.onRemove(["agents",e.selectedScope,"allowlist",n])}}
        >
          Remove
        </button>
      </div>
    </div>
  `}function r_(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(a=>String(a)==="system.execApprovals.get"||String(a)==="system.execApprovals.set"))continue;const o=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!o)continue;const r=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():o;t.push({id:o,label:r===o?o:`${r} · ${o}`})}return t.sort((n,i)=>n.label.localeCompare(i.label)),t}function a_(e){const t=h_(e),n=Zx(e);return f`
    ${e_(n)}
    ${f_(t)}
    ${l_(e)}
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Nodes</div>
          <div class="card-sub">Paired devices and live links.</div>
        </div>
        <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
          ${e.loading?"Loading…":"Refresh"}
        </button>
      </div>
      <div class="list" style="margin-top: 16px;">
        ${e.nodes.length===0?f`
                <div class="muted">No nodes found.</div>
              `:e.nodes.map(i=>y_(i))}
      </div>
    </section>
  `}function l_(e){const t=e.devicesList??{pending:[],paired:[]},n=Array.isArray(t.pending)?t.pending:[],i=Array.isArray(t.paired)?t.paired:[];return f`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Devices</div>
          <div class="card-sub">Pairing requests + role tokens.</div>
        </div>
        <button class="btn" ?disabled=${e.devicesLoading} @click=${e.onDevicesRefresh}>
          ${e.devicesLoading?"Loading…":"Refresh"}
        </button>
      </div>
      ${e.devicesError?f`<div class="callout danger" style="margin-top: 12px;">${e.devicesError}</div>`:k}
      <div class="list" style="margin-top: 16px;">
        ${n.length>0?f`
              <div class="muted" style="margin-bottom: 8px;">Pending</div>
              ${n.map(s=>c_(s,e))}
            `:k}
        ${i.length>0?f`
              <div class="muted" style="margin-top: 12px; margin-bottom: 8px;">Paired</div>
              ${i.map(s=>d_(s,e))}
            `:k}
        ${n.length===0&&i.length===0?f`
                <div class="muted">No paired devices.</div>
              `:k}
      </div>
    </section>
  `}function c_(e,t){var a,l;const n=((a=e.displayName)==null?void 0:a.trim())||e.deviceId,i=typeof e.ts=="number"?Gi(e.ts):"n/a",s=(l=e.role)!=null&&l.trim()?`role: ${e.role}`:"role: -",o=e.isRepair?" · repair":"",r=e.remoteIp?` · ${e.remoteIp}`:"";return f`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${n}</div>
        <div class="list-sub">${e.deviceId}${r}</div>
        <div class="muted" style="margin-top: 6px;">
          ${s} · requested ${i}${o}
        </div>
      </div>
      <div class="list-meta">
        <div class="row" style="justify-content: flex-end; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn--sm primary" @click=${()=>t.onDeviceApprove(e.requestId)}>
            Approve
          </button>
          <button class="btn btn--sm" @click=${()=>t.onDeviceReject(e.requestId)}>
            Reject
          </button>
        </div>
      </div>
    </div>
  `}function d_(e,t){var a;const n=((a=e.displayName)==null?void 0:a.trim())||e.deviceId,i=e.remoteIp?` · ${e.remoteIp}`:"",s=`roles: ${Or(e.roles)}`,o=`scopes: ${Or(e.scopes)}`,r=Array.isArray(e.tokens)?e.tokens:[];return f`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${n}</div>
        <div class="list-sub">${e.deviceId}${i}</div>
        <div class="muted" style="margin-top: 6px;">${s} · ${o}</div>
        ${r.length===0?f`
                <div class="muted" style="margin-top: 6px">Tokens: none</div>
              `:f`
              <div class="muted" style="margin-top: 10px;">Tokens</div>
              <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 6px;">
                ${r.map(l=>u_(e.deviceId,l,t))}
              </div>
            `}
      </div>
    </div>
  `}function u_(e,t,n){const i=t.revokedAtMs?"revoked":"active",s=`scopes: ${Or(t.scopes)}`,o=Gi(t.rotatedAtMs??t.createdAtMs??t.lastUsedAtMs??null);return f`
    <div class="row" style="justify-content: space-between; gap: 8px;">
      <div class="list-sub">${t.role} · ${i} · ${s} · ${o}</div>
      <div class="row" style="justify-content: flex-end; gap: 6px; flex-wrap: wrap;">
        <button
          class="btn btn--sm"
          @click=${()=>n.onDeviceRotate(e,t.role,t.scopes)}
        >
          Rotate
        </button>
        ${t.revokedAtMs?k:f`
              <button
                class="btn btn--sm danger"
                @click=${()=>n.onDeviceRevoke(e,t.role)}
              >
                Revoke
              </button>
            `}
      </div>
    </div>
  `}function h_(e){const t=e.configForm,n=g_(e.nodes),{defaultBinding:i,agents:s}=m_(t),o=!!t,r=e.configSaving||e.configFormMode==="raw";return{ready:o,disabled:r,configDirty:e.configDirty,configLoading:e.configLoading,configSaving:e.configSaving,defaultBinding:i,agents:s,nodes:n,onBindDefault:e.onBindDefault,onBindAgent:e.onBindAgent,onSave:e.onSaveBindings,onLoadConfig:e.onLoadConfig,formMode:e.configFormMode}}function f_(e){const t=e.nodes.length>0,n=e.defaultBinding??"";return f`
    <section class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <div>
          <div class="card-title">Exec node binding</div>
          <div class="card-sub">
            Pin agents to a specific node when using <span class="mono">exec host=node</span>.
          </div>
        </div>
        <button
          class="btn"
          ?disabled=${e.disabled||!e.configDirty}
          @click=${e.onSave}
        >
          ${e.configSaving?"Saving…":"Save"}
        </button>
      </div>

      ${e.formMode==="raw"?f`
              <div class="callout warn" style="margin-top: 12px">
                Switch the Config tab to <strong>Form</strong> mode to edit bindings here.
              </div>
            `:k}

      ${e.ready?f`
            <div class="list" style="margin-top: 16px;">
              <div class="list-item">
                <div class="list-main">
                  <div class="list-title">Default binding</div>
                  <div class="list-sub">Used when agents do not override a node binding.</div>
                </div>
                <div class="list-meta">
                  <label class="field">
                    <span>Node</span>
                    <select
                      ?disabled=${e.disabled||!t}
                      @change=${i=>{const o=i.target.value.trim();e.onBindDefault(o||null)}}
                    >
                      <option value="" ?selected=${n===""}>Any node</option>
                      ${e.nodes.map(i=>f`<option
                            value=${i.id}
                            ?selected=${n===i.id}
                          >
                            ${i.label}
                          </option>`)}
                    </select>
                  </label>
                  ${t?k:f`
                          <div class="muted">No nodes with system.run available.</div>
                        `}
                </div>
              </div>

              ${e.agents.length===0?f`
                      <div class="muted">No agents found.</div>
                    `:e.agents.map(i=>p_(i,e))}
            </div>
          `:f`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load config to edit bindings.</div>
            <button class="btn" ?disabled=${e.configLoading} @click=${e.onLoadConfig}>
              ${e.configLoading?"Loading…":"Load config"}
            </button>
          </div>`}
    </section>
  `}function p_(e,t){var o;const n=e.binding??"__default__",i=(o=e.name)!=null&&o.trim()?`${e.name} (${e.id})`:e.id,s=t.nodes.length>0;return f`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${i}</div>
        <div class="list-sub">
          ${e.isDefault?"default agent":"agent"} ·
          ${n==="__default__"?`uses default (${t.defaultBinding??"any"})`:`override: ${e.binding}`}
        </div>
      </div>
      <div class="list-meta">
        <label class="field">
          <span>Binding</span>
          <select
            ?disabled=${t.disabled||!s}
            @change=${r=>{const l=r.target.value.trim();t.onBindAgent(e.index,l==="__default__"?null:l)}}
          >
            <option value="__default__" ?selected=${n==="__default__"}>
              Use default
            </option>
            ${t.nodes.map(r=>f`<option
                  value=${r.id}
                  ?selected=${n===r.id}
                >
                  ${r.label}
                </option>`)}
          </select>
        </label>
      </div>
    </div>
  `}function g_(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(a=>String(a)==="system.run"))continue;const o=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!o)continue;const r=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():o;t.push({id:o,label:r===o?o:`${r} · ${o}`})}return t.sort((n,i)=>n.label.localeCompare(i.label)),t}function m_(e){const t={id:"main",name:void 0,index:0,isDefault:!0,binding:null};if(!e||typeof e!="object")return{defaultBinding:null,agents:[t]};const i=(e.tools??{}).exec??{},s=typeof i.node=="string"&&i.node.trim()?i.node.trim():null,o=e.agents??{},r=Array.isArray(o.list)?o.list:[];if(r.length===0)return{defaultBinding:s,agents:[t]};const a=[];return r.forEach((l,c)=>{if(!l||typeof l!="object")return;const d=l,u=typeof d.id=="string"?d.id.trim():"";if(!u)return;const h=typeof d.name=="string"?d.name.trim():void 0,g=d.default===!0,y=(d.tools??{}).exec??{},_=typeof y.node=="string"&&y.node.trim()?y.node.trim():null;a.push({id:u,name:h||void 0,index:c,isDefault:g,binding:_})}),a.length===0&&a.push(t),{defaultBinding:s,agents:a}}function y_(e){const t=!!e.connected,n=!!e.paired,i=typeof e.displayName=="string"&&e.displayName.trim()||(typeof e.nodeId=="string"?e.nodeId:"unknown"),s=Array.isArray(e.caps)?e.caps:[],o=Array.isArray(e.commands)?e.commands:[];return f`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${i}</div>
        <div class="list-sub">
          ${typeof e.nodeId=="string"?e.nodeId:""}
          ${typeof e.remoteIp=="string"?` · ${e.remoteIp}`:""}
          ${typeof e.version=="string"?` · ${e.version}`:""}
        </div>
        <div class="chip-row" style="margin-top: 6px;">
          <span class="chip">${n?"paired":"unpaired"}</span>
          <span class="chip ${t?"chip-ok":"chip-warn"}">
            ${t?"connected":"offline"}
          </span>
          ${s.slice(0,12).map(r=>f`<span class="chip">${String(r)}</span>`)}
          ${o.slice(0,8).map(r=>f`<span class="chip">${String(r)}</span>`)}
        </div>
      </div>
    </div>
  `}function bi(e){return`Rp ${e.toLocaleString("id-ID",{maximumFractionDigits:0})}`}function v_(e){return e==="done"?f`<span style="color: var(--color-success, #22c55e); font-size: 11px; font-weight: 600;">✓ 已分析</span>`:e==="running"||e==="pending"?f`<span style="color: #f59e0b; font-size: 11px; font-weight: 600;">⏳ 分析中</span>`:e==="failed"?f`<span style="color: var(--color-danger, #ef4444); font-size: 11px; font-weight: 600;">✗ 失败</span>`:f`<span style="color: var(--text-muted, #888); font-size: 11px;">—</span>`}function b_(e){if(e.reportDetailLoading)return f`<div class="muted" style="padding:24px;">${p("agents.reports.detailLoading")}</div>`;if(!e.reportDetail)return f`<div class="muted" style="padding:24px;">${p("agents.reports.detailEmpty")}</div>`;const t=e.reportDetail.report_json??{},n=t.total_sales_amount??0,i=t.total_order_count??0,s=t.daily_stats??[],o=t.top_customers??[],r=t.status_stats??[];return f`
    <div style="display:flex;flex-direction:column;gap:16px;padding:16px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:10px;padding:14px 16px;">
          <div
            style="font-size:11px;color:var(--text-muted,#888);margin-bottom:4px;text-transform:uppercase;letter-spacing:.05em;"
          >
            ${p("agents.reports.metricTotal")}
          </div>
          <div style="font-size:18px;font-weight:700;color:var(--text-primary);">${bi(n)}</div>
        </div>
        <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:10px;padding:14px 16px;">
          <div
            style="font-size:11px;color:var(--text-muted,#888);margin-bottom:4px;text-transform:uppercase;letter-spacing:.05em;"
          >
            ${p("agents.reports.metricCount")}
          </div>
          <div style="font-size:18px;font-weight:700;color:var(--text-primary);">${i}</div>
        </div>
      </div>

      ${s.length>0?f`
            <div>
              <div style="font-size:12px;font-weight:600;margin-bottom:8px;color:var(--text-secondary);">
                ${p("agents.reports.tableDaily")}
              </div>
              <table style="width:100%;border-collapse:collapse;font-size:13px;">
                <thead>
                  <tr style="border-bottom:1px solid var(--border);">
                    <th style="text-align:left;padding:6px 8px;color:var(--text-muted);">${p("agents.reports.colDate")}</th>
                    <th style="text-align:right;padding:6px 8px;color:var(--text-muted);">${p("agents.reports.colCount")}</th>
                    <th style="text-align:right;padding:6px 8px;color:var(--text-muted);">${p("agents.reports.colAmount")}</th>
                  </tr>
                </thead>
                <tbody>
                  ${s.map(a=>f`
                      <tr style="border-bottom:1px solid var(--border);">
                        <td style="padding:6px 8px;" class="mono">${a.date}</td>
                        <td style="padding:6px 8px;text-align:right;">${a.order_count}</td>
                        <td style="padding:6px 8px;text-align:right;">${bi(a.sales_amount)}</td>
                      </tr>
                    `)}
                </tbody>
              </table>
            </div>
          `:k}

      ${o.length>0?f`
            <div>
              <div style="font-size:12px;font-weight:600;margin-bottom:8px;color:var(--text-secondary);">
                ${p("agents.reports.tableCustomers")}
              </div>
              <table style="width:100%;border-collapse:collapse;font-size:13px;">
                <thead>
                  <tr style="border-bottom:1px solid var(--border);">
                    <th style="text-align:left;padding:6px 8px;color:var(--text-muted);">${p("agents.reports.colRank")}</th>
                    <th style="text-align:left;padding:6px 8px;color:var(--text-muted);">${p("agents.reports.colCustomer")}</th>
                    <th style="text-align:right;padding:6px 8px;color:var(--text-muted);">${p("agents.reports.colCount")}</th>
                    <th style="text-align:right;padding:6px 8px;color:var(--text-muted);">${p("agents.reports.colAmount")}</th>
                  </tr>
                </thead>
                <tbody>
                  ${o.map((a,l)=>f`
                      <tr style="border-bottom:1px solid var(--border);">
                        <td style="padding:6px 8px;color:var(--text-muted);">${l+1}</td>
                        <td style="padding:6px 8px;">${a.customer_name}</td>
                        <td style="padding:6px 8px;text-align:right;">${a.order_count}</td>
                        <td style="padding:6px 8px;text-align:right;">${bi(a.sales_amount)}</td>
                      </tr>
                    `)}
                </tbody>
              </table>
            </div>
          `:k}

      ${r.length>0?f`
            <div>
              <div style="font-size:12px;font-weight:600;margin-bottom:8px;color:var(--text-secondary);">
                ${p("agents.reports.tableStatus")}
              </div>
              <table style="width:100%;border-collapse:collapse;font-size:13px;">
                <thead>
                  <tr style="border-bottom:1px solid var(--border);">
                    <th style="text-align:left;padding:6px 8px;color:var(--text-muted);">${p("agents.reports.colStatus")}</th>
                    <th style="text-align:right;padding:6px 8px;color:var(--text-muted);">${p("agents.reports.colCount")}</th>
                    <th style="text-align:right;padding:6px 8px;color:var(--text-muted);">${p("agents.reports.colAmount")}</th>
                  </tr>
                </thead>
                <tbody>
                  ${r.map(a=>f`
                      <tr style="border-bottom:1px solid var(--border);">
                        <td style="padding:6px 8px;">${a.status_name}</td>
                        <td style="padding:6px 8px;text-align:right;">${a.count}</td>
                        <td style="padding:6px 8px;text-align:right;">${bi(a.total_amount)}</td>
                      </tr>
                    `)}
                </tbody>
              </table>
            </div>
          `:k}
    </div>
  `}function w_(e){if(e.reportDetailLoading)return f`<div class="muted" style="padding:24px;">${p("agents.reports.detailLoading")}</div>`;if(!e.reportDetail)return f`<div class="muted" style="padding:24px;">${p("agents.reports.detailEmpty")}</div>`;const t=e.reportDetail.analysis_status,n=e.reportDetail.analysis_md;return t==="running"?f`
      <div style="padding:24px;display:flex;flex-direction:column;align-items:center;gap:12px;">
        <div style="font-size:24px;">⏳</div>
        <div style="color:var(--text-muted);">${p("agents.reports.analysisLoading")}</div>
      </div>
    `:t==="pending"?f`
      <div style="padding:24px;display:flex;flex-direction:column;align-items:center;gap:12px;">
        <div style="font-size:24px;">🕐</div>
        <div style="color:var(--text-muted);">${p("agents.reports.analysisPending")}</div>
      </div>
    `:t==="failed"?f`
      <div style="padding:24px;display:flex;flex-direction:column;align-items:center;gap:12px;">
        <div style="color:var(--color-danger,#ef4444);">${p("agents.reports.analysisFailed")}</div>
        <button class="btn btn--sm" @click=${()=>e.onReanalyze(e.reportDetail.id)}>${p("agents.reports.reanalyzeBtn")}</button>
      </div>
    `:n?f`
    <div style="padding:16px;">
      <div class="markdown-body" style="font-size:13px;line-height:1.65;">${Wn(Vn(n))}</div>
    </div>
  `:f`<div class="muted" style="padding:24px;">${p("agents.reports.analysisEmpty")}</div>`}function x_(e){return e.reportsTasks.length===0?k:f`
    <details style="margin-top:8px;">
      <summary style="cursor:pointer;font-size:12px;color:var(--text-muted);padding:8px 0;">任务配置</summary>
      <div style="padding:8px 0;display:flex;flex-direction:column;gap:10px;">
        ${e.reportsTasks.map(t=>{const n=e.reportsEditingTaskId===t.task_key;return f`
            <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:8px;padding:12px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:${n?"10px":"0"};">
                <span style="font-size:13px;font-weight:600;">${t.title}</span>
                ${n?k:f`<button class="btn btn--sm" @click=${()=>e.onEditTask(t)}>编辑</button>`}
              </div>
              ${n?f`
                    <div style="display:flex;flex-direction:column;gap:8px;">
                      <label class="field">
                        <span style="font-size:12px;">${p("agents.reports.cron")}</span>
                        <input
                          .value=${e.reportsEditForm.cron_expr??t.cron_expr}
                          @input=${i=>e.onEditFormChange({...e.reportsEditForm,cron_expr:i.target.value})}
                        />
                      </label>
                      <label class="field">
                        <span style="font-size:12px;">${p("agents.reports.timezone")}</span>
                        <input
                          .value=${e.reportsEditForm.timezone??t.timezone}
                          @input=${i=>e.onEditFormChange({...e.reportsEditForm,timezone:i.target.value})}
                        />
                      </label>
                      <div style="display:flex;align-items:center;gap:8px;">
                        <input
                          type="checkbox"
                          .checked=${e.reportsEditForm.enabled??t.enabled}
                          @change=${i=>e.onEditFormChange({...e.reportsEditForm,enabled:i.target.checked})}
                        />
                        <span style="font-size:12px;">${p("agents.reports.enabled")}</span>
                      </div>
                      <div style="display:flex;gap:8px;margin-top:4px;">
                        <button class="btn btn--sm primary" @click=${()=>e.onSaveEdit(t.task_key)}>保存</button>
                        <button class="btn btn--sm" @click=${e.onCancelEdit}>取消</button>
                      </div>
                    </div>
                  `:f`
                    <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">
                      ${t.cron_expr} · ${t.timezone} · ${t.enabled?"启用":"禁用"}
                    </div>
                  `}
            </div>
          `})}
      </div>
    </details>
  `}function __(e){return f`
    <section class="card" style="padding:0;overflow:hidden;">
      <div style="padding:14px 16px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div style="font-size:15px;font-weight:700;">周报管理</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">销售发票周报 — 数据与 AI 分析</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          <input
            style="width:160px;font-size:12px;padding:4px 8px;"
            .value=${e.reportsAdminToken}
            placeholder="x-reports-token"
            @input=${t=>e.onTokenChange(t.target.value)}
          />
          ${e.reportsTasks.map(t=>f`
              <button class="btn btn--sm primary" ?disabled=${e.reportsLoading} @click=${()=>e.onRun(t.task_key)}>
                立即运行
              </button>
            `)}
          <button class="btn btn--sm" ?disabled=${e.reportsLoading} @click=${e.onRefresh}>
            ${e.reportsLoading?p("common.loading"):p("common.refresh")}
          </button>
        </div>
      </div>

      ${e.reportsError?f`<div class="callout danger" style="margin:8px 12px;">${e.reportsError}</div>`:k}

      <div style="display:grid;grid-template-columns:260px 1fr;min-height:540px;">
        <div style="border-right:1px solid var(--border);display:flex;flex-direction:column;overflow:hidden;">
          <div
            style="font-size:11px;color:var(--text-muted);padding:10px 12px 6px;text-transform:uppercase;letter-spacing:.06em;border-bottom:1px solid var(--border);"
          >
            历史记录
          </div>
          <div style="overflow-y:auto;flex:1;padding:8px;">
            ${e.reportsRecords.length===0?f`<div class="muted" style="font-size:13px;padding:8px;">${p("agents.reports.noRecords")}</div>`:e.reportsRecords.map(t=>{var a;const n=t.id===e.selectedRecordId,i=t.summary_json??{},s=Number(i.total_order_count??0),o=Number(i.total_sales_amount??0),r=((a=t.started_at)==null?void 0:a.slice(0,10))??"—";return f`
                    <button
                      style="
                          width:100%;text-align:left;padding:10px 12px;margin-bottom:6px;
                          border:1px solid ${n?"var(--accent,#6366f1)":"var(--border)"};
                          border-radius:8px;
                          background:${n?"var(--accent-soft,rgba(99,102,241,.08))":"var(--surface-1)"};
                          cursor:pointer;transition:border-color .15s;
                        "
                      @click=${()=>e.onSelectRecord(t.id)}
                    >
                      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px;">
                        <span style="font-size:13px;font-weight:600;" class="mono">${r}</span>
                        ${v_(t.analysis_status)}
                      </div>
                      <div style="font-size:12px;color:var(--text-muted);">${s} 张 · ${bi(o)}</div>
                      ${t.analysis_status==="failed"?f`
                            <button
                              class="btn btn--sm"
                              style="margin-top:6px;font-size:11px;"
                              @click=${l=>{l.stopPropagation(),e.onReanalyze(t.id)}}
                            >
                              ${p("agents.reports.reanalyzeBtn")}
                            </button>
                          `:k}
                    </button>
                  `})}
          </div>

          <div style="padding:8px 12px;border-top:1px solid var(--border);">${x_(e)}</div>
        </div>

        <div style="display:flex;flex-direction:column;overflow:hidden;">
          <div style="display:flex;border-bottom:1px solid var(--border);padding:0 16px;">
            ${["data","analysis"].map(t=>{const n=p(t==="data"?"agents.reports.tabData":"agents.reports.tabAnalysis"),i=e.reportsDetailTab===t;return f`
                <button
                  style="
                      padding:10px 14px;font-size:13px;font-weight:${i?"700":"400"};
                      border:none;background:none;cursor:pointer;
                      border-bottom:2px solid ${i?"var(--accent,#6366f1)":"transparent"};
                      color:${i?"var(--text-primary)":"var(--text-muted)"};
                      margin-right:4px;
                    "
                  @click=${()=>e.onDetailTabChange(t)}
                >
                  ${n}
                </button>
              `})}
          </div>

          <div style="flex:1;overflow-y:auto;">
            ${e.reportsDetailTab==="data"?b_(e):w_(e)}
          </div>
        </div>
      </div>
    </section>
  `}/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */function ts(e){return e+.5|0}const Rt=(e,t,n)=>Math.max(Math.min(e,n),t);function wi(e){return Rt(ts(e*2.55),0,255)}function Ft(e){return Rt(ts(e*255),0,255)}function kt(e){return Rt(ts(e/2.55)/100,0,1)}function dd(e){return Rt(ts(e*100),0,100)}const qe={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},aa=[..."0123456789ABCDEF"],k_=e=>aa[e&15],$_=e=>aa[(e&240)>>4]+aa[e&15],_s=e=>(e&240)>>4===(e&15),S_=e=>_s(e.r)&&_s(e.g)&&_s(e.b)&&_s(e.a);function A_(e){var t=e.length,n;return e[0]==="#"&&(t===4||t===5?n={r:255&qe[e[1]]*17,g:255&qe[e[2]]*17,b:255&qe[e[3]]*17,a:t===5?qe[e[4]]*17:255}:(t===7||t===9)&&(n={r:qe[e[1]]<<4|qe[e[2]],g:qe[e[3]]<<4|qe[e[4]],b:qe[e[5]]<<4|qe[e[6]],a:t===9?qe[e[7]]<<4|qe[e[8]]:255})),n}const T_=(e,t)=>e<255?t(e):"";function C_(e){var t=S_(e)?k_:$_;return e?"#"+t(e.r)+t(e.g)+t(e.b)+T_(e.a,t):void 0}const E_=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function bf(e,t,n){const i=t*Math.min(n,1-n),s=(o,r=(o+e/30)%12)=>n-i*Math.max(Math.min(r-3,9-r,1),-1);return[s(0),s(8),s(4)]}function R_(e,t,n){const i=(s,o=(s+e/60)%6)=>n-n*t*Math.max(Math.min(o,4-o,1),0);return[i(5),i(3),i(1)]}function P_(e,t,n){const i=bf(e,1,.5);let s;for(t+n>1&&(s=1/(t+n),t*=s,n*=s),s=0;s<3;s++)i[s]*=1-t-n,i[s]+=t;return i}function M_(e,t,n,i,s){return e===s?(t-n)/i+(t<n?6:0):t===s?(n-e)/i+2:(e-t)/i+4}function cl(e){const n=e.r/255,i=e.g/255,s=e.b/255,o=Math.max(n,i,s),r=Math.min(n,i,s),a=(o+r)/2;let l,c,d;return o!==r&&(d=o-r,c=a>.5?d/(2-o-r):d/(o+r),l=M_(n,i,s,d,o),l=l*60+.5),[l|0,c||0,a]}function dl(e,t,n,i){return(Array.isArray(t)?e(t[0],t[1],t[2]):e(t,n,i)).map(Ft)}function ul(e,t,n){return dl(bf,e,t,n)}function D_(e,t,n){return dl(P_,e,t,n)}function L_(e,t,n){return dl(R_,e,t,n)}function wf(e){return(e%360+360)%360}function I_(e){const t=E_.exec(e);let n=255,i;if(!t)return;t[5]!==i&&(n=t[6]?wi(+t[5]):Ft(+t[5]));const s=wf(+t[2]),o=+t[3]/100,r=+t[4]/100;return t[1]==="hwb"?i=D_(s,o,r):t[1]==="hsv"?i=L_(s,o,r):i=ul(s,o,r),{r:i[0],g:i[1],b:i[2],a:n}}function O_(e,t){var n=cl(e);n[0]=wf(n[0]+t),n=ul(n),e.r=n[0],e.g=n[1],e.b=n[2]}function F_(e){if(!e)return;const t=cl(e),n=t[0],i=dd(t[1]),s=dd(t[2]);return e.a<255?`hsla(${n}, ${i}%, ${s}%, ${kt(e.a)})`:`hsl(${n}, ${i}%, ${s}%)`}const ud={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},hd={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function N_(){const e={},t=Object.keys(hd),n=Object.keys(ud);let i,s,o,r,a;for(i=0;i<t.length;i++){for(r=a=t[i],s=0;s<n.length;s++)o=n[s],a=a.replace(o,ud[o]);o=parseInt(hd[r],16),e[a]=[o>>16&255,o>>8&255,o&255]}return e}let ks;function B_(e){ks||(ks=N_(),ks.transparent=[0,0,0,0]);const t=ks[e.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}const z_=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function H_(e){const t=z_.exec(e);let n=255,i,s,o;if(t){if(t[7]!==i){const r=+t[7];n=t[8]?wi(r):Rt(r*255,0,255)}return i=+t[1],s=+t[3],o=+t[5],i=255&(t[2]?wi(i):Rt(i,0,255)),s=255&(t[4]?wi(s):Rt(s,0,255)),o=255&(t[6]?wi(o):Rt(o,0,255)),{r:i,g:s,b:o,a:n}}}function U_(e){return e&&(e.a<255?`rgba(${e.r}, ${e.g}, ${e.b}, ${kt(e.a)})`:`rgb(${e.r}, ${e.g}, ${e.b})`)}const _r=e=>e<=.0031308?e*12.92:Math.pow(e,1/2.4)*1.055-.055,Mn=e=>e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4);function q_(e,t,n){const i=Mn(kt(e.r)),s=Mn(kt(e.g)),o=Mn(kt(e.b));return{r:Ft(_r(i+n*(Mn(kt(t.r))-i))),g:Ft(_r(s+n*(Mn(kt(t.g))-s))),b:Ft(_r(o+n*(Mn(kt(t.b))-o))),a:e.a+n*(t.a-e.a)}}function $s(e,t,n){if(e){let i=cl(e);i[t]=Math.max(0,Math.min(i[t]+i[t]*n,t===0?360:1)),i=ul(i),e.r=i[0],e.g=i[1],e.b=i[2]}}function xf(e,t){return e&&Object.assign(t||{},e)}function fd(e){var t={r:0,g:0,b:0,a:255};return Array.isArray(e)?e.length>=3&&(t={r:e[0],g:e[1],b:e[2],a:255},e.length>3&&(t.a=Ft(e[3]))):(t=xf(e,{r:0,g:0,b:0,a:1}),t.a=Ft(t.a)),t}function j_(e){return e.charAt(0)==="r"?H_(e):I_(e)}class Ui{constructor(t){if(t instanceof Ui)return t;const n=typeof t;let i;n==="object"?i=fd(t):n==="string"&&(i=A_(t)||B_(t)||j_(t)),this._rgb=i,this._valid=!!i}get valid(){return this._valid}get rgb(){var t=xf(this._rgb);return t&&(t.a=kt(t.a)),t}set rgb(t){this._rgb=fd(t)}rgbString(){return this._valid?U_(this._rgb):void 0}hexString(){return this._valid?C_(this._rgb):void 0}hslString(){return this._valid?F_(this._rgb):void 0}mix(t,n){if(t){const i=this.rgb,s=t.rgb;let o;const r=n===o?.5:n,a=2*r-1,l=i.a-s.a,c=((a*l===-1?a:(a+l)/(1+a*l))+1)/2;o=1-c,i.r=255&c*i.r+o*s.r+.5,i.g=255&c*i.g+o*s.g+.5,i.b=255&c*i.b+o*s.b+.5,i.a=r*i.a+(1-r)*s.a,this.rgb=i}return this}interpolate(t,n){return t&&(this._rgb=q_(this._rgb,t._rgb,n)),this}clone(){return new Ui(this.rgb)}alpha(t){return this._rgb.a=Ft(t),this}clearer(t){const n=this._rgb;return n.a*=1-t,this}greyscale(){const t=this._rgb,n=ts(t.r*.3+t.g*.59+t.b*.11);return t.r=t.g=t.b=n,this}opaquer(t){const n=this._rgb;return n.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return $s(this._rgb,2,t),this}darken(t){return $s(this._rgb,2,-t),this}saturate(t){return $s(this._rgb,1,t),this}desaturate(t){return $s(this._rgb,1,-t),this}rotate(t){return O_(this._rgb,t),this}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */function wt(){}const K_=(()=>{let e=0;return()=>e++})();function le(e){return e==null}function _e(e){if(Array.isArray&&Array.isArray(e))return!0;const t=Object.prototype.toString.call(e);return t.slice(0,7)==="[object"&&t.slice(-6)==="Array]"}function X(e){return e!==null&&Object.prototype.toString.call(e)==="[object Object]"}function Re(e){return(typeof e=="number"||e instanceof Number)&&isFinite(+e)}function rt(e,t){return Re(e)?e:t}function Y(e,t){return typeof e>"u"?t:e}const W_=(e,t)=>typeof e=="string"&&e.endsWith("%")?parseFloat(e)/100*t:+e;function ce(e,t,n){if(e&&typeof e.call=="function")return e.apply(n,t)}function ie(e,t,n,i){let s,o,r;if(_e(e))for(o=e.length,s=0;s<o;s++)t.call(n,e[s],s);else if(X(e))for(r=Object.keys(e),o=r.length,s=0;s<o;s++)t.call(n,e[r[s]],r[s])}function io(e,t){let n,i,s,o;if(!e||!t||e.length!==t.length)return!1;for(n=0,i=e.length;n<i;++n)if(s=e[n],o=t[n],s.datasetIndex!==o.datasetIndex||s.index!==o.index)return!1;return!0}function so(e){if(_e(e))return e.map(so);if(X(e)){const t=Object.create(null),n=Object.keys(e),i=n.length;let s=0;for(;s<i;++s)t[n[s]]=so(e[n[s]]);return t}return e}function _f(e){return["__proto__","prototype","constructor"].indexOf(e)===-1}function V_(e,t,n,i){if(!_f(e))return;const s=t[e],o=n[e];X(s)&&X(o)?qi(s,o,i):t[e]=so(o)}function qi(e,t,n){const i=_e(t)?t:[t],s=i.length;if(!X(e))return e;n=n||{};const o=n.merger||V_;let r;for(let a=0;a<s;++a){if(r=i[a],!X(r))continue;const l=Object.keys(r);for(let c=0,d=l.length;c<d;++c)o(l[c],e,r,n)}return e}function Ei(e,t){return qi(e,t,{merger:G_})}function G_(e,t,n){if(!_f(e))return;const i=t[e],s=n[e];X(i)&&X(s)?Ei(i,s):Object.prototype.hasOwnProperty.call(t,e)||(t[e]=so(s))}const pd={"":e=>e,x:e=>e.x,y:e=>e.y};function Q_(e){const t=e.split("."),n=[];let i="";for(const s of t)i+=s,i.endsWith("\\")?i=i.slice(0,-1)+".":(n.push(i),i="");return n}function Y_(e){const t=Q_(e);return n=>{for(const i of t){if(i==="")break;n=n&&n[i]}return n}}function oo(e,t){return(pd[t]||(pd[t]=Y_(t)))(e)}function hl(e){return e.charAt(0).toUpperCase()+e.slice(1)}const ro=e=>typeof e<"u",zt=e=>typeof e=="function",gd=(e,t)=>{if(e.size!==t.size)return!1;for(const n of e)if(!t.has(n))return!1;return!0};function X_(e){return e.type==="mouseup"||e.type==="click"||e.type==="contextmenu"}const Ce=Math.PI,et=2*Ce,J_=et+Ce,ao=Number.POSITIVE_INFINITY,Z_=Ce/180,Ze=Ce/2,Xt=Ce/4,md=Ce*2/3,kf=Math.log10,Qn=Math.sign;function Ri(e,t,n){return Math.abs(e-t)<n}function yd(e){const t=Math.round(e);e=Ri(e,t,e/1e3)?t:e;const n=Math.pow(10,Math.floor(kf(e))),i=e/n;return(i<=1?1:i<=2?2:i<=5?5:10)*n}function e1(e){const t=[],n=Math.sqrt(e);let i;for(i=1;i<n;i++)e%i===0&&(t.push(i),t.push(e/i));return n===(n|0)&&t.push(n),t.sort((s,o)=>s-o).pop(),t}function t1(e){return typeof e=="symbol"||typeof e=="object"&&e!==null&&!(Symbol.toPrimitive in e||"toString"in e||"valueOf"in e)}function ji(e){return!t1(e)&&!isNaN(parseFloat(e))&&isFinite(e)}function n1(e,t){const n=Math.round(e);return n-t<=e&&n+t>=e}function i1(e,t,n){let i,s,o;for(i=0,s=e.length;i<s;i++)o=e[i][n],isNaN(o)||(t.min=Math.min(t.min,o),t.max=Math.max(t.max,o))}function an(e){return e*(Ce/180)}function s1(e){return e*(180/Ce)}function vd(e){if(!Re(e))return;let t=1,n=0;for(;Math.round(e*t)/t!==e;)t*=10,n++;return n}function o1(e,t){const n=t.x-e.x,i=t.y-e.y,s=Math.sqrt(n*n+i*i);let o=Math.atan2(i,n);return o<-.5*Ce&&(o+=et),{angle:o,distance:s}}function la(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function r1(e,t){return(e-t+J_)%et-Ce}function ht(e){return(e%et+et)%et}function $f(e,t,n,i){const s=ht(e),o=ht(t),r=ht(n),a=ht(o-s),l=ht(r-s),c=ht(s-o),d=ht(s-r);return s===o||s===r||i&&o===r||a>l&&c<d}function je(e,t,n){return Math.max(t,Math.min(n,e))}function a1(e){return je(e,-32768,32767)}function Fn(e,t,n,i=1e-6){return e>=Math.min(t,n)-i&&e<=Math.max(t,n)+i}function fl(e,t,n){n=n||(r=>e[r]<t);let i=e.length-1,s=0,o;for(;i-s>1;)o=s+i>>1,n(o)?s=o:i=o;return{lo:s,hi:i}}const ln=(e,t,n,i)=>fl(e,n,i?s=>{const o=e[s][t];return o<n||o===n&&e[s+1][t]===n}:s=>e[s][t]<n),l1=(e,t,n)=>fl(e,n,i=>e[i][t]>=n);function c1(e,t,n){let i=0,s=e.length;for(;i<s&&e[i]<t;)i++;for(;s>i&&e[s-1]>n;)s--;return i>0||s<e.length?e.slice(i,s):e}const Sf=["push","pop","shift","splice","unshift"];function d1(e,t){if(e._chartjs){e._chartjs.listeners.push(t);return}Object.defineProperty(e,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),Sf.forEach(n=>{const i="_onData"+hl(n),s=e[n];Object.defineProperty(e,n,{configurable:!0,enumerable:!1,value(...o){const r=s.apply(this,o);return e._chartjs.listeners.forEach(a=>{typeof a[i]=="function"&&a[i](...o)}),r}})})}function bd(e,t){const n=e._chartjs;if(!n)return;const i=n.listeners,s=i.indexOf(t);s!==-1&&i.splice(s,1),!(i.length>0)&&(Sf.forEach(o=>{delete e[o]}),delete e._chartjs)}function u1(e){const t=new Set(e);return t.size===e.length?e:Array.from(t)}const Af=(function(){return typeof window>"u"?function(e){return e()}:window.requestAnimationFrame})();function Tf(e,t){let n=[],i=!1;return function(...s){n=s,i||(i=!0,Af.call(window,()=>{i=!1,e.apply(t,n)}))}}function h1(e,t){let n;return function(...i){return t?(clearTimeout(n),n=setTimeout(e,t,i)):e.apply(this,i),t}}const Cf=e=>e==="start"?"left":e==="end"?"right":"center",Ue=(e,t,n)=>e==="start"?t:e==="end"?n:(t+n)/2,f1=(e,t,n,i)=>e===(i?"left":"right")?n:e==="center"?(t+n)/2:t;function p1(e,t,n){const i=t.length;let s=0,o=i;if(e._sorted){const{iScale:r,vScale:a,_parsed:l}=e,c=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null,d=r.axis,{min:u,max:h,minDefined:g,maxDefined:m}=r.getUserBounds();if(g){if(s=Math.min(ln(l,d,u).lo,n?i:ln(t,d,r.getPixelForValue(u)).lo),c){const y=l.slice(0,s+1).reverse().findIndex(_=>!le(_[a.axis]));s-=Math.max(0,y)}s=je(s,0,i-1)}if(m){let y=Math.max(ln(l,r.axis,h,!0).hi+1,n?0:ln(t,d,r.getPixelForValue(h),!0).hi+1);if(c){const _=l.slice(y-1).findIndex(S=>!le(S[a.axis]));y+=Math.max(0,_)}o=je(y,s,i)-s}else o=i-s}return{start:s,count:o}}function g1(e){const{xScale:t,yScale:n,_scaleRanges:i}=e,s={xmin:t.min,xmax:t.max,ymin:n.min,ymax:n.max};if(!i)return e._scaleRanges=s,!0;const o=i.xmin!==t.min||i.xmax!==t.max||i.ymin!==n.min||i.ymax!==n.max;return Object.assign(i,s),o}const Ss=e=>e===0||e===1,wd=(e,t,n)=>-(Math.pow(2,10*(e-=1))*Math.sin((e-t)*et/n)),xd=(e,t,n)=>Math.pow(2,-10*e)*Math.sin((e-t)*et/n)+1,Pi={linear:e=>e,easeInQuad:e=>e*e,easeOutQuad:e=>-e*(e-2),easeInOutQuad:e=>(e/=.5)<1?.5*e*e:-.5*(--e*(e-2)-1),easeInCubic:e=>e*e*e,easeOutCubic:e=>(e-=1)*e*e+1,easeInOutCubic:e=>(e/=.5)<1?.5*e*e*e:.5*((e-=2)*e*e+2),easeInQuart:e=>e*e*e*e,easeOutQuart:e=>-((e-=1)*e*e*e-1),easeInOutQuart:e=>(e/=.5)<1?.5*e*e*e*e:-.5*((e-=2)*e*e*e-2),easeInQuint:e=>e*e*e*e*e,easeOutQuint:e=>(e-=1)*e*e*e*e+1,easeInOutQuint:e=>(e/=.5)<1?.5*e*e*e*e*e:.5*((e-=2)*e*e*e*e+2),easeInSine:e=>-Math.cos(e*Ze)+1,easeOutSine:e=>Math.sin(e*Ze),easeInOutSine:e=>-.5*(Math.cos(Ce*e)-1),easeInExpo:e=>e===0?0:Math.pow(2,10*(e-1)),easeOutExpo:e=>e===1?1:-Math.pow(2,-10*e)+1,easeInOutExpo:e=>Ss(e)?e:e<.5?.5*Math.pow(2,10*(e*2-1)):.5*(-Math.pow(2,-10*(e*2-1))+2),easeInCirc:e=>e>=1?e:-(Math.sqrt(1-e*e)-1),easeOutCirc:e=>Math.sqrt(1-(e-=1)*e),easeInOutCirc:e=>(e/=.5)<1?-.5*(Math.sqrt(1-e*e)-1):.5*(Math.sqrt(1-(e-=2)*e)+1),easeInElastic:e=>Ss(e)?e:wd(e,.075,.3),easeOutElastic:e=>Ss(e)?e:xd(e,.075,.3),easeInOutElastic(e){return Ss(e)?e:e<.5?.5*wd(e*2,.1125,.45):.5+.5*xd(e*2-1,.1125,.45)},easeInBack(e){return e*e*((1.70158+1)*e-1.70158)},easeOutBack(e){return(e-=1)*e*((1.70158+1)*e+1.70158)+1},easeInOutBack(e){let t=1.70158;return(e/=.5)<1?.5*(e*e*(((t*=1.525)+1)*e-t)):.5*((e-=2)*e*(((t*=1.525)+1)*e+t)+2)},easeInBounce:e=>1-Pi.easeOutBounce(1-e),easeOutBounce(e){return e<1/2.75?7.5625*e*e:e<2/2.75?7.5625*(e-=1.5/2.75)*e+.75:e<2.5/2.75?7.5625*(e-=2.25/2.75)*e+.9375:7.5625*(e-=2.625/2.75)*e+.984375},easeInOutBounce:e=>e<.5?Pi.easeInBounce(e*2)*.5:Pi.easeOutBounce(e*2-1)*.5+.5};function pl(e){if(e&&typeof e=="object"){const t=e.toString();return t==="[object CanvasPattern]"||t==="[object CanvasGradient]"}return!1}function _d(e){return pl(e)?e:new Ui(e)}function kr(e){return pl(e)?e:new Ui(e).saturate(.5).darken(.1).hexString()}const m1=["x","y","borderWidth","radius","tension"],y1=["color","borderColor","backgroundColor"];function v1(e){e.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),e.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>t!=="onProgress"&&t!=="onComplete"&&t!=="fn"}),e.set("animations",{colors:{type:"color",properties:y1},numbers:{type:"number",properties:m1}}),e.describe("animations",{_fallback:"animation"}),e.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>t|0}}}})}function b1(e){e.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const kd=new Map;function w1(e,t){t=t||{};const n=e+JSON.stringify(t);let i=kd.get(n);return i||(i=new Intl.NumberFormat(e,t),kd.set(n,i)),i}function Ef(e,t,n){return w1(t,n).format(e)}const x1={values(e){return _e(e)?e:""+e},numeric(e,t,n){if(e===0)return"0";const i=this.chart.options.locale;let s,o=e;if(n.length>1){const c=Math.max(Math.abs(n[0].value),Math.abs(n[n.length-1].value));(c<1e-4||c>1e15)&&(s="scientific"),o=_1(e,n)}const r=kf(Math.abs(o)),a=isNaN(r)?1:Math.max(Math.min(-1*Math.floor(r),20),0),l={notation:s,minimumFractionDigits:a,maximumFractionDigits:a};return Object.assign(l,this.options.ticks.format),Ef(e,i,l)}};function _1(e,t){let n=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(n)>=1&&e!==Math.floor(e)&&(n=e-Math.floor(e)),n}var Rf={formatters:x1};function k1(e){e.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,n)=>n.lineWidth,tickColor:(t,n)=>n.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:Rf.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),e.route("scale.ticks","color","","color"),e.route("scale.grid","color","","borderColor"),e.route("scale.border","color","","borderColor"),e.route("scale.title","color","","color"),e.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&t!=="callback"&&t!=="parser",_indexable:t=>t!=="borderDash"&&t!=="tickBorderDash"&&t!=="dash"}),e.describe("scales",{_fallback:"scale"}),e.describe("scale.ticks",{_scriptable:t=>t!=="backdropPadding"&&t!=="callback",_indexable:t=>t!=="backdropPadding"})}const _n=Object.create(null),ca=Object.create(null);function Mi(e,t){if(!t)return e;const n=t.split(".");for(let i=0,s=n.length;i<s;++i){const o=n[i];e=e[o]||(e[o]=Object.create(null))}return e}function $r(e,t,n){return typeof t=="string"?qi(Mi(e,t),n):qi(Mi(e,""),t)}class $1{constructor(t,n){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=i=>i.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(i,s)=>kr(s.backgroundColor),this.hoverBorderColor=(i,s)=>kr(s.borderColor),this.hoverColor=(i,s)=>kr(s.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(n)}set(t,n){return $r(this,t,n)}get(t){return Mi(this,t)}describe(t,n){return $r(ca,t,n)}override(t,n){return $r(_n,t,n)}route(t,n,i,s){const o=Mi(this,t),r=Mi(this,i),a="_"+n;Object.defineProperties(o,{[a]:{value:o[n],writable:!0},[n]:{enumerable:!0,get(){const l=this[a],c=r[s];return X(l)?Object.assign({},c,l):Y(l,c)},set(l){this[a]=l}}})}apply(t){t.forEach(n=>n(this))}}var pe=new $1({_scriptable:e=>!e.startsWith("on"),_indexable:e=>e!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[v1,b1,k1]);function S1(e){return!e||le(e.size)||le(e.family)?null:(e.style?e.style+" ":"")+(e.weight?e.weight+" ":"")+e.size+"px "+e.family}function $d(e,t,n,i,s){let o=t[s];return o||(o=t[s]=e.measureText(s).width,n.push(s)),o>i&&(i=o),i}function Jt(e,t,n){const i=e.currentDevicePixelRatio,s=n!==0?Math.max(n/2,.5):0;return Math.round((t-s)*i)/i+s}function Sd(e,t){!t&&!e||(t=t||e.getContext("2d"),t.save(),t.resetTransform(),t.clearRect(0,0,e.width,e.height),t.restore())}function da(e,t,n,i){Pf(e,t,n,i,null)}function Pf(e,t,n,i,s){let o,r,a,l,c,d,u,h;const g=t.pointStyle,m=t.rotation,y=t.radius;let _=(m||0)*Z_;if(g&&typeof g=="object"&&(o=g.toString(),o==="[object HTMLImageElement]"||o==="[object HTMLCanvasElement]")){e.save(),e.translate(n,i),e.rotate(_),e.drawImage(g,-g.width/2,-g.height/2,g.width,g.height),e.restore();return}if(!(isNaN(y)||y<=0)){switch(e.beginPath(),g){default:s?e.ellipse(n,i,s/2,y,0,0,et):e.arc(n,i,y,0,et),e.closePath();break;case"triangle":d=s?s/2:y,e.moveTo(n+Math.sin(_)*d,i-Math.cos(_)*y),_+=md,e.lineTo(n+Math.sin(_)*d,i-Math.cos(_)*y),_+=md,e.lineTo(n+Math.sin(_)*d,i-Math.cos(_)*y),e.closePath();break;case"rectRounded":c=y*.516,l=y-c,r=Math.cos(_+Xt)*l,u=Math.cos(_+Xt)*(s?s/2-c:l),a=Math.sin(_+Xt)*l,h=Math.sin(_+Xt)*(s?s/2-c:l),e.arc(n-u,i-a,c,_-Ce,_-Ze),e.arc(n+h,i-r,c,_-Ze,_),e.arc(n+u,i+a,c,_,_+Ze),e.arc(n-h,i+r,c,_+Ze,_+Ce),e.closePath();break;case"rect":if(!m){l=Math.SQRT1_2*y,d=s?s/2:l,e.rect(n-d,i-l,2*d,2*l);break}_+=Xt;case"rectRot":u=Math.cos(_)*(s?s/2:y),r=Math.cos(_)*y,a=Math.sin(_)*y,h=Math.sin(_)*(s?s/2:y),e.moveTo(n-u,i-a),e.lineTo(n+h,i-r),e.lineTo(n+u,i+a),e.lineTo(n-h,i+r),e.closePath();break;case"crossRot":_+=Xt;case"cross":u=Math.cos(_)*(s?s/2:y),r=Math.cos(_)*y,a=Math.sin(_)*y,h=Math.sin(_)*(s?s/2:y),e.moveTo(n-u,i-a),e.lineTo(n+u,i+a),e.moveTo(n+h,i-r),e.lineTo(n-h,i+r);break;case"star":u=Math.cos(_)*(s?s/2:y),r=Math.cos(_)*y,a=Math.sin(_)*y,h=Math.sin(_)*(s?s/2:y),e.moveTo(n-u,i-a),e.lineTo(n+u,i+a),e.moveTo(n+h,i-r),e.lineTo(n-h,i+r),_+=Xt,u=Math.cos(_)*(s?s/2:y),r=Math.cos(_)*y,a=Math.sin(_)*y,h=Math.sin(_)*(s?s/2:y),e.moveTo(n-u,i-a),e.lineTo(n+u,i+a),e.moveTo(n+h,i-r),e.lineTo(n-h,i+r);break;case"line":r=s?s/2:Math.cos(_)*y,a=Math.sin(_)*y,e.moveTo(n-r,i-a),e.lineTo(n+r,i+a);break;case"dash":e.moveTo(n,i),e.lineTo(n+Math.cos(_)*(s?s/2:y),i+Math.sin(_)*y);break;case!1:e.closePath();break}e.fill(),t.borderWidth>0&&e.stroke()}}function Ki(e,t,n){return n=n||.5,!t||e&&e.x>t.left-n&&e.x<t.right+n&&e.y>t.top-n&&e.y<t.bottom+n}function Po(e,t){e.save(),e.beginPath(),e.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),e.clip()}function Mo(e){e.restore()}function A1(e,t,n,i,s){if(!t)return e.lineTo(n.x,n.y);if(s==="middle"){const o=(t.x+n.x)/2;e.lineTo(o,t.y),e.lineTo(o,n.y)}else s==="after"!=!!i?e.lineTo(t.x,n.y):e.lineTo(n.x,t.y);e.lineTo(n.x,n.y)}function T1(e,t,n,i){if(!t)return e.lineTo(n.x,n.y);e.bezierCurveTo(i?t.cp1x:t.cp2x,i?t.cp1y:t.cp2y,i?n.cp2x:n.cp1x,i?n.cp2y:n.cp1y,n.x,n.y)}function C1(e,t){t.translation&&e.translate(t.translation[0],t.translation[1]),le(t.rotation)||e.rotate(t.rotation),t.color&&(e.fillStyle=t.color),t.textAlign&&(e.textAlign=t.textAlign),t.textBaseline&&(e.textBaseline=t.textBaseline)}function E1(e,t,n,i,s){if(s.strikethrough||s.underline){const o=e.measureText(i),r=t-o.actualBoundingBoxLeft,a=t+o.actualBoundingBoxRight,l=n-o.actualBoundingBoxAscent,c=n+o.actualBoundingBoxDescent,d=s.strikethrough?(l+c)/2:c;e.strokeStyle=e.fillStyle,e.beginPath(),e.lineWidth=s.decorationWidth||2,e.moveTo(r,d),e.lineTo(a,d),e.stroke()}}function R1(e,t){const n=e.fillStyle;e.fillStyle=t.color,e.fillRect(t.left,t.top,t.width,t.height),e.fillStyle=n}function lo(e,t,n,i,s,o={}){const r=_e(t)?t:[t],a=o.strokeWidth>0&&o.strokeColor!=="";let l,c;for(e.save(),e.font=s.string,C1(e,o),l=0;l<r.length;++l)c=r[l],o.backdrop&&R1(e,o.backdrop),a&&(o.strokeColor&&(e.strokeStyle=o.strokeColor),le(o.strokeWidth)||(e.lineWidth=o.strokeWidth),e.strokeText(c,n,i,o.maxWidth)),e.fillText(c,n,i,o.maxWidth),E1(e,n,i,c,o),i+=Number(s.lineHeight);e.restore()}function ua(e,t){const{x:n,y:i,w:s,h:o,radius:r}=t;e.arc(n+r.topLeft,i+r.topLeft,r.topLeft,1.5*Ce,Ce,!0),e.lineTo(n,i+o-r.bottomLeft),e.arc(n+r.bottomLeft,i+o-r.bottomLeft,r.bottomLeft,Ce,Ze,!0),e.lineTo(n+s-r.bottomRight,i+o),e.arc(n+s-r.bottomRight,i+o-r.bottomRight,r.bottomRight,Ze,0,!0),e.lineTo(n+s,i+r.topRight),e.arc(n+s-r.topRight,i+r.topRight,r.topRight,0,-Ze,!0),e.lineTo(n+r.topLeft,i)}const P1=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,M1=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function D1(e,t){const n=(""+e).match(P1);if(!n||n[1]==="normal")return t*1.2;switch(e=+n[2],n[3]){case"px":return e;case"%":e/=100;break}return t*e}const L1=e=>+e||0;function Mf(e,t){const n={},i=X(t),s=i?Object.keys(t):t,o=X(e)?i?r=>Y(e[r],e[t[r]]):r=>e[r]:()=>e;for(const r of s)n[r]=L1(o(r));return n}function I1(e){return Mf(e,{top:"y",right:"x",bottom:"y",left:"x"})}function Di(e){return Mf(e,["topLeft","topRight","bottomLeft","bottomRight"])}function nt(e){const t=I1(e);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function ze(e,t){e=e||{},t=t||pe.font;let n=Y(e.size,t.size);typeof n=="string"&&(n=parseInt(n,10));let i=Y(e.style,t.style);i&&!(""+i).match(M1)&&(console.warn('Invalid font style specified: "'+i+'"'),i=void 0);const s={family:Y(e.family,t.family),lineHeight:D1(Y(e.lineHeight,t.lineHeight),n),size:n,style:i,weight:Y(e.weight,t.weight),string:""};return s.string=S1(s),s}function As(e,t,n,i){let s,o,r;for(s=0,o=e.length;s<o;++s)if(r=e[s],r!==void 0&&r!==void 0)return r}function O1(e,t,n){const{min:i,max:s}=e,o=W_(t,(s-i)/2),r=(a,l)=>n&&a===0?0:a+l;return{min:r(i,-Math.abs(o)),max:r(s,o)}}function Sn(e,t){return Object.assign(Object.create(e),t)}function gl(e,t=[""],n,i,s=()=>e[0]){const o=n||e;typeof i>"u"&&(i=Of("_fallback",e));const r={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:e,_rootScopes:o,_fallback:i,_getTarget:s,override:a=>gl([a,...e],t,o,i)};return new Proxy(r,{deleteProperty(a,l){return delete a[l],delete a._keys,delete e[0][l],!0},get(a,l){return Lf(a,l,()=>j1(l,t,e,a))},getOwnPropertyDescriptor(a,l){return Reflect.getOwnPropertyDescriptor(a._scopes[0],l)},getPrototypeOf(){return Reflect.getPrototypeOf(e[0])},has(a,l){return Td(a).includes(l)},ownKeys(a){return Td(a)},set(a,l,c){const d=a._storage||(a._storage=s());return a[l]=d[l]=c,delete a._keys,!0}})}function Yn(e,t,n,i){const s={_cacheable:!1,_proxy:e,_context:t,_subProxy:n,_stack:new Set,_descriptors:Df(e,i),setContext:o=>Yn(e,o,n,i),override:o=>Yn(e.override(o),t,n,i)};return new Proxy(s,{deleteProperty(o,r){return delete o[r],delete e[r],!0},get(o,r,a){return Lf(o,r,()=>N1(o,r,a))},getOwnPropertyDescriptor(o,r){return o._descriptors.allKeys?Reflect.has(e,r)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(e,r)},getPrototypeOf(){return Reflect.getPrototypeOf(e)},has(o,r){return Reflect.has(e,r)},ownKeys(){return Reflect.ownKeys(e)},set(o,r,a){return e[r]=a,delete o[r],!0}})}function Df(e,t={scriptable:!0,indexable:!0}){const{_scriptable:n=t.scriptable,_indexable:i=t.indexable,_allKeys:s=t.allKeys}=e;return{allKeys:s,scriptable:n,indexable:i,isScriptable:zt(n)?n:()=>n,isIndexable:zt(i)?i:()=>i}}const F1=(e,t)=>e?e+hl(t):t,ml=(e,t)=>X(t)&&e!=="adapters"&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function Lf(e,t,n){if(Object.prototype.hasOwnProperty.call(e,t)||t==="constructor")return e[t];const i=n();return e[t]=i,i}function N1(e,t,n){const{_proxy:i,_context:s,_subProxy:o,_descriptors:r}=e;let a=i[t];return zt(a)&&r.isScriptable(t)&&(a=B1(t,a,e,n)),_e(a)&&a.length&&(a=z1(t,a,e,r.isIndexable)),ml(t,a)&&(a=Yn(a,s,o&&o[t],r)),a}function B1(e,t,n,i){const{_proxy:s,_context:o,_subProxy:r,_stack:a}=n;if(a.has(e))throw new Error("Recursion detected: "+Array.from(a).join("->")+"->"+e);a.add(e);let l=t(o,r||i);return a.delete(e),ml(e,l)&&(l=yl(s._scopes,s,e,l)),l}function z1(e,t,n,i){const{_proxy:s,_context:o,_subProxy:r,_descriptors:a}=n;if(typeof o.index<"u"&&i(e))return t[o.index%t.length];if(X(t[0])){const l=t,c=s._scopes.filter(d=>d!==l);t=[];for(const d of l){const u=yl(c,s,e,d);t.push(Yn(u,o,r&&r[e],a))}}return t}function If(e,t,n){return zt(e)?e(t,n):e}const H1=(e,t)=>e===!0?t:typeof e=="string"?oo(t,e):void 0;function U1(e,t,n,i,s){for(const o of t){const r=H1(n,o);if(r){e.add(r);const a=If(r._fallback,n,s);if(typeof a<"u"&&a!==n&&a!==i)return a}else if(r===!1&&typeof i<"u"&&n!==i)return null}return!1}function yl(e,t,n,i){const s=t._rootScopes,o=If(t._fallback,n,i),r=[...e,...s],a=new Set;a.add(i);let l=Ad(a,r,n,o||n,i);return l===null||typeof o<"u"&&o!==n&&(l=Ad(a,r,o,l,i),l===null)?!1:gl(Array.from(a),[""],s,o,()=>q1(t,n,i))}function Ad(e,t,n,i,s){for(;n;)n=U1(e,t,n,i,s);return n}function q1(e,t,n){const i=e._getTarget();t in i||(i[t]={});const s=i[t];return _e(s)&&X(n)?n:s||{}}function j1(e,t,n,i){let s;for(const o of t)if(s=Of(F1(o,e),n),typeof s<"u")return ml(e,s)?yl(n,i,e,s):s}function Of(e,t){for(const n of t){if(!n)continue;const i=n[e];if(typeof i<"u")return i}}function Td(e){let t=e._keys;return t||(t=e._keys=K1(e._scopes)),t}function K1(e){const t=new Set;for(const n of e)for(const i of Object.keys(n).filter(s=>!s.startsWith("_")))t.add(i);return Array.from(t)}const W1=Number.EPSILON||1e-14,Xn=(e,t)=>t<e.length&&!e[t].skip&&e[t],Ff=e=>e==="x"?"y":"x";function V1(e,t,n,i){const s=e.skip?t:e,o=t,r=n.skip?t:n,a=la(o,s),l=la(r,o);let c=a/(a+l),d=l/(a+l);c=isNaN(c)?0:c,d=isNaN(d)?0:d;const u=i*c,h=i*d;return{previous:{x:o.x-u*(r.x-s.x),y:o.y-u*(r.y-s.y)},next:{x:o.x+h*(r.x-s.x),y:o.y+h*(r.y-s.y)}}}function G1(e,t,n){const i=e.length;let s,o,r,a,l,c=Xn(e,0);for(let d=0;d<i-1;++d)if(l=c,c=Xn(e,d+1),!(!l||!c)){if(Ri(t[d],0,W1)){n[d]=n[d+1]=0;continue}s=n[d]/t[d],o=n[d+1]/t[d],a=Math.pow(s,2)+Math.pow(o,2),!(a<=9)&&(r=3/Math.sqrt(a),n[d]=s*r*t[d],n[d+1]=o*r*t[d])}}function Q1(e,t,n="x"){const i=Ff(n),s=e.length;let o,r,a,l=Xn(e,0);for(let c=0;c<s;++c){if(r=a,a=l,l=Xn(e,c+1),!a)continue;const d=a[n],u=a[i];r&&(o=(d-r[n])/3,a[`cp1${n}`]=d-o,a[`cp1${i}`]=u-o*t[c]),l&&(o=(l[n]-d)/3,a[`cp2${n}`]=d+o,a[`cp2${i}`]=u+o*t[c])}}function Y1(e,t="x"){const n=Ff(t),i=e.length,s=Array(i).fill(0),o=Array(i);let r,a,l,c=Xn(e,0);for(r=0;r<i;++r)if(a=l,l=c,c=Xn(e,r+1),!!l){if(c){const d=c[t]-l[t];s[r]=d!==0?(c[n]-l[n])/d:0}o[r]=a?c?Qn(s[r-1])!==Qn(s[r])?0:(s[r-1]+s[r])/2:s[r-1]:s[r]}G1(e,s,o),Q1(e,o,t)}function Ts(e,t,n){return Math.max(Math.min(e,n),t)}function X1(e,t){let n,i,s,o,r,a=Ki(e[0],t);for(n=0,i=e.length;n<i;++n)r=o,o=a,a=n<i-1&&Ki(e[n+1],t),o&&(s=e[n],r&&(s.cp1x=Ts(s.cp1x,t.left,t.right),s.cp1y=Ts(s.cp1y,t.top,t.bottom)),a&&(s.cp2x=Ts(s.cp2x,t.left,t.right),s.cp2y=Ts(s.cp2y,t.top,t.bottom)))}function J1(e,t,n,i,s){let o,r,a,l;if(t.spanGaps&&(e=e.filter(c=>!c.skip)),t.cubicInterpolationMode==="monotone")Y1(e,s);else{let c=i?e[e.length-1]:e[0];for(o=0,r=e.length;o<r;++o)a=e[o],l=V1(c,a,e[Math.min(o+1,r-(i?0:1))%r],t.tension),a.cp1x=l.previous.x,a.cp1y=l.previous.y,a.cp2x=l.next.x,a.cp2y=l.next.y,c=a}t.capBezierPoints&&X1(e,n)}function vl(){return typeof window<"u"&&typeof document<"u"}function bl(e){let t=e.parentNode;return t&&t.toString()==="[object ShadowRoot]"&&(t=t.host),t}function co(e,t,n){let i;return typeof e=="string"?(i=parseInt(e,10),e.indexOf("%")!==-1&&(i=i/100*t.parentNode[n])):i=e,i}const Do=e=>e.ownerDocument.defaultView.getComputedStyle(e,null);function Z1(e,t){return Do(e).getPropertyValue(t)}const ek=["top","right","bottom","left"];function fn(e,t,n){const i={};n=n?"-"+n:"";for(let s=0;s<4;s++){const o=ek[s];i[o]=parseFloat(e[t+"-"+o+n])||0}return i.width=i.left+i.right,i.height=i.top+i.bottom,i}const tk=(e,t,n)=>(e>0||t>0)&&(!n||!n.shadowRoot);function nk(e,t){const n=e.touches,i=n&&n.length?n[0]:e,{offsetX:s,offsetY:o}=i;let r=!1,a,l;if(tk(s,o,e.target))a=s,l=o;else{const c=t.getBoundingClientRect();a=i.clientX-c.left,l=i.clientY-c.top,r=!0}return{x:a,y:l,box:r}}function tn(e,t){if("native"in e)return e;const{canvas:n,currentDevicePixelRatio:i}=t,s=Do(n),o=s.boxSizing==="border-box",r=fn(s,"padding"),a=fn(s,"border","width"),{x:l,y:c,box:d}=nk(e,n),u=r.left+(d&&a.left),h=r.top+(d&&a.top);let{width:g,height:m}=t;return o&&(g-=r.width+a.width,m-=r.height+a.height),{x:Math.round((l-u)/g*n.width/i),y:Math.round((c-h)/m*n.height/i)}}function ik(e,t,n){let i,s;if(t===void 0||n===void 0){const o=e&&bl(e);if(!o)t=e.clientWidth,n=e.clientHeight;else{const r=o.getBoundingClientRect(),a=Do(o),l=fn(a,"border","width"),c=fn(a,"padding");t=r.width-c.width-l.width,n=r.height-c.height-l.height,i=co(a.maxWidth,o,"clientWidth"),s=co(a.maxHeight,o,"clientHeight")}}return{width:t,height:n,maxWidth:i||ao,maxHeight:s||ao}}const Pt=e=>Math.round(e*10)/10;function sk(e,t,n,i){const s=Do(e),o=fn(s,"margin"),r=co(s.maxWidth,e,"clientWidth")||ao,a=co(s.maxHeight,e,"clientHeight")||ao,l=ik(e,t,n);let{width:c,height:d}=l;if(s.boxSizing==="content-box"){const h=fn(s,"border","width"),g=fn(s,"padding");c-=g.width+h.width,d-=g.height+h.height}return c=Math.max(0,c-o.width),d=Math.max(0,i?c/i:d-o.height),c=Pt(Math.min(c,r,l.maxWidth)),d=Pt(Math.min(d,a,l.maxHeight)),c&&!d&&(d=Pt(c/2)),(t!==void 0||n!==void 0)&&i&&l.height&&d>l.height&&(d=l.height,c=Pt(Math.floor(d*i))),{width:c,height:d}}function Cd(e,t,n){const i=t||1,s=Pt(e.height*i),o=Pt(e.width*i);e.height=Pt(e.height),e.width=Pt(e.width);const r=e.canvas;return r.style&&(n||!r.style.height&&!r.style.width)&&(r.style.height=`${e.height}px`,r.style.width=`${e.width}px`),e.currentDevicePixelRatio!==i||r.height!==s||r.width!==o?(e.currentDevicePixelRatio=i,r.height=s,r.width=o,e.ctx.setTransform(i,0,0,i,0,0),!0):!1}const ok=(function(){let e=!1;try{const t={get passive(){return e=!0,!1}};vl()&&(window.addEventListener("test",null,t),window.removeEventListener("test",null,t))}catch{}return e})();function Ed(e,t){const n=Z1(e,t),i=n&&n.match(/^(\d+)(\.\d+)?px$/);return i?+i[1]:void 0}function nn(e,t,n,i){return{x:e.x+n*(t.x-e.x),y:e.y+n*(t.y-e.y)}}function rk(e,t,n,i){return{x:e.x+n*(t.x-e.x),y:i==="middle"?n<.5?e.y:t.y:i==="after"?n<1?e.y:t.y:n>0?t.y:e.y}}function ak(e,t,n,i){const s={x:e.cp2x,y:e.cp2y},o={x:t.cp1x,y:t.cp1y},r=nn(e,s,n),a=nn(s,o,n),l=nn(o,t,n),c=nn(r,a,n),d=nn(a,l,n);return nn(c,d,n)}const lk=function(e,t){return{x(n){return e+e+t-n},setWidth(n){t=n},textAlign(n){return n==="center"?n:n==="right"?"left":"right"},xPlus(n,i){return n-i},leftForLtr(n,i){return n-i}}},ck=function(){return{x(e){return e},setWidth(e){},textAlign(e){return e},xPlus(e,t){return e+t},leftForLtr(e,t){return e}}};function Bn(e,t,n){return e?lk(t,n):ck()}function Nf(e,t){let n,i;(t==="ltr"||t==="rtl")&&(n=e.canvas.style,i=[n.getPropertyValue("direction"),n.getPropertyPriority("direction")],n.setProperty("direction",t,"important"),e.prevTextDirection=i)}function Bf(e,t){t!==void 0&&(delete e.prevTextDirection,e.canvas.style.setProperty("direction",t[0],t[1]))}function zf(e){return e==="angle"?{between:$f,compare:r1,normalize:ht}:{between:Fn,compare:(t,n)=>t-n,normalize:t=>t}}function Rd({start:e,end:t,count:n,loop:i,style:s}){return{start:e%n,end:t%n,loop:i&&(t-e+1)%n===0,style:s}}function dk(e,t,n){const{property:i,start:s,end:o}=n,{between:r,normalize:a}=zf(i),l=t.length;let{start:c,end:d,loop:u}=e,h,g;if(u){for(c+=l,d+=l,h=0,g=l;h<g&&r(a(t[c%l][i]),s,o);++h)c--,d--;c%=l,d%=l}return d<c&&(d+=l),{start:c,end:d,loop:u,style:e.style}}function Hf(e,t,n){if(!n)return[e];const{property:i,start:s,end:o}=n,r=t.length,{compare:a,between:l,normalize:c}=zf(i),{start:d,end:u,loop:h,style:g}=dk(e,t,n),m=[];let y=!1,_=null,S,R,M;const A=()=>l(s,M,S)&&a(s,M)!==0,T=()=>a(o,S)===0||l(o,M,S),v=()=>y||A(),E=()=>!y||T();for(let P=d,C=d;P<=u;++P)R=t[P%r],!R.skip&&(S=c(R[i]),S!==M&&(y=l(S,s,o),_===null&&v()&&(_=a(S,s)===0?P:C),_!==null&&E()&&(m.push(Rd({start:_,end:P,loop:h,count:r,style:g})),_=null),C=P,M=S));return _!==null&&m.push(Rd({start:_,end:u,loop:h,count:r,style:g})),m}function Uf(e,t){const n=[],i=e.segments;for(let s=0;s<i.length;s++){const o=Hf(i[s],e.points,t);o.length&&n.push(...o)}return n}function uk(e,t,n,i){let s=0,o=t-1;if(n&&!i)for(;s<t&&!e[s].skip;)s++;for(;s<t&&e[s].skip;)s++;for(s%=t,n&&(o+=s);o>s&&e[o%t].skip;)o--;return o%=t,{start:s,end:o}}function hk(e,t,n,i){const s=e.length,o=[];let r=t,a=e[t],l;for(l=t+1;l<=n;++l){const c=e[l%s];c.skip||c.stop?a.skip||(i=!1,o.push({start:t%s,end:(l-1)%s,loop:i}),t=r=c.stop?l:null):(r=l,a.skip&&(t=l)),a=c}return r!==null&&o.push({start:t%s,end:r%s,loop:i}),o}function fk(e,t){const n=e.points,i=e.options.spanGaps,s=n.length;if(!s)return[];const o=!!e._loop,{start:r,end:a}=uk(n,s,o,i);if(i===!0)return Pd(e,[{start:r,end:a,loop:o}],n,t);const l=a<r?a+s:a,c=!!e._fullLoop&&r===0&&a===s-1;return Pd(e,hk(n,r,l,c),n,t)}function Pd(e,t,n,i){return!i||!i.setContext||!n?t:pk(e,t,n,i)}function pk(e,t,n,i){const s=e._chart.getContext(),o=Md(e.options),{_datasetIndex:r,options:{spanGaps:a}}=e,l=n.length,c=[];let d=o,u=t[0].start,h=u;function g(m,y,_,S){const R=a?-1:1;if(m!==y){for(m+=l;n[m%l].skip;)m-=R;for(;n[y%l].skip;)y+=R;m%l!==y%l&&(c.push({start:m%l,end:y%l,loop:_,style:S}),d=S,u=y%l)}}for(const m of t){u=a?u:m.start;let y=n[u%l],_;for(h=u+1;h<=m.end;h++){const S=n[h%l];_=Md(i.setContext(Sn(s,{type:"segment",p0:y,p1:S,p0DataIndex:(h-1)%l,p1DataIndex:h%l,datasetIndex:r}))),gk(_,d)&&g(u,h-1,m.loop,d),y=S,d=_}u<h-1&&g(u,h-1,m.loop,d)}return c}function Md(e){return{backgroundColor:e.backgroundColor,borderCapStyle:e.borderCapStyle,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderJoinStyle:e.borderJoinStyle,borderWidth:e.borderWidth,borderColor:e.borderColor}}function gk(e,t){if(!t)return!1;const n=[],i=function(s,o){return pl(o)?(n.includes(o)||n.push(o),n.indexOf(o)):o};return JSON.stringify(e,i)!==JSON.stringify(t,i)}function Cs(e,t,n){return e.options.clip?e[n]:t[n]}function mk(e,t){const{xScale:n,yScale:i}=e;return n&&i?{left:Cs(n,t,"left"),right:Cs(n,t,"right"),top:Cs(i,t,"top"),bottom:Cs(i,t,"bottom")}:t}function qf(e,t){const n=t._clip;if(n.disabled)return!1;const i=mk(t,e.chartArea);return{left:n.left===!1?0:i.left-(n.left===!0?0:n.left),right:n.right===!1?e.width:i.right+(n.right===!0?0:n.right),top:n.top===!1?0:i.top-(n.top===!0?0:n.top),bottom:n.bottom===!1?e.height:i.bottom+(n.bottom===!0?0:n.bottom)}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */class yk{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,n,i,s){const o=n.listeners[s],r=n.duration;o.forEach(a=>a({chart:t,initial:n.initial,numSteps:r,currentStep:Math.min(i-n.start,r)}))}_refresh(){this._request||(this._running=!0,this._request=Af.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(t=Date.now()){let n=0;this._charts.forEach((i,s)=>{if(!i.running||!i.items.length)return;const o=i.items;let r=o.length-1,a=!1,l;for(;r>=0;--r)l=o[r],l._active?(l._total>i.duration&&(i.duration=l._total),l.tick(t),a=!0):(o[r]=o[o.length-1],o.pop());a&&(s.draw(),this._notify(s,i,t,"progress")),o.length||(i.running=!1,this._notify(s,i,t,"complete"),i.initial=!1),n+=o.length}),this._lastDate=t,n===0&&(this._running=!1)}_getAnims(t){const n=this._charts;let i=n.get(t);return i||(i={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},n.set(t,i)),i}listen(t,n,i){this._getAnims(t).listeners[n].push(i)}add(t,n){!n||!n.length||this._getAnims(t).items.push(...n)}has(t){return this._getAnims(t).items.length>0}start(t){const n=this._charts.get(t);n&&(n.running=!0,n.start=Date.now(),n.duration=n.items.reduce((i,s)=>Math.max(i,s._duration),0),this._refresh())}running(t){if(!this._running)return!1;const n=this._charts.get(t);return!(!n||!n.running||!n.items.length)}stop(t){const n=this._charts.get(t);if(!n||!n.items.length)return;const i=n.items;let s=i.length-1;for(;s>=0;--s)i[s].cancel();n.items=[],this._notify(t,n,Date.now(),"complete")}remove(t){return this._charts.delete(t)}}var xt=new yk;const Dd="transparent",vk={boolean(e,t,n){return n>.5?t:e},color(e,t,n){const i=_d(e||Dd),s=i.valid&&_d(t||Dd);return s&&s.valid?s.mix(i,n).hexString():t},number(e,t,n){return e+(t-e)*n}};class bk{constructor(t,n,i,s){const o=n[i];s=As([t.to,s,o,t.from]);const r=As([t.from,o,s]);this._active=!0,this._fn=t.fn||vk[t.type||typeof r],this._easing=Pi[t.easing]||Pi.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=n,this._prop=i,this._from=r,this._to=s,this._promises=void 0}active(){return this._active}update(t,n,i){if(this._active){this._notify(!1);const s=this._target[this._prop],o=i-this._start,r=this._duration-o;this._start=i,this._duration=Math.floor(Math.max(r,t.duration)),this._total+=o,this._loop=!!t.loop,this._to=As([t.to,n,s,t.from]),this._from=As([t.from,s,n])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const n=t-this._start,i=this._duration,s=this._prop,o=this._from,r=this._loop,a=this._to;let l;if(this._active=o!==a&&(r||n<i),!this._active){this._target[s]=a,this._notify(!0);return}if(n<0){this._target[s]=o;return}l=n/i%2,l=r&&l>1?2-l:l,l=this._easing(Math.min(1,Math.max(0,l))),this._target[s]=this._fn(o,a,l)}wait(){const t=this._promises||(this._promises=[]);return new Promise((n,i)=>{t.push({res:n,rej:i})})}_notify(t){const n=t?"res":"rej",i=this._promises||[];for(let s=0;s<i.length;s++)i[s][n]()}}class jf{constructor(t,n){this._chart=t,this._properties=new Map,this.configure(n)}configure(t){if(!X(t))return;const n=Object.keys(pe.animation),i=this._properties;Object.getOwnPropertyNames(t).forEach(s=>{const o=t[s];if(!X(o))return;const r={};for(const a of n)r[a]=o[a];(_e(o.properties)&&o.properties||[s]).forEach(a=>{(a===s||!i.has(a))&&i.set(a,r)})})}_animateOptions(t,n){const i=n.options,s=xk(t,i);if(!s)return[];const o=this._createAnimations(s,i);return i.$shared&&wk(t.options.$animations,i).then(()=>{t.options=i},()=>{}),o}_createAnimations(t,n){const i=this._properties,s=[],o=t.$animations||(t.$animations={}),r=Object.keys(n),a=Date.now();let l;for(l=r.length-1;l>=0;--l){const c=r[l];if(c.charAt(0)==="$")continue;if(c==="options"){s.push(...this._animateOptions(t,n));continue}const d=n[c];let u=o[c];const h=i.get(c);if(u)if(h&&u.active()){u.update(h,d,a);continue}else u.cancel();if(!h||!h.duration){t[c]=d;continue}o[c]=u=new bk(h,t,c,d),s.push(u)}return s}update(t,n){if(this._properties.size===0){Object.assign(t,n);return}const i=this._createAnimations(t,n);if(i.length)return xt.add(this._chart,i),!0}}function wk(e,t){const n=[],i=Object.keys(t);for(let s=0;s<i.length;s++){const o=e[i[s]];o&&o.active()&&n.push(o.wait())}return Promise.all(n)}function xk(e,t){if(!t)return;let n=e.options;if(!n){e.options=t;return}return n.$shared&&(e.options=n=Object.assign({},n,{$shared:!1,$animations:{}})),n}function Ld(e,t){const n=e&&e.options||{},i=n.reverse,s=n.min===void 0?t:0,o=n.max===void 0?t:0;return{start:i?o:s,end:i?s:o}}function _k(e,t,n){if(n===!1)return!1;const i=Ld(e,n),s=Ld(t,n);return{top:s.end,right:i.end,bottom:s.start,left:i.start}}function kk(e){let t,n,i,s;return X(e)?(t=e.top,n=e.right,i=e.bottom,s=e.left):t=n=i=s=e,{top:t,right:n,bottom:i,left:s,disabled:e===!1}}function Kf(e,t){const n=[],i=e._getSortedDatasetMetas(t);let s,o;for(s=0,o=i.length;s<o;++s)n.push(i[s].index);return n}function Id(e,t,n,i={}){const s=e.keys,o=i.mode==="single";let r,a,l,c;if(t===null)return;let d=!1;for(r=0,a=s.length;r<a;++r){if(l=+s[r],l===n){if(d=!0,i.all)continue;break}c=e.values[l],Re(c)&&(o||t===0||Qn(t)===Qn(c))&&(t+=c)}return!d&&!i.all?0:t}function $k(e,t){const{iScale:n,vScale:i}=t,s=n.axis==="x"?"x":"y",o=i.axis==="x"?"x":"y",r=Object.keys(e),a=new Array(r.length);let l,c,d;for(l=0,c=r.length;l<c;++l)d=r[l],a[l]={[s]:d,[o]:e[d]};return a}function Sr(e,t){const n=e&&e.options.stacked;return n||n===void 0&&t.stack!==void 0}function Sk(e,t,n){return`${e.id}.${t.id}.${n.stack||n.type}`}function Ak(e){const{min:t,max:n,minDefined:i,maxDefined:s}=e.getUserBounds();return{min:i?t:Number.NEGATIVE_INFINITY,max:s?n:Number.POSITIVE_INFINITY}}function Tk(e,t,n){const i=e[t]||(e[t]={});return i[n]||(i[n]={})}function Od(e,t,n,i){for(const s of t.getMatchingVisibleMetas(i).reverse()){const o=e[s.index];if(n&&o>0||!n&&o<0)return s.index}return null}function Fd(e,t){const{chart:n,_cachedMeta:i}=e,s=n._stacks||(n._stacks={}),{iScale:o,vScale:r,index:a}=i,l=o.axis,c=r.axis,d=Sk(o,r,i),u=t.length;let h;for(let g=0;g<u;++g){const m=t[g],{[l]:y,[c]:_}=m,S=m._stacks||(m._stacks={});h=S[c]=Tk(s,d,y),h[a]=_,h._top=Od(h,r,!0,i.type),h._bottom=Od(h,r,!1,i.type);const R=h._visualValues||(h._visualValues={});R[a]=_}}function Ar(e,t){const n=e.scales;return Object.keys(n).filter(i=>n[i].axis===t).shift()}function Ck(e,t){return Sn(e,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:"default",type:"dataset"})}function Ek(e,t,n){return Sn(e,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:n,index:t,mode:"default",type:"data"})}function hi(e,t){const n=e.controller.index,i=e.vScale&&e.vScale.axis;if(i){t=t||e._parsed;for(const s of t){const o=s._stacks;if(!o||o[i]===void 0||o[i][n]===void 0)return;delete o[i][n],o[i]._visualValues!==void 0&&o[i]._visualValues[n]!==void 0&&delete o[i]._visualValues[n]}}}const Tr=e=>e==="reset"||e==="none",Nd=(e,t)=>t?e:Object.assign({},e),Rk=(e,t,n)=>e&&!t.hidden&&t._stacked&&{keys:Kf(n,!0),values:null};class Li{constructor(t,n){this.chart=t,this._ctx=t.ctx,this.index=n,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=Sr(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&hi(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,n=this._cachedMeta,i=this.getDataset(),s=(u,h,g,m)=>u==="x"?h:u==="r"?m:g,o=n.xAxisID=Y(i.xAxisID,Ar(t,"x")),r=n.yAxisID=Y(i.yAxisID,Ar(t,"y")),a=n.rAxisID=Y(i.rAxisID,Ar(t,"r")),l=n.indexAxis,c=n.iAxisID=s(l,o,r,a),d=n.vAxisID=s(l,r,o,a);n.xScale=this.getScaleForId(o),n.yScale=this.getScaleForId(r),n.rScale=this.getScaleForId(a),n.iScale=this.getScaleForId(c),n.vScale=this.getScaleForId(d)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const n=this._cachedMeta;return t===n.iScale?n.vScale:n.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&bd(this._data,this),t._stacked&&hi(t)}_dataCheck(){const t=this.getDataset(),n=t.data||(t.data=[]),i=this._data;if(X(n)){const s=this._cachedMeta;this._data=$k(n,s)}else if(i!==n){if(i){bd(i,this);const s=this._cachedMeta;hi(s),s._parsed=[]}n&&Object.isExtensible(n)&&d1(n,this),this._syncList=[],this._data=n}}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const n=this._cachedMeta,i=this.getDataset();let s=!1;this._dataCheck();const o=n._stacked;n._stacked=Sr(n.vScale,n),n.stack!==i.stack&&(s=!0,hi(n),n.stack=i.stack),this._resyncElements(t),(s||o!==n._stacked)&&(Fd(this,n._parsed),n._stacked=Sr(n.vScale,n))}configure(){const t=this.chart.config,n=t.datasetScopeKeys(this._type),i=t.getOptionScopes(this.getDataset(),n,!0);this.options=t.createResolver(i,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,n){const{_cachedMeta:i,_data:s}=this,{iScale:o,_stacked:r}=i,a=o.axis;let l=t===0&&n===s.length?!0:i._sorted,c=t>0&&i._parsed[t-1],d,u,h;if(this._parsing===!1)i._parsed=s,i._sorted=!0,h=s;else{_e(s[t])?h=this.parseArrayData(i,s,t,n):X(s[t])?h=this.parseObjectData(i,s,t,n):h=this.parsePrimitiveData(i,s,t,n);const g=()=>u[a]===null||c&&u[a]<c[a];for(d=0;d<n;++d)i._parsed[d+t]=u=h[d],l&&(g()&&(l=!1),c=u);i._sorted=l}r&&Fd(this,h)}parsePrimitiveData(t,n,i,s){const{iScale:o,vScale:r}=t,a=o.axis,l=r.axis,c=o.getLabels(),d=o===r,u=new Array(s);let h,g,m;for(h=0,g=s;h<g;++h)m=h+i,u[h]={[a]:d||o.parse(c[m],m),[l]:r.parse(n[m],m)};return u}parseArrayData(t,n,i,s){const{xScale:o,yScale:r}=t,a=new Array(s);let l,c,d,u;for(l=0,c=s;l<c;++l)d=l+i,u=n[d],a[l]={x:o.parse(u[0],d),y:r.parse(u[1],d)};return a}parseObjectData(t,n,i,s){const{xScale:o,yScale:r}=t,{xAxisKey:a="x",yAxisKey:l="y"}=this._parsing,c=new Array(s);let d,u,h,g;for(d=0,u=s;d<u;++d)h=d+i,g=n[h],c[d]={x:o.parse(oo(g,a),h),y:r.parse(oo(g,l),h)};return c}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,n,i){const s=this.chart,o=this._cachedMeta,r=n[t.axis],a={keys:Kf(s,!0),values:n._stacks[t.axis]._visualValues};return Id(a,r,o.index,{mode:i})}updateRangeFromParsed(t,n,i,s){const o=i[n.axis];let r=o===null?NaN:o;const a=s&&i._stacks[n.axis];s&&a&&(s.values=a,r=Id(s,o,this._cachedMeta.index)),t.min=Math.min(t.min,r),t.max=Math.max(t.max,r)}getMinMax(t,n){const i=this._cachedMeta,s=i._parsed,o=i._sorted&&t===i.iScale,r=s.length,a=this._getOtherScale(t),l=Rk(n,i,this.chart),c={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:d,max:u}=Ak(a);let h,g;function m(){g=s[h];const y=g[a.axis];return!Re(g[t.axis])||d>y||u<y}for(h=0;h<r&&!(!m()&&(this.updateRangeFromParsed(c,t,g,l),o));++h);if(o){for(h=r-1;h>=0;--h)if(!m()){this.updateRangeFromParsed(c,t,g,l);break}}return c}getAllParsedValues(t){const n=this._cachedMeta._parsed,i=[];let s,o,r;for(s=0,o=n.length;s<o;++s)r=n[s][t.axis],Re(r)&&i.push(r);return i}getMaxOverflow(){return!1}getLabelAndValue(t){const n=this._cachedMeta,i=n.iScale,s=n.vScale,o=this.getParsed(t);return{label:i?""+i.getLabelForValue(o[i.axis]):"",value:s?""+s.getLabelForValue(o[s.axis]):""}}_update(t){const n=this._cachedMeta;this.update(t||"default"),n._clip=kk(Y(this.options.clip,_k(n.xScale,n.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,n=this.chart,i=this._cachedMeta,s=i.data||[],o=n.chartArea,r=[],a=this._drawStart||0,l=this._drawCount||s.length-a,c=this.options.drawActiveElementsOnTop;let d;for(i.dataset&&i.dataset.draw(t,o,a,l),d=a;d<a+l;++d){const u=s[d];u.hidden||(u.active&&c?r.push(u):u.draw(t,o))}for(d=0;d<r.length;++d)r[d].draw(t,o)}getStyle(t,n){const i=n?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(i):this.resolveDataElementOptions(t||0,i)}getContext(t,n,i){const s=this.getDataset();let o;if(t>=0&&t<this._cachedMeta.data.length){const r=this._cachedMeta.data[t];o=r.$context||(r.$context=Ek(this.getContext(),t,r)),o.parsed=this.getParsed(t),o.raw=s.data[t],o.index=o.dataIndex=t}else o=this.$context||(this.$context=Ck(this.chart.getContext(),this.index)),o.dataset=s,o.index=o.datasetIndex=this.index;return o.active=!!n,o.mode=i,o}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,n){return this._resolveElementOptions(this.dataElementType.id,n,t)}_resolveElementOptions(t,n="default",i){const s=n==="active",o=this._cachedDataOpts,r=t+"-"+n,a=o[r],l=this.enableOptionSharing&&ro(i);if(a)return Nd(a,l);const c=this.chart.config,d=c.datasetElementScopeKeys(this._type,t),u=s?[`${t}Hover`,"hover",t,""]:[t,""],h=c.getOptionScopes(this.getDataset(),d),g=Object.keys(pe.elements[t]),m=()=>this.getContext(i,s,n),y=c.resolveNamedOptions(h,g,m,u);return y.$shared&&(y.$shared=l,o[r]=Object.freeze(Nd(y,l))),y}_resolveAnimations(t,n,i){const s=this.chart,o=this._cachedDataOpts,r=`animation-${n}`,a=o[r];if(a)return a;let l;if(s.options.animation!==!1){const d=this.chart.config,u=d.datasetAnimationScopeKeys(this._type,n),h=d.getOptionScopes(this.getDataset(),u);l=d.createResolver(h,this.getContext(t,i,n))}const c=new jf(s,l&&l.animations);return l&&l._cacheable&&(o[r]=Object.freeze(c)),c}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,n){return!n||Tr(t)||this.chart._animationsDisabled}_getSharedOptions(t,n){const i=this.resolveDataElementOptions(t,n),s=this._sharedOptions,o=this.getSharedOptions(i),r=this.includeOptions(n,o)||o!==s;return this.updateSharedOptions(o,n,i),{sharedOptions:o,includeOptions:r}}updateElement(t,n,i,s){Tr(s)?Object.assign(t,i):this._resolveAnimations(n,s).update(t,i)}updateSharedOptions(t,n,i){t&&!Tr(n)&&this._resolveAnimations(void 0,n).update(t,i)}_setStyle(t,n,i,s){t.active=s;const o=this.getStyle(n,s);this._resolveAnimations(n,i,s).update(t,{options:!s&&this.getSharedOptions(o)||o})}removeHoverStyle(t,n,i){this._setStyle(t,i,"active",!1)}setHoverStyle(t,n,i){this._setStyle(t,i,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const n=this._data,i=this._cachedMeta.data;for(const[a,l,c]of this._syncList)this[a](l,c);this._syncList=[];const s=i.length,o=n.length,r=Math.min(o,s);r&&this.parse(0,r),o>s?this._insertElements(s,o-s,t):o<s&&this._removeElements(o,s-o)}_insertElements(t,n,i=!0){const s=this._cachedMeta,o=s.data,r=t+n;let a;const l=c=>{for(c.length+=n,a=c.length-1;a>=r;a--)c[a]=c[a-n]};for(l(o),a=t;a<r;++a)o[a]=new this.dataElementType;this._parsing&&l(s._parsed),this.parse(t,n),i&&this.updateElements(o,t,n,"reset")}updateElements(t,n,i,s){}_removeElements(t,n){const i=this._cachedMeta;if(this._parsing){const s=i._parsed.splice(t,n);i._stacked&&hi(i,s)}i.data.splice(t,n)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[n,i,s]=t;this[n](i,s)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,n){n&&this._sync(["_removeElements",t,n]);const i=arguments.length-2;i&&this._sync(["_insertElements",t,i])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}N(Li,"defaults",{}),N(Li,"datasetElementType",null),N(Li,"dataElementType",null);class Us extends Li{initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){const n=this._cachedMeta,{dataset:i,data:s=[],_dataset:o}=n,r=this.chart._animationsDisabled;let{start:a,count:l}=p1(n,s,r);this._drawStart=a,this._drawCount=l,g1(n)&&(a=0,l=s.length),i._chart=this.chart,i._datasetIndex=this.index,i._decimated=!!o._decimated,i.points=s;const c=this.resolveDatasetElementOptions(t);this.options.showLine||(c.borderWidth=0),c.segment=this.options.segment,this.updateElement(i,void 0,{animated:!r,options:c},t),this.updateElements(s,a,l,t)}updateElements(t,n,i,s){const o=s==="reset",{iScale:r,vScale:a,_stacked:l,_dataset:c}=this._cachedMeta,{sharedOptions:d,includeOptions:u}=this._getSharedOptions(n,s),h=r.axis,g=a.axis,{spanGaps:m,segment:y}=this.options,_=ji(m)?m:Number.POSITIVE_INFINITY,S=this.chart._animationsDisabled||o||s==="none",R=n+i,M=t.length;let A=n>0&&this.getParsed(n-1);for(let T=0;T<M;++T){const v=t[T],E=S?v:{};if(T<n||T>=R){E.skip=!0;continue}const P=this.getParsed(T),C=le(P[g]),O=E[h]=r.getPixelForValue(P[h],T),D=E[g]=o||C?a.getBasePixel():a.getPixelForValue(l?this.applyStack(a,P,l):P[g],T);E.skip=isNaN(O)||isNaN(D)||C,E.stop=T>0&&Math.abs(P[h]-A[h])>_,y&&(E.parsed=P,E.raw=c.data[T]),u&&(E.options=d||this.resolveDataElementOptions(T,v.active?"active":s)),S||this.updateElement(v,T,E,s),A=P}}getMaxOverflow(){const t=this._cachedMeta,n=t.dataset,i=n.options&&n.options.borderWidth||0,s=t.data||[];if(!s.length)return i;const o=s[0].size(this.resolveDataElementOptions(0)),r=s[s.length-1].size(this.resolveDataElementOptions(s.length-1));return Math.max(i,o,r)/2}draw(){const t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}}N(Us,"id","line"),N(Us,"defaults",{datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1}),N(Us,"overrides",{scales:{_index_:{type:"category"},_value_:{type:"linear"}}});function Zt(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class wl{constructor(t){N(this,"options");this.options=t||{}}static override(t){Object.assign(wl.prototype,t)}init(){}formats(){return Zt()}parse(){return Zt()}format(){return Zt()}add(){return Zt()}diff(){return Zt()}startOf(){return Zt()}endOf(){return Zt()}}var Pk={_date:wl};function Mk(e,t,n,i){const{controller:s,data:o,_sorted:r}=e,a=s._cachedMeta.iScale,l=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null;if(a&&t===a.axis&&t!=="r"&&r&&o.length){const c=a._reversePixels?l1:ln;if(i){if(s._sharedOptions){const d=o[0],u=typeof d.getRange=="function"&&d.getRange(t);if(u){const h=c(o,t,n-u),g=c(o,t,n+u);return{lo:h.lo,hi:g.hi}}}}else{const d=c(o,t,n);if(l){const{vScale:u}=s._cachedMeta,{_parsed:h}=e,g=h.slice(0,d.lo+1).reverse().findIndex(y=>!le(y[u.axis]));d.lo-=Math.max(0,g);const m=h.slice(d.hi).findIndex(y=>!le(y[u.axis]));d.hi+=Math.max(0,m)}return d}}return{lo:0,hi:o.length-1}}function Lo(e,t,n,i,s){const o=e.getSortedVisibleDatasetMetas(),r=n[t];for(let a=0,l=o.length;a<l;++a){const{index:c,data:d}=o[a],{lo:u,hi:h}=Mk(o[a],t,r,s);for(let g=u;g<=h;++g){const m=d[g];m.skip||i(m,c,g)}}}function Dk(e){const t=e.indexOf("x")!==-1,n=e.indexOf("y")!==-1;return function(i,s){const o=t?Math.abs(i.x-s.x):0,r=n?Math.abs(i.y-s.y):0;return Math.sqrt(Math.pow(o,2)+Math.pow(r,2))}}function Cr(e,t,n,i,s){const o=[];return!s&&!e.isPointInArea(t)||Lo(e,n,t,function(a,l,c){!s&&!Ki(a,e.chartArea,0)||a.inRange(t.x,t.y,i)&&o.push({element:a,datasetIndex:l,index:c})},!0),o}function Lk(e,t,n,i){let s=[];function o(r,a,l){const{startAngle:c,endAngle:d}=r.getProps(["startAngle","endAngle"],i),{angle:u}=o1(r,{x:t.x,y:t.y});$f(u,c,d)&&s.push({element:r,datasetIndex:a,index:l})}return Lo(e,n,t,o),s}function Ik(e,t,n,i,s,o){let r=[];const a=Dk(n);let l=Number.POSITIVE_INFINITY;function c(d,u,h){const g=d.inRange(t.x,t.y,s);if(i&&!g)return;const m=d.getCenterPoint(s);if(!(!!o||e.isPointInArea(m))&&!g)return;const _=a(t,m);_<l?(r=[{element:d,datasetIndex:u,index:h}],l=_):_===l&&r.push({element:d,datasetIndex:u,index:h})}return Lo(e,n,t,c),r}function Er(e,t,n,i,s,o){return!o&&!e.isPointInArea(t)?[]:n==="r"&&!i?Lk(e,t,n,s):Ik(e,t,n,i,s,o)}function Bd(e,t,n,i,s){const o=[],r=n==="x"?"inXRange":"inYRange";let a=!1;return Lo(e,n,t,(l,c,d)=>{l[r]&&l[r](t[n],s)&&(o.push({element:l,datasetIndex:c,index:d}),a=a||l.inRange(t.x,t.y,s))}),i&&!a?[]:o}var Ok={modes:{index(e,t,n,i){const s=tn(t,e),o=n.axis||"x",r=n.includeInvisible||!1,a=n.intersect?Cr(e,s,o,i,r):Er(e,s,o,!1,i,r),l=[];return a.length?(e.getSortedVisibleDatasetMetas().forEach(c=>{const d=a[0].index,u=c.data[d];u&&!u.skip&&l.push({element:u,datasetIndex:c.index,index:d})}),l):[]},dataset(e,t,n,i){const s=tn(t,e),o=n.axis||"xy",r=n.includeInvisible||!1;let a=n.intersect?Cr(e,s,o,i,r):Er(e,s,o,!1,i,r);if(a.length>0){const l=a[0].datasetIndex,c=e.getDatasetMeta(l).data;a=[];for(let d=0;d<c.length;++d)a.push({element:c[d],datasetIndex:l,index:d})}return a},point(e,t,n,i){const s=tn(t,e),o=n.axis||"xy",r=n.includeInvisible||!1;return Cr(e,s,o,i,r)},nearest(e,t,n,i){const s=tn(t,e),o=n.axis||"xy",r=n.includeInvisible||!1;return Er(e,s,o,n.intersect,i,r)},x(e,t,n,i){const s=tn(t,e);return Bd(e,s,"x",n.intersect,i)},y(e,t,n,i){const s=tn(t,e);return Bd(e,s,"y",n.intersect,i)}}};const Wf=["left","top","right","bottom"];function fi(e,t){return e.filter(n=>n.pos===t)}function zd(e,t){return e.filter(n=>Wf.indexOf(n.pos)===-1&&n.box.axis===t)}function pi(e,t){return e.sort((n,i)=>{const s=t?i:n,o=t?n:i;return s.weight===o.weight?s.index-o.index:s.weight-o.weight})}function Fk(e){const t=[];let n,i,s,o,r,a;for(n=0,i=(e||[]).length;n<i;++n)s=e[n],{position:o,options:{stack:r,stackWeight:a=1}}=s,t.push({index:n,box:s,pos:o,horizontal:s.isHorizontal(),weight:s.weight,stack:r&&o+r,stackWeight:a});return t}function Nk(e){const t={};for(const n of e){const{stack:i,pos:s,stackWeight:o}=n;if(!i||!Wf.includes(s))continue;const r=t[i]||(t[i]={count:0,placed:0,weight:0,size:0});r.count++,r.weight+=o}return t}function Bk(e,t){const n=Nk(e),{vBoxMaxWidth:i,hBoxMaxHeight:s}=t;let o,r,a;for(o=0,r=e.length;o<r;++o){a=e[o];const{fullSize:l}=a.box,c=n[a.stack],d=c&&a.stackWeight/c.weight;a.horizontal?(a.width=d?d*i:l&&t.availableWidth,a.height=s):(a.width=i,a.height=d?d*s:l&&t.availableHeight)}return n}function zk(e){const t=Fk(e),n=pi(t.filter(c=>c.box.fullSize),!0),i=pi(fi(t,"left"),!0),s=pi(fi(t,"right")),o=pi(fi(t,"top"),!0),r=pi(fi(t,"bottom")),a=zd(t,"x"),l=zd(t,"y");return{fullSize:n,leftAndTop:i.concat(o),rightAndBottom:s.concat(l).concat(r).concat(a),chartArea:fi(t,"chartArea"),vertical:i.concat(s).concat(l),horizontal:o.concat(r).concat(a)}}function Hd(e,t,n,i){return Math.max(e[n],t[n])+Math.max(e[i],t[i])}function Vf(e,t){e.top=Math.max(e.top,t.top),e.left=Math.max(e.left,t.left),e.bottom=Math.max(e.bottom,t.bottom),e.right=Math.max(e.right,t.right)}function Hk(e,t,n,i){const{pos:s,box:o}=n,r=e.maxPadding;if(!X(s)){n.size&&(e[s]-=n.size);const u=i[n.stack]||{size:0,count:1};u.size=Math.max(u.size,n.horizontal?o.height:o.width),n.size=u.size/u.count,e[s]+=n.size}o.getPadding&&Vf(r,o.getPadding());const a=Math.max(0,t.outerWidth-Hd(r,e,"left","right")),l=Math.max(0,t.outerHeight-Hd(r,e,"top","bottom")),c=a!==e.w,d=l!==e.h;return e.w=a,e.h=l,n.horizontal?{same:c,other:d}:{same:d,other:c}}function Uk(e){const t=e.maxPadding;function n(i){const s=Math.max(t[i]-e[i],0);return e[i]+=s,s}e.y+=n("top"),e.x+=n("left"),n("right"),n("bottom")}function qk(e,t){const n=t.maxPadding;function i(s){const o={left:0,top:0,right:0,bottom:0};return s.forEach(r=>{o[r]=Math.max(t[r],n[r])}),o}return i(e?["left","right"]:["top","bottom"])}function xi(e,t,n,i){const s=[];let o,r,a,l,c,d;for(o=0,r=e.length,c=0;o<r;++o){a=e[o],l=a.box,l.update(a.width||t.w,a.height||t.h,qk(a.horizontal,t));const{same:u,other:h}=Hk(t,n,a,i);c|=u&&s.length,d=d||h,l.fullSize||s.push(a)}return c&&xi(s,t,n,i)||d}function Es(e,t,n,i,s){e.top=n,e.left=t,e.right=t+i,e.bottom=n+s,e.width=i,e.height=s}function Ud(e,t,n,i){const s=n.padding;let{x:o,y:r}=t;for(const a of e){const l=a.box,c=i[a.stack]||{placed:0,weight:1},d=a.stackWeight/c.weight||1;if(a.horizontal){const u=t.w*d,h=c.size||l.height;ro(c.start)&&(r=c.start),l.fullSize?Es(l,s.left,r,n.outerWidth-s.right-s.left,h):Es(l,t.left+c.placed,r,u,h),c.start=r,c.placed+=u,r=l.bottom}else{const u=t.h*d,h=c.size||l.width;ro(c.start)&&(o=c.start),l.fullSize?Es(l,o,s.top,h,n.outerHeight-s.bottom-s.top):Es(l,o,t.top+c.placed,h,u),c.start=o,c.placed+=u,o=l.right}}t.x=o,t.y=r}var Mt={addBox(e,t){e.boxes||(e.boxes=[]),t.fullSize=t.fullSize||!1,t.position=t.position||"top",t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(n){t.draw(n)}}]},e.boxes.push(t)},removeBox(e,t){const n=e.boxes?e.boxes.indexOf(t):-1;n!==-1&&e.boxes.splice(n,1)},configure(e,t,n){t.fullSize=n.fullSize,t.position=n.position,t.weight=n.weight},update(e,t,n,i){if(!e)return;const s=nt(e.options.layout.padding),o=Math.max(t-s.width,0),r=Math.max(n-s.height,0),a=zk(e.boxes),l=a.vertical,c=a.horizontal;ie(e.boxes,y=>{typeof y.beforeLayout=="function"&&y.beforeLayout()});const d=l.reduce((y,_)=>_.box.options&&_.box.options.display===!1?y:y+1,0)||1,u=Object.freeze({outerWidth:t,outerHeight:n,padding:s,availableWidth:o,availableHeight:r,vBoxMaxWidth:o/2/d,hBoxMaxHeight:r/2}),h=Object.assign({},s);Vf(h,nt(i));const g=Object.assign({maxPadding:h,w:o,h:r,x:s.left,y:s.top},s),m=Bk(l.concat(c),u);xi(a.fullSize,g,u,m),xi(l,g,u,m),xi(c,g,u,m)&&xi(l,g,u,m),Uk(g),Ud(a.leftAndTop,g,u,m),g.x+=g.w,g.y+=g.h,Ud(a.rightAndBottom,g,u,m),e.chartArea={left:g.left,top:g.top,right:g.left+g.w,bottom:g.top+g.h,height:g.h,width:g.w},ie(a.chartArea,y=>{const _=y.box;Object.assign(_,e.chartArea),_.update(g.w,g.h,{left:0,top:0,right:0,bottom:0})})}};class Gf{acquireContext(t,n){}releaseContext(t){return!1}addEventListener(t,n,i){}removeEventListener(t,n,i){}getDevicePixelRatio(){return 1}getMaximumSize(t,n,i,s){return n=Math.max(0,n||t.width),i=i||t.height,{width:n,height:Math.max(0,s?Math.floor(n/s):i)}}isAttached(t){return!0}updateConfig(t){}}class jk extends Gf{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const qs="$chartjs",Kk={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},qd=e=>e===null||e==="";function Wk(e,t){const n=e.style,i=e.getAttribute("height"),s=e.getAttribute("width");if(e[qs]={initial:{height:i,width:s,style:{display:n.display,height:n.height,width:n.width}}},n.display=n.display||"block",n.boxSizing=n.boxSizing||"border-box",qd(s)){const o=Ed(e,"width");o!==void 0&&(e.width=o)}if(qd(i))if(e.style.height==="")e.height=e.width/(t||2);else{const o=Ed(e,"height");o!==void 0&&(e.height=o)}return e}const Qf=ok?{passive:!0}:!1;function Vk(e,t,n){e&&e.addEventListener(t,n,Qf)}function Gk(e,t,n){e&&e.canvas&&e.canvas.removeEventListener(t,n,Qf)}function Qk(e,t){const n=Kk[e.type]||e.type,{x:i,y:s}=tn(e,t);return{type:n,chart:t,native:e,x:i!==void 0?i:null,y:s!==void 0?s:null}}function uo(e,t){for(const n of e)if(n===t||n.contains(t))return!0}function Yk(e,t,n){const i=e.canvas,s=new MutationObserver(o=>{let r=!1;for(const a of o)r=r||uo(a.addedNodes,i),r=r&&!uo(a.removedNodes,i);r&&n()});return s.observe(document,{childList:!0,subtree:!0}),s}function Xk(e,t,n){const i=e.canvas,s=new MutationObserver(o=>{let r=!1;for(const a of o)r=r||uo(a.removedNodes,i),r=r&&!uo(a.addedNodes,i);r&&n()});return s.observe(document,{childList:!0,subtree:!0}),s}const Wi=new Map;let jd=0;function Yf(){const e=window.devicePixelRatio;e!==jd&&(jd=e,Wi.forEach((t,n)=>{n.currentDevicePixelRatio!==e&&t()}))}function Jk(e,t){Wi.size||window.addEventListener("resize",Yf),Wi.set(e,t)}function Zk(e){Wi.delete(e),Wi.size||window.removeEventListener("resize",Yf)}function e2(e,t,n){const i=e.canvas,s=i&&bl(i);if(!s)return;const o=Tf((a,l)=>{const c=s.clientWidth;n(a,l),c<s.clientWidth&&n()},window),r=new ResizeObserver(a=>{const l=a[0],c=l.contentRect.width,d=l.contentRect.height;c===0&&d===0||o(c,d)});return r.observe(s),Jk(e,o),r}function Rr(e,t,n){n&&n.disconnect(),t==="resize"&&Zk(e)}function t2(e,t,n){const i=e.canvas,s=Tf(o=>{e.ctx!==null&&n(Qk(o,e))},e);return Vk(i,t,s),s}class n2 extends Gf{acquireContext(t,n){const i=t&&t.getContext&&t.getContext("2d");return i&&i.canvas===t?(Wk(t,n),i):null}releaseContext(t){const n=t.canvas;if(!n[qs])return!1;const i=n[qs].initial;["height","width"].forEach(o=>{const r=i[o];le(r)?n.removeAttribute(o):n.setAttribute(o,r)});const s=i.style||{};return Object.keys(s).forEach(o=>{n.style[o]=s[o]}),n.width=n.width,delete n[qs],!0}addEventListener(t,n,i){this.removeEventListener(t,n);const s=t.$proxies||(t.$proxies={}),r={attach:Yk,detach:Xk,resize:e2}[n]||t2;s[n]=r(t,n,i)}removeEventListener(t,n){const i=t.$proxies||(t.$proxies={}),s=i[n];if(!s)return;({attach:Rr,detach:Rr,resize:Rr}[n]||Gk)(t,n,s),i[n]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,n,i,s){return sk(t,n,i,s)}isAttached(t){const n=t&&bl(t);return!!(n&&n.isConnected)}}function i2(e){return!vl()||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas?jk:n2}class Ht{constructor(){N(this,"x");N(this,"y");N(this,"active",!1);N(this,"options");N(this,"$animations")}tooltipPosition(t){const{x:n,y:i}=this.getProps(["x","y"],t);return{x:n,y:i}}hasValue(){return ji(this.x)&&ji(this.y)}getProps(t,n){const i=this.$animations;if(!n||!i)return this;const s={};return t.forEach(o=>{s[o]=i[o]&&i[o].active()?i[o]._to:this[o]}),s}}N(Ht,"defaults",{}),N(Ht,"defaultRoutes");function s2(e,t){const n=e.options.ticks,i=o2(e),s=Math.min(n.maxTicksLimit||i,i),o=n.major.enabled?a2(t):[],r=o.length,a=o[0],l=o[r-1],c=[];if(r>s)return l2(t,c,o,r/s),c;const d=r2(o,t,s);if(r>0){let u,h;const g=r>1?Math.round((l-a)/(r-1)):null;for(Rs(t,c,d,le(g)?0:a-g,a),u=0,h=r-1;u<h;u++)Rs(t,c,d,o[u],o[u+1]);return Rs(t,c,d,l,le(g)?t.length:l+g),c}return Rs(t,c,d),c}function o2(e){const t=e.options.offset,n=e._tickSize(),i=e._length/n+(t?0:1),s=e._maxLength/n;return Math.floor(Math.min(i,s))}function r2(e,t,n){const i=c2(e),s=t.length/n;if(!i)return Math.max(s,1);const o=e1(i);for(let r=0,a=o.length-1;r<a;r++){const l=o[r];if(l>s)return l}return Math.max(s,1)}function a2(e){const t=[];let n,i;for(n=0,i=e.length;n<i;n++)e[n].major&&t.push(n);return t}function l2(e,t,n,i){let s=0,o=n[0],r;for(i=Math.ceil(i),r=0;r<e.length;r++)r===o&&(t.push(e[r]),s++,o=n[s*i])}function Rs(e,t,n,i,s){const o=Y(i,0),r=Math.min(Y(s,e.length),e.length);let a=0,l,c,d;for(n=Math.ceil(n),s&&(l=s-i,n=l/Math.floor(l/n)),d=o;d<0;)a++,d=Math.round(o+a*n);for(c=Math.max(o,0);c<r;c++)c===d&&(t.push(e[c]),a++,d=Math.round(o+a*n))}function c2(e){const t=e.length;let n,i;if(t<2)return!1;for(i=e[0],n=1;n<t;++n)if(e[n]-e[n-1]!==i)return!1;return i}const d2=e=>e==="left"?"right":e==="right"?"left":e,Kd=(e,t,n)=>t==="top"||t==="left"?e[t]+n:e[t]-n,Wd=(e,t)=>Math.min(t||e,e);function Vd(e,t){const n=[],i=e.length/t,s=e.length;let o=0;for(;o<s;o+=i)n.push(e[Math.floor(o)]);return n}function u2(e,t,n){const i=e.ticks.length,s=Math.min(t,i-1),o=e._startPixel,r=e._endPixel,a=1e-6;let l=e.getPixelForTick(s),c;if(!(n&&(i===1?c=Math.max(l-o,r-l):t===0?c=(e.getPixelForTick(1)-l)/2:c=(l-e.getPixelForTick(s-1))/2,l+=s<t?c:-c,l<o-a||l>r+a)))return l}function h2(e,t){ie(e,n=>{const i=n.gc,s=i.length/2;let o;if(s>t){for(o=0;o<s;++o)delete n.data[i[o]];i.splice(0,s)}})}function gi(e){return e.drawTicks?e.tickLength:0}function Gd(e,t){if(!e.display)return 0;const n=ze(e.font,t),i=nt(e.padding);return(_e(e.text)?e.text.length:1)*n.lineHeight+i.height}function f2(e,t){return Sn(e,{scale:t,type:"scale"})}function p2(e,t,n){return Sn(e,{tick:n,index:t,type:"tick"})}function g2(e,t,n){let i=Cf(e);return(n&&t!=="right"||!n&&t==="right")&&(i=d2(i)),i}function m2(e,t,n,i){const{top:s,left:o,bottom:r,right:a,chart:l}=e,{chartArea:c,scales:d}=l;let u=0,h,g,m;const y=r-s,_=a-o;if(e.isHorizontal()){if(g=Ue(i,o,a),X(n)){const S=Object.keys(n)[0],R=n[S];m=d[S].getPixelForValue(R)+y-t}else n==="center"?m=(c.bottom+c.top)/2+y-t:m=Kd(e,n,t);h=a-o}else{if(X(n)){const S=Object.keys(n)[0],R=n[S];g=d[S].getPixelForValue(R)-_+t}else n==="center"?g=(c.left+c.right)/2-_+t:g=Kd(e,n,t);m=Ue(i,r,s),u=n==="left"?-Ze:Ze}return{titleX:g,titleY:m,maxWidth:h,rotation:u}}class ei extends Ht{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,n){return t}getUserBounds(){let{_userMin:t,_userMax:n,_suggestedMin:i,_suggestedMax:s}=this;return t=rt(t,Number.POSITIVE_INFINITY),n=rt(n,Number.NEGATIVE_INFINITY),i=rt(i,Number.POSITIVE_INFINITY),s=rt(s,Number.NEGATIVE_INFINITY),{min:rt(t,i),max:rt(n,s),minDefined:Re(t),maxDefined:Re(n)}}getMinMax(t){let{min:n,max:i,minDefined:s,maxDefined:o}=this.getUserBounds(),r;if(s&&o)return{min:n,max:i};const a=this.getMatchingVisibleMetas();for(let l=0,c=a.length;l<c;++l)r=a[l].controller.getMinMax(this,t),s||(n=Math.min(n,r.min)),o||(i=Math.max(i,r.max));return n=o&&n>i?i:n,i=s&&n>i?n:i,{min:rt(n,rt(i,n)),max:rt(i,rt(n,i))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){ce(this.options.beforeUpdate,[this])}update(t,n,i){const{beginAtZero:s,grace:o,ticks:r}=this.options,a=r.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=n,this._margins=i=Object.assign({left:0,right:0,top:0,bottom:0},i),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+i.left+i.right:this.height+i.top+i.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=O1(this,o,s),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const l=a<this.ticks.length;this._convertTicksToLabels(l?Vd(this.ticks,a):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),r.display&&(r.autoSkip||r.source==="auto")&&(this.ticks=s2(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),l&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t=this.options.reverse,n,i;this.isHorizontal()?(n=this.left,i=this.right):(n=this.top,i=this.bottom,t=!t),this._startPixel=n,this._endPixel=i,this._reversePixels=t,this._length=i-n,this._alignToPixels=this.options.alignToPixels}afterUpdate(){ce(this.options.afterUpdate,[this])}beforeSetDimensions(){ce(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){ce(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),ce(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){ce(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const n=this.options.ticks;let i,s,o;for(i=0,s=t.length;i<s;i++)o=t[i],o.label=ce(n.callback,[o.value,i,t],this)}afterTickToLabelConversion(){ce(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){ce(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,n=t.ticks,i=Wd(this.ticks.length,t.ticks.maxTicksLimit),s=n.minRotation||0,o=n.maxRotation;let r=s,a,l,c;if(!this._isVisible()||!n.display||s>=o||i<=1||!this.isHorizontal()){this.labelRotation=s;return}const d=this._getLabelSizes(),u=d.widest.width,h=d.highest.height,g=je(this.chart.width-u,0,this.maxWidth);a=t.offset?this.maxWidth/i:g/(i-1),u+6>a&&(a=g/(i-(t.offset?.5:1)),l=this.maxHeight-gi(t.grid)-n.padding-Gd(t.title,this.chart.options.font),c=Math.sqrt(u*u+h*h),r=s1(Math.min(Math.asin(je((d.highest.height+6)/a,-1,1)),Math.asin(je(l/c,-1,1))-Math.asin(je(h/c,-1,1)))),r=Math.max(s,Math.min(o,r))),this.labelRotation=r}afterCalculateLabelRotation(){ce(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){ce(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:n,options:{ticks:i,title:s,grid:o}}=this,r=this._isVisible(),a=this.isHorizontal();if(r){const l=Gd(s,n.options.font);if(a?(t.width=this.maxWidth,t.height=gi(o)+l):(t.height=this.maxHeight,t.width=gi(o)+l),i.display&&this.ticks.length){const{first:c,last:d,widest:u,highest:h}=this._getLabelSizes(),g=i.padding*2,m=an(this.labelRotation),y=Math.cos(m),_=Math.sin(m);if(a){const S=i.mirror?0:_*u.width+y*h.height;t.height=Math.min(this.maxHeight,t.height+S+g)}else{const S=i.mirror?0:y*u.width+_*h.height;t.width=Math.min(this.maxWidth,t.width+S+g)}this._calculatePadding(c,d,_,y)}}this._handleMargins(),a?(this.width=this._length=n.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=n.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,n,i,s){const{ticks:{align:o,padding:r},position:a}=this.options,l=this.labelRotation!==0,c=a!=="top"&&this.axis==="x";if(this.isHorizontal()){const d=this.getPixelForTick(0)-this.left,u=this.right-this.getPixelForTick(this.ticks.length-1);let h=0,g=0;l?c?(h=s*t.width,g=i*n.height):(h=i*t.height,g=s*n.width):o==="start"?g=n.width:o==="end"?h=t.width:o!=="inner"&&(h=t.width/2,g=n.width/2),this.paddingLeft=Math.max((h-d+r)*this.width/(this.width-d),0),this.paddingRight=Math.max((g-u+r)*this.width/(this.width-u),0)}else{let d=n.height/2,u=t.height/2;o==="start"?(d=0,u=t.height):o==="end"&&(d=n.height,u=0),this.paddingTop=d+r,this.paddingBottom=u+r}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){ce(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:n}=this.options;return n==="top"||n==="bottom"||t==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){this.beforeTickToLabelConversion(),this.generateTickLabels(t);let n,i;for(n=0,i=t.length;n<i;n++)le(t[n].label)&&(t.splice(n,1),i--,n--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const n=this.options.ticks.sampleSize;let i=this.ticks;n<i.length&&(i=Vd(i,n)),this._labelSizes=t=this._computeLabelSizes(i,i.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,n,i){const{ctx:s,_longestTextCache:o}=this,r=[],a=[],l=Math.floor(n/Wd(n,i));let c=0,d=0,u,h,g,m,y,_,S,R,M,A,T;for(u=0;u<n;u+=l){if(m=t[u].label,y=this._resolveTickFontOptions(u),s.font=_=y.string,S=o[_]=o[_]||{data:{},gc:[]},R=y.lineHeight,M=A=0,!le(m)&&!_e(m))M=$d(s,S.data,S.gc,M,m),A=R;else if(_e(m))for(h=0,g=m.length;h<g;++h)T=m[h],!le(T)&&!_e(T)&&(M=$d(s,S.data,S.gc,M,T),A+=R);r.push(M),a.push(A),c=Math.max(M,c),d=Math.max(A,d)}h2(o,n);const v=r.indexOf(c),E=a.indexOf(d),P=C=>({width:r[C]||0,height:a[C]||0});return{first:P(0),last:P(n-1),widest:P(v),highest:P(E),widths:r,heights:a}}getLabelForValue(t){return t}getPixelForValue(t,n){return NaN}getValueForPixel(t){}getPixelForTick(t){const n=this.ticks;return t<0||t>n.length-1?null:this.getPixelForValue(n[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const n=this._startPixel+t*this._length;return a1(this._alignToPixels?Jt(this.chart,n,0):n)}getDecimalForPixel(t){const n=(t-this._startPixel)/this._length;return this._reversePixels?1-n:n}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:n}=this;return t<0&&n<0?n:t>0&&n>0?t:0}getContext(t){const n=this.ticks||[];if(t>=0&&t<n.length){const i=n[t];return i.$context||(i.$context=p2(this.getContext(),t,i))}return this.$context||(this.$context=f2(this.chart.getContext(),this))}_tickSize(){const t=this.options.ticks,n=an(this.labelRotation),i=Math.abs(Math.cos(n)),s=Math.abs(Math.sin(n)),o=this._getLabelSizes(),r=t.autoSkipPadding||0,a=o?o.widest.width+r:0,l=o?o.highest.height+r:0;return this.isHorizontal()?l*i>a*s?a/i:l/s:l*s<a*i?l/i:a/s}_isVisible(){const t=this.options.display;return t!=="auto"?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const n=this.axis,i=this.chart,s=this.options,{grid:o,position:r,border:a}=s,l=o.offset,c=this.isHorizontal(),u=this.ticks.length+(l?1:0),h=gi(o),g=[],m=a.setContext(this.getContext()),y=m.display?m.width:0,_=y/2,S=function(H){return Jt(i,H,y)};let R,M,A,T,v,E,P,C,O,D,F,j;if(r==="top")R=S(this.bottom),E=this.bottom-h,C=R-_,D=S(t.top)+_,j=t.bottom;else if(r==="bottom")R=S(this.top),D=t.top,j=S(t.bottom)-_,E=R+_,C=this.top+h;else if(r==="left")R=S(this.right),v=this.right-h,P=R-_,O=S(t.left)+_,F=t.right;else if(r==="right")R=S(this.left),O=t.left,F=S(t.right)-_,v=R+_,P=this.left+h;else if(n==="x"){if(r==="center")R=S((t.top+t.bottom)/2+.5);else if(X(r)){const H=Object.keys(r)[0],ee=r[H];R=S(this.chart.scales[H].getPixelForValue(ee))}D=t.top,j=t.bottom,E=R+_,C=E+h}else if(n==="y"){if(r==="center")R=S((t.left+t.right)/2);else if(X(r)){const H=Object.keys(r)[0],ee=r[H];R=S(this.chart.scales[H].getPixelForValue(ee))}v=R-_,P=v-h,O=t.left,F=t.right}const G=Y(s.ticks.maxTicksLimit,u),L=Math.max(1,Math.ceil(u/G));for(M=0;M<u;M+=L){const H=this.getContext(M),ee=o.setContext(H),B=a.setContext(H),we=ee.lineWidth,$e=ee.color,oe=B.dash||[],Ie=B.dashOffset,re=ee.tickWidth,He=ee.tickColor,ne=ee.tickBorderDash||[],Se=ee.tickBorderDashOffset;A=u2(this,M,l),A!==void 0&&(T=Jt(i,A,we),c?v=P=O=F=T:E=C=D=j=T,g.push({tx1:v,ty1:E,tx2:P,ty2:C,x1:O,y1:D,x2:F,y2:j,width:we,color:$e,borderDash:oe,borderDashOffset:Ie,tickWidth:re,tickColor:He,tickBorderDash:ne,tickBorderDashOffset:Se}))}return this._ticksLength=u,this._borderValue=R,g}_computeLabelItems(t){const n=this.axis,i=this.options,{position:s,ticks:o}=i,r=this.isHorizontal(),a=this.ticks,{align:l,crossAlign:c,padding:d,mirror:u}=o,h=gi(i.grid),g=h+d,m=u?-d:g,y=-an(this.labelRotation),_=[];let S,R,M,A,T,v,E,P,C,O,D,F,j="middle";if(s==="top")v=this.bottom-m,E=this._getXAxisLabelAlignment();else if(s==="bottom")v=this.top+m,E=this._getXAxisLabelAlignment();else if(s==="left"){const L=this._getYAxisLabelAlignment(h);E=L.textAlign,T=L.x}else if(s==="right"){const L=this._getYAxisLabelAlignment(h);E=L.textAlign,T=L.x}else if(n==="x"){if(s==="center")v=(t.top+t.bottom)/2+g;else if(X(s)){const L=Object.keys(s)[0],H=s[L];v=this.chart.scales[L].getPixelForValue(H)+g}E=this._getXAxisLabelAlignment()}else if(n==="y"){if(s==="center")T=(t.left+t.right)/2-g;else if(X(s)){const L=Object.keys(s)[0],H=s[L];T=this.chart.scales[L].getPixelForValue(H)}E=this._getYAxisLabelAlignment(h).textAlign}n==="y"&&(l==="start"?j="top":l==="end"&&(j="bottom"));const G=this._getLabelSizes();for(S=0,R=a.length;S<R;++S){M=a[S],A=M.label;const L=o.setContext(this.getContext(S));P=this.getPixelForTick(S)+o.labelOffset,C=this._resolveTickFontOptions(S),O=C.lineHeight,D=_e(A)?A.length:1;const H=D/2,ee=L.color,B=L.textStrokeColor,we=L.textStrokeWidth;let $e=E;r?(T=P,E==="inner"&&(S===R-1?$e=this.options.reverse?"left":"right":S===0?$e=this.options.reverse?"right":"left":$e="center"),s==="top"?c==="near"||y!==0?F=-D*O+O/2:c==="center"?F=-G.highest.height/2-H*O+O:F=-G.highest.height+O/2:c==="near"||y!==0?F=O/2:c==="center"?F=G.highest.height/2-H*O:F=G.highest.height-D*O,u&&(F*=-1),y!==0&&!L.showLabelBackdrop&&(T+=O/2*Math.sin(y))):(v=P,F=(1-D)*O/2);let oe;if(L.showLabelBackdrop){const Ie=nt(L.backdropPadding),re=G.heights[S],He=G.widths[S];let ne=F-Ie.top,Se=0-Ie.left;switch(j){case"middle":ne-=re/2;break;case"bottom":ne-=re;break}switch(E){case"center":Se-=He/2;break;case"right":Se-=He;break;case"inner":S===R-1?Se-=He:S>0&&(Se-=He/2);break}oe={left:Se,top:ne,width:He+Ie.width,height:re+Ie.height,color:L.backdropColor}}_.push({label:A,font:C,textOffset:F,options:{rotation:y,color:ee,strokeColor:B,strokeWidth:we,textAlign:$e,textBaseline:j,translation:[T,v],backdrop:oe}})}return _}_getXAxisLabelAlignment(){const{position:t,ticks:n}=this.options;if(-an(this.labelRotation))return t==="top"?"left":"right";let s="center";return n.align==="start"?s="left":n.align==="end"?s="right":n.align==="inner"&&(s="inner"),s}_getYAxisLabelAlignment(t){const{position:n,ticks:{crossAlign:i,mirror:s,padding:o}}=this.options,r=this._getLabelSizes(),a=t+o,l=r.widest.width;let c,d;return n==="left"?s?(d=this.right+o,i==="near"?c="left":i==="center"?(c="center",d+=l/2):(c="right",d+=l)):(d=this.right-a,i==="near"?c="right":i==="center"?(c="center",d-=l/2):(c="left",d=this.left)):n==="right"?s?(d=this.left+o,i==="near"?c="right":i==="center"?(c="center",d-=l/2):(c="left",d-=l)):(d=this.left+a,i==="near"?c="left":i==="center"?(c="center",d+=l/2):(c="right",d=this.right)):c="right",{textAlign:c,x:d}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,n=this.options.position;if(n==="left"||n==="right")return{top:0,left:this.left,bottom:t.height,right:this.right};if(n==="top"||n==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:t.width}}drawBackground(){const{ctx:t,options:{backgroundColor:n},left:i,top:s,width:o,height:r}=this;n&&(t.save(),t.fillStyle=n,t.fillRect(i,s,o,r),t.restore())}getLineWidthForValue(t){const n=this.options.grid;if(!this._isVisible()||!n.display)return 0;const s=this.ticks.findIndex(o=>o.value===t);return s>=0?n.setContext(this.getContext(s)).lineWidth:0}drawGrid(t){const n=this.options.grid,i=this.ctx,s=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let o,r;const a=(l,c,d)=>{!d.width||!d.color||(i.save(),i.lineWidth=d.width,i.strokeStyle=d.color,i.setLineDash(d.borderDash||[]),i.lineDashOffset=d.borderDashOffset,i.beginPath(),i.moveTo(l.x,l.y),i.lineTo(c.x,c.y),i.stroke(),i.restore())};if(n.display)for(o=0,r=s.length;o<r;++o){const l=s[o];n.drawOnChartArea&&a({x:l.x1,y:l.y1},{x:l.x2,y:l.y2},l),n.drawTicks&&a({x:l.tx1,y:l.ty1},{x:l.tx2,y:l.ty2},{color:l.tickColor,width:l.tickWidth,borderDash:l.tickBorderDash,borderDashOffset:l.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:n,options:{border:i,grid:s}}=this,o=i.setContext(this.getContext()),r=i.display?o.width:0;if(!r)return;const a=s.setContext(this.getContext(0)).lineWidth,l=this._borderValue;let c,d,u,h;this.isHorizontal()?(c=Jt(t,this.left,r)-r/2,d=Jt(t,this.right,a)+a/2,u=h=l):(u=Jt(t,this.top,r)-r/2,h=Jt(t,this.bottom,a)+a/2,c=d=l),n.save(),n.lineWidth=o.width,n.strokeStyle=o.color,n.beginPath(),n.moveTo(c,u),n.lineTo(d,h),n.stroke(),n.restore()}drawLabels(t){if(!this.options.ticks.display)return;const i=this.ctx,s=this._computeLabelArea();s&&Po(i,s);const o=this.getLabelItems(t);for(const r of o){const a=r.options,l=r.font,c=r.label,d=r.textOffset;lo(i,c,0,d,l,a)}s&&Mo(i)}drawTitle(){const{ctx:t,options:{position:n,title:i,reverse:s}}=this;if(!i.display)return;const o=ze(i.font),r=nt(i.padding),a=i.align;let l=o.lineHeight/2;n==="bottom"||n==="center"||X(n)?(l+=r.bottom,_e(i.text)&&(l+=o.lineHeight*(i.text.length-1))):l+=r.top;const{titleX:c,titleY:d,maxWidth:u,rotation:h}=m2(this,l,n,a);lo(t,i.text,0,0,o,{color:i.color,maxWidth:u,rotation:h,textAlign:g2(a,n,s),textBaseline:"middle",translation:[c,d]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,n=t.ticks&&t.ticks.z||0,i=Y(t.grid&&t.grid.z,-1),s=Y(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==ei.prototype.draw?[{z:n,draw:o=>{this.draw(o)}}]:[{z:i,draw:o=>{this.drawBackground(),this.drawGrid(o),this.drawTitle()}},{z:s,draw:()=>{this.drawBorder()}},{z:n,draw:o=>{this.drawLabels(o)}}]}getMatchingVisibleMetas(t){const n=this.chart.getSortedVisibleDatasetMetas(),i=this.axis+"AxisID",s=[];let o,r;for(o=0,r=n.length;o<r;++o){const a=n[o];a[i]===this.id&&(!t||a.type===t)&&s.push(a)}return s}_resolveTickFontOptions(t){const n=this.options.ticks.setContext(this.getContext(t));return ze(n.font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class Ps{constructor(t,n,i){this.type=t,this.scope=n,this.override=i,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const n=Object.getPrototypeOf(t);let i;b2(n)&&(i=this.register(n));const s=this.items,o=t.id,r=this.scope+"."+o;if(!o)throw new Error("class does not have id: "+t);return o in s||(s[o]=t,y2(t,r,i),this.override&&pe.override(t.id,t.overrides)),r}get(t){return this.items[t]}unregister(t){const n=this.items,i=t.id,s=this.scope;i in n&&delete n[i],s&&i in pe[s]&&(delete pe[s][i],this.override&&delete _n[i])}}function y2(e,t,n){const i=qi(Object.create(null),[n?pe.get(n):{},pe.get(t),e.defaults]);pe.set(t,i),e.defaultRoutes&&v2(t,e.defaultRoutes),e.descriptors&&pe.describe(t,e.descriptors)}function v2(e,t){Object.keys(t).forEach(n=>{const i=n.split("."),s=i.pop(),o=[e].concat(i).join("."),r=t[n].split("."),a=r.pop(),l=r.join(".");pe.route(o,s,l,a)})}function b2(e){return"id"in e&&"defaults"in e}class w2{constructor(){this.controllers=new Ps(Li,"datasets",!0),this.elements=new Ps(Ht,"elements"),this.plugins=new Ps(Object,"plugins"),this.scales=new Ps(ei,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,n,i){[...n].forEach(s=>{const o=i||this._getRegistryForType(s);i||o.isForType(s)||o===this.plugins&&s.id?this._exec(t,o,s):ie(s,r=>{const a=i||this._getRegistryForType(r);this._exec(t,a,r)})})}_exec(t,n,i){const s=hl(t);ce(i["before"+s],[],i),n[t](i),ce(i["after"+s],[],i)}_getRegistryForType(t){for(let n=0;n<this._typedRegistries.length;n++){const i=this._typedRegistries[n];if(i.isForType(t))return i}return this.plugins}_get(t,n,i){const s=n.get(t);if(s===void 0)throw new Error('"'+t+'" is not a registered '+i+".");return s}}var dt=new w2;class x2{constructor(){this._init=void 0}notify(t,n,i,s){if(n==="beforeInit"&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install")),this._init===void 0)return;const o=s?this._descriptors(t).filter(s):this._descriptors(t),r=this._notify(o,t,n,i);return n==="afterDestroy"&&(this._notify(o,t,"stop"),this._notify(this._init,t,"uninstall"),this._init=void 0),r}_notify(t,n,i,s){s=s||{};for(const o of t){const r=o.plugin,a=r[i],l=[n,s,o.options];if(ce(a,l,r)===!1&&s.cancelable)return!1}return!0}invalidate(){le(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const n=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),n}_createDescriptors(t,n){const i=t&&t.config,s=Y(i.options&&i.options.plugins,{}),o=_2(i);return s===!1&&!n?[]:$2(t,o,s,n)}_notifyStateChanges(t){const n=this._oldCache||[],i=this._cache,s=(o,r)=>o.filter(a=>!r.some(l=>a.plugin.id===l.plugin.id));this._notify(s(n,i),t,"stop"),this._notify(s(i,n),t,"start")}}function _2(e){const t={},n=[],i=Object.keys(dt.plugins.items);for(let o=0;o<i.length;o++)n.push(dt.getPlugin(i[o]));const s=e.plugins||[];for(let o=0;o<s.length;o++){const r=s[o];n.indexOf(r)===-1&&(n.push(r),t[r.id]=!0)}return{plugins:n,localIds:t}}function k2(e,t){return!t&&e===!1?null:e===!0?{}:e}function $2(e,{plugins:t,localIds:n},i,s){const o=[],r=e.getContext();for(const a of t){const l=a.id,c=k2(i[l],s);c!==null&&o.push({plugin:a,options:S2(e.config,{plugin:a,local:n[l]},c,r)})}return o}function S2(e,{plugin:t,local:n},i,s){const o=e.pluginScopeKeys(t),r=e.getOptionScopes(i,o);return n&&t.defaults&&r.push(t.defaults),e.createResolver(r,s,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function ha(e,t){const n=pe.datasets[e]||{};return((t.datasets||{})[e]||{}).indexAxis||t.indexAxis||n.indexAxis||"x"}function A2(e,t){let n=e;return e==="_index_"?n=t:e==="_value_"&&(n=t==="x"?"y":"x"),n}function T2(e,t){return e===t?"_index_":"_value_"}function Qd(e){if(e==="x"||e==="y"||e==="r")return e}function C2(e){if(e==="top"||e==="bottom")return"x";if(e==="left"||e==="right")return"y"}function fa(e,...t){if(Qd(e))return e;for(const n of t){const i=n.axis||C2(n.position)||e.length>1&&Qd(e[0].toLowerCase());if(i)return i}throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`)}function Yd(e,t,n){if(n[t+"AxisID"]===e)return{axis:t}}function E2(e,t){if(t.data&&t.data.datasets){const n=t.data.datasets.filter(i=>i.xAxisID===e||i.yAxisID===e);if(n.length)return Yd(e,"x",n[0])||Yd(e,"y",n[0])}return{}}function R2(e,t){const n=_n[e.type]||{scales:{}},i=t.scales||{},s=ha(e.type,t),o=Object.create(null);return Object.keys(i).forEach(r=>{const a=i[r];if(!X(a))return console.error(`Invalid scale configuration for scale: ${r}`);if(a._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${r}`);const l=fa(r,a,E2(r,e),pe.scales[a.type]),c=T2(l,s),d=n.scales||{};o[r]=Ei(Object.create(null),[{axis:l},a,d[l],d[c]])}),e.data.datasets.forEach(r=>{const a=r.type||e.type,l=r.indexAxis||ha(a,t),d=(_n[a]||{}).scales||{};Object.keys(d).forEach(u=>{const h=A2(u,l),g=r[h+"AxisID"]||h;o[g]=o[g]||Object.create(null),Ei(o[g],[{axis:h},i[g],d[u]])})}),Object.keys(o).forEach(r=>{const a=o[r];Ei(a,[pe.scales[a.type],pe.scale])}),o}function Xf(e){const t=e.options||(e.options={});t.plugins=Y(t.plugins,{}),t.scales=R2(e,t)}function Jf(e){return e=e||{},e.datasets=e.datasets||[],e.labels=e.labels||[],e}function P2(e){return e=e||{},e.data=Jf(e.data),Xf(e),e}const Xd=new Map,Zf=new Set;function Ms(e,t){let n=Xd.get(e);return n||(n=t(),Xd.set(e,n),Zf.add(n)),n}const mi=(e,t,n)=>{const i=oo(t,n);i!==void 0&&e.add(i)};class M2{constructor(t){this._config=P2(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=Jf(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),Xf(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return Ms(t,()=>[[`datasets.${t}`,""]])}datasetAnimationScopeKeys(t,n){return Ms(`${t}.transition.${n}`,()=>[[`datasets.${t}.transitions.${n}`,`transitions.${n}`],[`datasets.${t}`,""]])}datasetElementScopeKeys(t,n){return Ms(`${t}-${n}`,()=>[[`datasets.${t}.elements.${n}`,`datasets.${t}`,`elements.${n}`,""]])}pluginScopeKeys(t){const n=t.id,i=this.type;return Ms(`${i}-plugin-${n}`,()=>[[`plugins.${n}`,...t.additionalOptionScopes||[]]])}_cachedScopes(t,n){const i=this._scopeCache;let s=i.get(t);return(!s||n)&&(s=new Map,i.set(t,s)),s}getOptionScopes(t,n,i){const{options:s,type:o}=this,r=this._cachedScopes(t,i),a=r.get(n);if(a)return a;const l=new Set;n.forEach(d=>{t&&(l.add(t),d.forEach(u=>mi(l,t,u))),d.forEach(u=>mi(l,s,u)),d.forEach(u=>mi(l,_n[o]||{},u)),d.forEach(u=>mi(l,pe,u)),d.forEach(u=>mi(l,ca,u))});const c=Array.from(l);return c.length===0&&c.push(Object.create(null)),Zf.has(n)&&r.set(n,c),c}chartOptionScopes(){const{options:t,type:n}=this;return[t,_n[n]||{},pe.datasets[n]||{},{type:n},pe,ca]}resolveNamedOptions(t,n,i,s=[""]){const o={$shared:!0},{resolver:r,subPrefixes:a}=Jd(this._resolverCache,t,s);let l=r;if(L2(r,n)){o.$shared=!1,i=zt(i)?i():i;const c=this.createResolver(t,i,a);l=Yn(r,i,c)}for(const c of n)o[c]=l[c];return o}createResolver(t,n,i=[""],s){const{resolver:o}=Jd(this._resolverCache,t,i);return X(n)?Yn(o,n,void 0,s):o}}function Jd(e,t,n){let i=e.get(t);i||(i=new Map,e.set(t,i));const s=n.join();let o=i.get(s);return o||(o={resolver:gl(t,n),subPrefixes:n.filter(a=>!a.toLowerCase().includes("hover"))},i.set(s,o)),o}const D2=e=>X(e)&&Object.getOwnPropertyNames(e).some(t=>zt(e[t]));function L2(e,t){const{isScriptable:n,isIndexable:i}=Df(e);for(const s of t){const o=n(s),r=i(s),a=(r||o)&&e[s];if(o&&(zt(a)||D2(a))||r&&_e(a))return!0}return!1}var I2="4.5.1";const O2=["top","bottom","left","right","chartArea"];function Zd(e,t){return e==="top"||e==="bottom"||O2.indexOf(e)===-1&&t==="x"}function eu(e,t){return function(n,i){return n[e]===i[e]?n[t]-i[t]:n[e]-i[e]}}function tu(e){const t=e.chart,n=t.options.animation;t.notifyPlugins("afterRender"),ce(n&&n.onComplete,[e],t)}function F2(e){const t=e.chart,n=t.options.animation;ce(n&&n.onProgress,[e],t)}function ep(e){return vl()&&typeof e=="string"?e=document.getElementById(e):e&&e.length&&(e=e[0]),e&&e.canvas&&(e=e.canvas),e}const js={},nu=e=>{const t=ep(e);return Object.values(js).filter(n=>n.canvas===t).pop()};function N2(e,t,n){const i=Object.keys(e);for(const s of i){const o=+s;if(o>=t){const r=e[s];delete e[s],(n>0||o>t)&&(e[o+n]=r)}}}function B2(e,t,n,i){return!n||e.type==="mouseout"?null:i?t:e}class pt{static register(...t){dt.add(...t),iu()}static unregister(...t){dt.remove(...t),iu()}constructor(t,n){const i=this.config=new M2(n),s=ep(t),o=nu(s);if(o)throw new Error("Canvas is already in use. Chart with ID '"+o.id+"' must be destroyed before the canvas with ID '"+o.canvas.id+"' can be reused.");const r=i.createResolver(i.chartOptionScopes(),this.getContext());this.platform=new(i.platform||i2(s)),this.platform.updateConfig(i);const a=this.platform.acquireContext(s,r.aspectRatio),l=a&&a.canvas,c=l&&l.height,d=l&&l.width;if(this.id=K_(),this.ctx=a,this.canvas=l,this.width=d,this.height=c,this._options=r,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new x2,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=h1(u=>this.update(u),r.resizeDelay||0),this._dataChanges=[],js[this.id]=this,!a||!l){console.error("Failed to create chart: can't acquire context from the given item");return}xt.listen(this,"complete",tu),xt.listen(this,"progress",F2),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:t,maintainAspectRatio:n},width:i,height:s,_aspectRatio:o}=this;return le(t)?n&&o?o:s?i/s:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return dt}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():Cd(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return Sd(this.canvas,this.ctx),this}stop(){return xt.stop(this),this}resize(t,n){xt.running(this)?this._resizeBeforeDraw={width:t,height:n}:this._resize(t,n)}_resize(t,n){const i=this.options,s=this.canvas,o=i.maintainAspectRatio&&this.aspectRatio,r=this.platform.getMaximumSize(s,t,n,o),a=i.devicePixelRatio||this.platform.getDevicePixelRatio(),l=this.width?"resize":"attach";this.width=r.width,this.height=r.height,this._aspectRatio=this.aspectRatio,Cd(this,a,!0)&&(this.notifyPlugins("resize",{size:r}),ce(i.onResize,[this,r],this),this.attached&&this._doResize(l)&&this.render())}ensureScalesHaveIDs(){const n=this.options.scales||{};ie(n,(i,s)=>{i.id=s})}buildOrUpdateScales(){const t=this.options,n=t.scales,i=this.scales,s=Object.keys(i).reduce((r,a)=>(r[a]=!1,r),{});let o=[];n&&(o=o.concat(Object.keys(n).map(r=>{const a=n[r],l=fa(r,a),c=l==="r",d=l==="x";return{options:a,dposition:c?"chartArea":d?"bottom":"left",dtype:c?"radialLinear":d?"category":"linear"}}))),ie(o,r=>{const a=r.options,l=a.id,c=fa(l,a),d=Y(a.type,r.dtype);(a.position===void 0||Zd(a.position,c)!==Zd(r.dposition))&&(a.position=r.dposition),s[l]=!0;let u=null;if(l in i&&i[l].type===d)u=i[l];else{const h=dt.getScale(d);u=new h({id:l,type:d,ctx:this.ctx,chart:this}),i[u.id]=u}u.init(a,t)}),ie(s,(r,a)=>{r||delete i[a]}),ie(i,r=>{Mt.configure(this,r,r.options),Mt.addBox(this,r)})}_updateMetasets(){const t=this._metasets,n=this.data.datasets.length,i=t.length;if(t.sort((s,o)=>s.index-o.index),i>n){for(let s=n;s<i;++s)this._destroyDatasetMeta(s);t.splice(n,i-n)}this._sortedMetasets=t.slice(0).sort(eu("order","index"))}_removeUnreferencedMetasets(){const{_metasets:t,data:{datasets:n}}=this;t.length>n.length&&delete this._stacks,t.forEach((i,s)=>{n.filter(o=>o===i._dataset).length===0&&this._destroyDatasetMeta(s)})}buildOrUpdateControllers(){const t=[],n=this.data.datasets;let i,s;for(this._removeUnreferencedMetasets(),i=0,s=n.length;i<s;i++){const o=n[i];let r=this.getDatasetMeta(i);const a=o.type||this.config.type;if(r.type&&r.type!==a&&(this._destroyDatasetMeta(i),r=this.getDatasetMeta(i)),r.type=a,r.indexAxis=o.indexAxis||ha(a,this.options),r.order=o.order||0,r.index=i,r.label=""+o.label,r.visible=this.isDatasetVisible(i),r.controller)r.controller.updateIndex(i),r.controller.linkScales();else{const l=dt.getController(a),{datasetElementType:c,dataElementType:d}=pe.datasets[a];Object.assign(l,{dataElementType:dt.getElement(d),datasetElementType:c&&dt.getElement(c)}),r.controller=new l(this,i),t.push(r.controller)}}return this._updateMetasets(),t}_resetElements(){ie(this.data.datasets,(t,n)=>{this.getDatasetMeta(n).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){const n=this.config;n.update();const i=this._options=n.createResolver(n.chartOptionScopes(),this.getContext()),s=this._animationsDisabled=!i.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0})===!1)return;const o=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let r=0;for(let c=0,d=this.data.datasets.length;c<d;c++){const{controller:u}=this.getDatasetMeta(c),h=!s&&o.indexOf(u)===-1;u.buildOrUpdateElements(h),r=Math.max(+u.getMaxOverflow(),r)}r=this._minPadding=i.layout.autoPadding?r:0,this._updateLayout(r),s||ie(o,c=>{c.reset()}),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(eu("z","_idx"));const{_active:a,_lastEvent:l}=this;l?this._eventHandler(l,!0):a.length&&this._updateHoverStyles(a,a,!0),this.render()}_updateScales(){ie(this.scales,t=>{Mt.removeBox(this,t)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const t=this.options,n=new Set(Object.keys(this._listeners)),i=new Set(t.events);(!gd(n,i)||!!this._responsiveListeners!==t.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:t}=this,n=this._getUniformDataChanges()||[];for(const{method:i,start:s,count:o}of n){const r=i==="_removeElements"?-o:o;N2(t,s,r)}}_getUniformDataChanges(){const t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];const n=this.data.datasets.length,i=o=>new Set(t.filter(r=>r[0]===o).map((r,a)=>a+","+r.splice(1).join(","))),s=i(0);for(let o=1;o<n;o++)if(!gd(s,i(o)))return;return Array.from(s).map(o=>o.split(",")).map(o=>({method:o[1],start:+o[2],count:+o[3]}))}_updateLayout(t){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;Mt.update(this,this.width,this.height,t);const n=this.chartArea,i=n.width<=0||n.height<=0;this._layers=[],ie(this.boxes,s=>{i&&s.position==="chartArea"||(s.configure&&s.configure(),this._layers.push(...s._layers()))},this),this._layers.forEach((s,o)=>{s._idx=o}),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})!==!1){for(let n=0,i=this.data.datasets.length;n<i;++n)this.getDatasetMeta(n).controller.configure();for(let n=0,i=this.data.datasets.length;n<i;++n)this._updateDataset(n,zt(t)?t({datasetIndex:n}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,n){const i=this.getDatasetMeta(t),s={meta:i,index:t,mode:n,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",s)!==!1&&(i.controller._update(n),s.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",s))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(xt.has(this)?this.attached&&!xt.running(this)&&xt.start(this):(this.draw(),tu({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){const{width:i,height:s}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(i,s)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const n=this._layers;for(t=0;t<n.length&&n[t].z<=0;++t)n[t].draw(this.chartArea);for(this._drawDatasets();t<n.length;++t)n[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){const n=this._sortedMetasets,i=[];let s,o;for(s=0,o=n.length;s<o;++s){const r=n[s];(!t||r.visible)&&i.push(r)}return i}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const t=this.getSortedVisibleDatasetMetas();for(let n=t.length-1;n>=0;--n)this._drawDataset(t[n]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){const n=this.ctx,i={meta:t,index:t.index,cancelable:!0},s=qf(this,t);this.notifyPlugins("beforeDatasetDraw",i)!==!1&&(s&&Po(n,s),t.controller.draw(),s&&Mo(n),i.cancelable=!1,this.notifyPlugins("afterDatasetDraw",i))}isPointInArea(t){return Ki(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,n,i,s){const o=Ok.modes[n];return typeof o=="function"?o(this,t,i,s):[]}getDatasetMeta(t){const n=this.data.datasets[t],i=this._metasets;let s=i.filter(o=>o&&o._dataset===n).pop();return s||(s={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:n&&n.order||0,index:t,_dataset:n,_parsed:[],_sorted:!1},i.push(s)),s}getContext(){return this.$context||(this.$context=Sn(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){const n=this.data.datasets[t];if(!n)return!1;const i=this.getDatasetMeta(t);return typeof i.hidden=="boolean"?!i.hidden:!n.hidden}setDatasetVisibility(t,n){const i=this.getDatasetMeta(t);i.hidden=!n}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,n,i){const s=i?"show":"hide",o=this.getDatasetMeta(t),r=o.controller._resolveAnimations(void 0,s);ro(n)?(o.data[n].hidden=!i,this.update()):(this.setDatasetVisibility(t,i),r.update(o,{visible:i}),this.update(a=>a.datasetIndex===t?s:void 0))}hide(t,n){this._updateVisibility(t,n,!1)}show(t,n){this._updateVisibility(t,n,!0)}_destroyDatasetMeta(t){const n=this._metasets[t];n&&n.controller&&n.controller._destroy(),delete this._metasets[t]}_stop(){let t,n;for(this.stop(),xt.remove(this),t=0,n=this.data.datasets.length;t<n;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:t,ctx:n}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),Sd(t,n),this.platform.releaseContext(n),this.canvas=null,this.ctx=null),delete js[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const t=this._listeners,n=this.platform,i=(o,r)=>{n.addEventListener(this,o,r),t[o]=r},s=(o,r,a)=>{o.offsetX=r,o.offsetY=a,this._eventHandler(o)};ie(this.options.events,o=>i(o,s))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const t=this._responsiveListeners,n=this.platform,i=(l,c)=>{n.addEventListener(this,l,c),t[l]=c},s=(l,c)=>{t[l]&&(n.removeEventListener(this,l,c),delete t[l])},o=(l,c)=>{this.canvas&&this.resize(l,c)};let r;const a=()=>{s("attach",a),this.attached=!0,this.resize(),i("resize",o),i("detach",r)};r=()=>{this.attached=!1,s("resize",o),this._stop(),this._resize(0,0),i("attach",a)},n.isAttached(this.canvas)?a():r()}unbindEvents(){ie(this._listeners,(t,n)=>{this.platform.removeEventListener(this,n,t)}),this._listeners={},ie(this._responsiveListeners,(t,n)=>{this.platform.removeEventListener(this,n,t)}),this._responsiveListeners=void 0}updateHoverStyle(t,n,i){const s=i?"set":"remove";let o,r,a,l;for(n==="dataset"&&(o=this.getDatasetMeta(t[0].datasetIndex),o.controller["_"+s+"DatasetHoverStyle"]()),a=0,l=t.length;a<l;++a){r=t[a];const c=r&&this.getDatasetMeta(r.datasetIndex).controller;c&&c[s+"HoverStyle"](r.element,r.datasetIndex,r.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){const n=this._active||[],i=t.map(({datasetIndex:o,index:r})=>{const a=this.getDatasetMeta(o);if(!a)throw new Error("No dataset found at index "+o);return{datasetIndex:o,element:a.data[r],index:r}});!io(i,n)&&(this._active=i,this._lastEvent=null,this._updateHoverStyles(i,n))}notifyPlugins(t,n,i){return this._plugins.notify(this,t,n,i)}isPluginEnabled(t){return this._plugins._cache.filter(n=>n.plugin.id===t).length===1}_updateHoverStyles(t,n,i){const s=this.options.hover,o=(l,c)=>l.filter(d=>!c.some(u=>d.datasetIndex===u.datasetIndex&&d.index===u.index)),r=o(n,t),a=i?t:o(t,n);r.length&&this.updateHoverStyle(r,s.mode,!1),a.length&&s.mode&&this.updateHoverStyle(a,s.mode,!0)}_eventHandler(t,n){const i={event:t,replay:n,cancelable:!0,inChartArea:this.isPointInArea(t)},s=r=>(r.options.events||this.options.events).includes(t.native.type);if(this.notifyPlugins("beforeEvent",i,s)===!1)return;const o=this._handleEvent(t,n,i.inChartArea);return i.cancelable=!1,this.notifyPlugins("afterEvent",i,s),(o||i.changed)&&this.render(),this}_handleEvent(t,n,i){const{_active:s=[],options:o}=this,r=n,a=this._getActiveElements(t,s,i,r),l=X_(t),c=B2(t,this._lastEvent,i,l);i&&(this._lastEvent=null,ce(o.onHover,[t,a,this],this),l&&ce(o.onClick,[t,a,this],this));const d=!io(a,s);return(d||n)&&(this._active=a,this._updateHoverStyles(a,s,n)),this._lastEvent=c,d}_getActiveElements(t,n,i,s){if(t.type==="mouseout")return[];if(!i)return n;const o=this.options.hover;return this.getElementsAtEventForMode(t,o.mode,o,s)}}N(pt,"defaults",pe),N(pt,"instances",js),N(pt,"overrides",_n),N(pt,"registry",dt),N(pt,"version",I2),N(pt,"getChart",nu);function iu(){return ie(pt.instances,e=>e._plugins.invalidate())}function tp(e,t,n=t){e.lineCap=Y(n.borderCapStyle,t.borderCapStyle),e.setLineDash(Y(n.borderDash,t.borderDash)),e.lineDashOffset=Y(n.borderDashOffset,t.borderDashOffset),e.lineJoin=Y(n.borderJoinStyle,t.borderJoinStyle),e.lineWidth=Y(n.borderWidth,t.borderWidth),e.strokeStyle=Y(n.borderColor,t.borderColor)}function z2(e,t,n){e.lineTo(n.x,n.y)}function H2(e){return e.stepped?A1:e.tension||e.cubicInterpolationMode==="monotone"?T1:z2}function np(e,t,n={}){const i=e.length,{start:s=0,end:o=i-1}=n,{start:r,end:a}=t,l=Math.max(s,r),c=Math.min(o,a),d=s<r&&o<r||s>a&&o>a;return{count:i,start:l,loop:t.loop,ilen:c<l&&!d?i+c-l:c-l}}function U2(e,t,n,i){const{points:s,options:o}=t,{count:r,start:a,loop:l,ilen:c}=np(s,n,i),d=H2(o);let{move:u=!0,reverse:h}=i||{},g,m,y;for(g=0;g<=c;++g)m=s[(a+(h?c-g:g))%r],!m.skip&&(u?(e.moveTo(m.x,m.y),u=!1):d(e,y,m,h,o.stepped),y=m);return l&&(m=s[(a+(h?c:0))%r],d(e,y,m,h,o.stepped)),!!l}function q2(e,t,n,i){const s=t.points,{count:o,start:r,ilen:a}=np(s,n,i),{move:l=!0,reverse:c}=i||{};let d=0,u=0,h,g,m,y,_,S;const R=A=>(r+(c?a-A:A))%o,M=()=>{y!==_&&(e.lineTo(d,_),e.lineTo(d,y),e.lineTo(d,S))};for(l&&(g=s[R(0)],e.moveTo(g.x,g.y)),h=0;h<=a;++h){if(g=s[R(h)],g.skip)continue;const A=g.x,T=g.y,v=A|0;v===m?(T<y?y=T:T>_&&(_=T),d=(u*d+A)/++u):(M(),e.lineTo(A,T),m=v,u=0,y=_=T),S=T}M()}function pa(e){const t=e.options,n=t.borderDash&&t.borderDash.length;return!e._decimated&&!e._loop&&!t.tension&&t.cubicInterpolationMode!=="monotone"&&!t.stepped&&!n?q2:U2}function j2(e){return e.stepped?rk:e.tension||e.cubicInterpolationMode==="monotone"?ak:nn}function K2(e,t,n,i){let s=t._path;s||(s=t._path=new Path2D,t.path(s,n,i)&&s.closePath()),tp(e,t.options),e.stroke(s)}function W2(e,t,n,i){const{segments:s,options:o}=t,r=pa(t);for(const a of s)tp(e,o,a.style),e.beginPath(),r(e,t,a,{start:n,end:n+i-1})&&e.closePath(),e.stroke()}const V2=typeof Path2D=="function";function G2(e,t,n,i){V2&&!t.options.segment?K2(e,t,n,i):W2(e,t,n,i)}class Dt extends Ht{constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,n){const i=this.options;if((i.tension||i.cubicInterpolationMode==="monotone")&&!i.stepped&&!this._pointsUpdated){const s=i.spanGaps?this._loop:this._fullLoop;J1(this._points,i,t,s,n),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=fk(this,this.options.segment))}first(){const t=this.segments,n=this.points;return t.length&&n[t[0].start]}last(){const t=this.segments,n=this.points,i=t.length;return i&&n[t[i-1].end]}interpolate(t,n){const i=this.options,s=t[n],o=this.points,r=Uf(this,{property:n,start:s,end:s});if(!r.length)return;const a=[],l=j2(i);let c,d;for(c=0,d=r.length;c<d;++c){const{start:u,end:h}=r[c],g=o[u],m=o[h];if(g===m){a.push(g);continue}const y=Math.abs((s-g[n])/(m[n]-g[n])),_=l(g,m,y,i.stepped);_[n]=t[n],a.push(_)}return a.length===1?a[0]:a}pathSegment(t,n,i){return pa(this)(t,this,n,i)}path(t,n,i){const s=this.segments,o=pa(this);let r=this._loop;n=n||0,i=i||this.points.length-n;for(const a of s)r&=o(t,this,a,{start:n,end:n+i-1});return!!r}draw(t,n,i,s){const o=this.options||{};(this.points||[]).length&&o.borderWidth&&(t.save(),G2(t,this,i,s),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}N(Dt,"id","line"),N(Dt,"defaults",{borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0}),N(Dt,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"}),N(Dt,"descriptors",{_scriptable:!0,_indexable:t=>t!=="borderDash"&&t!=="fill"});function su(e,t,n,i){const s=e.options,{[n]:o}=e.getProps([n],i);return Math.abs(t-o)<s.radius+s.hitRadius}class Ks extends Ht{constructor(n){super();N(this,"parsed");N(this,"skip");N(this,"stop");this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,n&&Object.assign(this,n)}inRange(n,i,s){const o=this.options,{x:r,y:a}=this.getProps(["x","y"],s);return Math.pow(n-r,2)+Math.pow(i-a,2)<Math.pow(o.hitRadius+o.radius,2)}inXRange(n,i){return su(this,n,"x",i)}inYRange(n,i){return su(this,n,"y",i)}getCenterPoint(n){const{x:i,y:s}=this.getProps(["x","y"],n);return{x:i,y:s}}size(n){n=n||this.options||{};let i=n.radius||0;i=Math.max(i,i&&n.hoverRadius||0);const s=i&&n.borderWidth||0;return(i+s)*2}draw(n,i){const s=this.options;this.skip||s.radius<.1||!Ki(this,i,this.size(s)/2)||(n.strokeStyle=s.borderColor,n.lineWidth=s.borderWidth,n.fillStyle=s.backgroundColor,da(n,s,this.x,this.y))}getRange(){const n=this.options||{};return n.radius+n.hitRadius}}N(Ks,"id","point"),N(Ks,"defaults",{borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0}),N(Ks,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});function Q2(e,t,n){const i=e.segments,s=e.points,o=t.points,r=[];for(const a of i){let{start:l,end:c}=a;c=Io(l,c,s);const d=ga(n,s[l],s[c],a.loop);if(!t.segments){r.push({source:a,target:d,start:s[l],end:s[c]});continue}const u=Uf(t,d);for(const h of u){const g=ga(n,o[h.start],o[h.end],h.loop),m=Hf(a,s,g);for(const y of m)r.push({source:y,target:h,start:{[n]:ou(d,g,"start",Math.max)},end:{[n]:ou(d,g,"end",Math.min)}})}}return r}function ga(e,t,n,i){if(i)return;let s=t[e],o=n[e];return e==="angle"&&(s=ht(s),o=ht(o)),{property:e,start:s,end:o}}function Y2(e,t){const{x:n=null,y:i=null}=e||{},s=t.points,o=[];return t.segments.forEach(({start:r,end:a})=>{a=Io(r,a,s);const l=s[r],c=s[a];i!==null?(o.push({x:l.x,y:i}),o.push({x:c.x,y:i})):n!==null&&(o.push({x:n,y:l.y}),o.push({x:n,y:c.y}))}),o}function Io(e,t,n){for(;t>e;t--){const i=n[t];if(!isNaN(i.x)&&!isNaN(i.y))break}return t}function ou(e,t,n,i){return e&&t?i(e[n],t[n]):e?e[n]:t?t[n]:0}function ip(e,t){let n=[],i=!1;return _e(e)?(i=!0,n=e):n=Y2(e,t),n.length?new Dt({points:n,options:{tension:0},_loop:i,_fullLoop:i}):null}function ru(e){return e&&e.fill!==!1}function X2(e,t,n){let s=e[t].fill;const o=[t];let r;if(!n)return s;for(;s!==!1&&o.indexOf(s)===-1;){if(!Re(s))return s;if(r=e[s],!r)return!1;if(r.visible)return s;o.push(s),s=r.fill}return!1}function J2(e,t,n){const i=n$(e);if(X(i))return isNaN(i.value)?!1:i;let s=parseFloat(i);return Re(s)&&Math.floor(s)===s?Z2(i[0],t,s,n):["origin","start","end","stack","shape"].indexOf(i)>=0&&i}function Z2(e,t,n,i){return(e==="-"||e==="+")&&(n=t+n),n===t||n<0||n>=i?!1:n}function e$(e,t){let n=null;return e==="start"?n=t.bottom:e==="end"?n=t.top:X(e)?n=t.getPixelForValue(e.value):t.getBasePixel&&(n=t.getBasePixel()),n}function t$(e,t,n){let i;return e==="start"?i=n:e==="end"?i=t.options.reverse?t.min:t.max:X(e)?i=e.value:i=t.getBaseValue(),i}function n$(e){const t=e.options,n=t.fill;let i=Y(n&&n.target,n);return i===void 0&&(i=!!t.backgroundColor),i===!1||i===null?!1:i===!0?"origin":i}function i$(e){const{scale:t,index:n,line:i}=e,s=[],o=i.segments,r=i.points,a=s$(t,n);a.push(ip({x:null,y:t.bottom},i));for(let l=0;l<o.length;l++){const c=o[l];for(let d=c.start;d<=c.end;d++)o$(s,r[d],a)}return new Dt({points:s,options:{}})}function s$(e,t){const n=[],i=e.getMatchingVisibleMetas("line");for(let s=0;s<i.length;s++){const o=i[s];if(o.index===t)break;o.hidden||n.unshift(o.dataset)}return n}function o$(e,t,n){const i=[];for(let s=0;s<n.length;s++){const o=n[s],{first:r,last:a,point:l}=r$(o,t,"x");if(!(!l||r&&a)){if(r)i.unshift(l);else if(e.push(l),!a)break}}e.push(...i)}function r$(e,t,n){const i=e.interpolate(t,n);if(!i)return{};const s=i[n],o=e.segments,r=e.points;let a=!1,l=!1;for(let c=0;c<o.length;c++){const d=o[c],u=r[d.start][n],h=r[d.end][n];if(Fn(s,u,h)){a=s===u,l=s===h;break}}return{first:a,last:l,point:i}}class sp{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,n,i){const{x:s,y:o,radius:r}=this;return n=n||{start:0,end:et},t.arc(s,o,r,n.end,n.start,!0),!i.bounds}interpolate(t){const{x:n,y:i,radius:s}=this,o=t.angle;return{x:n+Math.cos(o)*s,y:i+Math.sin(o)*s,angle:o}}}function a$(e){const{chart:t,fill:n,line:i}=e;if(Re(n))return l$(t,n);if(n==="stack")return i$(e);if(n==="shape")return!0;const s=c$(e);return s instanceof sp?s:ip(s,i)}function l$(e,t){const n=e.getDatasetMeta(t);return n&&e.isDatasetVisible(t)?n.dataset:null}function c$(e){return(e.scale||{}).getPointPositionForValue?u$(e):d$(e)}function d$(e){const{scale:t={},fill:n}=e,i=e$(n,t);if(Re(i)){const s=t.isHorizontal();return{x:s?i:null,y:s?null:i}}return null}function u$(e){const{scale:t,fill:n}=e,i=t.options,s=t.getLabels().length,o=i.reverse?t.max:t.min,r=t$(n,t,o),a=[];if(i.grid.circular){const l=t.getPointPositionForValue(0,o);return new sp({x:l.x,y:l.y,radius:t.getDistanceFromCenterForValue(r)})}for(let l=0;l<s;++l)a.push(t.getPointPositionForValue(l,r));return a}function Pr(e,t,n){const i=a$(t),{chart:s,index:o,line:r,scale:a,axis:l}=t,c=r.options,d=c.fill,u=c.backgroundColor,{above:h=u,below:g=u}=d||{},m=s.getDatasetMeta(o),y=qf(s,m);i&&r.points.length&&(Po(e,n),h$(e,{line:r,target:i,above:h,below:g,area:n,scale:a,axis:l,clip:y}),Mo(e))}function h$(e,t){const{line:n,target:i,above:s,below:o,area:r,scale:a,clip:l}=t,c=n._loop?"angle":t.axis;e.save();let d=o;o!==s&&(c==="x"?(au(e,i,r.top),Mr(e,{line:n,target:i,color:s,scale:a,property:c,clip:l}),e.restore(),e.save(),au(e,i,r.bottom)):c==="y"&&(lu(e,i,r.left),Mr(e,{line:n,target:i,color:o,scale:a,property:c,clip:l}),e.restore(),e.save(),lu(e,i,r.right),d=s)),Mr(e,{line:n,target:i,color:d,scale:a,property:c,clip:l}),e.restore()}function au(e,t,n){const{segments:i,points:s}=t;let o=!0,r=!1;e.beginPath();for(const a of i){const{start:l,end:c}=a,d=s[l],u=s[Io(l,c,s)];o?(e.moveTo(d.x,d.y),o=!1):(e.lineTo(d.x,n),e.lineTo(d.x,d.y)),r=!!t.pathSegment(e,a,{move:r}),r?e.closePath():e.lineTo(u.x,n)}e.lineTo(t.first().x,n),e.closePath(),e.clip()}function lu(e,t,n){const{segments:i,points:s}=t;let o=!0,r=!1;e.beginPath();for(const a of i){const{start:l,end:c}=a,d=s[l],u=s[Io(l,c,s)];o?(e.moveTo(d.x,d.y),o=!1):(e.lineTo(n,d.y),e.lineTo(d.x,d.y)),r=!!t.pathSegment(e,a,{move:r}),r?e.closePath():e.lineTo(n,u.y)}e.lineTo(n,t.first().y),e.closePath(),e.clip()}function Mr(e,t){const{line:n,target:i,property:s,color:o,scale:r,clip:a}=t,l=Q2(n,i,s);for(const{source:c,target:d,start:u,end:h}of l){const{style:{backgroundColor:g=o}={}}=c,m=i!==!0;e.save(),e.fillStyle=g,f$(e,r,a,m&&ga(s,u,h)),e.beginPath();const y=!!n.pathSegment(e,c);let _;if(m){y?e.closePath():cu(e,i,h,s);const S=!!i.pathSegment(e,d,{move:y,reverse:!0});_=y&&S,_||cu(e,i,u,s)}e.closePath(),e.fill(_?"evenodd":"nonzero"),e.restore()}}function f$(e,t,n,i){const s=t.chart.chartArea,{property:o,start:r,end:a}=i||{};if(o==="x"||o==="y"){let l,c,d,u;o==="x"?(l=r,c=s.top,d=a,u=s.bottom):(l=s.left,c=r,d=s.right,u=a),e.beginPath(),n&&(l=Math.max(l,n.left),d=Math.min(d,n.right),c=Math.max(c,n.top),u=Math.min(u,n.bottom)),e.rect(l,c,d-l,u-c),e.clip()}}function cu(e,t,n,i){const s=t.interpolate(n,i);s&&e.lineTo(s.x,s.y)}var p$={id:"filler",afterDatasetsUpdate(e,t,n){const i=(e.data.datasets||[]).length,s=[];let o,r,a,l;for(r=0;r<i;++r)o=e.getDatasetMeta(r),a=o.dataset,l=null,a&&a.options&&a instanceof Dt&&(l={visible:e.isDatasetVisible(r),index:r,fill:J2(a,r,i),chart:e,axis:o.controller.options.indexAxis,scale:o.vScale,line:a}),o.$filler=l,s.push(l);for(r=0;r<i;++r)l=s[r],!(!l||l.fill===!1)&&(l.fill=X2(s,r,n.propagate))},beforeDraw(e,t,n){const i=n.drawTime==="beforeDraw",s=e.getSortedVisibleDatasetMetas(),o=e.chartArea;for(let r=s.length-1;r>=0;--r){const a=s[r].$filler;a&&(a.line.updateControlPoints(o,a.axis),i&&a.fill&&Pr(e.ctx,a,o))}},beforeDatasetsDraw(e,t,n){if(n.drawTime!=="beforeDatasetsDraw")return;const i=e.getSortedVisibleDatasetMetas();for(let s=i.length-1;s>=0;--s){const o=i[s].$filler;ru(o)&&Pr(e.ctx,o,e.chartArea)}},beforeDatasetDraw(e,t,n){const i=t.meta.$filler;!ru(i)||n.drawTime!=="beforeDatasetDraw"||Pr(e.ctx,i,e.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const du=(e,t)=>{let{boxHeight:n=t,boxWidth:i=t}=e;return e.usePointStyle&&(n=Math.min(n,t),i=e.pointStyleWidth||Math.min(i,t)),{boxWidth:i,boxHeight:n,itemHeight:Math.max(t,n)}},g$=(e,t)=>e!==null&&t!==null&&e.datasetIndex===t.datasetIndex&&e.index===t.index;class uu extends Ht{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,n,i){this.maxWidth=t,this.maxHeight=n,this._margins=i,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const t=this.options.labels||{};let n=ce(t.generateLabels,[this.chart],this)||[];t.filter&&(n=n.filter(i=>t.filter(i,this.chart.data))),t.sort&&(n=n.sort((i,s)=>t.sort(i,s,this.chart.data))),this.options.reverse&&n.reverse(),this.legendItems=n}fit(){const{options:t,ctx:n}=this;if(!t.display){this.width=this.height=0;return}const i=t.labels,s=ze(i.font),o=s.size,r=this._computeTitleHeight(),{boxWidth:a,itemHeight:l}=du(i,o);let c,d;n.font=s.string,this.isHorizontal()?(c=this.maxWidth,d=this._fitRows(r,o,a,l)+10):(d=this.maxHeight,c=this._fitCols(r,s,a,l)+10),this.width=Math.min(c,t.maxWidth||this.maxWidth),this.height=Math.min(d,t.maxHeight||this.maxHeight)}_fitRows(t,n,i,s){const{ctx:o,maxWidth:r,options:{labels:{padding:a}}}=this,l=this.legendHitBoxes=[],c=this.lineWidths=[0],d=s+a;let u=t;o.textAlign="left",o.textBaseline="middle";let h=-1,g=-d;return this.legendItems.forEach((m,y)=>{const _=i+n/2+o.measureText(m.text).width;(y===0||c[c.length-1]+_+2*a>r)&&(u+=d,c[c.length-(y>0?0:1)]=0,g+=d,h++),l[y]={left:0,top:g,row:h,width:_,height:s},c[c.length-1]+=_+a}),u}_fitCols(t,n,i,s){const{ctx:o,maxHeight:r,options:{labels:{padding:a}}}=this,l=this.legendHitBoxes=[],c=this.columnSizes=[],d=r-t;let u=a,h=0,g=0,m=0,y=0;return this.legendItems.forEach((_,S)=>{const{itemWidth:R,itemHeight:M}=m$(i,n,o,_,s);S>0&&g+M+2*a>d&&(u+=h+a,c.push({width:h,height:g}),m+=h+a,y++,h=g=0),l[S]={left:m,top:g,col:y,width:R,height:M},h=Math.max(h,R),g+=M+a}),u+=h,c.push({width:h,height:g}),u}adjustHitBoxes(){if(!this.options.display)return;const t=this._computeTitleHeight(),{legendHitBoxes:n,options:{align:i,labels:{padding:s},rtl:o}}=this,r=Bn(o,this.left,this.width);if(this.isHorizontal()){let a=0,l=Ue(i,this.left+s,this.right-this.lineWidths[a]);for(const c of n)a!==c.row&&(a=c.row,l=Ue(i,this.left+s,this.right-this.lineWidths[a])),c.top+=this.top+t+s,c.left=r.leftForLtr(r.x(l),c.width),l+=c.width+s}else{let a=0,l=Ue(i,this.top+t+s,this.bottom-this.columnSizes[a].height);for(const c of n)c.col!==a&&(a=c.col,l=Ue(i,this.top+t+s,this.bottom-this.columnSizes[a].height)),c.top=l,c.left+=this.left+s,c.left=r.leftForLtr(r.x(c.left),c.width),l+=c.height+s}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const t=this.ctx;Po(t,this),this._draw(),Mo(t)}}_draw(){const{options:t,columnSizes:n,lineWidths:i,ctx:s}=this,{align:o,labels:r}=t,a=pe.color,l=Bn(t.rtl,this.left,this.width),c=ze(r.font),{padding:d}=r,u=c.size,h=u/2;let g;this.drawTitle(),s.textAlign=l.textAlign("left"),s.textBaseline="middle",s.lineWidth=.5,s.font=c.string;const{boxWidth:m,boxHeight:y,itemHeight:_}=du(r,u),S=function(v,E,P){if(isNaN(m)||m<=0||isNaN(y)||y<0)return;s.save();const C=Y(P.lineWidth,1);if(s.fillStyle=Y(P.fillStyle,a),s.lineCap=Y(P.lineCap,"butt"),s.lineDashOffset=Y(P.lineDashOffset,0),s.lineJoin=Y(P.lineJoin,"miter"),s.lineWidth=C,s.strokeStyle=Y(P.strokeStyle,a),s.setLineDash(Y(P.lineDash,[])),r.usePointStyle){const O={radius:y*Math.SQRT2/2,pointStyle:P.pointStyle,rotation:P.rotation,borderWidth:C},D=l.xPlus(v,m/2),F=E+h;Pf(s,O,D,F,r.pointStyleWidth&&m)}else{const O=E+Math.max((u-y)/2,0),D=l.leftForLtr(v,m),F=Di(P.borderRadius);s.beginPath(),Object.values(F).some(j=>j!==0)?ua(s,{x:D,y:O,w:m,h:y,radius:F}):s.rect(D,O,m,y),s.fill(),C!==0&&s.stroke()}s.restore()},R=function(v,E,P){lo(s,P.text,v,E+_/2,c,{strikethrough:P.hidden,textAlign:l.textAlign(P.textAlign)})},M=this.isHorizontal(),A=this._computeTitleHeight();M?g={x:Ue(o,this.left+d,this.right-i[0]),y:this.top+d+A,line:0}:g={x:this.left+d,y:Ue(o,this.top+A+d,this.bottom-n[0].height),line:0},Nf(this.ctx,t.textDirection);const T=_+d;this.legendItems.forEach((v,E)=>{s.strokeStyle=v.fontColor,s.fillStyle=v.fontColor;const P=s.measureText(v.text).width,C=l.textAlign(v.textAlign||(v.textAlign=r.textAlign)),O=m+h+P;let D=g.x,F=g.y;l.setWidth(this.width),M?E>0&&D+O+d>this.right&&(F=g.y+=T,g.line++,D=g.x=Ue(o,this.left+d,this.right-i[g.line])):E>0&&F+T>this.bottom&&(D=g.x=D+n[g.line].width+d,g.line++,F=g.y=Ue(o,this.top+A+d,this.bottom-n[g.line].height));const j=l.x(D);if(S(j,F,v),D=f1(C,D+m+h,M?D+O:this.right,t.rtl),R(l.x(D),F,v),M)g.x+=O+d;else if(typeof v.text!="string"){const G=c.lineHeight;g.y+=op(v,G)+d}else g.y+=T}),Bf(this.ctx,t.textDirection)}drawTitle(){const t=this.options,n=t.title,i=ze(n.font),s=nt(n.padding);if(!n.display)return;const o=Bn(t.rtl,this.left,this.width),r=this.ctx,a=n.position,l=i.size/2,c=s.top+l;let d,u=this.left,h=this.width;if(this.isHorizontal())h=Math.max(...this.lineWidths),d=this.top+c,u=Ue(t.align,u,this.right-h);else{const m=this.columnSizes.reduce((y,_)=>Math.max(y,_.height),0);d=c+Ue(t.align,this.top,this.bottom-m-t.labels.padding-this._computeTitleHeight())}const g=Ue(a,u,u+h);r.textAlign=o.textAlign(Cf(a)),r.textBaseline="middle",r.strokeStyle=n.color,r.fillStyle=n.color,r.font=i.string,lo(r,n.text,g,d,i)}_computeTitleHeight(){const t=this.options.title,n=ze(t.font),i=nt(t.padding);return t.display?n.lineHeight+i.height:0}_getLegendItemAt(t,n){let i,s,o;if(Fn(t,this.left,this.right)&&Fn(n,this.top,this.bottom)){for(o=this.legendHitBoxes,i=0;i<o.length;++i)if(s=o[i],Fn(t,s.left,s.left+s.width)&&Fn(n,s.top,s.top+s.height))return this.legendItems[i]}return null}handleEvent(t){const n=this.options;if(!b$(t.type,n))return;const i=this._getLegendItemAt(t.x,t.y);if(t.type==="mousemove"||t.type==="mouseout"){const s=this._hoveredItem,o=g$(s,i);s&&!o&&ce(n.onLeave,[t,s,this],this),this._hoveredItem=i,i&&!o&&ce(n.onHover,[t,i,this],this)}else i&&ce(n.onClick,[t,i,this],this)}}function m$(e,t,n,i,s){const o=y$(i,e,t,n),r=v$(s,i,t.lineHeight);return{itemWidth:o,itemHeight:r}}function y$(e,t,n,i){let s=e.text;return s&&typeof s!="string"&&(s=s.reduce((o,r)=>o.length>r.length?o:r)),t+n.size/2+i.measureText(s).width}function v$(e,t,n){let i=e;return typeof t.text!="string"&&(i=op(t,n)),i}function op(e,t){const n=e.text?e.text.length:0;return t*n}function b$(e,t){return!!((e==="mousemove"||e==="mouseout")&&(t.onHover||t.onLeave)||t.onClick&&(e==="click"||e==="mouseup"))}var w$={id:"legend",_element:uu,start(e,t,n){const i=e.legend=new uu({ctx:e.ctx,options:n,chart:e});Mt.configure(e,i,n),Mt.addBox(e,i)},stop(e){Mt.removeBox(e,e.legend),delete e.legend},beforeUpdate(e,t,n){const i=e.legend;Mt.configure(e,i,n),i.options=n},afterUpdate(e){const t=e.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(e,t){t.replay||e.legend.handleEvent(t.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(e,t,n){const i=t.datasetIndex,s=n.chart;s.isDatasetVisible(i)?(s.hide(i),t.hidden=!0):(s.show(i),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:e=>e.chart.options.color,boxWidth:40,padding:10,generateLabels(e){const t=e.data.datasets,{labels:{usePointStyle:n,pointStyle:i,textAlign:s,color:o,useBorderRadius:r,borderRadius:a}}=e.legend.options;return e._getSortedDatasetMetas().map(l=>{const c=l.controller.getStyle(n?0:void 0),d=nt(c.borderWidth);return{text:t[l.index].label,fillStyle:c.backgroundColor,fontColor:o,hidden:!l.visible,lineCap:c.borderCapStyle,lineDash:c.borderDash,lineDashOffset:c.borderDashOffset,lineJoin:c.borderJoinStyle,lineWidth:(d.width+d.height)/4,strokeStyle:c.borderColor,pointStyle:i||c.pointStyle,rotation:c.rotation,textAlign:s||c.textAlign,borderRadius:r&&(a||c.borderRadius),datasetIndex:l.index}},this)}},title:{color:e=>e.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:e=>!e.startsWith("on"),labels:{_scriptable:e=>!["generateLabels","filter","sort"].includes(e)}}};const _i={average(e){if(!e.length)return!1;let t,n,i=new Set,s=0,o=0;for(t=0,n=e.length;t<n;++t){const a=e[t].element;if(a&&a.hasValue()){const l=a.tooltipPosition();i.add(l.x),s+=l.y,++o}}return o===0||i.size===0?!1:{x:[...i].reduce((a,l)=>a+l)/i.size,y:s/o}},nearest(e,t){if(!e.length)return!1;let n=t.x,i=t.y,s=Number.POSITIVE_INFINITY,o,r,a;for(o=0,r=e.length;o<r;++o){const l=e[o].element;if(l&&l.hasValue()){const c=l.getCenterPoint(),d=la(t,c);d<s&&(s=d,a=l)}}if(a){const l=a.tooltipPosition();n=l.x,i=l.y}return{x:n,y:i}}};function ct(e,t){return t&&(_e(t)?Array.prototype.push.apply(e,t):e.push(t)),e}function _t(e){return(typeof e=="string"||e instanceof String)&&e.indexOf(`
`)>-1?e.split(`
`):e}function x$(e,t){const{element:n,datasetIndex:i,index:s}=t,o=e.getDatasetMeta(i).controller,{label:r,value:a}=o.getLabelAndValue(s);return{chart:e,label:r,parsed:o.getParsed(s),raw:e.data.datasets[i].data[s],formattedValue:a,dataset:o.getDataset(),dataIndex:s,datasetIndex:i,element:n}}function hu(e,t){const n=e.chart.ctx,{body:i,footer:s,title:o}=e,{boxWidth:r,boxHeight:a}=t,l=ze(t.bodyFont),c=ze(t.titleFont),d=ze(t.footerFont),u=o.length,h=s.length,g=i.length,m=nt(t.padding);let y=m.height,_=0,S=i.reduce((A,T)=>A+T.before.length+T.lines.length+T.after.length,0);if(S+=e.beforeBody.length+e.afterBody.length,u&&(y+=u*c.lineHeight+(u-1)*t.titleSpacing+t.titleMarginBottom),S){const A=t.displayColors?Math.max(a,l.lineHeight):l.lineHeight;y+=g*A+(S-g)*l.lineHeight+(S-1)*t.bodySpacing}h&&(y+=t.footerMarginTop+h*d.lineHeight+(h-1)*t.footerSpacing);let R=0;const M=function(A){_=Math.max(_,n.measureText(A).width+R)};return n.save(),n.font=c.string,ie(e.title,M),n.font=l.string,ie(e.beforeBody.concat(e.afterBody),M),R=t.displayColors?r+2+t.boxPadding:0,ie(i,A=>{ie(A.before,M),ie(A.lines,M),ie(A.after,M)}),R=0,n.font=d.string,ie(e.footer,M),n.restore(),_+=m.width,{width:_,height:y}}function _$(e,t){const{y:n,height:i}=t;return n<i/2?"top":n>e.height-i/2?"bottom":"center"}function k$(e,t,n,i){const{x:s,width:o}=i,r=n.caretSize+n.caretPadding;if(e==="left"&&s+o+r>t.width||e==="right"&&s-o-r<0)return!0}function $$(e,t,n,i){const{x:s,width:o}=n,{width:r,chartArea:{left:a,right:l}}=e;let c="center";return i==="center"?c=s<=(a+l)/2?"left":"right":s<=o/2?c="left":s>=r-o/2&&(c="right"),k$(c,e,t,n)&&(c="center"),c}function fu(e,t,n){const i=n.yAlign||t.yAlign||_$(e,n);return{xAlign:n.xAlign||t.xAlign||$$(e,t,n,i),yAlign:i}}function S$(e,t){let{x:n,width:i}=e;return t==="right"?n-=i:t==="center"&&(n-=i/2),n}function A$(e,t,n){let{y:i,height:s}=e;return t==="top"?i+=n:t==="bottom"?i-=s+n:i-=s/2,i}function pu(e,t,n,i){const{caretSize:s,caretPadding:o,cornerRadius:r}=e,{xAlign:a,yAlign:l}=n,c=s+o,{topLeft:d,topRight:u,bottomLeft:h,bottomRight:g}=Di(r);let m=S$(t,a);const y=A$(t,l,c);return l==="center"?a==="left"?m+=c:a==="right"&&(m-=c):a==="left"?m-=Math.max(d,h)+s:a==="right"&&(m+=Math.max(u,g)+s),{x:je(m,0,i.width-t.width),y:je(y,0,i.height-t.height)}}function Ds(e,t,n){const i=nt(n.padding);return t==="center"?e.x+e.width/2:t==="right"?e.x+e.width-i.right:e.x+i.left}function gu(e){return ct([],_t(e))}function T$(e,t,n){return Sn(e,{tooltip:t,tooltipItems:n,type:"tooltip"})}function mu(e,t){const n=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return n?e.override(n):e}const rp={beforeTitle:wt,title(e){if(e.length>0){const t=e[0],n=t.chart.data.labels,i=n?n.length:0;if(this&&this.options&&this.options.mode==="dataset")return t.dataset.label||"";if(t.label)return t.label;if(i>0&&t.dataIndex<i)return n[t.dataIndex]}return""},afterTitle:wt,beforeBody:wt,beforeLabel:wt,label(e){if(this&&this.options&&this.options.mode==="dataset")return e.label+": "+e.formattedValue||e.formattedValue;let t=e.dataset.label||"";t&&(t+=": ");const n=e.formattedValue;return le(n)||(t+=n),t},labelColor(e){const n=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{borderColor:n.borderColor,backgroundColor:n.backgroundColor,borderWidth:n.borderWidth,borderDash:n.borderDash,borderDashOffset:n.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(e){const n=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{pointStyle:n.pointStyle,rotation:n.rotation}},afterLabel:wt,afterBody:wt,beforeFooter:wt,footer:wt,afterFooter:wt};function Fe(e,t,n,i){const s=e[t].call(n,i);return typeof s>"u"?rp[t].call(n,i):s}class ma extends Ht{constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const t=this._cachedAnimations;if(t)return t;const n=this.chart,i=this.options.setContext(this.getContext()),s=i.enabled&&n.options.animation&&i.animations,o=new jf(this.chart,s);return s._cacheable&&(this._cachedAnimations=Object.freeze(o)),o}getContext(){return this.$context||(this.$context=T$(this.chart.getContext(),this,this._tooltipItems))}getTitle(t,n){const{callbacks:i}=n,s=Fe(i,"beforeTitle",this,t),o=Fe(i,"title",this,t),r=Fe(i,"afterTitle",this,t);let a=[];return a=ct(a,_t(s)),a=ct(a,_t(o)),a=ct(a,_t(r)),a}getBeforeBody(t,n){return gu(Fe(n.callbacks,"beforeBody",this,t))}getBody(t,n){const{callbacks:i}=n,s=[];return ie(t,o=>{const r={before:[],lines:[],after:[]},a=mu(i,o);ct(r.before,_t(Fe(a,"beforeLabel",this,o))),ct(r.lines,Fe(a,"label",this,o)),ct(r.after,_t(Fe(a,"afterLabel",this,o))),s.push(r)}),s}getAfterBody(t,n){return gu(Fe(n.callbacks,"afterBody",this,t))}getFooter(t,n){const{callbacks:i}=n,s=Fe(i,"beforeFooter",this,t),o=Fe(i,"footer",this,t),r=Fe(i,"afterFooter",this,t);let a=[];return a=ct(a,_t(s)),a=ct(a,_t(o)),a=ct(a,_t(r)),a}_createItems(t){const n=this._active,i=this.chart.data,s=[],o=[],r=[];let a=[],l,c;for(l=0,c=n.length;l<c;++l)a.push(x$(this.chart,n[l]));return t.filter&&(a=a.filter((d,u,h)=>t.filter(d,u,h,i))),t.itemSort&&(a=a.sort((d,u)=>t.itemSort(d,u,i))),ie(a,d=>{const u=mu(t.callbacks,d);s.push(Fe(u,"labelColor",this,d)),o.push(Fe(u,"labelPointStyle",this,d)),r.push(Fe(u,"labelTextColor",this,d))}),this.labelColors=s,this.labelPointStyles=o,this.labelTextColors=r,this.dataPoints=a,a}update(t,n){const i=this.options.setContext(this.getContext()),s=this._active;let o,r=[];if(!s.length)this.opacity!==0&&(o={opacity:0});else{const a=_i[i.position].call(this,s,this._eventPosition);r=this._createItems(i),this.title=this.getTitle(r,i),this.beforeBody=this.getBeforeBody(r,i),this.body=this.getBody(r,i),this.afterBody=this.getAfterBody(r,i),this.footer=this.getFooter(r,i);const l=this._size=hu(this,i),c=Object.assign({},a,l),d=fu(this.chart,i,c),u=pu(i,c,d,this.chart);this.xAlign=d.xAlign,this.yAlign=d.yAlign,o={opacity:1,x:u.x,y:u.y,width:l.width,height:l.height,caretX:a.x,caretY:a.y}}this._tooltipItems=r,this.$context=void 0,o&&this._resolveAnimations().update(this,o),t&&i.external&&i.external.call(this,{chart:this.chart,tooltip:this,replay:n})}drawCaret(t,n,i,s){const o=this.getCaretPosition(t,i,s);n.lineTo(o.x1,o.y1),n.lineTo(o.x2,o.y2),n.lineTo(o.x3,o.y3)}getCaretPosition(t,n,i){const{xAlign:s,yAlign:o}=this,{caretSize:r,cornerRadius:a}=i,{topLeft:l,topRight:c,bottomLeft:d,bottomRight:u}=Di(a),{x:h,y:g}=t,{width:m,height:y}=n;let _,S,R,M,A,T;return o==="center"?(A=g+y/2,s==="left"?(_=h,S=_-r,M=A+r,T=A-r):(_=h+m,S=_+r,M=A-r,T=A+r),R=_):(s==="left"?S=h+Math.max(l,d)+r:s==="right"?S=h+m-Math.max(c,u)-r:S=this.caretX,o==="top"?(M=g,A=M-r,_=S-r,R=S+r):(M=g+y,A=M+r,_=S+r,R=S-r),T=M),{x1:_,x2:S,x3:R,y1:M,y2:A,y3:T}}drawTitle(t,n,i){const s=this.title,o=s.length;let r,a,l;if(o){const c=Bn(i.rtl,this.x,this.width);for(t.x=Ds(this,i.titleAlign,i),n.textAlign=c.textAlign(i.titleAlign),n.textBaseline="middle",r=ze(i.titleFont),a=i.titleSpacing,n.fillStyle=i.titleColor,n.font=r.string,l=0;l<o;++l)n.fillText(s[l],c.x(t.x),t.y+r.lineHeight/2),t.y+=r.lineHeight+a,l+1===o&&(t.y+=i.titleMarginBottom-a)}}_drawColorBox(t,n,i,s,o){const r=this.labelColors[i],a=this.labelPointStyles[i],{boxHeight:l,boxWidth:c}=o,d=ze(o.bodyFont),u=Ds(this,"left",o),h=s.x(u),g=l<d.lineHeight?(d.lineHeight-l)/2:0,m=n.y+g;if(o.usePointStyle){const y={radius:Math.min(c,l)/2,pointStyle:a.pointStyle,rotation:a.rotation,borderWidth:1},_=s.leftForLtr(h,c)+c/2,S=m+l/2;t.strokeStyle=o.multiKeyBackground,t.fillStyle=o.multiKeyBackground,da(t,y,_,S),t.strokeStyle=r.borderColor,t.fillStyle=r.backgroundColor,da(t,y,_,S)}else{t.lineWidth=X(r.borderWidth)?Math.max(...Object.values(r.borderWidth)):r.borderWidth||1,t.strokeStyle=r.borderColor,t.setLineDash(r.borderDash||[]),t.lineDashOffset=r.borderDashOffset||0;const y=s.leftForLtr(h,c),_=s.leftForLtr(s.xPlus(h,1),c-2),S=Di(r.borderRadius);Object.values(S).some(R=>R!==0)?(t.beginPath(),t.fillStyle=o.multiKeyBackground,ua(t,{x:y,y:m,w:c,h:l,radius:S}),t.fill(),t.stroke(),t.fillStyle=r.backgroundColor,t.beginPath(),ua(t,{x:_,y:m+1,w:c-2,h:l-2,radius:S}),t.fill()):(t.fillStyle=o.multiKeyBackground,t.fillRect(y,m,c,l),t.strokeRect(y,m,c,l),t.fillStyle=r.backgroundColor,t.fillRect(_,m+1,c-2,l-2))}t.fillStyle=this.labelTextColors[i]}drawBody(t,n,i){const{body:s}=this,{bodySpacing:o,bodyAlign:r,displayColors:a,boxHeight:l,boxWidth:c,boxPadding:d}=i,u=ze(i.bodyFont);let h=u.lineHeight,g=0;const m=Bn(i.rtl,this.x,this.width),y=function(P){n.fillText(P,m.x(t.x+g),t.y+h/2),t.y+=h+o},_=m.textAlign(r);let S,R,M,A,T,v,E;for(n.textAlign=r,n.textBaseline="middle",n.font=u.string,t.x=Ds(this,_,i),n.fillStyle=i.bodyColor,ie(this.beforeBody,y),g=a&&_!=="right"?r==="center"?c/2+d:c+2+d:0,A=0,v=s.length;A<v;++A){for(S=s[A],R=this.labelTextColors[A],n.fillStyle=R,ie(S.before,y),M=S.lines,a&&M.length&&(this._drawColorBox(n,t,A,m,i),h=Math.max(u.lineHeight,l)),T=0,E=M.length;T<E;++T)y(M[T]),h=u.lineHeight;ie(S.after,y)}g=0,h=u.lineHeight,ie(this.afterBody,y),t.y-=o}drawFooter(t,n,i){const s=this.footer,o=s.length;let r,a;if(o){const l=Bn(i.rtl,this.x,this.width);for(t.x=Ds(this,i.footerAlign,i),t.y+=i.footerMarginTop,n.textAlign=l.textAlign(i.footerAlign),n.textBaseline="middle",r=ze(i.footerFont),n.fillStyle=i.footerColor,n.font=r.string,a=0;a<o;++a)n.fillText(s[a],l.x(t.x),t.y+r.lineHeight/2),t.y+=r.lineHeight+i.footerSpacing}}drawBackground(t,n,i,s){const{xAlign:o,yAlign:r}=this,{x:a,y:l}=t,{width:c,height:d}=i,{topLeft:u,topRight:h,bottomLeft:g,bottomRight:m}=Di(s.cornerRadius);n.fillStyle=s.backgroundColor,n.strokeStyle=s.borderColor,n.lineWidth=s.borderWidth,n.beginPath(),n.moveTo(a+u,l),r==="top"&&this.drawCaret(t,n,i,s),n.lineTo(a+c-h,l),n.quadraticCurveTo(a+c,l,a+c,l+h),r==="center"&&o==="right"&&this.drawCaret(t,n,i,s),n.lineTo(a+c,l+d-m),n.quadraticCurveTo(a+c,l+d,a+c-m,l+d),r==="bottom"&&this.drawCaret(t,n,i,s),n.lineTo(a+g,l+d),n.quadraticCurveTo(a,l+d,a,l+d-g),r==="center"&&o==="left"&&this.drawCaret(t,n,i,s),n.lineTo(a,l+u),n.quadraticCurveTo(a,l,a+u,l),n.closePath(),n.fill(),s.borderWidth>0&&n.stroke()}_updateAnimationTarget(t){const n=this.chart,i=this.$animations,s=i&&i.x,o=i&&i.y;if(s||o){const r=_i[t.position].call(this,this._active,this._eventPosition);if(!r)return;const a=this._size=hu(this,t),l=Object.assign({},r,this._size),c=fu(n,t,l),d=pu(t,l,c,n);(s._to!==d.x||o._to!==d.y)&&(this.xAlign=c.xAlign,this.yAlign=c.yAlign,this.width=a.width,this.height=a.height,this.caretX=r.x,this.caretY=r.y,this._resolveAnimations().update(this,d))}}_willRender(){return!!this.opacity}draw(t){const n=this.options.setContext(this.getContext());let i=this.opacity;if(!i)return;this._updateAnimationTarget(n);const s={width:this.width,height:this.height},o={x:this.x,y:this.y};i=Math.abs(i)<.001?0:i;const r=nt(n.padding),a=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;n.enabled&&a&&(t.save(),t.globalAlpha=i,this.drawBackground(o,t,s,n),Nf(t,n.textDirection),o.y+=r.top,this.drawTitle(o,t,n),this.drawBody(o,t,n),this.drawFooter(o,t,n),Bf(t,n.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,n){const i=this._active,s=t.map(({datasetIndex:a,index:l})=>{const c=this.chart.getDatasetMeta(a);if(!c)throw new Error("Cannot find a dataset at index "+a);return{datasetIndex:a,element:c.data[l],index:l}}),o=!io(i,s),r=this._positionChanged(s,n);(o||r)&&(this._active=s,this._eventPosition=n,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,n,i=!0){if(n&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const s=this.options,o=this._active||[],r=this._getActiveElements(t,o,n,i),a=this._positionChanged(r,t),l=n||!io(r,o)||a;return l&&(this._active=r,(s.enabled||s.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,n))),l}_getActiveElements(t,n,i,s){const o=this.options;if(t.type==="mouseout")return[];if(!s)return n.filter(a=>this.chart.data.datasets[a.datasetIndex]&&this.chart.getDatasetMeta(a.datasetIndex).controller.getParsed(a.index)!==void 0);const r=this.chart.getElementsAtEventForMode(t,o.mode,o,i);return o.reverse&&r.reverse(),r}_positionChanged(t,n){const{caretX:i,caretY:s,options:o}=this,r=_i[o.position].call(this,t,n);return r!==!1&&(i!==r.x||s!==r.y)}}N(ma,"positioners",_i);var C$={id:"tooltip",_element:ma,positioners:_i,afterInit(e,t,n){n&&(e.tooltip=new ma({chart:e,options:n}))},beforeUpdate(e,t,n){e.tooltip&&e.tooltip.initialize(n)},reset(e,t,n){e.tooltip&&e.tooltip.initialize(n)},afterDraw(e){const t=e.tooltip;if(t&&t._willRender()){const n={tooltip:t};if(e.notifyPlugins("beforeTooltipDraw",{...n,cancelable:!0})===!1)return;t.draw(e.ctx),e.notifyPlugins("afterTooltipDraw",n)}},afterEvent(e,t){if(e.tooltip){const n=t.replay;e.tooltip.handleEvent(t.event,n,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(e,t)=>t.bodyFont.size,boxWidth:(e,t)=>t.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:rp},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:e=>e!=="filter"&&e!=="itemSort"&&e!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]};const E$=(e,t,n,i)=>(typeof t=="string"?(n=e.push(t)-1,i.unshift({index:n,label:t})):isNaN(t)&&(n=null),n);function R$(e,t,n,i){const s=e.indexOf(t);if(s===-1)return E$(e,t,n,i);const o=e.lastIndexOf(t);return s!==o?n:s}const P$=(e,t)=>e===null?null:je(Math.round(e),0,t);function yu(e){const t=this.getLabels();return e>=0&&e<t.length?t[e]:e}class ya extends ei{constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){const n=this._addedLabels;if(n.length){const i=this.getLabels();for(const{index:s,label:o}of n)i[s]===o&&i.splice(s,1);this._addedLabels=[]}super.init(t)}parse(t,n){if(le(t))return null;const i=this.getLabels();return n=isFinite(n)&&i[n]===t?n:R$(i,t,Y(n,t),this._addedLabels),P$(n,i.length-1)}determineDataLimits(){const{minDefined:t,maxDefined:n}=this.getUserBounds();let{min:i,max:s}=this.getMinMax(!0);this.options.bounds==="ticks"&&(t||(i=0),n||(s=this.getLabels().length-1)),this.min=i,this.max=s}buildTicks(){const t=this.min,n=this.max,i=this.options.offset,s=[];let o=this.getLabels();o=t===0&&n===o.length-1?o:o.slice(t,n+1),this._valueRange=Math.max(o.length-(i?0:1),1),this._startValue=this.min-(i?.5:0);for(let r=t;r<=n;r++)s.push({value:r});return s}getLabelForValue(t){return yu.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return typeof t!="number"&&(t=this.parse(t)),t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){const n=this.ticks;return t<0||t>n.length-1?null:this.getPixelForValue(n[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}}N(ya,"id","category"),N(ya,"defaults",{ticks:{callback:yu}});function M$(e,t){const n=[],{bounds:s,step:o,min:r,max:a,precision:l,count:c,maxTicks:d,maxDigits:u,includeBounds:h}=e,g=o||1,m=d-1,{min:y,max:_}=t,S=!le(r),R=!le(a),M=!le(c),A=(_-y)/(u+1);let T=yd((_-y)/m/g)*g,v,E,P,C;if(T<1e-14&&!S&&!R)return[{value:y},{value:_}];C=Math.ceil(_/T)-Math.floor(y/T),C>m&&(T=yd(C*T/m/g)*g),le(l)||(v=Math.pow(10,l),T=Math.ceil(T*v)/v),s==="ticks"?(E=Math.floor(y/T)*T,P=Math.ceil(_/T)*T):(E=y,P=_),S&&R&&o&&n1((a-r)/o,T/1e3)?(C=Math.round(Math.min((a-r)/T,d)),T=(a-r)/C,E=r,P=a):M?(E=S?r:E,P=R?a:P,C=c-1,T=(P-E)/C):(C=(P-E)/T,Ri(C,Math.round(C),T/1e3)?C=Math.round(C):C=Math.ceil(C));const O=Math.max(vd(T),vd(E));v=Math.pow(10,le(l)?O:l),E=Math.round(E*v)/v,P=Math.round(P*v)/v;let D=0;for(S&&(h&&E!==r?(n.push({value:r}),E<r&&D++,Ri(Math.round((E+D*T)*v)/v,r,vu(r,A,e))&&D++):E<r&&D++);D<C;++D){const F=Math.round((E+D*T)*v)/v;if(R&&F>a)break;n.push({value:F})}return R&&h&&P!==a?n.length&&Ri(n[n.length-1].value,a,vu(a,A,e))?n[n.length-1].value=a:n.push({value:a}):(!R||P===a)&&n.push({value:P}),n}function vu(e,t,{horizontal:n,minRotation:i}){const s=an(i),o=(n?Math.sin(s):Math.cos(s))||.001,r=.75*t*(""+e).length;return Math.min(t/o,r)}class D$ extends ei{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,n){return le(t)||(typeof t=="number"||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){const{beginAtZero:t}=this.options,{minDefined:n,maxDefined:i}=this.getUserBounds();let{min:s,max:o}=this;const r=l=>s=n?s:l,a=l=>o=i?o:l;if(t){const l=Qn(s),c=Qn(o);l<0&&c<0?a(0):l>0&&c>0&&r(0)}if(s===o){let l=o===0?1:Math.abs(o*.05);a(o+l),t||r(s-l)}this.min=s,this.max=o}getTickLimit(){const t=this.options.ticks;let{maxTicksLimit:n,stepSize:i}=t,s;return i?(s=Math.ceil(this.max/i)-Math.floor(this.min/i)+1,s>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${i} would result generating up to ${s} ticks. Limiting to 1000.`),s=1e3)):(s=this.computeTickLimit(),n=n||11),n&&(s=Math.min(n,s)),s}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const t=this.options,n=t.ticks;let i=this.getTickLimit();i=Math.max(2,i);const s={maxTicks:i,bounds:t.bounds,min:t.min,max:t.max,precision:n.precision,step:n.stepSize,count:n.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:n.minRotation||0,includeBounds:n.includeBounds!==!1},o=this._range||this,r=M$(s,o);return t.bounds==="ticks"&&i1(r,this,"value"),t.reverse?(r.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),r}configure(){const t=this.ticks;let n=this.min,i=this.max;if(super.configure(),this.options.offset&&t.length){const s=(i-n)/Math.max(t.length-1,1)/2;n-=s,i+=s}this._startValue=n,this._endValue=i,this._valueRange=i-n}getLabelForValue(t){return Ef(t,this.chart.options.locale,this.options.ticks.format)}}class va extends D${determineDataLimits(){const{min:t,max:n}=this.getMinMax(!0);this.min=Re(t)?t:0,this.max=Re(n)?n:1,this.handleTickRangeOptions()}computeTickLimit(){const t=this.isHorizontal(),n=t?this.width:this.height,i=an(this.options.ticks.minRotation),s=(t?Math.sin(i):Math.cos(i))||.001,o=this._resolveTickFontOptions(0);return Math.ceil(n/Math.min(40,o.lineHeight/s))}getPixelForValue(t){return t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}}N(va,"id","linear"),N(va,"defaults",{ticks:{callback:Rf.formatters.numeric}});const Oo={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},Ne=Object.keys(Oo);function bu(e,t){return e-t}function wu(e,t){if(le(t))return null;const n=e._adapter,{parser:i,round:s,isoWeekday:o}=e._parseOpts;let r=t;return typeof i=="function"&&(r=i(r)),Re(r)||(r=typeof i=="string"?n.parse(r,i):n.parse(r)),r===null?null:(s&&(r=s==="week"&&(ji(o)||o===!0)?n.startOf(r,"isoWeek",o):n.startOf(r,s)),+r)}function xu(e,t,n,i){const s=Ne.length;for(let o=Ne.indexOf(e);o<s-1;++o){const r=Oo[Ne[o]],a=r.steps?r.steps:Number.MAX_SAFE_INTEGER;if(r.common&&Math.ceil((n-t)/(a*r.size))<=i)return Ne[o]}return Ne[s-1]}function L$(e,t,n,i,s){for(let o=Ne.length-1;o>=Ne.indexOf(n);o--){const r=Ne[o];if(Oo[r].common&&e._adapter.diff(s,i,r)>=t-1)return r}return Ne[n?Ne.indexOf(n):0]}function I$(e){for(let t=Ne.indexOf(e)+1,n=Ne.length;t<n;++t)if(Oo[Ne[t]].common)return Ne[t]}function _u(e,t,n){if(!n)e[t]=!0;else if(n.length){const{lo:i,hi:s}=fl(n,t),o=n[i]>=t?n[i]:n[s];e[o]=!0}}function O$(e,t,n,i){const s=e._adapter,o=+s.startOf(t[0].value,i),r=t[t.length-1].value;let a,l;for(a=o;a<=r;a=+s.add(a,1,i))l=n[a],l>=0&&(t[l].major=!0);return t}function ku(e,t,n){const i=[],s={},o=t.length;let r,a;for(r=0;r<o;++r)a=t[r],s[a]=r,i.push({value:a,major:!1});return o===0||!n?i:O$(e,i,s,n)}class ho extends ei{constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,n={}){const i=t.time||(t.time={}),s=this._adapter=new Pk._date(t.adapters.date);s.init(n),Ei(i.displayFormats,s.formats()),this._parseOpts={parser:i.parser,round:i.round,isoWeekday:i.isoWeekday},super.init(t),this._normalized=n.normalized}parse(t,n){return t===void 0?null:wu(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const t=this.options,n=this._adapter,i=t.time.unit||"day";let{min:s,max:o,minDefined:r,maxDefined:a}=this.getUserBounds();function l(c){!r&&!isNaN(c.min)&&(s=Math.min(s,c.min)),!a&&!isNaN(c.max)&&(o=Math.max(o,c.max))}(!r||!a)&&(l(this._getLabelBounds()),(t.bounds!=="ticks"||t.ticks.source!=="labels")&&l(this.getMinMax(!1))),s=Re(s)&&!isNaN(s)?s:+n.startOf(Date.now(),i),o=Re(o)&&!isNaN(o)?o:+n.endOf(Date.now(),i)+1,this.min=Math.min(s,o-1),this.max=Math.max(s+1,o)}_getLabelBounds(){const t=this.getLabelTimestamps();let n=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY;return t.length&&(n=t[0],i=t[t.length-1]),{min:n,max:i}}buildTicks(){const t=this.options,n=t.time,i=t.ticks,s=i.source==="labels"?this.getLabelTimestamps():this._generate();t.bounds==="ticks"&&s.length&&(this.min=this._userMin||s[0],this.max=this._userMax||s[s.length-1]);const o=this.min,r=this.max,a=c1(s,o,r);return this._unit=n.unit||(i.autoSkip?xu(n.minUnit,this.min,this.max,this._getLabelCapacity(o)):L$(this,a.length,n.minUnit,this.min,this.max)),this._majorUnit=!i.major.enabled||this._unit==="year"?void 0:I$(this._unit),this.initOffsets(s),t.reverse&&a.reverse(),ku(this,a,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(t=>+t.value))}initOffsets(t=[]){let n=0,i=0,s,o;this.options.offset&&t.length&&(s=this.getDecimalForValue(t[0]),t.length===1?n=1-s:n=(this.getDecimalForValue(t[1])-s)/2,o=this.getDecimalForValue(t[t.length-1]),t.length===1?i=o:i=(o-this.getDecimalForValue(t[t.length-2]))/2);const r=t.length<3?.5:.25;n=je(n,0,r),i=je(i,0,r),this._offsets={start:n,end:i,factor:1/(n+1+i)}}_generate(){const t=this._adapter,n=this.min,i=this.max,s=this.options,o=s.time,r=o.unit||xu(o.minUnit,n,i,this._getLabelCapacity(n)),a=Y(s.ticks.stepSize,1),l=r==="week"?o.isoWeekday:!1,c=ji(l)||l===!0,d={};let u=n,h,g;if(c&&(u=+t.startOf(u,"isoWeek",l)),u=+t.startOf(u,c?"day":r),t.diff(i,n,r)>1e5*a)throw new Error(n+" and "+i+" are too far apart with stepSize of "+a+" "+r);const m=s.ticks.source==="data"&&this.getDataTimestamps();for(h=u,g=0;h<i;h=+t.add(h,a,r),g++)_u(d,h,m);return(h===i||s.bounds==="ticks"||g===1)&&_u(d,h,m),Object.keys(d).sort(bu).map(y=>+y)}getLabelForValue(t){const n=this._adapter,i=this.options.time;return i.tooltipFormat?n.format(t,i.tooltipFormat):n.format(t,i.displayFormats.datetime)}format(t,n){const s=this.options.time.displayFormats,o=this._unit,r=n||s[o];return this._adapter.format(t,r)}_tickFormatFunction(t,n,i,s){const o=this.options,r=o.ticks.callback;if(r)return ce(r,[t,n,i],this);const a=o.time.displayFormats,l=this._unit,c=this._majorUnit,d=l&&a[l],u=c&&a[c],h=i[n],g=c&&u&&h&&h.major;return this._adapter.format(t,s||(g?u:d))}generateTickLabels(t){let n,i,s;for(n=0,i=t.length;n<i;++n)s=t[n],s.label=this._tickFormatFunction(s.value,n,t)}getDecimalForValue(t){return t===null?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){const n=this._offsets,i=this.getDecimalForValue(t);return this.getPixelForDecimal((n.start+i)*n.factor)}getValueForPixel(t){const n=this._offsets,i=this.getDecimalForPixel(t)/n.factor-n.end;return this.min+i*(this.max-this.min)}_getLabelSize(t){const n=this.options.ticks,i=this.ctx.measureText(t).width,s=an(this.isHorizontal()?n.maxRotation:n.minRotation),o=Math.cos(s),r=Math.sin(s),a=this._resolveTickFontOptions(0).size;return{w:i*o+a*r,h:i*r+a*o}}_getLabelCapacity(t){const n=this.options.time,i=n.displayFormats,s=i[n.unit]||i.millisecond,o=this._tickFormatFunction(t,0,ku(this,[t],this._majorUnit),s),r=this._getLabelSize(o),a=Math.floor(this.isHorizontal()?this.width/r.w:this.height/r.h)-1;return a>0?a:1}getDataTimestamps(){let t=this._cache.data||[],n,i;if(t.length)return t;const s=this.getMatchingVisibleMetas();if(this._normalized&&s.length)return this._cache.data=s[0].controller.getAllParsedValues(this);for(n=0,i=s.length;n<i;++n)t=t.concat(s[n].controller.getAllParsedValues(this));return this._cache.data=this.normalize(t)}getLabelTimestamps(){const t=this._cache.labels||[];let n,i;if(t.length)return t;const s=this.getLabels();for(n=0,i=s.length;n<i;++n)t.push(wu(this,s[n]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return u1(t.sort(bu))}}N(ho,"id","time"),N(ho,"defaults",{bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}});function Ls(e,t,n){let i=0,s=e.length-1,o,r,a,l;n?(t>=e[i].pos&&t<=e[s].pos&&({lo:i,hi:s}=ln(e,"pos",t)),{pos:o,time:a}=e[i],{pos:r,time:l}=e[s]):(t>=e[i].time&&t<=e[s].time&&({lo:i,hi:s}=ln(e,"time",t)),{time:o,pos:a}=e[i],{time:r,pos:l}=e[s]);const c=r-o;return c?a+(l-a)*(t-o)/c:a}class $u extends ho{constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const t=this._getTimestampsForTable(),n=this._table=this.buildLookupTable(t);this._minPos=Ls(n,this.min),this._tableRange=Ls(n,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){const{min:n,max:i}=this,s=[],o=[];let r,a,l,c,d;for(r=0,a=t.length;r<a;++r)c=t[r],c>=n&&c<=i&&s.push(c);if(s.length<2)return[{time:n,pos:0},{time:i,pos:1}];for(r=0,a=s.length;r<a;++r)d=s[r+1],l=s[r-1],c=s[r],Math.round((d+l)/2)!==c&&o.push({time:c,pos:r/(a-1)});return o}_generate(){const t=this.min,n=this.max;let i=super.getDataTimestamps();return(!i.includes(t)||!i.length)&&i.splice(0,0,t),(!i.includes(n)||i.length===1)&&i.push(n),i.sort((s,o)=>s-o)}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;const n=this.getDataTimestamps(),i=this.getLabelTimestamps();return n.length&&i.length?t=this.normalize(n.concat(i)):t=n.length?n:i,t=this._cache.all=t,t}getDecimalForValue(t){return(Ls(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){const n=this._offsets,i=this.getDecimalForPixel(t)/n.factor-n.end;return Ls(this._table,i*this._tableRange+this._minPos,!0)}}N($u,"id","timeseries"),N($u,"defaults",ho.defaults);var F$=Object.defineProperty,N$=Object.getOwnPropertyDescriptor,ns=(e,t,n,i)=>{for(var s=i>1?void 0:i?N$(t,n):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(s=(i?r(t,n,s):r(s))||s);return i&&s&&F$(t,n,s),s};pt.register(Us,Dt,Ks,va,ya,C$,w$,p$);let kn=class extends dn{constructor(){super(...arguments),this.quotationByTime=[],this.oosByTime=[],this.shortageByTime=[],this.loading=!1,this.quotationChart=null,this.stockChart=null}render(){return f`
      <div class="chart-card">
        <div class="chart-title">${p("overview.dashboard.chart.quotationTrend")}</div>
        ${this.loading?f`<div class="empty">${p("overview.dashboard.chart.loading")}</div>`:this.quotationByTime.length===0?f`<div class="empty">${p("overview.dashboard.chart.empty")}</div>`:f`<div class="chart-wrap"><canvas id="quotation-chart"></canvas></div>`}
      </div>
      <div class="chart-card">
        <div class="chart-title">${p("overview.dashboard.chart.stockTrend")}</div>
        ${this.loading?f`<div class="empty">${p("overview.dashboard.chart.loading")}</div>`:this.oosByTime.length===0&&this.shortageByTime.length===0?f`<div class="empty">${p("overview.dashboard.chart.empty")}</div>`:f`<div class="chart-wrap"><canvas id="stock-chart"></canvas></div>`}
      </div>
    `}updated(){this.renderQuotationChart(),this.renderStockChart()}disconnectedCallback(){var e,t;super.disconnectedCallback(),(e=this.quotationChart)==null||e.destroy(),(t=this.stockChart)==null||t.destroy(),this.quotationChart=null,this.stockChart=null}renderQuotationChart(){var i,s,o;const e=(i=this.shadowRoot)==null?void 0:i.getElementById("quotation-chart");if(!e){(s=this.quotationChart)==null||s.destroy(),this.quotationChart=null;return}(o=this.quotationChart)==null||o.destroy();const t=this.quotationByTime.map(r=>(r.date??"").slice(5)),n=this.quotationByTime.map(r=>Number(r.count??0));this.quotationChart=new pt(e,{type:"line",data:{labels:t,datasets:[{label:p("overview.dashboard.chart.quotationSeries"),data:n,borderColor:"#4f8ef7",backgroundColor:"rgba(79,142,247,0.14)",fill:!0,tension:.35,pointRadius:2}]},options:{responsive:!0,maintainAspectRatio:!1,animation:!1,plugins:{legend:{display:!1}},scales:{x:{ticks:{font:{size:12}}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:12}}}},elements:{line:{borderWidth:3},point:{radius:3}}}})}renderStockChart(){var o,r,a;const e=(o=this.shadowRoot)==null?void 0:o.getElementById("stock-chart");if(!e){(r=this.stockChart)==null||r.destroy(),this.stockChart=null;return}(a=this.stockChart)==null||a.destroy();const t=[...new Set([...this.oosByTime.map(l=>l.date??""),...this.shortageByTime.map(l=>l.date??"")])].filter(Boolean).sort(),n=t.map(l=>l.slice(5)),i=Object.fromEntries(this.oosByTime.map(l=>[l.date??"",Number(l.count??0)])),s=Object.fromEntries(this.shortageByTime.map(l=>[l.date??"",Number(l.count??0)]));this.stockChart=new pt(e,{type:"line",data:{labels:n,datasets:[{label:p("overview.dashboard.chart.oosSeries"),data:t.map(l=>i[l]??0),borderColor:"#e25555",backgroundColor:"rgba(226,85,85,0.12)",fill:!0,tension:.35,pointRadius:2},{label:p("overview.dashboard.chart.shortageSeries"),data:t.map(l=>s[l]??0),borderColor:"#f5a623",backgroundColor:"rgba(245,166,35,0.12)",fill:!0,tension:.35,pointRadius:2}]},options:{responsive:!0,maintainAspectRatio:!1,animation:!1,plugins:{legend:{display:!0,position:"top",labels:{font:{size:12}}}},scales:{x:{ticks:{font:{size:12}}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:12}}}},elements:{line:{borderWidth:3},point:{radius:3}}}})}};kn.styles=Tu`
    :host {
      display: grid;
      grid-template-columns: 1fr;
      gap: 14px;
    }
    .chart-card {
      background: var(--bg-elev, #fff);
      border: 1px solid var(--border, #2e2e2e);
      border-radius: 12px;
      padding: 14px;
    }
    .chart-title {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 12px;
      color: var(--text, #111);
    }
    .chart-wrap {
      position: relative;
      width: 100%;
      height: 280px;
    }
    canvas {
      width: 100% !important;
      height: 100% !important;
    }
    .empty {
      font-size: 12px;
      color: var(--text-dim, #9aa0a6);
      padding: 26px 0;
      text-align: center;
    }
  `;ns([Ut({attribute:!1})],kn.prototype,"quotationByTime",2);ns([Ut({attribute:!1})],kn.prototype,"oosByTime",2);ns([Ut({attribute:!1})],kn.prototype,"shortageByTime",2);ns([Ut({type:Boolean})],kn.prototype,"loading",2);kn=ns([ka("dashboard-charts")],kn);function B$(e){var c,d,u,h,g,m,y,_,S;const t=(c=e.hello)==null?void 0:c.snapshot,n=t!=null&&t.uptimeMs?Eg(t.uptimeMs):p("common.na"),i=(d=t==null?void 0:t.policy)!=null&&d.tickIntervalMs?`${t.policy.tickIntervalMs}ms`:p("common.na"),o=(t==null?void 0:t.authMode)==="trusted-proxy",r=(()=>{if(e.connected||!e.lastError)return null;const R=e.lastError.toLowerCase();if(!(R.includes("unauthorized")||R.includes("connect failed")))return null;const A=!!e.settings.token.trim(),T=!!e.password.trim();return!A&&!T?f`
        <div class="muted" style="margin-top: 8px">
          ${p("overview.auth.required")}
          <div style="margin-top: 6px">
            <span class="mono">openclaw dashboard --no-open</span> → tokenized URL<br />
            <span class="mono">openclaw doctor --generate-gateway-token</span> → set token
          </div>
          <div style="margin-top: 6px">
            <a
              class="session-link"
              href="https://docs.openclaw.ai/web/dashboard"
              target="_blank"
              rel="noreferrer"
              title="Control UI auth docs (opens in new tab)"
              >Docs: Control UI auth</a
            >
          </div>
        </div>
      `:f`
      <div class="muted" style="margin-top: 8px">
        ${p("overview.auth.failed",{command:"openclaw dashboard --no-open"})}
        <div style="margin-top: 6px">
          <a
            class="session-link"
            href="https://docs.openclaw.ai/web/dashboard"
            target="_blank"
            rel="noreferrer"
            title="Control UI auth docs (opens in new tab)"
            >Docs: Control UI auth</a
          >
        </div>
      </div>
    `})(),a=(()=>{if(e.connected||!e.lastError||(typeof window<"u"?window.isSecureContext:!0))return null;const M=e.lastError.toLowerCase();return!M.includes("secure context")&&!M.includes("device identity required")?null:f`
      <div class="muted" style="margin-top: 8px">
        ${p("overview.insecure.hint",{url:"http://127.0.0.1:18789"})}
        <div style="margin-top: 6px">
          ${p("overview.insecure.stayHttp",{config:"gateway.controlUi.allowInsecureAuth: true"})}
        </div>
        <div style="margin-top: 6px">
          <a
            class="session-link"
            href="https://docs.openclaw.ai/gateway/tailscale"
            target="_blank"
            rel="noreferrer"
            title="Tailscale Serve docs (opens in new tab)"
            >Docs: Tailscale Serve</a
          >
          <span class="muted"> · </span>
          <a
            class="session-link"
            href="https://docs.openclaw.ai/web/control-ui#insecure-http"
            target="_blank"
            rel="noreferrer"
            title="Insecure HTTP docs (opens in new tab)"
            >Docs: Insecure HTTP</a
          >
        </div>
      </div>
    `})(),l=gn.getLocale();return f`
    <section class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <div>
          <div class="card-title">${p("overview.health.title")}</div>
          <div class="card-sub">
            ${p("overview.health.subtitle")}
          </div>
        </div>
        <div
          class="pill ${e.connected?"success":"danger"}"
          style="font-weight: 600; min-width: 96px; justify-content: center;"
        >
          ${e.connected?p("common.ok"):p("common.offline")}
        </div>
      </div>
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        <div class="card stat-card" style="min-width: 140px;">
          <div class="stat-label">${p("overview.stats.instances")}</div>
          <div class="stat-value">${e.presenceCount}</div>
          <div class="muted">${p("overview.stats.instancesHint")}</div>
        </div>
        <div class="card stat-card" style="min-width: 140px;">
          <div class="stat-label">${p("overview.stats.sessions")}</div>
          <div class="stat-value">${e.sessionsCount??p("common.na")}</div>
          <div class="muted">${p("overview.stats.sessionsHint")}</div>
        </div>
        <div class="card stat-card" style="min-width: 140px;">
          <div class="stat-label">${p("overview.stats.cron")}</div>
          <div class="stat-value">
            ${e.cronEnabled==null?p("common.na"):e.cronEnabled?p("common.enabled"):p("common.disabled")}
          </div>
          <div class="muted">
            ${p("overview.stats.cronNext",{time:kx(e.cronNext)})}
          </div>
        </div>
      </div>
      ${e.lastError?f`<div class="callout danger" style="margin-top: 12px;">
              <div style="font-weight: 600; margin-bottom: 4px;">
                ${p("overview.health.lastErrorLabel")}
              </div>
              <div>${e.lastError}</div>
            </div>`:f`<div class="muted" style="margin-top: 12px;">
              ${p("overview.health.noError")}
            </div>`}
    </section>

    <section class="grid grid-cols-2">
      <div class="card">
        <div class="card-title">${p("overview.access.title")}</div>
        <div class="card-sub">${p("overview.access.subtitle")}</div>
        <div class="form-grid" style="margin-top: 16px;">
          <label class="field">
            <span>${p("overview.access.wsUrl")}</span>
            <input
              .value=${e.settings.gatewayUrl}
              @input=${R=>{const M=R.target.value;e.onSettingsChange({...e.settings,gatewayUrl:M})}}
              placeholder="ws://100.x.y.z:18789"
            />
          </label>
          ${o?"":f`
                <label class="field">
                  <span>${p("overview.access.token")}</span>
                  <input
                    .value=${e.settings.token}
                    @input=${R=>{const M=R.target.value;e.onSettingsChange({...e.settings,token:M})}}
                    placeholder="JAGENT_GATEWAY_TOKEN"
                  />
                </label>
                <label class="field">
                  <span>${p("overview.access.password")}</span>
                  <input
                    type="password"
                    .value=${e.password}
                    @input=${R=>{const M=R.target.value;e.onPasswordChange(M)}}
                    placeholder="system or shared password"
                  />
                </label>
              `}
          <label class="field">
            <span>${p("overview.access.sessionKey")}</span>
            <input
              .value=${e.settings.sessionKey}
              @input=${R=>{const M=R.target.value;e.onSessionKeyChange(M)}}
            />
          </label>
          <label class="field">
            <span>${p("overview.access.language")}</span>
            <select
              .value=${l}
          style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 160px;"
              @change=${R=>{const M=R.target.value;gn.setLocale(M),e.onSettingsChange({...e.settings,locale:M})}}
            >
              <option value="en">${p("languages.en")}</option>
              <option value="zh-CN">${p("languages.zhCN")}</option>
            </select>
          </label>
        </div>
        <div class="row" style="margin-top: 14px;">
          <button class="btn" @click=${()=>e.onConnect()}>${p("common.connect")}</button>
          <button class="btn" @click=${()=>e.onRefresh()}>${p("common.refresh")}</button>
          <span class="muted">${p(o?"overview.access.trustedProxy":"overview.access.connectHint")}</span>
        </div>
      </div>

      <div class="card">
        <div class="card-title">${p("overview.snapshot.title")}</div>
        <div class="card-sub">${p("overview.snapshot.subtitle")}</div>
        <div class="stat-grid" style="margin-top: 16px;">
          <div class="stat">
            <div class="stat-label">${p("overview.snapshot.status")}</div>
            <div class="stat-value ${e.connected?"ok":"warn"}">
              ${e.connected?p("common.ok"):p("common.offline")}
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">${p("overview.snapshot.uptime")}</div>
            <div class="stat-value">${n}</div>
          </div>
          <div class="stat">
            <div class="stat-label">${p("overview.snapshot.tickInterval")}</div>
            <div class="stat-value">${i}</div>
          </div>
          <div class="stat">
            <div class="stat-label">${p("overview.snapshot.lastChannelsRefresh")}</div>
            <div class="stat-value">
              ${e.lastChannelsRefresh?Gi(e.lastChannelsRefresh):p("common.na")}
            </div>
          </div>
        </div>
        ${e.lastError?f`<div class="callout danger" style="margin-top: 14px;">
              <div>${e.lastError}</div>
              ${r??""}
              ${a??""}
            </div>`:f`
                <div class="callout" style="margin-top: 14px">
                  ${p("overview.snapshot.channelsHint")}
                </div>
              `}
      </div>
    </section>

    <section style="margin-top: 18px;">
      <div class="row" style="gap: 12px; flex-wrap: wrap;">
        <div class="card stat-card" style="min-width: 130px;">
          <div class="stat-value">${((u=e.oosStats)==null?void 0:u.out_of_stock_count)??"—"}</div>
          <div class="stat-label">${p("overview.dashboard.kpi.oosProducts")}</div>
        </div>
        <div class="card stat-card" style="min-width: 130px;">
          <div class="stat-value">${((h=e.shortageStats)==null?void 0:h.shortage_product_count)??"—"}</div>
          <div class="stat-label">${p("overview.dashboard.kpi.shortageProducts")}</div>
        </div>
        <div class="card stat-card" style="min-width: 130px;">
          <div class="stat-value">${((g=e.quotationStats)==null?void 0:g.pending_count)??"—"}</div>
          <div class="stat-label">${p("overview.dashboard.kpi.pendingQuotations")}</div>
        </div>
        <div class="card stat-card" style="min-width: 130px;">
          <div class="stat-value">${((m=e.quotationStats)==null?void 0:m.today_count)??"—"}</div>
          <div class="stat-label">${p("overview.dashboard.kpi.todayNewQuotations")}</div>
        </div>
        <div class="card stat-card" style="min-width: 130px;">
          <div class="stat-value">${((y=e.quotationStats)==null?void 0:y.shortage_count)??"—"}</div>
          <div class="stat-label">${p("overview.dashboard.kpi.shortageQuotations")}</div>
        </div>
        <div class="card stat-card" style="min-width: 130px;">
          <div class="stat-value">${((_=e.quotationStats)==null?void 0:_.replenishment_count)??"—"}</div>
          <div class="stat-label">${p("overview.dashboard.kpi.replenishmentDrafts")}</div>
        </div>
      </div>
    </section>

    ${e.dashboardError?f`<section style="margin-top: 12px;">
            <div class="callout danger">${p("overview.dashboard.error",{error:e.dashboardError})}</div>
          </section>`:""}

    <section style="margin-top: 18px;">
      <dashboard-charts
        .quotationByTime=${((S=e.quotationStats)==null?void 0:S.by_time)??[]}
        .oosByTime=${e.oosByTime}
        .shortageByTime=${e.shortageByTime}
        .loading=${e.dashboardLoading}
      ></dashboard-charts>
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">${p("overview.notes.title")}</div>
      <div class="card-sub">${p("overview.notes.subtitle")}</div>
      <div class="note-grid" style="margin-top: 14px;">
        <div>
          <div class="note-title">${p("overview.notes.tailscaleTitle")}</div>
          <div class="muted">
            ${p("overview.notes.tailscaleText")}
          </div>
        </div>
        <div>
          <div class="note-title">${p("overview.notes.sessionTitle")}</div>
          <div class="muted">${p("overview.notes.sessionText")}</div>
        </div>
        <div>
          <div class="note-title">${p("overview.notes.cronTitle")}</div>
          <div class="muted">${p("overview.notes.cronText")}</div>
        </div>
      </div>
    </section>
  `}function z$(e){var o;const t=((o=e.report)==null?void 0:o.skills)??[],n=e.filter.trim().toLowerCase(),i=n?t.filter(r=>[r.name,r.description,r.source].join(" ").toLowerCase().includes(n)):t,s=q0(i);return f`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Skills</div>
          <div class="card-sub">Bundled, managed, and workspace skills.</div>
        </div>
        <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
          ${e.loading?"Loading…":"Refresh"}
        </button>
      </div>

      <div class="filters" style="margin-top: 14px;">
        <label class="field" style="flex: 1;">
          <span>Filter</span>
          <input
            .value=${e.filter}
            @input=${r=>e.onFilterChange(r.target.value)}
            placeholder="Search skills"
          />
        </label>
        <div class="muted">${i.length} shown</div>
      </div>

      ${e.error?f`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:k}

      ${i.length===0?f`
              <div class="muted" style="margin-top: 16px">No skills found.</div>
            `:f`
            <div class="agent-skills-groups" style="margin-top: 16px;">
              ${s.map(r=>{const a=r.id==="workspace"||r.id==="built-in";return f`
                  <details class="agent-skills-group" ?open=${!a}>
                    <summary class="agent-skills-header">
                      <span>${r.label}</span>
                      <span class="muted">${r.skills.length}</span>
                    </summary>
                    <div class="list skills-grid">
                      ${r.skills.map(l=>H$(l,e))}
                    </div>
                  </details>
                `})}
            </div>
          `}
    </section>
  `}function H$(e,t){const n=t.busyKey===e.skillKey,i=t.edits[e.skillKey]??"",s=t.messages[e.skillKey]??null,o=e.install.length>0&&e.missing.bins.length>0,r=!!(e.bundled&&e.source!=="openclaw-bundled"),a=j0(e),l=K0(e);return f`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">
          ${e.emoji?`${e.emoji} `:""}${e.name}
        </div>
        <div class="list-sub">${Fr(e.description,140)}</div>
        ${W0({skill:e,showBundledBadge:r})}
        ${a.length>0?f`
              <div class="muted" style="margin-top: 6px;">
                Missing: ${a.join(", ")}
              </div>
            `:k}
        ${l.length>0?f`
              <div class="muted" style="margin-top: 6px;">
                Reason: ${l.join(", ")}
              </div>
            `:k}
      </div>
      <div class="list-meta">
        <div class="row" style="justify-content: flex-end; flex-wrap: wrap;">
          <button
            class="btn"
            ?disabled=${n}
            @click=${()=>t.onToggle(e.skillKey,e.disabled)}
          >
            ${e.disabled?"Enable":"Disable"}
          </button>
          ${o?f`<button
                class="btn"
                ?disabled=${n}
                @click=${()=>t.onInstall(e.skillKey,e.name,e.install[0].id)}
              >
                ${n?"Installing…":e.install[0].label}
              </button>`:k}
        </div>
        ${s?f`<div
              class="muted"
              style="margin-top: 8px; color: ${s.kind==="error"?"var(--danger-color, #d14343)":"var(--success-color, #0a7f5a)"};"
            >
              ${s.message}
            </div>`:k}
        ${e.primaryEnv?f`
              <div class="field" style="margin-top: 10px;">
                <span>API key</span>
                <input
                  type="password"
                  .value=${i}
                  @input=${c=>t.onEdit(e.skillKey,c.target.value)}
                />
              </div>
              <button
                class="btn primary"
                style="margin-top: 8px;"
                ?disabled=${n}
                @click=${()=>t.onSaveKey(e.skillKey)}
              >
                Save key
              </button>
            `:k}
      </div>
    </div>
  `}const U$=/^data:/i,q$=/^https?:\/\//i;function j$(e){var a,l;const t=((a=e.agentsList)==null?void 0:a.agents)??[],n=zu(e.sessionKey),i=(n==null?void 0:n.agentId)??((l=e.agentsList)==null?void 0:l.defaultId)??"main",s=t.find(c=>c.id===i),o=s==null?void 0:s.identity,r=(o==null?void 0:o.avatarUrl)??(o==null?void 0:o.avatar);if(r)return U$.test(r)||q$.test(r)?r:o==null?void 0:o.avatarUrl}function K$(e){var g,m,y,_,S,R,M,A,T;const t=e.presenceEntries.length,n=((g=e.sessionsResult)==null?void 0:g.count)??null,i=((m=e.cronStatus)==null?void 0:m.nextWakeAtMs)??null,s=e.connected?null:p("chat.disconnected"),o=e.tab==="chat",r=o&&(e.settings.chatFocusMode||e.onboarding),a=e.onboarding?!1:e.settings.chatShowThinking,l=j$(e),c=e.chatAvatarUrl??l??null;e.configForm??((y=e.configSnapshot)==null||y.config);const d=Jn(e.basePath??""),u=e.agentsSelectedId??((_=e.agentsList)==null?void 0:_.defaultId)??((M=(R=(S=e.agentsList)==null?void 0:S.agents)==null?void 0:R[0])==null?void 0:M.id)??null,h=gn.getLocale();return f`
    <div class="shell ${o?"shell--chat":""} ${r?"shell--chat-focus":""} ${e.settings.navCollapsed?"shell--nav-collapsed":""} ${e.onboarding?"shell--onboarding":""}">
      <header class="topbar">
        <div class="topbar-left">
          <button
            class="nav-collapse-toggle"
            @click=${()=>e.applySettings({...e.settings,navCollapsed:!e.settings.navCollapsed})}
            title="${e.settings.navCollapsed?p("nav.expand"):p("nav.collapse")}"
            aria-label="${e.settings.navCollapsed?p("nav.expand"):p("nav.collapse")}"
          >
            <span class="nav-collapse-toggle__icon">${ye.menu}</span>
          </button>
          <div class="brand">
            <div class="brand-logo">
              <img src=${d?`${d}/favicon.svg`:"/favicon.svg"} alt="PT Vansting Agent" />
            </div>
            <div class="brand-text">
              <div class="brand-title">PT VANSTING AGENT</div>
              <div class="brand-sub">Gateway Dashboard</div>
            </div>
          </div>
        </div>
        <div class="topbar-status">
          <div class="pill">
            <span class="statusDot ${e.connected?"ok":""}"></span>
            <span>${p("common.health")}</span>
            <span class="mono">${e.connected?p("common.ok"):p("common.offline")}</span>
          </div>
          ${B0(e)}
          <label class="topbar-lang">
            <span class="sr-only">${p("overview.access.language")}</span>
            <select
              .value=${h}
              style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 140px;"
              @change=${v=>{const E=v.target.value;gn.setLocale(E),e.applySettings({...e.settings,locale:E})}}
            >
              <option value="en">${p("languages.en")}</option>
              <option value="zh-CN">${p("languages.zhCN")}</option>
            </select>
          </label>
        </div>
      </header>
      <aside class="nav ${e.settings.navCollapsed?"nav--collapsed":""}">
        ${cy.map(v=>{const E=e.settings.navGroupsCollapsed[v.label]??!1,P=v.tabs.some(C=>C===e.tab);return f`
            <div class="nav-group ${E&&!P?"nav-group--collapsed":""}">
              <button
                class="nav-label"
                @click=${()=>{const C={...e.settings.navGroupsCollapsed};C[v.label]=!E,e.applySettings({...e.settings,navGroupsCollapsed:C})}}
                aria-expanded=${!E}
              >
                <span class="nav-label__text">${p(`nav.${v.label}`)}</span>
                <span class="nav-label__chevron">${E?"+":"−"}</span>
              </button>
              <div class="nav-group__items">
                ${v.tabs.map(C=>M0(e,C))}
              </div>
            </div>
          `})}
        <div class="nav-group nav-group--links">
          <div class="nav-label nav-label--static">
            <span class="nav-label__text">${p("common.resources")}</span>
          </div>
          <div class="nav-group__items">
            <a
              class="nav-item nav-item--external"
              href="https://docs.openclaw.ai"
              target="_blank"
              rel="noreferrer"
              title="${p("common.docs")} (opens in new tab)"
            >
              <span class="nav-item__icon" aria-hidden="true">${ye.book}</span>
              <span class="nav-item__text">${p("common.docs")}</span>
            </a>
          </div>
        </div>
      </aside>
      <main class="content ${o?"content--chat":""}">
        <section class="content-header">
          <div>
            ${e.tab==="work"?k:f`<div class="page-title">${qr(e.tab)}</div>`}
            ${e.tab==="work"?k:f`<div class="page-sub">${hy(e.tab)}</div>`}
          </div>
          <div class="page-meta">
            ${e.lastError?f`<div class="pill danger">${e.lastError}</div>`:k}
            ${o?D0(e):k}
          </div>
        </section>

        ${e.tab==="overview"?B$({connected:e.connected,hello:e.hello,settings:e.settings,password:e.password,lastError:e.lastError,presenceCount:t,sessionsCount:n,cronEnabled:((A=e.cronStatus)==null?void 0:A.enabled)??null,cronNext:i,lastChannelsRefresh:e.channelsLastSuccess,oosStats:e.overviewOosStats,shortageStats:e.overviewShortageStats,quotationStats:e.quotationStats,oosByTime:e.dashboardOosByTime,shortageByTime:e.dashboardShortageByTime,dashboardLoading:e.dashboardLoading,dashboardError:e.dashboardError,onSettingsChange:v=>e.applySettings(v),onPasswordChange:v=>e.password=v,onSessionKeyChange:v=>{e.sessionKey=v,e.chatMessage="",e.resetToolStream(),e.applySettings({...e.settings,sessionKey:v,lastActiveSessionKey:v}),e.loadAssistantIdentity()},onConnect:()=>e.connect(),onRefresh:()=>e.loadOverview()}):k}

        ${e.tab==="channels"?Z0({loading:e.bkLoading,saving:e.bkSaving,error:e.bkError,content:e.bkContent,lastSuccessAt:e.bkLastSuccess,dependentFiles:e.bkDependentFiles,onReload:()=>Ku(e),onSave:v=>Cg(e,v),onContentChange:v=>e.bkContent=v}):k}

        ${e.tab==="instances"?f`
                ${Fx({loading:e.oosLoading,error:e.oosError,stats:e.oosStats,list:e.oosList,byFile:e.oosByFile,byTime:e.oosByTime,db:e.oosDb??void 0,onRefresh:()=>bo(e),onDelete:v=>Om(e,v),showAddForm:e.oosShowAddForm,onOpenAddForm:()=>e.oosShowAddForm=!0,onCloseAddForm:()=>e.oosShowAddForm=!1,onAdd:async v=>{const E=await Fm(e,v);return E&&(e.oosShowAddForm=!1),E}})}
                ${Ux({loading:e.shortageLoading,error:e.shortageError,stats:e.shortageStats,list:e.shortageList,byFile:e.shortageByFile,byTime:e.shortageByTime,db:e.shortageDb??void 0,onRefresh:()=>wo(e),onDelete:v=>Bm(e,v),showAddForm:e.shortageShowAddForm,onOpenAddForm:()=>e.shortageShowAddForm=!0,onCloseAddForm:()=>e.shortageShowAddForm=!1,onAdd:async v=>{const E=await zm(e,v);return E&&(e.shortageShowAddForm=!1),E}})}
              `:k}

        ${e.tab==="sessions"?_x({basePath:e.basePath,loading:e.procurementLoading,error:e.procurementError,suggestions:e.procurementSuggestions,selectedKeys:e.procurementSelectedKeys,approvedKeys:e.procurementApprovedKeys,approveBusy:e.procurementApproveBusy,approveResult:e.procurementApproveResult,filterQuery:e.procurementFilterQuery,sortBy:e.procurementSortBy,sortDir:e.procurementSortDir,page:e.procurementPage,pageSize:e.procurementPageSize,replenishmentDrafts:e.replenishmentDrafts,replenishmentDetail:e.replenishmentDetail,replenishmentDetailId:e.replenishmentDetailId,replenishmentLoading:e.replenishmentLoading,replenishmentError:e.replenishmentError,replenishmentConfirmBusy:e.replenishmentConfirmBusy,replenishmentConfirmResult:e.replenishmentConfirmResult,replenishmentInputLines:e.replenishmentInputLines,replenishmentCreateBusy:e.replenishmentCreateBusy,onReplenishmentLineChange:(v,E,P)=>e.onReplenishmentLineChange(v,E,P),onReplenishmentAddLine:()=>e.onReplenishmentAddLine(),onReplenishmentRemoveLine:v=>e.onReplenishmentRemoveLine(v),onCreateReplenishmentDraft:()=>e.createProcurementReplenishmentDraft(),onReplenishmentRefresh:()=>e.loadProcurementReplenishment(),onSelectReplenishmentDraft:v=>{e.loadProcurementReplenishmentDetail(v)},onConfirmReplenishment:v=>{typeof window<"u"&&!window.confirm(p("replenishment.confirmPrompt"))||e.confirmProcurementReplenishment(v)},onDeleteReplenishmentDraft:v=>{typeof window<"u"&&!window.confirm(p("replenishment.deleteConfirm"))||e.deleteProcurementReplenishmentDraft(v)},onClearReplenishmentDetail:()=>{e.replenishmentDetail=null,e.replenishmentDetailId=null},onRefresh:()=>(e.procurementPage=1,e.loadProcurementSuggestions()),onToggleSelect:v=>{e.procurementSelectedKeys.includes(v)?e.procurementSelectedKeys=e.procurementSelectedKeys.filter(E=>E!==v):e.procurementSelectedKeys=[...e.procurementSelectedKeys,v]},onApprove:v=>{if(typeof window<"u"&&!window.confirm(p("procurement.approveConfirm")))return;const E=[{product_key:v.product_key,product_name:v.product_name,specification:v.specification,shortfall:v.shortfall,code:v.code}];sc(e,E).then(P=>{P&&(P.approved_count??0)>0&&(e.procurementApprovedKeys=[...e.procurementApprovedKeys,Ye(v)])})},onApproveBatch:()=>{const v=e.procurementSuggestions.filter(P=>e.procurementSelectedKeys.includes(Ye(P)));if(v.length===0||typeof window<"u"&&!window.confirm(p("procurement.approveBatchConfirm",{count:String(v.length)})))return;const E=v.map(P=>({product_key:P.product_key,product_name:P.product_name,specification:P.specification,shortfall:P.shortfall,code:P.code}));sc(e,E).then(P=>{if(P&&(P.approved_count??0)>0){const C=v.map(O=>Ye(O));e.procurementApprovedKeys=[...e.procurementApprovedKeys,...C],e.procurementSelectedKeys=e.procurementSelectedKeys.filter(O=>!C.includes(O))}})},onFilterQueryChange:v=>{e.procurementFilterQuery=v,e.procurementPage=1},onSortByChange:v=>{e.procurementSortBy=v,e.procurementPage=1},onSortDirChange:v=>{e.procurementSortDir=v,e.procurementPage=1},onPageChange:v=>{e.procurementPage=Math.max(1,v)},onPageSizeChange:v=>{e.procurementPageSize=Math.max(1,v),e.procurementPage=1}}):k}

        ${$0(e)}

        ${e.tab==="cron"?wx({basePath:e.basePath,loading:e.fulfillDraftsLoading,error:e.fulfillDraftsError,drafts:e.fulfillDrafts,detail:e.fulfillDetail,detailId:e.fulfillDetailId,confirmBusy:e.fulfillConfirmBusy,confirmResult:e.fulfillConfirmResult,filterQuery:e.fulfillFilterQuery,sortBy:e.fulfillSortBy,sortDir:e.fulfillSortDir,page:e.fulfillPage,pageSize:e.fulfillPageSize,onRefresh:()=>(e.fulfillPage=1,e.loadFulfillDrafts()),onSelectDraft:v=>zg(e,v),onConfirm:v=>{var D;const E=e.fulfillDetailId===v?e.fulfillDetail:null,P=((D=E==null?void 0:E.lines)==null?void 0:D.length)??0,C=((E==null?void 0:E.lines)??[]).reduce((F,j)=>F+Number(j.amount??0),0),O=P>0?p("fulfill.confirmPrompt",{count:String(P),amount:C.toFixed(2)}):p("fulfill.confirmPromptSimple");typeof window<"u"&&window.confirm(O)&&Hg(e,v).then(F=>{F!=null&&F.order_id&&e.loadProcurementSuggestions()})},onClearDetail:()=>{e.fulfillDetail=null,e.fulfillDetailId=null,e.fulfillConfirmResult=null},onFilterQueryChange:v=>{e.fulfillFilterQuery=v,e.fulfillPage=1},onSortByChange:v=>{e.fulfillSortBy=v,e.fulfillPage=1},onSortDirChange:v=>{e.fulfillSortDir=v,e.fulfillPage=1},onPageChange:v=>{e.fulfillPage=Math.max(1,v)},onPageSizeChange:v=>{e.fulfillPageSize=Math.max(1,v),e.fulfillPage=1}}):k}

        ${e.tab==="agents"?Q0({loading:e.agentsLoading,error:e.agentsError,agentsList:e.agentsList,selectedAgentId:u,activePanel:e.agentsPanel,agentInfo:e.agentInfo,agentInfoLoading:e.agentInfoLoading,agentInfoError:e.agentInfoError,agentIdentityLoading:e.agentIdentityLoading,agentIdentityError:e.agentIdentityError,agentIdentityById:e.agentIdentityById,onRefresh:async()=>{var E,P;await Pa(e),ju(e);const v=((P=(E=e.agentsList)==null?void 0:E.agents)==null?void 0:P.map(C=>C.id))??[];v.length>0&&qu(e,v)},onSelectAgent:v=>{e.agentsSelectedId!==v&&(e.agentsSelectedId=v,Uu(e,v))},onSelectPanel:v=>{e.agentsPanel=v}}):k}

        ${e.tab==="skills"?z$({loading:e.skillsLoading,report:e.skillsReport,error:e.skillsError,filter:e.skillsFilter,edits:e.skillEdits,messages:e.skillMessages,busyKey:e.skillsBusyKey,onFilterChange:v=>e.skillsFilter=v,onRefresh:()=>Yi(e,{clearMessages:!0}),onToggle:(v,E)=>jm(e,v,E),onEdit:(v,E)=>qm(e,v,E),onSaveKey:v=>Km(e,v),onInstall:(v,E,P)=>Wm(e,v,E,P)}):k}

        ${e.tab==="nodes"?a_({loading:e.nodesLoading,nodes:e.nodes,devicesLoading:e.devicesLoading,devicesError:e.devicesError,devicesList:e.devicesList,configForm:e.configForm??((T=e.configSnapshot)==null?void 0:T.config),configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,configFormMode:e.configFormMode,execApprovalsLoading:e.execApprovalsLoading,execApprovalsSaving:e.execApprovalsSaving,execApprovalsDirty:e.execApprovalsDirty,execApprovalsSnapshot:e.execApprovalsSnapshot,execApprovalsForm:e.execApprovalsForm,execApprovalsSelectedAgent:e.execApprovalsSelectedAgent,execApprovalsTarget:e.execApprovalsTarget,execApprovalsTargetNodeId:e.execApprovalsTargetNodeId,onRefresh:()=>mo(e),onDevicesRefresh:()=>Kt(e),onDeviceApprove:v=>Am(e,v),onDeviceReject:v=>Tm(e,v),onDeviceRotate:(v,E,P)=>Cm(e,{deviceId:v,role:E,scopes:P}),onDeviceRevoke:(v,E)=>Em(e,{deviceId:v,role:E}),onLoadConfig:()=>$t(e),onLoadExecApprovals:()=>{const v=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return Ua(e,v)},onBindDefault:v=>{v?Xo(e,["tools","exec","node"],v):Jl(e,["tools","exec","node"])},onBindAgent:(v,E)=>{const P=["agents","list",v,"tools","exec","node"];E?Xo(e,P,E):Jl(e,P)},onSaveBindings:()=>Lr(e),onExecApprovalsTargetChange:(v,E)=>{e.execApprovalsTarget=v,e.execApprovalsTargetNodeId=E,e.execApprovalsSnapshot=null,e.execApprovalsForm=null,e.execApprovalsDirty=!1,e.execApprovalsSelectedAgent=null},onExecApprovalsSelectAgent:v=>{e.execApprovalsSelectedAgent=v},onExecApprovalsPatch:(v,E)=>Lm(e,v,E),onExecApprovalsRemove:v=>Im(e,v),onSaveExecApprovals:()=>{const v=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return Dm(e,v)}}):k}

        ${e.tab==="reports"?__({reportsLoading:e.reportsLoading,reportsError:e.reportsError,reportsTasks:e.reportsTasks,reportsRecords:e.reportsRecords,reportsAdminToken:e.reportsAdminToken,selectedRecordId:e.selectedRecordId,reportDetailLoading:e.reportDetailLoading,reportDetail:e.reportDetail,reportsDetailTab:e.reportsDetailTab,reportsEditingTaskId:e.reportsEditingTaskId,reportsEditForm:e.reportsEditForm,onTokenChange:v=>{e.reportsAdminToken=v},onRefresh:()=>ko(e),onRun:v=>{oy(e,v)},onSelectRecord:v=>{On(),ja(e,v)},onDetailTabChange:v=>{e.reportsDetailTab=v},onReanalyze:v=>{ly(e,v)},onEditTask:v=>{e.reportsEditingTaskId=v.task_key,e.reportsEditForm={enabled:v.enabled,cron_expr:v.cron_expr,timezone:v.timezone,title:v.title}},onCancelEdit:()=>{e.reportsEditingTaskId=null,e.reportsEditForm={}},onEditFormChange:v=>{e.reportsEditForm=v},onSaveEdit:v=>{ry(e,v,e.reportsEditForm).then(()=>{e.reportsError||(e.reportsEditingTaskId=null,e.reportsEditForm={})})}}):k}

        ${e.tab==="chat"?Jw({sessionKey:e.sessionKey,onSessionKeyChange:v=>{e.sessionKey=v,e.chatMessage="",e.chatAttachments=[],e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.chatQueue=[],e.resetToolStream(),e.resetToolRender(),e.ocrResultCards=[],e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:v,lastActiveSessionKey:v}),e.loadAssistantIdentity(),Kn(e),Wr(e)},thinkingLevel:e.chatThinkingLevel,showThinking:a,loading:e.chatLoading,sending:e.chatSending,compactionStatus:e.compactionStatus,toolRenderData:e.toolRenderData,toolRenderSeq:e.toolRenderSeq,toolRenderItems:e.toolRenderItems,candidatePreviews:e.candidatePreviews,ocrResultCards:e.ocrResultCards,assistantAvatarUrl:c,messages:e.chatMessages,toolMessages:e.chatToolMessages,stream:e.chatStream,streamStartedAt:e.chatStreamStartedAt,draft:e.chatMessage,queue:e.chatQueue,connected:e.connected,canSend:e.connected,disabledReason:s,error:e.lastError,sessions:e.sessionsResult,focusMode:r,onRefresh:()=>(e.resetToolStream(),Promise.all([Kn(e),Wr(e)])),onToggleFocusMode:()=>{e.onboarding||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})},onChatScroll:v=>e.handleChatScroll(v),onDraftChange:v=>e.chatMessage=v,attachments:e.chatAttachments,onAttachmentsChange:v=>e.chatAttachments=v,uploadedFile:e.chatUploadedFile,onFileSelect:v=>e.handleUploadChatFile(v),onClearUploadedFile:()=>e.clearChatUploadedFile(),composeDragOver:e.chatComposeDragOver,onComposeDragOver:()=>e.setChatComposeDragOver(!0),onComposeDragLeave:()=>e.setChatComposeDragOver(!1),onComposeDrop:v=>e.handleComposeDrop(v),onSend:()=>e.handleSendChat(),canAbort:!!e.chatRunId,onAbort:()=>void e.handleAbortChat(),onQueueRemove:v=>e.removeQueuedMessage(v),onNewSession:()=>e.handleSendChat("/new",{restoreDraft:!0}),showNewMessages:e.chatNewMessagesBelow&&!e.chatManualRefreshInFlight,onScrollToBottom:()=>e.scrollToBottom(),sidebarOpen:e.sidebarOpen,sidebarContent:e.sidebarContent,sidebarError:e.sidebarError,splitRatio:e.splitRatio,onOpenSidebar:v=>e.handleOpenSidebar(v),onCloseSidebar:()=>e.handleCloseSidebar(),onSplitRatioChange:v=>e.handleSplitRatioChange(v),assistantName:e.assistantName,assistantAvatar:e.assistantAvatar}):k}

        ${e.tab==="config"?yx({raw:e.configRaw,originalRaw:e.configRawOriginal,valid:e.configValid,issues:e.configIssues,loading:e.configLoading,saving:e.configSaving,applying:e.configApplying,updating:e.updateRunning,connected:e.connected,schema:e.configSchema,schemaLoading:e.configSchemaLoading,uiHints:e.configUiHints,formMode:e.configFormMode,formValue:e.configForm,originalValue:e.configFormOriginal,searchQuery:e.configSearchQuery,activeSection:e.configActiveSection,activeSubsection:e.configActiveSubsection,onRawChange:v=>{e.configRaw=v},onFormModeChange:v=>e.configFormMode=v,onFormPatch:(v,E)=>Xo(e,v,E),onSearchChange:v=>e.configSearchQuery=v,onSectionChange:v=>{e.configActiveSection=v,e.configActiveSubsection=null},onSubsectionChange:v=>e.configActiveSubsection=v,onReload:()=>$t(e),onSave:()=>Lr(e),onApply:()=>Zp(e),onUpdate:()=>eg(e)}):k}

        ${e.tab==="admin-data"?Px({host:{basePath:e.basePath??"",adminData:e.adminData},onLogin:async v=>{const E=e;await Gm(E,v),e.adminData.token&&(await un(E),await hn(E))},onLogout:()=>{Tt(e)},onSubTab:v=>{e.adminData={...e.adminData,activeSubTab:v}},onPriceQueryInput:v=>{e.adminData={...e.adminData,priceQuery:v}},onPriceQueryApply:async()=>{e.adminData={...e.adminData,pricePage:1},await un(e)},onPriceRefresh:()=>un(e),onPriceFieldChange:(v,E)=>Qm(e,v,E),onPriceSave:async v=>{const E=e.adminData.priceItems[v];E&&await Xm(e,E)},onPriceDelete:async v=>{await Jm(e,v)},onPriceUpload:async v=>{await Zm(e,v)},onPriceAddRow:()=>Ym(e),onMappingQueryInput:v=>{e.adminData={...e.adminData,mappingQuery:v}},onMappingQueryApply:async()=>{e.adminData={...e.adminData,mappingPage:1},await hn(e)},onMappingRefresh:()=>hn(e),onMappingFieldChange:(v,E)=>ey(e,v,E),onMappingSave:async v=>{const E=e.adminData.mappingItems[v];E&&await ny(e,E)},onMappingDelete:async v=>{await iy(e,v)},onMappingUpload:async v=>{await sy(e,v)},onMappingAddRow:()=>ty(e)}):k}

        ${e.tab==="debug"?Sx({loading:e.debugLoading,status:e.debugStatus,health:e.debugHealth,models:e.debugModels,heartbeat:e.debugHeartbeat,eventLog:e.eventLog,callMethod:e.debugCallMethod,callParams:e.debugCallParams,callResult:e.debugCallResult,callError:e.debugCallError,onCallMethodChange:v=>e.debugCallMethod=v,onCallParamsChange:v=>e.debugCallParams=v,onRefresh:()=>go(e),onCall:()=>bg(e)}):k}

        ${e.tab==="logs"?Ox({loading:e.logsLoading,error:e.logsError,file:e.logsFile,entries:e.logsEntries,filterText:e.logsFilterText,levelFilters:e.logsLevelFilters,autoFollow:e.logsAutoFollow,truncated:e.logsTruncated,onFilterTextChange:v=>e.logsFilterText=v,onLevelToggle:(v,E)=>{e.logsLevelFilters={...e.logsLevelFilters,[v]:E}},onToggleAutoFollow:v=>e.logsAutoFollow=v,onRefresh:()=>Aa(e,{reset:!0}),onExport:(v,E)=>e.exportLogs(v,E),onScroll:v=>e.handleLogsScroll(v)}):k}
      </main>
      ${Tx(e)}
      ${Cx(e)}
    </div>
  `}var W$=Object.defineProperty,V$=Object.getOwnPropertyDescriptor,w=(e,t,n,i)=>{for(var s=i>1?void 0:i?V$(t,n):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(s=(i?r(t,n,s):r(s))||s);return i&&s&&W$(t,n,s),s};const Dr=Va({});function G$(){if(!window.location.search)return!1;const t=new URLSearchParams(window.location.search).get("onboarding");if(!t)return!1;const n=t.trim().toLowerCase();return n==="1"||n==="true"||n==="yes"||n==="on"}let b=class extends dn{constructor(){super(),this.i18nController=new Kp(this),this.settings=fy(),this.password="",this.tab="chat",this.onboarding=G$(),this.connected=!1,this.theme=this.settings.theme??"system",this.themeResolved="dark",this.hello=null,this.lastError=null,this.eventLog=[],this.eventLogBuffer=[],this.toolStreamSyncTimer=null,this.sidebarCloseTimer=null,this.assistantName=Dr.name,this.assistantAvatar=Dr.avatar,this.assistantAgentId=Dr.agentId??null,this.sessionKey=this.settings.sessionKey,this.chatLoading=!1,this.chatSending=!1,this.chatMessage="",this.chatMessages=[],this.chatToolMessages=[],this.chatStream=null,this.chatStreamStartedAt=null,this.chatRunId=null,this.compactionStatus=null,this.chatAvatarUrl=null,this.chatThinkingLevel=null,this.chatQueue=[],this.chatAttachments=[],this.chatUploadedFile=null,this.chatComposeDragOver=!1,this.chatManualRefreshInFlight=!1,this.sidebarOpen=!1,this.sidebarContent=null,this.sidebarError=null,this.splitRatio=this.settings.splitRatio,this.nodesLoading=!1,this.nodes=[],this.devicesLoading=!1,this.devicesError=null,this.devicesList=null,this.execApprovalsLoading=!1,this.execApprovalsSaving=!1,this.execApprovalsDirty=!1,this.execApprovalsSnapshot=null,this.execApprovalsForm=null,this.execApprovalsSelectedAgent=null,this.execApprovalsTarget="gateway",this.execApprovalsTargetNodeId=null,this.execApprovalQueue=[],this.execApprovalBusy=!1,this.execApprovalError=null,this.pendingGatewayUrl=null,this.configLoading=!1,this.configRaw=`{
}
`,this.configRawOriginal="",this.configValid=null,this.configIssues=[],this.configSaving=!1,this.configApplying=!1,this.updateRunning=!1,this.applySessionKey=this.settings.lastActiveSessionKey,this.configSnapshot=null,this.configSchema=null,this.configSchemaVersion=null,this.configSchemaLoading=!1,this.configUiHints={},this.configForm=null,this.configFormOriginal=null,this.configFormDirty=!1,this.configFormMode="form",this.configSearchQuery="",this.configActiveSection=null,this.configActiveSubsection=null,this.channelsLoading=!1,this.channelsSnapshot=null,this.channelsError=null,this.channelsLastSuccess=null,this.bkContent="",this.bkLoading=!1,this.bkError=null,this.bkSaving=!1,this.bkLastSuccess=null,this.bkDependentFiles=null,this.whatsappLoginMessage=null,this.whatsappLoginQrDataUrl=null,this.whatsappLoginConnected=null,this.whatsappBusy=!1,this.nostrProfileFormState=null,this.nostrProfileAccountId=null,this.presenceLoading=!1,this.presenceEntries=[],this.presenceError=null,this.presenceStatus=null,this.oosLoading=!1,this.oosError=null,this.oosStats=null,this.oosList=[],this.oosByFile=[],this.oosByTime=[],this.oosShowAddForm=!1,this.oosDb=null,this.shortageLoading=!1,this.shortageError=null,this.shortageStats=null,this.shortageList=[],this.shortageByFile=[],this.shortageByTime=[],this.shortageShowAddForm=!1,this.shortageDb=null,this.overviewOosStats=null,this.overviewOosError=null,this.overviewShortageStats=null,this.overviewShortageError=null,this.dashboardLoading=!1,this.dashboardError=null,this.quotationStats=null,this.dashboardOosByTime=[],this.dashboardShortageByTime=[],this.agentsLoading=!1,this.agentsList=null,this.agentsError=null,this.agentsSelectedId=null,this.agentsPanel="overview",this.agentInfo=null,this.agentInfoLoading=!1,this.agentInfoError=null,this.agentFilesLoading=!1,this.agentFilesError=null,this.agentFilesList=null,this.agentFileContents={},this.agentFileDrafts={},this.agentFileActive=null,this.agentFileSaving=!1,this.agentIdentityLoading=!1,this.agentIdentityError=null,this.agentIdentityById={},this.agentSkillsLoading=!1,this.agentSkillsError=null,this.agentSkillsReport=null,this.agentSkillsAgentId=null,this.sessionsLoading=!1,this.sessionsResult=null,this.sessionsError=null,this.sessionsFilterActive="",this.sessionsFilterLimit="120",this.sessionsIncludeGlobal=!0,this.sessionsIncludeUnknown=!1,this.usageLoading=!1,this.usageResult=null,this.usageCostSummary=null,this.usageError=null,this.usageRequestSeq=0,this.usageTimeSeriesRequestSeq=0,this.usageSessionLogsRequestSeq=0,this.usageStartDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageEndDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageSelectedSessions=[],this.usageSelectedDays=[],this.usageSelectedHours=[],this.usageChartMode="tokens",this.usageDailyChartMode="by-type",this.usageTimeSeriesMode="per-turn",this.usageTimeSeriesBreakdownMode="by-type",this.usageTimeSeries=null,this.usageTimeSeriesLoading=!1,this.usageTimeSeriesCursorStart=null,this.usageTimeSeriesCursorEnd=null,this.usageSessionLogs=null,this.usageSessionLogsLoading=!1,this.usageSessionLogsExpanded=!1,this.usageQuery="",this.usageQueryDraft="",this.usageSessionSort="recent",this.usageSessionSortDir="desc",this.usageRecentSessions=[],this.usageTimeZone="local",this.usageContextExpanded=!1,this.usageHeaderPinned=!1,this.usageSessionsTab="all",this.usageVisibleColumns=["channel","agent","provider","model","messages","tools","errors","duration"],this.usageLogFilterRoles=[],this.usageLogFilterTools=[],this.usageLogFilterHasTools=!1,this.usageLogFilterQuery="",this.usageQueryDebounceTimer=null,this.workFilePaths=[],this.workOriginalFileNamesByPath={},this.workRunning=!1,this.workProgressStage=0,this._workProgressInterval=null,this.workRunStatus="idle",this.workRunId=null,this.workPendingChoices=[],this.workSelections={},this.workResult=null,this.workError=null,this.workCustomerLevel="B_QUOTE",this.workDoRegisterOos=!1,this.workPendingQuotationDraft=null,this.workQuotationDraftSaveStatus=null,this.workTextInput="",this.workTextGenerating=!1,this.workTextError=null,this.workPriceLevelOptions=[],this.cronLoading=!1,this.cronJobs=[],this.cronStatus=null,this.cronError=null,this.cronForm={...uv},this.cronRunsJobId=null,this.cronRuns=[],this.cronBusy=!1,this.fulfillDraftsLoading=!1,this.fulfillDraftsError=null,this.fulfillDrafts=[],this.fulfillDetail=null,this.fulfillDetailId=null,this.fulfillConfirmBusy=!1,this.fulfillConfirmResult=null,this.fulfillFilterQuery="",this.fulfillSortBy="created_at",this.fulfillSortDir="desc",this.fulfillPage=1,this.fulfillPageSize=10,this.procurementLoading=!1,this.procurementError=null,this.procurementSuggestions=[],this.procurementSelectedKeys=[],this.procurementApprovedKeys=[],this.procurementApproveBusy=!1,this.procurementApproveResult=null,this.procurementFilterQuery="",this.procurementSortBy="uploaded_at",this.procurementSortDir="desc",this.procurementPage=1,this.procurementPageSize=10,this.replenishmentDrafts=[],this.replenishmentDetail=null,this.replenishmentDetailId=null,this.replenishmentLoading=!1,this.replenishmentError=null,this.replenishmentConfirmBusy=!1,this.replenishmentConfirmResult=null,this.replenishmentInputLines=[{product_or_code:"",quantity:0}],this.replenishmentCreateBusy=!1,this.skillsLoading=!1,this.skillsReport=null,this.skillsError=null,this.skillsFilter="",this.skillEdits={},this.skillsBusyKey=null,this.skillMessages={},this.reportsLoading=!1,this.reportsError=null,this.reportsTasks=[],this.reportsRecords=[],this.reportsAdminToken="",this.reportsEditingTaskId=null,this.reportsEditForm={},this.reportDetail=null,this.reportDetailLoading=!1,this.selectedRecordId=null,this.reportsCopyJustDone=!1,this.reportsDetailTab="data",this.debugLoading=!1,this.debugStatus=null,this.debugHealth=null,this.debugModels=[],this.debugHeartbeat=null,this.debugCallMethod="",this.debugCallParams="{}",this.debugCallResult=null,this.debugCallError=null,this.logsLoading=!1,this.logsError=null,this.logsFile=null,this.logsEntries=[],this.logsFilterText="",this.logsLevelFilters={...dv},this.logsAutoFollow=!0,this.logsTruncated=!1,this.logsCursor=null,this.logsLastFetchAt=null,this.logsLimit=500,this.logsMaxBytes=25e4,this.logsAtBottom=!0,this.adminData=Vm(),this.client=null,this.chatScrollFrame=null,this.chatScrollTimeout=null,this.chatHasAutoScrolled=!1,this.chatUserNearBottom=!0,this.chatNewMessagesBelow=!1,this.nodesPollInterval=null,this.logsPollInterval=null,this.debugPollInterval=null,this.logsScrollFrame=null,this.toolStreamById=new Map,this.toolStreamOrder=[],this.toolRenderData=null,this.toolRenderSeq=null,this.toolRenderItems=[],this.candidatePreviews=[],this.ocrResultCards=[],this.refreshSessionsAfterChat=new Set,this.basePath="",this.popStateHandler=()=>Ay(this),this.themeMedia=null,this.themeMediaHandler=null,this.topbarObserver=null,$a(this.settings.locale)&&gn.setLocale(this.settings.locale)}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),Kv(this)}firstUpdated(){Wv(this)}disconnectedCallback(){Vv(this),super.disconnectedCallback()}updated(e){e.has("workRunning")&&(this.workRunning?(this.workProgressStage=this.workRunStatus==="resuming"?1:0,this._workProgressInterval!=null&&(clearInterval(this._workProgressInterval),this._workProgressInterval=null)):(this._workProgressInterval!=null&&(clearInterval(this._workProgressInterval),this._workProgressInterval=null),this.workRunStatus==="done"&&(this.workProgressStage=2))),Gv(this,e)}connect(){Lh(this)}handleChatScroll(e){gg(this,e)}handleLogsScroll(e){mg(this,e)}exportLogs(e,t){yg(e,t)}resetToolStream(){So(this)}resetToolRender(){Ao(this)}resetChatScroll(){Zl(this)}scrollToBottom(e){Zl(this),Vi(this,!0,!!(e!=null&&e.smooth))}async loadAssistantIdentity(){await Mh(this)}applySettings(e){Bt(this,e)}setTab(e){by(this,e)}setTheme(e,t){wy(this,e,t)}async loadOverview(){await kh(this)}async loadCron(){await $h(this)}async loadFulfillDrafts(){await Cy(this)}async loadProcurementSuggestions(){await Ey(this)}async loadProcurementReplenishment(){await Qi(this)}async loadProcurementReplenishmentDetail(e){await Qg(this,e)}async confirmProcurementReplenishment(e){await Xg(this,e)}async deleteProcurementReplenishmentDraft(e){await Jg(this,e)}onReplenishmentLineChange(e,t,n){const i=this.replenishmentInputLines.slice();e<0||e>=i.length||(i[e]={...i[e],[t]:n},this.replenishmentInputLines=i)}onReplenishmentAddLine(){this.replenishmentInputLines=[...this.replenishmentInputLines,{product_or_code:"",quantity:0}]}onReplenishmentRemoveLine(e){const t=this.replenishmentInputLines.filter((n,i)=>i!==e);this.replenishmentInputLines=t.length>0?t:[{product_or_code:"",quantity:0}]}async createProcurementReplenishmentDraft(){if(!this.replenishmentCreateBusy){this.replenishmentCreateBusy=!0,this.replenishmentError=null;try{const e=await Yg(this,this.replenishmentInputLines);e&&(this.replenishmentInputLines=[{product_or_code:"",quantity:0}],await this.loadProcurementReplenishment(),await this.loadProcurementReplenishmentDetail(e.id))}finally{this.replenishmentCreateBusy=!1}}}async handleAbortChat(){await Ch(this)}removeQueuedMessage(e){ov(this,e)}async handleUploadChatFile(e){try{const t=await Jy(this.basePath,e);this.chatUploadedFile=t,this.lastError=null}catch(t){this.lastError=t instanceof Error?t.message:String(t)}}clearChatUploadedFile(){this.chatUploadedFile=null}setChatComposeDragOver(e){this.chatComposeDragOver=e}async handleComposeDrop(e){this.chatComposeDragOver=!1,await this.handleUploadChatFile(e)}async handleSendChat(e,t){await rv(this,e,t)}async handleWhatsAppStart(e){await ng(this,e)}async handleWhatsAppWait(){await ig(this)}async handleWhatsAppLogout(){await sg(this)}async handleChannelConfigSave(){await og(this)}async handleChannelConfigReload(){await rg(this)}handleNostrProfileEdit(e,t){cg(this,e,t)}handleNostrProfileCancel(){dg(this)}handleNostrProfileFieldChange(e,t){ug(this,e,t)}async handleNostrProfileSave(){await fg(this)}async handleNostrProfileImport(){await pg(this)}handleNostrProfileToggleAdvanced(){hg(this)}async handleExecApprovalDecision(e){const t=this.execApprovalQueue[0];if(!(!t||!this.client||this.execApprovalBusy)){this.execApprovalBusy=!0,this.execApprovalError=null;try{await this.client.request("exec.approval.resolve",{id:t.id,decision:e}),this.execApprovalQueue=this.execApprovalQueue.filter(n=>n.id!==t.id)}catch(n){this.execApprovalError=`Exec approval failed: ${String(n)}`}finally{this.execApprovalBusy=!1}}}handleGatewayUrlConfirm(){const e=this.pendingGatewayUrl;e&&(this.pendingGatewayUrl=null,Bt(this,{...this.settings,gatewayUrl:e}),this.connect())}handleGatewayUrlCancel(){this.pendingGatewayUrl=null}handleOpenSidebar(e){this.sidebarCloseTimer!=null&&(window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=null),this.sidebarContent=e,this.sidebarError=null,this.sidebarOpen=!0}handleCloseSidebar(){this.sidebarOpen=!1,this.sidebarCloseTimer!=null&&window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=window.setTimeout(()=>{this.sidebarOpen||(this.sidebarContent=null,this.sidebarError=null,this.sidebarCloseTimer=null)},200)}handleSplitRatioChange(e){const t=Math.max(.4,Math.min(.7,e));this.splitRatio=t,this.applySettings({...this.settings,splitRatio:t})}render(){return K$(this)}};w([x()],b.prototype,"settings",2);w([x()],b.prototype,"password",2);w([x()],b.prototype,"tab",2);w([x()],b.prototype,"onboarding",2);w([x()],b.prototype,"connected",2);w([x()],b.prototype,"theme",2);w([x()],b.prototype,"themeResolved",2);w([x()],b.prototype,"hello",2);w([x()],b.prototype,"lastError",2);w([x()],b.prototype,"eventLog",2);w([x()],b.prototype,"assistantName",2);w([x()],b.prototype,"assistantAvatar",2);w([x()],b.prototype,"assistantAgentId",2);w([x()],b.prototype,"sessionKey",2);w([x()],b.prototype,"chatLoading",2);w([x()],b.prototype,"chatSending",2);w([x()],b.prototype,"chatMessage",2);w([x()],b.prototype,"chatMessages",2);w([x()],b.prototype,"chatToolMessages",2);w([x()],b.prototype,"chatStream",2);w([x()],b.prototype,"chatStreamStartedAt",2);w([x()],b.prototype,"chatRunId",2);w([x()],b.prototype,"compactionStatus",2);w([x()],b.prototype,"chatAvatarUrl",2);w([x()],b.prototype,"chatThinkingLevel",2);w([x()],b.prototype,"chatQueue",2);w([x()],b.prototype,"chatAttachments",2);w([x()],b.prototype,"chatUploadedFile",2);w([x()],b.prototype,"chatComposeDragOver",2);w([x()],b.prototype,"chatManualRefreshInFlight",2);w([x()],b.prototype,"sidebarOpen",2);w([x()],b.prototype,"sidebarContent",2);w([x()],b.prototype,"sidebarError",2);w([x()],b.prototype,"splitRatio",2);w([x()],b.prototype,"nodesLoading",2);w([x()],b.prototype,"nodes",2);w([x()],b.prototype,"devicesLoading",2);w([x()],b.prototype,"devicesError",2);w([x()],b.prototype,"devicesList",2);w([x()],b.prototype,"execApprovalsLoading",2);w([x()],b.prototype,"execApprovalsSaving",2);w([x()],b.prototype,"execApprovalsDirty",2);w([x()],b.prototype,"execApprovalsSnapshot",2);w([x()],b.prototype,"execApprovalsForm",2);w([x()],b.prototype,"execApprovalsSelectedAgent",2);w([x()],b.prototype,"execApprovalsTarget",2);w([x()],b.prototype,"execApprovalsTargetNodeId",2);w([x()],b.prototype,"execApprovalQueue",2);w([x()],b.prototype,"execApprovalBusy",2);w([x()],b.prototype,"execApprovalError",2);w([x()],b.prototype,"pendingGatewayUrl",2);w([x()],b.prototype,"configLoading",2);w([x()],b.prototype,"configRaw",2);w([x()],b.prototype,"configRawOriginal",2);w([x()],b.prototype,"configValid",2);w([x()],b.prototype,"configIssues",2);w([x()],b.prototype,"configSaving",2);w([x()],b.prototype,"configApplying",2);w([x()],b.prototype,"updateRunning",2);w([x()],b.prototype,"applySessionKey",2);w([x()],b.prototype,"configSnapshot",2);w([x()],b.prototype,"configSchema",2);w([x()],b.prototype,"configSchemaVersion",2);w([x()],b.prototype,"configSchemaLoading",2);w([x()],b.prototype,"configUiHints",2);w([x()],b.prototype,"configForm",2);w([x()],b.prototype,"configFormOriginal",2);w([x()],b.prototype,"configFormDirty",2);w([x()],b.prototype,"configFormMode",2);w([x()],b.prototype,"configSearchQuery",2);w([x()],b.prototype,"configActiveSection",2);w([x()],b.prototype,"configActiveSubsection",2);w([x()],b.prototype,"channelsLoading",2);w([x()],b.prototype,"channelsSnapshot",2);w([x()],b.prototype,"channelsError",2);w([x()],b.prototype,"channelsLastSuccess",2);w([x()],b.prototype,"bkContent",2);w([x()],b.prototype,"bkLoading",2);w([x()],b.prototype,"bkError",2);w([x()],b.prototype,"bkSaving",2);w([x()],b.prototype,"bkLastSuccess",2);w([x()],b.prototype,"bkDependentFiles",2);w([x()],b.prototype,"whatsappLoginMessage",2);w([x()],b.prototype,"whatsappLoginQrDataUrl",2);w([x()],b.prototype,"whatsappLoginConnected",2);w([x()],b.prototype,"whatsappBusy",2);w([x()],b.prototype,"nostrProfileFormState",2);w([x()],b.prototype,"nostrProfileAccountId",2);w([x()],b.prototype,"presenceLoading",2);w([x()],b.prototype,"presenceEntries",2);w([x()],b.prototype,"presenceError",2);w([x()],b.prototype,"presenceStatus",2);w([x()],b.prototype,"oosLoading",2);w([x()],b.prototype,"oosError",2);w([x()],b.prototype,"oosStats",2);w([x()],b.prototype,"oosList",2);w([x()],b.prototype,"oosByFile",2);w([x()],b.prototype,"oosByTime",2);w([x()],b.prototype,"oosShowAddForm",2);w([x()],b.prototype,"oosDb",2);w([x()],b.prototype,"shortageLoading",2);w([x()],b.prototype,"shortageError",2);w([x()],b.prototype,"shortageStats",2);w([x()],b.prototype,"shortageList",2);w([x()],b.prototype,"shortageByFile",2);w([x()],b.prototype,"shortageByTime",2);w([x()],b.prototype,"shortageShowAddForm",2);w([x()],b.prototype,"shortageDb",2);w([x()],b.prototype,"overviewOosStats",2);w([x()],b.prototype,"overviewOosError",2);w([x()],b.prototype,"overviewShortageStats",2);w([x()],b.prototype,"overviewShortageError",2);w([x()],b.prototype,"dashboardLoading",2);w([x()],b.prototype,"dashboardError",2);w([x()],b.prototype,"quotationStats",2);w([x()],b.prototype,"dashboardOosByTime",2);w([x()],b.prototype,"dashboardShortageByTime",2);w([x()],b.prototype,"agentsLoading",2);w([x()],b.prototype,"agentsList",2);w([x()],b.prototype,"agentsError",2);w([x()],b.prototype,"agentsSelectedId",2);w([x()],b.prototype,"agentsPanel",2);w([x()],b.prototype,"agentInfo",2);w([x()],b.prototype,"agentInfoLoading",2);w([x()],b.prototype,"agentInfoError",2);w([x()],b.prototype,"agentFilesLoading",2);w([x()],b.prototype,"agentFilesError",2);w([x()],b.prototype,"agentFilesList",2);w([x()],b.prototype,"agentFileContents",2);w([x()],b.prototype,"agentFileDrafts",2);w([x()],b.prototype,"agentFileActive",2);w([x()],b.prototype,"agentFileSaving",2);w([x()],b.prototype,"agentIdentityLoading",2);w([x()],b.prototype,"agentIdentityError",2);w([x()],b.prototype,"agentIdentityById",2);w([x()],b.prototype,"agentSkillsLoading",2);w([x()],b.prototype,"agentSkillsError",2);w([x()],b.prototype,"agentSkillsReport",2);w([x()],b.prototype,"agentSkillsAgentId",2);w([x()],b.prototype,"sessionsLoading",2);w([x()],b.prototype,"sessionsResult",2);w([x()],b.prototype,"sessionsError",2);w([x()],b.prototype,"sessionsFilterActive",2);w([x()],b.prototype,"sessionsFilterLimit",2);w([x()],b.prototype,"sessionsIncludeGlobal",2);w([x()],b.prototype,"sessionsIncludeUnknown",2);w([x()],b.prototype,"usageLoading",2);w([x()],b.prototype,"usageResult",2);w([x()],b.prototype,"usageCostSummary",2);w([x()],b.prototype,"usageError",2);w([x()],b.prototype,"usageStartDate",2);w([x()],b.prototype,"usageEndDate",2);w([x()],b.prototype,"usageSelectedSessions",2);w([x()],b.prototype,"usageSelectedDays",2);w([x()],b.prototype,"usageSelectedHours",2);w([x()],b.prototype,"usageChartMode",2);w([x()],b.prototype,"usageDailyChartMode",2);w([x()],b.prototype,"usageTimeSeriesMode",2);w([x()],b.prototype,"usageTimeSeriesBreakdownMode",2);w([x()],b.prototype,"usageTimeSeries",2);w([x()],b.prototype,"usageTimeSeriesLoading",2);w([x()],b.prototype,"usageTimeSeriesCursorStart",2);w([x()],b.prototype,"usageTimeSeriesCursorEnd",2);w([x()],b.prototype,"usageSessionLogs",2);w([x()],b.prototype,"usageSessionLogsLoading",2);w([x()],b.prototype,"usageSessionLogsExpanded",2);w([x()],b.prototype,"usageQuery",2);w([x()],b.prototype,"usageQueryDraft",2);w([x()],b.prototype,"usageSessionSort",2);w([x()],b.prototype,"usageSessionSortDir",2);w([x()],b.prototype,"usageRecentSessions",2);w([x()],b.prototype,"usageTimeZone",2);w([x()],b.prototype,"usageContextExpanded",2);w([x()],b.prototype,"usageHeaderPinned",2);w([x()],b.prototype,"usageSessionsTab",2);w([x()],b.prototype,"usageVisibleColumns",2);w([x()],b.prototype,"usageLogFilterRoles",2);w([x()],b.prototype,"usageLogFilterTools",2);w([x()],b.prototype,"usageLogFilterHasTools",2);w([x()],b.prototype,"usageLogFilterQuery",2);w([x()],b.prototype,"workFilePaths",2);w([x()],b.prototype,"workOriginalFileNamesByPath",2);w([x()],b.prototype,"workRunning",2);w([x()],b.prototype,"workProgressStage",2);w([x()],b.prototype,"workRunStatus",2);w([x()],b.prototype,"workRunId",2);w([x()],b.prototype,"workPendingChoices",2);w([x()],b.prototype,"workSelections",2);w([x()],b.prototype,"workResult",2);w([x()],b.prototype,"workError",2);w([x()],b.prototype,"workCustomerLevel",2);w([x()],b.prototype,"workDoRegisterOos",2);w([x()],b.prototype,"workPendingQuotationDraft",2);w([x()],b.prototype,"workQuotationDraftSaveStatus",2);w([x()],b.prototype,"workTextInput",2);w([x()],b.prototype,"workTextGenerating",2);w([x()],b.prototype,"workTextError",2);w([x()],b.prototype,"workPriceLevelOptions",2);w([x()],b.prototype,"cronLoading",2);w([x()],b.prototype,"cronJobs",2);w([x()],b.prototype,"cronStatus",2);w([x()],b.prototype,"cronError",2);w([x()],b.prototype,"cronForm",2);w([x()],b.prototype,"cronRunsJobId",2);w([x()],b.prototype,"cronRuns",2);w([x()],b.prototype,"cronBusy",2);w([x()],b.prototype,"fulfillDraftsLoading",2);w([x()],b.prototype,"fulfillDraftsError",2);w([x()],b.prototype,"fulfillDrafts",2);w([x()],b.prototype,"fulfillDetail",2);w([x()],b.prototype,"fulfillDetailId",2);w([x()],b.prototype,"fulfillConfirmBusy",2);w([x()],b.prototype,"fulfillConfirmResult",2);w([x()],b.prototype,"fulfillFilterQuery",2);w([x()],b.prototype,"fulfillSortBy",2);w([x()],b.prototype,"fulfillSortDir",2);w([x()],b.prototype,"fulfillPage",2);w([x()],b.prototype,"fulfillPageSize",2);w([x()],b.prototype,"procurementLoading",2);w([x()],b.prototype,"procurementError",2);w([x()],b.prototype,"procurementSuggestions",2);w([x()],b.prototype,"procurementSelectedKeys",2);w([x()],b.prototype,"procurementApprovedKeys",2);w([x()],b.prototype,"procurementApproveBusy",2);w([x()],b.prototype,"procurementApproveResult",2);w([x()],b.prototype,"procurementFilterQuery",2);w([x()],b.prototype,"procurementSortBy",2);w([x()],b.prototype,"procurementSortDir",2);w([x()],b.prototype,"procurementPage",2);w([x()],b.prototype,"procurementPageSize",2);w([x()],b.prototype,"replenishmentDrafts",2);w([x()],b.prototype,"replenishmentDetail",2);w([x()],b.prototype,"replenishmentDetailId",2);w([x()],b.prototype,"replenishmentLoading",2);w([x()],b.prototype,"replenishmentError",2);w([x()],b.prototype,"replenishmentConfirmBusy",2);w([x()],b.prototype,"replenishmentConfirmResult",2);w([x()],b.prototype,"replenishmentInputLines",2);w([x()],b.prototype,"replenishmentCreateBusy",2);w([x()],b.prototype,"skillsLoading",2);w([x()],b.prototype,"skillsReport",2);w([x()],b.prototype,"skillsError",2);w([x()],b.prototype,"skillsFilter",2);w([x()],b.prototype,"skillEdits",2);w([x()],b.prototype,"skillsBusyKey",2);w([x()],b.prototype,"skillMessages",2);w([x()],b.prototype,"reportsLoading",2);w([x()],b.prototype,"reportsError",2);w([x()],b.prototype,"reportsTasks",2);w([x()],b.prototype,"reportsRecords",2);w([x()],b.prototype,"reportsAdminToken",2);w([x()],b.prototype,"reportsEditingTaskId",2);w([x()],b.prototype,"reportsEditForm",2);w([x()],b.prototype,"reportDetail",2);w([x()],b.prototype,"reportDetailLoading",2);w([x()],b.prototype,"selectedRecordId",2);w([x()],b.prototype,"reportsCopyJustDone",2);w([x()],b.prototype,"reportsDetailTab",2);w([x()],b.prototype,"debugLoading",2);w([x()],b.prototype,"debugStatus",2);w([x()],b.prototype,"debugHealth",2);w([x()],b.prototype,"debugModels",2);w([x()],b.prototype,"debugHeartbeat",2);w([x()],b.prototype,"debugCallMethod",2);w([x()],b.prototype,"debugCallParams",2);w([x()],b.prototype,"debugCallResult",2);w([x()],b.prototype,"debugCallError",2);w([x()],b.prototype,"logsLoading",2);w([x()],b.prototype,"logsError",2);w([x()],b.prototype,"logsFile",2);w([x()],b.prototype,"logsEntries",2);w([x()],b.prototype,"logsFilterText",2);w([x()],b.prototype,"logsLevelFilters",2);w([x()],b.prototype,"logsAutoFollow",2);w([x()],b.prototype,"logsTruncated",2);w([x()],b.prototype,"logsCursor",2);w([x()],b.prototype,"logsLastFetchAt",2);w([x()],b.prototype,"logsLimit",2);w([x()],b.prototype,"logsMaxBytes",2);w([x()],b.prototype,"logsAtBottom",2);w([x()],b.prototype,"adminData",2);w([x()],b.prototype,"chatNewMessagesBelow",2);w([x()],b.prototype,"toolRenderData",2);w([x()],b.prototype,"toolRenderSeq",2);w([x()],b.prototype,"toolRenderItems",2);w([x()],b.prototype,"candidatePreviews",2);w([x()],b.prototype,"ocrResultCards",2);b=w([ka("openclaw-app")],b);
//# sourceMappingURL=index-NmMyS_Ho.js.map
