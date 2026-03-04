var jl=Object.defineProperty;var Hl=(e,t,n)=>t in e?jl(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var j=(e,t,n)=>Hl(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _n=globalThis,gs=_n.ShadowRoot&&(_n.ShadyCSS===void 0||_n.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ps=Symbol(),$o=new WeakMap;let Wr=class{constructor(t,n,i){if(this._$cssResult$=!0,i!==ps)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(gs&&t===void 0){const i=n!==void 0&&n.length===1;i&&(t=$o.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&$o.set(n,t))}return t}toString(){return this.cssText}};const Kl=e=>new Wr(typeof e=="string"?e:e+"",void 0,ps),ql=(e,...t)=>{const n=e.length===1?e[0]:t.reduce((i,s,o)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[o+1],e[0]);return new Wr(n,e,ps)},Gl=(e,t)=>{if(gs)e.adoptedStyleSheets=t.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of t){const i=document.createElement("style"),s=_n.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=n.cssText,e.appendChild(i)}},ko=gs?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const i of t.cssRules)n+=i.cssText;return Kl(n)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Wl,defineProperty:Vl,getOwnPropertyDescriptor:Ql,getOwnPropertyNames:Jl,getOwnPropertySymbols:Yl,getPrototypeOf:Xl}=Object,ze=globalThis,xo=ze.trustedTypes,Zl=xo?xo.emptyScript:"",hi=ze.reactiveElementPolyfillSupport,qt=(e,t)=>e,Mn={toAttribute(e,t){switch(t){case Boolean:e=e?Zl:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},hs=(e,t)=>!Wl(e,t),So={attribute:!0,type:String,converter:Mn,reflect:!1,useDefault:!1,hasChanged:hs};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),ze.litPropertyMetadata??(ze.litPropertyMetadata=new WeakMap);let kt=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=So){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(t,n),!n.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,n);s!==void 0&&Vl(this.prototype,t,s)}}static getPropertyDescriptor(t,n,i){const{get:s,set:o}=Ql(this.prototype,t)??{get(){return this[n]},set(r){this[n]=r}};return{get:s,set(r){const a=s==null?void 0:s.call(this);o==null||o.call(this,r),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??So}static _$Ei(){if(this.hasOwnProperty(qt("elementProperties")))return;const t=Xl(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(qt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(qt("properties"))){const n=this.properties,i=[...Jl(n),...Yl(n)];for(const s of i)this.createProperty(s,n[s])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[i,s]of n)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[n,i]of this.elementProperties){const s=this._$Eu(n,i);s!==void 0&&this._$Eh.set(s,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)n.unshift(ko(s))}else t!==void 0&&n.push(ko(t));return n}static _$Eu(t,n){const i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(n=>n(this))}addController(t){var n;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((n=t.hostConnected)==null||n.call(t))}removeController(t){var n;(n=this._$EO)==null||n.delete(t)}_$E_(){const t=new Map,n=this.constructor.elementProperties;for(const i of n.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Gl(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(n=>{var i;return(i=n.hostConnected)==null?void 0:i.call(n)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(n=>{var i;return(i=n.hostDisconnected)==null?void 0:i.call(n)})}attributeChangedCallback(t,n,i){this._$AK(t,i)}_$ET(t,n){var o;const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const r=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:Mn).toAttribute(n,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,n){var o,r;const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const a=i.getPropertyOptions(s),l=typeof a.converter=="function"?{fromAttribute:a.converter}:((o=a.converter)==null?void 0:o.fromAttribute)!==void 0?a.converter:Mn;this._$Em=s;const d=l.fromAttribute(n,a.type);this[s]=d??((r=this._$Ej)==null?void 0:r.get(s))??d,this._$Em=null}}requestUpdate(t,n,i,s=!1,o){var r;if(t!==void 0){const a=this.constructor;if(s===!1&&(o=this[t]),i??(i=a.getPropertyOptions(t)),!((i.hasChanged??hs)(o,n)||i.useDefault&&i.reflect&&o===((r=this._$Ej)==null?void 0:r.get(t))&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,n,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,r??n??this[t]),o!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(n=void 0),this._$AL.set(t,n)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,r]of this._$Ep)this[o]=r;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,r]of s){const{wrapped:a}=r,l=this[o];a!==!0||this._$AL.has(o)||l===void 0||this.C(o,void 0,r,l)}}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),(i=this._$EO)==null||i.forEach(s=>{var o;return(o=s.hostUpdate)==null?void 0:o.call(s)}),this.update(n)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(n)}willUpdate(t){}_$AE(t){var n;(n=this._$EO)==null||n.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(n=>this._$ET(n,this[n]))),this._$EM()}updated(t){}firstUpdated(t){}};kt.elementStyles=[],kt.shadowRootOptions={mode:"open"},kt[qt("elementProperties")]=new Map,kt[qt("finalized")]=new Map,hi==null||hi({ReactiveElement:kt}),(ze.reactiveElementVersions??(ze.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Gt=globalThis,Ao=e=>e,Pn=Gt.trustedTypes,_o=Pn?Pn.createPolicy("lit-html",{createHTML:e=>e}):void 0,Vr="$lit$",Ue=`lit$${Math.random().toFixed(9).slice(2)}$`,Qr="?"+Ue,ec=`<${Qr}>`,st=document,Yt=()=>st.createComment(""),Xt=e=>e===null||typeof e!="object"&&typeof e!="function",vs=Array.isArray,tc=e=>vs(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",vi=`[ 	
\f\r]`,Pt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Co=/-->/g,To=/>/g,Je=RegExp(`>|${vi}(?:([^\\s"'>=/]+)(${vi}*=${vi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Eo=/'/g,Lo=/"/g,Jr=/^(?:script|style|textarea|title)$/i,nc=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=nc(1),He=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),Ro=new WeakMap,tt=st.createTreeWalker(st,129);function Yr(e,t){if(!vs(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return _o!==void 0?_o.createHTML(t):t}const ic=(e,t)=>{const n=e.length-1,i=[];let s,o=t===2?"<svg>":t===3?"<math>":"",r=Pt;for(let a=0;a<n;a++){const l=e[a];let d,f,u=-1,g=0;for(;g<l.length&&(r.lastIndex=g,f=r.exec(l),f!==null);)g=r.lastIndex,r===Pt?f[1]==="!--"?r=Co:f[1]!==void 0?r=To:f[2]!==void 0?(Jr.test(f[2])&&(s=RegExp("</"+f[2],"g")),r=Je):f[3]!==void 0&&(r=Je):r===Je?f[0]===">"?(r=s??Pt,u=-1):f[1]===void 0?u=-2:(u=r.lastIndex-f[2].length,d=f[1],r=f[3]===void 0?Je:f[3]==='"'?Lo:Eo):r===Lo||r===Eo?r=Je:r===Co||r===To?r=Pt:(r=Je,s=void 0);const y=r===Je&&e[a+1].startsWith("/>")?" ":"";o+=r===Pt?l+ec:u>=0?(i.push(d),l.slice(0,u)+Vr+l.slice(u)+Ue+y):l+Ue+(u===-2?a:y)}return[Yr(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class Zt{constructor({strings:t,_$litType$:n},i){let s;this.parts=[];let o=0,r=0;const a=t.length-1,l=this.parts,[d,f]=ic(t,n);if(this.el=Zt.createElement(d,i),tt.currentNode=this.el.content,n===2||n===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=tt.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(const u of s.getAttributeNames())if(u.endsWith(Vr)){const g=f[r++],y=s.getAttribute(u).split(Ue),b=/([.?@])?(.*)/.exec(g);l.push({type:1,index:o,name:b[2],strings:y,ctor:b[1]==="."?oc:b[1]==="?"?rc:b[1]==="@"?ac:Hn}),s.removeAttribute(u)}else u.startsWith(Ue)&&(l.push({type:6,index:o}),s.removeAttribute(u));if(Jr.test(s.tagName)){const u=s.textContent.split(Ue),g=u.length-1;if(g>0){s.textContent=Pn?Pn.emptyScript:"";for(let y=0;y<g;y++)s.append(u[y],Yt()),tt.nextNode(),l.push({type:2,index:++o});s.append(u[g],Yt())}}}else if(s.nodeType===8)if(s.data===Qr)l.push({type:2,index:o});else{let u=-1;for(;(u=s.data.indexOf(Ue,u+1))!==-1;)l.push({type:7,index:o}),u+=Ue.length-1}o++}}static createElement(t,n){const i=st.createElement("template");return i.innerHTML=t,i}}function At(e,t,n=e,i){var r,a;if(t===He)return t;let s=i!==void 0?(r=n._$Co)==null?void 0:r[i]:n._$Cl;const o=Xt(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==o&&((a=s==null?void 0:s._$AO)==null||a.call(s,!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,i)),i!==void 0?(n._$Co??(n._$Co=[]))[i]=s:n._$Cl=s),s!==void 0&&(t=At(e,s._$AS(e,t.values),s,i)),t}class sc{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??st).importNode(n,!0);tt.currentNode=s;let o=tt.nextNode(),r=0,a=0,l=i[0];for(;l!==void 0;){if(r===l.index){let d;l.type===2?d=new jn(o,o.nextSibling,this,t):l.type===1?d=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(d=new lc(o,this,t)),this._$AV.push(d),l=i[++a]}r!==(l==null?void 0:l.index)&&(o=tt.nextNode(),r++)}return tt.currentNode=st,s}p(t){let n=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,n),n+=i.strings.length-2):i._$AI(t[n])),n++}}let jn=class Xr{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,n,i,s){this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=At(this,t,n),Xt(t)?t===w||t==null||t===""?(this._$AH!==w&&this._$AR(),this._$AH=w):t!==this._$AH&&t!==He&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):tc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==w&&Xt(this._$AH)?this._$AA.nextSibling.data=t:this.T(st.createTextNode(t)),this._$AH=t}$(t){var o;const{values:n,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=Zt.createElement(Yr(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===s)this._$AH.p(n);else{const r=new sc(s,this),a=r.u(this.options);r.p(n),this.T(a),this._$AH=r}}_$AC(t){let n=Ro.get(t.strings);return n===void 0&&Ro.set(t.strings,n=new Zt(t)),n}k(t){vs(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let i,s=0;for(const o of t)s===n.length?n.push(i=new Xr(this.O(Yt()),this.O(Yt()),this,this.options)):i=n[s],i._$AI(o),s++;s<n.length&&(this._$AR(i&&i._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,n);t!==this._$AB;){const s=Ao(t).nextSibling;Ao(t).remove(),t=s}}setConnected(t){var n;this._$AM===void 0&&(this._$Cv=t,(n=this._$AP)==null||n.call(this,t))}},Hn=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,i,s,o){this.type=1,this._$AH=w,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=w}_$AI(t,n=this,i,s){const o=this.strings;let r=!1;if(o===void 0)t=At(this,t,n,0),r=!Xt(t)||t!==this._$AH&&t!==He,r&&(this._$AH=t);else{const a=t;let l,d;for(t=o[0],l=0;l<o.length-1;l++)d=At(this,a[i+l],n,l),d===He&&(d=this._$AH[l]),r||(r=!Xt(d)||d!==this._$AH[l]),d===w?t=w:t!==w&&(t+=(d??"")+o[l+1]),this._$AH[l]=d}r&&!s&&this.j(t)}j(t){t===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},oc=class extends Hn{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===w?void 0:t}},rc=class extends Hn{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==w)}},ac=class extends Hn{constructor(t,n,i,s,o){super(t,n,i,s,o),this.type=5}_$AI(t,n=this){if((t=At(this,t,n,0)??w)===He)return;const i=this._$AH,s=t===w&&i!==w||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==w&&(i===w||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var n;typeof this._$AH=="function"?this._$AH.call(((n=this.options)==null?void 0:n.host)??this.element,t):this._$AH.handleEvent(t)}},lc=class{constructor(t,n,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){At(this,t)}};const cc={I:jn},mi=Gt.litHtmlPolyfillSupport;mi==null||mi(Zt,jn),(Gt.litHtmlVersions??(Gt.litHtmlVersions=[])).push("3.3.2");const dc=(e,t,n)=>{const i=(n==null?void 0:n.renderBefore)??t;let s=i._$litPart$;if(s===void 0){const o=(n==null?void 0:n.renderBefore)??null;i._$litPart$=s=new jn(t.insertBefore(Yt(),o),o,void 0,n??{})}return s._$AI(e),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const it=globalThis;let St=class extends kt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var n;const t=super.createRenderRoot();return(n=this.renderOptions).renderBefore??(n.renderBefore=t.firstChild),t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=dc(n,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return He}};var Gr;St._$litElement$=!0,St.finalized=!0,(Gr=it.litElementHydrateSupport)==null||Gr.call(it,{LitElement:St});const yi=it.litElementPolyfillSupport;yi==null||yi({LitElement:St});(it.litElementVersions??(it.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Zr=e=>(t,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const uc={attribute:!0,type:String,converter:Mn,reflect:!1,hasChanged:hs},fc=(e=uc,t,n)=>{const{kind:i,metadata:s}=n;let o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),i==="setter"&&((e=Object.create(e)).wrapped=!0),o.set(n.name,e),i==="accessor"){const{name:r}=n;return{set(a){const l=t.get.call(this);t.set.call(this,a),this.requestUpdate(r,l,e,!0,a)},init(a){return a!==void 0&&this.C(r,void 0,e,a),a}}}if(i==="setter"){const{name:r}=n;return function(a){const l=this[r];t.call(this,a),this.requestUpdate(r,l,e,!0,a)}}throw Error("Unsupported decorator location: "+i)};function Kn(e){return(t,n)=>typeof n=="object"?fc(e,t,n):((i,s,o)=>{const r=s.hasOwnProperty(o);return s.constructor.createProperty(o,i),r?Object.getOwnPropertyDescriptor(s,o):void 0})(e,t,n)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function v(e){return Kn({...e,state:!0,attribute:!1})}const gc="modulepreload",pc=function(e,t){return new URL(e,t).href},Io={},bi=function(t,n,i){let s=Promise.resolve();if(n&&n.length>0){let r=function(f){return Promise.all(f.map(u=>Promise.resolve(u).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};const a=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),d=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));s=r(n.map(f=>{if(f=pc(f,i),f in Io)return;Io[f]=!0;const u=f.endsWith(".css"),g=u?'[rel="stylesheet"]':"";if(!!i)for(let k=a.length-1;k>=0;k--){const S=a[k];if(S.href===f&&(!u||S.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${f}"]${g}`))return;const b=document.createElement("link");if(b.rel=u?"stylesheet":gc,u||(b.as="script"),b.crossOrigin="",b.href=f,d&&b.setAttribute("nonce",d),document.head.appendChild(b),u)return new Promise((k,S)=>{b.addEventListener("load",k),b.addEventListener("error",()=>S(new Error(`Unable to preload CSS for ${f}`)))})}))}function o(r){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=r,window.dispatchEvent(a),!a.defaultPrevented)throw r}return s.then(r=>{for(const a of r||[])a.status==="rejected"&&o(a.reason);return t().catch(o)})},hc={common:{health:"Health",ok:"OK",offline:"Offline",connect:"Connect",refresh:"Refresh",enabled:"Enabled",disabled:"Disabled",na:"n/a",docs:"Docs",resources:"Resources"},nav:{chat:"Chat",control:"Control",agent:"Agent",settings:"Settings",expand:"Expand sidebar",collapse:"Collapse sidebar"},tabs:{agents:"Agents",overview:"Overview",channels:"Business Knowledge",instances:"Out of Stock",sessions:"Sessions",work:"Quotation",cron:"Order Fulfill",skills:"Skills",nodes:"Nodes",chat:"Chat",config:"Config",debug:"Debug",logs:"Logs"},subtitles:{agents:"Manage agent workspaces, tools, and identities.",overview:"Gateway status, entry points, and a fast health read.",channels:"Edit wanding_business_knowledge.md for selection and matching.",instances:"OOS dashboard: stats and product list without asking the agent.",sessions:"Inspect active sessions and adjust per-session defaults.",work:"Batch quotation: upload files, identify, match price and stock, fill and save.",cron:"Pending quotation drafts; confirm to create order and lock stock.",skills:"Manage skill availability and API key injection.",nodes:"Paired devices, capabilities, and command exposure.",chat:"Direct gateway chat session for quick interventions.",config:"Edit ~/.openclaw/openclaw.json safely.",debug:"Gateway snapshots, events, and manual RPC calls.",logs:"Live tail of the gateway file logs."},overview:{access:{title:"Gateway Access",subtitle:"Where the dashboard connects and how it authenticates.",wsUrl:"WebSocket URL",token:"Gateway Token",password:"Password (not stored)",sessionKey:"Default Session Key",language:"Language",connectHint:"Click Connect to apply connection changes.",trustedProxy:"Authenticated via trusted proxy."},snapshot:{title:"Snapshot",subtitle:"Latest gateway handshake information.",status:"Status",uptime:"Uptime",tickInterval:"Tick Interval",lastChannelsRefresh:"Last Channels Refresh",channelsHint:"Use Channels to link WhatsApp, Telegram, Discord, Signal, or iMessage."},stats:{instances:"Instances",instancesHint:"Presence beacons in the last 5 minutes.",sessions:"Sessions",sessionsHint:"Recent session keys tracked by the gateway.",cron:"Cron",cronNext:"Next wake {time}"},notes:{title:"Notes",subtitle:"Quick reminders for remote control setups.",tailscaleTitle:"Tailscale serve",tailscaleText:"Prefer serve mode to keep the gateway on loopback with tailnet auth.",sessionTitle:"Session hygiene",sessionText:"Use /new or sessions.patch to reset context.",cronTitle:"Cron reminders",cronText:"Use isolated sessions for recurring runs."},auth:{required:"This gateway requires auth. Add a token or password, then click Connect.",failed:"Auth failed. Re-copy a tokenized URL with {command}, or update the token, then click Connect."},insecure:{hint:"This page is HTTP, so the browser blocks device identity. Use HTTPS (Tailscale Serve) or open {url} on the gateway host.",stayHttp:"If you must stay on HTTP, set {config} (token-only)."}},chat:{disconnected:"Disconnected from gateway.",refreshTitle:"Refresh chat data",thinkingToggle:"Toggle assistant thinking/working output",focusToggle:"Toggle focus mode (hide sidebar + page header)",onboardingDisabled:"Disabled during onboarding"},languages:{en:"English",zhCN:"简体中文 (Simplified Chinese)",zhTW:"繁體中文 (Traditional Chinese)",ptBR:"Português (Brazilian Portuguese)"}},vc=["en","zh-CN","zh-TW","pt-BR"];function ms(e){return e!=null&&vc.includes(e)}class mc{constructor(){this.locale="en",this.translations={en:hc},this.subscribers=new Set,this.loadLocale()}loadLocale(){const t=localStorage.getItem("openclaw.i18n.locale");if(ms(t))this.locale=t;else{const n=navigator.language;n.startsWith("zh")?this.locale=n==="zh-TW"||n==="zh-HK"?"zh-TW":"zh-CN":n.startsWith("pt")?this.locale="pt-BR":this.locale="en"}}getLocale(){return this.locale}async setLocale(t){if(this.locale!==t){if(!this.translations[t])try{let n;if(t==="zh-CN")n=await bi(()=>import("./zh-CN-3hVSS56W.js"),[],import.meta.url);else if(t==="zh-TW")n=await bi(()=>import("./zh-TW-B7H4kk0G.js"),[],import.meta.url);else if(t==="pt-BR")n=await bi(()=>import("./pt-BR-CAUgEH0a.js"),[],import.meta.url);else return;this.translations[t]=n[t.replace("-","_")]}catch(n){console.error(`Failed to load locale: ${t}`,n);return}this.locale=t,localStorage.setItem("openclaw.i18n.locale",t),this.notify()}}registerTranslation(t,n){this.translations[t]=n}subscribe(t){return this.subscribers.add(t),()=>this.subscribers.delete(t)}notify(){this.subscribers.forEach(t=>t(this.locale))}t(t,n){const i=t.split(".");let s=this.translations[this.locale]||this.translations.en;for(const o of i)if(s&&typeof s=="object")s=s[o];else{s=void 0;break}if(s===void 0&&this.locale!=="en"){s=this.translations.en;for(const o of i)if(s&&typeof s=="object")s=s[o];else{s=void 0;break}}return typeof s!="string"?t:n?s.replace(/\{(\w+)\}/g,(o,r)=>n[r]||`{${r}}`):s}}const en=new mc,T=(e,t)=>en.t(e,t);class yc{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){this.unsubscribe=en.subscribe(()=>{this.host.requestUpdate()})}hostDisconnected(){var t;(t=this.unsubscribe)==null||t.call(this)}}async function ye(e,t){if(!(!e.client||!e.connected)&&!e.channelsLoading){e.channelsLoading=!0,e.channelsError=null;try{const n=await e.client.request("channels.status",{probe:t,timeoutMs:8e3});e.channelsSnapshot=n,e.channelsLastSuccess=Date.now()}catch(n){e.channelsError=String(n)}finally{e.channelsLoading=!1}}}async function bc(e,t){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const n=await e.client.request("web.login.start",{force:t,timeoutMs:3e4});e.whatsappLoginMessage=n.message??null,e.whatsappLoginQrDataUrl=n.qrDataUrl??null,e.whatsappLoginConnected=null}catch(n){e.whatsappLoginMessage=String(n),e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function wc(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const t=await e.client.request("web.login.wait",{timeoutMs:12e4});e.whatsappLoginMessage=t.message??null,e.whatsappLoginConnected=t.connected??null,t.connected&&(e.whatsappLoginQrDataUrl=null)}catch(t){e.whatsappLoginMessage=String(t),e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function $c(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{await e.client.request("channels.logout",{channel:"whatsapp"}),e.whatsappLoginMessage="Logged out.",e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}catch(t){e.whatsappLoginMessage=String(t)}finally{e.whatsappBusy=!1}}}function ve(e){if(e)return Array.isArray(e.type)?e.type.filter(n=>n!=="null")[0]??e.type[0]:e.type}function ea(e){if(!e)return"";if(e.default!==void 0)return e.default;switch(ve(e)){case"object":return{};case"array":return[];case"boolean":return!1;case"number":case"integer":return 0;case"string":return"";default:return""}}function ys(e){return e.filter(t=>typeof t=="string").join(".")}function me(e,t){const n=ys(e),i=t[n];if(i)return i;const s=n.split(".");for(const[o,r]of Object.entries(t)){if(!o.includes("*"))continue;const a=o.split(".");if(a.length!==s.length)continue;let l=!0;for(let d=0;d<s.length;d+=1)if(a[d]!=="*"&&a[d]!==s[d]){l=!1;break}if(l)return r}}function Oe(e){return e.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/\s+/g," ").replace(/^./,t=>t.toUpperCase())}function Mo(e,t){const n=e.trim();if(n==="")return;const i=Number(n);return!Number.isFinite(i)||t&&!Number.isInteger(i)?e:i}function Po(e){const t=e.trim();return t==="true"?!0:t==="false"?!1:e}function Be(e,t){if(e==null)return e;if(t.allOf&&t.allOf.length>0){let i=e;for(const s of t.allOf)i=Be(i,s);return i}const n=ve(t);if(t.anyOf||t.oneOf){const i=(t.anyOf??t.oneOf??[]).filter(s=>!(s.type==="null"||Array.isArray(s.type)&&s.type.includes("null")));if(i.length===1)return Be(e,i[0]);if(typeof e=="string")for(const s of i){const o=ve(s);if(o==="number"||o==="integer"){const r=Mo(e,o==="integer");if(r===void 0||typeof r=="number")return r}if(o==="boolean"){const r=Po(e);if(typeof r=="boolean")return r}}for(const s of i){const o=ve(s);if(o==="object"&&typeof e=="object"&&!Array.isArray(e)||o==="array"&&Array.isArray(e))return Be(e,s)}return e}if(n==="number"||n==="integer"){if(typeof e=="string"){const i=Mo(e,n==="integer");if(i===void 0||typeof i=="number")return i}return e}if(n==="boolean"){if(typeof e=="string"){const i=Po(e);if(typeof i=="boolean")return i}return e}if(n==="object"){if(typeof e!="object"||Array.isArray(e))return e;const i=e,s=t.properties??{},o=t.additionalProperties&&typeof t.additionalProperties=="object"?t.additionalProperties:null,r={};for(const[a,l]of Object.entries(i)){const d=s[a]??o,f=d?Be(l,d):l;f!==void 0&&(r[a]=f)}return r}if(n==="array"){if(!Array.isArray(e))return e;if(Array.isArray(t.items)){const s=t.items;return e.map((o,r)=>{const a=r<s.length?s[r]:void 0;return a?Be(o,a):o})}const i=t.items;return i?e.map(s=>Be(s,i)).filter(s=>s!==void 0):e}return e}function ot(e){return typeof structuredClone=="function"?structuredClone(e):JSON.parse(JSON.stringify(e))}function tn(e){return`${JSON.stringify(e,null,2).trimEnd()}
`}function ta(e,t,n){if(t.length===0)return;let i=e;for(let o=0;o<t.length-1;o+=1){const r=t[o],a=t[o+1];if(typeof r=="number"){if(!Array.isArray(i))return;i[r]==null&&(i[r]=typeof a=="number"?[]:{}),i=i[r]}else{if(typeof i!="object"||i==null)return;const l=i;l[r]==null&&(l[r]=typeof a=="number"?[]:{}),i=l[r]}}const s=t[t.length-1];if(typeof s=="number"){Array.isArray(i)&&(i[s]=n);return}typeof i=="object"&&i!=null&&(i[s]=n)}function na(e,t){if(t.length===0)return;let n=e;for(let s=0;s<t.length-1;s+=1){const o=t[s];if(typeof o=="number"){if(!Array.isArray(n))return;n=n[o]}else{if(typeof n!="object"||n==null)return;n=n[o]}if(n==null)return}const i=t[t.length-1];if(typeof i=="number"){Array.isArray(n)&&n.splice(i,1);return}typeof n=="object"&&n!=null&&delete n[i]}async function Ee(e){if(!(!e.client||!e.connected)){e.configLoading=!0,e.lastError=null;try{const t=await e.client.request("config.get",{});Sc(e,t)}catch(t){e.lastError=String(t)}finally{e.configLoading=!1}}}async function kc(e){if(!(!e.client||!e.connected)&&!e.configSchemaLoading){e.configSchemaLoading=!0;try{const t=await e.client.request("config.schema",{});xc(e,t)}catch(t){e.lastError=String(t)}finally{e.configSchemaLoading=!1}}}function xc(e,t){e.configSchema=t.schema??null,e.configUiHints=t.uiHints??{},e.configSchemaVersion=t.version??null}function Sc(e,t){e.configSnapshot=t;const n=typeof t.raw=="string"?t.raw:t.config&&typeof t.config=="object"?tn(t.config):e.configRaw;!e.configFormDirty||e.configFormMode==="raw"?e.configRaw=n:e.configForm?e.configRaw=tn(e.configForm):e.configRaw=n,e.configValid=typeof t.valid=="boolean"?t.valid:null,e.configIssues=Array.isArray(t.issues)?t.issues:[],e.configFormDirty||(e.configForm=ot(t.config??{}),e.configFormOriginal=ot(t.config??{}),e.configRawOriginal=n)}function Ac(e){return!e||typeof e!="object"||Array.isArray(e)?null:e}function ia(e){if(e.configFormMode!=="form"||!e.configForm)return e.configRaw;const t=Ac(e.configSchema),n=t?Be(e.configForm,t):e.configForm;return tn(n)}async function Cn(e){var t;if(!(!e.client||!e.connected)){e.configSaving=!0,e.lastError=null;try{const n=ia(e),i=(t=e.configSnapshot)==null?void 0:t.hash;if(!i){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.set",{raw:n,baseHash:i}),e.configFormDirty=!1,await Ee(e)}catch(n){e.lastError=String(n)}finally{e.configSaving=!1}}}async function _c(e){var t;if(!(!e.client||!e.connected)){e.configApplying=!0,e.lastError=null;try{const n=ia(e),i=(t=e.configSnapshot)==null?void 0:t.hash;if(!i){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.apply",{raw:n,baseHash:i,sessionKey:e.applySessionKey}),e.configFormDirty=!1,await Ee(e)}catch(n){e.lastError=String(n)}finally{e.configApplying=!1}}}async function Cc(e){if(!(!e.client||!e.connected)){e.updateRunning=!0,e.lastError=null;try{await e.client.request("update.run",{sessionKey:e.applySessionKey})}catch(t){e.lastError=String(t)}finally{e.updateRunning=!1}}}function he(e,t,n){var s;const i=ot(e.configForm??((s=e.configSnapshot)==null?void 0:s.config)??{});ta(i,t,n),e.configForm=i,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=tn(i))}function Pe(e,t){var i;const n=ot(e.configForm??((i=e.configSnapshot)==null?void 0:i.config)??{});na(n,t),e.configForm=n,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=tn(n))}function Tc(e){const t={name:(e==null?void 0:e.name)??"",displayName:(e==null?void 0:e.displayName)??"",about:(e==null?void 0:e.about)??"",picture:(e==null?void 0:e.picture)??"",banner:(e==null?void 0:e.banner)??"",website:(e==null?void 0:e.website)??"",nip05:(e==null?void 0:e.nip05)??"",lud16:(e==null?void 0:e.lud16)??""};return{values:t,original:{...t},saving:!1,importing:!1,error:null,success:null,fieldErrors:{},showAdvanced:!!(e!=null&&e.banner||e!=null&&e.website||e!=null&&e.nip05||e!=null&&e.lud16)}}async function Ec(e,t){await bc(e,t),await ye(e,!0)}async function Lc(e){await wc(e),await ye(e,!0)}async function Rc(e){await $c(e),await ye(e,!0)}async function Ic(e){await Cn(e),await Ee(e),await ye(e,!0)}async function Mc(e){await Ee(e),await ye(e,!0)}function Pc(e){if(!Array.isArray(e))return{};const t={};for(const n of e){if(typeof n!="string")continue;const[i,...s]=n.split(":");if(!i||s.length===0)continue;const o=i.trim(),r=s.join(":").trim();o&&r&&(t[o]=r)}return t}function sa(e){var n,i,s;return((s=(((i=(n=e.channelsSnapshot)==null?void 0:n.channelAccounts)==null?void 0:i.nostr)??[])[0])==null?void 0:s.accountId)??e.nostrProfileAccountId??"default"}function oa(e,t=""){return`/api/channels/nostr/${encodeURIComponent(e)}/profile${t}`}function Fc(e){var s,o,r;const t=(r=(o=(s=e.hello)==null?void 0:s.auth)==null?void 0:o.deviceToken)==null?void 0:r.trim();if(t)return`Bearer ${t}`;const n=e.settings.token.trim();if(n)return`Bearer ${n}`;const i=e.password.trim();return i?`Bearer ${i}`:null}function ra(e){const t=Fc(e);return t?{Authorization:t}:{}}function Dc(e,t,n){e.nostrProfileAccountId=t,e.nostrProfileFormState=Tc(n??void 0)}function Oc(e){e.nostrProfileFormState=null,e.nostrProfileAccountId=null}function Nc(e,t,n){const i=e.nostrProfileFormState;i&&(e.nostrProfileFormState={...i,values:{...i.values,[t]:n},fieldErrors:{...i.fieldErrors,[t]:""}})}function Bc(e){const t=e.nostrProfileFormState;t&&(e.nostrProfileFormState={...t,showAdvanced:!t.showAdvanced})}async function Uc(e){const t=e.nostrProfileFormState;if(!t||t.saving)return;const n=sa(e);e.nostrProfileFormState={...t,saving:!0,error:null,success:null,fieldErrors:{}};try{const i=await fetch(oa(n),{method:"PUT",headers:{"Content-Type":"application/json",...ra(e)},body:JSON.stringify(t.values)}),s=await i.json().catch(()=>null);if(!i.ok||(s==null?void 0:s.ok)===!1||!s){const o=(s==null?void 0:s.error)??`Profile update failed (${i.status})`;e.nostrProfileFormState={...t,saving:!1,error:o,success:null,fieldErrors:Pc(s==null?void 0:s.details)};return}if(!s.persisted){e.nostrProfileFormState={...t,saving:!1,error:"Profile publish failed on all relays.",success:null};return}e.nostrProfileFormState={...t,saving:!1,error:null,success:"Profile published to relays.",fieldErrors:{},original:{...t.values}},await ye(e,!0)}catch(i){e.nostrProfileFormState={...t,saving:!1,error:`Profile update failed: ${String(i)}`,success:null}}}async function zc(e){const t=e.nostrProfileFormState;if(!t||t.importing)return;const n=sa(e);e.nostrProfileFormState={...t,importing:!0,error:null,success:null};try{const i=await fetch(oa(n,"/import"),{method:"POST",headers:{"Content-Type":"application/json",...ra(e)},body:JSON.stringify({autoMerge:!0})}),s=await i.json().catch(()=>null);if(!i.ok||(s==null?void 0:s.ok)===!1||!s){const l=(s==null?void 0:s.error)??`Profile import failed (${i.status})`;e.nostrProfileFormState={...t,importing:!1,error:l,success:null};return}const o=s.merged??s.imported??null,r=o?{...t.values,...o}:t.values,a=!!(r.banner||r.website||r.nip05||r.lud16);e.nostrProfileFormState={...t,importing:!1,values:r,error:null,success:s.saved?"Profile imported from relays. Review and publish.":"Profile imported. Review and publish.",showAdvanced:a},s.saved&&await ye(e,!0)}catch(i){e.nostrProfileFormState={...t,importing:!1,error:`Profile import failed: ${String(i)}`,success:null}}}function aa(e){var o;const t=(e??"").trim();if(!t)return null;const n=t.split(":").filter(Boolean);if(n.length<3||n[0]!=="agent")return null;const i=(o=n[1])==null?void 0:o.trim(),s=n.slice(2).join(":");return!i||!s?null:{agentId:i,rest:s}}const ji=450;function an(e,t=!1,n=!1){e.chatScrollFrame&&cancelAnimationFrame(e.chatScrollFrame),e.chatScrollTimeout!=null&&(clearTimeout(e.chatScrollTimeout),e.chatScrollTimeout=null);const i=()=>{const s=e.querySelector(".chat-thread");if(s){const o=getComputedStyle(s).overflowY;if(o==="auto"||o==="scroll"||s.scrollHeight-s.clientHeight>1)return s}return document.scrollingElement??document.documentElement};e.updateComplete.then(()=>{e.chatScrollFrame=requestAnimationFrame(()=>{e.chatScrollFrame=null;const s=i();if(!s)return;const o=s.scrollHeight-s.scrollTop-s.clientHeight,r=t&&!e.chatHasAutoScrolled;if(!(r||e.chatUserNearBottom||o<ji)){e.chatNewMessagesBelow=!0;return}r&&(e.chatHasAutoScrolled=!0);const l=n&&(typeof window>"u"||typeof window.matchMedia!="function"||!window.matchMedia("(prefers-reduced-motion: reduce)").matches),d=s.scrollHeight;typeof s.scrollTo=="function"?s.scrollTo({top:d,behavior:l?"smooth":"auto"}):s.scrollTop=d,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1;const f=r?150:120;e.chatScrollTimeout=window.setTimeout(()=>{e.chatScrollTimeout=null;const u=i();if(!u)return;const g=u.scrollHeight-u.scrollTop-u.clientHeight;(r||e.chatUserNearBottom||g<ji)&&(u.scrollTop=u.scrollHeight,e.chatUserNearBottom=!0)},f)})})}function la(e,t=!1){e.logsScrollFrame&&cancelAnimationFrame(e.logsScrollFrame),e.updateComplete.then(()=>{e.logsScrollFrame=requestAnimationFrame(()=>{e.logsScrollFrame=null;const n=e.querySelector(".log-stream");if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;(t||i<80)&&(n.scrollTop=n.scrollHeight)})})}function jc(e,t){const n=t.currentTarget;if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;e.chatUserNearBottom=i<ji,e.chatUserNearBottom&&(e.chatNewMessagesBelow=!1)}function Hc(e,t){const n=t.currentTarget;if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;e.logsAtBottom=i<80}function Fo(e){e.chatHasAutoScrolled=!1,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1}function Kc(e,t){if(e.length===0)return;const n=new Blob([`${e.join(`
`)}
`],{type:"text/plain"}),i=URL.createObjectURL(n),s=document.createElement("a"),o=new Date().toISOString().slice(0,19).replace(/[:T]/g,"-");s.href=i,s.download=`openclaw-logs-${t}-${o}.log`,s.click(),URL.revokeObjectURL(i)}function qc(e){if(typeof ResizeObserver>"u")return;const t=e.querySelector(".topbar");if(!t)return;const n=()=>{const{height:i}=t.getBoundingClientRect();e.style.setProperty("--topbar-height",`${i}px`)};n(),e.topbarObserver=new ResizeObserver(()=>n()),e.topbarObserver.observe(t)}async function qn(e){if(!(!e.client||!e.connected)&&!e.debugLoading){e.debugLoading=!0;try{const[t,n,i,s]=await Promise.all([e.client.request("status",{}),e.client.request("health",{}),e.client.request("models.list",{}),e.client.request("last-heartbeat",{})]);e.debugStatus=t,e.debugHealth=n;const o=i;e.debugModels=Array.isArray(o==null?void 0:o.models)?o==null?void 0:o.models:[],e.debugHeartbeat=s}catch(t){e.debugCallError=String(t)}finally{e.debugLoading=!1}}}async function Gc(e){if(!(!e.client||!e.connected)){e.debugCallError=null,e.debugCallResult=null;try{const t=e.debugCallParams.trim()?JSON.parse(e.debugCallParams):{},n=await e.client.request(e.debugCallMethod.trim(),t);e.debugCallResult=JSON.stringify(n,null,2)}catch(t){e.debugCallError=String(t)}}}const Wc=2e3,Vc=new Set(["trace","debug","info","warn","error","fatal"]);function Qc(e){if(typeof e!="string")return null;const t=e.trim();if(!t.startsWith("{")||!t.endsWith("}"))return null;try{const n=JSON.parse(t);return!n||typeof n!="object"?null:n}catch{return null}}function Jc(e){if(typeof e!="string")return null;const t=e.toLowerCase();return Vc.has(t)?t:null}function Yc(e){if(!e.trim())return{raw:e,message:e};try{const t=JSON.parse(e),n=t&&typeof t._meta=="object"&&t._meta!==null?t._meta:null,i=typeof t.time=="string"?t.time:typeof(n==null?void 0:n.date)=="string"?n==null?void 0:n.date:null,s=Jc((n==null?void 0:n.logLevelName)??(n==null?void 0:n.level)),o=typeof t[0]=="string"?t[0]:typeof(n==null?void 0:n.name)=="string"?n==null?void 0:n.name:null,r=Qc(o);let a=null;r&&(typeof r.subsystem=="string"?a=r.subsystem:typeof r.module=="string"&&(a=r.module)),!a&&o&&o.length<120&&(a=o);let l=null;return typeof t[1]=="string"?l=t[1]:!r&&typeof t[0]=="string"?l=t[0]:typeof t.message=="string"&&(l=t.message),{raw:e,time:i,level:s,subsystem:a,message:l??e,meta:n??void 0}}catch{return{raw:e,message:e}}}async function bs(e,t){if(!(!e.client||!e.connected)&&!(e.logsLoading&&!(t!=null&&t.quiet))){t!=null&&t.quiet||(e.logsLoading=!0),e.logsError=null;try{const i=await e.client.request("logs.tail",{cursor:t!=null&&t.reset?void 0:e.logsCursor??void 0,limit:e.logsLimit,maxBytes:e.logsMaxBytes}),o=(Array.isArray(i.lines)?i.lines.filter(a=>typeof a=="string"):[]).map(Yc),r=!!(t!=null&&t.reset||i.reset||e.logsCursor==null);e.logsEntries=r?o:[...e.logsEntries,...o].slice(-Wc),typeof i.cursor=="number"&&(e.logsCursor=i.cursor),typeof i.file=="string"&&(e.logsFile=i.file),e.logsTruncated=!!i.truncated,e.logsLastFetchAt=Date.now()}catch(n){e.logsError=String(n)}finally{t!=null&&t.quiet||(e.logsLoading=!1)}}}async function Gn(e,t){if(!(!e.client||!e.connected)&&!e.nodesLoading){e.nodesLoading=!0,t!=null&&t.quiet||(e.lastError=null);try{const n=await e.client.request("node.list",{});e.nodes=Array.isArray(n.nodes)?n.nodes:[]}catch(n){t!=null&&t.quiet||(e.lastError=String(n))}finally{e.nodesLoading=!1}}}function Xc(e){e.nodesPollInterval==null&&(e.nodesPollInterval=window.setInterval(()=>void Gn(e,{quiet:!0}),5e3))}function Zc(e){e.nodesPollInterval!=null&&(clearInterval(e.nodesPollInterval),e.nodesPollInterval=null)}function ws(e){e.logsPollInterval==null&&(e.logsPollInterval=window.setInterval(()=>{e.tab==="logs"&&bs(e,{quiet:!0})},2e3))}function $s(e){e.logsPollInterval!=null&&(clearInterval(e.logsPollInterval),e.logsPollInterval=null)}function ks(e){e.debugPollInterval==null&&(e.debugPollInterval=window.setInterval(()=>{e.tab==="debug"&&qn(e)},3e3))}function xs(e){e.debugPollInterval!=null&&(clearInterval(e.debugPollInterval),e.debugPollInterval=null)}async function ca(e,t){if(!(!e.client||!e.connected||e.agentIdentityLoading)&&!e.agentIdentityById[t]){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{const n=await e.client.request("agent.identity.get",{agentId:t});n&&(e.agentIdentityById={...e.agentIdentityById,[t]:n})}catch(n){e.agentIdentityError=String(n)}finally{e.agentIdentityLoading=!1}}}async function da(e,t){if(!e.client||!e.connected||e.agentIdentityLoading)return;const n=t.filter(i=>!e.agentIdentityById[i]);if(n.length!==0){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{for(const i of n){const s=await e.client.request("agent.identity.get",{agentId:i});s&&(e.agentIdentityById={...e.agentIdentityById,[i]:s})}}catch(i){e.agentIdentityError=String(i)}finally{e.agentIdentityLoading=!1}}}async function Tn(e,t){if(!(!e.client||!e.connected)&&!e.agentSkillsLoading){e.agentSkillsLoading=!0,e.agentSkillsError=null;try{const n=await e.client.request("skills.status",{agentId:t});n&&(e.agentSkillsReport=n,e.agentSkillsAgentId=t)}catch(n){e.agentSkillsError=String(n)}finally{e.agentSkillsLoading=!1}}}async function Ss(e){var t;if(!(!e.client||!e.connected)&&!e.agentsLoading){e.agentsLoading=!0,e.agentsError=null;try{const n=await e.client.request("agents.list",{});if(n){e.agentsList=n;const i=e.agentsSelectedId,s=n.agents.some(o=>o.id===i);(!i||!s)&&(e.agentsSelectedId=n.defaultId??((t=n.agents[0])==null?void 0:t.id)??null)}}catch(n){e.agentsError=String(n)}finally{e.agentsLoading=!1}}}function As(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}async function ed(e){try{const n=await(await fetch(As(e.basePath,"/api/business-knowledge/dependent-files"))).json().catch(()=>({}));n.success&&n.data?e.bkDependentFiles={mapping_table:n.data.mapping_table??"",price_library:n.data.price_library??""}:e.bkDependentFiles=null}catch{e.bkDependentFiles=null}}async function ua(e){e.bkLoading=!0,e.bkError=null,ed(e);try{const t=await fetch(As(e.basePath,"/api/business-knowledge")),n=await t.json().catch(()=>({}));n.success&&n.data&&typeof n.data.content=="string"?e.bkContent=n.data.content:(e.bkContent="",t.ok||(e.bkError=n.detail??`HTTP ${t.status}`))}catch(t){e.bkError=t instanceof Error?t.message:String(t),e.bkContent=""}finally{e.bkLoading=!1}}async function td(e,t){e.bkSaving=!0,e.bkError=null;try{const n=await fetch(As(e.basePath,"/api/business-knowledge"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:t})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(e.bkContent=t,e.bkLastSuccess=Date.now(),!0):(e.bkError=i.detail??`HTTP ${n.status}`,!1)}catch(n){return e.bkError=n instanceof Error?n.message:String(n),!1}finally{e.bkSaving=!1}}function fa(e){if(e==null||!Number.isFinite(e))return"n/a";const t=Math.floor(e/1e3),n=Math.floor(t/60),i=Math.floor(n/60);return i>0?`${i}h`:n>0?`${n}m`:t>0?`${t}s`:"<1s"}function qe(e){if(e==null||!Number.isFinite(e))return"n/a";const t=Date.now(),n=e-t,i=Math.abs(n),s=Math.floor(i/6e4),o=Math.floor(s/60),r=Math.floor(o/24);return n>0?s<1?"in <1m":s<60?`in ${s}m`:o<24?`in ${o}h`:`in ${r}d`:i<15e3?"just now":s<60?`${s}m ago`:o<24?`${o}h ago`:`${r}d ago`}function nd(e,t){return!e||typeof e!="string"?"":e.replace(/<think>[\s\S]*?<\/think>/gi,"").trim()}function Fn(e){return!e&&e!==0?"n/a":new Date(e).toLocaleString()}function Hi(e){return!e||e.length===0?"none":e.filter(t=>!!(t&&t.trim())).join(", ")}function Ki(e,t=120){return e.length<=t?e:`${e.slice(0,Math.max(0,t-1))}…`}function ga(e,t){return e.length<=t?{text:e,truncated:!1,total:e.length}:{text:e.slice(0,Math.max(0,t)),truncated:!0,total:e.length}}function Do(e,t){const n=Number(e);return Number.isFinite(n)?n:t}function wi(e){return nd(e)}async function pa(e){if(!(!e.client||!e.connected))try{const t=await e.client.request("cron.status",{});e.cronStatus=t}catch(t){e.cronError=String(t)}}async function id(e){if(!(!e.client||!e.connected)&&!e.cronLoading){e.cronLoading=!0,e.cronError=null;try{const t=await e.client.request("cron.list",{includeDisabled:!0});e.cronJobs=Array.isArray(t.jobs)?t.jobs:[]}catch(t){e.cronError=String(t)}finally{e.cronLoading=!1}}}function sd(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams(n);return`${s}?${o.toString()}`}async function _s(e){e.fulfillDraftsLoading=!0,e.fulfillDraftsError=null;try{const t=sd(e.basePath,"/api/quotation-drafts",{status:"pending",limit:"50"}),n=await fetch(t),i=await n.json().catch(()=>({}));if(!n.ok){e.fulfillDraftsError=i.detail??`HTTP ${n.status}`,e.fulfillDrafts=[];return}e.fulfillDrafts=i.data??[]}catch(t){e.fulfillDraftsError=t instanceof Error?t.message:String(t),e.fulfillDrafts=[]}finally{e.fulfillDraftsLoading=!1}}async function od(e,t){var n;e.fulfillDetailId=t;try{const i=(n=e.basePath)!=null&&n.trim()?`${e.basePath.replace(/\/$/,"")}/api/quotation-drafts/${t}`:`/api/quotation-drafts/${t}`,s=await fetch(i),o=await s.json().catch(()=>({}));if(!s.ok){e.fulfillDetail=null;return}e.fulfillDetail=o.data??null}catch{e.fulfillDetail=null}}async function rd(e,t){var n,i,s;e.fulfillConfirmBusy=!0,e.fulfillConfirmResult=null;try{const o=(n=e.basePath)!=null&&n.trim()?`${e.basePath.replace(/\/$/,"")}/api/quotation-drafts/${t}/confirm`:`/api/quotation-drafts/${t}/confirm`,r=await fetch(o,{method:"PATCH"}),a=await r.json().catch(()=>({}));if(!r.ok)return e.fulfillConfirmResult={message:a.detail??`HTTP ${r.status}`},e.fulfillConfirmResult;const l={order_id:((i=a.data)==null?void 0:i.order_id)??a.order_id,message:((s=a.data)==null?void 0:s.message)??a.message??"已确认成单"};return e.fulfillConfirmResult=l,e.fulfillDetail=null,e.fulfillDetailId=null,await _s(e),l}catch(o){const r=o instanceof Error?o.message:String(o);return e.fulfillConfirmResult={message:r},e.fulfillConfirmResult}finally{e.fulfillConfirmBusy=!1}}function Cs(e){return(e??"").trim().toLowerCase()||"viewer"}function ad(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").map(t=>t.trim()).filter(Boolean):[]}const ha="openclaw.device.auth.v1";function Ts(){try{const e=window.localStorage.getItem(ha);if(!e)return null;const t=JSON.parse(e);return!t||t.version!==1||!t.deviceId||typeof t.deviceId!="string"||!t.tokens||typeof t.tokens!="object"?null:t}catch{return null}}function va(e){try{window.localStorage.setItem(ha,JSON.stringify(e))}catch{}}function ld(e){const t=Ts();if(!t||t.deviceId!==e.deviceId)return null;const n=Cs(e.role),i=t.tokens[n];return!i||typeof i.token!="string"?null:i}function ma(e){const t=Cs(e.role),n={version:1,deviceId:e.deviceId,tokens:{}},i=Ts();i&&i.deviceId===e.deviceId&&(n.tokens={...i.tokens});const s={token:e.token,role:t,scopes:ad(e.scopes),updatedAtMs:Date.now()};return n.tokens[t]=s,va(n),s}function ya(e){const t=Ts();if(!t||t.deviceId!==e.deviceId)return;const n=Cs(e.role);if(!t.tokens[n])return;const i={...t,tokens:{...t.tokens}};delete i.tokens[n],va(i)}/*! noble-ed25519 - MIT License (c) 2019 Paul Miller (paulmillr.com) */const ba={p:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffedn,n:0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn,h:8n,a:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffecn,d:0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3n,Gx:0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an,Gy:0x6666666666666666666666666666666666666666666666666666666666666658n},{p:le,n:En,Gx:Oo,Gy:No,a:$i,d:ki,h:cd}=ba,rt=32,Es=64,dd=(...e)=>{"captureStackTrace"in Error&&typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(...e)},ne=(e="")=>{const t=new Error(e);throw dd(t,ne),t},ud=e=>typeof e=="bigint",fd=e=>typeof e=="string",gd=e=>e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array",Ge=(e,t,n="")=>{const i=gd(e),s=e==null?void 0:e.length,o=t!==void 0;if(!i||o&&s!==t){const r=n&&`"${n}" `,a=o?` of length ${t}`:"",l=i?`length=${s}`:`type=${typeof e}`;ne(r+"expected Uint8Array"+a+", got "+l)}return e},Wn=e=>new Uint8Array(e),wa=e=>Uint8Array.from(e),$a=(e,t)=>e.toString(16).padStart(t,"0"),ka=e=>Array.from(Ge(e)).map(t=>$a(t,2)).join(""),Fe={_0:48,_9:57,A:65,F:70,a:97,f:102},Bo=e=>{if(e>=Fe._0&&e<=Fe._9)return e-Fe._0;if(e>=Fe.A&&e<=Fe.F)return e-(Fe.A-10);if(e>=Fe.a&&e<=Fe.f)return e-(Fe.a-10)},xa=e=>{const t="hex invalid";if(!fd(e))return ne(t);const n=e.length,i=n/2;if(n%2)return ne(t);const s=Wn(i);for(let o=0,r=0;o<i;o++,r+=2){const a=Bo(e.charCodeAt(r)),l=Bo(e.charCodeAt(r+1));if(a===void 0||l===void 0)return ne(t);s[o]=a*16+l}return s},Sa=()=>globalThis==null?void 0:globalThis.crypto,pd=()=>{var e;return((e=Sa())==null?void 0:e.subtle)??ne("crypto.subtle must be defined, consider polyfill")},nn=(...e)=>{const t=Wn(e.reduce((i,s)=>i+Ge(s).length,0));let n=0;return e.forEach(i=>{t.set(i,n),n+=i.length}),t},hd=(e=rt)=>Sa().getRandomValues(Wn(e)),Dn=BigInt,Ze=(e,t,n,i="bad number: out of range")=>ud(e)&&t<=e&&e<n?e:ne(i),M=(e,t=le)=>{const n=e%t;return n>=0n?n:t+n},Aa=e=>M(e,En),vd=(e,t)=>{(e===0n||t<=0n)&&ne("no inverse n="+e+" mod="+t);let n=M(e,t),i=t,s=0n,o=1n;for(;n!==0n;){const r=i/n,a=i%n,l=s-o*r;i=n,n=a,s=o,o=l}return i===1n?M(s,t):ne("no inverse")},md=e=>{const t=Ea[e];return typeof t!="function"&&ne("hashes."+e+" not set"),t},xi=e=>e instanceof at?e:ne("Point expected"),qi=2n**256n,Te=class Te{constructor(t,n,i,s){j(this,"X");j(this,"Y");j(this,"Z");j(this,"T");const o=qi;this.X=Ze(t,0n,o),this.Y=Ze(n,0n,o),this.Z=Ze(i,1n,o),this.T=Ze(s,0n,o),Object.freeze(this)}static CURVE(){return ba}static fromAffine(t){return new Te(t.x,t.y,1n,M(t.x*t.y))}static fromBytes(t,n=!1){const i=ki,s=wa(Ge(t,rt)),o=t[31];s[31]=o&-129;const r=Ca(s);Ze(r,0n,n?qi:le);const l=M(r*r),d=M(l-1n),f=M(i*l+1n);let{isValid:u,value:g}=bd(d,f);u||ne("bad point: y not sqrt");const y=(g&1n)===1n,b=(o&128)!==0;return!n&&g===0n&&b&&ne("bad point: x==0, isLastByteOdd"),b!==y&&(g=M(-g)),new Te(g,r,1n,M(g*r))}static fromHex(t,n){return Te.fromBytes(xa(t),n)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}assertValidity(){const t=$i,n=ki,i=this;if(i.is0())return ne("bad point: ZERO");const{X:s,Y:o,Z:r,T:a}=i,l=M(s*s),d=M(o*o),f=M(r*r),u=M(f*f),g=M(l*t),y=M(f*M(g+d)),b=M(u+M(n*M(l*d)));if(y!==b)return ne("bad point: equation left != right (1)");const k=M(s*o),S=M(r*a);return k!==S?ne("bad point: equation left != right (2)"):this}equals(t){const{X:n,Y:i,Z:s}=this,{X:o,Y:r,Z:a}=xi(t),l=M(n*a),d=M(o*s),f=M(i*a),u=M(r*s);return l===d&&f===u}is0(){return this.equals(xt)}negate(){return new Te(M(-this.X),this.Y,this.Z,M(-this.T))}double(){const{X:t,Y:n,Z:i}=this,s=$i,o=M(t*t),r=M(n*n),a=M(2n*M(i*i)),l=M(s*o),d=t+n,f=M(M(d*d)-o-r),u=l+r,g=u-a,y=l-r,b=M(f*g),k=M(u*y),S=M(f*y),C=M(g*u);return new Te(b,k,C,S)}add(t){const{X:n,Y:i,Z:s,T:o}=this,{X:r,Y:a,Z:l,T:d}=xi(t),f=$i,u=ki,g=M(n*r),y=M(i*a),b=M(o*u*d),k=M(s*l),S=M((n+i)*(r+a)-g-y),C=M(k-b),D=M(k+b),L=M(y-f*g),R=M(S*C),x=M(D*L),m=M(S*L),A=M(C*D);return new Te(R,x,A,m)}subtract(t){return this.add(xi(t).negate())}multiply(t,n=!0){if(!n&&(t===0n||this.is0()))return xt;if(Ze(t,1n,En),t===1n)return this;if(this.equals(lt))return Ld(t).p;let i=xt,s=lt;for(let o=this;t>0n;o=o.double(),t>>=1n)t&1n?i=i.add(o):n&&(s=s.add(o));return i}multiplyUnsafe(t){return this.multiply(t,!1)}toAffine(){const{X:t,Y:n,Z:i}=this;if(this.equals(xt))return{x:0n,y:1n};const s=vd(i,le);M(i*s)!==1n&&ne("invalid inverse");const o=M(t*s),r=M(n*s);return{x:o,y:r}}toBytes(){const{x:t,y:n}=this.assertValidity().toAffine(),i=_a(n);return i[31]|=t&1n?128:0,i}toHex(){return ka(this.toBytes())}clearCofactor(){return this.multiply(Dn(cd),!1)}isSmallOrder(){return this.clearCofactor().is0()}isTorsionFree(){let t=this.multiply(En/2n,!1).double();return En%2n&&(t=t.add(this)),t.is0()}};j(Te,"BASE"),j(Te,"ZERO");let at=Te;const lt=new at(Oo,No,1n,M(Oo*No)),xt=new at(0n,1n,1n,0n);at.BASE=lt;at.ZERO=xt;const _a=e=>xa($a(Ze(e,0n,qi),Es)).reverse(),Ca=e=>Dn("0x"+ka(wa(Ge(e)).reverse())),Ae=(e,t)=>{let n=e;for(;t-- >0n;)n*=n,n%=le;return n},yd=e=>{const n=e*e%le*e%le,i=Ae(n,2n)*n%le,s=Ae(i,1n)*e%le,o=Ae(s,5n)*s%le,r=Ae(o,10n)*o%le,a=Ae(r,20n)*r%le,l=Ae(a,40n)*a%le,d=Ae(l,80n)*l%le,f=Ae(d,80n)*l%le,u=Ae(f,10n)*o%le;return{pow_p_5_8:Ae(u,2n)*e%le,b2:n}},Uo=0x2b8324804fc1df0b2b4d00993dfbd7a72f431806ad2fe478c4ee1b274a0ea0b0n,bd=(e,t)=>{const n=M(t*t*t),i=M(n*n*t),s=yd(e*i).pow_p_5_8;let o=M(e*n*s);const r=M(t*o*o),a=o,l=M(o*Uo),d=r===e,f=r===M(-e),u=r===M(-e*Uo);return d&&(o=a),(f||u)&&(o=l),(M(o)&1n)===1n&&(o=M(-o)),{isValid:d||f,value:o}},Gi=e=>Aa(Ca(e)),Ls=(...e)=>Ea.sha512Async(nn(...e)),wd=(...e)=>md("sha512")(nn(...e)),Ta=e=>{const t=e.slice(0,rt);t[0]&=248,t[31]&=127,t[31]|=64;const n=e.slice(rt,Es),i=Gi(t),s=lt.multiply(i),o=s.toBytes();return{head:t,prefix:n,scalar:i,point:s,pointBytes:o}},Rs=e=>Ls(Ge(e,rt)).then(Ta),$d=e=>Ta(wd(Ge(e,rt))),kd=e=>Rs(e).then(t=>t.pointBytes),xd=e=>Ls(e.hashable).then(e.finish),Sd=(e,t,n)=>{const{pointBytes:i,scalar:s}=e,o=Gi(t),r=lt.multiply(o).toBytes();return{hashable:nn(r,i,n),finish:d=>{const f=Aa(o+Gi(d)*s);return Ge(nn(r,_a(f)),Es)}}},Ad=async(e,t)=>{const n=Ge(e),i=await Rs(t),s=await Ls(i.prefix,n);return xd(Sd(i,s,n))},Ea={sha512Async:async e=>{const t=pd(),n=nn(e);return Wn(await t.digest("SHA-512",n.buffer))},sha512:void 0},_d=(e=hd(rt))=>e,Cd={getExtendedPublicKeyAsync:Rs,getExtendedPublicKey:$d,randomSecretKey:_d},On=8,Td=256,La=Math.ceil(Td/On)+1,Wi=2**(On-1),Ed=()=>{const e=[];let t=lt,n=t;for(let i=0;i<La;i++){n=t,e.push(n);for(let s=1;s<Wi;s++)n=n.add(t),e.push(n);t=n.double()}return e};let zo;const jo=(e,t)=>{const n=t.negate();return e?n:t},Ld=e=>{const t=zo||(zo=Ed());let n=xt,i=lt;const s=2**On,o=s,r=Dn(s-1),a=Dn(On);for(let l=0;l<La;l++){let d=Number(e&r);e>>=a,d>Wi&&(d-=o,e+=1n);const f=l*Wi,u=f,g=f+Math.abs(d)-1,y=l%2!==0,b=d<0;d===0?i=i.add(jo(y,t[u])):n=n.add(jo(b,t[g]))}return e!==0n&&ne("invalid wnaf"),{p:n,f:i}},Si="openclaw-device-identity-v1";function Vi(e){let t="";for(const n of e)t+=String.fromCharCode(n);return btoa(t).replaceAll("+","-").replaceAll("/","_").replace(/=+$/g,"")}function Ra(e){const t=e.replaceAll("-","+").replaceAll("_","/"),n=t+"=".repeat((4-t.length%4)%4),i=atob(n),s=new Uint8Array(i.length);for(let o=0;o<i.length;o+=1)s[o]=i.charCodeAt(o);return s}function Rd(e){return Array.from(e).map(t=>t.toString(16).padStart(2,"0")).join("")}async function Ia(e){const t=await crypto.subtle.digest("SHA-256",e.slice().buffer);return Rd(new Uint8Array(t))}async function Id(){const e=Cd.randomSecretKey(),t=await kd(e);return{deviceId:await Ia(t),publicKey:Vi(t),privateKey:Vi(e)}}async function Is(){try{const n=localStorage.getItem(Si);if(n){const i=JSON.parse(n);if((i==null?void 0:i.version)===1&&typeof i.deviceId=="string"&&typeof i.publicKey=="string"&&typeof i.privateKey=="string"){const s=await Ia(Ra(i.publicKey));if(s!==i.deviceId){const o={...i,deviceId:s};return localStorage.setItem(Si,JSON.stringify(o)),{deviceId:s,publicKey:i.publicKey,privateKey:i.privateKey}}return{deviceId:i.deviceId,publicKey:i.publicKey,privateKey:i.privateKey}}}}catch{}const e=await Id(),t={version:1,deviceId:e.deviceId,publicKey:e.publicKey,privateKey:e.privateKey,createdAtMs:Date.now()};return localStorage.setItem(Si,JSON.stringify(t)),e}async function Md(e,t){const n=Ra(e),i=new TextEncoder().encode(t),s=await Ad(i,n);return Vi(s)}async function We(e,t){if(!(!e.client||!e.connected)&&!e.devicesLoading){e.devicesLoading=!0,t!=null&&t.quiet||(e.devicesError=null);try{const n=await e.client.request("device.pair.list",{});e.devicesList={pending:Array.isArray(n==null?void 0:n.pending)?n.pending:[],paired:Array.isArray(n==null?void 0:n.paired)?n.paired:[]}}catch(n){t!=null&&t.quiet||(e.devicesError=String(n))}finally{e.devicesLoading=!1}}}async function Pd(e,t){if(!(!e.client||!e.connected))try{await e.client.request("device.pair.approve",{requestId:t}),await We(e)}catch(n){e.devicesError=String(n)}}async function Fd(e,t){if(!(!e.client||!e.connected||!window.confirm("Reject this device pairing request?")))try{await e.client.request("device.pair.reject",{requestId:t}),await We(e)}catch(i){e.devicesError=String(i)}}async function Dd(e,t){if(!(!e.client||!e.connected))try{const n=await e.client.request("device.token.rotate",t);if(n!=null&&n.token){const i=await Is(),s=n.role??t.role;(n.deviceId===i.deviceId||t.deviceId===i.deviceId)&&ma({deviceId:i.deviceId,role:s,token:n.token,scopes:n.scopes??t.scopes??[]}),window.prompt("New device token (copy and store securely):",n.token)}await We(e)}catch(n){e.devicesError=String(n)}}async function Od(e,t){if(!(!e.client||!e.connected||!window.confirm(`Revoke token for ${t.deviceId} (${t.role})?`)))try{await e.client.request("device.token.revoke",t);const i=await Is();t.deviceId===i.deviceId&&ya({deviceId:i.deviceId,role:t.role}),await We(e)}catch(i){e.devicesError=String(i)}}function Nd(e){if(!e||e.kind==="gateway")return{method:"exec.approvals.get",params:{}};const t=e.nodeId.trim();return t?{method:"exec.approvals.node.get",params:{nodeId:t}}:null}function Bd(e,t){if(!e||e.kind==="gateway")return{method:"exec.approvals.set",params:t};const n=e.nodeId.trim();return n?{method:"exec.approvals.node.set",params:{...t,nodeId:n}}:null}async function Ms(e,t){if(!(!e.client||!e.connected)&&!e.execApprovalsLoading){e.execApprovalsLoading=!0,e.lastError=null;try{const n=Nd(t);if(!n){e.lastError="Select a node before loading exec approvals.";return}const i=await e.client.request(n.method,n.params);Ud(e,i)}catch(n){e.lastError=String(n)}finally{e.execApprovalsLoading=!1}}}function Ud(e,t){e.execApprovalsSnapshot=t,e.execApprovalsDirty||(e.execApprovalsForm=ot(t.file??{}))}async function zd(e,t){var n,i;if(!(!e.client||!e.connected)){e.execApprovalsSaving=!0,e.lastError=null;try{const s=(n=e.execApprovalsSnapshot)==null?void 0:n.hash;if(!s){e.lastError="Exec approvals hash missing; reload and retry.";return}const o=e.execApprovalsForm??((i=e.execApprovalsSnapshot)==null?void 0:i.file)??{},r=Bd(t,{file:o,baseHash:s});if(!r){e.lastError="Select a node before saving exec approvals.";return}await e.client.request(r.method,r.params),e.execApprovalsDirty=!1,await Ms(e,t)}catch(s){e.lastError=String(s)}finally{e.execApprovalsSaving=!1}}}function jd(e,t,n){var s;const i=ot(e.execApprovalsForm??((s=e.execApprovalsSnapshot)==null?void 0:s.file)??{});ta(i,t,n),e.execApprovalsForm=i,e.execApprovalsDirty=!0}function Hd(e,t){var i;const n=ot(e.execApprovalsForm??((i=e.execApprovalsSnapshot)==null?void 0:i.file)??{});na(n,t),e.execApprovalsForm=n,e.execApprovalsDirty=!0}function pe(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams;for(const[r,a]of Object.entries(n))o.set(r,String(a));return`${s}?${o.toString()}`}async function Vn(e,t){e.oosLoading=!0,e.oosError=null;try{const[s,o,r,a]=await Promise.all([fetch(pe(e.basePath,"/api/oos/stats")),fetch(pe(e.basePath,"/api/oos/list",{limit:100})),fetch(pe(e.basePath,"/api/oos/by-file",{limit:50})),fetch(pe(e.basePath,"/api/oos/by-time",{days:30}))]),l=await s.json().catch(()=>({})),d=await o.json().catch(()=>({})),f=await r.json().catch(()=>({})),u=await a.json().catch(()=>({}));l.success&&l.data?(e.oosStats=l.data,e.oosDb=l.db??null):(e.oosStats=null,s.ok||(e.oosError=l.detail??`stats: ${s.status}`)),d.success&&Array.isArray(d.data)?e.oosList=d.data:(e.oosList=[],!e.oosError&&!o.ok&&(e.oosError=d.detail??`list: ${o.status}`)),f.success&&Array.isArray(f.data)?e.oosByFile=f.data:e.oosByFile=[],u.success&&Array.isArray(u.data)?e.oosByTime=u.data:e.oosByTime=[]}catch(s){e.oosError=s instanceof Error?s.message:String(s),e.oosStats=null,e.oosList=[],e.oosByFile=[],e.oosByTime=[]}finally{e.oosLoading=!1}}async function Kd(e,t){if(!(t!=null&&t.trim()))return!1;try{const n=await fetch(pe(e.basePath,"/api/oos/delete"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_key:t.trim()})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(await Vn(e),!0):(e.oosError=i.detail??`删除失败: ${n.status}`,!1)}catch(n){return e.oosError=n instanceof Error?n.message:String(n),!1}}async function qd(e,t){const n=(t.product_name||"").trim();if(!n)return!1;try{const i=await fetch(pe(e.basePath,"/api/oos/add"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_name:n,specification:(t.specification??"").trim(),quantity:t.quantity??0,unit:(t.unit??"").trim()})}),s=await i.json().catch(()=>({}));return i.ok&&s.success?(await Vn(e),!0):(e.oosError=s.detail??`添加失败: ${i.status}`,!1)}catch(i){return e.oosError=i instanceof Error?i.message:String(i),!1}}async function Gd(e){try{const t=await fetch(pe(e.basePath,"/api/oos/stats")),n=await t.json().catch(()=>({}));if(t.ok&&n.success&&n.data)e.overviewOosStats=n.data,e.overviewOosError=null;else{e.overviewOosStats=null;const i=typeof n.detail=="string"?n.detail:n.message??n.error??`oos stats: ${t.status}`;e.overviewOosError=i}}catch(t){e.overviewOosStats=null,e.overviewOosError=t instanceof Error?t.message:String(t)}}async function Qn(e,t){e.shortageLoading=!0,e.shortageError=null;try{const[s,o,r,a]=await Promise.all([fetch(pe(e.basePath,"/api/shortage/stats"),{method:"GET"}),fetch(pe(e.basePath,"/api/shortage/list",{limit:100}),{method:"GET"}),fetch(pe(e.basePath,"/api/shortage/by-file"),{method:"GET"}),fetch(pe(e.basePath,"/api/shortage/by-time",{days:30}),{method:"GET"})]),l=await s.json().catch(()=>({})),d=await o.json().catch(()=>({})),f=await r.json().catch(()=>({})),u=await a.json().catch(()=>({}));if(l.success&&l.data)e.shortageStats=l.data,e.shortageDb=l.db??null;else if(e.shortageStats=null,!e.shortageError&&!s.ok){const g=typeof l.detail=="string"?l.detail:l.message??l.error;e.shortageError=g??`stats: ${s.status} ${s.statusText}`}if(d.success&&Array.isArray(d.data))e.shortageList=d.data;else if(e.shortageList=[],!e.shortageError&&!o.ok){const g=typeof d.detail=="string"?d.detail:d.message??d.error;e.shortageError=g??`list: ${o.status} ${o.statusText}`}if(f.success&&Array.isArray(f.data))e.shortageByFile=f.data;else if(e.shortageByFile=[],!e.shortageError&&!r.ok){const g=typeof f.detail=="string"?f.detail:f.message??f.error;e.shortageError=g??`by-file: ${r.status} ${r.statusText}`}if(u.success&&Array.isArray(u.data))e.shortageByTime=u.data;else if(e.shortageByTime=[],!e.shortageError&&!a.ok){const g=typeof u.detail=="string"?u.detail:u.message??u.error;e.shortageError=g??`by-time: ${a.status} ${a.statusText}`}}catch(s){e.shortageError=s instanceof Error?s.message:String(s),e.shortageStats=null,e.shortageList=[],e.shortageByFile=[],e.shortageByTime=[]}finally{e.shortageLoading=!1}}async function Wd(e,t){if(!(t!=null&&t.trim()))return!1;try{const n=await fetch(pe(e.basePath,"/api/shortage/delete"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_key:t.trim()})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(await Qn(e),!0):(e.shortageError=i.detail??`删除失败: ${n.status}`,!1)}catch(n){return e.shortageError=n instanceof Error?n.message:String(n),!1}}async function Vd(e,t){const n=(t.product_name||"").trim();if(!n)return!1;try{const i=await fetch(pe(e.basePath,"/api/shortage/add"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_name:n,specification:(t.specification??"").trim(),quantity:t.quantity??0,available_qty:t.available_qty??0})}),s=await i.json().catch(()=>({}));return i.ok&&s.success?(await Qn(e),!0):(e.shortageError=s.detail??`添加失败: ${i.status}`,!1)}catch(i){return e.shortageError=i instanceof Error?i.message:String(i),!1}}async function Qd(e){try{const t=await fetch(pe(e.basePath,"/api/shortage/stats"),{method:"GET"}),n=await t.json().catch(()=>({}));if(t.ok&&n.success&&n.data)e.overviewShortageStats=n.data,e.overviewShortageError=null;else{e.overviewShortageStats=null;const i=typeof n.detail=="string"?n.detail:n.message??n.error??`shortage stats: ${t.status}`;e.overviewShortageError=i}}catch(t){e.overviewShortageStats=null,e.overviewShortageError=t instanceof Error?t.message:String(t)}}async function Jd(e){if(!(!e.client||!e.connected)&&!e.presenceLoading){e.presenceLoading=!0,e.presenceError=null,e.presenceStatus=null;try{const t=await e.client.request("system-presence",{});Array.isArray(t)?(e.presenceEntries=t,e.presenceStatus=t.length===0?"No instances yet.":null):(e.presenceEntries=[],e.presenceStatus="No presence payload.")}catch(t){e.presenceError=String(t)}finally{e.presenceLoading=!1}}}async function ut(e,t){if(!(!e.client||!e.connected)&&!e.sessionsLoading){e.sessionsLoading=!0,e.sessionsError=null;try{const n=(t==null?void 0:t.includeGlobal)??e.sessionsIncludeGlobal,i=(t==null?void 0:t.includeUnknown)??e.sessionsIncludeUnknown,s=(t==null?void 0:t.activeMinutes)??Do(e.sessionsFilterActive,0),o=(t==null?void 0:t.limit)??Do(e.sessionsFilterLimit,0),r={includeGlobal:n,includeUnknown:i};s>0&&(r.activeMinutes=s),o>0&&(r.limit=o);const a=await e.client.request("sessions.list",r);a&&(e.sessionsResult=a)}catch(n){e.sessionsError=String(n)}finally{e.sessionsLoading=!1}}}async function Yd(e,t,n){if(!e.client||!e.connected)return;const i={key:t};"label"in n&&(i.label=n.label),"thinkingLevel"in n&&(i.thinkingLevel=n.thinkingLevel),"verboseLevel"in n&&(i.verboseLevel=n.verboseLevel),"reasoningLevel"in n&&(i.reasoningLevel=n.reasoningLevel);try{await e.client.request("sessions.patch",i),await ut(e)}catch(s){e.sessionsError=String(s)}}async function Xd(e,t){if(!e.client||!e.connected||e.sessionsLoading||!window.confirm(`Delete session "${t}"?

Deletes the session entry and archives its transcript.`))return!1;e.sessionsLoading=!0,e.sessionsError=null;try{return await e.client.request("sessions.delete",{key:t,deleteTranscript:!0}),!0}catch(i){return e.sessionsError=String(i),!1}finally{e.sessionsLoading=!1}}async function Zd(e,t){return await Xd(e,t)?(await ut(e),!0):!1}function _t(e,t,n){if(!t.trim())return;const i={...e.skillMessages};n?i[t]=n:delete i[t],e.skillMessages=i}function Jn(e){return e instanceof Error?e.message:String(e)}async function ln(e,t){if(t!=null&&t.clearMessages&&Object.keys(e.skillMessages).length>0&&(e.skillMessages={}),!(!e.client||!e.connected)&&!e.skillsLoading){e.skillsLoading=!0,e.skillsError=null;try{const n=await e.client.request("skills.status",{});n&&(e.skillsReport=n)}catch(n){e.skillsError=Jn(n)}finally{e.skillsLoading=!1}}}function eu(e,t,n){e.skillEdits={...e.skillEdits,[t]:n}}async function tu(e,t,n){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{await e.client.request("skills.update",{skillKey:t,enabled:n}),await ln(e),_t(e,t,{kind:"success",message:n?"Skill enabled":"Skill disabled"})}catch(i){const s=Jn(i);e.skillsError=s,_t(e,t,{kind:"error",message:s})}finally{e.skillsBusyKey=null}}}async function nu(e,t){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const n=e.skillEdits[t]??"";await e.client.request("skills.update",{skillKey:t,apiKey:n}),await ln(e),_t(e,t,{kind:"success",message:"API key saved"})}catch(n){const i=Jn(n);e.skillsError=i,_t(e,t,{kind:"error",message:i})}finally{e.skillsBusyKey=null}}}async function iu(e,t,n,i){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const s=await e.client.request("skills.install",{name:n,installId:i,timeoutMs:12e4});await ln(e),_t(e,t,{kind:"success",message:(s==null?void 0:s.message)??"Installed"})}catch(s){const o=Jn(s);e.skillsError=o,_t(e,t,{kind:"error",message:o})}finally{e.skillsBusyKey=null}}}const su=[{label:"chat",tabs:["chat"]},{label:"control",tabs:["overview","channels","instances","sessions","work","cron"]},{label:"agent",tabs:["agents","skills","nodes"]},{label:"settings",tabs:["config","debug","logs"]}],Ma={agents:"/agents",overview:"/overview",channels:"/channels",instances:"/instances",sessions:"/sessions",work:"/work",cron:"/cron",skills:"/skills",nodes:"/nodes",chat:"/chat",config:"/config",debug:"/debug",logs:"/logs"},Pa=new Map(Object.entries(Ma).map(([e,t])=>[t,e]));function Tt(e){if(!e)return"";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t==="/"?"":(t.endsWith("/")&&(t=t.slice(0,-1)),t)}function sn(e){if(!e)return"/";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t.length>1&&t.endsWith("/")&&(t=t.slice(0,-1)),t}function Ps(e,t=""){const n=Tt(t),i=Ma[e];return n?`${n}${i}`:i}function Fa(e,t=""){const n=Tt(t);let i=e||"/";n&&(i===n?i="/":i.startsWith(`${n}/`)&&(i=i.slice(n.length)));let s=sn(i).toLowerCase();return s.endsWith("/index.html")&&(s="/"),s==="/"?"chat":Pa.get(s)??null}function ou(e){let t=sn(e);if(t.endsWith("/index.html")&&(t=sn(t.slice(0,-11))),t==="/")return"";const n=t.split("/").filter(Boolean);if(n.length===0)return"";for(let i=0;i<n.length;i++){const s=`/${n.slice(i).join("/")}`.toLowerCase();if(Pa.has(s)){const o=n.slice(0,i);return o.length?`/${o.join("/")}`:""}}return`/${n.join("/")}`}function ru(e){switch(e){case"agents":return"folder";case"chat":return"messageSquare";case"overview":return"barChart";case"channels":return"fileText";case"instances":return"radio";case"sessions":return"fileText";case"work":return"fileText";case"cron":return"loader";case"skills":return"zap";case"nodes":return"monitor";case"config":return"settings";case"debug":return"bug";case"logs":return"scrollText";default:return"folder"}}function Qi(e){return T(`tabs.${e}`)}function au(e){return T(`subtitles.${e}`)}const Da="openclaw.control.settings.v1";function lu(){const t={gatewayUrl:`${location.protocol==="https:"?"wss":"ws"}://${location.host}/ws`,token:"",sessionKey:"main",lastActiveSessionKey:"main",theme:"system",chatFocusMode:!1,chatShowThinking:!0,splitRatio:.6,navCollapsed:!1,navGroupsCollapsed:{}};try{const n=localStorage.getItem(Da);if(!n)return t;const i=JSON.parse(n);return{gatewayUrl:typeof i.gatewayUrl=="string"&&i.gatewayUrl.trim()?i.gatewayUrl.trim():t.gatewayUrl,token:typeof i.token=="string"?i.token:t.token,sessionKey:typeof i.sessionKey=="string"&&i.sessionKey.trim()?i.sessionKey.trim():t.sessionKey,lastActiveSessionKey:typeof i.lastActiveSessionKey=="string"&&i.lastActiveSessionKey.trim()?i.lastActiveSessionKey.trim():typeof i.sessionKey=="string"&&i.sessionKey.trim()||t.lastActiveSessionKey,theme:i.theme==="light"||i.theme==="dark"||i.theme==="system"?i.theme:t.theme,chatFocusMode:typeof i.chatFocusMode=="boolean"?i.chatFocusMode:t.chatFocusMode,chatShowThinking:typeof i.chatShowThinking=="boolean"?i.chatShowThinking:t.chatShowThinking,splitRatio:typeof i.splitRatio=="number"&&i.splitRatio>=.4&&i.splitRatio<=.7?i.splitRatio:t.splitRatio,navCollapsed:typeof i.navCollapsed=="boolean"?i.navCollapsed:t.navCollapsed,navGroupsCollapsed:typeof i.navGroupsCollapsed=="object"&&i.navGroupsCollapsed!==null?i.navGroupsCollapsed:t.navGroupsCollapsed,locale:ms(i.locale)?i.locale:void 0}}catch{return t}}function cu(e){localStorage.setItem(Da,JSON.stringify(e))}const mn=e=>Number.isNaN(e)?.5:e<=0?0:e>=1?1:e,du=()=>typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches??!1,yn=e=>{e.classList.remove("theme-transition"),e.style.removeProperty("--theme-switch-x"),e.style.removeProperty("--theme-switch-y")},uu=({nextTheme:e,applyTheme:t,context:n,currentTheme:i})=>{var d;if(i===e)return;const s=globalThis.document??null;if(!s){t();return}const o=s.documentElement,r=s,a=du();if(!!r.startViewTransition&&!a){let f=.5,u=.5;if((n==null?void 0:n.pointerClientX)!==void 0&&(n==null?void 0:n.pointerClientY)!==void 0&&typeof window<"u")f=mn(n.pointerClientX/window.innerWidth),u=mn(n.pointerClientY/window.innerHeight);else if(n!=null&&n.element){const g=n.element.getBoundingClientRect();g.width>0&&g.height>0&&typeof window<"u"&&(f=mn((g.left+g.width/2)/window.innerWidth),u=mn((g.top+g.height/2)/window.innerHeight))}o.style.setProperty("--theme-switch-x",`${f*100}%`),o.style.setProperty("--theme-switch-y",`${u*100}%`),o.classList.add("theme-transition");try{const g=(d=r.startViewTransition)==null?void 0:d.call(r,()=>{t()});g!=null&&g.finished?g.finished.finally(()=>yn(o)):yn(o)}catch{yn(o),t()}return}t(),yn(o)};function fu(){return typeof window>"u"||typeof window.matchMedia!="function"||window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function Fs(e){return e==="system"?fu():e}function Ke(e,t){var i;const n={...t,lastActiveSessionKey:((i=t.lastActiveSessionKey)==null?void 0:i.trim())||t.sessionKey.trim()||"main"};e.settings=n,cu(n),t.theme!==e.theme&&(e.theme=t.theme,Yn(e,Fs(t.theme))),e.applySessionKey=e.settings.lastActiveSessionKey}function Oa(e,t){const n=t.trim();n&&e.settings.lastActiveSessionKey!==n&&Ke(e,{...e.settings,lastActiveSessionKey:n})}function gu(e){if(!window.location.search&&!window.location.hash)return;const t=new URL(window.location.href),n=new URLSearchParams(t.search),i=new URLSearchParams(t.hash.startsWith("#")?t.hash.slice(1):t.hash),s=n.get("token")??i.get("token"),o=n.get("password")??i.get("password"),r=n.get("session")??i.get("session"),a=n.get("gatewayUrl")??i.get("gatewayUrl");let l=!1;if(s!=null){const f=s.trim();f&&f!==e.settings.token&&Ke(e,{...e.settings,token:f}),n.delete("token"),i.delete("token"),l=!0}if(o!=null&&(n.delete("password"),i.delete("password"),l=!0),r!=null){const f=r.trim();f&&(e.sessionKey=f,Ke(e,{...e.settings,sessionKey:f,lastActiveSessionKey:f}))}if(a!=null){const f=a.trim();f&&f!==e.settings.gatewayUrl&&(e.pendingGatewayUrl=f),n.delete("gatewayUrl"),i.delete("gatewayUrl"),l=!0}if(!l)return;t.search=n.toString();const d=i.toString();t.hash=d?`#${d}`:"",window.history.replaceState({},"",t.toString())}function pu(e,t){e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?ws(e):$s(e),t==="debug"?ks(e):xs(e),Ds(e),Ba(e,t,!1)}function hu(e,t,n){uu({nextTheme:t,applyTheme:()=>{e.theme=t,Ke(e,{...e.settings,theme:t}),Yn(e,Fs(t))},context:n,currentTheme:e.theme})}async function Ds(e){var t,n,i,s,o,r;if(e.tab==="overview"&&(await Ua(e),await Promise.all([Gd(e),Qd(e)])),e.tab==="channels"&&await ua(e),e.tab==="instances"){const a=e;await Vn(a),await Qn(a)}if(e.tab==="sessions"&&await ut(e),e.tab==="cron"&&await _s(e),e.tab==="skills"&&await ln(e),e.tab==="agents"){await Ss(e),await Ee(e);const a=((n=(t=e.agentsList)==null?void 0:t.agents)==null?void 0:n.map(d=>d.id))??[];a.length>0&&da(e,a);const l=e.agentsSelectedId??((i=e.agentsList)==null?void 0:i.defaultId)??((r=(o=(s=e.agentsList)==null?void 0:s.agents)==null?void 0:o[0])==null?void 0:r.id);l&&(ca(e,l),e.agentsPanel==="skills"&&Tn(e,l),e.agentsPanel==="channels"&&ye(e,!1),e.agentsPanel==="cron"&&Os(e))}e.tab==="nodes"&&(await Gn(e),await We(e),await Ee(e),await Ms(e)),e.tab==="chat"&&(await Wa(e),an(e,!e.chatHasAutoScrolled)),e.tab==="config"&&(await kc(e),await Ee(e)),e.tab==="debug"&&(await qn(e),e.eventLog=e.eventLogBuffer),e.tab==="logs"&&(e.logsAtBottom=!0,await bs(e,{reset:!0}),la(e,!0))}function vu(){if(typeof window>"u")return"";const e=window.__OPENCLAW_CONTROL_UI_BASE_PATH__;return typeof e=="string"&&e.trim()?Tt(e):ou(window.location.pathname)}function mu(e){e.theme=e.settings.theme??"system",Yn(e,Fs(e.theme))}function Yn(e,t){if(e.themeResolved=t,typeof document>"u")return;const n=document.documentElement;n.dataset.theme=t,n.style.colorScheme=t}function yu(e){if(typeof window>"u"||typeof window.matchMedia!="function")return;if(e.themeMedia=window.matchMedia("(prefers-color-scheme: dark)"),e.themeMediaHandler=n=>{e.theme==="system"&&Yn(e,n.matches?"dark":"light")},typeof e.themeMedia.addEventListener=="function"){e.themeMedia.addEventListener("change",e.themeMediaHandler);return}e.themeMedia.addListener(e.themeMediaHandler)}function bu(e){if(!e.themeMedia||!e.themeMediaHandler)return;if(typeof e.themeMedia.removeEventListener=="function"){e.themeMedia.removeEventListener("change",e.themeMediaHandler);return}e.themeMedia.removeListener(e.themeMediaHandler),e.themeMedia=null,e.themeMediaHandler=null}function wu(e,t){if(typeof window>"u")return;const n=Fa(window.location.pathname,e.basePath)??"chat";Na(e,n),Ba(e,n,t)}function $u(e){var s;if(typeof window>"u")return;const t=Fa(window.location.pathname,e.basePath);if(!t)return;const i=(s=new URL(window.location.href).searchParams.get("session"))==null?void 0:s.trim();i&&(e.sessionKey=i,Ke(e,{...e.settings,sessionKey:i,lastActiveSessionKey:i})),Na(e,t)}function Na(e,t){e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?ws(e):$s(e),t==="debug"?ks(e):xs(e),e.connected&&Ds(e)}function Ba(e,t,n){if(typeof window>"u")return;const i=sn(Ps(t,e.basePath)),s=sn(window.location.pathname),o=new URL(window.location.href);t==="chat"&&e.sessionKey?o.searchParams.set("session",e.sessionKey):o.searchParams.delete("session"),s!==i&&(o.pathname=i),n?window.history.replaceState({},"",o.toString()):window.history.pushState({},"",o.toString())}function ku(e,t,n){if(typeof window>"u")return;const i=new URL(window.location.href);i.searchParams.set("session",t),window.history.replaceState({},"",i.toString())}async function Ua(e){await Promise.all([ye(e,!1),Jd(e),ut(e),pa(e),qn(e)])}async function Os(e){await Promise.all([ye(e,!1),pa(e),id(e)])}async function xu(e){await _s(e)}const Ho=50,Su=80,Au=12e4;function _u(e){if(!e||typeof e!="object")return null;const t=e;if(typeof t.text=="string")return t.text;const n=t.content;if(!Array.isArray(n))return null;const i=n.map(s=>{if(!s||typeof s!="object")return null;const o=s;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(s=>!!s);return i.length===0?null:i.join(`
`)}function Ko(e){if(e==null)return null;if(typeof e=="number"||typeof e=="boolean")return String(e);const t=_u(e);let n;if(typeof e=="string")n=e;else if(t)n=t;else try{n=JSON.stringify(e,null,2)}catch{n=String(e)}const i=ga(n,Au);return i.truncated?`${i.text}

… truncated (${i.total} chars, showing first ${i.text.length}).`:i.text}function Cu(e){const t=[];return t.push({type:"toolcall",name:e.name,arguments:e.args??{}}),e.output&&t.push({type:"toolresult",name:e.name,text:e.output}),{role:"assistant",toolCallId:e.toolCallId,runId:e.runId,content:t,timestamp:e.startedAt}}function Tu(e){if(e.toolStreamOrder.length<=Ho)return;const t=e.toolStreamOrder.length-Ho,n=e.toolStreamOrder.splice(0,t);for(const i of n)e.toolStreamById.delete(i)}function Eu(e){e.chatToolMessages=e.toolStreamOrder.map(t=>{var n;return(n=e.toolStreamById.get(t))==null?void 0:n.message}).filter(t=>!!t)}function Ji(e){e.toolStreamSyncTimer!=null&&(clearTimeout(e.toolStreamSyncTimer),e.toolStreamSyncTimer=null),Eu(e)}function Lu(e,t=!1){if(t){Ji(e);return}e.toolStreamSyncTimer==null&&(e.toolStreamSyncTimer=window.setTimeout(()=>Ji(e),Su))}function Xn(e){e.toolStreamById.clear(),e.toolStreamOrder=[],e.chatToolMessages=[],Ji(e)}const Ru=5e3;function Iu(e,t){var s;const n=t.data??{},i=typeof n.phase=="string"?n.phase:"";e.compactionClearTimer!=null&&(window.clearTimeout(e.compactionClearTimer),e.compactionClearTimer=null),i==="start"?e.compactionStatus={active:!0,startedAt:Date.now(),completedAt:null}:i==="end"&&(e.compactionStatus={active:!1,startedAt:((s=e.compactionStatus)==null?void 0:s.startedAt)??null,completedAt:Date.now()},e.compactionClearTimer=window.setTimeout(()=>{e.compactionStatus=null,e.compactionClearTimer=null},Ru))}function Mu(e,t){if(!t)return;if(t.stream==="compaction"){Iu(e,t);return}if(t.stream!=="tool")return;const n=typeof t.sessionKey=="string"?t.sessionKey:void 0;if(n&&n!==e.sessionKey||!n&&e.chatRunId&&t.runId!==e.chatRunId||e.chatRunId&&t.runId!==e.chatRunId||!e.chatRunId)return;const i=t.data??{},s=typeof i.toolCallId=="string"?i.toolCallId:"";if(!s)return;const o=typeof i.name=="string"?i.name:"tool",r=typeof i.phase=="string"?i.phase:"",a=r==="start"?i.args:void 0,l=r==="update"?Ko(i.partialResult):r==="result"?Ko(i.result):void 0,d=Date.now();let f=e.toolStreamById.get(s);f?(f.name=o,a!==void 0&&(f.args=a),l!==void 0&&(f.output=l||void 0),f.updatedAt=d):(f={toolCallId:s,runId:t.runId,sessionKey:n,name:o,args:a,output:l||void 0,startedAt:typeof t.ts=="number"?t.ts:d,updatedAt:d,message:{}},e.toolStreamById.set(s,f),e.toolStreamOrder.push(s)),f.message=Cu(f),Tu(e),Lu(e,r==="result")}function Ai(e){return e==null?"":String(e).trim()}const _i=new WeakMap,Ci=new WeakMap;function Yi(e){const t=e,n=typeof t.role=="string"?t.role:"",i=t.content;if(typeof i=="string")return n==="assistant"?wi(i):Ai(i);if(Array.isArray(i)){const s=i.map(o=>{const r=o;return r.type==="text"&&typeof r.text=="string"?r.text:null}).filter(o=>typeof o=="string");if(s.length>0){const o=s.join(`
`);return n==="assistant"?wi(o):Ai(o)}}return typeof t.text=="string"?n==="assistant"?wi(t.text):Ai(t.text):null}function za(e){if(!e||typeof e!="object")return Yi(e);const t=e;if(_i.has(t))return _i.get(t)??null;const n=Yi(e);return _i.set(t,n),n}function qo(e){const n=e.content,i=[];if(Array.isArray(n))for(const a of n){const l=a;if(l.type==="thinking"&&typeof l.thinking=="string"){const d=l.thinking.trim();d&&i.push(d)}}if(i.length>0)return i.join(`
`);const s=Fu(e);if(!s)return null;const r=[...s.matchAll(/<\s*think(?:ing)?\s*>([\s\S]*?)<\s*\/\s*think(?:ing)?\s*>/gi)].map(a=>(a[1]??"").trim()).filter(Boolean);return r.length>0?r.join(`
`):null}function Pu(e){if(!e||typeof e!="object")return qo(e);const t=e;if(Ci.has(t))return Ci.get(t)??null;const n=qo(e);return Ci.set(t,n),n}function Fu(e){const t=e,n=t.content;if(typeof n=="string")return n;if(Array.isArray(n)){const i=n.map(s=>{const o=s;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(s=>typeof s=="string");if(i.length>0)return i.join(`
`)}return typeof t.text=="string"?t.text:null}function Du(e){const t=e.trim();if(!t)return"";const n=t.split(/\r?\n/).map(i=>i.trim()).filter(Boolean).map(i=>`_${i}_`);return n.length?["_Reasoning:_",...n].join(`
`):""}let Go=!1;function Wo(e){e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t="";for(let n=0;n<e.length;n++)t+=e[n].toString(16).padStart(2,"0");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}function Ou(){const e=new Uint8Array(16),t=Date.now();for(let n=0;n<e.length;n++)e[n]=Math.floor(Math.random()*256);return e[0]^=t&255,e[1]^=t>>>8&255,e[2]^=t>>>16&255,e[3]^=t>>>24&255,e}function Nu(){Go||(Go=!0,console.warn("[uuid] crypto API missing; falling back to weak randomness"))}function Ns(e=globalThis.crypto){if(e&&typeof e.randomUUID=="function")return e.randomUUID();if(e&&typeof e.getRandomValues=="function"){const t=new Uint8Array(16);return e.getRandomValues(t),Wo(t)}return Nu(),Wo(Ou())}async function on(e){if(!(!e.client||!e.connected)){e.chatLoading=!0,e.lastError=null;try{const t=await e.client.request("chat.history",{sessionKey:e.sessionKey,limit:200}),n=Array.isArray(t.messages)?t.messages:[];(n.length>0||e.chatMessages.length===0)&&(e.chatMessages=n),e.chatThinkingLevel=t.thinkingLevel??null}catch(t){e.lastError=String(t)}finally{e.chatLoading=!1}}}function Bu(e){const t=/^data:([^;]+);base64,(.+)$/.exec(e);return t?{mimeType:t[1],content:t[2]}:null}function Uu(e){if(!e||typeof e!="object")return null;const t=e;return t.role!=="assistant"||!("content"in t)||!Array.isArray(t.content)?null:t}async function zu(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",i=n?`${n}/api/quotation/upload`:"/api/quotation/upload",s=new FormData;s.append("file",t);try{const o=await fetch(i,{method:"POST",body:s,credentials:"same-origin"});if(!o.ok){const a=await o.text();throw new Error(a||`Upload failed: ${o.status}`)}const r=await o.json();return typeof r.file_path!="string"?null:{file_path:r.file_path,file_name:r.file_name??t.name}}catch(o){throw console.error("uploadChatFile",o),o}}async function ju(e,t,n,i){if(!e.client||!e.connected)return null;const s=t.trim(),o=n&&n.length>0;if(!s&&!o)return null;const r=Date.now(),a=[];if(s&&a.push({type:"text",text:s}),o)for(const u of n)a.push({type:"image",source:{type:"base64",media_type:u.mimeType,data:u.dataUrl}});e.chatMessages=[...e.chatMessages,{role:"user",content:a,timestamp:r}],e.chatSending=!0,e.lastError=null;const l=Ns();e.chatRunId=l,e.chatStream="",e.chatStreamStartedAt=r;const d=o?n.map(u=>{const g=Bu(u.dataUrl);return g?{type:"image",mimeType:g.mimeType,content:g.content}:null}).filter(u=>u!==null):void 0,f=i!=null&&i.file_path?{file_path:i.file_path}:void 0;try{return await e.client.request("chat.send",{sessionKey:e.sessionKey,message:s,deliver:!1,idempotencyKey:l,attachments:d,...f?{context:f,file_path:i.file_path}:{}}),l}catch(u){const g=String(u);return e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,e.lastError=g,e.chatMessages=[...e.chatMessages,{role:"assistant",content:[{type:"text",text:"Error: "+g}],timestamp:Date.now()}],null}finally{e.chatSending=!1}}async function Hu(e){if(!e.client||!e.connected)return!1;const t=e.chatRunId;try{return await e.client.request("chat.abort",t?{sessionKey:e.sessionKey,runId:t}:{sessionKey:e.sessionKey}),!0}catch(n){return e.lastError=String(n),!1}}function Ku(e,t){if(!t||t.sessionKey!==e.sessionKey)return null;if(t.runId&&e.chatRunId&&t.runId!==e.chatRunId)return t.state==="final"?"foreign_final":null;if(t.state==="delta"){const n=Yi(t.message);if(typeof n=="string"){const i=e.chatStream??"";(!i||n.length>=i.length)&&(e.chatStream=n)}}else if(t.state==="final")e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null;else if(t.state==="aborted"){const n=Uu(t.message);if(n)e.chatMessages=[...e.chatMessages,n];else{const i=e.chatStream??"";i.trim()&&(e.chatMessages=[...e.chatMessages,{role:"assistant",content:[{type:"text",text:i}],timestamp:Date.now()}])}e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null}else t.state==="error"&&(e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null,e.lastError=t.errorMessage??"chat error");return t.state}const ja=120;function Ha(e){return e.chatSending||!!e.chatRunId}function qu(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/stop"?!0:n==="stop"||n==="esc"||n==="abort"||n==="wait"||n==="exit"}function Gu(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/new"||n==="/reset"?!0:n.startsWith("/new ")||n.startsWith("/reset ")}async function Ka(e){e.connected&&(e.chatMessage="",await Hu(e))}function Wu(e,t,n,i){const s=t.trim(),o=!!(n&&n.length>0);!s&&!o||(e.chatQueue=[...e.chatQueue,{id:Ns(),text:s,createdAt:Date.now(),attachments:o?n==null?void 0:n.map(r=>({...r})):void 0,refreshSessions:i}])}async function qa(e,t,n){var o,r;Xn(e);const i=await ju(e,t,n==null?void 0:n.attachments,e.chatUploadedFile??void 0),s=!!i;return!s&&(n==null?void 0:n.previousDraft)!=null&&(e.chatMessage=n.previousDraft),!s&&(n!=null&&n.previousAttachments)&&(e.chatAttachments=n.previousAttachments),s&&Oa(e,e.sessionKey),s&&(n!=null&&n.restoreDraft)&&((o=n.previousDraft)!=null&&o.trim())&&(e.chatMessage=n.previousDraft),s&&(n!=null&&n.restoreAttachments)&&((r=n.previousAttachments)!=null&&r.length)&&(e.chatAttachments=n.previousAttachments),an(e),s&&!e.chatRunId&&Ga(e),s&&(n!=null&&n.refreshSessions)&&i&&e.refreshSessionsAfterChat.add(i),s}async function Ga(e){if(!e.connected||Ha(e))return;const[t,...n]=e.chatQueue;if(!t)return;e.chatQueue=n,await qa(e,t.text,{attachments:t.attachments,refreshSessions:t.refreshSessions})||(e.chatQueue=[t,...e.chatQueue])}function Vu(e,t){e.chatQueue=e.chatQueue.filter(n=>n.id!==t)}async function Qu(e,t,n){if(!e.connected)return;const i=e.chatMessage,s=(t??e.chatMessage).trim(),o=e.chatAttachments??[],r=t==null?o:[],a=r.length>0;if(!s&&!a)return;if(qu(s)){await Ka(e);return}const l=Gu(s);if(t==null&&(e.chatMessage="",e.chatAttachments=[]),Ha(e)){Wu(e,s,r,l);return}await qa(e,s,{previousDraft:t==null?i:void 0,restoreDraft:!!(t&&(n!=null&&n.restoreDraft)),attachments:a?r:void 0,previousAttachments:t==null?o:void 0,restoreAttachments:!!(t&&(n!=null&&n.restoreDraft)),refreshSessions:l})}async function Wa(e,t){await Promise.all([on(e),ut(e,{activeMinutes:ja}),Xi(e)]),(t==null?void 0:t.scheduleScroll)!==!1&&an(e)}const Ju=Ga;function Yu(e){var s,o,r;const t=aa(e.sessionKey);if(t!=null&&t.agentId)return t.agentId;const n=(s=e.hello)==null?void 0:s.snapshot;return((r=(o=n==null?void 0:n.sessionDefaults)==null?void 0:o.defaultAgentId)==null?void 0:r.trim())||"main"}function Xu(e,t){const n=Tt(e),i=encodeURIComponent(t);return n?`${n}/avatar/${i}?meta=1`:`/avatar/${i}?meta=1`}async function Xi(e){if(!e.connected){e.chatAvatarUrl=null;return}const t=Yu(e);if(!t){e.chatAvatarUrl=null;return}e.chatAvatarUrl=null;const n=Xu(e.basePath,t);try{const i=await fetch(n,{method:"GET"});if(!i.ok){e.chatAvatarUrl=null;return}const s=await i.json(),o=typeof s.avatarUrl=="string"?s.avatarUrl.trim():"";e.chatAvatarUrl=o||null}catch{e.chatAvatarUrl=null}}const Zu={trace:!0,debug:!0,info:!0,warn:!0,error:!0,fatal:!0},ef={name:"",description:"",agentId:"",enabled:!0,scheduleKind:"every",scheduleAt:"",everyAmount:"30",everyUnit:"minutes",cronExpr:"0 7 * * *",cronTz:"",sessionTarget:"isolated",wakeMode:"now",payloadKind:"agentTurn",payloadText:"",deliveryMode:"announce",deliveryChannel:"last",deliveryTo:"",timeoutSeconds:""},tf=50,nf=200,sf="PT Vansting Agent";function Vo(e,t){if(typeof e!="string")return;const n=e.trim();if(n)return n.length<=t?n:n.slice(0,t)}function Bs(e){const t=Vo(e==null?void 0:e.name,tf)??sf,n=Vo((e==null?void 0:e.avatar)??void 0,nf)??null;return{agentId:typeof(e==null?void 0:e.agentId)=="string"&&e.agentId.trim()?e.agentId.trim():null,name:t,avatar:n}}async function Va(e,t){if(!e.client||!e.connected)return;const n=e.sessionKey.trim(),i=n?{sessionKey:n}:{};try{const s=await e.client.request("agent.identity.get",i);if(!s)return;const o=Bs(s);e.assistantName=o.name,e.assistantAvatar=o.avatar,e.assistantAgentId=o.agentId??null}catch{}}function Zi(e){return typeof e=="object"&&e!==null}function of(e){if(!Zi(e))return null;const t=typeof e.id=="string"?e.id.trim():"",n=e.request;if(!t||!Zi(n))return null;const i=typeof n.command=="string"?n.command.trim():"";if(!i)return null;const s=typeof e.createdAtMs=="number"?e.createdAtMs:0,o=typeof e.expiresAtMs=="number"?e.expiresAtMs:0;return!s||!o?null:{id:t,request:{command:i,cwd:typeof n.cwd=="string"?n.cwd:null,host:typeof n.host=="string"?n.host:null,security:typeof n.security=="string"?n.security:null,ask:typeof n.ask=="string"?n.ask:null,agentId:typeof n.agentId=="string"?n.agentId:null,resolvedPath:typeof n.resolvedPath=="string"?n.resolvedPath:null,sessionKey:typeof n.sessionKey=="string"?n.sessionKey:null},createdAtMs:s,expiresAtMs:o}}function rf(e){if(!Zi(e))return null;const t=typeof e.id=="string"?e.id.trim():"";return t?{id:t,decision:typeof e.decision=="string"?e.decision:null,resolvedBy:typeof e.resolvedBy=="string"?e.resolvedBy:null,ts:typeof e.ts=="number"?e.ts:null}:null}function Qa(e){const t=Date.now();return e.filter(n=>n.expiresAtMs>t)}function af(e,t){const n=Qa(e).filter(i=>i.id!==t.id);return n.push(t),n}function Qo(e,t){return Qa(e).filter(n=>n.id!==t)}function lf(e){return{}}const Jo={WEBCHAT:"webchat"},Yo={CONTROL_UI:"control-ui"},cf=4008;class df{constructor(t){this.opts=t,this.ws=null,this.pending=new Map,this.closed=!1,this.lastSeq=null,this.connectNonce=null,this.connectSent=!1,this.connectTimer=null,this.backoffMs=800}start(){this.closed=!1,this.connect()}stop(){var t;this.closed=!0,(t=this.ws)==null||t.close(),this.ws=null,this.flushPending(new Error("gateway client stopped"))}get connected(){var t;return((t=this.ws)==null?void 0:t.readyState)===WebSocket.OPEN}connect(){this.closed||(this.ws=new WebSocket(this.opts.url),this.ws.addEventListener("open",()=>this.queueConnect()),this.ws.addEventListener("message",t=>this.handleMessage(String(t.data??""))),this.ws.addEventListener("close",t=>{var i,s;const n=String(t.reason??"");this.ws=null,this.flushPending(new Error(`gateway closed (${t.code}): ${n}`)),(s=(i=this.opts).onClose)==null||s.call(i,{code:t.code,reason:n}),this.scheduleReconnect()}),this.ws.addEventListener("error",()=>{}))}scheduleReconnect(){if(this.closed)return;const t=this.backoffMs;this.backoffMs=Math.min(this.backoffMs*1.7,15e3),window.setTimeout(()=>this.connect(),t)}flushPending(t){for(const[,n]of this.pending)n.reject(t);this.pending.clear()}async sendConnect(){var f;if(this.connectSent)return;this.connectSent=!0,this.connectTimer!==null&&(window.clearTimeout(this.connectTimer),this.connectTimer=null);const t=typeof crypto<"u"&&!!crypto.subtle,n=["operator.admin","operator.approvals","operator.pairing"],i="operator";let s=null,o=!1,r=this.opts.token;if(t){s=await Is();const u=(f=ld({deviceId:s.deviceId,role:i}))==null?void 0:f.token;r=u??this.opts.token,o=!!(u&&this.opts.token)}const a=r||this.opts.password?{token:r,password:this.opts.password}:void 0;let l;if(t&&s){const u=Date.now(),g=this.connectNonce??void 0,y=lf({deviceId:s.deviceId,clientId:this.opts.clientName??Yo.CONTROL_UI,clientMode:this.opts.mode??Jo.WEBCHAT}),b=await Md(s.privateKey,y);l={id:s.deviceId,publicKey:s.publicKey,signature:b,signedAt:u,nonce:g}}const d={minProtocol:3,maxProtocol:3,client:{id:this.opts.clientName??Yo.CONTROL_UI,version:this.opts.clientVersion??"dev",platform:this.opts.platform??navigator.platform??"web",mode:this.opts.mode??Jo.WEBCHAT,instanceId:this.opts.instanceId},role:i,scopes:n,device:l,caps:[],auth:a,userAgent:navigator.userAgent,locale:navigator.language};this.request("connect",d).then(u=>{var g,y,b;(g=u==null?void 0:u.auth)!=null&&g.deviceToken&&s&&ma({deviceId:s.deviceId,role:u.auth.role??i,token:u.auth.deviceToken,scopes:u.auth.scopes??[]}),this.backoffMs=800,(b=(y=this.opts).onHello)==null||b.call(y,u)}).catch(()=>{var u;o&&s&&ya({deviceId:s.deviceId,role:i}),(u=this.ws)==null||u.close(cf,"connect failed")})}handleMessage(t){var s,o,r,a,l;let n;try{n=JSON.parse(t)}catch{return}const i=n;if(i.type==="event"){const d=n;if(d.event==="connect.challenge"){const u=d.payload,g=u&&typeof u.nonce=="string"?u.nonce:null;g&&(this.connectNonce=g,this.sendConnect());return}const f=typeof d.seq=="number"?d.seq:null;f!==null&&(this.lastSeq!==null&&f>this.lastSeq+1&&((o=(s=this.opts).onGap)==null||o.call(s,{expected:this.lastSeq+1,received:f})),this.lastSeq=f);try{(a=(r=this.opts).onEvent)==null||a.call(r,d)}catch(u){console.error("[gateway] event handler error:",u)}return}if(i.type==="res"){const d=n,f=this.pending.get(d.id);if(!f)return;this.pending.delete(d.id),d.ok?f.resolve(d.payload):f.reject(new Error(((l=d.error)==null?void 0:l.message)??"request failed"));return}}request(t,n){if(!this.ws||this.ws.readyState!==WebSocket.OPEN)return Promise.reject(new Error("gateway not connected"));const i=Ns(),s={type:"req",id:i,method:t,params:n},o=new Promise((r,a)=>{this.pending.set(i,{resolve:l=>r(l),reject:a})});return this.ws.send(JSON.stringify(s)),o}queueConnect(){this.connectNonce=null,this.connectSent=!1,this.connectTimer!==null&&window.clearTimeout(this.connectTimer),this.connectTimer=window.setTimeout(()=>{this.sendConnect()},750)}}function Ti(e,t){var a,l,d;const n=(e??"").trim(),i=(a=t.mainSessionKey)==null?void 0:a.trim();if(!i)return n;if(!n)return i;const s=((l=t.mainKey)==null?void 0:l.trim())||"main",o=(d=t.defaultAgentId)==null?void 0:d.trim();return n==="main"||n===s||o&&(n===`agent:${o}:main`||n===`agent:${o}:${s}`)?i:n}function uf(e,t){if(!(t!=null&&t.mainSessionKey))return;const n=Ti(e.sessionKey,t),i=Ti(e.settings.sessionKey,t),s=Ti(e.settings.lastActiveSessionKey,t),o=n||i||e.sessionKey,r={...e.settings,sessionKey:i||o,lastActiveSessionKey:s||o},a=r.sessionKey!==e.settings.sessionKey||r.lastActiveSessionKey!==e.settings.lastActiveSessionKey;o!==e.sessionKey&&(e.sessionKey=o),a&&Ke(e,r)}function Ja(e){e.lastError=null,e.hello=null,e.connected=!1,e.execApprovalQueue=[],e.execApprovalError=null;const t=e.client,n=new df({url:e.settings.gatewayUrl,token:e.settings.token.trim()?e.settings.token:void 0,password:e.password.trim()?e.password:void 0,clientName:"openclaw-control-ui",mode:"webchat",onHello:i=>{e.client===n&&(e.connected=!0,e.lastError=null,e.hello=i,pf(e,i),e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,Xn(e),Va(e),Ss(e),Gn(e,{quiet:!0}),We(e,{quiet:!0}),Ds(e))},onClose:({code:i,reason:s})=>{e.client===n&&(e.connected=!1,i!==1012&&(e.lastError=`disconnected (${i}): ${s||"no reason"}`))},onEvent:i=>{e.client===n&&ff(e,i)},onGap:({expected:i,received:s})=>{e.client===n&&(e.lastError=`event gap detected (expected seq ${i}, got ${s}); refresh recommended`)}});e.client=n,t==null||t.stop(),n.start()}function ff(e,t){try{gf(e,t)}catch(n){console.error("[gateway] handleGatewayEvent error:",t.event,n)}}function gf(e,t){if(e.eventLogBuffer=[{ts:Date.now(),event:t.event,payload:t.payload},...e.eventLogBuffer].slice(0,250),e.tab==="debug"&&(e.eventLog=e.eventLogBuffer),t.event==="agent"){if(e.onboarding)return;Mu(e,t.payload);return}if(t.event==="chat"){const n=t.payload;n!=null&&n.sessionKey&&Oa(e,n.sessionKey);const i=Ku(e,n);if(i==="final"||i==="error"||i==="aborted"){Xn(e),Ju(e);const s=n==null?void 0:n.runId;s&&e.refreshSessionsAfterChat.has(s)&&(e.refreshSessionsAfterChat.delete(s),i==="final"&&ut(e,{activeMinutes:ja}))}(i==="final"||i==="foreign_final")&&on(e);return}if(t.event==="presence"){const n=t.payload;n!=null&&n.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence,e.presenceError=null,e.presenceStatus=null);return}if(t.event==="cron"&&e.tab==="cron"&&Os(e),(t.event==="device.pair.requested"||t.event==="device.pair.resolved")&&We(e,{quiet:!0}),t.event==="exec.approval.requested"){const n=of(t.payload);if(n){e.execApprovalQueue=af(e.execApprovalQueue,n),e.execApprovalError=null;const i=Math.max(0,n.expiresAtMs-Date.now()+500);window.setTimeout(()=>{e.execApprovalQueue=Qo(e.execApprovalQueue,n.id)},i)}return}if(t.event==="exec.approval.resolved"){const n=rf(t.payload);n&&(e.execApprovalQueue=Qo(e.execApprovalQueue,n.id))}}function pf(e,t){const n=t.snapshot;n!=null&&n.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence),n!=null&&n.health&&(e.debugHealth=n.health),n!=null&&n.sessionDefaults&&uf(e,n.sessionDefaults)}const Xo="/api/bootstrap";async function hf(e){if(typeof window>"u"||typeof fetch!="function")return;const t=Tt(e.basePath??""),n=t?`${t}${Xo}`:Xo;try{const i=await fetch(n,{method:"GET",headers:{Accept:"application/json"},credentials:"same-origin"});if(!i.ok)return;const s=await i.json(),o=Bs({agentId:s.assistantAgentId??null,name:s.assistantName,avatar:s.assistantAvatar??null});e.assistantName=o.name,e.assistantAvatar=o.avatar,e.assistantAgentId=o.agentId??null}catch{}}function vf(e){e.basePath=vu(),hf(e),gu(e),wu(e,!0),mu(e),yu(e),window.addEventListener("popstate",e.popStateHandler),Ja(e),Xc(e),e.tab==="logs"&&ws(e),e.tab==="debug"&&ks(e)}function mf(e){qc(e)}function yf(e){var t;window.removeEventListener("popstate",e.popStateHandler),Zc(e),$s(e),xs(e),bu(e),(t=e.topbarObserver)==null||t.disconnect(),e.topbarObserver=null}function bf(e,t){if(!(e.tab==="chat"&&e.chatManualRefreshInFlight)){if(e.tab==="chat"&&(t.has("chatMessages")||t.has("chatToolMessages")||t.has("chatStream")||t.has("chatLoading")||t.has("tab"))){const n=t.has("tab"),i=t.has("chatLoading")&&t.get("chatLoading")===!0&&!e.chatLoading;an(e,n||i||!e.chatHasAutoScrolled)}e.tab==="logs"&&(t.has("logsEntries")||t.has("logsAutoFollow")||t.has("tab"))&&e.logsAutoFollow&&e.logsAtBottom&&la(e,t.has("tab")||t.has("logsAutoFollow"))}}const wf="未命名报价单";function Us(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}function $f(e){return(e||"").trim().replace(/\\/g,"/").toLowerCase()}function kf(e,t){const n=(t.file_path||"").trim();if(n){const i=e.workOriginalFileNamesByPath[$f(n)];if(typeof i=="string"&&i.trim())return i.trim()}return Zn(t)}function Zn(e){var i,s;const t=(i=e==null?void 0:e.name)==null?void 0:i.trim();if(t)return t;const n=(s=e==null?void 0:e.file_path)==null?void 0:s.trim();if(n){const o=n.replace(/\\/g,"/").split("/").filter(Boolean).pop();if(o)return o}return wf}function xf(e){try{if(typeof e!="string"||!e.trim())return null;const t=e.trim();return t.startsWith("{")&&t.endsWith("}")||t.startsWith("[")&&t.endsWith("]")?JSON.parse(t):null}catch{return null}}function Sf(e){const t=Array.isArray(e.fill_items_merged)?e.fill_items_merged:[];if(!t.length)return null;const n=Array.isArray(e.items)?e.items:[],i=Array.isArray(e.shortage)?e.shortage:[],s=new Map;for(const r of n)s.set(r.row,r);const o=t.map((r,a)=>{const l=r.row,d=s.get(l)??{},f=Number(r.qty??0),u=r.unit_price,g=u==null?null:Number(u),y=g==null||Number.isNaN(g)?null:g*f,b=String(r.code??""),k=String(r.quote_name??"").trim();let S=0,C=0;for(const L of i)if(L.row===l){S=Number(L.available_qty??0),C=Number(L.shortfall??0);break}const D=b==="无货"||k.includes("库存不足")?1:0;return!D&&C===0&&S===0&&b&&b!=="无货"&&(S=f),{row_index:a,row:typeof l=="number"?l:void 0,product_name:String(d.product_name??""),specification:String(r.specification??d.specification??""),qty:f,code:b,quote_name:k,unit_price:g,amount:y,available_qty:S,shortfall:C,is_shortage:D,match_source:null}});return{name:Zn({name:typeof e.name=="string"?e.name:"",file_path:typeof e.file_path=="string"?e.file_path:null}),file_path:typeof e.file_path=="string"?e.file_path:null,source:"file",lines:o}}function Af(e){if(!Array.isArray(e))return null;let t=null;for(const n of e){const i=n.type,s=n.content;if(i!=="observation"||typeof s!="string")continue;const o=xf(s);if(!o||typeof o!="object")continue;const r=o.pending_quotation_draft;if(r&&Array.isArray(r.lines)){t={...r,name:Zn(r)};continue}const a=Sf(o);a&&(t=a)}return t}function Ln(e,t,n){var s;if(e.workResult={success:n.success,answer:n.answer??"",trace:n.trace??[],error:n.error},e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null,!t.ok){e.workError=n.detail||n.error||"执行失败",e.workRunStatus="done",e.workRunId=null,e.workPendingChoices=[],e.workSelections={};return}if((n.status??"done")==="awaiting_choices"){e.workRunStatus="awaiting_choices",e.workRunId=n.run_id??null,e.workPendingChoices=n.pending_choices??[];const o={};for(const r of e.workPendingChoices)o[r.id]="__OOS__";e.workSelections=o}else{e.workRunStatus="done",e.workRunId=null,e.workPendingChoices=[],e.workSelections={};const o=n.pending_quotation_draft;if(o&&Array.isArray(o.lines))e.workPendingQuotationDraft={...o,name:Zn(o)};else{const r=(s=e.workResult)==null?void 0:s.trace;if(r){const a=Af(r);a&&(e.workPendingQuotationDraft=a)}}}}async function _f(e){if(!e.workFilePaths.length){e.workError="请先上传至少一个报价单文件";return}e.workRunning=!0,e.workRunStatus="running",e.workError=null,e.workResult=null,e.workRunId=null,e.workPendingChoices=[],e.workSelections={},e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null;try{const t=await fetch(Us(e.basePath,"/api/work/run-stream"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({file_paths:e.workFilePaths,customer_level:e.workCustomerLevel,do_register_oos:e.workDoRegisterOos}),credentials:"same-origin"});if(!t.ok||!t.body){const r=await t.json().catch(()=>({}));Ln(e,t,r);return}const n=t.body.getReader(),i=new TextDecoder;let s="",o=!1;for(;;){const{done:r,value:a}=await n.read();if(r)break;s+=i.decode(a,{stream:!0});const l=s.split(`
`);s=l.pop()??"";for(const d of l){if(!d.startsWith("data: "))continue;const f=d.slice(6).trim();if(f)try{const u=JSON.parse(f);if(u.type==="stage"&&typeof u.stage=="number")e.workProgressStage=u.stage;else if(u.type==="result"&&u.payload){Ln(e,{ok:!0},u.payload),o=!0;break}}catch{}}if(o)break}if(!o&&s.startsWith("data: "))try{const r=JSON.parse(s.slice(6).trim());r.type==="result"&&r.payload&&Ln(e,{ok:!0},r.payload)}catch{}}catch(t){e.workError=t instanceof Error?t.message:String(t),e.workResult={success:!1,error:e.workError},e.workRunStatus="done",e.workRunId=null,e.workPendingChoices=[],e.workSelections={}}finally{e.workRunning=!1}}async function Cf(e){const t=e.workRunId;if(!t||e.workPendingChoices.length===0)return;const n=e.workPendingChoices.map(i=>({item_id:i.id,selected_code:e.workSelections[i.id]??"__OOS__"}));e.workRunning=!0,e.workError=null;try{const i=await fetch(Us(e.basePath,"/api/work/resume"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({run_id:t,selections:n}),credentials:"same-origin"}),s=await i.json().catch(()=>({}));Ln(e,i,s)}catch(i){e.workError=i instanceof Error?i.message:String(i),e.workResult={success:!1,error:e.workError},e.workRunStatus="done",e.workRunId=null,e.workPendingChoices=[],e.workSelections={}}finally{e.workRunning=!1}}async function Tf(e){var n,i;const t=e.workPendingQuotationDraft;if(!((n=t==null?void 0:t.lines)!=null&&n.length)){e.workQuotationDraftSaveStatus={status:"error",error:"无报价明细可保存"};return}e.workQuotationDraftSaveStatus={status:"saving"};try{const o=await(await fetch(Us(e.basePath,"/api/quotation-drafts"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:kf(e,t),source:t.source||"file",file_path:t.file_path??void 0,lines:t.lines.map(r=>({product_name:r.product_name??"",specification:r.specification??"",qty:Number(r.qty)||0,code:r.code??"",quote_name:r.quote_name??"",unit_price:r.unit_price!=null?Number(r.unit_price):null,amount:r.amount!=null?Number(r.amount):null,available_qty:Number(r.available_qty)||0,shortfall:Number(r.shortfall)||0,is_shortage:r.is_shortage?1:0,match_source:r.match_source??null}))}),credentials:"same-origin"})).json().catch(()=>({}));o.success&&((i=o.data)==null?void 0:i.draft_no)!=null?(e.workQuotationDraftSaveStatus={status:"ok",draft_no:o.data.draft_no,draft_id:o.data.draft_id??0},e.workPendingQuotationDraft=null):e.workQuotationDraftSaveStatus={status:"error",error:o.detail||"保存失败"}}catch(s){e.workQuotationDraftSaveStatus={status:"error",error:s instanceof Error?s.message:String(s)}}}const Ef=[{value:"FACTORY_INC_TAX",label:"出厂价_含税"},{value:"FACTORY_EXC_TAX",label:"出厂价_不含税"},{value:"PURCHASE_EXC_TAX",label:"采购不含税"},{value:"A_MARGIN",label:"（二级代理）A级别 利润率"},{value:"A_QUOTE",label:"（二级代理）A级别 报单价格"},{value:"B_MARGIN",label:"（一级代理）B级别 利润率"},{value:"B_QUOTE",label:"（一级代理）B级别 报单价格"},{value:"C_MARGIN",label:"（聚万大客户）C级别 利润率"},{value:"C_QUOTE",label:"（聚万大客户）C级别报单价格"},{value:"D_MARGIN",label:"（青山大客户）D级别 利润率"},{value:"D_QUOTE",label:"（青山大客户）D级别 报单价格"},{value:"D_LOW",label:"（青山大客户）D级别 降低利润率"},{value:"E_MARGIN",label:"（大唐大客户）E级别（包运费） 利润率"},{value:"E_QUOTE",label:"（大唐大客户）E级别（包运费） 报单价格"}];function Zo(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}function Ya(e){try{if(typeof e!="string"||!e.trim())return null;const t=e.trim();return t.startsWith("{")&&t.endsWith("}")||t.startsWith("[")&&t.endsWith("]")?JSON.parse(t):null}catch{return null}}function Lf(e){const t=Ya(e);if(!t||typeof t!="object"){const f=e.length>800?e.slice(0,800)+`
…（已截断）`:e;return c`<pre style="font-size: 11px; margin: 0; white-space: pre-wrap; word-break: break-all;">${f}</pre>`}const n=t.success===!0,i=Array.isArray(t.to_fill)?t.to_fill:[],s=Array.isArray(t.shortage)?t.shortage:[],o=Array.isArray(t.unmatched)?t.unmatched:[],r=Array.isArray(t.items)?t.items:[],a=Array.isArray(t.fill_items_merged)?t.fill_items_merged:[];if(i.length||s.length||o.length||r.length||a.length)return c`
      <div style="font-size: 12px;">
        ${n===!1&&t.error?c`<p style="color: var(--danger, #c00); margin: 0 0 8px 0;">${String(t.error)}</p>`:w}
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 8px; margin-bottom: 8px;">
          ${r.length?c`<span class="muted">提取行数: ${r.length}</span>`:w}
          ${i.length?c`<span style="color: var(--success, #2e7d32);">填充: ${i.length}</span>`:w}
          ${s.length?c`<span style="color: var(--warning, #ed6c02);">缺货: ${s.length}</span>`:w}
          ${o.length?c`<span style="color: var(--muted);">未匹配: ${o.length}</span>`:w}
        </div>
        ${o.length?c`
              <details style="margin-top: 6px;">
                <summary>未匹配项 (${o.length})</summary>
                <ul style="margin: 4px 0 0 0; padding-left: 18px; font-size: 11px;">
                  ${o.slice(0,10).map(f=>c`<li>${[f.product_name,f.specification].filter(Boolean).join(" · ")||f.keywords||"-"}</li>`)}
                  ${o.length>10?c`<li class="muted">…共 ${o.length} 项</li>`:w}
                </ul>
              </details>
            `:w}
      </div>
    `;const l=Array.isArray(t.items)?t.items:[];if(l.length&&typeof t.success<"u")return c`
      <div style="font-size: 12px;">
        <span class="muted">提取询价行: ${l.length} 条</span>
      </div>
    `;const d=e.length>600?e.slice(0,600)+`
…`:e;return c`<pre style="font-size: 11px; margin: 0; white-space: pre-wrap;">${d}</pre>`}function Rf(e,t){const n=e.type,i=e.step,s=e.name,o=e.content??"";return n==="response"&&o?c`
      <div style="margin-bottom: 8px; padding: 8px; background: var(--bg-secondary, #f5f5f5); border-radius: 6px;">
        <span class="muted" style="font-size: 11px;">步骤 ${i??t+1} · 回复</span>
        <div style="white-space: pre-wrap; font-size: 12px; margin-top: 4px;">${o}</div>
      </div>
    `:n==="tool_call"&&s?c`
      <div style="margin-bottom: 4px;">
        <span class="muted" style="font-size: 11px;">步骤 ${i??t+1} · 调用 ${s}</span>
      </div>
    `:n==="observation"&&o?c`
      <div style="margin-bottom: 12px; padding: 8px; border: 1px solid var(--border); border-radius: 6px; background: var(--bg);">
        <span class="muted" style="font-size: 11px;">观察结果</span>
        <div style="margin-top: 6px;">${Lf(o)}</div>
      </div>
    `:w}const Ei=["识别表数据","查价格与库存","填表"];function If(e){if(!Array.isArray(e))return[];const t=[];for(const n of e){const i=n.type,s=n.content;if(i!=="observation"||typeof s!="string")continue;const o=Ya(s);if(!o||typeof o!="object")continue;const r=o.output_path;if(typeof r=="string"&&r.trim()){const a=r.replace(/\\/g,"/").split("/").filter(Boolean).pop()??"";a&&!t.includes(a)&&t.push(a)}}return t}function Mf(e){var q,X,re;const{basePath:t,workFilePaths:n,workRunning:i,workProgressStage:s,workRunStatus:o,workRunId:r,workPendingChoices:a,workSelections:l,workResult:d,workError:f,workCustomerLevel:u,workDoRegisterOos:g,workPendingQuotationDraft:y,workQuotationDraftSaveStatus:b,onAddFile:k,onRemoveFile:S,onCustomerLevelChange:C,onDoRegisterOosChange:D,onRun:L,onSelectionChange:R,onResume:x,onQuotationLineChange:m,onQuotationDraftSave:A,onQuotationDraftDismiss:I}=e,E=P=>{const N=Zo(t,"/api/quotation/upload"),z=new FormData;z.append("file",P),fetch(N,{method:"POST",body:z,credentials:"same-origin"}).then(J=>J.json()).then(J=>{typeof J.file_path=="string"&&k(J.file_path,J.file_name??P.name)}).catch(J=>console.error("Work upload",J))},K=P=>{var J;const N=P.target,z=(J=N.files)==null?void 0:J[0];z&&(E(z),N.value="")},B=P=>{var z;P.preventDefault();const N=(z=P.dataTransfer)==null?void 0:z.files;if(!(!N||!N.length))for(let J=0;J<N.length;J+=1){const se=N.item(J);se&&E(se)}},W=P=>{P.preventDefault(),P.dataTransfer&&(P.dataTransfer.dropEffect="copy")};return c`
    <section class="card" style="margin-bottom: 16px;">
      <div class="card-title" style="margin-bottom: 8px;">${T("tabs.work")}</div>
      <p class="muted" style="margin-bottom: 12px;">${T("subtitles.work")}</p>

      <div
        style="margin-bottom: 12px; padding: 8px; border-radius: 8px; border: 1px dashed var(--border); background: var(--bg-secondary, #fafafa);"
        @dragover=${W}
        @dragenter=${W}
        @drop=${B}
      >
        <label class="card-title" style="font-size: 13px;">报价单文件（可多选）</label>
        <input
          type="file"
          accept=".xlsx,.xls,.xlsm"
          @change=${K}
          style="margin-top: 6px;"
        />
        ${n.length?c`
              <ul style="margin-top: 8px; padding-left: 20px; font-size: 13px;">
                ${n.map((P,N)=>c`
                    <li style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                      <span style="word-break: break-all;">${P.split(/[/\\]/).pop()??P}</span>
                      <button
                        type="button"
                        class="btn btn-sm"
                        style="padding: 2px 8px;"
                        @click=${()=>S(N)}
                      >
                        移除
                      </button>
                    </li>
                  `)}
              </ul>
            `:c`<p class="muted" style="margin-top: 6px;">暂无文件，请上传 .xlsx / .xls / .xlsm</p>`}
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 12px;">
        <div>
          <label style="font-size: 12px; color: var(--muted);">客户档位</label>
          <select
            .value=${u}
            @change=${P=>C(P.target.value)}
            style="margin-left: 8px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--bg); color: var(--text); min-width: 140px;"
          >
            ${Ef.map(P=>c`<option value=${P.value}>${P.label}</option>`)}
          </select>
        </div>
        <label style="display: flex; align-items: center; gap: 6px; font-size: 13px;">
          <input type="checkbox" ?checked=${g} @change=${P=>D(P.target.checked)} />
          执行无货登记
        </label>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${i?c`
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                ${Ei.map((P,N)=>c`
                    <span
                      style="
                        padding: 6px 12px;
                        border-radius: 8px;
                        font-size: 13px;
                        background: ${s>=0&&N===s?"var(--accent)":"var(--bg-secondary, #eee)"};
                        color: ${s>=0&&N===s?"var(--bg)":"var(--muted)"};
                        transition: background 0.2s, color 0.2s;
                      "
                    >
                      ${N+1}. ${P}
                    </span>
                  `)}
              </div>
              <p class="muted" style="font-size: 12px; margin: 0;">当前阶段：${s>=0&&s<Ei.length?Ei[s]:"执行中"}</p>
            `:w}
        <div style="display: flex; gap: 8px;">
          <button
            class="btn"
            style="background: var(--accent); color: var(--bg);"
            ?disabled=${n.length===0||i}
            @click=${L}
          >
            ${i?"执行中…":"执行"}
          </button>
        </div>
      </div>

      ${f?c`<p style="margin-top: 12px; color: var(--danger, #e53935); font-size: 13px;">${f}</p>`:w}
    </section>

    ${o==="awaiting_choices"&&a.length?c`
          <section class="card" style="margin-bottom: 16px;">
            <div class="card-title">需要您选择</div>
            <p class="muted" style="margin-bottom: 12px;">以下项无法自动确定唯一型号，请为每项选择一个选项后点击「确认并继续」。</p>
            <ul style="list-style: none; padding: 0; margin: 0;">
              ${a.map(P=>c`
                  <li style="margin-bottom: 16px; padding: 12px; border: 1px solid var(--border); border-radius: 8px; background: var(--bg-secondary, #f5f5f5);">
                    <div style="font-size: 13px; margin-bottom: 8px;">
                      ${P.product_name??P.keywords??""}
                      ${P.specification?c`<span class="muted"> · ${P.specification}</span>`:w}
                      ${P.qty!=null?c`<span class="muted"> · 数量 ${P.qty}</span>`:w}
                    </div>
                    <select
                      style="width: 100%; max-width: 400px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--bg); color: var(--text); font-size: 13px;"
                      .value=${l[P.id]??"__OOS__"}
                      @change=${N=>R(P.id,N.target.value)}
                    >
                      <option value="__OOS__">按无货</option>
                      ${(P.options??[]).map(N=>c`<option value=${N.code}>${N.code}${N.matched_name?` · ${N.matched_name}`:""}${N.unit_price!=null?` · ¥${N.unit_price}`:""}</option>`)}
                    </select>
                  </li>
                `)}
            </ul>
            <button
              class="btn"
              style="margin-top: 12px; background: var(--accent); color: var(--bg);"
              ?disabled=${i}
              @click=${x}
            >
              ${i?"继续中…":"确认并继续"}
            </button>
          </section>
        `:w}

    ${(b==null?void 0:b.status)==="ok"?c`
          <section class="card" style="margin-bottom: 16px;">
            <p style="color: var(--success, #2e7d32); margin: 0 0 8px 0;">报价单已保存，编号：${b.draft_no}</p>
            <button class="btn btn-sm" @click=${I}>关闭</button>
          </section>
        `:(q=y==null?void 0:y.lines)!=null&&q.length?c`
            <section class="card" style="margin-bottom: 16px;">
              <div class="card-title">待确认报价单</div>
              <p class="muted" style="margin-bottom: 10px;">请核对并修改下表，确认无误后点击「确认并保存」落库并生成编号。</p>
              <div style="overflow-x: auto; margin-bottom: 12px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                  <thead>
                    <tr style="background: var(--bg-secondary, #eee);">
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">序号</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">产品名称</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">规格</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">需求数量</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">物料编号</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">报价名称</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">单价</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">金额</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">可用库存</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">缺口</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">缺货</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${y.lines.map((P,N)=>c`
                        <tr>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${N+1}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${P.product_name??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${P.specification??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input
                              type="number"
                              min="0"
                              step="1"
                              .value=${String(P.qty??"")}
                              @change=${z=>m(N,"qty",z.target.value)}
                              style="width: 70px; padding: 4px; box-sizing: border-box;"
                            />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input
                              type="text"
                              .value=${P.code??""}
                              @change=${z=>m(N,"code",z.target.value)}
                              style="width: 90px; padding: 4px; box-sizing: border-box;"
                            />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input
                              type="text"
                              .value=${P.quote_name??""}
                              @change=${z=>m(N,"quote_name",z.target.value)}
                              style="width: 120px; padding: 4px; box-sizing: border-box;"
                            />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              .value=${P.unit_price!=null?String(P.unit_price):""}
                              @change=${z=>m(N,"unit_price",z.target.value)}
                              style="width: 80px; padding: 4px; box-sizing: border-box;"
                            />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${P.amount!=null?P.amount:""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${P.available_qty??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${P.shortfall??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${P.is_shortage?"是":"否"}</td>
                        </tr>
                      `)}
                  </tbody>
                </table>
              </div>
              ${(b==null?void 0:b.status)==="error"?c`<p style="color: var(--danger, #c00); margin-bottom: 10px;">${b.error}</p>`:w}
              <div style="display: flex; gap: 8px;">
                <button
                  class="btn"
                  style="background: var(--accent); color: var(--bg);"
                  ?disabled=${(b==null?void 0:b.status)==="saving"}
                  @click=${A}
                >
                  ${(b==null?void 0:b.status)==="saving"?"保存中…":"确认并保存"}
                </button>
                <button
                  class="btn btn-sm"
                  ?disabled=${(b==null?void 0:b.status)==="saving"}
                  @click=${I}
                >
                  取消
                </button>
              </div>
            </section>
          `:w}

    ${d&&!((X=y==null?void 0:y.lines)!=null&&X.length)?c`
          <section class="card">
            <div class="card-title">执行结果</div>
            ${n.length>1?c`<p class="muted" style="font-size: 12px; margin-bottom: 8px;">多文件时为汇总结果，输出文件见下方总结。</p>`:w}
            ${(()=>{const P=If(d.trace);return P.length?c`
                    <div style="margin-bottom: 12px;">
                      ${P.map(N=>c`
                          <a
                            href=${Zo(t,`/api/quotation/download?path=${encodeURIComponent(N)}`)}
                            download=${N}
                            class="btn btn-sm"
                            style="margin-right: 8px; margin-bottom: 6px; text-decoration: none;"
                          >
                            下载 ${N}
                          </a>
                        `)}
                      <p class="muted" style="font-size: 11px; margin: 4px 0 0 0;">云端部署时请及时下载到本地保存，服务器重启后文件会丢失。</p>
                    </div>
                  `:w})()}
            ${d.answer?c`<div style="white-space: pre-wrap; margin-bottom: 12px;">${d.answer}</div>`:w}
            ${d.error?c`<p style="color: var(--danger, #e53935);">${d.error}</p>`:w}
            ${(re=d.trace)!=null&&re.length?c`
                  <details style="margin-top: 12px;">
                    <summary>步骤记录（${d.trace.length} 条）</summary>
                    <div style="max-height: 420px; overflow: auto; margin-top: 8px;">
                      ${d.trace.map((P,N)=>Rf(P,N))}
                    </div>
                  </details>
                `:w}
          </section>
        `:w}
  `}function er(e){return(e||"").trim().replace(/\\/g,"/").toLowerCase()}function Pf(e){return e.tab!=="work"?w:Mf({basePath:e.basePath,workFilePaths:e.workFilePaths,workRunning:e.workRunning,workProgressStage:e.workProgressStage,workRunStatus:e.workRunStatus,workRunId:e.workRunId,workPendingChoices:e.workPendingChoices,workSelections:e.workSelections,workResult:e.workResult,workError:e.workError,workCustomerLevel:e.workCustomerLevel,workDoRegisterOos:e.workDoRegisterOos,workOriginalFileNamesByPath:e.workOriginalFileNamesByPath,workPendingQuotationDraft:e.workPendingQuotationDraft,workQuotationDraftSaveStatus:e.workQuotationDraftSaveStatus,onAddFile:(t,n)=>{e.workFilePaths.includes(t)||(e.workFilePaths=[...e.workFilePaths,t]);const i=er(t);i&&(e.workOriginalFileNamesByPath={...e.workOriginalFileNamesByPath,[i]:(n||"").trim()||t.split(/[/\\]/).pop()||t})},onRemoveFile:t=>{const n=e.workFilePaths[t]??"";e.workFilePaths=e.workFilePaths.filter((s,o)=>o!==t);const i=er(n);if(i&&e.workOriginalFileNamesByPath[i]!==void 0){const s={...e.workOriginalFileNamesByPath};delete s[i],e.workOriginalFileNamesByPath=s}},onCustomerLevelChange:t=>{e.workCustomerLevel=t},onDoRegisterOosChange:t=>{e.workDoRegisterOos=t},onRun:()=>void _f(e),onSelectionChange:(t,n)=>{e.workSelections={...e.workSelections,[t]:n}},onResume:()=>void Cf(e),onQuotationLineChange:(t,n,i)=>{var a;const s=e.workPendingQuotationDraft;if(!((a=s==null?void 0:s.lines)!=null&&a.length)||t<0||t>=s.lines.length)return;const o=s.lines.slice(),r={...o[t]};if(n==="qty"){const l=Number(i);r.qty=Number.isFinite(l)?l:0}else if(n==="unit_price"){const l=String(i??"").trim();if(!l)r.unit_price=null;else{const d=Number(l);r.unit_price=Number.isFinite(d)?d:null}}else r[n]=i;if(n==="qty"||n==="unit_price"){const l=Number(r.qty??0),d=r.unit_price==null?NaN:Number(r.unit_price);r.amount=Number.isFinite(l)&&Number.isFinite(d)?l*d:null}o[t]=r,e.workPendingQuotationDraft={...s,lines:o}},onQuotationDraftSave:()=>void Tf(e),onQuotationDraftDismiss:()=>{e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null}})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const zs={CHILD:2},js=e=>(...t)=>({_$litDirective$:e,values:t});let Hs=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,i){this._$Ct=t,this._$AM=n,this._$Ci=i}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:Ff}=cc,tr=e=>e,Df=e=>e.strings===void 0,nr=()=>document.createComment(""),Ft=(e,t,n)=>{var o;const i=e._$AA.parentNode,s=t===void 0?e._$AB:t._$AA;if(n===void 0){const r=i.insertBefore(nr(),s),a=i.insertBefore(nr(),s);n=new Ff(r,a,e,e.options)}else{const r=n._$AB.nextSibling,a=n._$AM,l=a!==e;if(l){let d;(o=n._$AQ)==null||o.call(n,e),n._$AM=e,n._$AP!==void 0&&(d=e._$AU)!==a._$AU&&n._$AP(d)}if(r!==s||l){let d=n._$AA;for(;d!==r;){const f=tr(d).nextSibling;tr(i).insertBefore(d,s),d=f}}}return n},Ye=(e,t,n=e)=>(e._$AI(t,n),e),Of={},Nf=(e,t=Of)=>e._$AH=t,Bf=e=>e._$AH,Li=e=>{e._$AR(),e._$AA.remove()};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ir=(e,t,n)=>{const i=new Map;for(let s=t;s<=n;s++)i.set(e[s],s);return i},Xa=js(class extends Hs{constructor(e){if(super(e),e.type!==zs.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,n){let i;n===void 0?n=t:t!==void 0&&(i=t);const s=[],o=[];let r=0;for(const a of e)s[r]=i?i(a,r):r,o[r]=n(a,r),r++;return{values:o,keys:s}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,i]){const s=Bf(e),{values:o,keys:r}=this.dt(t,n,i);if(!Array.isArray(s))return this.ut=r,o;const a=this.ut??(this.ut=[]),l=[];let d,f,u=0,g=s.length-1,y=0,b=o.length-1;for(;u<=g&&y<=b;)if(s[u]===null)u++;else if(s[g]===null)g--;else if(a[u]===r[y])l[y]=Ye(s[u],o[y]),u++,y++;else if(a[g]===r[b])l[b]=Ye(s[g],o[b]),g--,b--;else if(a[u]===r[b])l[b]=Ye(s[u],o[b]),Ft(e,l[b+1],s[u]),u++,b--;else if(a[g]===r[y])l[y]=Ye(s[g],o[y]),Ft(e,s[u],s[g]),g--,y++;else if(d===void 0&&(d=ir(r,y,b),f=ir(a,u,g)),d.has(a[u]))if(d.has(a[g])){const k=f.get(r[y]),S=k!==void 0?s[k]:null;if(S===null){const C=Ft(e,s[u]);Ye(C,o[y]),l[y]=C}else l[y]=Ye(S,o[y]),Ft(e,s[u],S),s[k]=null;y++}else Li(s[g]),g--;else Li(s[u]),u++;for(;y<=b;){const k=Ft(e,l[b+1]);Ye(k,o[y]),l[y++]=k}for(;u<=g;){const k=s[u++];k!==null&&Li(k)}return this.ut=r,Nf(e,l),He}}),ie={messageSquare:c`
    <svg viewBox="0 0 24 24">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  `,barChart:c`
    <svg viewBox="0 0 24 24">
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  `,link:c`
    <svg viewBox="0 0 24 24">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  `,radio:c`
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="2" />
      <path
        d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"
      />
    </svg>
  `,fileText:c`
    <svg viewBox="0 0 24 24">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  `,zap:c`
    <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
  `,monitor:c`
    <svg viewBox="0 0 24 24">
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  `,settings:c`
    <svg viewBox="0 0 24 24">
      <path
        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
  `,bug:c`
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
  `,scrollText:c`
    <svg viewBox="0 0 24 24">
      <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
      <path d="M19 17V5a2 2 0 0 0-2-2H4" />
      <path d="M15 8h-5" />
      <path d="M15 12h-5" />
    </svg>
  `,folder:c`
    <svg viewBox="0 0 24 24">
      <path
        d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      />
    </svg>
  `,menu:c`
    <svg viewBox="0 0 24 24">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  `,x:c`
    <svg viewBox="0 0 24 24">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  `,check:c`
    <svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg>
  `,arrowDown:c`
    <svg viewBox="0 0 24 24">
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  `,copy:c`
    <svg viewBox="0 0 24 24">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  `,search:c`
    <svg viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  `,brain:c`
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
  `,book:c`
    <svg viewBox="0 0 24 24">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  `,loader:c`
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
  `,wrench:c`
    <svg viewBox="0 0 24 24">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      />
    </svg>
  `,fileCode:c`
    <svg viewBox="0 0 24 24">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="m10 13-2 2 2 2" />
      <path d="m14 17 2-2-2-2" />
    </svg>
  `,edit:c`
    <svg viewBox="0 0 24 24">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  `,penLine:c`
    <svg viewBox="0 0 24 24">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  `,paperclip:c`
    <svg viewBox="0 0 24 24">
      <path
        d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"
      />
    </svg>
  `,globe:c`
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  `,image:c`
    <svg viewBox="0 0 24 24">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  `,smartphone:c`
    <svg viewBox="0 0 24 24">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  `,plug:c`
    <svg viewBox="0 0 24 24">
      <path d="M12 22v-5" />
      <path d="M9 8V2" />
      <path d="M15 8V2" />
      <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
    </svg>
  `,circle:c`
    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
  `,puzzle:c`
    <svg viewBox="0 0 24 24">
      <path
        d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.076.874.54 1.02 1.02a2.5 2.5 0 1 0 3.237-3.237c-.48-.146-.944-.505-1.02-1.02a.98.98 0 0 1 .303-.917l1.526-1.526A2.402 2.402 0 0 1 11.998 2c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.236 3.236c-.464.18-.894.527-.967 1.02Z"
      />
    </svg>
  `};function Uf(e){var s,o,r,a,l;const t=(s=e.hello)==null?void 0:s.snapshot,n=(r=(o=t==null?void 0:t.sessionDefaults)==null?void 0:o.mainSessionKey)==null?void 0:r.trim();if(n)return n;const i=(l=(a=t==null?void 0:t.sessionDefaults)==null?void 0:a.mainKey)==null?void 0:l.trim();return i||"main"}function zf(e,t){e.sessionKey=t,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:t,lastActiveSessionKey:t})}function jf(e,t){const n=Ps(t,e.basePath);return c`
    <a
      href=${n}
      class="nav-item ${e.tab===t?"active":""}"
      @click=${i=>{if(!(i.defaultPrevented||i.button!==0||i.metaKey||i.ctrlKey||i.shiftKey||i.altKey)){if(i.preventDefault(),t==="chat"){const s=Uf(e);e.sessionKey!==s&&(zf(e,s),e.loadAssistantIdentity())}e.setTab(t)}}}
      title=${Qi(t)}
    >
      <span class="nav-item__icon" aria-hidden="true">${ie[ru(t)]}</span>
      <span class="nav-item__text">${Qi(t)}</span>
    </a>
  `}function Hf(e){const t=Kf(e.hello,e.sessionsResult),n=Wf(e.sessionKey,e.sessionsResult,t),i=e.onboarding,s=e.onboarding,o=e.onboarding?!1:e.settings.chatShowThinking,r=e.onboarding?!0:e.settings.chatFocusMode,a=c`
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
  `,l=c`
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
  `;return c`
    <div class="chat-controls">
      <label class="field chat-controls__session">
        <select
          .value=${e.sessionKey}
          ?disabled=${!e.connected}
          @change=${d=>{const f=d.target.value;e.sessionKey=f,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:f,lastActiveSessionKey:f}),e.loadAssistantIdentity(),ku(e,f),on(e)}}
        >
          ${Xa(n,d=>d.key,d=>c`<option value=${d.key} title=${d.key}>
                ${d.displayName??d.key}
              </option>`)}
        </select>
      </label>
      <button
        class="btn btn--sm btn--icon"
        ?disabled=${e.chatLoading||!e.connected}
        @click=${async()=>{const d=e;d.chatManualRefreshInFlight=!0,d.chatNewMessagesBelow=!1,await d.updateComplete,d.resetToolStream();try{await Wa(e,{scheduleScroll:!1}),d.scrollToBottom({smooth:!0})}finally{requestAnimationFrame(()=>{d.chatManualRefreshInFlight=!1,d.chatNewMessagesBelow=!1})}}}
        title=${T("chat.refreshTitle")}
      >
        ${a}
      </button>
      <span class="chat-controls__separator">|</span>
      <button
        class="btn btn--sm btn--icon ${o?"active":""}"
        ?disabled=${i}
        @click=${()=>{i||e.applySettings({...e.settings,chatShowThinking:!e.settings.chatShowThinking})}}
        aria-pressed=${o}
        title=${T(i?"chat.onboardingDisabled":"chat.thinkingToggle")}
      >
        ${ie.brain}
      </button>
      <button
        class="btn btn--sm btn--icon ${r?"active":""}"
        ?disabled=${s}
        @click=${()=>{s||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})}}
        aria-pressed=${r}
        title=${T(s?"chat.onboardingDisabled":"chat.focusToggle")}
      >
        ${l}
      </button>
    </div>
  `}function Kf(e,t){var o,r,a,l,d;const n=e==null?void 0:e.snapshot,i=(r=(o=n==null?void 0:n.sessionDefaults)==null?void 0:o.mainSessionKey)==null?void 0:r.trim();if(i)return i;const s=(l=(a=n==null?void 0:n.sessionDefaults)==null?void 0:a.mainKey)==null?void 0:l.trim();return s||((d=t==null?void 0:t.sessions)!=null&&d.some(f=>f.key==="main")?"main":null)}const Rn={bluebubbles:"iMessage",telegram:"Telegram",discord:"Discord",signal:"Signal",slack:"Slack",whatsapp:"WhatsApp",matrix:"Matrix",email:"Email",sms:"SMS"},qf=Object.keys(Rn);function sr(e){return e.charAt(0).toUpperCase()+e.slice(1)}function Gf(e){if(e==="main"||e==="agent:main:main")return{prefix:"",fallbackName:"Main Session"};if(e.includes(":subagent:"))return{prefix:"Subagent:",fallbackName:"Subagent:"};if(e.includes(":cron:"))return{prefix:"Cron:",fallbackName:"Cron Job:"};const t=e.match(/^agent:[^:]+:([^:]+):direct:(.+)$/);if(t){const i=t[1],s=t[2];return{prefix:"",fallbackName:`${Rn[i]??sr(i)} · ${s}`}}const n=e.match(/^agent:[^:]+:([^:]+):group:(.+)$/);if(n){const i=n[1];return{prefix:"",fallbackName:`${Rn[i]??sr(i)} Group`}}for(const i of qf)if(e===i||e.startsWith(`${i}:`))return{prefix:"",fallbackName:`${Rn[i]} Session`};return{prefix:"",fallbackName:e}}function Ri(e,t){var a,l;const n=((a=t==null?void 0:t.label)==null?void 0:a.trim())||"",i=((l=t==null?void 0:t.displayName)==null?void 0:l.trim())||"",{prefix:s,fallbackName:o}=Gf(e),r=d=>s?new RegExp(`^${s.replace(/[.*+?^${}()|[\\]\\]/g,"\\$&")}\\s*`,"i").test(d)?d:`${s} ${d}`:d;return n&&n!==e?r(n):i&&i!==e?r(i):o}function Wf(e,t,n){var a,l;const i=new Set,s=[],o=n&&((a=t==null?void 0:t.sessions)==null?void 0:a.find(d=>d.key===n)),r=(l=t==null?void 0:t.sessions)==null?void 0:l.find(d=>d.key===e);if(n&&(i.add(n),s.push({key:n,displayName:Ri(n,o||void 0)})),i.has(e)||(i.add(e),s.push({key:e,displayName:Ri(e,r)})),t!=null&&t.sessions)for(const d of t.sessions)i.has(d.key)||(i.add(d.key),s.push({key:d.key,displayName:Ri(d.key,d)}));return s}const Vf=["system","light","dark"];function Qf(e){const t=Math.max(0,Vf.indexOf(e.theme)),n=i=>s=>{const r={element:s.currentTarget};(s.clientX||s.clientY)&&(r.pointerClientX=s.clientX,r.pointerClientY=s.clientY),e.setTheme(i,r)};return c`
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
          ${Xf()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="light"?"active":""}"
          @click=${n("light")}
          aria-pressed=${e.theme==="light"}
          aria-label="Light theme"
          title="Light"
        >
          ${Jf()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="dark"?"active":""}"
          @click=${n("dark")}
          aria-pressed=${e.theme==="dark"}
          aria-label="Dark theme"
          title="Dark"
        >
          ${Yf()}
        </button>
      </div>
    </div>
  `}function Jf(){return c`
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
  `}function Yf(){return c`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
      ></path>
    </svg>
  `}function Xf(){return c`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="20" height="14" x="2" y="3" rx="2"></rect>
      <line x1="8" x2="16" y1="21" y2="21"></line>
      <line x1="12" x2="12" y1="17" y2="21"></line>
    </svg>
  `}function Za(e,t){if(!e)return e;const i=e.files.some(s=>s.name===t.name)?e.files.map(s=>s.name===t.name?t:s):[...e.files,t];return{...e,files:i}}async function Ii(e,t){if(!(!e.client||!e.connected||e.agentFilesLoading)){e.agentFilesLoading=!0,e.agentFilesError=null;try{const n=await e.client.request("agents.files.list",{agentId:t});n&&(e.agentFilesList=n,e.agentFileActive&&!n.files.some(i=>i.name===e.agentFileActive)&&(e.agentFileActive=null))}catch(n){e.agentFilesError=String(n)}finally{e.agentFilesLoading=!1}}}async function Zf(e,t,n,i){if(!(!e.client||!e.connected||e.agentFilesLoading)&&!Object.hasOwn(e.agentFileContents,n)){e.agentFilesLoading=!0,e.agentFilesError=null;try{const s=await e.client.request("agents.files.get",{agentId:t,name:n});if(s!=null&&s.file){const o=s.file.content??"",r=e.agentFileContents[n]??"",a=e.agentFileDrafts[n],l=(i==null?void 0:i.preserveDraft)??!0;e.agentFilesList=Za(e.agentFilesList,s.file),e.agentFileContents={...e.agentFileContents,[n]:o},(!l||!Object.hasOwn(e.agentFileDrafts,n)||a===r)&&(e.agentFileDrafts={...e.agentFileDrafts,[n]:o})}}catch(s){e.agentFilesError=String(s)}finally{e.agentFilesLoading=!1}}}async function eg(e,t,n,i){if(!(!e.client||!e.connected||e.agentFileSaving)){e.agentFileSaving=!0,e.agentFilesError=null;try{const s=await e.client.request("agents.files.set",{agentId:t,name:n,content:i});s!=null&&s.file&&(e.agentFilesList=Za(e.agentFilesList,s.file),e.agentFileContents={...e.agentFileContents,[n]:i},e.agentFileDrafts={...e.agentFileDrafts,[n]:i})}catch(s){e.agentFilesError=String(s)}finally{e.agentFileSaving=!1}}}function el(e){return e?`${Fn(e)} (${qe(e)})`:"n/a"}function tg(e){if(e.totalTokens==null)return"n/a";const t=e.totalTokens??0,n=e.contextTokens??0;return n?`${t} / ${n}`:String(t)}function ng(e){if(e==null)return"";try{return JSON.stringify(e,null,2)}catch{return String(e)}}function ig(e){const t=e.state??{},n=t.nextRunAtMs?Fn(t.nextRunAtMs):"n/a",i=t.lastRunAtMs?Fn(t.lastRunAtMs):"n/a";return`${t.lastStatus??"n/a"} · next ${n} · last ${i}`}function sg(e){const t=e.schedule;if(t.kind==="at"){const n=Date.parse(t.at);return Number.isFinite(n)?`At ${Fn(n)}`:`At ${t.at}`}return t.kind==="every"?`Every ${fa(t.everyMs)}`:`Cron ${t.expr}${t.tz?` (${t.tz})`:""}`}function og(e){const t=e.payload;if(t.kind==="systemEvent")return`System: ${t.text}`;const n=`Agent: ${t.message}`,i=e.delivery;if(i&&i.mode!=="none"){const s=i.mode==="webhook"?i.to?` (${i.to})`:"":i.channel||i.to?` (${i.channel??"last"}${i.to?` -> ${i.to}`:""})`:"";return`${n} · ${i.mode}${s}`}return n}function De(e){const t=(e??"").trim();return t?t.replace(/\s+/g,"_").toLowerCase():""}function rg(e){return[]}function ag(e){return{allow:[],alsoAllow:[],deny:[]}}const or=[{id:"fs",label:"Files",tools:[{id:"read",label:"read",description:"Read file contents"},{id:"write",label:"write",description:"Create or overwrite files"},{id:"edit",label:"edit",description:"Make precise edits"},{id:"apply_patch",label:"apply_patch",description:"Patch files (OpenAI)"}]},{id:"runtime",label:"Runtime",tools:[{id:"exec",label:"exec",description:"Run shell commands"},{id:"process",label:"process",description:"Manage background processes"}]},{id:"web",label:"Web",tools:[{id:"web_search",label:"web_search",description:"Search the web"},{id:"web_fetch",label:"web_fetch",description:"Fetch web content"}]},{id:"memory",label:"Memory",tools:[{id:"memory_search",label:"memory_search",description:"Semantic search"},{id:"memory_get",label:"memory_get",description:"Read memory files"}]},{id:"sessions",label:"Sessions",tools:[{id:"sessions_list",label:"sessions_list",description:"List sessions"},{id:"sessions_history",label:"sessions_history",description:"Session history"},{id:"sessions_send",label:"sessions_send",description:"Send to session"},{id:"sessions_spawn",label:"sessions_spawn",description:"Spawn sub-agent"},{id:"session_status",label:"session_status",description:"Session status"}]},{id:"ui",label:"UI",tools:[{id:"browser",label:"browser",description:"Control web browser"},{id:"canvas",label:"canvas",description:"Control canvases"}]},{id:"messaging",label:"Messaging",tools:[{id:"message",label:"message",description:"Send messages"}]},{id:"automation",label:"Automation",tools:[{id:"cron",label:"cron",description:"Schedule tasks"},{id:"gateway",label:"gateway",description:"Gateway control"}]},{id:"nodes",label:"Nodes",tools:[{id:"nodes",label:"nodes",description:"Nodes + devices"}]},{id:"agents",label:"Agents",tools:[{id:"agents_list",label:"agents_list",description:"List agents"}]},{id:"media",label:"Media",tools:[{id:"image",label:"image",description:"Image understanding"}]}],lg=[{id:"minimal",label:"Minimal"},{id:"coding",label:"Coding"},{id:"messaging",label:"Messaging"},{id:"full",label:"Full"}];function es(e){var t,n,i;return((t=e.name)==null?void 0:t.trim())||((i=(n=e.identity)==null?void 0:n.name)==null?void 0:i.trim())||e.id}function bn(e){const t=e.trim();if(!t||t.length>16)return!1;let n=!1;for(let i=0;i<t.length;i+=1)if(t.charCodeAt(i)>127){n=!0;break}return!(!n||t.includes("://")||t.includes("/")||t.includes("."))}function ei(e,t){var r,a,l,d,f,u;const n=(r=t==null?void 0:t.emoji)==null?void 0:r.trim();if(n&&bn(n))return n;const i=(l=(a=e.identity)==null?void 0:a.emoji)==null?void 0:l.trim();if(i&&bn(i))return i;const s=(d=t==null?void 0:t.avatar)==null?void 0:d.trim();if(s&&bn(s))return s;const o=(u=(f=e.identity)==null?void 0:f.avatar)==null?void 0:u.trim();return o&&bn(o)?o:""}function tl(e,t){return t&&e===t?"default":null}function cg(e){if(e==null||!Number.isFinite(e))return"-";if(e<1024)return`${e} B`;const t=["KB","MB","GB","TB"];let n=e/1024,i=0;for(;n>=1024&&i<t.length-1;)n/=1024,i+=1;return`${n.toFixed(n<10?1:0)} ${t[i]}`}function ti(e,t){var o,r;const n=e;return{entry:(((o=n==null?void 0:n.agents)==null?void 0:o.list)??[]).find(a=>(a==null?void 0:a.id)===t),defaults:(r=n==null?void 0:n.agents)==null?void 0:r.defaults,globalTools:n==null?void 0:n.tools}}function rr(e,t,n,i,s){var y,b,k,S,C,D,L,R,x,m,A,I;const o=ti(t,e.id),a=(n&&n.agentId===e.id?n.workspace:null)||((y=o.entry)==null?void 0:y.workspace)||((b=o.defaults)==null?void 0:b.workspace)||"default",l=(k=o.entry)!=null&&k.model?Wt((S=o.entry)==null?void 0:S.model):Wt((C=o.defaults)==null?void 0:C.model),d=((D=s==null?void 0:s.name)==null?void 0:D.trim())||((R=(L=e.identity)==null?void 0:L.name)==null?void 0:R.trim())||((x=e.name)==null?void 0:x.trim())||((m=o.entry)==null?void 0:m.name)||e.id,f=ei(e,s)||"-",u=Array.isArray((A=o.entry)==null?void 0:A.skills)?(I=o.entry)==null?void 0:I.skills:null,g=(u==null?void 0:u.length)??null;return{workspace:a,model:l,identityName:d,identityEmoji:f,skillsLabel:u?`${g} selected`:"all skills",isDefault:!!(i&&e.id===i)}}function Wt(e){var t;if(!e)return"-";if(typeof e=="string")return e.trim()||"-";if(typeof e=="object"&&e){const n=e,i=(t=n.primary)==null?void 0:t.trim();if(i){const s=Array.isArray(n.fallbacks)?n.fallbacks.length:0;return s>0?`${i} (+${s} fallback)`:i}}return"-"}function ar(e){const t=e.match(/^(.+) \(\+\d+ fallback\)$/);return t?t[1]:e}function lr(e){if(!e)return null;if(typeof e=="string")return e.trim()||null;if(typeof e=="object"&&e){const t=e,n=typeof t.primary=="string"?t.primary:typeof t.model=="string"?t.model:typeof t.id=="string"?t.id:typeof t.value=="string"?t.value:null;return(n==null?void 0:n.trim())||null}return null}function dg(e){if(!e||typeof e=="string")return null;if(typeof e=="object"&&e){const t=e,n=Array.isArray(t.fallbacks)?t.fallbacks:Array.isArray(t.fallback)?t.fallback:null;return n?n.filter(i=>typeof i=="string"):null}return null}function ug(e){return e.split(",").map(t=>t.trim()).filter(Boolean)}function fg(e){var s,o,r;const t=e,n=(o=(s=t==null?void 0:t.agents)==null?void 0:s.defaults)==null?void 0:o.models;if(!n||typeof n!="object")return[];const i=[];for(const[a,l]of Object.entries(n)){const d=a.trim();if(!d)continue;const f=l&&typeof l=="object"&&"alias"in l&&typeof l.alias=="string"?(r=l.alias)==null?void 0:r.trim():void 0,u=f&&f!==d?`${f} (${d})`:d;i.push({value:d,label:u})}return i}function gg(e,t){const n=fg(e),i=t?n.some(s=>s.value===t):!1;return t&&!i&&n.unshift({value:t,label:`Current (${t})`}),n.length===0?c`
      <option value="" disabled>No configured models</option>
    `:n.map(s=>c`<option value=${s.value}>${s.label}</option>`)}function pg(e){const t=De(e);if(!t)return{kind:"exact",value:""};if(t==="*")return{kind:"all"};if(!t.includes("*"))return{kind:"exact",value:t};const n=t.replace(/[.*+?^${}()|[\\]\\]/g,"\\$&");return{kind:"regex",value:new RegExp(`^${n.replaceAll("\\*",".*")}$`)}}function ts(e){return Array.isArray(e)?rg().map(pg).filter(t=>t.kind!=="exact"||t.value.length>0):[]}function Vt(e,t){for(const n of t)if(n.kind==="all"||n.kind==="exact"&&e===n.value||n.kind==="regex"&&n.value.test(e))return!0;return!1}function hg(e,t){if(!t)return!0;const n=De(e),i=ts(t.deny);if(Vt(n,i))return!1;const s=ts(t.allow);return!!(s.length===0||Vt(n,s)||n==="apply_patch"&&Vt("exec",s))}function cr(e,t){if(!Array.isArray(t)||t.length===0)return!1;const n=De(e),i=ts(t);return!!(Vt(n,i)||n==="apply_patch"&&Vt("exec",i))}function vg(e){return ag()??void 0}function nl(e,t){return c`
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
  `}function mg(e,t){var i,s;const n=(i=e.channelMeta)==null?void 0:i.find(o=>o.id===t);return n!=null&&n.label?n.label:((s=e.channelLabels)==null?void 0:s[t])??t}function yg(e){var s;if(!e)return[];const t=new Set;for(const o of e.channelOrder??[])t.add(o);for(const o of e.channelMeta??[])t.add(o.id);for(const o of Object.keys(e.channelAccounts??{}))t.add(o);const n=[],i=(s=e.channelOrder)!=null&&s.length?e.channelOrder:Array.from(t);for(const o of i)t.has(o)&&(n.push(o),t.delete(o));for(const o of t)n.push(o);return n.map(o=>{var r;return{id:o,label:mg(e,o),accounts:((r=e.channelAccounts)==null?void 0:r[o])??[]}})}const bg=["groupPolicy","streamMode","dmPolicy"];function wg(e,t){if(!e)return null;const i=(e.channels??{})[t];if(i&&typeof i=="object")return i;const s=e[t];return s&&typeof s=="object"?s:null}function $g(e){if(e==null)return"n/a";if(typeof e=="string"||typeof e=="number"||typeof e=="boolean")return String(e);try{return JSON.stringify(e)}catch{return"n/a"}}function kg(e,t){const n=wg(e,t);return n?bg.flatMap(i=>i in n?[{label:i,value:$g(n[i])}]:[]):[]}function xg(e){let t=0,n=0,i=0;for(const s of e){const o=s.probe&&typeof s.probe=="object"&&"ok"in s.probe?!!s.probe.ok:!1;(s.connected===!0||s.running===!0||o)&&(t+=1),s.configured&&(n+=1),s.enabled&&(i+=1)}return{total:e.length,connected:t,configured:n,enabled:i}}function Sg(e){const t=yg(e.snapshot),n=e.lastSuccess?qe(e.lastSuccess):"never";return c`
    <section class="grid grid-cols-2">
      ${nl(e.context,"Workspace, identity, and model configuration.")}
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
        ${e.error?c`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:w}
        ${e.snapshot?w:c`
                <div class="callout info" style="margin-top: 12px">Load channels to see live status.</div>
              `}
        ${t.length===0?c`
                <div class="muted" style="margin-top: 16px">No channels found.</div>
              `:c`
                <div class="list" style="margin-top: 16px;">
                  ${t.map(i=>{const s=xg(i.accounts),o=s.total?`${s.connected}/${s.total} connected`:"no accounts",r=s.configured?`${s.configured} configured`:"not configured",a=s.total?`${s.enabled} enabled`:"disabled",l=kg(e.configForm,i.id);return c`
                      <div class="list-item">
                        <div class="list-main">
                          <div class="list-title">${i.label}</div>
                          <div class="list-sub mono">${i.id}</div>
                        </div>
                        <div class="list-meta">
                          <div>${o}</div>
                          <div>${r}</div>
                          <div>${a}</div>
                          ${l.length>0?l.map(d=>c`<div>${d.label}: ${d.value}</div>`):w}
                        </div>
                      </div>
                    `})}
                </div>
              `}
      </section>
    </section>
  `}function Ag(e){var n,i;const t=e.jobs.filter(s=>s.agentId===e.agentId);return c`
    <section class="grid grid-cols-2">
      ${nl(e.context,"Workspace and scheduling targets.")}
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
            <div class="stat-value">${el(((i=e.status)==null?void 0:i.nextWakeAtMs)??null)}</div>
          </div>
        </div>
        ${e.error?c`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:w}
      </section>
    </section>
    <section class="card">
      <div class="card-title">Agent Cron Jobs</div>
      <div class="card-sub">Scheduled jobs targeting this agent.</div>
      ${t.length===0?c`
              <div class="muted" style="margin-top: 16px">No jobs assigned.</div>
            `:c`
              <div class="list" style="margin-top: 16px;">
                ${t.map(s=>c`
                    <div class="list-item">
                      <div class="list-main">
                        <div class="list-title">${s.name}</div>
                        ${s.description?c`<div class="list-sub">${s.description}</div>`:w}
                        <div class="chip-row" style="margin-top: 6px;">
                          <span class="chip">${sg(s)}</span>
                          <span class="chip ${s.enabled?"chip-ok":"chip-warn"}">
                            ${s.enabled?"enabled":"disabled"}
                          </span>
                          <span class="chip">${s.sessionTarget}</span>
                        </div>
                      </div>
                      <div class="list-meta">
                        <div class="mono">${ig(s)}</div>
                        <div class="muted">${og(s)}</div>
                      </div>
                    </div>
                  `)}
              </div>
            `}
    </section>
  `}function _g(e){var l;const t=((l=e.agentFilesList)==null?void 0:l.agentId)===e.agentId?e.agentFilesList:null,n=(t==null?void 0:t.files)??[],i=e.agentFileActive??null,s=i?n.find(d=>d.name===i)??null:null,o=i?e.agentFileContents[i]??"":"",r=i?e.agentFileDrafts[i]??o:"",a=i?r!==o:!1;return c`
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
      ${t?c`<div class="muted mono" style="margin-top: 8px;">Workspace: ${t.workspace}</div>`:w}
      ${e.agentFilesError?c`<div class="callout danger" style="margin-top: 12px;">${e.agentFilesError}</div>`:w}
      ${t?c`
              <div class="agent-files-grid" style="margin-top: 16px;">
                <div class="agent-files-list">
                  ${n.length===0?c`
                          <div class="muted">No files found.</div>
                        `:n.map(d=>Cg(d,i,()=>e.onSelectFile(d.name)))}
                </div>
                <div class="agent-files-editor">
                  ${s?c`
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
                          ${s.missing?c`
                                  <div class="callout info" style="margin-top: 10px">
                                    This file is missing. Saving will create it in the agent workspace.
                                  </div>
                                `:w}
                          <label class="field" style="margin-top: 12px;">
                            <span>Content</span>
                            <textarea
                              .value=${r}
                              @input=${d=>e.onFileDraftChange(s.name,d.target.value)}
                            ></textarea>
                          </label>
                        `:c`
                          <div class="muted">Select a file to edit.</div>
                        `}
                </div>
              </div>
            `:c`
              <div class="callout info" style="margin-top: 12px">
                Load the agent workspace files to edit core instructions.
              </div>
            `}
    </section>
  `}function Cg(e,t,n){const i=e.missing?"Missing":`${cg(e.size)} · ${qe(e.updatedAtMs??null)}`;return c`
    <button
      type="button"
      class="agent-file-row ${t===e.name?"active":""}"
      @click=${n}
    >
      <div>
        <div class="agent-file-name mono">${e.name}</div>
        <div class="agent-file-meta">${i}</div>
      </div>
      ${e.missing?c`
              <span class="agent-pill warn">missing</span>
            `:w}
    </button>
  `}const wn=[{id:"workspace",label:"Workspace Skills",sources:["openclaw-workspace"]},{id:"built-in",label:"Built-in Skills",sources:["openclaw-bundled"]},{id:"installed",label:"Installed Skills",sources:["openclaw-managed"]},{id:"extra",label:"Extra Skills",sources:["openclaw-extra"]}];function il(e){var o;const t=new Map;for(const r of wn)t.set(r.id,{id:r.id,label:r.label,skills:[]});const n=wn.find(r=>r.id==="built-in"),i={id:"other",label:"Other Skills",skills:[]};for(const r of e){const a=r.bundled?n:wn.find(l=>l.sources.includes(r.source));a?(o=t.get(a.id))==null||o.skills.push(r):i.skills.push(r)}const s=wn.map(r=>t.get(r.id)).filter(r=>!!(r&&r.skills.length>0));return i.skills.length>0&&s.push(i),s}function sl(e){return[...e.missing.bins.map(t=>`bin:${t}`),...e.missing.env.map(t=>`env:${t}`),...e.missing.config.map(t=>`config:${t}`),...e.missing.os.map(t=>`os:${t}`)]}function ol(e){const t=[];return e.disabled&&t.push("disabled"),e.blockedByAllowlist&&t.push("blocked by allowlist"),t}function rl(e){const t=e.skill,n=!!e.showBundledBadge;return c`
    <div class="chip-row" style="margin-top: 6px;">
      <span class="chip">${t.source}</span>
      ${n?c`
              <span class="chip">bundled</span>
            `:w}
      <span class="chip ${t.eligible?"chip-ok":"chip-warn"}">
        ${t.eligible?"eligible":"blocked"}
      </span>
      ${t.disabled?c`
              <span class="chip chip-warn">disabled</span>
            `:w}
    </div>
  `}function Tg(e){var C;const t=ti(e.configForm,e.agentId),n=((C=t.entry)==null?void 0:C.tools)??{},i=t.globalTools??{},s=n.profile??i.profile??"full",o=n.profile?"agent override":i.profile?"global default":"default",r=Array.isArray(n.allow)&&n.allow.length>0,a=Array.isArray(i.allow)&&i.allow.length>0,l=!!e.configForm&&!e.configLoading&&!e.configSaving&&!r,d=r?[]:Array.isArray(n.alsoAllow)?n.alsoAllow:[],f=r?[]:Array.isArray(n.deny)?n.deny:[],u=r?{allow:n.allow??[],deny:n.deny??[]}:vg()??void 0,g=or.flatMap(D=>D.tools.map(L=>L.id)),y=D=>{const L=hg(D,u),R=cr(D,d),x=cr(D,f);return{allowed:(L||R)&&!x,baseAllowed:L,denied:x}},b=g.filter(D=>y(D).allowed).length,k=(D,L)=>{const R=new Set(d.map(I=>De(I)).filter(I=>I.length>0)),x=new Set(f.map(I=>De(I)).filter(I=>I.length>0)),m=y(D).baseAllowed,A=De(D);L?(x.delete(A),m||R.add(A)):(R.delete(A),x.add(A)),e.onOverridesChange(e.agentId,[...R],[...x])},S=D=>{const L=new Set(d.map(x=>De(x)).filter(x=>x.length>0)),R=new Set(f.map(x=>De(x)).filter(x=>x.length>0));for(const x of g){const m=y(x).baseAllowed,A=De(x);D?(R.delete(A),m||L.add(A)):(L.delete(A),R.add(A))}e.onOverridesChange(e.agentId,[...L],[...R])};return c`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Tool Access</div>
          <div class="card-sub">
            Profile + per-tool overrides for this agent.
            <span class="mono">${b}/${g.length}</span> enabled.
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

      ${e.configForm?w:c`
              <div class="callout info" style="margin-top: 12px">
                Load the gateway config to adjust tool profiles.
              </div>
            `}
      ${r?c`
              <div class="callout info" style="margin-top: 12px">
                This agent is using an explicit allowlist in config. Tool overrides are managed in the Config tab.
              </div>
            `:w}
      ${a?c`
              <div class="callout info" style="margin-top: 12px">
                Global tools.allow is set. Agent overrides cannot enable tools that are globally blocked.
              </div>
            `:w}

      <div class="agent-tools-meta" style="margin-top: 16px;">
        <div class="agent-kv">
          <div class="label">Profile</div>
          <div class="mono">${s}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Source</div>
          <div>${o}</div>
        </div>
        ${e.configDirty?c`
                <div class="agent-kv">
                  <div class="label">Status</div>
                  <div class="mono">unsaved</div>
                </div>
              `:w}
      </div>

      <div class="agent-tools-presets" style="margin-top: 16px;">
        <div class="label">Quick Presets</div>
        <div class="agent-tools-buttons">
          ${lg.map(D=>c`
              <button
                class="btn btn--sm ${s===D.id?"active":""}"
                ?disabled=${!l}
                @click=${()=>e.onProfileChange(e.agentId,D.id,!0)}
              >
                ${D.label}
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
        ${or.map(D=>c`
              <div class="agent-tools-section">
                <div class="agent-tools-header">${D.label}</div>
                <div class="agent-tools-list">
                  ${D.tools.map(L=>{const{allowed:R}=y(L.id);return c`
                      <div class="agent-tool-row">
                        <div>
                          <div class="agent-tool-title mono">${L.label}</div>
                          <div class="agent-tool-sub">${L.description}</div>
                        </div>
                        <label class="cfg-toggle">
                          <input
                            type="checkbox"
                            .checked=${R}
                            ?disabled=${!l}
                            @change=${x=>k(L.id,x.target.checked)}
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
  `}function Eg(e){var y,b,k;const t=!!e.configForm&&!e.configLoading&&!e.configSaving,n=ti(e.configForm,e.agentId),i=Array.isArray((y=n.entry)==null?void 0:y.skills)?(b=n.entry)==null?void 0:b.skills:void 0,s=new Set((i??[]).map(S=>S.trim()).filter(Boolean)),o=i!==void 0,r=!!(e.report&&e.activeAgentId===e.agentId),a=r?((k=e.report)==null?void 0:k.skills)??[]:[],l=e.filter.trim().toLowerCase(),d=l?a.filter(S=>[S.name,S.description,S.source].join(" ").toLowerCase().includes(l)):a,f=il(d),u=o?a.filter(S=>s.has(S.name)).length:a.length,g=a.length;return c`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Skills</div>
          <div class="card-sub">
            Per-agent skill allowlist and workspace skills.
            ${g>0?c`<span class="mono">${u}/${g}</span>`:w}
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

      ${e.configForm?w:c`
              <div class="callout info" style="margin-top: 12px">
                Load the gateway config to set per-agent skills.
              </div>
            `}
      ${o?c`
              <div class="callout info" style="margin-top: 12px">This agent uses a custom skill allowlist.</div>
            `:c`
              <div class="callout info" style="margin-top: 12px">
                All skills are enabled. Disabling any skill will create a per-agent allowlist.
              </div>
            `}
      ${!r&&!e.loading?c`
              <div class="callout info" style="margin-top: 12px">
                Load skills for this agent to view workspace-specific entries.
              </div>
            `:w}
      ${e.error?c`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:w}

      <div class="filters" style="margin-top: 14px;">
        <label class="field" style="flex: 1;">
          <span>Filter</span>
          <input
            .value=${e.filter}
            @input=${S=>e.onFilterChange(S.target.value)}
            placeholder="Search skills"
          />
        </label>
        <div class="muted">${d.length} shown</div>
      </div>

      ${d.length===0?c`
              <div class="muted" style="margin-top: 16px">No skills found.</div>
            `:c`
              <div class="agent-skills-groups" style="margin-top: 16px;">
                ${f.map(S=>Lg(S,{agentId:e.agentId,allowSet:s,usingAllowlist:o,editable:t,onToggle:e.onToggle}))}
              </div>
            `}
    </section>
  `}function Lg(e,t){const n=e.id==="workspace"||e.id==="built-in";return c`
    <details class="agent-skills-group" ?open=${!n}>
      <summary class="agent-skills-header">
        <span>${e.label}</span>
        <span class="muted">${e.skills.length}</span>
      </summary>
      <div class="list skills-grid">
        ${e.skills.map(i=>Rg(i,{agentId:t.agentId,allowSet:t.allowSet,usingAllowlist:t.usingAllowlist,editable:t.editable,onToggle:t.onToggle}))}
      </div>
    </details>
  `}function Rg(e,t){const n=t.usingAllowlist?t.allowSet.has(e.name):!0,i=sl(e),s=ol(e);return c`
    <div class="list-item agent-skill-row">
      <div class="list-main">
        <div class="list-title">${e.emoji?`${e.emoji} `:""}${e.name}</div>
        <div class="list-sub">${e.description}</div>
        ${rl({skill:e})}
        ${i.length>0?c`<div class="muted" style="margin-top: 6px;">Missing: ${i.join(", ")}</div>`:w}
        ${s.length>0?c`<div class="muted" style="margin-top: 6px;">Reason: ${s.join(", ")}</div>`:w}
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
  `}function Ig(e){var o,r,a;const t=((o=e.agentsList)==null?void 0:o.agents)??[],n=((r=e.agentsList)==null?void 0:r.defaultId)??null,i=e.selectedAgentId??n??((a=t[0])==null?void 0:a.id)??null,s=i?t.find(l=>l.id===i)??null:null;return c`
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
        ${e.error?c`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:w}
        <div class="agent-list" style="margin-top: 12px;">
          ${t.length===0?c`
                  <div class="muted">No agents found.</div>
                `:t.map(l=>{const d=tl(l.id,n),f=ei(l,e.agentIdentityById[l.id]??null);return c`
                    <button
                      type="button"
                      class="agent-row ${i===l.id?"active":""}"
                      @click=${()=>e.onSelectAgent(l.id)}
                    >
                      <div class="agent-avatar">${f||es(l).slice(0,1)}</div>
                      <div class="agent-info">
                        <div class="agent-title">${es(l)}</div>
                        <div class="agent-sub mono">${l.id}</div>
                      </div>
                      ${d?c`<span class="agent-pill">${d}</span>`:w}
                    </button>
                  `})}
        </div>
      </section>
      <section class="agents-main">
        ${s?c`
                ${Mg(s,n,e.agentIdentityById[s.id]??null)}
                ${Pg(e.activePanel,l=>e.onSelectPanel(l))}
                ${e.activePanel==="overview"?Fg({agent:s,defaultId:n,configForm:e.configForm,agentFilesList:e.agentFilesList,agentIdentity:e.agentIdentityById[s.id]??null,agentIdentityError:e.agentIdentityError,agentIdentityLoading:e.agentIdentityLoading,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave,onModelChange:e.onModelChange,onModelFallbacksChange:e.onModelFallbacksChange}):w}
                ${e.activePanel==="files"?_g({agentId:s.id,agentFilesList:e.agentFilesList,agentFilesLoading:e.agentFilesLoading,agentFilesError:e.agentFilesError,agentFileActive:e.agentFileActive,agentFileContents:e.agentFileContents,agentFileDrafts:e.agentFileDrafts,agentFileSaving:e.agentFileSaving,onLoadFiles:e.onLoadFiles,onSelectFile:e.onSelectFile,onFileDraftChange:e.onFileDraftChange,onFileReset:e.onFileReset,onFileSave:e.onFileSave}):w}
                ${e.activePanel==="tools"?Tg({agentId:s.id,configForm:e.configForm,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,onProfileChange:e.onToolsProfileChange,onOverridesChange:e.onToolsOverridesChange,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):w}
                ${e.activePanel==="skills"?Eg({agentId:s.id,report:e.agentSkillsReport,loading:e.agentSkillsLoading,error:e.agentSkillsError,activeAgentId:e.agentSkillsAgentId,configForm:e.configForm,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,filter:e.skillsFilter,onFilterChange:e.onSkillsFilterChange,onRefresh:e.onSkillsRefresh,onToggle:e.onAgentSkillToggle,onClear:e.onAgentSkillsClear,onDisableAll:e.onAgentSkillsDisableAll,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):w}
                ${e.activePanel==="channels"?Sg({context:rr(s,e.configForm,e.agentFilesList,n,e.agentIdentityById[s.id]??null),configForm:e.configForm,snapshot:e.channelsSnapshot,loading:e.channelsLoading,error:e.channelsError,lastSuccess:e.channelsLastSuccess,onRefresh:e.onChannelsRefresh}):w}
                ${e.activePanel==="cron"?Ag({context:rr(s,e.configForm,e.agentFilesList,n,e.agentIdentityById[s.id]??null),agentId:s.id,jobs:e.cronJobs,status:e.cronStatus,loading:e.cronLoading,error:e.cronError,onRefresh:e.onCronRefresh}):w}
              `:c`
                <div class="card">
                  <div class="card-title">Select an agent</div>
                  <div class="card-sub">Pick an agent to inspect its workspace and tools.</div>
                </div>
              `}
      </section>
    </div>
  `}function Mg(e,t,n){var a,l;const i=tl(e.id,t),s=es(e),o=((l=(a=e.identity)==null?void 0:a.theme)==null?void 0:l.trim())||"Agent workspace and routing.",r=ei(e,n);return c`
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
        ${i?c`<span class="agent-pill">${i}</span>`:w}
      </div>
    </section>
  `}function Pg(e,t){return c`
    <div class="agent-tabs">
      ${[{id:"overview",label:"Overview"},{id:"files",label:"Files"},{id:"tools",label:"Tools"},{id:"skills",label:"Skills"},{id:"channels",label:"Channels"},{id:"cron",label:"成单"}].map(i=>c`
          <button
            class="agent-tab ${e===i.id?"active":""}"
            type="button"
            @click=${()=>t(i.id)}
          >
            ${i.label}
          </button>
        `)}
    </div>
  `}function Fg(e){var re,P,N,z,J,se,Y,Et,Z,Lt,V,Ne,gt,Le,Rt,pt;const{agent:t,configForm:n,agentFilesList:i,agentIdentity:s,agentIdentityLoading:o,agentIdentityError:r,configLoading:a,configSaving:l,configDirty:d,onConfigReload:f,onConfigSave:u,onModelChange:g,onModelFallbacksChange:y}=e,b=ti(n,t.id),S=(i&&i.agentId===t.id?i.workspace:null)||((re=b.entry)==null?void 0:re.workspace)||((P=b.defaults)==null?void 0:P.workspace)||"default",C=(N=b.entry)!=null&&N.model?Wt((z=b.entry)==null?void 0:z.model):Wt((J=b.defaults)==null?void 0:J.model),D=Wt((se=b.defaults)==null?void 0:se.model),L=lr((Y=b.entry)==null?void 0:Y.model)||(C!=="-"?ar(C):null),R=lr((Et=b.defaults)==null?void 0:Et.model)||(D!=="-"?ar(D):null),x=L??R??null,m=dg((Z=b.entry)==null?void 0:Z.model),A=m?m.join(", "):"",I=((Lt=s==null?void 0:s.name)==null?void 0:Lt.trim())||((Ne=(V=t.identity)==null?void 0:V.name)==null?void 0:Ne.trim())||((gt=t.name)==null?void 0:gt.trim())||((Le=b.entry)==null?void 0:Le.name)||"-",K=ei(t,s)||"-",B=Array.isArray((Rt=b.entry)==null?void 0:Rt.skills)?(pt=b.entry)==null?void 0:pt.skills:null,W=(B==null?void 0:B.length)??null,q=o?"Loading…":r?"Unavailable":"",X=!!(e.defaultId&&t.id===e.defaultId);return c`
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
          <div class="mono">${C}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Identity Name</div>
          <div>${I}</div>
          ${q?c`<div class="agent-kv-sub muted">${q}</div>`:w}
        </div>
        <div class="agent-kv">
          <div class="label">Default</div>
          <div>${X?"yes":"no"}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Identity Emoji</div>
          <div>${K}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Skills Filter</div>
          <div>${B?`${W} selected`:"all skills"}</div>
        </div>
      </div>

      <div class="agent-model-select" style="margin-top: 20px;">
        <div class="label">Model Selection</div>
        <div class="row" style="gap: 12px; flex-wrap: wrap;">
          <label class="field" style="min-width: 260px; flex: 1;">
            <span>Primary model${X?" (default)":""}</span>
            <select
              .value=${x??""}
              ?disabled=${!n||a||l}
              @change=${ht=>g(t.id,ht.target.value||null)}
            >
              ${X?w:c`
                      <option value="">
                        ${R?`Inherit default (${R})`:"Inherit default"}
                      </option>
                    `}
              ${gg(n,x??void 0)}
            </select>
          </label>
          <label class="field" style="min-width: 260px; flex: 1;">
            <span>Fallbacks (comma-separated)</span>
            <input
              .value=${A}
              ?disabled=${!n||a||l}
              placeholder="provider/model, provider/model"
              @input=${ht=>y(t.id,ug(ht.target.value))}
            />
          </label>
        </div>
        <div class="row" style="justify-content: flex-end; gap: 8px;">
          <button class="btn btn--sm" ?disabled=${a} @click=${f}>
            Reload Config
          </button>
          <button
            class="btn btn--sm primary"
            ?disabled=${l||!d}
            @click=${u}
          >
            ${l?"Saving…":"Save"}
          </button>
        </div>
      </div>
    </section>
  `}function dr(e){var t;e&&((t=navigator.clipboard)==null||t.writeText(e).catch(()=>{}))}function Dg(e){const{loading:t,saving:n,error:i,content:s,lastSuccessAt:o,dependentFiles:r,onReload:a,onSave:l,onContentChange:d}=e,f=o!=null?new Date(o).toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"";return c`
    <section class="card">
      <div class="row" style="justify-content: space-between; align-items: flex-start;">
        <div>
          <div class="card-title">业务知识</div>
          <div class="card-sub">
            编辑万鼎业务知识（wanding_business_knowledge.md），供选型与匹配使用。保存后 LLM 将使用最新内容。
          </div>
        </div>
        <div class="row" style="gap: 8px; align-items: center;">
          ${f?c`<span class="muted">已保存 ${f}</span>`:w}
          <button class="btn" ?disabled=${t} @click=${a}>
            ${t?"加载中…":"重新加载"}
          </button>
          <button class="btn btn--primary" ?disabled=${t||n} @click=${()=>l(s)}>
            ${n?"保存中…":"保存"}
          </button>
        </div>
      </div>
      ${i?c`<div class="callout danger" style="margin-top: 12px;">${i}</div>`:w}
      ${r&&(r.mapping_table||r.price_library)?c`
            <div class="callout" style="margin-top: 12px; padding: 12px;">
              <div style="font-weight: 600; margin-bottom: 8px;">相关数据文件</div>
              <p class="muted" style="margin: 0 0 10px 0; font-size: 0.9rem;">
                选型与历史报价依赖以下 Excel，有更新时可复制路径后在资源管理器中打开或用 Excel 编辑。
              </p>
              ${r.mapping_table?c`
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; flex-wrap: wrap;">
                      <span style="min-width: 100px;">询价映射表（历史报价）：</span>
                      <code style="flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; font-size: 0.85rem;">${r.mapping_table}</code>
                      <button
                        class="btn"
                        style="flex-shrink: 0;"
                        @click=${()=>dr(r.mapping_table)}
                        title="复制路径"
                      >
                        复制路径
                      </button>
                    </div>
                  `:w}
              ${r.price_library?c`
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                      <span style="min-width: 100px;">万鼎价格库：</span>
                      <code style="flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; font-size: 0.85rem;">${r.price_library}</code>
                      <button
                        class="btn"
                        style="flex-shrink: 0;"
                        @click=${()=>dr(r.price_library)}
                        title="复制路径"
                      >
                        复制路径
                      </button>
                    </div>
                  `:w}
            </div>
          `:w}
      <div style="margin-top: 16px;">
        <textarea
          class="code-block"
          style="width: 100%; min-height: 360px; font-family: var(--font-mono, monospace); font-size: 0.9rem; padding: 12px; resize: vertical; box-sizing: border-box;"
          .value=${s}
          ?disabled=${t}
          @input=${u=>{const g=u.target;d((g==null?void 0:g.value)??"")}}
          placeholder="【业务知识】&#10;1. …"
        ></textarea>
      </div>
    </section>
  `}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qt=(e,t)=>{var i;const n=e._$AN;if(n===void 0)return!1;for(const s of n)(i=s._$AO)==null||i.call(s,t,!1),Qt(s,t);return!0},Nn=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while((n==null?void 0:n.size)===0)},al=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),Bg(t)}};function Og(e){this._$AN!==void 0?(Nn(this),this._$AM=e,al(this)):this._$AM=e}function Ng(e,t=!1,n=0){const i=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(t)if(Array.isArray(i))for(let o=n;o<i.length;o++)Qt(i[o],!1),Nn(i[o]);else i!=null&&(Qt(i,!1),Nn(i));else Qt(this,e)}const Bg=e=>{e.type==zs.CHILD&&(e._$AP??(e._$AP=Ng),e._$AQ??(e._$AQ=Og))};class Ug extends Hs{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,n,i){super._$AT(t,n,i),al(this),this.isConnected=t._$AU}_$AO(t,n=!0){var i,s;t!==this.isConnected&&(this.isConnected=t,t?(i=this.reconnected)==null||i.call(this):(s=this.disconnected)==null||s.call(this)),n&&(Qt(this,t),Nn(this))}setValue(t){if(Df(this._$Ct))this._$Ct._$AI(t,this);else{const n=[...this._$Ct._$AH];n[this._$Ci]=t,this._$Ct._$AI(n,this,0)}}disconnected(){}reconnected(){}}const Mi=new WeakMap,zg=js(class extends Ug{render(e){return w}update(e,[t]){var i;const n=t!==this.G;return n&&this.G!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=(i=e.options)==null?void 0:i.host,this.rt(this.ct=e.element)),w}rt(e){if(this.isConnected||(e=void 0),typeof this.G=="function"){const t=this.ht??globalThis;let n=Mi.get(t);n===void 0&&(n=new WeakMap,Mi.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){var e,t;return typeof this.G=="function"?(e=Mi.get(this.ht??globalThis))==null?void 0:e.get(this.G):(t=this.G)==null?void 0:t.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ns extends Hs{constructor(t){if(super(t),this.it=w,t.type!==zs.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===w||t==null)return this._t=void 0,this.it=t;if(t===He)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}ns.directiveName="unsafeHTML",ns.resultType=1;const is=js(ns);/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:ll,setPrototypeOf:ur,isFrozen:jg,getPrototypeOf:Hg,getOwnPropertyDescriptor:Kg}=Object;let{freeze:ue,seal:be,create:ss}=Object,{apply:os,construct:rs}=typeof Reflect<"u"&&Reflect;ue||(ue=function(t){return t});be||(be=function(t){return t});os||(os=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),o=2;o<i;o++)s[o-2]=arguments[o];return t.apply(n,s)});rs||(rs=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const $n=fe(Array.prototype.forEach),qg=fe(Array.prototype.lastIndexOf),fr=fe(Array.prototype.pop),Dt=fe(Array.prototype.push),Gg=fe(Array.prototype.splice),In=fe(String.prototype.toLowerCase),Pi=fe(String.prototype.toString),Fi=fe(String.prototype.match),Ot=fe(String.prototype.replace),Wg=fe(String.prototype.indexOf),Vg=fe(String.prototype.trim),we=fe(Object.prototype.hasOwnProperty),ce=fe(RegExp.prototype.test),Nt=Qg(TypeError);function fe(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return os(e,t,i)}}function Qg(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return rs(e,n)}}function U(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:In;ur&&ur(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const o=n(s);o!==s&&(jg(t)||(t[i]=o),s=o)}e[s]=!0}return e}function Jg(e){for(let t=0;t<e.length;t++)we(e,t)||(e[t]=null);return e}function _e(e){const t=ss(null);for(const[n,i]of ll(e))we(e,n)&&(Array.isArray(i)?t[n]=Jg(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=_e(i):t[n]=i);return t}function Bt(e,t){for(;e!==null;){const i=Kg(e,t);if(i){if(i.get)return fe(i.get);if(typeof i.value=="function")return fe(i.value)}e=Hg(e)}function n(){return null}return n}const gr=ue(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Di=ue(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Oi=ue(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Yg=ue(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ni=ue(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Xg=ue(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),pr=ue(["#text"]),hr=ue(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Bi=ue(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),vr=ue(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),kn=ue(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Zg=be(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ep=be(/<%[\w\W]*|[\w\W]*%>/gm),tp=be(/\$\{[\w\W]*/gm),np=be(/^data-[\-\w.\u00B7-\uFFFF]+$/),ip=be(/^aria-[\-\w]+$/),cl=be(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),sp=be(/^(?:\w+script|data):/i),op=be(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),dl=be(/^html$/i),rp=be(/^[a-z][.\w]*(-[.\w]+)+$/i);var mr=Object.freeze({__proto__:null,ARIA_ATTR:ip,ATTR_WHITESPACE:op,CUSTOM_ELEMENT:rp,DATA_ATTR:np,DOCTYPE_NAME:dl,ERB_EXPR:ep,IS_ALLOWED_URI:cl,IS_SCRIPT_OR_DATA:sp,MUSTACHE_EXPR:Zg,TMPLIT_EXPR:tp});const Ut={element:1,text:3,progressingInstruction:7,comment:8,document:9},ap=function(){return typeof window>"u"?null:window},lp=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const o="dompurify"+(i?"#"+i:"");try{return t.createPolicy(o,{createHTML(r){return r},createScriptURL(r){return r}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},yr=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function ul(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ap();const t=O=>ul(O);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==Ut.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:o,HTMLTemplateElement:r,Node:a,Element:l,NodeFilter:d,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:u,DOMParser:g,trustedTypes:y}=e,b=l.prototype,k=Bt(b,"cloneNode"),S=Bt(b,"remove"),C=Bt(b,"nextSibling"),D=Bt(b,"childNodes"),L=Bt(b,"parentNode");if(typeof r=="function"){const O=n.createElement("template");O.content&&O.content.ownerDocument&&(n=O.content.ownerDocument)}let R,x="";const{implementation:m,createNodeIterator:A,createDocumentFragment:I,getElementsByTagName:E}=n,{importNode:K}=i;let B=yr();t.isSupported=typeof ll=="function"&&typeof L=="function"&&m&&m.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:W,ERB_EXPR:q,TMPLIT_EXPR:X,DATA_ATTR:re,ARIA_ATTR:P,IS_SCRIPT_OR_DATA:N,ATTR_WHITESPACE:z,CUSTOM_ELEMENT:J}=mr;let{IS_ALLOWED_URI:se}=mr,Y=null;const Et=U({},[...gr,...Di,...Oi,...Ni,...pr]);let Z=null;const Lt=U({},[...hr,...Bi,...vr,...kn]);let V=Object.seal(ss(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ne=null,gt=null;const Le=Object.seal(ss(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Rt=!0,pt=!0,ht=!1,no=!0,vt=!1,dn=!0,Ve=!1,oi=!1,ri=!1,mt=!1,un=!1,fn=!1,io=!0,so=!1;const Pl="user-content-";let ai=!0,It=!1,yt={},xe=null;const li=U({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let oo=null;const ro=U({},["audio","video","img","source","image","track"]);let ci=null;const ao=U({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),gn="http://www.w3.org/1998/Math/MathML",pn="http://www.w3.org/2000/svg",Re="http://www.w3.org/1999/xhtml";let bt=Re,di=!1,ui=null;const Fl=U({},[gn,pn,Re],Pi);let hn=U({},["mi","mo","mn","ms","mtext"]),vn=U({},["annotation-xml"]);const Dl=U({},["title","style","font","a","script"]);let Mt=null;const Ol=["application/xhtml+xml","text/html"],Nl="text/html";let te=null,wt=null;const Bl=n.createElement("form"),lo=function($){return $ instanceof RegExp||$ instanceof Function},fi=function(){let $=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(wt&&wt===$)){if((!$||typeof $!="object")&&($={}),$=_e($),Mt=Ol.indexOf($.PARSER_MEDIA_TYPE)===-1?Nl:$.PARSER_MEDIA_TYPE,te=Mt==="application/xhtml+xml"?Pi:In,Y=we($,"ALLOWED_TAGS")?U({},$.ALLOWED_TAGS,te):Et,Z=we($,"ALLOWED_ATTR")?U({},$.ALLOWED_ATTR,te):Lt,ui=we($,"ALLOWED_NAMESPACES")?U({},$.ALLOWED_NAMESPACES,Pi):Fl,ci=we($,"ADD_URI_SAFE_ATTR")?U(_e(ao),$.ADD_URI_SAFE_ATTR,te):ao,oo=we($,"ADD_DATA_URI_TAGS")?U(_e(ro),$.ADD_DATA_URI_TAGS,te):ro,xe=we($,"FORBID_CONTENTS")?U({},$.FORBID_CONTENTS,te):li,Ne=we($,"FORBID_TAGS")?U({},$.FORBID_TAGS,te):_e({}),gt=we($,"FORBID_ATTR")?U({},$.FORBID_ATTR,te):_e({}),yt=we($,"USE_PROFILES")?$.USE_PROFILES:!1,Rt=$.ALLOW_ARIA_ATTR!==!1,pt=$.ALLOW_DATA_ATTR!==!1,ht=$.ALLOW_UNKNOWN_PROTOCOLS||!1,no=$.ALLOW_SELF_CLOSE_IN_ATTR!==!1,vt=$.SAFE_FOR_TEMPLATES||!1,dn=$.SAFE_FOR_XML!==!1,Ve=$.WHOLE_DOCUMENT||!1,mt=$.RETURN_DOM||!1,un=$.RETURN_DOM_FRAGMENT||!1,fn=$.RETURN_TRUSTED_TYPE||!1,ri=$.FORCE_BODY||!1,io=$.SANITIZE_DOM!==!1,so=$.SANITIZE_NAMED_PROPS||!1,ai=$.KEEP_CONTENT!==!1,It=$.IN_PLACE||!1,se=$.ALLOWED_URI_REGEXP||cl,bt=$.NAMESPACE||Re,hn=$.MATHML_TEXT_INTEGRATION_POINTS||hn,vn=$.HTML_INTEGRATION_POINTS||vn,V=$.CUSTOM_ELEMENT_HANDLING||{},$.CUSTOM_ELEMENT_HANDLING&&lo($.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(V.tagNameCheck=$.CUSTOM_ELEMENT_HANDLING.tagNameCheck),$.CUSTOM_ELEMENT_HANDLING&&lo($.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(V.attributeNameCheck=$.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),$.CUSTOM_ELEMENT_HANDLING&&typeof $.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(V.allowCustomizedBuiltInElements=$.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),vt&&(pt=!1),un&&(mt=!0),yt&&(Y=U({},pr),Z=[],yt.html===!0&&(U(Y,gr),U(Z,hr)),yt.svg===!0&&(U(Y,Di),U(Z,Bi),U(Z,kn)),yt.svgFilters===!0&&(U(Y,Oi),U(Z,Bi),U(Z,kn)),yt.mathMl===!0&&(U(Y,Ni),U(Z,vr),U(Z,kn))),$.ADD_TAGS&&(typeof $.ADD_TAGS=="function"?Le.tagCheck=$.ADD_TAGS:(Y===Et&&(Y=_e(Y)),U(Y,$.ADD_TAGS,te))),$.ADD_ATTR&&(typeof $.ADD_ATTR=="function"?Le.attributeCheck=$.ADD_ATTR:(Z===Lt&&(Z=_e(Z)),U(Z,$.ADD_ATTR,te))),$.ADD_URI_SAFE_ATTR&&U(ci,$.ADD_URI_SAFE_ATTR,te),$.FORBID_CONTENTS&&(xe===li&&(xe=_e(xe)),U(xe,$.FORBID_CONTENTS,te)),$.ADD_FORBID_CONTENTS&&(xe===li&&(xe=_e(xe)),U(xe,$.ADD_FORBID_CONTENTS,te)),ai&&(Y["#text"]=!0),Ve&&U(Y,["html","head","body"]),Y.table&&(U(Y,["tbody"]),delete Ne.tbody),$.TRUSTED_TYPES_POLICY){if(typeof $.TRUSTED_TYPES_POLICY.createHTML!="function")throw Nt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof $.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Nt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');R=$.TRUSTED_TYPES_POLICY,x=R.createHTML("")}else R===void 0&&(R=lp(y,s)),R!==null&&typeof x=="string"&&(x=R.createHTML(""));ue&&ue($),wt=$}},co=U({},[...Di,...Oi,...Yg]),uo=U({},[...Ni,...Xg]),Ul=function($){let _=L($);(!_||!_.tagName)&&(_={namespaceURI:bt,tagName:"template"});const F=In($.tagName),Q=In(_.tagName);return ui[$.namespaceURI]?$.namespaceURI===pn?_.namespaceURI===Re?F==="svg":_.namespaceURI===gn?F==="svg"&&(Q==="annotation-xml"||hn[Q]):!!co[F]:$.namespaceURI===gn?_.namespaceURI===Re?F==="math":_.namespaceURI===pn?F==="math"&&vn[Q]:!!uo[F]:$.namespaceURI===Re?_.namespaceURI===pn&&!vn[Q]||_.namespaceURI===gn&&!hn[Q]?!1:!uo[F]&&(Dl[F]||!co[F]):!!(Mt==="application/xhtml+xml"&&ui[$.namespaceURI]):!1},Se=function($){Dt(t.removed,{element:$});try{L($).removeChild($)}catch{S($)}},Qe=function($,_){try{Dt(t.removed,{attribute:_.getAttributeNode($),from:_})}catch{Dt(t.removed,{attribute:null,from:_})}if(_.removeAttribute($),$==="is")if(mt||un)try{Se(_)}catch{}else try{_.setAttribute($,"")}catch{}},fo=function($){let _=null,F=null;if(ri)$="<remove></remove>"+$;else{const ee=Fi($,/^[\r\n\t ]+/);F=ee&&ee[0]}Mt==="application/xhtml+xml"&&bt===Re&&($='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+$+"</body></html>");const Q=R?R.createHTML($):$;if(bt===Re)try{_=new g().parseFromString(Q,Mt)}catch{}if(!_||!_.documentElement){_=m.createDocument(bt,"template",null);try{_.documentElement.innerHTML=di?x:Q}catch{}}const ae=_.body||_.documentElement;return $&&F&&ae.insertBefore(n.createTextNode(F),ae.childNodes[0]||null),bt===Re?E.call(_,Ve?"html":"body")[0]:Ve?_.documentElement:ae},go=function($){return A.call($.ownerDocument||$,$,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},gi=function($){return $ instanceof u&&(typeof $.nodeName!="string"||typeof $.textContent!="string"||typeof $.removeChild!="function"||!($.attributes instanceof f)||typeof $.removeAttribute!="function"||typeof $.setAttribute!="function"||typeof $.namespaceURI!="string"||typeof $.insertBefore!="function"||typeof $.hasChildNodes!="function")},po=function($){return typeof a=="function"&&$ instanceof a};function Ie(O,$,_){$n(O,F=>{F.call(t,$,_,wt)})}const ho=function($){let _=null;if(Ie(B.beforeSanitizeElements,$,null),gi($))return Se($),!0;const F=te($.nodeName);if(Ie(B.uponSanitizeElement,$,{tagName:F,allowedTags:Y}),dn&&$.hasChildNodes()&&!po($.firstElementChild)&&ce(/<[/\w!]/g,$.innerHTML)&&ce(/<[/\w!]/g,$.textContent)||$.nodeType===Ut.progressingInstruction||dn&&$.nodeType===Ut.comment&&ce(/<[/\w]/g,$.data))return Se($),!0;if(!(Le.tagCheck instanceof Function&&Le.tagCheck(F))&&(!Y[F]||Ne[F])){if(!Ne[F]&&mo(F)&&(V.tagNameCheck instanceof RegExp&&ce(V.tagNameCheck,F)||V.tagNameCheck instanceof Function&&V.tagNameCheck(F)))return!1;if(ai&&!xe[F]){const Q=L($)||$.parentNode,ae=D($)||$.childNodes;if(ae&&Q){const ee=ae.length;for(let ge=ee-1;ge>=0;--ge){const Me=k(ae[ge],!0);Me.__removalCount=($.__removalCount||0)+1,Q.insertBefore(Me,C($))}}}return Se($),!0}return $ instanceof l&&!Ul($)||(F==="noscript"||F==="noembed"||F==="noframes")&&ce(/<\/no(script|embed|frames)/i,$.innerHTML)?(Se($),!0):(vt&&$.nodeType===Ut.text&&(_=$.textContent,$n([W,q,X],Q=>{_=Ot(_,Q," ")}),$.textContent!==_&&(Dt(t.removed,{element:$.cloneNode()}),$.textContent=_)),Ie(B.afterSanitizeElements,$,null),!1)},vo=function($,_,F){if(io&&(_==="id"||_==="name")&&(F in n||F in Bl))return!1;if(!(pt&&!gt[_]&&ce(re,_))){if(!(Rt&&ce(P,_))){if(!(Le.attributeCheck instanceof Function&&Le.attributeCheck(_,$))){if(!Z[_]||gt[_]){if(!(mo($)&&(V.tagNameCheck instanceof RegExp&&ce(V.tagNameCheck,$)||V.tagNameCheck instanceof Function&&V.tagNameCheck($))&&(V.attributeNameCheck instanceof RegExp&&ce(V.attributeNameCheck,_)||V.attributeNameCheck instanceof Function&&V.attributeNameCheck(_,$))||_==="is"&&V.allowCustomizedBuiltInElements&&(V.tagNameCheck instanceof RegExp&&ce(V.tagNameCheck,F)||V.tagNameCheck instanceof Function&&V.tagNameCheck(F))))return!1}else if(!ci[_]){if(!ce(se,Ot(F,z,""))){if(!((_==="src"||_==="xlink:href"||_==="href")&&$!=="script"&&Wg(F,"data:")===0&&oo[$])){if(!(ht&&!ce(N,Ot(F,z,"")))){if(F)return!1}}}}}}}return!0},mo=function($){return $!=="annotation-xml"&&Fi($,J)},yo=function($){Ie(B.beforeSanitizeAttributes,$,null);const{attributes:_}=$;if(!_||gi($))return;const F={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Z,forceKeepAttr:void 0};let Q=_.length;for(;Q--;){const ae=_[Q],{name:ee,namespaceURI:ge,value:Me}=ae,$t=te(ee),pi=Me;let oe=ee==="value"?pi:Vg(pi);if(F.attrName=$t,F.attrValue=oe,F.keepAttr=!0,F.forceKeepAttr=void 0,Ie(B.uponSanitizeAttribute,$,F),oe=F.attrValue,so&&($t==="id"||$t==="name")&&(Qe(ee,$),oe=Pl+oe),dn&&ce(/((--!?|])>)|<\/(style|title|textarea)/i,oe)){Qe(ee,$);continue}if($t==="attributename"&&Fi(oe,"href")){Qe(ee,$);continue}if(F.forceKeepAttr)continue;if(!F.keepAttr){Qe(ee,$);continue}if(!no&&ce(/\/>/i,oe)){Qe(ee,$);continue}vt&&$n([W,q,X],wo=>{oe=Ot(oe,wo," ")});const bo=te($.nodeName);if(!vo(bo,$t,oe)){Qe(ee,$);continue}if(R&&typeof y=="object"&&typeof y.getAttributeType=="function"&&!ge)switch(y.getAttributeType(bo,$t)){case"TrustedHTML":{oe=R.createHTML(oe);break}case"TrustedScriptURL":{oe=R.createScriptURL(oe);break}}if(oe!==pi)try{ge?$.setAttributeNS(ge,ee,oe):$.setAttribute(ee,oe),gi($)?Se($):fr(t.removed)}catch{Qe(ee,$)}}Ie(B.afterSanitizeAttributes,$,null)},zl=function O($){let _=null;const F=go($);for(Ie(B.beforeSanitizeShadowDOM,$,null);_=F.nextNode();)Ie(B.uponSanitizeShadowNode,_,null),ho(_),yo(_),_.content instanceof o&&O(_.content);Ie(B.afterSanitizeShadowDOM,$,null)};return t.sanitize=function(O){let $=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},_=null,F=null,Q=null,ae=null;if(di=!O,di&&(O="<!-->"),typeof O!="string"&&!po(O))if(typeof O.toString=="function"){if(O=O.toString(),typeof O!="string")throw Nt("dirty is not a string, aborting")}else throw Nt("toString is not a function");if(!t.isSupported)return O;if(oi||fi($),t.removed=[],typeof O=="string"&&(It=!1),It){if(O.nodeName){const Me=te(O.nodeName);if(!Y[Me]||Ne[Me])throw Nt("root node is forbidden and cannot be sanitized in-place")}}else if(O instanceof a)_=fo("<!---->"),F=_.ownerDocument.importNode(O,!0),F.nodeType===Ut.element&&F.nodeName==="BODY"||F.nodeName==="HTML"?_=F:_.appendChild(F);else{if(!mt&&!vt&&!Ve&&O.indexOf("<")===-1)return R&&fn?R.createHTML(O):O;if(_=fo(O),!_)return mt?null:fn?x:""}_&&ri&&Se(_.firstChild);const ee=go(It?O:_);for(;Q=ee.nextNode();)ho(Q),yo(Q),Q.content instanceof o&&zl(Q.content);if(It)return O;if(mt){if(un)for(ae=I.call(_.ownerDocument);_.firstChild;)ae.appendChild(_.firstChild);else ae=_;return(Z.shadowroot||Z.shadowrootmode)&&(ae=K.call(i,ae,!0)),ae}let ge=Ve?_.outerHTML:_.innerHTML;return Ve&&Y["!doctype"]&&_.ownerDocument&&_.ownerDocument.doctype&&_.ownerDocument.doctype.name&&ce(dl,_.ownerDocument.doctype.name)&&(ge="<!DOCTYPE "+_.ownerDocument.doctype.name+`>
`+ge),vt&&$n([W,q,X],Me=>{ge=Ot(ge,Me," ")}),R&&fn?R.createHTML(ge):ge},t.setConfig=function(){let O=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};fi(O),oi=!0},t.clearConfig=function(){wt=null,oi=!1},t.isValidAttribute=function(O,$,_){wt||fi({});const F=te(O),Q=te($);return vo(F,Q,_)},t.addHook=function(O,$){typeof $=="function"&&Dt(B[O],$)},t.removeHook=function(O,$){if($!==void 0){const _=qg(B[O],$);return _===-1?void 0:Gg(B[O],_,1)[0]}return fr(B[O])},t.removeHooks=function(O){B[O]=[]},t.removeAllHooks=function(){B=yr()},t}var as=ul();function Ks(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var ft=Ks();function fl(e){ft=e}var et={exec:()=>null};function H(e,t=""){let n=typeof e=="string"?e:e.source,i={replace:(s,o)=>{let r=typeof o=="string"?o:o.source;return r=r.replace(de.caret,"$1"),n=n.replace(s,r),i},getRegex:()=>new RegExp(n,t)};return i}var cp=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),de={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}>`)},dp=/^(?:[ \t]*(?:\n|$))+/,up=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,fp=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,cn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,gp=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,qs=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,gl=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,pl=H(gl).replace(/bull/g,qs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),pp=H(gl).replace(/bull/g,qs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Gs=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,hp=/^[^\n]+/,Ws=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,vp=H(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ws).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),mp=H(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,qs).getRegex(),ni="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Vs=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,yp=H("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Vs).replace("tag",ni).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),hl=H(Gs).replace("hr",cn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ni).getRegex(),bp=H(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",hl).getRegex(),Qs={blockquote:bp,code:up,def:vp,fences:fp,heading:gp,hr:cn,html:yp,lheading:pl,list:mp,newline:dp,paragraph:hl,table:et,text:hp},br=H("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",cn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ni).getRegex(),wp={...Qs,lheading:pp,table:br,paragraph:H(Gs).replace("hr",cn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",br).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ni).getRegex()},$p={...Qs,html:H(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Vs).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:et,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:H(Gs).replace("hr",cn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",pl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},kp=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,xp=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,vl=/^( {2,}|\\)\n(?!\s*$)/,Sp=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ii=/[\p{P}\p{S}]/u,Js=/[\s\p{P}\p{S}]/u,ml=/[^\s\p{P}\p{S}]/u,Ap=H(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Js).getRegex(),yl=/(?!~)[\p{P}\p{S}]/u,_p=/(?!~)[\s\p{P}\p{S}]/u,Cp=/(?:[^\s\p{P}\p{S}]|~)/u,bl=/(?![*_])[\p{P}\p{S}]/u,Tp=/(?![*_])[\s\p{P}\p{S}]/u,Ep=/(?:[^\s\p{P}\p{S}]|[*_])/u,Lp=H(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",cp?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),wl=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Rp=H(wl,"u").replace(/punct/g,ii).getRegex(),Ip=H(wl,"u").replace(/punct/g,yl).getRegex(),$l="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Mp=H($l,"gu").replace(/notPunctSpace/g,ml).replace(/punctSpace/g,Js).replace(/punct/g,ii).getRegex(),Pp=H($l,"gu").replace(/notPunctSpace/g,Cp).replace(/punctSpace/g,_p).replace(/punct/g,yl).getRegex(),Fp=H("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ml).replace(/punctSpace/g,Js).replace(/punct/g,ii).getRegex(),Dp=H(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,bl).getRegex(),Op="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",Np=H(Op,"gu").replace(/notPunctSpace/g,Ep).replace(/punctSpace/g,Tp).replace(/punct/g,bl).getRegex(),Bp=H(/\\(punct)/,"gu").replace(/punct/g,ii).getRegex(),Up=H(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),zp=H(Vs).replace("(?:-->|$)","-->").getRegex(),jp=H("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",zp).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Bn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Hp=H(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Bn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),kl=H(/^!?\[(label)\]\[(ref)\]/).replace("label",Bn).replace("ref",Ws).getRegex(),xl=H(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ws).getRegex(),Kp=H("reflink|nolink(?!\\()","g").replace("reflink",kl).replace("nolink",xl).getRegex(),wr=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ys={_backpedal:et,anyPunctuation:Bp,autolink:Up,blockSkip:Lp,br:vl,code:xp,del:et,delLDelim:et,delRDelim:et,emStrongLDelim:Rp,emStrongRDelimAst:Mp,emStrongRDelimUnd:Fp,escape:kp,link:Hp,nolink:xl,punctuation:Ap,reflink:kl,reflinkSearch:Kp,tag:jp,text:Sp,url:et},qp={...Ys,link:H(/^!?\[(label)\]\((.*?)\)/).replace("label",Bn).getRegex(),reflink:H(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Bn).getRegex()},ls={...Ys,emStrongRDelimAst:Pp,emStrongLDelim:Ip,delLDelim:Dp,delRDelim:Np,url:H(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",wr).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:H(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",wr).getRegex()},Gp={...ls,br:H(vl).replace("{2,}","*").getRegex(),text:H(ls.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},xn={normal:Qs,gfm:wp,pedantic:$p},zt={normal:Ys,gfm:ls,breaks:Gp,pedantic:qp},Wp={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},$r=e=>Wp[e];function Ce(e,t){if(t){if(de.escapeTest.test(e))return e.replace(de.escapeReplace,$r)}else if(de.escapeTestNoEncode.test(e))return e.replace(de.escapeReplaceNoEncode,$r);return e}function kr(e){try{e=encodeURI(e).replace(de.percentDecode,"%")}catch{return null}return e}function xr(e,t){var o;let n=e.replace(de.findPipe,(r,a,l)=>{let d=!1,f=a;for(;--f>=0&&l[f]==="\\";)d=!d;return d?"|":" |"}),i=n.split(de.splitPipe),s=0;if(i[0].trim()||i.shift(),i.length>0&&!((o=i.at(-1))!=null&&o.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(de.slashPipe,"|");return i}function jt(e,t,n){let i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function Vp(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function Qp(e,t=0){let n=t,i="";for(let s of e)if(s==="	"){let o=4-n%4;i+=" ".repeat(o),n+=o}else i+=s,n++;return i}function Sr(e,t,n,i,s){let o=t.href,r=t.title||null,a=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:r,text:a,tokens:i.inlineTokens(a)};return i.state.inLink=!1,l}function Jp(e,t,n){let i=e.match(n.other.indentCodeCompensation);if(i===null)return t;let s=i[1];return t.split(`
`).map(o=>{let r=o.match(n.other.beginningSpace);if(r===null)return o;let[a]=r;return a.length>=s.length?o.slice(s.length):o}).join(`
`)}var Un=class{constructor(e){j(this,"options");j(this,"rules");j(this,"lexer");this.options=e||ft}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:jt(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],i=Jp(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let i=jt(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:jt(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=jt(t[0],`
`).split(`
`),i="",s="",o=[];for(;n.length>0;){let r=!1,a=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))a.push(n[l]),r=!0;else if(!r)a.push(n[l]);else break;n=n.slice(l);let d=a.join(`
`),f=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${d}`:d,s=s?`${s}
${f}`:f;let u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=u,n.length===0)break;let g=o.at(-1);if((g==null?void 0:g.type)==="code")break;if((g==null?void 0:g.type)==="blockquote"){let y=g,b=y.raw+`
`+n.join(`
`),k=this.blockquote(b);o[o.length-1]=k,i=i.substring(0,i.length-y.raw.length)+k.raw,s=s.substring(0,s.length-y.text.length)+k.text;break}else if((g==null?void 0:g.type)==="list"){let y=g,b=y.raw+`
`+n.join(`
`),k=this.list(b);o[o.length-1]=k,i=i.substring(0,i.length-g.raw.length)+k.raw,s=s.substring(0,s.length-y.raw.length)+k.raw,n=b.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:o,text:s}}}list(e){var n,i;let t=this.rules.block.list.exec(e);if(t){let s=t[1].trim(),o=s.length>1,r={type:"list",raw:"",ordered:o,start:o?+s.slice(0,-1):"",loose:!1,items:[]};s=o?`\\d{1,9}\\${s.slice(-1)}`:`\\${s}`,this.options.pedantic&&(s=o?s:"[*+-]");let a=this.rules.other.listItemRegex(s),l=!1;for(;e;){let f=!1,u="",g="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let y=Qp(t[2].split(`
`,1)[0],t[1].length),b=e.split(`
`,1)[0],k=!y.trim(),S=0;if(this.options.pedantic?(S=2,g=y.trimStart()):k?S=t[1].length+1:(S=y.search(this.rules.other.nonSpaceChar),S=S>4?1:S,g=y.slice(S),S+=t[1].length),k&&this.rules.other.blankLine.test(b)&&(u+=b+`
`,e=e.substring(b.length+1),f=!0),!f){let C=this.rules.other.nextBulletRegex(S),D=this.rules.other.hrRegex(S),L=this.rules.other.fencesBeginRegex(S),R=this.rules.other.headingBeginRegex(S),x=this.rules.other.htmlBeginRegex(S),m=this.rules.other.blockquoteBeginRegex(S);for(;e;){let A=e.split(`
`,1)[0],I;if(b=A,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),I=b):I=b.replace(this.rules.other.tabCharGlobal,"    "),L.test(b)||R.test(b)||x.test(b)||m.test(b)||C.test(b)||D.test(b))break;if(I.search(this.rules.other.nonSpaceChar)>=S||!b.trim())g+=`
`+I.slice(S);else{if(k||y.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||L.test(y)||R.test(y)||D.test(y))break;g+=`
`+b}k=!b.trim(),u+=A+`
`,e=e.substring(A.length+1),y=I.slice(S)}}r.loose||(l?r.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(l=!0)),r.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(g),loose:!1,text:g,tokens:[]}),r.raw+=u}let d=r.items.at(-1);if(d)d.raw=d.raw.trimEnd(),d.text=d.text.trimEnd();else return;r.raw=r.raw.trimEnd();for(let f of r.items){if(this.lexer.state.top=!1,f.tokens=this.lexer.blockTokens(f.text,[]),f.task){if(f.text=f.text.replace(this.rules.other.listReplaceTask,""),((n=f.tokens[0])==null?void 0:n.type)==="text"||((i=f.tokens[0])==null?void 0:i.type)==="paragraph"){f.tokens[0].raw=f.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),f.tokens[0].text=f.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let g=this.lexer.inlineQueue.length-1;g>=0;g--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[g].src)){this.lexer.inlineQueue[g].src=this.lexer.inlineQueue[g].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(f.raw);if(u){let g={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};f.checked=g.checked,r.loose?f.tokens[0]&&["paragraph","text"].includes(f.tokens[0].type)&&"tokens"in f.tokens[0]&&f.tokens[0].tokens?(f.tokens[0].raw=g.raw+f.tokens[0].raw,f.tokens[0].text=g.raw+f.tokens[0].text,f.tokens[0].tokens.unshift(g)):f.tokens.unshift({type:"paragraph",raw:g.raw,text:g.raw,tokens:[g]}):f.tokens.unshift(g)}}if(!r.loose){let u=f.tokens.filter(y=>y.type==="space"),g=u.length>0&&u.some(y=>this.rules.other.anyLine.test(y.raw));r.loose=g}}if(r.loose)for(let f of r.items){f.loose=!0;for(let u of f.tokens)u.type==="text"&&(u.type="paragraph")}return r}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var r;let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=xr(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(r=t[3])!=null&&r.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(let a of i)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(xr(a,o.header.length).map((l,d)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[d]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=jt(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=Vp(t[2],"()");if(o===-2)return;if(o>-1){let r=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(i);o&&(i=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),Sr(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Sr(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(i[1]||i[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...i[0]].length-1,o,r,a=s,l=0,d=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(i=d.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(r=[...o].length,i[3]||i[4]){a+=r;continue}else if((i[5]||i[6])&&s%3&&!((s+r)%3)){l+=r;continue}if(a-=r,a>0)continue;r=Math.min(r,r+a+l);let f=[...i[0]][0].length,u=e.slice(0,s+i.index+f+r);if(Math.min(s,r)%2){let y=u.slice(1,-1);return{type:"em",raw:u,text:y,tokens:this.lexer.inlineTokens(y)}}let g=u.slice(2,-2);return{type:"strong",raw:u,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e,t,n=""){let i=this.rules.inline.delLDelim.exec(e);if(i&&(!i[1]||!n||this.rules.inline.punctuation.exec(n))){let s=[...i[0]].length-1,o,r,a=s,l=this.rules.inline.delRDelim;for(l.lastIndex=0,t=t.slice(-1*e.length+s);(i=l.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o||(r=[...o].length,r!==s))continue;if(i[3]||i[4]){a+=r;continue}if(a-=r,a>0)continue;r=Math.min(r,r+a);let d=[...i[0]][0].length,f=e.slice(0,s+i.index+d+r),u=f.slice(s,-s);return{type:"del",raw:f,text:u,tokens:this.lexer.inlineTokens(u)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let o;do o=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(o!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},$e=class cs{constructor(t){j(this,"tokens");j(this,"options");j(this,"state");j(this,"inlineQueue");j(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||ft,this.options.tokenizer=this.options.tokenizer||new Un,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:de,block:xn.normal,inline:zt.normal};this.options.pedantic?(n.block=xn.pedantic,n.inline=zt.pedantic):this.options.gfm&&(n.block=xn.gfm,this.options.breaks?n.inline=zt.breaks:n.inline=zt.gfm),this.tokenizer.rules=n}static get rules(){return{block:xn,inline:zt}}static lex(t,n){return new cs(n).lex(t)}static lexInline(t,n){return new cs(n).inlineTokens(t)}lex(t){t=t.replace(de.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,o,r;for(this.options.pedantic&&(t=t.replace(de.tabCharGlobal,"    ").replace(de.spaceLine,""));t;){let a;if((o=(s=this.options.extensions)==null?void 0:s.block)!=null&&o.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.space(t)){t=t.substring(a.raw.length);let d=n.at(-1);a.raw.length===1&&d!==void 0?d.raw+=`
`:n.push(a);continue}if(a=this.tokenizer.code(t)){t=t.substring(a.raw.length);let d=n.at(-1);(d==null?void 0:d.type)==="paragraph"||(d==null?void 0:d.type)==="text"?(d.raw+=(d.raw.endsWith(`
`)?"":`
`)+a.raw,d.text+=`
`+a.text,this.inlineQueue.at(-1).src=d.text):n.push(a);continue}if(a=this.tokenizer.fences(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.heading(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.hr(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.blockquote(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.list(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.html(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.def(t)){t=t.substring(a.raw.length);let d=n.at(-1);(d==null?void 0:d.type)==="paragraph"||(d==null?void 0:d.type)==="text"?(d.raw+=(d.raw.endsWith(`
`)?"":`
`)+a.raw,d.text+=`
`+a.raw,this.inlineQueue.at(-1).src=d.text):this.tokens.links[a.tag]||(this.tokens.links[a.tag]={href:a.href,title:a.title},n.push(a));continue}if(a=this.tokenizer.table(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.lheading(t)){t=t.substring(a.raw.length),n.push(a);continue}let l=t;if((r=this.options.extensions)!=null&&r.startBlock){let d=1/0,f=t.slice(1),u;this.options.extensions.startBlock.forEach(g=>{u=g.call({lexer:this},f),typeof u=="number"&&u>=0&&(d=Math.min(d,u))}),d<1/0&&d>=0&&(l=t.substring(0,d+1))}if(this.state.top&&(a=this.tokenizer.paragraph(l))){let d=n.at(-1);i&&(d==null?void 0:d.type)==="paragraph"?(d.raw+=(d.raw.endsWith(`
`)?"":`
`)+a.raw,d.text+=`
`+a.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=d.text):n.push(a),i=l.length!==t.length,t=t.substring(a.raw.length);continue}if(a=this.tokenizer.text(t)){t=t.substring(a.raw.length);let d=n.at(-1);(d==null?void 0:d.type)==="text"?(d.raw+=(d.raw.endsWith(`
`)?"":`
`)+a.raw,d.text+=`
`+a.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=d.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var l,d,f,u,g;let i=t,s=null;if(this.tokens.links){let y=Object.keys(this.tokens.links);if(y.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)y.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)o=s[2]?s[2].length:0,i=i.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);i=((d=(l=this.options.hooks)==null?void 0:l.emStrongMask)==null?void 0:d.call({lexer:this},i))??i;let r=!1,a="";for(;t;){r||(a=""),r=!1;let y;if((u=(f=this.options.extensions)==null?void 0:f.inline)!=null&&u.some(k=>(y=k.call({lexer:this},t,n))?(t=t.substring(y.raw.length),n.push(y),!0):!1))continue;if(y=this.tokenizer.escape(t)){t=t.substring(y.raw.length),n.push(y);continue}if(y=this.tokenizer.tag(t)){t=t.substring(y.raw.length),n.push(y);continue}if(y=this.tokenizer.link(t)){t=t.substring(y.raw.length),n.push(y);continue}if(y=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(y.raw.length);let k=n.at(-1);y.type==="text"&&(k==null?void 0:k.type)==="text"?(k.raw+=y.raw,k.text+=y.text):n.push(y);continue}if(y=this.tokenizer.emStrong(t,i,a)){t=t.substring(y.raw.length),n.push(y);continue}if(y=this.tokenizer.codespan(t)){t=t.substring(y.raw.length),n.push(y);continue}if(y=this.tokenizer.br(t)){t=t.substring(y.raw.length),n.push(y);continue}if(y=this.tokenizer.del(t,i,a)){t=t.substring(y.raw.length),n.push(y);continue}if(y=this.tokenizer.autolink(t)){t=t.substring(y.raw.length),n.push(y);continue}if(!this.state.inLink&&(y=this.tokenizer.url(t))){t=t.substring(y.raw.length),n.push(y);continue}let b=t;if((g=this.options.extensions)!=null&&g.startInline){let k=1/0,S=t.slice(1),C;this.options.extensions.startInline.forEach(D=>{C=D.call({lexer:this},S),typeof C=="number"&&C>=0&&(k=Math.min(k,C))}),k<1/0&&k>=0&&(b=t.substring(0,k+1))}if(y=this.tokenizer.inlineText(b)){t=t.substring(y.raw.length),y.raw.slice(-1)!=="_"&&(a=y.raw.slice(-1)),r=!0;let k=n.at(-1);(k==null?void 0:k.type)==="text"?(k.raw+=y.raw,k.text+=y.text):n.push(y);continue}if(t){let k="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(k);break}else throw new Error(k)}}return n}},zn=class{constructor(e){j(this,"options");j(this,"parser");this.options=e||ft}space(e){return""}code({text:e,lang:t,escaped:n}){var o;let i=(o=(t||"").match(de.notSpaceStart))==null?void 0:o[0],s=e.replace(de.endingNewline,"")+`
`;return i?'<pre><code class="language-'+Ce(i)+'">'+(n?s:Ce(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Ce(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Ce(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let i=this.parser.parseInline(n),s=kr(e);if(s===null)return i;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Ce(t)+'"'),o+=">"+i+"</a>",o}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));let s=kr(e);if(s===null)return Ce(n);e=s;let o=`<img src="${e}" alt="${Ce(n)}"`;return t&&(o+=` title="${Ce(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Ce(e.text)}},Xs=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},ke=class ds{constructor(t){j(this,"options");j(this,"renderer");j(this,"textRenderer");this.options=t||ft,this.options.renderer=this.options.renderer||new zn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Xs}static parse(t,n){return new ds(n).parse(t)}static parseInline(t,n){return new ds(n).parseInline(t)}parse(t){var i,s;let n="";for(let o=0;o<t.length;o++){let r=t[o];if((s=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&s[r.type]){let l=r,d=this.options.extensions.renderers[l.type].call({parser:this},l);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(l.type)){n+=d||"";continue}}let a=r;switch(a.type){case"space":{n+=this.renderer.space(a);break}case"hr":{n+=this.renderer.hr(a);break}case"heading":{n+=this.renderer.heading(a);break}case"code":{n+=this.renderer.code(a);break}case"table":{n+=this.renderer.table(a);break}case"blockquote":{n+=this.renderer.blockquote(a);break}case"list":{n+=this.renderer.list(a);break}case"checkbox":{n+=this.renderer.checkbox(a);break}case"html":{n+=this.renderer.html(a);break}case"def":{n+=this.renderer.def(a);break}case"paragraph":{n+=this.renderer.paragraph(a);break}case"text":{n+=this.renderer.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}parseInline(t,n=this.renderer){var s,o;let i="";for(let r=0;r<t.length;r++){let a=t[r];if((o=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&o[a.type]){let d=this.options.extensions.renderers[a.type].call({parser:this},a);if(d!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type)){i+=d||"";continue}}let l=a;switch(l.type){case"escape":{i+=n.text(l);break}case"html":{i+=n.html(l);break}case"link":{i+=n.link(l);break}case"image":{i+=n.image(l);break}case"checkbox":{i+=n.checkbox(l);break}case"strong":{i+=n.strong(l);break}case"em":{i+=n.em(l);break}case"codespan":{i+=n.codespan(l);break}case"br":{i+=n.br(l);break}case"del":{i+=n.del(l);break}case"text":{i+=n.text(l);break}default:{let d='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(d),"";throw new Error(d)}}}return i}},An,Ht=(An=class{constructor(e){j(this,"options");j(this,"block");this.options=e||ft}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?$e.lex:$e.lexInline}provideParser(){return this.block?ke.parse:ke.parseInline}},j(An,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),j(An,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),An),Yp=class{constructor(...e){j(this,"defaults",Ks());j(this,"options",this.setOptions);j(this,"parse",this.parseMarkdown(!0));j(this,"parseInline",this.parseMarkdown(!1));j(this,"Parser",ke);j(this,"Renderer",zn);j(this,"TextRenderer",Xs);j(this,"Lexer",$e);j(this,"Tokenizer",Un);j(this,"Hooks",Ht);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(let o of e)switch(n=n.concat(t.call(this,o)),o.type){case"table":{let r=o;for(let a of r.header)n=n.concat(this.walkTokens(a.tokens,t));for(let a of r.rows)for(let l of a)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{let r=o;n=n.concat(this.walkTokens(r.items,t));break}default:{let r=o;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[r.type]?this.defaults.extensions.childTokens[r.type].forEach(a=>{let l=r[a].flat(1/0);n=n.concat(this.walkTokens(l,t))}):r.tokens&&(n=n.concat(this.walkTokens(r.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...r){let a=s.renderer.apply(this,r);return a===!1&&(a=o.apply(this,r)),a}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){let s=this.defaults.renderer||new zn(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let r=o,a=n.renderer[r],l=s[r];s[r]=(...d)=>{let f=a.apply(s,d);return f===!1&&(f=l.apply(s,d)),f||""}}i.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new Un(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let r=o,a=n.tokenizer[r],l=s[r];s[r]=(...d)=>{let f=a.apply(s,d);return f===!1&&(f=l.apply(s,d)),f}}i.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new Ht;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let r=o,a=n.hooks[r],l=s[r];Ht.passThroughHooks.has(o)?s[r]=d=>{if(this.defaults.async&&Ht.passThroughHooksRespectAsync.has(o))return(async()=>{let u=await a.call(s,d);return l.call(s,u)})();let f=a.call(s,d);return l.call(s,f)}:s[r]=(...d)=>{if(this.defaults.async)return(async()=>{let u=await a.apply(s,d);return u===!1&&(u=await l.apply(s,d)),u})();let f=a.apply(s,d);return f===!1&&(f=l.apply(s,d)),f}}i.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;i.walkTokens=function(r){let a=[];return a.push(o.call(this,r)),s&&(a=a.concat(s.call(this,r))),a}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return $e.lex(e,t??this.defaults)}parser(e,t){return ke.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let i={...n},s={...this.defaults,...i},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&i.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let r=s.hooks?await s.hooks.preprocess(t):t,a=await(s.hooks?await s.hooks.provideLexer():e?$e.lex:$e.lexInline)(r,s),l=s.hooks?await s.hooks.processAllTokens(a):a;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?ke.parse:ke.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let r=(s.hooks?s.hooks.provideLexer():e?$e.lex:$e.lexInline)(t,s);s.hooks&&(r=s.hooks.processAllTokens(r)),s.walkTokens&&this.walkTokens(r,s.walkTokens);let a=(s.hooks?s.hooks.provideParser():e?ke.parse:ke.parseInline)(r,s);return s.hooks&&(a=s.hooks.postprocess(a)),a}catch(r){return o(r)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let i="<p>An error occurred:</p><pre>"+Ce(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},ct=new Yp;function G(e,t){return ct.parse(e,t)}G.options=G.setOptions=function(e){return ct.setOptions(e),G.defaults=ct.defaults,fl(G.defaults),G};G.getDefaults=Ks;G.defaults=ft;G.use=function(...e){return ct.use(...e),G.defaults=ct.defaults,fl(G.defaults),G};G.walkTokens=function(e,t){return ct.walkTokens(e,t)};G.parseInline=ct.parseInline;G.Parser=ke;G.parser=ke.parse;G.Renderer=zn;G.TextRenderer=Xs;G.Lexer=$e;G.lexer=$e.lex;G.Tokenizer=Un;G.Hooks=Ht;G.parse=G;G.options;G.setOptions;G.use;G.walkTokens;G.parseInline;ke.parse;$e.lex;G.setOptions({gfm:!0,breaks:!0});const Xp=["a","b","blockquote","br","code","del","em","h1","h2","h3","h4","hr","i","li","ol","p","pre","strong","table","tbody","td","th","thead","tr","ul","img"],Zp=["class","href","rel","target","title","start","src","alt"],Ar={ALLOWED_TAGS:Xp,ALLOWED_ATTR:Zp,ADD_DATA_URI_TAGS:["img"]};let _r=!1;const eh=14e4,th=4e4,nh=200,Ui=5e4,nt=new Map;function ih(e){const t=nt.get(e);return t===void 0?null:(nt.delete(e),nt.set(e,t),t)}function Cr(e,t){if(nt.set(e,t),nt.size<=nh)return;const n=nt.keys().next().value;n&&nt.delete(n)}function sh(){_r||(_r=!0,as.addHook("afterSanitizeAttributes",e=>{!(e instanceof HTMLAnchorElement)||!e.getAttribute("href")||(e.setAttribute("rel","noreferrer noopener"),e.setAttribute("target","_blank"))}))}function us(e){const t=e.trim();if(!t)return"";if(sh(),t.length<=Ui){const r=ih(t);if(r!==null)return r}const n=ga(t,eh),i=n.truncated?`

… truncated (${n.total} chars, showing first ${n.text.length}).`:"";if(n.text.length>th){const a=`<pre class="code-block">${Al(`${n.text}${i}`)}</pre>`,l=as.sanitize(a,Ar);return t.length<=Ui&&Cr(t,l),l}const s=G.parse(`${n.text}${i}`,{renderer:Sl}),o=as.sanitize(s,Ar);return t.length<=Ui&&Cr(t,o),o}const Sl=new G.Renderer;Sl.html=({text:e})=>Al(e);function Al(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const oh=new RegExp("\\p{Script=Hebrew}|\\p{Script=Arabic}|\\p{Script=Syriac}|\\p{Script=Thaana}|\\p{Script=Nko}|\\p{Script=Samaritan}|\\p{Script=Mandaic}|\\p{Script=Adlam}|\\p{Script=Phoenician}|\\p{Script=Lydian}","u");function _l(e,t=/[\s\p{P}\p{S}]/u){if(!e)return"ltr";for(const n of e)if(!t.test(n))return oh.test(n)?"rtl":"ltr";return"ltr"}const rh=1500,ah=2e3,Cl="Copy as markdown",lh="Copied",ch="Copy failed";async function dh(e){if(!e)return!1;try{return await navigator.clipboard.writeText(e),!0}catch{return!1}}function Sn(e,t){e.title=t,e.setAttribute("aria-label",t)}function uh(e){const t=e.label??Cl;return c`
    <button
      class="chat-copy-btn"
      type="button"
      title=${t}
      aria-label=${t}
      @click=${async n=>{const i=n.currentTarget;if(!i||i.dataset.copying==="1")return;i.dataset.copying="1",i.setAttribute("aria-busy","true"),i.disabled=!0;const s=await dh(e.text());if(i.isConnected){if(delete i.dataset.copying,i.removeAttribute("aria-busy"),i.disabled=!1,!s){i.dataset.error="1",Sn(i,ch),window.setTimeout(()=>{i.isConnected&&(delete i.dataset.error,Sn(i,t))},ah);return}i.dataset.copied="1",Sn(i,lh),window.setTimeout(()=>{i.isConnected&&(delete i.dataset.copied,Sn(i,t))},rh)}}}
    >
      <span class="chat-copy-btn__icon" aria-hidden="true">
        <span class="chat-copy-btn__icon-copy">${ie.copy}</span>
        <span class="chat-copy-btn__icon-check">${ie.check}</span>
      </span>
    </button>
  `}function fh(e){return uh({text:()=>e,label:Cl})}function Tl(e){const t=e;let n=typeof t.role=="string"?t.role:"unknown";const i=typeof t.toolCallId=="string"||typeof t.tool_call_id=="string",s=t.content,o=Array.isArray(s)?s:null,r=Array.isArray(o)&&o.some(u=>{const g=u,y=(typeof g.type=="string"?g.type:"").toLowerCase();return y==="toolresult"||y==="tool_result"}),a=typeof t.toolName=="string"||typeof t.tool_name=="string";(i||r||a)&&(n="toolResult");let l=[];typeof t.content=="string"?l=[{type:"text",text:t.content}]:Array.isArray(t.content)?l=t.content.map(u=>({type:u.type||"text",text:u.text,name:u.name,args:u.args||u.arguments})):typeof t.text=="string"&&(l=[{type:"text",text:t.text}]);const d=typeof t.timestamp=="number"?t.timestamp:Date.now(),f=typeof t.id=="string"?t.id:void 0;return{role:n,content:l,timestamp:d,id:f}}function Zs(e){const t=e.toLowerCase();return e==="user"||e==="User"?e:e==="assistant"?"assistant":e==="system"?"system":t==="toolresult"||t==="tool_result"||t==="tool"||t==="function"?"tool":e}function El(e){const t=e,n=typeof t.role=="string"?t.role.toLowerCase():"";return n==="toolresult"||n==="tool_result"}function gh(e){return(e??"").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())||"Tool"}function ph(e){const t=(e??"").trim();return t?t.replace(/\s+/g,"_").toLowerCase():""}function hh(e){return(e??"").trim().toLowerCase()||"use"}const vh={icon:"puzzle",detailKeys:["command","path","url","targetUrl","targetId","ref","element","node","nodeId","id","requestId","to","channelId","guildId","userId","name","query","pattern","messageId"]},mh={bash:{icon:"wrench",title:"Bash",detailKeys:["command"]},process:{icon:"wrench",title:"Process",detailKeys:["sessionId"]},read:{icon:"fileText",title:"Read",detailKeys:["path"]},write:{icon:"edit",title:"Write",detailKeys:["path"]},edit:{icon:"penLine",title:"Edit",detailKeys:["path"]},attach:{icon:"paperclip",title:"Attach",detailKeys:["path","url","fileName"]},browser:{icon:"globe",title:"Browser",actions:{status:{label:"status"},start:{label:"start"},stop:{label:"stop"},tabs:{label:"tabs"},open:{label:"open",detailKeys:["targetUrl"]},focus:{label:"focus",detailKeys:["targetId"]},close:{label:"close",detailKeys:["targetId"]},snapshot:{label:"snapshot",detailKeys:["targetUrl","targetId","ref","element","format"]},screenshot:{label:"screenshot",detailKeys:["targetUrl","targetId","ref","element"]},navigate:{label:"navigate",detailKeys:["targetUrl","targetId"]},console:{label:"console",detailKeys:["level","targetId"]},pdf:{label:"pdf",detailKeys:["targetId"]},upload:{label:"upload",detailKeys:["paths","ref","inputRef","element","targetId"]},dialog:{label:"dialog",detailKeys:["accept","promptText","targetId"]},act:{label:"act",detailKeys:["request.kind","request.ref","request.selector","request.text","request.value"]}}},canvas:{icon:"image",title:"Canvas",actions:{present:{label:"present",detailKeys:["target","node","nodeId"]},hide:{label:"hide",detailKeys:["node","nodeId"]},navigate:{label:"navigate",detailKeys:["url","node","nodeId"]},eval:{label:"eval",detailKeys:["javaScript","node","nodeId"]},snapshot:{label:"snapshot",detailKeys:["format","node","nodeId"]},a2ui_push:{label:"A2UI push",detailKeys:["jsonlPath","node","nodeId"]},a2ui_reset:{label:"A2UI reset",detailKeys:["node","nodeId"]}}},nodes:{icon:"smartphone",title:"Nodes",actions:{status:{label:"status"},describe:{label:"describe",detailKeys:["node","nodeId"]},pending:{label:"pending"},approve:{label:"approve",detailKeys:["requestId"]},reject:{label:"reject",detailKeys:["requestId"]},notify:{label:"notify",detailKeys:["node","nodeId","title","body"]},camera_snap:{label:"camera snap",detailKeys:["node","nodeId","facing","deviceId"]},camera_list:{label:"camera list",detailKeys:["node","nodeId"]},camera_clip:{label:"camera clip",detailKeys:["node","nodeId","facing","duration","durationMs"]},screen_record:{label:"screen record",detailKeys:["node","nodeId","duration","durationMs","fps","screenIndex"]}}},cron:{icon:"loader",title:"Cron",actions:{status:{label:"status"},list:{label:"list"},add:{label:"add",detailKeys:["job.name","job.id","job.schedule","job.cron"]},update:{label:"update",detailKeys:["id"]},remove:{label:"remove",detailKeys:["id"]},run:{label:"run",detailKeys:["id"]},runs:{label:"runs",detailKeys:["id"]},wake:{label:"wake",detailKeys:["text","mode"]}}},gateway:{icon:"plug",title:"Gateway",actions:{restart:{label:"restart",detailKeys:["reason","delayMs"]},"config.get":{label:"config get"},"config.schema":{label:"config schema"},"config.apply":{label:"config apply",detailKeys:["restartDelayMs"]},"update.run":{label:"update run",detailKeys:["restartDelayMs"]}}},whatsapp_login:{icon:"circle",title:"WhatsApp Login",actions:{start:{label:"start"},wait:{label:"wait"}}},discord:{icon:"messageSquare",title:"Discord",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sticker:{label:"sticker",detailKeys:["to","stickerIds"]},poll:{label:"poll",detailKeys:["question","to"]},permissions:{label:"permissions",detailKeys:["channelId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},threadCreate:{label:"thread create",detailKeys:["channelId","name"]},threadList:{label:"thread list",detailKeys:["guildId","channelId"]},threadReply:{label:"thread reply",detailKeys:["channelId","content"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},searchMessages:{label:"search",detailKeys:["guildId","content"]},memberInfo:{label:"member",detailKeys:["guildId","userId"]},roleInfo:{label:"roles",detailKeys:["guildId"]},emojiList:{label:"emoji list",detailKeys:["guildId"]},roleAdd:{label:"role add",detailKeys:["guildId","userId","roleId"]},roleRemove:{label:"role remove",detailKeys:["guildId","userId","roleId"]},channelInfo:{label:"channel",detailKeys:["channelId"]},channelList:{label:"channels",detailKeys:["guildId"]},voiceStatus:{label:"voice",detailKeys:["guildId","userId"]},eventList:{label:"events",detailKeys:["guildId"]},eventCreate:{label:"event create",detailKeys:["guildId","name"]},timeout:{label:"timeout",detailKeys:["guildId","userId"]},kick:{label:"kick",detailKeys:["guildId","userId"]},ban:{label:"ban",detailKeys:["guildId","userId"]}}},slack:{icon:"messageSquare",title:"Slack",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},memberInfo:{label:"member",detailKeys:["userId"]},emojiList:{label:"emoji list"}}}},yh={fallback:vh,tools:mh},Ll=yh,Tr=Ll.fallback??{icon:"puzzle"},bh=Ll.tools??{};function wh(e){if(!e)return e;const t=[{re:/^\/Users\/[^/]+(\/|$)/,replacement:"~$1"},{re:/^\/home\/[^/]+(\/|$)/,replacement:"~$1"},{re:/^C:\\Users\\[^\\]+(\\|$)/i,replacement:"~$1"}];for(const n of t)if(n.re.test(e))return e.replace(n.re,n.replacement);return e}function $h(e){const t=ph(e.name),n=t.toLowerCase(),i=bh[n],s=(i==null?void 0:i.icon)??Tr.icon??"puzzle",o=(i==null?void 0:i.title)??gh(t),r=(i==null?void 0:i.label)??o,a=e.args&&typeof e.args=="object"?e.args.action:void 0,l=typeof a=="string"?a.trim():void 0,d=n==="web_search"?"search":n==="web_fetch"?"fetch":n.replace(/_/g," ").replace(/\./g," "),f=hh(l??d);let u;n==="exec"&&(u=void 0),!u&&n==="read"&&(u=void 0),!u&&(n==="write"||n==="edit"||n==="attach")&&(u=void 0),!u&&n==="web_search"&&(u=void 0),!u&&n==="web_fetch"&&(u=void 0);const g=(i==null?void 0:i.detailKeys)??Tr.detailKeys??[];return!u&&g.length>0&&(u=void 0),!u&&e.meta&&(u=e.meta),u&&(u=wh(u)),{name:t,icon:s,title:o,label:r,verb:f,detail:u}}function kh(e){if(e.detail){if(e.detail.includes(" · ")){const t=e.detail.split(" · ").map(n=>n.trim()).filter(n=>n.length>0).join(", ");return t?`with ${t}`:void 0}return e.detail}}const xh=80,Sh=2,Er=100;function Ah(e){const t=e.trim();if(t.startsWith("{")||t.startsWith("["))try{const n=JSON.parse(t);return"```json\n"+JSON.stringify(n,null,2)+"\n```"}catch{}return e}function _h(e){const t=e.split(`
`),n=t.slice(0,Sh),i=n.join(`
`);return i.length>Er?i.slice(0,Er)+"…":n.length<t.length?i+"…":i}function Ch(e){const t=e,n=Th(t.content),i=[];for(const s of n){const o=(typeof s.type=="string"?s.type:"").toLowerCase();(["toolcall","tool_call","tooluse","tool_use"].includes(o)||typeof s.name=="string"&&s.arguments!=null)&&i.push({kind:"call",name:s.name??"tool",args:Eh(s.arguments??s.args)})}for(const s of n){const o=(typeof s.type=="string"?s.type:"").toLowerCase();if(o!=="toolresult"&&o!=="tool_result")continue;const r=Lh(s),a=typeof s.name=="string"?s.name:"tool";i.push({kind:"result",name:a,text:r})}if(El(e)&&!i.some(s=>s.kind==="result")){const s=typeof t.toolName=="string"&&t.toolName||typeof t.tool_name=="string"&&t.tool_name||"tool",o=za(e)??void 0;i.push({kind:"result",name:s,text:o})}return i}function Lr(e,t){var u,g;const n=$h({name:e.name,args:e.args}),i=kh(n),s=!!((u=e.text)!=null&&u.trim()),o=!!t,r=o?()=>{if(s){t(Ah(e.text));return}const y=`## ${n.label}

${i?`**Command:** \`${i}\`

`:""}*No output — tool completed successfully.*`;t(y)}:void 0,a=s&&(((g=e.text)==null?void 0:g.length)??0)<=xh,l=s&&!a,d=s&&a,f=!s;return c`
    <div
      class="chat-tool-card ${o?"chat-tool-card--clickable":""}"
      @click=${r}
      role=${o?"button":w}
      tabindex=${o?"0":w}
      @keydown=${o?y=>{y.key!=="Enter"&&y.key!==" "||(y.preventDefault(),r==null||r())}:w}
    >
      <div class="chat-tool-card__header">
        <div class="chat-tool-card__title">
          <span class="chat-tool-card__icon">${ie[n.icon]}</span>
          <span>${n.label}</span>
        </div>
        ${o?c`<span class="chat-tool-card__action">${s?"View":""} ${ie.check}</span>`:w}
        ${f&&!o?c`<span class="chat-tool-card__status">${ie.check}</span>`:w}
      </div>
      ${i?c`<div class="chat-tool-card__detail">${i}</div>`:w}
      ${f?c`
              <div class="chat-tool-card__status-text muted">Completed</div>
            `:w}
      ${l?c`<div class="chat-tool-card__preview mono">${_h(e.text)}</div>`:w}
      ${d?c`<div class="chat-tool-card__inline mono">${e.text}</div>`:w}
    </div>
  `}function Th(e){return Array.isArray(e)?e.filter(Boolean):[]}function Eh(e){if(typeof e!="string")return e;const t=e.trim();if(!t||!t.startsWith("{")&&!t.startsWith("["))return e;try{return JSON.parse(t)}catch{return e}}function Lh(e){if(typeof e.text=="string")return e.text;if(typeof e.content=="string")return e.content}function Rh(e){const n=e.content,i=[];if(Array.isArray(n))for(const s of n){if(typeof s!="object"||s===null)continue;const o=s;if(o.type==="image"){const r=o.source;if((r==null?void 0:r.type)==="base64"&&typeof r.data=="string"){const a=r.data,l=r.media_type||"image/png",d=a.startsWith("data:")?a:`data:${l};base64,${a}`;i.push({url:d})}else typeof o.url=="string"&&i.push({url:o.url})}else if(o.type==="image_url"){const r=o.image_url;typeof(r==null?void 0:r.url)=="string"&&i.push({url:r.url})}}return i}function Ih(e){return c`
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
  `}function Mh(e,t,n,i){const s=new Date(t).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}),o=(i==null?void 0:i.name)??"Assistant";return c`
    <div class="chat-group assistant">
      ${eo("assistant",i)}
      <div class="chat-group-messages">
        ${Rl({role:"assistant",content:[{type:"text",text:e}],timestamp:t},{isStreaming:!0,showReasoning:!1},n)}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${o}</span>
          <span class="chat-group-timestamp">${s}</span>
        </div>
      </div>
    </div>
  `}function Ph(e,t){const n=Zs(e.role),i=t.assistantName??"Assistant",s=n==="user"?"You":n==="assistant"?i:n,o=n==="user"?"user":n==="assistant"?"assistant":"other",r=new Date(e.timestamp).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return c`
    <div class="chat-group ${o}">
      ${eo(e.role,{name:i,avatar:t.assistantAvatar??null})}
      <div class="chat-group-messages">
        ${e.messages.map((a,l)=>Rl(a.message,{isStreaming:e.isStreaming&&l===e.messages.length-1,showReasoning:t.showReasoning},t.onOpenSidebar))}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${s}</span>
          <span class="chat-group-timestamp">${r}</span>
        </div>
      </div>
    </div>
  `}function eo(e,t){var a,l;const n=Zs(e),i=((a=t==null?void 0:t.name)==null?void 0:a.trim())||"Assistant",s=((l=t==null?void 0:t.avatar)==null?void 0:l.trim())||"",o=n==="user"?"U":n==="assistant"?i.charAt(0).toUpperCase()||"A":n==="tool"?"⚙":"?",r=n==="user"?"user":n==="assistant"?"assistant":n==="tool"?"tool":"other";return s&&n==="assistant"?Fh(s)?c`<img
        class="chat-avatar ${r}"
        src="${s}"
        alt="${i}"
      />`:c`<div class="chat-avatar ${r}">${s}</div>`:c`<div class="chat-avatar ${r}">${o}</div>`}function Fh(e){return/^https?:\/\//i.test(e)||/^data:image\//i.test(e)||e.startsWith("/")}function Dh(e){return e.length===0?w:c`
    <div class="chat-message-images">
      ${e.map(t=>c`
          <img
            src=${t.url}
            alt=${t.alt??"Attached image"}
            class="chat-message-image"
            @click=${()=>window.open(t.url,"_blank")}
          />
        `)}
    </div>
  `}function Rl(e,t,n){const i=e,s=typeof i.role=="string"?i.role:"unknown",o=El(e)||s.toLowerCase()==="toolresult"||s.toLowerCase()==="tool_result"||typeof i.toolCallId=="string"||typeof i.tool_call_id=="string",r=Ch(e),a=r.length>0,l=Rh(e),d=l.length>0,f=za(e),u=t.showReasoning&&s==="assistant"?Pu(e):null,g=f!=null&&f.trim()?f:null,y=u?Du(u):null,b=g,k=s==="assistant"&&!!(b!=null&&b.trim()),S=["chat-bubble",k?"has-copy":"",t.isStreaming?"streaming":"","fade-in"].filter(Boolean).join(" ");return!b&&a&&o?c`${r.map(C=>Lr(C,n))}`:!b&&!a&&!d?w:c`
    <div class="${S}">
      ${k?fh(b):w}
      ${Dh(l)}
      ${y?c`<div class="chat-thinking">${is(us(y))}</div>`:w}
      ${b?c`<div class="chat-text" dir="${_l(b)}">${is(us(b))}</div>`:w}
      ${r.map(C=>Lr(C,n))}
    </div>
  `}function Oh(e){return c`
    <div class="sidebar-panel">
      <div class="sidebar-header">
        <div class="sidebar-title">Tool Output</div>
        <button @click=${e.onClose} class="btn" title="Close sidebar">
          ${ie.x}
        </button>
      </div>
      <div class="sidebar-content">
        ${e.error?c`
              <div class="callout danger">${e.error}</div>
              <button @click=${e.onViewRawText} class="btn" style="margin-top: 12px;">
                View Raw Text
              </button>
            `:e.content?c`<div class="sidebar-markdown">${is(us(e.content))}</div>`:c`
                  <div class="muted">No content available</div>
                `}
      </div>
    </div>
  `}var Nh=Object.defineProperty,Bh=Object.getOwnPropertyDescriptor,si=(e,t,n,i)=>{for(var s=i>1?void 0:i?Bh(t,n):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(s=(i?r(t,n,s):r(s))||s);return i&&s&&Nh(t,n,s),s};let Ct=class extends St{constructor(){super(...arguments),this.splitRatio=.6,this.minRatio=.4,this.maxRatio=.7,this.isDragging=!1,this.startX=0,this.startRatio=0,this.handleMouseDown=e=>{this.isDragging=!0,this.startX=e.clientX,this.startRatio=this.splitRatio,this.classList.add("dragging"),document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),e.preventDefault()},this.handleMouseMove=e=>{if(!this.isDragging)return;const t=this.parentElement;if(!t)return;const n=t.getBoundingClientRect().width,s=(e.clientX-this.startX)/n;let o=this.startRatio+s;o=Math.max(this.minRatio,Math.min(this.maxRatio,o)),this.dispatchEvent(new CustomEvent("resize",{detail:{splitRatio:o},bubbles:!0,composed:!0}))},this.handleMouseUp=()=>{this.isDragging=!1,this.classList.remove("dragging"),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}}render(){return w}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}};Ct.styles=ql`
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
  `;si([Kn({type:Number})],Ct.prototype,"splitRatio",2);si([Kn({type:Number})],Ct.prototype,"minRatio",2);si([Kn({type:Number})],Ct.prototype,"maxRatio",2);Ct=si([Zr("resizable-divider")],Ct);const Uh=5e3,zh=/\.(xlsx|xls|xlsm|pdf)$/i;function jh(e){for(let t=0;t<e.length;t++)if(zh.test(e[t].name))return e[t];return null}function Rr(e){e.style.height="auto",e.style.height=`${e.scrollHeight}px`}function Hh(e){return e?e.active?c`
      <div class="compaction-indicator compaction-indicator--active" role="status" aria-live="polite">
        ${ie.loader} Compacting context...
      </div>
    `:e.completedAt&&Date.now()-e.completedAt<Uh?c`
        <div class="compaction-indicator compaction-indicator--complete" role="status" aria-live="polite">
          ${ie.check} Context compacted
        </div>
      `:w:w}function Kh(){return`att-${Date.now()}-${Math.random().toString(36).slice(2,9)}`}function qh(e,t){var s;const n=(s=e.clipboardData)==null?void 0:s.items;if(!n||!t.onAttachmentsChange)return;const i=[];for(let o=0;o<n.length;o++){const r=n[o];r.type.startsWith("image/")&&i.push(r)}if(i.length!==0){e.preventDefault();for(const o of i){const r=o.getAsFile();if(!r)continue;const a=new FileReader;a.addEventListener("load",()=>{var u;const l=a.result,d={id:Kh(),dataUrl:l,mimeType:r.type},f=t.attachments??[];(u=t.onAttachmentsChange)==null||u.call(t,[...f,d])}),a.readAsDataURL(r)}}}function Gh(e){const t=e.attachments??[];return t.length===0?w:c`
    <div class="chat-attachments">
      ${t.map(n=>c`
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
              ${ie.x}
            </button>
          </div>
        `)}
    </div>
  `}function Wh(e){const t=e.uploadedFile,n=e.onFileSelect,i=e.onClearUploadedFile;return t!=null&&t.file_name?c`
      <div class="chat-uploaded-file">
        <span class="chat-uploaded-file__name" title=${t.file_path}>${t.file_name}</span>
        <button
          type="button"
          class="btn chat-uploaded-file__clear"
          aria-label="Remove uploaded file"
          @click=${i}
        >
          ${ie.x}
        </button>
      </div>
    `:!n||!e.connected?w:c`
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
  `}function Vh(e){var C,D,L,R;const t=e.connected,n=e.sending||e.stream!==null,i=!!(e.canAbort&&e.onAbort),s=(D=(C=e.sessions)==null?void 0:C.sessions)==null?void 0:D.find(x=>x.key===e.sessionKey),o=(s==null?void 0:s.reasoningLevel)??"off",r=e.showThinking&&o!=="off",a={name:e.assistantName,avatar:e.assistantAvatar??e.assistantAvatarUrl??null},l=(((L=e.attachments)==null?void 0:L.length)??0)>0;(R=e.uploadedFile)!=null&&R.file_name;const d=e.connected?l?"Add a message or paste more images...":"Message (↩ to send, Shift+↩ for line breaks；可粘贴图片，或上传/拖拽 Excel/PDF)":"Connect to the gateway to start chatting…",f=e.splitRatio??.6,u=!!(e.sidebarOpen&&e.onCloseSidebar),g=c`
    <div
      class="chat-thread"
      role="log"
      aria-live="polite"
      @scroll=${e.onChatScroll}
    >
      ${e.loading?c`
              <div class="muted">Loading chat…</div>
            `:w}
      ${Xa(Jh(e),x=>x.key,x=>x.kind==="divider"?c`
              <div class="chat-divider" role="separator" data-ts=${String(x.timestamp)}>
                <span class="chat-divider__line"></span>
                <span class="chat-divider__label">${x.label}</span>
                <span class="chat-divider__line"></span>
              </div>
            `:x.kind==="reading-indicator"?Ih(a):x.kind==="stream"?Mh(x.text,x.startedAt,e.onOpenSidebar,a):x.kind==="group"?Ph(x,{onOpenSidebar:e.onOpenSidebar,showReasoning:r,assistantName:e.assistantName,assistantAvatar:a.avatar}):w)}
    </div>
  `,y=x=>{var m;x.preventDefault(),x.stopPropagation(),x.dataTransfer&&(x.dataTransfer.dropEffect="copy"),(m=e.onComposeDragOver)==null||m.call(e)},b=x=>{var m;x.preventDefault(),x.stopPropagation(),x.dataTransfer&&(x.dataTransfer.dropEffect="copy"),(m=e.onComposeDragOver)==null||m.call(e)},k=x=>{var I;const m=x.currentTarget,A=x.relatedTarget;A!=null&&(m.contains(A)||(I=e.onComposeDragLeave)==null||I.call(e))},S=x=>{var A,I,E;x.preventDefault(),x.stopPropagation(),(A=e.onComposeDragLeave)==null||A.call(e);const m=(E=(I=x.dataTransfer)==null?void 0:I.files)!=null&&E.length?jh(x.dataTransfer.files):null;m&&e.onComposeDrop&&e.onComposeDrop(m)};return c`
    <section
      class="card chat ${e.composeDragOver?"chat--drag-over":""}"
      @dragenter=${y}
      @dragover=${b}
      @dragleave=${k}
      @drop=${S}
    >
      ${e.disabledReason?c`<div class="callout">${e.disabledReason}</div>`:w}

      ${e.error?c`<div class="callout danger">${e.error}</div>`:w}

      ${e.focusMode?c`
            <button
              class="chat-focus-exit"
              type="button"
              @click=${e.onToggleFocusMode}
              aria-label="Exit focus mode"
              title="Exit focus mode"
            >
              ${ie.x}
            </button>
          `:w}

      <div
        class="chat-split-container ${u?"chat-split-container--open":""}"
      >
        <div
          class="chat-main"
          style="flex: ${u?`0 0 ${f*100}%`:"1 1 100%"}"
        >
          ${g}
        </div>

        ${u?c`
              <resizable-divider
                .splitRatio=${f}
                @resize=${x=>{var m;return(m=e.onSplitRatioChange)==null?void 0:m.call(e,x.detail.splitRatio)}}
              ></resizable-divider>
              <div class="chat-sidebar">
                ${Oh({content:e.sidebarContent??null,error:e.sidebarError??null,onClose:e.onCloseSidebar,onViewRawText:()=>{!e.sidebarContent||!e.onOpenSidebar||e.onOpenSidebar(`\`\`\`
${e.sidebarContent}
\`\`\``)}})}
              </div>
            `:w}
      </div>

      ${e.queue.length?c`
            <div class="chat-queue" role="status" aria-live="polite">
              <div class="chat-queue__title">Queued (${e.queue.length})</div>
              <div class="chat-queue__list">
                ${e.queue.map(x=>{var m;return c`
                    <div class="chat-queue__item">
                      <div class="chat-queue__text">
                        ${x.text||((m=x.attachments)!=null&&m.length?`Image (${x.attachments.length})`:"")}
                      </div>
                      <button
                        class="btn chat-queue__remove"
                        type="button"
                        aria-label="Remove queued message"
                        @click=${()=>e.onQueueRemove(x.id)}
                      >
                        ${ie.x}
                      </button>
                    </div>
                  `})}
              </div>
            </div>
          `:w}

      ${Hh(e.compactionStatus)}

      ${e.showNewMessages?c`
            <button
              class="btn chat-new-messages"
              type="button"
              @click=${e.onScrollToBottom}
            >
              New messages ${ie.arrowDown}
            </button>
          `:w}

      <div class="chat-compose ${e.composeDragOver?"chat-compose--drag-over":""}">
        ${e.composeDragOver?c`<div class="chat-compose__drop-hint">松开以上传 Excel/PDF</div>`:w}
        ${Gh(e)}
        ${Wh(e)}
        <div class="chat-compose__row">
          <label class="field chat-compose__field">
            <span>Message</span>
            <textarea
              ${zg(x=>x&&Rr(x))}
              .value=${e.draft}
              dir=${_l(e.draft)}
              ?disabled=${!e.connected}
              @keydown=${x=>{x.key==="Enter"&&(x.isComposing||x.keyCode===229||x.shiftKey||e.connected&&(x.preventDefault(),t&&e.onSend()))}}
              @input=${x=>{const m=x.target;Rr(m),e.onDraftChange(m.value)}}
              @paste=${x=>qh(x,e)}
              placeholder=${d}
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
  `}const Ir=200;function Qh(e){const t=[];let n=null;for(const i of e){if(i.kind!=="message"){n&&(t.push(n),n=null),t.push(i);continue}const s=Tl(i.message),o=Zs(s.role),r=s.timestamp||Date.now();!n||n.role!==o?(n&&t.push(n),n={kind:"group",key:`group:${o}:${i.key}`,role:o,messages:[{message:i.message,key:i.key}],timestamp:r,isStreaming:!1}):n.messages.push({message:i.message,key:i.key})}return n&&t.push(n),t}function Jh(e){const t=[],n=Array.isArray(e.messages)?e.messages:[],i=Array.isArray(e.toolMessages)?e.toolMessages:[],s=Math.max(0,n.length-Ir);s>0&&t.push({kind:"message",key:"chat:history:notice",message:{role:"system",content:`Showing last ${Ir} messages (${s} hidden).`,timestamp:Date.now()}});for(let o=s;o<n.length;o++){const r=n[o],a=Tl(r),d=r.__openclaw;if(d&&d.kind==="compaction"){t.push({kind:"divider",key:typeof d.id=="string"?`divider:compaction:${d.id}`:`divider:compaction:${a.timestamp}:${o}`,label:"Compaction",timestamp:a.timestamp??Date.now()});continue}!e.showThinking&&a.role.toLowerCase()==="toolresult"||t.push({kind:"message",key:Mr(r,o),message:r})}if(e.showThinking)for(let o=0;o<i.length;o++)t.push({kind:"message",key:Mr(i[o],o+n.length),message:i[o]});if(e.stream!==null){const o=`stream:${e.sessionKey}:${e.streamStartedAt??"live"}`;e.stream.trim().length>0?t.push({kind:"stream",key:o,text:e.stream,startedAt:e.streamStartedAt??Date.now()}):t.push({kind:"reading-indicator",key:o})}return Qh(t)}function Mr(e,t){const n=e,i=typeof n.toolCallId=="string"?n.toolCallId:"";if(i)return`tool:${i}`;const s=typeof n.id=="string"?n.id:"";if(s)return`msg:${s}`;const o=typeof n.messageId=="string"?n.messageId:"";if(o)return`msg:${o}`;const r=typeof n.timestamp=="number"?n.timestamp:null,a=typeof n.role=="string"?n.role:"unknown";return r!=null?`msg:${a}:${r}:${t}`:`msg:${a}:${t}`}const Yh=new Set(["title","description","default","nullable"]);function Xh(e){return Object.keys(e??{}).filter(n=>!Yh.has(n)).length===0}function Zh(e){if(e===void 0)return"";try{return JSON.stringify(e,null,2)??""}catch{return""}}const rn={chevronDown:c`
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
  `,plus:c`
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
  `,minus:c`
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
  `,trash:c`
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
  `,edit:c`
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
  `};function dt(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:r,onPatch:a}=e,l=e.showLabel??!0,d=ve(t),f=me(i,s),u=(f==null?void 0:f.label)??t.title??Oe(String(i.at(-1))),g=(f==null?void 0:f.help)??t.description,y=ys(i);if(o.has(y))return c`<div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${u}</div>
      <div class="cfg-field__error">Unsupported schema node. Use Raw mode.</div>
    </div>`;if(t.anyOf||t.oneOf){const k=(t.anyOf??t.oneOf??[]).filter(x=>!(x.type==="null"||Array.isArray(x.type)&&x.type.includes("null")));if(k.length===1)return dt({...e,schema:k[0]});const S=x=>{if(x.const!==void 0)return x.const;if(x.enum&&x.enum.length===1)return x.enum[0]},C=k.map(S),D=C.every(x=>x!==void 0);if(D&&C.length>0&&C.length<=5){const x=n??t.default;return c`
        <div class="cfg-field">
          ${l?c`<label class="cfg-field__label">${u}</label>`:w}
          ${g?c`<div class="cfg-field__help">${g}</div>`:w}
          <div class="cfg-segmented">
            ${C.map(m=>c`
              <button
                type="button"
                class="cfg-segmented__btn ${m===x||String(m)===String(x)?"active":""}"
                ?disabled=${r}
                @click=${()=>a(i,m)}
              >
                ${String(m)}
              </button>
            `)}
          </div>
        </div>
      `}if(D&&C.length>5)return Fr({...e,options:C,value:n??t.default});const L=new Set(k.map(x=>ve(x)).filter(Boolean)),R=new Set([...L].map(x=>x==="integer"?"number":x));if([...R].every(x=>["string","number","boolean"].includes(x))){const x=R.has("string"),m=R.has("number");if(R.has("boolean")&&R.size===1)return dt({...e,schema:{...t,type:"boolean",anyOf:void 0,oneOf:void 0}});if(x||m)return Pr({...e,inputType:m&&!x?"number":"text"})}}if(t.enum){const b=t.enum;if(b.length<=5){const k=n??t.default;return c`
        <div class="cfg-field">
          ${l?c`<label class="cfg-field__label">${u}</label>`:w}
          ${g?c`<div class="cfg-field__help">${g}</div>`:w}
          <div class="cfg-segmented">
            ${b.map(S=>c`
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
      `}return Fr({...e,options:b,value:n??t.default})}if(d==="object")return tv(e);if(d==="array")return nv(e);if(d==="boolean"){const b=typeof n=="boolean"?n:typeof t.default=="boolean"?t.default:!1;return c`
      <label class="cfg-toggle-row ${r?"disabled":""}">
        <div class="cfg-toggle-row__content">
          <span class="cfg-toggle-row__label">${u}</span>
          ${g?c`<span class="cfg-toggle-row__help">${g}</span>`:w}
        </div>
        <div class="cfg-toggle">
          <input
            type="checkbox"
            .checked=${b}
            ?disabled=${r}
            @change=${k=>a(i,k.target.checked)}
          />
          <span class="cfg-toggle__track"></span>
        </div>
      </label>
    `}return d==="number"||d==="integer"?ev(e):d==="string"?Pr({...e,inputType:"text"}):c`
    <div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${u}</div>
      <div class="cfg-field__error">Unsupported type: ${d}. Use Raw mode.</div>
    </div>
  `}function Pr(e){const{schema:t,value:n,path:i,hints:s,disabled:o,onPatch:r,inputType:a}=e,l=e.showLabel??!0,d=me(i,s),f=(d==null?void 0:d.label)??t.title??Oe(String(i.at(-1))),u=(d==null?void 0:d.help)??t.description,g=((d==null?void 0:d.sensitive)??!1)&&!/^\$\{[^}]*\}$/.test(String(n??"").trim()),y=(d==null?void 0:d.placeholder)??(g?"••••":t.default!==void 0?`Default: ${String(t.default)}`:""),b=n??"";return c`
    <div class="cfg-field">
      ${l?c`<label class="cfg-field__label">${f}</label>`:w}
      ${u?c`<div class="cfg-field__help">${u}</div>`:w}
      <div class="cfg-input-wrap">
        <input
          type=${g?"password":a}
          class="cfg-input"
          placeholder=${y}
          .value=${b==null?"":String(b)}
          ?disabled=${o}
          @input=${k=>{const S=k.target.value;if(a==="number"){if(S.trim()===""){r(i,void 0);return}const C=Number(S);r(i,Number.isNaN(C)?S:C);return}r(i,S)}}
          @change=${k=>{if(a==="number")return;const S=k.target.value;r(i,S.trim())}}
        />
        ${t.default!==void 0?c`
          <button
            type="button"
            class="cfg-input__reset"
            title="Reset to default"
            ?disabled=${o}
            @click=${()=>r(i,t.default)}
          >↺</button>
        `:w}
      </div>
    </div>
  `}function ev(e){const{schema:t,value:n,path:i,hints:s,disabled:o,onPatch:r}=e,a=e.showLabel??!0,l=me(i,s),d=(l==null?void 0:l.label)??t.title??Oe(String(i.at(-1))),f=(l==null?void 0:l.help)??t.description,u=n??t.default??"",g=typeof u=="number"?u:0;return c`
    <div class="cfg-field">
      ${a?c`<label class="cfg-field__label">${d}</label>`:w}
      ${f?c`<div class="cfg-field__help">${f}</div>`:w}
      <div class="cfg-number">
        <button
          type="button"
          class="cfg-number__btn"
          ?disabled=${o}
          @click=${()=>r(i,g-1)}
        >−</button>
        <input
          type="number"
          class="cfg-number__input"
          .value=${u==null?"":String(u)}
          ?disabled=${o}
          @input=${y=>{const b=y.target.value,k=b===""?void 0:Number(b);r(i,k)}}
        />
        <button
          type="button"
          class="cfg-number__btn"
          ?disabled=${o}
          @click=${()=>r(i,g+1)}
        >+</button>
      </div>
    </div>
  `}function Fr(e){const{schema:t,value:n,path:i,hints:s,disabled:o,options:r,onPatch:a}=e,l=e.showLabel??!0,d=me(i,s),f=(d==null?void 0:d.label)??t.title??Oe(String(i.at(-1))),u=(d==null?void 0:d.help)??t.description,g=n??t.default,y=r.findIndex(k=>k===g||String(k)===String(g)),b="__unset__";return c`
    <div class="cfg-field">
      ${l?c`<label class="cfg-field__label">${f}</label>`:w}
      ${u?c`<div class="cfg-field__help">${u}</div>`:w}
      <select
        class="cfg-select"
        ?disabled=${o}
        .value=${y>=0?String(y):b}
        @change=${k=>{const S=k.target.value;a(i,S===b?void 0:r[Number(S)])}}
      >
        <option value=${b}>Select...</option>
        ${r.map((k,S)=>c`
          <option value=${String(S)}>${String(k)}</option>
        `)}
      </select>
    </div>
  `}function tv(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:r,onPatch:a}=e,l=me(i,s),d=(l==null?void 0:l.label)??t.title??Oe(String(i.at(-1))),f=(l==null?void 0:l.help)??t.description,u=n??t.default,g=u&&typeof u=="object"&&!Array.isArray(u)?u:{},y=t.properties??{},k=Object.entries(y).toSorted((R,x)=>{var I,E;const m=((I=me([...i,R[0]],s))==null?void 0:I.order)??0,A=((E=me([...i,x[0]],s))==null?void 0:E.order)??0;return m!==A?m-A:R[0].localeCompare(x[0])}),S=new Set(Object.keys(y)),C=t.additionalProperties,D=!!C&&typeof C=="object",L=c`
    ${k.map(([R,x])=>dt({schema:x,value:g[R],path:[...i,R],hints:s,unsupported:o,disabled:r,onPatch:a}))}
    ${D?iv({schema:C,value:g,path:i,hints:s,unsupported:o,disabled:r,reservedKeys:S,onPatch:a}):w}
  `;return i.length===1?c`
      <div class="cfg-fields">
        ${L}
      </div>
    `:c`
    <details class="cfg-object" open>
      <summary class="cfg-object__header">
        <span class="cfg-object__title">${d}</span>
        <span class="cfg-object__chevron">${rn.chevronDown}</span>
      </summary>
      ${f?c`<div class="cfg-object__help">${f}</div>`:w}
      <div class="cfg-object__content">
        ${L}
      </div>
    </details>
  `}function nv(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:r,onPatch:a}=e,l=e.showLabel??!0,d=me(i,s),f=(d==null?void 0:d.label)??t.title??Oe(String(i.at(-1))),u=(d==null?void 0:d.help)??t.description,g=Array.isArray(t.items)?t.items[0]:t.items;if(!g)return c`
      <div class="cfg-field cfg-field--error">
        <div class="cfg-field__label">${f}</div>
        <div class="cfg-field__error">Unsupported array schema. Use Raw mode.</div>
      </div>
    `;const y=Array.isArray(n)?n:Array.isArray(t.default)?t.default:[];return c`
    <div class="cfg-array">
      <div class="cfg-array__header">
        ${l?c`<span class="cfg-array__label">${f}</span>`:w}
        <span class="cfg-array__count">${y.length} item${y.length!==1?"s":""}</span>
        <button
          type="button"
          class="cfg-array__add"
          ?disabled=${r}
          @click=${()=>{const b=[...y,ea(g)];a(i,b)}}
        >
          <span class="cfg-array__add-icon">${rn.plus}</span>
          Add
        </button>
      </div>
      ${u?c`<div class="cfg-array__help">${u}</div>`:w}

      ${y.length===0?c`
              <div class="cfg-array__empty">No items yet. Click "Add" to create one.</div>
            `:c`
        <div class="cfg-array__items">
          ${y.map((b,k)=>c`
            <div class="cfg-array__item">
              <div class="cfg-array__item-header">
                <span class="cfg-array__item-index">#${k+1}</span>
                <button
                  type="button"
                  class="cfg-array__item-remove"
                  title="Remove item"
                  ?disabled=${r}
                  @click=${()=>{const S=[...y];S.splice(k,1),a(i,S)}}
                >
                  ${rn.trash}
                </button>
              </div>
              <div class="cfg-array__item-content">
                ${dt({schema:g,value:b,path:[...i,k],hints:s,unsupported:o,disabled:r,showLabel:!1,onPatch:a})}
              </div>
            </div>
          `)}
        </div>
      `}
    </div>
  `}function iv(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:r,reservedKeys:a,onPatch:l}=e,d=Xh(t),f=Object.entries(n??{}).filter(([u])=>!a.has(u));return c`
    <div class="cfg-map">
      <div class="cfg-map__header">
        <span class="cfg-map__label">Custom entries</span>
        <button
          type="button"
          class="cfg-map__add"
          ?disabled=${r}
          @click=${()=>{const u={...n};let g=1,y=`custom-${g}`;for(;y in u;)g+=1,y=`custom-${g}`;u[y]=d?{}:ea(t),l(i,u)}}
        >
          <span class="cfg-map__add-icon">${rn.plus}</span>
          Add Entry
        </button>
      </div>

      ${f.length===0?c`
              <div class="cfg-map__empty">No custom entries.</div>
            `:c`
        <div class="cfg-map__items">
          ${f.map(([u,g])=>{const y=[...i,u],b=Zh(g);return c`
              <div class="cfg-map__item">
                <div class="cfg-map__item-key">
                  <input
                    type="text"
                    class="cfg-input cfg-input--sm"
                    placeholder="Key"
                    .value=${u}
                    ?disabled=${r}
                    @change=${k=>{const S=k.target.value.trim();if(!S||S===u)return;const C={...n};S in C||(C[S]=C[u],delete C[u],l(i,C))}}
                  />
                </div>
                <div class="cfg-map__item-value">
                  ${d?c`
                        <textarea
                          class="cfg-textarea cfg-textarea--sm"
                          placeholder="JSON value"
                          rows="2"
                          .value=${b}
                          ?disabled=${r}
                          @change=${k=>{const S=k.target,C=S.value.trim();if(!C){l(y,void 0);return}try{l(y,JSON.parse(C))}catch{S.value=b}}}
                        ></textarea>
                      `:dt({schema:t,value:g,path:y,hints:s,unsupported:o,disabled:r,showLabel:!1,onPatch:l})}
                </div>
                <button
                  type="button"
                  class="cfg-map__item-remove"
                  title="Remove entry"
                  ?disabled=${r}
                  @click=${()=>{const k={...n};delete k[u],l(i,k)}}
                >
                  ${rn.trash}
                </button>
              </div>
            `})}
        </div>
      `}
    </div>
  `}const Dr={env:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="3"></circle>
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
      ></path>
    </svg>
  `,update:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  `,agents:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path
        d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"
      ></path>
      <circle cx="8" cy="14" r="1"></circle>
      <circle cx="16" cy="14" r="1"></circle>
    </svg>
  `,auth:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  `,channels:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  `,messages:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  `,commands:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
  `,hooks:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
  `,skills:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      ></polygon>
    </svg>
  `,tools:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      ></path>
    </svg>
  `,gateway:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      ></path>
    </svg>
  `,wizard:c`
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
  `,meta:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
    </svg>
  `,logging:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  `,browser:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="4"></circle>
      <line x1="21.17" y1="8" x2="12" y2="8"></line>
      <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
      <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
    </svg>
  `,ui:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>
  `,models:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path
        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
      ></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  `,bindings:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
      <line x1="6" y1="6" x2="6.01" y2="6"></line>
      <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
  `,broadcast:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path>
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path>
      <circle cx="12" cy="12" r="2"></circle>
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path>
      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path>
    </svg>
  `,audio:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M9 18V5l12-2v13"></path>
      <circle cx="6" cy="18" r="3"></circle>
      <circle cx="18" cy="16" r="3"></circle>
    </svg>
  `,session:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  `,cron:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  `,web:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      ></path>
    </svg>
  `,discovery:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  `,canvasHost:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  `,talk:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line x1="12" y1="19" x2="12" y2="23"></line>
      <line x1="8" y1="23" x2="16" y2="23"></line>
    </svg>
  `,plugins:c`
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
  `,default:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
    </svg>
  `},to={env:{label:"Environment Variables",description:"Environment variables passed to the gateway process"},update:{label:"Updates",description:"Auto-update settings and release channel"},agents:{label:"Agents",description:"Agent configurations, models, and identities"},auth:{label:"Authentication",description:"API keys and authentication profiles"},channels:{label:"Channels",description:"Messaging channels (Telegram, Discord, Slack, etc.)"},messages:{label:"Messages",description:"Message handling and routing settings"},commands:{label:"Commands",description:"Custom slash commands"},hooks:{label:"Hooks",description:"Webhooks and event hooks"},skills:{label:"Skills",description:"Skill packs and capabilities"},tools:{label:"Tools",description:"Tool configurations (browser, search, etc.)"},gateway:{label:"Gateway",description:"Gateway server settings (port, auth, binding)"},wizard:{label:"Setup Wizard",description:"Setup wizard state and history"},meta:{label:"Metadata",description:"Gateway metadata and version information"},logging:{label:"Logging",description:"Log levels and output configuration"},browser:{label:"Browser",description:"Browser automation settings"},ui:{label:"UI",description:"User interface preferences"},models:{label:"Models",description:"AI model configurations and providers"},bindings:{label:"Bindings",description:"Key bindings and shortcuts"},broadcast:{label:"Broadcast",description:"Broadcast and notification settings"},audio:{label:"Audio",description:"Audio input/output settings"},session:{label:"Session",description:"Session management and persistence"},cron:{label:"Cron",description:"Scheduled tasks and automation"},web:{label:"Web",description:"Web server and API settings"},discovery:{label:"Discovery",description:"Service discovery and networking"},canvasHost:{label:"Canvas Host",description:"Canvas rendering and display"},talk:{label:"Talk",description:"Voice and speech settings"},plugins:{label:"Plugins",description:"Plugin management and extensions"}};function Or(e){return Dr[e]??Dr.default}function sv(e,t,n){if(!n)return!0;const i=n.toLowerCase(),s=to[e];return e.toLowerCase().includes(i)||s&&(s.label.toLowerCase().includes(i)||s.description.toLowerCase().includes(i))?!0:Kt(t,i)}function Kt(e,t){var i,s,o;if((i=e.title)!=null&&i.toLowerCase().includes(t)||(s=e.description)!=null&&s.toLowerCase().includes(t)||(o=e.enum)!=null&&o.some(r=>String(r).toLowerCase().includes(t)))return!0;if(e.properties){for(const[r,a]of Object.entries(e.properties))if(r.toLowerCase().includes(t)||Kt(a,t))return!0}if(e.items){const r=Array.isArray(e.items)?e.items:[e.items];for(const a of r)if(a&&Kt(a,t))return!0}if(e.additionalProperties&&typeof e.additionalProperties=="object"&&Kt(e.additionalProperties,t))return!0;const n=e.anyOf??e.oneOf??e.allOf;if(n){for(const r of n)if(r&&Kt(r,t))return!0}return!1}function ov(e){var u;if(!e.schema)return c`
      <div class="muted">Schema unavailable.</div>
    `;const t=e.schema,n=e.value??{};if(ve(t)!=="object"||!t.properties)return c`
      <div class="callout danger">Unsupported schema. Use Raw.</div>
    `;const i=new Set(e.unsupportedPaths??[]),s=t.properties,o=e.searchQuery??"",r=e.activeSection,a=e.activeSubsection??null,d=Object.entries(s).toSorted((g,y)=>{var S,C;const b=((S=me([g[0]],e.uiHints))==null?void 0:S.order)??50,k=((C=me([y[0]],e.uiHints))==null?void 0:C.order)??50;return b!==k?b-k:g[0].localeCompare(y[0])}).filter(([g,y])=>!(r&&g!==r||o&&!sv(g,y,o)));let f=null;if(r&&a&&d.length===1){const g=(u=d[0])==null?void 0:u[1];g&&ve(g)==="object"&&g.properties&&g.properties[a]&&(f={sectionKey:r,subsectionKey:a,schema:g.properties[a]})}return d.length===0?c`
      <div class="config-empty">
        <div class="config-empty__icon">${ie.search}</div>
        <div class="config-empty__text">
          ${o?`No settings match "${o}"`:"No settings in this section"}
        </div>
      </div>
    `:c`
    <div class="config-form config-form--modern">
      ${f?(()=>{const{sectionKey:g,subsectionKey:y,schema:b}=f,k=me([g,y],e.uiHints),S=(k==null?void 0:k.label)??b.title??Oe(y),C=(k==null?void 0:k.help)??b.description??"",D=n[g],L=D&&typeof D=="object"?D[y]:void 0,R=`config-section-${g}-${y}`;return c`
              <section class="config-section-card" id=${R}>
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${Or(g)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${S}</h3>
                    ${C?c`<p class="config-section-card__desc">${C}</p>`:w}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${dt({schema:b,value:L,path:[g,y],hints:e.uiHints,unsupported:i,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})():d.map(([g,y])=>{const b=to[g]??{label:g.charAt(0).toUpperCase()+g.slice(1),description:y.description??""};return c`
              <section class="config-section-card" id="config-section-${g}">
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${Or(g)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${b.label}</h3>
                    ${b.description?c`<p class="config-section-card__desc">${b.description}</p>`:w}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${dt({schema:y,value:n[g],path:[g],hints:e.uiHints,unsupported:i,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})}
    </div>
  `}const rv=new Set(["title","description","default","nullable"]);function av(e){return Object.keys(e??{}).filter(n=>!rv.has(n)).length===0}function Il(e){const t=e.filter(s=>s!=null),n=t.length!==e.length,i=[];for(const s of t)i.some(o=>Object.is(o,s))||i.push(s);return{enumValues:i,nullable:n}}function lv(e){return!e||typeof e!="object"?{schema:null,unsupportedPaths:["<root>"]}:Jt(e,[])}function Jt(e,t){const n=new Set,i={...e},s=ys(t)||"<root>";if(e.anyOf||e.oneOf||e.allOf){const a=cv(e,t);return a||{schema:e,unsupportedPaths:[s]}}const o=Array.isArray(e.type)&&e.type.includes("null"),r=ve(e)??(e.properties||e.additionalProperties?"object":void 0);if(i.type=r??e.type,i.nullable=o||e.nullable,i.enum){const{enumValues:a,nullable:l}=Il(i.enum);i.enum=a,l&&(i.nullable=!0),a.length===0&&n.add(s)}if(r==="object"){const a=e.properties??{},l={};for(const[d,f]of Object.entries(a)){const u=Jt(f,[...t,d]);u.schema&&(l[d]=u.schema);for(const g of u.unsupportedPaths)n.add(g)}if(i.properties=l,e.additionalProperties===!0)n.add(s);else if(e.additionalProperties===!1)i.additionalProperties=!1;else if(e.additionalProperties&&typeof e.additionalProperties=="object"&&!av(e.additionalProperties)){const d=Jt(e.additionalProperties,[...t,"*"]);i.additionalProperties=d.schema??e.additionalProperties,d.unsupportedPaths.length>0&&n.add(s)}}else if(r==="array"){const a=Array.isArray(e.items)?e.items[0]:e.items;if(!a)n.add(s);else{const l=Jt(a,[...t,"*"]);i.items=l.schema??a,l.unsupportedPaths.length>0&&n.add(s)}}else r!=="string"&&r!=="number"&&r!=="integer"&&r!=="boolean"&&!i.enum&&n.add(s);return{schema:i,unsupportedPaths:Array.from(n)}}function cv(e,t){if(e.allOf)return null;const n=e.anyOf??e.oneOf;if(!n)return null;const i=[],s=[];let o=!1;for(const a of n){if(!a||typeof a!="object")return null;if(Array.isArray(a.enum)){const{enumValues:l,nullable:d}=Il(a.enum);i.push(...l),d&&(o=!0);continue}if("const"in a){if(a.const==null){o=!0;continue}i.push(a.const);continue}if(ve(a)==="null"){o=!0;continue}s.push(a)}if(i.length>0&&s.length===0){const a=[];for(const l of i)a.some(d=>Object.is(d,l))||a.push(l);return{schema:{...e,enum:a,nullable:o,anyOf:void 0,oneOf:void 0,allOf:void 0},unsupportedPaths:[]}}if(s.length===1){const a=Jt(s[0],t);return a.schema&&(a.schema.nullable=o||a.schema.nullable),a}const r=new Set(["string","number","integer","boolean"]);return s.length>0&&i.length===0&&s.every(a=>a.type&&r.has(String(a.type)))?{schema:{...e,nullable:o},unsupportedPaths:[]}:null}const fs={all:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
  `,env:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="3"></circle>
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
      ></path>
    </svg>
  `,update:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  `,agents:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path
        d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"
      ></path>
      <circle cx="8" cy="14" r="1"></circle>
      <circle cx="16" cy="14" r="1"></circle>
    </svg>
  `,auth:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  `,channels:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  `,messages:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  `,commands:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
  `,hooks:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
  `,skills:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      ></polygon>
    </svg>
  `,tools:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      ></path>
    </svg>
  `,gateway:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      ></path>
    </svg>
  `,wizard:c`
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
  `,meta:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
    </svg>
  `,logging:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  `,browser:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="4"></circle>
      <line x1="21.17" y1="8" x2="12" y2="8"></line>
      <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
      <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
    </svg>
  `,ui:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>
  `,models:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path
        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
      ></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  `,bindings:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
      <line x1="6" y1="6" x2="6.01" y2="6"></line>
      <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
  `,broadcast:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path>
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path>
      <circle cx="12" cy="12" r="2"></circle>
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path>
      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path>
    </svg>
  `,audio:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M9 18V5l12-2v13"></path>
      <circle cx="6" cy="18" r="3"></circle>
      <circle cx="18" cy="16" r="3"></circle>
    </svg>
  `,session:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  `,cron:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  `,web:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      ></path>
    </svg>
  `,discovery:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  `,canvasHost:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  `,talk:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line x1="12" y1="19" x2="12" y2="23"></line>
      <line x1="8" y1="23" x2="16" y2="23"></line>
    </svg>
  `,plugins:c`
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
  `,default:c`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
    </svg>
  `},Nr=[{key:"env",label:"Environment"},{key:"update",label:"Updates"},{key:"agents",label:"Agents"},{key:"auth",label:"Authentication"},{key:"channels",label:"Channels"},{key:"messages",label:"Messages"},{key:"commands",label:"Commands"},{key:"hooks",label:"Hooks"},{key:"skills",label:"Skills"},{key:"tools",label:"Tools"},{key:"gateway",label:"Gateway"},{key:"wizard",label:"Setup Wizard"}],Br="__all__";function Ur(e){return fs[e]??fs.default}function dv(e,t){const n=to[e];return n||{label:(t==null?void 0:t.title)??Oe(e),description:(t==null?void 0:t.description)??""}}function uv(e){const{key:t,schema:n,uiHints:i}=e;if(!n||ve(n)!=="object"||!n.properties)return[];const s=Object.entries(n.properties).map(([o,r])=>{const a=me([t,o],i),l=(a==null?void 0:a.label)??r.title??Oe(o),d=(a==null?void 0:a.help)??r.description??"",f=(a==null?void 0:a.order)??50;return{key:o,label:l,description:d,order:f}});return s.sort((o,r)=>o.order!==r.order?o.order-r.order:o.key.localeCompare(r.key)),s}function fv(e,t){if(!e||!t)return[];const n=[];function i(s,o,r){if(s===o)return;if(typeof s!=typeof o){n.push({path:r,from:s,to:o});return}if(typeof s!="object"||s===null||o===null){s!==o&&n.push({path:r,from:s,to:o});return}if(Array.isArray(s)&&Array.isArray(o)){JSON.stringify(s)!==JSON.stringify(o)&&n.push({path:r,from:s,to:o});return}const a=s,l=o,d=new Set([...Object.keys(a),...Object.keys(l)]);for(const f of d)i(a[f],l[f],r?`${r}.${f}`:f)}return i(e,t,""),n}function zr(e,t=40){let n;try{n=JSON.stringify(e)??String(e)}catch{n=String(e)}return n.length<=t?n:n.slice(0,t-3)+"..."}function gv(e){var m,A,I;const t=e.valid==null?"unknown":e.valid?"valid":"invalid",n=lv(e.schema),i=n.schema?n.unsupportedPaths.length>0:!1,s=((m=n.schema)==null?void 0:m.properties)??{},o=Nr.filter(E=>E.key in s),r=new Set(Nr.map(E=>E.key)),a=Object.keys(s).filter(E=>!r.has(E)).map(E=>({key:E,label:E.charAt(0).toUpperCase()+E.slice(1)})),l=[...o,...a],d=e.activeSection&&n.schema&&ve(n.schema)==="object"?(A=n.schema.properties)==null?void 0:A[e.activeSection]:void 0,f=e.activeSection?dv(e.activeSection,d):null,u=e.activeSection?uv({key:e.activeSection,schema:d,uiHints:e.uiHints}):[],g=e.formMode==="form"&&!!e.activeSection&&u.length>0,y=e.activeSubsection===Br,b=e.searchQuery||y?null:e.activeSubsection??((I=u[0])==null?void 0:I.key)??null,k=e.formMode==="form"?fv(e.originalValue,e.formValue):[],S=e.formMode==="raw"&&e.raw!==e.originalRaw,C=e.formMode==="form"?k.length>0:S,D=!!e.formValue&&!e.loading&&!!n.schema,L=e.connected&&!e.saving&&C&&(e.formMode==="raw"?!0:D),R=e.connected&&!e.applying&&!e.updating&&C&&(e.formMode==="raw"?!0:D),x=e.connected&&!e.applying&&!e.updating;return c`
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
            @input=${E=>e.onSearchChange(E.target.value)}
          />
          ${e.searchQuery?c`
                <button
                  class="config-search__clear"
                  @click=${()=>e.onSearchChange("")}
                >
                  ×
                </button>
              `:w}
        </div>

        <!-- Section nav -->
        <nav class="config-nav">
          <button
            class="config-nav__item ${e.activeSection===null?"active":""}"
            @click=${()=>e.onSectionChange(null)}
          >
            <span class="config-nav__icon">${fs.all}</span>
            <span class="config-nav__label">All Settings</span>
          </button>
          ${l.map(E=>c`
              <button
                class="config-nav__item ${e.activeSection===E.key?"active":""}"
                @click=${()=>e.onSectionChange(E.key)}
              >
                <span class="config-nav__icon"
                  >${Ur(E.key)}</span
                >
                <span class="config-nav__label">${E.label}</span>
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
            ${C?c`
                  <span class="config-changes-badge"
                    >${e.formMode==="raw"?"Unsaved changes":`${k.length} unsaved change${k.length!==1?"s":""}`}</span
                  >
                `:c`
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
              ?disabled=${!R}
              @click=${e.onApply}
            >
              ${e.applying?"Applying…":"Apply"}
            </button>
            <button
              class="btn btn--sm"
              ?disabled=${!x}
              @click=${e.onUpdate}
            >
              ${e.updating?"Updating…":"Update"}
            </button>
          </div>
        </div>

        <!-- Diff panel (form mode only - raw mode doesn't have granular diff) -->
        ${C&&e.formMode==="form"?c`
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
                  ${k.map(E=>c`
                      <div class="config-diff__item">
                        <div class="config-diff__path">${E.path}</div>
                        <div class="config-diff__values">
                          <span class="config-diff__from"
                            >${zr(E.from)}</span
                          >
                          <span class="config-diff__arrow">→</span>
                          <span class="config-diff__to"
                            >${zr(E.to)}</span
                          >
                        </div>
                      </div>
                    `)}
                </div>
              </details>
            `:w}
        ${f&&e.formMode==="form"?c`
              <div class="config-section-hero">
                <div class="config-section-hero__icon">
                  ${Ur(e.activeSection??"")}
                </div>
                <div class="config-section-hero__text">
                  <div class="config-section-hero__title">
                    ${f.label}
                  </div>
                  ${f.description?c`<div class="config-section-hero__desc">
                        ${f.description}
                      </div>`:w}
                </div>
              </div>
            `:w}
        ${g?c`
              <div class="config-subnav">
                <button
                  class="config-subnav__item ${b===null?"active":""}"
                  @click=${()=>e.onSubsectionChange(Br)}
                >
                  All
                </button>
                ${u.map(E=>c`
                    <button
                      class="config-subnav__item ${b===E.key?"active":""}"
                      title=${E.description||E.label}
                      @click=${()=>e.onSubsectionChange(E.key)}
                    >
                      ${E.label}
                    </button>
                  `)}
              </div>
            `:w}

        <!-- Form content -->
        <div class="config-content">
          ${e.formMode==="form"?c`
                ${e.schemaLoading?c`
                        <div class="config-loading">
                          <div class="config-loading__spinner"></div>
                          <span>Loading schema…</span>
                        </div>
                      `:ov({schema:n.schema,uiHints:e.uiHints,value:e.formValue,disabled:e.loading||!e.formValue,unsupportedPaths:n.unsupportedPaths,onPatch:e.onFormPatch,searchQuery:e.searchQuery,activeSection:e.activeSection,activeSubsection:b})}
                ${i?c`
                        <div class="callout danger" style="margin-top: 12px">
                          Form view can't safely edit some fields. Use Raw to avoid losing config entries.
                        </div>
                      `:w}
              `:c`
                <label class="field config-raw-field">
                  <span>Raw JSON5</span>
                  <textarea
                    .value=${e.raw}
                    @input=${E=>e.onRawChange(E.target.value)}
                  ></textarea>
                </label>
              `}
        </div>

        ${e.issues.length>0?c`<div class="callout danger" style="margin-top: 12px;">
              <pre class="code-block">
${JSON.stringify(e.issues,null,2)}</pre
              >
            </div>`:w}
      </main>
    </div>
  `}function pv(e){if(!e)return"—";try{return new Date(e).toLocaleString("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"})}catch{return e??"—"}}function hv(e){const{loading:t,error:n,drafts:i,detail:s,detailId:o,confirmBusy:r,confirmResult:a,onRefresh:l,onSelectDraft:d,onConfirm:f,onClearDetail:u}=e;return c`
    <section class="grid grid-cols-2">
      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">待确认报价单</div>
        <div class="card-sub">从云端拉取已落库的待确认报价单，确认成单后转订单与锁库。</div>
        <div style="margin-top: 12px;">
          <button class="btn" ?disabled=${t} @click=${l}>
            ${t?"加载中…":"刷新列表"}
          </button>
          ${n?c`<span class="muted" style="margin-left: 8px;">${n}</span>`:w}
        </div>
      </div>

      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">列表</div>
        <div class="card-sub">点击一行查看明细，再点击「确认成单」完成闭环。</div>
        ${t&&i.length===0?c`<p class="muted" style="margin-top: 12px;">加载中…</p>`:i.length===0?c`<p class="muted" style="margin-top: 12px;">暂无待确认报价单。</p>`:c`
                <div style="overflow-x: auto; margin-top: 12px;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <thead>
                      <tr style="background: var(--bg-secondary, #eee);">
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">编号</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">名称</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">来源</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">创建时间</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${i.map(g=>c`
                          <tr
                            style="cursor: pointer; ${o===g.id?"background: var(--bg-secondary, #f5f5f5);":""}"
                            @click=${()=>d(g.id)}
                          >
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${g.draft_no}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${g.name}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${g.source??"—"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${pv(g.created_at)}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">
                              <button
                                class="btn"
                                style="font-size: 12px; padding: 4px 8px;"
                                ?disabled=${r}
                                @click=${y=>{y.stopPropagation(),f(g.id)}}
                              >
                                ${r&&o===g.id?"确认中…":"确认成单"}
                              </button>
                            </td>
                          </tr>
                        `)}
                    </tbody>
                  </table>
                </div>
              `}
      </div>

      ${s?c`
            <div class="card" style="grid-column: 1 / -1;">
              <div class="card-title">报价单明细 · ${s.draft_no}</div>
              <div class="card-sub">${s.name}</div>
              <div style="margin-top: 8px;">
                <button class="btn" style="font-size: 12px;" @click=${u}>关闭明细</button>
              </div>
              <div style="overflow-x: auto; margin-top: 12px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                  <thead>
                    <tr style="background: var(--bg-secondary, #eee);">
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">序号</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">产品名称</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">规格</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">数量</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">物料编号</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">报价名称</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">单价</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">金额</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">可用库存</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">缺口</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">缺货</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${(s.lines??[]).map((g,y)=>c`
                        <tr>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${y+1}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${g.product_name??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${g.specification??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${g.qty??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${g.code??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${g.quote_name??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${g.unit_price??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${g.amount??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${g.available_qty??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${g.shortfall??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${g.is_shortage?"是":"否"}</td>
                        </tr>
                      `)}
                  </tbody>
                </table>
              </div>
              <div style="margin-top: 12px;">
                <button
                  class="btn"
                  style="background: var(--accent); color: var(--bg);"
                  ?disabled=${r}
                  @click=${()=>f(s.id)}
                >
                  ${r?"确认中…":"确认成单"}
                </button>
              </div>
            </div>
          `:w}

      ${a?c`
            <div class="card" style="grid-column: 1 / -1;">
              <div class="card-sub">${a.order_id?`订单号：${a.order_id}`:""} ${a.message??""}</div>
            </div>
          `:w}
    </section>
  `}function vv(e){const t=e.status&&typeof e.status=="object"?e.status.securityAudit:null,n=(t==null?void 0:t.summary)??null,i=(n==null?void 0:n.critical)??0,s=(n==null?void 0:n.warn)??0,o=(n==null?void 0:n.info)??0,r=i>0?"danger":s>0?"warn":"success",a=i>0?`${i} critical`:s>0?`${s} warnings`:"No critical issues";return c`
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
            ${n?c`<div class="callout ${r}" style="margin-top: 8px;">
                  Security audit: ${a}${o>0?` · ${o} info`:""}. Run
                  <span class="mono">openclaw security audit --deep</span> for details.
                </div>`:w}
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
        ${e.callError?c`<div class="callout danger" style="margin-top: 12px;">
              ${e.callError}
            </div>`:w}
        ${e.callResult?c`<pre class="code-block" style="margin-top: 12px;">${e.callResult}</pre>`:w}
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
      ${e.eventLog.length===0?c`
              <div class="muted" style="margin-top: 12px">No events yet.</div>
            `:c`
            <div class="list" style="margin-top: 12px;">
              ${e.eventLog.map(l=>c`
                  <div class="list-item">
                    <div class="list-main">
                      <div class="list-title">${l.event}</div>
                      <div class="list-sub">${new Date(l.ts).toLocaleTimeString()}</div>
                    </div>
                    <div class="list-meta">
                      <pre class="code-block">${ng(l.payload)}</pre>
                    </div>
                  </div>
                `)}
            </div>
          `}
    </section>
  `}function mv(e){const t=Math.max(0,e),n=Math.floor(t/1e3);if(n<60)return`${n}s`;const i=Math.floor(n/60);return i<60?`${i}m`:`${Math.floor(i/60)}h`}function Xe(e,t){return t?c`<div class="exec-approval-meta-row"><span>${e}</span><span>${t}</span></div>`:w}function yv(e){const t=e.execApprovalQueue[0];if(!t)return w;const n=t.request,i=t.expiresAtMs-Date.now(),s=i>0?`expires in ${mv(i)}`:"expired",o=e.execApprovalQueue.length;return c`
    <div class="exec-approval-overlay" role="dialog" aria-live="polite">
      <div class="exec-approval-card">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">Exec approval needed</div>
            <div class="exec-approval-sub">${s}</div>
          </div>
          ${o>1?c`<div class="exec-approval-queue">${o} pending</div>`:w}
        </div>
        <div class="exec-approval-command mono">${n.command}</div>
        <div class="exec-approval-meta">
          ${Xe("Host",n.host)}
          ${Xe("Agent",n.agentId)}
          ${Xe("Session",n.sessionKey)}
          ${Xe("CWD",n.cwd)}
          ${Xe("Resolved",n.resolvedPath)}
          ${Xe("Security",n.security)}
          ${Xe("Ask",n.ask)}
        </div>
        ${e.execApprovalError?c`<div class="exec-approval-error">${e.execApprovalError}</div>`:w}
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
  `}function bv(e){const{pendingGatewayUrl:t}=e;return t?c`
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
  `:w}const jr=["trace","debug","info","warn","error","fatal"];function wv(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleTimeString()}function $v(e,t){return t?[e.message,e.subsystem,e.raw].filter(Boolean).join(" ").toLowerCase().includes(t):!0}function kv(e){const t=e.filterText.trim().toLowerCase(),n=jr.some(o=>!e.levelFilters[o]),i=e.entries.filter(o=>o.level&&!e.levelFilters[o.level]?!1:$v(o,t)),s=t||n?"filtered":"visible";return c`
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
        ${jr.map(o=>c`
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

      ${e.file?c`<div class="muted" style="margin-top: 10px;">File: ${e.file}</div>`:w}
      ${e.truncated?c`
              <div class="callout" style="margin-top: 10px">Log output truncated; showing latest chunk.</div>
            `:w}
      ${e.error?c`<div class="callout danger" style="margin-top: 10px;">${e.error}</div>`:w}

      <div class="log-stream" style="margin-top: 12px;" @scroll=${e.onScroll}>
        ${i.length===0?c`
                <div class="muted" style="padding: 12px">No log entries.</div>
              `:i.map(o=>c`
                <div class="log-row">
                  <div class="log-time mono">${wv(o.time)}</div>
                  <div class="log-level ${o.level??""}">${o.level??""}</div>
                  <div class="log-subsystem mono">${o.subsystem??""}</div>
                  <div class="log-message mono">${o.message??o.raw}</div>
                </div>
              `)}
      </div>
    </section>
  `}function xv(e){return c`
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
      ${e.db==="sqlite"?c`<div class="callout" style="margin-top: 12px; background: var(--bg-muted, #f5f5f5); color: var(--text-muted, #666);">当前使用本地数据库</div>`:w}
      ${e.error?c`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:w}
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        ${e.stats?Sv(e.stats):e.loading?w:c`<div class="muted">暂无统计</div>`}
      </div>
      <div style="margin-top: 24px;">
        <div class="row" style="justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="card-title" style="font-size: 1rem;">无货产品列表</div>
          ${e.onOpenAddForm&&!e.showAddForm?c`<button class="btn btn--primary" ?disabled=${e.loading} @click=${e.onOpenAddForm}>手动新增</button>`:w}
        </div>
        ${e.showAddForm&&e.onAdd&&e.onCloseAddForm?c`
              <div class="callout" style="margin-bottom: 12px; padding: 12px;">
                <div style="font-weight: 600; margin-bottom: 8px;">新增无货记录</div>
                <form @submit=${async t=>{var o,r,a,l,d,f,u;t.preventDefault();const n=t.target,i=((r=(o=n.querySelector('[name="oos_add_name"]'))==null?void 0:o.value)==null?void 0:r.trim())??"";if(!i)return;await e.onAdd({product_name:i,specification:((l=(a=n.querySelector('[name="oos_add_spec"]'))==null?void 0:a.value)==null?void 0:l.trim())??"",quantity:parseFloat(((d=n.querySelector('[name="oos_add_qty"]'))==null?void 0:d.value)??"0")||0,unit:((u=(f=n.querySelector('[name="oos_add_unit"]'))==null?void 0:f.value)==null?void 0:u.trim())??""})&&e.onCloseAddForm()}}>
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
            `:w}
        <div class="list" style="margin-top: 8px;">
          ${e.list.length===0?c`<div class="muted">暂无无货产品记录。</div>`:e.list.slice(0,50).map(t=>Av(t,e.onDelete))}
        </div>
        ${e.list.length>50?c`<div class="muted" style="margin-top: 8px;">共 ${e.list.length} 个无货产品，仅展示前 50 个</div>`:w}
      </div>
      <div class="row" style="margin-top: 24px; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">按文件</div>
          <div class="list" style="margin-top: 8px;">
            ${e.byFile.length===0?c`<div class="muted">暂无</div>`:e.byFile.slice(0,10).map(t=>_v(t))}
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">按时间（最近 30 天）</div>
          <div class="list" style="margin-top: 8px;">
            ${e.byTime.length===0?c`<div class="muted">暂无</div>`:e.byTime.slice(0,10).map(t=>Cv(t))}
          </div>
        </div>
      </div>
    </section>
  `}function Sv(e){return[{label:"总记录数",value:e.total_records},{label:"无货产品数",value:e.out_of_stock_count},{label:"今日新增",value:e.today_count},{label:"被报无货≥2 次",value:e.notified_count},{label:"已发邮件产品数",value:e.email_sent_product_count}].map(n=>c`
      <div class="card stat-card" style="min-width: 100px;">
        <div class="stat-value">${n.value}</div>
        <div class="stat-label">${n.label}</div>
      </div>
    `)}function Av(e,t){const n=e.product_name??"",i=e.specification??"",s=e.unit??"",o=e.quantity??"",r=e.count??1,l=(e.email_sent_count??0)>0||e.email_status==="sent"?"已发送":"未发",d=e.product_key??"";return c`
    <div class="list-item" style="display: flex; justify-content: space-between; align-items: center;">
      <div class="list-main">
        <div class="list-title">${n} ${i}</div>
        <div class="list-sub">数量: ${String(o)} ${s} · 被报无货 ${r} 次 · 邮件: ${l}</div>
      </div>
      ${t&&d?c`<button class="btn" style="flex-shrink: 0;" title="删除该无货产品" @click=${()=>t(d)}>删除</button>`:w}
    </div>
  `}function _v(e){const t=e.file_name??"",n=e.total_records??0,i=e.uploaded_at?String(e.uploaded_at).length>19?String(e.uploaded_at).slice(0,10)+" "+String(e.uploaded_at).slice(11,19):String(e.uploaded_at):"";return c`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${t}</div>
        <div class="list-sub">记录数: ${n}${i?` · ${i}`:""}</div>
      </div>
    </div>
  `}function Cv(e){return c`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.date??""}</div>
        <div class="list-sub">新增: ${e.count??0}</div>
      </div>
    </div>
  `}function Tv(e){return c`
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
      ${e.db==="sqlite"?c`<div class="callout" style="margin-top: 12px; background: var(--bg-muted, #f5f5f5); color: var(--text-muted, #666);">当前使用本地数据库</div>`:w}
      ${e.error?c`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:w}
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        ${e.stats?Ev(e.stats):e.loading?w:c`<div class="muted">暂无统计</div>`}
      </div>
      <div style="margin-top: 24px;">
        <div class="row" style="justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="card-title" style="font-size: 1rem;">缺货产品列表</div>
          ${e.onOpenAddForm&&!e.showAddForm?c`<button class="btn btn--primary" ?disabled=${e.loading} @click=${e.onOpenAddForm}>手动新增</button>`:w}
        </div>
        ${e.showAddForm&&e.onAdd&&e.onCloseAddForm?c`
              <div class="callout" style="margin-bottom: 12px; padding: 12px;">
                <div style="font-weight: 600; margin-bottom: 8px;">新增缺货记录（产品名字、规格、需求、供给；差异自动计算）</div>
                <form @submit=${async t=>{var a,l,d,f,u,g;t.preventDefault();const n=t.target,i=((l=(a=n.querySelector('[name="shortage_add_name"]'))==null?void 0:a.value)==null?void 0:l.trim())??"";if(!i)return;const s=parseFloat(((d=n.querySelector('[name="shortage_add_qty"]'))==null?void 0:d.value)??"0")||0,o=parseFloat(((f=n.querySelector('[name="shortage_add_avail"]'))==null?void 0:f.value)??"0")||0;await e.onAdd({product_name:i,specification:((g=(u=n.querySelector('[name="shortage_add_spec"]'))==null?void 0:u.value)==null?void 0:g.trim())??"",quantity:s,available_qty:o})&&e.onCloseAddForm()}}>
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
            `:w}
        <div class="list" style="margin-top: 8px;">
          ${e.list.length===0?c`<div class="muted">暂无缺货产品记录。</div>`:e.list.slice(0,50).map(t=>Lv(t,e.onDelete))}
        </div>
        ${e.list.length>50?c`<div class="muted" style="margin-top: 8px;">共 ${e.list.length} 个缺货产品，仅展示前 50 个</div>`:w}
      </div>
      <div class="row" style="margin-top: 24px; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">按文件</div>
          <div class="list" style="margin-top: 8px;">
            ${e.byFile.length===0?c`<div class="muted">暂无</div>`:e.byFile.slice(0,10).map(t=>Rv(t))}
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">按时间（最近 30 天）</div>
          <div class="list" style="margin-top: 8px;">
            ${e.byTime.length===0?c`<div class="muted">暂无</div>`:e.byTime.slice(0,10).map(t=>Iv(t))}
          </div>
        </div>
      </div>
    </section>
  `}function Ev(e){return[{label:"总记录数",value:e.total_records},{label:"缺货产品数",value:e.shortage_product_count},{label:"今日新增",value:e.today_count},{label:"被报缺货≥2 次",value:e.reported_ge2_count}].map(n=>c`
      <div class="card stat-card" style="min-width: 100px;">
        <div class="stat-value">${n.value}</div>
        <div class="stat-label">${n.label}</div>
      </div>
    `)}function Lv(e,t){const n=e.product_name??"",i=e.specification??"",s=e.quantity??0,o=e.available_qty??0,r=e.shortfall??0,a=e.count??1,l=e.product_key??"";return c`
    <div class="list-item" style="display: flex; justify-content: space-between; align-items: center;">
      <div class="list-main">
        <div class="list-title">${n} ${i?` · ${i}`:""}</div>
        <div class="list-sub">需求: ${s} · 供给: ${o} · 差异: ${r} · 被报缺货 ${a} 次</div>
      </div>
      ${t&&l?c`<button class="btn" style="flex-shrink: 0;" title="删除该缺货产品" @click=${()=>t(l)}>删除</button>`:w}
    </div>
  `}function Rv(e){const t=e.file_name??"",n=e.total_records??0,i=e.uploaded_at?String(e.uploaded_at).length>19?String(e.uploaded_at).slice(0,10)+" "+String(e.uploaded_at).slice(11,19):String(e.uploaded_at):"";return c`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${t}</div>
        <div class="list-sub">记录数: ${n}${i?` · ${i}`:""}</div>
      </div>
    </div>
  `}function Iv(e){return c`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.date??""}</div>
        <div class="list-sub">新增: ${e.count??0}</div>
      </div>
    </div>
  `}const je="__defaults__",Hr=[{value:"deny",label:"Deny"},{value:"allowlist",label:"Allowlist"},{value:"full",label:"Full"}],Mv=[{value:"off",label:"Off"},{value:"on-miss",label:"On miss"},{value:"always",label:"Always"}];function Kr(e){return e==="allowlist"||e==="full"||e==="deny"?e:"deny"}function Pv(e){return e==="always"||e==="off"||e==="on-miss"?e:"on-miss"}function Fv(e){const t=(e==null?void 0:e.defaults)??{};return{security:Kr(t.security),ask:Pv(t.ask),askFallback:Kr(t.askFallback??"deny"),autoAllowSkills:!!(t.autoAllowSkills??!1)}}function Dv(e){const t=(e==null?void 0:e.agents)??{},n=Array.isArray(t.list)?t.list:[],i=[];return n.forEach(s=>{if(!s||typeof s!="object")return;const o=s,r=typeof o.id=="string"?o.id.trim():"";if(!r)return;const a=typeof o.name=="string"?o.name.trim():void 0,l=o.default===!0;i.push({id:r,name:a||void 0,isDefault:l})}),i}function Ov(e,t){const n=Dv(e),i=Object.keys((t==null?void 0:t.agents)??{}),s=new Map;n.forEach(r=>s.set(r.id,r)),i.forEach(r=>{s.has(r)||s.set(r,{id:r})});const o=Array.from(s.values());return o.length===0&&o.push({id:"main",isDefault:!0}),o.sort((r,a)=>{var f,u;if(r.isDefault&&!a.isDefault)return-1;if(!r.isDefault&&a.isDefault)return 1;const l=(f=r.name)!=null&&f.trim()?r.name:r.id,d=(u=a.name)!=null&&u.trim()?a.name:a.id;return l.localeCompare(d)}),o}function Nv(e,t){return e===je?je:e&&t.some(n=>n.id===e)?e:je}function Bv(e){var u;const t=e.execApprovalsForm??((u=e.execApprovalsSnapshot)==null?void 0:u.file)??null,n=!!t,i=Fv(t),s=Ov(e.configForm,t),o=Gv(e.nodes),r=e.execApprovalsTarget;let a=r==="node"&&e.execApprovalsTargetNodeId?e.execApprovalsTargetNodeId:null;r==="node"&&a&&!o.some(g=>g.id===a)&&(a=null);const l=Nv(e.execApprovalsSelectedAgent,s),d=l!==je?((t==null?void 0:t.agents)??{})[l]??null:null,f=Array.isArray(d==null?void 0:d.allowlist)?d.allowlist??[]:[];return{ready:n,disabled:e.execApprovalsSaving||e.execApprovalsLoading,dirty:e.execApprovalsDirty,loading:e.execApprovalsLoading,saving:e.execApprovalsSaving,form:t,defaults:i,selectedScope:l,selectedAgent:d,agents:s,allowlist:f,target:r,targetNodeId:a,targetNodes:o,onSelectScope:e.onExecApprovalsSelectAgent,onSelectTarget:e.onExecApprovalsTargetChange,onPatch:e.onExecApprovalsPatch,onRemove:e.onExecApprovalsRemove,onLoad:e.onLoadExecApprovals,onSave:e.onSaveExecApprovals}}function Uv(e){const t=e.ready,n=e.target!=="node"||!!e.targetNodeId;return c`
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

      ${zv(e)}

      ${t?c`
            ${jv(e)}
            ${Hv(e)}
            ${e.selectedScope===je?w:Kv(e)}
          `:c`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load exec approvals to edit allowlists.</div>
            <button class="btn" ?disabled=${e.loading||!n} @click=${e.onLoad}>
              ${e.loading?"Loading…":"Load approvals"}
            </button>
          </div>`}
    </section>
  `}function zv(e){const t=e.targetNodes.length>0,n=e.targetNodeId??"";return c`
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
          ${e.target==="node"?c`
                <label class="field">
                  <span>Node</span>
                  <select
                    ?disabled=${e.disabled||!t}
                    @change=${i=>{const o=i.target.value.trim();e.onSelectTarget("node",o||null)}}
                  >
                    <option value="" ?selected=${n===""}>Select node</option>
                    ${e.targetNodes.map(i=>c`<option
                          value=${i.id}
                          ?selected=${n===i.id}
                        >
                          ${i.label}
                        </option>`)}
                  </select>
                </label>
              `:w}
        </div>
      </div>
      ${e.target==="node"&&!t?c`
              <div class="muted">No nodes advertise exec approvals yet.</div>
            `:w}
    </div>
  `}function jv(e){return c`
    <div class="row" style="margin-top: 12px; gap: 8px; flex-wrap: wrap;">
      <span class="label">Scope</span>
      <div class="row" style="gap: 8px; flex-wrap: wrap;">
        <button
          class="btn btn--sm ${e.selectedScope===je?"active":""}"
          @click=${()=>e.onSelectScope(je)}
        >
          Defaults
        </button>
        ${e.agents.map(t=>{var i;const n=(i=t.name)!=null&&i.trim()?`${t.name} (${t.id})`:t.id;return c`
            <button
              class="btn btn--sm ${e.selectedScope===t.id?"active":""}"
              @click=${()=>e.onSelectScope(t.id)}
            >
              ${n}
            </button>
          `})}
      </div>
    </div>
  `}function Hv(e){const t=e.selectedScope===je,n=e.defaults,i=e.selectedAgent??{},s=t?["defaults"]:["agents",e.selectedScope],o=typeof i.security=="string"?i.security:void 0,r=typeof i.ask=="string"?i.ask:void 0,a=typeof i.askFallback=="string"?i.askFallback:void 0,l=t?n.security:o??"__default__",d=t?n.ask:r??"__default__",f=t?n.askFallback:a??"__default__",u=typeof i.autoAllowSkills=="boolean"?i.autoAllowSkills:void 0,g=u??n.autoAllowSkills,y=u==null;return c`
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
              @change=${b=>{const S=b.target.value;!t&&S==="__default__"?e.onRemove([...s,"security"]):e.onPatch([...s,"security"],S)}}
            >
              ${t?w:c`<option value="__default__" ?selected=${l==="__default__"}>
                    Use default (${n.security})
                  </option>`}
              ${Hr.map(b=>c`<option
                    value=${b.value}
                    ?selected=${l===b.value}
                  >
                    ${b.label}
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
              @change=${b=>{const S=b.target.value;!t&&S==="__default__"?e.onRemove([...s,"ask"]):e.onPatch([...s,"ask"],S)}}
            >
              ${t?w:c`<option value="__default__" ?selected=${d==="__default__"}>
                    Use default (${n.ask})
                  </option>`}
              ${Mv.map(b=>c`<option
                    value=${b.value}
                    ?selected=${d===b.value}
                  >
                    ${b.label}
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
              @change=${b=>{const S=b.target.value;!t&&S==="__default__"?e.onRemove([...s,"askFallback"]):e.onPatch([...s,"askFallback"],S)}}
            >
              ${t?w:c`<option value="__default__" ?selected=${f==="__default__"}>
                    Use default (${n.askFallback})
                  </option>`}
              ${Hr.map(b=>c`<option
                    value=${b.value}
                    ?selected=${f===b.value}
                  >
                    ${b.label}
                  </option>`)}
            </select>
          </label>
        </div>
      </div>

      <div class="list-item">
        <div class="list-main">
          <div class="list-title">Auto-allow skill CLIs</div>
          <div class="list-sub">
            ${t?"Allow skill executables listed by the Gateway.":y?`Using default (${n.autoAllowSkills?"on":"off"}).`:`Override (${g?"on":"off"}).`}
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>Enabled</span>
            <input
              type="checkbox"
              ?disabled=${e.disabled}
              .checked=${g}
              @change=${b=>{const k=b.target;e.onPatch([...s,"autoAllowSkills"],k.checked)}}
            />
          </label>
          ${!t&&!y?c`<button
                class="btn btn--sm"
                ?disabled=${e.disabled}
                @click=${()=>e.onRemove([...s,"autoAllowSkills"])}
              >
                Use default
              </button>`:w}
        </div>
      </div>
    </div>
  `}function Kv(e){const t=["agents",e.selectedScope,"allowlist"],n=e.allowlist;return c`
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
      ${n.length===0?c`
              <div class="muted">No allowlist entries yet.</div>
            `:n.map((i,s)=>qv(e,i,s))}
    </div>
  `}function qv(e,t,n){var r;const i=t.lastUsedAt?qe(t.lastUsedAt):"never",s=t.lastUsedCommand?Ki(t.lastUsedCommand,120):null,o=t.lastResolvedPath?Ki(t.lastResolvedPath,120):null;return c`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${(r=t.pattern)!=null&&r.trim()?t.pattern:"New pattern"}</div>
        <div class="list-sub">Last used: ${i}</div>
        ${s?c`<div class="list-sub mono">${s}</div>`:w}
        ${o?c`<div class="list-sub mono">${o}</div>`:w}
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
  `}function Gv(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(a=>String(a)==="system.execApprovals.get"||String(a)==="system.execApprovals.set"))continue;const o=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!o)continue;const r=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():o;t.push({id:o,label:r===o?o:`${r} · ${o}`})}return t.sort((n,i)=>n.label.localeCompare(i.label)),t}function Wv(e){const t=Xv(e),n=Bv(e);return c`
    ${Uv(n)}
    ${Zv(t)}
    ${Vv(e)}
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
        ${e.nodes.length===0?c`
                <div class="muted">No nodes found.</div>
              `:e.nodes.map(i=>im(i))}
      </div>
    </section>
  `}function Vv(e){const t=e.devicesList??{pending:[],paired:[]},n=Array.isArray(t.pending)?t.pending:[],i=Array.isArray(t.paired)?t.paired:[];return c`
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
      ${e.devicesError?c`<div class="callout danger" style="margin-top: 12px;">${e.devicesError}</div>`:w}
      <div class="list" style="margin-top: 16px;">
        ${n.length>0?c`
              <div class="muted" style="margin-bottom: 8px;">Pending</div>
              ${n.map(s=>Qv(s,e))}
            `:w}
        ${i.length>0?c`
              <div class="muted" style="margin-top: 12px; margin-bottom: 8px;">Paired</div>
              ${i.map(s=>Jv(s,e))}
            `:w}
        ${n.length===0&&i.length===0?c`
                <div class="muted">No paired devices.</div>
              `:w}
      </div>
    </section>
  `}function Qv(e,t){var a,l;const n=((a=e.displayName)==null?void 0:a.trim())||e.deviceId,i=typeof e.ts=="number"?qe(e.ts):"n/a",s=(l=e.role)!=null&&l.trim()?`role: ${e.role}`:"role: -",o=e.isRepair?" · repair":"",r=e.remoteIp?` · ${e.remoteIp}`:"";return c`
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
  `}function Jv(e,t){var a;const n=((a=e.displayName)==null?void 0:a.trim())||e.deviceId,i=e.remoteIp?` · ${e.remoteIp}`:"",s=`roles: ${Hi(e.roles)}`,o=`scopes: ${Hi(e.scopes)}`,r=Array.isArray(e.tokens)?e.tokens:[];return c`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${n}</div>
        <div class="list-sub">${e.deviceId}${i}</div>
        <div class="muted" style="margin-top: 6px;">${s} · ${o}</div>
        ${r.length===0?c`
                <div class="muted" style="margin-top: 6px">Tokens: none</div>
              `:c`
              <div class="muted" style="margin-top: 10px;">Tokens</div>
              <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 6px;">
                ${r.map(l=>Yv(e.deviceId,l,t))}
              </div>
            `}
      </div>
    </div>
  `}function Yv(e,t,n){const i=t.revokedAtMs?"revoked":"active",s=`scopes: ${Hi(t.scopes)}`,o=qe(t.rotatedAtMs??t.createdAtMs??t.lastUsedAtMs??null);return c`
    <div class="row" style="justify-content: space-between; gap: 8px;">
      <div class="list-sub">${t.role} · ${i} · ${s} · ${o}</div>
      <div class="row" style="justify-content: flex-end; gap: 6px; flex-wrap: wrap;">
        <button
          class="btn btn--sm"
          @click=${()=>n.onDeviceRotate(e,t.role,t.scopes)}
        >
          Rotate
        </button>
        ${t.revokedAtMs?w:c`
              <button
                class="btn btn--sm danger"
                @click=${()=>n.onDeviceRevoke(e,t.role)}
              >
                Revoke
              </button>
            `}
      </div>
    </div>
  `}function Xv(e){const t=e.configForm,n=tm(e.nodes),{defaultBinding:i,agents:s}=nm(t),o=!!t,r=e.configSaving||e.configFormMode==="raw";return{ready:o,disabled:r,configDirty:e.configDirty,configLoading:e.configLoading,configSaving:e.configSaving,defaultBinding:i,agents:s,nodes:n,onBindDefault:e.onBindDefault,onBindAgent:e.onBindAgent,onSave:e.onSaveBindings,onLoadConfig:e.onLoadConfig,formMode:e.configFormMode}}function Zv(e){const t=e.nodes.length>0,n=e.defaultBinding??"";return c`
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

      ${e.formMode==="raw"?c`
              <div class="callout warn" style="margin-top: 12px">
                Switch the Config tab to <strong>Form</strong> mode to edit bindings here.
              </div>
            `:w}

      ${e.ready?c`
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
                      ${e.nodes.map(i=>c`<option
                            value=${i.id}
                            ?selected=${n===i.id}
                          >
                            ${i.label}
                          </option>`)}
                    </select>
                  </label>
                  ${t?w:c`
                          <div class="muted">No nodes with system.run available.</div>
                        `}
                </div>
              </div>

              ${e.agents.length===0?c`
                      <div class="muted">No agents found.</div>
                    `:e.agents.map(i=>em(i,e))}
            </div>
          `:c`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load config to edit bindings.</div>
            <button class="btn" ?disabled=${e.configLoading} @click=${e.onLoadConfig}>
              ${e.configLoading?"Loading…":"Load config"}
            </button>
          </div>`}
    </section>
  `}function em(e,t){var o;const n=e.binding??"__default__",i=(o=e.name)!=null&&o.trim()?`${e.name} (${e.id})`:e.id,s=t.nodes.length>0;return c`
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
            ${t.nodes.map(r=>c`<option
                  value=${r.id}
                  ?selected=${n===r.id}
                >
                  ${r.label}
                </option>`)}
          </select>
        </label>
      </div>
    </div>
  `}function tm(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(a=>String(a)==="system.run"))continue;const o=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!o)continue;const r=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():o;t.push({id:o,label:r===o?o:`${r} · ${o}`})}return t.sort((n,i)=>n.label.localeCompare(i.label)),t}function nm(e){const t={id:"main",name:void 0,index:0,isDefault:!0,binding:null};if(!e||typeof e!="object")return{defaultBinding:null,agents:[t]};const i=(e.tools??{}).exec??{},s=typeof i.node=="string"&&i.node.trim()?i.node.trim():null,o=e.agents??{},r=Array.isArray(o.list)?o.list:[];if(r.length===0)return{defaultBinding:s,agents:[t]};const a=[];return r.forEach((l,d)=>{if(!l||typeof l!="object")return;const f=l,u=typeof f.id=="string"?f.id.trim():"";if(!u)return;const g=typeof f.name=="string"?f.name.trim():void 0,y=f.default===!0,k=(f.tools??{}).exec??{},S=typeof k.node=="string"&&k.node.trim()?k.node.trim():null;a.push({id:u,name:g||void 0,index:d,isDefault:y,binding:S})}),a.length===0&&a.push(t),{defaultBinding:s,agents:a}}function im(e){const t=!!e.connected,n=!!e.paired,i=typeof e.displayName=="string"&&e.displayName.trim()||(typeof e.nodeId=="string"?e.nodeId:"unknown"),s=Array.isArray(e.caps)?e.caps:[],o=Array.isArray(e.commands)?e.commands:[];return c`
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
          ${s.slice(0,12).map(r=>c`<span class="chip">${String(r)}</span>`)}
          ${o.slice(0,8).map(r=>c`<span class="chip">${String(r)}</span>`)}
        </div>
      </div>
    </div>
  `}function sm(e){var d,f;const t=(d=e.hello)==null?void 0:d.snapshot,n=t!=null&&t.uptimeMs?fa(t.uptimeMs):T("common.na"),i=(f=t==null?void 0:t.policy)!=null&&f.tickIntervalMs?`${t.policy.tickIntervalMs}ms`:T("common.na"),o=(t==null?void 0:t.authMode)==="trusted-proxy",r=(()=>{if(e.connected||!e.lastError)return null;const u=e.lastError.toLowerCase();if(!(u.includes("unauthorized")||u.includes("connect failed")))return null;const y=!!e.settings.token.trim(),b=!!e.password.trim();return!y&&!b?c`
        <div class="muted" style="margin-top: 8px">
          ${T("overview.auth.required")}
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
      `:c`
      <div class="muted" style="margin-top: 8px">
        ${T("overview.auth.failed",{command:"openclaw dashboard --no-open"})}
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
    `})(),a=(()=>{if(e.connected||!e.lastError||(typeof window<"u"?window.isSecureContext:!0))return null;const g=e.lastError.toLowerCase();return!g.includes("secure context")&&!g.includes("device identity required")?null:c`
      <div class="muted" style="margin-top: 8px">
        ${T("overview.insecure.hint",{url:"http://127.0.0.1:18789"})}
        <div style="margin-top: 6px">
          ${T("overview.insecure.stayHttp",{config:"gateway.controlUi.allowInsecureAuth: true"})}
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
    `})(),l=en.getLocale();return c`
    <section class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <div>
          <div class="card-title">${T("overview.health.title")}</div>
          <div class="card-sub">
            ${T("overview.health.subtitle")}
          </div>
        </div>
        <div
          class="pill ${e.connected?"success":"danger"}"
          style="font-weight: 600; min-width: 96px; justify-content: center;"
        >
          ${e.connected?T("common.ok"):T("common.offline")}
        </div>
      </div>
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        <div class="card stat-card" style="min-width: 140px;">
          <div class="stat-label">${T("overview.stats.instances")}</div>
          <div class="stat-value">${e.presenceCount}</div>
          <div class="muted">${T("overview.stats.instancesHint")}</div>
        </div>
        <div class="card stat-card" style="min-width: 140px;">
          <div class="stat-label">${T("overview.stats.sessions")}</div>
          <div class="stat-value">${e.sessionsCount??T("common.na")}</div>
          <div class="muted">${T("overview.stats.sessionsHint")}</div>
        </div>
        <div class="card stat-card" style="min-width: 140px;">
          <div class="stat-label">${T("overview.stats.cron")}</div>
          <div class="stat-value">
            ${e.cronEnabled==null?T("common.na"):e.cronEnabled?T("common.enabled"):T("common.disabled")}
          </div>
          <div class="muted">
            ${T("overview.stats.cronNext",{time:el(e.cronNext)})}
          </div>
        </div>
      </div>
      ${e.lastError?c`<div class="callout danger" style="margin-top: 12px;">
              <div style="font-weight: 600; margin-bottom: 4px;">
                ${T("overview.health.lastErrorLabel")}
              </div>
              <div>${e.lastError}</div>
            </div>`:c`<div class="muted" style="margin-top: 12px;">
              ${T("overview.health.noError")}
            </div>`}
    </section>

    <section class="grid grid-cols-2">
      <div class="card">
        <div class="card-title">${T("overview.access.title")}</div>
        <div class="card-sub">${T("overview.access.subtitle")}</div>
        <div class="form-grid" style="margin-top: 16px;">
          <label class="field">
            <span>${T("overview.access.wsUrl")}</span>
            <input
              .value=${e.settings.gatewayUrl}
              @input=${u=>{const g=u.target.value;e.onSettingsChange({...e.settings,gatewayUrl:g})}}
              placeholder="ws://100.x.y.z:18789"
            />
          </label>
          ${o?"":c`
                <label class="field">
                  <span>${T("overview.access.token")}</span>
                  <input
                    .value=${e.settings.token}
                    @input=${u=>{const g=u.target.value;e.onSettingsChange({...e.settings,token:g})}}
                    placeholder="JAGENT_GATEWAY_TOKEN"
                  />
                </label>
                <label class="field">
                  <span>${T("overview.access.password")}</span>
                  <input
                    type="password"
                    .value=${e.password}
                    @input=${u=>{const g=u.target.value;e.onPasswordChange(g)}}
                    placeholder="system or shared password"
                  />
                </label>
              `}
          <label class="field">
            <span>${T("overview.access.sessionKey")}</span>
            <input
              .value=${e.settings.sessionKey}
              @input=${u=>{const g=u.target.value;e.onSessionKeyChange(g)}}
            />
          </label>
          <label class="field">
            <span>${T("overview.access.language")}</span>
            <select
              .value=${l}
              @change=${u=>{const g=u.target.value;en.setLocale(g),e.onSettingsChange({...e.settings,locale:g})}}
            >
              <option value="en">${T("languages.en")}</option>
              <option value="zh-CN">${T("languages.zhCN")}</option>
              <option value="zh-TW">${T("languages.zhTW")}</option>
              <option value="pt-BR">${T("languages.ptBR")}</option>
            </select>
          </label>
        </div>
        <div class="row" style="margin-top: 14px;">
          <button class="btn" @click=${()=>e.onConnect()}>${T("common.connect")}</button>
          <button class="btn" @click=${()=>e.onRefresh()}>${T("common.refresh")}</button>
          <span class="muted">${T(o?"overview.access.trustedProxy":"overview.access.connectHint")}</span>
        </div>
      </div>

      <div class="card">
        <div class="card-title">${T("overview.snapshot.title")}</div>
        <div class="card-sub">${T("overview.snapshot.subtitle")}</div>
        <div class="stat-grid" style="margin-top: 16px;">
          <div class="stat">
            <div class="stat-label">${T("overview.snapshot.status")}</div>
            <div class="stat-value ${e.connected?"ok":"warn"}">
              ${e.connected?T("common.ok"):T("common.offline")}
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">${T("overview.snapshot.uptime")}</div>
            <div class="stat-value">${n}</div>
          </div>
          <div class="stat">
            <div class="stat-label">${T("overview.snapshot.tickInterval")}</div>
            <div class="stat-value">${i}</div>
          </div>
          <div class="stat">
            <div class="stat-label">${T("overview.snapshot.lastChannelsRefresh")}</div>
            <div class="stat-value">
              ${e.lastChannelsRefresh?qe(e.lastChannelsRefresh):T("common.na")}
            </div>
          </div>
        </div>
        ${e.lastError?c`<div class="callout danger" style="margin-top: 14px;">
              <div>${e.lastError}</div>
              ${r??""}
              ${a??""}
            </div>`:c`
                <div class="callout" style="margin-top: 14px">
                  ${T("overview.snapshot.channelsHint")}
                </div>
              `}
      </div>
    </section>

    <section class="grid grid-cols-2" style="margin-top: 18px;">
      <div class="card">
        <div class="card-title">无货总览</div>
        <div class="card-sub">最近的无货情况汇总，点击「实例」页可查看明细。</div>
        <div class="row" style="margin-top: 12px; gap: 12px; flex-wrap: wrap;">
          ${e.oosStats?[{label:"总记录数",value:e.oosStats.total_records},{label:"无货产品数",value:e.oosStats.out_of_stock_count},{label:"今日新增",value:e.oosStats.today_count},{label:"被报无货≥2 次",value:e.oosStats.notified_count}].map(u=>c`
                  <div class="card stat-card" style="min-width: 120px;">
                    <div class="stat-value">${u.value}</div>
                    <div class="stat-label">${u.label}</div>
                  </div>
                `):c`<div class="muted">暂无统计，稍后可在「实例」页查看。</div>`}
        </div>
      </div>
      <div class="card">
        <div class="card-title">缺货总览</div>
        <div class="card-sub">Work 匹配后库存不足的统计，需重点关注的紧缺物资。</div>
        <div class="row" style="margin-top: 12px; gap: 12px; flex-wrap: wrap;">
          ${e.shortageStats?[{label:"总记录数",value:e.shortageStats.total_records},{label:"缺货产品数",value:e.shortageStats.shortage_product_count},{label:"今日新增",value:e.shortageStats.today_count},{label:"被报缺货≥2 次",value:e.shortageStats.reported_ge2_count}].map(u=>c`
                  <div class="card stat-card" style="min-width: 120px;">
                    <div class="stat-value">${u.value}</div>
                    <div class="stat-label">${u.label}</div>
                  </div>
                `):c`<div class="muted">暂无统计，稍后可在「实例」页查看。</div>`}
        </div>
      </div>
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">${T("overview.notes.title")}</div>
      <div class="card-sub">${T("overview.notes.subtitle")}</div>
      <div class="note-grid" style="margin-top: 14px;">
        <div>
          <div class="note-title">${T("overview.notes.tailscaleTitle")}</div>
          <div class="muted">
            ${T("overview.notes.tailscaleText")}
          </div>
        </div>
        <div>
          <div class="note-title">${T("overview.notes.sessionTitle")}</div>
          <div class="muted">${T("overview.notes.sessionText")}</div>
        </div>
        <div>
          <div class="note-title">${T("overview.notes.cronTitle")}</div>
          <div class="muted">${T("overview.notes.cronText")}</div>
        </div>
      </div>
    </section>
  `}const om=["","off","minimal","low","medium","high","xhigh"],rm=["","off","on"],am=[{value:"",label:"inherit"},{value:"off",label:"off (explicit)"},{value:"on",label:"on"},{value:"full",label:"full"}],lm=["","off","on","stream"];function cm(e){if(!e)return"";const t=e.trim().toLowerCase();return t==="z.ai"||t==="z-ai"?"zai":t}function Ml(e){return cm(e)==="zai"}function dm(e){return Ml(e)?rm:om}function qr(e,t){return t?e.includes(t)?[...e]:[...e,t]:[...e]}function um(e,t){return t?e.some(n=>n.value===t)?[...e]:[...e,{value:t,label:`${t} (custom)`}]:[...e]}function fm(e,t){return!t||!e||e==="off"?e:"on"}function gm(e,t){return e?t&&e==="on"?"low":e:null}function pm(e){var n;const t=((n=e.result)==null?void 0:n.sessions)??[];return c`
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

      ${e.error?c`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:w}

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
        ${t.length===0?c`
                <div class="muted">No sessions found.</div>
              `:t.map(i=>hm(i,e.basePath,e.onPatch,e.onDelete,e.loading))}
      </div>
    </section>
  `}function hm(e,t,n,i,s){const o=e.updatedAt?qe(e.updatedAt):"n/a",r=e.thinkingLevel??"",a=Ml(e.modelProvider),l=fm(r,a),d=qr(dm(e.modelProvider),l),f=e.verboseLevel??"",u=um(am,f),g=e.reasoningLevel??"",y=qr(lm,g),b=typeof e.displayName=="string"&&e.displayName.trim().length>0?e.displayName.trim():null,k=typeof e.label=="string"?e.label.trim():"",S=!!(b&&b!==e.key&&b!==k),C=e.kind!=="global",D=C?`${Ps("chat",t)}?session=${encodeURIComponent(e.key)}`:null;return c`
    <div class="table-row">
      <div class="mono session-key-cell">
        ${C?c`<a href=${D} class="session-link">${e.key}</a>`:e.key}
        ${S?c`<span class="muted session-key-display-name">${b}</span>`:w}
      </div>
      <div>
        <input
          .value=${e.label??""}
          ?disabled=${s}
          placeholder="(optional)"
          @change=${L=>{const R=L.target.value.trim();n(e.key,{label:R||null})}}
        />
      </div>
      <div>${e.kind}</div>
      <div>${o}</div>
      <div>${tg(e)}</div>
      <div>
        <select
          ?disabled=${s}
          @change=${L=>{const R=L.target.value;n(e.key,{thinkingLevel:gm(R,a)})}}
        >
          ${d.map(L=>c`<option value=${L} ?selected=${l===L}>
                ${L||"inherit"}
              </option>`)}
        </select>
      </div>
      <div>
        <select
          ?disabled=${s}
          @change=${L=>{const R=L.target.value;n(e.key,{verboseLevel:R||null})}}
        >
          ${u.map(L=>c`<option value=${L.value} ?selected=${f===L.value}>
                ${L.label}
              </option>`)}
        </select>
      </div>
      <div>
        <select
          ?disabled=${s}
          @change=${L=>{const R=L.target.value;n(e.key,{reasoningLevel:R||null})}}
        >
          ${y.map(L=>c`<option value=${L} ?selected=${g===L}>
                ${L||"inherit"}
              </option>`)}
        </select>
      </div>
      <div>
        <button class="btn danger" ?disabled=${s} @click=${()=>i(e.key)}>
          Delete
        </button>
      </div>
    </div>
  `}function vm(e){var o;const t=((o=e.report)==null?void 0:o.skills)??[],n=e.filter.trim().toLowerCase(),i=n?t.filter(r=>[r.name,r.description,r.source].join(" ").toLowerCase().includes(n)):t,s=il(i);return c`
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

      ${e.error?c`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:w}

      ${i.length===0?c`
              <div class="muted" style="margin-top: 16px">No skills found.</div>
            `:c`
            <div class="agent-skills-groups" style="margin-top: 16px;">
              ${s.map(r=>{const a=r.id==="workspace"||r.id==="built-in";return c`
                  <details class="agent-skills-group" ?open=${!a}>
                    <summary class="agent-skills-header">
                      <span>${r.label}</span>
                      <span class="muted">${r.skills.length}</span>
                    </summary>
                    <div class="list skills-grid">
                      ${r.skills.map(l=>mm(l,e))}
                    </div>
                  </details>
                `})}
            </div>
          `}
    </section>
  `}function mm(e,t){const n=t.busyKey===e.skillKey,i=t.edits[e.skillKey]??"",s=t.messages[e.skillKey]??null,o=e.install.length>0&&e.missing.bins.length>0,r=!!(e.bundled&&e.source!=="openclaw-bundled"),a=sl(e),l=ol(e);return c`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">
          ${e.emoji?`${e.emoji} `:""}${e.name}
        </div>
        <div class="list-sub">${Ki(e.description,140)}</div>
        ${rl({skill:e,showBundledBadge:r})}
        ${a.length>0?c`
              <div class="muted" style="margin-top: 6px;">
                Missing: ${a.join(", ")}
              </div>
            `:w}
        ${l.length>0?c`
              <div class="muted" style="margin-top: 6px;">
                Reason: ${l.join(", ")}
              </div>
            `:w}
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
          ${o?c`<button
                class="btn"
                ?disabled=${n}
                @click=${()=>t.onInstall(e.skillKey,e.name,e.install[0].id)}
              >
                ${n?"Installing…":e.install[0].label}
              </button>`:w}
        </div>
        ${s?c`<div
              class="muted"
              style="margin-top: 8px; color: ${s.kind==="error"?"var(--danger-color, #d14343)":"var(--success-color, #0a7f5a)"};"
            >
              ${s.message}
            </div>`:w}
        ${e.primaryEnv?c`
              <div class="field" style="margin-top: 10px;">
                <span>API key</span>
                <input
                  type="password"
                  .value=${i}
                  @input=${d=>t.onEdit(e.skillKey,d.target.value)}
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
            `:w}
      </div>
    </div>
  `}const ym=/^data:/i,bm=/^https?:\/\//i;function wm(e){var a,l;const t=((a=e.agentsList)==null?void 0:a.agents)??[],n=aa(e.sessionKey),i=(n==null?void 0:n.agentId)??((l=e.agentsList)==null?void 0:l.defaultId)??"main",s=t.find(d=>d.id===i),o=s==null?void 0:s.identity,r=(o==null?void 0:o.avatarUrl)??(o==null?void 0:o.avatar);if(r)return ym.test(r)||bm.test(r)?r:o==null?void 0:o.avatarUrl}function $m(e){var y,b,k,S,C,D,L,R,x;const t=e.presenceEntries.length,n=((y=e.sessionsResult)==null?void 0:y.count)??null,i=((b=e.cronStatus)==null?void 0:b.nextWakeAtMs)??null,s=e.connected?null:T("chat.disconnected"),o=e.tab==="chat",r=o&&(e.settings.chatFocusMode||e.onboarding),a=e.onboarding?!1:e.settings.chatShowThinking,l=wm(e),d=e.chatAvatarUrl??l??null,f=e.configForm??((k=e.configSnapshot)==null?void 0:k.config),u=Tt(e.basePath??""),g=e.agentsSelectedId??((S=e.agentsList)==null?void 0:S.defaultId)??((L=(D=(C=e.agentsList)==null?void 0:C.agents)==null?void 0:D[0])==null?void 0:L.id)??null;return c`
    <div class="shell ${o?"shell--chat":""} ${r?"shell--chat-focus":""} ${e.settings.navCollapsed?"shell--nav-collapsed":""} ${e.onboarding?"shell--onboarding":""}">
      <header class="topbar">
        <div class="topbar-left">
          <button
            class="nav-collapse-toggle"
            @click=${()=>e.applySettings({...e.settings,navCollapsed:!e.settings.navCollapsed})}
            title="${e.settings.navCollapsed?T("nav.expand"):T("nav.collapse")}"
            aria-label="${e.settings.navCollapsed?T("nav.expand"):T("nav.collapse")}"
          >
            <span class="nav-collapse-toggle__icon">${ie.menu}</span>
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
            <span>${T("common.health")}</span>
            <span class="mono">${e.connected?T("common.ok"):T("common.offline")}</span>
          </div>
          ${Qf(e)}
        </div>
      </header>
      <aside class="nav ${e.settings.navCollapsed?"nav--collapsed":""}">
        ${su.map(m=>{const A=e.settings.navGroupsCollapsed[m.label]??!1,I=m.tabs.some(E=>E===e.tab);return c`
            <div class="nav-group ${A&&!I?"nav-group--collapsed":""}">
              <button
                class="nav-label"
                @click=${()=>{const E={...e.settings.navGroupsCollapsed};E[m.label]=!A,e.applySettings({...e.settings,navGroupsCollapsed:E})}}
                aria-expanded=${!A}
              >
                <span class="nav-label__text">${T(`nav.${m.label}`)}</span>
                <span class="nav-label__chevron">${A?"+":"−"}</span>
              </button>
              <div class="nav-group__items">
                ${m.tabs.map(E=>jf(e,E))}
              </div>
            </div>
          `})}
        <div class="nav-group nav-group--links">
          <div class="nav-label nav-label--static">
            <span class="nav-label__text">${T("common.resources")}</span>
          </div>
          <div class="nav-group__items">
            <a
              class="nav-item nav-item--external"
              href="https://docs.openclaw.ai"
              target="_blank"
              rel="noreferrer"
              title="${T("common.docs")} (opens in new tab)"
            >
              <span class="nav-item__icon" aria-hidden="true">${ie.book}</span>
              <span class="nav-item__text">${T("common.docs")}</span>
            </a>
          </div>
        </div>
      </aside>
      <main class="content ${o?"content--chat":""}">
        <section class="content-header">
          <div>
            ${e.tab==="work"?w:c`<div class="page-title">${Qi(e.tab)}</div>`}
            ${e.tab==="work"?w:c`<div class="page-sub">${au(e.tab)}</div>`}
          </div>
          <div class="page-meta">
            ${e.lastError?c`<div class="pill danger">${e.lastError}</div>`:w}
            ${o?Hf(e):w}
          </div>
        </section>

        ${e.tab==="overview"?sm({connected:e.connected,hello:e.hello,settings:e.settings,password:e.password,lastError:e.lastError,presenceCount:t,sessionsCount:n,cronEnabled:((R=e.cronStatus)==null?void 0:R.enabled)??null,cronNext:i,lastChannelsRefresh:e.channelsLastSuccess,oosStats:e.overviewOosStats,shortageStats:e.overviewShortageStats,onSettingsChange:m=>e.applySettings(m),onPasswordChange:m=>e.password=m,onSessionKeyChange:m=>{e.sessionKey=m,e.chatMessage="",e.resetToolStream(),e.applySettings({...e.settings,sessionKey:m,lastActiveSessionKey:m}),e.loadAssistantIdentity()},onConnect:()=>e.connect(),onRefresh:()=>e.loadOverview()}):w}

        ${e.tab==="channels"?Dg({loading:e.bkLoading,saving:e.bkSaving,error:e.bkError,content:e.bkContent,lastSuccessAt:e.bkLastSuccess,dependentFiles:e.bkDependentFiles,onReload:()=>ua(e),onSave:m=>td(e,m),onContentChange:m=>e.bkContent=m}):w}

        ${e.tab==="instances"?c`
                ${xv({loading:e.oosLoading,error:e.oosError,stats:e.oosStats,list:e.oosList,byFile:e.oosByFile,byTime:e.oosByTime,db:e.oosDb??void 0,onRefresh:()=>Vn(e),onDelete:m=>Kd(e,m),showAddForm:e.oosShowAddForm,onOpenAddForm:()=>e.oosShowAddForm=!0,onCloseAddForm:()=>e.oosShowAddForm=!1,onAdd:async m=>{const A=await qd(e,m);return A&&(e.oosShowAddForm=!1),A}})}
                ${Tv({loading:e.shortageLoading,error:e.shortageError,stats:e.shortageStats,list:e.shortageList,byFile:e.shortageByFile,byTime:e.shortageByTime,db:e.shortageDb??void 0,onRefresh:()=>Qn(e),onDelete:m=>Wd(e,m),showAddForm:e.shortageShowAddForm,onOpenAddForm:()=>e.shortageShowAddForm=!0,onCloseAddForm:()=>e.shortageShowAddForm=!1,onAdd:async m=>{const A=await Vd(e,m);return A&&(e.shortageShowAddForm=!1),A}})}
              `:w}

        ${e.tab==="sessions"?pm({loading:e.sessionsLoading,result:e.sessionsResult,error:e.sessionsError,activeMinutes:e.sessionsFilterActive,limit:e.sessionsFilterLimit,includeGlobal:e.sessionsIncludeGlobal,includeUnknown:e.sessionsIncludeUnknown,basePath:e.basePath,onFiltersChange:m=>{e.sessionsFilterActive=m.activeMinutes,e.sessionsFilterLimit=m.limit,e.sessionsIncludeGlobal=m.includeGlobal,e.sessionsIncludeUnknown=m.includeUnknown},onRefresh:()=>ut(e),onPatch:(m,A)=>Yd(e,m,A),onDelete:m=>Zd(e,m)}):w}

        ${Pf(e)}

        ${e.tab==="cron"?hv({basePath:e.basePath,loading:e.fulfillDraftsLoading,error:e.fulfillDraftsError,drafts:e.fulfillDrafts,detail:e.fulfillDetail,detailId:e.fulfillDetailId,confirmBusy:e.fulfillConfirmBusy,confirmResult:e.fulfillConfirmResult,onRefresh:()=>e.loadFulfillDrafts(),onSelectDraft:m=>od(e,m),onConfirm:m=>rd(e,m),onClearDetail:()=>{e.fulfillDetail=null,e.fulfillDetailId=null,e.fulfillConfirmResult=null}}):w}

        ${e.tab==="agents"?Ig({loading:e.agentsLoading,error:e.agentsError,agentsList:e.agentsList,selectedAgentId:g,activePanel:e.agentsPanel,configForm:f,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,channelsLoading:e.channelsLoading,channelsError:e.channelsError,channelsSnapshot:e.channelsSnapshot,channelsLastSuccess:e.channelsLastSuccess,cronLoading:e.cronLoading,cronStatus:e.cronStatus,cronJobs:e.cronJobs,cronError:e.cronError,agentFilesLoading:e.agentFilesLoading,agentFilesError:e.agentFilesError,agentFilesList:e.agentFilesList,agentFileActive:e.agentFileActive,agentFileContents:e.agentFileContents,agentFileDrafts:e.agentFileDrafts,agentFileSaving:e.agentFileSaving,agentIdentityLoading:e.agentIdentityLoading,agentIdentityError:e.agentIdentityError,agentIdentityById:e.agentIdentityById,agentSkillsLoading:e.agentSkillsLoading,agentSkillsReport:e.agentSkillsReport,agentSkillsError:e.agentSkillsError,agentSkillsAgentId:e.agentSkillsAgentId,skillsFilter:e.skillsFilter,onRefresh:async()=>{var A,I;await Ss(e);const m=((I=(A=e.agentsList)==null?void 0:A.agents)==null?void 0:I.map(E=>E.id))??[];m.length>0&&da(e,m)},onSelectAgent:m=>{e.agentsSelectedId!==m&&(e.agentsSelectedId=m,e.agentFilesList=null,e.agentFilesError=null,e.agentFilesLoading=!1,e.agentFileActive=null,e.agentFileContents={},e.agentFileDrafts={},e.agentSkillsReport=null,e.agentSkillsError=null,e.agentSkillsAgentId=null,ca(e,m),e.agentsPanel==="files"&&Ii(e,m),e.agentsPanel==="skills"&&Tn(e,m))},onSelectPanel:m=>{var A;e.agentsPanel=m,m==="files"&&g&&((A=e.agentFilesList)==null?void 0:A.agentId)!==g&&(e.agentFilesList=null,e.agentFilesError=null,e.agentFileActive=null,e.agentFileContents={},e.agentFileDrafts={},Ii(e,g)),m==="skills"&&g&&Tn(e,g),m==="channels"&&ye(e,!1),m==="cron"&&e.loadCron()},onLoadFiles:m=>Ii(e,m),onSelectFile:m=>{e.agentFileActive=m,g&&Zf(e,g,m)},onFileDraftChange:(m,A)=>{e.agentFileDrafts={...e.agentFileDrafts,[m]:A}},onFileReset:m=>{const A=e.agentFileContents[m]??"";e.agentFileDrafts={...e.agentFileDrafts,[m]:A}},onFileSave:m=>{if(!g)return;const A=e.agentFileDrafts[m]??e.agentFileContents[m]??"";eg(e,g,m,A)},onToolsProfileChange:(m,A,I)=>{var W;if(!f)return;const E=(W=f.agents)==null?void 0:W.list;if(!Array.isArray(E))return;const K=E.findIndex(q=>q&&typeof q=="object"&&"id"in q&&q.id===m);if(K<0)return;const B=["agents","list",K,"tools"];A?he(e,[...B,"profile"],A):Pe(e,[...B,"profile"]),I&&Pe(e,[...B,"allow"])},onToolsOverridesChange:(m,A,I)=>{var W;if(!f)return;const E=(W=f.agents)==null?void 0:W.list;if(!Array.isArray(E))return;const K=E.findIndex(q=>q&&typeof q=="object"&&"id"in q&&q.id===m);if(K<0)return;const B=["agents","list",K,"tools"];A.length>0?he(e,[...B,"alsoAllow"],A):Pe(e,[...B,"alsoAllow"]),I.length>0?he(e,[...B,"deny"],I):Pe(e,[...B,"deny"])},onConfigReload:()=>Ee(e),onConfigSave:()=>Cn(e),onChannelsRefresh:()=>ye(e,!1),onCronRefresh:()=>e.loadCron(),onSkillsFilterChange:m=>e.skillsFilter=m,onSkillsRefresh:()=>{g&&Tn(e,g)},onAgentSkillToggle:(m,A,I)=>{var N,z,J;if(!f)return;const E=(N=f.agents)==null?void 0:N.list;if(!Array.isArray(E))return;const K=E.findIndex(se=>se&&typeof se=="object"&&"id"in se&&se.id===m);if(K<0)return;const B=E[K],W=A.trim();if(!W)return;const q=((J=(z=e.agentSkillsReport)==null?void 0:z.skills)==null?void 0:J.map(se=>se.name).filter(Boolean))??[],re=(Array.isArray(B.skills)?B.skills.map(se=>String(se).trim()).filter(Boolean):void 0)??q,P=new Set(re);I?P.add(W):P.delete(W),he(e,["agents","list",K,"skills"],[...P])},onAgentSkillsClear:m=>{var E;if(!f)return;const A=(E=f.agents)==null?void 0:E.list;if(!Array.isArray(A))return;const I=A.findIndex(K=>K&&typeof K=="object"&&"id"in K&&K.id===m);I<0||Pe(e,["agents","list",I,"skills"])},onAgentSkillsDisableAll:m=>{var E;if(!f)return;const A=(E=f.agents)==null?void 0:E.list;if(!Array.isArray(A))return;const I=A.findIndex(K=>K&&typeof K=="object"&&"id"in K&&K.id===m);I<0||he(e,["agents","list",I,"skills"],[])},onModelChange:(m,A)=>{var q;if(!f)return;const I=(q=f.agents)==null?void 0:q.list;if(!Array.isArray(I))return;const E=I.findIndex(X=>X&&typeof X=="object"&&"id"in X&&X.id===m);if(E<0)return;const K=["agents","list",E,"model"];if(!A){Pe(e,K);return}const B=I[E],W=B==null?void 0:B.model;if(W&&typeof W=="object"&&!Array.isArray(W)){const X=W.fallbacks,re={primary:A,...Array.isArray(X)?{fallbacks:X}:{}};he(e,K,re)}else he(e,K,A)},onModelFallbacksChange:(m,A)=>{var N;if(!f)return;const I=(N=f.agents)==null?void 0:N.list;if(!Array.isArray(I))return;const E=I.findIndex(z=>z&&typeof z=="object"&&"id"in z&&z.id===m);if(E<0)return;const K=["agents","list",E,"model"],B=I[E],W=A.map(z=>z.trim()).filter(Boolean),q=B.model,re=(()=>{if(typeof q=="string")return q.trim()||null;if(q&&typeof q=="object"&&!Array.isArray(q)){const z=q.primary;if(typeof z=="string")return z.trim()||null}return null})();if(W.length===0){re?he(e,K,re):Pe(e,K);return}he(e,K,re?{primary:re,fallbacks:W}:{fallbacks:W})}}):w}

        ${e.tab==="skills"?vm({loading:e.skillsLoading,report:e.skillsReport,error:e.skillsError,filter:e.skillsFilter,edits:e.skillEdits,messages:e.skillMessages,busyKey:e.skillsBusyKey,onFilterChange:m=>e.skillsFilter=m,onRefresh:()=>ln(e,{clearMessages:!0}),onToggle:(m,A)=>tu(e,m,A),onEdit:(m,A)=>eu(e,m,A),onSaveKey:m=>nu(e,m),onInstall:(m,A,I)=>iu(e,m,A,I)}):w}

        ${e.tab==="nodes"?Wv({loading:e.nodesLoading,nodes:e.nodes,devicesLoading:e.devicesLoading,devicesError:e.devicesError,devicesList:e.devicesList,configForm:e.configForm??((x=e.configSnapshot)==null?void 0:x.config),configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,configFormMode:e.configFormMode,execApprovalsLoading:e.execApprovalsLoading,execApprovalsSaving:e.execApprovalsSaving,execApprovalsDirty:e.execApprovalsDirty,execApprovalsSnapshot:e.execApprovalsSnapshot,execApprovalsForm:e.execApprovalsForm,execApprovalsSelectedAgent:e.execApprovalsSelectedAgent,execApprovalsTarget:e.execApprovalsTarget,execApprovalsTargetNodeId:e.execApprovalsTargetNodeId,onRefresh:()=>Gn(e),onDevicesRefresh:()=>We(e),onDeviceApprove:m=>Pd(e,m),onDeviceReject:m=>Fd(e,m),onDeviceRotate:(m,A,I)=>Dd(e,{deviceId:m,role:A,scopes:I}),onDeviceRevoke:(m,A)=>Od(e,{deviceId:m,role:A}),onLoadConfig:()=>Ee(e),onLoadExecApprovals:()=>{const m=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return Ms(e,m)},onBindDefault:m=>{m?he(e,["tools","exec","node"],m):Pe(e,["tools","exec","node"])},onBindAgent:(m,A)=>{const I=["agents","list",m,"tools","exec","node"];A?he(e,I,A):Pe(e,I)},onSaveBindings:()=>Cn(e),onExecApprovalsTargetChange:(m,A)=>{e.execApprovalsTarget=m,e.execApprovalsTargetNodeId=A,e.execApprovalsSnapshot=null,e.execApprovalsForm=null,e.execApprovalsDirty=!1,e.execApprovalsSelectedAgent=null},onExecApprovalsSelectAgent:m=>{e.execApprovalsSelectedAgent=m},onExecApprovalsPatch:(m,A)=>jd(e,m,A),onExecApprovalsRemove:m=>Hd(e,m),onSaveExecApprovals:()=>{const m=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return zd(e,m)}}):w}

        ${e.tab==="chat"?Vh({sessionKey:e.sessionKey,onSessionKeyChange:m=>{e.sessionKey=m,e.chatMessage="",e.chatAttachments=[],e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.chatQueue=[],e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:m,lastActiveSessionKey:m}),e.loadAssistantIdentity(),on(e),Xi(e)},thinkingLevel:e.chatThinkingLevel,showThinking:a,loading:e.chatLoading,sending:e.chatSending,compactionStatus:e.compactionStatus,assistantAvatarUrl:d,messages:e.chatMessages,toolMessages:e.chatToolMessages,stream:e.chatStream,streamStartedAt:e.chatStreamStartedAt,draft:e.chatMessage,queue:e.chatQueue,connected:e.connected,canSend:e.connected,disabledReason:s,error:e.lastError,sessions:e.sessionsResult,focusMode:r,onRefresh:()=>(e.resetToolStream(),Promise.all([on(e),Xi(e)])),onToggleFocusMode:()=>{e.onboarding||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})},onChatScroll:m=>e.handleChatScroll(m),onDraftChange:m=>e.chatMessage=m,attachments:e.chatAttachments,onAttachmentsChange:m=>e.chatAttachments=m,uploadedFile:e.chatUploadedFile,onFileSelect:m=>e.handleUploadChatFile(m),onClearUploadedFile:()=>e.clearChatUploadedFile(),composeDragOver:e.chatComposeDragOver,onComposeDragOver:()=>e.setChatComposeDragOver(!0),onComposeDragLeave:()=>e.setChatComposeDragOver(!1),onComposeDrop:m=>e.handleComposeDrop(m),onSend:()=>e.handleSendChat(),canAbort:!!e.chatRunId,onAbort:()=>void e.handleAbortChat(),onQueueRemove:m=>e.removeQueuedMessage(m),onNewSession:()=>e.handleSendChat("/new",{restoreDraft:!0}),showNewMessages:e.chatNewMessagesBelow&&!e.chatManualRefreshInFlight,onScrollToBottom:()=>e.scrollToBottom(),sidebarOpen:e.sidebarOpen,sidebarContent:e.sidebarContent,sidebarError:e.sidebarError,splitRatio:e.splitRatio,onOpenSidebar:m=>e.handleOpenSidebar(m),onCloseSidebar:()=>e.handleCloseSidebar(),onSplitRatioChange:m=>e.handleSplitRatioChange(m),assistantName:e.assistantName,assistantAvatar:e.assistantAvatar}):w}

        ${e.tab==="config"?gv({raw:e.configRaw,originalRaw:e.configRawOriginal,valid:e.configValid,issues:e.configIssues,loading:e.configLoading,saving:e.configSaving,applying:e.configApplying,updating:e.updateRunning,connected:e.connected,schema:e.configSchema,schemaLoading:e.configSchemaLoading,uiHints:e.configUiHints,formMode:e.configFormMode,formValue:e.configForm,originalValue:e.configFormOriginal,searchQuery:e.configSearchQuery,activeSection:e.configActiveSection,activeSubsection:e.configActiveSubsection,onRawChange:m=>{e.configRaw=m},onFormModeChange:m=>e.configFormMode=m,onFormPatch:(m,A)=>he(e,m,A),onSearchChange:m=>e.configSearchQuery=m,onSectionChange:m=>{e.configActiveSection=m,e.configActiveSubsection=null},onSubsectionChange:m=>e.configActiveSubsection=m,onReload:()=>Ee(e),onSave:()=>Cn(e),onApply:()=>_c(e),onUpdate:()=>Cc(e)}):w}

        ${e.tab==="debug"?vv({loading:e.debugLoading,status:e.debugStatus,health:e.debugHealth,models:e.debugModels,heartbeat:e.debugHeartbeat,eventLog:e.eventLog,callMethod:e.debugCallMethod,callParams:e.debugCallParams,callResult:e.debugCallResult,callError:e.debugCallError,onCallMethodChange:m=>e.debugCallMethod=m,onCallParamsChange:m=>e.debugCallParams=m,onRefresh:()=>qn(e),onCall:()=>Gc(e)}):w}

        ${e.tab==="logs"?kv({loading:e.logsLoading,error:e.logsError,file:e.logsFile,entries:e.logsEntries,filterText:e.logsFilterText,levelFilters:e.logsLevelFilters,autoFollow:e.logsAutoFollow,truncated:e.logsTruncated,onFilterTextChange:m=>e.logsFilterText=m,onLevelToggle:(m,A)=>{e.logsLevelFilters={...e.logsLevelFilters,[m]:A}},onToggleAutoFollow:m=>e.logsAutoFollow=m,onRefresh:()=>bs(e,{reset:!0}),onExport:(m,A)=>e.exportLogs(m,A),onScroll:m=>e.handleLogsScroll(m)}):w}
      </main>
      ${yv(e)}
      ${bv(e)}
    </div>
  `}var km=Object.defineProperty,xm=Object.getOwnPropertyDescriptor,h=(e,t,n,i)=>{for(var s=i>1?void 0:i?xm(t,n):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(s=(i?r(t,n,s):r(s))||s);return i&&s&&km(t,n,s),s};const zi=Bs({});function Sm(){if(!window.location.search)return!1;const t=new URLSearchParams(window.location.search).get("onboarding");if(!t)return!1;const n=t.trim().toLowerCase();return n==="1"||n==="true"||n==="yes"||n==="on"}let p=class extends St{constructor(){super(),this.i18nController=new yc(this),this.settings=lu(),this.password="",this.tab="chat",this.onboarding=Sm(),this.connected=!1,this.theme=this.settings.theme??"system",this.themeResolved="dark",this.hello=null,this.lastError=null,this.eventLog=[],this.eventLogBuffer=[],this.toolStreamSyncTimer=null,this.sidebarCloseTimer=null,this.assistantName=zi.name,this.assistantAvatar=zi.avatar,this.assistantAgentId=zi.agentId??null,this.sessionKey=this.settings.sessionKey,this.chatLoading=!1,this.chatSending=!1,this.chatMessage="",this.chatMessages=[],this.chatToolMessages=[],this.chatStream=null,this.chatStreamStartedAt=null,this.chatRunId=null,this.compactionStatus=null,this.chatAvatarUrl=null,this.chatThinkingLevel=null,this.chatQueue=[],this.chatAttachments=[],this.chatUploadedFile=null,this.chatComposeDragOver=!1,this.chatManualRefreshInFlight=!1,this.sidebarOpen=!1,this.sidebarContent=null,this.sidebarError=null,this.splitRatio=this.settings.splitRatio,this.nodesLoading=!1,this.nodes=[],this.devicesLoading=!1,this.devicesError=null,this.devicesList=null,this.execApprovalsLoading=!1,this.execApprovalsSaving=!1,this.execApprovalsDirty=!1,this.execApprovalsSnapshot=null,this.execApprovalsForm=null,this.execApprovalsSelectedAgent=null,this.execApprovalsTarget="gateway",this.execApprovalsTargetNodeId=null,this.execApprovalQueue=[],this.execApprovalBusy=!1,this.execApprovalError=null,this.pendingGatewayUrl=null,this.configLoading=!1,this.configRaw=`{
}
`,this.configRawOriginal="",this.configValid=null,this.configIssues=[],this.configSaving=!1,this.configApplying=!1,this.updateRunning=!1,this.applySessionKey=this.settings.lastActiveSessionKey,this.configSnapshot=null,this.configSchema=null,this.configSchemaVersion=null,this.configSchemaLoading=!1,this.configUiHints={},this.configForm=null,this.configFormOriginal=null,this.configFormDirty=!1,this.configFormMode="form",this.configSearchQuery="",this.configActiveSection=null,this.configActiveSubsection=null,this.channelsLoading=!1,this.channelsSnapshot=null,this.channelsError=null,this.channelsLastSuccess=null,this.bkContent="",this.bkLoading=!1,this.bkError=null,this.bkSaving=!1,this.bkLastSuccess=null,this.bkDependentFiles=null,this.whatsappLoginMessage=null,this.whatsappLoginQrDataUrl=null,this.whatsappLoginConnected=null,this.whatsappBusy=!1,this.nostrProfileFormState=null,this.nostrProfileAccountId=null,this.presenceLoading=!1,this.presenceEntries=[],this.presenceError=null,this.presenceStatus=null,this.oosLoading=!1,this.oosError=null,this.oosStats=null,this.oosList=[],this.oosByFile=[],this.oosByTime=[],this.oosShowAddForm=!1,this.oosDb=null,this.shortageLoading=!1,this.shortageError=null,this.shortageStats=null,this.shortageList=[],this.shortageByFile=[],this.shortageByTime=[],this.shortageShowAddForm=!1,this.shortageDb=null,this.overviewOosStats=null,this.overviewOosError=null,this.overviewShortageStats=null,this.overviewShortageError=null,this.agentsLoading=!1,this.agentsList=null,this.agentsError=null,this.agentsSelectedId=null,this.agentsPanel="overview",this.agentFilesLoading=!1,this.agentFilesError=null,this.agentFilesList=null,this.agentFileContents={},this.agentFileDrafts={},this.agentFileActive=null,this.agentFileSaving=!1,this.agentIdentityLoading=!1,this.agentIdentityError=null,this.agentIdentityById={},this.agentSkillsLoading=!1,this.agentSkillsError=null,this.agentSkillsReport=null,this.agentSkillsAgentId=null,this.sessionsLoading=!1,this.sessionsResult=null,this.sessionsError=null,this.sessionsFilterActive="",this.sessionsFilterLimit="120",this.sessionsIncludeGlobal=!0,this.sessionsIncludeUnknown=!1,this.usageLoading=!1,this.usageResult=null,this.usageCostSummary=null,this.usageError=null,this.usageRequestSeq=0,this.usageTimeSeriesRequestSeq=0,this.usageSessionLogsRequestSeq=0,this.usageStartDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageEndDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageSelectedSessions=[],this.usageSelectedDays=[],this.usageSelectedHours=[],this.usageChartMode="tokens",this.usageDailyChartMode="by-type",this.usageTimeSeriesMode="per-turn",this.usageTimeSeriesBreakdownMode="by-type",this.usageTimeSeries=null,this.usageTimeSeriesLoading=!1,this.usageTimeSeriesCursorStart=null,this.usageTimeSeriesCursorEnd=null,this.usageSessionLogs=null,this.usageSessionLogsLoading=!1,this.usageSessionLogsExpanded=!1,this.usageQuery="",this.usageQueryDraft="",this.usageSessionSort="recent",this.usageSessionSortDir="desc",this.usageRecentSessions=[],this.usageTimeZone="local",this.usageContextExpanded=!1,this.usageHeaderPinned=!1,this.usageSessionsTab="all",this.usageVisibleColumns=["channel","agent","provider","model","messages","tools","errors","duration"],this.usageLogFilterRoles=[],this.usageLogFilterTools=[],this.usageLogFilterHasTools=!1,this.usageLogFilterQuery="",this.usageQueryDebounceTimer=null,this.workFilePaths=[],this.workOriginalFileNamesByPath={},this.workRunning=!1,this.workProgressStage=0,this._workProgressInterval=null,this.workRunStatus="idle",this.workRunId=null,this.workPendingChoices=[],this.workSelections={},this.workResult=null,this.workError=null,this.workCustomerLevel="B_QUOTE",this.workDoRegisterOos=!0,this.workPendingQuotationDraft=null,this.workQuotationDraftSaveStatus=null,this.cronLoading=!1,this.cronJobs=[],this.cronStatus=null,this.cronError=null,this.cronForm={...ef},this.cronRunsJobId=null,this.cronRuns=[],this.cronBusy=!1,this.fulfillDraftsLoading=!1,this.fulfillDraftsError=null,this.fulfillDrafts=[],this.fulfillDetail=null,this.fulfillDetailId=null,this.fulfillConfirmBusy=!1,this.fulfillConfirmResult=null,this.skillsLoading=!1,this.skillsReport=null,this.skillsError=null,this.skillsFilter="",this.skillEdits={},this.skillsBusyKey=null,this.skillMessages={},this.debugLoading=!1,this.debugStatus=null,this.debugHealth=null,this.debugModels=[],this.debugHeartbeat=null,this.debugCallMethod="",this.debugCallParams="{}",this.debugCallResult=null,this.debugCallError=null,this.logsLoading=!1,this.logsError=null,this.logsFile=null,this.logsEntries=[],this.logsFilterText="",this.logsLevelFilters={...Zu},this.logsAutoFollow=!0,this.logsTruncated=!1,this.logsCursor=null,this.logsLastFetchAt=null,this.logsLimit=500,this.logsMaxBytes=25e4,this.logsAtBottom=!0,this.client=null,this.chatScrollFrame=null,this.chatScrollTimeout=null,this.chatHasAutoScrolled=!1,this.chatUserNearBottom=!0,this.chatNewMessagesBelow=!1,this.nodesPollInterval=null,this.logsPollInterval=null,this.debugPollInterval=null,this.logsScrollFrame=null,this.toolStreamById=new Map,this.toolStreamOrder=[],this.refreshSessionsAfterChat=new Set,this.basePath="",this.popStateHandler=()=>$u(this),this.themeMedia=null,this.themeMediaHandler=null,this.topbarObserver=null,ms(this.settings.locale)&&en.setLocale(this.settings.locale)}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),vf(this)}firstUpdated(){mf(this)}disconnectedCallback(){yf(this),super.disconnectedCallback()}updated(e){e.has("workRunning")&&(this.workRunning?(this.workProgressStage=this.workRunStatus==="awaiting_choices"?1:0,this._workProgressInterval!=null&&(clearInterval(this._workProgressInterval),this._workProgressInterval=null)):(this._workProgressInterval!=null&&(clearInterval(this._workProgressInterval),this._workProgressInterval=null),this.workProgressStage=2)),bf(this,e)}connect(){Ja(this)}handleChatScroll(e){jc(this,e)}handleLogsScroll(e){Hc(this,e)}exportLogs(e,t){Kc(e,t)}resetToolStream(){Xn(this)}resetChatScroll(){Fo(this)}scrollToBottom(e){Fo(this),an(this,!0,!!(e!=null&&e.smooth))}async loadAssistantIdentity(){await Va(this)}applySettings(e){Ke(this,e)}setTab(e){pu(this,e)}setTheme(e,t){hu(this,e,t)}async loadOverview(){await Ua(this)}async loadCron(){await Os(this)}async loadFulfillDrafts(){await xu(this)}async handleAbortChat(){await Ka(this)}removeQueuedMessage(e){Vu(this,e)}async handleUploadChatFile(e){try{const t=await zu(this.basePath,e);this.chatUploadedFile=t,this.lastError=null}catch(t){this.lastError=t instanceof Error?t.message:String(t)}}clearChatUploadedFile(){this.chatUploadedFile=null}setChatComposeDragOver(e){this.chatComposeDragOver=e}async handleComposeDrop(e){this.chatComposeDragOver=!1,await this.handleUploadChatFile(e)}async handleSendChat(e,t){await Qu(this,e,t)}async handleWhatsAppStart(e){await Ec(this,e)}async handleWhatsAppWait(){await Lc(this)}async handleWhatsAppLogout(){await Rc(this)}async handleChannelConfigSave(){await Ic(this)}async handleChannelConfigReload(){await Mc(this)}handleNostrProfileEdit(e,t){Dc(this,e,t)}handleNostrProfileCancel(){Oc(this)}handleNostrProfileFieldChange(e,t){Nc(this,e,t)}async handleNostrProfileSave(){await Uc(this)}async handleNostrProfileImport(){await zc(this)}handleNostrProfileToggleAdvanced(){Bc(this)}async handleExecApprovalDecision(e){const t=this.execApprovalQueue[0];if(!(!t||!this.client||this.execApprovalBusy)){this.execApprovalBusy=!0,this.execApprovalError=null;try{await this.client.request("exec.approval.resolve",{id:t.id,decision:e}),this.execApprovalQueue=this.execApprovalQueue.filter(n=>n.id!==t.id)}catch(n){this.execApprovalError=`Exec approval failed: ${String(n)}`}finally{this.execApprovalBusy=!1}}}handleGatewayUrlConfirm(){const e=this.pendingGatewayUrl;e&&(this.pendingGatewayUrl=null,Ke(this,{...this.settings,gatewayUrl:e}),this.connect())}handleGatewayUrlCancel(){this.pendingGatewayUrl=null}handleOpenSidebar(e){this.sidebarCloseTimer!=null&&(window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=null),this.sidebarContent=e,this.sidebarError=null,this.sidebarOpen=!0}handleCloseSidebar(){this.sidebarOpen=!1,this.sidebarCloseTimer!=null&&window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=window.setTimeout(()=>{this.sidebarOpen||(this.sidebarContent=null,this.sidebarError=null,this.sidebarCloseTimer=null)},200)}handleSplitRatioChange(e){const t=Math.max(.4,Math.min(.7,e));this.splitRatio=t,this.applySettings({...this.settings,splitRatio:t})}render(){return $m(this)}};h([v()],p.prototype,"settings",2);h([v()],p.prototype,"password",2);h([v()],p.prototype,"tab",2);h([v()],p.prototype,"onboarding",2);h([v()],p.prototype,"connected",2);h([v()],p.prototype,"theme",2);h([v()],p.prototype,"themeResolved",2);h([v()],p.prototype,"hello",2);h([v()],p.prototype,"lastError",2);h([v()],p.prototype,"eventLog",2);h([v()],p.prototype,"assistantName",2);h([v()],p.prototype,"assistantAvatar",2);h([v()],p.prototype,"assistantAgentId",2);h([v()],p.prototype,"sessionKey",2);h([v()],p.prototype,"chatLoading",2);h([v()],p.prototype,"chatSending",2);h([v()],p.prototype,"chatMessage",2);h([v()],p.prototype,"chatMessages",2);h([v()],p.prototype,"chatToolMessages",2);h([v()],p.prototype,"chatStream",2);h([v()],p.prototype,"chatStreamStartedAt",2);h([v()],p.prototype,"chatRunId",2);h([v()],p.prototype,"compactionStatus",2);h([v()],p.prototype,"chatAvatarUrl",2);h([v()],p.prototype,"chatThinkingLevel",2);h([v()],p.prototype,"chatQueue",2);h([v()],p.prototype,"chatAttachments",2);h([v()],p.prototype,"chatUploadedFile",2);h([v()],p.prototype,"chatComposeDragOver",2);h([v()],p.prototype,"chatManualRefreshInFlight",2);h([v()],p.prototype,"sidebarOpen",2);h([v()],p.prototype,"sidebarContent",2);h([v()],p.prototype,"sidebarError",2);h([v()],p.prototype,"splitRatio",2);h([v()],p.prototype,"nodesLoading",2);h([v()],p.prototype,"nodes",2);h([v()],p.prototype,"devicesLoading",2);h([v()],p.prototype,"devicesError",2);h([v()],p.prototype,"devicesList",2);h([v()],p.prototype,"execApprovalsLoading",2);h([v()],p.prototype,"execApprovalsSaving",2);h([v()],p.prototype,"execApprovalsDirty",2);h([v()],p.prototype,"execApprovalsSnapshot",2);h([v()],p.prototype,"execApprovalsForm",2);h([v()],p.prototype,"execApprovalsSelectedAgent",2);h([v()],p.prototype,"execApprovalsTarget",2);h([v()],p.prototype,"execApprovalsTargetNodeId",2);h([v()],p.prototype,"execApprovalQueue",2);h([v()],p.prototype,"execApprovalBusy",2);h([v()],p.prototype,"execApprovalError",2);h([v()],p.prototype,"pendingGatewayUrl",2);h([v()],p.prototype,"configLoading",2);h([v()],p.prototype,"configRaw",2);h([v()],p.prototype,"configRawOriginal",2);h([v()],p.prototype,"configValid",2);h([v()],p.prototype,"configIssues",2);h([v()],p.prototype,"configSaving",2);h([v()],p.prototype,"configApplying",2);h([v()],p.prototype,"updateRunning",2);h([v()],p.prototype,"applySessionKey",2);h([v()],p.prototype,"configSnapshot",2);h([v()],p.prototype,"configSchema",2);h([v()],p.prototype,"configSchemaVersion",2);h([v()],p.prototype,"configSchemaLoading",2);h([v()],p.prototype,"configUiHints",2);h([v()],p.prototype,"configForm",2);h([v()],p.prototype,"configFormOriginal",2);h([v()],p.prototype,"configFormDirty",2);h([v()],p.prototype,"configFormMode",2);h([v()],p.prototype,"configSearchQuery",2);h([v()],p.prototype,"configActiveSection",2);h([v()],p.prototype,"configActiveSubsection",2);h([v()],p.prototype,"channelsLoading",2);h([v()],p.prototype,"channelsSnapshot",2);h([v()],p.prototype,"channelsError",2);h([v()],p.prototype,"channelsLastSuccess",2);h([v()],p.prototype,"bkContent",2);h([v()],p.prototype,"bkLoading",2);h([v()],p.prototype,"bkError",2);h([v()],p.prototype,"bkSaving",2);h([v()],p.prototype,"bkLastSuccess",2);h([v()],p.prototype,"bkDependentFiles",2);h([v()],p.prototype,"whatsappLoginMessage",2);h([v()],p.prototype,"whatsappLoginQrDataUrl",2);h([v()],p.prototype,"whatsappLoginConnected",2);h([v()],p.prototype,"whatsappBusy",2);h([v()],p.prototype,"nostrProfileFormState",2);h([v()],p.prototype,"nostrProfileAccountId",2);h([v()],p.prototype,"presenceLoading",2);h([v()],p.prototype,"presenceEntries",2);h([v()],p.prototype,"presenceError",2);h([v()],p.prototype,"presenceStatus",2);h([v()],p.prototype,"oosLoading",2);h([v()],p.prototype,"oosError",2);h([v()],p.prototype,"oosStats",2);h([v()],p.prototype,"oosList",2);h([v()],p.prototype,"oosByFile",2);h([v()],p.prototype,"oosByTime",2);h([v()],p.prototype,"oosShowAddForm",2);h([v()],p.prototype,"oosDb",2);h([v()],p.prototype,"shortageLoading",2);h([v()],p.prototype,"shortageError",2);h([v()],p.prototype,"shortageStats",2);h([v()],p.prototype,"shortageList",2);h([v()],p.prototype,"shortageByFile",2);h([v()],p.prototype,"shortageByTime",2);h([v()],p.prototype,"shortageShowAddForm",2);h([v()],p.prototype,"shortageDb",2);h([v()],p.prototype,"overviewOosStats",2);h([v()],p.prototype,"overviewOosError",2);h([v()],p.prototype,"overviewShortageStats",2);h([v()],p.prototype,"overviewShortageError",2);h([v()],p.prototype,"agentsLoading",2);h([v()],p.prototype,"agentsList",2);h([v()],p.prototype,"agentsError",2);h([v()],p.prototype,"agentsSelectedId",2);h([v()],p.prototype,"agentsPanel",2);h([v()],p.prototype,"agentFilesLoading",2);h([v()],p.prototype,"agentFilesError",2);h([v()],p.prototype,"agentFilesList",2);h([v()],p.prototype,"agentFileContents",2);h([v()],p.prototype,"agentFileDrafts",2);h([v()],p.prototype,"agentFileActive",2);h([v()],p.prototype,"agentFileSaving",2);h([v()],p.prototype,"agentIdentityLoading",2);h([v()],p.prototype,"agentIdentityError",2);h([v()],p.prototype,"agentIdentityById",2);h([v()],p.prototype,"agentSkillsLoading",2);h([v()],p.prototype,"agentSkillsError",2);h([v()],p.prototype,"agentSkillsReport",2);h([v()],p.prototype,"agentSkillsAgentId",2);h([v()],p.prototype,"sessionsLoading",2);h([v()],p.prototype,"sessionsResult",2);h([v()],p.prototype,"sessionsError",2);h([v()],p.prototype,"sessionsFilterActive",2);h([v()],p.prototype,"sessionsFilterLimit",2);h([v()],p.prototype,"sessionsIncludeGlobal",2);h([v()],p.prototype,"sessionsIncludeUnknown",2);h([v()],p.prototype,"usageLoading",2);h([v()],p.prototype,"usageResult",2);h([v()],p.prototype,"usageCostSummary",2);h([v()],p.prototype,"usageError",2);h([v()],p.prototype,"usageStartDate",2);h([v()],p.prototype,"usageEndDate",2);h([v()],p.prototype,"usageSelectedSessions",2);h([v()],p.prototype,"usageSelectedDays",2);h([v()],p.prototype,"usageSelectedHours",2);h([v()],p.prototype,"usageChartMode",2);h([v()],p.prototype,"usageDailyChartMode",2);h([v()],p.prototype,"usageTimeSeriesMode",2);h([v()],p.prototype,"usageTimeSeriesBreakdownMode",2);h([v()],p.prototype,"usageTimeSeries",2);h([v()],p.prototype,"usageTimeSeriesLoading",2);h([v()],p.prototype,"usageTimeSeriesCursorStart",2);h([v()],p.prototype,"usageTimeSeriesCursorEnd",2);h([v()],p.prototype,"usageSessionLogs",2);h([v()],p.prototype,"usageSessionLogsLoading",2);h([v()],p.prototype,"usageSessionLogsExpanded",2);h([v()],p.prototype,"usageQuery",2);h([v()],p.prototype,"usageQueryDraft",2);h([v()],p.prototype,"usageSessionSort",2);h([v()],p.prototype,"usageSessionSortDir",2);h([v()],p.prototype,"usageRecentSessions",2);h([v()],p.prototype,"usageTimeZone",2);h([v()],p.prototype,"usageContextExpanded",2);h([v()],p.prototype,"usageHeaderPinned",2);h([v()],p.prototype,"usageSessionsTab",2);h([v()],p.prototype,"usageVisibleColumns",2);h([v()],p.prototype,"usageLogFilterRoles",2);h([v()],p.prototype,"usageLogFilterTools",2);h([v()],p.prototype,"usageLogFilterHasTools",2);h([v()],p.prototype,"usageLogFilterQuery",2);h([v()],p.prototype,"workFilePaths",2);h([v()],p.prototype,"workOriginalFileNamesByPath",2);h([v()],p.prototype,"workRunning",2);h([v()],p.prototype,"workProgressStage",2);h([v()],p.prototype,"workRunStatus",2);h([v()],p.prototype,"workRunId",2);h([v()],p.prototype,"workPendingChoices",2);h([v()],p.prototype,"workSelections",2);h([v()],p.prototype,"workResult",2);h([v()],p.prototype,"workError",2);h([v()],p.prototype,"workCustomerLevel",2);h([v()],p.prototype,"workDoRegisterOos",2);h([v()],p.prototype,"workPendingQuotationDraft",2);h([v()],p.prototype,"workQuotationDraftSaveStatus",2);h([v()],p.prototype,"cronLoading",2);h([v()],p.prototype,"cronJobs",2);h([v()],p.prototype,"cronStatus",2);h([v()],p.prototype,"cronError",2);h([v()],p.prototype,"cronForm",2);h([v()],p.prototype,"cronRunsJobId",2);h([v()],p.prototype,"cronRuns",2);h([v()],p.prototype,"cronBusy",2);h([v()],p.prototype,"fulfillDraftsLoading",2);h([v()],p.prototype,"fulfillDraftsError",2);h([v()],p.prototype,"fulfillDrafts",2);h([v()],p.prototype,"fulfillDetail",2);h([v()],p.prototype,"fulfillDetailId",2);h([v()],p.prototype,"fulfillConfirmBusy",2);h([v()],p.prototype,"fulfillConfirmResult",2);h([v()],p.prototype,"skillsLoading",2);h([v()],p.prototype,"skillsReport",2);h([v()],p.prototype,"skillsError",2);h([v()],p.prototype,"skillsFilter",2);h([v()],p.prototype,"skillEdits",2);h([v()],p.prototype,"skillsBusyKey",2);h([v()],p.prototype,"skillMessages",2);h([v()],p.prototype,"debugLoading",2);h([v()],p.prototype,"debugStatus",2);h([v()],p.prototype,"debugHealth",2);h([v()],p.prototype,"debugModels",2);h([v()],p.prototype,"debugHeartbeat",2);h([v()],p.prototype,"debugCallMethod",2);h([v()],p.prototype,"debugCallParams",2);h([v()],p.prototype,"debugCallResult",2);h([v()],p.prototype,"debugCallError",2);h([v()],p.prototype,"logsLoading",2);h([v()],p.prototype,"logsError",2);h([v()],p.prototype,"logsFile",2);h([v()],p.prototype,"logsEntries",2);h([v()],p.prototype,"logsFilterText",2);h([v()],p.prototype,"logsLevelFilters",2);h([v()],p.prototype,"logsAutoFollow",2);h([v()],p.prototype,"logsTruncated",2);h([v()],p.prototype,"logsCursor",2);h([v()],p.prototype,"logsLastFetchAt",2);h([v()],p.prototype,"logsLimit",2);h([v()],p.prototype,"logsMaxBytes",2);h([v()],p.prototype,"logsAtBottom",2);h([v()],p.prototype,"chatNewMessagesBelow",2);p=h([Zr("openclaw-app")],p);
//# sourceMappingURL=index-Cz65cLb_.js.map
