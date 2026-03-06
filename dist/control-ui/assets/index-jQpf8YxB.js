var Sc=Object.defineProperty;var Ac=(e,t,n)=>t in e?Sc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var W=(e,t,n)=>Ac(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Hn=globalThis,Is=Hn.ShadowRoot&&(Hn.ShadyCSS===void 0||Hn.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ms=Symbol(),jo=new WeakMap;let $a=class{constructor(t,n,i){if(this._$cssResult$=!0,i!==Ms)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(Is&&t===void 0){const i=n!==void 0&&n.length===1;i&&(t=jo.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&jo.set(n,t))}return t}toString(){return this.cssText}};const _c=e=>new $a(typeof e=="string"?e:e+"",void 0,Ms),Cc=(e,...t)=>{const n=e.length===1?e[0]:t.reduce((i,s,o)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[o+1],e[0]);return new $a(n,e,Ms)},Tc=(e,t)=>{if(Is)e.adoptedStyleSheets=t.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of t){const i=document.createElement("style"),s=Hn.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=n.cssText,e.appendChild(i)}},qo=Is?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const i of t.cssRules)n+=i.cssText;return _c(n)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ec,defineProperty:Rc,getOwnPropertyDescriptor:Lc,getOwnPropertyNames:Ic,getOwnPropertySymbols:Mc,getPrototypeOf:Pc}=Object,Xe=globalThis,Wo=Xe.trustedTypes,Dc=Wo?Wo.emptyScript:"",Ii=Xe.reactiveElementPolyfillSupport,sn=(e,t)=>e,Vn={toAttribute(e,t){switch(t){case Boolean:e=e?Dc:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},Ps=(e,t)=>!Ec(e,t),Go={attribute:!0,type:String,converter:Vn,reflect:!1,useDefault:!1,hasChanged:Ps};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Xe.litPropertyMetadata??(Xe.litPropertyMetadata=new WeakMap);let Mt=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=Go){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(t,n),!n.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,n);s!==void 0&&Rc(this.prototype,t,s)}}static getPropertyDescriptor(t,n,i){const{get:s,set:o}=Lc(this.prototype,t)??{get(){return this[n]},set(r){this[n]=r}};return{get:s,set(r){const a=s==null?void 0:s.call(this);o==null||o.call(this,r),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Go}static _$Ei(){if(this.hasOwnProperty(sn("elementProperties")))return;const t=Pc(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(sn("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(sn("properties"))){const n=this.properties,i=[...Ic(n),...Mc(n)];for(const s of i)this.createProperty(s,n[s])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[i,s]of n)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[n,i]of this.elementProperties){const s=this._$Eu(n,i);s!==void 0&&this._$Eh.set(s,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)n.unshift(qo(s))}else t!==void 0&&n.push(qo(t));return n}static _$Eu(t,n){const i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(n=>n(this))}addController(t){var n;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((n=t.hostConnected)==null||n.call(t))}removeController(t){var n;(n=this._$EO)==null||n.delete(t)}_$E_(){const t=new Map,n=this.constructor.elementProperties;for(const i of n.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Tc(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(n=>{var i;return(i=n.hostConnected)==null?void 0:i.call(n)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(n=>{var i;return(i=n.hostDisconnected)==null?void 0:i.call(n)})}attributeChangedCallback(t,n,i){this._$AK(t,i)}_$ET(t,n){var o;const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const r=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:Vn).toAttribute(n,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,n){var o,r;const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const a=i.getPropertyOptions(s),l=typeof a.converter=="function"?{fromAttribute:a.converter}:((o=a.converter)==null?void 0:o.fromAttribute)!==void 0?a.converter:Vn;this._$Em=s;const c=l.fromAttribute(n,a.type);this[s]=c??((r=this._$Ej)==null?void 0:r.get(s))??c,this._$Em=null}}requestUpdate(t,n,i,s=!1,o){var r;if(t!==void 0){const a=this.constructor;if(s===!1&&(o=this[t]),i??(i=a.getPropertyOptions(t)),!((i.hasChanged??Ps)(o,n)||i.useDefault&&i.reflect&&o===((r=this._$Ej)==null?void 0:r.get(t))&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,n,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,r??n??this[t]),o!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(n=void 0),this._$AL.set(t,n)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,r]of this._$Ep)this[o]=r;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,r]of s){const{wrapped:a}=r,l=this[o];a!==!0||this._$AL.has(o)||l===void 0||this.C(o,void 0,r,l)}}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),(i=this._$EO)==null||i.forEach(s=>{var o;return(o=s.hostUpdate)==null?void 0:o.call(s)}),this.update(n)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(n)}willUpdate(t){}_$AE(t){var n;(n=this._$EO)==null||n.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(n=>this._$ET(n,this[n]))),this._$EM()}updated(t){}firstUpdated(t){}};Mt.elementStyles=[],Mt.shadowRootOptions={mode:"open"},Mt[sn("elementProperties")]=new Map,Mt[sn("finalized")]=new Map,Ii==null||Ii({ReactiveElement:Mt}),(Xe.reactiveElementVersions??(Xe.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const on=globalThis,Vo=e=>e,Qn=on.trustedTypes,Qo=Qn?Qn.createPolicy("lit-html",{createHTML:e=>e}):void 0,xa="$lit$",Ye=`lit$${Math.random().toFixed(9).slice(2)}$`,ka="?"+Ye,Fc=`<${ka}>`,ht=document,un=()=>ht.createComment(""),fn=e=>e===null||typeof e!="object"&&typeof e!="function",Ds=Array.isArray,Nc=e=>Ds(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",Mi=`[ 	
\f\r]`,Wt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Jo=/-->/g,Yo=/>/g,at=RegExp(`>|${Mi}(?:([^\\s"'>=/]+)(${Mi}*=${Mi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Xo=/'/g,Zo=/"/g,Sa=/^(?:script|style|textarea|title)$/i,Oc=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),d=Oc(1),tt=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),er=new WeakMap,ft=ht.createTreeWalker(ht,129);function Aa(e,t){if(!Ds(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Qo!==void 0?Qo.createHTML(t):t}const Bc=(e,t)=>{const n=e.length-1,i=[];let s,o=t===2?"<svg>":t===3?"<math>":"",r=Wt;for(let a=0;a<n;a++){const l=e[a];let c,f,u=-1,p=0;for(;p<l.length&&(r.lastIndex=p,f=r.exec(l),f!==null);)p=r.lastIndex,r===Wt?f[1]==="!--"?r=Jo:f[1]!==void 0?r=Yo:f[2]!==void 0?(Sa.test(f[2])&&(s=RegExp("</"+f[2],"g")),r=at):f[3]!==void 0&&(r=at):r===at?f[0]===">"?(r=s??Wt,u=-1):f[1]===void 0?u=-2:(u=r.lastIndex-f[2].length,c=f[1],r=f[3]===void 0?at:f[3]==='"'?Zo:Xo):r===Zo||r===Xo?r=at:r===Jo||r===Yo?r=Wt:(r=at,s=void 0);const b=r===at&&e[a+1].startsWith("/>")?" ":"";o+=r===Wt?l+Fc:u>=0?(i.push(c),l.slice(0,u)+xa+l.slice(u)+Ye+b):l+Ye+(u===-2?a:b)}return[Aa(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class pn{constructor({strings:t,_$litType$:n},i){let s;this.parts=[];let o=0,r=0;const a=t.length-1,l=this.parts,[c,f]=Bc(t,n);if(this.el=pn.createElement(c,i),ft.currentNode=this.el.content,n===2||n===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=ft.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(const u of s.getAttributeNames())if(u.endsWith(xa)){const p=f[r++],b=s.getAttribute(u).split(Ye),x=/([.?@])?(.*)/.exec(p);l.push({type:1,index:o,name:x[2],strings:b,ctor:x[1]==="."?zc:x[1]==="?"?Hc:x[1]==="@"?Kc:ri}),s.removeAttribute(u)}else u.startsWith(Ye)&&(l.push({type:6,index:o}),s.removeAttribute(u));if(Sa.test(s.tagName)){const u=s.textContent.split(Ye),p=u.length-1;if(p>0){s.textContent=Qn?Qn.emptyScript:"";for(let b=0;b<p;b++)s.append(u[b],un()),ft.nextNode(),l.push({type:2,index:++o});s.append(u[p],un())}}}else if(s.nodeType===8)if(s.data===ka)l.push({type:2,index:o});else{let u=-1;for(;(u=s.data.indexOf(Ye,u+1))!==-1;)l.push({type:7,index:o}),u+=Ye.length-1}o++}}static createElement(t,n){const i=ht.createElement("template");return i.innerHTML=t,i}}function Nt(e,t,n=e,i){var r,a;if(t===tt)return t;let s=i!==void 0?(r=n._$Co)==null?void 0:r[i]:n._$Cl;const o=fn(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==o&&((a=s==null?void 0:s._$AO)==null||a.call(s,!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,i)),i!==void 0?(n._$Co??(n._$Co=[]))[i]=s:n._$Cl=s),s!==void 0&&(t=Nt(e,s._$AS(e,t.values),s,i)),t}class Uc{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??ht).importNode(n,!0);ft.currentNode=s;let o=ft.nextNode(),r=0,a=0,l=i[0];for(;l!==void 0;){if(r===l.index){let c;l.type===2?c=new oi(o,o.nextSibling,this,t):l.type===1?c=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(c=new jc(o,this,t)),this._$AV.push(c),l=i[++a]}r!==(l==null?void 0:l.index)&&(o=ft.nextNode(),r++)}return ft.currentNode=ht,s}p(t){let n=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,n),n+=i.strings.length-2):i._$AI(t[n])),n++}}let oi=class _a{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,n,i,s){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Nt(this,t,n),fn(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==tt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Nc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==$&&fn(this._$AH)?this._$AA.nextSibling.data=t:this.T(ht.createTextNode(t)),this._$AH=t}$(t){var o;const{values:n,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=pn.createElement(Aa(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===s)this._$AH.p(n);else{const r=new Uc(s,this),a=r.u(this.options);r.p(n),this.T(a),this._$AH=r}}_$AC(t){let n=er.get(t.strings);return n===void 0&&er.set(t.strings,n=new pn(t)),n}k(t){Ds(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let i,s=0;for(const o of t)s===n.length?n.push(i=new _a(this.O(un()),this.O(un()),this,this.options)):i=n[s],i._$AI(o),s++;s<n.length&&(this._$AR(i&&i._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,n);t!==this._$AB;){const s=Vo(t).nextSibling;Vo(t).remove(),t=s}}setConnected(t){var n;this._$AM===void 0&&(this._$Cv=t,(n=this._$AP)==null||n.call(this,t))}},ri=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,i,s,o){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=$}_$AI(t,n=this,i,s){const o=this.strings;let r=!1;if(o===void 0)t=Nt(this,t,n,0),r=!fn(t)||t!==this._$AH&&t!==tt,r&&(this._$AH=t);else{const a=t;let l,c;for(t=o[0],l=0;l<o.length-1;l++)c=Nt(this,a[i+l],n,l),c===tt&&(c=this._$AH[l]),r||(r=!fn(c)||c!==this._$AH[l]),c===$?t=$:t!==$&&(t+=(c??"")+o[l+1]),this._$AH[l]=c}r&&!s&&this.j(t)}j(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},zc=class extends ri{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$?void 0:t}},Hc=class extends ri{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==$)}},Kc=class extends ri{constructor(t,n,i,s,o){super(t,n,i,s,o),this.type=5}_$AI(t,n=this){if((t=Nt(this,t,n,0)??$)===tt)return;const i=this._$AH,s=t===$&&i!==$||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==$&&(i===$||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var n;typeof this._$AH=="function"?this._$AH.call(((n=this.options)==null?void 0:n.host)??this.element,t):this._$AH.handleEvent(t)}},jc=class{constructor(t,n,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Nt(this,t)}};const qc={I:oi},Pi=on.litHtmlPolyfillSupport;Pi==null||Pi(pn,oi),(on.litHtmlVersions??(on.litHtmlVersions=[])).push("3.3.2");const Wc=(e,t,n)=>{const i=(n==null?void 0:n.renderBefore)??t;let s=i._$litPart$;if(s===void 0){const o=(n==null?void 0:n.renderBefore)??null;i._$litPart$=s=new oi(t.insertBefore(un(),o),o,void 0,n??{})}return s._$AI(e),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gt=globalThis;let Dt=class extends Mt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var n;const t=super.createRenderRoot();return(n=this.renderOptions).renderBefore??(n.renderBefore=t.firstChild),t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Wc(n,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return tt}};var wa;Dt._$litElement$=!0,Dt.finalized=!0,(wa=gt.litElementHydrateSupport)==null||wa.call(gt,{LitElement:Dt});const Di=gt.litElementPolyfillSupport;Di==null||Di({LitElement:Dt});(gt.litElementVersions??(gt.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ca=e=>(t,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Gc={attribute:!0,type:String,converter:Vn,reflect:!1,hasChanged:Ps},Vc=(e=Gc,t,n)=>{const{kind:i,metadata:s}=n;let o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),i==="setter"&&((e=Object.create(e)).wrapped=!0),o.set(n.name,e),i==="accessor"){const{name:r}=n;return{set(a){const l=t.get.call(this);t.set.call(this,a),this.requestUpdate(r,l,e,!0,a)},init(a){return a!==void 0&&this.C(r,void 0,e,a),a}}}if(i==="setter"){const{name:r}=n;return function(a){const l=this[r];t.call(this,a),this.requestUpdate(r,l,e,!0,a)}}throw Error("Unsupported decorator location: "+i)};function ai(e){return(t,n)=>typeof n=="object"?Vc(e,t,n):((i,s,o)=>{const r=s.hasOwnProperty(o);return s.constructor.createProperty(o,i),r?Object.getOwnPropertyDescriptor(s,o):void 0})(e,t,n)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function y(e){return ai({...e,state:!0,attribute:!1})}const Qc="modulepreload",Jc=function(e,t){return new URL(e,t).href},tr={},Fi=function(t,n,i){let s=Promise.resolve();if(n&&n.length>0){let r=function(f){return Promise.all(f.map(u=>Promise.resolve(u).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};const a=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),c=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));s=r(n.map(f=>{if(f=Jc(f,i),f in tr)return;tr[f]=!0;const u=f.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(!!i)for(let k=a.length-1;k>=0;k--){const S=a[k];if(S.href===f&&(!u||S.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${f}"]${p}`))return;const x=document.createElement("link");if(x.rel=u?"stylesheet":Qc,u||(x.as="script"),x.crossOrigin="",x.href=f,c&&x.setAttribute("nonce",c),document.head.appendChild(x),u)return new Promise((k,S)=>{x.addEventListener("load",k),x.addEventListener("error",()=>S(new Error(`Unable to preload CSS for ${f}`)))})}))}function o(r){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=r,window.dispatchEvent(a),!a.defaultPrevented)throw r}return s.then(r=>{for(const a of r||[])a.status==="rejected"&&o(a.reason);return t().catch(o)})},Yc={common:{health:"Health",ok:"OK",offline:"Offline",connect:"Connect",refresh:"Refresh",retry:"Retry",cancel:"Cancel",close:"Close",yes:"Yes",no:"No",prev:"Prev",next:"Next",errorTitle:"Request failed",enabled:"Enabled",disabled:"Disabled",na:"n/a",docs:"Docs",resources:"Resources"},nav:{chat:"Chat",control:"Control",agent:"Agent",settings:"Settings",expand:"Expand sidebar",collapse:"Collapse sidebar"},tabs:{agents:"Agents",overview:"Overview",channels:"Business Knowledge",instances:"Out of Stock",sessions:"Procurement",work:"Quotation",cron:"Order Fulfill",skills:"Skills",nodes:"Nodes",chat:"Chat",config:"Config",debug:"Debug",logs:"Logs"},subtitles:{agents:"Manage agent workspaces, tools, and identities.",overview:"Gateway status, entry points, and a fast health read.",channels:"Edit wanding_business_knowledge.md for selection and matching.",instances:"OOS dashboard: stats and product list without asking the agent.",sessions:"Procurement suggestions from shortage; approve to save and notify buyer.",work:"Batch quotation: upload files, identify, match price and stock, fill and save.",cron:"Pending quotation drafts; confirm to create order and lock stock.",skills:"Manage skill availability and API key injection.",nodes:"Paired devices, capabilities, and command exposure.",chat:"Direct gateway chat session for quick interventions.",config:"Edit ~/.openclaw/openclaw.json safely.",debug:"Gateway snapshots, events, and manual RPC calls.",logs:"Live tail of the gateway file logs."},overview:{access:{title:"Gateway Access",subtitle:"Where the dashboard connects and how it authenticates.",wsUrl:"WebSocket URL",token:"Gateway Token",password:"Password (not stored)",sessionKey:"Default Session Key",language:"Language",connectHint:"Click Connect to apply connection changes.",trustedProxy:"Authenticated via trusted proxy."},snapshot:{title:"Snapshot",subtitle:"Latest gateway handshake information.",status:"Status",uptime:"Uptime",tickInterval:"Tick Interval",lastChannelsRefresh:"Last Channels Refresh",channelsHint:"Use Channels to link WhatsApp, Telegram, Discord, Signal, or iMessage."},stats:{instances:"Instances",instancesHint:"Presence beacons in the last 5 minutes.",sessions:"Sessions",sessionsHint:"Recent session keys tracked by the gateway.",cron:"Cron",cronNext:"Next wake {time}"},notes:{title:"Notes",subtitle:"Quick reminders for remote control setups.",tailscaleTitle:"Tailscale serve",tailscaleText:"Prefer serve mode to keep the gateway on loopback with tailnet auth.",sessionTitle:"Session hygiene",sessionText:"Use /new or sessions.patch to reset context.",cronTitle:"Cron reminders",cronText:"Use isolated sessions for recurring runs."},auth:{required:"This gateway requires auth. Add a token or password, then click Connect.",failed:"Auth failed. Re-copy a tokenized URL with {command}, or update the token, then click Connect."},insecure:{hint:"This page is HTTP, so the browser blocks device identity. Use HTTPS (Tailscale Serve) or open {url} on the gateway host.",stayHttp:"If you must stay on HTTP, set {config} (token-only)."}},chat:{disconnected:"Disconnected from gateway.",refreshTitle:"Refresh chat data",thinkingToggle:"Toggle assistant thinking/working output",focusToggle:"Toggle focus mode (hide sidebar + page header)",onboardingDisabled:"Disabled during onboarding"},work:{runHint:"Please select at least one file before running.",saveConfirm:"Confirm save quotation draft and persist to database?",saveSuccessHint:"Saved. You can confirm it on the Order Fulfill page.",stageExtract:"Extract sheet data",stageMatch:"Match price & inventory",stageFill:"Fill quotation",uploadTitle:"Quotation files (multiple)",removeFile:"Remove",noFiles:"No files uploaded (.xlsx/.xls/.xlsm).",customerLevel:"Customer level",registerOos:"Register out-of-stock items",currentStage:"Current stage",running:"Running",run:"Run",cancel:"Cancel",statusLabel:"Status",awaitingTitle:"Need your choices",awaitingHint:"Select one option for each ambiguous item, then continue.",qty:"Qty",choiceSelect:"Candidate selection",choiceOos:"Mark as out of stock",resuming:"Resuming",resume:"Confirm and continue",savedDraftNo:"Quotation draft saved: {no}",pendingDraftTitle:"Pending quotation draft",pendingDraftHint:"Review and edit before saving to database.",saving:"Saving...",saveDraft:"Confirm and save",resultTitle:"Execution result",download:"Download {name}",trace:"Trace ({count})",lineProduct:"Product",lineSpec:"Spec",lineQty:"Qty",lineCode:"Code",lineQuoteName:"Quote name",linePrice:"Unit price",lineAmount:"Amount",lineAvailable:"Available",lineShortfall:"Shortfall",lineIsShortage:"Shortage",textInputTitle:"Text input (quotation)",textInputHint:"Enter product list (multi-line or semicolon/comma separated); generated file will run with uploaded files.",textInputPlaceholder:"e.g. Cable 3*2.5 100m; Switch 20 pcs",generateFromText:"Generate from text",textGenerating:"Generating…"},fulfill:{title:"Pending quotation drafts",subtitle:"Load persisted drafts and confirm to create formal orders.",loading:"Loading...",refreshList:"Refresh list",filterPlaceholder:"Search by draft no/name/source",sortBy:"Sort by",sortDir:"Order",sortCreatedAt:"Created time",sortDraftNo:"Draft no",sortName:"Name",sortDesc:"Newest first",sortAsc:"Oldest first",pageSize:"Page size",total:"Total: {total}",page:"Page {current}/{total}",listTitle:"List",listSubtitle:"View detail first, then confirm order.",colDraftNo:"Draft No",colName:"Name",colSource:"Source",colCreatedAt:"Created At",colActions:"Actions",viewDetail:"View",confirmAction:"Confirm order",confirming:"Confirming...",detailTitle:"Draft detail · {draftNo}",closeDetail:"Close detail",lineProduct:"Product",lineSpec:"Spec",lineQty:"Qty",lineCode:"Code",lineQuoteName:"Quote name",linePrice:"Unit price",lineAmount:"Amount",lineAvailable:"Available",lineShortfall:"Shortfall",lineIsShortage:"Shortage",noDrafts:"No pending quotation drafts.",confirmTitle:"Order confirmed",confirmPrompt:"Confirm order? {count} line(s), total amount {amount}.",confirmPromptSimple:"Confirm to convert this quotation into a formal order?",orderId:"Order ID"},procurement:{title:"Procurement suggestions",subtitle:"Generated from shortage records; approve to persist and notify buyers.",loading:"Loading...",refreshList:"Refresh list",batchApprove:"Batch approve",approving:"Approving...",approveSingle:"Approve",approveConfirm:"Confirm approval and notify buyer?",approveBatchConfirm:"Confirm approval of {count} item(s) and notify buyer?",noSuggestions:"No shortage products; no procurement suggestions.",noPending:"No pending items (approved items are hidden).",listHint:"Select multiple to batch approve; click Approve to save and notify buyer.",filterPlaceholder:"Search by product/spec/code/key",sortBy:"Sort by",sortDir:"Order",sortUploadedAt:"Reported time",sortShortfall:"Shortfall",sortCount:"Report count",sortProduct:"Product name",sortDesc:"High to low / newest",sortAsc:"Low to high / oldest",pageSize:"Page size",total:"Total: {total}",page:"Page {current}/{total}",listTitle:"Shortage item list",selectAll:"Select all filtered items",selectItem:"Select item",colProduct:"Product",colSpec:"Spec",colShortfall:"Shortfall",colCode:"Code",colCount:"Count",colActions:"Actions",approvedCount:"Approved {count} item(s)."},languages:{en:"English",zhCN:"简体中文 (Simplified Chinese)",zhTW:"繁體中文 (Traditional Chinese)",ptBR:"Português (Brazilian Portuguese)"}},Xc=["en","zh-CN","zh-TW","pt-BR"];function Fs(e){return e!=null&&Xc.includes(e)}class Zc{constructor(){this.locale="en",this.translations={en:Yc},this.subscribers=new Set,this.loadLocale()}loadLocale(){const t=localStorage.getItem("openclaw.i18n.locale");if(Fs(t))this.locale=t;else{const n=navigator.language;n.startsWith("zh")?this.locale=n==="zh-TW"||n==="zh-HK"?"zh-TW":"zh-CN":n.startsWith("pt")?this.locale="pt-BR":this.locale="en"}}getLocale(){return this.locale}async setLocale(t){if(this.locale!==t){if(!this.translations[t])try{let n;if(t==="zh-CN")n=await Fi(()=>import("./zh-CN-Dq0hyRd8.js"),[],import.meta.url);else if(t==="zh-TW")n=await Fi(()=>import("./zh-TW-B7H4kk0G.js"),[],import.meta.url);else if(t==="pt-BR")n=await Fi(()=>import("./pt-BR-CAUgEH0a.js"),[],import.meta.url);else return;this.translations[t]=n[t.replace("-","_")]}catch(n){console.error(`Failed to load locale: ${t}`,n);return}this.locale=t,localStorage.setItem("openclaw.i18n.locale",t),this.notify()}}registerTranslation(t,n){this.translations[t]=n}subscribe(t){return this.subscribers.add(t),()=>this.subscribers.delete(t)}notify(){this.subscribers.forEach(t=>t(this.locale))}t(t,n){const i=t.split(".");let s=this.translations[this.locale]||this.translations.en;for(const o of i)if(s&&typeof s=="object")s=s[o];else{s=void 0;break}if(s===void 0&&this.locale!=="en"){s=this.translations.en;for(const o of i)if(s&&typeof s=="object")s=s[o];else{s=void 0;break}}return typeof s!="string"?t:n?s.replace(/\{(\w+)\}/g,(o,r)=>n[r]||`{${r}}`):s}}const gn=new Zc,g=(e,t)=>gn.t(e,t);class ed{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){this.unsubscribe=gn.subscribe(()=>{this.host.requestUpdate()})}hostDisconnected(){var t;(t=this.unsubscribe)==null||t.call(this)}}async function Ae(e,t){if(!(!e.client||!e.connected)&&!e.channelsLoading){e.channelsLoading=!0,e.channelsError=null;try{const n=await e.client.request("channels.status",{probe:t,timeoutMs:8e3});e.channelsSnapshot=n,e.channelsLastSuccess=Date.now()}catch(n){e.channelsError=String(n)}finally{e.channelsLoading=!1}}}async function td(e,t){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const n=await e.client.request("web.login.start",{force:t,timeoutMs:3e4});e.whatsappLoginMessage=n.message??null,e.whatsappLoginQrDataUrl=n.qrDataUrl??null,e.whatsappLoginConnected=null}catch(n){e.whatsappLoginMessage=String(n),e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function nd(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const t=await e.client.request("web.login.wait",{timeoutMs:12e4});e.whatsappLoginMessage=t.message??null,e.whatsappLoginConnected=t.connected??null,t.connected&&(e.whatsappLoginQrDataUrl=null)}catch(t){e.whatsappLoginMessage=String(t),e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function id(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{await e.client.request("channels.logout",{channel:"whatsapp"}),e.whatsappLoginMessage="Logged out.",e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}catch(t){e.whatsappLoginMessage=String(t)}finally{e.whatsappBusy=!1}}}function ke(e){if(e)return Array.isArray(e.type)?e.type.filter(n=>n!=="null")[0]??e.type[0]:e.type}function Ta(e){if(!e)return"";if(e.default!==void 0)return e.default;switch(ke(e)){case"object":return{};case"array":return[];case"boolean":return!1;case"number":case"integer":return 0;case"string":return"";default:return""}}function Ns(e){return e.filter(t=>typeof t=="string").join(".")}function Se(e,t){const n=Ns(e),i=t[n];if(i)return i;const s=n.split(".");for(const[o,r]of Object.entries(t)){if(!o.includes("*"))continue;const a=o.split(".");if(a.length!==s.length)continue;let l=!0;for(let c=0;c<s.length;c+=1)if(a[c]!=="*"&&a[c]!==s[c]){l=!1;break}if(l)return r}}function Ve(e){return e.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/\s+/g," ").replace(/^./,t=>t.toUpperCase())}function nr(e,t){const n=e.trim();if(n==="")return;const i=Number(n);return!Number.isFinite(i)||t&&!Number.isInteger(i)?e:i}function ir(e){const t=e.trim();return t==="true"?!0:t==="false"?!1:e}function Je(e,t){if(e==null)return e;if(t.allOf&&t.allOf.length>0){let i=e;for(const s of t.allOf)i=Je(i,s);return i}const n=ke(t);if(t.anyOf||t.oneOf){const i=(t.anyOf??t.oneOf??[]).filter(s=>!(s.type==="null"||Array.isArray(s.type)&&s.type.includes("null")));if(i.length===1)return Je(e,i[0]);if(typeof e=="string")for(const s of i){const o=ke(s);if(o==="number"||o==="integer"){const r=nr(e,o==="integer");if(r===void 0||typeof r=="number")return r}if(o==="boolean"){const r=ir(e);if(typeof r=="boolean")return r}}for(const s of i){const o=ke(s);if(o==="object"&&typeof e=="object"&&!Array.isArray(e)||o==="array"&&Array.isArray(e))return Je(e,s)}return e}if(n==="number"||n==="integer"){if(typeof e=="string"){const i=nr(e,n==="integer");if(i===void 0||typeof i=="number")return i}return e}if(n==="boolean"){if(typeof e=="string"){const i=ir(e);if(typeof i=="boolean")return i}return e}if(n==="object"){if(typeof e!="object"||Array.isArray(e))return e;const i=e,s=t.properties??{},o=t.additionalProperties&&typeof t.additionalProperties=="object"?t.additionalProperties:null,r={};for(const[a,l]of Object.entries(i)){const c=s[a]??o,f=c?Je(l,c):l;f!==void 0&&(r[a]=f)}return r}if(n==="array"){if(!Array.isArray(e))return e;if(Array.isArray(t.items)){const s=t.items;return e.map((o,r)=>{const a=r<s.length?s[r]:void 0;return a?Je(o,a):o})}const i=t.items;return i?e.map(s=>Je(s,i)).filter(s=>s!==void 0):e}return e}function mt(e){return typeof structuredClone=="function"?structuredClone(e):JSON.parse(JSON.stringify(e))}function hn(e){return`${JSON.stringify(e,null,2).trimEnd()}
`}function Ea(e,t,n){if(t.length===0)return;let i=e;for(let o=0;o<t.length-1;o+=1){const r=t[o],a=t[o+1];if(typeof r=="number"){if(!Array.isArray(i))return;i[r]==null&&(i[r]=typeof a=="number"?[]:{}),i=i[r]}else{if(typeof i!="object"||i==null)return;const l=i;l[r]==null&&(l[r]=typeof a=="number"?[]:{}),i=l[r]}}const s=t[t.length-1];if(typeof s=="number"){Array.isArray(i)&&(i[s]=n);return}typeof i=="object"&&i!=null&&(i[s]=n)}function Ra(e,t){if(t.length===0)return;let n=e;for(let s=0;s<t.length-1;s+=1){const o=t[s];if(typeof o=="number"){if(!Array.isArray(n))return;n=n[o]}else{if(typeof n!="object"||n==null)return;n=n[o]}if(n==null)return}const i=t[t.length-1];if(typeof i=="number"){Array.isArray(n)&&n.splice(i,1);return}typeof n=="object"&&n!=null&&delete n[i]}async function Be(e){if(!(!e.client||!e.connected)){e.configLoading=!0,e.lastError=null;try{const t=await e.client.request("config.get",{});rd(e,t)}catch(t){e.lastError=String(t)}finally{e.configLoading=!1}}}async function sd(e){if(!(!e.client||!e.connected)&&!e.configSchemaLoading){e.configSchemaLoading=!0;try{const t=await e.client.request("config.schema",{});od(e,t)}catch(t){e.lastError=String(t)}finally{e.configSchemaLoading=!1}}}function od(e,t){e.configSchema=t.schema??null,e.configUiHints=t.uiHints??{},e.configSchemaVersion=t.version??null}function rd(e,t){e.configSnapshot=t;const n=typeof t.raw=="string"?t.raw:t.config&&typeof t.config=="object"?hn(t.config):e.configRaw;!e.configFormDirty||e.configFormMode==="raw"?e.configRaw=n:e.configForm?e.configRaw=hn(e.configForm):e.configRaw=n,e.configValid=typeof t.valid=="boolean"?t.valid:null,e.configIssues=Array.isArray(t.issues)?t.issues:[],e.configFormDirty||(e.configForm=mt(t.config??{}),e.configFormOriginal=mt(t.config??{}),e.configRawOriginal=n)}function ad(e){return!e||typeof e!="object"||Array.isArray(e)?null:e}function La(e){if(e.configFormMode!=="form"||!e.configForm)return e.configRaw;const t=ad(e.configSchema),n=t?Je(e.configForm,t):e.configForm;return hn(n)}async function Kn(e){var t;if(!(!e.client||!e.connected)){e.configSaving=!0,e.lastError=null;try{const n=La(e),i=(t=e.configSnapshot)==null?void 0:t.hash;if(!i){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.set",{raw:n,baseHash:i}),e.configFormDirty=!1,await Be(e)}catch(n){e.lastError=String(n)}finally{e.configSaving=!1}}}async function ld(e){var t;if(!(!e.client||!e.connected)){e.configApplying=!0,e.lastError=null;try{const n=La(e),i=(t=e.configSnapshot)==null?void 0:t.hash;if(!i){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.apply",{raw:n,baseHash:i,sessionKey:e.applySessionKey}),e.configFormDirty=!1,await Be(e)}catch(n){e.lastError=String(n)}finally{e.configApplying=!1}}}async function cd(e){if(!(!e.client||!e.connected)){e.updateRunning=!0,e.lastError=null;try{await e.client.request("update.run",{sessionKey:e.applySessionKey})}catch(t){e.lastError=String(t)}finally{e.updateRunning=!1}}}function xe(e,t,n){var s;const i=mt(e.configForm??((s=e.configSnapshot)==null?void 0:s.config)??{});Ea(i,t,n),e.configForm=i,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=hn(i))}function qe(e,t){var i;const n=mt(e.configForm??((i=e.configSnapshot)==null?void 0:i.config)??{});Ra(n,t),e.configForm=n,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=hn(n))}function dd(e){const t={name:(e==null?void 0:e.name)??"",displayName:(e==null?void 0:e.displayName)??"",about:(e==null?void 0:e.about)??"",picture:(e==null?void 0:e.picture)??"",banner:(e==null?void 0:e.banner)??"",website:(e==null?void 0:e.website)??"",nip05:(e==null?void 0:e.nip05)??"",lud16:(e==null?void 0:e.lud16)??""};return{values:t,original:{...t},saving:!1,importing:!1,error:null,success:null,fieldErrors:{},showAdvanced:!!(e!=null&&e.banner||e!=null&&e.website||e!=null&&e.nip05||e!=null&&e.lud16)}}async function ud(e,t){await td(e,t),await Ae(e,!0)}async function fd(e){await nd(e),await Ae(e,!0)}async function pd(e){await id(e),await Ae(e,!0)}async function gd(e){await Kn(e),await Be(e),await Ae(e,!0)}async function hd(e){await Be(e),await Ae(e,!0)}function md(e){if(!Array.isArray(e))return{};const t={};for(const n of e){if(typeof n!="string")continue;const[i,...s]=n.split(":");if(!i||s.length===0)continue;const o=i.trim(),r=s.join(":").trim();o&&r&&(t[o]=r)}return t}function Ia(e){var n,i,s;return((s=(((i=(n=e.channelsSnapshot)==null?void 0:n.channelAccounts)==null?void 0:i.nostr)??[])[0])==null?void 0:s.accountId)??e.nostrProfileAccountId??"default"}function Ma(e,t=""){return`/api/channels/nostr/${encodeURIComponent(e)}/profile${t}`}function vd(e){var s,o,r;const t=(r=(o=(s=e.hello)==null?void 0:s.auth)==null?void 0:o.deviceToken)==null?void 0:r.trim();if(t)return`Bearer ${t}`;const n=e.settings.token.trim();if(n)return`Bearer ${n}`;const i=e.password.trim();return i?`Bearer ${i}`:null}function Pa(e){const t=vd(e);return t?{Authorization:t}:{}}function yd(e,t,n){e.nostrProfileAccountId=t,e.nostrProfileFormState=dd(n??void 0)}function bd(e){e.nostrProfileFormState=null,e.nostrProfileAccountId=null}function wd(e,t,n){const i=e.nostrProfileFormState;i&&(e.nostrProfileFormState={...i,values:{...i.values,[t]:n},fieldErrors:{...i.fieldErrors,[t]:""}})}function $d(e){const t=e.nostrProfileFormState;t&&(e.nostrProfileFormState={...t,showAdvanced:!t.showAdvanced})}async function xd(e){const t=e.nostrProfileFormState;if(!t||t.saving)return;const n=Ia(e);e.nostrProfileFormState={...t,saving:!0,error:null,success:null,fieldErrors:{}};try{const i=await fetch(Ma(n),{method:"PUT",headers:{"Content-Type":"application/json",...Pa(e)},body:JSON.stringify(t.values)}),s=await i.json().catch(()=>null);if(!i.ok||(s==null?void 0:s.ok)===!1||!s){const o=(s==null?void 0:s.error)??`Profile update failed (${i.status})`;e.nostrProfileFormState={...t,saving:!1,error:o,success:null,fieldErrors:md(s==null?void 0:s.details)};return}if(!s.persisted){e.nostrProfileFormState={...t,saving:!1,error:"Profile publish failed on all relays.",success:null};return}e.nostrProfileFormState={...t,saving:!1,error:null,success:"Profile published to relays.",fieldErrors:{},original:{...t.values}},await Ae(e,!0)}catch(i){e.nostrProfileFormState={...t,saving:!1,error:`Profile update failed: ${String(i)}`,success:null}}}async function kd(e){const t=e.nostrProfileFormState;if(!t||t.importing)return;const n=Ia(e);e.nostrProfileFormState={...t,importing:!0,error:null,success:null};try{const i=await fetch(Ma(n,"/import"),{method:"POST",headers:{"Content-Type":"application/json",...Pa(e)},body:JSON.stringify({autoMerge:!0})}),s=await i.json().catch(()=>null);if(!i.ok||(s==null?void 0:s.ok)===!1||!s){const l=(s==null?void 0:s.error)??`Profile import failed (${i.status})`;e.nostrProfileFormState={...t,importing:!1,error:l,success:null};return}const o=s.merged??s.imported??null,r=o?{...t.values,...o}:t.values,a=!!(r.banner||r.website||r.nip05||r.lud16);e.nostrProfileFormState={...t,importing:!1,values:r,error:null,success:s.saved?"Profile imported from relays. Review and publish.":"Profile imported. Review and publish.",showAdvanced:a},s.saved&&await Ae(e,!0)}catch(i){e.nostrProfileFormState={...t,importing:!1,error:`Profile import failed: ${String(i)}`,success:null}}}function Da(e){var o;const t=(e??"").trim();if(!t)return null;const n=t.split(":").filter(Boolean);if(n.length<3||n[0]!=="agent")return null;const i=(o=n[1])==null?void 0:o.trim(),s=n.slice(2).join(":");return!i||!s?null:{agentId:i,rest:s}}const ss=450;function wn(e,t=!1,n=!1){e.chatScrollFrame&&cancelAnimationFrame(e.chatScrollFrame),e.chatScrollTimeout!=null&&(clearTimeout(e.chatScrollTimeout),e.chatScrollTimeout=null);const i=()=>{const s=e.querySelector(".chat-thread");if(s){const o=getComputedStyle(s).overflowY;if(o==="auto"||o==="scroll"||s.scrollHeight-s.clientHeight>1)return s}return document.scrollingElement??document.documentElement};e.updateComplete.then(()=>{e.chatScrollFrame=requestAnimationFrame(()=>{e.chatScrollFrame=null;const s=i();if(!s)return;const o=s.scrollHeight-s.scrollTop-s.clientHeight,r=t&&!e.chatHasAutoScrolled;if(!(r||e.chatUserNearBottom||o<ss)){e.chatNewMessagesBelow=!0;return}r&&(e.chatHasAutoScrolled=!0);const l=n&&(typeof window>"u"||typeof window.matchMedia!="function"||!window.matchMedia("(prefers-reduced-motion: reduce)").matches),c=s.scrollHeight;typeof s.scrollTo=="function"?s.scrollTo({top:c,behavior:l?"smooth":"auto"}):s.scrollTop=c,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1;const f=r?150:120;e.chatScrollTimeout=window.setTimeout(()=>{e.chatScrollTimeout=null;const u=i();if(!u)return;const p=u.scrollHeight-u.scrollTop-u.clientHeight;(r||e.chatUserNearBottom||p<ss)&&(u.scrollTop=u.scrollHeight,e.chatUserNearBottom=!0)},f)})})}function Fa(e,t=!1){e.logsScrollFrame&&cancelAnimationFrame(e.logsScrollFrame),e.updateComplete.then(()=>{e.logsScrollFrame=requestAnimationFrame(()=>{e.logsScrollFrame=null;const n=e.querySelector(".log-stream");if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;(t||i<80)&&(n.scrollTop=n.scrollHeight)})})}function Sd(e,t){const n=t.currentTarget;if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;e.chatUserNearBottom=i<ss,e.chatUserNearBottom&&(e.chatNewMessagesBelow=!1)}function Ad(e,t){const n=t.currentTarget;if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;e.logsAtBottom=i<80}function sr(e){e.chatHasAutoScrolled=!1,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1}function _d(e,t){if(e.length===0)return;const n=new Blob([`${e.join(`
`)}
`],{type:"text/plain"}),i=URL.createObjectURL(n),s=document.createElement("a"),o=new Date().toISOString().slice(0,19).replace(/[:T]/g,"-");s.href=i,s.download=`openclaw-logs-${t}-${o}.log`,s.click(),URL.revokeObjectURL(i)}function Cd(e){if(typeof ResizeObserver>"u")return;const t=e.querySelector(".topbar");if(!t)return;const n=()=>{const{height:i}=t.getBoundingClientRect();e.style.setProperty("--topbar-height",`${i}px`)};n(),e.topbarObserver=new ResizeObserver(()=>n()),e.topbarObserver.observe(t)}async function li(e){if(!(!e.client||!e.connected)&&!e.debugLoading){e.debugLoading=!0;try{const[t,n,i,s]=await Promise.all([e.client.request("status",{}),e.client.request("health",{}),e.client.request("models.list",{}),e.client.request("last-heartbeat",{})]);e.debugStatus=t,e.debugHealth=n;const o=i;e.debugModels=Array.isArray(o==null?void 0:o.models)?o==null?void 0:o.models:[],e.debugHeartbeat=s}catch(t){e.debugCallError=String(t)}finally{e.debugLoading=!1}}}async function Td(e){if(!(!e.client||!e.connected)){e.debugCallError=null,e.debugCallResult=null;try{const t=e.debugCallParams.trim()?JSON.parse(e.debugCallParams):{},n=await e.client.request(e.debugCallMethod.trim(),t);e.debugCallResult=JSON.stringify(n,null,2)}catch(t){e.debugCallError=String(t)}}}const Ed=2e3,Rd=new Set(["trace","debug","info","warn","error","fatal"]);function Ld(e){if(typeof e!="string")return null;const t=e.trim();if(!t.startsWith("{")||!t.endsWith("}"))return null;try{const n=JSON.parse(t);return!n||typeof n!="object"?null:n}catch{return null}}function Id(e){if(typeof e!="string")return null;const t=e.toLowerCase();return Rd.has(t)?t:null}function Md(e){if(!e.trim())return{raw:e,message:e};try{const t=JSON.parse(e),n=t&&typeof t._meta=="object"&&t._meta!==null?t._meta:null,i=typeof t.time=="string"?t.time:typeof(n==null?void 0:n.date)=="string"?n==null?void 0:n.date:null,s=Id((n==null?void 0:n.logLevelName)??(n==null?void 0:n.level)),o=typeof t[0]=="string"?t[0]:typeof(n==null?void 0:n.name)=="string"?n==null?void 0:n.name:null,r=Ld(o);let a=null;r&&(typeof r.subsystem=="string"?a=r.subsystem:typeof r.module=="string"&&(a=r.module)),!a&&o&&o.length<120&&(a=o);let l=null;return typeof t[1]=="string"?l=t[1]:!r&&typeof t[0]=="string"?l=t[0]:typeof t.message=="string"&&(l=t.message),{raw:e,time:i,level:s,subsystem:a,message:l??e,meta:n??void 0}}catch{return{raw:e,message:e}}}async function Os(e,t){if(!(!e.client||!e.connected)&&!(e.logsLoading&&!(t!=null&&t.quiet))){t!=null&&t.quiet||(e.logsLoading=!0),e.logsError=null;try{const i=await e.client.request("logs.tail",{cursor:t!=null&&t.reset?void 0:e.logsCursor??void 0,limit:e.logsLimit,maxBytes:e.logsMaxBytes}),o=(Array.isArray(i.lines)?i.lines.filter(a=>typeof a=="string"):[]).map(Md),r=!!(t!=null&&t.reset||i.reset||e.logsCursor==null);e.logsEntries=r?o:[...e.logsEntries,...o].slice(-Ed),typeof i.cursor=="number"&&(e.logsCursor=i.cursor),typeof i.file=="string"&&(e.logsFile=i.file),e.logsTruncated=!!i.truncated,e.logsLastFetchAt=Date.now()}catch(n){e.logsError=String(n)}finally{t!=null&&t.quiet||(e.logsLoading=!1)}}}async function ci(e,t){if(!(!e.client||!e.connected)&&!e.nodesLoading){e.nodesLoading=!0,t!=null&&t.quiet||(e.lastError=null);try{const n=await e.client.request("node.list",{});e.nodes=Array.isArray(n.nodes)?n.nodes:[]}catch(n){t!=null&&t.quiet||(e.lastError=String(n))}finally{e.nodesLoading=!1}}}function Pd(e){e.nodesPollInterval==null&&(e.nodesPollInterval=window.setInterval(()=>void ci(e,{quiet:!0}),5e3))}function Dd(e){e.nodesPollInterval!=null&&(clearInterval(e.nodesPollInterval),e.nodesPollInterval=null)}function Bs(e){e.logsPollInterval==null&&(e.logsPollInterval=window.setInterval(()=>{e.tab==="logs"&&Os(e,{quiet:!0})},2e3))}function Us(e){e.logsPollInterval!=null&&(clearInterval(e.logsPollInterval),e.logsPollInterval=null)}function zs(e){e.debugPollInterval==null&&(e.debugPollInterval=window.setInterval(()=>{e.tab==="debug"&&li(e)},3e3))}function Hs(e){e.debugPollInterval!=null&&(clearInterval(e.debugPollInterval),e.debugPollInterval=null)}async function Na(e,t){if(!(!e.client||!e.connected||e.agentIdentityLoading)&&!e.agentIdentityById[t]){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{const n=await e.client.request("agent.identity.get",{agentId:t});n&&(e.agentIdentityById={...e.agentIdentityById,[t]:n})}catch(n){e.agentIdentityError=String(n)}finally{e.agentIdentityLoading=!1}}}async function Oa(e,t){if(!e.client||!e.connected||e.agentIdentityLoading)return;const n=t.filter(i=>!e.agentIdentityById[i]);if(n.length!==0){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{for(const i of n){const s=await e.client.request("agent.identity.get",{agentId:i});s&&(e.agentIdentityById={...e.agentIdentityById,[i]:s})}}catch(i){e.agentIdentityError=String(i)}finally{e.agentIdentityLoading=!1}}}async function jn(e,t){if(!(!e.client||!e.connected)&&!e.agentSkillsLoading){e.agentSkillsLoading=!0,e.agentSkillsError=null;try{const n=await e.client.request("skills.status",{agentId:t});n&&(e.agentSkillsReport=n,e.agentSkillsAgentId=t)}catch(n){e.agentSkillsError=String(n)}finally{e.agentSkillsLoading=!1}}}async function Ks(e){var t;if(!(!e.client||!e.connected)&&!e.agentsLoading){e.agentsLoading=!0,e.agentsError=null;try{const n=await e.client.request("agents.list",{});if(n){e.agentsList=n;const i=e.agentsSelectedId,s=n.agents.some(o=>o.id===i);(!i||!s)&&(e.agentsSelectedId=n.defaultId??((t=n.agents[0])==null?void 0:t.id)??null)}}catch(n){e.agentsError=String(n)}finally{e.agentsLoading=!1}}}function js(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}async function Fd(e){try{const n=await(await fetch(js(e.basePath,"/api/business-knowledge/dependent-files"))).json().catch(()=>({}));n.success&&n.data?e.bkDependentFiles={mapping_table:n.data.mapping_table??"",price_library:n.data.price_library??""}:e.bkDependentFiles=null}catch{e.bkDependentFiles=null}}async function Ba(e){e.bkLoading=!0,e.bkError=null,Fd(e);try{const t=await fetch(js(e.basePath,"/api/business-knowledge")),n=await t.json().catch(()=>({}));n.success&&n.data&&typeof n.data.content=="string"?e.bkContent=n.data.content:(e.bkContent="",t.ok||(e.bkError=n.detail??`HTTP ${t.status}`))}catch(t){e.bkError=t instanceof Error?t.message:String(t),e.bkContent=""}finally{e.bkLoading=!1}}async function Nd(e,t){e.bkSaving=!0,e.bkError=null;try{const n=await fetch(js(e.basePath,"/api/business-knowledge"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:t})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(e.bkContent=t,e.bkLastSuccess=Date.now(),!0):(e.bkError=i.detail??`HTTP ${n.status}`,!1)}catch(n){return e.bkError=n instanceof Error?n.message:String(n),!1}finally{e.bkSaving=!1}}function Ua(e){if(e==null||!Number.isFinite(e))return"n/a";const t=Math.floor(e/1e3),n=Math.floor(t/60),i=Math.floor(n/60);return i>0?`${i}h`:n>0?`${n}m`:t>0?`${t}s`:"<1s"}function xt(e){if(e==null||!Number.isFinite(e))return"n/a";const t=Date.now(),n=e-t,i=Math.abs(n),s=Math.floor(i/6e4),o=Math.floor(s/60),r=Math.floor(o/24);return n>0?s<1?"in <1m":s<60?`in ${s}m`:o<24?`in ${o}h`:`in ${r}d`:i<15e3?"just now":s<60?`${s}m ago`:o<24?`${o}h ago`:`${r}d ago`}function Od(e,t){return!e||typeof e!="string"?"":e.replace(/<think>[\s\S]*?<\/think>/gi,"").trim()}function Jn(e){return!e&&e!==0?"n/a":new Date(e).toLocaleString()}function os(e){return!e||e.length===0?"none":e.filter(t=>!!(t&&t.trim())).join(", ")}function rs(e,t=120){return e.length<=t?e:`${e.slice(0,Math.max(0,t-1))}…`}function za(e,t){return e.length<=t?{text:e,truncated:!1,total:e.length}:{text:e.slice(0,Math.max(0,t)),truncated:!0,total:e.length}}function or(e,t){const n=Number(e);return Number.isFinite(n)?n:t}function Ni(e){return Od(e)}async function Ha(e){if(!(!e.client||!e.connected))try{const t=await e.client.request("cron.status",{});e.cronStatus=t}catch(t){e.cronError=String(t)}}async function Bd(e){if(!(!e.client||!e.connected)&&!e.cronLoading){e.cronLoading=!0,e.cronError=null;try{const t=await e.client.request("cron.list",{includeDisabled:!0});e.cronJobs=Array.isArray(t.jobs)?t.jobs:[]}catch(t){e.cronError=String(t)}finally{e.cronLoading=!1}}}class de extends Error{constructor(t,n){super(`Invalid response schema from ${t}: ${n}`),this.name="ResponseSchemaError",this.endpoint=t}}function Ka(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function ie(e,t,n="response"){if(!Ka(e))throw new de(t,`${n} must be an object`);return e}function Ut(e,t,n){if(!Array.isArray(e))throw new de(t,`${n} must be an array`);return e}function Ze(e,t,n){if(typeof e!="string")throw new de(t,`${n} must be a string`);return e}function Ud(e,t,n){if(typeof e!="number"||Number.isNaN(e))throw new de(t,`${n} must be a number`);return e}function G(e){return typeof e=="string"?e:void 0}function me(e){return typeof e=="number"&&Number.isFinite(e)?e:void 0}function qs(e){return typeof e=="boolean"?e:void 0}function Le(e,t){return Ka(e)?typeof e.detail=="string"&&e.detail.trim()?e.detail.trim():typeof e.error=="string"&&e.error.trim()?e.error.trim():typeof e.message=="string"&&e.message.trim()?e.message.trim():t:t}function ue(e,t,n,i){return`${e}失败：${t}。影响：${n}。下一步：${i}`}const Ln="/api/quotation-drafts",rr="/api/quotation-drafts/{id}",zd="/api/quotation-drafts/{id}/confirm",ar=new WeakMap;function Hd(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams(n);return`${s}?${o.toString()}`}function Kd(e,t){var s;const n=globalThis,i=typeof((s=n.crypto)==null?void 0:s.randomUUID)=="function"?n.crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2,10)}`;return`${e}:${t}:${i}`}function jd(e){let t=ar.get(e);return t||(t=new Map,ar.set(e,t)),t}function ja(e,t){const n=ie(e,t,"data[]"),s=me(n.id)??Number(n.id);return{id:Number.isFinite(s)?s:0,draft_no:Ze(n.draft_no,t,"data[].draft_no"),name:Ze(n.name,t,"data[].name"),source:G(n.source),file_path:typeof n.file_path=="string"?n.file_path:null,created_at:G(n.created_at)??null,status:Ze(n.status,t,"data[].status"),confirmed_at:G(n.confirmed_at)??null}}function qd(e,t){const n=ie(e,t,"data"),i=ja(n,t),o=Ut(n.lines,t,"data.lines").map(r=>ie(r,t,"data.lines[]"));return{...i,lines:o}}function Wd(e,t){const n=ie(e,t),i=n.data!=null?ie(n.data,t,"data"):{},s=G(i.order_id)??G(n.order_id),o=G(i.message)??G(n.message)??"已确认成单";return{order_id:s,message:o}}async function Ws(e){e.fulfillDraftsLoading=!0,e.fulfillDraftsError=null;try{const t=Hd(e.basePath,Ln,{status:"pending",limit:"50"}),n=await fetch(t),i=await n.json().catch(()=>({}));if(!n.ok){e.fulfillDraftsError=ue("加载待确认报价单列表",Le(i,`HTTP ${n.status}`),"无法查看最新待确认报价单","点击“重试”重新加载列表"),e.fulfillDrafts=[];return}const s=ie(i,Ln),o=Ut(s.data,Ln,"data");e.fulfillDrafts=o.map(r=>ja(r,Ln)).filter(r=>r.id>0)}catch(t){const n=t instanceof de||t instanceof Error?t.message:String(t);e.fulfillDraftsError=ue("加载待确认报价单列表",n,"列表可能为空或字段错位","检查后端返回字段后重试"),e.fulfillDrafts=[]}finally{e.fulfillDraftsLoading=!1}}async function Gd(e,t){var n;e.fulfillDetailId=t;try{const i=(n=e.basePath)!=null&&n.trim()?`${e.basePath.replace(/\/$/,"")}/api/quotation-drafts/${t}`:`/api/quotation-drafts/${t}`,s=await fetch(i),o=await s.json().catch(()=>({}));if(!s.ok){e.fulfillDetail=null,e.fulfillConfirmResult={message:ue("加载报价单详情",Le(o,`HTTP ${s.status}`),"无法确认该报价单","点击“重试”或返回列表后重选")};return}const r=ie(o,rr);e.fulfillDetail=qd(r.data,rr)}catch(i){const s=i instanceof de||i instanceof Error?i.message:String(i);e.fulfillDetail=null,e.fulfillConfirmResult={message:ue("加载报价单详情",s,"无法确认该报价单","点击“重试”或返回列表后重选")}}}async function Vd(e,t){const n=jd(e),i=n.get(t);if(i)return i;const s=(async()=>{var o;e.fulfillConfirmBusy=!0,e.fulfillConfirmResult=null;try{const r=(o=e.basePath)!=null&&o.trim()?`${e.basePath.replace(/\/$/,"")}/api/quotation-drafts/${t}/confirm`:`/api/quotation-drafts/${t}/confirm`,a=Kd("fulfill-confirm",String(t)),l=await fetch(r,{method:"PATCH",headers:{"X-Idempotency-Key":a,"Idempotency-Key":a}}),c=await l.json().catch(()=>({}));if(!l.ok)return e.fulfillConfirmResult={message:ue("确认成单",Le(c,`HTTP ${l.status}`),"该报价单仍为待确认，库存未锁定","点击“重试”再次确认")},e.fulfillConfirmResult;const f=Wd(c,zd);return e.fulfillConfirmResult=f,e.fulfillDetail=null,e.fulfillDetailId=null,await Ws(e),f}catch(r){const a=r instanceof de||r instanceof Error?r.message:String(r);return e.fulfillConfirmResult={message:ue("确认成单",a,"该报价单仍为待确认，库存未锁定","点击“重试”再次确认")},e.fulfillConfirmResult}finally{e.fulfillConfirmBusy=!1,n.delete(t)}})();return n.set(t,s),s}function Te(e){return`${e.product_key??""}	${e.specification??""}	${e.code??""}`}const In="/api/shortage/list",rn="/api/procurement/approve",lr=new WeakMap;function Qd(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams(n);return`${s}?${o.toString()}`}function Jd(e,t){var s;const n=globalThis,i=typeof((s=n.crypto)==null?void 0:s.randomUUID)=="function"?n.crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2,10)}`;return`${e}:${t}:${i}`}function Yd(e){let t=lr.get(e);return t||(t=new Map,lr.set(e,t)),t}function It(e){const t=me(e);if(t!=null)return t;const n=Number(e);return Number.isFinite(n)?n:void 0}function Xd(e,t){const n=ie(e,t,"data[]");return{id:It(n.id),product_name:G(n.product_name),specification:G(n.specification),quantity:It(n.quantity),available_qty:It(n.available_qty),shortfall:It(n.shortfall),code:G(n.code),quote_name:G(n.quote_name),unit_price:It(n.unit_price),file_name:G(n.file_name),uploaded_at:G(n.uploaded_at)??null,product_key:G(n.product_key),count:It(n.count)}}function Zd(e){const t=new Map;for(const n of e){const i=Te(n);if(!i.trim())continue;const s=t.get(i);if(!s){t.set(i,n);continue}const o=Number(s.count??0),r=Number(n.count??0),a=s.uploaded_at?new Date(s.uploaded_at).getTime():0,l=n.uploaded_at?new Date(n.uploaded_at).getTime():0;(r>o||r===o&&l>=a)&&t.set(i,n)}return Array.from(t.values())}function eu(e){const t=ie(e,rn),n=t.data!=null?ie(t.data,rn,"data"):{},i=me(t.approved_count)??me(n.approved_count)??(t.approved_count!=null?Ud(t.approved_count,rn,"approved_count"):void 0),s=G(t.message)??G(n.message)??"已批准并通知采购员。";return{approved_count:i,message:s}}function tu(e){return e.map(n=>`${n.product_key??""}|${n.product_name??""}|${n.specification??""}|${n.code??""}|${n.shortfall??0}`).sort().join(";")}async function Gs(e){e.procurementLoading=!0,e.procurementError=null;try{const t=Qd(e.basePath,In,{limit:"200",unapproved_only:"1"}),n=await fetch(t),i=await n.json().catch(()=>({}));if(!n.ok){e.procurementError=ue("加载采购建议列表",Le(i,`HTTP ${n.status}`),"无法查看最新缺货采购建议","点击“重试”重新加载列表"),e.procurementSuggestions=[];return}const s=ie(i,In),o=Ut(s.data,In,"data");e.procurementSuggestions=Zd(o.map(r=>Xd(r,In)))}catch(t){const n=t instanceof de||t instanceof Error?t.message:String(t);e.procurementError=ue("加载采购建议列表",n,"列表可能为空或字段错位","检查后端返回字段后重试"),e.procurementSuggestions=[]}finally{e.procurementLoading=!1}}async function cr(e,t){if(!t.length)return null;const n=tu(t),i=Yd(e),s=i.get(n);if(s)return s;const o=(async()=>{var r;e.procurementApproveBusy=!0,e.procurementApproveResult=null;try{const a=(r=e.basePath)!=null&&r.trim()?`${e.basePath.replace(/\/$/,"")}${rn}`:rn,l=Jd("procurement-approve",n||"single"),c=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json","X-Idempotency-Key":l,"Idempotency-Key":l},body:JSON.stringify({items:t})}),f=await c.json().catch(()=>({}));if(!c.ok)return e.procurementApproveResult={message:ue("采购批准",Le(f,`HTTP ${c.status}`),"这些缺货项仍待批准，采购员未收到通知","点击“重试”再次批准")},e.procurementApproveResult;const u=eu(f);return e.procurementApproveResult=u,await Gs(e),u}catch(a){const l=a instanceof de||a instanceof Error?a.message:String(a);return e.procurementApproveResult={message:ue("采购批准",l,"这些缺货项仍待批准，采购员未收到通知","点击“重试”再次批准")},e.procurementApproveResult}finally{e.procurementApproveBusy=!1,i.delete(n)}})();return i.set(n,o),o}function Vs(e){return(e??"").trim().toLowerCase()||"viewer"}function nu(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").map(t=>t.trim()).filter(Boolean):[]}const qa="openclaw.device.auth.v1";function Qs(){try{const e=window.localStorage.getItem(qa);if(!e)return null;const t=JSON.parse(e);return!t||t.version!==1||!t.deviceId||typeof t.deviceId!="string"||!t.tokens||typeof t.tokens!="object"?null:t}catch{return null}}function Wa(e){try{window.localStorage.setItem(qa,JSON.stringify(e))}catch{}}function iu(e){const t=Qs();if(!t||t.deviceId!==e.deviceId)return null;const n=Vs(e.role),i=t.tokens[n];return!i||typeof i.token!="string"?null:i}function Ga(e){const t=Vs(e.role),n={version:1,deviceId:e.deviceId,tokens:{}},i=Qs();i&&i.deviceId===e.deviceId&&(n.tokens={...i.tokens});const s={token:e.token,role:t,scopes:nu(e.scopes),updatedAtMs:Date.now()};return n.tokens[t]=s,Wa(n),s}function Va(e){const t=Qs();if(!t||t.deviceId!==e.deviceId)return;const n=Vs(e.role);if(!t.tokens[n])return;const i={...t,tokens:{...t.tokens}};delete i.tokens[n],Wa(i)}/*! noble-ed25519 - MIT License (c) 2019 Paul Miller (paulmillr.com) */const Qa={p:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffedn,n:0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn,h:8n,a:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffecn,d:0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3n,Gx:0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an,Gy:0x6666666666666666666666666666666666666666666666666666666666666658n},{p:pe,n:qn,Gx:dr,Gy:ur,a:Oi,d:Bi,h:su}=Qa,vt=32,Js=64,ou=(...e)=>{"captureStackTrace"in Error&&typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(...e)},oe=(e="")=>{const t=new Error(e);throw ou(t,oe),t},ru=e=>typeof e=="bigint",au=e=>typeof e=="string",lu=e=>e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array",it=(e,t,n="")=>{const i=lu(e),s=e==null?void 0:e.length,o=t!==void 0;if(!i||o&&s!==t){const r=n&&`"${n}" `,a=o?` of length ${t}`:"",l=i?`length=${s}`:`type=${typeof e}`;oe(r+"expected Uint8Array"+a+", got "+l)}return e},di=e=>new Uint8Array(e),Ja=e=>Uint8Array.from(e),Ya=(e,t)=>e.toString(16).padStart(t,"0"),Xa=e=>Array.from(it(e)).map(t=>Ya(t,2)).join(""),We={_0:48,_9:57,A:65,F:70,a:97,f:102},fr=e=>{if(e>=We._0&&e<=We._9)return e-We._0;if(e>=We.A&&e<=We.F)return e-(We.A-10);if(e>=We.a&&e<=We.f)return e-(We.a-10)},Za=e=>{const t="hex invalid";if(!au(e))return oe(t);const n=e.length,i=n/2;if(n%2)return oe(t);const s=di(i);for(let o=0,r=0;o<i;o++,r+=2){const a=fr(e.charCodeAt(r)),l=fr(e.charCodeAt(r+1));if(a===void 0||l===void 0)return oe(t);s[o]=a*16+l}return s},el=()=>globalThis==null?void 0:globalThis.crypto,cu=()=>{var e;return((e=el())==null?void 0:e.subtle)??oe("crypto.subtle must be defined, consider polyfill")},mn=(...e)=>{const t=di(e.reduce((i,s)=>i+it(s).length,0));let n=0;return e.forEach(i=>{t.set(i,n),n+=i.length}),t},du=(e=vt)=>el().getRandomValues(di(e)),Yn=BigInt,dt=(e,t,n,i="bad number: out of range")=>ru(e)&&t<=e&&e<n?e:oe(i),M=(e,t=pe)=>{const n=e%t;return n>=0n?n:t+n},tl=e=>M(e,qn),uu=(e,t)=>{(e===0n||t<=0n)&&oe("no inverse n="+e+" mod="+t);let n=M(e,t),i=t,s=0n,o=1n;for(;n!==0n;){const r=i/n,a=i%n,l=s-o*r;i=n,n=a,s=o,o=l}return i===1n?M(s,t):oe("no inverse")},fu=e=>{const t=ol[e];return typeof t!="function"&&oe("hashes."+e+" not set"),t},Ui=e=>e instanceof yt?e:oe("Point expected"),as=2n**256n,Ne=class Ne{constructor(t,n,i,s){W(this,"X");W(this,"Y");W(this,"Z");W(this,"T");const o=as;this.X=dt(t,0n,o),this.Y=dt(n,0n,o),this.Z=dt(i,1n,o),this.T=dt(s,0n,o),Object.freeze(this)}static CURVE(){return Qa}static fromAffine(t){return new Ne(t.x,t.y,1n,M(t.x*t.y))}static fromBytes(t,n=!1){const i=Bi,s=Ja(it(t,vt)),o=t[31];s[31]=o&-129;const r=il(s);dt(r,0n,n?as:pe);const l=M(r*r),c=M(l-1n),f=M(i*l+1n);let{isValid:u,value:p}=gu(c,f);u||oe("bad point: y not sqrt");const b=(p&1n)===1n,x=(o&128)!==0;return!n&&p===0n&&x&&oe("bad point: x==0, isLastByteOdd"),x!==b&&(p=M(-p)),new Ne(p,r,1n,M(p*r))}static fromHex(t,n){return Ne.fromBytes(Za(t),n)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}assertValidity(){const t=Oi,n=Bi,i=this;if(i.is0())return oe("bad point: ZERO");const{X:s,Y:o,Z:r,T:a}=i,l=M(s*s),c=M(o*o),f=M(r*r),u=M(f*f),p=M(l*t),b=M(f*M(p+c)),x=M(u+M(n*M(l*c)));if(b!==x)return oe("bad point: equation left != right (1)");const k=M(s*o),S=M(r*a);return k!==S?oe("bad point: equation left != right (2)"):this}equals(t){const{X:n,Y:i,Z:s}=this,{X:o,Y:r,Z:a}=Ui(t),l=M(n*a),c=M(o*s),f=M(i*a),u=M(r*s);return l===c&&f===u}is0(){return this.equals(Pt)}negate(){return new Ne(M(-this.X),this.Y,this.Z,M(-this.T))}double(){const{X:t,Y:n,Z:i}=this,s=Oi,o=M(t*t),r=M(n*n),a=M(2n*M(i*i)),l=M(s*o),c=t+n,f=M(M(c*c)-o-r),u=l+r,p=u-a,b=l-r,x=M(f*p),k=M(u*b),S=M(f*b),E=M(p*u);return new Ne(x,k,E,S)}add(t){const{X:n,Y:i,Z:s,T:o}=this,{X:r,Y:a,Z:l,T:c}=Ui(t),f=Oi,u=Bi,p=M(n*r),b=M(i*a),x=M(o*u*c),k=M(s*l),S=M((n+i)*(r+a)-p-b),E=M(k-x),P=M(k+x),F=M(b-f*p),L=M(S*E),A=M(P*F),h=M(S*F),_=M(E*P);return new Ne(L,A,_,h)}subtract(t){return this.add(Ui(t).negate())}multiply(t,n=!0){if(!n&&(t===0n||this.is0()))return Pt;if(dt(t,1n,qn),t===1n)return this;if(this.equals(bt))return Au(t).p;let i=Pt,s=bt;for(let o=this;t>0n;o=o.double(),t>>=1n)t&1n?i=i.add(o):n&&(s=s.add(o));return i}multiplyUnsafe(t){return this.multiply(t,!1)}toAffine(){const{X:t,Y:n,Z:i}=this;if(this.equals(Pt))return{x:0n,y:1n};const s=uu(i,pe);M(i*s)!==1n&&oe("invalid inverse");const o=M(t*s),r=M(n*s);return{x:o,y:r}}toBytes(){const{x:t,y:n}=this.assertValidity().toAffine(),i=nl(n);return i[31]|=t&1n?128:0,i}toHex(){return Xa(this.toBytes())}clearCofactor(){return this.multiply(Yn(su),!1)}isSmallOrder(){return this.clearCofactor().is0()}isTorsionFree(){let t=this.multiply(qn/2n,!1).double();return qn%2n&&(t=t.add(this)),t.is0()}};W(Ne,"BASE"),W(Ne,"ZERO");let yt=Ne;const bt=new yt(dr,ur,1n,M(dr*ur)),Pt=new yt(0n,1n,1n,0n);yt.BASE=bt;yt.ZERO=Pt;const nl=e=>Za(Ya(dt(e,0n,as),Js)).reverse(),il=e=>Yn("0x"+Xa(Ja(it(e)).reverse())),Pe=(e,t)=>{let n=e;for(;t-- >0n;)n*=n,n%=pe;return n},pu=e=>{const n=e*e%pe*e%pe,i=Pe(n,2n)*n%pe,s=Pe(i,1n)*e%pe,o=Pe(s,5n)*s%pe,r=Pe(o,10n)*o%pe,a=Pe(r,20n)*r%pe,l=Pe(a,40n)*a%pe,c=Pe(l,80n)*l%pe,f=Pe(c,80n)*l%pe,u=Pe(f,10n)*o%pe;return{pow_p_5_8:Pe(u,2n)*e%pe,b2:n}},pr=0x2b8324804fc1df0b2b4d00993dfbd7a72f431806ad2fe478c4ee1b274a0ea0b0n,gu=(e,t)=>{const n=M(t*t*t),i=M(n*n*t),s=pu(e*i).pow_p_5_8;let o=M(e*n*s);const r=M(t*o*o),a=o,l=M(o*pr),c=r===e,f=r===M(-e),u=r===M(-e*pr);return c&&(o=a),(f||u)&&(o=l),(M(o)&1n)===1n&&(o=M(-o)),{isValid:c||f,value:o}},ls=e=>tl(il(e)),Ys=(...e)=>ol.sha512Async(mn(...e)),hu=(...e)=>fu("sha512")(mn(...e)),sl=e=>{const t=e.slice(0,vt);t[0]&=248,t[31]&=127,t[31]|=64;const n=e.slice(vt,Js),i=ls(t),s=bt.multiply(i),o=s.toBytes();return{head:t,prefix:n,scalar:i,point:s,pointBytes:o}},Xs=e=>Ys(it(e,vt)).then(sl),mu=e=>sl(hu(it(e,vt))),vu=e=>Xs(e).then(t=>t.pointBytes),yu=e=>Ys(e.hashable).then(e.finish),bu=(e,t,n)=>{const{pointBytes:i,scalar:s}=e,o=ls(t),r=bt.multiply(o).toBytes();return{hashable:mn(r,i,n),finish:c=>{const f=tl(o+ls(c)*s);return it(mn(r,nl(f)),Js)}}},wu=async(e,t)=>{const n=it(e),i=await Xs(t),s=await Ys(i.prefix,n);return yu(bu(i,s,n))},ol={sha512Async:async e=>{const t=cu(),n=mn(e);return di(await t.digest("SHA-512",n.buffer))},sha512:void 0},$u=(e=du(vt))=>e,xu={getExtendedPublicKeyAsync:Xs,getExtendedPublicKey:mu,randomSecretKey:$u},Xn=8,ku=256,rl=Math.ceil(ku/Xn)+1,cs=2**(Xn-1),Su=()=>{const e=[];let t=bt,n=t;for(let i=0;i<rl;i++){n=t,e.push(n);for(let s=1;s<cs;s++)n=n.add(t),e.push(n);t=n.double()}return e};let gr;const hr=(e,t)=>{const n=t.negate();return e?n:t},Au=e=>{const t=gr||(gr=Su());let n=Pt,i=bt;const s=2**Xn,o=s,r=Yn(s-1),a=Yn(Xn);for(let l=0;l<rl;l++){let c=Number(e&r);e>>=a,c>cs&&(c-=o,e+=1n);const f=l*cs,u=f,p=f+Math.abs(c)-1,b=l%2!==0,x=c<0;c===0?i=i.add(hr(b,t[u])):n=n.add(hr(x,t[p]))}return e!==0n&&oe("invalid wnaf"),{p:n,f:i}},zi="openclaw-device-identity-v1";function ds(e){let t="";for(const n of e)t+=String.fromCharCode(n);return btoa(t).replaceAll("+","-").replaceAll("/","_").replace(/=+$/g,"")}function al(e){const t=e.replaceAll("-","+").replaceAll("_","/"),n=t+"=".repeat((4-t.length%4)%4),i=atob(n),s=new Uint8Array(i.length);for(let o=0;o<i.length;o+=1)s[o]=i.charCodeAt(o);return s}function _u(e){return Array.from(e).map(t=>t.toString(16).padStart(2,"0")).join("")}async function ll(e){const t=await crypto.subtle.digest("SHA-256",e.slice().buffer);return _u(new Uint8Array(t))}async function Cu(){const e=xu.randomSecretKey(),t=await vu(e);return{deviceId:await ll(t),publicKey:ds(t),privateKey:ds(e)}}async function Zs(){try{const n=localStorage.getItem(zi);if(n){const i=JSON.parse(n);if((i==null?void 0:i.version)===1&&typeof i.deviceId=="string"&&typeof i.publicKey=="string"&&typeof i.privateKey=="string"){const s=await ll(al(i.publicKey));if(s!==i.deviceId){const o={...i,deviceId:s};return localStorage.setItem(zi,JSON.stringify(o)),{deviceId:s,publicKey:i.publicKey,privateKey:i.privateKey}}return{deviceId:i.deviceId,publicKey:i.publicKey,privateKey:i.privateKey}}}}catch{}const e=await Cu(),t={version:1,deviceId:e.deviceId,publicKey:e.publicKey,privateKey:e.privateKey,createdAtMs:Date.now()};return localStorage.setItem(zi,JSON.stringify(t)),e}async function Tu(e,t){const n=al(e),i=new TextEncoder().encode(t),s=await wu(i,n);return ds(s)}async function st(e,t){if(!(!e.client||!e.connected)&&!e.devicesLoading){e.devicesLoading=!0,t!=null&&t.quiet||(e.devicesError=null);try{const n=await e.client.request("device.pair.list",{});e.devicesList={pending:Array.isArray(n==null?void 0:n.pending)?n.pending:[],paired:Array.isArray(n==null?void 0:n.paired)?n.paired:[]}}catch(n){t!=null&&t.quiet||(e.devicesError=String(n))}finally{e.devicesLoading=!1}}}async function Eu(e,t){if(!(!e.client||!e.connected))try{await e.client.request("device.pair.approve",{requestId:t}),await st(e)}catch(n){e.devicesError=String(n)}}async function Ru(e,t){if(!(!e.client||!e.connected||!window.confirm("Reject this device pairing request?")))try{await e.client.request("device.pair.reject",{requestId:t}),await st(e)}catch(i){e.devicesError=String(i)}}async function Lu(e,t){if(!(!e.client||!e.connected))try{const n=await e.client.request("device.token.rotate",t);if(n!=null&&n.token){const i=await Zs(),s=n.role??t.role;(n.deviceId===i.deviceId||t.deviceId===i.deviceId)&&Ga({deviceId:i.deviceId,role:s,token:n.token,scopes:n.scopes??t.scopes??[]}),window.prompt("New device token (copy and store securely):",n.token)}await st(e)}catch(n){e.devicesError=String(n)}}async function Iu(e,t){if(!(!e.client||!e.connected||!window.confirm(`Revoke token for ${t.deviceId} (${t.role})?`)))try{await e.client.request("device.token.revoke",t);const i=await Zs();t.deviceId===i.deviceId&&Va({deviceId:i.deviceId,role:t.role}),await st(e)}catch(i){e.devicesError=String(i)}}function Mu(e){if(!e||e.kind==="gateway")return{method:"exec.approvals.get",params:{}};const t=e.nodeId.trim();return t?{method:"exec.approvals.node.get",params:{nodeId:t}}:null}function Pu(e,t){if(!e||e.kind==="gateway")return{method:"exec.approvals.set",params:t};const n=e.nodeId.trim();return n?{method:"exec.approvals.node.set",params:{...t,nodeId:n}}:null}async function eo(e,t){if(!(!e.client||!e.connected)&&!e.execApprovalsLoading){e.execApprovalsLoading=!0,e.lastError=null;try{const n=Mu(t);if(!n){e.lastError="Select a node before loading exec approvals.";return}const i=await e.client.request(n.method,n.params);Du(e,i)}catch(n){e.lastError=String(n)}finally{e.execApprovalsLoading=!1}}}function Du(e,t){e.execApprovalsSnapshot=t,e.execApprovalsDirty||(e.execApprovalsForm=mt(t.file??{}))}async function Fu(e,t){var n,i;if(!(!e.client||!e.connected)){e.execApprovalsSaving=!0,e.lastError=null;try{const s=(n=e.execApprovalsSnapshot)==null?void 0:n.hash;if(!s){e.lastError="Exec approvals hash missing; reload and retry.";return}const o=e.execApprovalsForm??((i=e.execApprovalsSnapshot)==null?void 0:i.file)??{},r=Pu(t,{file:o,baseHash:s});if(!r){e.lastError="Select a node before saving exec approvals.";return}await e.client.request(r.method,r.params),e.execApprovalsDirty=!1,await eo(e,t)}catch(s){e.lastError=String(s)}finally{e.execApprovalsSaving=!1}}}function Nu(e,t,n){var s;const i=mt(e.execApprovalsForm??((s=e.execApprovalsSnapshot)==null?void 0:s.file)??{});Ea(i,t,n),e.execApprovalsForm=i,e.execApprovalsDirty=!0}function Ou(e,t){var i;const n=mt(e.execApprovalsForm??((i=e.execApprovalsSnapshot)==null?void 0:i.file)??{});Ra(n,t),e.execApprovalsForm=n,e.execApprovalsDirty=!0}function $e(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams;for(const[r,a]of Object.entries(n))o.set(r,String(a));return`${s}?${o.toString()}`}async function ui(e,t){e.oosLoading=!0,e.oosError=null;try{const[s,o,r,a]=await Promise.all([fetch($e(e.basePath,"/api/oos/stats")),fetch($e(e.basePath,"/api/oos/list",{limit:100})),fetch($e(e.basePath,"/api/oos/by-file",{limit:50})),fetch($e(e.basePath,"/api/oos/by-time",{days:30}))]),l=await s.json().catch(()=>({})),c=await o.json().catch(()=>({})),f=await r.json().catch(()=>({})),u=await a.json().catch(()=>({}));l.success&&l.data?(e.oosStats=l.data,e.oosDb=l.db??null):(e.oosStats=null,s.ok||(e.oosError=l.detail??`stats: ${s.status}`)),c.success&&Array.isArray(c.data)?e.oosList=c.data:(e.oosList=[],!e.oosError&&!o.ok&&(e.oosError=c.detail??`list: ${o.status}`)),f.success&&Array.isArray(f.data)?e.oosByFile=f.data:e.oosByFile=[],u.success&&Array.isArray(u.data)?e.oosByTime=u.data:e.oosByTime=[]}catch(s){e.oosError=s instanceof Error?s.message:String(s),e.oosStats=null,e.oosList=[],e.oosByFile=[],e.oosByTime=[]}finally{e.oosLoading=!1}}async function Bu(e,t){if(!(t!=null&&t.trim()))return!1;try{const n=await fetch($e(e.basePath,"/api/oos/delete"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_key:t.trim()})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(await ui(e),!0):(e.oosError=i.detail??`删除失败: ${n.status}`,!1)}catch(n){return e.oosError=n instanceof Error?n.message:String(n),!1}}async function Uu(e,t){const n=(t.product_name||"").trim();if(!n)return!1;try{const i=await fetch($e(e.basePath,"/api/oos/add"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_name:n,specification:(t.specification??"").trim(),quantity:t.quantity??0,unit:(t.unit??"").trim()})}),s=await i.json().catch(()=>({}));return i.ok&&s.success?(await ui(e),!0):(e.oosError=s.detail??`添加失败: ${i.status}`,!1)}catch(i){return e.oosError=i instanceof Error?i.message:String(i),!1}}async function zu(e){try{const t=await fetch($e(e.basePath,"/api/oos/stats")),n=await t.json().catch(()=>({}));if(t.ok&&n.success&&n.data)e.overviewOosStats=n.data,e.overviewOosError=null;else{e.overviewOosStats=null;const i=typeof n.detail=="string"?n.detail:n.message??n.error??`oos stats: ${t.status}`;e.overviewOosError=i}}catch(t){e.overviewOosStats=null,e.overviewOosError=t instanceof Error?t.message:String(t)}}async function fi(e,t){e.shortageLoading=!0,e.shortageError=null;try{const[s,o,r,a]=await Promise.all([fetch($e(e.basePath,"/api/shortage/stats"),{method:"GET"}),fetch($e(e.basePath,"/api/shortage/list",{limit:100}),{method:"GET"}),fetch($e(e.basePath,"/api/shortage/by-file"),{method:"GET"}),fetch($e(e.basePath,"/api/shortage/by-time",{days:30}),{method:"GET"})]),l=await s.json().catch(()=>({})),c=await o.json().catch(()=>({})),f=await r.json().catch(()=>({})),u=await a.json().catch(()=>({}));if(l.success&&l.data)e.shortageStats=l.data,e.shortageDb=l.db??null;else if(e.shortageStats=null,!e.shortageError&&!s.ok){const p=typeof l.detail=="string"?l.detail:l.message??l.error;e.shortageError=p??`stats: ${s.status} ${s.statusText}`}if(c.success&&Array.isArray(c.data))e.shortageList=c.data;else if(e.shortageList=[],!e.shortageError&&!o.ok){const p=typeof c.detail=="string"?c.detail:c.message??c.error;e.shortageError=p??`list: ${o.status} ${o.statusText}`}if(f.success&&Array.isArray(f.data))e.shortageByFile=f.data;else if(e.shortageByFile=[],!e.shortageError&&!r.ok){const p=typeof f.detail=="string"?f.detail:f.message??f.error;e.shortageError=p??`by-file: ${r.status} ${r.statusText}`}if(u.success&&Array.isArray(u.data))e.shortageByTime=u.data;else if(e.shortageByTime=[],!e.shortageError&&!a.ok){const p=typeof u.detail=="string"?u.detail:u.message??u.error;e.shortageError=p??`by-time: ${a.status} ${a.statusText}`}}catch(s){e.shortageError=s instanceof Error?s.message:String(s),e.shortageStats=null,e.shortageList=[],e.shortageByFile=[],e.shortageByTime=[]}finally{e.shortageLoading=!1}}async function Hu(e,t){if(!(t!=null&&t.trim()))return!1;try{const n=await fetch($e(e.basePath,"/api/shortage/delete"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_key:t.trim()})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(await fi(e),!0):(e.shortageError=i.detail??`删除失败: ${n.status}`,!1)}catch(n){return e.shortageError=n instanceof Error?n.message:String(n),!1}}async function Ku(e,t){const n=(t.product_name||"").trim();if(!n)return!1;try{const i=await fetch($e(e.basePath,"/api/shortage/add"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_name:n,specification:(t.specification??"").trim(),quantity:t.quantity??0,available_qty:t.available_qty??0})}),s=await i.json().catch(()=>({}));return i.ok&&s.success?(await fi(e),!0):(e.shortageError=s.detail??`添加失败: ${i.status}`,!1)}catch(i){return e.shortageError=i instanceof Error?i.message:String(i),!1}}async function ju(e){try{const t=await fetch($e(e.basePath,"/api/shortage/stats"),{method:"GET"}),n=await t.json().catch(()=>({}));if(t.ok&&n.success&&n.data)e.overviewShortageStats=n.data,e.overviewShortageError=null;else{e.overviewShortageStats=null;const i=typeof n.detail=="string"?n.detail:n.message??n.error??`shortage stats: ${t.status}`;e.overviewShortageError=i}}catch(t){e.overviewShortageStats=null,e.overviewShortageError=t instanceof Error?t.message:String(t)}}async function qu(e){if(!(!e.client||!e.connected)&&!e.presenceLoading){e.presenceLoading=!0,e.presenceError=null,e.presenceStatus=null;try{const t=await e.client.request("system-presence",{});Array.isArray(t)?(e.presenceEntries=t,e.presenceStatus=t.length===0?"No instances yet.":null):(e.presenceEntries=[],e.presenceStatus="No presence payload.")}catch(t){e.presenceError=String(t)}finally{e.presenceLoading=!1}}}async function to(e,t){if(!(!e.client||!e.connected)&&!e.sessionsLoading){e.sessionsLoading=!0,e.sessionsError=null;try{const n=(t==null?void 0:t.includeGlobal)??e.sessionsIncludeGlobal,i=(t==null?void 0:t.includeUnknown)??e.sessionsIncludeUnknown,s=(t==null?void 0:t.activeMinutes)??or(e.sessionsFilterActive,0),o=(t==null?void 0:t.limit)??or(e.sessionsFilterLimit,0),r={includeGlobal:n,includeUnknown:i};s>0&&(r.activeMinutes=s),o>0&&(r.limit=o);const a=await e.client.request("sessions.list",r);a&&(e.sessionsResult=a)}catch(n){e.sessionsError=String(n)}finally{e.sessionsLoading=!1}}}function Ot(e,t,n){if(!t.trim())return;const i={...e.skillMessages};n?i[t]=n:delete i[t],e.skillMessages=i}function pi(e){return e instanceof Error?e.message:String(e)}async function $n(e,t){if(t!=null&&t.clearMessages&&Object.keys(e.skillMessages).length>0&&(e.skillMessages={}),!(!e.client||!e.connected)&&!e.skillsLoading){e.skillsLoading=!0,e.skillsError=null;try{const n=await e.client.request("skills.status",{});n&&(e.skillsReport=n)}catch(n){e.skillsError=pi(n)}finally{e.skillsLoading=!1}}}function Wu(e,t,n){e.skillEdits={...e.skillEdits,[t]:n}}async function Gu(e,t,n){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{await e.client.request("skills.update",{skillKey:t,enabled:n}),await $n(e),Ot(e,t,{kind:"success",message:n?"Skill enabled":"Skill disabled"})}catch(i){const s=pi(i);e.skillsError=s,Ot(e,t,{kind:"error",message:s})}finally{e.skillsBusyKey=null}}}async function Vu(e,t){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const n=e.skillEdits[t]??"";await e.client.request("skills.update",{skillKey:t,apiKey:n}),await $n(e),Ot(e,t,{kind:"success",message:"API key saved"})}catch(n){const i=pi(n);e.skillsError=i,Ot(e,t,{kind:"error",message:i})}finally{e.skillsBusyKey=null}}}async function Qu(e,t,n,i){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const s=await e.client.request("skills.install",{name:n,installId:i,timeoutMs:12e4});await $n(e),Ot(e,t,{kind:"success",message:(s==null?void 0:s.message)??"Installed"})}catch(s){const o=pi(s);e.skillsError=o,Ot(e,t,{kind:"error",message:o})}finally{e.skillsBusyKey=null}}}const Ju=[{label:"chat",tabs:["chat"]},{label:"control",tabs:["overview","channels","instances","sessions","work","cron"]},{label:"agent",tabs:["agents","skills","nodes"]},{label:"settings",tabs:["config","debug","logs"]}],cl={agents:"/agents",overview:"/overview",channels:"/channels",instances:"/instances",sessions:"/sessions",work:"/work",cron:"/cron",skills:"/skills",nodes:"/nodes",chat:"/chat",config:"/config",debug:"/debug",logs:"/logs"},dl=new Map(Object.entries(cl).map(([e,t])=>[t,e]));function zt(e){if(!e)return"";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t==="/"?"":(t.endsWith("/")&&(t=t.slice(0,-1)),t)}function vn(e){if(!e)return"/";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t.length>1&&t.endsWith("/")&&(t=t.slice(0,-1)),t}function ul(e,t=""){const n=zt(t),i=cl[e];return n?`${n}${i}`:i}function fl(e,t=""){const n=zt(t);let i=e||"/";n&&(i===n?i="/":i.startsWith(`${n}/`)&&(i=i.slice(n.length)));let s=vn(i).toLowerCase();return s.endsWith("/index.html")&&(s="/"),s==="/"?"chat":dl.get(s)??null}function Yu(e){let t=vn(e);if(t.endsWith("/index.html")&&(t=vn(t.slice(0,-11))),t==="/")return"";const n=t.split("/").filter(Boolean);if(n.length===0)return"";for(let i=0;i<n.length;i++){const s=`/${n.slice(i).join("/")}`.toLowerCase();if(dl.has(s)){const o=n.slice(0,i);return o.length?`/${o.join("/")}`:""}}return`/${n.join("/")}`}function Xu(e){switch(e){case"agents":return"folder";case"chat":return"messageSquare";case"overview":return"barChart";case"channels":return"fileText";case"instances":return"radio";case"sessions":return"fileText";case"work":return"fileText";case"cron":return"loader";case"skills":return"zap";case"nodes":return"monitor";case"config":return"settings";case"debug":return"bug";case"logs":return"scrollText";default:return"folder"}}function us(e){return g(`tabs.${e}`)}function Zu(e){return g(`subtitles.${e}`)}const pl="openclaw.control.settings.v1";function ef(){const t={gatewayUrl:`${location.protocol==="https:"?"wss":"ws"}://${location.host}/ws`,token:"",sessionKey:"main",lastActiveSessionKey:"main",theme:"system",chatFocusMode:!1,chatShowThinking:!0,splitRatio:.6,navCollapsed:!1,navGroupsCollapsed:{}};try{const n=localStorage.getItem(pl);if(!n)return t;const i=JSON.parse(n);return{gatewayUrl:typeof i.gatewayUrl=="string"&&i.gatewayUrl.trim()?i.gatewayUrl.trim():t.gatewayUrl,token:typeof i.token=="string"?i.token:t.token,sessionKey:typeof i.sessionKey=="string"&&i.sessionKey.trim()?i.sessionKey.trim():t.sessionKey,lastActiveSessionKey:typeof i.lastActiveSessionKey=="string"&&i.lastActiveSessionKey.trim()?i.lastActiveSessionKey.trim():typeof i.sessionKey=="string"&&i.sessionKey.trim()||t.lastActiveSessionKey,theme:i.theme==="light"||i.theme==="dark"||i.theme==="system"?i.theme:t.theme,chatFocusMode:typeof i.chatFocusMode=="boolean"?i.chatFocusMode:t.chatFocusMode,chatShowThinking:typeof i.chatShowThinking=="boolean"?i.chatShowThinking:t.chatShowThinking,splitRatio:typeof i.splitRatio=="number"&&i.splitRatio>=.4&&i.splitRatio<=.7?i.splitRatio:t.splitRatio,navCollapsed:typeof i.navCollapsed=="boolean"?i.navCollapsed:t.navCollapsed,navGroupsCollapsed:typeof i.navGroupsCollapsed=="object"&&i.navGroupsCollapsed!==null?i.navGroupsCollapsed:t.navGroupsCollapsed,locale:Fs(i.locale)?i.locale:void 0}}catch{return t}}function tf(e){localStorage.setItem(pl,JSON.stringify(e))}const Mn=e=>Number.isNaN(e)?.5:e<=0?0:e>=1?1:e,nf=()=>typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches??!1,Pn=e=>{e.classList.remove("theme-transition"),e.style.removeProperty("--theme-switch-x"),e.style.removeProperty("--theme-switch-y")},sf=({nextTheme:e,applyTheme:t,context:n,currentTheme:i})=>{var c;if(i===e)return;const s=globalThis.document??null;if(!s){t();return}const o=s.documentElement,r=s,a=nf();if(!!r.startViewTransition&&!a){let f=.5,u=.5;if((n==null?void 0:n.pointerClientX)!==void 0&&(n==null?void 0:n.pointerClientY)!==void 0&&typeof window<"u")f=Mn(n.pointerClientX/window.innerWidth),u=Mn(n.pointerClientY/window.innerHeight);else if(n!=null&&n.element){const p=n.element.getBoundingClientRect();p.width>0&&p.height>0&&typeof window<"u"&&(f=Mn((p.left+p.width/2)/window.innerWidth),u=Mn((p.top+p.height/2)/window.innerHeight))}o.style.setProperty("--theme-switch-x",`${f*100}%`),o.style.setProperty("--theme-switch-y",`${u*100}%`),o.classList.add("theme-transition");try{const p=(c=r.startViewTransition)==null?void 0:c.call(r,()=>{t()});p!=null&&p.finished?p.finished.finally(()=>Pn(o)):Pn(o)}catch{Pn(o),t()}return}t(),Pn(o)};function of(){return typeof window>"u"||typeof window.matchMedia!="function"||window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function no(e){return e==="system"?of():e}function nt(e,t){var i;const n={...t,lastActiveSessionKey:((i=t.lastActiveSessionKey)==null?void 0:i.trim())||t.sessionKey.trim()||"main"};e.settings=n,tf(n),t.theme!==e.theme&&(e.theme=t.theme,gi(e,no(t.theme))),e.applySessionKey=e.settings.lastActiveSessionKey}function gl(e,t){const n=t.trim();n&&e.settings.lastActiveSessionKey!==n&&nt(e,{...e.settings,lastActiveSessionKey:n})}function rf(e){if(!window.location.search&&!window.location.hash)return;const t=new URL(window.location.href),n=new URLSearchParams(t.search),i=new URLSearchParams(t.hash.startsWith("#")?t.hash.slice(1):t.hash),s=n.get("token")??i.get("token"),o=n.get("password")??i.get("password"),r=n.get("session")??i.get("session"),a=n.get("gatewayUrl")??i.get("gatewayUrl");let l=!1;if(s!=null){const f=s.trim();f&&f!==e.settings.token&&nt(e,{...e.settings,token:f}),n.delete("token"),i.delete("token"),l=!0}if(o!=null&&(n.delete("password"),i.delete("password"),l=!0),r!=null){const f=r.trim();f&&(e.sessionKey=f,nt(e,{...e.settings,sessionKey:f,lastActiveSessionKey:f}))}if(a!=null){const f=a.trim();f&&f!==e.settings.gatewayUrl&&(e.pendingGatewayUrl=f),n.delete("gatewayUrl"),i.delete("gatewayUrl"),l=!0}if(!l)return;t.search=n.toString();const c=i.toString();t.hash=c?`#${c}`:"",window.history.replaceState({},"",t.toString())}function af(e,t){e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?Bs(e):Us(e),t==="debug"?zs(e):Hs(e),io(e),ml(e,t,!1)}function lf(e,t,n){sf({nextTheme:t,applyTheme:()=>{e.theme=t,nt(e,{...e.settings,theme:t}),gi(e,no(t))},context:n,currentTheme:e.theme})}async function io(e){var t,n,i,s,o,r;if(e.tab==="overview"&&(await vl(e),await Promise.all([zu(e),ju(e)])),e.tab==="channels"&&await Ba(e),e.tab==="instances"){const a=e;await ui(a),await fi(a)}if(e.tab==="sessions"&&await Gs(e),e.tab==="cron"&&await Ws(e),e.tab==="skills"&&await $n(e),e.tab==="agents"){await Ks(e),await Be(e);const a=((n=(t=e.agentsList)==null?void 0:t.agents)==null?void 0:n.map(c=>c.id))??[];a.length>0&&Oa(e,a);const l=e.agentsSelectedId??((i=e.agentsList)==null?void 0:i.defaultId)??((r=(o=(s=e.agentsList)==null?void 0:s.agents)==null?void 0:o[0])==null?void 0:r.id);l&&(Na(e,l),e.agentsPanel==="skills"&&jn(e,l),e.agentsPanel==="channels"&&Ae(e,!1),e.agentsPanel==="cron"&&so(e))}e.tab==="nodes"&&(await ci(e),await st(e),await Be(e),await eo(e)),e.tab==="chat"&&(await Sl(e),wn(e,!e.chatHasAutoScrolled)),e.tab==="config"&&(await sd(e),await Be(e)),e.tab==="debug"&&(await li(e),e.eventLog=e.eventLogBuffer),e.tab==="logs"&&(e.logsAtBottom=!0,await Os(e,{reset:!0}),Fa(e,!0))}function cf(){if(typeof window>"u")return"";const e=window.__OPENCLAW_CONTROL_UI_BASE_PATH__;return typeof e=="string"&&e.trim()?zt(e):Yu(window.location.pathname)}function df(e){e.theme=e.settings.theme??"system",gi(e,no(e.theme))}function gi(e,t){if(e.themeResolved=t,typeof document>"u")return;const n=document.documentElement;n.dataset.theme=t,n.style.colorScheme=t}function uf(e){if(typeof window>"u"||typeof window.matchMedia!="function")return;if(e.themeMedia=window.matchMedia("(prefers-color-scheme: dark)"),e.themeMediaHandler=n=>{e.theme==="system"&&gi(e,n.matches?"dark":"light")},typeof e.themeMedia.addEventListener=="function"){e.themeMedia.addEventListener("change",e.themeMediaHandler);return}e.themeMedia.addListener(e.themeMediaHandler)}function ff(e){if(!e.themeMedia||!e.themeMediaHandler)return;if(typeof e.themeMedia.removeEventListener=="function"){e.themeMedia.removeEventListener("change",e.themeMediaHandler);return}e.themeMedia.removeListener(e.themeMediaHandler),e.themeMedia=null,e.themeMediaHandler=null}function pf(e,t){if(typeof window>"u")return;const n=fl(window.location.pathname,e.basePath)??"chat";hl(e,n),ml(e,n,t)}function gf(e){var s;if(typeof window>"u")return;const t=fl(window.location.pathname,e.basePath);if(!t)return;const i=(s=new URL(window.location.href).searchParams.get("session"))==null?void 0:s.trim();i&&(e.sessionKey=i,nt(e,{...e.settings,sessionKey:i,lastActiveSessionKey:i})),hl(e,t)}function hl(e,t){e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?Bs(e):Us(e),t==="debug"?zs(e):Hs(e),e.connected&&io(e)}function ml(e,t,n){if(typeof window>"u")return;const i=vn(ul(t,e.basePath)),s=vn(window.location.pathname),o=new URL(window.location.href);t==="chat"&&e.sessionKey?o.searchParams.set("session",e.sessionKey):o.searchParams.delete("session"),s!==i&&(o.pathname=i),n?window.history.replaceState({},"",o.toString()):window.history.pushState({},"",o.toString())}function hf(e,t,n){if(typeof window>"u")return;const i=new URL(window.location.href);i.searchParams.set("session",t),window.history.replaceState({},"",i.toString())}async function vl(e){await Promise.all([Ae(e,!1),qu(e),to(e),Ha(e),li(e)])}async function so(e){await Promise.all([Ae(e,!1),Ha(e),Bd(e)])}async function mf(e){await Ws(e)}async function vf(e){await Gs(e)}const mr=50,yf=80,bf=12e4;function wf(e){if(!e||typeof e!="object")return null;const t=e;if(typeof t.text=="string")return t.text;const n=t.content;if(!Array.isArray(n))return null;const i=n.map(s=>{if(!s||typeof s!="object")return null;const o=s;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(s=>!!s);return i.length===0?null:i.join(`
`)}function vr(e){if(e==null)return null;if(typeof e=="number"||typeof e=="boolean")return String(e);const t=wf(e);let n;if(typeof e=="string")n=e;else if(t)n=t;else try{n=JSON.stringify(e,null,2)}catch{n=String(e)}const i=za(n,bf);return i.truncated?`${i.text}

… truncated (${i.total} chars, showing first ${i.text.length}).`:i.text}function $f(e){const t=[];return t.push({type:"toolcall",name:e.name,arguments:e.args??{}}),e.output&&t.push({type:"toolresult",name:e.name,text:e.output}),{role:"assistant",toolCallId:e.toolCallId,runId:e.runId,content:t,timestamp:e.startedAt}}function xf(e){if(e.toolStreamOrder.length<=mr)return;const t=e.toolStreamOrder.length-mr,n=e.toolStreamOrder.splice(0,t);for(const i of n)e.toolStreamById.delete(i)}function kf(e){e.chatToolMessages=e.toolStreamOrder.map(t=>{var n;return(n=e.toolStreamById.get(t))==null?void 0:n.message}).filter(t=>!!t)}function fs(e){e.toolStreamSyncTimer!=null&&(clearTimeout(e.toolStreamSyncTimer),e.toolStreamSyncTimer=null),kf(e)}function Sf(e,t=!1){if(t){fs(e);return}e.toolStreamSyncTimer==null&&(e.toolStreamSyncTimer=window.setTimeout(()=>fs(e),yf))}function hi(e){e.toolStreamById.clear(),e.toolStreamOrder=[],e.chatToolMessages=[],fs(e)}const Af=5e3;function _f(e,t){var s;const n=t.data??{},i=typeof n.phase=="string"?n.phase:"";e.compactionClearTimer!=null&&(window.clearTimeout(e.compactionClearTimer),e.compactionClearTimer=null),i==="start"?e.compactionStatus={active:!0,startedAt:Date.now(),completedAt:null}:i==="end"&&(e.compactionStatus={active:!1,startedAt:((s=e.compactionStatus)==null?void 0:s.startedAt)??null,completedAt:Date.now()},e.compactionClearTimer=window.setTimeout(()=>{e.compactionStatus=null,e.compactionClearTimer=null},Af))}function Cf(e,t){if(!t)return;if(t.stream==="compaction"){_f(e,t);return}if(t.stream!=="tool")return;const n=typeof t.sessionKey=="string"?t.sessionKey:void 0;if(n&&n!==e.sessionKey||!n&&e.chatRunId&&t.runId!==e.chatRunId||e.chatRunId&&t.runId!==e.chatRunId||!e.chatRunId)return;const i=t.data??{},s=typeof i.toolCallId=="string"?i.toolCallId:"";if(!s)return;const o=typeof i.name=="string"?i.name:"tool",r=typeof i.phase=="string"?i.phase:"",a=r==="start"?i.args:void 0,l=r==="update"?vr(i.partialResult):r==="result"?vr(i.result):void 0,c=Date.now();let f=e.toolStreamById.get(s);f?(f.name=o,a!==void 0&&(f.args=a),l!==void 0&&(f.output=l||void 0),f.updatedAt=c):(f={toolCallId:s,runId:t.runId,sessionKey:n,name:o,args:a,output:l||void 0,startedAt:typeof t.ts=="number"?t.ts:c,updatedAt:c,message:{}},e.toolStreamById.set(s,f),e.toolStreamOrder.push(s)),f.message=$f(f),xf(e),Sf(e,r==="result")}function Hi(e){return e==null?"":String(e).trim()}const Ki=new WeakMap,ji=new WeakMap;function ps(e){const t=e,n=typeof t.role=="string"?t.role:"",i=t.content;if(typeof i=="string")return n==="assistant"?Ni(i):Hi(i);if(Array.isArray(i)){const s=i.map(o=>{const r=o;return r.type==="text"&&typeof r.text=="string"?r.text:null}).filter(o=>typeof o=="string");if(s.length>0){const o=s.join(`
`);return n==="assistant"?Ni(o):Hi(o)}}return typeof t.text=="string"?n==="assistant"?Ni(t.text):Hi(t.text):null}function yl(e){if(!e||typeof e!="object")return ps(e);const t=e;if(Ki.has(t))return Ki.get(t)??null;const n=ps(e);return Ki.set(t,n),n}function yr(e){const n=e.content,i=[];if(Array.isArray(n))for(const a of n){const l=a;if(l.type==="thinking"&&typeof l.thinking=="string"){const c=l.thinking.trim();c&&i.push(c)}}if(i.length>0)return i.join(`
`);const s=Ef(e);if(!s)return null;const r=[...s.matchAll(/<\s*think(?:ing)?\s*>([\s\S]*?)<\s*\/\s*think(?:ing)?\s*>/gi)].map(a=>(a[1]??"").trim()).filter(Boolean);return r.length>0?r.join(`
`):null}function Tf(e){if(!e||typeof e!="object")return yr(e);const t=e;if(ji.has(t))return ji.get(t)??null;const n=yr(e);return ji.set(t,n),n}function Ef(e){const t=e,n=t.content;if(typeof n=="string")return n;if(Array.isArray(n)){const i=n.map(s=>{const o=s;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(s=>typeof s=="string");if(i.length>0)return i.join(`
`)}return typeof t.text=="string"?t.text:null}function Rf(e){const t=e.trim();if(!t)return"";const n=t.split(/\r?\n/).map(i=>i.trim()).filter(Boolean).map(i=>`_${i}_`);return n.length?["_Reasoning:_",...n].join(`
`):""}let br=!1;function wr(e){e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t="";for(let n=0;n<e.length;n++)t+=e[n].toString(16).padStart(2,"0");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}function Lf(){const e=new Uint8Array(16),t=Date.now();for(let n=0;n<e.length;n++)e[n]=Math.floor(Math.random()*256);return e[0]^=t&255,e[1]^=t>>>8&255,e[2]^=t>>>16&255,e[3]^=t>>>24&255,e}function If(){br||(br=!0,console.warn("[uuid] crypto API missing; falling back to weak randomness"))}function oo(e=globalThis.crypto){if(e&&typeof e.randomUUID=="function")return e.randomUUID();if(e&&typeof e.getRandomValues=="function"){const t=new Uint8Array(16);return e.getRandomValues(t),wr(t)}return If(),wr(Lf())}async function yn(e){if(!(!e.client||!e.connected)){e.chatLoading=!0,e.lastError=null;try{const t=await e.client.request("chat.history",{sessionKey:e.sessionKey,limit:200}),n=Array.isArray(t.messages)?t.messages:[];(n.length>0||e.chatMessages.length===0)&&(e.chatMessages=n),e.chatThinkingLevel=t.thinkingLevel??null}catch(t){e.lastError=String(t)}finally{e.chatLoading=!1}}}function Mf(e){const t=/^data:([^;]+);base64,(.+)$/.exec(e);return t?{mimeType:t[1],content:t[2]}:null}function Pf(e){if(!e||typeof e!="object")return null;const t=e;return t.role!=="assistant"||!("content"in t)||!Array.isArray(t.content)?null:t}async function Df(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",i=n?`${n}/api/quotation/upload`:"/api/quotation/upload",s=new FormData;s.append("file",t);try{const o=await fetch(i,{method:"POST",body:s,credentials:"same-origin"});if(!o.ok){const a=await o.text();throw new Error(a||`Upload failed: ${o.status}`)}const r=await o.json();return typeof r.file_path!="string"?null:{file_path:r.file_path,file_name:r.file_name??t.name}}catch(o){throw console.error("uploadChatFile",o),o}}async function Ff(e,t,n,i){if(!e.client||!e.connected)return null;const s=t.trim(),o=n&&n.length>0;if(!s&&!o)return null;const r=Date.now(),a=[];if(s&&a.push({type:"text",text:s}),o)for(const u of n)a.push({type:"image",source:{type:"base64",media_type:u.mimeType,data:u.dataUrl}});e.chatMessages=[...e.chatMessages,{role:"user",content:a,timestamp:r}],e.chatSending=!0,e.lastError=null;const l=oo();e.chatRunId=l,e.chatStream="",e.chatStreamStartedAt=r;const c=o?n.map(u=>{const p=Mf(u.dataUrl);return p?{type:"image",mimeType:p.mimeType,content:p.content}:null}).filter(u=>u!==null):void 0,f=i!=null&&i.file_path?{file_path:i.file_path}:void 0;try{return await e.client.request("chat.send",{sessionKey:e.sessionKey,message:s,deliver:!1,idempotencyKey:l,attachments:c,...f?{context:f,file_path:i.file_path}:{}}),l}catch(u){const p=String(u);return e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,e.lastError=p,e.chatMessages=[...e.chatMessages,{role:"assistant",content:[{type:"text",text:"Error: "+p}],timestamp:Date.now()}],null}finally{e.chatSending=!1}}async function Nf(e){if(!e.client||!e.connected)return!1;const t=e.chatRunId;try{return await e.client.request("chat.abort",t?{sessionKey:e.sessionKey,runId:t}:{sessionKey:e.sessionKey}),!0}catch(n){return e.lastError=String(n),!1}}function Of(e,t){if(!t||t.sessionKey!==e.sessionKey)return null;if(t.runId&&e.chatRunId&&t.runId!==e.chatRunId)return t.state==="final"?"foreign_final":null;if(t.state==="delta"){const n=ps(t.message);if(typeof n=="string"){const i=e.chatStream??"";(!i||n.length>=i.length)&&(e.chatStream=n)}}else if(t.state==="final")e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null;else if(t.state==="aborted"){const n=Pf(t.message);if(n)e.chatMessages=[...e.chatMessages,n];else{const i=e.chatStream??"";i.trim()&&(e.chatMessages=[...e.chatMessages,{role:"assistant",content:[{type:"text",text:i}],timestamp:Date.now()}])}e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null}else t.state==="error"&&(e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null,e.lastError=t.errorMessage??"chat error");return t.state}const bl=120;function wl(e){return e.chatSending||!!e.chatRunId}function Bf(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/stop"?!0:n==="stop"||n==="esc"||n==="abort"||n==="wait"||n==="exit"}function Uf(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/new"||n==="/reset"?!0:n.startsWith("/new ")||n.startsWith("/reset ")}async function $l(e){e.connected&&(e.chatMessage="",await Nf(e))}function zf(e,t,n,i){const s=t.trim(),o=!!(n&&n.length>0);!s&&!o||(e.chatQueue=[...e.chatQueue,{id:oo(),text:s,createdAt:Date.now(),attachments:o?n==null?void 0:n.map(r=>({...r})):void 0,refreshSessions:i}])}async function xl(e,t,n){var o,r;hi(e);const i=await Ff(e,t,n==null?void 0:n.attachments,e.chatUploadedFile??void 0),s=!!i;return!s&&(n==null?void 0:n.previousDraft)!=null&&(e.chatMessage=n.previousDraft),!s&&(n!=null&&n.previousAttachments)&&(e.chatAttachments=n.previousAttachments),s&&gl(e,e.sessionKey),s&&(n!=null&&n.restoreDraft)&&((o=n.previousDraft)!=null&&o.trim())&&(e.chatMessage=n.previousDraft),s&&(n!=null&&n.restoreAttachments)&&((r=n.previousAttachments)!=null&&r.length)&&(e.chatAttachments=n.previousAttachments),wn(e),s&&!e.chatRunId&&kl(e),s&&(n!=null&&n.refreshSessions)&&i&&e.refreshSessionsAfterChat.add(i),s}async function kl(e){if(!e.connected||wl(e))return;const[t,...n]=e.chatQueue;if(!t)return;e.chatQueue=n,await xl(e,t.text,{attachments:t.attachments,refreshSessions:t.refreshSessions})||(e.chatQueue=[t,...e.chatQueue])}function Hf(e,t){e.chatQueue=e.chatQueue.filter(n=>n.id!==t)}async function Kf(e,t,n){if(!e.connected)return;const i=e.chatMessage,s=(t??e.chatMessage).trim(),o=e.chatAttachments??[],r=t==null?o:[],a=r.length>0;if(!s&&!a)return;if(Bf(s)){await $l(e);return}const l=Uf(s);if(t==null&&(e.chatMessage="",e.chatAttachments=[]),wl(e)){zf(e,s,r,l);return}await xl(e,s,{previousDraft:t==null?i:void 0,restoreDraft:!!(t&&(n!=null&&n.restoreDraft)),attachments:a?r:void 0,previousAttachments:t==null?o:void 0,restoreAttachments:!!(t&&(n!=null&&n.restoreDraft)),refreshSessions:l})}async function Sl(e,t){await Promise.all([yn(e),to(e,{activeMinutes:bl}),gs(e)]),(t==null?void 0:t.scheduleScroll)!==!1&&wn(e)}const jf=kl;function qf(e){var s,o,r;const t=Da(e.sessionKey);if(t!=null&&t.agentId)return t.agentId;const n=(s=e.hello)==null?void 0:s.snapshot;return((r=(o=n==null?void 0:n.sessionDefaults)==null?void 0:o.defaultAgentId)==null?void 0:r.trim())||"main"}function Wf(e,t){const n=zt(e),i=encodeURIComponent(t);return n?`${n}/avatar/${i}?meta=1`:`/avatar/${i}?meta=1`}async function gs(e){if(!e.connected){e.chatAvatarUrl=null;return}const t=qf(e);if(!t){e.chatAvatarUrl=null;return}e.chatAvatarUrl=null;const n=Wf(e.basePath,t);try{const i=await fetch(n,{method:"GET"});if(!i.ok){e.chatAvatarUrl=null;return}const s=await i.json(),o=typeof s.avatarUrl=="string"?s.avatarUrl.trim():"";e.chatAvatarUrl=o||null}catch{e.chatAvatarUrl=null}}const Gf={trace:!0,debug:!0,info:!0,warn:!0,error:!0,fatal:!0},Vf={name:"",description:"",agentId:"",enabled:!0,scheduleKind:"every",scheduleAt:"",everyAmount:"30",everyUnit:"minutes",cronExpr:"0 7 * * *",cronTz:"",sessionTarget:"isolated",wakeMode:"now",payloadKind:"agentTurn",payloadText:"",deliveryMode:"announce",deliveryChannel:"last",deliveryTo:"",timeoutSeconds:""},Qf=50,Jf=200,Yf="PT Vansting Agent";function $r(e,t){if(typeof e!="string")return;const n=e.trim();if(n)return n.length<=t?n:n.slice(0,t)}function ro(e){const t=$r(e==null?void 0:e.name,Qf)??Yf,n=$r((e==null?void 0:e.avatar)??void 0,Jf)??null;return{agentId:typeof(e==null?void 0:e.agentId)=="string"&&e.agentId.trim()?e.agentId.trim():null,name:t,avatar:n}}async function Al(e,t){if(!e.client||!e.connected)return;const n=e.sessionKey.trim(),i=n?{sessionKey:n}:{};try{const s=await e.client.request("agent.identity.get",i);if(!s)return;const o=ro(s);e.assistantName=o.name,e.assistantAvatar=o.avatar,e.assistantAgentId=o.agentId??null}catch{}}function hs(e){return typeof e=="object"&&e!==null}function Xf(e){if(!hs(e))return null;const t=typeof e.id=="string"?e.id.trim():"",n=e.request;if(!t||!hs(n))return null;const i=typeof n.command=="string"?n.command.trim():"";if(!i)return null;const s=typeof e.createdAtMs=="number"?e.createdAtMs:0,o=typeof e.expiresAtMs=="number"?e.expiresAtMs:0;return!s||!o?null:{id:t,request:{command:i,cwd:typeof n.cwd=="string"?n.cwd:null,host:typeof n.host=="string"?n.host:null,security:typeof n.security=="string"?n.security:null,ask:typeof n.ask=="string"?n.ask:null,agentId:typeof n.agentId=="string"?n.agentId:null,resolvedPath:typeof n.resolvedPath=="string"?n.resolvedPath:null,sessionKey:typeof n.sessionKey=="string"?n.sessionKey:null},createdAtMs:s,expiresAtMs:o}}function Zf(e){if(!hs(e))return null;const t=typeof e.id=="string"?e.id.trim():"";return t?{id:t,decision:typeof e.decision=="string"?e.decision:null,resolvedBy:typeof e.resolvedBy=="string"?e.resolvedBy:null,ts:typeof e.ts=="number"?e.ts:null}:null}function _l(e){const t=Date.now();return e.filter(n=>n.expiresAtMs>t)}function ep(e,t){const n=_l(e).filter(i=>i.id!==t.id);return n.push(t),n}function xr(e,t){return _l(e).filter(n=>n.id!==t)}function tp(e){return{}}const kr={WEBCHAT:"webchat"},Sr={CONTROL_UI:"control-ui"},np=4008;class ip{constructor(t){this.opts=t,this.ws=null,this.pending=new Map,this.closed=!1,this.lastSeq=null,this.connectNonce=null,this.connectSent=!1,this.connectTimer=null,this.backoffMs=800}start(){this.closed=!1,this.connect()}stop(){var t;this.closed=!0,(t=this.ws)==null||t.close(),this.ws=null,this.flushPending(new Error("gateway client stopped"))}get connected(){var t;return((t=this.ws)==null?void 0:t.readyState)===WebSocket.OPEN}connect(){this.closed||(this.ws=new WebSocket(this.opts.url),this.ws.addEventListener("open",()=>this.queueConnect()),this.ws.addEventListener("message",t=>this.handleMessage(String(t.data??""))),this.ws.addEventListener("close",t=>{var i,s;const n=String(t.reason??"");this.ws=null,this.flushPending(new Error(`gateway closed (${t.code}): ${n}`)),(s=(i=this.opts).onClose)==null||s.call(i,{code:t.code,reason:n}),this.scheduleReconnect()}),this.ws.addEventListener("error",()=>{}))}scheduleReconnect(){if(this.closed)return;const t=this.backoffMs;this.backoffMs=Math.min(this.backoffMs*1.7,15e3),window.setTimeout(()=>this.connect(),t)}flushPending(t){for(const[,n]of this.pending)n.reject(t);this.pending.clear()}async sendConnect(){var f;if(this.connectSent)return;this.connectSent=!0,this.connectTimer!==null&&(window.clearTimeout(this.connectTimer),this.connectTimer=null);const t=typeof crypto<"u"&&!!crypto.subtle,n=["operator.admin","operator.approvals","operator.pairing"],i="operator";let s=null,o=!1,r=this.opts.token;if(t){s=await Zs();const u=(f=iu({deviceId:s.deviceId,role:i}))==null?void 0:f.token;r=u??this.opts.token,o=!!(u&&this.opts.token)}const a=r||this.opts.password?{token:r,password:this.opts.password}:void 0;let l;if(t&&s){const u=Date.now(),p=this.connectNonce??void 0,b=tp({deviceId:s.deviceId,clientId:this.opts.clientName??Sr.CONTROL_UI,clientMode:this.opts.mode??kr.WEBCHAT}),x=await Tu(s.privateKey,b);l={id:s.deviceId,publicKey:s.publicKey,signature:x,signedAt:u,nonce:p}}const c={minProtocol:3,maxProtocol:3,client:{id:this.opts.clientName??Sr.CONTROL_UI,version:this.opts.clientVersion??"dev",platform:this.opts.platform??navigator.platform??"web",mode:this.opts.mode??kr.WEBCHAT,instanceId:this.opts.instanceId},role:i,scopes:n,device:l,caps:[],auth:a,userAgent:navigator.userAgent,locale:navigator.language};this.request("connect",c).then(u=>{var p,b,x;(p=u==null?void 0:u.auth)!=null&&p.deviceToken&&s&&Ga({deviceId:s.deviceId,role:u.auth.role??i,token:u.auth.deviceToken,scopes:u.auth.scopes??[]}),this.backoffMs=800,(x=(b=this.opts).onHello)==null||x.call(b,u)}).catch(()=>{var u;o&&s&&Va({deviceId:s.deviceId,role:i}),(u=this.ws)==null||u.close(np,"connect failed")})}handleMessage(t){var s,o,r,a,l;let n;try{n=JSON.parse(t)}catch{return}const i=n;if(i.type==="event"){const c=n;if(c.event==="connect.challenge"){const u=c.payload,p=u&&typeof u.nonce=="string"?u.nonce:null;p&&(this.connectNonce=p,this.sendConnect());return}const f=typeof c.seq=="number"?c.seq:null;f!==null&&(this.lastSeq!==null&&f>this.lastSeq+1&&((o=(s=this.opts).onGap)==null||o.call(s,{expected:this.lastSeq+1,received:f})),this.lastSeq=f);try{(a=(r=this.opts).onEvent)==null||a.call(r,c)}catch(u){console.error("[gateway] event handler error:",u)}return}if(i.type==="res"){const c=n,f=this.pending.get(c.id);if(!f)return;this.pending.delete(c.id),c.ok?f.resolve(c.payload):f.reject(new Error(((l=c.error)==null?void 0:l.message)??"request failed"));return}}request(t,n){if(!this.ws||this.ws.readyState!==WebSocket.OPEN)return Promise.reject(new Error("gateway not connected"));const i=oo(),s={type:"req",id:i,method:t,params:n},o=new Promise((r,a)=>{this.pending.set(i,{resolve:l=>r(l),reject:a})});return this.ws.send(JSON.stringify(s)),o}queueConnect(){this.connectNonce=null,this.connectSent=!1,this.connectTimer!==null&&window.clearTimeout(this.connectTimer),this.connectTimer=window.setTimeout(()=>{this.sendConnect()},750)}}function qi(e,t){var a,l,c;const n=(e??"").trim(),i=(a=t.mainSessionKey)==null?void 0:a.trim();if(!i)return n;if(!n)return i;const s=((l=t.mainKey)==null?void 0:l.trim())||"main",o=(c=t.defaultAgentId)==null?void 0:c.trim();return n==="main"||n===s||o&&(n===`agent:${o}:main`||n===`agent:${o}:${s}`)?i:n}function sp(e,t){if(!(t!=null&&t.mainSessionKey))return;const n=qi(e.sessionKey,t),i=qi(e.settings.sessionKey,t),s=qi(e.settings.lastActiveSessionKey,t),o=n||i||e.sessionKey,r={...e.settings,sessionKey:i||o,lastActiveSessionKey:s||o},a=r.sessionKey!==e.settings.sessionKey||r.lastActiveSessionKey!==e.settings.lastActiveSessionKey;o!==e.sessionKey&&(e.sessionKey=o),a&&nt(e,r)}function Cl(e){e.lastError=null,e.hello=null,e.connected=!1,e.execApprovalQueue=[],e.execApprovalError=null;const t=e.client,n=new ip({url:e.settings.gatewayUrl,token:e.settings.token.trim()?e.settings.token:void 0,password:e.password.trim()?e.password:void 0,clientName:"openclaw-control-ui",mode:"webchat",onHello:i=>{e.client===n&&(e.connected=!0,e.lastError=null,e.hello=i,ap(e,i),e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,hi(e),Al(e),Ks(e),ci(e,{quiet:!0}),st(e,{quiet:!0}),io(e))},onClose:({code:i,reason:s})=>{e.client===n&&(e.connected=!1,i!==1012&&(e.lastError=`disconnected (${i}): ${s||"no reason"}`))},onEvent:i=>{e.client===n&&op(e,i)},onGap:({expected:i,received:s})=>{e.client===n&&(e.lastError=`event gap detected (expected seq ${i}, got ${s}); refresh recommended`)}});e.client=n,t==null||t.stop(),n.start()}function op(e,t){try{rp(e,t)}catch(n){console.error("[gateway] handleGatewayEvent error:",t.event,n)}}function rp(e,t){if(e.eventLogBuffer=[{ts:Date.now(),event:t.event,payload:t.payload},...e.eventLogBuffer].slice(0,250),e.tab==="debug"&&(e.eventLog=e.eventLogBuffer),t.event==="agent"){if(e.onboarding)return;Cf(e,t.payload);return}if(t.event==="chat"){const n=t.payload;n!=null&&n.sessionKey&&gl(e,n.sessionKey);const i=Of(e,n);if(i==="final"||i==="error"||i==="aborted"){hi(e),jf(e);const s=n==null?void 0:n.runId;s&&e.refreshSessionsAfterChat.has(s)&&(e.refreshSessionsAfterChat.delete(s),i==="final"&&to(e,{activeMinutes:bl}))}(i==="final"||i==="foreign_final")&&yn(e);return}if(t.event==="presence"){const n=t.payload;n!=null&&n.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence,e.presenceError=null,e.presenceStatus=null);return}if(t.event==="cron"&&e.tab==="cron"&&so(e),(t.event==="device.pair.requested"||t.event==="device.pair.resolved")&&st(e,{quiet:!0}),t.event==="exec.approval.requested"){const n=Xf(t.payload);if(n){e.execApprovalQueue=ep(e.execApprovalQueue,n),e.execApprovalError=null;const i=Math.max(0,n.expiresAtMs-Date.now()+500);window.setTimeout(()=>{e.execApprovalQueue=xr(e.execApprovalQueue,n.id)},i)}return}if(t.event==="exec.approval.resolved"){const n=Zf(t.payload);n&&(e.execApprovalQueue=xr(e.execApprovalQueue,n.id))}}function ap(e,t){const n=t.snapshot;n!=null&&n.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence),n!=null&&n.health&&(e.debugHealth=n.health),n!=null&&n.sessionDefaults&&sp(e,n.sessionDefaults)}const Ar="/api/bootstrap";async function lp(e){if(typeof window>"u"||typeof fetch!="function")return;const t=zt(e.basePath??""),n=t?`${t}${Ar}`:Ar;try{const i=await fetch(n,{method:"GET",headers:{Accept:"application/json"},credentials:"same-origin"});if(!i.ok)return;const s=await i.json(),o=ro({agentId:s.assistantAgentId??null,name:s.assistantName,avatar:s.assistantAvatar??null});e.assistantName=o.name,e.assistantAvatar=o.avatar,e.assistantAgentId=o.agentId??null}catch{}}function cp(e){e.basePath=cf(),lp(e),rf(e),pf(e,!0),df(e),uf(e),window.addEventListener("popstate",e.popStateHandler),Cl(e),Pd(e),e.tab==="logs"&&Bs(e),e.tab==="debug"&&zs(e)}function dp(e){Cd(e)}function up(e){var t;window.removeEventListener("popstate",e.popStateHandler),Dd(e),Us(e),Hs(e),ff(e),(t=e.topbarObserver)==null||t.disconnect(),e.topbarObserver=null}function fp(e,t){if(!(e.tab==="chat"&&e.chatManualRefreshInFlight)){if(e.tab==="chat"&&(t.has("chatMessages")||t.has("chatToolMessages")||t.has("chatStream")||t.has("chatLoading")||t.has("tab"))){const n=t.has("tab"),i=t.has("chatLoading")&&t.get("chatLoading")===!0&&!e.chatLoading;wn(e,n||i||!e.chatHasAutoScrolled)}e.tab==="logs"&&(t.has("logsEntries")||t.has("logsAutoFollow")||t.has("tab"))&&e.logsAutoFollow&&e.logsAtBottom&&Fa(e,t.has("tab")||t.has("logsAutoFollow"))}}const pp="未命名报价单",gp=24e4,hp=12e4,Tl=1,El=800,_r=new WeakMap,mp={idle:["running"],running:["awaiting_choices","done","error","idle"],awaiting_choices:["resuming","running","error","idle"],resuming:["awaiting_choices","done","error","idle"],done:["running","idle","error"],error:["running","idle","resuming"]};class Oe extends Error{constructor(t){super(t),this.name="RetryableWorkError"}}class ms extends Error{constructor(t){super(t),this.name="RunIdInvalidError"}}function mi(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}function Ht(e){let t=_r.get(e);return t||(t={controller:null,cancelRequested:!1,timeoutReached:!1},_r.set(e,t)),t}function Zn(e,t){const n=e.workRunStatus;if(n===t)return;if(!(mp[n]??[]).includes(t))throw new Error(`invalid work state transition: ${n} -> ${t}`);e.workRunStatus=t}function Ft(e,t){e.workRunStatus=t}function ao(e){e.workRunId=null,e.workPendingChoices=[],e.workSelections={}}function Rl(e){return(e||"").trim().replace(/\\/g,"/").toLowerCase()}function vp(e,t){const n=(t.file_path||"").trim();if(n){const i=e.workOriginalFileNamesByPath[Rl(n)];if(typeof i=="string"&&i.trim())return i.trim()}return xn(t)}function xn(e){var i,s;const t=(i=e==null?void 0:e.name)==null?void 0:i.trim();if(t)return t;const n=(s=e==null?void 0:e.file_path)==null?void 0:s.trim();if(n){const o=n.replace(/\\/g,"/").split("/").filter(Boolean).pop();if(o)return o}return pp}function yp(e){try{if(typeof e!="string"||!e.trim())return null;const t=e.trim();return t.startsWith("{")&&t.endsWith("}")||t.startsWith("[")&&t.endsWith("]")?JSON.parse(t):null}catch{return null}}function Cr(e){if(typeof e!="string")return!1;const t=e.trim().toLowerCase();return t?t==="__oos__"||t==="oos"||t==="无货":!1}function bp(e){const t=Array.isArray(e.fill_items_merged)?e.fill_items_merged:[];if(!t.length)return null;const n=Array.isArray(e.items)?e.items:[],i=Array.isArray(e.shortage)?e.shortage:[],s=new Map;for(const r of n)s.set(r.row,r);const o=t.map((r,a)=>{const l=r.row,c=s.get(l)??{},f=Number(r.qty??0),u=r.unit_price,p=u==null?null:Number(u),b=p==null||Number.isNaN(p)?null:p*f,x=String(r.code??""),k=String(r.quote_name??"").trim();let S=0,E=0;for(const F of i)if(F.row===l){S=Number(F.available_qty??0),E=Number(F.shortfall??0);break}const P=Cr(x)||k.includes("库存不足");return!P&&E===0&&S===0&&x&&!Cr(x)&&(S=f),{row_index:a,row:typeof l=="number"?l:void 0,product_name:String(c.product_name??""),specification:String(r.specification??c.specification??""),qty:f,code:x,quote_name:k,unit_price:p,amount:b,available_qty:S,shortfall:E,is_shortage:P?1:0,match_source:null}});return{name:xn({name:typeof e.name=="string"?e.name:"",file_path:typeof e.file_path=="string"?e.file_path:null}),file_path:typeof e.file_path=="string"?e.file_path:null,source:"file",lines:o}}function wp(e){if(!Array.isArray(e))return null;let t=null;for(const n of e){const i=n.type,s=n.content;if(i!=="observation"||typeof s!="string")continue;const o=yp(s);if(!o||typeof o!="object")continue;const r=o.pending_quotation_draft;if(r&&Array.isArray(r.lines)){t={...r,name:xn(r)};continue}const a=bp(o);a&&(t=a)}return t}function $p(e){const t=ie(e,"/api/work","pending_choices[]"),i=Ut(t.options,"/api/work","pending_choices[].options").map(s=>{const o=ie(s,"/api/work","pending_choices[].options[]");return{code:Ze(o.code,"/api/work","pending_choices[].options[].code"),matched_name:G(o.matched_name),unit_price:me(o.unit_price),reasoning:G(o.reasoning)}});return{id:Ze(t.id,"/api/work","pending_choices[].id"),row:me(t.row),keywords:G(t.keywords),product_name:G(t.product_name),specification:G(t.specification),qty:me(t.qty)??G(t.qty),options:i}}function xp(e){const t=ie(e,"/api/work","pending_quotation_draft"),i=Ut(t.lines,"/api/work","pending_quotation_draft.lines").map((s,o)=>{const r=ie(s,"/api/work","pending_quotation_draft.lines[]"),a=me(r.qty)??Number(r.qty??0),l=r.unit_price==null?null:Number(r.unit_price);return{row_index:me(r.row_index)??o,row:me(r.row),product_name:G(r.product_name),specification:G(r.specification),qty:Number.isFinite(a)?a:0,code:G(r.code),quote_name:G(r.quote_name),unit_price:l==null||Number.isNaN(l)?null:l,amount:r.amount==null?null:Number(r.amount),available_qty:me(r.available_qty)??Number(r.available_qty??0),shortfall:me(r.shortfall)??Number(r.shortfall??0),is_shortage:me(r.is_shortage)??(qs(r.is_shortage)?1:0),match_source:G(r.match_source)??null}});return{name:xn({name:G(t.name)??"",file_path:G(t.file_path)??null}),file_path:G(t.file_path)??null,source:G(t.source)??"file",lines:i}}function vs(e,t){const n=ie(e,t),s=(G(n.status)??"done")==="awaiting_choices"?"awaiting_choices":"done",o={status:s,success:qs(n.success)??!0,answer:G(n.answer)??"",trace:Array.isArray(n.trace)?n.trace:[],error:G(n.error)};if(n.pending_quotation_draft!=null&&(o.pending_quotation_draft=xp(n.pending_quotation_draft)),s==="awaiting_choices"){o.run_id=Ze(n.run_id,t,"run_id");const r=Ut(n.pending_choices,t,"pending_choices");o.pending_choices=r.map(a=>$p(a))}return o}function ys(e,t){if(e.workResult={success:t.success,answer:t.answer,trace:t.trace,error:t.error},e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null,t.status==="awaiting_choices"){Zn(e,"awaiting_choices"),e.workRunId=t.run_id??null,e.workPendingChoices=t.pending_choices??[];const n={};for(const i of e.workPendingChoices)n[i.id]="__OOS__";e.workSelections=n;return}if(ao(e),t.pending_quotation_draft&&Array.isArray(t.pending_quotation_draft.lines))e.workPendingQuotationDraft={...t.pending_quotation_draft,name:xn(t.pending_quotation_draft)};else{const n=wp(t.trace);n&&(e.workPendingQuotationDraft=n)}t.success===!1||t.error&&t.error.trim()?(Ft(e,"error"),e.workError=ue("执行报价流程",t.error??"后端返回失败状态","本次报价流程未完成","点击“重试”重新运行，或检查后端日志")):Zn(e,"done")}function lo(e){return new Promise(t=>setTimeout(t,e))}function Ll(e){return e===408||e===429||e===500||e===502||e===503||e===504}function Il(e,t){const n=Ht(e),i=new AbortController;n.controller=i,n.timeoutReached=!1;const s=setTimeout(()=>{n.timeoutReached=!0,i.abort("timeout")},t);return{signal:i.signal,close:()=>{clearTimeout(s),n.controller===i&&(n.controller=null)}}}function ei(e){return e instanceof Error?e.name==="AbortError"||/aborted/i.test(e.message):!1}function kp(e,t){Ft(e,"error"),ao(e),e.workResult={success:!1,error:t},e.workError=ue("执行报价流程",t,"流程被中断，未产出有效结果","点击“重试”再次执行")}function co(e){Ft(e,"idle"),e.workError="已取消当前流程。",e.workResult=null}async function Sp(e,t){const n={file_paths:e.workFilePaths,customer_level:e.workCustomerLevel,do_register_oos:e.workDoRegisterOos},{signal:i,close:s}=Il(e,gp);try{const o=await fetch(mi(e.basePath,t),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n),credentials:"same-origin",signal:i});if(!o.ok||!o.body){const f=await o.json().catch(()=>({})),u=Le(f,`HTTP ${o.status}`);throw Ll(o.status)?new Oe(u):new Error(u)}const r=o.body.getReader(),a=new TextDecoder;let l="",c=!1;for(;;){const{done:f,value:u}=await r.read();if(f)break;l+=a.decode(u,{stream:!0});const p=l.split(`
`);l=p.pop()??"";for(const b of p){if(!b.startsWith("data: "))continue;const x=b.slice(6).trim();if(!x)continue;const k=ie(JSON.parse(x),t,"stream_event"),S=Ze(k.type,t,"stream_event.type");if(S==="stage"){const E=me(k.stage)??Number(k.stage);if(!Number.isFinite(E))throw new de(t,"stage must be a number");e.workProgressStage=E,await lo(80)}else if(S==="result"){const E=vs(k.payload,t);ys(e,E),c=!0;break}}if(c)break}if(!c&&l.startsWith("data: ")){const f=l.slice(6).trim();if(f){const u=ie(JSON.parse(f),t,"stream_event_tail");if(u.type==="result"){const p=vs(u.payload,t);ys(e,p),c=!0}}}if(!c)throw new de(t,"stream ended without result event")}catch(o){const r=Ht(e);throw r.cancelRequested?new Error("__WORK_CANCELLED__"):ei(o)&&r.timeoutReached?new Oe("请求超时"):ei(o)?new Error("请求已中断"):o instanceof de||o instanceof Oe?o:o instanceof Error&&/network|failed to fetch|load failed/i.test(o.message)?new Oe(o.message):o}finally{s()}}function Ap(e,t){if(e===404||e===410)return!0;const n=Le(t,"").toLowerCase();return n.includes("run_id")||n.includes("run id")}async function _p(e,t,n){const i="/api/work/resume",{signal:s,close:o}=Il(e,hp);try{const r=await fetch(mi(e.basePath,i),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({run_id:t,selections:n}),credentials:"same-origin",signal:s}),a=await r.json().catch(()=>({}));if(!r.ok){if(Ap(r.status,a))throw new ms(Le(a,"run_id 已失效"));const c=Le(a,`HTTP ${r.status}`);throw Ll(r.status)?new Oe(c):new Error(c)}const l=vs(a,i);ys(e,l)}catch(r){const a=Ht(e);throw a.cancelRequested?new Error("__WORK_CANCELLED__"):r instanceof ms?r:ei(r)&&a.timeoutReached?new Oe("请求超时"):ei(r)?new Error("请求已中断"):r instanceof de||r instanceof Oe?r:r instanceof Error&&/network|failed to fetch|load failed/i.test(r.message)?new Oe(r.message):r}finally{o()}}function Cp(e){var n;const t=Ht(e);t.cancelRequested=!0,(n=t.controller)==null||n.abort("user_cancel"),co(e),e.workRunning=!1}async function Ml(e){if(!e.workFilePaths.length){e.workError="请先上传至少一个报价单文件";return}const t=Ht(e);t.cancelRequested=!1,e.workRunning=!0,e.workError=null,e.workResult=null,e.workRunId=null,e.workPendingChoices=[],e.workSelections={},e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null,Zn(e,"running");let n=0;try{for(;;){n+=1;try{await Sp(e,"/api/work/run-stream");break}catch(i){if(i instanceof Error&&i.message==="__WORK_CANCELLED__"){co(e);break}if(i instanceof Oe&&n<=Tl){await lo(El*n);continue}const s=i instanceof de||i instanceof Error?i.message:String(i);kp(e,s);break}}}finally{e.workRunning=!1}}async function Pl(e){const t=e.workRunId;if(!t||e.workPendingChoices.length===0){e.workError="缺少可继续的 run_id，请重新执行。",Ft(e,"error");return}const n=e.workPendingChoices.map(o=>({item_id:o.id,selected_code:e.workSelections[o.id]??"__OOS__"})),i=Ht(e);i.cancelRequested=!1,e.workRunning=!0,e.workError=null,Zn(e,"resuming");let s=0;try{for(;;){s+=1;try{await _p(e,t,n);break}catch(o){if(o instanceof Error&&o.message==="__WORK_CANCELLED__"){co(e);break}if(o instanceof ms){ao(e),e.workResult={success:!1,error:o.message},e.workError=ue("继续流程",o.message,"当前待选项无法继续提交","请重新执行一次 Work 流程"),Ft(e,"error");break}if(o instanceof Oe&&s<=Tl){await lo(El*s);continue}const r=o instanceof de||o instanceof Error?o.message:String(o);e.workResult={success:!1,error:r},e.workError=ue("继续流程",r,"本次续跑失败，尚未生成完整结果","点击“重试”继续，或重新执行 Work"),Ft(e,"error");break}}}finally{e.workRunning=!1}}async function Tp(e){if(e.workRunId&&e.workPendingChoices.length>0){await Pl(e);return}await Ml(e)}async function Ep(e){const t=(e.workTextInput||"").trim();if(!t)return e.workTextError="请输入产品描述文字",!1;e.workTextGenerating=!0,e.workTextError=null;try{const n=await fetch(mi(e.basePath,"/api/quotation/from-text"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t}),credentials:"same-origin"}),i=await n.json().catch(()=>({}));if(!n.ok){const a=typeof i.detail=="string"?i.detail:Le(i,`HTTP ${n.status}`);return e.workTextError=a,!1}const s=typeof i.file_path=="string"?i.file_path:"",o=typeof i.file_name=="string"?i.file_name:"文字报价.xlsx";if(!s)return e.workTextError="接口未返回 file_path",!1;e.workFilePaths.includes(s)||(e.workFilePaths=[...e.workFilePaths,s]);const r=Rl(s);return r&&(e.workOriginalFileNamesByPath={...e.workOriginalFileNamesByPath,[r]:(o||"").trim()||s.split(/[/\\]/).pop()||s}),e.workTextError=null,!0}catch(n){const i=n instanceof Error?n.message:String(n);return e.workTextError=ue("从文字生成报价单",i,"未生成文件","请检查网络或后端后重试"),!1}finally{e.workTextGenerating=!1}}async function Rp(e){var n;const t=e.workPendingQuotationDraft;if(!((n=t==null?void 0:t.lines)!=null&&n.length))return e.workQuotationDraftSaveStatus={status:"error",error:"无报价明细可保存"},!1;e.workQuotationDraftSaveStatus={status:"saving"};try{const i=await fetch(mi(e.basePath,"/api/quotation-drafts"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:vp(e,t),source:t.source||"file",file_path:t.file_path??void 0,lines:t.lines.map(u=>({product_name:u.product_name??"",specification:u.specification??"",qty:Number(u.qty)||0,code:u.code??"",quote_name:u.quote_name??"",unit_price:u.unit_price!=null?Number(u.unit_price):null,amount:u.amount!=null?Number(u.amount):null,available_qty:Number(u.available_qty)||0,shortfall:Number(u.shortfall)||0,is_shortage:u.is_shortage?1:0,match_source:u.match_source??null}))}),credentials:"same-origin"}),s=await i.json().catch(()=>({}));if(!i.ok)return e.workQuotationDraftSaveStatus={status:"error",error:ue("保存报价单",Le(s,`HTTP ${i.status}`),"报价单仍停留在待保存状态","点击“重试”再次保存")},!1;const o=ie(s,"/api/quotation-drafts"),r=qs(o.success),a=ie(o.data,"/api/quotation-drafts","data"),l=Ze(a.draft_no,"/api/quotation-drafts","data.draft_no"),c=me(a.draft_id)??Number(a.draft_id),f=Number.isFinite(c)?c:0;if(r===!1)throw new de("/api/quotation-drafts","success is false");return e.workQuotationDraftSaveStatus={status:"ok",draft_no:l,draft_id:f},e.workPendingQuotationDraft=null,!0}catch(i){const s=i instanceof de||i instanceof Error?i.message:String(i);return e.workQuotationDraftSaveStatus={status:"error",error:ue("保存报价单",s,"报价单仍停留在待保存状态","检查数据后重试")},!1}}const Lp=[{value:"FACTORY_INC_TAX",label:"出厂价_含税"},{value:"FACTORY_EXC_TAX",label:"出厂价_不含税"},{value:"PURCHASE_EXC_TAX",label:"采购不含税"},{value:"A_MARGIN",label:"（二级代理）A级别 利润率"},{value:"A_QUOTE",label:"（二级代理）A级别 报单价格"},{value:"B_MARGIN",label:"（一级代理）B级别 利润率"},{value:"B_QUOTE",label:"（一级代理）B级别 报单价格"},{value:"C_MARGIN",label:"（聚万大客户）C级别 利润率"},{value:"C_QUOTE",label:"（聚万大客户）C级别 报单价格"},{value:"D_MARGIN",label:"（青山大客户）D级别 利润率"},{value:"D_QUOTE",label:"（青山大客户）D级别 报单价格"},{value:"D_LOW",label:"（青山大客户）D级别 降低利润率"},{value:"E_MARGIN",label:"（大唐大客户）E级别（包运费） 利润率"},{value:"E_QUOTE",label:"（大唐大客户）E级别（包运费） 报单价格"}];function Tr(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}function Ip(e){try{if(typeof e!="string"||!e.trim())return null;const t=e.trim();return t.startsWith("{")&&t.endsWith("}")||t.startsWith("[")&&t.endsWith("]")?JSON.parse(t):null}catch{return null}}function Mp(e){if(!Array.isArray(e))return[];const t=[];for(const n of e){const i=n.type,s=n.content;if(i!=="observation"||typeof s!="string")continue;const o=Ip(s);if(!o||typeof o!="object")continue;const r=o.output_path;if(typeof r=="string"&&r.trim()){const a=r.replace(/\\/g,"/").split("/").filter(Boolean).pop()??"";a&&!t.includes(a)&&t.push(a)}}return t}function Pp(e,t,n){return d`
    <li style="margin-bottom: 14px; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
      <div style="font-size: 13px; margin-bottom: 8px;">
        ${e.product_name??e.keywords??""}
        ${e.specification?d`<span class="muted"> · ${e.specification}</span>`:$}
        ${e.qty!=null?d`<span class="muted"> · ${g("work.qty")}: ${e.qty}</span>`:$}
      </div>
      <select
        .value=${t}
        @change=${i=>n(i.target.value)}
        aria-label=${g("work.choiceSelect")}
        style="width: 100%; max-width: 460px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border);"
      >
        <option value="__OOS__">${g("work.choiceOos")}</option>
        ${(e.options??[]).map(i=>d`<option value=${i.code}>${i.code}${i.matched_name?` · ${i.matched_name}`:""}${i.unit_price!=null?` · ${i.unit_price}`:""}</option>`)}
      </select>
    </li>
  `}function Dp(e){var le,X,Qe;const{basePath:t,workFilePaths:n,workRunning:i,workProgressStage:s,workRunStatus:o,workPendingChoices:r,workSelections:a,workResult:l,workError:c,workCustomerLevel:f,workDoRegisterOos:u,workPendingQuotationDraft:p,workQuotationDraftSaveStatus:b,workTextInput:x,workTextGenerating:k,workTextError:S,onAddFile:E,onRemoveFile:P,onWorkTextChange:F,onGenerateFromText:L,onCustomerLevelChange:A,onDoRegisterOosChange:h,onRun:_,onCancel:C,onRetry:R,onSelectionChange:z,onResume:U,onQuotationLineChange:H,onQuotationDraftSave:K,onQuotationDraftDismiss:Y}=e,B=[g("work.stageExtract"),g("work.stageMatch"),g("work.stageFill")],ee=I=>{const Q=Tr(t,"/api/quotation/upload"),j=new FormData;j.append("file",I),fetch(Q,{method:"POST",body:j,credentials:"same-origin"}).then(te=>te.json()).then(te=>{typeof te.file_path=="string"&&E(te.file_path,te.file_name??I.name)}).catch(()=>{})},ge=I=>{var te;const Q=I.target,j=(te=Q.files)==null?void 0:te[0];j&&(ee(j),Q.value="")},O=I=>{var j;I.preventDefault();const Q=(j=I.dataTransfer)==null?void 0:j.files;if(!(!Q||!Q.length))for(let te=0;te<Q.length;te+=1){const Ue=Q.item(te);Ue&&ee(Ue)}},ae=I=>{I.preventDefault(),I.dataTransfer&&(I.dataTransfer.dropEffect="copy")};return d`
    <section class="card" style="margin-bottom: 16px;" aria-label=${g("tabs.work")}>
      <div class="card-title" style="margin-bottom: 8px;">${g("tabs.work")}</div>
      <p class="muted" style="margin-bottom: 12px;">${g("subtitles.work")}</p>

      <div
        style="margin-bottom: 12px; padding: 10px; border-radius: 8px; border: 1px dashed var(--border); background: var(--bg-secondary, #fafafa);"
        @dragover=${ae}
        @dragenter=${ae}
        @drop=${O}
      >
        <label class="card-title" style="font-size: 13px;">${g("work.uploadTitle")}</label>
        <input
          type="file"
          accept=".xlsx,.xls,.xlsm"
          @change=${ge}
          style="margin-top: 6px;"
          aria-label=${g("work.uploadTitle")}
        />
        ${n.length?d`
              <ul style="margin-top: 8px; padding-left: 20px; font-size: 13px;">
                ${n.map((I,Q)=>d`
                    <li style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                      <span style="word-break: break-all;">${I.split(/[/\\]/).pop()??I}</span>
                      <button
                        type="button"
                        class="btn btn-sm"
                        style="padding: 2px 8px;"
                        @click=${()=>P(Q)}
                        aria-label=${g("work.removeFile")}
                      >
                        ${g("work.removeFile")}
                      </button>
                    </li>
                  `)}
              </ul>
            `:d`<p class="muted" style="margin-top: 6px;">${g("work.noFiles")}</p>`}
      </div>

      <div style="margin-bottom: 12px; padding: 10px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-secondary, #fafafa);">
        <label class="card-title" style="font-size: 13px;">${g("work.textInputTitle")}</label>
        <p class="muted" style="font-size: 12px; margin: 4px 0 8px 0;">${g("work.textInputHint")}</p>
        <textarea
          .value=${x}
          @input=${I=>F(I.target.value)}
          placeholder=${g("work.textInputPlaceholder")}
          rows="4"
          style="width: 100%; max-width: 560px; padding: 8px; border-radius: 6px; border: 1px solid var(--border); font-size: 13px; resize: vertical;"
          ?disabled=${k}
          aria-label=${g("work.textInputTitle")}
       ></textarea>
        <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px; flex-wrap: wrap;">
          <button
            type="button"
            class="btn"
            style="background: var(--accent); color: var(--bg);"
            ?disabled=${!x.trim()||k}
            @click=${L}
            aria-label=${g("work.generateFromText")}
          >
            ${g(k?"work.textGenerating":"work.generateFromText")}
          </button>
          ${S?d`<span style="color: var(--danger, #c00); font-size: 13px;" role="alert">${S}</span>`:$}
        </div>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 12px;">
        <div>
          <label style="font-size: 12px; color: var(--muted);">${g("work.customerLevel")}</label>
          <select
            .value=${f}
            @change=${I=>A(I.target.value)}
            style="margin-left: 8px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 160px;"
            aria-label=${g("work.customerLevel")}
          >
            ${Lp.map(I=>d`<option value=${I.value}>${I.label}</option>`)}
          </select>
        </div>
        <label style="display: flex; align-items: center; gap: 6px; font-size: 13px;">
          <input
            type="checkbox"
            ?checked=${u}
            @change=${I=>h(I.target.checked)}
            aria-label=${g("work.registerOos")}
          />
          ${g("work.registerOos")}
        </label>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${i?d`
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                ${B.map((I,Q)=>d`
                    <span
                      style="
                        padding: 6px 12px;
                        border-radius: 8px;
                        font-size: 13px;
                        background: ${s>=0&&Q===s?"var(--accent)":"var(--bg-secondary, #eee)"};
                        color: ${s>=0&&Q===s?"var(--bg)":"var(--muted)"};
                      "
                    >
                      ${Q+1}. ${I}
                    </span>
                  `)}
              </div>
              <p class="muted" style="font-size: 12px; margin: 0;">
                ${g("work.currentStage")}: ${s>=0&&s<B.length?B[s]:g("work.running")}
              </p>
            `:$}

        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
          <button
            class="btn"
            style="background: var(--accent); color: var(--bg);"
            ?disabled=${n.length===0||i}
            @click=${_}
            aria-label=${g("work.run")}
          >
            ${g(i?"work.running":"work.run")}
          </button>
          ${i?d`<button class="btn btn-sm" @click=${C} aria-label=${g("work.cancel")}>${g("work.cancel")}</button>`:$}
          ${o==="error"?d`<button class="btn btn-sm" @click=${R} aria-label=${g("common.retry")}>${g("common.retry")}</button>`:$}
          ${n.length===0?d`<span class="muted" style="font-size: 12px;">${g("work.runHint")}</span>`:$}
          <span class="muted" style="font-size: 12px;">${g("work.statusLabel")}: ${o}</span>
        </div>
      </div>

      ${c?d`
            <div style="margin-top: 12px; padding: 10px; border: 1px solid var(--danger, #e53935); border-radius: 8px;" role="alert" aria-live="assertive">
              <p style="margin: 0; color: var(--danger, #e53935); font-size: 13px;">${c}</p>
            </div>
          `:$}
    </section>

    ${o==="awaiting_choices"&&r.length?d`
          <section class="card" style="margin-bottom: 16px;" aria-live="polite">
            <div class="card-title">${g("work.awaitingTitle")}</div>
            <p class="muted" style="margin-bottom: 12px;">${g("work.awaitingHint")}</p>
            <ul style="list-style: none; padding: 0; margin: 0;">
              ${r.map(I=>Pp(I,a[I.id]??"__OOS__",Q=>z(I.id,Q)))}
            </ul>
            <div style="display: flex; gap: 8px; margin-top: 12px;">
              <button class="btn" style="background: var(--accent); color: var(--bg);" ?disabled=${i} @click=${U}>
                ${g(i||o==="resuming"?"work.resuming":"work.resume")}
              </button>
              ${o==="error"?d`<button class="btn btn-sm" @click=${R}>${g("common.retry")}</button>`:$}
            </div>
          </section>
        `:$}

    ${(b==null?void 0:b.status)==="ok"?d`
          <section class="card" style="margin-bottom: 16px;" role="status" aria-live="polite">
            <p style="color: var(--success, #2e7d32); margin: 0 0 4px 0;">${g("work.savedDraftNo",{no:b.draft_no})}</p>
            <p class="muted" style="margin: 0 0 8px 0; font-size: 12px;">${g("work.saveSuccessHint")}</p>
            <button class="btn btn-sm" @click=${Y}>${g("common.close")}</button>
          </section>
        `:(le=p==null?void 0:p.lines)!=null&&le.length?d`
            <section class="card" style="margin-bottom: 16px;">
              <div class="card-title">${g("work.pendingDraftTitle")}</div>
              <p class="muted" style="margin-bottom: 10px;">${g("work.pendingDraftHint")}</p>
              <div style="overflow-x: auto; margin-bottom: 12px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                  <thead>
                    <tr style="background: var(--bg-secondary, #eee);">
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">#</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("work.lineProduct")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("work.lineSpec")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("work.lineQty")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("work.lineCode")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("work.lineQuoteName")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("work.linePrice")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("work.lineAmount")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("work.lineAvailable")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("work.lineShortfall")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("work.lineIsShortage")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${p.lines.map((I,Q)=>d`
                        <tr>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${Q+1}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${I.product_name??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${I.specification??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="number" min="0" step="1" .value=${String(I.qty??"")} @change=${j=>H(Q,"qty",j.target.value)} style="width: 72px;" aria-label=${g("work.lineQty")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="text" .value=${I.code??""} @change=${j=>H(Q,"code",j.target.value)} style="width: 90px;" aria-label=${g("work.lineCode")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="text" .value=${I.quote_name??""} @change=${j=>H(Q,"quote_name",j.target.value)} style="width: 120px;" aria-label=${g("work.lineQuoteName")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="number" min="0" step="0.01" .value=${I.unit_price!=null?String(I.unit_price):""} @change=${j=>H(Q,"unit_price",j.target.value)} style="width: 90px;" aria-label=${g("work.linePrice")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${I.amount!=null?I.amount:""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${I.available_qty??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${I.shortfall??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${I.is_shortage?g("common.yes"):g("common.no")}</td>
                        </tr>
                      `)}
                  </tbody>
                </table>
              </div>

              ${(b==null?void 0:b.status)==="error"?d`<p style="color: var(--danger, #c00); margin-bottom: 10px;">${b.error}</p>`:$}

              <div style="display: flex; gap: 8px;">
                <button class="btn" style="background: var(--accent); color: var(--bg);" ?disabled=${(b==null?void 0:b.status)==="saving"} @click=${K}>
                  ${(b==null?void 0:b.status)==="saving"?g("work.saving"):g("work.saveDraft")}
                </button>
                <button class="btn btn-sm" ?disabled=${(b==null?void 0:b.status)==="saving"} @click=${Y}>
                  ${g("common.cancel")}
                </button>
              </div>
            </section>
          `:$}

    ${l&&!((X=p==null?void 0:p.lines)!=null&&X.length)?d`
          <section class="card">
            <div class="card-title">${g("work.resultTitle")}</div>
            ${(()=>{const I=Mp(l.trace);return I.length?d`
                    <div style="margin-bottom: 12px;">
                      ${I.map(Q=>d`
                          <a href=${Tr(t,`/api/quotation/download?path=${encodeURIComponent(Q)}`)} download=${Q} class="btn btn-sm" style="margin-right: 8px; margin-bottom: 6px; text-decoration: none;">
                            ${g("work.download",{name:Q})}
                          </a>
                        `)}
                    </div>
                  `:$})()}

            ${l.answer?d`<div style="white-space: pre-wrap; margin-bottom: 12px;">${l.answer}</div>`:$}
            ${l.error?d`<p style="color: var(--danger, #e53935);">${l.error}</p>`:$}

            ${(Qe=l.trace)!=null&&Qe.length?d`
                  <details style="margin-top: 12px;">
                    <summary>${g("work.trace",{count:String(l.trace.length)})}</summary>
                    <pre style="max-height: 420px; overflow: auto; margin-top: 8px; font-size: 11px; white-space: pre-wrap;">${JSON.stringify(l.trace,null,2)}</pre>
                  </details>
                `:$}
          </section>
        `:$}
  `}function Er(e){return(e||"").trim().replace(/\\/g,"/").toLowerCase()}function Fp(e){return e.tab!=="work"?$:Dp({basePath:e.basePath,workFilePaths:e.workFilePaths,workRunning:e.workRunning,workProgressStage:e.workProgressStage,workRunStatus:e.workRunStatus,workRunId:e.workRunId,workPendingChoices:e.workPendingChoices,workSelections:e.workSelections,workResult:e.workResult,workError:e.workError,workCustomerLevel:e.workCustomerLevel,workDoRegisterOos:e.workDoRegisterOos,workOriginalFileNamesByPath:e.workOriginalFileNamesByPath,workPendingQuotationDraft:e.workPendingQuotationDraft,workQuotationDraftSaveStatus:e.workQuotationDraftSaveStatus,workTextInput:e.workTextInput,workTextGenerating:e.workTextGenerating,workTextError:e.workTextError,onWorkTextChange:t=>{e.workTextInput=t},onGenerateFromText:()=>{Ep(e)},onAddFile:(t,n)=>{e.workFilePaths.includes(t)||(e.workFilePaths=[...e.workFilePaths,t]);const i=Er(t);i&&(e.workOriginalFileNamesByPath={...e.workOriginalFileNamesByPath,[i]:(n||"").trim()||t.split(/[/\\]/).pop()||t})},onRemoveFile:t=>{const n=e.workFilePaths[t]??"";e.workFilePaths=e.workFilePaths.filter((s,o)=>o!==t);const i=Er(n);if(i&&e.workOriginalFileNamesByPath[i]!==void 0){const s={...e.workOriginalFileNamesByPath};delete s[i],e.workOriginalFileNamesByPath=s}},onCustomerLevelChange:t=>{e.workCustomerLevel=t},onDoRegisterOosChange:t=>{e.workDoRegisterOos=t},onRun:()=>void Ml(e),onCancel:()=>Cp(e),onRetry:()=>void Tp(e),onSelectionChange:(t,n)=>{e.workSelections={...e.workSelections,[t]:n}},onResume:()=>void Pl(e),onQuotationLineChange:(t,n,i)=>{var a;const s=e.workPendingQuotationDraft;if(!((a=s==null?void 0:s.lines)!=null&&a.length)||t<0||t>=s.lines.length)return;const o=s.lines.slice(),r={...o[t]};if(n==="qty"){const l=Number(i);r.qty=Number.isFinite(l)?l:0}else if(n==="unit_price"){const l=String(i??"").trim();if(!l)r.unit_price=null;else{const c=Number(l);r.unit_price=Number.isFinite(c)?c:null}}else r[n]=i;if(n==="qty"||n==="unit_price"){const l=Number(r.qty??0),c=r.unit_price==null?NaN:Number(r.unit_price);r.amount=Number.isFinite(l)&&Number.isFinite(c)?l*c:null}o[t]=r,e.workPendingQuotationDraft={...s,lines:o}},onQuotationDraftSave:()=>{typeof window<"u"&&window.confirm(g("work.saveConfirm"))&&Rp(e).then(t=>{t&&e.loadFulfillDrafts()})},onQuotationDraftDismiss:()=>{e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null}})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const uo={CHILD:2},fo=e=>(...t)=>({_$litDirective$:e,values:t});let po=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,i){this._$Ct=t,this._$AM=n,this._$Ci=i}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:Np}=qc,Rr=e=>e,Op=e=>e.strings===void 0,Lr=()=>document.createComment(""),Gt=(e,t,n)=>{var o;const i=e._$AA.parentNode,s=t===void 0?e._$AB:t._$AA;if(n===void 0){const r=i.insertBefore(Lr(),s),a=i.insertBefore(Lr(),s);n=new Np(r,a,e,e.options)}else{const r=n._$AB.nextSibling,a=n._$AM,l=a!==e;if(l){let c;(o=n._$AQ)==null||o.call(n,e),n._$AM=e,n._$AP!==void 0&&(c=e._$AU)!==a._$AU&&n._$AP(c)}if(r!==s||l){let c=n._$AA;for(;c!==r;){const f=Rr(c).nextSibling;Rr(i).insertBefore(c,s),c=f}}}return n},lt=(e,t,n=e)=>(e._$AI(t,n),e),Bp={},Up=(e,t=Bp)=>e._$AH=t,zp=e=>e._$AH,Wi=e=>{e._$AR(),e._$AA.remove()};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ir=(e,t,n)=>{const i=new Map;for(let s=t;s<=n;s++)i.set(e[s],s);return i},Dl=fo(class extends po{constructor(e){if(super(e),e.type!==uo.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,n){let i;n===void 0?n=t:t!==void 0&&(i=t);const s=[],o=[];let r=0;for(const a of e)s[r]=i?i(a,r):r,o[r]=n(a,r),r++;return{values:o,keys:s}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,i]){const s=zp(e),{values:o,keys:r}=this.dt(t,n,i);if(!Array.isArray(s))return this.ut=r,o;const a=this.ut??(this.ut=[]),l=[];let c,f,u=0,p=s.length-1,b=0,x=o.length-1;for(;u<=p&&b<=x;)if(s[u]===null)u++;else if(s[p]===null)p--;else if(a[u]===r[b])l[b]=lt(s[u],o[b]),u++,b++;else if(a[p]===r[x])l[x]=lt(s[p],o[x]),p--,x--;else if(a[u]===r[x])l[x]=lt(s[u],o[x]),Gt(e,l[x+1],s[u]),u++,x--;else if(a[p]===r[b])l[b]=lt(s[p],o[b]),Gt(e,s[u],s[p]),p--,b++;else if(c===void 0&&(c=Ir(r,b,x),f=Ir(a,u,p)),c.has(a[u]))if(c.has(a[p])){const k=f.get(r[b]),S=k!==void 0?s[k]:null;if(S===null){const E=Gt(e,s[u]);lt(E,o[b]),l[b]=E}else l[b]=lt(S,o[b]),Gt(e,s[u],S),s[k]=null;b++}else Wi(s[p]),p--;else Wi(s[u]),u++;for(;b<=x;){const k=Gt(e,l[x+1]);lt(k,o[b]),l[b++]=k}for(;u<=p;){const k=s[u++];k!==null&&Wi(k)}return this.ut=r,Up(e,l),tt}}),re={messageSquare:d`
    <svg viewBox="0 0 24 24">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  `,barChart:d`
    <svg viewBox="0 0 24 24">
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  `,link:d`
    <svg viewBox="0 0 24 24">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  `,radio:d`
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="2" />
      <path
        d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"
      />
    </svg>
  `,fileText:d`
    <svg viewBox="0 0 24 24">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  `,zap:d`
    <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
  `,monitor:d`
    <svg viewBox="0 0 24 24">
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  `,settings:d`
    <svg viewBox="0 0 24 24">
      <path
        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
  `,bug:d`
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
  `,scrollText:d`
    <svg viewBox="0 0 24 24">
      <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
      <path d="M19 17V5a2 2 0 0 0-2-2H4" />
      <path d="M15 8h-5" />
      <path d="M15 12h-5" />
    </svg>
  `,folder:d`
    <svg viewBox="0 0 24 24">
      <path
        d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      />
    </svg>
  `,menu:d`
    <svg viewBox="0 0 24 24">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  `,x:d`
    <svg viewBox="0 0 24 24">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  `,check:d`
    <svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg>
  `,arrowDown:d`
    <svg viewBox="0 0 24 24">
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  `,copy:d`
    <svg viewBox="0 0 24 24">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  `,search:d`
    <svg viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  `,brain:d`
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
  `,book:d`
    <svg viewBox="0 0 24 24">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  `,loader:d`
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
  `,wrench:d`
    <svg viewBox="0 0 24 24">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      />
    </svg>
  `,fileCode:d`
    <svg viewBox="0 0 24 24">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="m10 13-2 2 2 2" />
      <path d="m14 17 2-2-2-2" />
    </svg>
  `,edit:d`
    <svg viewBox="0 0 24 24">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  `,penLine:d`
    <svg viewBox="0 0 24 24">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  `,paperclip:d`
    <svg viewBox="0 0 24 24">
      <path
        d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"
      />
    </svg>
  `,globe:d`
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  `,image:d`
    <svg viewBox="0 0 24 24">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  `,smartphone:d`
    <svg viewBox="0 0 24 24">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  `,plug:d`
    <svg viewBox="0 0 24 24">
      <path d="M12 22v-5" />
      <path d="M9 8V2" />
      <path d="M15 8V2" />
      <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
    </svg>
  `,circle:d`
    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
  `,puzzle:d`
    <svg viewBox="0 0 24 24">
      <path
        d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.076.874.54 1.02 1.02a2.5 2.5 0 1 0 3.237-3.237c-.48-.146-.944-.505-1.02-1.02a.98.98 0 0 1 .303-.917l1.526-1.526A2.402 2.402 0 0 1 11.998 2c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.236 3.236c-.464.18-.894.527-.967 1.02Z"
      />
    </svg>
  `};function Hp(e){var s,o,r,a,l;const t=(s=e.hello)==null?void 0:s.snapshot,n=(r=(o=t==null?void 0:t.sessionDefaults)==null?void 0:o.mainSessionKey)==null?void 0:r.trim();if(n)return n;const i=(l=(a=t==null?void 0:t.sessionDefaults)==null?void 0:a.mainKey)==null?void 0:l.trim();return i||"main"}function Kp(e,t){e.sessionKey=t,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:t,lastActiveSessionKey:t})}function jp(e,t){const n=ul(t,e.basePath);return d`
    <a
      href=${n}
      class="nav-item ${e.tab===t?"active":""}"
      @click=${i=>{if(!(i.defaultPrevented||i.button!==0||i.metaKey||i.ctrlKey||i.shiftKey||i.altKey)){if(i.preventDefault(),t==="chat"){const s=Hp(e);e.sessionKey!==s&&(Kp(e,s),e.loadAssistantIdentity())}e.setTab(t)}}}
      title=${us(t)}
    >
      <span class="nav-item__icon" aria-hidden="true">${re[Xu(t)]}</span>
      <span class="nav-item__text">${us(t)}</span>
    </a>
  `}function qp(e){const t=Wp(e.hello,e.sessionsResult),n=Qp(e.sessionKey,e.sessionsResult,t),i=e.onboarding,s=e.onboarding,o=e.onboarding?!1:e.settings.chatShowThinking,r=e.onboarding?!0:e.settings.chatFocusMode,a=d`
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
  `,l=d`
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
  `;return d`
    <div class="chat-controls">
      <label class="field chat-controls__session">
        <select
          .value=${e.sessionKey}
          ?disabled=${!e.connected}
          @change=${c=>{const f=c.target.value;e.sessionKey=f,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:f,lastActiveSessionKey:f}),e.loadAssistantIdentity(),hf(e,f),yn(e)}}
        >
          ${Dl(n,c=>c.key,c=>d`<option value=${c.key} title=${c.key}>
                ${c.displayName??c.key}
              </option>`)}
        </select>
      </label>
      <button
        class="btn btn--sm btn--icon"
        ?disabled=${e.chatLoading||!e.connected}
        @click=${async()=>{const c=e;c.chatManualRefreshInFlight=!0,c.chatNewMessagesBelow=!1,await c.updateComplete,c.resetToolStream();try{await Sl(e,{scheduleScroll:!1}),c.scrollToBottom({smooth:!0})}finally{requestAnimationFrame(()=>{c.chatManualRefreshInFlight=!1,c.chatNewMessagesBelow=!1})}}}
        title=${g("chat.refreshTitle")}
      >
        ${a}
      </button>
      <span class="chat-controls__separator">|</span>
      <button
        class="btn btn--sm btn--icon ${o?"active":""}"
        ?disabled=${i}
        @click=${()=>{i||e.applySettings({...e.settings,chatShowThinking:!e.settings.chatShowThinking})}}
        aria-pressed=${o}
        title=${g(i?"chat.onboardingDisabled":"chat.thinkingToggle")}
      >
        ${re.brain}
      </button>
      <button
        class="btn btn--sm btn--icon ${r?"active":""}"
        ?disabled=${s}
        @click=${()=>{s||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})}}
        aria-pressed=${r}
        title=${g(s?"chat.onboardingDisabled":"chat.focusToggle")}
      >
        ${l}
      </button>
    </div>
  `}function Wp(e,t){var o,r,a,l,c;const n=e==null?void 0:e.snapshot,i=(r=(o=n==null?void 0:n.sessionDefaults)==null?void 0:o.mainSessionKey)==null?void 0:r.trim();if(i)return i;const s=(l=(a=n==null?void 0:n.sessionDefaults)==null?void 0:a.mainKey)==null?void 0:l.trim();return s||((c=t==null?void 0:t.sessions)!=null&&c.some(f=>f.key==="main")?"main":null)}const Wn={bluebubbles:"iMessage",telegram:"Telegram",discord:"Discord",signal:"Signal",slack:"Slack",whatsapp:"WhatsApp",matrix:"Matrix",email:"Email",sms:"SMS"},Gp=Object.keys(Wn);function Mr(e){return e.charAt(0).toUpperCase()+e.slice(1)}function Vp(e){if(e==="main"||e==="agent:main:main")return{prefix:"",fallbackName:"Main Session"};if(e.includes(":subagent:"))return{prefix:"Subagent:",fallbackName:"Subagent:"};if(e.includes(":cron:"))return{prefix:"Cron:",fallbackName:"Cron Job:"};const t=e.match(/^agent:[^:]+:([^:]+):direct:(.+)$/);if(t){const i=t[1],s=t[2];return{prefix:"",fallbackName:`${Wn[i]??Mr(i)} · ${s}`}}const n=e.match(/^agent:[^:]+:([^:]+):group:(.+)$/);if(n){const i=n[1];return{prefix:"",fallbackName:`${Wn[i]??Mr(i)} Group`}}for(const i of Gp)if(e===i||e.startsWith(`${i}:`))return{prefix:"",fallbackName:`${Wn[i]} Session`};return{prefix:"",fallbackName:e}}function Gi(e,t){var a,l;const n=((a=t==null?void 0:t.label)==null?void 0:a.trim())||"",i=((l=t==null?void 0:t.displayName)==null?void 0:l.trim())||"",{prefix:s,fallbackName:o}=Vp(e),r=c=>s?new RegExp(`^${s.replace(/[.*+?^${}()|[\\]\\]/g,"\\$&")}\\s*`,"i").test(c)?c:`${s} ${c}`:c;return n&&n!==e?r(n):i&&i!==e?r(i):o}function Qp(e,t,n){var a,l;const i=new Set,s=[],o=n&&((a=t==null?void 0:t.sessions)==null?void 0:a.find(c=>c.key===n)),r=(l=t==null?void 0:t.sessions)==null?void 0:l.find(c=>c.key===e);if(n&&(i.add(n),s.push({key:n,displayName:Gi(n,o||void 0)})),i.has(e)||(i.add(e),s.push({key:e,displayName:Gi(e,r)})),t!=null&&t.sessions)for(const c of t.sessions)i.has(c.key)||(i.add(c.key),s.push({key:c.key,displayName:Gi(c.key,c)}));return s}const Jp=["system","light","dark"];function Yp(e){const t=Math.max(0,Jp.indexOf(e.theme)),n=i=>s=>{const r={element:s.currentTarget};(s.clientX||s.clientY)&&(r.pointerClientX=s.clientX,r.pointerClientY=s.clientY),e.setTheme(i,r)};return d`
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
          ${eg()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="light"?"active":""}"
          @click=${n("light")}
          aria-pressed=${e.theme==="light"}
          aria-label="Light theme"
          title="Light"
        >
          ${Xp()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="dark"?"active":""}"
          @click=${n("dark")}
          aria-pressed=${e.theme==="dark"}
          aria-label="Dark theme"
          title="Dark"
        >
          ${Zp()}
        </button>
      </div>
    </div>
  `}function Xp(){return d`
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
  `}function Zp(){return d`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
      ></path>
    </svg>
  `}function eg(){return d`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="20" height="14" x="2" y="3" rx="2"></rect>
      <line x1="8" x2="16" y1="21" y2="21"></line>
      <line x1="12" x2="12" y1="17" y2="21"></line>
    </svg>
  `}function Fl(e,t){if(!e)return e;const i=e.files.some(s=>s.name===t.name)?e.files.map(s=>s.name===t.name?t:s):[...e.files,t];return{...e,files:i}}async function Vi(e,t){if(!(!e.client||!e.connected||e.agentFilesLoading)){e.agentFilesLoading=!0,e.agentFilesError=null;try{const n=await e.client.request("agents.files.list",{agentId:t});n&&(e.agentFilesList=n,e.agentFileActive&&!n.files.some(i=>i.name===e.agentFileActive)&&(e.agentFileActive=null))}catch(n){e.agentFilesError=String(n)}finally{e.agentFilesLoading=!1}}}async function tg(e,t,n,i){if(!(!e.client||!e.connected||e.agentFilesLoading)&&!Object.hasOwn(e.agentFileContents,n)){e.agentFilesLoading=!0,e.agentFilesError=null;try{const s=await e.client.request("agents.files.get",{agentId:t,name:n});if(s!=null&&s.file){const o=s.file.content??"",r=e.agentFileContents[n]??"",a=e.agentFileDrafts[n],l=(i==null?void 0:i.preserveDraft)??!0;e.agentFilesList=Fl(e.agentFilesList,s.file),e.agentFileContents={...e.agentFileContents,[n]:o},(!l||!Object.hasOwn(e.agentFileDrafts,n)||a===r)&&(e.agentFileDrafts={...e.agentFileDrafts,[n]:o})}}catch(s){e.agentFilesError=String(s)}finally{e.agentFilesLoading=!1}}}async function ng(e,t,n,i){if(!(!e.client||!e.connected||e.agentFileSaving)){e.agentFileSaving=!0,e.agentFilesError=null;try{const s=await e.client.request("agents.files.set",{agentId:t,name:n,content:i});s!=null&&s.file&&(e.agentFilesList=Fl(e.agentFilesList,s.file),e.agentFileContents={...e.agentFileContents,[n]:i},e.agentFileDrafts={...e.agentFileDrafts,[n]:i})}catch(s){e.agentFilesError=String(s)}finally{e.agentFileSaving=!1}}}function Nl(e){return e?`${Jn(e)} (${xt(e)})`:"n/a"}function ig(e){if(e==null)return"";try{return JSON.stringify(e,null,2)}catch{return String(e)}}function sg(e){const t=e.state??{},n=t.nextRunAtMs?Jn(t.nextRunAtMs):"n/a",i=t.lastRunAtMs?Jn(t.lastRunAtMs):"n/a";return`${t.lastStatus??"n/a"} · next ${n} · last ${i}`}function og(e){const t=e.schedule;if(t.kind==="at"){const n=Date.parse(t.at);return Number.isFinite(n)?`At ${Jn(n)}`:`At ${t.at}`}return t.kind==="every"?`Every ${Ua(t.everyMs)}`:`Cron ${t.expr}${t.tz?` (${t.tz})`:""}`}function rg(e){const t=e.payload;if(t.kind==="systemEvent")return`System: ${t.text}`;const n=`Agent: ${t.message}`,i=e.delivery;if(i&&i.mode!=="none"){const s=i.mode==="webhook"?i.to?` (${i.to})`:"":i.channel||i.to?` (${i.channel??"last"}${i.to?` -> ${i.to}`:""})`:"";return`${n} · ${i.mode}${s}`}return n}function Ge(e){const t=(e??"").trim();return t?t.replace(/\s+/g,"_").toLowerCase():""}function ag(e){return[]}function lg(e){return{allow:[],alsoAllow:[],deny:[]}}const Pr=[{id:"fs",label:"Files",tools:[{id:"read",label:"read",description:"Read file contents"},{id:"write",label:"write",description:"Create or overwrite files"},{id:"edit",label:"edit",description:"Make precise edits"},{id:"apply_patch",label:"apply_patch",description:"Patch files (OpenAI)"}]},{id:"runtime",label:"Runtime",tools:[{id:"exec",label:"exec",description:"Run shell commands"},{id:"process",label:"process",description:"Manage background processes"}]},{id:"web",label:"Web",tools:[{id:"web_search",label:"web_search",description:"Search the web"},{id:"web_fetch",label:"web_fetch",description:"Fetch web content"}]},{id:"memory",label:"Memory",tools:[{id:"memory_search",label:"memory_search",description:"Semantic search"},{id:"memory_get",label:"memory_get",description:"Read memory files"}]},{id:"sessions",label:"Sessions",tools:[{id:"sessions_list",label:"sessions_list",description:"List sessions"},{id:"sessions_history",label:"sessions_history",description:"Session history"},{id:"sessions_send",label:"sessions_send",description:"Send to session"},{id:"sessions_spawn",label:"sessions_spawn",description:"Spawn sub-agent"},{id:"session_status",label:"session_status",description:"Session status"}]},{id:"ui",label:"UI",tools:[{id:"browser",label:"browser",description:"Control web browser"},{id:"canvas",label:"canvas",description:"Control canvases"}]},{id:"messaging",label:"Messaging",tools:[{id:"message",label:"message",description:"Send messages"}]},{id:"automation",label:"Automation",tools:[{id:"cron",label:"cron",description:"Schedule tasks"},{id:"gateway",label:"gateway",description:"Gateway control"}]},{id:"nodes",label:"Nodes",tools:[{id:"nodes",label:"nodes",description:"Nodes + devices"}]},{id:"agents",label:"Agents",tools:[{id:"agents_list",label:"agents_list",description:"List agents"}]},{id:"media",label:"Media",tools:[{id:"image",label:"image",description:"Image understanding"}]}],cg=[{id:"minimal",label:"Minimal"},{id:"coding",label:"Coding"},{id:"messaging",label:"Messaging"},{id:"full",label:"Full"}];function bs(e){var t,n,i;return((t=e.name)==null?void 0:t.trim())||((i=(n=e.identity)==null?void 0:n.name)==null?void 0:i.trim())||e.id}function Dn(e){const t=e.trim();if(!t||t.length>16)return!1;let n=!1;for(let i=0;i<t.length;i+=1)if(t.charCodeAt(i)>127){n=!0;break}return!(!n||t.includes("://")||t.includes("/")||t.includes("."))}function vi(e,t){var r,a,l,c,f,u;const n=(r=t==null?void 0:t.emoji)==null?void 0:r.trim();if(n&&Dn(n))return n;const i=(l=(a=e.identity)==null?void 0:a.emoji)==null?void 0:l.trim();if(i&&Dn(i))return i;const s=(c=t==null?void 0:t.avatar)==null?void 0:c.trim();if(s&&Dn(s))return s;const o=(u=(f=e.identity)==null?void 0:f.avatar)==null?void 0:u.trim();return o&&Dn(o)?o:""}function Ol(e,t){return t&&e===t?"default":null}function dg(e){if(e==null||!Number.isFinite(e))return"-";if(e<1024)return`${e} B`;const t=["KB","MB","GB","TB"];let n=e/1024,i=0;for(;n>=1024&&i<t.length-1;)n/=1024,i+=1;return`${n.toFixed(n<10?1:0)} ${t[i]}`}function yi(e,t){var o,r;const n=e;return{entry:(((o=n==null?void 0:n.agents)==null?void 0:o.list)??[]).find(a=>(a==null?void 0:a.id)===t),defaults:(r=n==null?void 0:n.agents)==null?void 0:r.defaults,globalTools:n==null?void 0:n.tools}}function Dr(e,t,n,i,s){var b,x,k,S,E,P,F,L,A,h,_,C;const o=yi(t,e.id),a=(n&&n.agentId===e.id?n.workspace:null)||((b=o.entry)==null?void 0:b.workspace)||((x=o.defaults)==null?void 0:x.workspace)||"default",l=(k=o.entry)!=null&&k.model?an((S=o.entry)==null?void 0:S.model):an((E=o.defaults)==null?void 0:E.model),c=((P=s==null?void 0:s.name)==null?void 0:P.trim())||((L=(F=e.identity)==null?void 0:F.name)==null?void 0:L.trim())||((A=e.name)==null?void 0:A.trim())||((h=o.entry)==null?void 0:h.name)||e.id,f=vi(e,s)||"-",u=Array.isArray((_=o.entry)==null?void 0:_.skills)?(C=o.entry)==null?void 0:C.skills:null,p=(u==null?void 0:u.length)??null;return{workspace:a,model:l,identityName:c,identityEmoji:f,skillsLabel:u?`${p} selected`:"all skills",isDefault:!!(i&&e.id===i)}}function an(e){var t;if(!e)return"-";if(typeof e=="string")return e.trim()||"-";if(typeof e=="object"&&e){const n=e,i=(t=n.primary)==null?void 0:t.trim();if(i){const s=Array.isArray(n.fallbacks)?n.fallbacks.length:0;return s>0?`${i} (+${s} fallback)`:i}}return"-"}function Fr(e){const t=e.match(/^(.+) \(\+\d+ fallback\)$/);return t?t[1]:e}function Nr(e){if(!e)return null;if(typeof e=="string")return e.trim()||null;if(typeof e=="object"&&e){const t=e,n=typeof t.primary=="string"?t.primary:typeof t.model=="string"?t.model:typeof t.id=="string"?t.id:typeof t.value=="string"?t.value:null;return(n==null?void 0:n.trim())||null}return null}function ug(e){if(!e||typeof e=="string")return null;if(typeof e=="object"&&e){const t=e,n=Array.isArray(t.fallbacks)?t.fallbacks:Array.isArray(t.fallback)?t.fallback:null;return n?n.filter(i=>typeof i=="string"):null}return null}function fg(e){return e.split(",").map(t=>t.trim()).filter(Boolean)}function pg(e){var s,o,r;const t=e,n=(o=(s=t==null?void 0:t.agents)==null?void 0:s.defaults)==null?void 0:o.models;if(!n||typeof n!="object")return[];const i=[];for(const[a,l]of Object.entries(n)){const c=a.trim();if(!c)continue;const f=l&&typeof l=="object"&&"alias"in l&&typeof l.alias=="string"?(r=l.alias)==null?void 0:r.trim():void 0,u=f&&f!==c?`${f} (${c})`:c;i.push({value:c,label:u})}return i}function gg(e,t){const n=pg(e),i=t?n.some(s=>s.value===t):!1;return t&&!i&&n.unshift({value:t,label:`Current (${t})`}),n.length===0?d`
      <option value="" disabled>No configured models</option>
    `:n.map(s=>d`<option value=${s.value}>${s.label}</option>`)}function hg(e){const t=Ge(e);if(!t)return{kind:"exact",value:""};if(t==="*")return{kind:"all"};if(!t.includes("*"))return{kind:"exact",value:t};const n=t.replace(/[.*+?^${}()|[\\]\\]/g,"\\$&");return{kind:"regex",value:new RegExp(`^${n.replaceAll("\\*",".*")}$`)}}function ws(e){return Array.isArray(e)?ag().map(hg).filter(t=>t.kind!=="exact"||t.value.length>0):[]}function ln(e,t){for(const n of t)if(n.kind==="all"||n.kind==="exact"&&e===n.value||n.kind==="regex"&&n.value.test(e))return!0;return!1}function mg(e,t){if(!t)return!0;const n=Ge(e),i=ws(t.deny);if(ln(n,i))return!1;const s=ws(t.allow);return!!(s.length===0||ln(n,s)||n==="apply_patch"&&ln("exec",s))}function Or(e,t){if(!Array.isArray(t)||t.length===0)return!1;const n=Ge(e),i=ws(t);return!!(ln(n,i)||n==="apply_patch"&&ln("exec",i))}function vg(e){return lg()??void 0}function Bl(e,t){return d`
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
  `}function yg(e,t){var i,s;const n=(i=e.channelMeta)==null?void 0:i.find(o=>o.id===t);return n!=null&&n.label?n.label:((s=e.channelLabels)==null?void 0:s[t])??t}function bg(e){var s;if(!e)return[];const t=new Set;for(const o of e.channelOrder??[])t.add(o);for(const o of e.channelMeta??[])t.add(o.id);for(const o of Object.keys(e.channelAccounts??{}))t.add(o);const n=[],i=(s=e.channelOrder)!=null&&s.length?e.channelOrder:Array.from(t);for(const o of i)t.has(o)&&(n.push(o),t.delete(o));for(const o of t)n.push(o);return n.map(o=>{var r;return{id:o,label:yg(e,o),accounts:((r=e.channelAccounts)==null?void 0:r[o])??[]}})}const wg=["groupPolicy","streamMode","dmPolicy"];function $g(e,t){if(!e)return null;const i=(e.channels??{})[t];if(i&&typeof i=="object")return i;const s=e[t];return s&&typeof s=="object"?s:null}function xg(e){if(e==null)return"n/a";if(typeof e=="string"||typeof e=="number"||typeof e=="boolean")return String(e);try{return JSON.stringify(e)}catch{return"n/a"}}function kg(e,t){const n=$g(e,t);return n?wg.flatMap(i=>i in n?[{label:i,value:xg(n[i])}]:[]):[]}function Sg(e){let t=0,n=0,i=0;for(const s of e){const o=s.probe&&typeof s.probe=="object"&&"ok"in s.probe?!!s.probe.ok:!1;(s.connected===!0||s.running===!0||o)&&(t+=1),s.configured&&(n+=1),s.enabled&&(i+=1)}return{total:e.length,connected:t,configured:n,enabled:i}}function Ag(e){const t=bg(e.snapshot),n=e.lastSuccess?xt(e.lastSuccess):"never";return d`
    <section class="grid grid-cols-2">
      ${Bl(e.context,"Workspace, identity, and model configuration.")}
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
        ${e.error?d`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:$}
        ${e.snapshot?$:d`
                <div class="callout info" style="margin-top: 12px">Load channels to see live status.</div>
              `}
        ${t.length===0?d`
                <div class="muted" style="margin-top: 16px">No channels found.</div>
              `:d`
                <div class="list" style="margin-top: 16px;">
                  ${t.map(i=>{const s=Sg(i.accounts),o=s.total?`${s.connected}/${s.total} connected`:"no accounts",r=s.configured?`${s.configured} configured`:"not configured",a=s.total?`${s.enabled} enabled`:"disabled",l=kg(e.configForm,i.id);return d`
                      <div class="list-item">
                        <div class="list-main">
                          <div class="list-title">${i.label}</div>
                          <div class="list-sub mono">${i.id}</div>
                        </div>
                        <div class="list-meta">
                          <div>${o}</div>
                          <div>${r}</div>
                          <div>${a}</div>
                          ${l.length>0?l.map(c=>d`<div>${c.label}: ${c.value}</div>`):$}
                        </div>
                      </div>
                    `})}
                </div>
              `}
      </section>
    </section>
  `}function _g(e){var n,i;const t=e.jobs.filter(s=>s.agentId===e.agentId);return d`
    <section class="grid grid-cols-2">
      ${Bl(e.context,"Workspace and scheduling targets.")}
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
            <div class="stat-value">${Nl(((i=e.status)==null?void 0:i.nextWakeAtMs)??null)}</div>
          </div>
        </div>
        ${e.error?d`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:$}
      </section>
    </section>
    <section class="card">
      <div class="card-title">Agent Cron Jobs</div>
      <div class="card-sub">Scheduled jobs targeting this agent.</div>
      ${t.length===0?d`
              <div class="muted" style="margin-top: 16px">No jobs assigned.</div>
            `:d`
              <div class="list" style="margin-top: 16px;">
                ${t.map(s=>d`
                    <div class="list-item">
                      <div class="list-main">
                        <div class="list-title">${s.name}</div>
                        ${s.description?d`<div class="list-sub">${s.description}</div>`:$}
                        <div class="chip-row" style="margin-top: 6px;">
                          <span class="chip">${og(s)}</span>
                          <span class="chip ${s.enabled?"chip-ok":"chip-warn"}">
                            ${s.enabled?"enabled":"disabled"}
                          </span>
                          <span class="chip">${s.sessionTarget}</span>
                        </div>
                      </div>
                      <div class="list-meta">
                        <div class="mono">${sg(s)}</div>
                        <div class="muted">${rg(s)}</div>
                      </div>
                    </div>
                  `)}
              </div>
            `}
    </section>
  `}function Cg(e){var l;const t=((l=e.agentFilesList)==null?void 0:l.agentId)===e.agentId?e.agentFilesList:null,n=(t==null?void 0:t.files)??[],i=e.agentFileActive??null,s=i?n.find(c=>c.name===i)??null:null,o=i?e.agentFileContents[i]??"":"",r=i?e.agentFileDrafts[i]??o:"",a=i?r!==o:!1;return d`
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
      ${t?d`<div class="muted mono" style="margin-top: 8px;">Workspace: ${t.workspace}</div>`:$}
      ${e.agentFilesError?d`<div class="callout danger" style="margin-top: 12px;">${e.agentFilesError}</div>`:$}
      ${t?d`
              <div class="agent-files-grid" style="margin-top: 16px;">
                <div class="agent-files-list">
                  ${n.length===0?d`
                          <div class="muted">No files found.</div>
                        `:n.map(c=>Tg(c,i,()=>e.onSelectFile(c.name)))}
                </div>
                <div class="agent-files-editor">
                  ${s?d`
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
                          ${s.missing?d`
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
                        `:d`
                          <div class="muted">Select a file to edit.</div>
                        `}
                </div>
              </div>
            `:d`
              <div class="callout info" style="margin-top: 12px">
                Load the agent workspace files to edit core instructions.
              </div>
            `}
    </section>
  `}function Tg(e,t,n){const i=e.missing?"Missing":`${dg(e.size)} · ${xt(e.updatedAtMs??null)}`;return d`
    <button
      type="button"
      class="agent-file-row ${t===e.name?"active":""}"
      @click=${n}
    >
      <div>
        <div class="agent-file-name mono">${e.name}</div>
        <div class="agent-file-meta">${i}</div>
      </div>
      ${e.missing?d`
              <span class="agent-pill warn">missing</span>
            `:$}
    </button>
  `}const Fn=[{id:"workspace",label:"Workspace Skills",sources:["openclaw-workspace"]},{id:"built-in",label:"Built-in Skills",sources:["openclaw-bundled"]},{id:"installed",label:"Installed Skills",sources:["openclaw-managed"]},{id:"extra",label:"Extra Skills",sources:["openclaw-extra"]}];function Ul(e){var o;const t=new Map;for(const r of Fn)t.set(r.id,{id:r.id,label:r.label,skills:[]});const n=Fn.find(r=>r.id==="built-in"),i={id:"other",label:"Other Skills",skills:[]};for(const r of e){const a=r.bundled?n:Fn.find(l=>l.sources.includes(r.source));a?(o=t.get(a.id))==null||o.skills.push(r):i.skills.push(r)}const s=Fn.map(r=>t.get(r.id)).filter(r=>!!(r&&r.skills.length>0));return i.skills.length>0&&s.push(i),s}function zl(e){return[...e.missing.bins.map(t=>`bin:${t}`),...e.missing.env.map(t=>`env:${t}`),...e.missing.config.map(t=>`config:${t}`),...e.missing.os.map(t=>`os:${t}`)]}function Hl(e){const t=[];return e.disabled&&t.push("disabled"),e.blockedByAllowlist&&t.push("blocked by allowlist"),t}function Kl(e){const t=e.skill,n=!!e.showBundledBadge;return d`
    <div class="chip-row" style="margin-top: 6px;">
      <span class="chip">${t.source}</span>
      ${n?d`
              <span class="chip">bundled</span>
            `:$}
      <span class="chip ${t.eligible?"chip-ok":"chip-warn"}">
        ${t.eligible?"eligible":"blocked"}
      </span>
      ${t.disabled?d`
              <span class="chip chip-warn">disabled</span>
            `:$}
    </div>
  `}function Eg(e){var E;const t=yi(e.configForm,e.agentId),n=((E=t.entry)==null?void 0:E.tools)??{},i=t.globalTools??{},s=n.profile??i.profile??"full",o=n.profile?"agent override":i.profile?"global default":"default",r=Array.isArray(n.allow)&&n.allow.length>0,a=Array.isArray(i.allow)&&i.allow.length>0,l=!!e.configForm&&!e.configLoading&&!e.configSaving&&!r,c=r?[]:Array.isArray(n.alsoAllow)?n.alsoAllow:[],f=r?[]:Array.isArray(n.deny)?n.deny:[],u=r?{allow:n.allow??[],deny:n.deny??[]}:vg()??void 0,p=Pr.flatMap(P=>P.tools.map(F=>F.id)),b=P=>{const F=mg(P,u),L=Or(P,c),A=Or(P,f);return{allowed:(F||L)&&!A,baseAllowed:F,denied:A}},x=p.filter(P=>b(P).allowed).length,k=(P,F)=>{const L=new Set(c.map(C=>Ge(C)).filter(C=>C.length>0)),A=new Set(f.map(C=>Ge(C)).filter(C=>C.length>0)),h=b(P).baseAllowed,_=Ge(P);F?(A.delete(_),h||L.add(_)):(L.delete(_),A.add(_)),e.onOverridesChange(e.agentId,[...L],[...A])},S=P=>{const F=new Set(c.map(A=>Ge(A)).filter(A=>A.length>0)),L=new Set(f.map(A=>Ge(A)).filter(A=>A.length>0));for(const A of p){const h=b(A).baseAllowed,_=Ge(A);P?(L.delete(_),h||F.add(_)):(F.delete(_),L.add(_))}e.onOverridesChange(e.agentId,[...F],[...L])};return d`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Tool Access</div>
          <div class="card-sub">
            Profile + per-tool overrides for this agent.
            <span class="mono">${x}/${p.length}</span> enabled.
          </div>
        </div>
        <div class="row" style="gap: 8px;">
          <button class="btn btn--sm" ?disabled=${!l} @click=${()=>S(!0)}>
            Enable All
          </button>
          <button class="btn btn--sm" ?disabled=${!l} @click=${()=>S(!1)}>
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

      ${e.configForm?$:d`
              <div class="callout info" style="margin-top: 12px">
                Load the gateway config to adjust tool profiles.
              </div>
            `}
      ${r?d`
              <div class="callout info" style="margin-top: 12px">
                This agent is using an explicit allowlist in config. Tool overrides are managed in the Config tab.
              </div>
            `:$}
      ${a?d`
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
        ${e.configDirty?d`
                <div class="agent-kv">
                  <div class="label">Status</div>
                  <div class="mono">unsaved</div>
                </div>
              `:$}
      </div>

      <div class="agent-tools-presets" style="margin-top: 16px;">
        <div class="label">Quick Presets</div>
        <div class="agent-tools-buttons">
          ${cg.map(P=>d`
              <button
                class="btn btn--sm ${s===P.id?"active":""}"
                ?disabled=${!l}
                @click=${()=>e.onProfileChange(e.agentId,P.id,!0)}
              >
                ${P.label}
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
        ${Pr.map(P=>d`
              <div class="agent-tools-section">
                <div class="agent-tools-header">${P.label}</div>
                <div class="agent-tools-list">
                  ${P.tools.map(F=>{const{allowed:L}=b(F.id);return d`
                      <div class="agent-tool-row">
                        <div>
                          <div class="agent-tool-title mono">${F.label}</div>
                          <div class="agent-tool-sub">${F.description}</div>
                        </div>
                        <label class="cfg-toggle">
                          <input
                            type="checkbox"
                            .checked=${L}
                            ?disabled=${!l}
                            @change=${A=>k(F.id,A.target.checked)}
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
  `}function Rg(e){var b,x,k;const t=!!e.configForm&&!e.configLoading&&!e.configSaving,n=yi(e.configForm,e.agentId),i=Array.isArray((b=n.entry)==null?void 0:b.skills)?(x=n.entry)==null?void 0:x.skills:void 0,s=new Set((i??[]).map(S=>S.trim()).filter(Boolean)),o=i!==void 0,r=!!(e.report&&e.activeAgentId===e.agentId),a=r?((k=e.report)==null?void 0:k.skills)??[]:[],l=e.filter.trim().toLowerCase(),c=l?a.filter(S=>[S.name,S.description,S.source].join(" ").toLowerCase().includes(l)):a,f=Ul(c),u=o?a.filter(S=>s.has(S.name)).length:a.length,p=a.length;return d`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Skills</div>
          <div class="card-sub">
            Per-agent skill allowlist and workspace skills.
            ${p>0?d`<span class="mono">${u}/${p}</span>`:$}
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

      ${e.configForm?$:d`
              <div class="callout info" style="margin-top: 12px">
                Load the gateway config to set per-agent skills.
              </div>
            `}
      ${o?d`
              <div class="callout info" style="margin-top: 12px">This agent uses a custom skill allowlist.</div>
            `:d`
              <div class="callout info" style="margin-top: 12px">
                All skills are enabled. Disabling any skill will create a per-agent allowlist.
              </div>
            `}
      ${!r&&!e.loading?d`
              <div class="callout info" style="margin-top: 12px">
                Load skills for this agent to view workspace-specific entries.
              </div>
            `:$}
      ${e.error?d`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:$}

      <div class="filters" style="margin-top: 14px;">
        <label class="field" style="flex: 1;">
          <span>Filter</span>
          <input
            .value=${e.filter}
            @input=${S=>e.onFilterChange(S.target.value)}
            placeholder="Search skills"
          />
        </label>
        <div class="muted">${c.length} shown</div>
      </div>

      ${c.length===0?d`
              <div class="muted" style="margin-top: 16px">No skills found.</div>
            `:d`
              <div class="agent-skills-groups" style="margin-top: 16px;">
                ${f.map(S=>Lg(S,{agentId:e.agentId,allowSet:s,usingAllowlist:o,editable:t,onToggle:e.onToggle}))}
              </div>
            `}
    </section>
  `}function Lg(e,t){const n=e.id==="workspace"||e.id==="built-in";return d`
    <details class="agent-skills-group" ?open=${!n}>
      <summary class="agent-skills-header">
        <span>${e.label}</span>
        <span class="muted">${e.skills.length}</span>
      </summary>
      <div class="list skills-grid">
        ${e.skills.map(i=>Ig(i,{agentId:t.agentId,allowSet:t.allowSet,usingAllowlist:t.usingAllowlist,editable:t.editable,onToggle:t.onToggle}))}
      </div>
    </details>
  `}function Ig(e,t){const n=t.usingAllowlist?t.allowSet.has(e.name):!0,i=zl(e),s=Hl(e);return d`
    <div class="list-item agent-skill-row">
      <div class="list-main">
        <div class="list-title">${e.emoji?`${e.emoji} `:""}${e.name}</div>
        <div class="list-sub">${e.description}</div>
        ${Kl({skill:e})}
        ${i.length>0?d`<div class="muted" style="margin-top: 6px;">Missing: ${i.join(", ")}</div>`:$}
        ${s.length>0?d`<div class="muted" style="margin-top: 6px;">Reason: ${s.join(", ")}</div>`:$}
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
  `}function Mg(e){var o,r,a;const t=((o=e.agentsList)==null?void 0:o.agents)??[],n=((r=e.agentsList)==null?void 0:r.defaultId)??null,i=e.selectedAgentId??n??((a=t[0])==null?void 0:a.id)??null,s=i?t.find(l=>l.id===i)??null:null;return d`
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
        ${e.error?d`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:$}
        <div class="agent-list" style="margin-top: 12px;">
          ${t.length===0?d`
                  <div class="muted">No agents found.</div>
                `:t.map(l=>{const c=Ol(l.id,n),f=vi(l,e.agentIdentityById[l.id]??null);return d`
                    <button
                      type="button"
                      class="agent-row ${i===l.id?"active":""}"
                      @click=${()=>e.onSelectAgent(l.id)}
                    >
                      <div class="agent-avatar">${f||bs(l).slice(0,1)}</div>
                      <div class="agent-info">
                        <div class="agent-title">${bs(l)}</div>
                        <div class="agent-sub mono">${l.id}</div>
                      </div>
                      ${c?d`<span class="agent-pill">${c}</span>`:$}
                    </button>
                  `})}
        </div>
      </section>
      <section class="agents-main">
        ${s?d`
                ${Pg(s,n,e.agentIdentityById[s.id]??null)}
                ${Dg(e.activePanel,l=>e.onSelectPanel(l))}
                ${e.activePanel==="overview"?Fg({agent:s,defaultId:n,configForm:e.configForm,agentFilesList:e.agentFilesList,agentIdentity:e.agentIdentityById[s.id]??null,agentIdentityError:e.agentIdentityError,agentIdentityLoading:e.agentIdentityLoading,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave,onModelChange:e.onModelChange,onModelFallbacksChange:e.onModelFallbacksChange}):$}
                ${e.activePanel==="files"?Cg({agentId:s.id,agentFilesList:e.agentFilesList,agentFilesLoading:e.agentFilesLoading,agentFilesError:e.agentFilesError,agentFileActive:e.agentFileActive,agentFileContents:e.agentFileContents,agentFileDrafts:e.agentFileDrafts,agentFileSaving:e.agentFileSaving,onLoadFiles:e.onLoadFiles,onSelectFile:e.onSelectFile,onFileDraftChange:e.onFileDraftChange,onFileReset:e.onFileReset,onFileSave:e.onFileSave}):$}
                ${e.activePanel==="tools"?Eg({agentId:s.id,configForm:e.configForm,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,onProfileChange:e.onToolsProfileChange,onOverridesChange:e.onToolsOverridesChange,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):$}
                ${e.activePanel==="skills"?Rg({agentId:s.id,report:e.agentSkillsReport,loading:e.agentSkillsLoading,error:e.agentSkillsError,activeAgentId:e.agentSkillsAgentId,configForm:e.configForm,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,filter:e.skillsFilter,onFilterChange:e.onSkillsFilterChange,onRefresh:e.onSkillsRefresh,onToggle:e.onAgentSkillToggle,onClear:e.onAgentSkillsClear,onDisableAll:e.onAgentSkillsDisableAll,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):$}
                ${e.activePanel==="channels"?Ag({context:Dr(s,e.configForm,e.agentFilesList,n,e.agentIdentityById[s.id]??null),configForm:e.configForm,snapshot:e.channelsSnapshot,loading:e.channelsLoading,error:e.channelsError,lastSuccess:e.channelsLastSuccess,onRefresh:e.onChannelsRefresh}):$}
                ${e.activePanel==="cron"?_g({context:Dr(s,e.configForm,e.agentFilesList,n,e.agentIdentityById[s.id]??null),agentId:s.id,jobs:e.cronJobs,status:e.cronStatus,loading:e.cronLoading,error:e.cronError,onRefresh:e.onCronRefresh}):$}
              `:d`
                <div class="card">
                  <div class="card-title">Select an agent</div>
                  <div class="card-sub">Pick an agent to inspect its workspace and tools.</div>
                </div>
              `}
      </section>
    </div>
  `}function Pg(e,t,n){var a,l;const i=Ol(e.id,t),s=bs(e),o=((l=(a=e.identity)==null?void 0:a.theme)==null?void 0:l.trim())||"Agent workspace and routing.",r=vi(e,n);return d`
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
        ${i?d`<span class="agent-pill">${i}</span>`:$}
      </div>
    </section>
  `}function Dg(e,t){return d`
    <div class="agent-tabs">
      ${[{id:"overview",label:"Overview"},{id:"files",label:"Files"},{id:"tools",label:"Tools"},{id:"skills",label:"Skills"},{id:"channels",label:"Channels"},{id:"cron",label:"成单"}].map(i=>d`
          <button
            class="agent-tab ${e===i.id?"active":""}"
            type="button"
            @click=${()=>t(i.id)}
          >
            ${i.label}
          </button>
        `)}
    </div>
  `}function Fg(e){var B,ee,ge,O,ae,le,X,Qe,I,Q,j,te,Ue,ze,Kt,St;const{agent:t,configForm:n,agentFilesList:i,agentIdentity:s,agentIdentityLoading:o,agentIdentityError:r,configLoading:a,configSaving:l,configDirty:c,onConfigReload:f,onConfigSave:u,onModelChange:p,onModelFallbacksChange:b}=e,x=yi(n,t.id),S=(i&&i.agentId===t.id?i.workspace:null)||((B=x.entry)==null?void 0:B.workspace)||((ee=x.defaults)==null?void 0:ee.workspace)||"default",E=(ge=x.entry)!=null&&ge.model?an((O=x.entry)==null?void 0:O.model):an((ae=x.defaults)==null?void 0:ae.model),P=an((le=x.defaults)==null?void 0:le.model),F=Nr((X=x.entry)==null?void 0:X.model)||(E!=="-"?Fr(E):null),L=Nr((Qe=x.defaults)==null?void 0:Qe.model)||(P!=="-"?Fr(P):null),A=F??L??null,h=ug((I=x.entry)==null?void 0:I.model),_=h?h.join(", "):"",C=((Q=s==null?void 0:s.name)==null?void 0:Q.trim())||((te=(j=t.identity)==null?void 0:j.name)==null?void 0:te.trim())||((Ue=t.name)==null?void 0:Ue.trim())||((ze=x.entry)==null?void 0:ze.name)||"-",z=vi(t,s)||"-",U=Array.isArray((Kt=x.entry)==null?void 0:Kt.skills)?(St=x.entry)==null?void 0:St.skills:null,H=(U==null?void 0:U.length)??null,K=o?"Loading…":r?"Unavailable":"",Y=!!(e.defaultId&&t.id===e.defaultId);return d`
    <section class="card">
      <div class="card-title">Overview</div>
      <div class="card-sub">Workspace paths and identity metadata.</div>
      <div class="agents-overview-grid" style="margin-top: 16px;">
        <div class="agent-kv">
          <div class="label">Workspace</div>
          <div class="mono">${S}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Primary Model</div>
          <div class="mono">${E}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Identity Name</div>
          <div>${C}</div>
          ${K?d`<div class="agent-kv-sub muted">${K}</div>`:$}
        </div>
        <div class="agent-kv">
          <div class="label">Default</div>
          <div>${Y?"yes":"no"}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Identity Emoji</div>
          <div>${z}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Skills Filter</div>
          <div>${U?`${H} selected`:"all skills"}</div>
        </div>
      </div>

      <div class="agent-model-select" style="margin-top: 20px;">
        <div class="label">Model Selection</div>
        <div class="row" style="gap: 12px; flex-wrap: wrap;">
          <label class="field" style="min-width: 260px; flex: 1;">
            <span>Primary model${Y?" (default)":""}</span>
            <select
              .value=${A??""}
              ?disabled=${!n||a||l}
              @change=${At=>p(t.id,At.target.value||null)}
            >
              ${Y?$:d`
                      <option value="">
                        ${L?`Inherit default (${L})`:"Inherit default"}
                      </option>
                    `}
              ${gg(n,A??void 0)}
            </select>
          </label>
          <label class="field" style="min-width: 260px; flex: 1;">
            <span>Fallbacks (comma-separated)</span>
            <input
              .value=${_}
              ?disabled=${!n||a||l}
              placeholder="provider/model, provider/model"
              @input=${At=>b(t.id,fg(At.target.value))}
            />
          </label>
        </div>
        <div class="row" style="justify-content: flex-end; gap: 8px;">
          <button class="btn btn--sm" ?disabled=${a} @click=${f}>
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
  `}function Br(e){var t;e&&((t=navigator.clipboard)==null||t.writeText(e).catch(()=>{}))}function Ng(e){const{loading:t,saving:n,error:i,content:s,lastSuccessAt:o,dependentFiles:r,onReload:a,onSave:l,onContentChange:c}=e,f=o!=null?new Date(o).toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"";return d`
    <section class="card">
      <div class="row" style="justify-content: space-between; align-items: flex-start;">
        <div>
          <div class="card-title">业务知识</div>
          <div class="card-sub">
            编辑万鼎业务知识（wanding_business_knowledge.md），供选型与匹配使用。保存后 LLM 将使用最新内容。
          </div>
        </div>
        <div class="row" style="gap: 8px; align-items: center;">
          ${f?d`<span class="muted">已保存 ${f}</span>`:$}
          <button class="btn" ?disabled=${t} @click=${a}>
            ${t?"加载中…":"重新加载"}
          </button>
          <button class="btn btn--primary" ?disabled=${t||n} @click=${()=>l(s)}>
            ${n?"保存中…":"保存"}
          </button>
        </div>
      </div>
      ${i?d`<div class="callout danger" style="margin-top: 12px;">${i}</div>`:$}
      ${r&&(r.mapping_table||r.price_library)?d`
            <div class="callout" style="margin-top: 12px; padding: 12px;">
              <div style="font-weight: 600; margin-bottom: 8px;">相关数据文件</div>
              <p class="muted" style="margin: 0 0 10px 0; font-size: 0.9rem;">
                选型与历史报价依赖以下 Excel，有更新时可复制路径后在资源管理器中打开或用 Excel 编辑。
              </p>
              ${r.mapping_table?d`
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; flex-wrap: wrap;">
                      <span style="min-width: 100px;">询价映射表（历史报价）：</span>
                      <code style="flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; font-size: 0.85rem;">${r.mapping_table}</code>
                      <button
                        class="btn"
                        style="flex-shrink: 0;"
                        @click=${()=>Br(r.mapping_table)}
                        title="复制路径"
                      >
                        复制路径
                      </button>
                    </div>
                  `:$}
              ${r.price_library?d`
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                      <span style="min-width: 100px;">万鼎价格库：</span>
                      <code style="flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; font-size: 0.85rem;">${r.price_library}</code>
                      <button
                        class="btn"
                        style="flex-shrink: 0;"
                        @click=${()=>Br(r.price_library)}
                        title="复制路径"
                      >
                        复制路径
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
          @input=${u=>{const p=u.target;c((p==null?void 0:p.value)??"")}}
          placeholder="【业务知识】&#10;1. …"
        ></textarea>
      </div>
    </section>
  `}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const cn=(e,t)=>{var i;const n=e._$AN;if(n===void 0)return!1;for(const s of n)(i=s._$AO)==null||i.call(s,t,!1),cn(s,t);return!0},ti=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while((n==null?void 0:n.size)===0)},jl=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),Ug(t)}};function Og(e){this._$AN!==void 0?(ti(this),this._$AM=e,jl(this)):this._$AM=e}function Bg(e,t=!1,n=0){const i=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(t)if(Array.isArray(i))for(let o=n;o<i.length;o++)cn(i[o],!1),ti(i[o]);else i!=null&&(cn(i,!1),ti(i));else cn(this,e)}const Ug=e=>{e.type==uo.CHILD&&(e._$AP??(e._$AP=Bg),e._$AQ??(e._$AQ=Og))};class zg extends po{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,n,i){super._$AT(t,n,i),jl(this),this.isConnected=t._$AU}_$AO(t,n=!0){var i,s;t!==this.isConnected&&(this.isConnected=t,t?(i=this.reconnected)==null||i.call(this):(s=this.disconnected)==null||s.call(this)),n&&(cn(this,t),ti(this))}setValue(t){if(Op(this._$Ct))this._$Ct._$AI(t,this);else{const n=[...this._$Ct._$AH];n[this._$Ci]=t,this._$Ct._$AI(n,this,0)}}disconnected(){}reconnected(){}}const Qi=new WeakMap,Hg=fo(class extends zg{render(e){return $}update(e,[t]){var i;const n=t!==this.G;return n&&this.G!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=(i=e.options)==null?void 0:i.host,this.rt(this.ct=e.element)),$}rt(e){if(this.isConnected||(e=void 0),typeof this.G=="function"){const t=this.ht??globalThis;let n=Qi.get(t);n===void 0&&(n=new WeakMap,Qi.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){var e,t;return typeof this.G=="function"?(e=Qi.get(this.ht??globalThis))==null?void 0:e.get(this.G):(t=this.G)==null?void 0:t.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class $s extends po{constructor(t){if(super(t),this.it=$,t.type!==uo.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===$||t==null)return this._t=void 0,this.it=t;if(t===tt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}$s.directiveName="unsafeHTML",$s.resultType=1;const xs=fo($s);/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:ql,setPrototypeOf:Ur,isFrozen:Kg,getPrototypeOf:jg,getOwnPropertyDescriptor:qg}=Object;let{freeze:ye,seal:_e,create:ks}=Object,{apply:Ss,construct:As}=typeof Reflect<"u"&&Reflect;ye||(ye=function(t){return t});_e||(_e=function(t){return t});Ss||(Ss=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),o=2;o<i;o++)s[o-2]=arguments[o];return t.apply(n,s)});As||(As=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const Nn=be(Array.prototype.forEach),Wg=be(Array.prototype.lastIndexOf),zr=be(Array.prototype.pop),Vt=be(Array.prototype.push),Gg=be(Array.prototype.splice),Gn=be(String.prototype.toLowerCase),Ji=be(String.prototype.toString),Yi=be(String.prototype.match),Qt=be(String.prototype.replace),Vg=be(String.prototype.indexOf),Qg=be(String.prototype.trim),Ce=be(Object.prototype.hasOwnProperty),he=be(RegExp.prototype.test),Jt=Jg(TypeError);function be(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return Ss(e,t,i)}}function Jg(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return As(e,n)}}function q(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Gn;Ur&&Ur(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const o=n(s);o!==s&&(Kg(t)||(t[i]=o),s=o)}e[s]=!0}return e}function Yg(e){for(let t=0;t<e.length;t++)Ce(e,t)||(e[t]=null);return e}function De(e){const t=ks(null);for(const[n,i]of ql(e))Ce(e,n)&&(Array.isArray(i)?t[n]=Yg(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=De(i):t[n]=i);return t}function Yt(e,t){for(;e!==null;){const i=qg(e,t);if(i){if(i.get)return be(i.get);if(typeof i.value=="function")return be(i.value)}e=jg(e)}function n(){return null}return n}const Hr=ye(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Xi=ye(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Zi=ye(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Xg=ye(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),es=ye(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Zg=ye(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Kr=ye(["#text"]),jr=ye(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ts=ye(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),qr=ye(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),On=ye(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),eh=_e(/\{\{[\w\W]*|[\w\W]*\}\}/gm),th=_e(/<%[\w\W]*|[\w\W]*%>/gm),nh=_e(/\$\{[\w\W]*/gm),ih=_e(/^data-[\-\w.\u00B7-\uFFFF]+$/),sh=_e(/^aria-[\-\w]+$/),Wl=_e(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),oh=_e(/^(?:\w+script|data):/i),rh=_e(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Gl=_e(/^html$/i),ah=_e(/^[a-z][.\w]*(-[.\w]+)+$/i);var Wr=Object.freeze({__proto__:null,ARIA_ATTR:sh,ATTR_WHITESPACE:rh,CUSTOM_ELEMENT:ah,DATA_ATTR:ih,DOCTYPE_NAME:Gl,ERB_EXPR:th,IS_ALLOWED_URI:Wl,IS_SCRIPT_OR_DATA:oh,MUSTACHE_EXPR:eh,TMPLIT_EXPR:nh});const Xt={element:1,text:3,progressingInstruction:7,comment:8,document:9},lh=function(){return typeof window>"u"?null:window},ch=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const o="dompurify"+(i?"#"+i:"");try{return t.createPolicy(o,{createHTML(r){return r},createScriptURL(r){return r}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Gr=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Vl(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:lh();const t=N=>Vl(N);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==Xt.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:o,HTMLTemplateElement:r,Node:a,Element:l,NodeFilter:c,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:u,DOMParser:p,trustedTypes:b}=e,x=l.prototype,k=Yt(x,"cloneNode"),S=Yt(x,"remove"),E=Yt(x,"nextSibling"),P=Yt(x,"childNodes"),F=Yt(x,"parentNode");if(typeof r=="function"){const N=n.createElement("template");N.content&&N.content.ownerDocument&&(n=N.content.ownerDocument)}let L,A="";const{implementation:h,createNodeIterator:_,createDocumentFragment:C,getElementsByTagName:R}=n,{importNode:z}=i;let U=Gr();t.isSupported=typeof ql=="function"&&typeof F=="function"&&h&&h.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:H,ERB_EXPR:K,TMPLIT_EXPR:Y,DATA_ATTR:B,ARIA_ATTR:ee,IS_SCRIPT_OR_DATA:ge,ATTR_WHITESPACE:O,CUSTOM_ELEMENT:ae}=Wr;let{IS_ALLOWED_URI:le}=Wr,X=null;const Qe=q({},[...Hr,...Xi,...Zi,...es,...Kr]);let I=null;const Q=q({},[...jr,...ts,...qr,...On]);let j=Object.seal(ks(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),te=null,Ue=null;const ze=Object.seal(ks(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Kt=!0,St=!0,At=!1,_o=!0,_t=!1,Sn=!0,ot=!1,xi=!1,ki=!1,Ct=!1,An=!1,_n=!1,Co=!0,To=!1;const mc="user-content-";let Si=!0,jt=!1,Tt={},Ie=null;const Ai=q({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Eo=null;const Ro=q({},["audio","video","img","source","image","track"]);let _i=null;const Lo=q({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Cn="http://www.w3.org/1998/Math/MathML",Tn="http://www.w3.org/2000/svg",He="http://www.w3.org/1999/xhtml";let Et=He,Ci=!1,Ti=null;const vc=q({},[Cn,Tn,He],Ji);let En=q({},["mi","mo","mn","ms","mtext"]),Rn=q({},["annotation-xml"]);const yc=q({},["title","style","font","a","script"]);let qt=null;const bc=["application/xhtml+xml","text/html"],wc="text/html";let se=null,Rt=null;const $c=n.createElement("form"),Io=function(w){return w instanceof RegExp||w instanceof Function},Ei=function(){let w=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Rt&&Rt===w)){if((!w||typeof w!="object")&&(w={}),w=De(w),qt=bc.indexOf(w.PARSER_MEDIA_TYPE)===-1?wc:w.PARSER_MEDIA_TYPE,se=qt==="application/xhtml+xml"?Ji:Gn,X=Ce(w,"ALLOWED_TAGS")?q({},w.ALLOWED_TAGS,se):Qe,I=Ce(w,"ALLOWED_ATTR")?q({},w.ALLOWED_ATTR,se):Q,Ti=Ce(w,"ALLOWED_NAMESPACES")?q({},w.ALLOWED_NAMESPACES,Ji):vc,_i=Ce(w,"ADD_URI_SAFE_ATTR")?q(De(Lo),w.ADD_URI_SAFE_ATTR,se):Lo,Eo=Ce(w,"ADD_DATA_URI_TAGS")?q(De(Ro),w.ADD_DATA_URI_TAGS,se):Ro,Ie=Ce(w,"FORBID_CONTENTS")?q({},w.FORBID_CONTENTS,se):Ai,te=Ce(w,"FORBID_TAGS")?q({},w.FORBID_TAGS,se):De({}),Ue=Ce(w,"FORBID_ATTR")?q({},w.FORBID_ATTR,se):De({}),Tt=Ce(w,"USE_PROFILES")?w.USE_PROFILES:!1,Kt=w.ALLOW_ARIA_ATTR!==!1,St=w.ALLOW_DATA_ATTR!==!1,At=w.ALLOW_UNKNOWN_PROTOCOLS||!1,_o=w.ALLOW_SELF_CLOSE_IN_ATTR!==!1,_t=w.SAFE_FOR_TEMPLATES||!1,Sn=w.SAFE_FOR_XML!==!1,ot=w.WHOLE_DOCUMENT||!1,Ct=w.RETURN_DOM||!1,An=w.RETURN_DOM_FRAGMENT||!1,_n=w.RETURN_TRUSTED_TYPE||!1,ki=w.FORCE_BODY||!1,Co=w.SANITIZE_DOM!==!1,To=w.SANITIZE_NAMED_PROPS||!1,Si=w.KEEP_CONTENT!==!1,jt=w.IN_PLACE||!1,le=w.ALLOWED_URI_REGEXP||Wl,Et=w.NAMESPACE||He,En=w.MATHML_TEXT_INTEGRATION_POINTS||En,Rn=w.HTML_INTEGRATION_POINTS||Rn,j=w.CUSTOM_ELEMENT_HANDLING||{},w.CUSTOM_ELEMENT_HANDLING&&Io(w.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(j.tagNameCheck=w.CUSTOM_ELEMENT_HANDLING.tagNameCheck),w.CUSTOM_ELEMENT_HANDLING&&Io(w.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(j.attributeNameCheck=w.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),w.CUSTOM_ELEMENT_HANDLING&&typeof w.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(j.allowCustomizedBuiltInElements=w.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),_t&&(St=!1),An&&(Ct=!0),Tt&&(X=q({},Kr),I=[],Tt.html===!0&&(q(X,Hr),q(I,jr)),Tt.svg===!0&&(q(X,Xi),q(I,ts),q(I,On)),Tt.svgFilters===!0&&(q(X,Zi),q(I,ts),q(I,On)),Tt.mathMl===!0&&(q(X,es),q(I,qr),q(I,On))),w.ADD_TAGS&&(typeof w.ADD_TAGS=="function"?ze.tagCheck=w.ADD_TAGS:(X===Qe&&(X=De(X)),q(X,w.ADD_TAGS,se))),w.ADD_ATTR&&(typeof w.ADD_ATTR=="function"?ze.attributeCheck=w.ADD_ATTR:(I===Q&&(I=De(I)),q(I,w.ADD_ATTR,se))),w.ADD_URI_SAFE_ATTR&&q(_i,w.ADD_URI_SAFE_ATTR,se),w.FORBID_CONTENTS&&(Ie===Ai&&(Ie=De(Ie)),q(Ie,w.FORBID_CONTENTS,se)),w.ADD_FORBID_CONTENTS&&(Ie===Ai&&(Ie=De(Ie)),q(Ie,w.ADD_FORBID_CONTENTS,se)),Si&&(X["#text"]=!0),ot&&q(X,["html","head","body"]),X.table&&(q(X,["tbody"]),delete te.tbody),w.TRUSTED_TYPES_POLICY){if(typeof w.TRUSTED_TYPES_POLICY.createHTML!="function")throw Jt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof w.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Jt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');L=w.TRUSTED_TYPES_POLICY,A=L.createHTML("")}else L===void 0&&(L=ch(b,s)),L!==null&&typeof A=="string"&&(A=L.createHTML(""));ye&&ye(w),Rt=w}},Mo=q({},[...Xi,...Zi,...Xg]),Po=q({},[...es,...Zg]),xc=function(w){let T=F(w);(!T||!T.tagName)&&(T={namespaceURI:Et,tagName:"template"});const D=Gn(w.tagName),Z=Gn(T.tagName);return Ti[w.namespaceURI]?w.namespaceURI===Tn?T.namespaceURI===He?D==="svg":T.namespaceURI===Cn?D==="svg"&&(Z==="annotation-xml"||En[Z]):!!Mo[D]:w.namespaceURI===Cn?T.namespaceURI===He?D==="math":T.namespaceURI===Tn?D==="math"&&Rn[Z]:!!Po[D]:w.namespaceURI===He?T.namespaceURI===Tn&&!Rn[Z]||T.namespaceURI===Cn&&!En[Z]?!1:!Po[D]&&(yc[D]||!Mo[D]):!!(qt==="application/xhtml+xml"&&Ti[w.namespaceURI]):!1},Me=function(w){Vt(t.removed,{element:w});try{F(w).removeChild(w)}catch{S(w)}},rt=function(w,T){try{Vt(t.removed,{attribute:T.getAttributeNode(w),from:T})}catch{Vt(t.removed,{attribute:null,from:T})}if(T.removeAttribute(w),w==="is")if(Ct||An)try{Me(T)}catch{}else try{T.setAttribute(w,"")}catch{}},Do=function(w){let T=null,D=null;if(ki)w="<remove></remove>"+w;else{const ne=Yi(w,/^[\r\n\t ]+/);D=ne&&ne[0]}qt==="application/xhtml+xml"&&Et===He&&(w='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+w+"</body></html>");const Z=L?L.createHTML(w):w;if(Et===He)try{T=new p().parseFromString(Z,qt)}catch{}if(!T||!T.documentElement){T=h.createDocument(Et,"template",null);try{T.documentElement.innerHTML=Ci?A:Z}catch{}}const fe=T.body||T.documentElement;return w&&D&&fe.insertBefore(n.createTextNode(D),fe.childNodes[0]||null),Et===He?R.call(T,ot?"html":"body")[0]:ot?T.documentElement:fe},Fo=function(w){return _.call(w.ownerDocument||w,w,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Ri=function(w){return w instanceof u&&(typeof w.nodeName!="string"||typeof w.textContent!="string"||typeof w.removeChild!="function"||!(w.attributes instanceof f)||typeof w.removeAttribute!="function"||typeof w.setAttribute!="function"||typeof w.namespaceURI!="string"||typeof w.insertBefore!="function"||typeof w.hasChildNodes!="function")},No=function(w){return typeof a=="function"&&w instanceof a};function Ke(N,w,T){Nn(N,D=>{D.call(t,w,T,Rt)})}const Oo=function(w){let T=null;if(Ke(U.beforeSanitizeElements,w,null),Ri(w))return Me(w),!0;const D=se(w.nodeName);if(Ke(U.uponSanitizeElement,w,{tagName:D,allowedTags:X}),Sn&&w.hasChildNodes()&&!No(w.firstElementChild)&&he(/<[/\w!]/g,w.innerHTML)&&he(/<[/\w!]/g,w.textContent)||w.nodeType===Xt.progressingInstruction||Sn&&w.nodeType===Xt.comment&&he(/<[/\w]/g,w.data))return Me(w),!0;if(!(ze.tagCheck instanceof Function&&ze.tagCheck(D))&&(!X[D]||te[D])){if(!te[D]&&Uo(D)&&(j.tagNameCheck instanceof RegExp&&he(j.tagNameCheck,D)||j.tagNameCheck instanceof Function&&j.tagNameCheck(D)))return!1;if(Si&&!Ie[D]){const Z=F(w)||w.parentNode,fe=P(w)||w.childNodes;if(fe&&Z){const ne=fe.length;for(let we=ne-1;we>=0;--we){const je=k(fe[we],!0);je.__removalCount=(w.__removalCount||0)+1,Z.insertBefore(je,E(w))}}}return Me(w),!0}return w instanceof l&&!xc(w)||(D==="noscript"||D==="noembed"||D==="noframes")&&he(/<\/no(script|embed|frames)/i,w.innerHTML)?(Me(w),!0):(_t&&w.nodeType===Xt.text&&(T=w.textContent,Nn([H,K,Y],Z=>{T=Qt(T,Z," ")}),w.textContent!==T&&(Vt(t.removed,{element:w.cloneNode()}),w.textContent=T)),Ke(U.afterSanitizeElements,w,null),!1)},Bo=function(w,T,D){if(Co&&(T==="id"||T==="name")&&(D in n||D in $c))return!1;if(!(St&&!Ue[T]&&he(B,T))){if(!(Kt&&he(ee,T))){if(!(ze.attributeCheck instanceof Function&&ze.attributeCheck(T,w))){if(!I[T]||Ue[T]){if(!(Uo(w)&&(j.tagNameCheck instanceof RegExp&&he(j.tagNameCheck,w)||j.tagNameCheck instanceof Function&&j.tagNameCheck(w))&&(j.attributeNameCheck instanceof RegExp&&he(j.attributeNameCheck,T)||j.attributeNameCheck instanceof Function&&j.attributeNameCheck(T,w))||T==="is"&&j.allowCustomizedBuiltInElements&&(j.tagNameCheck instanceof RegExp&&he(j.tagNameCheck,D)||j.tagNameCheck instanceof Function&&j.tagNameCheck(D))))return!1}else if(!_i[T]){if(!he(le,Qt(D,O,""))){if(!((T==="src"||T==="xlink:href"||T==="href")&&w!=="script"&&Vg(D,"data:")===0&&Eo[w])){if(!(At&&!he(ge,Qt(D,O,"")))){if(D)return!1}}}}}}}return!0},Uo=function(w){return w!=="annotation-xml"&&Yi(w,ae)},zo=function(w){Ke(U.beforeSanitizeAttributes,w,null);const{attributes:T}=w;if(!T||Ri(w))return;const D={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:I,forceKeepAttr:void 0};let Z=T.length;for(;Z--;){const fe=T[Z],{name:ne,namespaceURI:we,value:je}=fe,Lt=se(ne),Li=je;let ce=ne==="value"?Li:Qg(Li);if(D.attrName=Lt,D.attrValue=ce,D.keepAttr=!0,D.forceKeepAttr=void 0,Ke(U.uponSanitizeAttribute,w,D),ce=D.attrValue,To&&(Lt==="id"||Lt==="name")&&(rt(ne,w),ce=mc+ce),Sn&&he(/((--!?|])>)|<\/(style|title|textarea)/i,ce)){rt(ne,w);continue}if(Lt==="attributename"&&Yi(ce,"href")){rt(ne,w);continue}if(D.forceKeepAttr)continue;if(!D.keepAttr){rt(ne,w);continue}if(!_o&&he(/\/>/i,ce)){rt(ne,w);continue}_t&&Nn([H,K,Y],Ko=>{ce=Qt(ce,Ko," ")});const Ho=se(w.nodeName);if(!Bo(Ho,Lt,ce)){rt(ne,w);continue}if(L&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!we)switch(b.getAttributeType(Ho,Lt)){case"TrustedHTML":{ce=L.createHTML(ce);break}case"TrustedScriptURL":{ce=L.createScriptURL(ce);break}}if(ce!==Li)try{we?w.setAttributeNS(we,ne,ce):w.setAttribute(ne,ce),Ri(w)?Me(w):zr(t.removed)}catch{rt(ne,w)}}Ke(U.afterSanitizeAttributes,w,null)},kc=function N(w){let T=null;const D=Fo(w);for(Ke(U.beforeSanitizeShadowDOM,w,null);T=D.nextNode();)Ke(U.uponSanitizeShadowNode,T,null),Oo(T),zo(T),T.content instanceof o&&N(T.content);Ke(U.afterSanitizeShadowDOM,w,null)};return t.sanitize=function(N){let w=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},T=null,D=null,Z=null,fe=null;if(Ci=!N,Ci&&(N="<!-->"),typeof N!="string"&&!No(N))if(typeof N.toString=="function"){if(N=N.toString(),typeof N!="string")throw Jt("dirty is not a string, aborting")}else throw Jt("toString is not a function");if(!t.isSupported)return N;if(xi||Ei(w),t.removed=[],typeof N=="string"&&(jt=!1),jt){if(N.nodeName){const je=se(N.nodeName);if(!X[je]||te[je])throw Jt("root node is forbidden and cannot be sanitized in-place")}}else if(N instanceof a)T=Do("<!---->"),D=T.ownerDocument.importNode(N,!0),D.nodeType===Xt.element&&D.nodeName==="BODY"||D.nodeName==="HTML"?T=D:T.appendChild(D);else{if(!Ct&&!_t&&!ot&&N.indexOf("<")===-1)return L&&_n?L.createHTML(N):N;if(T=Do(N),!T)return Ct?null:_n?A:""}T&&ki&&Me(T.firstChild);const ne=Fo(jt?N:T);for(;Z=ne.nextNode();)Oo(Z),zo(Z),Z.content instanceof o&&kc(Z.content);if(jt)return N;if(Ct){if(An)for(fe=C.call(T.ownerDocument);T.firstChild;)fe.appendChild(T.firstChild);else fe=T;return(I.shadowroot||I.shadowrootmode)&&(fe=z.call(i,fe,!0)),fe}let we=ot?T.outerHTML:T.innerHTML;return ot&&X["!doctype"]&&T.ownerDocument&&T.ownerDocument.doctype&&T.ownerDocument.doctype.name&&he(Gl,T.ownerDocument.doctype.name)&&(we="<!DOCTYPE "+T.ownerDocument.doctype.name+`>
`+we),_t&&Nn([H,K,Y],je=>{we=Qt(we,je," ")}),L&&_n?L.createHTML(we):we},t.setConfig=function(){let N=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ei(N),xi=!0},t.clearConfig=function(){Rt=null,xi=!1},t.isValidAttribute=function(N,w,T){Rt||Ei({});const D=se(N),Z=se(w);return Bo(D,Z,T)},t.addHook=function(N,w){typeof w=="function"&&Vt(U[N],w)},t.removeHook=function(N,w){if(w!==void 0){const T=Wg(U[N],w);return T===-1?void 0:Gg(U[N],T,1)[0]}return zr(U[N])},t.removeHooks=function(N){U[N]=[]},t.removeAllHooks=function(){U=Gr()},t}var _s=Vl();function go(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var kt=go();function Ql(e){kt=e}var ut={exec:()=>null};function V(e,t=""){let n=typeof e=="string"?e:e.source,i={replace:(s,o)=>{let r=typeof o=="string"?o:o.source;return r=r.replace(ve.caret,"$1"),n=n.replace(s,r),i},getRegex:()=>new RegExp(n,t)};return i}var dh=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),ve={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}>`)},uh=/^(?:[ \t]*(?:\n|$))+/,fh=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ph=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,kn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,gh=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ho=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,Jl=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Yl=V(Jl).replace(/bull/g,ho).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),hh=V(Jl).replace(/bull/g,ho).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),mo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,mh=/^[^\n]+/,vo=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,vh=V(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",vo).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),yh=V(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ho).getRegex(),bi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",yo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,bh=V("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",yo).replace("tag",bi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Xl=V(mo).replace("hr",kn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",bi).getRegex(),wh=V(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Xl).getRegex(),bo={blockquote:wh,code:fh,def:vh,fences:ph,heading:gh,hr:kn,html:bh,lheading:Yl,list:yh,newline:uh,paragraph:Xl,table:ut,text:mh},Vr=V("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",kn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",bi).getRegex(),$h={...bo,lheading:hh,table:Vr,paragraph:V(mo).replace("hr",kn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Vr).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",bi).getRegex()},xh={...bo,html:V(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",yo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ut,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:V(mo).replace("hr",kn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Yl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},kh=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Sh=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Zl=/^( {2,}|\\)\n(?!\s*$)/,Ah=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,wi=/[\p{P}\p{S}]/u,wo=/[\s\p{P}\p{S}]/u,ec=/[^\s\p{P}\p{S}]/u,_h=V(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,wo).getRegex(),tc=/(?!~)[\p{P}\p{S}]/u,Ch=/(?!~)[\s\p{P}\p{S}]/u,Th=/(?:[^\s\p{P}\p{S}]|~)/u,nc=/(?![*_])[\p{P}\p{S}]/u,Eh=/(?![*_])[\s\p{P}\p{S}]/u,Rh=/(?:[^\s\p{P}\p{S}]|[*_])/u,Lh=V(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",dh?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ic=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ih=V(ic,"u").replace(/punct/g,wi).getRegex(),Mh=V(ic,"u").replace(/punct/g,tc).getRegex(),sc="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ph=V(sc,"gu").replace(/notPunctSpace/g,ec).replace(/punctSpace/g,wo).replace(/punct/g,wi).getRegex(),Dh=V(sc,"gu").replace(/notPunctSpace/g,Th).replace(/punctSpace/g,Ch).replace(/punct/g,tc).getRegex(),Fh=V("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ec).replace(/punctSpace/g,wo).replace(/punct/g,wi).getRegex(),Nh=V(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,nc).getRegex(),Oh="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",Bh=V(Oh,"gu").replace(/notPunctSpace/g,Rh).replace(/punctSpace/g,Eh).replace(/punct/g,nc).getRegex(),Uh=V(/\\(punct)/,"gu").replace(/punct/g,wi).getRegex(),zh=V(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Hh=V(yo).replace("(?:-->|$)","-->").getRegex(),Kh=V("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Hh).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ni=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,jh=V(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ni).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),oc=V(/^!?\[(label)\]\[(ref)\]/).replace("label",ni).replace("ref",vo).getRegex(),rc=V(/^!?\[(ref)\](?:\[\])?/).replace("ref",vo).getRegex(),qh=V("reflink|nolink(?!\\()","g").replace("reflink",oc).replace("nolink",rc).getRegex(),Qr=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,$o={_backpedal:ut,anyPunctuation:Uh,autolink:zh,blockSkip:Lh,br:Zl,code:Sh,del:ut,delLDelim:ut,delRDelim:ut,emStrongLDelim:Ih,emStrongRDelimAst:Ph,emStrongRDelimUnd:Fh,escape:kh,link:jh,nolink:rc,punctuation:_h,reflink:oc,reflinkSearch:qh,tag:Kh,text:Ah,url:ut},Wh={...$o,link:V(/^!?\[(label)\]\((.*?)\)/).replace("label",ni).getRegex(),reflink:V(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ni).getRegex()},Cs={...$o,emStrongRDelimAst:Dh,emStrongLDelim:Mh,delLDelim:Nh,delRDelim:Bh,url:V(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Qr).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:V(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Qr).getRegex()},Gh={...Cs,br:V(Zl).replace("{2,}","*").getRegex(),text:V(Cs.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Bn={normal:bo,gfm:$h,pedantic:xh},Zt={normal:$o,gfm:Cs,breaks:Gh,pedantic:Wh},Vh={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Jr=e=>Vh[e];function Fe(e,t){if(t){if(ve.escapeTest.test(e))return e.replace(ve.escapeReplace,Jr)}else if(ve.escapeTestNoEncode.test(e))return e.replace(ve.escapeReplaceNoEncode,Jr);return e}function Yr(e){try{e=encodeURI(e).replace(ve.percentDecode,"%")}catch{return null}return e}function Xr(e,t){var o;let n=e.replace(ve.findPipe,(r,a,l)=>{let c=!1,f=a;for(;--f>=0&&l[f]==="\\";)c=!c;return c?"|":" |"}),i=n.split(ve.splitPipe),s=0;if(i[0].trim()||i.shift(),i.length>0&&!((o=i.at(-1))!=null&&o.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(ve.slashPipe,"|");return i}function en(e,t,n){let i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function Qh(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function Jh(e,t=0){let n=t,i="";for(let s of e)if(s==="	"){let o=4-n%4;i+=" ".repeat(o),n+=o}else i+=s,n++;return i}function Zr(e,t,n,i,s){let o=t.href,r=t.title||null,a=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:r,text:a,tokens:i.inlineTokens(a)};return i.state.inLink=!1,l}function Yh(e,t,n){let i=e.match(n.other.indentCodeCompensation);if(i===null)return t;let s=i[1];return t.split(`
`).map(o=>{let r=o.match(n.other.beginningSpace);if(r===null)return o;let[a]=r;return a.length>=s.length?o.slice(s.length):o}).join(`
`)}var ii=class{constructor(e){W(this,"options");W(this,"rules");W(this,"lexer");this.options=e||kt}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:en(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],i=Yh(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let i=en(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:en(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=en(t[0],`
`).split(`
`),i="",s="",o=[];for(;n.length>0;){let r=!1,a=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))a.push(n[l]),r=!0;else if(!r)a.push(n[l]);else break;n=n.slice(l);let c=a.join(`
`),f=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,s=s?`${s}
${f}`:f;let u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=u,n.length===0)break;let p=o.at(-1);if((p==null?void 0:p.type)==="code")break;if((p==null?void 0:p.type)==="blockquote"){let b=p,x=b.raw+`
`+n.join(`
`),k=this.blockquote(x);o[o.length-1]=k,i=i.substring(0,i.length-b.raw.length)+k.raw,s=s.substring(0,s.length-b.text.length)+k.text;break}else if((p==null?void 0:p.type)==="list"){let b=p,x=b.raw+`
`+n.join(`
`),k=this.list(x);o[o.length-1]=k,i=i.substring(0,i.length-p.raw.length)+k.raw,s=s.substring(0,s.length-b.raw.length)+k.raw,n=x.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:o,text:s}}}list(e){var n,i;let t=this.rules.block.list.exec(e);if(t){let s=t[1].trim(),o=s.length>1,r={type:"list",raw:"",ordered:o,start:o?+s.slice(0,-1):"",loose:!1,items:[]};s=o?`\\d{1,9}\\${s.slice(-1)}`:`\\${s}`,this.options.pedantic&&(s=o?s:"[*+-]");let a=this.rules.other.listItemRegex(s),l=!1;for(;e;){let f=!1,u="",p="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let b=Jh(t[2].split(`
`,1)[0],t[1].length),x=e.split(`
`,1)[0],k=!b.trim(),S=0;if(this.options.pedantic?(S=2,p=b.trimStart()):k?S=t[1].length+1:(S=b.search(this.rules.other.nonSpaceChar),S=S>4?1:S,p=b.slice(S),S+=t[1].length),k&&this.rules.other.blankLine.test(x)&&(u+=x+`
`,e=e.substring(x.length+1),f=!0),!f){let E=this.rules.other.nextBulletRegex(S),P=this.rules.other.hrRegex(S),F=this.rules.other.fencesBeginRegex(S),L=this.rules.other.headingBeginRegex(S),A=this.rules.other.htmlBeginRegex(S),h=this.rules.other.blockquoteBeginRegex(S);for(;e;){let _=e.split(`
`,1)[0],C;if(x=_,this.options.pedantic?(x=x.replace(this.rules.other.listReplaceNesting,"  "),C=x):C=x.replace(this.rules.other.tabCharGlobal,"    "),F.test(x)||L.test(x)||A.test(x)||h.test(x)||E.test(x)||P.test(x))break;if(C.search(this.rules.other.nonSpaceChar)>=S||!x.trim())p+=`
`+C.slice(S);else{if(k||b.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||F.test(b)||L.test(b)||P.test(b))break;p+=`
`+x}k=!x.trim(),u+=_+`
`,e=e.substring(_.length+1),b=C.slice(S)}}r.loose||(l?r.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(l=!0)),r.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),r.raw+=u}let c=r.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;r.raw=r.raw.trimEnd();for(let f of r.items){if(this.lexer.state.top=!1,f.tokens=this.lexer.blockTokens(f.text,[]),f.task){if(f.text=f.text.replace(this.rules.other.listReplaceTask,""),((n=f.tokens[0])==null?void 0:n.type)==="text"||((i=f.tokens[0])==null?void 0:i.type)==="paragraph"){f.tokens[0].raw=f.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),f.tokens[0].text=f.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(f.raw);if(u){let p={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};f.checked=p.checked,r.loose?f.tokens[0]&&["paragraph","text"].includes(f.tokens[0].type)&&"tokens"in f.tokens[0]&&f.tokens[0].tokens?(f.tokens[0].raw=p.raw+f.tokens[0].raw,f.tokens[0].text=p.raw+f.tokens[0].text,f.tokens[0].tokens.unshift(p)):f.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):f.tokens.unshift(p)}}if(!r.loose){let u=f.tokens.filter(b=>b.type==="space"),p=u.length>0&&u.some(b=>this.rules.other.anyLine.test(b.raw));r.loose=p}}if(r.loose)for(let f of r.items){f.loose=!0;for(let u of f.tokens)u.type==="text"&&(u.type="paragraph")}return r}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var r;let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Xr(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(r=t[3])!=null&&r.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(let a of i)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Xr(a,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=en(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=Qh(t[2],"()");if(o===-2)return;if(o>-1){let r=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(i);o&&(i=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),Zr(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Zr(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(i[1]||i[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...i[0]].length-1,o,r,a=s,l=0,c=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+s);(i=c.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(r=[...o].length,i[3]||i[4]){a+=r;continue}else if((i[5]||i[6])&&s%3&&!((s+r)%3)){l+=r;continue}if(a-=r,a>0)continue;r=Math.min(r,r+a+l);let f=[...i[0]][0].length,u=e.slice(0,s+i.index+f+r);if(Math.min(s,r)%2){let b=u.slice(1,-1);return{type:"em",raw:u,text:b,tokens:this.lexer.inlineTokens(b)}}let p=u.slice(2,-2);return{type:"strong",raw:u,text:p,tokens:this.lexer.inlineTokens(p)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e,t,n=""){let i=this.rules.inline.delLDelim.exec(e);if(i&&(!i[1]||!n||this.rules.inline.punctuation.exec(n))){let s=[...i[0]].length-1,o,r,a=s,l=this.rules.inline.delRDelim;for(l.lastIndex=0,t=t.slice(-1*e.length+s);(i=l.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o||(r=[...o].length,r!==s))continue;if(i[3]||i[4]){a+=r;continue}if(a-=r,a>0)continue;r=Math.min(r,r+a);let c=[...i[0]][0].length,f=e.slice(0,s+i.index+c+r),u=f.slice(s,-s);return{type:"del",raw:f,text:u,tokens:this.lexer.inlineTokens(u)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let o;do o=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(o!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Ee=class Ts{constructor(t){W(this,"tokens");W(this,"options");W(this,"state");W(this,"inlineQueue");W(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||kt,this.options.tokenizer=this.options.tokenizer||new ii,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:ve,block:Bn.normal,inline:Zt.normal};this.options.pedantic?(n.block=Bn.pedantic,n.inline=Zt.pedantic):this.options.gfm&&(n.block=Bn.gfm,this.options.breaks?n.inline=Zt.breaks:n.inline=Zt.gfm),this.tokenizer.rules=n}static get rules(){return{block:Bn,inline:Zt}}static lex(t,n){return new Ts(n).lex(t)}static lexInline(t,n){return new Ts(n).inlineTokens(t)}lex(t){t=t.replace(ve.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,o,r;for(this.options.pedantic&&(t=t.replace(ve.tabCharGlobal,"    ").replace(ve.spaceLine,""));t;){let a;if((o=(s=this.options.extensions)==null?void 0:s.block)!=null&&o.some(c=>(a=c.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.space(t)){t=t.substring(a.raw.length);let c=n.at(-1);a.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(a);continue}if(a=this.tokenizer.code(t)){t=t.substring(a.raw.length);let c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=(c.raw.endsWith(`
`)?"":`
`)+a.raw,c.text+=`
`+a.text,this.inlineQueue.at(-1).src=c.text):n.push(a);continue}if(a=this.tokenizer.fences(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.heading(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.hr(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.blockquote(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.list(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.html(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.def(t)){t=t.substring(a.raw.length);let c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=(c.raw.endsWith(`
`)?"":`
`)+a.raw,c.text+=`
`+a.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[a.tag]||(this.tokens.links[a.tag]={href:a.href,title:a.title},n.push(a));continue}if(a=this.tokenizer.table(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.lheading(t)){t=t.substring(a.raw.length),n.push(a);continue}let l=t;if((r=this.options.extensions)!=null&&r.startBlock){let c=1/0,f=t.slice(1),u;this.options.extensions.startBlock.forEach(p=>{u=p.call({lexer:this},f),typeof u=="number"&&u>=0&&(c=Math.min(c,u))}),c<1/0&&c>=0&&(l=t.substring(0,c+1))}if(this.state.top&&(a=this.tokenizer.paragraph(l))){let c=n.at(-1);i&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=(c.raw.endsWith(`
`)?"":`
`)+a.raw,c.text+=`
`+a.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(a),i=l.length!==t.length,t=t.substring(a.raw.length);continue}if(a=this.tokenizer.text(t)){t=t.substring(a.raw.length);let c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=(c.raw.endsWith(`
`)?"":`
`)+a.raw,c.text+=`
`+a.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(a);continue}if(t){let c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var l,c,f,u,p;let i=t,s=null;if(this.tokens.links){let b=Object.keys(this.tokens.links);if(b.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)b.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)o=s[2]?s[2].length:0,i=i.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);i=((c=(l=this.options.hooks)==null?void 0:l.emStrongMask)==null?void 0:c.call({lexer:this},i))??i;let r=!1,a="";for(;t;){r||(a=""),r=!1;let b;if((u=(f=this.options.extensions)==null?void 0:f.inline)!=null&&u.some(k=>(b=k.call({lexer:this},t,n))?(t=t.substring(b.raw.length),n.push(b),!0):!1))continue;if(b=this.tokenizer.escape(t)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.tag(t)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.link(t)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(b.raw.length);let k=n.at(-1);b.type==="text"&&(k==null?void 0:k.type)==="text"?(k.raw+=b.raw,k.text+=b.text):n.push(b);continue}if(b=this.tokenizer.emStrong(t,i,a)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.codespan(t)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.br(t)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.del(t,i,a)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.autolink(t)){t=t.substring(b.raw.length),n.push(b);continue}if(!this.state.inLink&&(b=this.tokenizer.url(t))){t=t.substring(b.raw.length),n.push(b);continue}let x=t;if((p=this.options.extensions)!=null&&p.startInline){let k=1/0,S=t.slice(1),E;this.options.extensions.startInline.forEach(P=>{E=P.call({lexer:this},S),typeof E=="number"&&E>=0&&(k=Math.min(k,E))}),k<1/0&&k>=0&&(x=t.substring(0,k+1))}if(b=this.tokenizer.inlineText(x)){t=t.substring(b.raw.length),b.raw.slice(-1)!=="_"&&(a=b.raw.slice(-1)),r=!0;let k=n.at(-1);(k==null?void 0:k.type)==="text"?(k.raw+=b.raw,k.text+=b.text):n.push(b);continue}if(t){let k="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(k);break}else throw new Error(k)}}return n}},si=class{constructor(e){W(this,"options");W(this,"parser");this.options=e||kt}space(e){return""}code({text:e,lang:t,escaped:n}){var o;let i=(o=(t||"").match(ve.notSpaceStart))==null?void 0:o[0],s=e.replace(ve.endingNewline,"")+`
`;return i?'<pre><code class="language-'+Fe(i)+'">'+(n?s:Fe(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Fe(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Fe(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let i=this.parser.parseInline(n),s=Yr(e);if(s===null)return i;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Fe(t)+'"'),o+=">"+i+"</a>",o}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));let s=Yr(e);if(s===null)return Fe(n);e=s;let o=`<img src="${e}" alt="${Fe(n)}"`;return t&&(o+=` title="${Fe(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Fe(e.text)}},xo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Re=class Es{constructor(t){W(this,"options");W(this,"renderer");W(this,"textRenderer");this.options=t||kt,this.options.renderer=this.options.renderer||new si,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new xo}static parse(t,n){return new Es(n).parse(t)}static parseInline(t,n){return new Es(n).parseInline(t)}parse(t){var i,s;let n="";for(let o=0;o<t.length;o++){let r=t[o];if((s=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&s[r.type]){let l=r,c=this.options.extensions.renderers[l.type].call({parser:this},l);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(l.type)){n+=c||"";continue}}let a=r;switch(a.type){case"space":{n+=this.renderer.space(a);break}case"hr":{n+=this.renderer.hr(a);break}case"heading":{n+=this.renderer.heading(a);break}case"code":{n+=this.renderer.code(a);break}case"table":{n+=this.renderer.table(a);break}case"blockquote":{n+=this.renderer.blockquote(a);break}case"list":{n+=this.renderer.list(a);break}case"checkbox":{n+=this.renderer.checkbox(a);break}case"html":{n+=this.renderer.html(a);break}case"def":{n+=this.renderer.def(a);break}case"paragraph":{n+=this.renderer.paragraph(a);break}case"text":{n+=this.renderer.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}parseInline(t,n=this.renderer){var s,o;let i="";for(let r=0;r<t.length;r++){let a=t[r];if((o=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&o[a.type]){let c=this.options.extensions.renderers[a.type].call({parser:this},a);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type)){i+=c||"";continue}}let l=a;switch(l.type){case"escape":{i+=n.text(l);break}case"html":{i+=n.html(l);break}case"link":{i+=n.link(l);break}case"image":{i+=n.image(l);break}case"checkbox":{i+=n.checkbox(l);break}case"strong":{i+=n.strong(l);break}case"em":{i+=n.em(l);break}case"codespan":{i+=n.codespan(l);break}case"br":{i+=n.br(l);break}case"del":{i+=n.del(l);break}case"text":{i+=n.text(l);break}default:{let c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},zn,tn=(zn=class{constructor(e){W(this,"options");W(this,"block");this.options=e||kt}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ee.lex:Ee.lexInline}provideParser(){return this.block?Re.parse:Re.parseInline}},W(zn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),W(zn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),zn),Xh=class{constructor(...e){W(this,"defaults",go());W(this,"options",this.setOptions);W(this,"parse",this.parseMarkdown(!0));W(this,"parseInline",this.parseMarkdown(!1));W(this,"Parser",Re);W(this,"Renderer",si);W(this,"TextRenderer",xo);W(this,"Lexer",Ee);W(this,"Tokenizer",ii);W(this,"Hooks",tn);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(let o of e)switch(n=n.concat(t.call(this,o)),o.type){case"table":{let r=o;for(let a of r.header)n=n.concat(this.walkTokens(a.tokens,t));for(let a of r.rows)for(let l of a)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{let r=o;n=n.concat(this.walkTokens(r.items,t));break}default:{let r=o;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[r.type]?this.defaults.extensions.childTokens[r.type].forEach(a=>{let l=r[a].flat(1/0);n=n.concat(this.walkTokens(l,t))}):r.tokens&&(n=n.concat(this.walkTokens(r.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...r){let a=s.renderer.apply(this,r);return a===!1&&(a=o.apply(this,r)),a}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){let s=this.defaults.renderer||new si(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let r=o,a=n.renderer[r],l=s[r];s[r]=(...c)=>{let f=a.apply(s,c);return f===!1&&(f=l.apply(s,c)),f||""}}i.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new ii(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let r=o,a=n.tokenizer[r],l=s[r];s[r]=(...c)=>{let f=a.apply(s,c);return f===!1&&(f=l.apply(s,c)),f}}i.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new tn;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let r=o,a=n.hooks[r],l=s[r];tn.passThroughHooks.has(o)?s[r]=c=>{if(this.defaults.async&&tn.passThroughHooksRespectAsync.has(o))return(async()=>{let u=await a.call(s,c);return l.call(s,u)})();let f=a.call(s,c);return l.call(s,f)}:s[r]=(...c)=>{if(this.defaults.async)return(async()=>{let u=await a.apply(s,c);return u===!1&&(u=await l.apply(s,c)),u})();let f=a.apply(s,c);return f===!1&&(f=l.apply(s,c)),f}}i.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;i.walkTokens=function(r){let a=[];return a.push(o.call(this,r)),s&&(a=a.concat(s.call(this,r))),a}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ee.lex(e,t??this.defaults)}parser(e,t){return Re.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let i={...n},s={...this.defaults,...i},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&i.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let r=s.hooks?await s.hooks.preprocess(t):t,a=await(s.hooks?await s.hooks.provideLexer():e?Ee.lex:Ee.lexInline)(r,s),l=s.hooks?await s.hooks.processAllTokens(a):a;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():e?Re.parse:Re.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let r=(s.hooks?s.hooks.provideLexer():e?Ee.lex:Ee.lexInline)(t,s);s.hooks&&(r=s.hooks.processAllTokens(r)),s.walkTokens&&this.walkTokens(r,s.walkTokens);let a=(s.hooks?s.hooks.provideParser():e?Re.parse:Re.parseInline)(r,s);return s.hooks&&(a=s.hooks.postprocess(a)),a}catch(r){return o(r)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let i="<p>An error occurred:</p><pre>"+Fe(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},wt=new Xh;function J(e,t){return wt.parse(e,t)}J.options=J.setOptions=function(e){return wt.setOptions(e),J.defaults=wt.defaults,Ql(J.defaults),J};J.getDefaults=go;J.defaults=kt;J.use=function(...e){return wt.use(...e),J.defaults=wt.defaults,Ql(J.defaults),J};J.walkTokens=function(e,t){return wt.walkTokens(e,t)};J.parseInline=wt.parseInline;J.Parser=Re;J.parser=Re.parse;J.Renderer=si;J.TextRenderer=xo;J.Lexer=Ee;J.lexer=Ee.lex;J.Tokenizer=ii;J.Hooks=tn;J.parse=J;J.options;J.setOptions;J.use;J.walkTokens;J.parseInline;Re.parse;Ee.lex;J.setOptions({gfm:!0,breaks:!0});const Zh=["a","b","blockquote","br","code","del","em","h1","h2","h3","h4","hr","i","li","ol","p","pre","strong","table","tbody","td","th","thead","tr","ul","img"],em=["class","href","rel","target","title","start","src","alt"],ea={ALLOWED_TAGS:Zh,ALLOWED_ATTR:em,ADD_DATA_URI_TAGS:["img"]};let ta=!1;const tm=14e4,nm=4e4,im=200,ns=5e4,pt=new Map;function sm(e){const t=pt.get(e);return t===void 0?null:(pt.delete(e),pt.set(e,t),t)}function na(e,t){if(pt.set(e,t),pt.size<=im)return;const n=pt.keys().next().value;n&&pt.delete(n)}function om(){ta||(ta=!0,_s.addHook("afterSanitizeAttributes",e=>{!(e instanceof HTMLAnchorElement)||!e.getAttribute("href")||(e.setAttribute("rel","noreferrer noopener"),e.setAttribute("target","_blank"))}))}function Rs(e){const t=e.trim();if(!t)return"";if(om(),t.length<=ns){const r=sm(t);if(r!==null)return r}const n=za(t,tm),i=n.truncated?`

… truncated (${n.total} chars, showing first ${n.text.length}).`:"";if(n.text.length>nm){const a=`<pre class="code-block">${lc(`${n.text}${i}`)}</pre>`,l=_s.sanitize(a,ea);return t.length<=ns&&na(t,l),l}const s=J.parse(`${n.text}${i}`,{renderer:ac}),o=_s.sanitize(s,ea);return t.length<=ns&&na(t,o),o}const ac=new J.Renderer;ac.html=({text:e})=>lc(e);function lc(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const rm=new RegExp("\\p{Script=Hebrew}|\\p{Script=Arabic}|\\p{Script=Syriac}|\\p{Script=Thaana}|\\p{Script=Nko}|\\p{Script=Samaritan}|\\p{Script=Mandaic}|\\p{Script=Adlam}|\\p{Script=Phoenician}|\\p{Script=Lydian}","u");function cc(e,t=/[\s\p{P}\p{S}]/u){if(!e)return"ltr";for(const n of e)if(!t.test(n))return rm.test(n)?"rtl":"ltr";return"ltr"}const am=1500,lm=2e3,dc="Copy as markdown",cm="Copied",dm="Copy failed";async function um(e){if(!e)return!1;try{return await navigator.clipboard.writeText(e),!0}catch{return!1}}function Un(e,t){e.title=t,e.setAttribute("aria-label",t)}function fm(e){const t=e.label??dc;return d`
    <button
      class="chat-copy-btn"
      type="button"
      title=${t}
      aria-label=${t}
      @click=${async n=>{const i=n.currentTarget;if(!i||i.dataset.copying==="1")return;i.dataset.copying="1",i.setAttribute("aria-busy","true"),i.disabled=!0;const s=await um(e.text());if(i.isConnected){if(delete i.dataset.copying,i.removeAttribute("aria-busy"),i.disabled=!1,!s){i.dataset.error="1",Un(i,dm),window.setTimeout(()=>{i.isConnected&&(delete i.dataset.error,Un(i,t))},lm);return}i.dataset.copied="1",Un(i,cm),window.setTimeout(()=>{i.isConnected&&(delete i.dataset.copied,Un(i,t))},am)}}}
    >
      <span class="chat-copy-btn__icon" aria-hidden="true">
        <span class="chat-copy-btn__icon-copy">${re.copy}</span>
        <span class="chat-copy-btn__icon-check">${re.check}</span>
      </span>
    </button>
  `}function pm(e){return fm({text:()=>e,label:dc})}function uc(e){const t=e;let n=typeof t.role=="string"?t.role:"unknown";const i=typeof t.toolCallId=="string"||typeof t.tool_call_id=="string",s=t.content,o=Array.isArray(s)?s:null,r=Array.isArray(o)&&o.some(u=>{const p=u,b=(typeof p.type=="string"?p.type:"").toLowerCase();return b==="toolresult"||b==="tool_result"}),a=typeof t.toolName=="string"||typeof t.tool_name=="string";(i||r||a)&&(n="toolResult");let l=[];typeof t.content=="string"?l=[{type:"text",text:t.content}]:Array.isArray(t.content)?l=t.content.map(u=>({type:u.type||"text",text:u.text,name:u.name,args:u.args||u.arguments})):typeof t.text=="string"&&(l=[{type:"text",text:t.text}]);const c=typeof t.timestamp=="number"?t.timestamp:Date.now(),f=typeof t.id=="string"?t.id:void 0;return{role:n,content:l,timestamp:c,id:f}}function ko(e){const t=e.toLowerCase();return e==="user"||e==="User"?e:e==="assistant"?"assistant":e==="system"?"system":t==="toolresult"||t==="tool_result"||t==="tool"||t==="function"?"tool":e}function fc(e){const t=e,n=typeof t.role=="string"?t.role.toLowerCase():"";return n==="toolresult"||n==="tool_result"}function gm(e){return(e??"").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())||"Tool"}function hm(e){const t=(e??"").trim();return t?t.replace(/\s+/g,"_").toLowerCase():""}function mm(e){return(e??"").trim().toLowerCase()||"use"}const vm={icon:"puzzle",detailKeys:["command","path","url","targetUrl","targetId","ref","element","node","nodeId","id","requestId","to","channelId","guildId","userId","name","query","pattern","messageId"]},ym={bash:{icon:"wrench",title:"Bash",detailKeys:["command"]},process:{icon:"wrench",title:"Process",detailKeys:["sessionId"]},read:{icon:"fileText",title:"Read",detailKeys:["path"]},write:{icon:"edit",title:"Write",detailKeys:["path"]},edit:{icon:"penLine",title:"Edit",detailKeys:["path"]},attach:{icon:"paperclip",title:"Attach",detailKeys:["path","url","fileName"]},browser:{icon:"globe",title:"Browser",actions:{status:{label:"status"},start:{label:"start"},stop:{label:"stop"},tabs:{label:"tabs"},open:{label:"open",detailKeys:["targetUrl"]},focus:{label:"focus",detailKeys:["targetId"]},close:{label:"close",detailKeys:["targetId"]},snapshot:{label:"snapshot",detailKeys:["targetUrl","targetId","ref","element","format"]},screenshot:{label:"screenshot",detailKeys:["targetUrl","targetId","ref","element"]},navigate:{label:"navigate",detailKeys:["targetUrl","targetId"]},console:{label:"console",detailKeys:["level","targetId"]},pdf:{label:"pdf",detailKeys:["targetId"]},upload:{label:"upload",detailKeys:["paths","ref","inputRef","element","targetId"]},dialog:{label:"dialog",detailKeys:["accept","promptText","targetId"]},act:{label:"act",detailKeys:["request.kind","request.ref","request.selector","request.text","request.value"]}}},canvas:{icon:"image",title:"Canvas",actions:{present:{label:"present",detailKeys:["target","node","nodeId"]},hide:{label:"hide",detailKeys:["node","nodeId"]},navigate:{label:"navigate",detailKeys:["url","node","nodeId"]},eval:{label:"eval",detailKeys:["javaScript","node","nodeId"]},snapshot:{label:"snapshot",detailKeys:["format","node","nodeId"]},a2ui_push:{label:"A2UI push",detailKeys:["jsonlPath","node","nodeId"]},a2ui_reset:{label:"A2UI reset",detailKeys:["node","nodeId"]}}},nodes:{icon:"smartphone",title:"Nodes",actions:{status:{label:"status"},describe:{label:"describe",detailKeys:["node","nodeId"]},pending:{label:"pending"},approve:{label:"approve",detailKeys:["requestId"]},reject:{label:"reject",detailKeys:["requestId"]},notify:{label:"notify",detailKeys:["node","nodeId","title","body"]},camera_snap:{label:"camera snap",detailKeys:["node","nodeId","facing","deviceId"]},camera_list:{label:"camera list",detailKeys:["node","nodeId"]},camera_clip:{label:"camera clip",detailKeys:["node","nodeId","facing","duration","durationMs"]},screen_record:{label:"screen record",detailKeys:["node","nodeId","duration","durationMs","fps","screenIndex"]}}},cron:{icon:"loader",title:"Cron",actions:{status:{label:"status"},list:{label:"list"},add:{label:"add",detailKeys:["job.name","job.id","job.schedule","job.cron"]},update:{label:"update",detailKeys:["id"]},remove:{label:"remove",detailKeys:["id"]},run:{label:"run",detailKeys:["id"]},runs:{label:"runs",detailKeys:["id"]},wake:{label:"wake",detailKeys:["text","mode"]}}},gateway:{icon:"plug",title:"Gateway",actions:{restart:{label:"restart",detailKeys:["reason","delayMs"]},"config.get":{label:"config get"},"config.schema":{label:"config schema"},"config.apply":{label:"config apply",detailKeys:["restartDelayMs"]},"update.run":{label:"update run",detailKeys:["restartDelayMs"]}}},whatsapp_login:{icon:"circle",title:"WhatsApp Login",actions:{start:{label:"start"},wait:{label:"wait"}}},discord:{icon:"messageSquare",title:"Discord",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sticker:{label:"sticker",detailKeys:["to","stickerIds"]},poll:{label:"poll",detailKeys:["question","to"]},permissions:{label:"permissions",detailKeys:["channelId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},threadCreate:{label:"thread create",detailKeys:["channelId","name"]},threadList:{label:"thread list",detailKeys:["guildId","channelId"]},threadReply:{label:"thread reply",detailKeys:["channelId","content"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},searchMessages:{label:"search",detailKeys:["guildId","content"]},memberInfo:{label:"member",detailKeys:["guildId","userId"]},roleInfo:{label:"roles",detailKeys:["guildId"]},emojiList:{label:"emoji list",detailKeys:["guildId"]},roleAdd:{label:"role add",detailKeys:["guildId","userId","roleId"]},roleRemove:{label:"role remove",detailKeys:["guildId","userId","roleId"]},channelInfo:{label:"channel",detailKeys:["channelId"]},channelList:{label:"channels",detailKeys:["guildId"]},voiceStatus:{label:"voice",detailKeys:["guildId","userId"]},eventList:{label:"events",detailKeys:["guildId"]},eventCreate:{label:"event create",detailKeys:["guildId","name"]},timeout:{label:"timeout",detailKeys:["guildId","userId"]},kick:{label:"kick",detailKeys:["guildId","userId"]},ban:{label:"ban",detailKeys:["guildId","userId"]}}},slack:{icon:"messageSquare",title:"Slack",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},memberInfo:{label:"member",detailKeys:["userId"]},emojiList:{label:"emoji list"}}}},bm={fallback:vm,tools:ym},pc=bm,ia=pc.fallback??{icon:"puzzle"},wm=pc.tools??{};function $m(e){if(!e)return e;const t=[{re:/^\/Users\/[^/]+(\/|$)/,replacement:"~$1"},{re:/^\/home\/[^/]+(\/|$)/,replacement:"~$1"},{re:/^C:\\Users\\[^\\]+(\\|$)/i,replacement:"~$1"}];for(const n of t)if(n.re.test(e))return e.replace(n.re,n.replacement);return e}function xm(e){const t=hm(e.name),n=t.toLowerCase(),i=wm[n],s=(i==null?void 0:i.icon)??ia.icon??"puzzle",o=(i==null?void 0:i.title)??gm(t),r=(i==null?void 0:i.label)??o,a=e.args&&typeof e.args=="object"?e.args.action:void 0,l=typeof a=="string"?a.trim():void 0,c=n==="web_search"?"search":n==="web_fetch"?"fetch":n.replace(/_/g," ").replace(/\./g," "),f=mm(l??c);let u;n==="exec"&&(u=void 0),!u&&n==="read"&&(u=void 0),!u&&(n==="write"||n==="edit"||n==="attach")&&(u=void 0),!u&&n==="web_search"&&(u=void 0),!u&&n==="web_fetch"&&(u=void 0);const p=(i==null?void 0:i.detailKeys)??ia.detailKeys??[];return!u&&p.length>0&&(u=void 0),!u&&e.meta&&(u=e.meta),u&&(u=$m(u)),{name:t,icon:s,title:o,label:r,verb:f,detail:u}}function km(e){if(e.detail){if(e.detail.includes(" · ")){const t=e.detail.split(" · ").map(n=>n.trim()).filter(n=>n.length>0).join(", ");return t?`with ${t}`:void 0}return e.detail}}const Sm=80,Am=2,sa=100;function _m(e){const t=e.trim();if(t.startsWith("{")||t.startsWith("["))try{const n=JSON.parse(t);return"```json\n"+JSON.stringify(n,null,2)+"\n```"}catch{}return e}function Cm(e){const t=e.split(`
`),n=t.slice(0,Am),i=n.join(`
`);return i.length>sa?i.slice(0,sa)+"…":n.length<t.length?i+"…":i}function Tm(e){const t=e,n=Em(t.content),i=[];for(const s of n){const o=(typeof s.type=="string"?s.type:"").toLowerCase();(["toolcall","tool_call","tooluse","tool_use"].includes(o)||typeof s.name=="string"&&s.arguments!=null)&&i.push({kind:"call",name:s.name??"tool",args:Rm(s.arguments??s.args)})}for(const s of n){const o=(typeof s.type=="string"?s.type:"").toLowerCase();if(o!=="toolresult"&&o!=="tool_result")continue;const r=Lm(s),a=typeof s.name=="string"?s.name:"tool";i.push({kind:"result",name:a,text:r})}if(fc(e)&&!i.some(s=>s.kind==="result")){const s=typeof t.toolName=="string"&&t.toolName||typeof t.tool_name=="string"&&t.tool_name||"tool",o=yl(e)??void 0;i.push({kind:"result",name:s,text:o})}return i}function oa(e,t){var u,p;const n=xm({name:e.name,args:e.args}),i=km(n),s=!!((u=e.text)!=null&&u.trim()),o=!!t,r=o?()=>{if(s){t(_m(e.text));return}const b=`## ${n.label}

${i?`**Command:** \`${i}\`

`:""}*No output — tool completed successfully.*`;t(b)}:void 0,a=s&&(((p=e.text)==null?void 0:p.length)??0)<=Sm,l=s&&!a,c=s&&a,f=!s;return d`
    <div
      class="chat-tool-card ${o?"chat-tool-card--clickable":""}"
      @click=${r}
      role=${o?"button":$}
      tabindex=${o?"0":$}
      @keydown=${o?b=>{b.key!=="Enter"&&b.key!==" "||(b.preventDefault(),r==null||r())}:$}
    >
      <div class="chat-tool-card__header">
        <div class="chat-tool-card__title">
          <span class="chat-tool-card__icon">${re[n.icon]}</span>
          <span>${n.label}</span>
        </div>
        ${o?d`<span class="chat-tool-card__action">${s?"View":""} ${re.check}</span>`:$}
        ${f&&!o?d`<span class="chat-tool-card__status">${re.check}</span>`:$}
      </div>
      ${i?d`<div class="chat-tool-card__detail">${i}</div>`:$}
      ${f?d`
              <div class="chat-tool-card__status-text muted">Completed</div>
            `:$}
      ${l?d`<div class="chat-tool-card__preview mono">${Cm(e.text)}</div>`:$}
      ${c?d`<div class="chat-tool-card__inline mono">${e.text}</div>`:$}
    </div>
  `}function Em(e){return Array.isArray(e)?e.filter(Boolean):[]}function Rm(e){if(typeof e!="string")return e;const t=e.trim();if(!t||!t.startsWith("{")&&!t.startsWith("["))return e;try{return JSON.parse(t)}catch{return e}}function Lm(e){if(typeof e.text=="string")return e.text;if(typeof e.content=="string")return e.content}function Im(e){const n=e.content,i=[];if(Array.isArray(n))for(const s of n){if(typeof s!="object"||s===null)continue;const o=s;if(o.type==="image"){const r=o.source;if((r==null?void 0:r.type)==="base64"&&typeof r.data=="string"){const a=r.data,l=r.media_type||"image/png",c=a.startsWith("data:")?a:`data:${l};base64,${a}`;i.push({url:c})}else typeof o.url=="string"&&i.push({url:o.url})}else if(o.type==="image_url"){const r=o.image_url;typeof(r==null?void 0:r.url)=="string"&&i.push({url:r.url})}}return i}function Mm(e){return d`
    <div class="chat-group assistant">
      ${So("assistant",e)}
      <div class="chat-group-messages">
        <div class="chat-bubble chat-reading-indicator" aria-hidden="true">
          <span class="chat-reading-indicator__dots">
            <span></span><span></span><span></span>
          </span>
        </div>
      </div>
    </div>
  `}function Pm(e,t,n,i){const s=new Date(t).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}),o=(i==null?void 0:i.name)??"Assistant";return d`
    <div class="chat-group assistant">
      ${So("assistant",i)}
      <div class="chat-group-messages">
        ${gc({role:"assistant",content:[{type:"text",text:e}],timestamp:t},{isStreaming:!0,showReasoning:!1},n)}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${o}</span>
          <span class="chat-group-timestamp">${s}</span>
        </div>
      </div>
    </div>
  `}function Dm(e,t){const n=ko(e.role),i=t.assistantName??"Assistant",s=n==="user"?"You":n==="assistant"?i:n,o=n==="user"?"user":n==="assistant"?"assistant":"other",r=new Date(e.timestamp).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return d`
    <div class="chat-group ${o}">
      ${So(e.role,{name:i,avatar:t.assistantAvatar??null})}
      <div class="chat-group-messages">
        ${e.messages.map((a,l)=>gc(a.message,{isStreaming:e.isStreaming&&l===e.messages.length-1,showReasoning:t.showReasoning},t.onOpenSidebar))}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${s}</span>
          <span class="chat-group-timestamp">${r}</span>
        </div>
      </div>
    </div>
  `}function So(e,t){var a,l;const n=ko(e),i=((a=t==null?void 0:t.name)==null?void 0:a.trim())||"Assistant",s=((l=t==null?void 0:t.avatar)==null?void 0:l.trim())||"",o=n==="user"?"U":n==="assistant"?i.charAt(0).toUpperCase()||"A":n==="tool"?"⚙":"?",r=n==="user"?"user":n==="assistant"?"assistant":n==="tool"?"tool":"other";return s&&n==="assistant"?Fm(s)?d`<img
        class="chat-avatar ${r}"
        src="${s}"
        alt="${i}"
      />`:d`<div class="chat-avatar ${r}">${s}</div>`:d`<div class="chat-avatar ${r}">${o}</div>`}function Fm(e){return/^https?:\/\//i.test(e)||/^data:image\//i.test(e)||e.startsWith("/")}function Nm(e){return e.length===0?$:d`
    <div class="chat-message-images">
      ${e.map(t=>d`
          <img
            src=${t.url}
            alt=${t.alt??"Attached image"}
            class="chat-message-image"
            @click=${()=>window.open(t.url,"_blank")}
          />
        `)}
    </div>
  `}function gc(e,t,n){const i=e,s=typeof i.role=="string"?i.role:"unknown",o=fc(e)||s.toLowerCase()==="toolresult"||s.toLowerCase()==="tool_result"||typeof i.toolCallId=="string"||typeof i.tool_call_id=="string",r=Tm(e),a=r.length>0,l=Im(e),c=l.length>0,f=yl(e),u=t.showReasoning&&s==="assistant"?Tf(e):null,p=f!=null&&f.trim()?f:null,b=u?Rf(u):null,x=p,k=s==="assistant"&&!!(x!=null&&x.trim()),S=["chat-bubble",k?"has-copy":"",t.isStreaming?"streaming":"","fade-in"].filter(Boolean).join(" ");return!x&&a&&o?d`${r.map(E=>oa(E,n))}`:!x&&!a&&!c?$:d`
    <div class="${S}">
      ${k?pm(x):$}
      ${Nm(l)}
      ${b?d`<div class="chat-thinking">${xs(Rs(b))}</div>`:$}
      ${x?d`<div class="chat-text" dir="${cc(x)}">${xs(Rs(x))}</div>`:$}
      ${r.map(E=>oa(E,n))}
    </div>
  `}function Om(e){return d`
    <div class="sidebar-panel">
      <div class="sidebar-header">
        <div class="sidebar-title">Tool Output</div>
        <button @click=${e.onClose} class="btn" title="Close sidebar">
          ${re.x}
        </button>
      </div>
      <div class="sidebar-content">
        ${e.error?d`
              <div class="callout danger">${e.error}</div>
              <button @click=${e.onViewRawText} class="btn" style="margin-top: 12px;">
                View Raw Text
              </button>
            `:e.content?d`<div class="sidebar-markdown">${xs(Rs(e.content))}</div>`:d`
                  <div class="muted">No content available</div>
                `}
      </div>
    </div>
  `}var Bm=Object.defineProperty,Um=Object.getOwnPropertyDescriptor,$i=(e,t,n,i)=>{for(var s=i>1?void 0:i?Um(t,n):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(s=(i?r(t,n,s):r(s))||s);return i&&s&&Bm(t,n,s),s};let Bt=class extends Dt{constructor(){super(...arguments),this.splitRatio=.6,this.minRatio=.4,this.maxRatio=.7,this.isDragging=!1,this.startX=0,this.startRatio=0,this.handleMouseDown=e=>{this.isDragging=!0,this.startX=e.clientX,this.startRatio=this.splitRatio,this.classList.add("dragging"),document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),e.preventDefault()},this.handleMouseMove=e=>{if(!this.isDragging)return;const t=this.parentElement;if(!t)return;const n=t.getBoundingClientRect().width,s=(e.clientX-this.startX)/n;let o=this.startRatio+s;o=Math.max(this.minRatio,Math.min(this.maxRatio,o)),this.dispatchEvent(new CustomEvent("resize",{detail:{splitRatio:o},bubbles:!0,composed:!0}))},this.handleMouseUp=()=>{this.isDragging=!1,this.classList.remove("dragging"),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}}render(){return $}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}};Bt.styles=Cc`
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
  `;$i([ai({type:Number})],Bt.prototype,"splitRatio",2);$i([ai({type:Number})],Bt.prototype,"minRatio",2);$i([ai({type:Number})],Bt.prototype,"maxRatio",2);Bt=$i([Ca("resizable-divider")],Bt);const zm=5e3,Hm=/\.(xlsx|xls|xlsm|pdf)$/i;function Km(e){for(let t=0;t<e.length;t++)if(Hm.test(e[t].name))return e[t];return null}function ra(e){e.style.height="auto",e.style.height=`${e.scrollHeight}px`}function jm(e){return e?e.active?d`
      <div class="compaction-indicator compaction-indicator--active" role="status" aria-live="polite">
        ${re.loader} Compacting context...
      </div>
    `:e.completedAt&&Date.now()-e.completedAt<zm?d`
        <div class="compaction-indicator compaction-indicator--complete" role="status" aria-live="polite">
          ${re.check} Context compacted
        </div>
      `:$:$}function qm(){return`att-${Date.now()}-${Math.random().toString(36).slice(2,9)}`}function Wm(e,t){var s;const n=(s=e.clipboardData)==null?void 0:s.items;if(!n||!t.onAttachmentsChange)return;const i=[];for(let o=0;o<n.length;o++){const r=n[o];r.type.startsWith("image/")&&i.push(r)}if(i.length!==0){e.preventDefault();for(const o of i){const r=o.getAsFile();if(!r)continue;const a=new FileReader;a.addEventListener("load",()=>{var u;const l=a.result,c={id:qm(),dataUrl:l,mimeType:r.type},f=t.attachments??[];(u=t.onAttachmentsChange)==null||u.call(t,[...f,c])}),a.readAsDataURL(r)}}}function Gm(e){const t=e.attachments??[];return t.length===0?$:d`
    <div class="chat-attachments">
      ${t.map(n=>d`
          <div class="chat-attachment">
            <img
              src=${n.dataUrl}
              alt="Attachment preview"
              class="chat-attachment__img"
            />
            <button
              class="chat-attachment__remove"
              type="button"
              aria-label="Remove attachment"
              @click=${()=>{var s;const i=(e.attachments??[]).filter(o=>o.id!==n.id);(s=e.onAttachmentsChange)==null||s.call(e,i)}}
            >
              ${re.x}
            </button>
          </div>
        `)}
    </div>
  `}function Vm(e){const t=e.uploadedFile,n=e.onFileSelect,i=e.onClearUploadedFile;return t!=null&&t.file_name?d`
      <div class="chat-uploaded-file">
        <span class="chat-uploaded-file__name" title=${t.file_path}>${t.file_name}</span>
        <button
          type="button"
          class="btn chat-uploaded-file__clear"
          aria-label="Remove uploaded file"
          @click=${i}
        >
          ${re.x}
        </button>
      </div>
    `:!n||!e.connected?$:d`
    <div class="chat-uploaded-file-row">
      <input
        type="file"
        accept=".xlsx,.xls,.xlsm,.pdf"
        aria-label="Upload Excel or PDF"
        class="chat-uploaded-file-input"
        @change=${async s=>{var a;const o=s.target,r=(a=o.files)==null?void 0:a[0];r&&(await n(r),o.value="")}}
      />
      <button
        type="button"
        class="btn chat-upload-file-btn"
        @click=${s=>{var o,r;return(r=(o=s.currentTarget.parentElement)==null?void 0:o.querySelector("input[type=file]"))==null?void 0:r.click()}}
      >
        上传 Excel/PDF
      </button>
    </div>
  `}function Qm(e){var E,P,F,L;const t=e.connected,n=e.sending||e.stream!==null,i=!!(e.canAbort&&e.onAbort),s=(P=(E=e.sessions)==null?void 0:E.sessions)==null?void 0:P.find(A=>A.key===e.sessionKey),o=(s==null?void 0:s.reasoningLevel)??"off",r=e.showThinking&&o!=="off",a={name:e.assistantName,avatar:e.assistantAvatar??e.assistantAvatarUrl??null},l=(((F=e.attachments)==null?void 0:F.length)??0)>0;(L=e.uploadedFile)!=null&&L.file_name;const c=e.connected?l?"Add a message or paste more images...":"Message (↩ to send, Shift+↩ for line breaks；可粘贴图片，或上传/拖拽 Excel/PDF)":"Connect to the gateway to start chatting…",f=e.splitRatio??.6,u=!!(e.sidebarOpen&&e.onCloseSidebar),p=d`
    <div
      class="chat-thread"
      role="log"
      aria-live="polite"
      @scroll=${e.onChatScroll}
    >
      ${e.loading?d`
              <div class="muted">Loading chat…</div>
            `:$}
      ${Dl(Ym(e),A=>A.key,A=>A.kind==="divider"?d`
              <div class="chat-divider" role="separator" data-ts=${String(A.timestamp)}>
                <span class="chat-divider__line"></span>
                <span class="chat-divider__label">${A.label}</span>
                <span class="chat-divider__line"></span>
              </div>
            `:A.kind==="reading-indicator"?Mm(a):A.kind==="stream"?Pm(A.text,A.startedAt,e.onOpenSidebar,a):A.kind==="group"?Dm(A,{onOpenSidebar:e.onOpenSidebar,showReasoning:r,assistantName:e.assistantName,assistantAvatar:a.avatar}):$)}
    </div>
  `,b=A=>{var h;A.preventDefault(),A.stopPropagation(),A.dataTransfer&&(A.dataTransfer.dropEffect="copy"),(h=e.onComposeDragOver)==null||h.call(e)},x=A=>{var h;A.preventDefault(),A.stopPropagation(),A.dataTransfer&&(A.dataTransfer.dropEffect="copy"),(h=e.onComposeDragOver)==null||h.call(e)},k=A=>{var C;const h=A.currentTarget,_=A.relatedTarget;_!=null&&(h.contains(_)||(C=e.onComposeDragLeave)==null||C.call(e))},S=A=>{var _,C,R;A.preventDefault(),A.stopPropagation(),(_=e.onComposeDragLeave)==null||_.call(e);const h=(R=(C=A.dataTransfer)==null?void 0:C.files)!=null&&R.length?Km(A.dataTransfer.files):null;h&&e.onComposeDrop&&e.onComposeDrop(h)};return d`
    <section
      class="card chat ${e.composeDragOver?"chat--drag-over":""}"
      @dragenter=${b}
      @dragover=${x}
      @dragleave=${k}
      @drop=${S}
    >
      ${e.disabledReason?d`<div class="callout">${e.disabledReason}</div>`:$}

      ${e.error?d`<div class="callout danger">${e.error}</div>`:$}

      ${e.focusMode?d`
            <button
              class="chat-focus-exit"
              type="button"
              @click=${e.onToggleFocusMode}
              aria-label="Exit focus mode"
              title="Exit focus mode"
            >
              ${re.x}
            </button>
          `:$}

      <div
        class="chat-split-container ${u?"chat-split-container--open":""}"
      >
        <div
          class="chat-main"
          style="flex: ${u?`0 0 ${f*100}%`:"1 1 100%"}"
        >
          ${p}
        </div>

        ${u?d`
              <resizable-divider
                .splitRatio=${f}
                @resize=${A=>{var h;return(h=e.onSplitRatioChange)==null?void 0:h.call(e,A.detail.splitRatio)}}
              ></resizable-divider>
              <div class="chat-sidebar">
                ${Om({content:e.sidebarContent??null,error:e.sidebarError??null,onClose:e.onCloseSidebar,onViewRawText:()=>{!e.sidebarContent||!e.onOpenSidebar||e.onOpenSidebar(`\`\`\`
${e.sidebarContent}
\`\`\``)}})}
              </div>
            `:$}
      </div>

      ${e.queue.length?d`
            <div class="chat-queue" role="status" aria-live="polite">
              <div class="chat-queue__title">Queued (${e.queue.length})</div>
              <div class="chat-queue__list">
                ${e.queue.map(A=>{var h;return d`
                    <div class="chat-queue__item">
                      <div class="chat-queue__text">
                        ${A.text||((h=A.attachments)!=null&&h.length?`Image (${A.attachments.length})`:"")}
                      </div>
                      <button
                        class="btn chat-queue__remove"
                        type="button"
                        aria-label="Remove queued message"
                        @click=${()=>e.onQueueRemove(A.id)}
                      >
                        ${re.x}
                      </button>
                    </div>
                  `})}
              </div>
            </div>
          `:$}

      ${jm(e.compactionStatus)}

      ${e.showNewMessages?d`
            <button
              class="btn chat-new-messages"
              type="button"
              @click=${e.onScrollToBottom}
            >
              New messages ${re.arrowDown}
            </button>
          `:$}

      <div class="chat-compose ${e.composeDragOver?"chat-compose--drag-over":""}">
        ${e.composeDragOver?d`<div class="chat-compose__drop-hint">松开以上传 Excel/PDF</div>`:$}
        ${Gm(e)}
        ${Vm(e)}
        <div class="chat-compose__row">
          <label class="field chat-compose__field">
            <span>Message</span>
            <textarea
              ${Hg(A=>A&&ra(A))}
              .value=${e.draft}
              dir=${cc(e.draft)}
              ?disabled=${!e.connected}
              @keydown=${A=>{A.key==="Enter"&&(A.isComposing||A.keyCode===229||A.shiftKey||e.connected&&(A.preventDefault(),t&&e.onSend()))}}
              @input=${A=>{const h=A.target;ra(h),e.onDraftChange(h.value)}}
              @paste=${A=>Wm(A,e)}
              placeholder=${c}
            ></textarea>
          </label>
          <div class="chat-compose__actions">
            <button
              class="btn"
              ?disabled=${!e.connected||!i&&e.sending}
              @click=${i?e.onAbort:e.onNewSession}
            >
              ${i?"Stop":"New session"}
            </button>
            <button
              class="btn primary"
              ?disabled=${!e.connected}
              @click=${e.onSend}
            >
              ${n?"Queue":"Send"}<kbd class="btn-kbd">↵</kbd>
            </button>
          </div>
        </div>
      </div>
    </section>
  `}const aa=200;function Jm(e){const t=[];let n=null;for(const i of e){if(i.kind!=="message"){n&&(t.push(n),n=null),t.push(i);continue}const s=uc(i.message),o=ko(s.role),r=s.timestamp||Date.now();!n||n.role!==o?(n&&t.push(n),n={kind:"group",key:`group:${o}:${i.key}`,role:o,messages:[{message:i.message,key:i.key}],timestamp:r,isStreaming:!1}):n.messages.push({message:i.message,key:i.key})}return n&&t.push(n),t}function Ym(e){const t=[],n=Array.isArray(e.messages)?e.messages:[],i=Array.isArray(e.toolMessages)?e.toolMessages:[],s=Math.max(0,n.length-aa);s>0&&t.push({kind:"message",key:"chat:history:notice",message:{role:"system",content:`Showing last ${aa} messages (${s} hidden).`,timestamp:Date.now()}});for(let o=s;o<n.length;o++){const r=n[o],a=uc(r),c=r.__openclaw;if(c&&c.kind==="compaction"){t.push({kind:"divider",key:typeof c.id=="string"?`divider:compaction:${c.id}`:`divider:compaction:${a.timestamp}:${o}`,label:"Compaction",timestamp:a.timestamp??Date.now()});continue}!e.showThinking&&a.role.toLowerCase()==="toolresult"||t.push({kind:"message",key:la(r,o),message:r})}if(e.showThinking)for(let o=0;o<i.length;o++)t.push({kind:"message",key:la(i[o],o+n.length),message:i[o]});if(e.stream!==null){const o=`stream:${e.sessionKey}:${e.streamStartedAt??"live"}`;e.stream.trim().length>0?t.push({kind:"stream",key:o,text:e.stream,startedAt:e.streamStartedAt??Date.now()}):t.push({kind:"reading-indicator",key:o})}return Jm(t)}function la(e,t){const n=e,i=typeof n.toolCallId=="string"?n.toolCallId:"";if(i)return`tool:${i}`;const s=typeof n.id=="string"?n.id:"";if(s)return`msg:${s}`;const o=typeof n.messageId=="string"?n.messageId:"";if(o)return`msg:${o}`;const r=typeof n.timestamp=="number"?n.timestamp:null,a=typeof n.role=="string"?n.role:"unknown";return r!=null?`msg:${a}:${r}:${t}`:`msg:${a}:${t}`}const Xm=new Set(["title","description","default","nullable"]);function Zm(e){return Object.keys(e??{}).filter(n=>!Xm.has(n)).length===0}function ev(e){if(e===void 0)return"";try{return JSON.stringify(e,null,2)??""}catch{return""}}const bn={chevronDown:d`
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
  `,plus:d`
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
  `,minus:d`
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
  `,trash:d`
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
  `,edit:d`
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
  `};function $t(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:r,onPatch:a}=e,l=e.showLabel??!0,c=ke(t),f=Se(i,s),u=(f==null?void 0:f.label)??t.title??Ve(String(i.at(-1))),p=(f==null?void 0:f.help)??t.description,b=Ns(i);if(o.has(b))return d`<div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${u}</div>
      <div class="cfg-field__error">Unsupported schema node. Use Raw mode.</div>
    </div>`;if(t.anyOf||t.oneOf){const k=(t.anyOf??t.oneOf??[]).filter(A=>!(A.type==="null"||Array.isArray(A.type)&&A.type.includes("null")));if(k.length===1)return $t({...e,schema:k[0]});const S=A=>{if(A.const!==void 0)return A.const;if(A.enum&&A.enum.length===1)return A.enum[0]},E=k.map(S),P=E.every(A=>A!==void 0);if(P&&E.length>0&&E.length<=5){const A=n??t.default;return d`
        <div class="cfg-field">
          ${l?d`<label class="cfg-field__label">${u}</label>`:$}
          ${p?d`<div class="cfg-field__help">${p}</div>`:$}
          <div class="cfg-segmented">
            ${E.map(h=>d`
              <button
                type="button"
                class="cfg-segmented__btn ${h===A||String(h)===String(A)?"active":""}"
                ?disabled=${r}
                @click=${()=>a(i,h)}
              >
                ${String(h)}
              </button>
            `)}
          </div>
        </div>
      `}if(P&&E.length>5)return da({...e,options:E,value:n??t.default});const F=new Set(k.map(A=>ke(A)).filter(Boolean)),L=new Set([...F].map(A=>A==="integer"?"number":A));if([...L].every(A=>["string","number","boolean"].includes(A))){const A=L.has("string"),h=L.has("number");if(L.has("boolean")&&L.size===1)return $t({...e,schema:{...t,type:"boolean",anyOf:void 0,oneOf:void 0}});if(A||h)return ca({...e,inputType:h&&!A?"number":"text"})}}if(t.enum){const x=t.enum;if(x.length<=5){const k=n??t.default;return d`
        <div class="cfg-field">
          ${l?d`<label class="cfg-field__label">${u}</label>`:$}
          ${p?d`<div class="cfg-field__help">${p}</div>`:$}
          <div class="cfg-segmented">
            ${x.map(S=>d`
              <button
                type="button"
                class="cfg-segmented__btn ${S===k||String(S)===String(k)?"active":""}"
                ?disabled=${r}
                @click=${()=>a(i,S)}
              >
                ${String(S)}
              </button>
            `)}
          </div>
        </div>
      `}return da({...e,options:x,value:n??t.default})}if(c==="object")return nv(e);if(c==="array")return iv(e);if(c==="boolean"){const x=typeof n=="boolean"?n:typeof t.default=="boolean"?t.default:!1;return d`
      <label class="cfg-toggle-row ${r?"disabled":""}">
        <div class="cfg-toggle-row__content">
          <span class="cfg-toggle-row__label">${u}</span>
          ${p?d`<span class="cfg-toggle-row__help">${p}</span>`:$}
        </div>
        <div class="cfg-toggle">
          <input
            type="checkbox"
            .checked=${x}
            ?disabled=${r}
            @change=${k=>a(i,k.target.checked)}
          />
          <span class="cfg-toggle__track"></span>
        </div>
      </label>
    `}return c==="number"||c==="integer"?tv(e):c==="string"?ca({...e,inputType:"text"}):d`
    <div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${u}</div>
      <div class="cfg-field__error">Unsupported type: ${c}. Use Raw mode.</div>
    </div>
  `}function ca(e){const{schema:t,value:n,path:i,hints:s,disabled:o,onPatch:r,inputType:a}=e,l=e.showLabel??!0,c=Se(i,s),f=(c==null?void 0:c.label)??t.title??Ve(String(i.at(-1))),u=(c==null?void 0:c.help)??t.description,p=((c==null?void 0:c.sensitive)??!1)&&!/^\$\{[^}]*\}$/.test(String(n??"").trim()),b=(c==null?void 0:c.placeholder)??(p?"••••":t.default!==void 0?`Default: ${String(t.default)}`:""),x=n??"";return d`
    <div class="cfg-field">
      ${l?d`<label class="cfg-field__label">${f}</label>`:$}
      ${u?d`<div class="cfg-field__help">${u}</div>`:$}
      <div class="cfg-input-wrap">
        <input
          type=${p?"password":a}
          class="cfg-input"
          placeholder=${b}
          .value=${x==null?"":String(x)}
          ?disabled=${o}
          @input=${k=>{const S=k.target.value;if(a==="number"){if(S.trim()===""){r(i,void 0);return}const E=Number(S);r(i,Number.isNaN(E)?S:E);return}r(i,S)}}
          @change=${k=>{if(a==="number")return;const S=k.target.value;r(i,S.trim())}}
        />
        ${t.default!==void 0?d`
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
  `}function tv(e){const{schema:t,value:n,path:i,hints:s,disabled:o,onPatch:r}=e,a=e.showLabel??!0,l=Se(i,s),c=(l==null?void 0:l.label)??t.title??Ve(String(i.at(-1))),f=(l==null?void 0:l.help)??t.description,u=n??t.default??"",p=typeof u=="number"?u:0;return d`
    <div class="cfg-field">
      ${a?d`<label class="cfg-field__label">${c}</label>`:$}
      ${f?d`<div class="cfg-field__help">${f}</div>`:$}
      <div class="cfg-number">
        <button
          type="button"
          class="cfg-number__btn"
          ?disabled=${o}
          @click=${()=>r(i,p-1)}
        >−</button>
        <input
          type="number"
          class="cfg-number__input"
          .value=${u==null?"":String(u)}
          ?disabled=${o}
          @input=${b=>{const x=b.target.value,k=x===""?void 0:Number(x);r(i,k)}}
        />
        <button
          type="button"
          class="cfg-number__btn"
          ?disabled=${o}
          @click=${()=>r(i,p+1)}
        >+</button>
      </div>
    </div>
  `}function da(e){const{schema:t,value:n,path:i,hints:s,disabled:o,options:r,onPatch:a}=e,l=e.showLabel??!0,c=Se(i,s),f=(c==null?void 0:c.label)??t.title??Ve(String(i.at(-1))),u=(c==null?void 0:c.help)??t.description,p=n??t.default,b=r.findIndex(k=>k===p||String(k)===String(p)),x="__unset__";return d`
    <div class="cfg-field">
      ${l?d`<label class="cfg-field__label">${f}</label>`:$}
      ${u?d`<div class="cfg-field__help">${u}</div>`:$}
      <select
        class="cfg-select"
        ?disabled=${o}
        .value=${b>=0?String(b):x}
        @change=${k=>{const S=k.target.value;a(i,S===x?void 0:r[Number(S)])}}
      >
        <option value=${x}>Select...</option>
        ${r.map((k,S)=>d`
          <option value=${String(S)}>${String(k)}</option>
        `)}
      </select>
    </div>
  `}function nv(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:r,onPatch:a}=e,l=Se(i,s),c=(l==null?void 0:l.label)??t.title??Ve(String(i.at(-1))),f=(l==null?void 0:l.help)??t.description,u=n??t.default,p=u&&typeof u=="object"&&!Array.isArray(u)?u:{},b=t.properties??{},k=Object.entries(b).toSorted((L,A)=>{var C,R;const h=((C=Se([...i,L[0]],s))==null?void 0:C.order)??0,_=((R=Se([...i,A[0]],s))==null?void 0:R.order)??0;return h!==_?h-_:L[0].localeCompare(A[0])}),S=new Set(Object.keys(b)),E=t.additionalProperties,P=!!E&&typeof E=="object",F=d`
    ${k.map(([L,A])=>$t({schema:A,value:p[L],path:[...i,L],hints:s,unsupported:o,disabled:r,onPatch:a}))}
    ${P?sv({schema:E,value:p,path:i,hints:s,unsupported:o,disabled:r,reservedKeys:S,onPatch:a}):$}
  `;return i.length===1?d`
      <div class="cfg-fields">
        ${F}
      </div>
    `:d`
    <details class="cfg-object" open>
      <summary class="cfg-object__header">
        <span class="cfg-object__title">${c}</span>
        <span class="cfg-object__chevron">${bn.chevronDown}</span>
      </summary>
      ${f?d`<div class="cfg-object__help">${f}</div>`:$}
      <div class="cfg-object__content">
        ${F}
      </div>
    </details>
  `}function iv(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:r,onPatch:a}=e,l=e.showLabel??!0,c=Se(i,s),f=(c==null?void 0:c.label)??t.title??Ve(String(i.at(-1))),u=(c==null?void 0:c.help)??t.description,p=Array.isArray(t.items)?t.items[0]:t.items;if(!p)return d`
      <div class="cfg-field cfg-field--error">
        <div class="cfg-field__label">${f}</div>
        <div class="cfg-field__error">Unsupported array schema. Use Raw mode.</div>
      </div>
    `;const b=Array.isArray(n)?n:Array.isArray(t.default)?t.default:[];return d`
    <div class="cfg-array">
      <div class="cfg-array__header">
        ${l?d`<span class="cfg-array__label">${f}</span>`:$}
        <span class="cfg-array__count">${b.length} item${b.length!==1?"s":""}</span>
        <button
          type="button"
          class="cfg-array__add"
          ?disabled=${r}
          @click=${()=>{const x=[...b,Ta(p)];a(i,x)}}
        >
          <span class="cfg-array__add-icon">${bn.plus}</span>
          Add
        </button>
      </div>
      ${u?d`<div class="cfg-array__help">${u}</div>`:$}

      ${b.length===0?d`
              <div class="cfg-array__empty">No items yet. Click "Add" to create one.</div>
            `:d`
        <div class="cfg-array__items">
          ${b.map((x,k)=>d`
            <div class="cfg-array__item">
              <div class="cfg-array__item-header">
                <span class="cfg-array__item-index">#${k+1}</span>
                <button
                  type="button"
                  class="cfg-array__item-remove"
                  title="Remove item"
                  ?disabled=${r}
                  @click=${()=>{const S=[...b];S.splice(k,1),a(i,S)}}
                >
                  ${bn.trash}
                </button>
              </div>
              <div class="cfg-array__item-content">
                ${$t({schema:p,value:x,path:[...i,k],hints:s,unsupported:o,disabled:r,showLabel:!1,onPatch:a})}
              </div>
            </div>
          `)}
        </div>
      `}
    </div>
  `}function sv(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:r,reservedKeys:a,onPatch:l}=e,c=Zm(t),f=Object.entries(n??{}).filter(([u])=>!a.has(u));return d`
    <div class="cfg-map">
      <div class="cfg-map__header">
        <span class="cfg-map__label">Custom entries</span>
        <button
          type="button"
          class="cfg-map__add"
          ?disabled=${r}
          @click=${()=>{const u={...n};let p=1,b=`custom-${p}`;for(;b in u;)p+=1,b=`custom-${p}`;u[b]=c?{}:Ta(t),l(i,u)}}
        >
          <span class="cfg-map__add-icon">${bn.plus}</span>
          Add Entry
        </button>
      </div>

      ${f.length===0?d`
              <div class="cfg-map__empty">No custom entries.</div>
            `:d`
        <div class="cfg-map__items">
          ${f.map(([u,p])=>{const b=[...i,u],x=ev(p);return d`
              <div class="cfg-map__item">
                <div class="cfg-map__item-key">
                  <input
                    type="text"
                    class="cfg-input cfg-input--sm"
                    placeholder="Key"
                    .value=${u}
                    ?disabled=${r}
                    @change=${k=>{const S=k.target.value.trim();if(!S||S===u)return;const E={...n};S in E||(E[S]=E[u],delete E[u],l(i,E))}}
                  />
                </div>
                <div class="cfg-map__item-value">
                  ${c?d`
                        <textarea
                          class="cfg-textarea cfg-textarea--sm"
                          placeholder="JSON value"
                          rows="2"
                          .value=${x}
                          ?disabled=${r}
                          @change=${k=>{const S=k.target,E=S.value.trim();if(!E){l(b,void 0);return}try{l(b,JSON.parse(E))}catch{S.value=x}}}
                        ></textarea>
                      `:$t({schema:t,value:p,path:b,hints:s,unsupported:o,disabled:r,showLabel:!1,onPatch:l})}
                </div>
                <button
                  type="button"
                  class="cfg-map__item-remove"
                  title="Remove entry"
                  ?disabled=${r}
                  @click=${()=>{const k={...n};delete k[u],l(i,k)}}
                >
                  ${bn.trash}
                </button>
              </div>
            `})}
        </div>
      `}
    </div>
  `}const ua={env:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="3"></circle>
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
      ></path>
    </svg>
  `,update:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  `,agents:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path
        d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"
      ></path>
      <circle cx="8" cy="14" r="1"></circle>
      <circle cx="16" cy="14" r="1"></circle>
    </svg>
  `,auth:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  `,channels:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  `,messages:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  `,commands:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
  `,hooks:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
  `,skills:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      ></polygon>
    </svg>
  `,tools:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      ></path>
    </svg>
  `,gateway:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      ></path>
    </svg>
  `,wizard:d`
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
  `,meta:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
    </svg>
  `,logging:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  `,browser:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="4"></circle>
      <line x1="21.17" y1="8" x2="12" y2="8"></line>
      <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
      <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
    </svg>
  `,ui:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>
  `,models:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path
        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
      ></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  `,bindings:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
      <line x1="6" y1="6" x2="6.01" y2="6"></line>
      <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
  `,broadcast:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path>
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path>
      <circle cx="12" cy="12" r="2"></circle>
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path>
      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path>
    </svg>
  `,audio:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M9 18V5l12-2v13"></path>
      <circle cx="6" cy="18" r="3"></circle>
      <circle cx="18" cy="16" r="3"></circle>
    </svg>
  `,session:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  `,cron:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  `,web:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      ></path>
    </svg>
  `,discovery:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  `,canvasHost:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  `,talk:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line x1="12" y1="19" x2="12" y2="23"></line>
      <line x1="8" y1="23" x2="16" y2="23"></line>
    </svg>
  `,plugins:d`
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
  `,default:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
    </svg>
  `},Ao={env:{label:"Environment Variables",description:"Environment variables passed to the gateway process"},update:{label:"Updates",description:"Auto-update settings and release channel"},agents:{label:"Agents",description:"Agent configurations, models, and identities"},auth:{label:"Authentication",description:"API keys and authentication profiles"},channels:{label:"Channels",description:"Messaging channels (Telegram, Discord, Slack, etc.)"},messages:{label:"Messages",description:"Message handling and routing settings"},commands:{label:"Commands",description:"Custom slash commands"},hooks:{label:"Hooks",description:"Webhooks and event hooks"},skills:{label:"Skills",description:"Skill packs and capabilities"},tools:{label:"Tools",description:"Tool configurations (browser, search, etc.)"},gateway:{label:"Gateway",description:"Gateway server settings (port, auth, binding)"},wizard:{label:"Setup Wizard",description:"Setup wizard state and history"},meta:{label:"Metadata",description:"Gateway metadata and version information"},logging:{label:"Logging",description:"Log levels and output configuration"},browser:{label:"Browser",description:"Browser automation settings"},ui:{label:"UI",description:"User interface preferences"},models:{label:"Models",description:"AI model configurations and providers"},bindings:{label:"Bindings",description:"Key bindings and shortcuts"},broadcast:{label:"Broadcast",description:"Broadcast and notification settings"},audio:{label:"Audio",description:"Audio input/output settings"},session:{label:"Session",description:"Session management and persistence"},cron:{label:"Cron",description:"Scheduled tasks and automation"},web:{label:"Web",description:"Web server and API settings"},discovery:{label:"Discovery",description:"Service discovery and networking"},canvasHost:{label:"Canvas Host",description:"Canvas rendering and display"},talk:{label:"Talk",description:"Voice and speech settings"},plugins:{label:"Plugins",description:"Plugin management and extensions"}};function fa(e){return ua[e]??ua.default}function ov(e,t,n){if(!n)return!0;const i=n.toLowerCase(),s=Ao[e];return e.toLowerCase().includes(i)||s&&(s.label.toLowerCase().includes(i)||s.description.toLowerCase().includes(i))?!0:nn(t,i)}function nn(e,t){var i,s,o;if((i=e.title)!=null&&i.toLowerCase().includes(t)||(s=e.description)!=null&&s.toLowerCase().includes(t)||(o=e.enum)!=null&&o.some(r=>String(r).toLowerCase().includes(t)))return!0;if(e.properties){for(const[r,a]of Object.entries(e.properties))if(r.toLowerCase().includes(t)||nn(a,t))return!0}if(e.items){const r=Array.isArray(e.items)?e.items:[e.items];for(const a of r)if(a&&nn(a,t))return!0}if(e.additionalProperties&&typeof e.additionalProperties=="object"&&nn(e.additionalProperties,t))return!0;const n=e.anyOf??e.oneOf??e.allOf;if(n){for(const r of n)if(r&&nn(r,t))return!0}return!1}function rv(e){var u;if(!e.schema)return d`
      <div class="muted">Schema unavailable.</div>
    `;const t=e.schema,n=e.value??{};if(ke(t)!=="object"||!t.properties)return d`
      <div class="callout danger">Unsupported schema. Use Raw.</div>
    `;const i=new Set(e.unsupportedPaths??[]),s=t.properties,o=e.searchQuery??"",r=e.activeSection,a=e.activeSubsection??null,c=Object.entries(s).toSorted((p,b)=>{var S,E;const x=((S=Se([p[0]],e.uiHints))==null?void 0:S.order)??50,k=((E=Se([b[0]],e.uiHints))==null?void 0:E.order)??50;return x!==k?x-k:p[0].localeCompare(b[0])}).filter(([p,b])=>!(r&&p!==r||o&&!ov(p,b,o)));let f=null;if(r&&a&&c.length===1){const p=(u=c[0])==null?void 0:u[1];p&&ke(p)==="object"&&p.properties&&p.properties[a]&&(f={sectionKey:r,subsectionKey:a,schema:p.properties[a]})}return c.length===0?d`
      <div class="config-empty">
        <div class="config-empty__icon">${re.search}</div>
        <div class="config-empty__text">
          ${o?`No settings match "${o}"`:"No settings in this section"}
        </div>
      </div>
    `:d`
    <div class="config-form config-form--modern">
      ${f?(()=>{const{sectionKey:p,subsectionKey:b,schema:x}=f,k=Se([p,b],e.uiHints),S=(k==null?void 0:k.label)??x.title??Ve(b),E=(k==null?void 0:k.help)??x.description??"",P=n[p],F=P&&typeof P=="object"?P[b]:void 0,L=`config-section-${p}-${b}`;return d`
              <section class="config-section-card" id=${L}>
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${fa(p)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${S}</h3>
                    ${E?d`<p class="config-section-card__desc">${E}</p>`:$}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${$t({schema:x,value:F,path:[p,b],hints:e.uiHints,unsupported:i,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})():c.map(([p,b])=>{const x=Ao[p]??{label:p.charAt(0).toUpperCase()+p.slice(1),description:b.description??""};return d`
              <section class="config-section-card" id="config-section-${p}">
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${fa(p)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${x.label}</h3>
                    ${x.description?d`<p class="config-section-card__desc">${x.description}</p>`:$}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${$t({schema:b,value:n[p],path:[p],hints:e.uiHints,unsupported:i,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})}
    </div>
  `}const av=new Set(["title","description","default","nullable"]);function lv(e){return Object.keys(e??{}).filter(n=>!av.has(n)).length===0}function hc(e){const t=e.filter(s=>s!=null),n=t.length!==e.length,i=[];for(const s of t)i.some(o=>Object.is(o,s))||i.push(s);return{enumValues:i,nullable:n}}function cv(e){return!e||typeof e!="object"?{schema:null,unsupportedPaths:["<root>"]}:dn(e,[])}function dn(e,t){const n=new Set,i={...e},s=Ns(t)||"<root>";if(e.anyOf||e.oneOf||e.allOf){const a=dv(e,t);return a||{schema:e,unsupportedPaths:[s]}}const o=Array.isArray(e.type)&&e.type.includes("null"),r=ke(e)??(e.properties||e.additionalProperties?"object":void 0);if(i.type=r??e.type,i.nullable=o||e.nullable,i.enum){const{enumValues:a,nullable:l}=hc(i.enum);i.enum=a,l&&(i.nullable=!0),a.length===0&&n.add(s)}if(r==="object"){const a=e.properties??{},l={};for(const[c,f]of Object.entries(a)){const u=dn(f,[...t,c]);u.schema&&(l[c]=u.schema);for(const p of u.unsupportedPaths)n.add(p)}if(i.properties=l,e.additionalProperties===!0)n.add(s);else if(e.additionalProperties===!1)i.additionalProperties=!1;else if(e.additionalProperties&&typeof e.additionalProperties=="object"&&!lv(e.additionalProperties)){const c=dn(e.additionalProperties,[...t,"*"]);i.additionalProperties=c.schema??e.additionalProperties,c.unsupportedPaths.length>0&&n.add(s)}}else if(r==="array"){const a=Array.isArray(e.items)?e.items[0]:e.items;if(!a)n.add(s);else{const l=dn(a,[...t,"*"]);i.items=l.schema??a,l.unsupportedPaths.length>0&&n.add(s)}}else r!=="string"&&r!=="number"&&r!=="integer"&&r!=="boolean"&&!i.enum&&n.add(s);return{schema:i,unsupportedPaths:Array.from(n)}}function dv(e,t){if(e.allOf)return null;const n=e.anyOf??e.oneOf;if(!n)return null;const i=[],s=[];let o=!1;for(const a of n){if(!a||typeof a!="object")return null;if(Array.isArray(a.enum)){const{enumValues:l,nullable:c}=hc(a.enum);i.push(...l),c&&(o=!0);continue}if("const"in a){if(a.const==null){o=!0;continue}i.push(a.const);continue}if(ke(a)==="null"){o=!0;continue}s.push(a)}if(i.length>0&&s.length===0){const a=[];for(const l of i)a.some(c=>Object.is(c,l))||a.push(l);return{schema:{...e,enum:a,nullable:o,anyOf:void 0,oneOf:void 0,allOf:void 0},unsupportedPaths:[]}}if(s.length===1){const a=dn(s[0],t);return a.schema&&(a.schema.nullable=o||a.schema.nullable),a}const r=new Set(["string","number","integer","boolean"]);return s.length>0&&i.length===0&&s.every(a=>a.type&&r.has(String(a.type)))?{schema:{...e,nullable:o},unsupportedPaths:[]}:null}const Ls={all:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
  `,env:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="3"></circle>
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
      ></path>
    </svg>
  `,update:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  `,agents:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path
        d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"
      ></path>
      <circle cx="8" cy="14" r="1"></circle>
      <circle cx="16" cy="14" r="1"></circle>
    </svg>
  `,auth:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  `,channels:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  `,messages:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  `,commands:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
  `,hooks:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
  `,skills:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      ></polygon>
    </svg>
  `,tools:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      ></path>
    </svg>
  `,gateway:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      ></path>
    </svg>
  `,wizard:d`
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
  `,meta:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
    </svg>
  `,logging:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  `,browser:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="4"></circle>
      <line x1="21.17" y1="8" x2="12" y2="8"></line>
      <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
      <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
    </svg>
  `,ui:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>
  `,models:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path
        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
      ></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  `,bindings:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
      <line x1="6" y1="6" x2="6.01" y2="6"></line>
      <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
  `,broadcast:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path>
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path>
      <circle cx="12" cy="12" r="2"></circle>
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path>
      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path>
    </svg>
  `,audio:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M9 18V5l12-2v13"></path>
      <circle cx="6" cy="18" r="3"></circle>
      <circle cx="18" cy="16" r="3"></circle>
    </svg>
  `,session:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  `,cron:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  `,web:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      ></path>
    </svg>
  `,discovery:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  `,canvasHost:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  `,talk:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line x1="12" y1="19" x2="12" y2="23"></line>
      <line x1="8" y1="23" x2="16" y2="23"></line>
    </svg>
  `,plugins:d`
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
  `,default:d`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
    </svg>
  `},pa=[{key:"env",label:"Environment"},{key:"update",label:"Updates"},{key:"agents",label:"Agents"},{key:"auth",label:"Authentication"},{key:"channels",label:"Channels"},{key:"messages",label:"Messages"},{key:"commands",label:"Commands"},{key:"hooks",label:"Hooks"},{key:"skills",label:"Skills"},{key:"tools",label:"Tools"},{key:"gateway",label:"Gateway"},{key:"wizard",label:"Setup Wizard"}],ga="__all__";function ha(e){return Ls[e]??Ls.default}function uv(e,t){const n=Ao[e];return n||{label:(t==null?void 0:t.title)??Ve(e),description:(t==null?void 0:t.description)??""}}function fv(e){const{key:t,schema:n,uiHints:i}=e;if(!n||ke(n)!=="object"||!n.properties)return[];const s=Object.entries(n.properties).map(([o,r])=>{const a=Se([t,o],i),l=(a==null?void 0:a.label)??r.title??Ve(o),c=(a==null?void 0:a.help)??r.description??"",f=(a==null?void 0:a.order)??50;return{key:o,label:l,description:c,order:f}});return s.sort((o,r)=>o.order!==r.order?o.order-r.order:o.key.localeCompare(r.key)),s}function pv(e,t){if(!e||!t)return[];const n=[];function i(s,o,r){if(s===o)return;if(typeof s!=typeof o){n.push({path:r,from:s,to:o});return}if(typeof s!="object"||s===null||o===null){s!==o&&n.push({path:r,from:s,to:o});return}if(Array.isArray(s)&&Array.isArray(o)){JSON.stringify(s)!==JSON.stringify(o)&&n.push({path:r,from:s,to:o});return}const a=s,l=o,c=new Set([...Object.keys(a),...Object.keys(l)]);for(const f of c)i(a[f],l[f],r?`${r}.${f}`:f)}return i(e,t,""),n}function ma(e,t=40){let n;try{n=JSON.stringify(e)??String(e)}catch{n=String(e)}return n.length<=t?n:n.slice(0,t-3)+"..."}function gv(e){var h,_,C;const t=e.valid==null?"unknown":e.valid?"valid":"invalid",n=cv(e.schema),i=n.schema?n.unsupportedPaths.length>0:!1,s=((h=n.schema)==null?void 0:h.properties)??{},o=pa.filter(R=>R.key in s),r=new Set(pa.map(R=>R.key)),a=Object.keys(s).filter(R=>!r.has(R)).map(R=>({key:R,label:R.charAt(0).toUpperCase()+R.slice(1)})),l=[...o,...a],c=e.activeSection&&n.schema&&ke(n.schema)==="object"?(_=n.schema.properties)==null?void 0:_[e.activeSection]:void 0,f=e.activeSection?uv(e.activeSection,c):null,u=e.activeSection?fv({key:e.activeSection,schema:c,uiHints:e.uiHints}):[],p=e.formMode==="form"&&!!e.activeSection&&u.length>0,b=e.activeSubsection===ga,x=e.searchQuery||b?null:e.activeSubsection??((C=u[0])==null?void 0:C.key)??null,k=e.formMode==="form"?pv(e.originalValue,e.formValue):[],S=e.formMode==="raw"&&e.raw!==e.originalRaw,E=e.formMode==="form"?k.length>0:S,P=!!e.formValue&&!e.loading&&!!n.schema,F=e.connected&&!e.saving&&E&&(e.formMode==="raw"?!0:P),L=e.connected&&!e.applying&&!e.updating&&E&&(e.formMode==="raw"?!0:P),A=e.connected&&!e.applying&&!e.updating;return d`
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
          ${e.searchQuery?d`
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
            <span class="config-nav__icon">${Ls.all}</span>
            <span class="config-nav__label">All Settings</span>
          </button>
          ${l.map(R=>d`
              <button
                class="config-nav__item ${e.activeSection===R.key?"active":""}"
                @click=${()=>e.onSectionChange(R.key)}
              >
                <span class="config-nav__icon"
                  >${ha(R.key)}</span
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
            ${E?d`
                  <span class="config-changes-badge"
                    >${e.formMode==="raw"?"Unsaved changes":`${k.length} unsaved change${k.length!==1?"s":""}`}</span
                  >
                `:d`
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
              ?disabled=${!F}
              @click=${e.onSave}
            >
              ${e.saving?"Saving…":"Save"}
            </button>
            <button
              class="btn btn--sm"
              ?disabled=${!L}
              @click=${e.onApply}
            >
              ${e.applying?"Applying…":"Apply"}
            </button>
            <button
              class="btn btn--sm"
              ?disabled=${!A}
              @click=${e.onUpdate}
            >
              ${e.updating?"Updating…":"Update"}
            </button>
          </div>
        </div>

        <!-- Diff panel (form mode only - raw mode doesn't have granular diff) -->
        ${E&&e.formMode==="form"?d`
              <details class="config-diff">
                <summary class="config-diff__summary">
                  <span
                    >View ${k.length} pending
                    change${k.length!==1?"s":""}</span
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
                  ${k.map(R=>d`
                      <div class="config-diff__item">
                        <div class="config-diff__path">${R.path}</div>
                        <div class="config-diff__values">
                          <span class="config-diff__from"
                            >${ma(R.from)}</span
                          >
                          <span class="config-diff__arrow">→</span>
                          <span class="config-diff__to"
                            >${ma(R.to)}</span
                          >
                        </div>
                      </div>
                    `)}
                </div>
              </details>
            `:$}
        ${f&&e.formMode==="form"?d`
              <div class="config-section-hero">
                <div class="config-section-hero__icon">
                  ${ha(e.activeSection??"")}
                </div>
                <div class="config-section-hero__text">
                  <div class="config-section-hero__title">
                    ${f.label}
                  </div>
                  ${f.description?d`<div class="config-section-hero__desc">
                        ${f.description}
                      </div>`:$}
                </div>
              </div>
            `:$}
        ${p?d`
              <div class="config-subnav">
                <button
                  class="config-subnav__item ${x===null?"active":""}"
                  @click=${()=>e.onSubsectionChange(ga)}
                >
                  All
                </button>
                ${u.map(R=>d`
                    <button
                      class="config-subnav__item ${x===R.key?"active":""}"
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
          ${e.formMode==="form"?d`
                ${e.schemaLoading?d`
                        <div class="config-loading">
                          <div class="config-loading__spinner"></div>
                          <span>Loading schema…</span>
                        </div>
                      `:rv({schema:n.schema,uiHints:e.uiHints,value:e.formValue,disabled:e.loading||!e.formValue,unsupportedPaths:n.unsupportedPaths,onPatch:e.onFormPatch,searchQuery:e.searchQuery,activeSection:e.activeSection,activeSubsection:x})}
                ${i?d`
                        <div class="callout danger" style="margin-top: 12px">
                          Form view can't safely edit some fields. Use Raw to avoid losing config entries.
                        </div>
                      `:$}
              `:d`
                <label class="field config-raw-field">
                  <span>Raw JSON5</span>
                  <textarea
                    .value=${e.raw}
                    @input=${R=>e.onRawChange(R.target.value)}
                  ></textarea>
                </label>
              `}
        </div>

        ${e.issues.length>0?d`<div class="callout danger" style="margin-top: 12px;">
              <pre class="code-block">
${JSON.stringify(e.issues,null,2)}</pre
              >
            </div>`:$}
      </main>
    </div>
  `}function hv(e){if(!e)return"-";try{return new Date(e).toLocaleString()}catch{return e??"-"}}function mv(e,t,n,i){const s=i==="asc"?1:-1;if(n==="created_at"){const o=e.created_at?new Date(e.created_at).getTime():0,r=t.created_at?new Date(t.created_at).getTime():0;return(o-r)*s}return n==="name"?(e.name??"").localeCompare(t.name??"")*s:(e.draft_no??"").localeCompare(t.draft_no??"")*s}function vv(e){const{loading:t,error:n,drafts:i,detail:s,detailId:o,confirmBusy:r,confirmResult:a,filterQuery:l,sortBy:c,sortDir:f,page:u,pageSize:p,onRefresh:b,onSelectDraft:x,onConfirm:k,onClearDetail:S,onFilterQueryChange:E,onSortByChange:P,onSortDirChange:F,onPageChange:L,onPageSizeChange:A}=e,h=l.trim().toLowerCase(),C=[...h?i.filter(B=>`${B.draft_no??""}
${B.name??""}
${B.source??""}`.toLowerCase().includes(h)):i].sort((B,ee)=>mv(B,ee,c,f)),R=C.length,z=Math.max(1,p||10),U=Math.max(1,Math.ceil(R/z)),H=Math.min(Math.max(1,u),U),K=(H-1)*z,Y=C.slice(K,K+z);return d`
    <section class="grid grid-cols-2" aria-label=${g("tabs.cron")}>
      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${g("fulfill.title")}</div>
        <div class="card-sub">${g("fulfill.subtitle")}</div>
        <div style="margin-top: 12px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <button class="btn" ?disabled=${t} @click=${b} aria-label=${g("fulfill.refreshList")}>
            ${g(t?"fulfill.loading":"fulfill.refreshList")}
          </button>
          <input
            type="search"
            .value=${l}
            placeholder=${g("fulfill.filterPlaceholder")}
            @input=${B=>E(B.target.value)}
            aria-label=${g("fulfill.filterPlaceholder")}
            style="min-width: 220px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border);"
          />
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${g("fulfill.sortBy")}</span>
            <select
              .value=${c}
              @change=${B=>P(B.target.value)}
              aria-label=${g("fulfill.sortBy")}
            >
              <option value="created_at">${g("fulfill.sortCreatedAt")}</option>
              <option value="draft_no">${g("fulfill.sortDraftNo")}</option>
              <option value="name">${g("fulfill.sortName")}</option>
            </select>
          </label>
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${g("fulfill.sortDir")}</span>
            <select
              .value=${f}
              @change=${B=>F(B.target.value)}
              aria-label=${g("fulfill.sortDir")}
            >
              <option value="desc">${g("fulfill.sortDesc")}</option>
              <option value="asc">${g("fulfill.sortAsc")}</option>
            </select>
          </label>
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${g("fulfill.pageSize")}</span>
            <select
              .value=${String(z)}
              @change=${B=>A(Number(B.target.value)||10)}
              aria-label=${g("fulfill.pageSize")}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </label>
        </div>
      </div>

      ${n?d`
            <div class="card" style="grid-column: 1 / -1; border-color: var(--danger, #c62828);" role="alert" aria-live="assertive">
              <div class="card-title" style="color: var(--danger, #c62828);">${g("common.errorTitle")}</div>
              <div class="card-sub">${n}</div>
              <div style="margin-top: 10px;">
                <button class="btn" @click=${b}>${g("common.retry")}</button>
              </div>
            </div>
          `:$}

      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${g("fulfill.listTitle")}</div>
        <div class="card-sub">${g("fulfill.listSubtitle")}</div>

        ${t&&i.length===0?d`<p class="muted" style="margin-top: 12px;">${g("fulfill.loading")}</p>`:R===0?d`<p class="muted" style="margin-top: 12px;">${g("fulfill.noDrafts")}</p>`:d`
                <div class="muted" style="font-size: 12px; margin-top: 10px;">
                  ${g("fulfill.total",{total:String(R)})}
                </div>
                <div style="overflow-x: auto; margin-top: 8px;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <thead>
                      <tr style="background: var(--bg-secondary, #eee);">
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("fulfill.colDraftNo")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("fulfill.colName")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("fulfill.colSource")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("fulfill.colCreatedAt")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("fulfill.colActions")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${Y.map(B=>d`
                          <tr style=${o===B.id?"background: var(--bg-secondary, #f5f5f5);":""}>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${B.draft_no}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${B.name}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${B.source??"-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${hv(B.created_at)}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border); display: flex; gap: 6px; flex-wrap: wrap;">
                              <button
                                class="btn btn-sm"
                                @click=${()=>x(B.id)}
                                aria-label=${g("fulfill.viewDetail")}
                              >
                                ${g("fulfill.viewDetail")}
                              </button>
                              <button
                                class="btn"
                                style="font-size: 12px; padding: 4px 8px;"
                                ?disabled=${r}
                                @click=${()=>k(B.id)}
                                aria-label=${g("fulfill.confirmAction")}
                              >
                                ${r&&o===B.id?g("fulfill.confirming"):g("fulfill.confirmAction")}
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
                    ?disabled=${H<=1}
                    @click=${()=>L(H-1)}
                    aria-label=${g("common.prev")}
                  >
                    ${g("common.prev")}
                  </button>
                  <span class="muted" style="font-size: 12px;">${g("fulfill.page",{current:String(H),total:String(U)})}</span>
                  <button
                    class="btn btn-sm"
                    ?disabled=${H>=U}
                    @click=${()=>L(H+1)}
                    aria-label=${g("common.next")}
                  >
                    ${g("common.next")}
                  </button>
                </div>
              `}
      </div>

      ${s?d`
            <div class="card" style="grid-column: 1 / -1;" tabindex="-1">
              <div class="card-title">${g("fulfill.detailTitle",{draftNo:s.draft_no})}</div>
              <div class="card-sub">${s.name}</div>
              <div style="margin-top: 8px; display: flex; gap: 8px;">
                <button class="btn btn-sm" @click=${S}>${g("fulfill.closeDetail")}</button>
                <button
                  class="btn"
                  style="background: var(--accent); color: var(--bg);"
                  ?disabled=${r}
                  @click=${()=>k(s.id)}
                >
                  ${g(r?"fulfill.confirming":"fulfill.confirmAction")}
                </button>
              </div>
              <div style="overflow-x: auto; margin-top: 12px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                  <thead>
                    <tr style="background: var(--bg-secondary, #eee);">
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">#</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("fulfill.lineProduct")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("fulfill.lineSpec")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("fulfill.lineQty")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("fulfill.lineCode")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("fulfill.lineQuoteName")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("fulfill.linePrice")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("fulfill.lineAmount")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("fulfill.lineAvailable")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("fulfill.lineShortfall")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("fulfill.lineIsShortage")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${(s.lines??[]).map((B,ee)=>d`
                        <tr>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${ee+1}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${B.product_name??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${B.specification??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${B.qty??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${B.code??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${B.quote_name??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${B.unit_price??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${B.amount??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${B.available_qty??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${B.shortfall??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${B.is_shortage?g("common.yes"):g("common.no")}</td>
                        </tr>
                      `)}
                  </tbody>
                </table>
              </div>
            </div>
          `:$}

      ${a?d`
            <div class="card" style="grid-column: 1 / -1; border-color: var(--success, #2e7d32);" role="status" aria-live="polite">
              <div class="card-title" style="color: var(--success, #2e7d32);">${g("fulfill.confirmTitle")}</div>
              ${a.order_id?d`<p style="margin: 0 0 4px 0; font-weight: 600;">${g("fulfill.orderId")}: ${a.order_id}</p>`:$}
              <div class="card-sub">${a.message??""}</div>
            </div>
          `:$}
    </section>
  `}function yv(e,t,n,i){const s=i==="asc"?1:-1;if(n==="uploaded_at"){const o=e.uploaded_at?new Date(e.uploaded_at).getTime():0,r=t.uploaded_at?new Date(t.uploaded_at).getTime():0;return(o-r)*s}return n==="shortfall"?(Number(e.shortfall??0)-Number(t.shortfall??0))*s:n==="count"?(Number(e.count??0)-Number(t.count??0))*s:(e.product_name??"").localeCompare(t.product_name??"")*s}function bv(e){const{loading:t,error:n,suggestions:i,selectedKeys:s,approvedKeys:o,approveBusy:r,approveResult:a,filterQuery:l,sortBy:c,sortDir:f,page:u,pageSize:p,onRefresh:b,onToggleSelect:x,onApprove:k,onApproveBatch:S,onFilterQueryChange:E,onSortByChange:P,onSortDirChange:F,onPageChange:L,onPageSizeChange:A}=e,h=i.filter(O=>!o.includes(Te(O))),_=l.trim().toLowerCase(),C=_?h.filter(O=>`${O.product_name??""}
${O.specification??""}
${O.code??""}
${O.product_key??""}`.toLowerCase().includes(_)):h,R=[...C].sort((O,ae)=>yv(O,ae,c,f)),z=R.length,U=Math.max(1,p||10),H=Math.max(1,Math.ceil(z/U)),K=Math.min(Math.max(1,u),H),Y=(K-1)*U,B=R.slice(Y,Y+U),ee=C.filter(O=>s.includes(Te(O))).length,ge=C.length>0&&C.every(O=>s.includes(Te(O)));return d`
    <section class="grid grid-cols-2" aria-label=${g("tabs.sessions")}>
      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${g("procurement.title")}</div>
        <div class="card-sub">${g("procurement.subtitle")}</div>
        <div style="margin-top: 12px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <button class="btn" ?disabled=${t} @click=${b} aria-label=${g("procurement.refreshList")}>
            ${g(t?"procurement.loading":"procurement.refreshList")}
          </button>
          <input
            type="search"
            .value=${l}
            placeholder=${g("procurement.filterPlaceholder")}
            @input=${O=>E(O.target.value)}
            aria-label=${g("procurement.filterPlaceholder")}
            style="min-width: 240px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border);"
          />
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${g("procurement.sortBy")}</span>
            <select
              .value=${c}
              @change=${O=>P(O.target.value)}
              aria-label=${g("procurement.sortBy")}
            >
              <option value="uploaded_at">${g("procurement.sortUploadedAt")}</option>
              <option value="shortfall">${g("procurement.sortShortfall")}</option>
              <option value="count">${g("procurement.sortCount")}</option>
              <option value="product_name">${g("procurement.sortProduct")}</option>
            </select>
          </label>
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${g("procurement.sortDir")}</span>
            <select
              .value=${f}
              @change=${O=>F(O.target.value)}
              aria-label=${g("procurement.sortDir")}
            >
              <option value="desc">${g("procurement.sortDesc")}</option>
              <option value="asc">${g("procurement.sortAsc")}</option>
            </select>
          </label>
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${g("procurement.pageSize")}</span>
            <select
              .value=${String(U)}
              @change=${O=>A(Number(O.target.value)||10)}
              aria-label=${g("procurement.pageSize")}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </label>
        </div>
      </div>

      ${n?d`
            <div class="card" style="grid-column: 1 / -1; border-color: var(--danger, #c62828);" role="alert" aria-live="assertive">
              <div class="card-title" style="color: var(--danger, #c62828);">${g("common.errorTitle")}</div>
              <div class="card-sub">${n}</div>
              <div style="margin-top: 10px;">
                <button class="btn" @click=${b}>${g("common.retry")}</button>
              </div>
            </div>
          `:$}

      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${g("procurement.listTitle")}</div>
        <div class="card-sub">${g("procurement.listHint")}</div>

        ${ee>0?d`
              <div style="margin-top: 12px;">
                <button
                  class="btn"
                  style="font-size: 12px;"
                  ?disabled=${r}
                  @click=${S}
                  aria-label=${g("procurement.batchApprove")}
                >
                  ${r?g("procurement.approving"):`${g("procurement.batchApprove")} (${ee})`}
                </button>
              </div>
            `:$}

        ${t&&i.length===0?d`<p class="muted" style="margin-top: 12px;">${g("procurement.loading")}</p>`:C.length===0?d`<p class="muted" style="margin-top: 12px;">${i.length===0?g("procurement.noSuggestions"):g("procurement.noPending")}</p>`:d`
                <div class="muted" style="font-size: 12px; margin-top: 10px;">
                  ${g("procurement.total",{total:String(z)})}
                </div>
                <div style="overflow-x: auto; margin-top: 8px;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <thead>
                      <tr style="background: var(--bg-secondary, #eee);">
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border); width: 36px;">
                          <input
                            type="checkbox"
                            .checked=${ge}
                            .indeterminate=${ee>0&&ee<C.length}
                            aria-label=${g("procurement.selectAll")}
                            @change=${()=>{ge?C.forEach(O=>x(Te(O))):C.forEach(O=>{const ae=Te(O);s.includes(ae)||x(ae)})}}
                          />
                        </th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("procurement.colProduct")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("procurement.colSpec")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("procurement.colShortfall")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("procurement.colCode")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("procurement.colCount")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("procurement.colActions")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${B.map(O=>d`
                          <tr>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">
                              <input
                                type="checkbox"
                                .checked=${s.includes(Te(O))}
                                aria-label=${g("procurement.selectItem")}
                                @change=${()=>x(Te(O))}
                              />
                            </td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${O.product_name??"-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${O.specification??"-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${O.shortfall??0}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${O.code??"-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${O.count??0}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">
                              <button
                                class="btn"
                                style="font-size: 12px; padding: 4px 8px;"
                                ?disabled=${r}
                                @click=${()=>k(O)}
                                aria-label=${g("procurement.approveSingle")}
                              >
                                ${g(r?"procurement.approving":"procurement.approveSingle")}
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
                    ?disabled=${K<=1}
                    @click=${()=>L(K-1)}
                    aria-label=${g("common.prev")}
                  >
                    ${g("common.prev")}
                  </button>
                  <span class="muted" style="font-size: 12px;">${g("procurement.page",{current:String(K),total:String(H)})}</span>
                  <button
                    class="btn btn-sm"
                    ?disabled=${K>=H}
                    @click=${()=>L(K+1)}
                    aria-label=${g("common.next")}
                  >
                    ${g("common.next")}
                  </button>
                </div>
              `}
      </div>

      ${a?d`
            <div class="card" style="grid-column: 1 / -1;" role="status" aria-live="polite">
              <div class="card-sub">${a.approved_count!=null?`${g("procurement.approvedCount",{count:String(a.approved_count)})} `:""}${a.message??""}</div>
            </div>
          `:$}
    </section>
  `}function wv(e){const t=e.status&&typeof e.status=="object"?e.status.securityAudit:null,n=(t==null?void 0:t.summary)??null,i=(n==null?void 0:n.critical)??0,s=(n==null?void 0:n.warn)??0,o=(n==null?void 0:n.info)??0,r=i>0?"danger":s>0?"warn":"success",a=i>0?`${i} critical`:s>0?`${s} warnings`:"No critical issues";return d`
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
            ${n?d`<div class="callout ${r}" style="margin-top: 8px;">
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
        ${e.callError?d`<div class="callout danger" style="margin-top: 12px;">
              ${e.callError}
            </div>`:$}
        ${e.callResult?d`<pre class="code-block" style="margin-top: 12px;">${e.callResult}</pre>`:$}
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
      ${e.eventLog.length===0?d`
              <div class="muted" style="margin-top: 12px">No events yet.</div>
            `:d`
            <div class="list" style="margin-top: 12px;">
              ${e.eventLog.map(l=>d`
                  <div class="list-item">
                    <div class="list-main">
                      <div class="list-title">${l.event}</div>
                      <div class="list-sub">${new Date(l.ts).toLocaleTimeString()}</div>
                    </div>
                    <div class="list-meta">
                      <pre class="code-block">${ig(l.payload)}</pre>
                    </div>
                  </div>
                `)}
            </div>
          `}
    </section>
  `}function $v(e){const t=Math.max(0,e),n=Math.floor(t/1e3);if(n<60)return`${n}s`;const i=Math.floor(n/60);return i<60?`${i}m`:`${Math.floor(i/60)}h`}function ct(e,t){return t?d`<div class="exec-approval-meta-row"><span>${e}</span><span>${t}</span></div>`:$}function xv(e){const t=e.execApprovalQueue[0];if(!t)return $;const n=t.request,i=t.expiresAtMs-Date.now(),s=i>0?`expires in ${$v(i)}`:"expired",o=e.execApprovalQueue.length;return d`
    <div class="exec-approval-overlay" role="dialog" aria-live="polite">
      <div class="exec-approval-card">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">Exec approval needed</div>
            <div class="exec-approval-sub">${s}</div>
          </div>
          ${o>1?d`<div class="exec-approval-queue">${o} pending</div>`:$}
        </div>
        <div class="exec-approval-command mono">${n.command}</div>
        <div class="exec-approval-meta">
          ${ct("Host",n.host)}
          ${ct("Agent",n.agentId)}
          ${ct("Session",n.sessionKey)}
          ${ct("CWD",n.cwd)}
          ${ct("Resolved",n.resolvedPath)}
          ${ct("Security",n.security)}
          ${ct("Ask",n.ask)}
        </div>
        ${e.execApprovalError?d`<div class="exec-approval-error">${e.execApprovalError}</div>`:$}
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
  `}function kv(e){const{pendingGatewayUrl:t}=e;return t?d`
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
  `:$}const va=["trace","debug","info","warn","error","fatal"];function Sv(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleTimeString()}function Av(e,t){return t?[e.message,e.subsystem,e.raw].filter(Boolean).join(" ").toLowerCase().includes(t):!0}function _v(e){const t=e.filterText.trim().toLowerCase(),n=va.some(o=>!e.levelFilters[o]),i=e.entries.filter(o=>o.level&&!e.levelFilters[o.level]?!1:Av(o,t)),s=t||n?"filtered":"visible";return d`
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
        ${va.map(o=>d`
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

      ${e.file?d`<div class="muted" style="margin-top: 10px;">File: ${e.file}</div>`:$}
      ${e.truncated?d`
              <div class="callout" style="margin-top: 10px">Log output truncated; showing latest chunk.</div>
            `:$}
      ${e.error?d`<div class="callout danger" style="margin-top: 10px;">${e.error}</div>`:$}

      <div class="log-stream" style="margin-top: 12px;" @scroll=${e.onScroll}>
        ${i.length===0?d`
                <div class="muted" style="padding: 12px">No log entries.</div>
              `:i.map(o=>d`
                <div class="log-row">
                  <div class="log-time mono">${Sv(o.time)}</div>
                  <div class="log-level ${o.level??""}">${o.level??""}</div>
                  <div class="log-subsystem mono">${o.subsystem??""}</div>
                  <div class="log-message mono">${o.message??o.raw}</div>
                </div>
              `)}
      </div>
    </section>
  `}function Cv(e){return d`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">无货看板</div>
          <div class="card-sub">总览与无货产品列表，无需向 Agent 提问即可查看。</div>
        </div>
        <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
          ${e.loading?"加载中…":"刷新"}
        </button>
      </div>
      ${e.db==="sqlite"?d`<div class="callout" style="margin-top: 12px; background: var(--bg-muted, #f5f5f5); color: var(--text-muted, #666);">当前使用本地数据库</div>`:$}
      ${e.error?d`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:$}
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        ${e.stats?Tv(e.stats):e.loading?$:d`<div class="muted">暂无统计</div>`}
      </div>
      <div style="margin-top: 24px;">
        <div class="row" style="justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="card-title" style="font-size: 1rem;">无货产品列表</div>
          ${e.onOpenAddForm&&!e.showAddForm?d`<button class="btn btn--primary" ?disabled=${e.loading} @click=${e.onOpenAddForm}>手动新增</button>`:$}
        </div>
        ${e.showAddForm&&e.onAdd&&e.onCloseAddForm?d`
              <div class="callout" style="margin-bottom: 12px; padding: 12px;">
                <div style="font-weight: 600; margin-bottom: 8px;">新增无货记录</div>
                <form @submit=${async t=>{var o,r,a,l,c,f,u;t.preventDefault();const n=t.target,i=((r=(o=n.querySelector('[name="oos_add_name"]'))==null?void 0:o.value)==null?void 0:r.trim())??"";if(!i)return;await e.onAdd({product_name:i,specification:((l=(a=n.querySelector('[name="oos_add_spec"]'))==null?void 0:a.value)==null?void 0:l.trim())??"",quantity:parseFloat(((c=n.querySelector('[name="oos_add_qty"]'))==null?void 0:c.value)??"0")||0,unit:((u=(f=n.querySelector('[name="oos_add_unit"]'))==null?void 0:f.value)==null?void 0:u.trim())??""})&&e.onCloseAddForm()}}>
                  <div class="row" style="gap: 8px; flex-wrap: wrap; align-items: center;">
                    <input name="oos_add_name" type="text" placeholder="产品名称（必填）" required style="min-width: 140px;" />
                    <input name="oos_add_spec" type="text" placeholder="规格" style="min-width: 80px;" />
                    <input name="oos_add_qty" type="number" placeholder="数量" min="0" step="1" value="0" style="width: 80px;" />
                    <input name="oos_add_unit" type="text" placeholder="单位" style="width: 60px;" />
                    <button type="submit" class="btn btn--primary">确定</button>
                    <button type="button" class="btn" @click=${e.onCloseAddForm}>取消</button>
                  </div>
                </form>
              </div>
            `:$}
        <div class="list" style="margin-top: 8px;">
          ${e.list.length===0?d`<div class="muted">暂无无货产品记录。</div>`:e.list.slice(0,50).map(t=>Ev(t,e.onDelete))}
        </div>
        ${e.list.length>50?d`<div class="muted" style="margin-top: 8px;">共 ${e.list.length} 个无货产品，仅展示前 50 个</div>`:$}
      </div>
      <div class="row" style="margin-top: 24px; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">按文件</div>
          <div class="list" style="margin-top: 8px;">
            ${e.byFile.length===0?d`<div class="muted">暂无</div>`:e.byFile.slice(0,10).map(t=>Rv(t))}
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">按时间（最近 30 天）</div>
          <div class="list" style="margin-top: 8px;">
            ${e.byTime.length===0?d`<div class="muted">暂无</div>`:e.byTime.slice(0,10).map(t=>Lv(t))}
          </div>
        </div>
      </div>
    </section>
  `}function Tv(e){return[{label:"总记录数",value:e.total_records},{label:"无货产品数",value:e.out_of_stock_count},{label:"今日新增",value:e.today_count},{label:"被报无货≥2 次",value:e.notified_count},{label:"已发邮件产品数",value:e.email_sent_product_count}].map(n=>d`
      <div class="card stat-card" style="min-width: 100px;">
        <div class="stat-value">${n.value}</div>
        <div class="stat-label">${n.label}</div>
      </div>
    `)}function Ev(e,t){const n=e.product_name??"",i=e.specification??"",s=e.unit??"",o=e.quantity??"",r=e.count??1,l=(e.email_sent_count??0)>0||e.email_status==="sent"?"已发送":"未发",c=e.product_key??"";return d`
    <div class="list-item" style="display: flex; justify-content: space-between; align-items: center;">
      <div class="list-main">
        <div class="list-title">${n} ${i}</div>
        <div class="list-sub">数量: ${String(o)} ${s} · 被报无货 ${r} 次 · 邮件: ${l}</div>
      </div>
      ${t&&c?d`<button class="btn" style="flex-shrink: 0;" title="删除该无货产品" @click=${()=>t(c)}>删除</button>`:$}
    </div>
  `}function Rv(e){const t=e.file_name??"",n=e.total_records??0,i=e.uploaded_at?String(e.uploaded_at).length>19?String(e.uploaded_at).slice(0,10)+" "+String(e.uploaded_at).slice(11,19):String(e.uploaded_at):"";return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${t}</div>
        <div class="list-sub">记录数: ${n}${i?` · ${i}`:""}</div>
      </div>
    </div>
  `}function Lv(e){return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.date??""}</div>
        <div class="list-sub">新增: ${e.count??0}</div>
      </div>
    </div>
  `}function Iv(e){return d`
    <section class="card" style="margin-top: 24px;">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">缺货记录</div>
          <div class="card-sub">Work 匹配后库存不足会落库，总览与缺货产品列表。</div>
        </div>
        <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
          ${e.loading?"加载中…":"刷新"}
        </button>
      </div>
      ${e.db==="sqlite"?d`<div class="callout" style="margin-top: 12px; background: var(--bg-muted, #f5f5f5); color: var(--text-muted, #666);">当前使用本地数据库</div>`:$}
      ${e.error?d`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:$}
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        ${e.stats?Mv(e.stats):e.loading?$:d`<div class="muted">暂无统计</div>`}
      </div>
      <div style="margin-top: 24px;">
        <div class="row" style="justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="card-title" style="font-size: 1rem;">缺货产品列表</div>
          ${e.onOpenAddForm&&!e.showAddForm?d`<button class="btn btn--primary" ?disabled=${e.loading} @click=${e.onOpenAddForm}>手动新增</button>`:$}
        </div>
        ${e.showAddForm&&e.onAdd&&e.onCloseAddForm?d`
              <div class="callout" style="margin-bottom: 12px; padding: 12px;">
                <div style="font-weight: 600; margin-bottom: 8px;">新增缺货记录（产品名字、规格、需求、供给；差异自动计算）</div>
                <form @submit=${async t=>{var a,l,c,f,u,p;t.preventDefault();const n=t.target,i=((l=(a=n.querySelector('[name="shortage_add_name"]'))==null?void 0:a.value)==null?void 0:l.trim())??"";if(!i)return;const s=parseFloat(((c=n.querySelector('[name="shortage_add_qty"]'))==null?void 0:c.value)??"0")||0,o=parseFloat(((f=n.querySelector('[name="shortage_add_avail"]'))==null?void 0:f.value)??"0")||0;await e.onAdd({product_name:i,specification:((p=(u=n.querySelector('[name="shortage_add_spec"]'))==null?void 0:u.value)==null?void 0:p.trim())??"",quantity:s,available_qty:o})&&e.onCloseAddForm()}}>
                  <div class="row" style="gap: 8px; flex-wrap: wrap; align-items: center;">
                    <input name="shortage_add_name" type="text" placeholder="产品名字（必填）" required style="min-width: 140px;" />
                    <input name="shortage_add_spec" type="text" placeholder="规格" style="min-width: 80px;" />
                    <input name="shortage_add_qty" type="number" placeholder="需求" min="0" step="1" value="0" style="width: 80px;" title="需求数量" />
                    <input name="shortage_add_avail" type="number" placeholder="供给" min="0" step="1" value="0" style="width: 80px;" title="可用供给" />
                    <span class="muted" style="font-size: 0.9rem;" title="差异 = 需求 - 供给，提交时自动计算">差异：自动计算</span>
                    <button type="submit" class="btn btn--primary">确定</button>
                    <button type="button" class="btn" @click=${e.onCloseAddForm}>取消</button>
                  </div>
                </form>
              </div>
            `:$}
        <div class="list" style="margin-top: 8px;">
          ${e.list.length===0?d`<div class="muted">暂无缺货产品记录。</div>`:e.list.slice(0,50).map(t=>Pv(t,e.onDelete))}
        </div>
        ${e.list.length>50?d`<div class="muted" style="margin-top: 8px;">共 ${e.list.length} 个缺货产品，仅展示前 50 个</div>`:$}
      </div>
      <div class="row" style="margin-top: 24px; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">按文件</div>
          <div class="list" style="margin-top: 8px;">
            ${e.byFile.length===0?d`<div class="muted">暂无</div>`:e.byFile.slice(0,10).map(t=>Dv(t))}
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">按时间（最近 30 天）</div>
          <div class="list" style="margin-top: 8px;">
            ${e.byTime.length===0?d`<div class="muted">暂无</div>`:e.byTime.slice(0,10).map(t=>Fv(t))}
          </div>
        </div>
      </div>
    </section>
  `}function Mv(e){return[{label:"总记录数",value:e.total_records},{label:"缺货产品数",value:e.shortage_product_count},{label:"今日新增",value:e.today_count},{label:"被报缺货≥2 次",value:e.reported_ge2_count}].map(n=>d`
      <div class="card stat-card" style="min-width: 100px;">
        <div class="stat-value">${n.value}</div>
        <div class="stat-label">${n.label}</div>
      </div>
    `)}function Pv(e,t){const n=e.product_name??"",i=e.specification??"",s=e.quantity??0,o=e.available_qty??0,r=e.shortfall??0,a=e.count??1,l=e.product_key??"";return d`
    <div class="list-item" style="display: flex; justify-content: space-between; align-items: center;">
      <div class="list-main">
        <div class="list-title">${n} ${i?` · ${i}`:""}</div>
        <div class="list-sub">需求: ${s} · 供给: ${o} · 差异: ${r} · 被报缺货 ${a} 次</div>
      </div>
      ${t&&l?d`<button class="btn" style="flex-shrink: 0;" title="删除该缺货产品" @click=${()=>t(l)}>删除</button>`:$}
    </div>
  `}function Dv(e){const t=e.file_name??"",n=e.total_records??0,i=e.uploaded_at?String(e.uploaded_at).length>19?String(e.uploaded_at).slice(0,10)+" "+String(e.uploaded_at).slice(11,19):String(e.uploaded_at):"";return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${t}</div>
        <div class="list-sub">记录数: ${n}${i?` · ${i}`:""}</div>
      </div>
    </div>
  `}function Fv(e){return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.date??""}</div>
        <div class="list-sub">新增: ${e.count??0}</div>
      </div>
    </div>
  `}const et="__defaults__",ya=[{value:"deny",label:"Deny"},{value:"allowlist",label:"Allowlist"},{value:"full",label:"Full"}],Nv=[{value:"off",label:"Off"},{value:"on-miss",label:"On miss"},{value:"always",label:"Always"}];function ba(e){return e==="allowlist"||e==="full"||e==="deny"?e:"deny"}function Ov(e){return e==="always"||e==="off"||e==="on-miss"?e:"on-miss"}function Bv(e){const t=(e==null?void 0:e.defaults)??{};return{security:ba(t.security),ask:Ov(t.ask),askFallback:ba(t.askFallback??"deny"),autoAllowSkills:!!(t.autoAllowSkills??!1)}}function Uv(e){const t=(e==null?void 0:e.agents)??{},n=Array.isArray(t.list)?t.list:[],i=[];return n.forEach(s=>{if(!s||typeof s!="object")return;const o=s,r=typeof o.id=="string"?o.id.trim():"";if(!r)return;const a=typeof o.name=="string"?o.name.trim():void 0,l=o.default===!0;i.push({id:r,name:a||void 0,isDefault:l})}),i}function zv(e,t){const n=Uv(e),i=Object.keys((t==null?void 0:t.agents)??{}),s=new Map;n.forEach(r=>s.set(r.id,r)),i.forEach(r=>{s.has(r)||s.set(r,{id:r})});const o=Array.from(s.values());return o.length===0&&o.push({id:"main",isDefault:!0}),o.sort((r,a)=>{var f,u;if(r.isDefault&&!a.isDefault)return-1;if(!r.isDefault&&a.isDefault)return 1;const l=(f=r.name)!=null&&f.trim()?r.name:r.id,c=(u=a.name)!=null&&u.trim()?a.name:a.id;return l.localeCompare(c)}),o}function Hv(e,t){return e===et?et:e&&t.some(n=>n.id===e)?e:et}function Kv(e){var u;const t=e.execApprovalsForm??((u=e.execApprovalsSnapshot)==null?void 0:u.file)??null,n=!!t,i=Bv(t),s=zv(e.configForm,t),o=Jv(e.nodes),r=e.execApprovalsTarget;let a=r==="node"&&e.execApprovalsTargetNodeId?e.execApprovalsTargetNodeId:null;r==="node"&&a&&!o.some(p=>p.id===a)&&(a=null);const l=Hv(e.execApprovalsSelectedAgent,s),c=l!==et?((t==null?void 0:t.agents)??{})[l]??null:null,f=Array.isArray(c==null?void 0:c.allowlist)?c.allowlist??[]:[];return{ready:n,disabled:e.execApprovalsSaving||e.execApprovalsLoading,dirty:e.execApprovalsDirty,loading:e.execApprovalsLoading,saving:e.execApprovalsSaving,form:t,defaults:i,selectedScope:l,selectedAgent:c,agents:s,allowlist:f,target:r,targetNodeId:a,targetNodes:o,onSelectScope:e.onExecApprovalsSelectAgent,onSelectTarget:e.onExecApprovalsTargetChange,onPatch:e.onExecApprovalsPatch,onRemove:e.onExecApprovalsRemove,onLoad:e.onLoadExecApprovals,onSave:e.onSaveExecApprovals}}function jv(e){const t=e.ready,n=e.target!=="node"||!!e.targetNodeId;return d`
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

      ${qv(e)}

      ${t?d`
            ${Wv(e)}
            ${Gv(e)}
            ${e.selectedScope===et?$:Vv(e)}
          `:d`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load exec approvals to edit allowlists.</div>
            <button class="btn" ?disabled=${e.loading||!n} @click=${e.onLoad}>
              ${e.loading?"Loading…":"Load approvals"}
            </button>
          </div>`}
    </section>
  `}function qv(e){const t=e.targetNodes.length>0,n=e.targetNodeId??"";return d`
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
          ${e.target==="node"?d`
                <label class="field">
                  <span>Node</span>
                  <select
                    ?disabled=${e.disabled||!t}
                    @change=${i=>{const o=i.target.value.trim();e.onSelectTarget("node",o||null)}}
                  >
                    <option value="" ?selected=${n===""}>Select node</option>
                    ${e.targetNodes.map(i=>d`<option
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
      ${e.target==="node"&&!t?d`
              <div class="muted">No nodes advertise exec approvals yet.</div>
            `:$}
    </div>
  `}function Wv(e){return d`
    <div class="row" style="margin-top: 12px; gap: 8px; flex-wrap: wrap;">
      <span class="label">Scope</span>
      <div class="row" style="gap: 8px; flex-wrap: wrap;">
        <button
          class="btn btn--sm ${e.selectedScope===et?"active":""}"
          @click=${()=>e.onSelectScope(et)}
        >
          Defaults
        </button>
        ${e.agents.map(t=>{var i;const n=(i=t.name)!=null&&i.trim()?`${t.name} (${t.id})`:t.id;return d`
            <button
              class="btn btn--sm ${e.selectedScope===t.id?"active":""}"
              @click=${()=>e.onSelectScope(t.id)}
            >
              ${n}
            </button>
          `})}
      </div>
    </div>
  `}function Gv(e){const t=e.selectedScope===et,n=e.defaults,i=e.selectedAgent??{},s=t?["defaults"]:["agents",e.selectedScope],o=typeof i.security=="string"?i.security:void 0,r=typeof i.ask=="string"?i.ask:void 0,a=typeof i.askFallback=="string"?i.askFallback:void 0,l=t?n.security:o??"__default__",c=t?n.ask:r??"__default__",f=t?n.askFallback:a??"__default__",u=typeof i.autoAllowSkills=="boolean"?i.autoAllowSkills:void 0,p=u??n.autoAllowSkills,b=u==null;return d`
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
              @change=${x=>{const S=x.target.value;!t&&S==="__default__"?e.onRemove([...s,"security"]):e.onPatch([...s,"security"],S)}}
            >
              ${t?$:d`<option value="__default__" ?selected=${l==="__default__"}>
                    Use default (${n.security})
                  </option>`}
              ${ya.map(x=>d`<option
                    value=${x.value}
                    ?selected=${l===x.value}
                  >
                    ${x.label}
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
              @change=${x=>{const S=x.target.value;!t&&S==="__default__"?e.onRemove([...s,"ask"]):e.onPatch([...s,"ask"],S)}}
            >
              ${t?$:d`<option value="__default__" ?selected=${c==="__default__"}>
                    Use default (${n.ask})
                  </option>`}
              ${Nv.map(x=>d`<option
                    value=${x.value}
                    ?selected=${c===x.value}
                  >
                    ${x.label}
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
              @change=${x=>{const S=x.target.value;!t&&S==="__default__"?e.onRemove([...s,"askFallback"]):e.onPatch([...s,"askFallback"],S)}}
            >
              ${t?$:d`<option value="__default__" ?selected=${f==="__default__"}>
                    Use default (${n.askFallback})
                  </option>`}
              ${ya.map(x=>d`<option
                    value=${x.value}
                    ?selected=${f===x.value}
                  >
                    ${x.label}
                  </option>`)}
            </select>
          </label>
        </div>
      </div>

      <div class="list-item">
        <div class="list-main">
          <div class="list-title">Auto-allow skill CLIs</div>
          <div class="list-sub">
            ${t?"Allow skill executables listed by the Gateway.":b?`Using default (${n.autoAllowSkills?"on":"off"}).`:`Override (${p?"on":"off"}).`}
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>Enabled</span>
            <input
              type="checkbox"
              ?disabled=${e.disabled}
              .checked=${p}
              @change=${x=>{const k=x.target;e.onPatch([...s,"autoAllowSkills"],k.checked)}}
            />
          </label>
          ${!t&&!b?d`<button
                class="btn btn--sm"
                ?disabled=${e.disabled}
                @click=${()=>e.onRemove([...s,"autoAllowSkills"])}
              >
                Use default
              </button>`:$}
        </div>
      </div>
    </div>
  `}function Vv(e){const t=["agents",e.selectedScope,"allowlist"],n=e.allowlist;return d`
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
      ${n.length===0?d`
              <div class="muted">No allowlist entries yet.</div>
            `:n.map((i,s)=>Qv(e,i,s))}
    </div>
  `}function Qv(e,t,n){var r;const i=t.lastUsedAt?xt(t.lastUsedAt):"never",s=t.lastUsedCommand?rs(t.lastUsedCommand,120):null,o=t.lastResolvedPath?rs(t.lastResolvedPath,120):null;return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${(r=t.pattern)!=null&&r.trim()?t.pattern:"New pattern"}</div>
        <div class="list-sub">Last used: ${i}</div>
        ${s?d`<div class="list-sub mono">${s}</div>`:$}
        ${o?d`<div class="list-sub mono">${o}</div>`:$}
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
  `}function Jv(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(a=>String(a)==="system.execApprovals.get"||String(a)==="system.execApprovals.set"))continue;const o=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!o)continue;const r=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():o;t.push({id:o,label:r===o?o:`${r} · ${o}`})}return t.sort((n,i)=>n.label.localeCompare(i.label)),t}function Yv(e){const t=ny(e),n=Kv(e);return d`
    ${jv(n)}
    ${iy(t)}
    ${Xv(e)}
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
        ${e.nodes.length===0?d`
                <div class="muted">No nodes found.</div>
              `:e.nodes.map(i=>ay(i))}
      </div>
    </section>
  `}function Xv(e){const t=e.devicesList??{pending:[],paired:[]},n=Array.isArray(t.pending)?t.pending:[],i=Array.isArray(t.paired)?t.paired:[];return d`
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
      ${e.devicesError?d`<div class="callout danger" style="margin-top: 12px;">${e.devicesError}</div>`:$}
      <div class="list" style="margin-top: 16px;">
        ${n.length>0?d`
              <div class="muted" style="margin-bottom: 8px;">Pending</div>
              ${n.map(s=>Zv(s,e))}
            `:$}
        ${i.length>0?d`
              <div class="muted" style="margin-top: 12px; margin-bottom: 8px;">Paired</div>
              ${i.map(s=>ey(s,e))}
            `:$}
        ${n.length===0&&i.length===0?d`
                <div class="muted">No paired devices.</div>
              `:$}
      </div>
    </section>
  `}function Zv(e,t){var a,l;const n=((a=e.displayName)==null?void 0:a.trim())||e.deviceId,i=typeof e.ts=="number"?xt(e.ts):"n/a",s=(l=e.role)!=null&&l.trim()?`role: ${e.role}`:"role: -",o=e.isRepair?" · repair":"",r=e.remoteIp?` · ${e.remoteIp}`:"";return d`
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
  `}function ey(e,t){var a;const n=((a=e.displayName)==null?void 0:a.trim())||e.deviceId,i=e.remoteIp?` · ${e.remoteIp}`:"",s=`roles: ${os(e.roles)}`,o=`scopes: ${os(e.scopes)}`,r=Array.isArray(e.tokens)?e.tokens:[];return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${n}</div>
        <div class="list-sub">${e.deviceId}${i}</div>
        <div class="muted" style="margin-top: 6px;">${s} · ${o}</div>
        ${r.length===0?d`
                <div class="muted" style="margin-top: 6px">Tokens: none</div>
              `:d`
              <div class="muted" style="margin-top: 10px;">Tokens</div>
              <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 6px;">
                ${r.map(l=>ty(e.deviceId,l,t))}
              </div>
            `}
      </div>
    </div>
  `}function ty(e,t,n){const i=t.revokedAtMs?"revoked":"active",s=`scopes: ${os(t.scopes)}`,o=xt(t.rotatedAtMs??t.createdAtMs??t.lastUsedAtMs??null);return d`
    <div class="row" style="justify-content: space-between; gap: 8px;">
      <div class="list-sub">${t.role} · ${i} · ${s} · ${o}</div>
      <div class="row" style="justify-content: flex-end; gap: 6px; flex-wrap: wrap;">
        <button
          class="btn btn--sm"
          @click=${()=>n.onDeviceRotate(e,t.role,t.scopes)}
        >
          Rotate
        </button>
        ${t.revokedAtMs?$:d`
              <button
                class="btn btn--sm danger"
                @click=${()=>n.onDeviceRevoke(e,t.role)}
              >
                Revoke
              </button>
            `}
      </div>
    </div>
  `}function ny(e){const t=e.configForm,n=oy(e.nodes),{defaultBinding:i,agents:s}=ry(t),o=!!t,r=e.configSaving||e.configFormMode==="raw";return{ready:o,disabled:r,configDirty:e.configDirty,configLoading:e.configLoading,configSaving:e.configSaving,defaultBinding:i,agents:s,nodes:n,onBindDefault:e.onBindDefault,onBindAgent:e.onBindAgent,onSave:e.onSaveBindings,onLoadConfig:e.onLoadConfig,formMode:e.configFormMode}}function iy(e){const t=e.nodes.length>0,n=e.defaultBinding??"";return d`
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

      ${e.formMode==="raw"?d`
              <div class="callout warn" style="margin-top: 12px">
                Switch the Config tab to <strong>Form</strong> mode to edit bindings here.
              </div>
            `:$}

      ${e.ready?d`
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
                      ${e.nodes.map(i=>d`<option
                            value=${i.id}
                            ?selected=${n===i.id}
                          >
                            ${i.label}
                          </option>`)}
                    </select>
                  </label>
                  ${t?$:d`
                          <div class="muted">No nodes with system.run available.</div>
                        `}
                </div>
              </div>

              ${e.agents.length===0?d`
                      <div class="muted">No agents found.</div>
                    `:e.agents.map(i=>sy(i,e))}
            </div>
          `:d`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load config to edit bindings.</div>
            <button class="btn" ?disabled=${e.configLoading} @click=${e.onLoadConfig}>
              ${e.configLoading?"Loading…":"Load config"}
            </button>
          </div>`}
    </section>
  `}function sy(e,t){var o;const n=e.binding??"__default__",i=(o=e.name)!=null&&o.trim()?`${e.name} (${e.id})`:e.id,s=t.nodes.length>0;return d`
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
            ${t.nodes.map(r=>d`<option
                  value=${r.id}
                  ?selected=${n===r.id}
                >
                  ${r.label}
                </option>`)}
          </select>
        </label>
      </div>
    </div>
  `}function oy(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(a=>String(a)==="system.run"))continue;const o=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!o)continue;const r=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():o;t.push({id:o,label:r===o?o:`${r} · ${o}`})}return t.sort((n,i)=>n.label.localeCompare(i.label)),t}function ry(e){const t={id:"main",name:void 0,index:0,isDefault:!0,binding:null};if(!e||typeof e!="object")return{defaultBinding:null,agents:[t]};const i=(e.tools??{}).exec??{},s=typeof i.node=="string"&&i.node.trim()?i.node.trim():null,o=e.agents??{},r=Array.isArray(o.list)?o.list:[];if(r.length===0)return{defaultBinding:s,agents:[t]};const a=[];return r.forEach((l,c)=>{if(!l||typeof l!="object")return;const f=l,u=typeof f.id=="string"?f.id.trim():"";if(!u)return;const p=typeof f.name=="string"?f.name.trim():void 0,b=f.default===!0,k=(f.tools??{}).exec??{},S=typeof k.node=="string"&&k.node.trim()?k.node.trim():null;a.push({id:u,name:p||void 0,index:c,isDefault:b,binding:S})}),a.length===0&&a.push(t),{defaultBinding:s,agents:a}}function ay(e){const t=!!e.connected,n=!!e.paired,i=typeof e.displayName=="string"&&e.displayName.trim()||(typeof e.nodeId=="string"?e.nodeId:"unknown"),s=Array.isArray(e.caps)?e.caps:[],o=Array.isArray(e.commands)?e.commands:[];return d`
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
          ${s.slice(0,12).map(r=>d`<span class="chip">${String(r)}</span>`)}
          ${o.slice(0,8).map(r=>d`<span class="chip">${String(r)}</span>`)}
        </div>
      </div>
    </div>
  `}function ly(e){var c,f;const t=(c=e.hello)==null?void 0:c.snapshot,n=t!=null&&t.uptimeMs?Ua(t.uptimeMs):g("common.na"),i=(f=t==null?void 0:t.policy)!=null&&f.tickIntervalMs?`${t.policy.tickIntervalMs}ms`:g("common.na"),o=(t==null?void 0:t.authMode)==="trusted-proxy",r=(()=>{if(e.connected||!e.lastError)return null;const u=e.lastError.toLowerCase();if(!(u.includes("unauthorized")||u.includes("connect failed")))return null;const b=!!e.settings.token.trim(),x=!!e.password.trim();return!b&&!x?d`
        <div class="muted" style="margin-top: 8px">
          ${g("overview.auth.required")}
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
      `:d`
      <div class="muted" style="margin-top: 8px">
        ${g("overview.auth.failed",{command:"openclaw dashboard --no-open"})}
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
    `})(),a=(()=>{if(e.connected||!e.lastError||(typeof window<"u"?window.isSecureContext:!0))return null;const p=e.lastError.toLowerCase();return!p.includes("secure context")&&!p.includes("device identity required")?null:d`
      <div class="muted" style="margin-top: 8px">
        ${g("overview.insecure.hint",{url:"http://127.0.0.1:18789"})}
        <div style="margin-top: 6px">
          ${g("overview.insecure.stayHttp",{config:"gateway.controlUi.allowInsecureAuth: true"})}
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
    `})(),l=gn.getLocale();return d`
    <section class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <div>
          <div class="card-title">${g("overview.health.title")}</div>
          <div class="card-sub">
            ${g("overview.health.subtitle")}
          </div>
        </div>
        <div
          class="pill ${e.connected?"success":"danger"}"
          style="font-weight: 600; min-width: 96px; justify-content: center;"
        >
          ${e.connected?g("common.ok"):g("common.offline")}
        </div>
      </div>
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        <div class="card stat-card" style="min-width: 140px;">
          <div class="stat-label">${g("overview.stats.instances")}</div>
          <div class="stat-value">${e.presenceCount}</div>
          <div class="muted">${g("overview.stats.instancesHint")}</div>
        </div>
        <div class="card stat-card" style="min-width: 140px;">
          <div class="stat-label">${g("overview.stats.sessions")}</div>
          <div class="stat-value">${e.sessionsCount??g("common.na")}</div>
          <div class="muted">${g("overview.stats.sessionsHint")}</div>
        </div>
        <div class="card stat-card" style="min-width: 140px;">
          <div class="stat-label">${g("overview.stats.cron")}</div>
          <div class="stat-value">
            ${e.cronEnabled==null?g("common.na"):e.cronEnabled?g("common.enabled"):g("common.disabled")}
          </div>
          <div class="muted">
            ${g("overview.stats.cronNext",{time:Nl(e.cronNext)})}
          </div>
        </div>
      </div>
      ${e.lastError?d`<div class="callout danger" style="margin-top: 12px;">
              <div style="font-weight: 600; margin-bottom: 4px;">
                ${g("overview.health.lastErrorLabel")}
              </div>
              <div>${e.lastError}</div>
            </div>`:d`<div class="muted" style="margin-top: 12px;">
              ${g("overview.health.noError")}
            </div>`}
    </section>

    <section class="grid grid-cols-2">
      <div class="card">
        <div class="card-title">${g("overview.access.title")}</div>
        <div class="card-sub">${g("overview.access.subtitle")}</div>
        <div class="form-grid" style="margin-top: 16px;">
          <label class="field">
            <span>${g("overview.access.wsUrl")}</span>
            <input
              .value=${e.settings.gatewayUrl}
              @input=${u=>{const p=u.target.value;e.onSettingsChange({...e.settings,gatewayUrl:p})}}
              placeholder="ws://100.x.y.z:18789"
            />
          </label>
          ${o?"":d`
                <label class="field">
                  <span>${g("overview.access.token")}</span>
                  <input
                    .value=${e.settings.token}
                    @input=${u=>{const p=u.target.value;e.onSettingsChange({...e.settings,token:p})}}
                    placeholder="JAGENT_GATEWAY_TOKEN"
                  />
                </label>
                <label class="field">
                  <span>${g("overview.access.password")}</span>
                  <input
                    type="password"
                    .value=${e.password}
                    @input=${u=>{const p=u.target.value;e.onPasswordChange(p)}}
                    placeholder="system or shared password"
                  />
                </label>
              `}
          <label class="field">
            <span>${g("overview.access.sessionKey")}</span>
            <input
              .value=${e.settings.sessionKey}
              @input=${u=>{const p=u.target.value;e.onSessionKeyChange(p)}}
            />
          </label>
          <label class="field">
            <span>${g("overview.access.language")}</span>
            <select
              .value=${l}
              @change=${u=>{const p=u.target.value;gn.setLocale(p),e.onSettingsChange({...e.settings,locale:p})}}
            >
              <option value="en">${g("languages.en")}</option>
              <option value="zh-CN">${g("languages.zhCN")}</option>
              <option value="zh-TW">${g("languages.zhTW")}</option>
              <option value="pt-BR">${g("languages.ptBR")}</option>
            </select>
          </label>
        </div>
        <div class="row" style="margin-top: 14px;">
          <button class="btn" @click=${()=>e.onConnect()}>${g("common.connect")}</button>
          <button class="btn" @click=${()=>e.onRefresh()}>${g("common.refresh")}</button>
          <span class="muted">${g(o?"overview.access.trustedProxy":"overview.access.connectHint")}</span>
        </div>
      </div>

      <div class="card">
        <div class="card-title">${g("overview.snapshot.title")}</div>
        <div class="card-sub">${g("overview.snapshot.subtitle")}</div>
        <div class="stat-grid" style="margin-top: 16px;">
          <div class="stat">
            <div class="stat-label">${g("overview.snapshot.status")}</div>
            <div class="stat-value ${e.connected?"ok":"warn"}">
              ${e.connected?g("common.ok"):g("common.offline")}
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">${g("overview.snapshot.uptime")}</div>
            <div class="stat-value">${n}</div>
          </div>
          <div class="stat">
            <div class="stat-label">${g("overview.snapshot.tickInterval")}</div>
            <div class="stat-value">${i}</div>
          </div>
          <div class="stat">
            <div class="stat-label">${g("overview.snapshot.lastChannelsRefresh")}</div>
            <div class="stat-value">
              ${e.lastChannelsRefresh?xt(e.lastChannelsRefresh):g("common.na")}
            </div>
          </div>
        </div>
        ${e.lastError?d`<div class="callout danger" style="margin-top: 14px;">
              <div>${e.lastError}</div>
              ${r??""}
              ${a??""}
            </div>`:d`
                <div class="callout" style="margin-top: 14px">
                  ${g("overview.snapshot.channelsHint")}
                </div>
              `}
      </div>
    </section>

    <section class="grid grid-cols-2" style="margin-top: 18px;">
      <div class="card">
        <div class="card-title">无货总览</div>
        <div class="card-sub">最近的无货情况汇总，点击「实例」页可查看明细。</div>
        <div class="row" style="margin-top: 12px; gap: 12px; flex-wrap: wrap;">
          ${e.oosStats?[{label:"总记录数",value:e.oosStats.total_records},{label:"无货产品数",value:e.oosStats.out_of_stock_count},{label:"今日新增",value:e.oosStats.today_count},{label:"被报无货≥2 次",value:e.oosStats.notified_count}].map(u=>d`
                  <div class="card stat-card" style="min-width: 120px;">
                    <div class="stat-value">${u.value}</div>
                    <div class="stat-label">${u.label}</div>
                  </div>
                `):d`<div class="muted">暂无统计，稍后可在「实例」页查看。</div>`}
        </div>
      </div>
      <div class="card">
        <div class="card-title">缺货总览</div>
        <div class="card-sub">Work 匹配后库存不足的统计，需重点关注的紧缺物资。</div>
        <div class="row" style="margin-top: 12px; gap: 12px; flex-wrap: wrap;">
          ${e.shortageStats?[{label:"总记录数",value:e.shortageStats.total_records},{label:"缺货产品数",value:e.shortageStats.shortage_product_count},{label:"今日新增",value:e.shortageStats.today_count},{label:"被报缺货≥2 次",value:e.shortageStats.reported_ge2_count}].map(u=>d`
                  <div class="card stat-card" style="min-width: 120px;">
                    <div class="stat-value">${u.value}</div>
                    <div class="stat-label">${u.label}</div>
                  </div>
                `):d`<div class="muted">暂无统计，稍后可在「实例」页查看。</div>`}
        </div>
      </div>
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">${g("overview.notes.title")}</div>
      <div class="card-sub">${g("overview.notes.subtitle")}</div>
      <div class="note-grid" style="margin-top: 14px;">
        <div>
          <div class="note-title">${g("overview.notes.tailscaleTitle")}</div>
          <div class="muted">
            ${g("overview.notes.tailscaleText")}
          </div>
        </div>
        <div>
          <div class="note-title">${g("overview.notes.sessionTitle")}</div>
          <div class="muted">${g("overview.notes.sessionText")}</div>
        </div>
        <div>
          <div class="note-title">${g("overview.notes.cronTitle")}</div>
          <div class="muted">${g("overview.notes.cronText")}</div>
        </div>
      </div>
    </section>
  `}function cy(e){var o;const t=((o=e.report)==null?void 0:o.skills)??[],n=e.filter.trim().toLowerCase(),i=n?t.filter(r=>[r.name,r.description,r.source].join(" ").toLowerCase().includes(n)):t,s=Ul(i);return d`
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

      ${e.error?d`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:$}

      ${i.length===0?d`
              <div class="muted" style="margin-top: 16px">No skills found.</div>
            `:d`
            <div class="agent-skills-groups" style="margin-top: 16px;">
              ${s.map(r=>{const a=r.id==="workspace"||r.id==="built-in";return d`
                  <details class="agent-skills-group" ?open=${!a}>
                    <summary class="agent-skills-header">
                      <span>${r.label}</span>
                      <span class="muted">${r.skills.length}</span>
                    </summary>
                    <div class="list skills-grid">
                      ${r.skills.map(l=>dy(l,e))}
                    </div>
                  </details>
                `})}
            </div>
          `}
    </section>
  `}function dy(e,t){const n=t.busyKey===e.skillKey,i=t.edits[e.skillKey]??"",s=t.messages[e.skillKey]??null,o=e.install.length>0&&e.missing.bins.length>0,r=!!(e.bundled&&e.source!=="openclaw-bundled"),a=zl(e),l=Hl(e);return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">
          ${e.emoji?`${e.emoji} `:""}${e.name}
        </div>
        <div class="list-sub">${rs(e.description,140)}</div>
        ${Kl({skill:e,showBundledBadge:r})}
        ${a.length>0?d`
              <div class="muted" style="margin-top: 6px;">
                Missing: ${a.join(", ")}
              </div>
            `:$}
        ${l.length>0?d`
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
          ${o?d`<button
                class="btn"
                ?disabled=${n}
                @click=${()=>t.onInstall(e.skillKey,e.name,e.install[0].id)}
              >
                ${n?"Installing…":e.install[0].label}
              </button>`:$}
        </div>
        ${s?d`<div
              class="muted"
              style="margin-top: 8px; color: ${s.kind==="error"?"var(--danger-color, #d14343)":"var(--success-color, #0a7f5a)"};"
            >
              ${s.message}
            </div>`:$}
        ${e.primaryEnv?d`
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
  `}const uy=/^data:/i,fy=/^https?:\/\//i;function py(e){var a,l;const t=((a=e.agentsList)==null?void 0:a.agents)??[],n=Da(e.sessionKey),i=(n==null?void 0:n.agentId)??((l=e.agentsList)==null?void 0:l.defaultId)??"main",s=t.find(c=>c.id===i),o=s==null?void 0:s.identity,r=(o==null?void 0:o.avatarUrl)??(o==null?void 0:o.avatar);if(r)return uy.test(r)||fy.test(r)?r:o==null?void 0:o.avatarUrl}function gy(e){var b,x,k,S,E,P,F,L,A;const t=e.presenceEntries.length,n=((b=e.sessionsResult)==null?void 0:b.count)??null,i=((x=e.cronStatus)==null?void 0:x.nextWakeAtMs)??null,s=e.connected?null:g("chat.disconnected"),o=e.tab==="chat",r=o&&(e.settings.chatFocusMode||e.onboarding),a=e.onboarding?!1:e.settings.chatShowThinking,l=py(e),c=e.chatAvatarUrl??l??null,f=e.configForm??((k=e.configSnapshot)==null?void 0:k.config),u=zt(e.basePath??""),p=e.agentsSelectedId??((S=e.agentsList)==null?void 0:S.defaultId)??((F=(P=(E=e.agentsList)==null?void 0:E.agents)==null?void 0:P[0])==null?void 0:F.id)??null;return d`
    <div class="shell ${o?"shell--chat":""} ${r?"shell--chat-focus":""} ${e.settings.navCollapsed?"shell--nav-collapsed":""} ${e.onboarding?"shell--onboarding":""}">
      <header class="topbar">
        <div class="topbar-left">
          <button
            class="nav-collapse-toggle"
            @click=${()=>e.applySettings({...e.settings,navCollapsed:!e.settings.navCollapsed})}
            title="${e.settings.navCollapsed?g("nav.expand"):g("nav.collapse")}"
            aria-label="${e.settings.navCollapsed?g("nav.expand"):g("nav.collapse")}"
          >
            <span class="nav-collapse-toggle__icon">${re.menu}</span>
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
            <span>${g("common.health")}</span>
            <span class="mono">${e.connected?g("common.ok"):g("common.offline")}</span>
          </div>
          ${Yp(e)}
        </div>
      </header>
      <aside class="nav ${e.settings.navCollapsed?"nav--collapsed":""}">
        ${Ju.map(h=>{const _=e.settings.navGroupsCollapsed[h.label]??!1,C=h.tabs.some(R=>R===e.tab);return d`
            <div class="nav-group ${_&&!C?"nav-group--collapsed":""}">
              <button
                class="nav-label"
                @click=${()=>{const R={...e.settings.navGroupsCollapsed};R[h.label]=!_,e.applySettings({...e.settings,navGroupsCollapsed:R})}}
                aria-expanded=${!_}
              >
                <span class="nav-label__text">${g(`nav.${h.label}`)}</span>
                <span class="nav-label__chevron">${_?"+":"−"}</span>
              </button>
              <div class="nav-group__items">
                ${h.tabs.map(R=>jp(e,R))}
              </div>
            </div>
          `})}
        <div class="nav-group nav-group--links">
          <div class="nav-label nav-label--static">
            <span class="nav-label__text">${g("common.resources")}</span>
          </div>
          <div class="nav-group__items">
            <a
              class="nav-item nav-item--external"
              href="https://docs.openclaw.ai"
              target="_blank"
              rel="noreferrer"
              title="${g("common.docs")} (opens in new tab)"
            >
              <span class="nav-item__icon" aria-hidden="true">${re.book}</span>
              <span class="nav-item__text">${g("common.docs")}</span>
            </a>
          </div>
        </div>
      </aside>
      <main class="content ${o?"content--chat":""}">
        <section class="content-header">
          <div>
            ${e.tab==="work"?$:d`<div class="page-title">${us(e.tab)}</div>`}
            ${e.tab==="work"?$:d`<div class="page-sub">${Zu(e.tab)}</div>`}
          </div>
          <div class="page-meta">
            ${e.lastError?d`<div class="pill danger">${e.lastError}</div>`:$}
            ${o?qp(e):$}
          </div>
        </section>

        ${e.tab==="overview"?ly({connected:e.connected,hello:e.hello,settings:e.settings,password:e.password,lastError:e.lastError,presenceCount:t,sessionsCount:n,cronEnabled:((L=e.cronStatus)==null?void 0:L.enabled)??null,cronNext:i,lastChannelsRefresh:e.channelsLastSuccess,oosStats:e.overviewOosStats,shortageStats:e.overviewShortageStats,onSettingsChange:h=>e.applySettings(h),onPasswordChange:h=>e.password=h,onSessionKeyChange:h=>{e.sessionKey=h,e.chatMessage="",e.resetToolStream(),e.applySettings({...e.settings,sessionKey:h,lastActiveSessionKey:h}),e.loadAssistantIdentity()},onConnect:()=>e.connect(),onRefresh:()=>e.loadOverview()}):$}

        ${e.tab==="channels"?Ng({loading:e.bkLoading,saving:e.bkSaving,error:e.bkError,content:e.bkContent,lastSuccessAt:e.bkLastSuccess,dependentFiles:e.bkDependentFiles,onReload:()=>Ba(e),onSave:h=>Nd(e,h),onContentChange:h=>e.bkContent=h}):$}

        ${e.tab==="instances"?d`
                ${Cv({loading:e.oosLoading,error:e.oosError,stats:e.oosStats,list:e.oosList,byFile:e.oosByFile,byTime:e.oosByTime,db:e.oosDb??void 0,onRefresh:()=>ui(e),onDelete:h=>Bu(e,h),showAddForm:e.oosShowAddForm,onOpenAddForm:()=>e.oosShowAddForm=!0,onCloseAddForm:()=>e.oosShowAddForm=!1,onAdd:async h=>{const _=await Uu(e,h);return _&&(e.oosShowAddForm=!1),_}})}
                ${Iv({loading:e.shortageLoading,error:e.shortageError,stats:e.shortageStats,list:e.shortageList,byFile:e.shortageByFile,byTime:e.shortageByTime,db:e.shortageDb??void 0,onRefresh:()=>fi(e),onDelete:h=>Hu(e,h),showAddForm:e.shortageShowAddForm,onOpenAddForm:()=>e.shortageShowAddForm=!0,onCloseAddForm:()=>e.shortageShowAddForm=!1,onAdd:async h=>{const _=await Ku(e,h);return _&&(e.shortageShowAddForm=!1),_}})}
              `:$}

        ${e.tab==="sessions"?bv({basePath:e.basePath,loading:e.procurementLoading,error:e.procurementError,suggestions:e.procurementSuggestions,selectedKeys:e.procurementSelectedKeys,approvedKeys:e.procurementApprovedKeys,approveBusy:e.procurementApproveBusy,approveResult:e.procurementApproveResult,filterQuery:e.procurementFilterQuery,sortBy:e.procurementSortBy,sortDir:e.procurementSortDir,page:e.procurementPage,pageSize:e.procurementPageSize,onRefresh:()=>(e.procurementPage=1,e.loadProcurementSuggestions()),onToggleSelect:h=>{e.procurementSelectedKeys.includes(h)?e.procurementSelectedKeys=e.procurementSelectedKeys.filter(_=>_!==h):e.procurementSelectedKeys=[...e.procurementSelectedKeys,h]},onApprove:h=>{if(typeof window<"u"&&!window.confirm(g("procurement.approveConfirm")))return;const _=[{product_key:h.product_key,product_name:h.product_name,specification:h.specification,shortfall:h.shortfall,code:h.code}];cr(e,_).then(C=>{C&&(C.approved_count??0)>0&&(e.procurementApprovedKeys=[...e.procurementApprovedKeys,Te(h)])})},onApproveBatch:()=>{const h=e.procurementSuggestions.filter(C=>e.procurementSelectedKeys.includes(Te(C)));if(h.length===0||typeof window<"u"&&!window.confirm(g("procurement.approveBatchConfirm",{count:String(h.length)})))return;const _=h.map(C=>({product_key:C.product_key,product_name:C.product_name,specification:C.specification,shortfall:C.shortfall,code:C.code}));cr(e,_).then(C=>{if(C&&(C.approved_count??0)>0){const R=h.map(z=>Te(z));e.procurementApprovedKeys=[...e.procurementApprovedKeys,...R],e.procurementSelectedKeys=e.procurementSelectedKeys.filter(z=>!R.includes(z))}})},onFilterQueryChange:h=>{e.procurementFilterQuery=h,e.procurementPage=1},onSortByChange:h=>{e.procurementSortBy=h,e.procurementPage=1},onSortDirChange:h=>{e.procurementSortDir=h,e.procurementPage=1},onPageChange:h=>{e.procurementPage=Math.max(1,h)},onPageSizeChange:h=>{e.procurementPageSize=Math.max(1,h),e.procurementPage=1}}):$}

        ${Fp(e)}

        ${e.tab==="cron"?vv({basePath:e.basePath,loading:e.fulfillDraftsLoading,error:e.fulfillDraftsError,drafts:e.fulfillDrafts,detail:e.fulfillDetail,detailId:e.fulfillDetailId,confirmBusy:e.fulfillConfirmBusy,confirmResult:e.fulfillConfirmResult,filterQuery:e.fulfillFilterQuery,sortBy:e.fulfillSortBy,sortDir:e.fulfillSortDir,page:e.fulfillPage,pageSize:e.fulfillPageSize,onRefresh:()=>(e.fulfillPage=1,e.loadFulfillDrafts()),onSelectDraft:h=>Gd(e,h),onConfirm:h=>{var U;const _=e.fulfillDetailId===h?e.fulfillDetail:null,C=((U=_==null?void 0:_.lines)==null?void 0:U.length)??0,R=((_==null?void 0:_.lines)??[]).reduce((H,K)=>H+Number(K.amount??0),0),z=C>0?g("fulfill.confirmPrompt",{count:String(C),amount:R.toFixed(2)}):g("fulfill.confirmPromptSimple");typeof window<"u"&&window.confirm(z)&&Vd(e,h).then(H=>{H!=null&&H.order_id&&e.loadProcurementSuggestions()})},onClearDetail:()=>{e.fulfillDetail=null,e.fulfillDetailId=null,e.fulfillConfirmResult=null},onFilterQueryChange:h=>{e.fulfillFilterQuery=h,e.fulfillPage=1},onSortByChange:h=>{e.fulfillSortBy=h,e.fulfillPage=1},onSortDirChange:h=>{e.fulfillSortDir=h,e.fulfillPage=1},onPageChange:h=>{e.fulfillPage=Math.max(1,h)},onPageSizeChange:h=>{e.fulfillPageSize=Math.max(1,h),e.fulfillPage=1}}):$}

        ${e.tab==="agents"?Mg({loading:e.agentsLoading,error:e.agentsError,agentsList:e.agentsList,selectedAgentId:p,activePanel:e.agentsPanel,configForm:f,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,channelsLoading:e.channelsLoading,channelsError:e.channelsError,channelsSnapshot:e.channelsSnapshot,channelsLastSuccess:e.channelsLastSuccess,cronLoading:e.cronLoading,cronStatus:e.cronStatus,cronJobs:e.cronJobs,cronError:e.cronError,agentFilesLoading:e.agentFilesLoading,agentFilesError:e.agentFilesError,agentFilesList:e.agentFilesList,agentFileActive:e.agentFileActive,agentFileContents:e.agentFileContents,agentFileDrafts:e.agentFileDrafts,agentFileSaving:e.agentFileSaving,agentIdentityLoading:e.agentIdentityLoading,agentIdentityError:e.agentIdentityError,agentIdentityById:e.agentIdentityById,agentSkillsLoading:e.agentSkillsLoading,agentSkillsReport:e.agentSkillsReport,agentSkillsError:e.agentSkillsError,agentSkillsAgentId:e.agentSkillsAgentId,skillsFilter:e.skillsFilter,onRefresh:async()=>{var _,C;await Ks(e);const h=((C=(_=e.agentsList)==null?void 0:_.agents)==null?void 0:C.map(R=>R.id))??[];h.length>0&&Oa(e,h)},onSelectAgent:h=>{e.agentsSelectedId!==h&&(e.agentsSelectedId=h,e.agentFilesList=null,e.agentFilesError=null,e.agentFilesLoading=!1,e.agentFileActive=null,e.agentFileContents={},e.agentFileDrafts={},e.agentSkillsReport=null,e.agentSkillsError=null,e.agentSkillsAgentId=null,Na(e,h),e.agentsPanel==="files"&&Vi(e,h),e.agentsPanel==="skills"&&jn(e,h))},onSelectPanel:h=>{var _;e.agentsPanel=h,h==="files"&&p&&((_=e.agentFilesList)==null?void 0:_.agentId)!==p&&(e.agentFilesList=null,e.agentFilesError=null,e.agentFileActive=null,e.agentFileContents={},e.agentFileDrafts={},Vi(e,p)),h==="skills"&&p&&jn(e,p),h==="channels"&&Ae(e,!1),h==="cron"&&e.loadCron()},onLoadFiles:h=>Vi(e,h),onSelectFile:h=>{e.agentFileActive=h,p&&tg(e,p,h)},onFileDraftChange:(h,_)=>{e.agentFileDrafts={...e.agentFileDrafts,[h]:_}},onFileReset:h=>{const _=e.agentFileContents[h]??"";e.agentFileDrafts={...e.agentFileDrafts,[h]:_}},onFileSave:h=>{if(!p)return;const _=e.agentFileDrafts[h]??e.agentFileContents[h]??"";ng(e,p,h,_)},onToolsProfileChange:(h,_,C)=>{var H;if(!f)return;const R=(H=f.agents)==null?void 0:H.list;if(!Array.isArray(R))return;const z=R.findIndex(K=>K&&typeof K=="object"&&"id"in K&&K.id===h);if(z<0)return;const U=["agents","list",z,"tools"];_?xe(e,[...U,"profile"],_):qe(e,[...U,"profile"]),C&&qe(e,[...U,"allow"])},onToolsOverridesChange:(h,_,C)=>{var H;if(!f)return;const R=(H=f.agents)==null?void 0:H.list;if(!Array.isArray(R))return;const z=R.findIndex(K=>K&&typeof K=="object"&&"id"in K&&K.id===h);if(z<0)return;const U=["agents","list",z,"tools"];_.length>0?xe(e,[...U,"alsoAllow"],_):qe(e,[...U,"alsoAllow"]),C.length>0?xe(e,[...U,"deny"],C):qe(e,[...U,"deny"])},onConfigReload:()=>Be(e),onConfigSave:()=>Kn(e),onChannelsRefresh:()=>Ae(e,!1),onCronRefresh:()=>e.loadCron(),onSkillsFilterChange:h=>e.skillsFilter=h,onSkillsRefresh:()=>{p&&jn(e,p)},onAgentSkillToggle:(h,_,C)=>{var ge,O,ae;if(!f)return;const R=(ge=f.agents)==null?void 0:ge.list;if(!Array.isArray(R))return;const z=R.findIndex(le=>le&&typeof le=="object"&&"id"in le&&le.id===h);if(z<0)return;const U=R[z],H=_.trim();if(!H)return;const K=((ae=(O=e.agentSkillsReport)==null?void 0:O.skills)==null?void 0:ae.map(le=>le.name).filter(Boolean))??[],B=(Array.isArray(U.skills)?U.skills.map(le=>String(le).trim()).filter(Boolean):void 0)??K,ee=new Set(B);C?ee.add(H):ee.delete(H),xe(e,["agents","list",z,"skills"],[...ee])},onAgentSkillsClear:h=>{var R;if(!f)return;const _=(R=f.agents)==null?void 0:R.list;if(!Array.isArray(_))return;const C=_.findIndex(z=>z&&typeof z=="object"&&"id"in z&&z.id===h);C<0||qe(e,["agents","list",C,"skills"])},onAgentSkillsDisableAll:h=>{var R;if(!f)return;const _=(R=f.agents)==null?void 0:R.list;if(!Array.isArray(_))return;const C=_.findIndex(z=>z&&typeof z=="object"&&"id"in z&&z.id===h);C<0||xe(e,["agents","list",C,"skills"],[])},onModelChange:(h,_)=>{var K;if(!f)return;const C=(K=f.agents)==null?void 0:K.list;if(!Array.isArray(C))return;const R=C.findIndex(Y=>Y&&typeof Y=="object"&&"id"in Y&&Y.id===h);if(R<0)return;const z=["agents","list",R,"model"];if(!_){qe(e,z);return}const U=C[R],H=U==null?void 0:U.model;if(H&&typeof H=="object"&&!Array.isArray(H)){const Y=H.fallbacks,B={primary:_,...Array.isArray(Y)?{fallbacks:Y}:{}};xe(e,z,B)}else xe(e,z,_)},onModelFallbacksChange:(h,_)=>{var ge;if(!f)return;const C=(ge=f.agents)==null?void 0:ge.list;if(!Array.isArray(C))return;const R=C.findIndex(O=>O&&typeof O=="object"&&"id"in O&&O.id===h);if(R<0)return;const z=["agents","list",R,"model"],U=C[R],H=_.map(O=>O.trim()).filter(Boolean),K=U.model,B=(()=>{if(typeof K=="string")return K.trim()||null;if(K&&typeof K=="object"&&!Array.isArray(K)){const O=K.primary;if(typeof O=="string")return O.trim()||null}return null})();if(H.length===0){B?xe(e,z,B):qe(e,z);return}xe(e,z,B?{primary:B,fallbacks:H}:{fallbacks:H})}}):$}

        ${e.tab==="skills"?cy({loading:e.skillsLoading,report:e.skillsReport,error:e.skillsError,filter:e.skillsFilter,edits:e.skillEdits,messages:e.skillMessages,busyKey:e.skillsBusyKey,onFilterChange:h=>e.skillsFilter=h,onRefresh:()=>$n(e,{clearMessages:!0}),onToggle:(h,_)=>Gu(e,h,_),onEdit:(h,_)=>Wu(e,h,_),onSaveKey:h=>Vu(e,h),onInstall:(h,_,C)=>Qu(e,h,_,C)}):$}

        ${e.tab==="nodes"?Yv({loading:e.nodesLoading,nodes:e.nodes,devicesLoading:e.devicesLoading,devicesError:e.devicesError,devicesList:e.devicesList,configForm:e.configForm??((A=e.configSnapshot)==null?void 0:A.config),configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,configFormMode:e.configFormMode,execApprovalsLoading:e.execApprovalsLoading,execApprovalsSaving:e.execApprovalsSaving,execApprovalsDirty:e.execApprovalsDirty,execApprovalsSnapshot:e.execApprovalsSnapshot,execApprovalsForm:e.execApprovalsForm,execApprovalsSelectedAgent:e.execApprovalsSelectedAgent,execApprovalsTarget:e.execApprovalsTarget,execApprovalsTargetNodeId:e.execApprovalsTargetNodeId,onRefresh:()=>ci(e),onDevicesRefresh:()=>st(e),onDeviceApprove:h=>Eu(e,h),onDeviceReject:h=>Ru(e,h),onDeviceRotate:(h,_,C)=>Lu(e,{deviceId:h,role:_,scopes:C}),onDeviceRevoke:(h,_)=>Iu(e,{deviceId:h,role:_}),onLoadConfig:()=>Be(e),onLoadExecApprovals:()=>{const h=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return eo(e,h)},onBindDefault:h=>{h?xe(e,["tools","exec","node"],h):qe(e,["tools","exec","node"])},onBindAgent:(h,_)=>{const C=["agents","list",h,"tools","exec","node"];_?xe(e,C,_):qe(e,C)},onSaveBindings:()=>Kn(e),onExecApprovalsTargetChange:(h,_)=>{e.execApprovalsTarget=h,e.execApprovalsTargetNodeId=_,e.execApprovalsSnapshot=null,e.execApprovalsForm=null,e.execApprovalsDirty=!1,e.execApprovalsSelectedAgent=null},onExecApprovalsSelectAgent:h=>{e.execApprovalsSelectedAgent=h},onExecApprovalsPatch:(h,_)=>Nu(e,h,_),onExecApprovalsRemove:h=>Ou(e,h),onSaveExecApprovals:()=>{const h=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return Fu(e,h)}}):$}

        ${e.tab==="chat"?Qm({sessionKey:e.sessionKey,onSessionKeyChange:h=>{e.sessionKey=h,e.chatMessage="",e.chatAttachments=[],e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.chatQueue=[],e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:h,lastActiveSessionKey:h}),e.loadAssistantIdentity(),yn(e),gs(e)},thinkingLevel:e.chatThinkingLevel,showThinking:a,loading:e.chatLoading,sending:e.chatSending,compactionStatus:e.compactionStatus,assistantAvatarUrl:c,messages:e.chatMessages,toolMessages:e.chatToolMessages,stream:e.chatStream,streamStartedAt:e.chatStreamStartedAt,draft:e.chatMessage,queue:e.chatQueue,connected:e.connected,canSend:e.connected,disabledReason:s,error:e.lastError,sessions:e.sessionsResult,focusMode:r,onRefresh:()=>(e.resetToolStream(),Promise.all([yn(e),gs(e)])),onToggleFocusMode:()=>{e.onboarding||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})},onChatScroll:h=>e.handleChatScroll(h),onDraftChange:h=>e.chatMessage=h,attachments:e.chatAttachments,onAttachmentsChange:h=>e.chatAttachments=h,uploadedFile:e.chatUploadedFile,onFileSelect:h=>e.handleUploadChatFile(h),onClearUploadedFile:()=>e.clearChatUploadedFile(),composeDragOver:e.chatComposeDragOver,onComposeDragOver:()=>e.setChatComposeDragOver(!0),onComposeDragLeave:()=>e.setChatComposeDragOver(!1),onComposeDrop:h=>e.handleComposeDrop(h),onSend:()=>e.handleSendChat(),canAbort:!!e.chatRunId,onAbort:()=>void e.handleAbortChat(),onQueueRemove:h=>e.removeQueuedMessage(h),onNewSession:()=>e.handleSendChat("/new",{restoreDraft:!0}),showNewMessages:e.chatNewMessagesBelow&&!e.chatManualRefreshInFlight,onScrollToBottom:()=>e.scrollToBottom(),sidebarOpen:e.sidebarOpen,sidebarContent:e.sidebarContent,sidebarError:e.sidebarError,splitRatio:e.splitRatio,onOpenSidebar:h=>e.handleOpenSidebar(h),onCloseSidebar:()=>e.handleCloseSidebar(),onSplitRatioChange:h=>e.handleSplitRatioChange(h),assistantName:e.assistantName,assistantAvatar:e.assistantAvatar}):$}

        ${e.tab==="config"?gv({raw:e.configRaw,originalRaw:e.configRawOriginal,valid:e.configValid,issues:e.configIssues,loading:e.configLoading,saving:e.configSaving,applying:e.configApplying,updating:e.updateRunning,connected:e.connected,schema:e.configSchema,schemaLoading:e.configSchemaLoading,uiHints:e.configUiHints,formMode:e.configFormMode,formValue:e.configForm,originalValue:e.configFormOriginal,searchQuery:e.configSearchQuery,activeSection:e.configActiveSection,activeSubsection:e.configActiveSubsection,onRawChange:h=>{e.configRaw=h},onFormModeChange:h=>e.configFormMode=h,onFormPatch:(h,_)=>xe(e,h,_),onSearchChange:h=>e.configSearchQuery=h,onSectionChange:h=>{e.configActiveSection=h,e.configActiveSubsection=null},onSubsectionChange:h=>e.configActiveSubsection=h,onReload:()=>Be(e),onSave:()=>Kn(e),onApply:()=>ld(e),onUpdate:()=>cd(e)}):$}

        ${e.tab==="debug"?wv({loading:e.debugLoading,status:e.debugStatus,health:e.debugHealth,models:e.debugModels,heartbeat:e.debugHeartbeat,eventLog:e.eventLog,callMethod:e.debugCallMethod,callParams:e.debugCallParams,callResult:e.debugCallResult,callError:e.debugCallError,onCallMethodChange:h=>e.debugCallMethod=h,onCallParamsChange:h=>e.debugCallParams=h,onRefresh:()=>li(e),onCall:()=>Td(e)}):$}

        ${e.tab==="logs"?_v({loading:e.logsLoading,error:e.logsError,file:e.logsFile,entries:e.logsEntries,filterText:e.logsFilterText,levelFilters:e.logsLevelFilters,autoFollow:e.logsAutoFollow,truncated:e.logsTruncated,onFilterTextChange:h=>e.logsFilterText=h,onLevelToggle:(h,_)=>{e.logsLevelFilters={...e.logsLevelFilters,[h]:_}},onToggleAutoFollow:h=>e.logsAutoFollow=h,onRefresh:()=>Os(e,{reset:!0}),onExport:(h,_)=>e.exportLogs(h,_),onScroll:h=>e.handleLogsScroll(h)}):$}
      </main>
      ${xv(e)}
      ${kv(e)}
    </div>
  `}var hy=Object.defineProperty,my=Object.getOwnPropertyDescriptor,v=(e,t,n,i)=>{for(var s=i>1?void 0:i?my(t,n):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(s=(i?r(t,n,s):r(s))||s);return i&&s&&hy(t,n,s),s};const is=ro({});function vy(){if(!window.location.search)return!1;const t=new URLSearchParams(window.location.search).get("onboarding");if(!t)return!1;const n=t.trim().toLowerCase();return n==="1"||n==="true"||n==="yes"||n==="on"}let m=class extends Dt{constructor(){super(),this.i18nController=new ed(this),this.settings=ef(),this.password="",this.tab="chat",this.onboarding=vy(),this.connected=!1,this.theme=this.settings.theme??"system",this.themeResolved="dark",this.hello=null,this.lastError=null,this.eventLog=[],this.eventLogBuffer=[],this.toolStreamSyncTimer=null,this.sidebarCloseTimer=null,this.assistantName=is.name,this.assistantAvatar=is.avatar,this.assistantAgentId=is.agentId??null,this.sessionKey=this.settings.sessionKey,this.chatLoading=!1,this.chatSending=!1,this.chatMessage="",this.chatMessages=[],this.chatToolMessages=[],this.chatStream=null,this.chatStreamStartedAt=null,this.chatRunId=null,this.compactionStatus=null,this.chatAvatarUrl=null,this.chatThinkingLevel=null,this.chatQueue=[],this.chatAttachments=[],this.chatUploadedFile=null,this.chatComposeDragOver=!1,this.chatManualRefreshInFlight=!1,this.sidebarOpen=!1,this.sidebarContent=null,this.sidebarError=null,this.splitRatio=this.settings.splitRatio,this.nodesLoading=!1,this.nodes=[],this.devicesLoading=!1,this.devicesError=null,this.devicesList=null,this.execApprovalsLoading=!1,this.execApprovalsSaving=!1,this.execApprovalsDirty=!1,this.execApprovalsSnapshot=null,this.execApprovalsForm=null,this.execApprovalsSelectedAgent=null,this.execApprovalsTarget="gateway",this.execApprovalsTargetNodeId=null,this.execApprovalQueue=[],this.execApprovalBusy=!1,this.execApprovalError=null,this.pendingGatewayUrl=null,this.configLoading=!1,this.configRaw=`{
}
`,this.configRawOriginal="",this.configValid=null,this.configIssues=[],this.configSaving=!1,this.configApplying=!1,this.updateRunning=!1,this.applySessionKey=this.settings.lastActiveSessionKey,this.configSnapshot=null,this.configSchema=null,this.configSchemaVersion=null,this.configSchemaLoading=!1,this.configUiHints={},this.configForm=null,this.configFormOriginal=null,this.configFormDirty=!1,this.configFormMode="form",this.configSearchQuery="",this.configActiveSection=null,this.configActiveSubsection=null,this.channelsLoading=!1,this.channelsSnapshot=null,this.channelsError=null,this.channelsLastSuccess=null,this.bkContent="",this.bkLoading=!1,this.bkError=null,this.bkSaving=!1,this.bkLastSuccess=null,this.bkDependentFiles=null,this.whatsappLoginMessage=null,this.whatsappLoginQrDataUrl=null,this.whatsappLoginConnected=null,this.whatsappBusy=!1,this.nostrProfileFormState=null,this.nostrProfileAccountId=null,this.presenceLoading=!1,this.presenceEntries=[],this.presenceError=null,this.presenceStatus=null,this.oosLoading=!1,this.oosError=null,this.oosStats=null,this.oosList=[],this.oosByFile=[],this.oosByTime=[],this.oosShowAddForm=!1,this.oosDb=null,this.shortageLoading=!1,this.shortageError=null,this.shortageStats=null,this.shortageList=[],this.shortageByFile=[],this.shortageByTime=[],this.shortageShowAddForm=!1,this.shortageDb=null,this.overviewOosStats=null,this.overviewOosError=null,this.overviewShortageStats=null,this.overviewShortageError=null,this.agentsLoading=!1,this.agentsList=null,this.agentsError=null,this.agentsSelectedId=null,this.agentsPanel="overview",this.agentFilesLoading=!1,this.agentFilesError=null,this.agentFilesList=null,this.agentFileContents={},this.agentFileDrafts={},this.agentFileActive=null,this.agentFileSaving=!1,this.agentIdentityLoading=!1,this.agentIdentityError=null,this.agentIdentityById={},this.agentSkillsLoading=!1,this.agentSkillsError=null,this.agentSkillsReport=null,this.agentSkillsAgentId=null,this.sessionsLoading=!1,this.sessionsResult=null,this.sessionsError=null,this.sessionsFilterActive="",this.sessionsFilterLimit="120",this.sessionsIncludeGlobal=!0,this.sessionsIncludeUnknown=!1,this.usageLoading=!1,this.usageResult=null,this.usageCostSummary=null,this.usageError=null,this.usageRequestSeq=0,this.usageTimeSeriesRequestSeq=0,this.usageSessionLogsRequestSeq=0,this.usageStartDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageEndDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageSelectedSessions=[],this.usageSelectedDays=[],this.usageSelectedHours=[],this.usageChartMode="tokens",this.usageDailyChartMode="by-type",this.usageTimeSeriesMode="per-turn",this.usageTimeSeriesBreakdownMode="by-type",this.usageTimeSeries=null,this.usageTimeSeriesLoading=!1,this.usageTimeSeriesCursorStart=null,this.usageTimeSeriesCursorEnd=null,this.usageSessionLogs=null,this.usageSessionLogsLoading=!1,this.usageSessionLogsExpanded=!1,this.usageQuery="",this.usageQueryDraft="",this.usageSessionSort="recent",this.usageSessionSortDir="desc",this.usageRecentSessions=[],this.usageTimeZone="local",this.usageContextExpanded=!1,this.usageHeaderPinned=!1,this.usageSessionsTab="all",this.usageVisibleColumns=["channel","agent","provider","model","messages","tools","errors","duration"],this.usageLogFilterRoles=[],this.usageLogFilterTools=[],this.usageLogFilterHasTools=!1,this.usageLogFilterQuery="",this.usageQueryDebounceTimer=null,this.workFilePaths=[],this.workOriginalFileNamesByPath={},this.workRunning=!1,this.workProgressStage=0,this._workProgressInterval=null,this.workRunStatus="idle",this.workRunId=null,this.workPendingChoices=[],this.workSelections={},this.workResult=null,this.workError=null,this.workCustomerLevel="B_QUOTE",this.workDoRegisterOos=!0,this.workPendingQuotationDraft=null,this.workQuotationDraftSaveStatus=null,this.workTextInput="",this.workTextGenerating=!1,this.workTextError=null,this.cronLoading=!1,this.cronJobs=[],this.cronStatus=null,this.cronError=null,this.cronForm={...Vf},this.cronRunsJobId=null,this.cronRuns=[],this.cronBusy=!1,this.fulfillDraftsLoading=!1,this.fulfillDraftsError=null,this.fulfillDrafts=[],this.fulfillDetail=null,this.fulfillDetailId=null,this.fulfillConfirmBusy=!1,this.fulfillConfirmResult=null,this.fulfillFilterQuery="",this.fulfillSortBy="created_at",this.fulfillSortDir="desc",this.fulfillPage=1,this.fulfillPageSize=10,this.procurementLoading=!1,this.procurementError=null,this.procurementSuggestions=[],this.procurementSelectedKeys=[],this.procurementApprovedKeys=[],this.procurementApproveBusy=!1,this.procurementApproveResult=null,this.procurementFilterQuery="",this.procurementSortBy="uploaded_at",this.procurementSortDir="desc",this.procurementPage=1,this.procurementPageSize=10,this.skillsLoading=!1,this.skillsReport=null,this.skillsError=null,this.skillsFilter="",this.skillEdits={},this.skillsBusyKey=null,this.skillMessages={},this.debugLoading=!1,this.debugStatus=null,this.debugHealth=null,this.debugModels=[],this.debugHeartbeat=null,this.debugCallMethod="",this.debugCallParams="{}",this.debugCallResult=null,this.debugCallError=null,this.logsLoading=!1,this.logsError=null,this.logsFile=null,this.logsEntries=[],this.logsFilterText="",this.logsLevelFilters={...Gf},this.logsAutoFollow=!0,this.logsTruncated=!1,this.logsCursor=null,this.logsLastFetchAt=null,this.logsLimit=500,this.logsMaxBytes=25e4,this.logsAtBottom=!0,this.client=null,this.chatScrollFrame=null,this.chatScrollTimeout=null,this.chatHasAutoScrolled=!1,this.chatUserNearBottom=!0,this.chatNewMessagesBelow=!1,this.nodesPollInterval=null,this.logsPollInterval=null,this.debugPollInterval=null,this.logsScrollFrame=null,this.toolStreamById=new Map,this.toolStreamOrder=[],this.refreshSessionsAfterChat=new Set,this.basePath="",this.popStateHandler=()=>gf(this),this.themeMedia=null,this.themeMediaHandler=null,this.topbarObserver=null,Fs(this.settings.locale)&&gn.setLocale(this.settings.locale)}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),cp(this)}firstUpdated(){dp(this)}disconnectedCallback(){up(this),super.disconnectedCallback()}updated(e){e.has("workRunning")&&(this.workRunning?(this.workProgressStage=this.workRunStatus==="resuming"?1:0,this._workProgressInterval!=null&&(clearInterval(this._workProgressInterval),this._workProgressInterval=null)):(this._workProgressInterval!=null&&(clearInterval(this._workProgressInterval),this._workProgressInterval=null),this.workRunStatus==="done"&&(this.workProgressStage=2))),fp(this,e)}connect(){Cl(this)}handleChatScroll(e){Sd(this,e)}handleLogsScroll(e){Ad(this,e)}exportLogs(e,t){_d(e,t)}resetToolStream(){hi(this)}resetChatScroll(){sr(this)}scrollToBottom(e){sr(this),wn(this,!0,!!(e!=null&&e.smooth))}async loadAssistantIdentity(){await Al(this)}applySettings(e){nt(this,e)}setTab(e){af(this,e)}setTheme(e,t){lf(this,e,t)}async loadOverview(){await vl(this)}async loadCron(){await so(this)}async loadFulfillDrafts(){await mf(this)}async loadProcurementSuggestions(){await vf(this)}async handleAbortChat(){await $l(this)}removeQueuedMessage(e){Hf(this,e)}async handleUploadChatFile(e){try{const t=await Df(this.basePath,e);this.chatUploadedFile=t,this.lastError=null}catch(t){this.lastError=t instanceof Error?t.message:String(t)}}clearChatUploadedFile(){this.chatUploadedFile=null}setChatComposeDragOver(e){this.chatComposeDragOver=e}async handleComposeDrop(e){this.chatComposeDragOver=!1,await this.handleUploadChatFile(e)}async handleSendChat(e,t){await Kf(this,e,t)}async handleWhatsAppStart(e){await ud(this,e)}async handleWhatsAppWait(){await fd(this)}async handleWhatsAppLogout(){await pd(this)}async handleChannelConfigSave(){await gd(this)}async handleChannelConfigReload(){await hd(this)}handleNostrProfileEdit(e,t){yd(this,e,t)}handleNostrProfileCancel(){bd(this)}handleNostrProfileFieldChange(e,t){wd(this,e,t)}async handleNostrProfileSave(){await xd(this)}async handleNostrProfileImport(){await kd(this)}handleNostrProfileToggleAdvanced(){$d(this)}async handleExecApprovalDecision(e){const t=this.execApprovalQueue[0];if(!(!t||!this.client||this.execApprovalBusy)){this.execApprovalBusy=!0,this.execApprovalError=null;try{await this.client.request("exec.approval.resolve",{id:t.id,decision:e}),this.execApprovalQueue=this.execApprovalQueue.filter(n=>n.id!==t.id)}catch(n){this.execApprovalError=`Exec approval failed: ${String(n)}`}finally{this.execApprovalBusy=!1}}}handleGatewayUrlConfirm(){const e=this.pendingGatewayUrl;e&&(this.pendingGatewayUrl=null,nt(this,{...this.settings,gatewayUrl:e}),this.connect())}handleGatewayUrlCancel(){this.pendingGatewayUrl=null}handleOpenSidebar(e){this.sidebarCloseTimer!=null&&(window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=null),this.sidebarContent=e,this.sidebarError=null,this.sidebarOpen=!0}handleCloseSidebar(){this.sidebarOpen=!1,this.sidebarCloseTimer!=null&&window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=window.setTimeout(()=>{this.sidebarOpen||(this.sidebarContent=null,this.sidebarError=null,this.sidebarCloseTimer=null)},200)}handleSplitRatioChange(e){const t=Math.max(.4,Math.min(.7,e));this.splitRatio=t,this.applySettings({...this.settings,splitRatio:t})}render(){return gy(this)}};v([y()],m.prototype,"settings",2);v([y()],m.prototype,"password",2);v([y()],m.prototype,"tab",2);v([y()],m.prototype,"onboarding",2);v([y()],m.prototype,"connected",2);v([y()],m.prototype,"theme",2);v([y()],m.prototype,"themeResolved",2);v([y()],m.prototype,"hello",2);v([y()],m.prototype,"lastError",2);v([y()],m.prototype,"eventLog",2);v([y()],m.prototype,"assistantName",2);v([y()],m.prototype,"assistantAvatar",2);v([y()],m.prototype,"assistantAgentId",2);v([y()],m.prototype,"sessionKey",2);v([y()],m.prototype,"chatLoading",2);v([y()],m.prototype,"chatSending",2);v([y()],m.prototype,"chatMessage",2);v([y()],m.prototype,"chatMessages",2);v([y()],m.prototype,"chatToolMessages",2);v([y()],m.prototype,"chatStream",2);v([y()],m.prototype,"chatStreamStartedAt",2);v([y()],m.prototype,"chatRunId",2);v([y()],m.prototype,"compactionStatus",2);v([y()],m.prototype,"chatAvatarUrl",2);v([y()],m.prototype,"chatThinkingLevel",2);v([y()],m.prototype,"chatQueue",2);v([y()],m.prototype,"chatAttachments",2);v([y()],m.prototype,"chatUploadedFile",2);v([y()],m.prototype,"chatComposeDragOver",2);v([y()],m.prototype,"chatManualRefreshInFlight",2);v([y()],m.prototype,"sidebarOpen",2);v([y()],m.prototype,"sidebarContent",2);v([y()],m.prototype,"sidebarError",2);v([y()],m.prototype,"splitRatio",2);v([y()],m.prototype,"nodesLoading",2);v([y()],m.prototype,"nodes",2);v([y()],m.prototype,"devicesLoading",2);v([y()],m.prototype,"devicesError",2);v([y()],m.prototype,"devicesList",2);v([y()],m.prototype,"execApprovalsLoading",2);v([y()],m.prototype,"execApprovalsSaving",2);v([y()],m.prototype,"execApprovalsDirty",2);v([y()],m.prototype,"execApprovalsSnapshot",2);v([y()],m.prototype,"execApprovalsForm",2);v([y()],m.prototype,"execApprovalsSelectedAgent",2);v([y()],m.prototype,"execApprovalsTarget",2);v([y()],m.prototype,"execApprovalsTargetNodeId",2);v([y()],m.prototype,"execApprovalQueue",2);v([y()],m.prototype,"execApprovalBusy",2);v([y()],m.prototype,"execApprovalError",2);v([y()],m.prototype,"pendingGatewayUrl",2);v([y()],m.prototype,"configLoading",2);v([y()],m.prototype,"configRaw",2);v([y()],m.prototype,"configRawOriginal",2);v([y()],m.prototype,"configValid",2);v([y()],m.prototype,"configIssues",2);v([y()],m.prototype,"configSaving",2);v([y()],m.prototype,"configApplying",2);v([y()],m.prototype,"updateRunning",2);v([y()],m.prototype,"applySessionKey",2);v([y()],m.prototype,"configSnapshot",2);v([y()],m.prototype,"configSchema",2);v([y()],m.prototype,"configSchemaVersion",2);v([y()],m.prototype,"configSchemaLoading",2);v([y()],m.prototype,"configUiHints",2);v([y()],m.prototype,"configForm",2);v([y()],m.prototype,"configFormOriginal",2);v([y()],m.prototype,"configFormDirty",2);v([y()],m.prototype,"configFormMode",2);v([y()],m.prototype,"configSearchQuery",2);v([y()],m.prototype,"configActiveSection",2);v([y()],m.prototype,"configActiveSubsection",2);v([y()],m.prototype,"channelsLoading",2);v([y()],m.prototype,"channelsSnapshot",2);v([y()],m.prototype,"channelsError",2);v([y()],m.prototype,"channelsLastSuccess",2);v([y()],m.prototype,"bkContent",2);v([y()],m.prototype,"bkLoading",2);v([y()],m.prototype,"bkError",2);v([y()],m.prototype,"bkSaving",2);v([y()],m.prototype,"bkLastSuccess",2);v([y()],m.prototype,"bkDependentFiles",2);v([y()],m.prototype,"whatsappLoginMessage",2);v([y()],m.prototype,"whatsappLoginQrDataUrl",2);v([y()],m.prototype,"whatsappLoginConnected",2);v([y()],m.prototype,"whatsappBusy",2);v([y()],m.prototype,"nostrProfileFormState",2);v([y()],m.prototype,"nostrProfileAccountId",2);v([y()],m.prototype,"presenceLoading",2);v([y()],m.prototype,"presenceEntries",2);v([y()],m.prototype,"presenceError",2);v([y()],m.prototype,"presenceStatus",2);v([y()],m.prototype,"oosLoading",2);v([y()],m.prototype,"oosError",2);v([y()],m.prototype,"oosStats",2);v([y()],m.prototype,"oosList",2);v([y()],m.prototype,"oosByFile",2);v([y()],m.prototype,"oosByTime",2);v([y()],m.prototype,"oosShowAddForm",2);v([y()],m.prototype,"oosDb",2);v([y()],m.prototype,"shortageLoading",2);v([y()],m.prototype,"shortageError",2);v([y()],m.prototype,"shortageStats",2);v([y()],m.prototype,"shortageList",2);v([y()],m.prototype,"shortageByFile",2);v([y()],m.prototype,"shortageByTime",2);v([y()],m.prototype,"shortageShowAddForm",2);v([y()],m.prototype,"shortageDb",2);v([y()],m.prototype,"overviewOosStats",2);v([y()],m.prototype,"overviewOosError",2);v([y()],m.prototype,"overviewShortageStats",2);v([y()],m.prototype,"overviewShortageError",2);v([y()],m.prototype,"agentsLoading",2);v([y()],m.prototype,"agentsList",2);v([y()],m.prototype,"agentsError",2);v([y()],m.prototype,"agentsSelectedId",2);v([y()],m.prototype,"agentsPanel",2);v([y()],m.prototype,"agentFilesLoading",2);v([y()],m.prototype,"agentFilesError",2);v([y()],m.prototype,"agentFilesList",2);v([y()],m.prototype,"agentFileContents",2);v([y()],m.prototype,"agentFileDrafts",2);v([y()],m.prototype,"agentFileActive",2);v([y()],m.prototype,"agentFileSaving",2);v([y()],m.prototype,"agentIdentityLoading",2);v([y()],m.prototype,"agentIdentityError",2);v([y()],m.prototype,"agentIdentityById",2);v([y()],m.prototype,"agentSkillsLoading",2);v([y()],m.prototype,"agentSkillsError",2);v([y()],m.prototype,"agentSkillsReport",2);v([y()],m.prototype,"agentSkillsAgentId",2);v([y()],m.prototype,"sessionsLoading",2);v([y()],m.prototype,"sessionsResult",2);v([y()],m.prototype,"sessionsError",2);v([y()],m.prototype,"sessionsFilterActive",2);v([y()],m.prototype,"sessionsFilterLimit",2);v([y()],m.prototype,"sessionsIncludeGlobal",2);v([y()],m.prototype,"sessionsIncludeUnknown",2);v([y()],m.prototype,"usageLoading",2);v([y()],m.prototype,"usageResult",2);v([y()],m.prototype,"usageCostSummary",2);v([y()],m.prototype,"usageError",2);v([y()],m.prototype,"usageStartDate",2);v([y()],m.prototype,"usageEndDate",2);v([y()],m.prototype,"usageSelectedSessions",2);v([y()],m.prototype,"usageSelectedDays",2);v([y()],m.prototype,"usageSelectedHours",2);v([y()],m.prototype,"usageChartMode",2);v([y()],m.prototype,"usageDailyChartMode",2);v([y()],m.prototype,"usageTimeSeriesMode",2);v([y()],m.prototype,"usageTimeSeriesBreakdownMode",2);v([y()],m.prototype,"usageTimeSeries",2);v([y()],m.prototype,"usageTimeSeriesLoading",2);v([y()],m.prototype,"usageTimeSeriesCursorStart",2);v([y()],m.prototype,"usageTimeSeriesCursorEnd",2);v([y()],m.prototype,"usageSessionLogs",2);v([y()],m.prototype,"usageSessionLogsLoading",2);v([y()],m.prototype,"usageSessionLogsExpanded",2);v([y()],m.prototype,"usageQuery",2);v([y()],m.prototype,"usageQueryDraft",2);v([y()],m.prototype,"usageSessionSort",2);v([y()],m.prototype,"usageSessionSortDir",2);v([y()],m.prototype,"usageRecentSessions",2);v([y()],m.prototype,"usageTimeZone",2);v([y()],m.prototype,"usageContextExpanded",2);v([y()],m.prototype,"usageHeaderPinned",2);v([y()],m.prototype,"usageSessionsTab",2);v([y()],m.prototype,"usageVisibleColumns",2);v([y()],m.prototype,"usageLogFilterRoles",2);v([y()],m.prototype,"usageLogFilterTools",2);v([y()],m.prototype,"usageLogFilterHasTools",2);v([y()],m.prototype,"usageLogFilterQuery",2);v([y()],m.prototype,"workFilePaths",2);v([y()],m.prototype,"workOriginalFileNamesByPath",2);v([y()],m.prototype,"workRunning",2);v([y()],m.prototype,"workProgressStage",2);v([y()],m.prototype,"workRunStatus",2);v([y()],m.prototype,"workRunId",2);v([y()],m.prototype,"workPendingChoices",2);v([y()],m.prototype,"workSelections",2);v([y()],m.prototype,"workResult",2);v([y()],m.prototype,"workError",2);v([y()],m.prototype,"workCustomerLevel",2);v([y()],m.prototype,"workDoRegisterOos",2);v([y()],m.prototype,"workPendingQuotationDraft",2);v([y()],m.prototype,"workQuotationDraftSaveStatus",2);v([y()],m.prototype,"workTextInput",2);v([y()],m.prototype,"workTextGenerating",2);v([y()],m.prototype,"workTextError",2);v([y()],m.prototype,"cronLoading",2);v([y()],m.prototype,"cronJobs",2);v([y()],m.prototype,"cronStatus",2);v([y()],m.prototype,"cronError",2);v([y()],m.prototype,"cronForm",2);v([y()],m.prototype,"cronRunsJobId",2);v([y()],m.prototype,"cronRuns",2);v([y()],m.prototype,"cronBusy",2);v([y()],m.prototype,"fulfillDraftsLoading",2);v([y()],m.prototype,"fulfillDraftsError",2);v([y()],m.prototype,"fulfillDrafts",2);v([y()],m.prototype,"fulfillDetail",2);v([y()],m.prototype,"fulfillDetailId",2);v([y()],m.prototype,"fulfillConfirmBusy",2);v([y()],m.prototype,"fulfillConfirmResult",2);v([y()],m.prototype,"fulfillFilterQuery",2);v([y()],m.prototype,"fulfillSortBy",2);v([y()],m.prototype,"fulfillSortDir",2);v([y()],m.prototype,"fulfillPage",2);v([y()],m.prototype,"fulfillPageSize",2);v([y()],m.prototype,"procurementLoading",2);v([y()],m.prototype,"procurementError",2);v([y()],m.prototype,"procurementSuggestions",2);v([y()],m.prototype,"procurementSelectedKeys",2);v([y()],m.prototype,"procurementApprovedKeys",2);v([y()],m.prototype,"procurementApproveBusy",2);v([y()],m.prototype,"procurementApproveResult",2);v([y()],m.prototype,"procurementFilterQuery",2);v([y()],m.prototype,"procurementSortBy",2);v([y()],m.prototype,"procurementSortDir",2);v([y()],m.prototype,"procurementPage",2);v([y()],m.prototype,"procurementPageSize",2);v([y()],m.prototype,"skillsLoading",2);v([y()],m.prototype,"skillsReport",2);v([y()],m.prototype,"skillsError",2);v([y()],m.prototype,"skillsFilter",2);v([y()],m.prototype,"skillEdits",2);v([y()],m.prototype,"skillsBusyKey",2);v([y()],m.prototype,"skillMessages",2);v([y()],m.prototype,"debugLoading",2);v([y()],m.prototype,"debugStatus",2);v([y()],m.prototype,"debugHealth",2);v([y()],m.prototype,"debugModels",2);v([y()],m.prototype,"debugHeartbeat",2);v([y()],m.prototype,"debugCallMethod",2);v([y()],m.prototype,"debugCallParams",2);v([y()],m.prototype,"debugCallResult",2);v([y()],m.prototype,"debugCallError",2);v([y()],m.prototype,"logsLoading",2);v([y()],m.prototype,"logsError",2);v([y()],m.prototype,"logsFile",2);v([y()],m.prototype,"logsEntries",2);v([y()],m.prototype,"logsFilterText",2);v([y()],m.prototype,"logsLevelFilters",2);v([y()],m.prototype,"logsAutoFollow",2);v([y()],m.prototype,"logsTruncated",2);v([y()],m.prototype,"logsCursor",2);v([y()],m.prototype,"logsLastFetchAt",2);v([y()],m.prototype,"logsLimit",2);v([y()],m.prototype,"logsMaxBytes",2);v([y()],m.prototype,"logsAtBottom",2);v([y()],m.prototype,"chatNewMessagesBelow",2);m=v([Ca("openclaw-app")],m);
//# sourceMappingURL=index-jQpf8YxB.js.map
