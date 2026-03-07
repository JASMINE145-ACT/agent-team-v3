var Cc=Object.defineProperty;var Tc=(e,t,n)=>t in e?Cc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var G=(e,t,n)=>Tc(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Kn=globalThis,Ms=Kn.ShadowRoot&&(Kn.ShadyCSS===void 0||Kn.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Fs=Symbol(),Wr=new WeakMap;let Sa=class{constructor(t,n,i){if(this._$cssResult$=!0,i!==Fs)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(Ms&&t===void 0){const i=n!==void 0&&n.length===1;i&&(t=Wr.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Wr.set(n,t))}return t}toString(){return this.cssText}};const Ec=e=>new Sa(typeof e=="string"?e:e+"",void 0,Fs),Rc=(e,...t)=>{const n=e.length===1?e[0]:t.reduce((i,s,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[r+1],e[0]);return new Sa(n,e,Fs)},Lc=(e,t)=>{if(Ms)e.adoptedStyleSheets=t.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of t){const i=document.createElement("style"),s=Kn.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=n.cssText,e.appendChild(i)}},Gr=Ms?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const i of t.cssRules)n+=i.cssText;return Ec(n)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ic,defineProperty:Pc,getOwnPropertyDescriptor:Dc,getOwnPropertyNames:Mc,getOwnPropertySymbols:Fc,getPrototypeOf:Nc}=Object,et=globalThis,Vr=et.trustedTypes,Oc=Vr?Vr.emptyScript:"",Mi=et.reactiveElementPolyfillSupport,rn=(e,t)=>e,Jn={toAttribute(e,t){switch(t){case Boolean:e=e?Oc:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},Ns=(e,t)=>!Ic(e,t),Qr={attribute:!0,type:String,converter:Jn,reflect:!1,useDefault:!1,hasChanged:Ns};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),et.litPropertyMetadata??(et.litPropertyMetadata=new WeakMap);let Mt=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=Qr){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(t,n),!n.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,n);s!==void 0&&Pc(this.prototype,t,s)}}static getPropertyDescriptor(t,n,i){const{get:s,set:r}=Dc(this.prototype,t)??{get(){return this[n]},set(o){this[n]=o}};return{get:s,set(o){const a=s==null?void 0:s.call(this);r==null||r.call(this,o),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Qr}static _$Ei(){if(this.hasOwnProperty(rn("elementProperties")))return;const t=Nc(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(rn("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(rn("properties"))){const n=this.properties,i=[...Mc(n),...Fc(n)];for(const s of i)this.createProperty(s,n[s])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[i,s]of n)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[n,i]of this.elementProperties){const s=this._$Eu(n,i);s!==void 0&&this._$Eh.set(s,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)n.unshift(Gr(s))}else t!==void 0&&n.push(Gr(t));return n}static _$Eu(t,n){const i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(n=>n(this))}addController(t){var n;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((n=t.hostConnected)==null||n.call(t))}removeController(t){var n;(n=this._$EO)==null||n.delete(t)}_$E_(){const t=new Map,n=this.constructor.elementProperties;for(const i of n.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Lc(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(n=>{var i;return(i=n.hostConnected)==null?void 0:i.call(n)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(n=>{var i;return(i=n.hostDisconnected)==null?void 0:i.call(n)})}attributeChangedCallback(t,n,i){this._$AK(t,i)}_$ET(t,n){var r;const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const o=(((r=i.converter)==null?void 0:r.toAttribute)!==void 0?i.converter:Jn).toAttribute(n,i.type);this._$Em=t,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,n){var r,o;const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const a=i.getPropertyOptions(s),l=typeof a.converter=="function"?{fromAttribute:a.converter}:((r=a.converter)==null?void 0:r.fromAttribute)!==void 0?a.converter:Jn;this._$Em=s;const c=l.fromAttribute(n,a.type);this[s]=c??((o=this._$Ej)==null?void 0:o.get(s))??c,this._$Em=null}}requestUpdate(t,n,i,s=!1,r){var o;if(t!==void 0){const a=this.constructor;if(s===!1&&(r=this[t]),i??(i=a.getPropertyOptions(t)),!((i.hasChanged??Ns)(r,n)||i.useDefault&&i.reflect&&r===((o=this._$Ej)==null?void 0:o.get(t))&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,n,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??n??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(n=void 0),this._$AL.set(t,n)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[r,o]of s){const{wrapped:a}=o,l=this[r];a!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,o,l)}}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),(i=this._$EO)==null||i.forEach(s=>{var r;return(r=s.hostUpdate)==null?void 0:r.call(s)}),this.update(n)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(n)}willUpdate(t){}_$AE(t){var n;(n=this._$EO)==null||n.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(n=>this._$ET(n,this[n]))),this._$EM()}updated(t){}firstUpdated(t){}};Mt.elementStyles=[],Mt.shadowRootOptions={mode:"open"},Mt[rn("elementProperties")]=new Map,Mt[rn("finalized")]=new Map,Mi==null||Mi({ReactiveElement:Mt}),(et.reactiveElementVersions??(et.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const on=globalThis,Jr=e=>e,Yn=on.trustedTypes,Yr=Yn?Yn.createPolicy("lit-html",{createHTML:e=>e}):void 0,_a="$lit$",Ze=`lit$${Math.random().toFixed(9).slice(2)}$`,Aa="?"+Ze,Bc=`<${Aa}>`,yt=document,pn=()=>yt.createComment(""),fn=e=>e===null||typeof e!="object"&&typeof e!="function",Os=Array.isArray,Uc=e=>Os(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",Fi=`[ 	
\f\r]`,Gt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Xr=/-->/g,Zr=/>/g,dt=RegExp(`>|${Fi}(?:([^\\s"'>=/]+)(${Fi}*=${Fi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),eo=/'/g,to=/"/g,Ca=/^(?:script|style|textarea|title)$/i,zc=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),d=zc(1),it=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),no=new WeakMap,ht=yt.createTreeWalker(yt,129);function Ta(e,t){if(!Os(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Yr!==void 0?Yr.createHTML(t):t}const Hc=(e,t)=>{const n=e.length-1,i=[];let s,r=t===2?"<svg>":t===3?"<math>":"",o=Gt;for(let a=0;a<n;a++){const l=e[a];let c,p,u=-1,f=0;for(;f<l.length&&(o.lastIndex=f,p=o.exec(l),p!==null);)f=o.lastIndex,o===Gt?p[1]==="!--"?o=Xr:p[1]!==void 0?o=Zr:p[2]!==void 0?(Ca.test(p[2])&&(s=RegExp("</"+p[2],"g")),o=dt):p[3]!==void 0&&(o=dt):o===dt?p[0]===">"?(o=s??Gt,u=-1):p[1]===void 0?u=-2:(u=o.lastIndex-p[2].length,c=p[1],o=p[3]===void 0?dt:p[3]==='"'?to:eo):o===to||o===eo?o=dt:o===Xr||o===Zr?o=Gt:(o=dt,s=void 0);const b=o===dt&&e[a+1].startsWith("/>")?" ":"";r+=o===Gt?l+Bc:u>=0?(i.push(c),l.slice(0,u)+_a+l.slice(u)+Ze+b):l+Ze+(u===-2?a:b)}return[Ta(e,r+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class gn{constructor({strings:t,_$litType$:n},i){let s;this.parts=[];let r=0,o=0;const a=t.length-1,l=this.parts,[c,p]=Hc(t,n);if(this.el=gn.createElement(c,i),ht.currentNode=this.el.content,n===2||n===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=ht.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(const u of s.getAttributeNames())if(u.endsWith(_a)){const f=p[o++],b=s.getAttribute(u).split(Ze),x=/([.?@])?(.*)/.exec(f);l.push({type:1,index:r,name:x[2],strings:b,ctor:x[1]==="."?Kc:x[1]==="?"?qc:x[1]==="@"?Wc:li}),s.removeAttribute(u)}else u.startsWith(Ze)&&(l.push({type:6,index:r}),s.removeAttribute(u));if(Ca.test(s.tagName)){const u=s.textContent.split(Ze),f=u.length-1;if(f>0){s.textContent=Yn?Yn.emptyScript:"";for(let b=0;b<f;b++)s.append(u[b],pn()),ht.nextNode(),l.push({type:2,index:++r});s.append(u[f],pn())}}}else if(s.nodeType===8)if(s.data===Aa)l.push({type:2,index:r});else{let u=-1;for(;(u=s.data.indexOf(Ze,u+1))!==-1;)l.push({type:7,index:r}),u+=Ze.length-1}r++}}static createElement(t,n){const i=yt.createElement("template");return i.innerHTML=t,i}}function Bt(e,t,n=e,i){var o,a;if(t===it)return t;let s=i!==void 0?(o=n._$Co)==null?void 0:o[i]:n._$Cl;const r=fn(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==r&&((a=s==null?void 0:s._$AO)==null||a.call(s,!1),r===void 0?s=void 0:(s=new r(e),s._$AT(e,n,i)),i!==void 0?(n._$Co??(n._$Co=[]))[i]=s:n._$Cl=s),s!==void 0&&(t=Bt(e,s._$AS(e,t.values),s,i)),t}class jc{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??yt).importNode(n,!0);ht.currentNode=s;let r=ht.nextNode(),o=0,a=0,l=i[0];for(;l!==void 0;){if(o===l.index){let c;l.type===2?c=new ai(r,r.nextSibling,this,t):l.type===1?c=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(c=new Gc(r,this,t)),this._$AV.push(c),l=i[++a]}o!==(l==null?void 0:l.index)&&(r=ht.nextNode(),o++)}return ht.currentNode=yt,s}p(t){let n=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,n),n+=i.strings.length-2):i._$AI(t[n])),n++}}let ai=class Ea{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,n,i,s){this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Bt(this,t,n),fn(t)?t===w||t==null||t===""?(this._$AH!==w&&this._$AR(),this._$AH=w):t!==this._$AH&&t!==it&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Uc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==w&&fn(this._$AH)?this._$AA.nextSibling.data=t:this.T(yt.createTextNode(t)),this._$AH=t}$(t){var r;const{values:n,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=gn.createElement(Ta(i.h,i.h[0]),this.options)),i);if(((r=this._$AH)==null?void 0:r._$AD)===s)this._$AH.p(n);else{const o=new jc(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=no.get(t.strings);return n===void 0&&no.set(t.strings,n=new gn(t)),n}k(t){Os(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let i,s=0;for(const r of t)s===n.length?n.push(i=new Ea(this.O(pn()),this.O(pn()),this,this.options)):i=n[s],i._$AI(r),s++;s<n.length&&(this._$AR(i&&i._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,n);t!==this._$AB;){const s=Jr(t).nextSibling;Jr(t).remove(),t=s}}setConnected(t){var n;this._$AM===void 0&&(this._$Cv=t,(n=this._$AP)==null||n.call(this,t))}},li=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,i,s,r){this.type=1,this._$AH=w,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=w}_$AI(t,n=this,i,s){const r=this.strings;let o=!1;if(r===void 0)t=Bt(this,t,n,0),o=!fn(t)||t!==this._$AH&&t!==it,o&&(this._$AH=t);else{const a=t;let l,c;for(t=r[0],l=0;l<r.length-1;l++)c=Bt(this,a[i+l],n,l),c===it&&(c=this._$AH[l]),o||(o=!fn(c)||c!==this._$AH[l]),c===w?t=w:t!==w&&(t+=(c??"")+r[l+1]),this._$AH[l]=c}o&&!s&&this.j(t)}j(t){t===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Kc=class extends li{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===w?void 0:t}},qc=class extends li{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==w)}},Wc=class extends li{constructor(t,n,i,s,r){super(t,n,i,s,r),this.type=5}_$AI(t,n=this){if((t=Bt(this,t,n,0)??w)===it)return;const i=this._$AH,s=t===w&&i!==w||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==w&&(i===w||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var n;typeof this._$AH=="function"?this._$AH.call(((n=this.options)==null?void 0:n.host)??this.element,t):this._$AH.handleEvent(t)}},Gc=class{constructor(t,n,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Bt(this,t)}};const Vc={I:ai},Ni=on.litHtmlPolyfillSupport;Ni==null||Ni(gn,ai),(on.litHtmlVersions??(on.litHtmlVersions=[])).push("3.3.2");const Qc=(e,t,n)=>{const i=(n==null?void 0:n.renderBefore)??t;let s=i._$litPart$;if(s===void 0){const r=(n==null?void 0:n.renderBefore)??null;i._$litPart$=s=new ai(t.insertBefore(pn(),r),r,void 0,n??{})}return s._$AI(e),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const vt=globalThis;let Nt=class extends Mt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var n;const t=super.createRenderRoot();return(n=this.renderOptions).renderBefore??(n.renderBefore=t.firstChild),t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Qc(n,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return it}};var ka;Nt._$litElement$=!0,Nt.finalized=!0,(ka=vt.litElementHydrateSupport)==null||ka.call(vt,{LitElement:Nt});const Oi=vt.litElementPolyfillSupport;Oi==null||Oi({LitElement:Nt});(vt.litElementVersions??(vt.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ra=e=>(t,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Jc={attribute:!0,type:String,converter:Jn,reflect:!1,hasChanged:Ns},Yc=(e=Jc,t,n)=>{const{kind:i,metadata:s}=n;let r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),i==="setter"&&((e=Object.create(e)).wrapped=!0),r.set(n.name,e),i==="accessor"){const{name:o}=n;return{set(a){const l=t.get.call(this);t.set.call(this,a),this.requestUpdate(o,l,e,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,e,a),a}}}if(i==="setter"){const{name:o}=n;return function(a){const l=this[o];t.call(this,a),this.requestUpdate(o,l,e,!0,a)}}throw Error("Unsupported decorator location: "+i)};function ci(e){return(t,n)=>typeof n=="object"?Yc(e,t,n):((i,s,r)=>{const o=s.hasOwnProperty(r);return s.constructor.createProperty(r,i),o?Object.getOwnPropertyDescriptor(s,r):void 0})(e,t,n)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function y(e){return ci({...e,state:!0,attribute:!1})}const Xc="modulepreload",Zc=function(e,t){return new URL(e,t).href},io={},Bi=function(t,n,i){let s=Promise.resolve();if(n&&n.length>0){let o=function(p){return Promise.all(p.map(u=>Promise.resolve(u).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};const a=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),c=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));s=o(n.map(p=>{if(p=Zc(p,i),p in io)return;io[p]=!0;const u=p.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(!!i)for(let k=a.length-1;k>=0;k--){const S=a[k];if(S.href===p&&(!u||S.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${p}"]${f}`))return;const x=document.createElement("link");if(x.rel=u?"stylesheet":Xc,u||(x.as="script"),x.crossOrigin="",x.href=p,c&&x.setAttribute("nonce",c),document.head.appendChild(x),u)return new Promise((k,S)=>{x.addEventListener("load",k),x.addEventListener("error",()=>S(new Error(`Unable to preload CSS for ${p}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})},ed={common:{health:"Health",ok:"OK",offline:"Offline",connect:"Connect",refresh:"Refresh",retry:"Retry",cancel:"Cancel",close:"Close",yes:"Yes",no:"No",prev:"Prev",next:"Next",errorTitle:"Request failed",enabled:"Enabled",disabled:"Disabled",na:"n/a",docs:"Docs",resources:"Resources"},nav:{chat:"Chat",control:"Control",agent:"Agent",settings:"Settings",expand:"Expand sidebar",collapse:"Collapse sidebar"},tabs:{agents:"Agents",overview:"Overview",channels:"Business Knowledge",instances:"Out of Stock",sessions:"Procurement",work:"Quotation",cron:"Order Fulfill",skills:"Skills",nodes:"Nodes",chat:"Chat",config:"Config",debug:"Debug",logs:"Logs"},subtitles:{agents:"Manage agent workspaces, tools, and identities.",overview:"Gateway status, entry points, and a fast health read.",channels:"Edit wanding_business_knowledge.md for selection and matching.",instances:"OOS dashboard: stats and product list without asking the agent.",sessions:"Procurement suggestions from shortage; approve to save and notify buyer.",work:"Batch quotation: upload files, identify, match price and stock, fill and save.",cron:"Pending quotation drafts; confirm to create order and lock stock.",skills:"Manage skill availability and API key injection.",nodes:"Paired devices, capabilities, and command exposure.",chat:"Direct gateway chat session for quick interventions.",config:"Edit ~/.openclaw/openclaw.json safely.",debug:"Gateway snapshots, events, and manual RPC calls.",logs:"Live tail of the gateway file logs."},overview:{access:{title:"Gateway Access",subtitle:"Where the dashboard connects and how it authenticates.",wsUrl:"WebSocket URL",token:"Gateway Token",password:"Password (not stored)",sessionKey:"Default Session Key",language:"Language",connectHint:"Click Connect to apply connection changes.",trustedProxy:"Authenticated via trusted proxy."},snapshot:{title:"Snapshot",subtitle:"Latest gateway handshake information.",status:"Status",uptime:"Uptime",tickInterval:"Tick Interval",lastChannelsRefresh:"Last Channels Refresh",channelsHint:"Use Channels to link WhatsApp, Telegram, Discord, Signal, or iMessage."},stats:{instances:"Instances",instancesHint:"Presence beacons in the last 5 minutes.",sessions:"Sessions",sessionsHint:"Recent session keys tracked by the gateway.",cron:"Cron",cronNext:"Next wake {time}"},notes:{title:"Notes",subtitle:"Quick reminders for remote control setups.",tailscaleTitle:"Tailscale serve",tailscaleText:"Prefer serve mode to keep the gateway on loopback with tailnet auth.",sessionTitle:"Session hygiene",sessionText:"Use /new or sessions.patch to reset context.",cronTitle:"Cron reminders",cronText:"Use isolated sessions for recurring runs."},auth:{required:"This gateway requires auth. Add a token or password, then click Connect.",failed:"Auth failed. Re-copy a tokenized URL with {command}, or update the token, then click Connect."},insecure:{hint:"This page is HTTP, so the browser blocks device identity. Use HTTPS (Tailscale Serve) or open {url} on the gateway host.",stayHttp:"If you must stay on HTTP, set {config} (token-only)."}},chat:{disconnected:"Disconnected from gateway.",refreshTitle:"Refresh chat data",thinkingToggle:"Toggle assistant thinking/working output",focusToggle:"Toggle focus mode (hide sidebar + page header)",onboardingDisabled:"Disabled during onboarding"},work:{runHint:"Please select at least one file before running.",saveConfirm:"Confirm save quotation draft and persist to database?",saveSuccessHint:"Saved. You can confirm it on the Order Fulfill page.",stageExtract:"Extract sheet data",stageMatch:"Match price & inventory",stageFill:"Fill quotation",uploadTitle:"Quotation files (multiple)",removeFile:"Remove",noFiles:"No files uploaded (.xlsx/.xls/.xlsm).",customerLevel:"Customer level",registerOos:"Register out-of-stock items",currentStage:"Current stage",running:"Running",run:"Run",cancel:"Cancel",statusLabel:"Status",awaitingTitle:"Need your choices",awaitingHint:"Select one option for each ambiguous item, then continue.",qty:"Qty",choiceSelect:"Candidate selection",choiceOos:"Mark as out of stock",resuming:"Resuming",resume:"Confirm and continue",savedDraftNo:"Quotation draft saved: {no}",pendingDraftTitle:"Pending quotation draft",pendingDraftHint:"Review and edit before saving to database.",saving:"Saving...",saveDraft:"Confirm and save",resultTitle:"Execution result",download:"Download {name}",trace:"Trace ({count})",lineProduct:"Product",lineSpec:"Spec",lineQty:"Qty",lineCode:"Code",lineQuoteName:"Quote name",linePrice:"Unit price",lineAmount:"Amount",lineAvailable:"Available",lineShortfall:"Shortfall",lineIsShortage:"Shortage",textInputTitle:"Text input (quotation)",textInputHint:"Enter product list (multi-line or semicolon/comma separated); generated file will run with uploaded files.",textInputPlaceholder:"e.g. Cable 3*2.5 100m; Switch 20 pcs",generateFromText:"Generate from text",textGenerating:"Generating…"},fulfill:{title:"Pending quotation drafts",subtitle:"Load persisted drafts and confirm to create formal orders.",loading:"Loading...",refreshList:"Refresh list",filterPlaceholder:"Search by draft no/name/source",sortBy:"Sort by",sortDir:"Order",sortCreatedAt:"Created time",sortDraftNo:"Draft no",sortName:"Name",sortDesc:"Newest first",sortAsc:"Oldest first",pageSize:"Page size",total:"Total: {total}",page:"Page {current}/{total}",listTitle:"List",listSubtitle:"View detail first, then confirm order.",colDraftNo:"Draft No",colName:"Name",colSource:"Source",colCreatedAt:"Created At",colActions:"Actions",viewDetail:"View",confirmAction:"Confirm order",confirming:"Confirming...",detailTitle:"Draft detail · {draftNo}",closeDetail:"Close detail",lineProduct:"Product",lineSpec:"Spec",lineQty:"Qty",lineCode:"Code",lineQuoteName:"Quote name",linePrice:"Unit price",lineAmount:"Amount",lineAvailable:"Available",lineShortfall:"Shortfall",lineIsShortage:"Shortage",noDrafts:"No pending quotation drafts.",confirmTitle:"Order confirmed",confirmPrompt:"Confirm order? {count} line(s), total amount {amount}.",confirmPromptSimple:"Confirm to convert this quotation into a formal order?",orderId:"Order ID"},procurement:{title:"Procurement suggestions",subtitle:"Generated from shortage records; approve to persist and notify buyers.",loading:"Loading...",refreshList:"Refresh list",batchApprove:"Batch approve",approving:"Approving...",approveSingle:"Approve",approveConfirm:"Confirm approval and notify buyer?",approveBatchConfirm:"Confirm approval of {count} item(s) and notify buyer?",noSuggestions:"No shortage products; no procurement suggestions.",noPending:"No pending items (approved items are hidden).",listHint:"Select multiple to batch approve; click Approve to save and notify buyer.",filterPlaceholder:"Search by product/spec/code/key",sortBy:"Sort by",sortDir:"Order",sortUploadedAt:"Reported time",sortShortfall:"Shortfall",sortCount:"Report count",sortProduct:"Product name",sortDesc:"High to low / newest",sortAsc:"Low to high / oldest",pageSize:"Page size",total:"Total: {total}",page:"Page {current}/{total}",listTitle:"Shortage item list",selectAll:"Select all filtered items",selectItem:"Select item",colProduct:"Product",colSpec:"Spec",colShortfall:"Shortfall",colCode:"Code",colCount:"Count",colActions:"Actions",approvedCount:"Approved {count} item(s)."},replenishment:{title:"Replenishment",subtitle:"Enter product name or code and quantity to generate a draft; view and confirm in the list below to run inventory supplement.",productOrCodePlaceholder:"Product name or code",quantityPlaceholder:"Quantity",generateDraft:"Generate replenishment draft",creating:"Creating…",addRow:"Add row",removeRow:"Remove",refreshList:"Refresh list",loading:"Loading…",listTitle:"Replenishment drafts",listHint:"Drafts are created via LLM and inventory tools; confirm to run inventory changes.",noDrafts:"No replenishment drafts.",colDraftNo:"Draft No",colName:"Name",colCreatedAt:"Created",colStatus:"Status",colActions:"Actions",viewDetail:"View",confirm:"Confirm replenishment",confirming:"Executing…",confirmPrompt:"Confirm and run all inventory changes for this draft?",delete:"Delete",deleteConfirm:"Delete this replenishment draft? This cannot be undone.",detailTitle:"Draft detail ({no})",detailSubtitle:"Products, current stock and replenishment quantities.",colCode:"Code",colProduct:"Product",colSpec:"Spec",colCurrentQty:"Current qty",colQuantity:"Quantity"},languages:{en:"English",zhCN:"简体中文 (Simplified Chinese)",zhTW:"繁體中文 (Traditional Chinese)",ptBR:"Português (Brazilian Portuguese)"}},td=["en","zh-CN","zh-TW","pt-BR"];function Bs(e){return e!=null&&td.includes(e)}class nd{constructor(){this.locale="en",this.translations={en:ed},this.subscribers=new Set,this.loadLocale()}loadLocale(){const t=localStorage.getItem("openclaw.i18n.locale");if(Bs(t))this.locale=t;else{const n=navigator.language;n.startsWith("zh")?this.locale=n==="zh-TW"||n==="zh-HK"?"zh-TW":"zh-CN":n.startsWith("pt")?this.locale="pt-BR":this.locale="en"}}getLocale(){return this.locale}async setLocale(t){if(this.locale!==t){if(!this.translations[t])try{let n;if(t==="zh-CN")n=await Bi(()=>import("./zh-CN-1LfqPD8n.js"),[],import.meta.url);else if(t==="zh-TW")n=await Bi(()=>import("./zh-TW-B7H4kk0G.js"),[],import.meta.url);else if(t==="pt-BR")n=await Bi(()=>import("./pt-BR-CAUgEH0a.js"),[],import.meta.url);else return;this.translations[t]=n[t.replace("-","_")]}catch(n){console.error(`Failed to load locale: ${t}`,n);return}this.locale=t,localStorage.setItem("openclaw.i18n.locale",t),this.notify()}}registerTranslation(t,n){this.translations[t]=n}subscribe(t){return this.subscribers.add(t),()=>this.subscribers.delete(t)}notify(){this.subscribers.forEach(t=>t(this.locale))}t(t,n){const i=t.split(".");let s=this.translations[this.locale]||this.translations.en;for(const r of i)if(s&&typeof s=="object")s=s[r];else{s=void 0;break}if(s===void 0&&this.locale!=="en"){s=this.translations.en;for(const r of i)if(s&&typeof s=="object")s=s[r];else{s=void 0;break}}return typeof s!="string"?t:n?s.replace(/\{(\w+)\}/g,(r,o)=>n[o]||`{${o}}`):s}}const hn=new nd,g=(e,t)=>hn.t(e,t);class id{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){this.unsubscribe=hn.subscribe(()=>{this.host.requestUpdate()})}hostDisconnected(){var t;(t=this.unsubscribe)==null||t.call(this)}}async function Ce(e,t){if(!(!e.client||!e.connected)&&!e.channelsLoading){e.channelsLoading=!0,e.channelsError=null;try{const n=await e.client.request("channels.status",{probe:t,timeoutMs:8e3});e.channelsSnapshot=n,e.channelsLastSuccess=Date.now()}catch(n){e.channelsError=String(n)}finally{e.channelsLoading=!1}}}async function sd(e,t){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const n=await e.client.request("web.login.start",{force:t,timeoutMs:3e4});e.whatsappLoginMessage=n.message??null,e.whatsappLoginQrDataUrl=n.qrDataUrl??null,e.whatsappLoginConnected=null}catch(n){e.whatsappLoginMessage=String(n),e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function rd(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const t=await e.client.request("web.login.wait",{timeoutMs:12e4});e.whatsappLoginMessage=t.message??null,e.whatsappLoginConnected=t.connected??null,t.connected&&(e.whatsappLoginQrDataUrl=null)}catch(t){e.whatsappLoginMessage=String(t),e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function od(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{await e.client.request("channels.logout",{channel:"whatsapp"}),e.whatsappLoginMessage="Logged out.",e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}catch(t){e.whatsappLoginMessage=String(t)}finally{e.whatsappBusy=!1}}}function _e(e){if(e)return Array.isArray(e.type)?e.type.filter(n=>n!=="null")[0]??e.type[0]:e.type}function La(e){if(!e)return"";if(e.default!==void 0)return e.default;switch(_e(e)){case"object":return{};case"array":return[];case"boolean":return!1;case"number":case"integer":return 0;case"string":return"";default:return""}}function Us(e){return e.filter(t=>typeof t=="string").join(".")}function Ae(e,t){const n=Us(e),i=t[n];if(i)return i;const s=n.split(".");for(const[r,o]of Object.entries(t)){if(!r.includes("*"))continue;const a=r.split(".");if(a.length!==s.length)continue;let l=!0;for(let c=0;c<s.length;c+=1)if(a[c]!=="*"&&a[c]!==s[c]){l=!1;break}if(l)return o}}function Ye(e){return e.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/\s+/g," ").replace(/^./,t=>t.toUpperCase())}function so(e,t){const n=e.trim();if(n==="")return;const i=Number(n);return!Number.isFinite(i)||t&&!Number.isInteger(i)?e:i}function ro(e){const t=e.trim();return t==="true"?!0:t==="false"?!1:e}function Xe(e,t){if(e==null)return e;if(t.allOf&&t.allOf.length>0){let i=e;for(const s of t.allOf)i=Xe(i,s);return i}const n=_e(t);if(t.anyOf||t.oneOf){const i=(t.anyOf??t.oneOf??[]).filter(s=>!(s.type==="null"||Array.isArray(s.type)&&s.type.includes("null")));if(i.length===1)return Xe(e,i[0]);if(typeof e=="string")for(const s of i){const r=_e(s);if(r==="number"||r==="integer"){const o=so(e,r==="integer");if(o===void 0||typeof o=="number")return o}if(r==="boolean"){const o=ro(e);if(typeof o=="boolean")return o}}for(const s of i){const r=_e(s);if(r==="object"&&typeof e=="object"&&!Array.isArray(e)||r==="array"&&Array.isArray(e))return Xe(e,s)}return e}if(n==="number"||n==="integer"){if(typeof e=="string"){const i=so(e,n==="integer");if(i===void 0||typeof i=="number")return i}return e}if(n==="boolean"){if(typeof e=="string"){const i=ro(e);if(typeof i=="boolean")return i}return e}if(n==="object"){if(typeof e!="object"||Array.isArray(e))return e;const i=e,s=t.properties??{},r=t.additionalProperties&&typeof t.additionalProperties=="object"?t.additionalProperties:null,o={};for(const[a,l]of Object.entries(i)){const c=s[a]??r,p=c?Xe(l,c):l;p!==void 0&&(o[a]=p)}return o}if(n==="array"){if(!Array.isArray(e))return e;if(Array.isArray(t.items)){const s=t.items;return e.map((r,o)=>{const a=o<s.length?s[o]:void 0;return a?Xe(r,a):r})}const i=t.items;return i?e.map(s=>Xe(s,i)).filter(s=>s!==void 0):e}return e}function bt(e){return typeof structuredClone=="function"?structuredClone(e):JSON.parse(JSON.stringify(e))}function mn(e){return`${JSON.stringify(e,null,2).trimEnd()}
`}function Ia(e,t,n){if(t.length===0)return;let i=e;for(let r=0;r<t.length-1;r+=1){const o=t[r],a=t[r+1];if(typeof o=="number"){if(!Array.isArray(i))return;i[o]==null&&(i[o]=typeof a=="number"?[]:{}),i=i[o]}else{if(typeof i!="object"||i==null)return;const l=i;l[o]==null&&(l[o]=typeof a=="number"?[]:{}),i=l[o]}}const s=t[t.length-1];if(typeof s=="number"){Array.isArray(i)&&(i[s]=n);return}typeof i=="object"&&i!=null&&(i[s]=n)}function Pa(e,t){if(t.length===0)return;let n=e;for(let s=0;s<t.length-1;s+=1){const r=t[s];if(typeof r=="number"){if(!Array.isArray(n))return;n=n[r]}else{if(typeof n!="object"||n==null)return;n=n[r]}if(n==null)return}const i=t[t.length-1];if(typeof i=="number"){Array.isArray(n)&&n.splice(i,1);return}typeof n=="object"&&n!=null&&delete n[i]}async function He(e){if(!(!e.client||!e.connected)){e.configLoading=!0,e.lastError=null;try{const t=await e.client.request("config.get",{});cd(e,t)}catch(t){e.lastError=String(t)}finally{e.configLoading=!1}}}async function ad(e){if(!(!e.client||!e.connected)&&!e.configSchemaLoading){e.configSchemaLoading=!0;try{const t=await e.client.request("config.schema",{});ld(e,t)}catch(t){e.lastError=String(t)}finally{e.configSchemaLoading=!1}}}function ld(e,t){e.configSchema=t.schema??null,e.configUiHints=t.uiHints??{},e.configSchemaVersion=t.version??null}function cd(e,t){e.configSnapshot=t;const n=typeof t.raw=="string"?t.raw:t.config&&typeof t.config=="object"?mn(t.config):e.configRaw;!e.configFormDirty||e.configFormMode==="raw"?e.configRaw=n:e.configForm?e.configRaw=mn(e.configForm):e.configRaw=n,e.configValid=typeof t.valid=="boolean"?t.valid:null,e.configIssues=Array.isArray(t.issues)?t.issues:[],e.configFormDirty||(e.configForm=bt(t.config??{}),e.configFormOriginal=bt(t.config??{}),e.configRawOriginal=n)}function dd(e){return!e||typeof e!="object"||Array.isArray(e)?null:e}function Da(e){if(e.configFormMode!=="form"||!e.configForm)return e.configRaw;const t=dd(e.configSchema),n=t?Xe(e.configForm,t):e.configForm;return mn(n)}async function qn(e){var t;if(!(!e.client||!e.connected)){e.configSaving=!0,e.lastError=null;try{const n=Da(e),i=(t=e.configSnapshot)==null?void 0:t.hash;if(!i){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.set",{raw:n,baseHash:i}),e.configFormDirty=!1,await He(e)}catch(n){e.lastError=String(n)}finally{e.configSaving=!1}}}async function ud(e){var t;if(!(!e.client||!e.connected)){e.configApplying=!0,e.lastError=null;try{const n=Da(e),i=(t=e.configSnapshot)==null?void 0:t.hash;if(!i){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.apply",{raw:n,baseHash:i,sessionKey:e.applySessionKey}),e.configFormDirty=!1,await He(e)}catch(n){e.lastError=String(n)}finally{e.configApplying=!1}}}async function pd(e){if(!(!e.client||!e.connected)){e.updateRunning=!0,e.lastError=null;try{await e.client.request("update.run",{sessionKey:e.applySessionKey})}catch(t){e.lastError=String(t)}finally{e.updateRunning=!1}}}function Se(e,t,n){var s;const i=bt(e.configForm??((s=e.configSnapshot)==null?void 0:s.config)??{});Ia(i,t,n),e.configForm=i,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=mn(i))}function Ve(e,t){var i;const n=bt(e.configForm??((i=e.configSnapshot)==null?void 0:i.config)??{});Pa(n,t),e.configForm=n,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=mn(n))}function fd(e){const t={name:(e==null?void 0:e.name)??"",displayName:(e==null?void 0:e.displayName)??"",about:(e==null?void 0:e.about)??"",picture:(e==null?void 0:e.picture)??"",banner:(e==null?void 0:e.banner)??"",website:(e==null?void 0:e.website)??"",nip05:(e==null?void 0:e.nip05)??"",lud16:(e==null?void 0:e.lud16)??""};return{values:t,original:{...t},saving:!1,importing:!1,error:null,success:null,fieldErrors:{},showAdvanced:!!(e!=null&&e.banner||e!=null&&e.website||e!=null&&e.nip05||e!=null&&e.lud16)}}async function gd(e,t){await sd(e,t),await Ce(e,!0)}async function hd(e){await rd(e),await Ce(e,!0)}async function md(e){await od(e),await Ce(e,!0)}async function vd(e){await qn(e),await He(e),await Ce(e,!0)}async function yd(e){await He(e),await Ce(e,!0)}function bd(e){if(!Array.isArray(e))return{};const t={};for(const n of e){if(typeof n!="string")continue;const[i,...s]=n.split(":");if(!i||s.length===0)continue;const r=i.trim(),o=s.join(":").trim();r&&o&&(t[r]=o)}return t}function Ma(e){var n,i,s;return((s=(((i=(n=e.channelsSnapshot)==null?void 0:n.channelAccounts)==null?void 0:i.nostr)??[])[0])==null?void 0:s.accountId)??e.nostrProfileAccountId??"default"}function Fa(e,t=""){return`/api/channels/nostr/${encodeURIComponent(e)}/profile${t}`}function wd(e){var s,r,o;const t=(o=(r=(s=e.hello)==null?void 0:s.auth)==null?void 0:r.deviceToken)==null?void 0:o.trim();if(t)return`Bearer ${t}`;const n=e.settings.token.trim();if(n)return`Bearer ${n}`;const i=e.password.trim();return i?`Bearer ${i}`:null}function Na(e){const t=wd(e);return t?{Authorization:t}:{}}function $d(e,t,n){e.nostrProfileAccountId=t,e.nostrProfileFormState=fd(n??void 0)}function xd(e){e.nostrProfileFormState=null,e.nostrProfileAccountId=null}function kd(e,t,n){const i=e.nostrProfileFormState;i&&(e.nostrProfileFormState={...i,values:{...i.values,[t]:n},fieldErrors:{...i.fieldErrors,[t]:""}})}function Sd(e){const t=e.nostrProfileFormState;t&&(e.nostrProfileFormState={...t,showAdvanced:!t.showAdvanced})}async function _d(e){const t=e.nostrProfileFormState;if(!t||t.saving)return;const n=Ma(e);e.nostrProfileFormState={...t,saving:!0,error:null,success:null,fieldErrors:{}};try{const i=await fetch(Fa(n),{method:"PUT",headers:{"Content-Type":"application/json",...Na(e)},body:JSON.stringify(t.values)}),s=await i.json().catch(()=>null);if(!i.ok||(s==null?void 0:s.ok)===!1||!s){const r=(s==null?void 0:s.error)??`Profile update failed (${i.status})`;e.nostrProfileFormState={...t,saving:!1,error:r,success:null,fieldErrors:bd(s==null?void 0:s.details)};return}if(!s.persisted){e.nostrProfileFormState={...t,saving:!1,error:"Profile publish failed on all relays.",success:null};return}e.nostrProfileFormState={...t,saving:!1,error:null,success:"Profile published to relays.",fieldErrors:{},original:{...t.values}},await Ce(e,!0)}catch(i){e.nostrProfileFormState={...t,saving:!1,error:`Profile update failed: ${String(i)}`,success:null}}}async function Ad(e){const t=e.nostrProfileFormState;if(!t||t.importing)return;const n=Ma(e);e.nostrProfileFormState={...t,importing:!0,error:null,success:null};try{const i=await fetch(Fa(n,"/import"),{method:"POST",headers:{"Content-Type":"application/json",...Na(e)},body:JSON.stringify({autoMerge:!0})}),s=await i.json().catch(()=>null);if(!i.ok||(s==null?void 0:s.ok)===!1||!s){const l=(s==null?void 0:s.error)??`Profile import failed (${i.status})`;e.nostrProfileFormState={...t,importing:!1,error:l,success:null};return}const r=s.merged??s.imported??null,o=r?{...t.values,...r}:t.values,a=!!(o.banner||o.website||o.nip05||o.lud16);e.nostrProfileFormState={...t,importing:!1,values:o,error:null,success:s.saved?"Profile imported from relays. Review and publish.":"Profile imported. Review and publish.",showAdvanced:a},s.saved&&await Ce(e,!0)}catch(i){e.nostrProfileFormState={...t,importing:!1,error:`Profile import failed: ${String(i)}`,success:null}}}function Oa(e){var r;const t=(e??"").trim();if(!t)return null;const n=t.split(":").filter(Boolean);if(n.length<3||n[0]!=="agent")return null;const i=(r=n[1])==null?void 0:r.trim(),s=n.slice(2).join(":");return!i||!s?null:{agentId:i,rest:s}}const as=450;function $n(e,t=!1,n=!1){e.chatScrollFrame&&cancelAnimationFrame(e.chatScrollFrame),e.chatScrollTimeout!=null&&(clearTimeout(e.chatScrollTimeout),e.chatScrollTimeout=null);const i=()=>{const s=e.querySelector(".chat-thread");if(s){const r=getComputedStyle(s).overflowY;if(r==="auto"||r==="scroll"||s.scrollHeight-s.clientHeight>1)return s}return document.scrollingElement??document.documentElement};e.updateComplete.then(()=>{e.chatScrollFrame=requestAnimationFrame(()=>{e.chatScrollFrame=null;const s=i();if(!s)return;const r=s.scrollHeight-s.scrollTop-s.clientHeight,o=t&&!e.chatHasAutoScrolled;if(!(o||e.chatUserNearBottom||r<as)){e.chatNewMessagesBelow=!0;return}o&&(e.chatHasAutoScrolled=!0);const l=n&&(typeof window>"u"||typeof window.matchMedia!="function"||!window.matchMedia("(prefers-reduced-motion: reduce)").matches),c=s.scrollHeight;typeof s.scrollTo=="function"?s.scrollTo({top:c,behavior:l?"smooth":"auto"}):s.scrollTop=c,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1;const p=o?150:120;e.chatScrollTimeout=window.setTimeout(()=>{e.chatScrollTimeout=null;const u=i();if(!u)return;const f=u.scrollHeight-u.scrollTop-u.clientHeight;(o||e.chatUserNearBottom||f<as)&&(u.scrollTop=u.scrollHeight,e.chatUserNearBottom=!0)},p)})})}function Ba(e,t=!1){e.logsScrollFrame&&cancelAnimationFrame(e.logsScrollFrame),e.updateComplete.then(()=>{e.logsScrollFrame=requestAnimationFrame(()=>{e.logsScrollFrame=null;const n=e.querySelector(".log-stream");if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;(t||i<80)&&(n.scrollTop=n.scrollHeight)})})}function Cd(e,t){const n=t.currentTarget;if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;e.chatUserNearBottom=i<as,e.chatUserNearBottom&&(e.chatNewMessagesBelow=!1)}function Td(e,t){const n=t.currentTarget;if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;e.logsAtBottom=i<80}function oo(e){e.chatHasAutoScrolled=!1,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1}function Ed(e,t){if(e.length===0)return;const n=new Blob([`${e.join(`
`)}
`],{type:"text/plain"}),i=URL.createObjectURL(n),s=document.createElement("a"),r=new Date().toISOString().slice(0,19).replace(/[:T]/g,"-");s.href=i,s.download=`openclaw-logs-${t}-${r}.log`,s.click(),URL.revokeObjectURL(i)}function Rd(e){if(typeof ResizeObserver>"u")return;const t=e.querySelector(".topbar");if(!t)return;const n=()=>{const{height:i}=t.getBoundingClientRect();e.style.setProperty("--topbar-height",`${i}px`)};n(),e.topbarObserver=new ResizeObserver(()=>n()),e.topbarObserver.observe(t)}async function di(e){if(!(!e.client||!e.connected)&&!e.debugLoading){e.debugLoading=!0;try{const[t,n,i,s]=await Promise.all([e.client.request("status",{}),e.client.request("health",{}),e.client.request("models.list",{}),e.client.request("last-heartbeat",{})]);e.debugStatus=t,e.debugHealth=n;const r=i;e.debugModels=Array.isArray(r==null?void 0:r.models)?r==null?void 0:r.models:[],e.debugHeartbeat=s}catch(t){e.debugCallError=String(t)}finally{e.debugLoading=!1}}}async function Ld(e){if(!(!e.client||!e.connected)){e.debugCallError=null,e.debugCallResult=null;try{const t=e.debugCallParams.trim()?JSON.parse(e.debugCallParams):{},n=await e.client.request(e.debugCallMethod.trim(),t);e.debugCallResult=JSON.stringify(n,null,2)}catch(t){e.debugCallError=String(t)}}}const Id=2e3,Pd=new Set(["trace","debug","info","warn","error","fatal"]);function Dd(e){if(typeof e!="string")return null;const t=e.trim();if(!t.startsWith("{")||!t.endsWith("}"))return null;try{const n=JSON.parse(t);return!n||typeof n!="object"?null:n}catch{return null}}function Md(e){if(typeof e!="string")return null;const t=e.toLowerCase();return Pd.has(t)?t:null}function Fd(e){if(!e.trim())return{raw:e,message:e};try{const t=JSON.parse(e),n=t&&typeof t._meta=="object"&&t._meta!==null?t._meta:null,i=typeof t.time=="string"?t.time:typeof(n==null?void 0:n.date)=="string"?n==null?void 0:n.date:null,s=Md((n==null?void 0:n.logLevelName)??(n==null?void 0:n.level)),r=typeof t[0]=="string"?t[0]:typeof(n==null?void 0:n.name)=="string"?n==null?void 0:n.name:null,o=Dd(r);let a=null;o&&(typeof o.subsystem=="string"?a=o.subsystem:typeof o.module=="string"&&(a=o.module)),!a&&r&&r.length<120&&(a=r);let l=null;return typeof t[1]=="string"?l=t[1]:!o&&typeof t[0]=="string"?l=t[0]:typeof t.message=="string"&&(l=t.message),{raw:e,time:i,level:s,subsystem:a,message:l??e,meta:n??void 0}}catch{return{raw:e,message:e}}}async function zs(e,t){if(!(!e.client||!e.connected)&&!(e.logsLoading&&!(t!=null&&t.quiet))){t!=null&&t.quiet||(e.logsLoading=!0),e.logsError=null;try{const i=await e.client.request("logs.tail",{cursor:t!=null&&t.reset?void 0:e.logsCursor??void 0,limit:e.logsLimit,maxBytes:e.logsMaxBytes}),r=(Array.isArray(i.lines)?i.lines.filter(a=>typeof a=="string"):[]).map(Fd),o=!!(t!=null&&t.reset||i.reset||e.logsCursor==null);e.logsEntries=o?r:[...e.logsEntries,...r].slice(-Id),typeof i.cursor=="number"&&(e.logsCursor=i.cursor),typeof i.file=="string"&&(e.logsFile=i.file),e.logsTruncated=!!i.truncated,e.logsLastFetchAt=Date.now()}catch(n){e.logsError=String(n)}finally{t!=null&&t.quiet||(e.logsLoading=!1)}}}async function ui(e,t){if(!(!e.client||!e.connected)&&!e.nodesLoading){e.nodesLoading=!0,t!=null&&t.quiet||(e.lastError=null);try{const n=await e.client.request("node.list",{});e.nodes=Array.isArray(n.nodes)?n.nodes:[]}catch(n){t!=null&&t.quiet||(e.lastError=String(n))}finally{e.nodesLoading=!1}}}function Nd(e){e.nodesPollInterval==null&&(e.nodesPollInterval=window.setInterval(()=>void ui(e,{quiet:!0}),5e3))}function Od(e){e.nodesPollInterval!=null&&(clearInterval(e.nodesPollInterval),e.nodesPollInterval=null)}function Hs(e){e.logsPollInterval==null&&(e.logsPollInterval=window.setInterval(()=>{e.tab==="logs"&&zs(e,{quiet:!0})},2e3))}function js(e){e.logsPollInterval!=null&&(clearInterval(e.logsPollInterval),e.logsPollInterval=null)}function Ks(e){e.debugPollInterval==null&&(e.debugPollInterval=window.setInterval(()=>{e.tab==="debug"&&di(e)},3e3))}function qs(e){e.debugPollInterval!=null&&(clearInterval(e.debugPollInterval),e.debugPollInterval=null)}async function Ua(e,t){if(!(!e.client||!e.connected||e.agentIdentityLoading)&&!e.agentIdentityById[t]){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{const n=await e.client.request("agent.identity.get",{agentId:t});n&&(e.agentIdentityById={...e.agentIdentityById,[t]:n})}catch(n){e.agentIdentityError=String(n)}finally{e.agentIdentityLoading=!1}}}async function za(e,t){if(!e.client||!e.connected||e.agentIdentityLoading)return;const n=t.filter(i=>!e.agentIdentityById[i]);if(n.length!==0){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{for(const i of n){const s=await e.client.request("agent.identity.get",{agentId:i});s&&(e.agentIdentityById={...e.agentIdentityById,[i]:s})}}catch(i){e.agentIdentityError=String(i)}finally{e.agentIdentityLoading=!1}}}async function Wn(e,t){if(!(!e.client||!e.connected)&&!e.agentSkillsLoading){e.agentSkillsLoading=!0,e.agentSkillsError=null;try{const n=await e.client.request("skills.status",{agentId:t});n&&(e.agentSkillsReport=n,e.agentSkillsAgentId=t)}catch(n){e.agentSkillsError=String(n)}finally{e.agentSkillsLoading=!1}}}async function Ws(e){var t;if(!(!e.client||!e.connected)&&!e.agentsLoading){e.agentsLoading=!0,e.agentsError=null;try{const n=await e.client.request("agents.list",{});if(n){e.agentsList=n;const i=e.agentsSelectedId,s=n.agents.some(r=>r.id===i);(!i||!s)&&(e.agentsSelectedId=n.defaultId??((t=n.agents[0])==null?void 0:t.id)??null)}}catch(n){e.agentsError=String(n)}finally{e.agentsLoading=!1}}}function Gs(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}async function Bd(e){try{const n=await(await fetch(Gs(e.basePath,"/api/business-knowledge/dependent-files"))).json().catch(()=>({}));n.success&&n.data?e.bkDependentFiles={mapping_table:n.data.mapping_table??"",price_library:n.data.price_library??""}:e.bkDependentFiles=null}catch{e.bkDependentFiles=null}}async function Ha(e){e.bkLoading=!0,e.bkError=null,Bd(e);try{const t=await fetch(Gs(e.basePath,"/api/business-knowledge")),n=await t.json().catch(()=>({}));n.success&&n.data&&typeof n.data.content=="string"?e.bkContent=n.data.content:(e.bkContent="",t.ok||(e.bkError=n.detail??`HTTP ${t.status}`))}catch(t){e.bkError=t instanceof Error?t.message:String(t),e.bkContent=""}finally{e.bkLoading=!1}}async function Ud(e,t){e.bkSaving=!0,e.bkError=null;try{const n=await fetch(Gs(e.basePath,"/api/business-knowledge"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:t})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(e.bkContent=t,e.bkLastSuccess=Date.now(),!0):(e.bkError=i.detail??`HTTP ${n.status}`,!1)}catch(n){return e.bkError=n instanceof Error?n.message:String(n),!1}finally{e.bkSaving=!1}}function ja(e){if(e==null||!Number.isFinite(e))return"n/a";const t=Math.floor(e/1e3),n=Math.floor(t/60),i=Math.floor(n/60);return i>0?`${i}h`:n>0?`${n}m`:t>0?`${t}s`:"<1s"}function _t(e){if(e==null||!Number.isFinite(e))return"n/a";const t=Date.now(),n=e-t,i=Math.abs(n),s=Math.floor(i/6e4),r=Math.floor(s/60),o=Math.floor(r/24);return n>0?s<1?"in <1m":s<60?`in ${s}m`:r<24?`in ${r}h`:`in ${o}d`:i<15e3?"just now":s<60?`${s}m ago`:r<24?`${r}h ago`:`${o}d ago`}function zd(e,t){return!e||typeof e!="string"?"":e.replace(/<think>[\s\S]*?<\/think>/gi,"").trim()}function Xn(e){return!e&&e!==0?"n/a":new Date(e).toLocaleString()}function ls(e){return!e||e.length===0?"none":e.filter(t=>!!(t&&t.trim())).join(", ")}function cs(e,t=120){return e.length<=t?e:`${e.slice(0,Math.max(0,t-1))}…`}function Ka(e,t){return e.length<=t?{text:e,truncated:!1,total:e.length}:{text:e.slice(0,Math.max(0,t)),truncated:!0,total:e.length}}function ao(e,t){const n=Number(e);return Number.isFinite(n)?n:t}function Ui(e){return zd(e)}async function qa(e){if(!(!e.client||!e.connected))try{const t=await e.client.request("cron.status",{});e.cronStatus=t}catch(t){e.cronError=String(t)}}async function Hd(e){if(!(!e.client||!e.connected)&&!e.cronLoading){e.cronLoading=!0,e.cronError=null;try{const t=await e.client.request("cron.list",{includeDisabled:!0});e.cronJobs=Array.isArray(t.jobs)?t.jobs:[]}catch(t){e.cronError=String(t)}finally{e.cronLoading=!1}}}class le extends Error{constructor(t,n){super(`Invalid response schema from ${t}: ${n}`),this.name="ResponseSchemaError",this.endpoint=t}}function Wa(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Y(e,t,n="response"){if(!Wa(e))throw new le(t,`${n} must be an object`);return e}function rt(e,t,n){if(!Array.isArray(e))throw new le(t,`${n} must be an array`);return e}function tt(e,t,n){if(typeof e!="string")throw new le(t,`${n} must be a string`);return e}function pi(e,t,n){if(typeof e!="number"||Number.isNaN(e))throw new le(t,`${n} must be a number`);return e}function z(e){return typeof e=="string"?e:void 0}function he(e){return typeof e=="number"&&Number.isFinite(e)?e:void 0}function Vs(e){return typeof e=="boolean"?e:void 0}function me(e,t){return Wa(e)?typeof e.detail=="string"&&e.detail.trim()?e.detail.trim():typeof e.error=="string"&&e.error.trim()?e.error.trim():typeof e.message=="string"&&e.message.trim()?e.message.trim():t:t}function ee(e,t,n,i){return`${e}失败：${t}。影响：${n}。下一步：${i}`}const Pn="/api/quotation-drafts",lo="/api/quotation-drafts/{id}",jd="/api/quotation-drafts/{id}/confirm",co=new WeakMap;function Kd(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const r=new URLSearchParams(n);return`${s}?${r.toString()}`}function qd(e,t){var s;const n=globalThis,i=typeof((s=n.crypto)==null?void 0:s.randomUUID)=="function"?n.crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2,10)}`;return`${e}:${t}:${i}`}function Wd(e){let t=co.get(e);return t||(t=new Map,co.set(e,t)),t}function Ga(e,t){const n=Y(e,t,"data[]"),s=he(n.id)??Number(n.id);return{id:Number.isFinite(s)?s:0,draft_no:tt(n.draft_no,t,"data[].draft_no"),name:tt(n.name,t,"data[].name"),source:z(n.source),file_path:typeof n.file_path=="string"?n.file_path:null,created_at:z(n.created_at)??null,status:tt(n.status,t,"data[].status"),confirmed_at:z(n.confirmed_at)??null}}function Gd(e,t){const n=Y(e,t,"data"),i=Ga(n,t),r=rt(n.lines,t,"data.lines").map(o=>Y(o,t,"data.lines[]"));return{...i,lines:r}}function Vd(e,t){const n=Y(e,t),i=n.data!=null?Y(n.data,t,"data"):{},s=z(i.order_id)??z(n.order_id),r=z(i.message)??z(n.message)??"已确认成单";return{order_id:s,message:r}}async function Qs(e){e.fulfillDraftsLoading=!0,e.fulfillDraftsError=null;try{const t=Kd(e.basePath,Pn,{status:"pending",limit:"50"}),n=await fetch(t),i=await n.json().catch(()=>({}));if(!n.ok){e.fulfillDraftsError=ee("加载待确认报价单列表",me(i,`HTTP ${n.status}`),"无法查看最新待确认报价单","点击“重试”重新加载列表"),e.fulfillDrafts=[];return}const s=Y(i,Pn),r=rt(s.data,Pn,"data");e.fulfillDrafts=r.map(o=>Ga(o,Pn)).filter(o=>o.id>0)}catch(t){const n=t instanceof le||t instanceof Error?t.message:String(t);e.fulfillDraftsError=ee("加载待确认报价单列表",n,"列表可能为空或字段错位","检查后端返回字段后重试"),e.fulfillDrafts=[]}finally{e.fulfillDraftsLoading=!1}}async function Qd(e,t){var n;e.fulfillDetailId=t;try{const i=(n=e.basePath)!=null&&n.trim()?`${e.basePath.replace(/\/$/,"")}/api/quotation-drafts/${t}`:`/api/quotation-drafts/${t}`,s=await fetch(i),r=await s.json().catch(()=>({}));if(!s.ok){e.fulfillDetail=null,e.fulfillConfirmResult={message:ee("加载报价单详情",me(r,`HTTP ${s.status}`),"无法确认该报价单","点击“重试”或返回列表后重选")};return}const o=Y(r,lo);e.fulfillDetail=Gd(o.data,lo)}catch(i){const s=i instanceof le||i instanceof Error?i.message:String(i);e.fulfillDetail=null,e.fulfillConfirmResult={message:ee("加载报价单详情",s,"无法确认该报价单","点击“重试”或返回列表后重选")}}}async function Jd(e,t){const n=Wd(e),i=n.get(t);if(i)return i;const s=(async()=>{var r;e.fulfillConfirmBusy=!0,e.fulfillConfirmResult=null;try{const o=(r=e.basePath)!=null&&r.trim()?`${e.basePath.replace(/\/$/,"")}/api/quotation-drafts/${t}/confirm`:`/api/quotation-drafts/${t}/confirm`,a=qd("fulfill-confirm",String(t)),l=await fetch(o,{method:"PATCH",headers:{"X-Idempotency-Key":a,"Idempotency-Key":a}}),c=await l.json().catch(()=>({}));if(!l.ok)return e.fulfillConfirmResult={message:ee("确认成单",me(c,`HTTP ${l.status}`),"该报价单仍为待确认，库存未锁定","点击“重试”再次确认")},e.fulfillConfirmResult;const p=Vd(c,jd);return e.fulfillConfirmResult=p,e.fulfillDetail=null,e.fulfillDetailId=null,await Qs(e),p}catch(o){const a=o instanceof le||o instanceof Error?o.message:String(o);return e.fulfillConfirmResult={message:ee("确认成单",a,"该报价单仍为待确认，库存未锁定","点击“重试”再次确认")},e.fulfillConfirmResult}finally{e.fulfillConfirmBusy=!1,n.delete(t)}})();return n.set(t,s),s}function Le(e){return`${e.product_key??""}	${e.specification??""}	${e.code??""}`}const Dn="/api/shortage/list",an="/api/procurement/approve",ne="/api/replenishment-drafts",uo=new WeakMap;function Yd(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const r=new URLSearchParams(n);return`${s}?${r.toString()}`}function Xd(e,t){var s;const n=globalThis,i=typeof((s=n.crypto)==null?void 0:s.randomUUID)=="function"?n.crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2,10)}`;return`${e}:${t}:${i}`}function Zd(e){let t=uo.get(e);return t||(t=new Map,uo.set(e,t)),t}function Ue(e){const t=he(e);if(t!=null)return t;const n=Number(e);return Number.isFinite(n)?n:void 0}function eu(e,t){const n=Y(e,t,"data[]");return{id:Ue(n.id),product_name:z(n.product_name),specification:z(n.specification),quantity:Ue(n.quantity),available_qty:Ue(n.available_qty),shortfall:Ue(n.shortfall),code:z(n.code),quote_name:z(n.quote_name),unit_price:Ue(n.unit_price),file_name:z(n.file_name),uploaded_at:z(n.uploaded_at)??null,product_key:z(n.product_key),count:Ue(n.count)}}function tu(e){const t=new Map;for(const n of e){const i=Le(n);if(!i.trim())continue;const s=t.get(i);if(!s){t.set(i,n);continue}const r=Number(s.count??0),o=Number(n.count??0),a=s.uploaded_at?new Date(s.uploaded_at).getTime():0,l=n.uploaded_at?new Date(n.uploaded_at).getTime():0;(o>r||o===r&&l>=a)&&t.set(i,n)}return Array.from(t.values())}function nu(e){const t=Y(e,an),n=t.data!=null?Y(t.data,an,"data"):{},i=he(t.approved_count)??he(n.approved_count)??(t.approved_count!=null?pi(t.approved_count,an,"approved_count"):void 0),s=z(t.message)??z(n.message)??"已批准并通知采购员。";return{approved_count:i,message:s}}function iu(e){return e.map(n=>`${n.product_key??""}|${n.product_name??""}|${n.specification??""}|${n.code??""}|${n.shortfall??0}`).sort().join(";")}async function Js(e){e.procurementLoading=!0,e.procurementError=null;try{const t=Yd(e.basePath,Dn,{limit:"200",unapproved_only:"1"}),n=await fetch(t),i=await n.json().catch(()=>({}));if(!n.ok){e.procurementError=ee("加载采购建议列表",me(i,`HTTP ${n.status}`),"无法查看最新缺货采购建议","点击“重试”重新加载列表"),e.procurementSuggestions=[];return}const s=Y(i,Dn),r=rt(s.data,Dn,"data");e.procurementSuggestions=tu(r.map(o=>eu(o,Dn)))}catch(t){const n=t instanceof le||t instanceof Error?t.message:String(t);e.procurementError=ee("加载采购建议列表",n,"列表可能为空或字段错位","检查后端返回字段后重试"),e.procurementSuggestions=[]}finally{e.procurementLoading=!1}}async function po(e,t){if(!t.length)return null;const n=iu(t),i=Zd(e),s=i.get(n);if(s)return s;const r=(async()=>{var o;e.procurementApproveBusy=!0,e.procurementApproveResult=null;try{const a=(o=e.basePath)!=null&&o.trim()?`${e.basePath.replace(/\/$/,"")}${an}`:an,l=Xd("procurement-approve",n||"single"),c=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json","X-Idempotency-Key":l,"Idempotency-Key":l},body:JSON.stringify({items:t})}),p=await c.json().catch(()=>({}));if(!c.ok)return e.procurementApproveResult={message:ee("采购批准",me(p,`HTTP ${c.status}`),"这些缺货项仍待批准，采购员未收到通知","点击“重试”再次批准")},e.procurementApproveResult;const u=nu(p);return e.procurementApproveResult=u,await Js(e),u}catch(a){const l=a instanceof le||a instanceof Error?a.message:String(a);return e.procurementApproveResult={message:ee("采购批准",l,"这些缺货项仍待批准，采购员未收到通知","点击“重试”再次批准")},e.procurementApproveResult}finally{e.procurementApproveBusy=!1,i.delete(n)}})();return i.set(n,r),r}async function xn(e){var t;e.replenishmentLoading=!0,e.replenishmentError=null;try{const n=(t=e.basePath)!=null&&t.trim()?e.basePath.replace(/\/$/,""):"",i=n?`${n}${ne}`:ne,s=await fetch(i),r=await s.json().catch(()=>({}));if(!s.ok){e.replenishmentError=ee("加载补货单列表",me(r,`HTTP ${s.status}`),"无法查看补货单列表","点击“重试”重新加载列表"),e.replenishmentDrafts=[];return}const o=Y(r,ne),a=rt(o.data,ne,"data");e.replenishmentDrafts=a.map(l=>{const c=Y(l,ne,"data[]");return{id:pi(c.id,ne,"id"),draft_no:z(c.draft_no)??"",name:z(c.name)??"",source:z(c.source)??void 0,created_at:z(c.created_at),status:z(c.status)??"",confirmed_at:z(c.confirmed_at)}})}catch(n){const i=n instanceof le||n instanceof Error?n.message:String(n);e.replenishmentError=ee("加载补货单列表",i,"补货单列表可能为空或字段错位","检查后端返回字段后重试"),e.replenishmentDrafts=[]}finally{e.replenishmentLoading=!1}}async function su(e,t){var n;e.replenishmentLoading=!0,e.replenishmentError=null;try{const i=(n=e.basePath)!=null&&n.trim()?e.basePath.replace(/\/$/,""):"",s=i?`${i}${ne}/${t}`:`${ne}/${t}`,r=await fetch(s),o=await r.json().catch(()=>({}));if(!r.ok){e.replenishmentError=ee("加载补货单详情",me(o,`HTTP ${r.status}`),"无法查看补货单详情","稍后重试"),e.replenishmentDetail=null,e.replenishmentDetailId=null;return}const a=Y(o,ne,"detail"),l=Y(a.data,ne,"data"),p=rt(l.lines,ne,"data.lines").map(u=>{const f=Y(u,ne,"data.lines[]");return{id:Ue(f.id),row_index:Ue(f.row_index),code:z(f.code),product_name:z(f.product_name),specification:z(f.specification),quantity:Ue(f.quantity)??0,current_qty:Ue(f.current_qty),memo:z(f.memo)}});e.replenishmentDetail={id:pi(l.id,ne,"id"),draft_no:z(l.draft_no)??"",name:z(l.name)??"",source:z(l.source)??void 0,created_at:z(l.created_at),status:z(l.status)??"",confirmed_at:z(l.confirmed_at),lines:p},e.replenishmentDetailId=e.replenishmentDetail.id}catch(i){const s=i instanceof le||i instanceof Error?i.message:String(i);e.replenishmentError=ee("加载补货单详情",s,"无法查看补货单详情","稍后重试"),e.replenishmentDetail=null,e.replenishmentDetailId=null}finally{e.replenishmentLoading=!1}}async function ru(e,t){var u;const n=t.filter(f=>{const b=typeof f.product_or_code=="string"?f.product_or_code.trim():"",x=Number(f.quantity);return b.length>0&&x>0});if(n.length===0)return null;const i={lines:n.map(f=>({product_or_code:typeof f.product_or_code=="string"?f.product_or_code.trim():"",quantity:Number(f.quantity)}))},s=(u=e.basePath)!=null&&u.trim()?e.basePath.replace(/\/$/,""):"",r=s?`${s}${ne}`:ne,o=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}),a=await o.json().catch(()=>({}));if(!o.ok)return e.replenishmentError=ee("生成补货单",me(a,`HTTP ${o.status}`),"补货单未创建","请检查输入后重试"),null;const l=Y(a,ne),c=l.data!=null?Y(l.data,ne,"data"):{},p=pi(c.id,ne,"data.id");return await xn(e),{id:p}}async function ou(e,t){var n;e.replenishmentConfirmBusy=!0,e.replenishmentConfirmResult=null;try{const i=(n=e.basePath)!=null&&n.trim()?e.basePath.replace(/\/$/,""):"",s=i?`${i}${ne}/${t}/confirm`:`${ne}/${t}/confirm`,r=await fetch(s,{method:"PATCH"}),o=await r.json().catch(()=>({}));if(!r.ok){e.replenishmentConfirmResult={message:ee("确认补货单",me(o,`HTTP ${r.status}`),"补货未执行","稍后重试")};return}const a=Y(o,ne,"confirm"),l=Y(a.data,ne,"data"),c=he(l.executed),p=z(l.message);e.replenishmentConfirmResult={executed:c??void 0,message:p||`已执行 ${c??0} 条补货操作。`},await xn(e)}catch(i){const s=i instanceof le||i instanceof Error?i.message:String(i);e.replenishmentConfirmResult={message:ee("确认补货单",s,"补货未执行","稍后重试")}}finally{e.replenishmentConfirmBusy=!1}}async function au(e,t){var r;const n=(r=e.basePath)!=null&&r.trim()?e.basePath.replace(/\/$/,""):"",i=n?`${n}${ne}/${t}`:`${ne}/${t}`,s=await fetch(i,{method:"DELETE"});if(!s.ok){const o=await s.json().catch(()=>({}));return e.replenishmentError=ee("删除补货单",me(o,`HTTP ${s.status}`),"补货单未删除","请重试"),!1}return e.replenishmentDetailId===t&&(e.replenishmentDetail=null,e.replenishmentDetailId=null),await xn(e),!0}function Ys(e){return(e??"").trim().toLowerCase()||"viewer"}function lu(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").map(t=>t.trim()).filter(Boolean):[]}const Va="openclaw.device.auth.v1";function Xs(){try{const e=window.localStorage.getItem(Va);if(!e)return null;const t=JSON.parse(e);return!t||t.version!==1||!t.deviceId||typeof t.deviceId!="string"||!t.tokens||typeof t.tokens!="object"?null:t}catch{return null}}function Qa(e){try{window.localStorage.setItem(Va,JSON.stringify(e))}catch{}}function cu(e){const t=Xs();if(!t||t.deviceId!==e.deviceId)return null;const n=Ys(e.role),i=t.tokens[n];return!i||typeof i.token!="string"?null:i}function Ja(e){const t=Ys(e.role),n={version:1,deviceId:e.deviceId,tokens:{}},i=Xs();i&&i.deviceId===e.deviceId&&(n.tokens={...i.tokens});const s={token:e.token,role:t,scopes:lu(e.scopes),updatedAtMs:Date.now()};return n.tokens[t]=s,Qa(n),s}function Ya(e){const t=Xs();if(!t||t.deviceId!==e.deviceId)return;const n=Ys(e.role);if(!t.tokens[n])return;const i={...t,tokens:{...t.tokens}};delete i.tokens[n],Qa(i)}/*! noble-ed25519 - MIT License (c) 2019 Paul Miller (paulmillr.com) */const Xa={p:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffedn,n:0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn,h:8n,a:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffecn,d:0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3n,Gx:0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an,Gy:0x6666666666666666666666666666666666666666666666666666666666666658n},{p:ge,n:Gn,Gx:fo,Gy:go,a:zi,d:Hi,h:du}=Xa,wt=32,Zs=64,uu=(...e)=>{"captureStackTrace"in Error&&typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(...e)},de=(e="")=>{const t=new Error(e);throw uu(t,de),t},pu=e=>typeof e=="bigint",fu=e=>typeof e=="string",gu=e=>e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array",ot=(e,t,n="")=>{const i=gu(e),s=e==null?void 0:e.length,r=t!==void 0;if(!i||r&&s!==t){const o=n&&`"${n}" `,a=r?` of length ${t}`:"",l=i?`length=${s}`:`type=${typeof e}`;de(o+"expected Uint8Array"+a+", got "+l)}return e},fi=e=>new Uint8Array(e),Za=e=>Uint8Array.from(e),el=(e,t)=>e.toString(16).padStart(t,"0"),tl=e=>Array.from(ot(e)).map(t=>el(t,2)).join(""),Qe={_0:48,_9:57,A:65,F:70,a:97,f:102},ho=e=>{if(e>=Qe._0&&e<=Qe._9)return e-Qe._0;if(e>=Qe.A&&e<=Qe.F)return e-(Qe.A-10);if(e>=Qe.a&&e<=Qe.f)return e-(Qe.a-10)},nl=e=>{const t="hex invalid";if(!fu(e))return de(t);const n=e.length,i=n/2;if(n%2)return de(t);const s=fi(i);for(let r=0,o=0;r<i;r++,o+=2){const a=ho(e.charCodeAt(o)),l=ho(e.charCodeAt(o+1));if(a===void 0||l===void 0)return de(t);s[r]=a*16+l}return s},il=()=>globalThis==null?void 0:globalThis.crypto,hu=()=>{var e;return((e=il())==null?void 0:e.subtle)??de("crypto.subtle must be defined, consider polyfill")},vn=(...e)=>{const t=fi(e.reduce((i,s)=>i+ot(s).length,0));let n=0;return e.forEach(i=>{t.set(i,n),n+=i.length}),t},mu=(e=wt)=>il().getRandomValues(fi(e)),Zn=BigInt,ft=(e,t,n,i="bad number: out of range")=>pu(e)&&t<=e&&e<n?e:de(i),D=(e,t=ge)=>{const n=e%t;return n>=0n?n:t+n},sl=e=>D(e,Gn),vu=(e,t)=>{(e===0n||t<=0n)&&de("no inverse n="+e+" mod="+t);let n=D(e,t),i=t,s=0n,r=1n;for(;n!==0n;){const o=i/n,a=i%n,l=s-r*o;i=n,n=a,s=r,r=l}return i===1n?D(s,t):de("no inverse")},yu=e=>{const t=ll[e];return typeof t!="function"&&de("hashes."+e+" not set"),t},ji=e=>e instanceof $t?e:de("Point expected"),ds=2n**256n,Be=class Be{constructor(t,n,i,s){G(this,"X");G(this,"Y");G(this,"Z");G(this,"T");const r=ds;this.X=ft(t,0n,r),this.Y=ft(n,0n,r),this.Z=ft(i,1n,r),this.T=ft(s,0n,r),Object.freeze(this)}static CURVE(){return Xa}static fromAffine(t){return new Be(t.x,t.y,1n,D(t.x*t.y))}static fromBytes(t,n=!1){const i=Hi,s=Za(ot(t,wt)),r=t[31];s[31]=r&-129;const o=ol(s);ft(o,0n,n?ds:ge);const l=D(o*o),c=D(l-1n),p=D(i*l+1n);let{isValid:u,value:f}=wu(c,p);u||de("bad point: y not sqrt");const b=(f&1n)===1n,x=(r&128)!==0;return!n&&f===0n&&x&&de("bad point: x==0, isLastByteOdd"),x!==b&&(f=D(-f)),new Be(f,o,1n,D(f*o))}static fromHex(t,n){return Be.fromBytes(nl(t),n)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}assertValidity(){const t=zi,n=Hi,i=this;if(i.is0())return de("bad point: ZERO");const{X:s,Y:r,Z:o,T:a}=i,l=D(s*s),c=D(r*r),p=D(o*o),u=D(p*p),f=D(l*t),b=D(p*D(f+c)),x=D(u+D(n*D(l*c)));if(b!==x)return de("bad point: equation left != right (1)");const k=D(s*r),S=D(o*a);return k!==S?de("bad point: equation left != right (2)"):this}equals(t){const{X:n,Y:i,Z:s}=this,{X:r,Y:o,Z:a}=ji(t),l=D(n*a),c=D(r*s),p=D(i*a),u=D(o*s);return l===c&&p===u}is0(){return this.equals(Ft)}negate(){return new Be(D(-this.X),this.Y,this.Z,D(-this.T))}double(){const{X:t,Y:n,Z:i}=this,s=zi,r=D(t*t),o=D(n*n),a=D(2n*D(i*i)),l=D(s*r),c=t+n,p=D(D(c*c)-r-o),u=l+o,f=u-a,b=l-o,x=D(p*f),k=D(u*b),S=D(p*b),E=D(f*u);return new Be(x,k,E,S)}add(t){const{X:n,Y:i,Z:s,T:r}=this,{X:o,Y:a,Z:l,T:c}=ji(t),p=zi,u=Hi,f=D(n*o),b=D(i*a),x=D(r*u*c),k=D(s*l),S=D((n+i)*(o+a)-f-b),E=D(k-x),M=D(k+x),N=D(b-p*f),I=D(S*E),_=D(M*N),h=D(S*N),A=D(E*M);return new Be(I,_,A,h)}subtract(t){return this.add(ji(t).negate())}multiply(t,n=!0){if(!n&&(t===0n||this.is0()))return Ft;if(ft(t,1n,Gn),t===1n)return this;if(this.equals(xt))return Lu(t).p;let i=Ft,s=xt;for(let r=this;t>0n;r=r.double(),t>>=1n)t&1n?i=i.add(r):n&&(s=s.add(r));return i}multiplyUnsafe(t){return this.multiply(t,!1)}toAffine(){const{X:t,Y:n,Z:i}=this;if(this.equals(Ft))return{x:0n,y:1n};const s=vu(i,ge);D(i*s)!==1n&&de("invalid inverse");const r=D(t*s),o=D(n*s);return{x:r,y:o}}toBytes(){const{x:t,y:n}=this.assertValidity().toAffine(),i=rl(n);return i[31]|=t&1n?128:0,i}toHex(){return tl(this.toBytes())}clearCofactor(){return this.multiply(Zn(du),!1)}isSmallOrder(){return this.clearCofactor().is0()}isTorsionFree(){let t=this.multiply(Gn/2n,!1).double();return Gn%2n&&(t=t.add(this)),t.is0()}};G(Be,"BASE"),G(Be,"ZERO");let $t=Be;const xt=new $t(fo,go,1n,D(fo*go)),Ft=new $t(0n,1n,1n,0n);$t.BASE=xt;$t.ZERO=Ft;const rl=e=>nl(el(ft(e,0n,ds),Zs)).reverse(),ol=e=>Zn("0x"+tl(Za(ot(e)).reverse())),Fe=(e,t)=>{let n=e;for(;t-- >0n;)n*=n,n%=ge;return n},bu=e=>{const n=e*e%ge*e%ge,i=Fe(n,2n)*n%ge,s=Fe(i,1n)*e%ge,r=Fe(s,5n)*s%ge,o=Fe(r,10n)*r%ge,a=Fe(o,20n)*o%ge,l=Fe(a,40n)*a%ge,c=Fe(l,80n)*l%ge,p=Fe(c,80n)*l%ge,u=Fe(p,10n)*r%ge;return{pow_p_5_8:Fe(u,2n)*e%ge,b2:n}},mo=0x2b8324804fc1df0b2b4d00993dfbd7a72f431806ad2fe478c4ee1b274a0ea0b0n,wu=(e,t)=>{const n=D(t*t*t),i=D(n*n*t),s=bu(e*i).pow_p_5_8;let r=D(e*n*s);const o=D(t*r*r),a=r,l=D(r*mo),c=o===e,p=o===D(-e),u=o===D(-e*mo);return c&&(r=a),(p||u)&&(r=l),(D(r)&1n)===1n&&(r=D(-r)),{isValid:c||p,value:r}},us=e=>sl(ol(e)),er=(...e)=>ll.sha512Async(vn(...e)),$u=(...e)=>yu("sha512")(vn(...e)),al=e=>{const t=e.slice(0,wt);t[0]&=248,t[31]&=127,t[31]|=64;const n=e.slice(wt,Zs),i=us(t),s=xt.multiply(i),r=s.toBytes();return{head:t,prefix:n,scalar:i,point:s,pointBytes:r}},tr=e=>er(ot(e,wt)).then(al),xu=e=>al($u(ot(e,wt))),ku=e=>tr(e).then(t=>t.pointBytes),Su=e=>er(e.hashable).then(e.finish),_u=(e,t,n)=>{const{pointBytes:i,scalar:s}=e,r=us(t),o=xt.multiply(r).toBytes();return{hashable:vn(o,i,n),finish:c=>{const p=sl(r+us(c)*s);return ot(vn(o,rl(p)),Zs)}}},Au=async(e,t)=>{const n=ot(e),i=await tr(t),s=await er(i.prefix,n);return Su(_u(i,s,n))},ll={sha512Async:async e=>{const t=hu(),n=vn(e);return fi(await t.digest("SHA-512",n.buffer))},sha512:void 0},Cu=(e=mu(wt))=>e,Tu={getExtendedPublicKeyAsync:tr,getExtendedPublicKey:xu,randomSecretKey:Cu},ei=8,Eu=256,cl=Math.ceil(Eu/ei)+1,ps=2**(ei-1),Ru=()=>{const e=[];let t=xt,n=t;for(let i=0;i<cl;i++){n=t,e.push(n);for(let s=1;s<ps;s++)n=n.add(t),e.push(n);t=n.double()}return e};let vo;const yo=(e,t)=>{const n=t.negate();return e?n:t},Lu=e=>{const t=vo||(vo=Ru());let n=Ft,i=xt;const s=2**ei,r=s,o=Zn(s-1),a=Zn(ei);for(let l=0;l<cl;l++){let c=Number(e&o);e>>=a,c>ps&&(c-=r,e+=1n);const p=l*ps,u=p,f=p+Math.abs(c)-1,b=l%2!==0,x=c<0;c===0?i=i.add(yo(b,t[u])):n=n.add(yo(x,t[f]))}return e!==0n&&de("invalid wnaf"),{p:n,f:i}},Ki="openclaw-device-identity-v1";function fs(e){let t="";for(const n of e)t+=String.fromCharCode(n);return btoa(t).replaceAll("+","-").replaceAll("/","_").replace(/=+$/g,"")}function dl(e){const t=e.replaceAll("-","+").replaceAll("_","/"),n=t+"=".repeat((4-t.length%4)%4),i=atob(n),s=new Uint8Array(i.length);for(let r=0;r<i.length;r+=1)s[r]=i.charCodeAt(r);return s}function Iu(e){return Array.from(e).map(t=>t.toString(16).padStart(2,"0")).join("")}async function ul(e){const t=await crypto.subtle.digest("SHA-256",e.slice().buffer);return Iu(new Uint8Array(t))}async function Pu(){const e=Tu.randomSecretKey(),t=await ku(e);return{deviceId:await ul(t),publicKey:fs(t),privateKey:fs(e)}}async function nr(){try{const n=localStorage.getItem(Ki);if(n){const i=JSON.parse(n);if((i==null?void 0:i.version)===1&&typeof i.deviceId=="string"&&typeof i.publicKey=="string"&&typeof i.privateKey=="string"){const s=await ul(dl(i.publicKey));if(s!==i.deviceId){const r={...i,deviceId:s};return localStorage.setItem(Ki,JSON.stringify(r)),{deviceId:s,publicKey:i.publicKey,privateKey:i.privateKey}}return{deviceId:i.deviceId,publicKey:i.publicKey,privateKey:i.privateKey}}}}catch{}const e=await Pu(),t={version:1,deviceId:e.deviceId,publicKey:e.publicKey,privateKey:e.privateKey,createdAtMs:Date.now()};return localStorage.setItem(Ki,JSON.stringify(t)),e}async function Du(e,t){const n=dl(e),i=new TextEncoder().encode(t),s=await Au(i,n);return fs(s)}async function at(e,t){if(!(!e.client||!e.connected)&&!e.devicesLoading){e.devicesLoading=!0,t!=null&&t.quiet||(e.devicesError=null);try{const n=await e.client.request("device.pair.list",{});e.devicesList={pending:Array.isArray(n==null?void 0:n.pending)?n.pending:[],paired:Array.isArray(n==null?void 0:n.paired)?n.paired:[]}}catch(n){t!=null&&t.quiet||(e.devicesError=String(n))}finally{e.devicesLoading=!1}}}async function Mu(e,t){if(!(!e.client||!e.connected))try{await e.client.request("device.pair.approve",{requestId:t}),await at(e)}catch(n){e.devicesError=String(n)}}async function Fu(e,t){if(!(!e.client||!e.connected||!window.confirm("Reject this device pairing request?")))try{await e.client.request("device.pair.reject",{requestId:t}),await at(e)}catch(i){e.devicesError=String(i)}}async function Nu(e,t){if(!(!e.client||!e.connected))try{const n=await e.client.request("device.token.rotate",t);if(n!=null&&n.token){const i=await nr(),s=n.role??t.role;(n.deviceId===i.deviceId||t.deviceId===i.deviceId)&&Ja({deviceId:i.deviceId,role:s,token:n.token,scopes:n.scopes??t.scopes??[]}),window.prompt("New device token (copy and store securely):",n.token)}await at(e)}catch(n){e.devicesError=String(n)}}async function Ou(e,t){if(!(!e.client||!e.connected||!window.confirm(`Revoke token for ${t.deviceId} (${t.role})?`)))try{await e.client.request("device.token.revoke",t);const i=await nr();t.deviceId===i.deviceId&&Ya({deviceId:i.deviceId,role:t.role}),await at(e)}catch(i){e.devicesError=String(i)}}function Bu(e){if(!e||e.kind==="gateway")return{method:"exec.approvals.get",params:{}};const t=e.nodeId.trim();return t?{method:"exec.approvals.node.get",params:{nodeId:t}}:null}function Uu(e,t){if(!e||e.kind==="gateway")return{method:"exec.approvals.set",params:t};const n=e.nodeId.trim();return n?{method:"exec.approvals.node.set",params:{...t,nodeId:n}}:null}async function ir(e,t){if(!(!e.client||!e.connected)&&!e.execApprovalsLoading){e.execApprovalsLoading=!0,e.lastError=null;try{const n=Bu(t);if(!n){e.lastError="Select a node before loading exec approvals.";return}const i=await e.client.request(n.method,n.params);zu(e,i)}catch(n){e.lastError=String(n)}finally{e.execApprovalsLoading=!1}}}function zu(e,t){e.execApprovalsSnapshot=t,e.execApprovalsDirty||(e.execApprovalsForm=bt(t.file??{}))}async function Hu(e,t){var n,i;if(!(!e.client||!e.connected)){e.execApprovalsSaving=!0,e.lastError=null;try{const s=(n=e.execApprovalsSnapshot)==null?void 0:n.hash;if(!s){e.lastError="Exec approvals hash missing; reload and retry.";return}const r=e.execApprovalsForm??((i=e.execApprovalsSnapshot)==null?void 0:i.file)??{},o=Uu(t,{file:r,baseHash:s});if(!o){e.lastError="Select a node before saving exec approvals.";return}await e.client.request(o.method,o.params),e.execApprovalsDirty=!1,await ir(e,t)}catch(s){e.lastError=String(s)}finally{e.execApprovalsSaving=!1}}}function ju(e,t,n){var s;const i=bt(e.execApprovalsForm??((s=e.execApprovalsSnapshot)==null?void 0:s.file)??{});Ia(i,t,n),e.execApprovalsForm=i,e.execApprovalsDirty=!0}function Ku(e,t){var i;const n=bt(e.execApprovalsForm??((i=e.execApprovalsSnapshot)==null?void 0:i.file)??{});Pa(n,t),e.execApprovalsForm=n,e.execApprovalsDirty=!0}function ke(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const r=new URLSearchParams;for(const[o,a]of Object.entries(n))r.set(o,String(a));return`${s}?${r.toString()}`}async function gi(e,t){e.oosLoading=!0,e.oosError=null;try{const[s,r,o,a]=await Promise.all([fetch(ke(e.basePath,"/api/oos/stats")),fetch(ke(e.basePath,"/api/oos/list",{limit:100})),fetch(ke(e.basePath,"/api/oos/by-file",{limit:50})),fetch(ke(e.basePath,"/api/oos/by-time",{days:30}))]),l=await s.json().catch(()=>({})),c=await r.json().catch(()=>({})),p=await o.json().catch(()=>({})),u=await a.json().catch(()=>({}));l.success&&l.data?(e.oosStats=l.data,e.oosDb=l.db??null):(e.oosStats=null,s.ok||(e.oosError=l.detail??`stats: ${s.status}`)),c.success&&Array.isArray(c.data)?e.oosList=c.data:(e.oosList=[],!e.oosError&&!r.ok&&(e.oosError=c.detail??`list: ${r.status}`)),p.success&&Array.isArray(p.data)?e.oosByFile=p.data:e.oosByFile=[],u.success&&Array.isArray(u.data)?e.oosByTime=u.data:e.oosByTime=[]}catch(s){e.oosError=s instanceof Error?s.message:String(s),e.oosStats=null,e.oosList=[],e.oosByFile=[],e.oosByTime=[]}finally{e.oosLoading=!1}}async function qu(e,t){if(!(t!=null&&t.trim()))return!1;try{const n=await fetch(ke(e.basePath,"/api/oos/delete"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_key:t.trim()})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(await gi(e),!0):(e.oosError=i.detail??`删除失败: ${n.status}`,!1)}catch(n){return e.oosError=n instanceof Error?n.message:String(n),!1}}async function Wu(e,t){const n=(t.product_name||"").trim();if(!n)return!1;try{const i=await fetch(ke(e.basePath,"/api/oos/add"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_name:n,specification:(t.specification??"").trim(),quantity:t.quantity??0,unit:(t.unit??"").trim()})}),s=await i.json().catch(()=>({}));return i.ok&&s.success?(await gi(e),!0):(e.oosError=s.detail??`添加失败: ${i.status}`,!1)}catch(i){return e.oosError=i instanceof Error?i.message:String(i),!1}}async function Gu(e){try{const t=await fetch(ke(e.basePath,"/api/oos/stats")),n=await t.json().catch(()=>({}));if(t.ok&&n.success&&n.data)e.overviewOosStats=n.data,e.overviewOosError=null;else{e.overviewOosStats=null;const i=typeof n.detail=="string"?n.detail:n.message??n.error??`oos stats: ${t.status}`;e.overviewOosError=i}}catch(t){e.overviewOosStats=null,e.overviewOosError=t instanceof Error?t.message:String(t)}}async function hi(e,t){e.shortageLoading=!0,e.shortageError=null;try{const[s,r,o,a]=await Promise.all([fetch(ke(e.basePath,"/api/shortage/stats"),{method:"GET"}),fetch(ke(e.basePath,"/api/shortage/list",{limit:100}),{method:"GET"}),fetch(ke(e.basePath,"/api/shortage/by-file"),{method:"GET"}),fetch(ke(e.basePath,"/api/shortage/by-time",{days:30}),{method:"GET"})]),l=await s.json().catch(()=>({})),c=await r.json().catch(()=>({})),p=await o.json().catch(()=>({})),u=await a.json().catch(()=>({}));if(l.success&&l.data)e.shortageStats=l.data,e.shortageDb=l.db??null;else if(e.shortageStats=null,!e.shortageError&&!s.ok){const f=typeof l.detail=="string"?l.detail:l.message??l.error;e.shortageError=f??`stats: ${s.status} ${s.statusText}`}if(c.success&&Array.isArray(c.data))e.shortageList=c.data;else if(e.shortageList=[],!e.shortageError&&!r.ok){const f=typeof c.detail=="string"?c.detail:c.message??c.error;e.shortageError=f??`list: ${r.status} ${r.statusText}`}if(p.success&&Array.isArray(p.data))e.shortageByFile=p.data;else if(e.shortageByFile=[],!e.shortageError&&!o.ok){const f=typeof p.detail=="string"?p.detail:p.message??p.error;e.shortageError=f??`by-file: ${o.status} ${o.statusText}`}if(u.success&&Array.isArray(u.data))e.shortageByTime=u.data;else if(e.shortageByTime=[],!e.shortageError&&!a.ok){const f=typeof u.detail=="string"?u.detail:u.message??u.error;e.shortageError=f??`by-time: ${a.status} ${a.statusText}`}}catch(s){e.shortageError=s instanceof Error?s.message:String(s),e.shortageStats=null,e.shortageList=[],e.shortageByFile=[],e.shortageByTime=[]}finally{e.shortageLoading=!1}}async function Vu(e,t){if(!(t!=null&&t.trim()))return!1;try{const n=await fetch(ke(e.basePath,"/api/shortage/delete"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_key:t.trim()})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(await hi(e),!0):(e.shortageError=i.detail??`删除失败: ${n.status}`,!1)}catch(n){return e.shortageError=n instanceof Error?n.message:String(n),!1}}async function Qu(e,t){const n=(t.product_name||"").trim();if(!n)return!1;try{const i=await fetch(ke(e.basePath,"/api/shortage/add"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_name:n,specification:(t.specification??"").trim(),quantity:t.quantity??0,available_qty:t.available_qty??0})}),s=await i.json().catch(()=>({}));return i.ok&&s.success?(await hi(e),!0):(e.shortageError=s.detail??`添加失败: ${i.status}`,!1)}catch(i){return e.shortageError=i instanceof Error?i.message:String(i),!1}}async function Ju(e){try{const t=await fetch(ke(e.basePath,"/api/shortage/stats"),{method:"GET"}),n=await t.json().catch(()=>({}));if(t.ok&&n.success&&n.data)e.overviewShortageStats=n.data,e.overviewShortageError=null;else{e.overviewShortageStats=null;const i=typeof n.detail=="string"?n.detail:n.message??n.error??`shortage stats: ${t.status}`;e.overviewShortageError=i}}catch(t){e.overviewShortageStats=null,e.overviewShortageError=t instanceof Error?t.message:String(t)}}async function Yu(e){if(!(!e.client||!e.connected)&&!e.presenceLoading){e.presenceLoading=!0,e.presenceError=null,e.presenceStatus=null;try{const t=await e.client.request("system-presence",{});Array.isArray(t)?(e.presenceEntries=t,e.presenceStatus=t.length===0?"No instances yet.":null):(e.presenceEntries=[],e.presenceStatus="No presence payload.")}catch(t){e.presenceError=String(t)}finally{e.presenceLoading=!1}}}async function sr(e,t){if(!(!e.client||!e.connected)&&!e.sessionsLoading){e.sessionsLoading=!0,e.sessionsError=null;try{const n=(t==null?void 0:t.includeGlobal)??e.sessionsIncludeGlobal,i=(t==null?void 0:t.includeUnknown)??e.sessionsIncludeUnknown,s=(t==null?void 0:t.activeMinutes)??ao(e.sessionsFilterActive,0),r=(t==null?void 0:t.limit)??ao(e.sessionsFilterLimit,0),o={includeGlobal:n,includeUnknown:i};s>0&&(o.activeMinutes=s),r>0&&(o.limit=r);const a=await e.client.request("sessions.list",o);a&&(e.sessionsResult=a)}catch(n){e.sessionsError=String(n)}finally{e.sessionsLoading=!1}}}function Ut(e,t,n){if(!t.trim())return;const i={...e.skillMessages};n?i[t]=n:delete i[t],e.skillMessages=i}function mi(e){return e instanceof Error?e.message:String(e)}async function kn(e,t){if(t!=null&&t.clearMessages&&Object.keys(e.skillMessages).length>0&&(e.skillMessages={}),!(!e.client||!e.connected)&&!e.skillsLoading){e.skillsLoading=!0,e.skillsError=null;try{const n=await e.client.request("skills.status",{});n&&(e.skillsReport=n)}catch(n){e.skillsError=mi(n)}finally{e.skillsLoading=!1}}}function Xu(e,t,n){e.skillEdits={...e.skillEdits,[t]:n}}async function Zu(e,t,n){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{await e.client.request("skills.update",{skillKey:t,enabled:n}),await kn(e),Ut(e,t,{kind:"success",message:n?"Skill enabled":"Skill disabled"})}catch(i){const s=mi(i);e.skillsError=s,Ut(e,t,{kind:"error",message:s})}finally{e.skillsBusyKey=null}}}async function ep(e,t){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const n=e.skillEdits[t]??"";await e.client.request("skills.update",{skillKey:t,apiKey:n}),await kn(e),Ut(e,t,{kind:"success",message:"API key saved"})}catch(n){const i=mi(n);e.skillsError=i,Ut(e,t,{kind:"error",message:i})}finally{e.skillsBusyKey=null}}}async function tp(e,t,n,i){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const s=await e.client.request("skills.install",{name:n,installId:i,timeoutMs:12e4});await kn(e),Ut(e,t,{kind:"success",message:(s==null?void 0:s.message)??"Installed"})}catch(s){const r=mi(s);e.skillsError=r,Ut(e,t,{kind:"error",message:r})}finally{e.skillsBusyKey=null}}}const np=[{label:"chat",tabs:["chat"]},{label:"control",tabs:["overview","channels","instances","sessions","work","cron"]},{label:"agent",tabs:["agents","skills","nodes"]},{label:"settings",tabs:["config","debug","logs"]}],pl={agents:"/agents",overview:"/overview",channels:"/channels",instances:"/instances",sessions:"/sessions",work:"/work",cron:"/cron",skills:"/skills",nodes:"/nodes",chat:"/chat",config:"/config",debug:"/debug",logs:"/logs"},fl=new Map(Object.entries(pl).map(([e,t])=>[t,e]));function Ht(e){if(!e)return"";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t==="/"?"":(t.endsWith("/")&&(t=t.slice(0,-1)),t)}function yn(e){if(!e)return"/";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t.length>1&&t.endsWith("/")&&(t=t.slice(0,-1)),t}function gl(e,t=""){const n=Ht(t),i=pl[e];return n?`${n}${i}`:i}function hl(e,t=""){const n=Ht(t);let i=e||"/";n&&(i===n?i="/":i.startsWith(`${n}/`)&&(i=i.slice(n.length)));let s=yn(i).toLowerCase();return s.endsWith("/index.html")&&(s="/"),s==="/"?"chat":fl.get(s)??null}function ip(e){let t=yn(e);if(t.endsWith("/index.html")&&(t=yn(t.slice(0,-11))),t==="/")return"";const n=t.split("/").filter(Boolean);if(n.length===0)return"";for(let i=0;i<n.length;i++){const s=`/${n.slice(i).join("/")}`.toLowerCase();if(fl.has(s)){const r=n.slice(0,i);return r.length?`/${r.join("/")}`:""}}return`/${n.join("/")}`}function sp(e){switch(e){case"agents":return"folder";case"chat":return"messageSquare";case"overview":return"barChart";case"channels":return"fileText";case"instances":return"radio";case"sessions":return"fileText";case"work":return"fileText";case"cron":return"loader";case"skills":return"zap";case"nodes":return"monitor";case"config":return"settings";case"debug":return"bug";case"logs":return"scrollText";default:return"folder"}}function gs(e){return g(`tabs.${e}`)}function rp(e){return g(`subtitles.${e}`)}const ml="openclaw.control.settings.v1";function op(){const t={gatewayUrl:`${location.protocol==="https:"?"wss":"ws"}://${location.host}/ws`,token:"",sessionKey:"main",lastActiveSessionKey:"main",theme:"system",chatFocusMode:!1,chatShowThinking:!0,splitRatio:.6,navCollapsed:!1,navGroupsCollapsed:{}};try{const n=localStorage.getItem(ml);if(!n)return t;const i=JSON.parse(n);return{gatewayUrl:typeof i.gatewayUrl=="string"&&i.gatewayUrl.trim()?i.gatewayUrl.trim():t.gatewayUrl,token:typeof i.token=="string"?i.token:t.token,sessionKey:typeof i.sessionKey=="string"&&i.sessionKey.trim()?i.sessionKey.trim():t.sessionKey,lastActiveSessionKey:typeof i.lastActiveSessionKey=="string"&&i.lastActiveSessionKey.trim()?i.lastActiveSessionKey.trim():typeof i.sessionKey=="string"&&i.sessionKey.trim()||t.lastActiveSessionKey,theme:i.theme==="light"||i.theme==="dark"||i.theme==="system"?i.theme:t.theme,chatFocusMode:typeof i.chatFocusMode=="boolean"?i.chatFocusMode:t.chatFocusMode,chatShowThinking:typeof i.chatShowThinking=="boolean"?i.chatShowThinking:t.chatShowThinking,splitRatio:typeof i.splitRatio=="number"&&i.splitRatio>=.4&&i.splitRatio<=.7?i.splitRatio:t.splitRatio,navCollapsed:typeof i.navCollapsed=="boolean"?i.navCollapsed:t.navCollapsed,navGroupsCollapsed:typeof i.navGroupsCollapsed=="object"&&i.navGroupsCollapsed!==null?i.navGroupsCollapsed:t.navGroupsCollapsed,locale:Bs(i.locale)?i.locale:void 0}}catch{return t}}function ap(e){localStorage.setItem(ml,JSON.stringify(e))}const Mn=e=>Number.isNaN(e)?.5:e<=0?0:e>=1?1:e,lp=()=>typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches??!1,Fn=e=>{e.classList.remove("theme-transition"),e.style.removeProperty("--theme-switch-x"),e.style.removeProperty("--theme-switch-y")},cp=({nextTheme:e,applyTheme:t,context:n,currentTheme:i})=>{var c;if(i===e)return;const s=globalThis.document??null;if(!s){t();return}const r=s.documentElement,o=s,a=lp();if(!!o.startViewTransition&&!a){let p=.5,u=.5;if((n==null?void 0:n.pointerClientX)!==void 0&&(n==null?void 0:n.pointerClientY)!==void 0&&typeof window<"u")p=Mn(n.pointerClientX/window.innerWidth),u=Mn(n.pointerClientY/window.innerHeight);else if(n!=null&&n.element){const f=n.element.getBoundingClientRect();f.width>0&&f.height>0&&typeof window<"u"&&(p=Mn((f.left+f.width/2)/window.innerWidth),u=Mn((f.top+f.height/2)/window.innerHeight))}r.style.setProperty("--theme-switch-x",`${p*100}%`),r.style.setProperty("--theme-switch-y",`${u*100}%`),r.classList.add("theme-transition");try{const f=(c=o.startViewTransition)==null?void 0:c.call(o,()=>{t()});f!=null&&f.finished?f.finished.finally(()=>Fn(r)):Fn(r)}catch{Fn(r),t()}return}t(),Fn(r)};function dp(){return typeof window>"u"||typeof window.matchMedia!="function"||window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function rr(e){return e==="system"?dp():e}function st(e,t){var i;const n={...t,lastActiveSessionKey:((i=t.lastActiveSessionKey)==null?void 0:i.trim())||t.sessionKey.trim()||"main"};e.settings=n,ap(n),t.theme!==e.theme&&(e.theme=t.theme,vi(e,rr(t.theme))),e.applySessionKey=e.settings.lastActiveSessionKey}function vl(e,t){const n=t.trim();n&&e.settings.lastActiveSessionKey!==n&&st(e,{...e.settings,lastActiveSessionKey:n})}function up(e){if(!window.location.search&&!window.location.hash)return;const t=new URL(window.location.href),n=new URLSearchParams(t.search),i=new URLSearchParams(t.hash.startsWith("#")?t.hash.slice(1):t.hash),s=n.get("token")??i.get("token"),r=n.get("password")??i.get("password"),o=n.get("session")??i.get("session"),a=n.get("gatewayUrl")??i.get("gatewayUrl");let l=!1;if(s!=null){const p=s.trim();p&&p!==e.settings.token&&st(e,{...e.settings,token:p}),n.delete("token"),i.delete("token"),l=!0}if(r!=null&&(n.delete("password"),i.delete("password"),l=!0),o!=null){const p=o.trim();p&&(e.sessionKey=p,st(e,{...e.settings,sessionKey:p,lastActiveSessionKey:p}))}if(a!=null){const p=a.trim();p&&p!==e.settings.gatewayUrl&&(e.pendingGatewayUrl=p),n.delete("gatewayUrl"),i.delete("gatewayUrl"),l=!0}if(!l)return;t.search=n.toString();const c=i.toString();t.hash=c?`#${c}`:"",window.history.replaceState({},"",t.toString())}function pp(e,t){e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?Hs(e):js(e),t==="debug"?Ks(e):qs(e),or(e),bl(e,t,!1)}function fp(e,t,n){cp({nextTheme:t,applyTheme:()=>{e.theme=t,st(e,{...e.settings,theme:t}),vi(e,rr(t))},context:n,currentTheme:e.theme})}async function or(e){var t,n,i,s,r,o;if(e.tab==="overview"&&(await wl(e),await Promise.all([Gu(e),Ju(e)])),e.tab==="channels"&&await Ha(e),e.tab==="instances"){const a=e;await gi(a),await hi(a)}if(e.tab==="sessions"&&(await Js(e),await xn(e)),e.tab==="cron"&&await Qs(e),e.tab==="skills"&&await kn(e),e.tab==="agents"){await Ws(e),await He(e);const a=((n=(t=e.agentsList)==null?void 0:t.agents)==null?void 0:n.map(c=>c.id))??[];a.length>0&&za(e,a);const l=e.agentsSelectedId??((i=e.agentsList)==null?void 0:i.defaultId)??((o=(r=(s=e.agentsList)==null?void 0:s.agents)==null?void 0:r[0])==null?void 0:o.id);l&&(Ua(e,l),e.agentsPanel==="skills"&&Wn(e,l),e.agentsPanel==="channels"&&Ce(e,!1),e.agentsPanel==="cron"&&ar(e))}e.tab==="nodes"&&(await ui(e),await at(e),await He(e),await ir(e)),e.tab==="chat"&&(await Cl(e),$n(e,!e.chatHasAutoScrolled)),e.tab==="config"&&(await ad(e),await He(e)),e.tab==="debug"&&(await di(e),e.eventLog=e.eventLogBuffer),e.tab==="logs"&&(e.logsAtBottom=!0,await zs(e,{reset:!0}),Ba(e,!0))}function gp(){if(typeof window>"u")return"";const e=window.__OPENCLAW_CONTROL_UI_BASE_PATH__;return typeof e=="string"&&e.trim()?Ht(e):ip(window.location.pathname)}function hp(e){e.theme=e.settings.theme??"system",vi(e,rr(e.theme))}function vi(e,t){if(e.themeResolved=t,typeof document>"u")return;const n=document.documentElement;n.dataset.theme=t,n.style.colorScheme=t}function mp(e){if(typeof window>"u"||typeof window.matchMedia!="function")return;if(e.themeMedia=window.matchMedia("(prefers-color-scheme: dark)"),e.themeMediaHandler=n=>{e.theme==="system"&&vi(e,n.matches?"dark":"light")},typeof e.themeMedia.addEventListener=="function"){e.themeMedia.addEventListener("change",e.themeMediaHandler);return}e.themeMedia.addListener(e.themeMediaHandler)}function vp(e){if(!e.themeMedia||!e.themeMediaHandler)return;if(typeof e.themeMedia.removeEventListener=="function"){e.themeMedia.removeEventListener("change",e.themeMediaHandler);return}e.themeMedia.removeListener(e.themeMediaHandler),e.themeMedia=null,e.themeMediaHandler=null}function yp(e,t){if(typeof window>"u")return;const n=hl(window.location.pathname,e.basePath)??"chat";yl(e,n),bl(e,n,t)}function bp(e){var s;if(typeof window>"u")return;const t=hl(window.location.pathname,e.basePath);if(!t)return;const i=(s=new URL(window.location.href).searchParams.get("session"))==null?void 0:s.trim();i&&(e.sessionKey=i,st(e,{...e.settings,sessionKey:i,lastActiveSessionKey:i})),yl(e,t)}function yl(e,t){e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?Hs(e):js(e),t==="debug"?Ks(e):qs(e),e.connected&&or(e)}function bl(e,t,n){if(typeof window>"u")return;const i=yn(gl(t,e.basePath)),s=yn(window.location.pathname),r=new URL(window.location.href);t==="chat"&&e.sessionKey?r.searchParams.set("session",e.sessionKey):r.searchParams.delete("session"),s!==i&&(r.pathname=i),n?window.history.replaceState({},"",r.toString()):window.history.pushState({},"",r.toString())}function wp(e,t,n){if(typeof window>"u")return;const i=new URL(window.location.href);i.searchParams.set("session",t),window.history.replaceState({},"",i.toString())}async function wl(e){await Promise.all([Ce(e,!1),Yu(e),sr(e),qa(e),di(e)])}async function ar(e){await Promise.all([Ce(e,!1),qa(e),Hd(e)])}async function $p(e){await Qs(e)}async function xp(e){await Js(e)}const bo=50,kp=80,Sp=12e4;function _p(e){if(!e||typeof e!="object")return null;const t=e;if(typeof t.text=="string")return t.text;const n=t.content;if(!Array.isArray(n))return null;const i=n.map(s=>{if(!s||typeof s!="object")return null;const r=s;return r.type==="text"&&typeof r.text=="string"?r.text:null}).filter(s=>!!s);return i.length===0?null:i.join(`
`)}function wo(e){if(e==null)return null;if(typeof e=="number"||typeof e=="boolean")return String(e);const t=_p(e);let n;if(typeof e=="string")n=e;else if(t)n=t;else try{n=JSON.stringify(e,null,2)}catch{n=String(e)}const i=Ka(n,Sp);return i.truncated?`${i.text}

… truncated (${i.total} chars, showing first ${i.text.length}).`:i.text}function Ap(e){const t=[];return t.push({type:"toolcall",name:e.name,arguments:e.args??{}}),e.output&&t.push({type:"toolresult",name:e.name,text:e.output}),{role:"assistant",toolCallId:e.toolCallId,runId:e.runId,content:t,timestamp:e.startedAt}}function Cp(e){if(e.toolStreamOrder.length<=bo)return;const t=e.toolStreamOrder.length-bo,n=e.toolStreamOrder.splice(0,t);for(const i of n)e.toolStreamById.delete(i)}function Tp(e){e.chatToolMessages=e.toolStreamOrder.map(t=>{var n;return(n=e.toolStreamById.get(t))==null?void 0:n.message}).filter(t=>!!t)}function hs(e){e.toolStreamSyncTimer!=null&&(clearTimeout(e.toolStreamSyncTimer),e.toolStreamSyncTimer=null),Tp(e)}function Ep(e,t=!1){if(t){hs(e);return}e.toolStreamSyncTimer==null&&(e.toolStreamSyncTimer=window.setTimeout(()=>hs(e),kp))}function yi(e){e.toolStreamById.clear(),e.toolStreamOrder=[],e.chatToolMessages=[],hs(e)}const Rp=5e3;function Lp(e,t){var s;const n=t.data??{},i=typeof n.phase=="string"?n.phase:"";e.compactionClearTimer!=null&&(window.clearTimeout(e.compactionClearTimer),e.compactionClearTimer=null),i==="start"?e.compactionStatus={active:!0,startedAt:Date.now(),completedAt:null}:i==="end"&&(e.compactionStatus={active:!1,startedAt:((s=e.compactionStatus)==null?void 0:s.startedAt)??null,completedAt:Date.now()},e.compactionClearTimer=window.setTimeout(()=>{e.compactionStatus=null,e.compactionClearTimer=null},Rp))}function Ip(e,t){if(!t)return;if(t.stream==="compaction"){Lp(e,t);return}if(t.stream!=="tool")return;const n=typeof t.sessionKey=="string"?t.sessionKey:void 0;if(n&&n!==e.sessionKey||!n&&e.chatRunId&&t.runId!==e.chatRunId||e.chatRunId&&t.runId!==e.chatRunId||!e.chatRunId)return;const i=t.data??{},s=typeof i.toolCallId=="string"?i.toolCallId:"";if(!s)return;const r=typeof i.name=="string"?i.name:"tool",o=typeof i.phase=="string"?i.phase:"",a=o==="start"?i.args:void 0,l=o==="update"?wo(i.partialResult):o==="result"?wo(i.result):void 0,c=Date.now();let p=e.toolStreamById.get(s);p?(p.name=r,a!==void 0&&(p.args=a),l!==void 0&&(p.output=l||void 0),p.updatedAt=c):(p={toolCallId:s,runId:t.runId,sessionKey:n,name:r,args:a,output:l||void 0,startedAt:typeof t.ts=="number"?t.ts:c,updatedAt:c,message:{}},e.toolStreamById.set(s,p),e.toolStreamOrder.push(s)),p.message=Ap(p),Cp(e),Ep(e,o==="result")}function qi(e){return e==null?"":String(e).trim()}const Wi=new WeakMap,Gi=new WeakMap;function ms(e){const t=e,n=typeof t.role=="string"?t.role:"",i=t.content;if(typeof i=="string")return n==="assistant"?Ui(i):qi(i);if(Array.isArray(i)){const s=i.map(r=>{const o=r;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(r=>typeof r=="string");if(s.length>0){const r=s.join(`
`);return n==="assistant"?Ui(r):qi(r)}}return typeof t.text=="string"?n==="assistant"?Ui(t.text):qi(t.text):null}function $l(e){if(!e||typeof e!="object")return ms(e);const t=e;if(Wi.has(t))return Wi.get(t)??null;const n=ms(e);return Wi.set(t,n),n}function $o(e){const n=e.content,i=[];if(Array.isArray(n))for(const a of n){const l=a;if(l.type==="thinking"&&typeof l.thinking=="string"){const c=l.thinking.trim();c&&i.push(c)}}if(i.length>0)return i.join(`
`);const s=Dp(e);if(!s)return null;const o=[...s.matchAll(/<\s*think(?:ing)?\s*>([\s\S]*?)<\s*\/\s*think(?:ing)?\s*>/gi)].map(a=>(a[1]??"").trim()).filter(Boolean);return o.length>0?o.join(`
`):null}function Pp(e){if(!e||typeof e!="object")return $o(e);const t=e;if(Gi.has(t))return Gi.get(t)??null;const n=$o(e);return Gi.set(t,n),n}function Dp(e){const t=e,n=t.content;if(typeof n=="string")return n;if(Array.isArray(n)){const i=n.map(s=>{const r=s;return r.type==="text"&&typeof r.text=="string"?r.text:null}).filter(s=>typeof s=="string");if(i.length>0)return i.join(`
`)}return typeof t.text=="string"?t.text:null}function Mp(e){const t=e.trim();if(!t)return"";const n=t.split(/\r?\n/).map(i=>i.trim()).filter(Boolean).map(i=>`_${i}_`);return n.length?["_Reasoning:_",...n].join(`
`):""}let xo=!1;function ko(e){e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t="";for(let n=0;n<e.length;n++)t+=e[n].toString(16).padStart(2,"0");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}function Fp(){const e=new Uint8Array(16),t=Date.now();for(let n=0;n<e.length;n++)e[n]=Math.floor(Math.random()*256);return e[0]^=t&255,e[1]^=t>>>8&255,e[2]^=t>>>16&255,e[3]^=t>>>24&255,e}function Np(){xo||(xo=!0,console.warn("[uuid] crypto API missing; falling back to weak randomness"))}function lr(e=globalThis.crypto){if(e&&typeof e.randomUUID=="function")return e.randomUUID();if(e&&typeof e.getRandomValues=="function"){const t=new Uint8Array(16);return e.getRandomValues(t),ko(t)}return Np(),ko(Fp())}async function bn(e){if(!(!e.client||!e.connected)){e.chatLoading=!0,e.lastError=null;try{const t=await e.client.request("chat.history",{sessionKey:e.sessionKey,limit:200}),n=Array.isArray(t.messages)?t.messages:[];(n.length>0||e.chatMessages.length===0)&&(e.chatMessages=n),e.chatThinkingLevel=t.thinkingLevel??null}catch(t){e.lastError=String(t)}finally{e.chatLoading=!1}}}function Op(e){const t=/^data:([^;]+);base64,(.+)$/.exec(e);return t?{mimeType:t[1],content:t[2]}:null}function Bp(e){if(!e||typeof e!="object")return null;const t=e;return t.role!=="assistant"||!("content"in t)||!Array.isArray(t.content)?null:t}async function Up(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",i=n?`${n}/api/quotation/upload`:"/api/quotation/upload",s=new FormData;s.append("file",t);try{const r=await fetch(i,{method:"POST",body:s,credentials:"same-origin"});if(!r.ok){const a=await r.text();throw new Error(a||`Upload failed: ${r.status}`)}const o=await r.json();return typeof o.file_path!="string"?null:{file_path:o.file_path,file_name:o.file_name??t.name}}catch(r){throw console.error("uploadChatFile",r),r}}async function zp(e,t,n,i){if(!e.client||!e.connected)return null;const s=t.trim(),r=n&&n.length>0;if(!s&&!r)return null;const o=Date.now(),a=[];if(s&&a.push({type:"text",text:s}),r)for(const u of n)a.push({type:"image",source:{type:"base64",media_type:u.mimeType,data:u.dataUrl}});e.chatMessages=[...e.chatMessages,{role:"user",content:a,timestamp:o}],e.chatSending=!0,e.lastError=null;const l=lr();e.chatRunId=l,e.chatStream="",e.chatStreamStartedAt=o;const c=r?n.map(u=>{const f=Op(u.dataUrl);return f?{type:"image",mimeType:f.mimeType,content:f.content}:null}).filter(u=>u!==null):void 0,p=i!=null&&i.file_path?{file_path:i.file_path}:void 0;try{return await e.client.request("chat.send",{sessionKey:e.sessionKey,message:s,deliver:!1,idempotencyKey:l,attachments:c,...p?{context:p,file_path:i.file_path}:{}}),l}catch(u){const f=String(u);return e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,e.lastError=f,e.chatMessages=[...e.chatMessages,{role:"assistant",content:[{type:"text",text:"Error: "+f}],timestamp:Date.now()}],null}finally{e.chatSending=!1}}async function Hp(e){if(!e.client||!e.connected)return!1;const t=e.chatRunId;try{return await e.client.request("chat.abort",t?{sessionKey:e.sessionKey,runId:t}:{sessionKey:e.sessionKey}),!0}catch(n){return e.lastError=String(n),!1}}function jp(e,t){if(!t||t.sessionKey!==e.sessionKey)return null;if(t.runId&&e.chatRunId&&t.runId!==e.chatRunId)return t.state==="final"?"foreign_final":null;if(t.state==="delta"){const n=ms(t.message);if(typeof n=="string"){const i=e.chatStream??"";(!i||n.length>=i.length)&&(e.chatStream=n)}}else if(t.state==="final")e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null;else if(t.state==="aborted"){const n=Bp(t.message);if(n)e.chatMessages=[...e.chatMessages,n];else{const i=e.chatStream??"";i.trim()&&(e.chatMessages=[...e.chatMessages,{role:"assistant",content:[{type:"text",text:i}],timestamp:Date.now()}])}e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null}else t.state==="error"&&(e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null,e.lastError=t.errorMessage??"chat error");return t.state}const xl=120;function kl(e){return e.chatSending||!!e.chatRunId}function Kp(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/stop"?!0:n==="stop"||n==="esc"||n==="abort"||n==="wait"||n==="exit"}function qp(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/new"||n==="/reset"?!0:n.startsWith("/new ")||n.startsWith("/reset ")}async function Sl(e){e.connected&&(e.chatMessage="",await Hp(e))}function Wp(e,t,n,i){const s=t.trim(),r=!!(n&&n.length>0);!s&&!r||(e.chatQueue=[...e.chatQueue,{id:lr(),text:s,createdAt:Date.now(),attachments:r?n==null?void 0:n.map(o=>({...o})):void 0,refreshSessions:i}])}async function _l(e,t,n){var r,o;yi(e);const i=await zp(e,t,n==null?void 0:n.attachments,e.chatUploadedFile??void 0),s=!!i;return!s&&(n==null?void 0:n.previousDraft)!=null&&(e.chatMessage=n.previousDraft),!s&&(n!=null&&n.previousAttachments)&&(e.chatAttachments=n.previousAttachments),s&&vl(e,e.sessionKey),s&&(n!=null&&n.restoreDraft)&&((r=n.previousDraft)!=null&&r.trim())&&(e.chatMessage=n.previousDraft),s&&(n!=null&&n.restoreAttachments)&&((o=n.previousAttachments)!=null&&o.length)&&(e.chatAttachments=n.previousAttachments),$n(e),s&&!e.chatRunId&&Al(e),s&&(n!=null&&n.refreshSessions)&&i&&e.refreshSessionsAfterChat.add(i),s}async function Al(e){if(!e.connected||kl(e))return;const[t,...n]=e.chatQueue;if(!t)return;e.chatQueue=n,await _l(e,t.text,{attachments:t.attachments,refreshSessions:t.refreshSessions})||(e.chatQueue=[t,...e.chatQueue])}function Gp(e,t){e.chatQueue=e.chatQueue.filter(n=>n.id!==t)}async function Vp(e,t,n){if(!e.connected)return;const i=e.chatMessage,s=(t??e.chatMessage).trim(),r=e.chatAttachments??[],o=t==null?r:[],a=o.length>0;if(!s&&!a)return;if(Kp(s)){await Sl(e);return}const l=qp(s);if(t==null&&(e.chatMessage="",e.chatAttachments=[]),kl(e)){Wp(e,s,o,l);return}await _l(e,s,{previousDraft:t==null?i:void 0,restoreDraft:!!(t&&(n!=null&&n.restoreDraft)),attachments:a?o:void 0,previousAttachments:t==null?r:void 0,restoreAttachments:!!(t&&(n!=null&&n.restoreDraft)),refreshSessions:l})}async function Cl(e,t){await Promise.all([bn(e),sr(e,{activeMinutes:xl}),vs(e)]),(t==null?void 0:t.scheduleScroll)!==!1&&$n(e)}const Qp=Al;function Jp(e){var s,r,o;const t=Oa(e.sessionKey);if(t!=null&&t.agentId)return t.agentId;const n=(s=e.hello)==null?void 0:s.snapshot;return((o=(r=n==null?void 0:n.sessionDefaults)==null?void 0:r.defaultAgentId)==null?void 0:o.trim())||"main"}function Yp(e,t){const n=Ht(e),i=encodeURIComponent(t);return n?`${n}/avatar/${i}?meta=1`:`/avatar/${i}?meta=1`}async function vs(e){if(!e.connected){e.chatAvatarUrl=null;return}const t=Jp(e);if(!t){e.chatAvatarUrl=null;return}e.chatAvatarUrl=null;const n=Yp(e.basePath,t);try{const i=await fetch(n,{method:"GET"});if(!i.ok){e.chatAvatarUrl=null;return}const s=await i.json(),r=typeof s.avatarUrl=="string"?s.avatarUrl.trim():"";e.chatAvatarUrl=r||null}catch{e.chatAvatarUrl=null}}const Xp={trace:!0,debug:!0,info:!0,warn:!0,error:!0,fatal:!0},Zp={name:"",description:"",agentId:"",enabled:!0,scheduleKind:"every",scheduleAt:"",everyAmount:"30",everyUnit:"minutes",cronExpr:"0 7 * * *",cronTz:"",sessionTarget:"isolated",wakeMode:"now",payloadKind:"agentTurn",payloadText:"",deliveryMode:"announce",deliveryChannel:"last",deliveryTo:"",timeoutSeconds:""},ef=50,tf=200,nf="PT Vansting Agent";function So(e,t){if(typeof e!="string")return;const n=e.trim();if(n)return n.length<=t?n:n.slice(0,t)}function cr(e){const t=So(e==null?void 0:e.name,ef)??nf,n=So((e==null?void 0:e.avatar)??void 0,tf)??null;return{agentId:typeof(e==null?void 0:e.agentId)=="string"&&e.agentId.trim()?e.agentId.trim():null,name:t,avatar:n}}async function Tl(e,t){if(!e.client||!e.connected)return;const n=e.sessionKey.trim(),i=n?{sessionKey:n}:{};try{const s=await e.client.request("agent.identity.get",i);if(!s)return;const r=cr(s);e.assistantName=r.name,e.assistantAvatar=r.avatar,e.assistantAgentId=r.agentId??null}catch{}}function ys(e){return typeof e=="object"&&e!==null}function sf(e){if(!ys(e))return null;const t=typeof e.id=="string"?e.id.trim():"",n=e.request;if(!t||!ys(n))return null;const i=typeof n.command=="string"?n.command.trim():"";if(!i)return null;const s=typeof e.createdAtMs=="number"?e.createdAtMs:0,r=typeof e.expiresAtMs=="number"?e.expiresAtMs:0;return!s||!r?null:{id:t,request:{command:i,cwd:typeof n.cwd=="string"?n.cwd:null,host:typeof n.host=="string"?n.host:null,security:typeof n.security=="string"?n.security:null,ask:typeof n.ask=="string"?n.ask:null,agentId:typeof n.agentId=="string"?n.agentId:null,resolvedPath:typeof n.resolvedPath=="string"?n.resolvedPath:null,sessionKey:typeof n.sessionKey=="string"?n.sessionKey:null},createdAtMs:s,expiresAtMs:r}}function rf(e){if(!ys(e))return null;const t=typeof e.id=="string"?e.id.trim():"";return t?{id:t,decision:typeof e.decision=="string"?e.decision:null,resolvedBy:typeof e.resolvedBy=="string"?e.resolvedBy:null,ts:typeof e.ts=="number"?e.ts:null}:null}function El(e){const t=Date.now();return e.filter(n=>n.expiresAtMs>t)}function of(e,t){const n=El(e).filter(i=>i.id!==t.id);return n.push(t),n}function _o(e,t){return El(e).filter(n=>n.id!==t)}function af(e){return{}}const Ao={WEBCHAT:"webchat"},Co={CONTROL_UI:"control-ui"},lf=4008;class cf{constructor(t){this.opts=t,this.ws=null,this.pending=new Map,this.closed=!1,this.lastSeq=null,this.connectNonce=null,this.connectSent=!1,this.connectTimer=null,this.backoffMs=800}start(){this.closed=!1,this.connect()}stop(){var t;this.closed=!0,(t=this.ws)==null||t.close(),this.ws=null,this.flushPending(new Error("gateway client stopped"))}get connected(){var t;return((t=this.ws)==null?void 0:t.readyState)===WebSocket.OPEN}connect(){this.closed||(this.ws=new WebSocket(this.opts.url),this.ws.addEventListener("open",()=>this.queueConnect()),this.ws.addEventListener("message",t=>this.handleMessage(String(t.data??""))),this.ws.addEventListener("close",t=>{var i,s;const n=String(t.reason??"");this.ws=null,this.flushPending(new Error(`gateway closed (${t.code}): ${n}`)),(s=(i=this.opts).onClose)==null||s.call(i,{code:t.code,reason:n}),this.scheduleReconnect()}),this.ws.addEventListener("error",()=>{}))}scheduleReconnect(){if(this.closed)return;const t=this.backoffMs;this.backoffMs=Math.min(this.backoffMs*1.7,15e3),window.setTimeout(()=>this.connect(),t)}flushPending(t){for(const[,n]of this.pending)n.reject(t);this.pending.clear()}async sendConnect(){var p;if(this.connectSent)return;this.connectSent=!0,this.connectTimer!==null&&(window.clearTimeout(this.connectTimer),this.connectTimer=null);const t=typeof crypto<"u"&&!!crypto.subtle,n=["operator.admin","operator.approvals","operator.pairing"],i="operator";let s=null,r=!1,o=this.opts.token;if(t){s=await nr();const u=(p=cu({deviceId:s.deviceId,role:i}))==null?void 0:p.token;o=u??this.opts.token,r=!!(u&&this.opts.token)}const a=o||this.opts.password?{token:o,password:this.opts.password}:void 0;let l;if(t&&s){const u=Date.now(),f=this.connectNonce??void 0,b=af({deviceId:s.deviceId,clientId:this.opts.clientName??Co.CONTROL_UI,clientMode:this.opts.mode??Ao.WEBCHAT}),x=await Du(s.privateKey,b);l={id:s.deviceId,publicKey:s.publicKey,signature:x,signedAt:u,nonce:f}}const c={minProtocol:3,maxProtocol:3,client:{id:this.opts.clientName??Co.CONTROL_UI,version:this.opts.clientVersion??"dev",platform:this.opts.platform??navigator.platform??"web",mode:this.opts.mode??Ao.WEBCHAT,instanceId:this.opts.instanceId},role:i,scopes:n,device:l,caps:[],auth:a,userAgent:navigator.userAgent,locale:navigator.language};this.request("connect",c).then(u=>{var f,b,x;(f=u==null?void 0:u.auth)!=null&&f.deviceToken&&s&&Ja({deviceId:s.deviceId,role:u.auth.role??i,token:u.auth.deviceToken,scopes:u.auth.scopes??[]}),this.backoffMs=800,(x=(b=this.opts).onHello)==null||x.call(b,u)}).catch(()=>{var u;r&&s&&Ya({deviceId:s.deviceId,role:i}),(u=this.ws)==null||u.close(lf,"connect failed")})}handleMessage(t){var s,r,o,a,l;let n;try{n=JSON.parse(t)}catch{return}const i=n;if(i.type==="event"){const c=n;if(c.event==="connect.challenge"){const u=c.payload,f=u&&typeof u.nonce=="string"?u.nonce:null;f&&(this.connectNonce=f,this.sendConnect());return}const p=typeof c.seq=="number"?c.seq:null;p!==null&&(this.lastSeq!==null&&p>this.lastSeq+1&&((r=(s=this.opts).onGap)==null||r.call(s,{expected:this.lastSeq+1,received:p})),this.lastSeq=p);try{(a=(o=this.opts).onEvent)==null||a.call(o,c)}catch(u){console.error("[gateway] event handler error:",u)}return}if(i.type==="res"){const c=n,p=this.pending.get(c.id);if(!p)return;this.pending.delete(c.id),c.ok?p.resolve(c.payload):p.reject(new Error(((l=c.error)==null?void 0:l.message)??"request failed"));return}}request(t,n){if(!this.ws||this.ws.readyState!==WebSocket.OPEN)return Promise.reject(new Error("gateway not connected"));const i=lr(),s={type:"req",id:i,method:t,params:n},r=new Promise((o,a)=>{this.pending.set(i,{resolve:l=>o(l),reject:a})});return this.ws.send(JSON.stringify(s)),r}queueConnect(){this.connectNonce=null,this.connectSent=!1,this.connectTimer!==null&&window.clearTimeout(this.connectTimer),this.connectTimer=window.setTimeout(()=>{this.sendConnect()},750)}}function Vi(e,t){var a,l,c;const n=(e??"").trim(),i=(a=t.mainSessionKey)==null?void 0:a.trim();if(!i)return n;if(!n)return i;const s=((l=t.mainKey)==null?void 0:l.trim())||"main",r=(c=t.defaultAgentId)==null?void 0:c.trim();return n==="main"||n===s||r&&(n===`agent:${r}:main`||n===`agent:${r}:${s}`)?i:n}function df(e,t){if(!(t!=null&&t.mainSessionKey))return;const n=Vi(e.sessionKey,t),i=Vi(e.settings.sessionKey,t),s=Vi(e.settings.lastActiveSessionKey,t),r=n||i||e.sessionKey,o={...e.settings,sessionKey:i||r,lastActiveSessionKey:s||r},a=o.sessionKey!==e.settings.sessionKey||o.lastActiveSessionKey!==e.settings.lastActiveSessionKey;r!==e.sessionKey&&(e.sessionKey=r),a&&st(e,o)}function Rl(e){e.lastError=null,e.hello=null,e.connected=!1,e.execApprovalQueue=[],e.execApprovalError=null;const t=e.client,n=new cf({url:e.settings.gatewayUrl,token:e.settings.token.trim()?e.settings.token:void 0,password:e.password.trim()?e.password:void 0,clientName:"openclaw-control-ui",mode:"webchat",onHello:i=>{e.client===n&&(e.connected=!0,e.lastError=null,e.hello=i,ff(e,i),e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,yi(e),Tl(e),Ws(e),ui(e,{quiet:!0}),at(e,{quiet:!0}),or(e))},onClose:({code:i,reason:s})=>{e.client===n&&(e.connected=!1,i!==1012&&(e.lastError=`disconnected (${i}): ${s||"no reason"}`))},onEvent:i=>{e.client===n&&uf(e,i)},onGap:({expected:i,received:s})=>{e.client===n&&(e.lastError=`event gap detected (expected seq ${i}, got ${s}); refresh recommended`)}});e.client=n,t==null||t.stop(),n.start()}function uf(e,t){try{pf(e,t)}catch(n){console.error("[gateway] handleGatewayEvent error:",t.event,n)}}function pf(e,t){if(e.eventLogBuffer=[{ts:Date.now(),event:t.event,payload:t.payload},...e.eventLogBuffer].slice(0,250),e.tab==="debug"&&(e.eventLog=e.eventLogBuffer),t.event==="agent"){if(e.onboarding)return;Ip(e,t.payload);return}if(t.event==="chat"){const n=t.payload;n!=null&&n.sessionKey&&vl(e,n.sessionKey);const i=jp(e,n);if(i==="final"||i==="error"||i==="aborted"){yi(e),Qp(e);const s=n==null?void 0:n.runId;s&&e.refreshSessionsAfterChat.has(s)&&(e.refreshSessionsAfterChat.delete(s),i==="final"&&sr(e,{activeMinutes:xl}))}(i==="final"||i==="foreign_final")&&bn(e);return}if(t.event==="presence"){const n=t.payload;n!=null&&n.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence,e.presenceError=null,e.presenceStatus=null);return}if(t.event==="cron"&&e.tab==="cron"&&ar(e),(t.event==="device.pair.requested"||t.event==="device.pair.resolved")&&at(e,{quiet:!0}),t.event==="exec.approval.requested"){const n=sf(t.payload);if(n){e.execApprovalQueue=of(e.execApprovalQueue,n),e.execApprovalError=null;const i=Math.max(0,n.expiresAtMs-Date.now()+500);window.setTimeout(()=>{e.execApprovalQueue=_o(e.execApprovalQueue,n.id)},i)}return}if(t.event==="exec.approval.resolved"){const n=rf(t.payload);n&&(e.execApprovalQueue=_o(e.execApprovalQueue,n.id))}}function ff(e,t){const n=t.snapshot;n!=null&&n.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence),n!=null&&n.health&&(e.debugHealth=n.health),n!=null&&n.sessionDefaults&&df(e,n.sessionDefaults)}const To="/api/bootstrap";async function gf(e){if(typeof window>"u"||typeof fetch!="function")return;const t=Ht(e.basePath??""),n=t?`${t}${To}`:To;try{const i=await fetch(n,{method:"GET",headers:{Accept:"application/json"},credentials:"same-origin"});if(!i.ok)return;const s=await i.json(),r=cr({agentId:s.assistantAgentId??null,name:s.assistantName,avatar:s.assistantAvatar??null});e.assistantName=r.name,e.assistantAvatar=r.avatar,e.assistantAgentId=r.agentId??null}catch{}}function hf(e){e.basePath=gp(),gf(e),up(e),yp(e,!0),hp(e),mp(e),window.addEventListener("popstate",e.popStateHandler),Rl(e),Nd(e),e.tab==="logs"&&Hs(e),e.tab==="debug"&&Ks(e)}function mf(e){Rd(e)}function vf(e){var t;window.removeEventListener("popstate",e.popStateHandler),Od(e),js(e),qs(e),vp(e),(t=e.topbarObserver)==null||t.disconnect(),e.topbarObserver=null}function yf(e,t){if(!(e.tab==="chat"&&e.chatManualRefreshInFlight)){if(e.tab==="chat"&&(t.has("chatMessages")||t.has("chatToolMessages")||t.has("chatStream")||t.has("chatLoading")||t.has("tab"))){const n=t.has("tab"),i=t.has("chatLoading")&&t.get("chatLoading")===!0&&!e.chatLoading;$n(e,n||i||!e.chatHasAutoScrolled)}e.tab==="logs"&&(t.has("logsEntries")||t.has("logsAutoFollow")||t.has("tab"))&&e.logsAutoFollow&&e.logsAtBottom&&Ba(e,t.has("tab")||t.has("logsAutoFollow"))}}const bf="未命名报价单",wf=24e4,$f=12e4,Ll=1,Il=800,Eo=new WeakMap,xf={idle:["running"],running:["awaiting_choices","done","error","idle"],awaiting_choices:["resuming","running","error","idle"],resuming:["awaiting_choices","done","error","idle"],done:["running","idle","error"],error:["running","idle","resuming"]};class ze extends Error{constructor(t){super(t),this.name="RetryableWorkError"}}class bs extends Error{constructor(t){super(t),this.name="RunIdInvalidError"}}function bi(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}function jt(e){let t=Eo.get(e);return t||(t={controller:null,cancelRequested:!1,timeoutReached:!1},Eo.set(e,t)),t}function ti(e,t){const n=e.workRunStatus;if(n===t)return;if(!(xf[n]??[]).includes(t))throw new Error(`invalid work state transition: ${n} -> ${t}`);e.workRunStatus=t}function Ot(e,t){e.workRunStatus=t}function dr(e){e.workRunId=null,e.workPendingChoices=[],e.workSelections={}}function Pl(e){return(e||"").trim().replace(/\\/g,"/").toLowerCase()}function kf(e,t){const n=(t.file_path||"").trim();if(n){const i=e.workOriginalFileNamesByPath[Pl(n)];if(typeof i=="string"&&i.trim())return i.trim()}return Sn(t)}function Sn(e){var i,s;const t=(i=e==null?void 0:e.name)==null?void 0:i.trim();if(t)return t;const n=(s=e==null?void 0:e.file_path)==null?void 0:s.trim();if(n){const r=n.replace(/\\/g,"/").split("/").filter(Boolean).pop();if(r)return r}return bf}function Sf(e){try{if(typeof e!="string"||!e.trim())return null;const t=e.trim();return t.startsWith("{")&&t.endsWith("}")||t.startsWith("[")&&t.endsWith("]")?JSON.parse(t):null}catch{return null}}function Ro(e){if(typeof e!="string")return!1;const t=e.trim().toLowerCase();return t?t==="__oos__"||t==="oos"||t==="无货":!1}function _f(e){const t=Array.isArray(e.fill_items_merged)?e.fill_items_merged:[];if(!t.length)return null;const n=Array.isArray(e.items)?e.items:[],i=Array.isArray(e.shortage)?e.shortage:[],s=new Map;for(const o of n)s.set(o.row,o);const r=t.map((o,a)=>{const l=o.row,c=s.get(l)??{},p=Number(o.qty??0),u=o.unit_price,f=u==null?null:Number(u),b=f==null||Number.isNaN(f)?null:f*p,x=String(o.code??""),k=String(o.quote_name??"").trim();let S=0,E=0;for(const N of i)if(N.row===l){S=Number(N.available_qty??0),E=Number(N.shortfall??0);break}const M=Ro(x)||k.includes("库存不足");return!M&&E===0&&S===0&&x&&!Ro(x)&&(S=p),{row_index:a,row:typeof l=="number"?l:void 0,product_name:String(c.product_name??""),specification:String(o.specification??c.specification??""),qty:p,code:x,quote_name:k,unit_price:f,amount:b,available_qty:S,shortfall:E,is_shortage:M?1:0,match_source:null}});return{name:Sn({name:typeof e.name=="string"?e.name:"",file_path:typeof e.file_path=="string"?e.file_path:null}),file_path:typeof e.file_path=="string"?e.file_path:null,source:"file",lines:r}}function Af(e){if(!Array.isArray(e))return null;let t=null;for(const n of e){const i=n.type,s=n.content;if(i!=="observation"||typeof s!="string")continue;const r=Sf(s);if(!r||typeof r!="object")continue;const o=r.pending_quotation_draft;if(o&&Array.isArray(o.lines)){t={...o,name:Sn(o)};continue}const a=_f(r);a&&(t=a)}return t}function Cf(e){const t=Y(e,"/api/work","pending_choices[]"),i=rt(t.options,"/api/work","pending_choices[].options").map(s=>{const r=Y(s,"/api/work","pending_choices[].options[]");return{code:tt(r.code,"/api/work","pending_choices[].options[].code"),matched_name:z(r.matched_name),unit_price:he(r.unit_price),reasoning:z(r.reasoning)}});return{id:tt(t.id,"/api/work","pending_choices[].id"),row:he(t.row),keywords:z(t.keywords),product_name:z(t.product_name),specification:z(t.specification),qty:he(t.qty)??z(t.qty),options:i}}function Tf(e){const t=Y(e,"/api/work","pending_quotation_draft"),i=rt(t.lines,"/api/work","pending_quotation_draft.lines").map((s,r)=>{const o=Y(s,"/api/work","pending_quotation_draft.lines[]"),a=he(o.qty)??Number(o.qty??0),l=o.unit_price==null?null:Number(o.unit_price);return{row_index:he(o.row_index)??r,row:he(o.row),product_name:z(o.product_name),specification:z(o.specification),qty:Number.isFinite(a)?a:0,code:z(o.code),quote_name:z(o.quote_name),unit_price:l==null||Number.isNaN(l)?null:l,amount:o.amount==null?null:Number(o.amount),available_qty:he(o.available_qty)??Number(o.available_qty??0),shortfall:he(o.shortfall)??Number(o.shortfall??0),is_shortage:he(o.is_shortage)??(Vs(o.is_shortage)?1:0),match_source:z(o.match_source)??null}});return{name:Sn({name:z(t.name)??"",file_path:z(t.file_path)??null}),file_path:z(t.file_path)??null,source:z(t.source)??"file",lines:i}}function ws(e,t){const n=Y(e,t),s=(z(n.status)??"done")==="awaiting_choices"?"awaiting_choices":"done",r={status:s,success:Vs(n.success)??!0,answer:z(n.answer)??"",trace:Array.isArray(n.trace)?n.trace:[],error:z(n.error)};if(n.pending_quotation_draft!=null&&(r.pending_quotation_draft=Tf(n.pending_quotation_draft)),s==="awaiting_choices"){r.run_id=tt(n.run_id,t,"run_id");const o=rt(n.pending_choices,t,"pending_choices");r.pending_choices=o.map(a=>Cf(a))}return r}function $s(e,t){if(e.workResult={success:t.success,answer:t.answer,trace:t.trace,error:t.error},e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null,t.status==="awaiting_choices"){ti(e,"awaiting_choices"),e.workRunId=t.run_id??null,e.workPendingChoices=t.pending_choices??[];const n={};for(const i of e.workPendingChoices)n[i.id]="__OOS__";e.workSelections=n;return}if(dr(e),t.pending_quotation_draft&&Array.isArray(t.pending_quotation_draft.lines))e.workPendingQuotationDraft={...t.pending_quotation_draft,name:Sn(t.pending_quotation_draft)};else{const n=Af(t.trace);n&&(e.workPendingQuotationDraft=n)}t.success===!1||t.error&&t.error.trim()?(Ot(e,"error"),e.workError=ee("执行报价流程",t.error??"后端返回失败状态","本次报价流程未完成","点击“重试”重新运行，或检查后端日志")):ti(e,"done")}function ur(e){return new Promise(t=>setTimeout(t,e))}function Dl(e){return e===408||e===429||e===500||e===502||e===503||e===504}function Ml(e,t){const n=jt(e),i=new AbortController;n.controller=i,n.timeoutReached=!1;const s=setTimeout(()=>{n.timeoutReached=!0,i.abort("timeout")},t);return{signal:i.signal,close:()=>{clearTimeout(s),n.controller===i&&(n.controller=null)}}}function ni(e){return e instanceof Error?e.name==="AbortError"||/aborted/i.test(e.message):!1}function Ef(e,t){Ot(e,"error"),dr(e),e.workResult={success:!1,error:t},e.workError=ee("执行报价流程",t,"流程被中断，未产出有效结果","点击“重试”再次执行")}function pr(e){Ot(e,"idle"),e.workError="已取消当前流程。",e.workResult=null}async function Rf(e,t){const n={file_paths:e.workFilePaths,customer_level:e.workCustomerLevel,do_register_oos:e.workDoRegisterOos},{signal:i,close:s}=Ml(e,wf);try{const r=await fetch(bi(e.basePath,t),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n),credentials:"same-origin",signal:i});if(!r.ok||!r.body){const p=await r.json().catch(()=>({})),u=me(p,`HTTP ${r.status}`);throw Dl(r.status)?new ze(u):new Error(u)}const o=r.body.getReader(),a=new TextDecoder;let l="",c=!1;for(;;){const{done:p,value:u}=await o.read();if(p)break;l+=a.decode(u,{stream:!0});const f=l.split(`
`);l=f.pop()??"";for(const b of f){if(!b.startsWith("data: "))continue;const x=b.slice(6).trim();if(!x)continue;const k=Y(JSON.parse(x),t,"stream_event"),S=tt(k.type,t,"stream_event.type");if(S==="stage"){const E=he(k.stage)??Number(k.stage);if(!Number.isFinite(E))throw new le(t,"stage must be a number");e.workProgressStage=E,await ur(80)}else if(S==="result"){const E=ws(k.payload,t);$s(e,E),c=!0;break}}if(c)break}if(!c&&l.startsWith("data: ")){const p=l.slice(6).trim();if(p){const u=Y(JSON.parse(p),t,"stream_event_tail");if(u.type==="result"){const f=ws(u.payload,t);$s(e,f),c=!0}}}if(!c)throw new le(t,"stream ended without result event")}catch(r){const o=jt(e);throw o.cancelRequested?new Error("__WORK_CANCELLED__"):ni(r)&&o.timeoutReached?new ze("请求超时"):ni(r)?new Error("请求已中断"):r instanceof le||r instanceof ze?r:r instanceof Error&&/network|failed to fetch|load failed/i.test(r.message)?new ze(r.message):r}finally{s()}}function Lf(e,t){if(e===404||e===410)return!0;const n=me(t,"").toLowerCase();return n.includes("run_id")||n.includes("run id")}async function If(e,t,n){const i="/api/work/resume",{signal:s,close:r}=Ml(e,$f);try{const o=await fetch(bi(e.basePath,i),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({run_id:t,selections:n}),credentials:"same-origin",signal:s}),a=await o.json().catch(()=>({}));if(!o.ok){if(Lf(o.status,a))throw new bs(me(a,"run_id 已失效"));const c=me(a,`HTTP ${o.status}`);throw Dl(o.status)?new ze(c):new Error(c)}const l=ws(a,i);$s(e,l)}catch(o){const a=jt(e);throw a.cancelRequested?new Error("__WORK_CANCELLED__"):o instanceof bs?o:ni(o)&&a.timeoutReached?new ze("请求超时"):ni(o)?new Error("请求已中断"):o instanceof le||o instanceof ze?o:o instanceof Error&&/network|failed to fetch|load failed/i.test(o.message)?new ze(o.message):o}finally{r()}}function Pf(e){var n;const t=jt(e);t.cancelRequested=!0,(n=t.controller)==null||n.abort("user_cancel"),pr(e),e.workRunning=!1}async function Fl(e){if(!e.workFilePaths.length){e.workError="请先上传至少一个报价单文件";return}const t=jt(e);t.cancelRequested=!1,e.workRunning=!0,e.workError=null,e.workResult=null,e.workRunId=null,e.workPendingChoices=[],e.workSelections={},e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null,ti(e,"running");let n=0;try{for(;;){n+=1;try{await Rf(e,"/api/work/run-stream");break}catch(i){if(i instanceof Error&&i.message==="__WORK_CANCELLED__"){pr(e);break}if(i instanceof ze&&n<=Ll){await ur(Il*n);continue}const s=i instanceof le||i instanceof Error?i.message:String(i);Ef(e,s);break}}}finally{e.workRunning=!1}}async function Nl(e){const t=e.workRunId;if(!t||e.workPendingChoices.length===0){e.workError="缺少可继续的 run_id，请重新执行。",Ot(e,"error");return}const n=e.workPendingChoices.map(r=>({item_id:r.id,selected_code:e.workSelections[r.id]??"__OOS__"})),i=jt(e);i.cancelRequested=!1,e.workRunning=!0,e.workError=null,ti(e,"resuming");let s=0;try{for(;;){s+=1;try{await If(e,t,n);break}catch(r){if(r instanceof Error&&r.message==="__WORK_CANCELLED__"){pr(e);break}if(r instanceof bs){dr(e),e.workResult={success:!1,error:r.message},e.workError=ee("继续流程",r.message,"当前待选项无法继续提交","请重新执行一次 Work 流程"),Ot(e,"error");break}if(r instanceof ze&&s<=Ll){await ur(Il*s);continue}const o=r instanceof le||r instanceof Error?r.message:String(r);e.workResult={success:!1,error:o},e.workError=ee("继续流程",o,"本次续跑失败，尚未生成完整结果","点击“重试”继续，或重新执行 Work"),Ot(e,"error");break}}}finally{e.workRunning=!1}}async function Df(e){if(e.workRunId&&e.workPendingChoices.length>0){await Nl(e);return}await Fl(e)}async function Mf(e){const t=(e.workTextInput||"").trim();if(!t)return e.workTextError="请输入产品描述文字",!1;e.workTextGenerating=!0,e.workTextError=null;try{const n=await fetch(bi(e.basePath,"/api/quotation/from-text"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t}),credentials:"same-origin"}),i=await n.json().catch(()=>({}));if(!n.ok){let a=typeof i.detail=="string"?i.detail:me(i,`HTTP ${n.status}`);return n.status===405&&(a="Method Not Allowed：该接口需 POST。请确认使用 python start.py 或 run_backend.py 启动前后端一体服务，且未通过仅支持 GET 的静态托管访问页面。"),e.workTextError=a,!1}const s=typeof i.file_path=="string"?i.file_path:"",r=typeof i.file_name=="string"?i.file_name:"文字报价.xlsx";if(!s)return e.workTextError="接口未返回 file_path",!1;e.workFilePaths.includes(s)||(e.workFilePaths=[...e.workFilePaths,s]);const o=Pl(s);return o&&(e.workOriginalFileNamesByPath={...e.workOriginalFileNamesByPath,[o]:(r||"").trim()||s.split(/[/\\]/).pop()||s}),e.workTextError=null,!0}catch(n){const i=n instanceof Error?n.message:String(n);return e.workTextError=ee("从文字生成报价单",i,"未生成文件","请检查网络或后端后重试"),!1}finally{e.workTextGenerating=!1}}async function Ff(e){var n;const t=e.workPendingQuotationDraft;if(!((n=t==null?void 0:t.lines)!=null&&n.length))return e.workQuotationDraftSaveStatus={status:"error",error:"无报价明细可保存"},!1;e.workQuotationDraftSaveStatus={status:"saving"};try{const i=await fetch(bi(e.basePath,"/api/quotation-drafts"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:kf(e,t),source:t.source||"file",file_path:t.file_path??void 0,lines:t.lines.map(u=>({product_name:u.product_name??"",specification:u.specification??"",qty:Number(u.qty)||0,code:u.code??"",quote_name:u.quote_name??"",unit_price:u.unit_price!=null?Number(u.unit_price):null,amount:u.amount!=null?Number(u.amount):null,available_qty:Number(u.available_qty)||0,shortfall:Number(u.shortfall)||0,is_shortage:u.is_shortage?1:0,match_source:u.match_source??null}))}),credentials:"same-origin"}),s=await i.json().catch(()=>({}));if(!i.ok)return e.workQuotationDraftSaveStatus={status:"error",error:ee("保存报价单",me(s,`HTTP ${i.status}`),"报价单仍停留在待保存状态","点击“重试”再次保存")},!1;const r=Y(s,"/api/quotation-drafts"),o=Vs(r.success),a=Y(r.data,"/api/quotation-drafts","data"),l=tt(a.draft_no,"/api/quotation-drafts","data.draft_no"),c=he(a.draft_id)??Number(a.draft_id),p=Number.isFinite(c)?c:0;if(o===!1)throw new le("/api/quotation-drafts","success is false");return e.workQuotationDraftSaveStatus={status:"ok",draft_no:l,draft_id:p},e.workPendingQuotationDraft=null,!0}catch(i){const s=i instanceof le||i instanceof Error?i.message:String(i);return e.workQuotationDraftSaveStatus={status:"error",error:ee("保存报价单",s,"报价单仍停留在待保存状态","检查数据后重试")},!1}}const Nf=[{value:"FACTORY_INC_TAX",label:"出厂价_含税"},{value:"FACTORY_EXC_TAX",label:"出厂价_不含税"},{value:"PURCHASE_EXC_TAX",label:"采购不含税"},{value:"A_MARGIN",label:"（二级代理）A级别 利润率"},{value:"A_QUOTE",label:"（二级代理）A级别 报单价格"},{value:"B_MARGIN",label:"（一级代理）B级别 利润率"},{value:"B_QUOTE",label:"（一级代理）B级别 报单价格"},{value:"C_MARGIN",label:"（聚万大客户）C级别 利润率"},{value:"C_QUOTE",label:"（聚万大客户）C级别 报单价格"},{value:"D_MARGIN",label:"（青山大客户）D级别 利润率"},{value:"D_QUOTE",label:"（青山大客户）D级别 报单价格"},{value:"D_LOW",label:"（青山大客户）D级别 降低利润率"},{value:"E_MARGIN",label:"（大唐大客户）E级别（包运费） 利润率"},{value:"E_QUOTE",label:"（大唐大客户）E级别（包运费） 报单价格"}];function Lo(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}function Of(e){try{if(typeof e!="string"||!e.trim())return null;const t=e.trim();return t.startsWith("{")&&t.endsWith("}")||t.startsWith("[")&&t.endsWith("]")?JSON.parse(t):null}catch{return null}}function Bf(e){if(!Array.isArray(e))return[];const t=[];for(const n of e){const i=n.type,s=n.content;if(i!=="observation"||typeof s!="string")continue;const r=Of(s);if(!r||typeof r!="object")continue;const o=r.output_path;if(typeof o=="string"&&o.trim()){const a=o.replace(/\\/g,"/").split("/").filter(Boolean).pop()??"";a&&!t.includes(a)&&t.push(a)}}return t}function Uf(e,t,n){return d`
    <li style="margin-bottom: 14px; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
      <div style="font-size: 13px; margin-bottom: 8px;">
        ${e.product_name??e.keywords??""}
        ${e.specification?d`<span class="muted"> · ${e.specification}</span>`:w}
        ${e.qty!=null?d`<span class="muted"> · ${g("work.qty")}: ${e.qty}</span>`:w}
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
  `}function zf(e){var re,X,Ee;const{basePath:t,workFilePaths:n,workRunning:i,workProgressStage:s,workRunStatus:r,workPendingChoices:o,workSelections:a,workResult:l,workError:c,workCustomerLevel:p,workDoRegisterOos:u,workPendingQuotationDraft:f,workQuotationDraftSaveStatus:b,workTextInput:x,workTextGenerating:k,workTextError:S,onAddFile:E,onRemoveFile:M,onWorkTextChange:N,onGenerateFromText:I,onCustomerLevelChange:_,onDoRegisterOosChange:h,onRun:A,onCancel:C,onRetry:R,onSelectionChange:H,onResume:U,onQuotationLineChange:j,onQuotationDraftSave:K,onQuotationDraftDismiss:Z}=e,B=[g("work.stageExtract"),g("work.stageMatch"),g("work.stageFill")],ie=P=>{const Q=Lo(t,"/api/quotation/upload"),q=new FormData;q.append("file",P),fetch(Q,{method:"POST",body:q,credentials:"same-origin"}).then(oe=>oe.json()).then(oe=>{typeof oe.file_path=="string"&&E(oe.file_path,oe.file_name??P.name)}).catch(()=>{})},ve=P=>{var oe;const Q=P.target,q=(oe=Q.files)==null?void 0:oe[0];q&&(ie(q),Q.value="")},L=P=>{var q;P.preventDefault();const Q=(q=P.dataTransfer)==null?void 0:q.files;if(!(!Q||!Q.length))for(let oe=0;oe<Q.length;oe+=1){const je=Q.item(oe);je&&ie(je)}},se=P=>{P.preventDefault(),P.dataTransfer&&(P.dataTransfer.dropEffect="copy")};return d`
    <section class="card" style="margin-bottom: 16px;" aria-label=${g("tabs.work")}>
      <div class="card-title" style="margin-bottom: 8px;">${g("tabs.work")}</div>
      <p class="muted" style="margin-bottom: 12px;">${g("subtitles.work")}</p>

      <div
        style="margin-bottom: 12px; padding: 10px; border-radius: 8px; border: 1px dashed var(--border); background: var(--bg-secondary, #fafafa);"
        @dragover=${se}
        @dragenter=${se}
        @drop=${L}
      >
        <label class="card-title" style="font-size: 13px;">${g("work.uploadTitle")}</label>
        <input
          type="file"
          accept=".xlsx,.xls,.xlsm"
          @change=${ve}
          style="margin-top: 6px;"
          aria-label=${g("work.uploadTitle")}
        />
        ${n.length?d`
              <ul style="margin-top: 8px; padding-left: 20px; font-size: 13px;">
                ${n.map((P,Q)=>d`
                    <li style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                      <span style="word-break: break-all;">${P.split(/[/\\]/).pop()??P}</span>
                      <button
                        type="button"
                        class="btn btn-sm"
                        style="padding: 2px 8px;"
                        @click=${()=>M(Q)}
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
          @input=${P=>N(P.target.value)}
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
            @click=${I}
            aria-label=${g("work.generateFromText")}
          >
            ${g(k?"work.textGenerating":"work.generateFromText")}
          </button>
          ${S?d`<span style="color: var(--danger, #c00); font-size: 13px;" role="alert">${S}</span>`:w}
        </div>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 12px;">
        <div>
          <label style="font-size: 12px; color: var(--muted);">${g("work.customerLevel")}</label>
          <select
            .value=${p}
            @change=${P=>_(P.target.value)}
            style="margin-left: 8px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 160px;"
            aria-label=${g("work.customerLevel")}
          >
            ${Nf.map(P=>d`<option value=${P.value}>${P.label}</option>`)}
          </select>
        </div>
        <label style="display: flex; align-items: center; gap: 6px; font-size: 13px;">
          <input
            type="checkbox"
            ?checked=${u}
            @change=${P=>h(P.target.checked)}
            aria-label=${g("work.registerOos")}
          />
          ${g("work.registerOos")}
        </label>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${i?d`
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                ${B.map((P,Q)=>d`
                    <span
                      style="
                        padding: 6px 12px;
                        border-radius: 8px;
                        font-size: 13px;
                        background: ${s>=0&&Q===s?"var(--accent)":"var(--bg-secondary, #eee)"};
                        color: ${s>=0&&Q===s?"var(--bg)":"var(--muted)"};
                      "
                    >
                      ${Q+1}. ${P}
                    </span>
                  `)}
              </div>
              <p class="muted" style="font-size: 12px; margin: 0;">
                ${g("work.currentStage")}: ${s>=0&&s<B.length?B[s]:g("work.running")}
              </p>
            `:w}

        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
          <button
            class="btn"
            style="background: var(--accent); color: var(--bg);"
            ?disabled=${n.length===0||i}
            @click=${A}
            aria-label=${g("work.run")}
          >
            ${g(i?"work.running":"work.run")}
          </button>
          ${i?d`<button class="btn btn-sm" @click=${C} aria-label=${g("work.cancel")}>${g("work.cancel")}</button>`:w}
          ${r==="error"?d`<button class="btn btn-sm" @click=${R} aria-label=${g("common.retry")}>${g("common.retry")}</button>`:w}
          ${n.length===0?d`<span class="muted" style="font-size: 12px;">${g("work.runHint")}</span>`:w}
          <span class="muted" style="font-size: 12px;">${g("work.statusLabel")}: ${r}</span>
        </div>
      </div>

      ${c?d`
            <div style="margin-top: 12px; padding: 10px; border: 1px solid var(--danger, #e53935); border-radius: 8px;" role="alert" aria-live="assertive">
              <p style="margin: 0; color: var(--danger, #e53935); font-size: 13px;">${c}</p>
            </div>
          `:w}
    </section>

    ${r==="awaiting_choices"&&o.length?d`
          <section class="card" style="margin-bottom: 16px;" aria-live="polite">
            <div class="card-title">${g("work.awaitingTitle")}</div>
            <p class="muted" style="margin-bottom: 12px;">${g("work.awaitingHint")}</p>
            <ul style="list-style: none; padding: 0; margin: 0;">
              ${o.map(P=>Uf(P,a[P.id]??"__OOS__",Q=>H(P.id,Q)))}
            </ul>
            <div style="display: flex; gap: 8px; margin-top: 12px;">
              <button class="btn" style="background: var(--accent); color: var(--bg);" ?disabled=${i} @click=${U}>
                ${g(i||r==="resuming"?"work.resuming":"work.resume")}
              </button>
              ${r==="error"?d`<button class="btn btn-sm" @click=${R}>${g("common.retry")}</button>`:w}
            </div>
          </section>
        `:w}

    ${(b==null?void 0:b.status)==="ok"?d`
          <section class="card" style="margin-bottom: 16px;" role="status" aria-live="polite">
            <p style="color: var(--success, #2e7d32); margin: 0 0 4px 0;">${g("work.savedDraftNo",{no:b.draft_no})}</p>
            <p class="muted" style="margin: 0 0 8px 0; font-size: 12px;">${g("work.saveSuccessHint")}</p>
            <button class="btn btn-sm" @click=${Z}>${g("common.close")}</button>
          </section>
        `:(re=f==null?void 0:f.lines)!=null&&re.length?d`
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
                    ${f.lines.map((P,Q)=>d`
                        <tr>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${Q+1}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${P.product_name??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${P.specification??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="number" min="0" step="1" .value=${String(P.qty??"")} @change=${q=>j(Q,"qty",q.target.value)} style="width: 72px;" aria-label=${g("work.lineQty")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="text" .value=${P.code??""} @change=${q=>j(Q,"code",q.target.value)} style="width: 90px;" aria-label=${g("work.lineCode")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="text" .value=${P.quote_name??""} @change=${q=>j(Q,"quote_name",q.target.value)} style="width: 120px;" aria-label=${g("work.lineQuoteName")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="number" min="0" step="0.01" .value=${P.unit_price!=null?String(P.unit_price):""} @change=${q=>j(Q,"unit_price",q.target.value)} style="width: 90px;" aria-label=${g("work.linePrice")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${P.amount!=null?P.amount:""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${P.available_qty??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${P.shortfall??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${P.is_shortage?g("common.yes"):g("common.no")}</td>
                        </tr>
                      `)}
                  </tbody>
                </table>
              </div>

              ${(b==null?void 0:b.status)==="error"?d`<p style="color: var(--danger, #c00); margin-bottom: 10px;">${b.error}</p>`:w}

              <div style="display: flex; gap: 8px;">
                <button class="btn" style="background: var(--accent); color: var(--bg);" ?disabled=${(b==null?void 0:b.status)==="saving"} @click=${K}>
                  ${(b==null?void 0:b.status)==="saving"?g("work.saving"):g("work.saveDraft")}
                </button>
                <button class="btn btn-sm" ?disabled=${(b==null?void 0:b.status)==="saving"} @click=${Z}>
                  ${g("common.cancel")}
                </button>
              </div>
            </section>
          `:w}

    ${l&&!((X=f==null?void 0:f.lines)!=null&&X.length)?d`
          <section class="card">
            <div class="card-title">${g("work.resultTitle")}</div>
            ${(()=>{const P=Bf(l.trace);return P.length?d`
                    <div style="margin-bottom: 12px;">
                      ${P.map(Q=>d`
                          <a href=${Lo(t,`/api/quotation/download?path=${encodeURIComponent(Q)}`)} download=${Q} class="btn btn-sm" style="margin-right: 8px; margin-bottom: 6px; text-decoration: none;">
                            ${g("work.download",{name:Q})}
                          </a>
                        `)}
                    </div>
                  `:w})()}

            ${l.answer?d`<div style="white-space: pre-wrap; margin-bottom: 12px;">${l.answer}</div>`:w}
            ${l.error?d`<p style="color: var(--danger, #e53935);">${l.error}</p>`:w}

            ${(Ee=l.trace)!=null&&Ee.length?d`
                  <details style="margin-top: 12px;">
                    <summary>${g("work.trace",{count:String(l.trace.length)})}</summary>
                    <pre style="max-height: 420px; overflow: auto; margin-top: 8px; font-size: 11px; white-space: pre-wrap;">${JSON.stringify(l.trace,null,2)}</pre>
                  </details>
                `:w}
          </section>
        `:w}
  `}function Io(e){return(e||"").trim().replace(/\\/g,"/").toLowerCase()}function Hf(e){return e.tab!=="work"?w:zf({basePath:e.basePath,workFilePaths:e.workFilePaths,workRunning:e.workRunning,workProgressStage:e.workProgressStage,workRunStatus:e.workRunStatus,workRunId:e.workRunId,workPendingChoices:e.workPendingChoices,workSelections:e.workSelections,workResult:e.workResult,workError:e.workError,workCustomerLevel:e.workCustomerLevel,workDoRegisterOos:e.workDoRegisterOos,workOriginalFileNamesByPath:e.workOriginalFileNamesByPath,workPendingQuotationDraft:e.workPendingQuotationDraft,workQuotationDraftSaveStatus:e.workQuotationDraftSaveStatus,workTextInput:e.workTextInput,workTextGenerating:e.workTextGenerating,workTextError:e.workTextError,onWorkTextChange:t=>{e.workTextInput=t},onGenerateFromText:()=>{Mf(e)},onAddFile:(t,n)=>{e.workFilePaths.includes(t)||(e.workFilePaths=[...e.workFilePaths,t]);const i=Io(t);i&&(e.workOriginalFileNamesByPath={...e.workOriginalFileNamesByPath,[i]:(n||"").trim()||t.split(/[/\\]/).pop()||t})},onRemoveFile:t=>{const n=e.workFilePaths[t]??"";e.workFilePaths=e.workFilePaths.filter((s,r)=>r!==t);const i=Io(n);if(i&&e.workOriginalFileNamesByPath[i]!==void 0){const s={...e.workOriginalFileNamesByPath};delete s[i],e.workOriginalFileNamesByPath=s}},onCustomerLevelChange:t=>{e.workCustomerLevel=t},onDoRegisterOosChange:t=>{e.workDoRegisterOos=t},onRun:()=>void Fl(e),onCancel:()=>Pf(e),onRetry:()=>void Df(e),onSelectionChange:(t,n)=>{e.workSelections={...e.workSelections,[t]:n}},onResume:()=>void Nl(e),onQuotationLineChange:(t,n,i)=>{var a;const s=e.workPendingQuotationDraft;if(!((a=s==null?void 0:s.lines)!=null&&a.length)||t<0||t>=s.lines.length)return;const r=s.lines.slice(),o={...r[t]};if(n==="qty"){const l=Number(i);o.qty=Number.isFinite(l)?l:0}else if(n==="unit_price"){const l=String(i??"").trim();if(!l)o.unit_price=null;else{const c=Number(l);o.unit_price=Number.isFinite(c)?c:null}}else o[n]=i;if(n==="qty"||n==="unit_price"){const l=Number(o.qty??0),c=o.unit_price==null?NaN:Number(o.unit_price);o.amount=Number.isFinite(l)&&Number.isFinite(c)?l*c:null}r[t]=o,e.workPendingQuotationDraft={...s,lines:r}},onQuotationDraftSave:()=>{typeof window<"u"&&window.confirm(g("work.saveConfirm"))&&Ff(e).then(t=>{t&&e.loadFulfillDrafts()})},onQuotationDraftDismiss:()=>{e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null}})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const fr={CHILD:2},gr=e=>(...t)=>({_$litDirective$:e,values:t});let hr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,i){this._$Ct=t,this._$AM=n,this._$Ci=i}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:jf}=Vc,Po=e=>e,Kf=e=>e.strings===void 0,Do=()=>document.createComment(""),Vt=(e,t,n)=>{var r;const i=e._$AA.parentNode,s=t===void 0?e._$AB:t._$AA;if(n===void 0){const o=i.insertBefore(Do(),s),a=i.insertBefore(Do(),s);n=new jf(o,a,e,e.options)}else{const o=n._$AB.nextSibling,a=n._$AM,l=a!==e;if(l){let c;(r=n._$AQ)==null||r.call(n,e),n._$AM=e,n._$AP!==void 0&&(c=e._$AU)!==a._$AU&&n._$AP(c)}if(o!==s||l){let c=n._$AA;for(;c!==o;){const p=Po(c).nextSibling;Po(i).insertBefore(c,s),c=p}}}return n},ut=(e,t,n=e)=>(e._$AI(t,n),e),qf={},Wf=(e,t=qf)=>e._$AH=t,Gf=e=>e._$AH,Qi=e=>{e._$AR(),e._$AA.remove()};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Mo=(e,t,n)=>{const i=new Map;for(let s=t;s<=n;s++)i.set(e[s],s);return i},Ol=gr(class extends hr{constructor(e){if(super(e),e.type!==fr.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,n){let i;n===void 0?n=t:t!==void 0&&(i=t);const s=[],r=[];let o=0;for(const a of e)s[o]=i?i(a,o):o,r[o]=n(a,o),o++;return{values:r,keys:s}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,i]){const s=Gf(e),{values:r,keys:o}=this.dt(t,n,i);if(!Array.isArray(s))return this.ut=o,r;const a=this.ut??(this.ut=[]),l=[];let c,p,u=0,f=s.length-1,b=0,x=r.length-1;for(;u<=f&&b<=x;)if(s[u]===null)u++;else if(s[f]===null)f--;else if(a[u]===o[b])l[b]=ut(s[u],r[b]),u++,b++;else if(a[f]===o[x])l[x]=ut(s[f],r[x]),f--,x--;else if(a[u]===o[x])l[x]=ut(s[u],r[x]),Vt(e,l[x+1],s[u]),u++,x--;else if(a[f]===o[b])l[b]=ut(s[f],r[b]),Vt(e,s[u],s[f]),f--,b++;else if(c===void 0&&(c=Mo(o,b,x),p=Mo(a,u,f)),c.has(a[u]))if(c.has(a[f])){const k=p.get(o[b]),S=k!==void 0?s[k]:null;if(S===null){const E=Vt(e,s[u]);ut(E,r[b]),l[b]=E}else l[b]=ut(S,r[b]),Vt(e,s[u],S),s[k]=null;b++}else Qi(s[f]),f--;else Qi(s[u]),u++;for(;b<=x;){const k=Vt(e,l[x+1]);ut(k,r[b]),l[b++]=k}for(;u<=f;){const k=s[u++];k!==null&&Qi(k)}return this.ut=o,Wf(e,l),it}}),ue={messageSquare:d`
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
  `};function Vf(e){var s,r,o,a,l;const t=(s=e.hello)==null?void 0:s.snapshot,n=(o=(r=t==null?void 0:t.sessionDefaults)==null?void 0:r.mainSessionKey)==null?void 0:o.trim();if(n)return n;const i=(l=(a=t==null?void 0:t.sessionDefaults)==null?void 0:a.mainKey)==null?void 0:l.trim();return i||"main"}function Qf(e,t){e.sessionKey=t,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:t,lastActiveSessionKey:t})}function Jf(e,t){const n=gl(t,e.basePath);return d`
    <a
      href=${n}
      class="nav-item ${e.tab===t?"active":""}"
      @click=${i=>{if(!(i.defaultPrevented||i.button!==0||i.metaKey||i.ctrlKey||i.shiftKey||i.altKey)){if(i.preventDefault(),t==="chat"){const s=Vf(e);e.sessionKey!==s&&(Qf(e,s),e.loadAssistantIdentity())}e.setTab(t)}}}
      title=${gs(t)}
    >
      <span class="nav-item__icon" aria-hidden="true">${ue[sp(t)]}</span>
      <span class="nav-item__text">${gs(t)}</span>
    </a>
  `}function Yf(e){const t=Xf(e.hello,e.sessionsResult),n=tg(e.sessionKey,e.sessionsResult,t),i=e.onboarding,s=e.onboarding,r=e.onboarding?!1:e.settings.chatShowThinking,o=e.onboarding?!0:e.settings.chatFocusMode,a=d`
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
          @change=${c=>{const p=c.target.value;e.sessionKey=p,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:p,lastActiveSessionKey:p}),e.loadAssistantIdentity(),wp(e,p),bn(e)}}
        >
          ${Ol(n,c=>c.key,c=>d`<option value=${c.key} title=${c.key}>
                ${c.displayName??c.key}
              </option>`)}
        </select>
      </label>
      <button
        class="btn btn--sm btn--icon"
        ?disabled=${e.chatLoading||!e.connected}
        @click=${async()=>{const c=e;c.chatManualRefreshInFlight=!0,c.chatNewMessagesBelow=!1,await c.updateComplete,c.resetToolStream();try{await Cl(e,{scheduleScroll:!1}),c.scrollToBottom({smooth:!0})}finally{requestAnimationFrame(()=>{c.chatManualRefreshInFlight=!1,c.chatNewMessagesBelow=!1})}}}
        title=${g("chat.refreshTitle")}
      >
        ${a}
      </button>
      <span class="chat-controls__separator">|</span>
      <button
        class="btn btn--sm btn--icon ${r?"active":""}"
        ?disabled=${i}
        @click=${()=>{i||e.applySettings({...e.settings,chatShowThinking:!e.settings.chatShowThinking})}}
        aria-pressed=${r}
        title=${g(i?"chat.onboardingDisabled":"chat.thinkingToggle")}
      >
        ${ue.brain}
      </button>
      <button
        class="btn btn--sm btn--icon ${o?"active":""}"
        ?disabled=${s}
        @click=${()=>{s||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})}}
        aria-pressed=${o}
        title=${g(s?"chat.onboardingDisabled":"chat.focusToggle")}
      >
        ${l}
      </button>
    </div>
  `}function Xf(e,t){var r,o,a,l,c;const n=e==null?void 0:e.snapshot,i=(o=(r=n==null?void 0:n.sessionDefaults)==null?void 0:r.mainSessionKey)==null?void 0:o.trim();if(i)return i;const s=(l=(a=n==null?void 0:n.sessionDefaults)==null?void 0:a.mainKey)==null?void 0:l.trim();return s||((c=t==null?void 0:t.sessions)!=null&&c.some(p=>p.key==="main")?"main":null)}const Vn={bluebubbles:"iMessage",telegram:"Telegram",discord:"Discord",signal:"Signal",slack:"Slack",whatsapp:"WhatsApp",matrix:"Matrix",email:"Email",sms:"SMS"},Zf=Object.keys(Vn);function Fo(e){return e.charAt(0).toUpperCase()+e.slice(1)}function eg(e){if(e==="main"||e==="agent:main:main")return{prefix:"",fallbackName:"Main Session"};if(e.includes(":subagent:"))return{prefix:"Subagent:",fallbackName:"Subagent:"};if(e.includes(":cron:"))return{prefix:"Cron:",fallbackName:"Cron Job:"};const t=e.match(/^agent:[^:]+:([^:]+):direct:(.+)$/);if(t){const i=t[1],s=t[2];return{prefix:"",fallbackName:`${Vn[i]??Fo(i)} · ${s}`}}const n=e.match(/^agent:[^:]+:([^:]+):group:(.+)$/);if(n){const i=n[1];return{prefix:"",fallbackName:`${Vn[i]??Fo(i)} Group`}}for(const i of Zf)if(e===i||e.startsWith(`${i}:`))return{prefix:"",fallbackName:`${Vn[i]} Session`};return{prefix:"",fallbackName:e}}function Ji(e,t){var a,l;const n=((a=t==null?void 0:t.label)==null?void 0:a.trim())||"",i=((l=t==null?void 0:t.displayName)==null?void 0:l.trim())||"",{prefix:s,fallbackName:r}=eg(e),o=c=>s?new RegExp(`^${s.replace(/[.*+?^${}()|[\\]\\]/g,"\\$&")}\\s*`,"i").test(c)?c:`${s} ${c}`:c;return n&&n!==e?o(n):i&&i!==e?o(i):r}function tg(e,t,n){var a,l;const i=new Set,s=[],r=n&&((a=t==null?void 0:t.sessions)==null?void 0:a.find(c=>c.key===n)),o=(l=t==null?void 0:t.sessions)==null?void 0:l.find(c=>c.key===e);if(n&&(i.add(n),s.push({key:n,displayName:Ji(n,r||void 0)})),i.has(e)||(i.add(e),s.push({key:e,displayName:Ji(e,o)})),t!=null&&t.sessions)for(const c of t.sessions)i.has(c.key)||(i.add(c.key),s.push({key:c.key,displayName:Ji(c.key,c)}));return s}const ng=["system","light","dark"];function ig(e){const t=Math.max(0,ng.indexOf(e.theme)),n=i=>s=>{const o={element:s.currentTarget};(s.clientX||s.clientY)&&(o.pointerClientX=s.clientX,o.pointerClientY=s.clientY),e.setTheme(i,o)};return d`
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
          ${og()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="light"?"active":""}"
          @click=${n("light")}
          aria-pressed=${e.theme==="light"}
          aria-label="Light theme"
          title="Light"
        >
          ${sg()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="dark"?"active":""}"
          @click=${n("dark")}
          aria-pressed=${e.theme==="dark"}
          aria-label="Dark theme"
          title="Dark"
        >
          ${rg()}
        </button>
      </div>
    </div>
  `}function sg(){return d`
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
  `}function rg(){return d`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
      ></path>
    </svg>
  `}function og(){return d`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="20" height="14" x="2" y="3" rx="2"></rect>
      <line x1="8" x2="16" y1="21" y2="21"></line>
      <line x1="12" x2="12" y1="17" y2="21"></line>
    </svg>
  `}function Bl(e,t){if(!e)return e;const i=e.files.some(s=>s.name===t.name)?e.files.map(s=>s.name===t.name?t:s):[...e.files,t];return{...e,files:i}}async function Yi(e,t){if(!(!e.client||!e.connected||e.agentFilesLoading)){e.agentFilesLoading=!0,e.agentFilesError=null;try{const n=await e.client.request("agents.files.list",{agentId:t});n&&(e.agentFilesList=n,e.agentFileActive&&!n.files.some(i=>i.name===e.agentFileActive)&&(e.agentFileActive=null))}catch(n){e.agentFilesError=String(n)}finally{e.agentFilesLoading=!1}}}async function ag(e,t,n,i){if(!(!e.client||!e.connected||e.agentFilesLoading)&&!Object.hasOwn(e.agentFileContents,n)){e.agentFilesLoading=!0,e.agentFilesError=null;try{const s=await e.client.request("agents.files.get",{agentId:t,name:n});if(s!=null&&s.file){const r=s.file.content??"",o=e.agentFileContents[n]??"",a=e.agentFileDrafts[n],l=(i==null?void 0:i.preserveDraft)??!0;e.agentFilesList=Bl(e.agentFilesList,s.file),e.agentFileContents={...e.agentFileContents,[n]:r},(!l||!Object.hasOwn(e.agentFileDrafts,n)||a===o)&&(e.agentFileDrafts={...e.agentFileDrafts,[n]:r})}}catch(s){e.agentFilesError=String(s)}finally{e.agentFilesLoading=!1}}}async function lg(e,t,n,i){if(!(!e.client||!e.connected||e.agentFileSaving)){e.agentFileSaving=!0,e.agentFilesError=null;try{const s=await e.client.request("agents.files.set",{agentId:t,name:n,content:i});s!=null&&s.file&&(e.agentFilesList=Bl(e.agentFilesList,s.file),e.agentFileContents={...e.agentFileContents,[n]:i},e.agentFileDrafts={...e.agentFileDrafts,[n]:i})}catch(s){e.agentFilesError=String(s)}finally{e.agentFileSaving=!1}}}function Ul(e){return e?`${Xn(e)} (${_t(e)})`:"n/a"}function cg(e){if(e==null)return"";try{return JSON.stringify(e,null,2)}catch{return String(e)}}function dg(e){const t=e.state??{},n=t.nextRunAtMs?Xn(t.nextRunAtMs):"n/a",i=t.lastRunAtMs?Xn(t.lastRunAtMs):"n/a";return`${t.lastStatus??"n/a"} · next ${n} · last ${i}`}function ug(e){const t=e.schedule;if(t.kind==="at"){const n=Date.parse(t.at);return Number.isFinite(n)?`At ${Xn(n)}`:`At ${t.at}`}return t.kind==="every"?`Every ${ja(t.everyMs)}`:`Cron ${t.expr}${t.tz?` (${t.tz})`:""}`}function pg(e){const t=e.payload;if(t.kind==="systemEvent")return`System: ${t.text}`;const n=`Agent: ${t.message}`,i=e.delivery;if(i&&i.mode!=="none"){const s=i.mode==="webhook"?i.to?` (${i.to})`:"":i.channel||i.to?` (${i.channel??"last"}${i.to?` -> ${i.to}`:""})`:"";return`${n} · ${i.mode}${s}`}return n}function Je(e){const t=(e??"").trim();return t?t.replace(/\s+/g,"_").toLowerCase():""}function fg(e){return[]}function gg(e){return{allow:[],alsoAllow:[],deny:[]}}const No=[{id:"fs",label:"Files",tools:[{id:"read",label:"read",description:"Read file contents"},{id:"write",label:"write",description:"Create or overwrite files"},{id:"edit",label:"edit",description:"Make precise edits"},{id:"apply_patch",label:"apply_patch",description:"Patch files (OpenAI)"}]},{id:"runtime",label:"Runtime",tools:[{id:"exec",label:"exec",description:"Run shell commands"},{id:"process",label:"process",description:"Manage background processes"}]},{id:"web",label:"Web",tools:[{id:"web_search",label:"web_search",description:"Search the web"},{id:"web_fetch",label:"web_fetch",description:"Fetch web content"}]},{id:"memory",label:"Memory",tools:[{id:"memory_search",label:"memory_search",description:"Semantic search"},{id:"memory_get",label:"memory_get",description:"Read memory files"}]},{id:"sessions",label:"Sessions",tools:[{id:"sessions_list",label:"sessions_list",description:"List sessions"},{id:"sessions_history",label:"sessions_history",description:"Session history"},{id:"sessions_send",label:"sessions_send",description:"Send to session"},{id:"sessions_spawn",label:"sessions_spawn",description:"Spawn sub-agent"},{id:"session_status",label:"session_status",description:"Session status"}]},{id:"ui",label:"UI",tools:[{id:"browser",label:"browser",description:"Control web browser"},{id:"canvas",label:"canvas",description:"Control canvases"}]},{id:"messaging",label:"Messaging",tools:[{id:"message",label:"message",description:"Send messages"}]},{id:"automation",label:"Automation",tools:[{id:"cron",label:"cron",description:"Schedule tasks"},{id:"gateway",label:"gateway",description:"Gateway control"}]},{id:"nodes",label:"Nodes",tools:[{id:"nodes",label:"nodes",description:"Nodes + devices"}]},{id:"agents",label:"Agents",tools:[{id:"agents_list",label:"agents_list",description:"List agents"}]},{id:"media",label:"Media",tools:[{id:"image",label:"image",description:"Image understanding"}]}],hg=[{id:"minimal",label:"Minimal"},{id:"coding",label:"Coding"},{id:"messaging",label:"Messaging"},{id:"full",label:"Full"}];function xs(e){var t,n,i;return((t=e.name)==null?void 0:t.trim())||((i=(n=e.identity)==null?void 0:n.name)==null?void 0:i.trim())||e.id}function Nn(e){const t=e.trim();if(!t||t.length>16)return!1;let n=!1;for(let i=0;i<t.length;i+=1)if(t.charCodeAt(i)>127){n=!0;break}return!(!n||t.includes("://")||t.includes("/")||t.includes("."))}function wi(e,t){var o,a,l,c,p,u;const n=(o=t==null?void 0:t.emoji)==null?void 0:o.trim();if(n&&Nn(n))return n;const i=(l=(a=e.identity)==null?void 0:a.emoji)==null?void 0:l.trim();if(i&&Nn(i))return i;const s=(c=t==null?void 0:t.avatar)==null?void 0:c.trim();if(s&&Nn(s))return s;const r=(u=(p=e.identity)==null?void 0:p.avatar)==null?void 0:u.trim();return r&&Nn(r)?r:""}function zl(e,t){return t&&e===t?"default":null}function mg(e){if(e==null||!Number.isFinite(e))return"-";if(e<1024)return`${e} B`;const t=["KB","MB","GB","TB"];let n=e/1024,i=0;for(;n>=1024&&i<t.length-1;)n/=1024,i+=1;return`${n.toFixed(n<10?1:0)} ${t[i]}`}function $i(e,t){var r,o;const n=e;return{entry:(((r=n==null?void 0:n.agents)==null?void 0:r.list)??[]).find(a=>(a==null?void 0:a.id)===t),defaults:(o=n==null?void 0:n.agents)==null?void 0:o.defaults,globalTools:n==null?void 0:n.tools}}function Oo(e,t,n,i,s){var b,x,k,S,E,M,N,I,_,h,A,C;const r=$i(t,e.id),a=(n&&n.agentId===e.id?n.workspace:null)||((b=r.entry)==null?void 0:b.workspace)||((x=r.defaults)==null?void 0:x.workspace)||"default",l=(k=r.entry)!=null&&k.model?ln((S=r.entry)==null?void 0:S.model):ln((E=r.defaults)==null?void 0:E.model),c=((M=s==null?void 0:s.name)==null?void 0:M.trim())||((I=(N=e.identity)==null?void 0:N.name)==null?void 0:I.trim())||((_=e.name)==null?void 0:_.trim())||((h=r.entry)==null?void 0:h.name)||e.id,p=wi(e,s)||"-",u=Array.isArray((A=r.entry)==null?void 0:A.skills)?(C=r.entry)==null?void 0:C.skills:null,f=(u==null?void 0:u.length)??null;return{workspace:a,model:l,identityName:c,identityEmoji:p,skillsLabel:u?`${f} selected`:"all skills",isDefault:!!(i&&e.id===i)}}function ln(e){var t;if(!e)return"-";if(typeof e=="string")return e.trim()||"-";if(typeof e=="object"&&e){const n=e,i=(t=n.primary)==null?void 0:t.trim();if(i){const s=Array.isArray(n.fallbacks)?n.fallbacks.length:0;return s>0?`${i} (+${s} fallback)`:i}}return"-"}function Bo(e){const t=e.match(/^(.+) \(\+\d+ fallback\)$/);return t?t[1]:e}function Uo(e){if(!e)return null;if(typeof e=="string")return e.trim()||null;if(typeof e=="object"&&e){const t=e,n=typeof t.primary=="string"?t.primary:typeof t.model=="string"?t.model:typeof t.id=="string"?t.id:typeof t.value=="string"?t.value:null;return(n==null?void 0:n.trim())||null}return null}function vg(e){if(!e||typeof e=="string")return null;if(typeof e=="object"&&e){const t=e,n=Array.isArray(t.fallbacks)?t.fallbacks:Array.isArray(t.fallback)?t.fallback:null;return n?n.filter(i=>typeof i=="string"):null}return null}function yg(e){return e.split(",").map(t=>t.trim()).filter(Boolean)}function bg(e){var s,r,o;const t=e,n=(r=(s=t==null?void 0:t.agents)==null?void 0:s.defaults)==null?void 0:r.models;if(!n||typeof n!="object")return[];const i=[];for(const[a,l]of Object.entries(n)){const c=a.trim();if(!c)continue;const p=l&&typeof l=="object"&&"alias"in l&&typeof l.alias=="string"?(o=l.alias)==null?void 0:o.trim():void 0,u=p&&p!==c?`${p} (${c})`:c;i.push({value:c,label:u})}return i}function wg(e,t){const n=bg(e),i=t?n.some(s=>s.value===t):!1;return t&&!i&&n.unshift({value:t,label:`Current (${t})`}),n.length===0?d`
      <option value="" disabled>No configured models</option>
    `:n.map(s=>d`<option value=${s.value}>${s.label}</option>`)}function $g(e){const t=Je(e);if(!t)return{kind:"exact",value:""};if(t==="*")return{kind:"all"};if(!t.includes("*"))return{kind:"exact",value:t};const n=t.replace(/[.*+?^${}()|[\\]\\]/g,"\\$&");return{kind:"regex",value:new RegExp(`^${n.replaceAll("\\*",".*")}$`)}}function ks(e){return Array.isArray(e)?fg().map($g).filter(t=>t.kind!=="exact"||t.value.length>0):[]}function cn(e,t){for(const n of t)if(n.kind==="all"||n.kind==="exact"&&e===n.value||n.kind==="regex"&&n.value.test(e))return!0;return!1}function xg(e,t){if(!t)return!0;const n=Je(e),i=ks(t.deny);if(cn(n,i))return!1;const s=ks(t.allow);return!!(s.length===0||cn(n,s)||n==="apply_patch"&&cn("exec",s))}function zo(e,t){if(!Array.isArray(t)||t.length===0)return!1;const n=Je(e),i=ks(t);return!!(cn(n,i)||n==="apply_patch"&&cn("exec",i))}function kg(e){return gg()??void 0}function Hl(e,t){return d`
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
  `}function Sg(e,t){var i,s;const n=(i=e.channelMeta)==null?void 0:i.find(r=>r.id===t);return n!=null&&n.label?n.label:((s=e.channelLabels)==null?void 0:s[t])??t}function _g(e){var s;if(!e)return[];const t=new Set;for(const r of e.channelOrder??[])t.add(r);for(const r of e.channelMeta??[])t.add(r.id);for(const r of Object.keys(e.channelAccounts??{}))t.add(r);const n=[],i=(s=e.channelOrder)!=null&&s.length?e.channelOrder:Array.from(t);for(const r of i)t.has(r)&&(n.push(r),t.delete(r));for(const r of t)n.push(r);return n.map(r=>{var o;return{id:r,label:Sg(e,r),accounts:((o=e.channelAccounts)==null?void 0:o[r])??[]}})}const Ag=["groupPolicy","streamMode","dmPolicy"];function Cg(e,t){if(!e)return null;const i=(e.channels??{})[t];if(i&&typeof i=="object")return i;const s=e[t];return s&&typeof s=="object"?s:null}function Tg(e){if(e==null)return"n/a";if(typeof e=="string"||typeof e=="number"||typeof e=="boolean")return String(e);try{return JSON.stringify(e)}catch{return"n/a"}}function Eg(e,t){const n=Cg(e,t);return n?Ag.flatMap(i=>i in n?[{label:i,value:Tg(n[i])}]:[]):[]}function Rg(e){let t=0,n=0,i=0;for(const s of e){const r=s.probe&&typeof s.probe=="object"&&"ok"in s.probe?!!s.probe.ok:!1;(s.connected===!0||s.running===!0||r)&&(t+=1),s.configured&&(n+=1),s.enabled&&(i+=1)}return{total:e.length,connected:t,configured:n,enabled:i}}function Lg(e){const t=_g(e.snapshot),n=e.lastSuccess?_t(e.lastSuccess):"never";return d`
    <section class="grid grid-cols-2">
      ${Hl(e.context,"Workspace, identity, and model configuration.")}
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
        ${e.error?d`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:w}
        ${e.snapshot?w:d`
                <div class="callout info" style="margin-top: 12px">Load channels to see live status.</div>
              `}
        ${t.length===0?d`
                <div class="muted" style="margin-top: 16px">No channels found.</div>
              `:d`
                <div class="list" style="margin-top: 16px;">
                  ${t.map(i=>{const s=Rg(i.accounts),r=s.total?`${s.connected}/${s.total} connected`:"no accounts",o=s.configured?`${s.configured} configured`:"not configured",a=s.total?`${s.enabled} enabled`:"disabled",l=Eg(e.configForm,i.id);return d`
                      <div class="list-item">
                        <div class="list-main">
                          <div class="list-title">${i.label}</div>
                          <div class="list-sub mono">${i.id}</div>
                        </div>
                        <div class="list-meta">
                          <div>${r}</div>
                          <div>${o}</div>
                          <div>${a}</div>
                          ${l.length>0?l.map(c=>d`<div>${c.label}: ${c.value}</div>`):w}
                        </div>
                      </div>
                    `})}
                </div>
              `}
      </section>
    </section>
  `}function Ig(e){var n,i;const t=e.jobs.filter(s=>s.agentId===e.agentId);return d`
    <section class="grid grid-cols-2">
      ${Hl(e.context,"Workspace and scheduling targets.")}
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
            <div class="stat-value">${Ul(((i=e.status)==null?void 0:i.nextWakeAtMs)??null)}</div>
          </div>
        </div>
        ${e.error?d`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:w}
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
                        ${s.description?d`<div class="list-sub">${s.description}</div>`:w}
                        <div class="chip-row" style="margin-top: 6px;">
                          <span class="chip">${ug(s)}</span>
                          <span class="chip ${s.enabled?"chip-ok":"chip-warn"}">
                            ${s.enabled?"enabled":"disabled"}
                          </span>
                          <span class="chip">${s.sessionTarget}</span>
                        </div>
                      </div>
                      <div class="list-meta">
                        <div class="mono">${dg(s)}</div>
                        <div class="muted">${pg(s)}</div>
                      </div>
                    </div>
                  `)}
              </div>
            `}
    </section>
  `}function Pg(e){var l;const t=((l=e.agentFilesList)==null?void 0:l.agentId)===e.agentId?e.agentFilesList:null,n=(t==null?void 0:t.files)??[],i=e.agentFileActive??null,s=i?n.find(c=>c.name===i)??null:null,r=i?e.agentFileContents[i]??"":"",o=i?e.agentFileDrafts[i]??r:"",a=i?o!==r:!1;return d`
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
      ${t?d`<div class="muted mono" style="margin-top: 8px;">Workspace: ${t.workspace}</div>`:w}
      ${e.agentFilesError?d`<div class="callout danger" style="margin-top: 12px;">${e.agentFilesError}</div>`:w}
      ${t?d`
              <div class="agent-files-grid" style="margin-top: 16px;">
                <div class="agent-files-list">
                  ${n.length===0?d`
                          <div class="muted">No files found.</div>
                        `:n.map(c=>Dg(c,i,()=>e.onSelectFile(c.name)))}
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
                                `:w}
                          <label class="field" style="margin-top: 12px;">
                            <span>Content</span>
                            <textarea
                              .value=${o}
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
  `}function Dg(e,t,n){const i=e.missing?"Missing":`${mg(e.size)} · ${_t(e.updatedAtMs??null)}`;return d`
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
            `:w}
    </button>
  `}const On=[{id:"workspace",label:"Workspace Skills",sources:["openclaw-workspace"]},{id:"built-in",label:"Built-in Skills",sources:["openclaw-bundled"]},{id:"installed",label:"Installed Skills",sources:["openclaw-managed"]},{id:"extra",label:"Extra Skills",sources:["openclaw-extra"]}];function jl(e){var r;const t=new Map;for(const o of On)t.set(o.id,{id:o.id,label:o.label,skills:[]});const n=On.find(o=>o.id==="built-in"),i={id:"other",label:"Other Skills",skills:[]};for(const o of e){const a=o.bundled?n:On.find(l=>l.sources.includes(o.source));a?(r=t.get(a.id))==null||r.skills.push(o):i.skills.push(o)}const s=On.map(o=>t.get(o.id)).filter(o=>!!(o&&o.skills.length>0));return i.skills.length>0&&s.push(i),s}function Kl(e){return[...e.missing.bins.map(t=>`bin:${t}`),...e.missing.env.map(t=>`env:${t}`),...e.missing.config.map(t=>`config:${t}`),...e.missing.os.map(t=>`os:${t}`)]}function ql(e){const t=[];return e.disabled&&t.push("disabled"),e.blockedByAllowlist&&t.push("blocked by allowlist"),t}function Wl(e){const t=e.skill,n=!!e.showBundledBadge;return d`
    <div class="chip-row" style="margin-top: 6px;">
      <span class="chip">${t.source}</span>
      ${n?d`
              <span class="chip">bundled</span>
            `:w}
      <span class="chip ${t.eligible?"chip-ok":"chip-warn"}">
        ${t.eligible?"eligible":"blocked"}
      </span>
      ${t.disabled?d`
              <span class="chip chip-warn">disabled</span>
            `:w}
    </div>
  `}function Mg(e){var E;const t=$i(e.configForm,e.agentId),n=((E=t.entry)==null?void 0:E.tools)??{},i=t.globalTools??{},s=n.profile??i.profile??"full",r=n.profile?"agent override":i.profile?"global default":"default",o=Array.isArray(n.allow)&&n.allow.length>0,a=Array.isArray(i.allow)&&i.allow.length>0,l=!!e.configForm&&!e.configLoading&&!e.configSaving&&!o,c=o?[]:Array.isArray(n.alsoAllow)?n.alsoAllow:[],p=o?[]:Array.isArray(n.deny)?n.deny:[],u=o?{allow:n.allow??[],deny:n.deny??[]}:kg()??void 0,f=No.flatMap(M=>M.tools.map(N=>N.id)),b=M=>{const N=xg(M,u),I=zo(M,c),_=zo(M,p);return{allowed:(N||I)&&!_,baseAllowed:N,denied:_}},x=f.filter(M=>b(M).allowed).length,k=(M,N)=>{const I=new Set(c.map(C=>Je(C)).filter(C=>C.length>0)),_=new Set(p.map(C=>Je(C)).filter(C=>C.length>0)),h=b(M).baseAllowed,A=Je(M);N?(_.delete(A),h||I.add(A)):(I.delete(A),_.add(A)),e.onOverridesChange(e.agentId,[...I],[..._])},S=M=>{const N=new Set(c.map(_=>Je(_)).filter(_=>_.length>0)),I=new Set(p.map(_=>Je(_)).filter(_=>_.length>0));for(const _ of f){const h=b(_).baseAllowed,A=Je(_);M?(I.delete(A),h||N.add(A)):(N.delete(A),I.add(A))}e.onOverridesChange(e.agentId,[...N],[...I])};return d`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Tool Access</div>
          <div class="card-sub">
            Profile + per-tool overrides for this agent.
            <span class="mono">${x}/${f.length}</span> enabled.
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

      ${e.configForm?w:d`
              <div class="callout info" style="margin-top: 12px">
                Load the gateway config to adjust tool profiles.
              </div>
            `}
      ${o?d`
              <div class="callout info" style="margin-top: 12px">
                This agent is using an explicit allowlist in config. Tool overrides are managed in the Config tab.
              </div>
            `:w}
      ${a?d`
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
          <div>${r}</div>
        </div>
        ${e.configDirty?d`
                <div class="agent-kv">
                  <div class="label">Status</div>
                  <div class="mono">unsaved</div>
                </div>
              `:w}
      </div>

      <div class="agent-tools-presets" style="margin-top: 16px;">
        <div class="label">Quick Presets</div>
        <div class="agent-tools-buttons">
          ${hg.map(M=>d`
              <button
                class="btn btn--sm ${s===M.id?"active":""}"
                ?disabled=${!l}
                @click=${()=>e.onProfileChange(e.agentId,M.id,!0)}
              >
                ${M.label}
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
        ${No.map(M=>d`
              <div class="agent-tools-section">
                <div class="agent-tools-header">${M.label}</div>
                <div class="agent-tools-list">
                  ${M.tools.map(N=>{const{allowed:I}=b(N.id);return d`
                      <div class="agent-tool-row">
                        <div>
                          <div class="agent-tool-title mono">${N.label}</div>
                          <div class="agent-tool-sub">${N.description}</div>
                        </div>
                        <label class="cfg-toggle">
                          <input
                            type="checkbox"
                            .checked=${I}
                            ?disabled=${!l}
                            @change=${_=>k(N.id,_.target.checked)}
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
  `}function Fg(e){var b,x,k;const t=!!e.configForm&&!e.configLoading&&!e.configSaving,n=$i(e.configForm,e.agentId),i=Array.isArray((b=n.entry)==null?void 0:b.skills)?(x=n.entry)==null?void 0:x.skills:void 0,s=new Set((i??[]).map(S=>S.trim()).filter(Boolean)),r=i!==void 0,o=!!(e.report&&e.activeAgentId===e.agentId),a=o?((k=e.report)==null?void 0:k.skills)??[]:[],l=e.filter.trim().toLowerCase(),c=l?a.filter(S=>[S.name,S.description,S.source].join(" ").toLowerCase().includes(l)):a,p=jl(c),u=r?a.filter(S=>s.has(S.name)).length:a.length,f=a.length;return d`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Skills</div>
          <div class="card-sub">
            Per-agent skill allowlist and workspace skills.
            ${f>0?d`<span class="mono">${u}/${f}</span>`:w}
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

      ${e.configForm?w:d`
              <div class="callout info" style="margin-top: 12px">
                Load the gateway config to set per-agent skills.
              </div>
            `}
      ${r?d`
              <div class="callout info" style="margin-top: 12px">This agent uses a custom skill allowlist.</div>
            `:d`
              <div class="callout info" style="margin-top: 12px">
                All skills are enabled. Disabling any skill will create a per-agent allowlist.
              </div>
            `}
      ${!o&&!e.loading?d`
              <div class="callout info" style="margin-top: 12px">
                Load skills for this agent to view workspace-specific entries.
              </div>
            `:w}
      ${e.error?d`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:w}

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
                ${p.map(S=>Ng(S,{agentId:e.agentId,allowSet:s,usingAllowlist:r,editable:t,onToggle:e.onToggle}))}
              </div>
            `}
    </section>
  `}function Ng(e,t){const n=e.id==="workspace"||e.id==="built-in";return d`
    <details class="agent-skills-group" ?open=${!n}>
      <summary class="agent-skills-header">
        <span>${e.label}</span>
        <span class="muted">${e.skills.length}</span>
      </summary>
      <div class="list skills-grid">
        ${e.skills.map(i=>Og(i,{agentId:t.agentId,allowSet:t.allowSet,usingAllowlist:t.usingAllowlist,editable:t.editable,onToggle:t.onToggle}))}
      </div>
    </details>
  `}function Og(e,t){const n=t.usingAllowlist?t.allowSet.has(e.name):!0,i=Kl(e),s=ql(e);return d`
    <div class="list-item agent-skill-row">
      <div class="list-main">
        <div class="list-title">${e.emoji?`${e.emoji} `:""}${e.name}</div>
        <div class="list-sub">${e.description}</div>
        ${Wl({skill:e})}
        ${i.length>0?d`<div class="muted" style="margin-top: 6px;">Missing: ${i.join(", ")}</div>`:w}
        ${s.length>0?d`<div class="muted" style="margin-top: 6px;">Reason: ${s.join(", ")}</div>`:w}
      </div>
      <div class="list-meta">
        <label class="cfg-toggle">
          <input
            type="checkbox"
            .checked=${n}
            ?disabled=${!t.editable}
            @change=${r=>t.onToggle(t.agentId,e.name,r.target.checked)}
          />
          <span class="cfg-toggle__track"></span>
        </label>
      </div>
    </div>
  `}function Bg(e){var r,o,a;const t=((r=e.agentsList)==null?void 0:r.agents)??[],n=((o=e.agentsList)==null?void 0:o.defaultId)??null,i=e.selectedAgentId??n??((a=t[0])==null?void 0:a.id)??null,s=i?t.find(l=>l.id===i)??null:null;return d`
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
        ${e.error?d`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:w}
        <div class="agent-list" style="margin-top: 12px;">
          ${t.length===0?d`
                  <div class="muted">No agents found.</div>
                `:t.map(l=>{const c=zl(l.id,n),p=wi(l,e.agentIdentityById[l.id]??null);return d`
                    <button
                      type="button"
                      class="agent-row ${i===l.id?"active":""}"
                      @click=${()=>e.onSelectAgent(l.id)}
                    >
                      <div class="agent-avatar">${p||xs(l).slice(0,1)}</div>
                      <div class="agent-info">
                        <div class="agent-title">${xs(l)}</div>
                        <div class="agent-sub mono">${l.id}</div>
                      </div>
                      ${c?d`<span class="agent-pill">${c}</span>`:w}
                    </button>
                  `})}
        </div>
      </section>
      <section class="agents-main">
        ${s?d`
                ${Ug(s,n,e.agentIdentityById[s.id]??null)}
                ${zg(e.activePanel,l=>e.onSelectPanel(l))}
                ${e.activePanel==="overview"?Hg({agent:s,defaultId:n,configForm:e.configForm,agentFilesList:e.agentFilesList,agentIdentity:e.agentIdentityById[s.id]??null,agentIdentityError:e.agentIdentityError,agentIdentityLoading:e.agentIdentityLoading,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave,onModelChange:e.onModelChange,onModelFallbacksChange:e.onModelFallbacksChange}):w}
                ${e.activePanel==="files"?Pg({agentId:s.id,agentFilesList:e.agentFilesList,agentFilesLoading:e.agentFilesLoading,agentFilesError:e.agentFilesError,agentFileActive:e.agentFileActive,agentFileContents:e.agentFileContents,agentFileDrafts:e.agentFileDrafts,agentFileSaving:e.agentFileSaving,onLoadFiles:e.onLoadFiles,onSelectFile:e.onSelectFile,onFileDraftChange:e.onFileDraftChange,onFileReset:e.onFileReset,onFileSave:e.onFileSave}):w}
                ${e.activePanel==="tools"?Mg({agentId:s.id,configForm:e.configForm,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,onProfileChange:e.onToolsProfileChange,onOverridesChange:e.onToolsOverridesChange,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):w}
                ${e.activePanel==="skills"?Fg({agentId:s.id,report:e.agentSkillsReport,loading:e.agentSkillsLoading,error:e.agentSkillsError,activeAgentId:e.agentSkillsAgentId,configForm:e.configForm,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,filter:e.skillsFilter,onFilterChange:e.onSkillsFilterChange,onRefresh:e.onSkillsRefresh,onToggle:e.onAgentSkillToggle,onClear:e.onAgentSkillsClear,onDisableAll:e.onAgentSkillsDisableAll,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):w}
                ${e.activePanel==="channels"?Lg({context:Oo(s,e.configForm,e.agentFilesList,n,e.agentIdentityById[s.id]??null),configForm:e.configForm,snapshot:e.channelsSnapshot,loading:e.channelsLoading,error:e.channelsError,lastSuccess:e.channelsLastSuccess,onRefresh:e.onChannelsRefresh}):w}
                ${e.activePanel==="cron"?Ig({context:Oo(s,e.configForm,e.agentFilesList,n,e.agentIdentityById[s.id]??null),agentId:s.id,jobs:e.cronJobs,status:e.cronStatus,loading:e.cronLoading,error:e.cronError,onRefresh:e.onCronRefresh}):w}
              `:d`
                <div class="card">
                  <div class="card-title">Select an agent</div>
                  <div class="card-sub">Pick an agent to inspect its workspace and tools.</div>
                </div>
              `}
      </section>
    </div>
  `}function Ug(e,t,n){var a,l;const i=zl(e.id,t),s=xs(e),r=((l=(a=e.identity)==null?void 0:a.theme)==null?void 0:l.trim())||"Agent workspace and routing.",o=wi(e,n);return d`
    <section class="card agent-header">
      <div class="agent-header-main">
        <div class="agent-avatar agent-avatar--lg">${o||s.slice(0,1)}</div>
        <div>
          <div class="card-title">${s}</div>
          <div class="card-sub">${r}</div>
        </div>
      </div>
      <div class="agent-header-meta">
        <div class="mono">${e.id}</div>
        ${i?d`<span class="agent-pill">${i}</span>`:w}
      </div>
    </section>
  `}function zg(e,t){return d`
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
  `}function Hg(e){var B,ie,ve,L,se,re,X,Ee,P,Q,q,oe,je,Ke,Kt,Ct;const{agent:t,configForm:n,agentFilesList:i,agentIdentity:s,agentIdentityLoading:r,agentIdentityError:o,configLoading:a,configSaving:l,configDirty:c,onConfigReload:p,onConfigSave:u,onModelChange:f,onModelFallbacksChange:b}=e,x=$i(n,t.id),S=(i&&i.agentId===t.id?i.workspace:null)||((B=x.entry)==null?void 0:B.workspace)||((ie=x.defaults)==null?void 0:ie.workspace)||"default",E=(ve=x.entry)!=null&&ve.model?ln((L=x.entry)==null?void 0:L.model):ln((se=x.defaults)==null?void 0:se.model),M=ln((re=x.defaults)==null?void 0:re.model),N=Uo((X=x.entry)==null?void 0:X.model)||(E!=="-"?Bo(E):null),I=Uo((Ee=x.defaults)==null?void 0:Ee.model)||(M!=="-"?Bo(M):null),_=N??I??null,h=vg((P=x.entry)==null?void 0:P.model),A=h?h.join(", "):"",C=((Q=s==null?void 0:s.name)==null?void 0:Q.trim())||((oe=(q=t.identity)==null?void 0:q.name)==null?void 0:oe.trim())||((je=t.name)==null?void 0:je.trim())||((Ke=x.entry)==null?void 0:Ke.name)||"-",H=wi(t,s)||"-",U=Array.isArray((Kt=x.entry)==null?void 0:Kt.skills)?(Ct=x.entry)==null?void 0:Ct.skills:null,j=(U==null?void 0:U.length)??null,K=r?"Loading…":o?"Unavailable":"",Z=!!(e.defaultId&&t.id===e.defaultId);return d`
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
          ${K?d`<div class="agent-kv-sub muted">${K}</div>`:w}
        </div>
        <div class="agent-kv">
          <div class="label">Default</div>
          <div>${Z?"yes":"no"}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Identity Emoji</div>
          <div>${H}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Skills Filter</div>
          <div>${U?`${j} selected`:"all skills"}</div>
        </div>
      </div>

      <div class="agent-model-select" style="margin-top: 20px;">
        <div class="label">Model Selection</div>
        <div class="row" style="gap: 12px; flex-wrap: wrap;">
          <label class="field" style="min-width: 260px; flex: 1;">
            <span>Primary model${Z?" (default)":""}</span>
            <select
              .value=${_??""}
              ?disabled=${!n||a||l}
              @change=${Tt=>f(t.id,Tt.target.value||null)}
            >
              ${Z?w:d`
                      <option value="">
                        ${I?`Inherit default (${I})`:"Inherit default"}
                      </option>
                    `}
              ${wg(n,_??void 0)}
            </select>
          </label>
          <label class="field" style="min-width: 260px; flex: 1;">
            <span>Fallbacks (comma-separated)</span>
            <input
              .value=${A}
              ?disabled=${!n||a||l}
              placeholder="provider/model, provider/model"
              @input=${Tt=>b(t.id,yg(Tt.target.value))}
            />
          </label>
        </div>
        <div class="row" style="justify-content: flex-end; gap: 8px;">
          <button class="btn btn--sm" ?disabled=${a} @click=${p}>
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
  `}function Ho(e){var t;e&&((t=navigator.clipboard)==null||t.writeText(e).catch(()=>{}))}function jg(e){const{loading:t,saving:n,error:i,content:s,lastSuccessAt:r,dependentFiles:o,onReload:a,onSave:l,onContentChange:c}=e,p=r!=null?new Date(r).toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"";return d`
    <section class="card">
      <div class="row" style="justify-content: space-between; align-items: flex-start;">
        <div>
          <div class="card-title">业务知识</div>
          <div class="card-sub">
            编辑万鼎业务知识（wanding_business_knowledge.md），供选型与匹配使用。保存后 LLM 将使用最新内容。
          </div>
        </div>
        <div class="row" style="gap: 8px; align-items: center;">
          ${p?d`<span class="muted">已保存 ${p}</span>`:w}
          <button class="btn" ?disabled=${t} @click=${a}>
            ${t?"加载中…":"重新加载"}
          </button>
          <button class="btn btn--primary" ?disabled=${t||n} @click=${()=>l(s)}>
            ${n?"保存中…":"保存"}
          </button>
        </div>
      </div>
      ${i?d`<div class="callout danger" style="margin-top: 12px;">${i}</div>`:w}
      ${o&&(o.mapping_table||o.price_library)?d`
            <div class="callout" style="margin-top: 12px; padding: 12px;">
              <div style="font-weight: 600; margin-bottom: 8px;">相关数据文件</div>
              <p class="muted" style="margin: 0 0 10px 0; font-size: 0.9rem;">
                选型与历史报价依赖以下 Excel，有更新时可复制路径后在资源管理器中打开或用 Excel 编辑。
              </p>
              ${o.mapping_table?d`
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; flex-wrap: wrap;">
                      <span style="min-width: 100px;">询价映射表（历史报价）：</span>
                      <code style="flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; font-size: 0.85rem;">${o.mapping_table}</code>
                      <button
                        class="btn"
                        style="flex-shrink: 0;"
                        @click=${()=>Ho(o.mapping_table)}
                        title="复制路径"
                      >
                        复制路径
                      </button>
                    </div>
                  `:w}
              ${o.price_library?d`
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                      <span style="min-width: 100px;">万鼎价格库：</span>
                      <code style="flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; font-size: 0.85rem;">${o.price_library}</code>
                      <button
                        class="btn"
                        style="flex-shrink: 0;"
                        @click=${()=>Ho(o.price_library)}
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
          @input=${u=>{const f=u.target;c((f==null?void 0:f.value)??"")}}
          placeholder="【业务知识】&#10;1. …"
        ></textarea>
      </div>
    </section>
  `}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const dn=(e,t)=>{var i;const n=e._$AN;if(n===void 0)return!1;for(const s of n)(i=s._$AO)==null||i.call(s,t,!1),dn(s,t);return!0},ii=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while((n==null?void 0:n.size)===0)},Gl=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),Wg(t)}};function Kg(e){this._$AN!==void 0?(ii(this),this._$AM=e,Gl(this)):this._$AM=e}function qg(e,t=!1,n=0){const i=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(t)if(Array.isArray(i))for(let r=n;r<i.length;r++)dn(i[r],!1),ii(i[r]);else i!=null&&(dn(i,!1),ii(i));else dn(this,e)}const Wg=e=>{e.type==fr.CHILD&&(e._$AP??(e._$AP=qg),e._$AQ??(e._$AQ=Kg))};class Gg extends hr{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,n,i){super._$AT(t,n,i),Gl(this),this.isConnected=t._$AU}_$AO(t,n=!0){var i,s;t!==this.isConnected&&(this.isConnected=t,t?(i=this.reconnected)==null||i.call(this):(s=this.disconnected)==null||s.call(this)),n&&(dn(this,t),ii(this))}setValue(t){if(Kf(this._$Ct))this._$Ct._$AI(t,this);else{const n=[...this._$Ct._$AH];n[this._$Ci]=t,this._$Ct._$AI(n,this,0)}}disconnected(){}reconnected(){}}const Xi=new WeakMap,Vg=gr(class extends Gg{render(e){return w}update(e,[t]){var i;const n=t!==this.G;return n&&this.G!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=(i=e.options)==null?void 0:i.host,this.rt(this.ct=e.element)),w}rt(e){if(this.isConnected||(e=void 0),typeof this.G=="function"){const t=this.ht??globalThis;let n=Xi.get(t);n===void 0&&(n=new WeakMap,Xi.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){var e,t;return typeof this.G=="function"?(e=Xi.get(this.ht??globalThis))==null?void 0:e.get(this.G):(t=this.G)==null?void 0:t.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Ss extends hr{constructor(t){if(super(t),this.it=w,t.type!==fr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===w||t==null)return this._t=void 0,this.it=t;if(t===it)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}Ss.directiveName="unsafeHTML",Ss.resultType=1;const _s=gr(Ss);/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:Vl,setPrototypeOf:jo,isFrozen:Qg,getPrototypeOf:Jg,getOwnPropertyDescriptor:Yg}=Object;let{freeze:we,seal:Te,create:As}=Object,{apply:Cs,construct:Ts}=typeof Reflect<"u"&&Reflect;we||(we=function(t){return t});Te||(Te=function(t){return t});Cs||(Cs=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),r=2;r<i;r++)s[r-2]=arguments[r];return t.apply(n,s)});Ts||(Ts=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const Bn=$e(Array.prototype.forEach),Xg=$e(Array.prototype.lastIndexOf),Ko=$e(Array.prototype.pop),Qt=$e(Array.prototype.push),Zg=$e(Array.prototype.splice),Qn=$e(String.prototype.toLowerCase),Zi=$e(String.prototype.toString),es=$e(String.prototype.match),Jt=$e(String.prototype.replace),eh=$e(String.prototype.indexOf),th=$e(String.prototype.trim),Re=$e(Object.prototype.hasOwnProperty),ye=$e(RegExp.prototype.test),Yt=nh(TypeError);function $e(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return Cs(e,t,i)}}function nh(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return Ts(e,n)}}function W(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Qn;jo&&jo(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const r=n(s);r!==s&&(Qg(t)||(t[i]=r),s=r)}e[s]=!0}return e}function ih(e){for(let t=0;t<e.length;t++)Re(e,t)||(e[t]=null);return e}function Ne(e){const t=As(null);for(const[n,i]of Vl(e))Re(e,n)&&(Array.isArray(i)?t[n]=ih(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=Ne(i):t[n]=i);return t}function Xt(e,t){for(;e!==null;){const i=Yg(e,t);if(i){if(i.get)return $e(i.get);if(typeof i.value=="function")return $e(i.value)}e=Jg(e)}function n(){return null}return n}const qo=we(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ts=we(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ns=we(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),sh=we(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),is=we(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),rh=we(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Wo=we(["#text"]),Go=we(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ss=we(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Vo=we(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Un=we(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),oh=Te(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ah=Te(/<%[\w\W]*|[\w\W]*%>/gm),lh=Te(/\$\{[\w\W]*/gm),ch=Te(/^data-[\-\w.\u00B7-\uFFFF]+$/),dh=Te(/^aria-[\-\w]+$/),Ql=Te(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),uh=Te(/^(?:\w+script|data):/i),ph=Te(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Jl=Te(/^html$/i),fh=Te(/^[a-z][.\w]*(-[.\w]+)+$/i);var Qo=Object.freeze({__proto__:null,ARIA_ATTR:dh,ATTR_WHITESPACE:ph,CUSTOM_ELEMENT:fh,DATA_ATTR:ch,DOCTYPE_NAME:Jl,ERB_EXPR:ah,IS_ALLOWED_URI:Ql,IS_SCRIPT_OR_DATA:uh,MUSTACHE_EXPR:oh,TMPLIT_EXPR:lh});const Zt={element:1,text:3,progressingInstruction:7,comment:8,document:9},gh=function(){return typeof window>"u"?null:window},hh=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const r="dompurify"+(i?"#"+i:"");try{return t.createPolicy(r,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+r+" could not be created."),null}},Jo=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Yl(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:gh();const t=O=>Yl(O);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==Zt.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:r,HTMLTemplateElement:o,Node:a,Element:l,NodeFilter:c,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:u,DOMParser:f,trustedTypes:b}=e,x=l.prototype,k=Xt(x,"cloneNode"),S=Xt(x,"remove"),E=Xt(x,"nextSibling"),M=Xt(x,"childNodes"),N=Xt(x,"parentNode");if(typeof o=="function"){const O=n.createElement("template");O.content&&O.content.ownerDocument&&(n=O.content.ownerDocument)}let I,_="";const{implementation:h,createNodeIterator:A,createDocumentFragment:C,getElementsByTagName:R}=n,{importNode:H}=i;let U=Jo();t.isSupported=typeof Vl=="function"&&typeof N=="function"&&h&&h.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:j,ERB_EXPR:K,TMPLIT_EXPR:Z,DATA_ATTR:B,ARIA_ATTR:ie,IS_SCRIPT_OR_DATA:ve,ATTR_WHITESPACE:L,CUSTOM_ELEMENT:se}=Qo;let{IS_ALLOWED_URI:re}=Qo,X=null;const Ee=W({},[...qo,...ts,...ns,...is,...Wo]);let P=null;const Q=W({},[...Go,...ss,...Vo,...Un]);let q=Object.seal(As(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),oe=null,je=null;const Ke=Object.seal(As(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Kt=!0,Ct=!0,Tt=!1,Tr=!0,Et=!1,An=!0,lt=!1,_i=!1,Ai=!1,Rt=!1,Cn=!1,Tn=!1,Er=!0,Rr=!1;const bc="user-content-";let Ci=!0,qt=!1,Lt={},De=null;const Ti=W({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Lr=null;const Ir=W({},["audio","video","img","source","image","track"]);let Ei=null;const Pr=W({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),En="http://www.w3.org/1998/Math/MathML",Rn="http://www.w3.org/2000/svg",qe="http://www.w3.org/1999/xhtml";let It=qe,Ri=!1,Li=null;const wc=W({},[En,Rn,qe],Zi);let Ln=W({},["mi","mo","mn","ms","mtext"]),In=W({},["annotation-xml"]);const $c=W({},["title","style","font","a","script"]);let Wt=null;const xc=["application/xhtml+xml","text/html"],kc="text/html";let ce=null,Pt=null;const Sc=n.createElement("form"),Dr=function($){return $ instanceof RegExp||$ instanceof Function},Ii=function(){let $=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Pt&&Pt===$)){if((!$||typeof $!="object")&&($={}),$=Ne($),Wt=xc.indexOf($.PARSER_MEDIA_TYPE)===-1?kc:$.PARSER_MEDIA_TYPE,ce=Wt==="application/xhtml+xml"?Zi:Qn,X=Re($,"ALLOWED_TAGS")?W({},$.ALLOWED_TAGS,ce):Ee,P=Re($,"ALLOWED_ATTR")?W({},$.ALLOWED_ATTR,ce):Q,Li=Re($,"ALLOWED_NAMESPACES")?W({},$.ALLOWED_NAMESPACES,Zi):wc,Ei=Re($,"ADD_URI_SAFE_ATTR")?W(Ne(Pr),$.ADD_URI_SAFE_ATTR,ce):Pr,Lr=Re($,"ADD_DATA_URI_TAGS")?W(Ne(Ir),$.ADD_DATA_URI_TAGS,ce):Ir,De=Re($,"FORBID_CONTENTS")?W({},$.FORBID_CONTENTS,ce):Ti,oe=Re($,"FORBID_TAGS")?W({},$.FORBID_TAGS,ce):Ne({}),je=Re($,"FORBID_ATTR")?W({},$.FORBID_ATTR,ce):Ne({}),Lt=Re($,"USE_PROFILES")?$.USE_PROFILES:!1,Kt=$.ALLOW_ARIA_ATTR!==!1,Ct=$.ALLOW_DATA_ATTR!==!1,Tt=$.ALLOW_UNKNOWN_PROTOCOLS||!1,Tr=$.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Et=$.SAFE_FOR_TEMPLATES||!1,An=$.SAFE_FOR_XML!==!1,lt=$.WHOLE_DOCUMENT||!1,Rt=$.RETURN_DOM||!1,Cn=$.RETURN_DOM_FRAGMENT||!1,Tn=$.RETURN_TRUSTED_TYPE||!1,Ai=$.FORCE_BODY||!1,Er=$.SANITIZE_DOM!==!1,Rr=$.SANITIZE_NAMED_PROPS||!1,Ci=$.KEEP_CONTENT!==!1,qt=$.IN_PLACE||!1,re=$.ALLOWED_URI_REGEXP||Ql,It=$.NAMESPACE||qe,Ln=$.MATHML_TEXT_INTEGRATION_POINTS||Ln,In=$.HTML_INTEGRATION_POINTS||In,q=$.CUSTOM_ELEMENT_HANDLING||{},$.CUSTOM_ELEMENT_HANDLING&&Dr($.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(q.tagNameCheck=$.CUSTOM_ELEMENT_HANDLING.tagNameCheck),$.CUSTOM_ELEMENT_HANDLING&&Dr($.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(q.attributeNameCheck=$.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),$.CUSTOM_ELEMENT_HANDLING&&typeof $.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(q.allowCustomizedBuiltInElements=$.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Et&&(Ct=!1),Cn&&(Rt=!0),Lt&&(X=W({},Wo),P=[],Lt.html===!0&&(W(X,qo),W(P,Go)),Lt.svg===!0&&(W(X,ts),W(P,ss),W(P,Un)),Lt.svgFilters===!0&&(W(X,ns),W(P,ss),W(P,Un)),Lt.mathMl===!0&&(W(X,is),W(P,Vo),W(P,Un))),$.ADD_TAGS&&(typeof $.ADD_TAGS=="function"?Ke.tagCheck=$.ADD_TAGS:(X===Ee&&(X=Ne(X)),W(X,$.ADD_TAGS,ce))),$.ADD_ATTR&&(typeof $.ADD_ATTR=="function"?Ke.attributeCheck=$.ADD_ATTR:(P===Q&&(P=Ne(P)),W(P,$.ADD_ATTR,ce))),$.ADD_URI_SAFE_ATTR&&W(Ei,$.ADD_URI_SAFE_ATTR,ce),$.FORBID_CONTENTS&&(De===Ti&&(De=Ne(De)),W(De,$.FORBID_CONTENTS,ce)),$.ADD_FORBID_CONTENTS&&(De===Ti&&(De=Ne(De)),W(De,$.ADD_FORBID_CONTENTS,ce)),Ci&&(X["#text"]=!0),lt&&W(X,["html","head","body"]),X.table&&(W(X,["tbody"]),delete oe.tbody),$.TRUSTED_TYPES_POLICY){if(typeof $.TRUSTED_TYPES_POLICY.createHTML!="function")throw Yt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof $.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Yt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');I=$.TRUSTED_TYPES_POLICY,_=I.createHTML("")}else I===void 0&&(I=hh(b,s)),I!==null&&typeof _=="string"&&(_=I.createHTML(""));we&&we($),Pt=$}},Mr=W({},[...ts,...ns,...sh]),Fr=W({},[...is,...rh]),_c=function($){let T=N($);(!T||!T.tagName)&&(T={namespaceURI:It,tagName:"template"});const F=Qn($.tagName),te=Qn(T.tagName);return Li[$.namespaceURI]?$.namespaceURI===Rn?T.namespaceURI===qe?F==="svg":T.namespaceURI===En?F==="svg"&&(te==="annotation-xml"||Ln[te]):!!Mr[F]:$.namespaceURI===En?T.namespaceURI===qe?F==="math":T.namespaceURI===Rn?F==="math"&&In[te]:!!Fr[F]:$.namespaceURI===qe?T.namespaceURI===Rn&&!In[te]||T.namespaceURI===En&&!Ln[te]?!1:!Fr[F]&&($c[F]||!Mr[F]):!!(Wt==="application/xhtml+xml"&&Li[$.namespaceURI]):!1},Me=function($){Qt(t.removed,{element:$});try{N($).removeChild($)}catch{S($)}},ct=function($,T){try{Qt(t.removed,{attribute:T.getAttributeNode($),from:T})}catch{Qt(t.removed,{attribute:null,from:T})}if(T.removeAttribute($),$==="is")if(Rt||Cn)try{Me(T)}catch{}else try{T.setAttribute($,"")}catch{}},Nr=function($){let T=null,F=null;if(Ai)$="<remove></remove>"+$;else{const ae=es($,/^[\r\n\t ]+/);F=ae&&ae[0]}Wt==="application/xhtml+xml"&&It===qe&&($='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+$+"</body></html>");const te=I?I.createHTML($):$;if(It===qe)try{T=new f().parseFromString(te,Wt)}catch{}if(!T||!T.documentElement){T=h.createDocument(It,"template",null);try{T.documentElement.innerHTML=Ri?_:te}catch{}}const fe=T.body||T.documentElement;return $&&F&&fe.insertBefore(n.createTextNode(F),fe.childNodes[0]||null),It===qe?R.call(T,lt?"html":"body")[0]:lt?T.documentElement:fe},Or=function($){return A.call($.ownerDocument||$,$,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Pi=function($){return $ instanceof u&&(typeof $.nodeName!="string"||typeof $.textContent!="string"||typeof $.removeChild!="function"||!($.attributes instanceof p)||typeof $.removeAttribute!="function"||typeof $.setAttribute!="function"||typeof $.namespaceURI!="string"||typeof $.insertBefore!="function"||typeof $.hasChildNodes!="function")},Br=function($){return typeof a=="function"&&$ instanceof a};function We(O,$,T){Bn(O,F=>{F.call(t,$,T,Pt)})}const Ur=function($){let T=null;if(We(U.beforeSanitizeElements,$,null),Pi($))return Me($),!0;const F=ce($.nodeName);if(We(U.uponSanitizeElement,$,{tagName:F,allowedTags:X}),An&&$.hasChildNodes()&&!Br($.firstElementChild)&&ye(/<[/\w!]/g,$.innerHTML)&&ye(/<[/\w!]/g,$.textContent)||$.nodeType===Zt.progressingInstruction||An&&$.nodeType===Zt.comment&&ye(/<[/\w]/g,$.data))return Me($),!0;if(!(Ke.tagCheck instanceof Function&&Ke.tagCheck(F))&&(!X[F]||oe[F])){if(!oe[F]&&Hr(F)&&(q.tagNameCheck instanceof RegExp&&ye(q.tagNameCheck,F)||q.tagNameCheck instanceof Function&&q.tagNameCheck(F)))return!1;if(Ci&&!De[F]){const te=N($)||$.parentNode,fe=M($)||$.childNodes;if(fe&&te){const ae=fe.length;for(let xe=ae-1;xe>=0;--xe){const Ge=k(fe[xe],!0);Ge.__removalCount=($.__removalCount||0)+1,te.insertBefore(Ge,E($))}}}return Me($),!0}return $ instanceof l&&!_c($)||(F==="noscript"||F==="noembed"||F==="noframes")&&ye(/<\/no(script|embed|frames)/i,$.innerHTML)?(Me($),!0):(Et&&$.nodeType===Zt.text&&(T=$.textContent,Bn([j,K,Z],te=>{T=Jt(T,te," ")}),$.textContent!==T&&(Qt(t.removed,{element:$.cloneNode()}),$.textContent=T)),We(U.afterSanitizeElements,$,null),!1)},zr=function($,T,F){if(Er&&(T==="id"||T==="name")&&(F in n||F in Sc))return!1;if(!(Ct&&!je[T]&&ye(B,T))){if(!(Kt&&ye(ie,T))){if(!(Ke.attributeCheck instanceof Function&&Ke.attributeCheck(T,$))){if(!P[T]||je[T]){if(!(Hr($)&&(q.tagNameCheck instanceof RegExp&&ye(q.tagNameCheck,$)||q.tagNameCheck instanceof Function&&q.tagNameCheck($))&&(q.attributeNameCheck instanceof RegExp&&ye(q.attributeNameCheck,T)||q.attributeNameCheck instanceof Function&&q.attributeNameCheck(T,$))||T==="is"&&q.allowCustomizedBuiltInElements&&(q.tagNameCheck instanceof RegExp&&ye(q.tagNameCheck,F)||q.tagNameCheck instanceof Function&&q.tagNameCheck(F))))return!1}else if(!Ei[T]){if(!ye(re,Jt(F,L,""))){if(!((T==="src"||T==="xlink:href"||T==="href")&&$!=="script"&&eh(F,"data:")===0&&Lr[$])){if(!(Tt&&!ye(ve,Jt(F,L,"")))){if(F)return!1}}}}}}}return!0},Hr=function($){return $!=="annotation-xml"&&es($,se)},jr=function($){We(U.beforeSanitizeAttributes,$,null);const{attributes:T}=$;if(!T||Pi($))return;const F={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:P,forceKeepAttr:void 0};let te=T.length;for(;te--;){const fe=T[te],{name:ae,namespaceURI:xe,value:Ge}=fe,Dt=ce(ae),Di=Ge;let pe=ae==="value"?Di:th(Di);if(F.attrName=Dt,F.attrValue=pe,F.keepAttr=!0,F.forceKeepAttr=void 0,We(U.uponSanitizeAttribute,$,F),pe=F.attrValue,Rr&&(Dt==="id"||Dt==="name")&&(ct(ae,$),pe=bc+pe),An&&ye(/((--!?|])>)|<\/(style|title|textarea)/i,pe)){ct(ae,$);continue}if(Dt==="attributename"&&es(pe,"href")){ct(ae,$);continue}if(F.forceKeepAttr)continue;if(!F.keepAttr){ct(ae,$);continue}if(!Tr&&ye(/\/>/i,pe)){ct(ae,$);continue}Et&&Bn([j,K,Z],qr=>{pe=Jt(pe,qr," ")});const Kr=ce($.nodeName);if(!zr(Kr,Dt,pe)){ct(ae,$);continue}if(I&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!xe)switch(b.getAttributeType(Kr,Dt)){case"TrustedHTML":{pe=I.createHTML(pe);break}case"TrustedScriptURL":{pe=I.createScriptURL(pe);break}}if(pe!==Di)try{xe?$.setAttributeNS(xe,ae,pe):$.setAttribute(ae,pe),Pi($)?Me($):Ko(t.removed)}catch{ct(ae,$)}}We(U.afterSanitizeAttributes,$,null)},Ac=function O($){let T=null;const F=Or($);for(We(U.beforeSanitizeShadowDOM,$,null);T=F.nextNode();)We(U.uponSanitizeShadowNode,T,null),Ur(T),jr(T),T.content instanceof r&&O(T.content);We(U.afterSanitizeShadowDOM,$,null)};return t.sanitize=function(O){let $=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},T=null,F=null,te=null,fe=null;if(Ri=!O,Ri&&(O="<!-->"),typeof O!="string"&&!Br(O))if(typeof O.toString=="function"){if(O=O.toString(),typeof O!="string")throw Yt("dirty is not a string, aborting")}else throw Yt("toString is not a function");if(!t.isSupported)return O;if(_i||Ii($),t.removed=[],typeof O=="string"&&(qt=!1),qt){if(O.nodeName){const Ge=ce(O.nodeName);if(!X[Ge]||oe[Ge])throw Yt("root node is forbidden and cannot be sanitized in-place")}}else if(O instanceof a)T=Nr("<!---->"),F=T.ownerDocument.importNode(O,!0),F.nodeType===Zt.element&&F.nodeName==="BODY"||F.nodeName==="HTML"?T=F:T.appendChild(F);else{if(!Rt&&!Et&&!lt&&O.indexOf("<")===-1)return I&&Tn?I.createHTML(O):O;if(T=Nr(O),!T)return Rt?null:Tn?_:""}T&&Ai&&Me(T.firstChild);const ae=Or(qt?O:T);for(;te=ae.nextNode();)Ur(te),jr(te),te.content instanceof r&&Ac(te.content);if(qt)return O;if(Rt){if(Cn)for(fe=C.call(T.ownerDocument);T.firstChild;)fe.appendChild(T.firstChild);else fe=T;return(P.shadowroot||P.shadowrootmode)&&(fe=H.call(i,fe,!0)),fe}let xe=lt?T.outerHTML:T.innerHTML;return lt&&X["!doctype"]&&T.ownerDocument&&T.ownerDocument.doctype&&T.ownerDocument.doctype.name&&ye(Jl,T.ownerDocument.doctype.name)&&(xe="<!DOCTYPE "+T.ownerDocument.doctype.name+`>
`+xe),Et&&Bn([j,K,Z],Ge=>{xe=Jt(xe,Ge," ")}),I&&Tn?I.createHTML(xe):xe},t.setConfig=function(){let O=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ii(O),_i=!0},t.clearConfig=function(){Pt=null,_i=!1},t.isValidAttribute=function(O,$,T){Pt||Ii({});const F=ce(O),te=ce($);return zr(F,te,T)},t.addHook=function(O,$){typeof $=="function"&&Qt(U[O],$)},t.removeHook=function(O,$){if($!==void 0){const T=Xg(U[O],$);return T===-1?void 0:Zg(U[O],T,1)[0]}return Ko(U[O])},t.removeHooks=function(O){U[O]=[]},t.removeAllHooks=function(){U=Jo()},t}var Es=Yl();function mr(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var At=mr();function Xl(e){At=e}var gt={exec:()=>null};function V(e,t=""){let n=typeof e=="string"?e:e.source,i={replace:(s,r)=>{let o=typeof r=="string"?r:r.source;return o=o.replace(be.caret,"$1"),n=n.replace(s,o),i},getRegex:()=>new RegExp(n,t)};return i}var mh=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),be={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}>`)},vh=/^(?:[ \t]*(?:\n|$))+/,yh=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,bh=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,_n=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,wh=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,vr=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,Zl=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ec=V(Zl).replace(/bull/g,vr).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),$h=V(Zl).replace(/bull/g,vr).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),yr=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,xh=/^[^\n]+/,br=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,kh=V(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",br).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Sh=V(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,vr).getRegex(),xi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",wr=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,_h=V("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",wr).replace("tag",xi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),tc=V(yr).replace("hr",_n).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xi).getRegex(),Ah=V(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",tc).getRegex(),$r={blockquote:Ah,code:yh,def:kh,fences:bh,heading:wh,hr:_n,html:_h,lheading:ec,list:Sh,newline:vh,paragraph:tc,table:gt,text:xh},Yo=V("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",_n).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xi).getRegex(),Ch={...$r,lheading:$h,table:Yo,paragraph:V(yr).replace("hr",_n).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Yo).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xi).getRegex()},Th={...$r,html:V(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",wr).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:gt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:V(yr).replace("hr",_n).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ec).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Eh=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Rh=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,nc=/^( {2,}|\\)\n(?!\s*$)/,Lh=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ki=/[\p{P}\p{S}]/u,xr=/[\s\p{P}\p{S}]/u,ic=/[^\s\p{P}\p{S}]/u,Ih=V(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,xr).getRegex(),sc=/(?!~)[\p{P}\p{S}]/u,Ph=/(?!~)[\s\p{P}\p{S}]/u,Dh=/(?:[^\s\p{P}\p{S}]|~)/u,rc=/(?![*_])[\p{P}\p{S}]/u,Mh=/(?![*_])[\s\p{P}\p{S}]/u,Fh=/(?:[^\s\p{P}\p{S}]|[*_])/u,Nh=V(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",mh?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),oc=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Oh=V(oc,"u").replace(/punct/g,ki).getRegex(),Bh=V(oc,"u").replace(/punct/g,sc).getRegex(),ac="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Uh=V(ac,"gu").replace(/notPunctSpace/g,ic).replace(/punctSpace/g,xr).replace(/punct/g,ki).getRegex(),zh=V(ac,"gu").replace(/notPunctSpace/g,Dh).replace(/punctSpace/g,Ph).replace(/punct/g,sc).getRegex(),Hh=V("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ic).replace(/punctSpace/g,xr).replace(/punct/g,ki).getRegex(),jh=V(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,rc).getRegex(),Kh="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",qh=V(Kh,"gu").replace(/notPunctSpace/g,Fh).replace(/punctSpace/g,Mh).replace(/punct/g,rc).getRegex(),Wh=V(/\\(punct)/,"gu").replace(/punct/g,ki).getRegex(),Gh=V(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Vh=V(wr).replace("(?:-->|$)","-->").getRegex(),Qh=V("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Vh).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),si=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Jh=V(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",si).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),lc=V(/^!?\[(label)\]\[(ref)\]/).replace("label",si).replace("ref",br).getRegex(),cc=V(/^!?\[(ref)\](?:\[\])?/).replace("ref",br).getRegex(),Yh=V("reflink|nolink(?!\\()","g").replace("reflink",lc).replace("nolink",cc).getRegex(),Xo=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,kr={_backpedal:gt,anyPunctuation:Wh,autolink:Gh,blockSkip:Nh,br:nc,code:Rh,del:gt,delLDelim:gt,delRDelim:gt,emStrongLDelim:Oh,emStrongRDelimAst:Uh,emStrongRDelimUnd:Hh,escape:Eh,link:Jh,nolink:cc,punctuation:Ih,reflink:lc,reflinkSearch:Yh,tag:Qh,text:Lh,url:gt},Xh={...kr,link:V(/^!?\[(label)\]\((.*?)\)/).replace("label",si).getRegex(),reflink:V(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",si).getRegex()},Rs={...kr,emStrongRDelimAst:zh,emStrongLDelim:Bh,delLDelim:jh,delRDelim:qh,url:V(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Xo).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:V(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Xo).getRegex()},Zh={...Rs,br:V(nc).replace("{2,}","*").getRegex(),text:V(Rs.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},zn={normal:$r,gfm:Ch,pedantic:Th},en={normal:kr,gfm:Rs,breaks:Zh,pedantic:Xh},em={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Zo=e=>em[e];function Oe(e,t){if(t){if(be.escapeTest.test(e))return e.replace(be.escapeReplace,Zo)}else if(be.escapeTestNoEncode.test(e))return e.replace(be.escapeReplaceNoEncode,Zo);return e}function ea(e){try{e=encodeURI(e).replace(be.percentDecode,"%")}catch{return null}return e}function ta(e,t){var r;let n=e.replace(be.findPipe,(o,a,l)=>{let c=!1,p=a;for(;--p>=0&&l[p]==="\\";)c=!c;return c?"|":" |"}),i=n.split(be.splitPipe),s=0;if(i[0].trim()||i.shift(),i.length>0&&!((r=i.at(-1))!=null&&r.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(be.slashPipe,"|");return i}function tn(e,t,n){let i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function tm(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function nm(e,t=0){let n=t,i="";for(let s of e)if(s==="	"){let r=4-n%4;i+=" ".repeat(r),n+=r}else i+=s,n++;return i}function na(e,t,n,i,s){let r=t.href,o=t.title||null,a=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:r,title:o,text:a,tokens:i.inlineTokens(a)};return i.state.inLink=!1,l}function im(e,t,n){let i=e.match(n.other.indentCodeCompensation);if(i===null)return t;let s=i[1];return t.split(`
`).map(r=>{let o=r.match(n.other.beginningSpace);if(o===null)return r;let[a]=o;return a.length>=s.length?r.slice(s.length):r}).join(`
`)}var ri=class{constructor(e){G(this,"options");G(this,"rules");G(this,"lexer");this.options=e||At}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:tn(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],i=im(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let i=tn(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:tn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=tn(t[0],`
`).split(`
`),i="",s="",r=[];for(;n.length>0;){let o=!1,a=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))a.push(n[l]),o=!0;else if(!o)a.push(n[l]);else break;n=n.slice(l);let c=a.join(`
`),p=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,s=s?`${s}
${p}`:p;let u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,r,!0),this.lexer.state.top=u,n.length===0)break;let f=r.at(-1);if((f==null?void 0:f.type)==="code")break;if((f==null?void 0:f.type)==="blockquote"){let b=f,x=b.raw+`
`+n.join(`
`),k=this.blockquote(x);r[r.length-1]=k,i=i.substring(0,i.length-b.raw.length)+k.raw,s=s.substring(0,s.length-b.text.length)+k.text;break}else if((f==null?void 0:f.type)==="list"){let b=f,x=b.raw+`
`+n.join(`
`),k=this.list(x);r[r.length-1]=k,i=i.substring(0,i.length-f.raw.length)+k.raw,s=s.substring(0,s.length-b.raw.length)+k.raw,n=x.substring(r.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:r,text:s}}}list(e){var n,i;let t=this.rules.block.list.exec(e);if(t){let s=t[1].trim(),r=s.length>1,o={type:"list",raw:"",ordered:r,start:r?+s.slice(0,-1):"",loose:!1,items:[]};s=r?`\\d{1,9}\\${s.slice(-1)}`:`\\${s}`,this.options.pedantic&&(s=r?s:"[*+-]");let a=this.rules.other.listItemRegex(s),l=!1;for(;e;){let p=!1,u="",f="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let b=nm(t[2].split(`
`,1)[0],t[1].length),x=e.split(`
`,1)[0],k=!b.trim(),S=0;if(this.options.pedantic?(S=2,f=b.trimStart()):k?S=t[1].length+1:(S=b.search(this.rules.other.nonSpaceChar),S=S>4?1:S,f=b.slice(S),S+=t[1].length),k&&this.rules.other.blankLine.test(x)&&(u+=x+`
`,e=e.substring(x.length+1),p=!0),!p){let E=this.rules.other.nextBulletRegex(S),M=this.rules.other.hrRegex(S),N=this.rules.other.fencesBeginRegex(S),I=this.rules.other.headingBeginRegex(S),_=this.rules.other.htmlBeginRegex(S),h=this.rules.other.blockquoteBeginRegex(S);for(;e;){let A=e.split(`
`,1)[0],C;if(x=A,this.options.pedantic?(x=x.replace(this.rules.other.listReplaceNesting,"  "),C=x):C=x.replace(this.rules.other.tabCharGlobal,"    "),N.test(x)||I.test(x)||_.test(x)||h.test(x)||E.test(x)||M.test(x))break;if(C.search(this.rules.other.nonSpaceChar)>=S||!x.trim())f+=`
`+C.slice(S);else{if(k||b.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||N.test(b)||I.test(b)||M.test(b))break;f+=`
`+x}k=!x.trim(),u+=A+`
`,e=e.substring(A.length+1),b=C.slice(S)}}o.loose||(l?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(l=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),o.raw+=u}let c=o.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let p of o.items){if(this.lexer.state.top=!1,p.tokens=this.lexer.blockTokens(p.text,[]),p.task){if(p.text=p.text.replace(this.rules.other.listReplaceTask,""),((n=p.tokens[0])==null?void 0:n.type)==="text"||((i=p.tokens[0])==null?void 0:i.type)==="paragraph"){p.tokens[0].raw=p.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),p.tokens[0].text=p.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(p.raw);if(u){let f={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};p.checked=f.checked,o.loose?p.tokens[0]&&["paragraph","text"].includes(p.tokens[0].type)&&"tokens"in p.tokens[0]&&p.tokens[0].tokens?(p.tokens[0].raw=f.raw+p.tokens[0].raw,p.tokens[0].text=f.raw+p.tokens[0].text,p.tokens[0].tokens.unshift(f)):p.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):p.tokens.unshift(f)}}if(!o.loose){let u=p.tokens.filter(b=>b.type==="space"),f=u.length>0&&u.some(b=>this.rules.other.anyLine.test(b.raw));o.loose=f}}if(o.loose)for(let p of o.items){p.loose=!0;for(let u of p.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var o;let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=ta(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],r={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(let a of i)this.rules.other.tableAlignRight.test(a)?r.align.push("right"):this.rules.other.tableAlignCenter.test(a)?r.align.push("center"):this.rules.other.tableAlignLeft.test(a)?r.align.push("left"):r.align.push(null);for(let a=0;a<n.length;a++)r.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:r.align[a]});for(let a of s)r.rows.push(ta(a,r.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:r.align[c]})));return r}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let r=tn(n.slice(0,-1),"\\");if((n.length-r.length)%2===0)return}else{let r=tm(t[2],"()");if(r===-2)return;if(r>-1){let o=(t[0].indexOf("!")===0?5:4)+t[1].length+r;t[2]=t[2].substring(0,r),t[0]=t[0].substring(0,o).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){let r=this.rules.other.pedanticHrefTitle.exec(i);r&&(i=r[1],s=r[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),na(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){let r=n[0].charAt(0);return{type:"text",raw:r,text:r}}return na(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(i[1]||i[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...i[0]].length-1,r,o,a=s,l=0,c=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+s);(i=c.exec(t))!=null;){if(r=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!r)continue;if(o=[...r].length,i[3]||i[4]){a+=o;continue}else if((i[5]||i[6])&&s%3&&!((s+o)%3)){l+=o;continue}if(a-=o,a>0)continue;o=Math.min(o,o+a+l);let p=[...i[0]][0].length,u=e.slice(0,s+i.index+p+o);if(Math.min(s,o)%2){let b=u.slice(1,-1);return{type:"em",raw:u,text:b,tokens:this.lexer.inlineTokens(b)}}let f=u.slice(2,-2);return{type:"strong",raw:u,text:f,tokens:this.lexer.inlineTokens(f)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e,t,n=""){let i=this.rules.inline.delLDelim.exec(e);if(i&&(!i[1]||!n||this.rules.inline.punctuation.exec(n))){let s=[...i[0]].length-1,r,o,a=s,l=this.rules.inline.delRDelim;for(l.lastIndex=0,t=t.slice(-1*e.length+s);(i=l.exec(t))!=null;){if(r=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!r||(o=[...r].length,o!==s))continue;if(i[3]||i[4]){a+=o;continue}if(a-=o,a>0)continue;o=Math.min(o,o+a);let c=[...i[0]][0].length,p=e.slice(0,s+i.index+c+o),u=p.slice(s,-s);return{type:"del",raw:p,text:u,tokens:this.lexer.inlineTokens(u)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let r;do r=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(r!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Ie=class Ls{constructor(t){G(this,"tokens");G(this,"options");G(this,"state");G(this,"inlineQueue");G(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||At,this.options.tokenizer=this.options.tokenizer||new ri,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:be,block:zn.normal,inline:en.normal};this.options.pedantic?(n.block=zn.pedantic,n.inline=en.pedantic):this.options.gfm&&(n.block=zn.gfm,this.options.breaks?n.inline=en.breaks:n.inline=en.gfm),this.tokenizer.rules=n}static get rules(){return{block:zn,inline:en}}static lex(t,n){return new Ls(n).lex(t)}static lexInline(t,n){return new Ls(n).inlineTokens(t)}lex(t){t=t.replace(be.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,r,o;for(this.options.pedantic&&(t=t.replace(be.tabCharGlobal,"    ").replace(be.spaceLine,""));t;){let a;if((r=(s=this.options.extensions)==null?void 0:s.block)!=null&&r.some(c=>(a=c.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.space(t)){t=t.substring(a.raw.length);let c=n.at(-1);a.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(a);continue}if(a=this.tokenizer.code(t)){t=t.substring(a.raw.length);let c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=(c.raw.endsWith(`
`)?"":`
`)+a.raw,c.text+=`
`+a.text,this.inlineQueue.at(-1).src=c.text):n.push(a);continue}if(a=this.tokenizer.fences(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.heading(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.hr(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.blockquote(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.list(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.html(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.def(t)){t=t.substring(a.raw.length);let c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=(c.raw.endsWith(`
`)?"":`
`)+a.raw,c.text+=`
`+a.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[a.tag]||(this.tokens.links[a.tag]={href:a.href,title:a.title},n.push(a));continue}if(a=this.tokenizer.table(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.lheading(t)){t=t.substring(a.raw.length),n.push(a);continue}let l=t;if((o=this.options.extensions)!=null&&o.startBlock){let c=1/0,p=t.slice(1),u;this.options.extensions.startBlock.forEach(f=>{u=f.call({lexer:this},p),typeof u=="number"&&u>=0&&(c=Math.min(c,u))}),c<1/0&&c>=0&&(l=t.substring(0,c+1))}if(this.state.top&&(a=this.tokenizer.paragraph(l))){let c=n.at(-1);i&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=(c.raw.endsWith(`
`)?"":`
`)+a.raw,c.text+=`
`+a.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(a),i=l.length!==t.length,t=t.substring(a.raw.length);continue}if(a=this.tokenizer.text(t)){t=t.substring(a.raw.length);let c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=(c.raw.endsWith(`
`)?"":`
`)+a.raw,c.text+=`
`+a.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(a);continue}if(t){let c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var l,c,p,u,f;let i=t,s=null;if(this.tokens.links){let b=Object.keys(this.tokens.links);if(b.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)b.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let r;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)r=s[2]?s[2].length:0,i=i.slice(0,s.index+r)+"["+"a".repeat(s[0].length-r-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);i=((c=(l=this.options.hooks)==null?void 0:l.emStrongMask)==null?void 0:c.call({lexer:this},i))??i;let o=!1,a="";for(;t;){o||(a=""),o=!1;let b;if((u=(p=this.options.extensions)==null?void 0:p.inline)!=null&&u.some(k=>(b=k.call({lexer:this},t,n))?(t=t.substring(b.raw.length),n.push(b),!0):!1))continue;if(b=this.tokenizer.escape(t)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.tag(t)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.link(t)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(b.raw.length);let k=n.at(-1);b.type==="text"&&(k==null?void 0:k.type)==="text"?(k.raw+=b.raw,k.text+=b.text):n.push(b);continue}if(b=this.tokenizer.emStrong(t,i,a)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.codespan(t)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.br(t)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.del(t,i,a)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.autolink(t)){t=t.substring(b.raw.length),n.push(b);continue}if(!this.state.inLink&&(b=this.tokenizer.url(t))){t=t.substring(b.raw.length),n.push(b);continue}let x=t;if((f=this.options.extensions)!=null&&f.startInline){let k=1/0,S=t.slice(1),E;this.options.extensions.startInline.forEach(M=>{E=M.call({lexer:this},S),typeof E=="number"&&E>=0&&(k=Math.min(k,E))}),k<1/0&&k>=0&&(x=t.substring(0,k+1))}if(b=this.tokenizer.inlineText(x)){t=t.substring(b.raw.length),b.raw.slice(-1)!=="_"&&(a=b.raw.slice(-1)),o=!0;let k=n.at(-1);(k==null?void 0:k.type)==="text"?(k.raw+=b.raw,k.text+=b.text):n.push(b);continue}if(t){let k="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(k);break}else throw new Error(k)}}return n}},oi=class{constructor(e){G(this,"options");G(this,"parser");this.options=e||At}space(e){return""}code({text:e,lang:t,escaped:n}){var r;let i=(r=(t||"").match(be.notSpaceStart))==null?void 0:r[0],s=e.replace(be.endingNewline,"")+`
`;return i?'<pre><code class="language-'+Oe(i)+'">'+(n?s:Oe(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Oe(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,i="";for(let o=0;o<e.items.length;o++){let a=e.items[o];i+=this.listitem(a)}let s=t?"ol":"ul",r=t&&n!==1?' start="'+n+'"':"";return"<"+s+r+`>
`+i+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let i="";for(let s=0;s<e.rows.length;s++){let r=e.rows[s];n="";for(let o=0;o<r.length;o++)n+=this.tablecell(r[o]);i+=this.tablerow({text:n})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+i+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Oe(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let i=this.parser.parseInline(n),s=ea(e);if(s===null)return i;e=s;let r='<a href="'+e+'"';return t&&(r+=' title="'+Oe(t)+'"'),r+=">"+i+"</a>",r}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));let s=ea(e);if(s===null)return Oe(n);e=s;let r=`<img src="${e}" alt="${Oe(n)}"`;return t&&(r+=` title="${Oe(t)}"`),r+=">",r}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Oe(e.text)}},Sr=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Pe=class Is{constructor(t){G(this,"options");G(this,"renderer");G(this,"textRenderer");this.options=t||At,this.options.renderer=this.options.renderer||new oi,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Sr}static parse(t,n){return new Is(n).parse(t)}static parseInline(t,n){return new Is(n).parseInline(t)}parse(t){var i,s;let n="";for(let r=0;r<t.length;r++){let o=t[r];if((s=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&s[o.type]){let l=o,c=this.options.extensions.renderers[l.type].call({parser:this},l);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(l.type)){n+=c||"";continue}}let a=o;switch(a.type){case"space":{n+=this.renderer.space(a);break}case"hr":{n+=this.renderer.hr(a);break}case"heading":{n+=this.renderer.heading(a);break}case"code":{n+=this.renderer.code(a);break}case"table":{n+=this.renderer.table(a);break}case"blockquote":{n+=this.renderer.blockquote(a);break}case"list":{n+=this.renderer.list(a);break}case"checkbox":{n+=this.renderer.checkbox(a);break}case"html":{n+=this.renderer.html(a);break}case"def":{n+=this.renderer.def(a);break}case"paragraph":{n+=this.renderer.paragraph(a);break}case"text":{n+=this.renderer.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}parseInline(t,n=this.renderer){var s,r;let i="";for(let o=0;o<t.length;o++){let a=t[o];if((r=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&r[a.type]){let c=this.options.extensions.renderers[a.type].call({parser:this},a);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type)){i+=c||"";continue}}let l=a;switch(l.type){case"escape":{i+=n.text(l);break}case"html":{i+=n.html(l);break}case"link":{i+=n.link(l);break}case"image":{i+=n.image(l);break}case"checkbox":{i+=n.checkbox(l);break}case"strong":{i+=n.strong(l);break}case"em":{i+=n.em(l);break}case"codespan":{i+=n.codespan(l);break}case"br":{i+=n.br(l);break}case"del":{i+=n.del(l);break}case"text":{i+=n.text(l);break}default:{let c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},jn,nn=(jn=class{constructor(e){G(this,"options");G(this,"block");this.options=e||At}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ie.lex:Ie.lexInline}provideParser(){return this.block?Pe.parse:Pe.parseInline}},G(jn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),G(jn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),jn),sm=class{constructor(...e){G(this,"defaults",mr());G(this,"options",this.setOptions);G(this,"parse",this.parseMarkdown(!0));G(this,"parseInline",this.parseMarkdown(!1));G(this,"Parser",Pe);G(this,"Renderer",oi);G(this,"TextRenderer",Sr);G(this,"Lexer",Ie);G(this,"Tokenizer",ri);G(this,"Hooks",nn);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let a of o.header)n=n.concat(this.walkTokens(a.tokens,t));for(let a of o.rows)for(let l of a)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[o.type]?this.defaults.extensions.childTokens[o.type].forEach(a=>{let l=o[a].flat(1/0);n=n.concat(this.walkTokens(l,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let r=t.renderers[s.name];r?t.renderers[s.name]=function(...o){let a=s.renderer.apply(this,o);return a===!1&&(a=r.apply(this,o)),a}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let r=t[s.level];r?r.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){let s=this.defaults.renderer||new oi(this.defaults);for(let r in n.renderer){if(!(r in s))throw new Error(`renderer '${r}' does not exist`);if(["options","parser"].includes(r))continue;let o=r,a=n.renderer[o],l=s[o];s[o]=(...c)=>{let p=a.apply(s,c);return p===!1&&(p=l.apply(s,c)),p||""}}i.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new ri(this.defaults);for(let r in n.tokenizer){if(!(r in s))throw new Error(`tokenizer '${r}' does not exist`);if(["options","rules","lexer"].includes(r))continue;let o=r,a=n.tokenizer[o],l=s[o];s[o]=(...c)=>{let p=a.apply(s,c);return p===!1&&(p=l.apply(s,c)),p}}i.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new nn;for(let r in n.hooks){if(!(r in s))throw new Error(`hook '${r}' does not exist`);if(["options","block"].includes(r))continue;let o=r,a=n.hooks[o],l=s[o];nn.passThroughHooks.has(r)?s[o]=c=>{if(this.defaults.async&&nn.passThroughHooksRespectAsync.has(r))return(async()=>{let u=await a.call(s,c);return l.call(s,u)})();let p=a.call(s,c);return l.call(s,p)}:s[o]=(...c)=>{if(this.defaults.async)return(async()=>{let u=await a.apply(s,c);return u===!1&&(u=await l.apply(s,c)),u})();let p=a.apply(s,c);return p===!1&&(p=l.apply(s,c)),p}}i.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,r=n.walkTokens;i.walkTokens=function(o){let a=[];return a.push(r.call(this,o)),s&&(a=a.concat(s.call(this,o))),a}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ie.lex(e,t??this.defaults)}parser(e,t){return Pe.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let i={...n},s={...this.defaults,...i},r=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&i.async===!1)return r(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return r(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return r(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let o=s.hooks?await s.hooks.preprocess(t):t,a=await(s.hooks?await s.hooks.provideLexer():e?Ie.lex:Ie.lexInline)(o,s),l=s.hooks?await s.hooks.processAllTokens(a):a;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():e?Pe.parse:Pe.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(r);try{s.hooks&&(t=s.hooks.preprocess(t));let o=(s.hooks?s.hooks.provideLexer():e?Ie.lex:Ie.lexInline)(t,s);s.hooks&&(o=s.hooks.processAllTokens(o)),s.walkTokens&&this.walkTokens(o,s.walkTokens);let a=(s.hooks?s.hooks.provideParser():e?Pe.parse:Pe.parseInline)(o,s);return s.hooks&&(a=s.hooks.postprocess(a)),a}catch(o){return r(o)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let i="<p>An error occurred:</p><pre>"+Oe(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},kt=new sm;function J(e,t){return kt.parse(e,t)}J.options=J.setOptions=function(e){return kt.setOptions(e),J.defaults=kt.defaults,Xl(J.defaults),J};J.getDefaults=mr;J.defaults=At;J.use=function(...e){return kt.use(...e),J.defaults=kt.defaults,Xl(J.defaults),J};J.walkTokens=function(e,t){return kt.walkTokens(e,t)};J.parseInline=kt.parseInline;J.Parser=Pe;J.parser=Pe.parse;J.Renderer=oi;J.TextRenderer=Sr;J.Lexer=Ie;J.lexer=Ie.lex;J.Tokenizer=ri;J.Hooks=nn;J.parse=J;J.options;J.setOptions;J.use;J.walkTokens;J.parseInline;Pe.parse;Ie.lex;J.setOptions({gfm:!0,breaks:!0});const rm=["a","b","blockquote","br","code","del","em","h1","h2","h3","h4","hr","i","li","ol","p","pre","strong","table","tbody","td","th","thead","tr","ul","img"],om=["class","href","rel","target","title","start","src","alt"],ia={ALLOWED_TAGS:rm,ALLOWED_ATTR:om,ADD_DATA_URI_TAGS:["img"]};let sa=!1;const am=14e4,lm=4e4,cm=200,rs=5e4,mt=new Map;function dm(e){const t=mt.get(e);return t===void 0?null:(mt.delete(e),mt.set(e,t),t)}function ra(e,t){if(mt.set(e,t),mt.size<=cm)return;const n=mt.keys().next().value;n&&mt.delete(n)}function um(){sa||(sa=!0,Es.addHook("afterSanitizeAttributes",e=>{!(e instanceof HTMLAnchorElement)||!e.getAttribute("href")||(e.setAttribute("rel","noreferrer noopener"),e.setAttribute("target","_blank"))}))}function Ps(e){const t=e.trim();if(!t)return"";if(um(),t.length<=rs){const o=dm(t);if(o!==null)return o}const n=Ka(t,am),i=n.truncated?`

… truncated (${n.total} chars, showing first ${n.text.length}).`:"";if(n.text.length>lm){const a=`<pre class="code-block">${uc(`${n.text}${i}`)}</pre>`,l=Es.sanitize(a,ia);return t.length<=rs&&ra(t,l),l}const s=J.parse(`${n.text}${i}`,{renderer:dc}),r=Es.sanitize(s,ia);return t.length<=rs&&ra(t,r),r}const dc=new J.Renderer;dc.html=({text:e})=>uc(e);function uc(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const pm=new RegExp("\\p{Script=Hebrew}|\\p{Script=Arabic}|\\p{Script=Syriac}|\\p{Script=Thaana}|\\p{Script=Nko}|\\p{Script=Samaritan}|\\p{Script=Mandaic}|\\p{Script=Adlam}|\\p{Script=Phoenician}|\\p{Script=Lydian}","u");function pc(e,t=/[\s\p{P}\p{S}]/u){if(!e)return"ltr";for(const n of e)if(!t.test(n))return pm.test(n)?"rtl":"ltr";return"ltr"}const fm=1500,gm=2e3,fc="Copy as markdown",hm="Copied",mm="Copy failed";async function vm(e){if(!e)return!1;try{return await navigator.clipboard.writeText(e),!0}catch{return!1}}function Hn(e,t){e.title=t,e.setAttribute("aria-label",t)}function ym(e){const t=e.label??fc;return d`
    <button
      class="chat-copy-btn"
      type="button"
      title=${t}
      aria-label=${t}
      @click=${async n=>{const i=n.currentTarget;if(!i||i.dataset.copying==="1")return;i.dataset.copying="1",i.setAttribute("aria-busy","true"),i.disabled=!0;const s=await vm(e.text());if(i.isConnected){if(delete i.dataset.copying,i.removeAttribute("aria-busy"),i.disabled=!1,!s){i.dataset.error="1",Hn(i,mm),window.setTimeout(()=>{i.isConnected&&(delete i.dataset.error,Hn(i,t))},gm);return}i.dataset.copied="1",Hn(i,hm),window.setTimeout(()=>{i.isConnected&&(delete i.dataset.copied,Hn(i,t))},fm)}}}
    >
      <span class="chat-copy-btn__icon" aria-hidden="true">
        <span class="chat-copy-btn__icon-copy">${ue.copy}</span>
        <span class="chat-copy-btn__icon-check">${ue.check}</span>
      </span>
    </button>
  `}function bm(e){return ym({text:()=>e,label:fc})}function gc(e){const t=e;let n=typeof t.role=="string"?t.role:"unknown";const i=typeof t.toolCallId=="string"||typeof t.tool_call_id=="string",s=t.content,r=Array.isArray(s)?s:null,o=Array.isArray(r)&&r.some(u=>{const f=u,b=(typeof f.type=="string"?f.type:"").toLowerCase();return b==="toolresult"||b==="tool_result"}),a=typeof t.toolName=="string"||typeof t.tool_name=="string";(i||o||a)&&(n="toolResult");let l=[];typeof t.content=="string"?l=[{type:"text",text:t.content}]:Array.isArray(t.content)?l=t.content.map(u=>({type:u.type||"text",text:u.text,name:u.name,args:u.args||u.arguments})):typeof t.text=="string"&&(l=[{type:"text",text:t.text}]);const c=typeof t.timestamp=="number"?t.timestamp:Date.now(),p=typeof t.id=="string"?t.id:void 0;return{role:n,content:l,timestamp:c,id:p}}function _r(e){const t=e.toLowerCase();return e==="user"||e==="User"?e:e==="assistant"?"assistant":e==="system"?"system":t==="toolresult"||t==="tool_result"||t==="tool"||t==="function"?"tool":e}function hc(e){const t=e,n=typeof t.role=="string"?t.role.toLowerCase():"";return n==="toolresult"||n==="tool_result"}function wm(e){return(e??"").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())||"Tool"}function $m(e){const t=(e??"").trim();return t?t.replace(/\s+/g,"_").toLowerCase():""}function xm(e){return(e??"").trim().toLowerCase()||"use"}const km={icon:"puzzle",detailKeys:["command","path","url","targetUrl","targetId","ref","element","node","nodeId","id","requestId","to","channelId","guildId","userId","name","query","pattern","messageId"]},Sm={bash:{icon:"wrench",title:"Bash",detailKeys:["command"]},process:{icon:"wrench",title:"Process",detailKeys:["sessionId"]},read:{icon:"fileText",title:"Read",detailKeys:["path"]},write:{icon:"edit",title:"Write",detailKeys:["path"]},edit:{icon:"penLine",title:"Edit",detailKeys:["path"]},attach:{icon:"paperclip",title:"Attach",detailKeys:["path","url","fileName"]},browser:{icon:"globe",title:"Browser",actions:{status:{label:"status"},start:{label:"start"},stop:{label:"stop"},tabs:{label:"tabs"},open:{label:"open",detailKeys:["targetUrl"]},focus:{label:"focus",detailKeys:["targetId"]},close:{label:"close",detailKeys:["targetId"]},snapshot:{label:"snapshot",detailKeys:["targetUrl","targetId","ref","element","format"]},screenshot:{label:"screenshot",detailKeys:["targetUrl","targetId","ref","element"]},navigate:{label:"navigate",detailKeys:["targetUrl","targetId"]},console:{label:"console",detailKeys:["level","targetId"]},pdf:{label:"pdf",detailKeys:["targetId"]},upload:{label:"upload",detailKeys:["paths","ref","inputRef","element","targetId"]},dialog:{label:"dialog",detailKeys:["accept","promptText","targetId"]},act:{label:"act",detailKeys:["request.kind","request.ref","request.selector","request.text","request.value"]}}},canvas:{icon:"image",title:"Canvas",actions:{present:{label:"present",detailKeys:["target","node","nodeId"]},hide:{label:"hide",detailKeys:["node","nodeId"]},navigate:{label:"navigate",detailKeys:["url","node","nodeId"]},eval:{label:"eval",detailKeys:["javaScript","node","nodeId"]},snapshot:{label:"snapshot",detailKeys:["format","node","nodeId"]},a2ui_push:{label:"A2UI push",detailKeys:["jsonlPath","node","nodeId"]},a2ui_reset:{label:"A2UI reset",detailKeys:["node","nodeId"]}}},nodes:{icon:"smartphone",title:"Nodes",actions:{status:{label:"status"},describe:{label:"describe",detailKeys:["node","nodeId"]},pending:{label:"pending"},approve:{label:"approve",detailKeys:["requestId"]},reject:{label:"reject",detailKeys:["requestId"]},notify:{label:"notify",detailKeys:["node","nodeId","title","body"]},camera_snap:{label:"camera snap",detailKeys:["node","nodeId","facing","deviceId"]},camera_list:{label:"camera list",detailKeys:["node","nodeId"]},camera_clip:{label:"camera clip",detailKeys:["node","nodeId","facing","duration","durationMs"]},screen_record:{label:"screen record",detailKeys:["node","nodeId","duration","durationMs","fps","screenIndex"]}}},cron:{icon:"loader",title:"Cron",actions:{status:{label:"status"},list:{label:"list"},add:{label:"add",detailKeys:["job.name","job.id","job.schedule","job.cron"]},update:{label:"update",detailKeys:["id"]},remove:{label:"remove",detailKeys:["id"]},run:{label:"run",detailKeys:["id"]},runs:{label:"runs",detailKeys:["id"]},wake:{label:"wake",detailKeys:["text","mode"]}}},gateway:{icon:"plug",title:"Gateway",actions:{restart:{label:"restart",detailKeys:["reason","delayMs"]},"config.get":{label:"config get"},"config.schema":{label:"config schema"},"config.apply":{label:"config apply",detailKeys:["restartDelayMs"]},"update.run":{label:"update run",detailKeys:["restartDelayMs"]}}},whatsapp_login:{icon:"circle",title:"WhatsApp Login",actions:{start:{label:"start"},wait:{label:"wait"}}},discord:{icon:"messageSquare",title:"Discord",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sticker:{label:"sticker",detailKeys:["to","stickerIds"]},poll:{label:"poll",detailKeys:["question","to"]},permissions:{label:"permissions",detailKeys:["channelId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},threadCreate:{label:"thread create",detailKeys:["channelId","name"]},threadList:{label:"thread list",detailKeys:["guildId","channelId"]},threadReply:{label:"thread reply",detailKeys:["channelId","content"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},searchMessages:{label:"search",detailKeys:["guildId","content"]},memberInfo:{label:"member",detailKeys:["guildId","userId"]},roleInfo:{label:"roles",detailKeys:["guildId"]},emojiList:{label:"emoji list",detailKeys:["guildId"]},roleAdd:{label:"role add",detailKeys:["guildId","userId","roleId"]},roleRemove:{label:"role remove",detailKeys:["guildId","userId","roleId"]},channelInfo:{label:"channel",detailKeys:["channelId"]},channelList:{label:"channels",detailKeys:["guildId"]},voiceStatus:{label:"voice",detailKeys:["guildId","userId"]},eventList:{label:"events",detailKeys:["guildId"]},eventCreate:{label:"event create",detailKeys:["guildId","name"]},timeout:{label:"timeout",detailKeys:["guildId","userId"]},kick:{label:"kick",detailKeys:["guildId","userId"]},ban:{label:"ban",detailKeys:["guildId","userId"]}}},slack:{icon:"messageSquare",title:"Slack",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},memberInfo:{label:"member",detailKeys:["userId"]},emojiList:{label:"emoji list"}}}},_m={fallback:km,tools:Sm},mc=_m,oa=mc.fallback??{icon:"puzzle"},Am=mc.tools??{};function Cm(e){if(!e)return e;const t=[{re:/^\/Users\/[^/]+(\/|$)/,replacement:"~$1"},{re:/^\/home\/[^/]+(\/|$)/,replacement:"~$1"},{re:/^C:\\Users\\[^\\]+(\\|$)/i,replacement:"~$1"}];for(const n of t)if(n.re.test(e))return e.replace(n.re,n.replacement);return e}function Tm(e){const t=$m(e.name),n=t.toLowerCase(),i=Am[n],s=(i==null?void 0:i.icon)??oa.icon??"puzzle",r=(i==null?void 0:i.title)??wm(t),o=(i==null?void 0:i.label)??r,a=e.args&&typeof e.args=="object"?e.args.action:void 0,l=typeof a=="string"?a.trim():void 0,c=n==="web_search"?"search":n==="web_fetch"?"fetch":n.replace(/_/g," ").replace(/\./g," "),p=xm(l??c);let u;n==="exec"&&(u=void 0),!u&&n==="read"&&(u=void 0),!u&&(n==="write"||n==="edit"||n==="attach")&&(u=void 0),!u&&n==="web_search"&&(u=void 0),!u&&n==="web_fetch"&&(u=void 0);const f=(i==null?void 0:i.detailKeys)??oa.detailKeys??[];return!u&&f.length>0&&(u=void 0),!u&&e.meta&&(u=e.meta),u&&(u=Cm(u)),{name:t,icon:s,title:r,label:o,verb:p,detail:u}}function Em(e){if(e.detail){if(e.detail.includes(" · ")){const t=e.detail.split(" · ").map(n=>n.trim()).filter(n=>n.length>0).join(", ");return t?`with ${t}`:void 0}return e.detail}}const Rm=80,Lm=2,aa=100;function Im(e){const t=e.trim();if(t.startsWith("{")||t.startsWith("["))try{const n=JSON.parse(t);return"```json\n"+JSON.stringify(n,null,2)+"\n```"}catch{}return e}function Pm(e){const t=e.split(`
`),n=t.slice(0,Lm),i=n.join(`
`);return i.length>aa?i.slice(0,aa)+"…":n.length<t.length?i+"…":i}function Dm(e){const t=e,n=Mm(t.content),i=[];for(const s of n){const r=(typeof s.type=="string"?s.type:"").toLowerCase();(["toolcall","tool_call","tooluse","tool_use"].includes(r)||typeof s.name=="string"&&s.arguments!=null)&&i.push({kind:"call",name:s.name??"tool",args:Fm(s.arguments??s.args)})}for(const s of n){const r=(typeof s.type=="string"?s.type:"").toLowerCase();if(r!=="toolresult"&&r!=="tool_result")continue;const o=Nm(s),a=typeof s.name=="string"?s.name:"tool";i.push({kind:"result",name:a,text:o})}if(hc(e)&&!i.some(s=>s.kind==="result")){const s=typeof t.toolName=="string"&&t.toolName||typeof t.tool_name=="string"&&t.tool_name||"tool",r=$l(e)??void 0;i.push({kind:"result",name:s,text:r})}return i}function la(e,t){var u,f;const n=Tm({name:e.name,args:e.args}),i=Em(n),s=!!((u=e.text)!=null&&u.trim()),r=!!t,o=r?()=>{if(s){t(Im(e.text));return}const b=`## ${n.label}

${i?`**Command:** \`${i}\`

`:""}*No output — tool completed successfully.*`;t(b)}:void 0,a=s&&(((f=e.text)==null?void 0:f.length)??0)<=Rm,l=s&&!a,c=s&&a,p=!s;return d`
    <div
      class="chat-tool-card ${r?"chat-tool-card--clickable":""}"
      @click=${o}
      role=${r?"button":w}
      tabindex=${r?"0":w}
      @keydown=${r?b=>{b.key!=="Enter"&&b.key!==" "||(b.preventDefault(),o==null||o())}:w}
    >
      <div class="chat-tool-card__header">
        <div class="chat-tool-card__title">
          <span class="chat-tool-card__icon">${ue[n.icon]}</span>
          <span>${n.label}</span>
        </div>
        ${r?d`<span class="chat-tool-card__action">${s?"View":""} ${ue.check}</span>`:w}
        ${p&&!r?d`<span class="chat-tool-card__status">${ue.check}</span>`:w}
      </div>
      ${i?d`<div class="chat-tool-card__detail">${i}</div>`:w}
      ${p?d`
              <div class="chat-tool-card__status-text muted">Completed</div>
            `:w}
      ${l?d`<div class="chat-tool-card__preview mono">${Pm(e.text)}</div>`:w}
      ${c?d`<div class="chat-tool-card__inline mono">${e.text}</div>`:w}
    </div>
  `}function Mm(e){return Array.isArray(e)?e.filter(Boolean):[]}function Fm(e){if(typeof e!="string")return e;const t=e.trim();if(!t||!t.startsWith("{")&&!t.startsWith("["))return e;try{return JSON.parse(t)}catch{return e}}function Nm(e){if(typeof e.text=="string")return e.text;if(typeof e.content=="string")return e.content}function Om(e){const n=e.content,i=[];if(Array.isArray(n))for(const s of n){if(typeof s!="object"||s===null)continue;const r=s;if(r.type==="image"){const o=r.source;if((o==null?void 0:o.type)==="base64"&&typeof o.data=="string"){const a=o.data,l=o.media_type||"image/png",c=a.startsWith("data:")?a:`data:${l};base64,${a}`;i.push({url:c})}else typeof r.url=="string"&&i.push({url:r.url})}else if(r.type==="image_url"){const o=r.image_url;typeof(o==null?void 0:o.url)=="string"&&i.push({url:o.url})}}return i}function Bm(e){return d`
    <div class="chat-group assistant">
      ${Ar("assistant",e)}
      <div class="chat-group-messages">
        <div class="chat-bubble chat-reading-indicator" aria-hidden="true">
          <span class="chat-reading-indicator__dots">
            <span></span><span></span><span></span>
          </span>
        </div>
      </div>
    </div>
  `}function Um(e,t,n,i){const s=new Date(t).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}),r=(i==null?void 0:i.name)??"Assistant";return d`
    <div class="chat-group assistant">
      ${Ar("assistant",i)}
      <div class="chat-group-messages">
        ${vc({role:"assistant",content:[{type:"text",text:e}],timestamp:t},{isStreaming:!0,showReasoning:!1},n)}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${r}</span>
          <span class="chat-group-timestamp">${s}</span>
        </div>
      </div>
    </div>
  `}function zm(e,t){const n=_r(e.role),i=t.assistantName??"Assistant",s=n==="user"?"You":n==="assistant"?i:n,r=n==="user"?"user":n==="assistant"?"assistant":"other",o=new Date(e.timestamp).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return d`
    <div class="chat-group ${r}">
      ${Ar(e.role,{name:i,avatar:t.assistantAvatar??null})}
      <div class="chat-group-messages">
        ${e.messages.map((a,l)=>vc(a.message,{isStreaming:e.isStreaming&&l===e.messages.length-1,showReasoning:t.showReasoning},t.onOpenSidebar))}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${s}</span>
          <span class="chat-group-timestamp">${o}</span>
        </div>
      </div>
    </div>
  `}function Ar(e,t){var a,l;const n=_r(e),i=((a=t==null?void 0:t.name)==null?void 0:a.trim())||"Assistant",s=((l=t==null?void 0:t.avatar)==null?void 0:l.trim())||"",r=n==="user"?"U":n==="assistant"?i.charAt(0).toUpperCase()||"A":n==="tool"?"⚙":"?",o=n==="user"?"user":n==="assistant"?"assistant":n==="tool"?"tool":"other";return s&&n==="assistant"?Hm(s)?d`<img
        class="chat-avatar ${o}"
        src="${s}"
        alt="${i}"
      />`:d`<div class="chat-avatar ${o}">${s}</div>`:d`<div class="chat-avatar ${o}">${r}</div>`}function Hm(e){return/^https?:\/\//i.test(e)||/^data:image\//i.test(e)||e.startsWith("/")}function jm(e){return e.length===0?w:d`
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
  `}function vc(e,t,n){const i=e,s=typeof i.role=="string"?i.role:"unknown",r=hc(e)||s.toLowerCase()==="toolresult"||s.toLowerCase()==="tool_result"||typeof i.toolCallId=="string"||typeof i.tool_call_id=="string",o=Dm(e),a=o.length>0,l=Om(e),c=l.length>0,p=$l(e),u=t.showReasoning&&s==="assistant"?Pp(e):null,f=p!=null&&p.trim()?p:null,b=u?Mp(u):null,x=f,k=s==="assistant"&&!!(x!=null&&x.trim()),S=["chat-bubble",k?"has-copy":"",t.isStreaming?"streaming":"","fade-in"].filter(Boolean).join(" ");return!x&&a&&r?d`${o.map(E=>la(E,n))}`:!x&&!a&&!c?w:d`
    <div class="${S}">
      ${k?bm(x):w}
      ${jm(l)}
      ${b?d`<div class="chat-thinking">${_s(Ps(b))}</div>`:w}
      ${x?d`<div class="chat-text" dir="${pc(x)}">${_s(Ps(x))}</div>`:w}
      ${o.map(E=>la(E,n))}
    </div>
  `}function Km(e){return d`
    <div class="sidebar-panel">
      <div class="sidebar-header">
        <div class="sidebar-title">Tool Output</div>
        <button @click=${e.onClose} class="btn" title="Close sidebar">
          ${ue.x}
        </button>
      </div>
      <div class="sidebar-content">
        ${e.error?d`
              <div class="callout danger">${e.error}</div>
              <button @click=${e.onViewRawText} class="btn" style="margin-top: 12px;">
                View Raw Text
              </button>
            `:e.content?d`<div class="sidebar-markdown">${_s(Ps(e.content))}</div>`:d`
                  <div class="muted">No content available</div>
                `}
      </div>
    </div>
  `}var qm=Object.defineProperty,Wm=Object.getOwnPropertyDescriptor,Si=(e,t,n,i)=>{for(var s=i>1?void 0:i?Wm(t,n):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(i?o(t,n,s):o(s))||s);return i&&s&&qm(t,n,s),s};let zt=class extends Nt{constructor(){super(...arguments),this.splitRatio=.6,this.minRatio=.4,this.maxRatio=.7,this.isDragging=!1,this.startX=0,this.startRatio=0,this.handleMouseDown=e=>{this.isDragging=!0,this.startX=e.clientX,this.startRatio=this.splitRatio,this.classList.add("dragging"),document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),e.preventDefault()},this.handleMouseMove=e=>{if(!this.isDragging)return;const t=this.parentElement;if(!t)return;const n=t.getBoundingClientRect().width,s=(e.clientX-this.startX)/n;let r=this.startRatio+s;r=Math.max(this.minRatio,Math.min(this.maxRatio,r)),this.dispatchEvent(new CustomEvent("resize",{detail:{splitRatio:r},bubbles:!0,composed:!0}))},this.handleMouseUp=()=>{this.isDragging=!1,this.classList.remove("dragging"),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}}render(){return w}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}};zt.styles=Rc`
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
  `;Si([ci({type:Number})],zt.prototype,"splitRatio",2);Si([ci({type:Number})],zt.prototype,"minRatio",2);Si([ci({type:Number})],zt.prototype,"maxRatio",2);zt=Si([Ra("resizable-divider")],zt);const Gm=5e3,Vm=/\.(xlsx|xls|xlsm|pdf)$/i;function Qm(e){for(let t=0;t<e.length;t++)if(Vm.test(e[t].name))return e[t];return null}function ca(e){e.style.height="auto",e.style.height=`${e.scrollHeight}px`}function Jm(e){return e?e.active?d`
      <div class="compaction-indicator compaction-indicator--active" role="status" aria-live="polite">
        ${ue.loader} Compacting context...
      </div>
    `:e.completedAt&&Date.now()-e.completedAt<Gm?d`
        <div class="compaction-indicator compaction-indicator--complete" role="status" aria-live="polite">
          ${ue.check} Context compacted
        </div>
      `:w:w}function Ym(){return`att-${Date.now()}-${Math.random().toString(36).slice(2,9)}`}function Xm(e,t){var s;const n=(s=e.clipboardData)==null?void 0:s.items;if(!n||!t.onAttachmentsChange)return;const i=[];for(let r=0;r<n.length;r++){const o=n[r];o.type.startsWith("image/")&&i.push(o)}if(i.length!==0){e.preventDefault();for(const r of i){const o=r.getAsFile();if(!o)continue;const a=new FileReader;a.addEventListener("load",()=>{var u;const l=a.result,c={id:Ym(),dataUrl:l,mimeType:o.type},p=t.attachments??[];(u=t.onAttachmentsChange)==null||u.call(t,[...p,c])}),a.readAsDataURL(o)}}}function Zm(e){const t=e.attachments??[];return t.length===0?w:d`
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
              @click=${()=>{var s;const i=(e.attachments??[]).filter(r=>r.id!==n.id);(s=e.onAttachmentsChange)==null||s.call(e,i)}}
            >
              ${ue.x}
            </button>
          </div>
        `)}
    </div>
  `}function ev(e){const t=e.uploadedFile,n=e.onFileSelect,i=e.onClearUploadedFile;return t!=null&&t.file_name?d`
      <div class="chat-uploaded-file">
        <span class="chat-uploaded-file__name" title=${t.file_path}>${t.file_name}</span>
        <button
          type="button"
          class="btn chat-uploaded-file__clear"
          aria-label="Remove uploaded file"
          @click=${i}
        >
          ${ue.x}
        </button>
      </div>
    `:!n||!e.connected?w:d`
    <div class="chat-uploaded-file-row">
      <input
        type="file"
        accept=".xlsx,.xls,.xlsm,.pdf"
        aria-label="Upload Excel or PDF"
        class="chat-uploaded-file-input"
        @change=${async s=>{var a;const r=s.target,o=(a=r.files)==null?void 0:a[0];o&&(await n(o),r.value="")}}
      />
      <button
        type="button"
        class="btn chat-upload-file-btn"
        @click=${s=>{var r,o;return(o=(r=s.currentTarget.parentElement)==null?void 0:r.querySelector("input[type=file]"))==null?void 0:o.click()}}
      >
        上传 Excel/PDF
      </button>
    </div>
  `}function tv(e){var E,M,N,I;const t=e.connected,n=e.sending||e.stream!==null,i=!!(e.canAbort&&e.onAbort),s=(M=(E=e.sessions)==null?void 0:E.sessions)==null?void 0:M.find(_=>_.key===e.sessionKey),r=(s==null?void 0:s.reasoningLevel)??"off",o=e.showThinking&&r!=="off",a={name:e.assistantName,avatar:e.assistantAvatar??e.assistantAvatarUrl??null},l=(((N=e.attachments)==null?void 0:N.length)??0)>0;(I=e.uploadedFile)!=null&&I.file_name;const c=e.connected?l?"Add a message or paste more images...":"Message (↩ to send, Shift+↩ for line breaks；可粘贴图片，或上传/拖拽 Excel/PDF)":"Connect to the gateway to start chatting…",p=e.splitRatio??.6,u=!!(e.sidebarOpen&&e.onCloseSidebar),f=d`
    <div
      class="chat-thread"
      role="log"
      aria-live="polite"
      @scroll=${e.onChatScroll}
    >
      ${e.loading?d`
              <div class="muted">Loading chat…</div>
            `:w}
      ${Ol(iv(e),_=>_.key,_=>_.kind==="divider"?d`
              <div class="chat-divider" role="separator" data-ts=${String(_.timestamp)}>
                <span class="chat-divider__line"></span>
                <span class="chat-divider__label">${_.label}</span>
                <span class="chat-divider__line"></span>
              </div>
            `:_.kind==="reading-indicator"?Bm(a):_.kind==="stream"?Um(_.text,_.startedAt,e.onOpenSidebar,a):_.kind==="group"?zm(_,{onOpenSidebar:e.onOpenSidebar,showReasoning:o,assistantName:e.assistantName,assistantAvatar:a.avatar}):w)}
    </div>
  `,b=_=>{var h;_.preventDefault(),_.stopPropagation(),_.dataTransfer&&(_.dataTransfer.dropEffect="copy"),(h=e.onComposeDragOver)==null||h.call(e)},x=_=>{var h;_.preventDefault(),_.stopPropagation(),_.dataTransfer&&(_.dataTransfer.dropEffect="copy"),(h=e.onComposeDragOver)==null||h.call(e)},k=_=>{var C;const h=_.currentTarget,A=_.relatedTarget;A!=null&&(h.contains(A)||(C=e.onComposeDragLeave)==null||C.call(e))},S=_=>{var A,C,R;_.preventDefault(),_.stopPropagation(),(A=e.onComposeDragLeave)==null||A.call(e);const h=(R=(C=_.dataTransfer)==null?void 0:C.files)!=null&&R.length?Qm(_.dataTransfer.files):null;h&&e.onComposeDrop&&e.onComposeDrop(h)};return d`
    <section
      class="card chat ${e.composeDragOver?"chat--drag-over":""}"
      @dragenter=${b}
      @dragover=${x}
      @dragleave=${k}
      @drop=${S}
    >
      ${e.disabledReason?d`<div class="callout">${e.disabledReason}</div>`:w}

      ${e.error?d`<div class="callout danger">${e.error}</div>`:w}

      ${e.focusMode?d`
            <button
              class="chat-focus-exit"
              type="button"
              @click=${e.onToggleFocusMode}
              aria-label="Exit focus mode"
              title="Exit focus mode"
            >
              ${ue.x}
            </button>
          `:w}

      <div
        class="chat-split-container ${u?"chat-split-container--open":""}"
      >
        <div
          class="chat-main"
          style="flex: ${u?`0 0 ${p*100}%`:"1 1 100%"}"
        >
          ${f}
        </div>

        ${u?d`
              <resizable-divider
                .splitRatio=${p}
                @resize=${_=>{var h;return(h=e.onSplitRatioChange)==null?void 0:h.call(e,_.detail.splitRatio)}}
              ></resizable-divider>
              <div class="chat-sidebar">
                ${Km({content:e.sidebarContent??null,error:e.sidebarError??null,onClose:e.onCloseSidebar,onViewRawText:()=>{!e.sidebarContent||!e.onOpenSidebar||e.onOpenSidebar(`\`\`\`
${e.sidebarContent}
\`\`\``)}})}
              </div>
            `:w}
      </div>

      ${e.queue.length?d`
            <div class="chat-queue" role="status" aria-live="polite">
              <div class="chat-queue__title">Queued (${e.queue.length})</div>
              <div class="chat-queue__list">
                ${e.queue.map(_=>{var h;return d`
                    <div class="chat-queue__item">
                      <div class="chat-queue__text">
                        ${_.text||((h=_.attachments)!=null&&h.length?`Image (${_.attachments.length})`:"")}
                      </div>
                      <button
                        class="btn chat-queue__remove"
                        type="button"
                        aria-label="Remove queued message"
                        @click=${()=>e.onQueueRemove(_.id)}
                      >
                        ${ue.x}
                      </button>
                    </div>
                  `})}
              </div>
            </div>
          `:w}

      ${Jm(e.compactionStatus)}

      ${e.showNewMessages?d`
            <button
              class="btn chat-new-messages"
              type="button"
              @click=${e.onScrollToBottom}
            >
              New messages ${ue.arrowDown}
            </button>
          `:w}

      <div class="chat-compose ${e.composeDragOver?"chat-compose--drag-over":""}">
        ${e.composeDragOver?d`<div class="chat-compose__drop-hint">松开以上传 Excel/PDF</div>`:w}
        ${Zm(e)}
        ${ev(e)}
        <div class="chat-compose__row">
          <label class="field chat-compose__field">
            <span>Message</span>
            <textarea
              ${Vg(_=>_&&ca(_))}
              .value=${e.draft}
              dir=${pc(e.draft)}
              ?disabled=${!e.connected}
              @keydown=${_=>{_.key==="Enter"&&(_.isComposing||_.keyCode===229||_.shiftKey||e.connected&&(_.preventDefault(),t&&e.onSend()))}}
              @input=${_=>{const h=_.target;ca(h),e.onDraftChange(h.value)}}
              @paste=${_=>Xm(_,e)}
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
  `}const da=200;function nv(e){const t=[];let n=null;for(const i of e){if(i.kind!=="message"){n&&(t.push(n),n=null),t.push(i);continue}const s=gc(i.message),r=_r(s.role),o=s.timestamp||Date.now();!n||n.role!==r?(n&&t.push(n),n={kind:"group",key:`group:${r}:${i.key}`,role:r,messages:[{message:i.message,key:i.key}],timestamp:o,isStreaming:!1}):n.messages.push({message:i.message,key:i.key})}return n&&t.push(n),t}function iv(e){const t=[],n=Array.isArray(e.messages)?e.messages:[],i=Array.isArray(e.toolMessages)?e.toolMessages:[],s=Math.max(0,n.length-da);s>0&&t.push({kind:"message",key:"chat:history:notice",message:{role:"system",content:`Showing last ${da} messages (${s} hidden).`,timestamp:Date.now()}});for(let r=s;r<n.length;r++){const o=n[r],a=gc(o),c=o.__openclaw;if(c&&c.kind==="compaction"){t.push({kind:"divider",key:typeof c.id=="string"?`divider:compaction:${c.id}`:`divider:compaction:${a.timestamp}:${r}`,label:"Compaction",timestamp:a.timestamp??Date.now()});continue}!e.showThinking&&a.role.toLowerCase()==="toolresult"||t.push({kind:"message",key:ua(o,r),message:o})}if(e.showThinking)for(let r=0;r<i.length;r++)t.push({kind:"message",key:ua(i[r],r+n.length),message:i[r]});if(e.stream!==null){const r=`stream:${e.sessionKey}:${e.streamStartedAt??"live"}`;e.stream.trim().length>0?t.push({kind:"stream",key:r,text:e.stream,startedAt:e.streamStartedAt??Date.now()}):t.push({kind:"reading-indicator",key:r})}return nv(t)}function ua(e,t){const n=e,i=typeof n.toolCallId=="string"?n.toolCallId:"";if(i)return`tool:${i}`;const s=typeof n.id=="string"?n.id:"";if(s)return`msg:${s}`;const r=typeof n.messageId=="string"?n.messageId:"";if(r)return`msg:${r}`;const o=typeof n.timestamp=="number"?n.timestamp:null,a=typeof n.role=="string"?n.role:"unknown";return o!=null?`msg:${a}:${o}:${t}`:`msg:${a}:${t}`}const sv=new Set(["title","description","default","nullable"]);function rv(e){return Object.keys(e??{}).filter(n=>!sv.has(n)).length===0}function ov(e){if(e===void 0)return"";try{return JSON.stringify(e,null,2)??""}catch{return""}}const wn={chevronDown:d`
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
  `};function St(e){const{schema:t,value:n,path:i,hints:s,unsupported:r,disabled:o,onPatch:a}=e,l=e.showLabel??!0,c=_e(t),p=Ae(i,s),u=(p==null?void 0:p.label)??t.title??Ye(String(i.at(-1))),f=(p==null?void 0:p.help)??t.description,b=Us(i);if(r.has(b))return d`<div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${u}</div>
      <div class="cfg-field__error">Unsupported schema node. Use Raw mode.</div>
    </div>`;if(t.anyOf||t.oneOf){const k=(t.anyOf??t.oneOf??[]).filter(_=>!(_.type==="null"||Array.isArray(_.type)&&_.type.includes("null")));if(k.length===1)return St({...e,schema:k[0]});const S=_=>{if(_.const!==void 0)return _.const;if(_.enum&&_.enum.length===1)return _.enum[0]},E=k.map(S),M=E.every(_=>_!==void 0);if(M&&E.length>0&&E.length<=5){const _=n??t.default;return d`
        <div class="cfg-field">
          ${l?d`<label class="cfg-field__label">${u}</label>`:w}
          ${f?d`<div class="cfg-field__help">${f}</div>`:w}
          <div class="cfg-segmented">
            ${E.map(h=>d`
              <button
                type="button"
                class="cfg-segmented__btn ${h===_||String(h)===String(_)?"active":""}"
                ?disabled=${o}
                @click=${()=>a(i,h)}
              >
                ${String(h)}
              </button>
            `)}
          </div>
        </div>
      `}if(M&&E.length>5)return fa({...e,options:E,value:n??t.default});const N=new Set(k.map(_=>_e(_)).filter(Boolean)),I=new Set([...N].map(_=>_==="integer"?"number":_));if([...I].every(_=>["string","number","boolean"].includes(_))){const _=I.has("string"),h=I.has("number");if(I.has("boolean")&&I.size===1)return St({...e,schema:{...t,type:"boolean",anyOf:void 0,oneOf:void 0}});if(_||h)return pa({...e,inputType:h&&!_?"number":"text"})}}if(t.enum){const x=t.enum;if(x.length<=5){const k=n??t.default;return d`
        <div class="cfg-field">
          ${l?d`<label class="cfg-field__label">${u}</label>`:w}
          ${f?d`<div class="cfg-field__help">${f}</div>`:w}
          <div class="cfg-segmented">
            ${x.map(S=>d`
              <button
                type="button"
                class="cfg-segmented__btn ${S===k||String(S)===String(k)?"active":""}"
                ?disabled=${o}
                @click=${()=>a(i,S)}
              >
                ${String(S)}
              </button>
            `)}
          </div>
        </div>
      `}return fa({...e,options:x,value:n??t.default})}if(c==="object")return lv(e);if(c==="array")return cv(e);if(c==="boolean"){const x=typeof n=="boolean"?n:typeof t.default=="boolean"?t.default:!1;return d`
      <label class="cfg-toggle-row ${o?"disabled":""}">
        <div class="cfg-toggle-row__content">
          <span class="cfg-toggle-row__label">${u}</span>
          ${f?d`<span class="cfg-toggle-row__help">${f}</span>`:w}
        </div>
        <div class="cfg-toggle">
          <input
            type="checkbox"
            .checked=${x}
            ?disabled=${o}
            @change=${k=>a(i,k.target.checked)}
          />
          <span class="cfg-toggle__track"></span>
        </div>
      </label>
    `}return c==="number"||c==="integer"?av(e):c==="string"?pa({...e,inputType:"text"}):d`
    <div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${u}</div>
      <div class="cfg-field__error">Unsupported type: ${c}. Use Raw mode.</div>
    </div>
  `}function pa(e){const{schema:t,value:n,path:i,hints:s,disabled:r,onPatch:o,inputType:a}=e,l=e.showLabel??!0,c=Ae(i,s),p=(c==null?void 0:c.label)??t.title??Ye(String(i.at(-1))),u=(c==null?void 0:c.help)??t.description,f=((c==null?void 0:c.sensitive)??!1)&&!/^\$\{[^}]*\}$/.test(String(n??"").trim()),b=(c==null?void 0:c.placeholder)??(f?"••••":t.default!==void 0?`Default: ${String(t.default)}`:""),x=n??"";return d`
    <div class="cfg-field">
      ${l?d`<label class="cfg-field__label">${p}</label>`:w}
      ${u?d`<div class="cfg-field__help">${u}</div>`:w}
      <div class="cfg-input-wrap">
        <input
          type=${f?"password":a}
          class="cfg-input"
          placeholder=${b}
          .value=${x==null?"":String(x)}
          ?disabled=${r}
          @input=${k=>{const S=k.target.value;if(a==="number"){if(S.trim()===""){o(i,void 0);return}const E=Number(S);o(i,Number.isNaN(E)?S:E);return}o(i,S)}}
          @change=${k=>{if(a==="number")return;const S=k.target.value;o(i,S.trim())}}
        />
        ${t.default!==void 0?d`
          <button
            type="button"
            class="cfg-input__reset"
            title="Reset to default"
            ?disabled=${r}
            @click=${()=>o(i,t.default)}
          >↺</button>
        `:w}
      </div>
    </div>
  `}function av(e){const{schema:t,value:n,path:i,hints:s,disabled:r,onPatch:o}=e,a=e.showLabel??!0,l=Ae(i,s),c=(l==null?void 0:l.label)??t.title??Ye(String(i.at(-1))),p=(l==null?void 0:l.help)??t.description,u=n??t.default??"",f=typeof u=="number"?u:0;return d`
    <div class="cfg-field">
      ${a?d`<label class="cfg-field__label">${c}</label>`:w}
      ${p?d`<div class="cfg-field__help">${p}</div>`:w}
      <div class="cfg-number">
        <button
          type="button"
          class="cfg-number__btn"
          ?disabled=${r}
          @click=${()=>o(i,f-1)}
        >−</button>
        <input
          type="number"
          class="cfg-number__input"
          .value=${u==null?"":String(u)}
          ?disabled=${r}
          @input=${b=>{const x=b.target.value,k=x===""?void 0:Number(x);o(i,k)}}
        />
        <button
          type="button"
          class="cfg-number__btn"
          ?disabled=${r}
          @click=${()=>o(i,f+1)}
        >+</button>
      </div>
    </div>
  `}function fa(e){const{schema:t,value:n,path:i,hints:s,disabled:r,options:o,onPatch:a}=e,l=e.showLabel??!0,c=Ae(i,s),p=(c==null?void 0:c.label)??t.title??Ye(String(i.at(-1))),u=(c==null?void 0:c.help)??t.description,f=n??t.default,b=o.findIndex(k=>k===f||String(k)===String(f)),x="__unset__";return d`
    <div class="cfg-field">
      ${l?d`<label class="cfg-field__label">${p}</label>`:w}
      ${u?d`<div class="cfg-field__help">${u}</div>`:w}
      <select
        class="cfg-select"
        ?disabled=${r}
        .value=${b>=0?String(b):x}
        @change=${k=>{const S=k.target.value;a(i,S===x?void 0:o[Number(S)])}}
      >
        <option value=${x}>Select...</option>
        ${o.map((k,S)=>d`
          <option value=${String(S)}>${String(k)}</option>
        `)}
      </select>
    </div>
  `}function lv(e){const{schema:t,value:n,path:i,hints:s,unsupported:r,disabled:o,onPatch:a}=e,l=Ae(i,s),c=(l==null?void 0:l.label)??t.title??Ye(String(i.at(-1))),p=(l==null?void 0:l.help)??t.description,u=n??t.default,f=u&&typeof u=="object"&&!Array.isArray(u)?u:{},b=t.properties??{},k=Object.entries(b).toSorted((I,_)=>{var C,R;const h=((C=Ae([...i,I[0]],s))==null?void 0:C.order)??0,A=((R=Ae([...i,_[0]],s))==null?void 0:R.order)??0;return h!==A?h-A:I[0].localeCompare(_[0])}),S=new Set(Object.keys(b)),E=t.additionalProperties,M=!!E&&typeof E=="object",N=d`
    ${k.map(([I,_])=>St({schema:_,value:f[I],path:[...i,I],hints:s,unsupported:r,disabled:o,onPatch:a}))}
    ${M?dv({schema:E,value:f,path:i,hints:s,unsupported:r,disabled:o,reservedKeys:S,onPatch:a}):w}
  `;return i.length===1?d`
      <div class="cfg-fields">
        ${N}
      </div>
    `:d`
    <details class="cfg-object" open>
      <summary class="cfg-object__header">
        <span class="cfg-object__title">${c}</span>
        <span class="cfg-object__chevron">${wn.chevronDown}</span>
      </summary>
      ${p?d`<div class="cfg-object__help">${p}</div>`:w}
      <div class="cfg-object__content">
        ${N}
      </div>
    </details>
  `}function cv(e){const{schema:t,value:n,path:i,hints:s,unsupported:r,disabled:o,onPatch:a}=e,l=e.showLabel??!0,c=Ae(i,s),p=(c==null?void 0:c.label)??t.title??Ye(String(i.at(-1))),u=(c==null?void 0:c.help)??t.description,f=Array.isArray(t.items)?t.items[0]:t.items;if(!f)return d`
      <div class="cfg-field cfg-field--error">
        <div class="cfg-field__label">${p}</div>
        <div class="cfg-field__error">Unsupported array schema. Use Raw mode.</div>
      </div>
    `;const b=Array.isArray(n)?n:Array.isArray(t.default)?t.default:[];return d`
    <div class="cfg-array">
      <div class="cfg-array__header">
        ${l?d`<span class="cfg-array__label">${p}</span>`:w}
        <span class="cfg-array__count">${b.length} item${b.length!==1?"s":""}</span>
        <button
          type="button"
          class="cfg-array__add"
          ?disabled=${o}
          @click=${()=>{const x=[...b,La(f)];a(i,x)}}
        >
          <span class="cfg-array__add-icon">${wn.plus}</span>
          Add
        </button>
      </div>
      ${u?d`<div class="cfg-array__help">${u}</div>`:w}

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
                  ?disabled=${o}
                  @click=${()=>{const S=[...b];S.splice(k,1),a(i,S)}}
                >
                  ${wn.trash}
                </button>
              </div>
              <div class="cfg-array__item-content">
                ${St({schema:f,value:x,path:[...i,k],hints:s,unsupported:r,disabled:o,showLabel:!1,onPatch:a})}
              </div>
            </div>
          `)}
        </div>
      `}
    </div>
  `}function dv(e){const{schema:t,value:n,path:i,hints:s,unsupported:r,disabled:o,reservedKeys:a,onPatch:l}=e,c=rv(t),p=Object.entries(n??{}).filter(([u])=>!a.has(u));return d`
    <div class="cfg-map">
      <div class="cfg-map__header">
        <span class="cfg-map__label">Custom entries</span>
        <button
          type="button"
          class="cfg-map__add"
          ?disabled=${o}
          @click=${()=>{const u={...n};let f=1,b=`custom-${f}`;for(;b in u;)f+=1,b=`custom-${f}`;u[b]=c?{}:La(t),l(i,u)}}
        >
          <span class="cfg-map__add-icon">${wn.plus}</span>
          Add Entry
        </button>
      </div>

      ${p.length===0?d`
              <div class="cfg-map__empty">No custom entries.</div>
            `:d`
        <div class="cfg-map__items">
          ${p.map(([u,f])=>{const b=[...i,u],x=ov(f);return d`
              <div class="cfg-map__item">
                <div class="cfg-map__item-key">
                  <input
                    type="text"
                    class="cfg-input cfg-input--sm"
                    placeholder="Key"
                    .value=${u}
                    ?disabled=${o}
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
                          ?disabled=${o}
                          @change=${k=>{const S=k.target,E=S.value.trim();if(!E){l(b,void 0);return}try{l(b,JSON.parse(E))}catch{S.value=x}}}
                        ></textarea>
                      `:St({schema:t,value:f,path:b,hints:s,unsupported:r,disabled:o,showLabel:!1,onPatch:l})}
                </div>
                <button
                  type="button"
                  class="cfg-map__item-remove"
                  title="Remove entry"
                  ?disabled=${o}
                  @click=${()=>{const k={...n};delete k[u],l(i,k)}}
                >
                  ${wn.trash}
                </button>
              </div>
            `})}
        </div>
      `}
    </div>
  `}const ga={env:d`
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
  `},Cr={env:{label:"Environment Variables",description:"Environment variables passed to the gateway process"},update:{label:"Updates",description:"Auto-update settings and release channel"},agents:{label:"Agents",description:"Agent configurations, models, and identities"},auth:{label:"Authentication",description:"API keys and authentication profiles"},channels:{label:"Channels",description:"Messaging channels (Telegram, Discord, Slack, etc.)"},messages:{label:"Messages",description:"Message handling and routing settings"},commands:{label:"Commands",description:"Custom slash commands"},hooks:{label:"Hooks",description:"Webhooks and event hooks"},skills:{label:"Skills",description:"Skill packs and capabilities"},tools:{label:"Tools",description:"Tool configurations (browser, search, etc.)"},gateway:{label:"Gateway",description:"Gateway server settings (port, auth, binding)"},wizard:{label:"Setup Wizard",description:"Setup wizard state and history"},meta:{label:"Metadata",description:"Gateway metadata and version information"},logging:{label:"Logging",description:"Log levels and output configuration"},browser:{label:"Browser",description:"Browser automation settings"},ui:{label:"UI",description:"User interface preferences"},models:{label:"Models",description:"AI model configurations and providers"},bindings:{label:"Bindings",description:"Key bindings and shortcuts"},broadcast:{label:"Broadcast",description:"Broadcast and notification settings"},audio:{label:"Audio",description:"Audio input/output settings"},session:{label:"Session",description:"Session management and persistence"},cron:{label:"Cron",description:"Scheduled tasks and automation"},web:{label:"Web",description:"Web server and API settings"},discovery:{label:"Discovery",description:"Service discovery and networking"},canvasHost:{label:"Canvas Host",description:"Canvas rendering and display"},talk:{label:"Talk",description:"Voice and speech settings"},plugins:{label:"Plugins",description:"Plugin management and extensions"}};function ha(e){return ga[e]??ga.default}function uv(e,t,n){if(!n)return!0;const i=n.toLowerCase(),s=Cr[e];return e.toLowerCase().includes(i)||s&&(s.label.toLowerCase().includes(i)||s.description.toLowerCase().includes(i))?!0:sn(t,i)}function sn(e,t){var i,s,r;if((i=e.title)!=null&&i.toLowerCase().includes(t)||(s=e.description)!=null&&s.toLowerCase().includes(t)||(r=e.enum)!=null&&r.some(o=>String(o).toLowerCase().includes(t)))return!0;if(e.properties){for(const[o,a]of Object.entries(e.properties))if(o.toLowerCase().includes(t)||sn(a,t))return!0}if(e.items){const o=Array.isArray(e.items)?e.items:[e.items];for(const a of o)if(a&&sn(a,t))return!0}if(e.additionalProperties&&typeof e.additionalProperties=="object"&&sn(e.additionalProperties,t))return!0;const n=e.anyOf??e.oneOf??e.allOf;if(n){for(const o of n)if(o&&sn(o,t))return!0}return!1}function pv(e){var u;if(!e.schema)return d`
      <div class="muted">Schema unavailable.</div>
    `;const t=e.schema,n=e.value??{};if(_e(t)!=="object"||!t.properties)return d`
      <div class="callout danger">Unsupported schema. Use Raw.</div>
    `;const i=new Set(e.unsupportedPaths??[]),s=t.properties,r=e.searchQuery??"",o=e.activeSection,a=e.activeSubsection??null,c=Object.entries(s).toSorted((f,b)=>{var S,E;const x=((S=Ae([f[0]],e.uiHints))==null?void 0:S.order)??50,k=((E=Ae([b[0]],e.uiHints))==null?void 0:E.order)??50;return x!==k?x-k:f[0].localeCompare(b[0])}).filter(([f,b])=>!(o&&f!==o||r&&!uv(f,b,r)));let p=null;if(o&&a&&c.length===1){const f=(u=c[0])==null?void 0:u[1];f&&_e(f)==="object"&&f.properties&&f.properties[a]&&(p={sectionKey:o,subsectionKey:a,schema:f.properties[a]})}return c.length===0?d`
      <div class="config-empty">
        <div class="config-empty__icon">${ue.search}</div>
        <div class="config-empty__text">
          ${r?`No settings match "${r}"`:"No settings in this section"}
        </div>
      </div>
    `:d`
    <div class="config-form config-form--modern">
      ${p?(()=>{const{sectionKey:f,subsectionKey:b,schema:x}=p,k=Ae([f,b],e.uiHints),S=(k==null?void 0:k.label)??x.title??Ye(b),E=(k==null?void 0:k.help)??x.description??"",M=n[f],N=M&&typeof M=="object"?M[b]:void 0,I=`config-section-${f}-${b}`;return d`
              <section class="config-section-card" id=${I}>
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${ha(f)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${S}</h3>
                    ${E?d`<p class="config-section-card__desc">${E}</p>`:w}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${St({schema:x,value:N,path:[f,b],hints:e.uiHints,unsupported:i,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})():c.map(([f,b])=>{const x=Cr[f]??{label:f.charAt(0).toUpperCase()+f.slice(1),description:b.description??""};return d`
              <section class="config-section-card" id="config-section-${f}">
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${ha(f)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${x.label}</h3>
                    ${x.description?d`<p class="config-section-card__desc">${x.description}</p>`:w}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${St({schema:b,value:n[f],path:[f],hints:e.uiHints,unsupported:i,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})}
    </div>
  `}const fv=new Set(["title","description","default","nullable"]);function gv(e){return Object.keys(e??{}).filter(n=>!fv.has(n)).length===0}function yc(e){const t=e.filter(s=>s!=null),n=t.length!==e.length,i=[];for(const s of t)i.some(r=>Object.is(r,s))||i.push(s);return{enumValues:i,nullable:n}}function hv(e){return!e||typeof e!="object"?{schema:null,unsupportedPaths:["<root>"]}:un(e,[])}function un(e,t){const n=new Set,i={...e},s=Us(t)||"<root>";if(e.anyOf||e.oneOf||e.allOf){const a=mv(e,t);return a||{schema:e,unsupportedPaths:[s]}}const r=Array.isArray(e.type)&&e.type.includes("null"),o=_e(e)??(e.properties||e.additionalProperties?"object":void 0);if(i.type=o??e.type,i.nullable=r||e.nullable,i.enum){const{enumValues:a,nullable:l}=yc(i.enum);i.enum=a,l&&(i.nullable=!0),a.length===0&&n.add(s)}if(o==="object"){const a=e.properties??{},l={};for(const[c,p]of Object.entries(a)){const u=un(p,[...t,c]);u.schema&&(l[c]=u.schema);for(const f of u.unsupportedPaths)n.add(f)}if(i.properties=l,e.additionalProperties===!0)n.add(s);else if(e.additionalProperties===!1)i.additionalProperties=!1;else if(e.additionalProperties&&typeof e.additionalProperties=="object"&&!gv(e.additionalProperties)){const c=un(e.additionalProperties,[...t,"*"]);i.additionalProperties=c.schema??e.additionalProperties,c.unsupportedPaths.length>0&&n.add(s)}}else if(o==="array"){const a=Array.isArray(e.items)?e.items[0]:e.items;if(!a)n.add(s);else{const l=un(a,[...t,"*"]);i.items=l.schema??a,l.unsupportedPaths.length>0&&n.add(s)}}else o!=="string"&&o!=="number"&&o!=="integer"&&o!=="boolean"&&!i.enum&&n.add(s);return{schema:i,unsupportedPaths:Array.from(n)}}function mv(e,t){if(e.allOf)return null;const n=e.anyOf??e.oneOf;if(!n)return null;const i=[],s=[];let r=!1;for(const a of n){if(!a||typeof a!="object")return null;if(Array.isArray(a.enum)){const{enumValues:l,nullable:c}=yc(a.enum);i.push(...l),c&&(r=!0);continue}if("const"in a){if(a.const==null){r=!0;continue}i.push(a.const);continue}if(_e(a)==="null"){r=!0;continue}s.push(a)}if(i.length>0&&s.length===0){const a=[];for(const l of i)a.some(c=>Object.is(c,l))||a.push(l);return{schema:{...e,enum:a,nullable:r,anyOf:void 0,oneOf:void 0,allOf:void 0},unsupportedPaths:[]}}if(s.length===1){const a=un(s[0],t);return a.schema&&(a.schema.nullable=r||a.schema.nullable),a}const o=new Set(["string","number","integer","boolean"]);return s.length>0&&i.length===0&&s.every(a=>a.type&&o.has(String(a.type)))?{schema:{...e,nullable:r},unsupportedPaths:[]}:null}const Ds={all:d`
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
  `},ma=[{key:"env",label:"Environment"},{key:"update",label:"Updates"},{key:"agents",label:"Agents"},{key:"auth",label:"Authentication"},{key:"channels",label:"Channels"},{key:"messages",label:"Messages"},{key:"commands",label:"Commands"},{key:"hooks",label:"Hooks"},{key:"skills",label:"Skills"},{key:"tools",label:"Tools"},{key:"gateway",label:"Gateway"},{key:"wizard",label:"Setup Wizard"}],va="__all__";function ya(e){return Ds[e]??Ds.default}function vv(e,t){const n=Cr[e];return n||{label:(t==null?void 0:t.title)??Ye(e),description:(t==null?void 0:t.description)??""}}function yv(e){const{key:t,schema:n,uiHints:i}=e;if(!n||_e(n)!=="object"||!n.properties)return[];const s=Object.entries(n.properties).map(([r,o])=>{const a=Ae([t,r],i),l=(a==null?void 0:a.label)??o.title??Ye(r),c=(a==null?void 0:a.help)??o.description??"",p=(a==null?void 0:a.order)??50;return{key:r,label:l,description:c,order:p}});return s.sort((r,o)=>r.order!==o.order?r.order-o.order:r.key.localeCompare(o.key)),s}function bv(e,t){if(!e||!t)return[];const n=[];function i(s,r,o){if(s===r)return;if(typeof s!=typeof r){n.push({path:o,from:s,to:r});return}if(typeof s!="object"||s===null||r===null){s!==r&&n.push({path:o,from:s,to:r});return}if(Array.isArray(s)&&Array.isArray(r)){JSON.stringify(s)!==JSON.stringify(r)&&n.push({path:o,from:s,to:r});return}const a=s,l=r,c=new Set([...Object.keys(a),...Object.keys(l)]);for(const p of c)i(a[p],l[p],o?`${o}.${p}`:p)}return i(e,t,""),n}function ba(e,t=40){let n;try{n=JSON.stringify(e)??String(e)}catch{n=String(e)}return n.length<=t?n:n.slice(0,t-3)+"..."}function wv(e){var h,A,C;const t=e.valid==null?"unknown":e.valid?"valid":"invalid",n=hv(e.schema),i=n.schema?n.unsupportedPaths.length>0:!1,s=((h=n.schema)==null?void 0:h.properties)??{},r=ma.filter(R=>R.key in s),o=new Set(ma.map(R=>R.key)),a=Object.keys(s).filter(R=>!o.has(R)).map(R=>({key:R,label:R.charAt(0).toUpperCase()+R.slice(1)})),l=[...r,...a],c=e.activeSection&&n.schema&&_e(n.schema)==="object"?(A=n.schema.properties)==null?void 0:A[e.activeSection]:void 0,p=e.activeSection?vv(e.activeSection,c):null,u=e.activeSection?yv({key:e.activeSection,schema:c,uiHints:e.uiHints}):[],f=e.formMode==="form"&&!!e.activeSection&&u.length>0,b=e.activeSubsection===va,x=e.searchQuery||b?null:e.activeSubsection??((C=u[0])==null?void 0:C.key)??null,k=e.formMode==="form"?bv(e.originalValue,e.formValue):[],S=e.formMode==="raw"&&e.raw!==e.originalRaw,E=e.formMode==="form"?k.length>0:S,M=!!e.formValue&&!e.loading&&!!n.schema,N=e.connected&&!e.saving&&E&&(e.formMode==="raw"?!0:M),I=e.connected&&!e.applying&&!e.updating&&E&&(e.formMode==="raw"?!0:M),_=e.connected&&!e.applying&&!e.updating;return d`
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
              `:w}
        </div>

        <!-- Section nav -->
        <nav class="config-nav">
          <button
            class="config-nav__item ${e.activeSection===null?"active":""}"
            @click=${()=>e.onSectionChange(null)}
          >
            <span class="config-nav__icon">${Ds.all}</span>
            <span class="config-nav__label">All Settings</span>
          </button>
          ${l.map(R=>d`
              <button
                class="config-nav__item ${e.activeSection===R.key?"active":""}"
                @click=${()=>e.onSectionChange(R.key)}
              >
                <span class="config-nav__icon"
                  >${ya(R.key)}</span
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
              ?disabled=${!N}
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
              ?disabled=${!_}
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
                            >${ba(R.from)}</span
                          >
                          <span class="config-diff__arrow">→</span>
                          <span class="config-diff__to"
                            >${ba(R.to)}</span
                          >
                        </div>
                      </div>
                    `)}
                </div>
              </details>
            `:w}
        ${p&&e.formMode==="form"?d`
              <div class="config-section-hero">
                <div class="config-section-hero__icon">
                  ${ya(e.activeSection??"")}
                </div>
                <div class="config-section-hero__text">
                  <div class="config-section-hero__title">
                    ${p.label}
                  </div>
                  ${p.description?d`<div class="config-section-hero__desc">
                        ${p.description}
                      </div>`:w}
                </div>
              </div>
            `:w}
        ${f?d`
              <div class="config-subnav">
                <button
                  class="config-subnav__item ${x===null?"active":""}"
                  @click=${()=>e.onSubsectionChange(va)}
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
            `:w}

        <!-- Form content -->
        <div class="config-content">
          ${e.formMode==="form"?d`
                ${e.schemaLoading?d`
                        <div class="config-loading">
                          <div class="config-loading__spinner"></div>
                          <span>Loading schema…</span>
                        </div>
                      `:pv({schema:n.schema,uiHints:e.uiHints,value:e.formValue,disabled:e.loading||!e.formValue,unsupportedPaths:n.unsupportedPaths,onPatch:e.onFormPatch,searchQuery:e.searchQuery,activeSection:e.activeSection,activeSubsection:x})}
                ${i?d`
                        <div class="callout danger" style="margin-top: 12px">
                          Form view can't safely edit some fields. Use Raw to avoid losing config entries.
                        </div>
                      `:w}
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
            </div>`:w}
      </main>
    </div>
  `}function $v(e){if(!e)return"-";try{return new Date(e).toLocaleString()}catch{return e??"-"}}function xv(e,t,n,i){const s=i==="asc"?1:-1;if(n==="created_at"){const r=e.created_at?new Date(e.created_at).getTime():0,o=t.created_at?new Date(t.created_at).getTime():0;return(r-o)*s}return n==="name"?(e.name??"").localeCompare(t.name??"")*s:(e.draft_no??"").localeCompare(t.draft_no??"")*s}function kv(e){const{loading:t,error:n,drafts:i,detail:s,detailId:r,confirmBusy:o,confirmResult:a,filterQuery:l,sortBy:c,sortDir:p,page:u,pageSize:f,onRefresh:b,onSelectDraft:x,onConfirm:k,onClearDetail:S,onFilterQueryChange:E,onSortByChange:M,onSortDirChange:N,onPageChange:I,onPageSizeChange:_}=e,h=l.trim().toLowerCase(),C=[...h?i.filter(B=>`${B.draft_no??""}
${B.name??""}
${B.source??""}`.toLowerCase().includes(h)):i].sort((B,ie)=>xv(B,ie,c,p)),R=C.length,H=Math.max(1,f||10),U=Math.max(1,Math.ceil(R/H)),j=Math.min(Math.max(1,u),U),K=(j-1)*H,Z=C.slice(K,K+H);return d`
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
              @change=${B=>M(B.target.value)}
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
              .value=${p}
              @change=${B=>N(B.target.value)}
              aria-label=${g("fulfill.sortDir")}
            >
              <option value="desc">${g("fulfill.sortDesc")}</option>
              <option value="asc">${g("fulfill.sortAsc")}</option>
            </select>
          </label>
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${g("fulfill.pageSize")}</span>
            <select
              .value=${String(H)}
              @change=${B=>_(Number(B.target.value)||10)}
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
          `:w}

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
                      ${Z.map(B=>d`
                          <tr style=${r===B.id?"background: var(--bg-secondary, #f5f5f5);":""}>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${B.draft_no}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${B.name}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${B.source??"-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${$v(B.created_at)}</td>
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
                                ?disabled=${o}
                                @click=${()=>k(B.id)}
                                aria-label=${g("fulfill.confirmAction")}
                              >
                                ${o&&r===B.id?g("fulfill.confirming"):g("fulfill.confirmAction")}
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
                    @click=${()=>I(j-1)}
                    aria-label=${g("common.prev")}
                  >
                    ${g("common.prev")}
                  </button>
                  <span class="muted" style="font-size: 12px;">${g("fulfill.page",{current:String(j),total:String(U)})}</span>
                  <button
                    class="btn btn-sm"
                    ?disabled=${j>=U}
                    @click=${()=>I(j+1)}
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
                  ?disabled=${o}
                  @click=${()=>k(s.id)}
                >
                  ${g(o?"fulfill.confirming":"fulfill.confirmAction")}
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
                    ${(s.lines??[]).map((B,ie)=>d`
                        <tr>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${ie+1}</td>
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
          `:w}

      ${a?d`
            <div class="card" style="grid-column: 1 / -1; border-color: var(--success, #2e7d32);" role="status" aria-live="polite">
              <div class="card-title" style="color: var(--success, #2e7d32);">${g("fulfill.confirmTitle")}</div>
              ${a.order_id?d`<p style="margin: 0 0 4px 0; font-weight: 600;">${g("fulfill.orderId")}: ${a.order_id}</p>`:w}
              <div class="card-sub">${a.message??""}</div>
            </div>
          `:w}
    </section>
  `}function Sv(e,t,n,i){const s=i==="asc"?1:-1;if(n==="uploaded_at"){const r=e.uploaded_at?new Date(e.uploaded_at).getTime():0,o=t.uploaded_at?new Date(t.uploaded_at).getTime():0;return(r-o)*s}return n==="shortfall"?(Number(e.shortfall??0)-Number(t.shortfall??0))*s:n==="count"?(Number(e.count??0)-Number(t.count??0))*s:(e.product_name??"").localeCompare(t.product_name??"")*s}function _v(e){const{loading:t,error:n,suggestions:i,selectedKeys:s,approvedKeys:r,approveBusy:o,approveResult:a,filterQuery:l,sortBy:c,sortDir:p,page:u,pageSize:f,onRefresh:b,onToggleSelect:x,onApprove:k,onApproveBatch:S,onFilterQueryChange:E,onSortByChange:M,onSortDirChange:N,onPageChange:I,onPageSizeChange:_}=e,h=i.filter(L=>!r.includes(Le(L))),A=l.trim().toLowerCase(),C=A?h.filter(L=>`${L.product_name??""}
${L.specification??""}
${L.code??""}
${L.product_key??""}`.toLowerCase().includes(A)):h,R=[...C].sort((L,se)=>Sv(L,se,c,p)),H=R.length,U=Math.max(1,f||10),j=Math.max(1,Math.ceil(H/U)),K=Math.min(Math.max(1,u),j),Z=(K-1)*U,B=R.slice(Z,Z+U),ie=C.filter(L=>s.includes(Le(L))).length,ve=C.length>0&&C.every(L=>s.includes(Le(L)));return d`
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
            @input=${L=>E(L.target.value)}
            aria-label=${g("procurement.filterPlaceholder")}
            style="min-width: 240px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border);"
          />
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${g("procurement.sortBy")}</span>
            <select
              .value=${c}
              @change=${L=>M(L.target.value)}
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
              .value=${p}
              @change=${L=>N(L.target.value)}
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
              @change=${L=>_(Number(L.target.value)||10)}
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
          `:w}

      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${g("procurement.listTitle")}</div>
        <div class="card-sub">${g("procurement.listHint")}</div>

        ${ie>0?d`
              <div style="margin-top: 12px;">
                <button
                  class="btn"
                  style="font-size: 12px;"
                  ?disabled=${o}
                  @click=${S}
                  aria-label=${g("procurement.batchApprove")}
                >
                  ${o?g("procurement.approving"):`${g("procurement.batchApprove")} (${ie})`}
                </button>
              </div>
            `:w}

        ${t&&i.length===0?d`<p class="muted" style="margin-top: 12px;">${g("procurement.loading")}</p>`:C.length===0?d`<p class="muted" style="margin-top: 12px;">${i.length===0?g("procurement.noSuggestions"):g("procurement.noPending")}</p>`:d`
                <div class="muted" style="font-size: 12px; margin-top: 10px;">
                  ${g("procurement.total",{total:String(H)})}
                </div>
                <div style="overflow-x: auto; margin-top: 8px;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <thead>
                      <tr style="background: var(--bg-secondary, #eee);">
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border); width: 36px;">
                          <input
                            type="checkbox"
                            .checked=${ve}
                            .indeterminate=${ie>0&&ie<C.length}
                            aria-label=${g("procurement.selectAll")}
                            @change=${()=>{ve?C.forEach(L=>x(Le(L))):C.forEach(L=>{const se=Le(L);s.includes(se)||x(se)})}}
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
                      ${B.map(L=>d`
                          <tr>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">
                              <input
                                type="checkbox"
                                .checked=${s.includes(Le(L))}
                                aria-label=${g("procurement.selectItem")}
                                @change=${()=>x(Le(L))}
                              />
                            </td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${L.product_name??"-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${L.specification??"-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${L.shortfall??0}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${L.code??"-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${L.count??0}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">
                              <button
                                class="btn"
                                style="font-size: 12px; padding: 4px 8px;"
                                ?disabled=${o}
                                @click=${()=>k(L)}
                                aria-label=${g("procurement.approveSingle")}
                              >
                                ${g(o?"procurement.approving":"procurement.approveSingle")}
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
                    aria-label=${g("common.prev")}
                  >
                    ${g("common.prev")}
                  </button>
                  <span class="muted" style="font-size: 12px;">${g("procurement.page",{current:String(K),total:String(j)})}</span>
                  <button
                    class="btn btn-sm"
                    ?disabled=${K>=j}
                    @click=${()=>I(K+1)}
                    aria-label=${g("common.next")}
                  >
                    ${g("common.next")}
                  </button>
                </div>
              `}
      </div>

      ${a?d`
            <div class="card" style="grid-column: 1 / -1;" role="status" aria-live="polite">
              <div class="card-sub">
                ${a.approved_count!=null?`${g("procurement.approvedCount",{count:String(a.approved_count)})} `:""}${a.message??""}
              </div>
            </div>
          `:w}

      <div class="card" style="grid-column: 1 / -1; margin-top: 16px;">
        <div class="card-title">${g("replenishment.title")}</div>
        <div class="card-sub">${g("replenishment.subtitle")}</div>
        <div style="margin-top: 12px;">
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
              <thead>
                <tr style="background: var(--bg-secondary, #eee);">
                  <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">
                    ${g("replenishment.productOrCodePlaceholder")}
                  </th>
                  <th style="padding: 6px 8px; text-align: right; border: 1px solid var(--border); width: 120px;">
                    ${g("replenishment.quantityPlaceholder")}
                  </th>
                  <th style="padding: 6px 8px; border: 1px solid var(--border); width: 60px;"></th>
                </tr>
              </thead>
              <tbody>
                ${e.replenishmentInputLines.map((L,se)=>d`
                    <tr>
                      <td style="padding: 6px 8px; border: 1px solid var(--border);">
                        <input
                          type="text"
                          .value=${L.product_or_code}
                          placeholder=${g("replenishment.productOrCodePlaceholder")}
                          @input=${re=>e.onReplenishmentLineChange(se,"product_or_code",re.target.value)}
                          style="width: 100%; padding: 6px 8px; border-radius: 4px; border: 1px solid var(--border);"
                          aria-label=${g("replenishment.productOrCodePlaceholder")}
                        />
                      </td>
                      <td style="padding: 6px 8px; border: 1px solid var(--border); text-align: right;">
                        <input
                          type="number"
                          min="1"
                          .value=${String(L.quantity||"")}
                          placeholder=${g("replenishment.quantityPlaceholder")}
                          @input=${re=>{const X=re.target.value,Ee=X===""?0:Number(X);e.onReplenishmentLineChange(se,"quantity",Number.isFinite(Ee)?Ee:0)}}
                          style="width: 80px; padding: 6px 8px; border-radius: 4px; border: 1px solid var(--border); text-align: right;"
                          aria-label=${g("replenishment.quantityPlaceholder")}
                        />
                      </td>
                      <td style="padding: 6px 8px; border: 1px solid var(--border);">
                        ${e.replenishmentInputLines.length>1?d`
                              <button
                                type="button"
                                class="btn btn-sm"
                                style="font-size: 12px; padding: 4px 8px;"
                                @click=${()=>e.onReplenishmentRemoveLine(se)}
                                aria-label=${g("replenishment.removeRow")}
                              >
                                ${g("replenishment.removeRow")}
                              </button>
                            `:w}
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
              aria-label=${g("replenishment.addRow")}
            >
              ${g("replenishment.addRow")}
            </button>
            <button
              class="btn"
              ?disabled=${e.replenishmentCreateBusy||e.replenishmentLoading}
              @click=${e.onCreateReplenishmentDraft}
              aria-label=${g("replenishment.generateDraft")}
            >
              ${e.replenishmentCreateBusy?g("replenishment.creating"):g("replenishment.generateDraft")}
            </button>
            <button
              class="btn"
              ?disabled=${e.replenishmentLoading}
              @click=${e.onReplenishmentRefresh}
              aria-label=${g("replenishment.refreshList")}
            >
              ${e.replenishmentLoading?g("replenishment.loading"):g("replenishment.refreshList")}
            </button>
          </div>
        </div>
      </div>

      ${e.replenishmentError?d`
            <div class="card" style="grid-column: 1 / -1; border-color: var(--danger, #c62828);" role="alert" aria-live="assertive">
              <div class="card-title" style="color: var(--danger, #c62828);">${g("common.errorTitle")}</div>
              <div class="card-sub">${e.replenishmentError}</div>
            </div>
          `:w}

      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${g("replenishment.listTitle")}</div>
        <div class="card-sub">${g("replenishment.listHint")}</div>

        ${e.replenishmentLoading&&e.replenishmentDrafts.length===0?d`<p class="muted" style="margin-top: 12px;">${g("replenishment.loading")}</p>`:e.replenishmentDrafts.length===0?d`<p class="muted" style="margin-top: 12px;">${g("replenishment.noDrafts")}</p>`:d`
                <div style="overflow-x: auto; margin-top: 8px;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <thead>
                      <tr style="background: var(--bg-secondary, #eee);">
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">
                          ${g("replenishment.colDraftNo")}
                        </th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">
                          ${g("replenishment.colName")}
                        </th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">
                          ${g("replenishment.colCreatedAt")}
                        </th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">
                          ${g("replenishment.colStatus")}
                        </th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">
                          ${g("replenishment.colActions")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      ${e.replenishmentDrafts.map(L=>d`
                          <tr>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${L.draft_no}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${L.name}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">
                              ${L.created_at?new Date(L.created_at).toLocaleString():"-"}
                            </td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${L.status}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">
                              <button
                                class="btn btn-sm"
                                style="font-size: 12px; padding: 4px 8px; margin-right: 6px;"
                                @click=${()=>e.onSelectReplenishmentDraft(L.id)}
                              >
                                ${g("replenishment.viewDetail")}
                              </button>
                              <button
                                class="btn btn-sm"
                                style="font-size: 12px; padding: 4px 8px;"
                                ?disabled=${e.replenishmentConfirmBusy||L.status==="confirmed"}
                                @click=${()=>e.onConfirmReplenishment(L.id)}
                              >
                                ${e.replenishmentConfirmBusy?g("replenishment.confirming"):g("replenishment.confirm")}
                              </button>
                              <button
                                class="btn btn-sm"
                                style="font-size: 12px; padding: 4px 8px; color: var(--danger, #c62828);"
                                @click=${()=>e.onDeleteReplenishmentDraft(L.id)}
                                aria-label=${g("replenishment.delete")}
                              >
                                ${g("replenishment.delete")}
                              </button>
                            </td>
                          </tr>
                        `)}
                    </tbody>
                  </table>
                </div>
              `}
      </div>

      ${e.replenishmentDetail&&e.replenishmentDetailId!=null?d`
            <div class="card" style="grid-column: 1 / -1;">
              <div class="card-title">
                ${g("replenishment.detailTitle",{no:e.replenishmentDetail.draft_no})}
              </div>
              <div class="card-sub">
                ${g("replenishment.detailSubtitle")}
              </div>
              <div style="overflow-x: auto; margin-top: 8px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                  <thead>
                    <tr style="background: var(--bg-secondary, #eee);">
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">
                        ${g("replenishment.colCode")}
                      </th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">
                        ${g("replenishment.colProduct")}
                      </th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">
                        ${g("replenishment.colSpec")}
                      </th>
                      <th style="padding: 6px 8px; text-align: right; border: 1px solid var(--border);">
                        ${g("replenishment.colCurrentQty")}
                      </th>
                      <th style="padding: 6px 8px; text-align: right; border: 1px solid var(--border);">
                        ${g("replenishment.colQuantity")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    ${e.replenishmentDetail.lines.map(L=>d`
                        <tr>
                          <td style="padding: 6px 8px; border: 1px solid var(--border);">${L.code??"-"}</td>
                          <td style="padding: 6px 8px; border: 1px solid var(--border);">${L.product_name??"-"}</td>
                          <td style="padding: 6px 8px; border: 1px solid var(--border);">${L.specification??"-"}</td>
                          <td style="padding: 6px 8px; text-align: right; border: 1px solid var(--border);">
                            ${L.current_qty??"-"}
                          </td>
                          <td style="padding: 6px 8px; text-align: right; border: 1px solid var(--border);">
                            ${L.quantity}
                          </td>
                        </tr>
                      `)}
                  </tbody>
                </table>
              </div>
              <div style="margin-top: 10px; display: flex; gap: 8px;">
                <button class="btn btn-sm" @click=${e.onClearReplenishmentDetail}>
                  ${g("common.close")}
                </button>
              </div>
            </div>
          `:w}

      ${e.replenishmentConfirmResult?d`
            <div class="card" style="grid-column: 1 / -1;" role="status" aria-live="polite">
              <div class="card-sub">${e.replenishmentConfirmResult.message??""}</div>
            </div>
          `:w}
    </section>
  `}function Av(e){const t=e.status&&typeof e.status=="object"?e.status.securityAudit:null,n=(t==null?void 0:t.summary)??null,i=(n==null?void 0:n.critical)??0,s=(n==null?void 0:n.warn)??0,r=(n==null?void 0:n.info)??0,o=i>0?"danger":s>0?"warn":"success",a=i>0?`${i} critical`:s>0?`${s} warnings`:"No critical issues";return d`
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
            ${n?d`<div class="callout ${o}" style="margin-top: 8px;">
                  Security audit: ${a}${r>0?` · ${r} info`:""}. Run
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
        ${e.callError?d`<div class="callout danger" style="margin-top: 12px;">
              ${e.callError}
            </div>`:w}
        ${e.callResult?d`<pre class="code-block" style="margin-top: 12px;">${e.callResult}</pre>`:w}
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
                      <pre class="code-block">${cg(l.payload)}</pre>
                    </div>
                  </div>
                `)}
            </div>
          `}
    </section>
  `}function Cv(e){const t=Math.max(0,e),n=Math.floor(t/1e3);if(n<60)return`${n}s`;const i=Math.floor(n/60);return i<60?`${i}m`:`${Math.floor(i/60)}h`}function pt(e,t){return t?d`<div class="exec-approval-meta-row"><span>${e}</span><span>${t}</span></div>`:w}function Tv(e){const t=e.execApprovalQueue[0];if(!t)return w;const n=t.request,i=t.expiresAtMs-Date.now(),s=i>0?`expires in ${Cv(i)}`:"expired",r=e.execApprovalQueue.length;return d`
    <div class="exec-approval-overlay" role="dialog" aria-live="polite">
      <div class="exec-approval-card">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">Exec approval needed</div>
            <div class="exec-approval-sub">${s}</div>
          </div>
          ${r>1?d`<div class="exec-approval-queue">${r} pending</div>`:w}
        </div>
        <div class="exec-approval-command mono">${n.command}</div>
        <div class="exec-approval-meta">
          ${pt("Host",n.host)}
          ${pt("Agent",n.agentId)}
          ${pt("Session",n.sessionKey)}
          ${pt("CWD",n.cwd)}
          ${pt("Resolved",n.resolvedPath)}
          ${pt("Security",n.security)}
          ${pt("Ask",n.ask)}
        </div>
        ${e.execApprovalError?d`<div class="exec-approval-error">${e.execApprovalError}</div>`:w}
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
  `}function Ev(e){const{pendingGatewayUrl:t}=e;return t?d`
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
  `:w}const wa=["trace","debug","info","warn","error","fatal"];function Rv(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleTimeString()}function Lv(e,t){return t?[e.message,e.subsystem,e.raw].filter(Boolean).join(" ").toLowerCase().includes(t):!0}function Iv(e){const t=e.filterText.trim().toLowerCase(),n=wa.some(r=>!e.levelFilters[r]),i=e.entries.filter(r=>r.level&&!e.levelFilters[r.level]?!1:Lv(r,t)),s=t||n?"filtered":"visible";return d`
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
            @click=${()=>e.onExport(i.map(r=>r.raw),s)}
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
            @input=${r=>e.onFilterTextChange(r.target.value)}
            placeholder="Search logs"
          />
        </label>
        <label class="field checkbox">
          <span>Auto-follow</span>
          <input
            type="checkbox"
            .checked=${e.autoFollow}
            @change=${r=>e.onToggleAutoFollow(r.target.checked)}
          />
        </label>
      </div>

      <div class="chip-row" style="margin-top: 12px;">
        ${wa.map(r=>d`
            <label class="chip log-chip ${r}">
              <input
                type="checkbox"
                .checked=${e.levelFilters[r]}
                @change=${o=>e.onLevelToggle(r,o.target.checked)}
              />
              <span>${r}</span>
            </label>
          `)}
      </div>

      ${e.file?d`<div class="muted" style="margin-top: 10px;">File: ${e.file}</div>`:w}
      ${e.truncated?d`
              <div class="callout" style="margin-top: 10px">Log output truncated; showing latest chunk.</div>
            `:w}
      ${e.error?d`<div class="callout danger" style="margin-top: 10px;">${e.error}</div>`:w}

      <div class="log-stream" style="margin-top: 12px;" @scroll=${e.onScroll}>
        ${i.length===0?d`
                <div class="muted" style="padding: 12px">No log entries.</div>
              `:i.map(r=>d`
                <div class="log-row">
                  <div class="log-time mono">${Rv(r.time)}</div>
                  <div class="log-level ${r.level??""}">${r.level??""}</div>
                  <div class="log-subsystem mono">${r.subsystem??""}</div>
                  <div class="log-message mono">${r.message??r.raw}</div>
                </div>
              `)}
      </div>
    </section>
  `}function Pv(e){return d`
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
      ${e.db==="sqlite"?d`<div class="callout" style="margin-top: 12px; background: var(--bg-muted, #f5f5f5); color: var(--text-muted, #666);">当前使用本地数据库</div>`:w}
      ${e.error?d`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:w}
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        ${e.stats?Dv(e.stats):e.loading?w:d`<div class="muted">暂无统计</div>`}
      </div>
      <div style="margin-top: 24px;">
        <div class="row" style="justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="card-title" style="font-size: 1rem;">无货产品列表</div>
          ${e.onOpenAddForm&&!e.showAddForm?d`<button class="btn btn--primary" ?disabled=${e.loading} @click=${e.onOpenAddForm}>手动新增</button>`:w}
        </div>
        ${e.showAddForm&&e.onAdd&&e.onCloseAddForm?d`
              <div class="callout" style="margin-bottom: 12px; padding: 12px;">
                <div style="font-weight: 600; margin-bottom: 8px;">新增无货记录</div>
                <form @submit=${async t=>{var r,o,a,l,c,p,u;t.preventDefault();const n=t.target,i=((o=(r=n.querySelector('[name="oos_add_name"]'))==null?void 0:r.value)==null?void 0:o.trim())??"";if(!i)return;await e.onAdd({product_name:i,specification:((l=(a=n.querySelector('[name="oos_add_spec"]'))==null?void 0:a.value)==null?void 0:l.trim())??"",quantity:parseFloat(((c=n.querySelector('[name="oos_add_qty"]'))==null?void 0:c.value)??"0")||0,unit:((u=(p=n.querySelector('[name="oos_add_unit"]'))==null?void 0:p.value)==null?void 0:u.trim())??""})&&e.onCloseAddForm()}}>
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
          ${e.list.length===0?d`<div class="muted">暂无无货产品记录。</div>`:e.list.slice(0,50).map(t=>Mv(t,e.onDelete))}
        </div>
        ${e.list.length>50?d`<div class="muted" style="margin-top: 8px;">共 ${e.list.length} 个无货产品，仅展示前 50 个</div>`:w}
      </div>
      <div class="row" style="margin-top: 24px; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">按文件</div>
          <div class="list" style="margin-top: 8px;">
            ${e.byFile.length===0?d`<div class="muted">暂无</div>`:e.byFile.slice(0,10).map(t=>Fv(t))}
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">按时间（最近 30 天）</div>
          <div class="list" style="margin-top: 8px;">
            ${e.byTime.length===0?d`<div class="muted">暂无</div>`:e.byTime.slice(0,10).map(t=>Nv(t))}
          </div>
        </div>
      </div>
    </section>
  `}function Dv(e){return[{label:"总记录数",value:e.total_records},{label:"无货产品数",value:e.out_of_stock_count},{label:"今日新增",value:e.today_count},{label:"被报无货≥2 次",value:e.notified_count},{label:"已发邮件产品数",value:e.email_sent_product_count}].map(n=>d`
      <div class="card stat-card" style="min-width: 100px;">
        <div class="stat-value">${n.value}</div>
        <div class="stat-label">${n.label}</div>
      </div>
    `)}function Mv(e,t){const n=e.product_name??"",i=e.specification??"",s=e.unit??"",r=e.quantity??"",o=e.count??1,l=(e.email_sent_count??0)>0||e.email_status==="sent"?"已发送":"未发",c=e.product_key??"";return d`
    <div class="list-item" style="display: flex; justify-content: space-between; align-items: center;">
      <div class="list-main">
        <div class="list-title">${n} ${i}</div>
        <div class="list-sub">数量: ${String(r)} ${s} · 被报无货 ${o} 次 · 邮件: ${l}</div>
      </div>
      ${t&&c?d`<button class="btn" style="flex-shrink: 0;" title="删除该无货产品" @click=${()=>t(c)}>删除</button>`:w}
    </div>
  `}function Fv(e){const t=e.file_name??"",n=e.total_records??0,i=e.uploaded_at?String(e.uploaded_at).length>19?String(e.uploaded_at).slice(0,10)+" "+String(e.uploaded_at).slice(11,19):String(e.uploaded_at):"";return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${t}</div>
        <div class="list-sub">记录数: ${n}${i?` · ${i}`:""}</div>
      </div>
    </div>
  `}function Nv(e){return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.date??""}</div>
        <div class="list-sub">新增: ${e.count??0}</div>
      </div>
    </div>
  `}function Ov(e){return d`
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
      ${e.db==="sqlite"?d`<div class="callout" style="margin-top: 12px; background: var(--bg-muted, #f5f5f5); color: var(--text-muted, #666);">当前使用本地数据库</div>`:w}
      ${e.error?d`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:w}
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        ${e.stats?Bv(e.stats):e.loading?w:d`<div class="muted">暂无统计</div>`}
      </div>
      <div style="margin-top: 24px;">
        <div class="row" style="justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="card-title" style="font-size: 1rem;">缺货产品列表</div>
          ${e.onOpenAddForm&&!e.showAddForm?d`<button class="btn btn--primary" ?disabled=${e.loading} @click=${e.onOpenAddForm}>手动新增</button>`:w}
        </div>
        ${e.showAddForm&&e.onAdd&&e.onCloseAddForm?d`
              <div class="callout" style="margin-bottom: 12px; padding: 12px;">
                <div style="font-weight: 600; margin-bottom: 8px;">新增缺货记录（产品名字、规格、需求、供给；差异自动计算）</div>
                <form @submit=${async t=>{var a,l,c,p,u,f;t.preventDefault();const n=t.target,i=((l=(a=n.querySelector('[name="shortage_add_name"]'))==null?void 0:a.value)==null?void 0:l.trim())??"";if(!i)return;const s=parseFloat(((c=n.querySelector('[name="shortage_add_qty"]'))==null?void 0:c.value)??"0")||0,r=parseFloat(((p=n.querySelector('[name="shortage_add_avail"]'))==null?void 0:p.value)??"0")||0;await e.onAdd({product_name:i,specification:((f=(u=n.querySelector('[name="shortage_add_spec"]'))==null?void 0:u.value)==null?void 0:f.trim())??"",quantity:s,available_qty:r})&&e.onCloseAddForm()}}>
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
          ${e.list.length===0?d`<div class="muted">暂无缺货产品记录。</div>`:e.list.slice(0,50).map(t=>Uv(t,e.onDelete))}
        </div>
        ${e.list.length>50?d`<div class="muted" style="margin-top: 8px;">共 ${e.list.length} 个缺货产品，仅展示前 50 个</div>`:w}
      </div>
      <div class="row" style="margin-top: 24px; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">按文件</div>
          <div class="list" style="margin-top: 8px;">
            ${e.byFile.length===0?d`<div class="muted">暂无</div>`:e.byFile.slice(0,10).map(t=>zv(t))}
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">按时间（最近 30 天）</div>
          <div class="list" style="margin-top: 8px;">
            ${e.byTime.length===0?d`<div class="muted">暂无</div>`:e.byTime.slice(0,10).map(t=>Hv(t))}
          </div>
        </div>
      </div>
    </section>
  `}function Bv(e){return[{label:"总记录数",value:e.total_records},{label:"缺货产品数",value:e.shortage_product_count},{label:"今日新增",value:e.today_count},{label:"被报缺货≥2 次",value:e.reported_ge2_count}].map(n=>d`
      <div class="card stat-card" style="min-width: 100px;">
        <div class="stat-value">${n.value}</div>
        <div class="stat-label">${n.label}</div>
      </div>
    `)}function Uv(e,t){const n=e.product_name??"",i=e.specification??"",s=e.quantity??0,r=e.available_qty??0,o=e.shortfall??0,a=e.count??1,l=e.product_key??"";return d`
    <div class="list-item" style="display: flex; justify-content: space-between; align-items: center;">
      <div class="list-main">
        <div class="list-title">${n} ${i?` · ${i}`:""}</div>
        <div class="list-sub">需求: ${s} · 供给: ${r} · 差异: ${o} · 被报缺货 ${a} 次</div>
      </div>
      ${t&&l?d`<button class="btn" style="flex-shrink: 0;" title="删除该缺货产品" @click=${()=>t(l)}>删除</button>`:w}
    </div>
  `}function zv(e){const t=e.file_name??"",n=e.total_records??0,i=e.uploaded_at?String(e.uploaded_at).length>19?String(e.uploaded_at).slice(0,10)+" "+String(e.uploaded_at).slice(11,19):String(e.uploaded_at):"";return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${t}</div>
        <div class="list-sub">记录数: ${n}${i?` · ${i}`:""}</div>
      </div>
    </div>
  `}function Hv(e){return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.date??""}</div>
        <div class="list-sub">新增: ${e.count??0}</div>
      </div>
    </div>
  `}const nt="__defaults__",$a=[{value:"deny",label:"Deny"},{value:"allowlist",label:"Allowlist"},{value:"full",label:"Full"}],jv=[{value:"off",label:"Off"},{value:"on-miss",label:"On miss"},{value:"always",label:"Always"}];function xa(e){return e==="allowlist"||e==="full"||e==="deny"?e:"deny"}function Kv(e){return e==="always"||e==="off"||e==="on-miss"?e:"on-miss"}function qv(e){const t=(e==null?void 0:e.defaults)??{};return{security:xa(t.security),ask:Kv(t.ask),askFallback:xa(t.askFallback??"deny"),autoAllowSkills:!!(t.autoAllowSkills??!1)}}function Wv(e){const t=(e==null?void 0:e.agents)??{},n=Array.isArray(t.list)?t.list:[],i=[];return n.forEach(s=>{if(!s||typeof s!="object")return;const r=s,o=typeof r.id=="string"?r.id.trim():"";if(!o)return;const a=typeof r.name=="string"?r.name.trim():void 0,l=r.default===!0;i.push({id:o,name:a||void 0,isDefault:l})}),i}function Gv(e,t){const n=Wv(e),i=Object.keys((t==null?void 0:t.agents)??{}),s=new Map;n.forEach(o=>s.set(o.id,o)),i.forEach(o=>{s.has(o)||s.set(o,{id:o})});const r=Array.from(s.values());return r.length===0&&r.push({id:"main",isDefault:!0}),r.sort((o,a)=>{var p,u;if(o.isDefault&&!a.isDefault)return-1;if(!o.isDefault&&a.isDefault)return 1;const l=(p=o.name)!=null&&p.trim()?o.name:o.id,c=(u=a.name)!=null&&u.trim()?a.name:a.id;return l.localeCompare(c)}),r}function Vv(e,t){return e===nt?nt:e&&t.some(n=>n.id===e)?e:nt}function Qv(e){var u;const t=e.execApprovalsForm??((u=e.execApprovalsSnapshot)==null?void 0:u.file)??null,n=!!t,i=qv(t),s=Gv(e.configForm,t),r=ny(e.nodes),o=e.execApprovalsTarget;let a=o==="node"&&e.execApprovalsTargetNodeId?e.execApprovalsTargetNodeId:null;o==="node"&&a&&!r.some(f=>f.id===a)&&(a=null);const l=Vv(e.execApprovalsSelectedAgent,s),c=l!==nt?((t==null?void 0:t.agents)??{})[l]??null:null,p=Array.isArray(c==null?void 0:c.allowlist)?c.allowlist??[]:[];return{ready:n,disabled:e.execApprovalsSaving||e.execApprovalsLoading,dirty:e.execApprovalsDirty,loading:e.execApprovalsLoading,saving:e.execApprovalsSaving,form:t,defaults:i,selectedScope:l,selectedAgent:c,agents:s,allowlist:p,target:o,targetNodeId:a,targetNodes:r,onSelectScope:e.onExecApprovalsSelectAgent,onSelectTarget:e.onExecApprovalsTargetChange,onPatch:e.onExecApprovalsPatch,onRemove:e.onExecApprovalsRemove,onLoad:e.onLoadExecApprovals,onSave:e.onSaveExecApprovals}}function Jv(e){const t=e.ready,n=e.target!=="node"||!!e.targetNodeId;return d`
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

      ${Yv(e)}

      ${t?d`
            ${Xv(e)}
            ${Zv(e)}
            ${e.selectedScope===nt?w:ey(e)}
          `:d`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load exec approvals to edit allowlists.</div>
            <button class="btn" ?disabled=${e.loading||!n} @click=${e.onLoad}>
              ${e.loading?"Loading…":"Load approvals"}
            </button>
          </div>`}
    </section>
  `}function Yv(e){const t=e.targetNodes.length>0,n=e.targetNodeId??"";return d`
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
              @change=${i=>{var o;if(i.target.value==="node"){const a=((o=e.targetNodes[0])==null?void 0:o.id)??null;e.onSelectTarget("node",n||a)}else e.onSelectTarget("gateway",null)}}
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
                    @change=${i=>{const r=i.target.value.trim();e.onSelectTarget("node",r||null)}}
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
              `:w}
        </div>
      </div>
      ${e.target==="node"&&!t?d`
              <div class="muted">No nodes advertise exec approvals yet.</div>
            `:w}
    </div>
  `}function Xv(e){return d`
    <div class="row" style="margin-top: 12px; gap: 8px; flex-wrap: wrap;">
      <span class="label">Scope</span>
      <div class="row" style="gap: 8px; flex-wrap: wrap;">
        <button
          class="btn btn--sm ${e.selectedScope===nt?"active":""}"
          @click=${()=>e.onSelectScope(nt)}
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
  `}function Zv(e){const t=e.selectedScope===nt,n=e.defaults,i=e.selectedAgent??{},s=t?["defaults"]:["agents",e.selectedScope],r=typeof i.security=="string"?i.security:void 0,o=typeof i.ask=="string"?i.ask:void 0,a=typeof i.askFallback=="string"?i.askFallback:void 0,l=t?n.security:r??"__default__",c=t?n.ask:o??"__default__",p=t?n.askFallback:a??"__default__",u=typeof i.autoAllowSkills=="boolean"?i.autoAllowSkills:void 0,f=u??n.autoAllowSkills,b=u==null;return d`
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
              ${t?w:d`<option value="__default__" ?selected=${l==="__default__"}>
                    Use default (${n.security})
                  </option>`}
              ${$a.map(x=>d`<option
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
              ${t?w:d`<option value="__default__" ?selected=${c==="__default__"}>
                    Use default (${n.ask})
                  </option>`}
              ${jv.map(x=>d`<option
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
              ${t?w:d`<option value="__default__" ?selected=${p==="__default__"}>
                    Use default (${n.askFallback})
                  </option>`}
              ${$a.map(x=>d`<option
                    value=${x.value}
                    ?selected=${p===x.value}
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
            ${t?"Allow skill executables listed by the Gateway.":b?`Using default (${n.autoAllowSkills?"on":"off"}).`:`Override (${f?"on":"off"}).`}
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>Enabled</span>
            <input
              type="checkbox"
              ?disabled=${e.disabled}
              .checked=${f}
              @change=${x=>{const k=x.target;e.onPatch([...s,"autoAllowSkills"],k.checked)}}
            />
          </label>
          ${!t&&!b?d`<button
                class="btn btn--sm"
                ?disabled=${e.disabled}
                @click=${()=>e.onRemove([...s,"autoAllowSkills"])}
              >
                Use default
              </button>`:w}
        </div>
      </div>
    </div>
  `}function ey(e){const t=["agents",e.selectedScope,"allowlist"],n=e.allowlist;return d`
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
            `:n.map((i,s)=>ty(e,i,s))}
    </div>
  `}function ty(e,t,n){var o;const i=t.lastUsedAt?_t(t.lastUsedAt):"never",s=t.lastUsedCommand?cs(t.lastUsedCommand,120):null,r=t.lastResolvedPath?cs(t.lastResolvedPath,120):null;return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${(o=t.pattern)!=null&&o.trim()?t.pattern:"New pattern"}</div>
        <div class="list-sub">Last used: ${i}</div>
        ${s?d`<div class="list-sub mono">${s}</div>`:w}
        ${r?d`<div class="list-sub mono">${r}</div>`:w}
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
  `}function ny(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(a=>String(a)==="system.execApprovals.get"||String(a)==="system.execApprovals.set"))continue;const r=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!r)continue;const o=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():r;t.push({id:r,label:o===r?r:`${o} · ${r}`})}return t.sort((n,i)=>n.label.localeCompare(i.label)),t}function iy(e){const t=ly(e),n=Qv(e);return d`
    ${Jv(n)}
    ${cy(t)}
    ${sy(e)}
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
              `:e.nodes.map(i=>fy(i))}
      </div>
    </section>
  `}function sy(e){const t=e.devicesList??{pending:[],paired:[]},n=Array.isArray(t.pending)?t.pending:[],i=Array.isArray(t.paired)?t.paired:[];return d`
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
      ${e.devicesError?d`<div class="callout danger" style="margin-top: 12px;">${e.devicesError}</div>`:w}
      <div class="list" style="margin-top: 16px;">
        ${n.length>0?d`
              <div class="muted" style="margin-bottom: 8px;">Pending</div>
              ${n.map(s=>ry(s,e))}
            `:w}
        ${i.length>0?d`
              <div class="muted" style="margin-top: 12px; margin-bottom: 8px;">Paired</div>
              ${i.map(s=>oy(s,e))}
            `:w}
        ${n.length===0&&i.length===0?d`
                <div class="muted">No paired devices.</div>
              `:w}
      </div>
    </section>
  `}function ry(e,t){var a,l;const n=((a=e.displayName)==null?void 0:a.trim())||e.deviceId,i=typeof e.ts=="number"?_t(e.ts):"n/a",s=(l=e.role)!=null&&l.trim()?`role: ${e.role}`:"role: -",r=e.isRepair?" · repair":"",o=e.remoteIp?` · ${e.remoteIp}`:"";return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${n}</div>
        <div class="list-sub">${e.deviceId}${o}</div>
        <div class="muted" style="margin-top: 6px;">
          ${s} · requested ${i}${r}
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
  `}function oy(e,t){var a;const n=((a=e.displayName)==null?void 0:a.trim())||e.deviceId,i=e.remoteIp?` · ${e.remoteIp}`:"",s=`roles: ${ls(e.roles)}`,r=`scopes: ${ls(e.scopes)}`,o=Array.isArray(e.tokens)?e.tokens:[];return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${n}</div>
        <div class="list-sub">${e.deviceId}${i}</div>
        <div class="muted" style="margin-top: 6px;">${s} · ${r}</div>
        ${o.length===0?d`
                <div class="muted" style="margin-top: 6px">Tokens: none</div>
              `:d`
              <div class="muted" style="margin-top: 10px;">Tokens</div>
              <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 6px;">
                ${o.map(l=>ay(e.deviceId,l,t))}
              </div>
            `}
      </div>
    </div>
  `}function ay(e,t,n){const i=t.revokedAtMs?"revoked":"active",s=`scopes: ${ls(t.scopes)}`,r=_t(t.rotatedAtMs??t.createdAtMs??t.lastUsedAtMs??null);return d`
    <div class="row" style="justify-content: space-between; gap: 8px;">
      <div class="list-sub">${t.role} · ${i} · ${s} · ${r}</div>
      <div class="row" style="justify-content: flex-end; gap: 6px; flex-wrap: wrap;">
        <button
          class="btn btn--sm"
          @click=${()=>n.onDeviceRotate(e,t.role,t.scopes)}
        >
          Rotate
        </button>
        ${t.revokedAtMs?w:d`
              <button
                class="btn btn--sm danger"
                @click=${()=>n.onDeviceRevoke(e,t.role)}
              >
                Revoke
              </button>
            `}
      </div>
    </div>
  `}function ly(e){const t=e.configForm,n=uy(e.nodes),{defaultBinding:i,agents:s}=py(t),r=!!t,o=e.configSaving||e.configFormMode==="raw";return{ready:r,disabled:o,configDirty:e.configDirty,configLoading:e.configLoading,configSaving:e.configSaving,defaultBinding:i,agents:s,nodes:n,onBindDefault:e.onBindDefault,onBindAgent:e.onBindAgent,onSave:e.onSaveBindings,onLoadConfig:e.onLoadConfig,formMode:e.configFormMode}}function cy(e){const t=e.nodes.length>0,n=e.defaultBinding??"";return d`
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
            `:w}

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
                      @change=${i=>{const r=i.target.value.trim();e.onBindDefault(r||null)}}
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
                  ${t?w:d`
                          <div class="muted">No nodes with system.run available.</div>
                        `}
                </div>
              </div>

              ${e.agents.length===0?d`
                      <div class="muted">No agents found.</div>
                    `:e.agents.map(i=>dy(i,e))}
            </div>
          `:d`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load config to edit bindings.</div>
            <button class="btn" ?disabled=${e.configLoading} @click=${e.onLoadConfig}>
              ${e.configLoading?"Loading…":"Load config"}
            </button>
          </div>`}
    </section>
  `}function dy(e,t){var r;const n=e.binding??"__default__",i=(r=e.name)!=null&&r.trim()?`${e.name} (${e.id})`:e.id,s=t.nodes.length>0;return d`
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
            @change=${o=>{const l=o.target.value.trim();t.onBindAgent(e.index,l==="__default__"?null:l)}}
          >
            <option value="__default__" ?selected=${n==="__default__"}>
              Use default
            </option>
            ${t.nodes.map(o=>d`<option
                  value=${o.id}
                  ?selected=${n===o.id}
                >
                  ${o.label}
                </option>`)}
          </select>
        </label>
      </div>
    </div>
  `}function uy(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(a=>String(a)==="system.run"))continue;const r=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!r)continue;const o=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():r;t.push({id:r,label:o===r?r:`${o} · ${r}`})}return t.sort((n,i)=>n.label.localeCompare(i.label)),t}function py(e){const t={id:"main",name:void 0,index:0,isDefault:!0,binding:null};if(!e||typeof e!="object")return{defaultBinding:null,agents:[t]};const i=(e.tools??{}).exec??{},s=typeof i.node=="string"&&i.node.trim()?i.node.trim():null,r=e.agents??{},o=Array.isArray(r.list)?r.list:[];if(o.length===0)return{defaultBinding:s,agents:[t]};const a=[];return o.forEach((l,c)=>{if(!l||typeof l!="object")return;const p=l,u=typeof p.id=="string"?p.id.trim():"";if(!u)return;const f=typeof p.name=="string"?p.name.trim():void 0,b=p.default===!0,k=(p.tools??{}).exec??{},S=typeof k.node=="string"&&k.node.trim()?k.node.trim():null;a.push({id:u,name:f||void 0,index:c,isDefault:b,binding:S})}),a.length===0&&a.push(t),{defaultBinding:s,agents:a}}function fy(e){const t=!!e.connected,n=!!e.paired,i=typeof e.displayName=="string"&&e.displayName.trim()||(typeof e.nodeId=="string"?e.nodeId:"unknown"),s=Array.isArray(e.caps)?e.caps:[],r=Array.isArray(e.commands)?e.commands:[];return d`
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
          ${s.slice(0,12).map(o=>d`<span class="chip">${String(o)}</span>`)}
          ${r.slice(0,8).map(o=>d`<span class="chip">${String(o)}</span>`)}
        </div>
      </div>
    </div>
  `}function gy(e){var c,p;const t=(c=e.hello)==null?void 0:c.snapshot,n=t!=null&&t.uptimeMs?ja(t.uptimeMs):g("common.na"),i=(p=t==null?void 0:t.policy)!=null&&p.tickIntervalMs?`${t.policy.tickIntervalMs}ms`:g("common.na"),r=(t==null?void 0:t.authMode)==="trusted-proxy",o=(()=>{if(e.connected||!e.lastError)return null;const u=e.lastError.toLowerCase();if(!(u.includes("unauthorized")||u.includes("connect failed")))return null;const b=!!e.settings.token.trim(),x=!!e.password.trim();return!b&&!x?d`
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
    `})(),a=(()=>{if(e.connected||!e.lastError||(typeof window<"u"?window.isSecureContext:!0))return null;const f=e.lastError.toLowerCase();return!f.includes("secure context")&&!f.includes("device identity required")?null:d`
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
    `})(),l=hn.getLocale();return d`
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
            ${g("overview.stats.cronNext",{time:Ul(e.cronNext)})}
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
              @input=${u=>{const f=u.target.value;e.onSettingsChange({...e.settings,gatewayUrl:f})}}
              placeholder="ws://100.x.y.z:18789"
            />
          </label>
          ${r?"":d`
                <label class="field">
                  <span>${g("overview.access.token")}</span>
                  <input
                    .value=${e.settings.token}
                    @input=${u=>{const f=u.target.value;e.onSettingsChange({...e.settings,token:f})}}
                    placeholder="JAGENT_GATEWAY_TOKEN"
                  />
                </label>
                <label class="field">
                  <span>${g("overview.access.password")}</span>
                  <input
                    type="password"
                    .value=${e.password}
                    @input=${u=>{const f=u.target.value;e.onPasswordChange(f)}}
                    placeholder="system or shared password"
                  />
                </label>
              `}
          <label class="field">
            <span>${g("overview.access.sessionKey")}</span>
            <input
              .value=${e.settings.sessionKey}
              @input=${u=>{const f=u.target.value;e.onSessionKeyChange(f)}}
            />
          </label>
          <label class="field">
            <span>${g("overview.access.language")}</span>
            <select
              .value=${l}
              @change=${u=>{const f=u.target.value;hn.setLocale(f),e.onSettingsChange({...e.settings,locale:f})}}
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
          <span class="muted">${g(r?"overview.access.trustedProxy":"overview.access.connectHint")}</span>
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
              ${e.lastChannelsRefresh?_t(e.lastChannelsRefresh):g("common.na")}
            </div>
          </div>
        </div>
        ${e.lastError?d`<div class="callout danger" style="margin-top: 14px;">
              <div>${e.lastError}</div>
              ${o??""}
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
  `}function hy(e){var r;const t=((r=e.report)==null?void 0:r.skills)??[],n=e.filter.trim().toLowerCase(),i=n?t.filter(o=>[o.name,o.description,o.source].join(" ").toLowerCase().includes(n)):t,s=jl(i);return d`
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
            @input=${o=>e.onFilterChange(o.target.value)}
            placeholder="Search skills"
          />
        </label>
        <div class="muted">${i.length} shown</div>
      </div>

      ${e.error?d`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:w}

      ${i.length===0?d`
              <div class="muted" style="margin-top: 16px">No skills found.</div>
            `:d`
            <div class="agent-skills-groups" style="margin-top: 16px;">
              ${s.map(o=>{const a=o.id==="workspace"||o.id==="built-in";return d`
                  <details class="agent-skills-group" ?open=${!a}>
                    <summary class="agent-skills-header">
                      <span>${o.label}</span>
                      <span class="muted">${o.skills.length}</span>
                    </summary>
                    <div class="list skills-grid">
                      ${o.skills.map(l=>my(l,e))}
                    </div>
                  </details>
                `})}
            </div>
          `}
    </section>
  `}function my(e,t){const n=t.busyKey===e.skillKey,i=t.edits[e.skillKey]??"",s=t.messages[e.skillKey]??null,r=e.install.length>0&&e.missing.bins.length>0,o=!!(e.bundled&&e.source!=="openclaw-bundled"),a=Kl(e),l=ql(e);return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">
          ${e.emoji?`${e.emoji} `:""}${e.name}
        </div>
        <div class="list-sub">${cs(e.description,140)}</div>
        ${Wl({skill:e,showBundledBadge:o})}
        ${a.length>0?d`
              <div class="muted" style="margin-top: 6px;">
                Missing: ${a.join(", ")}
              </div>
            `:w}
        ${l.length>0?d`
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
          ${r?d`<button
                class="btn"
                ?disabled=${n}
                @click=${()=>t.onInstall(e.skillKey,e.name,e.install[0].id)}
              >
                ${n?"Installing…":e.install[0].label}
              </button>`:w}
        </div>
        ${s?d`<div
              class="muted"
              style="margin-top: 8px; color: ${s.kind==="error"?"var(--danger-color, #d14343)":"var(--success-color, #0a7f5a)"};"
            >
              ${s.message}
            </div>`:w}
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
            `:w}
      </div>
    </div>
  `}const vy=/^data:/i,yy=/^https?:\/\//i;function by(e){var a,l;const t=((a=e.agentsList)==null?void 0:a.agents)??[],n=Oa(e.sessionKey),i=(n==null?void 0:n.agentId)??((l=e.agentsList)==null?void 0:l.defaultId)??"main",s=t.find(c=>c.id===i),r=s==null?void 0:s.identity,o=(r==null?void 0:r.avatarUrl)??(r==null?void 0:r.avatar);if(o)return vy.test(o)||yy.test(o)?o:r==null?void 0:r.avatarUrl}function wy(e){var b,x,k,S,E,M,N,I,_;const t=e.presenceEntries.length,n=((b=e.sessionsResult)==null?void 0:b.count)??null,i=((x=e.cronStatus)==null?void 0:x.nextWakeAtMs)??null,s=e.connected?null:g("chat.disconnected"),r=e.tab==="chat",o=r&&(e.settings.chatFocusMode||e.onboarding),a=e.onboarding?!1:e.settings.chatShowThinking,l=by(e),c=e.chatAvatarUrl??l??null,p=e.configForm??((k=e.configSnapshot)==null?void 0:k.config),u=Ht(e.basePath??""),f=e.agentsSelectedId??((S=e.agentsList)==null?void 0:S.defaultId)??((N=(M=(E=e.agentsList)==null?void 0:E.agents)==null?void 0:M[0])==null?void 0:N.id)??null;return d`
    <div class="shell ${r?"shell--chat":""} ${o?"shell--chat-focus":""} ${e.settings.navCollapsed?"shell--nav-collapsed":""} ${e.onboarding?"shell--onboarding":""}">
      <header class="topbar">
        <div class="topbar-left">
          <button
            class="nav-collapse-toggle"
            @click=${()=>e.applySettings({...e.settings,navCollapsed:!e.settings.navCollapsed})}
            title="${e.settings.navCollapsed?g("nav.expand"):g("nav.collapse")}"
            aria-label="${e.settings.navCollapsed?g("nav.expand"):g("nav.collapse")}"
          >
            <span class="nav-collapse-toggle__icon">${ue.menu}</span>
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
          ${ig(e)}
        </div>
      </header>
      <aside class="nav ${e.settings.navCollapsed?"nav--collapsed":""}">
        ${np.map(h=>{const A=e.settings.navGroupsCollapsed[h.label]??!1,C=h.tabs.some(R=>R===e.tab);return d`
            <div class="nav-group ${A&&!C?"nav-group--collapsed":""}">
              <button
                class="nav-label"
                @click=${()=>{const R={...e.settings.navGroupsCollapsed};R[h.label]=!A,e.applySettings({...e.settings,navGroupsCollapsed:R})}}
                aria-expanded=${!A}
              >
                <span class="nav-label__text">${g(`nav.${h.label}`)}</span>
                <span class="nav-label__chevron">${A?"+":"−"}</span>
              </button>
              <div class="nav-group__items">
                ${h.tabs.map(R=>Jf(e,R))}
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
              <span class="nav-item__icon" aria-hidden="true">${ue.book}</span>
              <span class="nav-item__text">${g("common.docs")}</span>
            </a>
          </div>
        </div>
      </aside>
      <main class="content ${r?"content--chat":""}">
        <section class="content-header">
          <div>
            ${e.tab==="work"?w:d`<div class="page-title">${gs(e.tab)}</div>`}
            ${e.tab==="work"?w:d`<div class="page-sub">${rp(e.tab)}</div>`}
          </div>
          <div class="page-meta">
            ${e.lastError?d`<div class="pill danger">${e.lastError}</div>`:w}
            ${r?Yf(e):w}
          </div>
        </section>

        ${e.tab==="overview"?gy({connected:e.connected,hello:e.hello,settings:e.settings,password:e.password,lastError:e.lastError,presenceCount:t,sessionsCount:n,cronEnabled:((I=e.cronStatus)==null?void 0:I.enabled)??null,cronNext:i,lastChannelsRefresh:e.channelsLastSuccess,oosStats:e.overviewOosStats,shortageStats:e.overviewShortageStats,onSettingsChange:h=>e.applySettings(h),onPasswordChange:h=>e.password=h,onSessionKeyChange:h=>{e.sessionKey=h,e.chatMessage="",e.resetToolStream(),e.applySettings({...e.settings,sessionKey:h,lastActiveSessionKey:h}),e.loadAssistantIdentity()},onConnect:()=>e.connect(),onRefresh:()=>e.loadOverview()}):w}

        ${e.tab==="channels"?jg({loading:e.bkLoading,saving:e.bkSaving,error:e.bkError,content:e.bkContent,lastSuccessAt:e.bkLastSuccess,dependentFiles:e.bkDependentFiles,onReload:()=>Ha(e),onSave:h=>Ud(e,h),onContentChange:h=>e.bkContent=h}):w}

        ${e.tab==="instances"?d`
                ${Pv({loading:e.oosLoading,error:e.oosError,stats:e.oosStats,list:e.oosList,byFile:e.oosByFile,byTime:e.oosByTime,db:e.oosDb??void 0,onRefresh:()=>gi(e),onDelete:h=>qu(e,h),showAddForm:e.oosShowAddForm,onOpenAddForm:()=>e.oosShowAddForm=!0,onCloseAddForm:()=>e.oosShowAddForm=!1,onAdd:async h=>{const A=await Wu(e,h);return A&&(e.oosShowAddForm=!1),A}})}
                ${Ov({loading:e.shortageLoading,error:e.shortageError,stats:e.shortageStats,list:e.shortageList,byFile:e.shortageByFile,byTime:e.shortageByTime,db:e.shortageDb??void 0,onRefresh:()=>hi(e),onDelete:h=>Vu(e,h),showAddForm:e.shortageShowAddForm,onOpenAddForm:()=>e.shortageShowAddForm=!0,onCloseAddForm:()=>e.shortageShowAddForm=!1,onAdd:async h=>{const A=await Qu(e,h);return A&&(e.shortageShowAddForm=!1),A}})}
              `:w}

        ${e.tab==="sessions"?_v({basePath:e.basePath,loading:e.procurementLoading,error:e.procurementError,suggestions:e.procurementSuggestions,selectedKeys:e.procurementSelectedKeys,approvedKeys:e.procurementApprovedKeys,approveBusy:e.procurementApproveBusy,approveResult:e.procurementApproveResult,filterQuery:e.procurementFilterQuery,sortBy:e.procurementSortBy,sortDir:e.procurementSortDir,page:e.procurementPage,pageSize:e.procurementPageSize,replenishmentDrafts:e.replenishmentDrafts,replenishmentDetail:e.replenishmentDetail,replenishmentDetailId:e.replenishmentDetailId,replenishmentLoading:e.replenishmentLoading,replenishmentError:e.replenishmentError,replenishmentConfirmBusy:e.replenishmentConfirmBusy,replenishmentConfirmResult:e.replenishmentConfirmResult,replenishmentInputLines:e.replenishmentInputLines,replenishmentCreateBusy:e.replenishmentCreateBusy,onReplenishmentLineChange:(h,A,C)=>e.onReplenishmentLineChange(h,A,C),onReplenishmentAddLine:()=>e.onReplenishmentAddLine(),onReplenishmentRemoveLine:h=>e.onReplenishmentRemoveLine(h),onCreateReplenishmentDraft:()=>e.createProcurementReplenishmentDraft(),onReplenishmentRefresh:()=>e.loadProcurementReplenishment(),onSelectReplenishmentDraft:h=>{e.loadProcurementReplenishmentDetail(h)},onConfirmReplenishment:h=>{typeof window<"u"&&!window.confirm(g("replenishment.confirmPrompt"))||e.confirmProcurementReplenishment(h)},onDeleteReplenishmentDraft:h=>{typeof window<"u"&&!window.confirm(g("replenishment.deleteConfirm"))||e.deleteProcurementReplenishmentDraft(h)},onClearReplenishmentDetail:()=>{e.replenishmentDetail=null,e.replenishmentDetailId=null},onRefresh:()=>(e.procurementPage=1,e.loadProcurementSuggestions()),onToggleSelect:h=>{e.procurementSelectedKeys.includes(h)?e.procurementSelectedKeys=e.procurementSelectedKeys.filter(A=>A!==h):e.procurementSelectedKeys=[...e.procurementSelectedKeys,h]},onApprove:h=>{if(typeof window<"u"&&!window.confirm(g("procurement.approveConfirm")))return;const A=[{product_key:h.product_key,product_name:h.product_name,specification:h.specification,shortfall:h.shortfall,code:h.code}];po(e,A).then(C=>{C&&(C.approved_count??0)>0&&(e.procurementApprovedKeys=[...e.procurementApprovedKeys,Le(h)])})},onApproveBatch:()=>{const h=e.procurementSuggestions.filter(C=>e.procurementSelectedKeys.includes(Le(C)));if(h.length===0||typeof window<"u"&&!window.confirm(g("procurement.approveBatchConfirm",{count:String(h.length)})))return;const A=h.map(C=>({product_key:C.product_key,product_name:C.product_name,specification:C.specification,shortfall:C.shortfall,code:C.code}));po(e,A).then(C=>{if(C&&(C.approved_count??0)>0){const R=h.map(H=>Le(H));e.procurementApprovedKeys=[...e.procurementApprovedKeys,...R],e.procurementSelectedKeys=e.procurementSelectedKeys.filter(H=>!R.includes(H))}})},onFilterQueryChange:h=>{e.procurementFilterQuery=h,e.procurementPage=1},onSortByChange:h=>{e.procurementSortBy=h,e.procurementPage=1},onSortDirChange:h=>{e.procurementSortDir=h,e.procurementPage=1},onPageChange:h=>{e.procurementPage=Math.max(1,h)},onPageSizeChange:h=>{e.procurementPageSize=Math.max(1,h),e.procurementPage=1}}):w}

        ${Hf(e)}

        ${e.tab==="cron"?kv({basePath:e.basePath,loading:e.fulfillDraftsLoading,error:e.fulfillDraftsError,drafts:e.fulfillDrafts,detail:e.fulfillDetail,detailId:e.fulfillDetailId,confirmBusy:e.fulfillConfirmBusy,confirmResult:e.fulfillConfirmResult,filterQuery:e.fulfillFilterQuery,sortBy:e.fulfillSortBy,sortDir:e.fulfillSortDir,page:e.fulfillPage,pageSize:e.fulfillPageSize,onRefresh:()=>(e.fulfillPage=1,e.loadFulfillDrafts()),onSelectDraft:h=>Qd(e,h),onConfirm:h=>{var U;const A=e.fulfillDetailId===h?e.fulfillDetail:null,C=((U=A==null?void 0:A.lines)==null?void 0:U.length)??0,R=((A==null?void 0:A.lines)??[]).reduce((j,K)=>j+Number(K.amount??0),0),H=C>0?g("fulfill.confirmPrompt",{count:String(C),amount:R.toFixed(2)}):g("fulfill.confirmPromptSimple");typeof window<"u"&&window.confirm(H)&&Jd(e,h).then(j=>{j!=null&&j.order_id&&e.loadProcurementSuggestions()})},onClearDetail:()=>{e.fulfillDetail=null,e.fulfillDetailId=null,e.fulfillConfirmResult=null},onFilterQueryChange:h=>{e.fulfillFilterQuery=h,e.fulfillPage=1},onSortByChange:h=>{e.fulfillSortBy=h,e.fulfillPage=1},onSortDirChange:h=>{e.fulfillSortDir=h,e.fulfillPage=1},onPageChange:h=>{e.fulfillPage=Math.max(1,h)},onPageSizeChange:h=>{e.fulfillPageSize=Math.max(1,h),e.fulfillPage=1}}):w}

        ${e.tab==="agents"?Bg({loading:e.agentsLoading,error:e.agentsError,agentsList:e.agentsList,selectedAgentId:f,activePanel:e.agentsPanel,configForm:p,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,channelsLoading:e.channelsLoading,channelsError:e.channelsError,channelsSnapshot:e.channelsSnapshot,channelsLastSuccess:e.channelsLastSuccess,cronLoading:e.cronLoading,cronStatus:e.cronStatus,cronJobs:e.cronJobs,cronError:e.cronError,agentFilesLoading:e.agentFilesLoading,agentFilesError:e.agentFilesError,agentFilesList:e.agentFilesList,agentFileActive:e.agentFileActive,agentFileContents:e.agentFileContents,agentFileDrafts:e.agentFileDrafts,agentFileSaving:e.agentFileSaving,agentIdentityLoading:e.agentIdentityLoading,agentIdentityError:e.agentIdentityError,agentIdentityById:e.agentIdentityById,agentSkillsLoading:e.agentSkillsLoading,agentSkillsReport:e.agentSkillsReport,agentSkillsError:e.agentSkillsError,agentSkillsAgentId:e.agentSkillsAgentId,skillsFilter:e.skillsFilter,onRefresh:async()=>{var A,C;await Ws(e);const h=((C=(A=e.agentsList)==null?void 0:A.agents)==null?void 0:C.map(R=>R.id))??[];h.length>0&&za(e,h)},onSelectAgent:h=>{e.agentsSelectedId!==h&&(e.agentsSelectedId=h,e.agentFilesList=null,e.agentFilesError=null,e.agentFilesLoading=!1,e.agentFileActive=null,e.agentFileContents={},e.agentFileDrafts={},e.agentSkillsReport=null,e.agentSkillsError=null,e.agentSkillsAgentId=null,Ua(e,h),e.agentsPanel==="files"&&Yi(e,h),e.agentsPanel==="skills"&&Wn(e,h))},onSelectPanel:h=>{var A;e.agentsPanel=h,h==="files"&&f&&((A=e.agentFilesList)==null?void 0:A.agentId)!==f&&(e.agentFilesList=null,e.agentFilesError=null,e.agentFileActive=null,e.agentFileContents={},e.agentFileDrafts={},Yi(e,f)),h==="skills"&&f&&Wn(e,f),h==="channels"&&Ce(e,!1),h==="cron"&&e.loadCron()},onLoadFiles:h=>Yi(e,h),onSelectFile:h=>{e.agentFileActive=h,f&&ag(e,f,h)},onFileDraftChange:(h,A)=>{e.agentFileDrafts={...e.agentFileDrafts,[h]:A}},onFileReset:h=>{const A=e.agentFileContents[h]??"";e.agentFileDrafts={...e.agentFileDrafts,[h]:A}},onFileSave:h=>{if(!f)return;const A=e.agentFileDrafts[h]??e.agentFileContents[h]??"";lg(e,f,h,A)},onToolsProfileChange:(h,A,C)=>{var j;if(!p)return;const R=(j=p.agents)==null?void 0:j.list;if(!Array.isArray(R))return;const H=R.findIndex(K=>K&&typeof K=="object"&&"id"in K&&K.id===h);if(H<0)return;const U=["agents","list",H,"tools"];A?Se(e,[...U,"profile"],A):Ve(e,[...U,"profile"]),C&&Ve(e,[...U,"allow"])},onToolsOverridesChange:(h,A,C)=>{var j;if(!p)return;const R=(j=p.agents)==null?void 0:j.list;if(!Array.isArray(R))return;const H=R.findIndex(K=>K&&typeof K=="object"&&"id"in K&&K.id===h);if(H<0)return;const U=["agents","list",H,"tools"];A.length>0?Se(e,[...U,"alsoAllow"],A):Ve(e,[...U,"alsoAllow"]),C.length>0?Se(e,[...U,"deny"],C):Ve(e,[...U,"deny"])},onConfigReload:()=>He(e),onConfigSave:()=>qn(e),onChannelsRefresh:()=>Ce(e,!1),onCronRefresh:()=>e.loadCron(),onSkillsFilterChange:h=>e.skillsFilter=h,onSkillsRefresh:()=>{f&&Wn(e,f)},onAgentSkillToggle:(h,A,C)=>{var ve,L,se;if(!p)return;const R=(ve=p.agents)==null?void 0:ve.list;if(!Array.isArray(R))return;const H=R.findIndex(re=>re&&typeof re=="object"&&"id"in re&&re.id===h);if(H<0)return;const U=R[H],j=A.trim();if(!j)return;const K=((se=(L=e.agentSkillsReport)==null?void 0:L.skills)==null?void 0:se.map(re=>re.name).filter(Boolean))??[],B=(Array.isArray(U.skills)?U.skills.map(re=>String(re).trim()).filter(Boolean):void 0)??K,ie=new Set(B);C?ie.add(j):ie.delete(j),Se(e,["agents","list",H,"skills"],[...ie])},onAgentSkillsClear:h=>{var R;if(!p)return;const A=(R=p.agents)==null?void 0:R.list;if(!Array.isArray(A))return;const C=A.findIndex(H=>H&&typeof H=="object"&&"id"in H&&H.id===h);C<0||Ve(e,["agents","list",C,"skills"])},onAgentSkillsDisableAll:h=>{var R;if(!p)return;const A=(R=p.agents)==null?void 0:R.list;if(!Array.isArray(A))return;const C=A.findIndex(H=>H&&typeof H=="object"&&"id"in H&&H.id===h);C<0||Se(e,["agents","list",C,"skills"],[])},onModelChange:(h,A)=>{var K;if(!p)return;const C=(K=p.agents)==null?void 0:K.list;if(!Array.isArray(C))return;const R=C.findIndex(Z=>Z&&typeof Z=="object"&&"id"in Z&&Z.id===h);if(R<0)return;const H=["agents","list",R,"model"];if(!A){Ve(e,H);return}const U=C[R],j=U==null?void 0:U.model;if(j&&typeof j=="object"&&!Array.isArray(j)){const Z=j.fallbacks,B={primary:A,...Array.isArray(Z)?{fallbacks:Z}:{}};Se(e,H,B)}else Se(e,H,A)},onModelFallbacksChange:(h,A)=>{var ve;if(!p)return;const C=(ve=p.agents)==null?void 0:ve.list;if(!Array.isArray(C))return;const R=C.findIndex(L=>L&&typeof L=="object"&&"id"in L&&L.id===h);if(R<0)return;const H=["agents","list",R,"model"],U=C[R],j=A.map(L=>L.trim()).filter(Boolean),K=U.model,B=(()=>{if(typeof K=="string")return K.trim()||null;if(K&&typeof K=="object"&&!Array.isArray(K)){const L=K.primary;if(typeof L=="string")return L.trim()||null}return null})();if(j.length===0){B?Se(e,H,B):Ve(e,H);return}Se(e,H,B?{primary:B,fallbacks:j}:{fallbacks:j})}}):w}

        ${e.tab==="skills"?hy({loading:e.skillsLoading,report:e.skillsReport,error:e.skillsError,filter:e.skillsFilter,edits:e.skillEdits,messages:e.skillMessages,busyKey:e.skillsBusyKey,onFilterChange:h=>e.skillsFilter=h,onRefresh:()=>kn(e,{clearMessages:!0}),onToggle:(h,A)=>Zu(e,h,A),onEdit:(h,A)=>Xu(e,h,A),onSaveKey:h=>ep(e,h),onInstall:(h,A,C)=>tp(e,h,A,C)}):w}

        ${e.tab==="nodes"?iy({loading:e.nodesLoading,nodes:e.nodes,devicesLoading:e.devicesLoading,devicesError:e.devicesError,devicesList:e.devicesList,configForm:e.configForm??((_=e.configSnapshot)==null?void 0:_.config),configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,configFormMode:e.configFormMode,execApprovalsLoading:e.execApprovalsLoading,execApprovalsSaving:e.execApprovalsSaving,execApprovalsDirty:e.execApprovalsDirty,execApprovalsSnapshot:e.execApprovalsSnapshot,execApprovalsForm:e.execApprovalsForm,execApprovalsSelectedAgent:e.execApprovalsSelectedAgent,execApprovalsTarget:e.execApprovalsTarget,execApprovalsTargetNodeId:e.execApprovalsTargetNodeId,onRefresh:()=>ui(e),onDevicesRefresh:()=>at(e),onDeviceApprove:h=>Mu(e,h),onDeviceReject:h=>Fu(e,h),onDeviceRotate:(h,A,C)=>Nu(e,{deviceId:h,role:A,scopes:C}),onDeviceRevoke:(h,A)=>Ou(e,{deviceId:h,role:A}),onLoadConfig:()=>He(e),onLoadExecApprovals:()=>{const h=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return ir(e,h)},onBindDefault:h=>{h?Se(e,["tools","exec","node"],h):Ve(e,["tools","exec","node"])},onBindAgent:(h,A)=>{const C=["agents","list",h,"tools","exec","node"];A?Se(e,C,A):Ve(e,C)},onSaveBindings:()=>qn(e),onExecApprovalsTargetChange:(h,A)=>{e.execApprovalsTarget=h,e.execApprovalsTargetNodeId=A,e.execApprovalsSnapshot=null,e.execApprovalsForm=null,e.execApprovalsDirty=!1,e.execApprovalsSelectedAgent=null},onExecApprovalsSelectAgent:h=>{e.execApprovalsSelectedAgent=h},onExecApprovalsPatch:(h,A)=>ju(e,h,A),onExecApprovalsRemove:h=>Ku(e,h),onSaveExecApprovals:()=>{const h=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return Hu(e,h)}}):w}

        ${e.tab==="chat"?tv({sessionKey:e.sessionKey,onSessionKeyChange:h=>{e.sessionKey=h,e.chatMessage="",e.chatAttachments=[],e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.chatQueue=[],e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:h,lastActiveSessionKey:h}),e.loadAssistantIdentity(),bn(e),vs(e)},thinkingLevel:e.chatThinkingLevel,showThinking:a,loading:e.chatLoading,sending:e.chatSending,compactionStatus:e.compactionStatus,assistantAvatarUrl:c,messages:e.chatMessages,toolMessages:e.chatToolMessages,stream:e.chatStream,streamStartedAt:e.chatStreamStartedAt,draft:e.chatMessage,queue:e.chatQueue,connected:e.connected,canSend:e.connected,disabledReason:s,error:e.lastError,sessions:e.sessionsResult,focusMode:o,onRefresh:()=>(e.resetToolStream(),Promise.all([bn(e),vs(e)])),onToggleFocusMode:()=>{e.onboarding||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})},onChatScroll:h=>e.handleChatScroll(h),onDraftChange:h=>e.chatMessage=h,attachments:e.chatAttachments,onAttachmentsChange:h=>e.chatAttachments=h,uploadedFile:e.chatUploadedFile,onFileSelect:h=>e.handleUploadChatFile(h),onClearUploadedFile:()=>e.clearChatUploadedFile(),composeDragOver:e.chatComposeDragOver,onComposeDragOver:()=>e.setChatComposeDragOver(!0),onComposeDragLeave:()=>e.setChatComposeDragOver(!1),onComposeDrop:h=>e.handleComposeDrop(h),onSend:()=>e.handleSendChat(),canAbort:!!e.chatRunId,onAbort:()=>void e.handleAbortChat(),onQueueRemove:h=>e.removeQueuedMessage(h),onNewSession:()=>e.handleSendChat("/new",{restoreDraft:!0}),showNewMessages:e.chatNewMessagesBelow&&!e.chatManualRefreshInFlight,onScrollToBottom:()=>e.scrollToBottom(),sidebarOpen:e.sidebarOpen,sidebarContent:e.sidebarContent,sidebarError:e.sidebarError,splitRatio:e.splitRatio,onOpenSidebar:h=>e.handleOpenSidebar(h),onCloseSidebar:()=>e.handleCloseSidebar(),onSplitRatioChange:h=>e.handleSplitRatioChange(h),assistantName:e.assistantName,assistantAvatar:e.assistantAvatar}):w}

        ${e.tab==="config"?wv({raw:e.configRaw,originalRaw:e.configRawOriginal,valid:e.configValid,issues:e.configIssues,loading:e.configLoading,saving:e.configSaving,applying:e.configApplying,updating:e.updateRunning,connected:e.connected,schema:e.configSchema,schemaLoading:e.configSchemaLoading,uiHints:e.configUiHints,formMode:e.configFormMode,formValue:e.configForm,originalValue:e.configFormOriginal,searchQuery:e.configSearchQuery,activeSection:e.configActiveSection,activeSubsection:e.configActiveSubsection,onRawChange:h=>{e.configRaw=h},onFormModeChange:h=>e.configFormMode=h,onFormPatch:(h,A)=>Se(e,h,A),onSearchChange:h=>e.configSearchQuery=h,onSectionChange:h=>{e.configActiveSection=h,e.configActiveSubsection=null},onSubsectionChange:h=>e.configActiveSubsection=h,onReload:()=>He(e),onSave:()=>qn(e),onApply:()=>ud(e),onUpdate:()=>pd(e)}):w}

        ${e.tab==="debug"?Av({loading:e.debugLoading,status:e.debugStatus,health:e.debugHealth,models:e.debugModels,heartbeat:e.debugHeartbeat,eventLog:e.eventLog,callMethod:e.debugCallMethod,callParams:e.debugCallParams,callResult:e.debugCallResult,callError:e.debugCallError,onCallMethodChange:h=>e.debugCallMethod=h,onCallParamsChange:h=>e.debugCallParams=h,onRefresh:()=>di(e),onCall:()=>Ld(e)}):w}

        ${e.tab==="logs"?Iv({loading:e.logsLoading,error:e.logsError,file:e.logsFile,entries:e.logsEntries,filterText:e.logsFilterText,levelFilters:e.logsLevelFilters,autoFollow:e.logsAutoFollow,truncated:e.logsTruncated,onFilterTextChange:h=>e.logsFilterText=h,onLevelToggle:(h,A)=>{e.logsLevelFilters={...e.logsLevelFilters,[h]:A}},onToggleAutoFollow:h=>e.logsAutoFollow=h,onRefresh:()=>zs(e,{reset:!0}),onExport:(h,A)=>e.exportLogs(h,A),onScroll:h=>e.handleLogsScroll(h)}):w}
      </main>
      ${Tv(e)}
      ${Ev(e)}
    </div>
  `}var $y=Object.defineProperty,xy=Object.getOwnPropertyDescriptor,v=(e,t,n,i)=>{for(var s=i>1?void 0:i?xy(t,n):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(s=(i?o(t,n,s):o(s))||s);return i&&s&&$y(t,n,s),s};const os=cr({});function ky(){if(!window.location.search)return!1;const t=new URLSearchParams(window.location.search).get("onboarding");if(!t)return!1;const n=t.trim().toLowerCase();return n==="1"||n==="true"||n==="yes"||n==="on"}let m=class extends Nt{constructor(){super(),this.i18nController=new id(this),this.settings=op(),this.password="",this.tab="chat",this.onboarding=ky(),this.connected=!1,this.theme=this.settings.theme??"system",this.themeResolved="dark",this.hello=null,this.lastError=null,this.eventLog=[],this.eventLogBuffer=[],this.toolStreamSyncTimer=null,this.sidebarCloseTimer=null,this.assistantName=os.name,this.assistantAvatar=os.avatar,this.assistantAgentId=os.agentId??null,this.sessionKey=this.settings.sessionKey,this.chatLoading=!1,this.chatSending=!1,this.chatMessage="",this.chatMessages=[],this.chatToolMessages=[],this.chatStream=null,this.chatStreamStartedAt=null,this.chatRunId=null,this.compactionStatus=null,this.chatAvatarUrl=null,this.chatThinkingLevel=null,this.chatQueue=[],this.chatAttachments=[],this.chatUploadedFile=null,this.chatComposeDragOver=!1,this.chatManualRefreshInFlight=!1,this.sidebarOpen=!1,this.sidebarContent=null,this.sidebarError=null,this.splitRatio=this.settings.splitRatio,this.nodesLoading=!1,this.nodes=[],this.devicesLoading=!1,this.devicesError=null,this.devicesList=null,this.execApprovalsLoading=!1,this.execApprovalsSaving=!1,this.execApprovalsDirty=!1,this.execApprovalsSnapshot=null,this.execApprovalsForm=null,this.execApprovalsSelectedAgent=null,this.execApprovalsTarget="gateway",this.execApprovalsTargetNodeId=null,this.execApprovalQueue=[],this.execApprovalBusy=!1,this.execApprovalError=null,this.pendingGatewayUrl=null,this.configLoading=!1,this.configRaw=`{
}
`,this.configRawOriginal="",this.configValid=null,this.configIssues=[],this.configSaving=!1,this.configApplying=!1,this.updateRunning=!1,this.applySessionKey=this.settings.lastActiveSessionKey,this.configSnapshot=null,this.configSchema=null,this.configSchemaVersion=null,this.configSchemaLoading=!1,this.configUiHints={},this.configForm=null,this.configFormOriginal=null,this.configFormDirty=!1,this.configFormMode="form",this.configSearchQuery="",this.configActiveSection=null,this.configActiveSubsection=null,this.channelsLoading=!1,this.channelsSnapshot=null,this.channelsError=null,this.channelsLastSuccess=null,this.bkContent="",this.bkLoading=!1,this.bkError=null,this.bkSaving=!1,this.bkLastSuccess=null,this.bkDependentFiles=null,this.whatsappLoginMessage=null,this.whatsappLoginQrDataUrl=null,this.whatsappLoginConnected=null,this.whatsappBusy=!1,this.nostrProfileFormState=null,this.nostrProfileAccountId=null,this.presenceLoading=!1,this.presenceEntries=[],this.presenceError=null,this.presenceStatus=null,this.oosLoading=!1,this.oosError=null,this.oosStats=null,this.oosList=[],this.oosByFile=[],this.oosByTime=[],this.oosShowAddForm=!1,this.oosDb=null,this.shortageLoading=!1,this.shortageError=null,this.shortageStats=null,this.shortageList=[],this.shortageByFile=[],this.shortageByTime=[],this.shortageShowAddForm=!1,this.shortageDb=null,this.overviewOosStats=null,this.overviewOosError=null,this.overviewShortageStats=null,this.overviewShortageError=null,this.agentsLoading=!1,this.agentsList=null,this.agentsError=null,this.agentsSelectedId=null,this.agentsPanel="overview",this.agentFilesLoading=!1,this.agentFilesError=null,this.agentFilesList=null,this.agentFileContents={},this.agentFileDrafts={},this.agentFileActive=null,this.agentFileSaving=!1,this.agentIdentityLoading=!1,this.agentIdentityError=null,this.agentIdentityById={},this.agentSkillsLoading=!1,this.agentSkillsError=null,this.agentSkillsReport=null,this.agentSkillsAgentId=null,this.sessionsLoading=!1,this.sessionsResult=null,this.sessionsError=null,this.sessionsFilterActive="",this.sessionsFilterLimit="120",this.sessionsIncludeGlobal=!0,this.sessionsIncludeUnknown=!1,this.usageLoading=!1,this.usageResult=null,this.usageCostSummary=null,this.usageError=null,this.usageRequestSeq=0,this.usageTimeSeriesRequestSeq=0,this.usageSessionLogsRequestSeq=0,this.usageStartDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageEndDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageSelectedSessions=[],this.usageSelectedDays=[],this.usageSelectedHours=[],this.usageChartMode="tokens",this.usageDailyChartMode="by-type",this.usageTimeSeriesMode="per-turn",this.usageTimeSeriesBreakdownMode="by-type",this.usageTimeSeries=null,this.usageTimeSeriesLoading=!1,this.usageTimeSeriesCursorStart=null,this.usageTimeSeriesCursorEnd=null,this.usageSessionLogs=null,this.usageSessionLogsLoading=!1,this.usageSessionLogsExpanded=!1,this.usageQuery="",this.usageQueryDraft="",this.usageSessionSort="recent",this.usageSessionSortDir="desc",this.usageRecentSessions=[],this.usageTimeZone="local",this.usageContextExpanded=!1,this.usageHeaderPinned=!1,this.usageSessionsTab="all",this.usageVisibleColumns=["channel","agent","provider","model","messages","tools","errors","duration"],this.usageLogFilterRoles=[],this.usageLogFilterTools=[],this.usageLogFilterHasTools=!1,this.usageLogFilterQuery="",this.usageQueryDebounceTimer=null,this.workFilePaths=[],this.workOriginalFileNamesByPath={},this.workRunning=!1,this.workProgressStage=0,this._workProgressInterval=null,this.workRunStatus="idle",this.workRunId=null,this.workPendingChoices=[],this.workSelections={},this.workResult=null,this.workError=null,this.workCustomerLevel="B_QUOTE",this.workDoRegisterOos=!0,this.workPendingQuotationDraft=null,this.workQuotationDraftSaveStatus=null,this.workTextInput="",this.workTextGenerating=!1,this.workTextError=null,this.cronLoading=!1,this.cronJobs=[],this.cronStatus=null,this.cronError=null,this.cronForm={...Zp},this.cronRunsJobId=null,this.cronRuns=[],this.cronBusy=!1,this.fulfillDraftsLoading=!1,this.fulfillDraftsError=null,this.fulfillDrafts=[],this.fulfillDetail=null,this.fulfillDetailId=null,this.fulfillConfirmBusy=!1,this.fulfillConfirmResult=null,this.fulfillFilterQuery="",this.fulfillSortBy="created_at",this.fulfillSortDir="desc",this.fulfillPage=1,this.fulfillPageSize=10,this.procurementLoading=!1,this.procurementError=null,this.procurementSuggestions=[],this.procurementSelectedKeys=[],this.procurementApprovedKeys=[],this.procurementApproveBusy=!1,this.procurementApproveResult=null,this.procurementFilterQuery="",this.procurementSortBy="uploaded_at",this.procurementSortDir="desc",this.procurementPage=1,this.procurementPageSize=10,this.replenishmentDrafts=[],this.replenishmentDetail=null,this.replenishmentDetailId=null,this.replenishmentLoading=!1,this.replenishmentError=null,this.replenishmentConfirmBusy=!1,this.replenishmentConfirmResult=null,this.replenishmentInputLines=[{product_or_code:"",quantity:0}],this.replenishmentCreateBusy=!1,this.skillsLoading=!1,this.skillsReport=null,this.skillsError=null,this.skillsFilter="",this.skillEdits={},this.skillsBusyKey=null,this.skillMessages={},this.debugLoading=!1,this.debugStatus=null,this.debugHealth=null,this.debugModels=[],this.debugHeartbeat=null,this.debugCallMethod="",this.debugCallParams="{}",this.debugCallResult=null,this.debugCallError=null,this.logsLoading=!1,this.logsError=null,this.logsFile=null,this.logsEntries=[],this.logsFilterText="",this.logsLevelFilters={...Xp},this.logsAutoFollow=!0,this.logsTruncated=!1,this.logsCursor=null,this.logsLastFetchAt=null,this.logsLimit=500,this.logsMaxBytes=25e4,this.logsAtBottom=!0,this.client=null,this.chatScrollFrame=null,this.chatScrollTimeout=null,this.chatHasAutoScrolled=!1,this.chatUserNearBottom=!0,this.chatNewMessagesBelow=!1,this.nodesPollInterval=null,this.logsPollInterval=null,this.debugPollInterval=null,this.logsScrollFrame=null,this.toolStreamById=new Map,this.toolStreamOrder=[],this.refreshSessionsAfterChat=new Set,this.basePath="",this.popStateHandler=()=>bp(this),this.themeMedia=null,this.themeMediaHandler=null,this.topbarObserver=null,Bs(this.settings.locale)&&hn.setLocale(this.settings.locale)}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),hf(this)}firstUpdated(){mf(this)}disconnectedCallback(){vf(this),super.disconnectedCallback()}updated(e){e.has("workRunning")&&(this.workRunning?(this.workProgressStage=this.workRunStatus==="resuming"?1:0,this._workProgressInterval!=null&&(clearInterval(this._workProgressInterval),this._workProgressInterval=null)):(this._workProgressInterval!=null&&(clearInterval(this._workProgressInterval),this._workProgressInterval=null),this.workRunStatus==="done"&&(this.workProgressStage=2))),yf(this,e)}connect(){Rl(this)}handleChatScroll(e){Cd(this,e)}handleLogsScroll(e){Td(this,e)}exportLogs(e,t){Ed(e,t)}resetToolStream(){yi(this)}resetChatScroll(){oo(this)}scrollToBottom(e){oo(this),$n(this,!0,!!(e!=null&&e.smooth))}async loadAssistantIdentity(){await Tl(this)}applySettings(e){st(this,e)}setTab(e){pp(this,e)}setTheme(e,t){fp(this,e,t)}async loadOverview(){await wl(this)}async loadCron(){await ar(this)}async loadFulfillDrafts(){await $p(this)}async loadProcurementSuggestions(){await xp(this)}async loadProcurementReplenishment(){await xn(this)}async loadProcurementReplenishmentDetail(e){await su(this,e)}async confirmProcurementReplenishment(e){await ou(this,e)}async deleteProcurementReplenishmentDraft(e){await au(this,e)}onReplenishmentLineChange(e,t,n){const i=this.replenishmentInputLines.slice();e<0||e>=i.length||(i[e]={...i[e],[t]:n},this.replenishmentInputLines=i)}onReplenishmentAddLine(){this.replenishmentInputLines=[...this.replenishmentInputLines,{product_or_code:"",quantity:0}]}onReplenishmentRemoveLine(e){const t=this.replenishmentInputLines.filter((n,i)=>i!==e);this.replenishmentInputLines=t.length>0?t:[{product_or_code:"",quantity:0}]}async createProcurementReplenishmentDraft(){if(!this.replenishmentCreateBusy){this.replenishmentCreateBusy=!0,this.replenishmentError=null;try{const e=await ru(this,this.replenishmentInputLines);e&&(this.replenishmentInputLines=[{product_or_code:"",quantity:0}],await this.loadProcurementReplenishment(),await this.loadProcurementReplenishmentDetail(e.id))}finally{this.replenishmentCreateBusy=!1}}}async handleAbortChat(){await Sl(this)}removeQueuedMessage(e){Gp(this,e)}async handleUploadChatFile(e){try{const t=await Up(this.basePath,e);this.chatUploadedFile=t,this.lastError=null}catch(t){this.lastError=t instanceof Error?t.message:String(t)}}clearChatUploadedFile(){this.chatUploadedFile=null}setChatComposeDragOver(e){this.chatComposeDragOver=e}async handleComposeDrop(e){this.chatComposeDragOver=!1,await this.handleUploadChatFile(e)}async handleSendChat(e,t){await Vp(this,e,t)}async handleWhatsAppStart(e){await gd(this,e)}async handleWhatsAppWait(){await hd(this)}async handleWhatsAppLogout(){await md(this)}async handleChannelConfigSave(){await vd(this)}async handleChannelConfigReload(){await yd(this)}handleNostrProfileEdit(e,t){$d(this,e,t)}handleNostrProfileCancel(){xd(this)}handleNostrProfileFieldChange(e,t){kd(this,e,t)}async handleNostrProfileSave(){await _d(this)}async handleNostrProfileImport(){await Ad(this)}handleNostrProfileToggleAdvanced(){Sd(this)}async handleExecApprovalDecision(e){const t=this.execApprovalQueue[0];if(!(!t||!this.client||this.execApprovalBusy)){this.execApprovalBusy=!0,this.execApprovalError=null;try{await this.client.request("exec.approval.resolve",{id:t.id,decision:e}),this.execApprovalQueue=this.execApprovalQueue.filter(n=>n.id!==t.id)}catch(n){this.execApprovalError=`Exec approval failed: ${String(n)}`}finally{this.execApprovalBusy=!1}}}handleGatewayUrlConfirm(){const e=this.pendingGatewayUrl;e&&(this.pendingGatewayUrl=null,st(this,{...this.settings,gatewayUrl:e}),this.connect())}handleGatewayUrlCancel(){this.pendingGatewayUrl=null}handleOpenSidebar(e){this.sidebarCloseTimer!=null&&(window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=null),this.sidebarContent=e,this.sidebarError=null,this.sidebarOpen=!0}handleCloseSidebar(){this.sidebarOpen=!1,this.sidebarCloseTimer!=null&&window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=window.setTimeout(()=>{this.sidebarOpen||(this.sidebarContent=null,this.sidebarError=null,this.sidebarCloseTimer=null)},200)}handleSplitRatioChange(e){const t=Math.max(.4,Math.min(.7,e));this.splitRatio=t,this.applySettings({...this.settings,splitRatio:t})}render(){return wy(this)}};v([y()],m.prototype,"settings",2);v([y()],m.prototype,"password",2);v([y()],m.prototype,"tab",2);v([y()],m.prototype,"onboarding",2);v([y()],m.prototype,"connected",2);v([y()],m.prototype,"theme",2);v([y()],m.prototype,"themeResolved",2);v([y()],m.prototype,"hello",2);v([y()],m.prototype,"lastError",2);v([y()],m.prototype,"eventLog",2);v([y()],m.prototype,"assistantName",2);v([y()],m.prototype,"assistantAvatar",2);v([y()],m.prototype,"assistantAgentId",2);v([y()],m.prototype,"sessionKey",2);v([y()],m.prototype,"chatLoading",2);v([y()],m.prototype,"chatSending",2);v([y()],m.prototype,"chatMessage",2);v([y()],m.prototype,"chatMessages",2);v([y()],m.prototype,"chatToolMessages",2);v([y()],m.prototype,"chatStream",2);v([y()],m.prototype,"chatStreamStartedAt",2);v([y()],m.prototype,"chatRunId",2);v([y()],m.prototype,"compactionStatus",2);v([y()],m.prototype,"chatAvatarUrl",2);v([y()],m.prototype,"chatThinkingLevel",2);v([y()],m.prototype,"chatQueue",2);v([y()],m.prototype,"chatAttachments",2);v([y()],m.prototype,"chatUploadedFile",2);v([y()],m.prototype,"chatComposeDragOver",2);v([y()],m.prototype,"chatManualRefreshInFlight",2);v([y()],m.prototype,"sidebarOpen",2);v([y()],m.prototype,"sidebarContent",2);v([y()],m.prototype,"sidebarError",2);v([y()],m.prototype,"splitRatio",2);v([y()],m.prototype,"nodesLoading",2);v([y()],m.prototype,"nodes",2);v([y()],m.prototype,"devicesLoading",2);v([y()],m.prototype,"devicesError",2);v([y()],m.prototype,"devicesList",2);v([y()],m.prototype,"execApprovalsLoading",2);v([y()],m.prototype,"execApprovalsSaving",2);v([y()],m.prototype,"execApprovalsDirty",2);v([y()],m.prototype,"execApprovalsSnapshot",2);v([y()],m.prototype,"execApprovalsForm",2);v([y()],m.prototype,"execApprovalsSelectedAgent",2);v([y()],m.prototype,"execApprovalsTarget",2);v([y()],m.prototype,"execApprovalsTargetNodeId",2);v([y()],m.prototype,"execApprovalQueue",2);v([y()],m.prototype,"execApprovalBusy",2);v([y()],m.prototype,"execApprovalError",2);v([y()],m.prototype,"pendingGatewayUrl",2);v([y()],m.prototype,"configLoading",2);v([y()],m.prototype,"configRaw",2);v([y()],m.prototype,"configRawOriginal",2);v([y()],m.prototype,"configValid",2);v([y()],m.prototype,"configIssues",2);v([y()],m.prototype,"configSaving",2);v([y()],m.prototype,"configApplying",2);v([y()],m.prototype,"updateRunning",2);v([y()],m.prototype,"applySessionKey",2);v([y()],m.prototype,"configSnapshot",2);v([y()],m.prototype,"configSchema",2);v([y()],m.prototype,"configSchemaVersion",2);v([y()],m.prototype,"configSchemaLoading",2);v([y()],m.prototype,"configUiHints",2);v([y()],m.prototype,"configForm",2);v([y()],m.prototype,"configFormOriginal",2);v([y()],m.prototype,"configFormDirty",2);v([y()],m.prototype,"configFormMode",2);v([y()],m.prototype,"configSearchQuery",2);v([y()],m.prototype,"configActiveSection",2);v([y()],m.prototype,"configActiveSubsection",2);v([y()],m.prototype,"channelsLoading",2);v([y()],m.prototype,"channelsSnapshot",2);v([y()],m.prototype,"channelsError",2);v([y()],m.prototype,"channelsLastSuccess",2);v([y()],m.prototype,"bkContent",2);v([y()],m.prototype,"bkLoading",2);v([y()],m.prototype,"bkError",2);v([y()],m.prototype,"bkSaving",2);v([y()],m.prototype,"bkLastSuccess",2);v([y()],m.prototype,"bkDependentFiles",2);v([y()],m.prototype,"whatsappLoginMessage",2);v([y()],m.prototype,"whatsappLoginQrDataUrl",2);v([y()],m.prototype,"whatsappLoginConnected",2);v([y()],m.prototype,"whatsappBusy",2);v([y()],m.prototype,"nostrProfileFormState",2);v([y()],m.prototype,"nostrProfileAccountId",2);v([y()],m.prototype,"presenceLoading",2);v([y()],m.prototype,"presenceEntries",2);v([y()],m.prototype,"presenceError",2);v([y()],m.prototype,"presenceStatus",2);v([y()],m.prototype,"oosLoading",2);v([y()],m.prototype,"oosError",2);v([y()],m.prototype,"oosStats",2);v([y()],m.prototype,"oosList",2);v([y()],m.prototype,"oosByFile",2);v([y()],m.prototype,"oosByTime",2);v([y()],m.prototype,"oosShowAddForm",2);v([y()],m.prototype,"oosDb",2);v([y()],m.prototype,"shortageLoading",2);v([y()],m.prototype,"shortageError",2);v([y()],m.prototype,"shortageStats",2);v([y()],m.prototype,"shortageList",2);v([y()],m.prototype,"shortageByFile",2);v([y()],m.prototype,"shortageByTime",2);v([y()],m.prototype,"shortageShowAddForm",2);v([y()],m.prototype,"shortageDb",2);v([y()],m.prototype,"overviewOosStats",2);v([y()],m.prototype,"overviewOosError",2);v([y()],m.prototype,"overviewShortageStats",2);v([y()],m.prototype,"overviewShortageError",2);v([y()],m.prototype,"agentsLoading",2);v([y()],m.prototype,"agentsList",2);v([y()],m.prototype,"agentsError",2);v([y()],m.prototype,"agentsSelectedId",2);v([y()],m.prototype,"agentsPanel",2);v([y()],m.prototype,"agentFilesLoading",2);v([y()],m.prototype,"agentFilesError",2);v([y()],m.prototype,"agentFilesList",2);v([y()],m.prototype,"agentFileContents",2);v([y()],m.prototype,"agentFileDrafts",2);v([y()],m.prototype,"agentFileActive",2);v([y()],m.prototype,"agentFileSaving",2);v([y()],m.prototype,"agentIdentityLoading",2);v([y()],m.prototype,"agentIdentityError",2);v([y()],m.prototype,"agentIdentityById",2);v([y()],m.prototype,"agentSkillsLoading",2);v([y()],m.prototype,"agentSkillsError",2);v([y()],m.prototype,"agentSkillsReport",2);v([y()],m.prototype,"agentSkillsAgentId",2);v([y()],m.prototype,"sessionsLoading",2);v([y()],m.prototype,"sessionsResult",2);v([y()],m.prototype,"sessionsError",2);v([y()],m.prototype,"sessionsFilterActive",2);v([y()],m.prototype,"sessionsFilterLimit",2);v([y()],m.prototype,"sessionsIncludeGlobal",2);v([y()],m.prototype,"sessionsIncludeUnknown",2);v([y()],m.prototype,"usageLoading",2);v([y()],m.prototype,"usageResult",2);v([y()],m.prototype,"usageCostSummary",2);v([y()],m.prototype,"usageError",2);v([y()],m.prototype,"usageStartDate",2);v([y()],m.prototype,"usageEndDate",2);v([y()],m.prototype,"usageSelectedSessions",2);v([y()],m.prototype,"usageSelectedDays",2);v([y()],m.prototype,"usageSelectedHours",2);v([y()],m.prototype,"usageChartMode",2);v([y()],m.prototype,"usageDailyChartMode",2);v([y()],m.prototype,"usageTimeSeriesMode",2);v([y()],m.prototype,"usageTimeSeriesBreakdownMode",2);v([y()],m.prototype,"usageTimeSeries",2);v([y()],m.prototype,"usageTimeSeriesLoading",2);v([y()],m.prototype,"usageTimeSeriesCursorStart",2);v([y()],m.prototype,"usageTimeSeriesCursorEnd",2);v([y()],m.prototype,"usageSessionLogs",2);v([y()],m.prototype,"usageSessionLogsLoading",2);v([y()],m.prototype,"usageSessionLogsExpanded",2);v([y()],m.prototype,"usageQuery",2);v([y()],m.prototype,"usageQueryDraft",2);v([y()],m.prototype,"usageSessionSort",2);v([y()],m.prototype,"usageSessionSortDir",2);v([y()],m.prototype,"usageRecentSessions",2);v([y()],m.prototype,"usageTimeZone",2);v([y()],m.prototype,"usageContextExpanded",2);v([y()],m.prototype,"usageHeaderPinned",2);v([y()],m.prototype,"usageSessionsTab",2);v([y()],m.prototype,"usageVisibleColumns",2);v([y()],m.prototype,"usageLogFilterRoles",2);v([y()],m.prototype,"usageLogFilterTools",2);v([y()],m.prototype,"usageLogFilterHasTools",2);v([y()],m.prototype,"usageLogFilterQuery",2);v([y()],m.prototype,"workFilePaths",2);v([y()],m.prototype,"workOriginalFileNamesByPath",2);v([y()],m.prototype,"workRunning",2);v([y()],m.prototype,"workProgressStage",2);v([y()],m.prototype,"workRunStatus",2);v([y()],m.prototype,"workRunId",2);v([y()],m.prototype,"workPendingChoices",2);v([y()],m.prototype,"workSelections",2);v([y()],m.prototype,"workResult",2);v([y()],m.prototype,"workError",2);v([y()],m.prototype,"workCustomerLevel",2);v([y()],m.prototype,"workDoRegisterOos",2);v([y()],m.prototype,"workPendingQuotationDraft",2);v([y()],m.prototype,"workQuotationDraftSaveStatus",2);v([y()],m.prototype,"workTextInput",2);v([y()],m.prototype,"workTextGenerating",2);v([y()],m.prototype,"workTextError",2);v([y()],m.prototype,"cronLoading",2);v([y()],m.prototype,"cronJobs",2);v([y()],m.prototype,"cronStatus",2);v([y()],m.prototype,"cronError",2);v([y()],m.prototype,"cronForm",2);v([y()],m.prototype,"cronRunsJobId",2);v([y()],m.prototype,"cronRuns",2);v([y()],m.prototype,"cronBusy",2);v([y()],m.prototype,"fulfillDraftsLoading",2);v([y()],m.prototype,"fulfillDraftsError",2);v([y()],m.prototype,"fulfillDrafts",2);v([y()],m.prototype,"fulfillDetail",2);v([y()],m.prototype,"fulfillDetailId",2);v([y()],m.prototype,"fulfillConfirmBusy",2);v([y()],m.prototype,"fulfillConfirmResult",2);v([y()],m.prototype,"fulfillFilterQuery",2);v([y()],m.prototype,"fulfillSortBy",2);v([y()],m.prototype,"fulfillSortDir",2);v([y()],m.prototype,"fulfillPage",2);v([y()],m.prototype,"fulfillPageSize",2);v([y()],m.prototype,"procurementLoading",2);v([y()],m.prototype,"procurementError",2);v([y()],m.prototype,"procurementSuggestions",2);v([y()],m.prototype,"procurementSelectedKeys",2);v([y()],m.prototype,"procurementApprovedKeys",2);v([y()],m.prototype,"procurementApproveBusy",2);v([y()],m.prototype,"procurementApproveResult",2);v([y()],m.prototype,"procurementFilterQuery",2);v([y()],m.prototype,"procurementSortBy",2);v([y()],m.prototype,"procurementSortDir",2);v([y()],m.prototype,"procurementPage",2);v([y()],m.prototype,"procurementPageSize",2);v([y()],m.prototype,"replenishmentDrafts",2);v([y()],m.prototype,"replenishmentDetail",2);v([y()],m.prototype,"replenishmentDetailId",2);v([y()],m.prototype,"replenishmentLoading",2);v([y()],m.prototype,"replenishmentError",2);v([y()],m.prototype,"replenishmentConfirmBusy",2);v([y()],m.prototype,"replenishmentConfirmResult",2);v([y()],m.prototype,"replenishmentInputLines",2);v([y()],m.prototype,"replenishmentCreateBusy",2);v([y()],m.prototype,"skillsLoading",2);v([y()],m.prototype,"skillsReport",2);v([y()],m.prototype,"skillsError",2);v([y()],m.prototype,"skillsFilter",2);v([y()],m.prototype,"skillEdits",2);v([y()],m.prototype,"skillsBusyKey",2);v([y()],m.prototype,"skillMessages",2);v([y()],m.prototype,"debugLoading",2);v([y()],m.prototype,"debugStatus",2);v([y()],m.prototype,"debugHealth",2);v([y()],m.prototype,"debugModels",2);v([y()],m.prototype,"debugHeartbeat",2);v([y()],m.prototype,"debugCallMethod",2);v([y()],m.prototype,"debugCallParams",2);v([y()],m.prototype,"debugCallResult",2);v([y()],m.prototype,"debugCallError",2);v([y()],m.prototype,"logsLoading",2);v([y()],m.prototype,"logsError",2);v([y()],m.prototype,"logsFile",2);v([y()],m.prototype,"logsEntries",2);v([y()],m.prototype,"logsFilterText",2);v([y()],m.prototype,"logsLevelFilters",2);v([y()],m.prototype,"logsAutoFollow",2);v([y()],m.prototype,"logsTruncated",2);v([y()],m.prototype,"logsCursor",2);v([y()],m.prototype,"logsLastFetchAt",2);v([y()],m.prototype,"logsLimit",2);v([y()],m.prototype,"logsMaxBytes",2);v([y()],m.prototype,"logsAtBottom",2);v([y()],m.prototype,"chatNewMessagesBelow",2);m=v([Ra("openclaw-app")],m);
//# sourceMappingURL=index-CoFoMR_h.js.map
