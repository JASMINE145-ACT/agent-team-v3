var Hl=Object.defineProperty;var ql=(e,t,n)=>t in e?Hl(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var j=(e,t,n)=>ql(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Tn=globalThis,vs=Tn.ShadowRoot&&(Tn.ShadyCSS===void 0||Tn.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ms=Symbol(),$o=new WeakMap;let Ga=class{constructor(t,n,i){if(this._$cssResult$=!0,i!==ms)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(vs&&t===void 0){const i=n!==void 0&&n.length===1;i&&(t=$o.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&$o.set(n,t))}return t}toString(){return this.cssText}};const Gl=e=>new Ga(typeof e=="string"?e:e+"",void 0,ms),Wl=(e,...t)=>{const n=e.length===1?e[0]:t.reduce((i,s,o)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[o+1],e[0]);return new Ga(n,e,ms)},Vl=(e,t)=>{if(vs)e.adoptedStyleSheets=t.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of t){const i=document.createElement("style"),s=Tn.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=n.cssText,e.appendChild(i)}},ko=vs?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const i of t.cssRules)n+=i.cssText;return Gl(n)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Jl,defineProperty:Ql,getOwnPropertyDescriptor:Yl,getOwnPropertyNames:Xl,getOwnPropertySymbols:Zl,getPrototypeOf:ec}=Object,He=globalThis,So=He.trustedTypes,tc=So?So.emptyScript:"",yi=He.reactiveElementPolyfillSupport,Gt=(e,t)=>e,Fn={toAttribute(e,t){switch(t){case Boolean:e=e?tc:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},ys=(e,t)=>!Jl(e,t),xo={attribute:!0,type:String,converter:Fn,reflect:!1,useDefault:!1,hasChanged:ys};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),He.litPropertyMetadata??(He.litPropertyMetadata=new WeakMap);let At=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=xo){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(t,n),!n.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,n);s!==void 0&&Ql(this.prototype,t,s)}}static getPropertyDescriptor(t,n,i){const{get:s,set:o}=Yl(this.prototype,t)??{get(){return this[n]},set(a){this[n]=a}};return{get:s,set(a){const r=s==null?void 0:s.call(this);o==null||o.call(this,a),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??xo}static _$Ei(){if(this.hasOwnProperty(Gt("elementProperties")))return;const t=ec(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Gt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Gt("properties"))){const n=this.properties,i=[...Xl(n),...Zl(n)];for(const s of i)this.createProperty(s,n[s])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[i,s]of n)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[n,i]of this.elementProperties){const s=this._$Eu(n,i);s!==void 0&&this._$Eh.set(s,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)n.unshift(ko(s))}else t!==void 0&&n.push(ko(t));return n}static _$Eu(t,n){const i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(n=>n(this))}addController(t){var n;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((n=t.hostConnected)==null||n.call(t))}removeController(t){var n;(n=this._$EO)==null||n.delete(t)}_$E_(){const t=new Map,n=this.constructor.elementProperties;for(const i of n.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Vl(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(n=>{var i;return(i=n.hostConnected)==null?void 0:i.call(n)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(n=>{var i;return(i=n.hostDisconnected)==null?void 0:i.call(n)})}attributeChangedCallback(t,n,i){this._$AK(t,i)}_$ET(t,n){var o;const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const a=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:Fn).toAttribute(n,i.type);this._$Em=t,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,n){var o,a;const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const r=i.getPropertyOptions(s),d=typeof r.converter=="function"?{fromAttribute:r.converter}:((o=r.converter)==null?void 0:o.fromAttribute)!==void 0?r.converter:Fn;this._$Em=s;const c=d.fromAttribute(n,r.type);this[s]=c??((a=this._$Ej)==null?void 0:a.get(s))??c,this._$Em=null}}requestUpdate(t,n,i,s=!1,o){var a;if(t!==void 0){const r=this.constructor;if(s===!1&&(o=this[t]),i??(i=r.getPropertyOptions(t)),!((i.hasChanged??ys)(o,n)||i.useDefault&&i.reflect&&o===((a=this._$Ej)==null?void 0:a.get(t))&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,n,{useDefault:i,reflect:s,wrapped:o},a){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,a??n??this[t]),o!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(n=void 0),this._$AL.set(t,n)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,a]of this._$Ep)this[o]=a;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,a]of s){const{wrapped:r}=a,d=this[o];r!==!0||this._$AL.has(o)||d===void 0||this.C(o,void 0,a,d)}}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),(i=this._$EO)==null||i.forEach(s=>{var o;return(o=s.hostUpdate)==null?void 0:o.call(s)}),this.update(n)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(n)}willUpdate(t){}_$AE(t){var n;(n=this._$EO)==null||n.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(n=>this._$ET(n,this[n]))),this._$EM()}updated(t){}firstUpdated(t){}};At.elementStyles=[],At.shadowRootOptions={mode:"open"},At[Gt("elementProperties")]=new Map,At[Gt("finalized")]=new Map,yi==null||yi({ReactiveElement:At}),(He.reactiveElementVersions??(He.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Wt=globalThis,Ao=e=>e,Pn=Wt.trustedTypes,_o=Pn?Pn.createPolicy("lit-html",{createHTML:e=>e}):void 0,Wa="$lit$",Ke=`lit$${Math.random().toFixed(9).slice(2)}$`,Va="?"+Ke,nc=`<${Va}>`,at=document,Xt=()=>at.createComment(""),Zt=e=>e===null||typeof e!="object"&&typeof e!="function",bs=Array.isArray,ic=e=>bs(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",bi=`[ 	
\f\r]`,Pt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Co=/-->/g,To=/>/g,Xe=RegExp(`>|${bi}(?:([^\\s"'>=/]+)(${bi}*=${bi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Eo=/'/g,Lo=/"/g,Ja=/^(?:script|style|textarea|title)$/i,sc=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),l=sc(1),Ge=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),Ro=new WeakMap,it=at.createTreeWalker(at,129);function Qa(e,t){if(!bs(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return _o!==void 0?_o.createHTML(t):t}const oc=(e,t)=>{const n=e.length-1,i=[];let s,o=t===2?"<svg>":t===3?"<math>":"",a=Pt;for(let r=0;r<n;r++){const d=e[r];let c,u,g=-1,f=0;for(;f<d.length&&(a.lastIndex=f,u=a.exec(d),u!==null);)f=a.lastIndex,a===Pt?u[1]==="!--"?a=Co:u[1]!==void 0?a=To:u[2]!==void 0?(Ja.test(u[2])&&(s=RegExp("</"+u[2],"g")),a=Xe):u[3]!==void 0&&(a=Xe):a===Xe?u[0]===">"?(a=s??Pt,g=-1):u[1]===void 0?g=-2:(g=a.lastIndex-u[2].length,c=u[1],a=u[3]===void 0?Xe:u[3]==='"'?Lo:Eo):a===Lo||a===Eo?a=Xe:a===Co||a===To?a=Pt:(a=Xe,s=void 0);const m=a===Xe&&e[r+1].startsWith("/>")?" ":"";o+=a===Pt?d+nc:g>=0?(i.push(c),d.slice(0,g)+Wa+d.slice(g)+Ke+m):d+Ke+(g===-2?r:m)}return[Qa(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class en{constructor({strings:t,_$litType$:n},i){let s;this.parts=[];let o=0,a=0;const r=t.length-1,d=this.parts,[c,u]=oc(t,n);if(this.el=en.createElement(c,i),it.currentNode=this.el.content,n===2||n===3){const g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(s=it.nextNode())!==null&&d.length<r;){if(s.nodeType===1){if(s.hasAttributes())for(const g of s.getAttributeNames())if(g.endsWith(Wa)){const f=u[a++],m=s.getAttribute(g).split(Ke),$=/([.?@])?(.*)/.exec(f);d.push({type:1,index:o,name:$[2],strings:m,ctor:$[1]==="."?rc:$[1]==="?"?lc:$[1]==="@"?cc:qn}),s.removeAttribute(g)}else g.startsWith(Ke)&&(d.push({type:6,index:o}),s.removeAttribute(g));if(Ja.test(s.tagName)){const g=s.textContent.split(Ke),f=g.length-1;if(f>0){s.textContent=Pn?Pn.emptyScript:"";for(let m=0;m<f;m++)s.append(g[m],Xt()),it.nextNode(),d.push({type:2,index:++o});s.append(g[f],Xt())}}}else if(s.nodeType===8)if(s.data===Va)d.push({type:2,index:o});else{let g=-1;for(;(g=s.data.indexOf(Ke,g+1))!==-1;)d.push({type:7,index:o}),g+=Ke.length-1}o++}}static createElement(t,n){const i=at.createElement("template");return i.innerHTML=t,i}}function Tt(e,t,n=e,i){var a,r;if(t===Ge)return t;let s=i!==void 0?(a=n._$Co)==null?void 0:a[i]:n._$Cl;const o=Zt(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==o&&((r=s==null?void 0:s._$AO)==null||r.call(s,!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,i)),i!==void 0?(n._$Co??(n._$Co=[]))[i]=s:n._$Cl=s),s!==void 0&&(t=Tt(e,s._$AS(e,t.values),s,i)),t}class ac{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??at).importNode(n,!0);it.currentNode=s;let o=it.nextNode(),a=0,r=0,d=i[0];for(;d!==void 0;){if(a===d.index){let c;d.type===2?c=new Hn(o,o.nextSibling,this,t):d.type===1?c=new d.ctor(o,d.name,d.strings,this,t):d.type===6&&(c=new dc(o,this,t)),this._$AV.push(c),d=i[++r]}a!==(d==null?void 0:d.index)&&(o=it.nextNode(),a++)}return it.currentNode=at,s}p(t){let n=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,n),n+=i.strings.length-2):i._$AI(t[n])),n++}}let Hn=class Ya{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,n,i,s){this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Tt(this,t,n),Zt(t)?t===y||t==null||t===""?(this._$AH!==y&&this._$AR(),this._$AH=y):t!==this._$AH&&t!==Ge&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ic(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==y&&Zt(this._$AH)?this._$AA.nextSibling.data=t:this.T(at.createTextNode(t)),this._$AH=t}$(t){var o;const{values:n,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=en.createElement(Qa(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===s)this._$AH.p(n);else{const a=new ac(s,this),r=a.u(this.options);a.p(n),this.T(r),this._$AH=a}}_$AC(t){let n=Ro.get(t.strings);return n===void 0&&Ro.set(t.strings,n=new en(t)),n}k(t){bs(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let i,s=0;for(const o of t)s===n.length?n.push(i=new Ya(this.O(Xt()),this.O(Xt()),this,this.options)):i=n[s],i._$AI(o),s++;s<n.length&&(this._$AR(i&&i._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,n);t!==this._$AB;){const s=Ao(t).nextSibling;Ao(t).remove(),t=s}}setConnected(t){var n;this._$AM===void 0&&(this._$Cv=t,(n=this._$AP)==null||n.call(this,t))}},qn=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,i,s,o){this.type=1,this._$AH=y,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=y}_$AI(t,n=this,i,s){const o=this.strings;let a=!1;if(o===void 0)t=Tt(this,t,n,0),a=!Zt(t)||t!==this._$AH&&t!==Ge,a&&(this._$AH=t);else{const r=t;let d,c;for(t=o[0],d=0;d<o.length-1;d++)c=Tt(this,r[i+d],n,d),c===Ge&&(c=this._$AH[d]),a||(a=!Zt(c)||c!==this._$AH[d]),c===y?t=y:t!==y&&(t+=(c??"")+o[d+1]),this._$AH[d]=c}a&&!s&&this.j(t)}j(t){t===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},rc=class extends qn{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===y?void 0:t}},lc=class extends qn{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==y)}},cc=class extends qn{constructor(t,n,i,s,o){super(t,n,i,s,o),this.type=5}_$AI(t,n=this){if((t=Tt(this,t,n,0)??y)===Ge)return;const i=this._$AH,s=t===y&&i!==y||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==y&&(i===y||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var n;typeof this._$AH=="function"?this._$AH.call(((n=this.options)==null?void 0:n.host)??this.element,t):this._$AH.handleEvent(t)}},dc=class{constructor(t,n,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Tt(this,t)}};const uc={I:Hn},wi=Wt.litHtmlPolyfillSupport;wi==null||wi(en,Hn),(Wt.litHtmlVersions??(Wt.litHtmlVersions=[])).push("3.3.2");const gc=(e,t,n)=>{const i=(n==null?void 0:n.renderBefore)??t;let s=i._$litPart$;if(s===void 0){const o=(n==null?void 0:n.renderBefore)??null;i._$litPart$=s=new Hn(t.insertBefore(Xt(),o),o,void 0,n??{})}return s._$AI(e),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ot=globalThis;let Ct=class extends At{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var n;const t=super.createRenderRoot();return(n=this.renderOptions).renderBefore??(n.renderBefore=t.firstChild),t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=gc(n,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return Ge}};var qa;Ct._$litElement$=!0,Ct.finalized=!0,(qa=ot.litElementHydrateSupport)==null||qa.call(ot,{LitElement:Ct});const $i=ot.litElementPolyfillSupport;$i==null||$i({LitElement:Ct});(ot.litElementVersions??(ot.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xa=e=>(t,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const fc={attribute:!0,type:String,converter:Fn,reflect:!1,hasChanged:ys},hc=(e=fc,t,n)=>{const{kind:i,metadata:s}=n;let o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),i==="setter"&&((e=Object.create(e)).wrapped=!0),o.set(n.name,e),i==="accessor"){const{name:a}=n;return{set(r){const d=t.get.call(this);t.set.call(this,r),this.requestUpdate(a,d,e,!0,r)},init(r){return r!==void 0&&this.C(a,void 0,e,r),r}}}if(i==="setter"){const{name:a}=n;return function(r){const d=this[a];t.call(this,r),this.requestUpdate(a,d,e,!0,r)}}throw Error("Unsupported decorator location: "+i)};function Gn(e){return(t,n)=>typeof n=="object"?hc(e,t,n):((i,s,o)=>{const a=s.hasOwnProperty(o);return s.constructor.createProperty(o,i),a?Object.getOwnPropertyDescriptor(s,o):void 0})(e,t,n)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function v(e){return Gn({...e,state:!0,attribute:!1})}const pc="modulepreload",vc=function(e,t){return new URL(e,t).href},Io={},ki=function(t,n,i){let s=Promise.resolve();if(n&&n.length>0){let a=function(u){return Promise.all(u.map(g=>Promise.resolve(g).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};const r=document.getElementsByTagName("link"),d=document.querySelector("meta[property=csp-nonce]"),c=(d==null?void 0:d.nonce)||(d==null?void 0:d.getAttribute("nonce"));s=a(n.map(u=>{if(u=vc(u,i),u in Io)return;Io[u]=!0;const g=u.endsWith(".css"),f=g?'[rel="stylesheet"]':"";if(!!i)for(let S=r.length-1;S>=0;S--){const x=r[S];if(x.href===u&&(!g||x.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${f}`))return;const $=document.createElement("link");if($.rel=g?"stylesheet":pc,g||($.as="script"),$.crossOrigin="",$.href=u,c&&$.setAttribute("nonce",c),document.head.appendChild($),g)return new Promise((S,x)=>{$.addEventListener("load",S),$.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${u}`)))})}))}function o(a){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=a,window.dispatchEvent(r),!r.defaultPrevented)throw a}return s.then(a=>{for(const r of a||[])r.status==="rejected"&&o(r.reason);return t().catch(o)})},mc={common:{health:"Health",ok:"OK",offline:"Offline",connect:"Connect",refresh:"Refresh",enabled:"Enabled",disabled:"Disabled",na:"n/a",docs:"Docs",resources:"Resources"},nav:{chat:"Chat",control:"Control",agent:"Agent",settings:"Settings",expand:"Expand sidebar",collapse:"Collapse sidebar"},tabs:{agents:"Agents",overview:"Overview",channels:"Business Knowledge",instances:"Out of Stock",sessions:"Sessions",work:"Work",cron:"Cron Jobs",skills:"Skills",nodes:"Nodes",chat:"Chat",config:"Config",debug:"Debug",logs:"Logs"},subtitles:{agents:"Manage agent workspaces, tools, and identities.",overview:"Gateway status, entry points, and a fast health read.",channels:"Edit wanding_business_knowledge.md for selection and matching.",instances:"OOS dashboard: stats and product list without asking the agent.",sessions:"Inspect active sessions and adjust per-session defaults.",work:"Batch quotation: upload files, plan, fill and OOS register.",cron:"Schedule wakeups and recurring agent runs.",skills:"Manage skill availability and API key injection.",nodes:"Paired devices, capabilities, and command exposure.",chat:"Direct gateway chat session for quick interventions.",config:"Edit ~/.openclaw/openclaw.json safely.",debug:"Gateway snapshots, events, and manual RPC calls.",logs:"Live tail of the gateway file logs."},overview:{access:{title:"Gateway Access",subtitle:"Where the dashboard connects and how it authenticates.",wsUrl:"WebSocket URL",token:"Gateway Token",password:"Password (not stored)",sessionKey:"Default Session Key",language:"Language",connectHint:"Click Connect to apply connection changes.",trustedProxy:"Authenticated via trusted proxy."},snapshot:{title:"Snapshot",subtitle:"Latest gateway handshake information.",status:"Status",uptime:"Uptime",tickInterval:"Tick Interval",lastChannelsRefresh:"Last Channels Refresh",channelsHint:"Use Channels to link WhatsApp, Telegram, Discord, Signal, or iMessage."},stats:{instances:"Instances",instancesHint:"Presence beacons in the last 5 minutes.",sessions:"Sessions",sessionsHint:"Recent session keys tracked by the gateway.",cron:"Cron",cronNext:"Next wake {time}"},notes:{title:"Notes",subtitle:"Quick reminders for remote control setups.",tailscaleTitle:"Tailscale serve",tailscaleText:"Prefer serve mode to keep the gateway on loopback with tailnet auth.",sessionTitle:"Session hygiene",sessionText:"Use /new or sessions.patch to reset context.",cronTitle:"Cron reminders",cronText:"Use isolated sessions for recurring runs."},auth:{required:"This gateway requires auth. Add a token or password, then click Connect.",failed:"Auth failed. Re-copy a tokenized URL with {command}, or update the token, then click Connect."},insecure:{hint:"This page is HTTP, so the browser blocks device identity. Use HTTPS (Tailscale Serve) or open {url} on the gateway host.",stayHttp:"If you must stay on HTTP, set {config} (token-only)."}},chat:{disconnected:"Disconnected from gateway.",refreshTitle:"Refresh chat data",thinkingToggle:"Toggle assistant thinking/working output",focusToggle:"Toggle focus mode (hide sidebar + page header)",onboardingDisabled:"Disabled during onboarding"},languages:{en:"English",zhCN:"简体中文 (Simplified Chinese)",zhTW:"繁體中文 (Traditional Chinese)",ptBR:"Português (Brazilian Portuguese)"}},yc=["en","zh-CN","zh-TW","pt-BR"];function ws(e){return e!=null&&yc.includes(e)}class bc{constructor(){this.locale="en",this.translations={en:mc},this.subscribers=new Set,this.loadLocale()}loadLocale(){const t=localStorage.getItem("openclaw.i18n.locale");if(ws(t))this.locale=t;else{const n=navigator.language;n.startsWith("zh")?this.locale=n==="zh-TW"||n==="zh-HK"?"zh-TW":"zh-CN":n.startsWith("pt")?this.locale="pt-BR":this.locale="en"}}getLocale(){return this.locale}async setLocale(t){if(this.locale!==t){if(!this.translations[t])try{let n;if(t==="zh-CN")n=await ki(()=>import("./zh-CN-BTDGrWww.js"),[],import.meta.url);else if(t==="zh-TW")n=await ki(()=>import("./zh-TW-B7H4kk0G.js"),[],import.meta.url);else if(t==="pt-BR")n=await ki(()=>import("./pt-BR-CAUgEH0a.js"),[],import.meta.url);else return;this.translations[t]=n[t.replace("-","_")]}catch(n){console.error(`Failed to load locale: ${t}`,n);return}this.locale=t,localStorage.setItem("openclaw.i18n.locale",t),this.notify()}}registerTranslation(t,n){this.translations[t]=n}subscribe(t){return this.subscribers.add(t),()=>this.subscribers.delete(t)}notify(){this.subscribers.forEach(t=>t(this.locale))}t(t,n){const i=t.split(".");let s=this.translations[this.locale]||this.translations.en;for(const o of i)if(s&&typeof s=="object")s=s[o];else{s=void 0;break}if(s===void 0&&this.locale!=="en"){s=this.translations.en;for(const o of i)if(s&&typeof s=="object")s=s[o];else{s=void 0;break}}return typeof s!="string"?t:n?s.replace(/\{(\w+)\}/g,(o,a)=>n[a]||`{${a}}`):s}}const tn=new bc,_=(e,t)=>tn.t(e,t);class wc{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){this.unsubscribe=tn.subscribe(()=>{this.host.requestUpdate()})}hostDisconnected(){var t;(t=this.unsubscribe)==null||t.call(this)}}async function me(e,t){if(!(!e.client||!e.connected)&&!e.channelsLoading){e.channelsLoading=!0,e.channelsError=null;try{const n=await e.client.request("channels.status",{probe:t,timeoutMs:8e3});e.channelsSnapshot=n,e.channelsLastSuccess=Date.now()}catch(n){e.channelsError=String(n)}finally{e.channelsLoading=!1}}}async function $c(e,t){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const n=await e.client.request("web.login.start",{force:t,timeoutMs:3e4});e.whatsappLoginMessage=n.message??null,e.whatsappLoginQrDataUrl=n.qrDataUrl??null,e.whatsappLoginConnected=null}catch(n){e.whatsappLoginMessage=String(n),e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function kc(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const t=await e.client.request("web.login.wait",{timeoutMs:12e4});e.whatsappLoginMessage=t.message??null,e.whatsappLoginConnected=t.connected??null,t.connected&&(e.whatsappLoginQrDataUrl=null)}catch(t){e.whatsappLoginMessage=String(t),e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function Sc(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{await e.client.request("channels.logout",{channel:"whatsapp"}),e.whatsappLoginMessage="Logged out.",e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}catch(t){e.whatsappLoginMessage=String(t)}finally{e.whatsappBusy=!1}}}function pe(e){if(e)return Array.isArray(e.type)?e.type.filter(n=>n!=="null")[0]??e.type[0]:e.type}function Za(e){if(!e)return"";if(e.default!==void 0)return e.default;switch(pe(e)){case"object":return{};case"array":return[];case"boolean":return!1;case"number":case"integer":return 0;case"string":return"";default:return""}}function $s(e){return e.filter(t=>typeof t=="string").join(".")}function ve(e,t){const n=$s(e),i=t[n];if(i)return i;const s=n.split(".");for(const[o,a]of Object.entries(t)){if(!o.includes("*"))continue;const r=o.split(".");if(r.length!==s.length)continue;let d=!0;for(let c=0;c<s.length;c+=1)if(r[c]!=="*"&&r[c]!==s[c]){d=!1;break}if(d)return a}}function Be(e){return e.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/\s+/g," ").replace(/^./,t=>t.toUpperCase())}function Mo(e,t){const n=e.trim();if(n==="")return;const i=Number(n);return!Number.isFinite(i)||t&&!Number.isInteger(i)?e:i}function Fo(e){const t=e.trim();return t==="true"?!0:t==="false"?!1:e}function je(e,t){if(e==null)return e;if(t.allOf&&t.allOf.length>0){let i=e;for(const s of t.allOf)i=je(i,s);return i}const n=pe(t);if(t.anyOf||t.oneOf){const i=(t.anyOf??t.oneOf??[]).filter(s=>!(s.type==="null"||Array.isArray(s.type)&&s.type.includes("null")));if(i.length===1)return je(e,i[0]);if(typeof e=="string")for(const s of i){const o=pe(s);if(o==="number"||o==="integer"){const a=Mo(e,o==="integer");if(a===void 0||typeof a=="number")return a}if(o==="boolean"){const a=Fo(e);if(typeof a=="boolean")return a}}for(const s of i){const o=pe(s);if(o==="object"&&typeof e=="object"&&!Array.isArray(e)||o==="array"&&Array.isArray(e))return je(e,s)}return e}if(n==="number"||n==="integer"){if(typeof e=="string"){const i=Mo(e,n==="integer");if(i===void 0||typeof i=="number")return i}return e}if(n==="boolean"){if(typeof e=="string"){const i=Fo(e);if(typeof i=="boolean")return i}return e}if(n==="object"){if(typeof e!="object"||Array.isArray(e))return e;const i=e,s=t.properties??{},o=t.additionalProperties&&typeof t.additionalProperties=="object"?t.additionalProperties:null,a={};for(const[r,d]of Object.entries(i)){const c=s[r]??o,u=c?je(d,c):d;u!==void 0&&(a[r]=u)}return a}if(n==="array"){if(!Array.isArray(e))return e;if(Array.isArray(t.items)){const s=t.items;return e.map((o,a)=>{const r=a<s.length?s[a]:void 0;return r?je(o,r):o})}const i=t.items;return i?e.map(s=>je(s,i)).filter(s=>s!==void 0):e}return e}function rt(e){return typeof structuredClone=="function"?structuredClone(e):JSON.parse(JSON.stringify(e))}function nn(e){return`${JSON.stringify(e,null,2).trimEnd()}
`}function er(e,t,n){if(t.length===0)return;let i=e;for(let o=0;o<t.length-1;o+=1){const a=t[o],r=t[o+1];if(typeof a=="number"){if(!Array.isArray(i))return;i[a]==null&&(i[a]=typeof r=="number"?[]:{}),i=i[a]}else{if(typeof i!="object"||i==null)return;const d=i;d[a]==null&&(d[a]=typeof r=="number"?[]:{}),i=d[a]}}const s=t[t.length-1];if(typeof s=="number"){Array.isArray(i)&&(i[s]=n);return}typeof i=="object"&&i!=null&&(i[s]=n)}function tr(e,t){if(t.length===0)return;let n=e;for(let s=0;s<t.length-1;s+=1){const o=t[s];if(typeof o=="number"){if(!Array.isArray(n))return;n=n[o]}else{if(typeof n!="object"||n==null)return;n=n[o]}if(n==null)return}const i=t[t.length-1];if(typeof i=="number"){Array.isArray(n)&&n.splice(i,1);return}typeof n=="object"&&n!=null&&delete n[i]}async function Ee(e){if(!(!e.client||!e.connected)){e.configLoading=!0,e.lastError=null;try{const t=await e.client.request("config.get",{});_c(e,t)}catch(t){e.lastError=String(t)}finally{e.configLoading=!1}}}async function xc(e){if(!(!e.client||!e.connected)&&!e.configSchemaLoading){e.configSchemaLoading=!0;try{const t=await e.client.request("config.schema",{});Ac(e,t)}catch(t){e.lastError=String(t)}finally{e.configSchemaLoading=!1}}}function Ac(e,t){e.configSchema=t.schema??null,e.configUiHints=t.uiHints??{},e.configSchemaVersion=t.version??null}function _c(e,t){e.configSnapshot=t;const n=typeof t.raw=="string"?t.raw:t.config&&typeof t.config=="object"?nn(t.config):e.configRaw;!e.configFormDirty||e.configFormMode==="raw"?e.configRaw=n:e.configForm?e.configRaw=nn(e.configForm):e.configRaw=n,e.configValid=typeof t.valid=="boolean"?t.valid:null,e.configIssues=Array.isArray(t.issues)?t.issues:[],e.configFormDirty||(e.configForm=rt(t.config??{}),e.configFormOriginal=rt(t.config??{}),e.configRawOriginal=n)}function Cc(e){return!e||typeof e!="object"||Array.isArray(e)?null:e}function nr(e){if(e.configFormMode!=="form"||!e.configForm)return e.configRaw;const t=Cc(e.configSchema),n=t?je(e.configForm,t):e.configForm;return nn(n)}async function En(e){var t;if(!(!e.client||!e.connected)){e.configSaving=!0,e.lastError=null;try{const n=nr(e),i=(t=e.configSnapshot)==null?void 0:t.hash;if(!i){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.set",{raw:n,baseHash:i}),e.configFormDirty=!1,await Ee(e)}catch(n){e.lastError=String(n)}finally{e.configSaving=!1}}}async function Tc(e){var t;if(!(!e.client||!e.connected)){e.configApplying=!0,e.lastError=null;try{const n=nr(e),i=(t=e.configSnapshot)==null?void 0:t.hash;if(!i){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.apply",{raw:n,baseHash:i,sessionKey:e.applySessionKey}),e.configFormDirty=!1,await Ee(e)}catch(n){e.lastError=String(n)}finally{e.configApplying=!1}}}async function Ec(e){if(!(!e.client||!e.connected)){e.updateRunning=!0,e.lastError=null;try{await e.client.request("update.run",{sessionKey:e.applySessionKey})}catch(t){e.lastError=String(t)}finally{e.updateRunning=!1}}}function he(e,t,n){var s;const i=rt(e.configForm??((s=e.configSnapshot)==null?void 0:s.config)??{});er(i,t,n),e.configForm=i,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=nn(i))}function De(e,t){var i;const n=rt(e.configForm??((i=e.configSnapshot)==null?void 0:i.config)??{});tr(n,t),e.configForm=n,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=nn(n))}function Lc(e){const t={name:(e==null?void 0:e.name)??"",displayName:(e==null?void 0:e.displayName)??"",about:(e==null?void 0:e.about)??"",picture:(e==null?void 0:e.picture)??"",banner:(e==null?void 0:e.banner)??"",website:(e==null?void 0:e.website)??"",nip05:(e==null?void 0:e.nip05)??"",lud16:(e==null?void 0:e.lud16)??""};return{values:t,original:{...t},saving:!1,importing:!1,error:null,success:null,fieldErrors:{},showAdvanced:!!(e!=null&&e.banner||e!=null&&e.website||e!=null&&e.nip05||e!=null&&e.lud16)}}async function Rc(e,t){await $c(e,t),await me(e,!0)}async function Ic(e){await kc(e),await me(e,!0)}async function Mc(e){await Sc(e),await me(e,!0)}async function Fc(e){await En(e),await Ee(e),await me(e,!0)}async function Pc(e){await Ee(e),await me(e,!0)}function Dc(e){if(!Array.isArray(e))return{};const t={};for(const n of e){if(typeof n!="string")continue;const[i,...s]=n.split(":");if(!i||s.length===0)continue;const o=i.trim(),a=s.join(":").trim();o&&a&&(t[o]=a)}return t}function ir(e){var n,i,s;return((s=(((i=(n=e.channelsSnapshot)==null?void 0:n.channelAccounts)==null?void 0:i.nostr)??[])[0])==null?void 0:s.accountId)??e.nostrProfileAccountId??"default"}function sr(e,t=""){return`/api/channels/nostr/${encodeURIComponent(e)}/profile${t}`}function Oc(e){var s,o,a;const t=(a=(o=(s=e.hello)==null?void 0:s.auth)==null?void 0:o.deviceToken)==null?void 0:a.trim();if(t)return`Bearer ${t}`;const n=e.settings.token.trim();if(n)return`Bearer ${n}`;const i=e.password.trim();return i?`Bearer ${i}`:null}function or(e){const t=Oc(e);return t?{Authorization:t}:{}}function Nc(e,t,n){e.nostrProfileAccountId=t,e.nostrProfileFormState=Lc(n??void 0)}function Bc(e){e.nostrProfileFormState=null,e.nostrProfileAccountId=null}function Uc(e,t,n){const i=e.nostrProfileFormState;i&&(e.nostrProfileFormState={...i,values:{...i.values,[t]:n},fieldErrors:{...i.fieldErrors,[t]:""}})}function zc(e){const t=e.nostrProfileFormState;t&&(e.nostrProfileFormState={...t,showAdvanced:!t.showAdvanced})}async function jc(e){const t=e.nostrProfileFormState;if(!t||t.saving)return;const n=ir(e);e.nostrProfileFormState={...t,saving:!0,error:null,success:null,fieldErrors:{}};try{const i=await fetch(sr(n),{method:"PUT",headers:{"Content-Type":"application/json",...or(e)},body:JSON.stringify(t.values)}),s=await i.json().catch(()=>null);if(!i.ok||(s==null?void 0:s.ok)===!1||!s){const o=(s==null?void 0:s.error)??`Profile update failed (${i.status})`;e.nostrProfileFormState={...t,saving:!1,error:o,success:null,fieldErrors:Dc(s==null?void 0:s.details)};return}if(!s.persisted){e.nostrProfileFormState={...t,saving:!1,error:"Profile publish failed on all relays.",success:null};return}e.nostrProfileFormState={...t,saving:!1,error:null,success:"Profile published to relays.",fieldErrors:{},original:{...t.values}},await me(e,!0)}catch(i){e.nostrProfileFormState={...t,saving:!1,error:`Profile update failed: ${String(i)}`,success:null}}}async function Kc(e){const t=e.nostrProfileFormState;if(!t||t.importing)return;const n=ir(e);e.nostrProfileFormState={...t,importing:!0,error:null,success:null};try{const i=await fetch(sr(n,"/import"),{method:"POST",headers:{"Content-Type":"application/json",...or(e)},body:JSON.stringify({autoMerge:!0})}),s=await i.json().catch(()=>null);if(!i.ok||(s==null?void 0:s.ok)===!1||!s){const d=(s==null?void 0:s.error)??`Profile import failed (${i.status})`;e.nostrProfileFormState={...t,importing:!1,error:d,success:null};return}const o=s.merged??s.imported??null,a=o?{...t.values,...o}:t.values,r=!!(a.banner||a.website||a.nip05||a.lud16);e.nostrProfileFormState={...t,importing:!1,values:a,error:null,success:s.saved?"Profile imported from relays. Review and publish.":"Profile imported. Review and publish.",showAdvanced:r},s.saved&&await me(e,!0)}catch(i){e.nostrProfileFormState={...t,importing:!1,error:`Profile import failed: ${String(i)}`,success:null}}}function ar(e){var o;const t=(e??"").trim();if(!t)return null;const n=t.split(":").filter(Boolean);if(n.length<3||n[0]!=="agent")return null;const i=(o=n[1])==null?void 0:o.trim(),s=n.slice(2).join(":");return!i||!s?null:{agentId:i,rest:s}}const qi=450;function ln(e,t=!1,n=!1){e.chatScrollFrame&&cancelAnimationFrame(e.chatScrollFrame),e.chatScrollTimeout!=null&&(clearTimeout(e.chatScrollTimeout),e.chatScrollTimeout=null);const i=()=>{const s=e.querySelector(".chat-thread");if(s){const o=getComputedStyle(s).overflowY;if(o==="auto"||o==="scroll"||s.scrollHeight-s.clientHeight>1)return s}return document.scrollingElement??document.documentElement};e.updateComplete.then(()=>{e.chatScrollFrame=requestAnimationFrame(()=>{e.chatScrollFrame=null;const s=i();if(!s)return;const o=s.scrollHeight-s.scrollTop-s.clientHeight,a=t&&!e.chatHasAutoScrolled;if(!(a||e.chatUserNearBottom||o<qi)){e.chatNewMessagesBelow=!0;return}a&&(e.chatHasAutoScrolled=!0);const d=n&&(typeof window>"u"||typeof window.matchMedia!="function"||!window.matchMedia("(prefers-reduced-motion: reduce)").matches),c=s.scrollHeight;typeof s.scrollTo=="function"?s.scrollTo({top:c,behavior:d?"smooth":"auto"}):s.scrollTop=c,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1;const u=a?150:120;e.chatScrollTimeout=window.setTimeout(()=>{e.chatScrollTimeout=null;const g=i();if(!g)return;const f=g.scrollHeight-g.scrollTop-g.clientHeight;(a||e.chatUserNearBottom||f<qi)&&(g.scrollTop=g.scrollHeight,e.chatUserNearBottom=!0)},u)})})}function rr(e,t=!1){e.logsScrollFrame&&cancelAnimationFrame(e.logsScrollFrame),e.updateComplete.then(()=>{e.logsScrollFrame=requestAnimationFrame(()=>{e.logsScrollFrame=null;const n=e.querySelector(".log-stream");if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;(t||i<80)&&(n.scrollTop=n.scrollHeight)})})}function Hc(e,t){const n=t.currentTarget;if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;e.chatUserNearBottom=i<qi,e.chatUserNearBottom&&(e.chatNewMessagesBelow=!1)}function qc(e,t){const n=t.currentTarget;if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;e.logsAtBottom=i<80}function Po(e){e.chatHasAutoScrolled=!1,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1}function Gc(e,t){if(e.length===0)return;const n=new Blob([`${e.join(`
`)}
`],{type:"text/plain"}),i=URL.createObjectURL(n),s=document.createElement("a"),o=new Date().toISOString().slice(0,19).replace(/[:T]/g,"-");s.href=i,s.download=`openclaw-logs-${t}-${o}.log`,s.click(),URL.revokeObjectURL(i)}function Wc(e){if(typeof ResizeObserver>"u")return;const t=e.querySelector(".topbar");if(!t)return;const n=()=>{const{height:i}=t.getBoundingClientRect();e.style.setProperty("--topbar-height",`${i}px`)};n(),e.topbarObserver=new ResizeObserver(()=>n()),e.topbarObserver.observe(t)}async function Wn(e){if(!(!e.client||!e.connected)&&!e.debugLoading){e.debugLoading=!0;try{const[t,n,i,s]=await Promise.all([e.client.request("status",{}),e.client.request("health",{}),e.client.request("models.list",{}),e.client.request("last-heartbeat",{})]);e.debugStatus=t,e.debugHealth=n;const o=i;e.debugModels=Array.isArray(o==null?void 0:o.models)?o==null?void 0:o.models:[],e.debugHeartbeat=s}catch(t){e.debugCallError=String(t)}finally{e.debugLoading=!1}}}async function Vc(e){if(!(!e.client||!e.connected)){e.debugCallError=null,e.debugCallResult=null;try{const t=e.debugCallParams.trim()?JSON.parse(e.debugCallParams):{},n=await e.client.request(e.debugCallMethod.trim(),t);e.debugCallResult=JSON.stringify(n,null,2)}catch(t){e.debugCallError=String(t)}}}const Jc=2e3,Qc=new Set(["trace","debug","info","warn","error","fatal"]);function Yc(e){if(typeof e!="string")return null;const t=e.trim();if(!t.startsWith("{")||!t.endsWith("}"))return null;try{const n=JSON.parse(t);return!n||typeof n!="object"?null:n}catch{return null}}function Xc(e){if(typeof e!="string")return null;const t=e.toLowerCase();return Qc.has(t)?t:null}function Zc(e){if(!e.trim())return{raw:e,message:e};try{const t=JSON.parse(e),n=t&&typeof t._meta=="object"&&t._meta!==null?t._meta:null,i=typeof t.time=="string"?t.time:typeof(n==null?void 0:n.date)=="string"?n==null?void 0:n.date:null,s=Xc((n==null?void 0:n.logLevelName)??(n==null?void 0:n.level)),o=typeof t[0]=="string"?t[0]:typeof(n==null?void 0:n.name)=="string"?n==null?void 0:n.name:null,a=Yc(o);let r=null;a&&(typeof a.subsystem=="string"?r=a.subsystem:typeof a.module=="string"&&(r=a.module)),!r&&o&&o.length<120&&(r=o);let d=null;return typeof t[1]=="string"?d=t[1]:!a&&typeof t[0]=="string"?d=t[0]:typeof t.message=="string"&&(d=t.message),{raw:e,time:i,level:s,subsystem:r,message:d??e,meta:n??void 0}}catch{return{raw:e,message:e}}}async function ks(e,t){if(!(!e.client||!e.connected)&&!(e.logsLoading&&!(t!=null&&t.quiet))){t!=null&&t.quiet||(e.logsLoading=!0),e.logsError=null;try{const i=await e.client.request("logs.tail",{cursor:t!=null&&t.reset?void 0:e.logsCursor??void 0,limit:e.logsLimit,maxBytes:e.logsMaxBytes}),o=(Array.isArray(i.lines)?i.lines.filter(r=>typeof r=="string"):[]).map(Zc),a=!!(t!=null&&t.reset||i.reset||e.logsCursor==null);e.logsEntries=a?o:[...e.logsEntries,...o].slice(-Jc),typeof i.cursor=="number"&&(e.logsCursor=i.cursor),typeof i.file=="string"&&(e.logsFile=i.file),e.logsTruncated=!!i.truncated,e.logsLastFetchAt=Date.now()}catch(n){e.logsError=String(n)}finally{t!=null&&t.quiet||(e.logsLoading=!1)}}}async function Vn(e,t){if(!(!e.client||!e.connected)&&!e.nodesLoading){e.nodesLoading=!0,t!=null&&t.quiet||(e.lastError=null);try{const n=await e.client.request("node.list",{});e.nodes=Array.isArray(n.nodes)?n.nodes:[]}catch(n){t!=null&&t.quiet||(e.lastError=String(n))}finally{e.nodesLoading=!1}}}function ed(e){e.nodesPollInterval==null&&(e.nodesPollInterval=window.setInterval(()=>void Vn(e,{quiet:!0}),5e3))}function td(e){e.nodesPollInterval!=null&&(clearInterval(e.nodesPollInterval),e.nodesPollInterval=null)}function Ss(e){e.logsPollInterval==null&&(e.logsPollInterval=window.setInterval(()=>{e.tab==="logs"&&ks(e,{quiet:!0})},2e3))}function xs(e){e.logsPollInterval!=null&&(clearInterval(e.logsPollInterval),e.logsPollInterval=null)}function As(e){e.debugPollInterval==null&&(e.debugPollInterval=window.setInterval(()=>{e.tab==="debug"&&Wn(e)},3e3))}function _s(e){e.debugPollInterval!=null&&(clearInterval(e.debugPollInterval),e.debugPollInterval=null)}async function lr(e,t){if(!(!e.client||!e.connected||e.agentIdentityLoading)&&!e.agentIdentityById[t]){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{const n=await e.client.request("agent.identity.get",{agentId:t});n&&(e.agentIdentityById={...e.agentIdentityById,[t]:n})}catch(n){e.agentIdentityError=String(n)}finally{e.agentIdentityLoading=!1}}}async function cr(e,t){if(!e.client||!e.connected||e.agentIdentityLoading)return;const n=t.filter(i=>!e.agentIdentityById[i]);if(n.length!==0){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{for(const i of n){const s=await e.client.request("agent.identity.get",{agentId:i});s&&(e.agentIdentityById={...e.agentIdentityById,[i]:s})}}catch(i){e.agentIdentityError=String(i)}finally{e.agentIdentityLoading=!1}}}async function Ln(e,t){if(!(!e.client||!e.connected)&&!e.agentSkillsLoading){e.agentSkillsLoading=!0,e.agentSkillsError=null;try{const n=await e.client.request("skills.status",{agentId:t});n&&(e.agentSkillsReport=n,e.agentSkillsAgentId=t)}catch(n){e.agentSkillsError=String(n)}finally{e.agentSkillsLoading=!1}}}async function Cs(e){var t;if(!(!e.client||!e.connected)&&!e.agentsLoading){e.agentsLoading=!0,e.agentsError=null;try{const n=await e.client.request("agents.list",{});if(n){e.agentsList=n;const i=e.agentsSelectedId,s=n.agents.some(o=>o.id===i);(!i||!s)&&(e.agentsSelectedId=n.defaultId??((t=n.agents[0])==null?void 0:t.id)??null)}}catch(n){e.agentsError=String(n)}finally{e.agentsLoading=!1}}}function Ts(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}async function nd(e){try{const n=await(await fetch(Ts(e.basePath,"/api/business-knowledge/dependent-files"))).json().catch(()=>({}));n.success&&n.data?e.bkDependentFiles={mapping_table:n.data.mapping_table??"",price_library:n.data.price_library??""}:e.bkDependentFiles=null}catch{e.bkDependentFiles=null}}async function dr(e){e.bkLoading=!0,e.bkError=null,nd(e);try{const t=await fetch(Ts(e.basePath,"/api/business-knowledge")),n=await t.json().catch(()=>({}));n.success&&n.data&&typeof n.data.content=="string"?e.bkContent=n.data.content:(e.bkContent="",t.ok||(e.bkError=n.detail??`HTTP ${t.status}`))}catch(t){e.bkError=t instanceof Error?t.message:String(t),e.bkContent=""}finally{e.bkLoading=!1}}async function id(e,t){e.bkSaving=!0,e.bkError=null;try{const n=await fetch(Ts(e.basePath,"/api/business-knowledge"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:t})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(e.bkContent=t,e.bkLastSuccess=Date.now(),!0):(e.bkError=i.detail??`HTTP ${n.status}`,!1)}catch(n){return e.bkError=n instanceof Error?n.message:String(n),!1}finally{e.bkSaving=!1}}function ur(e){if(e==null||!Number.isFinite(e))return"n/a";const t=Math.floor(e/1e3),n=Math.floor(t/60),i=Math.floor(n/60);return i>0?`${i}h`:n>0?`${n}m`:t>0?`${t}s`:"<1s"}function Ue(e){if(e==null||!Number.isFinite(e))return"n/a";const t=Date.now(),n=e-t,i=Math.abs(n),s=Math.floor(i/6e4),o=Math.floor(s/60),a=Math.floor(o/24);return n>0?s<1?"in <1m":s<60?`in ${s}m`:o<24?`in ${o}h`:`in ${a}d`:i<15e3?"just now":s<60?`${s}m ago`:o<24?`${o}h ago`:`${a}d ago`}function sd(e,t){return!e||typeof e!="string"?"":e.replace(/<think>[\s\S]*?<\/think>/gi,"").trim()}function lt(e){return!e&&e!==0?"n/a":new Date(e).toLocaleString()}function Gi(e){return!e||e.length===0?"none":e.filter(t=>!!(t&&t.trim())).join(", ")}function Wi(e,t=120){return e.length<=t?e:`${e.slice(0,Math.max(0,t-1))}…`}function gr(e,t){return e.length<=t?{text:e,truncated:!1,total:e.length}:{text:e.slice(0,Math.max(0,t)),truncated:!0,total:e.length}}function Dn(e,t){const n=Number(e);return Number.isFinite(n)?n:t}function Si(e){return sd(e)}function od(e){return e.sessionTarget==="isolated"&&e.payloadKind==="agentTurn"}function fr(e){return e.deliveryMode!=="announce"||od(e)?e:{...e,deliveryMode:"none"}}async function cn(e){if(!(!e.client||!e.connected))try{const t=await e.client.request("cron.status",{});e.cronStatus=t}catch(t){e.cronError=String(t)}}async function Jn(e){if(!(!e.client||!e.connected)&&!e.cronLoading){e.cronLoading=!0,e.cronError=null;try{const t=await e.client.request("cron.list",{includeDisabled:!0});e.cronJobs=Array.isArray(t.jobs)?t.jobs:[]}catch(t){e.cronError=String(t)}finally{e.cronLoading=!1}}}function ad(e){if(e.scheduleKind==="at"){const n=Date.parse(e.scheduleAt);if(!Number.isFinite(n))throw new Error("Invalid run time.");return{kind:"at",at:new Date(n).toISOString()}}if(e.scheduleKind==="every"){const n=Dn(e.everyAmount,0);if(n<=0)throw new Error("Invalid interval amount.");const i=e.everyUnit;return{kind:"every",everyMs:n*(i==="minutes"?6e4:i==="hours"?36e5:864e5)}}const t=e.cronExpr.trim();if(!t)throw new Error("Cron expression required.");return{kind:"cron",expr:t,tz:e.cronTz.trim()||void 0}}function rd(e){if(e.payloadKind==="systemEvent"){const s=e.payloadText.trim();if(!s)throw new Error("System event text required.");return{kind:"systemEvent",text:s}}const t=e.payloadText.trim();if(!t)throw new Error("Agent message required.");const n={kind:"agentTurn",message:t},i=Dn(e.timeoutSeconds,0);return i>0&&(n.timeoutSeconds=i),n}async function ld(e){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{const t=fr(e.cronForm);t!==e.cronForm&&(e.cronForm=t);const n=ad(t),i=rd(t),s=t.deliveryMode,o=s&&s!=="none"?{mode:s,channel:s==="announce"?t.deliveryChannel.trim()||"last":void 0,to:t.deliveryTo.trim()||void 0}:void 0,a=t.agentId.trim(),r={name:t.name.trim(),description:t.description.trim()||void 0,agentId:a||void 0,enabled:t.enabled,schedule:n,sessionTarget:t.sessionTarget,wakeMode:t.wakeMode,payload:i,delivery:o};if(!r.name)throw new Error("Name required.");await e.client.request("cron.add",r),e.cronForm={...e.cronForm,name:"",description:"",payloadText:""},await Jn(e),await cn(e)}catch(t){e.cronError=String(t)}finally{e.cronBusy=!1}}}async function cd(e,t,n){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{await e.client.request("cron.update",{id:t.id,patch:{enabled:n}}),await Jn(e),await cn(e)}catch(i){e.cronError=String(i)}finally{e.cronBusy=!1}}}async function dd(e,t){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{await e.client.request("cron.run",{id:t.id,mode:"force"}),await hr(e,t.id)}catch(n){e.cronError=String(n)}finally{e.cronBusy=!1}}}async function ud(e,t){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{await e.client.request("cron.remove",{id:t.id}),e.cronRunsJobId===t.id&&(e.cronRunsJobId=null,e.cronRuns=[]),await Jn(e),await cn(e)}catch(n){e.cronError=String(n)}finally{e.cronBusy=!1}}}async function hr(e,t){if(!(!e.client||!e.connected))try{const n=await e.client.request("cron.runs",{id:t,limit:50});e.cronRunsJobId=t,e.cronRuns=Array.isArray(n.entries)?n.entries:[]}catch(n){e.cronError=String(n)}}function Es(e){return(e??"").trim().toLowerCase()||"viewer"}function gd(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").map(t=>t.trim()).filter(Boolean):[]}const pr="openclaw.device.auth.v1";function Ls(){try{const e=window.localStorage.getItem(pr);if(!e)return null;const t=JSON.parse(e);return!t||t.version!==1||!t.deviceId||typeof t.deviceId!="string"||!t.tokens||typeof t.tokens!="object"?null:t}catch{return null}}function vr(e){try{window.localStorage.setItem(pr,JSON.stringify(e))}catch{}}function fd(e){const t=Ls();if(!t||t.deviceId!==e.deviceId)return null;const n=Es(e.role),i=t.tokens[n];return!i||typeof i.token!="string"?null:i}function mr(e){const t=Es(e.role),n={version:1,deviceId:e.deviceId,tokens:{}},i=Ls();i&&i.deviceId===e.deviceId&&(n.tokens={...i.tokens});const s={token:e.token,role:t,scopes:gd(e.scopes),updatedAtMs:Date.now()};return n.tokens[t]=s,vr(n),s}function yr(e){const t=Ls();if(!t||t.deviceId!==e.deviceId)return;const n=Es(e.role);if(!t.tokens[n])return;const i={...t,tokens:{...t.tokens}};delete i.tokens[n],vr(i)}/*! noble-ed25519 - MIT License (c) 2019 Paul Miller (paulmillr.com) */const br={p:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffedn,n:0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn,h:8n,a:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffecn,d:0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3n,Gx:0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an,Gy:0x6666666666666666666666666666666666666666666666666666666666666658n},{p:oe,n:Rn,Gx:Do,Gy:Oo,a:xi,d:Ai,h:hd}=br,ct=32,Rs=64,pd=(...e)=>{"captureStackTrace"in Error&&typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(...e)},te=(e="")=>{const t=new Error(e);throw pd(t,te),t},vd=e=>typeof e=="bigint",md=e=>typeof e=="string",yd=e=>e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array",Ve=(e,t,n="")=>{const i=yd(e),s=e==null?void 0:e.length,o=t!==void 0;if(!i||o&&s!==t){const a=n&&`"${n}" `,r=o?` of length ${t}`:"",d=i?`length=${s}`:`type=${typeof e}`;te(a+"expected Uint8Array"+r+", got "+d)}return e},Qn=e=>new Uint8Array(e),wr=e=>Uint8Array.from(e),$r=(e,t)=>e.toString(16).padStart(t,"0"),kr=e=>Array.from(Ve(e)).map(t=>$r(t,2)).join(""),Oe={_0:48,_9:57,A:65,F:70,a:97,f:102},No=e=>{if(e>=Oe._0&&e<=Oe._9)return e-Oe._0;if(e>=Oe.A&&e<=Oe.F)return e-(Oe.A-10);if(e>=Oe.a&&e<=Oe.f)return e-(Oe.a-10)},Sr=e=>{const t="hex invalid";if(!md(e))return te(t);const n=e.length,i=n/2;if(n%2)return te(t);const s=Qn(i);for(let o=0,a=0;o<i;o++,a+=2){const r=No(e.charCodeAt(a)),d=No(e.charCodeAt(a+1));if(r===void 0||d===void 0)return te(t);s[o]=r*16+d}return s},xr=()=>globalThis==null?void 0:globalThis.crypto,bd=()=>{var e;return((e=xr())==null?void 0:e.subtle)??te("crypto.subtle must be defined, consider polyfill")},sn=(...e)=>{const t=Qn(e.reduce((i,s)=>i+Ve(s).length,0));let n=0;return e.forEach(i=>{t.set(i,n),n+=i.length}),t},wd=(e=ct)=>xr().getRandomValues(Qn(e)),On=BigInt,tt=(e,t,n,i="bad number: out of range")=>vd(e)&&t<=e&&e<n?e:te(i),I=(e,t=oe)=>{const n=e%t;return n>=0n?n:t+n},Ar=e=>I(e,Rn),$d=(e,t)=>{(e===0n||t<=0n)&&te("no inverse n="+e+" mod="+t);let n=I(e,t),i=t,s=0n,o=1n;for(;n!==0n;){const a=i/n,r=i%n,d=s-o*a;i=n,n=r,s=o,o=d}return i===1n?I(s,t):te("no inverse")},kd=e=>{const t=Er[e];return typeof t!="function"&&te("hashes."+e+" not set"),t},_i=e=>e instanceof dt?e:te("Point expected"),Vi=2n**256n,Te=class Te{constructor(t,n,i,s){j(this,"X");j(this,"Y");j(this,"Z");j(this,"T");const o=Vi;this.X=tt(t,0n,o),this.Y=tt(n,0n,o),this.Z=tt(i,1n,o),this.T=tt(s,0n,o),Object.freeze(this)}static CURVE(){return br}static fromAffine(t){return new Te(t.x,t.y,1n,I(t.x*t.y))}static fromBytes(t,n=!1){const i=Ai,s=wr(Ve(t,ct)),o=t[31];s[31]=o&-129;const a=Cr(s);tt(a,0n,n?Vi:oe);const d=I(a*a),c=I(d-1n),u=I(i*d+1n);let{isValid:g,value:f}=xd(c,u);g||te("bad point: y not sqrt");const m=(f&1n)===1n,$=(o&128)!==0;return!n&&f===0n&&$&&te("bad point: x==0, isLastByteOdd"),$!==m&&(f=I(-f)),new Te(f,a,1n,I(f*a))}static fromHex(t,n){return Te.fromBytes(Sr(t),n)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}assertValidity(){const t=xi,n=Ai,i=this;if(i.is0())return te("bad point: ZERO");const{X:s,Y:o,Z:a,T:r}=i,d=I(s*s),c=I(o*o),u=I(a*a),g=I(u*u),f=I(d*t),m=I(u*I(f+c)),$=I(g+I(n*I(d*c)));if(m!==$)return te("bad point: equation left != right (1)");const S=I(s*o),x=I(a*r);return S!==x?te("bad point: equation left != right (2)"):this}equals(t){const{X:n,Y:i,Z:s}=this,{X:o,Y:a,Z:r}=_i(t),d=I(n*r),c=I(o*s),u=I(i*r),g=I(a*s);return d===c&&u===g}is0(){return this.equals(_t)}negate(){return new Te(I(-this.X),this.Y,this.Z,I(-this.T))}double(){const{X:t,Y:n,Z:i}=this,s=xi,o=I(t*t),a=I(n*n),r=I(2n*I(i*i)),d=I(s*o),c=t+n,u=I(I(c*c)-o-a),g=d+a,f=g-r,m=d-a,$=I(u*f),S=I(g*m),x=I(u*m),C=I(f*g);return new Te($,S,C,x)}add(t){const{X:n,Y:i,Z:s,T:o}=this,{X:a,Y:r,Z:d,T:c}=_i(t),u=xi,g=Ai,f=I(n*a),m=I(i*r),$=I(o*g*c),S=I(s*d),x=I((n+i)*(a+r)-f-m),C=I(S-$),F=I(S+$),R=I(m-u*f),L=I(x*C),k=I(F*R),E=I(x*R),O=I(C*F);return new Te(L,k,O,E)}subtract(t){return this.add(_i(t).negate())}multiply(t,n=!0){if(!n&&(t===0n||this.is0()))return _t;if(tt(t,1n,Rn),t===1n)return this;if(this.equals(ut))return Pd(t).p;let i=_t,s=ut;for(let o=this;t>0n;o=o.double(),t>>=1n)t&1n?i=i.add(o):n&&(s=s.add(o));return i}multiplyUnsafe(t){return this.multiply(t,!1)}toAffine(){const{X:t,Y:n,Z:i}=this;if(this.equals(_t))return{x:0n,y:1n};const s=$d(i,oe);I(i*s)!==1n&&te("invalid inverse");const o=I(t*s),a=I(n*s);return{x:o,y:a}}toBytes(){const{x:t,y:n}=this.assertValidity().toAffine(),i=_r(n);return i[31]|=t&1n?128:0,i}toHex(){return kr(this.toBytes())}clearCofactor(){return this.multiply(On(hd),!1)}isSmallOrder(){return this.clearCofactor().is0()}isTorsionFree(){let t=this.multiply(Rn/2n,!1).double();return Rn%2n&&(t=t.add(this)),t.is0()}};j(Te,"BASE"),j(Te,"ZERO");let dt=Te;const ut=new dt(Do,Oo,1n,I(Do*Oo)),_t=new dt(0n,1n,1n,0n);dt.BASE=ut;dt.ZERO=_t;const _r=e=>Sr($r(tt(e,0n,Vi),Rs)).reverse(),Cr=e=>On("0x"+kr(wr(Ve(e)).reverse())),Ae=(e,t)=>{let n=e;for(;t-- >0n;)n*=n,n%=oe;return n},Sd=e=>{const n=e*e%oe*e%oe,i=Ae(n,2n)*n%oe,s=Ae(i,1n)*e%oe,o=Ae(s,5n)*s%oe,a=Ae(o,10n)*o%oe,r=Ae(a,20n)*a%oe,d=Ae(r,40n)*r%oe,c=Ae(d,80n)*d%oe,u=Ae(c,80n)*d%oe,g=Ae(u,10n)*o%oe;return{pow_p_5_8:Ae(g,2n)*e%oe,b2:n}},Bo=0x2b8324804fc1df0b2b4d00993dfbd7a72f431806ad2fe478c4ee1b274a0ea0b0n,xd=(e,t)=>{const n=I(t*t*t),i=I(n*n*t),s=Sd(e*i).pow_p_5_8;let o=I(e*n*s);const a=I(t*o*o),r=o,d=I(o*Bo),c=a===e,u=a===I(-e),g=a===I(-e*Bo);return c&&(o=r),(u||g)&&(o=d),(I(o)&1n)===1n&&(o=I(-o)),{isValid:c||u,value:o}},Ji=e=>Ar(Cr(e)),Is=(...e)=>Er.sha512Async(sn(...e)),Ad=(...e)=>kd("sha512")(sn(...e)),Tr=e=>{const t=e.slice(0,ct);t[0]&=248,t[31]&=127,t[31]|=64;const n=e.slice(ct,Rs),i=Ji(t),s=ut.multiply(i),o=s.toBytes();return{head:t,prefix:n,scalar:i,point:s,pointBytes:o}},Ms=e=>Is(Ve(e,ct)).then(Tr),_d=e=>Tr(Ad(Ve(e,ct))),Cd=e=>Ms(e).then(t=>t.pointBytes),Td=e=>Is(e.hashable).then(e.finish),Ed=(e,t,n)=>{const{pointBytes:i,scalar:s}=e,o=Ji(t),a=ut.multiply(o).toBytes();return{hashable:sn(a,i,n),finish:c=>{const u=Ar(o+Ji(c)*s);return Ve(sn(a,_r(u)),Rs)}}},Ld=async(e,t)=>{const n=Ve(e),i=await Ms(t),s=await Is(i.prefix,n);return Td(Ed(i,s,n))},Er={sha512Async:async e=>{const t=bd(),n=sn(e);return Qn(await t.digest("SHA-512",n.buffer))},sha512:void 0},Rd=(e=wd(ct))=>e,Id={getExtendedPublicKeyAsync:Ms,getExtendedPublicKey:_d,randomSecretKey:Rd},Nn=8,Md=256,Lr=Math.ceil(Md/Nn)+1,Qi=2**(Nn-1),Fd=()=>{const e=[];let t=ut,n=t;for(let i=0;i<Lr;i++){n=t,e.push(n);for(let s=1;s<Qi;s++)n=n.add(t),e.push(n);t=n.double()}return e};let Uo;const zo=(e,t)=>{const n=t.negate();return e?n:t},Pd=e=>{const t=Uo||(Uo=Fd());let n=_t,i=ut;const s=2**Nn,o=s,a=On(s-1),r=On(Nn);for(let d=0;d<Lr;d++){let c=Number(e&a);e>>=r,c>Qi&&(c-=o,e+=1n);const u=d*Qi,g=u,f=u+Math.abs(c)-1,m=d%2!==0,$=c<0;c===0?i=i.add(zo(m,t[g])):n=n.add(zo($,t[f]))}return e!==0n&&te("invalid wnaf"),{p:n,f:i}},Ci="openclaw-device-identity-v1";function Yi(e){let t="";for(const n of e)t+=String.fromCharCode(n);return btoa(t).replaceAll("+","-").replaceAll("/","_").replace(/=+$/g,"")}function Rr(e){const t=e.replaceAll("-","+").replaceAll("_","/"),n=t+"=".repeat((4-t.length%4)%4),i=atob(n),s=new Uint8Array(i.length);for(let o=0;o<i.length;o+=1)s[o]=i.charCodeAt(o);return s}function Dd(e){return Array.from(e).map(t=>t.toString(16).padStart(2,"0")).join("")}async function Ir(e){const t=await crypto.subtle.digest("SHA-256",e.slice().buffer);return Dd(new Uint8Array(t))}async function Od(){const e=Id.randomSecretKey(),t=await Cd(e);return{deviceId:await Ir(t),publicKey:Yi(t),privateKey:Yi(e)}}async function Fs(){try{const n=localStorage.getItem(Ci);if(n){const i=JSON.parse(n);if((i==null?void 0:i.version)===1&&typeof i.deviceId=="string"&&typeof i.publicKey=="string"&&typeof i.privateKey=="string"){const s=await Ir(Rr(i.publicKey));if(s!==i.deviceId){const o={...i,deviceId:s};return localStorage.setItem(Ci,JSON.stringify(o)),{deviceId:s,publicKey:i.publicKey,privateKey:i.privateKey}}return{deviceId:i.deviceId,publicKey:i.publicKey,privateKey:i.privateKey}}}}catch{}const e=await Od(),t={version:1,deviceId:e.deviceId,publicKey:e.publicKey,privateKey:e.privateKey,createdAtMs:Date.now()};return localStorage.setItem(Ci,JSON.stringify(t)),e}async function Nd(e,t){const n=Rr(e),i=new TextEncoder().encode(t),s=await Ld(i,n);return Yi(s)}async function Je(e,t){if(!(!e.client||!e.connected)&&!e.devicesLoading){e.devicesLoading=!0,t!=null&&t.quiet||(e.devicesError=null);try{const n=await e.client.request("device.pair.list",{});e.devicesList={pending:Array.isArray(n==null?void 0:n.pending)?n.pending:[],paired:Array.isArray(n==null?void 0:n.paired)?n.paired:[]}}catch(n){t!=null&&t.quiet||(e.devicesError=String(n))}finally{e.devicesLoading=!1}}}async function Bd(e,t){if(!(!e.client||!e.connected))try{await e.client.request("device.pair.approve",{requestId:t}),await Je(e)}catch(n){e.devicesError=String(n)}}async function Ud(e,t){if(!(!e.client||!e.connected||!window.confirm("Reject this device pairing request?")))try{await e.client.request("device.pair.reject",{requestId:t}),await Je(e)}catch(i){e.devicesError=String(i)}}async function zd(e,t){if(!(!e.client||!e.connected))try{const n=await e.client.request("device.token.rotate",t);if(n!=null&&n.token){const i=await Fs(),s=n.role??t.role;(n.deviceId===i.deviceId||t.deviceId===i.deviceId)&&mr({deviceId:i.deviceId,role:s,token:n.token,scopes:n.scopes??t.scopes??[]}),window.prompt("New device token (copy and store securely):",n.token)}await Je(e)}catch(n){e.devicesError=String(n)}}async function jd(e,t){if(!(!e.client||!e.connected||!window.confirm(`Revoke token for ${t.deviceId} (${t.role})?`)))try{await e.client.request("device.token.revoke",t);const i=await Fs();t.deviceId===i.deviceId&&yr({deviceId:i.deviceId,role:t.role}),await Je(e)}catch(i){e.devicesError=String(i)}}function Kd(e){if(!e||e.kind==="gateway")return{method:"exec.approvals.get",params:{}};const t=e.nodeId.trim();return t?{method:"exec.approvals.node.get",params:{nodeId:t}}:null}function Hd(e,t){if(!e||e.kind==="gateway")return{method:"exec.approvals.set",params:t};const n=e.nodeId.trim();return n?{method:"exec.approvals.node.set",params:{...t,nodeId:n}}:null}async function Ps(e,t){if(!(!e.client||!e.connected)&&!e.execApprovalsLoading){e.execApprovalsLoading=!0,e.lastError=null;try{const n=Kd(t);if(!n){e.lastError="Select a node before loading exec approvals.";return}const i=await e.client.request(n.method,n.params);qd(e,i)}catch(n){e.lastError=String(n)}finally{e.execApprovalsLoading=!1}}}function qd(e,t){e.execApprovalsSnapshot=t,e.execApprovalsDirty||(e.execApprovalsForm=rt(t.file??{}))}async function Gd(e,t){var n,i;if(!(!e.client||!e.connected)){e.execApprovalsSaving=!0,e.lastError=null;try{const s=(n=e.execApprovalsSnapshot)==null?void 0:n.hash;if(!s){e.lastError="Exec approvals hash missing; reload and retry.";return}const o=e.execApprovalsForm??((i=e.execApprovalsSnapshot)==null?void 0:i.file)??{},a=Hd(t,{file:o,baseHash:s});if(!a){e.lastError="Select a node before saving exec approvals.";return}await e.client.request(a.method,a.params),e.execApprovalsDirty=!1,await Ps(e,t)}catch(s){e.lastError=String(s)}finally{e.execApprovalsSaving=!1}}}function Wd(e,t,n){var s;const i=rt(e.execApprovalsForm??((s=e.execApprovalsSnapshot)==null?void 0:s.file)??{});er(i,t,n),e.execApprovalsForm=i,e.execApprovalsDirty=!0}function Vd(e,t){var i;const n=rt(e.execApprovalsForm??((i=e.execApprovalsSnapshot)==null?void 0:i.file)??{});tr(n,t),e.execApprovalsForm=n,e.execApprovalsDirty=!0}function fe(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams;for(const[a,r]of Object.entries(n))o.set(a,String(r));return`${s}?${o.toString()}`}async function Yn(e,t){e.oosLoading=!0,e.oosError=null;try{const[s,o,a,r]=await Promise.all([fetch(fe(e.basePath,"/api/oos/stats")),fetch(fe(e.basePath,"/api/oos/list",{limit:100})),fetch(fe(e.basePath,"/api/oos/by-file",{limit:50})),fetch(fe(e.basePath,"/api/oos/by-time",{days:30}))]),d=await s.json().catch(()=>({})),c=await o.json().catch(()=>({})),u=await a.json().catch(()=>({})),g=await r.json().catch(()=>({}));d.success&&d.data?(e.oosStats=d.data,e.oosDb=d.db??null):(e.oosStats=null,s.ok||(e.oosError=d.detail??`stats: ${s.status}`)),c.success&&Array.isArray(c.data)?e.oosList=c.data:(e.oosList=[],!e.oosError&&!o.ok&&(e.oosError=c.detail??`list: ${o.status}`)),u.success&&Array.isArray(u.data)?e.oosByFile=u.data:e.oosByFile=[],g.success&&Array.isArray(g.data)?e.oosByTime=g.data:e.oosByTime=[]}catch(s){e.oosError=s instanceof Error?s.message:String(s),e.oosStats=null,e.oosList=[],e.oosByFile=[],e.oosByTime=[]}finally{e.oosLoading=!1}}async function Jd(e,t){if(!(t!=null&&t.trim()))return!1;try{const n=await fetch(fe(e.basePath,"/api/oos/delete"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_key:t.trim()})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(await Yn(e),!0):(e.oosError=i.detail??`删除失败: ${n.status}`,!1)}catch(n){return e.oosError=n instanceof Error?n.message:String(n),!1}}async function Qd(e,t){const n=(t.product_name||"").trim();if(!n)return!1;try{const i=await fetch(fe(e.basePath,"/api/oos/add"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_name:n,specification:(t.specification??"").trim(),quantity:t.quantity??0,unit:(t.unit??"").trim()})}),s=await i.json().catch(()=>({}));return i.ok&&s.success?(await Yn(e),!0):(e.oosError=s.detail??`添加失败: ${i.status}`,!1)}catch(i){return e.oosError=i instanceof Error?i.message:String(i),!1}}async function Yd(e){try{const t=await fetch(fe(e.basePath,"/api/oos/stats")),n=await t.json().catch(()=>({}));if(t.ok&&n.success&&n.data)e.overviewOosStats=n.data,e.overviewOosError=null;else{e.overviewOosStats=null;const i=typeof n.detail=="string"?n.detail:n.message??n.error??`oos stats: ${t.status}`;e.overviewOosError=i}}catch(t){e.overviewOosStats=null,e.overviewOosError=t instanceof Error?t.message:String(t)}}async function Xn(e,t){e.shortageLoading=!0,e.shortageError=null;try{const[s,o,a,r]=await Promise.all([fetch(fe(e.basePath,"/api/shortage/stats"),{method:"GET"}),fetch(fe(e.basePath,"/api/shortage/list",{limit:100}),{method:"GET"}),fetch(fe(e.basePath,"/api/shortage/by-file"),{method:"GET"}),fetch(fe(e.basePath,"/api/shortage/by-time",{days:30}),{method:"GET"})]),d=await s.json().catch(()=>({})),c=await o.json().catch(()=>({})),u=await a.json().catch(()=>({})),g=await r.json().catch(()=>({}));if(d.success&&d.data)e.shortageStats=d.data,e.shortageDb=d.db??null;else if(e.shortageStats=null,!e.shortageError&&!s.ok){const f=typeof d.detail=="string"?d.detail:d.message??d.error;e.shortageError=f??`stats: ${s.status} ${s.statusText}`}if(c.success&&Array.isArray(c.data))e.shortageList=c.data;else if(e.shortageList=[],!e.shortageError&&!o.ok){const f=typeof c.detail=="string"?c.detail:c.message??c.error;e.shortageError=f??`list: ${o.status} ${o.statusText}`}if(u.success&&Array.isArray(u.data))e.shortageByFile=u.data;else if(e.shortageByFile=[],!e.shortageError&&!a.ok){const f=typeof u.detail=="string"?u.detail:u.message??u.error;e.shortageError=f??`by-file: ${a.status} ${a.statusText}`}if(g.success&&Array.isArray(g.data))e.shortageByTime=g.data;else if(e.shortageByTime=[],!e.shortageError&&!r.ok){const f=typeof g.detail=="string"?g.detail:g.message??g.error;e.shortageError=f??`by-time: ${r.status} ${r.statusText}`}}catch(s){e.shortageError=s instanceof Error?s.message:String(s),e.shortageStats=null,e.shortageList=[],e.shortageByFile=[],e.shortageByTime=[]}finally{e.shortageLoading=!1}}async function Xd(e,t){if(!(t!=null&&t.trim()))return!1;try{const n=await fetch(fe(e.basePath,"/api/shortage/delete"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_key:t.trim()})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(await Xn(e),!0):(e.shortageError=i.detail??`删除失败: ${n.status}`,!1)}catch(n){return e.shortageError=n instanceof Error?n.message:String(n),!1}}async function Zd(e,t){const n=(t.product_name||"").trim();if(!n)return!1;try{const i=await fetch(fe(e.basePath,"/api/shortage/add"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_name:n,specification:(t.specification??"").trim(),quantity:t.quantity??0,available_qty:t.available_qty??0})}),s=await i.json().catch(()=>({}));return i.ok&&s.success?(await Xn(e),!0):(e.shortageError=s.detail??`添加失败: ${i.status}`,!1)}catch(i){return e.shortageError=i instanceof Error?i.message:String(i),!1}}async function eu(e){try{const t=await fetch(fe(e.basePath,"/api/shortage/stats"),{method:"GET"}),n=await t.json().catch(()=>({}));if(t.ok&&n.success&&n.data)e.overviewShortageStats=n.data,e.overviewShortageError=null;else{e.overviewShortageStats=null;const i=typeof n.detail=="string"?n.detail:n.message??n.error??`shortage stats: ${t.status}`;e.overviewShortageError=i}}catch(t){e.overviewShortageStats=null,e.overviewShortageError=t instanceof Error?t.message:String(t)}}async function tu(e){if(!(!e.client||!e.connected)&&!e.presenceLoading){e.presenceLoading=!0,e.presenceError=null,e.presenceStatus=null;try{const t=await e.client.request("system-presence",{});Array.isArray(t)?(e.presenceEntries=t,e.presenceStatus=t.length===0?"No instances yet.":null):(e.presenceEntries=[],e.presenceStatus="No presence payload.")}catch(t){e.presenceError=String(t)}finally{e.presenceLoading=!1}}}async function ht(e,t){if(!(!e.client||!e.connected)&&!e.sessionsLoading){e.sessionsLoading=!0,e.sessionsError=null;try{const n=(t==null?void 0:t.includeGlobal)??e.sessionsIncludeGlobal,i=(t==null?void 0:t.includeUnknown)??e.sessionsIncludeUnknown,s=(t==null?void 0:t.activeMinutes)??Dn(e.sessionsFilterActive,0),o=(t==null?void 0:t.limit)??Dn(e.sessionsFilterLimit,0),a={includeGlobal:n,includeUnknown:i};s>0&&(a.activeMinutes=s),o>0&&(a.limit=o);const r=await e.client.request("sessions.list",a);r&&(e.sessionsResult=r)}catch(n){e.sessionsError=String(n)}finally{e.sessionsLoading=!1}}}async function nu(e,t,n){if(!e.client||!e.connected)return;const i={key:t};"label"in n&&(i.label=n.label),"thinkingLevel"in n&&(i.thinkingLevel=n.thinkingLevel),"verboseLevel"in n&&(i.verboseLevel=n.verboseLevel),"reasoningLevel"in n&&(i.reasoningLevel=n.reasoningLevel);try{await e.client.request("sessions.patch",i),await ht(e)}catch(s){e.sessionsError=String(s)}}async function iu(e,t){if(!e.client||!e.connected||e.sessionsLoading||!window.confirm(`Delete session "${t}"?

Deletes the session entry and archives its transcript.`))return!1;e.sessionsLoading=!0,e.sessionsError=null;try{return await e.client.request("sessions.delete",{key:t,deleteTranscript:!0}),!0}catch(i){return e.sessionsError=String(i),!1}finally{e.sessionsLoading=!1}}async function su(e,t){return await iu(e,t)?(await ht(e),!0):!1}function Et(e,t,n){if(!t.trim())return;const i={...e.skillMessages};n?i[t]=n:delete i[t],e.skillMessages=i}function Zn(e){return e instanceof Error?e.message:String(e)}async function dn(e,t){if(t!=null&&t.clearMessages&&Object.keys(e.skillMessages).length>0&&(e.skillMessages={}),!(!e.client||!e.connected)&&!e.skillsLoading){e.skillsLoading=!0,e.skillsError=null;try{const n=await e.client.request("skills.status",{});n&&(e.skillsReport=n)}catch(n){e.skillsError=Zn(n)}finally{e.skillsLoading=!1}}}function ou(e,t,n){e.skillEdits={...e.skillEdits,[t]:n}}async function au(e,t,n){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{await e.client.request("skills.update",{skillKey:t,enabled:n}),await dn(e),Et(e,t,{kind:"success",message:n?"Skill enabled":"Skill disabled"})}catch(i){const s=Zn(i);e.skillsError=s,Et(e,t,{kind:"error",message:s})}finally{e.skillsBusyKey=null}}}async function ru(e,t){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const n=e.skillEdits[t]??"";await e.client.request("skills.update",{skillKey:t,apiKey:n}),await dn(e),Et(e,t,{kind:"success",message:"API key saved"})}catch(n){const i=Zn(n);e.skillsError=i,Et(e,t,{kind:"error",message:i})}finally{e.skillsBusyKey=null}}}async function lu(e,t,n,i){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const s=await e.client.request("skills.install",{name:n,installId:i,timeoutMs:12e4});await dn(e),Et(e,t,{kind:"success",message:(s==null?void 0:s.message)??"Installed"})}catch(s){const o=Zn(s);e.skillsError=o,Et(e,t,{kind:"error",message:o})}finally{e.skillsBusyKey=null}}}const cu=[{label:"chat",tabs:["chat"]},{label:"control",tabs:["overview","channels","instances","sessions","work","cron"]},{label:"agent",tabs:["agents","skills","nodes"]},{label:"settings",tabs:["config","debug","logs"]}],Mr={agents:"/agents",overview:"/overview",channels:"/channels",instances:"/instances",sessions:"/sessions",work:"/work",cron:"/cron",skills:"/skills",nodes:"/nodes",chat:"/chat",config:"/config",debug:"/debug",logs:"/logs"},Fr=new Map(Object.entries(Mr).map(([e,t])=>[t,e]));function Rt(e){if(!e)return"";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t==="/"?"":(t.endsWith("/")&&(t=t.slice(0,-1)),t)}function on(e){if(!e)return"/";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t.length>1&&t.endsWith("/")&&(t=t.slice(0,-1)),t}function ei(e,t=""){const n=Rt(t),i=Mr[e];return n?`${n}${i}`:i}function Pr(e,t=""){const n=Rt(t);let i=e||"/";n&&(i===n?i="/":i.startsWith(`${n}/`)&&(i=i.slice(n.length)));let s=on(i).toLowerCase();return s.endsWith("/index.html")&&(s="/"),s==="/"?"chat":Fr.get(s)??null}function du(e){let t=on(e);if(t.endsWith("/index.html")&&(t=on(t.slice(0,-11))),t==="/")return"";const n=t.split("/").filter(Boolean);if(n.length===0)return"";for(let i=0;i<n.length;i++){const s=`/${n.slice(i).join("/")}`.toLowerCase();if(Fr.has(s)){const o=n.slice(0,i);return o.length?`/${o.join("/")}`:""}}return`/${n.join("/")}`}function uu(e){switch(e){case"agents":return"folder";case"chat":return"messageSquare";case"overview":return"barChart";case"channels":return"fileText";case"instances":return"radio";case"sessions":return"fileText";case"work":return"fileText";case"cron":return"loader";case"skills":return"zap";case"nodes":return"monitor";case"config":return"settings";case"debug":return"bug";case"logs":return"scrollText";default:return"folder"}}function Xi(e){return _(`tabs.${e}`)}function gu(e){return _(`subtitles.${e}`)}const Dr="openclaw.control.settings.v1";function fu(){const t={gatewayUrl:`${location.protocol==="https:"?"wss":"ws"}://${location.host}/ws`,token:"",sessionKey:"main",lastActiveSessionKey:"main",theme:"system",chatFocusMode:!1,chatShowThinking:!0,splitRatio:.6,navCollapsed:!1,navGroupsCollapsed:{}};try{const n=localStorage.getItem(Dr);if(!n)return t;const i=JSON.parse(n);return{gatewayUrl:typeof i.gatewayUrl=="string"&&i.gatewayUrl.trim()?i.gatewayUrl.trim():t.gatewayUrl,token:typeof i.token=="string"?i.token:t.token,sessionKey:typeof i.sessionKey=="string"&&i.sessionKey.trim()?i.sessionKey.trim():t.sessionKey,lastActiveSessionKey:typeof i.lastActiveSessionKey=="string"&&i.lastActiveSessionKey.trim()?i.lastActiveSessionKey.trim():typeof i.sessionKey=="string"&&i.sessionKey.trim()||t.lastActiveSessionKey,theme:i.theme==="light"||i.theme==="dark"||i.theme==="system"?i.theme:t.theme,chatFocusMode:typeof i.chatFocusMode=="boolean"?i.chatFocusMode:t.chatFocusMode,chatShowThinking:typeof i.chatShowThinking=="boolean"?i.chatShowThinking:t.chatShowThinking,splitRatio:typeof i.splitRatio=="number"&&i.splitRatio>=.4&&i.splitRatio<=.7?i.splitRatio:t.splitRatio,navCollapsed:typeof i.navCollapsed=="boolean"?i.navCollapsed:t.navCollapsed,navGroupsCollapsed:typeof i.navGroupsCollapsed=="object"&&i.navGroupsCollapsed!==null?i.navGroupsCollapsed:t.navGroupsCollapsed,locale:ws(i.locale)?i.locale:void 0}}catch{return t}}function hu(e){localStorage.setItem(Dr,JSON.stringify(e))}const bn=e=>Number.isNaN(e)?.5:e<=0?0:e>=1?1:e,pu=()=>typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches??!1,wn=e=>{e.classList.remove("theme-transition"),e.style.removeProperty("--theme-switch-x"),e.style.removeProperty("--theme-switch-y")},vu=({nextTheme:e,applyTheme:t,context:n,currentTheme:i})=>{var c;if(i===e)return;const s=globalThis.document??null;if(!s){t();return}const o=s.documentElement,a=s,r=pu();if(!!a.startViewTransition&&!r){let u=.5,g=.5;if((n==null?void 0:n.pointerClientX)!==void 0&&(n==null?void 0:n.pointerClientY)!==void 0&&typeof window<"u")u=bn(n.pointerClientX/window.innerWidth),g=bn(n.pointerClientY/window.innerHeight);else if(n!=null&&n.element){const f=n.element.getBoundingClientRect();f.width>0&&f.height>0&&typeof window<"u"&&(u=bn((f.left+f.width/2)/window.innerWidth),g=bn((f.top+f.height/2)/window.innerHeight))}o.style.setProperty("--theme-switch-x",`${u*100}%`),o.style.setProperty("--theme-switch-y",`${g*100}%`),o.classList.add("theme-transition");try{const f=(c=a.startViewTransition)==null?void 0:c.call(a,()=>{t()});f!=null&&f.finished?f.finished.finally(()=>wn(o)):wn(o)}catch{wn(o),t()}return}t(),wn(o)};function mu(){return typeof window>"u"||typeof window.matchMedia!="function"||window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function Ds(e){return e==="system"?mu():e}function We(e,t){var i;const n={...t,lastActiveSessionKey:((i=t.lastActiveSessionKey)==null?void 0:i.trim())||t.sessionKey.trim()||"main"};e.settings=n,hu(n),t.theme!==e.theme&&(e.theme=t.theme,ti(e,Ds(t.theme))),e.applySessionKey=e.settings.lastActiveSessionKey}function Or(e,t){const n=t.trim();n&&e.settings.lastActiveSessionKey!==n&&We(e,{...e.settings,lastActiveSessionKey:n})}function yu(e){if(!window.location.search&&!window.location.hash)return;const t=new URL(window.location.href),n=new URLSearchParams(t.search),i=new URLSearchParams(t.hash.startsWith("#")?t.hash.slice(1):t.hash),s=n.get("token")??i.get("token"),o=n.get("password")??i.get("password"),a=n.get("session")??i.get("session"),r=n.get("gatewayUrl")??i.get("gatewayUrl");let d=!1;if(s!=null){const u=s.trim();u&&u!==e.settings.token&&We(e,{...e.settings,token:u}),n.delete("token"),i.delete("token"),d=!0}if(o!=null&&(n.delete("password"),i.delete("password"),d=!0),a!=null){const u=a.trim();u&&(e.sessionKey=u,We(e,{...e.settings,sessionKey:u,lastActiveSessionKey:u}))}if(r!=null){const u=r.trim();u&&u!==e.settings.gatewayUrl&&(e.pendingGatewayUrl=u),n.delete("gatewayUrl"),i.delete("gatewayUrl"),d=!0}if(!d)return;t.search=n.toString();const c=i.toString();t.hash=c?`#${c}`:"",window.history.replaceState({},"",t.toString())}function bu(e,t){e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?Ss(e):xs(e),t==="debug"?As(e):_s(e),Os(e),Br(e,t,!1)}function wu(e,t,n){vu({nextTheme:t,applyTheme:()=>{e.theme=t,We(e,{...e.settings,theme:t}),ti(e,Ds(t))},context:n,currentTheme:e.theme})}async function Os(e){var t,n,i,s,o,a;if(e.tab==="overview"&&(await Ur(e),await Promise.all([Yd(e),eu(e)])),e.tab==="channels"&&await dr(e),e.tab==="instances"){const r=e;await Yn(r),await Xn(r)}if(e.tab==="sessions"&&await ht(e),e.tab==="cron"&&await Bn(e),e.tab==="skills"&&await dn(e),e.tab==="agents"){await Cs(e),await Ee(e);const r=((n=(t=e.agentsList)==null?void 0:t.agents)==null?void 0:n.map(c=>c.id))??[];r.length>0&&cr(e,r);const d=e.agentsSelectedId??((i=e.agentsList)==null?void 0:i.defaultId)??((a=(o=(s=e.agentsList)==null?void 0:s.agents)==null?void 0:o[0])==null?void 0:a.id);d&&(lr(e,d),e.agentsPanel==="skills"&&Ln(e,d),e.agentsPanel==="channels"&&me(e,!1),e.agentsPanel==="cron"&&Bn(e))}e.tab==="nodes"&&(await Vn(e),await Je(e),await Ee(e),await Ps(e)),e.tab==="chat"&&(await Wr(e),ln(e,!e.chatHasAutoScrolled)),e.tab==="config"&&(await xc(e),await Ee(e)),e.tab==="debug"&&(await Wn(e),e.eventLog=e.eventLogBuffer),e.tab==="logs"&&(e.logsAtBottom=!0,await ks(e,{reset:!0}),rr(e,!0))}function $u(){if(typeof window>"u")return"";const e=window.__OPENCLAW_CONTROL_UI_BASE_PATH__;return typeof e=="string"&&e.trim()?Rt(e):du(window.location.pathname)}function ku(e){e.theme=e.settings.theme??"system",ti(e,Ds(e.theme))}function ti(e,t){if(e.themeResolved=t,typeof document>"u")return;const n=document.documentElement;n.dataset.theme=t,n.style.colorScheme=t}function Su(e){if(typeof window>"u"||typeof window.matchMedia!="function")return;if(e.themeMedia=window.matchMedia("(prefers-color-scheme: dark)"),e.themeMediaHandler=n=>{e.theme==="system"&&ti(e,n.matches?"dark":"light")},typeof e.themeMedia.addEventListener=="function"){e.themeMedia.addEventListener("change",e.themeMediaHandler);return}e.themeMedia.addListener(e.themeMediaHandler)}function xu(e){if(!e.themeMedia||!e.themeMediaHandler)return;if(typeof e.themeMedia.removeEventListener=="function"){e.themeMedia.removeEventListener("change",e.themeMediaHandler);return}e.themeMedia.removeListener(e.themeMediaHandler),e.themeMedia=null,e.themeMediaHandler=null}function Au(e,t){if(typeof window>"u")return;const n=Pr(window.location.pathname,e.basePath)??"chat";Nr(e,n),Br(e,n,t)}function _u(e){var s;if(typeof window>"u")return;const t=Pr(window.location.pathname,e.basePath);if(!t)return;const i=(s=new URL(window.location.href).searchParams.get("session"))==null?void 0:s.trim();i&&(e.sessionKey=i,We(e,{...e.settings,sessionKey:i,lastActiveSessionKey:i})),Nr(e,t)}function Nr(e,t){e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?Ss(e):xs(e),t==="debug"?As(e):_s(e),e.connected&&Os(e)}function Br(e,t,n){if(typeof window>"u")return;const i=on(ei(t,e.basePath)),s=on(window.location.pathname),o=new URL(window.location.href);t==="chat"&&e.sessionKey?o.searchParams.set("session",e.sessionKey):o.searchParams.delete("session"),s!==i&&(o.pathname=i),n?window.history.replaceState({},"",o.toString()):window.history.pushState({},"",o.toString())}function Cu(e,t,n){if(typeof window>"u")return;const i=new URL(window.location.href);i.searchParams.set("session",t),window.history.replaceState({},"",i.toString())}async function Ur(e){await Promise.all([me(e,!1),tu(e),ht(e),cn(e),Wn(e)])}async function Bn(e){await Promise.all([me(e,!1),cn(e),Jn(e)])}const jo=50,Tu=80,Eu=12e4;function Lu(e){if(!e||typeof e!="object")return null;const t=e;if(typeof t.text=="string")return t.text;const n=t.content;if(!Array.isArray(n))return null;const i=n.map(s=>{if(!s||typeof s!="object")return null;const o=s;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(s=>!!s);return i.length===0?null:i.join(`
`)}function Ko(e){if(e==null)return null;if(typeof e=="number"||typeof e=="boolean")return String(e);const t=Lu(e);let n;if(typeof e=="string")n=e;else if(t)n=t;else try{n=JSON.stringify(e,null,2)}catch{n=String(e)}const i=gr(n,Eu);return i.truncated?`${i.text}

… truncated (${i.total} chars, showing first ${i.text.length}).`:i.text}function Ru(e){const t=[];return t.push({type:"toolcall",name:e.name,arguments:e.args??{}}),e.output&&t.push({type:"toolresult",name:e.name,text:e.output}),{role:"assistant",toolCallId:e.toolCallId,runId:e.runId,content:t,timestamp:e.startedAt}}function Iu(e){if(e.toolStreamOrder.length<=jo)return;const t=e.toolStreamOrder.length-jo,n=e.toolStreamOrder.splice(0,t);for(const i of n)e.toolStreamById.delete(i)}function Mu(e){e.chatToolMessages=e.toolStreamOrder.map(t=>{var n;return(n=e.toolStreamById.get(t))==null?void 0:n.message}).filter(t=>!!t)}function Zi(e){e.toolStreamSyncTimer!=null&&(clearTimeout(e.toolStreamSyncTimer),e.toolStreamSyncTimer=null),Mu(e)}function Fu(e,t=!1){if(t){Zi(e);return}e.toolStreamSyncTimer==null&&(e.toolStreamSyncTimer=window.setTimeout(()=>Zi(e),Tu))}function ni(e){e.toolStreamById.clear(),e.toolStreamOrder=[],e.chatToolMessages=[],Zi(e)}const Pu=5e3;function Du(e,t){var s;const n=t.data??{},i=typeof n.phase=="string"?n.phase:"";e.compactionClearTimer!=null&&(window.clearTimeout(e.compactionClearTimer),e.compactionClearTimer=null),i==="start"?e.compactionStatus={active:!0,startedAt:Date.now(),completedAt:null}:i==="end"&&(e.compactionStatus={active:!1,startedAt:((s=e.compactionStatus)==null?void 0:s.startedAt)??null,completedAt:Date.now()},e.compactionClearTimer=window.setTimeout(()=>{e.compactionStatus=null,e.compactionClearTimer=null},Pu))}function Ou(e,t){if(!t)return;if(t.stream==="compaction"){Du(e,t);return}if(t.stream!=="tool")return;const n=typeof t.sessionKey=="string"?t.sessionKey:void 0;if(n&&n!==e.sessionKey||!n&&e.chatRunId&&t.runId!==e.chatRunId||e.chatRunId&&t.runId!==e.chatRunId||!e.chatRunId)return;const i=t.data??{},s=typeof i.toolCallId=="string"?i.toolCallId:"";if(!s)return;const o=typeof i.name=="string"?i.name:"tool",a=typeof i.phase=="string"?i.phase:"",r=a==="start"?i.args:void 0,d=a==="update"?Ko(i.partialResult):a==="result"?Ko(i.result):void 0,c=Date.now();let u=e.toolStreamById.get(s);u?(u.name=o,r!==void 0&&(u.args=r),d!==void 0&&(u.output=d||void 0),u.updatedAt=c):(u={toolCallId:s,runId:t.runId,sessionKey:n,name:o,args:r,output:d||void 0,startedAt:typeof t.ts=="number"?t.ts:c,updatedAt:c,message:{}},e.toolStreamById.set(s,u),e.toolStreamOrder.push(s)),u.message=Ru(u),Iu(e),Fu(e,a==="result")}function Ti(e){return e==null?"":String(e).trim()}const Ei=new WeakMap,Li=new WeakMap;function es(e){const t=e,n=typeof t.role=="string"?t.role:"",i=t.content;if(typeof i=="string")return n==="assistant"?Si(i):Ti(i);if(Array.isArray(i)){const s=i.map(o=>{const a=o;return a.type==="text"&&typeof a.text=="string"?a.text:null}).filter(o=>typeof o=="string");if(s.length>0){const o=s.join(`
`);return n==="assistant"?Si(o):Ti(o)}}return typeof t.text=="string"?n==="assistant"?Si(t.text):Ti(t.text):null}function zr(e){if(!e||typeof e!="object")return es(e);const t=e;if(Ei.has(t))return Ei.get(t)??null;const n=es(e);return Ei.set(t,n),n}function Ho(e){const n=e.content,i=[];if(Array.isArray(n))for(const r of n){const d=r;if(d.type==="thinking"&&typeof d.thinking=="string"){const c=d.thinking.trim();c&&i.push(c)}}if(i.length>0)return i.join(`
`);const s=Bu(e);if(!s)return null;const a=[...s.matchAll(/<\s*think(?:ing)?\s*>([\s\S]*?)<\s*\/\s*think(?:ing)?\s*>/gi)].map(r=>(r[1]??"").trim()).filter(Boolean);return a.length>0?a.join(`
`):null}function Nu(e){if(!e||typeof e!="object")return Ho(e);const t=e;if(Li.has(t))return Li.get(t)??null;const n=Ho(e);return Li.set(t,n),n}function Bu(e){const t=e,n=t.content;if(typeof n=="string")return n;if(Array.isArray(n)){const i=n.map(s=>{const o=s;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(s=>typeof s=="string");if(i.length>0)return i.join(`
`)}return typeof t.text=="string"?t.text:null}function Uu(e){const t=e.trim();if(!t)return"";const n=t.split(/\r?\n/).map(i=>i.trim()).filter(Boolean).map(i=>`_${i}_`);return n.length?["_Reasoning:_",...n].join(`
`):""}let qo=!1;function Go(e){e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t="";for(let n=0;n<e.length;n++)t+=e[n].toString(16).padStart(2,"0");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}function zu(){const e=new Uint8Array(16),t=Date.now();for(let n=0;n<e.length;n++)e[n]=Math.floor(Math.random()*256);return e[0]^=t&255,e[1]^=t>>>8&255,e[2]^=t>>>16&255,e[3]^=t>>>24&255,e}function ju(){qo||(qo=!0,console.warn("[uuid] crypto API missing; falling back to weak randomness"))}function Ns(e=globalThis.crypto){if(e&&typeof e.randomUUID=="function")return e.randomUUID();if(e&&typeof e.getRandomValues=="function"){const t=new Uint8Array(16);return e.getRandomValues(t),Go(t)}return ju(),Go(zu())}async function an(e){if(!(!e.client||!e.connected)){e.chatLoading=!0,e.lastError=null;try{const t=await e.client.request("chat.history",{sessionKey:e.sessionKey,limit:200}),n=Array.isArray(t.messages)?t.messages:[];(n.length>0||e.chatMessages.length===0)&&(e.chatMessages=n),e.chatThinkingLevel=t.thinkingLevel??null}catch(t){e.lastError=String(t)}finally{e.chatLoading=!1}}}function Ku(e){const t=/^data:([^;]+);base64,(.+)$/.exec(e);return t?{mimeType:t[1],content:t[2]}:null}function Hu(e){if(!e||typeof e!="object")return null;const t=e;return t.role!=="assistant"||!("content"in t)||!Array.isArray(t.content)?null:t}async function qu(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",i=n?`${n}/api/quotation/upload`:"/api/quotation/upload",s=new FormData;s.append("file",t);try{const o=await fetch(i,{method:"POST",body:s,credentials:"same-origin"});if(!o.ok){const r=await o.text();throw new Error(r||`Upload failed: ${o.status}`)}const a=await o.json();return typeof a.file_path!="string"?null:{file_path:a.file_path,file_name:a.file_name??t.name}}catch(o){throw console.error("uploadChatFile",o),o}}async function Gu(e,t,n,i){if(!e.client||!e.connected)return null;const s=t.trim(),o=n&&n.length>0;if(!s&&!o)return null;const a=Date.now(),r=[];if(s&&r.push({type:"text",text:s}),o)for(const g of n)r.push({type:"image",source:{type:"base64",media_type:g.mimeType,data:g.dataUrl}});e.chatMessages=[...e.chatMessages,{role:"user",content:r,timestamp:a}],e.chatSending=!0,e.lastError=null;const d=Ns();e.chatRunId=d,e.chatStream="",e.chatStreamStartedAt=a;const c=o?n.map(g=>{const f=Ku(g.dataUrl);return f?{type:"image",mimeType:f.mimeType,content:f.content}:null}).filter(g=>g!==null):void 0,u=i!=null&&i.file_path?{file_path:i.file_path}:void 0;try{return await e.client.request("chat.send",{sessionKey:e.sessionKey,message:s,deliver:!1,idempotencyKey:d,attachments:c,...u?{context:u,file_path:i.file_path}:{}}),d}catch(g){const f=String(g);return e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,e.lastError=f,e.chatMessages=[...e.chatMessages,{role:"assistant",content:[{type:"text",text:"Error: "+f}],timestamp:Date.now()}],null}finally{e.chatSending=!1}}async function Wu(e){if(!e.client||!e.connected)return!1;const t=e.chatRunId;try{return await e.client.request("chat.abort",t?{sessionKey:e.sessionKey,runId:t}:{sessionKey:e.sessionKey}),!0}catch(n){return e.lastError=String(n),!1}}function Vu(e,t){if(!t||t.sessionKey!==e.sessionKey)return null;if(t.runId&&e.chatRunId&&t.runId!==e.chatRunId)return t.state==="final"?"foreign_final":null;if(t.state==="delta"){const n=es(t.message);if(typeof n=="string"){const i=e.chatStream??"";(!i||n.length>=i.length)&&(e.chatStream=n)}}else if(t.state==="final")e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null;else if(t.state==="aborted"){const n=Hu(t.message);if(n)e.chatMessages=[...e.chatMessages,n];else{const i=e.chatStream??"";i.trim()&&(e.chatMessages=[...e.chatMessages,{role:"assistant",content:[{type:"text",text:i}],timestamp:Date.now()}])}e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null}else t.state==="error"&&(e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null,e.lastError=t.errorMessage??"chat error");return t.state}const jr=120;function Kr(e){return e.chatSending||!!e.chatRunId}function Ju(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/stop"?!0:n==="stop"||n==="esc"||n==="abort"||n==="wait"||n==="exit"}function Qu(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/new"||n==="/reset"?!0:n.startsWith("/new ")||n.startsWith("/reset ")}async function Hr(e){e.connected&&(e.chatMessage="",await Wu(e))}function Yu(e,t,n,i){const s=t.trim(),o=!!(n&&n.length>0);!s&&!o||(e.chatQueue=[...e.chatQueue,{id:Ns(),text:s,createdAt:Date.now(),attachments:o?n==null?void 0:n.map(a=>({...a})):void 0,refreshSessions:i}])}async function qr(e,t,n){var o,a;ni(e);const i=await Gu(e,t,n==null?void 0:n.attachments,e.chatUploadedFile??void 0),s=!!i;return!s&&(n==null?void 0:n.previousDraft)!=null&&(e.chatMessage=n.previousDraft),!s&&(n!=null&&n.previousAttachments)&&(e.chatAttachments=n.previousAttachments),s&&Or(e,e.sessionKey),s&&(n!=null&&n.restoreDraft)&&((o=n.previousDraft)!=null&&o.trim())&&(e.chatMessage=n.previousDraft),s&&(n!=null&&n.restoreAttachments)&&((a=n.previousAttachments)!=null&&a.length)&&(e.chatAttachments=n.previousAttachments),ln(e),s&&!e.chatRunId&&Gr(e),s&&(n!=null&&n.refreshSessions)&&i&&e.refreshSessionsAfterChat.add(i),s}async function Gr(e){if(!e.connected||Kr(e))return;const[t,...n]=e.chatQueue;if(!t)return;e.chatQueue=n,await qr(e,t.text,{attachments:t.attachments,refreshSessions:t.refreshSessions})||(e.chatQueue=[t,...e.chatQueue])}function Xu(e,t){e.chatQueue=e.chatQueue.filter(n=>n.id!==t)}async function Zu(e,t,n){if(!e.connected)return;const i=e.chatMessage,s=(t??e.chatMessage).trim(),o=e.chatAttachments??[],a=t==null?o:[],r=a.length>0;if(!s&&!r)return;if(Ju(s)){await Hr(e);return}const d=Qu(s);if(t==null&&(e.chatMessage="",e.chatAttachments=[]),Kr(e)){Yu(e,s,a,d);return}await qr(e,s,{previousDraft:t==null?i:void 0,restoreDraft:!!(t&&(n!=null&&n.restoreDraft)),attachments:r?a:void 0,previousAttachments:t==null?o:void 0,restoreAttachments:!!(t&&(n!=null&&n.restoreDraft)),refreshSessions:d})}async function Wr(e,t){await Promise.all([an(e),ht(e,{activeMinutes:jr}),ts(e)]),(t==null?void 0:t.scheduleScroll)!==!1&&ln(e)}const eg=Gr;function tg(e){var s,o,a;const t=ar(e.sessionKey);if(t!=null&&t.agentId)return t.agentId;const n=(s=e.hello)==null?void 0:s.snapshot;return((a=(o=n==null?void 0:n.sessionDefaults)==null?void 0:o.defaultAgentId)==null?void 0:a.trim())||"main"}function ng(e,t){const n=Rt(e),i=encodeURIComponent(t);return n?`${n}/avatar/${i}?meta=1`:`/avatar/${i}?meta=1`}async function ts(e){if(!e.connected){e.chatAvatarUrl=null;return}const t=tg(e);if(!t){e.chatAvatarUrl=null;return}e.chatAvatarUrl=null;const n=ng(e.basePath,t);try{const i=await fetch(n,{method:"GET"});if(!i.ok){e.chatAvatarUrl=null;return}const s=await i.json(),o=typeof s.avatarUrl=="string"?s.avatarUrl.trim():"";e.chatAvatarUrl=o||null}catch{e.chatAvatarUrl=null}}const ig={trace:!0,debug:!0,info:!0,warn:!0,error:!0,fatal:!0},sg={name:"",description:"",agentId:"",enabled:!0,scheduleKind:"every",scheduleAt:"",everyAmount:"30",everyUnit:"minutes",cronExpr:"0 7 * * *",cronTz:"",sessionTarget:"isolated",wakeMode:"now",payloadKind:"agentTurn",payloadText:"",deliveryMode:"announce",deliveryChannel:"last",deliveryTo:"",timeoutSeconds:""},og=50,ag=200,rg="Jagent";function Wo(e,t){if(typeof e!="string")return;const n=e.trim();if(n)return n.length<=t?n:n.slice(0,t)}function Bs(e){const t=Wo(e==null?void 0:e.name,og)??rg,n=Wo((e==null?void 0:e.avatar)??void 0,ag)??null;return{agentId:typeof(e==null?void 0:e.agentId)=="string"&&e.agentId.trim()?e.agentId.trim():null,name:t,avatar:n}}async function Vr(e,t){if(!e.client||!e.connected)return;const n=e.sessionKey.trim(),i=n?{sessionKey:n}:{};try{const s=await e.client.request("agent.identity.get",i);if(!s)return;const o=Bs(s);e.assistantName=o.name,e.assistantAvatar=o.avatar,e.assistantAgentId=o.agentId??null}catch{}}function ns(e){return typeof e=="object"&&e!==null}function lg(e){if(!ns(e))return null;const t=typeof e.id=="string"?e.id.trim():"",n=e.request;if(!t||!ns(n))return null;const i=typeof n.command=="string"?n.command.trim():"";if(!i)return null;const s=typeof e.createdAtMs=="number"?e.createdAtMs:0,o=typeof e.expiresAtMs=="number"?e.expiresAtMs:0;return!s||!o?null:{id:t,request:{command:i,cwd:typeof n.cwd=="string"?n.cwd:null,host:typeof n.host=="string"?n.host:null,security:typeof n.security=="string"?n.security:null,ask:typeof n.ask=="string"?n.ask:null,agentId:typeof n.agentId=="string"?n.agentId:null,resolvedPath:typeof n.resolvedPath=="string"?n.resolvedPath:null,sessionKey:typeof n.sessionKey=="string"?n.sessionKey:null},createdAtMs:s,expiresAtMs:o}}function cg(e){if(!ns(e))return null;const t=typeof e.id=="string"?e.id.trim():"";return t?{id:t,decision:typeof e.decision=="string"?e.decision:null,resolvedBy:typeof e.resolvedBy=="string"?e.resolvedBy:null,ts:typeof e.ts=="number"?e.ts:null}:null}function Jr(e){const t=Date.now();return e.filter(n=>n.expiresAtMs>t)}function dg(e,t){const n=Jr(e).filter(i=>i.id!==t.id);return n.push(t),n}function Vo(e,t){return Jr(e).filter(n=>n.id!==t)}function ug(e){return{}}const Jo={WEBCHAT:"webchat"},Qo={CONTROL_UI:"control-ui"},gg=4008;class fg{constructor(t){this.opts=t,this.ws=null,this.pending=new Map,this.closed=!1,this.lastSeq=null,this.connectNonce=null,this.connectSent=!1,this.connectTimer=null,this.backoffMs=800}start(){this.closed=!1,this.connect()}stop(){var t;this.closed=!0,(t=this.ws)==null||t.close(),this.ws=null,this.flushPending(new Error("gateway client stopped"))}get connected(){var t;return((t=this.ws)==null?void 0:t.readyState)===WebSocket.OPEN}connect(){this.closed||(this.ws=new WebSocket(this.opts.url),this.ws.addEventListener("open",()=>this.queueConnect()),this.ws.addEventListener("message",t=>this.handleMessage(String(t.data??""))),this.ws.addEventListener("close",t=>{var i,s;const n=String(t.reason??"");this.ws=null,this.flushPending(new Error(`gateway closed (${t.code}): ${n}`)),(s=(i=this.opts).onClose)==null||s.call(i,{code:t.code,reason:n}),this.scheduleReconnect()}),this.ws.addEventListener("error",()=>{}))}scheduleReconnect(){if(this.closed)return;const t=this.backoffMs;this.backoffMs=Math.min(this.backoffMs*1.7,15e3),window.setTimeout(()=>this.connect(),t)}flushPending(t){for(const[,n]of this.pending)n.reject(t);this.pending.clear()}async sendConnect(){var u;if(this.connectSent)return;this.connectSent=!0,this.connectTimer!==null&&(window.clearTimeout(this.connectTimer),this.connectTimer=null);const t=typeof crypto<"u"&&!!crypto.subtle,n=["operator.admin","operator.approvals","operator.pairing"],i="operator";let s=null,o=!1,a=this.opts.token;if(t){s=await Fs();const g=(u=fd({deviceId:s.deviceId,role:i}))==null?void 0:u.token;a=g??this.opts.token,o=!!(g&&this.opts.token)}const r=a||this.opts.password?{token:a,password:this.opts.password}:void 0;let d;if(t&&s){const g=Date.now(),f=this.connectNonce??void 0,m=ug({deviceId:s.deviceId,clientId:this.opts.clientName??Qo.CONTROL_UI,clientMode:this.opts.mode??Jo.WEBCHAT}),$=await Nd(s.privateKey,m);d={id:s.deviceId,publicKey:s.publicKey,signature:$,signedAt:g,nonce:f}}const c={minProtocol:3,maxProtocol:3,client:{id:this.opts.clientName??Qo.CONTROL_UI,version:this.opts.clientVersion??"dev",platform:this.opts.platform??navigator.platform??"web",mode:this.opts.mode??Jo.WEBCHAT,instanceId:this.opts.instanceId},role:i,scopes:n,device:d,caps:[],auth:r,userAgent:navigator.userAgent,locale:navigator.language};this.request("connect",c).then(g=>{var f,m,$;(f=g==null?void 0:g.auth)!=null&&f.deviceToken&&s&&mr({deviceId:s.deviceId,role:g.auth.role??i,token:g.auth.deviceToken,scopes:g.auth.scopes??[]}),this.backoffMs=800,($=(m=this.opts).onHello)==null||$.call(m,g)}).catch(()=>{var g;o&&s&&yr({deviceId:s.deviceId,role:i}),(g=this.ws)==null||g.close(gg,"connect failed")})}handleMessage(t){var s,o,a,r,d;let n;try{n=JSON.parse(t)}catch{return}const i=n;if(i.type==="event"){const c=n;if(c.event==="connect.challenge"){const g=c.payload,f=g&&typeof g.nonce=="string"?g.nonce:null;f&&(this.connectNonce=f,this.sendConnect());return}const u=typeof c.seq=="number"?c.seq:null;u!==null&&(this.lastSeq!==null&&u>this.lastSeq+1&&((o=(s=this.opts).onGap)==null||o.call(s,{expected:this.lastSeq+1,received:u})),this.lastSeq=u);try{(r=(a=this.opts).onEvent)==null||r.call(a,c)}catch(g){console.error("[gateway] event handler error:",g)}return}if(i.type==="res"){const c=n,u=this.pending.get(c.id);if(!u)return;this.pending.delete(c.id),c.ok?u.resolve(c.payload):u.reject(new Error(((d=c.error)==null?void 0:d.message)??"request failed"));return}}request(t,n){if(!this.ws||this.ws.readyState!==WebSocket.OPEN)return Promise.reject(new Error("gateway not connected"));const i=Ns(),s={type:"req",id:i,method:t,params:n},o=new Promise((a,r)=>{this.pending.set(i,{resolve:d=>a(d),reject:r})});return this.ws.send(JSON.stringify(s)),o}queueConnect(){this.connectNonce=null,this.connectSent=!1,this.connectTimer!==null&&window.clearTimeout(this.connectTimer),this.connectTimer=window.setTimeout(()=>{this.sendConnect()},750)}}function Ri(e,t){var r,d,c;const n=(e??"").trim(),i=(r=t.mainSessionKey)==null?void 0:r.trim();if(!i)return n;if(!n)return i;const s=((d=t.mainKey)==null?void 0:d.trim())||"main",o=(c=t.defaultAgentId)==null?void 0:c.trim();return n==="main"||n===s||o&&(n===`agent:${o}:main`||n===`agent:${o}:${s}`)?i:n}function hg(e,t){if(!(t!=null&&t.mainSessionKey))return;const n=Ri(e.sessionKey,t),i=Ri(e.settings.sessionKey,t),s=Ri(e.settings.lastActiveSessionKey,t),o=n||i||e.sessionKey,a={...e.settings,sessionKey:i||o,lastActiveSessionKey:s||o},r=a.sessionKey!==e.settings.sessionKey||a.lastActiveSessionKey!==e.settings.lastActiveSessionKey;o!==e.sessionKey&&(e.sessionKey=o),r&&We(e,a)}function Qr(e){e.lastError=null,e.hello=null,e.connected=!1,e.execApprovalQueue=[],e.execApprovalError=null;const t=e.client,n=new fg({url:e.settings.gatewayUrl,token:e.settings.token.trim()?e.settings.token:void 0,password:e.password.trim()?e.password:void 0,clientName:"openclaw-control-ui",mode:"webchat",onHello:i=>{e.client===n&&(e.connected=!0,e.lastError=null,e.hello=i,mg(e,i),e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,ni(e),Vr(e),Cs(e),Vn(e,{quiet:!0}),Je(e,{quiet:!0}),Os(e))},onClose:({code:i,reason:s})=>{e.client===n&&(e.connected=!1,i!==1012&&(e.lastError=`disconnected (${i}): ${s||"no reason"}`))},onEvent:i=>{e.client===n&&pg(e,i)},onGap:({expected:i,received:s})=>{e.client===n&&(e.lastError=`event gap detected (expected seq ${i}, got ${s}); refresh recommended`)}});e.client=n,t==null||t.stop(),n.start()}function pg(e,t){try{vg(e,t)}catch(n){console.error("[gateway] handleGatewayEvent error:",t.event,n)}}function vg(e,t){if(e.eventLogBuffer=[{ts:Date.now(),event:t.event,payload:t.payload},...e.eventLogBuffer].slice(0,250),e.tab==="debug"&&(e.eventLog=e.eventLogBuffer),t.event==="agent"){if(e.onboarding)return;Ou(e,t.payload);return}if(t.event==="chat"){const n=t.payload;n!=null&&n.sessionKey&&Or(e,n.sessionKey);const i=Vu(e,n);if(i==="final"||i==="error"||i==="aborted"){ni(e),eg(e);const s=n==null?void 0:n.runId;s&&e.refreshSessionsAfterChat.has(s)&&(e.refreshSessionsAfterChat.delete(s),i==="final"&&ht(e,{activeMinutes:jr}))}(i==="final"||i==="foreign_final")&&an(e);return}if(t.event==="presence"){const n=t.payload;n!=null&&n.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence,e.presenceError=null,e.presenceStatus=null);return}if(t.event==="cron"&&e.tab==="cron"&&Bn(e),(t.event==="device.pair.requested"||t.event==="device.pair.resolved")&&Je(e,{quiet:!0}),t.event==="exec.approval.requested"){const n=lg(t.payload);if(n){e.execApprovalQueue=dg(e.execApprovalQueue,n),e.execApprovalError=null;const i=Math.max(0,n.expiresAtMs-Date.now()+500);window.setTimeout(()=>{e.execApprovalQueue=Vo(e.execApprovalQueue,n.id)},i)}return}if(t.event==="exec.approval.resolved"){const n=cg(t.payload);n&&(e.execApprovalQueue=Vo(e.execApprovalQueue,n.id))}}function mg(e,t){const n=t.snapshot;n!=null&&n.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence),n!=null&&n.health&&(e.debugHealth=n.health),n!=null&&n.sessionDefaults&&hg(e,n.sessionDefaults)}const Yo="/api/bootstrap";async function yg(e){if(typeof window>"u"||typeof fetch!="function")return;const t=Rt(e.basePath??""),n=t?`${t}${Yo}`:Yo;try{const i=await fetch(n,{method:"GET",headers:{Accept:"application/json"},credentials:"same-origin"});if(!i.ok)return;const s=await i.json(),o=Bs({agentId:s.assistantAgentId??null,name:s.assistantName,avatar:s.assistantAvatar??null});e.assistantName=o.name,e.assistantAvatar=o.avatar,e.assistantAgentId=o.agentId??null}catch{}}function bg(e){e.basePath=$u(),yg(e),yu(e),Au(e,!0),ku(e),Su(e),window.addEventListener("popstate",e.popStateHandler),Qr(e),ed(e),e.tab==="logs"&&Ss(e),e.tab==="debug"&&As(e)}function wg(e){Wc(e)}function $g(e){var t;window.removeEventListener("popstate",e.popStateHandler),td(e),xs(e),_s(e),xu(e),(t=e.topbarObserver)==null||t.disconnect(),e.topbarObserver=null}function kg(e,t){if(!(e.tab==="chat"&&e.chatManualRefreshInFlight)){if(e.tab==="chat"&&(t.has("chatMessages")||t.has("chatToolMessages")||t.has("chatStream")||t.has("chatLoading")||t.has("tab"))){const n=t.has("tab"),i=t.has("chatLoading")&&t.get("chatLoading")===!0&&!e.chatLoading;ln(e,n||i||!e.chatHasAutoScrolled)}e.tab==="logs"&&(t.has("logsEntries")||t.has("logsAutoFollow")||t.has("tab"))&&e.logsAutoFollow&&e.logsAtBottom&&rr(e,t.has("tab")||t.has("logsAutoFollow"))}}function Yr(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}function Xr(e,t,n){var s;if(e.workResult={success:n.success,answer:n.answer??"",trace:n.trace??[],error:n.error},!t.ok){e.workError=n.detail||n.error||"执行失败",e.workRunStatus="done",e.workRunId=null,e.workPendingChoices=[],e.workSelections={};return}if((n.status??"done")==="awaiting_choices"){e.workRunStatus="awaiting_choices",e.workRunId=n.run_id??null,e.workPendingChoices=n.pending_choices??[];const o={};for(const a of e.workPendingChoices)(s=a.options)!=null&&s.length&&(o[a.id]=a.options[0].code);e.workSelections=o}else e.workRunStatus="done",e.workRunId=null,e.workPendingChoices=[],e.workSelections={}}async function Sg(e){if(!e.workFilePaths.length){e.workError="请先上传至少一个报价单文件";return}e.workRunning=!0,e.workRunStatus="running",e.workError=null,e.workResult=null,e.workRunId=null,e.workPendingChoices=[],e.workSelections={};try{const t=await fetch(Yr(e.basePath,"/api/work/run"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({file_paths:e.workFilePaths,customer_level:e.workCustomerLevel,do_register_oos:e.workDoRegisterOos}),credentials:"same-origin"}),n=await t.json().catch(()=>({}));Xr(e,t,n)}catch(t){e.workError=t instanceof Error?t.message:String(t),e.workResult={success:!1,error:e.workError},e.workRunStatus="done",e.workRunId=null,e.workPendingChoices=[],e.workSelections={}}finally{e.workRunning=!1}}async function xg(e){const t=e.workRunId;if(!t||e.workPendingChoices.length===0)return;const n=e.workPendingChoices.map(i=>{var s,o;return{item_id:i.id,selected_code:e.workSelections[i.id]??((o=(s=i.options)==null?void 0:s[0])==null?void 0:o.code)??"__OOS__"}});e.workRunning=!0,e.workError=null;try{const i=await fetch(Yr(e.basePath,"/api/work/resume"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({run_id:t,selections:n}),credentials:"same-origin"}),s=await i.json().catch(()=>({}));Xr(e,i,s)}catch(i){e.workError=i instanceof Error?i.message:String(i),e.workResult={success:!1,error:e.workError},e.workRunStatus="done",e.workRunId=null,e.workPendingChoices=[],e.workSelections={}}finally{e.workRunning=!1}}const Ag=[{value:"FACTORY_INC_TAX",label:"出厂价_含税"},{value:"FACTORY_EXC_TAX",label:"出厂价_不含税"},{value:"PURCHASE_EXC_TAX",label:"采购不含税"},{value:"A_MARGIN",label:"（二级代理）A级别 利润率"},{value:"A_QUOTE",label:"（二级代理）A级别 报单价格"},{value:"B_MARGIN",label:"（一级代理）B级别 利润率"},{value:"B_QUOTE",label:"（一级代理）B级别 报单价格"},{value:"C_MARGIN",label:"（聚万大客户）C级别 利润率"},{value:"C_QUOTE",label:"（聚万大客户）C级别报单价格"},{value:"D_MARGIN",label:"（青山大客户）D级别 利润率"},{value:"D_QUOTE",label:"（青山大客户）D级别 报单价格"},{value:"D_LOW",label:"（青山大客户）D级别 降低利润率"},{value:"E_MARGIN",label:"（大唐大客户）E级别（包运费） 利润率"},{value:"E_QUOTE",label:"（大唐大客户）E级别（包运费） 报单价格"}];function Xo(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}function Zr(e){try{if(typeof e!="string"||!e.trim())return null;const t=e.trim();return t.startsWith("{")&&t.endsWith("}")||t.startsWith("[")&&t.endsWith("]")?JSON.parse(t):null}catch{return null}}function _g(e){const t=Zr(e);if(!t||typeof t!="object"){const u=e.length>800?e.slice(0,800)+`
…（已截断）`:e;return l`<pre style="font-size: 11px; margin: 0; white-space: pre-wrap; word-break: break-all;">${u}</pre>`}const n=t.success===!0,i=Array.isArray(t.to_fill)?t.to_fill:[],s=Array.isArray(t.shortage)?t.shortage:[],o=Array.isArray(t.unmatched)?t.unmatched:[],a=Array.isArray(t.items)?t.items:[],r=Array.isArray(t.fill_items_merged)?t.fill_items_merged:[];if(i.length||s.length||o.length||a.length||r.length)return l`
      <div style="font-size: 12px;">
        ${n===!1&&t.error?l`<p style="color: var(--danger, #c00); margin: 0 0 8px 0;">${String(t.error)}</p>`:y}
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 8px; margin-bottom: 8px;">
          ${a.length?l`<span class="muted">提取行数: ${a.length}</span>`:y}
          ${i.length?l`<span style="color: var(--success, #2e7d32);">填充: ${i.length}</span>`:y}
          ${s.length?l`<span style="color: var(--warning, #ed6c02);">缺货: ${s.length}</span>`:y}
          ${o.length?l`<span style="color: var(--muted);">未匹配: ${o.length}</span>`:y}
        </div>
        ${o.length?l`
              <details style="margin-top: 6px;">
                <summary>未匹配项 (${o.length})</summary>
                <ul style="margin: 4px 0 0 0; padding-left: 18px; font-size: 11px;">
                  ${o.slice(0,10).map(u=>l`<li>${[u.product_name,u.specification].filter(Boolean).join(" · ")||u.keywords||"-"}</li>`)}
                  ${o.length>10?l`<li class="muted">…共 ${o.length} 项</li>`:y}
                </ul>
              </details>
            `:y}
      </div>
    `;const d=Array.isArray(t.items)?t.items:[];if(d.length&&typeof t.success<"u")return l`
      <div style="font-size: 12px;">
        <span class="muted">提取询价行: ${d.length} 条</span>
      </div>
    `;const c=e.length>600?e.slice(0,600)+`
…`:e;return l`<pre style="font-size: 11px; margin: 0; white-space: pre-wrap;">${c}</pre>`}function Cg(e,t){const n=e.type,i=e.step,s=e.name,o=e.content??"";return n==="response"&&o?l`
      <div style="margin-bottom: 8px; padding: 8px; background: var(--bg-secondary, #f5f5f5); border-radius: 6px;">
        <span class="muted" style="font-size: 11px;">步骤 ${i??t+1} · 回复</span>
        <div style="white-space: pre-wrap; font-size: 12px; margin-top: 4px;">${o}</div>
      </div>
    `:n==="tool_call"&&s?l`
      <div style="margin-bottom: 4px;">
        <span class="muted" style="font-size: 11px;">步骤 ${i??t+1} · 调用 ${s}</span>
      </div>
    `:n==="observation"&&o?l`
      <div style="margin-bottom: 12px; padding: 8px; border: 1px solid var(--border); border-radius: 6px; background: var(--bg);">
        <span class="muted" style="font-size: 11px;">观察结果</span>
        <div style="margin-top: 6px;">${_g(o)}</div>
      </div>
    `:y}const Ii=["识别表数据","查价格与库存","填表"];function Tg(e){if(!Array.isArray(e))return[];const t=[];for(const n of e){const i=n.type,s=n.content;if(i!=="observation"||typeof s!="string")continue;const o=Zr(s);if(!o||typeof o!="object")continue;const a=o.output_path;if(typeof a=="string"&&a.trim()){const r=a.replace(/\\/g,"/").split("/").filter(Boolean).pop()??"";r&&!t.includes(r)&&t.push(r)}}return t}function Eg(e){var L;const{basePath:t,workFilePaths:n,workRunning:i,workProgressStage:s,workRunStatus:o,workPendingChoices:a,workSelections:r,workResult:d,workError:c,workCustomerLevel:u,workDoRegisterOos:g,onAddFile:f,onRemoveFile:m,onCustomerLevelChange:$,onDoRegisterOosChange:S,onRun:x,onSelectionChange:C,onResume:F}=e,R=k=>{var Le;const E=k.target,O=(Le=E.files)==null?void 0:Le[0];if(!O)return;const D=Xo(t,"/api/quotation/upload"),N=new FormData;N.append("file",O),fetch(D,{method:"POST",body:N,credentials:"same-origin"}).then(b=>b.json()).then(b=>{typeof b.file_path=="string"&&f(b.file_path,b.file_name??O.name)}).catch(b=>console.error("Work upload",b)),E.value=""};return l`
    <section class="card" style="margin-bottom: 16px;">
      <div class="card-title" style="margin-bottom: 8px;">${_("tabs.work")}</div>
      <p class="muted" style="margin-bottom: 12px;">${_("subtitles.work")}</p>

      <div style="margin-bottom: 12px;">
        <label class="card-title" style="font-size: 13px;">报价单文件（可多选）</label>
        <input
          type="file"
          accept=".xlsx,.xls,.xlsm"
          @change=${R}
          style="margin-top: 6px;"
        />
        ${n.length?l`
              <ul style="margin-top: 8px; padding-left: 20px; font-size: 13px;">
                ${n.map((k,E)=>l`
                    <li style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                      <span style="word-break: break-all;">${k.split(/[/\\]/).pop()??k}</span>
                      <button
                        type="button"
                        class="btn btn-sm"
                        style="padding: 2px 8px;"
                        @click=${()=>m(E)}
                      >
                        移除
                      </button>
                    </li>
                  `)}
              </ul>
            `:l`<p class="muted" style="margin-top: 6px;">暂无文件，请上传 .xlsx / .xls / .xlsm</p>`}
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 12px;">
        <div>
          <label style="font-size: 12px; color: var(--muted);">客户档位</label>
          <select
            .value=${u}
            @change=${k=>$(k.target.value)}
            style="margin-left: 8px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--bg); color: var(--text); min-width: 140px;"
          >
            ${Ag.map(k=>l`<option value=${k.value}>${k.label}</option>`)}
          </select>
        </div>
        <label style="display: flex; align-items: center; gap: 6px; font-size: 13px;">
          <input type="checkbox" ?checked=${g} @change=${k=>S(k.target.checked)} />
          执行无货登记
        </label>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${i?l`
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                ${Ii.map((k,E)=>l`
                    <span
                      style="
                        padding: 6px 12px;
                        border-radius: 8px;
                        font-size: 13px;
                        background: ${s>=0&&E===s?"var(--accent)":"var(--bg-secondary, #eee)"};
                        color: ${s>=0&&E===s?"var(--bg)":"var(--muted)"};
                        transition: background 0.2s, color 0.2s;
                      "
                    >
                      ${E+1}. ${k}
                    </span>
                  `)}
              </div>
              <p class="muted" style="font-size: 12px; margin: 0;">当前阶段：${s>=0&&s<Ii.length?Ii[s]:"执行中"}</p>
            `:y}
        <div style="display: flex; gap: 8px;">
          <button
            class="btn"
            style="background: var(--accent); color: var(--bg);"
            ?disabled=${n.length===0||i}
            @click=${x}
          >
            ${i?"执行中…":"执行"}
          </button>
        </div>
      </div>

      ${c?l`<p style="margin-top: 12px; color: var(--danger, #e53935); font-size: 13px;">${c}</p>`:y}
    </section>

    ${o==="awaiting_choices"&&a.length?l`
          <section class="card" style="margin-bottom: 16px;">
            <div class="card-title">需要您选择</div>
            <p class="muted" style="margin-bottom: 12px;">以下项无法自动确定唯一型号，请为每项选择一个选项后点击「确认并继续」。</p>
            <ul style="list-style: none; padding: 0; margin: 0;">
              ${a.map(k=>{var E,O;return l`
                  <li style="margin-bottom: 16px; padding: 12px; border: 1px solid var(--border); border-radius: 8px; background: var(--bg-secondary, #f5f5f5);">
                    <div style="font-size: 13px; margin-bottom: 8px;">
                      ${k.product_name??k.keywords??""}
                      ${k.specification?l`<span class="muted"> · ${k.specification}</span>`:y}
                      ${k.qty!=null?l`<span class="muted"> · 数量 ${k.qty}</span>`:y}
                    </div>
                    <select
                      style="width: 100%; max-width: 400px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--bg); color: var(--text); font-size: 13px;"
                      .value=${r[k.id]??((O=(E=k.options)==null?void 0:E[0])==null?void 0:O.code)??""}
                      @change=${D=>C(k.id,D.target.value)}
                    >
                      <option value="__OOS__">按无货</option>
                      ${(k.options??[]).map(D=>l`<option value=${D.code}>${D.code}${D.matched_name?` · ${D.matched_name}`:""}${D.unit_price!=null?` · ¥${D.unit_price}`:""}</option>`)}
                    </select>
                  </li>
                `})}
            </ul>
            <button
              class="btn"
              style="margin-top: 12px; background: var(--accent); color: var(--bg);"
              ?disabled=${i}
              @click=${F}
            >
              ${i?"继续中…":"确认并继续"}
            </button>
          </section>
        `:y}

    ${d?l`
          <section class="card">
            <div class="card-title">执行结果</div>
            ${n.length>1?l`<p class="muted" style="font-size: 12px; margin-bottom: 8px;">多文件时为汇总结果，输出文件见下方总结。</p>`:y}
            ${(()=>{const k=Tg(d.trace);return k.length?l`
                    <div style="margin-bottom: 12px;">
                      ${k.map(E=>l`
                          <a
                            href=${Xo(t,`/api/quotation/download?path=${encodeURIComponent(E)}`)}
                            download=${E}
                            class="btn btn-sm"
                            style="margin-right: 8px; margin-bottom: 6px; text-decoration: none;"
                          >
                            下载 ${E}
                          </a>
                        `)}
                      <p class="muted" style="font-size: 11px; margin: 4px 0 0 0;">云端部署时请及时下载到本地保存，服务器重启后文件会丢失。</p>
                    </div>
                  `:y})()}
            ${d.answer?l`<div style="white-space: pre-wrap; margin-bottom: 12px;">${d.answer}</div>`:y}
            ${d.error?l`<p style="color: var(--danger, #e53935);">${d.error}</p>`:y}
            ${(L=d.trace)!=null&&L.length?l`
                  <details style="margin-top: 12px;" open>
                    <summary>步骤记录（${d.trace.length} 条）</summary>
                    <div style="max-height: 420px; overflow: auto; margin-top: 8px;">
                      ${d.trace.map((k,E)=>Cg(k,E))}
                    </div>
                  </details>
                `:y}
          </section>
        `:y}
  `}function Lg(e){return e.tab!=="work"?y:Eg({basePath:e.basePath,workFilePaths:e.workFilePaths,workRunning:e.workRunning,workProgressStage:e.workProgressStage,workRunStatus:e.workRunStatus,workRunId:e.workRunId,workPendingChoices:e.workPendingChoices,workSelections:e.workSelections,workResult:e.workResult,workError:e.workError,workCustomerLevel:e.workCustomerLevel,workDoRegisterOos:e.workDoRegisterOos,onAddFile:(t,n)=>{e.workFilePaths.includes(t)||(e.workFilePaths=[...e.workFilePaths,t])},onRemoveFile:t=>{e.workFilePaths=e.workFilePaths.filter((n,i)=>i!==t)},onCustomerLevelChange:t=>{e.workCustomerLevel=t},onDoRegisterOosChange:t=>{e.workDoRegisterOos=t},onRun:()=>void Sg(e),onSelectionChange:(t,n)=>{e.workSelections={...e.workSelections,[t]:n}},onResume:()=>void xg(e)})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Us={CHILD:2},zs=e=>(...t)=>({_$litDirective$:e,values:t});let js=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,i){this._$Ct=t,this._$AM=n,this._$Ci=i}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:Rg}=uc,Zo=e=>e,Ig=e=>e.strings===void 0,ea=()=>document.createComment(""),Dt=(e,t,n)=>{var o;const i=e._$AA.parentNode,s=t===void 0?e._$AB:t._$AA;if(n===void 0){const a=i.insertBefore(ea(),s),r=i.insertBefore(ea(),s);n=new Rg(a,r,e,e.options)}else{const a=n._$AB.nextSibling,r=n._$AM,d=r!==e;if(d){let c;(o=n._$AQ)==null||o.call(n,e),n._$AM=e,n._$AP!==void 0&&(c=e._$AU)!==r._$AU&&n._$AP(c)}if(a!==s||d){let c=n._$AA;for(;c!==a;){const u=Zo(c).nextSibling;Zo(i).insertBefore(c,s),c=u}}}return n},Ze=(e,t,n=e)=>(e._$AI(t,n),e),Mg={},Fg=(e,t=Mg)=>e._$AH=t,Pg=e=>e._$AH,Mi=e=>{e._$AR(),e._$AA.remove()};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ta=(e,t,n)=>{const i=new Map;for(let s=t;s<=n;s++)i.set(e[s],s);return i},el=zs(class extends js{constructor(e){if(super(e),e.type!==Us.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,n){let i;n===void 0?n=t:t!==void 0&&(i=t);const s=[],o=[];let a=0;for(const r of e)s[a]=i?i(r,a):a,o[a]=n(r,a),a++;return{values:o,keys:s}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,i]){const s=Pg(e),{values:o,keys:a}=this.dt(t,n,i);if(!Array.isArray(s))return this.ut=a,o;const r=this.ut??(this.ut=[]),d=[];let c,u,g=0,f=s.length-1,m=0,$=o.length-1;for(;g<=f&&m<=$;)if(s[g]===null)g++;else if(s[f]===null)f--;else if(r[g]===a[m])d[m]=Ze(s[g],o[m]),g++,m++;else if(r[f]===a[$])d[$]=Ze(s[f],o[$]),f--,$--;else if(r[g]===a[$])d[$]=Ze(s[g],o[$]),Dt(e,d[$+1],s[g]),g++,$--;else if(r[f]===a[m])d[m]=Ze(s[f],o[m]),Dt(e,s[g],s[f]),f--,m++;else if(c===void 0&&(c=ta(a,m,$),u=ta(r,g,f)),c.has(r[g]))if(c.has(r[f])){const S=u.get(a[m]),x=S!==void 0?s[S]:null;if(x===null){const C=Dt(e,s[g]);Ze(C,o[m]),d[m]=C}else d[m]=Ze(x,o[m]),Dt(e,s[g],x),s[S]=null;m++}else Mi(s[f]),f--;else Mi(s[g]),g++;for(;m<=$;){const S=Dt(e,d[$+1]);Ze(S,o[m]),d[m++]=S}for(;g<=f;){const S=s[g++];S!==null&&Mi(S)}return this.ut=a,Fg(e,d),Ge}}),ne={messageSquare:l`
    <svg viewBox="0 0 24 24">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  `,barChart:l`
    <svg viewBox="0 0 24 24">
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  `,link:l`
    <svg viewBox="0 0 24 24">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  `,radio:l`
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="2" />
      <path
        d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"
      />
    </svg>
  `,fileText:l`
    <svg viewBox="0 0 24 24">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  `,zap:l`
    <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
  `,monitor:l`
    <svg viewBox="0 0 24 24">
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  `,settings:l`
    <svg viewBox="0 0 24 24">
      <path
        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
  `,bug:l`
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
  `,scrollText:l`
    <svg viewBox="0 0 24 24">
      <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
      <path d="M19 17V5a2 2 0 0 0-2-2H4" />
      <path d="M15 8h-5" />
      <path d="M15 12h-5" />
    </svg>
  `,folder:l`
    <svg viewBox="0 0 24 24">
      <path
        d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      />
    </svg>
  `,menu:l`
    <svg viewBox="0 0 24 24">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  `,x:l`
    <svg viewBox="0 0 24 24">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  `,check:l`
    <svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg>
  `,arrowDown:l`
    <svg viewBox="0 0 24 24">
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  `,copy:l`
    <svg viewBox="0 0 24 24">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  `,search:l`
    <svg viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  `,brain:l`
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
  `,book:l`
    <svg viewBox="0 0 24 24">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  `,loader:l`
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
  `,wrench:l`
    <svg viewBox="0 0 24 24">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      />
    </svg>
  `,fileCode:l`
    <svg viewBox="0 0 24 24">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="m10 13-2 2 2 2" />
      <path d="m14 17 2-2-2-2" />
    </svg>
  `,edit:l`
    <svg viewBox="0 0 24 24">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  `,penLine:l`
    <svg viewBox="0 0 24 24">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  `,paperclip:l`
    <svg viewBox="0 0 24 24">
      <path
        d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"
      />
    </svg>
  `,globe:l`
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  `,image:l`
    <svg viewBox="0 0 24 24">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  `,smartphone:l`
    <svg viewBox="0 0 24 24">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  `,plug:l`
    <svg viewBox="0 0 24 24">
      <path d="M12 22v-5" />
      <path d="M9 8V2" />
      <path d="M15 8V2" />
      <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
    </svg>
  `,circle:l`
    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
  `,puzzle:l`
    <svg viewBox="0 0 24 24">
      <path
        d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.076.874.54 1.02 1.02a2.5 2.5 0 1 0 3.237-3.237c-.48-.146-.944-.505-1.02-1.02a.98.98 0 0 1 .303-.917l1.526-1.526A2.402 2.402 0 0 1 11.998 2c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.236 3.236c-.464.18-.894.527-.967 1.02Z"
      />
    </svg>
  `};function Dg(e){var s,o,a,r,d;const t=(s=e.hello)==null?void 0:s.snapshot,n=(a=(o=t==null?void 0:t.sessionDefaults)==null?void 0:o.mainSessionKey)==null?void 0:a.trim();if(n)return n;const i=(d=(r=t==null?void 0:t.sessionDefaults)==null?void 0:r.mainKey)==null?void 0:d.trim();return i||"main"}function Og(e,t){e.sessionKey=t,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:t,lastActiveSessionKey:t})}function Ng(e,t){const n=ei(t,e.basePath);return l`
    <a
      href=${n}
      class="nav-item ${e.tab===t?"active":""}"
      @click=${i=>{if(!(i.defaultPrevented||i.button!==0||i.metaKey||i.ctrlKey||i.shiftKey||i.altKey)){if(i.preventDefault(),t==="chat"){const s=Dg(e);e.sessionKey!==s&&(Og(e,s),e.loadAssistantIdentity())}e.setTab(t)}}}
      title=${Xi(t)}
    >
      <span class="nav-item__icon" aria-hidden="true">${ne[uu(t)]}</span>
      <span class="nav-item__text">${Xi(t)}</span>
    </a>
  `}function Bg(e){const t=Ug(e.hello,e.sessionsResult),n=Kg(e.sessionKey,e.sessionsResult,t),i=e.onboarding,s=e.onboarding,o=e.onboarding?!1:e.settings.chatShowThinking,a=e.onboarding?!0:e.settings.chatFocusMode,r=l`
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
  `,d=l`
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
  `;return l`
    <div class="chat-controls">
      <label class="field chat-controls__session">
        <select
          .value=${e.sessionKey}
          ?disabled=${!e.connected}
          @change=${c=>{const u=c.target.value;e.sessionKey=u,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:u,lastActiveSessionKey:u}),e.loadAssistantIdentity(),Cu(e,u),an(e)}}
        >
          ${el(n,c=>c.key,c=>l`<option value=${c.key} title=${c.key}>
                ${c.displayName??c.key}
              </option>`)}
        </select>
      </label>
      <button
        class="btn btn--sm btn--icon"
        ?disabled=${e.chatLoading||!e.connected}
        @click=${async()=>{const c=e;c.chatManualRefreshInFlight=!0,c.chatNewMessagesBelow=!1,await c.updateComplete,c.resetToolStream();try{await Wr(e,{scheduleScroll:!1}),c.scrollToBottom({smooth:!0})}finally{requestAnimationFrame(()=>{c.chatManualRefreshInFlight=!1,c.chatNewMessagesBelow=!1})}}}
        title=${_("chat.refreshTitle")}
      >
        ${r}
      </button>
      <span class="chat-controls__separator">|</span>
      <button
        class="btn btn--sm btn--icon ${o?"active":""}"
        ?disabled=${i}
        @click=${()=>{i||e.applySettings({...e.settings,chatShowThinking:!e.settings.chatShowThinking})}}
        aria-pressed=${o}
        title=${_(i?"chat.onboardingDisabled":"chat.thinkingToggle")}
      >
        ${ne.brain}
      </button>
      <button
        class="btn btn--sm btn--icon ${a?"active":""}"
        ?disabled=${s}
        @click=${()=>{s||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})}}
        aria-pressed=${a}
        title=${_(s?"chat.onboardingDisabled":"chat.focusToggle")}
      >
        ${d}
      </button>
    </div>
  `}function Ug(e,t){var o,a,r,d,c;const n=e==null?void 0:e.snapshot,i=(a=(o=n==null?void 0:n.sessionDefaults)==null?void 0:o.mainSessionKey)==null?void 0:a.trim();if(i)return i;const s=(d=(r=n==null?void 0:n.sessionDefaults)==null?void 0:r.mainKey)==null?void 0:d.trim();return s||((c=t==null?void 0:t.sessions)!=null&&c.some(u=>u.key==="main")?"main":null)}const In={bluebubbles:"iMessage",telegram:"Telegram",discord:"Discord",signal:"Signal",slack:"Slack",whatsapp:"WhatsApp",matrix:"Matrix",email:"Email",sms:"SMS"},zg=Object.keys(In);function na(e){return e.charAt(0).toUpperCase()+e.slice(1)}function jg(e){if(e==="main"||e==="agent:main:main")return{prefix:"",fallbackName:"Main Session"};if(e.includes(":subagent:"))return{prefix:"Subagent:",fallbackName:"Subagent:"};if(e.includes(":cron:"))return{prefix:"Cron:",fallbackName:"Cron Job:"};const t=e.match(/^agent:[^:]+:([^:]+):direct:(.+)$/);if(t){const i=t[1],s=t[2];return{prefix:"",fallbackName:`${In[i]??na(i)} · ${s}`}}const n=e.match(/^agent:[^:]+:([^:]+):group:(.+)$/);if(n){const i=n[1];return{prefix:"",fallbackName:`${In[i]??na(i)} Group`}}for(const i of zg)if(e===i||e.startsWith(`${i}:`))return{prefix:"",fallbackName:`${In[i]} Session`};return{prefix:"",fallbackName:e}}function Fi(e,t){var r,d;const n=((r=t==null?void 0:t.label)==null?void 0:r.trim())||"",i=((d=t==null?void 0:t.displayName)==null?void 0:d.trim())||"",{prefix:s,fallbackName:o}=jg(e),a=c=>s?new RegExp(`^${s.replace(/[.*+?^${}()|[\\]\\]/g,"\\$&")}\\s*`,"i").test(c)?c:`${s} ${c}`:c;return n&&n!==e?a(n):i&&i!==e?a(i):o}function Kg(e,t,n){var r,d;const i=new Set,s=[],o=n&&((r=t==null?void 0:t.sessions)==null?void 0:r.find(c=>c.key===n)),a=(d=t==null?void 0:t.sessions)==null?void 0:d.find(c=>c.key===e);if(n&&(i.add(n),s.push({key:n,displayName:Fi(n,o||void 0)})),i.has(e)||(i.add(e),s.push({key:e,displayName:Fi(e,a)})),t!=null&&t.sessions)for(const c of t.sessions)i.has(c.key)||(i.add(c.key),s.push({key:c.key,displayName:Fi(c.key,c)}));return s}const Hg=["system","light","dark"];function qg(e){const t=Math.max(0,Hg.indexOf(e.theme)),n=i=>s=>{const a={element:s.currentTarget};(s.clientX||s.clientY)&&(a.pointerClientX=s.clientX,a.pointerClientY=s.clientY),e.setTheme(i,a)};return l`
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
          ${Vg()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="light"?"active":""}"
          @click=${n("light")}
          aria-pressed=${e.theme==="light"}
          aria-label="Light theme"
          title="Light"
        >
          ${Gg()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="dark"?"active":""}"
          @click=${n("dark")}
          aria-pressed=${e.theme==="dark"}
          aria-label="Dark theme"
          title="Dark"
        >
          ${Wg()}
        </button>
      </div>
    </div>
  `}function Gg(){return l`
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
  `}function Wg(){return l`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
      ></path>
    </svg>
  `}function Vg(){return l`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="20" height="14" x="2" y="3" rx="2"></rect>
      <line x1="8" x2="16" y1="21" y2="21"></line>
      <line x1="12" x2="12" y1="17" y2="21"></line>
    </svg>
  `}function tl(e,t){if(!e)return e;const i=e.files.some(s=>s.name===t.name)?e.files.map(s=>s.name===t.name?t:s):[...e.files,t];return{...e,files:i}}async function Pi(e,t){if(!(!e.client||!e.connected||e.agentFilesLoading)){e.agentFilesLoading=!0,e.agentFilesError=null;try{const n=await e.client.request("agents.files.list",{agentId:t});n&&(e.agentFilesList=n,e.agentFileActive&&!n.files.some(i=>i.name===e.agentFileActive)&&(e.agentFileActive=null))}catch(n){e.agentFilesError=String(n)}finally{e.agentFilesLoading=!1}}}async function Jg(e,t,n,i){if(!(!e.client||!e.connected||e.agentFilesLoading)&&!Object.hasOwn(e.agentFileContents,n)){e.agentFilesLoading=!0,e.agentFilesError=null;try{const s=await e.client.request("agents.files.get",{agentId:t,name:n});if(s!=null&&s.file){const o=s.file.content??"",a=e.agentFileContents[n]??"",r=e.agentFileDrafts[n],d=(i==null?void 0:i.preserveDraft)??!0;e.agentFilesList=tl(e.agentFilesList,s.file),e.agentFileContents={...e.agentFileContents,[n]:o},(!d||!Object.hasOwn(e.agentFileDrafts,n)||r===a)&&(e.agentFileDrafts={...e.agentFileDrafts,[n]:o})}}catch(s){e.agentFilesError=String(s)}finally{e.agentFilesLoading=!1}}}async function Qg(e,t,n,i){if(!(!e.client||!e.connected||e.agentFileSaving)){e.agentFileSaving=!0,e.agentFilesError=null;try{const s=await e.client.request("agents.files.set",{agentId:t,name:n,content:i});s!=null&&s.file&&(e.agentFilesList=tl(e.agentFilesList,s.file),e.agentFileContents={...e.agentFileContents,[n]:i},e.agentFileDrafts={...e.agentFileDrafts,[n]:i})}catch(s){e.agentFilesError=String(s)}finally{e.agentFileSaving=!1}}}function Ks(e){return e?`${lt(e)} (${Ue(e)})`:"n/a"}function Yg(e){if(e.totalTokens==null)return"n/a";const t=e.totalTokens??0,n=e.contextTokens??0;return n?`${t} / ${n}`:String(t)}function Xg(e){if(e==null)return"";try{return JSON.stringify(e,null,2)}catch{return String(e)}}function Zg(e){const t=e.state??{},n=t.nextRunAtMs?lt(t.nextRunAtMs):"n/a",i=t.lastRunAtMs?lt(t.lastRunAtMs):"n/a";return`${t.lastStatus??"n/a"} · next ${n} · last ${i}`}function nl(e){const t=e.schedule;if(t.kind==="at"){const n=Date.parse(t.at);return Number.isFinite(n)?`At ${lt(n)}`:`At ${t.at}`}return t.kind==="every"?`Every ${ur(t.everyMs)}`:`Cron ${t.expr}${t.tz?` (${t.tz})`:""}`}function ef(e){const t=e.payload;if(t.kind==="systemEvent")return`System: ${t.text}`;const n=`Agent: ${t.message}`,i=e.delivery;if(i&&i.mode!=="none"){const s=i.mode==="webhook"?i.to?` (${i.to})`:"":i.channel||i.to?` (${i.channel??"last"}${i.to?` -> ${i.to}`:""})`:"";return`${n} · ${i.mode}${s}`}return n}function Ne(e){const t=(e??"").trim();return t?t.replace(/\s+/g,"_").toLowerCase():""}function tf(e){return[]}function nf(e){return{allow:[],alsoAllow:[],deny:[]}}const ia=[{id:"fs",label:"Files",tools:[{id:"read",label:"read",description:"Read file contents"},{id:"write",label:"write",description:"Create or overwrite files"},{id:"edit",label:"edit",description:"Make precise edits"},{id:"apply_patch",label:"apply_patch",description:"Patch files (OpenAI)"}]},{id:"runtime",label:"Runtime",tools:[{id:"exec",label:"exec",description:"Run shell commands"},{id:"process",label:"process",description:"Manage background processes"}]},{id:"web",label:"Web",tools:[{id:"web_search",label:"web_search",description:"Search the web"},{id:"web_fetch",label:"web_fetch",description:"Fetch web content"}]},{id:"memory",label:"Memory",tools:[{id:"memory_search",label:"memory_search",description:"Semantic search"},{id:"memory_get",label:"memory_get",description:"Read memory files"}]},{id:"sessions",label:"Sessions",tools:[{id:"sessions_list",label:"sessions_list",description:"List sessions"},{id:"sessions_history",label:"sessions_history",description:"Session history"},{id:"sessions_send",label:"sessions_send",description:"Send to session"},{id:"sessions_spawn",label:"sessions_spawn",description:"Spawn sub-agent"},{id:"session_status",label:"session_status",description:"Session status"}]},{id:"ui",label:"UI",tools:[{id:"browser",label:"browser",description:"Control web browser"},{id:"canvas",label:"canvas",description:"Control canvases"}]},{id:"messaging",label:"Messaging",tools:[{id:"message",label:"message",description:"Send messages"}]},{id:"automation",label:"Automation",tools:[{id:"cron",label:"cron",description:"Schedule tasks"},{id:"gateway",label:"gateway",description:"Gateway control"}]},{id:"nodes",label:"Nodes",tools:[{id:"nodes",label:"nodes",description:"Nodes + devices"}]},{id:"agents",label:"Agents",tools:[{id:"agents_list",label:"agents_list",description:"List agents"}]},{id:"media",label:"Media",tools:[{id:"image",label:"image",description:"Image understanding"}]}],sf=[{id:"minimal",label:"Minimal"},{id:"coding",label:"Coding"},{id:"messaging",label:"Messaging"},{id:"full",label:"Full"}];function is(e){var t,n,i;return((t=e.name)==null?void 0:t.trim())||((i=(n=e.identity)==null?void 0:n.name)==null?void 0:i.trim())||e.id}function $n(e){const t=e.trim();if(!t||t.length>16)return!1;let n=!1;for(let i=0;i<t.length;i+=1)if(t.charCodeAt(i)>127){n=!0;break}return!(!n||t.includes("://")||t.includes("/")||t.includes("."))}function ii(e,t){var a,r,d,c,u,g;const n=(a=t==null?void 0:t.emoji)==null?void 0:a.trim();if(n&&$n(n))return n;const i=(d=(r=e.identity)==null?void 0:r.emoji)==null?void 0:d.trim();if(i&&$n(i))return i;const s=(c=t==null?void 0:t.avatar)==null?void 0:c.trim();if(s&&$n(s))return s;const o=(g=(u=e.identity)==null?void 0:u.avatar)==null?void 0:g.trim();return o&&$n(o)?o:""}function il(e,t){return t&&e===t?"default":null}function of(e){if(e==null||!Number.isFinite(e))return"-";if(e<1024)return`${e} B`;const t=["KB","MB","GB","TB"];let n=e/1024,i=0;for(;n>=1024&&i<t.length-1;)n/=1024,i+=1;return`${n.toFixed(n<10?1:0)} ${t[i]}`}function si(e,t){var o,a;const n=e;return{entry:(((o=n==null?void 0:n.agents)==null?void 0:o.list)??[]).find(r=>(r==null?void 0:r.id)===t),defaults:(a=n==null?void 0:n.agents)==null?void 0:a.defaults,globalTools:n==null?void 0:n.tools}}function sa(e,t,n,i,s){var m,$,S,x,C,F,R,L,k,E,O,D;const o=si(t,e.id),r=(n&&n.agentId===e.id?n.workspace:null)||((m=o.entry)==null?void 0:m.workspace)||(($=o.defaults)==null?void 0:$.workspace)||"default",d=(S=o.entry)!=null&&S.model?Vt((x=o.entry)==null?void 0:x.model):Vt((C=o.defaults)==null?void 0:C.model),c=((F=s==null?void 0:s.name)==null?void 0:F.trim())||((L=(R=e.identity)==null?void 0:R.name)==null?void 0:L.trim())||((k=e.name)==null?void 0:k.trim())||((E=o.entry)==null?void 0:E.name)||e.id,u=ii(e,s)||"-",g=Array.isArray((O=o.entry)==null?void 0:O.skills)?(D=o.entry)==null?void 0:D.skills:null,f=(g==null?void 0:g.length)??null;return{workspace:r,model:d,identityName:c,identityEmoji:u,skillsLabel:g?`${f} selected`:"all skills",isDefault:!!(i&&e.id===i)}}function Vt(e){var t;if(!e)return"-";if(typeof e=="string")return e.trim()||"-";if(typeof e=="object"&&e){const n=e,i=(t=n.primary)==null?void 0:t.trim();if(i){const s=Array.isArray(n.fallbacks)?n.fallbacks.length:0;return s>0?`${i} (+${s} fallback)`:i}}return"-"}function oa(e){const t=e.match(/^(.+) \(\+\d+ fallback\)$/);return t?t[1]:e}function aa(e){if(!e)return null;if(typeof e=="string")return e.trim()||null;if(typeof e=="object"&&e){const t=e,n=typeof t.primary=="string"?t.primary:typeof t.model=="string"?t.model:typeof t.id=="string"?t.id:typeof t.value=="string"?t.value:null;return(n==null?void 0:n.trim())||null}return null}function af(e){if(!e||typeof e=="string")return null;if(typeof e=="object"&&e){const t=e,n=Array.isArray(t.fallbacks)?t.fallbacks:Array.isArray(t.fallback)?t.fallback:null;return n?n.filter(i=>typeof i=="string"):null}return null}function rf(e){return e.split(",").map(t=>t.trim()).filter(Boolean)}function lf(e){var s,o,a;const t=e,n=(o=(s=t==null?void 0:t.agents)==null?void 0:s.defaults)==null?void 0:o.models;if(!n||typeof n!="object")return[];const i=[];for(const[r,d]of Object.entries(n)){const c=r.trim();if(!c)continue;const u=d&&typeof d=="object"&&"alias"in d&&typeof d.alias=="string"?(a=d.alias)==null?void 0:a.trim():void 0,g=u&&u!==c?`${u} (${c})`:c;i.push({value:c,label:g})}return i}function cf(e,t){const n=lf(e),i=t?n.some(s=>s.value===t):!1;return t&&!i&&n.unshift({value:t,label:`Current (${t})`}),n.length===0?l`
      <option value="" disabled>No configured models</option>
    `:n.map(s=>l`<option value=${s.value}>${s.label}</option>`)}function df(e){const t=Ne(e);if(!t)return{kind:"exact",value:""};if(t==="*")return{kind:"all"};if(!t.includes("*"))return{kind:"exact",value:t};const n=t.replace(/[.*+?^${}()|[\\]\\]/g,"\\$&");return{kind:"regex",value:new RegExp(`^${n.replaceAll("\\*",".*")}$`)}}function ss(e){return Array.isArray(e)?tf().map(df).filter(t=>t.kind!=="exact"||t.value.length>0):[]}function Jt(e,t){for(const n of t)if(n.kind==="all"||n.kind==="exact"&&e===n.value||n.kind==="regex"&&n.value.test(e))return!0;return!1}function uf(e,t){if(!t)return!0;const n=Ne(e),i=ss(t.deny);if(Jt(n,i))return!1;const s=ss(t.allow);return!!(s.length===0||Jt(n,s)||n==="apply_patch"&&Jt("exec",s))}function ra(e,t){if(!Array.isArray(t)||t.length===0)return!1;const n=Ne(e),i=ss(t);return!!(Jt(n,i)||n==="apply_patch"&&Jt("exec",i))}function gf(e){return nf()??void 0}function sl(e,t){return l`
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
  `}function ff(e,t){var i,s;const n=(i=e.channelMeta)==null?void 0:i.find(o=>o.id===t);return n!=null&&n.label?n.label:((s=e.channelLabels)==null?void 0:s[t])??t}function hf(e){var s;if(!e)return[];const t=new Set;for(const o of e.channelOrder??[])t.add(o);for(const o of e.channelMeta??[])t.add(o.id);for(const o of Object.keys(e.channelAccounts??{}))t.add(o);const n=[],i=(s=e.channelOrder)!=null&&s.length?e.channelOrder:Array.from(t);for(const o of i)t.has(o)&&(n.push(o),t.delete(o));for(const o of t)n.push(o);return n.map(o=>{var a;return{id:o,label:ff(e,o),accounts:((a=e.channelAccounts)==null?void 0:a[o])??[]}})}const pf=["groupPolicy","streamMode","dmPolicy"];function vf(e,t){if(!e)return null;const i=(e.channels??{})[t];if(i&&typeof i=="object")return i;const s=e[t];return s&&typeof s=="object"?s:null}function mf(e){if(e==null)return"n/a";if(typeof e=="string"||typeof e=="number"||typeof e=="boolean")return String(e);try{return JSON.stringify(e)}catch{return"n/a"}}function yf(e,t){const n=vf(e,t);return n?pf.flatMap(i=>i in n?[{label:i,value:mf(n[i])}]:[]):[]}function bf(e){let t=0,n=0,i=0;for(const s of e){const o=s.probe&&typeof s.probe=="object"&&"ok"in s.probe?!!s.probe.ok:!1;(s.connected===!0||s.running===!0||o)&&(t+=1),s.configured&&(n+=1),s.enabled&&(i+=1)}return{total:e.length,connected:t,configured:n,enabled:i}}function wf(e){const t=hf(e.snapshot),n=e.lastSuccess?Ue(e.lastSuccess):"never";return l`
    <section class="grid grid-cols-2">
      ${sl(e.context,"Workspace, identity, and model configuration.")}
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
        ${e.error?l`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:y}
        ${e.snapshot?y:l`
                <div class="callout info" style="margin-top: 12px">Load channels to see live status.</div>
              `}
        ${t.length===0?l`
                <div class="muted" style="margin-top: 16px">No channels found.</div>
              `:l`
                <div class="list" style="margin-top: 16px;">
                  ${t.map(i=>{const s=bf(i.accounts),o=s.total?`${s.connected}/${s.total} connected`:"no accounts",a=s.configured?`${s.configured} configured`:"not configured",r=s.total?`${s.enabled} enabled`:"disabled",d=yf(e.configForm,i.id);return l`
                      <div class="list-item">
                        <div class="list-main">
                          <div class="list-title">${i.label}</div>
                          <div class="list-sub mono">${i.id}</div>
                        </div>
                        <div class="list-meta">
                          <div>${o}</div>
                          <div>${a}</div>
                          <div>${r}</div>
                          ${d.length>0?d.map(c=>l`<div>${c.label}: ${c.value}</div>`):y}
                        </div>
                      </div>
                    `})}
                </div>
              `}
      </section>
    </section>
  `}function $f(e){var n,i;const t=e.jobs.filter(s=>s.agentId===e.agentId);return l`
    <section class="grid grid-cols-2">
      ${sl(e.context,"Workspace and scheduling targets.")}
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
            <div class="stat-value">${Ks(((i=e.status)==null?void 0:i.nextWakeAtMs)??null)}</div>
          </div>
        </div>
        ${e.error?l`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:y}
      </section>
    </section>
    <section class="card">
      <div class="card-title">Agent Cron Jobs</div>
      <div class="card-sub">Scheduled jobs targeting this agent.</div>
      ${t.length===0?l`
              <div class="muted" style="margin-top: 16px">No jobs assigned.</div>
            `:l`
              <div class="list" style="margin-top: 16px;">
                ${t.map(s=>l`
                    <div class="list-item">
                      <div class="list-main">
                        <div class="list-title">${s.name}</div>
                        ${s.description?l`<div class="list-sub">${s.description}</div>`:y}
                        <div class="chip-row" style="margin-top: 6px;">
                          <span class="chip">${nl(s)}</span>
                          <span class="chip ${s.enabled?"chip-ok":"chip-warn"}">
                            ${s.enabled?"enabled":"disabled"}
                          </span>
                          <span class="chip">${s.sessionTarget}</span>
                        </div>
                      </div>
                      <div class="list-meta">
                        <div class="mono">${Zg(s)}</div>
                        <div class="muted">${ef(s)}</div>
                      </div>
                    </div>
                  `)}
              </div>
            `}
    </section>
  `}function kf(e){var d;const t=((d=e.agentFilesList)==null?void 0:d.agentId)===e.agentId?e.agentFilesList:null,n=(t==null?void 0:t.files)??[],i=e.agentFileActive??null,s=i?n.find(c=>c.name===i)??null:null,o=i?e.agentFileContents[i]??"":"",a=i?e.agentFileDrafts[i]??o:"",r=i?a!==o:!1;return l`
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
      ${t?l`<div class="muted mono" style="margin-top: 8px;">Workspace: ${t.workspace}</div>`:y}
      ${e.agentFilesError?l`<div class="callout danger" style="margin-top: 12px;">${e.agentFilesError}</div>`:y}
      ${t?l`
              <div class="agent-files-grid" style="margin-top: 16px;">
                <div class="agent-files-list">
                  ${n.length===0?l`
                          <div class="muted">No files found.</div>
                        `:n.map(c=>Sf(c,i,()=>e.onSelectFile(c.name)))}
                </div>
                <div class="agent-files-editor">
                  ${s?l`
                          <div class="agent-file-header">
                            <div>
                              <div class="agent-file-title mono">${s.name}</div>
                              <div class="agent-file-sub mono">${s.path}</div>
                            </div>
                            <div class="agent-file-actions">
                              <button
                                class="btn btn--sm"
                                ?disabled=${!r}
                                @click=${()=>e.onFileReset(s.name)}
                              >
                                Reset
                              </button>
                              <button
                                class="btn btn--sm primary"
                                ?disabled=${e.agentFileSaving||!r}
                                @click=${()=>e.onFileSave(s.name)}
                              >
                                ${e.agentFileSaving?"Saving…":"Save"}
                              </button>
                            </div>
                          </div>
                          ${s.missing?l`
                                  <div class="callout info" style="margin-top: 10px">
                                    This file is missing. Saving will create it in the agent workspace.
                                  </div>
                                `:y}
                          <label class="field" style="margin-top: 12px;">
                            <span>Content</span>
                            <textarea
                              .value=${a}
                              @input=${c=>e.onFileDraftChange(s.name,c.target.value)}
                            ></textarea>
                          </label>
                        `:l`
                          <div class="muted">Select a file to edit.</div>
                        `}
                </div>
              </div>
            `:l`
              <div class="callout info" style="margin-top: 12px">
                Load the agent workspace files to edit core instructions.
              </div>
            `}
    </section>
  `}function Sf(e,t,n){const i=e.missing?"Missing":`${of(e.size)} · ${Ue(e.updatedAtMs??null)}`;return l`
    <button
      type="button"
      class="agent-file-row ${t===e.name?"active":""}"
      @click=${n}
    >
      <div>
        <div class="agent-file-name mono">${e.name}</div>
        <div class="agent-file-meta">${i}</div>
      </div>
      ${e.missing?l`
              <span class="agent-pill warn">missing</span>
            `:y}
    </button>
  `}const kn=[{id:"workspace",label:"Workspace Skills",sources:["openclaw-workspace"]},{id:"built-in",label:"Built-in Skills",sources:["openclaw-bundled"]},{id:"installed",label:"Installed Skills",sources:["openclaw-managed"]},{id:"extra",label:"Extra Skills",sources:["openclaw-extra"]}];function ol(e){var o;const t=new Map;for(const a of kn)t.set(a.id,{id:a.id,label:a.label,skills:[]});const n=kn.find(a=>a.id==="built-in"),i={id:"other",label:"Other Skills",skills:[]};for(const a of e){const r=a.bundled?n:kn.find(d=>d.sources.includes(a.source));r?(o=t.get(r.id))==null||o.skills.push(a):i.skills.push(a)}const s=kn.map(a=>t.get(a.id)).filter(a=>!!(a&&a.skills.length>0));return i.skills.length>0&&s.push(i),s}function al(e){return[...e.missing.bins.map(t=>`bin:${t}`),...e.missing.env.map(t=>`env:${t}`),...e.missing.config.map(t=>`config:${t}`),...e.missing.os.map(t=>`os:${t}`)]}function rl(e){const t=[];return e.disabled&&t.push("disabled"),e.blockedByAllowlist&&t.push("blocked by allowlist"),t}function ll(e){const t=e.skill,n=!!e.showBundledBadge;return l`
    <div class="chip-row" style="margin-top: 6px;">
      <span class="chip">${t.source}</span>
      ${n?l`
              <span class="chip">bundled</span>
            `:y}
      <span class="chip ${t.eligible?"chip-ok":"chip-warn"}">
        ${t.eligible?"eligible":"blocked"}
      </span>
      ${t.disabled?l`
              <span class="chip chip-warn">disabled</span>
            `:y}
    </div>
  `}function xf(e){var C;const t=si(e.configForm,e.agentId),n=((C=t.entry)==null?void 0:C.tools)??{},i=t.globalTools??{},s=n.profile??i.profile??"full",o=n.profile?"agent override":i.profile?"global default":"default",a=Array.isArray(n.allow)&&n.allow.length>0,r=Array.isArray(i.allow)&&i.allow.length>0,d=!!e.configForm&&!e.configLoading&&!e.configSaving&&!a,c=a?[]:Array.isArray(n.alsoAllow)?n.alsoAllow:[],u=a?[]:Array.isArray(n.deny)?n.deny:[],g=a?{allow:n.allow??[],deny:n.deny??[]}:gf()??void 0,f=ia.flatMap(F=>F.tools.map(R=>R.id)),m=F=>{const R=uf(F,g),L=ra(F,c),k=ra(F,u);return{allowed:(R||L)&&!k,baseAllowed:R,denied:k}},$=f.filter(F=>m(F).allowed).length,S=(F,R)=>{const L=new Set(c.map(D=>Ne(D)).filter(D=>D.length>0)),k=new Set(u.map(D=>Ne(D)).filter(D=>D.length>0)),E=m(F).baseAllowed,O=Ne(F);R?(k.delete(O),E||L.add(O)):(L.delete(O),k.add(O)),e.onOverridesChange(e.agentId,[...L],[...k])},x=F=>{const R=new Set(c.map(k=>Ne(k)).filter(k=>k.length>0)),L=new Set(u.map(k=>Ne(k)).filter(k=>k.length>0));for(const k of f){const E=m(k).baseAllowed,O=Ne(k);F?(L.delete(O),E||R.add(O)):(R.delete(O),L.add(O))}e.onOverridesChange(e.agentId,[...R],[...L])};return l`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Tool Access</div>
          <div class="card-sub">
            Profile + per-tool overrides for this agent.
            <span class="mono">${$}/${f.length}</span> enabled.
          </div>
        </div>
        <div class="row" style="gap: 8px;">
          <button class="btn btn--sm" ?disabled=${!d} @click=${()=>x(!0)}>
            Enable All
          </button>
          <button class="btn btn--sm" ?disabled=${!d} @click=${()=>x(!1)}>
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

      ${e.configForm?y:l`
              <div class="callout info" style="margin-top: 12px">
                Load the gateway config to adjust tool profiles.
              </div>
            `}
      ${a?l`
              <div class="callout info" style="margin-top: 12px">
                This agent is using an explicit allowlist in config. Tool overrides are managed in the Config tab.
              </div>
            `:y}
      ${r?l`
              <div class="callout info" style="margin-top: 12px">
                Global tools.allow is set. Agent overrides cannot enable tools that are globally blocked.
              </div>
            `:y}

      <div class="agent-tools-meta" style="margin-top: 16px;">
        <div class="agent-kv">
          <div class="label">Profile</div>
          <div class="mono">${s}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Source</div>
          <div>${o}</div>
        </div>
        ${e.configDirty?l`
                <div class="agent-kv">
                  <div class="label">Status</div>
                  <div class="mono">unsaved</div>
                </div>
              `:y}
      </div>

      <div class="agent-tools-presets" style="margin-top: 16px;">
        <div class="label">Quick Presets</div>
        <div class="agent-tools-buttons">
          ${sf.map(F=>l`
              <button
                class="btn btn--sm ${s===F.id?"active":""}"
                ?disabled=${!d}
                @click=${()=>e.onProfileChange(e.agentId,F.id,!0)}
              >
                ${F.label}
              </button>
            `)}
          <button
            class="btn btn--sm"
            ?disabled=${!d}
            @click=${()=>e.onProfileChange(e.agentId,null,!1)}
          >
            Inherit
          </button>
        </div>
      </div>

      <div class="agent-tools-grid" style="margin-top: 20px;">
        ${ia.map(F=>l`
              <div class="agent-tools-section">
                <div class="agent-tools-header">${F.label}</div>
                <div class="agent-tools-list">
                  ${F.tools.map(R=>{const{allowed:L}=m(R.id);return l`
                      <div class="agent-tool-row">
                        <div>
                          <div class="agent-tool-title mono">${R.label}</div>
                          <div class="agent-tool-sub">${R.description}</div>
                        </div>
                        <label class="cfg-toggle">
                          <input
                            type="checkbox"
                            .checked=${L}
                            ?disabled=${!d}
                            @change=${k=>S(R.id,k.target.checked)}
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
  `}function Af(e){var m,$,S;const t=!!e.configForm&&!e.configLoading&&!e.configSaving,n=si(e.configForm,e.agentId),i=Array.isArray((m=n.entry)==null?void 0:m.skills)?($=n.entry)==null?void 0:$.skills:void 0,s=new Set((i??[]).map(x=>x.trim()).filter(Boolean)),o=i!==void 0,a=!!(e.report&&e.activeAgentId===e.agentId),r=a?((S=e.report)==null?void 0:S.skills)??[]:[],d=e.filter.trim().toLowerCase(),c=d?r.filter(x=>[x.name,x.description,x.source].join(" ").toLowerCase().includes(d)):r,u=ol(c),g=o?r.filter(x=>s.has(x.name)).length:r.length,f=r.length;return l`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Skills</div>
          <div class="card-sub">
            Per-agent skill allowlist and workspace skills.
            ${f>0?l`<span class="mono">${g}/${f}</span>`:y}
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

      ${e.configForm?y:l`
              <div class="callout info" style="margin-top: 12px">
                Load the gateway config to set per-agent skills.
              </div>
            `}
      ${o?l`
              <div class="callout info" style="margin-top: 12px">This agent uses a custom skill allowlist.</div>
            `:l`
              <div class="callout info" style="margin-top: 12px">
                All skills are enabled. Disabling any skill will create a per-agent allowlist.
              </div>
            `}
      ${!a&&!e.loading?l`
              <div class="callout info" style="margin-top: 12px">
                Load skills for this agent to view workspace-specific entries.
              </div>
            `:y}
      ${e.error?l`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:y}

      <div class="filters" style="margin-top: 14px;">
        <label class="field" style="flex: 1;">
          <span>Filter</span>
          <input
            .value=${e.filter}
            @input=${x=>e.onFilterChange(x.target.value)}
            placeholder="Search skills"
          />
        </label>
        <div class="muted">${c.length} shown</div>
      </div>

      ${c.length===0?l`
              <div class="muted" style="margin-top: 16px">No skills found.</div>
            `:l`
              <div class="agent-skills-groups" style="margin-top: 16px;">
                ${u.map(x=>_f(x,{agentId:e.agentId,allowSet:s,usingAllowlist:o,editable:t,onToggle:e.onToggle}))}
              </div>
            `}
    </section>
  `}function _f(e,t){const n=e.id==="workspace"||e.id==="built-in";return l`
    <details class="agent-skills-group" ?open=${!n}>
      <summary class="agent-skills-header">
        <span>${e.label}</span>
        <span class="muted">${e.skills.length}</span>
      </summary>
      <div class="list skills-grid">
        ${e.skills.map(i=>Cf(i,{agentId:t.agentId,allowSet:t.allowSet,usingAllowlist:t.usingAllowlist,editable:t.editable,onToggle:t.onToggle}))}
      </div>
    </details>
  `}function Cf(e,t){const n=t.usingAllowlist?t.allowSet.has(e.name):!0,i=al(e),s=rl(e);return l`
    <div class="list-item agent-skill-row">
      <div class="list-main">
        <div class="list-title">${e.emoji?`${e.emoji} `:""}${e.name}</div>
        <div class="list-sub">${e.description}</div>
        ${ll({skill:e})}
        ${i.length>0?l`<div class="muted" style="margin-top: 6px;">Missing: ${i.join(", ")}</div>`:y}
        ${s.length>0?l`<div class="muted" style="margin-top: 6px;">Reason: ${s.join(", ")}</div>`:y}
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
  `}function Tf(e){var o,a,r;const t=((o=e.agentsList)==null?void 0:o.agents)??[],n=((a=e.agentsList)==null?void 0:a.defaultId)??null,i=e.selectedAgentId??n??((r=t[0])==null?void 0:r.id)??null,s=i?t.find(d=>d.id===i)??null:null;return l`
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
        ${e.error?l`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:y}
        <div class="agent-list" style="margin-top: 12px;">
          ${t.length===0?l`
                  <div class="muted">No agents found.</div>
                `:t.map(d=>{const c=il(d.id,n),u=ii(d,e.agentIdentityById[d.id]??null);return l`
                    <button
                      type="button"
                      class="agent-row ${i===d.id?"active":""}"
                      @click=${()=>e.onSelectAgent(d.id)}
                    >
                      <div class="agent-avatar">${u||is(d).slice(0,1)}</div>
                      <div class="agent-info">
                        <div class="agent-title">${is(d)}</div>
                        <div class="agent-sub mono">${d.id}</div>
                      </div>
                      ${c?l`<span class="agent-pill">${c}</span>`:y}
                    </button>
                  `})}
        </div>
      </section>
      <section class="agents-main">
        ${s?l`
                ${Ef(s,n,e.agentIdentityById[s.id]??null)}
                ${Lf(e.activePanel,d=>e.onSelectPanel(d))}
                ${e.activePanel==="overview"?Rf({agent:s,defaultId:n,configForm:e.configForm,agentFilesList:e.agentFilesList,agentIdentity:e.agentIdentityById[s.id]??null,agentIdentityError:e.agentIdentityError,agentIdentityLoading:e.agentIdentityLoading,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave,onModelChange:e.onModelChange,onModelFallbacksChange:e.onModelFallbacksChange}):y}
                ${e.activePanel==="files"?kf({agentId:s.id,agentFilesList:e.agentFilesList,agentFilesLoading:e.agentFilesLoading,agentFilesError:e.agentFilesError,agentFileActive:e.agentFileActive,agentFileContents:e.agentFileContents,agentFileDrafts:e.agentFileDrafts,agentFileSaving:e.agentFileSaving,onLoadFiles:e.onLoadFiles,onSelectFile:e.onSelectFile,onFileDraftChange:e.onFileDraftChange,onFileReset:e.onFileReset,onFileSave:e.onFileSave}):y}
                ${e.activePanel==="tools"?xf({agentId:s.id,configForm:e.configForm,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,onProfileChange:e.onToolsProfileChange,onOverridesChange:e.onToolsOverridesChange,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):y}
                ${e.activePanel==="skills"?Af({agentId:s.id,report:e.agentSkillsReport,loading:e.agentSkillsLoading,error:e.agentSkillsError,activeAgentId:e.agentSkillsAgentId,configForm:e.configForm,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,filter:e.skillsFilter,onFilterChange:e.onSkillsFilterChange,onRefresh:e.onSkillsRefresh,onToggle:e.onAgentSkillToggle,onClear:e.onAgentSkillsClear,onDisableAll:e.onAgentSkillsDisableAll,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):y}
                ${e.activePanel==="channels"?wf({context:sa(s,e.configForm,e.agentFilesList,n,e.agentIdentityById[s.id]??null),configForm:e.configForm,snapshot:e.channelsSnapshot,loading:e.channelsLoading,error:e.channelsError,lastSuccess:e.channelsLastSuccess,onRefresh:e.onChannelsRefresh}):y}
                ${e.activePanel==="cron"?$f({context:sa(s,e.configForm,e.agentFilesList,n,e.agentIdentityById[s.id]??null),agentId:s.id,jobs:e.cronJobs,status:e.cronStatus,loading:e.cronLoading,error:e.cronError,onRefresh:e.onCronRefresh}):y}
              `:l`
                <div class="card">
                  <div class="card-title">Select an agent</div>
                  <div class="card-sub">Pick an agent to inspect its workspace and tools.</div>
                </div>
              `}
      </section>
    </div>
  `}function Ef(e,t,n){var r,d;const i=il(e.id,t),s=is(e),o=((d=(r=e.identity)==null?void 0:r.theme)==null?void 0:d.trim())||"Agent workspace and routing.",a=ii(e,n);return l`
    <section class="card agent-header">
      <div class="agent-header-main">
        <div class="agent-avatar agent-avatar--lg">${a||s.slice(0,1)}</div>
        <div>
          <div class="card-title">${s}</div>
          <div class="card-sub">${o}</div>
        </div>
      </div>
      <div class="agent-header-meta">
        <div class="mono">${e.id}</div>
        ${i?l`<span class="agent-pill">${i}</span>`:y}
      </div>
    </section>
  `}function Lf(e,t){return l`
    <div class="agent-tabs">
      ${[{id:"overview",label:"Overview"},{id:"files",label:"Files"},{id:"tools",label:"Tools"},{id:"skills",label:"Skills"},{id:"channels",label:"Channels"},{id:"cron",label:"Cron Jobs"}].map(i=>l`
          <button
            class="agent-tab ${e===i.id?"active":""}"
            type="button"
            @click=${()=>t(i.id)}
          >
            ${i.label}
          </button>
        `)}
    </div>
  `}function Rf(e){var G,X,Y,V,de,ue,J,be,H,Re,q,ze,vt,Ie,It,mt;const{agent:t,configForm:n,agentFilesList:i,agentIdentity:s,agentIdentityLoading:o,agentIdentityError:a,configLoading:r,configSaving:d,configDirty:c,onConfigReload:u,onConfigSave:g,onModelChange:f,onModelFallbacksChange:m}=e,$=si(n,t.id),x=(i&&i.agentId===t.id?i.workspace:null)||((G=$.entry)==null?void 0:G.workspace)||((X=$.defaults)==null?void 0:X.workspace)||"default",C=(Y=$.entry)!=null&&Y.model?Vt((V=$.entry)==null?void 0:V.model):Vt((de=$.defaults)==null?void 0:de.model),F=Vt((ue=$.defaults)==null?void 0:ue.model),R=aa((J=$.entry)==null?void 0:J.model)||(C!=="-"?oa(C):null),L=aa((be=$.defaults)==null?void 0:be.model)||(F!=="-"?oa(F):null),k=R??L??null,E=af((H=$.entry)==null?void 0:H.model),O=E?E.join(", "):"",D=((Re=s==null?void 0:s.name)==null?void 0:Re.trim())||((ze=(q=t.identity)==null?void 0:q.name)==null?void 0:ze.trim())||((vt=t.name)==null?void 0:vt.trim())||((Ie=$.entry)==null?void 0:Ie.name)||"-",Le=ii(t,s)||"-",b=Array.isArray((It=$.entry)==null?void 0:It.skills)?(mt=$.entry)==null?void 0:mt.skills:null,T=(b==null?void 0:b.length)??null,U=o?"Loading…":a?"Unavailable":"",B=!!(e.defaultId&&t.id===e.defaultId);return l`
    <section class="card">
      <div class="card-title">Overview</div>
      <div class="card-sub">Workspace paths and identity metadata.</div>
      <div class="agents-overview-grid" style="margin-top: 16px;">
        <div class="agent-kv">
          <div class="label">Workspace</div>
          <div class="mono">${x}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Primary Model</div>
          <div class="mono">${C}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Identity Name</div>
          <div>${D}</div>
          ${U?l`<div class="agent-kv-sub muted">${U}</div>`:y}
        </div>
        <div class="agent-kv">
          <div class="label">Default</div>
          <div>${B?"yes":"no"}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Identity Emoji</div>
          <div>${Le}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Skills Filter</div>
          <div>${b?`${T} selected`:"all skills"}</div>
        </div>
      </div>

      <div class="agent-model-select" style="margin-top: 20px;">
        <div class="label">Model Selection</div>
        <div class="row" style="gap: 12px; flex-wrap: wrap;">
          <label class="field" style="min-width: 260px; flex: 1;">
            <span>Primary model${B?" (default)":""}</span>
            <select
              .value=${k??""}
              ?disabled=${!n||r||d}
              @change=${yt=>f(t.id,yt.target.value||null)}
            >
              ${B?y:l`
                      <option value="">
                        ${L?`Inherit default (${L})`:"Inherit default"}
                      </option>
                    `}
              ${cf(n,k??void 0)}
            </select>
          </label>
          <label class="field" style="min-width: 260px; flex: 1;">
            <span>Fallbacks (comma-separated)</span>
            <input
              .value=${O}
              ?disabled=${!n||r||d}
              placeholder="provider/model, provider/model"
              @input=${yt=>m(t.id,rf(yt.target.value))}
            />
          </label>
        </div>
        <div class="row" style="justify-content: flex-end; gap: 8px;">
          <button class="btn btn--sm" ?disabled=${r} @click=${u}>
            Reload Config
          </button>
          <button
            class="btn btn--sm primary"
            ?disabled=${d||!c}
            @click=${g}
          >
            ${d?"Saving…":"Save"}
          </button>
        </div>
      </div>
    </section>
  `}function la(e){var t;e&&((t=navigator.clipboard)==null||t.writeText(e).catch(()=>{}))}function If(e){const{loading:t,saving:n,error:i,content:s,lastSuccessAt:o,dependentFiles:a,onReload:r,onSave:d,onContentChange:c}=e,u=o!=null?new Date(o).toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"";return l`
    <section class="card">
      <div class="row" style="justify-content: space-between; align-items: flex-start;">
        <div>
          <div class="card-title">业务知识</div>
          <div class="card-sub">
            编辑万鼎业务知识（wanding_business_knowledge.md），供选型与匹配使用。保存后 LLM 将使用最新内容。
          </div>
        </div>
        <div class="row" style="gap: 8px; align-items: center;">
          ${u?l`<span class="muted">已保存 ${u}</span>`:y}
          <button class="btn" ?disabled=${t} @click=${r}>
            ${t?"加载中…":"重新加载"}
          </button>
          <button class="btn btn--primary" ?disabled=${t||n} @click=${()=>d(s)}>
            ${n?"保存中…":"保存"}
          </button>
        </div>
      </div>
      ${i?l`<div class="callout danger" style="margin-top: 12px;">${i}</div>`:y}
      ${a&&(a.mapping_table||a.price_library)?l`
            <div class="callout" style="margin-top: 12px; padding: 12px;">
              <div style="font-weight: 600; margin-bottom: 8px;">相关数据文件</div>
              <p class="muted" style="margin: 0 0 10px 0; font-size: 0.9rem;">
                选型与历史报价依赖以下 Excel，有更新时可复制路径后在资源管理器中打开或用 Excel 编辑。
              </p>
              ${a.mapping_table?l`
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; flex-wrap: wrap;">
                      <span style="min-width: 100px;">询价映射表（历史报价）：</span>
                      <code style="flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; font-size: 0.85rem;">${a.mapping_table}</code>
                      <button
                        class="btn"
                        style="flex-shrink: 0;"
                        @click=${()=>la(a.mapping_table)}
                        title="复制路径"
                      >
                        复制路径
                      </button>
                    </div>
                  `:y}
              ${a.price_library?l`
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                      <span style="min-width: 100px;">万鼎价格库：</span>
                      <code style="flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; font-size: 0.85rem;">${a.price_library}</code>
                      <button
                        class="btn"
                        style="flex-shrink: 0;"
                        @click=${()=>la(a.price_library)}
                        title="复制路径"
                      >
                        复制路径
                      </button>
                    </div>
                  `:y}
            </div>
          `:y}
      <div style="margin-top: 16px;">
        <textarea
          class="code-block"
          style="width: 100%; min-height: 360px; font-family: var(--font-mono, monospace); font-size: 0.9rem; padding: 12px; resize: vertical; box-sizing: border-box;"
          .value=${s}
          ?disabled=${t}
          @input=${g=>{const f=g.target;c((f==null?void 0:f.value)??"")}}
          placeholder="【业务知识】&#10;1. …"
        ></textarea>
      </div>
    </section>
  `}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qt=(e,t)=>{var i;const n=e._$AN;if(n===void 0)return!1;for(const s of n)(i=s._$AO)==null||i.call(s,t,!1),Qt(s,t);return!0},Un=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while((n==null?void 0:n.size)===0)},cl=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),Pf(t)}};function Mf(e){this._$AN!==void 0?(Un(this),this._$AM=e,cl(this)):this._$AM=e}function Ff(e,t=!1,n=0){const i=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(t)if(Array.isArray(i))for(let o=n;o<i.length;o++)Qt(i[o],!1),Un(i[o]);else i!=null&&(Qt(i,!1),Un(i));else Qt(this,e)}const Pf=e=>{e.type==Us.CHILD&&(e._$AP??(e._$AP=Ff),e._$AQ??(e._$AQ=Mf))};class Df extends js{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,n,i){super._$AT(t,n,i),cl(this),this.isConnected=t._$AU}_$AO(t,n=!0){var i,s;t!==this.isConnected&&(this.isConnected=t,t?(i=this.reconnected)==null||i.call(this):(s=this.disconnected)==null||s.call(this)),n&&(Qt(this,t),Un(this))}setValue(t){if(Ig(this._$Ct))this._$Ct._$AI(t,this);else{const n=[...this._$Ct._$AH];n[this._$Ci]=t,this._$Ct._$AI(n,this,0)}}disconnected(){}reconnected(){}}const Di=new WeakMap,Of=zs(class extends Df{render(e){return y}update(e,[t]){var i;const n=t!==this.G;return n&&this.G!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=(i=e.options)==null?void 0:i.host,this.rt(this.ct=e.element)),y}rt(e){if(this.isConnected||(e=void 0),typeof this.G=="function"){const t=this.ht??globalThis;let n=Di.get(t);n===void 0&&(n=new WeakMap,Di.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){var e,t;return typeof this.G=="function"?(e=Di.get(this.ht??globalThis))==null?void 0:e.get(this.G):(t=this.G)==null?void 0:t.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class os extends js{constructor(t){if(super(t),this.it=y,t.type!==Us.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===y||t==null)return this._t=void 0,this.it=t;if(t===Ge)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}os.directiveName="unsafeHTML",os.resultType=1;const as=zs(os);/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:dl,setPrototypeOf:ca,isFrozen:Nf,getPrototypeOf:Bf,getOwnPropertyDescriptor:Uf}=Object;let{freeze:le,seal:ye,create:rs}=Object,{apply:ls,construct:cs}=typeof Reflect<"u"&&Reflect;le||(le=function(t){return t});ye||(ye=function(t){return t});ls||(ls=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),o=2;o<i;o++)s[o-2]=arguments[o];return t.apply(n,s)});cs||(cs=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const Sn=ce(Array.prototype.forEach),zf=ce(Array.prototype.lastIndexOf),da=ce(Array.prototype.pop),Ot=ce(Array.prototype.push),jf=ce(Array.prototype.splice),Mn=ce(String.prototype.toLowerCase),Oi=ce(String.prototype.toString),Ni=ce(String.prototype.match),Nt=ce(String.prototype.replace),Kf=ce(String.prototype.indexOf),Hf=ce(String.prototype.trim),we=ce(Object.prototype.hasOwnProperty),ae=ce(RegExp.prototype.test),Bt=qf(TypeError);function ce(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return ls(e,t,i)}}function qf(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return cs(e,n)}}function z(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Mn;ca&&ca(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const o=n(s);o!==s&&(Nf(t)||(t[i]=o),s=o)}e[s]=!0}return e}function Gf(e){for(let t=0;t<e.length;t++)we(e,t)||(e[t]=null);return e}function _e(e){const t=rs(null);for(const[n,i]of dl(e))we(e,n)&&(Array.isArray(i)?t[n]=Gf(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=_e(i):t[n]=i);return t}function Ut(e,t){for(;e!==null;){const i=Uf(e,t);if(i){if(i.get)return ce(i.get);if(typeof i.value=="function")return ce(i.value)}e=Bf(e)}function n(){return null}return n}const ua=le(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Bi=le(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ui=le(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Wf=le(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),zi=le(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Vf=le(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ga=le(["#text"]),fa=le(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ji=le(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ha=le(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),xn=le(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Jf=ye(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Qf=ye(/<%[\w\W]*|[\w\W]*%>/gm),Yf=ye(/\$\{[\w\W]*/gm),Xf=ye(/^data-[\-\w.\u00B7-\uFFFF]+$/),Zf=ye(/^aria-[\-\w]+$/),ul=ye(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),eh=ye(/^(?:\w+script|data):/i),th=ye(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),gl=ye(/^html$/i),nh=ye(/^[a-z][.\w]*(-[.\w]+)+$/i);var pa=Object.freeze({__proto__:null,ARIA_ATTR:Zf,ATTR_WHITESPACE:th,CUSTOM_ELEMENT:nh,DATA_ATTR:Xf,DOCTYPE_NAME:gl,ERB_EXPR:Qf,IS_ALLOWED_URI:ul,IS_SCRIPT_OR_DATA:eh,MUSTACHE_EXPR:Jf,TMPLIT_EXPR:Yf});const zt={element:1,text:3,progressingInstruction:7,comment:8,document:9},ih=function(){return typeof window>"u"?null:window},sh=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const o="dompurify"+(i?"#"+i:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},va=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function fl(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ih();const t=P=>fl(P);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==zt.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:r,Element:d,NodeFilter:c,NamedNodeMap:u=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:g,DOMParser:f,trustedTypes:m}=e,$=d.prototype,S=Ut($,"cloneNode"),x=Ut($,"remove"),C=Ut($,"nextSibling"),F=Ut($,"childNodes"),R=Ut($,"parentNode");if(typeof a=="function"){const P=n.createElement("template");P.content&&P.content.ownerDocument&&(n=P.content.ownerDocument)}let L,k="";const{implementation:E,createNodeIterator:O,createDocumentFragment:D,getElementsByTagName:N}=n,{importNode:Le}=i;let b=va();t.isSupported=typeof dl=="function"&&typeof R=="function"&&E&&E.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:T,ERB_EXPR:U,TMPLIT_EXPR:B,DATA_ATTR:G,ARIA_ATTR:X,IS_SCRIPT_OR_DATA:Y,ATTR_WHITESPACE:V,CUSTOM_ELEMENT:de}=pa;let{IS_ALLOWED_URI:ue}=pa,J=null;const be=z({},[...ua,...Bi,...Ui,...zi,...ga]);let H=null;const Re=z({},[...fa,...ji,...ha,...xn]);let q=Object.seal(rs(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ze=null,vt=null;const Ie=Object.seal(rs(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let It=!0,mt=!0,yt=!1,no=!0,bt=!1,gn=!0,Qe=!1,li=!1,ci=!1,wt=!1,fn=!1,hn=!1,io=!0,so=!1;const Dl="user-content-";let di=!0,Mt=!1,$t={},Se=null;const ui=z({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let oo=null;const ao=z({},["audio","video","img","source","image","track"]);let gi=null;const ro=z({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),pn="http://www.w3.org/1998/Math/MathML",vn="http://www.w3.org/2000/svg",Me="http://www.w3.org/1999/xhtml";let kt=Me,fi=!1,hi=null;const Ol=z({},[pn,vn,Me],Oi);let mn=z({},["mi","mo","mn","ms","mtext"]),yn=z({},["annotation-xml"]);const Nl=z({},["title","style","font","a","script"]);let Ft=null;const Bl=["application/xhtml+xml","text/html"],Ul="text/html";let ee=null,St=null;const zl=n.createElement("form"),lo=function(w){return w instanceof RegExp||w instanceof Function},pi=function(){let w=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(St&&St===w)){if((!w||typeof w!="object")&&(w={}),w=_e(w),Ft=Bl.indexOf(w.PARSER_MEDIA_TYPE)===-1?Ul:w.PARSER_MEDIA_TYPE,ee=Ft==="application/xhtml+xml"?Oi:Mn,J=we(w,"ALLOWED_TAGS")?z({},w.ALLOWED_TAGS,ee):be,H=we(w,"ALLOWED_ATTR")?z({},w.ALLOWED_ATTR,ee):Re,hi=we(w,"ALLOWED_NAMESPACES")?z({},w.ALLOWED_NAMESPACES,Oi):Ol,gi=we(w,"ADD_URI_SAFE_ATTR")?z(_e(ro),w.ADD_URI_SAFE_ATTR,ee):ro,oo=we(w,"ADD_DATA_URI_TAGS")?z(_e(ao),w.ADD_DATA_URI_TAGS,ee):ao,Se=we(w,"FORBID_CONTENTS")?z({},w.FORBID_CONTENTS,ee):ui,ze=we(w,"FORBID_TAGS")?z({},w.FORBID_TAGS,ee):_e({}),vt=we(w,"FORBID_ATTR")?z({},w.FORBID_ATTR,ee):_e({}),$t=we(w,"USE_PROFILES")?w.USE_PROFILES:!1,It=w.ALLOW_ARIA_ATTR!==!1,mt=w.ALLOW_DATA_ATTR!==!1,yt=w.ALLOW_UNKNOWN_PROTOCOLS||!1,no=w.ALLOW_SELF_CLOSE_IN_ATTR!==!1,bt=w.SAFE_FOR_TEMPLATES||!1,gn=w.SAFE_FOR_XML!==!1,Qe=w.WHOLE_DOCUMENT||!1,wt=w.RETURN_DOM||!1,fn=w.RETURN_DOM_FRAGMENT||!1,hn=w.RETURN_TRUSTED_TYPE||!1,ci=w.FORCE_BODY||!1,io=w.SANITIZE_DOM!==!1,so=w.SANITIZE_NAMED_PROPS||!1,di=w.KEEP_CONTENT!==!1,Mt=w.IN_PLACE||!1,ue=w.ALLOWED_URI_REGEXP||ul,kt=w.NAMESPACE||Me,mn=w.MATHML_TEXT_INTEGRATION_POINTS||mn,yn=w.HTML_INTEGRATION_POINTS||yn,q=w.CUSTOM_ELEMENT_HANDLING||{},w.CUSTOM_ELEMENT_HANDLING&&lo(w.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(q.tagNameCheck=w.CUSTOM_ELEMENT_HANDLING.tagNameCheck),w.CUSTOM_ELEMENT_HANDLING&&lo(w.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(q.attributeNameCheck=w.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),w.CUSTOM_ELEMENT_HANDLING&&typeof w.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(q.allowCustomizedBuiltInElements=w.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),bt&&(mt=!1),fn&&(wt=!0),$t&&(J=z({},ga),H=[],$t.html===!0&&(z(J,ua),z(H,fa)),$t.svg===!0&&(z(J,Bi),z(H,ji),z(H,xn)),$t.svgFilters===!0&&(z(J,Ui),z(H,ji),z(H,xn)),$t.mathMl===!0&&(z(J,zi),z(H,ha),z(H,xn))),w.ADD_TAGS&&(typeof w.ADD_TAGS=="function"?Ie.tagCheck=w.ADD_TAGS:(J===be&&(J=_e(J)),z(J,w.ADD_TAGS,ee))),w.ADD_ATTR&&(typeof w.ADD_ATTR=="function"?Ie.attributeCheck=w.ADD_ATTR:(H===Re&&(H=_e(H)),z(H,w.ADD_ATTR,ee))),w.ADD_URI_SAFE_ATTR&&z(gi,w.ADD_URI_SAFE_ATTR,ee),w.FORBID_CONTENTS&&(Se===ui&&(Se=_e(Se)),z(Se,w.FORBID_CONTENTS,ee)),w.ADD_FORBID_CONTENTS&&(Se===ui&&(Se=_e(Se)),z(Se,w.ADD_FORBID_CONTENTS,ee)),di&&(J["#text"]=!0),Qe&&z(J,["html","head","body"]),J.table&&(z(J,["tbody"]),delete ze.tbody),w.TRUSTED_TYPES_POLICY){if(typeof w.TRUSTED_TYPES_POLICY.createHTML!="function")throw Bt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof w.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Bt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');L=w.TRUSTED_TYPES_POLICY,k=L.createHTML("")}else L===void 0&&(L=sh(m,s)),L!==null&&typeof k=="string"&&(k=L.createHTML(""));le&&le(w),St=w}},co=z({},[...Bi,...Ui,...Wf]),uo=z({},[...zi,...Vf]),jl=function(w){let A=R(w);(!A||!A.tagName)&&(A={namespaceURI:kt,tagName:"template"});const M=Mn(w.tagName),Q=Mn(A.tagName);return hi[w.namespaceURI]?w.namespaceURI===vn?A.namespaceURI===Me?M==="svg":A.namespaceURI===pn?M==="svg"&&(Q==="annotation-xml"||mn[Q]):!!co[M]:w.namespaceURI===pn?A.namespaceURI===Me?M==="math":A.namespaceURI===vn?M==="math"&&yn[Q]:!!uo[M]:w.namespaceURI===Me?A.namespaceURI===vn&&!yn[Q]||A.namespaceURI===pn&&!mn[Q]?!1:!uo[M]&&(Nl[M]||!co[M]):!!(Ft==="application/xhtml+xml"&&hi[w.namespaceURI]):!1},xe=function(w){Ot(t.removed,{element:w});try{R(w).removeChild(w)}catch{x(w)}},Ye=function(w,A){try{Ot(t.removed,{attribute:A.getAttributeNode(w),from:A})}catch{Ot(t.removed,{attribute:null,from:A})}if(A.removeAttribute(w),w==="is")if(wt||fn)try{xe(A)}catch{}else try{A.setAttribute(w,"")}catch{}},go=function(w){let A=null,M=null;if(ci)w="<remove></remove>"+w;else{const Z=Ni(w,/^[\r\n\t ]+/);M=Z&&Z[0]}Ft==="application/xhtml+xml"&&kt===Me&&(w='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+w+"</body></html>");const Q=L?L.createHTML(w):w;if(kt===Me)try{A=new f().parseFromString(Q,Ft)}catch{}if(!A||!A.documentElement){A=E.createDocument(kt,"template",null);try{A.documentElement.innerHTML=fi?k:Q}catch{}}const se=A.body||A.documentElement;return w&&M&&se.insertBefore(n.createTextNode(M),se.childNodes[0]||null),kt===Me?N.call(A,Qe?"html":"body")[0]:Qe?A.documentElement:se},fo=function(w){return O.call(w.ownerDocument||w,w,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},vi=function(w){return w instanceof g&&(typeof w.nodeName!="string"||typeof w.textContent!="string"||typeof w.removeChild!="function"||!(w.attributes instanceof u)||typeof w.removeAttribute!="function"||typeof w.setAttribute!="function"||typeof w.namespaceURI!="string"||typeof w.insertBefore!="function"||typeof w.hasChildNodes!="function")},ho=function(w){return typeof r=="function"&&w instanceof r};function Fe(P,w,A){Sn(P,M=>{M.call(t,w,A,St)})}const po=function(w){let A=null;if(Fe(b.beforeSanitizeElements,w,null),vi(w))return xe(w),!0;const M=ee(w.nodeName);if(Fe(b.uponSanitizeElement,w,{tagName:M,allowedTags:J}),gn&&w.hasChildNodes()&&!ho(w.firstElementChild)&&ae(/<[/\w!]/g,w.innerHTML)&&ae(/<[/\w!]/g,w.textContent)||w.nodeType===zt.progressingInstruction||gn&&w.nodeType===zt.comment&&ae(/<[/\w]/g,w.data))return xe(w),!0;if(!(Ie.tagCheck instanceof Function&&Ie.tagCheck(M))&&(!J[M]||ze[M])){if(!ze[M]&&mo(M)&&(q.tagNameCheck instanceof RegExp&&ae(q.tagNameCheck,M)||q.tagNameCheck instanceof Function&&q.tagNameCheck(M)))return!1;if(di&&!Se[M]){const Q=R(w)||w.parentNode,se=F(w)||w.childNodes;if(se&&Q){const Z=se.length;for(let ge=Z-1;ge>=0;--ge){const Pe=S(se[ge],!0);Pe.__removalCount=(w.__removalCount||0)+1,Q.insertBefore(Pe,C(w))}}}return xe(w),!0}return w instanceof d&&!jl(w)||(M==="noscript"||M==="noembed"||M==="noframes")&&ae(/<\/no(script|embed|frames)/i,w.innerHTML)?(xe(w),!0):(bt&&w.nodeType===zt.text&&(A=w.textContent,Sn([T,U,B],Q=>{A=Nt(A,Q," ")}),w.textContent!==A&&(Ot(t.removed,{element:w.cloneNode()}),w.textContent=A)),Fe(b.afterSanitizeElements,w,null),!1)},vo=function(w,A,M){if(io&&(A==="id"||A==="name")&&(M in n||M in zl))return!1;if(!(mt&&!vt[A]&&ae(G,A))){if(!(It&&ae(X,A))){if(!(Ie.attributeCheck instanceof Function&&Ie.attributeCheck(A,w))){if(!H[A]||vt[A]){if(!(mo(w)&&(q.tagNameCheck instanceof RegExp&&ae(q.tagNameCheck,w)||q.tagNameCheck instanceof Function&&q.tagNameCheck(w))&&(q.attributeNameCheck instanceof RegExp&&ae(q.attributeNameCheck,A)||q.attributeNameCheck instanceof Function&&q.attributeNameCheck(A,w))||A==="is"&&q.allowCustomizedBuiltInElements&&(q.tagNameCheck instanceof RegExp&&ae(q.tagNameCheck,M)||q.tagNameCheck instanceof Function&&q.tagNameCheck(M))))return!1}else if(!gi[A]){if(!ae(ue,Nt(M,V,""))){if(!((A==="src"||A==="xlink:href"||A==="href")&&w!=="script"&&Kf(M,"data:")===0&&oo[w])){if(!(yt&&!ae(Y,Nt(M,V,"")))){if(M)return!1}}}}}}}return!0},mo=function(w){return w!=="annotation-xml"&&Ni(w,de)},yo=function(w){Fe(b.beforeSanitizeAttributes,w,null);const{attributes:A}=w;if(!A||vi(w))return;const M={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:H,forceKeepAttr:void 0};let Q=A.length;for(;Q--;){const se=A[Q],{name:Z,namespaceURI:ge,value:Pe}=se,xt=ee(Z),mi=Pe;let ie=Z==="value"?mi:Hf(mi);if(M.attrName=xt,M.attrValue=ie,M.keepAttr=!0,M.forceKeepAttr=void 0,Fe(b.uponSanitizeAttribute,w,M),ie=M.attrValue,so&&(xt==="id"||xt==="name")&&(Ye(Z,w),ie=Dl+ie),gn&&ae(/((--!?|])>)|<\/(style|title|textarea)/i,ie)){Ye(Z,w);continue}if(xt==="attributename"&&Ni(ie,"href")){Ye(Z,w);continue}if(M.forceKeepAttr)continue;if(!M.keepAttr){Ye(Z,w);continue}if(!no&&ae(/\/>/i,ie)){Ye(Z,w);continue}bt&&Sn([T,U,B],wo=>{ie=Nt(ie,wo," ")});const bo=ee(w.nodeName);if(!vo(bo,xt,ie)){Ye(Z,w);continue}if(L&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!ge)switch(m.getAttributeType(bo,xt)){case"TrustedHTML":{ie=L.createHTML(ie);break}case"TrustedScriptURL":{ie=L.createScriptURL(ie);break}}if(ie!==mi)try{ge?w.setAttributeNS(ge,Z,ie):w.setAttribute(Z,ie),vi(w)?xe(w):da(t.removed)}catch{Ye(Z,w)}}Fe(b.afterSanitizeAttributes,w,null)},Kl=function P(w){let A=null;const M=fo(w);for(Fe(b.beforeSanitizeShadowDOM,w,null);A=M.nextNode();)Fe(b.uponSanitizeShadowNode,A,null),po(A),yo(A),A.content instanceof o&&P(A.content);Fe(b.afterSanitizeShadowDOM,w,null)};return t.sanitize=function(P){let w=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},A=null,M=null,Q=null,se=null;if(fi=!P,fi&&(P="<!-->"),typeof P!="string"&&!ho(P))if(typeof P.toString=="function"){if(P=P.toString(),typeof P!="string")throw Bt("dirty is not a string, aborting")}else throw Bt("toString is not a function");if(!t.isSupported)return P;if(li||pi(w),t.removed=[],typeof P=="string"&&(Mt=!1),Mt){if(P.nodeName){const Pe=ee(P.nodeName);if(!J[Pe]||ze[Pe])throw Bt("root node is forbidden and cannot be sanitized in-place")}}else if(P instanceof r)A=go("<!---->"),M=A.ownerDocument.importNode(P,!0),M.nodeType===zt.element&&M.nodeName==="BODY"||M.nodeName==="HTML"?A=M:A.appendChild(M);else{if(!wt&&!bt&&!Qe&&P.indexOf("<")===-1)return L&&hn?L.createHTML(P):P;if(A=go(P),!A)return wt?null:hn?k:""}A&&ci&&xe(A.firstChild);const Z=fo(Mt?P:A);for(;Q=Z.nextNode();)po(Q),yo(Q),Q.content instanceof o&&Kl(Q.content);if(Mt)return P;if(wt){if(fn)for(se=D.call(A.ownerDocument);A.firstChild;)se.appendChild(A.firstChild);else se=A;return(H.shadowroot||H.shadowrootmode)&&(se=Le.call(i,se,!0)),se}let ge=Qe?A.outerHTML:A.innerHTML;return Qe&&J["!doctype"]&&A.ownerDocument&&A.ownerDocument.doctype&&A.ownerDocument.doctype.name&&ae(gl,A.ownerDocument.doctype.name)&&(ge="<!DOCTYPE "+A.ownerDocument.doctype.name+`>
`+ge),bt&&Sn([T,U,B],Pe=>{ge=Nt(ge,Pe," ")}),L&&hn?L.createHTML(ge):ge},t.setConfig=function(){let P=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};pi(P),li=!0},t.clearConfig=function(){St=null,li=!1},t.isValidAttribute=function(P,w,A){St||pi({});const M=ee(P),Q=ee(w);return vo(M,Q,A)},t.addHook=function(P,w){typeof w=="function"&&Ot(b[P],w)},t.removeHook=function(P,w){if(w!==void 0){const A=zf(b[P],w);return A===-1?void 0:jf(b[P],A,1)[0]}return da(b[P])},t.removeHooks=function(P){b[P]=[]},t.removeAllHooks=function(){b=va()},t}var ds=fl();function Hs(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var pt=Hs();function hl(e){pt=e}var nt={exec:()=>null};function K(e,t=""){let n=typeof e=="string"?e:e.source,i={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(re.caret,"$1"),n=n.replace(s,a),i},getRegex:()=>new RegExp(n,t)};return i}var oh=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),re={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}>`)},ah=/^(?:[ \t]*(?:\n|$))+/,rh=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,lh=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,un=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ch=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,qs=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,pl=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,vl=K(pl).replace(/bull/g,qs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),dh=K(pl).replace(/bull/g,qs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Gs=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,uh=/^[^\n]+/,Ws=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,gh=K(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ws).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),fh=K(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,qs).getRegex(),oi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Vs=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,hh=K("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Vs).replace("tag",oi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ml=K(Gs).replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",oi).getRegex(),ph=K(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ml).getRegex(),Js={blockquote:ph,code:rh,def:gh,fences:lh,heading:ch,hr:un,html:hh,lheading:vl,list:fh,newline:ah,paragraph:ml,table:nt,text:uh},ma=K("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",oi).getRegex(),vh={...Js,lheading:dh,table:ma,paragraph:K(Gs).replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ma).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",oi).getRegex()},mh={...Js,html:K(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Vs).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:nt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:K(Gs).replace("hr",un).replace("heading",` *#{1,6} *[^
]`).replace("lheading",vl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},yh=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,bh=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,yl=/^( {2,}|\\)\n(?!\s*$)/,wh=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ai=/[\p{P}\p{S}]/u,Qs=/[\s\p{P}\p{S}]/u,bl=/[^\s\p{P}\p{S}]/u,$h=K(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Qs).getRegex(),wl=/(?!~)[\p{P}\p{S}]/u,kh=/(?!~)[\s\p{P}\p{S}]/u,Sh=/(?:[^\s\p{P}\p{S}]|~)/u,$l=/(?![*_])[\p{P}\p{S}]/u,xh=/(?![*_])[\s\p{P}\p{S}]/u,Ah=/(?:[^\s\p{P}\p{S}]|[*_])/u,_h=K(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",oh?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),kl=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ch=K(kl,"u").replace(/punct/g,ai).getRegex(),Th=K(kl,"u").replace(/punct/g,wl).getRegex(),Sl="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Eh=K(Sl,"gu").replace(/notPunctSpace/g,bl).replace(/punctSpace/g,Qs).replace(/punct/g,ai).getRegex(),Lh=K(Sl,"gu").replace(/notPunctSpace/g,Sh).replace(/punctSpace/g,kh).replace(/punct/g,wl).getRegex(),Rh=K("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,bl).replace(/punctSpace/g,Qs).replace(/punct/g,ai).getRegex(),Ih=K(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,$l).getRegex(),Mh="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",Fh=K(Mh,"gu").replace(/notPunctSpace/g,Ah).replace(/punctSpace/g,xh).replace(/punct/g,$l).getRegex(),Ph=K(/\\(punct)/,"gu").replace(/punct/g,ai).getRegex(),Dh=K(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Oh=K(Vs).replace("(?:-->|$)","-->").getRegex(),Nh=K("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Oh).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),zn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Bh=K(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",zn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),xl=K(/^!?\[(label)\]\[(ref)\]/).replace("label",zn).replace("ref",Ws).getRegex(),Al=K(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ws).getRegex(),Uh=K("reflink|nolink(?!\\()","g").replace("reflink",xl).replace("nolink",Al).getRegex(),ya=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ys={_backpedal:nt,anyPunctuation:Ph,autolink:Dh,blockSkip:_h,br:yl,code:bh,del:nt,delLDelim:nt,delRDelim:nt,emStrongLDelim:Ch,emStrongRDelimAst:Eh,emStrongRDelimUnd:Rh,escape:yh,link:Bh,nolink:Al,punctuation:$h,reflink:xl,reflinkSearch:Uh,tag:Nh,text:wh,url:nt},zh={...Ys,link:K(/^!?\[(label)\]\((.*?)\)/).replace("label",zn).getRegex(),reflink:K(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",zn).getRegex()},us={...Ys,emStrongRDelimAst:Lh,emStrongLDelim:Th,delLDelim:Ih,delRDelim:Fh,url:K(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ya).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:K(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ya).getRegex()},jh={...us,br:K(yl).replace("{2,}","*").getRegex(),text:K(us.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},An={normal:Js,gfm:vh,pedantic:mh},jt={normal:Ys,gfm:us,breaks:jh,pedantic:zh},Kh={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ba=e=>Kh[e];function Ce(e,t){if(t){if(re.escapeTest.test(e))return e.replace(re.escapeReplace,ba)}else if(re.escapeTestNoEncode.test(e))return e.replace(re.escapeReplaceNoEncode,ba);return e}function wa(e){try{e=encodeURI(e).replace(re.percentDecode,"%")}catch{return null}return e}function $a(e,t){var o;let n=e.replace(re.findPipe,(a,r,d)=>{let c=!1,u=r;for(;--u>=0&&d[u]==="\\";)c=!c;return c?"|":" |"}),i=n.split(re.splitPipe),s=0;if(i[0].trim()||i.shift(),i.length>0&&!((o=i.at(-1))!=null&&o.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(re.slashPipe,"|");return i}function Kt(e,t,n){let i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function Hh(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function qh(e,t=0){let n=t,i="";for(let s of e)if(s==="	"){let o=4-n%4;i+=" ".repeat(o),n+=o}else i+=s,n++;return i}function ka(e,t,n,i,s){let o=t.href,a=t.title||null,r=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;let d={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:r,tokens:i.inlineTokens(r)};return i.state.inLink=!1,d}function Gh(e,t,n){let i=e.match(n.other.indentCodeCompensation);if(i===null)return t;let s=i[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[r]=a;return r.length>=s.length?o.slice(s.length):o}).join(`
`)}var jn=class{constructor(e){j(this,"options");j(this,"rules");j(this,"lexer");this.options=e||pt}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Kt(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],i=Gh(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let i=Kt(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Kt(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Kt(t[0],`
`).split(`
`),i="",s="",o=[];for(;n.length>0;){let a=!1,r=[],d;for(d=0;d<n.length;d++)if(this.rules.other.blockquoteStart.test(n[d]))r.push(n[d]),a=!0;else if(!a)r.push(n[d]);else break;n=n.slice(d);let c=r.join(`
`),u=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,s=s?`${s}
${u}`:u;let g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,o,!0),this.lexer.state.top=g,n.length===0)break;let f=o.at(-1);if((f==null?void 0:f.type)==="code")break;if((f==null?void 0:f.type)==="blockquote"){let m=f,$=m.raw+`
`+n.join(`
`),S=this.blockquote($);o[o.length-1]=S,i=i.substring(0,i.length-m.raw.length)+S.raw,s=s.substring(0,s.length-m.text.length)+S.text;break}else if((f==null?void 0:f.type)==="list"){let m=f,$=m.raw+`
`+n.join(`
`),S=this.list($);o[o.length-1]=S,i=i.substring(0,i.length-f.raw.length)+S.raw,s=s.substring(0,s.length-m.raw.length)+S.raw,n=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:o,text:s}}}list(e){var n,i;let t=this.rules.block.list.exec(e);if(t){let s=t[1].trim(),o=s.length>1,a={type:"list",raw:"",ordered:o,start:o?+s.slice(0,-1):"",loose:!1,items:[]};s=o?`\\d{1,9}\\${s.slice(-1)}`:`\\${s}`,this.options.pedantic&&(s=o?s:"[*+-]");let r=this.rules.other.listItemRegex(s),d=!1;for(;e;){let u=!1,g="",f="";if(!(t=r.exec(e))||this.rules.block.hr.test(e))break;g=t[0],e=e.substring(g.length);let m=qh(t[2].split(`
`,1)[0],t[1].length),$=e.split(`
`,1)[0],S=!m.trim(),x=0;if(this.options.pedantic?(x=2,f=m.trimStart()):S?x=t[1].length+1:(x=m.search(this.rules.other.nonSpaceChar),x=x>4?1:x,f=m.slice(x),x+=t[1].length),S&&this.rules.other.blankLine.test($)&&(g+=$+`
`,e=e.substring($.length+1),u=!0),!u){let C=this.rules.other.nextBulletRegex(x),F=this.rules.other.hrRegex(x),R=this.rules.other.fencesBeginRegex(x),L=this.rules.other.headingBeginRegex(x),k=this.rules.other.htmlBeginRegex(x),E=this.rules.other.blockquoteBeginRegex(x);for(;e;){let O=e.split(`
`,1)[0],D;if($=O,this.options.pedantic?($=$.replace(this.rules.other.listReplaceNesting,"  "),D=$):D=$.replace(this.rules.other.tabCharGlobal,"    "),R.test($)||L.test($)||k.test($)||E.test($)||C.test($)||F.test($))break;if(D.search(this.rules.other.nonSpaceChar)>=x||!$.trim())f+=`
`+D.slice(x);else{if(S||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||R.test(m)||L.test(m)||F.test(m))break;f+=`
`+$}S=!$.trim(),g+=O+`
`,e=e.substring(O.length+1),m=D.slice(x)}}a.loose||(d?a.loose=!0:this.rules.other.doubleBlankLine.test(g)&&(d=!0)),a.items.push({type:"list_item",raw:g,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),a.raw+=g}let c=a.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;a.raw=a.raw.trimEnd();for(let u of a.items){if(this.lexer.state.top=!1,u.tokens=this.lexer.blockTokens(u.text,[]),u.task){if(u.text=u.text.replace(this.rules.other.listReplaceTask,""),((n=u.tokens[0])==null?void 0:n.type)==="text"||((i=u.tokens[0])==null?void 0:i.type)==="paragraph"){u.tokens[0].raw=u.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),u.tokens[0].text=u.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let g=this.rules.other.listTaskCheckbox.exec(u.raw);if(g){let f={type:"checkbox",raw:g[0]+" ",checked:g[0]!=="[ ]"};u.checked=f.checked,a.loose?u.tokens[0]&&["paragraph","text"].includes(u.tokens[0].type)&&"tokens"in u.tokens[0]&&u.tokens[0].tokens?(u.tokens[0].raw=f.raw+u.tokens[0].raw,u.tokens[0].text=f.raw+u.tokens[0].text,u.tokens[0].tokens.unshift(f)):u.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):u.tokens.unshift(f)}}if(!a.loose){let g=u.tokens.filter(m=>m.type==="space"),f=g.length>0&&g.some(m=>this.rules.other.anyLine.test(m.raw));a.loose=f}}if(a.loose)for(let u of a.items){u.loose=!0;for(let g of u.tokens)g.type==="text"&&(g.type="paragraph")}return a}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var a;let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=$a(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(a=t[3])!=null&&a.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(let r of i)this.rules.other.tableAlignRight.test(r)?o.align.push("right"):this.rules.other.tableAlignCenter.test(r)?o.align.push("center"):this.rules.other.tableAlignLeft.test(r)?o.align.push("left"):o.align.push(null);for(let r=0;r<n.length;r++)o.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:o.align[r]});for(let r of s)o.rows.push($a(r,o.header.length).map((d,c)=>({text:d,tokens:this.lexer.inline(d),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=Kt(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=Hh(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(i);o&&(i=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),ka(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return ka(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(i[1]||i[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...i[0]].length-1,o,a,r=s,d=0,c=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+s);(i=c.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(a=[...o].length,i[3]||i[4]){r+=a;continue}else if((i[5]||i[6])&&s%3&&!((s+a)%3)){d+=a;continue}if(r-=a,r>0)continue;a=Math.min(a,a+r+d);let u=[...i[0]][0].length,g=e.slice(0,s+i.index+u+a);if(Math.min(s,a)%2){let m=g.slice(1,-1);return{type:"em",raw:g,text:m,tokens:this.lexer.inlineTokens(m)}}let f=g.slice(2,-2);return{type:"strong",raw:g,text:f,tokens:this.lexer.inlineTokens(f)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e,t,n=""){let i=this.rules.inline.delLDelim.exec(e);if(i&&(!i[1]||!n||this.rules.inline.punctuation.exec(n))){let s=[...i[0]].length-1,o,a,r=s,d=this.rules.inline.delRDelim;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(i=d.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o||(a=[...o].length,a!==s))continue;if(i[3]||i[4]){r+=a;continue}if(r-=a,r>0)continue;a=Math.min(a,a+r);let c=[...i[0]][0].length,u=e.slice(0,s+i.index+c+a),g=u.slice(s,-s);return{type:"del",raw:u,text:g,tokens:this.lexer.inlineTokens(g)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let o;do o=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(o!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},$e=class gs{constructor(t){j(this,"tokens");j(this,"options");j(this,"state");j(this,"inlineQueue");j(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||pt,this.options.tokenizer=this.options.tokenizer||new jn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:re,block:An.normal,inline:jt.normal};this.options.pedantic?(n.block=An.pedantic,n.inline=jt.pedantic):this.options.gfm&&(n.block=An.gfm,this.options.breaks?n.inline=jt.breaks:n.inline=jt.gfm),this.tokenizer.rules=n}static get rules(){return{block:An,inline:jt}}static lex(t,n){return new gs(n).lex(t)}static lexInline(t,n){return new gs(n).inlineTokens(t)}lex(t){t=t.replace(re.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,o,a;for(this.options.pedantic&&(t=t.replace(re.tabCharGlobal,"    ").replace(re.spaceLine,""));t;){let r;if((o=(s=this.options.extensions)==null?void 0:s.block)!=null&&o.some(c=>(r=c.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);let c=n.at(-1);r.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);let c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=(c.raw.endsWith(`
`)?"":`
`)+r.raw,c.text+=`
`+r.text,this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);let c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=(c.raw.endsWith(`
`)?"":`
`)+r.raw,c.text+=`
`+r.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title},n.push(r));continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let d=t;if((a=this.options.extensions)!=null&&a.startBlock){let c=1/0,u=t.slice(1),g;this.options.extensions.startBlock.forEach(f=>{g=f.call({lexer:this},u),typeof g=="number"&&g>=0&&(c=Math.min(c,g))}),c<1/0&&c>=0&&(d=t.substring(0,c+1))}if(this.state.top&&(r=this.tokenizer.paragraph(d))){let c=n.at(-1);i&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=(c.raw.endsWith(`
`)?"":`
`)+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r),i=d.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);let c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=(c.raw.endsWith(`
`)?"":`
`)+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(t){let c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var d,c,u,g,f;let i=t,s=null;if(this.tokens.links){let m=Object.keys(this.tokens.links);if(m.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)m.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)o=s[2]?s[2].length:0,i=i.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);i=((c=(d=this.options.hooks)==null?void 0:d.emStrongMask)==null?void 0:c.call({lexer:this},i))??i;let a=!1,r="";for(;t;){a||(r=""),a=!1;let m;if((g=(u=this.options.extensions)==null?void 0:u.inline)!=null&&g.some(S=>(m=S.call({lexer:this},t,n))?(t=t.substring(m.raw.length),n.push(m),!0):!1))continue;if(m=this.tokenizer.escape(t)){t=t.substring(m.raw.length),n.push(m);continue}if(m=this.tokenizer.tag(t)){t=t.substring(m.raw.length),n.push(m);continue}if(m=this.tokenizer.link(t)){t=t.substring(m.raw.length),n.push(m);continue}if(m=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(m.raw.length);let S=n.at(-1);m.type==="text"&&(S==null?void 0:S.type)==="text"?(S.raw+=m.raw,S.text+=m.text):n.push(m);continue}if(m=this.tokenizer.emStrong(t,i,r)){t=t.substring(m.raw.length),n.push(m);continue}if(m=this.tokenizer.codespan(t)){t=t.substring(m.raw.length),n.push(m);continue}if(m=this.tokenizer.br(t)){t=t.substring(m.raw.length),n.push(m);continue}if(m=this.tokenizer.del(t,i,r)){t=t.substring(m.raw.length),n.push(m);continue}if(m=this.tokenizer.autolink(t)){t=t.substring(m.raw.length),n.push(m);continue}if(!this.state.inLink&&(m=this.tokenizer.url(t))){t=t.substring(m.raw.length),n.push(m);continue}let $=t;if((f=this.options.extensions)!=null&&f.startInline){let S=1/0,x=t.slice(1),C;this.options.extensions.startInline.forEach(F=>{C=F.call({lexer:this},x),typeof C=="number"&&C>=0&&(S=Math.min(S,C))}),S<1/0&&S>=0&&($=t.substring(0,S+1))}if(m=this.tokenizer.inlineText($)){t=t.substring(m.raw.length),m.raw.slice(-1)!=="_"&&(r=m.raw.slice(-1)),a=!0;let S=n.at(-1);(S==null?void 0:S.type)==="text"?(S.raw+=m.raw,S.text+=m.text):n.push(m);continue}if(t){let S="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(S);break}else throw new Error(S)}}return n}},Kn=class{constructor(e){j(this,"options");j(this,"parser");this.options=e||pt}space(e){return""}code({text:e,lang:t,escaped:n}){var o;let i=(o=(t||"").match(re.notSpaceStart))==null?void 0:o[0],s=e.replace(re.endingNewline,"")+`
`;return i?'<pre><code class="language-'+Ce(i)+'">'+(n?s:Ce(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Ce(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,i="";for(let a=0;a<e.items.length;a++){let r=e.items[a];i+=this.listitem(r)}let s=t?"ol":"ul",o=t&&n!==1?' start="'+n+'"':"";return"<"+s+o+`>
`+i+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let i="";for(let s=0;s<e.rows.length;s++){let o=e.rows[s];n="";for(let a=0;a<o.length;a++)n+=this.tablecell(o[a]);i+=this.tablerow({text:n})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+i+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Ce(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let i=this.parser.parseInline(n),s=wa(e);if(s===null)return i;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Ce(t)+'"'),o+=">"+i+"</a>",o}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));let s=wa(e);if(s===null)return Ce(n);e=s;let o=`<img src="${e}" alt="${Ce(n)}"`;return t&&(o+=` title="${Ce(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Ce(e.text)}},Xs=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},ke=class fs{constructor(t){j(this,"options");j(this,"renderer");j(this,"textRenderer");this.options=t||pt,this.options.renderer=this.options.renderer||new Kn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Xs}static parse(t,n){return new fs(n).parse(t)}static parseInline(t,n){return new fs(n).parseInline(t)}parse(t){var i,s;let n="";for(let o=0;o<t.length;o++){let a=t[o];if((s=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&s[a.type]){let d=a,c=this.options.extensions.renderers[d.type].call({parser:this},d);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(d.type)){n+=c||"";continue}}let r=a;switch(r.type){case"space":{n+=this.renderer.space(r);break}case"hr":{n+=this.renderer.hr(r);break}case"heading":{n+=this.renderer.heading(r);break}case"code":{n+=this.renderer.code(r);break}case"table":{n+=this.renderer.table(r);break}case"blockquote":{n+=this.renderer.blockquote(r);break}case"list":{n+=this.renderer.list(r);break}case"checkbox":{n+=this.renderer.checkbox(r);break}case"html":{n+=this.renderer.html(r);break}case"def":{n+=this.renderer.def(r);break}case"paragraph":{n+=this.renderer.paragraph(r);break}case"text":{n+=this.renderer.text(r);break}default:{let d='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(d),"";throw new Error(d)}}}return n}parseInline(t,n=this.renderer){var s,o;let i="";for(let a=0;a<t.length;a++){let r=t[a];if((o=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&o[r.type]){let c=this.options.extensions.renderers[r.type].call({parser:this},r);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){i+=c||"";continue}}let d=r;switch(d.type){case"escape":{i+=n.text(d);break}case"html":{i+=n.html(d);break}case"link":{i+=n.link(d);break}case"image":{i+=n.image(d);break}case"checkbox":{i+=n.checkbox(d);break}case"strong":{i+=n.strong(d);break}case"em":{i+=n.em(d);break}case"codespan":{i+=n.codespan(d);break}case"br":{i+=n.br(d);break}case"del":{i+=n.del(d);break}case"text":{i+=n.text(d);break}default:{let c='Token with "'+d.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},Cn,Ht=(Cn=class{constructor(e){j(this,"options");j(this,"block");this.options=e||pt}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?$e.lex:$e.lexInline}provideParser(){return this.block?ke.parse:ke.parseInline}},j(Cn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),j(Cn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Cn),Wh=class{constructor(...e){j(this,"defaults",Hs());j(this,"options",this.setOptions);j(this,"parse",this.parseMarkdown(!0));j(this,"parseInline",this.parseMarkdown(!1));j(this,"Parser",ke);j(this,"Renderer",Kn);j(this,"TextRenderer",Xs);j(this,"Lexer",$e);j(this,"Tokenizer",jn);j(this,"Hooks",Ht);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(let o of e)switch(n=n.concat(t.call(this,o)),o.type){case"table":{let a=o;for(let r of a.header)n=n.concat(this.walkTokens(r.tokens,t));for(let r of a.rows)for(let d of r)n=n.concat(this.walkTokens(d.tokens,t));break}case"list":{let a=o;n=n.concat(this.walkTokens(a.items,t));break}default:{let a=o;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[a.type]?this.defaults.extensions.childTokens[a.type].forEach(r=>{let d=a[r].flat(1/0);n=n.concat(this.walkTokens(d,t))}):a.tokens&&(n=n.concat(this.walkTokens(a.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let r=s.renderer.apply(this,a);return r===!1&&(r=o.apply(this,a)),r}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){let s=this.defaults.renderer||new Kn(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,r=n.renderer[a],d=s[a];s[a]=(...c)=>{let u=r.apply(s,c);return u===!1&&(u=d.apply(s,c)),u||""}}i.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new jn(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,r=n.tokenizer[a],d=s[a];s[a]=(...c)=>{let u=r.apply(s,c);return u===!1&&(u=d.apply(s,c)),u}}i.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new Ht;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,r=n.hooks[a],d=s[a];Ht.passThroughHooks.has(o)?s[a]=c=>{if(this.defaults.async&&Ht.passThroughHooksRespectAsync.has(o))return(async()=>{let g=await r.call(s,c);return d.call(s,g)})();let u=r.call(s,c);return d.call(s,u)}:s[a]=(...c)=>{if(this.defaults.async)return(async()=>{let g=await r.apply(s,c);return g===!1&&(g=await d.apply(s,c)),g})();let u=r.apply(s,c);return u===!1&&(u=d.apply(s,c)),u}}i.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;i.walkTokens=function(a){let r=[];return r.push(o.call(this,a)),s&&(r=r.concat(s.call(this,a))),r}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return $e.lex(e,t??this.defaults)}parser(e,t){return ke.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let i={...n},s={...this.defaults,...i},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&i.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,r=await(s.hooks?await s.hooks.provideLexer():e?$e.lex:$e.lexInline)(a,s),d=s.hooks?await s.hooks.processAllTokens(r):r;s.walkTokens&&await Promise.all(this.walkTokens(d,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():e?ke.parse:ke.parseInline)(d,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?$e.lex:$e.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let r=(s.hooks?s.hooks.provideParser():e?ke.parse:ke.parseInline)(a,s);return s.hooks&&(r=s.hooks.postprocess(r)),r}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let i="<p>An error occurred:</p><pre>"+Ce(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},gt=new Wh;function W(e,t){return gt.parse(e,t)}W.options=W.setOptions=function(e){return gt.setOptions(e),W.defaults=gt.defaults,hl(W.defaults),W};W.getDefaults=Hs;W.defaults=pt;W.use=function(...e){return gt.use(...e),W.defaults=gt.defaults,hl(W.defaults),W};W.walkTokens=function(e,t){return gt.walkTokens(e,t)};W.parseInline=gt.parseInline;W.Parser=ke;W.parser=ke.parse;W.Renderer=Kn;W.TextRenderer=Xs;W.Lexer=$e;W.lexer=$e.lex;W.Tokenizer=jn;W.Hooks=Ht;W.parse=W;W.options;W.setOptions;W.use;W.walkTokens;W.parseInline;ke.parse;$e.lex;W.setOptions({gfm:!0,breaks:!0});const Vh=["a","b","blockquote","br","code","del","em","h1","h2","h3","h4","hr","i","li","ol","p","pre","strong","table","tbody","td","th","thead","tr","ul","img"],Jh=["class","href","rel","target","title","start","src","alt"],Sa={ALLOWED_TAGS:Vh,ALLOWED_ATTR:Jh,ADD_DATA_URI_TAGS:["img"]};let xa=!1;const Qh=14e4,Yh=4e4,Xh=200,Ki=5e4,st=new Map;function Zh(e){const t=st.get(e);return t===void 0?null:(st.delete(e),st.set(e,t),t)}function Aa(e,t){if(st.set(e,t),st.size<=Xh)return;const n=st.keys().next().value;n&&st.delete(n)}function ep(){xa||(xa=!0,ds.addHook("afterSanitizeAttributes",e=>{!(e instanceof HTMLAnchorElement)||!e.getAttribute("href")||(e.setAttribute("rel","noreferrer noopener"),e.setAttribute("target","_blank"))}))}function hs(e){const t=e.trim();if(!t)return"";if(ep(),t.length<=Ki){const a=Zh(t);if(a!==null)return a}const n=gr(t,Qh),i=n.truncated?`

… truncated (${n.total} chars, showing first ${n.text.length}).`:"";if(n.text.length>Yh){const r=`<pre class="code-block">${Cl(`${n.text}${i}`)}</pre>`,d=ds.sanitize(r,Sa);return t.length<=Ki&&Aa(t,d),d}const s=W.parse(`${n.text}${i}`,{renderer:_l}),o=ds.sanitize(s,Sa);return t.length<=Ki&&Aa(t,o),o}const _l=new W.Renderer;_l.html=({text:e})=>Cl(e);function Cl(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const tp=new RegExp("\\p{Script=Hebrew}|\\p{Script=Arabic}|\\p{Script=Syriac}|\\p{Script=Thaana}|\\p{Script=Nko}|\\p{Script=Samaritan}|\\p{Script=Mandaic}|\\p{Script=Adlam}|\\p{Script=Phoenician}|\\p{Script=Lydian}","u");function Tl(e,t=/[\s\p{P}\p{S}]/u){if(!e)return"ltr";for(const n of e)if(!t.test(n))return tp.test(n)?"rtl":"ltr";return"ltr"}const np=1500,ip=2e3,El="Copy as markdown",sp="Copied",op="Copy failed";async function ap(e){if(!e)return!1;try{return await navigator.clipboard.writeText(e),!0}catch{return!1}}function _n(e,t){e.title=t,e.setAttribute("aria-label",t)}function rp(e){const t=e.label??El;return l`
    <button
      class="chat-copy-btn"
      type="button"
      title=${t}
      aria-label=${t}
      @click=${async n=>{const i=n.currentTarget;if(!i||i.dataset.copying==="1")return;i.dataset.copying="1",i.setAttribute("aria-busy","true"),i.disabled=!0;const s=await ap(e.text());if(i.isConnected){if(delete i.dataset.copying,i.removeAttribute("aria-busy"),i.disabled=!1,!s){i.dataset.error="1",_n(i,op),window.setTimeout(()=>{i.isConnected&&(delete i.dataset.error,_n(i,t))},ip);return}i.dataset.copied="1",_n(i,sp),window.setTimeout(()=>{i.isConnected&&(delete i.dataset.copied,_n(i,t))},np)}}}
    >
      <span class="chat-copy-btn__icon" aria-hidden="true">
        <span class="chat-copy-btn__icon-copy">${ne.copy}</span>
        <span class="chat-copy-btn__icon-check">${ne.check}</span>
      </span>
    </button>
  `}function lp(e){return rp({text:()=>e,label:El})}function Ll(e){const t=e;let n=typeof t.role=="string"?t.role:"unknown";const i=typeof t.toolCallId=="string"||typeof t.tool_call_id=="string",s=t.content,o=Array.isArray(s)?s:null,a=Array.isArray(o)&&o.some(g=>{const f=g,m=(typeof f.type=="string"?f.type:"").toLowerCase();return m==="toolresult"||m==="tool_result"}),r=typeof t.toolName=="string"||typeof t.tool_name=="string";(i||a||r)&&(n="toolResult");let d=[];typeof t.content=="string"?d=[{type:"text",text:t.content}]:Array.isArray(t.content)?d=t.content.map(g=>({type:g.type||"text",text:g.text,name:g.name,args:g.args||g.arguments})):typeof t.text=="string"&&(d=[{type:"text",text:t.text}]);const c=typeof t.timestamp=="number"?t.timestamp:Date.now(),u=typeof t.id=="string"?t.id:void 0;return{role:n,content:d,timestamp:c,id:u}}function Zs(e){const t=e.toLowerCase();return e==="user"||e==="User"?e:e==="assistant"?"assistant":e==="system"?"system":t==="toolresult"||t==="tool_result"||t==="tool"||t==="function"?"tool":e}function Rl(e){const t=e,n=typeof t.role=="string"?t.role.toLowerCase():"";return n==="toolresult"||n==="tool_result"}function cp(e){return(e??"").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())||"Tool"}function dp(e){const t=(e??"").trim();return t?t.replace(/\s+/g,"_").toLowerCase():""}function up(e){return(e??"").trim().toLowerCase()||"use"}const gp={icon:"puzzle",detailKeys:["command","path","url","targetUrl","targetId","ref","element","node","nodeId","id","requestId","to","channelId","guildId","userId","name","query","pattern","messageId"]},fp={bash:{icon:"wrench",title:"Bash",detailKeys:["command"]},process:{icon:"wrench",title:"Process",detailKeys:["sessionId"]},read:{icon:"fileText",title:"Read",detailKeys:["path"]},write:{icon:"edit",title:"Write",detailKeys:["path"]},edit:{icon:"penLine",title:"Edit",detailKeys:["path"]},attach:{icon:"paperclip",title:"Attach",detailKeys:["path","url","fileName"]},browser:{icon:"globe",title:"Browser",actions:{status:{label:"status"},start:{label:"start"},stop:{label:"stop"},tabs:{label:"tabs"},open:{label:"open",detailKeys:["targetUrl"]},focus:{label:"focus",detailKeys:["targetId"]},close:{label:"close",detailKeys:["targetId"]},snapshot:{label:"snapshot",detailKeys:["targetUrl","targetId","ref","element","format"]},screenshot:{label:"screenshot",detailKeys:["targetUrl","targetId","ref","element"]},navigate:{label:"navigate",detailKeys:["targetUrl","targetId"]},console:{label:"console",detailKeys:["level","targetId"]},pdf:{label:"pdf",detailKeys:["targetId"]},upload:{label:"upload",detailKeys:["paths","ref","inputRef","element","targetId"]},dialog:{label:"dialog",detailKeys:["accept","promptText","targetId"]},act:{label:"act",detailKeys:["request.kind","request.ref","request.selector","request.text","request.value"]}}},canvas:{icon:"image",title:"Canvas",actions:{present:{label:"present",detailKeys:["target","node","nodeId"]},hide:{label:"hide",detailKeys:["node","nodeId"]},navigate:{label:"navigate",detailKeys:["url","node","nodeId"]},eval:{label:"eval",detailKeys:["javaScript","node","nodeId"]},snapshot:{label:"snapshot",detailKeys:["format","node","nodeId"]},a2ui_push:{label:"A2UI push",detailKeys:["jsonlPath","node","nodeId"]},a2ui_reset:{label:"A2UI reset",detailKeys:["node","nodeId"]}}},nodes:{icon:"smartphone",title:"Nodes",actions:{status:{label:"status"},describe:{label:"describe",detailKeys:["node","nodeId"]},pending:{label:"pending"},approve:{label:"approve",detailKeys:["requestId"]},reject:{label:"reject",detailKeys:["requestId"]},notify:{label:"notify",detailKeys:["node","nodeId","title","body"]},camera_snap:{label:"camera snap",detailKeys:["node","nodeId","facing","deviceId"]},camera_list:{label:"camera list",detailKeys:["node","nodeId"]},camera_clip:{label:"camera clip",detailKeys:["node","nodeId","facing","duration","durationMs"]},screen_record:{label:"screen record",detailKeys:["node","nodeId","duration","durationMs","fps","screenIndex"]}}},cron:{icon:"loader",title:"Cron",actions:{status:{label:"status"},list:{label:"list"},add:{label:"add",detailKeys:["job.name","job.id","job.schedule","job.cron"]},update:{label:"update",detailKeys:["id"]},remove:{label:"remove",detailKeys:["id"]},run:{label:"run",detailKeys:["id"]},runs:{label:"runs",detailKeys:["id"]},wake:{label:"wake",detailKeys:["text","mode"]}}},gateway:{icon:"plug",title:"Gateway",actions:{restart:{label:"restart",detailKeys:["reason","delayMs"]},"config.get":{label:"config get"},"config.schema":{label:"config schema"},"config.apply":{label:"config apply",detailKeys:["restartDelayMs"]},"update.run":{label:"update run",detailKeys:["restartDelayMs"]}}},whatsapp_login:{icon:"circle",title:"WhatsApp Login",actions:{start:{label:"start"},wait:{label:"wait"}}},discord:{icon:"messageSquare",title:"Discord",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sticker:{label:"sticker",detailKeys:["to","stickerIds"]},poll:{label:"poll",detailKeys:["question","to"]},permissions:{label:"permissions",detailKeys:["channelId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},threadCreate:{label:"thread create",detailKeys:["channelId","name"]},threadList:{label:"thread list",detailKeys:["guildId","channelId"]},threadReply:{label:"thread reply",detailKeys:["channelId","content"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},searchMessages:{label:"search",detailKeys:["guildId","content"]},memberInfo:{label:"member",detailKeys:["guildId","userId"]},roleInfo:{label:"roles",detailKeys:["guildId"]},emojiList:{label:"emoji list",detailKeys:["guildId"]},roleAdd:{label:"role add",detailKeys:["guildId","userId","roleId"]},roleRemove:{label:"role remove",detailKeys:["guildId","userId","roleId"]},channelInfo:{label:"channel",detailKeys:["channelId"]},channelList:{label:"channels",detailKeys:["guildId"]},voiceStatus:{label:"voice",detailKeys:["guildId","userId"]},eventList:{label:"events",detailKeys:["guildId"]},eventCreate:{label:"event create",detailKeys:["guildId","name"]},timeout:{label:"timeout",detailKeys:["guildId","userId"]},kick:{label:"kick",detailKeys:["guildId","userId"]},ban:{label:"ban",detailKeys:["guildId","userId"]}}},slack:{icon:"messageSquare",title:"Slack",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},memberInfo:{label:"member",detailKeys:["userId"]},emojiList:{label:"emoji list"}}}},hp={fallback:gp,tools:fp},Il=hp,_a=Il.fallback??{icon:"puzzle"},pp=Il.tools??{};function vp(e){if(!e)return e;const t=[{re:/^\/Users\/[^/]+(\/|$)/,replacement:"~$1"},{re:/^\/home\/[^/]+(\/|$)/,replacement:"~$1"},{re:/^C:\\Users\\[^\\]+(\\|$)/i,replacement:"~$1"}];for(const n of t)if(n.re.test(e))return e.replace(n.re,n.replacement);return e}function mp(e){const t=dp(e.name),n=t.toLowerCase(),i=pp[n],s=(i==null?void 0:i.icon)??_a.icon??"puzzle",o=(i==null?void 0:i.title)??cp(t),a=(i==null?void 0:i.label)??o,r=e.args&&typeof e.args=="object"?e.args.action:void 0,d=typeof r=="string"?r.trim():void 0,c=n==="web_search"?"search":n==="web_fetch"?"fetch":n.replace(/_/g," ").replace(/\./g," "),u=up(d??c);let g;n==="exec"&&(g=void 0),!g&&n==="read"&&(g=void 0),!g&&(n==="write"||n==="edit"||n==="attach")&&(g=void 0),!g&&n==="web_search"&&(g=void 0),!g&&n==="web_fetch"&&(g=void 0);const f=(i==null?void 0:i.detailKeys)??_a.detailKeys??[];return!g&&f.length>0&&(g=void 0),!g&&e.meta&&(g=e.meta),g&&(g=vp(g)),{name:t,icon:s,title:o,label:a,verb:u,detail:g}}function yp(e){if(e.detail){if(e.detail.includes(" · ")){const t=e.detail.split(" · ").map(n=>n.trim()).filter(n=>n.length>0).join(", ");return t?`with ${t}`:void 0}return e.detail}}const bp=80,wp=2,Ca=100;function $p(e){const t=e.trim();if(t.startsWith("{")||t.startsWith("["))try{const n=JSON.parse(t);return"```json\n"+JSON.stringify(n,null,2)+"\n```"}catch{}return e}function kp(e){const t=e.split(`
`),n=t.slice(0,wp),i=n.join(`
`);return i.length>Ca?i.slice(0,Ca)+"…":n.length<t.length?i+"…":i}function Sp(e){const t=e,n=xp(t.content),i=[];for(const s of n){const o=(typeof s.type=="string"?s.type:"").toLowerCase();(["toolcall","tool_call","tooluse","tool_use"].includes(o)||typeof s.name=="string"&&s.arguments!=null)&&i.push({kind:"call",name:s.name??"tool",args:Ap(s.arguments??s.args)})}for(const s of n){const o=(typeof s.type=="string"?s.type:"").toLowerCase();if(o!=="toolresult"&&o!=="tool_result")continue;const a=_p(s),r=typeof s.name=="string"?s.name:"tool";i.push({kind:"result",name:r,text:a})}if(Rl(e)&&!i.some(s=>s.kind==="result")){const s=typeof t.toolName=="string"&&t.toolName||typeof t.tool_name=="string"&&t.tool_name||"tool",o=zr(e)??void 0;i.push({kind:"result",name:s,text:o})}return i}function Ta(e,t){var g,f;const n=mp({name:e.name,args:e.args}),i=yp(n),s=!!((g=e.text)!=null&&g.trim()),o=!!t,a=o?()=>{if(s){t($p(e.text));return}const m=`## ${n.label}

${i?`**Command:** \`${i}\`

`:""}*No output — tool completed successfully.*`;t(m)}:void 0,r=s&&(((f=e.text)==null?void 0:f.length)??0)<=bp,d=s&&!r,c=s&&r,u=!s;return l`
    <div
      class="chat-tool-card ${o?"chat-tool-card--clickable":""}"
      @click=${a}
      role=${o?"button":y}
      tabindex=${o?"0":y}
      @keydown=${o?m=>{m.key!=="Enter"&&m.key!==" "||(m.preventDefault(),a==null||a())}:y}
    >
      <div class="chat-tool-card__header">
        <div class="chat-tool-card__title">
          <span class="chat-tool-card__icon">${ne[n.icon]}</span>
          <span>${n.label}</span>
        </div>
        ${o?l`<span class="chat-tool-card__action">${s?"View":""} ${ne.check}</span>`:y}
        ${u&&!o?l`<span class="chat-tool-card__status">${ne.check}</span>`:y}
      </div>
      ${i?l`<div class="chat-tool-card__detail">${i}</div>`:y}
      ${u?l`
              <div class="chat-tool-card__status-text muted">Completed</div>
            `:y}
      ${d?l`<div class="chat-tool-card__preview mono">${kp(e.text)}</div>`:y}
      ${c?l`<div class="chat-tool-card__inline mono">${e.text}</div>`:y}
    </div>
  `}function xp(e){return Array.isArray(e)?e.filter(Boolean):[]}function Ap(e){if(typeof e!="string")return e;const t=e.trim();if(!t||!t.startsWith("{")&&!t.startsWith("["))return e;try{return JSON.parse(t)}catch{return e}}function _p(e){if(typeof e.text=="string")return e.text;if(typeof e.content=="string")return e.content}function Cp(e){const n=e.content,i=[];if(Array.isArray(n))for(const s of n){if(typeof s!="object"||s===null)continue;const o=s;if(o.type==="image"){const a=o.source;if((a==null?void 0:a.type)==="base64"&&typeof a.data=="string"){const r=a.data,d=a.media_type||"image/png",c=r.startsWith("data:")?r:`data:${d};base64,${r}`;i.push({url:c})}else typeof o.url=="string"&&i.push({url:o.url})}else if(o.type==="image_url"){const a=o.image_url;typeof(a==null?void 0:a.url)=="string"&&i.push({url:a.url})}}return i}function Tp(e){return l`
    <div class="chat-group assistant">
      ${eo("assistant",e)}
      <div class="chat-group-messages">
        <div class="chat-bubble chat-reading-indicator" aria-hidden="true">
          <span class="chat-reading-indicator__dots">
            <span></span><span></span><span></span>
          </span>
        </div>
      </div>
    </div>
  `}function Ep(e,t,n,i){const s=new Date(t).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}),o=(i==null?void 0:i.name)??"Assistant";return l`
    <div class="chat-group assistant">
      ${eo("assistant",i)}
      <div class="chat-group-messages">
        ${Ml({role:"assistant",content:[{type:"text",text:e}],timestamp:t},{isStreaming:!0,showReasoning:!1},n)}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${o}</span>
          <span class="chat-group-timestamp">${s}</span>
        </div>
      </div>
    </div>
  `}function Lp(e,t){const n=Zs(e.role),i=t.assistantName??"Assistant",s=n==="user"?"You":n==="assistant"?i:n,o=n==="user"?"user":n==="assistant"?"assistant":"other",a=new Date(e.timestamp).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return l`
    <div class="chat-group ${o}">
      ${eo(e.role,{name:i,avatar:t.assistantAvatar??null})}
      <div class="chat-group-messages">
        ${e.messages.map((r,d)=>Ml(r.message,{isStreaming:e.isStreaming&&d===e.messages.length-1,showReasoning:t.showReasoning},t.onOpenSidebar))}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${s}</span>
          <span class="chat-group-timestamp">${a}</span>
        </div>
      </div>
    </div>
  `}function eo(e,t){var r,d;const n=Zs(e),i=((r=t==null?void 0:t.name)==null?void 0:r.trim())||"Assistant",s=((d=t==null?void 0:t.avatar)==null?void 0:d.trim())||"",o=n==="user"?"U":n==="assistant"?i.charAt(0).toUpperCase()||"A":n==="tool"?"⚙":"?",a=n==="user"?"user":n==="assistant"?"assistant":n==="tool"?"tool":"other";return s&&n==="assistant"?Rp(s)?l`<img
        class="chat-avatar ${a}"
        src="${s}"
        alt="${i}"
      />`:l`<div class="chat-avatar ${a}">${s}</div>`:l`<div class="chat-avatar ${a}">${o}</div>`}function Rp(e){return/^https?:\/\//i.test(e)||/^data:image\//i.test(e)||e.startsWith("/")}function Ip(e){return e.length===0?y:l`
    <div class="chat-message-images">
      ${e.map(t=>l`
          <img
            src=${t.url}
            alt=${t.alt??"Attached image"}
            class="chat-message-image"
            @click=${()=>window.open(t.url,"_blank")}
          />
        `)}
    </div>
  `}function Ml(e,t,n){const i=e,s=typeof i.role=="string"?i.role:"unknown",o=Rl(e)||s.toLowerCase()==="toolresult"||s.toLowerCase()==="tool_result"||typeof i.toolCallId=="string"||typeof i.tool_call_id=="string",a=Sp(e),r=a.length>0,d=Cp(e),c=d.length>0,u=zr(e),g=t.showReasoning&&s==="assistant"?Nu(e):null,f=u!=null&&u.trim()?u:null,m=g?Uu(g):null,$=f,S=s==="assistant"&&!!($!=null&&$.trim()),x=["chat-bubble",S?"has-copy":"",t.isStreaming?"streaming":"","fade-in"].filter(Boolean).join(" ");return!$&&r&&o?l`${a.map(C=>Ta(C,n))}`:!$&&!r&&!c?y:l`
    <div class="${x}">
      ${S?lp($):y}
      ${Ip(d)}
      ${m?l`<div class="chat-thinking">${as(hs(m))}</div>`:y}
      ${$?l`<div class="chat-text" dir="${Tl($)}">${as(hs($))}</div>`:y}
      ${a.map(C=>Ta(C,n))}
    </div>
  `}function Mp(e){return l`
    <div class="sidebar-panel">
      <div class="sidebar-header">
        <div class="sidebar-title">Tool Output</div>
        <button @click=${e.onClose} class="btn" title="Close sidebar">
          ${ne.x}
        </button>
      </div>
      <div class="sidebar-content">
        ${e.error?l`
              <div class="callout danger">${e.error}</div>
              <button @click=${e.onViewRawText} class="btn" style="margin-top: 12px;">
                View Raw Text
              </button>
            `:e.content?l`<div class="sidebar-markdown">${as(hs(e.content))}</div>`:l`
                  <div class="muted">No content available</div>
                `}
      </div>
    </div>
  `}var Fp=Object.defineProperty,Pp=Object.getOwnPropertyDescriptor,ri=(e,t,n,i)=>{for(var s=i>1?void 0:i?Pp(t,n):t,o=e.length-1,a;o>=0;o--)(a=e[o])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&Fp(t,n,s),s};let Lt=class extends Ct{constructor(){super(...arguments),this.splitRatio=.6,this.minRatio=.4,this.maxRatio=.7,this.isDragging=!1,this.startX=0,this.startRatio=0,this.handleMouseDown=e=>{this.isDragging=!0,this.startX=e.clientX,this.startRatio=this.splitRatio,this.classList.add("dragging"),document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),e.preventDefault()},this.handleMouseMove=e=>{if(!this.isDragging)return;const t=this.parentElement;if(!t)return;const n=t.getBoundingClientRect().width,s=(e.clientX-this.startX)/n;let o=this.startRatio+s;o=Math.max(this.minRatio,Math.min(this.maxRatio,o)),this.dispatchEvent(new CustomEvent("resize",{detail:{splitRatio:o},bubbles:!0,composed:!0}))},this.handleMouseUp=()=>{this.isDragging=!1,this.classList.remove("dragging"),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}}render(){return y}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}};Lt.styles=Wl`
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
  `;ri([Gn({type:Number})],Lt.prototype,"splitRatio",2);ri([Gn({type:Number})],Lt.prototype,"minRatio",2);ri([Gn({type:Number})],Lt.prototype,"maxRatio",2);Lt=ri([Xa("resizable-divider")],Lt);const Dp=5e3,Op=/\.(xlsx|xls|xlsm|pdf)$/i;function Np(e){for(let t=0;t<e.length;t++)if(Op.test(e[t].name))return e[t];return null}function Ea(e){e.style.height="auto",e.style.height=`${e.scrollHeight}px`}function Bp(e){return e?e.active?l`
      <div class="compaction-indicator compaction-indicator--active" role="status" aria-live="polite">
        ${ne.loader} Compacting context...
      </div>
    `:e.completedAt&&Date.now()-e.completedAt<Dp?l`
        <div class="compaction-indicator compaction-indicator--complete" role="status" aria-live="polite">
          ${ne.check} Context compacted
        </div>
      `:y:y}function Up(){return`att-${Date.now()}-${Math.random().toString(36).slice(2,9)}`}function zp(e,t){var s;const n=(s=e.clipboardData)==null?void 0:s.items;if(!n||!t.onAttachmentsChange)return;const i=[];for(let o=0;o<n.length;o++){const a=n[o];a.type.startsWith("image/")&&i.push(a)}if(i.length!==0){e.preventDefault();for(const o of i){const a=o.getAsFile();if(!a)continue;const r=new FileReader;r.addEventListener("load",()=>{var g;const d=r.result,c={id:Up(),dataUrl:d,mimeType:a.type},u=t.attachments??[];(g=t.onAttachmentsChange)==null||g.call(t,[...u,c])}),r.readAsDataURL(a)}}}function jp(e){const t=e.attachments??[];return t.length===0?y:l`
    <div class="chat-attachments">
      ${t.map(n=>l`
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
              ${ne.x}
            </button>
          </div>
        `)}
    </div>
  `}function Kp(e){const t=e.uploadedFile,n=e.onFileSelect,i=e.onClearUploadedFile;return t!=null&&t.file_name?l`
      <div class="chat-uploaded-file">
        <span class="chat-uploaded-file__name" title=${t.file_path}>${t.file_name}</span>
        <button
          type="button"
          class="btn chat-uploaded-file__clear"
          aria-label="Remove uploaded file"
          @click=${i}
        >
          ${ne.x}
        </button>
      </div>
    `:!n||!e.connected?y:l`
    <div class="chat-uploaded-file-row">
      <input
        type="file"
        accept=".xlsx,.xls,.xlsm,.pdf"
        aria-label="Upload Excel or PDF"
        class="chat-uploaded-file-input"
        @change=${async s=>{var r;const o=s.target,a=(r=o.files)==null?void 0:r[0];a&&(await n(a),o.value="")}}
      />
      <button
        type="button"
        class="btn chat-upload-file-btn"
        @click=${s=>{var o,a;return(a=(o=s.currentTarget.parentElement)==null?void 0:o.querySelector("input[type=file]"))==null?void 0:a.click()}}
      >
        上传 Excel/PDF
      </button>
    </div>
  `}function Hp(e){var C,F,R,L;const t=e.connected,n=e.sending||e.stream!==null,i=!!(e.canAbort&&e.onAbort),s=(F=(C=e.sessions)==null?void 0:C.sessions)==null?void 0:F.find(k=>k.key===e.sessionKey),o=(s==null?void 0:s.reasoningLevel)??"off",a=e.showThinking&&o!=="off",r={name:e.assistantName,avatar:e.assistantAvatar??e.assistantAvatarUrl??null},d=(((R=e.attachments)==null?void 0:R.length)??0)>0;(L=e.uploadedFile)!=null&&L.file_name;const c=e.connected?d?"Add a message or paste more images...":"Message (↩ to send, Shift+↩ for line breaks；可粘贴图片，或上传/拖拽 Excel/PDF)":"Connect to the gateway to start chatting…",u=e.splitRatio??.6,g=!!(e.sidebarOpen&&e.onCloseSidebar),f=l`
    <div
      class="chat-thread"
      role="log"
      aria-live="polite"
      @scroll=${e.onChatScroll}
    >
      ${e.loading?l`
              <div class="muted">Loading chat…</div>
            `:y}
      ${el(Gp(e),k=>k.key,k=>k.kind==="divider"?l`
              <div class="chat-divider" role="separator" data-ts=${String(k.timestamp)}>
                <span class="chat-divider__line"></span>
                <span class="chat-divider__label">${k.label}</span>
                <span class="chat-divider__line"></span>
              </div>
            `:k.kind==="reading-indicator"?Tp(r):k.kind==="stream"?Ep(k.text,k.startedAt,e.onOpenSidebar,r):k.kind==="group"?Lp(k,{onOpenSidebar:e.onOpenSidebar,showReasoning:a,assistantName:e.assistantName,assistantAvatar:r.avatar}):y)}
    </div>
  `,m=k=>{var E;k.preventDefault(),k.stopPropagation(),k.dataTransfer&&(k.dataTransfer.dropEffect="copy"),(E=e.onComposeDragOver)==null||E.call(e)},$=k=>{var E;k.preventDefault(),k.stopPropagation(),k.dataTransfer&&(k.dataTransfer.dropEffect="copy"),(E=e.onComposeDragOver)==null||E.call(e)},S=k=>{var D;const E=k.currentTarget,O=k.relatedTarget;O!=null&&(E.contains(O)||(D=e.onComposeDragLeave)==null||D.call(e))},x=k=>{var O,D,N;k.preventDefault(),k.stopPropagation(),(O=e.onComposeDragLeave)==null||O.call(e);const E=(N=(D=k.dataTransfer)==null?void 0:D.files)!=null&&N.length?Np(k.dataTransfer.files):null;E&&e.onComposeDrop&&e.onComposeDrop(E)};return l`
    <section
      class="card chat ${e.composeDragOver?"chat--drag-over":""}"
      @dragenter=${m}
      @dragover=${$}
      @dragleave=${S}
      @drop=${x}
    >
      ${e.disabledReason?l`<div class="callout">${e.disabledReason}</div>`:y}

      ${e.error?l`<div class="callout danger">${e.error}</div>`:y}

      ${e.focusMode?l`
            <button
              class="chat-focus-exit"
              type="button"
              @click=${e.onToggleFocusMode}
              aria-label="Exit focus mode"
              title="Exit focus mode"
            >
              ${ne.x}
            </button>
          `:y}

      <div
        class="chat-split-container ${g?"chat-split-container--open":""}"
      >
        <div
          class="chat-main"
          style="flex: ${g?`0 0 ${u*100}%`:"1 1 100%"}"
        >
          ${f}
        </div>

        ${g?l`
              <resizable-divider
                .splitRatio=${u}
                @resize=${k=>{var E;return(E=e.onSplitRatioChange)==null?void 0:E.call(e,k.detail.splitRatio)}}
              ></resizable-divider>
              <div class="chat-sidebar">
                ${Mp({content:e.sidebarContent??null,error:e.sidebarError??null,onClose:e.onCloseSidebar,onViewRawText:()=>{!e.sidebarContent||!e.onOpenSidebar||e.onOpenSidebar(`\`\`\`
${e.sidebarContent}
\`\`\``)}})}
              </div>
            `:y}
      </div>

      ${e.queue.length?l`
            <div class="chat-queue" role="status" aria-live="polite">
              <div class="chat-queue__title">Queued (${e.queue.length})</div>
              <div class="chat-queue__list">
                ${e.queue.map(k=>{var E;return l`
                    <div class="chat-queue__item">
                      <div class="chat-queue__text">
                        ${k.text||((E=k.attachments)!=null&&E.length?`Image (${k.attachments.length})`:"")}
                      </div>
                      <button
                        class="btn chat-queue__remove"
                        type="button"
                        aria-label="Remove queued message"
                        @click=${()=>e.onQueueRemove(k.id)}
                      >
                        ${ne.x}
                      </button>
                    </div>
                  `})}
              </div>
            </div>
          `:y}

      ${Bp(e.compactionStatus)}

      ${e.showNewMessages?l`
            <button
              class="btn chat-new-messages"
              type="button"
              @click=${e.onScrollToBottom}
            >
              New messages ${ne.arrowDown}
            </button>
          `:y}

      <div class="chat-compose ${e.composeDragOver?"chat-compose--drag-over":""}">
        ${e.composeDragOver?l`<div class="chat-compose__drop-hint">松开以上传 Excel/PDF</div>`:y}
        ${jp(e)}
        ${Kp(e)}
        <div class="chat-compose__row">
          <label class="field chat-compose__field">
            <span>Message</span>
            <textarea
              ${Of(k=>k&&Ea(k))}
              .value=${e.draft}
              dir=${Tl(e.draft)}
              ?disabled=${!e.connected}
              @keydown=${k=>{k.key==="Enter"&&(k.isComposing||k.keyCode===229||k.shiftKey||e.connected&&(k.preventDefault(),t&&e.onSend()))}}
              @input=${k=>{const E=k.target;Ea(E),e.onDraftChange(E.value)}}
              @paste=${k=>zp(k,e)}
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
  `}const La=200;function qp(e){const t=[];let n=null;for(const i of e){if(i.kind!=="message"){n&&(t.push(n),n=null),t.push(i);continue}const s=Ll(i.message),o=Zs(s.role),a=s.timestamp||Date.now();!n||n.role!==o?(n&&t.push(n),n={kind:"group",key:`group:${o}:${i.key}`,role:o,messages:[{message:i.message,key:i.key}],timestamp:a,isStreaming:!1}):n.messages.push({message:i.message,key:i.key})}return n&&t.push(n),t}function Gp(e){const t=[],n=Array.isArray(e.messages)?e.messages:[],i=Array.isArray(e.toolMessages)?e.toolMessages:[],s=Math.max(0,n.length-La);s>0&&t.push({kind:"message",key:"chat:history:notice",message:{role:"system",content:`Showing last ${La} messages (${s} hidden).`,timestamp:Date.now()}});for(let o=s;o<n.length;o++){const a=n[o],r=Ll(a),c=a.__openclaw;if(c&&c.kind==="compaction"){t.push({kind:"divider",key:typeof c.id=="string"?`divider:compaction:${c.id}`:`divider:compaction:${r.timestamp}:${o}`,label:"Compaction",timestamp:r.timestamp??Date.now()});continue}!e.showThinking&&r.role.toLowerCase()==="toolresult"||t.push({kind:"message",key:Ra(a,o),message:a})}if(e.showThinking)for(let o=0;o<i.length;o++)t.push({kind:"message",key:Ra(i[o],o+n.length),message:i[o]});if(e.stream!==null){const o=`stream:${e.sessionKey}:${e.streamStartedAt??"live"}`;e.stream.trim().length>0?t.push({kind:"stream",key:o,text:e.stream,startedAt:e.streamStartedAt??Date.now()}):t.push({kind:"reading-indicator",key:o})}return qp(t)}function Ra(e,t){const n=e,i=typeof n.toolCallId=="string"?n.toolCallId:"";if(i)return`tool:${i}`;const s=typeof n.id=="string"?n.id:"";if(s)return`msg:${s}`;const o=typeof n.messageId=="string"?n.messageId:"";if(o)return`msg:${o}`;const a=typeof n.timestamp=="number"?n.timestamp:null,r=typeof n.role=="string"?n.role:"unknown";return a!=null?`msg:${r}:${a}:${t}`:`msg:${r}:${t}`}const Wp=new Set(["title","description","default","nullable"]);function Vp(e){return Object.keys(e??{}).filter(n=>!Wp.has(n)).length===0}function Jp(e){if(e===void 0)return"";try{return JSON.stringify(e,null,2)??""}catch{return""}}const rn={chevronDown:l`
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
  `,plus:l`
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
  `,minus:l`
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
  `,trash:l`
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
  `,edit:l`
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
  `};function ft(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:a,onPatch:r}=e,d=e.showLabel??!0,c=pe(t),u=ve(i,s),g=(u==null?void 0:u.label)??t.title??Be(String(i.at(-1))),f=(u==null?void 0:u.help)??t.description,m=$s(i);if(o.has(m))return l`<div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${g}</div>
      <div class="cfg-field__error">Unsupported schema node. Use Raw mode.</div>
    </div>`;if(t.anyOf||t.oneOf){const S=(t.anyOf??t.oneOf??[]).filter(k=>!(k.type==="null"||Array.isArray(k.type)&&k.type.includes("null")));if(S.length===1)return ft({...e,schema:S[0]});const x=k=>{if(k.const!==void 0)return k.const;if(k.enum&&k.enum.length===1)return k.enum[0]},C=S.map(x),F=C.every(k=>k!==void 0);if(F&&C.length>0&&C.length<=5){const k=n??t.default;return l`
        <div class="cfg-field">
          ${d?l`<label class="cfg-field__label">${g}</label>`:y}
          ${f?l`<div class="cfg-field__help">${f}</div>`:y}
          <div class="cfg-segmented">
            ${C.map(E=>l`
              <button
                type="button"
                class="cfg-segmented__btn ${E===k||String(E)===String(k)?"active":""}"
                ?disabled=${a}
                @click=${()=>r(i,E)}
              >
                ${String(E)}
              </button>
            `)}
          </div>
        </div>
      `}if(F&&C.length>5)return Ma({...e,options:C,value:n??t.default});const R=new Set(S.map(k=>pe(k)).filter(Boolean)),L=new Set([...R].map(k=>k==="integer"?"number":k));if([...L].every(k=>["string","number","boolean"].includes(k))){const k=L.has("string"),E=L.has("number");if(L.has("boolean")&&L.size===1)return ft({...e,schema:{...t,type:"boolean",anyOf:void 0,oneOf:void 0}});if(k||E)return Ia({...e,inputType:E&&!k?"number":"text"})}}if(t.enum){const $=t.enum;if($.length<=5){const S=n??t.default;return l`
        <div class="cfg-field">
          ${d?l`<label class="cfg-field__label">${g}</label>`:y}
          ${f?l`<div class="cfg-field__help">${f}</div>`:y}
          <div class="cfg-segmented">
            ${$.map(x=>l`
              <button
                type="button"
                class="cfg-segmented__btn ${x===S||String(x)===String(S)?"active":""}"
                ?disabled=${a}
                @click=${()=>r(i,x)}
              >
                ${String(x)}
              </button>
            `)}
          </div>
        </div>
      `}return Ma({...e,options:$,value:n??t.default})}if(c==="object")return Yp(e);if(c==="array")return Xp(e);if(c==="boolean"){const $=typeof n=="boolean"?n:typeof t.default=="boolean"?t.default:!1;return l`
      <label class="cfg-toggle-row ${a?"disabled":""}">
        <div class="cfg-toggle-row__content">
          <span class="cfg-toggle-row__label">${g}</span>
          ${f?l`<span class="cfg-toggle-row__help">${f}</span>`:y}
        </div>
        <div class="cfg-toggle">
          <input
            type="checkbox"
            .checked=${$}
            ?disabled=${a}
            @change=${S=>r(i,S.target.checked)}
          />
          <span class="cfg-toggle__track"></span>
        </div>
      </label>
    `}return c==="number"||c==="integer"?Qp(e):c==="string"?Ia({...e,inputType:"text"}):l`
    <div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${g}</div>
      <div class="cfg-field__error">Unsupported type: ${c}. Use Raw mode.</div>
    </div>
  `}function Ia(e){const{schema:t,value:n,path:i,hints:s,disabled:o,onPatch:a,inputType:r}=e,d=e.showLabel??!0,c=ve(i,s),u=(c==null?void 0:c.label)??t.title??Be(String(i.at(-1))),g=(c==null?void 0:c.help)??t.description,f=((c==null?void 0:c.sensitive)??!1)&&!/^\$\{[^}]*\}$/.test(String(n??"").trim()),m=(c==null?void 0:c.placeholder)??(f?"••••":t.default!==void 0?`Default: ${String(t.default)}`:""),$=n??"";return l`
    <div class="cfg-field">
      ${d?l`<label class="cfg-field__label">${u}</label>`:y}
      ${g?l`<div class="cfg-field__help">${g}</div>`:y}
      <div class="cfg-input-wrap">
        <input
          type=${f?"password":r}
          class="cfg-input"
          placeholder=${m}
          .value=${$==null?"":String($)}
          ?disabled=${o}
          @input=${S=>{const x=S.target.value;if(r==="number"){if(x.trim()===""){a(i,void 0);return}const C=Number(x);a(i,Number.isNaN(C)?x:C);return}a(i,x)}}
          @change=${S=>{if(r==="number")return;const x=S.target.value;a(i,x.trim())}}
        />
        ${t.default!==void 0?l`
          <button
            type="button"
            class="cfg-input__reset"
            title="Reset to default"
            ?disabled=${o}
            @click=${()=>a(i,t.default)}
          >↺</button>
        `:y}
      </div>
    </div>
  `}function Qp(e){const{schema:t,value:n,path:i,hints:s,disabled:o,onPatch:a}=e,r=e.showLabel??!0,d=ve(i,s),c=(d==null?void 0:d.label)??t.title??Be(String(i.at(-1))),u=(d==null?void 0:d.help)??t.description,g=n??t.default??"",f=typeof g=="number"?g:0;return l`
    <div class="cfg-field">
      ${r?l`<label class="cfg-field__label">${c}</label>`:y}
      ${u?l`<div class="cfg-field__help">${u}</div>`:y}
      <div class="cfg-number">
        <button
          type="button"
          class="cfg-number__btn"
          ?disabled=${o}
          @click=${()=>a(i,f-1)}
        >−</button>
        <input
          type="number"
          class="cfg-number__input"
          .value=${g==null?"":String(g)}
          ?disabled=${o}
          @input=${m=>{const $=m.target.value,S=$===""?void 0:Number($);a(i,S)}}
        />
        <button
          type="button"
          class="cfg-number__btn"
          ?disabled=${o}
          @click=${()=>a(i,f+1)}
        >+</button>
      </div>
    </div>
  `}function Ma(e){const{schema:t,value:n,path:i,hints:s,disabled:o,options:a,onPatch:r}=e,d=e.showLabel??!0,c=ve(i,s),u=(c==null?void 0:c.label)??t.title??Be(String(i.at(-1))),g=(c==null?void 0:c.help)??t.description,f=n??t.default,m=a.findIndex(S=>S===f||String(S)===String(f)),$="__unset__";return l`
    <div class="cfg-field">
      ${d?l`<label class="cfg-field__label">${u}</label>`:y}
      ${g?l`<div class="cfg-field__help">${g}</div>`:y}
      <select
        class="cfg-select"
        ?disabled=${o}
        .value=${m>=0?String(m):$}
        @change=${S=>{const x=S.target.value;r(i,x===$?void 0:a[Number(x)])}}
      >
        <option value=${$}>Select...</option>
        ${a.map((S,x)=>l`
          <option value=${String(x)}>${String(S)}</option>
        `)}
      </select>
    </div>
  `}function Yp(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:a,onPatch:r}=e,d=ve(i,s),c=(d==null?void 0:d.label)??t.title??Be(String(i.at(-1))),u=(d==null?void 0:d.help)??t.description,g=n??t.default,f=g&&typeof g=="object"&&!Array.isArray(g)?g:{},m=t.properties??{},S=Object.entries(m).toSorted((L,k)=>{var D,N;const E=((D=ve([...i,L[0]],s))==null?void 0:D.order)??0,O=((N=ve([...i,k[0]],s))==null?void 0:N.order)??0;return E!==O?E-O:L[0].localeCompare(k[0])}),x=new Set(Object.keys(m)),C=t.additionalProperties,F=!!C&&typeof C=="object",R=l`
    ${S.map(([L,k])=>ft({schema:k,value:f[L],path:[...i,L],hints:s,unsupported:o,disabled:a,onPatch:r}))}
    ${F?Zp({schema:C,value:f,path:i,hints:s,unsupported:o,disabled:a,reservedKeys:x,onPatch:r}):y}
  `;return i.length===1?l`
      <div class="cfg-fields">
        ${R}
      </div>
    `:l`
    <details class="cfg-object" open>
      <summary class="cfg-object__header">
        <span class="cfg-object__title">${c}</span>
        <span class="cfg-object__chevron">${rn.chevronDown}</span>
      </summary>
      ${u?l`<div class="cfg-object__help">${u}</div>`:y}
      <div class="cfg-object__content">
        ${R}
      </div>
    </details>
  `}function Xp(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:a,onPatch:r}=e,d=e.showLabel??!0,c=ve(i,s),u=(c==null?void 0:c.label)??t.title??Be(String(i.at(-1))),g=(c==null?void 0:c.help)??t.description,f=Array.isArray(t.items)?t.items[0]:t.items;if(!f)return l`
      <div class="cfg-field cfg-field--error">
        <div class="cfg-field__label">${u}</div>
        <div class="cfg-field__error">Unsupported array schema. Use Raw mode.</div>
      </div>
    `;const m=Array.isArray(n)?n:Array.isArray(t.default)?t.default:[];return l`
    <div class="cfg-array">
      <div class="cfg-array__header">
        ${d?l`<span class="cfg-array__label">${u}</span>`:y}
        <span class="cfg-array__count">${m.length} item${m.length!==1?"s":""}</span>
        <button
          type="button"
          class="cfg-array__add"
          ?disabled=${a}
          @click=${()=>{const $=[...m,Za(f)];r(i,$)}}
        >
          <span class="cfg-array__add-icon">${rn.plus}</span>
          Add
        </button>
      </div>
      ${g?l`<div class="cfg-array__help">${g}</div>`:y}

      ${m.length===0?l`
              <div class="cfg-array__empty">No items yet. Click "Add" to create one.</div>
            `:l`
        <div class="cfg-array__items">
          ${m.map(($,S)=>l`
            <div class="cfg-array__item">
              <div class="cfg-array__item-header">
                <span class="cfg-array__item-index">#${S+1}</span>
                <button
                  type="button"
                  class="cfg-array__item-remove"
                  title="Remove item"
                  ?disabled=${a}
                  @click=${()=>{const x=[...m];x.splice(S,1),r(i,x)}}
                >
                  ${rn.trash}
                </button>
              </div>
              <div class="cfg-array__item-content">
                ${ft({schema:f,value:$,path:[...i,S],hints:s,unsupported:o,disabled:a,showLabel:!1,onPatch:r})}
              </div>
            </div>
          `)}
        </div>
      `}
    </div>
  `}function Zp(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:a,reservedKeys:r,onPatch:d}=e,c=Vp(t),u=Object.entries(n??{}).filter(([g])=>!r.has(g));return l`
    <div class="cfg-map">
      <div class="cfg-map__header">
        <span class="cfg-map__label">Custom entries</span>
        <button
          type="button"
          class="cfg-map__add"
          ?disabled=${a}
          @click=${()=>{const g={...n};let f=1,m=`custom-${f}`;for(;m in g;)f+=1,m=`custom-${f}`;g[m]=c?{}:Za(t),d(i,g)}}
        >
          <span class="cfg-map__add-icon">${rn.plus}</span>
          Add Entry
        </button>
      </div>

      ${u.length===0?l`
              <div class="cfg-map__empty">No custom entries.</div>
            `:l`
        <div class="cfg-map__items">
          ${u.map(([g,f])=>{const m=[...i,g],$=Jp(f);return l`
              <div class="cfg-map__item">
                <div class="cfg-map__item-key">
                  <input
                    type="text"
                    class="cfg-input cfg-input--sm"
                    placeholder="Key"
                    .value=${g}
                    ?disabled=${a}
                    @change=${S=>{const x=S.target.value.trim();if(!x||x===g)return;const C={...n};x in C||(C[x]=C[g],delete C[g],d(i,C))}}
                  />
                </div>
                <div class="cfg-map__item-value">
                  ${c?l`
                        <textarea
                          class="cfg-textarea cfg-textarea--sm"
                          placeholder="JSON value"
                          rows="2"
                          .value=${$}
                          ?disabled=${a}
                          @change=${S=>{const x=S.target,C=x.value.trim();if(!C){d(m,void 0);return}try{d(m,JSON.parse(C))}catch{x.value=$}}}
                        ></textarea>
                      `:ft({schema:t,value:f,path:m,hints:s,unsupported:o,disabled:a,showLabel:!1,onPatch:d})}
                </div>
                <button
                  type="button"
                  class="cfg-map__item-remove"
                  title="Remove entry"
                  ?disabled=${a}
                  @click=${()=>{const S={...n};delete S[g],d(i,S)}}
                >
                  ${rn.trash}
                </button>
              </div>
            `})}
        </div>
      `}
    </div>
  `}const Fa={env:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="3"></circle>
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
      ></path>
    </svg>
  `,update:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  `,agents:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path
        d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"
      ></path>
      <circle cx="8" cy="14" r="1"></circle>
      <circle cx="16" cy="14" r="1"></circle>
    </svg>
  `,auth:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  `,channels:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  `,messages:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  `,commands:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
  `,hooks:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
  `,skills:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      ></polygon>
    </svg>
  `,tools:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      ></path>
    </svg>
  `,gateway:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      ></path>
    </svg>
  `,wizard:l`
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
  `,meta:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
    </svg>
  `,logging:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  `,browser:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="4"></circle>
      <line x1="21.17" y1="8" x2="12" y2="8"></line>
      <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
      <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
    </svg>
  `,ui:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>
  `,models:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path
        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
      ></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  `,bindings:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
      <line x1="6" y1="6" x2="6.01" y2="6"></line>
      <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
  `,broadcast:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path>
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path>
      <circle cx="12" cy="12" r="2"></circle>
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path>
      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path>
    </svg>
  `,audio:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M9 18V5l12-2v13"></path>
      <circle cx="6" cy="18" r="3"></circle>
      <circle cx="18" cy="16" r="3"></circle>
    </svg>
  `,session:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  `,cron:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  `,web:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      ></path>
    </svg>
  `,discovery:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  `,canvasHost:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  `,talk:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line x1="12" y1="19" x2="12" y2="23"></line>
      <line x1="8" y1="23" x2="16" y2="23"></line>
    </svg>
  `,plugins:l`
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
  `,default:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
    </svg>
  `},to={env:{label:"Environment Variables",description:"Environment variables passed to the gateway process"},update:{label:"Updates",description:"Auto-update settings and release channel"},agents:{label:"Agents",description:"Agent configurations, models, and identities"},auth:{label:"Authentication",description:"API keys and authentication profiles"},channels:{label:"Channels",description:"Messaging channels (Telegram, Discord, Slack, etc.)"},messages:{label:"Messages",description:"Message handling and routing settings"},commands:{label:"Commands",description:"Custom slash commands"},hooks:{label:"Hooks",description:"Webhooks and event hooks"},skills:{label:"Skills",description:"Skill packs and capabilities"},tools:{label:"Tools",description:"Tool configurations (browser, search, etc.)"},gateway:{label:"Gateway",description:"Gateway server settings (port, auth, binding)"},wizard:{label:"Setup Wizard",description:"Setup wizard state and history"},meta:{label:"Metadata",description:"Gateway metadata and version information"},logging:{label:"Logging",description:"Log levels and output configuration"},browser:{label:"Browser",description:"Browser automation settings"},ui:{label:"UI",description:"User interface preferences"},models:{label:"Models",description:"AI model configurations and providers"},bindings:{label:"Bindings",description:"Key bindings and shortcuts"},broadcast:{label:"Broadcast",description:"Broadcast and notification settings"},audio:{label:"Audio",description:"Audio input/output settings"},session:{label:"Session",description:"Session management and persistence"},cron:{label:"Cron",description:"Scheduled tasks and automation"},web:{label:"Web",description:"Web server and API settings"},discovery:{label:"Discovery",description:"Service discovery and networking"},canvasHost:{label:"Canvas Host",description:"Canvas rendering and display"},talk:{label:"Talk",description:"Voice and speech settings"},plugins:{label:"Plugins",description:"Plugin management and extensions"}};function Pa(e){return Fa[e]??Fa.default}function ev(e,t,n){if(!n)return!0;const i=n.toLowerCase(),s=to[e];return e.toLowerCase().includes(i)||s&&(s.label.toLowerCase().includes(i)||s.description.toLowerCase().includes(i))?!0:qt(t,i)}function qt(e,t){var i,s,o;if((i=e.title)!=null&&i.toLowerCase().includes(t)||(s=e.description)!=null&&s.toLowerCase().includes(t)||(o=e.enum)!=null&&o.some(a=>String(a).toLowerCase().includes(t)))return!0;if(e.properties){for(const[a,r]of Object.entries(e.properties))if(a.toLowerCase().includes(t)||qt(r,t))return!0}if(e.items){const a=Array.isArray(e.items)?e.items:[e.items];for(const r of a)if(r&&qt(r,t))return!0}if(e.additionalProperties&&typeof e.additionalProperties=="object"&&qt(e.additionalProperties,t))return!0;const n=e.anyOf??e.oneOf??e.allOf;if(n){for(const a of n)if(a&&qt(a,t))return!0}return!1}function tv(e){var g;if(!e.schema)return l`
      <div class="muted">Schema unavailable.</div>
    `;const t=e.schema,n=e.value??{};if(pe(t)!=="object"||!t.properties)return l`
      <div class="callout danger">Unsupported schema. Use Raw.</div>
    `;const i=new Set(e.unsupportedPaths??[]),s=t.properties,o=e.searchQuery??"",a=e.activeSection,r=e.activeSubsection??null,c=Object.entries(s).toSorted((f,m)=>{var x,C;const $=((x=ve([f[0]],e.uiHints))==null?void 0:x.order)??50,S=((C=ve([m[0]],e.uiHints))==null?void 0:C.order)??50;return $!==S?$-S:f[0].localeCompare(m[0])}).filter(([f,m])=>!(a&&f!==a||o&&!ev(f,m,o)));let u=null;if(a&&r&&c.length===1){const f=(g=c[0])==null?void 0:g[1];f&&pe(f)==="object"&&f.properties&&f.properties[r]&&(u={sectionKey:a,subsectionKey:r,schema:f.properties[r]})}return c.length===0?l`
      <div class="config-empty">
        <div class="config-empty__icon">${ne.search}</div>
        <div class="config-empty__text">
          ${o?`No settings match "${o}"`:"No settings in this section"}
        </div>
      </div>
    `:l`
    <div class="config-form config-form--modern">
      ${u?(()=>{const{sectionKey:f,subsectionKey:m,schema:$}=u,S=ve([f,m],e.uiHints),x=(S==null?void 0:S.label)??$.title??Be(m),C=(S==null?void 0:S.help)??$.description??"",F=n[f],R=F&&typeof F=="object"?F[m]:void 0,L=`config-section-${f}-${m}`;return l`
              <section class="config-section-card" id=${L}>
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${Pa(f)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${x}</h3>
                    ${C?l`<p class="config-section-card__desc">${C}</p>`:y}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${ft({schema:$,value:R,path:[f,m],hints:e.uiHints,unsupported:i,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})():c.map(([f,m])=>{const $=to[f]??{label:f.charAt(0).toUpperCase()+f.slice(1),description:m.description??""};return l`
              <section class="config-section-card" id="config-section-${f}">
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${Pa(f)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${$.label}</h3>
                    ${$.description?l`<p class="config-section-card__desc">${$.description}</p>`:y}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${ft({schema:m,value:n[f],path:[f],hints:e.uiHints,unsupported:i,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})}
    </div>
  `}const nv=new Set(["title","description","default","nullable"]);function iv(e){return Object.keys(e??{}).filter(n=>!nv.has(n)).length===0}function Fl(e){const t=e.filter(s=>s!=null),n=t.length!==e.length,i=[];for(const s of t)i.some(o=>Object.is(o,s))||i.push(s);return{enumValues:i,nullable:n}}function sv(e){return!e||typeof e!="object"?{schema:null,unsupportedPaths:["<root>"]}:Yt(e,[])}function Yt(e,t){const n=new Set,i={...e},s=$s(t)||"<root>";if(e.anyOf||e.oneOf||e.allOf){const r=ov(e,t);return r||{schema:e,unsupportedPaths:[s]}}const o=Array.isArray(e.type)&&e.type.includes("null"),a=pe(e)??(e.properties||e.additionalProperties?"object":void 0);if(i.type=a??e.type,i.nullable=o||e.nullable,i.enum){const{enumValues:r,nullable:d}=Fl(i.enum);i.enum=r,d&&(i.nullable=!0),r.length===0&&n.add(s)}if(a==="object"){const r=e.properties??{},d={};for(const[c,u]of Object.entries(r)){const g=Yt(u,[...t,c]);g.schema&&(d[c]=g.schema);for(const f of g.unsupportedPaths)n.add(f)}if(i.properties=d,e.additionalProperties===!0)n.add(s);else if(e.additionalProperties===!1)i.additionalProperties=!1;else if(e.additionalProperties&&typeof e.additionalProperties=="object"&&!iv(e.additionalProperties)){const c=Yt(e.additionalProperties,[...t,"*"]);i.additionalProperties=c.schema??e.additionalProperties,c.unsupportedPaths.length>0&&n.add(s)}}else if(a==="array"){const r=Array.isArray(e.items)?e.items[0]:e.items;if(!r)n.add(s);else{const d=Yt(r,[...t,"*"]);i.items=d.schema??r,d.unsupportedPaths.length>0&&n.add(s)}}else a!=="string"&&a!=="number"&&a!=="integer"&&a!=="boolean"&&!i.enum&&n.add(s);return{schema:i,unsupportedPaths:Array.from(n)}}function ov(e,t){if(e.allOf)return null;const n=e.anyOf??e.oneOf;if(!n)return null;const i=[],s=[];let o=!1;for(const r of n){if(!r||typeof r!="object")return null;if(Array.isArray(r.enum)){const{enumValues:d,nullable:c}=Fl(r.enum);i.push(...d),c&&(o=!0);continue}if("const"in r){if(r.const==null){o=!0;continue}i.push(r.const);continue}if(pe(r)==="null"){o=!0;continue}s.push(r)}if(i.length>0&&s.length===0){const r=[];for(const d of i)r.some(c=>Object.is(c,d))||r.push(d);return{schema:{...e,enum:r,nullable:o,anyOf:void 0,oneOf:void 0,allOf:void 0},unsupportedPaths:[]}}if(s.length===1){const r=Yt(s[0],t);return r.schema&&(r.schema.nullable=o||r.schema.nullable),r}const a=new Set(["string","number","integer","boolean"]);return s.length>0&&i.length===0&&s.every(r=>r.type&&a.has(String(r.type)))?{schema:{...e,nullable:o},unsupportedPaths:[]}:null}const ps={all:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
  `,env:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="3"></circle>
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
      ></path>
    </svg>
  `,update:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  `,agents:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path
        d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"
      ></path>
      <circle cx="8" cy="14" r="1"></circle>
      <circle cx="16" cy="14" r="1"></circle>
    </svg>
  `,auth:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  `,channels:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  `,messages:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  `,commands:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
  `,hooks:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
  `,skills:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      ></polygon>
    </svg>
  `,tools:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      ></path>
    </svg>
  `,gateway:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      ></path>
    </svg>
  `,wizard:l`
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
  `,meta:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
    </svg>
  `,logging:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  `,browser:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="4"></circle>
      <line x1="21.17" y1="8" x2="12" y2="8"></line>
      <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
      <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
    </svg>
  `,ui:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>
  `,models:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path
        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
      ></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  `,bindings:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
      <line x1="6" y1="6" x2="6.01" y2="6"></line>
      <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
  `,broadcast:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path>
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path>
      <circle cx="12" cy="12" r="2"></circle>
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path>
      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path>
    </svg>
  `,audio:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M9 18V5l12-2v13"></path>
      <circle cx="6" cy="18" r="3"></circle>
      <circle cx="18" cy="16" r="3"></circle>
    </svg>
  `,session:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  `,cron:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  `,web:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      ></path>
    </svg>
  `,discovery:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  `,canvasHost:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  `,talk:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line x1="12" y1="19" x2="12" y2="23"></line>
      <line x1="8" y1="23" x2="16" y2="23"></line>
    </svg>
  `,plugins:l`
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
  `,default:l`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
    </svg>
  `},Da=[{key:"env",label:"Environment"},{key:"update",label:"Updates"},{key:"agents",label:"Agents"},{key:"auth",label:"Authentication"},{key:"channels",label:"Channels"},{key:"messages",label:"Messages"},{key:"commands",label:"Commands"},{key:"hooks",label:"Hooks"},{key:"skills",label:"Skills"},{key:"tools",label:"Tools"},{key:"gateway",label:"Gateway"},{key:"wizard",label:"Setup Wizard"}],Oa="__all__";function Na(e){return ps[e]??ps.default}function av(e,t){const n=to[e];return n||{label:(t==null?void 0:t.title)??Be(e),description:(t==null?void 0:t.description)??""}}function rv(e){const{key:t,schema:n,uiHints:i}=e;if(!n||pe(n)!=="object"||!n.properties)return[];const s=Object.entries(n.properties).map(([o,a])=>{const r=ve([t,o],i),d=(r==null?void 0:r.label)??a.title??Be(o),c=(r==null?void 0:r.help)??a.description??"",u=(r==null?void 0:r.order)??50;return{key:o,label:d,description:c,order:u}});return s.sort((o,a)=>o.order!==a.order?o.order-a.order:o.key.localeCompare(a.key)),s}function lv(e,t){if(!e||!t)return[];const n=[];function i(s,o,a){if(s===o)return;if(typeof s!=typeof o){n.push({path:a,from:s,to:o});return}if(typeof s!="object"||s===null||o===null){s!==o&&n.push({path:a,from:s,to:o});return}if(Array.isArray(s)&&Array.isArray(o)){JSON.stringify(s)!==JSON.stringify(o)&&n.push({path:a,from:s,to:o});return}const r=s,d=o,c=new Set([...Object.keys(r),...Object.keys(d)]);for(const u of c)i(r[u],d[u],a?`${a}.${u}`:u)}return i(e,t,""),n}function Ba(e,t=40){let n;try{n=JSON.stringify(e)??String(e)}catch{n=String(e)}return n.length<=t?n:n.slice(0,t-3)+"..."}function cv(e){var E,O,D;const t=e.valid==null?"unknown":e.valid?"valid":"invalid",n=sv(e.schema),i=n.schema?n.unsupportedPaths.length>0:!1,s=((E=n.schema)==null?void 0:E.properties)??{},o=Da.filter(N=>N.key in s),a=new Set(Da.map(N=>N.key)),r=Object.keys(s).filter(N=>!a.has(N)).map(N=>({key:N,label:N.charAt(0).toUpperCase()+N.slice(1)})),d=[...o,...r],c=e.activeSection&&n.schema&&pe(n.schema)==="object"?(O=n.schema.properties)==null?void 0:O[e.activeSection]:void 0,u=e.activeSection?av(e.activeSection,c):null,g=e.activeSection?rv({key:e.activeSection,schema:c,uiHints:e.uiHints}):[],f=e.formMode==="form"&&!!e.activeSection&&g.length>0,m=e.activeSubsection===Oa,$=e.searchQuery||m?null:e.activeSubsection??((D=g[0])==null?void 0:D.key)??null,S=e.formMode==="form"?lv(e.originalValue,e.formValue):[],x=e.formMode==="raw"&&e.raw!==e.originalRaw,C=e.formMode==="form"?S.length>0:x,F=!!e.formValue&&!e.loading&&!!n.schema,R=e.connected&&!e.saving&&C&&(e.formMode==="raw"?!0:F),L=e.connected&&!e.applying&&!e.updating&&C&&(e.formMode==="raw"?!0:F),k=e.connected&&!e.applying&&!e.updating;return l`
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
            @input=${N=>e.onSearchChange(N.target.value)}
          />
          ${e.searchQuery?l`
                <button
                  class="config-search__clear"
                  @click=${()=>e.onSearchChange("")}
                >
                  ×
                </button>
              `:y}
        </div>

        <!-- Section nav -->
        <nav class="config-nav">
          <button
            class="config-nav__item ${e.activeSection===null?"active":""}"
            @click=${()=>e.onSectionChange(null)}
          >
            <span class="config-nav__icon">${ps.all}</span>
            <span class="config-nav__label">All Settings</span>
          </button>
          ${d.map(N=>l`
              <button
                class="config-nav__item ${e.activeSection===N.key?"active":""}"
                @click=${()=>e.onSectionChange(N.key)}
              >
                <span class="config-nav__icon"
                  >${Na(N.key)}</span
                >
                <span class="config-nav__label">${N.label}</span>
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
            ${C?l`
                  <span class="config-changes-badge"
                    >${e.formMode==="raw"?"Unsaved changes":`${S.length} unsaved change${S.length!==1?"s":""}`}</span
                  >
                `:l`
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
              ?disabled=${!R}
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
              ?disabled=${!k}
              @click=${e.onUpdate}
            >
              ${e.updating?"Updating…":"Update"}
            </button>
          </div>
        </div>

        <!-- Diff panel (form mode only - raw mode doesn't have granular diff) -->
        ${C&&e.formMode==="form"?l`
              <details class="config-diff">
                <summary class="config-diff__summary">
                  <span
                    >View ${S.length} pending
                    change${S.length!==1?"s":""}</span
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
                  ${S.map(N=>l`
                      <div class="config-diff__item">
                        <div class="config-diff__path">${N.path}</div>
                        <div class="config-diff__values">
                          <span class="config-diff__from"
                            >${Ba(N.from)}</span
                          >
                          <span class="config-diff__arrow">→</span>
                          <span class="config-diff__to"
                            >${Ba(N.to)}</span
                          >
                        </div>
                      </div>
                    `)}
                </div>
              </details>
            `:y}
        ${u&&e.formMode==="form"?l`
              <div class="config-section-hero">
                <div class="config-section-hero__icon">
                  ${Na(e.activeSection??"")}
                </div>
                <div class="config-section-hero__text">
                  <div class="config-section-hero__title">
                    ${u.label}
                  </div>
                  ${u.description?l`<div class="config-section-hero__desc">
                        ${u.description}
                      </div>`:y}
                </div>
              </div>
            `:y}
        ${f?l`
              <div class="config-subnav">
                <button
                  class="config-subnav__item ${$===null?"active":""}"
                  @click=${()=>e.onSubsectionChange(Oa)}
                >
                  All
                </button>
                ${g.map(N=>l`
                    <button
                      class="config-subnav__item ${$===N.key?"active":""}"
                      title=${N.description||N.label}
                      @click=${()=>e.onSubsectionChange(N.key)}
                    >
                      ${N.label}
                    </button>
                  `)}
              </div>
            `:y}

        <!-- Form content -->
        <div class="config-content">
          ${e.formMode==="form"?l`
                ${e.schemaLoading?l`
                        <div class="config-loading">
                          <div class="config-loading__spinner"></div>
                          <span>Loading schema…</span>
                        </div>
                      `:tv({schema:n.schema,uiHints:e.uiHints,value:e.formValue,disabled:e.loading||!e.formValue,unsupportedPaths:n.unsupportedPaths,onPatch:e.onFormPatch,searchQuery:e.searchQuery,activeSection:e.activeSection,activeSubsection:$})}
                ${i?l`
                        <div class="callout danger" style="margin-top: 12px">
                          Form view can't safely edit some fields. Use Raw to avoid losing config entries.
                        </div>
                      `:y}
              `:l`
                <label class="field config-raw-field">
                  <span>Raw JSON5</span>
                  <textarea
                    .value=${e.raw}
                    @input=${N=>e.onRawChange(N.target.value)}
                  ></textarea>
                </label>
              `}
        </div>

        ${e.issues.length>0?l`<div class="callout danger" style="margin-top: 12px;">
              <pre class="code-block">
${JSON.stringify(e.issues,null,2)}</pre
              >
            </div>`:y}
      </main>
    </div>
  `}function dv(e){var s;const t=["last",...e.channels.filter(Boolean)],n=(s=e.form.deliveryChannel)==null?void 0:s.trim();n&&!t.includes(n)&&t.push(n);const i=new Set;return t.filter(o=>i.has(o)?!1:(i.add(o),!0))}function uv(e,t){var i,s;if(t==="last")return"last";const n=(i=e.channelMeta)==null?void 0:i.find(o=>o.id===t);return n!=null&&n.label?n.label:((s=e.channelLabels)==null?void 0:s[t])??t}function gv(e){var r,d;const t=dv(e),n=e.runsJobId==null?void 0:e.jobs.find(c=>c.id===e.runsJobId),i=(n==null?void 0:n.name)??e.runsJobId??"(select a job)",s=e.runs.toSorted((c,u)=>u.ts-c.ts),o=e.form.sessionTarget==="isolated"&&e.form.payloadKind==="agentTurn",a=e.form.deliveryMode==="announce"&&!o?"none":e.form.deliveryMode;return l`
    <section class="grid grid-cols-2">
      <div class="card">
        <div class="card-title">Scheduler</div>
        <div class="card-sub">Gateway-owned cron scheduler status.</div>
        <div class="stat-grid" style="margin-top: 16px;">
          <div class="stat">
            <div class="stat-label">Enabled</div>
            <div class="stat-value">
              ${e.status?e.status.enabled?"Yes":"No":"n/a"}
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">Jobs</div>
            <div class="stat-value">${((r=e.status)==null?void 0:r.jobs)??"n/a"}</div>
          </div>
          <div class="stat">
            <div class="stat-label">Next wake</div>
            <div class="stat-value">${Ks(((d=e.status)==null?void 0:d.nextWakeAtMs)??null)}</div>
          </div>
        </div>
        <div class="row" style="margin-top: 12px;">
          <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"Refreshing…":"Refresh"}
          </button>
          ${e.error?l`<span class="muted">${e.error}</span>`:y}
        </div>
      </div>

      <div class="card">
        <div class="card-title">New Job</div>
        <div class="card-sub">Create a scheduled wakeup or agent run.</div>
        <div class="form-grid" style="margin-top: 16px;">
          <label class="field">
            <span>Name</span>
            <input
              .value=${e.form.name}
              @input=${c=>e.onFormChange({name:c.target.value})}
            />
          </label>
          <label class="field">
            <span>Description</span>
            <input
              .value=${e.form.description}
              @input=${c=>e.onFormChange({description:c.target.value})}
            />
          </label>
          <label class="field">
            <span>Agent ID</span>
            <input
              .value=${e.form.agentId}
              @input=${c=>e.onFormChange({agentId:c.target.value})}
              placeholder="default"
            />
          </label>
          <label class="field checkbox">
            <span>Enabled</span>
            <input
              type="checkbox"
              .checked=${e.form.enabled}
              @change=${c=>e.onFormChange({enabled:c.target.checked})}
            />
          </label>
          <label class="field">
            <span>Schedule</span>
            <select
              .value=${e.form.scheduleKind}
              @change=${c=>e.onFormChange({scheduleKind:c.target.value})}
            >
              <option value="every">Every</option>
              <option value="at">At</option>
              <option value="cron">Cron</option>
            </select>
          </label>
        </div>
        ${fv(e)}
        <div class="form-grid" style="margin-top: 12px;">
          <label class="field">
            <span>Session</span>
            <select
              .value=${e.form.sessionTarget}
              @change=${c=>e.onFormChange({sessionTarget:c.target.value})}
            >
              <option value="main">Main</option>
              <option value="isolated">Isolated</option>
            </select>
          </label>
          <label class="field">
            <span>Wake mode</span>
            <select
              .value=${e.form.wakeMode}
              @change=${c=>e.onFormChange({wakeMode:c.target.value})}
            >
              <option value="now">Now</option>
              <option value="next-heartbeat">Next heartbeat</option>
            </select>
          </label>
          <label class="field">
            <span>Payload</span>
            <select
              .value=${e.form.payloadKind}
              @change=${c=>e.onFormChange({payloadKind:c.target.value})}
            >
              <option value="systemEvent">System event</option>
              <option value="agentTurn">Agent turn</option>
            </select>
          </label>
        </div>
        <label class="field" style="margin-top: 12px;">
          <span>${e.form.payloadKind==="systemEvent"?"System text":"Agent message"}</span>
          <textarea
            .value=${e.form.payloadText}
            @input=${c=>e.onFormChange({payloadText:c.target.value})}
            rows="4"
          ></textarea>
        </label>
        <div class="form-grid" style="margin-top: 12px;">
          <label class="field">
            <span>Delivery</span>
            <select
              .value=${a}
              @change=${c=>e.onFormChange({deliveryMode:c.target.value})}
            >
              ${o?l`
                      <option value="announce">Announce summary (default)</option>
                    `:y}
              <option value="webhook">Webhook POST</option>
              <option value="none">None (internal)</option>
            </select>
          </label>
          ${e.form.payloadKind==="agentTurn"?l`
                  <label class="field">
                    <span>Timeout (seconds)</span>
                    <input
                      .value=${e.form.timeoutSeconds}
                      @input=${c=>e.onFormChange({timeoutSeconds:c.target.value})}
                    />
                  </label>
                `:y}
          ${a!=="none"?l`
                  <label class="field">
                    <span>${a==="webhook"?"Webhook URL":"Channel"}</span>
                    ${a==="webhook"?l`
                            <input
                              .value=${e.form.deliveryTo}
                              @input=${c=>e.onFormChange({deliveryTo:c.target.value})}
                              placeholder="https://example.invalid/cron"
                            />
                          `:l`
                            <select
                              .value=${e.form.deliveryChannel||"last"}
                              @change=${c=>e.onFormChange({deliveryChannel:c.target.value})}
                            >
                              ${t.map(c=>l`<option value=${c}>
                                    ${uv(e,c)}
                                  </option>`)}
                            </select>
                          `}
                  </label>
                  ${a==="announce"?l`
                          <label class="field">
                            <span>To</span>
                            <input
                              .value=${e.form.deliveryTo}
                              @input=${c=>e.onFormChange({deliveryTo:c.target.value})}
                              placeholder="+1555… or chat id"
                            />
                          </label>
                        `:y}
                `:y}
        </div>
        <div class="row" style="margin-top: 14px;">
          <button class="btn primary" ?disabled=${e.busy} @click=${e.onAdd}>
            ${e.busy?"Saving…":"Add job"}
          </button>
        </div>
      </div>
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">Jobs</div>
      <div class="card-sub">All scheduled jobs stored in the gateway.</div>
      ${e.jobs.length===0?l`
              <div class="muted" style="margin-top: 12px">No jobs yet.</div>
            `:l`
            <div class="list" style="margin-top: 12px;">
              ${e.jobs.map(c=>hv(c,e))}
            </div>
          `}
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">Run history</div>
      <div class="card-sub">Latest runs for ${i}.</div>
      ${e.runsJobId==null?l`
              <div class="muted" style="margin-top: 12px">Select a job to inspect run history.</div>
            `:s.length===0?l`
                <div class="muted" style="margin-top: 12px">No runs yet.</div>
              `:l`
              <div class="list" style="margin-top: 12px;">
                ${s.map(c=>mv(c,e.basePath))}
              </div>
            `}
    </section>
  `}function fv(e){const t=e.form;return t.scheduleKind==="at"?l`
      <label class="field" style="margin-top: 12px;">
        <span>Run at</span>
        <input
          type="datetime-local"
          .value=${t.scheduleAt}
          @input=${n=>e.onFormChange({scheduleAt:n.target.value})}
        />
      </label>
    `:t.scheduleKind==="every"?l`
      <div class="form-grid" style="margin-top: 12px;">
        <label class="field">
          <span>Every</span>
          <input
            .value=${t.everyAmount}
            @input=${n=>e.onFormChange({everyAmount:n.target.value})}
          />
        </label>
        <label class="field">
          <span>Unit</span>
          <select
            .value=${t.everyUnit}
            @change=${n=>e.onFormChange({everyUnit:n.target.value})}
          >
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
          </select>
        </label>
      </div>
    `:l`
    <div class="form-grid" style="margin-top: 12px;">
      <label class="field">
        <span>Expression</span>
        <input
          .value=${t.cronExpr}
          @input=${n=>e.onFormChange({cronExpr:n.target.value})}
        />
      </label>
      <label class="field">
        <span>Timezone (optional)</span>
        <input
          .value=${t.cronTz}
          @input=${n=>e.onFormChange({cronTz:n.target.value})}
        />
      </label>
    </div>
  `}function hv(e,t){const i=`list-item list-item-clickable cron-job${t.runsJobId===e.id?" list-item-selected":""}`;return l`
    <div class=${i} @click=${()=>t.onLoadRuns(e.id)}>
      <div class="list-main">
        <div class="list-title">${e.name}</div>
        <div class="list-sub">${nl(e)}</div>
        ${pv(e)}
        ${e.agentId?l`<div class="muted cron-job-agent">Agent: ${e.agentId}</div>`:y}
      </div>
      <div class="list-meta">
        ${vv(e)}
      </div>
      <div class="cron-job-footer">
        <div class="chip-row cron-job-chips">
          <span class=${`chip ${e.enabled?"chip-ok":"chip-danger"}`}>
            ${e.enabled?"enabled":"disabled"}
          </span>
          <span class="chip">${e.sessionTarget}</span>
          <span class="chip">${e.wakeMode}</span>
        </div>
        <div class="row cron-job-actions">
          <button
            class="btn"
            ?disabled=${t.busy}
            @click=${s=>{s.stopPropagation(),t.onToggle(e,!e.enabled)}}
          >
            ${e.enabled?"Disable":"Enable"}
          </button>
          <button
            class="btn"
            ?disabled=${t.busy}
            @click=${s=>{s.stopPropagation(),t.onRun(e)}}
          >
            Run
          </button>
          <button
            class="btn"
            ?disabled=${t.busy}
            @click=${s=>{s.stopPropagation(),t.onLoadRuns(e.id)}}
          >
            History
          </button>
          <button
            class="btn danger"
            ?disabled=${t.busy}
            @click=${s=>{s.stopPropagation(),t.onRemove(e)}}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  `}function pv(e){if(e.payload.kind==="systemEvent")return l`<div class="cron-job-detail">
      <span class="cron-job-detail-label">System</span>
      <span class="muted cron-job-detail-value">${e.payload.text}</span>
    </div>`;const t=e.delivery,n=(t==null?void 0:t.mode)==="webhook"?t.to?` (${t.to})`:"":t!=null&&t.channel||t!=null&&t.to?` (${t.channel??"last"}${t.to?` -> ${t.to}`:""})`:"";return l`
    <div class="cron-job-detail">
      <span class="cron-job-detail-label">Prompt</span>
      <span class="muted cron-job-detail-value">${e.payload.message}</span>
    </div>
    ${t?l`<div class="cron-job-detail">
            <span class="cron-job-detail-label">Delivery</span>
            <span class="muted cron-job-detail-value">${t.mode}${n}</span>
          </div>`:y}
  `}function Ua(e){return typeof e!="number"||!Number.isFinite(e)?"n/a":Ue(e)}function vv(e){var o,a,r;const t=((o=e.state)==null?void 0:o.lastStatus)??"n/a",n=t==="ok"?"cron-job-status-ok":t==="error"?"cron-job-status-error":t==="skipped"?"cron-job-status-skipped":"cron-job-status-na",i=(a=e.state)==null?void 0:a.nextRunAtMs,s=(r=e.state)==null?void 0:r.lastRunAtMs;return l`
    <div class="cron-job-state">
      <div class="cron-job-state-row">
        <span class="cron-job-state-key">Status</span>
        <span class=${`cron-job-status-pill ${n}`}>${t}</span>
      </div>
      <div class="cron-job-state-row">
        <span class="cron-job-state-key">Next</span>
        <span class="cron-job-state-value" title=${lt(i)}>
          ${Ua(i)}
        </span>
      </div>
      <div class="cron-job-state-row">
        <span class="cron-job-state-key">Last</span>
        <span class="cron-job-state-value" title=${lt(s)}>
          ${Ua(s)}
        </span>
      </div>
    </div>
  `}function mv(e,t){const n=typeof e.sessionKey=="string"&&e.sessionKey.trim().length>0?`${ei("chat",t)}?session=${encodeURIComponent(e.sessionKey)}`:null;return l`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.status}</div>
        <div class="list-sub">${e.summary??""}</div>
      </div>
      <div class="list-meta">
        <div>${lt(e.ts)}</div>
        <div class="muted">${e.durationMs??0}ms</div>
        ${n?l`<div><a class="session-link" href=${n}>Open run chat</a></div>`:y}
        ${e.error?l`<div class="muted">${e.error}</div>`:y}
      </div>
    </div>
  `}function yv(e){const t=e.status&&typeof e.status=="object"?e.status.securityAudit:null,n=(t==null?void 0:t.summary)??null,i=(n==null?void 0:n.critical)??0,s=(n==null?void 0:n.warn)??0,o=(n==null?void 0:n.info)??0,a=i>0?"danger":s>0?"warn":"success",r=i>0?`${i} critical`:s>0?`${s} warnings`:"No critical issues";return l`
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
            ${n?l`<div class="callout ${a}" style="margin-top: 8px;">
                  Security audit: ${r}${o>0?` · ${o} info`:""}. Run
                  <span class="mono">openclaw security audit --deep</span> for details.
                </div>`:y}
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
              @input=${d=>e.onCallMethodChange(d.target.value)}
              placeholder="system-presence"
            />
          </label>
          <label class="field">
            <span>Params (JSON)</span>
            <textarea
              .value=${e.callParams}
              @input=${d=>e.onCallParamsChange(d.target.value)}
              rows="6"
            ></textarea>
          </label>
        </div>
        <div class="row" style="margin-top: 12px;">
          <button class="btn primary" @click=${e.onCall}>Call</button>
        </div>
        ${e.callError?l`<div class="callout danger" style="margin-top: 12px;">
              ${e.callError}
            </div>`:y}
        ${e.callResult?l`<pre class="code-block" style="margin-top: 12px;">${e.callResult}</pre>`:y}
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
      ${e.eventLog.length===0?l`
              <div class="muted" style="margin-top: 12px">No events yet.</div>
            `:l`
            <div class="list" style="margin-top: 12px;">
              ${e.eventLog.map(d=>l`
                  <div class="list-item">
                    <div class="list-main">
                      <div class="list-title">${d.event}</div>
                      <div class="list-sub">${new Date(d.ts).toLocaleTimeString()}</div>
                    </div>
                    <div class="list-meta">
                      <pre class="code-block">${Xg(d.payload)}</pre>
                    </div>
                  </div>
                `)}
            </div>
          `}
    </section>
  `}function bv(e){const t=Math.max(0,e),n=Math.floor(t/1e3);if(n<60)return`${n}s`;const i=Math.floor(n/60);return i<60?`${i}m`:`${Math.floor(i/60)}h`}function et(e,t){return t?l`<div class="exec-approval-meta-row"><span>${e}</span><span>${t}</span></div>`:y}function wv(e){const t=e.execApprovalQueue[0];if(!t)return y;const n=t.request,i=t.expiresAtMs-Date.now(),s=i>0?`expires in ${bv(i)}`:"expired",o=e.execApprovalQueue.length;return l`
    <div class="exec-approval-overlay" role="dialog" aria-live="polite">
      <div class="exec-approval-card">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">Exec approval needed</div>
            <div class="exec-approval-sub">${s}</div>
          </div>
          ${o>1?l`<div class="exec-approval-queue">${o} pending</div>`:y}
        </div>
        <div class="exec-approval-command mono">${n.command}</div>
        <div class="exec-approval-meta">
          ${et("Host",n.host)}
          ${et("Agent",n.agentId)}
          ${et("Session",n.sessionKey)}
          ${et("CWD",n.cwd)}
          ${et("Resolved",n.resolvedPath)}
          ${et("Security",n.security)}
          ${et("Ask",n.ask)}
        </div>
        ${e.execApprovalError?l`<div class="exec-approval-error">${e.execApprovalError}</div>`:y}
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
  `}function $v(e){const{pendingGatewayUrl:t}=e;return t?l`
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
  `:y}const za=["trace","debug","info","warn","error","fatal"];function kv(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleTimeString()}function Sv(e,t){return t?[e.message,e.subsystem,e.raw].filter(Boolean).join(" ").toLowerCase().includes(t):!0}function xv(e){const t=e.filterText.trim().toLowerCase(),n=za.some(o=>!e.levelFilters[o]),i=e.entries.filter(o=>o.level&&!e.levelFilters[o.level]?!1:Sv(o,t)),s=t||n?"filtered":"visible";return l`
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
        ${za.map(o=>l`
            <label class="chip log-chip ${o}">
              <input
                type="checkbox"
                .checked=${e.levelFilters[o]}
                @change=${a=>e.onLevelToggle(o,a.target.checked)}
              />
              <span>${o}</span>
            </label>
          `)}
      </div>

      ${e.file?l`<div class="muted" style="margin-top: 10px;">File: ${e.file}</div>`:y}
      ${e.truncated?l`
              <div class="callout" style="margin-top: 10px">Log output truncated; showing latest chunk.</div>
            `:y}
      ${e.error?l`<div class="callout danger" style="margin-top: 10px;">${e.error}</div>`:y}

      <div class="log-stream" style="margin-top: 12px;" @scroll=${e.onScroll}>
        ${i.length===0?l`
                <div class="muted" style="padding: 12px">No log entries.</div>
              `:i.map(o=>l`
                <div class="log-row">
                  <div class="log-time mono">${kv(o.time)}</div>
                  <div class="log-level ${o.level??""}">${o.level??""}</div>
                  <div class="log-subsystem mono">${o.subsystem??""}</div>
                  <div class="log-message mono">${o.message??o.raw}</div>
                </div>
              `)}
      </div>
    </section>
  `}function Av(e){return l`
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
      ${e.db==="sqlite"?l`<div class="callout" style="margin-top: 12px; background: var(--bg-muted, #f5f5f5); color: var(--text-muted, #666);">当前使用本地数据库</div>`:y}
      ${e.error?l`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:y}
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        ${e.stats?_v(e.stats):e.loading?y:l`<div class="muted">暂无统计</div>`}
      </div>
      <div style="margin-top: 24px;">
        <div class="row" style="justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="card-title" style="font-size: 1rem;">无货产品列表</div>
          ${e.onOpenAddForm&&!e.showAddForm?l`<button class="btn btn--primary" ?disabled=${e.loading} @click=${e.onOpenAddForm}>手动新增</button>`:y}
        </div>
        ${e.showAddForm&&e.onAdd&&e.onCloseAddForm?l`
              <div class="callout" style="margin-bottom: 12px; padding: 12px;">
                <div style="font-weight: 600; margin-bottom: 8px;">新增无货记录</div>
                <form @submit=${async t=>{var o,a,r,d,c,u,g;t.preventDefault();const n=t.target,i=((a=(o=n.querySelector('[name="oos_add_name"]'))==null?void 0:o.value)==null?void 0:a.trim())??"";if(!i)return;await e.onAdd({product_name:i,specification:((d=(r=n.querySelector('[name="oos_add_spec"]'))==null?void 0:r.value)==null?void 0:d.trim())??"",quantity:parseFloat(((c=n.querySelector('[name="oos_add_qty"]'))==null?void 0:c.value)??"0")||0,unit:((g=(u=n.querySelector('[name="oos_add_unit"]'))==null?void 0:u.value)==null?void 0:g.trim())??""})&&e.onCloseAddForm()}}>
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
            `:y}
        <div class="list" style="margin-top: 8px;">
          ${e.list.length===0?l`<div class="muted">暂无无货产品记录。</div>`:e.list.slice(0,50).map(t=>Cv(t,e.onDelete))}
        </div>
        ${e.list.length>50?l`<div class="muted" style="margin-top: 8px;">共 ${e.list.length} 个无货产品，仅展示前 50 个</div>`:y}
      </div>
      <div class="row" style="margin-top: 24px; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">按文件</div>
          <div class="list" style="margin-top: 8px;">
            ${e.byFile.length===0?l`<div class="muted">暂无</div>`:e.byFile.slice(0,10).map(t=>Tv(t))}
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">按时间（最近 30 天）</div>
          <div class="list" style="margin-top: 8px;">
            ${e.byTime.length===0?l`<div class="muted">暂无</div>`:e.byTime.slice(0,10).map(t=>Ev(t))}
          </div>
        </div>
      </div>
    </section>
  `}function _v(e){return[{label:"总记录数",value:e.total_records},{label:"无货产品数",value:e.out_of_stock_count},{label:"今日新增",value:e.today_count},{label:"被报无货≥2 次",value:e.notified_count},{label:"已发邮件产品数",value:e.email_sent_product_count}].map(n=>l`
      <div class="card stat-card" style="min-width: 100px;">
        <div class="stat-value">${n.value}</div>
        <div class="stat-label">${n.label}</div>
      </div>
    `)}function Cv(e,t){const n=e.product_name??"",i=e.specification??"",s=e.unit??"",o=e.quantity??"",a=e.count??1,d=(e.email_sent_count??0)>0||e.email_status==="sent"?"已发送":"未发",c=e.product_key??"";return l`
    <div class="list-item" style="display: flex; justify-content: space-between; align-items: center;">
      <div class="list-main">
        <div class="list-title">${n} ${i}</div>
        <div class="list-sub">数量: ${String(o)} ${s} · 被报无货 ${a} 次 · 邮件: ${d}</div>
      </div>
      ${t&&c?l`<button class="btn" style="flex-shrink: 0;" title="删除该无货产品" @click=${()=>t(c)}>删除</button>`:y}
    </div>
  `}function Tv(e){const t=e.file_name??"",n=e.total_records??0,i=e.uploaded_at?String(e.uploaded_at).length>19?String(e.uploaded_at).slice(0,10)+" "+String(e.uploaded_at).slice(11,19):String(e.uploaded_at):"";return l`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${t}</div>
        <div class="list-sub">记录数: ${n}${i?` · ${i}`:""}</div>
      </div>
    </div>
  `}function Ev(e){return l`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.date??""}</div>
        <div class="list-sub">新增: ${e.count??0}</div>
      </div>
    </div>
  `}function Lv(e){return l`
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
      ${e.db==="sqlite"?l`<div class="callout" style="margin-top: 12px; background: var(--bg-muted, #f5f5f5); color: var(--text-muted, #666);">当前使用本地数据库</div>`:y}
      ${e.error?l`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:y}
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        ${e.stats?Rv(e.stats):e.loading?y:l`<div class="muted">暂无统计</div>`}
      </div>
      <div style="margin-top: 24px;">
        <div class="row" style="justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="card-title" style="font-size: 1rem;">缺货产品列表</div>
          ${e.onOpenAddForm&&!e.showAddForm?l`<button class="btn btn--primary" ?disabled=${e.loading} @click=${e.onOpenAddForm}>手动新增</button>`:y}
        </div>
        ${e.showAddForm&&e.onAdd&&e.onCloseAddForm?l`
              <div class="callout" style="margin-bottom: 12px; padding: 12px;">
                <div style="font-weight: 600; margin-bottom: 8px;">新增缺货记录（产品名字、规格、需求、供给；差异自动计算）</div>
                <form @submit=${async t=>{var r,d,c,u,g,f;t.preventDefault();const n=t.target,i=((d=(r=n.querySelector('[name="shortage_add_name"]'))==null?void 0:r.value)==null?void 0:d.trim())??"";if(!i)return;const s=parseFloat(((c=n.querySelector('[name="shortage_add_qty"]'))==null?void 0:c.value)??"0")||0,o=parseFloat(((u=n.querySelector('[name="shortage_add_avail"]'))==null?void 0:u.value)??"0")||0;await e.onAdd({product_name:i,specification:((f=(g=n.querySelector('[name="shortage_add_spec"]'))==null?void 0:g.value)==null?void 0:f.trim())??"",quantity:s,available_qty:o})&&e.onCloseAddForm()}}>
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
            `:y}
        <div class="list" style="margin-top: 8px;">
          ${e.list.length===0?l`<div class="muted">暂无缺货产品记录。</div>`:e.list.slice(0,50).map(t=>Iv(t,e.onDelete))}
        </div>
        ${e.list.length>50?l`<div class="muted" style="margin-top: 8px;">共 ${e.list.length} 个缺货产品，仅展示前 50 个</div>`:y}
      </div>
      <div class="row" style="margin-top: 24px; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">按文件</div>
          <div class="list" style="margin-top: 8px;">
            ${e.byFile.length===0?l`<div class="muted">暂无</div>`:e.byFile.slice(0,10).map(t=>Mv(t))}
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">按时间（最近 30 天）</div>
          <div class="list" style="margin-top: 8px;">
            ${e.byTime.length===0?l`<div class="muted">暂无</div>`:e.byTime.slice(0,10).map(t=>Fv(t))}
          </div>
        </div>
      </div>
    </section>
  `}function Rv(e){return[{label:"总记录数",value:e.total_records},{label:"缺货产品数",value:e.shortage_product_count},{label:"今日新增",value:e.today_count},{label:"被报缺货≥2 次",value:e.reported_ge2_count}].map(n=>l`
      <div class="card stat-card" style="min-width: 100px;">
        <div class="stat-value">${n.value}</div>
        <div class="stat-label">${n.label}</div>
      </div>
    `)}function Iv(e,t){const n=e.product_name??"",i=e.specification??"",s=e.quantity??0,o=e.available_qty??0,a=e.shortfall??0,r=e.count??1,d=e.product_key??"";return l`
    <div class="list-item" style="display: flex; justify-content: space-between; align-items: center;">
      <div class="list-main">
        <div class="list-title">${n} ${i?` · ${i}`:""}</div>
        <div class="list-sub">需求: ${s} · 供给: ${o} · 差异: ${a} · 被报缺货 ${r} 次</div>
      </div>
      ${t&&d?l`<button class="btn" style="flex-shrink: 0;" title="删除该缺货产品" @click=${()=>t(d)}>删除</button>`:y}
    </div>
  `}function Mv(e){const t=e.file_name??"",n=e.total_records??0,i=e.uploaded_at?String(e.uploaded_at).length>19?String(e.uploaded_at).slice(0,10)+" "+String(e.uploaded_at).slice(11,19):String(e.uploaded_at):"";return l`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${t}</div>
        <div class="list-sub">记录数: ${n}${i?` · ${i}`:""}</div>
      </div>
    </div>
  `}function Fv(e){return l`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.date??""}</div>
        <div class="list-sub">新增: ${e.count??0}</div>
      </div>
    </div>
  `}const qe="__defaults__",ja=[{value:"deny",label:"Deny"},{value:"allowlist",label:"Allowlist"},{value:"full",label:"Full"}],Pv=[{value:"off",label:"Off"},{value:"on-miss",label:"On miss"},{value:"always",label:"Always"}];function Ka(e){return e==="allowlist"||e==="full"||e==="deny"?e:"deny"}function Dv(e){return e==="always"||e==="off"||e==="on-miss"?e:"on-miss"}function Ov(e){const t=(e==null?void 0:e.defaults)??{};return{security:Ka(t.security),ask:Dv(t.ask),askFallback:Ka(t.askFallback??"deny"),autoAllowSkills:!!(t.autoAllowSkills??!1)}}function Nv(e){const t=(e==null?void 0:e.agents)??{},n=Array.isArray(t.list)?t.list:[],i=[];return n.forEach(s=>{if(!s||typeof s!="object")return;const o=s,a=typeof o.id=="string"?o.id.trim():"";if(!a)return;const r=typeof o.name=="string"?o.name.trim():void 0,d=o.default===!0;i.push({id:a,name:r||void 0,isDefault:d})}),i}function Bv(e,t){const n=Nv(e),i=Object.keys((t==null?void 0:t.agents)??{}),s=new Map;n.forEach(a=>s.set(a.id,a)),i.forEach(a=>{s.has(a)||s.set(a,{id:a})});const o=Array.from(s.values());return o.length===0&&o.push({id:"main",isDefault:!0}),o.sort((a,r)=>{var u,g;if(a.isDefault&&!r.isDefault)return-1;if(!a.isDefault&&r.isDefault)return 1;const d=(u=a.name)!=null&&u.trim()?a.name:a.id,c=(g=r.name)!=null&&g.trim()?r.name:r.id;return d.localeCompare(c)}),o}function Uv(e,t){return e===qe?qe:e&&t.some(n=>n.id===e)?e:qe}function zv(e){var g;const t=e.execApprovalsForm??((g=e.execApprovalsSnapshot)==null?void 0:g.file)??null,n=!!t,i=Ov(t),s=Bv(e.configForm,t),o=Vv(e.nodes),a=e.execApprovalsTarget;let r=a==="node"&&e.execApprovalsTargetNodeId?e.execApprovalsTargetNodeId:null;a==="node"&&r&&!o.some(f=>f.id===r)&&(r=null);const d=Uv(e.execApprovalsSelectedAgent,s),c=d!==qe?((t==null?void 0:t.agents)??{})[d]??null:null,u=Array.isArray(c==null?void 0:c.allowlist)?c.allowlist??[]:[];return{ready:n,disabled:e.execApprovalsSaving||e.execApprovalsLoading,dirty:e.execApprovalsDirty,loading:e.execApprovalsLoading,saving:e.execApprovalsSaving,form:t,defaults:i,selectedScope:d,selectedAgent:c,agents:s,allowlist:u,target:a,targetNodeId:r,targetNodes:o,onSelectScope:e.onExecApprovalsSelectAgent,onSelectTarget:e.onExecApprovalsTargetChange,onPatch:e.onExecApprovalsPatch,onRemove:e.onExecApprovalsRemove,onLoad:e.onLoadExecApprovals,onSave:e.onSaveExecApprovals}}function jv(e){const t=e.ready,n=e.target!=="node"||!!e.targetNodeId;return l`
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

      ${Kv(e)}

      ${t?l`
            ${Hv(e)}
            ${qv(e)}
            ${e.selectedScope===qe?y:Gv(e)}
          `:l`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load exec approvals to edit allowlists.</div>
            <button class="btn" ?disabled=${e.loading||!n} @click=${e.onLoad}>
              ${e.loading?"Loading…":"Load approvals"}
            </button>
          </div>`}
    </section>
  `}function Kv(e){const t=e.targetNodes.length>0,n=e.targetNodeId??"";return l`
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
              @change=${i=>{var a;if(i.target.value==="node"){const r=((a=e.targetNodes[0])==null?void 0:a.id)??null;e.onSelectTarget("node",n||r)}else e.onSelectTarget("gateway",null)}}
            >
              <option value="gateway" ?selected=${e.target==="gateway"}>Gateway</option>
              <option value="node" ?selected=${e.target==="node"}>Node</option>
            </select>
          </label>
          ${e.target==="node"?l`
                <label class="field">
                  <span>Node</span>
                  <select
                    ?disabled=${e.disabled||!t}
                    @change=${i=>{const o=i.target.value.trim();e.onSelectTarget("node",o||null)}}
                  >
                    <option value="" ?selected=${n===""}>Select node</option>
                    ${e.targetNodes.map(i=>l`<option
                          value=${i.id}
                          ?selected=${n===i.id}
                        >
                          ${i.label}
                        </option>`)}
                  </select>
                </label>
              `:y}
        </div>
      </div>
      ${e.target==="node"&&!t?l`
              <div class="muted">No nodes advertise exec approvals yet.</div>
            `:y}
    </div>
  `}function Hv(e){return l`
    <div class="row" style="margin-top: 12px; gap: 8px; flex-wrap: wrap;">
      <span class="label">Scope</span>
      <div class="row" style="gap: 8px; flex-wrap: wrap;">
        <button
          class="btn btn--sm ${e.selectedScope===qe?"active":""}"
          @click=${()=>e.onSelectScope(qe)}
        >
          Defaults
        </button>
        ${e.agents.map(t=>{var i;const n=(i=t.name)!=null&&i.trim()?`${t.name} (${t.id})`:t.id;return l`
            <button
              class="btn btn--sm ${e.selectedScope===t.id?"active":""}"
              @click=${()=>e.onSelectScope(t.id)}
            >
              ${n}
            </button>
          `})}
      </div>
    </div>
  `}function qv(e){const t=e.selectedScope===qe,n=e.defaults,i=e.selectedAgent??{},s=t?["defaults"]:["agents",e.selectedScope],o=typeof i.security=="string"?i.security:void 0,a=typeof i.ask=="string"?i.ask:void 0,r=typeof i.askFallback=="string"?i.askFallback:void 0,d=t?n.security:o??"__default__",c=t?n.ask:a??"__default__",u=t?n.askFallback:r??"__default__",g=typeof i.autoAllowSkills=="boolean"?i.autoAllowSkills:void 0,f=g??n.autoAllowSkills,m=g==null;return l`
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
              @change=${$=>{const x=$.target.value;!t&&x==="__default__"?e.onRemove([...s,"security"]):e.onPatch([...s,"security"],x)}}
            >
              ${t?y:l`<option value="__default__" ?selected=${d==="__default__"}>
                    Use default (${n.security})
                  </option>`}
              ${ja.map($=>l`<option
                    value=${$.value}
                    ?selected=${d===$.value}
                  >
                    ${$.label}
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
              @change=${$=>{const x=$.target.value;!t&&x==="__default__"?e.onRemove([...s,"ask"]):e.onPatch([...s,"ask"],x)}}
            >
              ${t?y:l`<option value="__default__" ?selected=${c==="__default__"}>
                    Use default (${n.ask})
                  </option>`}
              ${Pv.map($=>l`<option
                    value=${$.value}
                    ?selected=${c===$.value}
                  >
                    ${$.label}
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
              @change=${$=>{const x=$.target.value;!t&&x==="__default__"?e.onRemove([...s,"askFallback"]):e.onPatch([...s,"askFallback"],x)}}
            >
              ${t?y:l`<option value="__default__" ?selected=${u==="__default__"}>
                    Use default (${n.askFallback})
                  </option>`}
              ${ja.map($=>l`<option
                    value=${$.value}
                    ?selected=${u===$.value}
                  >
                    ${$.label}
                  </option>`)}
            </select>
          </label>
        </div>
      </div>

      <div class="list-item">
        <div class="list-main">
          <div class="list-title">Auto-allow skill CLIs</div>
          <div class="list-sub">
            ${t?"Allow skill executables listed by the Gateway.":m?`Using default (${n.autoAllowSkills?"on":"off"}).`:`Override (${f?"on":"off"}).`}
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>Enabled</span>
            <input
              type="checkbox"
              ?disabled=${e.disabled}
              .checked=${f}
              @change=${$=>{const S=$.target;e.onPatch([...s,"autoAllowSkills"],S.checked)}}
            />
          </label>
          ${!t&&!m?l`<button
                class="btn btn--sm"
                ?disabled=${e.disabled}
                @click=${()=>e.onRemove([...s,"autoAllowSkills"])}
              >
                Use default
              </button>`:y}
        </div>
      </div>
    </div>
  `}function Gv(e){const t=["agents",e.selectedScope,"allowlist"],n=e.allowlist;return l`
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
      ${n.length===0?l`
              <div class="muted">No allowlist entries yet.</div>
            `:n.map((i,s)=>Wv(e,i,s))}
    </div>
  `}function Wv(e,t,n){var a;const i=t.lastUsedAt?Ue(t.lastUsedAt):"never",s=t.lastUsedCommand?Wi(t.lastUsedCommand,120):null,o=t.lastResolvedPath?Wi(t.lastResolvedPath,120):null;return l`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${(a=t.pattern)!=null&&a.trim()?t.pattern:"New pattern"}</div>
        <div class="list-sub">Last used: ${i}</div>
        ${s?l`<div class="list-sub mono">${s}</div>`:y}
        ${o?l`<div class="list-sub mono">${o}</div>`:y}
      </div>
      <div class="list-meta">
        <label class="field">
          <span>Pattern</span>
          <input
            type="text"
            .value=${t.pattern??""}
            ?disabled=${e.disabled}
            @input=${r=>{const d=r.target;e.onPatch(["agents",e.selectedScope,"allowlist",n,"pattern"],d.value)}}
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
  `}function Vv(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(r=>String(r)==="system.execApprovals.get"||String(r)==="system.execApprovals.set"))continue;const o=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!o)continue;const a=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():o;t.push({id:o,label:a===o?o:`${a} · ${o}`})}return t.sort((n,i)=>n.label.localeCompare(i.label)),t}function Jv(e){const t=em(e),n=zv(e);return l`
    ${jv(n)}
    ${tm(t)}
    ${Qv(e)}
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
        ${e.nodes.length===0?l`
                <div class="muted">No nodes found.</div>
              `:e.nodes.map(i=>om(i))}
      </div>
    </section>
  `}function Qv(e){const t=e.devicesList??{pending:[],paired:[]},n=Array.isArray(t.pending)?t.pending:[],i=Array.isArray(t.paired)?t.paired:[];return l`
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
      ${e.devicesError?l`<div class="callout danger" style="margin-top: 12px;">${e.devicesError}</div>`:y}
      <div class="list" style="margin-top: 16px;">
        ${n.length>0?l`
              <div class="muted" style="margin-bottom: 8px;">Pending</div>
              ${n.map(s=>Yv(s,e))}
            `:y}
        ${i.length>0?l`
              <div class="muted" style="margin-top: 12px; margin-bottom: 8px;">Paired</div>
              ${i.map(s=>Xv(s,e))}
            `:y}
        ${n.length===0&&i.length===0?l`
                <div class="muted">No paired devices.</div>
              `:y}
      </div>
    </section>
  `}function Yv(e,t){var r,d;const n=((r=e.displayName)==null?void 0:r.trim())||e.deviceId,i=typeof e.ts=="number"?Ue(e.ts):"n/a",s=(d=e.role)!=null&&d.trim()?`role: ${e.role}`:"role: -",o=e.isRepair?" · repair":"",a=e.remoteIp?` · ${e.remoteIp}`:"";return l`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${n}</div>
        <div class="list-sub">${e.deviceId}${a}</div>
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
  `}function Xv(e,t){var r;const n=((r=e.displayName)==null?void 0:r.trim())||e.deviceId,i=e.remoteIp?` · ${e.remoteIp}`:"",s=`roles: ${Gi(e.roles)}`,o=`scopes: ${Gi(e.scopes)}`,a=Array.isArray(e.tokens)?e.tokens:[];return l`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${n}</div>
        <div class="list-sub">${e.deviceId}${i}</div>
        <div class="muted" style="margin-top: 6px;">${s} · ${o}</div>
        ${a.length===0?l`
                <div class="muted" style="margin-top: 6px">Tokens: none</div>
              `:l`
              <div class="muted" style="margin-top: 10px;">Tokens</div>
              <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 6px;">
                ${a.map(d=>Zv(e.deviceId,d,t))}
              </div>
            `}
      </div>
    </div>
  `}function Zv(e,t,n){const i=t.revokedAtMs?"revoked":"active",s=`scopes: ${Gi(t.scopes)}`,o=Ue(t.rotatedAtMs??t.createdAtMs??t.lastUsedAtMs??null);return l`
    <div class="row" style="justify-content: space-between; gap: 8px;">
      <div class="list-sub">${t.role} · ${i} · ${s} · ${o}</div>
      <div class="row" style="justify-content: flex-end; gap: 6px; flex-wrap: wrap;">
        <button
          class="btn btn--sm"
          @click=${()=>n.onDeviceRotate(e,t.role,t.scopes)}
        >
          Rotate
        </button>
        ${t.revokedAtMs?y:l`
              <button
                class="btn btn--sm danger"
                @click=${()=>n.onDeviceRevoke(e,t.role)}
              >
                Revoke
              </button>
            `}
      </div>
    </div>
  `}function em(e){const t=e.configForm,n=im(e.nodes),{defaultBinding:i,agents:s}=sm(t),o=!!t,a=e.configSaving||e.configFormMode==="raw";return{ready:o,disabled:a,configDirty:e.configDirty,configLoading:e.configLoading,configSaving:e.configSaving,defaultBinding:i,agents:s,nodes:n,onBindDefault:e.onBindDefault,onBindAgent:e.onBindAgent,onSave:e.onSaveBindings,onLoadConfig:e.onLoadConfig,formMode:e.configFormMode}}function tm(e){const t=e.nodes.length>0,n=e.defaultBinding??"";return l`
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

      ${e.formMode==="raw"?l`
              <div class="callout warn" style="margin-top: 12px">
                Switch the Config tab to <strong>Form</strong> mode to edit bindings here.
              </div>
            `:y}

      ${e.ready?l`
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
                      ${e.nodes.map(i=>l`<option
                            value=${i.id}
                            ?selected=${n===i.id}
                          >
                            ${i.label}
                          </option>`)}
                    </select>
                  </label>
                  ${t?y:l`
                          <div class="muted">No nodes with system.run available.</div>
                        `}
                </div>
              </div>

              ${e.agents.length===0?l`
                      <div class="muted">No agents found.</div>
                    `:e.agents.map(i=>nm(i,e))}
            </div>
          `:l`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load config to edit bindings.</div>
            <button class="btn" ?disabled=${e.configLoading} @click=${e.onLoadConfig}>
              ${e.configLoading?"Loading…":"Load config"}
            </button>
          </div>`}
    </section>
  `}function nm(e,t){var o;const n=e.binding??"__default__",i=(o=e.name)!=null&&o.trim()?`${e.name} (${e.id})`:e.id,s=t.nodes.length>0;return l`
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
            @change=${a=>{const d=a.target.value.trim();t.onBindAgent(e.index,d==="__default__"?null:d)}}
          >
            <option value="__default__" ?selected=${n==="__default__"}>
              Use default
            </option>
            ${t.nodes.map(a=>l`<option
                  value=${a.id}
                  ?selected=${n===a.id}
                >
                  ${a.label}
                </option>`)}
          </select>
        </label>
      </div>
    </div>
  `}function im(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(r=>String(r)==="system.run"))continue;const o=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!o)continue;const a=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():o;t.push({id:o,label:a===o?o:`${a} · ${o}`})}return t.sort((n,i)=>n.label.localeCompare(i.label)),t}function sm(e){const t={id:"main",name:void 0,index:0,isDefault:!0,binding:null};if(!e||typeof e!="object")return{defaultBinding:null,agents:[t]};const i=(e.tools??{}).exec??{},s=typeof i.node=="string"&&i.node.trim()?i.node.trim():null,o=e.agents??{},a=Array.isArray(o.list)?o.list:[];if(a.length===0)return{defaultBinding:s,agents:[t]};const r=[];return a.forEach((d,c)=>{if(!d||typeof d!="object")return;const u=d,g=typeof u.id=="string"?u.id.trim():"";if(!g)return;const f=typeof u.name=="string"?u.name.trim():void 0,m=u.default===!0,S=(u.tools??{}).exec??{},x=typeof S.node=="string"&&S.node.trim()?S.node.trim():null;r.push({id:g,name:f||void 0,index:c,isDefault:m,binding:x})}),r.length===0&&r.push(t),{defaultBinding:s,agents:r}}function om(e){const t=!!e.connected,n=!!e.paired,i=typeof e.displayName=="string"&&e.displayName.trim()||(typeof e.nodeId=="string"?e.nodeId:"unknown"),s=Array.isArray(e.caps)?e.caps:[],o=Array.isArray(e.commands)?e.commands:[];return l`
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
          ${s.slice(0,12).map(a=>l`<span class="chip">${String(a)}</span>`)}
          ${o.slice(0,8).map(a=>l`<span class="chip">${String(a)}</span>`)}
        </div>
      </div>
    </div>
  `}function am(e){var c,u;const t=(c=e.hello)==null?void 0:c.snapshot,n=t!=null&&t.uptimeMs?ur(t.uptimeMs):_("common.na"),i=(u=t==null?void 0:t.policy)!=null&&u.tickIntervalMs?`${t.policy.tickIntervalMs}ms`:_("common.na"),o=(t==null?void 0:t.authMode)==="trusted-proxy",a=(()=>{if(e.connected||!e.lastError)return null;const g=e.lastError.toLowerCase();if(!(g.includes("unauthorized")||g.includes("connect failed")))return null;const m=!!e.settings.token.trim(),$=!!e.password.trim();return!m&&!$?l`
        <div class="muted" style="margin-top: 8px">
          ${_("overview.auth.required")}
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
      `:l`
      <div class="muted" style="margin-top: 8px">
        ${_("overview.auth.failed",{command:"openclaw dashboard --no-open"})}
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
    `})(),r=(()=>{if(e.connected||!e.lastError||(typeof window<"u"?window.isSecureContext:!0))return null;const f=e.lastError.toLowerCase();return!f.includes("secure context")&&!f.includes("device identity required")?null:l`
      <div class="muted" style="margin-top: 8px">
        ${_("overview.insecure.hint",{url:"http://127.0.0.1:18789"})}
        <div style="margin-top: 6px">
          ${_("overview.insecure.stayHttp",{config:"gateway.controlUi.allowInsecureAuth: true"})}
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
    `})(),d=tn.getLocale();return l`
    <section class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <div>
          <div class="card-title">${_("overview.health.title")}</div>
          <div class="card-sub">
            ${_("overview.health.subtitle")}
          </div>
        </div>
        <div
          class="pill ${e.connected?"success":"danger"}"
          style="font-weight: 600; min-width: 96px; justify-content: center;"
        >
          ${e.connected?_("common.ok"):_("common.offline")}
        </div>
      </div>
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        <div class="card stat-card" style="min-width: 140px;">
          <div class="stat-label">${_("overview.stats.instances")}</div>
          <div class="stat-value">${e.presenceCount}</div>
          <div class="muted">${_("overview.stats.instancesHint")}</div>
        </div>
        <div class="card stat-card" style="min-width: 140px;">
          <div class="stat-label">${_("overview.stats.sessions")}</div>
          <div class="stat-value">${e.sessionsCount??_("common.na")}</div>
          <div class="muted">${_("overview.stats.sessionsHint")}</div>
        </div>
        <div class="card stat-card" style="min-width: 140px;">
          <div class="stat-label">${_("overview.stats.cron")}</div>
          <div class="stat-value">
            ${e.cronEnabled==null?_("common.na"):e.cronEnabled?_("common.enabled"):_("common.disabled")}
          </div>
          <div class="muted">
            ${_("overview.stats.cronNext",{time:Ks(e.cronNext)})}
          </div>
        </div>
      </div>
      ${e.lastError?l`<div class="callout danger" style="margin-top: 12px;">
              <div style="font-weight: 600; margin-bottom: 4px;">
                ${_("overview.health.lastErrorLabel")}
              </div>
              <div>${e.lastError}</div>
            </div>`:l`<div class="muted" style="margin-top: 12px;">
              ${_("overview.health.noError")}
            </div>`}
    </section>

    <section class="grid grid-cols-2">
      <div class="card">
        <div class="card-title">${_("overview.access.title")}</div>
        <div class="card-sub">${_("overview.access.subtitle")}</div>
        <div class="form-grid" style="margin-top: 16px;">
          <label class="field">
            <span>${_("overview.access.wsUrl")}</span>
            <input
              .value=${e.settings.gatewayUrl}
              @input=${g=>{const f=g.target.value;e.onSettingsChange({...e.settings,gatewayUrl:f})}}
              placeholder="ws://100.x.y.z:18789"
            />
          </label>
          ${o?"":l`
                <label class="field">
                  <span>${_("overview.access.token")}</span>
                  <input
                    .value=${e.settings.token}
                    @input=${g=>{const f=g.target.value;e.onSettingsChange({...e.settings,token:f})}}
                    placeholder="JAGENT_GATEWAY_TOKEN"
                  />
                </label>
                <label class="field">
                  <span>${_("overview.access.password")}</span>
                  <input
                    type="password"
                    .value=${e.password}
                    @input=${g=>{const f=g.target.value;e.onPasswordChange(f)}}
                    placeholder="system or shared password"
                  />
                </label>
              `}
          <label class="field">
            <span>${_("overview.access.sessionKey")}</span>
            <input
              .value=${e.settings.sessionKey}
              @input=${g=>{const f=g.target.value;e.onSessionKeyChange(f)}}
            />
          </label>
          <label class="field">
            <span>${_("overview.access.language")}</span>
            <select
              .value=${d}
              @change=${g=>{const f=g.target.value;tn.setLocale(f),e.onSettingsChange({...e.settings,locale:f})}}
            >
              <option value="en">${_("languages.en")}</option>
              <option value="zh-CN">${_("languages.zhCN")}</option>
              <option value="zh-TW">${_("languages.zhTW")}</option>
              <option value="pt-BR">${_("languages.ptBR")}</option>
            </select>
          </label>
        </div>
        <div class="row" style="margin-top: 14px;">
          <button class="btn" @click=${()=>e.onConnect()}>${_("common.connect")}</button>
          <button class="btn" @click=${()=>e.onRefresh()}>${_("common.refresh")}</button>
          <span class="muted">${_(o?"overview.access.trustedProxy":"overview.access.connectHint")}</span>
        </div>
      </div>

      <div class="card">
        <div class="card-title">${_("overview.snapshot.title")}</div>
        <div class="card-sub">${_("overview.snapshot.subtitle")}</div>
        <div class="stat-grid" style="margin-top: 16px;">
          <div class="stat">
            <div class="stat-label">${_("overview.snapshot.status")}</div>
            <div class="stat-value ${e.connected?"ok":"warn"}">
              ${e.connected?_("common.ok"):_("common.offline")}
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">${_("overview.snapshot.uptime")}</div>
            <div class="stat-value">${n}</div>
          </div>
          <div class="stat">
            <div class="stat-label">${_("overview.snapshot.tickInterval")}</div>
            <div class="stat-value">${i}</div>
          </div>
          <div class="stat">
            <div class="stat-label">${_("overview.snapshot.lastChannelsRefresh")}</div>
            <div class="stat-value">
              ${e.lastChannelsRefresh?Ue(e.lastChannelsRefresh):_("common.na")}
            </div>
          </div>
        </div>
        ${e.lastError?l`<div class="callout danger" style="margin-top: 14px;">
              <div>${e.lastError}</div>
              ${a??""}
              ${r??""}
            </div>`:l`
                <div class="callout" style="margin-top: 14px">
                  ${_("overview.snapshot.channelsHint")}
                </div>
              `}
      </div>
    </section>

    <section class="grid grid-cols-2" style="margin-top: 18px;">
      <div class="card">
        <div class="card-title">无货总览</div>
        <div class="card-sub">最近的无货情况汇总，点击「实例」页可查看明细。</div>
        <div class="row" style="margin-top: 12px; gap: 12px; flex-wrap: wrap;">
          ${e.oosStats?[{label:"总记录数",value:e.oosStats.total_records},{label:"无货产品数",value:e.oosStats.out_of_stock_count},{label:"今日新增",value:e.oosStats.today_count},{label:"被报无货≥2 次",value:e.oosStats.notified_count}].map(g=>l`
                  <div class="card stat-card" style="min-width: 120px;">
                    <div class="stat-value">${g.value}</div>
                    <div class="stat-label">${g.label}</div>
                  </div>
                `):l`<div class="muted">暂无统计，稍后可在「实例」页查看。</div>`}
        </div>
      </div>
      <div class="card">
        <div class="card-title">缺货总览</div>
        <div class="card-sub">Work 匹配后库存不足的统计，需重点关注的紧缺物资。</div>
        <div class="row" style="margin-top: 12px; gap: 12px; flex-wrap: wrap;">
          ${e.shortageStats?[{label:"总记录数",value:e.shortageStats.total_records},{label:"缺货产品数",value:e.shortageStats.shortage_product_count},{label:"今日新增",value:e.shortageStats.today_count},{label:"被报缺货≥2 次",value:e.shortageStats.reported_ge2_count}].map(g=>l`
                  <div class="card stat-card" style="min-width: 120px;">
                    <div class="stat-value">${g.value}</div>
                    <div class="stat-label">${g.label}</div>
                  </div>
                `):l`<div class="muted">暂无统计，稍后可在「实例」页查看。</div>`}
        </div>
      </div>
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">${_("overview.notes.title")}</div>
      <div class="card-sub">${_("overview.notes.subtitle")}</div>
      <div class="note-grid" style="margin-top: 14px;">
        <div>
          <div class="note-title">${_("overview.notes.tailscaleTitle")}</div>
          <div class="muted">
            ${_("overview.notes.tailscaleText")}
          </div>
        </div>
        <div>
          <div class="note-title">${_("overview.notes.sessionTitle")}</div>
          <div class="muted">${_("overview.notes.sessionText")}</div>
        </div>
        <div>
          <div class="note-title">${_("overview.notes.cronTitle")}</div>
          <div class="muted">${_("overview.notes.cronText")}</div>
        </div>
      </div>
    </section>
  `}const rm=["","off","minimal","low","medium","high","xhigh"],lm=["","off","on"],cm=[{value:"",label:"inherit"},{value:"off",label:"off (explicit)"},{value:"on",label:"on"},{value:"full",label:"full"}],dm=["","off","on","stream"];function um(e){if(!e)return"";const t=e.trim().toLowerCase();return t==="z.ai"||t==="z-ai"?"zai":t}function Pl(e){return um(e)==="zai"}function gm(e){return Pl(e)?lm:rm}function Ha(e,t){return t?e.includes(t)?[...e]:[...e,t]:[...e]}function fm(e,t){return t?e.some(n=>n.value===t)?[...e]:[...e,{value:t,label:`${t} (custom)`}]:[...e]}function hm(e,t){return!t||!e||e==="off"?e:"on"}function pm(e,t){return e?t&&e==="on"?"low":e:null}function vm(e){var n;const t=((n=e.result)==null?void 0:n.sessions)??[];return l`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Sessions</div>
          <div class="card-sub">Active session keys and per-session overrides.</div>
        </div>
        <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
          ${e.loading?"Loading…":"Refresh"}
        </button>
      </div>

      <div class="filters" style="margin-top: 14px;">
        <label class="field">
          <span>Active within (minutes)</span>
          <input
            .value=${e.activeMinutes}
            @input=${i=>e.onFiltersChange({activeMinutes:i.target.value,limit:e.limit,includeGlobal:e.includeGlobal,includeUnknown:e.includeUnknown})}
          />
        </label>
        <label class="field">
          <span>Limit</span>
          <input
            .value=${e.limit}
            @input=${i=>e.onFiltersChange({activeMinutes:e.activeMinutes,limit:i.target.value,includeGlobal:e.includeGlobal,includeUnknown:e.includeUnknown})}
          />
        </label>
        <label class="field checkbox">
          <span>Include global</span>
          <input
            type="checkbox"
            .checked=${e.includeGlobal}
            @change=${i=>e.onFiltersChange({activeMinutes:e.activeMinutes,limit:e.limit,includeGlobal:i.target.checked,includeUnknown:e.includeUnknown})}
          />
        </label>
        <label class="field checkbox">
          <span>Include unknown</span>
          <input
            type="checkbox"
            .checked=${e.includeUnknown}
            @change=${i=>e.onFiltersChange({activeMinutes:e.activeMinutes,limit:e.limit,includeGlobal:e.includeGlobal,includeUnknown:i.target.checked})}
          />
        </label>
      </div>

      ${e.error?l`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:y}

      <div class="muted" style="margin-top: 12px;">
        ${e.result?`Store: ${e.result.path}`:""}
      </div>

      <div class="table" style="margin-top: 16px;">
        <div class="table-head">
          <div>Key</div>
          <div>Label</div>
          <div>Kind</div>
          <div>Updated</div>
          <div>Tokens</div>
          <div>Thinking</div>
          <div>Verbose</div>
          <div>Reasoning</div>
          <div>Actions</div>
        </div>
        ${t.length===0?l`
                <div class="muted">No sessions found.</div>
              `:t.map(i=>mm(i,e.basePath,e.onPatch,e.onDelete,e.loading))}
      </div>
    </section>
  `}function mm(e,t,n,i,s){const o=e.updatedAt?Ue(e.updatedAt):"n/a",a=e.thinkingLevel??"",r=Pl(e.modelProvider),d=hm(a,r),c=Ha(gm(e.modelProvider),d),u=e.verboseLevel??"",g=fm(cm,u),f=e.reasoningLevel??"",m=Ha(dm,f),$=typeof e.displayName=="string"&&e.displayName.trim().length>0?e.displayName.trim():null,S=typeof e.label=="string"?e.label.trim():"",x=!!($&&$!==e.key&&$!==S),C=e.kind!=="global",F=C?`${ei("chat",t)}?session=${encodeURIComponent(e.key)}`:null;return l`
    <div class="table-row">
      <div class="mono session-key-cell">
        ${C?l`<a href=${F} class="session-link">${e.key}</a>`:e.key}
        ${x?l`<span class="muted session-key-display-name">${$}</span>`:y}
      </div>
      <div>
        <input
          .value=${e.label??""}
          ?disabled=${s}
          placeholder="(optional)"
          @change=${R=>{const L=R.target.value.trim();n(e.key,{label:L||null})}}
        />
      </div>
      <div>${e.kind}</div>
      <div>${o}</div>
      <div>${Yg(e)}</div>
      <div>
        <select
          ?disabled=${s}
          @change=${R=>{const L=R.target.value;n(e.key,{thinkingLevel:pm(L,r)})}}
        >
          ${c.map(R=>l`<option value=${R} ?selected=${d===R}>
                ${R||"inherit"}
              </option>`)}
        </select>
      </div>
      <div>
        <select
          ?disabled=${s}
          @change=${R=>{const L=R.target.value;n(e.key,{verboseLevel:L||null})}}
        >
          ${g.map(R=>l`<option value=${R.value} ?selected=${u===R.value}>
                ${R.label}
              </option>`)}
        </select>
      </div>
      <div>
        <select
          ?disabled=${s}
          @change=${R=>{const L=R.target.value;n(e.key,{reasoningLevel:L||null})}}
        >
          ${m.map(R=>l`<option value=${R} ?selected=${f===R}>
                ${R||"inherit"}
              </option>`)}
        </select>
      </div>
      <div>
        <button class="btn danger" ?disabled=${s} @click=${()=>i(e.key)}>
          Delete
        </button>
      </div>
    </div>
  `}function ym(e){var o;const t=((o=e.report)==null?void 0:o.skills)??[],n=e.filter.trim().toLowerCase(),i=n?t.filter(a=>[a.name,a.description,a.source].join(" ").toLowerCase().includes(n)):t,s=ol(i);return l`
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
            @input=${a=>e.onFilterChange(a.target.value)}
            placeholder="Search skills"
          />
        </label>
        <div class="muted">${i.length} shown</div>
      </div>

      ${e.error?l`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:y}

      ${i.length===0?l`
              <div class="muted" style="margin-top: 16px">No skills found.</div>
            `:l`
            <div class="agent-skills-groups" style="margin-top: 16px;">
              ${s.map(a=>{const r=a.id==="workspace"||a.id==="built-in";return l`
                  <details class="agent-skills-group" ?open=${!r}>
                    <summary class="agent-skills-header">
                      <span>${a.label}</span>
                      <span class="muted">${a.skills.length}</span>
                    </summary>
                    <div class="list skills-grid">
                      ${a.skills.map(d=>bm(d,e))}
                    </div>
                  </details>
                `})}
            </div>
          `}
    </section>
  `}function bm(e,t){const n=t.busyKey===e.skillKey,i=t.edits[e.skillKey]??"",s=t.messages[e.skillKey]??null,o=e.install.length>0&&e.missing.bins.length>0,a=!!(e.bundled&&e.source!=="openclaw-bundled"),r=al(e),d=rl(e);return l`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">
          ${e.emoji?`${e.emoji} `:""}${e.name}
        </div>
        <div class="list-sub">${Wi(e.description,140)}</div>
        ${ll({skill:e,showBundledBadge:a})}
        ${r.length>0?l`
              <div class="muted" style="margin-top: 6px;">
                Missing: ${r.join(", ")}
              </div>
            `:y}
        ${d.length>0?l`
              <div class="muted" style="margin-top: 6px;">
                Reason: ${d.join(", ")}
              </div>
            `:y}
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
          ${o?l`<button
                class="btn"
                ?disabled=${n}
                @click=${()=>t.onInstall(e.skillKey,e.name,e.install[0].id)}
              >
                ${n?"Installing…":e.install[0].label}
              </button>`:y}
        </div>
        ${s?l`<div
              class="muted"
              style="margin-top: 8px; color: ${s.kind==="error"?"var(--danger-color, #d14343)":"var(--success-color, #0a7f5a)"};"
            >
              ${s.message}
            </div>`:y}
        ${e.primaryEnv?l`
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
            `:y}
      </div>
    </div>
  `}const wm=/^data:/i,$m=/^https?:\/\//i;function km(e){var r,d;const t=((r=e.agentsList)==null?void 0:r.agents)??[],n=ar(e.sessionKey),i=(n==null?void 0:n.agentId)??((d=e.agentsList)==null?void 0:d.defaultId)??"main",s=t.find(c=>c.id===i),o=s==null?void 0:s.identity,a=(o==null?void 0:o.avatarUrl)??(o==null?void 0:o.avatar);if(a)return wm.test(a)||$m.test(a)?a:o==null?void 0:o.avatarUrl}function Sm(e){var m,$,S,x,C,F,R,L,k,E,O,D,N,Le;const t=e.presenceEntries.length,n=((m=e.sessionsResult)==null?void 0:m.count)??null,i=(($=e.cronStatus)==null?void 0:$.nextWakeAtMs)??null,s=e.connected?null:_("chat.disconnected"),o=e.tab==="chat",a=o&&(e.settings.chatFocusMode||e.onboarding),r=e.onboarding?!1:e.settings.chatShowThinking,d=km(e),c=e.chatAvatarUrl??d??null,u=e.configForm??((S=e.configSnapshot)==null?void 0:S.config),g=Rt(e.basePath??""),f=e.agentsSelectedId??((x=e.agentsList)==null?void 0:x.defaultId)??((R=(F=(C=e.agentsList)==null?void 0:C.agents)==null?void 0:F[0])==null?void 0:R.id)??null;return l`
    <div class="shell ${o?"shell--chat":""} ${a?"shell--chat-focus":""} ${e.settings.navCollapsed?"shell--nav-collapsed":""} ${e.onboarding?"shell--onboarding":""}">
      <header class="topbar">
        <div class="topbar-left">
          <button
            class="nav-collapse-toggle"
            @click=${()=>e.applySettings({...e.settings,navCollapsed:!e.settings.navCollapsed})}
            title="${e.settings.navCollapsed?_("nav.expand"):_("nav.collapse")}"
            aria-label="${e.settings.navCollapsed?_("nav.expand"):_("nav.collapse")}"
          >
            <span class="nav-collapse-toggle__icon">${ne.menu}</span>
          </button>
          <div class="brand">
            <div class="brand-logo">
              <img src=${g?`${g}/favicon.svg`:"/favicon.svg"} alt="Jagent" />
            </div>
            <div class="brand-text">
              <div class="brand-title">JAGENT</div>
              <div class="brand-sub">Gateway Dashboard</div>
            </div>
          </div>
        </div>
        <div class="topbar-status">
          <div class="pill">
            <span class="statusDot ${e.connected?"ok":""}"></span>
            <span>${_("common.health")}</span>
            <span class="mono">${e.connected?_("common.ok"):_("common.offline")}</span>
          </div>
          ${qg(e)}
        </div>
      </header>
      <aside class="nav ${e.settings.navCollapsed?"nav--collapsed":""}">
        ${cu.map(b=>{const T=e.settings.navGroupsCollapsed[b.label]??!1,U=b.tabs.some(B=>B===e.tab);return l`
            <div class="nav-group ${T&&!U?"nav-group--collapsed":""}">
              <button
                class="nav-label"
                @click=${()=>{const B={...e.settings.navGroupsCollapsed};B[b.label]=!T,e.applySettings({...e.settings,navGroupsCollapsed:B})}}
                aria-expanded=${!T}
              >
                <span class="nav-label__text">${_(`nav.${b.label}`)}</span>
                <span class="nav-label__chevron">${T?"+":"−"}</span>
              </button>
              <div class="nav-group__items">
                ${b.tabs.map(B=>Ng(e,B))}
              </div>
            </div>
          `})}
        <div class="nav-group nav-group--links">
          <div class="nav-label nav-label--static">
            <span class="nav-label__text">${_("common.resources")}</span>
          </div>
          <div class="nav-group__items">
            <a
              class="nav-item nav-item--external"
              href="https://docs.openclaw.ai"
              target="_blank"
              rel="noreferrer"
              title="${_("common.docs")} (opens in new tab)"
            >
              <span class="nav-item__icon" aria-hidden="true">${ne.book}</span>
              <span class="nav-item__text">${_("common.docs")}</span>
            </a>
          </div>
        </div>
      </aside>
      <main class="content ${o?"content--chat":""}">
        <section class="content-header">
          <div>
            ${e.tab==="work"?y:l`<div class="page-title">${Xi(e.tab)}</div>`}
            ${e.tab==="work"?y:l`<div class="page-sub">${gu(e.tab)}</div>`}
          </div>
          <div class="page-meta">
            ${e.lastError?l`<div class="pill danger">${e.lastError}</div>`:y}
            ${o?Bg(e):y}
          </div>
        </section>

        ${e.tab==="overview"?am({connected:e.connected,hello:e.hello,settings:e.settings,password:e.password,lastError:e.lastError,presenceCount:t,sessionsCount:n,cronEnabled:((L=e.cronStatus)==null?void 0:L.enabled)??null,cronNext:i,lastChannelsRefresh:e.channelsLastSuccess,oosStats:e.overviewOosStats,shortageStats:e.overviewShortageStats,onSettingsChange:b=>e.applySettings(b),onPasswordChange:b=>e.password=b,onSessionKeyChange:b=>{e.sessionKey=b,e.chatMessage="",e.resetToolStream(),e.applySettings({...e.settings,sessionKey:b,lastActiveSessionKey:b}),e.loadAssistantIdentity()},onConnect:()=>e.connect(),onRefresh:()=>e.loadOverview()}):y}

        ${e.tab==="channels"?If({loading:e.bkLoading,saving:e.bkSaving,error:e.bkError,content:e.bkContent,lastSuccessAt:e.bkLastSuccess,dependentFiles:e.bkDependentFiles,onReload:()=>dr(e),onSave:b=>id(e,b),onContentChange:b=>e.bkContent=b}):y}

        ${e.tab==="instances"?l`
                ${Av({loading:e.oosLoading,error:e.oosError,stats:e.oosStats,list:e.oosList,byFile:e.oosByFile,byTime:e.oosByTime,db:e.oosDb??void 0,onRefresh:()=>Yn(e),onDelete:b=>Jd(e,b),showAddForm:e.oosShowAddForm,onOpenAddForm:()=>e.oosShowAddForm=!0,onCloseAddForm:()=>e.oosShowAddForm=!1,onAdd:async b=>{const T=await Qd(e,b);return T&&(e.oosShowAddForm=!1),T}})}
                ${Lv({loading:e.shortageLoading,error:e.shortageError,stats:e.shortageStats,list:e.shortageList,byFile:e.shortageByFile,byTime:e.shortageByTime,db:e.shortageDb??void 0,onRefresh:()=>Xn(e),onDelete:b=>Xd(e,b),showAddForm:e.shortageShowAddForm,onOpenAddForm:()=>e.shortageShowAddForm=!0,onCloseAddForm:()=>e.shortageShowAddForm=!1,onAdd:async b=>{const T=await Zd(e,b);return T&&(e.shortageShowAddForm=!1),T}})}
              `:y}

        ${e.tab==="sessions"?vm({loading:e.sessionsLoading,result:e.sessionsResult,error:e.sessionsError,activeMinutes:e.sessionsFilterActive,limit:e.sessionsFilterLimit,includeGlobal:e.sessionsIncludeGlobal,includeUnknown:e.sessionsIncludeUnknown,basePath:e.basePath,onFiltersChange:b=>{e.sessionsFilterActive=b.activeMinutes,e.sessionsFilterLimit=b.limit,e.sessionsIncludeGlobal=b.includeGlobal,e.sessionsIncludeUnknown=b.includeUnknown},onRefresh:()=>ht(e),onPatch:(b,T)=>nu(e,b,T),onDelete:b=>su(e,b)}):y}

        ${Lg(e)}

        ${e.tab==="cron"?gv({basePath:e.basePath,loading:e.cronLoading,status:e.cronStatus,jobs:e.cronJobs,error:e.cronError,busy:e.cronBusy,form:e.cronForm,channels:(E=(k=e.channelsSnapshot)==null?void 0:k.channelMeta)!=null&&E.length?e.channelsSnapshot.channelMeta.map(b=>b.id):((O=e.channelsSnapshot)==null?void 0:O.channelOrder)??[],channelLabels:((D=e.channelsSnapshot)==null?void 0:D.channelLabels)??{},channelMeta:((N=e.channelsSnapshot)==null?void 0:N.channelMeta)??[],runsJobId:e.cronRunsJobId,runs:e.cronRuns,onFormChange:b=>e.cronForm=fr({...e.cronForm,...b}),onRefresh:()=>e.loadCron(),onAdd:()=>ld(e),onToggle:(b,T)=>cd(e,b,T),onRun:b=>dd(e,b),onRemove:b=>ud(e,b),onLoadRuns:b=>hr(e,b)}):y}

        ${e.tab==="agents"?Tf({loading:e.agentsLoading,error:e.agentsError,agentsList:e.agentsList,selectedAgentId:f,activePanel:e.agentsPanel,configForm:u,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,channelsLoading:e.channelsLoading,channelsError:e.channelsError,channelsSnapshot:e.channelsSnapshot,channelsLastSuccess:e.channelsLastSuccess,cronLoading:e.cronLoading,cronStatus:e.cronStatus,cronJobs:e.cronJobs,cronError:e.cronError,agentFilesLoading:e.agentFilesLoading,agentFilesError:e.agentFilesError,agentFilesList:e.agentFilesList,agentFileActive:e.agentFileActive,agentFileContents:e.agentFileContents,agentFileDrafts:e.agentFileDrafts,agentFileSaving:e.agentFileSaving,agentIdentityLoading:e.agentIdentityLoading,agentIdentityError:e.agentIdentityError,agentIdentityById:e.agentIdentityById,agentSkillsLoading:e.agentSkillsLoading,agentSkillsReport:e.agentSkillsReport,agentSkillsError:e.agentSkillsError,agentSkillsAgentId:e.agentSkillsAgentId,skillsFilter:e.skillsFilter,onRefresh:async()=>{var T,U;await Cs(e);const b=((U=(T=e.agentsList)==null?void 0:T.agents)==null?void 0:U.map(B=>B.id))??[];b.length>0&&cr(e,b)},onSelectAgent:b=>{e.agentsSelectedId!==b&&(e.agentsSelectedId=b,e.agentFilesList=null,e.agentFilesError=null,e.agentFilesLoading=!1,e.agentFileActive=null,e.agentFileContents={},e.agentFileDrafts={},e.agentSkillsReport=null,e.agentSkillsError=null,e.agentSkillsAgentId=null,lr(e,b),e.agentsPanel==="files"&&Pi(e,b),e.agentsPanel==="skills"&&Ln(e,b))},onSelectPanel:b=>{var T;e.agentsPanel=b,b==="files"&&f&&((T=e.agentFilesList)==null?void 0:T.agentId)!==f&&(e.agentFilesList=null,e.agentFilesError=null,e.agentFileActive=null,e.agentFileContents={},e.agentFileDrafts={},Pi(e,f)),b==="skills"&&f&&Ln(e,f),b==="channels"&&me(e,!1),b==="cron"&&e.loadCron()},onLoadFiles:b=>Pi(e,b),onSelectFile:b=>{e.agentFileActive=b,f&&Jg(e,f,b)},onFileDraftChange:(b,T)=>{e.agentFileDrafts={...e.agentFileDrafts,[b]:T}},onFileReset:b=>{const T=e.agentFileContents[b]??"";e.agentFileDrafts={...e.agentFileDrafts,[b]:T}},onFileSave:b=>{if(!f)return;const T=e.agentFileDrafts[b]??e.agentFileContents[b]??"";Qg(e,f,b,T)},onToolsProfileChange:(b,T,U)=>{var Y;if(!u)return;const B=(Y=u.agents)==null?void 0:Y.list;if(!Array.isArray(B))return;const G=B.findIndex(V=>V&&typeof V=="object"&&"id"in V&&V.id===b);if(G<0)return;const X=["agents","list",G,"tools"];T?he(e,[...X,"profile"],T):De(e,[...X,"profile"]),U&&De(e,[...X,"allow"])},onToolsOverridesChange:(b,T,U)=>{var Y;if(!u)return;const B=(Y=u.agents)==null?void 0:Y.list;if(!Array.isArray(B))return;const G=B.findIndex(V=>V&&typeof V=="object"&&"id"in V&&V.id===b);if(G<0)return;const X=["agents","list",G,"tools"];T.length>0?he(e,[...X,"alsoAllow"],T):De(e,[...X,"alsoAllow"]),U.length>0?he(e,[...X,"deny"],U):De(e,[...X,"deny"])},onConfigReload:()=>Ee(e),onConfigSave:()=>En(e),onChannelsRefresh:()=>me(e,!1),onCronRefresh:()=>e.loadCron(),onSkillsFilterChange:b=>e.skillsFilter=b,onSkillsRefresh:()=>{f&&Ln(e,f)},onAgentSkillToggle:(b,T,U)=>{var be,H,Re;if(!u)return;const B=(be=u.agents)==null?void 0:be.list;if(!Array.isArray(B))return;const G=B.findIndex(q=>q&&typeof q=="object"&&"id"in q&&q.id===b);if(G<0)return;const X=B[G],Y=T.trim();if(!Y)return;const V=((Re=(H=e.agentSkillsReport)==null?void 0:H.skills)==null?void 0:Re.map(q=>q.name).filter(Boolean))??[],ue=(Array.isArray(X.skills)?X.skills.map(q=>String(q).trim()).filter(Boolean):void 0)??V,J=new Set(ue);U?J.add(Y):J.delete(Y),he(e,["agents","list",G,"skills"],[...J])},onAgentSkillsClear:b=>{var B;if(!u)return;const T=(B=u.agents)==null?void 0:B.list;if(!Array.isArray(T))return;const U=T.findIndex(G=>G&&typeof G=="object"&&"id"in G&&G.id===b);U<0||De(e,["agents","list",U,"skills"])},onAgentSkillsDisableAll:b=>{var B;if(!u)return;const T=(B=u.agents)==null?void 0:B.list;if(!Array.isArray(T))return;const U=T.findIndex(G=>G&&typeof G=="object"&&"id"in G&&G.id===b);U<0||he(e,["agents","list",U,"skills"],[])},onModelChange:(b,T)=>{var V;if(!u)return;const U=(V=u.agents)==null?void 0:V.list;if(!Array.isArray(U))return;const B=U.findIndex(de=>de&&typeof de=="object"&&"id"in de&&de.id===b);if(B<0)return;const G=["agents","list",B,"model"];if(!T){De(e,G);return}const X=U[B],Y=X==null?void 0:X.model;if(Y&&typeof Y=="object"&&!Array.isArray(Y)){const de=Y.fallbacks,ue={primary:T,...Array.isArray(de)?{fallbacks:de}:{}};he(e,G,ue)}else he(e,G,T)},onModelFallbacksChange:(b,T)=>{var be;if(!u)return;const U=(be=u.agents)==null?void 0:be.list;if(!Array.isArray(U))return;const B=U.findIndex(H=>H&&typeof H=="object"&&"id"in H&&H.id===b);if(B<0)return;const G=["agents","list",B,"model"],X=U[B],Y=T.map(H=>H.trim()).filter(Boolean),V=X.model,ue=(()=>{if(typeof V=="string")return V.trim()||null;if(V&&typeof V=="object"&&!Array.isArray(V)){const H=V.primary;if(typeof H=="string")return H.trim()||null}return null})();if(Y.length===0){ue?he(e,G,ue):De(e,G);return}he(e,G,ue?{primary:ue,fallbacks:Y}:{fallbacks:Y})}}):y}

        ${e.tab==="skills"?ym({loading:e.skillsLoading,report:e.skillsReport,error:e.skillsError,filter:e.skillsFilter,edits:e.skillEdits,messages:e.skillMessages,busyKey:e.skillsBusyKey,onFilterChange:b=>e.skillsFilter=b,onRefresh:()=>dn(e,{clearMessages:!0}),onToggle:(b,T)=>au(e,b,T),onEdit:(b,T)=>ou(e,b,T),onSaveKey:b=>ru(e,b),onInstall:(b,T,U)=>lu(e,b,T,U)}):y}

        ${e.tab==="nodes"?Jv({loading:e.nodesLoading,nodes:e.nodes,devicesLoading:e.devicesLoading,devicesError:e.devicesError,devicesList:e.devicesList,configForm:e.configForm??((Le=e.configSnapshot)==null?void 0:Le.config),configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,configFormMode:e.configFormMode,execApprovalsLoading:e.execApprovalsLoading,execApprovalsSaving:e.execApprovalsSaving,execApprovalsDirty:e.execApprovalsDirty,execApprovalsSnapshot:e.execApprovalsSnapshot,execApprovalsForm:e.execApprovalsForm,execApprovalsSelectedAgent:e.execApprovalsSelectedAgent,execApprovalsTarget:e.execApprovalsTarget,execApprovalsTargetNodeId:e.execApprovalsTargetNodeId,onRefresh:()=>Vn(e),onDevicesRefresh:()=>Je(e),onDeviceApprove:b=>Bd(e,b),onDeviceReject:b=>Ud(e,b),onDeviceRotate:(b,T,U)=>zd(e,{deviceId:b,role:T,scopes:U}),onDeviceRevoke:(b,T)=>jd(e,{deviceId:b,role:T}),onLoadConfig:()=>Ee(e),onLoadExecApprovals:()=>{const b=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return Ps(e,b)},onBindDefault:b=>{b?he(e,["tools","exec","node"],b):De(e,["tools","exec","node"])},onBindAgent:(b,T)=>{const U=["agents","list",b,"tools","exec","node"];T?he(e,U,T):De(e,U)},onSaveBindings:()=>En(e),onExecApprovalsTargetChange:(b,T)=>{e.execApprovalsTarget=b,e.execApprovalsTargetNodeId=T,e.execApprovalsSnapshot=null,e.execApprovalsForm=null,e.execApprovalsDirty=!1,e.execApprovalsSelectedAgent=null},onExecApprovalsSelectAgent:b=>{e.execApprovalsSelectedAgent=b},onExecApprovalsPatch:(b,T)=>Wd(e,b,T),onExecApprovalsRemove:b=>Vd(e,b),onSaveExecApprovals:()=>{const b=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return Gd(e,b)}}):y}

        ${e.tab==="chat"?Hp({sessionKey:e.sessionKey,onSessionKeyChange:b=>{e.sessionKey=b,e.chatMessage="",e.chatAttachments=[],e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.chatQueue=[],e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:b,lastActiveSessionKey:b}),e.loadAssistantIdentity(),an(e),ts(e)},thinkingLevel:e.chatThinkingLevel,showThinking:r,loading:e.chatLoading,sending:e.chatSending,compactionStatus:e.compactionStatus,assistantAvatarUrl:c,messages:e.chatMessages,toolMessages:e.chatToolMessages,stream:e.chatStream,streamStartedAt:e.chatStreamStartedAt,draft:e.chatMessage,queue:e.chatQueue,connected:e.connected,canSend:e.connected,disabledReason:s,error:e.lastError,sessions:e.sessionsResult,focusMode:a,onRefresh:()=>(e.resetToolStream(),Promise.all([an(e),ts(e)])),onToggleFocusMode:()=>{e.onboarding||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})},onChatScroll:b=>e.handleChatScroll(b),onDraftChange:b=>e.chatMessage=b,attachments:e.chatAttachments,onAttachmentsChange:b=>e.chatAttachments=b,uploadedFile:e.chatUploadedFile,onFileSelect:b=>e.handleUploadChatFile(b),onClearUploadedFile:()=>e.clearChatUploadedFile(),composeDragOver:e.chatComposeDragOver,onComposeDragOver:()=>e.setChatComposeDragOver(!0),onComposeDragLeave:()=>e.setChatComposeDragOver(!1),onComposeDrop:b=>e.handleComposeDrop(b),onSend:()=>e.handleSendChat(),canAbort:!!e.chatRunId,onAbort:()=>void e.handleAbortChat(),onQueueRemove:b=>e.removeQueuedMessage(b),onNewSession:()=>e.handleSendChat("/new",{restoreDraft:!0}),showNewMessages:e.chatNewMessagesBelow&&!e.chatManualRefreshInFlight,onScrollToBottom:()=>e.scrollToBottom(),sidebarOpen:e.sidebarOpen,sidebarContent:e.sidebarContent,sidebarError:e.sidebarError,splitRatio:e.splitRatio,onOpenSidebar:b=>e.handleOpenSidebar(b),onCloseSidebar:()=>e.handleCloseSidebar(),onSplitRatioChange:b=>e.handleSplitRatioChange(b),assistantName:e.assistantName,assistantAvatar:e.assistantAvatar}):y}

        ${e.tab==="config"?cv({raw:e.configRaw,originalRaw:e.configRawOriginal,valid:e.configValid,issues:e.configIssues,loading:e.configLoading,saving:e.configSaving,applying:e.configApplying,updating:e.updateRunning,connected:e.connected,schema:e.configSchema,schemaLoading:e.configSchemaLoading,uiHints:e.configUiHints,formMode:e.configFormMode,formValue:e.configForm,originalValue:e.configFormOriginal,searchQuery:e.configSearchQuery,activeSection:e.configActiveSection,activeSubsection:e.configActiveSubsection,onRawChange:b=>{e.configRaw=b},onFormModeChange:b=>e.configFormMode=b,onFormPatch:(b,T)=>he(e,b,T),onSearchChange:b=>e.configSearchQuery=b,onSectionChange:b=>{e.configActiveSection=b,e.configActiveSubsection=null},onSubsectionChange:b=>e.configActiveSubsection=b,onReload:()=>Ee(e),onSave:()=>En(e),onApply:()=>Tc(e),onUpdate:()=>Ec(e)}):y}

        ${e.tab==="debug"?yv({loading:e.debugLoading,status:e.debugStatus,health:e.debugHealth,models:e.debugModels,heartbeat:e.debugHeartbeat,eventLog:e.eventLog,callMethod:e.debugCallMethod,callParams:e.debugCallParams,callResult:e.debugCallResult,callError:e.debugCallError,onCallMethodChange:b=>e.debugCallMethod=b,onCallParamsChange:b=>e.debugCallParams=b,onRefresh:()=>Wn(e),onCall:()=>Vc(e)}):y}

        ${e.tab==="logs"?xv({loading:e.logsLoading,error:e.logsError,file:e.logsFile,entries:e.logsEntries,filterText:e.logsFilterText,levelFilters:e.logsLevelFilters,autoFollow:e.logsAutoFollow,truncated:e.logsTruncated,onFilterTextChange:b=>e.logsFilterText=b,onLevelToggle:(b,T)=>{e.logsLevelFilters={...e.logsLevelFilters,[b]:T}},onToggleAutoFollow:b=>e.logsAutoFollow=b,onRefresh:()=>ks(e,{reset:!0}),onExport:(b,T)=>e.exportLogs(b,T),onScroll:b=>e.handleLogsScroll(b)}):y}
      </main>
      ${wv(e)}
      ${$v(e)}
    </div>
  `}var xm=Object.defineProperty,Am=Object.getOwnPropertyDescriptor,p=(e,t,n,i)=>{for(var s=i>1?void 0:i?Am(t,n):t,o=e.length-1,a;o>=0;o--)(a=e[o])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&xm(t,n,s),s};const Hi=Bs({});function _m(){if(!window.location.search)return!1;const t=new URLSearchParams(window.location.search).get("onboarding");if(!t)return!1;const n=t.trim().toLowerCase();return n==="1"||n==="true"||n==="yes"||n==="on"}let h=class extends Ct{constructor(){super(),this.i18nController=new wc(this),this.settings=fu(),this.password="",this.tab="chat",this.onboarding=_m(),this.connected=!1,this.theme=this.settings.theme??"system",this.themeResolved="dark",this.hello=null,this.lastError=null,this.eventLog=[],this.eventLogBuffer=[],this.toolStreamSyncTimer=null,this.sidebarCloseTimer=null,this.assistantName=Hi.name,this.assistantAvatar=Hi.avatar,this.assistantAgentId=Hi.agentId??null,this.sessionKey=this.settings.sessionKey,this.chatLoading=!1,this.chatSending=!1,this.chatMessage="",this.chatMessages=[],this.chatToolMessages=[],this.chatStream=null,this.chatStreamStartedAt=null,this.chatRunId=null,this.compactionStatus=null,this.chatAvatarUrl=null,this.chatThinkingLevel=null,this.chatQueue=[],this.chatAttachments=[],this.chatUploadedFile=null,this.chatComposeDragOver=!1,this.chatManualRefreshInFlight=!1,this.sidebarOpen=!1,this.sidebarContent=null,this.sidebarError=null,this.splitRatio=this.settings.splitRatio,this.nodesLoading=!1,this.nodes=[],this.devicesLoading=!1,this.devicesError=null,this.devicesList=null,this.execApprovalsLoading=!1,this.execApprovalsSaving=!1,this.execApprovalsDirty=!1,this.execApprovalsSnapshot=null,this.execApprovalsForm=null,this.execApprovalsSelectedAgent=null,this.execApprovalsTarget="gateway",this.execApprovalsTargetNodeId=null,this.execApprovalQueue=[],this.execApprovalBusy=!1,this.execApprovalError=null,this.pendingGatewayUrl=null,this.configLoading=!1,this.configRaw=`{
}
`,this.configRawOriginal="",this.configValid=null,this.configIssues=[],this.configSaving=!1,this.configApplying=!1,this.updateRunning=!1,this.applySessionKey=this.settings.lastActiveSessionKey,this.configSnapshot=null,this.configSchema=null,this.configSchemaVersion=null,this.configSchemaLoading=!1,this.configUiHints={},this.configForm=null,this.configFormOriginal=null,this.configFormDirty=!1,this.configFormMode="form",this.configSearchQuery="",this.configActiveSection=null,this.configActiveSubsection=null,this.channelsLoading=!1,this.channelsSnapshot=null,this.channelsError=null,this.channelsLastSuccess=null,this.bkContent="",this.bkLoading=!1,this.bkError=null,this.bkSaving=!1,this.bkLastSuccess=null,this.bkDependentFiles=null,this.whatsappLoginMessage=null,this.whatsappLoginQrDataUrl=null,this.whatsappLoginConnected=null,this.whatsappBusy=!1,this.nostrProfileFormState=null,this.nostrProfileAccountId=null,this.presenceLoading=!1,this.presenceEntries=[],this.presenceError=null,this.presenceStatus=null,this.oosLoading=!1,this.oosError=null,this.oosStats=null,this.oosList=[],this.oosByFile=[],this.oosByTime=[],this.oosShowAddForm=!1,this.oosDb=null,this.shortageLoading=!1,this.shortageError=null,this.shortageStats=null,this.shortageList=[],this.shortageByFile=[],this.shortageByTime=[],this.shortageShowAddForm=!1,this.shortageDb=null,this.overviewOosStats=null,this.overviewOosError=null,this.overviewShortageStats=null,this.overviewShortageError=null,this.agentsLoading=!1,this.agentsList=null,this.agentsError=null,this.agentsSelectedId=null,this.agentsPanel="overview",this.agentFilesLoading=!1,this.agentFilesError=null,this.agentFilesList=null,this.agentFileContents={},this.agentFileDrafts={},this.agentFileActive=null,this.agentFileSaving=!1,this.agentIdentityLoading=!1,this.agentIdentityError=null,this.agentIdentityById={},this.agentSkillsLoading=!1,this.agentSkillsError=null,this.agentSkillsReport=null,this.agentSkillsAgentId=null,this.sessionsLoading=!1,this.sessionsResult=null,this.sessionsError=null,this.sessionsFilterActive="",this.sessionsFilterLimit="120",this.sessionsIncludeGlobal=!0,this.sessionsIncludeUnknown=!1,this.usageLoading=!1,this.usageResult=null,this.usageCostSummary=null,this.usageError=null,this.usageRequestSeq=0,this.usageTimeSeriesRequestSeq=0,this.usageSessionLogsRequestSeq=0,this.usageStartDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageEndDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageSelectedSessions=[],this.usageSelectedDays=[],this.usageSelectedHours=[],this.usageChartMode="tokens",this.usageDailyChartMode="by-type",this.usageTimeSeriesMode="per-turn",this.usageTimeSeriesBreakdownMode="by-type",this.usageTimeSeries=null,this.usageTimeSeriesLoading=!1,this.usageTimeSeriesCursorStart=null,this.usageTimeSeriesCursorEnd=null,this.usageSessionLogs=null,this.usageSessionLogsLoading=!1,this.usageSessionLogsExpanded=!1,this.usageQuery="",this.usageQueryDraft="",this.usageSessionSort="recent",this.usageSessionSortDir="desc",this.usageRecentSessions=[],this.usageTimeZone="local",this.usageContextExpanded=!1,this.usageHeaderPinned=!1,this.usageSessionsTab="all",this.usageVisibleColumns=["channel","agent","provider","model","messages","tools","errors","duration"],this.usageLogFilterRoles=[],this.usageLogFilterTools=[],this.usageLogFilterHasTools=!1,this.usageLogFilterQuery="",this.usageQueryDebounceTimer=null,this.workFilePaths=[],this.workRunning=!1,this.workProgressStage=0,this._workProgressInterval=null,this.workRunStatus="idle",this.workRunId=null,this.workPendingChoices=[],this.workSelections={},this.workResult=null,this.workError=null,this.workCustomerLevel="B_QUOTE",this.workDoRegisterOos=!0,this.cronLoading=!1,this.cronJobs=[],this.cronStatus=null,this.cronError=null,this.cronForm={...sg},this.cronRunsJobId=null,this.cronRuns=[],this.cronBusy=!1,this.skillsLoading=!1,this.skillsReport=null,this.skillsError=null,this.skillsFilter="",this.skillEdits={},this.skillsBusyKey=null,this.skillMessages={},this.debugLoading=!1,this.debugStatus=null,this.debugHealth=null,this.debugModels=[],this.debugHeartbeat=null,this.debugCallMethod="",this.debugCallParams="{}",this.debugCallResult=null,this.debugCallError=null,this.logsLoading=!1,this.logsError=null,this.logsFile=null,this.logsEntries=[],this.logsFilterText="",this.logsLevelFilters={...ig},this.logsAutoFollow=!0,this.logsTruncated=!1,this.logsCursor=null,this.logsLastFetchAt=null,this.logsLimit=500,this.logsMaxBytes=25e4,this.logsAtBottom=!0,this.client=null,this.chatScrollFrame=null,this.chatScrollTimeout=null,this.chatHasAutoScrolled=!1,this.chatUserNearBottom=!0,this.chatNewMessagesBelow=!1,this.nodesPollInterval=null,this.logsPollInterval=null,this.debugPollInterval=null,this.logsScrollFrame=null,this.toolStreamById=new Map,this.toolStreamOrder=[],this.refreshSessionsAfterChat=new Set,this.basePath="",this.popStateHandler=()=>_u(this),this.themeMedia=null,this.themeMediaHandler=null,this.topbarObserver=null,ws(this.settings.locale)&&tn.setLocale(this.settings.locale)}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),bg(this)}firstUpdated(){wg(this)}disconnectedCallback(){$g(this),super.disconnectedCallback()}updated(e){e.has("workRunning")&&(this.workRunning?(this.workProgressStage=-1,this._workProgressInterval!=null&&(clearInterval(this._workProgressInterval),this._workProgressInterval=null)):(this._workProgressInterval!=null&&(clearInterval(this._workProgressInterval),this._workProgressInterval=null),this.workProgressStage=0)),kg(this,e)}connect(){Qr(this)}handleChatScroll(e){Hc(this,e)}handleLogsScroll(e){qc(this,e)}exportLogs(e,t){Gc(e,t)}resetToolStream(){ni(this)}resetChatScroll(){Po(this)}scrollToBottom(e){Po(this),ln(this,!0,!!(e!=null&&e.smooth))}async loadAssistantIdentity(){await Vr(this)}applySettings(e){We(this,e)}setTab(e){bu(this,e)}setTheme(e,t){wu(this,e,t)}async loadOverview(){await Ur(this)}async loadCron(){await Bn(this)}async handleAbortChat(){await Hr(this)}removeQueuedMessage(e){Xu(this,e)}async handleUploadChatFile(e){try{const t=await qu(this.basePath,e);this.chatUploadedFile=t,this.lastError=null}catch(t){this.lastError=t instanceof Error?t.message:String(t)}}clearChatUploadedFile(){this.chatUploadedFile=null}setChatComposeDragOver(e){this.chatComposeDragOver=e}async handleComposeDrop(e){this.chatComposeDragOver=!1,await this.handleUploadChatFile(e)}async handleSendChat(e,t){await Zu(this,e,t)}async handleWhatsAppStart(e){await Rc(this,e)}async handleWhatsAppWait(){await Ic(this)}async handleWhatsAppLogout(){await Mc(this)}async handleChannelConfigSave(){await Fc(this)}async handleChannelConfigReload(){await Pc(this)}handleNostrProfileEdit(e,t){Nc(this,e,t)}handleNostrProfileCancel(){Bc(this)}handleNostrProfileFieldChange(e,t){Uc(this,e,t)}async handleNostrProfileSave(){await jc(this)}async handleNostrProfileImport(){await Kc(this)}handleNostrProfileToggleAdvanced(){zc(this)}async handleExecApprovalDecision(e){const t=this.execApprovalQueue[0];if(!(!t||!this.client||this.execApprovalBusy)){this.execApprovalBusy=!0,this.execApprovalError=null;try{await this.client.request("exec.approval.resolve",{id:t.id,decision:e}),this.execApprovalQueue=this.execApprovalQueue.filter(n=>n.id!==t.id)}catch(n){this.execApprovalError=`Exec approval failed: ${String(n)}`}finally{this.execApprovalBusy=!1}}}handleGatewayUrlConfirm(){const e=this.pendingGatewayUrl;e&&(this.pendingGatewayUrl=null,We(this,{...this.settings,gatewayUrl:e}),this.connect())}handleGatewayUrlCancel(){this.pendingGatewayUrl=null}handleOpenSidebar(e){this.sidebarCloseTimer!=null&&(window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=null),this.sidebarContent=e,this.sidebarError=null,this.sidebarOpen=!0}handleCloseSidebar(){this.sidebarOpen=!1,this.sidebarCloseTimer!=null&&window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=window.setTimeout(()=>{this.sidebarOpen||(this.sidebarContent=null,this.sidebarError=null,this.sidebarCloseTimer=null)},200)}handleSplitRatioChange(e){const t=Math.max(.4,Math.min(.7,e));this.splitRatio=t,this.applySettings({...this.settings,splitRatio:t})}render(){return Sm(this)}};p([v()],h.prototype,"settings",2);p([v()],h.prototype,"password",2);p([v()],h.prototype,"tab",2);p([v()],h.prototype,"onboarding",2);p([v()],h.prototype,"connected",2);p([v()],h.prototype,"theme",2);p([v()],h.prototype,"themeResolved",2);p([v()],h.prototype,"hello",2);p([v()],h.prototype,"lastError",2);p([v()],h.prototype,"eventLog",2);p([v()],h.prototype,"assistantName",2);p([v()],h.prototype,"assistantAvatar",2);p([v()],h.prototype,"assistantAgentId",2);p([v()],h.prototype,"sessionKey",2);p([v()],h.prototype,"chatLoading",2);p([v()],h.prototype,"chatSending",2);p([v()],h.prototype,"chatMessage",2);p([v()],h.prototype,"chatMessages",2);p([v()],h.prototype,"chatToolMessages",2);p([v()],h.prototype,"chatStream",2);p([v()],h.prototype,"chatStreamStartedAt",2);p([v()],h.prototype,"chatRunId",2);p([v()],h.prototype,"compactionStatus",2);p([v()],h.prototype,"chatAvatarUrl",2);p([v()],h.prototype,"chatThinkingLevel",2);p([v()],h.prototype,"chatQueue",2);p([v()],h.prototype,"chatAttachments",2);p([v()],h.prototype,"chatUploadedFile",2);p([v()],h.prototype,"chatComposeDragOver",2);p([v()],h.prototype,"chatManualRefreshInFlight",2);p([v()],h.prototype,"sidebarOpen",2);p([v()],h.prototype,"sidebarContent",2);p([v()],h.prototype,"sidebarError",2);p([v()],h.prototype,"splitRatio",2);p([v()],h.prototype,"nodesLoading",2);p([v()],h.prototype,"nodes",2);p([v()],h.prototype,"devicesLoading",2);p([v()],h.prototype,"devicesError",2);p([v()],h.prototype,"devicesList",2);p([v()],h.prototype,"execApprovalsLoading",2);p([v()],h.prototype,"execApprovalsSaving",2);p([v()],h.prototype,"execApprovalsDirty",2);p([v()],h.prototype,"execApprovalsSnapshot",2);p([v()],h.prototype,"execApprovalsForm",2);p([v()],h.prototype,"execApprovalsSelectedAgent",2);p([v()],h.prototype,"execApprovalsTarget",2);p([v()],h.prototype,"execApprovalsTargetNodeId",2);p([v()],h.prototype,"execApprovalQueue",2);p([v()],h.prototype,"execApprovalBusy",2);p([v()],h.prototype,"execApprovalError",2);p([v()],h.prototype,"pendingGatewayUrl",2);p([v()],h.prototype,"configLoading",2);p([v()],h.prototype,"configRaw",2);p([v()],h.prototype,"configRawOriginal",2);p([v()],h.prototype,"configValid",2);p([v()],h.prototype,"configIssues",2);p([v()],h.prototype,"configSaving",2);p([v()],h.prototype,"configApplying",2);p([v()],h.prototype,"updateRunning",2);p([v()],h.prototype,"applySessionKey",2);p([v()],h.prototype,"configSnapshot",2);p([v()],h.prototype,"configSchema",2);p([v()],h.prototype,"configSchemaVersion",2);p([v()],h.prototype,"configSchemaLoading",2);p([v()],h.prototype,"configUiHints",2);p([v()],h.prototype,"configForm",2);p([v()],h.prototype,"configFormOriginal",2);p([v()],h.prototype,"configFormDirty",2);p([v()],h.prototype,"configFormMode",2);p([v()],h.prototype,"configSearchQuery",2);p([v()],h.prototype,"configActiveSection",2);p([v()],h.prototype,"configActiveSubsection",2);p([v()],h.prototype,"channelsLoading",2);p([v()],h.prototype,"channelsSnapshot",2);p([v()],h.prototype,"channelsError",2);p([v()],h.prototype,"channelsLastSuccess",2);p([v()],h.prototype,"bkContent",2);p([v()],h.prototype,"bkLoading",2);p([v()],h.prototype,"bkError",2);p([v()],h.prototype,"bkSaving",2);p([v()],h.prototype,"bkLastSuccess",2);p([v()],h.prototype,"bkDependentFiles",2);p([v()],h.prototype,"whatsappLoginMessage",2);p([v()],h.prototype,"whatsappLoginQrDataUrl",2);p([v()],h.prototype,"whatsappLoginConnected",2);p([v()],h.prototype,"whatsappBusy",2);p([v()],h.prototype,"nostrProfileFormState",2);p([v()],h.prototype,"nostrProfileAccountId",2);p([v()],h.prototype,"presenceLoading",2);p([v()],h.prototype,"presenceEntries",2);p([v()],h.prototype,"presenceError",2);p([v()],h.prototype,"presenceStatus",2);p([v()],h.prototype,"oosLoading",2);p([v()],h.prototype,"oosError",2);p([v()],h.prototype,"oosStats",2);p([v()],h.prototype,"oosList",2);p([v()],h.prototype,"oosByFile",2);p([v()],h.prototype,"oosByTime",2);p([v()],h.prototype,"oosShowAddForm",2);p([v()],h.prototype,"oosDb",2);p([v()],h.prototype,"shortageLoading",2);p([v()],h.prototype,"shortageError",2);p([v()],h.prototype,"shortageStats",2);p([v()],h.prototype,"shortageList",2);p([v()],h.prototype,"shortageByFile",2);p([v()],h.prototype,"shortageByTime",2);p([v()],h.prototype,"shortageShowAddForm",2);p([v()],h.prototype,"shortageDb",2);p([v()],h.prototype,"overviewOosStats",2);p([v()],h.prototype,"overviewOosError",2);p([v()],h.prototype,"overviewShortageStats",2);p([v()],h.prototype,"overviewShortageError",2);p([v()],h.prototype,"agentsLoading",2);p([v()],h.prototype,"agentsList",2);p([v()],h.prototype,"agentsError",2);p([v()],h.prototype,"agentsSelectedId",2);p([v()],h.prototype,"agentsPanel",2);p([v()],h.prototype,"agentFilesLoading",2);p([v()],h.prototype,"agentFilesError",2);p([v()],h.prototype,"agentFilesList",2);p([v()],h.prototype,"agentFileContents",2);p([v()],h.prototype,"agentFileDrafts",2);p([v()],h.prototype,"agentFileActive",2);p([v()],h.prototype,"agentFileSaving",2);p([v()],h.prototype,"agentIdentityLoading",2);p([v()],h.prototype,"agentIdentityError",2);p([v()],h.prototype,"agentIdentityById",2);p([v()],h.prototype,"agentSkillsLoading",2);p([v()],h.prototype,"agentSkillsError",2);p([v()],h.prototype,"agentSkillsReport",2);p([v()],h.prototype,"agentSkillsAgentId",2);p([v()],h.prototype,"sessionsLoading",2);p([v()],h.prototype,"sessionsResult",2);p([v()],h.prototype,"sessionsError",2);p([v()],h.prototype,"sessionsFilterActive",2);p([v()],h.prototype,"sessionsFilterLimit",2);p([v()],h.prototype,"sessionsIncludeGlobal",2);p([v()],h.prototype,"sessionsIncludeUnknown",2);p([v()],h.prototype,"usageLoading",2);p([v()],h.prototype,"usageResult",2);p([v()],h.prototype,"usageCostSummary",2);p([v()],h.prototype,"usageError",2);p([v()],h.prototype,"usageStartDate",2);p([v()],h.prototype,"usageEndDate",2);p([v()],h.prototype,"usageSelectedSessions",2);p([v()],h.prototype,"usageSelectedDays",2);p([v()],h.prototype,"usageSelectedHours",2);p([v()],h.prototype,"usageChartMode",2);p([v()],h.prototype,"usageDailyChartMode",2);p([v()],h.prototype,"usageTimeSeriesMode",2);p([v()],h.prototype,"usageTimeSeriesBreakdownMode",2);p([v()],h.prototype,"usageTimeSeries",2);p([v()],h.prototype,"usageTimeSeriesLoading",2);p([v()],h.prototype,"usageTimeSeriesCursorStart",2);p([v()],h.prototype,"usageTimeSeriesCursorEnd",2);p([v()],h.prototype,"usageSessionLogs",2);p([v()],h.prototype,"usageSessionLogsLoading",2);p([v()],h.prototype,"usageSessionLogsExpanded",2);p([v()],h.prototype,"usageQuery",2);p([v()],h.prototype,"usageQueryDraft",2);p([v()],h.prototype,"usageSessionSort",2);p([v()],h.prototype,"usageSessionSortDir",2);p([v()],h.prototype,"usageRecentSessions",2);p([v()],h.prototype,"usageTimeZone",2);p([v()],h.prototype,"usageContextExpanded",2);p([v()],h.prototype,"usageHeaderPinned",2);p([v()],h.prototype,"usageSessionsTab",2);p([v()],h.prototype,"usageVisibleColumns",2);p([v()],h.prototype,"usageLogFilterRoles",2);p([v()],h.prototype,"usageLogFilterTools",2);p([v()],h.prototype,"usageLogFilterHasTools",2);p([v()],h.prototype,"usageLogFilterQuery",2);p([v()],h.prototype,"workFilePaths",2);p([v()],h.prototype,"workRunning",2);p([v()],h.prototype,"workProgressStage",2);p([v()],h.prototype,"workRunStatus",2);p([v()],h.prototype,"workRunId",2);p([v()],h.prototype,"workPendingChoices",2);p([v()],h.prototype,"workSelections",2);p([v()],h.prototype,"workResult",2);p([v()],h.prototype,"workError",2);p([v()],h.prototype,"workCustomerLevel",2);p([v()],h.prototype,"workDoRegisterOos",2);p([v()],h.prototype,"cronLoading",2);p([v()],h.prototype,"cronJobs",2);p([v()],h.prototype,"cronStatus",2);p([v()],h.prototype,"cronError",2);p([v()],h.prototype,"cronForm",2);p([v()],h.prototype,"cronRunsJobId",2);p([v()],h.prototype,"cronRuns",2);p([v()],h.prototype,"cronBusy",2);p([v()],h.prototype,"skillsLoading",2);p([v()],h.prototype,"skillsReport",2);p([v()],h.prototype,"skillsError",2);p([v()],h.prototype,"skillsFilter",2);p([v()],h.prototype,"skillEdits",2);p([v()],h.prototype,"skillsBusyKey",2);p([v()],h.prototype,"skillMessages",2);p([v()],h.prototype,"debugLoading",2);p([v()],h.prototype,"debugStatus",2);p([v()],h.prototype,"debugHealth",2);p([v()],h.prototype,"debugModels",2);p([v()],h.prototype,"debugHeartbeat",2);p([v()],h.prototype,"debugCallMethod",2);p([v()],h.prototype,"debugCallParams",2);p([v()],h.prototype,"debugCallResult",2);p([v()],h.prototype,"debugCallError",2);p([v()],h.prototype,"logsLoading",2);p([v()],h.prototype,"logsError",2);p([v()],h.prototype,"logsFile",2);p([v()],h.prototype,"logsEntries",2);p([v()],h.prototype,"logsFilterText",2);p([v()],h.prototype,"logsLevelFilters",2);p([v()],h.prototype,"logsAutoFollow",2);p([v()],h.prototype,"logsTruncated",2);p([v()],h.prototype,"logsCursor",2);p([v()],h.prototype,"logsLastFetchAt",2);p([v()],h.prototype,"logsLimit",2);p([v()],h.prototype,"logsMaxBytes",2);p([v()],h.prototype,"logsAtBottom",2);p([v()],h.prototype,"chatNewMessagesBelow",2);h=p([Xa("openclaw-app")],h);
//# sourceMappingURL=index-DV12mw4H.js.map
