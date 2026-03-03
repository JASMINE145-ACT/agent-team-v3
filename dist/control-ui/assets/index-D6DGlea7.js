var Gl=Object.defineProperty;var Wl=(e,t,n)=>t in e?Gl(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var W=(e,t,n)=>Wl(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Tn=globalThis,ys=Tn.ShadowRoot&&(Tn.ShadyCSS===void 0||Tn.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,bs=Symbol(),So=new WeakMap;let Ja=class{constructor(t,n,i){if(this._$cssResult$=!0,i!==bs)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(ys&&t===void 0){const i=n!==void 0&&n.length===1;i&&(t=So.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&So.set(n,t))}return t}toString(){return this.cssText}};const Vl=e=>new Ja(typeof e=="string"?e:e+"",void 0,bs),Ql=(e,...t)=>{const n=e.length===1?e[0]:t.reduce((i,s,o)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[o+1],e[0]);return new Ja(n,e,bs)},Jl=(e,t)=>{if(ys)e.adoptedStyleSheets=t.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of t){const i=document.createElement("style"),s=Tn.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=n.cssText,e.appendChild(i)}},Ao=ys?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const i of t.cssRules)n+=i.cssText;return Vl(n)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Yl,defineProperty:Xl,getOwnPropertyDescriptor:Zl,getOwnPropertyNames:ec,getOwnPropertySymbols:tc,getPrototypeOf:nc}=Object,He=globalThis,_o=He.trustedTypes,ic=_o?_o.emptyScript:"",wi=He.reactiveElementPolyfillSupport,Gt=(e,t)=>e,Pn={toAttribute(e,t){switch(t){case Boolean:e=e?ic:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},ws=(e,t)=>!Yl(e,t),Co={attribute:!0,type:String,converter:Pn,reflect:!1,useDefault:!1,hasChanged:ws};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),He.litPropertyMetadata??(He.litPropertyMetadata=new WeakMap);let At=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=Co){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(t,n),!n.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,n);s!==void 0&&Xl(this.prototype,t,s)}}static getPropertyDescriptor(t,n,i){const{get:s,set:o}=Zl(this.prototype,t)??{get(){return this[n]},set(a){this[n]=a}};return{get:s,set(a){const r=s==null?void 0:s.call(this);o==null||o.call(this,a),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Co}static _$Ei(){if(this.hasOwnProperty(Gt("elementProperties")))return;const t=nc(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Gt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Gt("properties"))){const n=this.properties,i=[...ec(n),...tc(n)];for(const s of i)this.createProperty(s,n[s])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[i,s]of n)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[n,i]of this.elementProperties){const s=this._$Eu(n,i);s!==void 0&&this._$Eh.set(s,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)n.unshift(Ao(s))}else t!==void 0&&n.push(Ao(t));return n}static _$Eu(t,n){const i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(n=>n(this))}addController(t){var n;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((n=t.hostConnected)==null||n.call(t))}removeController(t){var n;(n=this._$EO)==null||n.delete(t)}_$E_(){const t=new Map,n=this.constructor.elementProperties;for(const i of n.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Jl(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(n=>{var i;return(i=n.hostConnected)==null?void 0:i.call(n)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(n=>{var i;return(i=n.hostDisconnected)==null?void 0:i.call(n)})}attributeChangedCallback(t,n,i){this._$AK(t,i)}_$ET(t,n){var o;const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const a=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:Pn).toAttribute(n,i.type);this._$Em=t,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,n){var o,a;const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const r=i.getPropertyOptions(s),d=typeof r.converter=="function"?{fromAttribute:r.converter}:((o=r.converter)==null?void 0:o.fromAttribute)!==void 0?r.converter:Pn;this._$Em=s;const l=d.fromAttribute(n,r.type);this[s]=l??((a=this._$Ej)==null?void 0:a.get(s))??l,this._$Em=null}}requestUpdate(t,n,i,s=!1,o){var a;if(t!==void 0){const r=this.constructor;if(s===!1&&(o=this[t]),i??(i=r.getPropertyOptions(t)),!((i.hasChanged??ws)(o,n)||i.useDefault&&i.reflect&&o===((a=this._$Ej)==null?void 0:a.get(t))&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,n,{useDefault:i,reflect:s,wrapped:o},a){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,a??n??this[t]),o!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(n=void 0),this._$AL.set(t,n)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,a]of this._$Ep)this[o]=a;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,a]of s){const{wrapped:r}=a,d=this[o];r!==!0||this._$AL.has(o)||d===void 0||this.C(o,void 0,a,d)}}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),(i=this._$EO)==null||i.forEach(s=>{var o;return(o=s.hostUpdate)==null?void 0:o.call(s)}),this.update(n)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(n)}willUpdate(t){}_$AE(t){var n;(n=this._$EO)==null||n.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(n=>this._$ET(n,this[n]))),this._$EM()}updated(t){}firstUpdated(t){}};At.elementStyles=[],At.shadowRootOptions={mode:"open"},At[Gt("elementProperties")]=new Map,At[Gt("finalized")]=new Map,wi==null||wi({ReactiveElement:At}),(He.reactiveElementVersions??(He.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Wt=globalThis,To=e=>e,Dn=Wt.trustedTypes,Eo=Dn?Dn.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ya="$lit$",Ke=`lit$${Math.random().toFixed(9).slice(2)}$`,Xa="?"+Ke,sc=`<${Xa}>`,at=document,Xt=()=>at.createComment(""),Zt=e=>e===null||typeof e!="object"&&typeof e!="function",$s=Array.isArray,oc=e=>$s(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",$i=`[ 	
\f\r]`,Pt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Lo=/-->/g,Ro=/>/g,Xe=RegExp(`>|${$i}(?:([^\\s"'>=/]+)(${$i}*=${$i}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Io=/'/g,Mo=/"/g,Za=/^(?:script|style|textarea|title)$/i,ac=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=ac(1),Ge=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),Fo=new WeakMap,it=at.createTreeWalker(at,129);function er(e,t){if(!$s(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Eo!==void 0?Eo.createHTML(t):t}const rc=(e,t)=>{const n=e.length-1,i=[];let s,o=t===2?"<svg>":t===3?"<math>":"",a=Pt;for(let r=0;r<n;r++){const d=e[r];let l,u,g=-1,f=0;for(;f<d.length&&(a.lastIndex=f,u=a.exec(d),u!==null);)f=a.lastIndex,a===Pt?u[1]==="!--"?a=Lo:u[1]!==void 0?a=Ro:u[2]!==void 0?(Za.test(u[2])&&(s=RegExp("</"+u[2],"g")),a=Xe):u[3]!==void 0&&(a=Xe):a===Xe?u[0]===">"?(a=s??Pt,g=-1):u[1]===void 0?g=-2:(g=a.lastIndex-u[2].length,l=u[1],a=u[3]===void 0?Xe:u[3]==='"'?Mo:Io):a===Mo||a===Io?a=Xe:a===Lo||a===Ro?a=Pt:(a=Xe,s=void 0);const m=a===Xe&&e[r+1].startsWith("/>")?" ":"";o+=a===Pt?d+sc:g>=0?(i.push(l),d.slice(0,g)+Ya+d.slice(g)+Ke+m):d+Ke+(g===-2?r:m)}return[er(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class en{constructor({strings:t,_$litType$:n},i){let s;this.parts=[];let o=0,a=0;const r=t.length-1,d=this.parts,[l,u]=rc(t,n);if(this.el=en.createElement(l,i),it.currentNode=this.el.content,n===2||n===3){const g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(s=it.nextNode())!==null&&d.length<r;){if(s.nodeType===1){if(s.hasAttributes())for(const g of s.getAttributeNames())if(g.endsWith(Ya)){const f=u[a++],m=s.getAttribute(g).split(Ke),b=/([.?@])?(.*)/.exec(f);d.push({type:1,index:o,name:b[2],strings:m,ctor:b[1]==="."?cc:b[1]==="?"?dc:b[1]==="@"?uc:Gn}),s.removeAttribute(g)}else g.startsWith(Ke)&&(d.push({type:6,index:o}),s.removeAttribute(g));if(Za.test(s.tagName)){const g=s.textContent.split(Ke),f=g.length-1;if(f>0){s.textContent=Dn?Dn.emptyScript:"";for(let m=0;m<f;m++)s.append(g[m],Xt()),it.nextNode(),d.push({type:2,index:++o});s.append(g[f],Xt())}}}else if(s.nodeType===8)if(s.data===Xa)d.push({type:2,index:o});else{let g=-1;for(;(g=s.data.indexOf(Ke,g+1))!==-1;)d.push({type:7,index:o}),g+=Ke.length-1}o++}}static createElement(t,n){const i=at.createElement("template");return i.innerHTML=t,i}}function Tt(e,t,n=e,i){var a,r;if(t===Ge)return t;let s=i!==void 0?(a=n._$Co)==null?void 0:a[i]:n._$Cl;const o=Zt(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==o&&((r=s==null?void 0:s._$AO)==null||r.call(s,!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,i)),i!==void 0?(n._$Co??(n._$Co=[]))[i]=s:n._$Cl=s),s!==void 0&&(t=Tt(e,s._$AS(e,t.values),s,i)),t}class lc{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??at).importNode(n,!0);it.currentNode=s;let o=it.nextNode(),a=0,r=0,d=i[0];for(;d!==void 0;){if(a===d.index){let l;d.type===2?l=new qn(o,o.nextSibling,this,t):d.type===1?l=new d.ctor(o,d.name,d.strings,this,t):d.type===6&&(l=new gc(o,this,t)),this._$AV.push(l),d=i[++r]}a!==(d==null?void 0:d.index)&&(o=it.nextNode(),a++)}return it.currentNode=at,s}p(t){let n=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,n),n+=i.strings.length-2):i._$AI(t[n])),n++}}let qn=class tr{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,n,i,s){this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Tt(this,t,n),Zt(t)?t===y||t==null||t===""?(this._$AH!==y&&this._$AR(),this._$AH=y):t!==this._$AH&&t!==Ge&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):oc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==y&&Zt(this._$AH)?this._$AA.nextSibling.data=t:this.T(at.createTextNode(t)),this._$AH=t}$(t){var o;const{values:n,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=en.createElement(er(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===s)this._$AH.p(n);else{const a=new lc(s,this),r=a.u(this.options);a.p(n),this.T(r),this._$AH=a}}_$AC(t){let n=Fo.get(t.strings);return n===void 0&&Fo.set(t.strings,n=new en(t)),n}k(t){$s(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let i,s=0;for(const o of t)s===n.length?n.push(i=new tr(this.O(Xt()),this.O(Xt()),this,this.options)):i=n[s],i._$AI(o),s++;s<n.length&&(this._$AR(i&&i._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,n);t!==this._$AB;){const s=To(t).nextSibling;To(t).remove(),t=s}}setConnected(t){var n;this._$AM===void 0&&(this._$Cv=t,(n=this._$AP)==null||n.call(this,t))}},Gn=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,i,s,o){this.type=1,this._$AH=y,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=y}_$AI(t,n=this,i,s){const o=this.strings;let a=!1;if(o===void 0)t=Tt(this,t,n,0),a=!Zt(t)||t!==this._$AH&&t!==Ge,a&&(this._$AH=t);else{const r=t;let d,l;for(t=o[0],d=0;d<o.length-1;d++)l=Tt(this,r[i+d],n,d),l===Ge&&(l=this._$AH[d]),a||(a=!Zt(l)||l!==this._$AH[d]),l===y?t=y:t!==y&&(t+=(l??"")+o[d+1]),this._$AH[d]=l}a&&!s&&this.j(t)}j(t){t===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},cc=class extends Gn{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===y?void 0:t}},dc=class extends Gn{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==y)}},uc=class extends Gn{constructor(t,n,i,s,o){super(t,n,i,s,o),this.type=5}_$AI(t,n=this){if((t=Tt(this,t,n,0)??y)===Ge)return;const i=this._$AH,s=t===y&&i!==y||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==y&&(i===y||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var n;typeof this._$AH=="function"?this._$AH.call(((n=this.options)==null?void 0:n.host)??this.element,t):this._$AH.handleEvent(t)}},gc=class{constructor(t,n,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Tt(this,t)}};const fc={I:qn},ki=Wt.litHtmlPolyfillSupport;ki==null||ki(en,qn),(Wt.litHtmlVersions??(Wt.litHtmlVersions=[])).push("3.3.2");const pc=(e,t,n)=>{const i=(n==null?void 0:n.renderBefore)??t;let s=i._$litPart$;if(s===void 0){const o=(n==null?void 0:n.renderBefore)??null;i._$litPart$=s=new qn(t.insertBefore(Xt(),o),o,void 0,n??{})}return s._$AI(e),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ot=globalThis;let Ct=class extends At{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var n;const t=super.createRenderRoot();return(n=this.renderOptions).renderBefore??(n.renderBefore=t.firstChild),t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=pc(n,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return Ge}};var Qa;Ct._$litElement$=!0,Ct.finalized=!0,(Qa=ot.litElementHydrateSupport)==null||Qa.call(ot,{LitElement:Ct});const xi=ot.litElementPolyfillSupport;xi==null||xi({LitElement:Ct});(ot.litElementVersions??(ot.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const nr=e=>(t,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const hc={attribute:!0,type:String,converter:Pn,reflect:!1,hasChanged:ws},vc=(e=hc,t,n)=>{const{kind:i,metadata:s}=n;let o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),i==="setter"&&((e=Object.create(e)).wrapped=!0),o.set(n.name,e),i==="accessor"){const{name:a}=n;return{set(r){const d=t.get.call(this);t.set.call(this,r),this.requestUpdate(a,d,e,!0,r)},init(r){return r!==void 0&&this.C(a,void 0,e,r),r}}}if(i==="setter"){const{name:a}=n;return function(r){const d=this[a];t.call(this,r),this.requestUpdate(a,d,e,!0,r)}}throw Error("Unsupported decorator location: "+i)};function Wn(e){return(t,n)=>typeof n=="object"?vc(e,t,n):((i,s,o)=>{const a=s.hasOwnProperty(o);return s.constructor.createProperty(o,i),a?Object.getOwnPropertyDescriptor(s,o):void 0})(e,t,n)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function v(e){return Wn({...e,state:!0,attribute:!1})}const mc="modulepreload",yc=function(e,t){return new URL(e,t).href},Po={},Si=function(t,n,i){let s=Promise.resolve();if(n&&n.length>0){let a=function(u){return Promise.all(u.map(g=>Promise.resolve(g).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};const r=document.getElementsByTagName("link"),d=document.querySelector("meta[property=csp-nonce]"),l=(d==null?void 0:d.nonce)||(d==null?void 0:d.getAttribute("nonce"));s=a(n.map(u=>{if(u=yc(u,i),u in Po)return;Po[u]=!0;const g=u.endsWith(".css"),f=g?'[rel="stylesheet"]':"";if(!!i)for(let k=r.length-1;k>=0;k--){const S=r[k];if(S.href===u&&(!g||S.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${f}`))return;const b=document.createElement("link");if(b.rel=g?"stylesheet":mc,g||(b.as="script"),b.crossOrigin="",b.href=u,l&&b.setAttribute("nonce",l),document.head.appendChild(b),g)return new Promise((k,S)=>{b.addEventListener("load",k),b.addEventListener("error",()=>S(new Error(`Unable to preload CSS for ${u}`)))})}))}function o(a){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=a,window.dispatchEvent(r),!r.defaultPrevented)throw a}return s.then(a=>{for(const r of a||[])r.status==="rejected"&&o(r.reason);return t().catch(o)})},bc={common:{health:"Health",ok:"OK",offline:"Offline",connect:"Connect",refresh:"Refresh",enabled:"Enabled",disabled:"Disabled",na:"n/a",docs:"Docs",resources:"Resources"},nav:{chat:"Chat",control:"Control",agent:"Agent",settings:"Settings",expand:"Expand sidebar",collapse:"Collapse sidebar"},tabs:{agents:"Agents",overview:"Overview",channels:"Business Knowledge",instances:"Out of Stock",sessions:"Sessions",work:"Work",cron:"Cron Jobs",skills:"Skills",nodes:"Nodes",chat:"Chat",config:"Config",debug:"Debug",logs:"Logs"},subtitles:{agents:"Manage agent workspaces, tools, and identities.",overview:"Gateway status, entry points, and a fast health read.",channels:"Edit wanding_business_knowledge.md for selection and matching.",instances:"OOS dashboard: stats and product list without asking the agent.",sessions:"Inspect active sessions and adjust per-session defaults.",work:"Batch quotation: upload files, plan, fill and OOS register.",cron:"Schedule wakeups and recurring agent runs.",skills:"Manage skill availability and API key injection.",nodes:"Paired devices, capabilities, and command exposure.",chat:"Direct gateway chat session for quick interventions.",config:"Edit ~/.openclaw/openclaw.json safely.",debug:"Gateway snapshots, events, and manual RPC calls.",logs:"Live tail of the gateway file logs."},overview:{access:{title:"Gateway Access",subtitle:"Where the dashboard connects and how it authenticates.",wsUrl:"WebSocket URL",token:"Gateway Token",password:"Password (not stored)",sessionKey:"Default Session Key",language:"Language",connectHint:"Click Connect to apply connection changes.",trustedProxy:"Authenticated via trusted proxy."},snapshot:{title:"Snapshot",subtitle:"Latest gateway handshake information.",status:"Status",uptime:"Uptime",tickInterval:"Tick Interval",lastChannelsRefresh:"Last Channels Refresh",channelsHint:"Use Channels to link WhatsApp, Telegram, Discord, Signal, or iMessage."},stats:{instances:"Instances",instancesHint:"Presence beacons in the last 5 minutes.",sessions:"Sessions",sessionsHint:"Recent session keys tracked by the gateway.",cron:"Cron",cronNext:"Next wake {time}"},notes:{title:"Notes",subtitle:"Quick reminders for remote control setups.",tailscaleTitle:"Tailscale serve",tailscaleText:"Prefer serve mode to keep the gateway on loopback with tailnet auth.",sessionTitle:"Session hygiene",sessionText:"Use /new or sessions.patch to reset context.",cronTitle:"Cron reminders",cronText:"Use isolated sessions for recurring runs."},auth:{required:"This gateway requires auth. Add a token or password, then click Connect.",failed:"Auth failed. Re-copy a tokenized URL with {command}, or update the token, then click Connect."},insecure:{hint:"This page is HTTP, so the browser blocks device identity. Use HTTPS (Tailscale Serve) or open {url} on the gateway host.",stayHttp:"If you must stay on HTTP, set {config} (token-only)."}},chat:{disconnected:"Disconnected from gateway.",refreshTitle:"Refresh chat data",thinkingToggle:"Toggle assistant thinking/working output",focusToggle:"Toggle focus mode (hide sidebar + page header)",onboardingDisabled:"Disabled during onboarding"},languages:{en:"English",zhCN:"简体中文 (Simplified Chinese)",zhTW:"繁體中文 (Traditional Chinese)",ptBR:"Português (Brazilian Portuguese)"}},wc=["en","zh-CN","zh-TW","pt-BR"];function ks(e){return e!=null&&wc.includes(e)}class $c{constructor(){this.locale="en",this.translations={en:bc},this.subscribers=new Set,this.loadLocale()}loadLocale(){const t=localStorage.getItem("openclaw.i18n.locale");if(ks(t))this.locale=t;else{const n=navigator.language;n.startsWith("zh")?this.locale=n==="zh-TW"||n==="zh-HK"?"zh-TW":"zh-CN":n.startsWith("pt")?this.locale="pt-BR":this.locale="en"}}getLocale(){return this.locale}async setLocale(t){if(this.locale!==t){if(!this.translations[t])try{let n;if(t==="zh-CN")n=await Si(()=>import("./zh-CN-BTDGrWww.js"),[],import.meta.url);else if(t==="zh-TW")n=await Si(()=>import("./zh-TW-B7H4kk0G.js"),[],import.meta.url);else if(t==="pt-BR")n=await Si(()=>import("./pt-BR-CAUgEH0a.js"),[],import.meta.url);else return;this.translations[t]=n[t.replace("-","_")]}catch(n){console.error(`Failed to load locale: ${t}`,n);return}this.locale=t,localStorage.setItem("openclaw.i18n.locale",t),this.notify()}}registerTranslation(t,n){this.translations[t]=n}subscribe(t){return this.subscribers.add(t),()=>this.subscribers.delete(t)}notify(){this.subscribers.forEach(t=>t(this.locale))}t(t,n){const i=t.split(".");let s=this.translations[this.locale]||this.translations.en;for(const o of i)if(s&&typeof s=="object")s=s[o];else{s=void 0;break}if(s===void 0&&this.locale!=="en"){s=this.translations.en;for(const o of i)if(s&&typeof s=="object")s=s[o];else{s=void 0;break}}return typeof s!="string"?t:n?s.replace(/\{(\w+)\}/g,(o,a)=>n[a]||`{${a}}`):s}}const tn=new $c,T=(e,t)=>tn.t(e,t);class kc{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){this.unsubscribe=tn.subscribe(()=>{this.host.requestUpdate()})}hostDisconnected(){var t;(t=this.unsubscribe)==null||t.call(this)}}async function me(e,t){if(!(!e.client||!e.connected)&&!e.channelsLoading){e.channelsLoading=!0,e.channelsError=null;try{const n=await e.client.request("channels.status",{probe:t,timeoutMs:8e3});e.channelsSnapshot=n,e.channelsLastSuccess=Date.now()}catch(n){e.channelsError=String(n)}finally{e.channelsLoading=!1}}}async function xc(e,t){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const n=await e.client.request("web.login.start",{force:t,timeoutMs:3e4});e.whatsappLoginMessage=n.message??null,e.whatsappLoginQrDataUrl=n.qrDataUrl??null,e.whatsappLoginConnected=null}catch(n){e.whatsappLoginMessage=String(n),e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function Sc(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const t=await e.client.request("web.login.wait",{timeoutMs:12e4});e.whatsappLoginMessage=t.message??null,e.whatsappLoginConnected=t.connected??null,t.connected&&(e.whatsappLoginQrDataUrl=null)}catch(t){e.whatsappLoginMessage=String(t),e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function Ac(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{await e.client.request("channels.logout",{channel:"whatsapp"}),e.whatsappLoginMessage="Logged out.",e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}catch(t){e.whatsappLoginMessage=String(t)}finally{e.whatsappBusy=!1}}}function he(e){if(e)return Array.isArray(e.type)?e.type.filter(n=>n!=="null")[0]??e.type[0]:e.type}function ir(e){if(!e)return"";if(e.default!==void 0)return e.default;switch(he(e)){case"object":return{};case"array":return[];case"boolean":return!1;case"number":case"integer":return 0;case"string":return"";default:return""}}function xs(e){return e.filter(t=>typeof t=="string").join(".")}function ve(e,t){const n=xs(e),i=t[n];if(i)return i;const s=n.split(".");for(const[o,a]of Object.entries(t)){if(!o.includes("*"))continue;const r=o.split(".");if(r.length!==s.length)continue;let d=!0;for(let l=0;l<s.length;l+=1)if(r[l]!=="*"&&r[l]!==s[l]){d=!1;break}if(d)return a}}function Ne(e){return e.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/\s+/g," ").replace(/^./,t=>t.toUpperCase())}function Do(e,t){const n=e.trim();if(n==="")return;const i=Number(n);return!Number.isFinite(i)||t&&!Number.isInteger(i)?e:i}function Oo(e){const t=e.trim();return t==="true"?!0:t==="false"?!1:e}function je(e,t){if(e==null)return e;if(t.allOf&&t.allOf.length>0){let i=e;for(const s of t.allOf)i=je(i,s);return i}const n=he(t);if(t.anyOf||t.oneOf){const i=(t.anyOf??t.oneOf??[]).filter(s=>!(s.type==="null"||Array.isArray(s.type)&&s.type.includes("null")));if(i.length===1)return je(e,i[0]);if(typeof e=="string")for(const s of i){const o=he(s);if(o==="number"||o==="integer"){const a=Do(e,o==="integer");if(a===void 0||typeof a=="number")return a}if(o==="boolean"){const a=Oo(e);if(typeof a=="boolean")return a}}for(const s of i){const o=he(s);if(o==="object"&&typeof e=="object"&&!Array.isArray(e)||o==="array"&&Array.isArray(e))return je(e,s)}return e}if(n==="number"||n==="integer"){if(typeof e=="string"){const i=Do(e,n==="integer");if(i===void 0||typeof i=="number")return i}return e}if(n==="boolean"){if(typeof e=="string"){const i=Oo(e);if(typeof i=="boolean")return i}return e}if(n==="object"){if(typeof e!="object"||Array.isArray(e))return e;const i=e,s=t.properties??{},o=t.additionalProperties&&typeof t.additionalProperties=="object"?t.additionalProperties:null,a={};for(const[r,d]of Object.entries(i)){const l=s[r]??o,u=l?je(d,l):d;u!==void 0&&(a[r]=u)}return a}if(n==="array"){if(!Array.isArray(e))return e;if(Array.isArray(t.items)){const s=t.items;return e.map((o,a)=>{const r=a<s.length?s[a]:void 0;return r?je(o,r):o})}const i=t.items;return i?e.map(s=>je(s,i)).filter(s=>s!==void 0):e}return e}function rt(e){return typeof structuredClone=="function"?structuredClone(e):JSON.parse(JSON.stringify(e))}function nn(e){return`${JSON.stringify(e,null,2).trimEnd()}
`}function sr(e,t,n){if(t.length===0)return;let i=e;for(let o=0;o<t.length-1;o+=1){const a=t[o],r=t[o+1];if(typeof a=="number"){if(!Array.isArray(i))return;i[a]==null&&(i[a]=typeof r=="number"?[]:{}),i=i[a]}else{if(typeof i!="object"||i==null)return;const d=i;d[a]==null&&(d[a]=typeof r=="number"?[]:{}),i=d[a]}}const s=t[t.length-1];if(typeof s=="number"){Array.isArray(i)&&(i[s]=n);return}typeof i=="object"&&i!=null&&(i[s]=n)}function or(e,t){if(t.length===0)return;let n=e;for(let s=0;s<t.length-1;s+=1){const o=t[s];if(typeof o=="number"){if(!Array.isArray(n))return;n=n[o]}else{if(typeof n!="object"||n==null)return;n=n[o]}if(n==null)return}const i=t[t.length-1];if(typeof i=="number"){Array.isArray(n)&&n.splice(i,1);return}typeof n=="object"&&n!=null&&delete n[i]}async function Ee(e){if(!(!e.client||!e.connected)){e.configLoading=!0,e.lastError=null;try{const t=await e.client.request("config.get",{});Tc(e,t)}catch(t){e.lastError=String(t)}finally{e.configLoading=!1}}}async function _c(e){if(!(!e.client||!e.connected)&&!e.configSchemaLoading){e.configSchemaLoading=!0;try{const t=await e.client.request("config.schema",{});Cc(e,t)}catch(t){e.lastError=String(t)}finally{e.configSchemaLoading=!1}}}function Cc(e,t){e.configSchema=t.schema??null,e.configUiHints=t.uiHints??{},e.configSchemaVersion=t.version??null}function Tc(e,t){e.configSnapshot=t;const n=typeof t.raw=="string"?t.raw:t.config&&typeof t.config=="object"?nn(t.config):e.configRaw;!e.configFormDirty||e.configFormMode==="raw"?e.configRaw=n:e.configForm?e.configRaw=nn(e.configForm):e.configRaw=n,e.configValid=typeof t.valid=="boolean"?t.valid:null,e.configIssues=Array.isArray(t.issues)?t.issues:[],e.configFormDirty||(e.configForm=rt(t.config??{}),e.configFormOriginal=rt(t.config??{}),e.configRawOriginal=n)}function Ec(e){return!e||typeof e!="object"||Array.isArray(e)?null:e}function ar(e){if(e.configFormMode!=="form"||!e.configForm)return e.configRaw;const t=Ec(e.configSchema),n=t?je(e.configForm,t):e.configForm;return nn(n)}async function En(e){var t;if(!(!e.client||!e.connected)){e.configSaving=!0,e.lastError=null;try{const n=ar(e),i=(t=e.configSnapshot)==null?void 0:t.hash;if(!i){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.set",{raw:n,baseHash:i}),e.configFormDirty=!1,await Ee(e)}catch(n){e.lastError=String(n)}finally{e.configSaving=!1}}}async function Lc(e){var t;if(!(!e.client||!e.connected)){e.configApplying=!0,e.lastError=null;try{const n=ar(e),i=(t=e.configSnapshot)==null?void 0:t.hash;if(!i){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.apply",{raw:n,baseHash:i,sessionKey:e.applySessionKey}),e.configFormDirty=!1,await Ee(e)}catch(n){e.lastError=String(n)}finally{e.configApplying=!1}}}async function Rc(e){if(!(!e.client||!e.connected)){e.updateRunning=!0,e.lastError=null;try{await e.client.request("update.run",{sessionKey:e.applySessionKey})}catch(t){e.lastError=String(t)}finally{e.updateRunning=!1}}}function pe(e,t,n){var s;const i=rt(e.configForm??((s=e.configSnapshot)==null?void 0:s.config)??{});sr(i,t,n),e.configForm=i,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=nn(i))}function Pe(e,t){var i;const n=rt(e.configForm??((i=e.configSnapshot)==null?void 0:i.config)??{});or(n,t),e.configForm=n,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=nn(n))}function Ic(e){const t={name:(e==null?void 0:e.name)??"",displayName:(e==null?void 0:e.displayName)??"",about:(e==null?void 0:e.about)??"",picture:(e==null?void 0:e.picture)??"",banner:(e==null?void 0:e.banner)??"",website:(e==null?void 0:e.website)??"",nip05:(e==null?void 0:e.nip05)??"",lud16:(e==null?void 0:e.lud16)??""};return{values:t,original:{...t},saving:!1,importing:!1,error:null,success:null,fieldErrors:{},showAdvanced:!!(e!=null&&e.banner||e!=null&&e.website||e!=null&&e.nip05||e!=null&&e.lud16)}}async function Mc(e,t){await xc(e,t),await me(e,!0)}async function Fc(e){await Sc(e),await me(e,!0)}async function Pc(e){await Ac(e),await me(e,!0)}async function Dc(e){await En(e),await Ee(e),await me(e,!0)}async function Oc(e){await Ee(e),await me(e,!0)}function Nc(e){if(!Array.isArray(e))return{};const t={};for(const n of e){if(typeof n!="string")continue;const[i,...s]=n.split(":");if(!i||s.length===0)continue;const o=i.trim(),a=s.join(":").trim();o&&a&&(t[o]=a)}return t}function rr(e){var n,i,s;return((s=(((i=(n=e.channelsSnapshot)==null?void 0:n.channelAccounts)==null?void 0:i.nostr)??[])[0])==null?void 0:s.accountId)??e.nostrProfileAccountId??"default"}function lr(e,t=""){return`/api/channels/nostr/${encodeURIComponent(e)}/profile${t}`}function Bc(e){var s,o,a;const t=(a=(o=(s=e.hello)==null?void 0:s.auth)==null?void 0:o.deviceToken)==null?void 0:a.trim();if(t)return`Bearer ${t}`;const n=e.settings.token.trim();if(n)return`Bearer ${n}`;const i=e.password.trim();return i?`Bearer ${i}`:null}function cr(e){const t=Bc(e);return t?{Authorization:t}:{}}function Uc(e,t,n){e.nostrProfileAccountId=t,e.nostrProfileFormState=Ic(n??void 0)}function zc(e){e.nostrProfileFormState=null,e.nostrProfileAccountId=null}function jc(e,t,n){const i=e.nostrProfileFormState;i&&(e.nostrProfileFormState={...i,values:{...i.values,[t]:n},fieldErrors:{...i.fieldErrors,[t]:""}})}function Kc(e){const t=e.nostrProfileFormState;t&&(e.nostrProfileFormState={...t,showAdvanced:!t.showAdvanced})}async function Hc(e){const t=e.nostrProfileFormState;if(!t||t.saving)return;const n=rr(e);e.nostrProfileFormState={...t,saving:!0,error:null,success:null,fieldErrors:{}};try{const i=await fetch(lr(n),{method:"PUT",headers:{"Content-Type":"application/json",...cr(e)},body:JSON.stringify(t.values)}),s=await i.json().catch(()=>null);if(!i.ok||(s==null?void 0:s.ok)===!1||!s){const o=(s==null?void 0:s.error)??`Profile update failed (${i.status})`;e.nostrProfileFormState={...t,saving:!1,error:o,success:null,fieldErrors:Nc(s==null?void 0:s.details)};return}if(!s.persisted){e.nostrProfileFormState={...t,saving:!1,error:"Profile publish failed on all relays.",success:null};return}e.nostrProfileFormState={...t,saving:!1,error:null,success:"Profile published to relays.",fieldErrors:{},original:{...t.values}},await me(e,!0)}catch(i){e.nostrProfileFormState={...t,saving:!1,error:`Profile update failed: ${String(i)}`,success:null}}}async function qc(e){const t=e.nostrProfileFormState;if(!t||t.importing)return;const n=rr(e);e.nostrProfileFormState={...t,importing:!0,error:null,success:null};try{const i=await fetch(lr(n,"/import"),{method:"POST",headers:{"Content-Type":"application/json",...cr(e)},body:JSON.stringify({autoMerge:!0})}),s=await i.json().catch(()=>null);if(!i.ok||(s==null?void 0:s.ok)===!1||!s){const d=(s==null?void 0:s.error)??`Profile import failed (${i.status})`;e.nostrProfileFormState={...t,importing:!1,error:d,success:null};return}const o=s.merged??s.imported??null,a=o?{...t.values,...o}:t.values,r=!!(a.banner||a.website||a.nip05||a.lud16);e.nostrProfileFormState={...t,importing:!1,values:a,error:null,success:s.saved?"Profile imported from relays. Review and publish.":"Profile imported. Review and publish.",showAdvanced:r},s.saved&&await me(e,!0)}catch(i){e.nostrProfileFormState={...t,importing:!1,error:`Profile import failed: ${String(i)}`,success:null}}}function dr(e){var o;const t=(e??"").trim();if(!t)return null;const n=t.split(":").filter(Boolean);if(n.length<3||n[0]!=="agent")return null;const i=(o=n[1])==null?void 0:o.trim(),s=n.slice(2).join(":");return!i||!s?null:{agentId:i,rest:s}}const Wi=450;function ln(e,t=!1,n=!1){e.chatScrollFrame&&cancelAnimationFrame(e.chatScrollFrame),e.chatScrollTimeout!=null&&(clearTimeout(e.chatScrollTimeout),e.chatScrollTimeout=null);const i=()=>{const s=e.querySelector(".chat-thread");if(s){const o=getComputedStyle(s).overflowY;if(o==="auto"||o==="scroll"||s.scrollHeight-s.clientHeight>1)return s}return document.scrollingElement??document.documentElement};e.updateComplete.then(()=>{e.chatScrollFrame=requestAnimationFrame(()=>{e.chatScrollFrame=null;const s=i();if(!s)return;const o=s.scrollHeight-s.scrollTop-s.clientHeight,a=t&&!e.chatHasAutoScrolled;if(!(a||e.chatUserNearBottom||o<Wi)){e.chatNewMessagesBelow=!0;return}a&&(e.chatHasAutoScrolled=!0);const d=n&&(typeof window>"u"||typeof window.matchMedia!="function"||!window.matchMedia("(prefers-reduced-motion: reduce)").matches),l=s.scrollHeight;typeof s.scrollTo=="function"?s.scrollTo({top:l,behavior:d?"smooth":"auto"}):s.scrollTop=l,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1;const u=a?150:120;e.chatScrollTimeout=window.setTimeout(()=>{e.chatScrollTimeout=null;const g=i();if(!g)return;const f=g.scrollHeight-g.scrollTop-g.clientHeight;(a||e.chatUserNearBottom||f<Wi)&&(g.scrollTop=g.scrollHeight,e.chatUserNearBottom=!0)},u)})})}function ur(e,t=!1){e.logsScrollFrame&&cancelAnimationFrame(e.logsScrollFrame),e.updateComplete.then(()=>{e.logsScrollFrame=requestAnimationFrame(()=>{e.logsScrollFrame=null;const n=e.querySelector(".log-stream");if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;(t||i<80)&&(n.scrollTop=n.scrollHeight)})})}function Gc(e,t){const n=t.currentTarget;if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;e.chatUserNearBottom=i<Wi,e.chatUserNearBottom&&(e.chatNewMessagesBelow=!1)}function Wc(e,t){const n=t.currentTarget;if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;e.logsAtBottom=i<80}function No(e){e.chatHasAutoScrolled=!1,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1}function Vc(e,t){if(e.length===0)return;const n=new Blob([`${e.join(`
`)}
`],{type:"text/plain"}),i=URL.createObjectURL(n),s=document.createElement("a"),o=new Date().toISOString().slice(0,19).replace(/[:T]/g,"-");s.href=i,s.download=`openclaw-logs-${t}-${o}.log`,s.click(),URL.revokeObjectURL(i)}function Qc(e){if(typeof ResizeObserver>"u")return;const t=e.querySelector(".topbar");if(!t)return;const n=()=>{const{height:i}=t.getBoundingClientRect();e.style.setProperty("--topbar-height",`${i}px`)};n(),e.topbarObserver=new ResizeObserver(()=>n()),e.topbarObserver.observe(t)}async function Vn(e){if(!(!e.client||!e.connected)&&!e.debugLoading){e.debugLoading=!0;try{const[t,n,i,s]=await Promise.all([e.client.request("status",{}),e.client.request("health",{}),e.client.request("models.list",{}),e.client.request("last-heartbeat",{})]);e.debugStatus=t,e.debugHealth=n;const o=i;e.debugModels=Array.isArray(o==null?void 0:o.models)?o==null?void 0:o.models:[],e.debugHeartbeat=s}catch(t){e.debugCallError=String(t)}finally{e.debugLoading=!1}}}async function Jc(e){if(!(!e.client||!e.connected)){e.debugCallError=null,e.debugCallResult=null;try{const t=e.debugCallParams.trim()?JSON.parse(e.debugCallParams):{},n=await e.client.request(e.debugCallMethod.trim(),t);e.debugCallResult=JSON.stringify(n,null,2)}catch(t){e.debugCallError=String(t)}}}const Yc=2e3,Xc=new Set(["trace","debug","info","warn","error","fatal"]);function Zc(e){if(typeof e!="string")return null;const t=e.trim();if(!t.startsWith("{")||!t.endsWith("}"))return null;try{const n=JSON.parse(t);return!n||typeof n!="object"?null:n}catch{return null}}function ed(e){if(typeof e!="string")return null;const t=e.toLowerCase();return Xc.has(t)?t:null}function td(e){if(!e.trim())return{raw:e,message:e};try{const t=JSON.parse(e),n=t&&typeof t._meta=="object"&&t._meta!==null?t._meta:null,i=typeof t.time=="string"?t.time:typeof(n==null?void 0:n.date)=="string"?n==null?void 0:n.date:null,s=ed((n==null?void 0:n.logLevelName)??(n==null?void 0:n.level)),o=typeof t[0]=="string"?t[0]:typeof(n==null?void 0:n.name)=="string"?n==null?void 0:n.name:null,a=Zc(o);let r=null;a&&(typeof a.subsystem=="string"?r=a.subsystem:typeof a.module=="string"&&(r=a.module)),!r&&o&&o.length<120&&(r=o);let d=null;return typeof t[1]=="string"?d=t[1]:!a&&typeof t[0]=="string"?d=t[0]:typeof t.message=="string"&&(d=t.message),{raw:e,time:i,level:s,subsystem:r,message:d??e,meta:n??void 0}}catch{return{raw:e,message:e}}}async function Ss(e,t){if(!(!e.client||!e.connected)&&!(e.logsLoading&&!(t!=null&&t.quiet))){t!=null&&t.quiet||(e.logsLoading=!0),e.logsError=null;try{const i=await e.client.request("logs.tail",{cursor:t!=null&&t.reset?void 0:e.logsCursor??void 0,limit:e.logsLimit,maxBytes:e.logsMaxBytes}),o=(Array.isArray(i.lines)?i.lines.filter(r=>typeof r=="string"):[]).map(td),a=!!(t!=null&&t.reset||i.reset||e.logsCursor==null);e.logsEntries=a?o:[...e.logsEntries,...o].slice(-Yc),typeof i.cursor=="number"&&(e.logsCursor=i.cursor),typeof i.file=="string"&&(e.logsFile=i.file),e.logsTruncated=!!i.truncated,e.logsLastFetchAt=Date.now()}catch(n){e.logsError=String(n)}finally{t!=null&&t.quiet||(e.logsLoading=!1)}}}async function Qn(e,t){if(!(!e.client||!e.connected)&&!e.nodesLoading){e.nodesLoading=!0,t!=null&&t.quiet||(e.lastError=null);try{const n=await e.client.request("node.list",{});e.nodes=Array.isArray(n.nodes)?n.nodes:[]}catch(n){t!=null&&t.quiet||(e.lastError=String(n))}finally{e.nodesLoading=!1}}}function nd(e){e.nodesPollInterval==null&&(e.nodesPollInterval=window.setInterval(()=>void Qn(e,{quiet:!0}),5e3))}function id(e){e.nodesPollInterval!=null&&(clearInterval(e.nodesPollInterval),e.nodesPollInterval=null)}function As(e){e.logsPollInterval==null&&(e.logsPollInterval=window.setInterval(()=>{e.tab==="logs"&&Ss(e,{quiet:!0})},2e3))}function _s(e){e.logsPollInterval!=null&&(clearInterval(e.logsPollInterval),e.logsPollInterval=null)}function Cs(e){e.debugPollInterval==null&&(e.debugPollInterval=window.setInterval(()=>{e.tab==="debug"&&Vn(e)},3e3))}function Ts(e){e.debugPollInterval!=null&&(clearInterval(e.debugPollInterval),e.debugPollInterval=null)}async function gr(e,t){if(!(!e.client||!e.connected||e.agentIdentityLoading)&&!e.agentIdentityById[t]){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{const n=await e.client.request("agent.identity.get",{agentId:t});n&&(e.agentIdentityById={...e.agentIdentityById,[t]:n})}catch(n){e.agentIdentityError=String(n)}finally{e.agentIdentityLoading=!1}}}async function fr(e,t){if(!e.client||!e.connected||e.agentIdentityLoading)return;const n=t.filter(i=>!e.agentIdentityById[i]);if(n.length!==0){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{for(const i of n){const s=await e.client.request("agent.identity.get",{agentId:i});s&&(e.agentIdentityById={...e.agentIdentityById,[i]:s})}}catch(i){e.agentIdentityError=String(i)}finally{e.agentIdentityLoading=!1}}}async function Ln(e,t){if(!(!e.client||!e.connected)&&!e.agentSkillsLoading){e.agentSkillsLoading=!0,e.agentSkillsError=null;try{const n=await e.client.request("skills.status",{agentId:t});n&&(e.agentSkillsReport=n,e.agentSkillsAgentId=t)}catch(n){e.agentSkillsError=String(n)}finally{e.agentSkillsLoading=!1}}}async function Es(e){var t;if(!(!e.client||!e.connected)&&!e.agentsLoading){e.agentsLoading=!0,e.agentsError=null;try{const n=await e.client.request("agents.list",{});if(n){e.agentsList=n;const i=e.agentsSelectedId,s=n.agents.some(o=>o.id===i);(!i||!s)&&(e.agentsSelectedId=n.defaultId??((t=n.agents[0])==null?void 0:t.id)??null)}}catch(n){e.agentsError=String(n)}finally{e.agentsLoading=!1}}}function Ls(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}async function sd(e){try{const n=await(await fetch(Ls(e.basePath,"/api/business-knowledge/dependent-files"))).json().catch(()=>({}));n.success&&n.data?e.bkDependentFiles={mapping_table:n.data.mapping_table??"",price_library:n.data.price_library??""}:e.bkDependentFiles=null}catch{e.bkDependentFiles=null}}async function pr(e){e.bkLoading=!0,e.bkError=null,sd(e);try{const t=await fetch(Ls(e.basePath,"/api/business-knowledge")),n=await t.json().catch(()=>({}));n.success&&n.data&&typeof n.data.content=="string"?e.bkContent=n.data.content:(e.bkContent="",t.ok||(e.bkError=n.detail??`HTTP ${t.status}`))}catch(t){e.bkError=t instanceof Error?t.message:String(t),e.bkContent=""}finally{e.bkLoading=!1}}async function od(e,t){e.bkSaving=!0,e.bkError=null;try{const n=await fetch(Ls(e.basePath,"/api/business-knowledge"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:t})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(e.bkContent=t,e.bkLastSuccess=Date.now(),!0):(e.bkError=i.detail??`HTTP ${n.status}`,!1)}catch(n){return e.bkError=n instanceof Error?n.message:String(n),!1}finally{e.bkSaving=!1}}function hr(e){if(e==null||!Number.isFinite(e))return"n/a";const t=Math.floor(e/1e3),n=Math.floor(t/60),i=Math.floor(n/60);return i>0?`${i}h`:n>0?`${n}m`:t>0?`${t}s`:"<1s"}function Be(e){if(e==null||!Number.isFinite(e))return"n/a";const t=Date.now(),n=e-t,i=Math.abs(n),s=Math.floor(i/6e4),o=Math.floor(s/60),a=Math.floor(o/24);return n>0?s<1?"in <1m":s<60?`in ${s}m`:o<24?`in ${o}h`:`in ${a}d`:i<15e3?"just now":s<60?`${s}m ago`:o<24?`${o}h ago`:`${a}d ago`}function ad(e,t){return!e||typeof e!="string"?"":e.replace(/<think>[\s\S]*?<\/think>/gi,"").trim()}function lt(e){return!e&&e!==0?"n/a":new Date(e).toLocaleString()}function Vi(e){return!e||e.length===0?"none":e.filter(t=>!!(t&&t.trim())).join(", ")}function Qi(e,t=120){return e.length<=t?e:`${e.slice(0,Math.max(0,t-1))}…`}function vr(e,t){return e.length<=t?{text:e,truncated:!1,total:e.length}:{text:e.slice(0,Math.max(0,t)),truncated:!0,total:e.length}}function On(e,t){const n=Number(e);return Number.isFinite(n)?n:t}function Ai(e){return ad(e)}function rd(e){return e.sessionTarget==="isolated"&&e.payloadKind==="agentTurn"}function mr(e){return e.deliveryMode!=="announce"||rd(e)?e:{...e,deliveryMode:"none"}}async function cn(e){if(!(!e.client||!e.connected))try{const t=await e.client.request("cron.status",{});e.cronStatus=t}catch(t){e.cronError=String(t)}}async function Jn(e){if(!(!e.client||!e.connected)&&!e.cronLoading){e.cronLoading=!0,e.cronError=null;try{const t=await e.client.request("cron.list",{includeDisabled:!0});e.cronJobs=Array.isArray(t.jobs)?t.jobs:[]}catch(t){e.cronError=String(t)}finally{e.cronLoading=!1}}}function ld(e){if(e.scheduleKind==="at"){const n=Date.parse(e.scheduleAt);if(!Number.isFinite(n))throw new Error("Invalid run time.");return{kind:"at",at:new Date(n).toISOString()}}if(e.scheduleKind==="every"){const n=On(e.everyAmount,0);if(n<=0)throw new Error("Invalid interval amount.");const i=e.everyUnit;return{kind:"every",everyMs:n*(i==="minutes"?6e4:i==="hours"?36e5:864e5)}}const t=e.cronExpr.trim();if(!t)throw new Error("Cron expression required.");return{kind:"cron",expr:t,tz:e.cronTz.trim()||void 0}}function cd(e){if(e.payloadKind==="systemEvent"){const s=e.payloadText.trim();if(!s)throw new Error("System event text required.");return{kind:"systemEvent",text:s}}const t=e.payloadText.trim();if(!t)throw new Error("Agent message required.");const n={kind:"agentTurn",message:t},i=On(e.timeoutSeconds,0);return i>0&&(n.timeoutSeconds=i),n}async function dd(e){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{const t=mr(e.cronForm);t!==e.cronForm&&(e.cronForm=t);const n=ld(t),i=cd(t),s=t.deliveryMode,o=s&&s!=="none"?{mode:s,channel:s==="announce"?t.deliveryChannel.trim()||"last":void 0,to:t.deliveryTo.trim()||void 0}:void 0,a=t.agentId.trim(),r={name:t.name.trim(),description:t.description.trim()||void 0,agentId:a||void 0,enabled:t.enabled,schedule:n,sessionTarget:t.sessionTarget,wakeMode:t.wakeMode,payload:i,delivery:o};if(!r.name)throw new Error("Name required.");await e.client.request("cron.add",r),e.cronForm={...e.cronForm,name:"",description:"",payloadText:""},await Jn(e),await cn(e)}catch(t){e.cronError=String(t)}finally{e.cronBusy=!1}}}async function ud(e,t,n){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{await e.client.request("cron.update",{id:t.id,patch:{enabled:n}}),await Jn(e),await cn(e)}catch(i){e.cronError=String(i)}finally{e.cronBusy=!1}}}async function gd(e,t){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{await e.client.request("cron.run",{id:t.id,mode:"force"}),await yr(e,t.id)}catch(n){e.cronError=String(n)}finally{e.cronBusy=!1}}}async function fd(e,t){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{await e.client.request("cron.remove",{id:t.id}),e.cronRunsJobId===t.id&&(e.cronRunsJobId=null,e.cronRuns=[]),await Jn(e),await cn(e)}catch(n){e.cronError=String(n)}finally{e.cronBusy=!1}}}async function yr(e,t){if(!(!e.client||!e.connected))try{const n=await e.client.request("cron.runs",{id:t,limit:50});e.cronRunsJobId=t,e.cronRuns=Array.isArray(n.entries)?n.entries:[]}catch(n){e.cronError=String(n)}}function Rs(e){return(e??"").trim().toLowerCase()||"viewer"}function pd(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").map(t=>t.trim()).filter(Boolean):[]}const br="openclaw.device.auth.v1";function Is(){try{const e=window.localStorage.getItem(br);if(!e)return null;const t=JSON.parse(e);return!t||t.version!==1||!t.deviceId||typeof t.deviceId!="string"||!t.tokens||typeof t.tokens!="object"?null:t}catch{return null}}function wr(e){try{window.localStorage.setItem(br,JSON.stringify(e))}catch{}}function hd(e){const t=Is();if(!t||t.deviceId!==e.deviceId)return null;const n=Rs(e.role),i=t.tokens[n];return!i||typeof i.token!="string"?null:i}function $r(e){const t=Rs(e.role),n={version:1,deviceId:e.deviceId,tokens:{}},i=Is();i&&i.deviceId===e.deviceId&&(n.tokens={...i.tokens});const s={token:e.token,role:t,scopes:pd(e.scopes),updatedAtMs:Date.now()};return n.tokens[t]=s,wr(n),s}function kr(e){const t=Is();if(!t||t.deviceId!==e.deviceId)return;const n=Rs(e.role);if(!t.tokens[n])return;const i={...t,tokens:{...t.tokens}};delete i.tokens[n],wr(i)}/*! noble-ed25519 - MIT License (c) 2019 Paul Miller (paulmillr.com) */const xr={p:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffedn,n:0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn,h:8n,a:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffecn,d:0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3n,Gx:0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an,Gy:0x6666666666666666666666666666666666666666666666666666666666666658n},{p:re,n:Rn,Gx:Bo,Gy:Uo,a:_i,d:Ci,h:vd}=xr,ct=32,Ms=64,md=(...e)=>{"captureStackTrace"in Error&&typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(...e)},ne=(e="")=>{const t=new Error(e);throw md(t,ne),t},yd=e=>typeof e=="bigint",bd=e=>typeof e=="string",wd=e=>e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array",Ve=(e,t,n="")=>{const i=wd(e),s=e==null?void 0:e.length,o=t!==void 0;if(!i||o&&s!==t){const a=n&&`"${n}" `,r=o?` of length ${t}`:"",d=i?`length=${s}`:`type=${typeof e}`;ne(a+"expected Uint8Array"+r+", got "+d)}return e},Yn=e=>new Uint8Array(e),Sr=e=>Uint8Array.from(e),Ar=(e,t)=>e.toString(16).padStart(t,"0"),_r=e=>Array.from(Ve(e)).map(t=>Ar(t,2)).join(""),De={_0:48,_9:57,A:65,F:70,a:97,f:102},zo=e=>{if(e>=De._0&&e<=De._9)return e-De._0;if(e>=De.A&&e<=De.F)return e-(De.A-10);if(e>=De.a&&e<=De.f)return e-(De.a-10)},Cr=e=>{const t="hex invalid";if(!bd(e))return ne(t);const n=e.length,i=n/2;if(n%2)return ne(t);const s=Yn(i);for(let o=0,a=0;o<i;o++,a+=2){const r=zo(e.charCodeAt(a)),d=zo(e.charCodeAt(a+1));if(r===void 0||d===void 0)return ne(t);s[o]=r*16+d}return s},Tr=()=>globalThis==null?void 0:globalThis.crypto,$d=()=>{var e;return((e=Tr())==null?void 0:e.subtle)??ne("crypto.subtle must be defined, consider polyfill")},sn=(...e)=>{const t=Yn(e.reduce((i,s)=>i+Ve(s).length,0));let n=0;return e.forEach(i=>{t.set(i,n),n+=i.length}),t},kd=(e=ct)=>Tr().getRandomValues(Yn(e)),Nn=BigInt,tt=(e,t,n,i="bad number: out of range")=>yd(e)&&t<=e&&e<n?e:ne(i),I=(e,t=re)=>{const n=e%t;return n>=0n?n:t+n},Er=e=>I(e,Rn),xd=(e,t)=>{(e===0n||t<=0n)&&ne("no inverse n="+e+" mod="+t);let n=I(e,t),i=t,s=0n,o=1n;for(;n!==0n;){const a=i/n,r=i%n,d=s-o*a;i=n,n=r,s=o,o=d}return i===1n?I(s,t):ne("no inverse")},Sd=e=>{const t=Mr[e];return typeof t!="function"&&ne("hashes."+e+" not set"),t},Ti=e=>e instanceof dt?e:ne("Point expected"),Ji=2n**256n,Te=class Te{constructor(t,n,i,s){W(this,"X");W(this,"Y");W(this,"Z");W(this,"T");const o=Ji;this.X=tt(t,0n,o),this.Y=tt(n,0n,o),this.Z=tt(i,1n,o),this.T=tt(s,0n,o),Object.freeze(this)}static CURVE(){return xr}static fromAffine(t){return new Te(t.x,t.y,1n,I(t.x*t.y))}static fromBytes(t,n=!1){const i=Ci,s=Sr(Ve(t,ct)),o=t[31];s[31]=o&-129;const a=Rr(s);tt(a,0n,n?Ji:re);const d=I(a*a),l=I(d-1n),u=I(i*d+1n);let{isValid:g,value:f}=_d(l,u);g||ne("bad point: y not sqrt");const m=(f&1n)===1n,b=(o&128)!==0;return!n&&f===0n&&b&&ne("bad point: x==0, isLastByteOdd"),b!==m&&(f=I(-f)),new Te(f,a,1n,I(f*a))}static fromHex(t,n){return Te.fromBytes(Cr(t),n)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}assertValidity(){const t=_i,n=Ci,i=this;if(i.is0())return ne("bad point: ZERO");const{X:s,Y:o,Z:a,T:r}=i,d=I(s*s),l=I(o*o),u=I(a*a),g=I(u*u),f=I(d*t),m=I(u*I(f+l)),b=I(g+I(n*I(d*l)));if(m!==b)return ne("bad point: equation left != right (1)");const k=I(s*o),S=I(a*r);return k!==S?ne("bad point: equation left != right (2)"):this}equals(t){const{X:n,Y:i,Z:s}=this,{X:o,Y:a,Z:r}=Ti(t),d=I(n*r),l=I(o*s),u=I(i*r),g=I(a*s);return d===l&&u===g}is0(){return this.equals(_t)}negate(){return new Te(I(-this.X),this.Y,this.Z,I(-this.T))}double(){const{X:t,Y:n,Z:i}=this,s=_i,o=I(t*t),a=I(n*n),r=I(2n*I(i*i)),d=I(s*o),l=t+n,u=I(I(l*l)-o-a),g=d+a,f=g-r,m=d-a,b=I(u*f),k=I(g*m),S=I(u*m),_=I(f*g);return new Te(b,k,_,S)}add(t){const{X:n,Y:i,Z:s,T:o}=this,{X:a,Y:r,Z:d,T:l}=Ti(t),u=_i,g=Ci,f=I(n*a),m=I(i*r),b=I(o*g*l),k=I(s*d),S=I((n+i)*(a+r)-f-m),_=I(k-b),F=I(k+b),L=I(m-u*f),R=I(S*_),x=I(F*L),P=I(S*L),j=I(_*F);return new Te(R,x,j,P)}subtract(t){return this.add(Ti(t).negate())}multiply(t,n=!0){if(!n&&(t===0n||this.is0()))return _t;if(tt(t,1n,Rn),t===1n)return this;if(this.equals(ut))return Od(t).p;let i=_t,s=ut;for(let o=this;t>0n;o=o.double(),t>>=1n)t&1n?i=i.add(o):n&&(s=s.add(o));return i}multiplyUnsafe(t){return this.multiply(t,!1)}toAffine(){const{X:t,Y:n,Z:i}=this;if(this.equals(_t))return{x:0n,y:1n};const s=xd(i,re);I(i*s)!==1n&&ne("invalid inverse");const o=I(t*s),a=I(n*s);return{x:o,y:a}}toBytes(){const{x:t,y:n}=this.assertValidity().toAffine(),i=Lr(n);return i[31]|=t&1n?128:0,i}toHex(){return _r(this.toBytes())}clearCofactor(){return this.multiply(Nn(vd),!1)}isSmallOrder(){return this.clearCofactor().is0()}isTorsionFree(){let t=this.multiply(Rn/2n,!1).double();return Rn%2n&&(t=t.add(this)),t.is0()}};W(Te,"BASE"),W(Te,"ZERO");let dt=Te;const ut=new dt(Bo,Uo,1n,I(Bo*Uo)),_t=new dt(0n,1n,1n,0n);dt.BASE=ut;dt.ZERO=_t;const Lr=e=>Cr(Ar(tt(e,0n,Ji),Ms)).reverse(),Rr=e=>Nn("0x"+_r(Sr(Ve(e)).reverse())),Ae=(e,t)=>{let n=e;for(;t-- >0n;)n*=n,n%=re;return n},Ad=e=>{const n=e*e%re*e%re,i=Ae(n,2n)*n%re,s=Ae(i,1n)*e%re,o=Ae(s,5n)*s%re,a=Ae(o,10n)*o%re,r=Ae(a,20n)*a%re,d=Ae(r,40n)*r%re,l=Ae(d,80n)*d%re,u=Ae(l,80n)*d%re,g=Ae(u,10n)*o%re;return{pow_p_5_8:Ae(g,2n)*e%re,b2:n}},jo=0x2b8324804fc1df0b2b4d00993dfbd7a72f431806ad2fe478c4ee1b274a0ea0b0n,_d=(e,t)=>{const n=I(t*t*t),i=I(n*n*t),s=Ad(e*i).pow_p_5_8;let o=I(e*n*s);const a=I(t*o*o),r=o,d=I(o*jo),l=a===e,u=a===I(-e),g=a===I(-e*jo);return l&&(o=r),(u||g)&&(o=d),(I(o)&1n)===1n&&(o=I(-o)),{isValid:l||u,value:o}},Yi=e=>Er(Rr(e)),Fs=(...e)=>Mr.sha512Async(sn(...e)),Cd=(...e)=>Sd("sha512")(sn(...e)),Ir=e=>{const t=e.slice(0,ct);t[0]&=248,t[31]&=127,t[31]|=64;const n=e.slice(ct,Ms),i=Yi(t),s=ut.multiply(i),o=s.toBytes();return{head:t,prefix:n,scalar:i,point:s,pointBytes:o}},Ps=e=>Fs(Ve(e,ct)).then(Ir),Td=e=>Ir(Cd(Ve(e,ct))),Ed=e=>Ps(e).then(t=>t.pointBytes),Ld=e=>Fs(e.hashable).then(e.finish),Rd=(e,t,n)=>{const{pointBytes:i,scalar:s}=e,o=Yi(t),a=ut.multiply(o).toBytes();return{hashable:sn(a,i,n),finish:l=>{const u=Er(o+Yi(l)*s);return Ve(sn(a,Lr(u)),Ms)}}},Id=async(e,t)=>{const n=Ve(e),i=await Ps(t),s=await Fs(i.prefix,n);return Ld(Rd(i,s,n))},Mr={sha512Async:async e=>{const t=$d(),n=sn(e);return Yn(await t.digest("SHA-512",n.buffer))},sha512:void 0},Md=(e=kd(ct))=>e,Fd={getExtendedPublicKeyAsync:Ps,getExtendedPublicKey:Td,randomSecretKey:Md},Bn=8,Pd=256,Fr=Math.ceil(Pd/Bn)+1,Xi=2**(Bn-1),Dd=()=>{const e=[];let t=ut,n=t;for(let i=0;i<Fr;i++){n=t,e.push(n);for(let s=1;s<Xi;s++)n=n.add(t),e.push(n);t=n.double()}return e};let Ko;const Ho=(e,t)=>{const n=t.negate();return e?n:t},Od=e=>{const t=Ko||(Ko=Dd());let n=_t,i=ut;const s=2**Bn,o=s,a=Nn(s-1),r=Nn(Bn);for(let d=0;d<Fr;d++){let l=Number(e&a);e>>=r,l>Xi&&(l-=o,e+=1n);const u=d*Xi,g=u,f=u+Math.abs(l)-1,m=d%2!==0,b=l<0;l===0?i=i.add(Ho(m,t[g])):n=n.add(Ho(b,t[f]))}return e!==0n&&ne("invalid wnaf"),{p:n,f:i}},Ei="openclaw-device-identity-v1";function Zi(e){let t="";for(const n of e)t+=String.fromCharCode(n);return btoa(t).replaceAll("+","-").replaceAll("/","_").replace(/=+$/g,"")}function Pr(e){const t=e.replaceAll("-","+").replaceAll("_","/"),n=t+"=".repeat((4-t.length%4)%4),i=atob(n),s=new Uint8Array(i.length);for(let o=0;o<i.length;o+=1)s[o]=i.charCodeAt(o);return s}function Nd(e){return Array.from(e).map(t=>t.toString(16).padStart(2,"0")).join("")}async function Dr(e){const t=await crypto.subtle.digest("SHA-256",e.slice().buffer);return Nd(new Uint8Array(t))}async function Bd(){const e=Fd.randomSecretKey(),t=await Ed(e);return{deviceId:await Dr(t),publicKey:Zi(t),privateKey:Zi(e)}}async function Ds(){try{const n=localStorage.getItem(Ei);if(n){const i=JSON.parse(n);if((i==null?void 0:i.version)===1&&typeof i.deviceId=="string"&&typeof i.publicKey=="string"&&typeof i.privateKey=="string"){const s=await Dr(Pr(i.publicKey));if(s!==i.deviceId){const o={...i,deviceId:s};return localStorage.setItem(Ei,JSON.stringify(o)),{deviceId:s,publicKey:i.publicKey,privateKey:i.privateKey}}return{deviceId:i.deviceId,publicKey:i.publicKey,privateKey:i.privateKey}}}}catch{}const e=await Bd(),t={version:1,deviceId:e.deviceId,publicKey:e.publicKey,privateKey:e.privateKey,createdAtMs:Date.now()};return localStorage.setItem(Ei,JSON.stringify(t)),e}async function Ud(e,t){const n=Pr(e),i=new TextEncoder().encode(t),s=await Id(i,n);return Zi(s)}async function Qe(e,t){if(!(!e.client||!e.connected)&&!e.devicesLoading){e.devicesLoading=!0,t!=null&&t.quiet||(e.devicesError=null);try{const n=await e.client.request("device.pair.list",{});e.devicesList={pending:Array.isArray(n==null?void 0:n.pending)?n.pending:[],paired:Array.isArray(n==null?void 0:n.paired)?n.paired:[]}}catch(n){t!=null&&t.quiet||(e.devicesError=String(n))}finally{e.devicesLoading=!1}}}async function zd(e,t){if(!(!e.client||!e.connected))try{await e.client.request("device.pair.approve",{requestId:t}),await Qe(e)}catch(n){e.devicesError=String(n)}}async function jd(e,t){if(!(!e.client||!e.connected||!window.confirm("Reject this device pairing request?")))try{await e.client.request("device.pair.reject",{requestId:t}),await Qe(e)}catch(i){e.devicesError=String(i)}}async function Kd(e,t){if(!(!e.client||!e.connected))try{const n=await e.client.request("device.token.rotate",t);if(n!=null&&n.token){const i=await Ds(),s=n.role??t.role;(n.deviceId===i.deviceId||t.deviceId===i.deviceId)&&$r({deviceId:i.deviceId,role:s,token:n.token,scopes:n.scopes??t.scopes??[]}),window.prompt("New device token (copy and store securely):",n.token)}await Qe(e)}catch(n){e.devicesError=String(n)}}async function Hd(e,t){if(!(!e.client||!e.connected||!window.confirm(`Revoke token for ${t.deviceId} (${t.role})?`)))try{await e.client.request("device.token.revoke",t);const i=await Ds();t.deviceId===i.deviceId&&kr({deviceId:i.deviceId,role:t.role}),await Qe(e)}catch(i){e.devicesError=String(i)}}function qd(e){if(!e||e.kind==="gateway")return{method:"exec.approvals.get",params:{}};const t=e.nodeId.trim();return t?{method:"exec.approvals.node.get",params:{nodeId:t}}:null}function Gd(e,t){if(!e||e.kind==="gateway")return{method:"exec.approvals.set",params:t};const n=e.nodeId.trim();return n?{method:"exec.approvals.node.set",params:{...t,nodeId:n}}:null}async function Os(e,t){if(!(!e.client||!e.connected)&&!e.execApprovalsLoading){e.execApprovalsLoading=!0,e.lastError=null;try{const n=qd(t);if(!n){e.lastError="Select a node before loading exec approvals.";return}const i=await e.client.request(n.method,n.params);Wd(e,i)}catch(n){e.lastError=String(n)}finally{e.execApprovalsLoading=!1}}}function Wd(e,t){e.execApprovalsSnapshot=t,e.execApprovalsDirty||(e.execApprovalsForm=rt(t.file??{}))}async function Vd(e,t){var n,i;if(!(!e.client||!e.connected)){e.execApprovalsSaving=!0,e.lastError=null;try{const s=(n=e.execApprovalsSnapshot)==null?void 0:n.hash;if(!s){e.lastError="Exec approvals hash missing; reload and retry.";return}const o=e.execApprovalsForm??((i=e.execApprovalsSnapshot)==null?void 0:i.file)??{},a=Gd(t,{file:o,baseHash:s});if(!a){e.lastError="Select a node before saving exec approvals.";return}await e.client.request(a.method,a.params),e.execApprovalsDirty=!1,await Os(e,t)}catch(s){e.lastError=String(s)}finally{e.execApprovalsSaving=!1}}}function Qd(e,t,n){var s;const i=rt(e.execApprovalsForm??((s=e.execApprovalsSnapshot)==null?void 0:s.file)??{});sr(i,t,n),e.execApprovalsForm=i,e.execApprovalsDirty=!0}function Jd(e,t){var i;const n=rt(e.execApprovalsForm??((i=e.execApprovalsSnapshot)==null?void 0:i.file)??{});or(n,t),e.execApprovalsForm=n,e.execApprovalsDirty=!0}function fe(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams;for(const[a,r]of Object.entries(n))o.set(a,String(r));return`${s}?${o.toString()}`}async function Xn(e,t){e.oosLoading=!0,e.oosError=null;try{const[s,o,a,r]=await Promise.all([fetch(fe(e.basePath,"/api/oos/stats")),fetch(fe(e.basePath,"/api/oos/list",{limit:100})),fetch(fe(e.basePath,"/api/oos/by-file",{limit:50})),fetch(fe(e.basePath,"/api/oos/by-time",{days:30}))]),d=await s.json().catch(()=>({})),l=await o.json().catch(()=>({})),u=await a.json().catch(()=>({})),g=await r.json().catch(()=>({}));d.success&&d.data?(e.oosStats=d.data,e.oosDb=d.db??null):(e.oosStats=null,s.ok||(e.oosError=d.detail??`stats: ${s.status}`)),l.success&&Array.isArray(l.data)?e.oosList=l.data:(e.oosList=[],!e.oosError&&!o.ok&&(e.oosError=l.detail??`list: ${o.status}`)),u.success&&Array.isArray(u.data)?e.oosByFile=u.data:e.oosByFile=[],g.success&&Array.isArray(g.data)?e.oosByTime=g.data:e.oosByTime=[]}catch(s){e.oosError=s instanceof Error?s.message:String(s),e.oosStats=null,e.oosList=[],e.oosByFile=[],e.oosByTime=[]}finally{e.oosLoading=!1}}async function Yd(e,t){if(!(t!=null&&t.trim()))return!1;try{const n=await fetch(fe(e.basePath,"/api/oos/delete"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_key:t.trim()})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(await Xn(e),!0):(e.oosError=i.detail??`删除失败: ${n.status}`,!1)}catch(n){return e.oosError=n instanceof Error?n.message:String(n),!1}}async function Xd(e,t){const n=(t.product_name||"").trim();if(!n)return!1;try{const i=await fetch(fe(e.basePath,"/api/oos/add"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_name:n,specification:(t.specification??"").trim(),quantity:t.quantity??0,unit:(t.unit??"").trim()})}),s=await i.json().catch(()=>({}));return i.ok&&s.success?(await Xn(e),!0):(e.oosError=s.detail??`添加失败: ${i.status}`,!1)}catch(i){return e.oosError=i instanceof Error?i.message:String(i),!1}}async function Zd(e){try{const t=await fetch(fe(e.basePath,"/api/oos/stats")),n=await t.json().catch(()=>({}));if(t.ok&&n.success&&n.data)e.overviewOosStats=n.data,e.overviewOosError=null;else{e.overviewOosStats=null;const i=typeof n.detail=="string"?n.detail:n.message??n.error??`oos stats: ${t.status}`;e.overviewOosError=i}}catch(t){e.overviewOosStats=null,e.overviewOosError=t instanceof Error?t.message:String(t)}}async function Zn(e,t){e.shortageLoading=!0,e.shortageError=null;try{const[s,o,a,r]=await Promise.all([fetch(fe(e.basePath,"/api/shortage/stats"),{method:"GET"}),fetch(fe(e.basePath,"/api/shortage/list",{limit:100}),{method:"GET"}),fetch(fe(e.basePath,"/api/shortage/by-file"),{method:"GET"}),fetch(fe(e.basePath,"/api/shortage/by-time",{days:30}),{method:"GET"})]),d=await s.json().catch(()=>({})),l=await o.json().catch(()=>({})),u=await a.json().catch(()=>({})),g=await r.json().catch(()=>({}));if(d.success&&d.data)e.shortageStats=d.data,e.shortageDb=d.db??null;else if(e.shortageStats=null,!e.shortageError&&!s.ok){const f=typeof d.detail=="string"?d.detail:d.message??d.error;e.shortageError=f??`stats: ${s.status} ${s.statusText}`}if(l.success&&Array.isArray(l.data))e.shortageList=l.data;else if(e.shortageList=[],!e.shortageError&&!o.ok){const f=typeof l.detail=="string"?l.detail:l.message??l.error;e.shortageError=f??`list: ${o.status} ${o.statusText}`}if(u.success&&Array.isArray(u.data))e.shortageByFile=u.data;else if(e.shortageByFile=[],!e.shortageError&&!a.ok){const f=typeof u.detail=="string"?u.detail:u.message??u.error;e.shortageError=f??`by-file: ${a.status} ${a.statusText}`}if(g.success&&Array.isArray(g.data))e.shortageByTime=g.data;else if(e.shortageByTime=[],!e.shortageError&&!r.ok){const f=typeof g.detail=="string"?g.detail:g.message??g.error;e.shortageError=f??`by-time: ${r.status} ${r.statusText}`}}catch(s){e.shortageError=s instanceof Error?s.message:String(s),e.shortageStats=null,e.shortageList=[],e.shortageByFile=[],e.shortageByTime=[]}finally{e.shortageLoading=!1}}async function eu(e,t){if(!(t!=null&&t.trim()))return!1;try{const n=await fetch(fe(e.basePath,"/api/shortage/delete"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_key:t.trim()})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(await Zn(e),!0):(e.shortageError=i.detail??`删除失败: ${n.status}`,!1)}catch(n){return e.shortageError=n instanceof Error?n.message:String(n),!1}}async function tu(e,t){const n=(t.product_name||"").trim();if(!n)return!1;try{const i=await fetch(fe(e.basePath,"/api/shortage/add"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_name:n,specification:(t.specification??"").trim(),quantity:t.quantity??0,available_qty:t.available_qty??0})}),s=await i.json().catch(()=>({}));return i.ok&&s.success?(await Zn(e),!0):(e.shortageError=s.detail??`添加失败: ${i.status}`,!1)}catch(i){return e.shortageError=i instanceof Error?i.message:String(i),!1}}async function nu(e){try{const t=await fetch(fe(e.basePath,"/api/shortage/stats"),{method:"GET"}),n=await t.json().catch(()=>({}));if(t.ok&&n.success&&n.data)e.overviewShortageStats=n.data,e.overviewShortageError=null;else{e.overviewShortageStats=null;const i=typeof n.detail=="string"?n.detail:n.message??n.error??`shortage stats: ${t.status}`;e.overviewShortageError=i}}catch(t){e.overviewShortageStats=null,e.overviewShortageError=t instanceof Error?t.message:String(t)}}async function iu(e){if(!(!e.client||!e.connected)&&!e.presenceLoading){e.presenceLoading=!0,e.presenceError=null,e.presenceStatus=null;try{const t=await e.client.request("system-presence",{});Array.isArray(t)?(e.presenceEntries=t,e.presenceStatus=t.length===0?"No instances yet.":null):(e.presenceEntries=[],e.presenceStatus="No presence payload.")}catch(t){e.presenceError=String(t)}finally{e.presenceLoading=!1}}}async function pt(e,t){if(!(!e.client||!e.connected)&&!e.sessionsLoading){e.sessionsLoading=!0,e.sessionsError=null;try{const n=(t==null?void 0:t.includeGlobal)??e.sessionsIncludeGlobal,i=(t==null?void 0:t.includeUnknown)??e.sessionsIncludeUnknown,s=(t==null?void 0:t.activeMinutes)??On(e.sessionsFilterActive,0),o=(t==null?void 0:t.limit)??On(e.sessionsFilterLimit,0),a={includeGlobal:n,includeUnknown:i};s>0&&(a.activeMinutes=s),o>0&&(a.limit=o);const r=await e.client.request("sessions.list",a);r&&(e.sessionsResult=r)}catch(n){e.sessionsError=String(n)}finally{e.sessionsLoading=!1}}}async function su(e,t,n){if(!e.client||!e.connected)return;const i={key:t};"label"in n&&(i.label=n.label),"thinkingLevel"in n&&(i.thinkingLevel=n.thinkingLevel),"verboseLevel"in n&&(i.verboseLevel=n.verboseLevel),"reasoningLevel"in n&&(i.reasoningLevel=n.reasoningLevel);try{await e.client.request("sessions.patch",i),await pt(e)}catch(s){e.sessionsError=String(s)}}async function ou(e,t){if(!e.client||!e.connected||e.sessionsLoading||!window.confirm(`Delete session "${t}"?

Deletes the session entry and archives its transcript.`))return!1;e.sessionsLoading=!0,e.sessionsError=null;try{return await e.client.request("sessions.delete",{key:t,deleteTranscript:!0}),!0}catch(i){return e.sessionsError=String(i),!1}finally{e.sessionsLoading=!1}}async function au(e,t){return await ou(e,t)?(await pt(e),!0):!1}function Et(e,t,n){if(!t.trim())return;const i={...e.skillMessages};n?i[t]=n:delete i[t],e.skillMessages=i}function ei(e){return e instanceof Error?e.message:String(e)}async function dn(e,t){if(t!=null&&t.clearMessages&&Object.keys(e.skillMessages).length>0&&(e.skillMessages={}),!(!e.client||!e.connected)&&!e.skillsLoading){e.skillsLoading=!0,e.skillsError=null;try{const n=await e.client.request("skills.status",{});n&&(e.skillsReport=n)}catch(n){e.skillsError=ei(n)}finally{e.skillsLoading=!1}}}function ru(e,t,n){e.skillEdits={...e.skillEdits,[t]:n}}async function lu(e,t,n){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{await e.client.request("skills.update",{skillKey:t,enabled:n}),await dn(e),Et(e,t,{kind:"success",message:n?"Skill enabled":"Skill disabled"})}catch(i){const s=ei(i);e.skillsError=s,Et(e,t,{kind:"error",message:s})}finally{e.skillsBusyKey=null}}}async function cu(e,t){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const n=e.skillEdits[t]??"";await e.client.request("skills.update",{skillKey:t,apiKey:n}),await dn(e),Et(e,t,{kind:"success",message:"API key saved"})}catch(n){const i=ei(n);e.skillsError=i,Et(e,t,{kind:"error",message:i})}finally{e.skillsBusyKey=null}}}async function du(e,t,n,i){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const s=await e.client.request("skills.install",{name:n,installId:i,timeoutMs:12e4});await dn(e),Et(e,t,{kind:"success",message:(s==null?void 0:s.message)??"Installed"})}catch(s){const o=ei(s);e.skillsError=o,Et(e,t,{kind:"error",message:o})}finally{e.skillsBusyKey=null}}}const uu=[{label:"chat",tabs:["chat"]},{label:"control",tabs:["overview","channels","instances","sessions","work","cron"]},{label:"agent",tabs:["agents","skills","nodes"]},{label:"settings",tabs:["config","debug","logs"]}],Or={agents:"/agents",overview:"/overview",channels:"/channels",instances:"/instances",sessions:"/sessions",work:"/work",cron:"/cron",skills:"/skills",nodes:"/nodes",chat:"/chat",config:"/config",debug:"/debug",logs:"/logs"},Nr=new Map(Object.entries(Or).map(([e,t])=>[t,e]));function Rt(e){if(!e)return"";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t==="/"?"":(t.endsWith("/")&&(t=t.slice(0,-1)),t)}function on(e){if(!e)return"/";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t.length>1&&t.endsWith("/")&&(t=t.slice(0,-1)),t}function ti(e,t=""){const n=Rt(t),i=Or[e];return n?`${n}${i}`:i}function Br(e,t=""){const n=Rt(t);let i=e||"/";n&&(i===n?i="/":i.startsWith(`${n}/`)&&(i=i.slice(n.length)));let s=on(i).toLowerCase();return s.endsWith("/index.html")&&(s="/"),s==="/"?"chat":Nr.get(s)??null}function gu(e){let t=on(e);if(t.endsWith("/index.html")&&(t=on(t.slice(0,-11))),t==="/")return"";const n=t.split("/").filter(Boolean);if(n.length===0)return"";for(let i=0;i<n.length;i++){const s=`/${n.slice(i).join("/")}`.toLowerCase();if(Nr.has(s)){const o=n.slice(0,i);return o.length?`/${o.join("/")}`:""}}return`/${n.join("/")}`}function fu(e){switch(e){case"agents":return"folder";case"chat":return"messageSquare";case"overview":return"barChart";case"channels":return"fileText";case"instances":return"radio";case"sessions":return"fileText";case"work":return"fileText";case"cron":return"loader";case"skills":return"zap";case"nodes":return"monitor";case"config":return"settings";case"debug":return"bug";case"logs":return"scrollText";default:return"folder"}}function es(e){return T(`tabs.${e}`)}function pu(e){return T(`subtitles.${e}`)}const Ur="openclaw.control.settings.v1";function hu(){const t={gatewayUrl:`${location.protocol==="https:"?"wss":"ws"}://${location.host}/ws`,token:"",sessionKey:"main",lastActiveSessionKey:"main",theme:"system",chatFocusMode:!1,chatShowThinking:!0,splitRatio:.6,navCollapsed:!1,navGroupsCollapsed:{}};try{const n=localStorage.getItem(Ur);if(!n)return t;const i=JSON.parse(n);return{gatewayUrl:typeof i.gatewayUrl=="string"&&i.gatewayUrl.trim()?i.gatewayUrl.trim():t.gatewayUrl,token:typeof i.token=="string"?i.token:t.token,sessionKey:typeof i.sessionKey=="string"&&i.sessionKey.trim()?i.sessionKey.trim():t.sessionKey,lastActiveSessionKey:typeof i.lastActiveSessionKey=="string"&&i.lastActiveSessionKey.trim()?i.lastActiveSessionKey.trim():typeof i.sessionKey=="string"&&i.sessionKey.trim()||t.lastActiveSessionKey,theme:i.theme==="light"||i.theme==="dark"||i.theme==="system"?i.theme:t.theme,chatFocusMode:typeof i.chatFocusMode=="boolean"?i.chatFocusMode:t.chatFocusMode,chatShowThinking:typeof i.chatShowThinking=="boolean"?i.chatShowThinking:t.chatShowThinking,splitRatio:typeof i.splitRatio=="number"&&i.splitRatio>=.4&&i.splitRatio<=.7?i.splitRatio:t.splitRatio,navCollapsed:typeof i.navCollapsed=="boolean"?i.navCollapsed:t.navCollapsed,navGroupsCollapsed:typeof i.navGroupsCollapsed=="object"&&i.navGroupsCollapsed!==null?i.navGroupsCollapsed:t.navGroupsCollapsed,locale:ks(i.locale)?i.locale:void 0}}catch{return t}}function vu(e){localStorage.setItem(Ur,JSON.stringify(e))}const bn=e=>Number.isNaN(e)?.5:e<=0?0:e>=1?1:e,mu=()=>typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches??!1,wn=e=>{e.classList.remove("theme-transition"),e.style.removeProperty("--theme-switch-x"),e.style.removeProperty("--theme-switch-y")},yu=({nextTheme:e,applyTheme:t,context:n,currentTheme:i})=>{var l;if(i===e)return;const s=globalThis.document??null;if(!s){t();return}const o=s.documentElement,a=s,r=mu();if(!!a.startViewTransition&&!r){let u=.5,g=.5;if((n==null?void 0:n.pointerClientX)!==void 0&&(n==null?void 0:n.pointerClientY)!==void 0&&typeof window<"u")u=bn(n.pointerClientX/window.innerWidth),g=bn(n.pointerClientY/window.innerHeight);else if(n!=null&&n.element){const f=n.element.getBoundingClientRect();f.width>0&&f.height>0&&typeof window<"u"&&(u=bn((f.left+f.width/2)/window.innerWidth),g=bn((f.top+f.height/2)/window.innerHeight))}o.style.setProperty("--theme-switch-x",`${u*100}%`),o.style.setProperty("--theme-switch-y",`${g*100}%`),o.classList.add("theme-transition");try{const f=(l=a.startViewTransition)==null?void 0:l.call(a,()=>{t()});f!=null&&f.finished?f.finished.finally(()=>wn(o)):wn(o)}catch{wn(o),t()}return}t(),wn(o)};function bu(){return typeof window>"u"||typeof window.matchMedia!="function"||window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function Ns(e){return e==="system"?bu():e}function We(e,t){var i;const n={...t,lastActiveSessionKey:((i=t.lastActiveSessionKey)==null?void 0:i.trim())||t.sessionKey.trim()||"main"};e.settings=n,vu(n),t.theme!==e.theme&&(e.theme=t.theme,ni(e,Ns(t.theme))),e.applySessionKey=e.settings.lastActiveSessionKey}function zr(e,t){const n=t.trim();n&&e.settings.lastActiveSessionKey!==n&&We(e,{...e.settings,lastActiveSessionKey:n})}function wu(e){if(!window.location.search&&!window.location.hash)return;const t=new URL(window.location.href),n=new URLSearchParams(t.search),i=new URLSearchParams(t.hash.startsWith("#")?t.hash.slice(1):t.hash),s=n.get("token")??i.get("token"),o=n.get("password")??i.get("password"),a=n.get("session")??i.get("session"),r=n.get("gatewayUrl")??i.get("gatewayUrl");let d=!1;if(s!=null){const u=s.trim();u&&u!==e.settings.token&&We(e,{...e.settings,token:u}),n.delete("token"),i.delete("token"),d=!0}if(o!=null&&(n.delete("password"),i.delete("password"),d=!0),a!=null){const u=a.trim();u&&(e.sessionKey=u,We(e,{...e.settings,sessionKey:u,lastActiveSessionKey:u}))}if(r!=null){const u=r.trim();u&&u!==e.settings.gatewayUrl&&(e.pendingGatewayUrl=u),n.delete("gatewayUrl"),i.delete("gatewayUrl"),d=!0}if(!d)return;t.search=n.toString();const l=i.toString();t.hash=l?`#${l}`:"",window.history.replaceState({},"",t.toString())}function $u(e,t){e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?As(e):_s(e),t==="debug"?Cs(e):Ts(e),Bs(e),Kr(e,t,!1)}function ku(e,t,n){yu({nextTheme:t,applyTheme:()=>{e.theme=t,We(e,{...e.settings,theme:t}),ni(e,Ns(t))},context:n,currentTheme:e.theme})}async function Bs(e){var t,n,i,s,o,a;if(e.tab==="overview"&&(await Hr(e),await Promise.all([Zd(e),nu(e)])),e.tab==="channels"&&await pr(e),e.tab==="instances"){const r=e;await Xn(r),await Zn(r)}if(e.tab==="sessions"&&await pt(e),e.tab==="cron"&&await Un(e),e.tab==="skills"&&await dn(e),e.tab==="agents"){await Es(e),await Ee(e);const r=((n=(t=e.agentsList)==null?void 0:t.agents)==null?void 0:n.map(l=>l.id))??[];r.length>0&&fr(e,r);const d=e.agentsSelectedId??((i=e.agentsList)==null?void 0:i.defaultId)??((a=(o=(s=e.agentsList)==null?void 0:s.agents)==null?void 0:o[0])==null?void 0:a.id);d&&(gr(e,d),e.agentsPanel==="skills"&&Ln(e,d),e.agentsPanel==="channels"&&me(e,!1),e.agentsPanel==="cron"&&Un(e))}e.tab==="nodes"&&(await Qn(e),await Qe(e),await Ee(e),await Os(e)),e.tab==="chat"&&(await Yr(e),ln(e,!e.chatHasAutoScrolled)),e.tab==="config"&&(await _c(e),await Ee(e)),e.tab==="debug"&&(await Vn(e),e.eventLog=e.eventLogBuffer),e.tab==="logs"&&(e.logsAtBottom=!0,await Ss(e,{reset:!0}),ur(e,!0))}function xu(){if(typeof window>"u")return"";const e=window.__OPENCLAW_CONTROL_UI_BASE_PATH__;return typeof e=="string"&&e.trim()?Rt(e):gu(window.location.pathname)}function Su(e){e.theme=e.settings.theme??"system",ni(e,Ns(e.theme))}function ni(e,t){if(e.themeResolved=t,typeof document>"u")return;const n=document.documentElement;n.dataset.theme=t,n.style.colorScheme=t}function Au(e){if(typeof window>"u"||typeof window.matchMedia!="function")return;if(e.themeMedia=window.matchMedia("(prefers-color-scheme: dark)"),e.themeMediaHandler=n=>{e.theme==="system"&&ni(e,n.matches?"dark":"light")},typeof e.themeMedia.addEventListener=="function"){e.themeMedia.addEventListener("change",e.themeMediaHandler);return}e.themeMedia.addListener(e.themeMediaHandler)}function _u(e){if(!e.themeMedia||!e.themeMediaHandler)return;if(typeof e.themeMedia.removeEventListener=="function"){e.themeMedia.removeEventListener("change",e.themeMediaHandler);return}e.themeMedia.removeListener(e.themeMediaHandler),e.themeMedia=null,e.themeMediaHandler=null}function Cu(e,t){if(typeof window>"u")return;const n=Br(window.location.pathname,e.basePath)??"chat";jr(e,n),Kr(e,n,t)}function Tu(e){var s;if(typeof window>"u")return;const t=Br(window.location.pathname,e.basePath);if(!t)return;const i=(s=new URL(window.location.href).searchParams.get("session"))==null?void 0:s.trim();i&&(e.sessionKey=i,We(e,{...e.settings,sessionKey:i,lastActiveSessionKey:i})),jr(e,t)}function jr(e,t){e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?As(e):_s(e),t==="debug"?Cs(e):Ts(e),e.connected&&Bs(e)}function Kr(e,t,n){if(typeof window>"u")return;const i=on(ti(t,e.basePath)),s=on(window.location.pathname),o=new URL(window.location.href);t==="chat"&&e.sessionKey?o.searchParams.set("session",e.sessionKey):o.searchParams.delete("session"),s!==i&&(o.pathname=i),n?window.history.replaceState({},"",o.toString()):window.history.pushState({},"",o.toString())}function Eu(e,t,n){if(typeof window>"u")return;const i=new URL(window.location.href);i.searchParams.set("session",t),window.history.replaceState({},"",i.toString())}async function Hr(e){await Promise.all([me(e,!1),iu(e),pt(e),cn(e),Vn(e)])}async function Un(e){await Promise.all([me(e,!1),cn(e),Jn(e)])}const qo=50,Lu=80,Ru=12e4;function Iu(e){if(!e||typeof e!="object")return null;const t=e;if(typeof t.text=="string")return t.text;const n=t.content;if(!Array.isArray(n))return null;const i=n.map(s=>{if(!s||typeof s!="object")return null;const o=s;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(s=>!!s);return i.length===0?null:i.join(`
`)}function Go(e){if(e==null)return null;if(typeof e=="number"||typeof e=="boolean")return String(e);const t=Iu(e);let n;if(typeof e=="string")n=e;else if(t)n=t;else try{n=JSON.stringify(e,null,2)}catch{n=String(e)}const i=vr(n,Ru);return i.truncated?`${i.text}

… truncated (${i.total} chars, showing first ${i.text.length}).`:i.text}function Mu(e){const t=[];return t.push({type:"toolcall",name:e.name,arguments:e.args??{}}),e.output&&t.push({type:"toolresult",name:e.name,text:e.output}),{role:"assistant",toolCallId:e.toolCallId,runId:e.runId,content:t,timestamp:e.startedAt}}function Fu(e){if(e.toolStreamOrder.length<=qo)return;const t=e.toolStreamOrder.length-qo,n=e.toolStreamOrder.splice(0,t);for(const i of n)e.toolStreamById.delete(i)}function Pu(e){e.chatToolMessages=e.toolStreamOrder.map(t=>{var n;return(n=e.toolStreamById.get(t))==null?void 0:n.message}).filter(t=>!!t)}function ts(e){e.toolStreamSyncTimer!=null&&(clearTimeout(e.toolStreamSyncTimer),e.toolStreamSyncTimer=null),Pu(e)}function Du(e,t=!1){if(t){ts(e);return}e.toolStreamSyncTimer==null&&(e.toolStreamSyncTimer=window.setTimeout(()=>ts(e),Lu))}function ii(e){e.toolStreamById.clear(),e.toolStreamOrder=[],e.chatToolMessages=[],ts(e)}const Ou=5e3;function Nu(e,t){var s;const n=t.data??{},i=typeof n.phase=="string"?n.phase:"";e.compactionClearTimer!=null&&(window.clearTimeout(e.compactionClearTimer),e.compactionClearTimer=null),i==="start"?e.compactionStatus={active:!0,startedAt:Date.now(),completedAt:null}:i==="end"&&(e.compactionStatus={active:!1,startedAt:((s=e.compactionStatus)==null?void 0:s.startedAt)??null,completedAt:Date.now()},e.compactionClearTimer=window.setTimeout(()=>{e.compactionStatus=null,e.compactionClearTimer=null},Ou))}function Bu(e,t){if(!t)return;if(t.stream==="compaction"){Nu(e,t);return}if(t.stream!=="tool")return;const n=typeof t.sessionKey=="string"?t.sessionKey:void 0;if(n&&n!==e.sessionKey||!n&&e.chatRunId&&t.runId!==e.chatRunId||e.chatRunId&&t.runId!==e.chatRunId||!e.chatRunId)return;const i=t.data??{},s=typeof i.toolCallId=="string"?i.toolCallId:"";if(!s)return;const o=typeof i.name=="string"?i.name:"tool",a=typeof i.phase=="string"?i.phase:"",r=a==="start"?i.args:void 0,d=a==="update"?Go(i.partialResult):a==="result"?Go(i.result):void 0,l=Date.now();let u=e.toolStreamById.get(s);u?(u.name=o,r!==void 0&&(u.args=r),d!==void 0&&(u.output=d||void 0),u.updatedAt=l):(u={toolCallId:s,runId:t.runId,sessionKey:n,name:o,args:r,output:d||void 0,startedAt:typeof t.ts=="number"?t.ts:l,updatedAt:l,message:{}},e.toolStreamById.set(s,u),e.toolStreamOrder.push(s)),u.message=Mu(u),Fu(e),Du(e,a==="result")}function Li(e){return e==null?"":String(e).trim()}const Ri=new WeakMap,Ii=new WeakMap;function ns(e){const t=e,n=typeof t.role=="string"?t.role:"",i=t.content;if(typeof i=="string")return n==="assistant"?Ai(i):Li(i);if(Array.isArray(i)){const s=i.map(o=>{const a=o;return a.type==="text"&&typeof a.text=="string"?a.text:null}).filter(o=>typeof o=="string");if(s.length>0){const o=s.join(`
`);return n==="assistant"?Ai(o):Li(o)}}return typeof t.text=="string"?n==="assistant"?Ai(t.text):Li(t.text):null}function qr(e){if(!e||typeof e!="object")return ns(e);const t=e;if(Ri.has(t))return Ri.get(t)??null;const n=ns(e);return Ri.set(t,n),n}function Wo(e){const n=e.content,i=[];if(Array.isArray(n))for(const r of n){const d=r;if(d.type==="thinking"&&typeof d.thinking=="string"){const l=d.thinking.trim();l&&i.push(l)}}if(i.length>0)return i.join(`
`);const s=zu(e);if(!s)return null;const a=[...s.matchAll(/<\s*think(?:ing)?\s*>([\s\S]*?)<\s*\/\s*think(?:ing)?\s*>/gi)].map(r=>(r[1]??"").trim()).filter(Boolean);return a.length>0?a.join(`
`):null}function Uu(e){if(!e||typeof e!="object")return Wo(e);const t=e;if(Ii.has(t))return Ii.get(t)??null;const n=Wo(e);return Ii.set(t,n),n}function zu(e){const t=e,n=t.content;if(typeof n=="string")return n;if(Array.isArray(n)){const i=n.map(s=>{const o=s;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(s=>typeof s=="string");if(i.length>0)return i.join(`
`)}return typeof t.text=="string"?t.text:null}function ju(e){const t=e.trim();if(!t)return"";const n=t.split(/\r?\n/).map(i=>i.trim()).filter(Boolean).map(i=>`_${i}_`);return n.length?["_Reasoning:_",...n].join(`
`):""}let Vo=!1;function Qo(e){e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t="";for(let n=0;n<e.length;n++)t+=e[n].toString(16).padStart(2,"0");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}function Ku(){const e=new Uint8Array(16),t=Date.now();for(let n=0;n<e.length;n++)e[n]=Math.floor(Math.random()*256);return e[0]^=t&255,e[1]^=t>>>8&255,e[2]^=t>>>16&255,e[3]^=t>>>24&255,e}function Hu(){Vo||(Vo=!0,console.warn("[uuid] crypto API missing; falling back to weak randomness"))}function Us(e=globalThis.crypto){if(e&&typeof e.randomUUID=="function")return e.randomUUID();if(e&&typeof e.getRandomValues=="function"){const t=new Uint8Array(16);return e.getRandomValues(t),Qo(t)}return Hu(),Qo(Ku())}async function an(e){if(!(!e.client||!e.connected)){e.chatLoading=!0,e.lastError=null;try{const t=await e.client.request("chat.history",{sessionKey:e.sessionKey,limit:200}),n=Array.isArray(t.messages)?t.messages:[];(n.length>0||e.chatMessages.length===0)&&(e.chatMessages=n),e.chatThinkingLevel=t.thinkingLevel??null}catch(t){e.lastError=String(t)}finally{e.chatLoading=!1}}}function qu(e){const t=/^data:([^;]+);base64,(.+)$/.exec(e);return t?{mimeType:t[1],content:t[2]}:null}function Gu(e){if(!e||typeof e!="object")return null;const t=e;return t.role!=="assistant"||!("content"in t)||!Array.isArray(t.content)?null:t}async function Wu(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",i=n?`${n}/api/quotation/upload`:"/api/quotation/upload",s=new FormData;s.append("file",t);try{const o=await fetch(i,{method:"POST",body:s,credentials:"same-origin"});if(!o.ok){const r=await o.text();throw new Error(r||`Upload failed: ${o.status}`)}const a=await o.json();return typeof a.file_path!="string"?null:{file_path:a.file_path,file_name:a.file_name??t.name}}catch(o){throw console.error("uploadChatFile",o),o}}async function Vu(e,t,n,i){if(!e.client||!e.connected)return null;const s=t.trim(),o=n&&n.length>0;if(!s&&!o)return null;const a=Date.now(),r=[];if(s&&r.push({type:"text",text:s}),o)for(const g of n)r.push({type:"image",source:{type:"base64",media_type:g.mimeType,data:g.dataUrl}});e.chatMessages=[...e.chatMessages,{role:"user",content:r,timestamp:a}],e.chatSending=!0,e.lastError=null;const d=Us();e.chatRunId=d,e.chatStream="",e.chatStreamStartedAt=a;const l=o?n.map(g=>{const f=qu(g.dataUrl);return f?{type:"image",mimeType:f.mimeType,content:f.content}:null}).filter(g=>g!==null):void 0,u=i!=null&&i.file_path?{file_path:i.file_path}:void 0;try{return await e.client.request("chat.send",{sessionKey:e.sessionKey,message:s,deliver:!1,idempotencyKey:d,attachments:l,...u?{context:u,file_path:i.file_path}:{}}),d}catch(g){const f=String(g);return e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,e.lastError=f,e.chatMessages=[...e.chatMessages,{role:"assistant",content:[{type:"text",text:"Error: "+f}],timestamp:Date.now()}],null}finally{e.chatSending=!1}}async function Qu(e){if(!e.client||!e.connected)return!1;const t=e.chatRunId;try{return await e.client.request("chat.abort",t?{sessionKey:e.sessionKey,runId:t}:{sessionKey:e.sessionKey}),!0}catch(n){return e.lastError=String(n),!1}}function Ju(e,t){if(!t||t.sessionKey!==e.sessionKey)return null;if(t.runId&&e.chatRunId&&t.runId!==e.chatRunId)return t.state==="final"?"foreign_final":null;if(t.state==="delta"){const n=ns(t.message);if(typeof n=="string"){const i=e.chatStream??"";(!i||n.length>=i.length)&&(e.chatStream=n)}}else if(t.state==="final")e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null;else if(t.state==="aborted"){const n=Gu(t.message);if(n)e.chatMessages=[...e.chatMessages,n];else{const i=e.chatStream??"";i.trim()&&(e.chatMessages=[...e.chatMessages,{role:"assistant",content:[{type:"text",text:i}],timestamp:Date.now()}])}e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null}else t.state==="error"&&(e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null,e.lastError=t.errorMessage??"chat error");return t.state}const Gr=120;function Wr(e){return e.chatSending||!!e.chatRunId}function Yu(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/stop"?!0:n==="stop"||n==="esc"||n==="abort"||n==="wait"||n==="exit"}function Xu(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/new"||n==="/reset"?!0:n.startsWith("/new ")||n.startsWith("/reset ")}async function Vr(e){e.connected&&(e.chatMessage="",await Qu(e))}function Zu(e,t,n,i){const s=t.trim(),o=!!(n&&n.length>0);!s&&!o||(e.chatQueue=[...e.chatQueue,{id:Us(),text:s,createdAt:Date.now(),attachments:o?n==null?void 0:n.map(a=>({...a})):void 0,refreshSessions:i}])}async function Qr(e,t,n){var o,a;ii(e);const i=await Vu(e,t,n==null?void 0:n.attachments,e.chatUploadedFile??void 0),s=!!i;return!s&&(n==null?void 0:n.previousDraft)!=null&&(e.chatMessage=n.previousDraft),!s&&(n!=null&&n.previousAttachments)&&(e.chatAttachments=n.previousAttachments),s&&zr(e,e.sessionKey),s&&(n!=null&&n.restoreDraft)&&((o=n.previousDraft)!=null&&o.trim())&&(e.chatMessage=n.previousDraft),s&&(n!=null&&n.restoreAttachments)&&((a=n.previousAttachments)!=null&&a.length)&&(e.chatAttachments=n.previousAttachments),ln(e),s&&!e.chatRunId&&Jr(e),s&&(n!=null&&n.refreshSessions)&&i&&e.refreshSessionsAfterChat.add(i),s}async function Jr(e){if(!e.connected||Wr(e))return;const[t,...n]=e.chatQueue;if(!t)return;e.chatQueue=n,await Qr(e,t.text,{attachments:t.attachments,refreshSessions:t.refreshSessions})||(e.chatQueue=[t,...e.chatQueue])}function eg(e,t){e.chatQueue=e.chatQueue.filter(n=>n.id!==t)}async function tg(e,t,n){if(!e.connected)return;const i=e.chatMessage,s=(t??e.chatMessage).trim(),o=e.chatAttachments??[],a=t==null?o:[],r=a.length>0;if(!s&&!r)return;if(Yu(s)){await Vr(e);return}const d=Xu(s);if(t==null&&(e.chatMessage="",e.chatAttachments=[]),Wr(e)){Zu(e,s,a,d);return}await Qr(e,s,{previousDraft:t==null?i:void 0,restoreDraft:!!(t&&(n!=null&&n.restoreDraft)),attachments:r?a:void 0,previousAttachments:t==null?o:void 0,restoreAttachments:!!(t&&(n!=null&&n.restoreDraft)),refreshSessions:d})}async function Yr(e,t){await Promise.all([an(e),pt(e,{activeMinutes:Gr}),is(e)]),(t==null?void 0:t.scheduleScroll)!==!1&&ln(e)}const ng=Jr;function ig(e){var s,o,a;const t=dr(e.sessionKey);if(t!=null&&t.agentId)return t.agentId;const n=(s=e.hello)==null?void 0:s.snapshot;return((a=(o=n==null?void 0:n.sessionDefaults)==null?void 0:o.defaultAgentId)==null?void 0:a.trim())||"main"}function sg(e,t){const n=Rt(e),i=encodeURIComponent(t);return n?`${n}/avatar/${i}?meta=1`:`/avatar/${i}?meta=1`}async function is(e){if(!e.connected){e.chatAvatarUrl=null;return}const t=ig(e);if(!t){e.chatAvatarUrl=null;return}e.chatAvatarUrl=null;const n=sg(e.basePath,t);try{const i=await fetch(n,{method:"GET"});if(!i.ok){e.chatAvatarUrl=null;return}const s=await i.json(),o=typeof s.avatarUrl=="string"?s.avatarUrl.trim():"";e.chatAvatarUrl=o||null}catch{e.chatAvatarUrl=null}}const og={trace:!0,debug:!0,info:!0,warn:!0,error:!0,fatal:!0},ag={name:"",description:"",agentId:"",enabled:!0,scheduleKind:"every",scheduleAt:"",everyAmount:"30",everyUnit:"minutes",cronExpr:"0 7 * * *",cronTz:"",sessionTarget:"isolated",wakeMode:"now",payloadKind:"agentTurn",payloadText:"",deliveryMode:"announce",deliveryChannel:"last",deliveryTo:"",timeoutSeconds:""},rg=50,lg=200,cg="PT Vansting Agent";function Jo(e,t){if(typeof e!="string")return;const n=e.trim();if(n)return n.length<=t?n:n.slice(0,t)}function zs(e){const t=Jo(e==null?void 0:e.name,rg)??cg,n=Jo((e==null?void 0:e.avatar)??void 0,lg)??null;return{agentId:typeof(e==null?void 0:e.agentId)=="string"&&e.agentId.trim()?e.agentId.trim():null,name:t,avatar:n}}async function Xr(e,t){if(!e.client||!e.connected)return;const n=e.sessionKey.trim(),i=n?{sessionKey:n}:{};try{const s=await e.client.request("agent.identity.get",i);if(!s)return;const o=zs(s);e.assistantName=o.name,e.assistantAvatar=o.avatar,e.assistantAgentId=o.agentId??null}catch{}}function ss(e){return typeof e=="object"&&e!==null}function dg(e){if(!ss(e))return null;const t=typeof e.id=="string"?e.id.trim():"",n=e.request;if(!t||!ss(n))return null;const i=typeof n.command=="string"?n.command.trim():"";if(!i)return null;const s=typeof e.createdAtMs=="number"?e.createdAtMs:0,o=typeof e.expiresAtMs=="number"?e.expiresAtMs:0;return!s||!o?null:{id:t,request:{command:i,cwd:typeof n.cwd=="string"?n.cwd:null,host:typeof n.host=="string"?n.host:null,security:typeof n.security=="string"?n.security:null,ask:typeof n.ask=="string"?n.ask:null,agentId:typeof n.agentId=="string"?n.agentId:null,resolvedPath:typeof n.resolvedPath=="string"?n.resolvedPath:null,sessionKey:typeof n.sessionKey=="string"?n.sessionKey:null},createdAtMs:s,expiresAtMs:o}}function ug(e){if(!ss(e))return null;const t=typeof e.id=="string"?e.id.trim():"";return t?{id:t,decision:typeof e.decision=="string"?e.decision:null,resolvedBy:typeof e.resolvedBy=="string"?e.resolvedBy:null,ts:typeof e.ts=="number"?e.ts:null}:null}function Zr(e){const t=Date.now();return e.filter(n=>n.expiresAtMs>t)}function gg(e,t){const n=Zr(e).filter(i=>i.id!==t.id);return n.push(t),n}function Yo(e,t){return Zr(e).filter(n=>n.id!==t)}function fg(e){return{}}const Xo={WEBCHAT:"webchat"},Zo={CONTROL_UI:"control-ui"},pg=4008;class hg{constructor(t){this.opts=t,this.ws=null,this.pending=new Map,this.closed=!1,this.lastSeq=null,this.connectNonce=null,this.connectSent=!1,this.connectTimer=null,this.backoffMs=800}start(){this.closed=!1,this.connect()}stop(){var t;this.closed=!0,(t=this.ws)==null||t.close(),this.ws=null,this.flushPending(new Error("gateway client stopped"))}get connected(){var t;return((t=this.ws)==null?void 0:t.readyState)===WebSocket.OPEN}connect(){this.closed||(this.ws=new WebSocket(this.opts.url),this.ws.addEventListener("open",()=>this.queueConnect()),this.ws.addEventListener("message",t=>this.handleMessage(String(t.data??""))),this.ws.addEventListener("close",t=>{var i,s;const n=String(t.reason??"");this.ws=null,this.flushPending(new Error(`gateway closed (${t.code}): ${n}`)),(s=(i=this.opts).onClose)==null||s.call(i,{code:t.code,reason:n}),this.scheduleReconnect()}),this.ws.addEventListener("error",()=>{}))}scheduleReconnect(){if(this.closed)return;const t=this.backoffMs;this.backoffMs=Math.min(this.backoffMs*1.7,15e3),window.setTimeout(()=>this.connect(),t)}flushPending(t){for(const[,n]of this.pending)n.reject(t);this.pending.clear()}async sendConnect(){var u;if(this.connectSent)return;this.connectSent=!0,this.connectTimer!==null&&(window.clearTimeout(this.connectTimer),this.connectTimer=null);const t=typeof crypto<"u"&&!!crypto.subtle,n=["operator.admin","operator.approvals","operator.pairing"],i="operator";let s=null,o=!1,a=this.opts.token;if(t){s=await Ds();const g=(u=hd({deviceId:s.deviceId,role:i}))==null?void 0:u.token;a=g??this.opts.token,o=!!(g&&this.opts.token)}const r=a||this.opts.password?{token:a,password:this.opts.password}:void 0;let d;if(t&&s){const g=Date.now(),f=this.connectNonce??void 0,m=fg({deviceId:s.deviceId,clientId:this.opts.clientName??Zo.CONTROL_UI,clientMode:this.opts.mode??Xo.WEBCHAT}),b=await Ud(s.privateKey,m);d={id:s.deviceId,publicKey:s.publicKey,signature:b,signedAt:g,nonce:f}}const l={minProtocol:3,maxProtocol:3,client:{id:this.opts.clientName??Zo.CONTROL_UI,version:this.opts.clientVersion??"dev",platform:this.opts.platform??navigator.platform??"web",mode:this.opts.mode??Xo.WEBCHAT,instanceId:this.opts.instanceId},role:i,scopes:n,device:d,caps:[],auth:r,userAgent:navigator.userAgent,locale:navigator.language};this.request("connect",l).then(g=>{var f,m,b;(f=g==null?void 0:g.auth)!=null&&f.deviceToken&&s&&$r({deviceId:s.deviceId,role:g.auth.role??i,token:g.auth.deviceToken,scopes:g.auth.scopes??[]}),this.backoffMs=800,(b=(m=this.opts).onHello)==null||b.call(m,g)}).catch(()=>{var g;o&&s&&kr({deviceId:s.deviceId,role:i}),(g=this.ws)==null||g.close(pg,"connect failed")})}handleMessage(t){var s,o,a,r,d;let n;try{n=JSON.parse(t)}catch{return}const i=n;if(i.type==="event"){const l=n;if(l.event==="connect.challenge"){const g=l.payload,f=g&&typeof g.nonce=="string"?g.nonce:null;f&&(this.connectNonce=f,this.sendConnect());return}const u=typeof l.seq=="number"?l.seq:null;u!==null&&(this.lastSeq!==null&&u>this.lastSeq+1&&((o=(s=this.opts).onGap)==null||o.call(s,{expected:this.lastSeq+1,received:u})),this.lastSeq=u);try{(r=(a=this.opts).onEvent)==null||r.call(a,l)}catch(g){console.error("[gateway] event handler error:",g)}return}if(i.type==="res"){const l=n,u=this.pending.get(l.id);if(!u)return;this.pending.delete(l.id),l.ok?u.resolve(l.payload):u.reject(new Error(((d=l.error)==null?void 0:d.message)??"request failed"));return}}request(t,n){if(!this.ws||this.ws.readyState!==WebSocket.OPEN)return Promise.reject(new Error("gateway not connected"));const i=Us(),s={type:"req",id:i,method:t,params:n},o=new Promise((a,r)=>{this.pending.set(i,{resolve:d=>a(d),reject:r})});return this.ws.send(JSON.stringify(s)),o}queueConnect(){this.connectNonce=null,this.connectSent=!1,this.connectTimer!==null&&window.clearTimeout(this.connectTimer),this.connectTimer=window.setTimeout(()=>{this.sendConnect()},750)}}function Mi(e,t){var r,d,l;const n=(e??"").trim(),i=(r=t.mainSessionKey)==null?void 0:r.trim();if(!i)return n;if(!n)return i;const s=((d=t.mainKey)==null?void 0:d.trim())||"main",o=(l=t.defaultAgentId)==null?void 0:l.trim();return n==="main"||n===s||o&&(n===`agent:${o}:main`||n===`agent:${o}:${s}`)?i:n}function vg(e,t){if(!(t!=null&&t.mainSessionKey))return;const n=Mi(e.sessionKey,t),i=Mi(e.settings.sessionKey,t),s=Mi(e.settings.lastActiveSessionKey,t),o=n||i||e.sessionKey,a={...e.settings,sessionKey:i||o,lastActiveSessionKey:s||o},r=a.sessionKey!==e.settings.sessionKey||a.lastActiveSessionKey!==e.settings.lastActiveSessionKey;o!==e.sessionKey&&(e.sessionKey=o),r&&We(e,a)}function el(e){e.lastError=null,e.hello=null,e.connected=!1,e.execApprovalQueue=[],e.execApprovalError=null;const t=e.client,n=new hg({url:e.settings.gatewayUrl,token:e.settings.token.trim()?e.settings.token:void 0,password:e.password.trim()?e.password:void 0,clientName:"openclaw-control-ui",mode:"webchat",onHello:i=>{e.client===n&&(e.connected=!0,e.lastError=null,e.hello=i,bg(e,i),e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,ii(e),Xr(e),Es(e),Qn(e,{quiet:!0}),Qe(e,{quiet:!0}),Bs(e))},onClose:({code:i,reason:s})=>{e.client===n&&(e.connected=!1,i!==1012&&(e.lastError=`disconnected (${i}): ${s||"no reason"}`))},onEvent:i=>{e.client===n&&mg(e,i)},onGap:({expected:i,received:s})=>{e.client===n&&(e.lastError=`event gap detected (expected seq ${i}, got ${s}); refresh recommended`)}});e.client=n,t==null||t.stop(),n.start()}function mg(e,t){try{yg(e,t)}catch(n){console.error("[gateway] handleGatewayEvent error:",t.event,n)}}function yg(e,t){if(e.eventLogBuffer=[{ts:Date.now(),event:t.event,payload:t.payload},...e.eventLogBuffer].slice(0,250),e.tab==="debug"&&(e.eventLog=e.eventLogBuffer),t.event==="agent"){if(e.onboarding)return;Bu(e,t.payload);return}if(t.event==="chat"){const n=t.payload;n!=null&&n.sessionKey&&zr(e,n.sessionKey);const i=Ju(e,n);if(i==="final"||i==="error"||i==="aborted"){ii(e),ng(e);const s=n==null?void 0:n.runId;s&&e.refreshSessionsAfterChat.has(s)&&(e.refreshSessionsAfterChat.delete(s),i==="final"&&pt(e,{activeMinutes:Gr}))}(i==="final"||i==="foreign_final")&&an(e);return}if(t.event==="presence"){const n=t.payload;n!=null&&n.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence,e.presenceError=null,e.presenceStatus=null);return}if(t.event==="cron"&&e.tab==="cron"&&Un(e),(t.event==="device.pair.requested"||t.event==="device.pair.resolved")&&Qe(e,{quiet:!0}),t.event==="exec.approval.requested"){const n=dg(t.payload);if(n){e.execApprovalQueue=gg(e.execApprovalQueue,n),e.execApprovalError=null;const i=Math.max(0,n.expiresAtMs-Date.now()+500);window.setTimeout(()=>{e.execApprovalQueue=Yo(e.execApprovalQueue,n.id)},i)}return}if(t.event==="exec.approval.resolved"){const n=ug(t.payload);n&&(e.execApprovalQueue=Yo(e.execApprovalQueue,n.id))}}function bg(e,t){const n=t.snapshot;n!=null&&n.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence),n!=null&&n.health&&(e.debugHealth=n.health),n!=null&&n.sessionDefaults&&vg(e,n.sessionDefaults)}const ea="/api/bootstrap";async function wg(e){if(typeof window>"u"||typeof fetch!="function")return;const t=Rt(e.basePath??""),n=t?`${t}${ea}`:ea;try{const i=await fetch(n,{method:"GET",headers:{Accept:"application/json"},credentials:"same-origin"});if(!i.ok)return;const s=await i.json(),o=zs({agentId:s.assistantAgentId??null,name:s.assistantName,avatar:s.assistantAvatar??null});e.assistantName=o.name,e.assistantAvatar=o.avatar,e.assistantAgentId=o.agentId??null}catch{}}function $g(e){e.basePath=xu(),wg(e),wu(e),Cu(e,!0),Su(e),Au(e),window.addEventListener("popstate",e.popStateHandler),el(e),nd(e),e.tab==="logs"&&As(e),e.tab==="debug"&&Cs(e)}function kg(e){Qc(e)}function xg(e){var t;window.removeEventListener("popstate",e.popStateHandler),id(e),_s(e),Ts(e),_u(e),(t=e.topbarObserver)==null||t.disconnect(),e.topbarObserver=null}function Sg(e,t){if(!(e.tab==="chat"&&e.chatManualRefreshInFlight)){if(e.tab==="chat"&&(t.has("chatMessages")||t.has("chatToolMessages")||t.has("chatStream")||t.has("chatLoading")||t.has("tab"))){const n=t.has("tab"),i=t.has("chatLoading")&&t.get("chatLoading")===!0&&!e.chatLoading;ln(e,n||i||!e.chatHasAutoScrolled)}e.tab==="logs"&&(t.has("logsEntries")||t.has("logsAutoFollow")||t.has("tab"))&&e.logsAutoFollow&&e.logsAtBottom&&ur(e,t.has("tab")||t.has("logsAutoFollow"))}}const Ag="未命名报价单";function js(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}function _g(e){return(e||"").trim().replace(/\\/g,"/").toLowerCase()}function Cg(e,t){const n=(t.file_path||"").trim();if(n){const i=e.workOriginalFileNamesByPath[_g(n)];if(typeof i=="string"&&i.trim())return i.trim()}return si(t)}function si(e){var i,s;const t=(i=e==null?void 0:e.name)==null?void 0:i.trim();if(t)return t;const n=(s=e==null?void 0:e.file_path)==null?void 0:s.trim();if(n){const o=n.replace(/\\/g,"/").split("/").filter(Boolean).pop();if(o)return o}return Ag}function Tg(e){try{if(typeof e!="string"||!e.trim())return null;const t=e.trim();return t.startsWith("{")&&t.endsWith("}")||t.startsWith("[")&&t.endsWith("]")?JSON.parse(t):null}catch{return null}}function Eg(e){const t=Array.isArray(e.fill_items_merged)?e.fill_items_merged:[];if(!t.length)return null;const n=Array.isArray(e.items)?e.items:[],i=Array.isArray(e.shortage)?e.shortage:[],s=new Map;for(const a of n)s.set(a.row,a);const o=t.map((a,r)=>{const d=a.row,l=s.get(d)??{},u=Number(a.qty??0),g=a.unit_price,f=g==null?null:Number(g),m=f==null||Number.isNaN(f)?null:f*u,b=String(a.code??""),k=String(a.quote_name??"").trim();let S=0,_=0;for(const L of i)if(L.row===d){S=Number(L.available_qty??0),_=Number(L.shortfall??0);break}const F=b==="无货"||k.includes("库存不足")?1:0;return!F&&_===0&&S===0&&b&&b!=="无货"&&(S=u),{row_index:r,row:typeof d=="number"?d:void 0,product_name:String(l.product_name??""),specification:String(a.specification??l.specification??""),qty:u,code:b,quote_name:k,unit_price:f,amount:m,available_qty:S,shortfall:_,is_shortage:F,match_source:null}});return{name:si({name:typeof e.name=="string"?e.name:"",file_path:typeof e.file_path=="string"?e.file_path:null}),file_path:typeof e.file_path=="string"?e.file_path:null,source:"file",lines:o}}function Lg(e){if(!Array.isArray(e))return null;let t=null;for(const n of e){const i=n.type,s=n.content;if(i!=="observation"||typeof s!="string")continue;const o=Tg(s);if(!o||typeof o!="object")continue;const a=o.pending_quotation_draft;if(a&&Array.isArray(a.lines)){t={...a,name:si(a)};continue}const r=Eg(o);r&&(t=r)}return t}function In(e,t,n){var s,o;if(e.workResult={success:n.success,answer:n.answer??"",trace:n.trace??[],error:n.error},e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null,!t.ok){e.workError=n.detail||n.error||"执行失败",e.workRunStatus="done",e.workRunId=null,e.workPendingChoices=[],e.workSelections={};return}if((n.status??"done")==="awaiting_choices"){e.workRunStatus="awaiting_choices",e.workRunId=n.run_id??null,e.workPendingChoices=n.pending_choices??[];const a={};for(const r of e.workPendingChoices)(s=r.options)!=null&&s.length&&(a[r.id]=r.options[0].code);e.workSelections=a}else{e.workRunStatus="done",e.workRunId=null,e.workPendingChoices=[],e.workSelections={};const a=n.pending_quotation_draft;if(a&&Array.isArray(a.lines))e.workPendingQuotationDraft={...a,name:si(a)};else{const r=(o=e.workResult)==null?void 0:o.trace;if(r){const d=Lg(r);d&&(e.workPendingQuotationDraft=d)}}}}async function Rg(e){if(!e.workFilePaths.length){e.workError="请先上传至少一个报价单文件";return}e.workRunning=!0,e.workRunStatus="running",e.workError=null,e.workResult=null,e.workRunId=null,e.workPendingChoices=[],e.workSelections={},e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null;try{const t=await fetch(js(e.basePath,"/api/work/run-stream"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({file_paths:e.workFilePaths,customer_level:e.workCustomerLevel,do_register_oos:e.workDoRegisterOos}),credentials:"same-origin"});if(!t.ok||!t.body){const a=await t.json().catch(()=>({}));In(e,t,a);return}const n=t.body.getReader(),i=new TextDecoder;let s="",o=!1;for(;;){const{done:a,value:r}=await n.read();if(a)break;s+=i.decode(r,{stream:!0});const d=s.split(`
`);s=d.pop()??"";for(const l of d){if(!l.startsWith("data: "))continue;const u=l.slice(6).trim();if(u)try{const g=JSON.parse(u);if(g.type==="stage"&&typeof g.stage=="number")e.workProgressStage=g.stage;else if(g.type==="result"&&g.payload){In(e,{ok:!0},g.payload),o=!0;break}}catch{}}if(o)break}if(!o&&s.startsWith("data: "))try{const a=JSON.parse(s.slice(6).trim());a.type==="result"&&a.payload&&In(e,{ok:!0},a.payload)}catch{}}catch(t){e.workError=t instanceof Error?t.message:String(t),e.workResult={success:!1,error:e.workError},e.workRunStatus="done",e.workRunId=null,e.workPendingChoices=[],e.workSelections={}}finally{e.workRunning=!1}}async function Ig(e){const t=e.workRunId;if(!t||e.workPendingChoices.length===0)return;const n=e.workPendingChoices.map(i=>{var s,o;return{item_id:i.id,selected_code:e.workSelections[i.id]??((o=(s=i.options)==null?void 0:s[0])==null?void 0:o.code)??"__OOS__"}});e.workRunning=!0,e.workError=null;try{const i=await fetch(js(e.basePath,"/api/work/resume"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({run_id:t,selections:n}),credentials:"same-origin"}),s=await i.json().catch(()=>({}));In(e,i,s)}catch(i){e.workError=i instanceof Error?i.message:String(i),e.workResult={success:!1,error:e.workError},e.workRunStatus="done",e.workRunId=null,e.workPendingChoices=[],e.workSelections={}}finally{e.workRunning=!1}}async function Mg(e){var n,i;const t=e.workPendingQuotationDraft;if(!((n=t==null?void 0:t.lines)!=null&&n.length)){e.workQuotationDraftSaveStatus={status:"error",error:"无报价明细可保存"};return}e.workQuotationDraftSaveStatus={status:"saving"};try{const o=await(await fetch(js(e.basePath,"/api/quotation-drafts"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:Cg(e,t),source:t.source||"file",file_path:t.file_path??void 0,lines:t.lines.map(a=>({product_name:a.product_name??"",specification:a.specification??"",qty:Number(a.qty)||0,code:a.code??"",quote_name:a.quote_name??"",unit_price:a.unit_price!=null?Number(a.unit_price):null,amount:a.amount!=null?Number(a.amount):null,available_qty:Number(a.available_qty)||0,shortfall:Number(a.shortfall)||0,is_shortage:a.is_shortage?1:0,match_source:a.match_source??null}))}),credentials:"same-origin"})).json().catch(()=>({}));o.success&&((i=o.data)==null?void 0:i.draft_no)!=null?(e.workQuotationDraftSaveStatus={status:"ok",draft_no:o.data.draft_no,draft_id:o.data.draft_id??0},e.workPendingQuotationDraft=null):e.workQuotationDraftSaveStatus={status:"error",error:o.detail||"保存失败"}}catch(s){e.workQuotationDraftSaveStatus={status:"error",error:s instanceof Error?s.message:String(s)}}}const Fg=[{value:"FACTORY_INC_TAX",label:"出厂价_含税"},{value:"FACTORY_EXC_TAX",label:"出厂价_不含税"},{value:"PURCHASE_EXC_TAX",label:"采购不含税"},{value:"A_MARGIN",label:"（二级代理）A级别 利润率"},{value:"A_QUOTE",label:"（二级代理）A级别 报单价格"},{value:"B_MARGIN",label:"（一级代理）B级别 利润率"},{value:"B_QUOTE",label:"（一级代理）B级别 报单价格"},{value:"C_MARGIN",label:"（聚万大客户）C级别 利润率"},{value:"C_QUOTE",label:"（聚万大客户）C级别报单价格"},{value:"D_MARGIN",label:"（青山大客户）D级别 利润率"},{value:"D_QUOTE",label:"（青山大客户）D级别 报单价格"},{value:"D_LOW",label:"（青山大客户）D级别 降低利润率"},{value:"E_MARGIN",label:"（大唐大客户）E级别（包运费） 利润率"},{value:"E_QUOTE",label:"（大唐大客户）E级别（包运费） 报单价格"}];function ta(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}function tl(e){try{if(typeof e!="string"||!e.trim())return null;const t=e.trim();return t.startsWith("{")&&t.endsWith("}")||t.startsWith("[")&&t.endsWith("]")?JSON.parse(t):null}catch{return null}}function Pg(e){const t=tl(e);if(!t||typeof t!="object"){const u=e.length>800?e.slice(0,800)+`
…（已截断）`:e;return c`<pre style="font-size: 11px; margin: 0; white-space: pre-wrap; word-break: break-all;">${u}</pre>`}const n=t.success===!0,i=Array.isArray(t.to_fill)?t.to_fill:[],s=Array.isArray(t.shortage)?t.shortage:[],o=Array.isArray(t.unmatched)?t.unmatched:[],a=Array.isArray(t.items)?t.items:[],r=Array.isArray(t.fill_items_merged)?t.fill_items_merged:[];if(i.length||s.length||o.length||a.length||r.length)return c`
      <div style="font-size: 12px;">
        ${n===!1&&t.error?c`<p style="color: var(--danger, #c00); margin: 0 0 8px 0;">${String(t.error)}</p>`:y}
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 8px; margin-bottom: 8px;">
          ${a.length?c`<span class="muted">提取行数: ${a.length}</span>`:y}
          ${i.length?c`<span style="color: var(--success, #2e7d32);">填充: ${i.length}</span>`:y}
          ${s.length?c`<span style="color: var(--warning, #ed6c02);">缺货: ${s.length}</span>`:y}
          ${o.length?c`<span style="color: var(--muted);">未匹配: ${o.length}</span>`:y}
        </div>
        ${o.length?c`
              <details style="margin-top: 6px;">
                <summary>未匹配项 (${o.length})</summary>
                <ul style="margin: 4px 0 0 0; padding-left: 18px; font-size: 11px;">
                  ${o.slice(0,10).map(u=>c`<li>${[u.product_name,u.specification].filter(Boolean).join(" · ")||u.keywords||"-"}</li>`)}
                  ${o.length>10?c`<li class="muted">…共 ${o.length} 项</li>`:y}
                </ul>
              </details>
            `:y}
      </div>
    `;const d=Array.isArray(t.items)?t.items:[];if(d.length&&typeof t.success<"u")return c`
      <div style="font-size: 12px;">
        <span class="muted">提取询价行: ${d.length} 条</span>
      </div>
    `;const l=e.length>600?e.slice(0,600)+`
…`:e;return c`<pre style="font-size: 11px; margin: 0; white-space: pre-wrap;">${l}</pre>`}function Dg(e,t){const n=e.type,i=e.step,s=e.name,o=e.content??"";return n==="response"&&o?c`
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
        <div style="margin-top: 6px;">${Pg(o)}</div>
      </div>
    `:y}const Fi=["识别表数据","查价格与库存","填表"];function Og(e){if(!Array.isArray(e))return[];const t=[];for(const n of e){const i=n.type,s=n.content;if(i!=="observation"||typeof s!="string")continue;const o=tl(s);if(!o||typeof o!="object")continue;const a=o.output_path;if(typeof a=="string"&&a.trim()){const r=a.replace(/\\/g,"/").split("/").filter(Boolean).pop()??"";r&&!t.includes(r)&&t.push(r)}}return t}function Ng(e){var z,U,G;const{basePath:t,workFilePaths:n,workRunning:i,workProgressStage:s,workRunStatus:o,workRunId:a,workPendingChoices:r,workSelections:d,workResult:l,workError:u,workCustomerLevel:g,workDoRegisterOos:f,workPendingQuotationDraft:m,workQuotationDraftSaveStatus:b,onAddFile:k,onRemoveFile:S,onCustomerLevelChange:_,onDoRegisterOosChange:F,onRun:L,onSelectionChange:R,onResume:x,onQuotationLineChange:P,onQuotationDraftSave:j,onQuotationDraftDismiss:K}=e,B=E=>{const O=ta(t,"/api/quotation/upload"),N=new FormData;N.append("file",E),fetch(O,{method:"POST",body:N,credentials:"same-origin"}).then(H=>H.json()).then(H=>{typeof H.file_path=="string"&&k(H.file_path,H.file_name??E.name)}).catch(H=>console.error("Work upload",H))},Ue=E=>{var H;const O=E.target,N=(H=O.files)==null?void 0:H[0];N&&(B(N),O.value="")},$=E=>{var N;E.preventDefault();const O=(N=E.dataTransfer)==null?void 0:N.files;if(!(!O||!O.length))for(let H=0;H<O.length;H+=1){const se=O.item(H);se&&B(se)}},C=E=>{E.preventDefault(),E.dataTransfer&&(E.dataTransfer.dropEffect="copy")};return c`
    <section class="card" style="margin-bottom: 16px;">
      <div class="card-title" style="margin-bottom: 8px;">${T("tabs.work")}</div>
      <p class="muted" style="margin-bottom: 12px;">${T("subtitles.work")}</p>

      <div
        style="margin-bottom: 12px; padding: 8px; border-radius: 8px; border: 1px dashed var(--border); background: var(--bg-secondary, #fafafa);"
        @dragover=${C}
        @dragenter=${C}
        @drop=${$}
      >
        <label class="card-title" style="font-size: 13px;">报价单文件（可多选）</label>
        <input
          type="file"
          accept=".xlsx,.xls,.xlsm"
          @change=${Ue}
          style="margin-top: 6px;"
        />
        ${n.length?c`
              <ul style="margin-top: 8px; padding-left: 20px; font-size: 13px;">
                ${n.map((E,O)=>c`
                    <li style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                      <span style="word-break: break-all;">${E.split(/[/\\]/).pop()??E}</span>
                      <button
                        type="button"
                        class="btn btn-sm"
                        style="padding: 2px 8px;"
                        @click=${()=>S(O)}
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
            .value=${g}
            @change=${E=>_(E.target.value)}
            style="margin-left: 8px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--bg); color: var(--text); min-width: 140px;"
          >
            ${Fg.map(E=>c`<option value=${E.value}>${E.label}</option>`)}
          </select>
        </div>
        <label style="display: flex; align-items: center; gap: 6px; font-size: 13px;">
          <input type="checkbox" ?checked=${f} @change=${E=>F(E.target.checked)} />
          执行无货登记
        </label>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${i?c`
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                ${Fi.map((E,O)=>c`
                    <span
                      style="
                        padding: 6px 12px;
                        border-radius: 8px;
                        font-size: 13px;
                        background: ${s>=0&&O===s?"var(--accent)":"var(--bg-secondary, #eee)"};
                        color: ${s>=0&&O===s?"var(--bg)":"var(--muted)"};
                        transition: background 0.2s, color 0.2s;
                      "
                    >
                      ${O+1}. ${E}
                    </span>
                  `)}
              </div>
              <p class="muted" style="font-size: 12px; margin: 0;">当前阶段：${s>=0&&s<Fi.length?Fi[s]:"执行中"}</p>
            `:y}
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

      ${u?c`<p style="margin-top: 12px; color: var(--danger, #e53935); font-size: 13px;">${u}</p>`:y}
    </section>

    ${o==="awaiting_choices"&&r.length?c`
          <section class="card" style="margin-bottom: 16px;">
            <div class="card-title">需要您选择</div>
            <p class="muted" style="margin-bottom: 12px;">以下项无法自动确定唯一型号，请为每项选择一个选项后点击「确认并继续」。</p>
            <ul style="list-style: none; padding: 0; margin: 0;">
              ${r.map(E=>{var O,N;return c`
                  <li style="margin-bottom: 16px; padding: 12px; border: 1px solid var(--border); border-radius: 8px; background: var(--bg-secondary, #f5f5f5);">
                    <div style="font-size: 13px; margin-bottom: 8px;">
                      ${E.product_name??E.keywords??""}
                      ${E.specification?c`<span class="muted"> · ${E.specification}</span>`:y}
                      ${E.qty!=null?c`<span class="muted"> · 数量 ${E.qty}</span>`:y}
                    </div>
                    <select
                      style="width: 100%; max-width: 400px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--bg); color: var(--text); font-size: 13px;"
                      .value=${d[E.id]??((N=(O=E.options)==null?void 0:O[0])==null?void 0:N.code)??""}
                      @change=${H=>R(E.id,H.target.value)}
                    >
                      <option value="__OOS__">按无货</option>
                      ${(E.options??[]).map(H=>c`<option value=${H.code}>${H.code}${H.matched_name?` · ${H.matched_name}`:""}${H.unit_price!=null?` · ¥${H.unit_price}`:""}</option>`)}
                    </select>
                  </li>
                `})}
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
        `:y}

    ${(b==null?void 0:b.status)==="ok"?c`
          <section class="card" style="margin-bottom: 16px;">
            <p style="color: var(--success, #2e7d32); margin: 0 0 8px 0;">报价单已保存，编号：${b.draft_no}</p>
            <button class="btn btn-sm" @click=${K}>关闭</button>
          </section>
        `:(z=m==null?void 0:m.lines)!=null&&z.length?c`
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
                    ${m.lines.map((E,O)=>c`
                        <tr>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${O+1}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${E.product_name??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${E.specification??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input
                              type="number"
                              min="0"
                              step="1"
                              .value=${String(E.qty??"")}
                              @change=${N=>P(O,"qty",N.target.value)}
                              style="width: 70px; padding: 4px; box-sizing: border-box;"
                            />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input
                              type="text"
                              .value=${E.code??""}
                              @change=${N=>P(O,"code",N.target.value)}
                              style="width: 90px; padding: 4px; box-sizing: border-box;"
                            />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input
                              type="text"
                              .value=${E.quote_name??""}
                              @change=${N=>P(O,"quote_name",N.target.value)}
                              style="width: 120px; padding: 4px; box-sizing: border-box;"
                            />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              .value=${E.unit_price!=null?String(E.unit_price):""}
                              @change=${N=>P(O,"unit_price",N.target.value)}
                              style="width: 80px; padding: 4px; box-sizing: border-box;"
                            />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${E.amount!=null?E.amount:""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${E.available_qty??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${E.shortfall??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${E.is_shortage?"是":"否"}</td>
                        </tr>
                      `)}
                  </tbody>
                </table>
              </div>
              ${(b==null?void 0:b.status)==="error"?c`<p style="color: var(--danger, #c00); margin-bottom: 10px;">${b.error}</p>`:y}
              <div style="display: flex; gap: 8px;">
                <button
                  class="btn"
                  style="background: var(--accent); color: var(--bg);"
                  ?disabled=${(b==null?void 0:b.status)==="saving"}
                  @click=${j}
                >
                  ${(b==null?void 0:b.status)==="saving"?"保存中…":"确认并保存"}
                </button>
                <button
                  class="btn btn-sm"
                  ?disabled=${(b==null?void 0:b.status)==="saving"}
                  @click=${K}
                >
                  取消
                </button>
              </div>
            </section>
          `:y}

    ${l&&!((U=m==null?void 0:m.lines)!=null&&U.length)?c`
          <section class="card">
            <div class="card-title">执行结果</div>
            ${n.length>1?c`<p class="muted" style="font-size: 12px; margin-bottom: 8px;">多文件时为汇总结果，输出文件见下方总结。</p>`:y}
            ${(()=>{const E=Og(l.trace);return E.length?c`
                    <div style="margin-bottom: 12px;">
                      ${E.map(O=>c`
                          <a
                            href=${ta(t,`/api/quotation/download?path=${encodeURIComponent(O)}`)}
                            download=${O}
                            class="btn btn-sm"
                            style="margin-right: 8px; margin-bottom: 6px; text-decoration: none;"
                          >
                            下载 ${O}
                          </a>
                        `)}
                      <p class="muted" style="font-size: 11px; margin: 4px 0 0 0;">云端部署时请及时下载到本地保存，服务器重启后文件会丢失。</p>
                    </div>
                  `:y})()}
            ${l.answer?c`<div style="white-space: pre-wrap; margin-bottom: 12px;">${l.answer}</div>`:y}
            ${l.error?c`<p style="color: var(--danger, #e53935);">${l.error}</p>`:y}
            ${(G=l.trace)!=null&&G.length?c`
                  <details style="margin-top: 12px;">
                    <summary>步骤记录（${l.trace.length} 条）</summary>
                    <div style="max-height: 420px; overflow: auto; margin-top: 8px;">
                      ${l.trace.map((E,O)=>Dg(E,O))}
                    </div>
                  </details>
                `:y}
          </section>
        `:y}
  `}function na(e){return(e||"").trim().replace(/\\/g,"/").toLowerCase()}function Bg(e){return e.tab!=="work"?y:Ng({basePath:e.basePath,workFilePaths:e.workFilePaths,workRunning:e.workRunning,workProgressStage:e.workProgressStage,workRunStatus:e.workRunStatus,workRunId:e.workRunId,workPendingChoices:e.workPendingChoices,workSelections:e.workSelections,workResult:e.workResult,workError:e.workError,workCustomerLevel:e.workCustomerLevel,workDoRegisterOos:e.workDoRegisterOos,workOriginalFileNamesByPath:e.workOriginalFileNamesByPath,workPendingQuotationDraft:e.workPendingQuotationDraft,workQuotationDraftSaveStatus:e.workQuotationDraftSaveStatus,onAddFile:(t,n)=>{e.workFilePaths.includes(t)||(e.workFilePaths=[...e.workFilePaths,t]);const i=na(t);i&&(e.workOriginalFileNamesByPath={...e.workOriginalFileNamesByPath,[i]:(n||"").trim()||t.split(/[/\\]/).pop()||t})},onRemoveFile:t=>{const n=e.workFilePaths[t]??"";e.workFilePaths=e.workFilePaths.filter((s,o)=>o!==t);const i=na(n);if(i&&e.workOriginalFileNamesByPath[i]!==void 0){const s={...e.workOriginalFileNamesByPath};delete s[i],e.workOriginalFileNamesByPath=s}},onCustomerLevelChange:t=>{e.workCustomerLevel=t},onDoRegisterOosChange:t=>{e.workDoRegisterOos=t},onRun:()=>void Rg(e),onSelectionChange:(t,n)=>{e.workSelections={...e.workSelections,[t]:n}},onResume:()=>void Ig(e),onQuotationLineChange:(t,n,i)=>{var r;const s=e.workPendingQuotationDraft;if(!((r=s==null?void 0:s.lines)!=null&&r.length)||t<0||t>=s.lines.length)return;const o=s.lines.slice(),a={...o[t]};if(n==="qty"){const d=Number(i);a.qty=Number.isFinite(d)?d:0}else if(n==="unit_price"){const d=String(i??"").trim();if(!d)a.unit_price=null;else{const l=Number(d);a.unit_price=Number.isFinite(l)?l:null}}else a[n]=i;if(n==="qty"||n==="unit_price"){const d=Number(a.qty??0),l=a.unit_price==null?NaN:Number(a.unit_price);a.amount=Number.isFinite(d)&&Number.isFinite(l)?d*l:null}o[t]=a,e.workPendingQuotationDraft={...s,lines:o}},onQuotationDraftSave:()=>void Mg(e),onQuotationDraftDismiss:()=>{e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null}})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ks={CHILD:2},Hs=e=>(...t)=>({_$litDirective$:e,values:t});let qs=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,i){this._$Ct=t,this._$AM=n,this._$Ci=i}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:Ug}=fc,ia=e=>e,zg=e=>e.strings===void 0,sa=()=>document.createComment(""),Dt=(e,t,n)=>{var o;const i=e._$AA.parentNode,s=t===void 0?e._$AB:t._$AA;if(n===void 0){const a=i.insertBefore(sa(),s),r=i.insertBefore(sa(),s);n=new Ug(a,r,e,e.options)}else{const a=n._$AB.nextSibling,r=n._$AM,d=r!==e;if(d){let l;(o=n._$AQ)==null||o.call(n,e),n._$AM=e,n._$AP!==void 0&&(l=e._$AU)!==r._$AU&&n._$AP(l)}if(a!==s||d){let l=n._$AA;for(;l!==a;){const u=ia(l).nextSibling;ia(i).insertBefore(l,s),l=u}}}return n},Ze=(e,t,n=e)=>(e._$AI(t,n),e),jg={},Kg=(e,t=jg)=>e._$AH=t,Hg=e=>e._$AH,Pi=e=>{e._$AR(),e._$AA.remove()};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const oa=(e,t,n)=>{const i=new Map;for(let s=t;s<=n;s++)i.set(e[s],s);return i},nl=Hs(class extends qs{constructor(e){if(super(e),e.type!==Ks.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,n){let i;n===void 0?n=t:t!==void 0&&(i=t);const s=[],o=[];let a=0;for(const r of e)s[a]=i?i(r,a):a,o[a]=n(r,a),a++;return{values:o,keys:s}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,i]){const s=Hg(e),{values:o,keys:a}=this.dt(t,n,i);if(!Array.isArray(s))return this.ut=a,o;const r=this.ut??(this.ut=[]),d=[];let l,u,g=0,f=s.length-1,m=0,b=o.length-1;for(;g<=f&&m<=b;)if(s[g]===null)g++;else if(s[f]===null)f--;else if(r[g]===a[m])d[m]=Ze(s[g],o[m]),g++,m++;else if(r[f]===a[b])d[b]=Ze(s[f],o[b]),f--,b--;else if(r[g]===a[b])d[b]=Ze(s[g],o[b]),Dt(e,d[b+1],s[g]),g++,b--;else if(r[f]===a[m])d[m]=Ze(s[f],o[m]),Dt(e,s[g],s[f]),f--,m++;else if(l===void 0&&(l=oa(a,m,b),u=oa(r,g,f)),l.has(r[g]))if(l.has(r[f])){const k=u.get(a[m]),S=k!==void 0?s[k]:null;if(S===null){const _=Dt(e,s[g]);Ze(_,o[m]),d[m]=_}else d[m]=Ze(S,o[m]),Dt(e,s[g],S),s[k]=null;m++}else Pi(s[f]),f--;else Pi(s[g]),g++;for(;m<=b;){const k=Dt(e,d[b+1]);Ze(k,o[m]),d[m++]=k}for(;g<=f;){const k=s[g++];k!==null&&Pi(k)}return this.ut=a,Kg(e,d),Ge}}),ie={messageSquare:c`
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
  `};function qg(e){var s,o,a,r,d;const t=(s=e.hello)==null?void 0:s.snapshot,n=(a=(o=t==null?void 0:t.sessionDefaults)==null?void 0:o.mainSessionKey)==null?void 0:a.trim();if(n)return n;const i=(d=(r=t==null?void 0:t.sessionDefaults)==null?void 0:r.mainKey)==null?void 0:d.trim();return i||"main"}function Gg(e,t){e.sessionKey=t,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:t,lastActiveSessionKey:t})}function Wg(e,t){const n=ti(t,e.basePath);return c`
    <a
      href=${n}
      class="nav-item ${e.tab===t?"active":""}"
      @click=${i=>{if(!(i.defaultPrevented||i.button!==0||i.metaKey||i.ctrlKey||i.shiftKey||i.altKey)){if(i.preventDefault(),t==="chat"){const s=qg(e);e.sessionKey!==s&&(Gg(e,s),e.loadAssistantIdentity())}e.setTab(t)}}}
      title=${es(t)}
    >
      <span class="nav-item__icon" aria-hidden="true">${ie[fu(t)]}</span>
      <span class="nav-item__text">${es(t)}</span>
    </a>
  `}function Vg(e){const t=Qg(e.hello,e.sessionsResult),n=Xg(e.sessionKey,e.sessionsResult,t),i=e.onboarding,s=e.onboarding,o=e.onboarding?!1:e.settings.chatShowThinking,a=e.onboarding?!0:e.settings.chatFocusMode,r=c`
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
  `,d=c`
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
          @change=${l=>{const u=l.target.value;e.sessionKey=u,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:u,lastActiveSessionKey:u}),e.loadAssistantIdentity(),Eu(e,u),an(e)}}
        >
          ${nl(n,l=>l.key,l=>c`<option value=${l.key} title=${l.key}>
                ${l.displayName??l.key}
              </option>`)}
        </select>
      </label>
      <button
        class="btn btn--sm btn--icon"
        ?disabled=${e.chatLoading||!e.connected}
        @click=${async()=>{const l=e;l.chatManualRefreshInFlight=!0,l.chatNewMessagesBelow=!1,await l.updateComplete,l.resetToolStream();try{await Yr(e,{scheduleScroll:!1}),l.scrollToBottom({smooth:!0})}finally{requestAnimationFrame(()=>{l.chatManualRefreshInFlight=!1,l.chatNewMessagesBelow=!1})}}}
        title=${T("chat.refreshTitle")}
      >
        ${r}
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
        class="btn btn--sm btn--icon ${a?"active":""}"
        ?disabled=${s}
        @click=${()=>{s||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})}}
        aria-pressed=${a}
        title=${T(s?"chat.onboardingDisabled":"chat.focusToggle")}
      >
        ${d}
      </button>
    </div>
  `}function Qg(e,t){var o,a,r,d,l;const n=e==null?void 0:e.snapshot,i=(a=(o=n==null?void 0:n.sessionDefaults)==null?void 0:o.mainSessionKey)==null?void 0:a.trim();if(i)return i;const s=(d=(r=n==null?void 0:n.sessionDefaults)==null?void 0:r.mainKey)==null?void 0:d.trim();return s||((l=t==null?void 0:t.sessions)!=null&&l.some(u=>u.key==="main")?"main":null)}const Mn={bluebubbles:"iMessage",telegram:"Telegram",discord:"Discord",signal:"Signal",slack:"Slack",whatsapp:"WhatsApp",matrix:"Matrix",email:"Email",sms:"SMS"},Jg=Object.keys(Mn);function aa(e){return e.charAt(0).toUpperCase()+e.slice(1)}function Yg(e){if(e==="main"||e==="agent:main:main")return{prefix:"",fallbackName:"Main Session"};if(e.includes(":subagent:"))return{prefix:"Subagent:",fallbackName:"Subagent:"};if(e.includes(":cron:"))return{prefix:"Cron:",fallbackName:"Cron Job:"};const t=e.match(/^agent:[^:]+:([^:]+):direct:(.+)$/);if(t){const i=t[1],s=t[2];return{prefix:"",fallbackName:`${Mn[i]??aa(i)} · ${s}`}}const n=e.match(/^agent:[^:]+:([^:]+):group:(.+)$/);if(n){const i=n[1];return{prefix:"",fallbackName:`${Mn[i]??aa(i)} Group`}}for(const i of Jg)if(e===i||e.startsWith(`${i}:`))return{prefix:"",fallbackName:`${Mn[i]} Session`};return{prefix:"",fallbackName:e}}function Di(e,t){var r,d;const n=((r=t==null?void 0:t.label)==null?void 0:r.trim())||"",i=((d=t==null?void 0:t.displayName)==null?void 0:d.trim())||"",{prefix:s,fallbackName:o}=Yg(e),a=l=>s?new RegExp(`^${s.replace(/[.*+?^${}()|[\\]\\]/g,"\\$&")}\\s*`,"i").test(l)?l:`${s} ${l}`:l;return n&&n!==e?a(n):i&&i!==e?a(i):o}function Xg(e,t,n){var r,d;const i=new Set,s=[],o=n&&((r=t==null?void 0:t.sessions)==null?void 0:r.find(l=>l.key===n)),a=(d=t==null?void 0:t.sessions)==null?void 0:d.find(l=>l.key===e);if(n&&(i.add(n),s.push({key:n,displayName:Di(n,o||void 0)})),i.has(e)||(i.add(e),s.push({key:e,displayName:Di(e,a)})),t!=null&&t.sessions)for(const l of t.sessions)i.has(l.key)||(i.add(l.key),s.push({key:l.key,displayName:Di(l.key,l)}));return s}const Zg=["system","light","dark"];function ef(e){const t=Math.max(0,Zg.indexOf(e.theme)),n=i=>s=>{const a={element:s.currentTarget};(s.clientX||s.clientY)&&(a.pointerClientX=s.clientX,a.pointerClientY=s.clientY),e.setTheme(i,a)};return c`
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
          ${sf()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="light"?"active":""}"
          @click=${n("light")}
          aria-pressed=${e.theme==="light"}
          aria-label="Light theme"
          title="Light"
        >
          ${tf()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="dark"?"active":""}"
          @click=${n("dark")}
          aria-pressed=${e.theme==="dark"}
          aria-label="Dark theme"
          title="Dark"
        >
          ${nf()}
        </button>
      </div>
    </div>
  `}function tf(){return c`
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
  `}function nf(){return c`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
      ></path>
    </svg>
  `}function sf(){return c`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="20" height="14" x="2" y="3" rx="2"></rect>
      <line x1="8" x2="16" y1="21" y2="21"></line>
      <line x1="12" x2="12" y1="17" y2="21"></line>
    </svg>
  `}function il(e,t){if(!e)return e;const i=e.files.some(s=>s.name===t.name)?e.files.map(s=>s.name===t.name?t:s):[...e.files,t];return{...e,files:i}}async function Oi(e,t){if(!(!e.client||!e.connected||e.agentFilesLoading)){e.agentFilesLoading=!0,e.agentFilesError=null;try{const n=await e.client.request("agents.files.list",{agentId:t});n&&(e.agentFilesList=n,e.agentFileActive&&!n.files.some(i=>i.name===e.agentFileActive)&&(e.agentFileActive=null))}catch(n){e.agentFilesError=String(n)}finally{e.agentFilesLoading=!1}}}async function of(e,t,n,i){if(!(!e.client||!e.connected||e.agentFilesLoading)&&!Object.hasOwn(e.agentFileContents,n)){e.agentFilesLoading=!0,e.agentFilesError=null;try{const s=await e.client.request("agents.files.get",{agentId:t,name:n});if(s!=null&&s.file){const o=s.file.content??"",a=e.agentFileContents[n]??"",r=e.agentFileDrafts[n],d=(i==null?void 0:i.preserveDraft)??!0;e.agentFilesList=il(e.agentFilesList,s.file),e.agentFileContents={...e.agentFileContents,[n]:o},(!d||!Object.hasOwn(e.agentFileDrafts,n)||r===a)&&(e.agentFileDrafts={...e.agentFileDrafts,[n]:o})}}catch(s){e.agentFilesError=String(s)}finally{e.agentFilesLoading=!1}}}async function af(e,t,n,i){if(!(!e.client||!e.connected||e.agentFileSaving)){e.agentFileSaving=!0,e.agentFilesError=null;try{const s=await e.client.request("agents.files.set",{agentId:t,name:n,content:i});s!=null&&s.file&&(e.agentFilesList=il(e.agentFilesList,s.file),e.agentFileContents={...e.agentFileContents,[n]:i},e.agentFileDrafts={...e.agentFileDrafts,[n]:i})}catch(s){e.agentFilesError=String(s)}finally{e.agentFileSaving=!1}}}function Gs(e){return e?`${lt(e)} (${Be(e)})`:"n/a"}function rf(e){if(e.totalTokens==null)return"n/a";const t=e.totalTokens??0,n=e.contextTokens??0;return n?`${t} / ${n}`:String(t)}function lf(e){if(e==null)return"";try{return JSON.stringify(e,null,2)}catch{return String(e)}}function cf(e){const t=e.state??{},n=t.nextRunAtMs?lt(t.nextRunAtMs):"n/a",i=t.lastRunAtMs?lt(t.lastRunAtMs):"n/a";return`${t.lastStatus??"n/a"} · next ${n} · last ${i}`}function sl(e){const t=e.schedule;if(t.kind==="at"){const n=Date.parse(t.at);return Number.isFinite(n)?`At ${lt(n)}`:`At ${t.at}`}return t.kind==="every"?`Every ${hr(t.everyMs)}`:`Cron ${t.expr}${t.tz?` (${t.tz})`:""}`}function df(e){const t=e.payload;if(t.kind==="systemEvent")return`System: ${t.text}`;const n=`Agent: ${t.message}`,i=e.delivery;if(i&&i.mode!=="none"){const s=i.mode==="webhook"?i.to?` (${i.to})`:"":i.channel||i.to?` (${i.channel??"last"}${i.to?` -> ${i.to}`:""})`:"";return`${n} · ${i.mode}${s}`}return n}function Oe(e){const t=(e??"").trim();return t?t.replace(/\s+/g,"_").toLowerCase():""}function uf(e){return[]}function gf(e){return{allow:[],alsoAllow:[],deny:[]}}const ra=[{id:"fs",label:"Files",tools:[{id:"read",label:"read",description:"Read file contents"},{id:"write",label:"write",description:"Create or overwrite files"},{id:"edit",label:"edit",description:"Make precise edits"},{id:"apply_patch",label:"apply_patch",description:"Patch files (OpenAI)"}]},{id:"runtime",label:"Runtime",tools:[{id:"exec",label:"exec",description:"Run shell commands"},{id:"process",label:"process",description:"Manage background processes"}]},{id:"web",label:"Web",tools:[{id:"web_search",label:"web_search",description:"Search the web"},{id:"web_fetch",label:"web_fetch",description:"Fetch web content"}]},{id:"memory",label:"Memory",tools:[{id:"memory_search",label:"memory_search",description:"Semantic search"},{id:"memory_get",label:"memory_get",description:"Read memory files"}]},{id:"sessions",label:"Sessions",tools:[{id:"sessions_list",label:"sessions_list",description:"List sessions"},{id:"sessions_history",label:"sessions_history",description:"Session history"},{id:"sessions_send",label:"sessions_send",description:"Send to session"},{id:"sessions_spawn",label:"sessions_spawn",description:"Spawn sub-agent"},{id:"session_status",label:"session_status",description:"Session status"}]},{id:"ui",label:"UI",tools:[{id:"browser",label:"browser",description:"Control web browser"},{id:"canvas",label:"canvas",description:"Control canvases"}]},{id:"messaging",label:"Messaging",tools:[{id:"message",label:"message",description:"Send messages"}]},{id:"automation",label:"Automation",tools:[{id:"cron",label:"cron",description:"Schedule tasks"},{id:"gateway",label:"gateway",description:"Gateway control"}]},{id:"nodes",label:"Nodes",tools:[{id:"nodes",label:"nodes",description:"Nodes + devices"}]},{id:"agents",label:"Agents",tools:[{id:"agents_list",label:"agents_list",description:"List agents"}]},{id:"media",label:"Media",tools:[{id:"image",label:"image",description:"Image understanding"}]}],ff=[{id:"minimal",label:"Minimal"},{id:"coding",label:"Coding"},{id:"messaging",label:"Messaging"},{id:"full",label:"Full"}];function os(e){var t,n,i;return((t=e.name)==null?void 0:t.trim())||((i=(n=e.identity)==null?void 0:n.name)==null?void 0:i.trim())||e.id}function $n(e){const t=e.trim();if(!t||t.length>16)return!1;let n=!1;for(let i=0;i<t.length;i+=1)if(t.charCodeAt(i)>127){n=!0;break}return!(!n||t.includes("://")||t.includes("/")||t.includes("."))}function oi(e,t){var a,r,d,l,u,g;const n=(a=t==null?void 0:t.emoji)==null?void 0:a.trim();if(n&&$n(n))return n;const i=(d=(r=e.identity)==null?void 0:r.emoji)==null?void 0:d.trim();if(i&&$n(i))return i;const s=(l=t==null?void 0:t.avatar)==null?void 0:l.trim();if(s&&$n(s))return s;const o=(g=(u=e.identity)==null?void 0:u.avatar)==null?void 0:g.trim();return o&&$n(o)?o:""}function ol(e,t){return t&&e===t?"default":null}function pf(e){if(e==null||!Number.isFinite(e))return"-";if(e<1024)return`${e} B`;const t=["KB","MB","GB","TB"];let n=e/1024,i=0;for(;n>=1024&&i<t.length-1;)n/=1024,i+=1;return`${n.toFixed(n<10?1:0)} ${t[i]}`}function ai(e,t){var o,a;const n=e;return{entry:(((o=n==null?void 0:n.agents)==null?void 0:o.list)??[]).find(r=>(r==null?void 0:r.id)===t),defaults:(a=n==null?void 0:n.agents)==null?void 0:a.defaults,globalTools:n==null?void 0:n.tools}}function la(e,t,n,i,s){var m,b,k,S,_,F,L,R,x,P,j,K;const o=ai(t,e.id),r=(n&&n.agentId===e.id?n.workspace:null)||((m=o.entry)==null?void 0:m.workspace)||((b=o.defaults)==null?void 0:b.workspace)||"default",d=(k=o.entry)!=null&&k.model?Vt((S=o.entry)==null?void 0:S.model):Vt((_=o.defaults)==null?void 0:_.model),l=((F=s==null?void 0:s.name)==null?void 0:F.trim())||((R=(L=e.identity)==null?void 0:L.name)==null?void 0:R.trim())||((x=e.name)==null?void 0:x.trim())||((P=o.entry)==null?void 0:P.name)||e.id,u=oi(e,s)||"-",g=Array.isArray((j=o.entry)==null?void 0:j.skills)?(K=o.entry)==null?void 0:K.skills:null,f=(g==null?void 0:g.length)??null;return{workspace:r,model:d,identityName:l,identityEmoji:u,skillsLabel:g?`${f} selected`:"all skills",isDefault:!!(i&&e.id===i)}}function Vt(e){var t;if(!e)return"-";if(typeof e=="string")return e.trim()||"-";if(typeof e=="object"&&e){const n=e,i=(t=n.primary)==null?void 0:t.trim();if(i){const s=Array.isArray(n.fallbacks)?n.fallbacks.length:0;return s>0?`${i} (+${s} fallback)`:i}}return"-"}function ca(e){const t=e.match(/^(.+) \(\+\d+ fallback\)$/);return t?t[1]:e}function da(e){if(!e)return null;if(typeof e=="string")return e.trim()||null;if(typeof e=="object"&&e){const t=e,n=typeof t.primary=="string"?t.primary:typeof t.model=="string"?t.model:typeof t.id=="string"?t.id:typeof t.value=="string"?t.value:null;return(n==null?void 0:n.trim())||null}return null}function hf(e){if(!e||typeof e=="string")return null;if(typeof e=="object"&&e){const t=e,n=Array.isArray(t.fallbacks)?t.fallbacks:Array.isArray(t.fallback)?t.fallback:null;return n?n.filter(i=>typeof i=="string"):null}return null}function vf(e){return e.split(",").map(t=>t.trim()).filter(Boolean)}function mf(e){var s,o,a;const t=e,n=(o=(s=t==null?void 0:t.agents)==null?void 0:s.defaults)==null?void 0:o.models;if(!n||typeof n!="object")return[];const i=[];for(const[r,d]of Object.entries(n)){const l=r.trim();if(!l)continue;const u=d&&typeof d=="object"&&"alias"in d&&typeof d.alias=="string"?(a=d.alias)==null?void 0:a.trim():void 0,g=u&&u!==l?`${u} (${l})`:l;i.push({value:l,label:g})}return i}function yf(e,t){const n=mf(e),i=t?n.some(s=>s.value===t):!1;return t&&!i&&n.unshift({value:t,label:`Current (${t})`}),n.length===0?c`
      <option value="" disabled>No configured models</option>
    `:n.map(s=>c`<option value=${s.value}>${s.label}</option>`)}function bf(e){const t=Oe(e);if(!t)return{kind:"exact",value:""};if(t==="*")return{kind:"all"};if(!t.includes("*"))return{kind:"exact",value:t};const n=t.replace(/[.*+?^${}()|[\\]\\]/g,"\\$&");return{kind:"regex",value:new RegExp(`^${n.replaceAll("\\*",".*")}$`)}}function as(e){return Array.isArray(e)?uf().map(bf).filter(t=>t.kind!=="exact"||t.value.length>0):[]}function Qt(e,t){for(const n of t)if(n.kind==="all"||n.kind==="exact"&&e===n.value||n.kind==="regex"&&n.value.test(e))return!0;return!1}function wf(e,t){if(!t)return!0;const n=Oe(e),i=as(t.deny);if(Qt(n,i))return!1;const s=as(t.allow);return!!(s.length===0||Qt(n,s)||n==="apply_patch"&&Qt("exec",s))}function ua(e,t){if(!Array.isArray(t)||t.length===0)return!1;const n=Oe(e),i=as(t);return!!(Qt(n,i)||n==="apply_patch"&&Qt("exec",i))}function $f(e){return gf()??void 0}function al(e,t){return c`
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
  `}function kf(e,t){var i,s;const n=(i=e.channelMeta)==null?void 0:i.find(o=>o.id===t);return n!=null&&n.label?n.label:((s=e.channelLabels)==null?void 0:s[t])??t}function xf(e){var s;if(!e)return[];const t=new Set;for(const o of e.channelOrder??[])t.add(o);for(const o of e.channelMeta??[])t.add(o.id);for(const o of Object.keys(e.channelAccounts??{}))t.add(o);const n=[],i=(s=e.channelOrder)!=null&&s.length?e.channelOrder:Array.from(t);for(const o of i)t.has(o)&&(n.push(o),t.delete(o));for(const o of t)n.push(o);return n.map(o=>{var a;return{id:o,label:kf(e,o),accounts:((a=e.channelAccounts)==null?void 0:a[o])??[]}})}const Sf=["groupPolicy","streamMode","dmPolicy"];function Af(e,t){if(!e)return null;const i=(e.channels??{})[t];if(i&&typeof i=="object")return i;const s=e[t];return s&&typeof s=="object"?s:null}function _f(e){if(e==null)return"n/a";if(typeof e=="string"||typeof e=="number"||typeof e=="boolean")return String(e);try{return JSON.stringify(e)}catch{return"n/a"}}function Cf(e,t){const n=Af(e,t);return n?Sf.flatMap(i=>i in n?[{label:i,value:_f(n[i])}]:[]):[]}function Tf(e){let t=0,n=0,i=0;for(const s of e){const o=s.probe&&typeof s.probe=="object"&&"ok"in s.probe?!!s.probe.ok:!1;(s.connected===!0||s.running===!0||o)&&(t+=1),s.configured&&(n+=1),s.enabled&&(i+=1)}return{total:e.length,connected:t,configured:n,enabled:i}}function Ef(e){const t=xf(e.snapshot),n=e.lastSuccess?Be(e.lastSuccess):"never";return c`
    <section class="grid grid-cols-2">
      ${al(e.context,"Workspace, identity, and model configuration.")}
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
        ${e.error?c`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:y}
        ${e.snapshot?y:c`
                <div class="callout info" style="margin-top: 12px">Load channels to see live status.</div>
              `}
        ${t.length===0?c`
                <div class="muted" style="margin-top: 16px">No channels found.</div>
              `:c`
                <div class="list" style="margin-top: 16px;">
                  ${t.map(i=>{const s=Tf(i.accounts),o=s.total?`${s.connected}/${s.total} connected`:"no accounts",a=s.configured?`${s.configured} configured`:"not configured",r=s.total?`${s.enabled} enabled`:"disabled",d=Cf(e.configForm,i.id);return c`
                      <div class="list-item">
                        <div class="list-main">
                          <div class="list-title">${i.label}</div>
                          <div class="list-sub mono">${i.id}</div>
                        </div>
                        <div class="list-meta">
                          <div>${o}</div>
                          <div>${a}</div>
                          <div>${r}</div>
                          ${d.length>0?d.map(l=>c`<div>${l.label}: ${l.value}</div>`):y}
                        </div>
                      </div>
                    `})}
                </div>
              `}
      </section>
    </section>
  `}function Lf(e){var n,i;const t=e.jobs.filter(s=>s.agentId===e.agentId);return c`
    <section class="grid grid-cols-2">
      ${al(e.context,"Workspace and scheduling targets.")}
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
            <div class="stat-value">${Gs(((i=e.status)==null?void 0:i.nextWakeAtMs)??null)}</div>
          </div>
        </div>
        ${e.error?c`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:y}
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
                        ${s.description?c`<div class="list-sub">${s.description}</div>`:y}
                        <div class="chip-row" style="margin-top: 6px;">
                          <span class="chip">${sl(s)}</span>
                          <span class="chip ${s.enabled?"chip-ok":"chip-warn"}">
                            ${s.enabled?"enabled":"disabled"}
                          </span>
                          <span class="chip">${s.sessionTarget}</span>
                        </div>
                      </div>
                      <div class="list-meta">
                        <div class="mono">${cf(s)}</div>
                        <div class="muted">${df(s)}</div>
                      </div>
                    </div>
                  `)}
              </div>
            `}
    </section>
  `}function Rf(e){var d;const t=((d=e.agentFilesList)==null?void 0:d.agentId)===e.agentId?e.agentFilesList:null,n=(t==null?void 0:t.files)??[],i=e.agentFileActive??null,s=i?n.find(l=>l.name===i)??null:null,o=i?e.agentFileContents[i]??"":"",a=i?e.agentFileDrafts[i]??o:"",r=i?a!==o:!1;return c`
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
      ${t?c`<div class="muted mono" style="margin-top: 8px;">Workspace: ${t.workspace}</div>`:y}
      ${e.agentFilesError?c`<div class="callout danger" style="margin-top: 12px;">${e.agentFilesError}</div>`:y}
      ${t?c`
              <div class="agent-files-grid" style="margin-top: 16px;">
                <div class="agent-files-list">
                  ${n.length===0?c`
                          <div class="muted">No files found.</div>
                        `:n.map(l=>If(l,i,()=>e.onSelectFile(l.name)))}
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
                          ${s.missing?c`
                                  <div class="callout info" style="margin-top: 10px">
                                    This file is missing. Saving will create it in the agent workspace.
                                  </div>
                                `:y}
                          <label class="field" style="margin-top: 12px;">
                            <span>Content</span>
                            <textarea
                              .value=${a}
                              @input=${l=>e.onFileDraftChange(s.name,l.target.value)}
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
  `}function If(e,t,n){const i=e.missing?"Missing":`${pf(e.size)} · ${Be(e.updatedAtMs??null)}`;return c`
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
            `:y}
    </button>
  `}const kn=[{id:"workspace",label:"Workspace Skills",sources:["openclaw-workspace"]},{id:"built-in",label:"Built-in Skills",sources:["openclaw-bundled"]},{id:"installed",label:"Installed Skills",sources:["openclaw-managed"]},{id:"extra",label:"Extra Skills",sources:["openclaw-extra"]}];function rl(e){var o;const t=new Map;for(const a of kn)t.set(a.id,{id:a.id,label:a.label,skills:[]});const n=kn.find(a=>a.id==="built-in"),i={id:"other",label:"Other Skills",skills:[]};for(const a of e){const r=a.bundled?n:kn.find(d=>d.sources.includes(a.source));r?(o=t.get(r.id))==null||o.skills.push(a):i.skills.push(a)}const s=kn.map(a=>t.get(a.id)).filter(a=>!!(a&&a.skills.length>0));return i.skills.length>0&&s.push(i),s}function ll(e){return[...e.missing.bins.map(t=>`bin:${t}`),...e.missing.env.map(t=>`env:${t}`),...e.missing.config.map(t=>`config:${t}`),...e.missing.os.map(t=>`os:${t}`)]}function cl(e){const t=[];return e.disabled&&t.push("disabled"),e.blockedByAllowlist&&t.push("blocked by allowlist"),t}function dl(e){const t=e.skill,n=!!e.showBundledBadge;return c`
    <div class="chip-row" style="margin-top: 6px;">
      <span class="chip">${t.source}</span>
      ${n?c`
              <span class="chip">bundled</span>
            `:y}
      <span class="chip ${t.eligible?"chip-ok":"chip-warn"}">
        ${t.eligible?"eligible":"blocked"}
      </span>
      ${t.disabled?c`
              <span class="chip chip-warn">disabled</span>
            `:y}
    </div>
  `}function Mf(e){var _;const t=ai(e.configForm,e.agentId),n=((_=t.entry)==null?void 0:_.tools)??{},i=t.globalTools??{},s=n.profile??i.profile??"full",o=n.profile?"agent override":i.profile?"global default":"default",a=Array.isArray(n.allow)&&n.allow.length>0,r=Array.isArray(i.allow)&&i.allow.length>0,d=!!e.configForm&&!e.configLoading&&!e.configSaving&&!a,l=a?[]:Array.isArray(n.alsoAllow)?n.alsoAllow:[],u=a?[]:Array.isArray(n.deny)?n.deny:[],g=a?{allow:n.allow??[],deny:n.deny??[]}:$f()??void 0,f=ra.flatMap(F=>F.tools.map(L=>L.id)),m=F=>{const L=wf(F,g),R=ua(F,l),x=ua(F,u);return{allowed:(L||R)&&!x,baseAllowed:L,denied:x}},b=f.filter(F=>m(F).allowed).length,k=(F,L)=>{const R=new Set(l.map(K=>Oe(K)).filter(K=>K.length>0)),x=new Set(u.map(K=>Oe(K)).filter(K=>K.length>0)),P=m(F).baseAllowed,j=Oe(F);L?(x.delete(j),P||R.add(j)):(R.delete(j),x.add(j)),e.onOverridesChange(e.agentId,[...R],[...x])},S=F=>{const L=new Set(l.map(x=>Oe(x)).filter(x=>x.length>0)),R=new Set(u.map(x=>Oe(x)).filter(x=>x.length>0));for(const x of f){const P=m(x).baseAllowed,j=Oe(x);F?(R.delete(j),P||L.add(j)):(L.delete(j),R.add(j))}e.onOverridesChange(e.agentId,[...L],[...R])};return c`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Tool Access</div>
          <div class="card-sub">
            Profile + per-tool overrides for this agent.
            <span class="mono">${b}/${f.length}</span> enabled.
          </div>
        </div>
        <div class="row" style="gap: 8px;">
          <button class="btn btn--sm" ?disabled=${!d} @click=${()=>S(!0)}>
            Enable All
          </button>
          <button class="btn btn--sm" ?disabled=${!d} @click=${()=>S(!1)}>
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

      ${e.configForm?y:c`
              <div class="callout info" style="margin-top: 12px">
                Load the gateway config to adjust tool profiles.
              </div>
            `}
      ${a?c`
              <div class="callout info" style="margin-top: 12px">
                This agent is using an explicit allowlist in config. Tool overrides are managed in the Config tab.
              </div>
            `:y}
      ${r?c`
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
        ${e.configDirty?c`
                <div class="agent-kv">
                  <div class="label">Status</div>
                  <div class="mono">unsaved</div>
                </div>
              `:y}
      </div>

      <div class="agent-tools-presets" style="margin-top: 16px;">
        <div class="label">Quick Presets</div>
        <div class="agent-tools-buttons">
          ${ff.map(F=>c`
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
        ${ra.map(F=>c`
              <div class="agent-tools-section">
                <div class="agent-tools-header">${F.label}</div>
                <div class="agent-tools-list">
                  ${F.tools.map(L=>{const{allowed:R}=m(L.id);return c`
                      <div class="agent-tool-row">
                        <div>
                          <div class="agent-tool-title mono">${L.label}</div>
                          <div class="agent-tool-sub">${L.description}</div>
                        </div>
                        <label class="cfg-toggle">
                          <input
                            type="checkbox"
                            .checked=${R}
                            ?disabled=${!d}
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
  `}function Ff(e){var m,b,k;const t=!!e.configForm&&!e.configLoading&&!e.configSaving,n=ai(e.configForm,e.agentId),i=Array.isArray((m=n.entry)==null?void 0:m.skills)?(b=n.entry)==null?void 0:b.skills:void 0,s=new Set((i??[]).map(S=>S.trim()).filter(Boolean)),o=i!==void 0,a=!!(e.report&&e.activeAgentId===e.agentId),r=a?((k=e.report)==null?void 0:k.skills)??[]:[],d=e.filter.trim().toLowerCase(),l=d?r.filter(S=>[S.name,S.description,S.source].join(" ").toLowerCase().includes(d)):r,u=rl(l),g=o?r.filter(S=>s.has(S.name)).length:r.length,f=r.length;return c`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Skills</div>
          <div class="card-sub">
            Per-agent skill allowlist and workspace skills.
            ${f>0?c`<span class="mono">${g}/${f}</span>`:y}
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

      ${e.configForm?y:c`
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
      ${!a&&!e.loading?c`
              <div class="callout info" style="margin-top: 12px">
                Load skills for this agent to view workspace-specific entries.
              </div>
            `:y}
      ${e.error?c`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:y}

      <div class="filters" style="margin-top: 14px;">
        <label class="field" style="flex: 1;">
          <span>Filter</span>
          <input
            .value=${e.filter}
            @input=${S=>e.onFilterChange(S.target.value)}
            placeholder="Search skills"
          />
        </label>
        <div class="muted">${l.length} shown</div>
      </div>

      ${l.length===0?c`
              <div class="muted" style="margin-top: 16px">No skills found.</div>
            `:c`
              <div class="agent-skills-groups" style="margin-top: 16px;">
                ${u.map(S=>Pf(S,{agentId:e.agentId,allowSet:s,usingAllowlist:o,editable:t,onToggle:e.onToggle}))}
              </div>
            `}
    </section>
  `}function Pf(e,t){const n=e.id==="workspace"||e.id==="built-in";return c`
    <details class="agent-skills-group" ?open=${!n}>
      <summary class="agent-skills-header">
        <span>${e.label}</span>
        <span class="muted">${e.skills.length}</span>
      </summary>
      <div class="list skills-grid">
        ${e.skills.map(i=>Df(i,{agentId:t.agentId,allowSet:t.allowSet,usingAllowlist:t.usingAllowlist,editable:t.editable,onToggle:t.onToggle}))}
      </div>
    </details>
  `}function Df(e,t){const n=t.usingAllowlist?t.allowSet.has(e.name):!0,i=ll(e),s=cl(e);return c`
    <div class="list-item agent-skill-row">
      <div class="list-main">
        <div class="list-title">${e.emoji?`${e.emoji} `:""}${e.name}</div>
        <div class="list-sub">${e.description}</div>
        ${dl({skill:e})}
        ${i.length>0?c`<div class="muted" style="margin-top: 6px;">Missing: ${i.join(", ")}</div>`:y}
        ${s.length>0?c`<div class="muted" style="margin-top: 6px;">Reason: ${s.join(", ")}</div>`:y}
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
  `}function Of(e){var o,a,r;const t=((o=e.agentsList)==null?void 0:o.agents)??[],n=((a=e.agentsList)==null?void 0:a.defaultId)??null,i=e.selectedAgentId??n??((r=t[0])==null?void 0:r.id)??null,s=i?t.find(d=>d.id===i)??null:null;return c`
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
        ${e.error?c`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:y}
        <div class="agent-list" style="margin-top: 12px;">
          ${t.length===0?c`
                  <div class="muted">No agents found.</div>
                `:t.map(d=>{const l=ol(d.id,n),u=oi(d,e.agentIdentityById[d.id]??null);return c`
                    <button
                      type="button"
                      class="agent-row ${i===d.id?"active":""}"
                      @click=${()=>e.onSelectAgent(d.id)}
                    >
                      <div class="agent-avatar">${u||os(d).slice(0,1)}</div>
                      <div class="agent-info">
                        <div class="agent-title">${os(d)}</div>
                        <div class="agent-sub mono">${d.id}</div>
                      </div>
                      ${l?c`<span class="agent-pill">${l}</span>`:y}
                    </button>
                  `})}
        </div>
      </section>
      <section class="agents-main">
        ${s?c`
                ${Nf(s,n,e.agentIdentityById[s.id]??null)}
                ${Bf(e.activePanel,d=>e.onSelectPanel(d))}
                ${e.activePanel==="overview"?Uf({agent:s,defaultId:n,configForm:e.configForm,agentFilesList:e.agentFilesList,agentIdentity:e.agentIdentityById[s.id]??null,agentIdentityError:e.agentIdentityError,agentIdentityLoading:e.agentIdentityLoading,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave,onModelChange:e.onModelChange,onModelFallbacksChange:e.onModelFallbacksChange}):y}
                ${e.activePanel==="files"?Rf({agentId:s.id,agentFilesList:e.agentFilesList,agentFilesLoading:e.agentFilesLoading,agentFilesError:e.agentFilesError,agentFileActive:e.agentFileActive,agentFileContents:e.agentFileContents,agentFileDrafts:e.agentFileDrafts,agentFileSaving:e.agentFileSaving,onLoadFiles:e.onLoadFiles,onSelectFile:e.onSelectFile,onFileDraftChange:e.onFileDraftChange,onFileReset:e.onFileReset,onFileSave:e.onFileSave}):y}
                ${e.activePanel==="tools"?Mf({agentId:s.id,configForm:e.configForm,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,onProfileChange:e.onToolsProfileChange,onOverridesChange:e.onToolsOverridesChange,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):y}
                ${e.activePanel==="skills"?Ff({agentId:s.id,report:e.agentSkillsReport,loading:e.agentSkillsLoading,error:e.agentSkillsError,activeAgentId:e.agentSkillsAgentId,configForm:e.configForm,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,filter:e.skillsFilter,onFilterChange:e.onSkillsFilterChange,onRefresh:e.onSkillsRefresh,onToggle:e.onAgentSkillToggle,onClear:e.onAgentSkillsClear,onDisableAll:e.onAgentSkillsDisableAll,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):y}
                ${e.activePanel==="channels"?Ef({context:la(s,e.configForm,e.agentFilesList,n,e.agentIdentityById[s.id]??null),configForm:e.configForm,snapshot:e.channelsSnapshot,loading:e.channelsLoading,error:e.channelsError,lastSuccess:e.channelsLastSuccess,onRefresh:e.onChannelsRefresh}):y}
                ${e.activePanel==="cron"?Lf({context:la(s,e.configForm,e.agentFilesList,n,e.agentIdentityById[s.id]??null),agentId:s.id,jobs:e.cronJobs,status:e.cronStatus,loading:e.cronLoading,error:e.cronError,onRefresh:e.onCronRefresh}):y}
              `:c`
                <div class="card">
                  <div class="card-title">Select an agent</div>
                  <div class="card-sub">Pick an agent to inspect its workspace and tools.</div>
                </div>
              `}
      </section>
    </div>
  `}function Nf(e,t,n){var r,d;const i=ol(e.id,t),s=os(e),o=((d=(r=e.identity)==null?void 0:r.theme)==null?void 0:d.trim())||"Agent workspace and routing.",a=oi(e,n);return c`
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
        ${i?c`<span class="agent-pill">${i}</span>`:y}
      </div>
    </section>
  `}function Bf(e,t){return c`
    <div class="agent-tabs">
      ${[{id:"overview",label:"Overview"},{id:"files",label:"Files"},{id:"tools",label:"Tools"},{id:"skills",label:"Skills"},{id:"channels",label:"Channels"},{id:"cron",label:"Cron Jobs"}].map(i=>c`
          <button
            class="agent-tab ${e===i.id?"active":""}"
            type="button"
            @click=${()=>t(i.id)}
          >
            ${i.label}
          </button>
        `)}
    </div>
  `}function Uf(e){var G,E,O,N,H,se,X,be,Q,Le,J,ze,vt,Re,It,mt;const{agent:t,configForm:n,agentFilesList:i,agentIdentity:s,agentIdentityLoading:o,agentIdentityError:a,configLoading:r,configSaving:d,configDirty:l,onConfigReload:u,onConfigSave:g,onModelChange:f,onModelFallbacksChange:m}=e,b=ai(n,t.id),S=(i&&i.agentId===t.id?i.workspace:null)||((G=b.entry)==null?void 0:G.workspace)||((E=b.defaults)==null?void 0:E.workspace)||"default",_=(O=b.entry)!=null&&O.model?Vt((N=b.entry)==null?void 0:N.model):Vt((H=b.defaults)==null?void 0:H.model),F=Vt((se=b.defaults)==null?void 0:se.model),L=da((X=b.entry)==null?void 0:X.model)||(_!=="-"?ca(_):null),R=da((be=b.defaults)==null?void 0:be.model)||(F!=="-"?ca(F):null),x=L??R??null,P=hf((Q=b.entry)==null?void 0:Q.model),j=P?P.join(", "):"",K=((Le=s==null?void 0:s.name)==null?void 0:Le.trim())||((ze=(J=t.identity)==null?void 0:J.name)==null?void 0:ze.trim())||((vt=t.name)==null?void 0:vt.trim())||((Re=b.entry)==null?void 0:Re.name)||"-",Ue=oi(t,s)||"-",$=Array.isArray((It=b.entry)==null?void 0:It.skills)?(mt=b.entry)==null?void 0:mt.skills:null,C=($==null?void 0:$.length)??null,z=o?"Loading…":a?"Unavailable":"",U=!!(e.defaultId&&t.id===e.defaultId);return c`
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
          <div class="mono">${_}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Identity Name</div>
          <div>${K}</div>
          ${z?c`<div class="agent-kv-sub muted">${z}</div>`:y}
        </div>
        <div class="agent-kv">
          <div class="label">Default</div>
          <div>${U?"yes":"no"}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Identity Emoji</div>
          <div>${Ue}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Skills Filter</div>
          <div>${$?`${C} selected`:"all skills"}</div>
        </div>
      </div>

      <div class="agent-model-select" style="margin-top: 20px;">
        <div class="label">Model Selection</div>
        <div class="row" style="gap: 12px; flex-wrap: wrap;">
          <label class="field" style="min-width: 260px; flex: 1;">
            <span>Primary model${U?" (default)":""}</span>
            <select
              .value=${x??""}
              ?disabled=${!n||r||d}
              @change=${yt=>f(t.id,yt.target.value||null)}
            >
              ${U?y:c`
                      <option value="">
                        ${R?`Inherit default (${R})`:"Inherit default"}
                      </option>
                    `}
              ${yf(n,x??void 0)}
            </select>
          </label>
          <label class="field" style="min-width: 260px; flex: 1;">
            <span>Fallbacks (comma-separated)</span>
            <input
              .value=${j}
              ?disabled=${!n||r||d}
              placeholder="provider/model, provider/model"
              @input=${yt=>m(t.id,vf(yt.target.value))}
            />
          </label>
        </div>
        <div class="row" style="justify-content: flex-end; gap: 8px;">
          <button class="btn btn--sm" ?disabled=${r} @click=${u}>
            Reload Config
          </button>
          <button
            class="btn btn--sm primary"
            ?disabled=${d||!l}
            @click=${g}
          >
            ${d?"Saving…":"Save"}
          </button>
        </div>
      </div>
    </section>
  `}function ga(e){var t;e&&((t=navigator.clipboard)==null||t.writeText(e).catch(()=>{}))}function zf(e){const{loading:t,saving:n,error:i,content:s,lastSuccessAt:o,dependentFiles:a,onReload:r,onSave:d,onContentChange:l}=e,u=o!=null?new Date(o).toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"";return c`
    <section class="card">
      <div class="row" style="justify-content: space-between; align-items: flex-start;">
        <div>
          <div class="card-title">业务知识</div>
          <div class="card-sub">
            编辑万鼎业务知识（wanding_business_knowledge.md），供选型与匹配使用。保存后 LLM 将使用最新内容。
          </div>
        </div>
        <div class="row" style="gap: 8px; align-items: center;">
          ${u?c`<span class="muted">已保存 ${u}</span>`:y}
          <button class="btn" ?disabled=${t} @click=${r}>
            ${t?"加载中…":"重新加载"}
          </button>
          <button class="btn btn--primary" ?disabled=${t||n} @click=${()=>d(s)}>
            ${n?"保存中…":"保存"}
          </button>
        </div>
      </div>
      ${i?c`<div class="callout danger" style="margin-top: 12px;">${i}</div>`:y}
      ${a&&(a.mapping_table||a.price_library)?c`
            <div class="callout" style="margin-top: 12px; padding: 12px;">
              <div style="font-weight: 600; margin-bottom: 8px;">相关数据文件</div>
              <p class="muted" style="margin: 0 0 10px 0; font-size: 0.9rem;">
                选型与历史报价依赖以下 Excel，有更新时可复制路径后在资源管理器中打开或用 Excel 编辑。
              </p>
              ${a.mapping_table?c`
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; flex-wrap: wrap;">
                      <span style="min-width: 100px;">询价映射表（历史报价）：</span>
                      <code style="flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; font-size: 0.85rem;">${a.mapping_table}</code>
                      <button
                        class="btn"
                        style="flex-shrink: 0;"
                        @click=${()=>ga(a.mapping_table)}
                        title="复制路径"
                      >
                        复制路径
                      </button>
                    </div>
                  `:y}
              ${a.price_library?c`
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                      <span style="min-width: 100px;">万鼎价格库：</span>
                      <code style="flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; font-size: 0.85rem;">${a.price_library}</code>
                      <button
                        class="btn"
                        style="flex-shrink: 0;"
                        @click=${()=>ga(a.price_library)}
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
          @input=${g=>{const f=g.target;l((f==null?void 0:f.value)??"")}}
          placeholder="【业务知识】&#10;1. …"
        ></textarea>
      </div>
    </section>
  `}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Jt=(e,t)=>{var i;const n=e._$AN;if(n===void 0)return!1;for(const s of n)(i=s._$AO)==null||i.call(s,t,!1),Jt(s,t);return!0},zn=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while((n==null?void 0:n.size)===0)},ul=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),Hf(t)}};function jf(e){this._$AN!==void 0?(zn(this),this._$AM=e,ul(this)):this._$AM=e}function Kf(e,t=!1,n=0){const i=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(t)if(Array.isArray(i))for(let o=n;o<i.length;o++)Jt(i[o],!1),zn(i[o]);else i!=null&&(Jt(i,!1),zn(i));else Jt(this,e)}const Hf=e=>{e.type==Ks.CHILD&&(e._$AP??(e._$AP=Kf),e._$AQ??(e._$AQ=jf))};class qf extends qs{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,n,i){super._$AT(t,n,i),ul(this),this.isConnected=t._$AU}_$AO(t,n=!0){var i,s;t!==this.isConnected&&(this.isConnected=t,t?(i=this.reconnected)==null||i.call(this):(s=this.disconnected)==null||s.call(this)),n&&(Jt(this,t),zn(this))}setValue(t){if(zg(this._$Ct))this._$Ct._$AI(t,this);else{const n=[...this._$Ct._$AH];n[this._$Ci]=t,this._$Ct._$AI(n,this,0)}}disconnected(){}reconnected(){}}const Ni=new WeakMap,Gf=Hs(class extends qf{render(e){return y}update(e,[t]){var i;const n=t!==this.G;return n&&this.G!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=(i=e.options)==null?void 0:i.host,this.rt(this.ct=e.element)),y}rt(e){if(this.isConnected||(e=void 0),typeof this.G=="function"){const t=this.ht??globalThis;let n=Ni.get(t);n===void 0&&(n=new WeakMap,Ni.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){var e,t;return typeof this.G=="function"?(e=Ni.get(this.ht??globalThis))==null?void 0:e.get(this.G):(t=this.G)==null?void 0:t.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class rs extends qs{constructor(t){if(super(t),this.it=y,t.type!==Ks.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===y||t==null)return this._t=void 0,this.it=t;if(t===Ge)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}rs.directiveName="unsafeHTML",rs.resultType=1;const ls=Hs(rs);/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:gl,setPrototypeOf:fa,isFrozen:Wf,getPrototypeOf:Vf,getOwnPropertyDescriptor:Qf}=Object;let{freeze:de,seal:ye,create:cs}=Object,{apply:ds,construct:us}=typeof Reflect<"u"&&Reflect;de||(de=function(t){return t});ye||(ye=function(t){return t});ds||(ds=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),o=2;o<i;o++)s[o-2]=arguments[o];return t.apply(n,s)});us||(us=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const xn=ue(Array.prototype.forEach),Jf=ue(Array.prototype.lastIndexOf),pa=ue(Array.prototype.pop),Ot=ue(Array.prototype.push),Yf=ue(Array.prototype.splice),Fn=ue(String.prototype.toLowerCase),Bi=ue(String.prototype.toString),Ui=ue(String.prototype.match),Nt=ue(String.prototype.replace),Xf=ue(String.prototype.indexOf),Zf=ue(String.prototype.trim),we=ue(Object.prototype.hasOwnProperty),le=ue(RegExp.prototype.test),Bt=ep(TypeError);function ue(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return ds(e,t,i)}}function ep(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return us(e,n)}}function q(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Fn;fa&&fa(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const o=n(s);o!==s&&(Wf(t)||(t[i]=o),s=o)}e[s]=!0}return e}function tp(e){for(let t=0;t<e.length;t++)we(e,t)||(e[t]=null);return e}function _e(e){const t=cs(null);for(const[n,i]of gl(e))we(e,n)&&(Array.isArray(i)?t[n]=tp(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=_e(i):t[n]=i);return t}function Ut(e,t){for(;e!==null;){const i=Qf(e,t);if(i){if(i.get)return ue(i.get);if(typeof i.value=="function")return ue(i.value)}e=Vf(e)}function n(){return null}return n}const ha=de(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),zi=de(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ji=de(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),np=de(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ki=de(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),ip=de(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),va=de(["#text"]),ma=de(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Hi=de(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ya=de(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Sn=de(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),sp=ye(/\{\{[\w\W]*|[\w\W]*\}\}/gm),op=ye(/<%[\w\W]*|[\w\W]*%>/gm),ap=ye(/\$\{[\w\W]*/gm),rp=ye(/^data-[\-\w.\u00B7-\uFFFF]+$/),lp=ye(/^aria-[\-\w]+$/),fl=ye(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),cp=ye(/^(?:\w+script|data):/i),dp=ye(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),pl=ye(/^html$/i),up=ye(/^[a-z][.\w]*(-[.\w]+)+$/i);var ba=Object.freeze({__proto__:null,ARIA_ATTR:lp,ATTR_WHITESPACE:dp,CUSTOM_ELEMENT:up,DATA_ATTR:rp,DOCTYPE_NAME:pl,ERB_EXPR:op,IS_ALLOWED_URI:fl,IS_SCRIPT_OR_DATA:cp,MUSTACHE_EXPR:sp,TMPLIT_EXPR:ap});const zt={element:1,text:3,progressingInstruction:7,comment:8,document:9},gp=function(){return typeof window>"u"?null:window},fp=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const o="dompurify"+(i?"#"+i:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},wa=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function hl(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:gp();const t=D=>hl(D);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==zt.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:r,Element:d,NodeFilter:l,NamedNodeMap:u=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:g,DOMParser:f,trustedTypes:m}=e,b=d.prototype,k=Ut(b,"cloneNode"),S=Ut(b,"remove"),_=Ut(b,"nextSibling"),F=Ut(b,"childNodes"),L=Ut(b,"parentNode");if(typeof a=="function"){const D=n.createElement("template");D.content&&D.content.ownerDocument&&(n=D.content.ownerDocument)}let R,x="";const{implementation:P,createNodeIterator:j,createDocumentFragment:K,getElementsByTagName:B}=n,{importNode:Ue}=i;let $=wa();t.isSupported=typeof gl=="function"&&typeof L=="function"&&P&&P.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:C,ERB_EXPR:z,TMPLIT_EXPR:U,DATA_ATTR:G,ARIA_ATTR:E,IS_SCRIPT_OR_DATA:O,ATTR_WHITESPACE:N,CUSTOM_ELEMENT:H}=ba;let{IS_ALLOWED_URI:se}=ba,X=null;const be=q({},[...ha,...zi,...ji,...Ki,...va]);let Q=null;const Le=q({},[...ma,...Hi,...ya,...Sn]);let J=Object.seal(cs(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ze=null,vt=null;const Re=Object.seal(cs(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let It=!0,mt=!0,yt=!1,oo=!0,bt=!1,gn=!0,Je=!1,di=!1,ui=!1,wt=!1,fn=!1,pn=!1,ao=!0,ro=!1;const Nl="user-content-";let gi=!0,Mt=!1,$t={},xe=null;const fi=q({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let lo=null;const co=q({},["audio","video","img","source","image","track"]);let pi=null;const uo=q({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),hn="http://www.w3.org/1998/Math/MathML",vn="http://www.w3.org/2000/svg",Ie="http://www.w3.org/1999/xhtml";let kt=Ie,hi=!1,vi=null;const Bl=q({},[hn,vn,Ie],Bi);let mn=q({},["mi","mo","mn","ms","mtext"]),yn=q({},["annotation-xml"]);const Ul=q({},["title","style","font","a","script"]);let Ft=null;const zl=["application/xhtml+xml","text/html"],jl="text/html";let te=null,xt=null;const Kl=n.createElement("form"),go=function(w){return w instanceof RegExp||w instanceof Function},mi=function(){let w=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(xt&&xt===w)){if((!w||typeof w!="object")&&(w={}),w=_e(w),Ft=zl.indexOf(w.PARSER_MEDIA_TYPE)===-1?jl:w.PARSER_MEDIA_TYPE,te=Ft==="application/xhtml+xml"?Bi:Fn,X=we(w,"ALLOWED_TAGS")?q({},w.ALLOWED_TAGS,te):be,Q=we(w,"ALLOWED_ATTR")?q({},w.ALLOWED_ATTR,te):Le,vi=we(w,"ALLOWED_NAMESPACES")?q({},w.ALLOWED_NAMESPACES,Bi):Bl,pi=we(w,"ADD_URI_SAFE_ATTR")?q(_e(uo),w.ADD_URI_SAFE_ATTR,te):uo,lo=we(w,"ADD_DATA_URI_TAGS")?q(_e(co),w.ADD_DATA_URI_TAGS,te):co,xe=we(w,"FORBID_CONTENTS")?q({},w.FORBID_CONTENTS,te):fi,ze=we(w,"FORBID_TAGS")?q({},w.FORBID_TAGS,te):_e({}),vt=we(w,"FORBID_ATTR")?q({},w.FORBID_ATTR,te):_e({}),$t=we(w,"USE_PROFILES")?w.USE_PROFILES:!1,It=w.ALLOW_ARIA_ATTR!==!1,mt=w.ALLOW_DATA_ATTR!==!1,yt=w.ALLOW_UNKNOWN_PROTOCOLS||!1,oo=w.ALLOW_SELF_CLOSE_IN_ATTR!==!1,bt=w.SAFE_FOR_TEMPLATES||!1,gn=w.SAFE_FOR_XML!==!1,Je=w.WHOLE_DOCUMENT||!1,wt=w.RETURN_DOM||!1,fn=w.RETURN_DOM_FRAGMENT||!1,pn=w.RETURN_TRUSTED_TYPE||!1,ui=w.FORCE_BODY||!1,ao=w.SANITIZE_DOM!==!1,ro=w.SANITIZE_NAMED_PROPS||!1,gi=w.KEEP_CONTENT!==!1,Mt=w.IN_PLACE||!1,se=w.ALLOWED_URI_REGEXP||fl,kt=w.NAMESPACE||Ie,mn=w.MATHML_TEXT_INTEGRATION_POINTS||mn,yn=w.HTML_INTEGRATION_POINTS||yn,J=w.CUSTOM_ELEMENT_HANDLING||{},w.CUSTOM_ELEMENT_HANDLING&&go(w.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(J.tagNameCheck=w.CUSTOM_ELEMENT_HANDLING.tagNameCheck),w.CUSTOM_ELEMENT_HANDLING&&go(w.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(J.attributeNameCheck=w.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),w.CUSTOM_ELEMENT_HANDLING&&typeof w.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(J.allowCustomizedBuiltInElements=w.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),bt&&(mt=!1),fn&&(wt=!0),$t&&(X=q({},va),Q=[],$t.html===!0&&(q(X,ha),q(Q,ma)),$t.svg===!0&&(q(X,zi),q(Q,Hi),q(Q,Sn)),$t.svgFilters===!0&&(q(X,ji),q(Q,Hi),q(Q,Sn)),$t.mathMl===!0&&(q(X,Ki),q(Q,ya),q(Q,Sn))),w.ADD_TAGS&&(typeof w.ADD_TAGS=="function"?Re.tagCheck=w.ADD_TAGS:(X===be&&(X=_e(X)),q(X,w.ADD_TAGS,te))),w.ADD_ATTR&&(typeof w.ADD_ATTR=="function"?Re.attributeCheck=w.ADD_ATTR:(Q===Le&&(Q=_e(Q)),q(Q,w.ADD_ATTR,te))),w.ADD_URI_SAFE_ATTR&&q(pi,w.ADD_URI_SAFE_ATTR,te),w.FORBID_CONTENTS&&(xe===fi&&(xe=_e(xe)),q(xe,w.FORBID_CONTENTS,te)),w.ADD_FORBID_CONTENTS&&(xe===fi&&(xe=_e(xe)),q(xe,w.ADD_FORBID_CONTENTS,te)),gi&&(X["#text"]=!0),Je&&q(X,["html","head","body"]),X.table&&(q(X,["tbody"]),delete ze.tbody),w.TRUSTED_TYPES_POLICY){if(typeof w.TRUSTED_TYPES_POLICY.createHTML!="function")throw Bt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof w.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Bt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');R=w.TRUSTED_TYPES_POLICY,x=R.createHTML("")}else R===void 0&&(R=fp(m,s)),R!==null&&typeof x=="string"&&(x=R.createHTML(""));de&&de(w),xt=w}},fo=q({},[...zi,...ji,...np]),po=q({},[...Ki,...ip]),Hl=function(w){let A=L(w);(!A||!A.tagName)&&(A={namespaceURI:kt,tagName:"template"});const M=Fn(w.tagName),Z=Fn(A.tagName);return vi[w.namespaceURI]?w.namespaceURI===vn?A.namespaceURI===Ie?M==="svg":A.namespaceURI===hn?M==="svg"&&(Z==="annotation-xml"||mn[Z]):!!fo[M]:w.namespaceURI===hn?A.namespaceURI===Ie?M==="math":A.namespaceURI===vn?M==="math"&&yn[Z]:!!po[M]:w.namespaceURI===Ie?A.namespaceURI===vn&&!yn[Z]||A.namespaceURI===hn&&!mn[Z]?!1:!po[M]&&(Ul[M]||!fo[M]):!!(Ft==="application/xhtml+xml"&&vi[w.namespaceURI]):!1},Se=function(w){Ot(t.removed,{element:w});try{L(w).removeChild(w)}catch{S(w)}},Ye=function(w,A){try{Ot(t.removed,{attribute:A.getAttributeNode(w),from:A})}catch{Ot(t.removed,{attribute:null,from:A})}if(A.removeAttribute(w),w==="is")if(wt||fn)try{Se(A)}catch{}else try{A.setAttribute(w,"")}catch{}},ho=function(w){let A=null,M=null;if(ui)w="<remove></remove>"+w;else{const ee=Ui(w,/^[\r\n\t ]+/);M=ee&&ee[0]}Ft==="application/xhtml+xml"&&kt===Ie&&(w='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+w+"</body></html>");const Z=R?R.createHTML(w):w;if(kt===Ie)try{A=new f().parseFromString(Z,Ft)}catch{}if(!A||!A.documentElement){A=P.createDocument(kt,"template",null);try{A.documentElement.innerHTML=hi?x:Z}catch{}}const ae=A.body||A.documentElement;return w&&M&&ae.insertBefore(n.createTextNode(M),ae.childNodes[0]||null),kt===Ie?B.call(A,Je?"html":"body")[0]:Je?A.documentElement:ae},vo=function(w){return j.call(w.ownerDocument||w,w,l.SHOW_ELEMENT|l.SHOW_COMMENT|l.SHOW_TEXT|l.SHOW_PROCESSING_INSTRUCTION|l.SHOW_CDATA_SECTION,null)},yi=function(w){return w instanceof g&&(typeof w.nodeName!="string"||typeof w.textContent!="string"||typeof w.removeChild!="function"||!(w.attributes instanceof u)||typeof w.removeAttribute!="function"||typeof w.setAttribute!="function"||typeof w.namespaceURI!="string"||typeof w.insertBefore!="function"||typeof w.hasChildNodes!="function")},mo=function(w){return typeof r=="function"&&w instanceof r};function Me(D,w,A){xn(D,M=>{M.call(t,w,A,xt)})}const yo=function(w){let A=null;if(Me($.beforeSanitizeElements,w,null),yi(w))return Se(w),!0;const M=te(w.nodeName);if(Me($.uponSanitizeElement,w,{tagName:M,allowedTags:X}),gn&&w.hasChildNodes()&&!mo(w.firstElementChild)&&le(/<[/\w!]/g,w.innerHTML)&&le(/<[/\w!]/g,w.textContent)||w.nodeType===zt.progressingInstruction||gn&&w.nodeType===zt.comment&&le(/<[/\w]/g,w.data))return Se(w),!0;if(!(Re.tagCheck instanceof Function&&Re.tagCheck(M))&&(!X[M]||ze[M])){if(!ze[M]&&wo(M)&&(J.tagNameCheck instanceof RegExp&&le(J.tagNameCheck,M)||J.tagNameCheck instanceof Function&&J.tagNameCheck(M)))return!1;if(gi&&!xe[M]){const Z=L(w)||w.parentNode,ae=F(w)||w.childNodes;if(ae&&Z){const ee=ae.length;for(let ge=ee-1;ge>=0;--ge){const Fe=k(ae[ge],!0);Fe.__removalCount=(w.__removalCount||0)+1,Z.insertBefore(Fe,_(w))}}}return Se(w),!0}return w instanceof d&&!Hl(w)||(M==="noscript"||M==="noembed"||M==="noframes")&&le(/<\/no(script|embed|frames)/i,w.innerHTML)?(Se(w),!0):(bt&&w.nodeType===zt.text&&(A=w.textContent,xn([C,z,U],Z=>{A=Nt(A,Z," ")}),w.textContent!==A&&(Ot(t.removed,{element:w.cloneNode()}),w.textContent=A)),Me($.afterSanitizeElements,w,null),!1)},bo=function(w,A,M){if(ao&&(A==="id"||A==="name")&&(M in n||M in Kl))return!1;if(!(mt&&!vt[A]&&le(G,A))){if(!(It&&le(E,A))){if(!(Re.attributeCheck instanceof Function&&Re.attributeCheck(A,w))){if(!Q[A]||vt[A]){if(!(wo(w)&&(J.tagNameCheck instanceof RegExp&&le(J.tagNameCheck,w)||J.tagNameCheck instanceof Function&&J.tagNameCheck(w))&&(J.attributeNameCheck instanceof RegExp&&le(J.attributeNameCheck,A)||J.attributeNameCheck instanceof Function&&J.attributeNameCheck(A,w))||A==="is"&&J.allowCustomizedBuiltInElements&&(J.tagNameCheck instanceof RegExp&&le(J.tagNameCheck,M)||J.tagNameCheck instanceof Function&&J.tagNameCheck(M))))return!1}else if(!pi[A]){if(!le(se,Nt(M,N,""))){if(!((A==="src"||A==="xlink:href"||A==="href")&&w!=="script"&&Xf(M,"data:")===0&&lo[w])){if(!(yt&&!le(O,Nt(M,N,"")))){if(M)return!1}}}}}}}return!0},wo=function(w){return w!=="annotation-xml"&&Ui(w,H)},$o=function(w){Me($.beforeSanitizeAttributes,w,null);const{attributes:A}=w;if(!A||yi(w))return;const M={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Q,forceKeepAttr:void 0};let Z=A.length;for(;Z--;){const ae=A[Z],{name:ee,namespaceURI:ge,value:Fe}=ae,St=te(ee),bi=Fe;let oe=ee==="value"?bi:Zf(bi);if(M.attrName=St,M.attrValue=oe,M.keepAttr=!0,M.forceKeepAttr=void 0,Me($.uponSanitizeAttribute,w,M),oe=M.attrValue,ro&&(St==="id"||St==="name")&&(Ye(ee,w),oe=Nl+oe),gn&&le(/((--!?|])>)|<\/(style|title|textarea)/i,oe)){Ye(ee,w);continue}if(St==="attributename"&&Ui(oe,"href")){Ye(ee,w);continue}if(M.forceKeepAttr)continue;if(!M.keepAttr){Ye(ee,w);continue}if(!oo&&le(/\/>/i,oe)){Ye(ee,w);continue}bt&&xn([C,z,U],xo=>{oe=Nt(oe,xo," ")});const ko=te(w.nodeName);if(!bo(ko,St,oe)){Ye(ee,w);continue}if(R&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!ge)switch(m.getAttributeType(ko,St)){case"TrustedHTML":{oe=R.createHTML(oe);break}case"TrustedScriptURL":{oe=R.createScriptURL(oe);break}}if(oe!==bi)try{ge?w.setAttributeNS(ge,ee,oe):w.setAttribute(ee,oe),yi(w)?Se(w):pa(t.removed)}catch{Ye(ee,w)}}Me($.afterSanitizeAttributes,w,null)},ql=function D(w){let A=null;const M=vo(w);for(Me($.beforeSanitizeShadowDOM,w,null);A=M.nextNode();)Me($.uponSanitizeShadowNode,A,null),yo(A),$o(A),A.content instanceof o&&D(A.content);Me($.afterSanitizeShadowDOM,w,null)};return t.sanitize=function(D){let w=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},A=null,M=null,Z=null,ae=null;if(hi=!D,hi&&(D="<!-->"),typeof D!="string"&&!mo(D))if(typeof D.toString=="function"){if(D=D.toString(),typeof D!="string")throw Bt("dirty is not a string, aborting")}else throw Bt("toString is not a function");if(!t.isSupported)return D;if(di||mi(w),t.removed=[],typeof D=="string"&&(Mt=!1),Mt){if(D.nodeName){const Fe=te(D.nodeName);if(!X[Fe]||ze[Fe])throw Bt("root node is forbidden and cannot be sanitized in-place")}}else if(D instanceof r)A=ho("<!---->"),M=A.ownerDocument.importNode(D,!0),M.nodeType===zt.element&&M.nodeName==="BODY"||M.nodeName==="HTML"?A=M:A.appendChild(M);else{if(!wt&&!bt&&!Je&&D.indexOf("<")===-1)return R&&pn?R.createHTML(D):D;if(A=ho(D),!A)return wt?null:pn?x:""}A&&ui&&Se(A.firstChild);const ee=vo(Mt?D:A);for(;Z=ee.nextNode();)yo(Z),$o(Z),Z.content instanceof o&&ql(Z.content);if(Mt)return D;if(wt){if(fn)for(ae=K.call(A.ownerDocument);A.firstChild;)ae.appendChild(A.firstChild);else ae=A;return(Q.shadowroot||Q.shadowrootmode)&&(ae=Ue.call(i,ae,!0)),ae}let ge=Je?A.outerHTML:A.innerHTML;return Je&&X["!doctype"]&&A.ownerDocument&&A.ownerDocument.doctype&&A.ownerDocument.doctype.name&&le(pl,A.ownerDocument.doctype.name)&&(ge="<!DOCTYPE "+A.ownerDocument.doctype.name+`>
`+ge),bt&&xn([C,z,U],Fe=>{ge=Nt(ge,Fe," ")}),R&&pn?R.createHTML(ge):ge},t.setConfig=function(){let D=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};mi(D),di=!0},t.clearConfig=function(){xt=null,di=!1},t.isValidAttribute=function(D,w,A){xt||mi({});const M=te(D),Z=te(w);return bo(M,Z,A)},t.addHook=function(D,w){typeof w=="function"&&Ot($[D],w)},t.removeHook=function(D,w){if(w!==void 0){const A=Jf($[D],w);return A===-1?void 0:Yf($[D],A,1)[0]}return pa($[D])},t.removeHooks=function(D){$[D]=[]},t.removeAllHooks=function(){$=wa()},t}var gs=hl();function Ws(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var ht=Ws();function vl(e){ht=e}var nt={exec:()=>null};function V(e,t=""){let n=typeof e=="string"?e:e.source,i={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(ce.caret,"$1"),n=n.replace(s,a),i},getRegex:()=>new RegExp(n,t)};return i}var pp=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),ce={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}>`)},hp=/^(?:[ \t]*(?:\n|$))+/,vp=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,mp=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,un=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,yp=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Vs=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,ml=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,yl=V(ml).replace(/bull/g,Vs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),bp=V(ml).replace(/bull/g,Vs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Qs=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,wp=/^[^\n]+/,Js=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,$p=V(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Js).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),kp=V(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Vs).getRegex(),ri="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ys=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,xp=V("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ys).replace("tag",ri).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),bl=V(Qs).replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ri).getRegex(),Sp=V(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",bl).getRegex(),Xs={blockquote:Sp,code:vp,def:$p,fences:mp,heading:yp,hr:un,html:xp,lheading:yl,list:kp,newline:hp,paragraph:bl,table:nt,text:wp},$a=V("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ri).getRegex(),Ap={...Xs,lheading:bp,table:$a,paragraph:V(Qs).replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",$a).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ri).getRegex()},_p={...Xs,html:V(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ys).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:nt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:V(Qs).replace("hr",un).replace("heading",` *#{1,6} *[^
]`).replace("lheading",yl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Cp=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Tp=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,wl=/^( {2,}|\\)\n(?!\s*$)/,Ep=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,li=/[\p{P}\p{S}]/u,Zs=/[\s\p{P}\p{S}]/u,$l=/[^\s\p{P}\p{S}]/u,Lp=V(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Zs).getRegex(),kl=/(?!~)[\p{P}\p{S}]/u,Rp=/(?!~)[\s\p{P}\p{S}]/u,Ip=/(?:[^\s\p{P}\p{S}]|~)/u,xl=/(?![*_])[\p{P}\p{S}]/u,Mp=/(?![*_])[\s\p{P}\p{S}]/u,Fp=/(?:[^\s\p{P}\p{S}]|[*_])/u,Pp=V(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",pp?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Sl=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Dp=V(Sl,"u").replace(/punct/g,li).getRegex(),Op=V(Sl,"u").replace(/punct/g,kl).getRegex(),Al="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Np=V(Al,"gu").replace(/notPunctSpace/g,$l).replace(/punctSpace/g,Zs).replace(/punct/g,li).getRegex(),Bp=V(Al,"gu").replace(/notPunctSpace/g,Ip).replace(/punctSpace/g,Rp).replace(/punct/g,kl).getRegex(),Up=V("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,$l).replace(/punctSpace/g,Zs).replace(/punct/g,li).getRegex(),zp=V(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,xl).getRegex(),jp="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",Kp=V(jp,"gu").replace(/notPunctSpace/g,Fp).replace(/punctSpace/g,Mp).replace(/punct/g,xl).getRegex(),Hp=V(/\\(punct)/,"gu").replace(/punct/g,li).getRegex(),qp=V(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Gp=V(Ys).replace("(?:-->|$)","-->").getRegex(),Wp=V("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Gp).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),jn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Vp=V(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",jn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),_l=V(/^!?\[(label)\]\[(ref)\]/).replace("label",jn).replace("ref",Js).getRegex(),Cl=V(/^!?\[(ref)\](?:\[\])?/).replace("ref",Js).getRegex(),Qp=V("reflink|nolink(?!\\()","g").replace("reflink",_l).replace("nolink",Cl).getRegex(),ka=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,eo={_backpedal:nt,anyPunctuation:Hp,autolink:qp,blockSkip:Pp,br:wl,code:Tp,del:nt,delLDelim:nt,delRDelim:nt,emStrongLDelim:Dp,emStrongRDelimAst:Np,emStrongRDelimUnd:Up,escape:Cp,link:Vp,nolink:Cl,punctuation:Lp,reflink:_l,reflinkSearch:Qp,tag:Wp,text:Ep,url:nt},Jp={...eo,link:V(/^!?\[(label)\]\((.*?)\)/).replace("label",jn).getRegex(),reflink:V(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",jn).getRegex()},fs={...eo,emStrongRDelimAst:Bp,emStrongLDelim:Op,delLDelim:zp,delRDelim:Kp,url:V(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ka).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:V(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ka).getRegex()},Yp={...fs,br:V(wl).replace("{2,}","*").getRegex(),text:V(fs.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},An={normal:Xs,gfm:Ap,pedantic:_p},jt={normal:eo,gfm:fs,breaks:Yp,pedantic:Jp},Xp={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},xa=e=>Xp[e];function Ce(e,t){if(t){if(ce.escapeTest.test(e))return e.replace(ce.escapeReplace,xa)}else if(ce.escapeTestNoEncode.test(e))return e.replace(ce.escapeReplaceNoEncode,xa);return e}function Sa(e){try{e=encodeURI(e).replace(ce.percentDecode,"%")}catch{return null}return e}function Aa(e,t){var o;let n=e.replace(ce.findPipe,(a,r,d)=>{let l=!1,u=r;for(;--u>=0&&d[u]==="\\";)l=!l;return l?"|":" |"}),i=n.split(ce.splitPipe),s=0;if(i[0].trim()||i.shift(),i.length>0&&!((o=i.at(-1))!=null&&o.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(ce.slashPipe,"|");return i}function Kt(e,t,n){let i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function Zp(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function eh(e,t=0){let n=t,i="";for(let s of e)if(s==="	"){let o=4-n%4;i+=" ".repeat(o),n+=o}else i+=s,n++;return i}function _a(e,t,n,i,s){let o=t.href,a=t.title||null,r=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;let d={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:r,tokens:i.inlineTokens(r)};return i.state.inLink=!1,d}function th(e,t,n){let i=e.match(n.other.indentCodeCompensation);if(i===null)return t;let s=i[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[r]=a;return r.length>=s.length?o.slice(s.length):o}).join(`
`)}var Kn=class{constructor(e){W(this,"options");W(this,"rules");W(this,"lexer");this.options=e||ht}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Kt(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],i=th(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let i=Kt(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Kt(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Kt(t[0],`
`).split(`
`),i="",s="",o=[];for(;n.length>0;){let a=!1,r=[],d;for(d=0;d<n.length;d++)if(this.rules.other.blockquoteStart.test(n[d]))r.push(n[d]),a=!0;else if(!a)r.push(n[d]);else break;n=n.slice(d);let l=r.join(`
`),u=l.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${l}`:l,s=s?`${s}
${u}`:u;let g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,o,!0),this.lexer.state.top=g,n.length===0)break;let f=o.at(-1);if((f==null?void 0:f.type)==="code")break;if((f==null?void 0:f.type)==="blockquote"){let m=f,b=m.raw+`
`+n.join(`
`),k=this.blockquote(b);o[o.length-1]=k,i=i.substring(0,i.length-m.raw.length)+k.raw,s=s.substring(0,s.length-m.text.length)+k.text;break}else if((f==null?void 0:f.type)==="list"){let m=f,b=m.raw+`
`+n.join(`
`),k=this.list(b);o[o.length-1]=k,i=i.substring(0,i.length-f.raw.length)+k.raw,s=s.substring(0,s.length-m.raw.length)+k.raw,n=b.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:o,text:s}}}list(e){var n,i;let t=this.rules.block.list.exec(e);if(t){let s=t[1].trim(),o=s.length>1,a={type:"list",raw:"",ordered:o,start:o?+s.slice(0,-1):"",loose:!1,items:[]};s=o?`\\d{1,9}\\${s.slice(-1)}`:`\\${s}`,this.options.pedantic&&(s=o?s:"[*+-]");let r=this.rules.other.listItemRegex(s),d=!1;for(;e;){let u=!1,g="",f="";if(!(t=r.exec(e))||this.rules.block.hr.test(e))break;g=t[0],e=e.substring(g.length);let m=eh(t[2].split(`
`,1)[0],t[1].length),b=e.split(`
`,1)[0],k=!m.trim(),S=0;if(this.options.pedantic?(S=2,f=m.trimStart()):k?S=t[1].length+1:(S=m.search(this.rules.other.nonSpaceChar),S=S>4?1:S,f=m.slice(S),S+=t[1].length),k&&this.rules.other.blankLine.test(b)&&(g+=b+`
`,e=e.substring(b.length+1),u=!0),!u){let _=this.rules.other.nextBulletRegex(S),F=this.rules.other.hrRegex(S),L=this.rules.other.fencesBeginRegex(S),R=this.rules.other.headingBeginRegex(S),x=this.rules.other.htmlBeginRegex(S),P=this.rules.other.blockquoteBeginRegex(S);for(;e;){let j=e.split(`
`,1)[0],K;if(b=j,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),K=b):K=b.replace(this.rules.other.tabCharGlobal,"    "),L.test(b)||R.test(b)||x.test(b)||P.test(b)||_.test(b)||F.test(b))break;if(K.search(this.rules.other.nonSpaceChar)>=S||!b.trim())f+=`
`+K.slice(S);else{if(k||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||L.test(m)||R.test(m)||F.test(m))break;f+=`
`+b}k=!b.trim(),g+=j+`
`,e=e.substring(j.length+1),m=K.slice(S)}}a.loose||(d?a.loose=!0:this.rules.other.doubleBlankLine.test(g)&&(d=!0)),a.items.push({type:"list_item",raw:g,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),a.raw+=g}let l=a.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;a.raw=a.raw.trimEnd();for(let u of a.items){if(this.lexer.state.top=!1,u.tokens=this.lexer.blockTokens(u.text,[]),u.task){if(u.text=u.text.replace(this.rules.other.listReplaceTask,""),((n=u.tokens[0])==null?void 0:n.type)==="text"||((i=u.tokens[0])==null?void 0:i.type)==="paragraph"){u.tokens[0].raw=u.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),u.tokens[0].text=u.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let g=this.rules.other.listTaskCheckbox.exec(u.raw);if(g){let f={type:"checkbox",raw:g[0]+" ",checked:g[0]!=="[ ]"};u.checked=f.checked,a.loose?u.tokens[0]&&["paragraph","text"].includes(u.tokens[0].type)&&"tokens"in u.tokens[0]&&u.tokens[0].tokens?(u.tokens[0].raw=f.raw+u.tokens[0].raw,u.tokens[0].text=f.raw+u.tokens[0].text,u.tokens[0].tokens.unshift(f)):u.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):u.tokens.unshift(f)}}if(!a.loose){let g=u.tokens.filter(m=>m.type==="space"),f=g.length>0&&g.some(m=>this.rules.other.anyLine.test(m.raw));a.loose=f}}if(a.loose)for(let u of a.items){u.loose=!0;for(let g of u.tokens)g.type==="text"&&(g.type="paragraph")}return a}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var a;let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Aa(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(a=t[3])!=null&&a.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(let r of i)this.rules.other.tableAlignRight.test(r)?o.align.push("right"):this.rules.other.tableAlignCenter.test(r)?o.align.push("center"):this.rules.other.tableAlignLeft.test(r)?o.align.push("left"):o.align.push(null);for(let r=0;r<n.length;r++)o.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:o.align[r]});for(let r of s)o.rows.push(Aa(r,o.header.length).map((d,l)=>({text:d,tokens:this.lexer.inline(d),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=Kt(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=Zp(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(i);o&&(i=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),_a(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return _a(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(i[1]||i[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...i[0]].length-1,o,a,r=s,d=0,l=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(l.lastIndex=0,t=t.slice(-1*e.length+s);(i=l.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(a=[...o].length,i[3]||i[4]){r+=a;continue}else if((i[5]||i[6])&&s%3&&!((s+a)%3)){d+=a;continue}if(r-=a,r>0)continue;a=Math.min(a,a+r+d);let u=[...i[0]][0].length,g=e.slice(0,s+i.index+u+a);if(Math.min(s,a)%2){let m=g.slice(1,-1);return{type:"em",raw:g,text:m,tokens:this.lexer.inlineTokens(m)}}let f=g.slice(2,-2);return{type:"strong",raw:g,text:f,tokens:this.lexer.inlineTokens(f)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e,t,n=""){let i=this.rules.inline.delLDelim.exec(e);if(i&&(!i[1]||!n||this.rules.inline.punctuation.exec(n))){let s=[...i[0]].length-1,o,a,r=s,d=this.rules.inline.delRDelim;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(i=d.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o||(a=[...o].length,a!==s))continue;if(i[3]||i[4]){r+=a;continue}if(r-=a,r>0)continue;a=Math.min(a,a+r);let l=[...i[0]][0].length,u=e.slice(0,s+i.index+l+a),g=u.slice(s,-s);return{type:"del",raw:u,text:g,tokens:this.lexer.inlineTokens(g)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let o;do o=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(o!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},$e=class ps{constructor(t){W(this,"tokens");W(this,"options");W(this,"state");W(this,"inlineQueue");W(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||ht,this.options.tokenizer=this.options.tokenizer||new Kn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:ce,block:An.normal,inline:jt.normal};this.options.pedantic?(n.block=An.pedantic,n.inline=jt.pedantic):this.options.gfm&&(n.block=An.gfm,this.options.breaks?n.inline=jt.breaks:n.inline=jt.gfm),this.tokenizer.rules=n}static get rules(){return{block:An,inline:jt}}static lex(t,n){return new ps(n).lex(t)}static lexInline(t,n){return new ps(n).inlineTokens(t)}lex(t){t=t.replace(ce.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,o,a;for(this.options.pedantic&&(t=t.replace(ce.tabCharGlobal,"    ").replace(ce.spaceLine,""));t;){let r;if((o=(s=this.options.extensions)==null?void 0:s.block)!=null&&o.some(l=>(r=l.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);let l=n.at(-1);r.raw.length===1&&l!==void 0?l.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);let l=n.at(-1);(l==null?void 0:l.type)==="paragraph"||(l==null?void 0:l.type)==="text"?(l.raw+=(l.raw.endsWith(`
`)?"":`
`)+r.raw,l.text+=`
`+r.text,this.inlineQueue.at(-1).src=l.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);let l=n.at(-1);(l==null?void 0:l.type)==="paragraph"||(l==null?void 0:l.type)==="text"?(l.raw+=(l.raw.endsWith(`
`)?"":`
`)+r.raw,l.text+=`
`+r.raw,this.inlineQueue.at(-1).src=l.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title},n.push(r));continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let d=t;if((a=this.options.extensions)!=null&&a.startBlock){let l=1/0,u=t.slice(1),g;this.options.extensions.startBlock.forEach(f=>{g=f.call({lexer:this},u),typeof g=="number"&&g>=0&&(l=Math.min(l,g))}),l<1/0&&l>=0&&(d=t.substring(0,l+1))}if(this.state.top&&(r=this.tokenizer.paragraph(d))){let l=n.at(-1);i&&(l==null?void 0:l.type)==="paragraph"?(l.raw+=(l.raw.endsWith(`
`)?"":`
`)+r.raw,l.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):n.push(r),i=d.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);let l=n.at(-1);(l==null?void 0:l.type)==="text"?(l.raw+=(l.raw.endsWith(`
`)?"":`
`)+r.raw,l.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):n.push(r);continue}if(t){let l="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(l);break}else throw new Error(l)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var d,l,u,g,f;let i=t,s=null;if(this.tokens.links){let m=Object.keys(this.tokens.links);if(m.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)m.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)o=s[2]?s[2].length:0,i=i.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);i=((l=(d=this.options.hooks)==null?void 0:d.emStrongMask)==null?void 0:l.call({lexer:this},i))??i;let a=!1,r="";for(;t;){a||(r=""),a=!1;let m;if((g=(u=this.options.extensions)==null?void 0:u.inline)!=null&&g.some(k=>(m=k.call({lexer:this},t,n))?(t=t.substring(m.raw.length),n.push(m),!0):!1))continue;if(m=this.tokenizer.escape(t)){t=t.substring(m.raw.length),n.push(m);continue}if(m=this.tokenizer.tag(t)){t=t.substring(m.raw.length),n.push(m);continue}if(m=this.tokenizer.link(t)){t=t.substring(m.raw.length),n.push(m);continue}if(m=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(m.raw.length);let k=n.at(-1);m.type==="text"&&(k==null?void 0:k.type)==="text"?(k.raw+=m.raw,k.text+=m.text):n.push(m);continue}if(m=this.tokenizer.emStrong(t,i,r)){t=t.substring(m.raw.length),n.push(m);continue}if(m=this.tokenizer.codespan(t)){t=t.substring(m.raw.length),n.push(m);continue}if(m=this.tokenizer.br(t)){t=t.substring(m.raw.length),n.push(m);continue}if(m=this.tokenizer.del(t,i,r)){t=t.substring(m.raw.length),n.push(m);continue}if(m=this.tokenizer.autolink(t)){t=t.substring(m.raw.length),n.push(m);continue}if(!this.state.inLink&&(m=this.tokenizer.url(t))){t=t.substring(m.raw.length),n.push(m);continue}let b=t;if((f=this.options.extensions)!=null&&f.startInline){let k=1/0,S=t.slice(1),_;this.options.extensions.startInline.forEach(F=>{_=F.call({lexer:this},S),typeof _=="number"&&_>=0&&(k=Math.min(k,_))}),k<1/0&&k>=0&&(b=t.substring(0,k+1))}if(m=this.tokenizer.inlineText(b)){t=t.substring(m.raw.length),m.raw.slice(-1)!=="_"&&(r=m.raw.slice(-1)),a=!0;let k=n.at(-1);(k==null?void 0:k.type)==="text"?(k.raw+=m.raw,k.text+=m.text):n.push(m);continue}if(t){let k="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(k);break}else throw new Error(k)}}return n}},Hn=class{constructor(e){W(this,"options");W(this,"parser");this.options=e||ht}space(e){return""}code({text:e,lang:t,escaped:n}){var o;let i=(o=(t||"").match(ce.notSpaceStart))==null?void 0:o[0],s=e.replace(ce.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Ce(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let i=this.parser.parseInline(n),s=Sa(e);if(s===null)return i;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Ce(t)+'"'),o+=">"+i+"</a>",o}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));let s=Sa(e);if(s===null)return Ce(n);e=s;let o=`<img src="${e}" alt="${Ce(n)}"`;return t&&(o+=` title="${Ce(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Ce(e.text)}},to=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},ke=class hs{constructor(t){W(this,"options");W(this,"renderer");W(this,"textRenderer");this.options=t||ht,this.options.renderer=this.options.renderer||new Hn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new to}static parse(t,n){return new hs(n).parse(t)}static parseInline(t,n){return new hs(n).parseInline(t)}parse(t){var i,s;let n="";for(let o=0;o<t.length;o++){let a=t[o];if((s=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&s[a.type]){let d=a,l=this.options.extensions.renderers[d.type].call({parser:this},d);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(d.type)){n+=l||"";continue}}let r=a;switch(r.type){case"space":{n+=this.renderer.space(r);break}case"hr":{n+=this.renderer.hr(r);break}case"heading":{n+=this.renderer.heading(r);break}case"code":{n+=this.renderer.code(r);break}case"table":{n+=this.renderer.table(r);break}case"blockquote":{n+=this.renderer.blockquote(r);break}case"list":{n+=this.renderer.list(r);break}case"checkbox":{n+=this.renderer.checkbox(r);break}case"html":{n+=this.renderer.html(r);break}case"def":{n+=this.renderer.def(r);break}case"paragraph":{n+=this.renderer.paragraph(r);break}case"text":{n+=this.renderer.text(r);break}default:{let d='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(d),"";throw new Error(d)}}}return n}parseInline(t,n=this.renderer){var s,o;let i="";for(let a=0;a<t.length;a++){let r=t[a];if((o=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&o[r.type]){let l=this.options.extensions.renderers[r.type].call({parser:this},r);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){i+=l||"";continue}}let d=r;switch(d.type){case"escape":{i+=n.text(d);break}case"html":{i+=n.html(d);break}case"link":{i+=n.link(d);break}case"image":{i+=n.image(d);break}case"checkbox":{i+=n.checkbox(d);break}case"strong":{i+=n.strong(d);break}case"em":{i+=n.em(d);break}case"codespan":{i+=n.codespan(d);break}case"br":{i+=n.br(d);break}case"del":{i+=n.del(d);break}case"text":{i+=n.text(d);break}default:{let l='Token with "'+d.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return i}},Cn,Ht=(Cn=class{constructor(e){W(this,"options");W(this,"block");this.options=e||ht}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?$e.lex:$e.lexInline}provideParser(){return this.block?ke.parse:ke.parseInline}},W(Cn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),W(Cn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Cn),nh=class{constructor(...e){W(this,"defaults",Ws());W(this,"options",this.setOptions);W(this,"parse",this.parseMarkdown(!0));W(this,"parseInline",this.parseMarkdown(!1));W(this,"Parser",ke);W(this,"Renderer",Hn);W(this,"TextRenderer",to);W(this,"Lexer",$e);W(this,"Tokenizer",Kn);W(this,"Hooks",Ht);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(let o of e)switch(n=n.concat(t.call(this,o)),o.type){case"table":{let a=o;for(let r of a.header)n=n.concat(this.walkTokens(r.tokens,t));for(let r of a.rows)for(let d of r)n=n.concat(this.walkTokens(d.tokens,t));break}case"list":{let a=o;n=n.concat(this.walkTokens(a.items,t));break}default:{let a=o;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[a.type]?this.defaults.extensions.childTokens[a.type].forEach(r=>{let d=a[r].flat(1/0);n=n.concat(this.walkTokens(d,t))}):a.tokens&&(n=n.concat(this.walkTokens(a.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let r=s.renderer.apply(this,a);return r===!1&&(r=o.apply(this,a)),r}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){let s=this.defaults.renderer||new Hn(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,r=n.renderer[a],d=s[a];s[a]=(...l)=>{let u=r.apply(s,l);return u===!1&&(u=d.apply(s,l)),u||""}}i.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new Kn(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,r=n.tokenizer[a],d=s[a];s[a]=(...l)=>{let u=r.apply(s,l);return u===!1&&(u=d.apply(s,l)),u}}i.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new Ht;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,r=n.hooks[a],d=s[a];Ht.passThroughHooks.has(o)?s[a]=l=>{if(this.defaults.async&&Ht.passThroughHooksRespectAsync.has(o))return(async()=>{let g=await r.call(s,l);return d.call(s,g)})();let u=r.call(s,l);return d.call(s,u)}:s[a]=(...l)=>{if(this.defaults.async)return(async()=>{let g=await r.apply(s,l);return g===!1&&(g=await d.apply(s,l)),g})();let u=r.apply(s,l);return u===!1&&(u=d.apply(s,l)),u}}i.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;i.walkTokens=function(a){let r=[];return r.push(o.call(this,a)),s&&(r=r.concat(s.call(this,a))),r}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return $e.lex(e,t??this.defaults)}parser(e,t){return ke.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let i={...n},s={...this.defaults,...i},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&i.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,r=await(s.hooks?await s.hooks.provideLexer():e?$e.lex:$e.lexInline)(a,s),d=s.hooks?await s.hooks.processAllTokens(r):r;s.walkTokens&&await Promise.all(this.walkTokens(d,s.walkTokens));let l=await(s.hooks?await s.hooks.provideParser():e?ke.parse:ke.parseInline)(d,s);return s.hooks?await s.hooks.postprocess(l):l})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?$e.lex:$e.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let r=(s.hooks?s.hooks.provideParser():e?ke.parse:ke.parseInline)(a,s);return s.hooks&&(r=s.hooks.postprocess(r)),r}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let i="<p>An error occurred:</p><pre>"+Ce(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},gt=new nh;function Y(e,t){return gt.parse(e,t)}Y.options=Y.setOptions=function(e){return gt.setOptions(e),Y.defaults=gt.defaults,vl(Y.defaults),Y};Y.getDefaults=Ws;Y.defaults=ht;Y.use=function(...e){return gt.use(...e),Y.defaults=gt.defaults,vl(Y.defaults),Y};Y.walkTokens=function(e,t){return gt.walkTokens(e,t)};Y.parseInline=gt.parseInline;Y.Parser=ke;Y.parser=ke.parse;Y.Renderer=Hn;Y.TextRenderer=to;Y.Lexer=$e;Y.lexer=$e.lex;Y.Tokenizer=Kn;Y.Hooks=Ht;Y.parse=Y;Y.options;Y.setOptions;Y.use;Y.walkTokens;Y.parseInline;ke.parse;$e.lex;Y.setOptions({gfm:!0,breaks:!0});const ih=["a","b","blockquote","br","code","del","em","h1","h2","h3","h4","hr","i","li","ol","p","pre","strong","table","tbody","td","th","thead","tr","ul","img"],sh=["class","href","rel","target","title","start","src","alt"],Ca={ALLOWED_TAGS:ih,ALLOWED_ATTR:sh,ADD_DATA_URI_TAGS:["img"]};let Ta=!1;const oh=14e4,ah=4e4,rh=200,qi=5e4,st=new Map;function lh(e){const t=st.get(e);return t===void 0?null:(st.delete(e),st.set(e,t),t)}function Ea(e,t){if(st.set(e,t),st.size<=rh)return;const n=st.keys().next().value;n&&st.delete(n)}function ch(){Ta||(Ta=!0,gs.addHook("afterSanitizeAttributes",e=>{!(e instanceof HTMLAnchorElement)||!e.getAttribute("href")||(e.setAttribute("rel","noreferrer noopener"),e.setAttribute("target","_blank"))}))}function vs(e){const t=e.trim();if(!t)return"";if(ch(),t.length<=qi){const a=lh(t);if(a!==null)return a}const n=vr(t,oh),i=n.truncated?`

… truncated (${n.total} chars, showing first ${n.text.length}).`:"";if(n.text.length>ah){const r=`<pre class="code-block">${El(`${n.text}${i}`)}</pre>`,d=gs.sanitize(r,Ca);return t.length<=qi&&Ea(t,d),d}const s=Y.parse(`${n.text}${i}`,{renderer:Tl}),o=gs.sanitize(s,Ca);return t.length<=qi&&Ea(t,o),o}const Tl=new Y.Renderer;Tl.html=({text:e})=>El(e);function El(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const dh=new RegExp("\\p{Script=Hebrew}|\\p{Script=Arabic}|\\p{Script=Syriac}|\\p{Script=Thaana}|\\p{Script=Nko}|\\p{Script=Samaritan}|\\p{Script=Mandaic}|\\p{Script=Adlam}|\\p{Script=Phoenician}|\\p{Script=Lydian}","u");function Ll(e,t=/[\s\p{P}\p{S}]/u){if(!e)return"ltr";for(const n of e)if(!t.test(n))return dh.test(n)?"rtl":"ltr";return"ltr"}const uh=1500,gh=2e3,Rl="Copy as markdown",fh="Copied",ph="Copy failed";async function hh(e){if(!e)return!1;try{return await navigator.clipboard.writeText(e),!0}catch{return!1}}function _n(e,t){e.title=t,e.setAttribute("aria-label",t)}function vh(e){const t=e.label??Rl;return c`
    <button
      class="chat-copy-btn"
      type="button"
      title=${t}
      aria-label=${t}
      @click=${async n=>{const i=n.currentTarget;if(!i||i.dataset.copying==="1")return;i.dataset.copying="1",i.setAttribute("aria-busy","true"),i.disabled=!0;const s=await hh(e.text());if(i.isConnected){if(delete i.dataset.copying,i.removeAttribute("aria-busy"),i.disabled=!1,!s){i.dataset.error="1",_n(i,ph),window.setTimeout(()=>{i.isConnected&&(delete i.dataset.error,_n(i,t))},gh);return}i.dataset.copied="1",_n(i,fh),window.setTimeout(()=>{i.isConnected&&(delete i.dataset.copied,_n(i,t))},uh)}}}
    >
      <span class="chat-copy-btn__icon" aria-hidden="true">
        <span class="chat-copy-btn__icon-copy">${ie.copy}</span>
        <span class="chat-copy-btn__icon-check">${ie.check}</span>
      </span>
    </button>
  `}function mh(e){return vh({text:()=>e,label:Rl})}function Il(e){const t=e;let n=typeof t.role=="string"?t.role:"unknown";const i=typeof t.toolCallId=="string"||typeof t.tool_call_id=="string",s=t.content,o=Array.isArray(s)?s:null,a=Array.isArray(o)&&o.some(g=>{const f=g,m=(typeof f.type=="string"?f.type:"").toLowerCase();return m==="toolresult"||m==="tool_result"}),r=typeof t.toolName=="string"||typeof t.tool_name=="string";(i||a||r)&&(n="toolResult");let d=[];typeof t.content=="string"?d=[{type:"text",text:t.content}]:Array.isArray(t.content)?d=t.content.map(g=>({type:g.type||"text",text:g.text,name:g.name,args:g.args||g.arguments})):typeof t.text=="string"&&(d=[{type:"text",text:t.text}]);const l=typeof t.timestamp=="number"?t.timestamp:Date.now(),u=typeof t.id=="string"?t.id:void 0;return{role:n,content:d,timestamp:l,id:u}}function no(e){const t=e.toLowerCase();return e==="user"||e==="User"?e:e==="assistant"?"assistant":e==="system"?"system":t==="toolresult"||t==="tool_result"||t==="tool"||t==="function"?"tool":e}function Ml(e){const t=e,n=typeof t.role=="string"?t.role.toLowerCase():"";return n==="toolresult"||n==="tool_result"}function yh(e){return(e??"").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())||"Tool"}function bh(e){const t=(e??"").trim();return t?t.replace(/\s+/g,"_").toLowerCase():""}function wh(e){return(e??"").trim().toLowerCase()||"use"}const $h={icon:"puzzle",detailKeys:["command","path","url","targetUrl","targetId","ref","element","node","nodeId","id","requestId","to","channelId","guildId","userId","name","query","pattern","messageId"]},kh={bash:{icon:"wrench",title:"Bash",detailKeys:["command"]},process:{icon:"wrench",title:"Process",detailKeys:["sessionId"]},read:{icon:"fileText",title:"Read",detailKeys:["path"]},write:{icon:"edit",title:"Write",detailKeys:["path"]},edit:{icon:"penLine",title:"Edit",detailKeys:["path"]},attach:{icon:"paperclip",title:"Attach",detailKeys:["path","url","fileName"]},browser:{icon:"globe",title:"Browser",actions:{status:{label:"status"},start:{label:"start"},stop:{label:"stop"},tabs:{label:"tabs"},open:{label:"open",detailKeys:["targetUrl"]},focus:{label:"focus",detailKeys:["targetId"]},close:{label:"close",detailKeys:["targetId"]},snapshot:{label:"snapshot",detailKeys:["targetUrl","targetId","ref","element","format"]},screenshot:{label:"screenshot",detailKeys:["targetUrl","targetId","ref","element"]},navigate:{label:"navigate",detailKeys:["targetUrl","targetId"]},console:{label:"console",detailKeys:["level","targetId"]},pdf:{label:"pdf",detailKeys:["targetId"]},upload:{label:"upload",detailKeys:["paths","ref","inputRef","element","targetId"]},dialog:{label:"dialog",detailKeys:["accept","promptText","targetId"]},act:{label:"act",detailKeys:["request.kind","request.ref","request.selector","request.text","request.value"]}}},canvas:{icon:"image",title:"Canvas",actions:{present:{label:"present",detailKeys:["target","node","nodeId"]},hide:{label:"hide",detailKeys:["node","nodeId"]},navigate:{label:"navigate",detailKeys:["url","node","nodeId"]},eval:{label:"eval",detailKeys:["javaScript","node","nodeId"]},snapshot:{label:"snapshot",detailKeys:["format","node","nodeId"]},a2ui_push:{label:"A2UI push",detailKeys:["jsonlPath","node","nodeId"]},a2ui_reset:{label:"A2UI reset",detailKeys:["node","nodeId"]}}},nodes:{icon:"smartphone",title:"Nodes",actions:{status:{label:"status"},describe:{label:"describe",detailKeys:["node","nodeId"]},pending:{label:"pending"},approve:{label:"approve",detailKeys:["requestId"]},reject:{label:"reject",detailKeys:["requestId"]},notify:{label:"notify",detailKeys:["node","nodeId","title","body"]},camera_snap:{label:"camera snap",detailKeys:["node","nodeId","facing","deviceId"]},camera_list:{label:"camera list",detailKeys:["node","nodeId"]},camera_clip:{label:"camera clip",detailKeys:["node","nodeId","facing","duration","durationMs"]},screen_record:{label:"screen record",detailKeys:["node","nodeId","duration","durationMs","fps","screenIndex"]}}},cron:{icon:"loader",title:"Cron",actions:{status:{label:"status"},list:{label:"list"},add:{label:"add",detailKeys:["job.name","job.id","job.schedule","job.cron"]},update:{label:"update",detailKeys:["id"]},remove:{label:"remove",detailKeys:["id"]},run:{label:"run",detailKeys:["id"]},runs:{label:"runs",detailKeys:["id"]},wake:{label:"wake",detailKeys:["text","mode"]}}},gateway:{icon:"plug",title:"Gateway",actions:{restart:{label:"restart",detailKeys:["reason","delayMs"]},"config.get":{label:"config get"},"config.schema":{label:"config schema"},"config.apply":{label:"config apply",detailKeys:["restartDelayMs"]},"update.run":{label:"update run",detailKeys:["restartDelayMs"]}}},whatsapp_login:{icon:"circle",title:"WhatsApp Login",actions:{start:{label:"start"},wait:{label:"wait"}}},discord:{icon:"messageSquare",title:"Discord",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sticker:{label:"sticker",detailKeys:["to","stickerIds"]},poll:{label:"poll",detailKeys:["question","to"]},permissions:{label:"permissions",detailKeys:["channelId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},threadCreate:{label:"thread create",detailKeys:["channelId","name"]},threadList:{label:"thread list",detailKeys:["guildId","channelId"]},threadReply:{label:"thread reply",detailKeys:["channelId","content"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},searchMessages:{label:"search",detailKeys:["guildId","content"]},memberInfo:{label:"member",detailKeys:["guildId","userId"]},roleInfo:{label:"roles",detailKeys:["guildId"]},emojiList:{label:"emoji list",detailKeys:["guildId"]},roleAdd:{label:"role add",detailKeys:["guildId","userId","roleId"]},roleRemove:{label:"role remove",detailKeys:["guildId","userId","roleId"]},channelInfo:{label:"channel",detailKeys:["channelId"]},channelList:{label:"channels",detailKeys:["guildId"]},voiceStatus:{label:"voice",detailKeys:["guildId","userId"]},eventList:{label:"events",detailKeys:["guildId"]},eventCreate:{label:"event create",detailKeys:["guildId","name"]},timeout:{label:"timeout",detailKeys:["guildId","userId"]},kick:{label:"kick",detailKeys:["guildId","userId"]},ban:{label:"ban",detailKeys:["guildId","userId"]}}},slack:{icon:"messageSquare",title:"Slack",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},memberInfo:{label:"member",detailKeys:["userId"]},emojiList:{label:"emoji list"}}}},xh={fallback:$h,tools:kh},Fl=xh,La=Fl.fallback??{icon:"puzzle"},Sh=Fl.tools??{};function Ah(e){if(!e)return e;const t=[{re:/^\/Users\/[^/]+(\/|$)/,replacement:"~$1"},{re:/^\/home\/[^/]+(\/|$)/,replacement:"~$1"},{re:/^C:\\Users\\[^\\]+(\\|$)/i,replacement:"~$1"}];for(const n of t)if(n.re.test(e))return e.replace(n.re,n.replacement);return e}function _h(e){const t=bh(e.name),n=t.toLowerCase(),i=Sh[n],s=(i==null?void 0:i.icon)??La.icon??"puzzle",o=(i==null?void 0:i.title)??yh(t),a=(i==null?void 0:i.label)??o,r=e.args&&typeof e.args=="object"?e.args.action:void 0,d=typeof r=="string"?r.trim():void 0,l=n==="web_search"?"search":n==="web_fetch"?"fetch":n.replace(/_/g," ").replace(/\./g," "),u=wh(d??l);let g;n==="exec"&&(g=void 0),!g&&n==="read"&&(g=void 0),!g&&(n==="write"||n==="edit"||n==="attach")&&(g=void 0),!g&&n==="web_search"&&(g=void 0),!g&&n==="web_fetch"&&(g=void 0);const f=(i==null?void 0:i.detailKeys)??La.detailKeys??[];return!g&&f.length>0&&(g=void 0),!g&&e.meta&&(g=e.meta),g&&(g=Ah(g)),{name:t,icon:s,title:o,label:a,verb:u,detail:g}}function Ch(e){if(e.detail){if(e.detail.includes(" · ")){const t=e.detail.split(" · ").map(n=>n.trim()).filter(n=>n.length>0).join(", ");return t?`with ${t}`:void 0}return e.detail}}const Th=80,Eh=2,Ra=100;function Lh(e){const t=e.trim();if(t.startsWith("{")||t.startsWith("["))try{const n=JSON.parse(t);return"```json\n"+JSON.stringify(n,null,2)+"\n```"}catch{}return e}function Rh(e){const t=e.split(`
`),n=t.slice(0,Eh),i=n.join(`
`);return i.length>Ra?i.slice(0,Ra)+"…":n.length<t.length?i+"…":i}function Ih(e){const t=e,n=Mh(t.content),i=[];for(const s of n){const o=(typeof s.type=="string"?s.type:"").toLowerCase();(["toolcall","tool_call","tooluse","tool_use"].includes(o)||typeof s.name=="string"&&s.arguments!=null)&&i.push({kind:"call",name:s.name??"tool",args:Fh(s.arguments??s.args)})}for(const s of n){const o=(typeof s.type=="string"?s.type:"").toLowerCase();if(o!=="toolresult"&&o!=="tool_result")continue;const a=Ph(s),r=typeof s.name=="string"?s.name:"tool";i.push({kind:"result",name:r,text:a})}if(Ml(e)&&!i.some(s=>s.kind==="result")){const s=typeof t.toolName=="string"&&t.toolName||typeof t.tool_name=="string"&&t.tool_name||"tool",o=qr(e)??void 0;i.push({kind:"result",name:s,text:o})}return i}function Ia(e,t){var g,f;const n=_h({name:e.name,args:e.args}),i=Ch(n),s=!!((g=e.text)!=null&&g.trim()),o=!!t,a=o?()=>{if(s){t(Lh(e.text));return}const m=`## ${n.label}

${i?`**Command:** \`${i}\`

`:""}*No output — tool completed successfully.*`;t(m)}:void 0,r=s&&(((f=e.text)==null?void 0:f.length)??0)<=Th,d=s&&!r,l=s&&r,u=!s;return c`
    <div
      class="chat-tool-card ${o?"chat-tool-card--clickable":""}"
      @click=${a}
      role=${o?"button":y}
      tabindex=${o?"0":y}
      @keydown=${o?m=>{m.key!=="Enter"&&m.key!==" "||(m.preventDefault(),a==null||a())}:y}
    >
      <div class="chat-tool-card__header">
        <div class="chat-tool-card__title">
          <span class="chat-tool-card__icon">${ie[n.icon]}</span>
          <span>${n.label}</span>
        </div>
        ${o?c`<span class="chat-tool-card__action">${s?"View":""} ${ie.check}</span>`:y}
        ${u&&!o?c`<span class="chat-tool-card__status">${ie.check}</span>`:y}
      </div>
      ${i?c`<div class="chat-tool-card__detail">${i}</div>`:y}
      ${u?c`
              <div class="chat-tool-card__status-text muted">Completed</div>
            `:y}
      ${d?c`<div class="chat-tool-card__preview mono">${Rh(e.text)}</div>`:y}
      ${l?c`<div class="chat-tool-card__inline mono">${e.text}</div>`:y}
    </div>
  `}function Mh(e){return Array.isArray(e)?e.filter(Boolean):[]}function Fh(e){if(typeof e!="string")return e;const t=e.trim();if(!t||!t.startsWith("{")&&!t.startsWith("["))return e;try{return JSON.parse(t)}catch{return e}}function Ph(e){if(typeof e.text=="string")return e.text;if(typeof e.content=="string")return e.content}function Dh(e){const n=e.content,i=[];if(Array.isArray(n))for(const s of n){if(typeof s!="object"||s===null)continue;const o=s;if(o.type==="image"){const a=o.source;if((a==null?void 0:a.type)==="base64"&&typeof a.data=="string"){const r=a.data,d=a.media_type||"image/png",l=r.startsWith("data:")?r:`data:${d};base64,${r}`;i.push({url:l})}else typeof o.url=="string"&&i.push({url:o.url})}else if(o.type==="image_url"){const a=o.image_url;typeof(a==null?void 0:a.url)=="string"&&i.push({url:a.url})}}return i}function Oh(e){return c`
    <div class="chat-group assistant">
      ${io("assistant",e)}
      <div class="chat-group-messages">
        <div class="chat-bubble chat-reading-indicator" aria-hidden="true">
          <span class="chat-reading-indicator__dots">
            <span></span><span></span><span></span>
          </span>
        </div>
      </div>
    </div>
  `}function Nh(e,t,n,i){const s=new Date(t).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}),o=(i==null?void 0:i.name)??"Assistant";return c`
    <div class="chat-group assistant">
      ${io("assistant",i)}
      <div class="chat-group-messages">
        ${Pl({role:"assistant",content:[{type:"text",text:e}],timestamp:t},{isStreaming:!0,showReasoning:!1},n)}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${o}</span>
          <span class="chat-group-timestamp">${s}</span>
        </div>
      </div>
    </div>
  `}function Bh(e,t){const n=no(e.role),i=t.assistantName??"Assistant",s=n==="user"?"You":n==="assistant"?i:n,o=n==="user"?"user":n==="assistant"?"assistant":"other",a=new Date(e.timestamp).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return c`
    <div class="chat-group ${o}">
      ${io(e.role,{name:i,avatar:t.assistantAvatar??null})}
      <div class="chat-group-messages">
        ${e.messages.map((r,d)=>Pl(r.message,{isStreaming:e.isStreaming&&d===e.messages.length-1,showReasoning:t.showReasoning},t.onOpenSidebar))}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${s}</span>
          <span class="chat-group-timestamp">${a}</span>
        </div>
      </div>
    </div>
  `}function io(e,t){var r,d;const n=no(e),i=((r=t==null?void 0:t.name)==null?void 0:r.trim())||"Assistant",s=((d=t==null?void 0:t.avatar)==null?void 0:d.trim())||"",o=n==="user"?"U":n==="assistant"?i.charAt(0).toUpperCase()||"A":n==="tool"?"⚙":"?",a=n==="user"?"user":n==="assistant"?"assistant":n==="tool"?"tool":"other";return s&&n==="assistant"?Uh(s)?c`<img
        class="chat-avatar ${a}"
        src="${s}"
        alt="${i}"
      />`:c`<div class="chat-avatar ${a}">${s}</div>`:c`<div class="chat-avatar ${a}">${o}</div>`}function Uh(e){return/^https?:\/\//i.test(e)||/^data:image\//i.test(e)||e.startsWith("/")}function zh(e){return e.length===0?y:c`
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
  `}function Pl(e,t,n){const i=e,s=typeof i.role=="string"?i.role:"unknown",o=Ml(e)||s.toLowerCase()==="toolresult"||s.toLowerCase()==="tool_result"||typeof i.toolCallId=="string"||typeof i.tool_call_id=="string",a=Ih(e),r=a.length>0,d=Dh(e),l=d.length>0,u=qr(e),g=t.showReasoning&&s==="assistant"?Uu(e):null,f=u!=null&&u.trim()?u:null,m=g?ju(g):null,b=f,k=s==="assistant"&&!!(b!=null&&b.trim()),S=["chat-bubble",k?"has-copy":"",t.isStreaming?"streaming":"","fade-in"].filter(Boolean).join(" ");return!b&&r&&o?c`${a.map(_=>Ia(_,n))}`:!b&&!r&&!l?y:c`
    <div class="${S}">
      ${k?mh(b):y}
      ${zh(d)}
      ${m?c`<div class="chat-thinking">${ls(vs(m))}</div>`:y}
      ${b?c`<div class="chat-text" dir="${Ll(b)}">${ls(vs(b))}</div>`:y}
      ${a.map(_=>Ia(_,n))}
    </div>
  `}function jh(e){return c`
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
            `:e.content?c`<div class="sidebar-markdown">${ls(vs(e.content))}</div>`:c`
                  <div class="muted">No content available</div>
                `}
      </div>
    </div>
  `}var Kh=Object.defineProperty,Hh=Object.getOwnPropertyDescriptor,ci=(e,t,n,i)=>{for(var s=i>1?void 0:i?Hh(t,n):t,o=e.length-1,a;o>=0;o--)(a=e[o])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&Kh(t,n,s),s};let Lt=class extends Ct{constructor(){super(...arguments),this.splitRatio=.6,this.minRatio=.4,this.maxRatio=.7,this.isDragging=!1,this.startX=0,this.startRatio=0,this.handleMouseDown=e=>{this.isDragging=!0,this.startX=e.clientX,this.startRatio=this.splitRatio,this.classList.add("dragging"),document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),e.preventDefault()},this.handleMouseMove=e=>{if(!this.isDragging)return;const t=this.parentElement;if(!t)return;const n=t.getBoundingClientRect().width,s=(e.clientX-this.startX)/n;let o=this.startRatio+s;o=Math.max(this.minRatio,Math.min(this.maxRatio,o)),this.dispatchEvent(new CustomEvent("resize",{detail:{splitRatio:o},bubbles:!0,composed:!0}))},this.handleMouseUp=()=>{this.isDragging=!1,this.classList.remove("dragging"),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}}render(){return y}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}};Lt.styles=Ql`
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
  `;ci([Wn({type:Number})],Lt.prototype,"splitRatio",2);ci([Wn({type:Number})],Lt.prototype,"minRatio",2);ci([Wn({type:Number})],Lt.prototype,"maxRatio",2);Lt=ci([nr("resizable-divider")],Lt);const qh=5e3,Gh=/\.(xlsx|xls|xlsm|pdf)$/i;function Wh(e){for(let t=0;t<e.length;t++)if(Gh.test(e[t].name))return e[t];return null}function Ma(e){e.style.height="auto",e.style.height=`${e.scrollHeight}px`}function Vh(e){return e?e.active?c`
      <div class="compaction-indicator compaction-indicator--active" role="status" aria-live="polite">
        ${ie.loader} Compacting context...
      </div>
    `:e.completedAt&&Date.now()-e.completedAt<qh?c`
        <div class="compaction-indicator compaction-indicator--complete" role="status" aria-live="polite">
          ${ie.check} Context compacted
        </div>
      `:y:y}function Qh(){return`att-${Date.now()}-${Math.random().toString(36).slice(2,9)}`}function Jh(e,t){var s;const n=(s=e.clipboardData)==null?void 0:s.items;if(!n||!t.onAttachmentsChange)return;const i=[];for(let o=0;o<n.length;o++){const a=n[o];a.type.startsWith("image/")&&i.push(a)}if(i.length!==0){e.preventDefault();for(const o of i){const a=o.getAsFile();if(!a)continue;const r=new FileReader;r.addEventListener("load",()=>{var g;const d=r.result,l={id:Qh(),dataUrl:d,mimeType:a.type},u=t.attachments??[];(g=t.onAttachmentsChange)==null||g.call(t,[...u,l])}),r.readAsDataURL(a)}}}function Yh(e){const t=e.attachments??[];return t.length===0?y:c`
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
  `}function Xh(e){const t=e.uploadedFile,n=e.onFileSelect,i=e.onClearUploadedFile;return t!=null&&t.file_name?c`
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
    `:!n||!e.connected?y:c`
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
  `}function Zh(e){var _,F,L,R;const t=e.connected,n=e.sending||e.stream!==null,i=!!(e.canAbort&&e.onAbort),s=(F=(_=e.sessions)==null?void 0:_.sessions)==null?void 0:F.find(x=>x.key===e.sessionKey),o=(s==null?void 0:s.reasoningLevel)??"off",a=e.showThinking&&o!=="off",r={name:e.assistantName,avatar:e.assistantAvatar??e.assistantAvatarUrl??null},d=(((L=e.attachments)==null?void 0:L.length)??0)>0;(R=e.uploadedFile)!=null&&R.file_name;const l=e.connected?d?"Add a message or paste more images...":"Message (↩ to send, Shift+↩ for line breaks；可粘贴图片，或上传/拖拽 Excel/PDF)":"Connect to the gateway to start chatting…",u=e.splitRatio??.6,g=!!(e.sidebarOpen&&e.onCloseSidebar),f=c`
    <div
      class="chat-thread"
      role="log"
      aria-live="polite"
      @scroll=${e.onChatScroll}
    >
      ${e.loading?c`
              <div class="muted">Loading chat…</div>
            `:y}
      ${nl(tv(e),x=>x.key,x=>x.kind==="divider"?c`
              <div class="chat-divider" role="separator" data-ts=${String(x.timestamp)}>
                <span class="chat-divider__line"></span>
                <span class="chat-divider__label">${x.label}</span>
                <span class="chat-divider__line"></span>
              </div>
            `:x.kind==="reading-indicator"?Oh(r):x.kind==="stream"?Nh(x.text,x.startedAt,e.onOpenSidebar,r):x.kind==="group"?Bh(x,{onOpenSidebar:e.onOpenSidebar,showReasoning:a,assistantName:e.assistantName,assistantAvatar:r.avatar}):y)}
    </div>
  `,m=x=>{var P;x.preventDefault(),x.stopPropagation(),x.dataTransfer&&(x.dataTransfer.dropEffect="copy"),(P=e.onComposeDragOver)==null||P.call(e)},b=x=>{var P;x.preventDefault(),x.stopPropagation(),x.dataTransfer&&(x.dataTransfer.dropEffect="copy"),(P=e.onComposeDragOver)==null||P.call(e)},k=x=>{var K;const P=x.currentTarget,j=x.relatedTarget;j!=null&&(P.contains(j)||(K=e.onComposeDragLeave)==null||K.call(e))},S=x=>{var j,K,B;x.preventDefault(),x.stopPropagation(),(j=e.onComposeDragLeave)==null||j.call(e);const P=(B=(K=x.dataTransfer)==null?void 0:K.files)!=null&&B.length?Wh(x.dataTransfer.files):null;P&&e.onComposeDrop&&e.onComposeDrop(P)};return c`
    <section
      class="card chat ${e.composeDragOver?"chat--drag-over":""}"
      @dragenter=${m}
      @dragover=${b}
      @dragleave=${k}
      @drop=${S}
    >
      ${e.disabledReason?c`<div class="callout">${e.disabledReason}</div>`:y}

      ${e.error?c`<div class="callout danger">${e.error}</div>`:y}

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

        ${g?c`
              <resizable-divider
                .splitRatio=${u}
                @resize=${x=>{var P;return(P=e.onSplitRatioChange)==null?void 0:P.call(e,x.detail.splitRatio)}}
              ></resizable-divider>
              <div class="chat-sidebar">
                ${jh({content:e.sidebarContent??null,error:e.sidebarError??null,onClose:e.onCloseSidebar,onViewRawText:()=>{!e.sidebarContent||!e.onOpenSidebar||e.onOpenSidebar(`\`\`\`
${e.sidebarContent}
\`\`\``)}})}
              </div>
            `:y}
      </div>

      ${e.queue.length?c`
            <div class="chat-queue" role="status" aria-live="polite">
              <div class="chat-queue__title">Queued (${e.queue.length})</div>
              <div class="chat-queue__list">
                ${e.queue.map(x=>{var P;return c`
                    <div class="chat-queue__item">
                      <div class="chat-queue__text">
                        ${x.text||((P=x.attachments)!=null&&P.length?`Image (${x.attachments.length})`:"")}
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
          `:y}

      ${Vh(e.compactionStatus)}

      ${e.showNewMessages?c`
            <button
              class="btn chat-new-messages"
              type="button"
              @click=${e.onScrollToBottom}
            >
              New messages ${ie.arrowDown}
            </button>
          `:y}

      <div class="chat-compose ${e.composeDragOver?"chat-compose--drag-over":""}">
        ${e.composeDragOver?c`<div class="chat-compose__drop-hint">松开以上传 Excel/PDF</div>`:y}
        ${Yh(e)}
        ${Xh(e)}
        <div class="chat-compose__row">
          <label class="field chat-compose__field">
            <span>Message</span>
            <textarea
              ${Gf(x=>x&&Ma(x))}
              .value=${e.draft}
              dir=${Ll(e.draft)}
              ?disabled=${!e.connected}
              @keydown=${x=>{x.key==="Enter"&&(x.isComposing||x.keyCode===229||x.shiftKey||e.connected&&(x.preventDefault(),t&&e.onSend()))}}
              @input=${x=>{const P=x.target;Ma(P),e.onDraftChange(P.value)}}
              @paste=${x=>Jh(x,e)}
              placeholder=${l}
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
  `}const Fa=200;function ev(e){const t=[];let n=null;for(const i of e){if(i.kind!=="message"){n&&(t.push(n),n=null),t.push(i);continue}const s=Il(i.message),o=no(s.role),a=s.timestamp||Date.now();!n||n.role!==o?(n&&t.push(n),n={kind:"group",key:`group:${o}:${i.key}`,role:o,messages:[{message:i.message,key:i.key}],timestamp:a,isStreaming:!1}):n.messages.push({message:i.message,key:i.key})}return n&&t.push(n),t}function tv(e){const t=[],n=Array.isArray(e.messages)?e.messages:[],i=Array.isArray(e.toolMessages)?e.toolMessages:[],s=Math.max(0,n.length-Fa);s>0&&t.push({kind:"message",key:"chat:history:notice",message:{role:"system",content:`Showing last ${Fa} messages (${s} hidden).`,timestamp:Date.now()}});for(let o=s;o<n.length;o++){const a=n[o],r=Il(a),l=a.__openclaw;if(l&&l.kind==="compaction"){t.push({kind:"divider",key:typeof l.id=="string"?`divider:compaction:${l.id}`:`divider:compaction:${r.timestamp}:${o}`,label:"Compaction",timestamp:r.timestamp??Date.now()});continue}!e.showThinking&&r.role.toLowerCase()==="toolresult"||t.push({kind:"message",key:Pa(a,o),message:a})}if(e.showThinking)for(let o=0;o<i.length;o++)t.push({kind:"message",key:Pa(i[o],o+n.length),message:i[o]});if(e.stream!==null){const o=`stream:${e.sessionKey}:${e.streamStartedAt??"live"}`;e.stream.trim().length>0?t.push({kind:"stream",key:o,text:e.stream,startedAt:e.streamStartedAt??Date.now()}):t.push({kind:"reading-indicator",key:o})}return ev(t)}function Pa(e,t){const n=e,i=typeof n.toolCallId=="string"?n.toolCallId:"";if(i)return`tool:${i}`;const s=typeof n.id=="string"?n.id:"";if(s)return`msg:${s}`;const o=typeof n.messageId=="string"?n.messageId:"";if(o)return`msg:${o}`;const a=typeof n.timestamp=="number"?n.timestamp:null,r=typeof n.role=="string"?n.role:"unknown";return a!=null?`msg:${r}:${a}:${t}`:`msg:${r}:${t}`}const nv=new Set(["title","description","default","nullable"]);function iv(e){return Object.keys(e??{}).filter(n=>!nv.has(n)).length===0}function sv(e){if(e===void 0)return"";try{return JSON.stringify(e,null,2)??""}catch{return""}}const rn={chevronDown:c`
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
  `};function ft(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:a,onPatch:r}=e,d=e.showLabel??!0,l=he(t),u=ve(i,s),g=(u==null?void 0:u.label)??t.title??Ne(String(i.at(-1))),f=(u==null?void 0:u.help)??t.description,m=xs(i);if(o.has(m))return c`<div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${g}</div>
      <div class="cfg-field__error">Unsupported schema node. Use Raw mode.</div>
    </div>`;if(t.anyOf||t.oneOf){const k=(t.anyOf??t.oneOf??[]).filter(x=>!(x.type==="null"||Array.isArray(x.type)&&x.type.includes("null")));if(k.length===1)return ft({...e,schema:k[0]});const S=x=>{if(x.const!==void 0)return x.const;if(x.enum&&x.enum.length===1)return x.enum[0]},_=k.map(S),F=_.every(x=>x!==void 0);if(F&&_.length>0&&_.length<=5){const x=n??t.default;return c`
        <div class="cfg-field">
          ${d?c`<label class="cfg-field__label">${g}</label>`:y}
          ${f?c`<div class="cfg-field__help">${f}</div>`:y}
          <div class="cfg-segmented">
            ${_.map(P=>c`
              <button
                type="button"
                class="cfg-segmented__btn ${P===x||String(P)===String(x)?"active":""}"
                ?disabled=${a}
                @click=${()=>r(i,P)}
              >
                ${String(P)}
              </button>
            `)}
          </div>
        </div>
      `}if(F&&_.length>5)return Oa({...e,options:_,value:n??t.default});const L=new Set(k.map(x=>he(x)).filter(Boolean)),R=new Set([...L].map(x=>x==="integer"?"number":x));if([...R].every(x=>["string","number","boolean"].includes(x))){const x=R.has("string"),P=R.has("number");if(R.has("boolean")&&R.size===1)return ft({...e,schema:{...t,type:"boolean",anyOf:void 0,oneOf:void 0}});if(x||P)return Da({...e,inputType:P&&!x?"number":"text"})}}if(t.enum){const b=t.enum;if(b.length<=5){const k=n??t.default;return c`
        <div class="cfg-field">
          ${d?c`<label class="cfg-field__label">${g}</label>`:y}
          ${f?c`<div class="cfg-field__help">${f}</div>`:y}
          <div class="cfg-segmented">
            ${b.map(S=>c`
              <button
                type="button"
                class="cfg-segmented__btn ${S===k||String(S)===String(k)?"active":""}"
                ?disabled=${a}
                @click=${()=>r(i,S)}
              >
                ${String(S)}
              </button>
            `)}
          </div>
        </div>
      `}return Oa({...e,options:b,value:n??t.default})}if(l==="object")return av(e);if(l==="array")return rv(e);if(l==="boolean"){const b=typeof n=="boolean"?n:typeof t.default=="boolean"?t.default:!1;return c`
      <label class="cfg-toggle-row ${a?"disabled":""}">
        <div class="cfg-toggle-row__content">
          <span class="cfg-toggle-row__label">${g}</span>
          ${f?c`<span class="cfg-toggle-row__help">${f}</span>`:y}
        </div>
        <div class="cfg-toggle">
          <input
            type="checkbox"
            .checked=${b}
            ?disabled=${a}
            @change=${k=>r(i,k.target.checked)}
          />
          <span class="cfg-toggle__track"></span>
        </div>
      </label>
    `}return l==="number"||l==="integer"?ov(e):l==="string"?Da({...e,inputType:"text"}):c`
    <div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${g}</div>
      <div class="cfg-field__error">Unsupported type: ${l}. Use Raw mode.</div>
    </div>
  `}function Da(e){const{schema:t,value:n,path:i,hints:s,disabled:o,onPatch:a,inputType:r}=e,d=e.showLabel??!0,l=ve(i,s),u=(l==null?void 0:l.label)??t.title??Ne(String(i.at(-1))),g=(l==null?void 0:l.help)??t.description,f=((l==null?void 0:l.sensitive)??!1)&&!/^\$\{[^}]*\}$/.test(String(n??"").trim()),m=(l==null?void 0:l.placeholder)??(f?"••••":t.default!==void 0?`Default: ${String(t.default)}`:""),b=n??"";return c`
    <div class="cfg-field">
      ${d?c`<label class="cfg-field__label">${u}</label>`:y}
      ${g?c`<div class="cfg-field__help">${g}</div>`:y}
      <div class="cfg-input-wrap">
        <input
          type=${f?"password":r}
          class="cfg-input"
          placeholder=${m}
          .value=${b==null?"":String(b)}
          ?disabled=${o}
          @input=${k=>{const S=k.target.value;if(r==="number"){if(S.trim()===""){a(i,void 0);return}const _=Number(S);a(i,Number.isNaN(_)?S:_);return}a(i,S)}}
          @change=${k=>{if(r==="number")return;const S=k.target.value;a(i,S.trim())}}
        />
        ${t.default!==void 0?c`
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
  `}function ov(e){const{schema:t,value:n,path:i,hints:s,disabled:o,onPatch:a}=e,r=e.showLabel??!0,d=ve(i,s),l=(d==null?void 0:d.label)??t.title??Ne(String(i.at(-1))),u=(d==null?void 0:d.help)??t.description,g=n??t.default??"",f=typeof g=="number"?g:0;return c`
    <div class="cfg-field">
      ${r?c`<label class="cfg-field__label">${l}</label>`:y}
      ${u?c`<div class="cfg-field__help">${u}</div>`:y}
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
          @input=${m=>{const b=m.target.value,k=b===""?void 0:Number(b);a(i,k)}}
        />
        <button
          type="button"
          class="cfg-number__btn"
          ?disabled=${o}
          @click=${()=>a(i,f+1)}
        >+</button>
      </div>
    </div>
  `}function Oa(e){const{schema:t,value:n,path:i,hints:s,disabled:o,options:a,onPatch:r}=e,d=e.showLabel??!0,l=ve(i,s),u=(l==null?void 0:l.label)??t.title??Ne(String(i.at(-1))),g=(l==null?void 0:l.help)??t.description,f=n??t.default,m=a.findIndex(k=>k===f||String(k)===String(f)),b="__unset__";return c`
    <div class="cfg-field">
      ${d?c`<label class="cfg-field__label">${u}</label>`:y}
      ${g?c`<div class="cfg-field__help">${g}</div>`:y}
      <select
        class="cfg-select"
        ?disabled=${o}
        .value=${m>=0?String(m):b}
        @change=${k=>{const S=k.target.value;r(i,S===b?void 0:a[Number(S)])}}
      >
        <option value=${b}>Select...</option>
        ${a.map((k,S)=>c`
          <option value=${String(S)}>${String(k)}</option>
        `)}
      </select>
    </div>
  `}function av(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:a,onPatch:r}=e,d=ve(i,s),l=(d==null?void 0:d.label)??t.title??Ne(String(i.at(-1))),u=(d==null?void 0:d.help)??t.description,g=n??t.default,f=g&&typeof g=="object"&&!Array.isArray(g)?g:{},m=t.properties??{},k=Object.entries(m).toSorted((R,x)=>{var K,B;const P=((K=ve([...i,R[0]],s))==null?void 0:K.order)??0,j=((B=ve([...i,x[0]],s))==null?void 0:B.order)??0;return P!==j?P-j:R[0].localeCompare(x[0])}),S=new Set(Object.keys(m)),_=t.additionalProperties,F=!!_&&typeof _=="object",L=c`
    ${k.map(([R,x])=>ft({schema:x,value:f[R],path:[...i,R],hints:s,unsupported:o,disabled:a,onPatch:r}))}
    ${F?lv({schema:_,value:f,path:i,hints:s,unsupported:o,disabled:a,reservedKeys:S,onPatch:r}):y}
  `;return i.length===1?c`
      <div class="cfg-fields">
        ${L}
      </div>
    `:c`
    <details class="cfg-object" open>
      <summary class="cfg-object__header">
        <span class="cfg-object__title">${l}</span>
        <span class="cfg-object__chevron">${rn.chevronDown}</span>
      </summary>
      ${u?c`<div class="cfg-object__help">${u}</div>`:y}
      <div class="cfg-object__content">
        ${L}
      </div>
    </details>
  `}function rv(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:a,onPatch:r}=e,d=e.showLabel??!0,l=ve(i,s),u=(l==null?void 0:l.label)??t.title??Ne(String(i.at(-1))),g=(l==null?void 0:l.help)??t.description,f=Array.isArray(t.items)?t.items[0]:t.items;if(!f)return c`
      <div class="cfg-field cfg-field--error">
        <div class="cfg-field__label">${u}</div>
        <div class="cfg-field__error">Unsupported array schema. Use Raw mode.</div>
      </div>
    `;const m=Array.isArray(n)?n:Array.isArray(t.default)?t.default:[];return c`
    <div class="cfg-array">
      <div class="cfg-array__header">
        ${d?c`<span class="cfg-array__label">${u}</span>`:y}
        <span class="cfg-array__count">${m.length} item${m.length!==1?"s":""}</span>
        <button
          type="button"
          class="cfg-array__add"
          ?disabled=${a}
          @click=${()=>{const b=[...m,ir(f)];r(i,b)}}
        >
          <span class="cfg-array__add-icon">${rn.plus}</span>
          Add
        </button>
      </div>
      ${g?c`<div class="cfg-array__help">${g}</div>`:y}

      ${m.length===0?c`
              <div class="cfg-array__empty">No items yet. Click "Add" to create one.</div>
            `:c`
        <div class="cfg-array__items">
          ${m.map((b,k)=>c`
            <div class="cfg-array__item">
              <div class="cfg-array__item-header">
                <span class="cfg-array__item-index">#${k+1}</span>
                <button
                  type="button"
                  class="cfg-array__item-remove"
                  title="Remove item"
                  ?disabled=${a}
                  @click=${()=>{const S=[...m];S.splice(k,1),r(i,S)}}
                >
                  ${rn.trash}
                </button>
              </div>
              <div class="cfg-array__item-content">
                ${ft({schema:f,value:b,path:[...i,k],hints:s,unsupported:o,disabled:a,showLabel:!1,onPatch:r})}
              </div>
            </div>
          `)}
        </div>
      `}
    </div>
  `}function lv(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:a,reservedKeys:r,onPatch:d}=e,l=iv(t),u=Object.entries(n??{}).filter(([g])=>!r.has(g));return c`
    <div class="cfg-map">
      <div class="cfg-map__header">
        <span class="cfg-map__label">Custom entries</span>
        <button
          type="button"
          class="cfg-map__add"
          ?disabled=${a}
          @click=${()=>{const g={...n};let f=1,m=`custom-${f}`;for(;m in g;)f+=1,m=`custom-${f}`;g[m]=l?{}:ir(t),d(i,g)}}
        >
          <span class="cfg-map__add-icon">${rn.plus}</span>
          Add Entry
        </button>
      </div>

      ${u.length===0?c`
              <div class="cfg-map__empty">No custom entries.</div>
            `:c`
        <div class="cfg-map__items">
          ${u.map(([g,f])=>{const m=[...i,g],b=sv(f);return c`
              <div class="cfg-map__item">
                <div class="cfg-map__item-key">
                  <input
                    type="text"
                    class="cfg-input cfg-input--sm"
                    placeholder="Key"
                    .value=${g}
                    ?disabled=${a}
                    @change=${k=>{const S=k.target.value.trim();if(!S||S===g)return;const _={...n};S in _||(_[S]=_[g],delete _[g],d(i,_))}}
                  />
                </div>
                <div class="cfg-map__item-value">
                  ${l?c`
                        <textarea
                          class="cfg-textarea cfg-textarea--sm"
                          placeholder="JSON value"
                          rows="2"
                          .value=${b}
                          ?disabled=${a}
                          @change=${k=>{const S=k.target,_=S.value.trim();if(!_){d(m,void 0);return}try{d(m,JSON.parse(_))}catch{S.value=b}}}
                        ></textarea>
                      `:ft({schema:t,value:f,path:m,hints:s,unsupported:o,disabled:a,showLabel:!1,onPatch:d})}
                </div>
                <button
                  type="button"
                  class="cfg-map__item-remove"
                  title="Remove entry"
                  ?disabled=${a}
                  @click=${()=>{const k={...n};delete k[g],d(i,k)}}
                >
                  ${rn.trash}
                </button>
              </div>
            `})}
        </div>
      `}
    </div>
  `}const Na={env:c`
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
  `},so={env:{label:"Environment Variables",description:"Environment variables passed to the gateway process"},update:{label:"Updates",description:"Auto-update settings and release channel"},agents:{label:"Agents",description:"Agent configurations, models, and identities"},auth:{label:"Authentication",description:"API keys and authentication profiles"},channels:{label:"Channels",description:"Messaging channels (Telegram, Discord, Slack, etc.)"},messages:{label:"Messages",description:"Message handling and routing settings"},commands:{label:"Commands",description:"Custom slash commands"},hooks:{label:"Hooks",description:"Webhooks and event hooks"},skills:{label:"Skills",description:"Skill packs and capabilities"},tools:{label:"Tools",description:"Tool configurations (browser, search, etc.)"},gateway:{label:"Gateway",description:"Gateway server settings (port, auth, binding)"},wizard:{label:"Setup Wizard",description:"Setup wizard state and history"},meta:{label:"Metadata",description:"Gateway metadata and version information"},logging:{label:"Logging",description:"Log levels and output configuration"},browser:{label:"Browser",description:"Browser automation settings"},ui:{label:"UI",description:"User interface preferences"},models:{label:"Models",description:"AI model configurations and providers"},bindings:{label:"Bindings",description:"Key bindings and shortcuts"},broadcast:{label:"Broadcast",description:"Broadcast and notification settings"},audio:{label:"Audio",description:"Audio input/output settings"},session:{label:"Session",description:"Session management and persistence"},cron:{label:"Cron",description:"Scheduled tasks and automation"},web:{label:"Web",description:"Web server and API settings"},discovery:{label:"Discovery",description:"Service discovery and networking"},canvasHost:{label:"Canvas Host",description:"Canvas rendering and display"},talk:{label:"Talk",description:"Voice and speech settings"},plugins:{label:"Plugins",description:"Plugin management and extensions"}};function Ba(e){return Na[e]??Na.default}function cv(e,t,n){if(!n)return!0;const i=n.toLowerCase(),s=so[e];return e.toLowerCase().includes(i)||s&&(s.label.toLowerCase().includes(i)||s.description.toLowerCase().includes(i))?!0:qt(t,i)}function qt(e,t){var i,s,o;if((i=e.title)!=null&&i.toLowerCase().includes(t)||(s=e.description)!=null&&s.toLowerCase().includes(t)||(o=e.enum)!=null&&o.some(a=>String(a).toLowerCase().includes(t)))return!0;if(e.properties){for(const[a,r]of Object.entries(e.properties))if(a.toLowerCase().includes(t)||qt(r,t))return!0}if(e.items){const a=Array.isArray(e.items)?e.items:[e.items];for(const r of a)if(r&&qt(r,t))return!0}if(e.additionalProperties&&typeof e.additionalProperties=="object"&&qt(e.additionalProperties,t))return!0;const n=e.anyOf??e.oneOf??e.allOf;if(n){for(const a of n)if(a&&qt(a,t))return!0}return!1}function dv(e){var g;if(!e.schema)return c`
      <div class="muted">Schema unavailable.</div>
    `;const t=e.schema,n=e.value??{};if(he(t)!=="object"||!t.properties)return c`
      <div class="callout danger">Unsupported schema. Use Raw.</div>
    `;const i=new Set(e.unsupportedPaths??[]),s=t.properties,o=e.searchQuery??"",a=e.activeSection,r=e.activeSubsection??null,l=Object.entries(s).toSorted((f,m)=>{var S,_;const b=((S=ve([f[0]],e.uiHints))==null?void 0:S.order)??50,k=((_=ve([m[0]],e.uiHints))==null?void 0:_.order)??50;return b!==k?b-k:f[0].localeCompare(m[0])}).filter(([f,m])=>!(a&&f!==a||o&&!cv(f,m,o)));let u=null;if(a&&r&&l.length===1){const f=(g=l[0])==null?void 0:g[1];f&&he(f)==="object"&&f.properties&&f.properties[r]&&(u={sectionKey:a,subsectionKey:r,schema:f.properties[r]})}return l.length===0?c`
      <div class="config-empty">
        <div class="config-empty__icon">${ie.search}</div>
        <div class="config-empty__text">
          ${o?`No settings match "${o}"`:"No settings in this section"}
        </div>
      </div>
    `:c`
    <div class="config-form config-form--modern">
      ${u?(()=>{const{sectionKey:f,subsectionKey:m,schema:b}=u,k=ve([f,m],e.uiHints),S=(k==null?void 0:k.label)??b.title??Ne(m),_=(k==null?void 0:k.help)??b.description??"",F=n[f],L=F&&typeof F=="object"?F[m]:void 0,R=`config-section-${f}-${m}`;return c`
              <section class="config-section-card" id=${R}>
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${Ba(f)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${S}</h3>
                    ${_?c`<p class="config-section-card__desc">${_}</p>`:y}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${ft({schema:b,value:L,path:[f,m],hints:e.uiHints,unsupported:i,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})():l.map(([f,m])=>{const b=so[f]??{label:f.charAt(0).toUpperCase()+f.slice(1),description:m.description??""};return c`
              <section class="config-section-card" id="config-section-${f}">
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${Ba(f)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${b.label}</h3>
                    ${b.description?c`<p class="config-section-card__desc">${b.description}</p>`:y}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${ft({schema:m,value:n[f],path:[f],hints:e.uiHints,unsupported:i,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})}
    </div>
  `}const uv=new Set(["title","description","default","nullable"]);function gv(e){return Object.keys(e??{}).filter(n=>!uv.has(n)).length===0}function Dl(e){const t=e.filter(s=>s!=null),n=t.length!==e.length,i=[];for(const s of t)i.some(o=>Object.is(o,s))||i.push(s);return{enumValues:i,nullable:n}}function fv(e){return!e||typeof e!="object"?{schema:null,unsupportedPaths:["<root>"]}:Yt(e,[])}function Yt(e,t){const n=new Set,i={...e},s=xs(t)||"<root>";if(e.anyOf||e.oneOf||e.allOf){const r=pv(e,t);return r||{schema:e,unsupportedPaths:[s]}}const o=Array.isArray(e.type)&&e.type.includes("null"),a=he(e)??(e.properties||e.additionalProperties?"object":void 0);if(i.type=a??e.type,i.nullable=o||e.nullable,i.enum){const{enumValues:r,nullable:d}=Dl(i.enum);i.enum=r,d&&(i.nullable=!0),r.length===0&&n.add(s)}if(a==="object"){const r=e.properties??{},d={};for(const[l,u]of Object.entries(r)){const g=Yt(u,[...t,l]);g.schema&&(d[l]=g.schema);for(const f of g.unsupportedPaths)n.add(f)}if(i.properties=d,e.additionalProperties===!0)n.add(s);else if(e.additionalProperties===!1)i.additionalProperties=!1;else if(e.additionalProperties&&typeof e.additionalProperties=="object"&&!gv(e.additionalProperties)){const l=Yt(e.additionalProperties,[...t,"*"]);i.additionalProperties=l.schema??e.additionalProperties,l.unsupportedPaths.length>0&&n.add(s)}}else if(a==="array"){const r=Array.isArray(e.items)?e.items[0]:e.items;if(!r)n.add(s);else{const d=Yt(r,[...t,"*"]);i.items=d.schema??r,d.unsupportedPaths.length>0&&n.add(s)}}else a!=="string"&&a!=="number"&&a!=="integer"&&a!=="boolean"&&!i.enum&&n.add(s);return{schema:i,unsupportedPaths:Array.from(n)}}function pv(e,t){if(e.allOf)return null;const n=e.anyOf??e.oneOf;if(!n)return null;const i=[],s=[];let o=!1;for(const r of n){if(!r||typeof r!="object")return null;if(Array.isArray(r.enum)){const{enumValues:d,nullable:l}=Dl(r.enum);i.push(...d),l&&(o=!0);continue}if("const"in r){if(r.const==null){o=!0;continue}i.push(r.const);continue}if(he(r)==="null"){o=!0;continue}s.push(r)}if(i.length>0&&s.length===0){const r=[];for(const d of i)r.some(l=>Object.is(l,d))||r.push(d);return{schema:{...e,enum:r,nullable:o,anyOf:void 0,oneOf:void 0,allOf:void 0},unsupportedPaths:[]}}if(s.length===1){const r=Yt(s[0],t);return r.schema&&(r.schema.nullable=o||r.schema.nullable),r}const a=new Set(["string","number","integer","boolean"]);return s.length>0&&i.length===0&&s.every(r=>r.type&&a.has(String(r.type)))?{schema:{...e,nullable:o},unsupportedPaths:[]}:null}const ms={all:c`
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
  `},Ua=[{key:"env",label:"Environment"},{key:"update",label:"Updates"},{key:"agents",label:"Agents"},{key:"auth",label:"Authentication"},{key:"channels",label:"Channels"},{key:"messages",label:"Messages"},{key:"commands",label:"Commands"},{key:"hooks",label:"Hooks"},{key:"skills",label:"Skills"},{key:"tools",label:"Tools"},{key:"gateway",label:"Gateway"},{key:"wizard",label:"Setup Wizard"}],za="__all__";function ja(e){return ms[e]??ms.default}function hv(e,t){const n=so[e];return n||{label:(t==null?void 0:t.title)??Ne(e),description:(t==null?void 0:t.description)??""}}function vv(e){const{key:t,schema:n,uiHints:i}=e;if(!n||he(n)!=="object"||!n.properties)return[];const s=Object.entries(n.properties).map(([o,a])=>{const r=ve([t,o],i),d=(r==null?void 0:r.label)??a.title??Ne(o),l=(r==null?void 0:r.help)??a.description??"",u=(r==null?void 0:r.order)??50;return{key:o,label:d,description:l,order:u}});return s.sort((o,a)=>o.order!==a.order?o.order-a.order:o.key.localeCompare(a.key)),s}function mv(e,t){if(!e||!t)return[];const n=[];function i(s,o,a){if(s===o)return;if(typeof s!=typeof o){n.push({path:a,from:s,to:o});return}if(typeof s!="object"||s===null||o===null){s!==o&&n.push({path:a,from:s,to:o});return}if(Array.isArray(s)&&Array.isArray(o)){JSON.stringify(s)!==JSON.stringify(o)&&n.push({path:a,from:s,to:o});return}const r=s,d=o,l=new Set([...Object.keys(r),...Object.keys(d)]);for(const u of l)i(r[u],d[u],a?`${a}.${u}`:u)}return i(e,t,""),n}function Ka(e,t=40){let n;try{n=JSON.stringify(e)??String(e)}catch{n=String(e)}return n.length<=t?n:n.slice(0,t-3)+"..."}function yv(e){var P,j,K;const t=e.valid==null?"unknown":e.valid?"valid":"invalid",n=fv(e.schema),i=n.schema?n.unsupportedPaths.length>0:!1,s=((P=n.schema)==null?void 0:P.properties)??{},o=Ua.filter(B=>B.key in s),a=new Set(Ua.map(B=>B.key)),r=Object.keys(s).filter(B=>!a.has(B)).map(B=>({key:B,label:B.charAt(0).toUpperCase()+B.slice(1)})),d=[...o,...r],l=e.activeSection&&n.schema&&he(n.schema)==="object"?(j=n.schema.properties)==null?void 0:j[e.activeSection]:void 0,u=e.activeSection?hv(e.activeSection,l):null,g=e.activeSection?vv({key:e.activeSection,schema:l,uiHints:e.uiHints}):[],f=e.formMode==="form"&&!!e.activeSection&&g.length>0,m=e.activeSubsection===za,b=e.searchQuery||m?null:e.activeSubsection??((K=g[0])==null?void 0:K.key)??null,k=e.formMode==="form"?mv(e.originalValue,e.formValue):[],S=e.formMode==="raw"&&e.raw!==e.originalRaw,_=e.formMode==="form"?k.length>0:S,F=!!e.formValue&&!e.loading&&!!n.schema,L=e.connected&&!e.saving&&_&&(e.formMode==="raw"?!0:F),R=e.connected&&!e.applying&&!e.updating&&_&&(e.formMode==="raw"?!0:F),x=e.connected&&!e.applying&&!e.updating;return c`
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
            @input=${B=>e.onSearchChange(B.target.value)}
          />
          ${e.searchQuery?c`
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
            <span class="config-nav__icon">${ms.all}</span>
            <span class="config-nav__label">All Settings</span>
          </button>
          ${d.map(B=>c`
              <button
                class="config-nav__item ${e.activeSection===B.key?"active":""}"
                @click=${()=>e.onSectionChange(B.key)}
              >
                <span class="config-nav__icon"
                  >${ja(B.key)}</span
                >
                <span class="config-nav__label">${B.label}</span>
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
            ${_?c`
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
        ${_&&e.formMode==="form"?c`
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
                  ${k.map(B=>c`
                      <div class="config-diff__item">
                        <div class="config-diff__path">${B.path}</div>
                        <div class="config-diff__values">
                          <span class="config-diff__from"
                            >${Ka(B.from)}</span
                          >
                          <span class="config-diff__arrow">→</span>
                          <span class="config-diff__to"
                            >${Ka(B.to)}</span
                          >
                        </div>
                      </div>
                    `)}
                </div>
              </details>
            `:y}
        ${u&&e.formMode==="form"?c`
              <div class="config-section-hero">
                <div class="config-section-hero__icon">
                  ${ja(e.activeSection??"")}
                </div>
                <div class="config-section-hero__text">
                  <div class="config-section-hero__title">
                    ${u.label}
                  </div>
                  ${u.description?c`<div class="config-section-hero__desc">
                        ${u.description}
                      </div>`:y}
                </div>
              </div>
            `:y}
        ${f?c`
              <div class="config-subnav">
                <button
                  class="config-subnav__item ${b===null?"active":""}"
                  @click=${()=>e.onSubsectionChange(za)}
                >
                  All
                </button>
                ${g.map(B=>c`
                    <button
                      class="config-subnav__item ${b===B.key?"active":""}"
                      title=${B.description||B.label}
                      @click=${()=>e.onSubsectionChange(B.key)}
                    >
                      ${B.label}
                    </button>
                  `)}
              </div>
            `:y}

        <!-- Form content -->
        <div class="config-content">
          ${e.formMode==="form"?c`
                ${e.schemaLoading?c`
                        <div class="config-loading">
                          <div class="config-loading__spinner"></div>
                          <span>Loading schema…</span>
                        </div>
                      `:dv({schema:n.schema,uiHints:e.uiHints,value:e.formValue,disabled:e.loading||!e.formValue,unsupportedPaths:n.unsupportedPaths,onPatch:e.onFormPatch,searchQuery:e.searchQuery,activeSection:e.activeSection,activeSubsection:b})}
                ${i?c`
                        <div class="callout danger" style="margin-top: 12px">
                          Form view can't safely edit some fields. Use Raw to avoid losing config entries.
                        </div>
                      `:y}
              `:c`
                <label class="field config-raw-field">
                  <span>Raw JSON5</span>
                  <textarea
                    .value=${e.raw}
                    @input=${B=>e.onRawChange(B.target.value)}
                  ></textarea>
                </label>
              `}
        </div>

        ${e.issues.length>0?c`<div class="callout danger" style="margin-top: 12px;">
              <pre class="code-block">
${JSON.stringify(e.issues,null,2)}</pre
              >
            </div>`:y}
      </main>
    </div>
  `}function bv(e){var s;const t=["last",...e.channels.filter(Boolean)],n=(s=e.form.deliveryChannel)==null?void 0:s.trim();n&&!t.includes(n)&&t.push(n);const i=new Set;return t.filter(o=>i.has(o)?!1:(i.add(o),!0))}function wv(e,t){var i,s;if(t==="last")return"last";const n=(i=e.channelMeta)==null?void 0:i.find(o=>o.id===t);return n!=null&&n.label?n.label:((s=e.channelLabels)==null?void 0:s[t])??t}function $v(e){var r,d;const t=bv(e),n=e.runsJobId==null?void 0:e.jobs.find(l=>l.id===e.runsJobId),i=(n==null?void 0:n.name)??e.runsJobId??"(select a job)",s=e.runs.toSorted((l,u)=>u.ts-l.ts),o=e.form.sessionTarget==="isolated"&&e.form.payloadKind==="agentTurn",a=e.form.deliveryMode==="announce"&&!o?"none":e.form.deliveryMode;return c`
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
            <div class="stat-value">${Gs(((d=e.status)==null?void 0:d.nextWakeAtMs)??null)}</div>
          </div>
        </div>
        <div class="row" style="margin-top: 12px;">
          <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"Refreshing…":"Refresh"}
          </button>
          ${e.error?c`<span class="muted">${e.error}</span>`:y}
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
              @input=${l=>e.onFormChange({name:l.target.value})}
            />
          </label>
          <label class="field">
            <span>Description</span>
            <input
              .value=${e.form.description}
              @input=${l=>e.onFormChange({description:l.target.value})}
            />
          </label>
          <label class="field">
            <span>Agent ID</span>
            <input
              .value=${e.form.agentId}
              @input=${l=>e.onFormChange({agentId:l.target.value})}
              placeholder="default"
            />
          </label>
          <label class="field checkbox">
            <span>Enabled</span>
            <input
              type="checkbox"
              .checked=${e.form.enabled}
              @change=${l=>e.onFormChange({enabled:l.target.checked})}
            />
          </label>
          <label class="field">
            <span>Schedule</span>
            <select
              .value=${e.form.scheduleKind}
              @change=${l=>e.onFormChange({scheduleKind:l.target.value})}
            >
              <option value="every">Every</option>
              <option value="at">At</option>
              <option value="cron">Cron</option>
            </select>
          </label>
        </div>
        ${kv(e)}
        <div class="form-grid" style="margin-top: 12px;">
          <label class="field">
            <span>Session</span>
            <select
              .value=${e.form.sessionTarget}
              @change=${l=>e.onFormChange({sessionTarget:l.target.value})}
            >
              <option value="main">Main</option>
              <option value="isolated">Isolated</option>
            </select>
          </label>
          <label class="field">
            <span>Wake mode</span>
            <select
              .value=${e.form.wakeMode}
              @change=${l=>e.onFormChange({wakeMode:l.target.value})}
            >
              <option value="now">Now</option>
              <option value="next-heartbeat">Next heartbeat</option>
            </select>
          </label>
          <label class="field">
            <span>Payload</span>
            <select
              .value=${e.form.payloadKind}
              @change=${l=>e.onFormChange({payloadKind:l.target.value})}
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
            @input=${l=>e.onFormChange({payloadText:l.target.value})}
            rows="4"
          ></textarea>
        </label>
        <div class="form-grid" style="margin-top: 12px;">
          <label class="field">
            <span>Delivery</span>
            <select
              .value=${a}
              @change=${l=>e.onFormChange({deliveryMode:l.target.value})}
            >
              ${o?c`
                      <option value="announce">Announce summary (default)</option>
                    `:y}
              <option value="webhook">Webhook POST</option>
              <option value="none">None (internal)</option>
            </select>
          </label>
          ${e.form.payloadKind==="agentTurn"?c`
                  <label class="field">
                    <span>Timeout (seconds)</span>
                    <input
                      .value=${e.form.timeoutSeconds}
                      @input=${l=>e.onFormChange({timeoutSeconds:l.target.value})}
                    />
                  </label>
                `:y}
          ${a!=="none"?c`
                  <label class="field">
                    <span>${a==="webhook"?"Webhook URL":"Channel"}</span>
                    ${a==="webhook"?c`
                            <input
                              .value=${e.form.deliveryTo}
                              @input=${l=>e.onFormChange({deliveryTo:l.target.value})}
                              placeholder="https://example.invalid/cron"
                            />
                          `:c`
                            <select
                              .value=${e.form.deliveryChannel||"last"}
                              @change=${l=>e.onFormChange({deliveryChannel:l.target.value})}
                            >
                              ${t.map(l=>c`<option value=${l}>
                                    ${wv(e,l)}
                                  </option>`)}
                            </select>
                          `}
                  </label>
                  ${a==="announce"?c`
                          <label class="field">
                            <span>To</span>
                            <input
                              .value=${e.form.deliveryTo}
                              @input=${l=>e.onFormChange({deliveryTo:l.target.value})}
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
      ${e.jobs.length===0?c`
              <div class="muted" style="margin-top: 12px">No jobs yet.</div>
            `:c`
            <div class="list" style="margin-top: 12px;">
              ${e.jobs.map(l=>xv(l,e))}
            </div>
          `}
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">Run history</div>
      <div class="card-sub">Latest runs for ${i}.</div>
      ${e.runsJobId==null?c`
              <div class="muted" style="margin-top: 12px">Select a job to inspect run history.</div>
            `:s.length===0?c`
                <div class="muted" style="margin-top: 12px">No runs yet.</div>
              `:c`
              <div class="list" style="margin-top: 12px;">
                ${s.map(l=>_v(l,e.basePath))}
              </div>
            `}
    </section>
  `}function kv(e){const t=e.form;return t.scheduleKind==="at"?c`
      <label class="field" style="margin-top: 12px;">
        <span>Run at</span>
        <input
          type="datetime-local"
          .value=${t.scheduleAt}
          @input=${n=>e.onFormChange({scheduleAt:n.target.value})}
        />
      </label>
    `:t.scheduleKind==="every"?c`
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
    `:c`
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
  `}function xv(e,t){const i=`list-item list-item-clickable cron-job${t.runsJobId===e.id?" list-item-selected":""}`;return c`
    <div class=${i} @click=${()=>t.onLoadRuns(e.id)}>
      <div class="list-main">
        <div class="list-title">${e.name}</div>
        <div class="list-sub">${sl(e)}</div>
        ${Sv(e)}
        ${e.agentId?c`<div class="muted cron-job-agent">Agent: ${e.agentId}</div>`:y}
      </div>
      <div class="list-meta">
        ${Av(e)}
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
  `}function Sv(e){if(e.payload.kind==="systemEvent")return c`<div class="cron-job-detail">
      <span class="cron-job-detail-label">System</span>
      <span class="muted cron-job-detail-value">${e.payload.text}</span>
    </div>`;const t=e.delivery,n=(t==null?void 0:t.mode)==="webhook"?t.to?` (${t.to})`:"":t!=null&&t.channel||t!=null&&t.to?` (${t.channel??"last"}${t.to?` -> ${t.to}`:""})`:"";return c`
    <div class="cron-job-detail">
      <span class="cron-job-detail-label">Prompt</span>
      <span class="muted cron-job-detail-value">${e.payload.message}</span>
    </div>
    ${t?c`<div class="cron-job-detail">
            <span class="cron-job-detail-label">Delivery</span>
            <span class="muted cron-job-detail-value">${t.mode}${n}</span>
          </div>`:y}
  `}function Ha(e){return typeof e!="number"||!Number.isFinite(e)?"n/a":Be(e)}function Av(e){var o,a,r;const t=((o=e.state)==null?void 0:o.lastStatus)??"n/a",n=t==="ok"?"cron-job-status-ok":t==="error"?"cron-job-status-error":t==="skipped"?"cron-job-status-skipped":"cron-job-status-na",i=(a=e.state)==null?void 0:a.nextRunAtMs,s=(r=e.state)==null?void 0:r.lastRunAtMs;return c`
    <div class="cron-job-state">
      <div class="cron-job-state-row">
        <span class="cron-job-state-key">Status</span>
        <span class=${`cron-job-status-pill ${n}`}>${t}</span>
      </div>
      <div class="cron-job-state-row">
        <span class="cron-job-state-key">Next</span>
        <span class="cron-job-state-value" title=${lt(i)}>
          ${Ha(i)}
        </span>
      </div>
      <div class="cron-job-state-row">
        <span class="cron-job-state-key">Last</span>
        <span class="cron-job-state-value" title=${lt(s)}>
          ${Ha(s)}
        </span>
      </div>
    </div>
  `}function _v(e,t){const n=typeof e.sessionKey=="string"&&e.sessionKey.trim().length>0?`${ti("chat",t)}?session=${encodeURIComponent(e.sessionKey)}`:null;return c`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.status}</div>
        <div class="list-sub">${e.summary??""}</div>
      </div>
      <div class="list-meta">
        <div>${lt(e.ts)}</div>
        <div class="muted">${e.durationMs??0}ms</div>
        ${n?c`<div><a class="session-link" href=${n}>Open run chat</a></div>`:y}
        ${e.error?c`<div class="muted">${e.error}</div>`:y}
      </div>
    </div>
  `}function Cv(e){const t=e.status&&typeof e.status=="object"?e.status.securityAudit:null,n=(t==null?void 0:t.summary)??null,i=(n==null?void 0:n.critical)??0,s=(n==null?void 0:n.warn)??0,o=(n==null?void 0:n.info)??0,a=i>0?"danger":s>0?"warn":"success",r=i>0?`${i} critical`:s>0?`${s} warnings`:"No critical issues";return c`
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
            ${n?c`<div class="callout ${a}" style="margin-top: 8px;">
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
        ${e.callError?c`<div class="callout danger" style="margin-top: 12px;">
              ${e.callError}
            </div>`:y}
        ${e.callResult?c`<pre class="code-block" style="margin-top: 12px;">${e.callResult}</pre>`:y}
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
              ${e.eventLog.map(d=>c`
                  <div class="list-item">
                    <div class="list-main">
                      <div class="list-title">${d.event}</div>
                      <div class="list-sub">${new Date(d.ts).toLocaleTimeString()}</div>
                    </div>
                    <div class="list-meta">
                      <pre class="code-block">${lf(d.payload)}</pre>
                    </div>
                  </div>
                `)}
            </div>
          `}
    </section>
  `}function Tv(e){const t=Math.max(0,e),n=Math.floor(t/1e3);if(n<60)return`${n}s`;const i=Math.floor(n/60);return i<60?`${i}m`:`${Math.floor(i/60)}h`}function et(e,t){return t?c`<div class="exec-approval-meta-row"><span>${e}</span><span>${t}</span></div>`:y}function Ev(e){const t=e.execApprovalQueue[0];if(!t)return y;const n=t.request,i=t.expiresAtMs-Date.now(),s=i>0?`expires in ${Tv(i)}`:"expired",o=e.execApprovalQueue.length;return c`
    <div class="exec-approval-overlay" role="dialog" aria-live="polite">
      <div class="exec-approval-card">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">Exec approval needed</div>
            <div class="exec-approval-sub">${s}</div>
          </div>
          ${o>1?c`<div class="exec-approval-queue">${o} pending</div>`:y}
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
        ${e.execApprovalError?c`<div class="exec-approval-error">${e.execApprovalError}</div>`:y}
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
  `}function Lv(e){const{pendingGatewayUrl:t}=e;return t?c`
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
  `:y}const qa=["trace","debug","info","warn","error","fatal"];function Rv(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleTimeString()}function Iv(e,t){return t?[e.message,e.subsystem,e.raw].filter(Boolean).join(" ").toLowerCase().includes(t):!0}function Mv(e){const t=e.filterText.trim().toLowerCase(),n=qa.some(o=>!e.levelFilters[o]),i=e.entries.filter(o=>o.level&&!e.levelFilters[o.level]?!1:Iv(o,t)),s=t||n?"filtered":"visible";return c`
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
        ${qa.map(o=>c`
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

      ${e.file?c`<div class="muted" style="margin-top: 10px;">File: ${e.file}</div>`:y}
      ${e.truncated?c`
              <div class="callout" style="margin-top: 10px">Log output truncated; showing latest chunk.</div>
            `:y}
      ${e.error?c`<div class="callout danger" style="margin-top: 10px;">${e.error}</div>`:y}

      <div class="log-stream" style="margin-top: 12px;" @scroll=${e.onScroll}>
        ${i.length===0?c`
                <div class="muted" style="padding: 12px">No log entries.</div>
              `:i.map(o=>c`
                <div class="log-row">
                  <div class="log-time mono">${Rv(o.time)}</div>
                  <div class="log-level ${o.level??""}">${o.level??""}</div>
                  <div class="log-subsystem mono">${o.subsystem??""}</div>
                  <div class="log-message mono">${o.message??o.raw}</div>
                </div>
              `)}
      </div>
    </section>
  `}function Fv(e){return c`
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
      ${e.db==="sqlite"?c`<div class="callout" style="margin-top: 12px; background: var(--bg-muted, #f5f5f5); color: var(--text-muted, #666);">当前使用本地数据库</div>`:y}
      ${e.error?c`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:y}
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        ${e.stats?Pv(e.stats):e.loading?y:c`<div class="muted">暂无统计</div>`}
      </div>
      <div style="margin-top: 24px;">
        <div class="row" style="justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="card-title" style="font-size: 1rem;">无货产品列表</div>
          ${e.onOpenAddForm&&!e.showAddForm?c`<button class="btn btn--primary" ?disabled=${e.loading} @click=${e.onOpenAddForm}>手动新增</button>`:y}
        </div>
        ${e.showAddForm&&e.onAdd&&e.onCloseAddForm?c`
              <div class="callout" style="margin-bottom: 12px; padding: 12px;">
                <div style="font-weight: 600; margin-bottom: 8px;">新增无货记录</div>
                <form @submit=${async t=>{var o,a,r,d,l,u,g;t.preventDefault();const n=t.target,i=((a=(o=n.querySelector('[name="oos_add_name"]'))==null?void 0:o.value)==null?void 0:a.trim())??"";if(!i)return;await e.onAdd({product_name:i,specification:((d=(r=n.querySelector('[name="oos_add_spec"]'))==null?void 0:r.value)==null?void 0:d.trim())??"",quantity:parseFloat(((l=n.querySelector('[name="oos_add_qty"]'))==null?void 0:l.value)??"0")||0,unit:((g=(u=n.querySelector('[name="oos_add_unit"]'))==null?void 0:u.value)==null?void 0:g.trim())??""})&&e.onCloseAddForm()}}>
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
          ${e.list.length===0?c`<div class="muted">暂无无货产品记录。</div>`:e.list.slice(0,50).map(t=>Dv(t,e.onDelete))}
        </div>
        ${e.list.length>50?c`<div class="muted" style="margin-top: 8px;">共 ${e.list.length} 个无货产品，仅展示前 50 个</div>`:y}
      </div>
      <div class="row" style="margin-top: 24px; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">按文件</div>
          <div class="list" style="margin-top: 8px;">
            ${e.byFile.length===0?c`<div class="muted">暂无</div>`:e.byFile.slice(0,10).map(t=>Ov(t))}
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">按时间（最近 30 天）</div>
          <div class="list" style="margin-top: 8px;">
            ${e.byTime.length===0?c`<div class="muted">暂无</div>`:e.byTime.slice(0,10).map(t=>Nv(t))}
          </div>
        </div>
      </div>
    </section>
  `}function Pv(e){return[{label:"总记录数",value:e.total_records},{label:"无货产品数",value:e.out_of_stock_count},{label:"今日新增",value:e.today_count},{label:"被报无货≥2 次",value:e.notified_count},{label:"已发邮件产品数",value:e.email_sent_product_count}].map(n=>c`
      <div class="card stat-card" style="min-width: 100px;">
        <div class="stat-value">${n.value}</div>
        <div class="stat-label">${n.label}</div>
      </div>
    `)}function Dv(e,t){const n=e.product_name??"",i=e.specification??"",s=e.unit??"",o=e.quantity??"",a=e.count??1,d=(e.email_sent_count??0)>0||e.email_status==="sent"?"已发送":"未发",l=e.product_key??"";return c`
    <div class="list-item" style="display: flex; justify-content: space-between; align-items: center;">
      <div class="list-main">
        <div class="list-title">${n} ${i}</div>
        <div class="list-sub">数量: ${String(o)} ${s} · 被报无货 ${a} 次 · 邮件: ${d}</div>
      </div>
      ${t&&l?c`<button class="btn" style="flex-shrink: 0;" title="删除该无货产品" @click=${()=>t(l)}>删除</button>`:y}
    </div>
  `}function Ov(e){const t=e.file_name??"",n=e.total_records??0,i=e.uploaded_at?String(e.uploaded_at).length>19?String(e.uploaded_at).slice(0,10)+" "+String(e.uploaded_at).slice(11,19):String(e.uploaded_at):"";return c`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${t}</div>
        <div class="list-sub">记录数: ${n}${i?` · ${i}`:""}</div>
      </div>
    </div>
  `}function Nv(e){return c`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.date??""}</div>
        <div class="list-sub">新增: ${e.count??0}</div>
      </div>
    </div>
  `}function Bv(e){return c`
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
      ${e.db==="sqlite"?c`<div class="callout" style="margin-top: 12px; background: var(--bg-muted, #f5f5f5); color: var(--text-muted, #666);">当前使用本地数据库</div>`:y}
      ${e.error?c`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:y}
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        ${e.stats?Uv(e.stats):e.loading?y:c`<div class="muted">暂无统计</div>`}
      </div>
      <div style="margin-top: 24px;">
        <div class="row" style="justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="card-title" style="font-size: 1rem;">缺货产品列表</div>
          ${e.onOpenAddForm&&!e.showAddForm?c`<button class="btn btn--primary" ?disabled=${e.loading} @click=${e.onOpenAddForm}>手动新增</button>`:y}
        </div>
        ${e.showAddForm&&e.onAdd&&e.onCloseAddForm?c`
              <div class="callout" style="margin-bottom: 12px; padding: 12px;">
                <div style="font-weight: 600; margin-bottom: 8px;">新增缺货记录（产品名字、规格、需求、供给；差异自动计算）</div>
                <form @submit=${async t=>{var r,d,l,u,g,f;t.preventDefault();const n=t.target,i=((d=(r=n.querySelector('[name="shortage_add_name"]'))==null?void 0:r.value)==null?void 0:d.trim())??"";if(!i)return;const s=parseFloat(((l=n.querySelector('[name="shortage_add_qty"]'))==null?void 0:l.value)??"0")||0,o=parseFloat(((u=n.querySelector('[name="shortage_add_avail"]'))==null?void 0:u.value)??"0")||0;await e.onAdd({product_name:i,specification:((f=(g=n.querySelector('[name="shortage_add_spec"]'))==null?void 0:g.value)==null?void 0:f.trim())??"",quantity:s,available_qty:o})&&e.onCloseAddForm()}}>
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
          ${e.list.length===0?c`<div class="muted">暂无缺货产品记录。</div>`:e.list.slice(0,50).map(t=>zv(t,e.onDelete))}
        </div>
        ${e.list.length>50?c`<div class="muted" style="margin-top: 8px;">共 ${e.list.length} 个缺货产品，仅展示前 50 个</div>`:y}
      </div>
      <div class="row" style="margin-top: 24px; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">按文件</div>
          <div class="list" style="margin-top: 8px;">
            ${e.byFile.length===0?c`<div class="muted">暂无</div>`:e.byFile.slice(0,10).map(t=>jv(t))}
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">按时间（最近 30 天）</div>
          <div class="list" style="margin-top: 8px;">
            ${e.byTime.length===0?c`<div class="muted">暂无</div>`:e.byTime.slice(0,10).map(t=>Kv(t))}
          </div>
        </div>
      </div>
    </section>
  `}function Uv(e){return[{label:"总记录数",value:e.total_records},{label:"缺货产品数",value:e.shortage_product_count},{label:"今日新增",value:e.today_count},{label:"被报缺货≥2 次",value:e.reported_ge2_count}].map(n=>c`
      <div class="card stat-card" style="min-width: 100px;">
        <div class="stat-value">${n.value}</div>
        <div class="stat-label">${n.label}</div>
      </div>
    `)}function zv(e,t){const n=e.product_name??"",i=e.specification??"",s=e.quantity??0,o=e.available_qty??0,a=e.shortfall??0,r=e.count??1,d=e.product_key??"";return c`
    <div class="list-item" style="display: flex; justify-content: space-between; align-items: center;">
      <div class="list-main">
        <div class="list-title">${n} ${i?` · ${i}`:""}</div>
        <div class="list-sub">需求: ${s} · 供给: ${o} · 差异: ${a} · 被报缺货 ${r} 次</div>
      </div>
      ${t&&d?c`<button class="btn" style="flex-shrink: 0;" title="删除该缺货产品" @click=${()=>t(d)}>删除</button>`:y}
    </div>
  `}function jv(e){const t=e.file_name??"",n=e.total_records??0,i=e.uploaded_at?String(e.uploaded_at).length>19?String(e.uploaded_at).slice(0,10)+" "+String(e.uploaded_at).slice(11,19):String(e.uploaded_at):"";return c`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${t}</div>
        <div class="list-sub">记录数: ${n}${i?` · ${i}`:""}</div>
      </div>
    </div>
  `}function Kv(e){return c`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.date??""}</div>
        <div class="list-sub">新增: ${e.count??0}</div>
      </div>
    </div>
  `}const qe="__defaults__",Ga=[{value:"deny",label:"Deny"},{value:"allowlist",label:"Allowlist"},{value:"full",label:"Full"}],Hv=[{value:"off",label:"Off"},{value:"on-miss",label:"On miss"},{value:"always",label:"Always"}];function Wa(e){return e==="allowlist"||e==="full"||e==="deny"?e:"deny"}function qv(e){return e==="always"||e==="off"||e==="on-miss"?e:"on-miss"}function Gv(e){const t=(e==null?void 0:e.defaults)??{};return{security:Wa(t.security),ask:qv(t.ask),askFallback:Wa(t.askFallback??"deny"),autoAllowSkills:!!(t.autoAllowSkills??!1)}}function Wv(e){const t=(e==null?void 0:e.agents)??{},n=Array.isArray(t.list)?t.list:[],i=[];return n.forEach(s=>{if(!s||typeof s!="object")return;const o=s,a=typeof o.id=="string"?o.id.trim():"";if(!a)return;const r=typeof o.name=="string"?o.name.trim():void 0,d=o.default===!0;i.push({id:a,name:r||void 0,isDefault:d})}),i}function Vv(e,t){const n=Wv(e),i=Object.keys((t==null?void 0:t.agents)??{}),s=new Map;n.forEach(a=>s.set(a.id,a)),i.forEach(a=>{s.has(a)||s.set(a,{id:a})});const o=Array.from(s.values());return o.length===0&&o.push({id:"main",isDefault:!0}),o.sort((a,r)=>{var u,g;if(a.isDefault&&!r.isDefault)return-1;if(!a.isDefault&&r.isDefault)return 1;const d=(u=a.name)!=null&&u.trim()?a.name:a.id,l=(g=r.name)!=null&&g.trim()?r.name:r.id;return d.localeCompare(l)}),o}function Qv(e,t){return e===qe?qe:e&&t.some(n=>n.id===e)?e:qe}function Jv(e){var g;const t=e.execApprovalsForm??((g=e.execApprovalsSnapshot)==null?void 0:g.file)??null,n=!!t,i=Gv(t),s=Vv(e.configForm,t),o=im(e.nodes),a=e.execApprovalsTarget;let r=a==="node"&&e.execApprovalsTargetNodeId?e.execApprovalsTargetNodeId:null;a==="node"&&r&&!o.some(f=>f.id===r)&&(r=null);const d=Qv(e.execApprovalsSelectedAgent,s),l=d!==qe?((t==null?void 0:t.agents)??{})[d]??null:null,u=Array.isArray(l==null?void 0:l.allowlist)?l.allowlist??[]:[];return{ready:n,disabled:e.execApprovalsSaving||e.execApprovalsLoading,dirty:e.execApprovalsDirty,loading:e.execApprovalsLoading,saving:e.execApprovalsSaving,form:t,defaults:i,selectedScope:d,selectedAgent:l,agents:s,allowlist:u,target:a,targetNodeId:r,targetNodes:o,onSelectScope:e.onExecApprovalsSelectAgent,onSelectTarget:e.onExecApprovalsTargetChange,onPatch:e.onExecApprovalsPatch,onRemove:e.onExecApprovalsRemove,onLoad:e.onLoadExecApprovals,onSave:e.onSaveExecApprovals}}function Yv(e){const t=e.ready,n=e.target!=="node"||!!e.targetNodeId;return c`
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

      ${Xv(e)}

      ${t?c`
            ${Zv(e)}
            ${em(e)}
            ${e.selectedScope===qe?y:tm(e)}
          `:c`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load exec approvals to edit allowlists.</div>
            <button class="btn" ?disabled=${e.loading||!n} @click=${e.onLoad}>
              ${e.loading?"Loading…":"Load approvals"}
            </button>
          </div>`}
    </section>
  `}function Xv(e){const t=e.targetNodes.length>0,n=e.targetNodeId??"";return c`
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
              `:y}
        </div>
      </div>
      ${e.target==="node"&&!t?c`
              <div class="muted">No nodes advertise exec approvals yet.</div>
            `:y}
    </div>
  `}function Zv(e){return c`
    <div class="row" style="margin-top: 12px; gap: 8px; flex-wrap: wrap;">
      <span class="label">Scope</span>
      <div class="row" style="gap: 8px; flex-wrap: wrap;">
        <button
          class="btn btn--sm ${e.selectedScope===qe?"active":""}"
          @click=${()=>e.onSelectScope(qe)}
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
  `}function em(e){const t=e.selectedScope===qe,n=e.defaults,i=e.selectedAgent??{},s=t?["defaults"]:["agents",e.selectedScope],o=typeof i.security=="string"?i.security:void 0,a=typeof i.ask=="string"?i.ask:void 0,r=typeof i.askFallback=="string"?i.askFallback:void 0,d=t?n.security:o??"__default__",l=t?n.ask:a??"__default__",u=t?n.askFallback:r??"__default__",g=typeof i.autoAllowSkills=="boolean"?i.autoAllowSkills:void 0,f=g??n.autoAllowSkills,m=g==null;return c`
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
              ${t?y:c`<option value="__default__" ?selected=${d==="__default__"}>
                    Use default (${n.security})
                  </option>`}
              ${Ga.map(b=>c`<option
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
              ${t?y:c`<option value="__default__" ?selected=${l==="__default__"}>
                    Use default (${n.ask})
                  </option>`}
              ${Hv.map(b=>c`<option
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
              ${t?y:c`<option value="__default__" ?selected=${u==="__default__"}>
                    Use default (${n.askFallback})
                  </option>`}
              ${Ga.map(b=>c`<option
                    value=${b.value}
                    ?selected=${u===b.value}
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
              @change=${b=>{const k=b.target;e.onPatch([...s,"autoAllowSkills"],k.checked)}}
            />
          </label>
          ${!t&&!m?c`<button
                class="btn btn--sm"
                ?disabled=${e.disabled}
                @click=${()=>e.onRemove([...s,"autoAllowSkills"])}
              >
                Use default
              </button>`:y}
        </div>
      </div>
    </div>
  `}function tm(e){const t=["agents",e.selectedScope,"allowlist"],n=e.allowlist;return c`
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
            `:n.map((i,s)=>nm(e,i,s))}
    </div>
  `}function nm(e,t,n){var a;const i=t.lastUsedAt?Be(t.lastUsedAt):"never",s=t.lastUsedCommand?Qi(t.lastUsedCommand,120):null,o=t.lastResolvedPath?Qi(t.lastResolvedPath,120):null;return c`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${(a=t.pattern)!=null&&a.trim()?t.pattern:"New pattern"}</div>
        <div class="list-sub">Last used: ${i}</div>
        ${s?c`<div class="list-sub mono">${s}</div>`:y}
        ${o?c`<div class="list-sub mono">${o}</div>`:y}
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
  `}function im(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(r=>String(r)==="system.execApprovals.get"||String(r)==="system.execApprovals.set"))continue;const o=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!o)continue;const a=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():o;t.push({id:o,label:a===o?o:`${a} · ${o}`})}return t.sort((n,i)=>n.label.localeCompare(i.label)),t}function sm(e){const t=cm(e),n=Jv(e);return c`
    ${Yv(n)}
    ${dm(t)}
    ${om(e)}
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
              `:e.nodes.map(i=>pm(i))}
      </div>
    </section>
  `}function om(e){const t=e.devicesList??{pending:[],paired:[]},n=Array.isArray(t.pending)?t.pending:[],i=Array.isArray(t.paired)?t.paired:[];return c`
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
      ${e.devicesError?c`<div class="callout danger" style="margin-top: 12px;">${e.devicesError}</div>`:y}
      <div class="list" style="margin-top: 16px;">
        ${n.length>0?c`
              <div class="muted" style="margin-bottom: 8px;">Pending</div>
              ${n.map(s=>am(s,e))}
            `:y}
        ${i.length>0?c`
              <div class="muted" style="margin-top: 12px; margin-bottom: 8px;">Paired</div>
              ${i.map(s=>rm(s,e))}
            `:y}
        ${n.length===0&&i.length===0?c`
                <div class="muted">No paired devices.</div>
              `:y}
      </div>
    </section>
  `}function am(e,t){var r,d;const n=((r=e.displayName)==null?void 0:r.trim())||e.deviceId,i=typeof e.ts=="number"?Be(e.ts):"n/a",s=(d=e.role)!=null&&d.trim()?`role: ${e.role}`:"role: -",o=e.isRepair?" · repair":"",a=e.remoteIp?` · ${e.remoteIp}`:"";return c`
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
  `}function rm(e,t){var r;const n=((r=e.displayName)==null?void 0:r.trim())||e.deviceId,i=e.remoteIp?` · ${e.remoteIp}`:"",s=`roles: ${Vi(e.roles)}`,o=`scopes: ${Vi(e.scopes)}`,a=Array.isArray(e.tokens)?e.tokens:[];return c`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${n}</div>
        <div class="list-sub">${e.deviceId}${i}</div>
        <div class="muted" style="margin-top: 6px;">${s} · ${o}</div>
        ${a.length===0?c`
                <div class="muted" style="margin-top: 6px">Tokens: none</div>
              `:c`
              <div class="muted" style="margin-top: 10px;">Tokens</div>
              <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 6px;">
                ${a.map(d=>lm(e.deviceId,d,t))}
              </div>
            `}
      </div>
    </div>
  `}function lm(e,t,n){const i=t.revokedAtMs?"revoked":"active",s=`scopes: ${Vi(t.scopes)}`,o=Be(t.rotatedAtMs??t.createdAtMs??t.lastUsedAtMs??null);return c`
    <div class="row" style="justify-content: space-between; gap: 8px;">
      <div class="list-sub">${t.role} · ${i} · ${s} · ${o}</div>
      <div class="row" style="justify-content: flex-end; gap: 6px; flex-wrap: wrap;">
        <button
          class="btn btn--sm"
          @click=${()=>n.onDeviceRotate(e,t.role,t.scopes)}
        >
          Rotate
        </button>
        ${t.revokedAtMs?y:c`
              <button
                class="btn btn--sm danger"
                @click=${()=>n.onDeviceRevoke(e,t.role)}
              >
                Revoke
              </button>
            `}
      </div>
    </div>
  `}function cm(e){const t=e.configForm,n=gm(e.nodes),{defaultBinding:i,agents:s}=fm(t),o=!!t,a=e.configSaving||e.configFormMode==="raw";return{ready:o,disabled:a,configDirty:e.configDirty,configLoading:e.configLoading,configSaving:e.configSaving,defaultBinding:i,agents:s,nodes:n,onBindDefault:e.onBindDefault,onBindAgent:e.onBindAgent,onSave:e.onSaveBindings,onLoadConfig:e.onLoadConfig,formMode:e.configFormMode}}function dm(e){const t=e.nodes.length>0,n=e.defaultBinding??"";return c`
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
            `:y}

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
                  ${t?y:c`
                          <div class="muted">No nodes with system.run available.</div>
                        `}
                </div>
              </div>

              ${e.agents.length===0?c`
                      <div class="muted">No agents found.</div>
                    `:e.agents.map(i=>um(i,e))}
            </div>
          `:c`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load config to edit bindings.</div>
            <button class="btn" ?disabled=${e.configLoading} @click=${e.onLoadConfig}>
              ${e.configLoading?"Loading…":"Load config"}
            </button>
          </div>`}
    </section>
  `}function um(e,t){var o;const n=e.binding??"__default__",i=(o=e.name)!=null&&o.trim()?`${e.name} (${e.id})`:e.id,s=t.nodes.length>0;return c`
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
            ${t.nodes.map(a=>c`<option
                  value=${a.id}
                  ?selected=${n===a.id}
                >
                  ${a.label}
                </option>`)}
          </select>
        </label>
      </div>
    </div>
  `}function gm(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(r=>String(r)==="system.run"))continue;const o=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!o)continue;const a=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():o;t.push({id:o,label:a===o?o:`${a} · ${o}`})}return t.sort((n,i)=>n.label.localeCompare(i.label)),t}function fm(e){const t={id:"main",name:void 0,index:0,isDefault:!0,binding:null};if(!e||typeof e!="object")return{defaultBinding:null,agents:[t]};const i=(e.tools??{}).exec??{},s=typeof i.node=="string"&&i.node.trim()?i.node.trim():null,o=e.agents??{},a=Array.isArray(o.list)?o.list:[];if(a.length===0)return{defaultBinding:s,agents:[t]};const r=[];return a.forEach((d,l)=>{if(!d||typeof d!="object")return;const u=d,g=typeof u.id=="string"?u.id.trim():"";if(!g)return;const f=typeof u.name=="string"?u.name.trim():void 0,m=u.default===!0,k=(u.tools??{}).exec??{},S=typeof k.node=="string"&&k.node.trim()?k.node.trim():null;r.push({id:g,name:f||void 0,index:l,isDefault:m,binding:S})}),r.length===0&&r.push(t),{defaultBinding:s,agents:r}}function pm(e){const t=!!e.connected,n=!!e.paired,i=typeof e.displayName=="string"&&e.displayName.trim()||(typeof e.nodeId=="string"?e.nodeId:"unknown"),s=Array.isArray(e.caps)?e.caps:[],o=Array.isArray(e.commands)?e.commands:[];return c`
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
          ${s.slice(0,12).map(a=>c`<span class="chip">${String(a)}</span>`)}
          ${o.slice(0,8).map(a=>c`<span class="chip">${String(a)}</span>`)}
        </div>
      </div>
    </div>
  `}function hm(e){var l,u;const t=(l=e.hello)==null?void 0:l.snapshot,n=t!=null&&t.uptimeMs?hr(t.uptimeMs):T("common.na"),i=(u=t==null?void 0:t.policy)!=null&&u.tickIntervalMs?`${t.policy.tickIntervalMs}ms`:T("common.na"),o=(t==null?void 0:t.authMode)==="trusted-proxy",a=(()=>{if(e.connected||!e.lastError)return null;const g=e.lastError.toLowerCase();if(!(g.includes("unauthorized")||g.includes("connect failed")))return null;const m=!!e.settings.token.trim(),b=!!e.password.trim();return!m&&!b?c`
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
    `})(),r=(()=>{if(e.connected||!e.lastError||(typeof window<"u"?window.isSecureContext:!0))return null;const f=e.lastError.toLowerCase();return!f.includes("secure context")&&!f.includes("device identity required")?null:c`
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
    `})(),d=tn.getLocale();return c`
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
            ${T("overview.stats.cronNext",{time:Gs(e.cronNext)})}
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
              @input=${g=>{const f=g.target.value;e.onSettingsChange({...e.settings,gatewayUrl:f})}}
              placeholder="ws://100.x.y.z:18789"
            />
          </label>
          ${o?"":c`
                <label class="field">
                  <span>${T("overview.access.token")}</span>
                  <input
                    .value=${e.settings.token}
                    @input=${g=>{const f=g.target.value;e.onSettingsChange({...e.settings,token:f})}}
                    placeholder="JAGENT_GATEWAY_TOKEN"
                  />
                </label>
                <label class="field">
                  <span>${T("overview.access.password")}</span>
                  <input
                    type="password"
                    .value=${e.password}
                    @input=${g=>{const f=g.target.value;e.onPasswordChange(f)}}
                    placeholder="system or shared password"
                  />
                </label>
              `}
          <label class="field">
            <span>${T("overview.access.sessionKey")}</span>
            <input
              .value=${e.settings.sessionKey}
              @input=${g=>{const f=g.target.value;e.onSessionKeyChange(f)}}
            />
          </label>
          <label class="field">
            <span>${T("overview.access.language")}</span>
            <select
              .value=${d}
              @change=${g=>{const f=g.target.value;tn.setLocale(f),e.onSettingsChange({...e.settings,locale:f})}}
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
              ${e.lastChannelsRefresh?Be(e.lastChannelsRefresh):T("common.na")}
            </div>
          </div>
        </div>
        ${e.lastError?c`<div class="callout danger" style="margin-top: 14px;">
              <div>${e.lastError}</div>
              ${a??""}
              ${r??""}
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
          ${e.oosStats?[{label:"总记录数",value:e.oosStats.total_records},{label:"无货产品数",value:e.oosStats.out_of_stock_count},{label:"今日新增",value:e.oosStats.today_count},{label:"被报无货≥2 次",value:e.oosStats.notified_count}].map(g=>c`
                  <div class="card stat-card" style="min-width: 120px;">
                    <div class="stat-value">${g.value}</div>
                    <div class="stat-label">${g.label}</div>
                  </div>
                `):c`<div class="muted">暂无统计，稍后可在「实例」页查看。</div>`}
        </div>
      </div>
      <div class="card">
        <div class="card-title">缺货总览</div>
        <div class="card-sub">Work 匹配后库存不足的统计，需重点关注的紧缺物资。</div>
        <div class="row" style="margin-top: 12px; gap: 12px; flex-wrap: wrap;">
          ${e.shortageStats?[{label:"总记录数",value:e.shortageStats.total_records},{label:"缺货产品数",value:e.shortageStats.shortage_product_count},{label:"今日新增",value:e.shortageStats.today_count},{label:"被报缺货≥2 次",value:e.shortageStats.reported_ge2_count}].map(g=>c`
                  <div class="card stat-card" style="min-width: 120px;">
                    <div class="stat-value">${g.value}</div>
                    <div class="stat-label">${g.label}</div>
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
  `}const vm=["","off","minimal","low","medium","high","xhigh"],mm=["","off","on"],ym=[{value:"",label:"inherit"},{value:"off",label:"off (explicit)"},{value:"on",label:"on"},{value:"full",label:"full"}],bm=["","off","on","stream"];function wm(e){if(!e)return"";const t=e.trim().toLowerCase();return t==="z.ai"||t==="z-ai"?"zai":t}function Ol(e){return wm(e)==="zai"}function $m(e){return Ol(e)?mm:vm}function Va(e,t){return t?e.includes(t)?[...e]:[...e,t]:[...e]}function km(e,t){return t?e.some(n=>n.value===t)?[...e]:[...e,{value:t,label:`${t} (custom)`}]:[...e]}function xm(e,t){return!t||!e||e==="off"?e:"on"}function Sm(e,t){return e?t&&e==="on"?"low":e:null}function Am(e){var n;const t=((n=e.result)==null?void 0:n.sessions)??[];return c`
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

      ${e.error?c`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:y}

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
              `:t.map(i=>_m(i,e.basePath,e.onPatch,e.onDelete,e.loading))}
      </div>
    </section>
  `}function _m(e,t,n,i,s){const o=e.updatedAt?Be(e.updatedAt):"n/a",a=e.thinkingLevel??"",r=Ol(e.modelProvider),d=xm(a,r),l=Va($m(e.modelProvider),d),u=e.verboseLevel??"",g=km(ym,u),f=e.reasoningLevel??"",m=Va(bm,f),b=typeof e.displayName=="string"&&e.displayName.trim().length>0?e.displayName.trim():null,k=typeof e.label=="string"?e.label.trim():"",S=!!(b&&b!==e.key&&b!==k),_=e.kind!=="global",F=_?`${ti("chat",t)}?session=${encodeURIComponent(e.key)}`:null;return c`
    <div class="table-row">
      <div class="mono session-key-cell">
        ${_?c`<a href=${F} class="session-link">${e.key}</a>`:e.key}
        ${S?c`<span class="muted session-key-display-name">${b}</span>`:y}
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
      <div>${rf(e)}</div>
      <div>
        <select
          ?disabled=${s}
          @change=${L=>{const R=L.target.value;n(e.key,{thinkingLevel:Sm(R,r)})}}
        >
          ${l.map(L=>c`<option value=${L} ?selected=${d===L}>
                ${L||"inherit"}
              </option>`)}
        </select>
      </div>
      <div>
        <select
          ?disabled=${s}
          @change=${L=>{const R=L.target.value;n(e.key,{verboseLevel:R||null})}}
        >
          ${g.map(L=>c`<option value=${L.value} ?selected=${u===L.value}>
                ${L.label}
              </option>`)}
        </select>
      </div>
      <div>
        <select
          ?disabled=${s}
          @change=${L=>{const R=L.target.value;n(e.key,{reasoningLevel:R||null})}}
        >
          ${m.map(L=>c`<option value=${L} ?selected=${f===L}>
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
  `}function Cm(e){var o;const t=((o=e.report)==null?void 0:o.skills)??[],n=e.filter.trim().toLowerCase(),i=n?t.filter(a=>[a.name,a.description,a.source].join(" ").toLowerCase().includes(n)):t,s=rl(i);return c`
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

      ${e.error?c`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:y}

      ${i.length===0?c`
              <div class="muted" style="margin-top: 16px">No skills found.</div>
            `:c`
            <div class="agent-skills-groups" style="margin-top: 16px;">
              ${s.map(a=>{const r=a.id==="workspace"||a.id==="built-in";return c`
                  <details class="agent-skills-group" ?open=${!r}>
                    <summary class="agent-skills-header">
                      <span>${a.label}</span>
                      <span class="muted">${a.skills.length}</span>
                    </summary>
                    <div class="list skills-grid">
                      ${a.skills.map(d=>Tm(d,e))}
                    </div>
                  </details>
                `})}
            </div>
          `}
    </section>
  `}function Tm(e,t){const n=t.busyKey===e.skillKey,i=t.edits[e.skillKey]??"",s=t.messages[e.skillKey]??null,o=e.install.length>0&&e.missing.bins.length>0,a=!!(e.bundled&&e.source!=="openclaw-bundled"),r=ll(e),d=cl(e);return c`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">
          ${e.emoji?`${e.emoji} `:""}${e.name}
        </div>
        <div class="list-sub">${Qi(e.description,140)}</div>
        ${dl({skill:e,showBundledBadge:a})}
        ${r.length>0?c`
              <div class="muted" style="margin-top: 6px;">
                Missing: ${r.join(", ")}
              </div>
            `:y}
        ${d.length>0?c`
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
          ${o?c`<button
                class="btn"
                ?disabled=${n}
                @click=${()=>t.onInstall(e.skillKey,e.name,e.install[0].id)}
              >
                ${n?"Installing…":e.install[0].label}
              </button>`:y}
        </div>
        ${s?c`<div
              class="muted"
              style="margin-top: 8px; color: ${s.kind==="error"?"var(--danger-color, #d14343)":"var(--success-color, #0a7f5a)"};"
            >
              ${s.message}
            </div>`:y}
        ${e.primaryEnv?c`
              <div class="field" style="margin-top: 10px;">
                <span>API key</span>
                <input
                  type="password"
                  .value=${i}
                  @input=${l=>t.onEdit(e.skillKey,l.target.value)}
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
  `}const Em=/^data:/i,Lm=/^https?:\/\//i;function Rm(e){var r,d;const t=((r=e.agentsList)==null?void 0:r.agents)??[],n=dr(e.sessionKey),i=(n==null?void 0:n.agentId)??((d=e.agentsList)==null?void 0:d.defaultId)??"main",s=t.find(l=>l.id===i),o=s==null?void 0:s.identity,a=(o==null?void 0:o.avatarUrl)??(o==null?void 0:o.avatar);if(a)return Em.test(a)||Lm.test(a)?a:o==null?void 0:o.avatarUrl}function Im(e){var m,b,k,S,_,F,L,R,x,P,j,K,B,Ue;const t=e.presenceEntries.length,n=((m=e.sessionsResult)==null?void 0:m.count)??null,i=((b=e.cronStatus)==null?void 0:b.nextWakeAtMs)??null,s=e.connected?null:T("chat.disconnected"),o=e.tab==="chat",a=o&&(e.settings.chatFocusMode||e.onboarding),r=e.onboarding?!1:e.settings.chatShowThinking,d=Rm(e),l=e.chatAvatarUrl??d??null,u=e.configForm??((k=e.configSnapshot)==null?void 0:k.config),g=Rt(e.basePath??""),f=e.agentsSelectedId??((S=e.agentsList)==null?void 0:S.defaultId)??((L=(F=(_=e.agentsList)==null?void 0:_.agents)==null?void 0:F[0])==null?void 0:L.id)??null;return c`
    <div class="shell ${o?"shell--chat":""} ${a?"shell--chat-focus":""} ${e.settings.navCollapsed?"shell--nav-collapsed":""} ${e.onboarding?"shell--onboarding":""}">
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
              <img src=${g?`${g}/favicon.svg`:"/favicon.svg"} alt="PT Vansting Agent" />
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
          ${ef(e)}
        </div>
      </header>
      <aside class="nav ${e.settings.navCollapsed?"nav--collapsed":""}">
        ${uu.map($=>{const C=e.settings.navGroupsCollapsed[$.label]??!1,z=$.tabs.some(U=>U===e.tab);return c`
            <div class="nav-group ${C&&!z?"nav-group--collapsed":""}">
              <button
                class="nav-label"
                @click=${()=>{const U={...e.settings.navGroupsCollapsed};U[$.label]=!C,e.applySettings({...e.settings,navGroupsCollapsed:U})}}
                aria-expanded=${!C}
              >
                <span class="nav-label__text">${T(`nav.${$.label}`)}</span>
                <span class="nav-label__chevron">${C?"+":"−"}</span>
              </button>
              <div class="nav-group__items">
                ${$.tabs.map(U=>Wg(e,U))}
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
            ${e.tab==="work"?y:c`<div class="page-title">${es(e.tab)}</div>`}
            ${e.tab==="work"?y:c`<div class="page-sub">${pu(e.tab)}</div>`}
          </div>
          <div class="page-meta">
            ${e.lastError?c`<div class="pill danger">${e.lastError}</div>`:y}
            ${o?Vg(e):y}
          </div>
        </section>

        ${e.tab==="overview"?hm({connected:e.connected,hello:e.hello,settings:e.settings,password:e.password,lastError:e.lastError,presenceCount:t,sessionsCount:n,cronEnabled:((R=e.cronStatus)==null?void 0:R.enabled)??null,cronNext:i,lastChannelsRefresh:e.channelsLastSuccess,oosStats:e.overviewOosStats,shortageStats:e.overviewShortageStats,onSettingsChange:$=>e.applySettings($),onPasswordChange:$=>e.password=$,onSessionKeyChange:$=>{e.sessionKey=$,e.chatMessage="",e.resetToolStream(),e.applySettings({...e.settings,sessionKey:$,lastActiveSessionKey:$}),e.loadAssistantIdentity()},onConnect:()=>e.connect(),onRefresh:()=>e.loadOverview()}):y}

        ${e.tab==="channels"?zf({loading:e.bkLoading,saving:e.bkSaving,error:e.bkError,content:e.bkContent,lastSuccessAt:e.bkLastSuccess,dependentFiles:e.bkDependentFiles,onReload:()=>pr(e),onSave:$=>od(e,$),onContentChange:$=>e.bkContent=$}):y}

        ${e.tab==="instances"?c`
                ${Fv({loading:e.oosLoading,error:e.oosError,stats:e.oosStats,list:e.oosList,byFile:e.oosByFile,byTime:e.oosByTime,db:e.oosDb??void 0,onRefresh:()=>Xn(e),onDelete:$=>Yd(e,$),showAddForm:e.oosShowAddForm,onOpenAddForm:()=>e.oosShowAddForm=!0,onCloseAddForm:()=>e.oosShowAddForm=!1,onAdd:async $=>{const C=await Xd(e,$);return C&&(e.oosShowAddForm=!1),C}})}
                ${Bv({loading:e.shortageLoading,error:e.shortageError,stats:e.shortageStats,list:e.shortageList,byFile:e.shortageByFile,byTime:e.shortageByTime,db:e.shortageDb??void 0,onRefresh:()=>Zn(e),onDelete:$=>eu(e,$),showAddForm:e.shortageShowAddForm,onOpenAddForm:()=>e.shortageShowAddForm=!0,onCloseAddForm:()=>e.shortageShowAddForm=!1,onAdd:async $=>{const C=await tu(e,$);return C&&(e.shortageShowAddForm=!1),C}})}
              `:y}

        ${e.tab==="sessions"?Am({loading:e.sessionsLoading,result:e.sessionsResult,error:e.sessionsError,activeMinutes:e.sessionsFilterActive,limit:e.sessionsFilterLimit,includeGlobal:e.sessionsIncludeGlobal,includeUnknown:e.sessionsIncludeUnknown,basePath:e.basePath,onFiltersChange:$=>{e.sessionsFilterActive=$.activeMinutes,e.sessionsFilterLimit=$.limit,e.sessionsIncludeGlobal=$.includeGlobal,e.sessionsIncludeUnknown=$.includeUnknown},onRefresh:()=>pt(e),onPatch:($,C)=>su(e,$,C),onDelete:$=>au(e,$)}):y}

        ${Bg(e)}

        ${e.tab==="cron"?$v({basePath:e.basePath,loading:e.cronLoading,status:e.cronStatus,jobs:e.cronJobs,error:e.cronError,busy:e.cronBusy,form:e.cronForm,channels:(P=(x=e.channelsSnapshot)==null?void 0:x.channelMeta)!=null&&P.length?e.channelsSnapshot.channelMeta.map($=>$.id):((j=e.channelsSnapshot)==null?void 0:j.channelOrder)??[],channelLabels:((K=e.channelsSnapshot)==null?void 0:K.channelLabels)??{},channelMeta:((B=e.channelsSnapshot)==null?void 0:B.channelMeta)??[],runsJobId:e.cronRunsJobId,runs:e.cronRuns,onFormChange:$=>e.cronForm=mr({...e.cronForm,...$}),onRefresh:()=>e.loadCron(),onAdd:()=>dd(e),onToggle:($,C)=>ud(e,$,C),onRun:$=>gd(e,$),onRemove:$=>fd(e,$),onLoadRuns:$=>yr(e,$)}):y}

        ${e.tab==="agents"?Of({loading:e.agentsLoading,error:e.agentsError,agentsList:e.agentsList,selectedAgentId:f,activePanel:e.agentsPanel,configForm:u,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,channelsLoading:e.channelsLoading,channelsError:e.channelsError,channelsSnapshot:e.channelsSnapshot,channelsLastSuccess:e.channelsLastSuccess,cronLoading:e.cronLoading,cronStatus:e.cronStatus,cronJobs:e.cronJobs,cronError:e.cronError,agentFilesLoading:e.agentFilesLoading,agentFilesError:e.agentFilesError,agentFilesList:e.agentFilesList,agentFileActive:e.agentFileActive,agentFileContents:e.agentFileContents,agentFileDrafts:e.agentFileDrafts,agentFileSaving:e.agentFileSaving,agentIdentityLoading:e.agentIdentityLoading,agentIdentityError:e.agentIdentityError,agentIdentityById:e.agentIdentityById,agentSkillsLoading:e.agentSkillsLoading,agentSkillsReport:e.agentSkillsReport,agentSkillsError:e.agentSkillsError,agentSkillsAgentId:e.agentSkillsAgentId,skillsFilter:e.skillsFilter,onRefresh:async()=>{var C,z;await Es(e);const $=((z=(C=e.agentsList)==null?void 0:C.agents)==null?void 0:z.map(U=>U.id))??[];$.length>0&&fr(e,$)},onSelectAgent:$=>{e.agentsSelectedId!==$&&(e.agentsSelectedId=$,e.agentFilesList=null,e.agentFilesError=null,e.agentFilesLoading=!1,e.agentFileActive=null,e.agentFileContents={},e.agentFileDrafts={},e.agentSkillsReport=null,e.agentSkillsError=null,e.agentSkillsAgentId=null,gr(e,$),e.agentsPanel==="files"&&Oi(e,$),e.agentsPanel==="skills"&&Ln(e,$))},onSelectPanel:$=>{var C;e.agentsPanel=$,$==="files"&&f&&((C=e.agentFilesList)==null?void 0:C.agentId)!==f&&(e.agentFilesList=null,e.agentFilesError=null,e.agentFileActive=null,e.agentFileContents={},e.agentFileDrafts={},Oi(e,f)),$==="skills"&&f&&Ln(e,f),$==="channels"&&me(e,!1),$==="cron"&&e.loadCron()},onLoadFiles:$=>Oi(e,$),onSelectFile:$=>{e.agentFileActive=$,f&&of(e,f,$)},onFileDraftChange:($,C)=>{e.agentFileDrafts={...e.agentFileDrafts,[$]:C}},onFileReset:$=>{const C=e.agentFileContents[$]??"";e.agentFileDrafts={...e.agentFileDrafts,[$]:C}},onFileSave:$=>{if(!f)return;const C=e.agentFileDrafts[$]??e.agentFileContents[$]??"";af(e,f,$,C)},onToolsProfileChange:($,C,z)=>{var O;if(!u)return;const U=(O=u.agents)==null?void 0:O.list;if(!Array.isArray(U))return;const G=U.findIndex(N=>N&&typeof N=="object"&&"id"in N&&N.id===$);if(G<0)return;const E=["agents","list",G,"tools"];C?pe(e,[...E,"profile"],C):Pe(e,[...E,"profile"]),z&&Pe(e,[...E,"allow"])},onToolsOverridesChange:($,C,z)=>{var O;if(!u)return;const U=(O=u.agents)==null?void 0:O.list;if(!Array.isArray(U))return;const G=U.findIndex(N=>N&&typeof N=="object"&&"id"in N&&N.id===$);if(G<0)return;const E=["agents","list",G,"tools"];C.length>0?pe(e,[...E,"alsoAllow"],C):Pe(e,[...E,"alsoAllow"]),z.length>0?pe(e,[...E,"deny"],z):Pe(e,[...E,"deny"])},onConfigReload:()=>Ee(e),onConfigSave:()=>En(e),onChannelsRefresh:()=>me(e,!1),onCronRefresh:()=>e.loadCron(),onSkillsFilterChange:$=>e.skillsFilter=$,onSkillsRefresh:()=>{f&&Ln(e,f)},onAgentSkillToggle:($,C,z)=>{var be,Q,Le;if(!u)return;const U=(be=u.agents)==null?void 0:be.list;if(!Array.isArray(U))return;const G=U.findIndex(J=>J&&typeof J=="object"&&"id"in J&&J.id===$);if(G<0)return;const E=U[G],O=C.trim();if(!O)return;const N=((Le=(Q=e.agentSkillsReport)==null?void 0:Q.skills)==null?void 0:Le.map(J=>J.name).filter(Boolean))??[],se=(Array.isArray(E.skills)?E.skills.map(J=>String(J).trim()).filter(Boolean):void 0)??N,X=new Set(se);z?X.add(O):X.delete(O),pe(e,["agents","list",G,"skills"],[...X])},onAgentSkillsClear:$=>{var U;if(!u)return;const C=(U=u.agents)==null?void 0:U.list;if(!Array.isArray(C))return;const z=C.findIndex(G=>G&&typeof G=="object"&&"id"in G&&G.id===$);z<0||Pe(e,["agents","list",z,"skills"])},onAgentSkillsDisableAll:$=>{var U;if(!u)return;const C=(U=u.agents)==null?void 0:U.list;if(!Array.isArray(C))return;const z=C.findIndex(G=>G&&typeof G=="object"&&"id"in G&&G.id===$);z<0||pe(e,["agents","list",z,"skills"],[])},onModelChange:($,C)=>{var N;if(!u)return;const z=(N=u.agents)==null?void 0:N.list;if(!Array.isArray(z))return;const U=z.findIndex(H=>H&&typeof H=="object"&&"id"in H&&H.id===$);if(U<0)return;const G=["agents","list",U,"model"];if(!C){Pe(e,G);return}const E=z[U],O=E==null?void 0:E.model;if(O&&typeof O=="object"&&!Array.isArray(O)){const H=O.fallbacks,se={primary:C,...Array.isArray(H)?{fallbacks:H}:{}};pe(e,G,se)}else pe(e,G,C)},onModelFallbacksChange:($,C)=>{var be;if(!u)return;const z=(be=u.agents)==null?void 0:be.list;if(!Array.isArray(z))return;const U=z.findIndex(Q=>Q&&typeof Q=="object"&&"id"in Q&&Q.id===$);if(U<0)return;const G=["agents","list",U,"model"],E=z[U],O=C.map(Q=>Q.trim()).filter(Boolean),N=E.model,se=(()=>{if(typeof N=="string")return N.trim()||null;if(N&&typeof N=="object"&&!Array.isArray(N)){const Q=N.primary;if(typeof Q=="string")return Q.trim()||null}return null})();if(O.length===0){se?pe(e,G,se):Pe(e,G);return}pe(e,G,se?{primary:se,fallbacks:O}:{fallbacks:O})}}):y}

        ${e.tab==="skills"?Cm({loading:e.skillsLoading,report:e.skillsReport,error:e.skillsError,filter:e.skillsFilter,edits:e.skillEdits,messages:e.skillMessages,busyKey:e.skillsBusyKey,onFilterChange:$=>e.skillsFilter=$,onRefresh:()=>dn(e,{clearMessages:!0}),onToggle:($,C)=>lu(e,$,C),onEdit:($,C)=>ru(e,$,C),onSaveKey:$=>cu(e,$),onInstall:($,C,z)=>du(e,$,C,z)}):y}

        ${e.tab==="nodes"?sm({loading:e.nodesLoading,nodes:e.nodes,devicesLoading:e.devicesLoading,devicesError:e.devicesError,devicesList:e.devicesList,configForm:e.configForm??((Ue=e.configSnapshot)==null?void 0:Ue.config),configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,configFormMode:e.configFormMode,execApprovalsLoading:e.execApprovalsLoading,execApprovalsSaving:e.execApprovalsSaving,execApprovalsDirty:e.execApprovalsDirty,execApprovalsSnapshot:e.execApprovalsSnapshot,execApprovalsForm:e.execApprovalsForm,execApprovalsSelectedAgent:e.execApprovalsSelectedAgent,execApprovalsTarget:e.execApprovalsTarget,execApprovalsTargetNodeId:e.execApprovalsTargetNodeId,onRefresh:()=>Qn(e),onDevicesRefresh:()=>Qe(e),onDeviceApprove:$=>zd(e,$),onDeviceReject:$=>jd(e,$),onDeviceRotate:($,C,z)=>Kd(e,{deviceId:$,role:C,scopes:z}),onDeviceRevoke:($,C)=>Hd(e,{deviceId:$,role:C}),onLoadConfig:()=>Ee(e),onLoadExecApprovals:()=>{const $=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return Os(e,$)},onBindDefault:$=>{$?pe(e,["tools","exec","node"],$):Pe(e,["tools","exec","node"])},onBindAgent:($,C)=>{const z=["agents","list",$,"tools","exec","node"];C?pe(e,z,C):Pe(e,z)},onSaveBindings:()=>En(e),onExecApprovalsTargetChange:($,C)=>{e.execApprovalsTarget=$,e.execApprovalsTargetNodeId=C,e.execApprovalsSnapshot=null,e.execApprovalsForm=null,e.execApprovalsDirty=!1,e.execApprovalsSelectedAgent=null},onExecApprovalsSelectAgent:$=>{e.execApprovalsSelectedAgent=$},onExecApprovalsPatch:($,C)=>Qd(e,$,C),onExecApprovalsRemove:$=>Jd(e,$),onSaveExecApprovals:()=>{const $=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return Vd(e,$)}}):y}

        ${e.tab==="chat"?Zh({sessionKey:e.sessionKey,onSessionKeyChange:$=>{e.sessionKey=$,e.chatMessage="",e.chatAttachments=[],e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.chatQueue=[],e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:$,lastActiveSessionKey:$}),e.loadAssistantIdentity(),an(e),is(e)},thinkingLevel:e.chatThinkingLevel,showThinking:r,loading:e.chatLoading,sending:e.chatSending,compactionStatus:e.compactionStatus,assistantAvatarUrl:l,messages:e.chatMessages,toolMessages:e.chatToolMessages,stream:e.chatStream,streamStartedAt:e.chatStreamStartedAt,draft:e.chatMessage,queue:e.chatQueue,connected:e.connected,canSend:e.connected,disabledReason:s,error:e.lastError,sessions:e.sessionsResult,focusMode:a,onRefresh:()=>(e.resetToolStream(),Promise.all([an(e),is(e)])),onToggleFocusMode:()=>{e.onboarding||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})},onChatScroll:$=>e.handleChatScroll($),onDraftChange:$=>e.chatMessage=$,attachments:e.chatAttachments,onAttachmentsChange:$=>e.chatAttachments=$,uploadedFile:e.chatUploadedFile,onFileSelect:$=>e.handleUploadChatFile($),onClearUploadedFile:()=>e.clearChatUploadedFile(),composeDragOver:e.chatComposeDragOver,onComposeDragOver:()=>e.setChatComposeDragOver(!0),onComposeDragLeave:()=>e.setChatComposeDragOver(!1),onComposeDrop:$=>e.handleComposeDrop($),onSend:()=>e.handleSendChat(),canAbort:!!e.chatRunId,onAbort:()=>void e.handleAbortChat(),onQueueRemove:$=>e.removeQueuedMessage($),onNewSession:()=>e.handleSendChat("/new",{restoreDraft:!0}),showNewMessages:e.chatNewMessagesBelow&&!e.chatManualRefreshInFlight,onScrollToBottom:()=>e.scrollToBottom(),sidebarOpen:e.sidebarOpen,sidebarContent:e.sidebarContent,sidebarError:e.sidebarError,splitRatio:e.splitRatio,onOpenSidebar:$=>e.handleOpenSidebar($),onCloseSidebar:()=>e.handleCloseSidebar(),onSplitRatioChange:$=>e.handleSplitRatioChange($),assistantName:e.assistantName,assistantAvatar:e.assistantAvatar}):y}

        ${e.tab==="config"?yv({raw:e.configRaw,originalRaw:e.configRawOriginal,valid:e.configValid,issues:e.configIssues,loading:e.configLoading,saving:e.configSaving,applying:e.configApplying,updating:e.updateRunning,connected:e.connected,schema:e.configSchema,schemaLoading:e.configSchemaLoading,uiHints:e.configUiHints,formMode:e.configFormMode,formValue:e.configForm,originalValue:e.configFormOriginal,searchQuery:e.configSearchQuery,activeSection:e.configActiveSection,activeSubsection:e.configActiveSubsection,onRawChange:$=>{e.configRaw=$},onFormModeChange:$=>e.configFormMode=$,onFormPatch:($,C)=>pe(e,$,C),onSearchChange:$=>e.configSearchQuery=$,onSectionChange:$=>{e.configActiveSection=$,e.configActiveSubsection=null},onSubsectionChange:$=>e.configActiveSubsection=$,onReload:()=>Ee(e),onSave:()=>En(e),onApply:()=>Lc(e),onUpdate:()=>Rc(e)}):y}

        ${e.tab==="debug"?Cv({loading:e.debugLoading,status:e.debugStatus,health:e.debugHealth,models:e.debugModels,heartbeat:e.debugHeartbeat,eventLog:e.eventLog,callMethod:e.debugCallMethod,callParams:e.debugCallParams,callResult:e.debugCallResult,callError:e.debugCallError,onCallMethodChange:$=>e.debugCallMethod=$,onCallParamsChange:$=>e.debugCallParams=$,onRefresh:()=>Vn(e),onCall:()=>Jc(e)}):y}

        ${e.tab==="logs"?Mv({loading:e.logsLoading,error:e.logsError,file:e.logsFile,entries:e.logsEntries,filterText:e.logsFilterText,levelFilters:e.logsLevelFilters,autoFollow:e.logsAutoFollow,truncated:e.logsTruncated,onFilterTextChange:$=>e.logsFilterText=$,onLevelToggle:($,C)=>{e.logsLevelFilters={...e.logsLevelFilters,[$]:C}},onToggleAutoFollow:$=>e.logsAutoFollow=$,onRefresh:()=>Ss(e,{reset:!0}),onExport:($,C)=>e.exportLogs($,C),onScroll:$=>e.handleLogsScroll($)}):y}
      </main>
      ${Ev(e)}
      ${Lv(e)}
    </div>
  `}var Mm=Object.defineProperty,Fm=Object.getOwnPropertyDescriptor,h=(e,t,n,i)=>{for(var s=i>1?void 0:i?Fm(t,n):t,o=e.length-1,a;o>=0;o--)(a=e[o])&&(s=(i?a(t,n,s):a(s))||s);return i&&s&&Mm(t,n,s),s};const Gi=zs({});function Pm(){if(!window.location.search)return!1;const t=new URLSearchParams(window.location.search).get("onboarding");if(!t)return!1;const n=t.trim().toLowerCase();return n==="1"||n==="true"||n==="yes"||n==="on"}let p=class extends Ct{constructor(){super(),this.i18nController=new kc(this),this.settings=hu(),this.password="",this.tab="chat",this.onboarding=Pm(),this.connected=!1,this.theme=this.settings.theme??"system",this.themeResolved="dark",this.hello=null,this.lastError=null,this.eventLog=[],this.eventLogBuffer=[],this.toolStreamSyncTimer=null,this.sidebarCloseTimer=null,this.assistantName=Gi.name,this.assistantAvatar=Gi.avatar,this.assistantAgentId=Gi.agentId??null,this.sessionKey=this.settings.sessionKey,this.chatLoading=!1,this.chatSending=!1,this.chatMessage="",this.chatMessages=[],this.chatToolMessages=[],this.chatStream=null,this.chatStreamStartedAt=null,this.chatRunId=null,this.compactionStatus=null,this.chatAvatarUrl=null,this.chatThinkingLevel=null,this.chatQueue=[],this.chatAttachments=[],this.chatUploadedFile=null,this.chatComposeDragOver=!1,this.chatManualRefreshInFlight=!1,this.sidebarOpen=!1,this.sidebarContent=null,this.sidebarError=null,this.splitRatio=this.settings.splitRatio,this.nodesLoading=!1,this.nodes=[],this.devicesLoading=!1,this.devicesError=null,this.devicesList=null,this.execApprovalsLoading=!1,this.execApprovalsSaving=!1,this.execApprovalsDirty=!1,this.execApprovalsSnapshot=null,this.execApprovalsForm=null,this.execApprovalsSelectedAgent=null,this.execApprovalsTarget="gateway",this.execApprovalsTargetNodeId=null,this.execApprovalQueue=[],this.execApprovalBusy=!1,this.execApprovalError=null,this.pendingGatewayUrl=null,this.configLoading=!1,this.configRaw=`{
}
`,this.configRawOriginal="",this.configValid=null,this.configIssues=[],this.configSaving=!1,this.configApplying=!1,this.updateRunning=!1,this.applySessionKey=this.settings.lastActiveSessionKey,this.configSnapshot=null,this.configSchema=null,this.configSchemaVersion=null,this.configSchemaLoading=!1,this.configUiHints={},this.configForm=null,this.configFormOriginal=null,this.configFormDirty=!1,this.configFormMode="form",this.configSearchQuery="",this.configActiveSection=null,this.configActiveSubsection=null,this.channelsLoading=!1,this.channelsSnapshot=null,this.channelsError=null,this.channelsLastSuccess=null,this.bkContent="",this.bkLoading=!1,this.bkError=null,this.bkSaving=!1,this.bkLastSuccess=null,this.bkDependentFiles=null,this.whatsappLoginMessage=null,this.whatsappLoginQrDataUrl=null,this.whatsappLoginConnected=null,this.whatsappBusy=!1,this.nostrProfileFormState=null,this.nostrProfileAccountId=null,this.presenceLoading=!1,this.presenceEntries=[],this.presenceError=null,this.presenceStatus=null,this.oosLoading=!1,this.oosError=null,this.oosStats=null,this.oosList=[],this.oosByFile=[],this.oosByTime=[],this.oosShowAddForm=!1,this.oosDb=null,this.shortageLoading=!1,this.shortageError=null,this.shortageStats=null,this.shortageList=[],this.shortageByFile=[],this.shortageByTime=[],this.shortageShowAddForm=!1,this.shortageDb=null,this.overviewOosStats=null,this.overviewOosError=null,this.overviewShortageStats=null,this.overviewShortageError=null,this.agentsLoading=!1,this.agentsList=null,this.agentsError=null,this.agentsSelectedId=null,this.agentsPanel="overview",this.agentFilesLoading=!1,this.agentFilesError=null,this.agentFilesList=null,this.agentFileContents={},this.agentFileDrafts={},this.agentFileActive=null,this.agentFileSaving=!1,this.agentIdentityLoading=!1,this.agentIdentityError=null,this.agentIdentityById={},this.agentSkillsLoading=!1,this.agentSkillsError=null,this.agentSkillsReport=null,this.agentSkillsAgentId=null,this.sessionsLoading=!1,this.sessionsResult=null,this.sessionsError=null,this.sessionsFilterActive="",this.sessionsFilterLimit="120",this.sessionsIncludeGlobal=!0,this.sessionsIncludeUnknown=!1,this.usageLoading=!1,this.usageResult=null,this.usageCostSummary=null,this.usageError=null,this.usageRequestSeq=0,this.usageTimeSeriesRequestSeq=0,this.usageSessionLogsRequestSeq=0,this.usageStartDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageEndDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageSelectedSessions=[],this.usageSelectedDays=[],this.usageSelectedHours=[],this.usageChartMode="tokens",this.usageDailyChartMode="by-type",this.usageTimeSeriesMode="per-turn",this.usageTimeSeriesBreakdownMode="by-type",this.usageTimeSeries=null,this.usageTimeSeriesLoading=!1,this.usageTimeSeriesCursorStart=null,this.usageTimeSeriesCursorEnd=null,this.usageSessionLogs=null,this.usageSessionLogsLoading=!1,this.usageSessionLogsExpanded=!1,this.usageQuery="",this.usageQueryDraft="",this.usageSessionSort="recent",this.usageSessionSortDir="desc",this.usageRecentSessions=[],this.usageTimeZone="local",this.usageContextExpanded=!1,this.usageHeaderPinned=!1,this.usageSessionsTab="all",this.usageVisibleColumns=["channel","agent","provider","model","messages","tools","errors","duration"],this.usageLogFilterRoles=[],this.usageLogFilterTools=[],this.usageLogFilterHasTools=!1,this.usageLogFilterQuery="",this.usageQueryDebounceTimer=null,this.workFilePaths=[],this.workOriginalFileNamesByPath={},this.workRunning=!1,this.workProgressStage=0,this._workProgressInterval=null,this.workRunStatus="idle",this.workRunId=null,this.workPendingChoices=[],this.workSelections={},this.workResult=null,this.workError=null,this.workCustomerLevel="B_QUOTE",this.workDoRegisterOos=!0,this.workPendingQuotationDraft=null,this.workQuotationDraftSaveStatus=null,this.cronLoading=!1,this.cronJobs=[],this.cronStatus=null,this.cronError=null,this.cronForm={...ag},this.cronRunsJobId=null,this.cronRuns=[],this.cronBusy=!1,this.skillsLoading=!1,this.skillsReport=null,this.skillsError=null,this.skillsFilter="",this.skillEdits={},this.skillsBusyKey=null,this.skillMessages={},this.debugLoading=!1,this.debugStatus=null,this.debugHealth=null,this.debugModels=[],this.debugHeartbeat=null,this.debugCallMethod="",this.debugCallParams="{}",this.debugCallResult=null,this.debugCallError=null,this.logsLoading=!1,this.logsError=null,this.logsFile=null,this.logsEntries=[],this.logsFilterText="",this.logsLevelFilters={...og},this.logsAutoFollow=!0,this.logsTruncated=!1,this.logsCursor=null,this.logsLastFetchAt=null,this.logsLimit=500,this.logsMaxBytes=25e4,this.logsAtBottom=!0,this.client=null,this.chatScrollFrame=null,this.chatScrollTimeout=null,this.chatHasAutoScrolled=!1,this.chatUserNearBottom=!0,this.chatNewMessagesBelow=!1,this.nodesPollInterval=null,this.logsPollInterval=null,this.debugPollInterval=null,this.logsScrollFrame=null,this.toolStreamById=new Map,this.toolStreamOrder=[],this.refreshSessionsAfterChat=new Set,this.basePath="",this.popStateHandler=()=>Tu(this),this.themeMedia=null,this.themeMediaHandler=null,this.topbarObserver=null,ks(this.settings.locale)&&tn.setLocale(this.settings.locale)}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),$g(this)}firstUpdated(){kg(this)}disconnectedCallback(){xg(this),super.disconnectedCallback()}updated(e){e.has("workRunning")&&(this.workRunning?(this.workProgressStage=this.workRunStatus==="awaiting_choices"?1:0,this._workProgressInterval!=null&&(clearInterval(this._workProgressInterval),this._workProgressInterval=null)):(this._workProgressInterval!=null&&(clearInterval(this._workProgressInterval),this._workProgressInterval=null),this.workProgressStage=2)),Sg(this,e)}connect(){el(this)}handleChatScroll(e){Gc(this,e)}handleLogsScroll(e){Wc(this,e)}exportLogs(e,t){Vc(e,t)}resetToolStream(){ii(this)}resetChatScroll(){No(this)}scrollToBottom(e){No(this),ln(this,!0,!!(e!=null&&e.smooth))}async loadAssistantIdentity(){await Xr(this)}applySettings(e){We(this,e)}setTab(e){$u(this,e)}setTheme(e,t){ku(this,e,t)}async loadOverview(){await Hr(this)}async loadCron(){await Un(this)}async handleAbortChat(){await Vr(this)}removeQueuedMessage(e){eg(this,e)}async handleUploadChatFile(e){try{const t=await Wu(this.basePath,e);this.chatUploadedFile=t,this.lastError=null}catch(t){this.lastError=t instanceof Error?t.message:String(t)}}clearChatUploadedFile(){this.chatUploadedFile=null}setChatComposeDragOver(e){this.chatComposeDragOver=e}async handleComposeDrop(e){this.chatComposeDragOver=!1,await this.handleUploadChatFile(e)}async handleSendChat(e,t){await tg(this,e,t)}async handleWhatsAppStart(e){await Mc(this,e)}async handleWhatsAppWait(){await Fc(this)}async handleWhatsAppLogout(){await Pc(this)}async handleChannelConfigSave(){await Dc(this)}async handleChannelConfigReload(){await Oc(this)}handleNostrProfileEdit(e,t){Uc(this,e,t)}handleNostrProfileCancel(){zc(this)}handleNostrProfileFieldChange(e,t){jc(this,e,t)}async handleNostrProfileSave(){await Hc(this)}async handleNostrProfileImport(){await qc(this)}handleNostrProfileToggleAdvanced(){Kc(this)}async handleExecApprovalDecision(e){const t=this.execApprovalQueue[0];if(!(!t||!this.client||this.execApprovalBusy)){this.execApprovalBusy=!0,this.execApprovalError=null;try{await this.client.request("exec.approval.resolve",{id:t.id,decision:e}),this.execApprovalQueue=this.execApprovalQueue.filter(n=>n.id!==t.id)}catch(n){this.execApprovalError=`Exec approval failed: ${String(n)}`}finally{this.execApprovalBusy=!1}}}handleGatewayUrlConfirm(){const e=this.pendingGatewayUrl;e&&(this.pendingGatewayUrl=null,We(this,{...this.settings,gatewayUrl:e}),this.connect())}handleGatewayUrlCancel(){this.pendingGatewayUrl=null}handleOpenSidebar(e){this.sidebarCloseTimer!=null&&(window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=null),this.sidebarContent=e,this.sidebarError=null,this.sidebarOpen=!0}handleCloseSidebar(){this.sidebarOpen=!1,this.sidebarCloseTimer!=null&&window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=window.setTimeout(()=>{this.sidebarOpen||(this.sidebarContent=null,this.sidebarError=null,this.sidebarCloseTimer=null)},200)}handleSplitRatioChange(e){const t=Math.max(.4,Math.min(.7,e));this.splitRatio=t,this.applySettings({...this.settings,splitRatio:t})}render(){return Im(this)}};h([v()],p.prototype,"settings",2);h([v()],p.prototype,"password",2);h([v()],p.prototype,"tab",2);h([v()],p.prototype,"onboarding",2);h([v()],p.prototype,"connected",2);h([v()],p.prototype,"theme",2);h([v()],p.prototype,"themeResolved",2);h([v()],p.prototype,"hello",2);h([v()],p.prototype,"lastError",2);h([v()],p.prototype,"eventLog",2);h([v()],p.prototype,"assistantName",2);h([v()],p.prototype,"assistantAvatar",2);h([v()],p.prototype,"assistantAgentId",2);h([v()],p.prototype,"sessionKey",2);h([v()],p.prototype,"chatLoading",2);h([v()],p.prototype,"chatSending",2);h([v()],p.prototype,"chatMessage",2);h([v()],p.prototype,"chatMessages",2);h([v()],p.prototype,"chatToolMessages",2);h([v()],p.prototype,"chatStream",2);h([v()],p.prototype,"chatStreamStartedAt",2);h([v()],p.prototype,"chatRunId",2);h([v()],p.prototype,"compactionStatus",2);h([v()],p.prototype,"chatAvatarUrl",2);h([v()],p.prototype,"chatThinkingLevel",2);h([v()],p.prototype,"chatQueue",2);h([v()],p.prototype,"chatAttachments",2);h([v()],p.prototype,"chatUploadedFile",2);h([v()],p.prototype,"chatComposeDragOver",2);h([v()],p.prototype,"chatManualRefreshInFlight",2);h([v()],p.prototype,"sidebarOpen",2);h([v()],p.prototype,"sidebarContent",2);h([v()],p.prototype,"sidebarError",2);h([v()],p.prototype,"splitRatio",2);h([v()],p.prototype,"nodesLoading",2);h([v()],p.prototype,"nodes",2);h([v()],p.prototype,"devicesLoading",2);h([v()],p.prototype,"devicesError",2);h([v()],p.prototype,"devicesList",2);h([v()],p.prototype,"execApprovalsLoading",2);h([v()],p.prototype,"execApprovalsSaving",2);h([v()],p.prototype,"execApprovalsDirty",2);h([v()],p.prototype,"execApprovalsSnapshot",2);h([v()],p.prototype,"execApprovalsForm",2);h([v()],p.prototype,"execApprovalsSelectedAgent",2);h([v()],p.prototype,"execApprovalsTarget",2);h([v()],p.prototype,"execApprovalsTargetNodeId",2);h([v()],p.prototype,"execApprovalQueue",2);h([v()],p.prototype,"execApprovalBusy",2);h([v()],p.prototype,"execApprovalError",2);h([v()],p.prototype,"pendingGatewayUrl",2);h([v()],p.prototype,"configLoading",2);h([v()],p.prototype,"configRaw",2);h([v()],p.prototype,"configRawOriginal",2);h([v()],p.prototype,"configValid",2);h([v()],p.prototype,"configIssues",2);h([v()],p.prototype,"configSaving",2);h([v()],p.prototype,"configApplying",2);h([v()],p.prototype,"updateRunning",2);h([v()],p.prototype,"applySessionKey",2);h([v()],p.prototype,"configSnapshot",2);h([v()],p.prototype,"configSchema",2);h([v()],p.prototype,"configSchemaVersion",2);h([v()],p.prototype,"configSchemaLoading",2);h([v()],p.prototype,"configUiHints",2);h([v()],p.prototype,"configForm",2);h([v()],p.prototype,"configFormOriginal",2);h([v()],p.prototype,"configFormDirty",2);h([v()],p.prototype,"configFormMode",2);h([v()],p.prototype,"configSearchQuery",2);h([v()],p.prototype,"configActiveSection",2);h([v()],p.prototype,"configActiveSubsection",2);h([v()],p.prototype,"channelsLoading",2);h([v()],p.prototype,"channelsSnapshot",2);h([v()],p.prototype,"channelsError",2);h([v()],p.prototype,"channelsLastSuccess",2);h([v()],p.prototype,"bkContent",2);h([v()],p.prototype,"bkLoading",2);h([v()],p.prototype,"bkError",2);h([v()],p.prototype,"bkSaving",2);h([v()],p.prototype,"bkLastSuccess",2);h([v()],p.prototype,"bkDependentFiles",2);h([v()],p.prototype,"whatsappLoginMessage",2);h([v()],p.prototype,"whatsappLoginQrDataUrl",2);h([v()],p.prototype,"whatsappLoginConnected",2);h([v()],p.prototype,"whatsappBusy",2);h([v()],p.prototype,"nostrProfileFormState",2);h([v()],p.prototype,"nostrProfileAccountId",2);h([v()],p.prototype,"presenceLoading",2);h([v()],p.prototype,"presenceEntries",2);h([v()],p.prototype,"presenceError",2);h([v()],p.prototype,"presenceStatus",2);h([v()],p.prototype,"oosLoading",2);h([v()],p.prototype,"oosError",2);h([v()],p.prototype,"oosStats",2);h([v()],p.prototype,"oosList",2);h([v()],p.prototype,"oosByFile",2);h([v()],p.prototype,"oosByTime",2);h([v()],p.prototype,"oosShowAddForm",2);h([v()],p.prototype,"oosDb",2);h([v()],p.prototype,"shortageLoading",2);h([v()],p.prototype,"shortageError",2);h([v()],p.prototype,"shortageStats",2);h([v()],p.prototype,"shortageList",2);h([v()],p.prototype,"shortageByFile",2);h([v()],p.prototype,"shortageByTime",2);h([v()],p.prototype,"shortageShowAddForm",2);h([v()],p.prototype,"shortageDb",2);h([v()],p.prototype,"overviewOosStats",2);h([v()],p.prototype,"overviewOosError",2);h([v()],p.prototype,"overviewShortageStats",2);h([v()],p.prototype,"overviewShortageError",2);h([v()],p.prototype,"agentsLoading",2);h([v()],p.prototype,"agentsList",2);h([v()],p.prototype,"agentsError",2);h([v()],p.prototype,"agentsSelectedId",2);h([v()],p.prototype,"agentsPanel",2);h([v()],p.prototype,"agentFilesLoading",2);h([v()],p.prototype,"agentFilesError",2);h([v()],p.prototype,"agentFilesList",2);h([v()],p.prototype,"agentFileContents",2);h([v()],p.prototype,"agentFileDrafts",2);h([v()],p.prototype,"agentFileActive",2);h([v()],p.prototype,"agentFileSaving",2);h([v()],p.prototype,"agentIdentityLoading",2);h([v()],p.prototype,"agentIdentityError",2);h([v()],p.prototype,"agentIdentityById",2);h([v()],p.prototype,"agentSkillsLoading",2);h([v()],p.prototype,"agentSkillsError",2);h([v()],p.prototype,"agentSkillsReport",2);h([v()],p.prototype,"agentSkillsAgentId",2);h([v()],p.prototype,"sessionsLoading",2);h([v()],p.prototype,"sessionsResult",2);h([v()],p.prototype,"sessionsError",2);h([v()],p.prototype,"sessionsFilterActive",2);h([v()],p.prototype,"sessionsFilterLimit",2);h([v()],p.prototype,"sessionsIncludeGlobal",2);h([v()],p.prototype,"sessionsIncludeUnknown",2);h([v()],p.prototype,"usageLoading",2);h([v()],p.prototype,"usageResult",2);h([v()],p.prototype,"usageCostSummary",2);h([v()],p.prototype,"usageError",2);h([v()],p.prototype,"usageStartDate",2);h([v()],p.prototype,"usageEndDate",2);h([v()],p.prototype,"usageSelectedSessions",2);h([v()],p.prototype,"usageSelectedDays",2);h([v()],p.prototype,"usageSelectedHours",2);h([v()],p.prototype,"usageChartMode",2);h([v()],p.prototype,"usageDailyChartMode",2);h([v()],p.prototype,"usageTimeSeriesMode",2);h([v()],p.prototype,"usageTimeSeriesBreakdownMode",2);h([v()],p.prototype,"usageTimeSeries",2);h([v()],p.prototype,"usageTimeSeriesLoading",2);h([v()],p.prototype,"usageTimeSeriesCursorStart",2);h([v()],p.prototype,"usageTimeSeriesCursorEnd",2);h([v()],p.prototype,"usageSessionLogs",2);h([v()],p.prototype,"usageSessionLogsLoading",2);h([v()],p.prototype,"usageSessionLogsExpanded",2);h([v()],p.prototype,"usageQuery",2);h([v()],p.prototype,"usageQueryDraft",2);h([v()],p.prototype,"usageSessionSort",2);h([v()],p.prototype,"usageSessionSortDir",2);h([v()],p.prototype,"usageRecentSessions",2);h([v()],p.prototype,"usageTimeZone",2);h([v()],p.prototype,"usageContextExpanded",2);h([v()],p.prototype,"usageHeaderPinned",2);h([v()],p.prototype,"usageSessionsTab",2);h([v()],p.prototype,"usageVisibleColumns",2);h([v()],p.prototype,"usageLogFilterRoles",2);h([v()],p.prototype,"usageLogFilterTools",2);h([v()],p.prototype,"usageLogFilterHasTools",2);h([v()],p.prototype,"usageLogFilterQuery",2);h([v()],p.prototype,"workFilePaths",2);h([v()],p.prototype,"workOriginalFileNamesByPath",2);h([v()],p.prototype,"workRunning",2);h([v()],p.prototype,"workProgressStage",2);h([v()],p.prototype,"workRunStatus",2);h([v()],p.prototype,"workRunId",2);h([v()],p.prototype,"workPendingChoices",2);h([v()],p.prototype,"workSelections",2);h([v()],p.prototype,"workResult",2);h([v()],p.prototype,"workError",2);h([v()],p.prototype,"workCustomerLevel",2);h([v()],p.prototype,"workDoRegisterOos",2);h([v()],p.prototype,"workPendingQuotationDraft",2);h([v()],p.prototype,"workQuotationDraftSaveStatus",2);h([v()],p.prototype,"cronLoading",2);h([v()],p.prototype,"cronJobs",2);h([v()],p.prototype,"cronStatus",2);h([v()],p.prototype,"cronError",2);h([v()],p.prototype,"cronForm",2);h([v()],p.prototype,"cronRunsJobId",2);h([v()],p.prototype,"cronRuns",2);h([v()],p.prototype,"cronBusy",2);h([v()],p.prototype,"skillsLoading",2);h([v()],p.prototype,"skillsReport",2);h([v()],p.prototype,"skillsError",2);h([v()],p.prototype,"skillsFilter",2);h([v()],p.prototype,"skillEdits",2);h([v()],p.prototype,"skillsBusyKey",2);h([v()],p.prototype,"skillMessages",2);h([v()],p.prototype,"debugLoading",2);h([v()],p.prototype,"debugStatus",2);h([v()],p.prototype,"debugHealth",2);h([v()],p.prototype,"debugModels",2);h([v()],p.prototype,"debugHeartbeat",2);h([v()],p.prototype,"debugCallMethod",2);h([v()],p.prototype,"debugCallParams",2);h([v()],p.prototype,"debugCallResult",2);h([v()],p.prototype,"debugCallError",2);h([v()],p.prototype,"logsLoading",2);h([v()],p.prototype,"logsError",2);h([v()],p.prototype,"logsFile",2);h([v()],p.prototype,"logsEntries",2);h([v()],p.prototype,"logsFilterText",2);h([v()],p.prototype,"logsLevelFilters",2);h([v()],p.prototype,"logsAutoFollow",2);h([v()],p.prototype,"logsTruncated",2);h([v()],p.prototype,"logsCursor",2);h([v()],p.prototype,"logsLastFetchAt",2);h([v()],p.prototype,"logsLimit",2);h([v()],p.prototype,"logsMaxBytes",2);h([v()],p.prototype,"logsAtBottom",2);h([v()],p.prototype,"chatNewMessagesBelow",2);p=h([nr("openclaw-app")],p);
//# sourceMappingURL=index-D6DGlea7.js.map
