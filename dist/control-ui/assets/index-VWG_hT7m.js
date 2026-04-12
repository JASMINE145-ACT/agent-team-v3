var Ip=Object.defineProperty;var Op=(e,t,n)=>t in e?Ip(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var H=(e,t,n)=>Op(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bs=globalThis,Ta=Bs.ShadowRoot&&(Bs.ShadyCSS===void 0||Bs.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ca=Symbol(),Gl=new WeakMap;let Uu=class{constructor(t,n,i){if(this._$cssResult$=!0,i!==Ca)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(Ta&&t===void 0){const i=n!==void 0&&n.length===1;i&&(t=Gl.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Gl.set(n,t))}return t}toString(){return this.cssText}};const Fp=e=>new Uu(typeof e=="string"?e:e+"",void 0,Ca),qu=(e,...t)=>{const n=e.length===1?e[0]:t.reduce((i,s,o)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[o+1],e[0]);return new Uu(n,e,Ca)},Np=(e,t)=>{if(Ta)e.adoptedStyleSheets=t.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of t){const i=document.createElement("style"),s=Bs.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=n.cssText,e.appendChild(i)}},Ql=Ta?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const i of t.cssRules)n+=i.cssText;return Fp(n)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Bp,defineProperty:zp,getOwnPropertyDescriptor:Hp,getOwnPropertyNames:Up,getOwnPropertySymbols:qp,getPrototypeOf:jp}=Object,Ft=globalThis,Yl=Ft.trustedTypes,Kp=Yl?Yl.emptyScript:"",nr=Ft.reactiveElementPolyfillSupport,Si=(e,t)=>e,Xs={toAttribute(e,t){switch(t){case Boolean:e=e?Kp:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},Ea=(e,t)=>!Bp(e,t),Xl={attribute:!0,type:String,converter:Xs,reflect:!1,useDefault:!1,hasChanged:Ea};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Ft.litPropertyMetadata??(Ft.litPropertyMetadata=new WeakMap);let Nn=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=Xl){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(t,n),!n.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,n);s!==void 0&&zp(this.prototype,t,s)}}static getPropertyDescriptor(t,n,i){const{get:s,set:o}=Hp(this.prototype,t)??{get(){return this[n]},set(r){this[n]=r}};return{get:s,set(r){const a=s==null?void 0:s.call(this);o==null||o.call(this,r),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Xl}static _$Ei(){if(this.hasOwnProperty(Si("elementProperties")))return;const t=jp(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Si("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Si("properties"))){const n=this.properties,i=[...Up(n),...qp(n)];for(const s of i)this.createProperty(s,n[s])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[i,s]of n)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[n,i]of this.elementProperties){const s=this._$Eu(n,i);s!==void 0&&this._$Eh.set(s,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)n.unshift(Ql(s))}else t!==void 0&&n.push(Ql(t));return n}static _$Eu(t,n){const i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(n=>n(this))}addController(t){var n;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((n=t.hostConnected)==null||n.call(t))}removeController(t){var n;(n=this._$EO)==null||n.delete(t)}_$E_(){const t=new Map,n=this.constructor.elementProperties;for(const i of n.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Np(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(n=>{var i;return(i=n.hostConnected)==null?void 0:i.call(n)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(n=>{var i;return(i=n.hostDisconnected)==null?void 0:i.call(n)})}attributeChangedCallback(t,n,i){this._$AK(t,i)}_$ET(t,n){var o;const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const r=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:Xs).toAttribute(n,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,n){var o,r;const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const a=i.getPropertyOptions(s),l=typeof a.converter=="function"?{fromAttribute:a.converter}:((o=a.converter)==null?void 0:o.fromAttribute)!==void 0?a.converter:Xs;this._$Em=s;const c=l.fromAttribute(n,a.type);this[s]=c??((r=this._$Ej)==null?void 0:r.get(s))??c,this._$Em=null}}requestUpdate(t,n,i,s=!1,o){var r;if(t!==void 0){const a=this.constructor;if(s===!1&&(o=this[t]),i??(i=a.getPropertyOptions(t)),!((i.hasChanged??Ea)(o,n)||i.useDefault&&i.reflect&&o===((r=this._$Ej)==null?void 0:r.get(t))&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,n,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,r??n??this[t]),o!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(n=void 0),this._$AL.set(t,n)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,r]of this._$Ep)this[o]=r;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,r]of s){const{wrapped:a}=r,l=this[o];a!==!0||this._$AL.has(o)||l===void 0||this.C(o,void 0,r,l)}}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),(i=this._$EO)==null||i.forEach(s=>{var o;return(o=s.hostUpdate)==null?void 0:o.call(s)}),this.update(n)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(n)}willUpdate(t){}_$AE(t){var n;(n=this._$EO)==null||n.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(n=>this._$ET(n,this[n]))),this._$EM()}updated(t){}firstUpdated(t){}};Nn.elementStyles=[],Nn.shadowRootOptions={mode:"open"},Nn[Si("elementProperties")]=new Map,Nn[Si("finalized")]=new Map,nr==null||nr({ReactiveElement:Nn}),(Ft.reactiveElementVersions??(Ft.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ai=globalThis,Jl=e=>e,Js=Ai.trustedTypes,Zl=Js?Js.createPolicy("lit-html",{createHTML:e=>e}):void 0,ju="$lit$",Pt=`lit$${Math.random().toFixed(9).slice(2)}$`,Ku="?"+Pt,Wp=`<${Ku}>`,yn=document,zi=()=>yn.createComment(""),Hi=e=>e===null||typeof e!="object"&&typeof e!="function",Ra=Array.isArray,Vp=e=>Ra(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",ir=`[ 	
\f\r]`,oi=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ec=/-->/g,tc=/>/g,Xt=RegExp(`>|${ir}(?:([^\\s"'>=/]+)(${ir}*=${ir}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),nc=/'/g,ic=/"/g,Wu=/^(?:script|style|textarea|title)$/i,Gp=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),f=Gp(1),Ht=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),sc=new WeakMap,ln=yn.createTreeWalker(yn,129);function Vu(e,t){if(!Ra(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Zl!==void 0?Zl.createHTML(t):t}const Qp=(e,t)=>{const n=e.length-1,i=[];let s,o=t===2?"<svg>":t===3?"<math>":"",r=oi;for(let a=0;a<n;a++){const l=e[a];let c,d,u=-1,h=0;for(;h<l.length&&(r.lastIndex=h,d=r.exec(l),d!==null);)h=r.lastIndex,r===oi?d[1]==="!--"?r=ec:d[1]!==void 0?r=tc:d[2]!==void 0?(Wu.test(d[2])&&(s=RegExp("</"+d[2],"g")),r=Xt):d[3]!==void 0&&(r=Xt):r===Xt?d[0]===">"?(r=s??oi,u=-1):d[1]===void 0?u=-2:(u=r.lastIndex-d[2].length,c=d[1],r=d[3]===void 0?Xt:d[3]==='"'?ic:nc):r===ic||r===nc?r=Xt:r===ec||r===tc?r=oi:(r=Xt,s=void 0);const g=r===Xt&&e[a+1].startsWith("/>")?" ":"";o+=r===oi?l+Wp:u>=0?(i.push(c),l.slice(0,u)+ju+l.slice(u)+Pt+g):l+Pt+(u===-2?a:g)}return[Vu(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class Ui{constructor({strings:t,_$litType$:n},i){let s;this.parts=[];let o=0,r=0;const a=t.length-1,l=this.parts,[c,d]=Qp(t,n);if(this.el=Ui.createElement(c,i),ln.currentNode=this.el.content,n===2||n===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=ln.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(const u of s.getAttributeNames())if(u.endsWith(ju)){const h=d[r++],g=s.getAttribute(u).split(Pt),v=/([.?@])?(.*)/.exec(h);l.push({type:1,index:o,name:v[2],strings:g,ctor:v[1]==="."?Xp:v[1]==="?"?Jp:v[1]==="@"?Zp:_o}),s.removeAttribute(u)}else u.startsWith(Pt)&&(l.push({type:6,index:o}),s.removeAttribute(u));if(Wu.test(s.tagName)){const u=s.textContent.split(Pt),h=u.length-1;if(h>0){s.textContent=Js?Js.emptyScript:"";for(let g=0;g<h;g++)s.append(u[g],zi()),ln.nextNode(),l.push({type:2,index:++o});s.append(u[h],zi())}}}else if(s.nodeType===8)if(s.data===Ku)l.push({type:2,index:o});else{let u=-1;for(;(u=s.data.indexOf(Pt,u+1))!==-1;)l.push({type:7,index:o}),u+=Pt.length-1}o++}}static createElement(t,n){const i=yn.createElement("template");return i.innerHTML=t,i}}function jn(e,t,n=e,i){var r,a;if(t===Ht)return t;let s=i!==void 0?(r=n._$Co)==null?void 0:r[i]:n._$Cl;const o=Hi(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==o&&((a=s==null?void 0:s._$AO)==null||a.call(s,!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,i)),i!==void 0?(n._$Co??(n._$Co=[]))[i]=s:n._$Cl=s),s!==void 0&&(t=jn(e,s._$AS(e,t.values),s,i)),t}class Yp{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??yn).importNode(n,!0);ln.currentNode=s;let o=ln.nextNode(),r=0,a=0,l=i[0];for(;l!==void 0;){if(r===l.index){let c;l.type===2?c=new wo(o,o.nextSibling,this,t):l.type===1?c=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(c=new eg(o,this,t)),this._$AV.push(c),l=i[++a]}r!==(l==null?void 0:l.index)&&(o=ln.nextNode(),r++)}return ln.currentNode=yn,s}p(t){let n=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,n),n+=i.strings.length-2):i._$AI(t[n])),n++}}let wo=class Gu{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,n,i,s){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=jn(this,t,n),Hi(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==Ht&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Vp(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==$&&Hi(this._$AH)?this._$AA.nextSibling.data=t:this.T(yn.createTextNode(t)),this._$AH=t}$(t){var o;const{values:n,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=Ui.createElement(Vu(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===s)this._$AH.p(n);else{const r=new Yp(s,this),a=r.u(this.options);r.p(n),this.T(a),this._$AH=r}}_$AC(t){let n=sc.get(t.strings);return n===void 0&&sc.set(t.strings,n=new Ui(t)),n}k(t){Ra(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let i,s=0;for(const o of t)s===n.length?n.push(i=new Gu(this.O(zi()),this.O(zi()),this,this.options)):i=n[s],i._$AI(o),s++;s<n.length&&(this._$AR(i&&i._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,n);t!==this._$AB;){const s=Jl(t).nextSibling;Jl(t).remove(),t=s}}setConnected(t){var n;this._$AM===void 0&&(this._$Cv=t,(n=this._$AP)==null||n.call(this,t))}},_o=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,i,s,o){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=$}_$AI(t,n=this,i,s){const o=this.strings;let r=!1;if(o===void 0)t=jn(this,t,n,0),r=!Hi(t)||t!==this._$AH&&t!==Ht,r&&(this._$AH=t);else{const a=t;let l,c;for(t=o[0],l=0;l<o.length-1;l++)c=jn(this,a[i+l],n,l),c===Ht&&(c=this._$AH[l]),r||(r=!Hi(c)||c!==this._$AH[l]),c===$?t=$:t!==$&&(t+=(c??"")+o[l+1]),this._$AH[l]=c}r&&!s&&this.j(t)}j(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Xp=class extends _o{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$?void 0:t}},Jp=class extends _o{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==$)}},Zp=class extends _o{constructor(t,n,i,s,o){super(t,n,i,s,o),this.type=5}_$AI(t,n=this){if((t=jn(this,t,n,0)??$)===Ht)return;const i=this._$AH,s=t===$&&i!==$||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==$&&(i===$||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var n;typeof this._$AH=="function"?this._$AH.call(((n=this.options)==null?void 0:n.host)??this.element,t):this._$AH.handleEvent(t)}},eg=class{constructor(t,n,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){jn(this,t)}};const tg={I:wo},sr=Ai.litHtmlPolyfillSupport;sr==null||sr(Ui,wo),(Ai.litHtmlVersions??(Ai.litHtmlVersions=[])).push("3.3.2");const ng=(e,t,n)=>{const i=(n==null?void 0:n.renderBefore)??t;let s=i._$litPart$;if(s===void 0){const o=(n==null?void 0:n.renderBefore)??null;i._$litPart$=s=new wo(t.insertBefore(zi(),o),o,void 0,n??{})}return s._$AI(e),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const hn=globalThis;let fn=class extends Nn{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var n;const t=super.createRenderRoot();return(n=this.renderOptions).renderBefore??(n.renderBefore=t.firstChild),t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ng(n,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return Ht}};var Hu;fn._$litElement$=!0,fn.finalized=!0,(Hu=hn.litElementHydrateSupport)==null||Hu.call(hn,{LitElement:fn});const or=hn.litElementPolyfillSupport;or==null||or({LitElement:fn});(hn.litElementVersions??(hn.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const La=e=>(t,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ig={attribute:!0,type:String,converter:Xs,reflect:!1,hasChanged:Ea},sg=(e=ig,t,n)=>{const{kind:i,metadata:s}=n;let o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),i==="setter"&&((e=Object.create(e)).wrapped=!0),o.set(n.name,e),i==="accessor"){const{name:r}=n;return{set(a){const l=t.get.call(this);t.set.call(this,a),this.requestUpdate(r,l,e,!0,a)},init(a){return a!==void 0&&this.C(r,void 0,e,a),a}}}if(i==="setter"){const{name:r}=n;return function(a){const l=this[r];t.call(this,a),this.requestUpdate(r,l,e,!0,a)}}throw Error("Unsupported decorator location: "+i)};function Kt(e){return(t,n)=>typeof n=="object"?sg(e,t,n):((i,s,o)=>{const r=s.hasOwnProperty(o);return s.constructor.createProperty(o,i),r?Object.getOwnPropertyDescriptor(s,o):void 0})(e,t,n)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function _(e){return Kt({...e,state:!0,attribute:!1})}const og="modulepreload",rg=function(e,t){return new URL(e,t).href},oc={},ag=function(t,n,i){let s=Promise.resolve();if(n&&n.length>0){let r=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};const a=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),c=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));s=r(n.map(d=>{if(d=rg(d,i),d in oc)return;oc[d]=!0;const u=d.endsWith(".css"),h=u?'[rel="stylesheet"]':"";if(!!i)for(let b=a.length-1;b>=0;b--){const y=a[b];if(y.href===d&&(!u||y.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${h}`))return;const v=document.createElement("link");if(v.rel=u?"stylesheet":og,u||(v.as="script"),v.crossOrigin="",v.href=d,c&&v.setAttribute("nonce",c),document.head.appendChild(v),u)return new Promise((b,y)=>{v.addEventListener("load",b),v.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${d}`)))})}))}function o(r){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=r,window.dispatchEvent(a),!a.defaultPrevented)throw r}return s.then(r=>{for(const a of r||[])a.status==="rejected"&&o(a.reason);return t().catch(o)})},lg={common:{health:"Health",ok:"OK",offline:"Offline",connect:"Connect",refresh:"Refresh",retry:"Retry",cancel:"Cancel",close:"Close",yes:"Yes",no:"No",prev:"Prev",next:"Next",errorTitle:"Request failed",enabled:"Enabled",disabled:"Disabled",na:"n/a",docs:"Docs",resources:"Resources",loading:"Loading…",save:"Save",edit:"Edit"},nav:{chat:"Chat",control:"Control",agent:"Agent",settings:"Settings",expand:"Expand sidebar",collapse:"Collapse sidebar"},tabs:{agents:"Agents",overview:"Overview",channels:"Business Knowledge",instances:"Out of Stock",sessions:"Procurement",work:"Quotation",cron:"Order Fulfill",skills:"Skills",reports:"Reports",nodes:"Nodes",chat:"Chat",config:"Config",debug:"Debug",logs:"Logs","admin-data":"Data"},subtitles:{agents:"Manage agent workspaces, tools, and identities.",overview:"Gateway status, entry points, and a fast health read.",channels:"Edit wanding_business_knowledge.md for selection and matching.",instances:"OOS dashboard: stats and product list without asking the agent.",sessions:"Procurement suggestions from shortage; approve to save and notify buyer.",work:"Batch quotation: upload files, identify, match price and stock, fill and save.",cron:"Pending quotation drafts; confirm to create order and lock stock.",skills:"Manage skill availability and API key injection.",reports:"Weekly sales invoice reports. Click a record to view full content.",nodes:"Paired devices, capabilities, and command exposure.",chat:"Direct gateway chat session for quick interventions.",config:"Edit ~/.openclaw/openclaw.json safely.",debug:"Gateway snapshots, events, and manual RPC calls.",logs:"Live tail of the gateway file logs.","admin-data":"Wanding price library and product mapping (admin password)."},overview:{health:{title:"Health & stats",subtitle:"High-level view of instances, sessions, and cron.",lastErrorLabel:"Last error",noError:"No recent errors."},access:{title:"Gateway Access",subtitle:"Where the dashboard connects and how it authenticates.",wsUrl:"WebSocket URL",token:"Gateway Token",password:"Password (not stored)",sessionKey:"Default Session Key",language:"Language",connectHint:"Click Connect to apply connection changes.",trustedProxy:"Authenticated via trusted proxy."},snapshot:{title:"Snapshot",subtitle:"Latest gateway handshake information.",status:"Status",uptime:"Uptime",tickInterval:"Tick Interval",lastChannelsRefresh:"Last Channels Refresh",channelsHint:"Use Channels to link WhatsApp, Telegram, Discord, Signal, or iMessage."},stats:{instances:"Instances",instancesHint:"Presence beacons in the last 5 minutes.",sessions:"Sessions",sessionsHint:"Recent session keys tracked by the gateway.",cron:"Cron",cronNext:"Next wake {time}"},notes:{title:"Notes",subtitle:"Quick reminders for remote control setups.",tailscaleTitle:"Tailscale serve",tailscaleText:"Prefer serve mode to keep the gateway on loopback with tailnet auth.",sessionTitle:"Session hygiene",sessionText:"Use /new or sessions.patch to reset context.",cronTitle:"Cron reminders",cronText:"Use isolated sessions for recurring runs."},auth:{required:"This gateway requires auth. Add a token or password, then click Connect.",failed:"Auth failed. Re-copy a tokenized URL with {command}, or update the token, then click Connect."},insecure:{hint:"This page is HTTP, so the browser blocks device identity. Use HTTPS (Tailscale Serve) or open {url} on the gateway host.",stayHttp:"If you must stay on HTTP, set {config} (token-only)."},oos:{title:"Out-of-stock overview",subtitle:"Recent out-of-stock stats; see Instances tab for full details.",stats:{totalRecords:"Total records",outOfStockCount:"Out-of-stock items",today:"Added today",reportedGe2:"Reported out-of-stock ≥2 times"},empty:"No stats yet; check back later on the Instances tab."},shortage:{title:"Shortage overview",subtitle:"Shortage stats after Work matching; focus on critical items.",stats:{totalRecords:"Total records",shortageProductCount:"Shortage items",today:"Added today",reportedGe2:"Reported shortage ≥2 times"},empty:"No stats yet; check back later on the Instances tab."},dashboard:{kpi:{oosProducts:"Out-of-stock products",shortageProducts:"Shortage products",pendingQuotations:"Pending quotations",todayNewQuotations:"New quotations today",shortageQuotations:"Shortage quotations",replenishmentDrafts:"Replenishment drafts"},chart:{quotationTrend:"Quotation trend (last 7 days)",stockTrend:"Out-of-stock / shortage trend (last 7 days)",quotationSeries:"Quotations",oosSeries:"Out-of-stock",shortageSeries:"Shortage",loading:"Loading...",empty:"No data"},error:"Dashboard data load failed: {error}"}},chat:{disconnected:"Disconnected from gateway.",refreshTitle:"Refresh chat data",thinkingToggle:"Toggle assistant thinking/working output",focusToggle:"Toggle focus mode (hide sidebar + page header)",onboardingDisabled:"Disabled during onboarding",ui:{compaction:{active:"Compacting context…",done:"Context compacted",divider:"Compaction"},attachments:{previewAlt:"Attachment preview",remove:"Remove attachment"},upload:{label:"Upload Excel or PDF",button:"Upload Excel/PDF",remove:"Remove uploaded file"},queue:{title:"Queued ({count})",imageItem:"Image ({count})",remove:"Remove queued message"},candidatesPreview:{query:"Searching: {keywords}",colCode:"Code",colName:"Product",colPrice:"Unit price",more:"…and {n} more",selecting:"AI is choosing the best match from {n} candidate(s)…"},compose:{placeholder:{withImages:"Add a message or paste more images…",default:"Message (↩ to send, Shift+↩ for line breaks; paste images or upload/drag Excel/PDF)",disconnected:"Connect to the gateway to start chatting…"},newMessages:"New messages",dropHint:"Drop to upload Excel/PDF",label:"Message",stop:"Stop",newSession:"New session",send:"Send",queue:"Queue",exitFocus:"Exit focus mode"}}},work:{runHint:"Please select at least one file before running.",saveConfirm:"Confirm save quotation draft and persist to database?",saveSuccessHint:"Saved. You can confirm it on the Order Fulfill page.",stageExtract:"Extract sheet data",stageMatch:"Match price & inventory",stageFill:"Fill quotation",uploadTitle:"Quotation files (multiple)",removeFile:"Remove",noFiles:"No files uploaded (.xlsx/.xls/.xlsm).",customerLevel:"Customer level",registerOos:"Register out-of-stock items",currentStage:"Current stage",running:"Running",run:"Run",cancel:"Cancel",statusLabel:"Status",awaitingTitle:"Need your choices",awaitingHint:"Select one option for each ambiguous item, then continue.",qty:"Qty",choiceSelect:"Candidate selection",choiceOos:"Mark as out of stock",resuming:"Resuming",resume:"Confirm and continue",savedDraftNo:"Quotation draft saved: {no}",pendingDraftTitle:"Pending quotation draft",pendingDraftHint:"Review and edit before saving to database.",saving:"Saving...",saveDraft:"Confirm and save",resultTitle:"Execution result",download:"Download {name}",trace:"Trace ({count})",lineProduct:"Requested item name",lineSpec:"Requested spec",lineQty:"Qty",lineCode:"Product number",lineQuoteName:"Quoted item name",lineQuoteSpec:"Quoted spec",linePrice:"Unit price",lineAmount:"Total",lineAvailable:"Available",lineShortfall:"Shortfall",lineIsShortage:"Shortage",textInputTitle:"Text input (quotation)",textInputHint:"Enter product list (multi-line or semicolon/comma separated); generated file will run with uploaded files.",textInputPlaceholder:"e.g. Cable 3*2.5 100m; Switch 20 pcs",generateFromText:"Generate from text",textGenerating:"Generating…",priceLevels:{FACTORY_INC_TAX:"Factory price (incl. tax)",FACTORY_EXC_TAX:"Factory price (excl. tax)",PURCHASE_EXC_TAX:"Purchase price (excl. tax)",A_MARGIN:"Tier A (2nd-level agent) · margin",A_QUOTE:"Tier A (2nd-level agent) · quotation price",B_MARGIN:"Tier B (1st-level agent) · margin",B_QUOTE:"Tier B (1st-level agent) · quotation price",C_MARGIN:"Tier C (Juwan key account) · margin",C_QUOTE:"Tier C (Juwan key account) · quotation price",D_MARGIN:"Tier D (Qingshan key account) · margin",D_QUOTE:"Tier D (Qingshan key account) · quotation price",D_LOW:"Tier D (Qingshan key account) · reduced margin",E_MARGIN:"Tier E (Datang key account, freight included) · margin",E_QUOTE:"Tier E (Datang key account, freight included) · quotation price"},fileDisplayName:"Quotation file display name",status:{idle:"Idle",running:"Running",awaitingChoices:"Awaiting choices",resuming:"Resuming",done:"Done",error:"Error"},fallbackDraftName:"Untitled quotation"},fulfill:{title:"Pending quotation drafts",subtitle:"Load persisted drafts and confirm to create formal orders.",loading:"Loading...",refreshList:"Refresh list",filterPlaceholder:"Search by draft no/name/source",sortBy:"Sort by",sortDir:"Order",sortCreatedAt:"Created time",sortDraftNo:"Draft no",sortName:"Name",sortDesc:"Newest first",sortAsc:"Oldest first",pageSize:"Page size",total:"Total: {total}",page:"Page {current}/{total}",listTitle:"List",listSubtitle:"View detail first, then confirm order.",colDraftNo:"Draft No",colName:"Name",colSource:"Source",colCreatedAt:"Created At",colActions:"Actions",viewDetail:"View",confirmAction:"Confirm order",confirming:"Confirming...",detailTitle:"Draft detail · {draftNo}",closeDetail:"Close detail",lineProduct:"Product",lineSpec:"Spec",lineQty:"Qty",lineCode:"Code",lineQuoteName:"Quote name",lineQuoteSpec:"Quoted spec",linePrice:"Unit price",lineAmount:"Amount",lineAvailable:"Available",lineShortfall:"Shortfall",lineIsShortage:"Shortage",noDrafts:"No pending quotation drafts.",confirmTitle:"Order confirmed",confirmPrompt:"Confirm order? {count} line(s), total amount {amount}.",confirmPromptSimple:"Confirm to convert this quotation into a formal order?",orderId:"Order ID"},procurement:{title:"Procurement suggestions",subtitle:"Generated from shortage records; approve to persist and notify buyers.",loading:"Loading...",refreshList:"Refresh list",batchApprove:"Batch approve",approving:"Approving...",approveSingle:"Approve",approveConfirm:"Confirm approval and notify buyer?",approveBatchConfirm:"Confirm approval of {count} item(s) and notify buyer?",noSuggestions:"No shortage products; no procurement suggestions.",noPending:"No pending items (approved items are hidden).",listHint:"Select multiple to batch approve; click Approve to save and notify buyer.",filterPlaceholder:"Search by product/spec/code/key",sortBy:"Sort by",sortDir:"Order",sortUploadedAt:"Reported time",sortShortfall:"Shortfall",sortCount:"Report count",sortProduct:"Product name",sortDesc:"High to low / newest",sortAsc:"Low to high / oldest",pageSize:"Page size",total:"Total: {total}",page:"Page {current}/{total}",listTitle:"Shortage item list",selectAll:"Select all filtered items",selectItem:"Select item",colProduct:"Product",colSpec:"Spec",colShortfall:"Shortfall",colCode:"Code",colCount:"Count",colActions:"Actions",approvedCount:"Approved {count} item(s)."},replenishment:{title:"Replenishment",subtitle:"Enter product name or code and quantity to generate a draft; view and confirm in the list below to run inventory supplement.",productOrCodePlaceholder:"Product name or code",quantityPlaceholder:"Quantity",generateDraft:"Generate replenishment draft",creating:"Creating…",addRow:"Add row",removeRow:"Remove",refreshList:"Refresh list",loading:"Loading…",listTitle:"Replenishment drafts",listHint:"Drafts are created via LLM and inventory tools; confirm to run inventory changes.",noDrafts:"No replenishment drafts.",colDraftNo:"Draft No",colName:"Name",colCreatedAt:"Created",colStatus:"Status",colActions:"Actions",viewDetail:"View",confirm:"Confirm replenishment",confirming:"Executing…",confirmPrompt:"Confirm and run all inventory changes for this draft?",delete:"Delete",deleteConfirm:"Delete this replenishment draft? This cannot be undone.",detailTitle:"Draft detail ({no})",detailSubtitle:"Products, current stock and replenishment quantities.",colCode:"Code",colProduct:"Product",colSpec:"Spec",colCurrentQty:"Current qty",colQuantity:"Quantity"},oos:{title:"Out-of-stock dashboard",subtitle:"Overview and list of out-of-stock products, without asking the agent.",actions:{loading:"Loading…",refresh:"Refresh",addManual:"Add manually",confirm:"Confirm",delete:"Delete",deleteHint:"Delete this out-of-stock item"},db:{local:"Using local database"},stats:{totalRecords:"Total records",outOfStockCount:"Out-of-stock items",today:"New today",reportedGe2:"Reported out-of-stock ≥2 times",emailSentProductCount:"Products with email sent"},empty:{stats:"No stats yet.",list:"No out-of-stock records."},list:{title:"Out-of-stock product list",more:"Total {count} out-of-stock products; showing first 50 only",meta:"Qty: {qty} {unit} · Reported out-of-stock {count} time(s) · Email: {email}"},addForm:{title:"Add out-of-stock record",namePlaceholder:"Product name (required)",specPlaceholder:"Specification",qtyPlaceholder:"Quantity",unitPlaceholder:"Unit"},email:{sent:"Sent",notSent:"Not sent"},byFile:{title:"By file",empty:"None",count:"Records: {count}"},byTime:{title:"By time (last 30 days)",empty:"None",count:"New: {count}"}},shortage:{title:"Shortage records",subtitle:"Saved when Work detects insufficient stock; overview and list of shortage items.",actions:{loading:"Loading…",refresh:"Refresh",addManual:"Add manually",confirm:"Confirm",delete:"Delete",deleteHint:"Delete this shortage item"},db:{local:"Using local database"},stats:{totalRecords:"Total records",shortageProductCount:"Shortage products",today:"New today",reportedGe2:"Reported shortage ≥2 times"},empty:{stats:"No stats yet.",list:"No shortage records."},list:{title:"Shortage product list",more:"Total {count} shortage products; showing first 50 only",meta:"Required: {qty} · Available: {avail} · Shortfall: {diff} · Reported shortage {count} time(s)"},addForm:{title:"Add shortage record (product name, spec, required, available; shortfall will be auto-calculated)",namePlaceholder:"Product name (required)",specPlaceholder:"Specification",qtyPlaceholder:"Required",availPlaceholder:"Available",qtyTitle:"Required quantity",availTitle:"Available quantity",diffTitle:"Shortfall = required − available; auto-calculated on submit",diffText:"Shortfall: auto-calculated"},byFile:{title:"By file",empty:"None",count:"Records: {count}"},byTime:{title:"By time (last 30 days)",empty:"None",count:"New: {count}"}},businessKnowledge:{title:"Business knowledge",subtitle:"Edit wanding_business_knowledge.md for selection and matching. The LLM will use the latest content after saving.",lastSavedAt:"Saved at {time}",actions:{reloading:"Loading…",reload:"Reload",saving:"Saving…",save:"Save"},relatedFiles:{title:"Related data files",hint:"Selection and historical quotations rely on these Excel files. Copy the path to open them in Explorer or Excel when updating.",mappingTableLabel:"Inquiry mapping table (historical quotations):",priceLibraryLabel:"Wanding price library:",copyPath:"Copy path"},editor:{placeholder:`[Business knowledge]
1. …`}},agents:{reports:{whereHint:"Weekly reports live here: open Agents, pick an agent, then the Skills sub-tab (not the sidebar Skills catalog).",title:"Weekly reports",subtitle:"Scheduled tasks and recent runs for this agent.",tokenLabel:"Reports admin token",tasks:"Tasks",noTasks:"No report tasks configured.",enabled:"Enabled",cron:"Cron",timezone:"Timezone",run:"Run now",latestRecords:"Latest runs",noRecords:"No run history yet.",detailLoading:"Loading report...",detailEmpty:"Select a record on the left to view the report.",detailNoMd:"No report text is stored yet for this record.",copyBtn:"Copy",copiedBtn:"Copied!",reformatBtn:"Regenerate text",tabData:"Data Report",tabAnalysis:"AI Analysis",analysisLoading:"Generating analysis…",analysisPending:"Pending analysis, please wait…",analysisEmpty:"No analysis content yet.",analysisFailed:"Analysis generation failed.",reanalyzeBtn:"Re-analyze",metricTotal:"Total Invoice Amount",metricCount:"Invoice Count",tableDaily:"Daily Trend",tableCustomers:"Top 10 Customers",tableStatus:"Status Summary",colDate:"Date",colCount:"Count",colAmount:"Amount",colCustomer:"Customer",colStatus:"Status",colRank:"Rank"}},languages:{en:"English",zhCN:"简体中文 (Simplified Chinese)",zhTW:"繁體中文 (Traditional Chinese)",ptBR:"Português (Brazilian Portuguese)"}},cg=["en","zh-CN"];function Pa(e){return e!=null&&cg.includes(e)}class dg{constructor(){this.locale="en",this.translations={en:lg},this.subscribers=new Set,this.loadLocale()}loadLocale(){const t=localStorage.getItem("openclaw.i18n.locale");let n;Pa(t)?n=t:n=(navigator.language||"").startsWith("zh")?"zh-CN":"en",n==="en"?this.locale="en":this.setLocale(n)}getLocale(){return this.locale}async setLocale(t){if(this.locale!==t){if(!this.translations[t])try{let n;if(t==="zh-CN")n=await ag(()=>import("./zh-CN-KknPJS70.js"),[],import.meta.url);else return;this.translations[t]=n[t.replace("-","_")]}catch(n){console.error(`Failed to load locale: ${t}`,n);return}this.locale=t,localStorage.setItem("openclaw.i18n.locale",t),this.notify()}}registerTranslation(t,n){this.translations[t]=n}subscribe(t){return this.subscribers.add(t),()=>this.subscribers.delete(t)}notify(){this.subscribers.forEach(t=>t(this.locale))}t(t,n){const i=t.split(".");let s=this.translations[this.locale]||this.translations.en;for(const o of i)if(s&&typeof s=="object")s=s[o];else{s=void 0;break}if(s===void 0&&this.locale!=="en"){s=this.translations.en;for(const o of i)if(s&&typeof s=="object")s=s[o];else{s=void 0;break}}return typeof s!="string"?t:n?s.replace(/\{(\w+)\}/g,(o,r)=>n[r]||`{${r}}`):s}}const bn=new dg,p=(e,t)=>bn.t(e,t);class ug{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){this.unsubscribe=bn.subscribe(()=>{this.host.requestUpdate()})}hostDisconnected(){var t;(t=this.unsubscribe)==null||t.call(this)}}async function Qe(e,t){if(!(!e.client||!e.connected)&&!e.channelsLoading){e.channelsLoading=!0,e.channelsError=null;try{const n=await e.client.request("channels.status",{probe:t,timeoutMs:8e3});e.channelsSnapshot=n,e.channelsLastSuccess=Date.now()}catch(n){e.channelsError=String(n)}finally{e.channelsLoading=!1}}}async function hg(e,t){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const n=await e.client.request("web.login.start",{force:t,timeoutMs:3e4});e.whatsappLoginMessage=n.message??null,e.whatsappLoginQrDataUrl=n.qrDataUrl??null,e.whatsappLoginConnected=null}catch(n){e.whatsappLoginMessage=String(n),e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function fg(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const t=await e.client.request("web.login.wait",{timeoutMs:12e4});e.whatsappLoginMessage=t.message??null,e.whatsappLoginConnected=t.connected??null,t.connected&&(e.whatsappLoginQrDataUrl=null)}catch(t){e.whatsappLoginMessage=String(t),e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function pg(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{await e.client.request("channels.logout",{channel:"whatsapp"}),e.whatsappLoginMessage="Logged out.",e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}catch(t){e.whatsappLoginMessage=String(t)}finally{e.whatsappBusy=!1}}}function Ve(e){if(e)return Array.isArray(e.type)?e.type.filter(n=>n!=="null")[0]??e.type[0]:e.type}function Qu(e){if(!e)return"";if(e.default!==void 0)return e.default;switch(Ve(e)){case"object":return{};case"array":return[];case"boolean":return!1;case"number":case"integer":return 0;case"string":return"";default:return""}}function Ma(e){return e.filter(t=>typeof t=="string").join(".")}function Ge(e,t){const n=Ma(e),i=t[n];if(i)return i;const s=n.split(".");for(const[o,r]of Object.entries(t)){if(!o.includes("*"))continue;const a=o.split(".");if(a.length!==s.length)continue;let l=!0;for(let c=0;c<s.length;c+=1)if(a[c]!=="*"&&a[c]!==s[c]){l=!1;break}if(l)return r}}function Et(e){return e.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/\s+/g," ").replace(/^./,t=>t.toUpperCase())}function rc(e,t){const n=e.trim();if(n==="")return;const i=Number(n);return!Number.isFinite(i)||t&&!Number.isInteger(i)?e:i}function ac(e){const t=e.trim();return t==="true"?!0:t==="false"?!1:e}function Lt(e,t){if(e==null)return e;if(t.allOf&&t.allOf.length>0){let i=e;for(const s of t.allOf)i=Lt(i,s);return i}const n=Ve(t);if(t.anyOf||t.oneOf){const i=(t.anyOf??t.oneOf??[]).filter(s=>!(s.type==="null"||Array.isArray(s.type)&&s.type.includes("null")));if(i.length===1)return Lt(e,i[0]);if(typeof e=="string")for(const s of i){const o=Ve(s);if(o==="number"||o==="integer"){const r=rc(e,o==="integer");if(r===void 0||typeof r=="number")return r}if(o==="boolean"){const r=ac(e);if(typeof r=="boolean")return r}}for(const s of i){const o=Ve(s);if(o==="object"&&typeof e=="object"&&!Array.isArray(e)||o==="array"&&Array.isArray(e))return Lt(e,s)}return e}if(n==="number"||n==="integer"){if(typeof e=="string"){const i=rc(e,n==="integer");if(i===void 0||typeof i=="number")return i}return e}if(n==="boolean"){if(typeof e=="string"){const i=ac(e);if(typeof i=="boolean")return i}return e}if(n==="object"){if(typeof e!="object"||Array.isArray(e))return e;const i=e,s=t.properties??{},o=t.additionalProperties&&typeof t.additionalProperties=="object"?t.additionalProperties:null,r={};for(const[a,l]of Object.entries(i)){const c=s[a]??o,d=c?Lt(l,c):l;d!==void 0&&(r[a]=d)}return r}if(n==="array"){if(!Array.isArray(e))return e;if(Array.isArray(t.items)){const s=t.items;return e.map((o,r)=>{const a=r<s.length?s[r]:void 0;return a?Lt(o,a):o})}const i=t.items;return i?e.map(s=>Lt(s,i)).filter(s=>s!==void 0):e}return e}function xn(e){return typeof structuredClone=="function"?structuredClone(e):JSON.parse(JSON.stringify(e))}function qi(e){return`${JSON.stringify(e,null,2).trimEnd()}
`}function Yu(e,t,n){if(t.length===0)return;let i=e;for(let o=0;o<t.length-1;o+=1){const r=t[o],a=t[o+1];if(typeof r=="number"){if(!Array.isArray(i))return;i[r]==null&&(i[r]=typeof a=="number"?[]:{}),i=i[r]}else{if(typeof i!="object"||i==null)return;const l=i;l[r]==null&&(l[r]=typeof a=="number"?[]:{}),i=l[r]}}const s=t[t.length-1];if(typeof s=="number"){Array.isArray(i)&&(i[s]=n);return}typeof i=="object"&&i!=null&&(i[s]=n)}function Xu(e,t){if(t.length===0)return;let n=e;for(let s=0;s<t.length-1;s+=1){const o=t[s];if(typeof o=="number"){if(!Array.isArray(n))return;n=n[o]}else{if(typeof n!="object"||n==null)return;n=n[o]}if(n==null)return}const i=t[t.length-1];if(typeof i=="number"){Array.isArray(n)&&n.splice(i,1);return}typeof n=="object"&&n!=null&&delete n[i]}async function yt(e){if(!(!e.client||!e.connected)){e.configLoading=!0,e.lastError=null;try{const t=await e.client.request("config.get",{});vg(e,t)}catch(t){e.lastError=String(t)}finally{e.configLoading=!1}}}async function gg(e){if(!(!e.client||!e.connected)&&!e.configSchemaLoading){e.configSchemaLoading=!0;try{const t=await e.client.request("config.schema",{});mg(e,t)}catch(t){e.lastError=String(t)}finally{e.configSchemaLoading=!1}}}function mg(e,t){e.configSchema=t.schema??null,e.configUiHints=t.uiHints??{},e.configSchemaVersion=t.version??null}function vg(e,t){e.configSnapshot=t;const n=typeof t.raw=="string"?t.raw:t.config&&typeof t.config=="object"?qi(t.config):e.configRaw;!e.configFormDirty||e.configFormMode==="raw"?e.configRaw=n:e.configForm?e.configRaw=qi(e.configForm):e.configRaw=n,e.configValid=typeof t.valid=="boolean"?t.valid:null,e.configIssues=Array.isArray(t.issues)?t.issues:[],e.configFormDirty||(e.configForm=xn(t.config??{}),e.configFormOriginal=xn(t.config??{}),e.configRawOriginal=n)}function yg(e){return!e||typeof e!="object"||Array.isArray(e)?null:e}function Ju(e){if(e.configFormMode!=="form"||!e.configForm)return e.configRaw;const t=yg(e.configSchema),n=t?Lt(e.configForm,t):e.configForm;return qi(n)}async function zs(e){var t;if(!(!e.client||!e.connected)){e.configSaving=!0,e.lastError=null;try{const n=Ju(e),i=(t=e.configSnapshot)==null?void 0:t.hash;if(!i){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.set",{raw:n,baseHash:i}),e.configFormDirty=!1,await yt(e)}catch(n){e.lastError=String(n)}finally{e.configSaving=!1}}}async function bg(e){var t;if(!(!e.client||!e.connected)){e.configApplying=!0,e.lastError=null;try{const n=Ju(e),i=(t=e.configSnapshot)==null?void 0:t.hash;if(!i){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.apply",{raw:n,baseHash:i,sessionKey:e.applySessionKey}),e.configFormDirty=!1,await yt(e)}catch(n){e.lastError=String(n)}finally{e.configApplying=!1}}}async function xg(e){if(!(!e.client||!e.connected)){e.updateRunning=!0,e.lastError=null;try{await e.client.request("update.run",{sessionKey:e.applySessionKey})}catch(t){e.lastError=String(t)}finally{e.updateRunning=!1}}}function je(e,t,n){var s;const i=xn(e.configForm??((s=e.configSnapshot)==null?void 0:s.config)??{});Yu(i,t,n),e.configForm=i,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=qi(i))}function _t(e,t){var i;const n=xn(e.configForm??((i=e.configSnapshot)==null?void 0:i.config)??{});Xu(n,t),e.configForm=n,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=qi(n))}function wg(e){const t={name:(e==null?void 0:e.name)??"",displayName:(e==null?void 0:e.displayName)??"",about:(e==null?void 0:e.about)??"",picture:(e==null?void 0:e.picture)??"",banner:(e==null?void 0:e.banner)??"",website:(e==null?void 0:e.website)??"",nip05:(e==null?void 0:e.nip05)??"",lud16:(e==null?void 0:e.lud16)??""};return{values:t,original:{...t},saving:!1,importing:!1,error:null,success:null,fieldErrors:{},showAdvanced:!!(e!=null&&e.banner||e!=null&&e.website||e!=null&&e.nip05||e!=null&&e.lud16)}}async function _g(e,t){await hg(e,t),await Qe(e,!0)}async function kg(e){await fg(e),await Qe(e,!0)}async function $g(e){await pg(e),await Qe(e,!0)}async function Sg(e){await zs(e),await yt(e),await Qe(e,!0)}async function Ag(e){await yt(e),await Qe(e,!0)}function Tg(e){if(!Array.isArray(e))return{};const t={};for(const n of e){if(typeof n!="string")continue;const[i,...s]=n.split(":");if(!i||s.length===0)continue;const o=i.trim(),r=s.join(":").trim();o&&r&&(t[o]=r)}return t}function Zu(e){var n,i,s;return((s=(((i=(n=e.channelsSnapshot)==null?void 0:n.channelAccounts)==null?void 0:i.nostr)??[])[0])==null?void 0:s.accountId)??e.nostrProfileAccountId??"default"}function eh(e,t=""){return`/api/channels/nostr/${encodeURIComponent(e)}/profile${t}`}function Cg(e){var s,o,r;const t=(r=(o=(s=e.hello)==null?void 0:s.auth)==null?void 0:o.deviceToken)==null?void 0:r.trim();if(t)return`Bearer ${t}`;const n=e.settings.token.trim();if(n)return`Bearer ${n}`;const i=e.password.trim();return i?`Bearer ${i}`:null}function th(e){const t=Cg(e);return t?{Authorization:t}:{}}function Eg(e,t,n){e.nostrProfileAccountId=t,e.nostrProfileFormState=wg(n??void 0)}function Rg(e){e.nostrProfileFormState=null,e.nostrProfileAccountId=null}function Lg(e,t,n){const i=e.nostrProfileFormState;i&&(e.nostrProfileFormState={...i,values:{...i.values,[t]:n},fieldErrors:{...i.fieldErrors,[t]:""}})}function Pg(e){const t=e.nostrProfileFormState;t&&(e.nostrProfileFormState={...t,showAdvanced:!t.showAdvanced})}async function Mg(e){const t=e.nostrProfileFormState;if(!t||t.saving)return;const n=Zu(e);e.nostrProfileFormState={...t,saving:!0,error:null,success:null,fieldErrors:{}};try{const i=await fetch(eh(n),{method:"PUT",headers:{"Content-Type":"application/json",...th(e)},body:JSON.stringify(t.values)}),s=await i.json().catch(()=>null);if(!i.ok||(s==null?void 0:s.ok)===!1||!s){const o=(s==null?void 0:s.error)??`Profile update failed (${i.status})`;e.nostrProfileFormState={...t,saving:!1,error:o,success:null,fieldErrors:Tg(s==null?void 0:s.details)};return}if(!s.persisted){e.nostrProfileFormState={...t,saving:!1,error:"Profile publish failed on all relays.",success:null};return}e.nostrProfileFormState={...t,saving:!1,error:null,success:"Profile published to relays.",fieldErrors:{},original:{...t.values}},await Qe(e,!0)}catch(i){e.nostrProfileFormState={...t,saving:!1,error:`Profile update failed: ${String(i)}`,success:null}}}async function Dg(e){const t=e.nostrProfileFormState;if(!t||t.importing)return;const n=Zu(e);e.nostrProfileFormState={...t,importing:!0,error:null,success:null};try{const i=await fetch(eh(n,"/import"),{method:"POST",headers:{"Content-Type":"application/json",...th(e)},body:JSON.stringify({autoMerge:!0})}),s=await i.json().catch(()=>null);if(!i.ok||(s==null?void 0:s.ok)===!1||!s){const l=(s==null?void 0:s.error)??`Profile import failed (${i.status})`;e.nostrProfileFormState={...t,importing:!1,error:l,success:null};return}const o=s.merged??s.imported??null,r=o?{...t.values,...o}:t.values,a=!!(r.banner||r.website||r.nip05||r.lud16);e.nostrProfileFormState={...t,importing:!1,values:r,error:null,success:s.saved?"Profile imported from relays. Review and publish.":"Profile imported. Review and publish.",showAdvanced:a},s.saved&&await Qe(e,!0)}catch(i){e.nostrProfileFormState={...t,importing:!1,error:`Profile import failed: ${String(i)}`,success:null}}}function nh(e){var o;const t=(e??"").trim();if(!t)return null;const n=t.split(":").filter(Boolean);if(n.length<3||n[0]!=="agent")return null;const i=(o=n[1])==null?void 0:o.trim(),s=n.slice(2).join(":");return!i||!s?null:{agentId:i,rest:s}}const qr=450;function Ji(e,t=!1,n=!1){e.chatScrollFrame&&cancelAnimationFrame(e.chatScrollFrame),e.chatScrollTimeout!=null&&(clearTimeout(e.chatScrollTimeout),e.chatScrollTimeout=null);const i=()=>{const s=e.querySelector(".chat-thread");if(s){const o=getComputedStyle(s).overflowY;if(o==="auto"||o==="scroll"||s.scrollHeight-s.clientHeight>1)return s}return document.scrollingElement??document.documentElement};e.updateComplete.then(()=>{e.chatScrollFrame=requestAnimationFrame(()=>{e.chatScrollFrame=null;const s=i();if(!s)return;const o=s.scrollHeight-s.scrollTop-s.clientHeight,r=t&&!e.chatHasAutoScrolled;if(!(r||e.chatUserNearBottom||o<qr)){e.chatNewMessagesBelow=!0;return}r&&(e.chatHasAutoScrolled=!0);const l=n&&(typeof window>"u"||typeof window.matchMedia!="function"||!window.matchMedia("(prefers-reduced-motion: reduce)").matches),c=s.scrollHeight;typeof s.scrollTo=="function"?s.scrollTo({top:c,behavior:l?"smooth":"auto"}):s.scrollTop=c,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1;const d=r?150:120;e.chatScrollTimeout=window.setTimeout(()=>{e.chatScrollTimeout=null;const u=i();if(!u)return;const h=u.scrollHeight-u.scrollTop-u.clientHeight;(r||e.chatUserNearBottom||h<qr)&&(u.scrollTop=u.scrollHeight,e.chatUserNearBottom=!0)},d)})})}function ih(e,t=!1){e.logsScrollFrame&&cancelAnimationFrame(e.logsScrollFrame),e.updateComplete.then(()=>{e.logsScrollFrame=requestAnimationFrame(()=>{e.logsScrollFrame=null;const n=e.querySelector(".log-stream");if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;(t||i<80)&&(n.scrollTop=n.scrollHeight)})})}function Ig(e,t){const n=t.currentTarget;if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;e.chatUserNearBottom=i<qr,e.chatUserNearBottom&&(e.chatNewMessagesBelow=!1)}function Og(e,t){const n=t.currentTarget;if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;e.logsAtBottom=i<80}function lc(e){e.chatHasAutoScrolled=!1,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1}function Fg(e,t){if(e.length===0)return;const n=new Blob([`${e.join(`
`)}
`],{type:"text/plain"}),i=URL.createObjectURL(n),s=document.createElement("a"),o=new Date().toISOString().slice(0,19).replace(/[:T]/g,"-");s.href=i,s.download=`openclaw-logs-${t}-${o}.log`,s.click(),URL.revokeObjectURL(i)}function Ng(e){if(typeof ResizeObserver>"u")return;const t=e.querySelector(".topbar");if(!t)return;const n=()=>{const{height:i}=t.getBoundingClientRect();e.style.setProperty("--topbar-height",`${i}px`)};n(),e.topbarObserver=new ResizeObserver(()=>n()),e.topbarObserver.observe(t)}async function ko(e){if(!(!e.client||!e.connected)&&!e.debugLoading){e.debugLoading=!0;try{const[t,n,i,s]=await Promise.all([e.client.request("status",{}),e.client.request("health",{}),e.client.request("models.list",{}),e.client.request("last-heartbeat",{})]);e.debugStatus=t,e.debugHealth=n;const o=i;e.debugModels=Array.isArray(o==null?void 0:o.models)?o==null?void 0:o.models:[],e.debugHeartbeat=s}catch(t){e.debugCallError=String(t)}finally{e.debugLoading=!1}}}async function Bg(e){if(!(!e.client||!e.connected)){e.debugCallError=null,e.debugCallResult=null;try{const t=e.debugCallParams.trim()?JSON.parse(e.debugCallParams):{},n=await e.client.request(e.debugCallMethod.trim(),t);e.debugCallResult=JSON.stringify(n,null,2)}catch(t){e.debugCallError=String(t)}}}const zg=2e3,Hg=new Set(["trace","debug","info","warn","error","fatal"]);function Ug(e){if(typeof e!="string")return null;const t=e.trim();if(!t.startsWith("{")||!t.endsWith("}"))return null;try{const n=JSON.parse(t);return!n||typeof n!="object"?null:n}catch{return null}}function qg(e){if(typeof e!="string")return null;const t=e.toLowerCase();return Hg.has(t)?t:null}function jg(e){if(!e.trim())return{raw:e,message:e};try{const t=JSON.parse(e),n=t&&typeof t._meta=="object"&&t._meta!==null?t._meta:null,i=typeof t.time=="string"?t.time:typeof(n==null?void 0:n.date)=="string"?n==null?void 0:n.date:null,s=qg((n==null?void 0:n.logLevelName)??(n==null?void 0:n.level)),o=typeof t[0]=="string"?t[0]:typeof(n==null?void 0:n.name)=="string"?n==null?void 0:n.name:null,r=Ug(o);let a=null;r&&(typeof r.subsystem=="string"?a=r.subsystem:typeof r.module=="string"&&(a=r.module)),!a&&o&&o.length<120&&(a=o);let l=null;return typeof t[1]=="string"?l=t[1]:!r&&typeof t[0]=="string"?l=t[0]:typeof t.message=="string"&&(l=t.message),{raw:e,time:i,level:s,subsystem:a,message:l??e,meta:n??void 0}}catch{return{raw:e,message:e}}}async function Da(e,t){if(!(!e.client||!e.connected)&&!(e.logsLoading&&!(t!=null&&t.quiet))){t!=null&&t.quiet||(e.logsLoading=!0),e.logsError=null;try{const i=await e.client.request("logs.tail",{cursor:t!=null&&t.reset?void 0:e.logsCursor??void 0,limit:e.logsLimit,maxBytes:e.logsMaxBytes}),o=(Array.isArray(i.lines)?i.lines.filter(a=>typeof a=="string"):[]).map(jg),r=!!(t!=null&&t.reset||i.reset||e.logsCursor==null);e.logsEntries=r?o:[...e.logsEntries,...o].slice(-zg),typeof i.cursor=="number"&&(e.logsCursor=i.cursor),typeof i.file=="string"&&(e.logsFile=i.file),e.logsTruncated=!!i.truncated,e.logsLastFetchAt=Date.now()}catch(n){e.logsError=String(n)}finally{t!=null&&t.quiet||(e.logsLoading=!1)}}}async function $o(e,t){if(!(!e.client||!e.connected)&&!e.nodesLoading){e.nodesLoading=!0,t!=null&&t.quiet||(e.lastError=null);try{const n=await e.client.request("node.list",{});e.nodes=Array.isArray(n.nodes)?n.nodes:[]}catch(n){t!=null&&t.quiet||(e.lastError=String(n))}finally{e.nodesLoading=!1}}}function Kg(e){e.nodesPollInterval==null&&(e.nodesPollInterval=window.setInterval(()=>void $o(e,{quiet:!0}),5e3))}function Wg(e){e.nodesPollInterval!=null&&(clearInterval(e.nodesPollInterval),e.nodesPollInterval=null)}function Ia(e){e.logsPollInterval==null&&(e.logsPollInterval=window.setInterval(()=>{e.tab==="logs"&&Da(e,{quiet:!0})},2e3))}function Oa(e){e.logsPollInterval!=null&&(clearInterval(e.logsPollInterval),e.logsPollInterval=null)}function Fa(e){e.debugPollInterval==null&&(e.debugPollInterval=window.setInterval(()=>{e.tab==="debug"&&ko(e)},3e3))}function Na(e){e.debugPollInterval!=null&&(clearInterval(e.debugPollInterval),e.debugPollInterval=null)}async function sh(e,t){if(!(!e.client||!e.connected||e.agentIdentityLoading)&&!e.agentIdentityById[t]){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{const n=await e.client.request("agent.identity.get",{agentId:t});n&&(e.agentIdentityById={...e.agentIdentityById,[t]:n})}catch(n){e.agentIdentityError=String(n)}finally{e.agentIdentityLoading=!1}}}async function oh(e,t){if(!e.client||!e.connected||e.agentIdentityLoading)return;const n=t.filter(i=>!e.agentIdentityById[i]);if(n.length!==0){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{for(const i of n){const s=await e.client.request("agent.identity.get",{agentId:i});s&&(e.agentIdentityById={...e.agentIdentityById,[i]:s})}}catch(i){e.agentIdentityError=String(i)}finally{e.agentIdentityLoading=!1}}}async function Hs(e,t){if(!(!e.client||!e.connected)&&!e.agentSkillsLoading){e.agentSkillsLoading=!0,e.agentSkillsError=null;try{const n=await e.client.request("skills.status",{agentId:t});n&&(e.agentSkillsReport=n,e.agentSkillsAgentId=t)}catch(n){e.agentSkillsError=String(n)}finally{e.agentSkillsLoading=!1}}}async function Ba(e){var t;if(!(!e.client||!e.connected)&&!e.agentsLoading){e.agentsLoading=!0,e.agentsError=null;try{const n=await e.client.request("agents.list",{});if(n){e.agentsList=n;const i=e.agentsSelectedId,s=n.agents.some(o=>o.id===i);(!i||!s)&&(e.agentsSelectedId=n.defaultId??((t=n.agents[0])==null?void 0:t.id)??null)}}catch(n){e.agentsError=String(n)}finally{e.agentsLoading=!1}}}function za(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}async function Vg(e){try{const n=await(await fetch(za(e.basePath,"/api/business-knowledge/dependent-files"))).json().catch(()=>({}));n.success&&n.data?e.bkDependentFiles={mapping_table:n.data.mapping_table??"",price_library:n.data.price_library??""}:e.bkDependentFiles=null}catch{e.bkDependentFiles=null}}async function rh(e){e.bkLoading=!0,e.bkError=null,Vg(e);try{const t=await fetch(za(e.basePath,"/api/business-knowledge")),n=await t.json().catch(()=>({}));n.success&&n.data&&typeof n.data.content=="string"?e.bkContent=n.data.content:(e.bkContent="",t.ok||(e.bkError=n.detail??`HTTP ${t.status}`))}catch(t){e.bkError=t instanceof Error?t.message:String(t),e.bkContent=""}finally{e.bkLoading=!1}}async function Gg(e,t){e.bkSaving=!0,e.bkError=null;try{const n=await fetch(za(e.basePath,"/api/business-knowledge"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:t})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(e.bkContent=t,e.bkLastSuccess=Date.now(),!0):(e.bkError=i.detail??`HTTP ${n.status}`,!1)}catch(n){return e.bkError=n instanceof Error?n.message:String(n),!1}finally{e.bkSaving=!1}}function ah(e){if(e==null||!Number.isFinite(e))return"n/a";const t=Math.floor(e/1e3),n=Math.floor(t/60),i=Math.floor(n/60);return i>0?`${i}h`:n>0?`${n}m`:t>0?`${t}s`:"<1s"}function Cn(e){if(e==null||!Number.isFinite(e))return"n/a";const t=Date.now(),n=e-t,i=Math.abs(n),s=Math.floor(i/6e4),o=Math.floor(s/60),r=Math.floor(o/24);return n>0?s<1?"in <1m":s<60?`in ${s}m`:o<24?`in ${o}h`:`in ${r}d`:i<15e3?"just now":s<60?`${s}m ago`:o<24?`${o}h ago`:`${r}d ago`}function Qg(e,t){return!e||typeof e!="string"?"":e.replace(/<think>[\s\S]*?<\/think>/gi,"").trim()}function Zs(e){return!e&&e!==0?"n/a":new Date(e).toLocaleString()}function jr(e){return!e||e.length===0?"none":e.filter(t=>!!(t&&t.trim())).join(", ")}function Kr(e,t=120){return e.length<=t?e:`${e.slice(0,Math.max(0,t-1))}…`}function lh(e,t){return e.length<=t?{text:e,truncated:!1,total:e.length}:{text:e.slice(0,Math.max(0,t)),truncated:!0,total:e.length}}function cc(e,t){const n=Number(e);return Number.isFinite(n)?n:t}function rr(e){return Qg(e)}async function ch(e){if(!(!e.client||!e.connected))try{const t=await e.client.request("cron.status",{});e.cronStatus=t}catch(t){e.cronError=String(t)}}async function Yg(e){if(!(!e.client||!e.connected)&&!e.cronLoading){e.cronLoading=!0,e.cronError=null;try{const t=await e.client.request("cron.list",{includeDisabled:!0});e.cronJobs=Array.isArray(t.jobs)?t.jobs:[]}catch(t){e.cronError=String(t)}finally{e.cronLoading=!1}}}function ar(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams;for(const[r,a]of Object.entries(n))o.set(r,String(a));return`${s}?${o.toString()}`}async function Xg(e){e.dashboardLoading=!0,e.dashboardError=null;try{const[t,n,i]=await Promise.allSettled([fetch(ar(e.basePath,"/api/quotation-drafts/stats",{days:7})),fetch(ar(e.basePath,"/api/oos/by-time",{days:7})),fetch(ar(e.basePath,"/api/shortage/by-time",{days:7}))]),s=[];if(t.status==="fulfilled"){const o=await t.value.json().catch(()=>({}));o.success&&o.data?e.quotationStats=o.data:(e.quotationStats=null,s.push(o.detail??`quotation/stats: ${t.value.status}`))}else e.quotationStats=null,s.push(`quotation/stats: ${String(t.reason)}`);if(n.status==="fulfilled"){const o=await n.value.json().catch(()=>({}));e.dashboardOosByTime=o.success&&Array.isArray(o.data)?o.data:[],o.success||s.push(o.detail??`oos/by-time: ${n.value.status}`)}else e.dashboardOosByTime=[],s.push(`oos/by-time: ${String(n.reason)}`);if(i.status==="fulfilled"){const o=await i.value.json().catch(()=>({}));e.dashboardShortageByTime=o.success&&Array.isArray(o.data)?o.data:[],o.success||s.push(o.detail??`shortage/by-time: ${i.value.status}`)}else e.dashboardShortageByTime=[],s.push(`shortage/by-time: ${String(i.reason)}`);e.dashboardError=s.length>0?s.join(" | "):null}catch(t){e.dashboardError=t instanceof Error?t.message:String(t),e.quotationStats=null,e.dashboardOosByTime=[],e.dashboardShortageByTime=[]}finally{e.dashboardLoading=!1}}class ye extends Error{constructor(t,n){super(`Invalid response schema from ${t}: ${n}`),this.name="ResponseSchemaError",this.endpoint=t}}function dh(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function ae(e,t,n="response"){if(!dh(e))throw new ye(t,`${n} must be an object`);return e}function Wt(e,t,n){if(!Array.isArray(e))throw new ye(t,`${n} must be an array`);return e}function Nt(e,t,n){if(typeof e!="string")throw new ye(t,`${n} must be a string`);return e}function So(e,t,n){if(typeof e!="number"||Number.isNaN(e))throw new ye(t,`${n} must be a number`);return e}function W(e){return typeof e=="string"?e:void 0}function _e(e){return typeof e=="number"&&Number.isFinite(e)?e:void 0}function Ha(e){return typeof e=="boolean"?e:void 0}function Le(e,t){return dh(e)?typeof e.detail=="string"&&e.detail.trim()?e.detail.trim():typeof e.error=="string"&&e.error.trim()?e.error.trim():typeof e.message=="string"&&e.message.trim()?e.message.trim():t:t}function he(e,t,n,i){return`${e}失败：${t}。影响：${n}。下一步：${i}`}const ps="/api/quotation-drafts",dc="/api/quotation-drafts/{id}",Jg="/api/quotation-drafts/{id}/confirm",uc=new WeakMap;function Zg(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams(n);return`${s}?${o.toString()}`}function em(e,t){var s;const n=globalThis,i=typeof((s=n.crypto)==null?void 0:s.randomUUID)=="function"?n.crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2,10)}`;return`${e}:${t}:${i}`}function tm(e){let t=uc.get(e);return t||(t=new Map,uc.set(e,t)),t}function uh(e,t){const n=ae(e,t,"data[]"),s=_e(n.id)??Number(n.id);return{id:Number.isFinite(s)?s:0,draft_no:Nt(n.draft_no,t,"data[].draft_no"),name:Nt(n.name,t,"data[].name"),source:W(n.source),file_path:typeof n.file_path=="string"?n.file_path:null,created_at:W(n.created_at)??null,status:Nt(n.status,t,"data[].status"),confirmed_at:W(n.confirmed_at)??null}}function nm(e,t){const n=ae(e,t,"data"),i=uh(n,t),o=Wt(n.lines,t,"data.lines").map(r=>{const a=ae(r,t,"data.lines[]"),l=_e(a.warehouse_qty),c=_e(a.available_qty);return{...a,warehouse_qty:l??c??null}});return{...i,lines:o}}function im(e,t){const n=ae(e,t),i=n.data!=null?ae(n.data,t,"data"):{},s=W(i.order_id)??W(n.order_id),o=W(i.message)??W(n.message)??"已确认成单";return{order_id:s,message:o}}async function Ua(e){e.fulfillDraftsLoading=!0,e.fulfillDraftsError=null;try{const t=Zg(e.basePath,ps,{status:"pending",limit:"50"}),n=await fetch(t),i=await n.json().catch(()=>({}));if(!n.ok){e.fulfillDraftsError=he("加载待确认报价单列表",Le(i,`HTTP ${n.status}`),"无法查看最新待确认报价单","点击“重试”重新加载列表"),e.fulfillDrafts=[];return}const s=ae(i,ps),o=Wt(s.data,ps,"data");e.fulfillDrafts=o.map(r=>uh(r,ps)).filter(r=>r.id>0)}catch(t){const n=t instanceof ye||t instanceof Error?t.message:String(t);e.fulfillDraftsError=he("加载待确认报价单列表",n,"列表可能为空或字段错位","检查后端返回字段后重试"),e.fulfillDrafts=[]}finally{e.fulfillDraftsLoading=!1}}async function sm(e,t){var n;e.fulfillDetailId=t;try{const i=(n=e.basePath)!=null&&n.trim()?`${e.basePath.replace(/\/$/,"")}/api/quotation-drafts/${t}`:`/api/quotation-drafts/${t}`,s=await fetch(i),o=await s.json().catch(()=>({}));if(!s.ok){e.fulfillDetail=null,e.fulfillConfirmResult={message:he("加载报价单详情",Le(o,`HTTP ${s.status}`),"无法确认该报价单","点击“重试”或返回列表后重选")};return}const r=ae(o,dc);e.fulfillDetail=nm(r.data,dc)}catch(i){const s=i instanceof ye||i instanceof Error?i.message:String(i);e.fulfillDetail=null,e.fulfillConfirmResult={message:he("加载报价单详情",s,"无法确认该报价单","点击“重试”或返回列表后重选")}}}async function om(e,t){const n=tm(e),i=n.get(t);if(i)return i;const s=(async()=>{var o;e.fulfillConfirmBusy=!0,e.fulfillConfirmResult=null;try{const r=(o=e.basePath)!=null&&o.trim()?`${e.basePath.replace(/\/$/,"")}/api/quotation-drafts/${t}/confirm`:`/api/quotation-drafts/${t}/confirm`,a=em("fulfill-confirm",String(t)),l=await fetch(r,{method:"PATCH",headers:{"X-Idempotency-Key":a,"Idempotency-Key":a}}),c=await l.json().catch(()=>({}));if(!l.ok)return e.fulfillConfirmResult={message:he("确认成单",Le(c,`HTTP ${l.status}`),"该报价单仍为待确认，库存未锁定","点击“重试”再次确认")},e.fulfillConfirmResult;const d=im(c,Jg);return e.fulfillConfirmResult=d,e.fulfillDetail=null,e.fulfillDetailId=null,await Ua(e),d}catch(r){const a=r instanceof ye||r instanceof Error?r.message:String(r);return e.fulfillConfirmResult={message:he("确认成单",a,"该报价单仍为待确认，库存未锁定","点击“重试”再次确认")},e.fulfillConfirmResult}finally{e.fulfillConfirmBusy=!1,n.delete(t)}})();return n.set(t,s),s}function Je(e){return`${e.product_key??""}	${e.specification??""}	${e.code??""}`}const gs="/api/shortage/list",Ti="/api/procurement/approve",pe="/api/replenishment-drafts",hc=new WeakMap;function rm(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams(n);return`${s}?${o.toString()}`}function am(e,t){var s;const n=globalThis,i=typeof((s=n.crypto)==null?void 0:s.randomUUID)=="function"?n.crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2,10)}`;return`${e}:${t}:${i}`}function lm(e){let t=hc.get(e);return t||(t=new Map,hc.set(e,t)),t}function gt(e){const t=_e(e);if(t!=null)return t;const n=Number(e);return Number.isFinite(n)?n:void 0}function cm(e,t){const n=ae(e,t,"data[]");return{id:gt(n.id),product_name:W(n.product_name),specification:W(n.specification),quantity:gt(n.quantity),available_qty:gt(n.available_qty),shortfall:gt(n.shortfall),code:W(n.code),quote_name:W(n.quote_name),unit_price:gt(n.unit_price),file_name:W(n.file_name),uploaded_at:W(n.uploaded_at)??null,product_key:W(n.product_key),count:gt(n.count)}}function dm(e){const t=new Map;for(const n of e){const i=Je(n);if(!i.trim())continue;const s=t.get(i);if(!s){t.set(i,n);continue}const o=Number(s.count??0),r=Number(n.count??0),a=s.uploaded_at?new Date(s.uploaded_at).getTime():0,l=n.uploaded_at?new Date(n.uploaded_at).getTime():0;(r>o||r===o&&l>=a)&&t.set(i,n)}return Array.from(t.values())}function um(e){const t=ae(e,Ti),n=t.data!=null?ae(t.data,Ti,"data"):{},i=_e(t.approved_count)??_e(n.approved_count)??(t.approved_count!=null?So(t.approved_count,Ti,"approved_count"):void 0),s=W(t.message)??W(n.message)??"已批准并通知采购员。";return{approved_count:i,message:s}}function hm(e){return e.map(n=>`${n.product_key??""}|${n.product_name??""}|${n.specification??""}|${n.code??""}|${n.shortfall??0}`).sort().join(";")}async function qa(e){e.procurementLoading=!0,e.procurementError=null;try{const t=rm(e.basePath,gs,{limit:"200",unapproved_only:"1"}),n=await fetch(t),i=await n.json().catch(()=>({}));if(!n.ok){e.procurementError=he("加载采购建议列表",Le(i,`HTTP ${n.status}`),"无法查看最新缺货采购建议","点击“重试”重新加载列表"),e.procurementSuggestions=[];return}const s=ae(i,gs),o=Wt(s.data,gs,"data");e.procurementSuggestions=dm(o.map(r=>cm(r,gs)))}catch(t){const n=t instanceof ye||t instanceof Error?t.message:String(t);e.procurementError=he("加载采购建议列表",n,"列表可能为空或字段错位","检查后端返回字段后重试"),e.procurementSuggestions=[]}finally{e.procurementLoading=!1}}async function fc(e,t){if(!t.length)return null;const n=hm(t),i=lm(e),s=i.get(n);if(s)return s;const o=(async()=>{var r;e.procurementApproveBusy=!0,e.procurementApproveResult=null;try{const a=(r=e.basePath)!=null&&r.trim()?`${e.basePath.replace(/\/$/,"")}${Ti}`:Ti,l=am("procurement-approve",n||"single"),c=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json","X-Idempotency-Key":l,"Idempotency-Key":l},body:JSON.stringify({items:t})}),d=await c.json().catch(()=>({}));if(!c.ok)return e.procurementApproveResult={message:he("采购批准",Le(d,`HTTP ${c.status}`),"这些缺货项仍待批准，采购员未收到通知","点击“重试”再次批准")},e.procurementApproveResult;const u=um(d);return e.procurementApproveResult=u,await qa(e),u}catch(a){const l=a instanceof ye||a instanceof Error?a.message:String(a);return e.procurementApproveResult={message:he("采购批准",l,"这些缺货项仍待批准，采购员未收到通知","点击“重试”再次批准")},e.procurementApproveResult}finally{e.procurementApproveBusy=!1,i.delete(n)}})();return i.set(n,o),o}async function Zi(e){var t;e.replenishmentLoading=!0,e.replenishmentError=null;try{const n=(t=e.basePath)!=null&&t.trim()?e.basePath.replace(/\/$/,""):"",i=n?`${n}${pe}`:pe,s=await fetch(i),o=await s.json().catch(()=>({}));if(!s.ok){e.replenishmentError=he("加载补货单列表",Le(o,`HTTP ${s.status}`),"无法查看补货单列表","点击“重试”重新加载列表"),e.replenishmentDrafts=[];return}const r=ae(o,pe),a=Wt(r.data,pe,"data");e.replenishmentDrafts=a.map(l=>{const c=ae(l,pe,"data[]");return{id:So(c.id,pe,"id"),draft_no:W(c.draft_no)??"",name:W(c.name)??"",source:W(c.source)??void 0,created_at:W(c.created_at),status:W(c.status)??"",confirmed_at:W(c.confirmed_at)}})}catch(n){const i=n instanceof ye||n instanceof Error?n.message:String(n);e.replenishmentError=he("加载补货单列表",i,"补货单列表可能为空或字段错位","检查后端返回字段后重试"),e.replenishmentDrafts=[]}finally{e.replenishmentLoading=!1}}async function fm(e,t){var n;e.replenishmentLoading=!0,e.replenishmentError=null;try{const i=(n=e.basePath)!=null&&n.trim()?e.basePath.replace(/\/$/,""):"",s=i?`${i}${pe}/${t}`:`${pe}/${t}`,o=await fetch(s),r=await o.json().catch(()=>({}));if(!o.ok){e.replenishmentError=he("加载补货单详情",Le(r,`HTTP ${o.status}`),"无法查看补货单详情","稍后重试"),e.replenishmentDetail=null,e.replenishmentDetailId=null;return}const a=ae(r,pe,"detail"),l=ae(a.data,pe,"data"),d=Wt(l.lines,pe,"data.lines").map(u=>{const h=ae(u,pe,"data.lines[]");return{id:gt(h.id),row_index:gt(h.row_index),code:W(h.code),product_name:W(h.product_name),specification:W(h.specification),quantity:gt(h.quantity)??0,current_qty:gt(h.current_qty),memo:W(h.memo)}});e.replenishmentDetail={id:So(l.id,pe,"id"),draft_no:W(l.draft_no)??"",name:W(l.name)??"",source:W(l.source)??void 0,created_at:W(l.created_at),status:W(l.status)??"",confirmed_at:W(l.confirmed_at),lines:d},e.replenishmentDetailId=e.replenishmentDetail.id}catch(i){const s=i instanceof ye||i instanceof Error?i.message:String(i);e.replenishmentError=he("加载补货单详情",s,"无法查看补货单详情","稍后重试"),e.replenishmentDetail=null,e.replenishmentDetailId=null}finally{e.replenishmentLoading=!1}}async function pm(e,t){var u;const n=t.filter(h=>{const g=typeof h.product_or_code=="string"?h.product_or_code.trim():"",v=Number(h.quantity);return g.length>0&&v>0});if(n.length===0)return null;const i={lines:n.map(h=>({product_or_code:typeof h.product_or_code=="string"?h.product_or_code.trim():"",quantity:Number(h.quantity)}))},s=(u=e.basePath)!=null&&u.trim()?e.basePath.replace(/\/$/,""):"",o=s?`${s}${pe}`:pe,r=await fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}),a=await r.json().catch(()=>({}));if(!r.ok)return e.replenishmentError=he("生成补货单",Le(a,`HTTP ${r.status}`),"补货单未创建","请检查输入后重试"),null;const l=ae(a,pe),c=l.data!=null?ae(l.data,pe,"data"):{},d=So(c.id,pe,"data.id");return await Zi(e),{id:d}}async function gm(e,t){var n;e.replenishmentConfirmBusy=!0,e.replenishmentConfirmResult=null;try{const i=(n=e.basePath)!=null&&n.trim()?e.basePath.replace(/\/$/,""):"",s=i?`${i}${pe}/${t}/confirm`:`${pe}/${t}/confirm`,o=await fetch(s,{method:"PATCH"}),r=await o.json().catch(()=>({}));if(!o.ok){e.replenishmentConfirmResult={message:he("确认补货单",Le(r,`HTTP ${o.status}`),"补货未执行","稍后重试")};return}const a=ae(r,pe,"confirm"),l=ae(a.data,pe,"data"),c=_e(l.executed),d=W(l.message);e.replenishmentConfirmResult={executed:c??void 0,message:d||`已执行 ${c??0} 条补货操作。`},await Zi(e)}catch(i){const s=i instanceof ye||i instanceof Error?i.message:String(i);e.replenishmentConfirmResult={message:he("确认补货单",s,"补货未执行","稍后重试")}}finally{e.replenishmentConfirmBusy=!1}}async function mm(e,t){var o;const n=(o=e.basePath)!=null&&o.trim()?e.basePath.replace(/\/$/,""):"",i=n?`${n}${pe}/${t}`:`${pe}/${t}`,s=await fetch(i,{method:"DELETE"});if(!s.ok){const r=await s.json().catch(()=>({}));return e.replenishmentError=he("删除补货单",Le(r,`HTTP ${s.status}`),"补货单未删除","请重试"),!1}return e.replenishmentDetailId===t&&(e.replenishmentDetail=null,e.replenishmentDetailId=null),await Zi(e),!0}function ja(e){return(e??"").trim().toLowerCase()||"viewer"}function vm(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").map(t=>t.trim()).filter(Boolean):[]}const hh="openclaw.device.auth.v1";function Ka(){try{const e=window.localStorage.getItem(hh);if(!e)return null;const t=JSON.parse(e);return!t||t.version!==1||!t.deviceId||typeof t.deviceId!="string"||!t.tokens||typeof t.tokens!="object"?null:t}catch{return null}}function fh(e){try{window.localStorage.setItem(hh,JSON.stringify(e))}catch{}}function ym(e){const t=Ka();if(!t||t.deviceId!==e.deviceId)return null;const n=ja(e.role),i=t.tokens[n];return!i||typeof i.token!="string"?null:i}function ph(e){const t=ja(e.role),n={version:1,deviceId:e.deviceId,tokens:{}},i=Ka();i&&i.deviceId===e.deviceId&&(n.tokens={...i.tokens});const s={token:e.token,role:t,scopes:vm(e.scopes),updatedAtMs:Date.now()};return n.tokens[t]=s,fh(n),s}function gh(e){const t=Ka();if(!t||t.deviceId!==e.deviceId)return;const n=ja(e.role);if(!t.tokens[n])return;const i={...t,tokens:{...t.tokens}};delete i.tokens[n],fh(i)}/*! noble-ed25519 - MIT License (c) 2019 Paul Miller (paulmillr.com) */const mh={p:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffedn,n:0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn,h:8n,a:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffecn,d:0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3n,Gx:0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an,Gy:0x6666666666666666666666666666666666666666666666666666666666666658n},{p:Ee,n:Us,Gx:pc,Gy:gc,a:lr,d:cr,h:bm}=mh,wn=32,Wa=64,xm=(...e)=>{"captureStackTrace"in Error&&typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(...e)},ke=(e="")=>{const t=new Error(e);throw xm(t,ke),t},wm=e=>typeof e=="bigint",_m=e=>typeof e=="string",km=e=>e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array",Vt=(e,t,n="")=>{const i=km(e),s=e==null?void 0:e.length,o=t!==void 0;if(!i||o&&s!==t){const r=n&&`"${n}" `,a=o?` of length ${t}`:"",l=i?`length=${s}`:`type=${typeof e}`;ke(r+"expected Uint8Array"+a+", got "+l)}return e},Ao=e=>new Uint8Array(e),vh=e=>Uint8Array.from(e),yh=(e,t)=>e.toString(16).padStart(t,"0"),bh=e=>Array.from(Vt(e)).map(t=>yh(t,2)).join(""),kt={_0:48,_9:57,A:65,F:70,a:97,f:102},mc=e=>{if(e>=kt._0&&e<=kt._9)return e-kt._0;if(e>=kt.A&&e<=kt.F)return e-(kt.A-10);if(e>=kt.a&&e<=kt.f)return e-(kt.a-10)},xh=e=>{const t="hex invalid";if(!_m(e))return ke(t);const n=e.length,i=n/2;if(n%2)return ke(t);const s=Ao(i);for(let o=0,r=0;o<i;o++,r+=2){const a=mc(e.charCodeAt(r)),l=mc(e.charCodeAt(r+1));if(a===void 0||l===void 0)return ke(t);s[o]=a*16+l}return s},wh=()=>globalThis==null?void 0:globalThis.crypto,$m=()=>{var e;return((e=wh())==null?void 0:e.subtle)??ke("crypto.subtle must be defined, consider polyfill")},ji=(...e)=>{const t=Ao(e.reduce((i,s)=>i+Vt(s).length,0));let n=0;return e.forEach(i=>{t.set(i,n),n+=i.length}),t},Sm=(e=wn)=>wh().getRandomValues(Ao(e)),eo=BigInt,sn=(e,t,n,i="bad number: out of range")=>wm(e)&&t<=e&&e<n?e:ke(i),U=(e,t=Ee)=>{const n=e%t;return n>=0n?n:t+n},_h=e=>U(e,Us),Am=(e,t)=>{(e===0n||t<=0n)&&ke("no inverse n="+e+" mod="+t);let n=U(e,t),i=t,s=0n,o=1n;for(;n!==0n;){const r=i/n,a=i%n,l=s-o*r;i=n,n=a,s=o,o=l}return i===1n?U(s,t):ke("no inverse")},Tm=e=>{const t=Ah[e];return typeof t!="function"&&ke("hashes."+e+" not set"),t},dr=e=>e instanceof _n?e:ke("Point expected"),Wr=2n**256n,ft=class ft{constructor(t,n,i,s){H(this,"X");H(this,"Y");H(this,"Z");H(this,"T");const o=Wr;this.X=sn(t,0n,o),this.Y=sn(n,0n,o),this.Z=sn(i,1n,o),this.T=sn(s,0n,o),Object.freeze(this)}static CURVE(){return mh}static fromAffine(t){return new ft(t.x,t.y,1n,U(t.x*t.y))}static fromBytes(t,n=!1){const i=cr,s=vh(Vt(t,wn)),o=t[31];s[31]=o&-129;const r=$h(s);sn(r,0n,n?Wr:Ee);const l=U(r*r),c=U(l-1n),d=U(i*l+1n);let{isValid:u,value:h}=Em(c,d);u||ke("bad point: y not sqrt");const g=(h&1n)===1n,v=(o&128)!==0;return!n&&h===0n&&v&&ke("bad point: x==0, isLastByteOdd"),v!==g&&(h=U(-h)),new ft(h,r,1n,U(h*r))}static fromHex(t,n){return ft.fromBytes(xh(t),n)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}assertValidity(){const t=lr,n=cr,i=this;if(i.is0())return ke("bad point: ZERO");const{X:s,Y:o,Z:r,T:a}=i,l=U(s*s),c=U(o*o),d=U(r*r),u=U(d*d),h=U(l*t),g=U(d*U(h+c)),v=U(u+U(n*U(l*c)));if(g!==v)return ke("bad point: equation left != right (1)");const b=U(s*o),y=U(r*a);return b!==y?ke("bad point: equation left != right (2)"):this}equals(t){const{X:n,Y:i,Z:s}=this,{X:o,Y:r,Z:a}=dr(t),l=U(n*a),c=U(o*s),d=U(i*a),u=U(r*s);return l===c&&d===u}is0(){return this.equals(zn)}negate(){return new ft(U(-this.X),this.Y,this.Z,U(-this.T))}double(){const{X:t,Y:n,Z:i}=this,s=lr,o=U(t*t),r=U(n*n),a=U(2n*U(i*i)),l=U(s*o),c=t+n,d=U(U(c*c)-o-r),u=l+r,h=u-a,g=l-r,v=U(d*h),b=U(u*g),y=U(d*g),S=U(h*u);return new ft(v,b,S,y)}add(t){const{X:n,Y:i,Z:s,T:o}=this,{X:r,Y:a,Z:l,T:c}=dr(t),d=lr,u=cr,h=U(n*r),g=U(i*a),v=U(o*u*c),b=U(s*l),y=U((n+i)*(r+a)-h-g),S=U(b-v),E=U(b+v),L=U(g-d*h),T=U(y*S),C=U(E*L),M=U(y*L),m=U(S*E);return new ft(T,C,m,M)}subtract(t){return this.add(dr(t).negate())}multiply(t,n=!0){if(!n&&(t===0n||this.is0()))return zn;if(sn(t,1n,Us),t===1n)return this;if(this.equals(kn))return zm(t).p;let i=zn,s=kn;for(let o=this;t>0n;o=o.double(),t>>=1n)t&1n?i=i.add(o):n&&(s=s.add(o));return i}multiplyUnsafe(t){return this.multiply(t,!1)}toAffine(){const{X:t,Y:n,Z:i}=this;if(this.equals(zn))return{x:0n,y:1n};const s=Am(i,Ee);U(i*s)!==1n&&ke("invalid inverse");const o=U(t*s),r=U(n*s);return{x:o,y:r}}toBytes(){const{x:t,y:n}=this.assertValidity().toAffine(),i=kh(n);return i[31]|=t&1n?128:0,i}toHex(){return bh(this.toBytes())}clearCofactor(){return this.multiply(eo(bm),!1)}isSmallOrder(){return this.clearCofactor().is0()}isTorsionFree(){let t=this.multiply(Us/2n,!1).double();return Us%2n&&(t=t.add(this)),t.is0()}};H(ft,"BASE"),H(ft,"ZERO");let _n=ft;const kn=new _n(pc,gc,1n,U(pc*gc)),zn=new _n(0n,1n,1n,0n);_n.BASE=kn;_n.ZERO=zn;const kh=e=>xh(yh(sn(e,0n,Wr),Wa)).reverse(),$h=e=>eo("0x"+bh(vh(Vt(e)).reverse())),at=(e,t)=>{let n=e;for(;t-- >0n;)n*=n,n%=Ee;return n},Cm=e=>{const n=e*e%Ee*e%Ee,i=at(n,2n)*n%Ee,s=at(i,1n)*e%Ee,o=at(s,5n)*s%Ee,r=at(o,10n)*o%Ee,a=at(r,20n)*r%Ee,l=at(a,40n)*a%Ee,c=at(l,80n)*l%Ee,d=at(c,80n)*l%Ee,u=at(d,10n)*o%Ee;return{pow_p_5_8:at(u,2n)*e%Ee,b2:n}},vc=0x2b8324804fc1df0b2b4d00993dfbd7a72f431806ad2fe478c4ee1b274a0ea0b0n,Em=(e,t)=>{const n=U(t*t*t),i=U(n*n*t),s=Cm(e*i).pow_p_5_8;let o=U(e*n*s);const r=U(t*o*o),a=o,l=U(o*vc),c=r===e,d=r===U(-e),u=r===U(-e*vc);return c&&(o=a),(d||u)&&(o=l),(U(o)&1n)===1n&&(o=U(-o)),{isValid:c||d,value:o}},Vr=e=>_h($h(e)),Va=(...e)=>Ah.sha512Async(ji(...e)),Rm=(...e)=>Tm("sha512")(ji(...e)),Sh=e=>{const t=e.slice(0,wn);t[0]&=248,t[31]&=127,t[31]|=64;const n=e.slice(wn,Wa),i=Vr(t),s=kn.multiply(i),o=s.toBytes();return{head:t,prefix:n,scalar:i,point:s,pointBytes:o}},Ga=e=>Va(Vt(e,wn)).then(Sh),Lm=e=>Sh(Rm(Vt(e,wn))),Pm=e=>Ga(e).then(t=>t.pointBytes),Mm=e=>Va(e.hashable).then(e.finish),Dm=(e,t,n)=>{const{pointBytes:i,scalar:s}=e,o=Vr(t),r=kn.multiply(o).toBytes();return{hashable:ji(r,i,n),finish:c=>{const d=_h(o+Vr(c)*s);return Vt(ji(r,kh(d)),Wa)}}},Im=async(e,t)=>{const n=Vt(e),i=await Ga(t),s=await Va(i.prefix,n);return Mm(Dm(i,s,n))},Ah={sha512Async:async e=>{const t=$m(),n=ji(e);return Ao(await t.digest("SHA-512",n.buffer))},sha512:void 0},Om=(e=Sm(wn))=>e,Fm={getExtendedPublicKeyAsync:Ga,getExtendedPublicKey:Lm,randomSecretKey:Om},to=8,Nm=256,Th=Math.ceil(Nm/to)+1,Gr=2**(to-1),Bm=()=>{const e=[];let t=kn,n=t;for(let i=0;i<Th;i++){n=t,e.push(n);for(let s=1;s<Gr;s++)n=n.add(t),e.push(n);t=n.double()}return e};let yc;const bc=(e,t)=>{const n=t.negate();return e?n:t},zm=e=>{const t=yc||(yc=Bm());let n=zn,i=kn;const s=2**to,o=s,r=eo(s-1),a=eo(to);for(let l=0;l<Th;l++){let c=Number(e&r);e>>=a,c>Gr&&(c-=o,e+=1n);const d=l*Gr,u=d,h=d+Math.abs(c)-1,g=l%2!==0,v=c<0;c===0?i=i.add(bc(g,t[u])):n=n.add(bc(v,t[h]))}return e!==0n&&ke("invalid wnaf"),{p:n,f:i}},ur="openclaw-device-identity-v1";function Qr(e){let t="";for(const n of e)t+=String.fromCharCode(n);return btoa(t).replaceAll("+","-").replaceAll("/","_").replace(/=+$/g,"")}function Ch(e){const t=e.replaceAll("-","+").replaceAll("_","/"),n=t+"=".repeat((4-t.length%4)%4),i=atob(n),s=new Uint8Array(i.length);for(let o=0;o<i.length;o+=1)s[o]=i.charCodeAt(o);return s}function Hm(e){return Array.from(e).map(t=>t.toString(16).padStart(2,"0")).join("")}async function Eh(e){const t=await crypto.subtle.digest("SHA-256",e.slice().buffer);return Hm(new Uint8Array(t))}async function Um(){const e=Fm.randomSecretKey(),t=await Pm(e);return{deviceId:await Eh(t),publicKey:Qr(t),privateKey:Qr(e)}}async function Qa(){try{const n=localStorage.getItem(ur);if(n){const i=JSON.parse(n);if((i==null?void 0:i.version)===1&&typeof i.deviceId=="string"&&typeof i.publicKey=="string"&&typeof i.privateKey=="string"){const s=await Eh(Ch(i.publicKey));if(s!==i.deviceId){const o={...i,deviceId:s};return localStorage.setItem(ur,JSON.stringify(o)),{deviceId:s,publicKey:i.publicKey,privateKey:i.privateKey}}return{deviceId:i.deviceId,publicKey:i.publicKey,privateKey:i.privateKey}}}}catch{}const e=await Um(),t={version:1,deviceId:e.deviceId,publicKey:e.publicKey,privateKey:e.privateKey,createdAtMs:Date.now()};return localStorage.setItem(ur,JSON.stringify(t)),e}async function qm(e,t){const n=Ch(e),i=new TextEncoder().encode(t),s=await Im(i,n);return Qr(s)}async function Gt(e,t){if(!(!e.client||!e.connected)&&!e.devicesLoading){e.devicesLoading=!0,t!=null&&t.quiet||(e.devicesError=null);try{const n=await e.client.request("device.pair.list",{});e.devicesList={pending:Array.isArray(n==null?void 0:n.pending)?n.pending:[],paired:Array.isArray(n==null?void 0:n.paired)?n.paired:[]}}catch(n){t!=null&&t.quiet||(e.devicesError=String(n))}finally{e.devicesLoading=!1}}}async function jm(e,t){if(!(!e.client||!e.connected))try{await e.client.request("device.pair.approve",{requestId:t}),await Gt(e)}catch(n){e.devicesError=String(n)}}async function Km(e,t){if(!(!e.client||!e.connected||!window.confirm("Reject this device pairing request?")))try{await e.client.request("device.pair.reject",{requestId:t}),await Gt(e)}catch(i){e.devicesError=String(i)}}async function Wm(e,t){if(!(!e.client||!e.connected))try{const n=await e.client.request("device.token.rotate",t);if(n!=null&&n.token){const i=await Qa(),s=n.role??t.role;(n.deviceId===i.deviceId||t.deviceId===i.deviceId)&&ph({deviceId:i.deviceId,role:s,token:n.token,scopes:n.scopes??t.scopes??[]}),window.prompt("New device token (copy and store securely):",n.token)}await Gt(e)}catch(n){e.devicesError=String(n)}}async function Vm(e,t){if(!(!e.client||!e.connected||!window.confirm(`Revoke token for ${t.deviceId} (${t.role})?`)))try{await e.client.request("device.token.revoke",t);const i=await Qa();t.deviceId===i.deviceId&&gh({deviceId:i.deviceId,role:t.role}),await Gt(e)}catch(i){e.devicesError=String(i)}}function Gm(e){if(!e||e.kind==="gateway")return{method:"exec.approvals.get",params:{}};const t=e.nodeId.trim();return t?{method:"exec.approvals.node.get",params:{nodeId:t}}:null}function Qm(e,t){if(!e||e.kind==="gateway")return{method:"exec.approvals.set",params:t};const n=e.nodeId.trim();return n?{method:"exec.approvals.node.set",params:{...t,nodeId:n}}:null}async function Ya(e,t){if(!(!e.client||!e.connected)&&!e.execApprovalsLoading){e.execApprovalsLoading=!0,e.lastError=null;try{const n=Gm(t);if(!n){e.lastError="Select a node before loading exec approvals.";return}const i=await e.client.request(n.method,n.params);Ym(e,i)}catch(n){e.lastError=String(n)}finally{e.execApprovalsLoading=!1}}}function Ym(e,t){e.execApprovalsSnapshot=t,e.execApprovalsDirty||(e.execApprovalsForm=xn(t.file??{}))}async function Xm(e,t){var n,i;if(!(!e.client||!e.connected)){e.execApprovalsSaving=!0,e.lastError=null;try{const s=(n=e.execApprovalsSnapshot)==null?void 0:n.hash;if(!s){e.lastError="Exec approvals hash missing; reload and retry.";return}const o=e.execApprovalsForm??((i=e.execApprovalsSnapshot)==null?void 0:i.file)??{},r=Qm(t,{file:o,baseHash:s});if(!r){e.lastError="Select a node before saving exec approvals.";return}await e.client.request(r.method,r.params),e.execApprovalsDirty=!1,await Ya(e,t)}catch(s){e.lastError=String(s)}finally{e.execApprovalsSaving=!1}}}function Jm(e,t,n){var s;const i=xn(e.execApprovalsForm??((s=e.execApprovalsSnapshot)==null?void 0:s.file)??{});Yu(i,t,n),e.execApprovalsForm=i,e.execApprovalsDirty=!0}function Zm(e,t){var i;const n=xn(e.execApprovalsForm??((i=e.execApprovalsSnapshot)==null?void 0:i.file)??{});Xu(n,t),e.execApprovalsForm=n,e.execApprovalsDirty=!0}function He(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams;for(const[r,a]of Object.entries(n))o.set(r,String(a));return`${s}?${o.toString()}`}async function To(e,t){e.oosLoading=!0,e.oosError=null;try{const[s,o,r,a]=await Promise.all([fetch(He(e.basePath,"/api/oos/stats")),fetch(He(e.basePath,"/api/oos/list",{limit:100})),fetch(He(e.basePath,"/api/oos/by-file",{limit:50})),fetch(He(e.basePath,"/api/oos/by-time",{days:30}))]),l=await s.json().catch(()=>({})),c=await o.json().catch(()=>({})),d=await r.json().catch(()=>({})),u=await a.json().catch(()=>({}));l.success&&l.data?(e.oosStats=l.data,e.oosDb=l.db??null):(e.oosStats=null,s.ok||(e.oosError=l.detail??`stats: ${s.status}`)),c.success&&Array.isArray(c.data)?e.oosList=c.data:(e.oosList=[],!e.oosError&&!o.ok&&(e.oosError=c.detail??`list: ${o.status}`)),d.success&&Array.isArray(d.data)?e.oosByFile=d.data:e.oosByFile=[],u.success&&Array.isArray(u.data)?e.oosByTime=u.data:e.oosByTime=[]}catch(s){e.oosError=s instanceof Error?s.message:String(s),e.oosStats=null,e.oosList=[],e.oosByFile=[],e.oosByTime=[]}finally{e.oosLoading=!1}}async function ev(e,t){if(!(t!=null&&t.trim()))return!1;try{const n=await fetch(He(e.basePath,"/api/oos/delete"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_key:t.trim()})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(await To(e),!0):(e.oosError=i.detail??`删除失败: ${n.status}`,!1)}catch(n){return e.oosError=n instanceof Error?n.message:String(n),!1}}async function tv(e,t){const n=(t.product_name||"").trim();if(!n)return!1;try{const i=await fetch(He(e.basePath,"/api/oos/add"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_name:n,specification:(t.specification??"").trim(),quantity:t.quantity??0,unit:(t.unit??"").trim()})}),s=await i.json().catch(()=>({}));return i.ok&&s.success?(await To(e),!0):(e.oosError=s.detail??`添加失败: ${i.status}`,!1)}catch(i){return e.oosError=i instanceof Error?i.message:String(i),!1}}async function nv(e){try{const t=await fetch(He(e.basePath,"/api/oos/stats")),n=await t.json().catch(()=>({}));if(t.ok&&n.success&&n.data)e.overviewOosStats=n.data,e.overviewOosError=null;else{e.overviewOosStats=null;const i=typeof n.detail=="string"?n.detail:n.message??n.error??`oos stats: ${t.status}`;e.overviewOosError=i}}catch(t){e.overviewOosStats=null,e.overviewOosError=t instanceof Error?t.message:String(t)}}async function Co(e,t){e.shortageLoading=!0,e.shortageError=null;try{const[s,o,r,a]=await Promise.all([fetch(He(e.basePath,"/api/shortage/stats"),{method:"GET"}),fetch(He(e.basePath,"/api/shortage/list",{limit:100}),{method:"GET"}),fetch(He(e.basePath,"/api/shortage/by-file"),{method:"GET"}),fetch(He(e.basePath,"/api/shortage/by-time",{days:30}),{method:"GET"})]),l=await s.json().catch(()=>({})),c=await o.json().catch(()=>({})),d=await r.json().catch(()=>({})),u=await a.json().catch(()=>({}));if(l.success&&l.data)e.shortageStats=l.data,e.shortageDb=l.db??null;else if(e.shortageStats=null,!e.shortageError&&!s.ok){const h=typeof l.detail=="string"?l.detail:l.message??l.error;e.shortageError=h??`stats: ${s.status} ${s.statusText}`}if(c.success&&Array.isArray(c.data))e.shortageList=c.data;else if(e.shortageList=[],!e.shortageError&&!o.ok){const h=typeof c.detail=="string"?c.detail:c.message??c.error;e.shortageError=h??`list: ${o.status} ${o.statusText}`}if(d.success&&Array.isArray(d.data))e.shortageByFile=d.data;else if(e.shortageByFile=[],!e.shortageError&&!r.ok){const h=typeof d.detail=="string"?d.detail:d.message??d.error;e.shortageError=h??`by-file: ${r.status} ${r.statusText}`}if(u.success&&Array.isArray(u.data))e.shortageByTime=u.data;else if(e.shortageByTime=[],!e.shortageError&&!a.ok){const h=typeof u.detail=="string"?u.detail:u.message??u.error;e.shortageError=h??`by-time: ${a.status} ${a.statusText}`}}catch(s){e.shortageError=s instanceof Error?s.message:String(s),e.shortageStats=null,e.shortageList=[],e.shortageByFile=[],e.shortageByTime=[]}finally{e.shortageLoading=!1}}async function iv(e,t){if(!(t!=null&&t.trim()))return!1;try{const n=await fetch(He(e.basePath,"/api/shortage/delete"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_key:t.trim()})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(await Co(e),!0):(e.shortageError=i.detail??`删除失败: ${n.status}`,!1)}catch(n){return e.shortageError=n instanceof Error?n.message:String(n),!1}}async function sv(e,t){const n=(t.product_name||"").trim();if(!n)return!1;try{const i=await fetch(He(e.basePath,"/api/shortage/add"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_name:n,specification:(t.specification??"").trim(),quantity:t.quantity??0,available_qty:t.available_qty??0})}),s=await i.json().catch(()=>({}));return i.ok&&s.success?(await Co(e),!0):(e.shortageError=s.detail??`添加失败: ${i.status}`,!1)}catch(i){return e.shortageError=i instanceof Error?i.message:String(i),!1}}async function ov(e){try{const t=await fetch(He(e.basePath,"/api/shortage/stats"),{method:"GET"}),n=await t.json().catch(()=>({}));if(t.ok&&n.success&&n.data)e.overviewShortageStats=n.data,e.overviewShortageError=null;else{e.overviewShortageStats=null;const i=typeof n.detail=="string"?n.detail:n.message??n.error??`shortage stats: ${t.status}`;e.overviewShortageError=i}}catch(t){e.overviewShortageStats=null,e.overviewShortageError=t instanceof Error?t.message:String(t)}}async function rv(e){if(!(!e.client||!e.connected)&&!e.presenceLoading){e.presenceLoading=!0,e.presenceError=null,e.presenceStatus=null;try{const t=await e.client.request("system-presence",{});Array.isArray(t)?(e.presenceEntries=t,e.presenceStatus=t.length===0?"No instances yet.":null):(e.presenceEntries=[],e.presenceStatus="No presence payload.")}catch(t){e.presenceError=String(t)}finally{e.presenceLoading=!1}}}async function Xa(e,t){if(!(!e.client||!e.connected)&&!e.sessionsLoading){e.sessionsLoading=!0,e.sessionsError=null;try{const n=(t==null?void 0:t.includeGlobal)??e.sessionsIncludeGlobal,i=(t==null?void 0:t.includeUnknown)??e.sessionsIncludeUnknown,s=(t==null?void 0:t.activeMinutes)??cc(e.sessionsFilterActive,0),o=(t==null?void 0:t.limit)??cc(e.sessionsFilterLimit,0),r={includeGlobal:n,includeUnknown:i};s>0&&(r.activeMinutes=s),o>0&&(r.limit=o);const a=await e.client.request("sessions.list",r);a&&(e.sessionsResult=a)}catch(n){e.sessionsError=String(n)}finally{e.sessionsLoading=!1}}}function Kn(e,t,n){if(!t.trim())return;const i={...e.skillMessages};n?i[t]=n:delete i[t],e.skillMessages=i}function Eo(e){return e instanceof Error?e.message:String(e)}async function es(e,t){if(t!=null&&t.clearMessages&&Object.keys(e.skillMessages).length>0&&(e.skillMessages={}),!(!e.client||!e.connected)&&!e.skillsLoading){e.skillsLoading=!0,e.skillsError=null;try{const n=await e.client.request("skills.status",{});n&&(e.skillsReport=n)}catch(n){e.skillsError=Eo(n)}finally{e.skillsLoading=!1}}}function av(e,t,n){e.skillEdits={...e.skillEdits,[t]:n}}async function lv(e,t,n){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{await e.client.request("skills.update",{skillKey:t,enabled:n}),await es(e),Kn(e,t,{kind:"success",message:n?"Skill enabled":"Skill disabled"})}catch(i){const s=Eo(i);e.skillsError=s,Kn(e,t,{kind:"error",message:s})}finally{e.skillsBusyKey=null}}}async function cv(e,t){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const n=e.skillEdits[t]??"";await e.client.request("skills.update",{skillKey:t,apiKey:n}),await es(e),Kn(e,t,{kind:"success",message:"API key saved"})}catch(n){const i=Eo(n);e.skillsError=i,Kn(e,t,{kind:"error",message:i})}finally{e.skillsBusyKey=null}}}async function dv(e,t,n,i){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const s=await e.client.request("skills.install",{name:n,installId:i,timeoutMs:12e4});await es(e),Kn(e,t,{kind:"success",message:(s==null?void 0:s.message)??"Installed"})}catch(s){const o=Eo(s);e.skillsError=o,Kn(e,t,{kind:"error",message:o})}finally{e.skillsBusyKey=null}}}function it(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams;for(const[r,a]of Object.entries(n))o.set(r,String(a));return`${s}?${o.toString()}`}function Ro(e){return{"X-Admin-Token":e,"Content-Type":"application/json"}}function ne(e,t){e.adminData={...e.adminData,...t}}function uv(){let e=null;return typeof sessionStorage<"u"&&(e=sessionStorage.getItem("admin_token")),{token:e,loginError:null,loginLoading:!1,activeSubTab:"price",priceItems:[],priceTotal:0,pricePage:1,pricePageSize:100,priceQuery:"",priceLoading:!1,priceError:null,priceUploading:!1,mappingItems:[],mappingTotal:0,mappingPage:1,mappingPageSize:100,mappingQuery:"",mappingLoading:!1,mappingError:null,mappingUploading:!1}}async function hv(e,t){ne(e,{loginLoading:!0,loginError:null});try{const n=await fetch(it(e.basePath,"/api/admin/login"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:t})}),i=await n.json().catch(()=>({}));if(n.status===503){ne(e,{loginError:"管理功能未启用（服务端未配置 ADMIN_PASSWORD）",loginLoading:!1});return}if(!n.ok){const s=i.detail,o=typeof s=="string"?s:Array.isArray(s)&&s[0]&&typeof s[0].msg=="string"?s[0].msg:"登录失败";ne(e,{loginError:o,loginLoading:!1});return}i.token?(sessionStorage.setItem("admin_token",i.token),ne(e,{token:i.token,loginLoading:!1,loginError:null})):ne(e,{loginError:"未返回 token",loginLoading:!1})}catch(n){ne(e,{loginError:String(n),loginLoading:!1})}}function Rt(e){sessionStorage.removeItem("admin_token"),ne(e,{token:null})}async function pn(e){const t=e.adminData.token;if(t){ne(e,{priceLoading:!0,priceError:null});try{const n={q:e.adminData.priceQuery,page:e.adminData.pricePage,page_size:e.adminData.pricePageSize},i=await fetch(it(e.basePath,"/api/admin/price-library",n),{headers:Ro(t)});if(i.status===401){Rt(e);return}if(i.status===503){ne(e,{priceLoading:!1,priceError:"管理功能未启用（服务端未配置 ADMIN_PASSWORD）"});return}if(!i.ok){const o=await i.text();ne(e,{priceLoading:!1,priceError:o||`HTTP ${i.status}`});return}const s=await i.json();ne(e,{priceItems:s.items,priceTotal:s.total,priceLoading:!1})}catch(n){ne(e,{priceLoading:!1,priceError:String(n)})}}}function fv(e,t,n){const i=e.adminData.priceItems.slice();t<0||t>=i.length||(i[t]={...i[t],...n},ne(e,{priceItems:i}))}function pv(e){ne(e,{priceItems:[...e.adminData.priceItems,{material:"",description:"",price_a:null,price_b:null,price_c:null,price_d:null}]})}async function gv(e,t){const n=e.adminData.token;if(!n)return;const i=t.id==null,s=i?it(e.basePath,"/api/admin/price-library"):it(e.basePath,`/api/admin/price-library/${t.id}`),o=await fetch(s,{method:i?"POST":"PUT",headers:Ro(n),body:JSON.stringify({material:t.material,description:t.description,price_a:t.price_a,price_b:t.price_b,price_c:t.price_c,price_d:t.price_d})});if(o.status===401){Rt(e);return}if(!o.ok){ne(e,{priceError:await o.text()});return}await pn(e)}async function mv(e,t){const n=e.adminData.token;if(!n)return;const i=await fetch(it(e.basePath,`/api/admin/price-library/${t}`),{method:"DELETE",headers:{"X-Admin-Token":n}});if(i.status===401){Rt(e);return}if(!i.ok){ne(e,{priceError:await i.text()||`HTTP ${i.status}`});return}await pn(e)}async function vv(e,t){const n=e.adminData.token;if(n&&confirm("将用上传文件全表替换万鼎价格库，确认？")){ne(e,{priceUploading:!0,priceError:null});try{const i=new FormData;i.append("file",t);const s=await fetch(it(e.basePath,"/api/admin/price-library/upload"),{method:"POST",headers:{"X-Admin-Token":n},body:i});if(s.status===401){Rt(e);return}if(!s.ok){ne(e,{priceError:await s.text(),priceUploading:!1});return}await pn(e),ne(e,{priceUploading:!1})}catch(i){ne(e,{priceError:String(i),priceUploading:!1})}}}async function gn(e){const t=e.adminData.token;if(t){ne(e,{mappingLoading:!0,mappingError:null});try{const n={q:e.adminData.mappingQuery,page:e.adminData.mappingPage,page_size:e.adminData.mappingPageSize},i=await fetch(it(e.basePath,"/api/admin/product-mapping",n),{headers:Ro(t)});if(i.status===401){Rt(e);return}if(i.status===503){ne(e,{mappingLoading:!1,mappingError:"管理功能未启用（服务端未配置 ADMIN_PASSWORD）"});return}if(!i.ok){ne(e,{mappingLoading:!1,mappingError:await i.text()});return}const s=await i.json();ne(e,{mappingItems:s.items,mappingTotal:s.total,mappingLoading:!1})}catch(n){ne(e,{mappingLoading:!1,mappingError:String(n)})}}}function yv(e,t,n){const i=e.adminData.mappingItems.slice();t<0||t>=i.length||(i[t]={...i[t],...n},ne(e,{mappingItems:i}))}function bv(e){ne(e,{mappingItems:[...e.adminData.mappingItems,{inquiry_name:"",spec:"",product_code:"",quotation_name:""}]})}async function xv(e,t){const n=e.adminData.token;if(!n)return;const i=t.id==null,s=i?it(e.basePath,"/api/admin/product-mapping"):it(e.basePath,`/api/admin/product-mapping/${t.id}`),o=await fetch(s,{method:i?"POST":"PUT",headers:Ro(n),body:JSON.stringify({inquiry_name:t.inquiry_name,spec:t.spec,product_code:t.product_code,quotation_name:t.quotation_name})});if(o.status===401){Rt(e);return}if(!o.ok){ne(e,{mappingError:await o.text()});return}await gn(e)}async function wv(e,t){const n=e.adminData.token;if(!n)return;const i=await fetch(it(e.basePath,`/api/admin/product-mapping/${t}`),{method:"DELETE",headers:{"X-Admin-Token":n}});if(i.status===401){Rt(e);return}if(!i.ok){ne(e,{mappingError:await i.text()||`HTTP ${i.status}`});return}await gn(e)}async function _v(e,t){const n=e.adminData.token;if(n&&confirm("将用上传文件全表替换产品映射表，确认？")){ne(e,{mappingUploading:!0,mappingError:null});try{const i=new FormData;i.append("file",t);const s=await fetch(it(e.basePath,"/api/admin/product-mapping/upload"),{method:"POST",headers:{"X-Admin-Token":n},body:i});if(s.status===401){Rt(e);return}if(!s.ok){ne(e,{mappingError:await s.text(),mappingUploading:!1});return}await gn(e),ne(e,{mappingUploading:!1})}catch(i){ne(e,{mappingError:String(i),mappingUploading:!1})}}}function Wn(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}function Vn(e){return{"Content-Type":"application/json","x-reports-token":e}}async function Gn(e){const t=await e.json().catch(()=>({}));if(!e.ok||!t.success){const n=t.detail;throw Array.isArray(n)?new Error(n.map(i=>JSON.stringify(i)).join("; ")):typeof n=="object"&&n!==null?new Error(JSON.stringify(n)):new Error(typeof n=="string"&&n||`HTTP ${e.status}`)}return t.data}async function mn(e){e.reportsLoading=!0,e.reportsError=null;try{const[t,n]=await Promise.all([fetch(Wn(e.basePath,"/api/reports/tasks"),{headers:Vn(e.reportsAdminToken)}),fetch(Wn(e.basePath,"/api/reports/records?limit=20"),{headers:Vn(e.reportsAdminToken)})]);e.reportsTasks=await Gn(t),e.reportsRecords=await Gn(n)}catch(t){e.reportsError=t instanceof Error?t.message:String(t)}finally{e.reportsLoading=!1}}async function xc(e,t){e.reportsError=null;try{const n=await fetch(Wn(e.basePath,`/api/reports/tasks/${t}/run`),{method:"POST",headers:Vn(e.reportsAdminToken)});await Gn(n),await mn(e)}catch(n){e.reportsError=n instanceof Error?n.message:String(n)}}async function wc(e,t,n){e.reportsError=null;try{const i=await fetch(Wn(e.basePath,`/api/reports/tasks/${t}`),{method:"PATCH",headers:Vn(e.reportsAdminToken),body:JSON.stringify(n)});await Gn(i),await mn(e)}catch(i){e.reportsError=i instanceof Error?i.message:String(i)}}async function Ja(e,t){e.selectedRecordId=t,e.reportDetailLoading=!0,e.reportsError=null;const n=t;try{const i=await fetch(Wn(e.basePath,`/api/reports/records/${t}`),{headers:Vn(e.reportsAdminToken)}),s=await Gn(i);if(e.selectedRecordId===n){e.reportDetail=s;const o=s==null?void 0:s.analysis_status;o==="running"||o==="pending"?Rh(e,t):Ci()}}catch(i){e.reportsError=i instanceof Error?i.message:String(i),e.selectedRecordId===n&&(e.reportDetail=null)}finally{e.selectedRecordId===n&&(e.reportDetailLoading=!1)}}let qs=null,js=!1;function Ci(){qs!==null&&(window.clearInterval(qs),qs=null),js=!1}function Rh(e,t){Ci(),qs=window.setInterval(async()=>{var n;if(e.selectedRecordId!==t){Ci();return}if(!js){js=!0;try{await Ja(e,t);const i=(n=e.reportDetail)==null?void 0:n.analysis_status;(i==="done"||i==="failed")&&Ci()}finally{js=!1}}},3e3)}async function kv(e,t){e.reportsError=null;try{const n=await fetch(Wn(e.basePath,`/api/reports/records/${t}/reanalyze`),{method:"POST",headers:Vn(e.reportsAdminToken)});await Gn(n),await Ja(e,t),Rh(e,t)}catch(n){e.reportsError=n instanceof Error?n.message:String(n)}}const $v=[{label:"chat",tabs:["chat"]},{label:"control",tabs:["overview","channels","instances","sessions","work","cron"]},{label:"agent",tabs:["agents","skills","nodes","reports"]},{label:"settings",tabs:["config","debug","logs","admin-data"]}],Lh={agents:"/agents",overview:"/overview",channels:"/channels",instances:"/instances",sessions:"/sessions",work:"/work",cron:"/cron",skills:"/skills",nodes:"/nodes",reports:"/reports",chat:"/chat",config:"/config",debug:"/debug",logs:"/logs","admin-data":"/admin-data"},Ph=new Map(Object.entries(Lh).map(([e,t])=>[t,e]));function ei(e){if(!e)return"";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t==="/"?"":(t.endsWith("/")&&(t=t.slice(0,-1)),t)}function Ki(e){if(!e)return"/";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t.length>1&&t.endsWith("/")&&(t=t.slice(0,-1)),t}function Mh(e,t=""){const n=ei(t),i=Lh[e];return n?`${n}${i}`:i}function Dh(e,t=""){const n=ei(t);let i=e||"/";n&&(i===n?i="/":i.startsWith(`${n}/`)&&(i=i.slice(n.length)));let s=Ki(i).toLowerCase();return s.endsWith("/index.html")&&(s="/"),s==="/"?"chat":Ph.get(s)??null}function Sv(e){let t=Ki(e);if(t.endsWith("/index.html")&&(t=Ki(t.slice(0,-11))),t==="/")return"";const n=t.split("/").filter(Boolean);if(n.length===0)return"";for(let i=0;i<n.length;i++){const s=`/${n.slice(i).join("/")}`.toLowerCase();if(Ph.has(s)){const o=n.slice(0,i);return o.length?`/${o.join("/")}`:""}}return`/${n.join("/")}`}function Av(e){switch(e){case"agents":return"folder";case"chat":return"messageSquare";case"overview":return"barChart";case"channels":return"fileText";case"instances":return"radio";case"sessions":return"fileText";case"work":return"fileText";case"cron":return"loader";case"skills":return"zap";case"nodes":return"monitor";case"reports":return"barChart";case"config":return"settings";case"debug":return"bug";case"logs":return"scrollText";case"admin-data":return"database";default:return"folder"}}function Yr(e){return p(`tabs.${e}`)}function Tv(e){return p(`subtitles.${e}`)}const Ih="openclaw.control.settings.v1";function Cv(){const t={gatewayUrl:`${location.protocol==="https:"?"wss":"ws"}://${location.host}/ws`,token:"",sessionKey:"main",lastActiveSessionKey:"main",theme:"system",chatFocusMode:!1,chatShowThinking:!0,splitRatio:.6,navCollapsed:!1,navGroupsCollapsed:{}};try{const n=localStorage.getItem(Ih);if(!n)return t;const i=JSON.parse(n);return{gatewayUrl:typeof i.gatewayUrl=="string"&&i.gatewayUrl.trim()?i.gatewayUrl.trim():t.gatewayUrl,token:typeof i.token=="string"?i.token:t.token,sessionKey:typeof i.sessionKey=="string"&&i.sessionKey.trim()?i.sessionKey.trim():t.sessionKey,lastActiveSessionKey:typeof i.lastActiveSessionKey=="string"&&i.lastActiveSessionKey.trim()?i.lastActiveSessionKey.trim():typeof i.sessionKey=="string"&&i.sessionKey.trim()||t.lastActiveSessionKey,theme:i.theme==="light"||i.theme==="dark"||i.theme==="system"?i.theme:t.theme,chatFocusMode:typeof i.chatFocusMode=="boolean"?i.chatFocusMode:t.chatFocusMode,chatShowThinking:typeof i.chatShowThinking=="boolean"?i.chatShowThinking:t.chatShowThinking,splitRatio:typeof i.splitRatio=="number"&&i.splitRatio>=.4&&i.splitRatio<=.7?i.splitRatio:t.splitRatio,navCollapsed:typeof i.navCollapsed=="boolean"?i.navCollapsed:t.navCollapsed,navGroupsCollapsed:typeof i.navGroupsCollapsed=="object"&&i.navGroupsCollapsed!==null?i.navGroupsCollapsed:t.navGroupsCollapsed,locale:Pa(i.locale)?i.locale:void 0}}catch{return t}}function Ev(e){localStorage.setItem(Ih,JSON.stringify(e))}const ms=e=>Number.isNaN(e)?.5:e<=0?0:e>=1?1:e,Rv=()=>typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches??!1,vs=e=>{e.classList.remove("theme-transition"),e.style.removeProperty("--theme-switch-x"),e.style.removeProperty("--theme-switch-y")},Lv=({nextTheme:e,applyTheme:t,context:n,currentTheme:i})=>{var c;if(i===e)return;const s=globalThis.document??null;if(!s){t();return}const o=s.documentElement,r=s,a=Rv();if(!!r.startViewTransition&&!a){let d=.5,u=.5;if((n==null?void 0:n.pointerClientX)!==void 0&&(n==null?void 0:n.pointerClientY)!==void 0&&typeof window<"u")d=ms(n.pointerClientX/window.innerWidth),u=ms(n.pointerClientY/window.innerHeight);else if(n!=null&&n.element){const h=n.element.getBoundingClientRect();h.width>0&&h.height>0&&typeof window<"u"&&(d=ms((h.left+h.width/2)/window.innerWidth),u=ms((h.top+h.height/2)/window.innerHeight))}o.style.setProperty("--theme-switch-x",`${d*100}%`),o.style.setProperty("--theme-switch-y",`${u*100}%`),o.classList.add("theme-transition");try{const h=(c=r.startViewTransition)==null?void 0:c.call(r,()=>{t()});h!=null&&h.finished?h.finished.finally(()=>vs(o)):vs(o)}catch{vs(o),t()}return}t(),vs(o)};function Pv(){return typeof window>"u"||typeof window.matchMedia!="function"||window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function Za(e){return e==="system"?Pv():e}function Ut(e,t){var i;const n={...t,lastActiveSessionKey:((i=t.lastActiveSessionKey)==null?void 0:i.trim())||t.sessionKey.trim()||"main"};e.settings=n,Ev(n),t.theme!==e.theme&&(e.theme=t.theme,Lo(e,Za(t.theme))),e.applySessionKey=e.settings.lastActiveSessionKey}function Oh(e,t){const n=t.trim();n&&e.settings.lastActiveSessionKey!==n&&Ut(e,{...e.settings,lastActiveSessionKey:n})}function Mv(e){if(!window.location.search&&!window.location.hash)return;const t=new URL(window.location.href),n=new URLSearchParams(t.search),i=new URLSearchParams(t.hash.startsWith("#")?t.hash.slice(1):t.hash),s=n.get("token")??i.get("token"),o=n.get("password")??i.get("password"),r=n.get("session")??i.get("session"),a=n.get("gatewayUrl")??i.get("gatewayUrl");let l=!1;if(s!=null){const d=s.trim();d&&d!==e.settings.token&&Ut(e,{...e.settings,token:d}),n.delete("token"),i.delete("token"),l=!0}if(o!=null&&(n.delete("password"),i.delete("password"),l=!0),r!=null){const d=r.trim();d&&(e.sessionKey=d,Ut(e,{...e.settings,sessionKey:d,lastActiveSessionKey:d}))}if(a!=null){const d=a.trim();d&&d!==e.settings.gatewayUrl&&(e.pendingGatewayUrl=d),n.delete("gatewayUrl"),i.delete("gatewayUrl"),l=!0}if(!l)return;t.search=n.toString();const c=i.toString();t.hash=c?`#${c}`:"",window.history.replaceState({},"",t.toString())}function Dv(e,t){e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?Ia(e):Oa(e),t==="debug"?Fa(e):Na(e),no(e),Nh(e,t,!1)}function Iv(e,t,n){Lv({nextTheme:t,applyTheme:()=>{e.theme=t,Ut(e,{...e.settings,theme:t}),Lo(e,Za(t))},context:n,currentTheme:e.theme})}async function no(e){var t,n,i,s,o,r;if(e.tab==="overview"&&(await Bh(e),await Promise.all([nv(e),ov(e)])),e.tab==="channels"&&await rh(e),e.tab==="instances"){const a=e;await To(a),await Co(a)}if(e.tab==="sessions"&&(await qa(e),await Zi(e)),e.tab==="cron"&&await Ua(e),e.tab==="skills"&&await es(e),e.tab==="reports"&&await mn(e),e.tab==="agents"){await Ba(e),await yt(e);const a=((n=(t=e.agentsList)==null?void 0:t.agents)==null?void 0:n.map(c=>c.id))??[];a.length>0&&oh(e,a);const l=e.agentsSelectedId??((i=e.agentsList)==null?void 0:i.defaultId)??((r=(o=(s=e.agentsList)==null?void 0:s.agents)==null?void 0:o[0])==null?void 0:r.id);l&&(sh(e,l),e.agentsPanel==="skills"&&(Hs(e,l),mn(e)),e.agentsPanel==="channels"&&Qe(e,!1),e.agentsPanel==="cron"&&el(e))}if(e.tab==="nodes"&&(await $o(e),await Gt(e),await yt(e),await Ya(e)),e.tab==="chat"&&(await Kh(e),Ji(e,!e.chatHasAutoScrolled)),e.tab==="config"&&(await gg(e),await yt(e)),e.tab==="debug"&&(await ko(e),e.eventLog=e.eventLogBuffer),e.tab==="logs"&&(e.logsAtBottom=!0,await Da(e,{reset:!0}),ih(e,!0)),e.tab==="admin-data"){const a=e;a.adminData.token&&(await pn(a),await gn(a))}}function Ov(){if(typeof window>"u")return"";const e=window.__OPENCLAW_CONTROL_UI_BASE_PATH__;return typeof e=="string"&&e.trim()?ei(e):Sv(window.location.pathname)}function Fv(e){e.theme=e.settings.theme??"system",Lo(e,Za(e.theme))}function Lo(e,t){if(e.themeResolved=t,typeof document>"u")return;const n=document.documentElement;n.dataset.theme=t,n.style.colorScheme=t}function Nv(e){if(typeof window>"u"||typeof window.matchMedia!="function")return;if(e.themeMedia=window.matchMedia("(prefers-color-scheme: dark)"),e.themeMediaHandler=n=>{e.theme==="system"&&Lo(e,n.matches?"dark":"light")},typeof e.themeMedia.addEventListener=="function"){e.themeMedia.addEventListener("change",e.themeMediaHandler);return}e.themeMedia.addListener(e.themeMediaHandler)}function Bv(e){if(!e.themeMedia||!e.themeMediaHandler)return;if(typeof e.themeMedia.removeEventListener=="function"){e.themeMedia.removeEventListener("change",e.themeMediaHandler);return}e.themeMedia.removeListener(e.themeMediaHandler),e.themeMedia=null,e.themeMediaHandler=null}function zv(e,t){if(typeof window>"u")return;const n=Dh(window.location.pathname,e.basePath)??"chat";Fh(e,n),Nh(e,n,t)}function Hv(e){var s;if(typeof window>"u")return;const t=Dh(window.location.pathname,e.basePath);if(!t)return;const i=(s=new URL(window.location.href).searchParams.get("session"))==null?void 0:s.trim();i&&(e.sessionKey=i,Ut(e,{...e.settings,sessionKey:i,lastActiveSessionKey:i})),Fh(e,t)}function Fh(e,t){e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?Ia(e):Oa(e),t==="debug"?Fa(e):Na(e),e.connected&&no(e)}function Nh(e,t,n){if(typeof window>"u")return;const i=Ki(Mh(t,e.basePath)),s=Ki(window.location.pathname),o=new URL(window.location.href);t==="chat"&&e.sessionKey?o.searchParams.set("session",e.sessionKey):o.searchParams.delete("session"),s!==i&&(o.pathname=i),n?window.history.replaceState({},"",o.toString()):window.history.pushState({},"",o.toString())}function Uv(e,t,n){if(typeof window>"u")return;const i=new URL(window.location.href);i.searchParams.set("session",t),window.history.replaceState({},"",i.toString())}async function Bh(e){await Promise.all([Qe(e,!1),rv(e),Xa(e),ch(e),ko(e),Xg(e)])}async function el(e){await Promise.all([Qe(e,!1),ch(e),Yg(e)])}async function qv(e){await Ua(e)}async function jv(e){await qa(e)}const _c=50,Kv=80,Wv=12e4,Vv="[已渲染到前端]";function Gv(e){if(!e||typeof e!="object")return null;const t=e;if(typeof t.text=="string")return t.text;const n=t.content;if(!Array.isArray(n))return null;const i=n.map(s=>{if(!s||typeof s!="object")return null;const o=s;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(s=>!!s);return i.length===0?null:i.join(`
`)}function kc(e){if(e==null)return null;if(typeof e=="number"||typeof e=="boolean")return String(e);const t=Gv(e);let n;if(typeof e=="string")n=e;else if(t)n=t;else try{n=JSON.stringify(e,null,2)}catch{n=String(e)}const i=lh(n,Wv);return i.truncated?`${i.text}

鈥?truncated (${i.total} chars, showing first ${i.text.length}).`:i.text}function Qv(e){const t=[];return t.push({type:"toolcall",name:e.name,arguments:e.args??{}}),e.output&&t.push({type:"toolresult",name:e.name,text:e.output}),{role:"assistant",toolCallId:e.toolCallId,runId:e.runId,content:t,timestamp:e.startedAt}}function Yv(e){if(e.toolStreamOrder.length<=_c)return;const t=e.toolStreamOrder.length-_c,n=e.toolStreamOrder.splice(0,t);for(const i of n)e.toolStreamById.delete(i)}function Xv(e){e.chatToolMessages=e.toolStreamOrder.map(t=>{var n;return(n=e.toolStreamById.get(t))==null?void 0:n.message}).filter(t=>!!t)}function Xr(e){e.toolStreamSyncTimer!=null&&(clearTimeout(e.toolStreamSyncTimer),e.toolStreamSyncTimer=null),Xv(e)}function Jv(e,t=!1){if(t){Xr(e);return}e.toolStreamSyncTimer==null&&(e.toolStreamSyncTimer=window.setTimeout(()=>Xr(e),Kv))}function Po(e){e.toolStreamById.clear(),e.toolStreamOrder=[],e.chatToolMessages=[],Xr(e)}function Mo(e){e.toolRenderData=null,e.toolRenderSeq=null,e.toolRenderItems=[],e.candidatePreviews=[]}const Zv=5e3;function ey(e,t){var s;const n=t.data??{},i=typeof n.phase=="string"?n.phase:"";e.compactionClearTimer!=null&&(window.clearTimeout(e.compactionClearTimer),e.compactionClearTimer=null),i==="start"?e.compactionStatus={active:!0,startedAt:Date.now(),completedAt:null}:i==="end"&&(e.compactionStatus={active:!1,startedAt:((s=e.compactionStatus)==null?void 0:s.startedAt)??null,completedAt:Date.now()},e.compactionClearTimer=window.setTimeout(()=>{e.compactionStatus=null,e.compactionClearTimer=null},Zv))}function hr(e,t){if(!Array.isArray(e.candidatePreviews)||e.candidatePreviews.length===0)return;const n=e.candidatePreviews.findIndex(i=>i.runId===t);n!==-1&&(e.candidatePreviews=[...e.candidatePreviews.slice(0,n),...e.candidatePreviews.slice(n+1)])}function ty(e,t){const n=t.data??{},i=Array.isArray(n.candidates)?n.candidates:[];if(i.length===0)return;Array.isArray(e.candidatePreviews)||(e.candidatePreviews=[]);const s=e.candidatePreviews.length;e.candidatePreviews=[...e.candidatePreviews,{id:`${t.runId}:candidates:${s}`,runId:t.runId,keywords:typeof n.keywords=="string"?n.keywords:"",candidates:i,match_source:typeof n.match_source=="string"?n.match_source:""}]}function ny(e,t){const n=t.data??{};if(typeof n.formatted_response!="string"||n.formatted_response.trim().length===0){console.warn("[tool_render] malformed payload:",n);return}const i=n.chosen_index;let s=0;if(typeof i=="number"&&Number.isFinite(i))s=i;else if(typeof i=="string"&&i.trim()){const d=Number(i);s=Number.isFinite(d)?d:0}const o=typeof n.match_source=="string"?n.match_source:"";e.toolRenderData={formatted_response:n.formatted_response,chosen:n.chosen??{},chosen_index:s,match_source:o,selection_reasoning:typeof n.selection_reasoning=="string"?n.selection_reasoning:"",batch_mode:!!n.batch_mode,resolved_items:Array.isArray(n.resolved_items)?n.resolved_items:[],pending_items:Array.isArray(n.pending_items)?n.pending_items:[],unmatched_items:Array.isArray(n.unmatched_items)?n.unmatched_items:[]},e.toolRenderSeq=t.seq,Array.isArray(e.toolRenderItems)||(e.toolRenderItems=[]);const r=`${t.runId}:${t.seq}`,a={id:r,runId:t.runId,seq:t.seq,ts:typeof t.ts=="number"?t.ts:Date.now(),sessionKey:typeof t.sessionKey=="string"?t.sessionKey:void 0,payload:e.toolRenderData},l=e.toolRenderItems.find(d=>d.id===r);if(l){l.payload=a.payload,l.ts=a.ts,l.sessionKey=a.sessionKey,hr(e,t.runId);return}const c=e.toolRenderItems.find(d=>d.runId===a.runId&&d.payload.formatted_response===a.payload.formatted_response);if(c){c.seq=a.seq,c.ts=a.ts,c.sessionKey=a.sessionKey,c.payload=a.payload,hr(e,t.runId);return}e.toolRenderItems.push(a),hr(e,t.runId)}function iy(e,t){if(!t)return;if(t.stream==="compaction"){ey(e,t);return}if(t.stream==="tool_candidates"){const u=typeof t.sessionKey=="string"?t.sessionKey:void 0;if(u&&u!==e.sessionKey||!u&&e.chatRunId&&t.runId!==e.chatRunId||e.chatRunId&&t.runId!==e.chatRunId||!e.chatRunId)return;ty(e,t);return}if(t.stream==="tool_render"){const u=typeof t.sessionKey=="string"?t.sessionKey:void 0;if(u&&u!==e.sessionKey||!u&&e.chatRunId&&t.runId!==e.chatRunId||e.chatRunId&&t.runId!==e.chatRunId||!e.chatRunId)return;ny(e,t);return}if(t.stream!=="tool")return;const n=typeof t.sessionKey=="string"?t.sessionKey:void 0;if(n&&n!==e.sessionKey||!n&&e.chatRunId&&t.runId!==e.chatRunId||e.chatRunId&&t.runId!==e.chatRunId||!e.chatRunId)return;const i=t.data??{},s=typeof i.toolCallId=="string"?i.toolCallId:"";if(!s)return;const o=typeof i.name=="string"?i.name:"tool",r=typeof i.phase=="string"?i.phase:"",a=r==="start"?i.args:void 0,l=r==="update"?kc(i.partialResult):r==="result"?kc(i.result):void 0,c=Date.now();let d=e.toolStreamById.get(s);d?(d.name=o,a!==void 0&&(d.args=a),l!==void 0&&(d.output=l||void 0),d.updatedAt=c):(d={toolCallId:s,runId:t.runId,sessionKey:n,name:o,args:a,output:l||void 0,startedAt:typeof t.ts=="number"?t.ts:c,updatedAt:c,message:{}},e.toolStreamById.set(s,d),e.toolStreamOrder.push(s)),d.message=Qv(d),Yv(e),Jv(e,r==="result")}function fr(e){return e==null?"":String(e).trim()}const pr=new WeakMap,gr=new WeakMap;function Jr(e){const t=e,n=typeof t.role=="string"?t.role:"",i=t.content;if(typeof i=="string")return n==="assistant"?rr(i):fr(i);if(Array.isArray(i)){const s=i.map(o=>{const r=o;return r.type==="text"&&typeof r.text=="string"?r.text:null}).filter(o=>typeof o=="string");if(s.length>0){const o=s.join(`
`);return n==="assistant"?rr(o):fr(o)}}return typeof t.text=="string"?n==="assistant"?rr(t.text):fr(t.text):null}function Ei(e){if(!e||typeof e!="object")return Jr(e);const t=e;if(pr.has(t))return pr.get(t)??null;const n=Jr(e);return pr.set(t,n),n}function $c(e){const n=e.content,i=[];if(Array.isArray(n))for(const a of n){const l=a;if(l.type==="thinking"&&typeof l.thinking=="string"){const c=l.thinking.trim();c&&i.push(c)}}if(i.length>0)return i.join(`
`);const s=oy(e);if(!s)return null;const r=[...s.matchAll(/<\s*think(?:ing)?\s*>([\s\S]*?)<\s*\/\s*think(?:ing)?\s*>/gi)].map(a=>(a[1]??"").trim()).filter(Boolean);return r.length>0?r.join(`
`):null}function sy(e){if(!e||typeof e!="object")return $c(e);const t=e;if(gr.has(t))return gr.get(t)??null;const n=$c(e);return gr.set(t,n),n}function oy(e){const t=e,n=t.content;if(typeof n=="string")return n;if(Array.isArray(n)){const i=n.map(s=>{const o=s;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(s=>typeof s=="string");if(i.length>0)return i.join(`
`)}return typeof t.text=="string"?t.text:null}function ry(e){const t=e.trim();if(!t)return"";const n=t.split(/\r?\n/).map(i=>i.trim()).filter(Boolean).map(i=>`_${i}_`);return n.length?["_Reasoning:_",...n].join(`
`):""}let Sc=!1;function Ac(e){e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t="";for(let n=0;n<e.length;n++)t+=e[n].toString(16).padStart(2,"0");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}function ay(){const e=new Uint8Array(16),t=Date.now();for(let n=0;n<e.length;n++)e[n]=Math.floor(Math.random()*256);return e[0]^=t&255,e[1]^=t>>>8&255,e[2]^=t>>>16&255,e[3]^=t>>>24&255,e}function ly(){Sc||(Sc=!0,console.warn("[uuid] crypto API missing; falling back to weak randomness"))}function tl(e=globalThis.crypto){if(e&&typeof e.randomUUID=="function")return e.randomUUID();if(e&&typeof e.getRandomValues=="function"){const t=new Uint8Array(16);return e.getRandomValues(t),Ac(t)}return ly(),Ac(ay())}async function Qn(e){if(!(!e.client||!e.connected)){e.chatLoading=!0,e.lastError=null;try{const t=await e.client.request("chat.history",{sessionKey:e.sessionKey,limit:200}),n=Array.isArray(t.messages)?t.messages:[];(n.length>0||e.chatMessages.length===0)&&(e.chatMessages=n),e.chatThinkingLevel=t.thinkingLevel??null}catch(t){e.lastError=String(t)}finally{e.chatLoading=!1}}}function cy(e){const t=/^data:([^;]+);base64,(.+)$/.exec(e);return t?{mimeType:t[1],content:t[2]}:null}function dy(e){if(!e||typeof e!="object")return null;const t=e;return t.role!=="assistant"||!("content"in t)||!Array.isArray(t.content)?null:t}async function uy(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",i=n?`${n}/api/quotation/upload`:"/api/quotation/upload",s=new FormData;s.append("file",t);try{const o=await fetch(i,{method:"POST",body:s,credentials:"same-origin"});if(!o.ok){const l=await o.text();throw new Error(l||`Upload failed: ${o.status}`)}const r=await o.json(),a=(r==null?void 0:r.data)??r;return!a||typeof a.file_path!="string"?null:{file_id:a.file_id??"",file_path:a.file_path,file_name:a.file_name??t.name,summaryMeta:a.summary_meta}}catch(o){throw console.error("uploadChatFile",o),o}}async function hy(e,t,n,i){if(!e.client||!e.connected)return null;const s=t.trim(),o=n&&n.length>0,r=!!(i!=null&&i.file_name);if(!s&&!o&&!r)return null;const a=Date.now(),l=[];if(s&&l.push({type:"text",text:s}),o)for(const h of n)l.push({type:"image",source:{type:"base64",media_type:h.mimeType,data:h.dataUrl}});i!=null&&i.file_name&&l.push({type:"file",file_name:i.file_name,file_path:i.file_path,summaryMeta:i.summaryMeta}),e.chatMessages=[...e.chatMessages,{role:"user",content:l,timestamp:a}],e.chatSending=!0,e.lastError=null;const c=tl();e.chatRunId=c,e.chatStream="",e.chatStreamStartedAt=a;const d=o?n.map(h=>{const g=cy(h.dataUrl);return g?{type:"image",mimeType:g.mimeType,content:g.content}:null}).filter(h=>h!==null):void 0,u=i&&i.file_path?{file_path:i.file_path,...i.file_id?{file_id:i.file_id}:{}}:void 0;try{return await e.client.request("chat.send",{sessionKey:e.sessionKey,message:s,deliver:!1,idempotencyKey:c,attachments:d,...u?{context:u,file_path:i.file_path}:{}}),e.chatUploadedFile=null,c}catch(h){const g=String(h);return e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,e.lastError=g,e.chatMessages=[...e.chatMessages,{role:"assistant",content:[{type:"text",text:"Error: "+g}],timestamp:Date.now()}],null}finally{e.chatSending=!1}}async function fy(e){if(!e.client||!e.connected)return!1;const t=e.chatRunId;try{return await e.client.request("chat.abort",t?{sessionKey:e.sessionKey,runId:t}:{sessionKey:e.sessionKey}),!0}catch(n){return e.lastError=String(n),!1}}function py(e,t){if(!t||t.sessionKey!==e.sessionKey)return null;if(t.runId&&e.chatRunId&&t.runId!==e.chatRunId)return t.state==="final"?"foreign_final":null;if(t.state==="delta"){const n=Jr(t.message);if(typeof n=="string"){const i=e.chatStream??"";(!i||n.length>=i.length)&&(e.chatStream=n)}}else if(t.state==="final")e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null;else if(t.state==="aborted"){const n=dy(t.message);if(n)e.chatMessages=[...e.chatMessages,n];else{const i=e.chatStream??"";i.trim()&&(e.chatMessages=[...e.chatMessages,{role:"assistant",content:[{type:"text",text:i}],timestamp:Date.now()}])}e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null}else t.state==="error"&&(e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null,e.lastError=t.errorMessage??"chat error");return t.state}const zh=120;function Hh(e){return e.chatSending||!!e.chatRunId}function gy(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/stop"?!0:n==="stop"||n==="esc"||n==="abort"||n==="wait"||n==="exit"}function my(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/new"||n==="/reset"?!0:n.startsWith("/new ")||n.startsWith("/reset ")}async function Uh(e){e.connected&&(e.chatMessage="",await fy(e))}function vy(e,t,n,i){const s=t.trim(),o=!!(n&&n.length>0);!s&&!o||(e.chatQueue=[...e.chatQueue,{id:tl(),text:s,createdAt:Date.now(),attachments:o?n==null?void 0:n.map(r=>({...r})):void 0,refreshSessions:i}])}async function qh(e,t,n){var o,r;Po(e),Mo(e);const i=await hy(e,t,n==null?void 0:n.attachments,e.chatUploadedFile??void 0),s=!!i;return!s&&(n==null?void 0:n.previousDraft)!=null&&(e.chatMessage=n.previousDraft),!s&&(n!=null&&n.previousAttachments)&&(e.chatAttachments=n.previousAttachments),s&&Oh(e,e.sessionKey),s&&(n!=null&&n.restoreDraft)&&((o=n.previousDraft)!=null&&o.trim())&&(e.chatMessage=n.previousDraft),s&&(n!=null&&n.restoreAttachments)&&((r=n.previousAttachments)!=null&&r.length)&&(e.chatAttachments=n.previousAttachments),Ji(e),s&&!e.chatRunId&&jh(e),s&&(n!=null&&n.refreshSessions)&&i&&e.refreshSessionsAfterChat.add(i),s}async function jh(e){if(!e.connected||Hh(e))return;const[t,...n]=e.chatQueue;if(!t)return;e.chatQueue=n,await qh(e,t.text,{attachments:t.attachments,refreshSessions:t.refreshSessions})||(e.chatQueue=[t,...e.chatQueue])}function yy(e,t){e.chatQueue=e.chatQueue.filter(n=>n.id!==t)}async function by(e,t,n){var d;if(!e.connected)return;const i=e.chatMessage,s=(t??e.chatMessage).trim(),o=e.chatAttachments??[],r=t==null?o:[],a=r.length>0,l=!!((d=e.chatUploadedFile)!=null&&d.file_name);if(!s&&!a&&!l)return;if(gy(s)){await Uh(e);return}const c=my(s);if(t==null&&(e.chatMessage="",e.chatAttachments=[]),Hh(e)){vy(e,s,r,c);return}await qh(e,s,{previousDraft:t==null?i:void 0,restoreDraft:!!(t&&(n!=null&&n.restoreDraft)),attachments:a?r:void 0,previousAttachments:t==null?o:void 0,restoreAttachments:!!(t&&(n!=null&&n.restoreDraft)),refreshSessions:c})}async function Kh(e,t){await Promise.all([Qn(e),Xa(e,{activeMinutes:zh}),Zr(e)]),(t==null?void 0:t.scheduleScroll)!==!1&&Ji(e)}const xy=jh;function wy(e){var s,o,r;const t=nh(e.sessionKey);if(t!=null&&t.agentId)return t.agentId;const n=(s=e.hello)==null?void 0:s.snapshot;return((r=(o=n==null?void 0:n.sessionDefaults)==null?void 0:o.defaultAgentId)==null?void 0:r.trim())||"main"}function _y(e,t){const n=ei(e),i=encodeURIComponent(t);return n?`${n}/avatar/${i}?meta=1`:`/avatar/${i}?meta=1`}async function Zr(e){if(!e.connected){e.chatAvatarUrl=null;return}const t=wy(e);if(!t){e.chatAvatarUrl=null;return}e.chatAvatarUrl=null;const n=_y(e.basePath,t);try{const i=await fetch(n,{method:"GET"});if(!i.ok){e.chatAvatarUrl=null;return}const s=await i.json(),o=typeof s.avatarUrl=="string"?s.avatarUrl.trim():"";e.chatAvatarUrl=o||null}catch{e.chatAvatarUrl=null}}const ky={trace:!0,debug:!0,info:!0,warn:!0,error:!0,fatal:!0},$y={name:"",description:"",agentId:"",enabled:!0,scheduleKind:"every",scheduleAt:"",everyAmount:"30",everyUnit:"minutes",cronExpr:"0 7 * * *",cronTz:"",sessionTarget:"isolated",wakeMode:"now",payloadKind:"agentTurn",payloadText:"",deliveryMode:"announce",deliveryChannel:"last",deliveryTo:"",timeoutSeconds:""},Sy=50,Ay=200,Ty="PT Vansting Agent";function Tc(e,t){if(typeof e!="string")return;const n=e.trim();if(n)return n.length<=t?n:n.slice(0,t)}function nl(e){const t=Tc(e==null?void 0:e.name,Sy)??Ty,n=Tc((e==null?void 0:e.avatar)??void 0,Ay)??null;return{agentId:typeof(e==null?void 0:e.agentId)=="string"&&e.agentId.trim()?e.agentId.trim():null,name:t,avatar:n}}async function Wh(e,t){if(!e.client||!e.connected)return;const n=e.sessionKey.trim(),i=n?{sessionKey:n}:{};try{const s=await e.client.request("agent.identity.get",i);if(!s)return;const o=nl(s);e.assistantName=o.name,e.assistantAvatar=o.avatar,e.assistantAgentId=o.agentId??null}catch{}}function ea(e){return typeof e=="object"&&e!==null}function Cy(e){if(!ea(e))return null;const t=typeof e.id=="string"?e.id.trim():"",n=e.request;if(!t||!ea(n))return null;const i=typeof n.command=="string"?n.command.trim():"";if(!i)return null;const s=typeof e.createdAtMs=="number"?e.createdAtMs:0,o=typeof e.expiresAtMs=="number"?e.expiresAtMs:0;return!s||!o?null:{id:t,request:{command:i,cwd:typeof n.cwd=="string"?n.cwd:null,host:typeof n.host=="string"?n.host:null,security:typeof n.security=="string"?n.security:null,ask:typeof n.ask=="string"?n.ask:null,agentId:typeof n.agentId=="string"?n.agentId:null,resolvedPath:typeof n.resolvedPath=="string"?n.resolvedPath:null,sessionKey:typeof n.sessionKey=="string"?n.sessionKey:null},createdAtMs:s,expiresAtMs:o}}function Ey(e){if(!ea(e))return null;const t=typeof e.id=="string"?e.id.trim():"";return t?{id:t,decision:typeof e.decision=="string"?e.decision:null,resolvedBy:typeof e.resolvedBy=="string"?e.resolvedBy:null,ts:typeof e.ts=="number"?e.ts:null}:null}function Vh(e){const t=Date.now();return e.filter(n=>n.expiresAtMs>t)}function Ry(e,t){const n=Vh(e).filter(i=>i.id!==t.id);return n.push(t),n}function Cc(e,t){return Vh(e).filter(n=>n.id!==t)}function Ly(e){return{}}const Ec={WEBCHAT:"webchat"},Rc={CONTROL_UI:"control-ui"},Py=4008;class My{constructor(t){this.opts=t,this.ws=null,this.pending=new Map,this.closed=!1,this.lastSeq=null,this.connectNonce=null,this.connectSent=!1,this.connectTimer=null,this.backoffMs=800}start(){this.closed=!1,this.connect()}stop(){var t;this.closed=!0,(t=this.ws)==null||t.close(),this.ws=null,this.flushPending(new Error("gateway client stopped"))}get connected(){var t;return((t=this.ws)==null?void 0:t.readyState)===WebSocket.OPEN}connect(){this.closed||(this.ws=new WebSocket(this.opts.url),this.ws.addEventListener("open",()=>this.queueConnect()),this.ws.addEventListener("message",t=>this.handleMessage(String(t.data??""))),this.ws.addEventListener("close",t=>{var i,s;const n=String(t.reason??"");this.ws=null,this.flushPending(new Error(`gateway closed (${t.code}): ${n}`)),(s=(i=this.opts).onClose)==null||s.call(i,{code:t.code,reason:n}),this.scheduleReconnect()}),this.ws.addEventListener("error",()=>{}))}scheduleReconnect(){if(this.closed)return;const t=this.backoffMs;this.backoffMs=Math.min(this.backoffMs*1.7,15e3),window.setTimeout(()=>this.connect(),t)}flushPending(t){for(const[,n]of this.pending)n.reject(t);this.pending.clear()}async sendConnect(){var d;if(this.connectSent)return;this.connectSent=!0,this.connectTimer!==null&&(window.clearTimeout(this.connectTimer),this.connectTimer=null);const t=typeof crypto<"u"&&!!crypto.subtle,n=["operator.admin","operator.approvals","operator.pairing"],i="operator";let s=null,o=!1,r=this.opts.token;if(t){s=await Qa();const u=(d=ym({deviceId:s.deviceId,role:i}))==null?void 0:d.token;r=u??this.opts.token,o=!!(u&&this.opts.token)}const a=r||this.opts.password?{token:r,password:this.opts.password}:void 0;let l;if(t&&s){const u=Date.now(),h=this.connectNonce??void 0,g=Ly({deviceId:s.deviceId,clientId:this.opts.clientName??Rc.CONTROL_UI,clientMode:this.opts.mode??Ec.WEBCHAT}),v=await qm(s.privateKey,g);l={id:s.deviceId,publicKey:s.publicKey,signature:v,signedAt:u,nonce:h}}const c={minProtocol:3,maxProtocol:3,client:{id:this.opts.clientName??Rc.CONTROL_UI,version:this.opts.clientVersion??"dev",platform:this.opts.platform??navigator.platform??"web",mode:this.opts.mode??Ec.WEBCHAT,instanceId:this.opts.instanceId},role:i,scopes:n,device:l,caps:[],auth:a,userAgent:navigator.userAgent,locale:navigator.language};this.request("connect",c).then(u=>{var h,g,v;(h=u==null?void 0:u.auth)!=null&&h.deviceToken&&s&&ph({deviceId:s.deviceId,role:u.auth.role??i,token:u.auth.deviceToken,scopes:u.auth.scopes??[]}),this.backoffMs=800,(v=(g=this.opts).onHello)==null||v.call(g,u)}).catch(()=>{var u;o&&s&&gh({deviceId:s.deviceId,role:i}),(u=this.ws)==null||u.close(Py,"connect failed")})}handleMessage(t){var s,o,r,a,l;let n;try{n=JSON.parse(t)}catch{return}const i=n;if(i.type==="event"){const c=n;if(c.event==="connect.challenge"){const u=c.payload,h=u&&typeof u.nonce=="string"?u.nonce:null;h&&(this.connectNonce=h,this.sendConnect());return}const d=typeof c.seq=="number"?c.seq:null;d!==null&&(this.lastSeq!==null&&d>this.lastSeq+1&&((o=(s=this.opts).onGap)==null||o.call(s,{expected:this.lastSeq+1,received:d})),this.lastSeq=d);try{(a=(r=this.opts).onEvent)==null||a.call(r,c)}catch(u){console.error("[gateway] event handler error:",u)}return}if(i.type==="res"){const c=n,d=this.pending.get(c.id);if(!d)return;this.pending.delete(c.id),c.ok?d.resolve(c.payload):d.reject(new Error(((l=c.error)==null?void 0:l.message)??"request failed"));return}}request(t,n){if(!this.ws||this.ws.readyState!==WebSocket.OPEN)return Promise.reject(new Error("gateway not connected"));const i=tl(),s={type:"req",id:i,method:t,params:n},o=new Promise((r,a)=>{this.pending.set(i,{resolve:l=>r(l),reject:a})});return this.ws.send(JSON.stringify(s)),o}queueConnect(){this.connectNonce=null,this.connectSent=!1,this.connectTimer!==null&&window.clearTimeout(this.connectTimer),this.connectTimer=window.setTimeout(()=>{this.sendConnect()},750)}}function mr(e,t){var a,l,c;const n=(e??"").trim(),i=(a=t.mainSessionKey)==null?void 0:a.trim();if(!i)return n;if(!n)return i;const s=((l=t.mainKey)==null?void 0:l.trim())||"main",o=(c=t.defaultAgentId)==null?void 0:c.trim();return n==="main"||n===s||o&&(n===`agent:${o}:main`||n===`agent:${o}:${s}`)?i:n}function Dy(e,t){if(!(t!=null&&t.mainSessionKey))return;const n=mr(e.sessionKey,t),i=mr(e.settings.sessionKey,t),s=mr(e.settings.lastActiveSessionKey,t),o=n||i||e.sessionKey,r={...e.settings,sessionKey:i||o,lastActiveSessionKey:s||o},a=r.sessionKey!==e.settings.sessionKey||r.lastActiveSessionKey!==e.settings.lastActiveSessionKey;o!==e.sessionKey&&(e.sessionKey=o),a&&Ut(e,r)}function Gh(e){e.lastError=null,e.hello=null,e.connected=!1,e.execApprovalQueue=[],e.execApprovalError=null;const t=e.client,n=new My({url:e.settings.gatewayUrl,token:e.settings.token.trim()?e.settings.token:void 0,password:e.password.trim()?e.password:void 0,clientName:"openclaw-control-ui",mode:"webchat",onHello:i=>{if(e.client===n){if(e.connected=!0,e.lastError=null,e.hello=i,Fy(e,i),e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,Po(e),Mo(e),Wh(e),Ba(e),$o(e,{quiet:!0}),Gt(e,{quiet:!0}),e.pendingVisibleRefreshHandler&&typeof document<"u"&&(document.removeEventListener("visibilitychange",e.pendingVisibleRefreshHandler),e.pendingVisibleRefreshHandler=null),typeof document>"u"||document.visibilityState==="visible")no(e);else if(typeof document<"u"){const s=()=>{document.visibilityState==="visible"&&(document.removeEventListener("visibilitychange",s),e.pendingVisibleRefreshHandler=null,!(e.client!==n||!e.connected)&&no(e))};e.pendingVisibleRefreshHandler=s,document.addEventListener("visibilitychange",s)}}},onClose:({code:i,reason:s})=>{e.client===n&&(e.connected=!1,i!==1012&&(e.lastError=`disconnected (${i}): ${s||"no reason"}`))},onEvent:i=>{e.client===n&&Iy(e,i)},onGap:({expected:i,received:s})=>{e.client===n&&(e.lastError=`event gap detected (expected seq ${i}, got ${s}); refresh recommended`)}});e.client=n,t==null||t.stop(),n.start()}function Iy(e,t){try{Oy(e,t)}catch(n){console.error("[gateway] handleGatewayEvent error:",t.event,n)}}function Oy(e,t){if(e.eventLogBuffer=[{ts:Date.now(),event:t.event,payload:t.payload},...e.eventLogBuffer].slice(0,250),e.tab==="debug"&&(e.eventLog=e.eventLogBuffer),t.event==="agent"){if(e.onboarding)return;iy(e,t.payload);return}if(t.event==="chat"){const n=t.payload;n!=null&&n.sessionKey&&Oh(e,n.sessionKey);const i=py(e,n);let s=!1;if(i==="final"||i==="error"||i==="aborted"){Po(e),Mo(e),xy(e);const o=n==null?void 0:n.runId;o&&e.refreshSessionsAfterChat.has(o)&&(e.refreshSessionsAfterChat.delete(o),i==="final"&&Xa(e,{activeMinutes:zh})),i==="final"&&(n!=null&&n.newSessionKey)&&(e.sessionKey=n.newSessionKey,e.chatMessage="",e.chatAttachments=[],e.chatUploadedFile=null,e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.chatQueue=[],e.chatMessages=[],e.lastError=null,e.chatThinkingLevel=null,e.compactionStatus=null,e.compactionClearTimer!=null&&(clearTimeout(e.compactionClearTimer),e.compactionClearTimer=null),e.resetToolStream(),e.resetToolRender(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:n.newSessionKey,lastActiveSessionKey:n.newSessionKey}),e.loadAssistantIdentity(),Qn(e),s=!0)}(i==="final"||i==="foreign_final")&&(s||Qn(e));return}if(t.event==="presence"){const n=t.payload;n!=null&&n.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence,e.presenceError=null,e.presenceStatus=null);return}if(t.event==="cron"&&e.tab==="cron"&&el(e),(t.event==="device.pair.requested"||t.event==="device.pair.resolved")&&Gt(e,{quiet:!0}),t.event==="exec.approval.requested"){const n=Cy(t.payload);if(n){e.execApprovalQueue=Ry(e.execApprovalQueue,n),e.execApprovalError=null;const i=Math.max(0,n.expiresAtMs-Date.now()+500);window.setTimeout(()=>{e.execApprovalQueue=Cc(e.execApprovalQueue,n.id)},i)}return}if(t.event==="exec.approval.resolved"){const n=Ey(t.payload);n&&(e.execApprovalQueue=Cc(e.execApprovalQueue,n.id))}}function Fy(e,t){const n=t.snapshot;n!=null&&n.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence),n!=null&&n.health&&(e.debugHealth=n.health),n!=null&&n.sessionDefaults&&Dy(e,n.sessionDefaults)}const Lc="/api/bootstrap";async function Ny(e){if(typeof window>"u"||typeof fetch!="function")return;const t=ei(e.basePath??""),n=t?`${t}${Lc}`:Lc;try{const i=await fetch(n,{method:"GET",headers:{Accept:"application/json"},credentials:"same-origin"});if(!i.ok)return;const s=await i.json(),o=nl({agentId:s.assistantAgentId??null,name:s.assistantName,avatar:s.assistantAvatar??null});e.assistantName=o.name,e.assistantAvatar=o.avatar,e.assistantAgentId=o.agentId??null}catch{}}const By="Untitled quotation",zy=24e4,Hy=12e4,Qh=1,Yh=800,Pc=new WeakMap,Uy={idle:["running"],running:["awaiting_choices","done","error","idle"],awaiting_choices:["resuming","running","error","idle"],resuming:["awaiting_choices","done","error","idle"],done:["running","idle","error"],error:["running","idle","resuming"]};class vt extends Error{constructor(t){super(t),this.name="RetryableWorkError"}}class ta extends Error{constructor(t){super(t),this.name="RunIdInvalidError"}}function ts(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}function ti(e){let t=Pc.get(e);return t||(t={controller:null,cancelRequested:!1,timeoutReached:!1},Pc.set(e,t)),t}function io(e,t){const n=e.workRunStatus;if(n===t)return;if(!(Uy[n]??[]).includes(t))throw new Error(`invalid work state transition: ${n} -> ${t}`);e.workRunStatus=t}function Un(e,t){e.workRunStatus=t}function il(e){e.workRunId=null,e.workPendingChoices=[],e.workSelections={}}function Xh(e){return(e||"").trim().replace(/\\/g,"/").toLowerCase()}function qy(e,t){const n=(t.file_path||"").trim();if(n){const i=e.workOriginalFileNamesByPath[Xh(n)];if(typeof i=="string"&&i.trim())return i.trim()}return ns(t)}function ns(e){var i,s;const t=(i=e==null?void 0:e.name)==null?void 0:i.trim();if(t)return t;const n=(s=e==null?void 0:e.file_path)==null?void 0:s.trim();if(n){const o=n.replace(/\\/g,"/").split("/").filter(Boolean).pop();if(o)return o}return By}function jy(e){try{if(typeof e!="string"||!e.trim())return null;const t=e.trim();return t.startsWith("{")&&t.endsWith("}")||t.startsWith("[")&&t.endsWith("]")?JSON.parse(t):null}catch{return null}}function vr(e){if(typeof e!="string")return!1;const t=e.trim().toLowerCase();return t?t==="__oos__"||t==="oos"||t==="无货":!1}function Ky(e){const t=Array.isArray(e.fill_items_merged)?e.fill_items_merged:[];if(!t.length)return null;const n=Array.isArray(e.items)?e.items:[],i=Array.isArray(e.shortage)?e.shortage:[],s=new Map;for(const r of n)s.set(r.row,r);const o=t.map((r,a)=>{const l=r.row,c=s.get(l)??{},d=Number(r.qty??0),u=r.unit_price,h=u==null?null:Number(u),g=h==null||Number.isNaN(h)?null:h*d,v=String(r.code??""),b=String(r.quote_name??"").trim();let y=0,S=0,E=0;for(const T of i)if(T.row===l){S=Number(T.warehouse_qty??T.qty_warehouse??T.available_qty??0),y=Number(T.available_qty??0),E=Number(T.shortfall??0);break}const L=vr(v)||b.includes("库存不足");return!L&&E===0&&S===0&&v&&!vr(v)&&(S=d),!L&&E===0&&y===0&&v&&!vr(v)&&(y=d),{row_index:a,row:typeof l=="number"?l:void 0,product_name:String(c.product_name??""),specification:String(r.specification??c.specification??""),qty:d,code:v,quote_name:b,quote_spec:String(r.quote_spec??""),unit_price:h,amount:g,warehouse_qty:S,available_qty:y,shortfall:E,is_shortage:L?1:0,match_source:null}});return{name:ns({name:typeof e.name=="string"?e.name:"",file_path:typeof e.file_path=="string"?e.file_path:null}),file_path:typeof e.file_path=="string"?e.file_path:null,source:"file",lines:o}}function Wy(e){if(!Array.isArray(e))return null;let t=null;for(const n of e){const i=n.type,s=n.content;if(i!=="observation"||typeof s!="string")continue;const o=jy(s);if(!o||typeof o!="object")continue;const r=o.pending_quotation_draft;if(r&&Array.isArray(r.lines)){t={...r,name:ns(r)};continue}const a=Ky(o);a&&(t=a)}return t}function Vy(e){const t=ae(e,"/api/work","pending_choices[]"),i=Wt(t.options,"/api/work","pending_choices[].options").map(s=>{const o=ae(s,"/api/work","pending_choices[].options[]");return{code:Nt(o.code,"/api/work","pending_choices[].options[].code"),matched_name:W(o.matched_name),unit_price:_e(o.unit_price),reasoning:W(o.reasoning)}});return{id:Nt(t.id,"/api/work","pending_choices[].id"),row:_e(t.row),keywords:W(t.keywords),product_name:W(t.product_name),specification:W(t.specification),qty:_e(t.qty)??W(t.qty),options:i}}function Gy(e){const t=ae(e,"/api/work","pending_quotation_draft"),i=Wt(t.lines,"/api/work","pending_quotation_draft.lines").map((s,o)=>{const r=ae(s,"/api/work","pending_quotation_draft.lines[]"),a=_e(r.qty)??Number(r.qty??0),l=r.unit_price==null?null:Number(r.unit_price);return{row_index:_e(r.row_index)??o,row:_e(r.row),product_name:W(r.product_name),specification:W(r.specification),qty:Number.isFinite(a)?a:0,code:W(r.code),quote_name:W(r.quote_name),quote_spec:W(r.quote_spec),unit_price:l==null||Number.isNaN(l)?null:l,amount:r.amount==null?null:Number(r.amount),warehouse_qty:_e(r.warehouse_qty),available_qty:_e(r.available_qty)??Number(r.available_qty??0),shortfall:_e(r.shortfall)??Number(r.shortfall??0),is_shortage:_e(r.is_shortage)??(Ha(r.is_shortage)?1:0),match_source:W(r.match_source)??null}});return{name:ns({name:W(t.name)??"",file_path:W(t.file_path)??null}),file_path:W(t.file_path)??null,source:W(t.source)??"file",lines:i}}function na(e,t){const n=ae(e,t),s=(W(n.status)??"done")==="awaiting_choices"?"awaiting_choices":"done",o={status:s,success:Ha(n.success)??!0,answer:W(n.answer)??"",trace:Array.isArray(n.trace)?n.trace:[],error:W(n.error)};if(n.pending_quotation_draft!=null&&(o.pending_quotation_draft=Gy(n.pending_quotation_draft)),s==="awaiting_choices"){o.run_id=Nt(n.run_id,t,"run_id");const r=Wt(n.pending_choices,t,"pending_choices");o.pending_choices=r.map(a=>Vy(a))}return o}function ia(e,t){if(e.workResult={success:t.success,answer:t.answer,trace:t.trace,error:t.error},e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null,t.status==="awaiting_choices"){io(e,"awaiting_choices"),e.workRunId=t.run_id??null,e.workPendingChoices=t.pending_choices??[];const n={};for(const i of e.workPendingChoices)n[i.id]="__OOS__";e.workSelections=n;return}if(il(e),t.pending_quotation_draft&&Array.isArray(t.pending_quotation_draft.lines))e.workPendingQuotationDraft={...t.pending_quotation_draft,name:ns(t.pending_quotation_draft)};else{const n=Wy(t.trace);n&&(e.workPendingQuotationDraft=n)}t.success===!1||t.error&&t.error.trim()?(Un(e,"error"),e.workError=he("执行报价流程",t.error??"后端返回失败状态","本次报价流程未完成","点击“重试”重新运行，或检查后端日志")):io(e,"done")}function Jh(e){return new Promise(t=>setTimeout(t,e))}function Zh(e){return e===408||e===429||e===500||e===502||e===503||e===504}function ef(e,t){const n=ti(e),i=new AbortController;n.controller=i,n.timeoutReached=!1;const s=setTimeout(()=>{n.timeoutReached=!0,i.abort("timeout")},t);return{signal:i.signal,close:()=>{clearTimeout(s),n.controller===i&&(n.controller=null)}}}function so(e){return e instanceof Error?e.name==="AbortError"||/aborted/i.test(e.message):!1}function Qy(e,t){Un(e,"error"),il(e),e.workResult={success:!1,error:t},e.workError=he("执行报价流程",t,"流程被中断，未产出有效结果","点击“重试”再次执行")}function sl(e){Un(e,"idle"),e.workError="已取消当前流程。",e.workResult=null}async function Yy(e,t){const n={file_paths:e.workFilePaths,customer_level:e.workCustomerLevel,do_register_oos:e.workDoRegisterOos},{signal:i,close:s}=ef(e,zy);try{const o=await fetch(ts(e.basePath,t),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n),credentials:"same-origin",signal:i});if(!o.ok||!o.body){const d=await o.json().catch(()=>({})),u=Le(d,`HTTP ${o.status}`);throw Zh(o.status)?new vt(u):new Error(u)}const r=o.body.getReader(),a=new TextDecoder;let l="",c=!1;for(;;){const{done:d,value:u}=await r.read();if(d)break;l+=a.decode(u,{stream:!0});const h=l.split(`
`);l=h.pop()??"";for(const g of h){if(!g.startsWith("data: "))continue;const v=g.slice(6).trim();if(!v)continue;const b=ae(JSON.parse(v),t,"stream_event"),y=Nt(b.type,t,"stream_event.type");if(y==="stage"){const S=_e(b.stage)??Number(b.stage);if(!Number.isFinite(S))throw new ye(t,"stage must be a number");e.workProgressStage=S}else if(y==="result"){const S=na(b.payload,t);ia(e,S),c=!0;break}}if(c)break}if(!c&&l.startsWith("data: ")){const d=l.slice(6).trim();if(d){const u=ae(JSON.parse(d),t,"stream_event_tail");if(u.type==="result"){const h=na(u.payload,t);ia(e,h),c=!0}}}if(!c)throw new ye(t,"stream ended without result event")}catch(o){const r=ti(e);throw r.cancelRequested?new Error("__WORK_CANCELLED__"):so(o)&&r.timeoutReached?new vt("请求超时"):so(o)?new Error("请求已中断"):o instanceof ye||o instanceof vt?o:o instanceof Error&&/network|failed to fetch|load failed/i.test(o.message)?new vt(o.message):o}finally{s()}}function Xy(e,t){if(e===404||e===410)return!0;const n=Le(t,"").toLowerCase();return n.includes("run_id")||n.includes("run id")}async function Jy(e,t,n){const i="/api/work/resume",{signal:s,close:o}=ef(e,Hy);try{const r=await fetch(ts(e.basePath,i),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({run_id:t,selections:n}),credentials:"same-origin",signal:s}),a=await r.json().catch(()=>({}));if(!r.ok){if(Xy(r.status,a))throw new ta(Le(a,"run_id 已失效"));const c=Le(a,`HTTP ${r.status}`);throw Zh(r.status)?new vt(c):new Error(c)}const l=na(a,i);ia(e,l)}catch(r){const a=ti(e);throw a.cancelRequested?new Error("__WORK_CANCELLED__"):r instanceof ta?r:so(r)&&a.timeoutReached?new vt("请求超时"):so(r)?new Error("请求已中断"):r instanceof ye||r instanceof vt?r:r instanceof Error&&/network|failed to fetch|load failed/i.test(r.message)?new vt(r.message):r}finally{o()}}function Zy(e){var n;const t=ti(e);t.cancelRequested=!0,(n=t.controller)==null||n.abort("user_cancel"),sl(e),e.workRunning=!1}async function tf(e){if(!e.workFilePaths.length){e.workError="请先上传至少一个报价单文件";return}const t=ti(e);t.cancelRequested=!1,e.workRunning=!0,e.workError=null,e.workResult=null,e.workRunId=null,e.workPendingChoices=[],e.workSelections={},e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null,io(e,"running");let n=0;try{for(;;){n+=1;try{await Yy(e,"/api/work/run-stream");break}catch(i){if(i instanceof Error&&i.message==="__WORK_CANCELLED__"){sl(e);break}if(i instanceof vt&&n<=Qh){await Jh(Yh*n);continue}const s=i instanceof ye||i instanceof Error?i.message:String(i);Qy(e,s);break}}}finally{e.workRunning=!1}}async function nf(e){const t=e.workRunId;if(!t||e.workPendingChoices.length===0){e.workError="缺少可继续的 run_id，请重新执行。",Un(e,"error");return}const n=e.workPendingChoices.map(o=>({item_id:o.id,selected_code:e.workSelections[o.id]??"__OOS__"})),i=ti(e);i.cancelRequested=!1,e.workRunning=!0,e.workError=null,io(e,"resuming");let s=0;try{for(;;){s+=1;try{await Jy(e,t,n);break}catch(o){if(o instanceof Error&&o.message==="__WORK_CANCELLED__"){sl(e);break}if(o instanceof ta){il(e),e.workResult={success:!1,error:o.message},e.workError=he("继续流程",o.message,"当前待选项无法继续提交","请重新执行一次 Work 流程"),Un(e,"error");break}if(o instanceof vt&&s<=Qh){await Jh(Yh*s);continue}const r=o instanceof ye||o instanceof Error?o.message:String(o);e.workResult={success:!1,error:r},e.workError=he("继续流程",r,"本次续跑失败，尚未生成完整结果","点击“重试”继续，或重新执行 Work"),Un(e,"error");break}}}finally{e.workRunning=!1}}async function eb(e){if(e.workRunId&&e.workPendingChoices.length>0){await nf(e);return}await tf(e)}async function tb(e){const t=(e.workTextInput||"").trim();if(!t)return e.workTextError="请输入产品描述文字",!1;e.workTextGenerating=!0,e.workTextError=null;try{const n=await fetch(ts(e.basePath,"/api/quotation/from-text"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t}),credentials:"same-origin"}),i=await n.json().catch(()=>({}));if(!n.ok){let a=typeof i.detail=="string"?i.detail:Le(i,`HTTP ${n.status}`);return n.status===405&&(a="Method Not Allowed：该接口需 POST。请确认使用 python start.py 或 run_backend.py 启动前后端一体服务，且未通过仅支持 GET 的静态托管访问页面。"),e.workTextError=a,!1}const s=i&&typeof i.data=="object"?i.data:i,o=[],r={};if(Array.isArray(s.file_paths)){const a=Array.isArray(s.file_names)?s.file_names:[];s.file_paths.forEach((l,c)=>{if(typeof l!="string"||!l.trim())return;const d=l.trim();o.push(d);const u=typeof a[c]=="string"?a[c]:"";r[d]=u||d.split(/[/\\]/).pop()||d})}if(typeof s.file_path=="string"&&s.file_path.trim()){const a=s.file_path.trim();o.includes(a)||o.push(a);const l=typeof s.file_name=="string"?s.file_name:"";r[a]=l||a.split(/[/\\]/).pop()||a}if(!o.length)return e.workTextError="接口未返回 file_path/file_paths",!1;for(const a of o){e.workFilePaths.includes(a)||(e.workFilePaths=[...e.workFilePaths,a]);const l=Xh(a);if(l){const c=(r[a]||"").trim()||a.split(/[/\\]/).pop()||a;e.workOriginalFileNamesByPath={...e.workOriginalFileNamesByPath,[l]:c}}}return e.workTextError=null,!0}catch(n){const i=n instanceof Error?n.message:String(n);return e.workTextError=he("从文字生成报价单",i,"未生成文件","请检查网络或后端后重试"),!1}finally{e.workTextGenerating=!1}}async function nb(e){try{const t=ts(e.basePath,"/api/config/price-levels"),n=await fetch(t);if(!n.ok)throw new Error(`HTTP ${n.status}`);const i=await n.json();i.success&&Array.isArray(i.data)&&(e.workPriceLevelOptions=i.data)}catch(t){console.warn("[work] 加载价格档位失败，使用本地默认值",t)}}async function ib(e){var n;const t=e.workPendingQuotationDraft;if(!((n=t==null?void 0:t.lines)!=null&&n.length))return e.workQuotationDraftSaveStatus={status:"error",error:"无报价明细可保存"},!1;e.workQuotationDraftSaveStatus={status:"saving"};try{const i=await fetch(ts(e.basePath,"/api/quotation-drafts"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:qy(e,t),source:t.source||"file",file_path:t.file_path??void 0,lines:t.lines.map(u=>({product_name:u.product_name??"",specification:u.specification??"",qty:Number(u.qty)||0,code:u.code??"",quote_name:u.quote_name??"",quote_spec:u.quote_spec??"",unit_price:u.unit_price!=null?Number(u.unit_price):null,amount:u.amount!=null?Number(u.amount):null,available_qty:Number(u.warehouse_qty??u.available_qty)||0,shortfall:Number(u.shortfall)||0,is_shortage:u.is_shortage?1:0,match_source:u.match_source??null}))}),credentials:"same-origin"}),s=await i.json().catch(()=>({}));if(!i.ok)return e.workQuotationDraftSaveStatus={status:"error",error:he("保存报价单",Le(s,`HTTP ${i.status}`),"报价单仍停留在待保存状态","点击“重试”再次保存")},!1;const o=ae(s,"/api/quotation-drafts"),r=Ha(o.success),a=ae(o.data,"/api/quotation-drafts","data"),l=Nt(a.draft_no,"/api/quotation-drafts","data.draft_no"),c=_e(a.draft_id)??Number(a.draft_id),d=Number.isFinite(c)?c:0;if(r===!1)throw new ye("/api/quotation-drafts","success is false");return e.workQuotationDraftSaveStatus={status:"ok",draft_no:l,draft_id:d},e.workPendingQuotationDraft=null,!0}catch(i){const s=i instanceof ye||i instanceof Error?i.message:String(i);return e.workQuotationDraftSaveStatus={status:"error",error:he("保存报价单",s,"报价单仍停留在待保存状态","检查数据后重试")},!1}}function sb(e){e.basePath=Ov(),Ny(e),nb(e),Mv(e),zv(e,!0),Fv(e),Nv(e),window.addEventListener("popstate",e.popStateHandler),Gh(e),Kg(e),e.tab==="logs"&&Ia(e),e.tab==="debug"&&Fa(e)}function ob(e){Ng(e)}function rb(e){var t;window.removeEventListener("popstate",e.popStateHandler),Wg(e),Oa(e),Na(e),Bv(e),(t=e.topbarObserver)==null||t.disconnect(),e.topbarObserver=null}function ab(e,t){if(!(e.tab==="chat"&&e.chatManualRefreshInFlight)){if(e.tab==="chat"&&(t.has("chatMessages")||t.has("chatToolMessages")||t.has("chatStream")||t.has("chatLoading")||t.has("tab"))){const n=t.has("tab"),i=t.has("chatLoading")&&t.get("chatLoading")===!0&&!e.chatLoading;Ji(e,n||i||!e.chatHasAutoScrolled)}e.tab==="logs"&&(t.has("logsEntries")||t.has("logsAutoFollow")||t.has("tab"))&&e.logsAutoFollow&&e.logsAtBottom&&ih(e,t.has("tab")||t.has("logsAutoFollow"))}}const lb=[{value:"FACTORY_INC_TAX",labelKey:"work.priceLevels.FACTORY_INC_TAX"},{value:"FACTORY_EXC_TAX",labelKey:"work.priceLevels.FACTORY_EXC_TAX"},{value:"PURCHASE_EXC_TAX",labelKey:"work.priceLevels.PURCHASE_EXC_TAX"},{value:"A_MARGIN",labelKey:"work.priceLevels.A_MARGIN"},{value:"A_QUOTE",labelKey:"work.priceLevels.A_QUOTE"},{value:"B_MARGIN",labelKey:"work.priceLevels.B_MARGIN"},{value:"B_QUOTE",labelKey:"work.priceLevels.B_QUOTE"},{value:"C_MARGIN",labelKey:"work.priceLevels.C_MARGIN"},{value:"C_QUOTE",labelKey:"work.priceLevels.C_QUOTE"},{value:"D_MARGIN",labelKey:"work.priceLevels.D_MARGIN"},{value:"D_QUOTE",labelKey:"work.priceLevels.D_QUOTE"},{value:"D_LOW",labelKey:"work.priceLevels.D_LOW"},{value:"E_MARGIN",labelKey:"work.priceLevels.E_MARGIN"},{value:"E_QUOTE",labelKey:"work.priceLevels.E_QUOTE"}];function Mc(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}function Dc(e){try{if(typeof e!="string"||!e.trim())return null;const t=e.trim();return t.startsWith("{")&&t.endsWith("}")||t.startsWith("[")&&t.endsWith("]")?JSON.parse(t):null}catch{return null}}function Ic(e){if(!Array.isArray(e))return[];const t=[],n=i=>{if(typeof i!="string"||!i.trim())return;const s=i.replace(/\\/g,"/").split("/").filter(Boolean).pop()??"";s&&!t.includes(s)&&t.push(s)};for(const i of e){const s=i,o=s.type,r=s.content;if(o==="observation"&&typeof r=="string"){const a=Dc(r);if(a&&typeof a=="object"){n(a.output_path??a.filled_path);const c=a.result,d=typeof c=="string"?Dc(c):c&&typeof c=="object"?c:null;d&&typeof d=="object"&&n(d.output_path??d.filled_path)}const l=r.match(/[A-Za-z]:[^\s"]+\.xlsx|\/[^\s"]+\.xlsx|[^\s"']+\.xlsx/);l&&l[0]&&n(l[0])}n(s.output_path??s.filled_path)}return t}function cb(e,t,n){return f`
    <li style="margin-bottom: 14px; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
      <div style="font-size: 13px; margin-bottom: 8px;">
        ${e.product_name??e.keywords??""}
        ${e.specification?f`<span class="muted"> 路 ${e.specification}</span>`:$}
        ${e.qty!=null?f`<span class="muted"> 路 ${p("work.qty")}: ${e.qty}</span>`:$}
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
  `}function db(e){return(e||"").trim().replace(/\\/g,"/").toLowerCase()}function ub(e){var Te,te,xe;const{basePath:t,workFilePaths:n,workOriginalFileNamesByPath:i,workRunning:s,workProgressStage:o,workRunStatus:r,workPendingChoices:a,workSelections:l,workResult:c,workError:d,workCustomerLevel:u,workDoRegisterOos:h,workPendingQuotationDraft:g,workQuotationDraftSaveStatus:v,workTextInput:b,workTextGenerating:y,workTextError:S,workPriceLevelOptions:E,onAddFile:L,onRemoveFile:T,onRenameFileName:C,onWorkTextChange:M,onGenerateFromText:m,onCustomerLevelChange:k,onDoRegisterOosChange:R,onRun:D,onCancel:P,onRetry:F,onSelectionChange:N,onResume:B,onQuotationLineChange:I,onQuotationDraftSave:V,onQuotationDraftDismiss:le}=e,z=[p("work.stageExtract"),p("work.stageMatch"),p("work.stageFill")],J=(()=>{switch(r){case"idle":return p("work.status.idle");case"running":return p("work.status.running");case"awaiting_choices":return p("work.status.awaitingChoices");case"resuming":return p("work.status.resuming");case"done":return p("work.status.done");case"error":default:return p("work.status.error")}})(),ge=K=>{const G=Mc(t,"/api/quotation/upload?with_summary=0"),oe=new FormData;oe.append("file",K),fetch(G,{method:"POST",body:oe,credentials:"same-origin"}).then(de=>de.json()).then(de=>{if((de==null?void 0:de.success)===!1)return;const Me=de.data??de;typeof Me.file_path=="string"&&L(Me.file_path,Me.file_name??K.name)}).catch(de=>{console.warn("[work] upload failed",de)})},Q=K=>{var de;const G=K.target,oe=(de=G.files)==null?void 0:de[0];oe&&(ge(oe),G.value="")},Se=K=>{var oe;K.preventDefault();const G=(oe=K.dataTransfer)==null?void 0:oe.files;if(!(!G||!G.length))for(let de=0;de<G.length;de+=1){const Me=G.item(de);Me&&ge(Me)}},se=K=>{K.preventDefault(),K.dataTransfer&&(K.dataTransfer.dropEffect="copy")};return f`
    <section class="card work-quotation" style="margin-bottom: 16px;" aria-label=${p("tabs.work")}>
      <div class="work-quotation__inner">
        <header class="work-quotation__head">
          <div class="card-title">${p("tabs.work")}</div>
          <p class="muted">${p("subtitles.work")}</p>
        </header>

        <div
          class="work-quotation__panel work-quotation__panel--upload"
          @dragover=${se}
          @dragenter=${se}
          @drop=${Se}
        >
          <label class="work-quotation__panel-label">${p("work.uploadTitle")}</label>
          <input
            type="file"
            accept=".xlsx,.xls,.xlsm"
            class="work-quotation__file-input"
            @change=${Q}
            aria-label=${p("work.uploadTitle")}
          />
          ${n.length?f`
                <ul class="work-quotation__file-list">
                  ${n.map((K,G)=>{const oe=db(K),de=K.split(/[/\\]/).pop()??K,Me=oe&&i[oe]||de;return f`
                        <li style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                          <input
                            type="text"
                            .value=${Me}
                            @change=${rs=>C(K,rs.target.value)}
                            style="flex: 1 1 auto; min-width: 0; padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border); font-size: 13px; word-break: break-all;"
                            aria-label=${p("work.fileDisplayName")}
                          />
                          <button
                            type="button"
                            class="btn btn-sm"
                            style="padding: 2px 8px;"
                            @click=${()=>T(G)}
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
            .value=${b}
            @input=${K=>M(K.target.value)}
            placeholder=${p("work.textInputPlaceholder")}
            rows="6"
            ?disabled=${y}
            aria-label=${p("work.textInputTitle")}
          ></textarea>
          <div class="work-quotation__text-actions">
            <button
              type="button"
              class="btn"
              style="background: var(--accent); color: var(--bg);"
              ?disabled=${!b.trim()||y}
              @click=${m}
              aria-label=${p("work.generateFromText")}
            >
              ${p(y?"work.textGenerating":"work.generateFromText")}
            </button>
            ${S?f`<span style="color: var(--danger, #c00); font-size: 13px;" role="alert">${S}</span>`:$}
          </div>
        </div>

        <div class="work-quotation__options">
          <div class="work-quotation__customer-level">
            <label>${p("work.customerLevel")}</label>
            ${(()=>{const K=E&&E.length>0?E:lb.map(G=>({value:G.value,label:p(G.labelKey)}));return f`<select
                .value=${u}
                @change=${G=>k(G.target.value)}
                style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 160px;"
                aria-label=${p("work.customerLevel")}
              >
                ${K.map(G=>f`<option value=${G.value}>${G.label}</option>`)}
              </select>`})()}
          </div>
          <label style="display: flex; align-items: center; gap: 6px; font-size: 13px;">
            <input
              type="checkbox"
              ?checked=${h}
              @change=${K=>R(K.target.checked)}
              aria-label=${p("work.registerOos")}
            />
            ${p("work.registerOos")}
          </label>
        </div>

        <div class="work-quotation__run-block">
          ${s?f`
                <div class="work-quotation__stages">
                  ${z.map((K,G)=>f`
                      <span
                        style="
                        padding: 6px 12px;
                        border-radius: 8px;
                        font-size: 13px;
                        background: ${o>=0&&G===o?"var(--accent)":"var(--bg-secondary, #eee)"};
                        color: ${o>=0&&G===o?"var(--bg)":"var(--muted)"};
                      "
                      >
                        ${G+1}. ${K}
                      </span>
                    `)}
                </div>
                <p class="muted" style="font-size: 12px; margin: 0;">
                  ${p("work.currentStage")}: ${o>=0&&o<z.length?z[o]:p("work.running")}
                </p>
              `:$}

          <div class="work-quotation__actions">
            <div class="work-quotation__action-row">
              <button
                class="btn"
                style="background: var(--accent); color: var(--bg);"
                ?disabled=${n.length===0||s}
                @click=${D}
                aria-label=${p("work.run")}
              >
                ${p(s?"work.running":"work.run")}
              </button>
              ${s?f`<button class="btn btn-sm" @click=${P} aria-label=${p("work.cancel")}>${p("work.cancel")}</button>`:$}
              ${r==="error"?f`<button class="btn btn-sm" @click=${F} aria-label=${p("common.retry")}>${p("common.retry")}</button>`:$}
            </div>
            ${n.length===0?f`<span class="muted work-quotation__status-line">${p("work.runHint")}</span>`:$}
            <span class="muted work-quotation__status-line">${p("work.statusLabel")}: ${J}</span>
          </div>
        </div>

        ${d?f`
              <div class="work-quotation__error-banner" role="alert" aria-live="assertive">
                <p style="margin: 0; color: var(--danger, #e53935); font-size: 13px;">${d}</p>
              </div>
            `:$}
      </div>
    </section>

    ${r==="awaiting_choices"&&a.length?(()=>{const K=r;return f`
            <section class="card work-quotation--follow" style="margin-bottom: 16px;" aria-live="polite">
              <div class="work-quotation__inner">
                <div class="card-title">${p("work.awaitingTitle")}</div>
                <p class="muted" style="margin-bottom: 14px;">${p("work.awaitingHint")}</p>
                <ul style="list-style: none; padding: 0; margin: 0;">
                  ${a.map(G=>cb(G,l[G.id]??"__OOS__",oe=>N(G.id,oe)))}
                </ul>
                <div style="display: flex; gap: 10px; margin-top: 14px; flex-wrap: wrap;">
                  <button class="btn" style="background: var(--accent); color: var(--bg);" ?disabled=${s} @click=${B}>
                    ${p(s||K==="resuming"?"work.resuming":"work.resume")}
                  </button>
                  ${K==="error"?f`<button class="btn btn-sm" @click=${F}>${p("common.retry")}</button>`:$}
                </div>
              </div>
            </section>
          `})():$}

    ${(v==null?void 0:v.status)==="ok"?f`
          <section class="card work-quotation--follow" style="margin-bottom: 16px;" role="status" aria-live="polite">
            <div class="work-quotation__inner">
              <p style="color: var(--success, #2e7d32); margin: 0 0 4px 0;">${p("work.savedDraftNo",{no:v.draft_no})}</p>
              <p class="muted" style="margin: 0 0 10px 0; font-size: 12px;">${p("work.saveSuccessHint")}</p>
              <button class="btn btn-sm" @click=${le}>${p("common.close")}</button>
            </div>
          </section>
        `:(Te=g==null?void 0:g.lines)!=null&&Te.length?f`
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
                    ${g.lines.map((K,G)=>f`
                        <tr>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${G+1}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${K.product_name??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${K.specification??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="number" min="0" step="1" .value=${String(K.qty??"")} @change=${oe=>I(G,"qty",oe.target.value)} style="width: 72px;" aria-label=${p("work.lineQty")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="text" .value=${K.code??""} @change=${oe=>I(G,"code",oe.target.value)} style="width: 90px;" aria-label=${p("work.lineCode")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="text" .value=${K.quote_name??""} @change=${oe=>I(G,"quote_name",oe.target.value)} style="width: 120px;" aria-label=${p("work.lineQuoteName")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="text" .value=${K.quote_spec??""} @change=${oe=>I(G,"quote_spec",oe.target.value)} style="width: 120px;" aria-label=${p("work.lineQuoteSpec")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="number" min="0" step="0.01" .value=${K.unit_price!=null?String(K.unit_price):""} @change=${oe=>I(G,"unit_price",oe.target.value)} style="width: 90px;" aria-label=${p("work.linePrice")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${K.amount!=null?K.amount:""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${K.warehouse_qty??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${K.shortfall??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${K.is_shortage?p("common.yes"):p("common.no")}</td>
                        </tr>
                      `)}
                  </tbody>
                </table>
              </div>

              ${(v==null?void 0:v.status)==="error"?f`<p style="color: var(--danger, #c00); margin-bottom: 10px;">${v.error}</p>`:$}

                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                  <button class="btn" style="background: var(--accent); color: var(--bg);" ?disabled=${(v==null?void 0:v.status)==="saving"} @click=${V}>
                    ${(v==null?void 0:v.status)==="saving"?p("work.saving"):p("work.saveDraft")}
                  </button>
                  <button class="btn btn-sm" ?disabled=${(v==null?void 0:v.status)==="saving"} @click=${le}>
                    ${p("common.cancel")}
                  </button>
                </div>
              </div>
            </section>
          `:$}

    ${c&&!((te=g==null?void 0:g.lines)!=null&&te.length)?f`
          <section class="card work-quotation--follow">
            <div class="work-quotation__inner">
              <div class="card-title">${p("work.resultTitle")}</div>
              ${Ic(c.trace).length?f`
                    <div style="margin-bottom: 14px;">
                      ${Ic(c.trace).map(K=>f`
                          <a href=${Mc(t,`/api/quotation/download?path=${encodeURIComponent(K)}`)} download=${K} class="btn btn-sm" style="margin-right: 8px; margin-bottom: 6px; text-decoration: none;">
                            ${p("work.download",{name:K})}
                          </a>
                        `)}
                    </div>
                  `:$}

              ${c.answer?f`<div style="white-space: pre-wrap; margin-bottom: 14px;">${c.answer}</div>`:$}
              ${c.error?f`<p style="color: var(--danger, #e53935);">${c.error}</p>`:$}

              ${(xe=c.trace)!=null&&xe.length?f`
                    <details style="margin-top: 14px;">
                      <summary>${p("work.trace",{count:String(c.trace.length)})}</summary>
                      <pre style="max-height: 420px; overflow: auto; margin-top: 8px; font-size: 11px; white-space: pre-wrap;">${JSON.stringify(c.trace,null,2)}</pre>
                    </details>
                  `:$}
            </div>
          </section>
        `:$}
  `}function ys(e){return(e||"").trim().replace(/\\/g,"/").toLowerCase()}function hb(e){return e.tab!=="work"?$:ub({basePath:e.basePath,workFilePaths:e.workFilePaths,workRunning:e.workRunning,workProgressStage:e.workProgressStage,workRunStatus:e.workRunStatus,workRunId:e.workRunId,workPendingChoices:e.workPendingChoices,workSelections:e.workSelections,workResult:e.workResult,workError:e.workError,workCustomerLevel:e.workCustomerLevel,workDoRegisterOos:e.workDoRegisterOos,workOriginalFileNamesByPath:e.workOriginalFileNamesByPath,workPendingQuotationDraft:e.workPendingQuotationDraft,workQuotationDraftSaveStatus:e.workQuotationDraftSaveStatus,workTextInput:e.workTextInput,workTextGenerating:e.workTextGenerating,workTextError:e.workTextError,workPriceLevelOptions:e.workPriceLevelOptions,onWorkTextChange:t=>{e.workTextInput=t},onGenerateFromText:()=>{tb(e)},onAddFile:(t,n)=>{e.workFilePaths.includes(t)||(e.workFilePaths=[...e.workFilePaths,t]);const i=ys(t);i&&(e.workOriginalFileNamesByPath={...e.workOriginalFileNamesByPath,[i]:(n||"").trim()||t.split(/[/\\]/).pop()||t})},onRenameFileName:(t,n)=>{const i=ys(t);if(!i)return;const s=(n||"").trim(),o=t.split(/[/\\]/).pop()||t;e.workOriginalFileNamesByPath={...e.workOriginalFileNamesByPath,[i]:s||o};const r=e.workPendingQuotationDraft;r&&r.file_path&&ys(r.file_path)===i&&(e.workPendingQuotationDraft={...r,name:s||o})},onRemoveFile:t=>{const n=e.workFilePaths[t]??"";e.workFilePaths=e.workFilePaths.filter((s,o)=>o!==t);const i=ys(n);if(i&&e.workOriginalFileNamesByPath[i]!==void 0){const s={...e.workOriginalFileNamesByPath};delete s[i],e.workOriginalFileNamesByPath=s}},onCustomerLevelChange:t=>{e.workCustomerLevel=t},onDoRegisterOosChange:t=>{e.workDoRegisterOos=t},onRun:()=>void tf(e),onCancel:()=>Zy(e),onRetry:()=>void eb(e),onSelectionChange:(t,n)=>{e.workSelections={...e.workSelections,[t]:n}},onResume:()=>void nf(e),onQuotationLineChange:(t,n,i)=>{var a;const s=e.workPendingQuotationDraft;if(!((a=s==null?void 0:s.lines)!=null&&a.length)||t<0||t>=s.lines.length)return;const o=s.lines.slice(),r={...o[t]};if(n==="qty"){const l=Number(i);r.qty=Number.isFinite(l)?l:0}else if(n==="unit_price"){const l=String(i??"").trim();if(!l)r.unit_price=null;else{const c=Number(l);r.unit_price=Number.isFinite(c)?c:null}}else r[n]=i;if(n==="qty"||n==="unit_price"){const l=Number(r.qty??0),c=r.unit_price==null?NaN:Number(r.unit_price);r.amount=Number.isFinite(l)&&Number.isFinite(c)?l*c:null}o[t]=r,e.workPendingQuotationDraft={...s,lines:o}},onQuotationDraftSave:()=>{typeof window<"u"&&window.confirm(p("work.saveConfirm"))&&ib(e).then(t=>{t&&e.loadFulfillDrafts()})},onQuotationDraftDismiss:()=>{e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null}})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ol={CHILD:2},rl=e=>(...t)=>({_$litDirective$:e,values:t});let al=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,i){this._$Ct=t,this._$AM=n,this._$Ci=i}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:fb}=tg,Oc=e=>e,pb=e=>e.strings===void 0,Fc=()=>document.createComment(""),ri=(e,t,n)=>{var o;const i=e._$AA.parentNode,s=t===void 0?e._$AB:t._$AA;if(n===void 0){const r=i.insertBefore(Fc(),s),a=i.insertBefore(Fc(),s);n=new fb(r,a,e,e.options)}else{const r=n._$AB.nextSibling,a=n._$AM,l=a!==e;if(l){let c;(o=n._$AQ)==null||o.call(n,e),n._$AM=e,n._$AP!==void 0&&(c=e._$AU)!==a._$AU&&n._$AP(c)}if(r!==s||l){let c=n._$AA;for(;c!==r;){const d=Oc(c).nextSibling;Oc(i).insertBefore(c,s),c=d}}}return n},Jt=(e,t,n=e)=>(e._$AI(t,n),e),gb={},mb=(e,t=gb)=>e._$AH=t,vb=e=>e._$AH,yr=e=>{e._$AR(),e._$AA.remove()};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Nc=(e,t,n)=>{const i=new Map;for(let s=t;s<=n;s++)i.set(e[s],s);return i},sf=rl(class extends al{constructor(e){if(super(e),e.type!==ol.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,n){let i;n===void 0?n=t:t!==void 0&&(i=t);const s=[],o=[];let r=0;for(const a of e)s[r]=i?i(a,r):r,o[r]=n(a,r),r++;return{values:o,keys:s}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,i]){const s=vb(e),{values:o,keys:r}=this.dt(t,n,i);if(!Array.isArray(s))return this.ut=r,o;const a=this.ut??(this.ut=[]),l=[];let c,d,u=0,h=s.length-1,g=0,v=o.length-1;for(;u<=h&&g<=v;)if(s[u]===null)u++;else if(s[h]===null)h--;else if(a[u]===r[g])l[g]=Jt(s[u],o[g]),u++,g++;else if(a[h]===r[v])l[v]=Jt(s[h],o[v]),h--,v--;else if(a[u]===r[v])l[v]=Jt(s[u],o[v]),ri(e,l[v+1],s[u]),u++,v--;else if(a[h]===r[g])l[g]=Jt(s[h],o[g]),ri(e,s[u],s[h]),h--,g++;else if(c===void 0&&(c=Nc(r,g,v),d=Nc(a,u,h)),c.has(a[u]))if(c.has(a[h])){const b=d.get(r[g]),y=b!==void 0?s[b]:null;if(y===null){const S=ri(e,s[u]);Jt(S,o[g]),l[g]=S}else l[g]=Jt(y,o[g]),ri(e,s[u],y),s[b]=null;g++}else yr(s[h]),h--;else yr(s[u]),u++;for(;g<=v;){const b=ri(e,l[v+1]);Jt(b,o[g]),l[g++]=b}for(;u<=h;){const b=s[u++];b!==null&&yr(b)}return this.ut=r,mb(e,l),Ht}}),be={messageSquare:f`
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
  `};function yb(e){var s,o,r,a,l;const t=(s=e.hello)==null?void 0:s.snapshot,n=(r=(o=t==null?void 0:t.sessionDefaults)==null?void 0:o.mainSessionKey)==null?void 0:r.trim();if(n)return n;const i=(l=(a=t==null?void 0:t.sessionDefaults)==null?void 0:a.mainKey)==null?void 0:l.trim();return i||"main"}function bb(e,t){e.sessionKey=t,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:t,lastActiveSessionKey:t})}function xb(e,t){const n=Mh(t,e.basePath);return f`
    <a
      href=${n}
      class="nav-item ${e.tab===t?"active":""}"
      @click=${i=>{if(!(i.defaultPrevented||i.button!==0||i.metaKey||i.ctrlKey||i.shiftKey||i.altKey)){if(i.preventDefault(),t==="chat"){const s=yb(e);e.sessionKey!==s&&(bb(e,s),e.loadAssistantIdentity())}e.setTab(t)}}}
      title=${Yr(t)}
    >
      <span class="nav-item__icon" aria-hidden="true">${be[Av(t)]}</span>
      <span class="nav-item__text">${Yr(t)}</span>
    </a>
  `}function wb(e){const t=_b(e.hello,e.sessionsResult),n=Sb(e.sessionKey,e.sessionsResult,t),i=e.onboarding,s=e.onboarding,o=e.onboarding?!1:e.settings.chatShowThinking,r=e.onboarding?!0:e.settings.chatFocusMode,a=f`
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
          @change=${c=>{const d=c.target.value;e.sessionKey=d,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:d,lastActiveSessionKey:d}),e.loadAssistantIdentity(),Uv(e,d),Qn(e)}}
        >
          ${sf(n,c=>c.key,c=>f`<option value=${c.key} title=${c.key}>
                ${c.displayName??c.key}
              </option>`)}
        </select>
      </label>
      <button
        class="btn btn--sm btn--icon"
        ?disabled=${e.chatLoading||!e.connected}
        @click=${async()=>{const c=e;c.chatManualRefreshInFlight=!0,c.chatNewMessagesBelow=!1,await c.updateComplete,c.resetToolStream();try{await Kh(e,{scheduleScroll:!1}),c.scrollToBottom({smooth:!0})}finally{requestAnimationFrame(()=>{c.chatManualRefreshInFlight=!1,c.chatNewMessagesBelow=!1})}}}
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
        ${be.brain}
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
  `}function _b(e,t){var o,r,a,l,c;const n=e==null?void 0:e.snapshot,i=(r=(o=n==null?void 0:n.sessionDefaults)==null?void 0:o.mainSessionKey)==null?void 0:r.trim();if(i)return i;const s=(l=(a=n==null?void 0:n.sessionDefaults)==null?void 0:a.mainKey)==null?void 0:l.trim();return s||((c=t==null?void 0:t.sessions)!=null&&c.some(d=>d.key==="main")?"main":null)}const Ks={bluebubbles:"iMessage",telegram:"Telegram",discord:"Discord",signal:"Signal",slack:"Slack",whatsapp:"WhatsApp",matrix:"Matrix",email:"Email",sms:"SMS"},kb=Object.keys(Ks);function Bc(e){return e.charAt(0).toUpperCase()+e.slice(1)}function $b(e){if(e==="main"||e==="agent:main:main")return{prefix:"",fallbackName:"Main Session"};if(e.includes(":subagent:"))return{prefix:"Subagent:",fallbackName:"Subagent:"};if(e.includes(":cron:"))return{prefix:"Cron:",fallbackName:"Cron Job:"};const t=e.match(/^agent:[^:]+:([^:]+):direct:(.+)$/);if(t){const i=t[1],s=t[2];return{prefix:"",fallbackName:`${Ks[i]??Bc(i)} · ${s}`}}const n=e.match(/^agent:[^:]+:([^:]+):group:(.+)$/);if(n){const i=n[1];return{prefix:"",fallbackName:`${Ks[i]??Bc(i)} Group`}}for(const i of kb)if(e===i||e.startsWith(`${i}:`))return{prefix:"",fallbackName:`${Ks[i]} Session`};return{prefix:"",fallbackName:e}}function br(e,t){var a,l;const n=((a=t==null?void 0:t.label)==null?void 0:a.trim())||"",i=((l=t==null?void 0:t.displayName)==null?void 0:l.trim())||"",{prefix:s,fallbackName:o}=$b(e),r=c=>s?new RegExp(`^${s.replace(/[.*+?^${}()|[\\]\\]/g,"\\$&")}\\s*`,"i").test(c)?c:`${s} ${c}`:c;return n&&n!==e?r(n):i&&i!==e?r(i):o}function Sb(e,t,n){var a,l;const i=new Set,s=[],o=n&&((a=t==null?void 0:t.sessions)==null?void 0:a.find(c=>c.key===n)),r=(l=t==null?void 0:t.sessions)==null?void 0:l.find(c=>c.key===e);if(n&&(i.add(n),s.push({key:n,displayName:br(n,o||void 0)})),i.has(e)||(i.add(e),s.push({key:e,displayName:br(e,r)})),t!=null&&t.sessions)for(const c of t.sessions)i.has(c.key)||(i.add(c.key),s.push({key:c.key,displayName:br(c.key,c)}));return s}const Ab=["system","light","dark"];function Tb(e){const t=Math.max(0,Ab.indexOf(e.theme)),n=i=>s=>{const r={element:s.currentTarget};(s.clientX||s.clientY)&&(r.pointerClientX=s.clientX,r.pointerClientY=s.clientY),e.setTheme(i,r)};return f`
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
          ${Rb()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="light"?"active":""}"
          @click=${n("light")}
          aria-pressed=${e.theme==="light"}
          aria-label="Light theme"
          title="Light"
        >
          ${Cb()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="dark"?"active":""}"
          @click=${n("dark")}
          aria-pressed=${e.theme==="dark"}
          aria-label="Dark theme"
          title="Dark"
        >
          ${Eb()}
        </button>
      </div>
    </div>
  `}function Cb(){return f`
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
  `}function Eb(){return f`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
      ></path>
    </svg>
  `}function Rb(){return f`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="20" height="14" x="2" y="3" rx="2"></rect>
      <line x1="8" x2="16" y1="21" y2="21"></line>
      <line x1="12" x2="12" y1="17" y2="21"></line>
    </svg>
  `}function of(e,t){if(!e)return e;const i=e.files.some(s=>s.name===t.name)?e.files.map(s=>s.name===t.name?t:s):[...e.files,t];return{...e,files:i}}async function xr(e,t){if(!(!e.client||!e.connected||e.agentFilesLoading)){e.agentFilesLoading=!0,e.agentFilesError=null;try{const n=await e.client.request("agents.files.list",{agentId:t});n&&(e.agentFilesList=n,e.agentFileActive&&!n.files.some(i=>i.name===e.agentFileActive)&&(e.agentFileActive=null))}catch(n){e.agentFilesError=String(n)}finally{e.agentFilesLoading=!1}}}async function Lb(e,t,n,i){if(!(!e.client||!e.connected||e.agentFilesLoading)&&!Object.hasOwn(e.agentFileContents,n)){e.agentFilesLoading=!0,e.agentFilesError=null;try{const s=await e.client.request("agents.files.get",{agentId:t,name:n});if(s!=null&&s.file){const o=s.file.content??"",r=e.agentFileContents[n]??"",a=e.agentFileDrafts[n],l=(i==null?void 0:i.preserveDraft)??!0;e.agentFilesList=of(e.agentFilesList,s.file),e.agentFileContents={...e.agentFileContents,[n]:o},(!l||!Object.hasOwn(e.agentFileDrafts,n)||a===r)&&(e.agentFileDrafts={...e.agentFileDrafts,[n]:o})}}catch(s){e.agentFilesError=String(s)}finally{e.agentFilesLoading=!1}}}async function Pb(e,t,n,i){if(!(!e.client||!e.connected||e.agentFileSaving)){e.agentFileSaving=!0,e.agentFilesError=null;try{const s=await e.client.request("agents.files.set",{agentId:t,name:n,content:i});s!=null&&s.file&&(e.agentFilesList=of(e.agentFilesList,s.file),e.agentFileContents={...e.agentFileContents,[n]:i},e.agentFileDrafts={...e.agentFileDrafts,[n]:i})}catch(s){e.agentFilesError=String(s)}finally{e.agentFileSaving=!1}}}function rf(e){return e?`${Zs(e)} (${Cn(e)})`:"n/a"}function Mb(e){if(e==null)return"";try{return JSON.stringify(e,null,2)}catch{return String(e)}}function Db(e){const t=e.state??{},n=t.nextRunAtMs?Zs(t.nextRunAtMs):"n/a",i=t.lastRunAtMs?Zs(t.lastRunAtMs):"n/a";return`${t.lastStatus??"n/a"} · next ${n} · last ${i}`}function Ib(e){const t=e.schedule;if(t.kind==="at"){const n=Date.parse(t.at);return Number.isFinite(n)?`At ${Zs(n)}`:`At ${t.at}`}return t.kind==="every"?`Every ${ah(t.everyMs)}`:`Cron ${t.expr}${t.tz?` (${t.tz})`:""}`}function Ob(e){const t=e.payload;if(t.kind==="systemEvent")return`System: ${t.text}`;const n=`Agent: ${t.message}`,i=e.delivery;if(i&&i.mode!=="none"){const s=i.mode==="webhook"?i.to?` (${i.to})`:"":i.channel||i.to?` (${i.channel??"last"}${i.to?` -> ${i.to}`:""})`:"";return`${n} · ${i.mode}${s}`}return n}function Tt(e){const t=(e??"").trim();return t?t.replace(/\s+/g,"_").toLowerCase():""}function Fb(e){return[]}function Nb(e){return{allow:[],alsoAllow:[],deny:[]}}const zc=[{id:"fs",label:"Files",tools:[{id:"read",label:"read",description:"Read file contents"},{id:"write",label:"write",description:"Create or overwrite files"},{id:"edit",label:"edit",description:"Make precise edits"},{id:"apply_patch",label:"apply_patch",description:"Patch files (OpenAI)"}]},{id:"runtime",label:"Runtime",tools:[{id:"exec",label:"exec",description:"Run shell commands"},{id:"process",label:"process",description:"Manage background processes"}]},{id:"web",label:"Web",tools:[{id:"web_search",label:"web_search",description:"Search the web"},{id:"web_fetch",label:"web_fetch",description:"Fetch web content"}]},{id:"memory",label:"Memory",tools:[{id:"memory_search",label:"memory_search",description:"Semantic search"},{id:"memory_get",label:"memory_get",description:"Read memory files"}]},{id:"sessions",label:"Sessions",tools:[{id:"sessions_list",label:"sessions_list",description:"List sessions"},{id:"sessions_history",label:"sessions_history",description:"Session history"},{id:"sessions_send",label:"sessions_send",description:"Send to session"},{id:"sessions_spawn",label:"sessions_spawn",description:"Spawn sub-agent"},{id:"session_status",label:"session_status",description:"Session status"}]},{id:"ui",label:"UI",tools:[{id:"browser",label:"browser",description:"Control web browser"},{id:"canvas",label:"canvas",description:"Control canvases"}]},{id:"messaging",label:"Messaging",tools:[{id:"message",label:"message",description:"Send messages"}]},{id:"automation",label:"Automation",tools:[{id:"cron",label:"cron",description:"Schedule tasks"},{id:"gateway",label:"gateway",description:"Gateway control"}]},{id:"nodes",label:"Nodes",tools:[{id:"nodes",label:"nodes",description:"Nodes + devices"}]},{id:"agents",label:"Agents",tools:[{id:"agents_list",label:"agents_list",description:"List agents"}]},{id:"media",label:"Media",tools:[{id:"image",label:"image",description:"Image understanding"}]}],Bb=[{id:"minimal",label:"Minimal"},{id:"coding",label:"Coding"},{id:"messaging",label:"Messaging"},{id:"full",label:"Full"}];function sa(e){var t,n,i;return((t=e.name)==null?void 0:t.trim())||((i=(n=e.identity)==null?void 0:n.name)==null?void 0:i.trim())||e.id}function bs(e){const t=e.trim();if(!t||t.length>16)return!1;let n=!1;for(let i=0;i<t.length;i+=1)if(t.charCodeAt(i)>127){n=!0;break}return!(!n||t.includes("://")||t.includes("/")||t.includes("."))}function Do(e,t){var r,a,l,c,d,u;const n=(r=t==null?void 0:t.emoji)==null?void 0:r.trim();if(n&&bs(n))return n;const i=(l=(a=e.identity)==null?void 0:a.emoji)==null?void 0:l.trim();if(i&&bs(i))return i;const s=(c=t==null?void 0:t.avatar)==null?void 0:c.trim();if(s&&bs(s))return s;const o=(u=(d=e.identity)==null?void 0:d.avatar)==null?void 0:u.trim();return o&&bs(o)?o:""}function af(e,t){return t&&e===t?"default":null}function zb(e){if(e==null||!Number.isFinite(e))return"-";if(e<1024)return`${e} B`;const t=["KB","MB","GB","TB"];let n=e/1024,i=0;for(;n>=1024&&i<t.length-1;)n/=1024,i+=1;return`${n.toFixed(n<10?1:0)} ${t[i]}`}function Io(e,t){var o,r;const n=e;return{entry:(((o=n==null?void 0:n.agents)==null?void 0:o.list)??[]).find(a=>(a==null?void 0:a.id)===t),defaults:(r=n==null?void 0:n.agents)==null?void 0:r.defaults,globalTools:n==null?void 0:n.tools}}function Hc(e,t,n,i,s){var g,v,b,y,S,E,L,T,C,M,m,k;const o=Io(t,e.id),a=(n&&n.agentId===e.id?n.workspace:null)||((g=o.entry)==null?void 0:g.workspace)||((v=o.defaults)==null?void 0:v.workspace)||"default",l=(b=o.entry)!=null&&b.model?Ri((y=o.entry)==null?void 0:y.model):Ri((S=o.defaults)==null?void 0:S.model),c=((E=s==null?void 0:s.name)==null?void 0:E.trim())||((T=(L=e.identity)==null?void 0:L.name)==null?void 0:T.trim())||((C=e.name)==null?void 0:C.trim())||((M=o.entry)==null?void 0:M.name)||e.id,d=Do(e,s)||"-",u=Array.isArray((m=o.entry)==null?void 0:m.skills)?(k=o.entry)==null?void 0:k.skills:null,h=(u==null?void 0:u.length)??null;return{workspace:a,model:l,identityName:c,identityEmoji:d,skillsLabel:u?`${h} selected`:"all skills",isDefault:!!(i&&e.id===i)}}function Ri(e){var t;if(!e)return"-";if(typeof e=="string")return e.trim()||"-";if(typeof e=="object"&&e){const n=e,i=(t=n.primary)==null?void 0:t.trim();if(i){const s=Array.isArray(n.fallbacks)?n.fallbacks.length:0;return s>0?`${i} (+${s} fallback)`:i}}return"-"}function Uc(e){const t=e.match(/^(.+) \(\+\d+ fallback\)$/);return t?t[1]:e}function qc(e){if(!e)return null;if(typeof e=="string")return e.trim()||null;if(typeof e=="object"&&e){const t=e,n=typeof t.primary=="string"?t.primary:typeof t.model=="string"?t.model:typeof t.id=="string"?t.id:typeof t.value=="string"?t.value:null;return(n==null?void 0:n.trim())||null}return null}function Hb(e){if(!e||typeof e=="string")return null;if(typeof e=="object"&&e){const t=e,n=Array.isArray(t.fallbacks)?t.fallbacks:Array.isArray(t.fallback)?t.fallback:null;return n?n.filter(i=>typeof i=="string"):null}return null}function Ub(e){return e.split(",").map(t=>t.trim()).filter(Boolean)}function qb(e){var s,o,r;const t=e,n=(o=(s=t==null?void 0:t.agents)==null?void 0:s.defaults)==null?void 0:o.models;if(!n||typeof n!="object")return[];const i=[];for(const[a,l]of Object.entries(n)){const c=a.trim();if(!c)continue;const d=l&&typeof l=="object"&&"alias"in l&&typeof l.alias=="string"?(r=l.alias)==null?void 0:r.trim():void 0,u=d&&d!==c?`${d} (${c})`:c;i.push({value:c,label:u})}return i}function jb(e,t){const n=qb(e),i=t?n.some(s=>s.value===t):!1;return t&&!i&&n.unshift({value:t,label:`Current (${t})`}),n.length===0?f`
      <option value="" disabled>No configured models</option>
    `:n.map(s=>f`<option value=${s.value}>${s.label}</option>`)}function Kb(e){const t=Tt(e);if(!t)return{kind:"exact",value:""};if(t==="*")return{kind:"all"};if(!t.includes("*"))return{kind:"exact",value:t};const n=t.replace(/[.*+?^${}()|[\\]\\]/g,"\\$&");return{kind:"regex",value:new RegExp(`^${n.replaceAll("\\*",".*")}$`)}}function oa(e){return Array.isArray(e)?Fb().map(Kb).filter(t=>t.kind!=="exact"||t.value.length>0):[]}function Li(e,t){for(const n of t)if(n.kind==="all"||n.kind==="exact"&&e===n.value||n.kind==="regex"&&n.value.test(e))return!0;return!1}function Wb(e,t){if(!t)return!0;const n=Tt(e),i=oa(t.deny);if(Li(n,i))return!1;const s=oa(t.allow);return!!(s.length===0||Li(n,s)||n==="apply_patch"&&Li("exec",s))}function jc(e,t){if(!Array.isArray(t)||t.length===0)return!1;const n=Tt(e),i=oa(t);return!!(Li(n,i)||n==="apply_patch"&&Li("exec",i))}function Vb(e){return Nb()??void 0}function lf(e,t){return f`
    <section class="card">
      <div class="card-title">Agent Context</div>
      <div class="card-sub">${t}</div>
      <div class="agents-overview-grid" style="margin-top: 16px;">
        <div class="agent-kv">
          <div class="label">Workspace</div>
          <div class="mono">${e.workspace}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Primary Model</div>
          <div class="mono">${e.model}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Identity Name</div>
          <div>${e.identityName}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Identity Emoji</div>
          <div>${e.identityEmoji}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Skills Filter</div>
          <div>${e.skillsLabel}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Default</div>
          <div>${e.isDefault?"yes":"no"}</div>
        </div>
      </div>
    </section>
  `}function Gb(e,t){var i,s;const n=(i=e.channelMeta)==null?void 0:i.find(o=>o.id===t);return n!=null&&n.label?n.label:((s=e.channelLabels)==null?void 0:s[t])??t}function Qb(e){var s;if(!e)return[];const t=new Set;for(const o of e.channelOrder??[])t.add(o);for(const o of e.channelMeta??[])t.add(o.id);for(const o of Object.keys(e.channelAccounts??{}))t.add(o);const n=[],i=(s=e.channelOrder)!=null&&s.length?e.channelOrder:Array.from(t);for(const o of i)t.has(o)&&(n.push(o),t.delete(o));for(const o of t)n.push(o);return n.map(o=>{var r;return{id:o,label:Gb(e,o),accounts:((r=e.channelAccounts)==null?void 0:r[o])??[]}})}const Yb=["groupPolicy","streamMode","dmPolicy"];function Xb(e,t){if(!e)return null;const i=(e.channels??{})[t];if(i&&typeof i=="object")return i;const s=e[t];return s&&typeof s=="object"?s:null}function Jb(e){if(e==null)return"n/a";if(typeof e=="string"||typeof e=="number"||typeof e=="boolean")return String(e);try{return JSON.stringify(e)}catch{return"n/a"}}function Zb(e,t){const n=Xb(e,t);return n?Yb.flatMap(i=>i in n?[{label:i,value:Jb(n[i])}]:[]):[]}function ex(e){let t=0,n=0,i=0;for(const s of e){const o=s.probe&&typeof s.probe=="object"&&"ok"in s.probe?!!s.probe.ok:!1;(s.connected===!0||s.running===!0||o)&&(t+=1),s.configured&&(n+=1),s.enabled&&(i+=1)}return{total:e.length,connected:t,configured:n,enabled:i}}function tx(e){const t=Qb(e.snapshot),n=e.lastSuccess?Cn(e.lastSuccess):"never";return f`
    <section class="grid grid-cols-2">
      ${lf(e.context,"Workspace, identity, and model configuration.")}
      <section class="card">
        <div class="row" style="justify-content: space-between;">
          <div>
            <div class="card-title">Channels</div>
            <div class="card-sub">Gateway-wide channel status snapshot.</div>
          </div>
          <button class="btn btn--sm" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"Refreshing…":"Refresh"}
          </button>
        </div>
        <div class="muted" style="margin-top: 8px;">
          Last refresh: ${n}
        </div>
        ${e.error?f`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:$}
        ${e.snapshot?$:f`
                <div class="callout info" style="margin-top: 12px">Load channels to see live status.</div>
              `}
        ${t.length===0?f`
                <div class="muted" style="margin-top: 16px">No channels found.</div>
              `:f`
                <div class="list" style="margin-top: 16px;">
                  ${t.map(i=>{const s=ex(i.accounts),o=s.total?`${s.connected}/${s.total} connected`:"no accounts",r=s.configured?`${s.configured} configured`:"not configured",a=s.total?`${s.enabled} enabled`:"disabled",l=Zb(e.configForm,i.id);return f`
                      <div class="list-item">
                        <div class="list-main">
                          <div class="list-title">${i.label}</div>
                          <div class="list-sub mono">${i.id}</div>
                        </div>
                        <div class="list-meta">
                          <div>${o}</div>
                          <div>${r}</div>
                          <div>${a}</div>
                          ${l.length>0?l.map(c=>f`<div>${c.label}: ${c.value}</div>`):$}
                        </div>
                      </div>
                    `})}
                </div>
              `}
      </section>
    </section>
  `}function nx(e){var n,i;const t=e.jobs.filter(s=>s.agentId===e.agentId);return f`
    <section class="grid grid-cols-2">
      ${lf(e.context,"Workspace and scheduling targets.")}
      <section class="card">
        <div class="row" style="justify-content: space-between;">
          <div>
            <div class="card-title">Scheduler</div>
            <div class="card-sub">Gateway cron status.</div>
          </div>
          <button class="btn btn--sm" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"Refreshing…":"Refresh"}
          </button>
        </div>
        <div class="stat-grid" style="margin-top: 16px;">
          <div class="stat">
            <div class="stat-label">Enabled</div>
            <div class="stat-value">
              ${e.status?e.status.enabled?"Yes":"No":"n/a"}
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">Jobs</div>
            <div class="stat-value">${((n=e.status)==null?void 0:n.jobs)??"n/a"}</div>
          </div>
          <div class="stat">
            <div class="stat-label">Next wake</div>
            <div class="stat-value">${rf(((i=e.status)==null?void 0:i.nextWakeAtMs)??null)}</div>
          </div>
        </div>
        ${e.error?f`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:$}
      </section>
    </section>
    <section class="card">
      <div class="card-title">Agent Cron Jobs</div>
      <div class="card-sub">Scheduled jobs targeting this agent.</div>
      ${t.length===0?f`
              <div class="muted" style="margin-top: 16px">No jobs assigned.</div>
            `:f`
              <div class="list" style="margin-top: 16px;">
                ${t.map(s=>f`
                    <div class="list-item">
                      <div class="list-main">
                        <div class="list-title">${s.name}</div>
                        ${s.description?f`<div class="list-sub">${s.description}</div>`:$}
                        <div class="chip-row" style="margin-top: 6px;">
                          <span class="chip">${Ib(s)}</span>
                          <span class="chip ${s.enabled?"chip-ok":"chip-warn"}">
                            ${s.enabled?"enabled":"disabled"}
                          </span>
                          <span class="chip">${s.sessionTarget}</span>
                        </div>
                      </div>
                      <div class="list-meta">
                        <div class="mono">${Db(s)}</div>
                        <div class="muted">${Ob(s)}</div>
                      </div>
                    </div>
                  `)}
              </div>
            `}
    </section>
  `}function ix(e){var l;const t=((l=e.agentFilesList)==null?void 0:l.agentId)===e.agentId?e.agentFilesList:null,n=(t==null?void 0:t.files)??[],i=e.agentFileActive??null,s=i?n.find(c=>c.name===i)??null:null,o=i?e.agentFileContents[i]??"":"",r=i?e.agentFileDrafts[i]??o:"",a=i?r!==o:!1;return f`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Core Files</div>
          <div class="card-sub">Bootstrap persona, identity, and tool guidance.</div>
        </div>
        <button
          class="btn btn--sm"
          ?disabled=${e.agentFilesLoading}
          @click=${()=>e.onLoadFiles(e.agentId)}
        >
          ${e.agentFilesLoading?"Loading…":"Refresh"}
        </button>
      </div>
      ${t?f`<div class="muted mono" style="margin-top: 8px;">Workspace: ${t.workspace}</div>`:$}
      ${e.agentFilesError?f`<div class="callout danger" style="margin-top: 12px;">${e.agentFilesError}</div>`:$}
      ${t?f`
              <div class="agent-files-grid" style="margin-top: 16px;">
                <div class="agent-files-list">
                  ${n.length===0?f`
                          <div class="muted">No files found.</div>
                        `:n.map(c=>sx(c,i,()=>e.onSelectFile(c.name)))}
                </div>
                <div class="agent-files-editor">
                  ${s?f`
                          <div class="agent-file-header">
                            <div>
                              <div class="agent-file-title mono">${s.name}</div>
                              <div class="agent-file-sub mono">${s.path}</div>
                            </div>
                            <div class="agent-file-actions">
                              <button
                                class="btn btn--sm"
                                ?disabled=${!a}
                                @click=${()=>e.onFileReset(s.name)}
                              >
                                Reset
                              </button>
                              <button
                                class="btn btn--sm primary"
                                ?disabled=${e.agentFileSaving||!a}
                                @click=${()=>e.onFileSave(s.name)}
                              >
                                ${e.agentFileSaving?"Saving…":"Save"}
                              </button>
                            </div>
                          </div>
                          ${s.missing?f`
                                  <div class="callout info" style="margin-top: 10px">
                                    This file is missing. Saving will create it in the agent workspace.
                                  </div>
                                `:$}
                          <label class="field" style="margin-top: 12px;">
                            <span>Content</span>
                            <textarea
                              .value=${r}
                              @input=${c=>e.onFileDraftChange(s.name,c.target.value)}
                            ></textarea>
                          </label>
                        `:f`
                          <div class="muted">Select a file to edit.</div>
                        `}
                </div>
              </div>
            `:f`
              <div class="callout info" style="margin-top: 12px">
                Load the agent workspace files to edit core instructions.
              </div>
            `}
    </section>
  `}function sx(e,t,n){const i=e.missing?"Missing":`${zb(e.size)} · ${Cn(e.updatedAtMs??null)}`;return f`
    <button
      type="button"
      class="agent-file-row ${t===e.name?"active":""}"
      @click=${n}
    >
      <div>
        <div class="agent-file-name mono">${e.name}</div>
        <div class="agent-file-meta">${i}</div>
      </div>
      ${e.missing?f`
              <span class="agent-pill warn">missing</span>
            `:$}
    </button>
  `}const xs=[{id:"workspace",label:"Workspace Skills",sources:["openclaw-workspace"]},{id:"built-in",label:"Built-in Skills",sources:["openclaw-bundled"]},{id:"installed",label:"Installed Skills",sources:["openclaw-managed"]},{id:"extra",label:"Extra Skills",sources:["openclaw-extra"]}];function cf(e){var o;const t=new Map;for(const r of xs)t.set(r.id,{id:r.id,label:r.label,skills:[]});const n=xs.find(r=>r.id==="built-in"),i={id:"other",label:"Other Skills",skills:[]};for(const r of e){const a=r.bundled?n:xs.find(l=>l.sources.includes(r.source));a?(o=t.get(a.id))==null||o.skills.push(r):i.skills.push(r)}const s=xs.map(r=>t.get(r.id)).filter(r=>!!(r&&r.skills.length>0));return i.skills.length>0&&s.push(i),s}function df(e){return[...e.missing.bins.map(t=>`bin:${t}`),...e.missing.env.map(t=>`env:${t}`),...e.missing.config.map(t=>`config:${t}`),...e.missing.os.map(t=>`os:${t}`)]}function uf(e){const t=[];return e.disabled&&t.push("disabled"),e.blockedByAllowlist&&t.push("blocked by allowlist"),t}function hf(e){const t=e.skill,n=!!e.showBundledBadge;return f`
    <div class="chip-row" style="margin-top: 6px;">
      <span class="chip">${t.source}</span>
      ${n?f`
              <span class="chip">bundled</span>
            `:$}
      <span class="chip ${t.eligible?"chip-ok":"chip-warn"}">
        ${t.eligible?"eligible":"blocked"}
      </span>
      ${t.disabled?f`
              <span class="chip chip-warn">disabled</span>
            `:$}
    </div>
  `}function ox(e){var S;const t=Io(e.configForm,e.agentId),n=((S=t.entry)==null?void 0:S.tools)??{},i=t.globalTools??{},s=n.profile??i.profile??"full",o=n.profile?"agent override":i.profile?"global default":"default",r=Array.isArray(n.allow)&&n.allow.length>0,a=Array.isArray(i.allow)&&i.allow.length>0,l=!!e.configForm&&!e.configLoading&&!e.configSaving&&!r,c=r?[]:Array.isArray(n.alsoAllow)?n.alsoAllow:[],d=r?[]:Array.isArray(n.deny)?n.deny:[],u=r?{allow:n.allow??[],deny:n.deny??[]}:Vb()??void 0,h=zc.flatMap(E=>E.tools.map(L=>L.id)),g=E=>{const L=Wb(E,u),T=jc(E,c),C=jc(E,d);return{allowed:(L||T)&&!C,baseAllowed:L,denied:C}},v=h.filter(E=>g(E).allowed).length,b=(E,L)=>{const T=new Set(c.map(k=>Tt(k)).filter(k=>k.length>0)),C=new Set(d.map(k=>Tt(k)).filter(k=>k.length>0)),M=g(E).baseAllowed,m=Tt(E);L?(C.delete(m),M||T.add(m)):(T.delete(m),C.add(m)),e.onOverridesChange(e.agentId,[...T],[...C])},y=E=>{const L=new Set(c.map(C=>Tt(C)).filter(C=>C.length>0)),T=new Set(d.map(C=>Tt(C)).filter(C=>C.length>0));for(const C of h){const M=g(C).baseAllowed,m=Tt(C);E?(T.delete(m),M||L.add(m)):(L.delete(m),T.add(m))}e.onOverridesChange(e.agentId,[...L],[...T])};return f`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Tool Access</div>
          <div class="card-sub">
            Profile + per-tool overrides for this agent.
            <span class="mono">${v}/${h.length}</span> enabled.
          </div>
        </div>
        <div class="row" style="gap: 8px;">
          <button class="btn btn--sm" ?disabled=${!l} @click=${()=>y(!0)}>
            Enable All
          </button>
          <button class="btn btn--sm" ?disabled=${!l} @click=${()=>y(!1)}>
            Disable All
          </button>
          <button class="btn btn--sm" ?disabled=${e.configLoading} @click=${e.onConfigReload}>
            Reload Config
          </button>
          <button
            class="btn btn--sm primary"
            ?disabled=${e.configSaving||!e.configDirty}
            @click=${e.onConfigSave}
          >
            ${e.configSaving?"Saving…":"Save"}
          </button>
        </div>
      </div>

      ${e.configForm?$:f`
              <div class="callout info" style="margin-top: 12px">
                Load the gateway config to adjust tool profiles.
              </div>
            `}
      ${r?f`
              <div class="callout info" style="margin-top: 12px">
                This agent is using an explicit allowlist in config. Tool overrides are managed in the Config tab.
              </div>
            `:$}
      ${a?f`
              <div class="callout info" style="margin-top: 12px">
                Global tools.allow is set. Agent overrides cannot enable tools that are globally blocked.
              </div>
            `:$}

      <div class="agent-tools-meta" style="margin-top: 16px;">
        <div class="agent-kv">
          <div class="label">Profile</div>
          <div class="mono">${s}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Source</div>
          <div>${o}</div>
        </div>
        ${e.configDirty?f`
                <div class="agent-kv">
                  <div class="label">Status</div>
                  <div class="mono">unsaved</div>
                </div>
              `:$}
      </div>

      <div class="agent-tools-presets" style="margin-top: 16px;">
        <div class="label">Quick Presets</div>
        <div class="agent-tools-buttons">
          ${Bb.map(E=>f`
              <button
                class="btn btn--sm ${s===E.id?"active":""}"
                ?disabled=${!l}
                @click=${()=>e.onProfileChange(e.agentId,E.id,!0)}
              >
                ${E.label}
              </button>
            `)}
          <button
            class="btn btn--sm"
            ?disabled=${!l}
            @click=${()=>e.onProfileChange(e.agentId,null,!1)}
          >
            Inherit
          </button>
        </div>
      </div>

      <div class="agent-tools-grid" style="margin-top: 20px;">
        ${zc.map(E=>f`
              <div class="agent-tools-section">
                <div class="agent-tools-header">${E.label}</div>
                <div class="agent-tools-list">
                  ${E.tools.map(L=>{const{allowed:T}=g(L.id);return f`
                      <div class="agent-tool-row">
                        <div>
                          <div class="agent-tool-title mono">${L.label}</div>
                          <div class="agent-tool-sub">${L.description}</div>
                        </div>
                        <label class="cfg-toggle">
                          <input
                            type="checkbox"
                            .checked=${T}
                            ?disabled=${!l}
                            @change=${C=>b(L.id,C.target.checked)}
                          />
                          <span class="cfg-toggle__track"></span>
                        </label>
                      </div>
                    `})}
                </div>
              </div>
            `)}
      </div>
    </section>
  `}function rx(e){var g,v,b;const t=!!e.configForm&&!e.configLoading&&!e.configSaving,n=Io(e.configForm,e.agentId),i=Array.isArray((g=n.entry)==null?void 0:g.skills)?(v=n.entry)==null?void 0:v.skills:void 0,s=new Set((i??[]).map(y=>y.trim()).filter(Boolean)),o=i!==void 0,r=!!(e.report&&e.activeAgentId===e.agentId),a=r?((b=e.report)==null?void 0:b.skills)??[]:[],l=e.filter.trim().toLowerCase(),c=l?a.filter(y=>[y.name,y.description,y.source].join(" ").toLowerCase().includes(l)):a,d=cf(c),u=o?a.filter(y=>s.has(y.name)).length:a.length,h=a.length;return f`
    <section class="card" style="margin-bottom: 12px;">
      <div class="callout info" style="margin-bottom: 12px;">
        ${p("agents.reports.whereHint")}
      </div>
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">${p("agents.reports.title")}</div>
          <div class="card-sub">${p("agents.reports.subtitle")}</div>
        </div>
        <button class="btn btn--sm" ?disabled=${e.reportsLoading} @click=${e.onReportsRefresh}>
          ${e.reportsLoading?p("common.loading"):p("common.refresh")}
        </button>
      </div>
      <div class="filters" style="margin-top: 12px;">
        <label class="field" style="flex: 1;">
          <span>${p("agents.reports.tokenLabel")}</span>
          <input
            .value=${e.reportsAdminToken}
            placeholder="x-reports-token"
            @input=${y=>e.onReportsTokenChange(y.target.value)}
          />
        </label>
      </div>
      ${e.reportsError?f`<div class="callout danger" style="margin-top: 12px;">${e.reportsError}</div>`:$}
      <div style="margin-top: 12px;">
        <div class="label">${p("agents.reports.tasks")}</div>
        ${e.reportsTasks.length===0?f`<div class="muted">${p("agents.reports.noTasks")}</div>`:f`
                <div class="list">
                  ${e.reportsTasks.map(y=>{const S=e.reportsEditingTaskId===y.task_key,E=S?e.reportsEditForm:{};return f`
                      <div class="list-item">
                        <div class="list-main">
                          <div class="list-title">${y.title} <span class="mono">(${y.task_key})</span></div>
                          <div class="list-sub">
                            enabled=${String(S?!!(E.enabled??y.enabled):y.enabled)},
                            cron=${S?E.cron_expr??y.cron_expr:y.cron_expr},
                            tz=${S?E.timezone??y.timezone:y.timezone}
                          </div>
                          ${S?f`
                                  <div class="row" style="gap: 8px; margin-top: 8px; flex-wrap: wrap;">
                                    <label class="field" style="min-width: 170px;">
                                      <span>${p("agents.reports.enabled")}</span>
                                      <select
                                        .value=${String(!!(E.enabled??y.enabled))}
                                        @change=${L=>e.onReportsEditChange({...E,enabled:L.target.value==="true"})}
                                      >
                                        <option value="true">true</option>
                                        <option value="false">false</option>
                                      </select>
                                    </label>
                                    <label class="field" style="min-width: 220px;">
                                      <span>${p("agents.reports.cron")}</span>
                                      <input
                                        .value=${E.cron_expr??y.cron_expr}
                                        @input=${L=>e.onReportsEditChange({...E,cron_expr:L.target.value})}
                                      />
                                    </label>
                                    <label class="field" style="min-width: 180px;">
                                      <span>${p("agents.reports.timezone")}</span>
                                      <input
                                        .value=${E.timezone??y.timezone}
                                        @input=${L=>e.onReportsEditChange({...E,timezone:L.target.value})}
                                      />
                                    </label>
                                  </div>
                                `:$}
                        </div>
                        <div class="list-meta row" style="gap: 6px;">
                          <button class="btn btn--sm" @click=${()=>e.onReportsRun(y.task_key)}>
                            ${p("agents.reports.run")}
                          </button>
                          ${S?f`
                                  <button class="btn btn--sm primary" @click=${()=>e.onReportsEditSave(y.task_key)}>${p("common.save")}</button>
                                  <button class="btn btn--sm" @click=${e.onReportsEditCancel}>${p("common.cancel")}</button>
                                `:f`<button class="btn btn--sm" @click=${()=>e.onReportsEditStart(y)}>${p("common.edit")}</button>`}
                        </div>
                      </div>
                    `})}
                </div>
              `}
      </div>
      <div style="margin-top: 12px;">
        <div class="label">${p("agents.reports.latestRecords")}</div>
        ${e.reportsRecords.length===0?f`<div class="muted">${p("agents.reports.noRecords")}</div>`:f`
                <div class="list">
                  ${e.reportsRecords.map(y=>f`
                      <div class="list-item">
                        <div class="list-main">
                          <div class="list-title">
                            #${y.id} ${y.task_key} - <span class="mono">${y.status}</span>
                          </div>
                          <div class="list-sub">${y.started_at}${y.finished_at?` -> ${y.finished_at}`:""}</div>
                          ${y.error_message?f`<div class="muted">error: ${y.error_message}</div>`:$}
                        </div>
                      </div>
                    `)}
                </div>
              `}
      </div>
    </section>
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Skills</div>
          <div class="card-sub">
            Per-agent skill allowlist and workspace skills.
            ${h>0?f`<span class="mono">${u}/${h}</span>`:$}
          </div>
        </div>
        <div class="row" style="gap: 8px;">
          <button class="btn btn--sm" ?disabled=${!t} @click=${()=>e.onClear(e.agentId)}>
            Use All
          </button>
          <button
            class="btn btn--sm"
            ?disabled=${!t}
            @click=${()=>e.onDisableAll(e.agentId)}
          >
            Disable All
          </button>
          <button class="btn btn--sm" ?disabled=${e.configLoading} @click=${e.onConfigReload}>
            Reload Config
          </button>
          <button class="btn btn--sm" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"Loading…":"Refresh"}
          </button>
          <button
            class="btn btn--sm primary"
            ?disabled=${e.configSaving||!e.configDirty}
            @click=${e.onConfigSave}
          >
            ${e.configSaving?"Saving…":"Save"}
          </button>
        </div>
      </div>

      ${e.configForm?$:f`
              <div class="callout info" style="margin-top: 12px">
                Load the gateway config to set per-agent skills.
              </div>
            `}
      ${o?f`
              <div class="callout info" style="margin-top: 12px">This agent uses a custom skill allowlist.</div>
            `:f`
              <div class="callout info" style="margin-top: 12px">
                All skills are enabled. Disabling any skill will create a per-agent allowlist.
              </div>
            `}
      ${!r&&!e.loading?f`
              <div class="callout info" style="margin-top: 12px">
                Load skills for this agent to view workspace-specific entries.
              </div>
            `:$}
      ${e.error?f`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:$}

      <div class="filters" style="margin-top: 14px;">
        <label class="field" style="flex: 1;">
          <span>Filter</span>
          <input
            .value=${e.filter}
            @input=${y=>e.onFilterChange(y.target.value)}
            placeholder="Search skills"
          />
        </label>
        <div class="muted">${c.length} shown</div>
      </div>

      ${c.length===0?f`
              <div class="muted" style="margin-top: 16px">No skills found.</div>
            `:f`
              <div class="agent-skills-groups" style="margin-top: 16px;">
                ${d.map(y=>ax(y,{agentId:e.agentId,allowSet:s,usingAllowlist:o,editable:t,onToggle:e.onToggle}))}
              </div>
            `}
    </section>
  `}function ax(e,t){const n=e.id==="workspace"||e.id==="built-in";return f`
    <details class="agent-skills-group" ?open=${!n}>
      <summary class="agent-skills-header">
        <span>${e.label}</span>
        <span class="muted">${e.skills.length}</span>
      </summary>
      <div class="list skills-grid">
        ${e.skills.map(i=>lx(i,{agentId:t.agentId,allowSet:t.allowSet,usingAllowlist:t.usingAllowlist,editable:t.editable,onToggle:t.onToggle}))}
      </div>
    </details>
  `}function lx(e,t){const n=t.usingAllowlist?t.allowSet.has(e.name):!0,i=df(e),s=uf(e);return f`
    <div class="list-item agent-skill-row">
      <div class="list-main">
        <div class="list-title">${e.emoji?`${e.emoji} `:""}${e.name}</div>
        <div class="list-sub">${e.description}</div>
        ${hf({skill:e})}
        ${i.length>0?f`<div class="muted" style="margin-top: 6px;">Missing: ${i.join(", ")}</div>`:$}
        ${s.length>0?f`<div class="muted" style="margin-top: 6px;">Reason: ${s.join(", ")}</div>`:$}
      </div>
      <div class="list-meta">
        <label class="cfg-toggle">
          <input
            type="checkbox"
            .checked=${n}
            ?disabled=${!t.editable}
            @change=${o=>t.onToggle(t.agentId,e.name,o.target.checked)}
          />
          <span class="cfg-toggle__track"></span>
        </label>
      </div>
    </div>
  `}function cx(e){var o,r,a;const t=((o=e.agentsList)==null?void 0:o.agents)??[],n=((r=e.agentsList)==null?void 0:r.defaultId)??null,i=e.selectedAgentId??n??((a=t[0])==null?void 0:a.id)??null,s=i?t.find(l=>l.id===i)??null:null;return f`
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
        ${e.error?f`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:$}
        <div class="agent-list" style="margin-top: 12px;">
          ${t.length===0?f`
                  <div class="muted">No agents found.</div>
                `:t.map(l=>{const c=af(l.id,n),d=Do(l,e.agentIdentityById[l.id]??null);return f`
                    <button
                      type="button"
                      class="agent-row ${i===l.id?"active":""}"
                      @click=${()=>e.onSelectAgent(l.id)}
                    >
                      <div class="agent-avatar">${d||sa(l).slice(0,1)}</div>
                      <div class="agent-info">
                        <div class="agent-title">${sa(l)}</div>
                        <div class="agent-sub mono">${l.id}</div>
                      </div>
                      ${c?f`<span class="agent-pill">${c}</span>`:$}
                    </button>
                  `})}
        </div>
      </section>
      <section class="agents-main">
        ${s?f`
                ${dx(s,n,e.agentIdentityById[s.id]??null)}
                ${ux(e.activePanel,l=>e.onSelectPanel(l))}
                ${e.activePanel==="overview"?hx({agent:s,defaultId:n,configForm:e.configForm,agentFilesList:e.agentFilesList,agentIdentity:e.agentIdentityById[s.id]??null,agentIdentityError:e.agentIdentityError,agentIdentityLoading:e.agentIdentityLoading,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave,onModelChange:e.onModelChange,onModelFallbacksChange:e.onModelFallbacksChange}):$}
                ${e.activePanel==="files"?ix({agentId:s.id,agentFilesList:e.agentFilesList,agentFilesLoading:e.agentFilesLoading,agentFilesError:e.agentFilesError,agentFileActive:e.agentFileActive,agentFileContents:e.agentFileContents,agentFileDrafts:e.agentFileDrafts,agentFileSaving:e.agentFileSaving,onLoadFiles:e.onLoadFiles,onSelectFile:e.onSelectFile,onFileDraftChange:e.onFileDraftChange,onFileReset:e.onFileReset,onFileSave:e.onFileSave}):$}
                ${e.activePanel==="tools"?ox({agentId:s.id,configForm:e.configForm,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,onProfileChange:e.onToolsProfileChange,onOverridesChange:e.onToolsOverridesChange,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):$}
                ${e.activePanel==="skills"?rx({agentId:s.id,report:e.agentSkillsReport,loading:e.agentSkillsLoading,error:e.agentSkillsError,activeAgentId:e.agentSkillsAgentId,configForm:e.configForm,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,filter:e.skillsFilter,onFilterChange:e.onSkillsFilterChange,onRefresh:e.onSkillsRefresh,onToggle:e.onAgentSkillToggle,onClear:e.onAgentSkillsClear,onDisableAll:e.onAgentSkillsDisableAll,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave,reportsLoading:e.reportsLoading,reportsError:e.reportsError,reportsTasks:e.reportsTasks,reportsRecords:e.reportsRecords,reportsAdminToken:e.reportsAdminToken,reportsEditingTaskId:e.reportsEditingTaskId,reportsEditForm:e.reportsEditForm,onReportsTokenChange:e.onReportsTokenChange,onReportsRefresh:e.onReportsRefresh,onReportsRun:e.onReportsRun,onReportsEditStart:e.onReportsEditStart,onReportsEditCancel:e.onReportsEditCancel,onReportsEditChange:e.onReportsEditChange,onReportsEditSave:e.onReportsEditSave}):$}
                ${e.activePanel==="channels"?tx({context:Hc(s,e.configForm,e.agentFilesList,n,e.agentIdentityById[s.id]??null),configForm:e.configForm,snapshot:e.channelsSnapshot,loading:e.channelsLoading,error:e.channelsError,lastSuccess:e.channelsLastSuccess,onRefresh:e.onChannelsRefresh}):$}
                ${e.activePanel==="cron"?nx({context:Hc(s,e.configForm,e.agentFilesList,n,e.agentIdentityById[s.id]??null),agentId:s.id,jobs:e.cronJobs,status:e.cronStatus,loading:e.cronLoading,error:e.cronError,onRefresh:e.onCronRefresh}):$}
              `:f`
                <div class="card">
                  <div class="card-title">Select an agent</div>
                  <div class="card-sub">Pick an agent to inspect its workspace and tools.</div>
                </div>
              `}
      </section>
    </div>
  `}function dx(e,t,n){var a,l;const i=af(e.id,t),s=sa(e),o=((l=(a=e.identity)==null?void 0:a.theme)==null?void 0:l.trim())||"Agent workspace and routing.",r=Do(e,n);return f`
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
        ${i?f`<span class="agent-pill">${i}</span>`:$}
      </div>
    </section>
  `}function ux(e,t){return f`
    <div class="agent-tabs">
      ${[{id:"overview",label:"Overview"},{id:"files",label:"Files"},{id:"tools",label:"Tools"},{id:"skills",label:"Skills"},{id:"channels",label:"Channels"},{id:"cron",label:"成单"}].map(i=>f`
          <button
            class="agent-tab ${e===i.id?"active":""}"
            type="button"
            @click=${()=>t(i.id)}
          >
            ${i.label}
          </button>
        `)}
    </div>
  `}function hx(e){var I,V,le,z,J,ge,Q,Se,se,Te,te,xe,K,G,oe,de;const{agent:t,configForm:n,agentFilesList:i,agentIdentity:s,agentIdentityLoading:o,agentIdentityError:r,configLoading:a,configSaving:l,configDirty:c,onConfigReload:d,onConfigSave:u,onModelChange:h,onModelFallbacksChange:g}=e,v=Io(n,t.id),y=(i&&i.agentId===t.id?i.workspace:null)||((I=v.entry)==null?void 0:I.workspace)||((V=v.defaults)==null?void 0:V.workspace)||"default",S=(le=v.entry)!=null&&le.model?Ri((z=v.entry)==null?void 0:z.model):Ri((J=v.defaults)==null?void 0:J.model),E=Ri((ge=v.defaults)==null?void 0:ge.model),L=qc((Q=v.entry)==null?void 0:Q.model)||(S!=="-"?Uc(S):null),T=qc((Se=v.defaults)==null?void 0:Se.model)||(E!=="-"?Uc(E):null),C=L??T??null,M=Hb((se=v.entry)==null?void 0:se.model),m=M?M.join(", "):"",k=((Te=s==null?void 0:s.name)==null?void 0:Te.trim())||((xe=(te=t.identity)==null?void 0:te.name)==null?void 0:xe.trim())||((K=t.name)==null?void 0:K.trim())||((G=v.entry)==null?void 0:G.name)||"-",D=Do(t,s)||"-",P=Array.isArray((oe=v.entry)==null?void 0:oe.skills)?(de=v.entry)==null?void 0:de.skills:null,F=(P==null?void 0:P.length)??null,N=o?"Loading…":r?"Unavailable":"",B=!!(e.defaultId&&t.id===e.defaultId);return f`
    <section class="card">
      <div class="card-title">Overview</div>
      <div class="card-sub">Workspace paths and identity metadata.</div>
      <div class="agents-overview-grid" style="margin-top: 16px;">
        <div class="agent-kv">
          <div class="label">Workspace</div>
          <div class="mono">${y}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Primary Model</div>
          <div class="mono">${S}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Identity Name</div>
          <div>${k}</div>
          ${N?f`<div class="agent-kv-sub muted">${N}</div>`:$}
        </div>
        <div class="agent-kv">
          <div class="label">Default</div>
          <div>${B?"yes":"no"}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Identity Emoji</div>
          <div>${D}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Skills Filter</div>
          <div>${P?`${F} selected`:"all skills"}</div>
        </div>
      </div>

      <div class="agent-model-select" style="margin-top: 20px;">
        <div class="label">Model Selection</div>
        <div class="row" style="gap: 12px; flex-wrap: wrap;">
          <label class="field" style="min-width: 260px; flex: 1;">
            <span>Primary model${B?" (default)":""}</span>
            <select
              .value=${C??""}
              ?disabled=${!n||a||l}
              @change=${Me=>h(t.id,Me.target.value||null)}
            >
              ${B?$:f`
                      <option value="">
                        ${T?`Inherit default (${T})`:"Inherit default"}
                      </option>
                    `}
              ${jb(n,C??void 0)}
            </select>
          </label>
          <label class="field" style="min-width: 260px; flex: 1;">
            <span>Fallbacks (comma-separated)</span>
            <input
              .value=${m}
              ?disabled=${!n||a||l}
              placeholder="provider/model, provider/model"
              @input=${Me=>g(t.id,Ub(Me.target.value))}
            />
          </label>
        </div>
        <div class="row" style="justify-content: flex-end; gap: 8px;">
          <button class="btn btn--sm" ?disabled=${a} @click=${d}>
            Reload Config
          </button>
          <button
            class="btn btn--sm primary"
            ?disabled=${l||!c}
            @click=${u}
          >
            ${l?"Saving…":"Save"}
          </button>
        </div>
      </div>
    </section>
  `}function Kc(e){var t;e&&((t=navigator.clipboard)==null||t.writeText(e).catch(()=>{}))}function fx(e){const{loading:t,saving:n,error:i,content:s,lastSuccessAt:o,dependentFiles:r,onReload:a,onSave:l,onContentChange:c}=e,d=o!=null?new Date(o).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"";return f`
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
              </span>`:$}
          <button class="btn" ?disabled=${t} @click=${a}>
            ${p(t?"businessKnowledge.actions.reloading":"businessKnowledge.actions.reload")}
          </button>
          <button class="btn btn--primary" ?disabled=${t||n} @click=${()=>l(s)}>
            ${p(n?"businessKnowledge.actions.saving":"businessKnowledge.actions.save")}
          </button>
        </div>
      </div>
      ${i?f`<div class="callout danger" style="margin-top: 12px;">${i}</div>`:$}
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
                        @click=${()=>Kc(r.mapping_table)}
                        title=${p("businessKnowledge.relatedFiles.copyPath")}
                      >
                        ${p("businessKnowledge.relatedFiles.copyPath")}
                      </button>
                    </div>
                  `:$}
              ${r.price_library?f`
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                      <span style="min-width: 100px;">
                        ${p("businessKnowledge.relatedFiles.priceLibraryLabel")}
                      </span>
                      <code style="flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; font-size: 0.85rem;">${r.price_library}</code>
                      <button
                        class="btn"
                        style="flex-shrink: 0;"
                        @click=${()=>Kc(r.price_library)}
                        title=${p("businessKnowledge.relatedFiles.copyPath")}
                      >
                        ${p("businessKnowledge.relatedFiles.copyPath")}
                      </button>
                    </div>
                  `:$}
            </div>
          `:$}
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
 */const Pi=(e,t)=>{var i;const n=e._$AN;if(n===void 0)return!1;for(const s of n)(i=s._$AO)==null||i.call(s,t,!1),Pi(s,t);return!0},oo=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while((n==null?void 0:n.size)===0)},ff=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),mx(t)}};function px(e){this._$AN!==void 0?(oo(this),this._$AM=e,ff(this)):this._$AM=e}function gx(e,t=!1,n=0){const i=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(t)if(Array.isArray(i))for(let o=n;o<i.length;o++)Pi(i[o],!1),oo(i[o]);else i!=null&&(Pi(i,!1),oo(i));else Pi(this,e)}const mx=e=>{e.type==ol.CHILD&&(e._$AP??(e._$AP=gx),e._$AQ??(e._$AQ=px))};class vx extends al{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,n,i){super._$AT(t,n,i),ff(this),this.isConnected=t._$AU}_$AO(t,n=!0){var i,s;t!==this.isConnected&&(this.isConnected=t,t?(i=this.reconnected)==null||i.call(this):(s=this.disconnected)==null||s.call(this)),n&&(Pi(this,t),oo(this))}setValue(t){if(pb(this._$Ct))this._$Ct._$AI(t,this);else{const n=[...this._$Ct._$AH];n[this._$Ci]=t,this._$Ct._$AI(n,this,0)}}disconnected(){}reconnected(){}}const wr=new WeakMap,yx=rl(class extends vx{render(e){return $}update(e,[t]){var i;const n=t!==this.G;return n&&this.G!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=(i=e.options)==null?void 0:i.host,this.rt(this.ct=e.element)),$}rt(e){if(this.isConnected||(e=void 0),typeof this.G=="function"){const t=this.ht??globalThis;let n=wr.get(t);n===void 0&&(n=new WeakMap,wr.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){var e,t;return typeof this.G=="function"?(e=wr.get(this.ht??globalThis))==null?void 0:e.get(this.G):(t=this.G)==null?void 0:t.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ra extends al{constructor(t){if(super(t),this.it=$,t.type!==ol.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===$||t==null)return this._t=void 0,this.it=t;if(t===Ht)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}ra.directiveName="unsafeHTML",ra.resultType=1;const ro=rl(ra);/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:pf,setPrototypeOf:Wc,isFrozen:bx,getPrototypeOf:xx,getOwnPropertyDescriptor:wx}=Object;let{freeze:Oe,seal:Ye,create:aa}=Object,{apply:la,construct:ca}=typeof Reflect<"u"&&Reflect;Oe||(Oe=function(t){return t});Ye||(Ye=function(t){return t});la||(la=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),o=2;o<i;o++)s[o-2]=arguments[o];return t.apply(n,s)});ca||(ca=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const ws=Fe(Array.prototype.forEach),_x=Fe(Array.prototype.lastIndexOf),Vc=Fe(Array.prototype.pop),ai=Fe(Array.prototype.push),kx=Fe(Array.prototype.splice),Ws=Fe(String.prototype.toLowerCase),_r=Fe(String.prototype.toString),kr=Fe(String.prototype.match),li=Fe(String.prototype.replace),$x=Fe(String.prototype.indexOf),Sx=Fe(String.prototype.trim),Xe=Fe(Object.prototype.hasOwnProperty),De=Fe(RegExp.prototype.test),ci=Ax(TypeError);function Fe(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return la(e,t,i)}}function Ax(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return ca(e,n)}}function Y(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ws;Wc&&Wc(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const o=n(s);o!==s&&(bx(t)||(t[i]=o),s=o)}e[s]=!0}return e}function Tx(e){for(let t=0;t<e.length;t++)Xe(e,t)||(e[t]=null);return e}function ct(e){const t=aa(null);for(const[n,i]of pf(e))Xe(e,n)&&(Array.isArray(i)?t[n]=Tx(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=ct(i):t[n]=i);return t}function di(e,t){for(;e!==null;){const i=wx(e,t);if(i){if(i.get)return Fe(i.get);if(typeof i.value=="function")return Fe(i.value)}e=xx(e)}function n(){return null}return n}const Gc=Oe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),$r=Oe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Sr=Oe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Cx=Oe(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ar=Oe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ex=Oe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Qc=Oe(["#text"]),Yc=Oe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Tr=Oe(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Xc=Oe(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),_s=Oe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Rx=Ye(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Lx=Ye(/<%[\w\W]*|[\w\W]*%>/gm),Px=Ye(/\$\{[\w\W]*/gm),Mx=Ye(/^data-[\-\w.\u00B7-\uFFFF]+$/),Dx=Ye(/^aria-[\-\w]+$/),gf=Ye(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Ix=Ye(/^(?:\w+script|data):/i),Ox=Ye(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),mf=Ye(/^html$/i),Fx=Ye(/^[a-z][.\w]*(-[.\w]+)+$/i);var Jc=Object.freeze({__proto__:null,ARIA_ATTR:Dx,ATTR_WHITESPACE:Ox,CUSTOM_ELEMENT:Fx,DATA_ATTR:Mx,DOCTYPE_NAME:mf,ERB_EXPR:Lx,IS_ALLOWED_URI:gf,IS_SCRIPT_OR_DATA:Ix,MUSTACHE_EXPR:Rx,TMPLIT_EXPR:Px});const ui={element:1,text:3,progressingInstruction:7,comment:8,document:9},Nx=function(){return typeof window>"u"?null:window},Bx=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const o="dompurify"+(i?"#"+i:"");try{return t.createPolicy(o,{createHTML(r){return r},createScriptURL(r){return r}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Zc=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function vf(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Nx();const t=j=>vf(j);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==ui.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:o,HTMLTemplateElement:r,Node:a,Element:l,NodeFilter:c,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:u,DOMParser:h,trustedTypes:g}=e,v=l.prototype,b=di(v,"cloneNode"),y=di(v,"remove"),S=di(v,"nextSibling"),E=di(v,"childNodes"),L=di(v,"parentNode");if(typeof r=="function"){const j=n.createElement("template");j.content&&j.content.ownerDocument&&(n=j.content.ownerDocument)}let T,C="";const{implementation:M,createNodeIterator:m,createDocumentFragment:k,getElementsByTagName:R}=n,{importNode:D}=i;let P=Zc();t.isSupported=typeof pf=="function"&&typeof L=="function"&&M&&M.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:F,ERB_EXPR:N,TMPLIT_EXPR:B,DATA_ATTR:I,ARIA_ATTR:V,IS_SCRIPT_OR_DATA:le,ATTR_WHITESPACE:z,CUSTOM_ELEMENT:J}=Jc;let{IS_ALLOWED_URI:ge}=Jc,Q=null;const Se=Y({},[...Gc,...$r,...Sr,...Ar,...Qc]);let se=null;const Te=Y({},[...Yc,...Tr,...Xc,..._s]);let te=Object.seal(aa(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),xe=null,K=null;const G=Object.seal(aa(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let oe=!0,de=!0,Me=!1,rs=!0,Ln=!1,as=!0,Qt=!1,Wo=!1,Vo=!1,Pn=!1,ls=!1,cs=!1,Ll=!0,Pl=!1;const Tp="user-content-";let Go=!0,ii=!1,Mn={},ot=null;const Qo=Y({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Ml=null;const Dl=Y({},["audio","video","img","source","image","track"]);let Yo=null;const Il=Y({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ds="http://www.w3.org/1998/Math/MathML",us="http://www.w3.org/2000/svg",bt="http://www.w3.org/1999/xhtml";let Dn=bt,Xo=!1,Jo=null;const Cp=Y({},[ds,us,bt],_r);let hs=Y({},["mi","mo","mn","ms","mtext"]),fs=Y({},["annotation-xml"]);const Ep=Y({},["title","style","font","a","script"]);let si=null;const Rp=["application/xhtml+xml","text/html"],Lp="text/html";let we=null,In=null;const Pp=n.createElement("form"),Ol=function(A){return A instanceof RegExp||A instanceof Function},Zo=function(){let A=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(In&&In===A)){if((!A||typeof A!="object")&&(A={}),A=ct(A),si=Rp.indexOf(A.PARSER_MEDIA_TYPE)===-1?Lp:A.PARSER_MEDIA_TYPE,we=si==="application/xhtml+xml"?_r:Ws,Q=Xe(A,"ALLOWED_TAGS")?Y({},A.ALLOWED_TAGS,we):Se,se=Xe(A,"ALLOWED_ATTR")?Y({},A.ALLOWED_ATTR,we):Te,Jo=Xe(A,"ALLOWED_NAMESPACES")?Y({},A.ALLOWED_NAMESPACES,_r):Cp,Yo=Xe(A,"ADD_URI_SAFE_ATTR")?Y(ct(Il),A.ADD_URI_SAFE_ATTR,we):Il,Ml=Xe(A,"ADD_DATA_URI_TAGS")?Y(ct(Dl),A.ADD_DATA_URI_TAGS,we):Dl,ot=Xe(A,"FORBID_CONTENTS")?Y({},A.FORBID_CONTENTS,we):Qo,xe=Xe(A,"FORBID_TAGS")?Y({},A.FORBID_TAGS,we):ct({}),K=Xe(A,"FORBID_ATTR")?Y({},A.FORBID_ATTR,we):ct({}),Mn=Xe(A,"USE_PROFILES")?A.USE_PROFILES:!1,oe=A.ALLOW_ARIA_ATTR!==!1,de=A.ALLOW_DATA_ATTR!==!1,Me=A.ALLOW_UNKNOWN_PROTOCOLS||!1,rs=A.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ln=A.SAFE_FOR_TEMPLATES||!1,as=A.SAFE_FOR_XML!==!1,Qt=A.WHOLE_DOCUMENT||!1,Pn=A.RETURN_DOM||!1,ls=A.RETURN_DOM_FRAGMENT||!1,cs=A.RETURN_TRUSTED_TYPE||!1,Vo=A.FORCE_BODY||!1,Ll=A.SANITIZE_DOM!==!1,Pl=A.SANITIZE_NAMED_PROPS||!1,Go=A.KEEP_CONTENT!==!1,ii=A.IN_PLACE||!1,ge=A.ALLOWED_URI_REGEXP||gf,Dn=A.NAMESPACE||bt,hs=A.MATHML_TEXT_INTEGRATION_POINTS||hs,fs=A.HTML_INTEGRATION_POINTS||fs,te=A.CUSTOM_ELEMENT_HANDLING||{},A.CUSTOM_ELEMENT_HANDLING&&Ol(A.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(te.tagNameCheck=A.CUSTOM_ELEMENT_HANDLING.tagNameCheck),A.CUSTOM_ELEMENT_HANDLING&&Ol(A.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(te.attributeNameCheck=A.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),A.CUSTOM_ELEMENT_HANDLING&&typeof A.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(te.allowCustomizedBuiltInElements=A.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ln&&(de=!1),ls&&(Pn=!0),Mn&&(Q=Y({},Qc),se=[],Mn.html===!0&&(Y(Q,Gc),Y(se,Yc)),Mn.svg===!0&&(Y(Q,$r),Y(se,Tr),Y(se,_s)),Mn.svgFilters===!0&&(Y(Q,Sr),Y(se,Tr),Y(se,_s)),Mn.mathMl===!0&&(Y(Q,Ar),Y(se,Xc),Y(se,_s))),A.ADD_TAGS&&(typeof A.ADD_TAGS=="function"?G.tagCheck=A.ADD_TAGS:(Q===Se&&(Q=ct(Q)),Y(Q,A.ADD_TAGS,we))),A.ADD_ATTR&&(typeof A.ADD_ATTR=="function"?G.attributeCheck=A.ADD_ATTR:(se===Te&&(se=ct(se)),Y(se,A.ADD_ATTR,we))),A.ADD_URI_SAFE_ATTR&&Y(Yo,A.ADD_URI_SAFE_ATTR,we),A.FORBID_CONTENTS&&(ot===Qo&&(ot=ct(ot)),Y(ot,A.FORBID_CONTENTS,we)),A.ADD_FORBID_CONTENTS&&(ot===Qo&&(ot=ct(ot)),Y(ot,A.ADD_FORBID_CONTENTS,we)),Go&&(Q["#text"]=!0),Qt&&Y(Q,["html","head","body"]),Q.table&&(Y(Q,["tbody"]),delete xe.tbody),A.TRUSTED_TYPES_POLICY){if(typeof A.TRUSTED_TYPES_POLICY.createHTML!="function")throw ci('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof A.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ci('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');T=A.TRUSTED_TYPES_POLICY,C=T.createHTML("")}else T===void 0&&(T=Bx(g,s)),T!==null&&typeof C=="string"&&(C=T.createHTML(""));Oe&&Oe(A),In=A}},Fl=Y({},[...$r,...Sr,...Cx]),Nl=Y({},[...Ar,...Ex]),Mp=function(A){let O=L(A);(!O||!O.tagName)&&(O={namespaceURI:Dn,tagName:"template"});const q=Ws(A.tagName),fe=Ws(O.tagName);return Jo[A.namespaceURI]?A.namespaceURI===us?O.namespaceURI===bt?q==="svg":O.namespaceURI===ds?q==="svg"&&(fe==="annotation-xml"||hs[fe]):!!Fl[q]:A.namespaceURI===ds?O.namespaceURI===bt?q==="math":O.namespaceURI===us?q==="math"&&fs[fe]:!!Nl[q]:A.namespaceURI===bt?O.namespaceURI===us&&!fs[fe]||O.namespaceURI===ds&&!hs[fe]?!1:!Nl[q]&&(Ep[q]||!Fl[q]):!!(si==="application/xhtml+xml"&&Jo[A.namespaceURI]):!1},rt=function(A){ai(t.removed,{element:A});try{L(A).removeChild(A)}catch{y(A)}},Yt=function(A,O){try{ai(t.removed,{attribute:O.getAttributeNode(A),from:O})}catch{ai(t.removed,{attribute:null,from:O})}if(O.removeAttribute(A),A==="is")if(Pn||ls)try{rt(O)}catch{}else try{O.setAttribute(A,"")}catch{}},Bl=function(A){let O=null,q=null;if(Vo)A="<remove></remove>"+A;else{const ve=kr(A,/^[\r\n\t ]+/);q=ve&&ve[0]}si==="application/xhtml+xml"&&Dn===bt&&(A='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+A+"</body></html>");const fe=T?T.createHTML(A):A;if(Dn===bt)try{O=new h().parseFromString(fe,si)}catch{}if(!O||!O.documentElement){O=M.createDocument(Dn,"template",null);try{O.documentElement.innerHTML=Xo?C:fe}catch{}}const Ce=O.body||O.documentElement;return A&&q&&Ce.insertBefore(n.createTextNode(q),Ce.childNodes[0]||null),Dn===bt?R.call(O,Qt?"html":"body")[0]:Qt?O.documentElement:Ce},zl=function(A){return m.call(A.ownerDocument||A,A,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},er=function(A){return A instanceof u&&(typeof A.nodeName!="string"||typeof A.textContent!="string"||typeof A.removeChild!="function"||!(A.attributes instanceof d)||typeof A.removeAttribute!="function"||typeof A.setAttribute!="function"||typeof A.namespaceURI!="string"||typeof A.insertBefore!="function"||typeof A.hasChildNodes!="function")},Hl=function(A){return typeof a=="function"&&A instanceof a};function xt(j,A,O){ws(j,q=>{q.call(t,A,O,In)})}const Ul=function(A){let O=null;if(xt(P.beforeSanitizeElements,A,null),er(A))return rt(A),!0;const q=we(A.nodeName);if(xt(P.uponSanitizeElement,A,{tagName:q,allowedTags:Q}),as&&A.hasChildNodes()&&!Hl(A.firstElementChild)&&De(/<[/\w!]/g,A.innerHTML)&&De(/<[/\w!]/g,A.textContent)||A.nodeType===ui.progressingInstruction||as&&A.nodeType===ui.comment&&De(/<[/\w]/g,A.data))return rt(A),!0;if(!(G.tagCheck instanceof Function&&G.tagCheck(q))&&(!Q[q]||xe[q])){if(!xe[q]&&jl(q)&&(te.tagNameCheck instanceof RegExp&&De(te.tagNameCheck,q)||te.tagNameCheck instanceof Function&&te.tagNameCheck(q)))return!1;if(Go&&!ot[q]){const fe=L(A)||A.parentNode,Ce=E(A)||A.childNodes;if(Ce&&fe){const ve=Ce.length;for(let Ne=ve-1;Ne>=0;--Ne){const wt=b(Ce[Ne],!0);wt.__removalCount=(A.__removalCount||0)+1,fe.insertBefore(wt,S(A))}}}return rt(A),!0}return A instanceof l&&!Mp(A)||(q==="noscript"||q==="noembed"||q==="noframes")&&De(/<\/no(script|embed|frames)/i,A.innerHTML)?(rt(A),!0):(Ln&&A.nodeType===ui.text&&(O=A.textContent,ws([F,N,B],fe=>{O=li(O,fe," ")}),A.textContent!==O&&(ai(t.removed,{element:A.cloneNode()}),A.textContent=O)),xt(P.afterSanitizeElements,A,null),!1)},ql=function(A,O,q){if(Ll&&(O==="id"||O==="name")&&(q in n||q in Pp))return!1;if(!(de&&!K[O]&&De(I,O))){if(!(oe&&De(V,O))){if(!(G.attributeCheck instanceof Function&&G.attributeCheck(O,A))){if(!se[O]||K[O]){if(!(jl(A)&&(te.tagNameCheck instanceof RegExp&&De(te.tagNameCheck,A)||te.tagNameCheck instanceof Function&&te.tagNameCheck(A))&&(te.attributeNameCheck instanceof RegExp&&De(te.attributeNameCheck,O)||te.attributeNameCheck instanceof Function&&te.attributeNameCheck(O,A))||O==="is"&&te.allowCustomizedBuiltInElements&&(te.tagNameCheck instanceof RegExp&&De(te.tagNameCheck,q)||te.tagNameCheck instanceof Function&&te.tagNameCheck(q))))return!1}else if(!Yo[O]){if(!De(ge,li(q,z,""))){if(!((O==="src"||O==="xlink:href"||O==="href")&&A!=="script"&&$x(q,"data:")===0&&Ml[A])){if(!(Me&&!De(le,li(q,z,"")))){if(q)return!1}}}}}}}return!0},jl=function(A){return A!=="annotation-xml"&&kr(A,J)},Kl=function(A){xt(P.beforeSanitizeAttributes,A,null);const{attributes:O}=A;if(!O||er(A))return;const q={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:se,forceKeepAttr:void 0};let fe=O.length;for(;fe--;){const Ce=O[fe],{name:ve,namespaceURI:Ne,value:wt}=Ce,On=we(ve),tr=wt;let Ae=ve==="value"?tr:Sx(tr);if(q.attrName=On,q.attrValue=Ae,q.keepAttr=!0,q.forceKeepAttr=void 0,xt(P.uponSanitizeAttribute,A,q),Ae=q.attrValue,Pl&&(On==="id"||On==="name")&&(Yt(ve,A),Ae=Tp+Ae),as&&De(/((--!?|])>)|<\/(style|title|textarea)/i,Ae)){Yt(ve,A);continue}if(On==="attributename"&&kr(Ae,"href")){Yt(ve,A);continue}if(q.forceKeepAttr)continue;if(!q.keepAttr){Yt(ve,A);continue}if(!rs&&De(/\/>/i,Ae)){Yt(ve,A);continue}Ln&&ws([F,N,B],Vl=>{Ae=li(Ae,Vl," ")});const Wl=we(A.nodeName);if(!ql(Wl,On,Ae)){Yt(ve,A);continue}if(T&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!Ne)switch(g.getAttributeType(Wl,On)){case"TrustedHTML":{Ae=T.createHTML(Ae);break}case"TrustedScriptURL":{Ae=T.createScriptURL(Ae);break}}if(Ae!==tr)try{Ne?A.setAttributeNS(Ne,ve,Ae):A.setAttribute(ve,Ae),er(A)?rt(A):Vc(t.removed)}catch{Yt(ve,A)}}xt(P.afterSanitizeAttributes,A,null)},Dp=function j(A){let O=null;const q=zl(A);for(xt(P.beforeSanitizeShadowDOM,A,null);O=q.nextNode();)xt(P.uponSanitizeShadowNode,O,null),Ul(O),Kl(O),O.content instanceof o&&j(O.content);xt(P.afterSanitizeShadowDOM,A,null)};return t.sanitize=function(j){let A=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},O=null,q=null,fe=null,Ce=null;if(Xo=!j,Xo&&(j="<!-->"),typeof j!="string"&&!Hl(j))if(typeof j.toString=="function"){if(j=j.toString(),typeof j!="string")throw ci("dirty is not a string, aborting")}else throw ci("toString is not a function");if(!t.isSupported)return j;if(Wo||Zo(A),t.removed=[],typeof j=="string"&&(ii=!1),ii){if(j.nodeName){const wt=we(j.nodeName);if(!Q[wt]||xe[wt])throw ci("root node is forbidden and cannot be sanitized in-place")}}else if(j instanceof a)O=Bl("<!---->"),q=O.ownerDocument.importNode(j,!0),q.nodeType===ui.element&&q.nodeName==="BODY"||q.nodeName==="HTML"?O=q:O.appendChild(q);else{if(!Pn&&!Ln&&!Qt&&j.indexOf("<")===-1)return T&&cs?T.createHTML(j):j;if(O=Bl(j),!O)return Pn?null:cs?C:""}O&&Vo&&rt(O.firstChild);const ve=zl(ii?j:O);for(;fe=ve.nextNode();)Ul(fe),Kl(fe),fe.content instanceof o&&Dp(fe.content);if(ii)return j;if(Pn){if(ls)for(Ce=k.call(O.ownerDocument);O.firstChild;)Ce.appendChild(O.firstChild);else Ce=O;return(se.shadowroot||se.shadowrootmode)&&(Ce=D.call(i,Ce,!0)),Ce}let Ne=Qt?O.outerHTML:O.innerHTML;return Qt&&Q["!doctype"]&&O.ownerDocument&&O.ownerDocument.doctype&&O.ownerDocument.doctype.name&&De(mf,O.ownerDocument.doctype.name)&&(Ne="<!DOCTYPE "+O.ownerDocument.doctype.name+`>
`+Ne),Ln&&ws([F,N,B],wt=>{Ne=li(Ne,wt," ")}),T&&cs?T.createHTML(Ne):Ne},t.setConfig=function(){let j=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Zo(j),Wo=!0},t.clearConfig=function(){In=null,Wo=!1},t.isValidAttribute=function(j,A,O){In||Zo({});const q=we(j),fe=we(A);return ql(q,fe,O)},t.addHook=function(j,A){typeof A=="function"&&ai(P[j],A)},t.removeHook=function(j,A){if(A!==void 0){const O=_x(P[j],A);return O===-1?void 0:kx(P[j],O,1)[0]}return Vc(P[j])},t.removeHooks=function(j){P[j]=[]},t.removeAllHooks=function(){P=Zc()},t}var da=vf();function ll(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var En=ll();function yf(e){En=e}var an={exec:()=>null};function ee(e,t=""){let n=typeof e=="string"?e:e.source,i={replace:(s,o)=>{let r=typeof o=="string"?o:o.source;return r=r.replace(Ie.caret,"$1"),n=n.replace(s,r),i},getRegex:()=>new RegExp(n,t)};return i}var zx=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Ie={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}>`)},Hx=/^(?:[ \t]*(?:\n|$))+/,Ux=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,qx=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,is=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,jx=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,cl=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,bf=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,xf=ee(bf).replace(/bull/g,cl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Kx=ee(bf).replace(/bull/g,cl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),dl=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Wx=/^[^\n]+/,ul=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Vx=ee(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ul).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Gx=ee(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,cl).getRegex(),Oo="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",hl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Qx=ee("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",hl).replace("tag",Oo).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),wf=ee(dl).replace("hr",is).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Oo).getRegex(),Yx=ee(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",wf).getRegex(),fl={blockquote:Yx,code:Ux,def:Vx,fences:qx,heading:jx,hr:is,html:Qx,lheading:xf,list:Gx,newline:Hx,paragraph:wf,table:an,text:Wx},ed=ee("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",is).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Oo).getRegex(),Xx={...fl,lheading:Kx,table:ed,paragraph:ee(dl).replace("hr",is).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ed).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Oo).getRegex()},Jx={...fl,html:ee(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",hl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:an,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ee(dl).replace("hr",is).replace("heading",` *#{1,6} *[^
]`).replace("lheading",xf).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Zx=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,e0=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,_f=/^( {2,}|\\)\n(?!\s*$)/,t0=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Fo=/[\p{P}\p{S}]/u,pl=/[\s\p{P}\p{S}]/u,kf=/[^\s\p{P}\p{S}]/u,n0=ee(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,pl).getRegex(),$f=/(?!~)[\p{P}\p{S}]/u,i0=/(?!~)[\s\p{P}\p{S}]/u,s0=/(?:[^\s\p{P}\p{S}]|~)/u,Sf=/(?![*_])[\p{P}\p{S}]/u,o0=/(?![*_])[\s\p{P}\p{S}]/u,r0=/(?:[^\s\p{P}\p{S}]|[*_])/u,a0=ee(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",zx?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Af=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,l0=ee(Af,"u").replace(/punct/g,Fo).getRegex(),c0=ee(Af,"u").replace(/punct/g,$f).getRegex(),Tf="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",d0=ee(Tf,"gu").replace(/notPunctSpace/g,kf).replace(/punctSpace/g,pl).replace(/punct/g,Fo).getRegex(),u0=ee(Tf,"gu").replace(/notPunctSpace/g,s0).replace(/punctSpace/g,i0).replace(/punct/g,$f).getRegex(),h0=ee("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,kf).replace(/punctSpace/g,pl).replace(/punct/g,Fo).getRegex(),f0=ee(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,Sf).getRegex(),p0="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",g0=ee(p0,"gu").replace(/notPunctSpace/g,r0).replace(/punctSpace/g,o0).replace(/punct/g,Sf).getRegex(),m0=ee(/\\(punct)/,"gu").replace(/punct/g,Fo).getRegex(),v0=ee(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),y0=ee(hl).replace("(?:-->|$)","-->").getRegex(),b0=ee("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",y0).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ao=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,x0=ee(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ao).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Cf=ee(/^!?\[(label)\]\[(ref)\]/).replace("label",ao).replace("ref",ul).getRegex(),Ef=ee(/^!?\[(ref)\](?:\[\])?/).replace("ref",ul).getRegex(),w0=ee("reflink|nolink(?!\\()","g").replace("reflink",Cf).replace("nolink",Ef).getRegex(),td=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,gl={_backpedal:an,anyPunctuation:m0,autolink:v0,blockSkip:a0,br:_f,code:e0,del:an,delLDelim:an,delRDelim:an,emStrongLDelim:l0,emStrongRDelimAst:d0,emStrongRDelimUnd:h0,escape:Zx,link:x0,nolink:Ef,punctuation:n0,reflink:Cf,reflinkSearch:w0,tag:b0,text:t0,url:an},_0={...gl,link:ee(/^!?\[(label)\]\((.*?)\)/).replace("label",ao).getRegex(),reflink:ee(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ao).getRegex()},ua={...gl,emStrongRDelimAst:u0,emStrongLDelim:c0,delLDelim:f0,delRDelim:g0,url:ee(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",td).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ee(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",td).getRegex()},k0={...ua,br:ee(_f).replace("{2,}","*").getRegex(),text:ee(ua.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ks={normal:fl,gfm:Xx,pedantic:Jx},hi={normal:gl,gfm:ua,breaks:k0,pedantic:_0},$0={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},nd=e=>$0[e];function dt(e,t){if(t){if(Ie.escapeTest.test(e))return e.replace(Ie.escapeReplace,nd)}else if(Ie.escapeTestNoEncode.test(e))return e.replace(Ie.escapeReplaceNoEncode,nd);return e}function id(e){try{e=encodeURI(e).replace(Ie.percentDecode,"%")}catch{return null}return e}function sd(e,t){var o;let n=e.replace(Ie.findPipe,(r,a,l)=>{let c=!1,d=a;for(;--d>=0&&l[d]==="\\";)c=!c;return c?"|":" |"}),i=n.split(Ie.splitPipe),s=0;if(i[0].trim()||i.shift(),i.length>0&&!((o=i.at(-1))!=null&&o.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(Ie.slashPipe,"|");return i}function fi(e,t,n){let i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function S0(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function A0(e,t=0){let n=t,i="";for(let s of e)if(s==="	"){let o=4-n%4;i+=" ".repeat(o),n+=o}else i+=s,n++;return i}function od(e,t,n,i,s){let o=t.href,r=t.title||null,a=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:r,text:a,tokens:i.inlineTokens(a)};return i.state.inLink=!1,l}function T0(e,t,n){let i=e.match(n.other.indentCodeCompensation);if(i===null)return t;let s=i[1];return t.split(`
`).map(o=>{let r=o.match(n.other.beginningSpace);if(r===null)return o;let[a]=r;return a.length>=s.length?o.slice(s.length):o}).join(`
`)}var lo=class{constructor(e){H(this,"options");H(this,"rules");H(this,"lexer");this.options=e||En}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:fi(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],i=T0(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let i=fi(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:fi(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=fi(t[0],`
`).split(`
`),i="",s="",o=[];for(;n.length>0;){let r=!1,a=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))a.push(n[l]),r=!0;else if(!r)a.push(n[l]);else break;n=n.slice(l);let c=a.join(`
`),d=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,s=s?`${s}
${d}`:d;let u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=u,n.length===0)break;let h=o.at(-1);if((h==null?void 0:h.type)==="code")break;if((h==null?void 0:h.type)==="blockquote"){let g=h,v=g.raw+`
`+n.join(`
`),b=this.blockquote(v);o[o.length-1]=b,i=i.substring(0,i.length-g.raw.length)+b.raw,s=s.substring(0,s.length-g.text.length)+b.text;break}else if((h==null?void 0:h.type)==="list"){let g=h,v=g.raw+`
`+n.join(`
`),b=this.list(v);o[o.length-1]=b,i=i.substring(0,i.length-h.raw.length)+b.raw,s=s.substring(0,s.length-g.raw.length)+b.raw,n=v.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:o,text:s}}}list(e){var n,i;let t=this.rules.block.list.exec(e);if(t){let s=t[1].trim(),o=s.length>1,r={type:"list",raw:"",ordered:o,start:o?+s.slice(0,-1):"",loose:!1,items:[]};s=o?`\\d{1,9}\\${s.slice(-1)}`:`\\${s}`,this.options.pedantic&&(s=o?s:"[*+-]");let a=this.rules.other.listItemRegex(s),l=!1;for(;e;){let d=!1,u="",h="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let g=A0(t[2].split(`
`,1)[0],t[1].length),v=e.split(`
`,1)[0],b=!g.trim(),y=0;if(this.options.pedantic?(y=2,h=g.trimStart()):b?y=t[1].length+1:(y=g.search(this.rules.other.nonSpaceChar),y=y>4?1:y,h=g.slice(y),y+=t[1].length),b&&this.rules.other.blankLine.test(v)&&(u+=v+`
`,e=e.substring(v.length+1),d=!0),!d){let S=this.rules.other.nextBulletRegex(y),E=this.rules.other.hrRegex(y),L=this.rules.other.fencesBeginRegex(y),T=this.rules.other.headingBeginRegex(y),C=this.rules.other.htmlBeginRegex(y),M=this.rules.other.blockquoteBeginRegex(y);for(;e;){let m=e.split(`
`,1)[0],k;if(v=m,this.options.pedantic?(v=v.replace(this.rules.other.listReplaceNesting,"  "),k=v):k=v.replace(this.rules.other.tabCharGlobal,"    "),L.test(v)||T.test(v)||C.test(v)||M.test(v)||S.test(v)||E.test(v))break;if(k.search(this.rules.other.nonSpaceChar)>=y||!v.trim())h+=`
`+k.slice(y);else{if(b||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||L.test(g)||T.test(g)||E.test(g))break;h+=`
`+v}b=!v.trim(),u+=m+`
`,e=e.substring(m.length+1),g=k.slice(y)}}r.loose||(l?r.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(l=!0)),r.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(h),loose:!1,text:h,tokens:[]}),r.raw+=u}let c=r.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;r.raw=r.raw.trimEnd();for(let d of r.items){if(this.lexer.state.top=!1,d.tokens=this.lexer.blockTokens(d.text,[]),d.task){if(d.text=d.text.replace(this.rules.other.listReplaceTask,""),((n=d.tokens[0])==null?void 0:n.type)==="text"||((i=d.tokens[0])==null?void 0:i.type)==="paragraph"){d.tokens[0].raw=d.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),d.tokens[0].text=d.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let h=this.lexer.inlineQueue.length-1;h>=0;h--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[h].src)){this.lexer.inlineQueue[h].src=this.lexer.inlineQueue[h].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(d.raw);if(u){let h={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};d.checked=h.checked,r.loose?d.tokens[0]&&["paragraph","text"].includes(d.tokens[0].type)&&"tokens"in d.tokens[0]&&d.tokens[0].tokens?(d.tokens[0].raw=h.raw+d.tokens[0].raw,d.tokens[0].text=h.raw+d.tokens[0].text,d.tokens[0].tokens.unshift(h)):d.tokens.unshift({type:"paragraph",raw:h.raw,text:h.raw,tokens:[h]}):d.tokens.unshift(h)}}if(!r.loose){let u=d.tokens.filter(g=>g.type==="space"),h=u.length>0&&u.some(g=>this.rules.other.anyLine.test(g.raw));r.loose=h}}if(r.loose)for(let d of r.items){d.loose=!0;for(let u of d.tokens)u.type==="text"&&(u.type="paragraph")}return r}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var r;let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=sd(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(r=t[3])!=null&&r.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(let a of i)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(sd(a,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=fi(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=S0(t[2],"()");if(o===-2)return;if(o>-1){let r=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(i);o&&(i=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),od(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return od(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(i[1]||i[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...i[0]].length-1,o,r,a=s,l=0,c=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+s);(i=c.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(r=[...o].length,i[3]||i[4]){a+=r;continue}else if((i[5]||i[6])&&s%3&&!((s+r)%3)){l+=r;continue}if(a-=r,a>0)continue;r=Math.min(r,r+a+l);let d=[...i[0]][0].length,u=e.slice(0,s+i.index+d+r);if(Math.min(s,r)%2){let g=u.slice(1,-1);return{type:"em",raw:u,text:g,tokens:this.lexer.inlineTokens(g)}}let h=u.slice(2,-2);return{type:"strong",raw:u,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e,t,n=""){let i=this.rules.inline.delLDelim.exec(e);if(i&&(!i[1]||!n||this.rules.inline.punctuation.exec(n))){let s=[...i[0]].length-1,o,r,a=s,l=this.rules.inline.delRDelim;for(l.lastIndex=0,t=t.slice(-1*e.length+s);(i=l.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o||(r=[...o].length,r!==s))continue;if(i[3]||i[4]){a+=r;continue}if(a-=r,a>0)continue;r=Math.min(r,r+a);let c=[...i[0]][0].length,d=e.slice(0,s+i.index+c+r),u=d.slice(s,-s);return{type:"del",raw:d,text:u,tokens:this.lexer.inlineTokens(u)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let o;do o=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(o!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Ze=class ha{constructor(t){H(this,"tokens");H(this,"options");H(this,"state");H(this,"inlineQueue");H(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||En,this.options.tokenizer=this.options.tokenizer||new lo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:Ie,block:ks.normal,inline:hi.normal};this.options.pedantic?(n.block=ks.pedantic,n.inline=hi.pedantic):this.options.gfm&&(n.block=ks.gfm,this.options.breaks?n.inline=hi.breaks:n.inline=hi.gfm),this.tokenizer.rules=n}static get rules(){return{block:ks,inline:hi}}static lex(t,n){return new ha(n).lex(t)}static lexInline(t,n){return new ha(n).inlineTokens(t)}lex(t){t=t.replace(Ie.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,o,r;for(this.options.pedantic&&(t=t.replace(Ie.tabCharGlobal,"    ").replace(Ie.spaceLine,""));t;){let a;if((o=(s=this.options.extensions)==null?void 0:s.block)!=null&&o.some(c=>(a=c.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.space(t)){t=t.substring(a.raw.length);let c=n.at(-1);a.raw.length===1&&c!==void 0?c.raw+=`
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
`+a.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(a);continue}if(t){let c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var l,c,d,u,h;let i=t,s=null;if(this.tokens.links){let g=Object.keys(this.tokens.links);if(g.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)g.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)o=s[2]?s[2].length:0,i=i.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);i=((c=(l=this.options.hooks)==null?void 0:l.emStrongMask)==null?void 0:c.call({lexer:this},i))??i;let r=!1,a="";for(;t;){r||(a=""),r=!1;let g;if((u=(d=this.options.extensions)==null?void 0:d.inline)!=null&&u.some(b=>(g=b.call({lexer:this},t,n))?(t=t.substring(g.raw.length),n.push(g),!0):!1))continue;if(g=this.tokenizer.escape(t)){t=t.substring(g.raw.length),n.push(g);continue}if(g=this.tokenizer.tag(t)){t=t.substring(g.raw.length),n.push(g);continue}if(g=this.tokenizer.link(t)){t=t.substring(g.raw.length),n.push(g);continue}if(g=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(g.raw.length);let b=n.at(-1);g.type==="text"&&(b==null?void 0:b.type)==="text"?(b.raw+=g.raw,b.text+=g.text):n.push(g);continue}if(g=this.tokenizer.emStrong(t,i,a)){t=t.substring(g.raw.length),n.push(g);continue}if(g=this.tokenizer.codespan(t)){t=t.substring(g.raw.length),n.push(g);continue}if(g=this.tokenizer.br(t)){t=t.substring(g.raw.length),n.push(g);continue}if(g=this.tokenizer.del(t,i,a)){t=t.substring(g.raw.length),n.push(g);continue}if(g=this.tokenizer.autolink(t)){t=t.substring(g.raw.length),n.push(g);continue}if(!this.state.inLink&&(g=this.tokenizer.url(t))){t=t.substring(g.raw.length),n.push(g);continue}let v=t;if((h=this.options.extensions)!=null&&h.startInline){let b=1/0,y=t.slice(1),S;this.options.extensions.startInline.forEach(E=>{S=E.call({lexer:this},y),typeof S=="number"&&S>=0&&(b=Math.min(b,S))}),b<1/0&&b>=0&&(v=t.substring(0,b+1))}if(g=this.tokenizer.inlineText(v)){t=t.substring(g.raw.length),g.raw.slice(-1)!=="_"&&(a=g.raw.slice(-1)),r=!0;let b=n.at(-1);(b==null?void 0:b.type)==="text"?(b.raw+=g.raw,b.text+=g.text):n.push(g);continue}if(t){let b="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(b);break}else throw new Error(b)}}return n}},co=class{constructor(e){H(this,"options");H(this,"parser");this.options=e||En}space(e){return""}code({text:e,lang:t,escaped:n}){var o;let i=(o=(t||"").match(Ie.notSpaceStart))==null?void 0:o[0],s=e.replace(Ie.endingNewline,"")+`
`;return i?'<pre><code class="language-'+dt(i)+'">'+(n?s:dt(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:dt(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${dt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let i=this.parser.parseInline(n),s=id(e);if(s===null)return i;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+dt(t)+'"'),o+=">"+i+"</a>",o}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));let s=id(e);if(s===null)return dt(n);e=s;let o=`<img src="${e}" alt="${dt(n)}"`;return t&&(o+=` title="${dt(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:dt(e.text)}},ml=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},et=class fa{constructor(t){H(this,"options");H(this,"renderer");H(this,"textRenderer");this.options=t||En,this.options.renderer=this.options.renderer||new co,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ml}static parse(t,n){return new fa(n).parse(t)}static parseInline(t,n){return new fa(n).parseInline(t)}parse(t){var i,s;let n="";for(let o=0;o<t.length;o++){let r=t[o];if((s=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&s[r.type]){let l=r,c=this.options.extensions.renderers[l.type].call({parser:this},l);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(l.type)){n+=c||"";continue}}let a=r;switch(a.type){case"space":{n+=this.renderer.space(a);break}case"hr":{n+=this.renderer.hr(a);break}case"heading":{n+=this.renderer.heading(a);break}case"code":{n+=this.renderer.code(a);break}case"table":{n+=this.renderer.table(a);break}case"blockquote":{n+=this.renderer.blockquote(a);break}case"list":{n+=this.renderer.list(a);break}case"checkbox":{n+=this.renderer.checkbox(a);break}case"html":{n+=this.renderer.html(a);break}case"def":{n+=this.renderer.def(a);break}case"paragraph":{n+=this.renderer.paragraph(a);break}case"text":{n+=this.renderer.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}parseInline(t,n=this.renderer){var s,o;let i="";for(let r=0;r<t.length;r++){let a=t[r];if((o=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&o[a.type]){let c=this.options.extensions.renderers[a.type].call({parser:this},a);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type)){i+=c||"";continue}}let l=a;switch(l.type){case"escape":{i+=n.text(l);break}case"html":{i+=n.html(l);break}case"link":{i+=n.link(l);break}case"image":{i+=n.image(l);break}case"checkbox":{i+=n.checkbox(l);break}case"strong":{i+=n.strong(l);break}case"em":{i+=n.em(l);break}case"codespan":{i+=n.codespan(l);break}case"br":{i+=n.br(l);break}case"del":{i+=n.del(l);break}case"text":{i+=n.text(l);break}default:{let c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},Ns,bi=(Ns=class{constructor(e){H(this,"options");H(this,"block");this.options=e||En}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ze.lex:Ze.lexInline}provideParser(){return this.block?et.parse:et.parseInline}},H(Ns,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),H(Ns,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Ns),C0=class{constructor(...e){H(this,"defaults",ll());H(this,"options",this.setOptions);H(this,"parse",this.parseMarkdown(!0));H(this,"parseInline",this.parseMarkdown(!1));H(this,"Parser",et);H(this,"Renderer",co);H(this,"TextRenderer",ml);H(this,"Lexer",Ze);H(this,"Tokenizer",lo);H(this,"Hooks",bi);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(let o of e)switch(n=n.concat(t.call(this,o)),o.type){case"table":{let r=o;for(let a of r.header)n=n.concat(this.walkTokens(a.tokens,t));for(let a of r.rows)for(let l of a)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{let r=o;n=n.concat(this.walkTokens(r.items,t));break}default:{let r=o;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[r.type]?this.defaults.extensions.childTokens[r.type].forEach(a=>{let l=r[a].flat(1/0);n=n.concat(this.walkTokens(l,t))}):r.tokens&&(n=n.concat(this.walkTokens(r.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...r){let a=s.renderer.apply(this,r);return a===!1&&(a=o.apply(this,r)),a}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){let s=this.defaults.renderer||new co(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let r=o,a=n.renderer[r],l=s[r];s[r]=(...c)=>{let d=a.apply(s,c);return d===!1&&(d=l.apply(s,c)),d||""}}i.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new lo(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let r=o,a=n.tokenizer[r],l=s[r];s[r]=(...c)=>{let d=a.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new bi;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let r=o,a=n.hooks[r],l=s[r];bi.passThroughHooks.has(o)?s[r]=c=>{if(this.defaults.async&&bi.passThroughHooksRespectAsync.has(o))return(async()=>{let u=await a.call(s,c);return l.call(s,u)})();let d=a.call(s,c);return l.call(s,d)}:s[r]=(...c)=>{if(this.defaults.async)return(async()=>{let u=await a.apply(s,c);return u===!1&&(u=await l.apply(s,c)),u})();let d=a.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;i.walkTokens=function(r){let a=[];return a.push(o.call(this,r)),s&&(a=a.concat(s.call(this,r))),a}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ze.lex(e,t??this.defaults)}parser(e,t){return et.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let i={...n},s={...this.defaults,...i},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&i.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let r=s.hooks?await s.hooks.preprocess(t):t,a=await(s.hooks?await s.hooks.provideLexer():e?Ze.lex:Ze.lexInline)(r,s),l=s.hooks?await s.hooks.processAllTokens(a):a;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():e?et.parse:et.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let r=(s.hooks?s.hooks.provideLexer():e?Ze.lex:Ze.lexInline)(t,s);s.hooks&&(r=s.hooks.processAllTokens(r)),s.walkTokens&&this.walkTokens(r,s.walkTokens);let a=(s.hooks?s.hooks.provideParser():e?et.parse:et.parseInline)(r,s);return s.hooks&&(a=s.hooks.postprocess(a)),a}catch(r){return o(r)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let i="<p>An error occurred:</p><pre>"+dt(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},$n=new C0;function ie(e,t){return $n.parse(e,t)}ie.options=ie.setOptions=function(e){return $n.setOptions(e),ie.defaults=$n.defaults,yf(ie.defaults),ie};ie.getDefaults=ll;ie.defaults=En;ie.use=function(...e){return $n.use(...e),ie.defaults=$n.defaults,yf(ie.defaults),ie};ie.walkTokens=function(e,t){return $n.walkTokens(e,t)};ie.parseInline=$n.parseInline;ie.Parser=et;ie.parser=et.parse;ie.Renderer=co;ie.TextRenderer=ml;ie.Lexer=Ze;ie.lexer=Ze.lex;ie.Tokenizer=lo;ie.Hooks=bi;ie.parse=ie;ie.options;ie.setOptions;ie.use;ie.walkTokens;ie.parseInline;et.parse;Ze.lex;ie.setOptions({gfm:!0,breaks:!0});const E0=["a","b","blockquote","br","code","del","em","h1","h2","h3","h4","hr","i","li","ol","p","pre","strong","table","tbody","td","th","thead","tr","ul","img"],R0=["class","href","rel","target","title","start","src","alt"],rd={ALLOWED_TAGS:E0,ALLOWED_ATTR:R0,ADD_DATA_URI_TAGS:["img"]};let ad=!1;const L0=14e4,P0=4e4,M0=200,Cr=5e4,cn=new Map;function D0(e){const t=cn.get(e);return t===void 0?null:(cn.delete(e),cn.set(e,t),t)}function ld(e,t){if(cn.set(e,t),cn.size<=M0)return;const n=cn.keys().next().value;n&&cn.delete(n)}function I0(){ad||(ad=!0,da.addHook("afterSanitizeAttributes",e=>{!(e instanceof HTMLAnchorElement)||!e.getAttribute("href")||(e.setAttribute("rel","noreferrer noopener"),e.setAttribute("target","_blank"))}))}function uo(e){const t=e.trim();if(!t)return"";if(I0(),t.length<=Cr){const r=D0(t);if(r!==null)return r}const n=lh(t,L0),i=n.truncated?`

… truncated (${n.total} chars, showing first ${n.text.length}).`:"";if(n.text.length>P0){const a=`<pre class="code-block">${Lf(`${n.text}${i}`)}</pre>`,l=da.sanitize(a,rd);return t.length<=Cr&&ld(t,l),l}const s=ie.parse(`${n.text}${i}`,{renderer:Rf}),o=da.sanitize(s,rd);return t.length<=Cr&&ld(t,o),o}const Rf=new ie.Renderer;Rf.html=({text:e})=>Lf(e);function Lf(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const O0=new RegExp("\\p{Script=Hebrew}|\\p{Script=Arabic}|\\p{Script=Syriac}|\\p{Script=Thaana}|\\p{Script=Nko}|\\p{Script=Samaritan}|\\p{Script=Mandaic}|\\p{Script=Adlam}|\\p{Script=Phoenician}|\\p{Script=Lydian}","u");function Pf(e,t=/[\s\p{P}\p{S}]/u){if(!e)return"ltr";for(const n of e)if(!t.test(n))return O0.test(n)?"rtl":"ltr";return"ltr"}const F0=1500,N0=2e3,Mf="Copy as markdown",B0="Copied",z0="Copy failed";async function H0(e){if(!e)return!1;try{return await navigator.clipboard.writeText(e),!0}catch{return!1}}function $s(e,t){e.title=t,e.setAttribute("aria-label",t)}function U0(e){const t=e.label??Mf;return f`
    <button
      class="chat-copy-btn"
      type="button"
      title=${t}
      aria-label=${t}
      @click=${async n=>{const i=n.currentTarget;if(!i||i.dataset.copying==="1")return;i.dataset.copying="1",i.setAttribute("aria-busy","true"),i.disabled=!0;const s=await H0(e.text());if(i.isConnected){if(delete i.dataset.copying,i.removeAttribute("aria-busy"),i.disabled=!1,!s){i.dataset.error="1",$s(i,z0),window.setTimeout(()=>{i.isConnected&&(delete i.dataset.error,$s(i,t))},N0);return}i.dataset.copied="1",$s(i,B0),window.setTimeout(()=>{i.isConnected&&(delete i.dataset.copied,$s(i,t))},F0)}}}
    >
      <span class="chat-copy-btn__icon" aria-hidden="true">
        <span class="chat-copy-btn__icon-copy">${be.copy}</span>
        <span class="chat-copy-btn__icon-check">${be.check}</span>
      </span>
    </button>
  `}function q0(e){return U0({text:()=>e,label:Mf})}function Bn(e){const t=e;let n=typeof t.role=="string"?t.role:"unknown";const i=typeof t.toolCallId=="string"||typeof t.tool_call_id=="string",s=t.content,o=Array.isArray(s)?s:null,r=Array.isArray(o)&&o.some(u=>{const h=u,g=(typeof h.type=="string"?h.type:"").toLowerCase();return g==="toolresult"||g==="tool_result"}),a=typeof t.toolName=="string"||typeof t.tool_name=="string";(i||r||a)&&(n="toolResult");let l=[];typeof t.content=="string"?l=[{type:"text",text:t.content}]:Array.isArray(t.content)?l=t.content.map(u=>({type:u.type||"text",text:u.text,name:u.name,args:u.args||u.arguments})):typeof t.text=="string"&&(l=[{type:"text",text:t.text}]);const c=typeof t.timestamp=="number"?t.timestamp:Date.now(),d=typeof t.id=="string"?t.id:void 0;return{role:n,content:l,timestamp:c,id:d}}function vl(e){const t=e.toLowerCase();return e==="user"||e==="User"?e:e==="assistant"?"assistant":e==="system"?"system":t==="toolresult"||t==="tool_result"||t==="tool"||t==="function"?"tool":e}function Df(e){const t=e,n=typeof t.role=="string"?t.role.toLowerCase():"";return n==="toolresult"||n==="tool_result"}function j0(e){return(e??"").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())||"Tool"}function K0(e){const t=(e??"").trim();return t?t.replace(/\s+/g,"_").toLowerCase():""}function W0(e){return(e??"").trim().toLowerCase()||"use"}const V0={icon:"puzzle",detailKeys:["command","path","url","targetUrl","targetId","ref","element","node","nodeId","id","requestId","to","channelId","guildId","userId","name","query","pattern","messageId"]},G0={bash:{icon:"wrench",title:"Bash",detailKeys:["command"]},process:{icon:"wrench",title:"Process",detailKeys:["sessionId"]},read:{icon:"fileText",title:"Read",detailKeys:["path"]},write:{icon:"edit",title:"Write",detailKeys:["path"]},edit:{icon:"penLine",title:"Edit",detailKeys:["path"]},attach:{icon:"paperclip",title:"Attach",detailKeys:["path","url","fileName"]},browser:{icon:"globe",title:"Browser",actions:{status:{label:"status"},start:{label:"start"},stop:{label:"stop"},tabs:{label:"tabs"},open:{label:"open",detailKeys:["targetUrl"]},focus:{label:"focus",detailKeys:["targetId"]},close:{label:"close",detailKeys:["targetId"]},snapshot:{label:"snapshot",detailKeys:["targetUrl","targetId","ref","element","format"]},screenshot:{label:"screenshot",detailKeys:["targetUrl","targetId","ref","element"]},navigate:{label:"navigate",detailKeys:["targetUrl","targetId"]},console:{label:"console",detailKeys:["level","targetId"]},pdf:{label:"pdf",detailKeys:["targetId"]},upload:{label:"upload",detailKeys:["paths","ref","inputRef","element","targetId"]},dialog:{label:"dialog",detailKeys:["accept","promptText","targetId"]},act:{label:"act",detailKeys:["request.kind","request.ref","request.selector","request.text","request.value"]}}},canvas:{icon:"image",title:"Canvas",actions:{present:{label:"present",detailKeys:["target","node","nodeId"]},hide:{label:"hide",detailKeys:["node","nodeId"]},navigate:{label:"navigate",detailKeys:["url","node","nodeId"]},eval:{label:"eval",detailKeys:["javaScript","node","nodeId"]},snapshot:{label:"snapshot",detailKeys:["format","node","nodeId"]},a2ui_push:{label:"A2UI push",detailKeys:["jsonlPath","node","nodeId"]},a2ui_reset:{label:"A2UI reset",detailKeys:["node","nodeId"]}}},nodes:{icon:"smartphone",title:"Nodes",actions:{status:{label:"status"},describe:{label:"describe",detailKeys:["node","nodeId"]},pending:{label:"pending"},approve:{label:"approve",detailKeys:["requestId"]},reject:{label:"reject",detailKeys:["requestId"]},notify:{label:"notify",detailKeys:["node","nodeId","title","body"]},camera_snap:{label:"camera snap",detailKeys:["node","nodeId","facing","deviceId"]},camera_list:{label:"camera list",detailKeys:["node","nodeId"]},camera_clip:{label:"camera clip",detailKeys:["node","nodeId","facing","duration","durationMs"]},screen_record:{label:"screen record",detailKeys:["node","nodeId","duration","durationMs","fps","screenIndex"]}}},cron:{icon:"loader",title:"Cron",actions:{status:{label:"status"},list:{label:"list"},add:{label:"add",detailKeys:["job.name","job.id","job.schedule","job.cron"]},update:{label:"update",detailKeys:["id"]},remove:{label:"remove",detailKeys:["id"]},run:{label:"run",detailKeys:["id"]},runs:{label:"runs",detailKeys:["id"]},wake:{label:"wake",detailKeys:["text","mode"]}}},gateway:{icon:"plug",title:"Gateway",actions:{restart:{label:"restart",detailKeys:["reason","delayMs"]},"config.get":{label:"config get"},"config.schema":{label:"config schema"},"config.apply":{label:"config apply",detailKeys:["restartDelayMs"]},"update.run":{label:"update run",detailKeys:["restartDelayMs"]}}},whatsapp_login:{icon:"circle",title:"WhatsApp Login",actions:{start:{label:"start"},wait:{label:"wait"}}},discord:{icon:"messageSquare",title:"Discord",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sticker:{label:"sticker",detailKeys:["to","stickerIds"]},poll:{label:"poll",detailKeys:["question","to"]},permissions:{label:"permissions",detailKeys:["channelId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},threadCreate:{label:"thread create",detailKeys:["channelId","name"]},threadList:{label:"thread list",detailKeys:["guildId","channelId"]},threadReply:{label:"thread reply",detailKeys:["channelId","content"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},searchMessages:{label:"search",detailKeys:["guildId","content"]},memberInfo:{label:"member",detailKeys:["guildId","userId"]},roleInfo:{label:"roles",detailKeys:["guildId"]},emojiList:{label:"emoji list",detailKeys:["guildId"]},roleAdd:{label:"role add",detailKeys:["guildId","userId","roleId"]},roleRemove:{label:"role remove",detailKeys:["guildId","userId","roleId"]},channelInfo:{label:"channel",detailKeys:["channelId"]},channelList:{label:"channels",detailKeys:["guildId"]},voiceStatus:{label:"voice",detailKeys:["guildId","userId"]},eventList:{label:"events",detailKeys:["guildId"]},eventCreate:{label:"event create",detailKeys:["guildId","name"]},timeout:{label:"timeout",detailKeys:["guildId","userId"]},kick:{label:"kick",detailKeys:["guildId","userId"]},ban:{label:"ban",detailKeys:["guildId","userId"]}}},slack:{icon:"messageSquare",title:"Slack",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},memberInfo:{label:"member",detailKeys:["userId"]},emojiList:{label:"emoji list"}}}},Q0={fallback:V0,tools:G0},If=Q0,cd=If.fallback??{icon:"puzzle"},Y0=If.tools??{};function X0(e){if(!e)return e;const t=[{re:/^\/Users\/[^/]+(\/|$)/,replacement:"~$1"},{re:/^\/home\/[^/]+(\/|$)/,replacement:"~$1"},{re:/^C:\\Users\\[^\\]+(\\|$)/i,replacement:"~$1"}];for(const n of t)if(n.re.test(e))return e.replace(n.re,n.replacement);return e}function J0(e){const t=K0(e.name),n=t.toLowerCase(),i=Y0[n],s=(i==null?void 0:i.icon)??cd.icon??"puzzle",o=(i==null?void 0:i.title)??j0(t),r=(i==null?void 0:i.label)??o,a=e.args&&typeof e.args=="object"?e.args.action:void 0,l=typeof a=="string"?a.trim():void 0,c=n==="web_search"?"search":n==="web_fetch"?"fetch":n.replace(/_/g," ").replace(/\./g," "),d=W0(l??c);let u;n==="exec"&&(u=void 0),!u&&n==="read"&&(u=void 0),!u&&(n==="write"||n==="edit"||n==="attach")&&(u=void 0),!u&&n==="web_search"&&(u=void 0),!u&&n==="web_fetch"&&(u=void 0);const h=(i==null?void 0:i.detailKeys)??cd.detailKeys??[];return!u&&h.length>0&&(u=void 0),!u&&e.meta&&(u=e.meta),u&&(u=X0(u)),{name:t,icon:s,title:o,label:r,verb:d,detail:u}}function Z0(e){if(e.detail){if(e.detail.includes(" · ")){const t=e.detail.split(" · ").map(n=>n.trim()).filter(n=>n.length>0).join(", ");return t?`with ${t}`:void 0}return e.detail}}const ew=80,tw=2,dd=100;function nw(e){const t=e.trim();if(t.startsWith("{")||t.startsWith("["))try{const n=JSON.parse(t);return"```json\n"+JSON.stringify(n,null,2)+"\n```"}catch{}return e}function iw(e){const t=e.split(`
`),n=t.slice(0,tw),i=n.join(`
`);return i.length>dd?i.slice(0,dd)+"…":n.length<t.length?i+"…":i}function sw(e){const t=e,n=ow(t.content),i=[];for(const s of n){const o=(typeof s.type=="string"?s.type:"").toLowerCase();(["toolcall","tool_call","tooluse","tool_use"].includes(o)||typeof s.name=="string"&&s.arguments!=null)&&i.push({kind:"call",name:s.name??"tool",args:rw(s.arguments??s.args)})}for(const s of n){const o=(typeof s.type=="string"?s.type:"").toLowerCase();if(o!=="toolresult"&&o!=="tool_result")continue;const r=aw(s),a=typeof s.name=="string"?s.name:"tool";i.push({kind:"result",name:a,text:r})}if(Df(e)&&!i.some(s=>s.kind==="result")){const s=typeof t.toolName=="string"&&t.toolName||typeof t.tool_name=="string"&&t.tool_name||"tool",o=Ei(e)??void 0;i.push({kind:"result",name:s,text:o})}return i}function ud(e,t){var u,h;const n=J0({name:e.name,args:e.args}),i=Z0(n),s=!!((u=e.text)!=null&&u.trim()),o=!!t,r=o?()=>{if(s){t(nw(e.text));return}const g=`## ${n.label}

${i?`**Command:** \`${i}\`

`:""}*No output — tool completed successfully.*`;t(g)}:void 0,a=s&&(((h=e.text)==null?void 0:h.length)??0)<=ew,l=s&&!a,c=s&&a,d=!s;return f`
    <div
      class="chat-tool-card ${o?"chat-tool-card--clickable":""}"
      @click=${r}
      role=${o?"button":$}
      tabindex=${o?"0":$}
      @keydown=${o?g=>{g.key!=="Enter"&&g.key!==" "||(g.preventDefault(),r==null||r())}:$}
    >
      <div class="chat-tool-card__header">
        <div class="chat-tool-card__title">
          <span class="chat-tool-card__icon">${be[n.icon]}</span>
          <span>${n.label}</span>
        </div>
        ${o?f`<span class="chat-tool-card__action">${s?"View":""} ${be.check}</span>`:$}
        ${d&&!o?f`<span class="chat-tool-card__status">${be.check}</span>`:$}
      </div>
      ${i?f`<div class="chat-tool-card__detail">${i}</div>`:$}
      ${d?f`
              <div class="chat-tool-card__status-text muted">Completed</div>
            `:$}
      ${l?f`<div class="chat-tool-card__preview mono">${iw(e.text)}</div>`:$}
      ${c?f`<div class="chat-tool-card__inline mono">${e.text}</div>`:$}
    </div>
  `}function ow(e){return Array.isArray(e)?e.filter(Boolean):[]}function rw(e){if(typeof e!="string")return e;const t=e.trim();if(!t||!t.startsWith("{")&&!t.startsWith("["))return e;try{return JSON.parse(t)}catch{return e}}function aw(e){if(typeof e.text=="string")return e.text;if(typeof e.content=="string")return e.content}function lw(e){const n=e.content,i=[];if(!Array.isArray(n))return i;for(const s of n){if(typeof s!="object"||s===null)continue;const o=s;if(o.type!=="file"||typeof o.file_name!="string")continue;const r=o.summaryMeta;i.push({file_name:o.file_name,file_path:typeof o.file_path=="string"?o.file_path:void 0,rows_count:r==null?void 0:r.rows_count,preview_count:r==null?void 0:r.preview_count,truncated:r==null?void 0:r.truncated})}return i}function cw(e){const n=e.content,i=[];if(Array.isArray(n))for(const s of n){if(typeof s!="object"||s===null)continue;const o=s;if(o.type==="image"){const r=o.source;if((r==null?void 0:r.type)==="base64"&&typeof r.data=="string"){const a=r.data,l=r.media_type||"image/png",c=a.startsWith("data:")?a:`data:${l};base64,${a}`;i.push({url:c})}else typeof o.url=="string"&&i.push({url:o.url})}else if(o.type==="image_url"){const r=o.image_url;typeof(r==null?void 0:r.url)=="string"&&i.push({url:r.url})}}return i}function dw(e){return f`
    <div class="chat-group assistant">
      ${No("assistant",e)}
      <div class="chat-group-messages">
        <div class="chat-bubble chat-reading-indicator" aria-hidden="true">
          <span class="chat-reading-indicator__dots">
            <span></span><span></span><span></span>
          </span>
        </div>
      </div>
    </div>
  `}function uw(e,t,n,i){const s=new Date(t).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}),o=(i==null?void 0:i.name)??"Assistant";return f`
    <div class="chat-group assistant">
      ${No("assistant",i)}
      <div class="chat-group-messages">
        ${Of({role:"assistant",content:[{type:"text",text:e}],timestamp:t},{isStreaming:!0,showReasoning:!1},n)}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${o}</span>
          <span class="chat-group-timestamp">${s}</span>
        </div>
      </div>
    </div>
  `}function hw(e,t){const n=vl(e.role),i=t.assistantName??"Assistant",s=n==="user"?"You":n==="assistant"?i:n,o=n==="user"?"user":n==="assistant"?"assistant":"other",r=new Date(e.timestamp).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return f`
    <div class="chat-group ${o}">
      ${No(e.role,{name:i,avatar:t.assistantAvatar??null})}
      <div class="chat-group-messages">
        ${e.messages.map((a,l)=>Of(a.message,{isStreaming:e.isStreaming&&l===e.messages.length-1,showReasoning:t.showReasoning},t.onOpenSidebar))}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${s}</span>
          <span class="chat-group-timestamp">${r}</span>
        </div>
      </div>
    </div>
  `}function No(e,t){var a,l;const n=vl(e),i=((a=t==null?void 0:t.name)==null?void 0:a.trim())||"Assistant",s=((l=t==null?void 0:t.avatar)==null?void 0:l.trim())||"",o=n==="user"?"U":n==="assistant"?i.charAt(0).toUpperCase()||"A":n==="tool"?"⚙":"?",r=n==="user"?"user":n==="assistant"?"assistant":n==="tool"?"tool":"other";return s&&n==="assistant"?fw(s)?f`<img
        class="chat-avatar ${r}"
        src="${s}"
        alt="${i}"
      />`:f`<div class="chat-avatar ${r}">${s}</div>`:f`<div class="chat-avatar ${r}">${o}</div>`}function fw(e){return/^https?:\/\//i.test(e)||/^data:image\//i.test(e)||e.startsWith("/")}function pw(e){return e.length===0?$:f`
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
  `}function gw(e){return e.length===0?$:f`
    <div class="chat-message-files">
      ${e.map(t=>f`
          <span class="chat-message-file" title=${t.file_path??t.file_name}>
            <span class="chat-message-file__name">${t.file_name}</span>
            ${[t.rows_count!=null?`rows=${t.rows_count}`:"",t.preview_count!=null?`preview=${t.preview_count}`:"",t.truncated?"…truncated":""].filter(Boolean).length?f`<span class="chat-message-file__meta">
                  ${[t.rows_count!=null?`rows=${t.rows_count}`:"",t.preview_count!=null?`preview=${t.preview_count}`:"",t.truncated?"…truncated":""].filter(Boolean).join(" / ")}
                </span>`:$}
          </span>
        `)}
    </div>
  `}function Of(e,t,n){const i=e,s=typeof i.role=="string"?i.role:"unknown",o=Df(e)||s.toLowerCase()==="toolresult"||s.toLowerCase()==="tool_result"||typeof i.toolCallId=="string"||typeof i.tool_call_id=="string",r=sw(e),a=r.length>0,l=cw(e),c=l.length>0,d=lw(e),u=d.length>0,h=Ei(e),g=t.showReasoning&&s==="assistant"?sy(e):null,v=h!=null&&h.trim()?h:null,b=g?ry(g):null,y=v,S=s==="assistant"&&!!(y!=null&&y.trim()),E=["chat-bubble",S?"has-copy":"",t.isStreaming?"streaming":"","fade-in"].filter(Boolean).join(" ");return!y&&a&&o?f`${r.map(L=>ud(L,n))}`:!y&&!b&&!a&&!c&&!u?$:f`
    <div class="${E}">
      ${S?q0(y):$}
      ${pw(l)}
      ${gw(d)}
      ${b?f`<div class="chat-thinking">${ro(uo(b))}</div>`:$}
      ${y?f`<div class="chat-text" dir="${Pf(y)}">${ro(uo(y))}</div>`:$}
      ${r.map(L=>ud(L,n))}
    </div>
  `}function mw(e){return f`
    <div class="sidebar-panel">
      <div class="sidebar-header">
        <div class="sidebar-title">Tool Output</div>
        <button @click=${e.onClose} class="btn" title="Close sidebar">
          ${be.x}
        </button>
      </div>
      <div class="sidebar-content">
        ${e.error?f`
              <div class="callout danger">${e.error}</div>
              <button @click=${e.onViewRawText} class="btn" style="margin-top: 12px;">
                View Raw Text
              </button>
            `:e.content?f`<div class="sidebar-markdown">${ro(uo(e.content))}</div>`:f`
                  <div class="muted">No content available</div>
                `}
      </div>
    </div>
  `}var vw=Object.defineProperty,yw=Object.getOwnPropertyDescriptor,Bo=(e,t,n,i)=>{for(var s=i>1?void 0:i?yw(t,n):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(s=(i?r(t,n,s):r(s))||s);return i&&s&&vw(t,n,s),s};let Yn=class extends fn{constructor(){super(...arguments),this.splitRatio=.6,this.minRatio=.4,this.maxRatio=.7,this.isDragging=!1,this.startX=0,this.startRatio=0,this.handleMouseDown=e=>{this.isDragging=!0,this.startX=e.clientX,this.startRatio=this.splitRatio,this.classList.add("dragging"),document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),e.preventDefault()},this.handleMouseMove=e=>{if(!this.isDragging)return;const t=this.parentElement;if(!t)return;const n=t.getBoundingClientRect().width,s=(e.clientX-this.startX)/n;let o=this.startRatio+s;o=Math.max(this.minRatio,Math.min(this.maxRatio,o)),this.dispatchEvent(new CustomEvent("resize",{detail:{splitRatio:o},bubbles:!0,composed:!0}))},this.handleMouseUp=()=>{this.isDragging=!1,this.classList.remove("dragging"),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}}render(){return $}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}};Yn.styles=qu`
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
  `;Bo([Kt({type:Number})],Yn.prototype,"splitRatio",2);Bo([Kt({type:Number})],Yn.prototype,"minRatio",2);Bo([Kt({type:Number})],Yn.prototype,"maxRatio",2);Yn=Bo([La("resizable-divider")],Yn);const bw=5e3,Er=5,xw=/\.(xlsx|xls|xlsm|pdf)$/i;function ww(e){return Number.isFinite(e)?Number.isInteger(e)?String(e):e.toFixed(2):"—"}function _w(e,t){const n=e.candidates,i=n.length,s=n.slice(0,Er),o=i>Er?i-Er:0;return f`
    <div class="chat-group assistant">
      ${No("assistant",t)}
      <div class="chat-group-messages">
        <div class="chat-tool-render chat-candidates-preview" role="status" aria-live="polite">
          <div class="candidates-preview-card">
            <div class="candidates-preview-card__title">
              ${be.search}
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
                      <td>${ww(r.unit_price)}</td>
                    </tr>
                  `)}
              </tbody>
            </table>
            ${o>0?f`<p class="candidates-preview-card__more">
                  ${p("chat.ui.candidatesPreview.more",{n:String(o)})}
                </p>`:$}
            <div class="candidates-preview-card__status">
              ${be.loader}
              <span>${p("chat.ui.candidatesPreview.selecting",{n:String(i)})}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}function kw(e){for(let t=0;t<e.length;t++)if(xw.test(e[t].name))return e[t];return null}function hd(e){e.style.height="auto",e.style.height=`${e.scrollHeight}px`}function $w(e){return e?e.active?f`
      <div class="compaction-indicator compaction-indicator--active" role="status" aria-live="polite">
        ${be.loader} ${p("chat.ui.compaction.active")}
      </div>
    `:e.completedAt&&Date.now()-e.completedAt<bw?f`
        <div class="compaction-indicator compaction-indicator--complete" role="status" aria-live="polite">
          ${be.check} ${p("chat.ui.compaction.done")}
        </div>
      `:$:$}function Sw(){return`att-${Date.now()}-${Math.random().toString(36).slice(2,9)}`}function Aw(e,t){var s;const n=(s=e.clipboardData)==null?void 0:s.items;if(!n||!t.onAttachmentsChange)return;const i=[];for(let o=0;o<n.length;o++){const r=n[o];r.type.startsWith("image/")&&i.push(r)}if(i.length!==0){e.preventDefault();for(const o of i){const r=o.getAsFile();if(!r)continue;const a=new FileReader;a.addEventListener("load",()=>{var u;const l=a.result,c={id:Sw(),dataUrl:l,mimeType:r.type},d=t.attachments??[];(u=t.onAttachmentsChange)==null||u.call(t,[...d,c])}),a.readAsDataURL(r)}}}function Tw(e){const t=e.attachments??[];return t.length===0?$:f`
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
              ${be.x}
            </button>
          </div>
        `)}
    </div>
  `}function Cw(e){const t=e.uploadedFile,n=e.onFileSelect,i=e.onClearUploadedFile;if(t!=null&&t.file_name){const s=t.summaryMeta;return f`
      <div class="chat-uploaded-file">
        <span class="chat-uploaded-file__name" title=${t.file_path}>${t.file_name}</span>
        <button
          type="button"
          class="btn chat-uploaded-file__clear"
          aria-label=${p("chat.ui.upload.remove")}
          @click=${i}
        >
          ${be.x}
        </button>
        ${s?f`<span class="chat-uploaded-file__meta">
              ${[s.rows_count!=null?`rows=${s.rows_count}`:"",s.preview_count!=null?`preview=${s.preview_count}`:"",s.truncated?"…truncated":""].filter(Boolean).join(" / ")}
            </span>`:$}
      </div>
    `}return!n||!e.connected?$:f`
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
  `}function Ew(e){var y,S,E,L;const t=e.connected,n=e.sending||e.stream!==null,i=!!(e.canAbort&&e.onAbort),s=(S=(y=e.sessions)==null?void 0:y.sessions)==null?void 0:S.find(T=>T.key===e.sessionKey),o=e.showThinking&&(s==null?void 0:s.reasoningLevel)!=="off",r={name:e.assistantName,avatar:e.assistantAvatar??e.assistantAvatarUrl??null},a=(((E=e.attachments)==null?void 0:E.length)??0)>0;(L=e.uploadedFile)!=null&&L.file_name;const l=e.connected?p(a?"chat.ui.compose.placeholder.withImages":"chat.ui.compose.placeholder.default"):p("chat.ui.compose.placeholder.disconnected"),c=e.splitRatio??.6,d=!!(e.sidebarOpen&&e.onCloseSidebar),u=f`
    <div
      class="chat-thread"
      role="log"
      aria-live="polite"
      @scroll=${e.onChatScroll}
    >
      ${e.loading?f`
              <div class="muted">Loading chat…</div>
            `:$}
      ${sf(Lw(e),T=>T.key,T=>T.kind==="divider"?f`
              <div class="chat-divider" role="separator" data-ts=${String(T.timestamp)}>
                <span class="chat-divider__line"></span>
                <span class="chat-divider__label">${T.label}</span>
                <span class="chat-divider__line"></span>
              </div>
            `:T.kind==="reading-indicator"?dw(r):T.kind==="stream"?uw(T.text,T.startedAt,e.onOpenSidebar,r):T.kind==="candidates-preview"?_w(T.preview,r):T.kind==="group"?hw(T,{onOpenSidebar:e.onOpenSidebar,showReasoning:o,assistantName:e.assistantName,assistantAvatar:r.avatar}):$)}
    </div>
  `,h=T=>{var C;T.preventDefault(),T.stopPropagation(),T.dataTransfer&&(T.dataTransfer.dropEffect="copy"),(C=e.onComposeDragOver)==null||C.call(e)},g=T=>{var C;T.preventDefault(),T.stopPropagation(),T.dataTransfer&&(T.dataTransfer.dropEffect="copy"),(C=e.onComposeDragOver)==null||C.call(e)},v=T=>{var m;const C=T.currentTarget,M=T.relatedTarget;M!=null&&(C.contains(M)||(m=e.onComposeDragLeave)==null||m.call(e))},b=T=>{var M,m,k;T.preventDefault(),T.stopPropagation(),(M=e.onComposeDragLeave)==null||M.call(e);const C=(k=(m=T.dataTransfer)==null?void 0:m.files)!=null&&k.length?kw(T.dataTransfer.files):null;C&&e.onComposeDrop&&e.onComposeDrop(C)};return f`
    <section
      class="card chat ${e.composeDragOver?"chat--drag-over":""}"
      @dragenter=${h}
      @dragover=${g}
      @dragleave=${v}
      @drop=${b}
    >
      ${e.disabledReason?f`<div class="callout">${e.disabledReason}</div>`:$}

      ${e.error?f`<div class="callout danger">${e.error}</div>`:$}

      ${e.focusMode?f`
            <button
              class="chat-focus-exit"
              type="button"
              @click=${e.onToggleFocusMode}
              aria-label=${p("chat.ui.compose.exitFocus")}
              title=${p("chat.ui.compose.exitFocus")}
            >
              ${be.x}
            </button>
          `:$}

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
                @resize=${T=>{var C;return(C=e.onSplitRatioChange)==null?void 0:C.call(e,T.detail.splitRatio)}}
              ></resizable-divider>
              <div class="chat-sidebar">
                ${mw({content:e.sidebarContent??null,error:e.sidebarError??null,onClose:e.onCloseSidebar,onViewRawText:()=>{!e.sidebarContent||!e.onOpenSidebar||e.onOpenSidebar(`\`\`\`
${e.sidebarContent}
\`\`\``)}})}
              </div>
            `:$}
      </div>

      ${e.queue.length?f`
            <div class="chat-queue" role="status" aria-live="polite">
              <div class="chat-queue__title">
                ${p("chat.ui.queue.title",{count:String(e.queue.length)})}
              </div>
              <div class="chat-queue__list">
                ${e.queue.map(T=>{var C;return f`
                    <div class="chat-queue__item">
                      <div class="chat-queue__text">
                        ${T.text||((C=T.attachments)!=null&&C.length?p("chat.ui.queue.imageItem",{count:String(T.attachments.length)}):"")}
                      </div>
                      <button
                        class="btn chat-queue__remove"
                        type="button"
                        aria-label=${p("chat.ui.queue.remove")}
                        @click=${()=>e.onQueueRemove(T.id)}
                      >
                        ${be.x}
                      </button>
                    </div>
                  `})}
              </div>
            </div>
          `:$}

      ${$w(e.compactionStatus)}

      ${e.showNewMessages?f`
            <button
              class="btn chat-new-messages"
              type="button"
              @click=${e.onScrollToBottom}
            >
              ${p("chat.ui.compose.newMessages")} ${be.arrowDown}
            </button>
          `:$}

      <div class="chat-compose ${e.composeDragOver?"chat-compose--drag-over":""}">
        ${e.composeDragOver?f`<div class="chat-compose__drop-hint">
              ${p("chat.ui.compose.dropHint")}
            </div>`:$}
        ${Tw(e)}
        ${Cw(e)}
        <div class="chat-compose__row">
          <label class="field chat-compose__field">
            <span>${p("chat.ui.compose.label")}</span>
            <textarea
              ${yx(T=>T&&hd(T))}
              .value=${e.draft}
              dir=${Pf(e.draft)}
              ?disabled=${!e.connected}
              @keydown=${T=>{T.key==="Enter"&&(T.isComposing||T.keyCode===229||T.shiftKey||e.connected&&(T.preventDefault(),t&&e.onSend()))}}
              @input=${T=>{const C=T.target;hd(C),e.onDraftChange(C.value)}}
              @paste=${T=>Aw(T,e)}
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
  `}const fd=200;function Rw(e){const t=[];let n=null;for(const i of e){if(i.kind!=="message"){n&&(t.push(n),n=null),t.push(i);continue}const s=Bn(i.message),o=vl(s.role),r=s.timestamp||Date.now(),a=i.message.__openclaw;if((a==null?void 0:a.kind)==="tool_render"){n&&(t.push(n),n=null),t.push({kind:"group",key:`group:${o}:${i.key}`,role:o,messages:[{message:i.message,key:i.key}],timestamp:r,isStreaming:!1});continue}!n||n.role!==o?(n&&t.push(n),n={kind:"group",key:`group:${o}:${i.key}`,role:o,messages:[{message:i.message,key:i.key}],timestamp:r,isStreaming:!1}):n.messages.push({message:i.message,key:i.key})}return n&&t.push(n),t}function Lw(e){var L,T,C,M;const t=[],n=new Set,i=Array.isArray(e.messages)?e.messages:[],s=Array.isArray(e.toolMessages)?e.toolMessages:[];let r=[...Array.isArray(e.toolRenderItems)?e.toolRenderItems:[]].sort((m,k)=>m.ts-k.ts);r.length===0&&e.toolRenderData&&r.push({id:`legacy:${e.toolRenderSeq??Date.now()}`,runId:"",seq:e.toolRenderSeq??0,ts:Date.now(),payload:e.toolRenderData});const a=new Set([Vv,"[已渲染到前端]"]),l=m=>{for(const k of a)if(k&&m.startsWith(k))return!0;return!1},c=m=>{const k=m.input_index;if(typeof k=="number"&&Number.isFinite(k))return k;if(typeof k=="string"){const R=Number(k);return Number.isFinite(R)?R:0}return 0},d=m=>{const k=(Array.isArray(m.resolved_items)?m.resolved_items:[]).slice().sort((N,B)=>c(N)-c(B)),R=(Array.isArray(m.pending_items)?m.pending_items:[]).slice().sort((N,B)=>c(N)-c(B)),D=(Array.isArray(m.unmatched_items)?m.unmatched_items:[]).slice().sort((N,B)=>c(N)-c(B)),P=[];P.push("**批处理总表**"),P.push(""),P.push("| 序号 | 状态 | 产品编号(code) | 产品名称 |"),P.push("|---|---|---|---|");const F=[];for(const N of k){const B=N.chosen??{},I=c(N);F.push({idx:I,line:`| ${I+1} | matched | ${String(B.code??"—")} | ${String(B.matched_name??"—")} |`})}for(const N of R){const I=(Array.isArray(N.options)?N.options:[])[0]??{},V=c(N);F.push({idx:V,line:`| ${V+1} | needs_selection | ${String(I.code??"—")} | ${String(I.matched_name??"待确认")} |`})}for(const N of D){const B=c(N);F.push({idx:B,line:`| ${B+1} | unmatched | — | — |`})}F.sort((N,B)=>N.idx-B.idx);for(const N of F)P.push(N.line);return P.join(`
`)},u=(m,k,R)=>{var P;const D=(m.payload.batch_mode?d(m.payload):((P=m.payload.formatted_response)==null?void 0:P.trim())??"").trim();D&&(t.push({kind:"message",key:`tool-render:${e.sessionKey}:${m.id}:${R}`,message:{role:"assistant",content:[{type:"text",text:D}],timestamp:k,__openclaw:{kind:"tool_render",runId:m.runId,seq:m.seq}}}),n.add(D))},h=Math.max(0,i.length-fd),g=i.length>h?Bn(i[h]).timestamp??0:0,v=i.length>0?Bn(i[i.length-1]).timestamp??0:0,b=[];for(let m=h;m<i.length;m++){const k=i[m],R=Bn(k),D=((L=Ei(k))==null?void 0:L.trim())??"";R.role.toLowerCase()==="assistant"&&l(D)&&b.push(m)}const y=new Map;if(b.length>0&&r.length>0){const m=b.map(R=>{const D=i[R],P=Bn(D);return{index:R,timestamp:P.timestamp??0}}),k=[];for(const R of r){const D=typeof R.ts=="number"?R.ts:0;if(D<g)continue;let P=null;for(const N of m){const B=N.timestamp-D;B<0||(P==null||B<P.delta)&&(P={index:N.index,delta:B})}if(!P){D>v&&k.push(R);continue}const F=y.get(P.index);F?F.push(R):y.set(P.index,[R])}for(const R of y.values())R.sort((D,P)=>D.ts-P.ts);r=k}h>0&&t.push({kind:"message",key:"chat:history:notice",message:{role:"system",content:`Showing last ${fd} messages (${h} hidden).`,timestamp:Date.now()}});for(let m=h;m<i.length;m++){const k=i[m],R=Bn(k),D=((T=Ei(k))==null?void 0:T.trim())??"",F=k.__openclaw;if(F&&F.kind==="compaction"){t.push({kind:"divider",key:typeof F.id=="string"?`divider:compaction:${F.id}`:`divider:compaction:${R.timestamp}:${m}`,label:p("chat.ui.compaction.divider"),timestamp:R.timestamp??Date.now()});continue}if(!e.showThinking&&R.role.toLowerCase()==="toolresult")continue;if(R.role.toLowerCase()==="assistant"&&l(D)){const B=y.get(m);if(B&&B.length>0)for(let I=0;I<B.length;I++){const V=B[I];u(V,R.timestamp??Date.now(),m*1e3+I)}else t.push({kind:"message",key:Rr(k,m),message:k});continue}const N=k.__openclaw;if((N==null?void 0:N.kind)==="tool_render"){const B=((C=Ei(k))==null?void 0:C.trim())??"";B&&n.add(B)}t.push({kind:"message",key:Rr(k,m),message:k})}if(e.showThinking)for(let m=0;m<s.length;m++)t.push({kind:"message",key:Rr(s[m],m+i.length),message:s[m]});const S=Array.isArray(e.candidatePreviews)?e.candidatePreviews:[];for(let m=0;m<S.length;m++)t.push({kind:"candidates-preview",key:`candidates-preview:${S[m].id}`,preview:S[m]});const E=new Set;for(let m=0;m<r.length;m++){const k=r[m],R=typeof k.ts=="number"?k.ts:0;if(g>0&&R<g)continue;const D=((M=k.payload.formatted_response)==null?void 0:M.trim())??"";D&&(n.has(D)||E.has(D)||(E.add(D),u(k,k.ts||Date.now(),i.length+m)))}if(e.stream!==null){const m=`stream:${e.sessionKey}:${e.streamStartedAt??"live"}`;e.stream.trim().length>0?t.push({kind:"stream",key:m,text:e.stream,startedAt:e.streamStartedAt??Date.now()}):t.push({kind:"reading-indicator",key:m})}return Rw(t)}function Rr(e,t){const n=e,i=typeof n.toolCallId=="string"?n.toolCallId:"";if(i)return`tool:${i}`;const s=typeof n.id=="string"?n.id:"";if(s)return`msg:${s}`;const o=typeof n.messageId=="string"?n.messageId:"";if(o)return`msg:${o}`;const r=typeof n.timestamp=="number"?n.timestamp:null,a=typeof n.role=="string"?n.role:"unknown";return r!=null?`msg:${a}:${r}:${t}`:`msg:${a}:${t}`}const Pw=new Set(["title","description","default","nullable"]);function Mw(e){return Object.keys(e??{}).filter(n=>!Pw.has(n)).length===0}function Dw(e){if(e===void 0)return"";try{return JSON.stringify(e,null,2)??""}catch{return""}}const Wi={chevronDown:f`
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
  `};function Sn(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:r,onPatch:a}=e,l=e.showLabel??!0,c=Ve(t),d=Ge(i,s),u=(d==null?void 0:d.label)??t.title??Et(String(i.at(-1))),h=(d==null?void 0:d.help)??t.description,g=Ma(i);if(o.has(g))return f`<div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${u}</div>
      <div class="cfg-field__error">Unsupported schema node. Use Raw mode.</div>
    </div>`;if(t.anyOf||t.oneOf){const b=(t.anyOf??t.oneOf??[]).filter(C=>!(C.type==="null"||Array.isArray(C.type)&&C.type.includes("null")));if(b.length===1)return Sn({...e,schema:b[0]});const y=C=>{if(C.const!==void 0)return C.const;if(C.enum&&C.enum.length===1)return C.enum[0]},S=b.map(y),E=S.every(C=>C!==void 0);if(E&&S.length>0&&S.length<=5){const C=n??t.default;return f`
        <div class="cfg-field">
          ${l?f`<label class="cfg-field__label">${u}</label>`:$}
          ${h?f`<div class="cfg-field__help">${h}</div>`:$}
          <div class="cfg-segmented">
            ${S.map(M=>f`
              <button
                type="button"
                class="cfg-segmented__btn ${M===C||String(M)===String(C)?"active":""}"
                ?disabled=${r}
                @click=${()=>a(i,M)}
              >
                ${String(M)}
              </button>
            `)}
          </div>
        </div>
      `}if(E&&S.length>5)return gd({...e,options:S,value:n??t.default});const L=new Set(b.map(C=>Ve(C)).filter(Boolean)),T=new Set([...L].map(C=>C==="integer"?"number":C));if([...T].every(C=>["string","number","boolean"].includes(C))){const C=T.has("string"),M=T.has("number");if(T.has("boolean")&&T.size===1)return Sn({...e,schema:{...t,type:"boolean",anyOf:void 0,oneOf:void 0}});if(C||M)return pd({...e,inputType:M&&!C?"number":"text"})}}if(t.enum){const v=t.enum;if(v.length<=5){const b=n??t.default;return f`
        <div class="cfg-field">
          ${l?f`<label class="cfg-field__label">${u}</label>`:$}
          ${h?f`<div class="cfg-field__help">${h}</div>`:$}
          <div class="cfg-segmented">
            ${v.map(y=>f`
              <button
                type="button"
                class="cfg-segmented__btn ${y===b||String(y)===String(b)?"active":""}"
                ?disabled=${r}
                @click=${()=>a(i,y)}
              >
                ${String(y)}
              </button>
            `)}
          </div>
        </div>
      `}return gd({...e,options:v,value:n??t.default})}if(c==="object")return Ow(e);if(c==="array")return Fw(e);if(c==="boolean"){const v=typeof n=="boolean"?n:typeof t.default=="boolean"?t.default:!1;return f`
      <label class="cfg-toggle-row ${r?"disabled":""}">
        <div class="cfg-toggle-row__content">
          <span class="cfg-toggle-row__label">${u}</span>
          ${h?f`<span class="cfg-toggle-row__help">${h}</span>`:$}
        </div>
        <div class="cfg-toggle">
          <input
            type="checkbox"
            .checked=${v}
            ?disabled=${r}
            @change=${b=>a(i,b.target.checked)}
          />
          <span class="cfg-toggle__track"></span>
        </div>
      </label>
    `}return c==="number"||c==="integer"?Iw(e):c==="string"?pd({...e,inputType:"text"}):f`
    <div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${u}</div>
      <div class="cfg-field__error">Unsupported type: ${c}. Use Raw mode.</div>
    </div>
  `}function pd(e){const{schema:t,value:n,path:i,hints:s,disabled:o,onPatch:r,inputType:a}=e,l=e.showLabel??!0,c=Ge(i,s),d=(c==null?void 0:c.label)??t.title??Et(String(i.at(-1))),u=(c==null?void 0:c.help)??t.description,h=((c==null?void 0:c.sensitive)??!1)&&!/^\$\{[^}]*\}$/.test(String(n??"").trim()),g=(c==null?void 0:c.placeholder)??(h?"••••":t.default!==void 0?`Default: ${String(t.default)}`:""),v=n??"";return f`
    <div class="cfg-field">
      ${l?f`<label class="cfg-field__label">${d}</label>`:$}
      ${u?f`<div class="cfg-field__help">${u}</div>`:$}
      <div class="cfg-input-wrap">
        <input
          type=${h?"password":a}
          class="cfg-input"
          placeholder=${g}
          .value=${v==null?"":String(v)}
          ?disabled=${o}
          @input=${b=>{const y=b.target.value;if(a==="number"){if(y.trim()===""){r(i,void 0);return}const S=Number(y);r(i,Number.isNaN(S)?y:S);return}r(i,y)}}
          @change=${b=>{if(a==="number")return;const y=b.target.value;r(i,y.trim())}}
        />
        ${t.default!==void 0?f`
          <button
            type="button"
            class="cfg-input__reset"
            title="Reset to default"
            ?disabled=${o}
            @click=${()=>r(i,t.default)}
          >↺</button>
        `:$}
      </div>
    </div>
  `}function Iw(e){const{schema:t,value:n,path:i,hints:s,disabled:o,onPatch:r}=e,a=e.showLabel??!0,l=Ge(i,s),c=(l==null?void 0:l.label)??t.title??Et(String(i.at(-1))),d=(l==null?void 0:l.help)??t.description,u=n??t.default??"",h=typeof u=="number"?u:0;return f`
    <div class="cfg-field">
      ${a?f`<label class="cfg-field__label">${c}</label>`:$}
      ${d?f`<div class="cfg-field__help">${d}</div>`:$}
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
          @input=${g=>{const v=g.target.value,b=v===""?void 0:Number(v);r(i,b)}}
        />
        <button
          type="button"
          class="cfg-number__btn"
          ?disabled=${o}
          @click=${()=>r(i,h+1)}
        >+</button>
      </div>
    </div>
  `}function gd(e){const{schema:t,value:n,path:i,hints:s,disabled:o,options:r,onPatch:a}=e,l=e.showLabel??!0,c=Ge(i,s),d=(c==null?void 0:c.label)??t.title??Et(String(i.at(-1))),u=(c==null?void 0:c.help)??t.description,h=n??t.default,g=r.findIndex(b=>b===h||String(b)===String(h)),v="__unset__";return f`
    <div class="cfg-field">
      ${l?f`<label class="cfg-field__label">${d}</label>`:$}
      ${u?f`<div class="cfg-field__help">${u}</div>`:$}
      <select
        class="cfg-select"
        ?disabled=${o}
        .value=${g>=0?String(g):v}
        @change=${b=>{const y=b.target.value;a(i,y===v?void 0:r[Number(y)])}}
      >
        <option value=${v}>Select...</option>
        ${r.map((b,y)=>f`
          <option value=${String(y)}>${String(b)}</option>
        `)}
      </select>
    </div>
  `}function Ow(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:r,onPatch:a}=e,l=Ge(i,s),c=(l==null?void 0:l.label)??t.title??Et(String(i.at(-1))),d=(l==null?void 0:l.help)??t.description,u=n??t.default,h=u&&typeof u=="object"&&!Array.isArray(u)?u:{},g=t.properties??{},b=Object.entries(g).toSorted((T,C)=>{var k,R;const M=((k=Ge([...i,T[0]],s))==null?void 0:k.order)??0,m=((R=Ge([...i,C[0]],s))==null?void 0:R.order)??0;return M!==m?M-m:T[0].localeCompare(C[0])}),y=new Set(Object.keys(g)),S=t.additionalProperties,E=!!S&&typeof S=="object",L=f`
    ${b.map(([T,C])=>Sn({schema:C,value:h[T],path:[...i,T],hints:s,unsupported:o,disabled:r,onPatch:a}))}
    ${E?Nw({schema:S,value:h,path:i,hints:s,unsupported:o,disabled:r,reservedKeys:y,onPatch:a}):$}
  `;return i.length===1?f`
      <div class="cfg-fields">
        ${L}
      </div>
    `:f`
    <details class="cfg-object" open>
      <summary class="cfg-object__header">
        <span class="cfg-object__title">${c}</span>
        <span class="cfg-object__chevron">${Wi.chevronDown}</span>
      </summary>
      ${d?f`<div class="cfg-object__help">${d}</div>`:$}
      <div class="cfg-object__content">
        ${L}
      </div>
    </details>
  `}function Fw(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:r,onPatch:a}=e,l=e.showLabel??!0,c=Ge(i,s),d=(c==null?void 0:c.label)??t.title??Et(String(i.at(-1))),u=(c==null?void 0:c.help)??t.description,h=Array.isArray(t.items)?t.items[0]:t.items;if(!h)return f`
      <div class="cfg-field cfg-field--error">
        <div class="cfg-field__label">${d}</div>
        <div class="cfg-field__error">Unsupported array schema. Use Raw mode.</div>
      </div>
    `;const g=Array.isArray(n)?n:Array.isArray(t.default)?t.default:[];return f`
    <div class="cfg-array">
      <div class="cfg-array__header">
        ${l?f`<span class="cfg-array__label">${d}</span>`:$}
        <span class="cfg-array__count">${g.length} item${g.length!==1?"s":""}</span>
        <button
          type="button"
          class="cfg-array__add"
          ?disabled=${r}
          @click=${()=>{const v=[...g,Qu(h)];a(i,v)}}
        >
          <span class="cfg-array__add-icon">${Wi.plus}</span>
          Add
        </button>
      </div>
      ${u?f`<div class="cfg-array__help">${u}</div>`:$}

      ${g.length===0?f`
              <div class="cfg-array__empty">No items yet. Click "Add" to create one.</div>
            `:f`
        <div class="cfg-array__items">
          ${g.map((v,b)=>f`
            <div class="cfg-array__item">
              <div class="cfg-array__item-header">
                <span class="cfg-array__item-index">#${b+1}</span>
                <button
                  type="button"
                  class="cfg-array__item-remove"
                  title="Remove item"
                  ?disabled=${r}
                  @click=${()=>{const y=[...g];y.splice(b,1),a(i,y)}}
                >
                  ${Wi.trash}
                </button>
              </div>
              <div class="cfg-array__item-content">
                ${Sn({schema:h,value:v,path:[...i,b],hints:s,unsupported:o,disabled:r,showLabel:!1,onPatch:a})}
              </div>
            </div>
          `)}
        </div>
      `}
    </div>
  `}function Nw(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:r,reservedKeys:a,onPatch:l}=e,c=Mw(t),d=Object.entries(n??{}).filter(([u])=>!a.has(u));return f`
    <div class="cfg-map">
      <div class="cfg-map__header">
        <span class="cfg-map__label">Custom entries</span>
        <button
          type="button"
          class="cfg-map__add"
          ?disabled=${r}
          @click=${()=>{const u={...n};let h=1,g=`custom-${h}`;for(;g in u;)h+=1,g=`custom-${h}`;u[g]=c?{}:Qu(t),l(i,u)}}
        >
          <span class="cfg-map__add-icon">${Wi.plus}</span>
          Add Entry
        </button>
      </div>

      ${d.length===0?f`
              <div class="cfg-map__empty">No custom entries.</div>
            `:f`
        <div class="cfg-map__items">
          ${d.map(([u,h])=>{const g=[...i,u],v=Dw(h);return f`
              <div class="cfg-map__item">
                <div class="cfg-map__item-key">
                  <input
                    type="text"
                    class="cfg-input cfg-input--sm"
                    placeholder="Key"
                    .value=${u}
                    ?disabled=${r}
                    @change=${b=>{const y=b.target.value.trim();if(!y||y===u)return;const S={...n};y in S||(S[y]=S[u],delete S[u],l(i,S))}}
                  />
                </div>
                <div class="cfg-map__item-value">
                  ${c?f`
                        <textarea
                          class="cfg-textarea cfg-textarea--sm"
                          placeholder="JSON value"
                          rows="2"
                          .value=${v}
                          ?disabled=${r}
                          @change=${b=>{const y=b.target,S=y.value.trim();if(!S){l(g,void 0);return}try{l(g,JSON.parse(S))}catch{y.value=v}}}
                        ></textarea>
                      `:Sn({schema:t,value:h,path:g,hints:s,unsupported:o,disabled:r,showLabel:!1,onPatch:l})}
                </div>
                <button
                  type="button"
                  class="cfg-map__item-remove"
                  title="Remove entry"
                  ?disabled=${r}
                  @click=${()=>{const b={...n};delete b[u],l(i,b)}}
                >
                  ${Wi.trash}
                </button>
              </div>
            `})}
        </div>
      `}
    </div>
  `}const md={env:f`
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
  `},yl={env:{label:"Environment Variables",description:"Environment variables passed to the gateway process"},update:{label:"Updates",description:"Auto-update settings and release channel"},agents:{label:"Agents",description:"Agent configurations, models, and identities"},auth:{label:"Authentication",description:"API keys and authentication profiles"},channels:{label:"Channels",description:"Messaging channels (Telegram, Discord, Slack, etc.)"},messages:{label:"Messages",description:"Message handling and routing settings"},commands:{label:"Commands",description:"Custom slash commands"},hooks:{label:"Hooks",description:"Webhooks and event hooks"},skills:{label:"Skills",description:"Skill packs and capabilities"},tools:{label:"Tools",description:"Tool configurations (browser, search, etc.)"},gateway:{label:"Gateway",description:"Gateway server settings (port, auth, binding)"},wizard:{label:"Setup Wizard",description:"Setup wizard state and history"},meta:{label:"Metadata",description:"Gateway metadata and version information"},logging:{label:"Logging",description:"Log levels and output configuration"},browser:{label:"Browser",description:"Browser automation settings"},ui:{label:"UI",description:"User interface preferences"},models:{label:"Models",description:"AI model configurations and providers"},bindings:{label:"Bindings",description:"Key bindings and shortcuts"},broadcast:{label:"Broadcast",description:"Broadcast and notification settings"},audio:{label:"Audio",description:"Audio input/output settings"},session:{label:"Session",description:"Session management and persistence"},cron:{label:"Cron",description:"Scheduled tasks and automation"},web:{label:"Web",description:"Web server and API settings"},discovery:{label:"Discovery",description:"Service discovery and networking"},canvasHost:{label:"Canvas Host",description:"Canvas rendering and display"},talk:{label:"Talk",description:"Voice and speech settings"},plugins:{label:"Plugins",description:"Plugin management and extensions"}};function vd(e){return md[e]??md.default}function Bw(e,t,n){if(!n)return!0;const i=n.toLowerCase(),s=yl[e];return e.toLowerCase().includes(i)||s&&(s.label.toLowerCase().includes(i)||s.description.toLowerCase().includes(i))?!0:xi(t,i)}function xi(e,t){var i,s,o;if((i=e.title)!=null&&i.toLowerCase().includes(t)||(s=e.description)!=null&&s.toLowerCase().includes(t)||(o=e.enum)!=null&&o.some(r=>String(r).toLowerCase().includes(t)))return!0;if(e.properties){for(const[r,a]of Object.entries(e.properties))if(r.toLowerCase().includes(t)||xi(a,t))return!0}if(e.items){const r=Array.isArray(e.items)?e.items:[e.items];for(const a of r)if(a&&xi(a,t))return!0}if(e.additionalProperties&&typeof e.additionalProperties=="object"&&xi(e.additionalProperties,t))return!0;const n=e.anyOf??e.oneOf??e.allOf;if(n){for(const r of n)if(r&&xi(r,t))return!0}return!1}function zw(e){var u;if(!e.schema)return f`
      <div class="muted">Schema unavailable.</div>
    `;const t=e.schema,n=e.value??{};if(Ve(t)!=="object"||!t.properties)return f`
      <div class="callout danger">Unsupported schema. Use Raw.</div>
    `;const i=new Set(e.unsupportedPaths??[]),s=t.properties,o=e.searchQuery??"",r=e.activeSection,a=e.activeSubsection??null,c=Object.entries(s).toSorted((h,g)=>{var y,S;const v=((y=Ge([h[0]],e.uiHints))==null?void 0:y.order)??50,b=((S=Ge([g[0]],e.uiHints))==null?void 0:S.order)??50;return v!==b?v-b:h[0].localeCompare(g[0])}).filter(([h,g])=>!(r&&h!==r||o&&!Bw(h,g,o)));let d=null;if(r&&a&&c.length===1){const h=(u=c[0])==null?void 0:u[1];h&&Ve(h)==="object"&&h.properties&&h.properties[a]&&(d={sectionKey:r,subsectionKey:a,schema:h.properties[a]})}return c.length===0?f`
      <div class="config-empty">
        <div class="config-empty__icon">${be.search}</div>
        <div class="config-empty__text">
          ${o?`No settings match "${o}"`:"No settings in this section"}
        </div>
      </div>
    `:f`
    <div class="config-form config-form--modern">
      ${d?(()=>{const{sectionKey:h,subsectionKey:g,schema:v}=d,b=Ge([h,g],e.uiHints),y=(b==null?void 0:b.label)??v.title??Et(g),S=(b==null?void 0:b.help)??v.description??"",E=n[h],L=E&&typeof E=="object"?E[g]:void 0,T=`config-section-${h}-${g}`;return f`
              <section class="config-section-card" id=${T}>
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${vd(h)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${y}</h3>
                    ${S?f`<p class="config-section-card__desc">${S}</p>`:$}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${Sn({schema:v,value:L,path:[h,g],hints:e.uiHints,unsupported:i,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})():c.map(([h,g])=>{const v=yl[h]??{label:h.charAt(0).toUpperCase()+h.slice(1),description:g.description??""};return f`
              <section class="config-section-card" id="config-section-${h}">
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${vd(h)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${v.label}</h3>
                    ${v.description?f`<p class="config-section-card__desc">${v.description}</p>`:$}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${Sn({schema:g,value:n[h],path:[h],hints:e.uiHints,unsupported:i,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})}
    </div>
  `}const Hw=new Set(["title","description","default","nullable"]);function Uw(e){return Object.keys(e??{}).filter(n=>!Hw.has(n)).length===0}function Ff(e){const t=e.filter(s=>s!=null),n=t.length!==e.length,i=[];for(const s of t)i.some(o=>Object.is(o,s))||i.push(s);return{enumValues:i,nullable:n}}function qw(e){return!e||typeof e!="object"?{schema:null,unsupportedPaths:["<root>"]}:Mi(e,[])}function Mi(e,t){const n=new Set,i={...e},s=Ma(t)||"<root>";if(e.anyOf||e.oneOf||e.allOf){const a=jw(e,t);return a||{schema:e,unsupportedPaths:[s]}}const o=Array.isArray(e.type)&&e.type.includes("null"),r=Ve(e)??(e.properties||e.additionalProperties?"object":void 0);if(i.type=r??e.type,i.nullable=o||e.nullable,i.enum){const{enumValues:a,nullable:l}=Ff(i.enum);i.enum=a,l&&(i.nullable=!0),a.length===0&&n.add(s)}if(r==="object"){const a=e.properties??{},l={};for(const[c,d]of Object.entries(a)){const u=Mi(d,[...t,c]);u.schema&&(l[c]=u.schema);for(const h of u.unsupportedPaths)n.add(h)}if(i.properties=l,e.additionalProperties===!0)n.add(s);else if(e.additionalProperties===!1)i.additionalProperties=!1;else if(e.additionalProperties&&typeof e.additionalProperties=="object"&&!Uw(e.additionalProperties)){const c=Mi(e.additionalProperties,[...t,"*"]);i.additionalProperties=c.schema??e.additionalProperties,c.unsupportedPaths.length>0&&n.add(s)}}else if(r==="array"){const a=Array.isArray(e.items)?e.items[0]:e.items;if(!a)n.add(s);else{const l=Mi(a,[...t,"*"]);i.items=l.schema??a,l.unsupportedPaths.length>0&&n.add(s)}}else r!=="string"&&r!=="number"&&r!=="integer"&&r!=="boolean"&&!i.enum&&n.add(s);return{schema:i,unsupportedPaths:Array.from(n)}}function jw(e,t){if(e.allOf)return null;const n=e.anyOf??e.oneOf;if(!n)return null;const i=[],s=[];let o=!1;for(const a of n){if(!a||typeof a!="object")return null;if(Array.isArray(a.enum)){const{enumValues:l,nullable:c}=Ff(a.enum);i.push(...l),c&&(o=!0);continue}if("const"in a){if(a.const==null){o=!0;continue}i.push(a.const);continue}if(Ve(a)==="null"){o=!0;continue}s.push(a)}if(i.length>0&&s.length===0){const a=[];for(const l of i)a.some(c=>Object.is(c,l))||a.push(l);return{schema:{...e,enum:a,nullable:o,anyOf:void 0,oneOf:void 0,allOf:void 0},unsupportedPaths:[]}}if(s.length===1){const a=Mi(s[0],t);return a.schema&&(a.schema.nullable=o||a.schema.nullable),a}const r=new Set(["string","number","integer","boolean"]);return s.length>0&&i.length===0&&s.every(a=>a.type&&r.has(String(a.type)))?{schema:{...e,nullable:o},unsupportedPaths:[]}:null}const pa={all:f`
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
  `},yd=[{key:"env",label:"Environment"},{key:"update",label:"Updates"},{key:"agents",label:"Agents"},{key:"auth",label:"Authentication"},{key:"channels",label:"Channels"},{key:"messages",label:"Messages"},{key:"commands",label:"Commands"},{key:"hooks",label:"Hooks"},{key:"skills",label:"Skills"},{key:"tools",label:"Tools"},{key:"gateway",label:"Gateway"},{key:"wizard",label:"Setup Wizard"}],bd="__all__";function xd(e){return pa[e]??pa.default}function Kw(e,t){const n=yl[e];return n||{label:(t==null?void 0:t.title)??Et(e),description:(t==null?void 0:t.description)??""}}function Ww(e){const{key:t,schema:n,uiHints:i}=e;if(!n||Ve(n)!=="object"||!n.properties)return[];const s=Object.entries(n.properties).map(([o,r])=>{const a=Ge([t,o],i),l=(a==null?void 0:a.label)??r.title??Et(o),c=(a==null?void 0:a.help)??r.description??"",d=(a==null?void 0:a.order)??50;return{key:o,label:l,description:c,order:d}});return s.sort((o,r)=>o.order!==r.order?o.order-r.order:o.key.localeCompare(r.key)),s}function Vw(e,t){if(!e||!t)return[];const n=[];function i(s,o,r){if(s===o)return;if(typeof s!=typeof o){n.push({path:r,from:s,to:o});return}if(typeof s!="object"||s===null||o===null){s!==o&&n.push({path:r,from:s,to:o});return}if(Array.isArray(s)&&Array.isArray(o)){JSON.stringify(s)!==JSON.stringify(o)&&n.push({path:r,from:s,to:o});return}const a=s,l=o,c=new Set([...Object.keys(a),...Object.keys(l)]);for(const d of c)i(a[d],l[d],r?`${r}.${d}`:d)}return i(e,t,""),n}function wd(e,t=40){let n;try{n=JSON.stringify(e)??String(e)}catch{n=String(e)}return n.length<=t?n:n.slice(0,t-3)+"..."}function Gw(e){var M,m,k;const t=e.valid==null?"unknown":e.valid?"valid":"invalid",n=qw(e.schema),i=n.schema?n.unsupportedPaths.length>0:!1,s=((M=n.schema)==null?void 0:M.properties)??{},o=yd.filter(R=>R.key in s),r=new Set(yd.map(R=>R.key)),a=Object.keys(s).filter(R=>!r.has(R)).map(R=>({key:R,label:R.charAt(0).toUpperCase()+R.slice(1)})),l=[...o,...a],c=e.activeSection&&n.schema&&Ve(n.schema)==="object"?(m=n.schema.properties)==null?void 0:m[e.activeSection]:void 0,d=e.activeSection?Kw(e.activeSection,c):null,u=e.activeSection?Ww({key:e.activeSection,schema:c,uiHints:e.uiHints}):[],h=e.formMode==="form"&&!!e.activeSection&&u.length>0,g=e.activeSubsection===bd,v=e.searchQuery||g?null:e.activeSubsection??((k=u[0])==null?void 0:k.key)??null,b=e.formMode==="form"?Vw(e.originalValue,e.formValue):[],y=e.formMode==="raw"&&e.raw!==e.originalRaw,S=e.formMode==="form"?b.length>0:y,E=!!e.formValue&&!e.loading&&!!n.schema,L=e.connected&&!e.saving&&S&&(e.formMode==="raw"?!0:E),T=e.connected&&!e.applying&&!e.updating&&S&&(e.formMode==="raw"?!0:E),C=e.connected&&!e.applying&&!e.updating;return f`
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
            @input=${R=>e.onSearchChange(R.target.value)}
          />
          ${e.searchQuery?f`
                <button
                  class="config-search__clear"
                  @click=${()=>e.onSearchChange("")}
                >
                  ×
                </button>
              `:$}
        </div>

        <!-- Section nav -->
        <nav class="config-nav">
          <button
            class="config-nav__item ${e.activeSection===null?"active":""}"
            @click=${()=>e.onSectionChange(null)}
          >
            <span class="config-nav__icon">${pa.all}</span>
            <span class="config-nav__label">All Settings</span>
          </button>
          ${l.map(R=>f`
              <button
                class="config-nav__item ${e.activeSection===R.key?"active":""}"
                @click=${()=>e.onSectionChange(R.key)}
              >
                <span class="config-nav__icon"
                  >${xd(R.key)}</span
                >
                <span class="config-nav__label">${R.label}</span>
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
                    >${e.formMode==="raw"?"Unsaved changes":`${b.length} unsaved change${b.length!==1?"s":""}`}</span
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
              ?disabled=${!L}
              @click=${e.onSave}
            >
              ${e.saving?"Saving…":"Save"}
            </button>
            <button
              class="btn btn--sm"
              ?disabled=${!T}
              @click=${e.onApply}
            >
              ${e.applying?"Applying…":"Apply"}
            </button>
            <button
              class="btn btn--sm"
              ?disabled=${!C}
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
                    >View ${b.length} pending
                    change${b.length!==1?"s":""}</span
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
                  ${b.map(R=>f`
                      <div class="config-diff__item">
                        <div class="config-diff__path">${R.path}</div>
                        <div class="config-diff__values">
                          <span class="config-diff__from"
                            >${wd(R.from)}</span
                          >
                          <span class="config-diff__arrow">→</span>
                          <span class="config-diff__to"
                            >${wd(R.to)}</span
                          >
                        </div>
                      </div>
                    `)}
                </div>
              </details>
            `:$}
        ${d&&e.formMode==="form"?f`
              <div class="config-section-hero">
                <div class="config-section-hero__icon">
                  ${xd(e.activeSection??"")}
                </div>
                <div class="config-section-hero__text">
                  <div class="config-section-hero__title">
                    ${d.label}
                  </div>
                  ${d.description?f`<div class="config-section-hero__desc">
                        ${d.description}
                      </div>`:$}
                </div>
              </div>
            `:$}
        ${h?f`
              <div class="config-subnav">
                <button
                  class="config-subnav__item ${v===null?"active":""}"
                  @click=${()=>e.onSubsectionChange(bd)}
                >
                  All
                </button>
                ${u.map(R=>f`
                    <button
                      class="config-subnav__item ${v===R.key?"active":""}"
                      title=${R.description||R.label}
                      @click=${()=>e.onSubsectionChange(R.key)}
                    >
                      ${R.label}
                    </button>
                  `)}
              </div>
            `:$}

        <!-- Form content -->
        <div class="config-content">
          ${e.formMode==="form"?f`
                ${e.schemaLoading?f`
                        <div class="config-loading">
                          <div class="config-loading__spinner"></div>
                          <span>Loading schema…</span>
                        </div>
                      `:zw({schema:n.schema,uiHints:e.uiHints,value:e.formValue,disabled:e.loading||!e.formValue,unsupportedPaths:n.unsupportedPaths,onPatch:e.onFormPatch,searchQuery:e.searchQuery,activeSection:e.activeSection,activeSubsection:v})}
                ${i?f`
                        <div class="callout danger" style="margin-top: 12px">
                          Form view can't safely edit some fields. Use Raw to avoid losing config entries.
                        </div>
                      `:$}
              `:f`
                <label class="field config-raw-field">
                  <span>Raw JSON5</span>
                  <textarea
                    .value=${e.raw}
                    @input=${R=>e.onRawChange(R.target.value)}
                  ></textarea>
                </label>
              `}
        </div>

        ${e.issues.length>0?f`<div class="callout danger" style="margin-top: 12px;">
              <pre class="code-block">
${JSON.stringify(e.issues,null,2)}</pre
              >
            </div>`:$}
      </main>
    </div>
  `}function _d(e){const t=(e??"").trim();return t?t==="Untitled quotation"||t==="未命名报价单"?p("work.fallbackDraftName"):t:""}function Qw(e){if(!e)return"-";try{return new Date(e).toLocaleString()}catch{return e??"-"}}function Yw(e,t,n,i){const s=i==="asc"?1:-1;if(n==="created_at"){const o=e.created_at?new Date(e.created_at).getTime():0,r=t.created_at?new Date(t.created_at).getTime():0;return(o-r)*s}return n==="name"?(e.name??"").localeCompare(t.name??"")*s:(e.draft_no??"").localeCompare(t.draft_no??"")*s}function Xw(e){const{loading:t,error:n,drafts:i,detail:s,detailId:o,confirmBusy:r,confirmResult:a,filterQuery:l,sortBy:c,sortDir:d,page:u,pageSize:h,onRefresh:g,onSelectDraft:v,onConfirm:b,onClearDetail:y,onFilterQueryChange:S,onSortByChange:E,onSortDirChange:L,onPageChange:T,onPageSizeChange:C}=e,M=l.trim().toLowerCase(),k=[...M?i.filter(I=>`${I.draft_no??""}
${I.name??""}
${I.source??""}`.toLowerCase().includes(M)):i].sort((I,V)=>Yw(I,V,c,d)),R=k.length,D=Math.max(1,h||10),P=Math.max(1,Math.ceil(R/D)),F=Math.min(Math.max(1,u),P),N=(F-1)*D,B=k.slice(N,N+D);return f`
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
            @input=${I=>S(I.target.value)}
            aria-label=${p("fulfill.filterPlaceholder")}
            style="min-width: 220px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border);"
          />
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${p("fulfill.sortBy")}</span>
            <select
              .value=${c}
              @change=${I=>E(I.target.value)}
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
              @change=${I=>L(I.target.value)}
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
              .value=${String(D)}
              @change=${I=>C(Number(I.target.value)||10)}
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
          `:$}

      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${p("fulfill.listTitle")}</div>
        <div class="card-sub">${p("fulfill.listSubtitle")}</div>

        ${t&&i.length===0?f`<p class="muted" style="margin-top: 12px;">${p("fulfill.loading")}</p>`:R===0?f`<p class="muted" style="margin-top: 12px;">${p("fulfill.noDrafts")}</p>`:f`
                <div class="muted" style="font-size: 12px; margin-top: 10px;">
                  ${p("fulfill.total",{total:String(R)})}
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
                      ${B.map(I=>f`
                          <tr style=${o===I.id?"background: var(--bg-secondary, #f5f5f5);":""}>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${I.draft_no}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${_d(I.name)}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${I.source??"-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${Qw(I.created_at)}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border); display: flex; gap: 6px; flex-wrap: wrap;">
                              <button
                                class="btn btn-sm"
                                @click=${()=>v(I.id)}
                                aria-label=${p("fulfill.viewDetail")}
                              >
                                ${p("fulfill.viewDetail")}
                              </button>
                              <button
                                class="btn"
                                style="font-size: 12px; padding: 4px 8px;"
                                ?disabled=${r}
                                @click=${()=>b(I.id)}
                                aria-label=${p("fulfill.confirmAction")}
                              >
                                ${r&&o===I.id?p("fulfill.confirming"):p("fulfill.confirmAction")}
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
                    @click=${()=>T(F-1)}
                    aria-label=${p("common.prev")}
                  >
                    ${p("common.prev")}
                  </button>
                  <span class="muted" style="font-size: 12px;">${p("fulfill.page",{current:String(F),total:String(P)})}</span>
                  <button
                    class="btn btn-sm"
                    ?disabled=${F>=P}
                    @click=${()=>T(F+1)}
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
              <div class="card-sub">${_d(s.name)}</div>
              <div style="margin-top: 8px; display: flex; gap: 8px;">
                <button class="btn btn-sm" @click=${y}>${p("fulfill.closeDetail")}</button>
                <button
                  class="btn"
                  style="background: var(--accent); color: var(--bg);"
                  ?disabled=${r}
                  @click=${()=>b(s.id)}
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
                    ${(s.lines??[]).map((I,V)=>f`
                        <tr>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${V+1}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${I.product_name??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${I.specification??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${I.qty??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${I.code??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${I.quote_name??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${I.quote_spec??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${I.unit_price??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${I.amount??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${I.warehouse_qty??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${I.shortfall??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${I.is_shortage?p("common.yes"):p("common.no")}</td>
                        </tr>
                      `)}
                  </tbody>
                </table>
              </div>
            </div>
          `:$}

      ${a?f`
            <div class="card" style="grid-column: 1 / -1; border-color: var(--success, #2e7d32);" role="status" aria-live="polite">
              <div class="card-title" style="color: var(--success, #2e7d32);">${p("fulfill.confirmTitle")}</div>
              ${a.order_id?f`<p style="margin: 0 0 4px 0; font-weight: 600;">${p("fulfill.orderId")}: ${a.order_id}</p>`:$}
              <div class="card-sub">${a.message??""}</div>
            </div>
          `:$}
    </section>
  `}function Jw(e,t,n,i){const s=i==="asc"?1:-1;if(n==="uploaded_at"){const o=e.uploaded_at?new Date(e.uploaded_at).getTime():0,r=t.uploaded_at?new Date(t.uploaded_at).getTime():0;return(o-r)*s}return n==="shortfall"?(Number(e.shortfall??0)-Number(t.shortfall??0))*s:n==="count"?(Number(e.count??0)-Number(t.count??0))*s:(e.product_name??"").localeCompare(t.product_name??"")*s}function Zw(e){const{loading:t,error:n,suggestions:i,selectedKeys:s,approvedKeys:o,approveBusy:r,approveResult:a,filterQuery:l,sortBy:c,sortDir:d,page:u,pageSize:h,onRefresh:g,onToggleSelect:v,onApprove:b,onApproveBatch:y,onFilterQueryChange:S,onSortByChange:E,onSortDirChange:L,onPageChange:T,onPageSizeChange:C}=e,M=i.filter(z=>!o.includes(Je(z))),m=l.trim().toLowerCase(),k=m?M.filter(z=>`${z.product_name??""}
${z.specification??""}
${z.code??""}
${z.product_key??""}`.toLowerCase().includes(m)):M,R=[...k].sort((z,J)=>Jw(z,J,c,d)),D=R.length,P=Math.max(1,h||10),F=Math.max(1,Math.ceil(D/P)),N=Math.min(Math.max(1,u),F),B=(N-1)*P,I=R.slice(B,B+P),V=k.filter(z=>s.includes(Je(z))).length,le=k.length>0&&k.every(z=>s.includes(Je(z)));return f`
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
            @input=${z=>S(z.target.value)}
            aria-label=${p("procurement.filterPlaceholder")}
            style="min-width: 240px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border);"
          />
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${p("procurement.sortBy")}</span>
            <select
              .value=${c}
              @change=${z=>E(z.target.value)}
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
              @change=${z=>L(z.target.value)}
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
              .value=${String(P)}
              @change=${z=>C(Number(z.target.value)||10)}
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
          `:$}

      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${p("procurement.listTitle")}</div>
        <div class="card-sub">${p("procurement.listHint")}</div>

        ${V>0?f`
              <div style="margin-top: 12px;">
                <button
                  class="btn"
                  style="font-size: 12px;"
                  ?disabled=${r}
                  @click=${y}
                  aria-label=${p("procurement.batchApprove")}
                >
                  ${r?p("procurement.approving"):`${p("procurement.batchApprove")} (${V})`}
                </button>
              </div>
            `:$}

        ${t&&i.length===0?f`<p class="muted" style="margin-top: 12px;">${p("procurement.loading")}</p>`:k.length===0?f`<p class="muted" style="margin-top: 12px;">${i.length===0?p("procurement.noSuggestions"):p("procurement.noPending")}</p>`:f`
                <div class="muted" style="font-size: 12px; margin-top: 10px;">
                  ${p("procurement.total",{total:String(D)})}
                </div>
                <div style="overflow-x: auto; margin-top: 8px;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <thead>
                      <tr style="background: var(--bg-secondary, #eee);">
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border); width: 36px;">
                          <input
                            type="checkbox"
                            .checked=${le}
                            .indeterminate=${V>0&&V<k.length}
                            aria-label=${p("procurement.selectAll")}
                            @change=${()=>{le?k.forEach(z=>v(Je(z))):k.forEach(z=>{const J=Je(z);s.includes(J)||v(J)})}}
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
                      ${I.map(z=>f`
                          <tr>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">
                              <input
                                type="checkbox"
                                .checked=${s.includes(Je(z))}
                                aria-label=${p("procurement.selectItem")}
                                @change=${()=>v(Je(z))}
                              />
                            </td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${z.product_name??"-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${z.specification??"-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${z.shortfall??0}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${z.code??"-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${z.count??0}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">
                              <button
                                class="btn"
                                style="font-size: 12px; padding: 4px 8px;"
                                ?disabled=${r}
                                @click=${()=>b(z)}
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
                    ?disabled=${N<=1}
                    @click=${()=>T(N-1)}
                    aria-label=${p("common.prev")}
                  >
                    ${p("common.prev")}
                  </button>
                  <span class="muted" style="font-size: 12px;">${p("procurement.page",{current:String(N),total:String(F)})}</span>
                  <button
                    class="btn btn-sm"
                    ?disabled=${N>=F}
                    @click=${()=>T(N+1)}
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
          `:$}

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
                ${e.replenishmentInputLines.map((z,J)=>f`
                    <tr>
                      <td style="padding: 6px 8px; border: 1px solid var(--border);">
                        <input
                          type="text"
                          .value=${z.product_or_code}
                          placeholder=${p("replenishment.productOrCodePlaceholder")}
                          @input=${ge=>e.onReplenishmentLineChange(J,"product_or_code",ge.target.value)}
                          style="width: 100%; padding: 6px 8px; border-radius: 4px; border: 1px solid var(--border);"
                          aria-label=${p("replenishment.productOrCodePlaceholder")}
                        />
                      </td>
                      <td style="padding: 6px 8px; border: 1px solid var(--border); text-align: right;">
                        <input
                          type="number"
                          min="1"
                          .value=${String(z.quantity||"")}
                          placeholder=${p("replenishment.quantityPlaceholder")}
                          @input=${ge=>{const Q=ge.target.value,Se=Q===""?0:Number(Q);e.onReplenishmentLineChange(J,"quantity",Number.isFinite(Se)?Se:0)}}
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
                                @click=${()=>e.onReplenishmentRemoveLine(J)}
                                aria-label=${p("replenishment.removeRow")}
                              >
                                ${p("replenishment.removeRow")}
                              </button>
                            `:$}
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
          `:$}

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
                      ${e.replenishmentDrafts.map(z=>f`
                          <tr>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${z.draft_no}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${z.name}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">
                              ${z.created_at?new Date(z.created_at).toLocaleString():"-"}
                            </td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${z.status}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">
                              <button
                                class="btn btn-sm"
                                style="font-size: 12px; padding: 4px 8px; margin-right: 6px;"
                                @click=${()=>e.onSelectReplenishmentDraft(z.id)}
                              >
                                ${p("replenishment.viewDetail")}
                              </button>
                              <button
                                class="btn btn-sm"
                                style="font-size: 12px; padding: 4px 8px;"
                                ?disabled=${e.replenishmentConfirmBusy||z.status==="confirmed"}
                                @click=${()=>e.onConfirmReplenishment(z.id)}
                              >
                                ${e.replenishmentConfirmBusy?p("replenishment.confirming"):p("replenishment.confirm")}
                              </button>
                              <button
                                class="btn btn-sm"
                                style="font-size: 12px; padding: 4px 8px; color: var(--danger, #c62828);"
                                @click=${()=>e.onDeleteReplenishmentDraft(z.id)}
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
                    ${e.replenishmentDetail.lines.map(z=>f`
                        <tr>
                          <td style="padding: 6px 8px; border: 1px solid var(--border);">${z.code??"-"}</td>
                          <td style="padding: 6px 8px; border: 1px solid var(--border);">${z.product_name??"-"}</td>
                          <td style="padding: 6px 8px; border: 1px solid var(--border);">${z.specification??"-"}</td>
                          <td style="padding: 6px 8px; text-align: right; border: 1px solid var(--border);">
                            ${z.current_qty??"-"}
                          </td>
                          <td style="padding: 6px 8px; text-align: right; border: 1px solid var(--border);">
                            ${z.quantity}
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
          `:$}

      ${e.replenishmentConfirmResult?f`
            <div class="card" style="grid-column: 1 / -1;" role="status" aria-live="polite">
              <div class="card-sub">${e.replenishmentConfirmResult.message??""}</div>
            </div>
          `:$}
    </section>
  `}function e_(e){const t=e.status&&typeof e.status=="object"?e.status.securityAudit:null,n=(t==null?void 0:t.summary)??null,i=(n==null?void 0:n.critical)??0,s=(n==null?void 0:n.warn)??0,o=(n==null?void 0:n.info)??0,r=i>0?"danger":s>0?"warn":"success",a=i>0?`${i} critical`:s>0?`${s} warnings`:"No critical issues";return f`
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
                </div>`:$}
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
            </div>`:$}
        ${e.callResult?f`<pre class="code-block" style="margin-top: 12px;">${e.callResult}</pre>`:$}
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
                      <pre class="code-block">${Mb(l.payload)}</pre>
                    </div>
                  </div>
                `)}
            </div>
          `}
    </section>
  `}function t_(e){const t=Math.max(0,e),n=Math.floor(t/1e3);if(n<60)return`${n}s`;const i=Math.floor(n/60);return i<60?`${i}m`:`${Math.floor(i/60)}h`}function Zt(e,t){return t?f`<div class="exec-approval-meta-row"><span>${e}</span><span>${t}</span></div>`:$}function n_(e){const t=e.execApprovalQueue[0];if(!t)return $;const n=t.request,i=t.expiresAtMs-Date.now(),s=i>0?`expires in ${t_(i)}`:"expired",o=e.execApprovalQueue.length;return f`
    <div class="exec-approval-overlay" role="dialog" aria-live="polite">
      <div class="exec-approval-card">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">Exec approval needed</div>
            <div class="exec-approval-sub">${s}</div>
          </div>
          ${o>1?f`<div class="exec-approval-queue">${o} pending</div>`:$}
        </div>
        <div class="exec-approval-command mono">${n.command}</div>
        <div class="exec-approval-meta">
          ${Zt("Host",n.host)}
          ${Zt("Agent",n.agentId)}
          ${Zt("Session",n.sessionKey)}
          ${Zt("CWD",n.cwd)}
          ${Zt("Resolved",n.resolvedPath)}
          ${Zt("Security",n.security)}
          ${Zt("Ask",n.ask)}
        </div>
        ${e.execApprovalError?f`<div class="exec-approval-error">${e.execApprovalError}</div>`:$}
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
  `}function i_(e){const{pendingGatewayUrl:t}=e;return t?f`
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
  `:$}function s_(e){const t=e.trim();if(t==="")return null;const n=Number(t);return Number.isFinite(n)?n:null}function o_(e){const t=e.host.adminData;let n="";return f`
    <div class="admin-login">
      <h2 class="admin-login__title">数据管理 — 登录</h2>
      <input
        type="password"
        class="admin-input"
        placeholder="管理员密码"
        @input=${i=>{n=i.target.value}}
        @keydown=${i=>{i.key==="Enter"&&e.onLogin(n)}}
      />
      ${t.loginError?f`<p class="admin-err">${t.loginError}</p>`:$}
      <button
        class="admin-btn admin-btn--primary"
        ?disabled=${t.loginLoading}
        @click=${()=>e.onLogin(n)}
      >
        ${t.loginLoading?"登录中…":"登录"}
      </button>
    </div>
  `}function Nf(e,t,n){return f`
    <label class="admin-upload">
      <input
        type="file"
        accept=".xlsx"
        ?disabled=${t}
        @change=${i=>{var o;const s=(o=i.target.files)==null?void 0:o[0];s&&n(s),i.target.value=""}}
      />
      <span>${t?"上传中…":e}</span>
    </label>
  `}function r_(e){const t=e.host.adminData;return t.token?f`
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
      ${t.activeSubTab==="price"?a_(e):l_(e)}
    </section>
  `:f`<section class="admin-panel">${o_(e)}</section>`}function a_(e){const t=e.host.adminData;return f`
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
        ${Nf("上传 Excel（全表替换）",t.priceUploading,e.onPriceUpload)}
        <button type="button" class="admin-btn admin-btn--primary" @click=${e.onPriceAddRow}>+ 新增一行</button>
      </div>
      ${t.priceError?f`<p class="admin-err">${t.priceError}</p>`:$}
      ${t.priceLoading?f`<p class="admin-muted">加载中…</p>`:$}
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
                          @input=${o=>e.onPriceFieldChange(i,{[s]:s_(o.target.value)})}
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
                        </button>`:$}
                  </td>
                </tr>
              `)}
          </tbody>
        </table>
      </div>
      <p class="admin-muted">共 ${t.priceTotal} 行（当前页 ${t.priceItems.length} 条）</p>
    </div>
  `}function l_(e){const t=e.host.adminData;return f`
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
        ${Nf("上传 Excel（全表替换）",t.mappingUploading,e.onMappingUpload)}
        <button type="button" class="admin-btn admin-btn--primary" @click=${e.onMappingAddRow}>+ 新增一行</button>
      </div>
      ${t.mappingError?f`<p class="admin-err">${t.mappingError}</p>`:$}
      ${t.mappingLoading?f`<p class="admin-muted">加载中…</p>`:$}
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
                        </button>`:$}
                  </td>
                </tr>
              `)}
          </tbody>
        </table>
      </div>
      <p class="admin-muted">共 ${t.mappingTotal} 行（当前页 ${t.mappingItems.length} 条）</p>
    </div>
  `}const kd=["trace","debug","info","warn","error","fatal"];function c_(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleTimeString()}function d_(e,t){return t?[e.message,e.subsystem,e.raw].filter(Boolean).join(" ").toLowerCase().includes(t):!0}function u_(e){const t=e.filterText.trim().toLowerCase(),n=kd.some(o=>!e.levelFilters[o]),i=e.entries.filter(o=>o.level&&!e.levelFilters[o.level]?!1:d_(o,t)),s=t||n?"filtered":"visible";return f`
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
        ${kd.map(o=>f`
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

      ${e.file?f`<div class="muted" style="margin-top: 10px;">File: ${e.file}</div>`:$}
      ${e.truncated?f`
              <div class="callout" style="margin-top: 10px">Log output truncated; showing latest chunk.</div>
            `:$}
      ${e.error?f`<div class="callout danger" style="margin-top: 10px;">${e.error}</div>`:$}

      <div class="log-stream" style="margin-top: 12px;" @scroll=${e.onScroll}>
        ${i.length===0?f`
                <div class="muted" style="padding: 12px">No log entries.</div>
              `:i.map(o=>f`
                <div class="log-row">
                  <div class="log-time mono">${c_(o.time)}</div>
                  <div class="log-level ${o.level??""}">${o.level??""}</div>
                  <div class="log-subsystem mono">${o.subsystem??""}</div>
                  <div class="log-message mono">${o.message??o.raw}</div>
                </div>
              `)}
      </div>
    </section>
  `}function h_(e){return f`
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
          </div>`:$}
      ${e.error?f`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:$}
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        ${e.stats?f_(e.stats):e.loading?$:f`<div class="muted">${p("oos.empty.stats")}</div>`}
      </div>
      <div style="margin-top: 24px;">
        <div class="row" style="justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="card-title" style="font-size: 1rem;">${p("oos.list.title")}</div>
          ${e.onOpenAddForm&&!e.showAddForm?f`<button class="btn btn--primary" ?disabled=${e.loading} @click=${e.onOpenAddForm}>${p("oos.actions.addManual")}</button>`:$}
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
            `:$}
        <div class="list" style="margin-top: 8px;">
          ${e.list.length===0?f`<div class="muted">${p("oos.empty.list")}</div>`:e.list.slice(0,50).map(t=>p_(t,e.onDelete))}
        </div>
        ${e.list.length>50?f`<div class="muted" style="margin-top: 8px;">
              ${p("oos.list.more",{count:String(e.list.length)})}
            </div>`:$}
      </div>
      <div class="row" style="margin-top: 24px; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">
            ${p("oos.byFile.title")}
          </div>
          <div class="list" style="margin-top: 8px;">
            ${e.byFile.length===0?f`<div class="muted">${p("oos.byFile.empty")}</div>`:e.byFile.slice(0,10).map(t=>g_(t))}
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">
            ${p("oos.byTime.title")}
          </div>
          <div class="list" style="margin-top: 8px;">
            ${e.byTime.length===0?f`<div class="muted">${p("oos.byTime.empty")}</div>`:e.byTime.slice(0,10).map(t=>m_(t))}
          </div>
        </div>
      </div>
    </section>
  `}function f_(e){return[{label:p("oos.stats.totalRecords"),value:e.total_records},{label:p("oos.stats.outOfStockCount"),value:e.out_of_stock_count},{label:p("oos.stats.today"),value:e.today_count},{label:p("oos.stats.reportedGe2"),value:e.notified_count},{label:p("oos.stats.emailSentProductCount"),value:e.email_sent_product_count}].map(n=>f`
      <div class="card stat-card" style="min-width: 100px;">
        <div class="stat-value">${n.value}</div>
        <div class="stat-label">${n.label}</div>
      </div>
    `)}function p_(e,t){const n=e.product_name??"",i=e.specification??"",s=e.unit??"",o=e.quantity??"",r=e.count??1,a=(e.email_sent_count??0)>0||e.email_status==="sent",l=p(a?"oos.email.sent":"oos.email.notSent"),c=e.product_key??"";return f`
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
          </button>`:$}
    </div>
  `}function g_(e){const t=e.file_name??"",n=e.total_records??0,i=e.uploaded_at?String(e.uploaded_at).length>19?String(e.uploaded_at).slice(0,10)+" "+String(e.uploaded_at).slice(11,19):String(e.uploaded_at):"";return f`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${t}</div>
        <div class="list-sub">
          ${p("oos.byFile.count",{count:String(n)})}${i?` · ${i}`:""}
        </div>
      </div>
    </div>
  `}function m_(e){return f`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.date??""}</div>
        <div class="list-sub">
          ${p("oos.byTime.count",{count:String(e.count??0)})}
        </div>
      </div>
    </div>
  `}function v_(e){return f`
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
          </div>`:$}
      ${e.error?f`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:$}
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        ${e.stats?y_(e.stats):e.loading?$:f`<div class="muted">${p("shortage.empty.stats")}</div>`}
      </div>
      <div style="margin-top: 24px;">
        <div class="row" style="justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="card-title" style="font-size: 1rem;">${p("shortage.list.title")}</div>
          ${e.onOpenAddForm&&!e.showAddForm?f`<button class="btn btn--primary" ?disabled=${e.loading} @click=${e.onOpenAddForm}>${p("shortage.actions.addManual")}</button>`:$}
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
            `:$}
        <div class="list" style="margin-top: 8px;">
          ${e.list.length===0?f`<div class="muted">${p("shortage.empty.list")}</div>`:e.list.slice(0,50).map(t=>b_(t,e.onDelete))}
        </div>
        ${e.list.length>50?f`<div class="muted" style="margin-top: 8px;">
              ${p("shortage.list.more",{count:String(e.list.length)})}
            </div>`:$}
      </div>
      <div class="row" style="margin-top: 24px; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">
            ${p("shortage.byFile.title")}
          </div>
          <div class="list" style="margin-top: 8px;">
            ${e.byFile.length===0?f`<div class="muted">${p("shortage.byFile.empty")}</div>`:e.byFile.slice(0,10).map(t=>x_(t))}
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">
            ${p("shortage.byTime.title")}
          </div>
          <div class="list" style="margin-top: 8px;">
            ${e.byTime.length===0?f`<div class="muted">${p("shortage.byTime.empty")}</div>`:e.byTime.slice(0,10).map(t=>w_(t))}
          </div>
        </div>
      </div>
    </section>
  `}function y_(e){return[{label:p("shortage.stats.totalRecords"),value:e.total_records},{label:p("shortage.stats.shortageProductCount"),value:e.shortage_product_count},{label:p("shortage.stats.today"),value:e.today_count},{label:p("shortage.stats.reportedGe2"),value:e.reported_ge2_count}].map(n=>f`
      <div class="card stat-card" style="min-width: 100px;">
        <div class="stat-value">${n.value}</div>
        <div class="stat-label">${n.label}</div>
      </div>
    `)}function b_(e,t){const n=e.product_name??"",i=e.specification??"",s=e.quantity??0,o=e.available_qty??0,r=e.shortfall??0,a=e.count??1,l=e.product_key??"";return f`
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
          </button>`:$}
    </div>
  `}function x_(e){const t=e.file_name??"",n=e.total_records??0,i=e.uploaded_at?String(e.uploaded_at).length>19?String(e.uploaded_at).slice(0,10)+" "+String(e.uploaded_at).slice(11,19):String(e.uploaded_at):"";return f`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${t}</div>
        <div class="list-sub">
          ${p("shortage.byFile.count",{count:String(n)})}${i?` · ${i}`:""}
        </div>
      </div>
    </div>
  `}function w_(e){return f`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.date??""}</div>
        <div class="list-sub">
          ${p("shortage.byTime.count",{count:String(e.count??0)})}
        </div>
      </div>
    </div>
  `}const Bt="__defaults__",$d=[{value:"deny",label:"Deny"},{value:"allowlist",label:"Allowlist"},{value:"full",label:"Full"}],__=[{value:"off",label:"Off"},{value:"on-miss",label:"On miss"},{value:"always",label:"Always"}];function Sd(e){return e==="allowlist"||e==="full"||e==="deny"?e:"deny"}function k_(e){return e==="always"||e==="off"||e==="on-miss"?e:"on-miss"}function $_(e){const t=(e==null?void 0:e.defaults)??{};return{security:Sd(t.security),ask:k_(t.ask),askFallback:Sd(t.askFallback??"deny"),autoAllowSkills:!!(t.autoAllowSkills??!1)}}function S_(e){const t=(e==null?void 0:e.agents)??{},n=Array.isArray(t.list)?t.list:[],i=[];return n.forEach(s=>{if(!s||typeof s!="object")return;const o=s,r=typeof o.id=="string"?o.id.trim():"";if(!r)return;const a=typeof o.name=="string"?o.name.trim():void 0,l=o.default===!0;i.push({id:r,name:a||void 0,isDefault:l})}),i}function A_(e,t){const n=S_(e),i=Object.keys((t==null?void 0:t.agents)??{}),s=new Map;n.forEach(r=>s.set(r.id,r)),i.forEach(r=>{s.has(r)||s.set(r,{id:r})});const o=Array.from(s.values());return o.length===0&&o.push({id:"main",isDefault:!0}),o.sort((r,a)=>{var d,u;if(r.isDefault&&!a.isDefault)return-1;if(!r.isDefault&&a.isDefault)return 1;const l=(d=r.name)!=null&&d.trim()?r.name:r.id,c=(u=a.name)!=null&&u.trim()?a.name:a.id;return l.localeCompare(c)}),o}function T_(e,t){return e===Bt?Bt:e&&t.some(n=>n.id===e)?e:Bt}function C_(e){var u;const t=e.execApprovalsForm??((u=e.execApprovalsSnapshot)==null?void 0:u.file)??null,n=!!t,i=$_(t),s=A_(e.configForm,t),o=I_(e.nodes),r=e.execApprovalsTarget;let a=r==="node"&&e.execApprovalsTargetNodeId?e.execApprovalsTargetNodeId:null;r==="node"&&a&&!o.some(h=>h.id===a)&&(a=null);const l=T_(e.execApprovalsSelectedAgent,s),c=l!==Bt?((t==null?void 0:t.agents)??{})[l]??null:null,d=Array.isArray(c==null?void 0:c.allowlist)?c.allowlist??[]:[];return{ready:n,disabled:e.execApprovalsSaving||e.execApprovalsLoading,dirty:e.execApprovalsDirty,loading:e.execApprovalsLoading,saving:e.execApprovalsSaving,form:t,defaults:i,selectedScope:l,selectedAgent:c,agents:s,allowlist:d,target:r,targetNodeId:a,targetNodes:o,onSelectScope:e.onExecApprovalsSelectAgent,onSelectTarget:e.onExecApprovalsTargetChange,onPatch:e.onExecApprovalsPatch,onRemove:e.onExecApprovalsRemove,onLoad:e.onLoadExecApprovals,onSave:e.onSaveExecApprovals}}function E_(e){const t=e.ready,n=e.target!=="node"||!!e.targetNodeId;return f`
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

      ${R_(e)}

      ${t?f`
            ${L_(e)}
            ${P_(e)}
            ${e.selectedScope===Bt?$:M_(e)}
          `:f`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load exec approvals to edit allowlists.</div>
            <button class="btn" ?disabled=${e.loading||!n} @click=${e.onLoad}>
              ${e.loading?"Loading…":"Load approvals"}
            </button>
          </div>`}
    </section>
  `}function R_(e){const t=e.targetNodes.length>0,n=e.targetNodeId??"";return f`
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
              `:$}
        </div>
      </div>
      ${e.target==="node"&&!t?f`
              <div class="muted">No nodes advertise exec approvals yet.</div>
            `:$}
    </div>
  `}function L_(e){return f`
    <div class="row" style="margin-top: 12px; gap: 8px; flex-wrap: wrap;">
      <span class="label">Scope</span>
      <div class="row" style="gap: 8px; flex-wrap: wrap;">
        <button
          class="btn btn--sm ${e.selectedScope===Bt?"active":""}"
          @click=${()=>e.onSelectScope(Bt)}
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
  `}function P_(e){const t=e.selectedScope===Bt,n=e.defaults,i=e.selectedAgent??{},s=t?["defaults"]:["agents",e.selectedScope],o=typeof i.security=="string"?i.security:void 0,r=typeof i.ask=="string"?i.ask:void 0,a=typeof i.askFallback=="string"?i.askFallback:void 0,l=t?n.security:o??"__default__",c=t?n.ask:r??"__default__",d=t?n.askFallback:a??"__default__",u=typeof i.autoAllowSkills=="boolean"?i.autoAllowSkills:void 0,h=u??n.autoAllowSkills,g=u==null;return f`
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
              @change=${v=>{const y=v.target.value;!t&&y==="__default__"?e.onRemove([...s,"security"]):e.onPatch([...s,"security"],y)}}
            >
              ${t?$:f`<option value="__default__" ?selected=${l==="__default__"}>
                    Use default (${n.security})
                  </option>`}
              ${$d.map(v=>f`<option
                    value=${v.value}
                    ?selected=${l===v.value}
                  >
                    ${v.label}
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
              @change=${v=>{const y=v.target.value;!t&&y==="__default__"?e.onRemove([...s,"ask"]):e.onPatch([...s,"ask"],y)}}
            >
              ${t?$:f`<option value="__default__" ?selected=${c==="__default__"}>
                    Use default (${n.ask})
                  </option>`}
              ${__.map(v=>f`<option
                    value=${v.value}
                    ?selected=${c===v.value}
                  >
                    ${v.label}
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
              @change=${v=>{const y=v.target.value;!t&&y==="__default__"?e.onRemove([...s,"askFallback"]):e.onPatch([...s,"askFallback"],y)}}
            >
              ${t?$:f`<option value="__default__" ?selected=${d==="__default__"}>
                    Use default (${n.askFallback})
                  </option>`}
              ${$d.map(v=>f`<option
                    value=${v.value}
                    ?selected=${d===v.value}
                  >
                    ${v.label}
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
              @change=${v=>{const b=v.target;e.onPatch([...s,"autoAllowSkills"],b.checked)}}
            />
          </label>
          ${!t&&!g?f`<button
                class="btn btn--sm"
                ?disabled=${e.disabled}
                @click=${()=>e.onRemove([...s,"autoAllowSkills"])}
              >
                Use default
              </button>`:$}
        </div>
      </div>
    </div>
  `}function M_(e){const t=["agents",e.selectedScope,"allowlist"],n=e.allowlist;return f`
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
            `:n.map((i,s)=>D_(e,i,s))}
    </div>
  `}function D_(e,t,n){var r;const i=t.lastUsedAt?Cn(t.lastUsedAt):"never",s=t.lastUsedCommand?Kr(t.lastUsedCommand,120):null,o=t.lastResolvedPath?Kr(t.lastResolvedPath,120):null;return f`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${(r=t.pattern)!=null&&r.trim()?t.pattern:"New pattern"}</div>
        <div class="list-sub">Last used: ${i}</div>
        ${s?f`<div class="list-sub mono">${s}</div>`:$}
        ${o?f`<div class="list-sub mono">${o}</div>`:$}
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
  `}function I_(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(a=>String(a)==="system.execApprovals.get"||String(a)==="system.execApprovals.set"))continue;const o=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!o)continue;const r=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():o;t.push({id:o,label:r===o?o:`${r} · ${o}`})}return t.sort((n,i)=>n.label.localeCompare(i.label)),t}function O_(e){const t=H_(e),n=C_(e);return f`
    ${E_(n)}
    ${U_(t)}
    ${F_(e)}
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
              `:e.nodes.map(i=>W_(i))}
      </div>
    </section>
  `}function F_(e){const t=e.devicesList??{pending:[],paired:[]},n=Array.isArray(t.pending)?t.pending:[],i=Array.isArray(t.paired)?t.paired:[];return f`
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
      ${e.devicesError?f`<div class="callout danger" style="margin-top: 12px;">${e.devicesError}</div>`:$}
      <div class="list" style="margin-top: 16px;">
        ${n.length>0?f`
              <div class="muted" style="margin-bottom: 8px;">Pending</div>
              ${n.map(s=>N_(s,e))}
            `:$}
        ${i.length>0?f`
              <div class="muted" style="margin-top: 12px; margin-bottom: 8px;">Paired</div>
              ${i.map(s=>B_(s,e))}
            `:$}
        ${n.length===0&&i.length===0?f`
                <div class="muted">No paired devices.</div>
              `:$}
      </div>
    </section>
  `}function N_(e,t){var a,l;const n=((a=e.displayName)==null?void 0:a.trim())||e.deviceId,i=typeof e.ts=="number"?Cn(e.ts):"n/a",s=(l=e.role)!=null&&l.trim()?`role: ${e.role}`:"role: -",o=e.isRepair?" · repair":"",r=e.remoteIp?` · ${e.remoteIp}`:"";return f`
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
  `}function B_(e,t){var a;const n=((a=e.displayName)==null?void 0:a.trim())||e.deviceId,i=e.remoteIp?` · ${e.remoteIp}`:"",s=`roles: ${jr(e.roles)}`,o=`scopes: ${jr(e.scopes)}`,r=Array.isArray(e.tokens)?e.tokens:[];return f`
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
                ${r.map(l=>z_(e.deviceId,l,t))}
              </div>
            `}
      </div>
    </div>
  `}function z_(e,t,n){const i=t.revokedAtMs?"revoked":"active",s=`scopes: ${jr(t.scopes)}`,o=Cn(t.rotatedAtMs??t.createdAtMs??t.lastUsedAtMs??null);return f`
    <div class="row" style="justify-content: space-between; gap: 8px;">
      <div class="list-sub">${t.role} · ${i} · ${s} · ${o}</div>
      <div class="row" style="justify-content: flex-end; gap: 6px; flex-wrap: wrap;">
        <button
          class="btn btn--sm"
          @click=${()=>n.onDeviceRotate(e,t.role,t.scopes)}
        >
          Rotate
        </button>
        ${t.revokedAtMs?$:f`
              <button
                class="btn btn--sm danger"
                @click=${()=>n.onDeviceRevoke(e,t.role)}
              >
                Revoke
              </button>
            `}
      </div>
    </div>
  `}function H_(e){const t=e.configForm,n=j_(e.nodes),{defaultBinding:i,agents:s}=K_(t),o=!!t,r=e.configSaving||e.configFormMode==="raw";return{ready:o,disabled:r,configDirty:e.configDirty,configLoading:e.configLoading,configSaving:e.configSaving,defaultBinding:i,agents:s,nodes:n,onBindDefault:e.onBindDefault,onBindAgent:e.onBindAgent,onSave:e.onSaveBindings,onLoadConfig:e.onLoadConfig,formMode:e.configFormMode}}function U_(e){const t=e.nodes.length>0,n=e.defaultBinding??"";return f`
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
            `:$}

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
                  ${t?$:f`
                          <div class="muted">No nodes with system.run available.</div>
                        `}
                </div>
              </div>

              ${e.agents.length===0?f`
                      <div class="muted">No agents found.</div>
                    `:e.agents.map(i=>q_(i,e))}
            </div>
          `:f`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load config to edit bindings.</div>
            <button class="btn" ?disabled=${e.configLoading} @click=${e.onLoadConfig}>
              ${e.configLoading?"Loading…":"Load config"}
            </button>
          </div>`}
    </section>
  `}function q_(e,t){var o;const n=e.binding??"__default__",i=(o=e.name)!=null&&o.trim()?`${e.name} (${e.id})`:e.id,s=t.nodes.length>0;return f`
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
  `}function j_(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(a=>String(a)==="system.run"))continue;const o=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!o)continue;const r=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():o;t.push({id:o,label:r===o?o:`${r} · ${o}`})}return t.sort((n,i)=>n.label.localeCompare(i.label)),t}function K_(e){const t={id:"main",name:void 0,index:0,isDefault:!0,binding:null};if(!e||typeof e!="object")return{defaultBinding:null,agents:[t]};const i=(e.tools??{}).exec??{},s=typeof i.node=="string"&&i.node.trim()?i.node.trim():null,o=e.agents??{},r=Array.isArray(o.list)?o.list:[];if(r.length===0)return{defaultBinding:s,agents:[t]};const a=[];return r.forEach((l,c)=>{if(!l||typeof l!="object")return;const d=l,u=typeof d.id=="string"?d.id.trim():"";if(!u)return;const h=typeof d.name=="string"?d.name.trim():void 0,g=d.default===!0,b=(d.tools??{}).exec??{},y=typeof b.node=="string"&&b.node.trim()?b.node.trim():null;a.push({id:u,name:h||void 0,index:c,isDefault:g,binding:y})}),a.length===0&&a.push(t),{defaultBinding:s,agents:a}}function W_(e){const t=!!e.connected,n=!!e.paired,i=typeof e.displayName=="string"&&e.displayName.trim()||(typeof e.nodeId=="string"?e.nodeId:"unknown"),s=Array.isArray(e.caps)?e.caps:[],o=Array.isArray(e.commands)?e.commands:[];return f`
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
  `}function wi(e){return`Rp ${e.toLocaleString("id-ID",{maximumFractionDigits:0})}`}function V_(e){return e==="done"?f`<span style="color: var(--color-success, #22c55e); font-size: 11px; font-weight: 600;">✓ 已分析</span>`:e==="running"||e==="pending"?f`<span style="color: #f59e0b; font-size: 11px; font-weight: 600;">⏳ 分析中</span>`:e==="failed"?f`<span style="color: var(--color-danger, #ef4444); font-size: 11px; font-weight: 600;">✗ 失败</span>`:f`<span style="color: var(--text-muted, #888); font-size: 11px;">—</span>`}function G_(e){if(e.reportDetailLoading)return f`<div class="muted" style="padding:24px;">${p("agents.reports.detailLoading")}</div>`;if(!e.reportDetail)return f`<div class="muted" style="padding:24px;">${p("agents.reports.detailEmpty")}</div>`;const t=e.reportDetail.report_json??{},n=t.total_sales_amount??0,i=t.total_order_count??0,s=t.daily_stats??[],o=t.top_customers??[],r=t.status_stats??[];return f`
    <div style="display:flex;flex-direction:column;gap:16px;padding:16px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:10px;padding:14px 16px;">
          <div
            style="font-size:11px;color:var(--text-muted,#888);margin-bottom:4px;text-transform:uppercase;letter-spacing:.05em;"
          >
            ${p("agents.reports.metricTotal")}
          </div>
          <div style="font-size:18px;font-weight:700;color:var(--text-primary);">${wi(n)}</div>
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
                        <td style="padding:6px 8px;text-align:right;">${wi(a.sales_amount)}</td>
                      </tr>
                    `)}
                </tbody>
              </table>
            </div>
          `:$}

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
                        <td style="padding:6px 8px;text-align:right;">${wi(a.sales_amount)}</td>
                      </tr>
                    `)}
                </tbody>
              </table>
            </div>
          `:$}

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
                        <td style="padding:6px 8px;text-align:right;">${wi(a.total_amount)}</td>
                      </tr>
                    `)}
                </tbody>
              </table>
            </div>
          `:$}
    </div>
  `}function Q_(e){if(e.reportDetailLoading)return f`<div class="muted" style="padding:24px;">${p("agents.reports.detailLoading")}</div>`;if(!e.reportDetail)return f`<div class="muted" style="padding:24px;">${p("agents.reports.detailEmpty")}</div>`;const t=e.reportDetail.analysis_status,n=e.reportDetail.analysis_md;return t==="running"?f`
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
      <div class="markdown-body" style="font-size:13px;line-height:1.65;">${ro(uo(n))}</div>
    </div>
  `:f`<div class="muted" style="padding:24px;">${p("agents.reports.analysisEmpty")}</div>`}function Y_(e){return e.reportsTasks.length===0?$:f`
    <details style="margin-top:8px;">
      <summary style="cursor:pointer;font-size:12px;color:var(--text-muted);padding:8px 0;">任务配置</summary>
      <div style="padding:8px 0;display:flex;flex-direction:column;gap:10px;">
        ${e.reportsTasks.map(t=>{const n=e.reportsEditingTaskId===t.task_key;return f`
            <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:8px;padding:12px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:${n?"10px":"0"};">
                <span style="font-size:13px;font-weight:600;">${t.title}</span>
                ${n?$:f`<button class="btn btn--sm" @click=${()=>e.onEditTask(t)}>编辑</button>`}
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
  `}function X_(e){return f`
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

      ${e.reportsError?f`<div class="callout danger" style="margin:8px 12px;">${e.reportsError}</div>`:$}

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
                        ${V_(t.analysis_status)}
                      </div>
                      <div style="font-size:12px;color:var(--text-muted);">${s} 张 · ${wi(o)}</div>
                      ${t.analysis_status==="failed"?f`
                            <button
                              class="btn btn--sm"
                              style="margin-top:6px;font-size:11px;"
                              @click=${l=>{l.stopPropagation(),e.onReanalyze(t.id)}}
                            >
                              ${p("agents.reports.reanalyzeBtn")}
                            </button>
                          `:$}
                    </button>
                  `})}
          </div>

          <div style="padding:8px 12px;border-top:1px solid var(--border);">${Y_(e)}</div>
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
            ${e.reportsDetailTab==="data"?G_(e):Q_(e)}
          </div>
        </div>
      </div>
    </section>
  `}/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */function ss(e){return e+.5|0}const Mt=(e,t,n)=>Math.max(Math.min(e,n),t);function _i(e){return Mt(ss(e*2.55),0,255)}function zt(e){return Mt(ss(e*255),0,255)}function Ct(e){return Mt(ss(e/2.55)/100,0,1)}function Ad(e){return Mt(ss(e*100),0,100)}const Ke={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},ga=[..."0123456789ABCDEF"],J_=e=>ga[e&15],Z_=e=>ga[(e&240)>>4]+ga[e&15],Ss=e=>(e&240)>>4===(e&15),e1=e=>Ss(e.r)&&Ss(e.g)&&Ss(e.b)&&Ss(e.a);function t1(e){var t=e.length,n;return e[0]==="#"&&(t===4||t===5?n={r:255&Ke[e[1]]*17,g:255&Ke[e[2]]*17,b:255&Ke[e[3]]*17,a:t===5?Ke[e[4]]*17:255}:(t===7||t===9)&&(n={r:Ke[e[1]]<<4|Ke[e[2]],g:Ke[e[3]]<<4|Ke[e[4]],b:Ke[e[5]]<<4|Ke[e[6]],a:t===9?Ke[e[7]]<<4|Ke[e[8]]:255})),n}const n1=(e,t)=>e<255?t(e):"";function i1(e){var t=e1(e)?J_:Z_;return e?"#"+t(e.r)+t(e.g)+t(e.b)+n1(e.a,t):void 0}const s1=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function Bf(e,t,n){const i=t*Math.min(n,1-n),s=(o,r=(o+e/30)%12)=>n-i*Math.max(Math.min(r-3,9-r,1),-1);return[s(0),s(8),s(4)]}function o1(e,t,n){const i=(s,o=(s+e/60)%6)=>n-n*t*Math.max(Math.min(o,4-o,1),0);return[i(5),i(3),i(1)]}function r1(e,t,n){const i=Bf(e,1,.5);let s;for(t+n>1&&(s=1/(t+n),t*=s,n*=s),s=0;s<3;s++)i[s]*=1-t-n,i[s]+=t;return i}function a1(e,t,n,i,s){return e===s?(t-n)/i+(t<n?6:0):t===s?(n-e)/i+2:(e-t)/i+4}function bl(e){const n=e.r/255,i=e.g/255,s=e.b/255,o=Math.max(n,i,s),r=Math.min(n,i,s),a=(o+r)/2;let l,c,d;return o!==r&&(d=o-r,c=a>.5?d/(2-o-r):d/(o+r),l=a1(n,i,s,d,o),l=l*60+.5),[l|0,c||0,a]}function xl(e,t,n,i){return(Array.isArray(t)?e(t[0],t[1],t[2]):e(t,n,i)).map(zt)}function wl(e,t,n){return xl(Bf,e,t,n)}function l1(e,t,n){return xl(r1,e,t,n)}function c1(e,t,n){return xl(o1,e,t,n)}function zf(e){return(e%360+360)%360}function d1(e){const t=s1.exec(e);let n=255,i;if(!t)return;t[5]!==i&&(n=t[6]?_i(+t[5]):zt(+t[5]));const s=zf(+t[2]),o=+t[3]/100,r=+t[4]/100;return t[1]==="hwb"?i=l1(s,o,r):t[1]==="hsv"?i=c1(s,o,r):i=wl(s,o,r),{r:i[0],g:i[1],b:i[2],a:n}}function u1(e,t){var n=bl(e);n[0]=zf(n[0]+t),n=wl(n),e.r=n[0],e.g=n[1],e.b=n[2]}function h1(e){if(!e)return;const t=bl(e),n=t[0],i=Ad(t[1]),s=Ad(t[2]);return e.a<255?`hsla(${n}, ${i}%, ${s}%, ${Ct(e.a)})`:`hsl(${n}, ${i}%, ${s}%)`}const Td={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},Cd={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function f1(){const e={},t=Object.keys(Cd),n=Object.keys(Td);let i,s,o,r,a;for(i=0;i<t.length;i++){for(r=a=t[i],s=0;s<n.length;s++)o=n[s],a=a.replace(o,Td[o]);o=parseInt(Cd[r],16),e[a]=[o>>16&255,o>>8&255,o&255]}return e}let As;function p1(e){As||(As=f1(),As.transparent=[0,0,0,0]);const t=As[e.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}const g1=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function m1(e){const t=g1.exec(e);let n=255,i,s,o;if(t){if(t[7]!==i){const r=+t[7];n=t[8]?_i(r):Mt(r*255,0,255)}return i=+t[1],s=+t[3],o=+t[5],i=255&(t[2]?_i(i):Mt(i,0,255)),s=255&(t[4]?_i(s):Mt(s,0,255)),o=255&(t[6]?_i(o):Mt(o,0,255)),{r:i,g:s,b:o,a:n}}}function v1(e){return e&&(e.a<255?`rgba(${e.r}, ${e.g}, ${e.b}, ${Ct(e.a)})`:`rgb(${e.r}, ${e.g}, ${e.b})`)}const Lr=e=>e<=.0031308?e*12.92:Math.pow(e,1/2.4)*1.055-.055,Fn=e=>e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4);function y1(e,t,n){const i=Fn(Ct(e.r)),s=Fn(Ct(e.g)),o=Fn(Ct(e.b));return{r:zt(Lr(i+n*(Fn(Ct(t.r))-i))),g:zt(Lr(s+n*(Fn(Ct(t.g))-s))),b:zt(Lr(o+n*(Fn(Ct(t.b))-o))),a:e.a+n*(t.a-e.a)}}function Ts(e,t,n){if(e){let i=bl(e);i[t]=Math.max(0,Math.min(i[t]+i[t]*n,t===0?360:1)),i=wl(i),e.r=i[0],e.g=i[1],e.b=i[2]}}function Hf(e,t){return e&&Object.assign(t||{},e)}function Ed(e){var t={r:0,g:0,b:0,a:255};return Array.isArray(e)?e.length>=3&&(t={r:e[0],g:e[1],b:e[2],a:255},e.length>3&&(t.a=zt(e[3]))):(t=Hf(e,{r:0,g:0,b:0,a:1}),t.a=zt(t.a)),t}function b1(e){return e.charAt(0)==="r"?m1(e):d1(e)}class Vi{constructor(t){if(t instanceof Vi)return t;const n=typeof t;let i;n==="object"?i=Ed(t):n==="string"&&(i=t1(t)||p1(t)||b1(t)),this._rgb=i,this._valid=!!i}get valid(){return this._valid}get rgb(){var t=Hf(this._rgb);return t&&(t.a=Ct(t.a)),t}set rgb(t){this._rgb=Ed(t)}rgbString(){return this._valid?v1(this._rgb):void 0}hexString(){return this._valid?i1(this._rgb):void 0}hslString(){return this._valid?h1(this._rgb):void 0}mix(t,n){if(t){const i=this.rgb,s=t.rgb;let o;const r=n===o?.5:n,a=2*r-1,l=i.a-s.a,c=((a*l===-1?a:(a+l)/(1+a*l))+1)/2;o=1-c,i.r=255&c*i.r+o*s.r+.5,i.g=255&c*i.g+o*s.g+.5,i.b=255&c*i.b+o*s.b+.5,i.a=r*i.a+(1-r)*s.a,this.rgb=i}return this}interpolate(t,n){return t&&(this._rgb=y1(this._rgb,t._rgb,n)),this}clone(){return new Vi(this.rgb)}alpha(t){return this._rgb.a=zt(t),this}clearer(t){const n=this._rgb;return n.a*=1-t,this}greyscale(){const t=this._rgb,n=ss(t.r*.3+t.g*.59+t.b*.11);return t.r=t.g=t.b=n,this}opaquer(t){const n=this._rgb;return n.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return Ts(this._rgb,2,t),this}darken(t){return Ts(this._rgb,2,-t),this}saturate(t){return Ts(this._rgb,1,t),this}desaturate(t){return Ts(this._rgb,1,-t),this}rotate(t){return u1(this._rgb,t),this}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */function $t(){}const x1=(()=>{let e=0;return()=>e++})();function ce(e){return e==null}function $e(e){if(Array.isArray&&Array.isArray(e))return!0;const t=Object.prototype.toString.call(e);return t.slice(0,7)==="[object"&&t.slice(-6)==="Array]"}function Z(e){return e!==null&&Object.prototype.toString.call(e)==="[object Object]"}function Pe(e){return(typeof e=="number"||e instanceof Number)&&isFinite(+e)}function lt(e,t){return Pe(e)?e:t}function X(e,t){return typeof e>"u"?t:e}const w1=(e,t)=>typeof e=="string"&&e.endsWith("%")?parseFloat(e)/100*t:+e;function ue(e,t,n){if(e&&typeof e.call=="function")return e.apply(n,t)}function re(e,t,n,i){let s,o,r;if($e(e))for(o=e.length,s=0;s<o;s++)t.call(n,e[s],s);else if(Z(e))for(r=Object.keys(e),o=r.length,s=0;s<o;s++)t.call(n,e[r[s]],r[s])}function ho(e,t){let n,i,s,o;if(!e||!t||e.length!==t.length)return!1;for(n=0,i=e.length;n<i;++n)if(s=e[n],o=t[n],s.datasetIndex!==o.datasetIndex||s.index!==o.index)return!1;return!0}function fo(e){if($e(e))return e.map(fo);if(Z(e)){const t=Object.create(null),n=Object.keys(e),i=n.length;let s=0;for(;s<i;++s)t[n[s]]=fo(e[n[s]]);return t}return e}function Uf(e){return["__proto__","prototype","constructor"].indexOf(e)===-1}function _1(e,t,n,i){if(!Uf(e))return;const s=t[e],o=n[e];Z(s)&&Z(o)?Gi(s,o,i):t[e]=fo(o)}function Gi(e,t,n){const i=$e(t)?t:[t],s=i.length;if(!Z(e))return e;n=n||{};const o=n.merger||_1;let r;for(let a=0;a<s;++a){if(r=i[a],!Z(r))continue;const l=Object.keys(r);for(let c=0,d=l.length;c<d;++c)o(l[c],e,r,n)}return e}function Di(e,t){return Gi(e,t,{merger:k1})}function k1(e,t,n){if(!Uf(e))return;const i=t[e],s=n[e];Z(i)&&Z(s)?Di(i,s):Object.prototype.hasOwnProperty.call(t,e)||(t[e]=fo(s))}const Rd={"":e=>e,x:e=>e.x,y:e=>e.y};function $1(e){const t=e.split("."),n=[];let i="";for(const s of t)i+=s,i.endsWith("\\")?i=i.slice(0,-1)+".":(n.push(i),i="");return n}function S1(e){const t=$1(e);return n=>{for(const i of t){if(i==="")break;n=n&&n[i]}return n}}function po(e,t){return(Rd[t]||(Rd[t]=S1(t)))(e)}function _l(e){return e.charAt(0).toUpperCase()+e.slice(1)}const go=e=>typeof e<"u",qt=e=>typeof e=="function",Ld=(e,t)=>{if(e.size!==t.size)return!1;for(const n of e)if(!t.has(n))return!1;return!0};function A1(e){return e.type==="mouseup"||e.type==="click"||e.type==="contextmenu"}const Re=Math.PI,nt=2*Re,T1=nt+Re,mo=Number.POSITIVE_INFINITY,C1=Re/180,tt=Re/2,en=Re/4,Pd=Re*2/3,qf=Math.log10,Xn=Math.sign;function Ii(e,t,n){return Math.abs(e-t)<n}function Md(e){const t=Math.round(e);e=Ii(e,t,e/1e3)?t:e;const n=Math.pow(10,Math.floor(qf(e))),i=e/n;return(i<=1?1:i<=2?2:i<=5?5:10)*n}function E1(e){const t=[],n=Math.sqrt(e);let i;for(i=1;i<n;i++)e%i===0&&(t.push(i),t.push(e/i));return n===(n|0)&&t.push(n),t.sort((s,o)=>s-o).pop(),t}function R1(e){return typeof e=="symbol"||typeof e=="object"&&e!==null&&!(Symbol.toPrimitive in e||"toString"in e||"valueOf"in e)}function Qi(e){return!R1(e)&&!isNaN(parseFloat(e))&&isFinite(e)}function L1(e,t){const n=Math.round(e);return n-t<=e&&n+t>=e}function P1(e,t,n){let i,s,o;for(i=0,s=e.length;i<s;i++)o=e[i][n],isNaN(o)||(t.min=Math.min(t.min,o),t.max=Math.max(t.max,o))}function dn(e){return e*(Re/180)}function M1(e){return e*(180/Re)}function Dd(e){if(!Pe(e))return;let t=1,n=0;for(;Math.round(e*t)/t!==e;)t*=10,n++;return n}function D1(e,t){const n=t.x-e.x,i=t.y-e.y,s=Math.sqrt(n*n+i*i);let o=Math.atan2(i,n);return o<-.5*Re&&(o+=nt),{angle:o,distance:s}}function ma(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function I1(e,t){return(e-t+T1)%nt-Re}function pt(e){return(e%nt+nt)%nt}function jf(e,t,n,i){const s=pt(e),o=pt(t),r=pt(n),a=pt(o-s),l=pt(r-s),c=pt(s-o),d=pt(s-r);return s===o||s===r||i&&o===r||a>l&&c<d}function We(e,t,n){return Math.max(t,Math.min(n,e))}function O1(e){return We(e,-32768,32767)}function Hn(e,t,n,i=1e-6){return e>=Math.min(t,n)-i&&e<=Math.max(t,n)+i}function kl(e,t,n){n=n||(r=>e[r]<t);let i=e.length-1,s=0,o;for(;i-s>1;)o=s+i>>1,n(o)?s=o:i=o;return{lo:s,hi:i}}const un=(e,t,n,i)=>kl(e,n,i?s=>{const o=e[s][t];return o<n||o===n&&e[s+1][t]===n}:s=>e[s][t]<n),F1=(e,t,n)=>kl(e,n,i=>e[i][t]>=n);function N1(e,t,n){let i=0,s=e.length;for(;i<s&&e[i]<t;)i++;for(;s>i&&e[s-1]>n;)s--;return i>0||s<e.length?e.slice(i,s):e}const Kf=["push","pop","shift","splice","unshift"];function B1(e,t){if(e._chartjs){e._chartjs.listeners.push(t);return}Object.defineProperty(e,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),Kf.forEach(n=>{const i="_onData"+_l(n),s=e[n];Object.defineProperty(e,n,{configurable:!0,enumerable:!1,value(...o){const r=s.apply(this,o);return e._chartjs.listeners.forEach(a=>{typeof a[i]=="function"&&a[i](...o)}),r}})})}function Id(e,t){const n=e._chartjs;if(!n)return;const i=n.listeners,s=i.indexOf(t);s!==-1&&i.splice(s,1),!(i.length>0)&&(Kf.forEach(o=>{delete e[o]}),delete e._chartjs)}function z1(e){const t=new Set(e);return t.size===e.length?e:Array.from(t)}const Wf=(function(){return typeof window>"u"?function(e){return e()}:window.requestAnimationFrame})();function Vf(e,t){let n=[],i=!1;return function(...s){n=s,i||(i=!0,Wf.call(window,()=>{i=!1,e.apply(t,n)}))}}function H1(e,t){let n;return function(...i){return t?(clearTimeout(n),n=setTimeout(e,t,i)):e.apply(this,i),t}}const Gf=e=>e==="start"?"left":e==="end"?"right":"center",qe=(e,t,n)=>e==="start"?t:e==="end"?n:(t+n)/2,U1=(e,t,n,i)=>e===(i?"left":"right")?n:e==="center"?(t+n)/2:t;function q1(e,t,n){const i=t.length;let s=0,o=i;if(e._sorted){const{iScale:r,vScale:a,_parsed:l}=e,c=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null,d=r.axis,{min:u,max:h,minDefined:g,maxDefined:v}=r.getUserBounds();if(g){if(s=Math.min(un(l,d,u).lo,n?i:un(t,d,r.getPixelForValue(u)).lo),c){const b=l.slice(0,s+1).reverse().findIndex(y=>!ce(y[a.axis]));s-=Math.max(0,b)}s=We(s,0,i-1)}if(v){let b=Math.max(un(l,r.axis,h,!0).hi+1,n?0:un(t,d,r.getPixelForValue(h),!0).hi+1);if(c){const y=l.slice(b-1).findIndex(S=>!ce(S[a.axis]));b+=Math.max(0,y)}o=We(b,s,i)-s}else o=i-s}return{start:s,count:o}}function j1(e){const{xScale:t,yScale:n,_scaleRanges:i}=e,s={xmin:t.min,xmax:t.max,ymin:n.min,ymax:n.max};if(!i)return e._scaleRanges=s,!0;const o=i.xmin!==t.min||i.xmax!==t.max||i.ymin!==n.min||i.ymax!==n.max;return Object.assign(i,s),o}const Cs=e=>e===0||e===1,Od=(e,t,n)=>-(Math.pow(2,10*(e-=1))*Math.sin((e-t)*nt/n)),Fd=(e,t,n)=>Math.pow(2,-10*e)*Math.sin((e-t)*nt/n)+1,Oi={linear:e=>e,easeInQuad:e=>e*e,easeOutQuad:e=>-e*(e-2),easeInOutQuad:e=>(e/=.5)<1?.5*e*e:-.5*(--e*(e-2)-1),easeInCubic:e=>e*e*e,easeOutCubic:e=>(e-=1)*e*e+1,easeInOutCubic:e=>(e/=.5)<1?.5*e*e*e:.5*((e-=2)*e*e+2),easeInQuart:e=>e*e*e*e,easeOutQuart:e=>-((e-=1)*e*e*e-1),easeInOutQuart:e=>(e/=.5)<1?.5*e*e*e*e:-.5*((e-=2)*e*e*e-2),easeInQuint:e=>e*e*e*e*e,easeOutQuint:e=>(e-=1)*e*e*e*e+1,easeInOutQuint:e=>(e/=.5)<1?.5*e*e*e*e*e:.5*((e-=2)*e*e*e*e+2),easeInSine:e=>-Math.cos(e*tt)+1,easeOutSine:e=>Math.sin(e*tt),easeInOutSine:e=>-.5*(Math.cos(Re*e)-1),easeInExpo:e=>e===0?0:Math.pow(2,10*(e-1)),easeOutExpo:e=>e===1?1:-Math.pow(2,-10*e)+1,easeInOutExpo:e=>Cs(e)?e:e<.5?.5*Math.pow(2,10*(e*2-1)):.5*(-Math.pow(2,-10*(e*2-1))+2),easeInCirc:e=>e>=1?e:-(Math.sqrt(1-e*e)-1),easeOutCirc:e=>Math.sqrt(1-(e-=1)*e),easeInOutCirc:e=>(e/=.5)<1?-.5*(Math.sqrt(1-e*e)-1):.5*(Math.sqrt(1-(e-=2)*e)+1),easeInElastic:e=>Cs(e)?e:Od(e,.075,.3),easeOutElastic:e=>Cs(e)?e:Fd(e,.075,.3),easeInOutElastic(e){return Cs(e)?e:e<.5?.5*Od(e*2,.1125,.45):.5+.5*Fd(e*2-1,.1125,.45)},easeInBack(e){return e*e*((1.70158+1)*e-1.70158)},easeOutBack(e){return(e-=1)*e*((1.70158+1)*e+1.70158)+1},easeInOutBack(e){let t=1.70158;return(e/=.5)<1?.5*(e*e*(((t*=1.525)+1)*e-t)):.5*((e-=2)*e*(((t*=1.525)+1)*e+t)+2)},easeInBounce:e=>1-Oi.easeOutBounce(1-e),easeOutBounce(e){return e<1/2.75?7.5625*e*e:e<2/2.75?7.5625*(e-=1.5/2.75)*e+.75:e<2.5/2.75?7.5625*(e-=2.25/2.75)*e+.9375:7.5625*(e-=2.625/2.75)*e+.984375},easeInOutBounce:e=>e<.5?Oi.easeInBounce(e*2)*.5:Oi.easeOutBounce(e*2-1)*.5+.5};function $l(e){if(e&&typeof e=="object"){const t=e.toString();return t==="[object CanvasPattern]"||t==="[object CanvasGradient]"}return!1}function Nd(e){return $l(e)?e:new Vi(e)}function Pr(e){return $l(e)?e:new Vi(e).saturate(.5).darken(.1).hexString()}const K1=["x","y","borderWidth","radius","tension"],W1=["color","borderColor","backgroundColor"];function V1(e){e.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),e.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>t!=="onProgress"&&t!=="onComplete"&&t!=="fn"}),e.set("animations",{colors:{type:"color",properties:W1},numbers:{type:"number",properties:K1}}),e.describe("animations",{_fallback:"animation"}),e.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>t|0}}}})}function G1(e){e.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const Bd=new Map;function Q1(e,t){t=t||{};const n=e+JSON.stringify(t);let i=Bd.get(n);return i||(i=new Intl.NumberFormat(e,t),Bd.set(n,i)),i}function Qf(e,t,n){return Q1(t,n).format(e)}const Y1={values(e){return $e(e)?e:""+e},numeric(e,t,n){if(e===0)return"0";const i=this.chart.options.locale;let s,o=e;if(n.length>1){const c=Math.max(Math.abs(n[0].value),Math.abs(n[n.length-1].value));(c<1e-4||c>1e15)&&(s="scientific"),o=X1(e,n)}const r=qf(Math.abs(o)),a=isNaN(r)?1:Math.max(Math.min(-1*Math.floor(r),20),0),l={notation:s,minimumFractionDigits:a,maximumFractionDigits:a};return Object.assign(l,this.options.ticks.format),Qf(e,i,l)}};function X1(e,t){let n=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(n)>=1&&e!==Math.floor(e)&&(n=e-Math.floor(e)),n}var Yf={formatters:Y1};function J1(e){e.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,n)=>n.lineWidth,tickColor:(t,n)=>n.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:Yf.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),e.route("scale.ticks","color","","color"),e.route("scale.grid","color","","borderColor"),e.route("scale.border","color","","borderColor"),e.route("scale.title","color","","color"),e.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&t!=="callback"&&t!=="parser",_indexable:t=>t!=="borderDash"&&t!=="tickBorderDash"&&t!=="dash"}),e.describe("scales",{_fallback:"scale"}),e.describe("scale.ticks",{_scriptable:t=>t!=="backdropPadding"&&t!=="callback",_indexable:t=>t!=="backdropPadding"})}const An=Object.create(null),va=Object.create(null);function Fi(e,t){if(!t)return e;const n=t.split(".");for(let i=0,s=n.length;i<s;++i){const o=n[i];e=e[o]||(e[o]=Object.create(null))}return e}function Mr(e,t,n){return typeof t=="string"?Gi(Fi(e,t),n):Gi(Fi(e,""),t)}class Z1{constructor(t,n){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=i=>i.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(i,s)=>Pr(s.backgroundColor),this.hoverBorderColor=(i,s)=>Pr(s.borderColor),this.hoverColor=(i,s)=>Pr(s.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(n)}set(t,n){return Mr(this,t,n)}get(t){return Fi(this,t)}describe(t,n){return Mr(va,t,n)}override(t,n){return Mr(An,t,n)}route(t,n,i,s){const o=Fi(this,t),r=Fi(this,i),a="_"+n;Object.defineProperties(o,{[a]:{value:o[n],writable:!0},[n]:{enumerable:!0,get(){const l=this[a],c=r[s];return Z(l)?Object.assign({},c,l):X(l,c)},set(l){this[a]=l}}})}apply(t){t.forEach(n=>n(this))}}var me=new Z1({_scriptable:e=>!e.startsWith("on"),_indexable:e=>e!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[V1,G1,J1]);function ek(e){return!e||ce(e.size)||ce(e.family)?null:(e.style?e.style+" ":"")+(e.weight?e.weight+" ":"")+e.size+"px "+e.family}function zd(e,t,n,i,s){let o=t[s];return o||(o=t[s]=e.measureText(s).width,n.push(s)),o>i&&(i=o),i}function tn(e,t,n){const i=e.currentDevicePixelRatio,s=n!==0?Math.max(n/2,.5):0;return Math.round((t-s)*i)/i+s}function Hd(e,t){!t&&!e||(t=t||e.getContext("2d"),t.save(),t.resetTransform(),t.clearRect(0,0,e.width,e.height),t.restore())}function ya(e,t,n,i){Xf(e,t,n,i,null)}function Xf(e,t,n,i,s){let o,r,a,l,c,d,u,h;const g=t.pointStyle,v=t.rotation,b=t.radius;let y=(v||0)*C1;if(g&&typeof g=="object"&&(o=g.toString(),o==="[object HTMLImageElement]"||o==="[object HTMLCanvasElement]")){e.save(),e.translate(n,i),e.rotate(y),e.drawImage(g,-g.width/2,-g.height/2,g.width,g.height),e.restore();return}if(!(isNaN(b)||b<=0)){switch(e.beginPath(),g){default:s?e.ellipse(n,i,s/2,b,0,0,nt):e.arc(n,i,b,0,nt),e.closePath();break;case"triangle":d=s?s/2:b,e.moveTo(n+Math.sin(y)*d,i-Math.cos(y)*b),y+=Pd,e.lineTo(n+Math.sin(y)*d,i-Math.cos(y)*b),y+=Pd,e.lineTo(n+Math.sin(y)*d,i-Math.cos(y)*b),e.closePath();break;case"rectRounded":c=b*.516,l=b-c,r=Math.cos(y+en)*l,u=Math.cos(y+en)*(s?s/2-c:l),a=Math.sin(y+en)*l,h=Math.sin(y+en)*(s?s/2-c:l),e.arc(n-u,i-a,c,y-Re,y-tt),e.arc(n+h,i-r,c,y-tt,y),e.arc(n+u,i+a,c,y,y+tt),e.arc(n-h,i+r,c,y+tt,y+Re),e.closePath();break;case"rect":if(!v){l=Math.SQRT1_2*b,d=s?s/2:l,e.rect(n-d,i-l,2*d,2*l);break}y+=en;case"rectRot":u=Math.cos(y)*(s?s/2:b),r=Math.cos(y)*b,a=Math.sin(y)*b,h=Math.sin(y)*(s?s/2:b),e.moveTo(n-u,i-a),e.lineTo(n+h,i-r),e.lineTo(n+u,i+a),e.lineTo(n-h,i+r),e.closePath();break;case"crossRot":y+=en;case"cross":u=Math.cos(y)*(s?s/2:b),r=Math.cos(y)*b,a=Math.sin(y)*b,h=Math.sin(y)*(s?s/2:b),e.moveTo(n-u,i-a),e.lineTo(n+u,i+a),e.moveTo(n+h,i-r),e.lineTo(n-h,i+r);break;case"star":u=Math.cos(y)*(s?s/2:b),r=Math.cos(y)*b,a=Math.sin(y)*b,h=Math.sin(y)*(s?s/2:b),e.moveTo(n-u,i-a),e.lineTo(n+u,i+a),e.moveTo(n+h,i-r),e.lineTo(n-h,i+r),y+=en,u=Math.cos(y)*(s?s/2:b),r=Math.cos(y)*b,a=Math.sin(y)*b,h=Math.sin(y)*(s?s/2:b),e.moveTo(n-u,i-a),e.lineTo(n+u,i+a),e.moveTo(n+h,i-r),e.lineTo(n-h,i+r);break;case"line":r=s?s/2:Math.cos(y)*b,a=Math.sin(y)*b,e.moveTo(n-r,i-a),e.lineTo(n+r,i+a);break;case"dash":e.moveTo(n,i),e.lineTo(n+Math.cos(y)*(s?s/2:b),i+Math.sin(y)*b);break;case!1:e.closePath();break}e.fill(),t.borderWidth>0&&e.stroke()}}function Yi(e,t,n){return n=n||.5,!t||e&&e.x>t.left-n&&e.x<t.right+n&&e.y>t.top-n&&e.y<t.bottom+n}function zo(e,t){e.save(),e.beginPath(),e.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),e.clip()}function Ho(e){e.restore()}function tk(e,t,n,i,s){if(!t)return e.lineTo(n.x,n.y);if(s==="middle"){const o=(t.x+n.x)/2;e.lineTo(o,t.y),e.lineTo(o,n.y)}else s==="after"!=!!i?e.lineTo(t.x,n.y):e.lineTo(n.x,t.y);e.lineTo(n.x,n.y)}function nk(e,t,n,i){if(!t)return e.lineTo(n.x,n.y);e.bezierCurveTo(i?t.cp1x:t.cp2x,i?t.cp1y:t.cp2y,i?n.cp2x:n.cp1x,i?n.cp2y:n.cp1y,n.x,n.y)}function ik(e,t){t.translation&&e.translate(t.translation[0],t.translation[1]),ce(t.rotation)||e.rotate(t.rotation),t.color&&(e.fillStyle=t.color),t.textAlign&&(e.textAlign=t.textAlign),t.textBaseline&&(e.textBaseline=t.textBaseline)}function sk(e,t,n,i,s){if(s.strikethrough||s.underline){const o=e.measureText(i),r=t-o.actualBoundingBoxLeft,a=t+o.actualBoundingBoxRight,l=n-o.actualBoundingBoxAscent,c=n+o.actualBoundingBoxDescent,d=s.strikethrough?(l+c)/2:c;e.strokeStyle=e.fillStyle,e.beginPath(),e.lineWidth=s.decorationWidth||2,e.moveTo(r,d),e.lineTo(a,d),e.stroke()}}function ok(e,t){const n=e.fillStyle;e.fillStyle=t.color,e.fillRect(t.left,t.top,t.width,t.height),e.fillStyle=n}function vo(e,t,n,i,s,o={}){const r=$e(t)?t:[t],a=o.strokeWidth>0&&o.strokeColor!=="";let l,c;for(e.save(),e.font=s.string,ik(e,o),l=0;l<r.length;++l)c=r[l],o.backdrop&&ok(e,o.backdrop),a&&(o.strokeColor&&(e.strokeStyle=o.strokeColor),ce(o.strokeWidth)||(e.lineWidth=o.strokeWidth),e.strokeText(c,n,i,o.maxWidth)),e.fillText(c,n,i,o.maxWidth),sk(e,n,i,c,o),i+=Number(s.lineHeight);e.restore()}function ba(e,t){const{x:n,y:i,w:s,h:o,radius:r}=t;e.arc(n+r.topLeft,i+r.topLeft,r.topLeft,1.5*Re,Re,!0),e.lineTo(n,i+o-r.bottomLeft),e.arc(n+r.bottomLeft,i+o-r.bottomLeft,r.bottomLeft,Re,tt,!0),e.lineTo(n+s-r.bottomRight,i+o),e.arc(n+s-r.bottomRight,i+o-r.bottomRight,r.bottomRight,tt,0,!0),e.lineTo(n+s,i+r.topRight),e.arc(n+s-r.topRight,i+r.topRight,r.topRight,0,-tt,!0),e.lineTo(n+r.topLeft,i)}const rk=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,ak=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function lk(e,t){const n=(""+e).match(rk);if(!n||n[1]==="normal")return t*1.2;switch(e=+n[2],n[3]){case"px":return e;case"%":e/=100;break}return t*e}const ck=e=>+e||0;function Jf(e,t){const n={},i=Z(t),s=i?Object.keys(t):t,o=Z(e)?i?r=>X(e[r],e[t[r]]):r=>e[r]:()=>e;for(const r of s)n[r]=ck(o(r));return n}function dk(e){return Jf(e,{top:"y",right:"x",bottom:"y",left:"x"})}function Ni(e){return Jf(e,["topLeft","topRight","bottomLeft","bottomRight"])}function st(e){const t=dk(e);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function Ue(e,t){e=e||{},t=t||me.font;let n=X(e.size,t.size);typeof n=="string"&&(n=parseInt(n,10));let i=X(e.style,t.style);i&&!(""+i).match(ak)&&(console.warn('Invalid font style specified: "'+i+'"'),i=void 0);const s={family:X(e.family,t.family),lineHeight:lk(X(e.lineHeight,t.lineHeight),n),size:n,style:i,weight:X(e.weight,t.weight),string:""};return s.string=ek(s),s}function Es(e,t,n,i){let s,o,r;for(s=0,o=e.length;s<o;++s)if(r=e[s],r!==void 0&&r!==void 0)return r}function uk(e,t,n){const{min:i,max:s}=e,o=w1(t,(s-i)/2),r=(a,l)=>n&&a===0?0:a+l;return{min:r(i,-Math.abs(o)),max:r(s,o)}}function Rn(e,t){return Object.assign(Object.create(e),t)}function Sl(e,t=[""],n,i,s=()=>e[0]){const o=n||e;typeof i>"u"&&(i=np("_fallback",e));const r={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:e,_rootScopes:o,_fallback:i,_getTarget:s,override:a=>Sl([a,...e],t,o,i)};return new Proxy(r,{deleteProperty(a,l){return delete a[l],delete a._keys,delete e[0][l],!0},get(a,l){return ep(a,l,()=>bk(l,t,e,a))},getOwnPropertyDescriptor(a,l){return Reflect.getOwnPropertyDescriptor(a._scopes[0],l)},getPrototypeOf(){return Reflect.getPrototypeOf(e[0])},has(a,l){return qd(a).includes(l)},ownKeys(a){return qd(a)},set(a,l,c){const d=a._storage||(a._storage=s());return a[l]=d[l]=c,delete a._keys,!0}})}function Jn(e,t,n,i){const s={_cacheable:!1,_proxy:e,_context:t,_subProxy:n,_stack:new Set,_descriptors:Zf(e,i),setContext:o=>Jn(e,o,n,i),override:o=>Jn(e.override(o),t,n,i)};return new Proxy(s,{deleteProperty(o,r){return delete o[r],delete e[r],!0},get(o,r,a){return ep(o,r,()=>fk(o,r,a))},getOwnPropertyDescriptor(o,r){return o._descriptors.allKeys?Reflect.has(e,r)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(e,r)},getPrototypeOf(){return Reflect.getPrototypeOf(e)},has(o,r){return Reflect.has(e,r)},ownKeys(){return Reflect.ownKeys(e)},set(o,r,a){return e[r]=a,delete o[r],!0}})}function Zf(e,t={scriptable:!0,indexable:!0}){const{_scriptable:n=t.scriptable,_indexable:i=t.indexable,_allKeys:s=t.allKeys}=e;return{allKeys:s,scriptable:n,indexable:i,isScriptable:qt(n)?n:()=>n,isIndexable:qt(i)?i:()=>i}}const hk=(e,t)=>e?e+_l(t):t,Al=(e,t)=>Z(t)&&e!=="adapters"&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function ep(e,t,n){if(Object.prototype.hasOwnProperty.call(e,t)||t==="constructor")return e[t];const i=n();return e[t]=i,i}function fk(e,t,n){const{_proxy:i,_context:s,_subProxy:o,_descriptors:r}=e;let a=i[t];return qt(a)&&r.isScriptable(t)&&(a=pk(t,a,e,n)),$e(a)&&a.length&&(a=gk(t,a,e,r.isIndexable)),Al(t,a)&&(a=Jn(a,s,o&&o[t],r)),a}function pk(e,t,n,i){const{_proxy:s,_context:o,_subProxy:r,_stack:a}=n;if(a.has(e))throw new Error("Recursion detected: "+Array.from(a).join("->")+"->"+e);a.add(e);let l=t(o,r||i);return a.delete(e),Al(e,l)&&(l=Tl(s._scopes,s,e,l)),l}function gk(e,t,n,i){const{_proxy:s,_context:o,_subProxy:r,_descriptors:a}=n;if(typeof o.index<"u"&&i(e))return t[o.index%t.length];if(Z(t[0])){const l=t,c=s._scopes.filter(d=>d!==l);t=[];for(const d of l){const u=Tl(c,s,e,d);t.push(Jn(u,o,r&&r[e],a))}}return t}function tp(e,t,n){return qt(e)?e(t,n):e}const mk=(e,t)=>e===!0?t:typeof e=="string"?po(t,e):void 0;function vk(e,t,n,i,s){for(const o of t){const r=mk(n,o);if(r){e.add(r);const a=tp(r._fallback,n,s);if(typeof a<"u"&&a!==n&&a!==i)return a}else if(r===!1&&typeof i<"u"&&n!==i)return null}return!1}function Tl(e,t,n,i){const s=t._rootScopes,o=tp(t._fallback,n,i),r=[...e,...s],a=new Set;a.add(i);let l=Ud(a,r,n,o||n,i);return l===null||typeof o<"u"&&o!==n&&(l=Ud(a,r,o,l,i),l===null)?!1:Sl(Array.from(a),[""],s,o,()=>yk(t,n,i))}function Ud(e,t,n,i,s){for(;n;)n=vk(e,t,n,i,s);return n}function yk(e,t,n){const i=e._getTarget();t in i||(i[t]={});const s=i[t];return $e(s)&&Z(n)?n:s||{}}function bk(e,t,n,i){let s;for(const o of t)if(s=np(hk(o,e),n),typeof s<"u")return Al(e,s)?Tl(n,i,e,s):s}function np(e,t){for(const n of t){if(!n)continue;const i=n[e];if(typeof i<"u")return i}}function qd(e){let t=e._keys;return t||(t=e._keys=xk(e._scopes)),t}function xk(e){const t=new Set;for(const n of e)for(const i of Object.keys(n).filter(s=>!s.startsWith("_")))t.add(i);return Array.from(t)}const wk=Number.EPSILON||1e-14,Zn=(e,t)=>t<e.length&&!e[t].skip&&e[t],ip=e=>e==="x"?"y":"x";function _k(e,t,n,i){const s=e.skip?t:e,o=t,r=n.skip?t:n,a=ma(o,s),l=ma(r,o);let c=a/(a+l),d=l/(a+l);c=isNaN(c)?0:c,d=isNaN(d)?0:d;const u=i*c,h=i*d;return{previous:{x:o.x-u*(r.x-s.x),y:o.y-u*(r.y-s.y)},next:{x:o.x+h*(r.x-s.x),y:o.y+h*(r.y-s.y)}}}function kk(e,t,n){const i=e.length;let s,o,r,a,l,c=Zn(e,0);for(let d=0;d<i-1;++d)if(l=c,c=Zn(e,d+1),!(!l||!c)){if(Ii(t[d],0,wk)){n[d]=n[d+1]=0;continue}s=n[d]/t[d],o=n[d+1]/t[d],a=Math.pow(s,2)+Math.pow(o,2),!(a<=9)&&(r=3/Math.sqrt(a),n[d]=s*r*t[d],n[d+1]=o*r*t[d])}}function $k(e,t,n="x"){const i=ip(n),s=e.length;let o,r,a,l=Zn(e,0);for(let c=0;c<s;++c){if(r=a,a=l,l=Zn(e,c+1),!a)continue;const d=a[n],u=a[i];r&&(o=(d-r[n])/3,a[`cp1${n}`]=d-o,a[`cp1${i}`]=u-o*t[c]),l&&(o=(l[n]-d)/3,a[`cp2${n}`]=d+o,a[`cp2${i}`]=u+o*t[c])}}function Sk(e,t="x"){const n=ip(t),i=e.length,s=Array(i).fill(0),o=Array(i);let r,a,l,c=Zn(e,0);for(r=0;r<i;++r)if(a=l,l=c,c=Zn(e,r+1),!!l){if(c){const d=c[t]-l[t];s[r]=d!==0?(c[n]-l[n])/d:0}o[r]=a?c?Xn(s[r-1])!==Xn(s[r])?0:(s[r-1]+s[r])/2:s[r-1]:s[r]}kk(e,s,o),$k(e,o,t)}function Rs(e,t,n){return Math.max(Math.min(e,n),t)}function Ak(e,t){let n,i,s,o,r,a=Yi(e[0],t);for(n=0,i=e.length;n<i;++n)r=o,o=a,a=n<i-1&&Yi(e[n+1],t),o&&(s=e[n],r&&(s.cp1x=Rs(s.cp1x,t.left,t.right),s.cp1y=Rs(s.cp1y,t.top,t.bottom)),a&&(s.cp2x=Rs(s.cp2x,t.left,t.right),s.cp2y=Rs(s.cp2y,t.top,t.bottom)))}function Tk(e,t,n,i,s){let o,r,a,l;if(t.spanGaps&&(e=e.filter(c=>!c.skip)),t.cubicInterpolationMode==="monotone")Sk(e,s);else{let c=i?e[e.length-1]:e[0];for(o=0,r=e.length;o<r;++o)a=e[o],l=_k(c,a,e[Math.min(o+1,r-(i?0:1))%r],t.tension),a.cp1x=l.previous.x,a.cp1y=l.previous.y,a.cp2x=l.next.x,a.cp2y=l.next.y,c=a}t.capBezierPoints&&Ak(e,n)}function Cl(){return typeof window<"u"&&typeof document<"u"}function El(e){let t=e.parentNode;return t&&t.toString()==="[object ShadowRoot]"&&(t=t.host),t}function yo(e,t,n){let i;return typeof e=="string"?(i=parseInt(e,10),e.indexOf("%")!==-1&&(i=i/100*t.parentNode[n])):i=e,i}const Uo=e=>e.ownerDocument.defaultView.getComputedStyle(e,null);function Ck(e,t){return Uo(e).getPropertyValue(t)}const Ek=["top","right","bottom","left"];function vn(e,t,n){const i={};n=n?"-"+n:"";for(let s=0;s<4;s++){const o=Ek[s];i[o]=parseFloat(e[t+"-"+o+n])||0}return i.width=i.left+i.right,i.height=i.top+i.bottom,i}const Rk=(e,t,n)=>(e>0||t>0)&&(!n||!n.shadowRoot);function Lk(e,t){const n=e.touches,i=n&&n.length?n[0]:e,{offsetX:s,offsetY:o}=i;let r=!1,a,l;if(Rk(s,o,e.target))a=s,l=o;else{const c=t.getBoundingClientRect();a=i.clientX-c.left,l=i.clientY-c.top,r=!0}return{x:a,y:l,box:r}}function on(e,t){if("native"in e)return e;const{canvas:n,currentDevicePixelRatio:i}=t,s=Uo(n),o=s.boxSizing==="border-box",r=vn(s,"padding"),a=vn(s,"border","width"),{x:l,y:c,box:d}=Lk(e,n),u=r.left+(d&&a.left),h=r.top+(d&&a.top);let{width:g,height:v}=t;return o&&(g-=r.width+a.width,v-=r.height+a.height),{x:Math.round((l-u)/g*n.width/i),y:Math.round((c-h)/v*n.height/i)}}function Pk(e,t,n){let i,s;if(t===void 0||n===void 0){const o=e&&El(e);if(!o)t=e.clientWidth,n=e.clientHeight;else{const r=o.getBoundingClientRect(),a=Uo(o),l=vn(a,"border","width"),c=vn(a,"padding");t=r.width-c.width-l.width,n=r.height-c.height-l.height,i=yo(a.maxWidth,o,"clientWidth"),s=yo(a.maxHeight,o,"clientHeight")}}return{width:t,height:n,maxWidth:i||mo,maxHeight:s||mo}}const Dt=e=>Math.round(e*10)/10;function Mk(e,t,n,i){const s=Uo(e),o=vn(s,"margin"),r=yo(s.maxWidth,e,"clientWidth")||mo,a=yo(s.maxHeight,e,"clientHeight")||mo,l=Pk(e,t,n);let{width:c,height:d}=l;if(s.boxSizing==="content-box"){const h=vn(s,"border","width"),g=vn(s,"padding");c-=g.width+h.width,d-=g.height+h.height}return c=Math.max(0,c-o.width),d=Math.max(0,i?c/i:d-o.height),c=Dt(Math.min(c,r,l.maxWidth)),d=Dt(Math.min(d,a,l.maxHeight)),c&&!d&&(d=Dt(c/2)),(t!==void 0||n!==void 0)&&i&&l.height&&d>l.height&&(d=l.height,c=Dt(Math.floor(d*i))),{width:c,height:d}}function jd(e,t,n){const i=t||1,s=Dt(e.height*i),o=Dt(e.width*i);e.height=Dt(e.height),e.width=Dt(e.width);const r=e.canvas;return r.style&&(n||!r.style.height&&!r.style.width)&&(r.style.height=`${e.height}px`,r.style.width=`${e.width}px`),e.currentDevicePixelRatio!==i||r.height!==s||r.width!==o?(e.currentDevicePixelRatio=i,r.height=s,r.width=o,e.ctx.setTransform(i,0,0,i,0,0),!0):!1}const Dk=(function(){let e=!1;try{const t={get passive(){return e=!0,!1}};Cl()&&(window.addEventListener("test",null,t),window.removeEventListener("test",null,t))}catch{}return e})();function Kd(e,t){const n=Ck(e,t),i=n&&n.match(/^(\d+)(\.\d+)?px$/);return i?+i[1]:void 0}function rn(e,t,n,i){return{x:e.x+n*(t.x-e.x),y:e.y+n*(t.y-e.y)}}function Ik(e,t,n,i){return{x:e.x+n*(t.x-e.x),y:i==="middle"?n<.5?e.y:t.y:i==="after"?n<1?e.y:t.y:n>0?t.y:e.y}}function Ok(e,t,n,i){const s={x:e.cp2x,y:e.cp2y},o={x:t.cp1x,y:t.cp1y},r=rn(e,s,n),a=rn(s,o,n),l=rn(o,t,n),c=rn(r,a,n),d=rn(a,l,n);return rn(c,d,n)}const Fk=function(e,t){return{x(n){return e+e+t-n},setWidth(n){t=n},textAlign(n){return n==="center"?n:n==="right"?"left":"right"},xPlus(n,i){return n-i},leftForLtr(n,i){return n-i}}},Nk=function(){return{x(e){return e},setWidth(e){},textAlign(e){return e},xPlus(e,t){return e+t},leftForLtr(e,t){return e}}};function qn(e,t,n){return e?Fk(t,n):Nk()}function sp(e,t){let n,i;(t==="ltr"||t==="rtl")&&(n=e.canvas.style,i=[n.getPropertyValue("direction"),n.getPropertyPriority("direction")],n.setProperty("direction",t,"important"),e.prevTextDirection=i)}function op(e,t){t!==void 0&&(delete e.prevTextDirection,e.canvas.style.setProperty("direction",t[0],t[1]))}function rp(e){return e==="angle"?{between:jf,compare:I1,normalize:pt}:{between:Hn,compare:(t,n)=>t-n,normalize:t=>t}}function Wd({start:e,end:t,count:n,loop:i,style:s}){return{start:e%n,end:t%n,loop:i&&(t-e+1)%n===0,style:s}}function Bk(e,t,n){const{property:i,start:s,end:o}=n,{between:r,normalize:a}=rp(i),l=t.length;let{start:c,end:d,loop:u}=e,h,g;if(u){for(c+=l,d+=l,h=0,g=l;h<g&&r(a(t[c%l][i]),s,o);++h)c--,d--;c%=l,d%=l}return d<c&&(d+=l),{start:c,end:d,loop:u,style:e.style}}function ap(e,t,n){if(!n)return[e];const{property:i,start:s,end:o}=n,r=t.length,{compare:a,between:l,normalize:c}=rp(i),{start:d,end:u,loop:h,style:g}=Bk(e,t,n),v=[];let b=!1,y=null,S,E,L;const T=()=>l(s,L,S)&&a(s,L)!==0,C=()=>a(o,S)===0||l(o,L,S),M=()=>b||T(),m=()=>!b||C();for(let k=d,R=d;k<=u;++k)E=t[k%r],!E.skip&&(S=c(E[i]),S!==L&&(b=l(S,s,o),y===null&&M()&&(y=a(S,s)===0?k:R),y!==null&&m()&&(v.push(Wd({start:y,end:k,loop:h,count:r,style:g})),y=null),R=k,L=S));return y!==null&&v.push(Wd({start:y,end:u,loop:h,count:r,style:g})),v}function lp(e,t){const n=[],i=e.segments;for(let s=0;s<i.length;s++){const o=ap(i[s],e.points,t);o.length&&n.push(...o)}return n}function zk(e,t,n,i){let s=0,o=t-1;if(n&&!i)for(;s<t&&!e[s].skip;)s++;for(;s<t&&e[s].skip;)s++;for(s%=t,n&&(o+=s);o>s&&e[o%t].skip;)o--;return o%=t,{start:s,end:o}}function Hk(e,t,n,i){const s=e.length,o=[];let r=t,a=e[t],l;for(l=t+1;l<=n;++l){const c=e[l%s];c.skip||c.stop?a.skip||(i=!1,o.push({start:t%s,end:(l-1)%s,loop:i}),t=r=c.stop?l:null):(r=l,a.skip&&(t=l)),a=c}return r!==null&&o.push({start:t%s,end:r%s,loop:i}),o}function Uk(e,t){const n=e.points,i=e.options.spanGaps,s=n.length;if(!s)return[];const o=!!e._loop,{start:r,end:a}=zk(n,s,o,i);if(i===!0)return Vd(e,[{start:r,end:a,loop:o}],n,t);const l=a<r?a+s:a,c=!!e._fullLoop&&r===0&&a===s-1;return Vd(e,Hk(n,r,l,c),n,t)}function Vd(e,t,n,i){return!i||!i.setContext||!n?t:qk(e,t,n,i)}function qk(e,t,n,i){const s=e._chart.getContext(),o=Gd(e.options),{_datasetIndex:r,options:{spanGaps:a}}=e,l=n.length,c=[];let d=o,u=t[0].start,h=u;function g(v,b,y,S){const E=a?-1:1;if(v!==b){for(v+=l;n[v%l].skip;)v-=E;for(;n[b%l].skip;)b+=E;v%l!==b%l&&(c.push({start:v%l,end:b%l,loop:y,style:S}),d=S,u=b%l)}}for(const v of t){u=a?u:v.start;let b=n[u%l],y;for(h=u+1;h<=v.end;h++){const S=n[h%l];y=Gd(i.setContext(Rn(s,{type:"segment",p0:b,p1:S,p0DataIndex:(h-1)%l,p1DataIndex:h%l,datasetIndex:r}))),jk(y,d)&&g(u,h-1,v.loop,d),b=S,d=y}u<h-1&&g(u,h-1,v.loop,d)}return c}function Gd(e){return{backgroundColor:e.backgroundColor,borderCapStyle:e.borderCapStyle,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderJoinStyle:e.borderJoinStyle,borderWidth:e.borderWidth,borderColor:e.borderColor}}function jk(e,t){if(!t)return!1;const n=[],i=function(s,o){return $l(o)?(n.includes(o)||n.push(o),n.indexOf(o)):o};return JSON.stringify(e,i)!==JSON.stringify(t,i)}function Ls(e,t,n){return e.options.clip?e[n]:t[n]}function Kk(e,t){const{xScale:n,yScale:i}=e;return n&&i?{left:Ls(n,t,"left"),right:Ls(n,t,"right"),top:Ls(i,t,"top"),bottom:Ls(i,t,"bottom")}:t}function cp(e,t){const n=t._clip;if(n.disabled)return!1;const i=Kk(t,e.chartArea);return{left:n.left===!1?0:i.left-(n.left===!0?0:n.left),right:n.right===!1?e.width:i.right+(n.right===!0?0:n.right),top:n.top===!1?0:i.top-(n.top===!0?0:n.top),bottom:n.bottom===!1?e.height:i.bottom+(n.bottom===!0?0:n.bottom)}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */class Wk{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,n,i,s){const o=n.listeners[s],r=n.duration;o.forEach(a=>a({chart:t,initial:n.initial,numSteps:r,currentStep:Math.min(i-n.start,r)}))}_refresh(){this._request||(this._running=!0,this._request=Wf.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(t=Date.now()){let n=0;this._charts.forEach((i,s)=>{if(!i.running||!i.items.length)return;const o=i.items;let r=o.length-1,a=!1,l;for(;r>=0;--r)l=o[r],l._active?(l._total>i.duration&&(i.duration=l._total),l.tick(t),a=!0):(o[r]=o[o.length-1],o.pop());a&&(s.draw(),this._notify(s,i,t,"progress")),o.length||(i.running=!1,this._notify(s,i,t,"complete"),i.initial=!1),n+=o.length}),this._lastDate=t,n===0&&(this._running=!1)}_getAnims(t){const n=this._charts;let i=n.get(t);return i||(i={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},n.set(t,i)),i}listen(t,n,i){this._getAnims(t).listeners[n].push(i)}add(t,n){!n||!n.length||this._getAnims(t).items.push(...n)}has(t){return this._getAnims(t).items.length>0}start(t){const n=this._charts.get(t);n&&(n.running=!0,n.start=Date.now(),n.duration=n.items.reduce((i,s)=>Math.max(i,s._duration),0),this._refresh())}running(t){if(!this._running)return!1;const n=this._charts.get(t);return!(!n||!n.running||!n.items.length)}stop(t){const n=this._charts.get(t);if(!n||!n.items.length)return;const i=n.items;let s=i.length-1;for(;s>=0;--s)i[s].cancel();n.items=[],this._notify(t,n,Date.now(),"complete")}remove(t){return this._charts.delete(t)}}var St=new Wk;const Qd="transparent",Vk={boolean(e,t,n){return n>.5?t:e},color(e,t,n){const i=Nd(e||Qd),s=i.valid&&Nd(t||Qd);return s&&s.valid?s.mix(i,n).hexString():t},number(e,t,n){return e+(t-e)*n}};class Gk{constructor(t,n,i,s){const o=n[i];s=Es([t.to,s,o,t.from]);const r=Es([t.from,o,s]);this._active=!0,this._fn=t.fn||Vk[t.type||typeof r],this._easing=Oi[t.easing]||Oi.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=n,this._prop=i,this._from=r,this._to=s,this._promises=void 0}active(){return this._active}update(t,n,i){if(this._active){this._notify(!1);const s=this._target[this._prop],o=i-this._start,r=this._duration-o;this._start=i,this._duration=Math.floor(Math.max(r,t.duration)),this._total+=o,this._loop=!!t.loop,this._to=Es([t.to,n,s,t.from]),this._from=Es([t.from,s,n])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const n=t-this._start,i=this._duration,s=this._prop,o=this._from,r=this._loop,a=this._to;let l;if(this._active=o!==a&&(r||n<i),!this._active){this._target[s]=a,this._notify(!0);return}if(n<0){this._target[s]=o;return}l=n/i%2,l=r&&l>1?2-l:l,l=this._easing(Math.min(1,Math.max(0,l))),this._target[s]=this._fn(o,a,l)}wait(){const t=this._promises||(this._promises=[]);return new Promise((n,i)=>{t.push({res:n,rej:i})})}_notify(t){const n=t?"res":"rej",i=this._promises||[];for(let s=0;s<i.length;s++)i[s][n]()}}class dp{constructor(t,n){this._chart=t,this._properties=new Map,this.configure(n)}configure(t){if(!Z(t))return;const n=Object.keys(me.animation),i=this._properties;Object.getOwnPropertyNames(t).forEach(s=>{const o=t[s];if(!Z(o))return;const r={};for(const a of n)r[a]=o[a];($e(o.properties)&&o.properties||[s]).forEach(a=>{(a===s||!i.has(a))&&i.set(a,r)})})}_animateOptions(t,n){const i=n.options,s=Yk(t,i);if(!s)return[];const o=this._createAnimations(s,i);return i.$shared&&Qk(t.options.$animations,i).then(()=>{t.options=i},()=>{}),o}_createAnimations(t,n){const i=this._properties,s=[],o=t.$animations||(t.$animations={}),r=Object.keys(n),a=Date.now();let l;for(l=r.length-1;l>=0;--l){const c=r[l];if(c.charAt(0)==="$")continue;if(c==="options"){s.push(...this._animateOptions(t,n));continue}const d=n[c];let u=o[c];const h=i.get(c);if(u)if(h&&u.active()){u.update(h,d,a);continue}else u.cancel();if(!h||!h.duration){t[c]=d;continue}o[c]=u=new Gk(h,t,c,d),s.push(u)}return s}update(t,n){if(this._properties.size===0){Object.assign(t,n);return}const i=this._createAnimations(t,n);if(i.length)return St.add(this._chart,i),!0}}function Qk(e,t){const n=[],i=Object.keys(t);for(let s=0;s<i.length;s++){const o=e[i[s]];o&&o.active()&&n.push(o.wait())}return Promise.all(n)}function Yk(e,t){if(!t)return;let n=e.options;if(!n){e.options=t;return}return n.$shared&&(e.options=n=Object.assign({},n,{$shared:!1,$animations:{}})),n}function Yd(e,t){const n=e&&e.options||{},i=n.reverse,s=n.min===void 0?t:0,o=n.max===void 0?t:0;return{start:i?o:s,end:i?s:o}}function Xk(e,t,n){if(n===!1)return!1;const i=Yd(e,n),s=Yd(t,n);return{top:s.end,right:i.end,bottom:s.start,left:i.start}}function Jk(e){let t,n,i,s;return Z(e)?(t=e.top,n=e.right,i=e.bottom,s=e.left):t=n=i=s=e,{top:t,right:n,bottom:i,left:s,disabled:e===!1}}function up(e,t){const n=[],i=e._getSortedDatasetMetas(t);let s,o;for(s=0,o=i.length;s<o;++s)n.push(i[s].index);return n}function Xd(e,t,n,i={}){const s=e.keys,o=i.mode==="single";let r,a,l,c;if(t===null)return;let d=!1;for(r=0,a=s.length;r<a;++r){if(l=+s[r],l===n){if(d=!0,i.all)continue;break}c=e.values[l],Pe(c)&&(o||t===0||Xn(t)===Xn(c))&&(t+=c)}return!d&&!i.all?0:t}function Zk(e,t){const{iScale:n,vScale:i}=t,s=n.axis==="x"?"x":"y",o=i.axis==="x"?"x":"y",r=Object.keys(e),a=new Array(r.length);let l,c,d;for(l=0,c=r.length;l<c;++l)d=r[l],a[l]={[s]:d,[o]:e[d]};return a}function Dr(e,t){const n=e&&e.options.stacked;return n||n===void 0&&t.stack!==void 0}function e$(e,t,n){return`${e.id}.${t.id}.${n.stack||n.type}`}function t$(e){const{min:t,max:n,minDefined:i,maxDefined:s}=e.getUserBounds();return{min:i?t:Number.NEGATIVE_INFINITY,max:s?n:Number.POSITIVE_INFINITY}}function n$(e,t,n){const i=e[t]||(e[t]={});return i[n]||(i[n]={})}function Jd(e,t,n,i){for(const s of t.getMatchingVisibleMetas(i).reverse()){const o=e[s.index];if(n&&o>0||!n&&o<0)return s.index}return null}function Zd(e,t){const{chart:n,_cachedMeta:i}=e,s=n._stacks||(n._stacks={}),{iScale:o,vScale:r,index:a}=i,l=o.axis,c=r.axis,d=e$(o,r,i),u=t.length;let h;for(let g=0;g<u;++g){const v=t[g],{[l]:b,[c]:y}=v,S=v._stacks||(v._stacks={});h=S[c]=n$(s,d,b),h[a]=y,h._top=Jd(h,r,!0,i.type),h._bottom=Jd(h,r,!1,i.type);const E=h._visualValues||(h._visualValues={});E[a]=y}}function Ir(e,t){const n=e.scales;return Object.keys(n).filter(i=>n[i].axis===t).shift()}function i$(e,t){return Rn(e,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:"default",type:"dataset"})}function s$(e,t,n){return Rn(e,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:n,index:t,mode:"default",type:"data"})}function pi(e,t){const n=e.controller.index,i=e.vScale&&e.vScale.axis;if(i){t=t||e._parsed;for(const s of t){const o=s._stacks;if(!o||o[i]===void 0||o[i][n]===void 0)return;delete o[i][n],o[i]._visualValues!==void 0&&o[i]._visualValues[n]!==void 0&&delete o[i]._visualValues[n]}}}const Or=e=>e==="reset"||e==="none",eu=(e,t)=>t?e:Object.assign({},e),o$=(e,t,n)=>e&&!t.hidden&&t._stacked&&{keys:up(n,!0),values:null};class Bi{constructor(t,n){this.chart=t,this._ctx=t.ctx,this.index=n,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=Dr(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&pi(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,n=this._cachedMeta,i=this.getDataset(),s=(u,h,g,v)=>u==="x"?h:u==="r"?v:g,o=n.xAxisID=X(i.xAxisID,Ir(t,"x")),r=n.yAxisID=X(i.yAxisID,Ir(t,"y")),a=n.rAxisID=X(i.rAxisID,Ir(t,"r")),l=n.indexAxis,c=n.iAxisID=s(l,o,r,a),d=n.vAxisID=s(l,r,o,a);n.xScale=this.getScaleForId(o),n.yScale=this.getScaleForId(r),n.rScale=this.getScaleForId(a),n.iScale=this.getScaleForId(c),n.vScale=this.getScaleForId(d)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const n=this._cachedMeta;return t===n.iScale?n.vScale:n.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&Id(this._data,this),t._stacked&&pi(t)}_dataCheck(){const t=this.getDataset(),n=t.data||(t.data=[]),i=this._data;if(Z(n)){const s=this._cachedMeta;this._data=Zk(n,s)}else if(i!==n){if(i){Id(i,this);const s=this._cachedMeta;pi(s),s._parsed=[]}n&&Object.isExtensible(n)&&B1(n,this),this._syncList=[],this._data=n}}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const n=this._cachedMeta,i=this.getDataset();let s=!1;this._dataCheck();const o=n._stacked;n._stacked=Dr(n.vScale,n),n.stack!==i.stack&&(s=!0,pi(n),n.stack=i.stack),this._resyncElements(t),(s||o!==n._stacked)&&(Zd(this,n._parsed),n._stacked=Dr(n.vScale,n))}configure(){const t=this.chart.config,n=t.datasetScopeKeys(this._type),i=t.getOptionScopes(this.getDataset(),n,!0);this.options=t.createResolver(i,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,n){const{_cachedMeta:i,_data:s}=this,{iScale:o,_stacked:r}=i,a=o.axis;let l=t===0&&n===s.length?!0:i._sorted,c=t>0&&i._parsed[t-1],d,u,h;if(this._parsing===!1)i._parsed=s,i._sorted=!0,h=s;else{$e(s[t])?h=this.parseArrayData(i,s,t,n):Z(s[t])?h=this.parseObjectData(i,s,t,n):h=this.parsePrimitiveData(i,s,t,n);const g=()=>u[a]===null||c&&u[a]<c[a];for(d=0;d<n;++d)i._parsed[d+t]=u=h[d],l&&(g()&&(l=!1),c=u);i._sorted=l}r&&Zd(this,h)}parsePrimitiveData(t,n,i,s){const{iScale:o,vScale:r}=t,a=o.axis,l=r.axis,c=o.getLabels(),d=o===r,u=new Array(s);let h,g,v;for(h=0,g=s;h<g;++h)v=h+i,u[h]={[a]:d||o.parse(c[v],v),[l]:r.parse(n[v],v)};return u}parseArrayData(t,n,i,s){const{xScale:o,yScale:r}=t,a=new Array(s);let l,c,d,u;for(l=0,c=s;l<c;++l)d=l+i,u=n[d],a[l]={x:o.parse(u[0],d),y:r.parse(u[1],d)};return a}parseObjectData(t,n,i,s){const{xScale:o,yScale:r}=t,{xAxisKey:a="x",yAxisKey:l="y"}=this._parsing,c=new Array(s);let d,u,h,g;for(d=0,u=s;d<u;++d)h=d+i,g=n[h],c[d]={x:o.parse(po(g,a),h),y:r.parse(po(g,l),h)};return c}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,n,i){const s=this.chart,o=this._cachedMeta,r=n[t.axis],a={keys:up(s,!0),values:n._stacks[t.axis]._visualValues};return Xd(a,r,o.index,{mode:i})}updateRangeFromParsed(t,n,i,s){const o=i[n.axis];let r=o===null?NaN:o;const a=s&&i._stacks[n.axis];s&&a&&(s.values=a,r=Xd(s,o,this._cachedMeta.index)),t.min=Math.min(t.min,r),t.max=Math.max(t.max,r)}getMinMax(t,n){const i=this._cachedMeta,s=i._parsed,o=i._sorted&&t===i.iScale,r=s.length,a=this._getOtherScale(t),l=o$(n,i,this.chart),c={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:d,max:u}=t$(a);let h,g;function v(){g=s[h];const b=g[a.axis];return!Pe(g[t.axis])||d>b||u<b}for(h=0;h<r&&!(!v()&&(this.updateRangeFromParsed(c,t,g,l),o));++h);if(o){for(h=r-1;h>=0;--h)if(!v()){this.updateRangeFromParsed(c,t,g,l);break}}return c}getAllParsedValues(t){const n=this._cachedMeta._parsed,i=[];let s,o,r;for(s=0,o=n.length;s<o;++s)r=n[s][t.axis],Pe(r)&&i.push(r);return i}getMaxOverflow(){return!1}getLabelAndValue(t){const n=this._cachedMeta,i=n.iScale,s=n.vScale,o=this.getParsed(t);return{label:i?""+i.getLabelForValue(o[i.axis]):"",value:s?""+s.getLabelForValue(o[s.axis]):""}}_update(t){const n=this._cachedMeta;this.update(t||"default"),n._clip=Jk(X(this.options.clip,Xk(n.xScale,n.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,n=this.chart,i=this._cachedMeta,s=i.data||[],o=n.chartArea,r=[],a=this._drawStart||0,l=this._drawCount||s.length-a,c=this.options.drawActiveElementsOnTop;let d;for(i.dataset&&i.dataset.draw(t,o,a,l),d=a;d<a+l;++d){const u=s[d];u.hidden||(u.active&&c?r.push(u):u.draw(t,o))}for(d=0;d<r.length;++d)r[d].draw(t,o)}getStyle(t,n){const i=n?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(i):this.resolveDataElementOptions(t||0,i)}getContext(t,n,i){const s=this.getDataset();let o;if(t>=0&&t<this._cachedMeta.data.length){const r=this._cachedMeta.data[t];o=r.$context||(r.$context=s$(this.getContext(),t,r)),o.parsed=this.getParsed(t),o.raw=s.data[t],o.index=o.dataIndex=t}else o=this.$context||(this.$context=i$(this.chart.getContext(),this.index)),o.dataset=s,o.index=o.datasetIndex=this.index;return o.active=!!n,o.mode=i,o}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,n){return this._resolveElementOptions(this.dataElementType.id,n,t)}_resolveElementOptions(t,n="default",i){const s=n==="active",o=this._cachedDataOpts,r=t+"-"+n,a=o[r],l=this.enableOptionSharing&&go(i);if(a)return eu(a,l);const c=this.chart.config,d=c.datasetElementScopeKeys(this._type,t),u=s?[`${t}Hover`,"hover",t,""]:[t,""],h=c.getOptionScopes(this.getDataset(),d),g=Object.keys(me.elements[t]),v=()=>this.getContext(i,s,n),b=c.resolveNamedOptions(h,g,v,u);return b.$shared&&(b.$shared=l,o[r]=Object.freeze(eu(b,l))),b}_resolveAnimations(t,n,i){const s=this.chart,o=this._cachedDataOpts,r=`animation-${n}`,a=o[r];if(a)return a;let l;if(s.options.animation!==!1){const d=this.chart.config,u=d.datasetAnimationScopeKeys(this._type,n),h=d.getOptionScopes(this.getDataset(),u);l=d.createResolver(h,this.getContext(t,i,n))}const c=new dp(s,l&&l.animations);return l&&l._cacheable&&(o[r]=Object.freeze(c)),c}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,n){return!n||Or(t)||this.chart._animationsDisabled}_getSharedOptions(t,n){const i=this.resolveDataElementOptions(t,n),s=this._sharedOptions,o=this.getSharedOptions(i),r=this.includeOptions(n,o)||o!==s;return this.updateSharedOptions(o,n,i),{sharedOptions:o,includeOptions:r}}updateElement(t,n,i,s){Or(s)?Object.assign(t,i):this._resolveAnimations(n,s).update(t,i)}updateSharedOptions(t,n,i){t&&!Or(n)&&this._resolveAnimations(void 0,n).update(t,i)}_setStyle(t,n,i,s){t.active=s;const o=this.getStyle(n,s);this._resolveAnimations(n,i,s).update(t,{options:!s&&this.getSharedOptions(o)||o})}removeHoverStyle(t,n,i){this._setStyle(t,i,"active",!1)}setHoverStyle(t,n,i){this._setStyle(t,i,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const n=this._data,i=this._cachedMeta.data;for(const[a,l,c]of this._syncList)this[a](l,c);this._syncList=[];const s=i.length,o=n.length,r=Math.min(o,s);r&&this.parse(0,r),o>s?this._insertElements(s,o-s,t):o<s&&this._removeElements(o,s-o)}_insertElements(t,n,i=!0){const s=this._cachedMeta,o=s.data,r=t+n;let a;const l=c=>{for(c.length+=n,a=c.length-1;a>=r;a--)c[a]=c[a-n]};for(l(o),a=t;a<r;++a)o[a]=new this.dataElementType;this._parsing&&l(s._parsed),this.parse(t,n),i&&this.updateElements(o,t,n,"reset")}updateElements(t,n,i,s){}_removeElements(t,n){const i=this._cachedMeta;if(this._parsing){const s=i._parsed.splice(t,n);i._stacked&&pi(i,s)}i.data.splice(t,n)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[n,i,s]=t;this[n](i,s)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,n){n&&this._sync(["_removeElements",t,n]);const i=arguments.length-2;i&&this._sync(["_insertElements",t,i])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}H(Bi,"defaults",{}),H(Bi,"datasetElementType",null),H(Bi,"dataElementType",null);class Vs extends Bi{initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){const n=this._cachedMeta,{dataset:i,data:s=[],_dataset:o}=n,r=this.chart._animationsDisabled;let{start:a,count:l}=q1(n,s,r);this._drawStart=a,this._drawCount=l,j1(n)&&(a=0,l=s.length),i._chart=this.chart,i._datasetIndex=this.index,i._decimated=!!o._decimated,i.points=s;const c=this.resolveDatasetElementOptions(t);this.options.showLine||(c.borderWidth=0),c.segment=this.options.segment,this.updateElement(i,void 0,{animated:!r,options:c},t),this.updateElements(s,a,l,t)}updateElements(t,n,i,s){const o=s==="reset",{iScale:r,vScale:a,_stacked:l,_dataset:c}=this._cachedMeta,{sharedOptions:d,includeOptions:u}=this._getSharedOptions(n,s),h=r.axis,g=a.axis,{spanGaps:v,segment:b}=this.options,y=Qi(v)?v:Number.POSITIVE_INFINITY,S=this.chart._animationsDisabled||o||s==="none",E=n+i,L=t.length;let T=n>0&&this.getParsed(n-1);for(let C=0;C<L;++C){const M=t[C],m=S?M:{};if(C<n||C>=E){m.skip=!0;continue}const k=this.getParsed(C),R=ce(k[g]),D=m[h]=r.getPixelForValue(k[h],C),P=m[g]=o||R?a.getBasePixel():a.getPixelForValue(l?this.applyStack(a,k,l):k[g],C);m.skip=isNaN(D)||isNaN(P)||R,m.stop=C>0&&Math.abs(k[h]-T[h])>y,b&&(m.parsed=k,m.raw=c.data[C]),u&&(m.options=d||this.resolveDataElementOptions(C,M.active?"active":s)),S||this.updateElement(M,C,m,s),T=k}}getMaxOverflow(){const t=this._cachedMeta,n=t.dataset,i=n.options&&n.options.borderWidth||0,s=t.data||[];if(!s.length)return i;const o=s[0].size(this.resolveDataElementOptions(0)),r=s[s.length-1].size(this.resolveDataElementOptions(s.length-1));return Math.max(i,o,r)/2}draw(){const t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}}H(Vs,"id","line"),H(Vs,"defaults",{datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1}),H(Vs,"overrides",{scales:{_index_:{type:"category"},_value_:{type:"linear"}}});function nn(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class Rl{constructor(t){H(this,"options");this.options=t||{}}static override(t){Object.assign(Rl.prototype,t)}init(){}formats(){return nn()}parse(){return nn()}format(){return nn()}add(){return nn()}diff(){return nn()}startOf(){return nn()}endOf(){return nn()}}var r$={_date:Rl};function a$(e,t,n,i){const{controller:s,data:o,_sorted:r}=e,a=s._cachedMeta.iScale,l=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null;if(a&&t===a.axis&&t!=="r"&&r&&o.length){const c=a._reversePixels?F1:un;if(i){if(s._sharedOptions){const d=o[0],u=typeof d.getRange=="function"&&d.getRange(t);if(u){const h=c(o,t,n-u),g=c(o,t,n+u);return{lo:h.lo,hi:g.hi}}}}else{const d=c(o,t,n);if(l){const{vScale:u}=s._cachedMeta,{_parsed:h}=e,g=h.slice(0,d.lo+1).reverse().findIndex(b=>!ce(b[u.axis]));d.lo-=Math.max(0,g);const v=h.slice(d.hi).findIndex(b=>!ce(b[u.axis]));d.hi+=Math.max(0,v)}return d}}return{lo:0,hi:o.length-1}}function qo(e,t,n,i,s){const o=e.getSortedVisibleDatasetMetas(),r=n[t];for(let a=0,l=o.length;a<l;++a){const{index:c,data:d}=o[a],{lo:u,hi:h}=a$(o[a],t,r,s);for(let g=u;g<=h;++g){const v=d[g];v.skip||i(v,c,g)}}}function l$(e){const t=e.indexOf("x")!==-1,n=e.indexOf("y")!==-1;return function(i,s){const o=t?Math.abs(i.x-s.x):0,r=n?Math.abs(i.y-s.y):0;return Math.sqrt(Math.pow(o,2)+Math.pow(r,2))}}function Fr(e,t,n,i,s){const o=[];return!s&&!e.isPointInArea(t)||qo(e,n,t,function(a,l,c){!s&&!Yi(a,e.chartArea,0)||a.inRange(t.x,t.y,i)&&o.push({element:a,datasetIndex:l,index:c})},!0),o}function c$(e,t,n,i){let s=[];function o(r,a,l){const{startAngle:c,endAngle:d}=r.getProps(["startAngle","endAngle"],i),{angle:u}=D1(r,{x:t.x,y:t.y});jf(u,c,d)&&s.push({element:r,datasetIndex:a,index:l})}return qo(e,n,t,o),s}function d$(e,t,n,i,s,o){let r=[];const a=l$(n);let l=Number.POSITIVE_INFINITY;function c(d,u,h){const g=d.inRange(t.x,t.y,s);if(i&&!g)return;const v=d.getCenterPoint(s);if(!(!!o||e.isPointInArea(v))&&!g)return;const y=a(t,v);y<l?(r=[{element:d,datasetIndex:u,index:h}],l=y):y===l&&r.push({element:d,datasetIndex:u,index:h})}return qo(e,n,t,c),r}function Nr(e,t,n,i,s,o){return!o&&!e.isPointInArea(t)?[]:n==="r"&&!i?c$(e,t,n,s):d$(e,t,n,i,s,o)}function tu(e,t,n,i,s){const o=[],r=n==="x"?"inXRange":"inYRange";let a=!1;return qo(e,n,t,(l,c,d)=>{l[r]&&l[r](t[n],s)&&(o.push({element:l,datasetIndex:c,index:d}),a=a||l.inRange(t.x,t.y,s))}),i&&!a?[]:o}var u$={modes:{index(e,t,n,i){const s=on(t,e),o=n.axis||"x",r=n.includeInvisible||!1,a=n.intersect?Fr(e,s,o,i,r):Nr(e,s,o,!1,i,r),l=[];return a.length?(e.getSortedVisibleDatasetMetas().forEach(c=>{const d=a[0].index,u=c.data[d];u&&!u.skip&&l.push({element:u,datasetIndex:c.index,index:d})}),l):[]},dataset(e,t,n,i){const s=on(t,e),o=n.axis||"xy",r=n.includeInvisible||!1;let a=n.intersect?Fr(e,s,o,i,r):Nr(e,s,o,!1,i,r);if(a.length>0){const l=a[0].datasetIndex,c=e.getDatasetMeta(l).data;a=[];for(let d=0;d<c.length;++d)a.push({element:c[d],datasetIndex:l,index:d})}return a},point(e,t,n,i){const s=on(t,e),o=n.axis||"xy",r=n.includeInvisible||!1;return Fr(e,s,o,i,r)},nearest(e,t,n,i){const s=on(t,e),o=n.axis||"xy",r=n.includeInvisible||!1;return Nr(e,s,o,n.intersect,i,r)},x(e,t,n,i){const s=on(t,e);return tu(e,s,"x",n.intersect,i)},y(e,t,n,i){const s=on(t,e);return tu(e,s,"y",n.intersect,i)}}};const hp=["left","top","right","bottom"];function gi(e,t){return e.filter(n=>n.pos===t)}function nu(e,t){return e.filter(n=>hp.indexOf(n.pos)===-1&&n.box.axis===t)}function mi(e,t){return e.sort((n,i)=>{const s=t?i:n,o=t?n:i;return s.weight===o.weight?s.index-o.index:s.weight-o.weight})}function h$(e){const t=[];let n,i,s,o,r,a;for(n=0,i=(e||[]).length;n<i;++n)s=e[n],{position:o,options:{stack:r,stackWeight:a=1}}=s,t.push({index:n,box:s,pos:o,horizontal:s.isHorizontal(),weight:s.weight,stack:r&&o+r,stackWeight:a});return t}function f$(e){const t={};for(const n of e){const{stack:i,pos:s,stackWeight:o}=n;if(!i||!hp.includes(s))continue;const r=t[i]||(t[i]={count:0,placed:0,weight:0,size:0});r.count++,r.weight+=o}return t}function p$(e,t){const n=f$(e),{vBoxMaxWidth:i,hBoxMaxHeight:s}=t;let o,r,a;for(o=0,r=e.length;o<r;++o){a=e[o];const{fullSize:l}=a.box,c=n[a.stack],d=c&&a.stackWeight/c.weight;a.horizontal?(a.width=d?d*i:l&&t.availableWidth,a.height=s):(a.width=i,a.height=d?d*s:l&&t.availableHeight)}return n}function g$(e){const t=h$(e),n=mi(t.filter(c=>c.box.fullSize),!0),i=mi(gi(t,"left"),!0),s=mi(gi(t,"right")),o=mi(gi(t,"top"),!0),r=mi(gi(t,"bottom")),a=nu(t,"x"),l=nu(t,"y");return{fullSize:n,leftAndTop:i.concat(o),rightAndBottom:s.concat(l).concat(r).concat(a),chartArea:gi(t,"chartArea"),vertical:i.concat(s).concat(l),horizontal:o.concat(r).concat(a)}}function iu(e,t,n,i){return Math.max(e[n],t[n])+Math.max(e[i],t[i])}function fp(e,t){e.top=Math.max(e.top,t.top),e.left=Math.max(e.left,t.left),e.bottom=Math.max(e.bottom,t.bottom),e.right=Math.max(e.right,t.right)}function m$(e,t,n,i){const{pos:s,box:o}=n,r=e.maxPadding;if(!Z(s)){n.size&&(e[s]-=n.size);const u=i[n.stack]||{size:0,count:1};u.size=Math.max(u.size,n.horizontal?o.height:o.width),n.size=u.size/u.count,e[s]+=n.size}o.getPadding&&fp(r,o.getPadding());const a=Math.max(0,t.outerWidth-iu(r,e,"left","right")),l=Math.max(0,t.outerHeight-iu(r,e,"top","bottom")),c=a!==e.w,d=l!==e.h;return e.w=a,e.h=l,n.horizontal?{same:c,other:d}:{same:d,other:c}}function v$(e){const t=e.maxPadding;function n(i){const s=Math.max(t[i]-e[i],0);return e[i]+=s,s}e.y+=n("top"),e.x+=n("left"),n("right"),n("bottom")}function y$(e,t){const n=t.maxPadding;function i(s){const o={left:0,top:0,right:0,bottom:0};return s.forEach(r=>{o[r]=Math.max(t[r],n[r])}),o}return i(e?["left","right"]:["top","bottom"])}function ki(e,t,n,i){const s=[];let o,r,a,l,c,d;for(o=0,r=e.length,c=0;o<r;++o){a=e[o],l=a.box,l.update(a.width||t.w,a.height||t.h,y$(a.horizontal,t));const{same:u,other:h}=m$(t,n,a,i);c|=u&&s.length,d=d||h,l.fullSize||s.push(a)}return c&&ki(s,t,n,i)||d}function Ps(e,t,n,i,s){e.top=n,e.left=t,e.right=t+i,e.bottom=n+s,e.width=i,e.height=s}function su(e,t,n,i){const s=n.padding;let{x:o,y:r}=t;for(const a of e){const l=a.box,c=i[a.stack]||{placed:0,weight:1},d=a.stackWeight/c.weight||1;if(a.horizontal){const u=t.w*d,h=c.size||l.height;go(c.start)&&(r=c.start),l.fullSize?Ps(l,s.left,r,n.outerWidth-s.right-s.left,h):Ps(l,t.left+c.placed,r,u,h),c.start=r,c.placed+=u,r=l.bottom}else{const u=t.h*d,h=c.size||l.width;go(c.start)&&(o=c.start),l.fullSize?Ps(l,o,s.top,h,n.outerHeight-s.bottom-s.top):Ps(l,o,t.top+c.placed,h,u),c.start=o,c.placed+=u,o=l.right}}t.x=o,t.y=r}var It={addBox(e,t){e.boxes||(e.boxes=[]),t.fullSize=t.fullSize||!1,t.position=t.position||"top",t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(n){t.draw(n)}}]},e.boxes.push(t)},removeBox(e,t){const n=e.boxes?e.boxes.indexOf(t):-1;n!==-1&&e.boxes.splice(n,1)},configure(e,t,n){t.fullSize=n.fullSize,t.position=n.position,t.weight=n.weight},update(e,t,n,i){if(!e)return;const s=st(e.options.layout.padding),o=Math.max(t-s.width,0),r=Math.max(n-s.height,0),a=g$(e.boxes),l=a.vertical,c=a.horizontal;re(e.boxes,b=>{typeof b.beforeLayout=="function"&&b.beforeLayout()});const d=l.reduce((b,y)=>y.box.options&&y.box.options.display===!1?b:b+1,0)||1,u=Object.freeze({outerWidth:t,outerHeight:n,padding:s,availableWidth:o,availableHeight:r,vBoxMaxWidth:o/2/d,hBoxMaxHeight:r/2}),h=Object.assign({},s);fp(h,st(i));const g=Object.assign({maxPadding:h,w:o,h:r,x:s.left,y:s.top},s),v=p$(l.concat(c),u);ki(a.fullSize,g,u,v),ki(l,g,u,v),ki(c,g,u,v)&&ki(l,g,u,v),v$(g),su(a.leftAndTop,g,u,v),g.x+=g.w,g.y+=g.h,su(a.rightAndBottom,g,u,v),e.chartArea={left:g.left,top:g.top,right:g.left+g.w,bottom:g.top+g.h,height:g.h,width:g.w},re(a.chartArea,b=>{const y=b.box;Object.assign(y,e.chartArea),y.update(g.w,g.h,{left:0,top:0,right:0,bottom:0})})}};class pp{acquireContext(t,n){}releaseContext(t){return!1}addEventListener(t,n,i){}removeEventListener(t,n,i){}getDevicePixelRatio(){return 1}getMaximumSize(t,n,i,s){return n=Math.max(0,n||t.width),i=i||t.height,{width:n,height:Math.max(0,s?Math.floor(n/s):i)}}isAttached(t){return!0}updateConfig(t){}}class b$ extends pp{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const Gs="$chartjs",x$={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},ou=e=>e===null||e==="";function w$(e,t){const n=e.style,i=e.getAttribute("height"),s=e.getAttribute("width");if(e[Gs]={initial:{height:i,width:s,style:{display:n.display,height:n.height,width:n.width}}},n.display=n.display||"block",n.boxSizing=n.boxSizing||"border-box",ou(s)){const o=Kd(e,"width");o!==void 0&&(e.width=o)}if(ou(i))if(e.style.height==="")e.height=e.width/(t||2);else{const o=Kd(e,"height");o!==void 0&&(e.height=o)}return e}const gp=Dk?{passive:!0}:!1;function _$(e,t,n){e&&e.addEventListener(t,n,gp)}function k$(e,t,n){e&&e.canvas&&e.canvas.removeEventListener(t,n,gp)}function $$(e,t){const n=x$[e.type]||e.type,{x:i,y:s}=on(e,t);return{type:n,chart:t,native:e,x:i!==void 0?i:null,y:s!==void 0?s:null}}function bo(e,t){for(const n of e)if(n===t||n.contains(t))return!0}function S$(e,t,n){const i=e.canvas,s=new MutationObserver(o=>{let r=!1;for(const a of o)r=r||bo(a.addedNodes,i),r=r&&!bo(a.removedNodes,i);r&&n()});return s.observe(document,{childList:!0,subtree:!0}),s}function A$(e,t,n){const i=e.canvas,s=new MutationObserver(o=>{let r=!1;for(const a of o)r=r||bo(a.removedNodes,i),r=r&&!bo(a.addedNodes,i);r&&n()});return s.observe(document,{childList:!0,subtree:!0}),s}const Xi=new Map;let ru=0;function mp(){const e=window.devicePixelRatio;e!==ru&&(ru=e,Xi.forEach((t,n)=>{n.currentDevicePixelRatio!==e&&t()}))}function T$(e,t){Xi.size||window.addEventListener("resize",mp),Xi.set(e,t)}function C$(e){Xi.delete(e),Xi.size||window.removeEventListener("resize",mp)}function E$(e,t,n){const i=e.canvas,s=i&&El(i);if(!s)return;const o=Vf((a,l)=>{const c=s.clientWidth;n(a,l),c<s.clientWidth&&n()},window),r=new ResizeObserver(a=>{const l=a[0],c=l.contentRect.width,d=l.contentRect.height;c===0&&d===0||o(c,d)});return r.observe(s),T$(e,o),r}function Br(e,t,n){n&&n.disconnect(),t==="resize"&&C$(e)}function R$(e,t,n){const i=e.canvas,s=Vf(o=>{e.ctx!==null&&n($$(o,e))},e);return _$(i,t,s),s}class L$ extends pp{acquireContext(t,n){const i=t&&t.getContext&&t.getContext("2d");return i&&i.canvas===t?(w$(t,n),i):null}releaseContext(t){const n=t.canvas;if(!n[Gs])return!1;const i=n[Gs].initial;["height","width"].forEach(o=>{const r=i[o];ce(r)?n.removeAttribute(o):n.setAttribute(o,r)});const s=i.style||{};return Object.keys(s).forEach(o=>{n.style[o]=s[o]}),n.width=n.width,delete n[Gs],!0}addEventListener(t,n,i){this.removeEventListener(t,n);const s=t.$proxies||(t.$proxies={}),r={attach:S$,detach:A$,resize:E$}[n]||R$;s[n]=r(t,n,i)}removeEventListener(t,n){const i=t.$proxies||(t.$proxies={}),s=i[n];if(!s)return;({attach:Br,detach:Br,resize:Br}[n]||k$)(t,n,s),i[n]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,n,i,s){return Mk(t,n,i,s)}isAttached(t){const n=t&&El(t);return!!(n&&n.isConnected)}}function P$(e){return!Cl()||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas?b$:L$}class jt{constructor(){H(this,"x");H(this,"y");H(this,"active",!1);H(this,"options");H(this,"$animations")}tooltipPosition(t){const{x:n,y:i}=this.getProps(["x","y"],t);return{x:n,y:i}}hasValue(){return Qi(this.x)&&Qi(this.y)}getProps(t,n){const i=this.$animations;if(!n||!i)return this;const s={};return t.forEach(o=>{s[o]=i[o]&&i[o].active()?i[o]._to:this[o]}),s}}H(jt,"defaults",{}),H(jt,"defaultRoutes");function M$(e,t){const n=e.options.ticks,i=D$(e),s=Math.min(n.maxTicksLimit||i,i),o=n.major.enabled?O$(t):[],r=o.length,a=o[0],l=o[r-1],c=[];if(r>s)return F$(t,c,o,r/s),c;const d=I$(o,t,s);if(r>0){let u,h;const g=r>1?Math.round((l-a)/(r-1)):null;for(Ms(t,c,d,ce(g)?0:a-g,a),u=0,h=r-1;u<h;u++)Ms(t,c,d,o[u],o[u+1]);return Ms(t,c,d,l,ce(g)?t.length:l+g),c}return Ms(t,c,d),c}function D$(e){const t=e.options.offset,n=e._tickSize(),i=e._length/n+(t?0:1),s=e._maxLength/n;return Math.floor(Math.min(i,s))}function I$(e,t,n){const i=N$(e),s=t.length/n;if(!i)return Math.max(s,1);const o=E1(i);for(let r=0,a=o.length-1;r<a;r++){const l=o[r];if(l>s)return l}return Math.max(s,1)}function O$(e){const t=[];let n,i;for(n=0,i=e.length;n<i;n++)e[n].major&&t.push(n);return t}function F$(e,t,n,i){let s=0,o=n[0],r;for(i=Math.ceil(i),r=0;r<e.length;r++)r===o&&(t.push(e[r]),s++,o=n[s*i])}function Ms(e,t,n,i,s){const o=X(i,0),r=Math.min(X(s,e.length),e.length);let a=0,l,c,d;for(n=Math.ceil(n),s&&(l=s-i,n=l/Math.floor(l/n)),d=o;d<0;)a++,d=Math.round(o+a*n);for(c=Math.max(o,0);c<r;c++)c===d&&(t.push(e[c]),a++,d=Math.round(o+a*n))}function N$(e){const t=e.length;let n,i;if(t<2)return!1;for(i=e[0],n=1;n<t;++n)if(e[n]-e[n-1]!==i)return!1;return i}const B$=e=>e==="left"?"right":e==="right"?"left":e,au=(e,t,n)=>t==="top"||t==="left"?e[t]+n:e[t]-n,lu=(e,t)=>Math.min(t||e,e);function cu(e,t){const n=[],i=e.length/t,s=e.length;let o=0;for(;o<s;o+=i)n.push(e[Math.floor(o)]);return n}function z$(e,t,n){const i=e.ticks.length,s=Math.min(t,i-1),o=e._startPixel,r=e._endPixel,a=1e-6;let l=e.getPixelForTick(s),c;if(!(n&&(i===1?c=Math.max(l-o,r-l):t===0?c=(e.getPixelForTick(1)-l)/2:c=(l-e.getPixelForTick(s-1))/2,l+=s<t?c:-c,l<o-a||l>r+a)))return l}function H$(e,t){re(e,n=>{const i=n.gc,s=i.length/2;let o;if(s>t){for(o=0;o<s;++o)delete n.data[i[o]];i.splice(0,s)}})}function vi(e){return e.drawTicks?e.tickLength:0}function du(e,t){if(!e.display)return 0;const n=Ue(e.font,t),i=st(e.padding);return($e(e.text)?e.text.length:1)*n.lineHeight+i.height}function U$(e,t){return Rn(e,{scale:t,type:"scale"})}function q$(e,t,n){return Rn(e,{tick:n,index:t,type:"tick"})}function j$(e,t,n){let i=Gf(e);return(n&&t!=="right"||!n&&t==="right")&&(i=B$(i)),i}function K$(e,t,n,i){const{top:s,left:o,bottom:r,right:a,chart:l}=e,{chartArea:c,scales:d}=l;let u=0,h,g,v;const b=r-s,y=a-o;if(e.isHorizontal()){if(g=qe(i,o,a),Z(n)){const S=Object.keys(n)[0],E=n[S];v=d[S].getPixelForValue(E)+b-t}else n==="center"?v=(c.bottom+c.top)/2+b-t:v=au(e,n,t);h=a-o}else{if(Z(n)){const S=Object.keys(n)[0],E=n[S];g=d[S].getPixelForValue(E)-y+t}else n==="center"?g=(c.left+c.right)/2-y+t:g=au(e,n,t);v=qe(i,r,s),u=n==="left"?-tt:tt}return{titleX:g,titleY:v,maxWidth:h,rotation:u}}class ni extends jt{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,n){return t}getUserBounds(){let{_userMin:t,_userMax:n,_suggestedMin:i,_suggestedMax:s}=this;return t=lt(t,Number.POSITIVE_INFINITY),n=lt(n,Number.NEGATIVE_INFINITY),i=lt(i,Number.POSITIVE_INFINITY),s=lt(s,Number.NEGATIVE_INFINITY),{min:lt(t,i),max:lt(n,s),minDefined:Pe(t),maxDefined:Pe(n)}}getMinMax(t){let{min:n,max:i,minDefined:s,maxDefined:o}=this.getUserBounds(),r;if(s&&o)return{min:n,max:i};const a=this.getMatchingVisibleMetas();for(let l=0,c=a.length;l<c;++l)r=a[l].controller.getMinMax(this,t),s||(n=Math.min(n,r.min)),o||(i=Math.max(i,r.max));return n=o&&n>i?i:n,i=s&&n>i?n:i,{min:lt(n,lt(i,n)),max:lt(i,lt(n,i))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){ue(this.options.beforeUpdate,[this])}update(t,n,i){const{beginAtZero:s,grace:o,ticks:r}=this.options,a=r.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=n,this._margins=i=Object.assign({left:0,right:0,top:0,bottom:0},i),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+i.left+i.right:this.height+i.top+i.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=uk(this,o,s),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const l=a<this.ticks.length;this._convertTicksToLabels(l?cu(this.ticks,a):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),r.display&&(r.autoSkip||r.source==="auto")&&(this.ticks=M$(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),l&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t=this.options.reverse,n,i;this.isHorizontal()?(n=this.left,i=this.right):(n=this.top,i=this.bottom,t=!t),this._startPixel=n,this._endPixel=i,this._reversePixels=t,this._length=i-n,this._alignToPixels=this.options.alignToPixels}afterUpdate(){ue(this.options.afterUpdate,[this])}beforeSetDimensions(){ue(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){ue(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),ue(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){ue(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const n=this.options.ticks;let i,s,o;for(i=0,s=t.length;i<s;i++)o=t[i],o.label=ue(n.callback,[o.value,i,t],this)}afterTickToLabelConversion(){ue(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){ue(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,n=t.ticks,i=lu(this.ticks.length,t.ticks.maxTicksLimit),s=n.minRotation||0,o=n.maxRotation;let r=s,a,l,c;if(!this._isVisible()||!n.display||s>=o||i<=1||!this.isHorizontal()){this.labelRotation=s;return}const d=this._getLabelSizes(),u=d.widest.width,h=d.highest.height,g=We(this.chart.width-u,0,this.maxWidth);a=t.offset?this.maxWidth/i:g/(i-1),u+6>a&&(a=g/(i-(t.offset?.5:1)),l=this.maxHeight-vi(t.grid)-n.padding-du(t.title,this.chart.options.font),c=Math.sqrt(u*u+h*h),r=M1(Math.min(Math.asin(We((d.highest.height+6)/a,-1,1)),Math.asin(We(l/c,-1,1))-Math.asin(We(h/c,-1,1)))),r=Math.max(s,Math.min(o,r))),this.labelRotation=r}afterCalculateLabelRotation(){ue(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){ue(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:n,options:{ticks:i,title:s,grid:o}}=this,r=this._isVisible(),a=this.isHorizontal();if(r){const l=du(s,n.options.font);if(a?(t.width=this.maxWidth,t.height=vi(o)+l):(t.height=this.maxHeight,t.width=vi(o)+l),i.display&&this.ticks.length){const{first:c,last:d,widest:u,highest:h}=this._getLabelSizes(),g=i.padding*2,v=dn(this.labelRotation),b=Math.cos(v),y=Math.sin(v);if(a){const S=i.mirror?0:y*u.width+b*h.height;t.height=Math.min(this.maxHeight,t.height+S+g)}else{const S=i.mirror?0:b*u.width+y*h.height;t.width=Math.min(this.maxWidth,t.width+S+g)}this._calculatePadding(c,d,y,b)}}this._handleMargins(),a?(this.width=this._length=n.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=n.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,n,i,s){const{ticks:{align:o,padding:r},position:a}=this.options,l=this.labelRotation!==0,c=a!=="top"&&this.axis==="x";if(this.isHorizontal()){const d=this.getPixelForTick(0)-this.left,u=this.right-this.getPixelForTick(this.ticks.length-1);let h=0,g=0;l?c?(h=s*t.width,g=i*n.height):(h=i*t.height,g=s*n.width):o==="start"?g=n.width:o==="end"?h=t.width:o!=="inner"&&(h=t.width/2,g=n.width/2),this.paddingLeft=Math.max((h-d+r)*this.width/(this.width-d),0),this.paddingRight=Math.max((g-u+r)*this.width/(this.width-u),0)}else{let d=n.height/2,u=t.height/2;o==="start"?(d=0,u=t.height):o==="end"&&(d=n.height,u=0),this.paddingTop=d+r,this.paddingBottom=u+r}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){ue(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:n}=this.options;return n==="top"||n==="bottom"||t==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){this.beforeTickToLabelConversion(),this.generateTickLabels(t);let n,i;for(n=0,i=t.length;n<i;n++)ce(t[n].label)&&(t.splice(n,1),i--,n--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const n=this.options.ticks.sampleSize;let i=this.ticks;n<i.length&&(i=cu(i,n)),this._labelSizes=t=this._computeLabelSizes(i,i.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,n,i){const{ctx:s,_longestTextCache:o}=this,r=[],a=[],l=Math.floor(n/lu(n,i));let c=0,d=0,u,h,g,v,b,y,S,E,L,T,C;for(u=0;u<n;u+=l){if(v=t[u].label,b=this._resolveTickFontOptions(u),s.font=y=b.string,S=o[y]=o[y]||{data:{},gc:[]},E=b.lineHeight,L=T=0,!ce(v)&&!$e(v))L=zd(s,S.data,S.gc,L,v),T=E;else if($e(v))for(h=0,g=v.length;h<g;++h)C=v[h],!ce(C)&&!$e(C)&&(L=zd(s,S.data,S.gc,L,C),T+=E);r.push(L),a.push(T),c=Math.max(L,c),d=Math.max(T,d)}H$(o,n);const M=r.indexOf(c),m=a.indexOf(d),k=R=>({width:r[R]||0,height:a[R]||0});return{first:k(0),last:k(n-1),widest:k(M),highest:k(m),widths:r,heights:a}}getLabelForValue(t){return t}getPixelForValue(t,n){return NaN}getValueForPixel(t){}getPixelForTick(t){const n=this.ticks;return t<0||t>n.length-1?null:this.getPixelForValue(n[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const n=this._startPixel+t*this._length;return O1(this._alignToPixels?tn(this.chart,n,0):n)}getDecimalForPixel(t){const n=(t-this._startPixel)/this._length;return this._reversePixels?1-n:n}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:n}=this;return t<0&&n<0?n:t>0&&n>0?t:0}getContext(t){const n=this.ticks||[];if(t>=0&&t<n.length){const i=n[t];return i.$context||(i.$context=q$(this.getContext(),t,i))}return this.$context||(this.$context=U$(this.chart.getContext(),this))}_tickSize(){const t=this.options.ticks,n=dn(this.labelRotation),i=Math.abs(Math.cos(n)),s=Math.abs(Math.sin(n)),o=this._getLabelSizes(),r=t.autoSkipPadding||0,a=o?o.widest.width+r:0,l=o?o.highest.height+r:0;return this.isHorizontal()?l*i>a*s?a/i:l/s:l*s<a*i?l/i:a/s}_isVisible(){const t=this.options.display;return t!=="auto"?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const n=this.axis,i=this.chart,s=this.options,{grid:o,position:r,border:a}=s,l=o.offset,c=this.isHorizontal(),u=this.ticks.length+(l?1:0),h=vi(o),g=[],v=a.setContext(this.getContext()),b=v.display?v.width:0,y=b/2,S=function(V){return tn(i,V,b)};let E,L,T,C,M,m,k,R,D,P,F,N;if(r==="top")E=S(this.bottom),m=this.bottom-h,R=E-y,P=S(t.top)+y,N=t.bottom;else if(r==="bottom")E=S(this.top),P=t.top,N=S(t.bottom)-y,m=E+y,R=this.top+h;else if(r==="left")E=S(this.right),M=this.right-h,k=E-y,D=S(t.left)+y,F=t.right;else if(r==="right")E=S(this.left),D=t.left,F=S(t.right)-y,M=E+y,k=this.left+h;else if(n==="x"){if(r==="center")E=S((t.top+t.bottom)/2+.5);else if(Z(r)){const V=Object.keys(r)[0],le=r[V];E=S(this.chart.scales[V].getPixelForValue(le))}P=t.top,N=t.bottom,m=E+y,R=m+h}else if(n==="y"){if(r==="center")E=S((t.left+t.right)/2);else if(Z(r)){const V=Object.keys(r)[0],le=r[V];E=S(this.chart.scales[V].getPixelForValue(le))}M=E-y,k=M-h,D=t.left,F=t.right}const B=X(s.ticks.maxTicksLimit,u),I=Math.max(1,Math.ceil(u/B));for(L=0;L<u;L+=I){const V=this.getContext(L),le=o.setContext(V),z=a.setContext(V),J=le.lineWidth,ge=le.color,Q=z.dash||[],Se=z.dashOffset,se=le.tickWidth,Te=le.tickColor,te=le.tickBorderDash||[],xe=le.tickBorderDashOffset;T=z$(this,L,l),T!==void 0&&(C=tn(i,T,J),c?M=k=D=F=C:m=R=P=N=C,g.push({tx1:M,ty1:m,tx2:k,ty2:R,x1:D,y1:P,x2:F,y2:N,width:J,color:ge,borderDash:Q,borderDashOffset:Se,tickWidth:se,tickColor:Te,tickBorderDash:te,tickBorderDashOffset:xe}))}return this._ticksLength=u,this._borderValue=E,g}_computeLabelItems(t){const n=this.axis,i=this.options,{position:s,ticks:o}=i,r=this.isHorizontal(),a=this.ticks,{align:l,crossAlign:c,padding:d,mirror:u}=o,h=vi(i.grid),g=h+d,v=u?-d:g,b=-dn(this.labelRotation),y=[];let S,E,L,T,C,M,m,k,R,D,P,F,N="middle";if(s==="top")M=this.bottom-v,m=this._getXAxisLabelAlignment();else if(s==="bottom")M=this.top+v,m=this._getXAxisLabelAlignment();else if(s==="left"){const I=this._getYAxisLabelAlignment(h);m=I.textAlign,C=I.x}else if(s==="right"){const I=this._getYAxisLabelAlignment(h);m=I.textAlign,C=I.x}else if(n==="x"){if(s==="center")M=(t.top+t.bottom)/2+g;else if(Z(s)){const I=Object.keys(s)[0],V=s[I];M=this.chart.scales[I].getPixelForValue(V)+g}m=this._getXAxisLabelAlignment()}else if(n==="y"){if(s==="center")C=(t.left+t.right)/2-g;else if(Z(s)){const I=Object.keys(s)[0],V=s[I];C=this.chart.scales[I].getPixelForValue(V)}m=this._getYAxisLabelAlignment(h).textAlign}n==="y"&&(l==="start"?N="top":l==="end"&&(N="bottom"));const B=this._getLabelSizes();for(S=0,E=a.length;S<E;++S){L=a[S],T=L.label;const I=o.setContext(this.getContext(S));k=this.getPixelForTick(S)+o.labelOffset,R=this._resolveTickFontOptions(S),D=R.lineHeight,P=$e(T)?T.length:1;const V=P/2,le=I.color,z=I.textStrokeColor,J=I.textStrokeWidth;let ge=m;r?(C=k,m==="inner"&&(S===E-1?ge=this.options.reverse?"left":"right":S===0?ge=this.options.reverse?"right":"left":ge="center"),s==="top"?c==="near"||b!==0?F=-P*D+D/2:c==="center"?F=-B.highest.height/2-V*D+D:F=-B.highest.height+D/2:c==="near"||b!==0?F=D/2:c==="center"?F=B.highest.height/2-V*D:F=B.highest.height-P*D,u&&(F*=-1),b!==0&&!I.showLabelBackdrop&&(C+=D/2*Math.sin(b))):(M=k,F=(1-P)*D/2);let Q;if(I.showLabelBackdrop){const Se=st(I.backdropPadding),se=B.heights[S],Te=B.widths[S];let te=F-Se.top,xe=0-Se.left;switch(N){case"middle":te-=se/2;break;case"bottom":te-=se;break}switch(m){case"center":xe-=Te/2;break;case"right":xe-=Te;break;case"inner":S===E-1?xe-=Te:S>0&&(xe-=Te/2);break}Q={left:xe,top:te,width:Te+Se.width,height:se+Se.height,color:I.backdropColor}}y.push({label:T,font:R,textOffset:F,options:{rotation:b,color:le,strokeColor:z,strokeWidth:J,textAlign:ge,textBaseline:N,translation:[C,M],backdrop:Q}})}return y}_getXAxisLabelAlignment(){const{position:t,ticks:n}=this.options;if(-dn(this.labelRotation))return t==="top"?"left":"right";let s="center";return n.align==="start"?s="left":n.align==="end"?s="right":n.align==="inner"&&(s="inner"),s}_getYAxisLabelAlignment(t){const{position:n,ticks:{crossAlign:i,mirror:s,padding:o}}=this.options,r=this._getLabelSizes(),a=t+o,l=r.widest.width;let c,d;return n==="left"?s?(d=this.right+o,i==="near"?c="left":i==="center"?(c="center",d+=l/2):(c="right",d+=l)):(d=this.right-a,i==="near"?c="right":i==="center"?(c="center",d-=l/2):(c="left",d=this.left)):n==="right"?s?(d=this.left+o,i==="near"?c="right":i==="center"?(c="center",d-=l/2):(c="left",d-=l)):(d=this.left+a,i==="near"?c="left":i==="center"?(c="center",d+=l/2):(c="right",d=this.right)):c="right",{textAlign:c,x:d}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,n=this.options.position;if(n==="left"||n==="right")return{top:0,left:this.left,bottom:t.height,right:this.right};if(n==="top"||n==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:t.width}}drawBackground(){const{ctx:t,options:{backgroundColor:n},left:i,top:s,width:o,height:r}=this;n&&(t.save(),t.fillStyle=n,t.fillRect(i,s,o,r),t.restore())}getLineWidthForValue(t){const n=this.options.grid;if(!this._isVisible()||!n.display)return 0;const s=this.ticks.findIndex(o=>o.value===t);return s>=0?n.setContext(this.getContext(s)).lineWidth:0}drawGrid(t){const n=this.options.grid,i=this.ctx,s=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let o,r;const a=(l,c,d)=>{!d.width||!d.color||(i.save(),i.lineWidth=d.width,i.strokeStyle=d.color,i.setLineDash(d.borderDash||[]),i.lineDashOffset=d.borderDashOffset,i.beginPath(),i.moveTo(l.x,l.y),i.lineTo(c.x,c.y),i.stroke(),i.restore())};if(n.display)for(o=0,r=s.length;o<r;++o){const l=s[o];n.drawOnChartArea&&a({x:l.x1,y:l.y1},{x:l.x2,y:l.y2},l),n.drawTicks&&a({x:l.tx1,y:l.ty1},{x:l.tx2,y:l.ty2},{color:l.tickColor,width:l.tickWidth,borderDash:l.tickBorderDash,borderDashOffset:l.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:n,options:{border:i,grid:s}}=this,o=i.setContext(this.getContext()),r=i.display?o.width:0;if(!r)return;const a=s.setContext(this.getContext(0)).lineWidth,l=this._borderValue;let c,d,u,h;this.isHorizontal()?(c=tn(t,this.left,r)-r/2,d=tn(t,this.right,a)+a/2,u=h=l):(u=tn(t,this.top,r)-r/2,h=tn(t,this.bottom,a)+a/2,c=d=l),n.save(),n.lineWidth=o.width,n.strokeStyle=o.color,n.beginPath(),n.moveTo(c,u),n.lineTo(d,h),n.stroke(),n.restore()}drawLabels(t){if(!this.options.ticks.display)return;const i=this.ctx,s=this._computeLabelArea();s&&zo(i,s);const o=this.getLabelItems(t);for(const r of o){const a=r.options,l=r.font,c=r.label,d=r.textOffset;vo(i,c,0,d,l,a)}s&&Ho(i)}drawTitle(){const{ctx:t,options:{position:n,title:i,reverse:s}}=this;if(!i.display)return;const o=Ue(i.font),r=st(i.padding),a=i.align;let l=o.lineHeight/2;n==="bottom"||n==="center"||Z(n)?(l+=r.bottom,$e(i.text)&&(l+=o.lineHeight*(i.text.length-1))):l+=r.top;const{titleX:c,titleY:d,maxWidth:u,rotation:h}=K$(this,l,n,a);vo(t,i.text,0,0,o,{color:i.color,maxWidth:u,rotation:h,textAlign:j$(a,n,s),textBaseline:"middle",translation:[c,d]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,n=t.ticks&&t.ticks.z||0,i=X(t.grid&&t.grid.z,-1),s=X(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==ni.prototype.draw?[{z:n,draw:o=>{this.draw(o)}}]:[{z:i,draw:o=>{this.drawBackground(),this.drawGrid(o),this.drawTitle()}},{z:s,draw:()=>{this.drawBorder()}},{z:n,draw:o=>{this.drawLabels(o)}}]}getMatchingVisibleMetas(t){const n=this.chart.getSortedVisibleDatasetMetas(),i=this.axis+"AxisID",s=[];let o,r;for(o=0,r=n.length;o<r;++o){const a=n[o];a[i]===this.id&&(!t||a.type===t)&&s.push(a)}return s}_resolveTickFontOptions(t){const n=this.options.ticks.setContext(this.getContext(t));return Ue(n.font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class Ds{constructor(t,n,i){this.type=t,this.scope=n,this.override=i,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const n=Object.getPrototypeOf(t);let i;G$(n)&&(i=this.register(n));const s=this.items,o=t.id,r=this.scope+"."+o;if(!o)throw new Error("class does not have id: "+t);return o in s||(s[o]=t,W$(t,r,i),this.override&&me.override(t.id,t.overrides)),r}get(t){return this.items[t]}unregister(t){const n=this.items,i=t.id,s=this.scope;i in n&&delete n[i],s&&i in me[s]&&(delete me[s][i],this.override&&delete An[i])}}function W$(e,t,n){const i=Gi(Object.create(null),[n?me.get(n):{},me.get(t),e.defaults]);me.set(t,i),e.defaultRoutes&&V$(t,e.defaultRoutes),e.descriptors&&me.describe(t,e.descriptors)}function V$(e,t){Object.keys(t).forEach(n=>{const i=n.split("."),s=i.pop(),o=[e].concat(i).join("."),r=t[n].split("."),a=r.pop(),l=r.join(".");me.route(o,s,l,a)})}function G$(e){return"id"in e&&"defaults"in e}class Q${constructor(){this.controllers=new Ds(Bi,"datasets",!0),this.elements=new Ds(jt,"elements"),this.plugins=new Ds(Object,"plugins"),this.scales=new Ds(ni,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,n,i){[...n].forEach(s=>{const o=i||this._getRegistryForType(s);i||o.isForType(s)||o===this.plugins&&s.id?this._exec(t,o,s):re(s,r=>{const a=i||this._getRegistryForType(r);this._exec(t,a,r)})})}_exec(t,n,i){const s=_l(t);ue(i["before"+s],[],i),n[t](i),ue(i["after"+s],[],i)}_getRegistryForType(t){for(let n=0;n<this._typedRegistries.length;n++){const i=this._typedRegistries[n];if(i.isForType(t))return i}return this.plugins}_get(t,n,i){const s=n.get(t);if(s===void 0)throw new Error('"'+t+'" is not a registered '+i+".");return s}}var ht=new Q$;class Y${constructor(){this._init=void 0}notify(t,n,i,s){if(n==="beforeInit"&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install")),this._init===void 0)return;const o=s?this._descriptors(t).filter(s):this._descriptors(t),r=this._notify(o,t,n,i);return n==="afterDestroy"&&(this._notify(o,t,"stop"),this._notify(this._init,t,"uninstall"),this._init=void 0),r}_notify(t,n,i,s){s=s||{};for(const o of t){const r=o.plugin,a=r[i],l=[n,s,o.options];if(ue(a,l,r)===!1&&s.cancelable)return!1}return!0}invalidate(){ce(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const n=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),n}_createDescriptors(t,n){const i=t&&t.config,s=X(i.options&&i.options.plugins,{}),o=X$(i);return s===!1&&!n?[]:Z$(t,o,s,n)}_notifyStateChanges(t){const n=this._oldCache||[],i=this._cache,s=(o,r)=>o.filter(a=>!r.some(l=>a.plugin.id===l.plugin.id));this._notify(s(n,i),t,"stop"),this._notify(s(i,n),t,"start")}}function X$(e){const t={},n=[],i=Object.keys(ht.plugins.items);for(let o=0;o<i.length;o++)n.push(ht.getPlugin(i[o]));const s=e.plugins||[];for(let o=0;o<s.length;o++){const r=s[o];n.indexOf(r)===-1&&(n.push(r),t[r.id]=!0)}return{plugins:n,localIds:t}}function J$(e,t){return!t&&e===!1?null:e===!0?{}:e}function Z$(e,{plugins:t,localIds:n},i,s){const o=[],r=e.getContext();for(const a of t){const l=a.id,c=J$(i[l],s);c!==null&&o.push({plugin:a,options:eS(e.config,{plugin:a,local:n[l]},c,r)})}return o}function eS(e,{plugin:t,local:n},i,s){const o=e.pluginScopeKeys(t),r=e.getOptionScopes(i,o);return n&&t.defaults&&r.push(t.defaults),e.createResolver(r,s,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function xa(e,t){const n=me.datasets[e]||{};return((t.datasets||{})[e]||{}).indexAxis||t.indexAxis||n.indexAxis||"x"}function tS(e,t){let n=e;return e==="_index_"?n=t:e==="_value_"&&(n=t==="x"?"y":"x"),n}function nS(e,t){return e===t?"_index_":"_value_"}function uu(e){if(e==="x"||e==="y"||e==="r")return e}function iS(e){if(e==="top"||e==="bottom")return"x";if(e==="left"||e==="right")return"y"}function wa(e,...t){if(uu(e))return e;for(const n of t){const i=n.axis||iS(n.position)||e.length>1&&uu(e[0].toLowerCase());if(i)return i}throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`)}function hu(e,t,n){if(n[t+"AxisID"]===e)return{axis:t}}function sS(e,t){if(t.data&&t.data.datasets){const n=t.data.datasets.filter(i=>i.xAxisID===e||i.yAxisID===e);if(n.length)return hu(e,"x",n[0])||hu(e,"y",n[0])}return{}}function oS(e,t){const n=An[e.type]||{scales:{}},i=t.scales||{},s=xa(e.type,t),o=Object.create(null);return Object.keys(i).forEach(r=>{const a=i[r];if(!Z(a))return console.error(`Invalid scale configuration for scale: ${r}`);if(a._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${r}`);const l=wa(r,a,sS(r,e),me.scales[a.type]),c=nS(l,s),d=n.scales||{};o[r]=Di(Object.create(null),[{axis:l},a,d[l],d[c]])}),e.data.datasets.forEach(r=>{const a=r.type||e.type,l=r.indexAxis||xa(a,t),d=(An[a]||{}).scales||{};Object.keys(d).forEach(u=>{const h=tS(u,l),g=r[h+"AxisID"]||h;o[g]=o[g]||Object.create(null),Di(o[g],[{axis:h},i[g],d[u]])})}),Object.keys(o).forEach(r=>{const a=o[r];Di(a,[me.scales[a.type],me.scale])}),o}function vp(e){const t=e.options||(e.options={});t.plugins=X(t.plugins,{}),t.scales=oS(e,t)}function yp(e){return e=e||{},e.datasets=e.datasets||[],e.labels=e.labels||[],e}function rS(e){return e=e||{},e.data=yp(e.data),vp(e),e}const fu=new Map,bp=new Set;function Is(e,t){let n=fu.get(e);return n||(n=t(),fu.set(e,n),bp.add(n)),n}const yi=(e,t,n)=>{const i=po(t,n);i!==void 0&&e.add(i)};class aS{constructor(t){this._config=rS(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=yp(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),vp(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return Is(t,()=>[[`datasets.${t}`,""]])}datasetAnimationScopeKeys(t,n){return Is(`${t}.transition.${n}`,()=>[[`datasets.${t}.transitions.${n}`,`transitions.${n}`],[`datasets.${t}`,""]])}datasetElementScopeKeys(t,n){return Is(`${t}-${n}`,()=>[[`datasets.${t}.elements.${n}`,`datasets.${t}`,`elements.${n}`,""]])}pluginScopeKeys(t){const n=t.id,i=this.type;return Is(`${i}-plugin-${n}`,()=>[[`plugins.${n}`,...t.additionalOptionScopes||[]]])}_cachedScopes(t,n){const i=this._scopeCache;let s=i.get(t);return(!s||n)&&(s=new Map,i.set(t,s)),s}getOptionScopes(t,n,i){const{options:s,type:o}=this,r=this._cachedScopes(t,i),a=r.get(n);if(a)return a;const l=new Set;n.forEach(d=>{t&&(l.add(t),d.forEach(u=>yi(l,t,u))),d.forEach(u=>yi(l,s,u)),d.forEach(u=>yi(l,An[o]||{},u)),d.forEach(u=>yi(l,me,u)),d.forEach(u=>yi(l,va,u))});const c=Array.from(l);return c.length===0&&c.push(Object.create(null)),bp.has(n)&&r.set(n,c),c}chartOptionScopes(){const{options:t,type:n}=this;return[t,An[n]||{},me.datasets[n]||{},{type:n},me,va]}resolveNamedOptions(t,n,i,s=[""]){const o={$shared:!0},{resolver:r,subPrefixes:a}=pu(this._resolverCache,t,s);let l=r;if(cS(r,n)){o.$shared=!1,i=qt(i)?i():i;const c=this.createResolver(t,i,a);l=Jn(r,i,c)}for(const c of n)o[c]=l[c];return o}createResolver(t,n,i=[""],s){const{resolver:o}=pu(this._resolverCache,t,i);return Z(n)?Jn(o,n,void 0,s):o}}function pu(e,t,n){let i=e.get(t);i||(i=new Map,e.set(t,i));const s=n.join();let o=i.get(s);return o||(o={resolver:Sl(t,n),subPrefixes:n.filter(a=>!a.toLowerCase().includes("hover"))},i.set(s,o)),o}const lS=e=>Z(e)&&Object.getOwnPropertyNames(e).some(t=>qt(e[t]));function cS(e,t){const{isScriptable:n,isIndexable:i}=Zf(e);for(const s of t){const o=n(s),r=i(s),a=(r||o)&&e[s];if(o&&(qt(a)||lS(a))||r&&$e(a))return!0}return!1}var dS="4.5.1";const uS=["top","bottom","left","right","chartArea"];function gu(e,t){return e==="top"||e==="bottom"||uS.indexOf(e)===-1&&t==="x"}function mu(e,t){return function(n,i){return n[e]===i[e]?n[t]-i[t]:n[e]-i[e]}}function vu(e){const t=e.chart,n=t.options.animation;t.notifyPlugins("afterRender"),ue(n&&n.onComplete,[e],t)}function hS(e){const t=e.chart,n=t.options.animation;ue(n&&n.onProgress,[e],t)}function xp(e){return Cl()&&typeof e=="string"?e=document.getElementById(e):e&&e.length&&(e=e[0]),e&&e.canvas&&(e=e.canvas),e}const Qs={},yu=e=>{const t=xp(e);return Object.values(Qs).filter(n=>n.canvas===t).pop()};function fS(e,t,n){const i=Object.keys(e);for(const s of i){const o=+s;if(o>=t){const r=e[s];delete e[s],(n>0||o>t)&&(e[o+n]=r)}}}function pS(e,t,n,i){return!n||e.type==="mouseout"?null:i?t:e}class mt{static register(...t){ht.add(...t),bu()}static unregister(...t){ht.remove(...t),bu()}constructor(t,n){const i=this.config=new aS(n),s=xp(t),o=yu(s);if(o)throw new Error("Canvas is already in use. Chart with ID '"+o.id+"' must be destroyed before the canvas with ID '"+o.canvas.id+"' can be reused.");const r=i.createResolver(i.chartOptionScopes(),this.getContext());this.platform=new(i.platform||P$(s)),this.platform.updateConfig(i);const a=this.platform.acquireContext(s,r.aspectRatio),l=a&&a.canvas,c=l&&l.height,d=l&&l.width;if(this.id=x1(),this.ctx=a,this.canvas=l,this.width=d,this.height=c,this._options=r,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new Y$,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=H1(u=>this.update(u),r.resizeDelay||0),this._dataChanges=[],Qs[this.id]=this,!a||!l){console.error("Failed to create chart: can't acquire context from the given item");return}St.listen(this,"complete",vu),St.listen(this,"progress",hS),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:t,maintainAspectRatio:n},width:i,height:s,_aspectRatio:o}=this;return ce(t)?n&&o?o:s?i/s:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return ht}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():jd(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return Hd(this.canvas,this.ctx),this}stop(){return St.stop(this),this}resize(t,n){St.running(this)?this._resizeBeforeDraw={width:t,height:n}:this._resize(t,n)}_resize(t,n){const i=this.options,s=this.canvas,o=i.maintainAspectRatio&&this.aspectRatio,r=this.platform.getMaximumSize(s,t,n,o),a=i.devicePixelRatio||this.platform.getDevicePixelRatio(),l=this.width?"resize":"attach";this.width=r.width,this.height=r.height,this._aspectRatio=this.aspectRatio,jd(this,a,!0)&&(this.notifyPlugins("resize",{size:r}),ue(i.onResize,[this,r],this),this.attached&&this._doResize(l)&&this.render())}ensureScalesHaveIDs(){const n=this.options.scales||{};re(n,(i,s)=>{i.id=s})}buildOrUpdateScales(){const t=this.options,n=t.scales,i=this.scales,s=Object.keys(i).reduce((r,a)=>(r[a]=!1,r),{});let o=[];n&&(o=o.concat(Object.keys(n).map(r=>{const a=n[r],l=wa(r,a),c=l==="r",d=l==="x";return{options:a,dposition:c?"chartArea":d?"bottom":"left",dtype:c?"radialLinear":d?"category":"linear"}}))),re(o,r=>{const a=r.options,l=a.id,c=wa(l,a),d=X(a.type,r.dtype);(a.position===void 0||gu(a.position,c)!==gu(r.dposition))&&(a.position=r.dposition),s[l]=!0;let u=null;if(l in i&&i[l].type===d)u=i[l];else{const h=ht.getScale(d);u=new h({id:l,type:d,ctx:this.ctx,chart:this}),i[u.id]=u}u.init(a,t)}),re(s,(r,a)=>{r||delete i[a]}),re(i,r=>{It.configure(this,r,r.options),It.addBox(this,r)})}_updateMetasets(){const t=this._metasets,n=this.data.datasets.length,i=t.length;if(t.sort((s,o)=>s.index-o.index),i>n){for(let s=n;s<i;++s)this._destroyDatasetMeta(s);t.splice(n,i-n)}this._sortedMetasets=t.slice(0).sort(mu("order","index"))}_removeUnreferencedMetasets(){const{_metasets:t,data:{datasets:n}}=this;t.length>n.length&&delete this._stacks,t.forEach((i,s)=>{n.filter(o=>o===i._dataset).length===0&&this._destroyDatasetMeta(s)})}buildOrUpdateControllers(){const t=[],n=this.data.datasets;let i,s;for(this._removeUnreferencedMetasets(),i=0,s=n.length;i<s;i++){const o=n[i];let r=this.getDatasetMeta(i);const a=o.type||this.config.type;if(r.type&&r.type!==a&&(this._destroyDatasetMeta(i),r=this.getDatasetMeta(i)),r.type=a,r.indexAxis=o.indexAxis||xa(a,this.options),r.order=o.order||0,r.index=i,r.label=""+o.label,r.visible=this.isDatasetVisible(i),r.controller)r.controller.updateIndex(i),r.controller.linkScales();else{const l=ht.getController(a),{datasetElementType:c,dataElementType:d}=me.datasets[a];Object.assign(l,{dataElementType:ht.getElement(d),datasetElementType:c&&ht.getElement(c)}),r.controller=new l(this,i),t.push(r.controller)}}return this._updateMetasets(),t}_resetElements(){re(this.data.datasets,(t,n)=>{this.getDatasetMeta(n).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){const n=this.config;n.update();const i=this._options=n.createResolver(n.chartOptionScopes(),this.getContext()),s=this._animationsDisabled=!i.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0})===!1)return;const o=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let r=0;for(let c=0,d=this.data.datasets.length;c<d;c++){const{controller:u}=this.getDatasetMeta(c),h=!s&&o.indexOf(u)===-1;u.buildOrUpdateElements(h),r=Math.max(+u.getMaxOverflow(),r)}r=this._minPadding=i.layout.autoPadding?r:0,this._updateLayout(r),s||re(o,c=>{c.reset()}),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(mu("z","_idx"));const{_active:a,_lastEvent:l}=this;l?this._eventHandler(l,!0):a.length&&this._updateHoverStyles(a,a,!0),this.render()}_updateScales(){re(this.scales,t=>{It.removeBox(this,t)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const t=this.options,n=new Set(Object.keys(this._listeners)),i=new Set(t.events);(!Ld(n,i)||!!this._responsiveListeners!==t.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:t}=this,n=this._getUniformDataChanges()||[];for(const{method:i,start:s,count:o}of n){const r=i==="_removeElements"?-o:o;fS(t,s,r)}}_getUniformDataChanges(){const t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];const n=this.data.datasets.length,i=o=>new Set(t.filter(r=>r[0]===o).map((r,a)=>a+","+r.splice(1).join(","))),s=i(0);for(let o=1;o<n;o++)if(!Ld(s,i(o)))return;return Array.from(s).map(o=>o.split(",")).map(o=>({method:o[1],start:+o[2],count:+o[3]}))}_updateLayout(t){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;It.update(this,this.width,this.height,t);const n=this.chartArea,i=n.width<=0||n.height<=0;this._layers=[],re(this.boxes,s=>{i&&s.position==="chartArea"||(s.configure&&s.configure(),this._layers.push(...s._layers()))},this),this._layers.forEach((s,o)=>{s._idx=o}),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})!==!1){for(let n=0,i=this.data.datasets.length;n<i;++n)this.getDatasetMeta(n).controller.configure();for(let n=0,i=this.data.datasets.length;n<i;++n)this._updateDataset(n,qt(t)?t({datasetIndex:n}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,n){const i=this.getDatasetMeta(t),s={meta:i,index:t,mode:n,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",s)!==!1&&(i.controller._update(n),s.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",s))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(St.has(this)?this.attached&&!St.running(this)&&St.start(this):(this.draw(),vu({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){const{width:i,height:s}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(i,s)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const n=this._layers;for(t=0;t<n.length&&n[t].z<=0;++t)n[t].draw(this.chartArea);for(this._drawDatasets();t<n.length;++t)n[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){const n=this._sortedMetasets,i=[];let s,o;for(s=0,o=n.length;s<o;++s){const r=n[s];(!t||r.visible)&&i.push(r)}return i}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const t=this.getSortedVisibleDatasetMetas();for(let n=t.length-1;n>=0;--n)this._drawDataset(t[n]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){const n=this.ctx,i={meta:t,index:t.index,cancelable:!0},s=cp(this,t);this.notifyPlugins("beforeDatasetDraw",i)!==!1&&(s&&zo(n,s),t.controller.draw(),s&&Ho(n),i.cancelable=!1,this.notifyPlugins("afterDatasetDraw",i))}isPointInArea(t){return Yi(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,n,i,s){const o=u$.modes[n];return typeof o=="function"?o(this,t,i,s):[]}getDatasetMeta(t){const n=this.data.datasets[t],i=this._metasets;let s=i.filter(o=>o&&o._dataset===n).pop();return s||(s={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:n&&n.order||0,index:t,_dataset:n,_parsed:[],_sorted:!1},i.push(s)),s}getContext(){return this.$context||(this.$context=Rn(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){const n=this.data.datasets[t];if(!n)return!1;const i=this.getDatasetMeta(t);return typeof i.hidden=="boolean"?!i.hidden:!n.hidden}setDatasetVisibility(t,n){const i=this.getDatasetMeta(t);i.hidden=!n}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,n,i){const s=i?"show":"hide",o=this.getDatasetMeta(t),r=o.controller._resolveAnimations(void 0,s);go(n)?(o.data[n].hidden=!i,this.update()):(this.setDatasetVisibility(t,i),r.update(o,{visible:i}),this.update(a=>a.datasetIndex===t?s:void 0))}hide(t,n){this._updateVisibility(t,n,!1)}show(t,n){this._updateVisibility(t,n,!0)}_destroyDatasetMeta(t){const n=this._metasets[t];n&&n.controller&&n.controller._destroy(),delete this._metasets[t]}_stop(){let t,n;for(this.stop(),St.remove(this),t=0,n=this.data.datasets.length;t<n;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:t,ctx:n}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),Hd(t,n),this.platform.releaseContext(n),this.canvas=null,this.ctx=null),delete Qs[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const t=this._listeners,n=this.platform,i=(o,r)=>{n.addEventListener(this,o,r),t[o]=r},s=(o,r,a)=>{o.offsetX=r,o.offsetY=a,this._eventHandler(o)};re(this.options.events,o=>i(o,s))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const t=this._responsiveListeners,n=this.platform,i=(l,c)=>{n.addEventListener(this,l,c),t[l]=c},s=(l,c)=>{t[l]&&(n.removeEventListener(this,l,c),delete t[l])},o=(l,c)=>{this.canvas&&this.resize(l,c)};let r;const a=()=>{s("attach",a),this.attached=!0,this.resize(),i("resize",o),i("detach",r)};r=()=>{this.attached=!1,s("resize",o),this._stop(),this._resize(0,0),i("attach",a)},n.isAttached(this.canvas)?a():r()}unbindEvents(){re(this._listeners,(t,n)=>{this.platform.removeEventListener(this,n,t)}),this._listeners={},re(this._responsiveListeners,(t,n)=>{this.platform.removeEventListener(this,n,t)}),this._responsiveListeners=void 0}updateHoverStyle(t,n,i){const s=i?"set":"remove";let o,r,a,l;for(n==="dataset"&&(o=this.getDatasetMeta(t[0].datasetIndex),o.controller["_"+s+"DatasetHoverStyle"]()),a=0,l=t.length;a<l;++a){r=t[a];const c=r&&this.getDatasetMeta(r.datasetIndex).controller;c&&c[s+"HoverStyle"](r.element,r.datasetIndex,r.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){const n=this._active||[],i=t.map(({datasetIndex:o,index:r})=>{const a=this.getDatasetMeta(o);if(!a)throw new Error("No dataset found at index "+o);return{datasetIndex:o,element:a.data[r],index:r}});!ho(i,n)&&(this._active=i,this._lastEvent=null,this._updateHoverStyles(i,n))}notifyPlugins(t,n,i){return this._plugins.notify(this,t,n,i)}isPluginEnabled(t){return this._plugins._cache.filter(n=>n.plugin.id===t).length===1}_updateHoverStyles(t,n,i){const s=this.options.hover,o=(l,c)=>l.filter(d=>!c.some(u=>d.datasetIndex===u.datasetIndex&&d.index===u.index)),r=o(n,t),a=i?t:o(t,n);r.length&&this.updateHoverStyle(r,s.mode,!1),a.length&&s.mode&&this.updateHoverStyle(a,s.mode,!0)}_eventHandler(t,n){const i={event:t,replay:n,cancelable:!0,inChartArea:this.isPointInArea(t)},s=r=>(r.options.events||this.options.events).includes(t.native.type);if(this.notifyPlugins("beforeEvent",i,s)===!1)return;const o=this._handleEvent(t,n,i.inChartArea);return i.cancelable=!1,this.notifyPlugins("afterEvent",i,s),(o||i.changed)&&this.render(),this}_handleEvent(t,n,i){const{_active:s=[],options:o}=this,r=n,a=this._getActiveElements(t,s,i,r),l=A1(t),c=pS(t,this._lastEvent,i,l);i&&(this._lastEvent=null,ue(o.onHover,[t,a,this],this),l&&ue(o.onClick,[t,a,this],this));const d=!ho(a,s);return(d||n)&&(this._active=a,this._updateHoverStyles(a,s,n)),this._lastEvent=c,d}_getActiveElements(t,n,i,s){if(t.type==="mouseout")return[];if(!i)return n;const o=this.options.hover;return this.getElementsAtEventForMode(t,o.mode,o,s)}}H(mt,"defaults",me),H(mt,"instances",Qs),H(mt,"overrides",An),H(mt,"registry",ht),H(mt,"version",dS),H(mt,"getChart",yu);function bu(){return re(mt.instances,e=>e._plugins.invalidate())}function wp(e,t,n=t){e.lineCap=X(n.borderCapStyle,t.borderCapStyle),e.setLineDash(X(n.borderDash,t.borderDash)),e.lineDashOffset=X(n.borderDashOffset,t.borderDashOffset),e.lineJoin=X(n.borderJoinStyle,t.borderJoinStyle),e.lineWidth=X(n.borderWidth,t.borderWidth),e.strokeStyle=X(n.borderColor,t.borderColor)}function gS(e,t,n){e.lineTo(n.x,n.y)}function mS(e){return e.stepped?tk:e.tension||e.cubicInterpolationMode==="monotone"?nk:gS}function _p(e,t,n={}){const i=e.length,{start:s=0,end:o=i-1}=n,{start:r,end:a}=t,l=Math.max(s,r),c=Math.min(o,a),d=s<r&&o<r||s>a&&o>a;return{count:i,start:l,loop:t.loop,ilen:c<l&&!d?i+c-l:c-l}}function vS(e,t,n,i){const{points:s,options:o}=t,{count:r,start:a,loop:l,ilen:c}=_p(s,n,i),d=mS(o);let{move:u=!0,reverse:h}=i||{},g,v,b;for(g=0;g<=c;++g)v=s[(a+(h?c-g:g))%r],!v.skip&&(u?(e.moveTo(v.x,v.y),u=!1):d(e,b,v,h,o.stepped),b=v);return l&&(v=s[(a+(h?c:0))%r],d(e,b,v,h,o.stepped)),!!l}function yS(e,t,n,i){const s=t.points,{count:o,start:r,ilen:a}=_p(s,n,i),{move:l=!0,reverse:c}=i||{};let d=0,u=0,h,g,v,b,y,S;const E=T=>(r+(c?a-T:T))%o,L=()=>{b!==y&&(e.lineTo(d,y),e.lineTo(d,b),e.lineTo(d,S))};for(l&&(g=s[E(0)],e.moveTo(g.x,g.y)),h=0;h<=a;++h){if(g=s[E(h)],g.skip)continue;const T=g.x,C=g.y,M=T|0;M===v?(C<b?b=C:C>y&&(y=C),d=(u*d+T)/++u):(L(),e.lineTo(T,C),v=M,u=0,b=y=C),S=C}L()}function _a(e){const t=e.options,n=t.borderDash&&t.borderDash.length;return!e._decimated&&!e._loop&&!t.tension&&t.cubicInterpolationMode!=="monotone"&&!t.stepped&&!n?yS:vS}function bS(e){return e.stepped?Ik:e.tension||e.cubicInterpolationMode==="monotone"?Ok:rn}function xS(e,t,n,i){let s=t._path;s||(s=t._path=new Path2D,t.path(s,n,i)&&s.closePath()),wp(e,t.options),e.stroke(s)}function wS(e,t,n,i){const{segments:s,options:o}=t,r=_a(t);for(const a of s)wp(e,o,a.style),e.beginPath(),r(e,t,a,{start:n,end:n+i-1})&&e.closePath(),e.stroke()}const _S=typeof Path2D=="function";function kS(e,t,n,i){_S&&!t.options.segment?xS(e,t,n,i):wS(e,t,n,i)}class Ot extends jt{constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,n){const i=this.options;if((i.tension||i.cubicInterpolationMode==="monotone")&&!i.stepped&&!this._pointsUpdated){const s=i.spanGaps?this._loop:this._fullLoop;Tk(this._points,i,t,s,n),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=Uk(this,this.options.segment))}first(){const t=this.segments,n=this.points;return t.length&&n[t[0].start]}last(){const t=this.segments,n=this.points,i=t.length;return i&&n[t[i-1].end]}interpolate(t,n){const i=this.options,s=t[n],o=this.points,r=lp(this,{property:n,start:s,end:s});if(!r.length)return;const a=[],l=bS(i);let c,d;for(c=0,d=r.length;c<d;++c){const{start:u,end:h}=r[c],g=o[u],v=o[h];if(g===v){a.push(g);continue}const b=Math.abs((s-g[n])/(v[n]-g[n])),y=l(g,v,b,i.stepped);y[n]=t[n],a.push(y)}return a.length===1?a[0]:a}pathSegment(t,n,i){return _a(this)(t,this,n,i)}path(t,n,i){const s=this.segments,o=_a(this);let r=this._loop;n=n||0,i=i||this.points.length-n;for(const a of s)r&=o(t,this,a,{start:n,end:n+i-1});return!!r}draw(t,n,i,s){const o=this.options||{};(this.points||[]).length&&o.borderWidth&&(t.save(),kS(t,this,i,s),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}H(Ot,"id","line"),H(Ot,"defaults",{borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0}),H(Ot,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"}),H(Ot,"descriptors",{_scriptable:!0,_indexable:t=>t!=="borderDash"&&t!=="fill"});function xu(e,t,n,i){const s=e.options,{[n]:o}=e.getProps([n],i);return Math.abs(t-o)<s.radius+s.hitRadius}class Ys extends jt{constructor(n){super();H(this,"parsed");H(this,"skip");H(this,"stop");this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,n&&Object.assign(this,n)}inRange(n,i,s){const o=this.options,{x:r,y:a}=this.getProps(["x","y"],s);return Math.pow(n-r,2)+Math.pow(i-a,2)<Math.pow(o.hitRadius+o.radius,2)}inXRange(n,i){return xu(this,n,"x",i)}inYRange(n,i){return xu(this,n,"y",i)}getCenterPoint(n){const{x:i,y:s}=this.getProps(["x","y"],n);return{x:i,y:s}}size(n){n=n||this.options||{};let i=n.radius||0;i=Math.max(i,i&&n.hoverRadius||0);const s=i&&n.borderWidth||0;return(i+s)*2}draw(n,i){const s=this.options;this.skip||s.radius<.1||!Yi(this,i,this.size(s)/2)||(n.strokeStyle=s.borderColor,n.lineWidth=s.borderWidth,n.fillStyle=s.backgroundColor,ya(n,s,this.x,this.y))}getRange(){const n=this.options||{};return n.radius+n.hitRadius}}H(Ys,"id","point"),H(Ys,"defaults",{borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0}),H(Ys,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});function $S(e,t,n){const i=e.segments,s=e.points,o=t.points,r=[];for(const a of i){let{start:l,end:c}=a;c=jo(l,c,s);const d=ka(n,s[l],s[c],a.loop);if(!t.segments){r.push({source:a,target:d,start:s[l],end:s[c]});continue}const u=lp(t,d);for(const h of u){const g=ka(n,o[h.start],o[h.end],h.loop),v=ap(a,s,g);for(const b of v)r.push({source:b,target:h,start:{[n]:wu(d,g,"start",Math.max)},end:{[n]:wu(d,g,"end",Math.min)}})}}return r}function ka(e,t,n,i){if(i)return;let s=t[e],o=n[e];return e==="angle"&&(s=pt(s),o=pt(o)),{property:e,start:s,end:o}}function SS(e,t){const{x:n=null,y:i=null}=e||{},s=t.points,o=[];return t.segments.forEach(({start:r,end:a})=>{a=jo(r,a,s);const l=s[r],c=s[a];i!==null?(o.push({x:l.x,y:i}),o.push({x:c.x,y:i})):n!==null&&(o.push({x:n,y:l.y}),o.push({x:n,y:c.y}))}),o}function jo(e,t,n){for(;t>e;t--){const i=n[t];if(!isNaN(i.x)&&!isNaN(i.y))break}return t}function wu(e,t,n,i){return e&&t?i(e[n],t[n]):e?e[n]:t?t[n]:0}function kp(e,t){let n=[],i=!1;return $e(e)?(i=!0,n=e):n=SS(e,t),n.length?new Ot({points:n,options:{tension:0},_loop:i,_fullLoop:i}):null}function _u(e){return e&&e.fill!==!1}function AS(e,t,n){let s=e[t].fill;const o=[t];let r;if(!n)return s;for(;s!==!1&&o.indexOf(s)===-1;){if(!Pe(s))return s;if(r=e[s],!r)return!1;if(r.visible)return s;o.push(s),s=r.fill}return!1}function TS(e,t,n){const i=LS(e);if(Z(i))return isNaN(i.value)?!1:i;let s=parseFloat(i);return Pe(s)&&Math.floor(s)===s?CS(i[0],t,s,n):["origin","start","end","stack","shape"].indexOf(i)>=0&&i}function CS(e,t,n,i){return(e==="-"||e==="+")&&(n=t+n),n===t||n<0||n>=i?!1:n}function ES(e,t){let n=null;return e==="start"?n=t.bottom:e==="end"?n=t.top:Z(e)?n=t.getPixelForValue(e.value):t.getBasePixel&&(n=t.getBasePixel()),n}function RS(e,t,n){let i;return e==="start"?i=n:e==="end"?i=t.options.reverse?t.min:t.max:Z(e)?i=e.value:i=t.getBaseValue(),i}function LS(e){const t=e.options,n=t.fill;let i=X(n&&n.target,n);return i===void 0&&(i=!!t.backgroundColor),i===!1||i===null?!1:i===!0?"origin":i}function PS(e){const{scale:t,index:n,line:i}=e,s=[],o=i.segments,r=i.points,a=MS(t,n);a.push(kp({x:null,y:t.bottom},i));for(let l=0;l<o.length;l++){const c=o[l];for(let d=c.start;d<=c.end;d++)DS(s,r[d],a)}return new Ot({points:s,options:{}})}function MS(e,t){const n=[],i=e.getMatchingVisibleMetas("line");for(let s=0;s<i.length;s++){const o=i[s];if(o.index===t)break;o.hidden||n.unshift(o.dataset)}return n}function DS(e,t,n){const i=[];for(let s=0;s<n.length;s++){const o=n[s],{first:r,last:a,point:l}=IS(o,t,"x");if(!(!l||r&&a)){if(r)i.unshift(l);else if(e.push(l),!a)break}}e.push(...i)}function IS(e,t,n){const i=e.interpolate(t,n);if(!i)return{};const s=i[n],o=e.segments,r=e.points;let a=!1,l=!1;for(let c=0;c<o.length;c++){const d=o[c],u=r[d.start][n],h=r[d.end][n];if(Hn(s,u,h)){a=s===u,l=s===h;break}}return{first:a,last:l,point:i}}class $p{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,n,i){const{x:s,y:o,radius:r}=this;return n=n||{start:0,end:nt},t.arc(s,o,r,n.end,n.start,!0),!i.bounds}interpolate(t){const{x:n,y:i,radius:s}=this,o=t.angle;return{x:n+Math.cos(o)*s,y:i+Math.sin(o)*s,angle:o}}}function OS(e){const{chart:t,fill:n,line:i}=e;if(Pe(n))return FS(t,n);if(n==="stack")return PS(e);if(n==="shape")return!0;const s=NS(e);return s instanceof $p?s:kp(s,i)}function FS(e,t){const n=e.getDatasetMeta(t);return n&&e.isDatasetVisible(t)?n.dataset:null}function NS(e){return(e.scale||{}).getPointPositionForValue?zS(e):BS(e)}function BS(e){const{scale:t={},fill:n}=e,i=ES(n,t);if(Pe(i)){const s=t.isHorizontal();return{x:s?i:null,y:s?null:i}}return null}function zS(e){const{scale:t,fill:n}=e,i=t.options,s=t.getLabels().length,o=i.reverse?t.max:t.min,r=RS(n,t,o),a=[];if(i.grid.circular){const l=t.getPointPositionForValue(0,o);return new $p({x:l.x,y:l.y,radius:t.getDistanceFromCenterForValue(r)})}for(let l=0;l<s;++l)a.push(t.getPointPositionForValue(l,r));return a}function zr(e,t,n){const i=OS(t),{chart:s,index:o,line:r,scale:a,axis:l}=t,c=r.options,d=c.fill,u=c.backgroundColor,{above:h=u,below:g=u}=d||{},v=s.getDatasetMeta(o),b=cp(s,v);i&&r.points.length&&(zo(e,n),HS(e,{line:r,target:i,above:h,below:g,area:n,scale:a,axis:l,clip:b}),Ho(e))}function HS(e,t){const{line:n,target:i,above:s,below:o,area:r,scale:a,clip:l}=t,c=n._loop?"angle":t.axis;e.save();let d=o;o!==s&&(c==="x"?(ku(e,i,r.top),Hr(e,{line:n,target:i,color:s,scale:a,property:c,clip:l}),e.restore(),e.save(),ku(e,i,r.bottom)):c==="y"&&($u(e,i,r.left),Hr(e,{line:n,target:i,color:o,scale:a,property:c,clip:l}),e.restore(),e.save(),$u(e,i,r.right),d=s)),Hr(e,{line:n,target:i,color:d,scale:a,property:c,clip:l}),e.restore()}function ku(e,t,n){const{segments:i,points:s}=t;let o=!0,r=!1;e.beginPath();for(const a of i){const{start:l,end:c}=a,d=s[l],u=s[jo(l,c,s)];o?(e.moveTo(d.x,d.y),o=!1):(e.lineTo(d.x,n),e.lineTo(d.x,d.y)),r=!!t.pathSegment(e,a,{move:r}),r?e.closePath():e.lineTo(u.x,n)}e.lineTo(t.first().x,n),e.closePath(),e.clip()}function $u(e,t,n){const{segments:i,points:s}=t;let o=!0,r=!1;e.beginPath();for(const a of i){const{start:l,end:c}=a,d=s[l],u=s[jo(l,c,s)];o?(e.moveTo(d.x,d.y),o=!1):(e.lineTo(n,d.y),e.lineTo(d.x,d.y)),r=!!t.pathSegment(e,a,{move:r}),r?e.closePath():e.lineTo(n,u.y)}e.lineTo(n,t.first().y),e.closePath(),e.clip()}function Hr(e,t){const{line:n,target:i,property:s,color:o,scale:r,clip:a}=t,l=$S(n,i,s);for(const{source:c,target:d,start:u,end:h}of l){const{style:{backgroundColor:g=o}={}}=c,v=i!==!0;e.save(),e.fillStyle=g,US(e,r,a,v&&ka(s,u,h)),e.beginPath();const b=!!n.pathSegment(e,c);let y;if(v){b?e.closePath():Su(e,i,h,s);const S=!!i.pathSegment(e,d,{move:b,reverse:!0});y=b&&S,y||Su(e,i,u,s)}e.closePath(),e.fill(y?"evenodd":"nonzero"),e.restore()}}function US(e,t,n,i){const s=t.chart.chartArea,{property:o,start:r,end:a}=i||{};if(o==="x"||o==="y"){let l,c,d,u;o==="x"?(l=r,c=s.top,d=a,u=s.bottom):(l=s.left,c=r,d=s.right,u=a),e.beginPath(),n&&(l=Math.max(l,n.left),d=Math.min(d,n.right),c=Math.max(c,n.top),u=Math.min(u,n.bottom)),e.rect(l,c,d-l,u-c),e.clip()}}function Su(e,t,n,i){const s=t.interpolate(n,i);s&&e.lineTo(s.x,s.y)}var qS={id:"filler",afterDatasetsUpdate(e,t,n){const i=(e.data.datasets||[]).length,s=[];let o,r,a,l;for(r=0;r<i;++r)o=e.getDatasetMeta(r),a=o.dataset,l=null,a&&a.options&&a instanceof Ot&&(l={visible:e.isDatasetVisible(r),index:r,fill:TS(a,r,i),chart:e,axis:o.controller.options.indexAxis,scale:o.vScale,line:a}),o.$filler=l,s.push(l);for(r=0;r<i;++r)l=s[r],!(!l||l.fill===!1)&&(l.fill=AS(s,r,n.propagate))},beforeDraw(e,t,n){const i=n.drawTime==="beforeDraw",s=e.getSortedVisibleDatasetMetas(),o=e.chartArea;for(let r=s.length-1;r>=0;--r){const a=s[r].$filler;a&&(a.line.updateControlPoints(o,a.axis),i&&a.fill&&zr(e.ctx,a,o))}},beforeDatasetsDraw(e,t,n){if(n.drawTime!=="beforeDatasetsDraw")return;const i=e.getSortedVisibleDatasetMetas();for(let s=i.length-1;s>=0;--s){const o=i[s].$filler;_u(o)&&zr(e.ctx,o,e.chartArea)}},beforeDatasetDraw(e,t,n){const i=t.meta.$filler;!_u(i)||n.drawTime!=="beforeDatasetDraw"||zr(e.ctx,i,e.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const Au=(e,t)=>{let{boxHeight:n=t,boxWidth:i=t}=e;return e.usePointStyle&&(n=Math.min(n,t),i=e.pointStyleWidth||Math.min(i,t)),{boxWidth:i,boxHeight:n,itemHeight:Math.max(t,n)}},jS=(e,t)=>e!==null&&t!==null&&e.datasetIndex===t.datasetIndex&&e.index===t.index;class Tu extends jt{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,n,i){this.maxWidth=t,this.maxHeight=n,this._margins=i,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const t=this.options.labels||{};let n=ue(t.generateLabels,[this.chart],this)||[];t.filter&&(n=n.filter(i=>t.filter(i,this.chart.data))),t.sort&&(n=n.sort((i,s)=>t.sort(i,s,this.chart.data))),this.options.reverse&&n.reverse(),this.legendItems=n}fit(){const{options:t,ctx:n}=this;if(!t.display){this.width=this.height=0;return}const i=t.labels,s=Ue(i.font),o=s.size,r=this._computeTitleHeight(),{boxWidth:a,itemHeight:l}=Au(i,o);let c,d;n.font=s.string,this.isHorizontal()?(c=this.maxWidth,d=this._fitRows(r,o,a,l)+10):(d=this.maxHeight,c=this._fitCols(r,s,a,l)+10),this.width=Math.min(c,t.maxWidth||this.maxWidth),this.height=Math.min(d,t.maxHeight||this.maxHeight)}_fitRows(t,n,i,s){const{ctx:o,maxWidth:r,options:{labels:{padding:a}}}=this,l=this.legendHitBoxes=[],c=this.lineWidths=[0],d=s+a;let u=t;o.textAlign="left",o.textBaseline="middle";let h=-1,g=-d;return this.legendItems.forEach((v,b)=>{const y=i+n/2+o.measureText(v.text).width;(b===0||c[c.length-1]+y+2*a>r)&&(u+=d,c[c.length-(b>0?0:1)]=0,g+=d,h++),l[b]={left:0,top:g,row:h,width:y,height:s},c[c.length-1]+=y+a}),u}_fitCols(t,n,i,s){const{ctx:o,maxHeight:r,options:{labels:{padding:a}}}=this,l=this.legendHitBoxes=[],c=this.columnSizes=[],d=r-t;let u=a,h=0,g=0,v=0,b=0;return this.legendItems.forEach((y,S)=>{const{itemWidth:E,itemHeight:L}=KS(i,n,o,y,s);S>0&&g+L+2*a>d&&(u+=h+a,c.push({width:h,height:g}),v+=h+a,b++,h=g=0),l[S]={left:v,top:g,col:b,width:E,height:L},h=Math.max(h,E),g+=L+a}),u+=h,c.push({width:h,height:g}),u}adjustHitBoxes(){if(!this.options.display)return;const t=this._computeTitleHeight(),{legendHitBoxes:n,options:{align:i,labels:{padding:s},rtl:o}}=this,r=qn(o,this.left,this.width);if(this.isHorizontal()){let a=0,l=qe(i,this.left+s,this.right-this.lineWidths[a]);for(const c of n)a!==c.row&&(a=c.row,l=qe(i,this.left+s,this.right-this.lineWidths[a])),c.top+=this.top+t+s,c.left=r.leftForLtr(r.x(l),c.width),l+=c.width+s}else{let a=0,l=qe(i,this.top+t+s,this.bottom-this.columnSizes[a].height);for(const c of n)c.col!==a&&(a=c.col,l=qe(i,this.top+t+s,this.bottom-this.columnSizes[a].height)),c.top=l,c.left+=this.left+s,c.left=r.leftForLtr(r.x(c.left),c.width),l+=c.height+s}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const t=this.ctx;zo(t,this),this._draw(),Ho(t)}}_draw(){const{options:t,columnSizes:n,lineWidths:i,ctx:s}=this,{align:o,labels:r}=t,a=me.color,l=qn(t.rtl,this.left,this.width),c=Ue(r.font),{padding:d}=r,u=c.size,h=u/2;let g;this.drawTitle(),s.textAlign=l.textAlign("left"),s.textBaseline="middle",s.lineWidth=.5,s.font=c.string;const{boxWidth:v,boxHeight:b,itemHeight:y}=Au(r,u),S=function(M,m,k){if(isNaN(v)||v<=0||isNaN(b)||b<0)return;s.save();const R=X(k.lineWidth,1);if(s.fillStyle=X(k.fillStyle,a),s.lineCap=X(k.lineCap,"butt"),s.lineDashOffset=X(k.lineDashOffset,0),s.lineJoin=X(k.lineJoin,"miter"),s.lineWidth=R,s.strokeStyle=X(k.strokeStyle,a),s.setLineDash(X(k.lineDash,[])),r.usePointStyle){const D={radius:b*Math.SQRT2/2,pointStyle:k.pointStyle,rotation:k.rotation,borderWidth:R},P=l.xPlus(M,v/2),F=m+h;Xf(s,D,P,F,r.pointStyleWidth&&v)}else{const D=m+Math.max((u-b)/2,0),P=l.leftForLtr(M,v),F=Ni(k.borderRadius);s.beginPath(),Object.values(F).some(N=>N!==0)?ba(s,{x:P,y:D,w:v,h:b,radius:F}):s.rect(P,D,v,b),s.fill(),R!==0&&s.stroke()}s.restore()},E=function(M,m,k){vo(s,k.text,M,m+y/2,c,{strikethrough:k.hidden,textAlign:l.textAlign(k.textAlign)})},L=this.isHorizontal(),T=this._computeTitleHeight();L?g={x:qe(o,this.left+d,this.right-i[0]),y:this.top+d+T,line:0}:g={x:this.left+d,y:qe(o,this.top+T+d,this.bottom-n[0].height),line:0},sp(this.ctx,t.textDirection);const C=y+d;this.legendItems.forEach((M,m)=>{s.strokeStyle=M.fontColor,s.fillStyle=M.fontColor;const k=s.measureText(M.text).width,R=l.textAlign(M.textAlign||(M.textAlign=r.textAlign)),D=v+h+k;let P=g.x,F=g.y;l.setWidth(this.width),L?m>0&&P+D+d>this.right&&(F=g.y+=C,g.line++,P=g.x=qe(o,this.left+d,this.right-i[g.line])):m>0&&F+C>this.bottom&&(P=g.x=P+n[g.line].width+d,g.line++,F=g.y=qe(o,this.top+T+d,this.bottom-n[g.line].height));const N=l.x(P);if(S(N,F,M),P=U1(R,P+v+h,L?P+D:this.right,t.rtl),E(l.x(P),F,M),L)g.x+=D+d;else if(typeof M.text!="string"){const B=c.lineHeight;g.y+=Sp(M,B)+d}else g.y+=C}),op(this.ctx,t.textDirection)}drawTitle(){const t=this.options,n=t.title,i=Ue(n.font),s=st(n.padding);if(!n.display)return;const o=qn(t.rtl,this.left,this.width),r=this.ctx,a=n.position,l=i.size/2,c=s.top+l;let d,u=this.left,h=this.width;if(this.isHorizontal())h=Math.max(...this.lineWidths),d=this.top+c,u=qe(t.align,u,this.right-h);else{const v=this.columnSizes.reduce((b,y)=>Math.max(b,y.height),0);d=c+qe(t.align,this.top,this.bottom-v-t.labels.padding-this._computeTitleHeight())}const g=qe(a,u,u+h);r.textAlign=o.textAlign(Gf(a)),r.textBaseline="middle",r.strokeStyle=n.color,r.fillStyle=n.color,r.font=i.string,vo(r,n.text,g,d,i)}_computeTitleHeight(){const t=this.options.title,n=Ue(t.font),i=st(t.padding);return t.display?n.lineHeight+i.height:0}_getLegendItemAt(t,n){let i,s,o;if(Hn(t,this.left,this.right)&&Hn(n,this.top,this.bottom)){for(o=this.legendHitBoxes,i=0;i<o.length;++i)if(s=o[i],Hn(t,s.left,s.left+s.width)&&Hn(n,s.top,s.top+s.height))return this.legendItems[i]}return null}handleEvent(t){const n=this.options;if(!GS(t.type,n))return;const i=this._getLegendItemAt(t.x,t.y);if(t.type==="mousemove"||t.type==="mouseout"){const s=this._hoveredItem,o=jS(s,i);s&&!o&&ue(n.onLeave,[t,s,this],this),this._hoveredItem=i,i&&!o&&ue(n.onHover,[t,i,this],this)}else i&&ue(n.onClick,[t,i,this],this)}}function KS(e,t,n,i,s){const o=WS(i,e,t,n),r=VS(s,i,t.lineHeight);return{itemWidth:o,itemHeight:r}}function WS(e,t,n,i){let s=e.text;return s&&typeof s!="string"&&(s=s.reduce((o,r)=>o.length>r.length?o:r)),t+n.size/2+i.measureText(s).width}function VS(e,t,n){let i=e;return typeof t.text!="string"&&(i=Sp(t,n)),i}function Sp(e,t){const n=e.text?e.text.length:0;return t*n}function GS(e,t){return!!((e==="mousemove"||e==="mouseout")&&(t.onHover||t.onLeave)||t.onClick&&(e==="click"||e==="mouseup"))}var QS={id:"legend",_element:Tu,start(e,t,n){const i=e.legend=new Tu({ctx:e.ctx,options:n,chart:e});It.configure(e,i,n),It.addBox(e,i)},stop(e){It.removeBox(e,e.legend),delete e.legend},beforeUpdate(e,t,n){const i=e.legend;It.configure(e,i,n),i.options=n},afterUpdate(e){const t=e.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(e,t){t.replay||e.legend.handleEvent(t.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(e,t,n){const i=t.datasetIndex,s=n.chart;s.isDatasetVisible(i)?(s.hide(i),t.hidden=!0):(s.show(i),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:e=>e.chart.options.color,boxWidth:40,padding:10,generateLabels(e){const t=e.data.datasets,{labels:{usePointStyle:n,pointStyle:i,textAlign:s,color:o,useBorderRadius:r,borderRadius:a}}=e.legend.options;return e._getSortedDatasetMetas().map(l=>{const c=l.controller.getStyle(n?0:void 0),d=st(c.borderWidth);return{text:t[l.index].label,fillStyle:c.backgroundColor,fontColor:o,hidden:!l.visible,lineCap:c.borderCapStyle,lineDash:c.borderDash,lineDashOffset:c.borderDashOffset,lineJoin:c.borderJoinStyle,lineWidth:(d.width+d.height)/4,strokeStyle:c.borderColor,pointStyle:i||c.pointStyle,rotation:c.rotation,textAlign:s||c.textAlign,borderRadius:r&&(a||c.borderRadius),datasetIndex:l.index}},this)}},title:{color:e=>e.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:e=>!e.startsWith("on"),labels:{_scriptable:e=>!["generateLabels","filter","sort"].includes(e)}}};const $i={average(e){if(!e.length)return!1;let t,n,i=new Set,s=0,o=0;for(t=0,n=e.length;t<n;++t){const a=e[t].element;if(a&&a.hasValue()){const l=a.tooltipPosition();i.add(l.x),s+=l.y,++o}}return o===0||i.size===0?!1:{x:[...i].reduce((a,l)=>a+l)/i.size,y:s/o}},nearest(e,t){if(!e.length)return!1;let n=t.x,i=t.y,s=Number.POSITIVE_INFINITY,o,r,a;for(o=0,r=e.length;o<r;++o){const l=e[o].element;if(l&&l.hasValue()){const c=l.getCenterPoint(),d=ma(t,c);d<s&&(s=d,a=l)}}if(a){const l=a.tooltipPosition();n=l.x,i=l.y}return{x:n,y:i}}};function ut(e,t){return t&&($e(t)?Array.prototype.push.apply(e,t):e.push(t)),e}function At(e){return(typeof e=="string"||e instanceof String)&&e.indexOf(`
`)>-1?e.split(`
`):e}function YS(e,t){const{element:n,datasetIndex:i,index:s}=t,o=e.getDatasetMeta(i).controller,{label:r,value:a}=o.getLabelAndValue(s);return{chart:e,label:r,parsed:o.getParsed(s),raw:e.data.datasets[i].data[s],formattedValue:a,dataset:o.getDataset(),dataIndex:s,datasetIndex:i,element:n}}function Cu(e,t){const n=e.chart.ctx,{body:i,footer:s,title:o}=e,{boxWidth:r,boxHeight:a}=t,l=Ue(t.bodyFont),c=Ue(t.titleFont),d=Ue(t.footerFont),u=o.length,h=s.length,g=i.length,v=st(t.padding);let b=v.height,y=0,S=i.reduce((T,C)=>T+C.before.length+C.lines.length+C.after.length,0);if(S+=e.beforeBody.length+e.afterBody.length,u&&(b+=u*c.lineHeight+(u-1)*t.titleSpacing+t.titleMarginBottom),S){const T=t.displayColors?Math.max(a,l.lineHeight):l.lineHeight;b+=g*T+(S-g)*l.lineHeight+(S-1)*t.bodySpacing}h&&(b+=t.footerMarginTop+h*d.lineHeight+(h-1)*t.footerSpacing);let E=0;const L=function(T){y=Math.max(y,n.measureText(T).width+E)};return n.save(),n.font=c.string,re(e.title,L),n.font=l.string,re(e.beforeBody.concat(e.afterBody),L),E=t.displayColors?r+2+t.boxPadding:0,re(i,T=>{re(T.before,L),re(T.lines,L),re(T.after,L)}),E=0,n.font=d.string,re(e.footer,L),n.restore(),y+=v.width,{width:y,height:b}}function XS(e,t){const{y:n,height:i}=t;return n<i/2?"top":n>e.height-i/2?"bottom":"center"}function JS(e,t,n,i){const{x:s,width:o}=i,r=n.caretSize+n.caretPadding;if(e==="left"&&s+o+r>t.width||e==="right"&&s-o-r<0)return!0}function ZS(e,t,n,i){const{x:s,width:o}=n,{width:r,chartArea:{left:a,right:l}}=e;let c="center";return i==="center"?c=s<=(a+l)/2?"left":"right":s<=o/2?c="left":s>=r-o/2&&(c="right"),JS(c,e,t,n)&&(c="center"),c}function Eu(e,t,n){const i=n.yAlign||t.yAlign||XS(e,n);return{xAlign:n.xAlign||t.xAlign||ZS(e,t,n,i),yAlign:i}}function e2(e,t){let{x:n,width:i}=e;return t==="right"?n-=i:t==="center"&&(n-=i/2),n}function t2(e,t,n){let{y:i,height:s}=e;return t==="top"?i+=n:t==="bottom"?i-=s+n:i-=s/2,i}function Ru(e,t,n,i){const{caretSize:s,caretPadding:o,cornerRadius:r}=e,{xAlign:a,yAlign:l}=n,c=s+o,{topLeft:d,topRight:u,bottomLeft:h,bottomRight:g}=Ni(r);let v=e2(t,a);const b=t2(t,l,c);return l==="center"?a==="left"?v+=c:a==="right"&&(v-=c):a==="left"?v-=Math.max(d,h)+s:a==="right"&&(v+=Math.max(u,g)+s),{x:We(v,0,i.width-t.width),y:We(b,0,i.height-t.height)}}function Os(e,t,n){const i=st(n.padding);return t==="center"?e.x+e.width/2:t==="right"?e.x+e.width-i.right:e.x+i.left}function Lu(e){return ut([],At(e))}function n2(e,t,n){return Rn(e,{tooltip:t,tooltipItems:n,type:"tooltip"})}function Pu(e,t){const n=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return n?e.override(n):e}const Ap={beforeTitle:$t,title(e){if(e.length>0){const t=e[0],n=t.chart.data.labels,i=n?n.length:0;if(this&&this.options&&this.options.mode==="dataset")return t.dataset.label||"";if(t.label)return t.label;if(i>0&&t.dataIndex<i)return n[t.dataIndex]}return""},afterTitle:$t,beforeBody:$t,beforeLabel:$t,label(e){if(this&&this.options&&this.options.mode==="dataset")return e.label+": "+e.formattedValue||e.formattedValue;let t=e.dataset.label||"";t&&(t+=": ");const n=e.formattedValue;return ce(n)||(t+=n),t},labelColor(e){const n=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{borderColor:n.borderColor,backgroundColor:n.backgroundColor,borderWidth:n.borderWidth,borderDash:n.borderDash,borderDashOffset:n.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(e){const n=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{pointStyle:n.pointStyle,rotation:n.rotation}},afterLabel:$t,afterBody:$t,beforeFooter:$t,footer:$t,afterFooter:$t};function Be(e,t,n,i){const s=e[t].call(n,i);return typeof s>"u"?Ap[t].call(n,i):s}class $a extends jt{constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const t=this._cachedAnimations;if(t)return t;const n=this.chart,i=this.options.setContext(this.getContext()),s=i.enabled&&n.options.animation&&i.animations,o=new dp(this.chart,s);return s._cacheable&&(this._cachedAnimations=Object.freeze(o)),o}getContext(){return this.$context||(this.$context=n2(this.chart.getContext(),this,this._tooltipItems))}getTitle(t,n){const{callbacks:i}=n,s=Be(i,"beforeTitle",this,t),o=Be(i,"title",this,t),r=Be(i,"afterTitle",this,t);let a=[];return a=ut(a,At(s)),a=ut(a,At(o)),a=ut(a,At(r)),a}getBeforeBody(t,n){return Lu(Be(n.callbacks,"beforeBody",this,t))}getBody(t,n){const{callbacks:i}=n,s=[];return re(t,o=>{const r={before:[],lines:[],after:[]},a=Pu(i,o);ut(r.before,At(Be(a,"beforeLabel",this,o))),ut(r.lines,Be(a,"label",this,o)),ut(r.after,At(Be(a,"afterLabel",this,o))),s.push(r)}),s}getAfterBody(t,n){return Lu(Be(n.callbacks,"afterBody",this,t))}getFooter(t,n){const{callbacks:i}=n,s=Be(i,"beforeFooter",this,t),o=Be(i,"footer",this,t),r=Be(i,"afterFooter",this,t);let a=[];return a=ut(a,At(s)),a=ut(a,At(o)),a=ut(a,At(r)),a}_createItems(t){const n=this._active,i=this.chart.data,s=[],o=[],r=[];let a=[],l,c;for(l=0,c=n.length;l<c;++l)a.push(YS(this.chart,n[l]));return t.filter&&(a=a.filter((d,u,h)=>t.filter(d,u,h,i))),t.itemSort&&(a=a.sort((d,u)=>t.itemSort(d,u,i))),re(a,d=>{const u=Pu(t.callbacks,d);s.push(Be(u,"labelColor",this,d)),o.push(Be(u,"labelPointStyle",this,d)),r.push(Be(u,"labelTextColor",this,d))}),this.labelColors=s,this.labelPointStyles=o,this.labelTextColors=r,this.dataPoints=a,a}update(t,n){const i=this.options.setContext(this.getContext()),s=this._active;let o,r=[];if(!s.length)this.opacity!==0&&(o={opacity:0});else{const a=$i[i.position].call(this,s,this._eventPosition);r=this._createItems(i),this.title=this.getTitle(r,i),this.beforeBody=this.getBeforeBody(r,i),this.body=this.getBody(r,i),this.afterBody=this.getAfterBody(r,i),this.footer=this.getFooter(r,i);const l=this._size=Cu(this,i),c=Object.assign({},a,l),d=Eu(this.chart,i,c),u=Ru(i,c,d,this.chart);this.xAlign=d.xAlign,this.yAlign=d.yAlign,o={opacity:1,x:u.x,y:u.y,width:l.width,height:l.height,caretX:a.x,caretY:a.y}}this._tooltipItems=r,this.$context=void 0,o&&this._resolveAnimations().update(this,o),t&&i.external&&i.external.call(this,{chart:this.chart,tooltip:this,replay:n})}drawCaret(t,n,i,s){const o=this.getCaretPosition(t,i,s);n.lineTo(o.x1,o.y1),n.lineTo(o.x2,o.y2),n.lineTo(o.x3,o.y3)}getCaretPosition(t,n,i){const{xAlign:s,yAlign:o}=this,{caretSize:r,cornerRadius:a}=i,{topLeft:l,topRight:c,bottomLeft:d,bottomRight:u}=Ni(a),{x:h,y:g}=t,{width:v,height:b}=n;let y,S,E,L,T,C;return o==="center"?(T=g+b/2,s==="left"?(y=h,S=y-r,L=T+r,C=T-r):(y=h+v,S=y+r,L=T-r,C=T+r),E=y):(s==="left"?S=h+Math.max(l,d)+r:s==="right"?S=h+v-Math.max(c,u)-r:S=this.caretX,o==="top"?(L=g,T=L-r,y=S-r,E=S+r):(L=g+b,T=L+r,y=S+r,E=S-r),C=L),{x1:y,x2:S,x3:E,y1:L,y2:T,y3:C}}drawTitle(t,n,i){const s=this.title,o=s.length;let r,a,l;if(o){const c=qn(i.rtl,this.x,this.width);for(t.x=Os(this,i.titleAlign,i),n.textAlign=c.textAlign(i.titleAlign),n.textBaseline="middle",r=Ue(i.titleFont),a=i.titleSpacing,n.fillStyle=i.titleColor,n.font=r.string,l=0;l<o;++l)n.fillText(s[l],c.x(t.x),t.y+r.lineHeight/2),t.y+=r.lineHeight+a,l+1===o&&(t.y+=i.titleMarginBottom-a)}}_drawColorBox(t,n,i,s,o){const r=this.labelColors[i],a=this.labelPointStyles[i],{boxHeight:l,boxWidth:c}=o,d=Ue(o.bodyFont),u=Os(this,"left",o),h=s.x(u),g=l<d.lineHeight?(d.lineHeight-l)/2:0,v=n.y+g;if(o.usePointStyle){const b={radius:Math.min(c,l)/2,pointStyle:a.pointStyle,rotation:a.rotation,borderWidth:1},y=s.leftForLtr(h,c)+c/2,S=v+l/2;t.strokeStyle=o.multiKeyBackground,t.fillStyle=o.multiKeyBackground,ya(t,b,y,S),t.strokeStyle=r.borderColor,t.fillStyle=r.backgroundColor,ya(t,b,y,S)}else{t.lineWidth=Z(r.borderWidth)?Math.max(...Object.values(r.borderWidth)):r.borderWidth||1,t.strokeStyle=r.borderColor,t.setLineDash(r.borderDash||[]),t.lineDashOffset=r.borderDashOffset||0;const b=s.leftForLtr(h,c),y=s.leftForLtr(s.xPlus(h,1),c-2),S=Ni(r.borderRadius);Object.values(S).some(E=>E!==0)?(t.beginPath(),t.fillStyle=o.multiKeyBackground,ba(t,{x:b,y:v,w:c,h:l,radius:S}),t.fill(),t.stroke(),t.fillStyle=r.backgroundColor,t.beginPath(),ba(t,{x:y,y:v+1,w:c-2,h:l-2,radius:S}),t.fill()):(t.fillStyle=o.multiKeyBackground,t.fillRect(b,v,c,l),t.strokeRect(b,v,c,l),t.fillStyle=r.backgroundColor,t.fillRect(y,v+1,c-2,l-2))}t.fillStyle=this.labelTextColors[i]}drawBody(t,n,i){const{body:s}=this,{bodySpacing:o,bodyAlign:r,displayColors:a,boxHeight:l,boxWidth:c,boxPadding:d}=i,u=Ue(i.bodyFont);let h=u.lineHeight,g=0;const v=qn(i.rtl,this.x,this.width),b=function(k){n.fillText(k,v.x(t.x+g),t.y+h/2),t.y+=h+o},y=v.textAlign(r);let S,E,L,T,C,M,m;for(n.textAlign=r,n.textBaseline="middle",n.font=u.string,t.x=Os(this,y,i),n.fillStyle=i.bodyColor,re(this.beforeBody,b),g=a&&y!=="right"?r==="center"?c/2+d:c+2+d:0,T=0,M=s.length;T<M;++T){for(S=s[T],E=this.labelTextColors[T],n.fillStyle=E,re(S.before,b),L=S.lines,a&&L.length&&(this._drawColorBox(n,t,T,v,i),h=Math.max(u.lineHeight,l)),C=0,m=L.length;C<m;++C)b(L[C]),h=u.lineHeight;re(S.after,b)}g=0,h=u.lineHeight,re(this.afterBody,b),t.y-=o}drawFooter(t,n,i){const s=this.footer,o=s.length;let r,a;if(o){const l=qn(i.rtl,this.x,this.width);for(t.x=Os(this,i.footerAlign,i),t.y+=i.footerMarginTop,n.textAlign=l.textAlign(i.footerAlign),n.textBaseline="middle",r=Ue(i.footerFont),n.fillStyle=i.footerColor,n.font=r.string,a=0;a<o;++a)n.fillText(s[a],l.x(t.x),t.y+r.lineHeight/2),t.y+=r.lineHeight+i.footerSpacing}}drawBackground(t,n,i,s){const{xAlign:o,yAlign:r}=this,{x:a,y:l}=t,{width:c,height:d}=i,{topLeft:u,topRight:h,bottomLeft:g,bottomRight:v}=Ni(s.cornerRadius);n.fillStyle=s.backgroundColor,n.strokeStyle=s.borderColor,n.lineWidth=s.borderWidth,n.beginPath(),n.moveTo(a+u,l),r==="top"&&this.drawCaret(t,n,i,s),n.lineTo(a+c-h,l),n.quadraticCurveTo(a+c,l,a+c,l+h),r==="center"&&o==="right"&&this.drawCaret(t,n,i,s),n.lineTo(a+c,l+d-v),n.quadraticCurveTo(a+c,l+d,a+c-v,l+d),r==="bottom"&&this.drawCaret(t,n,i,s),n.lineTo(a+g,l+d),n.quadraticCurveTo(a,l+d,a,l+d-g),r==="center"&&o==="left"&&this.drawCaret(t,n,i,s),n.lineTo(a,l+u),n.quadraticCurveTo(a,l,a+u,l),n.closePath(),n.fill(),s.borderWidth>0&&n.stroke()}_updateAnimationTarget(t){const n=this.chart,i=this.$animations,s=i&&i.x,o=i&&i.y;if(s||o){const r=$i[t.position].call(this,this._active,this._eventPosition);if(!r)return;const a=this._size=Cu(this,t),l=Object.assign({},r,this._size),c=Eu(n,t,l),d=Ru(t,l,c,n);(s._to!==d.x||o._to!==d.y)&&(this.xAlign=c.xAlign,this.yAlign=c.yAlign,this.width=a.width,this.height=a.height,this.caretX=r.x,this.caretY=r.y,this._resolveAnimations().update(this,d))}}_willRender(){return!!this.opacity}draw(t){const n=this.options.setContext(this.getContext());let i=this.opacity;if(!i)return;this._updateAnimationTarget(n);const s={width:this.width,height:this.height},o={x:this.x,y:this.y};i=Math.abs(i)<.001?0:i;const r=st(n.padding),a=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;n.enabled&&a&&(t.save(),t.globalAlpha=i,this.drawBackground(o,t,s,n),sp(t,n.textDirection),o.y+=r.top,this.drawTitle(o,t,n),this.drawBody(o,t,n),this.drawFooter(o,t,n),op(t,n.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,n){const i=this._active,s=t.map(({datasetIndex:a,index:l})=>{const c=this.chart.getDatasetMeta(a);if(!c)throw new Error("Cannot find a dataset at index "+a);return{datasetIndex:a,element:c.data[l],index:l}}),o=!ho(i,s),r=this._positionChanged(s,n);(o||r)&&(this._active=s,this._eventPosition=n,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,n,i=!0){if(n&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const s=this.options,o=this._active||[],r=this._getActiveElements(t,o,n,i),a=this._positionChanged(r,t),l=n||!ho(r,o)||a;return l&&(this._active=r,(s.enabled||s.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,n))),l}_getActiveElements(t,n,i,s){const o=this.options;if(t.type==="mouseout")return[];if(!s)return n.filter(a=>this.chart.data.datasets[a.datasetIndex]&&this.chart.getDatasetMeta(a.datasetIndex).controller.getParsed(a.index)!==void 0);const r=this.chart.getElementsAtEventForMode(t,o.mode,o,i);return o.reverse&&r.reverse(),r}_positionChanged(t,n){const{caretX:i,caretY:s,options:o}=this,r=$i[o.position].call(this,t,n);return r!==!1&&(i!==r.x||s!==r.y)}}H($a,"positioners",$i);var i2={id:"tooltip",_element:$a,positioners:$i,afterInit(e,t,n){n&&(e.tooltip=new $a({chart:e,options:n}))},beforeUpdate(e,t,n){e.tooltip&&e.tooltip.initialize(n)},reset(e,t,n){e.tooltip&&e.tooltip.initialize(n)},afterDraw(e){const t=e.tooltip;if(t&&t._willRender()){const n={tooltip:t};if(e.notifyPlugins("beforeTooltipDraw",{...n,cancelable:!0})===!1)return;t.draw(e.ctx),e.notifyPlugins("afterTooltipDraw",n)}},afterEvent(e,t){if(e.tooltip){const n=t.replay;e.tooltip.handleEvent(t.event,n,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(e,t)=>t.bodyFont.size,boxWidth:(e,t)=>t.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:Ap},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:e=>e!=="filter"&&e!=="itemSort"&&e!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]};const s2=(e,t,n,i)=>(typeof t=="string"?(n=e.push(t)-1,i.unshift({index:n,label:t})):isNaN(t)&&(n=null),n);function o2(e,t,n,i){const s=e.indexOf(t);if(s===-1)return s2(e,t,n,i);const o=e.lastIndexOf(t);return s!==o?n:s}const r2=(e,t)=>e===null?null:We(Math.round(e),0,t);function Mu(e){const t=this.getLabels();return e>=0&&e<t.length?t[e]:e}class Sa extends ni{constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){const n=this._addedLabels;if(n.length){const i=this.getLabels();for(const{index:s,label:o}of n)i[s]===o&&i.splice(s,1);this._addedLabels=[]}super.init(t)}parse(t,n){if(ce(t))return null;const i=this.getLabels();return n=isFinite(n)&&i[n]===t?n:o2(i,t,X(n,t),this._addedLabels),r2(n,i.length-1)}determineDataLimits(){const{minDefined:t,maxDefined:n}=this.getUserBounds();let{min:i,max:s}=this.getMinMax(!0);this.options.bounds==="ticks"&&(t||(i=0),n||(s=this.getLabels().length-1)),this.min=i,this.max=s}buildTicks(){const t=this.min,n=this.max,i=this.options.offset,s=[];let o=this.getLabels();o=t===0&&n===o.length-1?o:o.slice(t,n+1),this._valueRange=Math.max(o.length-(i?0:1),1),this._startValue=this.min-(i?.5:0);for(let r=t;r<=n;r++)s.push({value:r});return s}getLabelForValue(t){return Mu.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return typeof t!="number"&&(t=this.parse(t)),t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){const n=this.ticks;return t<0||t>n.length-1?null:this.getPixelForValue(n[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}}H(Sa,"id","category"),H(Sa,"defaults",{ticks:{callback:Mu}});function a2(e,t){const n=[],{bounds:s,step:o,min:r,max:a,precision:l,count:c,maxTicks:d,maxDigits:u,includeBounds:h}=e,g=o||1,v=d-1,{min:b,max:y}=t,S=!ce(r),E=!ce(a),L=!ce(c),T=(y-b)/(u+1);let C=Md((y-b)/v/g)*g,M,m,k,R;if(C<1e-14&&!S&&!E)return[{value:b},{value:y}];R=Math.ceil(y/C)-Math.floor(b/C),R>v&&(C=Md(R*C/v/g)*g),ce(l)||(M=Math.pow(10,l),C=Math.ceil(C*M)/M),s==="ticks"?(m=Math.floor(b/C)*C,k=Math.ceil(y/C)*C):(m=b,k=y),S&&E&&o&&L1((a-r)/o,C/1e3)?(R=Math.round(Math.min((a-r)/C,d)),C=(a-r)/R,m=r,k=a):L?(m=S?r:m,k=E?a:k,R=c-1,C=(k-m)/R):(R=(k-m)/C,Ii(R,Math.round(R),C/1e3)?R=Math.round(R):R=Math.ceil(R));const D=Math.max(Dd(C),Dd(m));M=Math.pow(10,ce(l)?D:l),m=Math.round(m*M)/M,k=Math.round(k*M)/M;let P=0;for(S&&(h&&m!==r?(n.push({value:r}),m<r&&P++,Ii(Math.round((m+P*C)*M)/M,r,Du(r,T,e))&&P++):m<r&&P++);P<R;++P){const F=Math.round((m+P*C)*M)/M;if(E&&F>a)break;n.push({value:F})}return E&&h&&k!==a?n.length&&Ii(n[n.length-1].value,a,Du(a,T,e))?n[n.length-1].value=a:n.push({value:a}):(!E||k===a)&&n.push({value:k}),n}function Du(e,t,{horizontal:n,minRotation:i}){const s=dn(i),o=(n?Math.sin(s):Math.cos(s))||.001,r=.75*t*(""+e).length;return Math.min(t/o,r)}class l2 extends ni{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,n){return ce(t)||(typeof t=="number"||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){const{beginAtZero:t}=this.options,{minDefined:n,maxDefined:i}=this.getUserBounds();let{min:s,max:o}=this;const r=l=>s=n?s:l,a=l=>o=i?o:l;if(t){const l=Xn(s),c=Xn(o);l<0&&c<0?a(0):l>0&&c>0&&r(0)}if(s===o){let l=o===0?1:Math.abs(o*.05);a(o+l),t||r(s-l)}this.min=s,this.max=o}getTickLimit(){const t=this.options.ticks;let{maxTicksLimit:n,stepSize:i}=t,s;return i?(s=Math.ceil(this.max/i)-Math.floor(this.min/i)+1,s>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${i} would result generating up to ${s} ticks. Limiting to 1000.`),s=1e3)):(s=this.computeTickLimit(),n=n||11),n&&(s=Math.min(n,s)),s}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const t=this.options,n=t.ticks;let i=this.getTickLimit();i=Math.max(2,i);const s={maxTicks:i,bounds:t.bounds,min:t.min,max:t.max,precision:n.precision,step:n.stepSize,count:n.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:n.minRotation||0,includeBounds:n.includeBounds!==!1},o=this._range||this,r=a2(s,o);return t.bounds==="ticks"&&P1(r,this,"value"),t.reverse?(r.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),r}configure(){const t=this.ticks;let n=this.min,i=this.max;if(super.configure(),this.options.offset&&t.length){const s=(i-n)/Math.max(t.length-1,1)/2;n-=s,i+=s}this._startValue=n,this._endValue=i,this._valueRange=i-n}getLabelForValue(t){return Qf(t,this.chart.options.locale,this.options.ticks.format)}}class Aa extends l2{determineDataLimits(){const{min:t,max:n}=this.getMinMax(!0);this.min=Pe(t)?t:0,this.max=Pe(n)?n:1,this.handleTickRangeOptions()}computeTickLimit(){const t=this.isHorizontal(),n=t?this.width:this.height,i=dn(this.options.ticks.minRotation),s=(t?Math.sin(i):Math.cos(i))||.001,o=this._resolveTickFontOptions(0);return Math.ceil(n/Math.min(40,o.lineHeight/s))}getPixelForValue(t){return t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}}H(Aa,"id","linear"),H(Aa,"defaults",{ticks:{callback:Yf.formatters.numeric}});const Ko={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},ze=Object.keys(Ko);function Iu(e,t){return e-t}function Ou(e,t){if(ce(t))return null;const n=e._adapter,{parser:i,round:s,isoWeekday:o}=e._parseOpts;let r=t;return typeof i=="function"&&(r=i(r)),Pe(r)||(r=typeof i=="string"?n.parse(r,i):n.parse(r)),r===null?null:(s&&(r=s==="week"&&(Qi(o)||o===!0)?n.startOf(r,"isoWeek",o):n.startOf(r,s)),+r)}function Fu(e,t,n,i){const s=ze.length;for(let o=ze.indexOf(e);o<s-1;++o){const r=Ko[ze[o]],a=r.steps?r.steps:Number.MAX_SAFE_INTEGER;if(r.common&&Math.ceil((n-t)/(a*r.size))<=i)return ze[o]}return ze[s-1]}function c2(e,t,n,i,s){for(let o=ze.length-1;o>=ze.indexOf(n);o--){const r=ze[o];if(Ko[r].common&&e._adapter.diff(s,i,r)>=t-1)return r}return ze[n?ze.indexOf(n):0]}function d2(e){for(let t=ze.indexOf(e)+1,n=ze.length;t<n;++t)if(Ko[ze[t]].common)return ze[t]}function Nu(e,t,n){if(!n)e[t]=!0;else if(n.length){const{lo:i,hi:s}=kl(n,t),o=n[i]>=t?n[i]:n[s];e[o]=!0}}function u2(e,t,n,i){const s=e._adapter,o=+s.startOf(t[0].value,i),r=t[t.length-1].value;let a,l;for(a=o;a<=r;a=+s.add(a,1,i))l=n[a],l>=0&&(t[l].major=!0);return t}function Bu(e,t,n){const i=[],s={},o=t.length;let r,a;for(r=0;r<o;++r)a=t[r],s[a]=r,i.push({value:a,major:!1});return o===0||!n?i:u2(e,i,s,n)}class xo extends ni{constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,n={}){const i=t.time||(t.time={}),s=this._adapter=new r$._date(t.adapters.date);s.init(n),Di(i.displayFormats,s.formats()),this._parseOpts={parser:i.parser,round:i.round,isoWeekday:i.isoWeekday},super.init(t),this._normalized=n.normalized}parse(t,n){return t===void 0?null:Ou(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const t=this.options,n=this._adapter,i=t.time.unit||"day";let{min:s,max:o,minDefined:r,maxDefined:a}=this.getUserBounds();function l(c){!r&&!isNaN(c.min)&&(s=Math.min(s,c.min)),!a&&!isNaN(c.max)&&(o=Math.max(o,c.max))}(!r||!a)&&(l(this._getLabelBounds()),(t.bounds!=="ticks"||t.ticks.source!=="labels")&&l(this.getMinMax(!1))),s=Pe(s)&&!isNaN(s)?s:+n.startOf(Date.now(),i),o=Pe(o)&&!isNaN(o)?o:+n.endOf(Date.now(),i)+1,this.min=Math.min(s,o-1),this.max=Math.max(s+1,o)}_getLabelBounds(){const t=this.getLabelTimestamps();let n=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY;return t.length&&(n=t[0],i=t[t.length-1]),{min:n,max:i}}buildTicks(){const t=this.options,n=t.time,i=t.ticks,s=i.source==="labels"?this.getLabelTimestamps():this._generate();t.bounds==="ticks"&&s.length&&(this.min=this._userMin||s[0],this.max=this._userMax||s[s.length-1]);const o=this.min,r=this.max,a=N1(s,o,r);return this._unit=n.unit||(i.autoSkip?Fu(n.minUnit,this.min,this.max,this._getLabelCapacity(o)):c2(this,a.length,n.minUnit,this.min,this.max)),this._majorUnit=!i.major.enabled||this._unit==="year"?void 0:d2(this._unit),this.initOffsets(s),t.reverse&&a.reverse(),Bu(this,a,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(t=>+t.value))}initOffsets(t=[]){let n=0,i=0,s,o;this.options.offset&&t.length&&(s=this.getDecimalForValue(t[0]),t.length===1?n=1-s:n=(this.getDecimalForValue(t[1])-s)/2,o=this.getDecimalForValue(t[t.length-1]),t.length===1?i=o:i=(o-this.getDecimalForValue(t[t.length-2]))/2);const r=t.length<3?.5:.25;n=We(n,0,r),i=We(i,0,r),this._offsets={start:n,end:i,factor:1/(n+1+i)}}_generate(){const t=this._adapter,n=this.min,i=this.max,s=this.options,o=s.time,r=o.unit||Fu(o.minUnit,n,i,this._getLabelCapacity(n)),a=X(s.ticks.stepSize,1),l=r==="week"?o.isoWeekday:!1,c=Qi(l)||l===!0,d={};let u=n,h,g;if(c&&(u=+t.startOf(u,"isoWeek",l)),u=+t.startOf(u,c?"day":r),t.diff(i,n,r)>1e5*a)throw new Error(n+" and "+i+" are too far apart with stepSize of "+a+" "+r);const v=s.ticks.source==="data"&&this.getDataTimestamps();for(h=u,g=0;h<i;h=+t.add(h,a,r),g++)Nu(d,h,v);return(h===i||s.bounds==="ticks"||g===1)&&Nu(d,h,v),Object.keys(d).sort(Iu).map(b=>+b)}getLabelForValue(t){const n=this._adapter,i=this.options.time;return i.tooltipFormat?n.format(t,i.tooltipFormat):n.format(t,i.displayFormats.datetime)}format(t,n){const s=this.options.time.displayFormats,o=this._unit,r=n||s[o];return this._adapter.format(t,r)}_tickFormatFunction(t,n,i,s){const o=this.options,r=o.ticks.callback;if(r)return ue(r,[t,n,i],this);const a=o.time.displayFormats,l=this._unit,c=this._majorUnit,d=l&&a[l],u=c&&a[c],h=i[n],g=c&&u&&h&&h.major;return this._adapter.format(t,s||(g?u:d))}generateTickLabels(t){let n,i,s;for(n=0,i=t.length;n<i;++n)s=t[n],s.label=this._tickFormatFunction(s.value,n,t)}getDecimalForValue(t){return t===null?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){const n=this._offsets,i=this.getDecimalForValue(t);return this.getPixelForDecimal((n.start+i)*n.factor)}getValueForPixel(t){const n=this._offsets,i=this.getDecimalForPixel(t)/n.factor-n.end;return this.min+i*(this.max-this.min)}_getLabelSize(t){const n=this.options.ticks,i=this.ctx.measureText(t).width,s=dn(this.isHorizontal()?n.maxRotation:n.minRotation),o=Math.cos(s),r=Math.sin(s),a=this._resolveTickFontOptions(0).size;return{w:i*o+a*r,h:i*r+a*o}}_getLabelCapacity(t){const n=this.options.time,i=n.displayFormats,s=i[n.unit]||i.millisecond,o=this._tickFormatFunction(t,0,Bu(this,[t],this._majorUnit),s),r=this._getLabelSize(o),a=Math.floor(this.isHorizontal()?this.width/r.w:this.height/r.h)-1;return a>0?a:1}getDataTimestamps(){let t=this._cache.data||[],n,i;if(t.length)return t;const s=this.getMatchingVisibleMetas();if(this._normalized&&s.length)return this._cache.data=s[0].controller.getAllParsedValues(this);for(n=0,i=s.length;n<i;++n)t=t.concat(s[n].controller.getAllParsedValues(this));return this._cache.data=this.normalize(t)}getLabelTimestamps(){const t=this._cache.labels||[];let n,i;if(t.length)return t;const s=this.getLabels();for(n=0,i=s.length;n<i;++n)t.push(Ou(this,s[n]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return z1(t.sort(Iu))}}H(xo,"id","time"),H(xo,"defaults",{bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}});function Fs(e,t,n){let i=0,s=e.length-1,o,r,a,l;n?(t>=e[i].pos&&t<=e[s].pos&&({lo:i,hi:s}=un(e,"pos",t)),{pos:o,time:a}=e[i],{pos:r,time:l}=e[s]):(t>=e[i].time&&t<=e[s].time&&({lo:i,hi:s}=un(e,"time",t)),{time:o,pos:a}=e[i],{time:r,pos:l}=e[s]);const c=r-o;return c?a+(l-a)*(t-o)/c:a}class zu extends xo{constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const t=this._getTimestampsForTable(),n=this._table=this.buildLookupTable(t);this._minPos=Fs(n,this.min),this._tableRange=Fs(n,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){const{min:n,max:i}=this,s=[],o=[];let r,a,l,c,d;for(r=0,a=t.length;r<a;++r)c=t[r],c>=n&&c<=i&&s.push(c);if(s.length<2)return[{time:n,pos:0},{time:i,pos:1}];for(r=0,a=s.length;r<a;++r)d=s[r+1],l=s[r-1],c=s[r],Math.round((d+l)/2)!==c&&o.push({time:c,pos:r/(a-1)});return o}_generate(){const t=this.min,n=this.max;let i=super.getDataTimestamps();return(!i.includes(t)||!i.length)&&i.splice(0,0,t),(!i.includes(n)||i.length===1)&&i.push(n),i.sort((s,o)=>s-o)}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;const n=this.getDataTimestamps(),i=this.getLabelTimestamps();return n.length&&i.length?t=this.normalize(n.concat(i)):t=n.length?n:i,t=this._cache.all=t,t}getDecimalForValue(t){return(Fs(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){const n=this._offsets,i=this.getDecimalForPixel(t)/n.factor-n.end;return Fs(this._table,i*this._tableRange+this._minPos,!0)}}H(zu,"id","timeseries"),H(zu,"defaults",xo.defaults);var h2=Object.defineProperty,f2=Object.getOwnPropertyDescriptor,os=(e,t,n,i)=>{for(var s=i>1?void 0:i?f2(t,n):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(s=(i?r(t,n,s):r(s))||s);return i&&s&&h2(t,n,s),s};mt.register(Vs,Ot,Ys,Aa,Sa,i2,QS,qS);let Tn=class extends fn{constructor(){super(...arguments),this.quotationByTime=[],this.oosByTime=[],this.shortageByTime=[],this.loading=!1,this.quotationChart=null,this.stockChart=null}render(){return f`
      <div class="chart-card">
        <div class="chart-title">${p("overview.dashboard.chart.quotationTrend")}</div>
        ${this.loading?f`<div class="empty">${p("overview.dashboard.chart.loading")}</div>`:this.quotationByTime.length===0?f`<div class="empty">${p("overview.dashboard.chart.empty")}</div>`:f`<div class="chart-wrap"><canvas id="quotation-chart"></canvas></div>`}
      </div>
      <div class="chart-card">
        <div class="chart-title">${p("overview.dashboard.chart.stockTrend")}</div>
        ${this.loading?f`<div class="empty">${p("overview.dashboard.chart.loading")}</div>`:this.oosByTime.length===0&&this.shortageByTime.length===0?f`<div class="empty">${p("overview.dashboard.chart.empty")}</div>`:f`<div class="chart-wrap"><canvas id="stock-chart"></canvas></div>`}
      </div>
    `}updated(){this.renderQuotationChart(),this.renderStockChart()}disconnectedCallback(){var e,t;super.disconnectedCallback(),(e=this.quotationChart)==null||e.destroy(),(t=this.stockChart)==null||t.destroy(),this.quotationChart=null,this.stockChart=null}renderQuotationChart(){var i,s,o;const e=(i=this.shadowRoot)==null?void 0:i.getElementById("quotation-chart");if(!e){(s=this.quotationChart)==null||s.destroy(),this.quotationChart=null;return}(o=this.quotationChart)==null||o.destroy();const t=this.quotationByTime.map(r=>(r.date??"").slice(5)),n=this.quotationByTime.map(r=>Number(r.count??0));this.quotationChart=new mt(e,{type:"line",data:{labels:t,datasets:[{label:p("overview.dashboard.chart.quotationSeries"),data:n,borderColor:"#4f8ef7",backgroundColor:"rgba(79,142,247,0.14)",fill:!0,tension:.35,pointRadius:2}]},options:{responsive:!0,maintainAspectRatio:!1,animation:!1,plugins:{legend:{display:!1}},scales:{x:{ticks:{font:{size:12}}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:12}}}},elements:{line:{borderWidth:3},point:{radius:3}}}})}renderStockChart(){var o,r,a;const e=(o=this.shadowRoot)==null?void 0:o.getElementById("stock-chart");if(!e){(r=this.stockChart)==null||r.destroy(),this.stockChart=null;return}(a=this.stockChart)==null||a.destroy();const t=[...new Set([...this.oosByTime.map(l=>l.date??""),...this.shortageByTime.map(l=>l.date??"")])].filter(Boolean).sort(),n=t.map(l=>l.slice(5)),i=Object.fromEntries(this.oosByTime.map(l=>[l.date??"",Number(l.count??0)])),s=Object.fromEntries(this.shortageByTime.map(l=>[l.date??"",Number(l.count??0)]));this.stockChart=new mt(e,{type:"line",data:{labels:n,datasets:[{label:p("overview.dashboard.chart.oosSeries"),data:t.map(l=>i[l]??0),borderColor:"#e25555",backgroundColor:"rgba(226,85,85,0.12)",fill:!0,tension:.35,pointRadius:2},{label:p("overview.dashboard.chart.shortageSeries"),data:t.map(l=>s[l]??0),borderColor:"#f5a623",backgroundColor:"rgba(245,166,35,0.12)",fill:!0,tension:.35,pointRadius:2}]},options:{responsive:!0,maintainAspectRatio:!1,animation:!1,plugins:{legend:{display:!0,position:"top",labels:{font:{size:12}}}},scales:{x:{ticks:{font:{size:12}}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:12}}}},elements:{line:{borderWidth:3},point:{radius:3}}}})}};Tn.styles=qu`
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
  `;os([Kt({attribute:!1})],Tn.prototype,"quotationByTime",2);os([Kt({attribute:!1})],Tn.prototype,"oosByTime",2);os([Kt({attribute:!1})],Tn.prototype,"shortageByTime",2);os([Kt({type:Boolean})],Tn.prototype,"loading",2);Tn=os([La("dashboard-charts")],Tn);function p2(e){var c,d,u,h,g,v,b,y,S;const t=(c=e.hello)==null?void 0:c.snapshot,n=t!=null&&t.uptimeMs?ah(t.uptimeMs):p("common.na"),i=(d=t==null?void 0:t.policy)!=null&&d.tickIntervalMs?`${t.policy.tickIntervalMs}ms`:p("common.na"),o=(t==null?void 0:t.authMode)==="trusted-proxy",r=(()=>{if(e.connected||!e.lastError)return null;const E=e.lastError.toLowerCase();if(!(E.includes("unauthorized")||E.includes("connect failed")))return null;const T=!!e.settings.token.trim(),C=!!e.password.trim();return!T&&!C?f`
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
    `})(),a=(()=>{if(e.connected||!e.lastError||(typeof window<"u"?window.isSecureContext:!0))return null;const L=e.lastError.toLowerCase();return!L.includes("secure context")&&!L.includes("device identity required")?null:f`
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
    `})(),l=bn.getLocale();return f`
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
            ${p("overview.stats.cronNext",{time:rf(e.cronNext)})}
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
              @input=${E=>{const L=E.target.value;e.onSettingsChange({...e.settings,gatewayUrl:L})}}
              placeholder="ws://100.x.y.z:18789"
            />
          </label>
          ${o?"":f`
                <label class="field">
                  <span>${p("overview.access.token")}</span>
                  <input
                    .value=${e.settings.token}
                    @input=${E=>{const L=E.target.value;e.onSettingsChange({...e.settings,token:L})}}
                    placeholder="JAGENT_GATEWAY_TOKEN"
                  />
                </label>
                <label class="field">
                  <span>${p("overview.access.password")}</span>
                  <input
                    type="password"
                    .value=${e.password}
                    @input=${E=>{const L=E.target.value;e.onPasswordChange(L)}}
                    placeholder="system or shared password"
                  />
                </label>
              `}
          <label class="field">
            <span>${p("overview.access.sessionKey")}</span>
            <input
              .value=${e.settings.sessionKey}
              @input=${E=>{const L=E.target.value;e.onSessionKeyChange(L)}}
            />
          </label>
          <label class="field">
            <span>${p("overview.access.language")}</span>
            <select
              .value=${l}
          style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 160px;"
              @change=${E=>{const L=E.target.value;bn.setLocale(L),e.onSettingsChange({...e.settings,locale:L})}}
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
              ${e.lastChannelsRefresh?Cn(e.lastChannelsRefresh):p("common.na")}
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
          <div class="stat-value">${((v=e.quotationStats)==null?void 0:v.today_count)??"—"}</div>
          <div class="stat-label">${p("overview.dashboard.kpi.todayNewQuotations")}</div>
        </div>
        <div class="card stat-card" style="min-width: 130px;">
          <div class="stat-value">${((b=e.quotationStats)==null?void 0:b.shortage_count)??"—"}</div>
          <div class="stat-label">${p("overview.dashboard.kpi.shortageQuotations")}</div>
        </div>
        <div class="card stat-card" style="min-width: 130px;">
          <div class="stat-value">${((y=e.quotationStats)==null?void 0:y.replenishment_count)??"—"}</div>
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
  `}function g2(e){var o;const t=((o=e.report)==null?void 0:o.skills)??[],n=e.filter.trim().toLowerCase(),i=n?t.filter(r=>[r.name,r.description,r.source].join(" ").toLowerCase().includes(n)):t,s=cf(i);return f`
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

      ${e.error?f`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:$}

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
                      ${r.skills.map(l=>m2(l,e))}
                    </div>
                  </details>
                `})}
            </div>
          `}
    </section>
  `}function m2(e,t){const n=t.busyKey===e.skillKey,i=t.edits[e.skillKey]??"",s=t.messages[e.skillKey]??null,o=e.install.length>0&&e.missing.bins.length>0,r=!!(e.bundled&&e.source!=="openclaw-bundled"),a=df(e),l=uf(e);return f`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">
          ${e.emoji?`${e.emoji} `:""}${e.name}
        </div>
        <div class="list-sub">${Kr(e.description,140)}</div>
        ${hf({skill:e,showBundledBadge:r})}
        ${a.length>0?f`
              <div class="muted" style="margin-top: 6px;">
                Missing: ${a.join(", ")}
              </div>
            `:$}
        ${l.length>0?f`
              <div class="muted" style="margin-top: 6px;">
                Reason: ${l.join(", ")}
              </div>
            `:$}
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
              </button>`:$}
        </div>
        ${s?f`<div
              class="muted"
              style="margin-top: 8px; color: ${s.kind==="error"?"var(--danger-color, #d14343)":"var(--success-color, #0a7f5a)"};"
            >
              ${s.message}
            </div>`:$}
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
            `:$}
      </div>
    </div>
  `}const v2=/^data:/i,y2=/^https?:\/\//i;function b2(e){var a,l;const t=((a=e.agentsList)==null?void 0:a.agents)??[],n=nh(e.sessionKey),i=(n==null?void 0:n.agentId)??((l=e.agentsList)==null?void 0:l.defaultId)??"main",s=t.find(c=>c.id===i),o=s==null?void 0:s.identity,r=(o==null?void 0:o.avatarUrl)??(o==null?void 0:o.avatar);if(r)return v2.test(r)||y2.test(r)?r:o==null?void 0:o.avatarUrl}function x2(e){var v,b,y,S,E,L,T,C,M;const t=e.presenceEntries.length,n=((v=e.sessionsResult)==null?void 0:v.count)??null,i=((b=e.cronStatus)==null?void 0:b.nextWakeAtMs)??null,s=e.connected?null:p("chat.disconnected"),o=e.tab==="chat",r=o&&(e.settings.chatFocusMode||e.onboarding),a=e.onboarding?!1:e.settings.chatShowThinking,l=b2(e),c=e.chatAvatarUrl??l??null,d=e.configForm??((y=e.configSnapshot)==null?void 0:y.config),u=ei(e.basePath??""),h=e.agentsSelectedId??((S=e.agentsList)==null?void 0:S.defaultId)??((T=(L=(E=e.agentsList)==null?void 0:E.agents)==null?void 0:L[0])==null?void 0:T.id)??null,g=bn.getLocale();return f`
    <div class="shell ${o?"shell--chat":""} ${r?"shell--chat-focus":""} ${e.settings.navCollapsed?"shell--nav-collapsed":""} ${e.onboarding?"shell--onboarding":""}">
      <header class="topbar">
        <div class="topbar-left">
          <button
            class="nav-collapse-toggle"
            @click=${()=>e.applySettings({...e.settings,navCollapsed:!e.settings.navCollapsed})}
            title="${e.settings.navCollapsed?p("nav.expand"):p("nav.collapse")}"
            aria-label="${e.settings.navCollapsed?p("nav.expand"):p("nav.collapse")}"
          >
            <span class="nav-collapse-toggle__icon">${be.menu}</span>
          </button>
          <div class="brand">
            <div class="brand-logo">
              <img src=${u?`${u}/favicon.svg`:"/favicon.svg"} alt="PT Vansting Agent" />
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
          ${Tb(e)}
          <label class="topbar-lang">
            <span class="sr-only">${p("overview.access.language")}</span>
            <select
              .value=${g}
              style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 140px;"
              @change=${m=>{const k=m.target.value;bn.setLocale(k),e.applySettings({...e.settings,locale:k})}}
            >
              <option value="en">${p("languages.en")}</option>
              <option value="zh-CN">${p("languages.zhCN")}</option>
            </select>
          </label>
        </div>
      </header>
      <aside class="nav ${e.settings.navCollapsed?"nav--collapsed":""}">
        ${$v.map(m=>{const k=e.settings.navGroupsCollapsed[m.label]??!1,R=m.tabs.some(D=>D===e.tab);return f`
            <div class="nav-group ${k&&!R?"nav-group--collapsed":""}">
              <button
                class="nav-label"
                @click=${()=>{const D={...e.settings.navGroupsCollapsed};D[m.label]=!k,e.applySettings({...e.settings,navGroupsCollapsed:D})}}
                aria-expanded=${!k}
              >
                <span class="nav-label__text">${p(`nav.${m.label}`)}</span>
                <span class="nav-label__chevron">${k?"+":"−"}</span>
              </button>
              <div class="nav-group__items">
                ${m.tabs.map(D=>xb(e,D))}
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
              <span class="nav-item__icon" aria-hidden="true">${be.book}</span>
              <span class="nav-item__text">${p("common.docs")}</span>
            </a>
          </div>
        </div>
      </aside>
      <main class="content ${o?"content--chat":""}">
        <section class="content-header">
          <div>
            ${e.tab==="work"?$:f`<div class="page-title">${Yr(e.tab)}</div>`}
            ${e.tab==="work"?$:f`<div class="page-sub">${Tv(e.tab)}</div>`}
          </div>
          <div class="page-meta">
            ${e.lastError?f`<div class="pill danger">${e.lastError}</div>`:$}
            ${o?wb(e):$}
          </div>
        </section>

        ${e.tab==="overview"?p2({connected:e.connected,hello:e.hello,settings:e.settings,password:e.password,lastError:e.lastError,presenceCount:t,sessionsCount:n,cronEnabled:((C=e.cronStatus)==null?void 0:C.enabled)??null,cronNext:i,lastChannelsRefresh:e.channelsLastSuccess,oosStats:e.overviewOosStats,shortageStats:e.overviewShortageStats,quotationStats:e.quotationStats,oosByTime:e.dashboardOosByTime,shortageByTime:e.dashboardShortageByTime,dashboardLoading:e.dashboardLoading,dashboardError:e.dashboardError,onSettingsChange:m=>e.applySettings(m),onPasswordChange:m=>e.password=m,onSessionKeyChange:m=>{e.sessionKey=m,e.chatMessage="",e.resetToolStream(),e.applySettings({...e.settings,sessionKey:m,lastActiveSessionKey:m}),e.loadAssistantIdentity()},onConnect:()=>e.connect(),onRefresh:()=>e.loadOverview()}):$}

        ${e.tab==="channels"?fx({loading:e.bkLoading,saving:e.bkSaving,error:e.bkError,content:e.bkContent,lastSuccessAt:e.bkLastSuccess,dependentFiles:e.bkDependentFiles,onReload:()=>rh(e),onSave:m=>Gg(e,m),onContentChange:m=>e.bkContent=m}):$}

        ${e.tab==="instances"?f`
                ${h_({loading:e.oosLoading,error:e.oosError,stats:e.oosStats,list:e.oosList,byFile:e.oosByFile,byTime:e.oosByTime,db:e.oosDb??void 0,onRefresh:()=>To(e),onDelete:m=>ev(e,m),showAddForm:e.oosShowAddForm,onOpenAddForm:()=>e.oosShowAddForm=!0,onCloseAddForm:()=>e.oosShowAddForm=!1,onAdd:async m=>{const k=await tv(e,m);return k&&(e.oosShowAddForm=!1),k}})}
                ${v_({loading:e.shortageLoading,error:e.shortageError,stats:e.shortageStats,list:e.shortageList,byFile:e.shortageByFile,byTime:e.shortageByTime,db:e.shortageDb??void 0,onRefresh:()=>Co(e),onDelete:m=>iv(e,m),showAddForm:e.shortageShowAddForm,onOpenAddForm:()=>e.shortageShowAddForm=!0,onCloseAddForm:()=>e.shortageShowAddForm=!1,onAdd:async m=>{const k=await sv(e,m);return k&&(e.shortageShowAddForm=!1),k}})}
              `:$}

        ${e.tab==="sessions"?Zw({basePath:e.basePath,loading:e.procurementLoading,error:e.procurementError,suggestions:e.procurementSuggestions,selectedKeys:e.procurementSelectedKeys,approvedKeys:e.procurementApprovedKeys,approveBusy:e.procurementApproveBusy,approveResult:e.procurementApproveResult,filterQuery:e.procurementFilterQuery,sortBy:e.procurementSortBy,sortDir:e.procurementSortDir,page:e.procurementPage,pageSize:e.procurementPageSize,replenishmentDrafts:e.replenishmentDrafts,replenishmentDetail:e.replenishmentDetail,replenishmentDetailId:e.replenishmentDetailId,replenishmentLoading:e.replenishmentLoading,replenishmentError:e.replenishmentError,replenishmentConfirmBusy:e.replenishmentConfirmBusy,replenishmentConfirmResult:e.replenishmentConfirmResult,replenishmentInputLines:e.replenishmentInputLines,replenishmentCreateBusy:e.replenishmentCreateBusy,onReplenishmentLineChange:(m,k,R)=>e.onReplenishmentLineChange(m,k,R),onReplenishmentAddLine:()=>e.onReplenishmentAddLine(),onReplenishmentRemoveLine:m=>e.onReplenishmentRemoveLine(m),onCreateReplenishmentDraft:()=>e.createProcurementReplenishmentDraft(),onReplenishmentRefresh:()=>e.loadProcurementReplenishment(),onSelectReplenishmentDraft:m=>{e.loadProcurementReplenishmentDetail(m)},onConfirmReplenishment:m=>{typeof window<"u"&&!window.confirm(p("replenishment.confirmPrompt"))||e.confirmProcurementReplenishment(m)},onDeleteReplenishmentDraft:m=>{typeof window<"u"&&!window.confirm(p("replenishment.deleteConfirm"))||e.deleteProcurementReplenishmentDraft(m)},onClearReplenishmentDetail:()=>{e.replenishmentDetail=null,e.replenishmentDetailId=null},onRefresh:()=>(e.procurementPage=1,e.loadProcurementSuggestions()),onToggleSelect:m=>{e.procurementSelectedKeys.includes(m)?e.procurementSelectedKeys=e.procurementSelectedKeys.filter(k=>k!==m):e.procurementSelectedKeys=[...e.procurementSelectedKeys,m]},onApprove:m=>{if(typeof window<"u"&&!window.confirm(p("procurement.approveConfirm")))return;const k=[{product_key:m.product_key,product_name:m.product_name,specification:m.specification,shortfall:m.shortfall,code:m.code}];fc(e,k).then(R=>{R&&(R.approved_count??0)>0&&(e.procurementApprovedKeys=[...e.procurementApprovedKeys,Je(m)])})},onApproveBatch:()=>{const m=e.procurementSuggestions.filter(R=>e.procurementSelectedKeys.includes(Je(R)));if(m.length===0||typeof window<"u"&&!window.confirm(p("procurement.approveBatchConfirm",{count:String(m.length)})))return;const k=m.map(R=>({product_key:R.product_key,product_name:R.product_name,specification:R.specification,shortfall:R.shortfall,code:R.code}));fc(e,k).then(R=>{if(R&&(R.approved_count??0)>0){const D=m.map(P=>Je(P));e.procurementApprovedKeys=[...e.procurementApprovedKeys,...D],e.procurementSelectedKeys=e.procurementSelectedKeys.filter(P=>!D.includes(P))}})},onFilterQueryChange:m=>{e.procurementFilterQuery=m,e.procurementPage=1},onSortByChange:m=>{e.procurementSortBy=m,e.procurementPage=1},onSortDirChange:m=>{e.procurementSortDir=m,e.procurementPage=1},onPageChange:m=>{e.procurementPage=Math.max(1,m)},onPageSizeChange:m=>{e.procurementPageSize=Math.max(1,m),e.procurementPage=1}}):$}

        ${hb(e)}

        ${e.tab==="cron"?Xw({basePath:e.basePath,loading:e.fulfillDraftsLoading,error:e.fulfillDraftsError,drafts:e.fulfillDrafts,detail:e.fulfillDetail,detailId:e.fulfillDetailId,confirmBusy:e.fulfillConfirmBusy,confirmResult:e.fulfillConfirmResult,filterQuery:e.fulfillFilterQuery,sortBy:e.fulfillSortBy,sortDir:e.fulfillSortDir,page:e.fulfillPage,pageSize:e.fulfillPageSize,onRefresh:()=>(e.fulfillPage=1,e.loadFulfillDrafts()),onSelectDraft:m=>sm(e,m),onConfirm:m=>{var F;const k=e.fulfillDetailId===m?e.fulfillDetail:null,R=((F=k==null?void 0:k.lines)==null?void 0:F.length)??0,D=((k==null?void 0:k.lines)??[]).reduce((N,B)=>N+Number(B.amount??0),0),P=R>0?p("fulfill.confirmPrompt",{count:String(R),amount:D.toFixed(2)}):p("fulfill.confirmPromptSimple");typeof window<"u"&&window.confirm(P)&&om(e,m).then(N=>{N!=null&&N.order_id&&e.loadProcurementSuggestions()})},onClearDetail:()=>{e.fulfillDetail=null,e.fulfillDetailId=null,e.fulfillConfirmResult=null},onFilterQueryChange:m=>{e.fulfillFilterQuery=m,e.fulfillPage=1},onSortByChange:m=>{e.fulfillSortBy=m,e.fulfillPage=1},onSortDirChange:m=>{e.fulfillSortDir=m,e.fulfillPage=1},onPageChange:m=>{e.fulfillPage=Math.max(1,m)},onPageSizeChange:m=>{e.fulfillPageSize=Math.max(1,m),e.fulfillPage=1}}):$}

        ${e.tab==="agents"?cx({loading:e.agentsLoading,error:e.agentsError,agentsList:e.agentsList,selectedAgentId:h,activePanel:e.agentsPanel,configForm:d,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,channelsLoading:e.channelsLoading,channelsError:e.channelsError,channelsSnapshot:e.channelsSnapshot,channelsLastSuccess:e.channelsLastSuccess,cronLoading:e.cronLoading,cronStatus:e.cronStatus,cronJobs:e.cronJobs,cronError:e.cronError,agentFilesLoading:e.agentFilesLoading,agentFilesError:e.agentFilesError,agentFilesList:e.agentFilesList,agentFileActive:e.agentFileActive,agentFileContents:e.agentFileContents,agentFileDrafts:e.agentFileDrafts,agentFileSaving:e.agentFileSaving,agentIdentityLoading:e.agentIdentityLoading,agentIdentityError:e.agentIdentityError,agentIdentityById:e.agentIdentityById,agentSkillsLoading:e.agentSkillsLoading,agentSkillsReport:e.agentSkillsReport,agentSkillsError:e.agentSkillsError,agentSkillsAgentId:e.agentSkillsAgentId,skillsFilter:e.skillsFilter,reportsLoading:e.reportsLoading,reportsError:e.reportsError,reportsTasks:e.reportsTasks,reportsRecords:e.reportsRecords,reportsAdminToken:e.reportsAdminToken,reportsEditingTaskId:e.reportsEditingTaskId,reportsEditForm:e.reportsEditForm,onRefresh:async()=>{var k,R;await Ba(e);const m=((R=(k=e.agentsList)==null?void 0:k.agents)==null?void 0:R.map(D=>D.id))??[];m.length>0&&oh(e,m)},onSelectAgent:m=>{e.agentsSelectedId!==m&&(e.agentsSelectedId=m,e.agentFilesList=null,e.agentFilesError=null,e.agentFilesLoading=!1,e.agentFileActive=null,e.agentFileContents={},e.agentFileDrafts={},e.agentSkillsReport=null,e.agentSkillsError=null,e.agentSkillsAgentId=null,sh(e,m),e.agentsPanel==="files"&&xr(e,m),e.agentsPanel==="skills"&&Hs(e,m))},onSelectPanel:m=>{var k;e.agentsPanel=m,m==="files"&&h&&((k=e.agentFilesList)==null?void 0:k.agentId)!==h&&(e.agentFilesList=null,e.agentFilesError=null,e.agentFileActive=null,e.agentFileContents={},e.agentFileDrafts={},xr(e,h)),m==="skills"&&(h&&Hs(e,h),mn(e)),m==="channels"&&Qe(e,!1),m==="cron"&&e.loadCron()},onLoadFiles:m=>xr(e,m),onSelectFile:m=>{e.agentFileActive=m,h&&Lb(e,h,m)},onFileDraftChange:(m,k)=>{e.agentFileDrafts={...e.agentFileDrafts,[m]:k}},onFileReset:m=>{const k=e.agentFileContents[m]??"";e.agentFileDrafts={...e.agentFileDrafts,[m]:k}},onFileSave:m=>{if(!h)return;const k=e.agentFileDrafts[m]??e.agentFileContents[m]??"";Pb(e,h,m,k)},onToolsProfileChange:(m,k,R)=>{var N;if(!d)return;const D=(N=d.agents)==null?void 0:N.list;if(!Array.isArray(D))return;const P=D.findIndex(B=>B&&typeof B=="object"&&"id"in B&&B.id===m);if(P<0)return;const F=["agents","list",P,"tools"];k?je(e,[...F,"profile"],k):_t(e,[...F,"profile"]),R&&_t(e,[...F,"allow"])},onToolsOverridesChange:(m,k,R)=>{var N;if(!d)return;const D=(N=d.agents)==null?void 0:N.list;if(!Array.isArray(D))return;const P=D.findIndex(B=>B&&typeof B=="object"&&"id"in B&&B.id===m);if(P<0)return;const F=["agents","list",P,"tools"];k.length>0?je(e,[...F,"alsoAllow"],k):_t(e,[...F,"alsoAllow"]),R.length>0?je(e,[...F,"deny"],R):_t(e,[...F,"deny"])},onConfigReload:()=>yt(e),onConfigSave:()=>zs(e),onChannelsRefresh:()=>Qe(e,!1),onCronRefresh:()=>e.loadCron(),onSkillsFilterChange:m=>e.skillsFilter=m,onSkillsRefresh:()=>{h&&Hs(e,h)},onAgentSkillToggle:(m,k,R)=>{var z,J,ge;if(!d)return;const D=(z=d.agents)==null?void 0:z.list;if(!Array.isArray(D))return;const P=D.findIndex(Q=>Q&&typeof Q=="object"&&"id"in Q&&Q.id===m);if(P<0)return;const F=D[P],N=k.trim();if(!N)return;const B=((ge=(J=e.agentSkillsReport)==null?void 0:J.skills)==null?void 0:ge.map(Q=>Q.name).filter(Boolean))??[],V=(Array.isArray(F.skills)?F.skills.map(Q=>String(Q).trim()).filter(Boolean):void 0)??B,le=new Set(V);R?le.add(N):le.delete(N),je(e,["agents","list",P,"skills"],[...le])},onAgentSkillsClear:m=>{var D;if(!d)return;const k=(D=d.agents)==null?void 0:D.list;if(!Array.isArray(k))return;const R=k.findIndex(P=>P&&typeof P=="object"&&"id"in P&&P.id===m);R<0||_t(e,["agents","list",R,"skills"])},onAgentSkillsDisableAll:m=>{var D;if(!d)return;const k=(D=d.agents)==null?void 0:D.list;if(!Array.isArray(k))return;const R=k.findIndex(P=>P&&typeof P=="object"&&"id"in P&&P.id===m);R<0||je(e,["agents","list",R,"skills"],[])},onReportsTokenChange:m=>{e.reportsAdminToken=m},onReportsRefresh:()=>{mn(e)},onReportsRun:m=>{xc(e,m)},onReportsEditStart:m=>{e.reportsEditingTaskId=m.task_key,e.reportsEditForm={enabled:m.enabled,cron_expr:m.cron_expr,timezone:m.timezone,title:m.title}},onReportsEditCancel:()=>{e.reportsEditingTaskId=null,e.reportsEditForm={}},onReportsEditChange:m=>{e.reportsEditForm=m},onReportsEditSave:m=>{const k=e.reportsEditForm;wc(e,m,k).then(()=>{e.reportsError||(e.reportsEditingTaskId=null,e.reportsEditForm={})})},onModelChange:(m,k)=>{var B;if(!d)return;const R=(B=d.agents)==null?void 0:B.list;if(!Array.isArray(R))return;const D=R.findIndex(I=>I&&typeof I=="object"&&"id"in I&&I.id===m);if(D<0)return;const P=["agents","list",D,"model"];if(!k){_t(e,P);return}const F=R[D],N=F==null?void 0:F.model;if(N&&typeof N=="object"&&!Array.isArray(N)){const I=N.fallbacks,V={primary:k,...Array.isArray(I)?{fallbacks:I}:{}};je(e,P,V)}else je(e,P,k)},onModelFallbacksChange:(m,k)=>{var z;if(!d)return;const R=(z=d.agents)==null?void 0:z.list;if(!Array.isArray(R))return;const D=R.findIndex(J=>J&&typeof J=="object"&&"id"in J&&J.id===m);if(D<0)return;const P=["agents","list",D,"model"],F=R[D],N=k.map(J=>J.trim()).filter(Boolean),B=F.model,V=(()=>{if(typeof B=="string")return B.trim()||null;if(B&&typeof B=="object"&&!Array.isArray(B)){const J=B.primary;if(typeof J=="string")return J.trim()||null}return null})();if(N.length===0){V?je(e,P,V):_t(e,P);return}je(e,P,V?{primary:V,fallbacks:N}:{fallbacks:N})}}):$}

        ${e.tab==="skills"?g2({loading:e.skillsLoading,report:e.skillsReport,error:e.skillsError,filter:e.skillsFilter,edits:e.skillEdits,messages:e.skillMessages,busyKey:e.skillsBusyKey,onFilterChange:m=>e.skillsFilter=m,onRefresh:()=>es(e,{clearMessages:!0}),onToggle:(m,k)=>lv(e,m,k),onEdit:(m,k)=>av(e,m,k),onSaveKey:m=>cv(e,m),onInstall:(m,k,R)=>dv(e,m,k,R)}):$}

        ${e.tab==="nodes"?O_({loading:e.nodesLoading,nodes:e.nodes,devicesLoading:e.devicesLoading,devicesError:e.devicesError,devicesList:e.devicesList,configForm:e.configForm??((M=e.configSnapshot)==null?void 0:M.config),configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,configFormMode:e.configFormMode,execApprovalsLoading:e.execApprovalsLoading,execApprovalsSaving:e.execApprovalsSaving,execApprovalsDirty:e.execApprovalsDirty,execApprovalsSnapshot:e.execApprovalsSnapshot,execApprovalsForm:e.execApprovalsForm,execApprovalsSelectedAgent:e.execApprovalsSelectedAgent,execApprovalsTarget:e.execApprovalsTarget,execApprovalsTargetNodeId:e.execApprovalsTargetNodeId,onRefresh:()=>$o(e),onDevicesRefresh:()=>Gt(e),onDeviceApprove:m=>jm(e,m),onDeviceReject:m=>Km(e,m),onDeviceRotate:(m,k,R)=>Wm(e,{deviceId:m,role:k,scopes:R}),onDeviceRevoke:(m,k)=>Vm(e,{deviceId:m,role:k}),onLoadConfig:()=>yt(e),onLoadExecApprovals:()=>{const m=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return Ya(e,m)},onBindDefault:m=>{m?je(e,["tools","exec","node"],m):_t(e,["tools","exec","node"])},onBindAgent:(m,k)=>{const R=["agents","list",m,"tools","exec","node"];k?je(e,R,k):_t(e,R)},onSaveBindings:()=>zs(e),onExecApprovalsTargetChange:(m,k)=>{e.execApprovalsTarget=m,e.execApprovalsTargetNodeId=k,e.execApprovalsSnapshot=null,e.execApprovalsForm=null,e.execApprovalsDirty=!1,e.execApprovalsSelectedAgent=null},onExecApprovalsSelectAgent:m=>{e.execApprovalsSelectedAgent=m},onExecApprovalsPatch:(m,k)=>Jm(e,m,k),onExecApprovalsRemove:m=>Zm(e,m),onSaveExecApprovals:()=>{const m=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return Xm(e,m)}}):$}

        ${e.tab==="reports"?X_({reportsLoading:e.reportsLoading,reportsError:e.reportsError,reportsTasks:e.reportsTasks,reportsRecords:e.reportsRecords,reportsAdminToken:e.reportsAdminToken,selectedRecordId:e.selectedRecordId,reportDetailLoading:e.reportDetailLoading,reportDetail:e.reportDetail,reportsDetailTab:e.reportsDetailTab,reportsEditingTaskId:e.reportsEditingTaskId,reportsEditForm:e.reportsEditForm,onTokenChange:m=>{e.reportsAdminToken=m},onRefresh:()=>mn(e),onRun:m=>{xc(e,m)},onSelectRecord:m=>{Ci(),Ja(e,m)},onDetailTabChange:m=>{e.reportsDetailTab=m},onReanalyze:m=>{kv(e,m)},onEditTask:m=>{e.reportsEditingTaskId=m.task_key,e.reportsEditForm={enabled:m.enabled,cron_expr:m.cron_expr,timezone:m.timezone,title:m.title}},onCancelEdit:()=>{e.reportsEditingTaskId=null,e.reportsEditForm={}},onEditFormChange:m=>{e.reportsEditForm=m},onSaveEdit:m=>{wc(e,m,e.reportsEditForm).then(()=>{e.reportsError||(e.reportsEditingTaskId=null,e.reportsEditForm={})})}}):$}

        ${e.tab==="chat"?Ew({sessionKey:e.sessionKey,onSessionKeyChange:m=>{e.sessionKey=m,e.chatMessage="",e.chatAttachments=[],e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.chatQueue=[],e.resetToolStream(),e.resetToolRender(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:m,lastActiveSessionKey:m}),e.loadAssistantIdentity(),Qn(e),Zr(e)},thinkingLevel:e.chatThinkingLevel,showThinking:a,loading:e.chatLoading,sending:e.chatSending,compactionStatus:e.compactionStatus,toolRenderData:e.toolRenderData,toolRenderSeq:e.toolRenderSeq,toolRenderItems:e.toolRenderItems,candidatePreviews:e.candidatePreviews,assistantAvatarUrl:c,messages:e.chatMessages,toolMessages:e.chatToolMessages,stream:e.chatStream,streamStartedAt:e.chatStreamStartedAt,draft:e.chatMessage,queue:e.chatQueue,connected:e.connected,canSend:e.connected,disabledReason:s,error:e.lastError,sessions:e.sessionsResult,focusMode:r,onRefresh:()=>(e.resetToolStream(),Promise.all([Qn(e),Zr(e)])),onToggleFocusMode:()=>{e.onboarding||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})},onChatScroll:m=>e.handleChatScroll(m),onDraftChange:m=>e.chatMessage=m,attachments:e.chatAttachments,onAttachmentsChange:m=>e.chatAttachments=m,uploadedFile:e.chatUploadedFile,onFileSelect:m=>e.handleUploadChatFile(m),onClearUploadedFile:()=>e.clearChatUploadedFile(),composeDragOver:e.chatComposeDragOver,onComposeDragOver:()=>e.setChatComposeDragOver(!0),onComposeDragLeave:()=>e.setChatComposeDragOver(!1),onComposeDrop:m=>e.handleComposeDrop(m),onSend:()=>e.handleSendChat(),canAbort:!!e.chatRunId,onAbort:()=>void e.handleAbortChat(),onQueueRemove:m=>e.removeQueuedMessage(m),onNewSession:()=>e.handleSendChat("/new",{restoreDraft:!0}),showNewMessages:e.chatNewMessagesBelow&&!e.chatManualRefreshInFlight,onScrollToBottom:()=>e.scrollToBottom(),sidebarOpen:e.sidebarOpen,sidebarContent:e.sidebarContent,sidebarError:e.sidebarError,splitRatio:e.splitRatio,onOpenSidebar:m=>e.handleOpenSidebar(m),onCloseSidebar:()=>e.handleCloseSidebar(),onSplitRatioChange:m=>e.handleSplitRatioChange(m),assistantName:e.assistantName,assistantAvatar:e.assistantAvatar}):$}

        ${e.tab==="config"?Gw({raw:e.configRaw,originalRaw:e.configRawOriginal,valid:e.configValid,issues:e.configIssues,loading:e.configLoading,saving:e.configSaving,applying:e.configApplying,updating:e.updateRunning,connected:e.connected,schema:e.configSchema,schemaLoading:e.configSchemaLoading,uiHints:e.configUiHints,formMode:e.configFormMode,formValue:e.configForm,originalValue:e.configFormOriginal,searchQuery:e.configSearchQuery,activeSection:e.configActiveSection,activeSubsection:e.configActiveSubsection,onRawChange:m=>{e.configRaw=m},onFormModeChange:m=>e.configFormMode=m,onFormPatch:(m,k)=>je(e,m,k),onSearchChange:m=>e.configSearchQuery=m,onSectionChange:m=>{e.configActiveSection=m,e.configActiveSubsection=null},onSubsectionChange:m=>e.configActiveSubsection=m,onReload:()=>yt(e),onSave:()=>zs(e),onApply:()=>bg(e),onUpdate:()=>xg(e)}):$}

        ${e.tab==="admin-data"?r_({host:{basePath:e.basePath??"",adminData:e.adminData},onLogin:async m=>{const k=e;await hv(k,m),e.adminData.token&&(await pn(k),await gn(k))},onLogout:()=>{Rt(e)},onSubTab:m=>{e.adminData={...e.adminData,activeSubTab:m}},onPriceQueryInput:m=>{e.adminData={...e.adminData,priceQuery:m}},onPriceQueryApply:async()=>{e.adminData={...e.adminData,pricePage:1},await pn(e)},onPriceRefresh:()=>pn(e),onPriceFieldChange:(m,k)=>fv(e,m,k),onPriceSave:async m=>{const k=e.adminData.priceItems[m];k&&await gv(e,k)},onPriceDelete:async m=>{await mv(e,m)},onPriceUpload:async m=>{await vv(e,m)},onPriceAddRow:()=>pv(e),onMappingQueryInput:m=>{e.adminData={...e.adminData,mappingQuery:m}},onMappingQueryApply:async()=>{e.adminData={...e.adminData,mappingPage:1},await gn(e)},onMappingRefresh:()=>gn(e),onMappingFieldChange:(m,k)=>yv(e,m,k),onMappingSave:async m=>{const k=e.adminData.mappingItems[m];k&&await xv(e,k)},onMappingDelete:async m=>{await wv(e,m)},onMappingUpload:async m=>{await _v(e,m)},onMappingAddRow:()=>bv(e)}):$}

        ${e.tab==="debug"?e_({loading:e.debugLoading,status:e.debugStatus,health:e.debugHealth,models:e.debugModels,heartbeat:e.debugHeartbeat,eventLog:e.eventLog,callMethod:e.debugCallMethod,callParams:e.debugCallParams,callResult:e.debugCallResult,callError:e.debugCallError,onCallMethodChange:m=>e.debugCallMethod=m,onCallParamsChange:m=>e.debugCallParams=m,onRefresh:()=>ko(e),onCall:()=>Bg(e)}):$}

        ${e.tab==="logs"?u_({loading:e.logsLoading,error:e.logsError,file:e.logsFile,entries:e.logsEntries,filterText:e.logsFilterText,levelFilters:e.logsLevelFilters,autoFollow:e.logsAutoFollow,truncated:e.logsTruncated,onFilterTextChange:m=>e.logsFilterText=m,onLevelToggle:(m,k)=>{e.logsLevelFilters={...e.logsLevelFilters,[m]:k}},onToggleAutoFollow:m=>e.logsAutoFollow=m,onRefresh:()=>Da(e,{reset:!0}),onExport:(m,k)=>e.exportLogs(m,k),onScroll:m=>e.handleLogsScroll(m)}):$}
      </main>
      ${n_(e)}
      ${i_(e)}
    </div>
  `}var w2=Object.defineProperty,_2=Object.getOwnPropertyDescriptor,w=(e,t,n,i)=>{for(var s=i>1?void 0:i?_2(t,n):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(s=(i?r(t,n,s):r(s))||s);return i&&s&&w2(t,n,s),s};const Ur=nl({});function k2(){if(!window.location.search)return!1;const t=new URLSearchParams(window.location.search).get("onboarding");if(!t)return!1;const n=t.trim().toLowerCase();return n==="1"||n==="true"||n==="yes"||n==="on"}let x=class extends fn{constructor(){super(),this.i18nController=new ug(this),this.settings=Cv(),this.password="",this.tab="chat",this.onboarding=k2(),this.connected=!1,this.theme=this.settings.theme??"system",this.themeResolved="dark",this.hello=null,this.lastError=null,this.eventLog=[],this.eventLogBuffer=[],this.toolStreamSyncTimer=null,this.sidebarCloseTimer=null,this.assistantName=Ur.name,this.assistantAvatar=Ur.avatar,this.assistantAgentId=Ur.agentId??null,this.sessionKey=this.settings.sessionKey,this.chatLoading=!1,this.chatSending=!1,this.chatMessage="",this.chatMessages=[],this.chatToolMessages=[],this.chatStream=null,this.chatStreamStartedAt=null,this.chatRunId=null,this.compactionStatus=null,this.chatAvatarUrl=null,this.chatThinkingLevel=null,this.chatQueue=[],this.chatAttachments=[],this.chatUploadedFile=null,this.chatComposeDragOver=!1,this.chatManualRefreshInFlight=!1,this.sidebarOpen=!1,this.sidebarContent=null,this.sidebarError=null,this.splitRatio=this.settings.splitRatio,this.nodesLoading=!1,this.nodes=[],this.devicesLoading=!1,this.devicesError=null,this.devicesList=null,this.execApprovalsLoading=!1,this.execApprovalsSaving=!1,this.execApprovalsDirty=!1,this.execApprovalsSnapshot=null,this.execApprovalsForm=null,this.execApprovalsSelectedAgent=null,this.execApprovalsTarget="gateway",this.execApprovalsTargetNodeId=null,this.execApprovalQueue=[],this.execApprovalBusy=!1,this.execApprovalError=null,this.pendingGatewayUrl=null,this.configLoading=!1,this.configRaw=`{
}
`,this.configRawOriginal="",this.configValid=null,this.configIssues=[],this.configSaving=!1,this.configApplying=!1,this.updateRunning=!1,this.applySessionKey=this.settings.lastActiveSessionKey,this.configSnapshot=null,this.configSchema=null,this.configSchemaVersion=null,this.configSchemaLoading=!1,this.configUiHints={},this.configForm=null,this.configFormOriginal=null,this.configFormDirty=!1,this.configFormMode="form",this.configSearchQuery="",this.configActiveSection=null,this.configActiveSubsection=null,this.channelsLoading=!1,this.channelsSnapshot=null,this.channelsError=null,this.channelsLastSuccess=null,this.bkContent="",this.bkLoading=!1,this.bkError=null,this.bkSaving=!1,this.bkLastSuccess=null,this.bkDependentFiles=null,this.whatsappLoginMessage=null,this.whatsappLoginQrDataUrl=null,this.whatsappLoginConnected=null,this.whatsappBusy=!1,this.nostrProfileFormState=null,this.nostrProfileAccountId=null,this.presenceLoading=!1,this.presenceEntries=[],this.presenceError=null,this.presenceStatus=null,this.oosLoading=!1,this.oosError=null,this.oosStats=null,this.oosList=[],this.oosByFile=[],this.oosByTime=[],this.oosShowAddForm=!1,this.oosDb=null,this.shortageLoading=!1,this.shortageError=null,this.shortageStats=null,this.shortageList=[],this.shortageByFile=[],this.shortageByTime=[],this.shortageShowAddForm=!1,this.shortageDb=null,this.overviewOosStats=null,this.overviewOosError=null,this.overviewShortageStats=null,this.overviewShortageError=null,this.dashboardLoading=!1,this.dashboardError=null,this.quotationStats=null,this.dashboardOosByTime=[],this.dashboardShortageByTime=[],this.agentsLoading=!1,this.agentsList=null,this.agentsError=null,this.agentsSelectedId=null,this.agentsPanel="overview",this.agentFilesLoading=!1,this.agentFilesError=null,this.agentFilesList=null,this.agentFileContents={},this.agentFileDrafts={},this.agentFileActive=null,this.agentFileSaving=!1,this.agentIdentityLoading=!1,this.agentIdentityError=null,this.agentIdentityById={},this.agentSkillsLoading=!1,this.agentSkillsError=null,this.agentSkillsReport=null,this.agentSkillsAgentId=null,this.sessionsLoading=!1,this.sessionsResult=null,this.sessionsError=null,this.sessionsFilterActive="",this.sessionsFilterLimit="120",this.sessionsIncludeGlobal=!0,this.sessionsIncludeUnknown=!1,this.usageLoading=!1,this.usageResult=null,this.usageCostSummary=null,this.usageError=null,this.usageRequestSeq=0,this.usageTimeSeriesRequestSeq=0,this.usageSessionLogsRequestSeq=0,this.usageStartDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageEndDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageSelectedSessions=[],this.usageSelectedDays=[],this.usageSelectedHours=[],this.usageChartMode="tokens",this.usageDailyChartMode="by-type",this.usageTimeSeriesMode="per-turn",this.usageTimeSeriesBreakdownMode="by-type",this.usageTimeSeries=null,this.usageTimeSeriesLoading=!1,this.usageTimeSeriesCursorStart=null,this.usageTimeSeriesCursorEnd=null,this.usageSessionLogs=null,this.usageSessionLogsLoading=!1,this.usageSessionLogsExpanded=!1,this.usageQuery="",this.usageQueryDraft="",this.usageSessionSort="recent",this.usageSessionSortDir="desc",this.usageRecentSessions=[],this.usageTimeZone="local",this.usageContextExpanded=!1,this.usageHeaderPinned=!1,this.usageSessionsTab="all",this.usageVisibleColumns=["channel","agent","provider","model","messages","tools","errors","duration"],this.usageLogFilterRoles=[],this.usageLogFilterTools=[],this.usageLogFilterHasTools=!1,this.usageLogFilterQuery="",this.usageQueryDebounceTimer=null,this.workFilePaths=[],this.workOriginalFileNamesByPath={},this.workRunning=!1,this.workProgressStage=0,this._workProgressInterval=null,this.workRunStatus="idle",this.workRunId=null,this.workPendingChoices=[],this.workSelections={},this.workResult=null,this.workError=null,this.workCustomerLevel="B_QUOTE",this.workDoRegisterOos=!1,this.workPendingQuotationDraft=null,this.workQuotationDraftSaveStatus=null,this.workTextInput="",this.workTextGenerating=!1,this.workTextError=null,this.workPriceLevelOptions=[],this.cronLoading=!1,this.cronJobs=[],this.cronStatus=null,this.cronError=null,this.cronForm={...$y},this.cronRunsJobId=null,this.cronRuns=[],this.cronBusy=!1,this.fulfillDraftsLoading=!1,this.fulfillDraftsError=null,this.fulfillDrafts=[],this.fulfillDetail=null,this.fulfillDetailId=null,this.fulfillConfirmBusy=!1,this.fulfillConfirmResult=null,this.fulfillFilterQuery="",this.fulfillSortBy="created_at",this.fulfillSortDir="desc",this.fulfillPage=1,this.fulfillPageSize=10,this.procurementLoading=!1,this.procurementError=null,this.procurementSuggestions=[],this.procurementSelectedKeys=[],this.procurementApprovedKeys=[],this.procurementApproveBusy=!1,this.procurementApproveResult=null,this.procurementFilterQuery="",this.procurementSortBy="uploaded_at",this.procurementSortDir="desc",this.procurementPage=1,this.procurementPageSize=10,this.replenishmentDrafts=[],this.replenishmentDetail=null,this.replenishmentDetailId=null,this.replenishmentLoading=!1,this.replenishmentError=null,this.replenishmentConfirmBusy=!1,this.replenishmentConfirmResult=null,this.replenishmentInputLines=[{product_or_code:"",quantity:0}],this.replenishmentCreateBusy=!1,this.skillsLoading=!1,this.skillsReport=null,this.skillsError=null,this.skillsFilter="",this.skillEdits={},this.skillsBusyKey=null,this.skillMessages={},this.reportsLoading=!1,this.reportsError=null,this.reportsTasks=[],this.reportsRecords=[],this.reportsAdminToken="",this.reportsEditingTaskId=null,this.reportsEditForm={},this.reportDetail=null,this.reportDetailLoading=!1,this.selectedRecordId=null,this.reportsCopyJustDone=!1,this.reportsDetailTab="data",this.debugLoading=!1,this.debugStatus=null,this.debugHealth=null,this.debugModels=[],this.debugHeartbeat=null,this.debugCallMethod="",this.debugCallParams="{}",this.debugCallResult=null,this.debugCallError=null,this.logsLoading=!1,this.logsError=null,this.logsFile=null,this.logsEntries=[],this.logsFilterText="",this.logsLevelFilters={...ky},this.logsAutoFollow=!0,this.logsTruncated=!1,this.logsCursor=null,this.logsLastFetchAt=null,this.logsLimit=500,this.logsMaxBytes=25e4,this.logsAtBottom=!0,this.adminData=uv(),this.client=null,this.chatScrollFrame=null,this.chatScrollTimeout=null,this.chatHasAutoScrolled=!1,this.chatUserNearBottom=!0,this.chatNewMessagesBelow=!1,this.nodesPollInterval=null,this.logsPollInterval=null,this.debugPollInterval=null,this.logsScrollFrame=null,this.toolStreamById=new Map,this.toolStreamOrder=[],this.toolRenderData=null,this.toolRenderSeq=null,this.toolRenderItems=[],this.candidatePreviews=[],this.refreshSessionsAfterChat=new Set,this.basePath="",this.popStateHandler=()=>Hv(this),this.themeMedia=null,this.themeMediaHandler=null,this.topbarObserver=null,Pa(this.settings.locale)&&bn.setLocale(this.settings.locale)}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),sb(this)}firstUpdated(){ob(this)}disconnectedCallback(){rb(this),super.disconnectedCallback()}updated(e){e.has("workRunning")&&(this.workRunning?(this.workProgressStage=this.workRunStatus==="resuming"?1:0,this._workProgressInterval!=null&&(clearInterval(this._workProgressInterval),this._workProgressInterval=null)):(this._workProgressInterval!=null&&(clearInterval(this._workProgressInterval),this._workProgressInterval=null),this.workRunStatus==="done"&&(this.workProgressStage=2))),ab(this,e)}connect(){Gh(this)}handleChatScroll(e){Ig(this,e)}handleLogsScroll(e){Og(this,e)}exportLogs(e,t){Fg(e,t)}resetToolStream(){Po(this)}resetToolRender(){Mo(this)}resetChatScroll(){lc(this)}scrollToBottom(e){lc(this),Ji(this,!0,!!(e!=null&&e.smooth))}async loadAssistantIdentity(){await Wh(this)}applySettings(e){Ut(this,e)}setTab(e){Dv(this,e)}setTheme(e,t){Iv(this,e,t)}async loadOverview(){await Bh(this)}async loadCron(){await el(this)}async loadFulfillDrafts(){await qv(this)}async loadProcurementSuggestions(){await jv(this)}async loadProcurementReplenishment(){await Zi(this)}async loadProcurementReplenishmentDetail(e){await fm(this,e)}async confirmProcurementReplenishment(e){await gm(this,e)}async deleteProcurementReplenishmentDraft(e){await mm(this,e)}onReplenishmentLineChange(e,t,n){const i=this.replenishmentInputLines.slice();e<0||e>=i.length||(i[e]={...i[e],[t]:n},this.replenishmentInputLines=i)}onReplenishmentAddLine(){this.replenishmentInputLines=[...this.replenishmentInputLines,{product_or_code:"",quantity:0}]}onReplenishmentRemoveLine(e){const t=this.replenishmentInputLines.filter((n,i)=>i!==e);this.replenishmentInputLines=t.length>0?t:[{product_or_code:"",quantity:0}]}async createProcurementReplenishmentDraft(){if(!this.replenishmentCreateBusy){this.replenishmentCreateBusy=!0,this.replenishmentError=null;try{const e=await pm(this,this.replenishmentInputLines);e&&(this.replenishmentInputLines=[{product_or_code:"",quantity:0}],await this.loadProcurementReplenishment(),await this.loadProcurementReplenishmentDetail(e.id))}finally{this.replenishmentCreateBusy=!1}}}async handleAbortChat(){await Uh(this)}removeQueuedMessage(e){yy(this,e)}async handleUploadChatFile(e){try{const t=await uy(this.basePath,e);this.chatUploadedFile=t,this.lastError=null}catch(t){this.lastError=t instanceof Error?t.message:String(t)}}clearChatUploadedFile(){this.chatUploadedFile=null}setChatComposeDragOver(e){this.chatComposeDragOver=e}async handleComposeDrop(e){this.chatComposeDragOver=!1,await this.handleUploadChatFile(e)}async handleSendChat(e,t){await by(this,e,t)}async handleWhatsAppStart(e){await _g(this,e)}async handleWhatsAppWait(){await kg(this)}async handleWhatsAppLogout(){await $g(this)}async handleChannelConfigSave(){await Sg(this)}async handleChannelConfigReload(){await Ag(this)}handleNostrProfileEdit(e,t){Eg(this,e,t)}handleNostrProfileCancel(){Rg(this)}handleNostrProfileFieldChange(e,t){Lg(this,e,t)}async handleNostrProfileSave(){await Mg(this)}async handleNostrProfileImport(){await Dg(this)}handleNostrProfileToggleAdvanced(){Pg(this)}async handleExecApprovalDecision(e){const t=this.execApprovalQueue[0];if(!(!t||!this.client||this.execApprovalBusy)){this.execApprovalBusy=!0,this.execApprovalError=null;try{await this.client.request("exec.approval.resolve",{id:t.id,decision:e}),this.execApprovalQueue=this.execApprovalQueue.filter(n=>n.id!==t.id)}catch(n){this.execApprovalError=`Exec approval failed: ${String(n)}`}finally{this.execApprovalBusy=!1}}}handleGatewayUrlConfirm(){const e=this.pendingGatewayUrl;e&&(this.pendingGatewayUrl=null,Ut(this,{...this.settings,gatewayUrl:e}),this.connect())}handleGatewayUrlCancel(){this.pendingGatewayUrl=null}handleOpenSidebar(e){this.sidebarCloseTimer!=null&&(window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=null),this.sidebarContent=e,this.sidebarError=null,this.sidebarOpen=!0}handleCloseSidebar(){this.sidebarOpen=!1,this.sidebarCloseTimer!=null&&window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=window.setTimeout(()=>{this.sidebarOpen||(this.sidebarContent=null,this.sidebarError=null,this.sidebarCloseTimer=null)},200)}handleSplitRatioChange(e){const t=Math.max(.4,Math.min(.7,e));this.splitRatio=t,this.applySettings({...this.settings,splitRatio:t})}render(){return x2(this)}};w([_()],x.prototype,"settings",2);w([_()],x.prototype,"password",2);w([_()],x.prototype,"tab",2);w([_()],x.prototype,"onboarding",2);w([_()],x.prototype,"connected",2);w([_()],x.prototype,"theme",2);w([_()],x.prototype,"themeResolved",2);w([_()],x.prototype,"hello",2);w([_()],x.prototype,"lastError",2);w([_()],x.prototype,"eventLog",2);w([_()],x.prototype,"assistantName",2);w([_()],x.prototype,"assistantAvatar",2);w([_()],x.prototype,"assistantAgentId",2);w([_()],x.prototype,"sessionKey",2);w([_()],x.prototype,"chatLoading",2);w([_()],x.prototype,"chatSending",2);w([_()],x.prototype,"chatMessage",2);w([_()],x.prototype,"chatMessages",2);w([_()],x.prototype,"chatToolMessages",2);w([_()],x.prototype,"chatStream",2);w([_()],x.prototype,"chatStreamStartedAt",2);w([_()],x.prototype,"chatRunId",2);w([_()],x.prototype,"compactionStatus",2);w([_()],x.prototype,"chatAvatarUrl",2);w([_()],x.prototype,"chatThinkingLevel",2);w([_()],x.prototype,"chatQueue",2);w([_()],x.prototype,"chatAttachments",2);w([_()],x.prototype,"chatUploadedFile",2);w([_()],x.prototype,"chatComposeDragOver",2);w([_()],x.prototype,"chatManualRefreshInFlight",2);w([_()],x.prototype,"sidebarOpen",2);w([_()],x.prototype,"sidebarContent",2);w([_()],x.prototype,"sidebarError",2);w([_()],x.prototype,"splitRatio",2);w([_()],x.prototype,"nodesLoading",2);w([_()],x.prototype,"nodes",2);w([_()],x.prototype,"devicesLoading",2);w([_()],x.prototype,"devicesError",2);w([_()],x.prototype,"devicesList",2);w([_()],x.prototype,"execApprovalsLoading",2);w([_()],x.prototype,"execApprovalsSaving",2);w([_()],x.prototype,"execApprovalsDirty",2);w([_()],x.prototype,"execApprovalsSnapshot",2);w([_()],x.prototype,"execApprovalsForm",2);w([_()],x.prototype,"execApprovalsSelectedAgent",2);w([_()],x.prototype,"execApprovalsTarget",2);w([_()],x.prototype,"execApprovalsTargetNodeId",2);w([_()],x.prototype,"execApprovalQueue",2);w([_()],x.prototype,"execApprovalBusy",2);w([_()],x.prototype,"execApprovalError",2);w([_()],x.prototype,"pendingGatewayUrl",2);w([_()],x.prototype,"configLoading",2);w([_()],x.prototype,"configRaw",2);w([_()],x.prototype,"configRawOriginal",2);w([_()],x.prototype,"configValid",2);w([_()],x.prototype,"configIssues",2);w([_()],x.prototype,"configSaving",2);w([_()],x.prototype,"configApplying",2);w([_()],x.prototype,"updateRunning",2);w([_()],x.prototype,"applySessionKey",2);w([_()],x.prototype,"configSnapshot",2);w([_()],x.prototype,"configSchema",2);w([_()],x.prototype,"configSchemaVersion",2);w([_()],x.prototype,"configSchemaLoading",2);w([_()],x.prototype,"configUiHints",2);w([_()],x.prototype,"configForm",2);w([_()],x.prototype,"configFormOriginal",2);w([_()],x.prototype,"configFormDirty",2);w([_()],x.prototype,"configFormMode",2);w([_()],x.prototype,"configSearchQuery",2);w([_()],x.prototype,"configActiveSection",2);w([_()],x.prototype,"configActiveSubsection",2);w([_()],x.prototype,"channelsLoading",2);w([_()],x.prototype,"channelsSnapshot",2);w([_()],x.prototype,"channelsError",2);w([_()],x.prototype,"channelsLastSuccess",2);w([_()],x.prototype,"bkContent",2);w([_()],x.prototype,"bkLoading",2);w([_()],x.prototype,"bkError",2);w([_()],x.prototype,"bkSaving",2);w([_()],x.prototype,"bkLastSuccess",2);w([_()],x.prototype,"bkDependentFiles",2);w([_()],x.prototype,"whatsappLoginMessage",2);w([_()],x.prototype,"whatsappLoginQrDataUrl",2);w([_()],x.prototype,"whatsappLoginConnected",2);w([_()],x.prototype,"whatsappBusy",2);w([_()],x.prototype,"nostrProfileFormState",2);w([_()],x.prototype,"nostrProfileAccountId",2);w([_()],x.prototype,"presenceLoading",2);w([_()],x.prototype,"presenceEntries",2);w([_()],x.prototype,"presenceError",2);w([_()],x.prototype,"presenceStatus",2);w([_()],x.prototype,"oosLoading",2);w([_()],x.prototype,"oosError",2);w([_()],x.prototype,"oosStats",2);w([_()],x.prototype,"oosList",2);w([_()],x.prototype,"oosByFile",2);w([_()],x.prototype,"oosByTime",2);w([_()],x.prototype,"oosShowAddForm",2);w([_()],x.prototype,"oosDb",2);w([_()],x.prototype,"shortageLoading",2);w([_()],x.prototype,"shortageError",2);w([_()],x.prototype,"shortageStats",2);w([_()],x.prototype,"shortageList",2);w([_()],x.prototype,"shortageByFile",2);w([_()],x.prototype,"shortageByTime",2);w([_()],x.prototype,"shortageShowAddForm",2);w([_()],x.prototype,"shortageDb",2);w([_()],x.prototype,"overviewOosStats",2);w([_()],x.prototype,"overviewOosError",2);w([_()],x.prototype,"overviewShortageStats",2);w([_()],x.prototype,"overviewShortageError",2);w([_()],x.prototype,"dashboardLoading",2);w([_()],x.prototype,"dashboardError",2);w([_()],x.prototype,"quotationStats",2);w([_()],x.prototype,"dashboardOosByTime",2);w([_()],x.prototype,"dashboardShortageByTime",2);w([_()],x.prototype,"agentsLoading",2);w([_()],x.prototype,"agentsList",2);w([_()],x.prototype,"agentsError",2);w([_()],x.prototype,"agentsSelectedId",2);w([_()],x.prototype,"agentsPanel",2);w([_()],x.prototype,"agentFilesLoading",2);w([_()],x.prototype,"agentFilesError",2);w([_()],x.prototype,"agentFilesList",2);w([_()],x.prototype,"agentFileContents",2);w([_()],x.prototype,"agentFileDrafts",2);w([_()],x.prototype,"agentFileActive",2);w([_()],x.prototype,"agentFileSaving",2);w([_()],x.prototype,"agentIdentityLoading",2);w([_()],x.prototype,"agentIdentityError",2);w([_()],x.prototype,"agentIdentityById",2);w([_()],x.prototype,"agentSkillsLoading",2);w([_()],x.prototype,"agentSkillsError",2);w([_()],x.prototype,"agentSkillsReport",2);w([_()],x.prototype,"agentSkillsAgentId",2);w([_()],x.prototype,"sessionsLoading",2);w([_()],x.prototype,"sessionsResult",2);w([_()],x.prototype,"sessionsError",2);w([_()],x.prototype,"sessionsFilterActive",2);w([_()],x.prototype,"sessionsFilterLimit",2);w([_()],x.prototype,"sessionsIncludeGlobal",2);w([_()],x.prototype,"sessionsIncludeUnknown",2);w([_()],x.prototype,"usageLoading",2);w([_()],x.prototype,"usageResult",2);w([_()],x.prototype,"usageCostSummary",2);w([_()],x.prototype,"usageError",2);w([_()],x.prototype,"usageStartDate",2);w([_()],x.prototype,"usageEndDate",2);w([_()],x.prototype,"usageSelectedSessions",2);w([_()],x.prototype,"usageSelectedDays",2);w([_()],x.prototype,"usageSelectedHours",2);w([_()],x.prototype,"usageChartMode",2);w([_()],x.prototype,"usageDailyChartMode",2);w([_()],x.prototype,"usageTimeSeriesMode",2);w([_()],x.prototype,"usageTimeSeriesBreakdownMode",2);w([_()],x.prototype,"usageTimeSeries",2);w([_()],x.prototype,"usageTimeSeriesLoading",2);w([_()],x.prototype,"usageTimeSeriesCursorStart",2);w([_()],x.prototype,"usageTimeSeriesCursorEnd",2);w([_()],x.prototype,"usageSessionLogs",2);w([_()],x.prototype,"usageSessionLogsLoading",2);w([_()],x.prototype,"usageSessionLogsExpanded",2);w([_()],x.prototype,"usageQuery",2);w([_()],x.prototype,"usageQueryDraft",2);w([_()],x.prototype,"usageSessionSort",2);w([_()],x.prototype,"usageSessionSortDir",2);w([_()],x.prototype,"usageRecentSessions",2);w([_()],x.prototype,"usageTimeZone",2);w([_()],x.prototype,"usageContextExpanded",2);w([_()],x.prototype,"usageHeaderPinned",2);w([_()],x.prototype,"usageSessionsTab",2);w([_()],x.prototype,"usageVisibleColumns",2);w([_()],x.prototype,"usageLogFilterRoles",2);w([_()],x.prototype,"usageLogFilterTools",2);w([_()],x.prototype,"usageLogFilterHasTools",2);w([_()],x.prototype,"usageLogFilterQuery",2);w([_()],x.prototype,"workFilePaths",2);w([_()],x.prototype,"workOriginalFileNamesByPath",2);w([_()],x.prototype,"workRunning",2);w([_()],x.prototype,"workProgressStage",2);w([_()],x.prototype,"workRunStatus",2);w([_()],x.prototype,"workRunId",2);w([_()],x.prototype,"workPendingChoices",2);w([_()],x.prototype,"workSelections",2);w([_()],x.prototype,"workResult",2);w([_()],x.prototype,"workError",2);w([_()],x.prototype,"workCustomerLevel",2);w([_()],x.prototype,"workDoRegisterOos",2);w([_()],x.prototype,"workPendingQuotationDraft",2);w([_()],x.prototype,"workQuotationDraftSaveStatus",2);w([_()],x.prototype,"workTextInput",2);w([_()],x.prototype,"workTextGenerating",2);w([_()],x.prototype,"workTextError",2);w([_()],x.prototype,"workPriceLevelOptions",2);w([_()],x.prototype,"cronLoading",2);w([_()],x.prototype,"cronJobs",2);w([_()],x.prototype,"cronStatus",2);w([_()],x.prototype,"cronError",2);w([_()],x.prototype,"cronForm",2);w([_()],x.prototype,"cronRunsJobId",2);w([_()],x.prototype,"cronRuns",2);w([_()],x.prototype,"cronBusy",2);w([_()],x.prototype,"fulfillDraftsLoading",2);w([_()],x.prototype,"fulfillDraftsError",2);w([_()],x.prototype,"fulfillDrafts",2);w([_()],x.prototype,"fulfillDetail",2);w([_()],x.prototype,"fulfillDetailId",2);w([_()],x.prototype,"fulfillConfirmBusy",2);w([_()],x.prototype,"fulfillConfirmResult",2);w([_()],x.prototype,"fulfillFilterQuery",2);w([_()],x.prototype,"fulfillSortBy",2);w([_()],x.prototype,"fulfillSortDir",2);w([_()],x.prototype,"fulfillPage",2);w([_()],x.prototype,"fulfillPageSize",2);w([_()],x.prototype,"procurementLoading",2);w([_()],x.prototype,"procurementError",2);w([_()],x.prototype,"procurementSuggestions",2);w([_()],x.prototype,"procurementSelectedKeys",2);w([_()],x.prototype,"procurementApprovedKeys",2);w([_()],x.prototype,"procurementApproveBusy",2);w([_()],x.prototype,"procurementApproveResult",2);w([_()],x.prototype,"procurementFilterQuery",2);w([_()],x.prototype,"procurementSortBy",2);w([_()],x.prototype,"procurementSortDir",2);w([_()],x.prototype,"procurementPage",2);w([_()],x.prototype,"procurementPageSize",2);w([_()],x.prototype,"replenishmentDrafts",2);w([_()],x.prototype,"replenishmentDetail",2);w([_()],x.prototype,"replenishmentDetailId",2);w([_()],x.prototype,"replenishmentLoading",2);w([_()],x.prototype,"replenishmentError",2);w([_()],x.prototype,"replenishmentConfirmBusy",2);w([_()],x.prototype,"replenishmentConfirmResult",2);w([_()],x.prototype,"replenishmentInputLines",2);w([_()],x.prototype,"replenishmentCreateBusy",2);w([_()],x.prototype,"skillsLoading",2);w([_()],x.prototype,"skillsReport",2);w([_()],x.prototype,"skillsError",2);w([_()],x.prototype,"skillsFilter",2);w([_()],x.prototype,"skillEdits",2);w([_()],x.prototype,"skillsBusyKey",2);w([_()],x.prototype,"skillMessages",2);w([_()],x.prototype,"reportsLoading",2);w([_()],x.prototype,"reportsError",2);w([_()],x.prototype,"reportsTasks",2);w([_()],x.prototype,"reportsRecords",2);w([_()],x.prototype,"reportsAdminToken",2);w([_()],x.prototype,"reportsEditingTaskId",2);w([_()],x.prototype,"reportsEditForm",2);w([_()],x.prototype,"reportDetail",2);w([_()],x.prototype,"reportDetailLoading",2);w([_()],x.prototype,"selectedRecordId",2);w([_()],x.prototype,"reportsCopyJustDone",2);w([_()],x.prototype,"reportsDetailTab",2);w([_()],x.prototype,"debugLoading",2);w([_()],x.prototype,"debugStatus",2);w([_()],x.prototype,"debugHealth",2);w([_()],x.prototype,"debugModels",2);w([_()],x.prototype,"debugHeartbeat",2);w([_()],x.prototype,"debugCallMethod",2);w([_()],x.prototype,"debugCallParams",2);w([_()],x.prototype,"debugCallResult",2);w([_()],x.prototype,"debugCallError",2);w([_()],x.prototype,"logsLoading",2);w([_()],x.prototype,"logsError",2);w([_()],x.prototype,"logsFile",2);w([_()],x.prototype,"logsEntries",2);w([_()],x.prototype,"logsFilterText",2);w([_()],x.prototype,"logsLevelFilters",2);w([_()],x.prototype,"logsAutoFollow",2);w([_()],x.prototype,"logsTruncated",2);w([_()],x.prototype,"logsCursor",2);w([_()],x.prototype,"logsLastFetchAt",2);w([_()],x.prototype,"logsLimit",2);w([_()],x.prototype,"logsMaxBytes",2);w([_()],x.prototype,"logsAtBottom",2);w([_()],x.prototype,"adminData",2);w([_()],x.prototype,"chatNewMessagesBelow",2);w([_()],x.prototype,"toolRenderData",2);w([_()],x.prototype,"toolRenderSeq",2);w([_()],x.prototype,"toolRenderItems",2);w([_()],x.prototype,"candidatePreviews",2);x=w([La("openclaw-app")],x);
//# sourceMappingURL=index-VWG_hT7m.js.map
