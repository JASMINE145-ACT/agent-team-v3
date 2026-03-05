var kc=Object.defineProperty;var Sc=(e,t,n)=>t in e?kc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var W=(e,t,n)=>Sc(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Kn=globalThis,Ls=Kn.ShadowRoot&&(Kn.ShadyCSS===void 0||Kn.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Is=Symbol(),jo=new WeakMap;let $a=class{constructor(t,n,i){if(this._$cssResult$=!0,i!==Is)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(Ls&&t===void 0){const i=n!==void 0&&n.length===1;i&&(t=jo.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&jo.set(n,t))}return t}toString(){return this.cssText}};const Ac=e=>new $a(typeof e=="string"?e:e+"",void 0,Is),_c=(e,...t)=>{const n=e.length===1?e[0]:t.reduce((i,s,o)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[o+1],e[0]);return new $a(n,e,Is)},Cc=(e,t)=>{if(Ls)e.adoptedStyleSheets=t.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of t){const i=document.createElement("style"),s=Kn.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=n.cssText,e.appendChild(i)}},qo=Ls?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const i of t.cssRules)n+=i.cssText;return Ac(n)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Tc,defineProperty:Ec,getOwnPropertyDescriptor:Rc,getOwnPropertyNames:Lc,getOwnPropertySymbols:Ic,getPrototypeOf:Mc}=Object,Je=globalThis,Wo=Je.trustedTypes,Pc=Wo?Wo.emptyScript:"",Li=Je.reactiveElementPolyfillSupport,sn=(e,t)=>e,Vn={toAttribute(e,t){switch(t){case Boolean:e=e?Pc:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},Ms=(e,t)=>!Tc(e,t),Go={attribute:!0,type:String,converter:Vn,reflect:!1,useDefault:!1,hasChanged:Ms};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Je.litPropertyMetadata??(Je.litPropertyMetadata=new WeakMap);let It=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=Go){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(t,n),!n.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,n);s!==void 0&&Ec(this.prototype,t,s)}}static getPropertyDescriptor(t,n,i){const{get:s,set:o}=Rc(this.prototype,t)??{get(){return this[n]},set(r){this[n]=r}};return{get:s,set(r){const a=s==null?void 0:s.call(this);o==null||o.call(this,r),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Go}static _$Ei(){if(this.hasOwnProperty(sn("elementProperties")))return;const t=Mc(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(sn("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(sn("properties"))){const n=this.properties,i=[...Lc(n),...Ic(n)];for(const s of i)this.createProperty(s,n[s])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[i,s]of n)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[n,i]of this.elementProperties){const s=this._$Eu(n,i);s!==void 0&&this._$Eh.set(s,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)n.unshift(qo(s))}else t!==void 0&&n.push(qo(t));return n}static _$Eu(t,n){const i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(n=>n(this))}addController(t){var n;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((n=t.hostConnected)==null||n.call(t))}removeController(t){var n;(n=this._$EO)==null||n.delete(t)}_$E_(){const t=new Map,n=this.constructor.elementProperties;for(const i of n.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Cc(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(n=>{var i;return(i=n.hostConnected)==null?void 0:i.call(n)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(n=>{var i;return(i=n.hostDisconnected)==null?void 0:i.call(n)})}attributeChangedCallback(t,n,i){this._$AK(t,i)}_$ET(t,n){var o;const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const r=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:Vn).toAttribute(n,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,n){var o,r;const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const a=i.getPropertyOptions(s),l=typeof a.converter=="function"?{fromAttribute:a.converter}:((o=a.converter)==null?void 0:o.fromAttribute)!==void 0?a.converter:Vn;this._$Em=s;const c=l.fromAttribute(n,a.type);this[s]=c??((r=this._$Ej)==null?void 0:r.get(s))??c,this._$Em=null}}requestUpdate(t,n,i,s=!1,o){var r;if(t!==void 0){const a=this.constructor;if(s===!1&&(o=this[t]),i??(i=a.getPropertyOptions(t)),!((i.hasChanged??Ms)(o,n)||i.useDefault&&i.reflect&&o===((r=this._$Ej)==null?void 0:r.get(t))&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,n,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,r??n??this[t]),o!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(n=void 0),this._$AL.set(t,n)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,r]of this._$Ep)this[o]=r;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,r]of s){const{wrapped:a}=r,l=this[o];a!==!0||this._$AL.has(o)||l===void 0||this.C(o,void 0,r,l)}}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),(i=this._$EO)==null||i.forEach(s=>{var o;return(o=s.hostUpdate)==null?void 0:o.call(s)}),this.update(n)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(n)}willUpdate(t){}_$AE(t){var n;(n=this._$EO)==null||n.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(n=>this._$ET(n,this[n]))),this._$EM()}updated(t){}firstUpdated(t){}};It.elementStyles=[],It.shadowRootOptions={mode:"open"},It[sn("elementProperties")]=new Map,It[sn("finalized")]=new Map,Li==null||Li({ReactiveElement:It}),(Je.reactiveElementVersions??(Je.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const on=globalThis,Vo=e=>e,Qn=on.trustedTypes,Qo=Qn?Qn.createPolicy("lit-html",{createHTML:e=>e}):void 0,xa="$lit$",Qe=`lit$${Math.random().toFixed(9).slice(2)}$`,ka="?"+Qe,Dc=`<${ka}>`,pt=document,un=()=>pt.createComment(""),fn=e=>e===null||typeof e!="object"&&typeof e!="function",Ps=Array.isArray,Fc=e=>Ps(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",Ii=`[ 	
\f\r]`,Wt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Jo=/-->/g,Yo=/>/g,ot=RegExp(`>|${Ii}(?:([^\\s"'>=/]+)(${Ii}*=${Ii}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Xo=/'/g,Zo=/"/g,Sa=/^(?:script|style|textarea|title)$/i,Nc=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),d=Nc(1),Ze=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),er=new WeakMap,dt=pt.createTreeWalker(pt,129);function Aa(e,t){if(!Ps(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Qo!==void 0?Qo.createHTML(t):t}const Oc=(e,t)=>{const n=e.length-1,i=[];let s,o=t===2?"<svg>":t===3?"<math>":"",r=Wt;for(let a=0;a<n;a++){const l=e[a];let c,f,u=-1,p=0;for(;p<l.length&&(r.lastIndex=p,f=r.exec(l),f!==null);)p=r.lastIndex,r===Wt?f[1]==="!--"?r=Jo:f[1]!==void 0?r=Yo:f[2]!==void 0?(Sa.test(f[2])&&(s=RegExp("</"+f[2],"g")),r=ot):f[3]!==void 0&&(r=ot):r===ot?f[0]===">"?(r=s??Wt,u=-1):f[1]===void 0?u=-2:(u=r.lastIndex-f[2].length,c=f[1],r=f[3]===void 0?ot:f[3]==='"'?Zo:Xo):r===Zo||r===Xo?r=ot:r===Jo||r===Yo?r=Wt:(r=ot,s=void 0);const b=r===ot&&e[a+1].startsWith("/>")?" ":"";o+=r===Wt?l+Dc:u>=0?(i.push(c),l.slice(0,u)+xa+l.slice(u)+Qe+b):l+Qe+(u===-2?a:b)}return[Aa(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class pn{constructor({strings:t,_$litType$:n},i){let s;this.parts=[];let o=0,r=0;const a=t.length-1,l=this.parts,[c,f]=Oc(t,n);if(this.el=pn.createElement(c,i),dt.currentNode=this.el.content,n===2||n===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=dt.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(const u of s.getAttributeNames())if(u.endsWith(xa)){const p=f[r++],b=s.getAttribute(u).split(Qe),x=/([.?@])?(.*)/.exec(p);l.push({type:1,index:o,name:x[2],strings:b,ctor:x[1]==="."?Uc:x[1]==="?"?zc:x[1]==="@"?Kc:ri}),s.removeAttribute(u)}else u.startsWith(Qe)&&(l.push({type:6,index:o}),s.removeAttribute(u));if(Sa.test(s.tagName)){const u=s.textContent.split(Qe),p=u.length-1;if(p>0){s.textContent=Qn?Qn.emptyScript:"";for(let b=0;b<p;b++)s.append(u[b],un()),dt.nextNode(),l.push({type:2,index:++o});s.append(u[p],un())}}}else if(s.nodeType===8)if(s.data===ka)l.push({type:2,index:o});else{let u=-1;for(;(u=s.data.indexOf(Qe,u+1))!==-1;)l.push({type:7,index:o}),u+=Qe.length-1}o++}}static createElement(t,n){const i=pt.createElement("template");return i.innerHTML=t,i}}function Ft(e,t,n=e,i){var r,a;if(t===Ze)return t;let s=i!==void 0?(r=n._$Co)==null?void 0:r[i]:n._$Cl;const o=fn(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==o&&((a=s==null?void 0:s._$AO)==null||a.call(s,!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,i)),i!==void 0?(n._$Co??(n._$Co=[]))[i]=s:n._$Cl=s),s!==void 0&&(t=Ft(e,s._$AS(e,t.values),s,i)),t}class Bc{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??pt).importNode(n,!0);dt.currentNode=s;let o=dt.nextNode(),r=0,a=0,l=i[0];for(;l!==void 0;){if(r===l.index){let c;l.type===2?c=new oi(o,o.nextSibling,this,t):l.type===1?c=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(c=new Hc(o,this,t)),this._$AV.push(c),l=i[++a]}r!==(l==null?void 0:l.index)&&(o=dt.nextNode(),r++)}return dt.currentNode=pt,s}p(t){let n=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,n),n+=i.strings.length-2):i._$AI(t[n])),n++}}let oi=class _a{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,n,i,s){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Ft(this,t,n),fn(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==Ze&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Fc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==$&&fn(this._$AH)?this._$AA.nextSibling.data=t:this.T(pt.createTextNode(t)),this._$AH=t}$(t){var o;const{values:n,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=pn.createElement(Aa(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===s)this._$AH.p(n);else{const r=new Bc(s,this),a=r.u(this.options);r.p(n),this.T(a),this._$AH=r}}_$AC(t){let n=er.get(t.strings);return n===void 0&&er.set(t.strings,n=new pn(t)),n}k(t){Ps(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let i,s=0;for(const o of t)s===n.length?n.push(i=new _a(this.O(un()),this.O(un()),this,this.options)):i=n[s],i._$AI(o),s++;s<n.length&&(this._$AR(i&&i._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,n);t!==this._$AB;){const s=Vo(t).nextSibling;Vo(t).remove(),t=s}}setConnected(t){var n;this._$AM===void 0&&(this._$Cv=t,(n=this._$AP)==null||n.call(this,t))}},ri=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,i,s,o){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=$}_$AI(t,n=this,i,s){const o=this.strings;let r=!1;if(o===void 0)t=Ft(this,t,n,0),r=!fn(t)||t!==this._$AH&&t!==Ze,r&&(this._$AH=t);else{const a=t;let l,c;for(t=o[0],l=0;l<o.length-1;l++)c=Ft(this,a[i+l],n,l),c===Ze&&(c=this._$AH[l]),r||(r=!fn(c)||c!==this._$AH[l]),c===$?t=$:t!==$&&(t+=(c??"")+o[l+1]),this._$AH[l]=c}r&&!s&&this.j(t)}j(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Uc=class extends ri{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$?void 0:t}},zc=class extends ri{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==$)}},Kc=class extends ri{constructor(t,n,i,s,o){super(t,n,i,s,o),this.type=5}_$AI(t,n=this){if((t=Ft(this,t,n,0)??$)===Ze)return;const i=this._$AH,s=t===$&&i!==$||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==$&&(i===$||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var n;typeof this._$AH=="function"?this._$AH.call(((n=this.options)==null?void 0:n.host)??this.element,t):this._$AH.handleEvent(t)}},Hc=class{constructor(t,n,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Ft(this,t)}};const jc={I:oi},Mi=on.litHtmlPolyfillSupport;Mi==null||Mi(pn,oi),(on.litHtmlVersions??(on.litHtmlVersions=[])).push("3.3.2");const qc=(e,t,n)=>{const i=(n==null?void 0:n.renderBefore)??t;let s=i._$litPart$;if(s===void 0){const o=(n==null?void 0:n.renderBefore)??null;i._$litPart$=s=new oi(t.insertBefore(un(),o),o,void 0,n??{})}return s._$AI(e),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ft=globalThis;let Pt=class extends It{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var n;const t=super.createRenderRoot();return(n=this.renderOptions).renderBefore??(n.renderBefore=t.firstChild),t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=qc(n,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return Ze}};var wa;Pt._$litElement$=!0,Pt.finalized=!0,(wa=ft.litElementHydrateSupport)==null||wa.call(ft,{LitElement:Pt});const Pi=ft.litElementPolyfillSupport;Pi==null||Pi({LitElement:Pt});(ft.litElementVersions??(ft.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ca=e=>(t,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Wc={attribute:!0,type:String,converter:Vn,reflect:!1,hasChanged:Ms},Gc=(e=Wc,t,n)=>{const{kind:i,metadata:s}=n;let o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),i==="setter"&&((e=Object.create(e)).wrapped=!0),o.set(n.name,e),i==="accessor"){const{name:r}=n;return{set(a){const l=t.get.call(this);t.set.call(this,a),this.requestUpdate(r,l,e,!0,a)},init(a){return a!==void 0&&this.C(r,void 0,e,a),a}}}if(i==="setter"){const{name:r}=n;return function(a){const l=this[r];t.call(this,a),this.requestUpdate(r,l,e,!0,a)}}throw Error("Unsupported decorator location: "+i)};function ai(e){return(t,n)=>typeof n=="object"?Gc(e,t,n):((i,s,o)=>{const r=s.hasOwnProperty(o);return s.constructor.createProperty(o,i),r?Object.getOwnPropertyDescriptor(s,o):void 0})(e,t,n)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function v(e){return ai({...e,state:!0,attribute:!1})}const Vc="modulepreload",Qc=function(e,t){return new URL(e,t).href},tr={},Di=function(t,n,i){let s=Promise.resolve();if(n&&n.length>0){let r=function(f){return Promise.all(f.map(u=>Promise.resolve(u).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};const a=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),c=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));s=r(n.map(f=>{if(f=Qc(f,i),f in tr)return;tr[f]=!0;const u=f.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(!!i)for(let k=a.length-1;k>=0;k--){const S=a[k];if(S.href===f&&(!u||S.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${f}"]${p}`))return;const x=document.createElement("link");if(x.rel=u?"stylesheet":Vc,u||(x.as="script"),x.crossOrigin="",x.href=f,c&&x.setAttribute("nonce",c),document.head.appendChild(x),u)return new Promise((k,S)=>{x.addEventListener("load",k),x.addEventListener("error",()=>S(new Error(`Unable to preload CSS for ${f}`)))})}))}function o(r){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=r,window.dispatchEvent(a),!a.defaultPrevented)throw r}return s.then(r=>{for(const a of r||[])a.status==="rejected"&&o(a.reason);return t().catch(o)})},Jc={common:{health:"Health",ok:"OK",offline:"Offline",connect:"Connect",refresh:"Refresh",retry:"Retry",cancel:"Cancel",close:"Close",yes:"Yes",no:"No",prev:"Prev",next:"Next",errorTitle:"Request failed",enabled:"Enabled",disabled:"Disabled",na:"n/a",docs:"Docs",resources:"Resources"},nav:{chat:"Chat",control:"Control",agent:"Agent",settings:"Settings",expand:"Expand sidebar",collapse:"Collapse sidebar"},tabs:{agents:"Agents",overview:"Overview",channels:"Business Knowledge",instances:"Out of Stock",sessions:"Procurement",work:"Quotation",cron:"Order Fulfill",skills:"Skills",nodes:"Nodes",chat:"Chat",config:"Config",debug:"Debug",logs:"Logs"},subtitles:{agents:"Manage agent workspaces, tools, and identities.",overview:"Gateway status, entry points, and a fast health read.",channels:"Edit wanding_business_knowledge.md for selection and matching.",instances:"OOS dashboard: stats and product list without asking the agent.",sessions:"Procurement suggestions from shortage; approve to save and notify buyer.",work:"Batch quotation: upload files, identify, match price and stock, fill and save.",cron:"Pending quotation drafts; confirm to create order and lock stock.",skills:"Manage skill availability and API key injection.",nodes:"Paired devices, capabilities, and command exposure.",chat:"Direct gateway chat session for quick interventions.",config:"Edit ~/.openclaw/openclaw.json safely.",debug:"Gateway snapshots, events, and manual RPC calls.",logs:"Live tail of the gateway file logs."},overview:{access:{title:"Gateway Access",subtitle:"Where the dashboard connects and how it authenticates.",wsUrl:"WebSocket URL",token:"Gateway Token",password:"Password (not stored)",sessionKey:"Default Session Key",language:"Language",connectHint:"Click Connect to apply connection changes.",trustedProxy:"Authenticated via trusted proxy."},snapshot:{title:"Snapshot",subtitle:"Latest gateway handshake information.",status:"Status",uptime:"Uptime",tickInterval:"Tick Interval",lastChannelsRefresh:"Last Channels Refresh",channelsHint:"Use Channels to link WhatsApp, Telegram, Discord, Signal, or iMessage."},stats:{instances:"Instances",instancesHint:"Presence beacons in the last 5 minutes.",sessions:"Sessions",sessionsHint:"Recent session keys tracked by the gateway.",cron:"Cron",cronNext:"Next wake {time}"},notes:{title:"Notes",subtitle:"Quick reminders for remote control setups.",tailscaleTitle:"Tailscale serve",tailscaleText:"Prefer serve mode to keep the gateway on loopback with tailnet auth.",sessionTitle:"Session hygiene",sessionText:"Use /new or sessions.patch to reset context.",cronTitle:"Cron reminders",cronText:"Use isolated sessions for recurring runs."},auth:{required:"This gateway requires auth. Add a token or password, then click Connect.",failed:"Auth failed. Re-copy a tokenized URL with {command}, or update the token, then click Connect."},insecure:{hint:"This page is HTTP, so the browser blocks device identity. Use HTTPS (Tailscale Serve) or open {url} on the gateway host.",stayHttp:"If you must stay on HTTP, set {config} (token-only)."}},chat:{disconnected:"Disconnected from gateway.",refreshTitle:"Refresh chat data",thinkingToggle:"Toggle assistant thinking/working output",focusToggle:"Toggle focus mode (hide sidebar + page header)",onboardingDisabled:"Disabled during onboarding"},work:{runHint:"Please select at least one file before running.",saveConfirm:"Confirm save quotation draft and persist to database?",saveSuccessHint:"Saved. You can confirm it on the Order Fulfill page.",stageExtract:"Extract sheet data",stageMatch:"Match price & inventory",stageFill:"Fill quotation",uploadTitle:"Quotation files (multiple)",removeFile:"Remove",noFiles:"No files uploaded (.xlsx/.xls/.xlsm).",customerLevel:"Customer level",registerOos:"Register out-of-stock items",currentStage:"Current stage",running:"Running",run:"Run",cancel:"Cancel",statusLabel:"Status",awaitingTitle:"Need your choices",awaitingHint:"Select one option for each ambiguous item, then continue.",qty:"Qty",choiceSelect:"Candidate selection",choiceOos:"Mark as out of stock",resuming:"Resuming",resume:"Confirm and continue",savedDraftNo:"Quotation draft saved: {no}",pendingDraftTitle:"Pending quotation draft",pendingDraftHint:"Review and edit before saving to database.",saving:"Saving...",saveDraft:"Confirm and save",resultTitle:"Execution result",download:"Download {name}",trace:"Trace ({count})",lineProduct:"Product",lineSpec:"Spec",lineQty:"Qty",lineCode:"Code",lineQuoteName:"Quote name",linePrice:"Unit price",lineAmount:"Amount",lineAvailable:"Available",lineShortfall:"Shortfall",lineIsShortage:"Shortage"},fulfill:{title:"Pending quotation drafts",subtitle:"Load persisted drafts and confirm to create formal orders.",loading:"Loading...",refreshList:"Refresh list",filterPlaceholder:"Search by draft no/name/source",sortBy:"Sort by",sortDir:"Order",sortCreatedAt:"Created time",sortDraftNo:"Draft no",sortName:"Name",sortDesc:"Newest first",sortAsc:"Oldest first",pageSize:"Page size",total:"Total: {total}",page:"Page {current}/{total}",listTitle:"List",listSubtitle:"View detail first, then confirm order.",colDraftNo:"Draft No",colName:"Name",colSource:"Source",colCreatedAt:"Created At",colActions:"Actions",viewDetail:"View",confirmAction:"Confirm order",confirming:"Confirming...",detailTitle:"Draft detail · {draftNo}",closeDetail:"Close detail",lineProduct:"Product",lineSpec:"Spec",lineQty:"Qty",lineCode:"Code",lineQuoteName:"Quote name",linePrice:"Unit price",lineAmount:"Amount",lineAvailable:"Available",lineShortfall:"Shortfall",lineIsShortage:"Shortage",noDrafts:"No pending quotation drafts.",confirmTitle:"Order confirmed",confirmPrompt:"Confirm order? {count} line(s), total amount {amount}.",confirmPromptSimple:"Confirm to convert this quotation into a formal order?",orderId:"Order ID"},procurement:{title:"Procurement suggestions",subtitle:"Generated from shortage records; approve to persist and notify buyers.",loading:"Loading...",refreshList:"Refresh list",batchApprove:"Batch approve",approving:"Approving...",approveSingle:"Approve",approveConfirm:"Confirm approval and notify buyer?",approveBatchConfirm:"Confirm approval of {count} item(s) and notify buyer?",noSuggestions:"No shortage products; no procurement suggestions.",noPending:"No pending items (approved items are hidden).",listHint:"Select multiple to batch approve; click Approve to save and notify buyer.",filterPlaceholder:"Search by product/spec/code/key",sortBy:"Sort by",sortDir:"Order",sortUploadedAt:"Reported time",sortShortfall:"Shortfall",sortCount:"Report count",sortProduct:"Product name",sortDesc:"High to low / newest",sortAsc:"Low to high / oldest",pageSize:"Page size",total:"Total: {total}",page:"Page {current}/{total}",listTitle:"Shortage item list",selectAll:"Select all filtered items",selectItem:"Select item",colProduct:"Product",colSpec:"Spec",colShortfall:"Shortfall",colCode:"Code",colCount:"Count",colActions:"Actions",approvedCount:"Approved {count} item(s)."},languages:{en:"English",zhCN:"简体中文 (Simplified Chinese)",zhTW:"繁體中文 (Traditional Chinese)",ptBR:"Português (Brazilian Portuguese)"}},Yc=["en","zh-CN","zh-TW","pt-BR"];function Ds(e){return e!=null&&Yc.includes(e)}class Xc{constructor(){this.locale="en",this.translations={en:Jc},this.subscribers=new Set,this.loadLocale()}loadLocale(){const t=localStorage.getItem("openclaw.i18n.locale");if(Ds(t))this.locale=t;else{const n=navigator.language;n.startsWith("zh")?this.locale=n==="zh-TW"||n==="zh-HK"?"zh-TW":"zh-CN":n.startsWith("pt")?this.locale="pt-BR":this.locale="en"}}getLocale(){return this.locale}async setLocale(t){if(this.locale!==t){if(!this.translations[t])try{let n;if(t==="zh-CN")n=await Di(()=>import("./zh-CN-Cdw7eaDz.js"),[],import.meta.url);else if(t==="zh-TW")n=await Di(()=>import("./zh-TW-B7H4kk0G.js"),[],import.meta.url);else if(t==="pt-BR")n=await Di(()=>import("./pt-BR-CAUgEH0a.js"),[],import.meta.url);else return;this.translations[t]=n[t.replace("-","_")]}catch(n){console.error(`Failed to load locale: ${t}`,n);return}this.locale=t,localStorage.setItem("openclaw.i18n.locale",t),this.notify()}}registerTranslation(t,n){this.translations[t]=n}subscribe(t){return this.subscribers.add(t),()=>this.subscribers.delete(t)}notify(){this.subscribers.forEach(t=>t(this.locale))}t(t,n){const i=t.split(".");let s=this.translations[this.locale]||this.translations.en;for(const o of i)if(s&&typeof s=="object")s=s[o];else{s=void 0;break}if(s===void 0&&this.locale!=="en"){s=this.translations.en;for(const o of i)if(s&&typeof s=="object")s=s[o];else{s=void 0;break}}return typeof s!="string"?t:n?s.replace(/\{(\w+)\}/g,(o,r)=>n[r]||`{${r}}`):s}}const gn=new Xc,y=(e,t)=>gn.t(e,t);class Zc{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){this.unsubscribe=gn.subscribe(()=>{this.host.requestUpdate()})}hostDisconnected(){var t;(t=this.unsubscribe)==null||t.call(this)}}async function ke(e,t){if(!(!e.client||!e.connected)&&!e.channelsLoading){e.channelsLoading=!0,e.channelsError=null;try{const n=await e.client.request("channels.status",{probe:t,timeoutMs:8e3});e.channelsSnapshot=n,e.channelsLastSuccess=Date.now()}catch(n){e.channelsError=String(n)}finally{e.channelsLoading=!1}}}async function ed(e,t){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const n=await e.client.request("web.login.start",{force:t,timeoutMs:3e4});e.whatsappLoginMessage=n.message??null,e.whatsappLoginQrDataUrl=n.qrDataUrl??null,e.whatsappLoginConnected=null}catch(n){e.whatsappLoginMessage=String(n),e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function td(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const t=await e.client.request("web.login.wait",{timeoutMs:12e4});e.whatsappLoginMessage=t.message??null,e.whatsappLoginConnected=t.connected??null,t.connected&&(e.whatsappLoginQrDataUrl=null)}catch(t){e.whatsappLoginMessage=String(t),e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function nd(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{await e.client.request("channels.logout",{channel:"whatsapp"}),e.whatsappLoginMessage="Logged out.",e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}catch(t){e.whatsappLoginMessage=String(t)}finally{e.whatsappBusy=!1}}}function $e(e){if(e)return Array.isArray(e.type)?e.type.filter(n=>n!=="null")[0]??e.type[0]:e.type}function Ta(e){if(!e)return"";if(e.default!==void 0)return e.default;switch($e(e)){case"object":return{};case"array":return[];case"boolean":return!1;case"number":case"integer":return 0;case"string":return"";default:return""}}function Fs(e){return e.filter(t=>typeof t=="string").join(".")}function xe(e,t){const n=Fs(e),i=t[n];if(i)return i;const s=n.split(".");for(const[o,r]of Object.entries(t)){if(!o.includes("*"))continue;const a=o.split(".");if(a.length!==s.length)continue;let l=!0;for(let c=0;c<s.length;c+=1)if(a[c]!=="*"&&a[c]!==s[c]){l=!1;break}if(l)return r}}function qe(e){return e.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/\s+/g," ").replace(/^./,t=>t.toUpperCase())}function nr(e,t){const n=e.trim();if(n==="")return;const i=Number(n);return!Number.isFinite(i)||t&&!Number.isInteger(i)?e:i}function ir(e){const t=e.trim();return t==="true"?!0:t==="false"?!1:e}function Ve(e,t){if(e==null)return e;if(t.allOf&&t.allOf.length>0){let i=e;for(const s of t.allOf)i=Ve(i,s);return i}const n=$e(t);if(t.anyOf||t.oneOf){const i=(t.anyOf??t.oneOf??[]).filter(s=>!(s.type==="null"||Array.isArray(s.type)&&s.type.includes("null")));if(i.length===1)return Ve(e,i[0]);if(typeof e=="string")for(const s of i){const o=$e(s);if(o==="number"||o==="integer"){const r=nr(e,o==="integer");if(r===void 0||typeof r=="number")return r}if(o==="boolean"){const r=ir(e);if(typeof r=="boolean")return r}}for(const s of i){const o=$e(s);if(o==="object"&&typeof e=="object"&&!Array.isArray(e)||o==="array"&&Array.isArray(e))return Ve(e,s)}return e}if(n==="number"||n==="integer"){if(typeof e=="string"){const i=nr(e,n==="integer");if(i===void 0||typeof i=="number")return i}return e}if(n==="boolean"){if(typeof e=="string"){const i=ir(e);if(typeof i=="boolean")return i}return e}if(n==="object"){if(typeof e!="object"||Array.isArray(e))return e;const i=e,s=t.properties??{},o=t.additionalProperties&&typeof t.additionalProperties=="object"?t.additionalProperties:null,r={};for(const[a,l]of Object.entries(i)){const c=s[a]??o,f=c?Ve(l,c):l;f!==void 0&&(r[a]=f)}return r}if(n==="array"){if(!Array.isArray(e))return e;if(Array.isArray(t.items)){const s=t.items;return e.map((o,r)=>{const a=r<s.length?s[r]:void 0;return a?Ve(o,a):o})}const i=t.items;return i?e.map(s=>Ve(s,i)).filter(s=>s!==void 0):e}return e}function gt(e){return typeof structuredClone=="function"?structuredClone(e):JSON.parse(JSON.stringify(e))}function hn(e){return`${JSON.stringify(e,null,2).trimEnd()}
`}function Ea(e,t,n){if(t.length===0)return;let i=e;for(let o=0;o<t.length-1;o+=1){const r=t[o],a=t[o+1];if(typeof r=="number"){if(!Array.isArray(i))return;i[r]==null&&(i[r]=typeof a=="number"?[]:{}),i=i[r]}else{if(typeof i!="object"||i==null)return;const l=i;l[r]==null&&(l[r]=typeof a=="number"?[]:{}),i=l[r]}}const s=t[t.length-1];if(typeof s=="number"){Array.isArray(i)&&(i[s]=n);return}typeof i=="object"&&i!=null&&(i[s]=n)}function Ra(e,t){if(t.length===0)return;let n=e;for(let s=0;s<t.length-1;s+=1){const o=t[s];if(typeof o=="number"){if(!Array.isArray(n))return;n=n[o]}else{if(typeof n!="object"||n==null)return;n=n[o]}if(n==null)return}const i=t[t.length-1];if(typeof i=="number"){Array.isArray(n)&&n.splice(i,1);return}typeof n=="object"&&n!=null&&delete n[i]}async function Fe(e){if(!(!e.client||!e.connected)){e.configLoading=!0,e.lastError=null;try{const t=await e.client.request("config.get",{});od(e,t)}catch(t){e.lastError=String(t)}finally{e.configLoading=!1}}}async function id(e){if(!(!e.client||!e.connected)&&!e.configSchemaLoading){e.configSchemaLoading=!0;try{const t=await e.client.request("config.schema",{});sd(e,t)}catch(t){e.lastError=String(t)}finally{e.configSchemaLoading=!1}}}function sd(e,t){e.configSchema=t.schema??null,e.configUiHints=t.uiHints??{},e.configSchemaVersion=t.version??null}function od(e,t){e.configSnapshot=t;const n=typeof t.raw=="string"?t.raw:t.config&&typeof t.config=="object"?hn(t.config):e.configRaw;!e.configFormDirty||e.configFormMode==="raw"?e.configRaw=n:e.configForm?e.configRaw=hn(e.configForm):e.configRaw=n,e.configValid=typeof t.valid=="boolean"?t.valid:null,e.configIssues=Array.isArray(t.issues)?t.issues:[],e.configFormDirty||(e.configForm=gt(t.config??{}),e.configFormOriginal=gt(t.config??{}),e.configRawOriginal=n)}function rd(e){return!e||typeof e!="object"||Array.isArray(e)?null:e}function La(e){if(e.configFormMode!=="form"||!e.configForm)return e.configRaw;const t=rd(e.configSchema),n=t?Ve(e.configForm,t):e.configForm;return hn(n)}async function Hn(e){var t;if(!(!e.client||!e.connected)){e.configSaving=!0,e.lastError=null;try{const n=La(e),i=(t=e.configSnapshot)==null?void 0:t.hash;if(!i){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.set",{raw:n,baseHash:i}),e.configFormDirty=!1,await Fe(e)}catch(n){e.lastError=String(n)}finally{e.configSaving=!1}}}async function ad(e){var t;if(!(!e.client||!e.connected)){e.configApplying=!0,e.lastError=null;try{const n=La(e),i=(t=e.configSnapshot)==null?void 0:t.hash;if(!i){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.apply",{raw:n,baseHash:i,sessionKey:e.applySessionKey}),e.configFormDirty=!1,await Fe(e)}catch(n){e.lastError=String(n)}finally{e.configApplying=!1}}}async function ld(e){if(!(!e.client||!e.connected)){e.updateRunning=!0,e.lastError=null;try{await e.client.request("update.run",{sessionKey:e.applySessionKey})}catch(t){e.lastError=String(t)}finally{e.updateRunning=!1}}}function we(e,t,n){var s;const i=gt(e.configForm??((s=e.configSnapshot)==null?void 0:s.config)??{});Ea(i,t,n),e.configForm=i,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=hn(i))}function Ke(e,t){var i;const n=gt(e.configForm??((i=e.configSnapshot)==null?void 0:i.config)??{});Ra(n,t),e.configForm=n,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=hn(n))}function cd(e){const t={name:(e==null?void 0:e.name)??"",displayName:(e==null?void 0:e.displayName)??"",about:(e==null?void 0:e.about)??"",picture:(e==null?void 0:e.picture)??"",banner:(e==null?void 0:e.banner)??"",website:(e==null?void 0:e.website)??"",nip05:(e==null?void 0:e.nip05)??"",lud16:(e==null?void 0:e.lud16)??""};return{values:t,original:{...t},saving:!1,importing:!1,error:null,success:null,fieldErrors:{},showAdvanced:!!(e!=null&&e.banner||e!=null&&e.website||e!=null&&e.nip05||e!=null&&e.lud16)}}async function dd(e,t){await ed(e,t),await ke(e,!0)}async function ud(e){await td(e),await ke(e,!0)}async function fd(e){await nd(e),await ke(e,!0)}async function pd(e){await Hn(e),await Fe(e),await ke(e,!0)}async function gd(e){await Fe(e),await ke(e,!0)}function hd(e){if(!Array.isArray(e))return{};const t={};for(const n of e){if(typeof n!="string")continue;const[i,...s]=n.split(":");if(!i||s.length===0)continue;const o=i.trim(),r=s.join(":").trim();o&&r&&(t[o]=r)}return t}function Ia(e){var n,i,s;return((s=(((i=(n=e.channelsSnapshot)==null?void 0:n.channelAccounts)==null?void 0:i.nostr)??[])[0])==null?void 0:s.accountId)??e.nostrProfileAccountId??"default"}function Ma(e,t=""){return`/api/channels/nostr/${encodeURIComponent(e)}/profile${t}`}function md(e){var s,o,r;const t=(r=(o=(s=e.hello)==null?void 0:s.auth)==null?void 0:o.deviceToken)==null?void 0:r.trim();if(t)return`Bearer ${t}`;const n=e.settings.token.trim();if(n)return`Bearer ${n}`;const i=e.password.trim();return i?`Bearer ${i}`:null}function Pa(e){const t=md(e);return t?{Authorization:t}:{}}function vd(e,t,n){e.nostrProfileAccountId=t,e.nostrProfileFormState=cd(n??void 0)}function yd(e){e.nostrProfileFormState=null,e.nostrProfileAccountId=null}function bd(e,t,n){const i=e.nostrProfileFormState;i&&(e.nostrProfileFormState={...i,values:{...i.values,[t]:n},fieldErrors:{...i.fieldErrors,[t]:""}})}function wd(e){const t=e.nostrProfileFormState;t&&(e.nostrProfileFormState={...t,showAdvanced:!t.showAdvanced})}async function $d(e){const t=e.nostrProfileFormState;if(!t||t.saving)return;const n=Ia(e);e.nostrProfileFormState={...t,saving:!0,error:null,success:null,fieldErrors:{}};try{const i=await fetch(Ma(n),{method:"PUT",headers:{"Content-Type":"application/json",...Pa(e)},body:JSON.stringify(t.values)}),s=await i.json().catch(()=>null);if(!i.ok||(s==null?void 0:s.ok)===!1||!s){const o=(s==null?void 0:s.error)??`Profile update failed (${i.status})`;e.nostrProfileFormState={...t,saving:!1,error:o,success:null,fieldErrors:hd(s==null?void 0:s.details)};return}if(!s.persisted){e.nostrProfileFormState={...t,saving:!1,error:"Profile publish failed on all relays.",success:null};return}e.nostrProfileFormState={...t,saving:!1,error:null,success:"Profile published to relays.",fieldErrors:{},original:{...t.values}},await ke(e,!0)}catch(i){e.nostrProfileFormState={...t,saving:!1,error:`Profile update failed: ${String(i)}`,success:null}}}async function xd(e){const t=e.nostrProfileFormState;if(!t||t.importing)return;const n=Ia(e);e.nostrProfileFormState={...t,importing:!0,error:null,success:null};try{const i=await fetch(Ma(n,"/import"),{method:"POST",headers:{"Content-Type":"application/json",...Pa(e)},body:JSON.stringify({autoMerge:!0})}),s=await i.json().catch(()=>null);if(!i.ok||(s==null?void 0:s.ok)===!1||!s){const l=(s==null?void 0:s.error)??`Profile import failed (${i.status})`;e.nostrProfileFormState={...t,importing:!1,error:l,success:null};return}const o=s.merged??s.imported??null,r=o?{...t.values,...o}:t.values,a=!!(r.banner||r.website||r.nip05||r.lud16);e.nostrProfileFormState={...t,importing:!1,values:r,error:null,success:s.saved?"Profile imported from relays. Review and publish.":"Profile imported. Review and publish.",showAdvanced:a},s.saved&&await ke(e,!0)}catch(i){e.nostrProfileFormState={...t,importing:!1,error:`Profile import failed: ${String(i)}`,success:null}}}function Da(e){var o;const t=(e??"").trim();if(!t)return null;const n=t.split(":").filter(Boolean);if(n.length<3||n[0]!=="agent")return null;const i=(o=n[1])==null?void 0:o.trim(),s=n.slice(2).join(":");return!i||!s?null:{agentId:i,rest:s}}const is=450;function wn(e,t=!1,n=!1){e.chatScrollFrame&&cancelAnimationFrame(e.chatScrollFrame),e.chatScrollTimeout!=null&&(clearTimeout(e.chatScrollTimeout),e.chatScrollTimeout=null);const i=()=>{const s=e.querySelector(".chat-thread");if(s){const o=getComputedStyle(s).overflowY;if(o==="auto"||o==="scroll"||s.scrollHeight-s.clientHeight>1)return s}return document.scrollingElement??document.documentElement};e.updateComplete.then(()=>{e.chatScrollFrame=requestAnimationFrame(()=>{e.chatScrollFrame=null;const s=i();if(!s)return;const o=s.scrollHeight-s.scrollTop-s.clientHeight,r=t&&!e.chatHasAutoScrolled;if(!(r||e.chatUserNearBottom||o<is)){e.chatNewMessagesBelow=!0;return}r&&(e.chatHasAutoScrolled=!0);const l=n&&(typeof window>"u"||typeof window.matchMedia!="function"||!window.matchMedia("(prefers-reduced-motion: reduce)").matches),c=s.scrollHeight;typeof s.scrollTo=="function"?s.scrollTo({top:c,behavior:l?"smooth":"auto"}):s.scrollTop=c,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1;const f=r?150:120;e.chatScrollTimeout=window.setTimeout(()=>{e.chatScrollTimeout=null;const u=i();if(!u)return;const p=u.scrollHeight-u.scrollTop-u.clientHeight;(r||e.chatUserNearBottom||p<is)&&(u.scrollTop=u.scrollHeight,e.chatUserNearBottom=!0)},f)})})}function Fa(e,t=!1){e.logsScrollFrame&&cancelAnimationFrame(e.logsScrollFrame),e.updateComplete.then(()=>{e.logsScrollFrame=requestAnimationFrame(()=>{e.logsScrollFrame=null;const n=e.querySelector(".log-stream");if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;(t||i<80)&&(n.scrollTop=n.scrollHeight)})})}function kd(e,t){const n=t.currentTarget;if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;e.chatUserNearBottom=i<is,e.chatUserNearBottom&&(e.chatNewMessagesBelow=!1)}function Sd(e,t){const n=t.currentTarget;if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;e.logsAtBottom=i<80}function sr(e){e.chatHasAutoScrolled=!1,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1}function Ad(e,t){if(e.length===0)return;const n=new Blob([`${e.join(`
`)}
`],{type:"text/plain"}),i=URL.createObjectURL(n),s=document.createElement("a"),o=new Date().toISOString().slice(0,19).replace(/[:T]/g,"-");s.href=i,s.download=`openclaw-logs-${t}-${o}.log`,s.click(),URL.revokeObjectURL(i)}function _d(e){if(typeof ResizeObserver>"u")return;const t=e.querySelector(".topbar");if(!t)return;const n=()=>{const{height:i}=t.getBoundingClientRect();e.style.setProperty("--topbar-height",`${i}px`)};n(),e.topbarObserver=new ResizeObserver(()=>n()),e.topbarObserver.observe(t)}async function li(e){if(!(!e.client||!e.connected)&&!e.debugLoading){e.debugLoading=!0;try{const[t,n,i,s]=await Promise.all([e.client.request("status",{}),e.client.request("health",{}),e.client.request("models.list",{}),e.client.request("last-heartbeat",{})]);e.debugStatus=t,e.debugHealth=n;const o=i;e.debugModels=Array.isArray(o==null?void 0:o.models)?o==null?void 0:o.models:[],e.debugHeartbeat=s}catch(t){e.debugCallError=String(t)}finally{e.debugLoading=!1}}}async function Cd(e){if(!(!e.client||!e.connected)){e.debugCallError=null,e.debugCallResult=null;try{const t=e.debugCallParams.trim()?JSON.parse(e.debugCallParams):{},n=await e.client.request(e.debugCallMethod.trim(),t);e.debugCallResult=JSON.stringify(n,null,2)}catch(t){e.debugCallError=String(t)}}}const Td=2e3,Ed=new Set(["trace","debug","info","warn","error","fatal"]);function Rd(e){if(typeof e!="string")return null;const t=e.trim();if(!t.startsWith("{")||!t.endsWith("}"))return null;try{const n=JSON.parse(t);return!n||typeof n!="object"?null:n}catch{return null}}function Ld(e){if(typeof e!="string")return null;const t=e.toLowerCase();return Ed.has(t)?t:null}function Id(e){if(!e.trim())return{raw:e,message:e};try{const t=JSON.parse(e),n=t&&typeof t._meta=="object"&&t._meta!==null?t._meta:null,i=typeof t.time=="string"?t.time:typeof(n==null?void 0:n.date)=="string"?n==null?void 0:n.date:null,s=Ld((n==null?void 0:n.logLevelName)??(n==null?void 0:n.level)),o=typeof t[0]=="string"?t[0]:typeof(n==null?void 0:n.name)=="string"?n==null?void 0:n.name:null,r=Rd(o);let a=null;r&&(typeof r.subsystem=="string"?a=r.subsystem:typeof r.module=="string"&&(a=r.module)),!a&&o&&o.length<120&&(a=o);let l=null;return typeof t[1]=="string"?l=t[1]:!r&&typeof t[0]=="string"?l=t[0]:typeof t.message=="string"&&(l=t.message),{raw:e,time:i,level:s,subsystem:a,message:l??e,meta:n??void 0}}catch{return{raw:e,message:e}}}async function Ns(e,t){if(!(!e.client||!e.connected)&&!(e.logsLoading&&!(t!=null&&t.quiet))){t!=null&&t.quiet||(e.logsLoading=!0),e.logsError=null;try{const i=await e.client.request("logs.tail",{cursor:t!=null&&t.reset?void 0:e.logsCursor??void 0,limit:e.logsLimit,maxBytes:e.logsMaxBytes}),o=(Array.isArray(i.lines)?i.lines.filter(a=>typeof a=="string"):[]).map(Id),r=!!(t!=null&&t.reset||i.reset||e.logsCursor==null);e.logsEntries=r?o:[...e.logsEntries,...o].slice(-Td),typeof i.cursor=="number"&&(e.logsCursor=i.cursor),typeof i.file=="string"&&(e.logsFile=i.file),e.logsTruncated=!!i.truncated,e.logsLastFetchAt=Date.now()}catch(n){e.logsError=String(n)}finally{t!=null&&t.quiet||(e.logsLoading=!1)}}}async function ci(e,t){if(!(!e.client||!e.connected)&&!e.nodesLoading){e.nodesLoading=!0,t!=null&&t.quiet||(e.lastError=null);try{const n=await e.client.request("node.list",{});e.nodes=Array.isArray(n.nodes)?n.nodes:[]}catch(n){t!=null&&t.quiet||(e.lastError=String(n))}finally{e.nodesLoading=!1}}}function Md(e){e.nodesPollInterval==null&&(e.nodesPollInterval=window.setInterval(()=>void ci(e,{quiet:!0}),5e3))}function Pd(e){e.nodesPollInterval!=null&&(clearInterval(e.nodesPollInterval),e.nodesPollInterval=null)}function Os(e){e.logsPollInterval==null&&(e.logsPollInterval=window.setInterval(()=>{e.tab==="logs"&&Ns(e,{quiet:!0})},2e3))}function Bs(e){e.logsPollInterval!=null&&(clearInterval(e.logsPollInterval),e.logsPollInterval=null)}function Us(e){e.debugPollInterval==null&&(e.debugPollInterval=window.setInterval(()=>{e.tab==="debug"&&li(e)},3e3))}function zs(e){e.debugPollInterval!=null&&(clearInterval(e.debugPollInterval),e.debugPollInterval=null)}async function Na(e,t){if(!(!e.client||!e.connected||e.agentIdentityLoading)&&!e.agentIdentityById[t]){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{const n=await e.client.request("agent.identity.get",{agentId:t});n&&(e.agentIdentityById={...e.agentIdentityById,[t]:n})}catch(n){e.agentIdentityError=String(n)}finally{e.agentIdentityLoading=!1}}}async function Oa(e,t){if(!e.client||!e.connected||e.agentIdentityLoading)return;const n=t.filter(i=>!e.agentIdentityById[i]);if(n.length!==0){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{for(const i of n){const s=await e.client.request("agent.identity.get",{agentId:i});s&&(e.agentIdentityById={...e.agentIdentityById,[i]:s})}}catch(i){e.agentIdentityError=String(i)}finally{e.agentIdentityLoading=!1}}}async function jn(e,t){if(!(!e.client||!e.connected)&&!e.agentSkillsLoading){e.agentSkillsLoading=!0,e.agentSkillsError=null;try{const n=await e.client.request("skills.status",{agentId:t});n&&(e.agentSkillsReport=n,e.agentSkillsAgentId=t)}catch(n){e.agentSkillsError=String(n)}finally{e.agentSkillsLoading=!1}}}async function Ks(e){var t;if(!(!e.client||!e.connected)&&!e.agentsLoading){e.agentsLoading=!0,e.agentsError=null;try{const n=await e.client.request("agents.list",{});if(n){e.agentsList=n;const i=e.agentsSelectedId,s=n.agents.some(o=>o.id===i);(!i||!s)&&(e.agentsSelectedId=n.defaultId??((t=n.agents[0])==null?void 0:t.id)??null)}}catch(n){e.agentsError=String(n)}finally{e.agentsLoading=!1}}}function Hs(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}async function Dd(e){try{const n=await(await fetch(Hs(e.basePath,"/api/business-knowledge/dependent-files"))).json().catch(()=>({}));n.success&&n.data?e.bkDependentFiles={mapping_table:n.data.mapping_table??"",price_library:n.data.price_library??""}:e.bkDependentFiles=null}catch{e.bkDependentFiles=null}}async function Ba(e){e.bkLoading=!0,e.bkError=null,Dd(e);try{const t=await fetch(Hs(e.basePath,"/api/business-knowledge")),n=await t.json().catch(()=>({}));n.success&&n.data&&typeof n.data.content=="string"?e.bkContent=n.data.content:(e.bkContent="",t.ok||(e.bkError=n.detail??`HTTP ${t.status}`))}catch(t){e.bkError=t instanceof Error?t.message:String(t),e.bkContent=""}finally{e.bkLoading=!1}}async function Fd(e,t){e.bkSaving=!0,e.bkError=null;try{const n=await fetch(Hs(e.basePath,"/api/business-knowledge"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:t})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(e.bkContent=t,e.bkLastSuccess=Date.now(),!0):(e.bkError=i.detail??`HTTP ${n.status}`,!1)}catch(n){return e.bkError=n instanceof Error?n.message:String(n),!1}finally{e.bkSaving=!1}}function Ua(e){if(e==null||!Number.isFinite(e))return"n/a";const t=Math.floor(e/1e3),n=Math.floor(t/60),i=Math.floor(n/60);return i>0?`${i}h`:n>0?`${n}m`:t>0?`${t}s`:"<1s"}function wt(e){if(e==null||!Number.isFinite(e))return"n/a";const t=Date.now(),n=e-t,i=Math.abs(n),s=Math.floor(i/6e4),o=Math.floor(s/60),r=Math.floor(o/24);return n>0?s<1?"in <1m":s<60?`in ${s}m`:o<24?`in ${o}h`:`in ${r}d`:i<15e3?"just now":s<60?`${s}m ago`:o<24?`${o}h ago`:`${r}d ago`}function Nd(e,t){return!e||typeof e!="string"?"":e.replace(/<think>[\s\S]*?<\/think>/gi,"").trim()}function Jn(e){return!e&&e!==0?"n/a":new Date(e).toLocaleString()}function ss(e){return!e||e.length===0?"none":e.filter(t=>!!(t&&t.trim())).join(", ")}function os(e,t=120){return e.length<=t?e:`${e.slice(0,Math.max(0,t-1))}…`}function za(e,t){return e.length<=t?{text:e,truncated:!1,total:e.length}:{text:e.slice(0,Math.max(0,t)),truncated:!0,total:e.length}}function or(e,t){const n=Number(e);return Number.isFinite(n)?n:t}function Fi(e){return Nd(e)}async function Ka(e){if(!(!e.client||!e.connected))try{const t=await e.client.request("cron.status",{});e.cronStatus=t}catch(t){e.cronError=String(t)}}async function Od(e){if(!(!e.client||!e.connected)&&!e.cronLoading){e.cronLoading=!0,e.cronError=null;try{const t=await e.client.request("cron.list",{includeDisabled:!0});e.cronJobs=Array.isArray(t.jobs)?t.jobs:[]}catch(t){e.cronError=String(t)}finally{e.cronLoading=!1}}}class le extends Error{constructor(t,n){super(`Invalid response schema from ${t}: ${n}`),this.name="ResponseSchemaError",this.endpoint=t}}function Ha(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function ie(e,t,n="response"){if(!Ha(e))throw new le(t,`${n} must be an object`);return e}function Bt(e,t,n){if(!Array.isArray(e))throw new le(t,`${n} must be an array`);return e}function Ye(e,t,n){if(typeof e!="string")throw new le(t,`${n} must be a string`);return e}function Bd(e,t,n){if(typeof e!="number"||Number.isNaN(e))throw new le(t,`${n} must be a number`);return e}function G(e){return typeof e=="string"?e:void 0}function ge(e){return typeof e=="number"&&Number.isFinite(e)?e:void 0}function js(e){return typeof e=="boolean"?e:void 0}function Ne(e,t){return Ha(e)?typeof e.detail=="string"&&e.detail.trim()?e.detail.trim():typeof e.error=="string"&&e.error.trim()?e.error.trim():typeof e.message=="string"&&e.message.trim()?e.message.trim():t:t}function fe(e,t,n,i){return`${e}失败：${t}。影响：${n}。下一步：${i}`}const Ln="/api/quotation-drafts",rr="/api/quotation-drafts/{id}",Ud="/api/quotation-drafts/{id}/confirm",ar=new WeakMap;function zd(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams(n);return`${s}?${o.toString()}`}function Kd(e,t){var s;const n=globalThis,i=typeof((s=n.crypto)==null?void 0:s.randomUUID)=="function"?n.crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2,10)}`;return`${e}:${t}:${i}`}function Hd(e){let t=ar.get(e);return t||(t=new Map,ar.set(e,t)),t}function ja(e,t){const n=ie(e,t,"data[]"),s=ge(n.id)??Number(n.id);return{id:Number.isFinite(s)?s:0,draft_no:Ye(n.draft_no,t,"data[].draft_no"),name:Ye(n.name,t,"data[].name"),source:G(n.source),file_path:typeof n.file_path=="string"?n.file_path:null,created_at:G(n.created_at)??null,status:Ye(n.status,t,"data[].status"),confirmed_at:G(n.confirmed_at)??null}}function jd(e,t){const n=ie(e,t,"data"),i=ja(n,t),o=Bt(n.lines,t,"data.lines").map(r=>ie(r,t,"data.lines[]"));return{...i,lines:o}}function qd(e,t){const n=ie(e,t),i=n.data!=null?ie(n.data,t,"data"):{},s=G(i.order_id)??G(n.order_id),o=G(i.message)??G(n.message)??"已确认成单";return{order_id:s,message:o}}async function qs(e){e.fulfillDraftsLoading=!0,e.fulfillDraftsError=null;try{const t=zd(e.basePath,Ln,{status:"pending",limit:"50"}),n=await fetch(t),i=await n.json().catch(()=>({}));if(!n.ok){e.fulfillDraftsError=fe("加载待确认报价单列表",Ne(i,`HTTP ${n.status}`),"无法查看最新待确认报价单","点击“重试”重新加载列表"),e.fulfillDrafts=[];return}const s=ie(i,Ln),o=Bt(s.data,Ln,"data");e.fulfillDrafts=o.map(r=>ja(r,Ln)).filter(r=>r.id>0)}catch(t){const n=t instanceof le||t instanceof Error?t.message:String(t);e.fulfillDraftsError=fe("加载待确认报价单列表",n,"列表可能为空或字段错位","检查后端返回字段后重试"),e.fulfillDrafts=[]}finally{e.fulfillDraftsLoading=!1}}async function Wd(e,t){var n;e.fulfillDetailId=t;try{const i=(n=e.basePath)!=null&&n.trim()?`${e.basePath.replace(/\/$/,"")}/api/quotation-drafts/${t}`:`/api/quotation-drafts/${t}`,s=await fetch(i),o=await s.json().catch(()=>({}));if(!s.ok){e.fulfillDetail=null,e.fulfillConfirmResult={message:fe("加载报价单详情",Ne(o,`HTTP ${s.status}`),"无法确认该报价单","点击“重试”或返回列表后重选")};return}const r=ie(o,rr);e.fulfillDetail=jd(r.data,rr)}catch(i){const s=i instanceof le||i instanceof Error?i.message:String(i);e.fulfillDetail=null,e.fulfillConfirmResult={message:fe("加载报价单详情",s,"无法确认该报价单","点击“重试”或返回列表后重选")}}}async function Gd(e,t){const n=Hd(e),i=n.get(t);if(i)return i;const s=(async()=>{var o;e.fulfillConfirmBusy=!0,e.fulfillConfirmResult=null;try{const r=(o=e.basePath)!=null&&o.trim()?`${e.basePath.replace(/\/$/,"")}/api/quotation-drafts/${t}/confirm`:`/api/quotation-drafts/${t}/confirm`,a=Kd("fulfill-confirm",String(t)),l=await fetch(r,{method:"PATCH",headers:{"X-Idempotency-Key":a,"Idempotency-Key":a}}),c=await l.json().catch(()=>({}));if(!l.ok)return e.fulfillConfirmResult={message:fe("确认成单",Ne(c,`HTTP ${l.status}`),"该报价单仍为待确认，库存未锁定","点击“重试”再次确认")},e.fulfillConfirmResult;const f=qd(c,Ud);return e.fulfillConfirmResult=f,e.fulfillDetail=null,e.fulfillDetailId=null,await qs(e),f}catch(r){const a=r instanceof le||r instanceof Error?r.message:String(r);return e.fulfillConfirmResult={message:fe("确认成单",a,"该报价单仍为待确认，库存未锁定","点击“重试”再次确认")},e.fulfillConfirmResult}finally{e.fulfillConfirmBusy=!1,n.delete(t)}})();return n.set(t,s),s}function _e(e){return`${e.product_key??""}	${e.specification??""}	${e.code??""}`}const In="/api/shortage/list",rn="/api/procurement/approve",lr=new WeakMap;function Vd(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams(n);return`${s}?${o.toString()}`}function Qd(e,t){var s;const n=globalThis,i=typeof((s=n.crypto)==null?void 0:s.randomUUID)=="function"?n.crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2,10)}`;return`${e}:${t}:${i}`}function Jd(e){let t=lr.get(e);return t||(t=new Map,lr.set(e,t)),t}function Lt(e){const t=ge(e);if(t!=null)return t;const n=Number(e);return Number.isFinite(n)?n:void 0}function Yd(e,t){const n=ie(e,t,"data[]");return{id:Lt(n.id),product_name:G(n.product_name),specification:G(n.specification),quantity:Lt(n.quantity),available_qty:Lt(n.available_qty),shortfall:Lt(n.shortfall),code:G(n.code),quote_name:G(n.quote_name),unit_price:Lt(n.unit_price),file_name:G(n.file_name),uploaded_at:G(n.uploaded_at)??null,product_key:G(n.product_key),count:Lt(n.count)}}function Xd(e){const t=new Map;for(const n of e){const i=_e(n);if(!i.trim())continue;const s=t.get(i);if(!s){t.set(i,n);continue}const o=Number(s.count??0),r=Number(n.count??0),a=s.uploaded_at?new Date(s.uploaded_at).getTime():0,l=n.uploaded_at?new Date(n.uploaded_at).getTime():0;(r>o||r===o&&l>=a)&&t.set(i,n)}return Array.from(t.values())}function Zd(e){const t=ie(e,rn),n=t.data!=null?ie(t.data,rn,"data"):{},i=ge(t.approved_count)??ge(n.approved_count)??(t.approved_count!=null?Bd(t.approved_count,rn,"approved_count"):void 0),s=G(t.message)??G(n.message)??"已批准并通知采购员。";return{approved_count:i,message:s}}function eu(e){return e.map(n=>`${n.product_key??""}|${n.product_name??""}|${n.specification??""}|${n.code??""}|${n.shortfall??0}`).sort().join(";")}async function Ws(e){e.procurementLoading=!0,e.procurementError=null;try{const t=Vd(e.basePath,In,{limit:"200",unapproved_only:"1"}),n=await fetch(t),i=await n.json().catch(()=>({}));if(!n.ok){e.procurementError=fe("加载采购建议列表",Ne(i,`HTTP ${n.status}`),"无法查看最新缺货采购建议","点击“重试”重新加载列表"),e.procurementSuggestions=[];return}const s=ie(i,In),o=Bt(s.data,In,"data");e.procurementSuggestions=Xd(o.map(r=>Yd(r,In)))}catch(t){const n=t instanceof le||t instanceof Error?t.message:String(t);e.procurementError=fe("加载采购建议列表",n,"列表可能为空或字段错位","检查后端返回字段后重试"),e.procurementSuggestions=[]}finally{e.procurementLoading=!1}}async function cr(e,t){if(!t.length)return null;const n=eu(t),i=Jd(e),s=i.get(n);if(s)return s;const o=(async()=>{var r;e.procurementApproveBusy=!0,e.procurementApproveResult=null;try{const a=(r=e.basePath)!=null&&r.trim()?`${e.basePath.replace(/\/$/,"")}${rn}`:rn,l=Qd("procurement-approve",n||"single"),c=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json","X-Idempotency-Key":l,"Idempotency-Key":l},body:JSON.stringify({items:t})}),f=await c.json().catch(()=>({}));if(!c.ok)return e.procurementApproveResult={message:fe("采购批准",Ne(f,`HTTP ${c.status}`),"这些缺货项仍待批准，采购员未收到通知","点击“重试”再次批准")},e.procurementApproveResult;const u=Zd(f);return e.procurementApproveResult=u,await Ws(e),u}catch(a){const l=a instanceof le||a instanceof Error?a.message:String(a);return e.procurementApproveResult={message:fe("采购批准",l,"这些缺货项仍待批准，采购员未收到通知","点击“重试”再次批准")},e.procurementApproveResult}finally{e.procurementApproveBusy=!1,i.delete(n)}})();return i.set(n,o),o}function Gs(e){return(e??"").trim().toLowerCase()||"viewer"}function tu(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").map(t=>t.trim()).filter(Boolean):[]}const qa="openclaw.device.auth.v1";function Vs(){try{const e=window.localStorage.getItem(qa);if(!e)return null;const t=JSON.parse(e);return!t||t.version!==1||!t.deviceId||typeof t.deviceId!="string"||!t.tokens||typeof t.tokens!="object"?null:t}catch{return null}}function Wa(e){try{window.localStorage.setItem(qa,JSON.stringify(e))}catch{}}function nu(e){const t=Vs();if(!t||t.deviceId!==e.deviceId)return null;const n=Gs(e.role),i=t.tokens[n];return!i||typeof i.token!="string"?null:i}function Ga(e){const t=Gs(e.role),n={version:1,deviceId:e.deviceId,tokens:{}},i=Vs();i&&i.deviceId===e.deviceId&&(n.tokens={...i.tokens});const s={token:e.token,role:t,scopes:tu(e.scopes),updatedAtMs:Date.now()};return n.tokens[t]=s,Wa(n),s}function Va(e){const t=Vs();if(!t||t.deviceId!==e.deviceId)return;const n=Gs(e.role);if(!t.tokens[n])return;const i={...t,tokens:{...t.tokens}};delete i.tokens[n],Wa(i)}/*! noble-ed25519 - MIT License (c) 2019 Paul Miller (paulmillr.com) */const Qa={p:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffedn,n:0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn,h:8n,a:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffecn,d:0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3n,Gx:0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an,Gy:0x6666666666666666666666666666666666666666666666666666666666666658n},{p:ue,n:qn,Gx:dr,Gy:ur,a:Ni,d:Oi,h:iu}=Qa,ht=32,Qs=64,su=(...e)=>{"captureStackTrace"in Error&&typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(...e)},oe=(e="")=>{const t=new Error(e);throw su(t,oe),t},ou=e=>typeof e=="bigint",ru=e=>typeof e=="string",au=e=>e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array",tt=(e,t,n="")=>{const i=au(e),s=e==null?void 0:e.length,o=t!==void 0;if(!i||o&&s!==t){const r=n&&`"${n}" `,a=o?` of length ${t}`:"",l=i?`length=${s}`:`type=${typeof e}`;oe(r+"expected Uint8Array"+a+", got "+l)}return e},di=e=>new Uint8Array(e),Ja=e=>Uint8Array.from(e),Ya=(e,t)=>e.toString(16).padStart(t,"0"),Xa=e=>Array.from(tt(e)).map(t=>Ya(t,2)).join(""),He={_0:48,_9:57,A:65,F:70,a:97,f:102},fr=e=>{if(e>=He._0&&e<=He._9)return e-He._0;if(e>=He.A&&e<=He.F)return e-(He.A-10);if(e>=He.a&&e<=He.f)return e-(He.a-10)},Za=e=>{const t="hex invalid";if(!ru(e))return oe(t);const n=e.length,i=n/2;if(n%2)return oe(t);const s=di(i);for(let o=0,r=0;o<i;o++,r+=2){const a=fr(e.charCodeAt(r)),l=fr(e.charCodeAt(r+1));if(a===void 0||l===void 0)return oe(t);s[o]=a*16+l}return s},el=()=>globalThis==null?void 0:globalThis.crypto,lu=()=>{var e;return((e=el())==null?void 0:e.subtle)??oe("crypto.subtle must be defined, consider polyfill")},mn=(...e)=>{const t=di(e.reduce((i,s)=>i+tt(s).length,0));let n=0;return e.forEach(i=>{t.set(i,n),n+=i.length}),t},cu=(e=ht)=>el().getRandomValues(di(e)),Yn=BigInt,lt=(e,t,n,i="bad number: out of range")=>ou(e)&&t<=e&&e<n?e:oe(i),M=(e,t=ue)=>{const n=e%t;return n>=0n?n:t+n},tl=e=>M(e,qn),du=(e,t)=>{(e===0n||t<=0n)&&oe("no inverse n="+e+" mod="+t);let n=M(e,t),i=t,s=0n,o=1n;for(;n!==0n;){const r=i/n,a=i%n,l=s-o*r;i=n,n=a,s=o,o=l}return i===1n?M(s,t):oe("no inverse")},uu=e=>{const t=ol[e];return typeof t!="function"&&oe("hashes."+e+" not set"),t},Bi=e=>e instanceof mt?e:oe("Point expected"),rs=2n**256n,Pe=class Pe{constructor(t,n,i,s){W(this,"X");W(this,"Y");W(this,"Z");W(this,"T");const o=rs;this.X=lt(t,0n,o),this.Y=lt(n,0n,o),this.Z=lt(i,1n,o),this.T=lt(s,0n,o),Object.freeze(this)}static CURVE(){return Qa}static fromAffine(t){return new Pe(t.x,t.y,1n,M(t.x*t.y))}static fromBytes(t,n=!1){const i=Oi,s=Ja(tt(t,ht)),o=t[31];s[31]=o&-129;const r=il(s);lt(r,0n,n?rs:ue);const l=M(r*r),c=M(l-1n),f=M(i*l+1n);let{isValid:u,value:p}=pu(c,f);u||oe("bad point: y not sqrt");const b=(p&1n)===1n,x=(o&128)!==0;return!n&&p===0n&&x&&oe("bad point: x==0, isLastByteOdd"),x!==b&&(p=M(-p)),new Pe(p,r,1n,M(p*r))}static fromHex(t,n){return Pe.fromBytes(Za(t),n)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}assertValidity(){const t=Ni,n=Oi,i=this;if(i.is0())return oe("bad point: ZERO");const{X:s,Y:o,Z:r,T:a}=i,l=M(s*s),c=M(o*o),f=M(r*r),u=M(f*f),p=M(l*t),b=M(f*M(p+c)),x=M(u+M(n*M(l*c)));if(b!==x)return oe("bad point: equation left != right (1)");const k=M(s*o),S=M(r*a);return k!==S?oe("bad point: equation left != right (2)"):this}equals(t){const{X:n,Y:i,Z:s}=this,{X:o,Y:r,Z:a}=Bi(t),l=M(n*a),c=M(o*s),f=M(i*a),u=M(r*s);return l===c&&f===u}is0(){return this.equals(Mt)}negate(){return new Pe(M(-this.X),this.Y,this.Z,M(-this.T))}double(){const{X:t,Y:n,Z:i}=this,s=Ni,o=M(t*t),r=M(n*n),a=M(2n*M(i*i)),l=M(s*o),c=t+n,f=M(M(c*c)-o-r),u=l+r,p=u-a,b=l-r,x=M(f*p),k=M(u*b),S=M(f*b),R=M(p*u);return new Pe(x,k,R,S)}add(t){const{X:n,Y:i,Z:s,T:o}=this,{X:r,Y:a,Z:l,T:c}=Bi(t),f=Ni,u=Oi,p=M(n*r),b=M(i*a),x=M(o*u*c),k=M(s*l),S=M((n+i)*(r+a)-p-b),R=M(k-x),P=M(k+x),F=M(b-f*p),I=M(S*R),A=M(P*F),g=M(S*F),_=M(R*P);return new Pe(I,A,_,g)}subtract(t){return this.add(Bi(t).negate())}multiply(t,n=!0){if(!n&&(t===0n||this.is0()))return Mt;if(lt(t,1n,qn),t===1n)return this;if(this.equals(vt))return Su(t).p;let i=Mt,s=vt;for(let o=this;t>0n;o=o.double(),t>>=1n)t&1n?i=i.add(o):n&&(s=s.add(o));return i}multiplyUnsafe(t){return this.multiply(t,!1)}toAffine(){const{X:t,Y:n,Z:i}=this;if(this.equals(Mt))return{x:0n,y:1n};const s=du(i,ue);M(i*s)!==1n&&oe("invalid inverse");const o=M(t*s),r=M(n*s);return{x:o,y:r}}toBytes(){const{x:t,y:n}=this.assertValidity().toAffine(),i=nl(n);return i[31]|=t&1n?128:0,i}toHex(){return Xa(this.toBytes())}clearCofactor(){return this.multiply(Yn(iu),!1)}isSmallOrder(){return this.clearCofactor().is0()}isTorsionFree(){let t=this.multiply(qn/2n,!1).double();return qn%2n&&(t=t.add(this)),t.is0()}};W(Pe,"BASE"),W(Pe,"ZERO");let mt=Pe;const vt=new mt(dr,ur,1n,M(dr*ur)),Mt=new mt(0n,1n,1n,0n);mt.BASE=vt;mt.ZERO=Mt;const nl=e=>Za(Ya(lt(e,0n,rs),Qs)).reverse(),il=e=>Yn("0x"+Xa(Ja(tt(e)).reverse())),Le=(e,t)=>{let n=e;for(;t-- >0n;)n*=n,n%=ue;return n},fu=e=>{const n=e*e%ue*e%ue,i=Le(n,2n)*n%ue,s=Le(i,1n)*e%ue,o=Le(s,5n)*s%ue,r=Le(o,10n)*o%ue,a=Le(r,20n)*r%ue,l=Le(a,40n)*a%ue,c=Le(l,80n)*l%ue,f=Le(c,80n)*l%ue,u=Le(f,10n)*o%ue;return{pow_p_5_8:Le(u,2n)*e%ue,b2:n}},pr=0x2b8324804fc1df0b2b4d00993dfbd7a72f431806ad2fe478c4ee1b274a0ea0b0n,pu=(e,t)=>{const n=M(t*t*t),i=M(n*n*t),s=fu(e*i).pow_p_5_8;let o=M(e*n*s);const r=M(t*o*o),a=o,l=M(o*pr),c=r===e,f=r===M(-e),u=r===M(-e*pr);return c&&(o=a),(f||u)&&(o=l),(M(o)&1n)===1n&&(o=M(-o)),{isValid:c||f,value:o}},as=e=>tl(il(e)),Js=(...e)=>ol.sha512Async(mn(...e)),gu=(...e)=>uu("sha512")(mn(...e)),sl=e=>{const t=e.slice(0,ht);t[0]&=248,t[31]&=127,t[31]|=64;const n=e.slice(ht,Qs),i=as(t),s=vt.multiply(i),o=s.toBytes();return{head:t,prefix:n,scalar:i,point:s,pointBytes:o}},Ys=e=>Js(tt(e,ht)).then(sl),hu=e=>sl(gu(tt(e,ht))),mu=e=>Ys(e).then(t=>t.pointBytes),vu=e=>Js(e.hashable).then(e.finish),yu=(e,t,n)=>{const{pointBytes:i,scalar:s}=e,o=as(t),r=vt.multiply(o).toBytes();return{hashable:mn(r,i,n),finish:c=>{const f=tl(o+as(c)*s);return tt(mn(r,nl(f)),Qs)}}},bu=async(e,t)=>{const n=tt(e),i=await Ys(t),s=await Js(i.prefix,n);return vu(yu(i,s,n))},ol={sha512Async:async e=>{const t=lu(),n=mn(e);return di(await t.digest("SHA-512",n.buffer))},sha512:void 0},wu=(e=cu(ht))=>e,$u={getExtendedPublicKeyAsync:Ys,getExtendedPublicKey:hu,randomSecretKey:wu},Xn=8,xu=256,rl=Math.ceil(xu/Xn)+1,ls=2**(Xn-1),ku=()=>{const e=[];let t=vt,n=t;for(let i=0;i<rl;i++){n=t,e.push(n);for(let s=1;s<ls;s++)n=n.add(t),e.push(n);t=n.double()}return e};let gr;const hr=(e,t)=>{const n=t.negate();return e?n:t},Su=e=>{const t=gr||(gr=ku());let n=Mt,i=vt;const s=2**Xn,o=s,r=Yn(s-1),a=Yn(Xn);for(let l=0;l<rl;l++){let c=Number(e&r);e>>=a,c>ls&&(c-=o,e+=1n);const f=l*ls,u=f,p=f+Math.abs(c)-1,b=l%2!==0,x=c<0;c===0?i=i.add(hr(b,t[u])):n=n.add(hr(x,t[p]))}return e!==0n&&oe("invalid wnaf"),{p:n,f:i}},Ui="openclaw-device-identity-v1";function cs(e){let t="";for(const n of e)t+=String.fromCharCode(n);return btoa(t).replaceAll("+","-").replaceAll("/","_").replace(/=+$/g,"")}function al(e){const t=e.replaceAll("-","+").replaceAll("_","/"),n=t+"=".repeat((4-t.length%4)%4),i=atob(n),s=new Uint8Array(i.length);for(let o=0;o<i.length;o+=1)s[o]=i.charCodeAt(o);return s}function Au(e){return Array.from(e).map(t=>t.toString(16).padStart(2,"0")).join("")}async function ll(e){const t=await crypto.subtle.digest("SHA-256",e.slice().buffer);return Au(new Uint8Array(t))}async function _u(){const e=$u.randomSecretKey(),t=await mu(e);return{deviceId:await ll(t),publicKey:cs(t),privateKey:cs(e)}}async function Xs(){try{const n=localStorage.getItem(Ui);if(n){const i=JSON.parse(n);if((i==null?void 0:i.version)===1&&typeof i.deviceId=="string"&&typeof i.publicKey=="string"&&typeof i.privateKey=="string"){const s=await ll(al(i.publicKey));if(s!==i.deviceId){const o={...i,deviceId:s};return localStorage.setItem(Ui,JSON.stringify(o)),{deviceId:s,publicKey:i.publicKey,privateKey:i.privateKey}}return{deviceId:i.deviceId,publicKey:i.publicKey,privateKey:i.privateKey}}}}catch{}const e=await _u(),t={version:1,deviceId:e.deviceId,publicKey:e.publicKey,privateKey:e.privateKey,createdAtMs:Date.now()};return localStorage.setItem(Ui,JSON.stringify(t)),e}async function Cu(e,t){const n=al(e),i=new TextEncoder().encode(t),s=await bu(i,n);return cs(s)}async function nt(e,t){if(!(!e.client||!e.connected)&&!e.devicesLoading){e.devicesLoading=!0,t!=null&&t.quiet||(e.devicesError=null);try{const n=await e.client.request("device.pair.list",{});e.devicesList={pending:Array.isArray(n==null?void 0:n.pending)?n.pending:[],paired:Array.isArray(n==null?void 0:n.paired)?n.paired:[]}}catch(n){t!=null&&t.quiet||(e.devicesError=String(n))}finally{e.devicesLoading=!1}}}async function Tu(e,t){if(!(!e.client||!e.connected))try{await e.client.request("device.pair.approve",{requestId:t}),await nt(e)}catch(n){e.devicesError=String(n)}}async function Eu(e,t){if(!(!e.client||!e.connected||!window.confirm("Reject this device pairing request?")))try{await e.client.request("device.pair.reject",{requestId:t}),await nt(e)}catch(i){e.devicesError=String(i)}}async function Ru(e,t){if(!(!e.client||!e.connected))try{const n=await e.client.request("device.token.rotate",t);if(n!=null&&n.token){const i=await Xs(),s=n.role??t.role;(n.deviceId===i.deviceId||t.deviceId===i.deviceId)&&Ga({deviceId:i.deviceId,role:s,token:n.token,scopes:n.scopes??t.scopes??[]}),window.prompt("New device token (copy and store securely):",n.token)}await nt(e)}catch(n){e.devicesError=String(n)}}async function Lu(e,t){if(!(!e.client||!e.connected||!window.confirm(`Revoke token for ${t.deviceId} (${t.role})?`)))try{await e.client.request("device.token.revoke",t);const i=await Xs();t.deviceId===i.deviceId&&Va({deviceId:i.deviceId,role:t.role}),await nt(e)}catch(i){e.devicesError=String(i)}}function Iu(e){if(!e||e.kind==="gateway")return{method:"exec.approvals.get",params:{}};const t=e.nodeId.trim();return t?{method:"exec.approvals.node.get",params:{nodeId:t}}:null}function Mu(e,t){if(!e||e.kind==="gateway")return{method:"exec.approvals.set",params:t};const n=e.nodeId.trim();return n?{method:"exec.approvals.node.set",params:{...t,nodeId:n}}:null}async function Zs(e,t){if(!(!e.client||!e.connected)&&!e.execApprovalsLoading){e.execApprovalsLoading=!0,e.lastError=null;try{const n=Iu(t);if(!n){e.lastError="Select a node before loading exec approvals.";return}const i=await e.client.request(n.method,n.params);Pu(e,i)}catch(n){e.lastError=String(n)}finally{e.execApprovalsLoading=!1}}}function Pu(e,t){e.execApprovalsSnapshot=t,e.execApprovalsDirty||(e.execApprovalsForm=gt(t.file??{}))}async function Du(e,t){var n,i;if(!(!e.client||!e.connected)){e.execApprovalsSaving=!0,e.lastError=null;try{const s=(n=e.execApprovalsSnapshot)==null?void 0:n.hash;if(!s){e.lastError="Exec approvals hash missing; reload and retry.";return}const o=e.execApprovalsForm??((i=e.execApprovalsSnapshot)==null?void 0:i.file)??{},r=Mu(t,{file:o,baseHash:s});if(!r){e.lastError="Select a node before saving exec approvals.";return}await e.client.request(r.method,r.params),e.execApprovalsDirty=!1,await Zs(e,t)}catch(s){e.lastError=String(s)}finally{e.execApprovalsSaving=!1}}}function Fu(e,t,n){var s;const i=gt(e.execApprovalsForm??((s=e.execApprovalsSnapshot)==null?void 0:s.file)??{});Ea(i,t,n),e.execApprovalsForm=i,e.execApprovalsDirty=!0}function Nu(e,t){var i;const n=gt(e.execApprovalsForm??((i=e.execApprovalsSnapshot)==null?void 0:i.file)??{});Ra(n,t),e.execApprovalsForm=n,e.execApprovalsDirty=!0}function be(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams;for(const[r,a]of Object.entries(n))o.set(r,String(a));return`${s}?${o.toString()}`}async function ui(e,t){e.oosLoading=!0,e.oosError=null;try{const[s,o,r,a]=await Promise.all([fetch(be(e.basePath,"/api/oos/stats")),fetch(be(e.basePath,"/api/oos/list",{limit:100})),fetch(be(e.basePath,"/api/oos/by-file",{limit:50})),fetch(be(e.basePath,"/api/oos/by-time",{days:30}))]),l=await s.json().catch(()=>({})),c=await o.json().catch(()=>({})),f=await r.json().catch(()=>({})),u=await a.json().catch(()=>({}));l.success&&l.data?(e.oosStats=l.data,e.oosDb=l.db??null):(e.oosStats=null,s.ok||(e.oosError=l.detail??`stats: ${s.status}`)),c.success&&Array.isArray(c.data)?e.oosList=c.data:(e.oosList=[],!e.oosError&&!o.ok&&(e.oosError=c.detail??`list: ${o.status}`)),f.success&&Array.isArray(f.data)?e.oosByFile=f.data:e.oosByFile=[],u.success&&Array.isArray(u.data)?e.oosByTime=u.data:e.oosByTime=[]}catch(s){e.oosError=s instanceof Error?s.message:String(s),e.oosStats=null,e.oosList=[],e.oosByFile=[],e.oosByTime=[]}finally{e.oosLoading=!1}}async function Ou(e,t){if(!(t!=null&&t.trim()))return!1;try{const n=await fetch(be(e.basePath,"/api/oos/delete"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_key:t.trim()})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(await ui(e),!0):(e.oosError=i.detail??`删除失败: ${n.status}`,!1)}catch(n){return e.oosError=n instanceof Error?n.message:String(n),!1}}async function Bu(e,t){const n=(t.product_name||"").trim();if(!n)return!1;try{const i=await fetch(be(e.basePath,"/api/oos/add"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_name:n,specification:(t.specification??"").trim(),quantity:t.quantity??0,unit:(t.unit??"").trim()})}),s=await i.json().catch(()=>({}));return i.ok&&s.success?(await ui(e),!0):(e.oosError=s.detail??`添加失败: ${i.status}`,!1)}catch(i){return e.oosError=i instanceof Error?i.message:String(i),!1}}async function Uu(e){try{const t=await fetch(be(e.basePath,"/api/oos/stats")),n=await t.json().catch(()=>({}));if(t.ok&&n.success&&n.data)e.overviewOosStats=n.data,e.overviewOosError=null;else{e.overviewOosStats=null;const i=typeof n.detail=="string"?n.detail:n.message??n.error??`oos stats: ${t.status}`;e.overviewOosError=i}}catch(t){e.overviewOosStats=null,e.overviewOosError=t instanceof Error?t.message:String(t)}}async function fi(e,t){e.shortageLoading=!0,e.shortageError=null;try{const[s,o,r,a]=await Promise.all([fetch(be(e.basePath,"/api/shortage/stats"),{method:"GET"}),fetch(be(e.basePath,"/api/shortage/list",{limit:100}),{method:"GET"}),fetch(be(e.basePath,"/api/shortage/by-file"),{method:"GET"}),fetch(be(e.basePath,"/api/shortage/by-time",{days:30}),{method:"GET"})]),l=await s.json().catch(()=>({})),c=await o.json().catch(()=>({})),f=await r.json().catch(()=>({})),u=await a.json().catch(()=>({}));if(l.success&&l.data)e.shortageStats=l.data,e.shortageDb=l.db??null;else if(e.shortageStats=null,!e.shortageError&&!s.ok){const p=typeof l.detail=="string"?l.detail:l.message??l.error;e.shortageError=p??`stats: ${s.status} ${s.statusText}`}if(c.success&&Array.isArray(c.data))e.shortageList=c.data;else if(e.shortageList=[],!e.shortageError&&!o.ok){const p=typeof c.detail=="string"?c.detail:c.message??c.error;e.shortageError=p??`list: ${o.status} ${o.statusText}`}if(f.success&&Array.isArray(f.data))e.shortageByFile=f.data;else if(e.shortageByFile=[],!e.shortageError&&!r.ok){const p=typeof f.detail=="string"?f.detail:f.message??f.error;e.shortageError=p??`by-file: ${r.status} ${r.statusText}`}if(u.success&&Array.isArray(u.data))e.shortageByTime=u.data;else if(e.shortageByTime=[],!e.shortageError&&!a.ok){const p=typeof u.detail=="string"?u.detail:u.message??u.error;e.shortageError=p??`by-time: ${a.status} ${a.statusText}`}}catch(s){e.shortageError=s instanceof Error?s.message:String(s),e.shortageStats=null,e.shortageList=[],e.shortageByFile=[],e.shortageByTime=[]}finally{e.shortageLoading=!1}}async function zu(e,t){if(!(t!=null&&t.trim()))return!1;try{const n=await fetch(be(e.basePath,"/api/shortage/delete"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_key:t.trim()})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(await fi(e),!0):(e.shortageError=i.detail??`删除失败: ${n.status}`,!1)}catch(n){return e.shortageError=n instanceof Error?n.message:String(n),!1}}async function Ku(e,t){const n=(t.product_name||"").trim();if(!n)return!1;try{const i=await fetch(be(e.basePath,"/api/shortage/add"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_name:n,specification:(t.specification??"").trim(),quantity:t.quantity??0,available_qty:t.available_qty??0})}),s=await i.json().catch(()=>({}));return i.ok&&s.success?(await fi(e),!0):(e.shortageError=s.detail??`添加失败: ${i.status}`,!1)}catch(i){return e.shortageError=i instanceof Error?i.message:String(i),!1}}async function Hu(e){try{const t=await fetch(be(e.basePath,"/api/shortage/stats"),{method:"GET"}),n=await t.json().catch(()=>({}));if(t.ok&&n.success&&n.data)e.overviewShortageStats=n.data,e.overviewShortageError=null;else{e.overviewShortageStats=null;const i=typeof n.detail=="string"?n.detail:n.message??n.error??`shortage stats: ${t.status}`;e.overviewShortageError=i}}catch(t){e.overviewShortageStats=null,e.overviewShortageError=t instanceof Error?t.message:String(t)}}async function ju(e){if(!(!e.client||!e.connected)&&!e.presenceLoading){e.presenceLoading=!0,e.presenceError=null,e.presenceStatus=null;try{const t=await e.client.request("system-presence",{});Array.isArray(t)?(e.presenceEntries=t,e.presenceStatus=t.length===0?"No instances yet.":null):(e.presenceEntries=[],e.presenceStatus="No presence payload.")}catch(t){e.presenceError=String(t)}finally{e.presenceLoading=!1}}}async function eo(e,t){if(!(!e.client||!e.connected)&&!e.sessionsLoading){e.sessionsLoading=!0,e.sessionsError=null;try{const n=(t==null?void 0:t.includeGlobal)??e.sessionsIncludeGlobal,i=(t==null?void 0:t.includeUnknown)??e.sessionsIncludeUnknown,s=(t==null?void 0:t.activeMinutes)??or(e.sessionsFilterActive,0),o=(t==null?void 0:t.limit)??or(e.sessionsFilterLimit,0),r={includeGlobal:n,includeUnknown:i};s>0&&(r.activeMinutes=s),o>0&&(r.limit=o);const a=await e.client.request("sessions.list",r);a&&(e.sessionsResult=a)}catch(n){e.sessionsError=String(n)}finally{e.sessionsLoading=!1}}}function Nt(e,t,n){if(!t.trim())return;const i={...e.skillMessages};n?i[t]=n:delete i[t],e.skillMessages=i}function pi(e){return e instanceof Error?e.message:String(e)}async function $n(e,t){if(t!=null&&t.clearMessages&&Object.keys(e.skillMessages).length>0&&(e.skillMessages={}),!(!e.client||!e.connected)&&!e.skillsLoading){e.skillsLoading=!0,e.skillsError=null;try{const n=await e.client.request("skills.status",{});n&&(e.skillsReport=n)}catch(n){e.skillsError=pi(n)}finally{e.skillsLoading=!1}}}function qu(e,t,n){e.skillEdits={...e.skillEdits,[t]:n}}async function Wu(e,t,n){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{await e.client.request("skills.update",{skillKey:t,enabled:n}),await $n(e),Nt(e,t,{kind:"success",message:n?"Skill enabled":"Skill disabled"})}catch(i){const s=pi(i);e.skillsError=s,Nt(e,t,{kind:"error",message:s})}finally{e.skillsBusyKey=null}}}async function Gu(e,t){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const n=e.skillEdits[t]??"";await e.client.request("skills.update",{skillKey:t,apiKey:n}),await $n(e),Nt(e,t,{kind:"success",message:"API key saved"})}catch(n){const i=pi(n);e.skillsError=i,Nt(e,t,{kind:"error",message:i})}finally{e.skillsBusyKey=null}}}async function Vu(e,t,n,i){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const s=await e.client.request("skills.install",{name:n,installId:i,timeoutMs:12e4});await $n(e),Nt(e,t,{kind:"success",message:(s==null?void 0:s.message)??"Installed"})}catch(s){const o=pi(s);e.skillsError=o,Nt(e,t,{kind:"error",message:o})}finally{e.skillsBusyKey=null}}}const Qu=[{label:"chat",tabs:["chat"]},{label:"control",tabs:["overview","channels","instances","sessions","work","cron"]},{label:"agent",tabs:["agents","skills","nodes"]},{label:"settings",tabs:["config","debug","logs"]}],cl={agents:"/agents",overview:"/overview",channels:"/channels",instances:"/instances",sessions:"/sessions",work:"/work",cron:"/cron",skills:"/skills",nodes:"/nodes",chat:"/chat",config:"/config",debug:"/debug",logs:"/logs"},dl=new Map(Object.entries(cl).map(([e,t])=>[t,e]));function Ut(e){if(!e)return"";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t==="/"?"":(t.endsWith("/")&&(t=t.slice(0,-1)),t)}function vn(e){if(!e)return"/";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t.length>1&&t.endsWith("/")&&(t=t.slice(0,-1)),t}function ul(e,t=""){const n=Ut(t),i=cl[e];return n?`${n}${i}`:i}function fl(e,t=""){const n=Ut(t);let i=e||"/";n&&(i===n?i="/":i.startsWith(`${n}/`)&&(i=i.slice(n.length)));let s=vn(i).toLowerCase();return s.endsWith("/index.html")&&(s="/"),s==="/"?"chat":dl.get(s)??null}function Ju(e){let t=vn(e);if(t.endsWith("/index.html")&&(t=vn(t.slice(0,-11))),t==="/")return"";const n=t.split("/").filter(Boolean);if(n.length===0)return"";for(let i=0;i<n.length;i++){const s=`/${n.slice(i).join("/")}`.toLowerCase();if(dl.has(s)){const o=n.slice(0,i);return o.length?`/${o.join("/")}`:""}}return`/${n.join("/")}`}function Yu(e){switch(e){case"agents":return"folder";case"chat":return"messageSquare";case"overview":return"barChart";case"channels":return"fileText";case"instances":return"radio";case"sessions":return"fileText";case"work":return"fileText";case"cron":return"loader";case"skills":return"zap";case"nodes":return"monitor";case"config":return"settings";case"debug":return"bug";case"logs":return"scrollText";default:return"folder"}}function ds(e){return y(`tabs.${e}`)}function Xu(e){return y(`subtitles.${e}`)}const pl="openclaw.control.settings.v1";function Zu(){const t={gatewayUrl:`${location.protocol==="https:"?"wss":"ws"}://${location.host}/ws`,token:"",sessionKey:"main",lastActiveSessionKey:"main",theme:"system",chatFocusMode:!1,chatShowThinking:!0,splitRatio:.6,navCollapsed:!1,navGroupsCollapsed:{}};try{const n=localStorage.getItem(pl);if(!n)return t;const i=JSON.parse(n);return{gatewayUrl:typeof i.gatewayUrl=="string"&&i.gatewayUrl.trim()?i.gatewayUrl.trim():t.gatewayUrl,token:typeof i.token=="string"?i.token:t.token,sessionKey:typeof i.sessionKey=="string"&&i.sessionKey.trim()?i.sessionKey.trim():t.sessionKey,lastActiveSessionKey:typeof i.lastActiveSessionKey=="string"&&i.lastActiveSessionKey.trim()?i.lastActiveSessionKey.trim():typeof i.sessionKey=="string"&&i.sessionKey.trim()||t.lastActiveSessionKey,theme:i.theme==="light"||i.theme==="dark"||i.theme==="system"?i.theme:t.theme,chatFocusMode:typeof i.chatFocusMode=="boolean"?i.chatFocusMode:t.chatFocusMode,chatShowThinking:typeof i.chatShowThinking=="boolean"?i.chatShowThinking:t.chatShowThinking,splitRatio:typeof i.splitRatio=="number"&&i.splitRatio>=.4&&i.splitRatio<=.7?i.splitRatio:t.splitRatio,navCollapsed:typeof i.navCollapsed=="boolean"?i.navCollapsed:t.navCollapsed,navGroupsCollapsed:typeof i.navGroupsCollapsed=="object"&&i.navGroupsCollapsed!==null?i.navGroupsCollapsed:t.navGroupsCollapsed,locale:Ds(i.locale)?i.locale:void 0}}catch{return t}}function ef(e){localStorage.setItem(pl,JSON.stringify(e))}const Mn=e=>Number.isNaN(e)?.5:e<=0?0:e>=1?1:e,tf=()=>typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches??!1,Pn=e=>{e.classList.remove("theme-transition"),e.style.removeProperty("--theme-switch-x"),e.style.removeProperty("--theme-switch-y")},nf=({nextTheme:e,applyTheme:t,context:n,currentTheme:i})=>{var c;if(i===e)return;const s=globalThis.document??null;if(!s){t();return}const o=s.documentElement,r=s,a=tf();if(!!r.startViewTransition&&!a){let f=.5,u=.5;if((n==null?void 0:n.pointerClientX)!==void 0&&(n==null?void 0:n.pointerClientY)!==void 0&&typeof window<"u")f=Mn(n.pointerClientX/window.innerWidth),u=Mn(n.pointerClientY/window.innerHeight);else if(n!=null&&n.element){const p=n.element.getBoundingClientRect();p.width>0&&p.height>0&&typeof window<"u"&&(f=Mn((p.left+p.width/2)/window.innerWidth),u=Mn((p.top+p.height/2)/window.innerHeight))}o.style.setProperty("--theme-switch-x",`${f*100}%`),o.style.setProperty("--theme-switch-y",`${u*100}%`),o.classList.add("theme-transition");try{const p=(c=r.startViewTransition)==null?void 0:c.call(r,()=>{t()});p!=null&&p.finished?p.finished.finally(()=>Pn(o)):Pn(o)}catch{Pn(o),t()}return}t(),Pn(o)};function sf(){return typeof window>"u"||typeof window.matchMedia!="function"||window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function to(e){return e==="system"?sf():e}function et(e,t){var i;const n={...t,lastActiveSessionKey:((i=t.lastActiveSessionKey)==null?void 0:i.trim())||t.sessionKey.trim()||"main"};e.settings=n,ef(n),t.theme!==e.theme&&(e.theme=t.theme,gi(e,to(t.theme))),e.applySessionKey=e.settings.lastActiveSessionKey}function gl(e,t){const n=t.trim();n&&e.settings.lastActiveSessionKey!==n&&et(e,{...e.settings,lastActiveSessionKey:n})}function of(e){if(!window.location.search&&!window.location.hash)return;const t=new URL(window.location.href),n=new URLSearchParams(t.search),i=new URLSearchParams(t.hash.startsWith("#")?t.hash.slice(1):t.hash),s=n.get("token")??i.get("token"),o=n.get("password")??i.get("password"),r=n.get("session")??i.get("session"),a=n.get("gatewayUrl")??i.get("gatewayUrl");let l=!1;if(s!=null){const f=s.trim();f&&f!==e.settings.token&&et(e,{...e.settings,token:f}),n.delete("token"),i.delete("token"),l=!0}if(o!=null&&(n.delete("password"),i.delete("password"),l=!0),r!=null){const f=r.trim();f&&(e.sessionKey=f,et(e,{...e.settings,sessionKey:f,lastActiveSessionKey:f}))}if(a!=null){const f=a.trim();f&&f!==e.settings.gatewayUrl&&(e.pendingGatewayUrl=f),n.delete("gatewayUrl"),i.delete("gatewayUrl"),l=!0}if(!l)return;t.search=n.toString();const c=i.toString();t.hash=c?`#${c}`:"",window.history.replaceState({},"",t.toString())}function rf(e,t){e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?Os(e):Bs(e),t==="debug"?Us(e):zs(e),no(e),ml(e,t,!1)}function af(e,t,n){nf({nextTheme:t,applyTheme:()=>{e.theme=t,et(e,{...e.settings,theme:t}),gi(e,to(t))},context:n,currentTheme:e.theme})}async function no(e){var t,n,i,s,o,r;if(e.tab==="overview"&&(await vl(e),await Promise.all([Uu(e),Hu(e)])),e.tab==="channels"&&await Ba(e),e.tab==="instances"){const a=e;await ui(a),await fi(a)}if(e.tab==="sessions"&&await Ws(e),e.tab==="cron"&&await qs(e),e.tab==="skills"&&await $n(e),e.tab==="agents"){await Ks(e),await Fe(e);const a=((n=(t=e.agentsList)==null?void 0:t.agents)==null?void 0:n.map(c=>c.id))??[];a.length>0&&Oa(e,a);const l=e.agentsSelectedId??((i=e.agentsList)==null?void 0:i.defaultId)??((r=(o=(s=e.agentsList)==null?void 0:s.agents)==null?void 0:o[0])==null?void 0:r.id);l&&(Na(e,l),e.agentsPanel==="skills"&&jn(e,l),e.agentsPanel==="channels"&&ke(e,!1),e.agentsPanel==="cron"&&io(e))}e.tab==="nodes"&&(await ci(e),await nt(e),await Fe(e),await Zs(e)),e.tab==="chat"&&(await Sl(e),wn(e,!e.chatHasAutoScrolled)),e.tab==="config"&&(await id(e),await Fe(e)),e.tab==="debug"&&(await li(e),e.eventLog=e.eventLogBuffer),e.tab==="logs"&&(e.logsAtBottom=!0,await Ns(e,{reset:!0}),Fa(e,!0))}function lf(){if(typeof window>"u")return"";const e=window.__OPENCLAW_CONTROL_UI_BASE_PATH__;return typeof e=="string"&&e.trim()?Ut(e):Ju(window.location.pathname)}function cf(e){e.theme=e.settings.theme??"system",gi(e,to(e.theme))}function gi(e,t){if(e.themeResolved=t,typeof document>"u")return;const n=document.documentElement;n.dataset.theme=t,n.style.colorScheme=t}function df(e){if(typeof window>"u"||typeof window.matchMedia!="function")return;if(e.themeMedia=window.matchMedia("(prefers-color-scheme: dark)"),e.themeMediaHandler=n=>{e.theme==="system"&&gi(e,n.matches?"dark":"light")},typeof e.themeMedia.addEventListener=="function"){e.themeMedia.addEventListener("change",e.themeMediaHandler);return}e.themeMedia.addListener(e.themeMediaHandler)}function uf(e){if(!e.themeMedia||!e.themeMediaHandler)return;if(typeof e.themeMedia.removeEventListener=="function"){e.themeMedia.removeEventListener("change",e.themeMediaHandler);return}e.themeMedia.removeListener(e.themeMediaHandler),e.themeMedia=null,e.themeMediaHandler=null}function ff(e,t){if(typeof window>"u")return;const n=fl(window.location.pathname,e.basePath)??"chat";hl(e,n),ml(e,n,t)}function pf(e){var s;if(typeof window>"u")return;const t=fl(window.location.pathname,e.basePath);if(!t)return;const i=(s=new URL(window.location.href).searchParams.get("session"))==null?void 0:s.trim();i&&(e.sessionKey=i,et(e,{...e.settings,sessionKey:i,lastActiveSessionKey:i})),hl(e,t)}function hl(e,t){e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?Os(e):Bs(e),t==="debug"?Us(e):zs(e),e.connected&&no(e)}function ml(e,t,n){if(typeof window>"u")return;const i=vn(ul(t,e.basePath)),s=vn(window.location.pathname),o=new URL(window.location.href);t==="chat"&&e.sessionKey?o.searchParams.set("session",e.sessionKey):o.searchParams.delete("session"),s!==i&&(o.pathname=i),n?window.history.replaceState({},"",o.toString()):window.history.pushState({},"",o.toString())}function gf(e,t,n){if(typeof window>"u")return;const i=new URL(window.location.href);i.searchParams.set("session",t),window.history.replaceState({},"",i.toString())}async function vl(e){await Promise.all([ke(e,!1),ju(e),eo(e),Ka(e),li(e)])}async function io(e){await Promise.all([ke(e,!1),Ka(e),Od(e)])}async function hf(e){await qs(e)}async function mf(e){await Ws(e)}const mr=50,vf=80,yf=12e4;function bf(e){if(!e||typeof e!="object")return null;const t=e;if(typeof t.text=="string")return t.text;const n=t.content;if(!Array.isArray(n))return null;const i=n.map(s=>{if(!s||typeof s!="object")return null;const o=s;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(s=>!!s);return i.length===0?null:i.join(`
`)}function vr(e){if(e==null)return null;if(typeof e=="number"||typeof e=="boolean")return String(e);const t=bf(e);let n;if(typeof e=="string")n=e;else if(t)n=t;else try{n=JSON.stringify(e,null,2)}catch{n=String(e)}const i=za(n,yf);return i.truncated?`${i.text}

… truncated (${i.total} chars, showing first ${i.text.length}).`:i.text}function wf(e){const t=[];return t.push({type:"toolcall",name:e.name,arguments:e.args??{}}),e.output&&t.push({type:"toolresult",name:e.name,text:e.output}),{role:"assistant",toolCallId:e.toolCallId,runId:e.runId,content:t,timestamp:e.startedAt}}function $f(e){if(e.toolStreamOrder.length<=mr)return;const t=e.toolStreamOrder.length-mr,n=e.toolStreamOrder.splice(0,t);for(const i of n)e.toolStreamById.delete(i)}function xf(e){e.chatToolMessages=e.toolStreamOrder.map(t=>{var n;return(n=e.toolStreamById.get(t))==null?void 0:n.message}).filter(t=>!!t)}function us(e){e.toolStreamSyncTimer!=null&&(clearTimeout(e.toolStreamSyncTimer),e.toolStreamSyncTimer=null),xf(e)}function kf(e,t=!1){if(t){us(e);return}e.toolStreamSyncTimer==null&&(e.toolStreamSyncTimer=window.setTimeout(()=>us(e),vf))}function hi(e){e.toolStreamById.clear(),e.toolStreamOrder=[],e.chatToolMessages=[],us(e)}const Sf=5e3;function Af(e,t){var s;const n=t.data??{},i=typeof n.phase=="string"?n.phase:"";e.compactionClearTimer!=null&&(window.clearTimeout(e.compactionClearTimer),e.compactionClearTimer=null),i==="start"?e.compactionStatus={active:!0,startedAt:Date.now(),completedAt:null}:i==="end"&&(e.compactionStatus={active:!1,startedAt:((s=e.compactionStatus)==null?void 0:s.startedAt)??null,completedAt:Date.now()},e.compactionClearTimer=window.setTimeout(()=>{e.compactionStatus=null,e.compactionClearTimer=null},Sf))}function _f(e,t){if(!t)return;if(t.stream==="compaction"){Af(e,t);return}if(t.stream!=="tool")return;const n=typeof t.sessionKey=="string"?t.sessionKey:void 0;if(n&&n!==e.sessionKey||!n&&e.chatRunId&&t.runId!==e.chatRunId||e.chatRunId&&t.runId!==e.chatRunId||!e.chatRunId)return;const i=t.data??{},s=typeof i.toolCallId=="string"?i.toolCallId:"";if(!s)return;const o=typeof i.name=="string"?i.name:"tool",r=typeof i.phase=="string"?i.phase:"",a=r==="start"?i.args:void 0,l=r==="update"?vr(i.partialResult):r==="result"?vr(i.result):void 0,c=Date.now();let f=e.toolStreamById.get(s);f?(f.name=o,a!==void 0&&(f.args=a),l!==void 0&&(f.output=l||void 0),f.updatedAt=c):(f={toolCallId:s,runId:t.runId,sessionKey:n,name:o,args:a,output:l||void 0,startedAt:typeof t.ts=="number"?t.ts:c,updatedAt:c,message:{}},e.toolStreamById.set(s,f),e.toolStreamOrder.push(s)),f.message=wf(f),$f(e),kf(e,r==="result")}function zi(e){return e==null?"":String(e).trim()}const Ki=new WeakMap,Hi=new WeakMap;function fs(e){const t=e,n=typeof t.role=="string"?t.role:"",i=t.content;if(typeof i=="string")return n==="assistant"?Fi(i):zi(i);if(Array.isArray(i)){const s=i.map(o=>{const r=o;return r.type==="text"&&typeof r.text=="string"?r.text:null}).filter(o=>typeof o=="string");if(s.length>0){const o=s.join(`
`);return n==="assistant"?Fi(o):zi(o)}}return typeof t.text=="string"?n==="assistant"?Fi(t.text):zi(t.text):null}function yl(e){if(!e||typeof e!="object")return fs(e);const t=e;if(Ki.has(t))return Ki.get(t)??null;const n=fs(e);return Ki.set(t,n),n}function yr(e){const n=e.content,i=[];if(Array.isArray(n))for(const a of n){const l=a;if(l.type==="thinking"&&typeof l.thinking=="string"){const c=l.thinking.trim();c&&i.push(c)}}if(i.length>0)return i.join(`
`);const s=Tf(e);if(!s)return null;const r=[...s.matchAll(/<\s*think(?:ing)?\s*>([\s\S]*?)<\s*\/\s*think(?:ing)?\s*>/gi)].map(a=>(a[1]??"").trim()).filter(Boolean);return r.length>0?r.join(`
`):null}function Cf(e){if(!e||typeof e!="object")return yr(e);const t=e;if(Hi.has(t))return Hi.get(t)??null;const n=yr(e);return Hi.set(t,n),n}function Tf(e){const t=e,n=t.content;if(typeof n=="string")return n;if(Array.isArray(n)){const i=n.map(s=>{const o=s;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(s=>typeof s=="string");if(i.length>0)return i.join(`
`)}return typeof t.text=="string"?t.text:null}function Ef(e){const t=e.trim();if(!t)return"";const n=t.split(/\r?\n/).map(i=>i.trim()).filter(Boolean).map(i=>`_${i}_`);return n.length?["_Reasoning:_",...n].join(`
`):""}let br=!1;function wr(e){e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t="";for(let n=0;n<e.length;n++)t+=e[n].toString(16).padStart(2,"0");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}function Rf(){const e=new Uint8Array(16),t=Date.now();for(let n=0;n<e.length;n++)e[n]=Math.floor(Math.random()*256);return e[0]^=t&255,e[1]^=t>>>8&255,e[2]^=t>>>16&255,e[3]^=t>>>24&255,e}function Lf(){br||(br=!0,console.warn("[uuid] crypto API missing; falling back to weak randomness"))}function so(e=globalThis.crypto){if(e&&typeof e.randomUUID=="function")return e.randomUUID();if(e&&typeof e.getRandomValues=="function"){const t=new Uint8Array(16);return e.getRandomValues(t),wr(t)}return Lf(),wr(Rf())}async function yn(e){if(!(!e.client||!e.connected)){e.chatLoading=!0,e.lastError=null;try{const t=await e.client.request("chat.history",{sessionKey:e.sessionKey,limit:200}),n=Array.isArray(t.messages)?t.messages:[];(n.length>0||e.chatMessages.length===0)&&(e.chatMessages=n),e.chatThinkingLevel=t.thinkingLevel??null}catch(t){e.lastError=String(t)}finally{e.chatLoading=!1}}}function If(e){const t=/^data:([^;]+);base64,(.+)$/.exec(e);return t?{mimeType:t[1],content:t[2]}:null}function Mf(e){if(!e||typeof e!="object")return null;const t=e;return t.role!=="assistant"||!("content"in t)||!Array.isArray(t.content)?null:t}async function Pf(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",i=n?`${n}/api/quotation/upload`:"/api/quotation/upload",s=new FormData;s.append("file",t);try{const o=await fetch(i,{method:"POST",body:s,credentials:"same-origin"});if(!o.ok){const a=await o.text();throw new Error(a||`Upload failed: ${o.status}`)}const r=await o.json();return typeof r.file_path!="string"?null:{file_path:r.file_path,file_name:r.file_name??t.name}}catch(o){throw console.error("uploadChatFile",o),o}}async function Df(e,t,n,i){if(!e.client||!e.connected)return null;const s=t.trim(),o=n&&n.length>0;if(!s&&!o)return null;const r=Date.now(),a=[];if(s&&a.push({type:"text",text:s}),o)for(const u of n)a.push({type:"image",source:{type:"base64",media_type:u.mimeType,data:u.dataUrl}});e.chatMessages=[...e.chatMessages,{role:"user",content:a,timestamp:r}],e.chatSending=!0,e.lastError=null;const l=so();e.chatRunId=l,e.chatStream="",e.chatStreamStartedAt=r;const c=o?n.map(u=>{const p=If(u.dataUrl);return p?{type:"image",mimeType:p.mimeType,content:p.content}:null}).filter(u=>u!==null):void 0,f=i!=null&&i.file_path?{file_path:i.file_path}:void 0;try{return await e.client.request("chat.send",{sessionKey:e.sessionKey,message:s,deliver:!1,idempotencyKey:l,attachments:c,...f?{context:f,file_path:i.file_path}:{}}),l}catch(u){const p=String(u);return e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,e.lastError=p,e.chatMessages=[...e.chatMessages,{role:"assistant",content:[{type:"text",text:"Error: "+p}],timestamp:Date.now()}],null}finally{e.chatSending=!1}}async function Ff(e){if(!e.client||!e.connected)return!1;const t=e.chatRunId;try{return await e.client.request("chat.abort",t?{sessionKey:e.sessionKey,runId:t}:{sessionKey:e.sessionKey}),!0}catch(n){return e.lastError=String(n),!1}}function Nf(e,t){if(!t||t.sessionKey!==e.sessionKey)return null;if(t.runId&&e.chatRunId&&t.runId!==e.chatRunId)return t.state==="final"?"foreign_final":null;if(t.state==="delta"){const n=fs(t.message);if(typeof n=="string"){const i=e.chatStream??"";(!i||n.length>=i.length)&&(e.chatStream=n)}}else if(t.state==="final")e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null;else if(t.state==="aborted"){const n=Mf(t.message);if(n)e.chatMessages=[...e.chatMessages,n];else{const i=e.chatStream??"";i.trim()&&(e.chatMessages=[...e.chatMessages,{role:"assistant",content:[{type:"text",text:i}],timestamp:Date.now()}])}e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null}else t.state==="error"&&(e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null,e.lastError=t.errorMessage??"chat error");return t.state}const bl=120;function wl(e){return e.chatSending||!!e.chatRunId}function Of(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/stop"?!0:n==="stop"||n==="esc"||n==="abort"||n==="wait"||n==="exit"}function Bf(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/new"||n==="/reset"?!0:n.startsWith("/new ")||n.startsWith("/reset ")}async function $l(e){e.connected&&(e.chatMessage="",await Ff(e))}function Uf(e,t,n,i){const s=t.trim(),o=!!(n&&n.length>0);!s&&!o||(e.chatQueue=[...e.chatQueue,{id:so(),text:s,createdAt:Date.now(),attachments:o?n==null?void 0:n.map(r=>({...r})):void 0,refreshSessions:i}])}async function xl(e,t,n){var o,r;hi(e);const i=await Df(e,t,n==null?void 0:n.attachments,e.chatUploadedFile??void 0),s=!!i;return!s&&(n==null?void 0:n.previousDraft)!=null&&(e.chatMessage=n.previousDraft),!s&&(n!=null&&n.previousAttachments)&&(e.chatAttachments=n.previousAttachments),s&&gl(e,e.sessionKey),s&&(n!=null&&n.restoreDraft)&&((o=n.previousDraft)!=null&&o.trim())&&(e.chatMessage=n.previousDraft),s&&(n!=null&&n.restoreAttachments)&&((r=n.previousAttachments)!=null&&r.length)&&(e.chatAttachments=n.previousAttachments),wn(e),s&&!e.chatRunId&&kl(e),s&&(n!=null&&n.refreshSessions)&&i&&e.refreshSessionsAfterChat.add(i),s}async function kl(e){if(!e.connected||wl(e))return;const[t,...n]=e.chatQueue;if(!t)return;e.chatQueue=n,await xl(e,t.text,{attachments:t.attachments,refreshSessions:t.refreshSessions})||(e.chatQueue=[t,...e.chatQueue])}function zf(e,t){e.chatQueue=e.chatQueue.filter(n=>n.id!==t)}async function Kf(e,t,n){if(!e.connected)return;const i=e.chatMessage,s=(t??e.chatMessage).trim(),o=e.chatAttachments??[],r=t==null?o:[],a=r.length>0;if(!s&&!a)return;if(Of(s)){await $l(e);return}const l=Bf(s);if(t==null&&(e.chatMessage="",e.chatAttachments=[]),wl(e)){Uf(e,s,r,l);return}await xl(e,s,{previousDraft:t==null?i:void 0,restoreDraft:!!(t&&(n!=null&&n.restoreDraft)),attachments:a?r:void 0,previousAttachments:t==null?o:void 0,restoreAttachments:!!(t&&(n!=null&&n.restoreDraft)),refreshSessions:l})}async function Sl(e,t){await Promise.all([yn(e),eo(e,{activeMinutes:bl}),ps(e)]),(t==null?void 0:t.scheduleScroll)!==!1&&wn(e)}const Hf=kl;function jf(e){var s,o,r;const t=Da(e.sessionKey);if(t!=null&&t.agentId)return t.agentId;const n=(s=e.hello)==null?void 0:s.snapshot;return((r=(o=n==null?void 0:n.sessionDefaults)==null?void 0:o.defaultAgentId)==null?void 0:r.trim())||"main"}function qf(e,t){const n=Ut(e),i=encodeURIComponent(t);return n?`${n}/avatar/${i}?meta=1`:`/avatar/${i}?meta=1`}async function ps(e){if(!e.connected){e.chatAvatarUrl=null;return}const t=jf(e);if(!t){e.chatAvatarUrl=null;return}e.chatAvatarUrl=null;const n=qf(e.basePath,t);try{const i=await fetch(n,{method:"GET"});if(!i.ok){e.chatAvatarUrl=null;return}const s=await i.json(),o=typeof s.avatarUrl=="string"?s.avatarUrl.trim():"";e.chatAvatarUrl=o||null}catch{e.chatAvatarUrl=null}}const Wf={trace:!0,debug:!0,info:!0,warn:!0,error:!0,fatal:!0},Gf={name:"",description:"",agentId:"",enabled:!0,scheduleKind:"every",scheduleAt:"",everyAmount:"30",everyUnit:"minutes",cronExpr:"0 7 * * *",cronTz:"",sessionTarget:"isolated",wakeMode:"now",payloadKind:"agentTurn",payloadText:"",deliveryMode:"announce",deliveryChannel:"last",deliveryTo:"",timeoutSeconds:""},Vf=50,Qf=200,Jf="PT Vansting Agent";function $r(e,t){if(typeof e!="string")return;const n=e.trim();if(n)return n.length<=t?n:n.slice(0,t)}function oo(e){const t=$r(e==null?void 0:e.name,Vf)??Jf,n=$r((e==null?void 0:e.avatar)??void 0,Qf)??null;return{agentId:typeof(e==null?void 0:e.agentId)=="string"&&e.agentId.trim()?e.agentId.trim():null,name:t,avatar:n}}async function Al(e,t){if(!e.client||!e.connected)return;const n=e.sessionKey.trim(),i=n?{sessionKey:n}:{};try{const s=await e.client.request("agent.identity.get",i);if(!s)return;const o=oo(s);e.assistantName=o.name,e.assistantAvatar=o.avatar,e.assistantAgentId=o.agentId??null}catch{}}function gs(e){return typeof e=="object"&&e!==null}function Yf(e){if(!gs(e))return null;const t=typeof e.id=="string"?e.id.trim():"",n=e.request;if(!t||!gs(n))return null;const i=typeof n.command=="string"?n.command.trim():"";if(!i)return null;const s=typeof e.createdAtMs=="number"?e.createdAtMs:0,o=typeof e.expiresAtMs=="number"?e.expiresAtMs:0;return!s||!o?null:{id:t,request:{command:i,cwd:typeof n.cwd=="string"?n.cwd:null,host:typeof n.host=="string"?n.host:null,security:typeof n.security=="string"?n.security:null,ask:typeof n.ask=="string"?n.ask:null,agentId:typeof n.agentId=="string"?n.agentId:null,resolvedPath:typeof n.resolvedPath=="string"?n.resolvedPath:null,sessionKey:typeof n.sessionKey=="string"?n.sessionKey:null},createdAtMs:s,expiresAtMs:o}}function Xf(e){if(!gs(e))return null;const t=typeof e.id=="string"?e.id.trim():"";return t?{id:t,decision:typeof e.decision=="string"?e.decision:null,resolvedBy:typeof e.resolvedBy=="string"?e.resolvedBy:null,ts:typeof e.ts=="number"?e.ts:null}:null}function _l(e){const t=Date.now();return e.filter(n=>n.expiresAtMs>t)}function Zf(e,t){const n=_l(e).filter(i=>i.id!==t.id);return n.push(t),n}function xr(e,t){return _l(e).filter(n=>n.id!==t)}function ep(e){return{}}const kr={WEBCHAT:"webchat"},Sr={CONTROL_UI:"control-ui"},tp=4008;class np{constructor(t){this.opts=t,this.ws=null,this.pending=new Map,this.closed=!1,this.lastSeq=null,this.connectNonce=null,this.connectSent=!1,this.connectTimer=null,this.backoffMs=800}start(){this.closed=!1,this.connect()}stop(){var t;this.closed=!0,(t=this.ws)==null||t.close(),this.ws=null,this.flushPending(new Error("gateway client stopped"))}get connected(){var t;return((t=this.ws)==null?void 0:t.readyState)===WebSocket.OPEN}connect(){this.closed||(this.ws=new WebSocket(this.opts.url),this.ws.addEventListener("open",()=>this.queueConnect()),this.ws.addEventListener("message",t=>this.handleMessage(String(t.data??""))),this.ws.addEventListener("close",t=>{var i,s;const n=String(t.reason??"");this.ws=null,this.flushPending(new Error(`gateway closed (${t.code}): ${n}`)),(s=(i=this.opts).onClose)==null||s.call(i,{code:t.code,reason:n}),this.scheduleReconnect()}),this.ws.addEventListener("error",()=>{}))}scheduleReconnect(){if(this.closed)return;const t=this.backoffMs;this.backoffMs=Math.min(this.backoffMs*1.7,15e3),window.setTimeout(()=>this.connect(),t)}flushPending(t){for(const[,n]of this.pending)n.reject(t);this.pending.clear()}async sendConnect(){var f;if(this.connectSent)return;this.connectSent=!0,this.connectTimer!==null&&(window.clearTimeout(this.connectTimer),this.connectTimer=null);const t=typeof crypto<"u"&&!!crypto.subtle,n=["operator.admin","operator.approvals","operator.pairing"],i="operator";let s=null,o=!1,r=this.opts.token;if(t){s=await Xs();const u=(f=nu({deviceId:s.deviceId,role:i}))==null?void 0:f.token;r=u??this.opts.token,o=!!(u&&this.opts.token)}const a=r||this.opts.password?{token:r,password:this.opts.password}:void 0;let l;if(t&&s){const u=Date.now(),p=this.connectNonce??void 0,b=ep({deviceId:s.deviceId,clientId:this.opts.clientName??Sr.CONTROL_UI,clientMode:this.opts.mode??kr.WEBCHAT}),x=await Cu(s.privateKey,b);l={id:s.deviceId,publicKey:s.publicKey,signature:x,signedAt:u,nonce:p}}const c={minProtocol:3,maxProtocol:3,client:{id:this.opts.clientName??Sr.CONTROL_UI,version:this.opts.clientVersion??"dev",platform:this.opts.platform??navigator.platform??"web",mode:this.opts.mode??kr.WEBCHAT,instanceId:this.opts.instanceId},role:i,scopes:n,device:l,caps:[],auth:a,userAgent:navigator.userAgent,locale:navigator.language};this.request("connect",c).then(u=>{var p,b,x;(p=u==null?void 0:u.auth)!=null&&p.deviceToken&&s&&Ga({deviceId:s.deviceId,role:u.auth.role??i,token:u.auth.deviceToken,scopes:u.auth.scopes??[]}),this.backoffMs=800,(x=(b=this.opts).onHello)==null||x.call(b,u)}).catch(()=>{var u;o&&s&&Va({deviceId:s.deviceId,role:i}),(u=this.ws)==null||u.close(tp,"connect failed")})}handleMessage(t){var s,o,r,a,l;let n;try{n=JSON.parse(t)}catch{return}const i=n;if(i.type==="event"){const c=n;if(c.event==="connect.challenge"){const u=c.payload,p=u&&typeof u.nonce=="string"?u.nonce:null;p&&(this.connectNonce=p,this.sendConnect());return}const f=typeof c.seq=="number"?c.seq:null;f!==null&&(this.lastSeq!==null&&f>this.lastSeq+1&&((o=(s=this.opts).onGap)==null||o.call(s,{expected:this.lastSeq+1,received:f})),this.lastSeq=f);try{(a=(r=this.opts).onEvent)==null||a.call(r,c)}catch(u){console.error("[gateway] event handler error:",u)}return}if(i.type==="res"){const c=n,f=this.pending.get(c.id);if(!f)return;this.pending.delete(c.id),c.ok?f.resolve(c.payload):f.reject(new Error(((l=c.error)==null?void 0:l.message)??"request failed"));return}}request(t,n){if(!this.ws||this.ws.readyState!==WebSocket.OPEN)return Promise.reject(new Error("gateway not connected"));const i=so(),s={type:"req",id:i,method:t,params:n},o=new Promise((r,a)=>{this.pending.set(i,{resolve:l=>r(l),reject:a})});return this.ws.send(JSON.stringify(s)),o}queueConnect(){this.connectNonce=null,this.connectSent=!1,this.connectTimer!==null&&window.clearTimeout(this.connectTimer),this.connectTimer=window.setTimeout(()=>{this.sendConnect()},750)}}function ji(e,t){var a,l,c;const n=(e??"").trim(),i=(a=t.mainSessionKey)==null?void 0:a.trim();if(!i)return n;if(!n)return i;const s=((l=t.mainKey)==null?void 0:l.trim())||"main",o=(c=t.defaultAgentId)==null?void 0:c.trim();return n==="main"||n===s||o&&(n===`agent:${o}:main`||n===`agent:${o}:${s}`)?i:n}function ip(e,t){if(!(t!=null&&t.mainSessionKey))return;const n=ji(e.sessionKey,t),i=ji(e.settings.sessionKey,t),s=ji(e.settings.lastActiveSessionKey,t),o=n||i||e.sessionKey,r={...e.settings,sessionKey:i||o,lastActiveSessionKey:s||o},a=r.sessionKey!==e.settings.sessionKey||r.lastActiveSessionKey!==e.settings.lastActiveSessionKey;o!==e.sessionKey&&(e.sessionKey=o),a&&et(e,r)}function Cl(e){e.lastError=null,e.hello=null,e.connected=!1,e.execApprovalQueue=[],e.execApprovalError=null;const t=e.client,n=new np({url:e.settings.gatewayUrl,token:e.settings.token.trim()?e.settings.token:void 0,password:e.password.trim()?e.password:void 0,clientName:"openclaw-control-ui",mode:"webchat",onHello:i=>{e.client===n&&(e.connected=!0,e.lastError=null,e.hello=i,rp(e,i),e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,hi(e),Al(e),Ks(e),ci(e,{quiet:!0}),nt(e,{quiet:!0}),no(e))},onClose:({code:i,reason:s})=>{e.client===n&&(e.connected=!1,i!==1012&&(e.lastError=`disconnected (${i}): ${s||"no reason"}`))},onEvent:i=>{e.client===n&&sp(e,i)},onGap:({expected:i,received:s})=>{e.client===n&&(e.lastError=`event gap detected (expected seq ${i}, got ${s}); refresh recommended`)}});e.client=n,t==null||t.stop(),n.start()}function sp(e,t){try{op(e,t)}catch(n){console.error("[gateway] handleGatewayEvent error:",t.event,n)}}function op(e,t){if(e.eventLogBuffer=[{ts:Date.now(),event:t.event,payload:t.payload},...e.eventLogBuffer].slice(0,250),e.tab==="debug"&&(e.eventLog=e.eventLogBuffer),t.event==="agent"){if(e.onboarding)return;_f(e,t.payload);return}if(t.event==="chat"){const n=t.payload;n!=null&&n.sessionKey&&gl(e,n.sessionKey);const i=Nf(e,n);if(i==="final"||i==="error"||i==="aborted"){hi(e),Hf(e);const s=n==null?void 0:n.runId;s&&e.refreshSessionsAfterChat.has(s)&&(e.refreshSessionsAfterChat.delete(s),i==="final"&&eo(e,{activeMinutes:bl}))}(i==="final"||i==="foreign_final")&&yn(e);return}if(t.event==="presence"){const n=t.payload;n!=null&&n.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence,e.presenceError=null,e.presenceStatus=null);return}if(t.event==="cron"&&e.tab==="cron"&&io(e),(t.event==="device.pair.requested"||t.event==="device.pair.resolved")&&nt(e,{quiet:!0}),t.event==="exec.approval.requested"){const n=Yf(t.payload);if(n){e.execApprovalQueue=Zf(e.execApprovalQueue,n),e.execApprovalError=null;const i=Math.max(0,n.expiresAtMs-Date.now()+500);window.setTimeout(()=>{e.execApprovalQueue=xr(e.execApprovalQueue,n.id)},i)}return}if(t.event==="exec.approval.resolved"){const n=Xf(t.payload);n&&(e.execApprovalQueue=xr(e.execApprovalQueue,n.id))}}function rp(e,t){const n=t.snapshot;n!=null&&n.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence),n!=null&&n.health&&(e.debugHealth=n.health),n!=null&&n.sessionDefaults&&ip(e,n.sessionDefaults)}const Ar="/api/bootstrap";async function ap(e){if(typeof window>"u"||typeof fetch!="function")return;const t=Ut(e.basePath??""),n=t?`${t}${Ar}`:Ar;try{const i=await fetch(n,{method:"GET",headers:{Accept:"application/json"},credentials:"same-origin"});if(!i.ok)return;const s=await i.json(),o=oo({agentId:s.assistantAgentId??null,name:s.assistantName,avatar:s.assistantAvatar??null});e.assistantName=o.name,e.assistantAvatar=o.avatar,e.assistantAgentId=o.agentId??null}catch{}}function lp(e){e.basePath=lf(),ap(e),of(e),ff(e,!0),cf(e),df(e),window.addEventListener("popstate",e.popStateHandler),Cl(e),Md(e),e.tab==="logs"&&Os(e),e.tab==="debug"&&Us(e)}function cp(e){_d(e)}function dp(e){var t;window.removeEventListener("popstate",e.popStateHandler),Pd(e),Bs(e),zs(e),uf(e),(t=e.topbarObserver)==null||t.disconnect(),e.topbarObserver=null}function up(e,t){if(!(e.tab==="chat"&&e.chatManualRefreshInFlight)){if(e.tab==="chat"&&(t.has("chatMessages")||t.has("chatToolMessages")||t.has("chatStream")||t.has("chatLoading")||t.has("tab"))){const n=t.has("tab"),i=t.has("chatLoading")&&t.get("chatLoading")===!0&&!e.chatLoading;wn(e,n||i||!e.chatHasAutoScrolled)}e.tab==="logs"&&(t.has("logsEntries")||t.has("logsAutoFollow")||t.has("tab"))&&e.logsAutoFollow&&e.logsAtBottom&&Fa(e,t.has("tab")||t.has("logsAutoFollow"))}}const fp="未命名报价单",pp=24e4,gp=12e4,Tl=1,El=800,_r=new WeakMap,hp={idle:["running"],running:["awaiting_choices","done","error","idle"],awaiting_choices:["resuming","running","error","idle"],resuming:["awaiting_choices","done","error","idle"],done:["running","idle","error"],error:["running","idle","resuming"]};class De extends Error{constructor(t){super(t),this.name="RetryableWorkError"}}class hs extends Error{constructor(t){super(t),this.name="RunIdInvalidError"}}function ro(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}function zt(e){let t=_r.get(e);return t||(t={controller:null,cancelRequested:!1,timeoutReached:!1},_r.set(e,t)),t}function Zn(e,t){const n=e.workRunStatus;if(n===t)return;if(!(hp[n]??[]).includes(t))throw new Error(`invalid work state transition: ${n} -> ${t}`);e.workRunStatus=t}function Dt(e,t){e.workRunStatus=t}function ao(e){e.workRunId=null,e.workPendingChoices=[],e.workSelections={}}function mp(e){return(e||"").trim().replace(/\\/g,"/").toLowerCase()}function vp(e,t){const n=(t.file_path||"").trim();if(n){const i=e.workOriginalFileNamesByPath[mp(n)];if(typeof i=="string"&&i.trim())return i.trim()}return xn(t)}function xn(e){var i,s;const t=(i=e==null?void 0:e.name)==null?void 0:i.trim();if(t)return t;const n=(s=e==null?void 0:e.file_path)==null?void 0:s.trim();if(n){const o=n.replace(/\\/g,"/").split("/").filter(Boolean).pop();if(o)return o}return fp}function yp(e){try{if(typeof e!="string"||!e.trim())return null;const t=e.trim();return t.startsWith("{")&&t.endsWith("}")||t.startsWith("[")&&t.endsWith("]")?JSON.parse(t):null}catch{return null}}function Cr(e){if(typeof e!="string")return!1;const t=e.trim().toLowerCase();return t?t==="__oos__"||t==="oos"||t==="无货":!1}function bp(e){const t=Array.isArray(e.fill_items_merged)?e.fill_items_merged:[];if(!t.length)return null;const n=Array.isArray(e.items)?e.items:[],i=Array.isArray(e.shortage)?e.shortage:[],s=new Map;for(const r of n)s.set(r.row,r);const o=t.map((r,a)=>{const l=r.row,c=s.get(l)??{},f=Number(r.qty??0),u=r.unit_price,p=u==null?null:Number(u),b=p==null||Number.isNaN(p)?null:p*f,x=String(r.code??""),k=String(r.quote_name??"").trim();let S=0,R=0;for(const F of i)if(F.row===l){S=Number(F.available_qty??0),R=Number(F.shortfall??0);break}const P=Cr(x)||k.includes("库存不足");return!P&&R===0&&S===0&&x&&!Cr(x)&&(S=f),{row_index:a,row:typeof l=="number"?l:void 0,product_name:String(c.product_name??""),specification:String(r.specification??c.specification??""),qty:f,code:x,quote_name:k,unit_price:p,amount:b,available_qty:S,shortfall:R,is_shortage:P?1:0,match_source:null}});return{name:xn({name:typeof e.name=="string"?e.name:"",file_path:typeof e.file_path=="string"?e.file_path:null}),file_path:typeof e.file_path=="string"?e.file_path:null,source:"file",lines:o}}function wp(e){if(!Array.isArray(e))return null;let t=null;for(const n of e){const i=n.type,s=n.content;if(i!=="observation"||typeof s!="string")continue;const o=yp(s);if(!o||typeof o!="object")continue;const r=o.pending_quotation_draft;if(r&&Array.isArray(r.lines)){t={...r,name:xn(r)};continue}const a=bp(o);a&&(t=a)}return t}function $p(e){const t=ie(e,"/api/work","pending_choices[]"),i=Bt(t.options,"/api/work","pending_choices[].options").map(s=>{const o=ie(s,"/api/work","pending_choices[].options[]");return{code:Ye(o.code,"/api/work","pending_choices[].options[].code"),matched_name:G(o.matched_name),unit_price:ge(o.unit_price),reasoning:G(o.reasoning)}});return{id:Ye(t.id,"/api/work","pending_choices[].id"),row:ge(t.row),keywords:G(t.keywords),product_name:G(t.product_name),specification:G(t.specification),qty:ge(t.qty)??G(t.qty),options:i}}function xp(e){const t=ie(e,"/api/work","pending_quotation_draft"),i=Bt(t.lines,"/api/work","pending_quotation_draft.lines").map((s,o)=>{const r=ie(s,"/api/work","pending_quotation_draft.lines[]"),a=ge(r.qty)??Number(r.qty??0),l=r.unit_price==null?null:Number(r.unit_price);return{row_index:ge(r.row_index)??o,row:ge(r.row),product_name:G(r.product_name),specification:G(r.specification),qty:Number.isFinite(a)?a:0,code:G(r.code),quote_name:G(r.quote_name),unit_price:l==null||Number.isNaN(l)?null:l,amount:r.amount==null?null:Number(r.amount),available_qty:ge(r.available_qty)??Number(r.available_qty??0),shortfall:ge(r.shortfall)??Number(r.shortfall??0),is_shortage:ge(r.is_shortage)??(js(r.is_shortage)?1:0),match_source:G(r.match_source)??null}});return{name:xn({name:G(t.name)??"",file_path:G(t.file_path)??null}),file_path:G(t.file_path)??null,source:G(t.source)??"file",lines:i}}function ms(e,t){const n=ie(e,t),s=(G(n.status)??"done")==="awaiting_choices"?"awaiting_choices":"done",o={status:s,success:js(n.success)??!0,answer:G(n.answer)??"",trace:Array.isArray(n.trace)?n.trace:[],error:G(n.error)};if(n.pending_quotation_draft!=null&&(o.pending_quotation_draft=xp(n.pending_quotation_draft)),s==="awaiting_choices"){o.run_id=Ye(n.run_id,t,"run_id");const r=Bt(n.pending_choices,t,"pending_choices");o.pending_choices=r.map(a=>$p(a))}return o}function vs(e,t){if(e.workResult={success:t.success,answer:t.answer,trace:t.trace,error:t.error},e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null,t.status==="awaiting_choices"){Zn(e,"awaiting_choices"),e.workRunId=t.run_id??null,e.workPendingChoices=t.pending_choices??[];const n={};for(const i of e.workPendingChoices)n[i.id]="__OOS__";e.workSelections=n;return}if(ao(e),t.pending_quotation_draft&&Array.isArray(t.pending_quotation_draft.lines))e.workPendingQuotationDraft={...t.pending_quotation_draft,name:xn(t.pending_quotation_draft)};else{const n=wp(t.trace);n&&(e.workPendingQuotationDraft=n)}t.success===!1||t.error&&t.error.trim()?(Dt(e,"error"),e.workError=fe("执行报价流程",t.error??"后端返回失败状态","本次报价流程未完成","点击“重试”重新运行，或检查后端日志")):Zn(e,"done")}function lo(e){return new Promise(t=>setTimeout(t,e))}function Rl(e){return e===408||e===429||e===500||e===502||e===503||e===504}function Ll(e,t){const n=zt(e),i=new AbortController;n.controller=i,n.timeoutReached=!1;const s=setTimeout(()=>{n.timeoutReached=!0,i.abort("timeout")},t);return{signal:i.signal,close:()=>{clearTimeout(s),n.controller===i&&(n.controller=null)}}}function ei(e){return e instanceof Error?e.name==="AbortError"||/aborted/i.test(e.message):!1}function kp(e,t){Dt(e,"error"),ao(e),e.workResult={success:!1,error:t},e.workError=fe("执行报价流程",t,"流程被中断，未产出有效结果","点击“重试”再次执行")}function co(e){Dt(e,"idle"),e.workError="已取消当前流程。",e.workResult=null}async function Sp(e,t){const n={file_paths:e.workFilePaths,customer_level:e.workCustomerLevel,do_register_oos:e.workDoRegisterOos},{signal:i,close:s}=Ll(e,pp);try{const o=await fetch(ro(e.basePath,t),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n),credentials:"same-origin",signal:i});if(!o.ok||!o.body){const f=await o.json().catch(()=>({})),u=Ne(f,`HTTP ${o.status}`);throw Rl(o.status)?new De(u):new Error(u)}const r=o.body.getReader(),a=new TextDecoder;let l="",c=!1;for(;;){const{done:f,value:u}=await r.read();if(f)break;l+=a.decode(u,{stream:!0});const p=l.split(`
`);l=p.pop()??"";for(const b of p){if(!b.startsWith("data: "))continue;const x=b.slice(6).trim();if(!x)continue;const k=ie(JSON.parse(x),t,"stream_event"),S=Ye(k.type,t,"stream_event.type");if(S==="stage"){const R=ge(k.stage)??Number(k.stage);if(!Number.isFinite(R))throw new le(t,"stage must be a number");e.workProgressStage=R,await lo(80)}else if(S==="result"){const R=ms(k.payload,t);vs(e,R),c=!0;break}}if(c)break}if(!c&&l.startsWith("data: ")){const f=l.slice(6).trim();if(f){const u=ie(JSON.parse(f),t,"stream_event_tail");if(u.type==="result"){const p=ms(u.payload,t);vs(e,p),c=!0}}}if(!c)throw new le(t,"stream ended without result event")}catch(o){const r=zt(e);throw r.cancelRequested?new Error("__WORK_CANCELLED__"):ei(o)&&r.timeoutReached?new De("请求超时"):ei(o)?new Error("请求已中断"):o instanceof le||o instanceof De?o:o instanceof Error&&/network|failed to fetch|load failed/i.test(o.message)?new De(o.message):o}finally{s()}}function Ap(e,t){if(e===404||e===410)return!0;const n=Ne(t,"").toLowerCase();return n.includes("run_id")||n.includes("run id")}async function _p(e,t,n){const i="/api/work/resume",{signal:s,close:o}=Ll(e,gp);try{const r=await fetch(ro(e.basePath,i),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({run_id:t,selections:n}),credentials:"same-origin",signal:s}),a=await r.json().catch(()=>({}));if(!r.ok){if(Ap(r.status,a))throw new hs(Ne(a,"run_id 已失效"));const c=Ne(a,`HTTP ${r.status}`);throw Rl(r.status)?new De(c):new Error(c)}const l=ms(a,i);vs(e,l)}catch(r){const a=zt(e);throw a.cancelRequested?new Error("__WORK_CANCELLED__"):r instanceof hs?r:ei(r)&&a.timeoutReached?new De("请求超时"):ei(r)?new Error("请求已中断"):r instanceof le||r instanceof De?r:r instanceof Error&&/network|failed to fetch|load failed/i.test(r.message)?new De(r.message):r}finally{o()}}function Cp(e){var n;const t=zt(e);t.cancelRequested=!0,(n=t.controller)==null||n.abort("user_cancel"),co(e),e.workRunning=!1}async function Il(e){if(!e.workFilePaths.length){e.workError="请先上传至少一个报价单文件";return}const t=zt(e);t.cancelRequested=!1,e.workRunning=!0,e.workError=null,e.workResult=null,e.workRunId=null,e.workPendingChoices=[],e.workSelections={},e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null,Zn(e,"running");let n=0;try{for(;;){n+=1;try{await Sp(e,"/api/work/run-stream");break}catch(i){if(i instanceof Error&&i.message==="__WORK_CANCELLED__"){co(e);break}if(i instanceof De&&n<=Tl){await lo(El*n);continue}const s=i instanceof le||i instanceof Error?i.message:String(i);kp(e,s);break}}}finally{e.workRunning=!1}}async function Ml(e){const t=e.workRunId;if(!t||e.workPendingChoices.length===0){e.workError="缺少可继续的 run_id，请重新执行。",Dt(e,"error");return}const n=e.workPendingChoices.map(o=>({item_id:o.id,selected_code:e.workSelections[o.id]??"__OOS__"})),i=zt(e);i.cancelRequested=!1,e.workRunning=!0,e.workError=null,Zn(e,"resuming");let s=0;try{for(;;){s+=1;try{await _p(e,t,n);break}catch(o){if(o instanceof Error&&o.message==="__WORK_CANCELLED__"){co(e);break}if(o instanceof hs){ao(e),e.workResult={success:!1,error:o.message},e.workError=fe("继续流程",o.message,"当前待选项无法继续提交","请重新执行一次 Work 流程"),Dt(e,"error");break}if(o instanceof De&&s<=Tl){await lo(El*s);continue}const r=o instanceof le||o instanceof Error?o.message:String(o);e.workResult={success:!1,error:r},e.workError=fe("继续流程",r,"本次续跑失败，尚未生成完整结果","点击“重试”继续，或重新执行 Work"),Dt(e,"error");break}}}finally{e.workRunning=!1}}async function Tp(e){if(e.workRunId&&e.workPendingChoices.length>0){await Ml(e);return}await Il(e)}async function Ep(e){var n;const t=e.workPendingQuotationDraft;if(!((n=t==null?void 0:t.lines)!=null&&n.length))return e.workQuotationDraftSaveStatus={status:"error",error:"无报价明细可保存"},!1;e.workQuotationDraftSaveStatus={status:"saving"};try{const i=await fetch(ro(e.basePath,"/api/quotation-drafts"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:vp(e,t),source:t.source||"file",file_path:t.file_path??void 0,lines:t.lines.map(u=>({product_name:u.product_name??"",specification:u.specification??"",qty:Number(u.qty)||0,code:u.code??"",quote_name:u.quote_name??"",unit_price:u.unit_price!=null?Number(u.unit_price):null,amount:u.amount!=null?Number(u.amount):null,available_qty:Number(u.available_qty)||0,shortfall:Number(u.shortfall)||0,is_shortage:u.is_shortage?1:0,match_source:u.match_source??null}))}),credentials:"same-origin"}),s=await i.json().catch(()=>({}));if(!i.ok)return e.workQuotationDraftSaveStatus={status:"error",error:fe("保存报价单",Ne(s,`HTTP ${i.status}`),"报价单仍停留在待保存状态","点击“重试”再次保存")},!1;const o=ie(s,"/api/quotation-drafts"),r=js(o.success),a=ie(o.data,"/api/quotation-drafts","data"),l=Ye(a.draft_no,"/api/quotation-drafts","data.draft_no"),c=ge(a.draft_id)??Number(a.draft_id),f=Number.isFinite(c)?c:0;if(r===!1)throw new le("/api/quotation-drafts","success is false");return e.workQuotationDraftSaveStatus={status:"ok",draft_no:l,draft_id:f},e.workPendingQuotationDraft=null,!0}catch(i){const s=i instanceof le||i instanceof Error?i.message:String(i);return e.workQuotationDraftSaveStatus={status:"error",error:fe("保存报价单",s,"报价单仍停留在待保存状态","检查数据后重试")},!1}}const Rp=[{value:"FACTORY_INC_TAX",label:"出厂价_含税"},{value:"FACTORY_EXC_TAX",label:"出厂价_不含税"},{value:"PURCHASE_EXC_TAX",label:"采购不含税"},{value:"A_MARGIN",label:"（二级代理）A级别 利润率"},{value:"A_QUOTE",label:"（二级代理）A级别 报单价格"},{value:"B_MARGIN",label:"（一级代理）B级别 利润率"},{value:"B_QUOTE",label:"（一级代理）B级别 报单价格"},{value:"C_MARGIN",label:"（聚万大客户）C级别 利润率"},{value:"C_QUOTE",label:"（聚万大客户）C级别 报单价格"},{value:"D_MARGIN",label:"（青山大客户）D级别 利润率"},{value:"D_QUOTE",label:"（青山大客户）D级别 报单价格"},{value:"D_LOW",label:"（青山大客户）D级别 降低利润率"},{value:"E_MARGIN",label:"（大唐大客户）E级别（包运费） 利润率"},{value:"E_QUOTE",label:"（大唐大客户）E级别（包运费） 报单价格"}];function Tr(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}function Lp(e){try{if(typeof e!="string"||!e.trim())return null;const t=e.trim();return t.startsWith("{")&&t.endsWith("}")||t.startsWith("[")&&t.endsWith("]")?JSON.parse(t):null}catch{return null}}function Ip(e){if(!Array.isArray(e))return[];const t=[];for(const n of e){const i=n.type,s=n.content;if(i!=="observation"||typeof s!="string")continue;const o=Lp(s);if(!o||typeof o!="object")continue;const r=o.output_path;if(typeof r=="string"&&r.trim()){const a=r.replace(/\\/g,"/").split("/").filter(Boolean).pop()??"";a&&!t.includes(a)&&t.push(a)}}return t}function Mp(e,t,n){return d`
    <li style="margin-bottom: 14px; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
      <div style="font-size: 13px; margin-bottom: 8px;">
        ${e.product_name??e.keywords??""}
        ${e.specification?d`<span class="muted"> · ${e.specification}</span>`:$}
        ${e.qty!=null?d`<span class="muted"> · ${y("work.qty")}: ${e.qty}</span>`:$}
      </div>
      <select
        .value=${t}
        @change=${i=>n(i.target.value)}
        aria-label=${y("work.choiceSelect")}
        style="width: 100%; max-width: 460px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border);"
      >
        <option value="__OOS__">${y("work.choiceOos")}</option>
        ${(e.options??[]).map(i=>d`<option value=${i.code}>${i.code}${i.matched_name?` · ${i.matched_name}`:""}${i.unit_price!=null?` · ${i.unit_price}`:""}</option>`)}
      </select>
    </li>
  `}function Pp(e){var B,ee,ce;const{basePath:t,workFilePaths:n,workRunning:i,workProgressStage:s,workRunStatus:o,workPendingChoices:r,workSelections:a,workResult:l,workError:c,workCustomerLevel:f,workDoRegisterOos:u,workPendingQuotationDraft:p,workQuotationDraftSaveStatus:b,onAddFile:x,onRemoveFile:k,onCustomerLevelChange:S,onDoRegisterOosChange:R,onRun:P,onCancel:F,onRetry:I,onSelectionChange:A,onResume:g,onQuotationLineChange:_,onQuotationDraftSave:C,onQuotationDraftDismiss:L}=e,U=[y("work.stageExtract"),y("work.stageMatch"),y("work.stageFill")],O=T=>{const H=Tr(t,"/api/quotation/upload"),Q=new FormData;Q.append("file",T),fetch(H,{method:"POST",body:Q,credentials:"same-origin"}).then(q=>q.json()).then(q=>{typeof q.file_path=="string"&&x(q.file_path,q.file_name??T.name)}).catch(()=>{})},z=T=>{var q;const H=T.target,Q=(q=H.files)==null?void 0:q[0];Q&&(O(Q),H.value="")},K=T=>{var Q;T.preventDefault();const H=(Q=T.dataTransfer)==null?void 0:Q.files;if(!(!H||!H.length))for(let q=0;q<H.length;q+=1){const We=H.item(q);We&&O(We)}},Y=T=>{T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect="copy")};return d`
    <section class="card" style="margin-bottom: 16px;" aria-label=${y("tabs.work")}>
      <div class="card-title" style="margin-bottom: 8px;">${y("tabs.work")}</div>
      <p class="muted" style="margin-bottom: 12px;">${y("subtitles.work")}</p>

      <div
        style="margin-bottom: 12px; padding: 10px; border-radius: 8px; border: 1px dashed var(--border); background: var(--bg-secondary, #fafafa);"
        @dragover=${Y}
        @dragenter=${Y}
        @drop=${K}
      >
        <label class="card-title" style="font-size: 13px;">${y("work.uploadTitle")}</label>
        <input
          type="file"
          accept=".xlsx,.xls,.xlsm"
          @change=${z}
          style="margin-top: 6px;"
          aria-label=${y("work.uploadTitle")}
        />
        ${n.length?d`
              <ul style="margin-top: 8px; padding-left: 20px; font-size: 13px;">
                ${n.map((T,H)=>d`
                    <li style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                      <span style="word-break: break-all;">${T.split(/[/\\]/).pop()??T}</span>
                      <button
                        type="button"
                        class="btn btn-sm"
                        style="padding: 2px 8px;"
                        @click=${()=>k(H)}
                        aria-label=${y("work.removeFile")}
                      >
                        ${y("work.removeFile")}
                      </button>
                    </li>
                  `)}
              </ul>
            `:d`<p class="muted" style="margin-top: 6px;">${y("work.noFiles")}</p>`}
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 12px;">
        <div>
          <label style="font-size: 12px; color: var(--muted);">${y("work.customerLevel")}</label>
          <select
            .value=${f}
            @change=${T=>S(T.target.value)}
            style="margin-left: 8px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 160px;"
            aria-label=${y("work.customerLevel")}
          >
            ${Rp.map(T=>d`<option value=${T.value}>${T.label}</option>`)}
          </select>
        </div>
        <label style="display: flex; align-items: center; gap: 6px; font-size: 13px;">
          <input
            type="checkbox"
            ?checked=${u}
            @change=${T=>R(T.target.checked)}
            aria-label=${y("work.registerOos")}
          />
          ${y("work.registerOos")}
        </label>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${i?d`
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                ${U.map((T,H)=>d`
                    <span
                      style="
                        padding: 6px 12px;
                        border-radius: 8px;
                        font-size: 13px;
                        background: ${s>=0&&H===s?"var(--accent)":"var(--bg-secondary, #eee)"};
                        color: ${s>=0&&H===s?"var(--bg)":"var(--muted)"};
                      "
                    >
                      ${H+1}. ${T}
                    </span>
                  `)}
              </div>
              <p class="muted" style="font-size: 12px; margin: 0;">
                ${y("work.currentStage")}: ${s>=0&&s<U.length?U[s]:y("work.running")}
              </p>
            `:$}

        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
          <button
            class="btn"
            style="background: var(--accent); color: var(--bg);"
            ?disabled=${n.length===0||i}
            @click=${P}
            aria-label=${y("work.run")}
          >
            ${y(i?"work.running":"work.run")}
          </button>
          ${i?d`<button class="btn btn-sm" @click=${F} aria-label=${y("work.cancel")}>${y("work.cancel")}</button>`:$}
          ${o==="error"?d`<button class="btn btn-sm" @click=${I} aria-label=${y("common.retry")}>${y("common.retry")}</button>`:$}
          ${n.length===0?d`<span class="muted" style="font-size: 12px;">${y("work.runHint")}</span>`:$}
          <span class="muted" style="font-size: 12px;">${y("work.statusLabel")}: ${o}</span>
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
            <div class="card-title">${y("work.awaitingTitle")}</div>
            <p class="muted" style="margin-bottom: 12px;">${y("work.awaitingHint")}</p>
            <ul style="list-style: none; padding: 0; margin: 0;">
              ${r.map(T=>Mp(T,a[T.id]??"__OOS__",H=>A(T.id,H)))}
            </ul>
            <div style="display: flex; gap: 8px; margin-top: 12px;">
              <button class="btn" style="background: var(--accent); color: var(--bg);" ?disabled=${i} @click=${g}>
                ${y(i||o==="resuming"?"work.resuming":"work.resume")}
              </button>
              ${o==="error"?d`<button class="btn btn-sm" @click=${I}>${y("common.retry")}</button>`:$}
            </div>
          </section>
        `:$}

    ${(b==null?void 0:b.status)==="ok"?d`
          <section class="card" style="margin-bottom: 16px;" role="status" aria-live="polite">
            <p style="color: var(--success, #2e7d32); margin: 0 0 4px 0;">${y("work.savedDraftNo",{no:b.draft_no})}</p>
            <p class="muted" style="margin: 0 0 8px 0; font-size: 12px;">${y("work.saveSuccessHint")}</p>
            <button class="btn btn-sm" @click=${L}>${y("common.close")}</button>
          </section>
        `:(B=p==null?void 0:p.lines)!=null&&B.length?d`
            <section class="card" style="margin-bottom: 16px;">
              <div class="card-title">${y("work.pendingDraftTitle")}</div>
              <p class="muted" style="margin-bottom: 10px;">${y("work.pendingDraftHint")}</p>
              <div style="overflow-x: auto; margin-bottom: 12px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                  <thead>
                    <tr style="background: var(--bg-secondary, #eee);">
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">#</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("work.lineProduct")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("work.lineSpec")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("work.lineQty")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("work.lineCode")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("work.lineQuoteName")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("work.linePrice")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("work.lineAmount")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("work.lineAvailable")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("work.lineShortfall")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("work.lineIsShortage")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${p.lines.map((T,H)=>d`
                        <tr>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${H+1}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${T.product_name??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${T.specification??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="number" min="0" step="1" .value=${String(T.qty??"")} @change=${Q=>_(H,"qty",Q.target.value)} style="width: 72px;" aria-label=${y("work.lineQty")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="text" .value=${T.code??""} @change=${Q=>_(H,"code",Q.target.value)} style="width: 90px;" aria-label=${y("work.lineCode")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="text" .value=${T.quote_name??""} @change=${Q=>_(H,"quote_name",Q.target.value)} style="width: 120px;" aria-label=${y("work.lineQuoteName")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="number" min="0" step="0.01" .value=${T.unit_price!=null?String(T.unit_price):""} @change=${Q=>_(H,"unit_price",Q.target.value)} style="width: 90px;" aria-label=${y("work.linePrice")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${T.amount!=null?T.amount:""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${T.available_qty??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${T.shortfall??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${T.is_shortage?y("common.yes"):y("common.no")}</td>
                        </tr>
                      `)}
                  </tbody>
                </table>
              </div>

              ${(b==null?void 0:b.status)==="error"?d`<p style="color: var(--danger, #c00); margin-bottom: 10px;">${b.error}</p>`:$}

              <div style="display: flex; gap: 8px;">
                <button class="btn" style="background: var(--accent); color: var(--bg);" ?disabled=${(b==null?void 0:b.status)==="saving"} @click=${C}>
                  ${(b==null?void 0:b.status)==="saving"?y("work.saving"):y("work.saveDraft")}
                </button>
                <button class="btn btn-sm" ?disabled=${(b==null?void 0:b.status)==="saving"} @click=${L}>
                  ${y("common.cancel")}
                </button>
              </div>
            </section>
          `:$}

    ${l&&!((ee=p==null?void 0:p.lines)!=null&&ee.length)?d`
          <section class="card">
            <div class="card-title">${y("work.resultTitle")}</div>
            ${(()=>{const T=Ip(l.trace);return T.length?d`
                    <div style="margin-bottom: 12px;">
                      ${T.map(H=>d`
                          <a href=${Tr(t,`/api/quotation/download?path=${encodeURIComponent(H)}`)} download=${H} class="btn btn-sm" style="margin-right: 8px; margin-bottom: 6px; text-decoration: none;">
                            ${y("work.download",{name:H})}
                          </a>
                        `)}
                    </div>
                  `:$})()}

            ${l.answer?d`<div style="white-space: pre-wrap; margin-bottom: 12px;">${l.answer}</div>`:$}
            ${l.error?d`<p style="color: var(--danger, #e53935);">${l.error}</p>`:$}

            ${(ce=l.trace)!=null&&ce.length?d`
                  <details style="margin-top: 12px;">
                    <summary>${y("work.trace",{count:String(l.trace.length)})}</summary>
                    <pre style="max-height: 420px; overflow: auto; margin-top: 8px; font-size: 11px; white-space: pre-wrap;">${JSON.stringify(l.trace,null,2)}</pre>
                  </details>
                `:$}
          </section>
        `:$}
  `}function Er(e){return(e||"").trim().replace(/\\/g,"/").toLowerCase()}function Dp(e){return e.tab!=="work"?$:Pp({basePath:e.basePath,workFilePaths:e.workFilePaths,workRunning:e.workRunning,workProgressStage:e.workProgressStage,workRunStatus:e.workRunStatus,workRunId:e.workRunId,workPendingChoices:e.workPendingChoices,workSelections:e.workSelections,workResult:e.workResult,workError:e.workError,workCustomerLevel:e.workCustomerLevel,workDoRegisterOos:e.workDoRegisterOos,workOriginalFileNamesByPath:e.workOriginalFileNamesByPath,workPendingQuotationDraft:e.workPendingQuotationDraft,workQuotationDraftSaveStatus:e.workQuotationDraftSaveStatus,onAddFile:(t,n)=>{e.workFilePaths.includes(t)||(e.workFilePaths=[...e.workFilePaths,t]);const i=Er(t);i&&(e.workOriginalFileNamesByPath={...e.workOriginalFileNamesByPath,[i]:(n||"").trim()||t.split(/[/\\]/).pop()||t})},onRemoveFile:t=>{const n=e.workFilePaths[t]??"";e.workFilePaths=e.workFilePaths.filter((s,o)=>o!==t);const i=Er(n);if(i&&e.workOriginalFileNamesByPath[i]!==void 0){const s={...e.workOriginalFileNamesByPath};delete s[i],e.workOriginalFileNamesByPath=s}},onCustomerLevelChange:t=>{e.workCustomerLevel=t},onDoRegisterOosChange:t=>{e.workDoRegisterOos=t},onRun:()=>void Il(e),onCancel:()=>Cp(e),onRetry:()=>void Tp(e),onSelectionChange:(t,n)=>{e.workSelections={...e.workSelections,[t]:n}},onResume:()=>void Ml(e),onQuotationLineChange:(t,n,i)=>{var a;const s=e.workPendingQuotationDraft;if(!((a=s==null?void 0:s.lines)!=null&&a.length)||t<0||t>=s.lines.length)return;const o=s.lines.slice(),r={...o[t]};if(n==="qty"){const l=Number(i);r.qty=Number.isFinite(l)?l:0}else if(n==="unit_price"){const l=String(i??"").trim();if(!l)r.unit_price=null;else{const c=Number(l);r.unit_price=Number.isFinite(c)?c:null}}else r[n]=i;if(n==="qty"||n==="unit_price"){const l=Number(r.qty??0),c=r.unit_price==null?NaN:Number(r.unit_price);r.amount=Number.isFinite(l)&&Number.isFinite(c)?l*c:null}o[t]=r,e.workPendingQuotationDraft={...s,lines:o}},onQuotationDraftSave:()=>{typeof window<"u"&&window.confirm(y("work.saveConfirm"))&&Ep(e).then(t=>{t&&e.loadFulfillDrafts()})},onQuotationDraftDismiss:()=>{e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null}})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const uo={CHILD:2},fo=e=>(...t)=>({_$litDirective$:e,values:t});let po=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,i){this._$Ct=t,this._$AM=n,this._$Ci=i}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:Fp}=jc,Rr=e=>e,Np=e=>e.strings===void 0,Lr=()=>document.createComment(""),Gt=(e,t,n)=>{var o;const i=e._$AA.parentNode,s=t===void 0?e._$AB:t._$AA;if(n===void 0){const r=i.insertBefore(Lr(),s),a=i.insertBefore(Lr(),s);n=new Fp(r,a,e,e.options)}else{const r=n._$AB.nextSibling,a=n._$AM,l=a!==e;if(l){let c;(o=n._$AQ)==null||o.call(n,e),n._$AM=e,n._$AP!==void 0&&(c=e._$AU)!==a._$AU&&n._$AP(c)}if(r!==s||l){let c=n._$AA;for(;c!==r;){const f=Rr(c).nextSibling;Rr(i).insertBefore(c,s),c=f}}}return n},rt=(e,t,n=e)=>(e._$AI(t,n),e),Op={},Bp=(e,t=Op)=>e._$AH=t,Up=e=>e._$AH,qi=e=>{e._$AR(),e._$AA.remove()};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ir=(e,t,n)=>{const i=new Map;for(let s=t;s<=n;s++)i.set(e[s],s);return i},Pl=fo(class extends po{constructor(e){if(super(e),e.type!==uo.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,n){let i;n===void 0?n=t:t!==void 0&&(i=t);const s=[],o=[];let r=0;for(const a of e)s[r]=i?i(a,r):r,o[r]=n(a,r),r++;return{values:o,keys:s}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,i]){const s=Up(e),{values:o,keys:r}=this.dt(t,n,i);if(!Array.isArray(s))return this.ut=r,o;const a=this.ut??(this.ut=[]),l=[];let c,f,u=0,p=s.length-1,b=0,x=o.length-1;for(;u<=p&&b<=x;)if(s[u]===null)u++;else if(s[p]===null)p--;else if(a[u]===r[b])l[b]=rt(s[u],o[b]),u++,b++;else if(a[p]===r[x])l[x]=rt(s[p],o[x]),p--,x--;else if(a[u]===r[x])l[x]=rt(s[u],o[x]),Gt(e,l[x+1],s[u]),u++,x--;else if(a[p]===r[b])l[b]=rt(s[p],o[b]),Gt(e,s[u],s[p]),p--,b++;else if(c===void 0&&(c=Ir(r,b,x),f=Ir(a,u,p)),c.has(a[u]))if(c.has(a[p])){const k=f.get(r[b]),S=k!==void 0?s[k]:null;if(S===null){const R=Gt(e,s[u]);rt(R,o[b]),l[b]=R}else l[b]=rt(S,o[b]),Gt(e,s[u],S),s[k]=null;b++}else qi(s[p]),p--;else qi(s[u]),u++;for(;b<=x;){const k=Gt(e,l[x+1]);rt(k,o[b]),l[b++]=k}for(;u<=p;){const k=s[u++];k!==null&&qi(k)}return this.ut=r,Bp(e,l),Ze}}),re={messageSquare:d`
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
  `};function zp(e){var s,o,r,a,l;const t=(s=e.hello)==null?void 0:s.snapshot,n=(r=(o=t==null?void 0:t.sessionDefaults)==null?void 0:o.mainSessionKey)==null?void 0:r.trim();if(n)return n;const i=(l=(a=t==null?void 0:t.sessionDefaults)==null?void 0:a.mainKey)==null?void 0:l.trim();return i||"main"}function Kp(e,t){e.sessionKey=t,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:t,lastActiveSessionKey:t})}function Hp(e,t){const n=ul(t,e.basePath);return d`
    <a
      href=${n}
      class="nav-item ${e.tab===t?"active":""}"
      @click=${i=>{if(!(i.defaultPrevented||i.button!==0||i.metaKey||i.ctrlKey||i.shiftKey||i.altKey)){if(i.preventDefault(),t==="chat"){const s=zp(e);e.sessionKey!==s&&(Kp(e,s),e.loadAssistantIdentity())}e.setTab(t)}}}
      title=${ds(t)}
    >
      <span class="nav-item__icon" aria-hidden="true">${re[Yu(t)]}</span>
      <span class="nav-item__text">${ds(t)}</span>
    </a>
  `}function jp(e){const t=qp(e.hello,e.sessionsResult),n=Vp(e.sessionKey,e.sessionsResult,t),i=e.onboarding,s=e.onboarding,o=e.onboarding?!1:e.settings.chatShowThinking,r=e.onboarding?!0:e.settings.chatFocusMode,a=d`
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
          @change=${c=>{const f=c.target.value;e.sessionKey=f,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:f,lastActiveSessionKey:f}),e.loadAssistantIdentity(),gf(e,f),yn(e)}}
        >
          ${Pl(n,c=>c.key,c=>d`<option value=${c.key} title=${c.key}>
                ${c.displayName??c.key}
              </option>`)}
        </select>
      </label>
      <button
        class="btn btn--sm btn--icon"
        ?disabled=${e.chatLoading||!e.connected}
        @click=${async()=>{const c=e;c.chatManualRefreshInFlight=!0,c.chatNewMessagesBelow=!1,await c.updateComplete,c.resetToolStream();try{await Sl(e,{scheduleScroll:!1}),c.scrollToBottom({smooth:!0})}finally{requestAnimationFrame(()=>{c.chatManualRefreshInFlight=!1,c.chatNewMessagesBelow=!1})}}}
        title=${y("chat.refreshTitle")}
      >
        ${a}
      </button>
      <span class="chat-controls__separator">|</span>
      <button
        class="btn btn--sm btn--icon ${o?"active":""}"
        ?disabled=${i}
        @click=${()=>{i||e.applySettings({...e.settings,chatShowThinking:!e.settings.chatShowThinking})}}
        aria-pressed=${o}
        title=${y(i?"chat.onboardingDisabled":"chat.thinkingToggle")}
      >
        ${re.brain}
      </button>
      <button
        class="btn btn--sm btn--icon ${r?"active":""}"
        ?disabled=${s}
        @click=${()=>{s||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})}}
        aria-pressed=${r}
        title=${y(s?"chat.onboardingDisabled":"chat.focusToggle")}
      >
        ${l}
      </button>
    </div>
  `}function qp(e,t){var o,r,a,l,c;const n=e==null?void 0:e.snapshot,i=(r=(o=n==null?void 0:n.sessionDefaults)==null?void 0:o.mainSessionKey)==null?void 0:r.trim();if(i)return i;const s=(l=(a=n==null?void 0:n.sessionDefaults)==null?void 0:a.mainKey)==null?void 0:l.trim();return s||((c=t==null?void 0:t.sessions)!=null&&c.some(f=>f.key==="main")?"main":null)}const Wn={bluebubbles:"iMessage",telegram:"Telegram",discord:"Discord",signal:"Signal",slack:"Slack",whatsapp:"WhatsApp",matrix:"Matrix",email:"Email",sms:"SMS"},Wp=Object.keys(Wn);function Mr(e){return e.charAt(0).toUpperCase()+e.slice(1)}function Gp(e){if(e==="main"||e==="agent:main:main")return{prefix:"",fallbackName:"Main Session"};if(e.includes(":subagent:"))return{prefix:"Subagent:",fallbackName:"Subagent:"};if(e.includes(":cron:"))return{prefix:"Cron:",fallbackName:"Cron Job:"};const t=e.match(/^agent:[^:]+:([^:]+):direct:(.+)$/);if(t){const i=t[1],s=t[2];return{prefix:"",fallbackName:`${Wn[i]??Mr(i)} · ${s}`}}const n=e.match(/^agent:[^:]+:([^:]+):group:(.+)$/);if(n){const i=n[1];return{prefix:"",fallbackName:`${Wn[i]??Mr(i)} Group`}}for(const i of Wp)if(e===i||e.startsWith(`${i}:`))return{prefix:"",fallbackName:`${Wn[i]} Session`};return{prefix:"",fallbackName:e}}function Wi(e,t){var a,l;const n=((a=t==null?void 0:t.label)==null?void 0:a.trim())||"",i=((l=t==null?void 0:t.displayName)==null?void 0:l.trim())||"",{prefix:s,fallbackName:o}=Gp(e),r=c=>s?new RegExp(`^${s.replace(/[.*+?^${}()|[\\]\\]/g,"\\$&")}\\s*`,"i").test(c)?c:`${s} ${c}`:c;return n&&n!==e?r(n):i&&i!==e?r(i):o}function Vp(e,t,n){var a,l;const i=new Set,s=[],o=n&&((a=t==null?void 0:t.sessions)==null?void 0:a.find(c=>c.key===n)),r=(l=t==null?void 0:t.sessions)==null?void 0:l.find(c=>c.key===e);if(n&&(i.add(n),s.push({key:n,displayName:Wi(n,o||void 0)})),i.has(e)||(i.add(e),s.push({key:e,displayName:Wi(e,r)})),t!=null&&t.sessions)for(const c of t.sessions)i.has(c.key)||(i.add(c.key),s.push({key:c.key,displayName:Wi(c.key,c)}));return s}const Qp=["system","light","dark"];function Jp(e){const t=Math.max(0,Qp.indexOf(e.theme)),n=i=>s=>{const r={element:s.currentTarget};(s.clientX||s.clientY)&&(r.pointerClientX=s.clientX,r.pointerClientY=s.clientY),e.setTheme(i,r)};return d`
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
          ${Zp()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="light"?"active":""}"
          @click=${n("light")}
          aria-pressed=${e.theme==="light"}
          aria-label="Light theme"
          title="Light"
        >
          ${Yp()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="dark"?"active":""}"
          @click=${n("dark")}
          aria-pressed=${e.theme==="dark"}
          aria-label="Dark theme"
          title="Dark"
        >
          ${Xp()}
        </button>
      </div>
    </div>
  `}function Yp(){return d`
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
  `}function Xp(){return d`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
      ></path>
    </svg>
  `}function Zp(){return d`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="20" height="14" x="2" y="3" rx="2"></rect>
      <line x1="8" x2="16" y1="21" y2="21"></line>
      <line x1="12" x2="12" y1="17" y2="21"></line>
    </svg>
  `}function Dl(e,t){if(!e)return e;const i=e.files.some(s=>s.name===t.name)?e.files.map(s=>s.name===t.name?t:s):[...e.files,t];return{...e,files:i}}async function Gi(e,t){if(!(!e.client||!e.connected||e.agentFilesLoading)){e.agentFilesLoading=!0,e.agentFilesError=null;try{const n=await e.client.request("agents.files.list",{agentId:t});n&&(e.agentFilesList=n,e.agentFileActive&&!n.files.some(i=>i.name===e.agentFileActive)&&(e.agentFileActive=null))}catch(n){e.agentFilesError=String(n)}finally{e.agentFilesLoading=!1}}}async function eg(e,t,n,i){if(!(!e.client||!e.connected||e.agentFilesLoading)&&!Object.hasOwn(e.agentFileContents,n)){e.agentFilesLoading=!0,e.agentFilesError=null;try{const s=await e.client.request("agents.files.get",{agentId:t,name:n});if(s!=null&&s.file){const o=s.file.content??"",r=e.agentFileContents[n]??"",a=e.agentFileDrafts[n],l=(i==null?void 0:i.preserveDraft)??!0;e.agentFilesList=Dl(e.agentFilesList,s.file),e.agentFileContents={...e.agentFileContents,[n]:o},(!l||!Object.hasOwn(e.agentFileDrafts,n)||a===r)&&(e.agentFileDrafts={...e.agentFileDrafts,[n]:o})}}catch(s){e.agentFilesError=String(s)}finally{e.agentFilesLoading=!1}}}async function tg(e,t,n,i){if(!(!e.client||!e.connected||e.agentFileSaving)){e.agentFileSaving=!0,e.agentFilesError=null;try{const s=await e.client.request("agents.files.set",{agentId:t,name:n,content:i});s!=null&&s.file&&(e.agentFilesList=Dl(e.agentFilesList,s.file),e.agentFileContents={...e.agentFileContents,[n]:i},e.agentFileDrafts={...e.agentFileDrafts,[n]:i})}catch(s){e.agentFilesError=String(s)}finally{e.agentFileSaving=!1}}}function Fl(e){return e?`${Jn(e)} (${wt(e)})`:"n/a"}function ng(e){if(e==null)return"";try{return JSON.stringify(e,null,2)}catch{return String(e)}}function ig(e){const t=e.state??{},n=t.nextRunAtMs?Jn(t.nextRunAtMs):"n/a",i=t.lastRunAtMs?Jn(t.lastRunAtMs):"n/a";return`${t.lastStatus??"n/a"} · next ${n} · last ${i}`}function sg(e){const t=e.schedule;if(t.kind==="at"){const n=Date.parse(t.at);return Number.isFinite(n)?`At ${Jn(n)}`:`At ${t.at}`}return t.kind==="every"?`Every ${Ua(t.everyMs)}`:`Cron ${t.expr}${t.tz?` (${t.tz})`:""}`}function og(e){const t=e.payload;if(t.kind==="systemEvent")return`System: ${t.text}`;const n=`Agent: ${t.message}`,i=e.delivery;if(i&&i.mode!=="none"){const s=i.mode==="webhook"?i.to?` (${i.to})`:"":i.channel||i.to?` (${i.channel??"last"}${i.to?` -> ${i.to}`:""})`:"";return`${n} · ${i.mode}${s}`}return n}function je(e){const t=(e??"").trim();return t?t.replace(/\s+/g,"_").toLowerCase():""}function rg(e){return[]}function ag(e){return{allow:[],alsoAllow:[],deny:[]}}const Pr=[{id:"fs",label:"Files",tools:[{id:"read",label:"read",description:"Read file contents"},{id:"write",label:"write",description:"Create or overwrite files"},{id:"edit",label:"edit",description:"Make precise edits"},{id:"apply_patch",label:"apply_patch",description:"Patch files (OpenAI)"}]},{id:"runtime",label:"Runtime",tools:[{id:"exec",label:"exec",description:"Run shell commands"},{id:"process",label:"process",description:"Manage background processes"}]},{id:"web",label:"Web",tools:[{id:"web_search",label:"web_search",description:"Search the web"},{id:"web_fetch",label:"web_fetch",description:"Fetch web content"}]},{id:"memory",label:"Memory",tools:[{id:"memory_search",label:"memory_search",description:"Semantic search"},{id:"memory_get",label:"memory_get",description:"Read memory files"}]},{id:"sessions",label:"Sessions",tools:[{id:"sessions_list",label:"sessions_list",description:"List sessions"},{id:"sessions_history",label:"sessions_history",description:"Session history"},{id:"sessions_send",label:"sessions_send",description:"Send to session"},{id:"sessions_spawn",label:"sessions_spawn",description:"Spawn sub-agent"},{id:"session_status",label:"session_status",description:"Session status"}]},{id:"ui",label:"UI",tools:[{id:"browser",label:"browser",description:"Control web browser"},{id:"canvas",label:"canvas",description:"Control canvases"}]},{id:"messaging",label:"Messaging",tools:[{id:"message",label:"message",description:"Send messages"}]},{id:"automation",label:"Automation",tools:[{id:"cron",label:"cron",description:"Schedule tasks"},{id:"gateway",label:"gateway",description:"Gateway control"}]},{id:"nodes",label:"Nodes",tools:[{id:"nodes",label:"nodes",description:"Nodes + devices"}]},{id:"agents",label:"Agents",tools:[{id:"agents_list",label:"agents_list",description:"List agents"}]},{id:"media",label:"Media",tools:[{id:"image",label:"image",description:"Image understanding"}]}],lg=[{id:"minimal",label:"Minimal"},{id:"coding",label:"Coding"},{id:"messaging",label:"Messaging"},{id:"full",label:"Full"}];function ys(e){var t,n,i;return((t=e.name)==null?void 0:t.trim())||((i=(n=e.identity)==null?void 0:n.name)==null?void 0:i.trim())||e.id}function Dn(e){const t=e.trim();if(!t||t.length>16)return!1;let n=!1;for(let i=0;i<t.length;i+=1)if(t.charCodeAt(i)>127){n=!0;break}return!(!n||t.includes("://")||t.includes("/")||t.includes("."))}function mi(e,t){var r,a,l,c,f,u;const n=(r=t==null?void 0:t.emoji)==null?void 0:r.trim();if(n&&Dn(n))return n;const i=(l=(a=e.identity)==null?void 0:a.emoji)==null?void 0:l.trim();if(i&&Dn(i))return i;const s=(c=t==null?void 0:t.avatar)==null?void 0:c.trim();if(s&&Dn(s))return s;const o=(u=(f=e.identity)==null?void 0:f.avatar)==null?void 0:u.trim();return o&&Dn(o)?o:""}function Nl(e,t){return t&&e===t?"default":null}function cg(e){if(e==null||!Number.isFinite(e))return"-";if(e<1024)return`${e} B`;const t=["KB","MB","GB","TB"];let n=e/1024,i=0;for(;n>=1024&&i<t.length-1;)n/=1024,i+=1;return`${n.toFixed(n<10?1:0)} ${t[i]}`}function vi(e,t){var o,r;const n=e;return{entry:(((o=n==null?void 0:n.agents)==null?void 0:o.list)??[]).find(a=>(a==null?void 0:a.id)===t),defaults:(r=n==null?void 0:n.agents)==null?void 0:r.defaults,globalTools:n==null?void 0:n.tools}}function Dr(e,t,n,i,s){var b,x,k,S,R,P,F,I,A,g,_,C;const o=vi(t,e.id),a=(n&&n.agentId===e.id?n.workspace:null)||((b=o.entry)==null?void 0:b.workspace)||((x=o.defaults)==null?void 0:x.workspace)||"default",l=(k=o.entry)!=null&&k.model?an((S=o.entry)==null?void 0:S.model):an((R=o.defaults)==null?void 0:R.model),c=((P=s==null?void 0:s.name)==null?void 0:P.trim())||((I=(F=e.identity)==null?void 0:F.name)==null?void 0:I.trim())||((A=e.name)==null?void 0:A.trim())||((g=o.entry)==null?void 0:g.name)||e.id,f=mi(e,s)||"-",u=Array.isArray((_=o.entry)==null?void 0:_.skills)?(C=o.entry)==null?void 0:C.skills:null,p=(u==null?void 0:u.length)??null;return{workspace:a,model:l,identityName:c,identityEmoji:f,skillsLabel:u?`${p} selected`:"all skills",isDefault:!!(i&&e.id===i)}}function an(e){var t;if(!e)return"-";if(typeof e=="string")return e.trim()||"-";if(typeof e=="object"&&e){const n=e,i=(t=n.primary)==null?void 0:t.trim();if(i){const s=Array.isArray(n.fallbacks)?n.fallbacks.length:0;return s>0?`${i} (+${s} fallback)`:i}}return"-"}function Fr(e){const t=e.match(/^(.+) \(\+\d+ fallback\)$/);return t?t[1]:e}function Nr(e){if(!e)return null;if(typeof e=="string")return e.trim()||null;if(typeof e=="object"&&e){const t=e,n=typeof t.primary=="string"?t.primary:typeof t.model=="string"?t.model:typeof t.id=="string"?t.id:typeof t.value=="string"?t.value:null;return(n==null?void 0:n.trim())||null}return null}function dg(e){if(!e||typeof e=="string")return null;if(typeof e=="object"&&e){const t=e,n=Array.isArray(t.fallbacks)?t.fallbacks:Array.isArray(t.fallback)?t.fallback:null;return n?n.filter(i=>typeof i=="string"):null}return null}function ug(e){return e.split(",").map(t=>t.trim()).filter(Boolean)}function fg(e){var s,o,r;const t=e,n=(o=(s=t==null?void 0:t.agents)==null?void 0:s.defaults)==null?void 0:o.models;if(!n||typeof n!="object")return[];const i=[];for(const[a,l]of Object.entries(n)){const c=a.trim();if(!c)continue;const f=l&&typeof l=="object"&&"alias"in l&&typeof l.alias=="string"?(r=l.alias)==null?void 0:r.trim():void 0,u=f&&f!==c?`${f} (${c})`:c;i.push({value:c,label:u})}return i}function pg(e,t){const n=fg(e),i=t?n.some(s=>s.value===t):!1;return t&&!i&&n.unshift({value:t,label:`Current (${t})`}),n.length===0?d`
      <option value="" disabled>No configured models</option>
    `:n.map(s=>d`<option value=${s.value}>${s.label}</option>`)}function gg(e){const t=je(e);if(!t)return{kind:"exact",value:""};if(t==="*")return{kind:"all"};if(!t.includes("*"))return{kind:"exact",value:t};const n=t.replace(/[.*+?^${}()|[\\]\\]/g,"\\$&");return{kind:"regex",value:new RegExp(`^${n.replaceAll("\\*",".*")}$`)}}function bs(e){return Array.isArray(e)?rg().map(gg).filter(t=>t.kind!=="exact"||t.value.length>0):[]}function ln(e,t){for(const n of t)if(n.kind==="all"||n.kind==="exact"&&e===n.value||n.kind==="regex"&&n.value.test(e))return!0;return!1}function hg(e,t){if(!t)return!0;const n=je(e),i=bs(t.deny);if(ln(n,i))return!1;const s=bs(t.allow);return!!(s.length===0||ln(n,s)||n==="apply_patch"&&ln("exec",s))}function Or(e,t){if(!Array.isArray(t)||t.length===0)return!1;const n=je(e),i=bs(t);return!!(ln(n,i)||n==="apply_patch"&&ln("exec",i))}function mg(e){return ag()??void 0}function Ol(e,t){return d`
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
  `}function vg(e,t){var i,s;const n=(i=e.channelMeta)==null?void 0:i.find(o=>o.id===t);return n!=null&&n.label?n.label:((s=e.channelLabels)==null?void 0:s[t])??t}function yg(e){var s;if(!e)return[];const t=new Set;for(const o of e.channelOrder??[])t.add(o);for(const o of e.channelMeta??[])t.add(o.id);for(const o of Object.keys(e.channelAccounts??{}))t.add(o);const n=[],i=(s=e.channelOrder)!=null&&s.length?e.channelOrder:Array.from(t);for(const o of i)t.has(o)&&(n.push(o),t.delete(o));for(const o of t)n.push(o);return n.map(o=>{var r;return{id:o,label:vg(e,o),accounts:((r=e.channelAccounts)==null?void 0:r[o])??[]}})}const bg=["groupPolicy","streamMode","dmPolicy"];function wg(e,t){if(!e)return null;const i=(e.channels??{})[t];if(i&&typeof i=="object")return i;const s=e[t];return s&&typeof s=="object"?s:null}function $g(e){if(e==null)return"n/a";if(typeof e=="string"||typeof e=="number"||typeof e=="boolean")return String(e);try{return JSON.stringify(e)}catch{return"n/a"}}function xg(e,t){const n=wg(e,t);return n?bg.flatMap(i=>i in n?[{label:i,value:$g(n[i])}]:[]):[]}function kg(e){let t=0,n=0,i=0;for(const s of e){const o=s.probe&&typeof s.probe=="object"&&"ok"in s.probe?!!s.probe.ok:!1;(s.connected===!0||s.running===!0||o)&&(t+=1),s.configured&&(n+=1),s.enabled&&(i+=1)}return{total:e.length,connected:t,configured:n,enabled:i}}function Sg(e){const t=yg(e.snapshot),n=e.lastSuccess?wt(e.lastSuccess):"never";return d`
    <section class="grid grid-cols-2">
      ${Ol(e.context,"Workspace, identity, and model configuration.")}
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
                  ${t.map(i=>{const s=kg(i.accounts),o=s.total?`${s.connected}/${s.total} connected`:"no accounts",r=s.configured?`${s.configured} configured`:"not configured",a=s.total?`${s.enabled} enabled`:"disabled",l=xg(e.configForm,i.id);return d`
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
  `}function Ag(e){var n,i;const t=e.jobs.filter(s=>s.agentId===e.agentId);return d`
    <section class="grid grid-cols-2">
      ${Ol(e.context,"Workspace and scheduling targets.")}
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
            <div class="stat-value">${Fl(((i=e.status)==null?void 0:i.nextWakeAtMs)??null)}</div>
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
  `}function _g(e){var l;const t=((l=e.agentFilesList)==null?void 0:l.agentId)===e.agentId?e.agentFilesList:null,n=(t==null?void 0:t.files)??[],i=e.agentFileActive??null,s=i?n.find(c=>c.name===i)??null:null,o=i?e.agentFileContents[i]??"":"",r=i?e.agentFileDrafts[i]??o:"",a=i?r!==o:!1;return d`
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
                        `:n.map(c=>Cg(c,i,()=>e.onSelectFile(c.name)))}
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
  `}function Cg(e,t,n){const i=e.missing?"Missing":`${cg(e.size)} · ${wt(e.updatedAtMs??null)}`;return d`
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
  `}const Fn=[{id:"workspace",label:"Workspace Skills",sources:["openclaw-workspace"]},{id:"built-in",label:"Built-in Skills",sources:["openclaw-bundled"]},{id:"installed",label:"Installed Skills",sources:["openclaw-managed"]},{id:"extra",label:"Extra Skills",sources:["openclaw-extra"]}];function Bl(e){var o;const t=new Map;for(const r of Fn)t.set(r.id,{id:r.id,label:r.label,skills:[]});const n=Fn.find(r=>r.id==="built-in"),i={id:"other",label:"Other Skills",skills:[]};for(const r of e){const a=r.bundled?n:Fn.find(l=>l.sources.includes(r.source));a?(o=t.get(a.id))==null||o.skills.push(r):i.skills.push(r)}const s=Fn.map(r=>t.get(r.id)).filter(r=>!!(r&&r.skills.length>0));return i.skills.length>0&&s.push(i),s}function Ul(e){return[...e.missing.bins.map(t=>`bin:${t}`),...e.missing.env.map(t=>`env:${t}`),...e.missing.config.map(t=>`config:${t}`),...e.missing.os.map(t=>`os:${t}`)]}function zl(e){const t=[];return e.disabled&&t.push("disabled"),e.blockedByAllowlist&&t.push("blocked by allowlist"),t}function Kl(e){const t=e.skill,n=!!e.showBundledBadge;return d`
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
  `}function Tg(e){var R;const t=vi(e.configForm,e.agentId),n=((R=t.entry)==null?void 0:R.tools)??{},i=t.globalTools??{},s=n.profile??i.profile??"full",o=n.profile?"agent override":i.profile?"global default":"default",r=Array.isArray(n.allow)&&n.allow.length>0,a=Array.isArray(i.allow)&&i.allow.length>0,l=!!e.configForm&&!e.configLoading&&!e.configSaving&&!r,c=r?[]:Array.isArray(n.alsoAllow)?n.alsoAllow:[],f=r?[]:Array.isArray(n.deny)?n.deny:[],u=r?{allow:n.allow??[],deny:n.deny??[]}:mg()??void 0,p=Pr.flatMap(P=>P.tools.map(F=>F.id)),b=P=>{const F=hg(P,u),I=Or(P,c),A=Or(P,f);return{allowed:(F||I)&&!A,baseAllowed:F,denied:A}},x=p.filter(P=>b(P).allowed).length,k=(P,F)=>{const I=new Set(c.map(C=>je(C)).filter(C=>C.length>0)),A=new Set(f.map(C=>je(C)).filter(C=>C.length>0)),g=b(P).baseAllowed,_=je(P);F?(A.delete(_),g||I.add(_)):(I.delete(_),A.add(_)),e.onOverridesChange(e.agentId,[...I],[...A])},S=P=>{const F=new Set(c.map(A=>je(A)).filter(A=>A.length>0)),I=new Set(f.map(A=>je(A)).filter(A=>A.length>0));for(const A of p){const g=b(A).baseAllowed,_=je(A);P?(I.delete(_),g||F.add(_)):(F.delete(_),I.add(_))}e.onOverridesChange(e.agentId,[...F],[...I])};return d`
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
          ${lg.map(P=>d`
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
                  ${P.tools.map(F=>{const{allowed:I}=b(F.id);return d`
                      <div class="agent-tool-row">
                        <div>
                          <div class="agent-tool-title mono">${F.label}</div>
                          <div class="agent-tool-sub">${F.description}</div>
                        </div>
                        <label class="cfg-toggle">
                          <input
                            type="checkbox"
                            .checked=${I}
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
  `}function Eg(e){var b,x,k;const t=!!e.configForm&&!e.configLoading&&!e.configSaving,n=vi(e.configForm,e.agentId),i=Array.isArray((b=n.entry)==null?void 0:b.skills)?(x=n.entry)==null?void 0:x.skills:void 0,s=new Set((i??[]).map(S=>S.trim()).filter(Boolean)),o=i!==void 0,r=!!(e.report&&e.activeAgentId===e.agentId),a=r?((k=e.report)==null?void 0:k.skills)??[]:[],l=e.filter.trim().toLowerCase(),c=l?a.filter(S=>[S.name,S.description,S.source].join(" ").toLowerCase().includes(l)):a,f=Bl(c),u=o?a.filter(S=>s.has(S.name)).length:a.length,p=a.length;return d`
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
                ${f.map(S=>Rg(S,{agentId:e.agentId,allowSet:s,usingAllowlist:o,editable:t,onToggle:e.onToggle}))}
              </div>
            `}
    </section>
  `}function Rg(e,t){const n=e.id==="workspace"||e.id==="built-in";return d`
    <details class="agent-skills-group" ?open=${!n}>
      <summary class="agent-skills-header">
        <span>${e.label}</span>
        <span class="muted">${e.skills.length}</span>
      </summary>
      <div class="list skills-grid">
        ${e.skills.map(i=>Lg(i,{agentId:t.agentId,allowSet:t.allowSet,usingAllowlist:t.usingAllowlist,editable:t.editable,onToggle:t.onToggle}))}
      </div>
    </details>
  `}function Lg(e,t){const n=t.usingAllowlist?t.allowSet.has(e.name):!0,i=Ul(e),s=zl(e);return d`
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
  `}function Ig(e){var o,r,a;const t=((o=e.agentsList)==null?void 0:o.agents)??[],n=((r=e.agentsList)==null?void 0:r.defaultId)??null,i=e.selectedAgentId??n??((a=t[0])==null?void 0:a.id)??null,s=i?t.find(l=>l.id===i)??null:null;return d`
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
                `:t.map(l=>{const c=Nl(l.id,n),f=mi(l,e.agentIdentityById[l.id]??null);return d`
                    <button
                      type="button"
                      class="agent-row ${i===l.id?"active":""}"
                      @click=${()=>e.onSelectAgent(l.id)}
                    >
                      <div class="agent-avatar">${f||ys(l).slice(0,1)}</div>
                      <div class="agent-info">
                        <div class="agent-title">${ys(l)}</div>
                        <div class="agent-sub mono">${l.id}</div>
                      </div>
                      ${c?d`<span class="agent-pill">${c}</span>`:$}
                    </button>
                  `})}
        </div>
      </section>
      <section class="agents-main">
        ${s?d`
                ${Mg(s,n,e.agentIdentityById[s.id]??null)}
                ${Pg(e.activePanel,l=>e.onSelectPanel(l))}
                ${e.activePanel==="overview"?Dg({agent:s,defaultId:n,configForm:e.configForm,agentFilesList:e.agentFilesList,agentIdentity:e.agentIdentityById[s.id]??null,agentIdentityError:e.agentIdentityError,agentIdentityLoading:e.agentIdentityLoading,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave,onModelChange:e.onModelChange,onModelFallbacksChange:e.onModelFallbacksChange}):$}
                ${e.activePanel==="files"?_g({agentId:s.id,agentFilesList:e.agentFilesList,agentFilesLoading:e.agentFilesLoading,agentFilesError:e.agentFilesError,agentFileActive:e.agentFileActive,agentFileContents:e.agentFileContents,agentFileDrafts:e.agentFileDrafts,agentFileSaving:e.agentFileSaving,onLoadFiles:e.onLoadFiles,onSelectFile:e.onSelectFile,onFileDraftChange:e.onFileDraftChange,onFileReset:e.onFileReset,onFileSave:e.onFileSave}):$}
                ${e.activePanel==="tools"?Tg({agentId:s.id,configForm:e.configForm,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,onProfileChange:e.onToolsProfileChange,onOverridesChange:e.onToolsOverridesChange,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):$}
                ${e.activePanel==="skills"?Eg({agentId:s.id,report:e.agentSkillsReport,loading:e.agentSkillsLoading,error:e.agentSkillsError,activeAgentId:e.agentSkillsAgentId,configForm:e.configForm,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,filter:e.skillsFilter,onFilterChange:e.onSkillsFilterChange,onRefresh:e.onSkillsRefresh,onToggle:e.onAgentSkillToggle,onClear:e.onAgentSkillsClear,onDisableAll:e.onAgentSkillsDisableAll,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):$}
                ${e.activePanel==="channels"?Sg({context:Dr(s,e.configForm,e.agentFilesList,n,e.agentIdentityById[s.id]??null),configForm:e.configForm,snapshot:e.channelsSnapshot,loading:e.channelsLoading,error:e.channelsError,lastSuccess:e.channelsLastSuccess,onRefresh:e.onChannelsRefresh}):$}
                ${e.activePanel==="cron"?Ag({context:Dr(s,e.configForm,e.agentFilesList,n,e.agentIdentityById[s.id]??null),agentId:s.id,jobs:e.cronJobs,status:e.cronStatus,loading:e.cronLoading,error:e.cronError,onRefresh:e.onCronRefresh}):$}
              `:d`
                <div class="card">
                  <div class="card-title">Select an agent</div>
                  <div class="card-sub">Pick an agent to inspect its workspace and tools.</div>
                </div>
              `}
      </section>
    </div>
  `}function Mg(e,t,n){var a,l;const i=Nl(e.id,t),s=ys(e),o=((l=(a=e.identity)==null?void 0:a.theme)==null?void 0:l.trim())||"Agent workspace and routing.",r=mi(e,n);return d`
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
  `}function Pg(e,t){return d`
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
  `}function Dg(e){var B,ee,ce,T,H,Q,q,We,te,Kt,X,Ge,xt,Oe,Ht,kt;const{agent:t,configForm:n,agentFilesList:i,agentIdentity:s,agentIdentityLoading:o,agentIdentityError:r,configLoading:a,configSaving:l,configDirty:c,onConfigReload:f,onConfigSave:u,onModelChange:p,onModelFallbacksChange:b}=e,x=vi(n,t.id),S=(i&&i.agentId===t.id?i.workspace:null)||((B=x.entry)==null?void 0:B.workspace)||((ee=x.defaults)==null?void 0:ee.workspace)||"default",R=(ce=x.entry)!=null&&ce.model?an((T=x.entry)==null?void 0:T.model):an((H=x.defaults)==null?void 0:H.model),P=an((Q=x.defaults)==null?void 0:Q.model),F=Nr((q=x.entry)==null?void 0:q.model)||(R!=="-"?Fr(R):null),I=Nr((We=x.defaults)==null?void 0:We.model)||(P!=="-"?Fr(P):null),A=F??I??null,g=dg((te=x.entry)==null?void 0:te.model),_=g?g.join(", "):"",C=((Kt=s==null?void 0:s.name)==null?void 0:Kt.trim())||((Ge=(X=t.identity)==null?void 0:X.name)==null?void 0:Ge.trim())||((xt=t.name)==null?void 0:xt.trim())||((Oe=x.entry)==null?void 0:Oe.name)||"-",U=mi(t,s)||"-",O=Array.isArray((Ht=x.entry)==null?void 0:Ht.skills)?(kt=x.entry)==null?void 0:kt.skills:null,z=(O==null?void 0:O.length)??null,K=o?"Loading…":r?"Unavailable":"",Y=!!(e.defaultId&&t.id===e.defaultId);return d`
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
          <div class="mono">${R}</div>
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
          <div>${U}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Skills Filter</div>
          <div>${O?`${z} selected`:"all skills"}</div>
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
              @change=${St=>p(t.id,St.target.value||null)}
            >
              ${Y?$:d`
                      <option value="">
                        ${I?`Inherit default (${I})`:"Inherit default"}
                      </option>
                    `}
              ${pg(n,A??void 0)}
            </select>
          </label>
          <label class="field" style="min-width: 260px; flex: 1;">
            <span>Fallbacks (comma-separated)</span>
            <input
              .value=${_}
              ?disabled=${!n||a||l}
              placeholder="provider/model, provider/model"
              @input=${St=>b(t.id,ug(St.target.value))}
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
  `}function Br(e){var t;e&&((t=navigator.clipboard)==null||t.writeText(e).catch(()=>{}))}function Fg(e){const{loading:t,saving:n,error:i,content:s,lastSuccessAt:o,dependentFiles:r,onReload:a,onSave:l,onContentChange:c}=e,f=o!=null?new Date(o).toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"";return d`
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
 */const cn=(e,t)=>{var i;const n=e._$AN;if(n===void 0)return!1;for(const s of n)(i=s._$AO)==null||i.call(s,t,!1),cn(s,t);return!0},ti=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while((n==null?void 0:n.size)===0)},Hl=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),Bg(t)}};function Ng(e){this._$AN!==void 0?(ti(this),this._$AM=e,Hl(this)):this._$AM=e}function Og(e,t=!1,n=0){const i=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(t)if(Array.isArray(i))for(let o=n;o<i.length;o++)cn(i[o],!1),ti(i[o]);else i!=null&&(cn(i,!1),ti(i));else cn(this,e)}const Bg=e=>{e.type==uo.CHILD&&(e._$AP??(e._$AP=Og),e._$AQ??(e._$AQ=Ng))};class Ug extends po{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,n,i){super._$AT(t,n,i),Hl(this),this.isConnected=t._$AU}_$AO(t,n=!0){var i,s;t!==this.isConnected&&(this.isConnected=t,t?(i=this.reconnected)==null||i.call(this):(s=this.disconnected)==null||s.call(this)),n&&(cn(this,t),ti(this))}setValue(t){if(Np(this._$Ct))this._$Ct._$AI(t,this);else{const n=[...this._$Ct._$AH];n[this._$Ci]=t,this._$Ct._$AI(n,this,0)}}disconnected(){}reconnected(){}}const Vi=new WeakMap,zg=fo(class extends Ug{render(e){return $}update(e,[t]){var i;const n=t!==this.G;return n&&this.G!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=(i=e.options)==null?void 0:i.host,this.rt(this.ct=e.element)),$}rt(e){if(this.isConnected||(e=void 0),typeof this.G=="function"){const t=this.ht??globalThis;let n=Vi.get(t);n===void 0&&(n=new WeakMap,Vi.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){var e,t;return typeof this.G=="function"?(e=Vi.get(this.ht??globalThis))==null?void 0:e.get(this.G):(t=this.G)==null?void 0:t.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ws extends po{constructor(t){if(super(t),this.it=$,t.type!==uo.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===$||t==null)return this._t=void 0,this.it=t;if(t===Ze)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}ws.directiveName="unsafeHTML",ws.resultType=1;const $s=fo(ws);/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:jl,setPrototypeOf:Ur,isFrozen:Kg,getPrototypeOf:Hg,getOwnPropertyDescriptor:jg}=Object;let{freeze:me,seal:Se,create:xs}=Object,{apply:ks,construct:Ss}=typeof Reflect<"u"&&Reflect;me||(me=function(t){return t});Se||(Se=function(t){return t});ks||(ks=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),o=2;o<i;o++)s[o-2]=arguments[o];return t.apply(n,s)});Ss||(Ss=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const Nn=ve(Array.prototype.forEach),qg=ve(Array.prototype.lastIndexOf),zr=ve(Array.prototype.pop),Vt=ve(Array.prototype.push),Wg=ve(Array.prototype.splice),Gn=ve(String.prototype.toLowerCase),Qi=ve(String.prototype.toString),Ji=ve(String.prototype.match),Qt=ve(String.prototype.replace),Gg=ve(String.prototype.indexOf),Vg=ve(String.prototype.trim),Ae=ve(Object.prototype.hasOwnProperty),pe=ve(RegExp.prototype.test),Jt=Qg(TypeError);function ve(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return ks(e,t,i)}}function Qg(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return Ss(e,n)}}function j(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Gn;Ur&&Ur(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const o=n(s);o!==s&&(Kg(t)||(t[i]=o),s=o)}e[s]=!0}return e}function Jg(e){for(let t=0;t<e.length;t++)Ae(e,t)||(e[t]=null);return e}function Ie(e){const t=xs(null);for(const[n,i]of jl(e))Ae(e,n)&&(Array.isArray(i)?t[n]=Jg(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=Ie(i):t[n]=i);return t}function Yt(e,t){for(;e!==null;){const i=jg(e,t);if(i){if(i.get)return ve(i.get);if(typeof i.value=="function")return ve(i.value)}e=Hg(e)}function n(){return null}return n}const Kr=me(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Yi=me(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Xi=me(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Yg=me(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Zi=me(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Xg=me(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Hr=me(["#text"]),jr=me(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),es=me(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),qr=me(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),On=me(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Zg=Se(/\{\{[\w\W]*|[\w\W]*\}\}/gm),eh=Se(/<%[\w\W]*|[\w\W]*%>/gm),th=Se(/\$\{[\w\W]*/gm),nh=Se(/^data-[\-\w.\u00B7-\uFFFF]+$/),ih=Se(/^aria-[\-\w]+$/),ql=Se(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),sh=Se(/^(?:\w+script|data):/i),oh=Se(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Wl=Se(/^html$/i),rh=Se(/^[a-z][.\w]*(-[.\w]+)+$/i);var Wr=Object.freeze({__proto__:null,ARIA_ATTR:ih,ATTR_WHITESPACE:oh,CUSTOM_ELEMENT:rh,DATA_ATTR:nh,DOCTYPE_NAME:Wl,ERB_EXPR:eh,IS_ALLOWED_URI:ql,IS_SCRIPT_OR_DATA:sh,MUSTACHE_EXPR:Zg,TMPLIT_EXPR:th});const Xt={element:1,text:3,progressingInstruction:7,comment:8,document:9},ah=function(){return typeof window>"u"?null:window},lh=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const o="dompurify"+(i?"#"+i:"");try{return t.createPolicy(o,{createHTML(r){return r},createScriptURL(r){return r}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Gr=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Gl(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ah();const t=N=>Gl(N);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==Xt.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:o,HTMLTemplateElement:r,Node:a,Element:l,NodeFilter:c,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:u,DOMParser:p,trustedTypes:b}=e,x=l.prototype,k=Yt(x,"cloneNode"),S=Yt(x,"remove"),R=Yt(x,"nextSibling"),P=Yt(x,"childNodes"),F=Yt(x,"parentNode");if(typeof r=="function"){const N=n.createElement("template");N.content&&N.content.ownerDocument&&(n=N.content.ownerDocument)}let I,A="";const{implementation:g,createNodeIterator:_,createDocumentFragment:C,getElementsByTagName:L}=n,{importNode:U}=i;let O=Gr();t.isSupported=typeof jl=="function"&&typeof F=="function"&&g&&g.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:z,ERB_EXPR:K,TMPLIT_EXPR:Y,DATA_ATTR:B,ARIA_ATTR:ee,IS_SCRIPT_OR_DATA:ce,ATTR_WHITESPACE:T,CUSTOM_ELEMENT:H}=Wr;let{IS_ALLOWED_URI:Q}=Wr,q=null;const We=j({},[...Kr,...Yi,...Xi,...Zi,...Hr]);let te=null;const Kt=j({},[...jr,...es,...qr,...On]);let X=Object.seal(xs(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ge=null,xt=null;const Oe=Object.seal(xs(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Ht=!0,kt=!0,St=!1,_o=!0,At=!1,Sn=!0,it=!1,$i=!1,xi=!1,_t=!1,An=!1,_n=!1,Co=!0,To=!1;const hc="user-content-";let ki=!0,jt=!1,Ct={},Ee=null;const Si=j({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Eo=null;const Ro=j({},["audio","video","img","source","image","track"]);let Ai=null;const Lo=j({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Cn="http://www.w3.org/1998/Math/MathML",Tn="http://www.w3.org/2000/svg",Be="http://www.w3.org/1999/xhtml";let Tt=Be,_i=!1,Ci=null;const mc=j({},[Cn,Tn,Be],Qi);let En=j({},["mi","mo","mn","ms","mtext"]),Rn=j({},["annotation-xml"]);const vc=j({},["title","style","font","a","script"]);let qt=null;const yc=["application/xhtml+xml","text/html"],bc="text/html";let se=null,Et=null;const wc=n.createElement("form"),Io=function(w){return w instanceof RegExp||w instanceof Function},Ti=function(){let w=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Et&&Et===w)){if((!w||typeof w!="object")&&(w={}),w=Ie(w),qt=yc.indexOf(w.PARSER_MEDIA_TYPE)===-1?bc:w.PARSER_MEDIA_TYPE,se=qt==="application/xhtml+xml"?Qi:Gn,q=Ae(w,"ALLOWED_TAGS")?j({},w.ALLOWED_TAGS,se):We,te=Ae(w,"ALLOWED_ATTR")?j({},w.ALLOWED_ATTR,se):Kt,Ci=Ae(w,"ALLOWED_NAMESPACES")?j({},w.ALLOWED_NAMESPACES,Qi):mc,Ai=Ae(w,"ADD_URI_SAFE_ATTR")?j(Ie(Lo),w.ADD_URI_SAFE_ATTR,se):Lo,Eo=Ae(w,"ADD_DATA_URI_TAGS")?j(Ie(Ro),w.ADD_DATA_URI_TAGS,se):Ro,Ee=Ae(w,"FORBID_CONTENTS")?j({},w.FORBID_CONTENTS,se):Si,Ge=Ae(w,"FORBID_TAGS")?j({},w.FORBID_TAGS,se):Ie({}),xt=Ae(w,"FORBID_ATTR")?j({},w.FORBID_ATTR,se):Ie({}),Ct=Ae(w,"USE_PROFILES")?w.USE_PROFILES:!1,Ht=w.ALLOW_ARIA_ATTR!==!1,kt=w.ALLOW_DATA_ATTR!==!1,St=w.ALLOW_UNKNOWN_PROTOCOLS||!1,_o=w.ALLOW_SELF_CLOSE_IN_ATTR!==!1,At=w.SAFE_FOR_TEMPLATES||!1,Sn=w.SAFE_FOR_XML!==!1,it=w.WHOLE_DOCUMENT||!1,_t=w.RETURN_DOM||!1,An=w.RETURN_DOM_FRAGMENT||!1,_n=w.RETURN_TRUSTED_TYPE||!1,xi=w.FORCE_BODY||!1,Co=w.SANITIZE_DOM!==!1,To=w.SANITIZE_NAMED_PROPS||!1,ki=w.KEEP_CONTENT!==!1,jt=w.IN_PLACE||!1,Q=w.ALLOWED_URI_REGEXP||ql,Tt=w.NAMESPACE||Be,En=w.MATHML_TEXT_INTEGRATION_POINTS||En,Rn=w.HTML_INTEGRATION_POINTS||Rn,X=w.CUSTOM_ELEMENT_HANDLING||{},w.CUSTOM_ELEMENT_HANDLING&&Io(w.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(X.tagNameCheck=w.CUSTOM_ELEMENT_HANDLING.tagNameCheck),w.CUSTOM_ELEMENT_HANDLING&&Io(w.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(X.attributeNameCheck=w.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),w.CUSTOM_ELEMENT_HANDLING&&typeof w.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(X.allowCustomizedBuiltInElements=w.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),At&&(kt=!1),An&&(_t=!0),Ct&&(q=j({},Hr),te=[],Ct.html===!0&&(j(q,Kr),j(te,jr)),Ct.svg===!0&&(j(q,Yi),j(te,es),j(te,On)),Ct.svgFilters===!0&&(j(q,Xi),j(te,es),j(te,On)),Ct.mathMl===!0&&(j(q,Zi),j(te,qr),j(te,On))),w.ADD_TAGS&&(typeof w.ADD_TAGS=="function"?Oe.tagCheck=w.ADD_TAGS:(q===We&&(q=Ie(q)),j(q,w.ADD_TAGS,se))),w.ADD_ATTR&&(typeof w.ADD_ATTR=="function"?Oe.attributeCheck=w.ADD_ATTR:(te===Kt&&(te=Ie(te)),j(te,w.ADD_ATTR,se))),w.ADD_URI_SAFE_ATTR&&j(Ai,w.ADD_URI_SAFE_ATTR,se),w.FORBID_CONTENTS&&(Ee===Si&&(Ee=Ie(Ee)),j(Ee,w.FORBID_CONTENTS,se)),w.ADD_FORBID_CONTENTS&&(Ee===Si&&(Ee=Ie(Ee)),j(Ee,w.ADD_FORBID_CONTENTS,se)),ki&&(q["#text"]=!0),it&&j(q,["html","head","body"]),q.table&&(j(q,["tbody"]),delete Ge.tbody),w.TRUSTED_TYPES_POLICY){if(typeof w.TRUSTED_TYPES_POLICY.createHTML!="function")throw Jt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof w.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Jt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');I=w.TRUSTED_TYPES_POLICY,A=I.createHTML("")}else I===void 0&&(I=lh(b,s)),I!==null&&typeof A=="string"&&(A=I.createHTML(""));me&&me(w),Et=w}},Mo=j({},[...Yi,...Xi,...Yg]),Po=j({},[...Zi,...Xg]),$c=function(w){let E=F(w);(!E||!E.tagName)&&(E={namespaceURI:Tt,tagName:"template"});const D=Gn(w.tagName),Z=Gn(E.tagName);return Ci[w.namespaceURI]?w.namespaceURI===Tn?E.namespaceURI===Be?D==="svg":E.namespaceURI===Cn?D==="svg"&&(Z==="annotation-xml"||En[Z]):!!Mo[D]:w.namespaceURI===Cn?E.namespaceURI===Be?D==="math":E.namespaceURI===Tn?D==="math"&&Rn[Z]:!!Po[D]:w.namespaceURI===Be?E.namespaceURI===Tn&&!Rn[Z]||E.namespaceURI===Cn&&!En[Z]?!1:!Po[D]&&(vc[D]||!Mo[D]):!!(qt==="application/xhtml+xml"&&Ci[w.namespaceURI]):!1},Re=function(w){Vt(t.removed,{element:w});try{F(w).removeChild(w)}catch{S(w)}},st=function(w,E){try{Vt(t.removed,{attribute:E.getAttributeNode(w),from:E})}catch{Vt(t.removed,{attribute:null,from:E})}if(E.removeAttribute(w),w==="is")if(_t||An)try{Re(E)}catch{}else try{E.setAttribute(w,"")}catch{}},Do=function(w){let E=null,D=null;if(xi)w="<remove></remove>"+w;else{const ne=Ji(w,/^[\r\n\t ]+/);D=ne&&ne[0]}qt==="application/xhtml+xml"&&Tt===Be&&(w='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+w+"</body></html>");const Z=I?I.createHTML(w):w;if(Tt===Be)try{E=new p().parseFromString(Z,qt)}catch{}if(!E||!E.documentElement){E=g.createDocument(Tt,"template",null);try{E.documentElement.innerHTML=_i?A:Z}catch{}}const de=E.body||E.documentElement;return w&&D&&de.insertBefore(n.createTextNode(D),de.childNodes[0]||null),Tt===Be?L.call(E,it?"html":"body")[0]:it?E.documentElement:de},Fo=function(w){return _.call(w.ownerDocument||w,w,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Ei=function(w){return w instanceof u&&(typeof w.nodeName!="string"||typeof w.textContent!="string"||typeof w.removeChild!="function"||!(w.attributes instanceof f)||typeof w.removeAttribute!="function"||typeof w.setAttribute!="function"||typeof w.namespaceURI!="string"||typeof w.insertBefore!="function"||typeof w.hasChildNodes!="function")},No=function(w){return typeof a=="function"&&w instanceof a};function Ue(N,w,E){Nn(N,D=>{D.call(t,w,E,Et)})}const Oo=function(w){let E=null;if(Ue(O.beforeSanitizeElements,w,null),Ei(w))return Re(w),!0;const D=se(w.nodeName);if(Ue(O.uponSanitizeElement,w,{tagName:D,allowedTags:q}),Sn&&w.hasChildNodes()&&!No(w.firstElementChild)&&pe(/<[/\w!]/g,w.innerHTML)&&pe(/<[/\w!]/g,w.textContent)||w.nodeType===Xt.progressingInstruction||Sn&&w.nodeType===Xt.comment&&pe(/<[/\w]/g,w.data))return Re(w),!0;if(!(Oe.tagCheck instanceof Function&&Oe.tagCheck(D))&&(!q[D]||Ge[D])){if(!Ge[D]&&Uo(D)&&(X.tagNameCheck instanceof RegExp&&pe(X.tagNameCheck,D)||X.tagNameCheck instanceof Function&&X.tagNameCheck(D)))return!1;if(ki&&!Ee[D]){const Z=F(w)||w.parentNode,de=P(w)||w.childNodes;if(de&&Z){const ne=de.length;for(let ye=ne-1;ye>=0;--ye){const ze=k(de[ye],!0);ze.__removalCount=(w.__removalCount||0)+1,Z.insertBefore(ze,R(w))}}}return Re(w),!0}return w instanceof l&&!$c(w)||(D==="noscript"||D==="noembed"||D==="noframes")&&pe(/<\/no(script|embed|frames)/i,w.innerHTML)?(Re(w),!0):(At&&w.nodeType===Xt.text&&(E=w.textContent,Nn([z,K,Y],Z=>{E=Qt(E,Z," ")}),w.textContent!==E&&(Vt(t.removed,{element:w.cloneNode()}),w.textContent=E)),Ue(O.afterSanitizeElements,w,null),!1)},Bo=function(w,E,D){if(Co&&(E==="id"||E==="name")&&(D in n||D in wc))return!1;if(!(kt&&!xt[E]&&pe(B,E))){if(!(Ht&&pe(ee,E))){if(!(Oe.attributeCheck instanceof Function&&Oe.attributeCheck(E,w))){if(!te[E]||xt[E]){if(!(Uo(w)&&(X.tagNameCheck instanceof RegExp&&pe(X.tagNameCheck,w)||X.tagNameCheck instanceof Function&&X.tagNameCheck(w))&&(X.attributeNameCheck instanceof RegExp&&pe(X.attributeNameCheck,E)||X.attributeNameCheck instanceof Function&&X.attributeNameCheck(E,w))||E==="is"&&X.allowCustomizedBuiltInElements&&(X.tagNameCheck instanceof RegExp&&pe(X.tagNameCheck,D)||X.tagNameCheck instanceof Function&&X.tagNameCheck(D))))return!1}else if(!Ai[E]){if(!pe(Q,Qt(D,T,""))){if(!((E==="src"||E==="xlink:href"||E==="href")&&w!=="script"&&Gg(D,"data:")===0&&Eo[w])){if(!(St&&!pe(ce,Qt(D,T,"")))){if(D)return!1}}}}}}}return!0},Uo=function(w){return w!=="annotation-xml"&&Ji(w,H)},zo=function(w){Ue(O.beforeSanitizeAttributes,w,null);const{attributes:E}=w;if(!E||Ei(w))return;const D={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:te,forceKeepAttr:void 0};let Z=E.length;for(;Z--;){const de=E[Z],{name:ne,namespaceURI:ye,value:ze}=de,Rt=se(ne),Ri=ze;let ae=ne==="value"?Ri:Vg(Ri);if(D.attrName=Rt,D.attrValue=ae,D.keepAttr=!0,D.forceKeepAttr=void 0,Ue(O.uponSanitizeAttribute,w,D),ae=D.attrValue,To&&(Rt==="id"||Rt==="name")&&(st(ne,w),ae=hc+ae),Sn&&pe(/((--!?|])>)|<\/(style|title|textarea)/i,ae)){st(ne,w);continue}if(Rt==="attributename"&&Ji(ae,"href")){st(ne,w);continue}if(D.forceKeepAttr)continue;if(!D.keepAttr){st(ne,w);continue}if(!_o&&pe(/\/>/i,ae)){st(ne,w);continue}At&&Nn([z,K,Y],Ho=>{ae=Qt(ae,Ho," ")});const Ko=se(w.nodeName);if(!Bo(Ko,Rt,ae)){st(ne,w);continue}if(I&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!ye)switch(b.getAttributeType(Ko,Rt)){case"TrustedHTML":{ae=I.createHTML(ae);break}case"TrustedScriptURL":{ae=I.createScriptURL(ae);break}}if(ae!==Ri)try{ye?w.setAttributeNS(ye,ne,ae):w.setAttribute(ne,ae),Ei(w)?Re(w):zr(t.removed)}catch{st(ne,w)}}Ue(O.afterSanitizeAttributes,w,null)},xc=function N(w){let E=null;const D=Fo(w);for(Ue(O.beforeSanitizeShadowDOM,w,null);E=D.nextNode();)Ue(O.uponSanitizeShadowNode,E,null),Oo(E),zo(E),E.content instanceof o&&N(E.content);Ue(O.afterSanitizeShadowDOM,w,null)};return t.sanitize=function(N){let w=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},E=null,D=null,Z=null,de=null;if(_i=!N,_i&&(N="<!-->"),typeof N!="string"&&!No(N))if(typeof N.toString=="function"){if(N=N.toString(),typeof N!="string")throw Jt("dirty is not a string, aborting")}else throw Jt("toString is not a function");if(!t.isSupported)return N;if($i||Ti(w),t.removed=[],typeof N=="string"&&(jt=!1),jt){if(N.nodeName){const ze=se(N.nodeName);if(!q[ze]||Ge[ze])throw Jt("root node is forbidden and cannot be sanitized in-place")}}else if(N instanceof a)E=Do("<!---->"),D=E.ownerDocument.importNode(N,!0),D.nodeType===Xt.element&&D.nodeName==="BODY"||D.nodeName==="HTML"?E=D:E.appendChild(D);else{if(!_t&&!At&&!it&&N.indexOf("<")===-1)return I&&_n?I.createHTML(N):N;if(E=Do(N),!E)return _t?null:_n?A:""}E&&xi&&Re(E.firstChild);const ne=Fo(jt?N:E);for(;Z=ne.nextNode();)Oo(Z),zo(Z),Z.content instanceof o&&xc(Z.content);if(jt)return N;if(_t){if(An)for(de=C.call(E.ownerDocument);E.firstChild;)de.appendChild(E.firstChild);else de=E;return(te.shadowroot||te.shadowrootmode)&&(de=U.call(i,de,!0)),de}let ye=it?E.outerHTML:E.innerHTML;return it&&q["!doctype"]&&E.ownerDocument&&E.ownerDocument.doctype&&E.ownerDocument.doctype.name&&pe(Wl,E.ownerDocument.doctype.name)&&(ye="<!DOCTYPE "+E.ownerDocument.doctype.name+`>
`+ye),At&&Nn([z,K,Y],ze=>{ye=Qt(ye,ze," ")}),I&&_n?I.createHTML(ye):ye},t.setConfig=function(){let N=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ti(N),$i=!0},t.clearConfig=function(){Et=null,$i=!1},t.isValidAttribute=function(N,w,E){Et||Ti({});const D=se(N),Z=se(w);return Bo(D,Z,E)},t.addHook=function(N,w){typeof w=="function"&&Vt(O[N],w)},t.removeHook=function(N,w){if(w!==void 0){const E=qg(O[N],w);return E===-1?void 0:Wg(O[N],E,1)[0]}return zr(O[N])},t.removeHooks=function(N){O[N]=[]},t.removeAllHooks=function(){O=Gr()},t}var As=Gl();function go(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var $t=go();function Vl(e){$t=e}var ct={exec:()=>null};function V(e,t=""){let n=typeof e=="string"?e:e.source,i={replace:(s,o)=>{let r=typeof o=="string"?o:o.source;return r=r.replace(he.caret,"$1"),n=n.replace(s,r),i},getRegex:()=>new RegExp(n,t)};return i}var ch=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),he={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}>`)},dh=/^(?:[ \t]*(?:\n|$))+/,uh=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,fh=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,kn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ph=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ho=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,Ql=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Jl=V(Ql).replace(/bull/g,ho).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),gh=V(Ql).replace(/bull/g,ho).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),mo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,hh=/^[^\n]+/,vo=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,mh=V(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",vo).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),vh=V(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ho).getRegex(),yi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",yo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,yh=V("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",yo).replace("tag",yi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Yl=V(mo).replace("hr",kn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",yi).getRegex(),bh=V(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Yl).getRegex(),bo={blockquote:bh,code:uh,def:mh,fences:fh,heading:ph,hr:kn,html:yh,lheading:Jl,list:vh,newline:dh,paragraph:Yl,table:ct,text:hh},Vr=V("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",kn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",yi).getRegex(),wh={...bo,lheading:gh,table:Vr,paragraph:V(mo).replace("hr",kn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Vr).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",yi).getRegex()},$h={...bo,html:V(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",yo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ct,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:V(mo).replace("hr",kn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Jl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},xh=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,kh=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Xl=/^( {2,}|\\)\n(?!\s*$)/,Sh=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,bi=/[\p{P}\p{S}]/u,wo=/[\s\p{P}\p{S}]/u,Zl=/[^\s\p{P}\p{S}]/u,Ah=V(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,wo).getRegex(),ec=/(?!~)[\p{P}\p{S}]/u,_h=/(?!~)[\s\p{P}\p{S}]/u,Ch=/(?:[^\s\p{P}\p{S}]|~)/u,tc=/(?![*_])[\p{P}\p{S}]/u,Th=/(?![*_])[\s\p{P}\p{S}]/u,Eh=/(?:[^\s\p{P}\p{S}]|[*_])/u,Rh=V(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",ch?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),nc=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Lh=V(nc,"u").replace(/punct/g,bi).getRegex(),Ih=V(nc,"u").replace(/punct/g,ec).getRegex(),ic="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Mh=V(ic,"gu").replace(/notPunctSpace/g,Zl).replace(/punctSpace/g,wo).replace(/punct/g,bi).getRegex(),Ph=V(ic,"gu").replace(/notPunctSpace/g,Ch).replace(/punctSpace/g,_h).replace(/punct/g,ec).getRegex(),Dh=V("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Zl).replace(/punctSpace/g,wo).replace(/punct/g,bi).getRegex(),Fh=V(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,tc).getRegex(),Nh="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",Oh=V(Nh,"gu").replace(/notPunctSpace/g,Eh).replace(/punctSpace/g,Th).replace(/punct/g,tc).getRegex(),Bh=V(/\\(punct)/,"gu").replace(/punct/g,bi).getRegex(),Uh=V(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),zh=V(yo).replace("(?:-->|$)","-->").getRegex(),Kh=V("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",zh).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ni=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Hh=V(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ni).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),sc=V(/^!?\[(label)\]\[(ref)\]/).replace("label",ni).replace("ref",vo).getRegex(),oc=V(/^!?\[(ref)\](?:\[\])?/).replace("ref",vo).getRegex(),jh=V("reflink|nolink(?!\\()","g").replace("reflink",sc).replace("nolink",oc).getRegex(),Qr=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,$o={_backpedal:ct,anyPunctuation:Bh,autolink:Uh,blockSkip:Rh,br:Xl,code:kh,del:ct,delLDelim:ct,delRDelim:ct,emStrongLDelim:Lh,emStrongRDelimAst:Mh,emStrongRDelimUnd:Dh,escape:xh,link:Hh,nolink:oc,punctuation:Ah,reflink:sc,reflinkSearch:jh,tag:Kh,text:Sh,url:ct},qh={...$o,link:V(/^!?\[(label)\]\((.*?)\)/).replace("label",ni).getRegex(),reflink:V(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ni).getRegex()},_s={...$o,emStrongRDelimAst:Ph,emStrongLDelim:Ih,delLDelim:Fh,delRDelim:Oh,url:V(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Qr).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:V(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Qr).getRegex()},Wh={..._s,br:V(Xl).replace("{2,}","*").getRegex(),text:V(_s.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Bn={normal:bo,gfm:wh,pedantic:$h},Zt={normal:$o,gfm:_s,breaks:Wh,pedantic:qh},Gh={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Jr=e=>Gh[e];function Me(e,t){if(t){if(he.escapeTest.test(e))return e.replace(he.escapeReplace,Jr)}else if(he.escapeTestNoEncode.test(e))return e.replace(he.escapeReplaceNoEncode,Jr);return e}function Yr(e){try{e=encodeURI(e).replace(he.percentDecode,"%")}catch{return null}return e}function Xr(e,t){var o;let n=e.replace(he.findPipe,(r,a,l)=>{let c=!1,f=a;for(;--f>=0&&l[f]==="\\";)c=!c;return c?"|":" |"}),i=n.split(he.splitPipe),s=0;if(i[0].trim()||i.shift(),i.length>0&&!((o=i.at(-1))!=null&&o.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(he.slashPipe,"|");return i}function en(e,t,n){let i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function Vh(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function Qh(e,t=0){let n=t,i="";for(let s of e)if(s==="	"){let o=4-n%4;i+=" ".repeat(o),n+=o}else i+=s,n++;return i}function Zr(e,t,n,i,s){let o=t.href,r=t.title||null,a=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:r,text:a,tokens:i.inlineTokens(a)};return i.state.inLink=!1,l}function Jh(e,t,n){let i=e.match(n.other.indentCodeCompensation);if(i===null)return t;let s=i[1];return t.split(`
`).map(o=>{let r=o.match(n.other.beginningSpace);if(r===null)return o;let[a]=r;return a.length>=s.length?o.slice(s.length):o}).join(`
`)}var ii=class{constructor(e){W(this,"options");W(this,"rules");W(this,"lexer");this.options=e||$t}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:en(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],i=Jh(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let i=en(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:en(t[0],`
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
`);continue}}return{type:"blockquote",raw:i,tokens:o,text:s}}}list(e){var n,i;let t=this.rules.block.list.exec(e);if(t){let s=t[1].trim(),o=s.length>1,r={type:"list",raw:"",ordered:o,start:o?+s.slice(0,-1):"",loose:!1,items:[]};s=o?`\\d{1,9}\\${s.slice(-1)}`:`\\${s}`,this.options.pedantic&&(s=o?s:"[*+-]");let a=this.rules.other.listItemRegex(s),l=!1;for(;e;){let f=!1,u="",p="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let b=Qh(t[2].split(`
`,1)[0],t[1].length),x=e.split(`
`,1)[0],k=!b.trim(),S=0;if(this.options.pedantic?(S=2,p=b.trimStart()):k?S=t[1].length+1:(S=b.search(this.rules.other.nonSpaceChar),S=S>4?1:S,p=b.slice(S),S+=t[1].length),k&&this.rules.other.blankLine.test(x)&&(u+=x+`
`,e=e.substring(x.length+1),f=!0),!f){let R=this.rules.other.nextBulletRegex(S),P=this.rules.other.hrRegex(S),F=this.rules.other.fencesBeginRegex(S),I=this.rules.other.headingBeginRegex(S),A=this.rules.other.htmlBeginRegex(S),g=this.rules.other.blockquoteBeginRegex(S);for(;e;){let _=e.split(`
`,1)[0],C;if(x=_,this.options.pedantic?(x=x.replace(this.rules.other.listReplaceNesting,"  "),C=x):C=x.replace(this.rules.other.tabCharGlobal,"    "),F.test(x)||I.test(x)||A.test(x)||g.test(x)||R.test(x)||P.test(x))break;if(C.search(this.rules.other.nonSpaceChar)>=S||!x.trim())p+=`
`+C.slice(S);else{if(k||b.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||F.test(b)||I.test(b)||P.test(b))break;p+=`
`+x}k=!x.trim(),u+=_+`
`,e=e.substring(_.length+1),b=C.slice(S)}}r.loose||(l?r.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(l=!0)),r.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),r.raw+=u}let c=r.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;r.raw=r.raw.trimEnd();for(let f of r.items){if(this.lexer.state.top=!1,f.tokens=this.lexer.blockTokens(f.text,[]),f.task){if(f.text=f.text.replace(this.rules.other.listReplaceTask,""),((n=f.tokens[0])==null?void 0:n.type)==="text"||((i=f.tokens[0])==null?void 0:i.type)==="paragraph"){f.tokens[0].raw=f.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),f.tokens[0].text=f.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(f.raw);if(u){let p={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};f.checked=p.checked,r.loose?f.tokens[0]&&["paragraph","text"].includes(f.tokens[0].type)&&"tokens"in f.tokens[0]&&f.tokens[0].tokens?(f.tokens[0].raw=p.raw+f.tokens[0].raw,f.tokens[0].text=p.raw+f.tokens[0].text,f.tokens[0].tokens.unshift(p)):f.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):f.tokens.unshift(p)}}if(!r.loose){let u=f.tokens.filter(b=>b.type==="space"),p=u.length>0&&u.some(b=>this.rules.other.anyLine.test(b.raw));r.loose=p}}if(r.loose)for(let f of r.items){f.loose=!0;for(let u of f.tokens)u.type==="text"&&(u.type="paragraph")}return r}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var r;let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Xr(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(r=t[3])!=null&&r.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(let a of i)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Xr(a,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=en(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=Vh(t[2],"()");if(o===-2)return;if(o>-1){let r=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(i);o&&(i=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),Zr(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Zr(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(i[1]||i[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...i[0]].length-1,o,r,a=s,l=0,c=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+s);(i=c.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(r=[...o].length,i[3]||i[4]){a+=r;continue}else if((i[5]||i[6])&&s%3&&!((s+r)%3)){l+=r;continue}if(a-=r,a>0)continue;r=Math.min(r,r+a+l);let f=[...i[0]][0].length,u=e.slice(0,s+i.index+f+r);if(Math.min(s,r)%2){let b=u.slice(1,-1);return{type:"em",raw:u,text:b,tokens:this.lexer.inlineTokens(b)}}let p=u.slice(2,-2);return{type:"strong",raw:u,text:p,tokens:this.lexer.inlineTokens(p)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e,t,n=""){let i=this.rules.inline.delLDelim.exec(e);if(i&&(!i[1]||!n||this.rules.inline.punctuation.exec(n))){let s=[...i[0]].length-1,o,r,a=s,l=this.rules.inline.delRDelim;for(l.lastIndex=0,t=t.slice(-1*e.length+s);(i=l.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o||(r=[...o].length,r!==s))continue;if(i[3]||i[4]){a+=r;continue}if(a-=r,a>0)continue;r=Math.min(r,r+a);let c=[...i[0]][0].length,f=e.slice(0,s+i.index+c+r),u=f.slice(s,-s);return{type:"del",raw:f,text:u,tokens:this.lexer.inlineTokens(u)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let o;do o=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(o!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Ce=class Cs{constructor(t){W(this,"tokens");W(this,"options");W(this,"state");W(this,"inlineQueue");W(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||$t,this.options.tokenizer=this.options.tokenizer||new ii,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:he,block:Bn.normal,inline:Zt.normal};this.options.pedantic?(n.block=Bn.pedantic,n.inline=Zt.pedantic):this.options.gfm&&(n.block=Bn.gfm,this.options.breaks?n.inline=Zt.breaks:n.inline=Zt.gfm),this.tokenizer.rules=n}static get rules(){return{block:Bn,inline:Zt}}static lex(t,n){return new Cs(n).lex(t)}static lexInline(t,n){return new Cs(n).inlineTokens(t)}lex(t){t=t.replace(he.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,o,r;for(this.options.pedantic&&(t=t.replace(he.tabCharGlobal,"    ").replace(he.spaceLine,""));t;){let a;if((o=(s=this.options.extensions)==null?void 0:s.block)!=null&&o.some(c=>(a=c.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.space(t)){t=t.substring(a.raw.length);let c=n.at(-1);a.raw.length===1&&c!==void 0?c.raw+=`
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
`+a.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(a);continue}if(t){let c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var l,c,f,u,p;let i=t,s=null;if(this.tokens.links){let b=Object.keys(this.tokens.links);if(b.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)b.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)o=s[2]?s[2].length:0,i=i.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);i=((c=(l=this.options.hooks)==null?void 0:l.emStrongMask)==null?void 0:c.call({lexer:this},i))??i;let r=!1,a="";for(;t;){r||(a=""),r=!1;let b;if((u=(f=this.options.extensions)==null?void 0:f.inline)!=null&&u.some(k=>(b=k.call({lexer:this},t,n))?(t=t.substring(b.raw.length),n.push(b),!0):!1))continue;if(b=this.tokenizer.escape(t)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.tag(t)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.link(t)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(b.raw.length);let k=n.at(-1);b.type==="text"&&(k==null?void 0:k.type)==="text"?(k.raw+=b.raw,k.text+=b.text):n.push(b);continue}if(b=this.tokenizer.emStrong(t,i,a)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.codespan(t)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.br(t)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.del(t,i,a)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.autolink(t)){t=t.substring(b.raw.length),n.push(b);continue}if(!this.state.inLink&&(b=this.tokenizer.url(t))){t=t.substring(b.raw.length),n.push(b);continue}let x=t;if((p=this.options.extensions)!=null&&p.startInline){let k=1/0,S=t.slice(1),R;this.options.extensions.startInline.forEach(P=>{R=P.call({lexer:this},S),typeof R=="number"&&R>=0&&(k=Math.min(k,R))}),k<1/0&&k>=0&&(x=t.substring(0,k+1))}if(b=this.tokenizer.inlineText(x)){t=t.substring(b.raw.length),b.raw.slice(-1)!=="_"&&(a=b.raw.slice(-1)),r=!0;let k=n.at(-1);(k==null?void 0:k.type)==="text"?(k.raw+=b.raw,k.text+=b.text):n.push(b);continue}if(t){let k="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(k);break}else throw new Error(k)}}return n}},si=class{constructor(e){W(this,"options");W(this,"parser");this.options=e||$t}space(e){return""}code({text:e,lang:t,escaped:n}){var o;let i=(o=(t||"").match(he.notSpaceStart))==null?void 0:o[0],s=e.replace(he.endingNewline,"")+`
`;return i?'<pre><code class="language-'+Me(i)+'">'+(n?s:Me(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Me(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Me(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let i=this.parser.parseInline(n),s=Yr(e);if(s===null)return i;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Me(t)+'"'),o+=">"+i+"</a>",o}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));let s=Yr(e);if(s===null)return Me(n);e=s;let o=`<img src="${e}" alt="${Me(n)}"`;return t&&(o+=` title="${Me(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Me(e.text)}},xo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Te=class Ts{constructor(t){W(this,"options");W(this,"renderer");W(this,"textRenderer");this.options=t||$t,this.options.renderer=this.options.renderer||new si,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new xo}static parse(t,n){return new Ts(n).parse(t)}static parseInline(t,n){return new Ts(n).parseInline(t)}parse(t){var i,s;let n="";for(let o=0;o<t.length;o++){let r=t[o];if((s=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&s[r.type]){let l=r,c=this.options.extensions.renderers[l.type].call({parser:this},l);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(l.type)){n+=c||"";continue}}let a=r;switch(a.type){case"space":{n+=this.renderer.space(a);break}case"hr":{n+=this.renderer.hr(a);break}case"heading":{n+=this.renderer.heading(a);break}case"code":{n+=this.renderer.code(a);break}case"table":{n+=this.renderer.table(a);break}case"blockquote":{n+=this.renderer.blockquote(a);break}case"list":{n+=this.renderer.list(a);break}case"checkbox":{n+=this.renderer.checkbox(a);break}case"html":{n+=this.renderer.html(a);break}case"def":{n+=this.renderer.def(a);break}case"paragraph":{n+=this.renderer.paragraph(a);break}case"text":{n+=this.renderer.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}parseInline(t,n=this.renderer){var s,o;let i="";for(let r=0;r<t.length;r++){let a=t[r];if((o=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&o[a.type]){let c=this.options.extensions.renderers[a.type].call({parser:this},a);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type)){i+=c||"";continue}}let l=a;switch(l.type){case"escape":{i+=n.text(l);break}case"html":{i+=n.html(l);break}case"link":{i+=n.link(l);break}case"image":{i+=n.image(l);break}case"checkbox":{i+=n.checkbox(l);break}case"strong":{i+=n.strong(l);break}case"em":{i+=n.em(l);break}case"codespan":{i+=n.codespan(l);break}case"br":{i+=n.br(l);break}case"del":{i+=n.del(l);break}case"text":{i+=n.text(l);break}default:{let c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},zn,tn=(zn=class{constructor(e){W(this,"options");W(this,"block");this.options=e||$t}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ce.lex:Ce.lexInline}provideParser(){return this.block?Te.parse:Te.parseInline}},W(zn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),W(zn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),zn),Yh=class{constructor(...e){W(this,"defaults",go());W(this,"options",this.setOptions);W(this,"parse",this.parseMarkdown(!0));W(this,"parseInline",this.parseMarkdown(!1));W(this,"Parser",Te);W(this,"Renderer",si);W(this,"TextRenderer",xo);W(this,"Lexer",Ce);W(this,"Tokenizer",ii);W(this,"Hooks",tn);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(let o of e)switch(n=n.concat(t.call(this,o)),o.type){case"table":{let r=o;for(let a of r.header)n=n.concat(this.walkTokens(a.tokens,t));for(let a of r.rows)for(let l of a)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{let r=o;n=n.concat(this.walkTokens(r.items,t));break}default:{let r=o;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[r.type]?this.defaults.extensions.childTokens[r.type].forEach(a=>{let l=r[a].flat(1/0);n=n.concat(this.walkTokens(l,t))}):r.tokens&&(n=n.concat(this.walkTokens(r.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...r){let a=s.renderer.apply(this,r);return a===!1&&(a=o.apply(this,r)),a}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){let s=this.defaults.renderer||new si(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let r=o,a=n.renderer[r],l=s[r];s[r]=(...c)=>{let f=a.apply(s,c);return f===!1&&(f=l.apply(s,c)),f||""}}i.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new ii(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let r=o,a=n.tokenizer[r],l=s[r];s[r]=(...c)=>{let f=a.apply(s,c);return f===!1&&(f=l.apply(s,c)),f}}i.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new tn;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let r=o,a=n.hooks[r],l=s[r];tn.passThroughHooks.has(o)?s[r]=c=>{if(this.defaults.async&&tn.passThroughHooksRespectAsync.has(o))return(async()=>{let u=await a.call(s,c);return l.call(s,u)})();let f=a.call(s,c);return l.call(s,f)}:s[r]=(...c)=>{if(this.defaults.async)return(async()=>{let u=await a.apply(s,c);return u===!1&&(u=await l.apply(s,c)),u})();let f=a.apply(s,c);return f===!1&&(f=l.apply(s,c)),f}}i.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;i.walkTokens=function(r){let a=[];return a.push(o.call(this,r)),s&&(a=a.concat(s.call(this,r))),a}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ce.lex(e,t??this.defaults)}parser(e,t){return Te.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let i={...n},s={...this.defaults,...i},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&i.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let r=s.hooks?await s.hooks.preprocess(t):t,a=await(s.hooks?await s.hooks.provideLexer():e?Ce.lex:Ce.lexInline)(r,s),l=s.hooks?await s.hooks.processAllTokens(a):a;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():e?Te.parse:Te.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let r=(s.hooks?s.hooks.provideLexer():e?Ce.lex:Ce.lexInline)(t,s);s.hooks&&(r=s.hooks.processAllTokens(r)),s.walkTokens&&this.walkTokens(r,s.walkTokens);let a=(s.hooks?s.hooks.provideParser():e?Te.parse:Te.parseInline)(r,s);return s.hooks&&(a=s.hooks.postprocess(a)),a}catch(r){return o(r)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let i="<p>An error occurred:</p><pre>"+Me(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},yt=new Yh;function J(e,t){return yt.parse(e,t)}J.options=J.setOptions=function(e){return yt.setOptions(e),J.defaults=yt.defaults,Vl(J.defaults),J};J.getDefaults=go;J.defaults=$t;J.use=function(...e){return yt.use(...e),J.defaults=yt.defaults,Vl(J.defaults),J};J.walkTokens=function(e,t){return yt.walkTokens(e,t)};J.parseInline=yt.parseInline;J.Parser=Te;J.parser=Te.parse;J.Renderer=si;J.TextRenderer=xo;J.Lexer=Ce;J.lexer=Ce.lex;J.Tokenizer=ii;J.Hooks=tn;J.parse=J;J.options;J.setOptions;J.use;J.walkTokens;J.parseInline;Te.parse;Ce.lex;J.setOptions({gfm:!0,breaks:!0});const Xh=["a","b","blockquote","br","code","del","em","h1","h2","h3","h4","hr","i","li","ol","p","pre","strong","table","tbody","td","th","thead","tr","ul","img"],Zh=["class","href","rel","target","title","start","src","alt"],ea={ALLOWED_TAGS:Xh,ALLOWED_ATTR:Zh,ADD_DATA_URI_TAGS:["img"]};let ta=!1;const em=14e4,tm=4e4,nm=200,ts=5e4,ut=new Map;function im(e){const t=ut.get(e);return t===void 0?null:(ut.delete(e),ut.set(e,t),t)}function na(e,t){if(ut.set(e,t),ut.size<=nm)return;const n=ut.keys().next().value;n&&ut.delete(n)}function sm(){ta||(ta=!0,As.addHook("afterSanitizeAttributes",e=>{!(e instanceof HTMLAnchorElement)||!e.getAttribute("href")||(e.setAttribute("rel","noreferrer noopener"),e.setAttribute("target","_blank"))}))}function Es(e){const t=e.trim();if(!t)return"";if(sm(),t.length<=ts){const r=im(t);if(r!==null)return r}const n=za(t,em),i=n.truncated?`

… truncated (${n.total} chars, showing first ${n.text.length}).`:"";if(n.text.length>tm){const a=`<pre class="code-block">${ac(`${n.text}${i}`)}</pre>`,l=As.sanitize(a,ea);return t.length<=ts&&na(t,l),l}const s=J.parse(`${n.text}${i}`,{renderer:rc}),o=As.sanitize(s,ea);return t.length<=ts&&na(t,o),o}const rc=new J.Renderer;rc.html=({text:e})=>ac(e);function ac(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const om=new RegExp("\\p{Script=Hebrew}|\\p{Script=Arabic}|\\p{Script=Syriac}|\\p{Script=Thaana}|\\p{Script=Nko}|\\p{Script=Samaritan}|\\p{Script=Mandaic}|\\p{Script=Adlam}|\\p{Script=Phoenician}|\\p{Script=Lydian}","u");function lc(e,t=/[\s\p{P}\p{S}]/u){if(!e)return"ltr";for(const n of e)if(!t.test(n))return om.test(n)?"rtl":"ltr";return"ltr"}const rm=1500,am=2e3,cc="Copy as markdown",lm="Copied",cm="Copy failed";async function dm(e){if(!e)return!1;try{return await navigator.clipboard.writeText(e),!0}catch{return!1}}function Un(e,t){e.title=t,e.setAttribute("aria-label",t)}function um(e){const t=e.label??cc;return d`
    <button
      class="chat-copy-btn"
      type="button"
      title=${t}
      aria-label=${t}
      @click=${async n=>{const i=n.currentTarget;if(!i||i.dataset.copying==="1")return;i.dataset.copying="1",i.setAttribute("aria-busy","true"),i.disabled=!0;const s=await dm(e.text());if(i.isConnected){if(delete i.dataset.copying,i.removeAttribute("aria-busy"),i.disabled=!1,!s){i.dataset.error="1",Un(i,cm),window.setTimeout(()=>{i.isConnected&&(delete i.dataset.error,Un(i,t))},am);return}i.dataset.copied="1",Un(i,lm),window.setTimeout(()=>{i.isConnected&&(delete i.dataset.copied,Un(i,t))},rm)}}}
    >
      <span class="chat-copy-btn__icon" aria-hidden="true">
        <span class="chat-copy-btn__icon-copy">${re.copy}</span>
        <span class="chat-copy-btn__icon-check">${re.check}</span>
      </span>
    </button>
  `}function fm(e){return um({text:()=>e,label:cc})}function dc(e){const t=e;let n=typeof t.role=="string"?t.role:"unknown";const i=typeof t.toolCallId=="string"||typeof t.tool_call_id=="string",s=t.content,o=Array.isArray(s)?s:null,r=Array.isArray(o)&&o.some(u=>{const p=u,b=(typeof p.type=="string"?p.type:"").toLowerCase();return b==="toolresult"||b==="tool_result"}),a=typeof t.toolName=="string"||typeof t.tool_name=="string";(i||r||a)&&(n="toolResult");let l=[];typeof t.content=="string"?l=[{type:"text",text:t.content}]:Array.isArray(t.content)?l=t.content.map(u=>({type:u.type||"text",text:u.text,name:u.name,args:u.args||u.arguments})):typeof t.text=="string"&&(l=[{type:"text",text:t.text}]);const c=typeof t.timestamp=="number"?t.timestamp:Date.now(),f=typeof t.id=="string"?t.id:void 0;return{role:n,content:l,timestamp:c,id:f}}function ko(e){const t=e.toLowerCase();return e==="user"||e==="User"?e:e==="assistant"?"assistant":e==="system"?"system":t==="toolresult"||t==="tool_result"||t==="tool"||t==="function"?"tool":e}function uc(e){const t=e,n=typeof t.role=="string"?t.role.toLowerCase():"";return n==="toolresult"||n==="tool_result"}function pm(e){return(e??"").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())||"Tool"}function gm(e){const t=(e??"").trim();return t?t.replace(/\s+/g,"_").toLowerCase():""}function hm(e){return(e??"").trim().toLowerCase()||"use"}const mm={icon:"puzzle",detailKeys:["command","path","url","targetUrl","targetId","ref","element","node","nodeId","id","requestId","to","channelId","guildId","userId","name","query","pattern","messageId"]},vm={bash:{icon:"wrench",title:"Bash",detailKeys:["command"]},process:{icon:"wrench",title:"Process",detailKeys:["sessionId"]},read:{icon:"fileText",title:"Read",detailKeys:["path"]},write:{icon:"edit",title:"Write",detailKeys:["path"]},edit:{icon:"penLine",title:"Edit",detailKeys:["path"]},attach:{icon:"paperclip",title:"Attach",detailKeys:["path","url","fileName"]},browser:{icon:"globe",title:"Browser",actions:{status:{label:"status"},start:{label:"start"},stop:{label:"stop"},tabs:{label:"tabs"},open:{label:"open",detailKeys:["targetUrl"]},focus:{label:"focus",detailKeys:["targetId"]},close:{label:"close",detailKeys:["targetId"]},snapshot:{label:"snapshot",detailKeys:["targetUrl","targetId","ref","element","format"]},screenshot:{label:"screenshot",detailKeys:["targetUrl","targetId","ref","element"]},navigate:{label:"navigate",detailKeys:["targetUrl","targetId"]},console:{label:"console",detailKeys:["level","targetId"]},pdf:{label:"pdf",detailKeys:["targetId"]},upload:{label:"upload",detailKeys:["paths","ref","inputRef","element","targetId"]},dialog:{label:"dialog",detailKeys:["accept","promptText","targetId"]},act:{label:"act",detailKeys:["request.kind","request.ref","request.selector","request.text","request.value"]}}},canvas:{icon:"image",title:"Canvas",actions:{present:{label:"present",detailKeys:["target","node","nodeId"]},hide:{label:"hide",detailKeys:["node","nodeId"]},navigate:{label:"navigate",detailKeys:["url","node","nodeId"]},eval:{label:"eval",detailKeys:["javaScript","node","nodeId"]},snapshot:{label:"snapshot",detailKeys:["format","node","nodeId"]},a2ui_push:{label:"A2UI push",detailKeys:["jsonlPath","node","nodeId"]},a2ui_reset:{label:"A2UI reset",detailKeys:["node","nodeId"]}}},nodes:{icon:"smartphone",title:"Nodes",actions:{status:{label:"status"},describe:{label:"describe",detailKeys:["node","nodeId"]},pending:{label:"pending"},approve:{label:"approve",detailKeys:["requestId"]},reject:{label:"reject",detailKeys:["requestId"]},notify:{label:"notify",detailKeys:["node","nodeId","title","body"]},camera_snap:{label:"camera snap",detailKeys:["node","nodeId","facing","deviceId"]},camera_list:{label:"camera list",detailKeys:["node","nodeId"]},camera_clip:{label:"camera clip",detailKeys:["node","nodeId","facing","duration","durationMs"]},screen_record:{label:"screen record",detailKeys:["node","nodeId","duration","durationMs","fps","screenIndex"]}}},cron:{icon:"loader",title:"Cron",actions:{status:{label:"status"},list:{label:"list"},add:{label:"add",detailKeys:["job.name","job.id","job.schedule","job.cron"]},update:{label:"update",detailKeys:["id"]},remove:{label:"remove",detailKeys:["id"]},run:{label:"run",detailKeys:["id"]},runs:{label:"runs",detailKeys:["id"]},wake:{label:"wake",detailKeys:["text","mode"]}}},gateway:{icon:"plug",title:"Gateway",actions:{restart:{label:"restart",detailKeys:["reason","delayMs"]},"config.get":{label:"config get"},"config.schema":{label:"config schema"},"config.apply":{label:"config apply",detailKeys:["restartDelayMs"]},"update.run":{label:"update run",detailKeys:["restartDelayMs"]}}},whatsapp_login:{icon:"circle",title:"WhatsApp Login",actions:{start:{label:"start"},wait:{label:"wait"}}},discord:{icon:"messageSquare",title:"Discord",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sticker:{label:"sticker",detailKeys:["to","stickerIds"]},poll:{label:"poll",detailKeys:["question","to"]},permissions:{label:"permissions",detailKeys:["channelId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},threadCreate:{label:"thread create",detailKeys:["channelId","name"]},threadList:{label:"thread list",detailKeys:["guildId","channelId"]},threadReply:{label:"thread reply",detailKeys:["channelId","content"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},searchMessages:{label:"search",detailKeys:["guildId","content"]},memberInfo:{label:"member",detailKeys:["guildId","userId"]},roleInfo:{label:"roles",detailKeys:["guildId"]},emojiList:{label:"emoji list",detailKeys:["guildId"]},roleAdd:{label:"role add",detailKeys:["guildId","userId","roleId"]},roleRemove:{label:"role remove",detailKeys:["guildId","userId","roleId"]},channelInfo:{label:"channel",detailKeys:["channelId"]},channelList:{label:"channels",detailKeys:["guildId"]},voiceStatus:{label:"voice",detailKeys:["guildId","userId"]},eventList:{label:"events",detailKeys:["guildId"]},eventCreate:{label:"event create",detailKeys:["guildId","name"]},timeout:{label:"timeout",detailKeys:["guildId","userId"]},kick:{label:"kick",detailKeys:["guildId","userId"]},ban:{label:"ban",detailKeys:["guildId","userId"]}}},slack:{icon:"messageSquare",title:"Slack",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},memberInfo:{label:"member",detailKeys:["userId"]},emojiList:{label:"emoji list"}}}},ym={fallback:mm,tools:vm},fc=ym,ia=fc.fallback??{icon:"puzzle"},bm=fc.tools??{};function wm(e){if(!e)return e;const t=[{re:/^\/Users\/[^/]+(\/|$)/,replacement:"~$1"},{re:/^\/home\/[^/]+(\/|$)/,replacement:"~$1"},{re:/^C:\\Users\\[^\\]+(\\|$)/i,replacement:"~$1"}];for(const n of t)if(n.re.test(e))return e.replace(n.re,n.replacement);return e}function $m(e){const t=gm(e.name),n=t.toLowerCase(),i=bm[n],s=(i==null?void 0:i.icon)??ia.icon??"puzzle",o=(i==null?void 0:i.title)??pm(t),r=(i==null?void 0:i.label)??o,a=e.args&&typeof e.args=="object"?e.args.action:void 0,l=typeof a=="string"?a.trim():void 0,c=n==="web_search"?"search":n==="web_fetch"?"fetch":n.replace(/_/g," ").replace(/\./g," "),f=hm(l??c);let u;n==="exec"&&(u=void 0),!u&&n==="read"&&(u=void 0),!u&&(n==="write"||n==="edit"||n==="attach")&&(u=void 0),!u&&n==="web_search"&&(u=void 0),!u&&n==="web_fetch"&&(u=void 0);const p=(i==null?void 0:i.detailKeys)??ia.detailKeys??[];return!u&&p.length>0&&(u=void 0),!u&&e.meta&&(u=e.meta),u&&(u=wm(u)),{name:t,icon:s,title:o,label:r,verb:f,detail:u}}function xm(e){if(e.detail){if(e.detail.includes(" · ")){const t=e.detail.split(" · ").map(n=>n.trim()).filter(n=>n.length>0).join(", ");return t?`with ${t}`:void 0}return e.detail}}const km=80,Sm=2,sa=100;function Am(e){const t=e.trim();if(t.startsWith("{")||t.startsWith("["))try{const n=JSON.parse(t);return"```json\n"+JSON.stringify(n,null,2)+"\n```"}catch{}return e}function _m(e){const t=e.split(`
`),n=t.slice(0,Sm),i=n.join(`
`);return i.length>sa?i.slice(0,sa)+"…":n.length<t.length?i+"…":i}function Cm(e){const t=e,n=Tm(t.content),i=[];for(const s of n){const o=(typeof s.type=="string"?s.type:"").toLowerCase();(["toolcall","tool_call","tooluse","tool_use"].includes(o)||typeof s.name=="string"&&s.arguments!=null)&&i.push({kind:"call",name:s.name??"tool",args:Em(s.arguments??s.args)})}for(const s of n){const o=(typeof s.type=="string"?s.type:"").toLowerCase();if(o!=="toolresult"&&o!=="tool_result")continue;const r=Rm(s),a=typeof s.name=="string"?s.name:"tool";i.push({kind:"result",name:a,text:r})}if(uc(e)&&!i.some(s=>s.kind==="result")){const s=typeof t.toolName=="string"&&t.toolName||typeof t.tool_name=="string"&&t.tool_name||"tool",o=yl(e)??void 0;i.push({kind:"result",name:s,text:o})}return i}function oa(e,t){var u,p;const n=$m({name:e.name,args:e.args}),i=xm(n),s=!!((u=e.text)!=null&&u.trim()),o=!!t,r=o?()=>{if(s){t(Am(e.text));return}const b=`## ${n.label}

${i?`**Command:** \`${i}\`

`:""}*No output — tool completed successfully.*`;t(b)}:void 0,a=s&&(((p=e.text)==null?void 0:p.length)??0)<=km,l=s&&!a,c=s&&a,f=!s;return d`
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
      ${l?d`<div class="chat-tool-card__preview mono">${_m(e.text)}</div>`:$}
      ${c?d`<div class="chat-tool-card__inline mono">${e.text}</div>`:$}
    </div>
  `}function Tm(e){return Array.isArray(e)?e.filter(Boolean):[]}function Em(e){if(typeof e!="string")return e;const t=e.trim();if(!t||!t.startsWith("{")&&!t.startsWith("["))return e;try{return JSON.parse(t)}catch{return e}}function Rm(e){if(typeof e.text=="string")return e.text;if(typeof e.content=="string")return e.content}function Lm(e){const n=e.content,i=[];if(Array.isArray(n))for(const s of n){if(typeof s!="object"||s===null)continue;const o=s;if(o.type==="image"){const r=o.source;if((r==null?void 0:r.type)==="base64"&&typeof r.data=="string"){const a=r.data,l=r.media_type||"image/png",c=a.startsWith("data:")?a:`data:${l};base64,${a}`;i.push({url:c})}else typeof o.url=="string"&&i.push({url:o.url})}else if(o.type==="image_url"){const r=o.image_url;typeof(r==null?void 0:r.url)=="string"&&i.push({url:r.url})}}return i}function Im(e){return d`
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
  `}function Mm(e,t,n,i){const s=new Date(t).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}),o=(i==null?void 0:i.name)??"Assistant";return d`
    <div class="chat-group assistant">
      ${So("assistant",i)}
      <div class="chat-group-messages">
        ${pc({role:"assistant",content:[{type:"text",text:e}],timestamp:t},{isStreaming:!0,showReasoning:!1},n)}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${o}</span>
          <span class="chat-group-timestamp">${s}</span>
        </div>
      </div>
    </div>
  `}function Pm(e,t){const n=ko(e.role),i=t.assistantName??"Assistant",s=n==="user"?"You":n==="assistant"?i:n,o=n==="user"?"user":n==="assistant"?"assistant":"other",r=new Date(e.timestamp).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return d`
    <div class="chat-group ${o}">
      ${So(e.role,{name:i,avatar:t.assistantAvatar??null})}
      <div class="chat-group-messages">
        ${e.messages.map((a,l)=>pc(a.message,{isStreaming:e.isStreaming&&l===e.messages.length-1,showReasoning:t.showReasoning},t.onOpenSidebar))}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${s}</span>
          <span class="chat-group-timestamp">${r}</span>
        </div>
      </div>
    </div>
  `}function So(e,t){var a,l;const n=ko(e),i=((a=t==null?void 0:t.name)==null?void 0:a.trim())||"Assistant",s=((l=t==null?void 0:t.avatar)==null?void 0:l.trim())||"",o=n==="user"?"U":n==="assistant"?i.charAt(0).toUpperCase()||"A":n==="tool"?"⚙":"?",r=n==="user"?"user":n==="assistant"?"assistant":n==="tool"?"tool":"other";return s&&n==="assistant"?Dm(s)?d`<img
        class="chat-avatar ${r}"
        src="${s}"
        alt="${i}"
      />`:d`<div class="chat-avatar ${r}">${s}</div>`:d`<div class="chat-avatar ${r}">${o}</div>`}function Dm(e){return/^https?:\/\//i.test(e)||/^data:image\//i.test(e)||e.startsWith("/")}function Fm(e){return e.length===0?$:d`
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
  `}function pc(e,t,n){const i=e,s=typeof i.role=="string"?i.role:"unknown",o=uc(e)||s.toLowerCase()==="toolresult"||s.toLowerCase()==="tool_result"||typeof i.toolCallId=="string"||typeof i.tool_call_id=="string",r=Cm(e),a=r.length>0,l=Lm(e),c=l.length>0,f=yl(e),u=t.showReasoning&&s==="assistant"?Cf(e):null,p=f!=null&&f.trim()?f:null,b=u?Ef(u):null,x=p,k=s==="assistant"&&!!(x!=null&&x.trim()),S=["chat-bubble",k?"has-copy":"",t.isStreaming?"streaming":"","fade-in"].filter(Boolean).join(" ");return!x&&a&&o?d`${r.map(R=>oa(R,n))}`:!x&&!a&&!c?$:d`
    <div class="${S}">
      ${k?fm(x):$}
      ${Fm(l)}
      ${b?d`<div class="chat-thinking">${$s(Es(b))}</div>`:$}
      ${x?d`<div class="chat-text" dir="${lc(x)}">${$s(Es(x))}</div>`:$}
      ${r.map(R=>oa(R,n))}
    </div>
  `}function Nm(e){return d`
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
            `:e.content?d`<div class="sidebar-markdown">${$s(Es(e.content))}</div>`:d`
                  <div class="muted">No content available</div>
                `}
      </div>
    </div>
  `}var Om=Object.defineProperty,Bm=Object.getOwnPropertyDescriptor,wi=(e,t,n,i)=>{for(var s=i>1?void 0:i?Bm(t,n):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(s=(i?r(t,n,s):r(s))||s);return i&&s&&Om(t,n,s),s};let Ot=class extends Pt{constructor(){super(...arguments),this.splitRatio=.6,this.minRatio=.4,this.maxRatio=.7,this.isDragging=!1,this.startX=0,this.startRatio=0,this.handleMouseDown=e=>{this.isDragging=!0,this.startX=e.clientX,this.startRatio=this.splitRatio,this.classList.add("dragging"),document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),e.preventDefault()},this.handleMouseMove=e=>{if(!this.isDragging)return;const t=this.parentElement;if(!t)return;const n=t.getBoundingClientRect().width,s=(e.clientX-this.startX)/n;let o=this.startRatio+s;o=Math.max(this.minRatio,Math.min(this.maxRatio,o)),this.dispatchEvent(new CustomEvent("resize",{detail:{splitRatio:o},bubbles:!0,composed:!0}))},this.handleMouseUp=()=>{this.isDragging=!1,this.classList.remove("dragging"),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}}render(){return $}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}};Ot.styles=_c`
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
  `;wi([ai({type:Number})],Ot.prototype,"splitRatio",2);wi([ai({type:Number})],Ot.prototype,"minRatio",2);wi([ai({type:Number})],Ot.prototype,"maxRatio",2);Ot=wi([Ca("resizable-divider")],Ot);const Um=5e3,zm=/\.(xlsx|xls|xlsm|pdf)$/i;function Km(e){for(let t=0;t<e.length;t++)if(zm.test(e[t].name))return e[t];return null}function ra(e){e.style.height="auto",e.style.height=`${e.scrollHeight}px`}function Hm(e){return e?e.active?d`
      <div class="compaction-indicator compaction-indicator--active" role="status" aria-live="polite">
        ${re.loader} Compacting context...
      </div>
    `:e.completedAt&&Date.now()-e.completedAt<Um?d`
        <div class="compaction-indicator compaction-indicator--complete" role="status" aria-live="polite">
          ${re.check} Context compacted
        </div>
      `:$:$}function jm(){return`att-${Date.now()}-${Math.random().toString(36).slice(2,9)}`}function qm(e,t){var s;const n=(s=e.clipboardData)==null?void 0:s.items;if(!n||!t.onAttachmentsChange)return;const i=[];for(let o=0;o<n.length;o++){const r=n[o];r.type.startsWith("image/")&&i.push(r)}if(i.length!==0){e.preventDefault();for(const o of i){const r=o.getAsFile();if(!r)continue;const a=new FileReader;a.addEventListener("load",()=>{var u;const l=a.result,c={id:jm(),dataUrl:l,mimeType:r.type},f=t.attachments??[];(u=t.onAttachmentsChange)==null||u.call(t,[...f,c])}),a.readAsDataURL(r)}}}function Wm(e){const t=e.attachments??[];return t.length===0?$:d`
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
  `}function Gm(e){const t=e.uploadedFile,n=e.onFileSelect,i=e.onClearUploadedFile;return t!=null&&t.file_name?d`
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
  `}function Vm(e){var R,P,F,I;const t=e.connected,n=e.sending||e.stream!==null,i=!!(e.canAbort&&e.onAbort),s=(P=(R=e.sessions)==null?void 0:R.sessions)==null?void 0:P.find(A=>A.key===e.sessionKey),o=(s==null?void 0:s.reasoningLevel)??"off",r=e.showThinking&&o!=="off",a={name:e.assistantName,avatar:e.assistantAvatar??e.assistantAvatarUrl??null},l=(((F=e.attachments)==null?void 0:F.length)??0)>0;(I=e.uploadedFile)!=null&&I.file_name;const c=e.connected?l?"Add a message or paste more images...":"Message (↩ to send, Shift+↩ for line breaks；可粘贴图片，或上传/拖拽 Excel/PDF)":"Connect to the gateway to start chatting…",f=e.splitRatio??.6,u=!!(e.sidebarOpen&&e.onCloseSidebar),p=d`
    <div
      class="chat-thread"
      role="log"
      aria-live="polite"
      @scroll=${e.onChatScroll}
    >
      ${e.loading?d`
              <div class="muted">Loading chat…</div>
            `:$}
      ${Pl(Jm(e),A=>A.key,A=>A.kind==="divider"?d`
              <div class="chat-divider" role="separator" data-ts=${String(A.timestamp)}>
                <span class="chat-divider__line"></span>
                <span class="chat-divider__label">${A.label}</span>
                <span class="chat-divider__line"></span>
              </div>
            `:A.kind==="reading-indicator"?Im(a):A.kind==="stream"?Mm(A.text,A.startedAt,e.onOpenSidebar,a):A.kind==="group"?Pm(A,{onOpenSidebar:e.onOpenSidebar,showReasoning:r,assistantName:e.assistantName,assistantAvatar:a.avatar}):$)}
    </div>
  `,b=A=>{var g;A.preventDefault(),A.stopPropagation(),A.dataTransfer&&(A.dataTransfer.dropEffect="copy"),(g=e.onComposeDragOver)==null||g.call(e)},x=A=>{var g;A.preventDefault(),A.stopPropagation(),A.dataTransfer&&(A.dataTransfer.dropEffect="copy"),(g=e.onComposeDragOver)==null||g.call(e)},k=A=>{var C;const g=A.currentTarget,_=A.relatedTarget;_!=null&&(g.contains(_)||(C=e.onComposeDragLeave)==null||C.call(e))},S=A=>{var _,C,L;A.preventDefault(),A.stopPropagation(),(_=e.onComposeDragLeave)==null||_.call(e);const g=(L=(C=A.dataTransfer)==null?void 0:C.files)!=null&&L.length?Km(A.dataTransfer.files):null;g&&e.onComposeDrop&&e.onComposeDrop(g)};return d`
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
                @resize=${A=>{var g;return(g=e.onSplitRatioChange)==null?void 0:g.call(e,A.detail.splitRatio)}}
              ></resizable-divider>
              <div class="chat-sidebar">
                ${Nm({content:e.sidebarContent??null,error:e.sidebarError??null,onClose:e.onCloseSidebar,onViewRawText:()=>{!e.sidebarContent||!e.onOpenSidebar||e.onOpenSidebar(`\`\`\`
${e.sidebarContent}
\`\`\``)}})}
              </div>
            `:$}
      </div>

      ${e.queue.length?d`
            <div class="chat-queue" role="status" aria-live="polite">
              <div class="chat-queue__title">Queued (${e.queue.length})</div>
              <div class="chat-queue__list">
                ${e.queue.map(A=>{var g;return d`
                    <div class="chat-queue__item">
                      <div class="chat-queue__text">
                        ${A.text||((g=A.attachments)!=null&&g.length?`Image (${A.attachments.length})`:"")}
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

      ${Hm(e.compactionStatus)}

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
        ${Wm(e)}
        ${Gm(e)}
        <div class="chat-compose__row">
          <label class="field chat-compose__field">
            <span>Message</span>
            <textarea
              ${zg(A=>A&&ra(A))}
              .value=${e.draft}
              dir=${lc(e.draft)}
              ?disabled=${!e.connected}
              @keydown=${A=>{A.key==="Enter"&&(A.isComposing||A.keyCode===229||A.shiftKey||e.connected&&(A.preventDefault(),t&&e.onSend()))}}
              @input=${A=>{const g=A.target;ra(g),e.onDraftChange(g.value)}}
              @paste=${A=>qm(A,e)}
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
  `}const aa=200;function Qm(e){const t=[];let n=null;for(const i of e){if(i.kind!=="message"){n&&(t.push(n),n=null),t.push(i);continue}const s=dc(i.message),o=ko(s.role),r=s.timestamp||Date.now();!n||n.role!==o?(n&&t.push(n),n={kind:"group",key:`group:${o}:${i.key}`,role:o,messages:[{message:i.message,key:i.key}],timestamp:r,isStreaming:!1}):n.messages.push({message:i.message,key:i.key})}return n&&t.push(n),t}function Jm(e){const t=[],n=Array.isArray(e.messages)?e.messages:[],i=Array.isArray(e.toolMessages)?e.toolMessages:[],s=Math.max(0,n.length-aa);s>0&&t.push({kind:"message",key:"chat:history:notice",message:{role:"system",content:`Showing last ${aa} messages (${s} hidden).`,timestamp:Date.now()}});for(let o=s;o<n.length;o++){const r=n[o],a=dc(r),c=r.__openclaw;if(c&&c.kind==="compaction"){t.push({kind:"divider",key:typeof c.id=="string"?`divider:compaction:${c.id}`:`divider:compaction:${a.timestamp}:${o}`,label:"Compaction",timestamp:a.timestamp??Date.now()});continue}!e.showThinking&&a.role.toLowerCase()==="toolresult"||t.push({kind:"message",key:la(r,o),message:r})}if(e.showThinking)for(let o=0;o<i.length;o++)t.push({kind:"message",key:la(i[o],o+n.length),message:i[o]});if(e.stream!==null){const o=`stream:${e.sessionKey}:${e.streamStartedAt??"live"}`;e.stream.trim().length>0?t.push({kind:"stream",key:o,text:e.stream,startedAt:e.streamStartedAt??Date.now()}):t.push({kind:"reading-indicator",key:o})}return Qm(t)}function la(e,t){const n=e,i=typeof n.toolCallId=="string"?n.toolCallId:"";if(i)return`tool:${i}`;const s=typeof n.id=="string"?n.id:"";if(s)return`msg:${s}`;const o=typeof n.messageId=="string"?n.messageId:"";if(o)return`msg:${o}`;const r=typeof n.timestamp=="number"?n.timestamp:null,a=typeof n.role=="string"?n.role:"unknown";return r!=null?`msg:${a}:${r}:${t}`:`msg:${a}:${t}`}const Ym=new Set(["title","description","default","nullable"]);function Xm(e){return Object.keys(e??{}).filter(n=>!Ym.has(n)).length===0}function Zm(e){if(e===void 0)return"";try{return JSON.stringify(e,null,2)??""}catch{return""}}const bn={chevronDown:d`
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
  `};function bt(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:r,onPatch:a}=e,l=e.showLabel??!0,c=$e(t),f=xe(i,s),u=(f==null?void 0:f.label)??t.title??qe(String(i.at(-1))),p=(f==null?void 0:f.help)??t.description,b=Fs(i);if(o.has(b))return d`<div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${u}</div>
      <div class="cfg-field__error">Unsupported schema node. Use Raw mode.</div>
    </div>`;if(t.anyOf||t.oneOf){const k=(t.anyOf??t.oneOf??[]).filter(A=>!(A.type==="null"||Array.isArray(A.type)&&A.type.includes("null")));if(k.length===1)return bt({...e,schema:k[0]});const S=A=>{if(A.const!==void 0)return A.const;if(A.enum&&A.enum.length===1)return A.enum[0]},R=k.map(S),P=R.every(A=>A!==void 0);if(P&&R.length>0&&R.length<=5){const A=n??t.default;return d`
        <div class="cfg-field">
          ${l?d`<label class="cfg-field__label">${u}</label>`:$}
          ${p?d`<div class="cfg-field__help">${p}</div>`:$}
          <div class="cfg-segmented">
            ${R.map(g=>d`
              <button
                type="button"
                class="cfg-segmented__btn ${g===A||String(g)===String(A)?"active":""}"
                ?disabled=${r}
                @click=${()=>a(i,g)}
              >
                ${String(g)}
              </button>
            `)}
          </div>
        </div>
      `}if(P&&R.length>5)return da({...e,options:R,value:n??t.default});const F=new Set(k.map(A=>$e(A)).filter(Boolean)),I=new Set([...F].map(A=>A==="integer"?"number":A));if([...I].every(A=>["string","number","boolean"].includes(A))){const A=I.has("string"),g=I.has("number");if(I.has("boolean")&&I.size===1)return bt({...e,schema:{...t,type:"boolean",anyOf:void 0,oneOf:void 0}});if(A||g)return ca({...e,inputType:g&&!A?"number":"text"})}}if(t.enum){const x=t.enum;if(x.length<=5){const k=n??t.default;return d`
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
      `}return da({...e,options:x,value:n??t.default})}if(c==="object")return tv(e);if(c==="array")return nv(e);if(c==="boolean"){const x=typeof n=="boolean"?n:typeof t.default=="boolean"?t.default:!1;return d`
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
    `}return c==="number"||c==="integer"?ev(e):c==="string"?ca({...e,inputType:"text"}):d`
    <div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${u}</div>
      <div class="cfg-field__error">Unsupported type: ${c}. Use Raw mode.</div>
    </div>
  `}function ca(e){const{schema:t,value:n,path:i,hints:s,disabled:o,onPatch:r,inputType:a}=e,l=e.showLabel??!0,c=xe(i,s),f=(c==null?void 0:c.label)??t.title??qe(String(i.at(-1))),u=(c==null?void 0:c.help)??t.description,p=((c==null?void 0:c.sensitive)??!1)&&!/^\$\{[^}]*\}$/.test(String(n??"").trim()),b=(c==null?void 0:c.placeholder)??(p?"••••":t.default!==void 0?`Default: ${String(t.default)}`:""),x=n??"";return d`
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
          @input=${k=>{const S=k.target.value;if(a==="number"){if(S.trim()===""){r(i,void 0);return}const R=Number(S);r(i,Number.isNaN(R)?S:R);return}r(i,S)}}
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
  `}function ev(e){const{schema:t,value:n,path:i,hints:s,disabled:o,onPatch:r}=e,a=e.showLabel??!0,l=xe(i,s),c=(l==null?void 0:l.label)??t.title??qe(String(i.at(-1))),f=(l==null?void 0:l.help)??t.description,u=n??t.default??"",p=typeof u=="number"?u:0;return d`
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
  `}function da(e){const{schema:t,value:n,path:i,hints:s,disabled:o,options:r,onPatch:a}=e,l=e.showLabel??!0,c=xe(i,s),f=(c==null?void 0:c.label)??t.title??qe(String(i.at(-1))),u=(c==null?void 0:c.help)??t.description,p=n??t.default,b=r.findIndex(k=>k===p||String(k)===String(p)),x="__unset__";return d`
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
  `}function tv(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:r,onPatch:a}=e,l=xe(i,s),c=(l==null?void 0:l.label)??t.title??qe(String(i.at(-1))),f=(l==null?void 0:l.help)??t.description,u=n??t.default,p=u&&typeof u=="object"&&!Array.isArray(u)?u:{},b=t.properties??{},k=Object.entries(b).toSorted((I,A)=>{var C,L;const g=((C=xe([...i,I[0]],s))==null?void 0:C.order)??0,_=((L=xe([...i,A[0]],s))==null?void 0:L.order)??0;return g!==_?g-_:I[0].localeCompare(A[0])}),S=new Set(Object.keys(b)),R=t.additionalProperties,P=!!R&&typeof R=="object",F=d`
    ${k.map(([I,A])=>bt({schema:A,value:p[I],path:[...i,I],hints:s,unsupported:o,disabled:r,onPatch:a}))}
    ${P?iv({schema:R,value:p,path:i,hints:s,unsupported:o,disabled:r,reservedKeys:S,onPatch:a}):$}
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
  `}function nv(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:r,onPatch:a}=e,l=e.showLabel??!0,c=xe(i,s),f=(c==null?void 0:c.label)??t.title??qe(String(i.at(-1))),u=(c==null?void 0:c.help)??t.description,p=Array.isArray(t.items)?t.items[0]:t.items;if(!p)return d`
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
                ${bt({schema:p,value:x,path:[...i,k],hints:s,unsupported:o,disabled:r,showLabel:!1,onPatch:a})}
              </div>
            </div>
          `)}
        </div>
      `}
    </div>
  `}function iv(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:r,reservedKeys:a,onPatch:l}=e,c=Xm(t),f=Object.entries(n??{}).filter(([u])=>!a.has(u));return d`
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
          ${f.map(([u,p])=>{const b=[...i,u],x=Zm(p);return d`
              <div class="cfg-map__item">
                <div class="cfg-map__item-key">
                  <input
                    type="text"
                    class="cfg-input cfg-input--sm"
                    placeholder="Key"
                    .value=${u}
                    ?disabled=${r}
                    @change=${k=>{const S=k.target.value.trim();if(!S||S===u)return;const R={...n};S in R||(R[S]=R[u],delete R[u],l(i,R))}}
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
                          @change=${k=>{const S=k.target,R=S.value.trim();if(!R){l(b,void 0);return}try{l(b,JSON.parse(R))}catch{S.value=x}}}
                        ></textarea>
                      `:bt({schema:t,value:p,path:b,hints:s,unsupported:o,disabled:r,showLabel:!1,onPatch:l})}
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
  `},Ao={env:{label:"Environment Variables",description:"Environment variables passed to the gateway process"},update:{label:"Updates",description:"Auto-update settings and release channel"},agents:{label:"Agents",description:"Agent configurations, models, and identities"},auth:{label:"Authentication",description:"API keys and authentication profiles"},channels:{label:"Channels",description:"Messaging channels (Telegram, Discord, Slack, etc.)"},messages:{label:"Messages",description:"Message handling and routing settings"},commands:{label:"Commands",description:"Custom slash commands"},hooks:{label:"Hooks",description:"Webhooks and event hooks"},skills:{label:"Skills",description:"Skill packs and capabilities"},tools:{label:"Tools",description:"Tool configurations (browser, search, etc.)"},gateway:{label:"Gateway",description:"Gateway server settings (port, auth, binding)"},wizard:{label:"Setup Wizard",description:"Setup wizard state and history"},meta:{label:"Metadata",description:"Gateway metadata and version information"},logging:{label:"Logging",description:"Log levels and output configuration"},browser:{label:"Browser",description:"Browser automation settings"},ui:{label:"UI",description:"User interface preferences"},models:{label:"Models",description:"AI model configurations and providers"},bindings:{label:"Bindings",description:"Key bindings and shortcuts"},broadcast:{label:"Broadcast",description:"Broadcast and notification settings"},audio:{label:"Audio",description:"Audio input/output settings"},session:{label:"Session",description:"Session management and persistence"},cron:{label:"Cron",description:"Scheduled tasks and automation"},web:{label:"Web",description:"Web server and API settings"},discovery:{label:"Discovery",description:"Service discovery and networking"},canvasHost:{label:"Canvas Host",description:"Canvas rendering and display"},talk:{label:"Talk",description:"Voice and speech settings"},plugins:{label:"Plugins",description:"Plugin management and extensions"}};function fa(e){return ua[e]??ua.default}function sv(e,t,n){if(!n)return!0;const i=n.toLowerCase(),s=Ao[e];return e.toLowerCase().includes(i)||s&&(s.label.toLowerCase().includes(i)||s.description.toLowerCase().includes(i))?!0:nn(t,i)}function nn(e,t){var i,s,o;if((i=e.title)!=null&&i.toLowerCase().includes(t)||(s=e.description)!=null&&s.toLowerCase().includes(t)||(o=e.enum)!=null&&o.some(r=>String(r).toLowerCase().includes(t)))return!0;if(e.properties){for(const[r,a]of Object.entries(e.properties))if(r.toLowerCase().includes(t)||nn(a,t))return!0}if(e.items){const r=Array.isArray(e.items)?e.items:[e.items];for(const a of r)if(a&&nn(a,t))return!0}if(e.additionalProperties&&typeof e.additionalProperties=="object"&&nn(e.additionalProperties,t))return!0;const n=e.anyOf??e.oneOf??e.allOf;if(n){for(const r of n)if(r&&nn(r,t))return!0}return!1}function ov(e){var u;if(!e.schema)return d`
      <div class="muted">Schema unavailable.</div>
    `;const t=e.schema,n=e.value??{};if($e(t)!=="object"||!t.properties)return d`
      <div class="callout danger">Unsupported schema. Use Raw.</div>
    `;const i=new Set(e.unsupportedPaths??[]),s=t.properties,o=e.searchQuery??"",r=e.activeSection,a=e.activeSubsection??null,c=Object.entries(s).toSorted((p,b)=>{var S,R;const x=((S=xe([p[0]],e.uiHints))==null?void 0:S.order)??50,k=((R=xe([b[0]],e.uiHints))==null?void 0:R.order)??50;return x!==k?x-k:p[0].localeCompare(b[0])}).filter(([p,b])=>!(r&&p!==r||o&&!sv(p,b,o)));let f=null;if(r&&a&&c.length===1){const p=(u=c[0])==null?void 0:u[1];p&&$e(p)==="object"&&p.properties&&p.properties[a]&&(f={sectionKey:r,subsectionKey:a,schema:p.properties[a]})}return c.length===0?d`
      <div class="config-empty">
        <div class="config-empty__icon">${re.search}</div>
        <div class="config-empty__text">
          ${o?`No settings match "${o}"`:"No settings in this section"}
        </div>
      </div>
    `:d`
    <div class="config-form config-form--modern">
      ${f?(()=>{const{sectionKey:p,subsectionKey:b,schema:x}=f,k=xe([p,b],e.uiHints),S=(k==null?void 0:k.label)??x.title??qe(b),R=(k==null?void 0:k.help)??x.description??"",P=n[p],F=P&&typeof P=="object"?P[b]:void 0,I=`config-section-${p}-${b}`;return d`
              <section class="config-section-card" id=${I}>
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${fa(p)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${S}</h3>
                    ${R?d`<p class="config-section-card__desc">${R}</p>`:$}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${bt({schema:x,value:F,path:[p,b],hints:e.uiHints,unsupported:i,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
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
                  ${bt({schema:b,value:n[p],path:[p],hints:e.uiHints,unsupported:i,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})}
    </div>
  `}const rv=new Set(["title","description","default","nullable"]);function av(e){return Object.keys(e??{}).filter(n=>!rv.has(n)).length===0}function gc(e){const t=e.filter(s=>s!=null),n=t.length!==e.length,i=[];for(const s of t)i.some(o=>Object.is(o,s))||i.push(s);return{enumValues:i,nullable:n}}function lv(e){return!e||typeof e!="object"?{schema:null,unsupportedPaths:["<root>"]}:dn(e,[])}function dn(e,t){const n=new Set,i={...e},s=Fs(t)||"<root>";if(e.anyOf||e.oneOf||e.allOf){const a=cv(e,t);return a||{schema:e,unsupportedPaths:[s]}}const o=Array.isArray(e.type)&&e.type.includes("null"),r=$e(e)??(e.properties||e.additionalProperties?"object":void 0);if(i.type=r??e.type,i.nullable=o||e.nullable,i.enum){const{enumValues:a,nullable:l}=gc(i.enum);i.enum=a,l&&(i.nullable=!0),a.length===0&&n.add(s)}if(r==="object"){const a=e.properties??{},l={};for(const[c,f]of Object.entries(a)){const u=dn(f,[...t,c]);u.schema&&(l[c]=u.schema);for(const p of u.unsupportedPaths)n.add(p)}if(i.properties=l,e.additionalProperties===!0)n.add(s);else if(e.additionalProperties===!1)i.additionalProperties=!1;else if(e.additionalProperties&&typeof e.additionalProperties=="object"&&!av(e.additionalProperties)){const c=dn(e.additionalProperties,[...t,"*"]);i.additionalProperties=c.schema??e.additionalProperties,c.unsupportedPaths.length>0&&n.add(s)}}else if(r==="array"){const a=Array.isArray(e.items)?e.items[0]:e.items;if(!a)n.add(s);else{const l=dn(a,[...t,"*"]);i.items=l.schema??a,l.unsupportedPaths.length>0&&n.add(s)}}else r!=="string"&&r!=="number"&&r!=="integer"&&r!=="boolean"&&!i.enum&&n.add(s);return{schema:i,unsupportedPaths:Array.from(n)}}function cv(e,t){if(e.allOf)return null;const n=e.anyOf??e.oneOf;if(!n)return null;const i=[],s=[];let o=!1;for(const a of n){if(!a||typeof a!="object")return null;if(Array.isArray(a.enum)){const{enumValues:l,nullable:c}=gc(a.enum);i.push(...l),c&&(o=!0);continue}if("const"in a){if(a.const==null){o=!0;continue}i.push(a.const);continue}if($e(a)==="null"){o=!0;continue}s.push(a)}if(i.length>0&&s.length===0){const a=[];for(const l of i)a.some(c=>Object.is(c,l))||a.push(l);return{schema:{...e,enum:a,nullable:o,anyOf:void 0,oneOf:void 0,allOf:void 0},unsupportedPaths:[]}}if(s.length===1){const a=dn(s[0],t);return a.schema&&(a.schema.nullable=o||a.schema.nullable),a}const r=new Set(["string","number","integer","boolean"]);return s.length>0&&i.length===0&&s.every(a=>a.type&&r.has(String(a.type)))?{schema:{...e,nullable:o},unsupportedPaths:[]}:null}const Rs={all:d`
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
  `},pa=[{key:"env",label:"Environment"},{key:"update",label:"Updates"},{key:"agents",label:"Agents"},{key:"auth",label:"Authentication"},{key:"channels",label:"Channels"},{key:"messages",label:"Messages"},{key:"commands",label:"Commands"},{key:"hooks",label:"Hooks"},{key:"skills",label:"Skills"},{key:"tools",label:"Tools"},{key:"gateway",label:"Gateway"},{key:"wizard",label:"Setup Wizard"}],ga="__all__";function ha(e){return Rs[e]??Rs.default}function dv(e,t){const n=Ao[e];return n||{label:(t==null?void 0:t.title)??qe(e),description:(t==null?void 0:t.description)??""}}function uv(e){const{key:t,schema:n,uiHints:i}=e;if(!n||$e(n)!=="object"||!n.properties)return[];const s=Object.entries(n.properties).map(([o,r])=>{const a=xe([t,o],i),l=(a==null?void 0:a.label)??r.title??qe(o),c=(a==null?void 0:a.help)??r.description??"",f=(a==null?void 0:a.order)??50;return{key:o,label:l,description:c,order:f}});return s.sort((o,r)=>o.order!==r.order?o.order-r.order:o.key.localeCompare(r.key)),s}function fv(e,t){if(!e||!t)return[];const n=[];function i(s,o,r){if(s===o)return;if(typeof s!=typeof o){n.push({path:r,from:s,to:o});return}if(typeof s!="object"||s===null||o===null){s!==o&&n.push({path:r,from:s,to:o});return}if(Array.isArray(s)&&Array.isArray(o)){JSON.stringify(s)!==JSON.stringify(o)&&n.push({path:r,from:s,to:o});return}const a=s,l=o,c=new Set([...Object.keys(a),...Object.keys(l)]);for(const f of c)i(a[f],l[f],r?`${r}.${f}`:f)}return i(e,t,""),n}function ma(e,t=40){let n;try{n=JSON.stringify(e)??String(e)}catch{n=String(e)}return n.length<=t?n:n.slice(0,t-3)+"..."}function pv(e){var g,_,C;const t=e.valid==null?"unknown":e.valid?"valid":"invalid",n=lv(e.schema),i=n.schema?n.unsupportedPaths.length>0:!1,s=((g=n.schema)==null?void 0:g.properties)??{},o=pa.filter(L=>L.key in s),r=new Set(pa.map(L=>L.key)),a=Object.keys(s).filter(L=>!r.has(L)).map(L=>({key:L,label:L.charAt(0).toUpperCase()+L.slice(1)})),l=[...o,...a],c=e.activeSection&&n.schema&&$e(n.schema)==="object"?(_=n.schema.properties)==null?void 0:_[e.activeSection]:void 0,f=e.activeSection?dv(e.activeSection,c):null,u=e.activeSection?uv({key:e.activeSection,schema:c,uiHints:e.uiHints}):[],p=e.formMode==="form"&&!!e.activeSection&&u.length>0,b=e.activeSubsection===ga,x=e.searchQuery||b?null:e.activeSubsection??((C=u[0])==null?void 0:C.key)??null,k=e.formMode==="form"?fv(e.originalValue,e.formValue):[],S=e.formMode==="raw"&&e.raw!==e.originalRaw,R=e.formMode==="form"?k.length>0:S,P=!!e.formValue&&!e.loading&&!!n.schema,F=e.connected&&!e.saving&&R&&(e.formMode==="raw"?!0:P),I=e.connected&&!e.applying&&!e.updating&&R&&(e.formMode==="raw"?!0:P),A=e.connected&&!e.applying&&!e.updating;return d`
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
            @input=${L=>e.onSearchChange(L.target.value)}
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
            <span class="config-nav__icon">${Rs.all}</span>
            <span class="config-nav__label">All Settings</span>
          </button>
          ${l.map(L=>d`
              <button
                class="config-nav__item ${e.activeSection===L.key?"active":""}"
                @click=${()=>e.onSectionChange(L.key)}
              >
                <span class="config-nav__icon"
                  >${ha(L.key)}</span
                >
                <span class="config-nav__label">${L.label}</span>
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
            ${R?d`
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
              ?disabled=${!I}
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
        ${R&&e.formMode==="form"?d`
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
                  ${k.map(L=>d`
                      <div class="config-diff__item">
                        <div class="config-diff__path">${L.path}</div>
                        <div class="config-diff__values">
                          <span class="config-diff__from"
                            >${ma(L.from)}</span
                          >
                          <span class="config-diff__arrow">→</span>
                          <span class="config-diff__to"
                            >${ma(L.to)}</span
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
                ${u.map(L=>d`
                    <button
                      class="config-subnav__item ${x===L.key?"active":""}"
                      title=${L.description||L.label}
                      @click=${()=>e.onSubsectionChange(L.key)}
                    >
                      ${L.label}
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
                      `:ov({schema:n.schema,uiHints:e.uiHints,value:e.formValue,disabled:e.loading||!e.formValue,unsupportedPaths:n.unsupportedPaths,onPatch:e.onFormPatch,searchQuery:e.searchQuery,activeSection:e.activeSection,activeSubsection:x})}
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
                    @input=${L=>e.onRawChange(L.target.value)}
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
  `}function gv(e){if(!e)return"-";try{return new Date(e).toLocaleString()}catch{return e??"-"}}function hv(e,t,n,i){const s=i==="asc"?1:-1;if(n==="created_at"){const o=e.created_at?new Date(e.created_at).getTime():0,r=t.created_at?new Date(t.created_at).getTime():0;return(o-r)*s}return n==="name"?(e.name??"").localeCompare(t.name??"")*s:(e.draft_no??"").localeCompare(t.draft_no??"")*s}function mv(e){const{loading:t,error:n,drafts:i,detail:s,detailId:o,confirmBusy:r,confirmResult:a,filterQuery:l,sortBy:c,sortDir:f,page:u,pageSize:p,onRefresh:b,onSelectDraft:x,onConfirm:k,onClearDetail:S,onFilterQueryChange:R,onSortByChange:P,onSortDirChange:F,onPageChange:I,onPageSizeChange:A}=e,g=l.trim().toLowerCase(),C=[...g?i.filter(B=>`${B.draft_no??""}
${B.name??""}
${B.source??""}`.toLowerCase().includes(g)):i].sort((B,ee)=>hv(B,ee,c,f)),L=C.length,U=Math.max(1,p||10),O=Math.max(1,Math.ceil(L/U)),z=Math.min(Math.max(1,u),O),K=(z-1)*U,Y=C.slice(K,K+U);return d`
    <section class="grid grid-cols-2" aria-label=${y("tabs.cron")}>
      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${y("fulfill.title")}</div>
        <div class="card-sub">${y("fulfill.subtitle")}</div>
        <div style="margin-top: 12px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <button class="btn" ?disabled=${t} @click=${b} aria-label=${y("fulfill.refreshList")}>
            ${y(t?"fulfill.loading":"fulfill.refreshList")}
          </button>
          <input
            type="search"
            .value=${l}
            placeholder=${y("fulfill.filterPlaceholder")}
            @input=${B=>R(B.target.value)}
            aria-label=${y("fulfill.filterPlaceholder")}
            style="min-width: 220px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border);"
          />
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${y("fulfill.sortBy")}</span>
            <select
              .value=${c}
              @change=${B=>P(B.target.value)}
              aria-label=${y("fulfill.sortBy")}
            >
              <option value="created_at">${y("fulfill.sortCreatedAt")}</option>
              <option value="draft_no">${y("fulfill.sortDraftNo")}</option>
              <option value="name">${y("fulfill.sortName")}</option>
            </select>
          </label>
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${y("fulfill.sortDir")}</span>
            <select
              .value=${f}
              @change=${B=>F(B.target.value)}
              aria-label=${y("fulfill.sortDir")}
            >
              <option value="desc">${y("fulfill.sortDesc")}</option>
              <option value="asc">${y("fulfill.sortAsc")}</option>
            </select>
          </label>
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${y("fulfill.pageSize")}</span>
            <select
              .value=${String(U)}
              @change=${B=>A(Number(B.target.value)||10)}
              aria-label=${y("fulfill.pageSize")}
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
              <div class="card-title" style="color: var(--danger, #c62828);">${y("common.errorTitle")}</div>
              <div class="card-sub">${n}</div>
              <div style="margin-top: 10px;">
                <button class="btn" @click=${b}>${y("common.retry")}</button>
              </div>
            </div>
          `:$}

      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${y("fulfill.listTitle")}</div>
        <div class="card-sub">${y("fulfill.listSubtitle")}</div>

        ${t&&i.length===0?d`<p class="muted" style="margin-top: 12px;">${y("fulfill.loading")}</p>`:L===0?d`<p class="muted" style="margin-top: 12px;">${y("fulfill.noDrafts")}</p>`:d`
                <div class="muted" style="font-size: 12px; margin-top: 10px;">
                  ${y("fulfill.total",{total:String(L)})}
                </div>
                <div style="overflow-x: auto; margin-top: 8px;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <thead>
                      <tr style="background: var(--bg-secondary, #eee);">
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("fulfill.colDraftNo")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("fulfill.colName")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("fulfill.colSource")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("fulfill.colCreatedAt")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("fulfill.colActions")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${Y.map(B=>d`
                          <tr style=${o===B.id?"background: var(--bg-secondary, #f5f5f5);":""}>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${B.draft_no}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${B.name}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${B.source??"-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${gv(B.created_at)}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border); display: flex; gap: 6px; flex-wrap: wrap;">
                              <button
                                class="btn btn-sm"
                                @click=${()=>x(B.id)}
                                aria-label=${y("fulfill.viewDetail")}
                              >
                                ${y("fulfill.viewDetail")}
                              </button>
                              <button
                                class="btn"
                                style="font-size: 12px; padding: 4px 8px;"
                                ?disabled=${r}
                                @click=${()=>k(B.id)}
                                aria-label=${y("fulfill.confirmAction")}
                              >
                                ${r&&o===B.id?y("fulfill.confirming"):y("fulfill.confirmAction")}
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
                    ?disabled=${z<=1}
                    @click=${()=>I(z-1)}
                    aria-label=${y("common.prev")}
                  >
                    ${y("common.prev")}
                  </button>
                  <span class="muted" style="font-size: 12px;">${y("fulfill.page",{current:String(z),total:String(O)})}</span>
                  <button
                    class="btn btn-sm"
                    ?disabled=${z>=O}
                    @click=${()=>I(z+1)}
                    aria-label=${y("common.next")}
                  >
                    ${y("common.next")}
                  </button>
                </div>
              `}
      </div>

      ${s?d`
            <div class="card" style="grid-column: 1 / -1;" tabindex="-1">
              <div class="card-title">${y("fulfill.detailTitle",{draftNo:s.draft_no})}</div>
              <div class="card-sub">${s.name}</div>
              <div style="margin-top: 8px; display: flex; gap: 8px;">
                <button class="btn btn-sm" @click=${S}>${y("fulfill.closeDetail")}</button>
                <button
                  class="btn"
                  style="background: var(--accent); color: var(--bg);"
                  ?disabled=${r}
                  @click=${()=>k(s.id)}
                >
                  ${y(r?"fulfill.confirming":"fulfill.confirmAction")}
                </button>
              </div>
              <div style="overflow-x: auto; margin-top: 12px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                  <thead>
                    <tr style="background: var(--bg-secondary, #eee);">
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">#</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("fulfill.lineProduct")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("fulfill.lineSpec")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("fulfill.lineQty")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("fulfill.lineCode")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("fulfill.lineQuoteName")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("fulfill.linePrice")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("fulfill.lineAmount")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("fulfill.lineAvailable")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("fulfill.lineShortfall")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("fulfill.lineIsShortage")}</th>
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
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${B.is_shortage?y("common.yes"):y("common.no")}</td>
                        </tr>
                      `)}
                  </tbody>
                </table>
              </div>
            </div>
          `:$}

      ${a?d`
            <div class="card" style="grid-column: 1 / -1; border-color: var(--success, #2e7d32);" role="status" aria-live="polite">
              <div class="card-title" style="color: var(--success, #2e7d32);">${y("fulfill.confirmTitle")}</div>
              ${a.order_id?d`<p style="margin: 0 0 4px 0; font-weight: 600;">${y("fulfill.orderId")}: ${a.order_id}</p>`:$}
              <div class="card-sub">${a.message??""}</div>
            </div>
          `:$}
    </section>
  `}function vv(e,t,n,i){const s=i==="asc"?1:-1;if(n==="uploaded_at"){const o=e.uploaded_at?new Date(e.uploaded_at).getTime():0,r=t.uploaded_at?new Date(t.uploaded_at).getTime():0;return(o-r)*s}return n==="shortfall"?(Number(e.shortfall??0)-Number(t.shortfall??0))*s:n==="count"?(Number(e.count??0)-Number(t.count??0))*s:(e.product_name??"").localeCompare(t.product_name??"")*s}function yv(e){const{loading:t,error:n,suggestions:i,selectedKeys:s,approvedKeys:o,approveBusy:r,approveResult:a,filterQuery:l,sortBy:c,sortDir:f,page:u,pageSize:p,onRefresh:b,onToggleSelect:x,onApprove:k,onApproveBatch:S,onFilterQueryChange:R,onSortByChange:P,onSortDirChange:F,onPageChange:I,onPageSizeChange:A}=e,g=i.filter(T=>!o.includes(_e(T))),_=l.trim().toLowerCase(),C=_?g.filter(T=>`${T.product_name??""}
${T.specification??""}
${T.code??""}
${T.product_key??""}`.toLowerCase().includes(_)):g,L=[...C].sort((T,H)=>vv(T,H,c,f)),U=L.length,O=Math.max(1,p||10),z=Math.max(1,Math.ceil(U/O)),K=Math.min(Math.max(1,u),z),Y=(K-1)*O,B=L.slice(Y,Y+O),ee=C.filter(T=>s.includes(_e(T))).length,ce=C.length>0&&C.every(T=>s.includes(_e(T)));return d`
    <section class="grid grid-cols-2" aria-label=${y("tabs.sessions")}>
      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${y("procurement.title")}</div>
        <div class="card-sub">${y("procurement.subtitle")}</div>
        <div style="margin-top: 12px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <button class="btn" ?disabled=${t} @click=${b} aria-label=${y("procurement.refreshList")}>
            ${y(t?"procurement.loading":"procurement.refreshList")}
          </button>
          <input
            type="search"
            .value=${l}
            placeholder=${y("procurement.filterPlaceholder")}
            @input=${T=>R(T.target.value)}
            aria-label=${y("procurement.filterPlaceholder")}
            style="min-width: 240px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border);"
          />
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${y("procurement.sortBy")}</span>
            <select
              .value=${c}
              @change=${T=>P(T.target.value)}
              aria-label=${y("procurement.sortBy")}
            >
              <option value="uploaded_at">${y("procurement.sortUploadedAt")}</option>
              <option value="shortfall">${y("procurement.sortShortfall")}</option>
              <option value="count">${y("procurement.sortCount")}</option>
              <option value="product_name">${y("procurement.sortProduct")}</option>
            </select>
          </label>
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${y("procurement.sortDir")}</span>
            <select
              .value=${f}
              @change=${T=>F(T.target.value)}
              aria-label=${y("procurement.sortDir")}
            >
              <option value="desc">${y("procurement.sortDesc")}</option>
              <option value="asc">${y("procurement.sortAsc")}</option>
            </select>
          </label>
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${y("procurement.pageSize")}</span>
            <select
              .value=${String(O)}
              @change=${T=>A(Number(T.target.value)||10)}
              aria-label=${y("procurement.pageSize")}
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
              <div class="card-title" style="color: var(--danger, #c62828);">${y("common.errorTitle")}</div>
              <div class="card-sub">${n}</div>
              <div style="margin-top: 10px;">
                <button class="btn" @click=${b}>${y("common.retry")}</button>
              </div>
            </div>
          `:$}

      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${y("procurement.listTitle")}</div>
        <div class="card-sub">${y("procurement.listHint")}</div>

        ${ee>0?d`
              <div style="margin-top: 12px;">
                <button
                  class="btn"
                  style="font-size: 12px;"
                  ?disabled=${r}
                  @click=${S}
                  aria-label=${y("procurement.batchApprove")}
                >
                  ${r?y("procurement.approving"):`${y("procurement.batchApprove")} (${ee})`}
                </button>
              </div>
            `:$}

        ${t&&i.length===0?d`<p class="muted" style="margin-top: 12px;">${y("procurement.loading")}</p>`:C.length===0?d`<p class="muted" style="margin-top: 12px;">${i.length===0?y("procurement.noSuggestions"):y("procurement.noPending")}</p>`:d`
                <div class="muted" style="font-size: 12px; margin-top: 10px;">
                  ${y("procurement.total",{total:String(U)})}
                </div>
                <div style="overflow-x: auto; margin-top: 8px;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <thead>
                      <tr style="background: var(--bg-secondary, #eee);">
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border); width: 36px;">
                          <input
                            type="checkbox"
                            .checked=${ce}
                            .indeterminate=${ee>0&&ee<C.length}
                            aria-label=${y("procurement.selectAll")}
                            @change=${()=>{ce?C.forEach(T=>x(_e(T))):C.forEach(T=>{const H=_e(T);s.includes(H)||x(H)})}}
                          />
                        </th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("procurement.colProduct")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("procurement.colSpec")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("procurement.colShortfall")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("procurement.colCode")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("procurement.colCount")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${y("procurement.colActions")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${B.map(T=>d`
                          <tr>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">
                              <input
                                type="checkbox"
                                .checked=${s.includes(_e(T))}
                                aria-label=${y("procurement.selectItem")}
                                @change=${()=>x(_e(T))}
                              />
                            </td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${T.product_name??"-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${T.specification??"-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${T.shortfall??0}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${T.code??"-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${T.count??0}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">
                              <button
                                class="btn"
                                style="font-size: 12px; padding: 4px 8px;"
                                ?disabled=${r}
                                @click=${()=>k(T)}
                                aria-label=${y("procurement.approveSingle")}
                              >
                                ${y(r?"procurement.approving":"procurement.approveSingle")}
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
                    @click=${()=>I(K-1)}
                    aria-label=${y("common.prev")}
                  >
                    ${y("common.prev")}
                  </button>
                  <span class="muted" style="font-size: 12px;">${y("procurement.page",{current:String(K),total:String(z)})}</span>
                  <button
                    class="btn btn-sm"
                    ?disabled=${K>=z}
                    @click=${()=>I(K+1)}
                    aria-label=${y("common.next")}
                  >
                    ${y("common.next")}
                  </button>
                </div>
              `}
      </div>

      ${a?d`
            <div class="card" style="grid-column: 1 / -1;" role="status" aria-live="polite">
              <div class="card-sub">${a.approved_count!=null?`${y("procurement.approvedCount",{count:String(a.approved_count)})} `:""}${a.message??""}</div>
            </div>
          `:$}
    </section>
  `}function bv(e){const t=e.status&&typeof e.status=="object"?e.status.securityAudit:null,n=(t==null?void 0:t.summary)??null,i=(n==null?void 0:n.critical)??0,s=(n==null?void 0:n.warn)??0,o=(n==null?void 0:n.info)??0,r=i>0?"danger":s>0?"warn":"success",a=i>0?`${i} critical`:s>0?`${s} warnings`:"No critical issues";return d`
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
                      <pre class="code-block">${ng(l.payload)}</pre>
                    </div>
                  </div>
                `)}
            </div>
          `}
    </section>
  `}function wv(e){const t=Math.max(0,e),n=Math.floor(t/1e3);if(n<60)return`${n}s`;const i=Math.floor(n/60);return i<60?`${i}m`:`${Math.floor(i/60)}h`}function at(e,t){return t?d`<div class="exec-approval-meta-row"><span>${e}</span><span>${t}</span></div>`:$}function $v(e){const t=e.execApprovalQueue[0];if(!t)return $;const n=t.request,i=t.expiresAtMs-Date.now(),s=i>0?`expires in ${wv(i)}`:"expired",o=e.execApprovalQueue.length;return d`
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
          ${at("Host",n.host)}
          ${at("Agent",n.agentId)}
          ${at("Session",n.sessionKey)}
          ${at("CWD",n.cwd)}
          ${at("Resolved",n.resolvedPath)}
          ${at("Security",n.security)}
          ${at("Ask",n.ask)}
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
  `}function xv(e){const{pendingGatewayUrl:t}=e;return t?d`
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
  `:$}const va=["trace","debug","info","warn","error","fatal"];function kv(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleTimeString()}function Sv(e,t){return t?[e.message,e.subsystem,e.raw].filter(Boolean).join(" ").toLowerCase().includes(t):!0}function Av(e){const t=e.filterText.trim().toLowerCase(),n=va.some(o=>!e.levelFilters[o]),i=e.entries.filter(o=>o.level&&!e.levelFilters[o.level]?!1:Sv(o,t)),s=t||n?"filtered":"visible";return d`
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
                  <div class="log-time mono">${kv(o.time)}</div>
                  <div class="log-level ${o.level??""}">${o.level??""}</div>
                  <div class="log-subsystem mono">${o.subsystem??""}</div>
                  <div class="log-message mono">${o.message??o.raw}</div>
                </div>
              `)}
      </div>
    </section>
  `}function _v(e){return d`
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
        ${e.stats?Cv(e.stats):e.loading?$:d`<div class="muted">暂无统计</div>`}
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
          ${e.list.length===0?d`<div class="muted">暂无无货产品记录。</div>`:e.list.slice(0,50).map(t=>Tv(t,e.onDelete))}
        </div>
        ${e.list.length>50?d`<div class="muted" style="margin-top: 8px;">共 ${e.list.length} 个无货产品，仅展示前 50 个</div>`:$}
      </div>
      <div class="row" style="margin-top: 24px; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">按文件</div>
          <div class="list" style="margin-top: 8px;">
            ${e.byFile.length===0?d`<div class="muted">暂无</div>`:e.byFile.slice(0,10).map(t=>Ev(t))}
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">按时间（最近 30 天）</div>
          <div class="list" style="margin-top: 8px;">
            ${e.byTime.length===0?d`<div class="muted">暂无</div>`:e.byTime.slice(0,10).map(t=>Rv(t))}
          </div>
        </div>
      </div>
    </section>
  `}function Cv(e){return[{label:"总记录数",value:e.total_records},{label:"无货产品数",value:e.out_of_stock_count},{label:"今日新增",value:e.today_count},{label:"被报无货≥2 次",value:e.notified_count},{label:"已发邮件产品数",value:e.email_sent_product_count}].map(n=>d`
      <div class="card stat-card" style="min-width: 100px;">
        <div class="stat-value">${n.value}</div>
        <div class="stat-label">${n.label}</div>
      </div>
    `)}function Tv(e,t){const n=e.product_name??"",i=e.specification??"",s=e.unit??"",o=e.quantity??"",r=e.count??1,l=(e.email_sent_count??0)>0||e.email_status==="sent"?"已发送":"未发",c=e.product_key??"";return d`
    <div class="list-item" style="display: flex; justify-content: space-between; align-items: center;">
      <div class="list-main">
        <div class="list-title">${n} ${i}</div>
        <div class="list-sub">数量: ${String(o)} ${s} · 被报无货 ${r} 次 · 邮件: ${l}</div>
      </div>
      ${t&&c?d`<button class="btn" style="flex-shrink: 0;" title="删除该无货产品" @click=${()=>t(c)}>删除</button>`:$}
    </div>
  `}function Ev(e){const t=e.file_name??"",n=e.total_records??0,i=e.uploaded_at?String(e.uploaded_at).length>19?String(e.uploaded_at).slice(0,10)+" "+String(e.uploaded_at).slice(11,19):String(e.uploaded_at):"";return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${t}</div>
        <div class="list-sub">记录数: ${n}${i?` · ${i}`:""}</div>
      </div>
    </div>
  `}function Rv(e){return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.date??""}</div>
        <div class="list-sub">新增: ${e.count??0}</div>
      </div>
    </div>
  `}function Lv(e){return d`
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
        ${e.stats?Iv(e.stats):e.loading?$:d`<div class="muted">暂无统计</div>`}
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
          ${e.list.length===0?d`<div class="muted">暂无缺货产品记录。</div>`:e.list.slice(0,50).map(t=>Mv(t,e.onDelete))}
        </div>
        ${e.list.length>50?d`<div class="muted" style="margin-top: 8px;">共 ${e.list.length} 个缺货产品，仅展示前 50 个</div>`:$}
      </div>
      <div class="row" style="margin-top: 24px; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">按文件</div>
          <div class="list" style="margin-top: 8px;">
            ${e.byFile.length===0?d`<div class="muted">暂无</div>`:e.byFile.slice(0,10).map(t=>Pv(t))}
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">按时间（最近 30 天）</div>
          <div class="list" style="margin-top: 8px;">
            ${e.byTime.length===0?d`<div class="muted">暂无</div>`:e.byTime.slice(0,10).map(t=>Dv(t))}
          </div>
        </div>
      </div>
    </section>
  `}function Iv(e){return[{label:"总记录数",value:e.total_records},{label:"缺货产品数",value:e.shortage_product_count},{label:"今日新增",value:e.today_count},{label:"被报缺货≥2 次",value:e.reported_ge2_count}].map(n=>d`
      <div class="card stat-card" style="min-width: 100px;">
        <div class="stat-value">${n.value}</div>
        <div class="stat-label">${n.label}</div>
      </div>
    `)}function Mv(e,t){const n=e.product_name??"",i=e.specification??"",s=e.quantity??0,o=e.available_qty??0,r=e.shortfall??0,a=e.count??1,l=e.product_key??"";return d`
    <div class="list-item" style="display: flex; justify-content: space-between; align-items: center;">
      <div class="list-main">
        <div class="list-title">${n} ${i?` · ${i}`:""}</div>
        <div class="list-sub">需求: ${s} · 供给: ${o} · 差异: ${r} · 被报缺货 ${a} 次</div>
      </div>
      ${t&&l?d`<button class="btn" style="flex-shrink: 0;" title="删除该缺货产品" @click=${()=>t(l)}>删除</button>`:$}
    </div>
  `}function Pv(e){const t=e.file_name??"",n=e.total_records??0,i=e.uploaded_at?String(e.uploaded_at).length>19?String(e.uploaded_at).slice(0,10)+" "+String(e.uploaded_at).slice(11,19):String(e.uploaded_at):"";return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${t}</div>
        <div class="list-sub">记录数: ${n}${i?` · ${i}`:""}</div>
      </div>
    </div>
  `}function Dv(e){return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.date??""}</div>
        <div class="list-sub">新增: ${e.count??0}</div>
      </div>
    </div>
  `}const Xe="__defaults__",ya=[{value:"deny",label:"Deny"},{value:"allowlist",label:"Allowlist"},{value:"full",label:"Full"}],Fv=[{value:"off",label:"Off"},{value:"on-miss",label:"On miss"},{value:"always",label:"Always"}];function ba(e){return e==="allowlist"||e==="full"||e==="deny"?e:"deny"}function Nv(e){return e==="always"||e==="off"||e==="on-miss"?e:"on-miss"}function Ov(e){const t=(e==null?void 0:e.defaults)??{};return{security:ba(t.security),ask:Nv(t.ask),askFallback:ba(t.askFallback??"deny"),autoAllowSkills:!!(t.autoAllowSkills??!1)}}function Bv(e){const t=(e==null?void 0:e.agents)??{},n=Array.isArray(t.list)?t.list:[],i=[];return n.forEach(s=>{if(!s||typeof s!="object")return;const o=s,r=typeof o.id=="string"?o.id.trim():"";if(!r)return;const a=typeof o.name=="string"?o.name.trim():void 0,l=o.default===!0;i.push({id:r,name:a||void 0,isDefault:l})}),i}function Uv(e,t){const n=Bv(e),i=Object.keys((t==null?void 0:t.agents)??{}),s=new Map;n.forEach(r=>s.set(r.id,r)),i.forEach(r=>{s.has(r)||s.set(r,{id:r})});const o=Array.from(s.values());return o.length===0&&o.push({id:"main",isDefault:!0}),o.sort((r,a)=>{var f,u;if(r.isDefault&&!a.isDefault)return-1;if(!r.isDefault&&a.isDefault)return 1;const l=(f=r.name)!=null&&f.trim()?r.name:r.id,c=(u=a.name)!=null&&u.trim()?a.name:a.id;return l.localeCompare(c)}),o}function zv(e,t){return e===Xe?Xe:e&&t.some(n=>n.id===e)?e:Xe}function Kv(e){var u;const t=e.execApprovalsForm??((u=e.execApprovalsSnapshot)==null?void 0:u.file)??null,n=!!t,i=Ov(t),s=Uv(e.configForm,t),o=Qv(e.nodes),r=e.execApprovalsTarget;let a=r==="node"&&e.execApprovalsTargetNodeId?e.execApprovalsTargetNodeId:null;r==="node"&&a&&!o.some(p=>p.id===a)&&(a=null);const l=zv(e.execApprovalsSelectedAgent,s),c=l!==Xe?((t==null?void 0:t.agents)??{})[l]??null:null,f=Array.isArray(c==null?void 0:c.allowlist)?c.allowlist??[]:[];return{ready:n,disabled:e.execApprovalsSaving||e.execApprovalsLoading,dirty:e.execApprovalsDirty,loading:e.execApprovalsLoading,saving:e.execApprovalsSaving,form:t,defaults:i,selectedScope:l,selectedAgent:c,agents:s,allowlist:f,target:r,targetNodeId:a,targetNodes:o,onSelectScope:e.onExecApprovalsSelectAgent,onSelectTarget:e.onExecApprovalsTargetChange,onPatch:e.onExecApprovalsPatch,onRemove:e.onExecApprovalsRemove,onLoad:e.onLoadExecApprovals,onSave:e.onSaveExecApprovals}}function Hv(e){const t=e.ready,n=e.target!=="node"||!!e.targetNodeId;return d`
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

      ${jv(e)}

      ${t?d`
            ${qv(e)}
            ${Wv(e)}
            ${e.selectedScope===Xe?$:Gv(e)}
          `:d`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load exec approvals to edit allowlists.</div>
            <button class="btn" ?disabled=${e.loading||!n} @click=${e.onLoad}>
              ${e.loading?"Loading…":"Load approvals"}
            </button>
          </div>`}
    </section>
  `}function jv(e){const t=e.targetNodes.length>0,n=e.targetNodeId??"";return d`
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
  `}function qv(e){return d`
    <div class="row" style="margin-top: 12px; gap: 8px; flex-wrap: wrap;">
      <span class="label">Scope</span>
      <div class="row" style="gap: 8px; flex-wrap: wrap;">
        <button
          class="btn btn--sm ${e.selectedScope===Xe?"active":""}"
          @click=${()=>e.onSelectScope(Xe)}
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
  `}function Wv(e){const t=e.selectedScope===Xe,n=e.defaults,i=e.selectedAgent??{},s=t?["defaults"]:["agents",e.selectedScope],o=typeof i.security=="string"?i.security:void 0,r=typeof i.ask=="string"?i.ask:void 0,a=typeof i.askFallback=="string"?i.askFallback:void 0,l=t?n.security:o??"__default__",c=t?n.ask:r??"__default__",f=t?n.askFallback:a??"__default__",u=typeof i.autoAllowSkills=="boolean"?i.autoAllowSkills:void 0,p=u??n.autoAllowSkills,b=u==null;return d`
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
              ${Fv.map(x=>d`<option
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
  `}function Gv(e){const t=["agents",e.selectedScope,"allowlist"],n=e.allowlist;return d`
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
            `:n.map((i,s)=>Vv(e,i,s))}
    </div>
  `}function Vv(e,t,n){var r;const i=t.lastUsedAt?wt(t.lastUsedAt):"never",s=t.lastUsedCommand?os(t.lastUsedCommand,120):null,o=t.lastResolvedPath?os(t.lastResolvedPath,120):null;return d`
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
  `}function Qv(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(a=>String(a)==="system.execApprovals.get"||String(a)==="system.execApprovals.set"))continue;const o=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!o)continue;const r=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():o;t.push({id:o,label:r===o?o:`${r} · ${o}`})}return t.sort((n,i)=>n.label.localeCompare(i.label)),t}function Jv(e){const t=ty(e),n=Kv(e);return d`
    ${Hv(n)}
    ${ny(t)}
    ${Yv(e)}
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
              `:e.nodes.map(i=>ry(i))}
      </div>
    </section>
  `}function Yv(e){const t=e.devicesList??{pending:[],paired:[]},n=Array.isArray(t.pending)?t.pending:[],i=Array.isArray(t.paired)?t.paired:[];return d`
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
              ${n.map(s=>Xv(s,e))}
            `:$}
        ${i.length>0?d`
              <div class="muted" style="margin-top: 12px; margin-bottom: 8px;">Paired</div>
              ${i.map(s=>Zv(s,e))}
            `:$}
        ${n.length===0&&i.length===0?d`
                <div class="muted">No paired devices.</div>
              `:$}
      </div>
    </section>
  `}function Xv(e,t){var a,l;const n=((a=e.displayName)==null?void 0:a.trim())||e.deviceId,i=typeof e.ts=="number"?wt(e.ts):"n/a",s=(l=e.role)!=null&&l.trim()?`role: ${e.role}`:"role: -",o=e.isRepair?" · repair":"",r=e.remoteIp?` · ${e.remoteIp}`:"";return d`
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
  `}function Zv(e,t){var a;const n=((a=e.displayName)==null?void 0:a.trim())||e.deviceId,i=e.remoteIp?` · ${e.remoteIp}`:"",s=`roles: ${ss(e.roles)}`,o=`scopes: ${ss(e.scopes)}`,r=Array.isArray(e.tokens)?e.tokens:[];return d`
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
                ${r.map(l=>ey(e.deviceId,l,t))}
              </div>
            `}
      </div>
    </div>
  `}function ey(e,t,n){const i=t.revokedAtMs?"revoked":"active",s=`scopes: ${ss(t.scopes)}`,o=wt(t.rotatedAtMs??t.createdAtMs??t.lastUsedAtMs??null);return d`
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
  `}function ty(e){const t=e.configForm,n=sy(e.nodes),{defaultBinding:i,agents:s}=oy(t),o=!!t,r=e.configSaving||e.configFormMode==="raw";return{ready:o,disabled:r,configDirty:e.configDirty,configLoading:e.configLoading,configSaving:e.configSaving,defaultBinding:i,agents:s,nodes:n,onBindDefault:e.onBindDefault,onBindAgent:e.onBindAgent,onSave:e.onSaveBindings,onLoadConfig:e.onLoadConfig,formMode:e.configFormMode}}function ny(e){const t=e.nodes.length>0,n=e.defaultBinding??"";return d`
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
                    `:e.agents.map(i=>iy(i,e))}
            </div>
          `:d`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load config to edit bindings.</div>
            <button class="btn" ?disabled=${e.configLoading} @click=${e.onLoadConfig}>
              ${e.configLoading?"Loading…":"Load config"}
            </button>
          </div>`}
    </section>
  `}function iy(e,t){var o;const n=e.binding??"__default__",i=(o=e.name)!=null&&o.trim()?`${e.name} (${e.id})`:e.id,s=t.nodes.length>0;return d`
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
  `}function sy(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(a=>String(a)==="system.run"))continue;const o=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!o)continue;const r=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():o;t.push({id:o,label:r===o?o:`${r} · ${o}`})}return t.sort((n,i)=>n.label.localeCompare(i.label)),t}function oy(e){const t={id:"main",name:void 0,index:0,isDefault:!0,binding:null};if(!e||typeof e!="object")return{defaultBinding:null,agents:[t]};const i=(e.tools??{}).exec??{},s=typeof i.node=="string"&&i.node.trim()?i.node.trim():null,o=e.agents??{},r=Array.isArray(o.list)?o.list:[];if(r.length===0)return{defaultBinding:s,agents:[t]};const a=[];return r.forEach((l,c)=>{if(!l||typeof l!="object")return;const f=l,u=typeof f.id=="string"?f.id.trim():"";if(!u)return;const p=typeof f.name=="string"?f.name.trim():void 0,b=f.default===!0,k=(f.tools??{}).exec??{},S=typeof k.node=="string"&&k.node.trim()?k.node.trim():null;a.push({id:u,name:p||void 0,index:c,isDefault:b,binding:S})}),a.length===0&&a.push(t),{defaultBinding:s,agents:a}}function ry(e){const t=!!e.connected,n=!!e.paired,i=typeof e.displayName=="string"&&e.displayName.trim()||(typeof e.nodeId=="string"?e.nodeId:"unknown"),s=Array.isArray(e.caps)?e.caps:[],o=Array.isArray(e.commands)?e.commands:[];return d`
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
  `}function ay(e){var c,f;const t=(c=e.hello)==null?void 0:c.snapshot,n=t!=null&&t.uptimeMs?Ua(t.uptimeMs):y("common.na"),i=(f=t==null?void 0:t.policy)!=null&&f.tickIntervalMs?`${t.policy.tickIntervalMs}ms`:y("common.na"),o=(t==null?void 0:t.authMode)==="trusted-proxy",r=(()=>{if(e.connected||!e.lastError)return null;const u=e.lastError.toLowerCase();if(!(u.includes("unauthorized")||u.includes("connect failed")))return null;const b=!!e.settings.token.trim(),x=!!e.password.trim();return!b&&!x?d`
        <div class="muted" style="margin-top: 8px">
          ${y("overview.auth.required")}
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
        ${y("overview.auth.failed",{command:"openclaw dashboard --no-open"})}
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
        ${y("overview.insecure.hint",{url:"http://127.0.0.1:18789"})}
        <div style="margin-top: 6px">
          ${y("overview.insecure.stayHttp",{config:"gateway.controlUi.allowInsecureAuth: true"})}
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
          <div class="card-title">${y("overview.health.title")}</div>
          <div class="card-sub">
            ${y("overview.health.subtitle")}
          </div>
        </div>
        <div
          class="pill ${e.connected?"success":"danger"}"
          style="font-weight: 600; min-width: 96px; justify-content: center;"
        >
          ${e.connected?y("common.ok"):y("common.offline")}
        </div>
      </div>
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        <div class="card stat-card" style="min-width: 140px;">
          <div class="stat-label">${y("overview.stats.instances")}</div>
          <div class="stat-value">${e.presenceCount}</div>
          <div class="muted">${y("overview.stats.instancesHint")}</div>
        </div>
        <div class="card stat-card" style="min-width: 140px;">
          <div class="stat-label">${y("overview.stats.sessions")}</div>
          <div class="stat-value">${e.sessionsCount??y("common.na")}</div>
          <div class="muted">${y("overview.stats.sessionsHint")}</div>
        </div>
        <div class="card stat-card" style="min-width: 140px;">
          <div class="stat-label">${y("overview.stats.cron")}</div>
          <div class="stat-value">
            ${e.cronEnabled==null?y("common.na"):e.cronEnabled?y("common.enabled"):y("common.disabled")}
          </div>
          <div class="muted">
            ${y("overview.stats.cronNext",{time:Fl(e.cronNext)})}
          </div>
        </div>
      </div>
      ${e.lastError?d`<div class="callout danger" style="margin-top: 12px;">
              <div style="font-weight: 600; margin-bottom: 4px;">
                ${y("overview.health.lastErrorLabel")}
              </div>
              <div>${e.lastError}</div>
            </div>`:d`<div class="muted" style="margin-top: 12px;">
              ${y("overview.health.noError")}
            </div>`}
    </section>

    <section class="grid grid-cols-2">
      <div class="card">
        <div class="card-title">${y("overview.access.title")}</div>
        <div class="card-sub">${y("overview.access.subtitle")}</div>
        <div class="form-grid" style="margin-top: 16px;">
          <label class="field">
            <span>${y("overview.access.wsUrl")}</span>
            <input
              .value=${e.settings.gatewayUrl}
              @input=${u=>{const p=u.target.value;e.onSettingsChange({...e.settings,gatewayUrl:p})}}
              placeholder="ws://100.x.y.z:18789"
            />
          </label>
          ${o?"":d`
                <label class="field">
                  <span>${y("overview.access.token")}</span>
                  <input
                    .value=${e.settings.token}
                    @input=${u=>{const p=u.target.value;e.onSettingsChange({...e.settings,token:p})}}
                    placeholder="JAGENT_GATEWAY_TOKEN"
                  />
                </label>
                <label class="field">
                  <span>${y("overview.access.password")}</span>
                  <input
                    type="password"
                    .value=${e.password}
                    @input=${u=>{const p=u.target.value;e.onPasswordChange(p)}}
                    placeholder="system or shared password"
                  />
                </label>
              `}
          <label class="field">
            <span>${y("overview.access.sessionKey")}</span>
            <input
              .value=${e.settings.sessionKey}
              @input=${u=>{const p=u.target.value;e.onSessionKeyChange(p)}}
            />
          </label>
          <label class="field">
            <span>${y("overview.access.language")}</span>
            <select
              .value=${l}
              @change=${u=>{const p=u.target.value;gn.setLocale(p),e.onSettingsChange({...e.settings,locale:p})}}
            >
              <option value="en">${y("languages.en")}</option>
              <option value="zh-CN">${y("languages.zhCN")}</option>
              <option value="zh-TW">${y("languages.zhTW")}</option>
              <option value="pt-BR">${y("languages.ptBR")}</option>
            </select>
          </label>
        </div>
        <div class="row" style="margin-top: 14px;">
          <button class="btn" @click=${()=>e.onConnect()}>${y("common.connect")}</button>
          <button class="btn" @click=${()=>e.onRefresh()}>${y("common.refresh")}</button>
          <span class="muted">${y(o?"overview.access.trustedProxy":"overview.access.connectHint")}</span>
        </div>
      </div>

      <div class="card">
        <div class="card-title">${y("overview.snapshot.title")}</div>
        <div class="card-sub">${y("overview.snapshot.subtitle")}</div>
        <div class="stat-grid" style="margin-top: 16px;">
          <div class="stat">
            <div class="stat-label">${y("overview.snapshot.status")}</div>
            <div class="stat-value ${e.connected?"ok":"warn"}">
              ${e.connected?y("common.ok"):y("common.offline")}
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">${y("overview.snapshot.uptime")}</div>
            <div class="stat-value">${n}</div>
          </div>
          <div class="stat">
            <div class="stat-label">${y("overview.snapshot.tickInterval")}</div>
            <div class="stat-value">${i}</div>
          </div>
          <div class="stat">
            <div class="stat-label">${y("overview.snapshot.lastChannelsRefresh")}</div>
            <div class="stat-value">
              ${e.lastChannelsRefresh?wt(e.lastChannelsRefresh):y("common.na")}
            </div>
          </div>
        </div>
        ${e.lastError?d`<div class="callout danger" style="margin-top: 14px;">
              <div>${e.lastError}</div>
              ${r??""}
              ${a??""}
            </div>`:d`
                <div class="callout" style="margin-top: 14px">
                  ${y("overview.snapshot.channelsHint")}
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
      <div class="card-title">${y("overview.notes.title")}</div>
      <div class="card-sub">${y("overview.notes.subtitle")}</div>
      <div class="note-grid" style="margin-top: 14px;">
        <div>
          <div class="note-title">${y("overview.notes.tailscaleTitle")}</div>
          <div class="muted">
            ${y("overview.notes.tailscaleText")}
          </div>
        </div>
        <div>
          <div class="note-title">${y("overview.notes.sessionTitle")}</div>
          <div class="muted">${y("overview.notes.sessionText")}</div>
        </div>
        <div>
          <div class="note-title">${y("overview.notes.cronTitle")}</div>
          <div class="muted">${y("overview.notes.cronText")}</div>
        </div>
      </div>
    </section>
  `}function ly(e){var o;const t=((o=e.report)==null?void 0:o.skills)??[],n=e.filter.trim().toLowerCase(),i=n?t.filter(r=>[r.name,r.description,r.source].join(" ").toLowerCase().includes(n)):t,s=Bl(i);return d`
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
                      ${r.skills.map(l=>cy(l,e))}
                    </div>
                  </details>
                `})}
            </div>
          `}
    </section>
  `}function cy(e,t){const n=t.busyKey===e.skillKey,i=t.edits[e.skillKey]??"",s=t.messages[e.skillKey]??null,o=e.install.length>0&&e.missing.bins.length>0,r=!!(e.bundled&&e.source!=="openclaw-bundled"),a=Ul(e),l=zl(e);return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">
          ${e.emoji?`${e.emoji} `:""}${e.name}
        </div>
        <div class="list-sub">${os(e.description,140)}</div>
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
  `}const dy=/^data:/i,uy=/^https?:\/\//i;function fy(e){var a,l;const t=((a=e.agentsList)==null?void 0:a.agents)??[],n=Da(e.sessionKey),i=(n==null?void 0:n.agentId)??((l=e.agentsList)==null?void 0:l.defaultId)??"main",s=t.find(c=>c.id===i),o=s==null?void 0:s.identity,r=(o==null?void 0:o.avatarUrl)??(o==null?void 0:o.avatar);if(r)return dy.test(r)||uy.test(r)?r:o==null?void 0:o.avatarUrl}function py(e){var b,x,k,S,R,P,F,I,A;const t=e.presenceEntries.length,n=((b=e.sessionsResult)==null?void 0:b.count)??null,i=((x=e.cronStatus)==null?void 0:x.nextWakeAtMs)??null,s=e.connected?null:y("chat.disconnected"),o=e.tab==="chat",r=o&&(e.settings.chatFocusMode||e.onboarding),a=e.onboarding?!1:e.settings.chatShowThinking,l=fy(e),c=e.chatAvatarUrl??l??null,f=e.configForm??((k=e.configSnapshot)==null?void 0:k.config),u=Ut(e.basePath??""),p=e.agentsSelectedId??((S=e.agentsList)==null?void 0:S.defaultId)??((F=(P=(R=e.agentsList)==null?void 0:R.agents)==null?void 0:P[0])==null?void 0:F.id)??null;return d`
    <div class="shell ${o?"shell--chat":""} ${r?"shell--chat-focus":""} ${e.settings.navCollapsed?"shell--nav-collapsed":""} ${e.onboarding?"shell--onboarding":""}">
      <header class="topbar">
        <div class="topbar-left">
          <button
            class="nav-collapse-toggle"
            @click=${()=>e.applySettings({...e.settings,navCollapsed:!e.settings.navCollapsed})}
            title="${e.settings.navCollapsed?y("nav.expand"):y("nav.collapse")}"
            aria-label="${e.settings.navCollapsed?y("nav.expand"):y("nav.collapse")}"
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
            <span>${y("common.health")}</span>
            <span class="mono">${e.connected?y("common.ok"):y("common.offline")}</span>
          </div>
          ${Jp(e)}
        </div>
      </header>
      <aside class="nav ${e.settings.navCollapsed?"nav--collapsed":""}">
        ${Qu.map(g=>{const _=e.settings.navGroupsCollapsed[g.label]??!1,C=g.tabs.some(L=>L===e.tab);return d`
            <div class="nav-group ${_&&!C?"nav-group--collapsed":""}">
              <button
                class="nav-label"
                @click=${()=>{const L={...e.settings.navGroupsCollapsed};L[g.label]=!_,e.applySettings({...e.settings,navGroupsCollapsed:L})}}
                aria-expanded=${!_}
              >
                <span class="nav-label__text">${y(`nav.${g.label}`)}</span>
                <span class="nav-label__chevron">${_?"+":"−"}</span>
              </button>
              <div class="nav-group__items">
                ${g.tabs.map(L=>Hp(e,L))}
              </div>
            </div>
          `})}
        <div class="nav-group nav-group--links">
          <div class="nav-label nav-label--static">
            <span class="nav-label__text">${y("common.resources")}</span>
          </div>
          <div class="nav-group__items">
            <a
              class="nav-item nav-item--external"
              href="https://docs.openclaw.ai"
              target="_blank"
              rel="noreferrer"
              title="${y("common.docs")} (opens in new tab)"
            >
              <span class="nav-item__icon" aria-hidden="true">${re.book}</span>
              <span class="nav-item__text">${y("common.docs")}</span>
            </a>
          </div>
        </div>
      </aside>
      <main class="content ${o?"content--chat":""}">
        <section class="content-header">
          <div>
            ${e.tab==="work"?$:d`<div class="page-title">${ds(e.tab)}</div>`}
            ${e.tab==="work"?$:d`<div class="page-sub">${Xu(e.tab)}</div>`}
          </div>
          <div class="page-meta">
            ${e.lastError?d`<div class="pill danger">${e.lastError}</div>`:$}
            ${o?jp(e):$}
          </div>
        </section>

        ${e.tab==="overview"?ay({connected:e.connected,hello:e.hello,settings:e.settings,password:e.password,lastError:e.lastError,presenceCount:t,sessionsCount:n,cronEnabled:((I=e.cronStatus)==null?void 0:I.enabled)??null,cronNext:i,lastChannelsRefresh:e.channelsLastSuccess,oosStats:e.overviewOosStats,shortageStats:e.overviewShortageStats,onSettingsChange:g=>e.applySettings(g),onPasswordChange:g=>e.password=g,onSessionKeyChange:g=>{e.sessionKey=g,e.chatMessage="",e.resetToolStream(),e.applySettings({...e.settings,sessionKey:g,lastActiveSessionKey:g}),e.loadAssistantIdentity()},onConnect:()=>e.connect(),onRefresh:()=>e.loadOverview()}):$}

        ${e.tab==="channels"?Fg({loading:e.bkLoading,saving:e.bkSaving,error:e.bkError,content:e.bkContent,lastSuccessAt:e.bkLastSuccess,dependentFiles:e.bkDependentFiles,onReload:()=>Ba(e),onSave:g=>Fd(e,g),onContentChange:g=>e.bkContent=g}):$}

        ${e.tab==="instances"?d`
                ${_v({loading:e.oosLoading,error:e.oosError,stats:e.oosStats,list:e.oosList,byFile:e.oosByFile,byTime:e.oosByTime,db:e.oosDb??void 0,onRefresh:()=>ui(e),onDelete:g=>Ou(e,g),showAddForm:e.oosShowAddForm,onOpenAddForm:()=>e.oosShowAddForm=!0,onCloseAddForm:()=>e.oosShowAddForm=!1,onAdd:async g=>{const _=await Bu(e,g);return _&&(e.oosShowAddForm=!1),_}})}
                ${Lv({loading:e.shortageLoading,error:e.shortageError,stats:e.shortageStats,list:e.shortageList,byFile:e.shortageByFile,byTime:e.shortageByTime,db:e.shortageDb??void 0,onRefresh:()=>fi(e),onDelete:g=>zu(e,g),showAddForm:e.shortageShowAddForm,onOpenAddForm:()=>e.shortageShowAddForm=!0,onCloseAddForm:()=>e.shortageShowAddForm=!1,onAdd:async g=>{const _=await Ku(e,g);return _&&(e.shortageShowAddForm=!1),_}})}
              `:$}

        ${e.tab==="sessions"?yv({basePath:e.basePath,loading:e.procurementLoading,error:e.procurementError,suggestions:e.procurementSuggestions,selectedKeys:e.procurementSelectedKeys,approvedKeys:e.procurementApprovedKeys,approveBusy:e.procurementApproveBusy,approveResult:e.procurementApproveResult,filterQuery:e.procurementFilterQuery,sortBy:e.procurementSortBy,sortDir:e.procurementSortDir,page:e.procurementPage,pageSize:e.procurementPageSize,onRefresh:()=>(e.procurementPage=1,e.loadProcurementSuggestions()),onToggleSelect:g=>{e.procurementSelectedKeys.includes(g)?e.procurementSelectedKeys=e.procurementSelectedKeys.filter(_=>_!==g):e.procurementSelectedKeys=[...e.procurementSelectedKeys,g]},onApprove:g=>{if(typeof window<"u"&&!window.confirm(y("procurement.approveConfirm")))return;const _=[{product_key:g.product_key,product_name:g.product_name,specification:g.specification,shortfall:g.shortfall,code:g.code}];cr(e,_).then(C=>{C&&(C.approved_count??0)>0&&(e.procurementApprovedKeys=[...e.procurementApprovedKeys,_e(g)])})},onApproveBatch:()=>{const g=e.procurementSuggestions.filter(C=>e.procurementSelectedKeys.includes(_e(C)));if(g.length===0||typeof window<"u"&&!window.confirm(y("procurement.approveBatchConfirm",{count:String(g.length)})))return;const _=g.map(C=>({product_key:C.product_key,product_name:C.product_name,specification:C.specification,shortfall:C.shortfall,code:C.code}));cr(e,_).then(C=>{if(C&&(C.approved_count??0)>0){const L=g.map(U=>_e(U));e.procurementApprovedKeys=[...e.procurementApprovedKeys,...L],e.procurementSelectedKeys=e.procurementSelectedKeys.filter(U=>!L.includes(U))}})},onFilterQueryChange:g=>{e.procurementFilterQuery=g,e.procurementPage=1},onSortByChange:g=>{e.procurementSortBy=g,e.procurementPage=1},onSortDirChange:g=>{e.procurementSortDir=g,e.procurementPage=1},onPageChange:g=>{e.procurementPage=Math.max(1,g)},onPageSizeChange:g=>{e.procurementPageSize=Math.max(1,g),e.procurementPage=1}}):$}

        ${Dp(e)}

        ${e.tab==="cron"?mv({basePath:e.basePath,loading:e.fulfillDraftsLoading,error:e.fulfillDraftsError,drafts:e.fulfillDrafts,detail:e.fulfillDetail,detailId:e.fulfillDetailId,confirmBusy:e.fulfillConfirmBusy,confirmResult:e.fulfillConfirmResult,filterQuery:e.fulfillFilterQuery,sortBy:e.fulfillSortBy,sortDir:e.fulfillSortDir,page:e.fulfillPage,pageSize:e.fulfillPageSize,onRefresh:()=>(e.fulfillPage=1,e.loadFulfillDrafts()),onSelectDraft:g=>Wd(e,g),onConfirm:g=>{var O;const _=e.fulfillDetailId===g?e.fulfillDetail:null,C=((O=_==null?void 0:_.lines)==null?void 0:O.length)??0,L=((_==null?void 0:_.lines)??[]).reduce((z,K)=>z+Number(K.amount??0),0),U=C>0?y("fulfill.confirmPrompt",{count:String(C),amount:L.toFixed(2)}):y("fulfill.confirmPromptSimple");typeof window<"u"&&window.confirm(U)&&Gd(e,g).then(z=>{z!=null&&z.order_id&&e.loadProcurementSuggestions()})},onClearDetail:()=>{e.fulfillDetail=null,e.fulfillDetailId=null,e.fulfillConfirmResult=null},onFilterQueryChange:g=>{e.fulfillFilterQuery=g,e.fulfillPage=1},onSortByChange:g=>{e.fulfillSortBy=g,e.fulfillPage=1},onSortDirChange:g=>{e.fulfillSortDir=g,e.fulfillPage=1},onPageChange:g=>{e.fulfillPage=Math.max(1,g)},onPageSizeChange:g=>{e.fulfillPageSize=Math.max(1,g),e.fulfillPage=1}}):$}

        ${e.tab==="agents"?Ig({loading:e.agentsLoading,error:e.agentsError,agentsList:e.agentsList,selectedAgentId:p,activePanel:e.agentsPanel,configForm:f,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,channelsLoading:e.channelsLoading,channelsError:e.channelsError,channelsSnapshot:e.channelsSnapshot,channelsLastSuccess:e.channelsLastSuccess,cronLoading:e.cronLoading,cronStatus:e.cronStatus,cronJobs:e.cronJobs,cronError:e.cronError,agentFilesLoading:e.agentFilesLoading,agentFilesError:e.agentFilesError,agentFilesList:e.agentFilesList,agentFileActive:e.agentFileActive,agentFileContents:e.agentFileContents,agentFileDrafts:e.agentFileDrafts,agentFileSaving:e.agentFileSaving,agentIdentityLoading:e.agentIdentityLoading,agentIdentityError:e.agentIdentityError,agentIdentityById:e.agentIdentityById,agentSkillsLoading:e.agentSkillsLoading,agentSkillsReport:e.agentSkillsReport,agentSkillsError:e.agentSkillsError,agentSkillsAgentId:e.agentSkillsAgentId,skillsFilter:e.skillsFilter,onRefresh:async()=>{var _,C;await Ks(e);const g=((C=(_=e.agentsList)==null?void 0:_.agents)==null?void 0:C.map(L=>L.id))??[];g.length>0&&Oa(e,g)},onSelectAgent:g=>{e.agentsSelectedId!==g&&(e.agentsSelectedId=g,e.agentFilesList=null,e.agentFilesError=null,e.agentFilesLoading=!1,e.agentFileActive=null,e.agentFileContents={},e.agentFileDrafts={},e.agentSkillsReport=null,e.agentSkillsError=null,e.agentSkillsAgentId=null,Na(e,g),e.agentsPanel==="files"&&Gi(e,g),e.agentsPanel==="skills"&&jn(e,g))},onSelectPanel:g=>{var _;e.agentsPanel=g,g==="files"&&p&&((_=e.agentFilesList)==null?void 0:_.agentId)!==p&&(e.agentFilesList=null,e.agentFilesError=null,e.agentFileActive=null,e.agentFileContents={},e.agentFileDrafts={},Gi(e,p)),g==="skills"&&p&&jn(e,p),g==="channels"&&ke(e,!1),g==="cron"&&e.loadCron()},onLoadFiles:g=>Gi(e,g),onSelectFile:g=>{e.agentFileActive=g,p&&eg(e,p,g)},onFileDraftChange:(g,_)=>{e.agentFileDrafts={...e.agentFileDrafts,[g]:_}},onFileReset:g=>{const _=e.agentFileContents[g]??"";e.agentFileDrafts={...e.agentFileDrafts,[g]:_}},onFileSave:g=>{if(!p)return;const _=e.agentFileDrafts[g]??e.agentFileContents[g]??"";tg(e,p,g,_)},onToolsProfileChange:(g,_,C)=>{var z;if(!f)return;const L=(z=f.agents)==null?void 0:z.list;if(!Array.isArray(L))return;const U=L.findIndex(K=>K&&typeof K=="object"&&"id"in K&&K.id===g);if(U<0)return;const O=["agents","list",U,"tools"];_?we(e,[...O,"profile"],_):Ke(e,[...O,"profile"]),C&&Ke(e,[...O,"allow"])},onToolsOverridesChange:(g,_,C)=>{var z;if(!f)return;const L=(z=f.agents)==null?void 0:z.list;if(!Array.isArray(L))return;const U=L.findIndex(K=>K&&typeof K=="object"&&"id"in K&&K.id===g);if(U<0)return;const O=["agents","list",U,"tools"];_.length>0?we(e,[...O,"alsoAllow"],_):Ke(e,[...O,"alsoAllow"]),C.length>0?we(e,[...O,"deny"],C):Ke(e,[...O,"deny"])},onConfigReload:()=>Fe(e),onConfigSave:()=>Hn(e),onChannelsRefresh:()=>ke(e,!1),onCronRefresh:()=>e.loadCron(),onSkillsFilterChange:g=>e.skillsFilter=g,onSkillsRefresh:()=>{p&&jn(e,p)},onAgentSkillToggle:(g,_,C)=>{var ce,T,H;if(!f)return;const L=(ce=f.agents)==null?void 0:ce.list;if(!Array.isArray(L))return;const U=L.findIndex(Q=>Q&&typeof Q=="object"&&"id"in Q&&Q.id===g);if(U<0)return;const O=L[U],z=_.trim();if(!z)return;const K=((H=(T=e.agentSkillsReport)==null?void 0:T.skills)==null?void 0:H.map(Q=>Q.name).filter(Boolean))??[],B=(Array.isArray(O.skills)?O.skills.map(Q=>String(Q).trim()).filter(Boolean):void 0)??K,ee=new Set(B);C?ee.add(z):ee.delete(z),we(e,["agents","list",U,"skills"],[...ee])},onAgentSkillsClear:g=>{var L;if(!f)return;const _=(L=f.agents)==null?void 0:L.list;if(!Array.isArray(_))return;const C=_.findIndex(U=>U&&typeof U=="object"&&"id"in U&&U.id===g);C<0||Ke(e,["agents","list",C,"skills"])},onAgentSkillsDisableAll:g=>{var L;if(!f)return;const _=(L=f.agents)==null?void 0:L.list;if(!Array.isArray(_))return;const C=_.findIndex(U=>U&&typeof U=="object"&&"id"in U&&U.id===g);C<0||we(e,["agents","list",C,"skills"],[])},onModelChange:(g,_)=>{var K;if(!f)return;const C=(K=f.agents)==null?void 0:K.list;if(!Array.isArray(C))return;const L=C.findIndex(Y=>Y&&typeof Y=="object"&&"id"in Y&&Y.id===g);if(L<0)return;const U=["agents","list",L,"model"];if(!_){Ke(e,U);return}const O=C[L],z=O==null?void 0:O.model;if(z&&typeof z=="object"&&!Array.isArray(z)){const Y=z.fallbacks,B={primary:_,...Array.isArray(Y)?{fallbacks:Y}:{}};we(e,U,B)}else we(e,U,_)},onModelFallbacksChange:(g,_)=>{var ce;if(!f)return;const C=(ce=f.agents)==null?void 0:ce.list;if(!Array.isArray(C))return;const L=C.findIndex(T=>T&&typeof T=="object"&&"id"in T&&T.id===g);if(L<0)return;const U=["agents","list",L,"model"],O=C[L],z=_.map(T=>T.trim()).filter(Boolean),K=O.model,B=(()=>{if(typeof K=="string")return K.trim()||null;if(K&&typeof K=="object"&&!Array.isArray(K)){const T=K.primary;if(typeof T=="string")return T.trim()||null}return null})();if(z.length===0){B?we(e,U,B):Ke(e,U);return}we(e,U,B?{primary:B,fallbacks:z}:{fallbacks:z})}}):$}

        ${e.tab==="skills"?ly({loading:e.skillsLoading,report:e.skillsReport,error:e.skillsError,filter:e.skillsFilter,edits:e.skillEdits,messages:e.skillMessages,busyKey:e.skillsBusyKey,onFilterChange:g=>e.skillsFilter=g,onRefresh:()=>$n(e,{clearMessages:!0}),onToggle:(g,_)=>Wu(e,g,_),onEdit:(g,_)=>qu(e,g,_),onSaveKey:g=>Gu(e,g),onInstall:(g,_,C)=>Vu(e,g,_,C)}):$}

        ${e.tab==="nodes"?Jv({loading:e.nodesLoading,nodes:e.nodes,devicesLoading:e.devicesLoading,devicesError:e.devicesError,devicesList:e.devicesList,configForm:e.configForm??((A=e.configSnapshot)==null?void 0:A.config),configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,configFormMode:e.configFormMode,execApprovalsLoading:e.execApprovalsLoading,execApprovalsSaving:e.execApprovalsSaving,execApprovalsDirty:e.execApprovalsDirty,execApprovalsSnapshot:e.execApprovalsSnapshot,execApprovalsForm:e.execApprovalsForm,execApprovalsSelectedAgent:e.execApprovalsSelectedAgent,execApprovalsTarget:e.execApprovalsTarget,execApprovalsTargetNodeId:e.execApprovalsTargetNodeId,onRefresh:()=>ci(e),onDevicesRefresh:()=>nt(e),onDeviceApprove:g=>Tu(e,g),onDeviceReject:g=>Eu(e,g),onDeviceRotate:(g,_,C)=>Ru(e,{deviceId:g,role:_,scopes:C}),onDeviceRevoke:(g,_)=>Lu(e,{deviceId:g,role:_}),onLoadConfig:()=>Fe(e),onLoadExecApprovals:()=>{const g=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return Zs(e,g)},onBindDefault:g=>{g?we(e,["tools","exec","node"],g):Ke(e,["tools","exec","node"])},onBindAgent:(g,_)=>{const C=["agents","list",g,"tools","exec","node"];_?we(e,C,_):Ke(e,C)},onSaveBindings:()=>Hn(e),onExecApprovalsTargetChange:(g,_)=>{e.execApprovalsTarget=g,e.execApprovalsTargetNodeId=_,e.execApprovalsSnapshot=null,e.execApprovalsForm=null,e.execApprovalsDirty=!1,e.execApprovalsSelectedAgent=null},onExecApprovalsSelectAgent:g=>{e.execApprovalsSelectedAgent=g},onExecApprovalsPatch:(g,_)=>Fu(e,g,_),onExecApprovalsRemove:g=>Nu(e,g),onSaveExecApprovals:()=>{const g=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return Du(e,g)}}):$}

        ${e.tab==="chat"?Vm({sessionKey:e.sessionKey,onSessionKeyChange:g=>{e.sessionKey=g,e.chatMessage="",e.chatAttachments=[],e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.chatQueue=[],e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:g,lastActiveSessionKey:g}),e.loadAssistantIdentity(),yn(e),ps(e)},thinkingLevel:e.chatThinkingLevel,showThinking:a,loading:e.chatLoading,sending:e.chatSending,compactionStatus:e.compactionStatus,assistantAvatarUrl:c,messages:e.chatMessages,toolMessages:e.chatToolMessages,stream:e.chatStream,streamStartedAt:e.chatStreamStartedAt,draft:e.chatMessage,queue:e.chatQueue,connected:e.connected,canSend:e.connected,disabledReason:s,error:e.lastError,sessions:e.sessionsResult,focusMode:r,onRefresh:()=>(e.resetToolStream(),Promise.all([yn(e),ps(e)])),onToggleFocusMode:()=>{e.onboarding||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})},onChatScroll:g=>e.handleChatScroll(g),onDraftChange:g=>e.chatMessage=g,attachments:e.chatAttachments,onAttachmentsChange:g=>e.chatAttachments=g,uploadedFile:e.chatUploadedFile,onFileSelect:g=>e.handleUploadChatFile(g),onClearUploadedFile:()=>e.clearChatUploadedFile(),composeDragOver:e.chatComposeDragOver,onComposeDragOver:()=>e.setChatComposeDragOver(!0),onComposeDragLeave:()=>e.setChatComposeDragOver(!1),onComposeDrop:g=>e.handleComposeDrop(g),onSend:()=>e.handleSendChat(),canAbort:!!e.chatRunId,onAbort:()=>void e.handleAbortChat(),onQueueRemove:g=>e.removeQueuedMessage(g),onNewSession:()=>e.handleSendChat("/new",{restoreDraft:!0}),showNewMessages:e.chatNewMessagesBelow&&!e.chatManualRefreshInFlight,onScrollToBottom:()=>e.scrollToBottom(),sidebarOpen:e.sidebarOpen,sidebarContent:e.sidebarContent,sidebarError:e.sidebarError,splitRatio:e.splitRatio,onOpenSidebar:g=>e.handleOpenSidebar(g),onCloseSidebar:()=>e.handleCloseSidebar(),onSplitRatioChange:g=>e.handleSplitRatioChange(g),assistantName:e.assistantName,assistantAvatar:e.assistantAvatar}):$}

        ${e.tab==="config"?pv({raw:e.configRaw,originalRaw:e.configRawOriginal,valid:e.configValid,issues:e.configIssues,loading:e.configLoading,saving:e.configSaving,applying:e.configApplying,updating:e.updateRunning,connected:e.connected,schema:e.configSchema,schemaLoading:e.configSchemaLoading,uiHints:e.configUiHints,formMode:e.configFormMode,formValue:e.configForm,originalValue:e.configFormOriginal,searchQuery:e.configSearchQuery,activeSection:e.configActiveSection,activeSubsection:e.configActiveSubsection,onRawChange:g=>{e.configRaw=g},onFormModeChange:g=>e.configFormMode=g,onFormPatch:(g,_)=>we(e,g,_),onSearchChange:g=>e.configSearchQuery=g,onSectionChange:g=>{e.configActiveSection=g,e.configActiveSubsection=null},onSubsectionChange:g=>e.configActiveSubsection=g,onReload:()=>Fe(e),onSave:()=>Hn(e),onApply:()=>ad(e),onUpdate:()=>ld(e)}):$}

        ${e.tab==="debug"?bv({loading:e.debugLoading,status:e.debugStatus,health:e.debugHealth,models:e.debugModels,heartbeat:e.debugHeartbeat,eventLog:e.eventLog,callMethod:e.debugCallMethod,callParams:e.debugCallParams,callResult:e.debugCallResult,callError:e.debugCallError,onCallMethodChange:g=>e.debugCallMethod=g,onCallParamsChange:g=>e.debugCallParams=g,onRefresh:()=>li(e),onCall:()=>Cd(e)}):$}

        ${e.tab==="logs"?Av({loading:e.logsLoading,error:e.logsError,file:e.logsFile,entries:e.logsEntries,filterText:e.logsFilterText,levelFilters:e.logsLevelFilters,autoFollow:e.logsAutoFollow,truncated:e.logsTruncated,onFilterTextChange:g=>e.logsFilterText=g,onLevelToggle:(g,_)=>{e.logsLevelFilters={...e.logsLevelFilters,[g]:_}},onToggleAutoFollow:g=>e.logsAutoFollow=g,onRefresh:()=>Ns(e,{reset:!0}),onExport:(g,_)=>e.exportLogs(g,_),onScroll:g=>e.handleLogsScroll(g)}):$}
      </main>
      ${$v(e)}
      ${xv(e)}
    </div>
  `}var gy=Object.defineProperty,hy=Object.getOwnPropertyDescriptor,m=(e,t,n,i)=>{for(var s=i>1?void 0:i?hy(t,n):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(s=(i?r(t,n,s):r(s))||s);return i&&s&&gy(t,n,s),s};const ns=oo({});function my(){if(!window.location.search)return!1;const t=new URLSearchParams(window.location.search).get("onboarding");if(!t)return!1;const n=t.trim().toLowerCase();return n==="1"||n==="true"||n==="yes"||n==="on"}let h=class extends Pt{constructor(){super(),this.i18nController=new Zc(this),this.settings=Zu(),this.password="",this.tab="chat",this.onboarding=my(),this.connected=!1,this.theme=this.settings.theme??"system",this.themeResolved="dark",this.hello=null,this.lastError=null,this.eventLog=[],this.eventLogBuffer=[],this.toolStreamSyncTimer=null,this.sidebarCloseTimer=null,this.assistantName=ns.name,this.assistantAvatar=ns.avatar,this.assistantAgentId=ns.agentId??null,this.sessionKey=this.settings.sessionKey,this.chatLoading=!1,this.chatSending=!1,this.chatMessage="",this.chatMessages=[],this.chatToolMessages=[],this.chatStream=null,this.chatStreamStartedAt=null,this.chatRunId=null,this.compactionStatus=null,this.chatAvatarUrl=null,this.chatThinkingLevel=null,this.chatQueue=[],this.chatAttachments=[],this.chatUploadedFile=null,this.chatComposeDragOver=!1,this.chatManualRefreshInFlight=!1,this.sidebarOpen=!1,this.sidebarContent=null,this.sidebarError=null,this.splitRatio=this.settings.splitRatio,this.nodesLoading=!1,this.nodes=[],this.devicesLoading=!1,this.devicesError=null,this.devicesList=null,this.execApprovalsLoading=!1,this.execApprovalsSaving=!1,this.execApprovalsDirty=!1,this.execApprovalsSnapshot=null,this.execApprovalsForm=null,this.execApprovalsSelectedAgent=null,this.execApprovalsTarget="gateway",this.execApprovalsTargetNodeId=null,this.execApprovalQueue=[],this.execApprovalBusy=!1,this.execApprovalError=null,this.pendingGatewayUrl=null,this.configLoading=!1,this.configRaw=`{
}
`,this.configRawOriginal="",this.configValid=null,this.configIssues=[],this.configSaving=!1,this.configApplying=!1,this.updateRunning=!1,this.applySessionKey=this.settings.lastActiveSessionKey,this.configSnapshot=null,this.configSchema=null,this.configSchemaVersion=null,this.configSchemaLoading=!1,this.configUiHints={},this.configForm=null,this.configFormOriginal=null,this.configFormDirty=!1,this.configFormMode="form",this.configSearchQuery="",this.configActiveSection=null,this.configActiveSubsection=null,this.channelsLoading=!1,this.channelsSnapshot=null,this.channelsError=null,this.channelsLastSuccess=null,this.bkContent="",this.bkLoading=!1,this.bkError=null,this.bkSaving=!1,this.bkLastSuccess=null,this.bkDependentFiles=null,this.whatsappLoginMessage=null,this.whatsappLoginQrDataUrl=null,this.whatsappLoginConnected=null,this.whatsappBusy=!1,this.nostrProfileFormState=null,this.nostrProfileAccountId=null,this.presenceLoading=!1,this.presenceEntries=[],this.presenceError=null,this.presenceStatus=null,this.oosLoading=!1,this.oosError=null,this.oosStats=null,this.oosList=[],this.oosByFile=[],this.oosByTime=[],this.oosShowAddForm=!1,this.oosDb=null,this.shortageLoading=!1,this.shortageError=null,this.shortageStats=null,this.shortageList=[],this.shortageByFile=[],this.shortageByTime=[],this.shortageShowAddForm=!1,this.shortageDb=null,this.overviewOosStats=null,this.overviewOosError=null,this.overviewShortageStats=null,this.overviewShortageError=null,this.agentsLoading=!1,this.agentsList=null,this.agentsError=null,this.agentsSelectedId=null,this.agentsPanel="overview",this.agentFilesLoading=!1,this.agentFilesError=null,this.agentFilesList=null,this.agentFileContents={},this.agentFileDrafts={},this.agentFileActive=null,this.agentFileSaving=!1,this.agentIdentityLoading=!1,this.agentIdentityError=null,this.agentIdentityById={},this.agentSkillsLoading=!1,this.agentSkillsError=null,this.agentSkillsReport=null,this.agentSkillsAgentId=null,this.sessionsLoading=!1,this.sessionsResult=null,this.sessionsError=null,this.sessionsFilterActive="",this.sessionsFilterLimit="120",this.sessionsIncludeGlobal=!0,this.sessionsIncludeUnknown=!1,this.usageLoading=!1,this.usageResult=null,this.usageCostSummary=null,this.usageError=null,this.usageRequestSeq=0,this.usageTimeSeriesRequestSeq=0,this.usageSessionLogsRequestSeq=0,this.usageStartDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageEndDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageSelectedSessions=[],this.usageSelectedDays=[],this.usageSelectedHours=[],this.usageChartMode="tokens",this.usageDailyChartMode="by-type",this.usageTimeSeriesMode="per-turn",this.usageTimeSeriesBreakdownMode="by-type",this.usageTimeSeries=null,this.usageTimeSeriesLoading=!1,this.usageTimeSeriesCursorStart=null,this.usageTimeSeriesCursorEnd=null,this.usageSessionLogs=null,this.usageSessionLogsLoading=!1,this.usageSessionLogsExpanded=!1,this.usageQuery="",this.usageQueryDraft="",this.usageSessionSort="recent",this.usageSessionSortDir="desc",this.usageRecentSessions=[],this.usageTimeZone="local",this.usageContextExpanded=!1,this.usageHeaderPinned=!1,this.usageSessionsTab="all",this.usageVisibleColumns=["channel","agent","provider","model","messages","tools","errors","duration"],this.usageLogFilterRoles=[],this.usageLogFilterTools=[],this.usageLogFilterHasTools=!1,this.usageLogFilterQuery="",this.usageQueryDebounceTimer=null,this.workFilePaths=[],this.workOriginalFileNamesByPath={},this.workRunning=!1,this.workProgressStage=0,this._workProgressInterval=null,this.workRunStatus="idle",this.workRunId=null,this.workPendingChoices=[],this.workSelections={},this.workResult=null,this.workError=null,this.workCustomerLevel="B_QUOTE",this.workDoRegisterOos=!0,this.workPendingQuotationDraft=null,this.workQuotationDraftSaveStatus=null,this.cronLoading=!1,this.cronJobs=[],this.cronStatus=null,this.cronError=null,this.cronForm={...Gf},this.cronRunsJobId=null,this.cronRuns=[],this.cronBusy=!1,this.fulfillDraftsLoading=!1,this.fulfillDraftsError=null,this.fulfillDrafts=[],this.fulfillDetail=null,this.fulfillDetailId=null,this.fulfillConfirmBusy=!1,this.fulfillConfirmResult=null,this.fulfillFilterQuery="",this.fulfillSortBy="created_at",this.fulfillSortDir="desc",this.fulfillPage=1,this.fulfillPageSize=10,this.procurementLoading=!1,this.procurementError=null,this.procurementSuggestions=[],this.procurementSelectedKeys=[],this.procurementApprovedKeys=[],this.procurementApproveBusy=!1,this.procurementApproveResult=null,this.procurementFilterQuery="",this.procurementSortBy="uploaded_at",this.procurementSortDir="desc",this.procurementPage=1,this.procurementPageSize=10,this.skillsLoading=!1,this.skillsReport=null,this.skillsError=null,this.skillsFilter="",this.skillEdits={},this.skillsBusyKey=null,this.skillMessages={},this.debugLoading=!1,this.debugStatus=null,this.debugHealth=null,this.debugModels=[],this.debugHeartbeat=null,this.debugCallMethod="",this.debugCallParams="{}",this.debugCallResult=null,this.debugCallError=null,this.logsLoading=!1,this.logsError=null,this.logsFile=null,this.logsEntries=[],this.logsFilterText="",this.logsLevelFilters={...Wf},this.logsAutoFollow=!0,this.logsTruncated=!1,this.logsCursor=null,this.logsLastFetchAt=null,this.logsLimit=500,this.logsMaxBytes=25e4,this.logsAtBottom=!0,this.client=null,this.chatScrollFrame=null,this.chatScrollTimeout=null,this.chatHasAutoScrolled=!1,this.chatUserNearBottom=!0,this.chatNewMessagesBelow=!1,this.nodesPollInterval=null,this.logsPollInterval=null,this.debugPollInterval=null,this.logsScrollFrame=null,this.toolStreamById=new Map,this.toolStreamOrder=[],this.refreshSessionsAfterChat=new Set,this.basePath="",this.popStateHandler=()=>pf(this),this.themeMedia=null,this.themeMediaHandler=null,this.topbarObserver=null,Ds(this.settings.locale)&&gn.setLocale(this.settings.locale)}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),lp(this)}firstUpdated(){cp(this)}disconnectedCallback(){dp(this),super.disconnectedCallback()}updated(e){e.has("workRunning")&&(this.workRunning?(this.workProgressStage=this.workRunStatus==="resuming"?1:0,this._workProgressInterval!=null&&(clearInterval(this._workProgressInterval),this._workProgressInterval=null)):(this._workProgressInterval!=null&&(clearInterval(this._workProgressInterval),this._workProgressInterval=null),this.workRunStatus==="done"&&(this.workProgressStage=2))),up(this,e)}connect(){Cl(this)}handleChatScroll(e){kd(this,e)}handleLogsScroll(e){Sd(this,e)}exportLogs(e,t){Ad(e,t)}resetToolStream(){hi(this)}resetChatScroll(){sr(this)}scrollToBottom(e){sr(this),wn(this,!0,!!(e!=null&&e.smooth))}async loadAssistantIdentity(){await Al(this)}applySettings(e){et(this,e)}setTab(e){rf(this,e)}setTheme(e,t){af(this,e,t)}async loadOverview(){await vl(this)}async loadCron(){await io(this)}async loadFulfillDrafts(){await hf(this)}async loadProcurementSuggestions(){await mf(this)}async handleAbortChat(){await $l(this)}removeQueuedMessage(e){zf(this,e)}async handleUploadChatFile(e){try{const t=await Pf(this.basePath,e);this.chatUploadedFile=t,this.lastError=null}catch(t){this.lastError=t instanceof Error?t.message:String(t)}}clearChatUploadedFile(){this.chatUploadedFile=null}setChatComposeDragOver(e){this.chatComposeDragOver=e}async handleComposeDrop(e){this.chatComposeDragOver=!1,await this.handleUploadChatFile(e)}async handleSendChat(e,t){await Kf(this,e,t)}async handleWhatsAppStart(e){await dd(this,e)}async handleWhatsAppWait(){await ud(this)}async handleWhatsAppLogout(){await fd(this)}async handleChannelConfigSave(){await pd(this)}async handleChannelConfigReload(){await gd(this)}handleNostrProfileEdit(e,t){vd(this,e,t)}handleNostrProfileCancel(){yd(this)}handleNostrProfileFieldChange(e,t){bd(this,e,t)}async handleNostrProfileSave(){await $d(this)}async handleNostrProfileImport(){await xd(this)}handleNostrProfileToggleAdvanced(){wd(this)}async handleExecApprovalDecision(e){const t=this.execApprovalQueue[0];if(!(!t||!this.client||this.execApprovalBusy)){this.execApprovalBusy=!0,this.execApprovalError=null;try{await this.client.request("exec.approval.resolve",{id:t.id,decision:e}),this.execApprovalQueue=this.execApprovalQueue.filter(n=>n.id!==t.id)}catch(n){this.execApprovalError=`Exec approval failed: ${String(n)}`}finally{this.execApprovalBusy=!1}}}handleGatewayUrlConfirm(){const e=this.pendingGatewayUrl;e&&(this.pendingGatewayUrl=null,et(this,{...this.settings,gatewayUrl:e}),this.connect())}handleGatewayUrlCancel(){this.pendingGatewayUrl=null}handleOpenSidebar(e){this.sidebarCloseTimer!=null&&(window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=null),this.sidebarContent=e,this.sidebarError=null,this.sidebarOpen=!0}handleCloseSidebar(){this.sidebarOpen=!1,this.sidebarCloseTimer!=null&&window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=window.setTimeout(()=>{this.sidebarOpen||(this.sidebarContent=null,this.sidebarError=null,this.sidebarCloseTimer=null)},200)}handleSplitRatioChange(e){const t=Math.max(.4,Math.min(.7,e));this.splitRatio=t,this.applySettings({...this.settings,splitRatio:t})}render(){return py(this)}};m([v()],h.prototype,"settings",2);m([v()],h.prototype,"password",2);m([v()],h.prototype,"tab",2);m([v()],h.prototype,"onboarding",2);m([v()],h.prototype,"connected",2);m([v()],h.prototype,"theme",2);m([v()],h.prototype,"themeResolved",2);m([v()],h.prototype,"hello",2);m([v()],h.prototype,"lastError",2);m([v()],h.prototype,"eventLog",2);m([v()],h.prototype,"assistantName",2);m([v()],h.prototype,"assistantAvatar",2);m([v()],h.prototype,"assistantAgentId",2);m([v()],h.prototype,"sessionKey",2);m([v()],h.prototype,"chatLoading",2);m([v()],h.prototype,"chatSending",2);m([v()],h.prototype,"chatMessage",2);m([v()],h.prototype,"chatMessages",2);m([v()],h.prototype,"chatToolMessages",2);m([v()],h.prototype,"chatStream",2);m([v()],h.prototype,"chatStreamStartedAt",2);m([v()],h.prototype,"chatRunId",2);m([v()],h.prototype,"compactionStatus",2);m([v()],h.prototype,"chatAvatarUrl",2);m([v()],h.prototype,"chatThinkingLevel",2);m([v()],h.prototype,"chatQueue",2);m([v()],h.prototype,"chatAttachments",2);m([v()],h.prototype,"chatUploadedFile",2);m([v()],h.prototype,"chatComposeDragOver",2);m([v()],h.prototype,"chatManualRefreshInFlight",2);m([v()],h.prototype,"sidebarOpen",2);m([v()],h.prototype,"sidebarContent",2);m([v()],h.prototype,"sidebarError",2);m([v()],h.prototype,"splitRatio",2);m([v()],h.prototype,"nodesLoading",2);m([v()],h.prototype,"nodes",2);m([v()],h.prototype,"devicesLoading",2);m([v()],h.prototype,"devicesError",2);m([v()],h.prototype,"devicesList",2);m([v()],h.prototype,"execApprovalsLoading",2);m([v()],h.prototype,"execApprovalsSaving",2);m([v()],h.prototype,"execApprovalsDirty",2);m([v()],h.prototype,"execApprovalsSnapshot",2);m([v()],h.prototype,"execApprovalsForm",2);m([v()],h.prototype,"execApprovalsSelectedAgent",2);m([v()],h.prototype,"execApprovalsTarget",2);m([v()],h.prototype,"execApprovalsTargetNodeId",2);m([v()],h.prototype,"execApprovalQueue",2);m([v()],h.prototype,"execApprovalBusy",2);m([v()],h.prototype,"execApprovalError",2);m([v()],h.prototype,"pendingGatewayUrl",2);m([v()],h.prototype,"configLoading",2);m([v()],h.prototype,"configRaw",2);m([v()],h.prototype,"configRawOriginal",2);m([v()],h.prototype,"configValid",2);m([v()],h.prototype,"configIssues",2);m([v()],h.prototype,"configSaving",2);m([v()],h.prototype,"configApplying",2);m([v()],h.prototype,"updateRunning",2);m([v()],h.prototype,"applySessionKey",2);m([v()],h.prototype,"configSnapshot",2);m([v()],h.prototype,"configSchema",2);m([v()],h.prototype,"configSchemaVersion",2);m([v()],h.prototype,"configSchemaLoading",2);m([v()],h.prototype,"configUiHints",2);m([v()],h.prototype,"configForm",2);m([v()],h.prototype,"configFormOriginal",2);m([v()],h.prototype,"configFormDirty",2);m([v()],h.prototype,"configFormMode",2);m([v()],h.prototype,"configSearchQuery",2);m([v()],h.prototype,"configActiveSection",2);m([v()],h.prototype,"configActiveSubsection",2);m([v()],h.prototype,"channelsLoading",2);m([v()],h.prototype,"channelsSnapshot",2);m([v()],h.prototype,"channelsError",2);m([v()],h.prototype,"channelsLastSuccess",2);m([v()],h.prototype,"bkContent",2);m([v()],h.prototype,"bkLoading",2);m([v()],h.prototype,"bkError",2);m([v()],h.prototype,"bkSaving",2);m([v()],h.prototype,"bkLastSuccess",2);m([v()],h.prototype,"bkDependentFiles",2);m([v()],h.prototype,"whatsappLoginMessage",2);m([v()],h.prototype,"whatsappLoginQrDataUrl",2);m([v()],h.prototype,"whatsappLoginConnected",2);m([v()],h.prototype,"whatsappBusy",2);m([v()],h.prototype,"nostrProfileFormState",2);m([v()],h.prototype,"nostrProfileAccountId",2);m([v()],h.prototype,"presenceLoading",2);m([v()],h.prototype,"presenceEntries",2);m([v()],h.prototype,"presenceError",2);m([v()],h.prototype,"presenceStatus",2);m([v()],h.prototype,"oosLoading",2);m([v()],h.prototype,"oosError",2);m([v()],h.prototype,"oosStats",2);m([v()],h.prototype,"oosList",2);m([v()],h.prototype,"oosByFile",2);m([v()],h.prototype,"oosByTime",2);m([v()],h.prototype,"oosShowAddForm",2);m([v()],h.prototype,"oosDb",2);m([v()],h.prototype,"shortageLoading",2);m([v()],h.prototype,"shortageError",2);m([v()],h.prototype,"shortageStats",2);m([v()],h.prototype,"shortageList",2);m([v()],h.prototype,"shortageByFile",2);m([v()],h.prototype,"shortageByTime",2);m([v()],h.prototype,"shortageShowAddForm",2);m([v()],h.prototype,"shortageDb",2);m([v()],h.prototype,"overviewOosStats",2);m([v()],h.prototype,"overviewOosError",2);m([v()],h.prototype,"overviewShortageStats",2);m([v()],h.prototype,"overviewShortageError",2);m([v()],h.prototype,"agentsLoading",2);m([v()],h.prototype,"agentsList",2);m([v()],h.prototype,"agentsError",2);m([v()],h.prototype,"agentsSelectedId",2);m([v()],h.prototype,"agentsPanel",2);m([v()],h.prototype,"agentFilesLoading",2);m([v()],h.prototype,"agentFilesError",2);m([v()],h.prototype,"agentFilesList",2);m([v()],h.prototype,"agentFileContents",2);m([v()],h.prototype,"agentFileDrafts",2);m([v()],h.prototype,"agentFileActive",2);m([v()],h.prototype,"agentFileSaving",2);m([v()],h.prototype,"agentIdentityLoading",2);m([v()],h.prototype,"agentIdentityError",2);m([v()],h.prototype,"agentIdentityById",2);m([v()],h.prototype,"agentSkillsLoading",2);m([v()],h.prototype,"agentSkillsError",2);m([v()],h.prototype,"agentSkillsReport",2);m([v()],h.prototype,"agentSkillsAgentId",2);m([v()],h.prototype,"sessionsLoading",2);m([v()],h.prototype,"sessionsResult",2);m([v()],h.prototype,"sessionsError",2);m([v()],h.prototype,"sessionsFilterActive",2);m([v()],h.prototype,"sessionsFilterLimit",2);m([v()],h.prototype,"sessionsIncludeGlobal",2);m([v()],h.prototype,"sessionsIncludeUnknown",2);m([v()],h.prototype,"usageLoading",2);m([v()],h.prototype,"usageResult",2);m([v()],h.prototype,"usageCostSummary",2);m([v()],h.prototype,"usageError",2);m([v()],h.prototype,"usageStartDate",2);m([v()],h.prototype,"usageEndDate",2);m([v()],h.prototype,"usageSelectedSessions",2);m([v()],h.prototype,"usageSelectedDays",2);m([v()],h.prototype,"usageSelectedHours",2);m([v()],h.prototype,"usageChartMode",2);m([v()],h.prototype,"usageDailyChartMode",2);m([v()],h.prototype,"usageTimeSeriesMode",2);m([v()],h.prototype,"usageTimeSeriesBreakdownMode",2);m([v()],h.prototype,"usageTimeSeries",2);m([v()],h.prototype,"usageTimeSeriesLoading",2);m([v()],h.prototype,"usageTimeSeriesCursorStart",2);m([v()],h.prototype,"usageTimeSeriesCursorEnd",2);m([v()],h.prototype,"usageSessionLogs",2);m([v()],h.prototype,"usageSessionLogsLoading",2);m([v()],h.prototype,"usageSessionLogsExpanded",2);m([v()],h.prototype,"usageQuery",2);m([v()],h.prototype,"usageQueryDraft",2);m([v()],h.prototype,"usageSessionSort",2);m([v()],h.prototype,"usageSessionSortDir",2);m([v()],h.prototype,"usageRecentSessions",2);m([v()],h.prototype,"usageTimeZone",2);m([v()],h.prototype,"usageContextExpanded",2);m([v()],h.prototype,"usageHeaderPinned",2);m([v()],h.prototype,"usageSessionsTab",2);m([v()],h.prototype,"usageVisibleColumns",2);m([v()],h.prototype,"usageLogFilterRoles",2);m([v()],h.prototype,"usageLogFilterTools",2);m([v()],h.prototype,"usageLogFilterHasTools",2);m([v()],h.prototype,"usageLogFilterQuery",2);m([v()],h.prototype,"workFilePaths",2);m([v()],h.prototype,"workOriginalFileNamesByPath",2);m([v()],h.prototype,"workRunning",2);m([v()],h.prototype,"workProgressStage",2);m([v()],h.prototype,"workRunStatus",2);m([v()],h.prototype,"workRunId",2);m([v()],h.prototype,"workPendingChoices",2);m([v()],h.prototype,"workSelections",2);m([v()],h.prototype,"workResult",2);m([v()],h.prototype,"workError",2);m([v()],h.prototype,"workCustomerLevel",2);m([v()],h.prototype,"workDoRegisterOos",2);m([v()],h.prototype,"workPendingQuotationDraft",2);m([v()],h.prototype,"workQuotationDraftSaveStatus",2);m([v()],h.prototype,"cronLoading",2);m([v()],h.prototype,"cronJobs",2);m([v()],h.prototype,"cronStatus",2);m([v()],h.prototype,"cronError",2);m([v()],h.prototype,"cronForm",2);m([v()],h.prototype,"cronRunsJobId",2);m([v()],h.prototype,"cronRuns",2);m([v()],h.prototype,"cronBusy",2);m([v()],h.prototype,"fulfillDraftsLoading",2);m([v()],h.prototype,"fulfillDraftsError",2);m([v()],h.prototype,"fulfillDrafts",2);m([v()],h.prototype,"fulfillDetail",2);m([v()],h.prototype,"fulfillDetailId",2);m([v()],h.prototype,"fulfillConfirmBusy",2);m([v()],h.prototype,"fulfillConfirmResult",2);m([v()],h.prototype,"fulfillFilterQuery",2);m([v()],h.prototype,"fulfillSortBy",2);m([v()],h.prototype,"fulfillSortDir",2);m([v()],h.prototype,"fulfillPage",2);m([v()],h.prototype,"fulfillPageSize",2);m([v()],h.prototype,"procurementLoading",2);m([v()],h.prototype,"procurementError",2);m([v()],h.prototype,"procurementSuggestions",2);m([v()],h.prototype,"procurementSelectedKeys",2);m([v()],h.prototype,"procurementApprovedKeys",2);m([v()],h.prototype,"procurementApproveBusy",2);m([v()],h.prototype,"procurementApproveResult",2);m([v()],h.prototype,"procurementFilterQuery",2);m([v()],h.prototype,"procurementSortBy",2);m([v()],h.prototype,"procurementSortDir",2);m([v()],h.prototype,"procurementPage",2);m([v()],h.prototype,"procurementPageSize",2);m([v()],h.prototype,"skillsLoading",2);m([v()],h.prototype,"skillsReport",2);m([v()],h.prototype,"skillsError",2);m([v()],h.prototype,"skillsFilter",2);m([v()],h.prototype,"skillEdits",2);m([v()],h.prototype,"skillsBusyKey",2);m([v()],h.prototype,"skillMessages",2);m([v()],h.prototype,"debugLoading",2);m([v()],h.prototype,"debugStatus",2);m([v()],h.prototype,"debugHealth",2);m([v()],h.prototype,"debugModels",2);m([v()],h.prototype,"debugHeartbeat",2);m([v()],h.prototype,"debugCallMethod",2);m([v()],h.prototype,"debugCallParams",2);m([v()],h.prototype,"debugCallResult",2);m([v()],h.prototype,"debugCallError",2);m([v()],h.prototype,"logsLoading",2);m([v()],h.prototype,"logsError",2);m([v()],h.prototype,"logsFile",2);m([v()],h.prototype,"logsEntries",2);m([v()],h.prototype,"logsFilterText",2);m([v()],h.prototype,"logsLevelFilters",2);m([v()],h.prototype,"logsAutoFollow",2);m([v()],h.prototype,"logsTruncated",2);m([v()],h.prototype,"logsCursor",2);m([v()],h.prototype,"logsLastFetchAt",2);m([v()],h.prototype,"logsLimit",2);m([v()],h.prototype,"logsMaxBytes",2);m([v()],h.prototype,"logsAtBottom",2);m([v()],h.prototype,"chatNewMessagesBelow",2);h=m([Ca("openclaw-app")],h);
//# sourceMappingURL=index-ClEjN660.js.map
