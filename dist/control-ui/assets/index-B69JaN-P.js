var Tp=Object.defineProperty;var Cp=(e,t,n)=>t in e?Tp(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var B=(e,t,n)=>Cp(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Fs=globalThis,wa=Fs.ShadowRoot&&(Fs.ShadyCSS===void 0||Fs.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,xa=Symbol(),Hl=new WeakMap;let Du=class{constructor(t,n,i){if(this._$cssResult$=!0,i!==xa)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(wa&&t===void 0){const i=n!==void 0&&n.length===1;i&&(t=Hl.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Hl.set(n,t))}return t}toString(){return this.cssText}};const Ep=e=>new Du(typeof e=="string"?e:e+"",void 0,xa),Iu=(e,...t)=>{const n=e.length===1?e[0]:t.reduce((i,s,o)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[o+1],e[0]);return new Du(n,e,xa)},Rp=(e,t)=>{if(wa)e.adoptedStyleSheets=t.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of t){const i=document.createElement("style"),s=Fs.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=n.cssText,e.appendChild(i)}},Ul=wa?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const i of t.cssRules)n+=i.cssText;return Ep(n)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Lp,defineProperty:Mp,getOwnPropertyDescriptor:Pp,getOwnPropertyNames:Dp,getOwnPropertySymbols:Ip,getPrototypeOf:Op}=Object,Ft=globalThis,jl=Ft.trustedTypes,Fp=jl?jl.emptyScript:"",Qo=Ft.reactiveElementPolyfillSupport,$i=(e,t)=>e,Vs={toAttribute(e,t){switch(t){case Boolean:e=e?Fp:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},_a=(e,t)=>!Lp(e,t),ql={attribute:!0,type:String,converter:Vs,reflect:!1,useDefault:!1,hasChanged:_a};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Ft.litPropertyMetadata??(Ft.litPropertyMetadata=new WeakMap);let Nn=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=ql){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(t,n),!n.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,n);s!==void 0&&Mp(this.prototype,t,s)}}static getPropertyDescriptor(t,n,i){const{get:s,set:o}=Pp(this.prototype,t)??{get(){return this[n]},set(r){this[n]=r}};return{get:s,set(r){const a=s==null?void 0:s.call(this);o==null||o.call(this,r),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ql}static _$Ei(){if(this.hasOwnProperty($i("elementProperties")))return;const t=Op(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($i("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($i("properties"))){const n=this.properties,i=[...Dp(n),...Ip(n)];for(const s of i)this.createProperty(s,n[s])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[i,s]of n)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[n,i]of this.elementProperties){const s=this._$Eu(n,i);s!==void 0&&this._$Eh.set(s,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)n.unshift(Ul(s))}else t!==void 0&&n.push(Ul(t));return n}static _$Eu(t,n){const i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(n=>n(this))}addController(t){var n;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((n=t.hostConnected)==null||n.call(t))}removeController(t){var n;(n=this._$EO)==null||n.delete(t)}_$E_(){const t=new Map,n=this.constructor.elementProperties;for(const i of n.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Rp(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(n=>{var i;return(i=n.hostConnected)==null?void 0:i.call(n)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(n=>{var i;return(i=n.hostDisconnected)==null?void 0:i.call(n)})}attributeChangedCallback(t,n,i){this._$AK(t,i)}_$ET(t,n){var o;const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const r=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:Vs).toAttribute(n,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,n){var o,r;const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const a=i.getPropertyOptions(s),l=typeof a.converter=="function"?{fromAttribute:a.converter}:((o=a.converter)==null?void 0:o.fromAttribute)!==void 0?a.converter:Vs;this._$Em=s;const c=l.fromAttribute(n,a.type);this[s]=c??((r=this._$Ej)==null?void 0:r.get(s))??c,this._$Em=null}}requestUpdate(t,n,i,s=!1,o){var r;if(t!==void 0){const a=this.constructor;if(s===!1&&(o=this[t]),i??(i=a.getPropertyOptions(t)),!((i.hasChanged??_a)(o,n)||i.useDefault&&i.reflect&&o===((r=this._$Ej)==null?void 0:r.get(t))&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,n,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,r??n??this[t]),o!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(n=void 0),this._$AL.set(t,n)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,r]of this._$Ep)this[o]=r;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,r]of s){const{wrapped:a}=r,l=this[o];a!==!0||this._$AL.has(o)||l===void 0||this.C(o,void 0,r,l)}}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),(i=this._$EO)==null||i.forEach(s=>{var o;return(o=s.hostUpdate)==null?void 0:o.call(s)}),this.update(n)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(n)}willUpdate(t){}_$AE(t){var n;(n=this._$EO)==null||n.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(n=>this._$ET(n,this[n]))),this._$EM()}updated(t){}firstUpdated(t){}};Nn.elementStyles=[],Nn.shadowRootOptions={mode:"open"},Nn[$i("elementProperties")]=new Map,Nn[$i("finalized")]=new Map,Qo==null||Qo({ReactiveElement:Nn}),(Ft.reactiveElementVersions??(Ft.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Si=globalThis,Kl=e=>e,Gs=Si.trustedTypes,Wl=Gs?Gs.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ou="$lit$",Mt=`lit$${Math.random().toFixed(9).slice(2)}$`,Fu="?"+Mt,Np=`<${Fu}>`,yn=document,Ni=()=>yn.createComment(""),Bi=e=>e===null||typeof e!="object"&&typeof e!="function",ka=Array.isArray,Bp=e=>ka(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",Yo=`[ 	
\f\r]`,oi=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Vl=/-->/g,Gl=/>/g,Jt=RegExp(`>|${Yo}(?:([^\\s"'>=/]+)(${Yo}*=${Yo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ql=/'/g,Yl=/"/g,Nu=/^(?:script|style|textarea|title)$/i,zp=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),f=zp(1),Ut=Symbol.for("lit-noChange"),S=Symbol.for("lit-nothing"),Xl=new WeakMap,cn=yn.createTreeWalker(yn,129);function Bu(e,t){if(!ka(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Wl!==void 0?Wl.createHTML(t):t}const Hp=(e,t)=>{const n=e.length-1,i=[];let s,o=t===2?"<svg>":t===3?"<math>":"",r=oi;for(let a=0;a<n;a++){const l=e[a];let c,d,u=-1,h=0;for(;h<l.length&&(r.lastIndex=h,d=r.exec(l),d!==null);)h=r.lastIndex,r===oi?d[1]==="!--"?r=Vl:d[1]!==void 0?r=Gl:d[2]!==void 0?(Nu.test(d[2])&&(s=RegExp("</"+d[2],"g")),r=Jt):d[3]!==void 0&&(r=Jt):r===Jt?d[0]===">"?(r=s??oi,u=-1):d[1]===void 0?u=-2:(u=r.lastIndex-d[2].length,c=d[1],r=d[3]===void 0?Jt:d[3]==='"'?Yl:Ql):r===Yl||r===Ql?r=Jt:r===Vl||r===Gl?r=oi:(r=Jt,s=void 0);const g=r===Jt&&e[a+1].startsWith("/>")?" ":"";o+=r===oi?l+Np:u>=0?(i.push(c),l.slice(0,u)+Ou+l.slice(u)+Mt+g):l+Mt+(u===-2?a:g)}return[Bu(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class zi{constructor({strings:t,_$litType$:n},i){let s;this.parts=[];let o=0,r=0;const a=t.length-1,l=this.parts,[c,d]=Hp(t,n);if(this.el=zi.createElement(c,i),cn.currentNode=this.el.content,n===2||n===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=cn.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(const u of s.getAttributeNames())if(u.endsWith(Ou)){const h=d[r++],g=s.getAttribute(u).split(Mt),v=/([.?@])?(.*)/.exec(h);l.push({type:1,index:o,name:v[2],strings:g,ctor:v[1]==="."?jp:v[1]==="?"?qp:v[1]==="@"?Kp:mo}),s.removeAttribute(u)}else u.startsWith(Mt)&&(l.push({type:6,index:o}),s.removeAttribute(u));if(Nu.test(s.tagName)){const u=s.textContent.split(Mt),h=u.length-1;if(h>0){s.textContent=Gs?Gs.emptyScript:"";for(let g=0;g<h;g++)s.append(u[g],Ni()),cn.nextNode(),l.push({type:2,index:++o});s.append(u[h],Ni())}}}else if(s.nodeType===8)if(s.data===Fu)l.push({type:2,index:o});else{let u=-1;for(;(u=s.data.indexOf(Mt,u+1))!==-1;)l.push({type:7,index:o}),u+=Mt.length-1}o++}}static createElement(t,n){const i=yn.createElement("template");return i.innerHTML=t,i}}function qn(e,t,n=e,i){var r,a;if(t===Ut)return t;let s=i!==void 0?(r=n._$Co)==null?void 0:r[i]:n._$Cl;const o=Bi(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==o&&((a=s==null?void 0:s._$AO)==null||a.call(s,!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,i)),i!==void 0?(n._$Co??(n._$Co=[]))[i]=s:n._$Cl=s),s!==void 0&&(t=qn(e,s._$AS(e,t.values),s,i)),t}class Up{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??yn).importNode(n,!0);cn.currentNode=s;let o=cn.nextNode(),r=0,a=0,l=i[0];for(;l!==void 0;){if(r===l.index){let c;l.type===2?c=new go(o,o.nextSibling,this,t):l.type===1?c=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(c=new Wp(o,this,t)),this._$AV.push(c),l=i[++a]}r!==(l==null?void 0:l.index)&&(o=cn.nextNode(),r++)}return cn.currentNode=yn,s}p(t){let n=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,n),n+=i.strings.length-2):i._$AI(t[n])),n++}}let go=class zu{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,n,i,s){this.type=2,this._$AH=S,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=qn(this,t,n),Bi(t)?t===S||t==null||t===""?(this._$AH!==S&&this._$AR(),this._$AH=S):t!==this._$AH&&t!==Ut&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Bp(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==S&&Bi(this._$AH)?this._$AA.nextSibling.data=t:this.T(yn.createTextNode(t)),this._$AH=t}$(t){var o;const{values:n,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=zi.createElement(Bu(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===s)this._$AH.p(n);else{const r=new Up(s,this),a=r.u(this.options);r.p(n),this.T(a),this._$AH=r}}_$AC(t){let n=Xl.get(t.strings);return n===void 0&&Xl.set(t.strings,n=new zi(t)),n}k(t){ka(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let i,s=0;for(const o of t)s===n.length?n.push(i=new zu(this.O(Ni()),this.O(Ni()),this,this.options)):i=n[s],i._$AI(o),s++;s<n.length&&(this._$AR(i&&i._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,n);t!==this._$AB;){const s=Kl(t).nextSibling;Kl(t).remove(),t=s}}setConnected(t){var n;this._$AM===void 0&&(this._$Cv=t,(n=this._$AP)==null||n.call(this,t))}},mo=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,i,s,o){this.type=1,this._$AH=S,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=S}_$AI(t,n=this,i,s){const o=this.strings;let r=!1;if(o===void 0)t=qn(this,t,n,0),r=!Bi(t)||t!==this._$AH&&t!==Ut,r&&(this._$AH=t);else{const a=t;let l,c;for(t=o[0],l=0;l<o.length-1;l++)c=qn(this,a[i+l],n,l),c===Ut&&(c=this._$AH[l]),r||(r=!Bi(c)||c!==this._$AH[l]),c===S?t=S:t!==S&&(t+=(c??"")+o[l+1]),this._$AH[l]=c}r&&!s&&this.j(t)}j(t){t===S?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},jp=class extends mo{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===S?void 0:t}},qp=class extends mo{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==S)}},Kp=class extends mo{constructor(t,n,i,s,o){super(t,n,i,s,o),this.type=5}_$AI(t,n=this){if((t=qn(this,t,n,0)??S)===Ut)return;const i=this._$AH,s=t===S&&i!==S||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==S&&(i===S||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var n;typeof this._$AH=="function"?this._$AH.call(((n=this.options)==null?void 0:n.host)??this.element,t):this._$AH.handleEvent(t)}},Wp=class{constructor(t,n,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){qn(this,t)}};const Vp={I:go},Xo=Si.litHtmlPolyfillSupport;Xo==null||Xo(zi,go),(Si.litHtmlVersions??(Si.litHtmlVersions=[])).push("3.3.2");const Gp=(e,t,n)=>{const i=(n==null?void 0:n.renderBefore)??t;let s=i._$litPart$;if(s===void 0){const o=(n==null?void 0:n.renderBefore)??null;i._$litPart$=s=new go(t.insertBefore(Ni(),o),o,void 0,n??{})}return s._$AI(e),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const fn=globalThis;let pn=class extends Nn{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var n;const t=super.createRenderRoot();return(n=this.renderOptions).renderBefore??(n.renderBefore=t.firstChild),t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Gp(n,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return Ut}};var Pu;pn._$litElement$=!0,pn.finalized=!0,(Pu=fn.litElementHydrateSupport)==null||Pu.call(fn,{LitElement:pn});const Jo=fn.litElementPolyfillSupport;Jo==null||Jo({LitElement:pn});(fn.litElementVersions??(fn.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $a=e=>(t,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qp={attribute:!0,type:String,converter:Vs,reflect:!1,hasChanged:_a},Yp=(e=Qp,t,n)=>{const{kind:i,metadata:s}=n;let o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),i==="setter"&&((e=Object.create(e)).wrapped=!0),o.set(n.name,e),i==="accessor"){const{name:r}=n;return{set(a){const l=t.get.call(this);t.set.call(this,a),this.requestUpdate(r,l,e,!0,a)},init(a){return a!==void 0&&this.C(r,void 0,e,a),a}}}if(i==="setter"){const{name:r}=n;return function(a){const l=this[r];t.call(this,a),this.requestUpdate(r,l,e,!0,a)}}throw Error("Unsupported decorator location: "+i)};function Wt(e){return(t,n)=>typeof n=="object"?Yp(e,t,n):((i,s,o)=>{const r=s.hasOwnProperty(o);return s.constructor.createProperty(o,i),r?Object.getOwnPropertyDescriptor(s,o):void 0})(e,t,n)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function _(e){return Wt({...e,state:!0,attribute:!1})}const Xp="modulepreload",Jp=function(e,t){return new URL(e,t).href},Jl={},Zp=function(t,n,i){let s=Promise.resolve();if(n&&n.length>0){let r=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};const a=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),c=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));s=r(n.map(d=>{if(d=Jp(d,i),d in Jl)return;Jl[d]=!0;const u=d.endsWith(".css"),h=u?'[rel="stylesheet"]':"";if(!!i)for(let b=a.length-1;b>=0;b--){const y=a[b];if(y.href===d&&(!u||y.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${h}`))return;const v=document.createElement("link");if(v.rel=u?"stylesheet":Xp,u||(v.as="script"),v.crossOrigin="",v.href=d,c&&v.setAttribute("nonce",c),document.head.appendChild(v),u)return new Promise((b,y)=>{v.addEventListener("load",b),v.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${d}`)))})}))}function o(r){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=r,window.dispatchEvent(a),!a.defaultPrevented)throw r}return s.then(r=>{for(const a of r||[])a.status==="rejected"&&o(a.reason);return t().catch(o)})},eg={common:{health:"Health",ok:"OK",offline:"Offline",connect:"Connect",refresh:"Refresh",retry:"Retry",cancel:"Cancel",close:"Close",yes:"Yes",no:"No",prev:"Prev",next:"Next",errorTitle:"Request failed",enabled:"Enabled",disabled:"Disabled",na:"n/a",docs:"Docs",resources:"Resources",loading:"Loading…",save:"Save",edit:"Edit"},nav:{chat:"Chat",control:"Control",agent:"Agent",settings:"Settings",expand:"Expand sidebar",collapse:"Collapse sidebar"},tabs:{agents:"Agents",overview:"Overview",channels:"Business Knowledge",instances:"Out of Stock",sessions:"Procurement",work:"Quotation",cron:"Order Fulfill",skills:"Skills",reports:"Reports",nodes:"Nodes",chat:"Chat",config:"Config",debug:"Debug",logs:"Logs","admin-data":"Data"},subtitles:{agents:"Manage agent workspaces, tools, and identities.",overview:"Gateway status, entry points, and a fast health read.",channels:"Edit wanding_business_knowledge.md for selection and matching.",instances:"OOS dashboard: stats and product list without asking the agent.",sessions:"Procurement suggestions from shortage; approve to save and notify buyer.",work:"Batch quotation: upload files, identify, match price and stock, fill and save.",cron:"Pending quotation drafts; confirm to create order and lock stock.",skills:"Manage skill availability and API key injection.",reports:"Weekly sales invoice reports. Click a record to view full content.",nodes:"Paired devices, capabilities, and command exposure.",chat:"Direct gateway chat session for quick interventions.",config:"Edit ~/.openclaw/openclaw.json safely.",debug:"Gateway snapshots, events, and manual RPC calls.",logs:"Live tail of the gateway file logs.","admin-data":"Wanding price library and product mapping (admin password)."},overview:{health:{title:"Health & stats",subtitle:"High-level view of instances, sessions, and cron.",lastErrorLabel:"Last error",noError:"No recent errors."},access:{title:"Gateway Access",subtitle:"Where the dashboard connects and how it authenticates.",wsUrl:"WebSocket URL",token:"Gateway Token",password:"Password (not stored)",sessionKey:"Default Session Key",language:"Language",connectHint:"Click Connect to apply connection changes.",trustedProxy:"Authenticated via trusted proxy."},snapshot:{title:"Snapshot",subtitle:"Latest gateway handshake information.",status:"Status",uptime:"Uptime",tickInterval:"Tick Interval",lastChannelsRefresh:"Last Channels Refresh",channelsHint:"Use Channels to link WhatsApp, Telegram, Discord, Signal, or iMessage."},stats:{instances:"Instances",instancesHint:"Presence beacons in the last 5 minutes.",sessions:"Sessions",sessionsHint:"Recent session keys tracked by the gateway.",cron:"Cron",cronNext:"Next wake {time}"},notes:{title:"Notes",subtitle:"Quick reminders for remote control setups.",tailscaleTitle:"Tailscale serve",tailscaleText:"Prefer serve mode to keep the gateway on loopback with tailnet auth.",sessionTitle:"Session hygiene",sessionText:"Use /new or sessions.patch to reset context.",cronTitle:"Cron reminders",cronText:"Use isolated sessions for recurring runs."},auth:{required:"This gateway requires auth. Add a token or password, then click Connect.",failed:"Auth failed. Re-copy a tokenized URL with {command}, or update the token, then click Connect."},insecure:{hint:"This page is HTTP, so the browser blocks device identity. Use HTTPS (Tailscale Serve) or open {url} on the gateway host.",stayHttp:"If you must stay on HTTP, set {config} (token-only)."},oos:{title:"Out-of-stock overview",subtitle:"Recent out-of-stock stats; see Instances tab for full details.",stats:{totalRecords:"Total records",outOfStockCount:"Out-of-stock items",today:"Added today",reportedGe2:"Reported out-of-stock ≥2 times"},empty:"No stats yet; check back later on the Instances tab."},shortage:{title:"Shortage overview",subtitle:"Shortage stats after Work matching; focus on critical items.",stats:{totalRecords:"Total records",shortageProductCount:"Shortage items",today:"Added today",reportedGe2:"Reported shortage ≥2 times"},empty:"No stats yet; check back later on the Instances tab."},dashboard:{kpi:{oosProducts:"Out-of-stock products",shortageProducts:"Shortage products",pendingQuotations:"Pending quotations",todayNewQuotations:"New quotations today",shortageQuotations:"Shortage quotations",replenishmentDrafts:"Replenishment drafts"},chart:{quotationTrend:"Quotation trend (last 7 days)",stockTrend:"Out-of-stock / shortage trend (last 7 days)",quotationSeries:"Quotations",oosSeries:"Out-of-stock",shortageSeries:"Shortage",loading:"Loading...",empty:"No data"},error:"Dashboard data load failed: {error}"}},chat:{disconnected:"Disconnected from gateway.",refreshTitle:"Refresh chat data",thinkingToggle:"Toggle assistant thinking/working output",focusToggle:"Toggle focus mode (hide sidebar + page header)",onboardingDisabled:"Disabled during onboarding",ui:{compaction:{active:"Compacting context…",done:"Context compacted",divider:"Compaction"},attachments:{previewAlt:"Attachment preview",remove:"Remove attachment"},upload:{label:"Upload Excel or PDF",button:"Upload Excel/PDF",remove:"Remove uploaded file"},queue:{title:"Queued ({count})",imageItem:"Image ({count})",remove:"Remove queued message"},compose:{placeholder:{withImages:"Add a message or paste more images…",default:"Message (↩ to send, Shift+↩ for line breaks; paste images or upload/drag Excel/PDF)",disconnected:"Connect to the gateway to start chatting…"},newMessages:"New messages",dropHint:"Drop to upload Excel/PDF",label:"Message",stop:"Stop",newSession:"New session",send:"Send",queue:"Queue",exitFocus:"Exit focus mode"}}},work:{runHint:"Please select at least one file before running.",saveConfirm:"Confirm save quotation draft and persist to database?",saveSuccessHint:"Saved. You can confirm it on the Order Fulfill page.",stageExtract:"Extract sheet data",stageMatch:"Match price & inventory",stageFill:"Fill quotation",uploadTitle:"Quotation files (multiple)",removeFile:"Remove",noFiles:"No files uploaded (.xlsx/.xls/.xlsm).",customerLevel:"Customer level",registerOos:"Register out-of-stock items",currentStage:"Current stage",running:"Running",run:"Run",cancel:"Cancel",statusLabel:"Status",awaitingTitle:"Need your choices",awaitingHint:"Select one option for each ambiguous item, then continue.",qty:"Qty",choiceSelect:"Candidate selection",choiceOos:"Mark as out of stock",resuming:"Resuming",resume:"Confirm and continue",savedDraftNo:"Quotation draft saved: {no}",pendingDraftTitle:"Pending quotation draft",pendingDraftHint:"Review and edit before saving to database.",saving:"Saving...",saveDraft:"Confirm and save",resultTitle:"Execution result",download:"Download {name}",trace:"Trace ({count})",lineProduct:"Requested item name",lineSpec:"Requested spec",lineQty:"Qty",lineCode:"Product number",lineQuoteName:"Quoted item name",lineQuoteSpec:"Quoted spec",linePrice:"Unit price",lineAmount:"Total",lineAvailable:"Available",lineShortfall:"Shortfall",lineIsShortage:"Shortage",textInputTitle:"Text input (quotation)",textInputHint:"Enter product list (multi-line or semicolon/comma separated); generated file will run with uploaded files.",textInputPlaceholder:"e.g. Cable 3*2.5 100m; Switch 20 pcs",generateFromText:"Generate from text",textGenerating:"Generating…",priceLevels:{FACTORY_INC_TAX:"Factory price (incl. tax)",FACTORY_EXC_TAX:"Factory price (excl. tax)",PURCHASE_EXC_TAX:"Purchase price (excl. tax)",A_MARGIN:"Tier A (2nd-level agent) · margin",A_QUOTE:"Tier A (2nd-level agent) · quotation price",B_MARGIN:"Tier B (1st-level agent) · margin",B_QUOTE:"Tier B (1st-level agent) · quotation price",C_MARGIN:"Tier C (Juwan key account) · margin",C_QUOTE:"Tier C (Juwan key account) · quotation price",D_MARGIN:"Tier D (Qingshan key account) · margin",D_QUOTE:"Tier D (Qingshan key account) · quotation price",D_LOW:"Tier D (Qingshan key account) · reduced margin",E_MARGIN:"Tier E (Datang key account, freight included) · margin",E_QUOTE:"Tier E (Datang key account, freight included) · quotation price"},fileDisplayName:"Quotation file display name",status:{idle:"Idle",running:"Running",awaitingChoices:"Awaiting choices",resuming:"Resuming",done:"Done",error:"Error"},fallbackDraftName:"Untitled quotation"},fulfill:{title:"Pending quotation drafts",subtitle:"Load persisted drafts and confirm to create formal orders.",loading:"Loading...",refreshList:"Refresh list",filterPlaceholder:"Search by draft no/name/source",sortBy:"Sort by",sortDir:"Order",sortCreatedAt:"Created time",sortDraftNo:"Draft no",sortName:"Name",sortDesc:"Newest first",sortAsc:"Oldest first",pageSize:"Page size",total:"Total: {total}",page:"Page {current}/{total}",listTitle:"List",listSubtitle:"View detail first, then confirm order.",colDraftNo:"Draft No",colName:"Name",colSource:"Source",colCreatedAt:"Created At",colActions:"Actions",viewDetail:"View",confirmAction:"Confirm order",confirming:"Confirming...",detailTitle:"Draft detail · {draftNo}",closeDetail:"Close detail",lineProduct:"Product",lineSpec:"Spec",lineQty:"Qty",lineCode:"Code",lineQuoteName:"Quote name",lineQuoteSpec:"Quoted spec",linePrice:"Unit price",lineAmount:"Amount",lineAvailable:"Available",lineShortfall:"Shortfall",lineIsShortage:"Shortage",noDrafts:"No pending quotation drafts.",confirmTitle:"Order confirmed",confirmPrompt:"Confirm order? {count} line(s), total amount {amount}.",confirmPromptSimple:"Confirm to convert this quotation into a formal order?",orderId:"Order ID"},procurement:{title:"Procurement suggestions",subtitle:"Generated from shortage records; approve to persist and notify buyers.",loading:"Loading...",refreshList:"Refresh list",batchApprove:"Batch approve",approving:"Approving...",approveSingle:"Approve",approveConfirm:"Confirm approval and notify buyer?",approveBatchConfirm:"Confirm approval of {count} item(s) and notify buyer?",noSuggestions:"No shortage products; no procurement suggestions.",noPending:"No pending items (approved items are hidden).",listHint:"Select multiple to batch approve; click Approve to save and notify buyer.",filterPlaceholder:"Search by product/spec/code/key",sortBy:"Sort by",sortDir:"Order",sortUploadedAt:"Reported time",sortShortfall:"Shortfall",sortCount:"Report count",sortProduct:"Product name",sortDesc:"High to low / newest",sortAsc:"Low to high / oldest",pageSize:"Page size",total:"Total: {total}",page:"Page {current}/{total}",listTitle:"Shortage item list",selectAll:"Select all filtered items",selectItem:"Select item",colProduct:"Product",colSpec:"Spec",colShortfall:"Shortfall",colCode:"Code",colCount:"Count",colActions:"Actions",approvedCount:"Approved {count} item(s)."},replenishment:{title:"Replenishment",subtitle:"Enter product name or code and quantity to generate a draft; view and confirm in the list below to run inventory supplement.",productOrCodePlaceholder:"Product name or code",quantityPlaceholder:"Quantity",generateDraft:"Generate replenishment draft",creating:"Creating…",addRow:"Add row",removeRow:"Remove",refreshList:"Refresh list",loading:"Loading…",listTitle:"Replenishment drafts",listHint:"Drafts are created via LLM and inventory tools; confirm to run inventory changes.",noDrafts:"No replenishment drafts.",colDraftNo:"Draft No",colName:"Name",colCreatedAt:"Created",colStatus:"Status",colActions:"Actions",viewDetail:"View",confirm:"Confirm replenishment",confirming:"Executing…",confirmPrompt:"Confirm and run all inventory changes for this draft?",delete:"Delete",deleteConfirm:"Delete this replenishment draft? This cannot be undone.",detailTitle:"Draft detail ({no})",detailSubtitle:"Products, current stock and replenishment quantities.",colCode:"Code",colProduct:"Product",colSpec:"Spec",colCurrentQty:"Current qty",colQuantity:"Quantity"},oos:{title:"Out-of-stock dashboard",subtitle:"Overview and list of out-of-stock products, without asking the agent.",actions:{loading:"Loading…",refresh:"Refresh",addManual:"Add manually",confirm:"Confirm",delete:"Delete",deleteHint:"Delete this out-of-stock item"},db:{local:"Using local database"},stats:{totalRecords:"Total records",outOfStockCount:"Out-of-stock items",today:"New today",reportedGe2:"Reported out-of-stock ≥2 times",emailSentProductCount:"Products with email sent"},empty:{stats:"No stats yet.",list:"No out-of-stock records."},list:{title:"Out-of-stock product list",more:"Total {count} out-of-stock products; showing first 50 only",meta:"Qty: {qty} {unit} · Reported out-of-stock {count} time(s) · Email: {email}"},addForm:{title:"Add out-of-stock record",namePlaceholder:"Product name (required)",specPlaceholder:"Specification",qtyPlaceholder:"Quantity",unitPlaceholder:"Unit"},email:{sent:"Sent",notSent:"Not sent"},byFile:{title:"By file",empty:"None",count:"Records: {count}"},byTime:{title:"By time (last 30 days)",empty:"None",count:"New: {count}"}},shortage:{title:"Shortage records",subtitle:"Saved when Work detects insufficient stock; overview and list of shortage items.",actions:{loading:"Loading…",refresh:"Refresh",addManual:"Add manually",confirm:"Confirm",delete:"Delete",deleteHint:"Delete this shortage item"},db:{local:"Using local database"},stats:{totalRecords:"Total records",shortageProductCount:"Shortage products",today:"New today",reportedGe2:"Reported shortage ≥2 times"},empty:{stats:"No stats yet.",list:"No shortage records."},list:{title:"Shortage product list",more:"Total {count} shortage products; showing first 50 only",meta:"Required: {qty} · Available: {avail} · Shortfall: {diff} · Reported shortage {count} time(s)"},addForm:{title:"Add shortage record (product name, spec, required, available; shortfall will be auto-calculated)",namePlaceholder:"Product name (required)",specPlaceholder:"Specification",qtyPlaceholder:"Required",availPlaceholder:"Available",qtyTitle:"Required quantity",availTitle:"Available quantity",diffTitle:"Shortfall = required − available; auto-calculated on submit",diffText:"Shortfall: auto-calculated"},byFile:{title:"By file",empty:"None",count:"Records: {count}"},byTime:{title:"By time (last 30 days)",empty:"None",count:"New: {count}"}},businessKnowledge:{title:"Business knowledge",subtitle:"Edit wanding_business_knowledge.md for selection and matching. The LLM will use the latest content after saving.",lastSavedAt:"Saved at {time}",actions:{reloading:"Loading…",reload:"Reload",saving:"Saving…",save:"Save"},relatedFiles:{title:"Related data files",hint:"Selection and historical quotations rely on these Excel files. Copy the path to open them in Explorer or Excel when updating.",mappingTableLabel:"Inquiry mapping table (historical quotations):",priceLibraryLabel:"Wanding price library:",copyPath:"Copy path"},editor:{placeholder:`[Business knowledge]
1. …`}},agents:{reports:{whereHint:"Weekly reports live here: open Agents, pick an agent, then the Skills sub-tab (not the sidebar Skills catalog).",title:"Weekly reports",subtitle:"Scheduled tasks and recent runs for this agent.",tokenLabel:"Reports admin token",tasks:"Tasks",noTasks:"No report tasks configured.",enabled:"Enabled",cron:"Cron",timezone:"Timezone",run:"Run now",latestRecords:"Latest runs",noRecords:"No run history yet.",detailLoading:"Loading report...",detailEmpty:"Select a record on the left to view the report.",detailNoMd:"No report text is stored yet for this record.",copyBtn:"Copy",copiedBtn:"Copied!",reformatBtn:"Regenerate text"}},languages:{en:"English",zhCN:"简体中文 (Simplified Chinese)",zhTW:"繁體中文 (Traditional Chinese)",ptBR:"Português (Brazilian Portuguese)"}},tg=["en","zh-CN"];function Sa(e){return e!=null&&tg.includes(e)}class ng{constructor(){this.locale="en",this.translations={en:eg},this.subscribers=new Set,this.loadLocale()}loadLocale(){const t=localStorage.getItem("openclaw.i18n.locale");let n;Sa(t)?n=t:n=(navigator.language||"").startsWith("zh")?"zh-CN":"en",n==="en"?this.locale="en":this.setLocale(n)}getLocale(){return this.locale}async setLocale(t){if(this.locale!==t){if(!this.translations[t])try{let n;if(t==="zh-CN")n=await Zp(()=>import("./zh-CN-Bi-pdXGV.js"),[],import.meta.url);else return;this.translations[t]=n[t.replace("-","_")]}catch(n){console.error(`Failed to load locale: ${t}`,n);return}this.locale=t,localStorage.setItem("openclaw.i18n.locale",t),this.notify()}}registerTranslation(t,n){this.translations[t]=n}subscribe(t){return this.subscribers.add(t),()=>this.subscribers.delete(t)}notify(){this.subscribers.forEach(t=>t(this.locale))}t(t,n){const i=t.split(".");let s=this.translations[this.locale]||this.translations.en;for(const o of i)if(s&&typeof s=="object")s=s[o];else{s=void 0;break}if(s===void 0&&this.locale!=="en"){s=this.translations.en;for(const o of i)if(s&&typeof s=="object")s=s[o];else{s=void 0;break}}return typeof s!="string"?t:n?s.replace(/\{(\w+)\}/g,(o,r)=>n[r]||`{${r}}`):s}}const bn=new ng,p=(e,t)=>bn.t(e,t);class ig{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){this.unsubscribe=bn.subscribe(()=>{this.host.requestUpdate()})}hostDisconnected(){var t;(t=this.unsubscribe)==null||t.call(this)}}async function Qe(e,t){if(!(!e.client||!e.connected)&&!e.channelsLoading){e.channelsLoading=!0,e.channelsError=null;try{const n=await e.client.request("channels.status",{probe:t,timeoutMs:8e3});e.channelsSnapshot=n,e.channelsLastSuccess=Date.now()}catch(n){e.channelsError=String(n)}finally{e.channelsLoading=!1}}}async function sg(e,t){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const n=await e.client.request("web.login.start",{force:t,timeoutMs:3e4});e.whatsappLoginMessage=n.message??null,e.whatsappLoginQrDataUrl=n.qrDataUrl??null,e.whatsappLoginConnected=null}catch(n){e.whatsappLoginMessage=String(n),e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function og(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const t=await e.client.request("web.login.wait",{timeoutMs:12e4});e.whatsappLoginMessage=t.message??null,e.whatsappLoginConnected=t.connected??null,t.connected&&(e.whatsappLoginQrDataUrl=null)}catch(t){e.whatsappLoginMessage=String(t),e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function rg(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{await e.client.request("channels.logout",{channel:"whatsapp"}),e.whatsappLoginMessage="Logged out.",e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}catch(t){e.whatsappLoginMessage=String(t)}finally{e.whatsappBusy=!1}}}function Ve(e){if(e)return Array.isArray(e.type)?e.type.filter(n=>n!=="null")[0]??e.type[0]:e.type}function Hu(e){if(!e)return"";if(e.default!==void 0)return e.default;switch(Ve(e)){case"object":return{};case"array":return[];case"boolean":return!1;case"number":case"integer":return 0;case"string":return"";default:return""}}function Aa(e){return e.filter(t=>typeof t=="string").join(".")}function Ge(e,t){const n=Aa(e),i=t[n];if(i)return i;const s=n.split(".");for(const[o,r]of Object.entries(t)){if(!o.includes("*"))continue;const a=o.split(".");if(a.length!==s.length)continue;let l=!0;for(let c=0;c<s.length;c+=1)if(a[c]!=="*"&&a[c]!==s[c]){l=!1;break}if(l)return r}}function Et(e){return e.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/\s+/g," ").replace(/^./,t=>t.toUpperCase())}function Zl(e,t){const n=e.trim();if(n==="")return;const i=Number(n);return!Number.isFinite(i)||t&&!Number.isInteger(i)?e:i}function ec(e){const t=e.trim();return t==="true"?!0:t==="false"?!1:e}function Lt(e,t){if(e==null)return e;if(t.allOf&&t.allOf.length>0){let i=e;for(const s of t.allOf)i=Lt(i,s);return i}const n=Ve(t);if(t.anyOf||t.oneOf){const i=(t.anyOf??t.oneOf??[]).filter(s=>!(s.type==="null"||Array.isArray(s.type)&&s.type.includes("null")));if(i.length===1)return Lt(e,i[0]);if(typeof e=="string")for(const s of i){const o=Ve(s);if(o==="number"||o==="integer"){const r=Zl(e,o==="integer");if(r===void 0||typeof r=="number")return r}if(o==="boolean"){const r=ec(e);if(typeof r=="boolean")return r}}for(const s of i){const o=Ve(s);if(o==="object"&&typeof e=="object"&&!Array.isArray(e)||o==="array"&&Array.isArray(e))return Lt(e,s)}return e}if(n==="number"||n==="integer"){if(typeof e=="string"){const i=Zl(e,n==="integer");if(i===void 0||typeof i=="number")return i}return e}if(n==="boolean"){if(typeof e=="string"){const i=ec(e);if(typeof i=="boolean")return i}return e}if(n==="object"){if(typeof e!="object"||Array.isArray(e))return e;const i=e,s=t.properties??{},o=t.additionalProperties&&typeof t.additionalProperties=="object"?t.additionalProperties:null,r={};for(const[a,l]of Object.entries(i)){const c=s[a]??o,d=c?Lt(l,c):l;d!==void 0&&(r[a]=d)}return r}if(n==="array"){if(!Array.isArray(e))return e;if(Array.isArray(t.items)){const s=t.items;return e.map((o,r)=>{const a=r<s.length?s[r]:void 0;return a?Lt(o,a):o})}const i=t.items;return i?e.map(s=>Lt(s,i)).filter(s=>s!==void 0):e}return e}function wn(e){return typeof structuredClone=="function"?structuredClone(e):JSON.parse(JSON.stringify(e))}function Hi(e){return`${JSON.stringify(e,null,2).trimEnd()}
`}function Uu(e,t,n){if(t.length===0)return;let i=e;for(let o=0;o<t.length-1;o+=1){const r=t[o],a=t[o+1];if(typeof r=="number"){if(!Array.isArray(i))return;i[r]==null&&(i[r]=typeof a=="number"?[]:{}),i=i[r]}else{if(typeof i!="object"||i==null)return;const l=i;l[r]==null&&(l[r]=typeof a=="number"?[]:{}),i=l[r]}}const s=t[t.length-1];if(typeof s=="number"){Array.isArray(i)&&(i[s]=n);return}typeof i=="object"&&i!=null&&(i[s]=n)}function ju(e,t){if(t.length===0)return;let n=e;for(let s=0;s<t.length-1;s+=1){const o=t[s];if(typeof o=="number"){if(!Array.isArray(n))return;n=n[o]}else{if(typeof n!="object"||n==null)return;n=n[o]}if(n==null)return}const i=t[t.length-1];if(typeof i=="number"){Array.isArray(n)&&n.splice(i,1);return}typeof n=="object"&&n!=null&&delete n[i]}async function yt(e){if(!(!e.client||!e.connected)){e.configLoading=!0,e.lastError=null;try{const t=await e.client.request("config.get",{});cg(e,t)}catch(t){e.lastError=String(t)}finally{e.configLoading=!1}}}async function ag(e){if(!(!e.client||!e.connected)&&!e.configSchemaLoading){e.configSchemaLoading=!0;try{const t=await e.client.request("config.schema",{});lg(e,t)}catch(t){e.lastError=String(t)}finally{e.configSchemaLoading=!1}}}function lg(e,t){e.configSchema=t.schema??null,e.configUiHints=t.uiHints??{},e.configSchemaVersion=t.version??null}function cg(e,t){e.configSnapshot=t;const n=typeof t.raw=="string"?t.raw:t.config&&typeof t.config=="object"?Hi(t.config):e.configRaw;!e.configFormDirty||e.configFormMode==="raw"?e.configRaw=n:e.configForm?e.configRaw=Hi(e.configForm):e.configRaw=n,e.configValid=typeof t.valid=="boolean"?t.valid:null,e.configIssues=Array.isArray(t.issues)?t.issues:[],e.configFormDirty||(e.configForm=wn(t.config??{}),e.configFormOriginal=wn(t.config??{}),e.configRawOriginal=n)}function dg(e){return!e||typeof e!="object"||Array.isArray(e)?null:e}function qu(e){if(e.configFormMode!=="form"||!e.configForm)return e.configRaw;const t=dg(e.configSchema),n=t?Lt(e.configForm,t):e.configForm;return Hi(n)}async function Ns(e){var t;if(!(!e.client||!e.connected)){e.configSaving=!0,e.lastError=null;try{const n=qu(e),i=(t=e.configSnapshot)==null?void 0:t.hash;if(!i){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.set",{raw:n,baseHash:i}),e.configFormDirty=!1,await yt(e)}catch(n){e.lastError=String(n)}finally{e.configSaving=!1}}}async function ug(e){var t;if(!(!e.client||!e.connected)){e.configApplying=!0,e.lastError=null;try{const n=qu(e),i=(t=e.configSnapshot)==null?void 0:t.hash;if(!i){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.apply",{raw:n,baseHash:i,sessionKey:e.applySessionKey}),e.configFormDirty=!1,await yt(e)}catch(n){e.lastError=String(n)}finally{e.configApplying=!1}}}async function hg(e){if(!(!e.client||!e.connected)){e.updateRunning=!0,e.lastError=null;try{await e.client.request("update.run",{sessionKey:e.applySessionKey})}catch(t){e.lastError=String(t)}finally{e.updateRunning=!1}}}function qe(e,t,n){var s;const i=wn(e.configForm??((s=e.configSnapshot)==null?void 0:s.config)??{});Uu(i,t,n),e.configForm=i,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=Hi(i))}function _t(e,t){var i;const n=wn(e.configForm??((i=e.configSnapshot)==null?void 0:i.config)??{});ju(n,t),e.configForm=n,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=Hi(n))}function fg(e){const t={name:(e==null?void 0:e.name)??"",displayName:(e==null?void 0:e.displayName)??"",about:(e==null?void 0:e.about)??"",picture:(e==null?void 0:e.picture)??"",banner:(e==null?void 0:e.banner)??"",website:(e==null?void 0:e.website)??"",nip05:(e==null?void 0:e.nip05)??"",lud16:(e==null?void 0:e.lud16)??""};return{values:t,original:{...t},saving:!1,importing:!1,error:null,success:null,fieldErrors:{},showAdvanced:!!(e!=null&&e.banner||e!=null&&e.website||e!=null&&e.nip05||e!=null&&e.lud16)}}async function pg(e,t){await sg(e,t),await Qe(e,!0)}async function gg(e){await og(e),await Qe(e,!0)}async function mg(e){await rg(e),await Qe(e,!0)}async function vg(e){await Ns(e),await yt(e),await Qe(e,!0)}async function yg(e){await yt(e),await Qe(e,!0)}function bg(e){if(!Array.isArray(e))return{};const t={};for(const n of e){if(typeof n!="string")continue;const[i,...s]=n.split(":");if(!i||s.length===0)continue;const o=i.trim(),r=s.join(":").trim();o&&r&&(t[o]=r)}return t}function Ku(e){var n,i,s;return((s=(((i=(n=e.channelsSnapshot)==null?void 0:n.channelAccounts)==null?void 0:i.nostr)??[])[0])==null?void 0:s.accountId)??e.nostrProfileAccountId??"default"}function Wu(e,t=""){return`/api/channels/nostr/${encodeURIComponent(e)}/profile${t}`}function wg(e){var s,o,r;const t=(r=(o=(s=e.hello)==null?void 0:s.auth)==null?void 0:o.deviceToken)==null?void 0:r.trim();if(t)return`Bearer ${t}`;const n=e.settings.token.trim();if(n)return`Bearer ${n}`;const i=e.password.trim();return i?`Bearer ${i}`:null}function Vu(e){const t=wg(e);return t?{Authorization:t}:{}}function xg(e,t,n){e.nostrProfileAccountId=t,e.nostrProfileFormState=fg(n??void 0)}function _g(e){e.nostrProfileFormState=null,e.nostrProfileAccountId=null}function kg(e,t,n){const i=e.nostrProfileFormState;i&&(e.nostrProfileFormState={...i,values:{...i.values,[t]:n},fieldErrors:{...i.fieldErrors,[t]:""}})}function $g(e){const t=e.nostrProfileFormState;t&&(e.nostrProfileFormState={...t,showAdvanced:!t.showAdvanced})}async function Sg(e){const t=e.nostrProfileFormState;if(!t||t.saving)return;const n=Ku(e);e.nostrProfileFormState={...t,saving:!0,error:null,success:null,fieldErrors:{}};try{const i=await fetch(Wu(n),{method:"PUT",headers:{"Content-Type":"application/json",...Vu(e)},body:JSON.stringify(t.values)}),s=await i.json().catch(()=>null);if(!i.ok||(s==null?void 0:s.ok)===!1||!s){const o=(s==null?void 0:s.error)??`Profile update failed (${i.status})`;e.nostrProfileFormState={...t,saving:!1,error:o,success:null,fieldErrors:bg(s==null?void 0:s.details)};return}if(!s.persisted){e.nostrProfileFormState={...t,saving:!1,error:"Profile publish failed on all relays.",success:null};return}e.nostrProfileFormState={...t,saving:!1,error:null,success:"Profile published to relays.",fieldErrors:{},original:{...t.values}},await Qe(e,!0)}catch(i){e.nostrProfileFormState={...t,saving:!1,error:`Profile update failed: ${String(i)}`,success:null}}}async function Ag(e){const t=e.nostrProfileFormState;if(!t||t.importing)return;const n=Ku(e);e.nostrProfileFormState={...t,importing:!0,error:null,success:null};try{const i=await fetch(Wu(n,"/import"),{method:"POST",headers:{"Content-Type":"application/json",...Vu(e)},body:JSON.stringify({autoMerge:!0})}),s=await i.json().catch(()=>null);if(!i.ok||(s==null?void 0:s.ok)===!1||!s){const l=(s==null?void 0:s.error)??`Profile import failed (${i.status})`;e.nostrProfileFormState={...t,importing:!1,error:l,success:null};return}const o=s.merged??s.imported??null,r=o?{...t.values,...o}:t.values,a=!!(r.banner||r.website||r.nip05||r.lud16);e.nostrProfileFormState={...t,importing:!1,values:r,error:null,success:s.saved?"Profile imported from relays. Review and publish.":"Profile imported. Review and publish.",showAdvanced:a},s.saved&&await Qe(e,!0)}catch(i){e.nostrProfileFormState={...t,importing:!1,error:`Profile import failed: ${String(i)}`,success:null}}}function Gu(e){var o;const t=(e??"").trim();if(!t)return null;const n=t.split(":").filter(Boolean);if(n.length<3||n[0]!=="agent")return null;const i=(o=n[1])==null?void 0:o.trim(),s=n.slice(2).join(":");return!i||!s?null:{agentId:i,rest:s}}const Dr=450;function Yi(e,t=!1,n=!1){e.chatScrollFrame&&cancelAnimationFrame(e.chatScrollFrame),e.chatScrollTimeout!=null&&(clearTimeout(e.chatScrollTimeout),e.chatScrollTimeout=null);const i=()=>{const s=e.querySelector(".chat-thread");if(s){const o=getComputedStyle(s).overflowY;if(o==="auto"||o==="scroll"||s.scrollHeight-s.clientHeight>1)return s}return document.scrollingElement??document.documentElement};e.updateComplete.then(()=>{e.chatScrollFrame=requestAnimationFrame(()=>{e.chatScrollFrame=null;const s=i();if(!s)return;const o=s.scrollHeight-s.scrollTop-s.clientHeight,r=t&&!e.chatHasAutoScrolled;if(!(r||e.chatUserNearBottom||o<Dr)){e.chatNewMessagesBelow=!0;return}r&&(e.chatHasAutoScrolled=!0);const l=n&&(typeof window>"u"||typeof window.matchMedia!="function"||!window.matchMedia("(prefers-reduced-motion: reduce)").matches),c=s.scrollHeight;typeof s.scrollTo=="function"?s.scrollTo({top:c,behavior:l?"smooth":"auto"}):s.scrollTop=c,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1;const d=r?150:120;e.chatScrollTimeout=window.setTimeout(()=>{e.chatScrollTimeout=null;const u=i();if(!u)return;const h=u.scrollHeight-u.scrollTop-u.clientHeight;(r||e.chatUserNearBottom||h<Dr)&&(u.scrollTop=u.scrollHeight,e.chatUserNearBottom=!0)},d)})})}function Qu(e,t=!1){e.logsScrollFrame&&cancelAnimationFrame(e.logsScrollFrame),e.updateComplete.then(()=>{e.logsScrollFrame=requestAnimationFrame(()=>{e.logsScrollFrame=null;const n=e.querySelector(".log-stream");if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;(t||i<80)&&(n.scrollTop=n.scrollHeight)})})}function Tg(e,t){const n=t.currentTarget;if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;e.chatUserNearBottom=i<Dr,e.chatUserNearBottom&&(e.chatNewMessagesBelow=!1)}function Cg(e,t){const n=t.currentTarget;if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;e.logsAtBottom=i<80}function tc(e){e.chatHasAutoScrolled=!1,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1}function Eg(e,t){if(e.length===0)return;const n=new Blob([`${e.join(`
`)}
`],{type:"text/plain"}),i=URL.createObjectURL(n),s=document.createElement("a"),o=new Date().toISOString().slice(0,19).replace(/[:T]/g,"-");s.href=i,s.download=`openclaw-logs-${t}-${o}.log`,s.click(),URL.revokeObjectURL(i)}function Rg(e){if(typeof ResizeObserver>"u")return;const t=e.querySelector(".topbar");if(!t)return;const n=()=>{const{height:i}=t.getBoundingClientRect();e.style.setProperty("--topbar-height",`${i}px`)};n(),e.topbarObserver=new ResizeObserver(()=>n()),e.topbarObserver.observe(t)}async function vo(e){if(!(!e.client||!e.connected)&&!e.debugLoading){e.debugLoading=!0;try{const[t,n,i,s]=await Promise.all([e.client.request("status",{}),e.client.request("health",{}),e.client.request("models.list",{}),e.client.request("last-heartbeat",{})]);e.debugStatus=t,e.debugHealth=n;const o=i;e.debugModels=Array.isArray(o==null?void 0:o.models)?o==null?void 0:o.models:[],e.debugHeartbeat=s}catch(t){e.debugCallError=String(t)}finally{e.debugLoading=!1}}}async function Lg(e){if(!(!e.client||!e.connected)){e.debugCallError=null,e.debugCallResult=null;try{const t=e.debugCallParams.trim()?JSON.parse(e.debugCallParams):{},n=await e.client.request(e.debugCallMethod.trim(),t);e.debugCallResult=JSON.stringify(n,null,2)}catch(t){e.debugCallError=String(t)}}}const Mg=2e3,Pg=new Set(["trace","debug","info","warn","error","fatal"]);function Dg(e){if(typeof e!="string")return null;const t=e.trim();if(!t.startsWith("{")||!t.endsWith("}"))return null;try{const n=JSON.parse(t);return!n||typeof n!="object"?null:n}catch{return null}}function Ig(e){if(typeof e!="string")return null;const t=e.toLowerCase();return Pg.has(t)?t:null}function Og(e){if(!e.trim())return{raw:e,message:e};try{const t=JSON.parse(e),n=t&&typeof t._meta=="object"&&t._meta!==null?t._meta:null,i=typeof t.time=="string"?t.time:typeof(n==null?void 0:n.date)=="string"?n==null?void 0:n.date:null,s=Ig((n==null?void 0:n.logLevelName)??(n==null?void 0:n.level)),o=typeof t[0]=="string"?t[0]:typeof(n==null?void 0:n.name)=="string"?n==null?void 0:n.name:null,r=Dg(o);let a=null;r&&(typeof r.subsystem=="string"?a=r.subsystem:typeof r.module=="string"&&(a=r.module)),!a&&o&&o.length<120&&(a=o);let l=null;return typeof t[1]=="string"?l=t[1]:!r&&typeof t[0]=="string"?l=t[0]:typeof t.message=="string"&&(l=t.message),{raw:e,time:i,level:s,subsystem:a,message:l??e,meta:n??void 0}}catch{return{raw:e,message:e}}}async function Ta(e,t){if(!(!e.client||!e.connected)&&!(e.logsLoading&&!(t!=null&&t.quiet))){t!=null&&t.quiet||(e.logsLoading=!0),e.logsError=null;try{const i=await e.client.request("logs.tail",{cursor:t!=null&&t.reset?void 0:e.logsCursor??void 0,limit:e.logsLimit,maxBytes:e.logsMaxBytes}),o=(Array.isArray(i.lines)?i.lines.filter(a=>typeof a=="string"):[]).map(Og),r=!!(t!=null&&t.reset||i.reset||e.logsCursor==null);e.logsEntries=r?o:[...e.logsEntries,...o].slice(-Mg),typeof i.cursor=="number"&&(e.logsCursor=i.cursor),typeof i.file=="string"&&(e.logsFile=i.file),e.logsTruncated=!!i.truncated,e.logsLastFetchAt=Date.now()}catch(n){e.logsError=String(n)}finally{t!=null&&t.quiet||(e.logsLoading=!1)}}}async function yo(e,t){if(!(!e.client||!e.connected)&&!e.nodesLoading){e.nodesLoading=!0,t!=null&&t.quiet||(e.lastError=null);try{const n=await e.client.request("node.list",{});e.nodes=Array.isArray(n.nodes)?n.nodes:[]}catch(n){t!=null&&t.quiet||(e.lastError=String(n))}finally{e.nodesLoading=!1}}}function Fg(e){e.nodesPollInterval==null&&(e.nodesPollInterval=window.setInterval(()=>void yo(e,{quiet:!0}),5e3))}function Ng(e){e.nodesPollInterval!=null&&(clearInterval(e.nodesPollInterval),e.nodesPollInterval=null)}function Ca(e){e.logsPollInterval==null&&(e.logsPollInterval=window.setInterval(()=>{e.tab==="logs"&&Ta(e,{quiet:!0})},2e3))}function Ea(e){e.logsPollInterval!=null&&(clearInterval(e.logsPollInterval),e.logsPollInterval=null)}function Ra(e){e.debugPollInterval==null&&(e.debugPollInterval=window.setInterval(()=>{e.tab==="debug"&&vo(e)},3e3))}function La(e){e.debugPollInterval!=null&&(clearInterval(e.debugPollInterval),e.debugPollInterval=null)}async function Yu(e,t){if(!(!e.client||!e.connected||e.agentIdentityLoading)&&!e.agentIdentityById[t]){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{const n=await e.client.request("agent.identity.get",{agentId:t});n&&(e.agentIdentityById={...e.agentIdentityById,[t]:n})}catch(n){e.agentIdentityError=String(n)}finally{e.agentIdentityLoading=!1}}}async function Xu(e,t){if(!e.client||!e.connected||e.agentIdentityLoading)return;const n=t.filter(i=>!e.agentIdentityById[i]);if(n.length!==0){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{for(const i of n){const s=await e.client.request("agent.identity.get",{agentId:i});s&&(e.agentIdentityById={...e.agentIdentityById,[i]:s})}}catch(i){e.agentIdentityError=String(i)}finally{e.agentIdentityLoading=!1}}}async function Bs(e,t){if(!(!e.client||!e.connected)&&!e.agentSkillsLoading){e.agentSkillsLoading=!0,e.agentSkillsError=null;try{const n=await e.client.request("skills.status",{agentId:t});n&&(e.agentSkillsReport=n,e.agentSkillsAgentId=t)}catch(n){e.agentSkillsError=String(n)}finally{e.agentSkillsLoading=!1}}}async function Ma(e){var t;if(!(!e.client||!e.connected)&&!e.agentsLoading){e.agentsLoading=!0,e.agentsError=null;try{const n=await e.client.request("agents.list",{});if(n){e.agentsList=n;const i=e.agentsSelectedId,s=n.agents.some(o=>o.id===i);(!i||!s)&&(e.agentsSelectedId=n.defaultId??((t=n.agents[0])==null?void 0:t.id)??null)}}catch(n){e.agentsError=String(n)}finally{e.agentsLoading=!1}}}function Pa(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}async function Bg(e){try{const n=await(await fetch(Pa(e.basePath,"/api/business-knowledge/dependent-files"))).json().catch(()=>({}));n.success&&n.data?e.bkDependentFiles={mapping_table:n.data.mapping_table??"",price_library:n.data.price_library??""}:e.bkDependentFiles=null}catch{e.bkDependentFiles=null}}async function Ju(e){e.bkLoading=!0,e.bkError=null,Bg(e);try{const t=await fetch(Pa(e.basePath,"/api/business-knowledge")),n=await t.json().catch(()=>({}));n.success&&n.data&&typeof n.data.content=="string"?e.bkContent=n.data.content:(e.bkContent="",t.ok||(e.bkError=n.detail??`HTTP ${t.status}`))}catch(t){e.bkError=t instanceof Error?t.message:String(t),e.bkContent=""}finally{e.bkLoading=!1}}async function zg(e,t){e.bkSaving=!0,e.bkError=null;try{const n=await fetch(Pa(e.basePath,"/api/business-knowledge"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:t})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(e.bkContent=t,e.bkLastSuccess=Date.now(),!0):(e.bkError=i.detail??`HTTP ${n.status}`,!1)}catch(n){return e.bkError=n instanceof Error?n.message:String(n),!1}finally{e.bkSaving=!1}}function Zu(e){if(e==null||!Number.isFinite(e))return"n/a";const t=Math.floor(e/1e3),n=Math.floor(t/60),i=Math.floor(n/60);return i>0?`${i}h`:n>0?`${n}m`:t>0?`${t}s`:"<1s"}function Cn(e){if(e==null||!Number.isFinite(e))return"n/a";const t=Date.now(),n=e-t,i=Math.abs(n),s=Math.floor(i/6e4),o=Math.floor(s/60),r=Math.floor(o/24);return n>0?s<1?"in <1m":s<60?`in ${s}m`:o<24?`in ${o}h`:`in ${r}d`:i<15e3?"just now":s<60?`${s}m ago`:o<24?`${o}h ago`:`${r}d ago`}function Hg(e,t){return!e||typeof e!="string"?"":e.replace(/<think>[\s\S]*?<\/think>/gi,"").trim()}function Qs(e){return!e&&e!==0?"n/a":new Date(e).toLocaleString()}function Ir(e){return!e||e.length===0?"none":e.filter(t=>!!(t&&t.trim())).join(", ")}function Or(e,t=120){return e.length<=t?e:`${e.slice(0,Math.max(0,t-1))}…`}function eh(e,t){return e.length<=t?{text:e,truncated:!1,total:e.length}:{text:e.slice(0,Math.max(0,t)),truncated:!0,total:e.length}}function nc(e,t){const n=Number(e);return Number.isFinite(n)?n:t}function Zo(e){return Hg(e)}async function th(e){if(!(!e.client||!e.connected))try{const t=await e.client.request("cron.status",{});e.cronStatus=t}catch(t){e.cronError=String(t)}}async function Ug(e){if(!(!e.client||!e.connected)&&!e.cronLoading){e.cronLoading=!0,e.cronError=null;try{const t=await e.client.request("cron.list",{includeDisabled:!0});e.cronJobs=Array.isArray(t.jobs)?t.jobs:[]}catch(t){e.cronError=String(t)}finally{e.cronLoading=!1}}}function er(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams;for(const[r,a]of Object.entries(n))o.set(r,String(a));return`${s}?${o.toString()}`}async function jg(e){e.dashboardLoading=!0,e.dashboardError=null;try{const[t,n,i]=await Promise.allSettled([fetch(er(e.basePath,"/api/quotation-drafts/stats",{days:7})),fetch(er(e.basePath,"/api/oos/by-time",{days:7})),fetch(er(e.basePath,"/api/shortage/by-time",{days:7}))]),s=[];if(t.status==="fulfilled"){const o=await t.value.json().catch(()=>({}));o.success&&o.data?e.quotationStats=o.data:(e.quotationStats=null,s.push(o.detail??`quotation/stats: ${t.value.status}`))}else e.quotationStats=null,s.push(`quotation/stats: ${String(t.reason)}`);if(n.status==="fulfilled"){const o=await n.value.json().catch(()=>({}));e.dashboardOosByTime=o.success&&Array.isArray(o.data)?o.data:[],o.success||s.push(o.detail??`oos/by-time: ${n.value.status}`)}else e.dashboardOosByTime=[],s.push(`oos/by-time: ${String(n.reason)}`);if(i.status==="fulfilled"){const o=await i.value.json().catch(()=>({}));e.dashboardShortageByTime=o.success&&Array.isArray(o.data)?o.data:[],o.success||s.push(o.detail??`shortage/by-time: ${i.value.status}`)}else e.dashboardShortageByTime=[],s.push(`shortage/by-time: ${String(i.reason)}`);e.dashboardError=s.length>0?s.join(" | "):null}catch(t){e.dashboardError=t instanceof Error?t.message:String(t),e.quotationStats=null,e.dashboardOosByTime=[],e.dashboardShortageByTime=[]}finally{e.dashboardLoading=!1}}class ye extends Error{constructor(t,n){super(`Invalid response schema from ${t}: ${n}`),this.name="ResponseSchemaError",this.endpoint=t}}function nh(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function ae(e,t,n="response"){if(!nh(e))throw new ye(t,`${n} must be an object`);return e}function Vt(e,t,n){if(!Array.isArray(e))throw new ye(t,`${n} must be an array`);return e}function Nt(e,t,n){if(typeof e!="string")throw new ye(t,`${n} must be a string`);return e}function bo(e,t,n){if(typeof e!="number"||Number.isNaN(e))throw new ye(t,`${n} must be a number`);return e}function K(e){return typeof e=="string"?e:void 0}function xe(e){return typeof e=="number"&&Number.isFinite(e)?e:void 0}function Da(e){return typeof e=="boolean"?e:void 0}function Le(e,t){return nh(e)?typeof e.detail=="string"&&e.detail.trim()?e.detail.trim():typeof e.error=="string"&&e.error.trim()?e.error.trim():typeof e.message=="string"&&e.message.trim()?e.message.trim():t:t}function he(e,t,n,i){return`${e}失败：${t}。影响：${n}。下一步：${i}`}const hs="/api/quotation-drafts",ic="/api/quotation-drafts/{id}",qg="/api/quotation-drafts/{id}/confirm",sc=new WeakMap;function Kg(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams(n);return`${s}?${o.toString()}`}function Wg(e,t){var s;const n=globalThis,i=typeof((s=n.crypto)==null?void 0:s.randomUUID)=="function"?n.crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2,10)}`;return`${e}:${t}:${i}`}function Vg(e){let t=sc.get(e);return t||(t=new Map,sc.set(e,t)),t}function ih(e,t){const n=ae(e,t,"data[]"),s=xe(n.id)??Number(n.id);return{id:Number.isFinite(s)?s:0,draft_no:Nt(n.draft_no,t,"data[].draft_no"),name:Nt(n.name,t,"data[].name"),source:K(n.source),file_path:typeof n.file_path=="string"?n.file_path:null,created_at:K(n.created_at)??null,status:Nt(n.status,t,"data[].status"),confirmed_at:K(n.confirmed_at)??null}}function Gg(e,t){const n=ae(e,t,"data"),i=ih(n,t),o=Vt(n.lines,t,"data.lines").map(r=>{const a=ae(r,t,"data.lines[]"),l=xe(a.warehouse_qty),c=xe(a.available_qty);return{...a,warehouse_qty:l??c??null}});return{...i,lines:o}}function Qg(e,t){const n=ae(e,t),i=n.data!=null?ae(n.data,t,"data"):{},s=K(i.order_id)??K(n.order_id),o=K(i.message)??K(n.message)??"已确认成单";return{order_id:s,message:o}}async function Ia(e){e.fulfillDraftsLoading=!0,e.fulfillDraftsError=null;try{const t=Kg(e.basePath,hs,{status:"pending",limit:"50"}),n=await fetch(t),i=await n.json().catch(()=>({}));if(!n.ok){e.fulfillDraftsError=he("加载待确认报价单列表",Le(i,`HTTP ${n.status}`),"无法查看最新待确认报价单","点击“重试”重新加载列表"),e.fulfillDrafts=[];return}const s=ae(i,hs),o=Vt(s.data,hs,"data");e.fulfillDrafts=o.map(r=>ih(r,hs)).filter(r=>r.id>0)}catch(t){const n=t instanceof ye||t instanceof Error?t.message:String(t);e.fulfillDraftsError=he("加载待确认报价单列表",n,"列表可能为空或字段错位","检查后端返回字段后重试"),e.fulfillDrafts=[]}finally{e.fulfillDraftsLoading=!1}}async function Yg(e,t){var n;e.fulfillDetailId=t;try{const i=(n=e.basePath)!=null&&n.trim()?`${e.basePath.replace(/\/$/,"")}/api/quotation-drafts/${t}`:`/api/quotation-drafts/${t}`,s=await fetch(i),o=await s.json().catch(()=>({}));if(!s.ok){e.fulfillDetail=null,e.fulfillConfirmResult={message:he("加载报价单详情",Le(o,`HTTP ${s.status}`),"无法确认该报价单","点击“重试”或返回列表后重选")};return}const r=ae(o,ic);e.fulfillDetail=Gg(r.data,ic)}catch(i){const s=i instanceof ye||i instanceof Error?i.message:String(i);e.fulfillDetail=null,e.fulfillConfirmResult={message:he("加载报价单详情",s,"无法确认该报价单","点击“重试”或返回列表后重选")}}}async function Xg(e,t){const n=Vg(e),i=n.get(t);if(i)return i;const s=(async()=>{var o;e.fulfillConfirmBusy=!0,e.fulfillConfirmResult=null;try{const r=(o=e.basePath)!=null&&o.trim()?`${e.basePath.replace(/\/$/,"")}/api/quotation-drafts/${t}/confirm`:`/api/quotation-drafts/${t}/confirm`,a=Wg("fulfill-confirm",String(t)),l=await fetch(r,{method:"PATCH",headers:{"X-Idempotency-Key":a,"Idempotency-Key":a}}),c=await l.json().catch(()=>({}));if(!l.ok)return e.fulfillConfirmResult={message:he("确认成单",Le(c,`HTTP ${l.status}`),"该报价单仍为待确认，库存未锁定","点击“重试”再次确认")},e.fulfillConfirmResult;const d=Qg(c,qg);return e.fulfillConfirmResult=d,e.fulfillDetail=null,e.fulfillDetailId=null,await Ia(e),d}catch(r){const a=r instanceof ye||r instanceof Error?r.message:String(r);return e.fulfillConfirmResult={message:he("确认成单",a,"该报价单仍为待确认，库存未锁定","点击“重试”再次确认")},e.fulfillConfirmResult}finally{e.fulfillConfirmBusy=!1,n.delete(t)}})();return n.set(t,s),s}function Je(e){return`${e.product_key??""}	${e.specification??""}	${e.code??""}`}const fs="/api/shortage/list",Ai="/api/procurement/approve",pe="/api/replenishment-drafts",oc=new WeakMap;function Jg(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams(n);return`${s}?${o.toString()}`}function Zg(e,t){var s;const n=globalThis,i=typeof((s=n.crypto)==null?void 0:s.randomUUID)=="function"?n.crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2,10)}`;return`${e}:${t}:${i}`}function em(e){let t=oc.get(e);return t||(t=new Map,oc.set(e,t)),t}function gt(e){const t=xe(e);if(t!=null)return t;const n=Number(e);return Number.isFinite(n)?n:void 0}function tm(e,t){const n=ae(e,t,"data[]");return{id:gt(n.id),product_name:K(n.product_name),specification:K(n.specification),quantity:gt(n.quantity),available_qty:gt(n.available_qty),shortfall:gt(n.shortfall),code:K(n.code),quote_name:K(n.quote_name),unit_price:gt(n.unit_price),file_name:K(n.file_name),uploaded_at:K(n.uploaded_at)??null,product_key:K(n.product_key),count:gt(n.count)}}function nm(e){const t=new Map;for(const n of e){const i=Je(n);if(!i.trim())continue;const s=t.get(i);if(!s){t.set(i,n);continue}const o=Number(s.count??0),r=Number(n.count??0),a=s.uploaded_at?new Date(s.uploaded_at).getTime():0,l=n.uploaded_at?new Date(n.uploaded_at).getTime():0;(r>o||r===o&&l>=a)&&t.set(i,n)}return Array.from(t.values())}function im(e){const t=ae(e,Ai),n=t.data!=null?ae(t.data,Ai,"data"):{},i=xe(t.approved_count)??xe(n.approved_count)??(t.approved_count!=null?bo(t.approved_count,Ai,"approved_count"):void 0),s=K(t.message)??K(n.message)??"已批准并通知采购员。";return{approved_count:i,message:s}}function sm(e){return e.map(n=>`${n.product_key??""}|${n.product_name??""}|${n.specification??""}|${n.code??""}|${n.shortfall??0}`).sort().join(";")}async function Oa(e){e.procurementLoading=!0,e.procurementError=null;try{const t=Jg(e.basePath,fs,{limit:"200",unapproved_only:"1"}),n=await fetch(t),i=await n.json().catch(()=>({}));if(!n.ok){e.procurementError=he("加载采购建议列表",Le(i,`HTTP ${n.status}`),"无法查看最新缺货采购建议","点击“重试”重新加载列表"),e.procurementSuggestions=[];return}const s=ae(i,fs),o=Vt(s.data,fs,"data");e.procurementSuggestions=nm(o.map(r=>tm(r,fs)))}catch(t){const n=t instanceof ye||t instanceof Error?t.message:String(t);e.procurementError=he("加载采购建议列表",n,"列表可能为空或字段错位","检查后端返回字段后重试"),e.procurementSuggestions=[]}finally{e.procurementLoading=!1}}async function rc(e,t){if(!t.length)return null;const n=sm(t),i=em(e),s=i.get(n);if(s)return s;const o=(async()=>{var r;e.procurementApproveBusy=!0,e.procurementApproveResult=null;try{const a=(r=e.basePath)!=null&&r.trim()?`${e.basePath.replace(/\/$/,"")}${Ai}`:Ai,l=Zg("procurement-approve",n||"single"),c=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json","X-Idempotency-Key":l,"Idempotency-Key":l},body:JSON.stringify({items:t})}),d=await c.json().catch(()=>({}));if(!c.ok)return e.procurementApproveResult={message:he("采购批准",Le(d,`HTTP ${c.status}`),"这些缺货项仍待批准，采购员未收到通知","点击“重试”再次批准")},e.procurementApproveResult;const u=im(d);return e.procurementApproveResult=u,await Oa(e),u}catch(a){const l=a instanceof ye||a instanceof Error?a.message:String(a);return e.procurementApproveResult={message:he("采购批准",l,"这些缺货项仍待批准，采购员未收到通知","点击“重试”再次批准")},e.procurementApproveResult}finally{e.procurementApproveBusy=!1,i.delete(n)}})();return i.set(n,o),o}async function Xi(e){var t;e.replenishmentLoading=!0,e.replenishmentError=null;try{const n=(t=e.basePath)!=null&&t.trim()?e.basePath.replace(/\/$/,""):"",i=n?`${n}${pe}`:pe,s=await fetch(i),o=await s.json().catch(()=>({}));if(!s.ok){e.replenishmentError=he("加载补货单列表",Le(o,`HTTP ${s.status}`),"无法查看补货单列表","点击“重试”重新加载列表"),e.replenishmentDrafts=[];return}const r=ae(o,pe),a=Vt(r.data,pe,"data");e.replenishmentDrafts=a.map(l=>{const c=ae(l,pe,"data[]");return{id:bo(c.id,pe,"id"),draft_no:K(c.draft_no)??"",name:K(c.name)??"",source:K(c.source)??void 0,created_at:K(c.created_at),status:K(c.status)??"",confirmed_at:K(c.confirmed_at)}})}catch(n){const i=n instanceof ye||n instanceof Error?n.message:String(n);e.replenishmentError=he("加载补货单列表",i,"补货单列表可能为空或字段错位","检查后端返回字段后重试"),e.replenishmentDrafts=[]}finally{e.replenishmentLoading=!1}}async function om(e,t){var n;e.replenishmentLoading=!0,e.replenishmentError=null;try{const i=(n=e.basePath)!=null&&n.trim()?e.basePath.replace(/\/$/,""):"",s=i?`${i}${pe}/${t}`:`${pe}/${t}`,o=await fetch(s),r=await o.json().catch(()=>({}));if(!o.ok){e.replenishmentError=he("加载补货单详情",Le(r,`HTTP ${o.status}`),"无法查看补货单详情","稍后重试"),e.replenishmentDetail=null,e.replenishmentDetailId=null;return}const a=ae(r,pe,"detail"),l=ae(a.data,pe,"data"),d=Vt(l.lines,pe,"data.lines").map(u=>{const h=ae(u,pe,"data.lines[]");return{id:gt(h.id),row_index:gt(h.row_index),code:K(h.code),product_name:K(h.product_name),specification:K(h.specification),quantity:gt(h.quantity)??0,current_qty:gt(h.current_qty),memo:K(h.memo)}});e.replenishmentDetail={id:bo(l.id,pe,"id"),draft_no:K(l.draft_no)??"",name:K(l.name)??"",source:K(l.source)??void 0,created_at:K(l.created_at),status:K(l.status)??"",confirmed_at:K(l.confirmed_at),lines:d},e.replenishmentDetailId=e.replenishmentDetail.id}catch(i){const s=i instanceof ye||i instanceof Error?i.message:String(i);e.replenishmentError=he("加载补货单详情",s,"无法查看补货单详情","稍后重试"),e.replenishmentDetail=null,e.replenishmentDetailId=null}finally{e.replenishmentLoading=!1}}async function rm(e,t){var u;const n=t.filter(h=>{const g=typeof h.product_or_code=="string"?h.product_or_code.trim():"",v=Number(h.quantity);return g.length>0&&v>0});if(n.length===0)return null;const i={lines:n.map(h=>({product_or_code:typeof h.product_or_code=="string"?h.product_or_code.trim():"",quantity:Number(h.quantity)}))},s=(u=e.basePath)!=null&&u.trim()?e.basePath.replace(/\/$/,""):"",o=s?`${s}${pe}`:pe,r=await fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}),a=await r.json().catch(()=>({}));if(!r.ok)return e.replenishmentError=he("生成补货单",Le(a,`HTTP ${r.status}`),"补货单未创建","请检查输入后重试"),null;const l=ae(a,pe),c=l.data!=null?ae(l.data,pe,"data"):{},d=bo(c.id,pe,"data.id");return await Xi(e),{id:d}}async function am(e,t){var n;e.replenishmentConfirmBusy=!0,e.replenishmentConfirmResult=null;try{const i=(n=e.basePath)!=null&&n.trim()?e.basePath.replace(/\/$/,""):"",s=i?`${i}${pe}/${t}/confirm`:`${pe}/${t}/confirm`,o=await fetch(s,{method:"PATCH"}),r=await o.json().catch(()=>({}));if(!o.ok){e.replenishmentConfirmResult={message:he("确认补货单",Le(r,`HTTP ${o.status}`),"补货未执行","稍后重试")};return}const a=ae(r,pe,"confirm"),l=ae(a.data,pe,"data"),c=xe(l.executed),d=K(l.message);e.replenishmentConfirmResult={executed:c??void 0,message:d||`已执行 ${c??0} 条补货操作。`},await Xi(e)}catch(i){const s=i instanceof ye||i instanceof Error?i.message:String(i);e.replenishmentConfirmResult={message:he("确认补货单",s,"补货未执行","稍后重试")}}finally{e.replenishmentConfirmBusy=!1}}async function lm(e,t){var o;const n=(o=e.basePath)!=null&&o.trim()?e.basePath.replace(/\/$/,""):"",i=n?`${n}${pe}/${t}`:`${pe}/${t}`,s=await fetch(i,{method:"DELETE"});if(!s.ok){const r=await s.json().catch(()=>({}));return e.replenishmentError=he("删除补货单",Le(r,`HTTP ${s.status}`),"补货单未删除","请重试"),!1}return e.replenishmentDetailId===t&&(e.replenishmentDetail=null,e.replenishmentDetailId=null),await Xi(e),!0}function Fa(e){return(e??"").trim().toLowerCase()||"viewer"}function cm(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").map(t=>t.trim()).filter(Boolean):[]}const sh="openclaw.device.auth.v1";function Na(){try{const e=window.localStorage.getItem(sh);if(!e)return null;const t=JSON.parse(e);return!t||t.version!==1||!t.deviceId||typeof t.deviceId!="string"||!t.tokens||typeof t.tokens!="object"?null:t}catch{return null}}function oh(e){try{window.localStorage.setItem(sh,JSON.stringify(e))}catch{}}function dm(e){const t=Na();if(!t||t.deviceId!==e.deviceId)return null;const n=Fa(e.role),i=t.tokens[n];return!i||typeof i.token!="string"?null:i}function rh(e){const t=Fa(e.role),n={version:1,deviceId:e.deviceId,tokens:{}},i=Na();i&&i.deviceId===e.deviceId&&(n.tokens={...i.tokens});const s={token:e.token,role:t,scopes:cm(e.scopes),updatedAtMs:Date.now()};return n.tokens[t]=s,oh(n),s}function ah(e){const t=Na();if(!t||t.deviceId!==e.deviceId)return;const n=Fa(e.role);if(!t.tokens[n])return;const i={...t,tokens:{...t.tokens}};delete i.tokens[n],oh(i)}/*! noble-ed25519 - MIT License (c) 2019 Paul Miller (paulmillr.com) */const lh={p:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffedn,n:0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn,h:8n,a:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffecn,d:0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3n,Gx:0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an,Gy:0x6666666666666666666666666666666666666666666666666666666666666658n},{p:Ee,n:zs,Gx:ac,Gy:lc,a:tr,d:nr,h:um}=lh,xn=32,Ba=64,hm=(...e)=>{"captureStackTrace"in Error&&typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(...e)},_e=(e="")=>{const t=new Error(e);throw hm(t,_e),t},fm=e=>typeof e=="bigint",pm=e=>typeof e=="string",gm=e=>e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array",Gt=(e,t,n="")=>{const i=gm(e),s=e==null?void 0:e.length,o=t!==void 0;if(!i||o&&s!==t){const r=n&&`"${n}" `,a=o?` of length ${t}`:"",l=i?`length=${s}`:`type=${typeof e}`;_e(r+"expected Uint8Array"+a+", got "+l)}return e},wo=e=>new Uint8Array(e),ch=e=>Uint8Array.from(e),dh=(e,t)=>e.toString(16).padStart(t,"0"),uh=e=>Array.from(Gt(e)).map(t=>dh(t,2)).join(""),kt={_0:48,_9:57,A:65,F:70,a:97,f:102},cc=e=>{if(e>=kt._0&&e<=kt._9)return e-kt._0;if(e>=kt.A&&e<=kt.F)return e-(kt.A-10);if(e>=kt.a&&e<=kt.f)return e-(kt.a-10)},hh=e=>{const t="hex invalid";if(!pm(e))return _e(t);const n=e.length,i=n/2;if(n%2)return _e(t);const s=wo(i);for(let o=0,r=0;o<i;o++,r+=2){const a=cc(e.charCodeAt(r)),l=cc(e.charCodeAt(r+1));if(a===void 0||l===void 0)return _e(t);s[o]=a*16+l}return s},fh=()=>globalThis==null?void 0:globalThis.crypto,mm=()=>{var e;return((e=fh())==null?void 0:e.subtle)??_e("crypto.subtle must be defined, consider polyfill")},Ui=(...e)=>{const t=wo(e.reduce((i,s)=>i+Gt(s).length,0));let n=0;return e.forEach(i=>{t.set(i,n),n+=i.length}),t},vm=(e=xn)=>fh().getRandomValues(wo(e)),Ys=BigInt,on=(e,t,n,i="bad number: out of range")=>fm(e)&&t<=e&&e<n?e:_e(i),z=(e,t=Ee)=>{const n=e%t;return n>=0n?n:t+n},ph=e=>z(e,zs),ym=(e,t)=>{(e===0n||t<=0n)&&_e("no inverse n="+e+" mod="+t);let n=z(e,t),i=t,s=0n,o=1n;for(;n!==0n;){const r=i/n,a=i%n,l=s-o*r;i=n,n=a,s=o,o=l}return i===1n?z(s,t):_e("no inverse")},bm=e=>{const t=yh[e];return typeof t!="function"&&_e("hashes."+e+" not set"),t},ir=e=>e instanceof _n?e:_e("Point expected"),Fr=2n**256n,ft=class ft{constructor(t,n,i,s){B(this,"X");B(this,"Y");B(this,"Z");B(this,"T");const o=Fr;this.X=on(t,0n,o),this.Y=on(n,0n,o),this.Z=on(i,1n,o),this.T=on(s,0n,o),Object.freeze(this)}static CURVE(){return lh}static fromAffine(t){return new ft(t.x,t.y,1n,z(t.x*t.y))}static fromBytes(t,n=!1){const i=nr,s=ch(Gt(t,xn)),o=t[31];s[31]=o&-129;const r=mh(s);on(r,0n,n?Fr:Ee);const l=z(r*r),c=z(l-1n),d=z(i*l+1n);let{isValid:u,value:h}=xm(c,d);u||_e("bad point: y not sqrt");const g=(h&1n)===1n,v=(o&128)!==0;return!n&&h===0n&&v&&_e("bad point: x==0, isLastByteOdd"),v!==g&&(h=z(-h)),new ft(h,r,1n,z(h*r))}static fromHex(t,n){return ft.fromBytes(hh(t),n)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}assertValidity(){const t=tr,n=nr,i=this;if(i.is0())return _e("bad point: ZERO");const{X:s,Y:o,Z:r,T:a}=i,l=z(s*s),c=z(o*o),d=z(r*r),u=z(d*d),h=z(l*t),g=z(d*z(h+c)),v=z(u+z(n*z(l*c)));if(g!==v)return _e("bad point: equation left != right (1)");const b=z(s*o),y=z(r*a);return b!==y?_e("bad point: equation left != right (2)"):this}equals(t){const{X:n,Y:i,Z:s}=this,{X:o,Y:r,Z:a}=ir(t),l=z(n*a),c=z(o*s),d=z(i*a),u=z(r*s);return l===c&&d===u}is0(){return this.equals(zn)}negate(){return new ft(z(-this.X),this.Y,this.Z,z(-this.T))}double(){const{X:t,Y:n,Z:i}=this,s=tr,o=z(t*t),r=z(n*n),a=z(2n*z(i*i)),l=z(s*o),c=t+n,d=z(z(c*c)-o-r),u=l+r,h=u-a,g=l-r,v=z(d*h),b=z(u*g),y=z(d*g),A=z(h*u);return new ft(v,b,A,y)}add(t){const{X:n,Y:i,Z:s,T:o}=this,{X:r,Y:a,Z:l,T:c}=ir(t),d=tr,u=nr,h=z(n*r),g=z(i*a),v=z(o*u*c),b=z(s*l),y=z((n+i)*(r+a)-h-g),A=z(b-v),E=z(b+v),R=z(g-d*h),k=z(y*A),T=z(E*R),M=z(y*R),m=z(A*E);return new ft(k,T,m,M)}subtract(t){return this.add(ir(t).negate())}multiply(t,n=!0){if(!n&&(t===0n||this.is0()))return zn;if(on(t,1n,zs),t===1n)return this;if(this.equals(kn))return Mm(t).p;let i=zn,s=kn;for(let o=this;t>0n;o=o.double(),t>>=1n)t&1n?i=i.add(o):n&&(s=s.add(o));return i}multiplyUnsafe(t){return this.multiply(t,!1)}toAffine(){const{X:t,Y:n,Z:i}=this;if(this.equals(zn))return{x:0n,y:1n};const s=ym(i,Ee);z(i*s)!==1n&&_e("invalid inverse");const o=z(t*s),r=z(n*s);return{x:o,y:r}}toBytes(){const{x:t,y:n}=this.assertValidity().toAffine(),i=gh(n);return i[31]|=t&1n?128:0,i}toHex(){return uh(this.toBytes())}clearCofactor(){return this.multiply(Ys(um),!1)}isSmallOrder(){return this.clearCofactor().is0()}isTorsionFree(){let t=this.multiply(zs/2n,!1).double();return zs%2n&&(t=t.add(this)),t.is0()}};B(ft,"BASE"),B(ft,"ZERO");let _n=ft;const kn=new _n(ac,lc,1n,z(ac*lc)),zn=new _n(0n,1n,1n,0n);_n.BASE=kn;_n.ZERO=zn;const gh=e=>hh(dh(on(e,0n,Fr),Ba)).reverse(),mh=e=>Ys("0x"+uh(ch(Gt(e)).reverse())),at=(e,t)=>{let n=e;for(;t-- >0n;)n*=n,n%=Ee;return n},wm=e=>{const n=e*e%Ee*e%Ee,i=at(n,2n)*n%Ee,s=at(i,1n)*e%Ee,o=at(s,5n)*s%Ee,r=at(o,10n)*o%Ee,a=at(r,20n)*r%Ee,l=at(a,40n)*a%Ee,c=at(l,80n)*l%Ee,d=at(c,80n)*l%Ee,u=at(d,10n)*o%Ee;return{pow_p_5_8:at(u,2n)*e%Ee,b2:n}},dc=0x2b8324804fc1df0b2b4d00993dfbd7a72f431806ad2fe478c4ee1b274a0ea0b0n,xm=(e,t)=>{const n=z(t*t*t),i=z(n*n*t),s=wm(e*i).pow_p_5_8;let o=z(e*n*s);const r=z(t*o*o),a=o,l=z(o*dc),c=r===e,d=r===z(-e),u=r===z(-e*dc);return c&&(o=a),(d||u)&&(o=l),(z(o)&1n)===1n&&(o=z(-o)),{isValid:c||d,value:o}},Nr=e=>ph(mh(e)),za=(...e)=>yh.sha512Async(Ui(...e)),_m=(...e)=>bm("sha512")(Ui(...e)),vh=e=>{const t=e.slice(0,xn);t[0]&=248,t[31]&=127,t[31]|=64;const n=e.slice(xn,Ba),i=Nr(t),s=kn.multiply(i),o=s.toBytes();return{head:t,prefix:n,scalar:i,point:s,pointBytes:o}},Ha=e=>za(Gt(e,xn)).then(vh),km=e=>vh(_m(Gt(e,xn))),$m=e=>Ha(e).then(t=>t.pointBytes),Sm=e=>za(e.hashable).then(e.finish),Am=(e,t,n)=>{const{pointBytes:i,scalar:s}=e,o=Nr(t),r=kn.multiply(o).toBytes();return{hashable:Ui(r,i,n),finish:c=>{const d=ph(o+Nr(c)*s);return Gt(Ui(r,gh(d)),Ba)}}},Tm=async(e,t)=>{const n=Gt(e),i=await Ha(t),s=await za(i.prefix,n);return Sm(Am(i,s,n))},yh={sha512Async:async e=>{const t=mm(),n=Ui(e);return wo(await t.digest("SHA-512",n.buffer))},sha512:void 0},Cm=(e=vm(xn))=>e,Em={getExtendedPublicKeyAsync:Ha,getExtendedPublicKey:km,randomSecretKey:Cm},Xs=8,Rm=256,bh=Math.ceil(Rm/Xs)+1,Br=2**(Xs-1),Lm=()=>{const e=[];let t=kn,n=t;for(let i=0;i<bh;i++){n=t,e.push(n);for(let s=1;s<Br;s++)n=n.add(t),e.push(n);t=n.double()}return e};let uc;const hc=(e,t)=>{const n=t.negate();return e?n:t},Mm=e=>{const t=uc||(uc=Lm());let n=zn,i=kn;const s=2**Xs,o=s,r=Ys(s-1),a=Ys(Xs);for(let l=0;l<bh;l++){let c=Number(e&r);e>>=a,c>Br&&(c-=o,e+=1n);const d=l*Br,u=d,h=d+Math.abs(c)-1,g=l%2!==0,v=c<0;c===0?i=i.add(hc(g,t[u])):n=n.add(hc(v,t[h]))}return e!==0n&&_e("invalid wnaf"),{p:n,f:i}},sr="openclaw-device-identity-v1";function zr(e){let t="";for(const n of e)t+=String.fromCharCode(n);return btoa(t).replaceAll("+","-").replaceAll("/","_").replace(/=+$/g,"")}function wh(e){const t=e.replaceAll("-","+").replaceAll("_","/"),n=t+"=".repeat((4-t.length%4)%4),i=atob(n),s=new Uint8Array(i.length);for(let o=0;o<i.length;o+=1)s[o]=i.charCodeAt(o);return s}function Pm(e){return Array.from(e).map(t=>t.toString(16).padStart(2,"0")).join("")}async function xh(e){const t=await crypto.subtle.digest("SHA-256",e.slice().buffer);return Pm(new Uint8Array(t))}async function Dm(){const e=Em.randomSecretKey(),t=await $m(e);return{deviceId:await xh(t),publicKey:zr(t),privateKey:zr(e)}}async function Ua(){try{const n=localStorage.getItem(sr);if(n){const i=JSON.parse(n);if((i==null?void 0:i.version)===1&&typeof i.deviceId=="string"&&typeof i.publicKey=="string"&&typeof i.privateKey=="string"){const s=await xh(wh(i.publicKey));if(s!==i.deviceId){const o={...i,deviceId:s};return localStorage.setItem(sr,JSON.stringify(o)),{deviceId:s,publicKey:i.publicKey,privateKey:i.privateKey}}return{deviceId:i.deviceId,publicKey:i.publicKey,privateKey:i.privateKey}}}}catch{}const e=await Dm(),t={version:1,deviceId:e.deviceId,publicKey:e.publicKey,privateKey:e.privateKey,createdAtMs:Date.now()};return localStorage.setItem(sr,JSON.stringify(t)),e}async function Im(e,t){const n=wh(e),i=new TextEncoder().encode(t),s=await Tm(i,n);return zr(s)}async function Qt(e,t){if(!(!e.client||!e.connected)&&!e.devicesLoading){e.devicesLoading=!0,t!=null&&t.quiet||(e.devicesError=null);try{const n=await e.client.request("device.pair.list",{});e.devicesList={pending:Array.isArray(n==null?void 0:n.pending)?n.pending:[],paired:Array.isArray(n==null?void 0:n.paired)?n.paired:[]}}catch(n){t!=null&&t.quiet||(e.devicesError=String(n))}finally{e.devicesLoading=!1}}}async function Om(e,t){if(!(!e.client||!e.connected))try{await e.client.request("device.pair.approve",{requestId:t}),await Qt(e)}catch(n){e.devicesError=String(n)}}async function Fm(e,t){if(!(!e.client||!e.connected||!window.confirm("Reject this device pairing request?")))try{await e.client.request("device.pair.reject",{requestId:t}),await Qt(e)}catch(i){e.devicesError=String(i)}}async function Nm(e,t){if(!(!e.client||!e.connected))try{const n=await e.client.request("device.token.rotate",t);if(n!=null&&n.token){const i=await Ua(),s=n.role??t.role;(n.deviceId===i.deviceId||t.deviceId===i.deviceId)&&rh({deviceId:i.deviceId,role:s,token:n.token,scopes:n.scopes??t.scopes??[]}),window.prompt("New device token (copy and store securely):",n.token)}await Qt(e)}catch(n){e.devicesError=String(n)}}async function Bm(e,t){if(!(!e.client||!e.connected||!window.confirm(`Revoke token for ${t.deviceId} (${t.role})?`)))try{await e.client.request("device.token.revoke",t);const i=await Ua();t.deviceId===i.deviceId&&ah({deviceId:i.deviceId,role:t.role}),await Qt(e)}catch(i){e.devicesError=String(i)}}function zm(e){if(!e||e.kind==="gateway")return{method:"exec.approvals.get",params:{}};const t=e.nodeId.trim();return t?{method:"exec.approvals.node.get",params:{nodeId:t}}:null}function Hm(e,t){if(!e||e.kind==="gateway")return{method:"exec.approvals.set",params:t};const n=e.nodeId.trim();return n?{method:"exec.approvals.node.set",params:{...t,nodeId:n}}:null}async function ja(e,t){if(!(!e.client||!e.connected)&&!e.execApprovalsLoading){e.execApprovalsLoading=!0,e.lastError=null;try{const n=zm(t);if(!n){e.lastError="Select a node before loading exec approvals.";return}const i=await e.client.request(n.method,n.params);Um(e,i)}catch(n){e.lastError=String(n)}finally{e.execApprovalsLoading=!1}}}function Um(e,t){e.execApprovalsSnapshot=t,e.execApprovalsDirty||(e.execApprovalsForm=wn(t.file??{}))}async function jm(e,t){var n,i;if(!(!e.client||!e.connected)){e.execApprovalsSaving=!0,e.lastError=null;try{const s=(n=e.execApprovalsSnapshot)==null?void 0:n.hash;if(!s){e.lastError="Exec approvals hash missing; reload and retry.";return}const o=e.execApprovalsForm??((i=e.execApprovalsSnapshot)==null?void 0:i.file)??{},r=Hm(t,{file:o,baseHash:s});if(!r){e.lastError="Select a node before saving exec approvals.";return}await e.client.request(r.method,r.params),e.execApprovalsDirty=!1,await ja(e,t)}catch(s){e.lastError=String(s)}finally{e.execApprovalsSaving=!1}}}function qm(e,t,n){var s;const i=wn(e.execApprovalsForm??((s=e.execApprovalsSnapshot)==null?void 0:s.file)??{});Uu(i,t,n),e.execApprovalsForm=i,e.execApprovalsDirty=!0}function Km(e,t){var i;const n=wn(e.execApprovalsForm??((i=e.execApprovalsSnapshot)==null?void 0:i.file)??{});ju(n,t),e.execApprovalsForm=n,e.execApprovalsDirty=!0}function He(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams;for(const[r,a]of Object.entries(n))o.set(r,String(a));return`${s}?${o.toString()}`}async function xo(e,t){e.oosLoading=!0,e.oosError=null;try{const[s,o,r,a]=await Promise.all([fetch(He(e.basePath,"/api/oos/stats")),fetch(He(e.basePath,"/api/oos/list",{limit:100})),fetch(He(e.basePath,"/api/oos/by-file",{limit:50})),fetch(He(e.basePath,"/api/oos/by-time",{days:30}))]),l=await s.json().catch(()=>({})),c=await o.json().catch(()=>({})),d=await r.json().catch(()=>({})),u=await a.json().catch(()=>({}));l.success&&l.data?(e.oosStats=l.data,e.oosDb=l.db??null):(e.oosStats=null,s.ok||(e.oosError=l.detail??`stats: ${s.status}`)),c.success&&Array.isArray(c.data)?e.oosList=c.data:(e.oosList=[],!e.oosError&&!o.ok&&(e.oosError=c.detail??`list: ${o.status}`)),d.success&&Array.isArray(d.data)?e.oosByFile=d.data:e.oosByFile=[],u.success&&Array.isArray(u.data)?e.oosByTime=u.data:e.oosByTime=[]}catch(s){e.oosError=s instanceof Error?s.message:String(s),e.oosStats=null,e.oosList=[],e.oosByFile=[],e.oosByTime=[]}finally{e.oosLoading=!1}}async function Wm(e,t){if(!(t!=null&&t.trim()))return!1;try{const n=await fetch(He(e.basePath,"/api/oos/delete"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_key:t.trim()})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(await xo(e),!0):(e.oosError=i.detail??`删除失败: ${n.status}`,!1)}catch(n){return e.oosError=n instanceof Error?n.message:String(n),!1}}async function Vm(e,t){const n=(t.product_name||"").trim();if(!n)return!1;try{const i=await fetch(He(e.basePath,"/api/oos/add"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_name:n,specification:(t.specification??"").trim(),quantity:t.quantity??0,unit:(t.unit??"").trim()})}),s=await i.json().catch(()=>({}));return i.ok&&s.success?(await xo(e),!0):(e.oosError=s.detail??`添加失败: ${i.status}`,!1)}catch(i){return e.oosError=i instanceof Error?i.message:String(i),!1}}async function Gm(e){try{const t=await fetch(He(e.basePath,"/api/oos/stats")),n=await t.json().catch(()=>({}));if(t.ok&&n.success&&n.data)e.overviewOosStats=n.data,e.overviewOosError=null;else{e.overviewOosStats=null;const i=typeof n.detail=="string"?n.detail:n.message??n.error??`oos stats: ${t.status}`;e.overviewOosError=i}}catch(t){e.overviewOosStats=null,e.overviewOosError=t instanceof Error?t.message:String(t)}}async function _o(e,t){e.shortageLoading=!0,e.shortageError=null;try{const[s,o,r,a]=await Promise.all([fetch(He(e.basePath,"/api/shortage/stats"),{method:"GET"}),fetch(He(e.basePath,"/api/shortage/list",{limit:100}),{method:"GET"}),fetch(He(e.basePath,"/api/shortage/by-file"),{method:"GET"}),fetch(He(e.basePath,"/api/shortage/by-time",{days:30}),{method:"GET"})]),l=await s.json().catch(()=>({})),c=await o.json().catch(()=>({})),d=await r.json().catch(()=>({})),u=await a.json().catch(()=>({}));if(l.success&&l.data)e.shortageStats=l.data,e.shortageDb=l.db??null;else if(e.shortageStats=null,!e.shortageError&&!s.ok){const h=typeof l.detail=="string"?l.detail:l.message??l.error;e.shortageError=h??`stats: ${s.status} ${s.statusText}`}if(c.success&&Array.isArray(c.data))e.shortageList=c.data;else if(e.shortageList=[],!e.shortageError&&!o.ok){const h=typeof c.detail=="string"?c.detail:c.message??c.error;e.shortageError=h??`list: ${o.status} ${o.statusText}`}if(d.success&&Array.isArray(d.data))e.shortageByFile=d.data;else if(e.shortageByFile=[],!e.shortageError&&!r.ok){const h=typeof d.detail=="string"?d.detail:d.message??d.error;e.shortageError=h??`by-file: ${r.status} ${r.statusText}`}if(u.success&&Array.isArray(u.data))e.shortageByTime=u.data;else if(e.shortageByTime=[],!e.shortageError&&!a.ok){const h=typeof u.detail=="string"?u.detail:u.message??u.error;e.shortageError=h??`by-time: ${a.status} ${a.statusText}`}}catch(s){e.shortageError=s instanceof Error?s.message:String(s),e.shortageStats=null,e.shortageList=[],e.shortageByFile=[],e.shortageByTime=[]}finally{e.shortageLoading=!1}}async function Qm(e,t){if(!(t!=null&&t.trim()))return!1;try{const n=await fetch(He(e.basePath,"/api/shortage/delete"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_key:t.trim()})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(await _o(e),!0):(e.shortageError=i.detail??`删除失败: ${n.status}`,!1)}catch(n){return e.shortageError=n instanceof Error?n.message:String(n),!1}}async function Ym(e,t){const n=(t.product_name||"").trim();if(!n)return!1;try{const i=await fetch(He(e.basePath,"/api/shortage/add"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_name:n,specification:(t.specification??"").trim(),quantity:t.quantity??0,available_qty:t.available_qty??0})}),s=await i.json().catch(()=>({}));return i.ok&&s.success?(await _o(e),!0):(e.shortageError=s.detail??`添加失败: ${i.status}`,!1)}catch(i){return e.shortageError=i instanceof Error?i.message:String(i),!1}}async function Xm(e){try{const t=await fetch(He(e.basePath,"/api/shortage/stats"),{method:"GET"}),n=await t.json().catch(()=>({}));if(t.ok&&n.success&&n.data)e.overviewShortageStats=n.data,e.overviewShortageError=null;else{e.overviewShortageStats=null;const i=typeof n.detail=="string"?n.detail:n.message??n.error??`shortage stats: ${t.status}`;e.overviewShortageError=i}}catch(t){e.overviewShortageStats=null,e.overviewShortageError=t instanceof Error?t.message:String(t)}}async function Jm(e){if(!(!e.client||!e.connected)&&!e.presenceLoading){e.presenceLoading=!0,e.presenceError=null,e.presenceStatus=null;try{const t=await e.client.request("system-presence",{});Array.isArray(t)?(e.presenceEntries=t,e.presenceStatus=t.length===0?"No instances yet.":null):(e.presenceEntries=[],e.presenceStatus="No presence payload.")}catch(t){e.presenceError=String(t)}finally{e.presenceLoading=!1}}}async function qa(e,t){if(!(!e.client||!e.connected)&&!e.sessionsLoading){e.sessionsLoading=!0,e.sessionsError=null;try{const n=(t==null?void 0:t.includeGlobal)??e.sessionsIncludeGlobal,i=(t==null?void 0:t.includeUnknown)??e.sessionsIncludeUnknown,s=(t==null?void 0:t.activeMinutes)??nc(e.sessionsFilterActive,0),o=(t==null?void 0:t.limit)??nc(e.sessionsFilterLimit,0),r={includeGlobal:n,includeUnknown:i};s>0&&(r.activeMinutes=s),o>0&&(r.limit=o);const a=await e.client.request("sessions.list",r);a&&(e.sessionsResult=a)}catch(n){e.sessionsError=String(n)}finally{e.sessionsLoading=!1}}}function Kn(e,t,n){if(!t.trim())return;const i={...e.skillMessages};n?i[t]=n:delete i[t],e.skillMessages=i}function ko(e){return e instanceof Error?e.message:String(e)}async function Ji(e,t){if(t!=null&&t.clearMessages&&Object.keys(e.skillMessages).length>0&&(e.skillMessages={}),!(!e.client||!e.connected)&&!e.skillsLoading){e.skillsLoading=!0,e.skillsError=null;try{const n=await e.client.request("skills.status",{});n&&(e.skillsReport=n)}catch(n){e.skillsError=ko(n)}finally{e.skillsLoading=!1}}}function Zm(e,t,n){e.skillEdits={...e.skillEdits,[t]:n}}async function ev(e,t,n){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{await e.client.request("skills.update",{skillKey:t,enabled:n}),await Ji(e),Kn(e,t,{kind:"success",message:n?"Skill enabled":"Skill disabled"})}catch(i){const s=ko(i);e.skillsError=s,Kn(e,t,{kind:"error",message:s})}finally{e.skillsBusyKey=null}}}async function tv(e,t){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const n=e.skillEdits[t]??"";await e.client.request("skills.update",{skillKey:t,apiKey:n}),await Ji(e),Kn(e,t,{kind:"success",message:"API key saved"})}catch(n){const i=ko(n);e.skillsError=i,Kn(e,t,{kind:"error",message:i})}finally{e.skillsBusyKey=null}}}async function nv(e,t,n,i){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const s=await e.client.request("skills.install",{name:n,installId:i,timeoutMs:12e4});await Ji(e),Kn(e,t,{kind:"success",message:(s==null?void 0:s.message)??"Installed"})}catch(s){const o=ko(s);e.skillsError=o,Kn(e,t,{kind:"error",message:o})}finally{e.skillsBusyKey=null}}}function it(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams;for(const[r,a]of Object.entries(n))o.set(r,String(a));return`${s}?${o.toString()}`}function $o(e){return{"X-Admin-Token":e,"Content-Type":"application/json"}}function ne(e,t){e.adminData={...e.adminData,...t}}function iv(){let e=null;return typeof sessionStorage<"u"&&(e=sessionStorage.getItem("admin_token")),{token:e,loginError:null,loginLoading:!1,activeSubTab:"price",priceItems:[],priceTotal:0,pricePage:1,pricePageSize:100,priceQuery:"",priceLoading:!1,priceError:null,priceUploading:!1,mappingItems:[],mappingTotal:0,mappingPage:1,mappingPageSize:100,mappingQuery:"",mappingLoading:!1,mappingError:null,mappingUploading:!1}}async function sv(e,t){ne(e,{loginLoading:!0,loginError:null});try{const n=await fetch(it(e.basePath,"/api/admin/login"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:t})}),i=await n.json().catch(()=>({}));if(!n.ok){const s=i.detail,o=typeof s=="string"?s:Array.isArray(s)&&s[0]&&typeof s[0].msg=="string"?s[0].msg:"登录失败";ne(e,{loginError:o,loginLoading:!1});return}i.token?(sessionStorage.setItem("admin_token",i.token),ne(e,{token:i.token,loginLoading:!1,loginError:null})):ne(e,{loginError:"未返回 token",loginLoading:!1})}catch(n){ne(e,{loginError:String(n),loginLoading:!1})}}function Rt(e){sessionStorage.removeItem("admin_token"),ne(e,{token:null})}async function gn(e){const t=e.adminData.token;if(t){ne(e,{priceLoading:!0,priceError:null});try{const n={q:e.adminData.priceQuery,page:e.adminData.pricePage,page_size:e.adminData.pricePageSize},i=await fetch(it(e.basePath,"/api/admin/price-library",n),{headers:$o(t)});if(i.status===401){Rt(e);return}if(i.status===503){ne(e,{priceLoading:!1,priceError:"管理功能未启用（服务端未配置 ADMIN_PASSWORD）"});return}if(!i.ok){const o=await i.text();ne(e,{priceLoading:!1,priceError:o||`HTTP ${i.status}`});return}const s=await i.json();ne(e,{priceItems:s.items,priceTotal:s.total,priceLoading:!1})}catch(n){ne(e,{priceLoading:!1,priceError:String(n)})}}}function ov(e,t,n){const i=e.adminData.priceItems.slice();t<0||t>=i.length||(i[t]={...i[t],...n},ne(e,{priceItems:i}))}function rv(e){ne(e,{priceItems:[...e.adminData.priceItems,{material:"",description:"",price_a:null,price_b:null,price_c:null,price_d:null}]})}async function av(e,t){const n=e.adminData.token;if(!n)return;const i=t.id==null,s=i?it(e.basePath,"/api/admin/price-library"):it(e.basePath,`/api/admin/price-library/${t.id}`),o=await fetch(s,{method:i?"POST":"PUT",headers:$o(n),body:JSON.stringify({material:t.material,description:t.description,price_a:t.price_a,price_b:t.price_b,price_c:t.price_c,price_d:t.price_d})});if(o.status===401){Rt(e);return}if(!o.ok){ne(e,{priceError:await o.text()});return}await gn(e)}async function lv(e,t){const n=e.adminData.token;if(!n)return;const i=await fetch(it(e.basePath,`/api/admin/price-library/${t}`),{method:"DELETE",headers:{"X-Admin-Token":n}});if(i.status===401){Rt(e);return}if(!i.ok){ne(e,{priceError:await i.text()||`HTTP ${i.status}`});return}await gn(e)}async function cv(e,t){const n=e.adminData.token;if(n){ne(e,{priceUploading:!0,priceError:null});try{const i=new FormData;i.append("file",t);const s=await fetch(it(e.basePath,"/api/admin/price-library/upload"),{method:"POST",headers:{"X-Admin-Token":n},body:i});if(s.status===401){Rt(e);return}if(!s.ok){ne(e,{priceError:await s.text(),priceUploading:!1});return}await gn(e),ne(e,{priceUploading:!1})}catch(i){ne(e,{priceError:String(i),priceUploading:!1})}}}async function mn(e){const t=e.adminData.token;if(t){ne(e,{mappingLoading:!0,mappingError:null});try{const n={q:e.adminData.mappingQuery,page:e.adminData.mappingPage,page_size:e.adminData.mappingPageSize},i=await fetch(it(e.basePath,"/api/admin/product-mapping",n),{headers:$o(t)});if(i.status===401){Rt(e);return}if(i.status===503){ne(e,{mappingLoading:!1,mappingError:"管理功能未启用（服务端未配置 ADMIN_PASSWORD）"});return}if(!i.ok){ne(e,{mappingLoading:!1,mappingError:await i.text()});return}const s=await i.json();ne(e,{mappingItems:s.items,mappingTotal:s.total,mappingLoading:!1})}catch(n){ne(e,{mappingLoading:!1,mappingError:String(n)})}}}function dv(e,t,n){const i=e.adminData.mappingItems.slice();t<0||t>=i.length||(i[t]={...i[t],...n},ne(e,{mappingItems:i}))}function uv(e){ne(e,{mappingItems:[...e.adminData.mappingItems,{inquiry_name:"",spec:"",product_code:"",quotation_name:""}]})}async function hv(e,t){const n=e.adminData.token;if(!n)return;const i=t.id==null,s=i?it(e.basePath,"/api/admin/product-mapping"):it(e.basePath,`/api/admin/product-mapping/${t.id}`),o=await fetch(s,{method:i?"POST":"PUT",headers:$o(n),body:JSON.stringify({inquiry_name:t.inquiry_name,spec:t.spec,product_code:t.product_code,quotation_name:t.quotation_name})});if(o.status===401){Rt(e);return}if(!o.ok){ne(e,{mappingError:await o.text()});return}await mn(e)}async function fv(e,t){const n=e.adminData.token;if(!n)return;const i=await fetch(it(e.basePath,`/api/admin/product-mapping/${t}`),{method:"DELETE",headers:{"X-Admin-Token":n}});if(i.status===401){Rt(e);return}if(!i.ok){ne(e,{mappingError:await i.text()||`HTTP ${i.status}`});return}await mn(e)}async function pv(e,t){const n=e.adminData.token;if(n){ne(e,{mappingUploading:!0,mappingError:null});try{const i=new FormData;i.append("file",t);const s=await fetch(it(e.basePath,"/api/admin/product-mapping/upload"),{method:"POST",headers:{"X-Admin-Token":n},body:i});if(s.status===401){Rt(e);return}if(!s.ok){ne(e,{mappingError:await s.text(),mappingUploading:!1});return}await mn(e),ne(e,{mappingUploading:!1})}catch(i){ne(e,{mappingError:String(i),mappingUploading:!1})}}}function Wn(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}function Vn(e){return{"Content-Type":"application/json","x-reports-token":e}}async function Gn(e){const t=await e.json().catch(()=>({}));if(!e.ok||!t.success){const n=t.detail;throw Array.isArray(n)?new Error(n.map(i=>JSON.stringify(i)).join("; ")):typeof n=="object"&&n!==null?new Error(JSON.stringify(n)):new Error(typeof n=="string"&&n||`HTTP ${e.status}`)}return t.data}async function Bt(e){e.reportsLoading=!0,e.reportsError=null;try{const[t,n]=await Promise.all([fetch(Wn(e.basePath,"/api/reports/tasks"),{headers:Vn(e.reportsAdminToken)}),fetch(Wn(e.basePath,"/api/reports/records?limit=20"),{headers:Vn(e.reportsAdminToken)})]);e.reportsTasks=await Gn(t),e.reportsRecords=await Gn(n)}catch(t){e.reportsError=t instanceof Error?t.message:String(t)}finally{e.reportsLoading=!1}}async function fc(e,t){e.reportsError=null;try{const n=await fetch(Wn(e.basePath,`/api/reports/tasks/${t}/run`),{method:"POST",headers:Vn(e.reportsAdminToken)});await Gn(n),await Bt(e)}catch(n){e.reportsError=n instanceof Error?n.message:String(n)}}async function gv(e,t,n){e.reportsError=null;try{const i=await fetch(Wn(e.basePath,`/api/reports/tasks/${t}`),{method:"PATCH",headers:Vn(e.reportsAdminToken),body:JSON.stringify(n)});await Gn(i),await Bt(e)}catch(i){e.reportsError=i instanceof Error?i.message:String(i)}}async function _h(e,t){e.selectedRecordId=t,e.reportDetailLoading=!0,e.reportsError=null;const n=t;try{const i=await fetch(Wn(e.basePath,`/api/reports/records/${t}`),{headers:Vn(e.reportsAdminToken)}),s=await Gn(i);e.selectedRecordId===n&&(e.reportDetail=s)}catch(i){e.reportsError=i instanceof Error?i.message:String(i),e.selectedRecordId===n&&(e.reportDetail=null)}finally{e.selectedRecordId===n&&(e.reportDetailLoading=!1)}}async function mv(e,t){e.reportsError=null;try{const n=await fetch(Wn(e.basePath,`/api/reports/records/${t}/reformat`),{method:"POST",headers:Vn(e.reportsAdminToken)});await Gn(n),await _h(e,t),await Bt(e)}catch(n){e.reportsError=n instanceof Error?n.message:String(n)}}const vv=[{label:"chat",tabs:["chat"]},{label:"control",tabs:["overview","channels","instances","sessions","work","cron"]},{label:"agent",tabs:["agents","skills","nodes","reports"]},{label:"settings",tabs:["config","debug","logs","admin-data"]}],kh={agents:"/agents",overview:"/overview",channels:"/channels",instances:"/instances",sessions:"/sessions",work:"/work",cron:"/cron",skills:"/skills",nodes:"/nodes",reports:"/reports",chat:"/chat",config:"/config",debug:"/debug",logs:"/logs","admin-data":"/admin-data"},$h=new Map(Object.entries(kh).map(([e,t])=>[t,e]));function ei(e){if(!e)return"";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t==="/"?"":(t.endsWith("/")&&(t=t.slice(0,-1)),t)}function ji(e){if(!e)return"/";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t.length>1&&t.endsWith("/")&&(t=t.slice(0,-1)),t}function Sh(e,t=""){const n=ei(t),i=kh[e];return n?`${n}${i}`:i}function Ah(e,t=""){const n=ei(t);let i=e||"/";n&&(i===n?i="/":i.startsWith(`${n}/`)&&(i=i.slice(n.length)));let s=ji(i).toLowerCase();return s.endsWith("/index.html")&&(s="/"),s==="/"?"chat":$h.get(s)??null}function yv(e){let t=ji(e);if(t.endsWith("/index.html")&&(t=ji(t.slice(0,-11))),t==="/")return"";const n=t.split("/").filter(Boolean);if(n.length===0)return"";for(let i=0;i<n.length;i++){const s=`/${n.slice(i).join("/")}`.toLowerCase();if($h.has(s)){const o=n.slice(0,i);return o.length?`/${o.join("/")}`:""}}return`/${n.join("/")}`}function bv(e){switch(e){case"agents":return"folder";case"chat":return"messageSquare";case"overview":return"barChart";case"channels":return"fileText";case"instances":return"radio";case"sessions":return"fileText";case"work":return"fileText";case"cron":return"loader";case"skills":return"zap";case"nodes":return"monitor";case"reports":return"barChart";case"config":return"settings";case"debug":return"bug";case"logs":return"scrollText";case"admin-data":return"fileText";default:return"folder"}}function Hr(e){return p(`tabs.${e}`)}function wv(e){return p(`subtitles.${e}`)}const Th="openclaw.control.settings.v1";function xv(){const t={gatewayUrl:`${location.protocol==="https:"?"wss":"ws"}://${location.host}/ws`,token:"",sessionKey:"main",lastActiveSessionKey:"main",theme:"system",chatFocusMode:!1,chatShowThinking:!0,splitRatio:.6,navCollapsed:!1,navGroupsCollapsed:{}};try{const n=localStorage.getItem(Th);if(!n)return t;const i=JSON.parse(n);return{gatewayUrl:typeof i.gatewayUrl=="string"&&i.gatewayUrl.trim()?i.gatewayUrl.trim():t.gatewayUrl,token:typeof i.token=="string"?i.token:t.token,sessionKey:typeof i.sessionKey=="string"&&i.sessionKey.trim()?i.sessionKey.trim():t.sessionKey,lastActiveSessionKey:typeof i.lastActiveSessionKey=="string"&&i.lastActiveSessionKey.trim()?i.lastActiveSessionKey.trim():typeof i.sessionKey=="string"&&i.sessionKey.trim()||t.lastActiveSessionKey,theme:i.theme==="light"||i.theme==="dark"||i.theme==="system"?i.theme:t.theme,chatFocusMode:typeof i.chatFocusMode=="boolean"?i.chatFocusMode:t.chatFocusMode,chatShowThinking:typeof i.chatShowThinking=="boolean"?i.chatShowThinking:t.chatShowThinking,splitRatio:typeof i.splitRatio=="number"&&i.splitRatio>=.4&&i.splitRatio<=.7?i.splitRatio:t.splitRatio,navCollapsed:typeof i.navCollapsed=="boolean"?i.navCollapsed:t.navCollapsed,navGroupsCollapsed:typeof i.navGroupsCollapsed=="object"&&i.navGroupsCollapsed!==null?i.navGroupsCollapsed:t.navGroupsCollapsed,locale:Sa(i.locale)?i.locale:void 0}}catch{return t}}function _v(e){localStorage.setItem(Th,JSON.stringify(e))}const ps=e=>Number.isNaN(e)?.5:e<=0?0:e>=1?1:e,kv=()=>typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches??!1,gs=e=>{e.classList.remove("theme-transition"),e.style.removeProperty("--theme-switch-x"),e.style.removeProperty("--theme-switch-y")},$v=({nextTheme:e,applyTheme:t,context:n,currentTheme:i})=>{var c;if(i===e)return;const s=globalThis.document??null;if(!s){t();return}const o=s.documentElement,r=s,a=kv();if(!!r.startViewTransition&&!a){let d=.5,u=.5;if((n==null?void 0:n.pointerClientX)!==void 0&&(n==null?void 0:n.pointerClientY)!==void 0&&typeof window<"u")d=ps(n.pointerClientX/window.innerWidth),u=ps(n.pointerClientY/window.innerHeight);else if(n!=null&&n.element){const h=n.element.getBoundingClientRect();h.width>0&&h.height>0&&typeof window<"u"&&(d=ps((h.left+h.width/2)/window.innerWidth),u=ps((h.top+h.height/2)/window.innerHeight))}o.style.setProperty("--theme-switch-x",`${d*100}%`),o.style.setProperty("--theme-switch-y",`${u*100}%`),o.classList.add("theme-transition");try{const h=(c=r.startViewTransition)==null?void 0:c.call(r,()=>{t()});h!=null&&h.finished?h.finished.finally(()=>gs(o)):gs(o)}catch{gs(o),t()}return}t(),gs(o)};function Sv(){return typeof window>"u"||typeof window.matchMedia!="function"||window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function Ka(e){return e==="system"?Sv():e}function jt(e,t){var i;const n={...t,lastActiveSessionKey:((i=t.lastActiveSessionKey)==null?void 0:i.trim())||t.sessionKey.trim()||"main"};e.settings=n,_v(n),t.theme!==e.theme&&(e.theme=t.theme,So(e,Ka(t.theme))),e.applySessionKey=e.settings.lastActiveSessionKey}function Ch(e,t){const n=t.trim();n&&e.settings.lastActiveSessionKey!==n&&jt(e,{...e.settings,lastActiveSessionKey:n})}function Av(e){if(!window.location.search&&!window.location.hash)return;const t=new URL(window.location.href),n=new URLSearchParams(t.search),i=new URLSearchParams(t.hash.startsWith("#")?t.hash.slice(1):t.hash),s=n.get("token")??i.get("token"),o=n.get("password")??i.get("password"),r=n.get("session")??i.get("session"),a=n.get("gatewayUrl")??i.get("gatewayUrl");let l=!1;if(s!=null){const d=s.trim();d&&d!==e.settings.token&&jt(e,{...e.settings,token:d}),n.delete("token"),i.delete("token"),l=!0}if(o!=null&&(n.delete("password"),i.delete("password"),l=!0),r!=null){const d=r.trim();d&&(e.sessionKey=d,jt(e,{...e.settings,sessionKey:d,lastActiveSessionKey:d}))}if(a!=null){const d=a.trim();d&&d!==e.settings.gatewayUrl&&(e.pendingGatewayUrl=d),n.delete("gatewayUrl"),i.delete("gatewayUrl"),l=!0}if(!l)return;t.search=n.toString();const c=i.toString();t.hash=c?`#${c}`:"",window.history.replaceState({},"",t.toString())}function Tv(e,t){e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?Ca(e):Ea(e),t==="debug"?Ra(e):La(e),Js(e),Rh(e,t,!1)}function Cv(e,t,n){$v({nextTheme:t,applyTheme:()=>{e.theme=t,jt(e,{...e.settings,theme:t}),So(e,Ka(t))},context:n,currentTheme:e.theme})}async function Js(e){var t,n,i,s,o,r;if(e.tab==="overview"&&(await Lh(e),await Promise.all([Gm(e),Xm(e)])),e.tab==="channels"&&await Ju(e),e.tab==="instances"){const a=e;await xo(a),await _o(a)}if(e.tab==="sessions"&&(await Oa(e),await Xi(e)),e.tab==="cron"&&await Ia(e),e.tab==="skills"&&await Ji(e),e.tab==="reports"&&await Bt(e),e.tab==="agents"){await Ma(e),await yt(e);const a=((n=(t=e.agentsList)==null?void 0:t.agents)==null?void 0:n.map(c=>c.id))??[];a.length>0&&Xu(e,a);const l=e.agentsSelectedId??((i=e.agentsList)==null?void 0:i.defaultId)??((r=(o=(s=e.agentsList)==null?void 0:s.agents)==null?void 0:o[0])==null?void 0:r.id);l&&(Yu(e,l),e.agentsPanel==="skills"&&(Bs(e,l),Bt(e)),e.agentsPanel==="channels"&&Qe(e,!1),e.agentsPanel==="cron"&&Wa(e))}if(e.tab==="nodes"&&(await yo(e),await Qt(e),await yt(e),await ja(e)),e.tab==="chat"&&(await Fh(e),Yi(e,!e.chatHasAutoScrolled)),e.tab==="config"&&(await ag(e),await yt(e)),e.tab==="debug"&&(await vo(e),e.eventLog=e.eventLogBuffer),e.tab==="logs"&&(e.logsAtBottom=!0,await Ta(e,{reset:!0}),Qu(e,!0)),e.tab==="admin-data"){const a=e;a.adminData.token&&(await gn(a),await mn(a))}}function Ev(){if(typeof window>"u")return"";const e=window.__OPENCLAW_CONTROL_UI_BASE_PATH__;return typeof e=="string"&&e.trim()?ei(e):yv(window.location.pathname)}function Rv(e){e.theme=e.settings.theme??"system",So(e,Ka(e.theme))}function So(e,t){if(e.themeResolved=t,typeof document>"u")return;const n=document.documentElement;n.dataset.theme=t,n.style.colorScheme=t}function Lv(e){if(typeof window>"u"||typeof window.matchMedia!="function")return;if(e.themeMedia=window.matchMedia("(prefers-color-scheme: dark)"),e.themeMediaHandler=n=>{e.theme==="system"&&So(e,n.matches?"dark":"light")},typeof e.themeMedia.addEventListener=="function"){e.themeMedia.addEventListener("change",e.themeMediaHandler);return}e.themeMedia.addListener(e.themeMediaHandler)}function Mv(e){if(!e.themeMedia||!e.themeMediaHandler)return;if(typeof e.themeMedia.removeEventListener=="function"){e.themeMedia.removeEventListener("change",e.themeMediaHandler);return}e.themeMedia.removeListener(e.themeMediaHandler),e.themeMedia=null,e.themeMediaHandler=null}function Pv(e,t){if(typeof window>"u")return;const n=Ah(window.location.pathname,e.basePath)??"chat";Eh(e,n),Rh(e,n,t)}function Dv(e){var s;if(typeof window>"u")return;const t=Ah(window.location.pathname,e.basePath);if(!t)return;const i=(s=new URL(window.location.href).searchParams.get("session"))==null?void 0:s.trim();i&&(e.sessionKey=i,jt(e,{...e.settings,sessionKey:i,lastActiveSessionKey:i})),Eh(e,t)}function Eh(e,t){e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?Ca(e):Ea(e),t==="debug"?Ra(e):La(e),e.connected&&Js(e)}function Rh(e,t,n){if(typeof window>"u")return;const i=ji(Sh(t,e.basePath)),s=ji(window.location.pathname),o=new URL(window.location.href);t==="chat"&&e.sessionKey?o.searchParams.set("session",e.sessionKey):o.searchParams.delete("session"),s!==i&&(o.pathname=i),n?window.history.replaceState({},"",o.toString()):window.history.pushState({},"",o.toString())}function Iv(e,t,n){if(typeof window>"u")return;const i=new URL(window.location.href);i.searchParams.set("session",t),window.history.replaceState({},"",i.toString())}async function Lh(e){await Promise.all([Qe(e,!1),Jm(e),qa(e),th(e),vo(e),jg(e)])}async function Wa(e){await Promise.all([Qe(e,!1),th(e),Ug(e)])}async function Ov(e){await Ia(e)}async function Fv(e){await Oa(e)}const pc=50,Nv=80,Bv=12e4,zv="[已渲染到前端]";function Hv(e){if(!e||typeof e!="object")return null;const t=e;if(typeof t.text=="string")return t.text;const n=t.content;if(!Array.isArray(n))return null;const i=n.map(s=>{if(!s||typeof s!="object")return null;const o=s;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(s=>!!s);return i.length===0?null:i.join(`
`)}function gc(e){if(e==null)return null;if(typeof e=="number"||typeof e=="boolean")return String(e);const t=Hv(e);let n;if(typeof e=="string")n=e;else if(t)n=t;else try{n=JSON.stringify(e,null,2)}catch{n=String(e)}const i=eh(n,Bv);return i.truncated?`${i.text}

鈥?truncated (${i.total} chars, showing first ${i.text.length}).`:i.text}function Uv(e){const t=[];return t.push({type:"toolcall",name:e.name,arguments:e.args??{}}),e.output&&t.push({type:"toolresult",name:e.name,text:e.output}),{role:"assistant",toolCallId:e.toolCallId,runId:e.runId,content:t,timestamp:e.startedAt}}function jv(e){if(e.toolStreamOrder.length<=pc)return;const t=e.toolStreamOrder.length-pc,n=e.toolStreamOrder.splice(0,t);for(const i of n)e.toolStreamById.delete(i)}function qv(e){e.chatToolMessages=e.toolStreamOrder.map(t=>{var n;return(n=e.toolStreamById.get(t))==null?void 0:n.message}).filter(t=>!!t)}function Ur(e){e.toolStreamSyncTimer!=null&&(clearTimeout(e.toolStreamSyncTimer),e.toolStreamSyncTimer=null),qv(e)}function Kv(e,t=!1){if(t){Ur(e);return}e.toolStreamSyncTimer==null&&(e.toolStreamSyncTimer=window.setTimeout(()=>Ur(e),Nv))}function Ao(e){e.toolStreamById.clear(),e.toolStreamOrder=[],e.chatToolMessages=[],Ur(e)}function To(e){e.toolRenderData=null,e.toolRenderSeq=null,e.toolRenderItems=[]}const Wv=5e3;function Vv(e,t){var s;const n=t.data??{},i=typeof n.phase=="string"?n.phase:"";e.compactionClearTimer!=null&&(window.clearTimeout(e.compactionClearTimer),e.compactionClearTimer=null),i==="start"?e.compactionStatus={active:!0,startedAt:Date.now(),completedAt:null}:i==="end"&&(e.compactionStatus={active:!1,startedAt:((s=e.compactionStatus)==null?void 0:s.startedAt)??null,completedAt:Date.now()},e.compactionClearTimer=window.setTimeout(()=>{e.compactionStatus=null,e.compactionClearTimer=null},Wv))}function Gv(e,t){const n=t.data??{};if(typeof n.formatted_response!="string"||n.formatted_response.trim().length===0){console.warn("[tool_render] malformed payload:",n);return}const i=n.chosen_index;let s=0;if(typeof i=="number"&&Number.isFinite(i))s=i;else if(typeof i=="string"&&i.trim()){const d=Number(i);s=Number.isFinite(d)?d:0}const o=typeof n.match_source=="string"?n.match_source:"";e.toolRenderData={formatted_response:n.formatted_response,chosen:n.chosen??{},chosen_index:s,match_source:o,selection_reasoning:typeof n.selection_reasoning=="string"?n.selection_reasoning:""},e.toolRenderSeq=t.seq,Array.isArray(e.toolRenderItems)||(e.toolRenderItems=[]);const r=`${t.runId}:${t.seq}`,a={id:r,runId:t.runId,seq:t.seq,ts:typeof t.ts=="number"?t.ts:Date.now(),sessionKey:typeof t.sessionKey=="string"?t.sessionKey:void 0,payload:e.toolRenderData},l=e.toolRenderItems.find(d=>d.id===r);if(l){l.payload=a.payload,l.ts=a.ts,l.sessionKey=a.sessionKey;return}const c=e.toolRenderItems.find(d=>d.runId===a.runId&&d.payload.formatted_response===a.payload.formatted_response);if(c){c.seq=a.seq,c.ts=a.ts,c.sessionKey=a.sessionKey,c.payload=a.payload;return}e.toolRenderItems.push(a)}function Qv(e,t){if(!t)return;if(t.stream==="compaction"){Vv(e,t);return}if(t.stream==="tool_render"){const u=typeof t.sessionKey=="string"?t.sessionKey:void 0;if(u&&u!==e.sessionKey||!u&&e.chatRunId&&t.runId!==e.chatRunId||e.chatRunId&&t.runId!==e.chatRunId||!e.chatRunId)return;Gv(e,t);return}if(t.stream!=="tool")return;const n=typeof t.sessionKey=="string"?t.sessionKey:void 0;if(n&&n!==e.sessionKey||!n&&e.chatRunId&&t.runId!==e.chatRunId||e.chatRunId&&t.runId!==e.chatRunId||!e.chatRunId)return;const i=t.data??{},s=typeof i.toolCallId=="string"?i.toolCallId:"";if(!s)return;const o=typeof i.name=="string"?i.name:"tool",r=typeof i.phase=="string"?i.phase:"",a=r==="start"?i.args:void 0,l=r==="update"?gc(i.partialResult):r==="result"?gc(i.result):void 0,c=Date.now();let d=e.toolStreamById.get(s);d?(d.name=o,a!==void 0&&(d.args=a),l!==void 0&&(d.output=l||void 0),d.updatedAt=c):(d={toolCallId:s,runId:t.runId,sessionKey:n,name:o,args:a,output:l||void 0,startedAt:typeof t.ts=="number"?t.ts:c,updatedAt:c,message:{}},e.toolStreamById.set(s,d),e.toolStreamOrder.push(s)),d.message=Uv(d),jv(e),Kv(e,r==="result")}function or(e){return e==null?"":String(e).trim()}const rr=new WeakMap,ar=new WeakMap;function jr(e){const t=e,n=typeof t.role=="string"?t.role:"",i=t.content;if(typeof i=="string")return n==="assistant"?Zo(i):or(i);if(Array.isArray(i)){const s=i.map(o=>{const r=o;return r.type==="text"&&typeof r.text=="string"?r.text:null}).filter(o=>typeof o=="string");if(s.length>0){const o=s.join(`
`);return n==="assistant"?Zo(o):or(o)}}return typeof t.text=="string"?n==="assistant"?Zo(t.text):or(t.text):null}function Ti(e){if(!e||typeof e!="object")return jr(e);const t=e;if(rr.has(t))return rr.get(t)??null;const n=jr(e);return rr.set(t,n),n}function mc(e){const n=e.content,i=[];if(Array.isArray(n))for(const a of n){const l=a;if(l.type==="thinking"&&typeof l.thinking=="string"){const c=l.thinking.trim();c&&i.push(c)}}if(i.length>0)return i.join(`
`);const s=Xv(e);if(!s)return null;const r=[...s.matchAll(/<\s*think(?:ing)?\s*>([\s\S]*?)<\s*\/\s*think(?:ing)?\s*>/gi)].map(a=>(a[1]??"").trim()).filter(Boolean);return r.length>0?r.join(`
`):null}function Yv(e){if(!e||typeof e!="object")return mc(e);const t=e;if(ar.has(t))return ar.get(t)??null;const n=mc(e);return ar.set(t,n),n}function Xv(e){const t=e,n=t.content;if(typeof n=="string")return n;if(Array.isArray(n)){const i=n.map(s=>{const o=s;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(s=>typeof s=="string");if(i.length>0)return i.join(`
`)}return typeof t.text=="string"?t.text:null}function Jv(e){const t=e.trim();if(!t)return"";const n=t.split(/\r?\n/).map(i=>i.trim()).filter(Boolean).map(i=>`_${i}_`);return n.length?["_Reasoning:_",...n].join(`
`):""}let vc=!1;function yc(e){e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t="";for(let n=0;n<e.length;n++)t+=e[n].toString(16).padStart(2,"0");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}function Zv(){const e=new Uint8Array(16),t=Date.now();for(let n=0;n<e.length;n++)e[n]=Math.floor(Math.random()*256);return e[0]^=t&255,e[1]^=t>>>8&255,e[2]^=t>>>16&255,e[3]^=t>>>24&255,e}function ey(){vc||(vc=!0,console.warn("[uuid] crypto API missing; falling back to weak randomness"))}function Va(e=globalThis.crypto){if(e&&typeof e.randomUUID=="function")return e.randomUUID();if(e&&typeof e.getRandomValues=="function"){const t=new Uint8Array(16);return e.getRandomValues(t),yc(t)}return ey(),yc(Zv())}async function Qn(e){if(!(!e.client||!e.connected)){e.chatLoading=!0,e.lastError=null;try{const t=await e.client.request("chat.history",{sessionKey:e.sessionKey,limit:200}),n=Array.isArray(t.messages)?t.messages:[];(n.length>0||e.chatMessages.length===0)&&(e.chatMessages=n),e.chatThinkingLevel=t.thinkingLevel??null}catch(t){e.lastError=String(t)}finally{e.chatLoading=!1}}}function ty(e){const t=/^data:([^;]+);base64,(.+)$/.exec(e);return t?{mimeType:t[1],content:t[2]}:null}function ny(e){if(!e||typeof e!="object")return null;const t=e;return t.role!=="assistant"||!("content"in t)||!Array.isArray(t.content)?null:t}async function iy(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",i=n?`${n}/api/quotation/upload`:"/api/quotation/upload",s=new FormData;s.append("file",t);try{const o=await fetch(i,{method:"POST",body:s,credentials:"same-origin"});if(!o.ok){const l=await o.text();throw new Error(l||`Upload failed: ${o.status}`)}const r=await o.json(),a=(r==null?void 0:r.data)??r;return!a||typeof a.file_path!="string"?null:{file_id:a.file_id??"",file_path:a.file_path,file_name:a.file_name??t.name,summaryMeta:a.summary_meta}}catch(o){throw console.error("uploadChatFile",o),o}}async function sy(e,t,n,i){if(!e.client||!e.connected)return null;const s=t.trim(),o=n&&n.length>0,r=!!(i!=null&&i.file_name);if(!s&&!o&&!r)return null;const a=Date.now(),l=[];if(s&&l.push({type:"text",text:s}),o)for(const h of n)l.push({type:"image",source:{type:"base64",media_type:h.mimeType,data:h.dataUrl}});i!=null&&i.file_name&&l.push({type:"file",file_name:i.file_name,file_path:i.file_path,summaryMeta:i.summaryMeta}),e.chatMessages=[...e.chatMessages,{role:"user",content:l,timestamp:a}],e.chatSending=!0,e.lastError=null;const c=Va();e.chatRunId=c,e.chatStream="",e.chatStreamStartedAt=a;const d=o?n.map(h=>{const g=ty(h.dataUrl);return g?{type:"image",mimeType:g.mimeType,content:g.content}:null}).filter(h=>h!==null):void 0,u=i&&i.file_path?{file_path:i.file_path,...i.file_id?{file_id:i.file_id}:{}}:void 0;try{return await e.client.request("chat.send",{sessionKey:e.sessionKey,message:s,deliver:!1,idempotencyKey:c,attachments:d,...u?{context:u,file_path:i.file_path}:{}}),e.chatUploadedFile=null,c}catch(h){const g=String(h);return e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,e.lastError=g,e.chatMessages=[...e.chatMessages,{role:"assistant",content:[{type:"text",text:"Error: "+g}],timestamp:Date.now()}],null}finally{e.chatSending=!1}}async function oy(e){if(!e.client||!e.connected)return!1;const t=e.chatRunId;try{return await e.client.request("chat.abort",t?{sessionKey:e.sessionKey,runId:t}:{sessionKey:e.sessionKey}),!0}catch(n){return e.lastError=String(n),!1}}function ry(e,t){if(!t||t.sessionKey!==e.sessionKey)return null;if(t.runId&&e.chatRunId&&t.runId!==e.chatRunId)return t.state==="final"?"foreign_final":null;if(t.state==="delta"){const n=jr(t.message);if(typeof n=="string"){const i=e.chatStream??"";(!i||n.length>=i.length)&&(e.chatStream=n)}}else if(t.state==="final")e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null;else if(t.state==="aborted"){const n=ny(t.message);if(n)e.chatMessages=[...e.chatMessages,n];else{const i=e.chatStream??"";i.trim()&&(e.chatMessages=[...e.chatMessages,{role:"assistant",content:[{type:"text",text:i}],timestamp:Date.now()}])}e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null}else t.state==="error"&&(e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null,e.lastError=t.errorMessage??"chat error");return t.state}const Mh=120;function Ph(e){return e.chatSending||!!e.chatRunId}function ay(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/stop"?!0:n==="stop"||n==="esc"||n==="abort"||n==="wait"||n==="exit"}function ly(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/new"||n==="/reset"?!0:n.startsWith("/new ")||n.startsWith("/reset ")}async function Dh(e){e.connected&&(e.chatMessage="",await oy(e))}function cy(e,t,n,i){const s=t.trim(),o=!!(n&&n.length>0);!s&&!o||(e.chatQueue=[...e.chatQueue,{id:Va(),text:s,createdAt:Date.now(),attachments:o?n==null?void 0:n.map(r=>({...r})):void 0,refreshSessions:i}])}async function Ih(e,t,n){var o,r;Ao(e),To(e);const i=await sy(e,t,n==null?void 0:n.attachments,e.chatUploadedFile??void 0),s=!!i;return!s&&(n==null?void 0:n.previousDraft)!=null&&(e.chatMessage=n.previousDraft),!s&&(n!=null&&n.previousAttachments)&&(e.chatAttachments=n.previousAttachments),s&&Ch(e,e.sessionKey),s&&(n!=null&&n.restoreDraft)&&((o=n.previousDraft)!=null&&o.trim())&&(e.chatMessage=n.previousDraft),s&&(n!=null&&n.restoreAttachments)&&((r=n.previousAttachments)!=null&&r.length)&&(e.chatAttachments=n.previousAttachments),Yi(e),s&&!e.chatRunId&&Oh(e),s&&(n!=null&&n.refreshSessions)&&i&&e.refreshSessionsAfterChat.add(i),s}async function Oh(e){if(!e.connected||Ph(e))return;const[t,...n]=e.chatQueue;if(!t)return;e.chatQueue=n,await Ih(e,t.text,{attachments:t.attachments,refreshSessions:t.refreshSessions})||(e.chatQueue=[t,...e.chatQueue])}function dy(e,t){e.chatQueue=e.chatQueue.filter(n=>n.id!==t)}async function uy(e,t,n){var d;if(!e.connected)return;const i=e.chatMessage,s=(t??e.chatMessage).trim(),o=e.chatAttachments??[],r=t==null?o:[],a=r.length>0,l=!!((d=e.chatUploadedFile)!=null&&d.file_name);if(!s&&!a&&!l)return;if(ay(s)){await Dh(e);return}const c=ly(s);if(t==null&&(e.chatMessage="",e.chatAttachments=[]),Ph(e)){cy(e,s,r,c);return}await Ih(e,s,{previousDraft:t==null?i:void 0,restoreDraft:!!(t&&(n!=null&&n.restoreDraft)),attachments:a?r:void 0,previousAttachments:t==null?o:void 0,restoreAttachments:!!(t&&(n!=null&&n.restoreDraft)),refreshSessions:c})}async function Fh(e,t){await Promise.all([Qn(e),qa(e,{activeMinutes:Mh}),qr(e)]),(t==null?void 0:t.scheduleScroll)!==!1&&Yi(e)}const hy=Oh;function fy(e){var s,o,r;const t=Gu(e.sessionKey);if(t!=null&&t.agentId)return t.agentId;const n=(s=e.hello)==null?void 0:s.snapshot;return((r=(o=n==null?void 0:n.sessionDefaults)==null?void 0:o.defaultAgentId)==null?void 0:r.trim())||"main"}function py(e,t){const n=ei(e),i=encodeURIComponent(t);return n?`${n}/avatar/${i}?meta=1`:`/avatar/${i}?meta=1`}async function qr(e){if(!e.connected){e.chatAvatarUrl=null;return}const t=fy(e);if(!t){e.chatAvatarUrl=null;return}e.chatAvatarUrl=null;const n=py(e.basePath,t);try{const i=await fetch(n,{method:"GET"});if(!i.ok){e.chatAvatarUrl=null;return}const s=await i.json(),o=typeof s.avatarUrl=="string"?s.avatarUrl.trim():"";e.chatAvatarUrl=o||null}catch{e.chatAvatarUrl=null}}const gy={trace:!0,debug:!0,info:!0,warn:!0,error:!0,fatal:!0},my={name:"",description:"",agentId:"",enabled:!0,scheduleKind:"every",scheduleAt:"",everyAmount:"30",everyUnit:"minutes",cronExpr:"0 7 * * *",cronTz:"",sessionTarget:"isolated",wakeMode:"now",payloadKind:"agentTurn",payloadText:"",deliveryMode:"announce",deliveryChannel:"last",deliveryTo:"",timeoutSeconds:""},vy=50,yy=200,by="PT Vansting Agent";function bc(e,t){if(typeof e!="string")return;const n=e.trim();if(n)return n.length<=t?n:n.slice(0,t)}function Ga(e){const t=bc(e==null?void 0:e.name,vy)??by,n=bc((e==null?void 0:e.avatar)??void 0,yy)??null;return{agentId:typeof(e==null?void 0:e.agentId)=="string"&&e.agentId.trim()?e.agentId.trim():null,name:t,avatar:n}}async function Nh(e,t){if(!e.client||!e.connected)return;const n=e.sessionKey.trim(),i=n?{sessionKey:n}:{};try{const s=await e.client.request("agent.identity.get",i);if(!s)return;const o=Ga(s);e.assistantName=o.name,e.assistantAvatar=o.avatar,e.assistantAgentId=o.agentId??null}catch{}}function Kr(e){return typeof e=="object"&&e!==null}function wy(e){if(!Kr(e))return null;const t=typeof e.id=="string"?e.id.trim():"",n=e.request;if(!t||!Kr(n))return null;const i=typeof n.command=="string"?n.command.trim():"";if(!i)return null;const s=typeof e.createdAtMs=="number"?e.createdAtMs:0,o=typeof e.expiresAtMs=="number"?e.expiresAtMs:0;return!s||!o?null:{id:t,request:{command:i,cwd:typeof n.cwd=="string"?n.cwd:null,host:typeof n.host=="string"?n.host:null,security:typeof n.security=="string"?n.security:null,ask:typeof n.ask=="string"?n.ask:null,agentId:typeof n.agentId=="string"?n.agentId:null,resolvedPath:typeof n.resolvedPath=="string"?n.resolvedPath:null,sessionKey:typeof n.sessionKey=="string"?n.sessionKey:null},createdAtMs:s,expiresAtMs:o}}function xy(e){if(!Kr(e))return null;const t=typeof e.id=="string"?e.id.trim():"";return t?{id:t,decision:typeof e.decision=="string"?e.decision:null,resolvedBy:typeof e.resolvedBy=="string"?e.resolvedBy:null,ts:typeof e.ts=="number"?e.ts:null}:null}function Bh(e){const t=Date.now();return e.filter(n=>n.expiresAtMs>t)}function _y(e,t){const n=Bh(e).filter(i=>i.id!==t.id);return n.push(t),n}function wc(e,t){return Bh(e).filter(n=>n.id!==t)}function ky(e){return{}}const xc={WEBCHAT:"webchat"},_c={CONTROL_UI:"control-ui"},$y=4008;class Sy{constructor(t){this.opts=t,this.ws=null,this.pending=new Map,this.closed=!1,this.lastSeq=null,this.connectNonce=null,this.connectSent=!1,this.connectTimer=null,this.backoffMs=800}start(){this.closed=!1,this.connect()}stop(){var t;this.closed=!0,(t=this.ws)==null||t.close(),this.ws=null,this.flushPending(new Error("gateway client stopped"))}get connected(){var t;return((t=this.ws)==null?void 0:t.readyState)===WebSocket.OPEN}connect(){this.closed||(this.ws=new WebSocket(this.opts.url),this.ws.addEventListener("open",()=>this.queueConnect()),this.ws.addEventListener("message",t=>this.handleMessage(String(t.data??""))),this.ws.addEventListener("close",t=>{var i,s;const n=String(t.reason??"");this.ws=null,this.flushPending(new Error(`gateway closed (${t.code}): ${n}`)),(s=(i=this.opts).onClose)==null||s.call(i,{code:t.code,reason:n}),this.scheduleReconnect()}),this.ws.addEventListener("error",()=>{}))}scheduleReconnect(){if(this.closed)return;const t=this.backoffMs;this.backoffMs=Math.min(this.backoffMs*1.7,15e3),window.setTimeout(()=>this.connect(),t)}flushPending(t){for(const[,n]of this.pending)n.reject(t);this.pending.clear()}async sendConnect(){var d;if(this.connectSent)return;this.connectSent=!0,this.connectTimer!==null&&(window.clearTimeout(this.connectTimer),this.connectTimer=null);const t=typeof crypto<"u"&&!!crypto.subtle,n=["operator.admin","operator.approvals","operator.pairing"],i="operator";let s=null,o=!1,r=this.opts.token;if(t){s=await Ua();const u=(d=dm({deviceId:s.deviceId,role:i}))==null?void 0:d.token;r=u??this.opts.token,o=!!(u&&this.opts.token)}const a=r||this.opts.password?{token:r,password:this.opts.password}:void 0;let l;if(t&&s){const u=Date.now(),h=this.connectNonce??void 0,g=ky({deviceId:s.deviceId,clientId:this.opts.clientName??_c.CONTROL_UI,clientMode:this.opts.mode??xc.WEBCHAT}),v=await Im(s.privateKey,g);l={id:s.deviceId,publicKey:s.publicKey,signature:v,signedAt:u,nonce:h}}const c={minProtocol:3,maxProtocol:3,client:{id:this.opts.clientName??_c.CONTROL_UI,version:this.opts.clientVersion??"dev",platform:this.opts.platform??navigator.platform??"web",mode:this.opts.mode??xc.WEBCHAT,instanceId:this.opts.instanceId},role:i,scopes:n,device:l,caps:[],auth:a,userAgent:navigator.userAgent,locale:navigator.language};this.request("connect",c).then(u=>{var h,g,v;(h=u==null?void 0:u.auth)!=null&&h.deviceToken&&s&&rh({deviceId:s.deviceId,role:u.auth.role??i,token:u.auth.deviceToken,scopes:u.auth.scopes??[]}),this.backoffMs=800,(v=(g=this.opts).onHello)==null||v.call(g,u)}).catch(()=>{var u;o&&s&&ah({deviceId:s.deviceId,role:i}),(u=this.ws)==null||u.close($y,"connect failed")})}handleMessage(t){var s,o,r,a,l;let n;try{n=JSON.parse(t)}catch{return}const i=n;if(i.type==="event"){const c=n;if(c.event==="connect.challenge"){const u=c.payload,h=u&&typeof u.nonce=="string"?u.nonce:null;h&&(this.connectNonce=h,this.sendConnect());return}const d=typeof c.seq=="number"?c.seq:null;d!==null&&(this.lastSeq!==null&&d>this.lastSeq+1&&((o=(s=this.opts).onGap)==null||o.call(s,{expected:this.lastSeq+1,received:d})),this.lastSeq=d);try{(a=(r=this.opts).onEvent)==null||a.call(r,c)}catch(u){console.error("[gateway] event handler error:",u)}return}if(i.type==="res"){const c=n,d=this.pending.get(c.id);if(!d)return;this.pending.delete(c.id),c.ok?d.resolve(c.payload):d.reject(new Error(((l=c.error)==null?void 0:l.message)??"request failed"));return}}request(t,n){if(!this.ws||this.ws.readyState!==WebSocket.OPEN)return Promise.reject(new Error("gateway not connected"));const i=Va(),s={type:"req",id:i,method:t,params:n},o=new Promise((r,a)=>{this.pending.set(i,{resolve:l=>r(l),reject:a})});return this.ws.send(JSON.stringify(s)),o}queueConnect(){this.connectNonce=null,this.connectSent=!1,this.connectTimer!==null&&window.clearTimeout(this.connectTimer),this.connectTimer=window.setTimeout(()=>{this.sendConnect()},750)}}function lr(e,t){var a,l,c;const n=(e??"").trim(),i=(a=t.mainSessionKey)==null?void 0:a.trim();if(!i)return n;if(!n)return i;const s=((l=t.mainKey)==null?void 0:l.trim())||"main",o=(c=t.defaultAgentId)==null?void 0:c.trim();return n==="main"||n===s||o&&(n===`agent:${o}:main`||n===`agent:${o}:${s}`)?i:n}function Ay(e,t){if(!(t!=null&&t.mainSessionKey))return;const n=lr(e.sessionKey,t),i=lr(e.settings.sessionKey,t),s=lr(e.settings.lastActiveSessionKey,t),o=n||i||e.sessionKey,r={...e.settings,sessionKey:i||o,lastActiveSessionKey:s||o},a=r.sessionKey!==e.settings.sessionKey||r.lastActiveSessionKey!==e.settings.lastActiveSessionKey;o!==e.sessionKey&&(e.sessionKey=o),a&&jt(e,r)}function zh(e){e.lastError=null,e.hello=null,e.connected=!1,e.execApprovalQueue=[],e.execApprovalError=null;const t=e.client,n=new Sy({url:e.settings.gatewayUrl,token:e.settings.token.trim()?e.settings.token:void 0,password:e.password.trim()?e.password:void 0,clientName:"openclaw-control-ui",mode:"webchat",onHello:i=>{if(e.client===n){if(e.connected=!0,e.lastError=null,e.hello=i,Ey(e,i),e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,Ao(e),To(e),Nh(e),Ma(e),yo(e,{quiet:!0}),Qt(e,{quiet:!0}),e.pendingVisibleRefreshHandler&&typeof document<"u"&&(document.removeEventListener("visibilitychange",e.pendingVisibleRefreshHandler),e.pendingVisibleRefreshHandler=null),typeof document>"u"||document.visibilityState==="visible")Js(e);else if(typeof document<"u"){const s=()=>{document.visibilityState==="visible"&&(document.removeEventListener("visibilitychange",s),e.pendingVisibleRefreshHandler=null,!(e.client!==n||!e.connected)&&Js(e))};e.pendingVisibleRefreshHandler=s,document.addEventListener("visibilitychange",s)}}},onClose:({code:i,reason:s})=>{e.client===n&&(e.connected=!1,i!==1012&&(e.lastError=`disconnected (${i}): ${s||"no reason"}`))},onEvent:i=>{e.client===n&&Ty(e,i)},onGap:({expected:i,received:s})=>{e.client===n&&(e.lastError=`event gap detected (expected seq ${i}, got ${s}); refresh recommended`)}});e.client=n,t==null||t.stop(),n.start()}function Ty(e,t){try{Cy(e,t)}catch(n){console.error("[gateway] handleGatewayEvent error:",t.event,n)}}function Cy(e,t){if(e.eventLogBuffer=[{ts:Date.now(),event:t.event,payload:t.payload},...e.eventLogBuffer].slice(0,250),e.tab==="debug"&&(e.eventLog=e.eventLogBuffer),t.event==="agent"){if(e.onboarding)return;Qv(e,t.payload);return}if(t.event==="chat"){const n=t.payload;n!=null&&n.sessionKey&&Ch(e,n.sessionKey);const i=ry(e,n);let s=!1;if(i==="final"||i==="error"||i==="aborted"){Ao(e),To(e),hy(e);const o=n==null?void 0:n.runId;o&&e.refreshSessionsAfterChat.has(o)&&(e.refreshSessionsAfterChat.delete(o),i==="final"&&qa(e,{activeMinutes:Mh})),i==="final"&&(n!=null&&n.newSessionKey)&&(e.sessionKey=n.newSessionKey,e.chatMessage="",e.chatAttachments=[],e.chatUploadedFile=null,e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.chatQueue=[],e.chatMessages=[],e.lastError=null,e.chatThinkingLevel=null,e.compactionStatus=null,e.compactionClearTimer!=null&&(clearTimeout(e.compactionClearTimer),e.compactionClearTimer=null),e.resetToolStream(),e.resetToolRender(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:n.newSessionKey,lastActiveSessionKey:n.newSessionKey}),e.loadAssistantIdentity(),Qn(e),s=!0)}(i==="final"||i==="foreign_final")&&(s||Qn(e));return}if(t.event==="presence"){const n=t.payload;n!=null&&n.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence,e.presenceError=null,e.presenceStatus=null);return}if(t.event==="cron"&&e.tab==="cron"&&Wa(e),(t.event==="device.pair.requested"||t.event==="device.pair.resolved")&&Qt(e,{quiet:!0}),t.event==="exec.approval.requested"){const n=wy(t.payload);if(n){e.execApprovalQueue=_y(e.execApprovalQueue,n),e.execApprovalError=null;const i=Math.max(0,n.expiresAtMs-Date.now()+500);window.setTimeout(()=>{e.execApprovalQueue=wc(e.execApprovalQueue,n.id)},i)}return}if(t.event==="exec.approval.resolved"){const n=xy(t.payload);n&&(e.execApprovalQueue=wc(e.execApprovalQueue,n.id))}}function Ey(e,t){const n=t.snapshot;n!=null&&n.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence),n!=null&&n.health&&(e.debugHealth=n.health),n!=null&&n.sessionDefaults&&Ay(e,n.sessionDefaults)}const kc="/api/bootstrap";async function Ry(e){if(typeof window>"u"||typeof fetch!="function")return;const t=ei(e.basePath??""),n=t?`${t}${kc}`:kc;try{const i=await fetch(n,{method:"GET",headers:{Accept:"application/json"},credentials:"same-origin"});if(!i.ok)return;const s=await i.json(),o=Ga({agentId:s.assistantAgentId??null,name:s.assistantName,avatar:s.assistantAvatar??null});e.assistantName=o.name,e.assistantAvatar=o.avatar,e.assistantAgentId=o.agentId??null}catch{}}const Ly="Untitled quotation",My=24e4,Py=12e4,Hh=1,Uh=800,$c=new WeakMap,Dy={idle:["running"],running:["awaiting_choices","done","error","idle"],awaiting_choices:["resuming","running","error","idle"],resuming:["awaiting_choices","done","error","idle"],done:["running","idle","error"],error:["running","idle","resuming"]};class vt extends Error{constructor(t){super(t),this.name="RetryableWorkError"}}class Wr extends Error{constructor(t){super(t),this.name="RunIdInvalidError"}}function Zi(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}function ti(e){let t=$c.get(e);return t||(t={controller:null,cancelRequested:!1,timeoutReached:!1},$c.set(e,t)),t}function Zs(e,t){const n=e.workRunStatus;if(n===t)return;if(!(Dy[n]??[]).includes(t))throw new Error(`invalid work state transition: ${n} -> ${t}`);e.workRunStatus=t}function Un(e,t){e.workRunStatus=t}function Qa(e){e.workRunId=null,e.workPendingChoices=[],e.workSelections={}}function jh(e){return(e||"").trim().replace(/\\/g,"/").toLowerCase()}function Iy(e,t){const n=(t.file_path||"").trim();if(n){const i=e.workOriginalFileNamesByPath[jh(n)];if(typeof i=="string"&&i.trim())return i.trim()}return es(t)}function es(e){var i,s;const t=(i=e==null?void 0:e.name)==null?void 0:i.trim();if(t)return t;const n=(s=e==null?void 0:e.file_path)==null?void 0:s.trim();if(n){const o=n.replace(/\\/g,"/").split("/").filter(Boolean).pop();if(o)return o}return Ly}function Oy(e){try{if(typeof e!="string"||!e.trim())return null;const t=e.trim();return t.startsWith("{")&&t.endsWith("}")||t.startsWith("[")&&t.endsWith("]")?JSON.parse(t):null}catch{return null}}function cr(e){if(typeof e!="string")return!1;const t=e.trim().toLowerCase();return t?t==="__oos__"||t==="oos"||t==="无货":!1}function Fy(e){const t=Array.isArray(e.fill_items_merged)?e.fill_items_merged:[];if(!t.length)return null;const n=Array.isArray(e.items)?e.items:[],i=Array.isArray(e.shortage)?e.shortage:[],s=new Map;for(const r of n)s.set(r.row,r);const o=t.map((r,a)=>{const l=r.row,c=s.get(l)??{},d=Number(r.qty??0),u=r.unit_price,h=u==null?null:Number(u),g=h==null||Number.isNaN(h)?null:h*d,v=String(r.code??""),b=String(r.quote_name??"").trim();let y=0,A=0,E=0;for(const k of i)if(k.row===l){A=Number(k.warehouse_qty??k.qty_warehouse??k.available_qty??0),y=Number(k.available_qty??0),E=Number(k.shortfall??0);break}const R=cr(v)||b.includes("库存不足");return!R&&E===0&&A===0&&v&&!cr(v)&&(A=d),!R&&E===0&&y===0&&v&&!cr(v)&&(y=d),{row_index:a,row:typeof l=="number"?l:void 0,product_name:String(c.product_name??""),specification:String(r.specification??c.specification??""),qty:d,code:v,quote_name:b,quote_spec:String(r.quote_spec??""),unit_price:h,amount:g,warehouse_qty:A,available_qty:y,shortfall:E,is_shortage:R?1:0,match_source:null}});return{name:es({name:typeof e.name=="string"?e.name:"",file_path:typeof e.file_path=="string"?e.file_path:null}),file_path:typeof e.file_path=="string"?e.file_path:null,source:"file",lines:o}}function Ny(e){if(!Array.isArray(e))return null;let t=null;for(const n of e){const i=n.type,s=n.content;if(i!=="observation"||typeof s!="string")continue;const o=Oy(s);if(!o||typeof o!="object")continue;const r=o.pending_quotation_draft;if(r&&Array.isArray(r.lines)){t={...r,name:es(r)};continue}const a=Fy(o);a&&(t=a)}return t}function By(e){const t=ae(e,"/api/work","pending_choices[]"),i=Vt(t.options,"/api/work","pending_choices[].options").map(s=>{const o=ae(s,"/api/work","pending_choices[].options[]");return{code:Nt(o.code,"/api/work","pending_choices[].options[].code"),matched_name:K(o.matched_name),unit_price:xe(o.unit_price),reasoning:K(o.reasoning)}});return{id:Nt(t.id,"/api/work","pending_choices[].id"),row:xe(t.row),keywords:K(t.keywords),product_name:K(t.product_name),specification:K(t.specification),qty:xe(t.qty)??K(t.qty),options:i}}function zy(e){const t=ae(e,"/api/work","pending_quotation_draft"),i=Vt(t.lines,"/api/work","pending_quotation_draft.lines").map((s,o)=>{const r=ae(s,"/api/work","pending_quotation_draft.lines[]"),a=xe(r.qty)??Number(r.qty??0),l=r.unit_price==null?null:Number(r.unit_price);return{row_index:xe(r.row_index)??o,row:xe(r.row),product_name:K(r.product_name),specification:K(r.specification),qty:Number.isFinite(a)?a:0,code:K(r.code),quote_name:K(r.quote_name),quote_spec:K(r.quote_spec),unit_price:l==null||Number.isNaN(l)?null:l,amount:r.amount==null?null:Number(r.amount),warehouse_qty:xe(r.warehouse_qty),available_qty:xe(r.available_qty)??Number(r.available_qty??0),shortfall:xe(r.shortfall)??Number(r.shortfall??0),is_shortage:xe(r.is_shortage)??(Da(r.is_shortage)?1:0),match_source:K(r.match_source)??null}});return{name:es({name:K(t.name)??"",file_path:K(t.file_path)??null}),file_path:K(t.file_path)??null,source:K(t.source)??"file",lines:i}}function Vr(e,t){const n=ae(e,t),s=(K(n.status)??"done")==="awaiting_choices"?"awaiting_choices":"done",o={status:s,success:Da(n.success)??!0,answer:K(n.answer)??"",trace:Array.isArray(n.trace)?n.trace:[],error:K(n.error)};if(n.pending_quotation_draft!=null&&(o.pending_quotation_draft=zy(n.pending_quotation_draft)),s==="awaiting_choices"){o.run_id=Nt(n.run_id,t,"run_id");const r=Vt(n.pending_choices,t,"pending_choices");o.pending_choices=r.map(a=>By(a))}return o}function Gr(e,t){if(e.workResult={success:t.success,answer:t.answer,trace:t.trace,error:t.error},e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null,t.status==="awaiting_choices"){Zs(e,"awaiting_choices"),e.workRunId=t.run_id??null,e.workPendingChoices=t.pending_choices??[];const n={};for(const i of e.workPendingChoices)n[i.id]="__OOS__";e.workSelections=n;return}if(Qa(e),t.pending_quotation_draft&&Array.isArray(t.pending_quotation_draft.lines))e.workPendingQuotationDraft={...t.pending_quotation_draft,name:es(t.pending_quotation_draft)};else{const n=Ny(t.trace);n&&(e.workPendingQuotationDraft=n)}t.success===!1||t.error&&t.error.trim()?(Un(e,"error"),e.workError=he("执行报价流程",t.error??"后端返回失败状态","本次报价流程未完成","点击“重试”重新运行，或检查后端日志")):Zs(e,"done")}function qh(e){return new Promise(t=>setTimeout(t,e))}function Kh(e){return e===408||e===429||e===500||e===502||e===503||e===504}function Wh(e,t){const n=ti(e),i=new AbortController;n.controller=i,n.timeoutReached=!1;const s=setTimeout(()=>{n.timeoutReached=!0,i.abort("timeout")},t);return{signal:i.signal,close:()=>{clearTimeout(s),n.controller===i&&(n.controller=null)}}}function eo(e){return e instanceof Error?e.name==="AbortError"||/aborted/i.test(e.message):!1}function Hy(e,t){Un(e,"error"),Qa(e),e.workResult={success:!1,error:t},e.workError=he("执行报价流程",t,"流程被中断，未产出有效结果","点击“重试”再次执行")}function Ya(e){Un(e,"idle"),e.workError="已取消当前流程。",e.workResult=null}async function Uy(e,t){const n={file_paths:e.workFilePaths,customer_level:e.workCustomerLevel,do_register_oos:e.workDoRegisterOos},{signal:i,close:s}=Wh(e,My);try{const o=await fetch(Zi(e.basePath,t),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n),credentials:"same-origin",signal:i});if(!o.ok||!o.body){const d=await o.json().catch(()=>({})),u=Le(d,`HTTP ${o.status}`);throw Kh(o.status)?new vt(u):new Error(u)}const r=o.body.getReader(),a=new TextDecoder;let l="",c=!1;for(;;){const{done:d,value:u}=await r.read();if(d)break;l+=a.decode(u,{stream:!0});const h=l.split(`
`);l=h.pop()??"";for(const g of h){if(!g.startsWith("data: "))continue;const v=g.slice(6).trim();if(!v)continue;const b=ae(JSON.parse(v),t,"stream_event"),y=Nt(b.type,t,"stream_event.type");if(y==="stage"){const A=xe(b.stage)??Number(b.stage);if(!Number.isFinite(A))throw new ye(t,"stage must be a number");e.workProgressStage=A}else if(y==="result"){const A=Vr(b.payload,t);Gr(e,A),c=!0;break}}if(c)break}if(!c&&l.startsWith("data: ")){const d=l.slice(6).trim();if(d){const u=ae(JSON.parse(d),t,"stream_event_tail");if(u.type==="result"){const h=Vr(u.payload,t);Gr(e,h),c=!0}}}if(!c)throw new ye(t,"stream ended without result event")}catch(o){const r=ti(e);throw r.cancelRequested?new Error("__WORK_CANCELLED__"):eo(o)&&r.timeoutReached?new vt("请求超时"):eo(o)?new Error("请求已中断"):o instanceof ye||o instanceof vt?o:o instanceof Error&&/network|failed to fetch|load failed/i.test(o.message)?new vt(o.message):o}finally{s()}}function jy(e,t){if(e===404||e===410)return!0;const n=Le(t,"").toLowerCase();return n.includes("run_id")||n.includes("run id")}async function qy(e,t,n){const i="/api/work/resume",{signal:s,close:o}=Wh(e,Py);try{const r=await fetch(Zi(e.basePath,i),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({run_id:t,selections:n}),credentials:"same-origin",signal:s}),a=await r.json().catch(()=>({}));if(!r.ok){if(jy(r.status,a))throw new Wr(Le(a,"run_id 已失效"));const c=Le(a,`HTTP ${r.status}`);throw Kh(r.status)?new vt(c):new Error(c)}const l=Vr(a,i);Gr(e,l)}catch(r){const a=ti(e);throw a.cancelRequested?new Error("__WORK_CANCELLED__"):r instanceof Wr?r:eo(r)&&a.timeoutReached?new vt("请求超时"):eo(r)?new Error("请求已中断"):r instanceof ye||r instanceof vt?r:r instanceof Error&&/network|failed to fetch|load failed/i.test(r.message)?new vt(r.message):r}finally{o()}}function Ky(e){var n;const t=ti(e);t.cancelRequested=!0,(n=t.controller)==null||n.abort("user_cancel"),Ya(e),e.workRunning=!1}async function Vh(e){if(!e.workFilePaths.length){e.workError="请先上传至少一个报价单文件";return}const t=ti(e);t.cancelRequested=!1,e.workRunning=!0,e.workError=null,e.workResult=null,e.workRunId=null,e.workPendingChoices=[],e.workSelections={},e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null,Zs(e,"running");let n=0;try{for(;;){n+=1;try{await Uy(e,"/api/work/run-stream");break}catch(i){if(i instanceof Error&&i.message==="__WORK_CANCELLED__"){Ya(e);break}if(i instanceof vt&&n<=Hh){await qh(Uh*n);continue}const s=i instanceof ye||i instanceof Error?i.message:String(i);Hy(e,s);break}}}finally{e.workRunning=!1}}async function Gh(e){const t=e.workRunId;if(!t||e.workPendingChoices.length===0){e.workError="缺少可继续的 run_id，请重新执行。",Un(e,"error");return}const n=e.workPendingChoices.map(o=>({item_id:o.id,selected_code:e.workSelections[o.id]??"__OOS__"})),i=ti(e);i.cancelRequested=!1,e.workRunning=!0,e.workError=null,Zs(e,"resuming");let s=0;try{for(;;){s+=1;try{await qy(e,t,n);break}catch(o){if(o instanceof Error&&o.message==="__WORK_CANCELLED__"){Ya(e);break}if(o instanceof Wr){Qa(e),e.workResult={success:!1,error:o.message},e.workError=he("继续流程",o.message,"当前待选项无法继续提交","请重新执行一次 Work 流程"),Un(e,"error");break}if(o instanceof vt&&s<=Hh){await qh(Uh*s);continue}const r=o instanceof ye||o instanceof Error?o.message:String(o);e.workResult={success:!1,error:r},e.workError=he("继续流程",r,"本次续跑失败，尚未生成完整结果","点击“重试”继续，或重新执行 Work"),Un(e,"error");break}}}finally{e.workRunning=!1}}async function Wy(e){if(e.workRunId&&e.workPendingChoices.length>0){await Gh(e);return}await Vh(e)}async function Vy(e){const t=(e.workTextInput||"").trim();if(!t)return e.workTextError="请输入产品描述文字",!1;e.workTextGenerating=!0,e.workTextError=null;try{const n=await fetch(Zi(e.basePath,"/api/quotation/from-text"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t}),credentials:"same-origin"}),i=await n.json().catch(()=>({}));if(!n.ok){let a=typeof i.detail=="string"?i.detail:Le(i,`HTTP ${n.status}`);return n.status===405&&(a="Method Not Allowed：该接口需 POST。请确认使用 python start.py 或 run_backend.py 启动前后端一体服务，且未通过仅支持 GET 的静态托管访问页面。"),e.workTextError=a,!1}const s=i&&typeof i.data=="object"?i.data:i,o=[],r={};if(Array.isArray(s.file_paths)){const a=Array.isArray(s.file_names)?s.file_names:[];s.file_paths.forEach((l,c)=>{if(typeof l!="string"||!l.trim())return;const d=l.trim();o.push(d);const u=typeof a[c]=="string"?a[c]:"";r[d]=u||d.split(/[/\\]/).pop()||d})}if(typeof s.file_path=="string"&&s.file_path.trim()){const a=s.file_path.trim();o.includes(a)||o.push(a);const l=typeof s.file_name=="string"?s.file_name:"";r[a]=l||a.split(/[/\\]/).pop()||a}if(!o.length)return e.workTextError="接口未返回 file_path/file_paths",!1;for(const a of o){e.workFilePaths.includes(a)||(e.workFilePaths=[...e.workFilePaths,a]);const l=jh(a);if(l){const c=(r[a]||"").trim()||a.split(/[/\\]/).pop()||a;e.workOriginalFileNamesByPath={...e.workOriginalFileNamesByPath,[l]:c}}}return e.workTextError=null,!0}catch(n){const i=n instanceof Error?n.message:String(n);return e.workTextError=he("从文字生成报价单",i,"未生成文件","请检查网络或后端后重试"),!1}finally{e.workTextGenerating=!1}}async function Gy(e){try{const t=Zi(e.basePath,"/api/config/price-levels"),n=await fetch(t);if(!n.ok)throw new Error(`HTTP ${n.status}`);const i=await n.json();i.success&&Array.isArray(i.data)&&(e.workPriceLevelOptions=i.data)}catch(t){console.warn("[work] 加载价格档位失败，使用本地默认值",t)}}async function Qy(e){var n;const t=e.workPendingQuotationDraft;if(!((n=t==null?void 0:t.lines)!=null&&n.length))return e.workQuotationDraftSaveStatus={status:"error",error:"无报价明细可保存"},!1;e.workQuotationDraftSaveStatus={status:"saving"};try{const i=await fetch(Zi(e.basePath,"/api/quotation-drafts"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:Iy(e,t),source:t.source||"file",file_path:t.file_path??void 0,lines:t.lines.map(u=>({product_name:u.product_name??"",specification:u.specification??"",qty:Number(u.qty)||0,code:u.code??"",quote_name:u.quote_name??"",quote_spec:u.quote_spec??"",unit_price:u.unit_price!=null?Number(u.unit_price):null,amount:u.amount!=null?Number(u.amount):null,available_qty:Number(u.warehouse_qty??u.available_qty)||0,shortfall:Number(u.shortfall)||0,is_shortage:u.is_shortage?1:0,match_source:u.match_source??null}))}),credentials:"same-origin"}),s=await i.json().catch(()=>({}));if(!i.ok)return e.workQuotationDraftSaveStatus={status:"error",error:he("保存报价单",Le(s,`HTTP ${i.status}`),"报价单仍停留在待保存状态","点击“重试”再次保存")},!1;const o=ae(s,"/api/quotation-drafts"),r=Da(o.success),a=ae(o.data,"/api/quotation-drafts","data"),l=Nt(a.draft_no,"/api/quotation-drafts","data.draft_no"),c=xe(a.draft_id)??Number(a.draft_id),d=Number.isFinite(c)?c:0;if(r===!1)throw new ye("/api/quotation-drafts","success is false");return e.workQuotationDraftSaveStatus={status:"ok",draft_no:l,draft_id:d},e.workPendingQuotationDraft=null,!0}catch(i){const s=i instanceof ye||i instanceof Error?i.message:String(i);return e.workQuotationDraftSaveStatus={status:"error",error:he("保存报价单",s,"报价单仍停留在待保存状态","检查数据后重试")},!1}}function Yy(e){e.basePath=Ev(),Ry(e),Gy(e),Av(e),Pv(e,!0),Rv(e),Lv(e),window.addEventListener("popstate",e.popStateHandler),zh(e),Fg(e),e.tab==="logs"&&Ca(e),e.tab==="debug"&&Ra(e)}function Xy(e){Rg(e)}function Jy(e){var t;window.removeEventListener("popstate",e.popStateHandler),Ng(e),Ea(e),La(e),Mv(e),(t=e.topbarObserver)==null||t.disconnect(),e.topbarObserver=null}function Zy(e,t){if(!(e.tab==="chat"&&e.chatManualRefreshInFlight)){if(e.tab==="chat"&&(t.has("chatMessages")||t.has("chatToolMessages")||t.has("chatStream")||t.has("chatLoading")||t.has("tab"))){const n=t.has("tab"),i=t.has("chatLoading")&&t.get("chatLoading")===!0&&!e.chatLoading;Yi(e,n||i||!e.chatHasAutoScrolled)}e.tab==="logs"&&(t.has("logsEntries")||t.has("logsAutoFollow")||t.has("tab"))&&e.logsAutoFollow&&e.logsAtBottom&&Qu(e,t.has("tab")||t.has("logsAutoFollow"))}}const eb=[{value:"FACTORY_INC_TAX",labelKey:"work.priceLevels.FACTORY_INC_TAX"},{value:"FACTORY_EXC_TAX",labelKey:"work.priceLevels.FACTORY_EXC_TAX"},{value:"PURCHASE_EXC_TAX",labelKey:"work.priceLevels.PURCHASE_EXC_TAX"},{value:"A_MARGIN",labelKey:"work.priceLevels.A_MARGIN"},{value:"A_QUOTE",labelKey:"work.priceLevels.A_QUOTE"},{value:"B_MARGIN",labelKey:"work.priceLevels.B_MARGIN"},{value:"B_QUOTE",labelKey:"work.priceLevels.B_QUOTE"},{value:"C_MARGIN",labelKey:"work.priceLevels.C_MARGIN"},{value:"C_QUOTE",labelKey:"work.priceLevels.C_QUOTE"},{value:"D_MARGIN",labelKey:"work.priceLevels.D_MARGIN"},{value:"D_QUOTE",labelKey:"work.priceLevels.D_QUOTE"},{value:"D_LOW",labelKey:"work.priceLevels.D_LOW"},{value:"E_MARGIN",labelKey:"work.priceLevels.E_MARGIN"},{value:"E_QUOTE",labelKey:"work.priceLevels.E_QUOTE"}];function Sc(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}function Ac(e){try{if(typeof e!="string"||!e.trim())return null;const t=e.trim();return t.startsWith("{")&&t.endsWith("}")||t.startsWith("[")&&t.endsWith("]")?JSON.parse(t):null}catch{return null}}function Tc(e){if(!Array.isArray(e))return[];const t=[],n=i=>{if(typeof i!="string"||!i.trim())return;const s=i.replace(/\\/g,"/").split("/").filter(Boolean).pop()??"";s&&!t.includes(s)&&t.push(s)};for(const i of e){const s=i,o=s.type,r=s.content;if(o==="observation"&&typeof r=="string"){const a=Ac(r);if(a&&typeof a=="object"){n(a.output_path??a.filled_path);const c=a.result,d=typeof c=="string"?Ac(c):c&&typeof c=="object"?c:null;d&&typeof d=="object"&&n(d.output_path??d.filled_path)}const l=r.match(/[A-Za-z]:[^\s"]+\.xlsx|\/[^\s"]+\.xlsx|[^\s"']+\.xlsx/);l&&l[0]&&n(l[0])}n(s.output_path??s.filled_path)}return t}function tb(e,t,n){return f`
    <li style="margin-bottom: 14px; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
      <div style="font-size: 13px; margin-bottom: 8px;">
        ${e.product_name??e.keywords??""}
        ${e.specification?f`<span class="muted"> 路 ${e.specification}</span>`:S}
        ${e.qty!=null?f`<span class="muted"> 路 ${p("work.qty")}: ${e.qty}</span>`:S}
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
  `}function nb(e){return(e||"").trim().replace(/\\/g,"/").toLowerCase()}function ib(e){var Te,te,be;const{basePath:t,workFilePaths:n,workOriginalFileNamesByPath:i,workRunning:s,workProgressStage:o,workRunStatus:r,workPendingChoices:a,workSelections:l,workResult:c,workError:d,workCustomerLevel:u,workDoRegisterOos:h,workPendingQuotationDraft:g,workQuotationDraftSaveStatus:v,workTextInput:b,workTextGenerating:y,workTextError:A,workPriceLevelOptions:E,onAddFile:R,onRemoveFile:k,onRenameFileName:T,onWorkTextChange:M,onGenerateFromText:m,onCustomerLevelChange:$,onDoRegisterOosChange:L,onRun:I,onCancel:P,onRetry:F,onSelectionChange:U,onResume:W,onQuotationLineChange:O,onQuotationDraftSave:G,onQuotationDraftDismiss:le}=e,N=[p("work.stageExtract"),p("work.stageMatch"),p("work.stageFill")],J=(()=>{switch(r){case"idle":return p("work.status.idle");case"running":return p("work.status.running");case"awaiting_choices":return p("work.status.awaitingChoices");case"resuming":return p("work.status.resuming");case"done":return p("work.status.done");case"error":default:return p("work.status.error")}})(),ge=q=>{const V=Sc(t,"/api/quotation/upload?with_summary=0"),oe=new FormData;oe.append("file",q),fetch(V,{method:"POST",body:oe,credentials:"same-origin"}).then(de=>de.json()).then(de=>{if((de==null?void 0:de.success)===!1)return;const Pe=de.data??de;typeof Pe.file_path=="string"&&R(Pe.file_path,Pe.file_name??q.name)}).catch(de=>{console.warn("[work] upload failed",de)})},Q=q=>{var de;const V=q.target,oe=(de=V.files)==null?void 0:de[0];oe&&(ge(oe),V.value="")},Se=q=>{var oe;q.preventDefault();const V=(oe=q.dataTransfer)==null?void 0:oe.files;if(!(!V||!V.length))for(let de=0;de<V.length;de+=1){const Pe=V.item(de);Pe&&ge(Pe)}},se=q=>{q.preventDefault(),q.dataTransfer&&(q.dataTransfer.dropEffect="copy")};return f`
    <section class="card" style="margin-bottom: 16px;" aria-label=${p("tabs.work")}>
      <div class="card-title" style="margin-bottom: 8px;">${p("tabs.work")}</div>
      <p class="muted" style="margin-bottom: 12px;">${p("subtitles.work")}</p>

      <div
        style="margin-bottom: 12px; padding: 10px; border-radius: 8px; border: 1px dashed var(--border); background: var(--bg-secondary, #fafafa);"
        @dragover=${se}
        @dragenter=${se}
        @drop=${Se}
      >
        <label class="card-title" style="font-size: 13px;">${p("work.uploadTitle")}</label>
        <input
          type="file"
          accept=".xlsx,.xls,.xlsm"
          @change=${Q}
          style="margin-top: 6px;"
          aria-label=${p("work.uploadTitle")}
        />
        ${n.length?f`
              <ul style="margin-top: 8px; padding-left: 20px; font-size: 13px;">
                ${n.map((q,V)=>{const oe=nb(q),de=q.split(/[/\\]/).pop()??q,Pe=oe&&i[oe]||de;return f`
                      <li style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                        <input
                          type="text"
                          .value=${Pe}
                          @change=${ss=>T(q,ss.target.value)}
                          style="flex: 1 1 auto; min-width: 0; padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border); font-size: 13px; word-break: break-all;"
                          aria-label=${p("work.fileDisplayName")}
                        />
                        <button
                          type="button"
                          class="btn btn-sm"
                          style="padding: 2px 8px;"
                          @click=${()=>k(V)}
                          aria-label=${p("work.removeFile")}
                        >
                          ${p("work.removeFile")}
                        </button>
                      </li>
                    `})}
              </ul>
            `:f`<p class="muted" style="margin-top: 6px;">${p("work.noFiles")}</p>`}
      </div>

      <div style="margin-bottom: 12px; padding: 10px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-secondary, #fafafa);">
        <label class="card-title" style="font-size: 13px;">${p("work.textInputTitle")}</label>
        <p class="muted" style="font-size: 12px; margin: 4px 0 8px 0;">${p("work.textInputHint")}</p>
        <textarea
          .value=${b}
          @input=${q=>M(q.target.value)}
          placeholder=${p("work.textInputPlaceholder")}
          rows="4"
          style="width: 100%; max-width: 560px; padding: 8px; border-radius: 6px; border: 1px solid var(--border); font-size: 13px; resize: vertical;"
          ?disabled=${y}
          aria-label=${p("work.textInputTitle")}
       ></textarea>
        <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px; flex-wrap: wrap;">
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
          ${A?f`<span style="color: var(--danger, #c00); font-size: 13px;" role="alert">${A}</span>`:S}
        </div>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 12px;">
        <div>
          <label style="font-size: 12px; color: var(--muted);">${p("work.customerLevel")}</label>
          ${(()=>{const q=E&&E.length>0?E:eb.map(V=>({value:V.value,label:p(V.labelKey)}));return f`<select
              .value=${u}
              @change=${V=>$(V.target.value)}
              style="margin-left: 8px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 160px;"
              aria-label=${p("work.customerLevel")}
            >
              ${q.map(V=>f`<option value=${V.value}>${V.label}</option>`)}
            </select>`})()}
        </div>
        <label style="display: flex; align-items: center; gap: 6px; font-size: 13px;">
          <input
            type="checkbox"
            ?checked=${h}
            @change=${q=>L(q.target.checked)}
            aria-label=${p("work.registerOos")}
          />
          ${p("work.registerOos")}
        </label>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${s?f`
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                ${N.map((q,V)=>f`
                    <span
                      style="
                        padding: 6px 12px;
                        border-radius: 8px;
                        font-size: 13px;
                        background: ${o>=0&&V===o?"var(--accent)":"var(--bg-secondary, #eee)"};
                        color: ${o>=0&&V===o?"var(--bg)":"var(--muted)"};
                      "
                    >
                      ${V+1}. ${q}
                    </span>
                  `)}
              </div>
              <p class="muted" style="font-size: 12px; margin: 0;">
                ${p("work.currentStage")}: ${o>=0&&o<N.length?N[o]:p("work.running")}
              </p>
            `:S}

        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
          <button
            class="btn"
            style="background: var(--accent); color: var(--bg);"
            ?disabled=${n.length===0||s}
            @click=${I}
            aria-label=${p("work.run")}
          >
            ${p(s?"work.running":"work.run")}
          </button>
          ${s?f`<button class="btn btn-sm" @click=${P} aria-label=${p("work.cancel")}>${p("work.cancel")}</button>`:S}
          ${r==="error"?f`<button class="btn btn-sm" @click=${F} aria-label=${p("common.retry")}>${p("common.retry")}</button>`:S}
          ${n.length===0?f`<span class="muted" style="font-size: 12px;">${p("work.runHint")}</span>`:S}
          <span class="muted" style="font-size: 12px;">${p("work.statusLabel")}: ${J}</span>
        </div>
      </div>

      ${d?f`
            <div style="margin-top: 12px; padding: 10px; border: 1px solid var(--danger, #e53935); border-radius: 8px;" role="alert" aria-live="assertive">
              <p style="margin: 0; color: var(--danger, #e53935); font-size: 13px;">${d}</p>
            </div>
          `:S}
    </section>

    ${r==="awaiting_choices"&&a.length?(()=>{const q=r;return f`
            <section class="card" style="margin-bottom: 16px;" aria-live="polite">
              <div class="card-title">${p("work.awaitingTitle")}</div>
              <p class="muted" style="margin-bottom: 12px;">${p("work.awaitingHint")}</p>
              <ul style="list-style: none; padding: 0; margin: 0;">
                ${a.map(V=>tb(V,l[V.id]??"__OOS__",oe=>U(V.id,oe)))}
              </ul>
              <div style="display: flex; gap: 8px; margin-top: 12px;">
                <button class="btn" style="background: var(--accent); color: var(--bg);" ?disabled=${s} @click=${W}>
                  ${p(s||q==="resuming"?"work.resuming":"work.resume")}
                </button>
                ${q==="error"?f`<button class="btn btn-sm" @click=${F}>${p("common.retry")}</button>`:S}
              </div>
            </section>
          `})():S}

    ${(v==null?void 0:v.status)==="ok"?f`
          <section class="card" style="margin-bottom: 16px;" role="status" aria-live="polite">
            <p style="color: var(--success, #2e7d32); margin: 0 0 4px 0;">${p("work.savedDraftNo",{no:v.draft_no})}</p>
            <p class="muted" style="margin: 0 0 8px 0; font-size: 12px;">${p("work.saveSuccessHint")}</p>
            <button class="btn btn-sm" @click=${le}>${p("common.close")}</button>
          </section>
        `:(Te=g==null?void 0:g.lines)!=null&&Te.length?f`
            <section class="card" style="margin-bottom: 16px;">
              <div class="card-title">${p("work.pendingDraftTitle")}</div>
              <p class="muted" style="margin-bottom: 10px;">${p("work.pendingDraftHint")}</p>
              <div style="overflow-x: auto; margin-bottom: 12px;">
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
                    ${g.lines.map((q,V)=>f`
                        <tr>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${V+1}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${q.product_name??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${q.specification??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="number" min="0" step="1" .value=${String(q.qty??"")} @change=${oe=>O(V,"qty",oe.target.value)} style="width: 72px;" aria-label=${p("work.lineQty")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="text" .value=${q.code??""} @change=${oe=>O(V,"code",oe.target.value)} style="width: 90px;" aria-label=${p("work.lineCode")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="text" .value=${q.quote_name??""} @change=${oe=>O(V,"quote_name",oe.target.value)} style="width: 120px;" aria-label=${p("work.lineQuoteName")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="text" .value=${q.quote_spec??""} @change=${oe=>O(V,"quote_spec",oe.target.value)} style="width: 120px;" aria-label=${p("work.lineQuoteSpec")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="number" min="0" step="0.01" .value=${q.unit_price!=null?String(q.unit_price):""} @change=${oe=>O(V,"unit_price",oe.target.value)} style="width: 90px;" aria-label=${p("work.linePrice")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${q.amount!=null?q.amount:""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${q.warehouse_qty??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${q.shortfall??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${q.is_shortage?p("common.yes"):p("common.no")}</td>
                        </tr>
                      `)}
                  </tbody>
                </table>
              </div>

              ${(v==null?void 0:v.status)==="error"?f`<p style="color: var(--danger, #c00); margin-bottom: 10px;">${v.error}</p>`:S}

              <div style="display: flex; gap: 8px;">
                <button class="btn" style="background: var(--accent); color: var(--bg);" ?disabled=${(v==null?void 0:v.status)==="saving"} @click=${G}>
                  ${(v==null?void 0:v.status)==="saving"?p("work.saving"):p("work.saveDraft")}
                </button>
                <button class="btn btn-sm" ?disabled=${(v==null?void 0:v.status)==="saving"} @click=${le}>
                  ${p("common.cancel")}
                </button>
              </div>
            </section>
          `:S}

    ${c&&!((te=g==null?void 0:g.lines)!=null&&te.length)?f`
          <section class="card">
            <div class="card-title">${p("work.resultTitle")}</div>
            ${Tc(c.trace).length?f`
                  <div style="margin-bottom: 12px;">
                    ${Tc(c.trace).map(q=>f`
                        <a href=${Sc(t,`/api/quotation/download?path=${encodeURIComponent(q)}`)} download=${q} class="btn btn-sm" style="margin-right: 8px; margin-bottom: 6px; text-decoration: none;">
                          ${p("work.download",{name:q})}
                        </a>
                      `)}
                  </div>
                `:S}

            ${c.answer?f`<div style="white-space: pre-wrap; margin-bottom: 12px;">${c.answer}</div>`:S}
            ${c.error?f`<p style="color: var(--danger, #e53935);">${c.error}</p>`:S}

            ${(be=c.trace)!=null&&be.length?f`
                  <details style="margin-top: 12px;">
                    <summary>${p("work.trace",{count:String(c.trace.length)})}</summary>
                    <pre style="max-height: 420px; overflow: auto; margin-top: 8px; font-size: 11px; white-space: pre-wrap;">${JSON.stringify(c.trace,null,2)}</pre>
                  </details>
                `:S}
          </section>
        `:S}
  `}function ms(e){return(e||"").trim().replace(/\\/g,"/").toLowerCase()}function sb(e){return e.tab!=="work"?S:ib({basePath:e.basePath,workFilePaths:e.workFilePaths,workRunning:e.workRunning,workProgressStage:e.workProgressStage,workRunStatus:e.workRunStatus,workRunId:e.workRunId,workPendingChoices:e.workPendingChoices,workSelections:e.workSelections,workResult:e.workResult,workError:e.workError,workCustomerLevel:e.workCustomerLevel,workDoRegisterOos:e.workDoRegisterOos,workOriginalFileNamesByPath:e.workOriginalFileNamesByPath,workPendingQuotationDraft:e.workPendingQuotationDraft,workQuotationDraftSaveStatus:e.workQuotationDraftSaveStatus,workTextInput:e.workTextInput,workTextGenerating:e.workTextGenerating,workTextError:e.workTextError,workPriceLevelOptions:e.workPriceLevelOptions,onWorkTextChange:t=>{e.workTextInput=t},onGenerateFromText:()=>{Vy(e)},onAddFile:(t,n)=>{e.workFilePaths.includes(t)||(e.workFilePaths=[...e.workFilePaths,t]);const i=ms(t);i&&(e.workOriginalFileNamesByPath={...e.workOriginalFileNamesByPath,[i]:(n||"").trim()||t.split(/[/\\]/).pop()||t})},onRenameFileName:(t,n)=>{const i=ms(t);if(!i)return;const s=(n||"").trim(),o=t.split(/[/\\]/).pop()||t;e.workOriginalFileNamesByPath={...e.workOriginalFileNamesByPath,[i]:s||o};const r=e.workPendingQuotationDraft;r&&r.file_path&&ms(r.file_path)===i&&(e.workPendingQuotationDraft={...r,name:s||o})},onRemoveFile:t=>{const n=e.workFilePaths[t]??"";e.workFilePaths=e.workFilePaths.filter((s,o)=>o!==t);const i=ms(n);if(i&&e.workOriginalFileNamesByPath[i]!==void 0){const s={...e.workOriginalFileNamesByPath};delete s[i],e.workOriginalFileNamesByPath=s}},onCustomerLevelChange:t=>{e.workCustomerLevel=t},onDoRegisterOosChange:t=>{e.workDoRegisterOos=t},onRun:()=>void Vh(e),onCancel:()=>Ky(e),onRetry:()=>void Wy(e),onSelectionChange:(t,n)=>{e.workSelections={...e.workSelections,[t]:n}},onResume:()=>void Gh(e),onQuotationLineChange:(t,n,i)=>{var a;const s=e.workPendingQuotationDraft;if(!((a=s==null?void 0:s.lines)!=null&&a.length)||t<0||t>=s.lines.length)return;const o=s.lines.slice(),r={...o[t]};if(n==="qty"){const l=Number(i);r.qty=Number.isFinite(l)?l:0}else if(n==="unit_price"){const l=String(i??"").trim();if(!l)r.unit_price=null;else{const c=Number(l);r.unit_price=Number.isFinite(c)?c:null}}else r[n]=i;if(n==="qty"||n==="unit_price"){const l=Number(r.qty??0),c=r.unit_price==null?NaN:Number(r.unit_price);r.amount=Number.isFinite(l)&&Number.isFinite(c)?l*c:null}o[t]=r,e.workPendingQuotationDraft={...s,lines:o}},onQuotationDraftSave:()=>{typeof window<"u"&&window.confirm(p("work.saveConfirm"))&&Qy(e).then(t=>{t&&e.loadFulfillDrafts()})},onQuotationDraftDismiss:()=>{e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null}})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xa={CHILD:2},Ja=e=>(...t)=>({_$litDirective$:e,values:t});let Za=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,i){this._$Ct=t,this._$AM=n,this._$Ci=i}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:ob}=Vp,Cc=e=>e,rb=e=>e.strings===void 0,Ec=()=>document.createComment(""),ri=(e,t,n)=>{var o;const i=e._$AA.parentNode,s=t===void 0?e._$AB:t._$AA;if(n===void 0){const r=i.insertBefore(Ec(),s),a=i.insertBefore(Ec(),s);n=new ob(r,a,e,e.options)}else{const r=n._$AB.nextSibling,a=n._$AM,l=a!==e;if(l){let c;(o=n._$AQ)==null||o.call(n,e),n._$AM=e,n._$AP!==void 0&&(c=e._$AU)!==a._$AU&&n._$AP(c)}if(r!==s||l){let c=n._$AA;for(;c!==r;){const d=Cc(c).nextSibling;Cc(i).insertBefore(c,s),c=d}}}return n},Zt=(e,t,n=e)=>(e._$AI(t,n),e),ab={},lb=(e,t=ab)=>e._$AH=t,cb=e=>e._$AH,dr=e=>{e._$AR(),e._$AA.remove()};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Rc=(e,t,n)=>{const i=new Map;for(let s=t;s<=n;s++)i.set(e[s],s);return i},Qh=Ja(class extends Za{constructor(e){if(super(e),e.type!==Xa.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,n){let i;n===void 0?n=t:t!==void 0&&(i=t);const s=[],o=[];let r=0;for(const a of e)s[r]=i?i(a,r):r,o[r]=n(a,r),r++;return{values:o,keys:s}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,i]){const s=cb(e),{values:o,keys:r}=this.dt(t,n,i);if(!Array.isArray(s))return this.ut=r,o;const a=this.ut??(this.ut=[]),l=[];let c,d,u=0,h=s.length-1,g=0,v=o.length-1;for(;u<=h&&g<=v;)if(s[u]===null)u++;else if(s[h]===null)h--;else if(a[u]===r[g])l[g]=Zt(s[u],o[g]),u++,g++;else if(a[h]===r[v])l[v]=Zt(s[h],o[v]),h--,v--;else if(a[u]===r[v])l[v]=Zt(s[u],o[v]),ri(e,l[v+1],s[u]),u++,v--;else if(a[h]===r[g])l[g]=Zt(s[h],o[g]),ri(e,s[u],s[h]),h--,g++;else if(c===void 0&&(c=Rc(r,g,v),d=Rc(a,u,h)),c.has(a[u]))if(c.has(a[h])){const b=d.get(r[g]),y=b!==void 0?s[b]:null;if(y===null){const A=ri(e,s[u]);Zt(A,o[g]),l[g]=A}else l[g]=Zt(y,o[g]),ri(e,s[u],y),s[b]=null;g++}else dr(s[h]),h--;else dr(s[u]),u++;for(;g<=v;){const b=ri(e,l[v+1]);Zt(b,o[g]),l[g++]=b}for(;u<=h;){const b=s[u++];b!==null&&dr(b)}return this.ut=r,lb(e,l),Ut}}),$e={messageSquare:f`
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
  `};function db(e){var s,o,r,a,l;const t=(s=e.hello)==null?void 0:s.snapshot,n=(r=(o=t==null?void 0:t.sessionDefaults)==null?void 0:o.mainSessionKey)==null?void 0:r.trim();if(n)return n;const i=(l=(a=t==null?void 0:t.sessionDefaults)==null?void 0:a.mainKey)==null?void 0:l.trim();return i||"main"}function ub(e,t){e.sessionKey=t,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:t,lastActiveSessionKey:t})}function hb(e,t){const n=Sh(t,e.basePath);return f`
    <a
      href=${n}
      class="nav-item ${e.tab===t?"active":""}"
      @click=${i=>{if(!(i.defaultPrevented||i.button!==0||i.metaKey||i.ctrlKey||i.shiftKey||i.altKey)){if(i.preventDefault(),t==="chat"){const s=db(e);e.sessionKey!==s&&(ub(e,s),e.loadAssistantIdentity())}e.setTab(t)}}}
      title=${Hr(t)}
    >
      <span class="nav-item__icon" aria-hidden="true">${$e[bv(t)]}</span>
      <span class="nav-item__text">${Hr(t)}</span>
    </a>
  `}function fb(e){const t=pb(e.hello,e.sessionsResult),n=vb(e.sessionKey,e.sessionsResult,t),i=e.onboarding,s=e.onboarding,o=e.onboarding?!1:e.settings.chatShowThinking,r=e.onboarding?!0:e.settings.chatFocusMode,a=f`
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
          @change=${c=>{const d=c.target.value;e.sessionKey=d,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:d,lastActiveSessionKey:d}),e.loadAssistantIdentity(),Iv(e,d),Qn(e)}}
        >
          ${Qh(n,c=>c.key,c=>f`<option value=${c.key} title=${c.key}>
                ${c.displayName??c.key}
              </option>`)}
        </select>
      </label>
      <button
        class="btn btn--sm btn--icon"
        ?disabled=${e.chatLoading||!e.connected}
        @click=${async()=>{const c=e;c.chatManualRefreshInFlight=!0,c.chatNewMessagesBelow=!1,await c.updateComplete,c.resetToolStream();try{await Fh(e,{scheduleScroll:!1}),c.scrollToBottom({smooth:!0})}finally{requestAnimationFrame(()=>{c.chatManualRefreshInFlight=!1,c.chatNewMessagesBelow=!1})}}}
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
        ${$e.brain}
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
  `}function pb(e,t){var o,r,a,l,c;const n=e==null?void 0:e.snapshot,i=(r=(o=n==null?void 0:n.sessionDefaults)==null?void 0:o.mainSessionKey)==null?void 0:r.trim();if(i)return i;const s=(l=(a=n==null?void 0:n.sessionDefaults)==null?void 0:a.mainKey)==null?void 0:l.trim();return s||((c=t==null?void 0:t.sessions)!=null&&c.some(d=>d.key==="main")?"main":null)}const Hs={bluebubbles:"iMessage",telegram:"Telegram",discord:"Discord",signal:"Signal",slack:"Slack",whatsapp:"WhatsApp",matrix:"Matrix",email:"Email",sms:"SMS"},gb=Object.keys(Hs);function Lc(e){return e.charAt(0).toUpperCase()+e.slice(1)}function mb(e){if(e==="main"||e==="agent:main:main")return{prefix:"",fallbackName:"Main Session"};if(e.includes(":subagent:"))return{prefix:"Subagent:",fallbackName:"Subagent:"};if(e.includes(":cron:"))return{prefix:"Cron:",fallbackName:"Cron Job:"};const t=e.match(/^agent:[^:]+:([^:]+):direct:(.+)$/);if(t){const i=t[1],s=t[2];return{prefix:"",fallbackName:`${Hs[i]??Lc(i)} · ${s}`}}const n=e.match(/^agent:[^:]+:([^:]+):group:(.+)$/);if(n){const i=n[1];return{prefix:"",fallbackName:`${Hs[i]??Lc(i)} Group`}}for(const i of gb)if(e===i||e.startsWith(`${i}:`))return{prefix:"",fallbackName:`${Hs[i]} Session`};return{prefix:"",fallbackName:e}}function ur(e,t){var a,l;const n=((a=t==null?void 0:t.label)==null?void 0:a.trim())||"",i=((l=t==null?void 0:t.displayName)==null?void 0:l.trim())||"",{prefix:s,fallbackName:o}=mb(e),r=c=>s?new RegExp(`^${s.replace(/[.*+?^${}()|[\\]\\]/g,"\\$&")}\\s*`,"i").test(c)?c:`${s} ${c}`:c;return n&&n!==e?r(n):i&&i!==e?r(i):o}function vb(e,t,n){var a,l;const i=new Set,s=[],o=n&&((a=t==null?void 0:t.sessions)==null?void 0:a.find(c=>c.key===n)),r=(l=t==null?void 0:t.sessions)==null?void 0:l.find(c=>c.key===e);if(n&&(i.add(n),s.push({key:n,displayName:ur(n,o||void 0)})),i.has(e)||(i.add(e),s.push({key:e,displayName:ur(e,r)})),t!=null&&t.sessions)for(const c of t.sessions)i.has(c.key)||(i.add(c.key),s.push({key:c.key,displayName:ur(c.key,c)}));return s}const yb=["system","light","dark"];function bb(e){const t=Math.max(0,yb.indexOf(e.theme)),n=i=>s=>{const r={element:s.currentTarget};(s.clientX||s.clientY)&&(r.pointerClientX=s.clientX,r.pointerClientY=s.clientY),e.setTheme(i,r)};return f`
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
          ${_b()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="light"?"active":""}"
          @click=${n("light")}
          aria-pressed=${e.theme==="light"}
          aria-label="Light theme"
          title="Light"
        >
          ${wb()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="dark"?"active":""}"
          @click=${n("dark")}
          aria-pressed=${e.theme==="dark"}
          aria-label="Dark theme"
          title="Dark"
        >
          ${xb()}
        </button>
      </div>
    </div>
  `}function wb(){return f`
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
  `}function xb(){return f`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
      ></path>
    </svg>
  `}function _b(){return f`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="20" height="14" x="2" y="3" rx="2"></rect>
      <line x1="8" x2="16" y1="21" y2="21"></line>
      <line x1="12" x2="12" y1="17" y2="21"></line>
    </svg>
  `}function Yh(e,t){if(!e)return e;const i=e.files.some(s=>s.name===t.name)?e.files.map(s=>s.name===t.name?t:s):[...e.files,t];return{...e,files:i}}async function hr(e,t){if(!(!e.client||!e.connected||e.agentFilesLoading)){e.agentFilesLoading=!0,e.agentFilesError=null;try{const n=await e.client.request("agents.files.list",{agentId:t});n&&(e.agentFilesList=n,e.agentFileActive&&!n.files.some(i=>i.name===e.agentFileActive)&&(e.agentFileActive=null))}catch(n){e.agentFilesError=String(n)}finally{e.agentFilesLoading=!1}}}async function kb(e,t,n,i){if(!(!e.client||!e.connected||e.agentFilesLoading)&&!Object.hasOwn(e.agentFileContents,n)){e.agentFilesLoading=!0,e.agentFilesError=null;try{const s=await e.client.request("agents.files.get",{agentId:t,name:n});if(s!=null&&s.file){const o=s.file.content??"",r=e.agentFileContents[n]??"",a=e.agentFileDrafts[n],l=(i==null?void 0:i.preserveDraft)??!0;e.agentFilesList=Yh(e.agentFilesList,s.file),e.agentFileContents={...e.agentFileContents,[n]:o},(!l||!Object.hasOwn(e.agentFileDrafts,n)||a===r)&&(e.agentFileDrafts={...e.agentFileDrafts,[n]:o})}}catch(s){e.agentFilesError=String(s)}finally{e.agentFilesLoading=!1}}}async function $b(e,t,n,i){if(!(!e.client||!e.connected||e.agentFileSaving)){e.agentFileSaving=!0,e.agentFilesError=null;try{const s=await e.client.request("agents.files.set",{agentId:t,name:n,content:i});s!=null&&s.file&&(e.agentFilesList=Yh(e.agentFilesList,s.file),e.agentFileContents={...e.agentFileContents,[n]:i},e.agentFileDrafts={...e.agentFileDrafts,[n]:i})}catch(s){e.agentFilesError=String(s)}finally{e.agentFileSaving=!1}}}function Xh(e){return e?`${Qs(e)} (${Cn(e)})`:"n/a"}function Sb(e){if(e==null)return"";try{return JSON.stringify(e,null,2)}catch{return String(e)}}function Ab(e){const t=e.state??{},n=t.nextRunAtMs?Qs(t.nextRunAtMs):"n/a",i=t.lastRunAtMs?Qs(t.lastRunAtMs):"n/a";return`${t.lastStatus??"n/a"} · next ${n} · last ${i}`}function Tb(e){const t=e.schedule;if(t.kind==="at"){const n=Date.parse(t.at);return Number.isFinite(n)?`At ${Qs(n)}`:`At ${t.at}`}return t.kind==="every"?`Every ${Zu(t.everyMs)}`:`Cron ${t.expr}${t.tz?` (${t.tz})`:""}`}function Cb(e){const t=e.payload;if(t.kind==="systemEvent")return`System: ${t.text}`;const n=`Agent: ${t.message}`,i=e.delivery;if(i&&i.mode!=="none"){const s=i.mode==="webhook"?i.to?` (${i.to})`:"":i.channel||i.to?` (${i.channel??"last"}${i.to?` -> ${i.to}`:""})`:"";return`${n} · ${i.mode}${s}`}return n}function Tt(e){const t=(e??"").trim();return t?t.replace(/\s+/g,"_").toLowerCase():""}function Eb(e){return[]}function Rb(e){return{allow:[],alsoAllow:[],deny:[]}}const Mc=[{id:"fs",label:"Files",tools:[{id:"read",label:"read",description:"Read file contents"},{id:"write",label:"write",description:"Create or overwrite files"},{id:"edit",label:"edit",description:"Make precise edits"},{id:"apply_patch",label:"apply_patch",description:"Patch files (OpenAI)"}]},{id:"runtime",label:"Runtime",tools:[{id:"exec",label:"exec",description:"Run shell commands"},{id:"process",label:"process",description:"Manage background processes"}]},{id:"web",label:"Web",tools:[{id:"web_search",label:"web_search",description:"Search the web"},{id:"web_fetch",label:"web_fetch",description:"Fetch web content"}]},{id:"memory",label:"Memory",tools:[{id:"memory_search",label:"memory_search",description:"Semantic search"},{id:"memory_get",label:"memory_get",description:"Read memory files"}]},{id:"sessions",label:"Sessions",tools:[{id:"sessions_list",label:"sessions_list",description:"List sessions"},{id:"sessions_history",label:"sessions_history",description:"Session history"},{id:"sessions_send",label:"sessions_send",description:"Send to session"},{id:"sessions_spawn",label:"sessions_spawn",description:"Spawn sub-agent"},{id:"session_status",label:"session_status",description:"Session status"}]},{id:"ui",label:"UI",tools:[{id:"browser",label:"browser",description:"Control web browser"},{id:"canvas",label:"canvas",description:"Control canvases"}]},{id:"messaging",label:"Messaging",tools:[{id:"message",label:"message",description:"Send messages"}]},{id:"automation",label:"Automation",tools:[{id:"cron",label:"cron",description:"Schedule tasks"},{id:"gateway",label:"gateway",description:"Gateway control"}]},{id:"nodes",label:"Nodes",tools:[{id:"nodes",label:"nodes",description:"Nodes + devices"}]},{id:"agents",label:"Agents",tools:[{id:"agents_list",label:"agents_list",description:"List agents"}]},{id:"media",label:"Media",tools:[{id:"image",label:"image",description:"Image understanding"}]}],Lb=[{id:"minimal",label:"Minimal"},{id:"coding",label:"Coding"},{id:"messaging",label:"Messaging"},{id:"full",label:"Full"}];function Qr(e){var t,n,i;return((t=e.name)==null?void 0:t.trim())||((i=(n=e.identity)==null?void 0:n.name)==null?void 0:i.trim())||e.id}function vs(e){const t=e.trim();if(!t||t.length>16)return!1;let n=!1;for(let i=0;i<t.length;i+=1)if(t.charCodeAt(i)>127){n=!0;break}return!(!n||t.includes("://")||t.includes("/")||t.includes("."))}function Co(e,t){var r,a,l,c,d,u;const n=(r=t==null?void 0:t.emoji)==null?void 0:r.trim();if(n&&vs(n))return n;const i=(l=(a=e.identity)==null?void 0:a.emoji)==null?void 0:l.trim();if(i&&vs(i))return i;const s=(c=t==null?void 0:t.avatar)==null?void 0:c.trim();if(s&&vs(s))return s;const o=(u=(d=e.identity)==null?void 0:d.avatar)==null?void 0:u.trim();return o&&vs(o)?o:""}function Jh(e,t){return t&&e===t?"default":null}function Mb(e){if(e==null||!Number.isFinite(e))return"-";if(e<1024)return`${e} B`;const t=["KB","MB","GB","TB"];let n=e/1024,i=0;for(;n>=1024&&i<t.length-1;)n/=1024,i+=1;return`${n.toFixed(n<10?1:0)} ${t[i]}`}function Eo(e,t){var o,r;const n=e;return{entry:(((o=n==null?void 0:n.agents)==null?void 0:o.list)??[]).find(a=>(a==null?void 0:a.id)===t),defaults:(r=n==null?void 0:n.agents)==null?void 0:r.defaults,globalTools:n==null?void 0:n.tools}}function Pc(e,t,n,i,s){var g,v,b,y,A,E,R,k,T,M,m,$;const o=Eo(t,e.id),a=(n&&n.agentId===e.id?n.workspace:null)||((g=o.entry)==null?void 0:g.workspace)||((v=o.defaults)==null?void 0:v.workspace)||"default",l=(b=o.entry)!=null&&b.model?Ci((y=o.entry)==null?void 0:y.model):Ci((A=o.defaults)==null?void 0:A.model),c=((E=s==null?void 0:s.name)==null?void 0:E.trim())||((k=(R=e.identity)==null?void 0:R.name)==null?void 0:k.trim())||((T=e.name)==null?void 0:T.trim())||((M=o.entry)==null?void 0:M.name)||e.id,d=Co(e,s)||"-",u=Array.isArray((m=o.entry)==null?void 0:m.skills)?($=o.entry)==null?void 0:$.skills:null,h=(u==null?void 0:u.length)??null;return{workspace:a,model:l,identityName:c,identityEmoji:d,skillsLabel:u?`${h} selected`:"all skills",isDefault:!!(i&&e.id===i)}}function Ci(e){var t;if(!e)return"-";if(typeof e=="string")return e.trim()||"-";if(typeof e=="object"&&e){const n=e,i=(t=n.primary)==null?void 0:t.trim();if(i){const s=Array.isArray(n.fallbacks)?n.fallbacks.length:0;return s>0?`${i} (+${s} fallback)`:i}}return"-"}function Dc(e){const t=e.match(/^(.+) \(\+\d+ fallback\)$/);return t?t[1]:e}function Ic(e){if(!e)return null;if(typeof e=="string")return e.trim()||null;if(typeof e=="object"&&e){const t=e,n=typeof t.primary=="string"?t.primary:typeof t.model=="string"?t.model:typeof t.id=="string"?t.id:typeof t.value=="string"?t.value:null;return(n==null?void 0:n.trim())||null}return null}function Pb(e){if(!e||typeof e=="string")return null;if(typeof e=="object"&&e){const t=e,n=Array.isArray(t.fallbacks)?t.fallbacks:Array.isArray(t.fallback)?t.fallback:null;return n?n.filter(i=>typeof i=="string"):null}return null}function Db(e){return e.split(",").map(t=>t.trim()).filter(Boolean)}function Ib(e){var s,o,r;const t=e,n=(o=(s=t==null?void 0:t.agents)==null?void 0:s.defaults)==null?void 0:o.models;if(!n||typeof n!="object")return[];const i=[];for(const[a,l]of Object.entries(n)){const c=a.trim();if(!c)continue;const d=l&&typeof l=="object"&&"alias"in l&&typeof l.alias=="string"?(r=l.alias)==null?void 0:r.trim():void 0,u=d&&d!==c?`${d} (${c})`:c;i.push({value:c,label:u})}return i}function Ob(e,t){const n=Ib(e),i=t?n.some(s=>s.value===t):!1;return t&&!i&&n.unshift({value:t,label:`Current (${t})`}),n.length===0?f`
      <option value="" disabled>No configured models</option>
    `:n.map(s=>f`<option value=${s.value}>${s.label}</option>`)}function Fb(e){const t=Tt(e);if(!t)return{kind:"exact",value:""};if(t==="*")return{kind:"all"};if(!t.includes("*"))return{kind:"exact",value:t};const n=t.replace(/[.*+?^${}()|[\\]\\]/g,"\\$&");return{kind:"regex",value:new RegExp(`^${n.replaceAll("\\*",".*")}$`)}}function Yr(e){return Array.isArray(e)?Eb().map(Fb).filter(t=>t.kind!=="exact"||t.value.length>0):[]}function Ei(e,t){for(const n of t)if(n.kind==="all"||n.kind==="exact"&&e===n.value||n.kind==="regex"&&n.value.test(e))return!0;return!1}function Nb(e,t){if(!t)return!0;const n=Tt(e),i=Yr(t.deny);if(Ei(n,i))return!1;const s=Yr(t.allow);return!!(s.length===0||Ei(n,s)||n==="apply_patch"&&Ei("exec",s))}function Oc(e,t){if(!Array.isArray(t)||t.length===0)return!1;const n=Tt(e),i=Yr(t);return!!(Ei(n,i)||n==="apply_patch"&&Ei("exec",i))}function Bb(e){return Rb()??void 0}function Zh(e,t){return f`
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
  `}function zb(e,t){var i,s;const n=(i=e.channelMeta)==null?void 0:i.find(o=>o.id===t);return n!=null&&n.label?n.label:((s=e.channelLabels)==null?void 0:s[t])??t}function Hb(e){var s;if(!e)return[];const t=new Set;for(const o of e.channelOrder??[])t.add(o);for(const o of e.channelMeta??[])t.add(o.id);for(const o of Object.keys(e.channelAccounts??{}))t.add(o);const n=[],i=(s=e.channelOrder)!=null&&s.length?e.channelOrder:Array.from(t);for(const o of i)t.has(o)&&(n.push(o),t.delete(o));for(const o of t)n.push(o);return n.map(o=>{var r;return{id:o,label:zb(e,o),accounts:((r=e.channelAccounts)==null?void 0:r[o])??[]}})}const Ub=["groupPolicy","streamMode","dmPolicy"];function jb(e,t){if(!e)return null;const i=(e.channels??{})[t];if(i&&typeof i=="object")return i;const s=e[t];return s&&typeof s=="object"?s:null}function qb(e){if(e==null)return"n/a";if(typeof e=="string"||typeof e=="number"||typeof e=="boolean")return String(e);try{return JSON.stringify(e)}catch{return"n/a"}}function Kb(e,t){const n=jb(e,t);return n?Ub.flatMap(i=>i in n?[{label:i,value:qb(n[i])}]:[]):[]}function Wb(e){let t=0,n=0,i=0;for(const s of e){const o=s.probe&&typeof s.probe=="object"&&"ok"in s.probe?!!s.probe.ok:!1;(s.connected===!0||s.running===!0||o)&&(t+=1),s.configured&&(n+=1),s.enabled&&(i+=1)}return{total:e.length,connected:t,configured:n,enabled:i}}function Vb(e){const t=Hb(e.snapshot),n=e.lastSuccess?Cn(e.lastSuccess):"never";return f`
    <section class="grid grid-cols-2">
      ${Zh(e.context,"Workspace, identity, and model configuration.")}
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
        ${e.error?f`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:S}
        ${e.snapshot?S:f`
                <div class="callout info" style="margin-top: 12px">Load channels to see live status.</div>
              `}
        ${t.length===0?f`
                <div class="muted" style="margin-top: 16px">No channels found.</div>
              `:f`
                <div class="list" style="margin-top: 16px;">
                  ${t.map(i=>{const s=Wb(i.accounts),o=s.total?`${s.connected}/${s.total} connected`:"no accounts",r=s.configured?`${s.configured} configured`:"not configured",a=s.total?`${s.enabled} enabled`:"disabled",l=Kb(e.configForm,i.id);return f`
                      <div class="list-item">
                        <div class="list-main">
                          <div class="list-title">${i.label}</div>
                          <div class="list-sub mono">${i.id}</div>
                        </div>
                        <div class="list-meta">
                          <div>${o}</div>
                          <div>${r}</div>
                          <div>${a}</div>
                          ${l.length>0?l.map(c=>f`<div>${c.label}: ${c.value}</div>`):S}
                        </div>
                      </div>
                    `})}
                </div>
              `}
      </section>
    </section>
  `}function Gb(e){var n,i;const t=e.jobs.filter(s=>s.agentId===e.agentId);return f`
    <section class="grid grid-cols-2">
      ${Zh(e.context,"Workspace and scheduling targets.")}
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
            <div class="stat-value">${Xh(((i=e.status)==null?void 0:i.nextWakeAtMs)??null)}</div>
          </div>
        </div>
        ${e.error?f`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:S}
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
                        ${s.description?f`<div class="list-sub">${s.description}</div>`:S}
                        <div class="chip-row" style="margin-top: 6px;">
                          <span class="chip">${Tb(s)}</span>
                          <span class="chip ${s.enabled?"chip-ok":"chip-warn"}">
                            ${s.enabled?"enabled":"disabled"}
                          </span>
                          <span class="chip">${s.sessionTarget}</span>
                        </div>
                      </div>
                      <div class="list-meta">
                        <div class="mono">${Ab(s)}</div>
                        <div class="muted">${Cb(s)}</div>
                      </div>
                    </div>
                  `)}
              </div>
            `}
    </section>
  `}function Qb(e){var l;const t=((l=e.agentFilesList)==null?void 0:l.agentId)===e.agentId?e.agentFilesList:null,n=(t==null?void 0:t.files)??[],i=e.agentFileActive??null,s=i?n.find(c=>c.name===i)??null:null,o=i?e.agentFileContents[i]??"":"",r=i?e.agentFileDrafts[i]??o:"",a=i?r!==o:!1;return f`
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
      ${t?f`<div class="muted mono" style="margin-top: 8px;">Workspace: ${t.workspace}</div>`:S}
      ${e.agentFilesError?f`<div class="callout danger" style="margin-top: 12px;">${e.agentFilesError}</div>`:S}
      ${t?f`
              <div class="agent-files-grid" style="margin-top: 16px;">
                <div class="agent-files-list">
                  ${n.length===0?f`
                          <div class="muted">No files found.</div>
                        `:n.map(c=>Yb(c,i,()=>e.onSelectFile(c.name)))}
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
                                `:S}
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
  `}function Yb(e,t,n){const i=e.missing?"Missing":`${Mb(e.size)} · ${Cn(e.updatedAtMs??null)}`;return f`
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
            `:S}
    </button>
  `}const ys=[{id:"workspace",label:"Workspace Skills",sources:["openclaw-workspace"]},{id:"built-in",label:"Built-in Skills",sources:["openclaw-bundled"]},{id:"installed",label:"Installed Skills",sources:["openclaw-managed"]},{id:"extra",label:"Extra Skills",sources:["openclaw-extra"]}];function ef(e){var o;const t=new Map;for(const r of ys)t.set(r.id,{id:r.id,label:r.label,skills:[]});const n=ys.find(r=>r.id==="built-in"),i={id:"other",label:"Other Skills",skills:[]};for(const r of e){const a=r.bundled?n:ys.find(l=>l.sources.includes(r.source));a?(o=t.get(a.id))==null||o.skills.push(r):i.skills.push(r)}const s=ys.map(r=>t.get(r.id)).filter(r=>!!(r&&r.skills.length>0));return i.skills.length>0&&s.push(i),s}function tf(e){return[...e.missing.bins.map(t=>`bin:${t}`),...e.missing.env.map(t=>`env:${t}`),...e.missing.config.map(t=>`config:${t}`),...e.missing.os.map(t=>`os:${t}`)]}function nf(e){const t=[];return e.disabled&&t.push("disabled"),e.blockedByAllowlist&&t.push("blocked by allowlist"),t}function sf(e){const t=e.skill,n=!!e.showBundledBadge;return f`
    <div class="chip-row" style="margin-top: 6px;">
      <span class="chip">${t.source}</span>
      ${n?f`
              <span class="chip">bundled</span>
            `:S}
      <span class="chip ${t.eligible?"chip-ok":"chip-warn"}">
        ${t.eligible?"eligible":"blocked"}
      </span>
      ${t.disabled?f`
              <span class="chip chip-warn">disabled</span>
            `:S}
    </div>
  `}function Xb(e){var A;const t=Eo(e.configForm,e.agentId),n=((A=t.entry)==null?void 0:A.tools)??{},i=t.globalTools??{},s=n.profile??i.profile??"full",o=n.profile?"agent override":i.profile?"global default":"default",r=Array.isArray(n.allow)&&n.allow.length>0,a=Array.isArray(i.allow)&&i.allow.length>0,l=!!e.configForm&&!e.configLoading&&!e.configSaving&&!r,c=r?[]:Array.isArray(n.alsoAllow)?n.alsoAllow:[],d=r?[]:Array.isArray(n.deny)?n.deny:[],u=r?{allow:n.allow??[],deny:n.deny??[]}:Bb()??void 0,h=Mc.flatMap(E=>E.tools.map(R=>R.id)),g=E=>{const R=Nb(E,u),k=Oc(E,c),T=Oc(E,d);return{allowed:(R||k)&&!T,baseAllowed:R,denied:T}},v=h.filter(E=>g(E).allowed).length,b=(E,R)=>{const k=new Set(c.map($=>Tt($)).filter($=>$.length>0)),T=new Set(d.map($=>Tt($)).filter($=>$.length>0)),M=g(E).baseAllowed,m=Tt(E);R?(T.delete(m),M||k.add(m)):(k.delete(m),T.add(m)),e.onOverridesChange(e.agentId,[...k],[...T])},y=E=>{const R=new Set(c.map(T=>Tt(T)).filter(T=>T.length>0)),k=new Set(d.map(T=>Tt(T)).filter(T=>T.length>0));for(const T of h){const M=g(T).baseAllowed,m=Tt(T);E?(k.delete(m),M||R.add(m)):(R.delete(m),k.add(m))}e.onOverridesChange(e.agentId,[...R],[...k])};return f`
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

      ${e.configForm?S:f`
              <div class="callout info" style="margin-top: 12px">
                Load the gateway config to adjust tool profiles.
              </div>
            `}
      ${r?f`
              <div class="callout info" style="margin-top: 12px">
                This agent is using an explicit allowlist in config. Tool overrides are managed in the Config tab.
              </div>
            `:S}
      ${a?f`
              <div class="callout info" style="margin-top: 12px">
                Global tools.allow is set. Agent overrides cannot enable tools that are globally blocked.
              </div>
            `:S}

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
              `:S}
      </div>

      <div class="agent-tools-presets" style="margin-top: 16px;">
        <div class="label">Quick Presets</div>
        <div class="agent-tools-buttons">
          ${Lb.map(E=>f`
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
        ${Mc.map(E=>f`
              <div class="agent-tools-section">
                <div class="agent-tools-header">${E.label}</div>
                <div class="agent-tools-list">
                  ${E.tools.map(R=>{const{allowed:k}=g(R.id);return f`
                      <div class="agent-tool-row">
                        <div>
                          <div class="agent-tool-title mono">${R.label}</div>
                          <div class="agent-tool-sub">${R.description}</div>
                        </div>
                        <label class="cfg-toggle">
                          <input
                            type="checkbox"
                            .checked=${k}
                            ?disabled=${!l}
                            @change=${T=>b(R.id,T.target.checked)}
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
  `}function Jb(e){var g,v,b;const t=!!e.configForm&&!e.configLoading&&!e.configSaving,n=Eo(e.configForm,e.agentId),i=Array.isArray((g=n.entry)==null?void 0:g.skills)?(v=n.entry)==null?void 0:v.skills:void 0,s=new Set((i??[]).map(y=>y.trim()).filter(Boolean)),o=i!==void 0,r=!!(e.report&&e.activeAgentId===e.agentId),a=r?((b=e.report)==null?void 0:b.skills)??[]:[],l=e.filter.trim().toLowerCase(),c=l?a.filter(y=>[y.name,y.description,y.source].join(" ").toLowerCase().includes(l)):a,d=ef(c),u=o?a.filter(y=>s.has(y.name)).length:a.length,h=a.length;return f`
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
      ${e.reportsError?f`<div class="callout danger" style="margin-top: 12px;">${e.reportsError}</div>`:S}
      <div style="margin-top: 12px;">
        <div class="label">${p("agents.reports.tasks")}</div>
        ${e.reportsTasks.length===0?f`<div class="muted">${p("agents.reports.noTasks")}</div>`:f`
                <div class="list">
                  ${e.reportsTasks.map(y=>{const A=e.reportsEditingTaskId===y.task_key,E=A?e.reportsEditForm:{};return f`
                      <div class="list-item">
                        <div class="list-main">
                          <div class="list-title">${y.title} <span class="mono">(${y.task_key})</span></div>
                          <div class="list-sub">
                            enabled=${String(A?!!(E.enabled??y.enabled):y.enabled)},
                            cron=${A?E.cron_expr??y.cron_expr:y.cron_expr},
                            tz=${A?E.timezone??y.timezone:y.timezone}
                          </div>
                          ${A?f`
                                  <div class="row" style="gap: 8px; margin-top: 8px; flex-wrap: wrap;">
                                    <label class="field" style="min-width: 170px;">
                                      <span>${p("agents.reports.enabled")}</span>
                                      <select
                                        .value=${String(!!(E.enabled??y.enabled))}
                                        @change=${R=>e.onReportsEditChange({...E,enabled:R.target.value==="true"})}
                                      >
                                        <option value="true">true</option>
                                        <option value="false">false</option>
                                      </select>
                                    </label>
                                    <label class="field" style="min-width: 220px;">
                                      <span>${p("agents.reports.cron")}</span>
                                      <input
                                        .value=${E.cron_expr??y.cron_expr}
                                        @input=${R=>e.onReportsEditChange({...E,cron_expr:R.target.value})}
                                      />
                                    </label>
                                    <label class="field" style="min-width: 180px;">
                                      <span>${p("agents.reports.timezone")}</span>
                                      <input
                                        .value=${E.timezone??y.timezone}
                                        @input=${R=>e.onReportsEditChange({...E,timezone:R.target.value})}
                                      />
                                    </label>
                                  </div>
                                `:S}
                        </div>
                        <div class="list-meta row" style="gap: 6px;">
                          <button class="btn btn--sm" @click=${()=>e.onReportsRun(y.task_key)}>
                            ${p("agents.reports.run")}
                          </button>
                          ${A?f`
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
                          ${y.error_message?f`<div class="muted">error: ${y.error_message}</div>`:S}
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
            ${h>0?f`<span class="mono">${u}/${h}</span>`:S}
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

      ${e.configForm?S:f`
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
            `:S}
      ${e.error?f`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:S}

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
                ${d.map(y=>Zb(y,{agentId:e.agentId,allowSet:s,usingAllowlist:o,editable:t,onToggle:e.onToggle}))}
              </div>
            `}
    </section>
  `}function Zb(e,t){const n=e.id==="workspace"||e.id==="built-in";return f`
    <details class="agent-skills-group" ?open=${!n}>
      <summary class="agent-skills-header">
        <span>${e.label}</span>
        <span class="muted">${e.skills.length}</span>
      </summary>
      <div class="list skills-grid">
        ${e.skills.map(i=>e0(i,{agentId:t.agentId,allowSet:t.allowSet,usingAllowlist:t.usingAllowlist,editable:t.editable,onToggle:t.onToggle}))}
      </div>
    </details>
  `}function e0(e,t){const n=t.usingAllowlist?t.allowSet.has(e.name):!0,i=tf(e),s=nf(e);return f`
    <div class="list-item agent-skill-row">
      <div class="list-main">
        <div class="list-title">${e.emoji?`${e.emoji} `:""}${e.name}</div>
        <div class="list-sub">${e.description}</div>
        ${sf({skill:e})}
        ${i.length>0?f`<div class="muted" style="margin-top: 6px;">Missing: ${i.join(", ")}</div>`:S}
        ${s.length>0?f`<div class="muted" style="margin-top: 6px;">Reason: ${s.join(", ")}</div>`:S}
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
  `}function t0(e){var o,r,a;const t=((o=e.agentsList)==null?void 0:o.agents)??[],n=((r=e.agentsList)==null?void 0:r.defaultId)??null,i=e.selectedAgentId??n??((a=t[0])==null?void 0:a.id)??null,s=i?t.find(l=>l.id===i)??null:null;return f`
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
        ${e.error?f`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:S}
        <div class="agent-list" style="margin-top: 12px;">
          ${t.length===0?f`
                  <div class="muted">No agents found.</div>
                `:t.map(l=>{const c=Jh(l.id,n),d=Co(l,e.agentIdentityById[l.id]??null);return f`
                    <button
                      type="button"
                      class="agent-row ${i===l.id?"active":""}"
                      @click=${()=>e.onSelectAgent(l.id)}
                    >
                      <div class="agent-avatar">${d||Qr(l).slice(0,1)}</div>
                      <div class="agent-info">
                        <div class="agent-title">${Qr(l)}</div>
                        <div class="agent-sub mono">${l.id}</div>
                      </div>
                      ${c?f`<span class="agent-pill">${c}</span>`:S}
                    </button>
                  `})}
        </div>
      </section>
      <section class="agents-main">
        ${s?f`
                ${n0(s,n,e.agentIdentityById[s.id]??null)}
                ${i0(e.activePanel,l=>e.onSelectPanel(l))}
                ${e.activePanel==="overview"?s0({agent:s,defaultId:n,configForm:e.configForm,agentFilesList:e.agentFilesList,agentIdentity:e.agentIdentityById[s.id]??null,agentIdentityError:e.agentIdentityError,agentIdentityLoading:e.agentIdentityLoading,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave,onModelChange:e.onModelChange,onModelFallbacksChange:e.onModelFallbacksChange}):S}
                ${e.activePanel==="files"?Qb({agentId:s.id,agentFilesList:e.agentFilesList,agentFilesLoading:e.agentFilesLoading,agentFilesError:e.agentFilesError,agentFileActive:e.agentFileActive,agentFileContents:e.agentFileContents,agentFileDrafts:e.agentFileDrafts,agentFileSaving:e.agentFileSaving,onLoadFiles:e.onLoadFiles,onSelectFile:e.onSelectFile,onFileDraftChange:e.onFileDraftChange,onFileReset:e.onFileReset,onFileSave:e.onFileSave}):S}
                ${e.activePanel==="tools"?Xb({agentId:s.id,configForm:e.configForm,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,onProfileChange:e.onToolsProfileChange,onOverridesChange:e.onToolsOverridesChange,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):S}
                ${e.activePanel==="skills"?Jb({agentId:s.id,report:e.agentSkillsReport,loading:e.agentSkillsLoading,error:e.agentSkillsError,activeAgentId:e.agentSkillsAgentId,configForm:e.configForm,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,filter:e.skillsFilter,onFilterChange:e.onSkillsFilterChange,onRefresh:e.onSkillsRefresh,onToggle:e.onAgentSkillToggle,onClear:e.onAgentSkillsClear,onDisableAll:e.onAgentSkillsDisableAll,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave,reportsLoading:e.reportsLoading,reportsError:e.reportsError,reportsTasks:e.reportsTasks,reportsRecords:e.reportsRecords,reportsAdminToken:e.reportsAdminToken,reportsEditingTaskId:e.reportsEditingTaskId,reportsEditForm:e.reportsEditForm,onReportsTokenChange:e.onReportsTokenChange,onReportsRefresh:e.onReportsRefresh,onReportsRun:e.onReportsRun,onReportsEditStart:e.onReportsEditStart,onReportsEditCancel:e.onReportsEditCancel,onReportsEditChange:e.onReportsEditChange,onReportsEditSave:e.onReportsEditSave}):S}
                ${e.activePanel==="channels"?Vb({context:Pc(s,e.configForm,e.agentFilesList,n,e.agentIdentityById[s.id]??null),configForm:e.configForm,snapshot:e.channelsSnapshot,loading:e.channelsLoading,error:e.channelsError,lastSuccess:e.channelsLastSuccess,onRefresh:e.onChannelsRefresh}):S}
                ${e.activePanel==="cron"?Gb({context:Pc(s,e.configForm,e.agentFilesList,n,e.agentIdentityById[s.id]??null),agentId:s.id,jobs:e.cronJobs,status:e.cronStatus,loading:e.cronLoading,error:e.cronError,onRefresh:e.onCronRefresh}):S}
              `:f`
                <div class="card">
                  <div class="card-title">Select an agent</div>
                  <div class="card-sub">Pick an agent to inspect its workspace and tools.</div>
                </div>
              `}
      </section>
    </div>
  `}function n0(e,t,n){var a,l;const i=Jh(e.id,t),s=Qr(e),o=((l=(a=e.identity)==null?void 0:a.theme)==null?void 0:l.trim())||"Agent workspace and routing.",r=Co(e,n);return f`
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
        ${i?f`<span class="agent-pill">${i}</span>`:S}
      </div>
    </section>
  `}function i0(e,t){return f`
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
  `}function s0(e){var O,G,le,N,J,ge,Q,Se,se,Te,te,be,q,V,oe,de;const{agent:t,configForm:n,agentFilesList:i,agentIdentity:s,agentIdentityLoading:o,agentIdentityError:r,configLoading:a,configSaving:l,configDirty:c,onConfigReload:d,onConfigSave:u,onModelChange:h,onModelFallbacksChange:g}=e,v=Eo(n,t.id),y=(i&&i.agentId===t.id?i.workspace:null)||((O=v.entry)==null?void 0:O.workspace)||((G=v.defaults)==null?void 0:G.workspace)||"default",A=(le=v.entry)!=null&&le.model?Ci((N=v.entry)==null?void 0:N.model):Ci((J=v.defaults)==null?void 0:J.model),E=Ci((ge=v.defaults)==null?void 0:ge.model),R=Ic((Q=v.entry)==null?void 0:Q.model)||(A!=="-"?Dc(A):null),k=Ic((Se=v.defaults)==null?void 0:Se.model)||(E!=="-"?Dc(E):null),T=R??k??null,M=Pb((se=v.entry)==null?void 0:se.model),m=M?M.join(", "):"",$=((Te=s==null?void 0:s.name)==null?void 0:Te.trim())||((be=(te=t.identity)==null?void 0:te.name)==null?void 0:be.trim())||((q=t.name)==null?void 0:q.trim())||((V=v.entry)==null?void 0:V.name)||"-",I=Co(t,s)||"-",P=Array.isArray((oe=v.entry)==null?void 0:oe.skills)?(de=v.entry)==null?void 0:de.skills:null,F=(P==null?void 0:P.length)??null,U=o?"Loading…":r?"Unavailable":"",W=!!(e.defaultId&&t.id===e.defaultId);return f`
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
          <div class="mono">${A}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Identity Name</div>
          <div>${$}</div>
          ${U?f`<div class="agent-kv-sub muted">${U}</div>`:S}
        </div>
        <div class="agent-kv">
          <div class="label">Default</div>
          <div>${W?"yes":"no"}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Identity Emoji</div>
          <div>${I}</div>
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
            <span>Primary model${W?" (default)":""}</span>
            <select
              .value=${T??""}
              ?disabled=${!n||a||l}
              @change=${Pe=>h(t.id,Pe.target.value||null)}
            >
              ${W?S:f`
                      <option value="">
                        ${k?`Inherit default (${k})`:"Inherit default"}
                      </option>
                    `}
              ${Ob(n,T??void 0)}
            </select>
          </label>
          <label class="field" style="min-width: 260px; flex: 1;">
            <span>Fallbacks (comma-separated)</span>
            <input
              .value=${m}
              ?disabled=${!n||a||l}
              placeholder="provider/model, provider/model"
              @input=${Pe=>g(t.id,Db(Pe.target.value))}
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
  `}function Fc(e){var t;e&&((t=navigator.clipboard)==null||t.writeText(e).catch(()=>{}))}function o0(e){const{loading:t,saving:n,error:i,content:s,lastSuccessAt:o,dependentFiles:r,onReload:a,onSave:l,onContentChange:c}=e,d=o!=null?new Date(o).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"";return f`
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
              </span>`:S}
          <button class="btn" ?disabled=${t} @click=${a}>
            ${p(t?"businessKnowledge.actions.reloading":"businessKnowledge.actions.reload")}
          </button>
          <button class="btn btn--primary" ?disabled=${t||n} @click=${()=>l(s)}>
            ${p(n?"businessKnowledge.actions.saving":"businessKnowledge.actions.save")}
          </button>
        </div>
      </div>
      ${i?f`<div class="callout danger" style="margin-top: 12px;">${i}</div>`:S}
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
                        @click=${()=>Fc(r.mapping_table)}
                        title=${p("businessKnowledge.relatedFiles.copyPath")}
                      >
                        ${p("businessKnowledge.relatedFiles.copyPath")}
                      </button>
                    </div>
                  `:S}
              ${r.price_library?f`
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                      <span style="min-width: 100px;">
                        ${p("businessKnowledge.relatedFiles.priceLibraryLabel")}
                      </span>
                      <code style="flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; font-size: 0.85rem;">${r.price_library}</code>
                      <button
                        class="btn"
                        style="flex-shrink: 0;"
                        @click=${()=>Fc(r.price_library)}
                        title=${p("businessKnowledge.relatedFiles.copyPath")}
                      >
                        ${p("businessKnowledge.relatedFiles.copyPath")}
                      </button>
                    </div>
                  `:S}
            </div>
          `:S}
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
 */const Ri=(e,t)=>{var i;const n=e._$AN;if(n===void 0)return!1;for(const s of n)(i=s._$AO)==null||i.call(s,t,!1),Ri(s,t);return!0},to=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while((n==null?void 0:n.size)===0)},of=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),l0(t)}};function r0(e){this._$AN!==void 0?(to(this),this._$AM=e,of(this)):this._$AM=e}function a0(e,t=!1,n=0){const i=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(t)if(Array.isArray(i))for(let o=n;o<i.length;o++)Ri(i[o],!1),to(i[o]);else i!=null&&(Ri(i,!1),to(i));else Ri(this,e)}const l0=e=>{e.type==Xa.CHILD&&(e._$AP??(e._$AP=a0),e._$AQ??(e._$AQ=r0))};class c0 extends Za{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,n,i){super._$AT(t,n,i),of(this),this.isConnected=t._$AU}_$AO(t,n=!0){var i,s;t!==this.isConnected&&(this.isConnected=t,t?(i=this.reconnected)==null||i.call(this):(s=this.disconnected)==null||s.call(this)),n&&(Ri(this,t),to(this))}setValue(t){if(rb(this._$Ct))this._$Ct._$AI(t,this);else{const n=[...this._$Ct._$AH];n[this._$Ci]=t,this._$Ct._$AI(n,this,0)}}disconnected(){}reconnected(){}}const fr=new WeakMap,d0=Ja(class extends c0{render(e){return S}update(e,[t]){var i;const n=t!==this.G;return n&&this.G!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=(i=e.options)==null?void 0:i.host,this.rt(this.ct=e.element)),S}rt(e){if(this.isConnected||(e=void 0),typeof this.G=="function"){const t=this.ht??globalThis;let n=fr.get(t);n===void 0&&(n=new WeakMap,fr.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){var e,t;return typeof this.G=="function"?(e=fr.get(this.ht??globalThis))==null?void 0:e.get(this.G):(t=this.G)==null?void 0:t.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Xr extends Za{constructor(t){if(super(t),this.it=S,t.type!==Xa.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===S||t==null)return this._t=void 0,this.it=t;if(t===Ut)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}Xr.directiveName="unsafeHTML",Xr.resultType=1;const Jr=Ja(Xr);/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:rf,setPrototypeOf:Nc,isFrozen:u0,getPrototypeOf:h0,getOwnPropertyDescriptor:f0}=Object;let{freeze:Oe,seal:Ye,create:Zr}=Object,{apply:ea,construct:ta}=typeof Reflect<"u"&&Reflect;Oe||(Oe=function(t){return t});Ye||(Ye=function(t){return t});ea||(ea=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),o=2;o<i;o++)s[o-2]=arguments[o];return t.apply(n,s)});ta||(ta=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const bs=Fe(Array.prototype.forEach),p0=Fe(Array.prototype.lastIndexOf),Bc=Fe(Array.prototype.pop),ai=Fe(Array.prototype.push),g0=Fe(Array.prototype.splice),Us=Fe(String.prototype.toLowerCase),pr=Fe(String.prototype.toString),gr=Fe(String.prototype.match),li=Fe(String.prototype.replace),m0=Fe(String.prototype.indexOf),v0=Fe(String.prototype.trim),Xe=Fe(Object.prototype.hasOwnProperty),De=Fe(RegExp.prototype.test),ci=y0(TypeError);function Fe(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return ea(e,t,i)}}function y0(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return ta(e,n)}}function Y(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Us;Nc&&Nc(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const o=n(s);o!==s&&(u0(t)||(t[i]=o),s=o)}e[s]=!0}return e}function b0(e){for(let t=0;t<e.length;t++)Xe(e,t)||(e[t]=null);return e}function ct(e){const t=Zr(null);for(const[n,i]of rf(e))Xe(e,n)&&(Array.isArray(i)?t[n]=b0(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=ct(i):t[n]=i);return t}function di(e,t){for(;e!==null;){const i=f0(e,t);if(i){if(i.get)return Fe(i.get);if(typeof i.value=="function")return Fe(i.value)}e=h0(e)}function n(){return null}return n}const zc=Oe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),mr=Oe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),vr=Oe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),w0=Oe(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),yr=Oe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),x0=Oe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Hc=Oe(["#text"]),Uc=Oe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),br=Oe(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),jc=Oe(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ws=Oe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),_0=Ye(/\{\{[\w\W]*|[\w\W]*\}\}/gm),k0=Ye(/<%[\w\W]*|[\w\W]*%>/gm),$0=Ye(/\$\{[\w\W]*/gm),S0=Ye(/^data-[\-\w.\u00B7-\uFFFF]+$/),A0=Ye(/^aria-[\-\w]+$/),af=Ye(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),T0=Ye(/^(?:\w+script|data):/i),C0=Ye(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),lf=Ye(/^html$/i),E0=Ye(/^[a-z][.\w]*(-[.\w]+)+$/i);var qc=Object.freeze({__proto__:null,ARIA_ATTR:A0,ATTR_WHITESPACE:C0,CUSTOM_ELEMENT:E0,DATA_ATTR:S0,DOCTYPE_NAME:lf,ERB_EXPR:k0,IS_ALLOWED_URI:af,IS_SCRIPT_OR_DATA:T0,MUSTACHE_EXPR:_0,TMPLIT_EXPR:$0});const ui={element:1,text:3,progressingInstruction:7,comment:8,document:9},R0=function(){return typeof window>"u"?null:window},L0=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const o="dompurify"+(i?"#"+i:"");try{return t.createPolicy(o,{createHTML(r){return r},createScriptURL(r){return r}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Kc=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function cf(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:R0();const t=j=>cf(j);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==ui.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:o,HTMLTemplateElement:r,Node:a,Element:l,NodeFilter:c,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:u,DOMParser:h,trustedTypes:g}=e,v=l.prototype,b=di(v,"cloneNode"),y=di(v,"remove"),A=di(v,"nextSibling"),E=di(v,"childNodes"),R=di(v,"parentNode");if(typeof r=="function"){const j=n.createElement("template");j.content&&j.content.ownerDocument&&(n=j.content.ownerDocument)}let k,T="";const{implementation:M,createNodeIterator:m,createDocumentFragment:$,getElementsByTagName:L}=n,{importNode:I}=i;let P=Kc();t.isSupported=typeof rf=="function"&&typeof R=="function"&&M&&M.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:F,ERB_EXPR:U,TMPLIT_EXPR:W,DATA_ATTR:O,ARIA_ATTR:G,IS_SCRIPT_OR_DATA:le,ATTR_WHITESPACE:N,CUSTOM_ELEMENT:J}=qc;let{IS_ALLOWED_URI:ge}=qc,Q=null;const Se=Y({},[...zc,...mr,...vr,...yr,...Hc]);let se=null;const Te=Y({},[...Uc,...br,...jc,...ws]);let te=Object.seal(Zr(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),be=null,q=null;const V=Object.seal(Zr(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let oe=!0,de=!0,Pe=!1,ss=!0,Ln=!1,os=!0,Yt=!1,Bo=!1,zo=!1,Mn=!1,rs=!1,as=!1,$l=!0,Sl=!1;const bp="user-content-";let Ho=!0,ii=!1,Pn={},ot=null;const Uo=Y({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Al=null;const Tl=Y({},["audio","video","img","source","image","track"]);let jo=null;const Cl=Y({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ls="http://www.w3.org/1998/Math/MathML",cs="http://www.w3.org/2000/svg",bt="http://www.w3.org/1999/xhtml";let Dn=bt,qo=!1,Ko=null;const wp=Y({},[ls,cs,bt],pr);let ds=Y({},["mi","mo","mn","ms","mtext"]),us=Y({},["annotation-xml"]);const xp=Y({},["title","style","font","a","script"]);let si=null;const _p=["application/xhtml+xml","text/html"],kp="text/html";let we=null,In=null;const $p=n.createElement("form"),El=function(C){return C instanceof RegExp||C instanceof Function},Wo=function(){let C=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(In&&In===C)){if((!C||typeof C!="object")&&(C={}),C=ct(C),si=_p.indexOf(C.PARSER_MEDIA_TYPE)===-1?kp:C.PARSER_MEDIA_TYPE,we=si==="application/xhtml+xml"?pr:Us,Q=Xe(C,"ALLOWED_TAGS")?Y({},C.ALLOWED_TAGS,we):Se,se=Xe(C,"ALLOWED_ATTR")?Y({},C.ALLOWED_ATTR,we):Te,Ko=Xe(C,"ALLOWED_NAMESPACES")?Y({},C.ALLOWED_NAMESPACES,pr):wp,jo=Xe(C,"ADD_URI_SAFE_ATTR")?Y(ct(Cl),C.ADD_URI_SAFE_ATTR,we):Cl,Al=Xe(C,"ADD_DATA_URI_TAGS")?Y(ct(Tl),C.ADD_DATA_URI_TAGS,we):Tl,ot=Xe(C,"FORBID_CONTENTS")?Y({},C.FORBID_CONTENTS,we):Uo,be=Xe(C,"FORBID_TAGS")?Y({},C.FORBID_TAGS,we):ct({}),q=Xe(C,"FORBID_ATTR")?Y({},C.FORBID_ATTR,we):ct({}),Pn=Xe(C,"USE_PROFILES")?C.USE_PROFILES:!1,oe=C.ALLOW_ARIA_ATTR!==!1,de=C.ALLOW_DATA_ATTR!==!1,Pe=C.ALLOW_UNKNOWN_PROTOCOLS||!1,ss=C.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ln=C.SAFE_FOR_TEMPLATES||!1,os=C.SAFE_FOR_XML!==!1,Yt=C.WHOLE_DOCUMENT||!1,Mn=C.RETURN_DOM||!1,rs=C.RETURN_DOM_FRAGMENT||!1,as=C.RETURN_TRUSTED_TYPE||!1,zo=C.FORCE_BODY||!1,$l=C.SANITIZE_DOM!==!1,Sl=C.SANITIZE_NAMED_PROPS||!1,Ho=C.KEEP_CONTENT!==!1,ii=C.IN_PLACE||!1,ge=C.ALLOWED_URI_REGEXP||af,Dn=C.NAMESPACE||bt,ds=C.MATHML_TEXT_INTEGRATION_POINTS||ds,us=C.HTML_INTEGRATION_POINTS||us,te=C.CUSTOM_ELEMENT_HANDLING||{},C.CUSTOM_ELEMENT_HANDLING&&El(C.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(te.tagNameCheck=C.CUSTOM_ELEMENT_HANDLING.tagNameCheck),C.CUSTOM_ELEMENT_HANDLING&&El(C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(te.attributeNameCheck=C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),C.CUSTOM_ELEMENT_HANDLING&&typeof C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(te.allowCustomizedBuiltInElements=C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ln&&(de=!1),rs&&(Mn=!0),Pn&&(Q=Y({},Hc),se=[],Pn.html===!0&&(Y(Q,zc),Y(se,Uc)),Pn.svg===!0&&(Y(Q,mr),Y(se,br),Y(se,ws)),Pn.svgFilters===!0&&(Y(Q,vr),Y(se,br),Y(se,ws)),Pn.mathMl===!0&&(Y(Q,yr),Y(se,jc),Y(se,ws))),C.ADD_TAGS&&(typeof C.ADD_TAGS=="function"?V.tagCheck=C.ADD_TAGS:(Q===Se&&(Q=ct(Q)),Y(Q,C.ADD_TAGS,we))),C.ADD_ATTR&&(typeof C.ADD_ATTR=="function"?V.attributeCheck=C.ADD_ATTR:(se===Te&&(se=ct(se)),Y(se,C.ADD_ATTR,we))),C.ADD_URI_SAFE_ATTR&&Y(jo,C.ADD_URI_SAFE_ATTR,we),C.FORBID_CONTENTS&&(ot===Uo&&(ot=ct(ot)),Y(ot,C.FORBID_CONTENTS,we)),C.ADD_FORBID_CONTENTS&&(ot===Uo&&(ot=ct(ot)),Y(ot,C.ADD_FORBID_CONTENTS,we)),Ho&&(Q["#text"]=!0),Yt&&Y(Q,["html","head","body"]),Q.table&&(Y(Q,["tbody"]),delete be.tbody),C.TRUSTED_TYPES_POLICY){if(typeof C.TRUSTED_TYPES_POLICY.createHTML!="function")throw ci('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof C.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ci('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');k=C.TRUSTED_TYPES_POLICY,T=k.createHTML("")}else k===void 0&&(k=L0(g,s)),k!==null&&typeof T=="string"&&(T=k.createHTML(""));Oe&&Oe(C),In=C}},Rl=Y({},[...mr,...vr,...w0]),Ll=Y({},[...yr,...x0]),Sp=function(C){let D=R(C);(!D||!D.tagName)&&(D={namespaceURI:Dn,tagName:"template"});const H=Us(C.tagName),fe=Us(D.tagName);return Ko[C.namespaceURI]?C.namespaceURI===cs?D.namespaceURI===bt?H==="svg":D.namespaceURI===ls?H==="svg"&&(fe==="annotation-xml"||ds[fe]):!!Rl[H]:C.namespaceURI===ls?D.namespaceURI===bt?H==="math":D.namespaceURI===cs?H==="math"&&us[fe]:!!Ll[H]:C.namespaceURI===bt?D.namespaceURI===cs&&!us[fe]||D.namespaceURI===ls&&!ds[fe]?!1:!Ll[H]&&(xp[H]||!Rl[H]):!!(si==="application/xhtml+xml"&&Ko[C.namespaceURI]):!1},rt=function(C){ai(t.removed,{element:C});try{R(C).removeChild(C)}catch{y(C)}},Xt=function(C,D){try{ai(t.removed,{attribute:D.getAttributeNode(C),from:D})}catch{ai(t.removed,{attribute:null,from:D})}if(D.removeAttribute(C),C==="is")if(Mn||rs)try{rt(D)}catch{}else try{D.setAttribute(C,"")}catch{}},Ml=function(C){let D=null,H=null;if(zo)C="<remove></remove>"+C;else{const ve=gr(C,/^[\r\n\t ]+/);H=ve&&ve[0]}si==="application/xhtml+xml"&&Dn===bt&&(C='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+C+"</body></html>");const fe=k?k.createHTML(C):C;if(Dn===bt)try{D=new h().parseFromString(fe,si)}catch{}if(!D||!D.documentElement){D=M.createDocument(Dn,"template",null);try{D.documentElement.innerHTML=qo?T:fe}catch{}}const Ce=D.body||D.documentElement;return C&&H&&Ce.insertBefore(n.createTextNode(H),Ce.childNodes[0]||null),Dn===bt?L.call(D,Yt?"html":"body")[0]:Yt?D.documentElement:Ce},Pl=function(C){return m.call(C.ownerDocument||C,C,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Vo=function(C){return C instanceof u&&(typeof C.nodeName!="string"||typeof C.textContent!="string"||typeof C.removeChild!="function"||!(C.attributes instanceof d)||typeof C.removeAttribute!="function"||typeof C.setAttribute!="function"||typeof C.namespaceURI!="string"||typeof C.insertBefore!="function"||typeof C.hasChildNodes!="function")},Dl=function(C){return typeof a=="function"&&C instanceof a};function wt(j,C,D){bs(j,H=>{H.call(t,C,D,In)})}const Il=function(C){let D=null;if(wt(P.beforeSanitizeElements,C,null),Vo(C))return rt(C),!0;const H=we(C.nodeName);if(wt(P.uponSanitizeElement,C,{tagName:H,allowedTags:Q}),os&&C.hasChildNodes()&&!Dl(C.firstElementChild)&&De(/<[/\w!]/g,C.innerHTML)&&De(/<[/\w!]/g,C.textContent)||C.nodeType===ui.progressingInstruction||os&&C.nodeType===ui.comment&&De(/<[/\w]/g,C.data))return rt(C),!0;if(!(V.tagCheck instanceof Function&&V.tagCheck(H))&&(!Q[H]||be[H])){if(!be[H]&&Fl(H)&&(te.tagNameCheck instanceof RegExp&&De(te.tagNameCheck,H)||te.tagNameCheck instanceof Function&&te.tagNameCheck(H)))return!1;if(Ho&&!ot[H]){const fe=R(C)||C.parentNode,Ce=E(C)||C.childNodes;if(Ce&&fe){const ve=Ce.length;for(let Ne=ve-1;Ne>=0;--Ne){const xt=b(Ce[Ne],!0);xt.__removalCount=(C.__removalCount||0)+1,fe.insertBefore(xt,A(C))}}}return rt(C),!0}return C instanceof l&&!Sp(C)||(H==="noscript"||H==="noembed"||H==="noframes")&&De(/<\/no(script|embed|frames)/i,C.innerHTML)?(rt(C),!0):(Ln&&C.nodeType===ui.text&&(D=C.textContent,bs([F,U,W],fe=>{D=li(D,fe," ")}),C.textContent!==D&&(ai(t.removed,{element:C.cloneNode()}),C.textContent=D)),wt(P.afterSanitizeElements,C,null),!1)},Ol=function(C,D,H){if($l&&(D==="id"||D==="name")&&(H in n||H in $p))return!1;if(!(de&&!q[D]&&De(O,D))){if(!(oe&&De(G,D))){if(!(V.attributeCheck instanceof Function&&V.attributeCheck(D,C))){if(!se[D]||q[D]){if(!(Fl(C)&&(te.tagNameCheck instanceof RegExp&&De(te.tagNameCheck,C)||te.tagNameCheck instanceof Function&&te.tagNameCheck(C))&&(te.attributeNameCheck instanceof RegExp&&De(te.attributeNameCheck,D)||te.attributeNameCheck instanceof Function&&te.attributeNameCheck(D,C))||D==="is"&&te.allowCustomizedBuiltInElements&&(te.tagNameCheck instanceof RegExp&&De(te.tagNameCheck,H)||te.tagNameCheck instanceof Function&&te.tagNameCheck(H))))return!1}else if(!jo[D]){if(!De(ge,li(H,N,""))){if(!((D==="src"||D==="xlink:href"||D==="href")&&C!=="script"&&m0(H,"data:")===0&&Al[C])){if(!(Pe&&!De(le,li(H,N,"")))){if(H)return!1}}}}}}}return!0},Fl=function(C){return C!=="annotation-xml"&&gr(C,J)},Nl=function(C){wt(P.beforeSanitizeAttributes,C,null);const{attributes:D}=C;if(!D||Vo(C))return;const H={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:se,forceKeepAttr:void 0};let fe=D.length;for(;fe--;){const Ce=D[fe],{name:ve,namespaceURI:Ne,value:xt}=Ce,On=we(ve),Go=xt;let Ae=ve==="value"?Go:v0(Go);if(H.attrName=On,H.attrValue=Ae,H.keepAttr=!0,H.forceKeepAttr=void 0,wt(P.uponSanitizeAttribute,C,H),Ae=H.attrValue,Sl&&(On==="id"||On==="name")&&(Xt(ve,C),Ae=bp+Ae),os&&De(/((--!?|])>)|<\/(style|title|textarea)/i,Ae)){Xt(ve,C);continue}if(On==="attributename"&&gr(Ae,"href")){Xt(ve,C);continue}if(H.forceKeepAttr)continue;if(!H.keepAttr){Xt(ve,C);continue}if(!ss&&De(/\/>/i,Ae)){Xt(ve,C);continue}Ln&&bs([F,U,W],zl=>{Ae=li(Ae,zl," ")});const Bl=we(C.nodeName);if(!Ol(Bl,On,Ae)){Xt(ve,C);continue}if(k&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!Ne)switch(g.getAttributeType(Bl,On)){case"TrustedHTML":{Ae=k.createHTML(Ae);break}case"TrustedScriptURL":{Ae=k.createScriptURL(Ae);break}}if(Ae!==Go)try{Ne?C.setAttributeNS(Ne,ve,Ae):C.setAttribute(ve,Ae),Vo(C)?rt(C):Bc(t.removed)}catch{Xt(ve,C)}}wt(P.afterSanitizeAttributes,C,null)},Ap=function j(C){let D=null;const H=Pl(C);for(wt(P.beforeSanitizeShadowDOM,C,null);D=H.nextNode();)wt(P.uponSanitizeShadowNode,D,null),Il(D),Nl(D),D.content instanceof o&&j(D.content);wt(P.afterSanitizeShadowDOM,C,null)};return t.sanitize=function(j){let C=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},D=null,H=null,fe=null,Ce=null;if(qo=!j,qo&&(j="<!-->"),typeof j!="string"&&!Dl(j))if(typeof j.toString=="function"){if(j=j.toString(),typeof j!="string")throw ci("dirty is not a string, aborting")}else throw ci("toString is not a function");if(!t.isSupported)return j;if(Bo||Wo(C),t.removed=[],typeof j=="string"&&(ii=!1),ii){if(j.nodeName){const xt=we(j.nodeName);if(!Q[xt]||be[xt])throw ci("root node is forbidden and cannot be sanitized in-place")}}else if(j instanceof a)D=Ml("<!---->"),H=D.ownerDocument.importNode(j,!0),H.nodeType===ui.element&&H.nodeName==="BODY"||H.nodeName==="HTML"?D=H:D.appendChild(H);else{if(!Mn&&!Ln&&!Yt&&j.indexOf("<")===-1)return k&&as?k.createHTML(j):j;if(D=Ml(j),!D)return Mn?null:as?T:""}D&&zo&&rt(D.firstChild);const ve=Pl(ii?j:D);for(;fe=ve.nextNode();)Il(fe),Nl(fe),fe.content instanceof o&&Ap(fe.content);if(ii)return j;if(Mn){if(rs)for(Ce=$.call(D.ownerDocument);D.firstChild;)Ce.appendChild(D.firstChild);else Ce=D;return(se.shadowroot||se.shadowrootmode)&&(Ce=I.call(i,Ce,!0)),Ce}let Ne=Yt?D.outerHTML:D.innerHTML;return Yt&&Q["!doctype"]&&D.ownerDocument&&D.ownerDocument.doctype&&D.ownerDocument.doctype.name&&De(lf,D.ownerDocument.doctype.name)&&(Ne="<!DOCTYPE "+D.ownerDocument.doctype.name+`>
`+Ne),Ln&&bs([F,U,W],xt=>{Ne=li(Ne,xt," ")}),k&&as?k.createHTML(Ne):Ne},t.setConfig=function(){let j=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Wo(j),Bo=!0},t.clearConfig=function(){In=null,Bo=!1},t.isValidAttribute=function(j,C,D){In||Wo({});const H=we(j),fe=we(C);return Ol(H,fe,D)},t.addHook=function(j,C){typeof C=="function"&&ai(P[j],C)},t.removeHook=function(j,C){if(C!==void 0){const D=p0(P[j],C);return D===-1?void 0:g0(P[j],D,1)[0]}return Bc(P[j])},t.removeHooks=function(j){P[j]=[]},t.removeAllHooks=function(){P=Kc()},t}var na=cf();function el(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var En=el();function df(e){En=e}var ln={exec:()=>null};function ee(e,t=""){let n=typeof e=="string"?e:e.source,i={replace:(s,o)=>{let r=typeof o=="string"?o:o.source;return r=r.replace(Ie.caret,"$1"),n=n.replace(s,r),i},getRegex:()=>new RegExp(n,t)};return i}var M0=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Ie={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}>`)},P0=/^(?:[ \t]*(?:\n|$))+/,D0=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,I0=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ts=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,O0=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,tl=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,uf=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,hf=ee(uf).replace(/bull/g,tl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),F0=ee(uf).replace(/bull/g,tl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),nl=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,N0=/^[^\n]+/,il=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,B0=ee(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",il).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),z0=ee(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,tl).getRegex(),Ro="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",sl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,H0=ee("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",sl).replace("tag",Ro).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ff=ee(nl).replace("hr",ts).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ro).getRegex(),U0=ee(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ff).getRegex(),ol={blockquote:U0,code:D0,def:B0,fences:I0,heading:O0,hr:ts,html:H0,lheading:hf,list:z0,newline:P0,paragraph:ff,table:ln,text:N0},Wc=ee("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ts).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ro).getRegex(),j0={...ol,lheading:F0,table:Wc,paragraph:ee(nl).replace("hr",ts).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Wc).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ro).getRegex()},q0={...ol,html:ee(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",sl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ln,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ee(nl).replace("hr",ts).replace("heading",` *#{1,6} *[^
]`).replace("lheading",hf).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},K0=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,W0=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,pf=/^( {2,}|\\)\n(?!\s*$)/,V0=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Lo=/[\p{P}\p{S}]/u,rl=/[\s\p{P}\p{S}]/u,gf=/[^\s\p{P}\p{S}]/u,G0=ee(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,rl).getRegex(),mf=/(?!~)[\p{P}\p{S}]/u,Q0=/(?!~)[\s\p{P}\p{S}]/u,Y0=/(?:[^\s\p{P}\p{S}]|~)/u,vf=/(?![*_])[\p{P}\p{S}]/u,X0=/(?![*_])[\s\p{P}\p{S}]/u,J0=/(?:[^\s\p{P}\p{S}]|[*_])/u,Z0=ee(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",M0?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),yf=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,ew=ee(yf,"u").replace(/punct/g,Lo).getRegex(),tw=ee(yf,"u").replace(/punct/g,mf).getRegex(),bf="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",nw=ee(bf,"gu").replace(/notPunctSpace/g,gf).replace(/punctSpace/g,rl).replace(/punct/g,Lo).getRegex(),iw=ee(bf,"gu").replace(/notPunctSpace/g,Y0).replace(/punctSpace/g,Q0).replace(/punct/g,mf).getRegex(),sw=ee("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,gf).replace(/punctSpace/g,rl).replace(/punct/g,Lo).getRegex(),ow=ee(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,vf).getRegex(),rw="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",aw=ee(rw,"gu").replace(/notPunctSpace/g,J0).replace(/punctSpace/g,X0).replace(/punct/g,vf).getRegex(),lw=ee(/\\(punct)/,"gu").replace(/punct/g,Lo).getRegex(),cw=ee(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),dw=ee(sl).replace("(?:-->|$)","-->").getRegex(),uw=ee("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",dw).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),no=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,hw=ee(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",no).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),wf=ee(/^!?\[(label)\]\[(ref)\]/).replace("label",no).replace("ref",il).getRegex(),xf=ee(/^!?\[(ref)\](?:\[\])?/).replace("ref",il).getRegex(),fw=ee("reflink|nolink(?!\\()","g").replace("reflink",wf).replace("nolink",xf).getRegex(),Vc=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,al={_backpedal:ln,anyPunctuation:lw,autolink:cw,blockSkip:Z0,br:pf,code:W0,del:ln,delLDelim:ln,delRDelim:ln,emStrongLDelim:ew,emStrongRDelimAst:nw,emStrongRDelimUnd:sw,escape:K0,link:hw,nolink:xf,punctuation:G0,reflink:wf,reflinkSearch:fw,tag:uw,text:V0,url:ln},pw={...al,link:ee(/^!?\[(label)\]\((.*?)\)/).replace("label",no).getRegex(),reflink:ee(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",no).getRegex()},ia={...al,emStrongRDelimAst:iw,emStrongLDelim:tw,delLDelim:ow,delRDelim:aw,url:ee(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Vc).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ee(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Vc).getRegex()},gw={...ia,br:ee(pf).replace("{2,}","*").getRegex(),text:ee(ia.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},xs={normal:ol,gfm:j0,pedantic:q0},hi={normal:al,gfm:ia,breaks:gw,pedantic:pw},mw={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Gc=e=>mw[e];function dt(e,t){if(t){if(Ie.escapeTest.test(e))return e.replace(Ie.escapeReplace,Gc)}else if(Ie.escapeTestNoEncode.test(e))return e.replace(Ie.escapeReplaceNoEncode,Gc);return e}function Qc(e){try{e=encodeURI(e).replace(Ie.percentDecode,"%")}catch{return null}return e}function Yc(e,t){var o;let n=e.replace(Ie.findPipe,(r,a,l)=>{let c=!1,d=a;for(;--d>=0&&l[d]==="\\";)c=!c;return c?"|":" |"}),i=n.split(Ie.splitPipe),s=0;if(i[0].trim()||i.shift(),i.length>0&&!((o=i.at(-1))!=null&&o.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(Ie.slashPipe,"|");return i}function fi(e,t,n){let i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function vw(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function yw(e,t=0){let n=t,i="";for(let s of e)if(s==="	"){let o=4-n%4;i+=" ".repeat(o),n+=o}else i+=s,n++;return i}function Xc(e,t,n,i,s){let o=t.href,r=t.title||null,a=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:r,text:a,tokens:i.inlineTokens(a)};return i.state.inLink=!1,l}function bw(e,t,n){let i=e.match(n.other.indentCodeCompensation);if(i===null)return t;let s=i[1];return t.split(`
`).map(o=>{let r=o.match(n.other.beginningSpace);if(r===null)return o;let[a]=r;return a.length>=s.length?o.slice(s.length):o}).join(`
`)}var io=class{constructor(e){B(this,"options");B(this,"rules");B(this,"lexer");this.options=e||En}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:fi(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],i=bw(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let i=fi(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:fi(t[0],`
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
`);continue}}return{type:"blockquote",raw:i,tokens:o,text:s}}}list(e){var n,i;let t=this.rules.block.list.exec(e);if(t){let s=t[1].trim(),o=s.length>1,r={type:"list",raw:"",ordered:o,start:o?+s.slice(0,-1):"",loose:!1,items:[]};s=o?`\\d{1,9}\\${s.slice(-1)}`:`\\${s}`,this.options.pedantic&&(s=o?s:"[*+-]");let a=this.rules.other.listItemRegex(s),l=!1;for(;e;){let d=!1,u="",h="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let g=yw(t[2].split(`
`,1)[0],t[1].length),v=e.split(`
`,1)[0],b=!g.trim(),y=0;if(this.options.pedantic?(y=2,h=g.trimStart()):b?y=t[1].length+1:(y=g.search(this.rules.other.nonSpaceChar),y=y>4?1:y,h=g.slice(y),y+=t[1].length),b&&this.rules.other.blankLine.test(v)&&(u+=v+`
`,e=e.substring(v.length+1),d=!0),!d){let A=this.rules.other.nextBulletRegex(y),E=this.rules.other.hrRegex(y),R=this.rules.other.fencesBeginRegex(y),k=this.rules.other.headingBeginRegex(y),T=this.rules.other.htmlBeginRegex(y),M=this.rules.other.blockquoteBeginRegex(y);for(;e;){let m=e.split(`
`,1)[0],$;if(v=m,this.options.pedantic?(v=v.replace(this.rules.other.listReplaceNesting,"  "),$=v):$=v.replace(this.rules.other.tabCharGlobal,"    "),R.test(v)||k.test(v)||T.test(v)||M.test(v)||A.test(v)||E.test(v))break;if($.search(this.rules.other.nonSpaceChar)>=y||!v.trim())h+=`
`+$.slice(y);else{if(b||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||R.test(g)||k.test(g)||E.test(g))break;h+=`
`+v}b=!v.trim(),u+=m+`
`,e=e.substring(m.length+1),g=$.slice(y)}}r.loose||(l?r.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(l=!0)),r.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(h),loose:!1,text:h,tokens:[]}),r.raw+=u}let c=r.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;r.raw=r.raw.trimEnd();for(let d of r.items){if(this.lexer.state.top=!1,d.tokens=this.lexer.blockTokens(d.text,[]),d.task){if(d.text=d.text.replace(this.rules.other.listReplaceTask,""),((n=d.tokens[0])==null?void 0:n.type)==="text"||((i=d.tokens[0])==null?void 0:i.type)==="paragraph"){d.tokens[0].raw=d.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),d.tokens[0].text=d.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let h=this.lexer.inlineQueue.length-1;h>=0;h--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[h].src)){this.lexer.inlineQueue[h].src=this.lexer.inlineQueue[h].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(d.raw);if(u){let h={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};d.checked=h.checked,r.loose?d.tokens[0]&&["paragraph","text"].includes(d.tokens[0].type)&&"tokens"in d.tokens[0]&&d.tokens[0].tokens?(d.tokens[0].raw=h.raw+d.tokens[0].raw,d.tokens[0].text=h.raw+d.tokens[0].text,d.tokens[0].tokens.unshift(h)):d.tokens.unshift({type:"paragraph",raw:h.raw,text:h.raw,tokens:[h]}):d.tokens.unshift(h)}}if(!r.loose){let u=d.tokens.filter(g=>g.type==="space"),h=u.length>0&&u.some(g=>this.rules.other.anyLine.test(g.raw));r.loose=h}}if(r.loose)for(let d of r.items){d.loose=!0;for(let u of d.tokens)u.type==="text"&&(u.type="paragraph")}return r}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var r;let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Yc(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(r=t[3])!=null&&r.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(let a of i)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Yc(a,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=fi(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=vw(t[2],"()");if(o===-2)return;if(o>-1){let r=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(i);o&&(i=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),Xc(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Xc(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(i[1]||i[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...i[0]].length-1,o,r,a=s,l=0,c=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+s);(i=c.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(r=[...o].length,i[3]||i[4]){a+=r;continue}else if((i[5]||i[6])&&s%3&&!((s+r)%3)){l+=r;continue}if(a-=r,a>0)continue;r=Math.min(r,r+a+l);let d=[...i[0]][0].length,u=e.slice(0,s+i.index+d+r);if(Math.min(s,r)%2){let g=u.slice(1,-1);return{type:"em",raw:u,text:g,tokens:this.lexer.inlineTokens(g)}}let h=u.slice(2,-2);return{type:"strong",raw:u,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e,t,n=""){let i=this.rules.inline.delLDelim.exec(e);if(i&&(!i[1]||!n||this.rules.inline.punctuation.exec(n))){let s=[...i[0]].length-1,o,r,a=s,l=this.rules.inline.delRDelim;for(l.lastIndex=0,t=t.slice(-1*e.length+s);(i=l.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o||(r=[...o].length,r!==s))continue;if(i[3]||i[4]){a+=r;continue}if(a-=r,a>0)continue;r=Math.min(r,r+a);let c=[...i[0]][0].length,d=e.slice(0,s+i.index+c+r),u=d.slice(s,-s);return{type:"del",raw:d,text:u,tokens:this.lexer.inlineTokens(u)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let o;do o=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(o!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Ze=class sa{constructor(t){B(this,"tokens");B(this,"options");B(this,"state");B(this,"inlineQueue");B(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||En,this.options.tokenizer=this.options.tokenizer||new io,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:Ie,block:xs.normal,inline:hi.normal};this.options.pedantic?(n.block=xs.pedantic,n.inline=hi.pedantic):this.options.gfm&&(n.block=xs.gfm,this.options.breaks?n.inline=hi.breaks:n.inline=hi.gfm),this.tokenizer.rules=n}static get rules(){return{block:xs,inline:hi}}static lex(t,n){return new sa(n).lex(t)}static lexInline(t,n){return new sa(n).inlineTokens(t)}lex(t){t=t.replace(Ie.carriageReturn,`
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
`+a.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(a);continue}if(t){let c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var l,c,d,u,h;let i=t,s=null;if(this.tokens.links){let g=Object.keys(this.tokens.links);if(g.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)g.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)o=s[2]?s[2].length:0,i=i.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);i=((c=(l=this.options.hooks)==null?void 0:l.emStrongMask)==null?void 0:c.call({lexer:this},i))??i;let r=!1,a="";for(;t;){r||(a=""),r=!1;let g;if((u=(d=this.options.extensions)==null?void 0:d.inline)!=null&&u.some(b=>(g=b.call({lexer:this},t,n))?(t=t.substring(g.raw.length),n.push(g),!0):!1))continue;if(g=this.tokenizer.escape(t)){t=t.substring(g.raw.length),n.push(g);continue}if(g=this.tokenizer.tag(t)){t=t.substring(g.raw.length),n.push(g);continue}if(g=this.tokenizer.link(t)){t=t.substring(g.raw.length),n.push(g);continue}if(g=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(g.raw.length);let b=n.at(-1);g.type==="text"&&(b==null?void 0:b.type)==="text"?(b.raw+=g.raw,b.text+=g.text):n.push(g);continue}if(g=this.tokenizer.emStrong(t,i,a)){t=t.substring(g.raw.length),n.push(g);continue}if(g=this.tokenizer.codespan(t)){t=t.substring(g.raw.length),n.push(g);continue}if(g=this.tokenizer.br(t)){t=t.substring(g.raw.length),n.push(g);continue}if(g=this.tokenizer.del(t,i,a)){t=t.substring(g.raw.length),n.push(g);continue}if(g=this.tokenizer.autolink(t)){t=t.substring(g.raw.length),n.push(g);continue}if(!this.state.inLink&&(g=this.tokenizer.url(t))){t=t.substring(g.raw.length),n.push(g);continue}let v=t;if((h=this.options.extensions)!=null&&h.startInline){let b=1/0,y=t.slice(1),A;this.options.extensions.startInline.forEach(E=>{A=E.call({lexer:this},y),typeof A=="number"&&A>=0&&(b=Math.min(b,A))}),b<1/0&&b>=0&&(v=t.substring(0,b+1))}if(g=this.tokenizer.inlineText(v)){t=t.substring(g.raw.length),g.raw.slice(-1)!=="_"&&(a=g.raw.slice(-1)),r=!0;let b=n.at(-1);(b==null?void 0:b.type)==="text"?(b.raw+=g.raw,b.text+=g.text):n.push(g);continue}if(t){let b="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(b);break}else throw new Error(b)}}return n}},so=class{constructor(e){B(this,"options");B(this,"parser");this.options=e||En}space(e){return""}code({text:e,lang:t,escaped:n}){var o;let i=(o=(t||"").match(Ie.notSpaceStart))==null?void 0:o[0],s=e.replace(Ie.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${dt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let i=this.parser.parseInline(n),s=Qc(e);if(s===null)return i;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+dt(t)+'"'),o+=">"+i+"</a>",o}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));let s=Qc(e);if(s===null)return dt(n);e=s;let o=`<img src="${e}" alt="${dt(n)}"`;return t&&(o+=` title="${dt(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:dt(e.text)}},ll=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},et=class oa{constructor(t){B(this,"options");B(this,"renderer");B(this,"textRenderer");this.options=t||En,this.options.renderer=this.options.renderer||new so,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ll}static parse(t,n){return new oa(n).parse(t)}static parseInline(t,n){return new oa(n).parseInline(t)}parse(t){var i,s;let n="";for(let o=0;o<t.length;o++){let r=t[o];if((s=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&s[r.type]){let l=r,c=this.options.extensions.renderers[l.type].call({parser:this},l);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(l.type)){n+=c||"";continue}}let a=r;switch(a.type){case"space":{n+=this.renderer.space(a);break}case"hr":{n+=this.renderer.hr(a);break}case"heading":{n+=this.renderer.heading(a);break}case"code":{n+=this.renderer.code(a);break}case"table":{n+=this.renderer.table(a);break}case"blockquote":{n+=this.renderer.blockquote(a);break}case"list":{n+=this.renderer.list(a);break}case"checkbox":{n+=this.renderer.checkbox(a);break}case"html":{n+=this.renderer.html(a);break}case"def":{n+=this.renderer.def(a);break}case"paragraph":{n+=this.renderer.paragraph(a);break}case"text":{n+=this.renderer.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}parseInline(t,n=this.renderer){var s,o;let i="";for(let r=0;r<t.length;r++){let a=t[r];if((o=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&o[a.type]){let c=this.options.extensions.renderers[a.type].call({parser:this},a);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type)){i+=c||"";continue}}let l=a;switch(l.type){case"escape":{i+=n.text(l);break}case"html":{i+=n.html(l);break}case"link":{i+=n.link(l);break}case"image":{i+=n.image(l);break}case"checkbox":{i+=n.checkbox(l);break}case"strong":{i+=n.strong(l);break}case"em":{i+=n.em(l);break}case"codespan":{i+=n.codespan(l);break}case"br":{i+=n.br(l);break}case"del":{i+=n.del(l);break}case"text":{i+=n.text(l);break}default:{let c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},Os,bi=(Os=class{constructor(e){B(this,"options");B(this,"block");this.options=e||En}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ze.lex:Ze.lexInline}provideParser(){return this.block?et.parse:et.parseInline}},B(Os,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),B(Os,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Os),ww=class{constructor(...e){B(this,"defaults",el());B(this,"options",this.setOptions);B(this,"parse",this.parseMarkdown(!0));B(this,"parseInline",this.parseMarkdown(!1));B(this,"Parser",et);B(this,"Renderer",so);B(this,"TextRenderer",ll);B(this,"Lexer",Ze);B(this,"Tokenizer",io);B(this,"Hooks",bi);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(let o of e)switch(n=n.concat(t.call(this,o)),o.type){case"table":{let r=o;for(let a of r.header)n=n.concat(this.walkTokens(a.tokens,t));for(let a of r.rows)for(let l of a)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{let r=o;n=n.concat(this.walkTokens(r.items,t));break}default:{let r=o;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[r.type]?this.defaults.extensions.childTokens[r.type].forEach(a=>{let l=r[a].flat(1/0);n=n.concat(this.walkTokens(l,t))}):r.tokens&&(n=n.concat(this.walkTokens(r.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...r){let a=s.renderer.apply(this,r);return a===!1&&(a=o.apply(this,r)),a}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){let s=this.defaults.renderer||new so(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let r=o,a=n.renderer[r],l=s[r];s[r]=(...c)=>{let d=a.apply(s,c);return d===!1&&(d=l.apply(s,c)),d||""}}i.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new io(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let r=o,a=n.tokenizer[r],l=s[r];s[r]=(...c)=>{let d=a.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new bi;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let r=o,a=n.hooks[r],l=s[r];bi.passThroughHooks.has(o)?s[r]=c=>{if(this.defaults.async&&bi.passThroughHooksRespectAsync.has(o))return(async()=>{let u=await a.call(s,c);return l.call(s,u)})();let d=a.call(s,c);return l.call(s,d)}:s[r]=(...c)=>{if(this.defaults.async)return(async()=>{let u=await a.apply(s,c);return u===!1&&(u=await l.apply(s,c)),u})();let d=a.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;i.walkTokens=function(r){let a=[];return a.push(o.call(this,r)),s&&(a=a.concat(s.call(this,r))),a}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ze.lex(e,t??this.defaults)}parser(e,t){return et.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let i={...n},s={...this.defaults,...i},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&i.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let r=s.hooks?await s.hooks.preprocess(t):t,a=await(s.hooks?await s.hooks.provideLexer():e?Ze.lex:Ze.lexInline)(r,s),l=s.hooks?await s.hooks.processAllTokens(a):a;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():e?et.parse:et.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let r=(s.hooks?s.hooks.provideLexer():e?Ze.lex:Ze.lexInline)(t,s);s.hooks&&(r=s.hooks.processAllTokens(r)),s.walkTokens&&this.walkTokens(r,s.walkTokens);let a=(s.hooks?s.hooks.provideParser():e?et.parse:et.parseInline)(r,s);return s.hooks&&(a=s.hooks.postprocess(a)),a}catch(r){return o(r)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let i="<p>An error occurred:</p><pre>"+dt(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},$n=new ww;function ie(e,t){return $n.parse(e,t)}ie.options=ie.setOptions=function(e){return $n.setOptions(e),ie.defaults=$n.defaults,df(ie.defaults),ie};ie.getDefaults=el;ie.defaults=En;ie.use=function(...e){return $n.use(...e),ie.defaults=$n.defaults,df(ie.defaults),ie};ie.walkTokens=function(e,t){return $n.walkTokens(e,t)};ie.parseInline=$n.parseInline;ie.Parser=et;ie.parser=et.parse;ie.Renderer=so;ie.TextRenderer=ll;ie.Lexer=Ze;ie.lexer=Ze.lex;ie.Tokenizer=io;ie.Hooks=bi;ie.parse=ie;ie.options;ie.setOptions;ie.use;ie.walkTokens;ie.parseInline;et.parse;Ze.lex;ie.setOptions({gfm:!0,breaks:!0});const xw=["a","b","blockquote","br","code","del","em","h1","h2","h3","h4","hr","i","li","ol","p","pre","strong","table","tbody","td","th","thead","tr","ul","img"],_w=["class","href","rel","target","title","start","src","alt"],Jc={ALLOWED_TAGS:xw,ALLOWED_ATTR:_w,ADD_DATA_URI_TAGS:["img"]};let Zc=!1;const kw=14e4,$w=4e4,Sw=200,wr=5e4,dn=new Map;function Aw(e){const t=dn.get(e);return t===void 0?null:(dn.delete(e),dn.set(e,t),t)}function ed(e,t){if(dn.set(e,t),dn.size<=Sw)return;const n=dn.keys().next().value;n&&dn.delete(n)}function Tw(){Zc||(Zc=!0,na.addHook("afterSanitizeAttributes",e=>{!(e instanceof HTMLAnchorElement)||!e.getAttribute("href")||(e.setAttribute("rel","noreferrer noopener"),e.setAttribute("target","_blank"))}))}function ra(e){const t=e.trim();if(!t)return"";if(Tw(),t.length<=wr){const r=Aw(t);if(r!==null)return r}const n=eh(t,kw),i=n.truncated?`

… truncated (${n.total} chars, showing first ${n.text.length}).`:"";if(n.text.length>$w){const a=`<pre class="code-block">${kf(`${n.text}${i}`)}</pre>`,l=na.sanitize(a,Jc);return t.length<=wr&&ed(t,l),l}const s=ie.parse(`${n.text}${i}`,{renderer:_f}),o=na.sanitize(s,Jc);return t.length<=wr&&ed(t,o),o}const _f=new ie.Renderer;_f.html=({text:e})=>kf(e);function kf(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const Cw=new RegExp("\\p{Script=Hebrew}|\\p{Script=Arabic}|\\p{Script=Syriac}|\\p{Script=Thaana}|\\p{Script=Nko}|\\p{Script=Samaritan}|\\p{Script=Mandaic}|\\p{Script=Adlam}|\\p{Script=Phoenician}|\\p{Script=Lydian}","u");function $f(e,t=/[\s\p{P}\p{S}]/u){if(!e)return"ltr";for(const n of e)if(!t.test(n))return Cw.test(n)?"rtl":"ltr";return"ltr"}const Ew=1500,Rw=2e3,Sf="Copy as markdown",Lw="Copied",Mw="Copy failed";async function Pw(e){if(!e)return!1;try{return await navigator.clipboard.writeText(e),!0}catch{return!1}}function _s(e,t){e.title=t,e.setAttribute("aria-label",t)}function Dw(e){const t=e.label??Sf;return f`
    <button
      class="chat-copy-btn"
      type="button"
      title=${t}
      aria-label=${t}
      @click=${async n=>{const i=n.currentTarget;if(!i||i.dataset.copying==="1")return;i.dataset.copying="1",i.setAttribute("aria-busy","true"),i.disabled=!0;const s=await Pw(e.text());if(i.isConnected){if(delete i.dataset.copying,i.removeAttribute("aria-busy"),i.disabled=!1,!s){i.dataset.error="1",_s(i,Mw),window.setTimeout(()=>{i.isConnected&&(delete i.dataset.error,_s(i,t))},Rw);return}i.dataset.copied="1",_s(i,Lw),window.setTimeout(()=>{i.isConnected&&(delete i.dataset.copied,_s(i,t))},Ew)}}}
    >
      <span class="chat-copy-btn__icon" aria-hidden="true">
        <span class="chat-copy-btn__icon-copy">${$e.copy}</span>
        <span class="chat-copy-btn__icon-check">${$e.check}</span>
      </span>
    </button>
  `}function Iw(e){return Dw({text:()=>e,label:Sf})}function Bn(e){const t=e;let n=typeof t.role=="string"?t.role:"unknown";const i=typeof t.toolCallId=="string"||typeof t.tool_call_id=="string",s=t.content,o=Array.isArray(s)?s:null,r=Array.isArray(o)&&o.some(u=>{const h=u,g=(typeof h.type=="string"?h.type:"").toLowerCase();return g==="toolresult"||g==="tool_result"}),a=typeof t.toolName=="string"||typeof t.tool_name=="string";(i||r||a)&&(n="toolResult");let l=[];typeof t.content=="string"?l=[{type:"text",text:t.content}]:Array.isArray(t.content)?l=t.content.map(u=>({type:u.type||"text",text:u.text,name:u.name,args:u.args||u.arguments})):typeof t.text=="string"&&(l=[{type:"text",text:t.text}]);const c=typeof t.timestamp=="number"?t.timestamp:Date.now(),d=typeof t.id=="string"?t.id:void 0;return{role:n,content:l,timestamp:c,id:d}}function cl(e){const t=e.toLowerCase();return e==="user"||e==="User"?e:e==="assistant"?"assistant":e==="system"?"system":t==="toolresult"||t==="tool_result"||t==="tool"||t==="function"?"tool":e}function Af(e){const t=e,n=typeof t.role=="string"?t.role.toLowerCase():"";return n==="toolresult"||n==="tool_result"}function Ow(e){return(e??"").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())||"Tool"}function Fw(e){const t=(e??"").trim();return t?t.replace(/\s+/g,"_").toLowerCase():""}function Nw(e){return(e??"").trim().toLowerCase()||"use"}const Bw={icon:"puzzle",detailKeys:["command","path","url","targetUrl","targetId","ref","element","node","nodeId","id","requestId","to","channelId","guildId","userId","name","query","pattern","messageId"]},zw={bash:{icon:"wrench",title:"Bash",detailKeys:["command"]},process:{icon:"wrench",title:"Process",detailKeys:["sessionId"]},read:{icon:"fileText",title:"Read",detailKeys:["path"]},write:{icon:"edit",title:"Write",detailKeys:["path"]},edit:{icon:"penLine",title:"Edit",detailKeys:["path"]},attach:{icon:"paperclip",title:"Attach",detailKeys:["path","url","fileName"]},browser:{icon:"globe",title:"Browser",actions:{status:{label:"status"},start:{label:"start"},stop:{label:"stop"},tabs:{label:"tabs"},open:{label:"open",detailKeys:["targetUrl"]},focus:{label:"focus",detailKeys:["targetId"]},close:{label:"close",detailKeys:["targetId"]},snapshot:{label:"snapshot",detailKeys:["targetUrl","targetId","ref","element","format"]},screenshot:{label:"screenshot",detailKeys:["targetUrl","targetId","ref","element"]},navigate:{label:"navigate",detailKeys:["targetUrl","targetId"]},console:{label:"console",detailKeys:["level","targetId"]},pdf:{label:"pdf",detailKeys:["targetId"]},upload:{label:"upload",detailKeys:["paths","ref","inputRef","element","targetId"]},dialog:{label:"dialog",detailKeys:["accept","promptText","targetId"]},act:{label:"act",detailKeys:["request.kind","request.ref","request.selector","request.text","request.value"]}}},canvas:{icon:"image",title:"Canvas",actions:{present:{label:"present",detailKeys:["target","node","nodeId"]},hide:{label:"hide",detailKeys:["node","nodeId"]},navigate:{label:"navigate",detailKeys:["url","node","nodeId"]},eval:{label:"eval",detailKeys:["javaScript","node","nodeId"]},snapshot:{label:"snapshot",detailKeys:["format","node","nodeId"]},a2ui_push:{label:"A2UI push",detailKeys:["jsonlPath","node","nodeId"]},a2ui_reset:{label:"A2UI reset",detailKeys:["node","nodeId"]}}},nodes:{icon:"smartphone",title:"Nodes",actions:{status:{label:"status"},describe:{label:"describe",detailKeys:["node","nodeId"]},pending:{label:"pending"},approve:{label:"approve",detailKeys:["requestId"]},reject:{label:"reject",detailKeys:["requestId"]},notify:{label:"notify",detailKeys:["node","nodeId","title","body"]},camera_snap:{label:"camera snap",detailKeys:["node","nodeId","facing","deviceId"]},camera_list:{label:"camera list",detailKeys:["node","nodeId"]},camera_clip:{label:"camera clip",detailKeys:["node","nodeId","facing","duration","durationMs"]},screen_record:{label:"screen record",detailKeys:["node","nodeId","duration","durationMs","fps","screenIndex"]}}},cron:{icon:"loader",title:"Cron",actions:{status:{label:"status"},list:{label:"list"},add:{label:"add",detailKeys:["job.name","job.id","job.schedule","job.cron"]},update:{label:"update",detailKeys:["id"]},remove:{label:"remove",detailKeys:["id"]},run:{label:"run",detailKeys:["id"]},runs:{label:"runs",detailKeys:["id"]},wake:{label:"wake",detailKeys:["text","mode"]}}},gateway:{icon:"plug",title:"Gateway",actions:{restart:{label:"restart",detailKeys:["reason","delayMs"]},"config.get":{label:"config get"},"config.schema":{label:"config schema"},"config.apply":{label:"config apply",detailKeys:["restartDelayMs"]},"update.run":{label:"update run",detailKeys:["restartDelayMs"]}}},whatsapp_login:{icon:"circle",title:"WhatsApp Login",actions:{start:{label:"start"},wait:{label:"wait"}}},discord:{icon:"messageSquare",title:"Discord",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sticker:{label:"sticker",detailKeys:["to","stickerIds"]},poll:{label:"poll",detailKeys:["question","to"]},permissions:{label:"permissions",detailKeys:["channelId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},threadCreate:{label:"thread create",detailKeys:["channelId","name"]},threadList:{label:"thread list",detailKeys:["guildId","channelId"]},threadReply:{label:"thread reply",detailKeys:["channelId","content"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},searchMessages:{label:"search",detailKeys:["guildId","content"]},memberInfo:{label:"member",detailKeys:["guildId","userId"]},roleInfo:{label:"roles",detailKeys:["guildId"]},emojiList:{label:"emoji list",detailKeys:["guildId"]},roleAdd:{label:"role add",detailKeys:["guildId","userId","roleId"]},roleRemove:{label:"role remove",detailKeys:["guildId","userId","roleId"]},channelInfo:{label:"channel",detailKeys:["channelId"]},channelList:{label:"channels",detailKeys:["guildId"]},voiceStatus:{label:"voice",detailKeys:["guildId","userId"]},eventList:{label:"events",detailKeys:["guildId"]},eventCreate:{label:"event create",detailKeys:["guildId","name"]},timeout:{label:"timeout",detailKeys:["guildId","userId"]},kick:{label:"kick",detailKeys:["guildId","userId"]},ban:{label:"ban",detailKeys:["guildId","userId"]}}},slack:{icon:"messageSquare",title:"Slack",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},memberInfo:{label:"member",detailKeys:["userId"]},emojiList:{label:"emoji list"}}}},Hw={fallback:Bw,tools:zw},Tf=Hw,td=Tf.fallback??{icon:"puzzle"},Uw=Tf.tools??{};function jw(e){if(!e)return e;const t=[{re:/^\/Users\/[^/]+(\/|$)/,replacement:"~$1"},{re:/^\/home\/[^/]+(\/|$)/,replacement:"~$1"},{re:/^C:\\Users\\[^\\]+(\\|$)/i,replacement:"~$1"}];for(const n of t)if(n.re.test(e))return e.replace(n.re,n.replacement);return e}function qw(e){const t=Fw(e.name),n=t.toLowerCase(),i=Uw[n],s=(i==null?void 0:i.icon)??td.icon??"puzzle",o=(i==null?void 0:i.title)??Ow(t),r=(i==null?void 0:i.label)??o,a=e.args&&typeof e.args=="object"?e.args.action:void 0,l=typeof a=="string"?a.trim():void 0,c=n==="web_search"?"search":n==="web_fetch"?"fetch":n.replace(/_/g," ").replace(/\./g," "),d=Nw(l??c);let u;n==="exec"&&(u=void 0),!u&&n==="read"&&(u=void 0),!u&&(n==="write"||n==="edit"||n==="attach")&&(u=void 0),!u&&n==="web_search"&&(u=void 0),!u&&n==="web_fetch"&&(u=void 0);const h=(i==null?void 0:i.detailKeys)??td.detailKeys??[];return!u&&h.length>0&&(u=void 0),!u&&e.meta&&(u=e.meta),u&&(u=jw(u)),{name:t,icon:s,title:o,label:r,verb:d,detail:u}}function Kw(e){if(e.detail){if(e.detail.includes(" · ")){const t=e.detail.split(" · ").map(n=>n.trim()).filter(n=>n.length>0).join(", ");return t?`with ${t}`:void 0}return e.detail}}const Ww=80,Vw=2,nd=100;function Gw(e){const t=e.trim();if(t.startsWith("{")||t.startsWith("["))try{const n=JSON.parse(t);return"```json\n"+JSON.stringify(n,null,2)+"\n```"}catch{}return e}function Qw(e){const t=e.split(`
`),n=t.slice(0,Vw),i=n.join(`
`);return i.length>nd?i.slice(0,nd)+"…":n.length<t.length?i+"…":i}function Yw(e){const t=e,n=Xw(t.content),i=[];for(const s of n){const o=(typeof s.type=="string"?s.type:"").toLowerCase();(["toolcall","tool_call","tooluse","tool_use"].includes(o)||typeof s.name=="string"&&s.arguments!=null)&&i.push({kind:"call",name:s.name??"tool",args:Jw(s.arguments??s.args)})}for(const s of n){const o=(typeof s.type=="string"?s.type:"").toLowerCase();if(o!=="toolresult"&&o!=="tool_result")continue;const r=Zw(s),a=typeof s.name=="string"?s.name:"tool";i.push({kind:"result",name:a,text:r})}if(Af(e)&&!i.some(s=>s.kind==="result")){const s=typeof t.toolName=="string"&&t.toolName||typeof t.tool_name=="string"&&t.tool_name||"tool",o=Ti(e)??void 0;i.push({kind:"result",name:s,text:o})}return i}function id(e,t){var u,h;const n=qw({name:e.name,args:e.args}),i=Kw(n),s=!!((u=e.text)!=null&&u.trim()),o=!!t,r=o?()=>{if(s){t(Gw(e.text));return}const g=`## ${n.label}

${i?`**Command:** \`${i}\`

`:""}*No output — tool completed successfully.*`;t(g)}:void 0,a=s&&(((h=e.text)==null?void 0:h.length)??0)<=Ww,l=s&&!a,c=s&&a,d=!s;return f`
    <div
      class="chat-tool-card ${o?"chat-tool-card--clickable":""}"
      @click=${r}
      role=${o?"button":S}
      tabindex=${o?"0":S}
      @keydown=${o?g=>{g.key!=="Enter"&&g.key!==" "||(g.preventDefault(),r==null||r())}:S}
    >
      <div class="chat-tool-card__header">
        <div class="chat-tool-card__title">
          <span class="chat-tool-card__icon">${$e[n.icon]}</span>
          <span>${n.label}</span>
        </div>
        ${o?f`<span class="chat-tool-card__action">${s?"View":""} ${$e.check}</span>`:S}
        ${d&&!o?f`<span class="chat-tool-card__status">${$e.check}</span>`:S}
      </div>
      ${i?f`<div class="chat-tool-card__detail">${i}</div>`:S}
      ${d?f`
              <div class="chat-tool-card__status-text muted">Completed</div>
            `:S}
      ${l?f`<div class="chat-tool-card__preview mono">${Qw(e.text)}</div>`:S}
      ${c?f`<div class="chat-tool-card__inline mono">${e.text}</div>`:S}
    </div>
  `}function Xw(e){return Array.isArray(e)?e.filter(Boolean):[]}function Jw(e){if(typeof e!="string")return e;const t=e.trim();if(!t||!t.startsWith("{")&&!t.startsWith("["))return e;try{return JSON.parse(t)}catch{return e}}function Zw(e){if(typeof e.text=="string")return e.text;if(typeof e.content=="string")return e.content}function ex(e){const n=e.content,i=[];if(!Array.isArray(n))return i;for(const s of n){if(typeof s!="object"||s===null)continue;const o=s;if(o.type!=="file"||typeof o.file_name!="string")continue;const r=o.summaryMeta;i.push({file_name:o.file_name,file_path:typeof o.file_path=="string"?o.file_path:void 0,rows_count:r==null?void 0:r.rows_count,preview_count:r==null?void 0:r.preview_count,truncated:r==null?void 0:r.truncated})}return i}function tx(e){const n=e.content,i=[];if(Array.isArray(n))for(const s of n){if(typeof s!="object"||s===null)continue;const o=s;if(o.type==="image"){const r=o.source;if((r==null?void 0:r.type)==="base64"&&typeof r.data=="string"){const a=r.data,l=r.media_type||"image/png",c=a.startsWith("data:")?a:`data:${l};base64,${a}`;i.push({url:c})}else typeof o.url=="string"&&i.push({url:o.url})}else if(o.type==="image_url"){const r=o.image_url;typeof(r==null?void 0:r.url)=="string"&&i.push({url:r.url})}}return i}function nx(e){return f`
    <div class="chat-group assistant">
      ${dl("assistant",e)}
      <div class="chat-group-messages">
        <div class="chat-bubble chat-reading-indicator" aria-hidden="true">
          <span class="chat-reading-indicator__dots">
            <span></span><span></span><span></span>
          </span>
        </div>
      </div>
    </div>
  `}function ix(e,t,n,i){const s=new Date(t).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}),o=(i==null?void 0:i.name)??"Assistant";return f`
    <div class="chat-group assistant">
      ${dl("assistant",i)}
      <div class="chat-group-messages">
        ${Cf({role:"assistant",content:[{type:"text",text:e}],timestamp:t},{isStreaming:!0,showReasoning:!1},n)}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${o}</span>
          <span class="chat-group-timestamp">${s}</span>
        </div>
      </div>
    </div>
  `}function sx(e,t){const n=cl(e.role),i=t.assistantName??"Assistant",s=n==="user"?"You":n==="assistant"?i:n,o=n==="user"?"user":n==="assistant"?"assistant":"other",r=new Date(e.timestamp).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return f`
    <div class="chat-group ${o}">
      ${dl(e.role,{name:i,avatar:t.assistantAvatar??null})}
      <div class="chat-group-messages">
        ${e.messages.map((a,l)=>Cf(a.message,{isStreaming:e.isStreaming&&l===e.messages.length-1,showReasoning:t.showReasoning},t.onOpenSidebar))}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${s}</span>
          <span class="chat-group-timestamp">${r}</span>
        </div>
      </div>
    </div>
  `}function dl(e,t){var a,l;const n=cl(e),i=((a=t==null?void 0:t.name)==null?void 0:a.trim())||"Assistant",s=((l=t==null?void 0:t.avatar)==null?void 0:l.trim())||"",o=n==="user"?"U":n==="assistant"?i.charAt(0).toUpperCase()||"A":n==="tool"?"⚙":"?",r=n==="user"?"user":n==="assistant"?"assistant":n==="tool"?"tool":"other";return s&&n==="assistant"?ox(s)?f`<img
        class="chat-avatar ${r}"
        src="${s}"
        alt="${i}"
      />`:f`<div class="chat-avatar ${r}">${s}</div>`:f`<div class="chat-avatar ${r}">${o}</div>`}function ox(e){return/^https?:\/\//i.test(e)||/^data:image\//i.test(e)||e.startsWith("/")}function rx(e){return e.length===0?S:f`
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
  `}function ax(e){return e.length===0?S:f`
    <div class="chat-message-files">
      ${e.map(t=>f`
          <span class="chat-message-file" title=${t.file_path??t.file_name}>
            <span class="chat-message-file__name">${t.file_name}</span>
            ${[t.rows_count!=null?`rows=${t.rows_count}`:"",t.preview_count!=null?`preview=${t.preview_count}`:"",t.truncated?"…truncated":""].filter(Boolean).length?f`<span class="chat-message-file__meta">
                  ${[t.rows_count!=null?`rows=${t.rows_count}`:"",t.preview_count!=null?`preview=${t.preview_count}`:"",t.truncated?"…truncated":""].filter(Boolean).join(" / ")}
                </span>`:S}
          </span>
        `)}
    </div>
  `}function Cf(e,t,n){const i=e,s=typeof i.role=="string"?i.role:"unknown",o=Af(e)||s.toLowerCase()==="toolresult"||s.toLowerCase()==="tool_result"||typeof i.toolCallId=="string"||typeof i.tool_call_id=="string",r=Yw(e),a=r.length>0,l=tx(e),c=l.length>0,d=ex(e),u=d.length>0,h=Ti(e),g=t.showReasoning&&s==="assistant"?Yv(e):null,v=h!=null&&h.trim()?h:null,b=g?Jv(g):null,y=v,A=s==="assistant"&&!!(y!=null&&y.trim()),E=["chat-bubble",A?"has-copy":"",t.isStreaming?"streaming":"","fade-in"].filter(Boolean).join(" ");return!y&&a&&o?f`${r.map(R=>id(R,n))}`:!y&&!b&&!a&&!c&&!u?S:f`
    <div class="${E}">
      ${A?Iw(y):S}
      ${rx(l)}
      ${ax(d)}
      ${b?f`<div class="chat-thinking">${Jr(ra(b))}</div>`:S}
      ${y?f`<div class="chat-text" dir="${$f(y)}">${Jr(ra(y))}</div>`:S}
      ${r.map(R=>id(R,n))}
    </div>
  `}function lx(e){return f`
    <div class="sidebar-panel">
      <div class="sidebar-header">
        <div class="sidebar-title">Tool Output</div>
        <button @click=${e.onClose} class="btn" title="Close sidebar">
          ${$e.x}
        </button>
      </div>
      <div class="sidebar-content">
        ${e.error?f`
              <div class="callout danger">${e.error}</div>
              <button @click=${e.onViewRawText} class="btn" style="margin-top: 12px;">
                View Raw Text
              </button>
            `:e.content?f`<div class="sidebar-markdown">${Jr(ra(e.content))}</div>`:f`
                  <div class="muted">No content available</div>
                `}
      </div>
    </div>
  `}var cx=Object.defineProperty,dx=Object.getOwnPropertyDescriptor,Mo=(e,t,n,i)=>{for(var s=i>1?void 0:i?dx(t,n):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(s=(i?r(t,n,s):r(s))||s);return i&&s&&cx(t,n,s),s};let Yn=class extends pn{constructor(){super(...arguments),this.splitRatio=.6,this.minRatio=.4,this.maxRatio=.7,this.isDragging=!1,this.startX=0,this.startRatio=0,this.handleMouseDown=e=>{this.isDragging=!0,this.startX=e.clientX,this.startRatio=this.splitRatio,this.classList.add("dragging"),document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),e.preventDefault()},this.handleMouseMove=e=>{if(!this.isDragging)return;const t=this.parentElement;if(!t)return;const n=t.getBoundingClientRect().width,s=(e.clientX-this.startX)/n;let o=this.startRatio+s;o=Math.max(this.minRatio,Math.min(this.maxRatio,o)),this.dispatchEvent(new CustomEvent("resize",{detail:{splitRatio:o},bubbles:!0,composed:!0}))},this.handleMouseUp=()=>{this.isDragging=!1,this.classList.remove("dragging"),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}}render(){return S}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}};Yn.styles=Iu`
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
  `;Mo([Wt({type:Number})],Yn.prototype,"splitRatio",2);Mo([Wt({type:Number})],Yn.prototype,"minRatio",2);Mo([Wt({type:Number})],Yn.prototype,"maxRatio",2);Yn=Mo([$a("resizable-divider")],Yn);const ux=5e3,hx=/\.(xlsx|xls|xlsm|pdf)$/i;function fx(e){for(let t=0;t<e.length;t++)if(hx.test(e[t].name))return e[t];return null}function sd(e){e.style.height="auto",e.style.height=`${e.scrollHeight}px`}function px(e){return e?e.active?f`
      <div class="compaction-indicator compaction-indicator--active" role="status" aria-live="polite">
        ${$e.loader} ${p("chat.ui.compaction.active")}
      </div>
    `:e.completedAt&&Date.now()-e.completedAt<ux?f`
        <div class="compaction-indicator compaction-indicator--complete" role="status" aria-live="polite">
          ${$e.check} ${p("chat.ui.compaction.done")}
        </div>
      `:S:S}function gx(){return`att-${Date.now()}-${Math.random().toString(36).slice(2,9)}`}function mx(e,t){var s;const n=(s=e.clipboardData)==null?void 0:s.items;if(!n||!t.onAttachmentsChange)return;const i=[];for(let o=0;o<n.length;o++){const r=n[o];r.type.startsWith("image/")&&i.push(r)}if(i.length!==0){e.preventDefault();for(const o of i){const r=o.getAsFile();if(!r)continue;const a=new FileReader;a.addEventListener("load",()=>{var u;const l=a.result,c={id:gx(),dataUrl:l,mimeType:r.type},d=t.attachments??[];(u=t.onAttachmentsChange)==null||u.call(t,[...d,c])}),a.readAsDataURL(r)}}}function vx(e){const t=e.attachments??[];return t.length===0?S:f`
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
              ${$e.x}
            </button>
          </div>
        `)}
    </div>
  `}function yx(e){const t=e.uploadedFile,n=e.onFileSelect,i=e.onClearUploadedFile;if(t!=null&&t.file_name){const s=t.summaryMeta;return f`
      <div class="chat-uploaded-file">
        <span class="chat-uploaded-file__name" title=${t.file_path}>${t.file_name}</span>
        <button
          type="button"
          class="btn chat-uploaded-file__clear"
          aria-label=${p("chat.ui.upload.remove")}
          @click=${i}
        >
          ${$e.x}
        </button>
        ${s?f`<span class="chat-uploaded-file__meta">
              ${[s.rows_count!=null?`rows=${s.rows_count}`:"",s.preview_count!=null?`preview=${s.preview_count}`:"",s.truncated?"…truncated":""].filter(Boolean).join(" / ")}
            </span>`:S}
      </div>
    `}return!n||!e.connected?S:f`
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
  `}function bx(e){var y,A,E,R;const t=e.connected,n=e.sending||e.stream!==null,i=!!(e.canAbort&&e.onAbort),s=(A=(y=e.sessions)==null?void 0:y.sessions)==null?void 0:A.find(k=>k.key===e.sessionKey),o=e.showThinking&&(s==null?void 0:s.reasoningLevel)!=="off",r={name:e.assistantName,avatar:e.assistantAvatar??e.assistantAvatarUrl??null},a=(((E=e.attachments)==null?void 0:E.length)??0)>0;(R=e.uploadedFile)!=null&&R.file_name;const l=e.connected?p(a?"chat.ui.compose.placeholder.withImages":"chat.ui.compose.placeholder.default"):p("chat.ui.compose.placeholder.disconnected"),c=e.splitRatio??.6,d=!!(e.sidebarOpen&&e.onCloseSidebar),u=f`
    <div
      class="chat-thread"
      role="log"
      aria-live="polite"
      @scroll=${e.onChatScroll}
    >
      ${e.loading?f`
              <div class="muted">Loading chat…</div>
            `:S}
      ${Qh(xx(e),k=>k.key,k=>k.kind==="divider"?f`
              <div class="chat-divider" role="separator" data-ts=${String(k.timestamp)}>
                <span class="chat-divider__line"></span>
                <span class="chat-divider__label">${k.label}</span>
                <span class="chat-divider__line"></span>
              </div>
            `:k.kind==="reading-indicator"?nx(r):k.kind==="stream"?ix(k.text,k.startedAt,e.onOpenSidebar,r):k.kind==="group"?sx(k,{onOpenSidebar:e.onOpenSidebar,showReasoning:o,assistantName:e.assistantName,assistantAvatar:r.avatar}):S)}
    </div>
  `,h=k=>{var T;k.preventDefault(),k.stopPropagation(),k.dataTransfer&&(k.dataTransfer.dropEffect="copy"),(T=e.onComposeDragOver)==null||T.call(e)},g=k=>{var T;k.preventDefault(),k.stopPropagation(),k.dataTransfer&&(k.dataTransfer.dropEffect="copy"),(T=e.onComposeDragOver)==null||T.call(e)},v=k=>{var m;const T=k.currentTarget,M=k.relatedTarget;M!=null&&(T.contains(M)||(m=e.onComposeDragLeave)==null||m.call(e))},b=k=>{var M,m,$;k.preventDefault(),k.stopPropagation(),(M=e.onComposeDragLeave)==null||M.call(e);const T=($=(m=k.dataTransfer)==null?void 0:m.files)!=null&&$.length?fx(k.dataTransfer.files):null;T&&e.onComposeDrop&&e.onComposeDrop(T)};return f`
    <section
      class="card chat ${e.composeDragOver?"chat--drag-over":""}"
      @dragenter=${h}
      @dragover=${g}
      @dragleave=${v}
      @drop=${b}
    >
      ${e.disabledReason?f`<div class="callout">${e.disabledReason}</div>`:S}

      ${e.error?f`<div class="callout danger">${e.error}</div>`:S}

      ${e.focusMode?f`
            <button
              class="chat-focus-exit"
              type="button"
              @click=${e.onToggleFocusMode}
              aria-label=${p("chat.ui.compose.exitFocus")}
              title=${p("chat.ui.compose.exitFocus")}
            >
              ${$e.x}
            </button>
          `:S}

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
                @resize=${k=>{var T;return(T=e.onSplitRatioChange)==null?void 0:T.call(e,k.detail.splitRatio)}}
              ></resizable-divider>
              <div class="chat-sidebar">
                ${lx({content:e.sidebarContent??null,error:e.sidebarError??null,onClose:e.onCloseSidebar,onViewRawText:()=>{!e.sidebarContent||!e.onOpenSidebar||e.onOpenSidebar(`\`\`\`
${e.sidebarContent}
\`\`\``)}})}
              </div>
            `:S}
      </div>

      ${e.queue.length?f`
            <div class="chat-queue" role="status" aria-live="polite">
              <div class="chat-queue__title">
                ${p("chat.ui.queue.title",{count:String(e.queue.length)})}
              </div>
              <div class="chat-queue__list">
                ${e.queue.map(k=>{var T;return f`
                    <div class="chat-queue__item">
                      <div class="chat-queue__text">
                        ${k.text||((T=k.attachments)!=null&&T.length?p("chat.ui.queue.imageItem",{count:String(k.attachments.length)}):"")}
                      </div>
                      <button
                        class="btn chat-queue__remove"
                        type="button"
                        aria-label=${p("chat.ui.queue.remove")}
                        @click=${()=>e.onQueueRemove(k.id)}
                      >
                        ${$e.x}
                      </button>
                    </div>
                  `})}
              </div>
            </div>
          `:S}

      ${px(e.compactionStatus)}

      ${e.showNewMessages?f`
            <button
              class="btn chat-new-messages"
              type="button"
              @click=${e.onScrollToBottom}
            >
              ${p("chat.ui.compose.newMessages")} ${$e.arrowDown}
            </button>
          `:S}

      <div class="chat-compose ${e.composeDragOver?"chat-compose--drag-over":""}">
        ${e.composeDragOver?f`<div class="chat-compose__drop-hint">
              ${p("chat.ui.compose.dropHint")}
            </div>`:S}
        ${vx(e)}
        ${yx(e)}
        <div class="chat-compose__row">
          <label class="field chat-compose__field">
            <span>${p("chat.ui.compose.label")}</span>
            <textarea
              ${d0(k=>k&&sd(k))}
              .value=${e.draft}
              dir=${$f(e.draft)}
              ?disabled=${!e.connected}
              @keydown=${k=>{k.key==="Enter"&&(k.isComposing||k.keyCode===229||k.shiftKey||e.connected&&(k.preventDefault(),t&&e.onSend()))}}
              @input=${k=>{const T=k.target;sd(T),e.onDraftChange(T.value)}}
              @paste=${k=>mx(k,e)}
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
  `}const od=200;function wx(e){const t=[];let n=null;for(const i of e){if(i.kind!=="message"){n&&(t.push(n),n=null),t.push(i);continue}const s=Bn(i.message),o=cl(s.role),r=s.timestamp||Date.now(),a=i.message.__openclaw;if((a==null?void 0:a.kind)==="tool_render"){n&&(t.push(n),n=null),t.push({kind:"group",key:`group:${o}:${i.key}`,role:o,messages:[{message:i.message,key:i.key}],timestamp:r,isStreaming:!1});continue}!n||n.role!==o?(n&&t.push(n),n={kind:"group",key:`group:${o}:${i.key}`,role:o,messages:[{message:i.message,key:i.key}],timestamp:r,isStreaming:!1}):n.messages.push({message:i.message,key:i.key})}return n&&t.push(n),t}function xx(e){var y,A,E,R;const t=[],n=new Set,i=Array.isArray(e.messages)?e.messages:[],s=Array.isArray(e.toolMessages)?e.toolMessages:[];let r=[...Array.isArray(e.toolRenderItems)?e.toolRenderItems:[]].sort((k,T)=>k.ts-T.ts);r.length===0&&e.toolRenderData&&r.push({id:`legacy:${e.toolRenderSeq??Date.now()}`,runId:"",seq:e.toolRenderSeq??0,ts:Date.now(),payload:e.toolRenderData});const a=new Set([zv,"[已渲染到前端]"]),l=k=>{for(const T of a)if(T&&k.startsWith(T))return!0;return!1},c=(k,T,M)=>{var $;const m=(($=k.payload.formatted_response)==null?void 0:$.trim())??"";m&&(t.push({kind:"message",key:`tool-render:${e.sessionKey}:${k.id}:${M}`,message:{role:"assistant",content:[{type:"text",text:m}],timestamp:T,__openclaw:{kind:"tool_render",runId:k.runId,seq:k.seq}}}),n.add(m))},d=Math.max(0,i.length-od),u=i.length>d?Bn(i[d]).timestamp??0:0,h=i.length>0?Bn(i[i.length-1]).timestamp??0:0,g=[];for(let k=d;k<i.length;k++){const T=i[k],M=Bn(T),m=((y=Ti(T))==null?void 0:y.trim())??"";M.role.toLowerCase()==="assistant"&&l(m)&&g.push(k)}const v=new Map;if(g.length>0&&r.length>0){const k=g.map(M=>{const m=i[M],$=Bn(m);return{index:M,timestamp:$.timestamp??0}}),T=[];for(const M of r){const m=typeof M.ts=="number"?M.ts:0;if(m<u)continue;let $=null;for(const I of k){const P=I.timestamp-m;P<0||($==null||P<$.delta)&&($={index:I.index,delta:P})}if(!$){m>h&&T.push(M);continue}const L=v.get($.index);L?L.push(M):v.set($.index,[M])}for(const M of v.values())M.sort((m,$)=>m.ts-$.ts);r=T}d>0&&t.push({kind:"message",key:"chat:history:notice",message:{role:"system",content:`Showing last ${od} messages (${d} hidden).`,timestamp:Date.now()}});for(let k=d;k<i.length;k++){const T=i[k],M=Bn(T),m=((A=Ti(T))==null?void 0:A.trim())??"",L=T.__openclaw;if(L&&L.kind==="compaction"){t.push({kind:"divider",key:typeof L.id=="string"?`divider:compaction:${L.id}`:`divider:compaction:${M.timestamp}:${k}`,label:p("chat.ui.compaction.divider"),timestamp:M.timestamp??Date.now()});continue}if(!e.showThinking&&M.role.toLowerCase()==="toolresult")continue;if(M.role.toLowerCase()==="assistant"&&l(m)){const P=v.get(k);if(P&&P.length>0)for(let F=0;F<P.length;F++){const U=P[F];c(U,M.timestamp??Date.now(),k*1e3+F)}else t.push({kind:"message",key:xr(T,k),message:T});continue}const I=T.__openclaw;if((I==null?void 0:I.kind)==="tool_render"){const P=((E=Ti(T))==null?void 0:E.trim())??"";P&&n.add(P)}t.push({kind:"message",key:xr(T,k),message:T})}if(e.showThinking)for(let k=0;k<s.length;k++)t.push({kind:"message",key:xr(s[k],k+i.length),message:s[k]});const b=new Set;for(let k=0;k<r.length;k++){const T=r[k],M=typeof T.ts=="number"?T.ts:0;if(u>0&&M<u)continue;const m=((R=T.payload.formatted_response)==null?void 0:R.trim())??"";m&&(n.has(m)||b.has(m)||(b.add(m),c(T,T.ts||Date.now(),i.length+k)))}if(e.stream!==null){const k=`stream:${e.sessionKey}:${e.streamStartedAt??"live"}`;e.stream.trim().length>0?t.push({kind:"stream",key:k,text:e.stream,startedAt:e.streamStartedAt??Date.now()}):t.push({kind:"reading-indicator",key:k})}return wx(t)}function xr(e,t){const n=e,i=typeof n.toolCallId=="string"?n.toolCallId:"";if(i)return`tool:${i}`;const s=typeof n.id=="string"?n.id:"";if(s)return`msg:${s}`;const o=typeof n.messageId=="string"?n.messageId:"";if(o)return`msg:${o}`;const r=typeof n.timestamp=="number"?n.timestamp:null,a=typeof n.role=="string"?n.role:"unknown";return r!=null?`msg:${a}:${r}:${t}`:`msg:${a}:${t}`}const _x=new Set(["title","description","default","nullable"]);function kx(e){return Object.keys(e??{}).filter(n=>!_x.has(n)).length===0}function $x(e){if(e===void 0)return"";try{return JSON.stringify(e,null,2)??""}catch{return""}}const qi={chevronDown:f`
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
  `};function Sn(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:r,onPatch:a}=e,l=e.showLabel??!0,c=Ve(t),d=Ge(i,s),u=(d==null?void 0:d.label)??t.title??Et(String(i.at(-1))),h=(d==null?void 0:d.help)??t.description,g=Aa(i);if(o.has(g))return f`<div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${u}</div>
      <div class="cfg-field__error">Unsupported schema node. Use Raw mode.</div>
    </div>`;if(t.anyOf||t.oneOf){const b=(t.anyOf??t.oneOf??[]).filter(T=>!(T.type==="null"||Array.isArray(T.type)&&T.type.includes("null")));if(b.length===1)return Sn({...e,schema:b[0]});const y=T=>{if(T.const!==void 0)return T.const;if(T.enum&&T.enum.length===1)return T.enum[0]},A=b.map(y),E=A.every(T=>T!==void 0);if(E&&A.length>0&&A.length<=5){const T=n??t.default;return f`
        <div class="cfg-field">
          ${l?f`<label class="cfg-field__label">${u}</label>`:S}
          ${h?f`<div class="cfg-field__help">${h}</div>`:S}
          <div class="cfg-segmented">
            ${A.map(M=>f`
              <button
                type="button"
                class="cfg-segmented__btn ${M===T||String(M)===String(T)?"active":""}"
                ?disabled=${r}
                @click=${()=>a(i,M)}
              >
                ${String(M)}
              </button>
            `)}
          </div>
        </div>
      `}if(E&&A.length>5)return ad({...e,options:A,value:n??t.default});const R=new Set(b.map(T=>Ve(T)).filter(Boolean)),k=new Set([...R].map(T=>T==="integer"?"number":T));if([...k].every(T=>["string","number","boolean"].includes(T))){const T=k.has("string"),M=k.has("number");if(k.has("boolean")&&k.size===1)return Sn({...e,schema:{...t,type:"boolean",anyOf:void 0,oneOf:void 0}});if(T||M)return rd({...e,inputType:M&&!T?"number":"text"})}}if(t.enum){const v=t.enum;if(v.length<=5){const b=n??t.default;return f`
        <div class="cfg-field">
          ${l?f`<label class="cfg-field__label">${u}</label>`:S}
          ${h?f`<div class="cfg-field__help">${h}</div>`:S}
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
      `}return ad({...e,options:v,value:n??t.default})}if(c==="object")return Ax(e);if(c==="array")return Tx(e);if(c==="boolean"){const v=typeof n=="boolean"?n:typeof t.default=="boolean"?t.default:!1;return f`
      <label class="cfg-toggle-row ${r?"disabled":""}">
        <div class="cfg-toggle-row__content">
          <span class="cfg-toggle-row__label">${u}</span>
          ${h?f`<span class="cfg-toggle-row__help">${h}</span>`:S}
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
    `}return c==="number"||c==="integer"?Sx(e):c==="string"?rd({...e,inputType:"text"}):f`
    <div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${u}</div>
      <div class="cfg-field__error">Unsupported type: ${c}. Use Raw mode.</div>
    </div>
  `}function rd(e){const{schema:t,value:n,path:i,hints:s,disabled:o,onPatch:r,inputType:a}=e,l=e.showLabel??!0,c=Ge(i,s),d=(c==null?void 0:c.label)??t.title??Et(String(i.at(-1))),u=(c==null?void 0:c.help)??t.description,h=((c==null?void 0:c.sensitive)??!1)&&!/^\$\{[^}]*\}$/.test(String(n??"").trim()),g=(c==null?void 0:c.placeholder)??(h?"••••":t.default!==void 0?`Default: ${String(t.default)}`:""),v=n??"";return f`
    <div class="cfg-field">
      ${l?f`<label class="cfg-field__label">${d}</label>`:S}
      ${u?f`<div class="cfg-field__help">${u}</div>`:S}
      <div class="cfg-input-wrap">
        <input
          type=${h?"password":a}
          class="cfg-input"
          placeholder=${g}
          .value=${v==null?"":String(v)}
          ?disabled=${o}
          @input=${b=>{const y=b.target.value;if(a==="number"){if(y.trim()===""){r(i,void 0);return}const A=Number(y);r(i,Number.isNaN(A)?y:A);return}r(i,y)}}
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
        `:S}
      </div>
    </div>
  `}function Sx(e){const{schema:t,value:n,path:i,hints:s,disabled:o,onPatch:r}=e,a=e.showLabel??!0,l=Ge(i,s),c=(l==null?void 0:l.label)??t.title??Et(String(i.at(-1))),d=(l==null?void 0:l.help)??t.description,u=n??t.default??"",h=typeof u=="number"?u:0;return f`
    <div class="cfg-field">
      ${a?f`<label class="cfg-field__label">${c}</label>`:S}
      ${d?f`<div class="cfg-field__help">${d}</div>`:S}
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
  `}function ad(e){const{schema:t,value:n,path:i,hints:s,disabled:o,options:r,onPatch:a}=e,l=e.showLabel??!0,c=Ge(i,s),d=(c==null?void 0:c.label)??t.title??Et(String(i.at(-1))),u=(c==null?void 0:c.help)??t.description,h=n??t.default,g=r.findIndex(b=>b===h||String(b)===String(h)),v="__unset__";return f`
    <div class="cfg-field">
      ${l?f`<label class="cfg-field__label">${d}</label>`:S}
      ${u?f`<div class="cfg-field__help">${u}</div>`:S}
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
  `}function Ax(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:r,onPatch:a}=e,l=Ge(i,s),c=(l==null?void 0:l.label)??t.title??Et(String(i.at(-1))),d=(l==null?void 0:l.help)??t.description,u=n??t.default,h=u&&typeof u=="object"&&!Array.isArray(u)?u:{},g=t.properties??{},b=Object.entries(g).toSorted((k,T)=>{var $,L;const M=(($=Ge([...i,k[0]],s))==null?void 0:$.order)??0,m=((L=Ge([...i,T[0]],s))==null?void 0:L.order)??0;return M!==m?M-m:k[0].localeCompare(T[0])}),y=new Set(Object.keys(g)),A=t.additionalProperties,E=!!A&&typeof A=="object",R=f`
    ${b.map(([k,T])=>Sn({schema:T,value:h[k],path:[...i,k],hints:s,unsupported:o,disabled:r,onPatch:a}))}
    ${E?Cx({schema:A,value:h,path:i,hints:s,unsupported:o,disabled:r,reservedKeys:y,onPatch:a}):S}
  `;return i.length===1?f`
      <div class="cfg-fields">
        ${R}
      </div>
    `:f`
    <details class="cfg-object" open>
      <summary class="cfg-object__header">
        <span class="cfg-object__title">${c}</span>
        <span class="cfg-object__chevron">${qi.chevronDown}</span>
      </summary>
      ${d?f`<div class="cfg-object__help">${d}</div>`:S}
      <div class="cfg-object__content">
        ${R}
      </div>
    </details>
  `}function Tx(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:r,onPatch:a}=e,l=e.showLabel??!0,c=Ge(i,s),d=(c==null?void 0:c.label)??t.title??Et(String(i.at(-1))),u=(c==null?void 0:c.help)??t.description,h=Array.isArray(t.items)?t.items[0]:t.items;if(!h)return f`
      <div class="cfg-field cfg-field--error">
        <div class="cfg-field__label">${d}</div>
        <div class="cfg-field__error">Unsupported array schema. Use Raw mode.</div>
      </div>
    `;const g=Array.isArray(n)?n:Array.isArray(t.default)?t.default:[];return f`
    <div class="cfg-array">
      <div class="cfg-array__header">
        ${l?f`<span class="cfg-array__label">${d}</span>`:S}
        <span class="cfg-array__count">${g.length} item${g.length!==1?"s":""}</span>
        <button
          type="button"
          class="cfg-array__add"
          ?disabled=${r}
          @click=${()=>{const v=[...g,Hu(h)];a(i,v)}}
        >
          <span class="cfg-array__add-icon">${qi.plus}</span>
          Add
        </button>
      </div>
      ${u?f`<div class="cfg-array__help">${u}</div>`:S}

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
                  ${qi.trash}
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
  `}function Cx(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:r,reservedKeys:a,onPatch:l}=e,c=kx(t),d=Object.entries(n??{}).filter(([u])=>!a.has(u));return f`
    <div class="cfg-map">
      <div class="cfg-map__header">
        <span class="cfg-map__label">Custom entries</span>
        <button
          type="button"
          class="cfg-map__add"
          ?disabled=${r}
          @click=${()=>{const u={...n};let h=1,g=`custom-${h}`;for(;g in u;)h+=1,g=`custom-${h}`;u[g]=c?{}:Hu(t),l(i,u)}}
        >
          <span class="cfg-map__add-icon">${qi.plus}</span>
          Add Entry
        </button>
      </div>

      ${d.length===0?f`
              <div class="cfg-map__empty">No custom entries.</div>
            `:f`
        <div class="cfg-map__items">
          ${d.map(([u,h])=>{const g=[...i,u],v=$x(h);return f`
              <div class="cfg-map__item">
                <div class="cfg-map__item-key">
                  <input
                    type="text"
                    class="cfg-input cfg-input--sm"
                    placeholder="Key"
                    .value=${u}
                    ?disabled=${r}
                    @change=${b=>{const y=b.target.value.trim();if(!y||y===u)return;const A={...n};y in A||(A[y]=A[u],delete A[u],l(i,A))}}
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
                          @change=${b=>{const y=b.target,A=y.value.trim();if(!A){l(g,void 0);return}try{l(g,JSON.parse(A))}catch{y.value=v}}}
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
                  ${qi.trash}
                </button>
              </div>
            `})}
        </div>
      `}
    </div>
  `}const ld={env:f`
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
  `},ul={env:{label:"Environment Variables",description:"Environment variables passed to the gateway process"},update:{label:"Updates",description:"Auto-update settings and release channel"},agents:{label:"Agents",description:"Agent configurations, models, and identities"},auth:{label:"Authentication",description:"API keys and authentication profiles"},channels:{label:"Channels",description:"Messaging channels (Telegram, Discord, Slack, etc.)"},messages:{label:"Messages",description:"Message handling and routing settings"},commands:{label:"Commands",description:"Custom slash commands"},hooks:{label:"Hooks",description:"Webhooks and event hooks"},skills:{label:"Skills",description:"Skill packs and capabilities"},tools:{label:"Tools",description:"Tool configurations (browser, search, etc.)"},gateway:{label:"Gateway",description:"Gateway server settings (port, auth, binding)"},wizard:{label:"Setup Wizard",description:"Setup wizard state and history"},meta:{label:"Metadata",description:"Gateway metadata and version information"},logging:{label:"Logging",description:"Log levels and output configuration"},browser:{label:"Browser",description:"Browser automation settings"},ui:{label:"UI",description:"User interface preferences"},models:{label:"Models",description:"AI model configurations and providers"},bindings:{label:"Bindings",description:"Key bindings and shortcuts"},broadcast:{label:"Broadcast",description:"Broadcast and notification settings"},audio:{label:"Audio",description:"Audio input/output settings"},session:{label:"Session",description:"Session management and persistence"},cron:{label:"Cron",description:"Scheduled tasks and automation"},web:{label:"Web",description:"Web server and API settings"},discovery:{label:"Discovery",description:"Service discovery and networking"},canvasHost:{label:"Canvas Host",description:"Canvas rendering and display"},talk:{label:"Talk",description:"Voice and speech settings"},plugins:{label:"Plugins",description:"Plugin management and extensions"}};function cd(e){return ld[e]??ld.default}function Ex(e,t,n){if(!n)return!0;const i=n.toLowerCase(),s=ul[e];return e.toLowerCase().includes(i)||s&&(s.label.toLowerCase().includes(i)||s.description.toLowerCase().includes(i))?!0:wi(t,i)}function wi(e,t){var i,s,o;if((i=e.title)!=null&&i.toLowerCase().includes(t)||(s=e.description)!=null&&s.toLowerCase().includes(t)||(o=e.enum)!=null&&o.some(r=>String(r).toLowerCase().includes(t)))return!0;if(e.properties){for(const[r,a]of Object.entries(e.properties))if(r.toLowerCase().includes(t)||wi(a,t))return!0}if(e.items){const r=Array.isArray(e.items)?e.items:[e.items];for(const a of r)if(a&&wi(a,t))return!0}if(e.additionalProperties&&typeof e.additionalProperties=="object"&&wi(e.additionalProperties,t))return!0;const n=e.anyOf??e.oneOf??e.allOf;if(n){for(const r of n)if(r&&wi(r,t))return!0}return!1}function Rx(e){var u;if(!e.schema)return f`
      <div class="muted">Schema unavailable.</div>
    `;const t=e.schema,n=e.value??{};if(Ve(t)!=="object"||!t.properties)return f`
      <div class="callout danger">Unsupported schema. Use Raw.</div>
    `;const i=new Set(e.unsupportedPaths??[]),s=t.properties,o=e.searchQuery??"",r=e.activeSection,a=e.activeSubsection??null,c=Object.entries(s).toSorted((h,g)=>{var y,A;const v=((y=Ge([h[0]],e.uiHints))==null?void 0:y.order)??50,b=((A=Ge([g[0]],e.uiHints))==null?void 0:A.order)??50;return v!==b?v-b:h[0].localeCompare(g[0])}).filter(([h,g])=>!(r&&h!==r||o&&!Ex(h,g,o)));let d=null;if(r&&a&&c.length===1){const h=(u=c[0])==null?void 0:u[1];h&&Ve(h)==="object"&&h.properties&&h.properties[a]&&(d={sectionKey:r,subsectionKey:a,schema:h.properties[a]})}return c.length===0?f`
      <div class="config-empty">
        <div class="config-empty__icon">${$e.search}</div>
        <div class="config-empty__text">
          ${o?`No settings match "${o}"`:"No settings in this section"}
        </div>
      </div>
    `:f`
    <div class="config-form config-form--modern">
      ${d?(()=>{const{sectionKey:h,subsectionKey:g,schema:v}=d,b=Ge([h,g],e.uiHints),y=(b==null?void 0:b.label)??v.title??Et(g),A=(b==null?void 0:b.help)??v.description??"",E=n[h],R=E&&typeof E=="object"?E[g]:void 0,k=`config-section-${h}-${g}`;return f`
              <section class="config-section-card" id=${k}>
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${cd(h)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${y}</h3>
                    ${A?f`<p class="config-section-card__desc">${A}</p>`:S}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${Sn({schema:v,value:R,path:[h,g],hints:e.uiHints,unsupported:i,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})():c.map(([h,g])=>{const v=ul[h]??{label:h.charAt(0).toUpperCase()+h.slice(1),description:g.description??""};return f`
              <section class="config-section-card" id="config-section-${h}">
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${cd(h)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${v.label}</h3>
                    ${v.description?f`<p class="config-section-card__desc">${v.description}</p>`:S}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${Sn({schema:g,value:n[h],path:[h],hints:e.uiHints,unsupported:i,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})}
    </div>
  `}const Lx=new Set(["title","description","default","nullable"]);function Mx(e){return Object.keys(e??{}).filter(n=>!Lx.has(n)).length===0}function Ef(e){const t=e.filter(s=>s!=null),n=t.length!==e.length,i=[];for(const s of t)i.some(o=>Object.is(o,s))||i.push(s);return{enumValues:i,nullable:n}}function Px(e){return!e||typeof e!="object"?{schema:null,unsupportedPaths:["<root>"]}:Li(e,[])}function Li(e,t){const n=new Set,i={...e},s=Aa(t)||"<root>";if(e.anyOf||e.oneOf||e.allOf){const a=Dx(e,t);return a||{schema:e,unsupportedPaths:[s]}}const o=Array.isArray(e.type)&&e.type.includes("null"),r=Ve(e)??(e.properties||e.additionalProperties?"object":void 0);if(i.type=r??e.type,i.nullable=o||e.nullable,i.enum){const{enumValues:a,nullable:l}=Ef(i.enum);i.enum=a,l&&(i.nullable=!0),a.length===0&&n.add(s)}if(r==="object"){const a=e.properties??{},l={};for(const[c,d]of Object.entries(a)){const u=Li(d,[...t,c]);u.schema&&(l[c]=u.schema);for(const h of u.unsupportedPaths)n.add(h)}if(i.properties=l,e.additionalProperties===!0)n.add(s);else if(e.additionalProperties===!1)i.additionalProperties=!1;else if(e.additionalProperties&&typeof e.additionalProperties=="object"&&!Mx(e.additionalProperties)){const c=Li(e.additionalProperties,[...t,"*"]);i.additionalProperties=c.schema??e.additionalProperties,c.unsupportedPaths.length>0&&n.add(s)}}else if(r==="array"){const a=Array.isArray(e.items)?e.items[0]:e.items;if(!a)n.add(s);else{const l=Li(a,[...t,"*"]);i.items=l.schema??a,l.unsupportedPaths.length>0&&n.add(s)}}else r!=="string"&&r!=="number"&&r!=="integer"&&r!=="boolean"&&!i.enum&&n.add(s);return{schema:i,unsupportedPaths:Array.from(n)}}function Dx(e,t){if(e.allOf)return null;const n=e.anyOf??e.oneOf;if(!n)return null;const i=[],s=[];let o=!1;for(const a of n){if(!a||typeof a!="object")return null;if(Array.isArray(a.enum)){const{enumValues:l,nullable:c}=Ef(a.enum);i.push(...l),c&&(o=!0);continue}if("const"in a){if(a.const==null){o=!0;continue}i.push(a.const);continue}if(Ve(a)==="null"){o=!0;continue}s.push(a)}if(i.length>0&&s.length===0){const a=[];for(const l of i)a.some(c=>Object.is(c,l))||a.push(l);return{schema:{...e,enum:a,nullable:o,anyOf:void 0,oneOf:void 0,allOf:void 0},unsupportedPaths:[]}}if(s.length===1){const a=Li(s[0],t);return a.schema&&(a.schema.nullable=o||a.schema.nullable),a}const r=new Set(["string","number","integer","boolean"]);return s.length>0&&i.length===0&&s.every(a=>a.type&&r.has(String(a.type)))?{schema:{...e,nullable:o},unsupportedPaths:[]}:null}const aa={all:f`
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
  `},dd=[{key:"env",label:"Environment"},{key:"update",label:"Updates"},{key:"agents",label:"Agents"},{key:"auth",label:"Authentication"},{key:"channels",label:"Channels"},{key:"messages",label:"Messages"},{key:"commands",label:"Commands"},{key:"hooks",label:"Hooks"},{key:"skills",label:"Skills"},{key:"tools",label:"Tools"},{key:"gateway",label:"Gateway"},{key:"wizard",label:"Setup Wizard"}],ud="__all__";function hd(e){return aa[e]??aa.default}function Ix(e,t){const n=ul[e];return n||{label:(t==null?void 0:t.title)??Et(e),description:(t==null?void 0:t.description)??""}}function Ox(e){const{key:t,schema:n,uiHints:i}=e;if(!n||Ve(n)!=="object"||!n.properties)return[];const s=Object.entries(n.properties).map(([o,r])=>{const a=Ge([t,o],i),l=(a==null?void 0:a.label)??r.title??Et(o),c=(a==null?void 0:a.help)??r.description??"",d=(a==null?void 0:a.order)??50;return{key:o,label:l,description:c,order:d}});return s.sort((o,r)=>o.order!==r.order?o.order-r.order:o.key.localeCompare(r.key)),s}function Fx(e,t){if(!e||!t)return[];const n=[];function i(s,o,r){if(s===o)return;if(typeof s!=typeof o){n.push({path:r,from:s,to:o});return}if(typeof s!="object"||s===null||o===null){s!==o&&n.push({path:r,from:s,to:o});return}if(Array.isArray(s)&&Array.isArray(o)){JSON.stringify(s)!==JSON.stringify(o)&&n.push({path:r,from:s,to:o});return}const a=s,l=o,c=new Set([...Object.keys(a),...Object.keys(l)]);for(const d of c)i(a[d],l[d],r?`${r}.${d}`:d)}return i(e,t,""),n}function fd(e,t=40){let n;try{n=JSON.stringify(e)??String(e)}catch{n=String(e)}return n.length<=t?n:n.slice(0,t-3)+"..."}function Nx(e){var M,m,$;const t=e.valid==null?"unknown":e.valid?"valid":"invalid",n=Px(e.schema),i=n.schema?n.unsupportedPaths.length>0:!1,s=((M=n.schema)==null?void 0:M.properties)??{},o=dd.filter(L=>L.key in s),r=new Set(dd.map(L=>L.key)),a=Object.keys(s).filter(L=>!r.has(L)).map(L=>({key:L,label:L.charAt(0).toUpperCase()+L.slice(1)})),l=[...o,...a],c=e.activeSection&&n.schema&&Ve(n.schema)==="object"?(m=n.schema.properties)==null?void 0:m[e.activeSection]:void 0,d=e.activeSection?Ix(e.activeSection,c):null,u=e.activeSection?Ox({key:e.activeSection,schema:c,uiHints:e.uiHints}):[],h=e.formMode==="form"&&!!e.activeSection&&u.length>0,g=e.activeSubsection===ud,v=e.searchQuery||g?null:e.activeSubsection??(($=u[0])==null?void 0:$.key)??null,b=e.formMode==="form"?Fx(e.originalValue,e.formValue):[],y=e.formMode==="raw"&&e.raw!==e.originalRaw,A=e.formMode==="form"?b.length>0:y,E=!!e.formValue&&!e.loading&&!!n.schema,R=e.connected&&!e.saving&&A&&(e.formMode==="raw"?!0:E),k=e.connected&&!e.applying&&!e.updating&&A&&(e.formMode==="raw"?!0:E),T=e.connected&&!e.applying&&!e.updating;return f`
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
          ${e.searchQuery?f`
                <button
                  class="config-search__clear"
                  @click=${()=>e.onSearchChange("")}
                >
                  ×
                </button>
              `:S}
        </div>

        <!-- Section nav -->
        <nav class="config-nav">
          <button
            class="config-nav__item ${e.activeSection===null?"active":""}"
            @click=${()=>e.onSectionChange(null)}
          >
            <span class="config-nav__icon">${aa.all}</span>
            <span class="config-nav__label">All Settings</span>
          </button>
          ${l.map(L=>f`
              <button
                class="config-nav__item ${e.activeSection===L.key?"active":""}"
                @click=${()=>e.onSectionChange(L.key)}
              >
                <span class="config-nav__icon"
                  >${hd(L.key)}</span
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
            ${A?f`
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
              ?disabled=${!R}
              @click=${e.onSave}
            >
              ${e.saving?"Saving…":"Save"}
            </button>
            <button
              class="btn btn--sm"
              ?disabled=${!k}
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
        ${A&&e.formMode==="form"?f`
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
                  ${b.map(L=>f`
                      <div class="config-diff__item">
                        <div class="config-diff__path">${L.path}</div>
                        <div class="config-diff__values">
                          <span class="config-diff__from"
                            >${fd(L.from)}</span
                          >
                          <span class="config-diff__arrow">→</span>
                          <span class="config-diff__to"
                            >${fd(L.to)}</span
                          >
                        </div>
                      </div>
                    `)}
                </div>
              </details>
            `:S}
        ${d&&e.formMode==="form"?f`
              <div class="config-section-hero">
                <div class="config-section-hero__icon">
                  ${hd(e.activeSection??"")}
                </div>
                <div class="config-section-hero__text">
                  <div class="config-section-hero__title">
                    ${d.label}
                  </div>
                  ${d.description?f`<div class="config-section-hero__desc">
                        ${d.description}
                      </div>`:S}
                </div>
              </div>
            `:S}
        ${h?f`
              <div class="config-subnav">
                <button
                  class="config-subnav__item ${v===null?"active":""}"
                  @click=${()=>e.onSubsectionChange(ud)}
                >
                  All
                </button>
                ${u.map(L=>f`
                    <button
                      class="config-subnav__item ${v===L.key?"active":""}"
                      title=${L.description||L.label}
                      @click=${()=>e.onSubsectionChange(L.key)}
                    >
                      ${L.label}
                    </button>
                  `)}
              </div>
            `:S}

        <!-- Form content -->
        <div class="config-content">
          ${e.formMode==="form"?f`
                ${e.schemaLoading?f`
                        <div class="config-loading">
                          <div class="config-loading__spinner"></div>
                          <span>Loading schema…</span>
                        </div>
                      `:Rx({schema:n.schema,uiHints:e.uiHints,value:e.formValue,disabled:e.loading||!e.formValue,unsupportedPaths:n.unsupportedPaths,onPatch:e.onFormPatch,searchQuery:e.searchQuery,activeSection:e.activeSection,activeSubsection:v})}
                ${i?f`
                        <div class="callout danger" style="margin-top: 12px">
                          Form view can't safely edit some fields. Use Raw to avoid losing config entries.
                        </div>
                      `:S}
              `:f`
                <label class="field config-raw-field">
                  <span>Raw JSON5</span>
                  <textarea
                    .value=${e.raw}
                    @input=${L=>e.onRawChange(L.target.value)}
                  ></textarea>
                </label>
              `}
        </div>

        ${e.issues.length>0?f`<div class="callout danger" style="margin-top: 12px;">
              <pre class="code-block">
${JSON.stringify(e.issues,null,2)}</pre
              >
            </div>`:S}
      </main>
    </div>
  `}function pd(e){const t=(e??"").trim();return t?t==="Untitled quotation"||t==="未命名报价单"?p("work.fallbackDraftName"):t:""}function Bx(e){if(!e)return"-";try{return new Date(e).toLocaleString()}catch{return e??"-"}}function zx(e,t,n,i){const s=i==="asc"?1:-1;if(n==="created_at"){const o=e.created_at?new Date(e.created_at).getTime():0,r=t.created_at?new Date(t.created_at).getTime():0;return(o-r)*s}return n==="name"?(e.name??"").localeCompare(t.name??"")*s:(e.draft_no??"").localeCompare(t.draft_no??"")*s}function Hx(e){const{loading:t,error:n,drafts:i,detail:s,detailId:o,confirmBusy:r,confirmResult:a,filterQuery:l,sortBy:c,sortDir:d,page:u,pageSize:h,onRefresh:g,onSelectDraft:v,onConfirm:b,onClearDetail:y,onFilterQueryChange:A,onSortByChange:E,onSortDirChange:R,onPageChange:k,onPageSizeChange:T}=e,M=l.trim().toLowerCase(),$=[...M?i.filter(O=>`${O.draft_no??""}
${O.name??""}
${O.source??""}`.toLowerCase().includes(M)):i].sort((O,G)=>zx(O,G,c,d)),L=$.length,I=Math.max(1,h||10),P=Math.max(1,Math.ceil(L/I)),F=Math.min(Math.max(1,u),P),U=(F-1)*I,W=$.slice(U,U+I);return f`
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
            @input=${O=>A(O.target.value)}
            aria-label=${p("fulfill.filterPlaceholder")}
            style="min-width: 220px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border);"
          />
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${p("fulfill.sortBy")}</span>
            <select
              .value=${c}
              @change=${O=>E(O.target.value)}
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
              @change=${O=>R(O.target.value)}
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
              .value=${String(I)}
              @change=${O=>T(Number(O.target.value)||10)}
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
          `:S}

      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${p("fulfill.listTitle")}</div>
        <div class="card-sub">${p("fulfill.listSubtitle")}</div>

        ${t&&i.length===0?f`<p class="muted" style="margin-top: 12px;">${p("fulfill.loading")}</p>`:L===0?f`<p class="muted" style="margin-top: 12px;">${p("fulfill.noDrafts")}</p>`:f`
                <div class="muted" style="font-size: 12px; margin-top: 10px;">
                  ${p("fulfill.total",{total:String(L)})}
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
                      ${W.map(O=>f`
                          <tr style=${o===O.id?"background: var(--bg-secondary, #f5f5f5);":""}>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${O.draft_no}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${pd(O.name)}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${O.source??"-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${Bx(O.created_at)}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border); display: flex; gap: 6px; flex-wrap: wrap;">
                              <button
                                class="btn btn-sm"
                                @click=${()=>v(O.id)}
                                aria-label=${p("fulfill.viewDetail")}
                              >
                                ${p("fulfill.viewDetail")}
                              </button>
                              <button
                                class="btn"
                                style="font-size: 12px; padding: 4px 8px;"
                                ?disabled=${r}
                                @click=${()=>b(O.id)}
                                aria-label=${p("fulfill.confirmAction")}
                              >
                                ${r&&o===O.id?p("fulfill.confirming"):p("fulfill.confirmAction")}
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
                    @click=${()=>k(F-1)}
                    aria-label=${p("common.prev")}
                  >
                    ${p("common.prev")}
                  </button>
                  <span class="muted" style="font-size: 12px;">${p("fulfill.page",{current:String(F),total:String(P)})}</span>
                  <button
                    class="btn btn-sm"
                    ?disabled=${F>=P}
                    @click=${()=>k(F+1)}
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
              <div class="card-sub">${pd(s.name)}</div>
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
                    ${(s.lines??[]).map((O,G)=>f`
                        <tr>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${G+1}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${O.product_name??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${O.specification??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${O.qty??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${O.code??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${O.quote_name??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${O.quote_spec??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${O.unit_price??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${O.amount??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${O.warehouse_qty??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${O.shortfall??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${O.is_shortage?p("common.yes"):p("common.no")}</td>
                        </tr>
                      `)}
                  </tbody>
                </table>
              </div>
            </div>
          `:S}

      ${a?f`
            <div class="card" style="grid-column: 1 / -1; border-color: var(--success, #2e7d32);" role="status" aria-live="polite">
              <div class="card-title" style="color: var(--success, #2e7d32);">${p("fulfill.confirmTitle")}</div>
              ${a.order_id?f`<p style="margin: 0 0 4px 0; font-weight: 600;">${p("fulfill.orderId")}: ${a.order_id}</p>`:S}
              <div class="card-sub">${a.message??""}</div>
            </div>
          `:S}
    </section>
  `}function Ux(e,t,n,i){const s=i==="asc"?1:-1;if(n==="uploaded_at"){const o=e.uploaded_at?new Date(e.uploaded_at).getTime():0,r=t.uploaded_at?new Date(t.uploaded_at).getTime():0;return(o-r)*s}return n==="shortfall"?(Number(e.shortfall??0)-Number(t.shortfall??0))*s:n==="count"?(Number(e.count??0)-Number(t.count??0))*s:(e.product_name??"").localeCompare(t.product_name??"")*s}function jx(e){const{loading:t,error:n,suggestions:i,selectedKeys:s,approvedKeys:o,approveBusy:r,approveResult:a,filterQuery:l,sortBy:c,sortDir:d,page:u,pageSize:h,onRefresh:g,onToggleSelect:v,onApprove:b,onApproveBatch:y,onFilterQueryChange:A,onSortByChange:E,onSortDirChange:R,onPageChange:k,onPageSizeChange:T}=e,M=i.filter(N=>!o.includes(Je(N))),m=l.trim().toLowerCase(),$=m?M.filter(N=>`${N.product_name??""}
${N.specification??""}
${N.code??""}
${N.product_key??""}`.toLowerCase().includes(m)):M,L=[...$].sort((N,J)=>Ux(N,J,c,d)),I=L.length,P=Math.max(1,h||10),F=Math.max(1,Math.ceil(I/P)),U=Math.min(Math.max(1,u),F),W=(U-1)*P,O=L.slice(W,W+P),G=$.filter(N=>s.includes(Je(N))).length,le=$.length>0&&$.every(N=>s.includes(Je(N)));return f`
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
            @input=${N=>A(N.target.value)}
            aria-label=${p("procurement.filterPlaceholder")}
            style="min-width: 240px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border);"
          />
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${p("procurement.sortBy")}</span>
            <select
              .value=${c}
              @change=${N=>E(N.target.value)}
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
              @change=${N=>R(N.target.value)}
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
              @change=${N=>T(Number(N.target.value)||10)}
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
          `:S}

      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${p("procurement.listTitle")}</div>
        <div class="card-sub">${p("procurement.listHint")}</div>

        ${G>0?f`
              <div style="margin-top: 12px;">
                <button
                  class="btn"
                  style="font-size: 12px;"
                  ?disabled=${r}
                  @click=${y}
                  aria-label=${p("procurement.batchApprove")}
                >
                  ${r?p("procurement.approving"):`${p("procurement.batchApprove")} (${G})`}
                </button>
              </div>
            `:S}

        ${t&&i.length===0?f`<p class="muted" style="margin-top: 12px;">${p("procurement.loading")}</p>`:$.length===0?f`<p class="muted" style="margin-top: 12px;">${i.length===0?p("procurement.noSuggestions"):p("procurement.noPending")}</p>`:f`
                <div class="muted" style="font-size: 12px; margin-top: 10px;">
                  ${p("procurement.total",{total:String(I)})}
                </div>
                <div style="overflow-x: auto; margin-top: 8px;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <thead>
                      <tr style="background: var(--bg-secondary, #eee);">
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border); width: 36px;">
                          <input
                            type="checkbox"
                            .checked=${le}
                            .indeterminate=${G>0&&G<$.length}
                            aria-label=${p("procurement.selectAll")}
                            @change=${()=>{le?$.forEach(N=>v(Je(N))):$.forEach(N=>{const J=Je(N);s.includes(J)||v(J)})}}
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
                      ${O.map(N=>f`
                          <tr>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">
                              <input
                                type="checkbox"
                                .checked=${s.includes(Je(N))}
                                aria-label=${p("procurement.selectItem")}
                                @change=${()=>v(Je(N))}
                              />
                            </td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${N.product_name??"-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${N.specification??"-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${N.shortfall??0}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${N.code??"-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${N.count??0}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">
                              <button
                                class="btn"
                                style="font-size: 12px; padding: 4px 8px;"
                                ?disabled=${r}
                                @click=${()=>b(N)}
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
                    ?disabled=${U<=1}
                    @click=${()=>k(U-1)}
                    aria-label=${p("common.prev")}
                  >
                    ${p("common.prev")}
                  </button>
                  <span class="muted" style="font-size: 12px;">${p("procurement.page",{current:String(U),total:String(F)})}</span>
                  <button
                    class="btn btn-sm"
                    ?disabled=${U>=F}
                    @click=${()=>k(U+1)}
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
          `:S}

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
                ${e.replenishmentInputLines.map((N,J)=>f`
                    <tr>
                      <td style="padding: 6px 8px; border: 1px solid var(--border);">
                        <input
                          type="text"
                          .value=${N.product_or_code}
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
                          .value=${String(N.quantity||"")}
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
                            `:S}
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
          `:S}

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
                      ${e.replenishmentDrafts.map(N=>f`
                          <tr>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${N.draft_no}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${N.name}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">
                              ${N.created_at?new Date(N.created_at).toLocaleString():"-"}
                            </td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${N.status}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">
                              <button
                                class="btn btn-sm"
                                style="font-size: 12px; padding: 4px 8px; margin-right: 6px;"
                                @click=${()=>e.onSelectReplenishmentDraft(N.id)}
                              >
                                ${p("replenishment.viewDetail")}
                              </button>
                              <button
                                class="btn btn-sm"
                                style="font-size: 12px; padding: 4px 8px;"
                                ?disabled=${e.replenishmentConfirmBusy||N.status==="confirmed"}
                                @click=${()=>e.onConfirmReplenishment(N.id)}
                              >
                                ${e.replenishmentConfirmBusy?p("replenishment.confirming"):p("replenishment.confirm")}
                              </button>
                              <button
                                class="btn btn-sm"
                                style="font-size: 12px; padding: 4px 8px; color: var(--danger, #c62828);"
                                @click=${()=>e.onDeleteReplenishmentDraft(N.id)}
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
                    ${e.replenishmentDetail.lines.map(N=>f`
                        <tr>
                          <td style="padding: 6px 8px; border: 1px solid var(--border);">${N.code??"-"}</td>
                          <td style="padding: 6px 8px; border: 1px solid var(--border);">${N.product_name??"-"}</td>
                          <td style="padding: 6px 8px; border: 1px solid var(--border);">${N.specification??"-"}</td>
                          <td style="padding: 6px 8px; text-align: right; border: 1px solid var(--border);">
                            ${N.current_qty??"-"}
                          </td>
                          <td style="padding: 6px 8px; text-align: right; border: 1px solid var(--border);">
                            ${N.quantity}
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
          `:S}

      ${e.replenishmentConfirmResult?f`
            <div class="card" style="grid-column: 1 / -1;" role="status" aria-live="polite">
              <div class="card-sub">${e.replenishmentConfirmResult.message??""}</div>
            </div>
          `:S}
    </section>
  `}function qx(e){const t=e.status&&typeof e.status=="object"?e.status.securityAudit:null,n=(t==null?void 0:t.summary)??null,i=(n==null?void 0:n.critical)??0,s=(n==null?void 0:n.warn)??0,o=(n==null?void 0:n.info)??0,r=i>0?"danger":s>0?"warn":"success",a=i>0?`${i} critical`:s>0?`${s} warnings`:"No critical issues";return f`
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
                </div>`:S}
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
            </div>`:S}
        ${e.callResult?f`<pre class="code-block" style="margin-top: 12px;">${e.callResult}</pre>`:S}
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
                      <pre class="code-block">${Sb(l.payload)}</pre>
                    </div>
                  </div>
                `)}
            </div>
          `}
    </section>
  `}function Kx(e){const t=Math.max(0,e),n=Math.floor(t/1e3);if(n<60)return`${n}s`;const i=Math.floor(n/60);return i<60?`${i}m`:`${Math.floor(i/60)}h`}function en(e,t){return t?f`<div class="exec-approval-meta-row"><span>${e}</span><span>${t}</span></div>`:S}function Wx(e){const t=e.execApprovalQueue[0];if(!t)return S;const n=t.request,i=t.expiresAtMs-Date.now(),s=i>0?`expires in ${Kx(i)}`:"expired",o=e.execApprovalQueue.length;return f`
    <div class="exec-approval-overlay" role="dialog" aria-live="polite">
      <div class="exec-approval-card">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">Exec approval needed</div>
            <div class="exec-approval-sub">${s}</div>
          </div>
          ${o>1?f`<div class="exec-approval-queue">${o} pending</div>`:S}
        </div>
        <div class="exec-approval-command mono">${n.command}</div>
        <div class="exec-approval-meta">
          ${en("Host",n.host)}
          ${en("Agent",n.agentId)}
          ${en("Session",n.sessionKey)}
          ${en("CWD",n.cwd)}
          ${en("Resolved",n.resolvedPath)}
          ${en("Security",n.security)}
          ${en("Ask",n.ask)}
        </div>
        ${e.execApprovalError?f`<div class="exec-approval-error">${e.execApprovalError}</div>`:S}
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
  `}function Vx(e){const{pendingGatewayUrl:t}=e;return t?f`
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
  `:S}function Gx(e){const t=e.trim();if(t==="")return null;const n=Number(t);return Number.isFinite(n)?n:null}function Qx(e){const t=e.host.adminData;let n="";return f`
    <div class="admin-login">
      <h2 class="admin-login__title">数据管理 — 登录</h2>
      <input
        type="password"
        class="admin-input"
        placeholder="管理员密码"
        @input=${i=>{n=i.target.value}}
        @keydown=${i=>{i.key==="Enter"&&e.onLogin(n)}}
      />
      ${t.loginError?f`<p class="admin-err">${t.loginError}</p>`:S}
      <button
        class="admin-btn admin-btn--primary"
        ?disabled=${t.loginLoading}
        @click=${()=>e.onLogin(n)}
      >
        ${t.loginLoading?"登录中…":"登录"}
      </button>
    </div>
  `}function Rf(e,t,n){return f`
    <label class="admin-upload">
      <input
        type="file"
        accept=".xlsx"
        ?disabled=${t}
        @change=${i=>{var o;const s=(o=i.target.files)==null?void 0:o[0];s&&n(s),i.target.value=""}}
      />
      <span>${t?"上传中…":e}</span>
    </label>
  `}function Yx(e){const t=e.host.adminData;return t.token?f`
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
      ${t.activeSubTab==="price"?Xx(e):Jx(e)}
    </section>
  `:f`<section class="admin-panel">${Qx(e)}</section>`}function Xx(e){const t=e.host.adminData;return f`
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
        ${Rf("上传 Excel（全表替换）",t.priceUploading,e.onPriceUpload)}
        <button type="button" class="admin-btn admin-btn--primary" @click=${e.onPriceAddRow}>+ 新增一行</button>
      </div>
      ${t.priceError?f`<p class="admin-err">${t.priceError}</p>`:S}
      ${t.priceLoading?f`<p class="admin-muted">加载中…</p>`:S}
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
                          @input=${o=>e.onPriceFieldChange(i,{[s]:Gx(o.target.value)})}
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
                        </button>`:S}
                  </td>
                </tr>
              `)}
          </tbody>
        </table>
      </div>
      <p class="admin-muted">共 ${t.priceTotal} 行（当前页 ${t.priceItems.length} 条）</p>
    </div>
  `}function Jx(e){const t=e.host.adminData;return f`
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
        ${Rf("上传 Excel（全表替换）",t.mappingUploading,e.onMappingUpload)}
        <button type="button" class="admin-btn admin-btn--primary" @click=${e.onMappingAddRow}>+ 新增一行</button>
      </div>
      ${t.mappingError?f`<p class="admin-err">${t.mappingError}</p>`:S}
      ${t.mappingLoading?f`<p class="admin-muted">加载中…</p>`:S}
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
                        </button>`:S}
                  </td>
                </tr>
              `)}
          </tbody>
        </table>
      </div>
      <p class="admin-muted">共 ${t.mappingTotal} 行（当前页 ${t.mappingItems.length} 条）</p>
    </div>
  `}const gd=["trace","debug","info","warn","error","fatal"];function Zx(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleTimeString()}function e1(e,t){return t?[e.message,e.subsystem,e.raw].filter(Boolean).join(" ").toLowerCase().includes(t):!0}function t1(e){const t=e.filterText.trim().toLowerCase(),n=gd.some(o=>!e.levelFilters[o]),i=e.entries.filter(o=>o.level&&!e.levelFilters[o.level]?!1:e1(o,t)),s=t||n?"filtered":"visible";return f`
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
        ${gd.map(o=>f`
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

      ${e.file?f`<div class="muted" style="margin-top: 10px;">File: ${e.file}</div>`:S}
      ${e.truncated?f`
              <div class="callout" style="margin-top: 10px">Log output truncated; showing latest chunk.</div>
            `:S}
      ${e.error?f`<div class="callout danger" style="margin-top: 10px;">${e.error}</div>`:S}

      <div class="log-stream" style="margin-top: 12px;" @scroll=${e.onScroll}>
        ${i.length===0?f`
                <div class="muted" style="padding: 12px">No log entries.</div>
              `:i.map(o=>f`
                <div class="log-row">
                  <div class="log-time mono">${Zx(o.time)}</div>
                  <div class="log-level ${o.level??""}">${o.level??""}</div>
                  <div class="log-subsystem mono">${o.subsystem??""}</div>
                  <div class="log-message mono">${o.message??o.raw}</div>
                </div>
              `)}
      </div>
    </section>
  `}function n1(e){return f`
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
          </div>`:S}
      ${e.error?f`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:S}
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        ${e.stats?i1(e.stats):e.loading?S:f`<div class="muted">${p("oos.empty.stats")}</div>`}
      </div>
      <div style="margin-top: 24px;">
        <div class="row" style="justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="card-title" style="font-size: 1rem;">${p("oos.list.title")}</div>
          ${e.onOpenAddForm&&!e.showAddForm?f`<button class="btn btn--primary" ?disabled=${e.loading} @click=${e.onOpenAddForm}>${p("oos.actions.addManual")}</button>`:S}
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
            `:S}
        <div class="list" style="margin-top: 8px;">
          ${e.list.length===0?f`<div class="muted">${p("oos.empty.list")}</div>`:e.list.slice(0,50).map(t=>s1(t,e.onDelete))}
        </div>
        ${e.list.length>50?f`<div class="muted" style="margin-top: 8px;">
              ${p("oos.list.more",{count:String(e.list.length)})}
            </div>`:S}
      </div>
      <div class="row" style="margin-top: 24px; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">
            ${p("oos.byFile.title")}
          </div>
          <div class="list" style="margin-top: 8px;">
            ${e.byFile.length===0?f`<div class="muted">${p("oos.byFile.empty")}</div>`:e.byFile.slice(0,10).map(t=>o1(t))}
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">
            ${p("oos.byTime.title")}
          </div>
          <div class="list" style="margin-top: 8px;">
            ${e.byTime.length===0?f`<div class="muted">${p("oos.byTime.empty")}</div>`:e.byTime.slice(0,10).map(t=>r1(t))}
          </div>
        </div>
      </div>
    </section>
  `}function i1(e){return[{label:p("oos.stats.totalRecords"),value:e.total_records},{label:p("oos.stats.outOfStockCount"),value:e.out_of_stock_count},{label:p("oos.stats.today"),value:e.today_count},{label:p("oos.stats.reportedGe2"),value:e.notified_count},{label:p("oos.stats.emailSentProductCount"),value:e.email_sent_product_count}].map(n=>f`
      <div class="card stat-card" style="min-width: 100px;">
        <div class="stat-value">${n.value}</div>
        <div class="stat-label">${n.label}</div>
      </div>
    `)}function s1(e,t){const n=e.product_name??"",i=e.specification??"",s=e.unit??"",o=e.quantity??"",r=e.count??1,a=(e.email_sent_count??0)>0||e.email_status==="sent",l=p(a?"oos.email.sent":"oos.email.notSent"),c=e.product_key??"";return f`
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
          </button>`:S}
    </div>
  `}function o1(e){const t=e.file_name??"",n=e.total_records??0,i=e.uploaded_at?String(e.uploaded_at).length>19?String(e.uploaded_at).slice(0,10)+" "+String(e.uploaded_at).slice(11,19):String(e.uploaded_at):"";return f`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${t}</div>
        <div class="list-sub">
          ${p("oos.byFile.count",{count:String(n)})}${i?` · ${i}`:""}
        </div>
      </div>
    </div>
  `}function r1(e){return f`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.date??""}</div>
        <div class="list-sub">
          ${p("oos.byTime.count",{count:String(e.count??0)})}
        </div>
      </div>
    </div>
  `}function a1(e){return f`
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
          </div>`:S}
      ${e.error?f`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:S}
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        ${e.stats?l1(e.stats):e.loading?S:f`<div class="muted">${p("shortage.empty.stats")}</div>`}
      </div>
      <div style="margin-top: 24px;">
        <div class="row" style="justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="card-title" style="font-size: 1rem;">${p("shortage.list.title")}</div>
          ${e.onOpenAddForm&&!e.showAddForm?f`<button class="btn btn--primary" ?disabled=${e.loading} @click=${e.onOpenAddForm}>${p("shortage.actions.addManual")}</button>`:S}
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
            `:S}
        <div class="list" style="margin-top: 8px;">
          ${e.list.length===0?f`<div class="muted">${p("shortage.empty.list")}</div>`:e.list.slice(0,50).map(t=>c1(t,e.onDelete))}
        </div>
        ${e.list.length>50?f`<div class="muted" style="margin-top: 8px;">
              ${p("shortage.list.more",{count:String(e.list.length)})}
            </div>`:S}
      </div>
      <div class="row" style="margin-top: 24px; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">
            ${p("shortage.byFile.title")}
          </div>
          <div class="list" style="margin-top: 8px;">
            ${e.byFile.length===0?f`<div class="muted">${p("shortage.byFile.empty")}</div>`:e.byFile.slice(0,10).map(t=>d1(t))}
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">
            ${p("shortage.byTime.title")}
          </div>
          <div class="list" style="margin-top: 8px;">
            ${e.byTime.length===0?f`<div class="muted">${p("shortage.byTime.empty")}</div>`:e.byTime.slice(0,10).map(t=>u1(t))}
          </div>
        </div>
      </div>
    </section>
  `}function l1(e){return[{label:p("shortage.stats.totalRecords"),value:e.total_records},{label:p("shortage.stats.shortageProductCount"),value:e.shortage_product_count},{label:p("shortage.stats.today"),value:e.today_count},{label:p("shortage.stats.reportedGe2"),value:e.reported_ge2_count}].map(n=>f`
      <div class="card stat-card" style="min-width: 100px;">
        <div class="stat-value">${n.value}</div>
        <div class="stat-label">${n.label}</div>
      </div>
    `)}function c1(e,t){const n=e.product_name??"",i=e.specification??"",s=e.quantity??0,o=e.available_qty??0,r=e.shortfall??0,a=e.count??1,l=e.product_key??"";return f`
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
          </button>`:S}
    </div>
  `}function d1(e){const t=e.file_name??"",n=e.total_records??0,i=e.uploaded_at?String(e.uploaded_at).length>19?String(e.uploaded_at).slice(0,10)+" "+String(e.uploaded_at).slice(11,19):String(e.uploaded_at):"";return f`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${t}</div>
        <div class="list-sub">
          ${p("shortage.byFile.count",{count:String(n)})}${i?` · ${i}`:""}
        </div>
      </div>
    </div>
  `}function u1(e){return f`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.date??""}</div>
        <div class="list-sub">
          ${p("shortage.byTime.count",{count:String(e.count??0)})}
        </div>
      </div>
    </div>
  `}const zt="__defaults__",md=[{value:"deny",label:"Deny"},{value:"allowlist",label:"Allowlist"},{value:"full",label:"Full"}],h1=[{value:"off",label:"Off"},{value:"on-miss",label:"On miss"},{value:"always",label:"Always"}];function vd(e){return e==="allowlist"||e==="full"||e==="deny"?e:"deny"}function f1(e){return e==="always"||e==="off"||e==="on-miss"?e:"on-miss"}function p1(e){const t=(e==null?void 0:e.defaults)??{};return{security:vd(t.security),ask:f1(t.ask),askFallback:vd(t.askFallback??"deny"),autoAllowSkills:!!(t.autoAllowSkills??!1)}}function g1(e){const t=(e==null?void 0:e.agents)??{},n=Array.isArray(t.list)?t.list:[],i=[];return n.forEach(s=>{if(!s||typeof s!="object")return;const o=s,r=typeof o.id=="string"?o.id.trim():"";if(!r)return;const a=typeof o.name=="string"?o.name.trim():void 0,l=o.default===!0;i.push({id:r,name:a||void 0,isDefault:l})}),i}function m1(e,t){const n=g1(e),i=Object.keys((t==null?void 0:t.agents)??{}),s=new Map;n.forEach(r=>s.set(r.id,r)),i.forEach(r=>{s.has(r)||s.set(r,{id:r})});const o=Array.from(s.values());return o.length===0&&o.push({id:"main",isDefault:!0}),o.sort((r,a)=>{var d,u;if(r.isDefault&&!a.isDefault)return-1;if(!r.isDefault&&a.isDefault)return 1;const l=(d=r.name)!=null&&d.trim()?r.name:r.id,c=(u=a.name)!=null&&u.trim()?a.name:a.id;return l.localeCompare(c)}),o}function v1(e,t){return e===zt?zt:e&&t.some(n=>n.id===e)?e:zt}function y1(e){var u;const t=e.execApprovalsForm??((u=e.execApprovalsSnapshot)==null?void 0:u.file)??null,n=!!t,i=p1(t),s=m1(e.configForm,t),o=S1(e.nodes),r=e.execApprovalsTarget;let a=r==="node"&&e.execApprovalsTargetNodeId?e.execApprovalsTargetNodeId:null;r==="node"&&a&&!o.some(h=>h.id===a)&&(a=null);const l=v1(e.execApprovalsSelectedAgent,s),c=l!==zt?((t==null?void 0:t.agents)??{})[l]??null:null,d=Array.isArray(c==null?void 0:c.allowlist)?c.allowlist??[]:[];return{ready:n,disabled:e.execApprovalsSaving||e.execApprovalsLoading,dirty:e.execApprovalsDirty,loading:e.execApprovalsLoading,saving:e.execApprovalsSaving,form:t,defaults:i,selectedScope:l,selectedAgent:c,agents:s,allowlist:d,target:r,targetNodeId:a,targetNodes:o,onSelectScope:e.onExecApprovalsSelectAgent,onSelectTarget:e.onExecApprovalsTargetChange,onPatch:e.onExecApprovalsPatch,onRemove:e.onExecApprovalsRemove,onLoad:e.onLoadExecApprovals,onSave:e.onSaveExecApprovals}}function b1(e){const t=e.ready,n=e.target!=="node"||!!e.targetNodeId;return f`
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

      ${w1(e)}

      ${t?f`
            ${x1(e)}
            ${_1(e)}
            ${e.selectedScope===zt?S:k1(e)}
          `:f`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load exec approvals to edit allowlists.</div>
            <button class="btn" ?disabled=${e.loading||!n} @click=${e.onLoad}>
              ${e.loading?"Loading…":"Load approvals"}
            </button>
          </div>`}
    </section>
  `}function w1(e){const t=e.targetNodes.length>0,n=e.targetNodeId??"";return f`
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
              `:S}
        </div>
      </div>
      ${e.target==="node"&&!t?f`
              <div class="muted">No nodes advertise exec approvals yet.</div>
            `:S}
    </div>
  `}function x1(e){return f`
    <div class="row" style="margin-top: 12px; gap: 8px; flex-wrap: wrap;">
      <span class="label">Scope</span>
      <div class="row" style="gap: 8px; flex-wrap: wrap;">
        <button
          class="btn btn--sm ${e.selectedScope===zt?"active":""}"
          @click=${()=>e.onSelectScope(zt)}
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
  `}function _1(e){const t=e.selectedScope===zt,n=e.defaults,i=e.selectedAgent??{},s=t?["defaults"]:["agents",e.selectedScope],o=typeof i.security=="string"?i.security:void 0,r=typeof i.ask=="string"?i.ask:void 0,a=typeof i.askFallback=="string"?i.askFallback:void 0,l=t?n.security:o??"__default__",c=t?n.ask:r??"__default__",d=t?n.askFallback:a??"__default__",u=typeof i.autoAllowSkills=="boolean"?i.autoAllowSkills:void 0,h=u??n.autoAllowSkills,g=u==null;return f`
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
              ${t?S:f`<option value="__default__" ?selected=${l==="__default__"}>
                    Use default (${n.security})
                  </option>`}
              ${md.map(v=>f`<option
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
              ${t?S:f`<option value="__default__" ?selected=${c==="__default__"}>
                    Use default (${n.ask})
                  </option>`}
              ${h1.map(v=>f`<option
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
              ${t?S:f`<option value="__default__" ?selected=${d==="__default__"}>
                    Use default (${n.askFallback})
                  </option>`}
              ${md.map(v=>f`<option
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
              </button>`:S}
        </div>
      </div>
    </div>
  `}function k1(e){const t=["agents",e.selectedScope,"allowlist"],n=e.allowlist;return f`
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
            `:n.map((i,s)=>$1(e,i,s))}
    </div>
  `}function $1(e,t,n){var r;const i=t.lastUsedAt?Cn(t.lastUsedAt):"never",s=t.lastUsedCommand?Or(t.lastUsedCommand,120):null,o=t.lastResolvedPath?Or(t.lastResolvedPath,120):null;return f`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${(r=t.pattern)!=null&&r.trim()?t.pattern:"New pattern"}</div>
        <div class="list-sub">Last used: ${i}</div>
        ${s?f`<div class="list-sub mono">${s}</div>`:S}
        ${o?f`<div class="list-sub mono">${o}</div>`:S}
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
  `}function S1(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(a=>String(a)==="system.execApprovals.get"||String(a)==="system.execApprovals.set"))continue;const o=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!o)continue;const r=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():o;t.push({id:o,label:r===o?o:`${r} · ${o}`})}return t.sort((n,i)=>n.label.localeCompare(i.label)),t}function A1(e){const t=L1(e),n=y1(e);return f`
    ${b1(n)}
    ${M1(t)}
    ${T1(e)}
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
              `:e.nodes.map(i=>O1(i))}
      </div>
    </section>
  `}function T1(e){const t=e.devicesList??{pending:[],paired:[]},n=Array.isArray(t.pending)?t.pending:[],i=Array.isArray(t.paired)?t.paired:[];return f`
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
      ${e.devicesError?f`<div class="callout danger" style="margin-top: 12px;">${e.devicesError}</div>`:S}
      <div class="list" style="margin-top: 16px;">
        ${n.length>0?f`
              <div class="muted" style="margin-bottom: 8px;">Pending</div>
              ${n.map(s=>C1(s,e))}
            `:S}
        ${i.length>0?f`
              <div class="muted" style="margin-top: 12px; margin-bottom: 8px;">Paired</div>
              ${i.map(s=>E1(s,e))}
            `:S}
        ${n.length===0&&i.length===0?f`
                <div class="muted">No paired devices.</div>
              `:S}
      </div>
    </section>
  `}function C1(e,t){var a,l;const n=((a=e.displayName)==null?void 0:a.trim())||e.deviceId,i=typeof e.ts=="number"?Cn(e.ts):"n/a",s=(l=e.role)!=null&&l.trim()?`role: ${e.role}`:"role: -",o=e.isRepair?" · repair":"",r=e.remoteIp?` · ${e.remoteIp}`:"";return f`
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
  `}function E1(e,t){var a;const n=((a=e.displayName)==null?void 0:a.trim())||e.deviceId,i=e.remoteIp?` · ${e.remoteIp}`:"",s=`roles: ${Ir(e.roles)}`,o=`scopes: ${Ir(e.scopes)}`,r=Array.isArray(e.tokens)?e.tokens:[];return f`
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
                ${r.map(l=>R1(e.deviceId,l,t))}
              </div>
            `}
      </div>
    </div>
  `}function R1(e,t,n){const i=t.revokedAtMs?"revoked":"active",s=`scopes: ${Ir(t.scopes)}`,o=Cn(t.rotatedAtMs??t.createdAtMs??t.lastUsedAtMs??null);return f`
    <div class="row" style="justify-content: space-between; gap: 8px;">
      <div class="list-sub">${t.role} · ${i} · ${s} · ${o}</div>
      <div class="row" style="justify-content: flex-end; gap: 6px; flex-wrap: wrap;">
        <button
          class="btn btn--sm"
          @click=${()=>n.onDeviceRotate(e,t.role,t.scopes)}
        >
          Rotate
        </button>
        ${t.revokedAtMs?S:f`
              <button
                class="btn btn--sm danger"
                @click=${()=>n.onDeviceRevoke(e,t.role)}
              >
                Revoke
              </button>
            `}
      </div>
    </div>
  `}function L1(e){const t=e.configForm,n=D1(e.nodes),{defaultBinding:i,agents:s}=I1(t),o=!!t,r=e.configSaving||e.configFormMode==="raw";return{ready:o,disabled:r,configDirty:e.configDirty,configLoading:e.configLoading,configSaving:e.configSaving,defaultBinding:i,agents:s,nodes:n,onBindDefault:e.onBindDefault,onBindAgent:e.onBindAgent,onSave:e.onSaveBindings,onLoadConfig:e.onLoadConfig,formMode:e.configFormMode}}function M1(e){const t=e.nodes.length>0,n=e.defaultBinding??"";return f`
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
            `:S}

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
                  ${t?S:f`
                          <div class="muted">No nodes with system.run available.</div>
                        `}
                </div>
              </div>

              ${e.agents.length===0?f`
                      <div class="muted">No agents found.</div>
                    `:e.agents.map(i=>P1(i,e))}
            </div>
          `:f`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load config to edit bindings.</div>
            <button class="btn" ?disabled=${e.configLoading} @click=${e.onLoadConfig}>
              ${e.configLoading?"Loading…":"Load config"}
            </button>
          </div>`}
    </section>
  `}function P1(e,t){var o;const n=e.binding??"__default__",i=(o=e.name)!=null&&o.trim()?`${e.name} (${e.id})`:e.id,s=t.nodes.length>0;return f`
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
  `}function D1(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(a=>String(a)==="system.run"))continue;const o=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!o)continue;const r=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():o;t.push({id:o,label:r===o?o:`${r} · ${o}`})}return t.sort((n,i)=>n.label.localeCompare(i.label)),t}function I1(e){const t={id:"main",name:void 0,index:0,isDefault:!0,binding:null};if(!e||typeof e!="object")return{defaultBinding:null,agents:[t]};const i=(e.tools??{}).exec??{},s=typeof i.node=="string"&&i.node.trim()?i.node.trim():null,o=e.agents??{},r=Array.isArray(o.list)?o.list:[];if(r.length===0)return{defaultBinding:s,agents:[t]};const a=[];return r.forEach((l,c)=>{if(!l||typeof l!="object")return;const d=l,u=typeof d.id=="string"?d.id.trim():"";if(!u)return;const h=typeof d.name=="string"?d.name.trim():void 0,g=d.default===!0,b=(d.tools??{}).exec??{},y=typeof b.node=="string"&&b.node.trim()?b.node.trim():null;a.push({id:u,name:h||void 0,index:c,isDefault:g,binding:y})}),a.length===0&&a.push(t),{defaultBinding:s,agents:a}}function O1(e){const t=!!e.connected,n=!!e.paired,i=typeof e.displayName=="string"&&e.displayName.trim()||(typeof e.nodeId=="string"?e.nodeId:"unknown"),s=Array.isArray(e.caps)?e.caps:[],o=Array.isArray(e.commands)?e.commands:[];return f`
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
  `}function F1(e){return e.reportDetailLoading?f`<div class="muted">${p("agents.reports.detailLoading")}</div>`:e.reportDetail?e.reportDetail.report_md?f`
    <div style="display: flex; justify-content: flex-end; margin-bottom: 8px;">
      <button class="btn btn--sm primary" @click=${e.onCopy}>
        ${e.reportsCopyJustDone?p("agents.reports.copiedBtn"):p("agents.reports.copyBtn")}
      </button>
    </div>
    <pre
      style="white-space: pre-wrap; word-break: break-word; font-size: 13px; line-height: 1.55; background: var(--surface-2); padding: 12px; border-radius: 8px;"
    >${e.reportDetail.report_md}</pre>
  `:f`
      <div class="callout info">
        <div>${p("agents.reports.detailNoMd")}</div>
        <div style="margin-top: 8px;">
          <button class="btn btn--sm" @click=${()=>e.onReformat(e.reportDetail.id)}>
            ${p("agents.reports.reformatBtn")}
          </button>
        </div>
      </div>
    `:f`<div class="muted">${p("agents.reports.detailEmpty")}</div>`}function N1(e){return f`
    <section class="card" style="padding: 0; overflow: hidden;">
      <div style="display: grid; grid-template-columns: minmax(280px, 34%) 1fr; min-height: 520px;">
        <div style="border-right: 1px solid var(--border); display: flex; flex-direction: column;">
          <div style="padding: 12px; border-bottom: 1px solid var(--border);">
            <label class="field" style="margin-bottom: 8px;">
              <span>${p("agents.reports.tokenLabel")}</span>
              <input
                .value=${e.reportsAdminToken}
                placeholder="x-reports-token"
                @input=${t=>e.onTokenChange(t.target.value)}
              />
            </label>
            <div class="row" style="gap: 8px; flex-wrap: wrap; align-items: center;">
              <button class="btn btn--sm" ?disabled=${e.reportsLoading} @click=${e.onRefresh}>
                ${e.reportsLoading?p("common.loading"):p("common.refresh")}
              </button>
            </div>
            <div style="margin-top: 10px;">
              <div class="label" style="font-size: 12px; margin-bottom: 6px;">${p("agents.reports.tasks")}</div>
              ${e.reportsTasks.length===0?f`<div class="muted" style="font-size: 13px;">${p("agents.reports.noTasks")}</div>`:f`
                      <div style="display: flex; flex-direction: column; gap: 8px;">
                        ${e.reportsTasks.map(t=>f`
                            <div
                              class="row"
                              style="justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap;"
                            >
                              <span style="font-size: 13px;"
                                >${t.title}
                                <span class="mono" style="opacity: 0.85;">(${t.task_key})</span></span
                              >
                              <button
                                class="btn btn--sm primary"
                                ?disabled=${e.reportsLoading}
                                @click=${()=>e.onRun(t.task_key)}
                              >
                                ${p("agents.reports.run")}
                              </button>
                            </div>
                          `)}
                      </div>
                    `}
            </div>
            ${e.reportsError?f`<div class="callout danger" style="margin-top: 8px;">${e.reportsError}</div>`:S}
          </div>
          <div class="list" style="padding: 8px; overflow: auto;">
            ${e.reportsRecords.length===0?f`<div class="muted">${p("agents.reports.noRecords")}</div>`:e.reportsRecords.map(t=>{var r;const n=t.id===e.selectedRecordId,i=t.summary_json??{},s=Number(i.total_order_count??0),o=Number(i.total_sales_amount??0);return f`
                    <button
                      class="list-item"
                      style="text-align: left; width: 100%; border: 1px solid var(--border); margin-bottom: 8px; background: ${n?"var(--accent-soft)":"var(--surface-1)"};"
                      @click=${()=>e.onSelectRecord(t.id)}
                    >
                      <div class="list-title">#${t.id} <span class="mono">${t.task_key}</span></div>
                      <div class="list-sub">
                        ${((r=t.started_at)==null?void 0:r.slice(0,19))??"-"} | ${t.status}
                      </div>
                      <div class="list-sub">
                        ${s} · Rp ${Number.isFinite(o)?o.toLocaleString():"0"}
                      </div>
                    </button>
                  `})}
          </div>
        </div>
        <div style="padding: 12px; overflow: auto;">${F1(e)}</div>
      </div>
    </section>
  `}/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */function ns(e){return e+.5|0}const Pt=(e,t,n)=>Math.max(Math.min(e,n),t);function xi(e){return Pt(ns(e*2.55),0,255)}function Ht(e){return Pt(ns(e*255),0,255)}function Ct(e){return Pt(ns(e/2.55)/100,0,1)}function yd(e){return Pt(ns(e*100),0,100)}const Ke={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},la=[..."0123456789ABCDEF"],B1=e=>la[e&15],z1=e=>la[(e&240)>>4]+la[e&15],ks=e=>(e&240)>>4===(e&15),H1=e=>ks(e.r)&&ks(e.g)&&ks(e.b)&&ks(e.a);function U1(e){var t=e.length,n;return e[0]==="#"&&(t===4||t===5?n={r:255&Ke[e[1]]*17,g:255&Ke[e[2]]*17,b:255&Ke[e[3]]*17,a:t===5?Ke[e[4]]*17:255}:(t===7||t===9)&&(n={r:Ke[e[1]]<<4|Ke[e[2]],g:Ke[e[3]]<<4|Ke[e[4]],b:Ke[e[5]]<<4|Ke[e[6]],a:t===9?Ke[e[7]]<<4|Ke[e[8]]:255})),n}const j1=(e,t)=>e<255?t(e):"";function q1(e){var t=H1(e)?B1:z1;return e?"#"+t(e.r)+t(e.g)+t(e.b)+j1(e.a,t):void 0}const K1=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function Lf(e,t,n){const i=t*Math.min(n,1-n),s=(o,r=(o+e/30)%12)=>n-i*Math.max(Math.min(r-3,9-r,1),-1);return[s(0),s(8),s(4)]}function W1(e,t,n){const i=(s,o=(s+e/60)%6)=>n-n*t*Math.max(Math.min(o,4-o,1),0);return[i(5),i(3),i(1)]}function V1(e,t,n){const i=Lf(e,1,.5);let s;for(t+n>1&&(s=1/(t+n),t*=s,n*=s),s=0;s<3;s++)i[s]*=1-t-n,i[s]+=t;return i}function G1(e,t,n,i,s){return e===s?(t-n)/i+(t<n?6:0):t===s?(n-e)/i+2:(e-t)/i+4}function hl(e){const n=e.r/255,i=e.g/255,s=e.b/255,o=Math.max(n,i,s),r=Math.min(n,i,s),a=(o+r)/2;let l,c,d;return o!==r&&(d=o-r,c=a>.5?d/(2-o-r):d/(o+r),l=G1(n,i,s,d,o),l=l*60+.5),[l|0,c||0,a]}function fl(e,t,n,i){return(Array.isArray(t)?e(t[0],t[1],t[2]):e(t,n,i)).map(Ht)}function pl(e,t,n){return fl(Lf,e,t,n)}function Q1(e,t,n){return fl(V1,e,t,n)}function Y1(e,t,n){return fl(W1,e,t,n)}function Mf(e){return(e%360+360)%360}function X1(e){const t=K1.exec(e);let n=255,i;if(!t)return;t[5]!==i&&(n=t[6]?xi(+t[5]):Ht(+t[5]));const s=Mf(+t[2]),o=+t[3]/100,r=+t[4]/100;return t[1]==="hwb"?i=Q1(s,o,r):t[1]==="hsv"?i=Y1(s,o,r):i=pl(s,o,r),{r:i[0],g:i[1],b:i[2],a:n}}function J1(e,t){var n=hl(e);n[0]=Mf(n[0]+t),n=pl(n),e.r=n[0],e.g=n[1],e.b=n[2]}function Z1(e){if(!e)return;const t=hl(e),n=t[0],i=yd(t[1]),s=yd(t[2]);return e.a<255?`hsla(${n}, ${i}%, ${s}%, ${Ct(e.a)})`:`hsl(${n}, ${i}%, ${s}%)`}const bd={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},wd={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function e_(){const e={},t=Object.keys(wd),n=Object.keys(bd);let i,s,o,r,a;for(i=0;i<t.length;i++){for(r=a=t[i],s=0;s<n.length;s++)o=n[s],a=a.replace(o,bd[o]);o=parseInt(wd[r],16),e[a]=[o>>16&255,o>>8&255,o&255]}return e}let $s;function t_(e){$s||($s=e_(),$s.transparent=[0,0,0,0]);const t=$s[e.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}const n_=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function i_(e){const t=n_.exec(e);let n=255,i,s,o;if(t){if(t[7]!==i){const r=+t[7];n=t[8]?xi(r):Pt(r*255,0,255)}return i=+t[1],s=+t[3],o=+t[5],i=255&(t[2]?xi(i):Pt(i,0,255)),s=255&(t[4]?xi(s):Pt(s,0,255)),o=255&(t[6]?xi(o):Pt(o,0,255)),{r:i,g:s,b:o,a:n}}}function s_(e){return e&&(e.a<255?`rgba(${e.r}, ${e.g}, ${e.b}, ${Ct(e.a)})`:`rgb(${e.r}, ${e.g}, ${e.b})`)}const _r=e=>e<=.0031308?e*12.92:Math.pow(e,1/2.4)*1.055-.055,Fn=e=>e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4);function o_(e,t,n){const i=Fn(Ct(e.r)),s=Fn(Ct(e.g)),o=Fn(Ct(e.b));return{r:Ht(_r(i+n*(Fn(Ct(t.r))-i))),g:Ht(_r(s+n*(Fn(Ct(t.g))-s))),b:Ht(_r(o+n*(Fn(Ct(t.b))-o))),a:e.a+n*(t.a-e.a)}}function Ss(e,t,n){if(e){let i=hl(e);i[t]=Math.max(0,Math.min(i[t]+i[t]*n,t===0?360:1)),i=pl(i),e.r=i[0],e.g=i[1],e.b=i[2]}}function Pf(e,t){return e&&Object.assign(t||{},e)}function xd(e){var t={r:0,g:0,b:0,a:255};return Array.isArray(e)?e.length>=3&&(t={r:e[0],g:e[1],b:e[2],a:255},e.length>3&&(t.a=Ht(e[3]))):(t=Pf(e,{r:0,g:0,b:0,a:1}),t.a=Ht(t.a)),t}function r_(e){return e.charAt(0)==="r"?i_(e):X1(e)}class Ki{constructor(t){if(t instanceof Ki)return t;const n=typeof t;let i;n==="object"?i=xd(t):n==="string"&&(i=U1(t)||t_(t)||r_(t)),this._rgb=i,this._valid=!!i}get valid(){return this._valid}get rgb(){var t=Pf(this._rgb);return t&&(t.a=Ct(t.a)),t}set rgb(t){this._rgb=xd(t)}rgbString(){return this._valid?s_(this._rgb):void 0}hexString(){return this._valid?q1(this._rgb):void 0}hslString(){return this._valid?Z1(this._rgb):void 0}mix(t,n){if(t){const i=this.rgb,s=t.rgb;let o;const r=n===o?.5:n,a=2*r-1,l=i.a-s.a,c=((a*l===-1?a:(a+l)/(1+a*l))+1)/2;o=1-c,i.r=255&c*i.r+o*s.r+.5,i.g=255&c*i.g+o*s.g+.5,i.b=255&c*i.b+o*s.b+.5,i.a=r*i.a+(1-r)*s.a,this.rgb=i}return this}interpolate(t,n){return t&&(this._rgb=o_(this._rgb,t._rgb,n)),this}clone(){return new Ki(this.rgb)}alpha(t){return this._rgb.a=Ht(t),this}clearer(t){const n=this._rgb;return n.a*=1-t,this}greyscale(){const t=this._rgb,n=ns(t.r*.3+t.g*.59+t.b*.11);return t.r=t.g=t.b=n,this}opaquer(t){const n=this._rgb;return n.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return Ss(this._rgb,2,t),this}darken(t){return Ss(this._rgb,2,-t),this}saturate(t){return Ss(this._rgb,1,t),this}desaturate(t){return Ss(this._rgb,1,-t),this}rotate(t){return J1(this._rgb,t),this}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */function $t(){}const a_=(()=>{let e=0;return()=>e++})();function ce(e){return e==null}function ke(e){if(Array.isArray&&Array.isArray(e))return!0;const t=Object.prototype.toString.call(e);return t.slice(0,7)==="[object"&&t.slice(-6)==="Array]"}function Z(e){return e!==null&&Object.prototype.toString.call(e)==="[object Object]"}function Me(e){return(typeof e=="number"||e instanceof Number)&&isFinite(+e)}function lt(e,t){return Me(e)?e:t}function X(e,t){return typeof e>"u"?t:e}const l_=(e,t)=>typeof e=="string"&&e.endsWith("%")?parseFloat(e)/100*t:+e;function ue(e,t,n){if(e&&typeof e.call=="function")return e.apply(n,t)}function re(e,t,n,i){let s,o,r;if(ke(e))for(o=e.length,s=0;s<o;s++)t.call(n,e[s],s);else if(Z(e))for(r=Object.keys(e),o=r.length,s=0;s<o;s++)t.call(n,e[r[s]],r[s])}function oo(e,t){let n,i,s,o;if(!e||!t||e.length!==t.length)return!1;for(n=0,i=e.length;n<i;++n)if(s=e[n],o=t[n],s.datasetIndex!==o.datasetIndex||s.index!==o.index)return!1;return!0}function ro(e){if(ke(e))return e.map(ro);if(Z(e)){const t=Object.create(null),n=Object.keys(e),i=n.length;let s=0;for(;s<i;++s)t[n[s]]=ro(e[n[s]]);return t}return e}function Df(e){return["__proto__","prototype","constructor"].indexOf(e)===-1}function c_(e,t,n,i){if(!Df(e))return;const s=t[e],o=n[e];Z(s)&&Z(o)?Wi(s,o,i):t[e]=ro(o)}function Wi(e,t,n){const i=ke(t)?t:[t],s=i.length;if(!Z(e))return e;n=n||{};const o=n.merger||c_;let r;for(let a=0;a<s;++a){if(r=i[a],!Z(r))continue;const l=Object.keys(r);for(let c=0,d=l.length;c<d;++c)o(l[c],e,r,n)}return e}function Mi(e,t){return Wi(e,t,{merger:d_})}function d_(e,t,n){if(!Df(e))return;const i=t[e],s=n[e];Z(i)&&Z(s)?Mi(i,s):Object.prototype.hasOwnProperty.call(t,e)||(t[e]=ro(s))}const _d={"":e=>e,x:e=>e.x,y:e=>e.y};function u_(e){const t=e.split("."),n=[];let i="";for(const s of t)i+=s,i.endsWith("\\")?i=i.slice(0,-1)+".":(n.push(i),i="");return n}function h_(e){const t=u_(e);return n=>{for(const i of t){if(i==="")break;n=n&&n[i]}return n}}function ao(e,t){return(_d[t]||(_d[t]=h_(t)))(e)}function gl(e){return e.charAt(0).toUpperCase()+e.slice(1)}const lo=e=>typeof e<"u",qt=e=>typeof e=="function",kd=(e,t)=>{if(e.size!==t.size)return!1;for(const n of e)if(!t.has(n))return!1;return!0};function f_(e){return e.type==="mouseup"||e.type==="click"||e.type==="contextmenu"}const Re=Math.PI,nt=2*Re,p_=nt+Re,co=Number.POSITIVE_INFINITY,g_=Re/180,tt=Re/2,tn=Re/4,$d=Re*2/3,If=Math.log10,Xn=Math.sign;function Pi(e,t,n){return Math.abs(e-t)<n}function Sd(e){const t=Math.round(e);e=Pi(e,t,e/1e3)?t:e;const n=Math.pow(10,Math.floor(If(e))),i=e/n;return(i<=1?1:i<=2?2:i<=5?5:10)*n}function m_(e){const t=[],n=Math.sqrt(e);let i;for(i=1;i<n;i++)e%i===0&&(t.push(i),t.push(e/i));return n===(n|0)&&t.push(n),t.sort((s,o)=>s-o).pop(),t}function v_(e){return typeof e=="symbol"||typeof e=="object"&&e!==null&&!(Symbol.toPrimitive in e||"toString"in e||"valueOf"in e)}function Vi(e){return!v_(e)&&!isNaN(parseFloat(e))&&isFinite(e)}function y_(e,t){const n=Math.round(e);return n-t<=e&&n+t>=e}function b_(e,t,n){let i,s,o;for(i=0,s=e.length;i<s;i++)o=e[i][n],isNaN(o)||(t.min=Math.min(t.min,o),t.max=Math.max(t.max,o))}function un(e){return e*(Re/180)}function w_(e){return e*(180/Re)}function Ad(e){if(!Me(e))return;let t=1,n=0;for(;Math.round(e*t)/t!==e;)t*=10,n++;return n}function x_(e,t){const n=t.x-e.x,i=t.y-e.y,s=Math.sqrt(n*n+i*i);let o=Math.atan2(i,n);return o<-.5*Re&&(o+=nt),{angle:o,distance:s}}function ca(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function __(e,t){return(e-t+p_)%nt-Re}function pt(e){return(e%nt+nt)%nt}function Of(e,t,n,i){const s=pt(e),o=pt(t),r=pt(n),a=pt(o-s),l=pt(r-s),c=pt(s-o),d=pt(s-r);return s===o||s===r||i&&o===r||a>l&&c<d}function We(e,t,n){return Math.max(t,Math.min(n,e))}function k_(e){return We(e,-32768,32767)}function Hn(e,t,n,i=1e-6){return e>=Math.min(t,n)-i&&e<=Math.max(t,n)+i}function ml(e,t,n){n=n||(r=>e[r]<t);let i=e.length-1,s=0,o;for(;i-s>1;)o=s+i>>1,n(o)?s=o:i=o;return{lo:s,hi:i}}const hn=(e,t,n,i)=>ml(e,n,i?s=>{const o=e[s][t];return o<n||o===n&&e[s+1][t]===n}:s=>e[s][t]<n),$_=(e,t,n)=>ml(e,n,i=>e[i][t]>=n);function S_(e,t,n){let i=0,s=e.length;for(;i<s&&e[i]<t;)i++;for(;s>i&&e[s-1]>n;)s--;return i>0||s<e.length?e.slice(i,s):e}const Ff=["push","pop","shift","splice","unshift"];function A_(e,t){if(e._chartjs){e._chartjs.listeners.push(t);return}Object.defineProperty(e,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),Ff.forEach(n=>{const i="_onData"+gl(n),s=e[n];Object.defineProperty(e,n,{configurable:!0,enumerable:!1,value(...o){const r=s.apply(this,o);return e._chartjs.listeners.forEach(a=>{typeof a[i]=="function"&&a[i](...o)}),r}})})}function Td(e,t){const n=e._chartjs;if(!n)return;const i=n.listeners,s=i.indexOf(t);s!==-1&&i.splice(s,1),!(i.length>0)&&(Ff.forEach(o=>{delete e[o]}),delete e._chartjs)}function T_(e){const t=new Set(e);return t.size===e.length?e:Array.from(t)}const Nf=(function(){return typeof window>"u"?function(e){return e()}:window.requestAnimationFrame})();function Bf(e,t){let n=[],i=!1;return function(...s){n=s,i||(i=!0,Nf.call(window,()=>{i=!1,e.apply(t,n)}))}}function C_(e,t){let n;return function(...i){return t?(clearTimeout(n),n=setTimeout(e,t,i)):e.apply(this,i),t}}const zf=e=>e==="start"?"left":e==="end"?"right":"center",je=(e,t,n)=>e==="start"?t:e==="end"?n:(t+n)/2,E_=(e,t,n,i)=>e===(i?"left":"right")?n:e==="center"?(t+n)/2:t;function R_(e,t,n){const i=t.length;let s=0,o=i;if(e._sorted){const{iScale:r,vScale:a,_parsed:l}=e,c=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null,d=r.axis,{min:u,max:h,minDefined:g,maxDefined:v}=r.getUserBounds();if(g){if(s=Math.min(hn(l,d,u).lo,n?i:hn(t,d,r.getPixelForValue(u)).lo),c){const b=l.slice(0,s+1).reverse().findIndex(y=>!ce(y[a.axis]));s-=Math.max(0,b)}s=We(s,0,i-1)}if(v){let b=Math.max(hn(l,r.axis,h,!0).hi+1,n?0:hn(t,d,r.getPixelForValue(h),!0).hi+1);if(c){const y=l.slice(b-1).findIndex(A=>!ce(A[a.axis]));b+=Math.max(0,y)}o=We(b,s,i)-s}else o=i-s}return{start:s,count:o}}function L_(e){const{xScale:t,yScale:n,_scaleRanges:i}=e,s={xmin:t.min,xmax:t.max,ymin:n.min,ymax:n.max};if(!i)return e._scaleRanges=s,!0;const o=i.xmin!==t.min||i.xmax!==t.max||i.ymin!==n.min||i.ymax!==n.max;return Object.assign(i,s),o}const As=e=>e===0||e===1,Cd=(e,t,n)=>-(Math.pow(2,10*(e-=1))*Math.sin((e-t)*nt/n)),Ed=(e,t,n)=>Math.pow(2,-10*e)*Math.sin((e-t)*nt/n)+1,Di={linear:e=>e,easeInQuad:e=>e*e,easeOutQuad:e=>-e*(e-2),easeInOutQuad:e=>(e/=.5)<1?.5*e*e:-.5*(--e*(e-2)-1),easeInCubic:e=>e*e*e,easeOutCubic:e=>(e-=1)*e*e+1,easeInOutCubic:e=>(e/=.5)<1?.5*e*e*e:.5*((e-=2)*e*e+2),easeInQuart:e=>e*e*e*e,easeOutQuart:e=>-((e-=1)*e*e*e-1),easeInOutQuart:e=>(e/=.5)<1?.5*e*e*e*e:-.5*((e-=2)*e*e*e-2),easeInQuint:e=>e*e*e*e*e,easeOutQuint:e=>(e-=1)*e*e*e*e+1,easeInOutQuint:e=>(e/=.5)<1?.5*e*e*e*e*e:.5*((e-=2)*e*e*e*e+2),easeInSine:e=>-Math.cos(e*tt)+1,easeOutSine:e=>Math.sin(e*tt),easeInOutSine:e=>-.5*(Math.cos(Re*e)-1),easeInExpo:e=>e===0?0:Math.pow(2,10*(e-1)),easeOutExpo:e=>e===1?1:-Math.pow(2,-10*e)+1,easeInOutExpo:e=>As(e)?e:e<.5?.5*Math.pow(2,10*(e*2-1)):.5*(-Math.pow(2,-10*(e*2-1))+2),easeInCirc:e=>e>=1?e:-(Math.sqrt(1-e*e)-1),easeOutCirc:e=>Math.sqrt(1-(e-=1)*e),easeInOutCirc:e=>(e/=.5)<1?-.5*(Math.sqrt(1-e*e)-1):.5*(Math.sqrt(1-(e-=2)*e)+1),easeInElastic:e=>As(e)?e:Cd(e,.075,.3),easeOutElastic:e=>As(e)?e:Ed(e,.075,.3),easeInOutElastic(e){return As(e)?e:e<.5?.5*Cd(e*2,.1125,.45):.5+.5*Ed(e*2-1,.1125,.45)},easeInBack(e){return e*e*((1.70158+1)*e-1.70158)},easeOutBack(e){return(e-=1)*e*((1.70158+1)*e+1.70158)+1},easeInOutBack(e){let t=1.70158;return(e/=.5)<1?.5*(e*e*(((t*=1.525)+1)*e-t)):.5*((e-=2)*e*(((t*=1.525)+1)*e+t)+2)},easeInBounce:e=>1-Di.easeOutBounce(1-e),easeOutBounce(e){return e<1/2.75?7.5625*e*e:e<2/2.75?7.5625*(e-=1.5/2.75)*e+.75:e<2.5/2.75?7.5625*(e-=2.25/2.75)*e+.9375:7.5625*(e-=2.625/2.75)*e+.984375},easeInOutBounce:e=>e<.5?Di.easeInBounce(e*2)*.5:Di.easeOutBounce(e*2-1)*.5+.5};function vl(e){if(e&&typeof e=="object"){const t=e.toString();return t==="[object CanvasPattern]"||t==="[object CanvasGradient]"}return!1}function Rd(e){return vl(e)?e:new Ki(e)}function kr(e){return vl(e)?e:new Ki(e).saturate(.5).darken(.1).hexString()}const M_=["x","y","borderWidth","radius","tension"],P_=["color","borderColor","backgroundColor"];function D_(e){e.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),e.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>t!=="onProgress"&&t!=="onComplete"&&t!=="fn"}),e.set("animations",{colors:{type:"color",properties:P_},numbers:{type:"number",properties:M_}}),e.describe("animations",{_fallback:"animation"}),e.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>t|0}}}})}function I_(e){e.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const Ld=new Map;function O_(e,t){t=t||{};const n=e+JSON.stringify(t);let i=Ld.get(n);return i||(i=new Intl.NumberFormat(e,t),Ld.set(n,i)),i}function Hf(e,t,n){return O_(t,n).format(e)}const F_={values(e){return ke(e)?e:""+e},numeric(e,t,n){if(e===0)return"0";const i=this.chart.options.locale;let s,o=e;if(n.length>1){const c=Math.max(Math.abs(n[0].value),Math.abs(n[n.length-1].value));(c<1e-4||c>1e15)&&(s="scientific"),o=N_(e,n)}const r=If(Math.abs(o)),a=isNaN(r)?1:Math.max(Math.min(-1*Math.floor(r),20),0),l={notation:s,minimumFractionDigits:a,maximumFractionDigits:a};return Object.assign(l,this.options.ticks.format),Hf(e,i,l)}};function N_(e,t){let n=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(n)>=1&&e!==Math.floor(e)&&(n=e-Math.floor(e)),n}var Uf={formatters:F_};function B_(e){e.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,n)=>n.lineWidth,tickColor:(t,n)=>n.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:Uf.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),e.route("scale.ticks","color","","color"),e.route("scale.grid","color","","borderColor"),e.route("scale.border","color","","borderColor"),e.route("scale.title","color","","color"),e.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&t!=="callback"&&t!=="parser",_indexable:t=>t!=="borderDash"&&t!=="tickBorderDash"&&t!=="dash"}),e.describe("scales",{_fallback:"scale"}),e.describe("scale.ticks",{_scriptable:t=>t!=="backdropPadding"&&t!=="callback",_indexable:t=>t!=="backdropPadding"})}const An=Object.create(null),da=Object.create(null);function Ii(e,t){if(!t)return e;const n=t.split(".");for(let i=0,s=n.length;i<s;++i){const o=n[i];e=e[o]||(e[o]=Object.create(null))}return e}function $r(e,t,n){return typeof t=="string"?Wi(Ii(e,t),n):Wi(Ii(e,""),t)}class z_{constructor(t,n){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=i=>i.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(i,s)=>kr(s.backgroundColor),this.hoverBorderColor=(i,s)=>kr(s.borderColor),this.hoverColor=(i,s)=>kr(s.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(n)}set(t,n){return $r(this,t,n)}get(t){return Ii(this,t)}describe(t,n){return $r(da,t,n)}override(t,n){return $r(An,t,n)}route(t,n,i,s){const o=Ii(this,t),r=Ii(this,i),a="_"+n;Object.defineProperties(o,{[a]:{value:o[n],writable:!0},[n]:{enumerable:!0,get(){const l=this[a],c=r[s];return Z(l)?Object.assign({},c,l):X(l,c)},set(l){this[a]=l}}})}apply(t){t.forEach(n=>n(this))}}var me=new z_({_scriptable:e=>!e.startsWith("on"),_indexable:e=>e!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[D_,I_,B_]);function H_(e){return!e||ce(e.size)||ce(e.family)?null:(e.style?e.style+" ":"")+(e.weight?e.weight+" ":"")+e.size+"px "+e.family}function Md(e,t,n,i,s){let o=t[s];return o||(o=t[s]=e.measureText(s).width,n.push(s)),o>i&&(i=o),i}function nn(e,t,n){const i=e.currentDevicePixelRatio,s=n!==0?Math.max(n/2,.5):0;return Math.round((t-s)*i)/i+s}function Pd(e,t){!t&&!e||(t=t||e.getContext("2d"),t.save(),t.resetTransform(),t.clearRect(0,0,e.width,e.height),t.restore())}function ua(e,t,n,i){jf(e,t,n,i,null)}function jf(e,t,n,i,s){let o,r,a,l,c,d,u,h;const g=t.pointStyle,v=t.rotation,b=t.radius;let y=(v||0)*g_;if(g&&typeof g=="object"&&(o=g.toString(),o==="[object HTMLImageElement]"||o==="[object HTMLCanvasElement]")){e.save(),e.translate(n,i),e.rotate(y),e.drawImage(g,-g.width/2,-g.height/2,g.width,g.height),e.restore();return}if(!(isNaN(b)||b<=0)){switch(e.beginPath(),g){default:s?e.ellipse(n,i,s/2,b,0,0,nt):e.arc(n,i,b,0,nt),e.closePath();break;case"triangle":d=s?s/2:b,e.moveTo(n+Math.sin(y)*d,i-Math.cos(y)*b),y+=$d,e.lineTo(n+Math.sin(y)*d,i-Math.cos(y)*b),y+=$d,e.lineTo(n+Math.sin(y)*d,i-Math.cos(y)*b),e.closePath();break;case"rectRounded":c=b*.516,l=b-c,r=Math.cos(y+tn)*l,u=Math.cos(y+tn)*(s?s/2-c:l),a=Math.sin(y+tn)*l,h=Math.sin(y+tn)*(s?s/2-c:l),e.arc(n-u,i-a,c,y-Re,y-tt),e.arc(n+h,i-r,c,y-tt,y),e.arc(n+u,i+a,c,y,y+tt),e.arc(n-h,i+r,c,y+tt,y+Re),e.closePath();break;case"rect":if(!v){l=Math.SQRT1_2*b,d=s?s/2:l,e.rect(n-d,i-l,2*d,2*l);break}y+=tn;case"rectRot":u=Math.cos(y)*(s?s/2:b),r=Math.cos(y)*b,a=Math.sin(y)*b,h=Math.sin(y)*(s?s/2:b),e.moveTo(n-u,i-a),e.lineTo(n+h,i-r),e.lineTo(n+u,i+a),e.lineTo(n-h,i+r),e.closePath();break;case"crossRot":y+=tn;case"cross":u=Math.cos(y)*(s?s/2:b),r=Math.cos(y)*b,a=Math.sin(y)*b,h=Math.sin(y)*(s?s/2:b),e.moveTo(n-u,i-a),e.lineTo(n+u,i+a),e.moveTo(n+h,i-r),e.lineTo(n-h,i+r);break;case"star":u=Math.cos(y)*(s?s/2:b),r=Math.cos(y)*b,a=Math.sin(y)*b,h=Math.sin(y)*(s?s/2:b),e.moveTo(n-u,i-a),e.lineTo(n+u,i+a),e.moveTo(n+h,i-r),e.lineTo(n-h,i+r),y+=tn,u=Math.cos(y)*(s?s/2:b),r=Math.cos(y)*b,a=Math.sin(y)*b,h=Math.sin(y)*(s?s/2:b),e.moveTo(n-u,i-a),e.lineTo(n+u,i+a),e.moveTo(n+h,i-r),e.lineTo(n-h,i+r);break;case"line":r=s?s/2:Math.cos(y)*b,a=Math.sin(y)*b,e.moveTo(n-r,i-a),e.lineTo(n+r,i+a);break;case"dash":e.moveTo(n,i),e.lineTo(n+Math.cos(y)*(s?s/2:b),i+Math.sin(y)*b);break;case!1:e.closePath();break}e.fill(),t.borderWidth>0&&e.stroke()}}function Gi(e,t,n){return n=n||.5,!t||e&&e.x>t.left-n&&e.x<t.right+n&&e.y>t.top-n&&e.y<t.bottom+n}function Po(e,t){e.save(),e.beginPath(),e.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),e.clip()}function Do(e){e.restore()}function U_(e,t,n,i,s){if(!t)return e.lineTo(n.x,n.y);if(s==="middle"){const o=(t.x+n.x)/2;e.lineTo(o,t.y),e.lineTo(o,n.y)}else s==="after"!=!!i?e.lineTo(t.x,n.y):e.lineTo(n.x,t.y);e.lineTo(n.x,n.y)}function j_(e,t,n,i){if(!t)return e.lineTo(n.x,n.y);e.bezierCurveTo(i?t.cp1x:t.cp2x,i?t.cp1y:t.cp2y,i?n.cp2x:n.cp1x,i?n.cp2y:n.cp1y,n.x,n.y)}function q_(e,t){t.translation&&e.translate(t.translation[0],t.translation[1]),ce(t.rotation)||e.rotate(t.rotation),t.color&&(e.fillStyle=t.color),t.textAlign&&(e.textAlign=t.textAlign),t.textBaseline&&(e.textBaseline=t.textBaseline)}function K_(e,t,n,i,s){if(s.strikethrough||s.underline){const o=e.measureText(i),r=t-o.actualBoundingBoxLeft,a=t+o.actualBoundingBoxRight,l=n-o.actualBoundingBoxAscent,c=n+o.actualBoundingBoxDescent,d=s.strikethrough?(l+c)/2:c;e.strokeStyle=e.fillStyle,e.beginPath(),e.lineWidth=s.decorationWidth||2,e.moveTo(r,d),e.lineTo(a,d),e.stroke()}}function W_(e,t){const n=e.fillStyle;e.fillStyle=t.color,e.fillRect(t.left,t.top,t.width,t.height),e.fillStyle=n}function uo(e,t,n,i,s,o={}){const r=ke(t)?t:[t],a=o.strokeWidth>0&&o.strokeColor!=="";let l,c;for(e.save(),e.font=s.string,q_(e,o),l=0;l<r.length;++l)c=r[l],o.backdrop&&W_(e,o.backdrop),a&&(o.strokeColor&&(e.strokeStyle=o.strokeColor),ce(o.strokeWidth)||(e.lineWidth=o.strokeWidth),e.strokeText(c,n,i,o.maxWidth)),e.fillText(c,n,i,o.maxWidth),K_(e,n,i,c,o),i+=Number(s.lineHeight);e.restore()}function ha(e,t){const{x:n,y:i,w:s,h:o,radius:r}=t;e.arc(n+r.topLeft,i+r.topLeft,r.topLeft,1.5*Re,Re,!0),e.lineTo(n,i+o-r.bottomLeft),e.arc(n+r.bottomLeft,i+o-r.bottomLeft,r.bottomLeft,Re,tt,!0),e.lineTo(n+s-r.bottomRight,i+o),e.arc(n+s-r.bottomRight,i+o-r.bottomRight,r.bottomRight,tt,0,!0),e.lineTo(n+s,i+r.topRight),e.arc(n+s-r.topRight,i+r.topRight,r.topRight,0,-tt,!0),e.lineTo(n+r.topLeft,i)}const V_=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,G_=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function Q_(e,t){const n=(""+e).match(V_);if(!n||n[1]==="normal")return t*1.2;switch(e=+n[2],n[3]){case"px":return e;case"%":e/=100;break}return t*e}const Y_=e=>+e||0;function qf(e,t){const n={},i=Z(t),s=i?Object.keys(t):t,o=Z(e)?i?r=>X(e[r],e[t[r]]):r=>e[r]:()=>e;for(const r of s)n[r]=Y_(o(r));return n}function X_(e){return qf(e,{top:"y",right:"x",bottom:"y",left:"x"})}function Oi(e){return qf(e,["topLeft","topRight","bottomLeft","bottomRight"])}function st(e){const t=X_(e);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function Ue(e,t){e=e||{},t=t||me.font;let n=X(e.size,t.size);typeof n=="string"&&(n=parseInt(n,10));let i=X(e.style,t.style);i&&!(""+i).match(G_)&&(console.warn('Invalid font style specified: "'+i+'"'),i=void 0);const s={family:X(e.family,t.family),lineHeight:Q_(X(e.lineHeight,t.lineHeight),n),size:n,style:i,weight:X(e.weight,t.weight),string:""};return s.string=H_(s),s}function Ts(e,t,n,i){let s,o,r;for(s=0,o=e.length;s<o;++s)if(r=e[s],r!==void 0&&r!==void 0)return r}function J_(e,t,n){const{min:i,max:s}=e,o=l_(t,(s-i)/2),r=(a,l)=>n&&a===0?0:a+l;return{min:r(i,-Math.abs(o)),max:r(s,o)}}function Rn(e,t){return Object.assign(Object.create(e),t)}function yl(e,t=[""],n,i,s=()=>e[0]){const o=n||e;typeof i>"u"&&(i=Gf("_fallback",e));const r={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:e,_rootScopes:o,_fallback:i,_getTarget:s,override:a=>yl([a,...e],t,o,i)};return new Proxy(r,{deleteProperty(a,l){return delete a[l],delete a._keys,delete e[0][l],!0},get(a,l){return Wf(a,l,()=>rk(l,t,e,a))},getOwnPropertyDescriptor(a,l){return Reflect.getOwnPropertyDescriptor(a._scopes[0],l)},getPrototypeOf(){return Reflect.getPrototypeOf(e[0])},has(a,l){return Id(a).includes(l)},ownKeys(a){return Id(a)},set(a,l,c){const d=a._storage||(a._storage=s());return a[l]=d[l]=c,delete a._keys,!0}})}function Jn(e,t,n,i){const s={_cacheable:!1,_proxy:e,_context:t,_subProxy:n,_stack:new Set,_descriptors:Kf(e,i),setContext:o=>Jn(e,o,n,i),override:o=>Jn(e.override(o),t,n,i)};return new Proxy(s,{deleteProperty(o,r){return delete o[r],delete e[r],!0},get(o,r,a){return Wf(o,r,()=>ek(o,r,a))},getOwnPropertyDescriptor(o,r){return o._descriptors.allKeys?Reflect.has(e,r)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(e,r)},getPrototypeOf(){return Reflect.getPrototypeOf(e)},has(o,r){return Reflect.has(e,r)},ownKeys(){return Reflect.ownKeys(e)},set(o,r,a){return e[r]=a,delete o[r],!0}})}function Kf(e,t={scriptable:!0,indexable:!0}){const{_scriptable:n=t.scriptable,_indexable:i=t.indexable,_allKeys:s=t.allKeys}=e;return{allKeys:s,scriptable:n,indexable:i,isScriptable:qt(n)?n:()=>n,isIndexable:qt(i)?i:()=>i}}const Z_=(e,t)=>e?e+gl(t):t,bl=(e,t)=>Z(t)&&e!=="adapters"&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function Wf(e,t,n){if(Object.prototype.hasOwnProperty.call(e,t)||t==="constructor")return e[t];const i=n();return e[t]=i,i}function ek(e,t,n){const{_proxy:i,_context:s,_subProxy:o,_descriptors:r}=e;let a=i[t];return qt(a)&&r.isScriptable(t)&&(a=tk(t,a,e,n)),ke(a)&&a.length&&(a=nk(t,a,e,r.isIndexable)),bl(t,a)&&(a=Jn(a,s,o&&o[t],r)),a}function tk(e,t,n,i){const{_proxy:s,_context:o,_subProxy:r,_stack:a}=n;if(a.has(e))throw new Error("Recursion detected: "+Array.from(a).join("->")+"->"+e);a.add(e);let l=t(o,r||i);return a.delete(e),bl(e,l)&&(l=wl(s._scopes,s,e,l)),l}function nk(e,t,n,i){const{_proxy:s,_context:o,_subProxy:r,_descriptors:a}=n;if(typeof o.index<"u"&&i(e))return t[o.index%t.length];if(Z(t[0])){const l=t,c=s._scopes.filter(d=>d!==l);t=[];for(const d of l){const u=wl(c,s,e,d);t.push(Jn(u,o,r&&r[e],a))}}return t}function Vf(e,t,n){return qt(e)?e(t,n):e}const ik=(e,t)=>e===!0?t:typeof e=="string"?ao(t,e):void 0;function sk(e,t,n,i,s){for(const o of t){const r=ik(n,o);if(r){e.add(r);const a=Vf(r._fallback,n,s);if(typeof a<"u"&&a!==n&&a!==i)return a}else if(r===!1&&typeof i<"u"&&n!==i)return null}return!1}function wl(e,t,n,i){const s=t._rootScopes,o=Vf(t._fallback,n,i),r=[...e,...s],a=new Set;a.add(i);let l=Dd(a,r,n,o||n,i);return l===null||typeof o<"u"&&o!==n&&(l=Dd(a,r,o,l,i),l===null)?!1:yl(Array.from(a),[""],s,o,()=>ok(t,n,i))}function Dd(e,t,n,i,s){for(;n;)n=sk(e,t,n,i,s);return n}function ok(e,t,n){const i=e._getTarget();t in i||(i[t]={});const s=i[t];return ke(s)&&Z(n)?n:s||{}}function rk(e,t,n,i){let s;for(const o of t)if(s=Gf(Z_(o,e),n),typeof s<"u")return bl(e,s)?wl(n,i,e,s):s}function Gf(e,t){for(const n of t){if(!n)continue;const i=n[e];if(typeof i<"u")return i}}function Id(e){let t=e._keys;return t||(t=e._keys=ak(e._scopes)),t}function ak(e){const t=new Set;for(const n of e)for(const i of Object.keys(n).filter(s=>!s.startsWith("_")))t.add(i);return Array.from(t)}const lk=Number.EPSILON||1e-14,Zn=(e,t)=>t<e.length&&!e[t].skip&&e[t],Qf=e=>e==="x"?"y":"x";function ck(e,t,n,i){const s=e.skip?t:e,o=t,r=n.skip?t:n,a=ca(o,s),l=ca(r,o);let c=a/(a+l),d=l/(a+l);c=isNaN(c)?0:c,d=isNaN(d)?0:d;const u=i*c,h=i*d;return{previous:{x:o.x-u*(r.x-s.x),y:o.y-u*(r.y-s.y)},next:{x:o.x+h*(r.x-s.x),y:o.y+h*(r.y-s.y)}}}function dk(e,t,n){const i=e.length;let s,o,r,a,l,c=Zn(e,0);for(let d=0;d<i-1;++d)if(l=c,c=Zn(e,d+1),!(!l||!c)){if(Pi(t[d],0,lk)){n[d]=n[d+1]=0;continue}s=n[d]/t[d],o=n[d+1]/t[d],a=Math.pow(s,2)+Math.pow(o,2),!(a<=9)&&(r=3/Math.sqrt(a),n[d]=s*r*t[d],n[d+1]=o*r*t[d])}}function uk(e,t,n="x"){const i=Qf(n),s=e.length;let o,r,a,l=Zn(e,0);for(let c=0;c<s;++c){if(r=a,a=l,l=Zn(e,c+1),!a)continue;const d=a[n],u=a[i];r&&(o=(d-r[n])/3,a[`cp1${n}`]=d-o,a[`cp1${i}`]=u-o*t[c]),l&&(o=(l[n]-d)/3,a[`cp2${n}`]=d+o,a[`cp2${i}`]=u+o*t[c])}}function hk(e,t="x"){const n=Qf(t),i=e.length,s=Array(i).fill(0),o=Array(i);let r,a,l,c=Zn(e,0);for(r=0;r<i;++r)if(a=l,l=c,c=Zn(e,r+1),!!l){if(c){const d=c[t]-l[t];s[r]=d!==0?(c[n]-l[n])/d:0}o[r]=a?c?Xn(s[r-1])!==Xn(s[r])?0:(s[r-1]+s[r])/2:s[r-1]:s[r]}dk(e,s,o),uk(e,o,t)}function Cs(e,t,n){return Math.max(Math.min(e,n),t)}function fk(e,t){let n,i,s,o,r,a=Gi(e[0],t);for(n=0,i=e.length;n<i;++n)r=o,o=a,a=n<i-1&&Gi(e[n+1],t),o&&(s=e[n],r&&(s.cp1x=Cs(s.cp1x,t.left,t.right),s.cp1y=Cs(s.cp1y,t.top,t.bottom)),a&&(s.cp2x=Cs(s.cp2x,t.left,t.right),s.cp2y=Cs(s.cp2y,t.top,t.bottom)))}function pk(e,t,n,i,s){let o,r,a,l;if(t.spanGaps&&(e=e.filter(c=>!c.skip)),t.cubicInterpolationMode==="monotone")hk(e,s);else{let c=i?e[e.length-1]:e[0];for(o=0,r=e.length;o<r;++o)a=e[o],l=ck(c,a,e[Math.min(o+1,r-(i?0:1))%r],t.tension),a.cp1x=l.previous.x,a.cp1y=l.previous.y,a.cp2x=l.next.x,a.cp2y=l.next.y,c=a}t.capBezierPoints&&fk(e,n)}function xl(){return typeof window<"u"&&typeof document<"u"}function _l(e){let t=e.parentNode;return t&&t.toString()==="[object ShadowRoot]"&&(t=t.host),t}function ho(e,t,n){let i;return typeof e=="string"?(i=parseInt(e,10),e.indexOf("%")!==-1&&(i=i/100*t.parentNode[n])):i=e,i}const Io=e=>e.ownerDocument.defaultView.getComputedStyle(e,null);function gk(e,t){return Io(e).getPropertyValue(t)}const mk=["top","right","bottom","left"];function vn(e,t,n){const i={};n=n?"-"+n:"";for(let s=0;s<4;s++){const o=mk[s];i[o]=parseFloat(e[t+"-"+o+n])||0}return i.width=i.left+i.right,i.height=i.top+i.bottom,i}const vk=(e,t,n)=>(e>0||t>0)&&(!n||!n.shadowRoot);function yk(e,t){const n=e.touches,i=n&&n.length?n[0]:e,{offsetX:s,offsetY:o}=i;let r=!1,a,l;if(vk(s,o,e.target))a=s,l=o;else{const c=t.getBoundingClientRect();a=i.clientX-c.left,l=i.clientY-c.top,r=!0}return{x:a,y:l,box:r}}function rn(e,t){if("native"in e)return e;const{canvas:n,currentDevicePixelRatio:i}=t,s=Io(n),o=s.boxSizing==="border-box",r=vn(s,"padding"),a=vn(s,"border","width"),{x:l,y:c,box:d}=yk(e,n),u=r.left+(d&&a.left),h=r.top+(d&&a.top);let{width:g,height:v}=t;return o&&(g-=r.width+a.width,v-=r.height+a.height),{x:Math.round((l-u)/g*n.width/i),y:Math.round((c-h)/v*n.height/i)}}function bk(e,t,n){let i,s;if(t===void 0||n===void 0){const o=e&&_l(e);if(!o)t=e.clientWidth,n=e.clientHeight;else{const r=o.getBoundingClientRect(),a=Io(o),l=vn(a,"border","width"),c=vn(a,"padding");t=r.width-c.width-l.width,n=r.height-c.height-l.height,i=ho(a.maxWidth,o,"clientWidth"),s=ho(a.maxHeight,o,"clientHeight")}}return{width:t,height:n,maxWidth:i||co,maxHeight:s||co}}const Dt=e=>Math.round(e*10)/10;function wk(e,t,n,i){const s=Io(e),o=vn(s,"margin"),r=ho(s.maxWidth,e,"clientWidth")||co,a=ho(s.maxHeight,e,"clientHeight")||co,l=bk(e,t,n);let{width:c,height:d}=l;if(s.boxSizing==="content-box"){const h=vn(s,"border","width"),g=vn(s,"padding");c-=g.width+h.width,d-=g.height+h.height}return c=Math.max(0,c-o.width),d=Math.max(0,i?c/i:d-o.height),c=Dt(Math.min(c,r,l.maxWidth)),d=Dt(Math.min(d,a,l.maxHeight)),c&&!d&&(d=Dt(c/2)),(t!==void 0||n!==void 0)&&i&&l.height&&d>l.height&&(d=l.height,c=Dt(Math.floor(d*i))),{width:c,height:d}}function Od(e,t,n){const i=t||1,s=Dt(e.height*i),o=Dt(e.width*i);e.height=Dt(e.height),e.width=Dt(e.width);const r=e.canvas;return r.style&&(n||!r.style.height&&!r.style.width)&&(r.style.height=`${e.height}px`,r.style.width=`${e.width}px`),e.currentDevicePixelRatio!==i||r.height!==s||r.width!==o?(e.currentDevicePixelRatio=i,r.height=s,r.width=o,e.ctx.setTransform(i,0,0,i,0,0),!0):!1}const xk=(function(){let e=!1;try{const t={get passive(){return e=!0,!1}};xl()&&(window.addEventListener("test",null,t),window.removeEventListener("test",null,t))}catch{}return e})();function Fd(e,t){const n=gk(e,t),i=n&&n.match(/^(\d+)(\.\d+)?px$/);return i?+i[1]:void 0}function an(e,t,n,i){return{x:e.x+n*(t.x-e.x),y:e.y+n*(t.y-e.y)}}function _k(e,t,n,i){return{x:e.x+n*(t.x-e.x),y:i==="middle"?n<.5?e.y:t.y:i==="after"?n<1?e.y:t.y:n>0?t.y:e.y}}function kk(e,t,n,i){const s={x:e.cp2x,y:e.cp2y},o={x:t.cp1x,y:t.cp1y},r=an(e,s,n),a=an(s,o,n),l=an(o,t,n),c=an(r,a,n),d=an(a,l,n);return an(c,d,n)}const $k=function(e,t){return{x(n){return e+e+t-n},setWidth(n){t=n},textAlign(n){return n==="center"?n:n==="right"?"left":"right"},xPlus(n,i){return n-i},leftForLtr(n,i){return n-i}}},Sk=function(){return{x(e){return e},setWidth(e){},textAlign(e){return e},xPlus(e,t){return e+t},leftForLtr(e,t){return e}}};function jn(e,t,n){return e?$k(t,n):Sk()}function Yf(e,t){let n,i;(t==="ltr"||t==="rtl")&&(n=e.canvas.style,i=[n.getPropertyValue("direction"),n.getPropertyPriority("direction")],n.setProperty("direction",t,"important"),e.prevTextDirection=i)}function Xf(e,t){t!==void 0&&(delete e.prevTextDirection,e.canvas.style.setProperty("direction",t[0],t[1]))}function Jf(e){return e==="angle"?{between:Of,compare:__,normalize:pt}:{between:Hn,compare:(t,n)=>t-n,normalize:t=>t}}function Nd({start:e,end:t,count:n,loop:i,style:s}){return{start:e%n,end:t%n,loop:i&&(t-e+1)%n===0,style:s}}function Ak(e,t,n){const{property:i,start:s,end:o}=n,{between:r,normalize:a}=Jf(i),l=t.length;let{start:c,end:d,loop:u}=e,h,g;if(u){for(c+=l,d+=l,h=0,g=l;h<g&&r(a(t[c%l][i]),s,o);++h)c--,d--;c%=l,d%=l}return d<c&&(d+=l),{start:c,end:d,loop:u,style:e.style}}function Zf(e,t,n){if(!n)return[e];const{property:i,start:s,end:o}=n,r=t.length,{compare:a,between:l,normalize:c}=Jf(i),{start:d,end:u,loop:h,style:g}=Ak(e,t,n),v=[];let b=!1,y=null,A,E,R;const k=()=>l(s,R,A)&&a(s,R)!==0,T=()=>a(o,A)===0||l(o,R,A),M=()=>b||k(),m=()=>!b||T();for(let $=d,L=d;$<=u;++$)E=t[$%r],!E.skip&&(A=c(E[i]),A!==R&&(b=l(A,s,o),y===null&&M()&&(y=a(A,s)===0?$:L),y!==null&&m()&&(v.push(Nd({start:y,end:$,loop:h,count:r,style:g})),y=null),L=$,R=A));return y!==null&&v.push(Nd({start:y,end:u,loop:h,count:r,style:g})),v}function ep(e,t){const n=[],i=e.segments;for(let s=0;s<i.length;s++){const o=Zf(i[s],e.points,t);o.length&&n.push(...o)}return n}function Tk(e,t,n,i){let s=0,o=t-1;if(n&&!i)for(;s<t&&!e[s].skip;)s++;for(;s<t&&e[s].skip;)s++;for(s%=t,n&&(o+=s);o>s&&e[o%t].skip;)o--;return o%=t,{start:s,end:o}}function Ck(e,t,n,i){const s=e.length,o=[];let r=t,a=e[t],l;for(l=t+1;l<=n;++l){const c=e[l%s];c.skip||c.stop?a.skip||(i=!1,o.push({start:t%s,end:(l-1)%s,loop:i}),t=r=c.stop?l:null):(r=l,a.skip&&(t=l)),a=c}return r!==null&&o.push({start:t%s,end:r%s,loop:i}),o}function Ek(e,t){const n=e.points,i=e.options.spanGaps,s=n.length;if(!s)return[];const o=!!e._loop,{start:r,end:a}=Tk(n,s,o,i);if(i===!0)return Bd(e,[{start:r,end:a,loop:o}],n,t);const l=a<r?a+s:a,c=!!e._fullLoop&&r===0&&a===s-1;return Bd(e,Ck(n,r,l,c),n,t)}function Bd(e,t,n,i){return!i||!i.setContext||!n?t:Rk(e,t,n,i)}function Rk(e,t,n,i){const s=e._chart.getContext(),o=zd(e.options),{_datasetIndex:r,options:{spanGaps:a}}=e,l=n.length,c=[];let d=o,u=t[0].start,h=u;function g(v,b,y,A){const E=a?-1:1;if(v!==b){for(v+=l;n[v%l].skip;)v-=E;for(;n[b%l].skip;)b+=E;v%l!==b%l&&(c.push({start:v%l,end:b%l,loop:y,style:A}),d=A,u=b%l)}}for(const v of t){u=a?u:v.start;let b=n[u%l],y;for(h=u+1;h<=v.end;h++){const A=n[h%l];y=zd(i.setContext(Rn(s,{type:"segment",p0:b,p1:A,p0DataIndex:(h-1)%l,p1DataIndex:h%l,datasetIndex:r}))),Lk(y,d)&&g(u,h-1,v.loop,d),b=A,d=y}u<h-1&&g(u,h-1,v.loop,d)}return c}function zd(e){return{backgroundColor:e.backgroundColor,borderCapStyle:e.borderCapStyle,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderJoinStyle:e.borderJoinStyle,borderWidth:e.borderWidth,borderColor:e.borderColor}}function Lk(e,t){if(!t)return!1;const n=[],i=function(s,o){return vl(o)?(n.includes(o)||n.push(o),n.indexOf(o)):o};return JSON.stringify(e,i)!==JSON.stringify(t,i)}function Es(e,t,n){return e.options.clip?e[n]:t[n]}function Mk(e,t){const{xScale:n,yScale:i}=e;return n&&i?{left:Es(n,t,"left"),right:Es(n,t,"right"),top:Es(i,t,"top"),bottom:Es(i,t,"bottom")}:t}function tp(e,t){const n=t._clip;if(n.disabled)return!1;const i=Mk(t,e.chartArea);return{left:n.left===!1?0:i.left-(n.left===!0?0:n.left),right:n.right===!1?e.width:i.right+(n.right===!0?0:n.right),top:n.top===!1?0:i.top-(n.top===!0?0:n.top),bottom:n.bottom===!1?e.height:i.bottom+(n.bottom===!0?0:n.bottom)}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */class Pk{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,n,i,s){const o=n.listeners[s],r=n.duration;o.forEach(a=>a({chart:t,initial:n.initial,numSteps:r,currentStep:Math.min(i-n.start,r)}))}_refresh(){this._request||(this._running=!0,this._request=Nf.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(t=Date.now()){let n=0;this._charts.forEach((i,s)=>{if(!i.running||!i.items.length)return;const o=i.items;let r=o.length-1,a=!1,l;for(;r>=0;--r)l=o[r],l._active?(l._total>i.duration&&(i.duration=l._total),l.tick(t),a=!0):(o[r]=o[o.length-1],o.pop());a&&(s.draw(),this._notify(s,i,t,"progress")),o.length||(i.running=!1,this._notify(s,i,t,"complete"),i.initial=!1),n+=o.length}),this._lastDate=t,n===0&&(this._running=!1)}_getAnims(t){const n=this._charts;let i=n.get(t);return i||(i={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},n.set(t,i)),i}listen(t,n,i){this._getAnims(t).listeners[n].push(i)}add(t,n){!n||!n.length||this._getAnims(t).items.push(...n)}has(t){return this._getAnims(t).items.length>0}start(t){const n=this._charts.get(t);n&&(n.running=!0,n.start=Date.now(),n.duration=n.items.reduce((i,s)=>Math.max(i,s._duration),0),this._refresh())}running(t){if(!this._running)return!1;const n=this._charts.get(t);return!(!n||!n.running||!n.items.length)}stop(t){const n=this._charts.get(t);if(!n||!n.items.length)return;const i=n.items;let s=i.length-1;for(;s>=0;--s)i[s].cancel();n.items=[],this._notify(t,n,Date.now(),"complete")}remove(t){return this._charts.delete(t)}}var St=new Pk;const Hd="transparent",Dk={boolean(e,t,n){return n>.5?t:e},color(e,t,n){const i=Rd(e||Hd),s=i.valid&&Rd(t||Hd);return s&&s.valid?s.mix(i,n).hexString():t},number(e,t,n){return e+(t-e)*n}};class Ik{constructor(t,n,i,s){const o=n[i];s=Ts([t.to,s,o,t.from]);const r=Ts([t.from,o,s]);this._active=!0,this._fn=t.fn||Dk[t.type||typeof r],this._easing=Di[t.easing]||Di.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=n,this._prop=i,this._from=r,this._to=s,this._promises=void 0}active(){return this._active}update(t,n,i){if(this._active){this._notify(!1);const s=this._target[this._prop],o=i-this._start,r=this._duration-o;this._start=i,this._duration=Math.floor(Math.max(r,t.duration)),this._total+=o,this._loop=!!t.loop,this._to=Ts([t.to,n,s,t.from]),this._from=Ts([t.from,s,n])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const n=t-this._start,i=this._duration,s=this._prop,o=this._from,r=this._loop,a=this._to;let l;if(this._active=o!==a&&(r||n<i),!this._active){this._target[s]=a,this._notify(!0);return}if(n<0){this._target[s]=o;return}l=n/i%2,l=r&&l>1?2-l:l,l=this._easing(Math.min(1,Math.max(0,l))),this._target[s]=this._fn(o,a,l)}wait(){const t=this._promises||(this._promises=[]);return new Promise((n,i)=>{t.push({res:n,rej:i})})}_notify(t){const n=t?"res":"rej",i=this._promises||[];for(let s=0;s<i.length;s++)i[s][n]()}}class np{constructor(t,n){this._chart=t,this._properties=new Map,this.configure(n)}configure(t){if(!Z(t))return;const n=Object.keys(me.animation),i=this._properties;Object.getOwnPropertyNames(t).forEach(s=>{const o=t[s];if(!Z(o))return;const r={};for(const a of n)r[a]=o[a];(ke(o.properties)&&o.properties||[s]).forEach(a=>{(a===s||!i.has(a))&&i.set(a,r)})})}_animateOptions(t,n){const i=n.options,s=Fk(t,i);if(!s)return[];const o=this._createAnimations(s,i);return i.$shared&&Ok(t.options.$animations,i).then(()=>{t.options=i},()=>{}),o}_createAnimations(t,n){const i=this._properties,s=[],o=t.$animations||(t.$animations={}),r=Object.keys(n),a=Date.now();let l;for(l=r.length-1;l>=0;--l){const c=r[l];if(c.charAt(0)==="$")continue;if(c==="options"){s.push(...this._animateOptions(t,n));continue}const d=n[c];let u=o[c];const h=i.get(c);if(u)if(h&&u.active()){u.update(h,d,a);continue}else u.cancel();if(!h||!h.duration){t[c]=d;continue}o[c]=u=new Ik(h,t,c,d),s.push(u)}return s}update(t,n){if(this._properties.size===0){Object.assign(t,n);return}const i=this._createAnimations(t,n);if(i.length)return St.add(this._chart,i),!0}}function Ok(e,t){const n=[],i=Object.keys(t);for(let s=0;s<i.length;s++){const o=e[i[s]];o&&o.active()&&n.push(o.wait())}return Promise.all(n)}function Fk(e,t){if(!t)return;let n=e.options;if(!n){e.options=t;return}return n.$shared&&(e.options=n=Object.assign({},n,{$shared:!1,$animations:{}})),n}function Ud(e,t){const n=e&&e.options||{},i=n.reverse,s=n.min===void 0?t:0,o=n.max===void 0?t:0;return{start:i?o:s,end:i?s:o}}function Nk(e,t,n){if(n===!1)return!1;const i=Ud(e,n),s=Ud(t,n);return{top:s.end,right:i.end,bottom:s.start,left:i.start}}function Bk(e){let t,n,i,s;return Z(e)?(t=e.top,n=e.right,i=e.bottom,s=e.left):t=n=i=s=e,{top:t,right:n,bottom:i,left:s,disabled:e===!1}}function ip(e,t){const n=[],i=e._getSortedDatasetMetas(t);let s,o;for(s=0,o=i.length;s<o;++s)n.push(i[s].index);return n}function jd(e,t,n,i={}){const s=e.keys,o=i.mode==="single";let r,a,l,c;if(t===null)return;let d=!1;for(r=0,a=s.length;r<a;++r){if(l=+s[r],l===n){if(d=!0,i.all)continue;break}c=e.values[l],Me(c)&&(o||t===0||Xn(t)===Xn(c))&&(t+=c)}return!d&&!i.all?0:t}function zk(e,t){const{iScale:n,vScale:i}=t,s=n.axis==="x"?"x":"y",o=i.axis==="x"?"x":"y",r=Object.keys(e),a=new Array(r.length);let l,c,d;for(l=0,c=r.length;l<c;++l)d=r[l],a[l]={[s]:d,[o]:e[d]};return a}function Sr(e,t){const n=e&&e.options.stacked;return n||n===void 0&&t.stack!==void 0}function Hk(e,t,n){return`${e.id}.${t.id}.${n.stack||n.type}`}function Uk(e){const{min:t,max:n,minDefined:i,maxDefined:s}=e.getUserBounds();return{min:i?t:Number.NEGATIVE_INFINITY,max:s?n:Number.POSITIVE_INFINITY}}function jk(e,t,n){const i=e[t]||(e[t]={});return i[n]||(i[n]={})}function qd(e,t,n,i){for(const s of t.getMatchingVisibleMetas(i).reverse()){const o=e[s.index];if(n&&o>0||!n&&o<0)return s.index}return null}function Kd(e,t){const{chart:n,_cachedMeta:i}=e,s=n._stacks||(n._stacks={}),{iScale:o,vScale:r,index:a}=i,l=o.axis,c=r.axis,d=Hk(o,r,i),u=t.length;let h;for(let g=0;g<u;++g){const v=t[g],{[l]:b,[c]:y}=v,A=v._stacks||(v._stacks={});h=A[c]=jk(s,d,b),h[a]=y,h._top=qd(h,r,!0,i.type),h._bottom=qd(h,r,!1,i.type);const E=h._visualValues||(h._visualValues={});E[a]=y}}function Ar(e,t){const n=e.scales;return Object.keys(n).filter(i=>n[i].axis===t).shift()}function qk(e,t){return Rn(e,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:"default",type:"dataset"})}function Kk(e,t,n){return Rn(e,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:n,index:t,mode:"default",type:"data"})}function pi(e,t){const n=e.controller.index,i=e.vScale&&e.vScale.axis;if(i){t=t||e._parsed;for(const s of t){const o=s._stacks;if(!o||o[i]===void 0||o[i][n]===void 0)return;delete o[i][n],o[i]._visualValues!==void 0&&o[i]._visualValues[n]!==void 0&&delete o[i]._visualValues[n]}}}const Tr=e=>e==="reset"||e==="none",Wd=(e,t)=>t?e:Object.assign({},e),Wk=(e,t,n)=>e&&!t.hidden&&t._stacked&&{keys:ip(n,!0),values:null};class Fi{constructor(t,n){this.chart=t,this._ctx=t.ctx,this.index=n,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=Sr(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&pi(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,n=this._cachedMeta,i=this.getDataset(),s=(u,h,g,v)=>u==="x"?h:u==="r"?v:g,o=n.xAxisID=X(i.xAxisID,Ar(t,"x")),r=n.yAxisID=X(i.yAxisID,Ar(t,"y")),a=n.rAxisID=X(i.rAxisID,Ar(t,"r")),l=n.indexAxis,c=n.iAxisID=s(l,o,r,a),d=n.vAxisID=s(l,r,o,a);n.xScale=this.getScaleForId(o),n.yScale=this.getScaleForId(r),n.rScale=this.getScaleForId(a),n.iScale=this.getScaleForId(c),n.vScale=this.getScaleForId(d)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const n=this._cachedMeta;return t===n.iScale?n.vScale:n.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&Td(this._data,this),t._stacked&&pi(t)}_dataCheck(){const t=this.getDataset(),n=t.data||(t.data=[]),i=this._data;if(Z(n)){const s=this._cachedMeta;this._data=zk(n,s)}else if(i!==n){if(i){Td(i,this);const s=this._cachedMeta;pi(s),s._parsed=[]}n&&Object.isExtensible(n)&&A_(n,this),this._syncList=[],this._data=n}}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const n=this._cachedMeta,i=this.getDataset();let s=!1;this._dataCheck();const o=n._stacked;n._stacked=Sr(n.vScale,n),n.stack!==i.stack&&(s=!0,pi(n),n.stack=i.stack),this._resyncElements(t),(s||o!==n._stacked)&&(Kd(this,n._parsed),n._stacked=Sr(n.vScale,n))}configure(){const t=this.chart.config,n=t.datasetScopeKeys(this._type),i=t.getOptionScopes(this.getDataset(),n,!0);this.options=t.createResolver(i,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,n){const{_cachedMeta:i,_data:s}=this,{iScale:o,_stacked:r}=i,a=o.axis;let l=t===0&&n===s.length?!0:i._sorted,c=t>0&&i._parsed[t-1],d,u,h;if(this._parsing===!1)i._parsed=s,i._sorted=!0,h=s;else{ke(s[t])?h=this.parseArrayData(i,s,t,n):Z(s[t])?h=this.parseObjectData(i,s,t,n):h=this.parsePrimitiveData(i,s,t,n);const g=()=>u[a]===null||c&&u[a]<c[a];for(d=0;d<n;++d)i._parsed[d+t]=u=h[d],l&&(g()&&(l=!1),c=u);i._sorted=l}r&&Kd(this,h)}parsePrimitiveData(t,n,i,s){const{iScale:o,vScale:r}=t,a=o.axis,l=r.axis,c=o.getLabels(),d=o===r,u=new Array(s);let h,g,v;for(h=0,g=s;h<g;++h)v=h+i,u[h]={[a]:d||o.parse(c[v],v),[l]:r.parse(n[v],v)};return u}parseArrayData(t,n,i,s){const{xScale:o,yScale:r}=t,a=new Array(s);let l,c,d,u;for(l=0,c=s;l<c;++l)d=l+i,u=n[d],a[l]={x:o.parse(u[0],d),y:r.parse(u[1],d)};return a}parseObjectData(t,n,i,s){const{xScale:o,yScale:r}=t,{xAxisKey:a="x",yAxisKey:l="y"}=this._parsing,c=new Array(s);let d,u,h,g;for(d=0,u=s;d<u;++d)h=d+i,g=n[h],c[d]={x:o.parse(ao(g,a),h),y:r.parse(ao(g,l),h)};return c}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,n,i){const s=this.chart,o=this._cachedMeta,r=n[t.axis],a={keys:ip(s,!0),values:n._stacks[t.axis]._visualValues};return jd(a,r,o.index,{mode:i})}updateRangeFromParsed(t,n,i,s){const o=i[n.axis];let r=o===null?NaN:o;const a=s&&i._stacks[n.axis];s&&a&&(s.values=a,r=jd(s,o,this._cachedMeta.index)),t.min=Math.min(t.min,r),t.max=Math.max(t.max,r)}getMinMax(t,n){const i=this._cachedMeta,s=i._parsed,o=i._sorted&&t===i.iScale,r=s.length,a=this._getOtherScale(t),l=Wk(n,i,this.chart),c={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:d,max:u}=Uk(a);let h,g;function v(){g=s[h];const b=g[a.axis];return!Me(g[t.axis])||d>b||u<b}for(h=0;h<r&&!(!v()&&(this.updateRangeFromParsed(c,t,g,l),o));++h);if(o){for(h=r-1;h>=0;--h)if(!v()){this.updateRangeFromParsed(c,t,g,l);break}}return c}getAllParsedValues(t){const n=this._cachedMeta._parsed,i=[];let s,o,r;for(s=0,o=n.length;s<o;++s)r=n[s][t.axis],Me(r)&&i.push(r);return i}getMaxOverflow(){return!1}getLabelAndValue(t){const n=this._cachedMeta,i=n.iScale,s=n.vScale,o=this.getParsed(t);return{label:i?""+i.getLabelForValue(o[i.axis]):"",value:s?""+s.getLabelForValue(o[s.axis]):""}}_update(t){const n=this._cachedMeta;this.update(t||"default"),n._clip=Bk(X(this.options.clip,Nk(n.xScale,n.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,n=this.chart,i=this._cachedMeta,s=i.data||[],o=n.chartArea,r=[],a=this._drawStart||0,l=this._drawCount||s.length-a,c=this.options.drawActiveElementsOnTop;let d;for(i.dataset&&i.dataset.draw(t,o,a,l),d=a;d<a+l;++d){const u=s[d];u.hidden||(u.active&&c?r.push(u):u.draw(t,o))}for(d=0;d<r.length;++d)r[d].draw(t,o)}getStyle(t,n){const i=n?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(i):this.resolveDataElementOptions(t||0,i)}getContext(t,n,i){const s=this.getDataset();let o;if(t>=0&&t<this._cachedMeta.data.length){const r=this._cachedMeta.data[t];o=r.$context||(r.$context=Kk(this.getContext(),t,r)),o.parsed=this.getParsed(t),o.raw=s.data[t],o.index=o.dataIndex=t}else o=this.$context||(this.$context=qk(this.chart.getContext(),this.index)),o.dataset=s,o.index=o.datasetIndex=this.index;return o.active=!!n,o.mode=i,o}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,n){return this._resolveElementOptions(this.dataElementType.id,n,t)}_resolveElementOptions(t,n="default",i){const s=n==="active",o=this._cachedDataOpts,r=t+"-"+n,a=o[r],l=this.enableOptionSharing&&lo(i);if(a)return Wd(a,l);const c=this.chart.config,d=c.datasetElementScopeKeys(this._type,t),u=s?[`${t}Hover`,"hover",t,""]:[t,""],h=c.getOptionScopes(this.getDataset(),d),g=Object.keys(me.elements[t]),v=()=>this.getContext(i,s,n),b=c.resolveNamedOptions(h,g,v,u);return b.$shared&&(b.$shared=l,o[r]=Object.freeze(Wd(b,l))),b}_resolveAnimations(t,n,i){const s=this.chart,o=this._cachedDataOpts,r=`animation-${n}`,a=o[r];if(a)return a;let l;if(s.options.animation!==!1){const d=this.chart.config,u=d.datasetAnimationScopeKeys(this._type,n),h=d.getOptionScopes(this.getDataset(),u);l=d.createResolver(h,this.getContext(t,i,n))}const c=new np(s,l&&l.animations);return l&&l._cacheable&&(o[r]=Object.freeze(c)),c}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,n){return!n||Tr(t)||this.chart._animationsDisabled}_getSharedOptions(t,n){const i=this.resolveDataElementOptions(t,n),s=this._sharedOptions,o=this.getSharedOptions(i),r=this.includeOptions(n,o)||o!==s;return this.updateSharedOptions(o,n,i),{sharedOptions:o,includeOptions:r}}updateElement(t,n,i,s){Tr(s)?Object.assign(t,i):this._resolveAnimations(n,s).update(t,i)}updateSharedOptions(t,n,i){t&&!Tr(n)&&this._resolveAnimations(void 0,n).update(t,i)}_setStyle(t,n,i,s){t.active=s;const o=this.getStyle(n,s);this._resolveAnimations(n,i,s).update(t,{options:!s&&this.getSharedOptions(o)||o})}removeHoverStyle(t,n,i){this._setStyle(t,i,"active",!1)}setHoverStyle(t,n,i){this._setStyle(t,i,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const n=this._data,i=this._cachedMeta.data;for(const[a,l,c]of this._syncList)this[a](l,c);this._syncList=[];const s=i.length,o=n.length,r=Math.min(o,s);r&&this.parse(0,r),o>s?this._insertElements(s,o-s,t):o<s&&this._removeElements(o,s-o)}_insertElements(t,n,i=!0){const s=this._cachedMeta,o=s.data,r=t+n;let a;const l=c=>{for(c.length+=n,a=c.length-1;a>=r;a--)c[a]=c[a-n]};for(l(o),a=t;a<r;++a)o[a]=new this.dataElementType;this._parsing&&l(s._parsed),this.parse(t,n),i&&this.updateElements(o,t,n,"reset")}updateElements(t,n,i,s){}_removeElements(t,n){const i=this._cachedMeta;if(this._parsing){const s=i._parsed.splice(t,n);i._stacked&&pi(i,s)}i.data.splice(t,n)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[n,i,s]=t;this[n](i,s)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,n){n&&this._sync(["_removeElements",t,n]);const i=arguments.length-2;i&&this._sync(["_insertElements",t,i])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}B(Fi,"defaults",{}),B(Fi,"datasetElementType",null),B(Fi,"dataElementType",null);class js extends Fi{initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){const n=this._cachedMeta,{dataset:i,data:s=[],_dataset:o}=n,r=this.chart._animationsDisabled;let{start:a,count:l}=R_(n,s,r);this._drawStart=a,this._drawCount=l,L_(n)&&(a=0,l=s.length),i._chart=this.chart,i._datasetIndex=this.index,i._decimated=!!o._decimated,i.points=s;const c=this.resolveDatasetElementOptions(t);this.options.showLine||(c.borderWidth=0),c.segment=this.options.segment,this.updateElement(i,void 0,{animated:!r,options:c},t),this.updateElements(s,a,l,t)}updateElements(t,n,i,s){const o=s==="reset",{iScale:r,vScale:a,_stacked:l,_dataset:c}=this._cachedMeta,{sharedOptions:d,includeOptions:u}=this._getSharedOptions(n,s),h=r.axis,g=a.axis,{spanGaps:v,segment:b}=this.options,y=Vi(v)?v:Number.POSITIVE_INFINITY,A=this.chart._animationsDisabled||o||s==="none",E=n+i,R=t.length;let k=n>0&&this.getParsed(n-1);for(let T=0;T<R;++T){const M=t[T],m=A?M:{};if(T<n||T>=E){m.skip=!0;continue}const $=this.getParsed(T),L=ce($[g]),I=m[h]=r.getPixelForValue($[h],T),P=m[g]=o||L?a.getBasePixel():a.getPixelForValue(l?this.applyStack(a,$,l):$[g],T);m.skip=isNaN(I)||isNaN(P)||L,m.stop=T>0&&Math.abs($[h]-k[h])>y,b&&(m.parsed=$,m.raw=c.data[T]),u&&(m.options=d||this.resolveDataElementOptions(T,M.active?"active":s)),A||this.updateElement(M,T,m,s),k=$}}getMaxOverflow(){const t=this._cachedMeta,n=t.dataset,i=n.options&&n.options.borderWidth||0,s=t.data||[];if(!s.length)return i;const o=s[0].size(this.resolveDataElementOptions(0)),r=s[s.length-1].size(this.resolveDataElementOptions(s.length-1));return Math.max(i,o,r)/2}draw(){const t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}}B(js,"id","line"),B(js,"defaults",{datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1}),B(js,"overrides",{scales:{_index_:{type:"category"},_value_:{type:"linear"}}});function sn(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class kl{constructor(t){B(this,"options");this.options=t||{}}static override(t){Object.assign(kl.prototype,t)}init(){}formats(){return sn()}parse(){return sn()}format(){return sn()}add(){return sn()}diff(){return sn()}startOf(){return sn()}endOf(){return sn()}}var Vk={_date:kl};function Gk(e,t,n,i){const{controller:s,data:o,_sorted:r}=e,a=s._cachedMeta.iScale,l=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null;if(a&&t===a.axis&&t!=="r"&&r&&o.length){const c=a._reversePixels?$_:hn;if(i){if(s._sharedOptions){const d=o[0],u=typeof d.getRange=="function"&&d.getRange(t);if(u){const h=c(o,t,n-u),g=c(o,t,n+u);return{lo:h.lo,hi:g.hi}}}}else{const d=c(o,t,n);if(l){const{vScale:u}=s._cachedMeta,{_parsed:h}=e,g=h.slice(0,d.lo+1).reverse().findIndex(b=>!ce(b[u.axis]));d.lo-=Math.max(0,g);const v=h.slice(d.hi).findIndex(b=>!ce(b[u.axis]));d.hi+=Math.max(0,v)}return d}}return{lo:0,hi:o.length-1}}function Oo(e,t,n,i,s){const o=e.getSortedVisibleDatasetMetas(),r=n[t];for(let a=0,l=o.length;a<l;++a){const{index:c,data:d}=o[a],{lo:u,hi:h}=Gk(o[a],t,r,s);for(let g=u;g<=h;++g){const v=d[g];v.skip||i(v,c,g)}}}function Qk(e){const t=e.indexOf("x")!==-1,n=e.indexOf("y")!==-1;return function(i,s){const o=t?Math.abs(i.x-s.x):0,r=n?Math.abs(i.y-s.y):0;return Math.sqrt(Math.pow(o,2)+Math.pow(r,2))}}function Cr(e,t,n,i,s){const o=[];return!s&&!e.isPointInArea(t)||Oo(e,n,t,function(a,l,c){!s&&!Gi(a,e.chartArea,0)||a.inRange(t.x,t.y,i)&&o.push({element:a,datasetIndex:l,index:c})},!0),o}function Yk(e,t,n,i){let s=[];function o(r,a,l){const{startAngle:c,endAngle:d}=r.getProps(["startAngle","endAngle"],i),{angle:u}=x_(r,{x:t.x,y:t.y});Of(u,c,d)&&s.push({element:r,datasetIndex:a,index:l})}return Oo(e,n,t,o),s}function Xk(e,t,n,i,s,o){let r=[];const a=Qk(n);let l=Number.POSITIVE_INFINITY;function c(d,u,h){const g=d.inRange(t.x,t.y,s);if(i&&!g)return;const v=d.getCenterPoint(s);if(!(!!o||e.isPointInArea(v))&&!g)return;const y=a(t,v);y<l?(r=[{element:d,datasetIndex:u,index:h}],l=y):y===l&&r.push({element:d,datasetIndex:u,index:h})}return Oo(e,n,t,c),r}function Er(e,t,n,i,s,o){return!o&&!e.isPointInArea(t)?[]:n==="r"&&!i?Yk(e,t,n,s):Xk(e,t,n,i,s,o)}function Vd(e,t,n,i,s){const o=[],r=n==="x"?"inXRange":"inYRange";let a=!1;return Oo(e,n,t,(l,c,d)=>{l[r]&&l[r](t[n],s)&&(o.push({element:l,datasetIndex:c,index:d}),a=a||l.inRange(t.x,t.y,s))}),i&&!a?[]:o}var Jk={modes:{index(e,t,n,i){const s=rn(t,e),o=n.axis||"x",r=n.includeInvisible||!1,a=n.intersect?Cr(e,s,o,i,r):Er(e,s,o,!1,i,r),l=[];return a.length?(e.getSortedVisibleDatasetMetas().forEach(c=>{const d=a[0].index,u=c.data[d];u&&!u.skip&&l.push({element:u,datasetIndex:c.index,index:d})}),l):[]},dataset(e,t,n,i){const s=rn(t,e),o=n.axis||"xy",r=n.includeInvisible||!1;let a=n.intersect?Cr(e,s,o,i,r):Er(e,s,o,!1,i,r);if(a.length>0){const l=a[0].datasetIndex,c=e.getDatasetMeta(l).data;a=[];for(let d=0;d<c.length;++d)a.push({element:c[d],datasetIndex:l,index:d})}return a},point(e,t,n,i){const s=rn(t,e),o=n.axis||"xy",r=n.includeInvisible||!1;return Cr(e,s,o,i,r)},nearest(e,t,n,i){const s=rn(t,e),o=n.axis||"xy",r=n.includeInvisible||!1;return Er(e,s,o,n.intersect,i,r)},x(e,t,n,i){const s=rn(t,e);return Vd(e,s,"x",n.intersect,i)},y(e,t,n,i){const s=rn(t,e);return Vd(e,s,"y",n.intersect,i)}}};const sp=["left","top","right","bottom"];function gi(e,t){return e.filter(n=>n.pos===t)}function Gd(e,t){return e.filter(n=>sp.indexOf(n.pos)===-1&&n.box.axis===t)}function mi(e,t){return e.sort((n,i)=>{const s=t?i:n,o=t?n:i;return s.weight===o.weight?s.index-o.index:s.weight-o.weight})}function Zk(e){const t=[];let n,i,s,o,r,a;for(n=0,i=(e||[]).length;n<i;++n)s=e[n],{position:o,options:{stack:r,stackWeight:a=1}}=s,t.push({index:n,box:s,pos:o,horizontal:s.isHorizontal(),weight:s.weight,stack:r&&o+r,stackWeight:a});return t}function e$(e){const t={};for(const n of e){const{stack:i,pos:s,stackWeight:o}=n;if(!i||!sp.includes(s))continue;const r=t[i]||(t[i]={count:0,placed:0,weight:0,size:0});r.count++,r.weight+=o}return t}function t$(e,t){const n=e$(e),{vBoxMaxWidth:i,hBoxMaxHeight:s}=t;let o,r,a;for(o=0,r=e.length;o<r;++o){a=e[o];const{fullSize:l}=a.box,c=n[a.stack],d=c&&a.stackWeight/c.weight;a.horizontal?(a.width=d?d*i:l&&t.availableWidth,a.height=s):(a.width=i,a.height=d?d*s:l&&t.availableHeight)}return n}function n$(e){const t=Zk(e),n=mi(t.filter(c=>c.box.fullSize),!0),i=mi(gi(t,"left"),!0),s=mi(gi(t,"right")),o=mi(gi(t,"top"),!0),r=mi(gi(t,"bottom")),a=Gd(t,"x"),l=Gd(t,"y");return{fullSize:n,leftAndTop:i.concat(o),rightAndBottom:s.concat(l).concat(r).concat(a),chartArea:gi(t,"chartArea"),vertical:i.concat(s).concat(l),horizontal:o.concat(r).concat(a)}}function Qd(e,t,n,i){return Math.max(e[n],t[n])+Math.max(e[i],t[i])}function op(e,t){e.top=Math.max(e.top,t.top),e.left=Math.max(e.left,t.left),e.bottom=Math.max(e.bottom,t.bottom),e.right=Math.max(e.right,t.right)}function i$(e,t,n,i){const{pos:s,box:o}=n,r=e.maxPadding;if(!Z(s)){n.size&&(e[s]-=n.size);const u=i[n.stack]||{size:0,count:1};u.size=Math.max(u.size,n.horizontal?o.height:o.width),n.size=u.size/u.count,e[s]+=n.size}o.getPadding&&op(r,o.getPadding());const a=Math.max(0,t.outerWidth-Qd(r,e,"left","right")),l=Math.max(0,t.outerHeight-Qd(r,e,"top","bottom")),c=a!==e.w,d=l!==e.h;return e.w=a,e.h=l,n.horizontal?{same:c,other:d}:{same:d,other:c}}function s$(e){const t=e.maxPadding;function n(i){const s=Math.max(t[i]-e[i],0);return e[i]+=s,s}e.y+=n("top"),e.x+=n("left"),n("right"),n("bottom")}function o$(e,t){const n=t.maxPadding;function i(s){const o={left:0,top:0,right:0,bottom:0};return s.forEach(r=>{o[r]=Math.max(t[r],n[r])}),o}return i(e?["left","right"]:["top","bottom"])}function _i(e,t,n,i){const s=[];let o,r,a,l,c,d;for(o=0,r=e.length,c=0;o<r;++o){a=e[o],l=a.box,l.update(a.width||t.w,a.height||t.h,o$(a.horizontal,t));const{same:u,other:h}=i$(t,n,a,i);c|=u&&s.length,d=d||h,l.fullSize||s.push(a)}return c&&_i(s,t,n,i)||d}function Rs(e,t,n,i,s){e.top=n,e.left=t,e.right=t+i,e.bottom=n+s,e.width=i,e.height=s}function Yd(e,t,n,i){const s=n.padding;let{x:o,y:r}=t;for(const a of e){const l=a.box,c=i[a.stack]||{placed:0,weight:1},d=a.stackWeight/c.weight||1;if(a.horizontal){const u=t.w*d,h=c.size||l.height;lo(c.start)&&(r=c.start),l.fullSize?Rs(l,s.left,r,n.outerWidth-s.right-s.left,h):Rs(l,t.left+c.placed,r,u,h),c.start=r,c.placed+=u,r=l.bottom}else{const u=t.h*d,h=c.size||l.width;lo(c.start)&&(o=c.start),l.fullSize?Rs(l,o,s.top,h,n.outerHeight-s.bottom-s.top):Rs(l,o,t.top+c.placed,h,u),c.start=o,c.placed+=u,o=l.right}}t.x=o,t.y=r}var It={addBox(e,t){e.boxes||(e.boxes=[]),t.fullSize=t.fullSize||!1,t.position=t.position||"top",t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(n){t.draw(n)}}]},e.boxes.push(t)},removeBox(e,t){const n=e.boxes?e.boxes.indexOf(t):-1;n!==-1&&e.boxes.splice(n,1)},configure(e,t,n){t.fullSize=n.fullSize,t.position=n.position,t.weight=n.weight},update(e,t,n,i){if(!e)return;const s=st(e.options.layout.padding),o=Math.max(t-s.width,0),r=Math.max(n-s.height,0),a=n$(e.boxes),l=a.vertical,c=a.horizontal;re(e.boxes,b=>{typeof b.beforeLayout=="function"&&b.beforeLayout()});const d=l.reduce((b,y)=>y.box.options&&y.box.options.display===!1?b:b+1,0)||1,u=Object.freeze({outerWidth:t,outerHeight:n,padding:s,availableWidth:o,availableHeight:r,vBoxMaxWidth:o/2/d,hBoxMaxHeight:r/2}),h=Object.assign({},s);op(h,st(i));const g=Object.assign({maxPadding:h,w:o,h:r,x:s.left,y:s.top},s),v=t$(l.concat(c),u);_i(a.fullSize,g,u,v),_i(l,g,u,v),_i(c,g,u,v)&&_i(l,g,u,v),s$(g),Yd(a.leftAndTop,g,u,v),g.x+=g.w,g.y+=g.h,Yd(a.rightAndBottom,g,u,v),e.chartArea={left:g.left,top:g.top,right:g.left+g.w,bottom:g.top+g.h,height:g.h,width:g.w},re(a.chartArea,b=>{const y=b.box;Object.assign(y,e.chartArea),y.update(g.w,g.h,{left:0,top:0,right:0,bottom:0})})}};class rp{acquireContext(t,n){}releaseContext(t){return!1}addEventListener(t,n,i){}removeEventListener(t,n,i){}getDevicePixelRatio(){return 1}getMaximumSize(t,n,i,s){return n=Math.max(0,n||t.width),i=i||t.height,{width:n,height:Math.max(0,s?Math.floor(n/s):i)}}isAttached(t){return!0}updateConfig(t){}}class r$ extends rp{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const qs="$chartjs",a$={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},Xd=e=>e===null||e==="";function l$(e,t){const n=e.style,i=e.getAttribute("height"),s=e.getAttribute("width");if(e[qs]={initial:{height:i,width:s,style:{display:n.display,height:n.height,width:n.width}}},n.display=n.display||"block",n.boxSizing=n.boxSizing||"border-box",Xd(s)){const o=Fd(e,"width");o!==void 0&&(e.width=o)}if(Xd(i))if(e.style.height==="")e.height=e.width/(t||2);else{const o=Fd(e,"height");o!==void 0&&(e.height=o)}return e}const ap=xk?{passive:!0}:!1;function c$(e,t,n){e&&e.addEventListener(t,n,ap)}function d$(e,t,n){e&&e.canvas&&e.canvas.removeEventListener(t,n,ap)}function u$(e,t){const n=a$[e.type]||e.type,{x:i,y:s}=rn(e,t);return{type:n,chart:t,native:e,x:i!==void 0?i:null,y:s!==void 0?s:null}}function fo(e,t){for(const n of e)if(n===t||n.contains(t))return!0}function h$(e,t,n){const i=e.canvas,s=new MutationObserver(o=>{let r=!1;for(const a of o)r=r||fo(a.addedNodes,i),r=r&&!fo(a.removedNodes,i);r&&n()});return s.observe(document,{childList:!0,subtree:!0}),s}function f$(e,t,n){const i=e.canvas,s=new MutationObserver(o=>{let r=!1;for(const a of o)r=r||fo(a.removedNodes,i),r=r&&!fo(a.addedNodes,i);r&&n()});return s.observe(document,{childList:!0,subtree:!0}),s}const Qi=new Map;let Jd=0;function lp(){const e=window.devicePixelRatio;e!==Jd&&(Jd=e,Qi.forEach((t,n)=>{n.currentDevicePixelRatio!==e&&t()}))}function p$(e,t){Qi.size||window.addEventListener("resize",lp),Qi.set(e,t)}function g$(e){Qi.delete(e),Qi.size||window.removeEventListener("resize",lp)}function m$(e,t,n){const i=e.canvas,s=i&&_l(i);if(!s)return;const o=Bf((a,l)=>{const c=s.clientWidth;n(a,l),c<s.clientWidth&&n()},window),r=new ResizeObserver(a=>{const l=a[0],c=l.contentRect.width,d=l.contentRect.height;c===0&&d===0||o(c,d)});return r.observe(s),p$(e,o),r}function Rr(e,t,n){n&&n.disconnect(),t==="resize"&&g$(e)}function v$(e,t,n){const i=e.canvas,s=Bf(o=>{e.ctx!==null&&n(u$(o,e))},e);return c$(i,t,s),s}class y$ extends rp{acquireContext(t,n){const i=t&&t.getContext&&t.getContext("2d");return i&&i.canvas===t?(l$(t,n),i):null}releaseContext(t){const n=t.canvas;if(!n[qs])return!1;const i=n[qs].initial;["height","width"].forEach(o=>{const r=i[o];ce(r)?n.removeAttribute(o):n.setAttribute(o,r)});const s=i.style||{};return Object.keys(s).forEach(o=>{n.style[o]=s[o]}),n.width=n.width,delete n[qs],!0}addEventListener(t,n,i){this.removeEventListener(t,n);const s=t.$proxies||(t.$proxies={}),r={attach:h$,detach:f$,resize:m$}[n]||v$;s[n]=r(t,n,i)}removeEventListener(t,n){const i=t.$proxies||(t.$proxies={}),s=i[n];if(!s)return;({attach:Rr,detach:Rr,resize:Rr}[n]||d$)(t,n,s),i[n]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,n,i,s){return wk(t,n,i,s)}isAttached(t){const n=t&&_l(t);return!!(n&&n.isConnected)}}function b$(e){return!xl()||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas?r$:y$}class Kt{constructor(){B(this,"x");B(this,"y");B(this,"active",!1);B(this,"options");B(this,"$animations")}tooltipPosition(t){const{x:n,y:i}=this.getProps(["x","y"],t);return{x:n,y:i}}hasValue(){return Vi(this.x)&&Vi(this.y)}getProps(t,n){const i=this.$animations;if(!n||!i)return this;const s={};return t.forEach(o=>{s[o]=i[o]&&i[o].active()?i[o]._to:this[o]}),s}}B(Kt,"defaults",{}),B(Kt,"defaultRoutes");function w$(e,t){const n=e.options.ticks,i=x$(e),s=Math.min(n.maxTicksLimit||i,i),o=n.major.enabled?k$(t):[],r=o.length,a=o[0],l=o[r-1],c=[];if(r>s)return $$(t,c,o,r/s),c;const d=_$(o,t,s);if(r>0){let u,h;const g=r>1?Math.round((l-a)/(r-1)):null;for(Ls(t,c,d,ce(g)?0:a-g,a),u=0,h=r-1;u<h;u++)Ls(t,c,d,o[u],o[u+1]);return Ls(t,c,d,l,ce(g)?t.length:l+g),c}return Ls(t,c,d),c}function x$(e){const t=e.options.offset,n=e._tickSize(),i=e._length/n+(t?0:1),s=e._maxLength/n;return Math.floor(Math.min(i,s))}function _$(e,t,n){const i=S$(e),s=t.length/n;if(!i)return Math.max(s,1);const o=m_(i);for(let r=0,a=o.length-1;r<a;r++){const l=o[r];if(l>s)return l}return Math.max(s,1)}function k$(e){const t=[];let n,i;for(n=0,i=e.length;n<i;n++)e[n].major&&t.push(n);return t}function $$(e,t,n,i){let s=0,o=n[0],r;for(i=Math.ceil(i),r=0;r<e.length;r++)r===o&&(t.push(e[r]),s++,o=n[s*i])}function Ls(e,t,n,i,s){const o=X(i,0),r=Math.min(X(s,e.length),e.length);let a=0,l,c,d;for(n=Math.ceil(n),s&&(l=s-i,n=l/Math.floor(l/n)),d=o;d<0;)a++,d=Math.round(o+a*n);for(c=Math.max(o,0);c<r;c++)c===d&&(t.push(e[c]),a++,d=Math.round(o+a*n))}function S$(e){const t=e.length;let n,i;if(t<2)return!1;for(i=e[0],n=1;n<t;++n)if(e[n]-e[n-1]!==i)return!1;return i}const A$=e=>e==="left"?"right":e==="right"?"left":e,Zd=(e,t,n)=>t==="top"||t==="left"?e[t]+n:e[t]-n,eu=(e,t)=>Math.min(t||e,e);function tu(e,t){const n=[],i=e.length/t,s=e.length;let o=0;for(;o<s;o+=i)n.push(e[Math.floor(o)]);return n}function T$(e,t,n){const i=e.ticks.length,s=Math.min(t,i-1),o=e._startPixel,r=e._endPixel,a=1e-6;let l=e.getPixelForTick(s),c;if(!(n&&(i===1?c=Math.max(l-o,r-l):t===0?c=(e.getPixelForTick(1)-l)/2:c=(l-e.getPixelForTick(s-1))/2,l+=s<t?c:-c,l<o-a||l>r+a)))return l}function C$(e,t){re(e,n=>{const i=n.gc,s=i.length/2;let o;if(s>t){for(o=0;o<s;++o)delete n.data[i[o]];i.splice(0,s)}})}function vi(e){return e.drawTicks?e.tickLength:0}function nu(e,t){if(!e.display)return 0;const n=Ue(e.font,t),i=st(e.padding);return(ke(e.text)?e.text.length:1)*n.lineHeight+i.height}function E$(e,t){return Rn(e,{scale:t,type:"scale"})}function R$(e,t,n){return Rn(e,{tick:n,index:t,type:"tick"})}function L$(e,t,n){let i=zf(e);return(n&&t!=="right"||!n&&t==="right")&&(i=A$(i)),i}function M$(e,t,n,i){const{top:s,left:o,bottom:r,right:a,chart:l}=e,{chartArea:c,scales:d}=l;let u=0,h,g,v;const b=r-s,y=a-o;if(e.isHorizontal()){if(g=je(i,o,a),Z(n)){const A=Object.keys(n)[0],E=n[A];v=d[A].getPixelForValue(E)+b-t}else n==="center"?v=(c.bottom+c.top)/2+b-t:v=Zd(e,n,t);h=a-o}else{if(Z(n)){const A=Object.keys(n)[0],E=n[A];g=d[A].getPixelForValue(E)-y+t}else n==="center"?g=(c.left+c.right)/2-y+t:g=Zd(e,n,t);v=je(i,r,s),u=n==="left"?-tt:tt}return{titleX:g,titleY:v,maxWidth:h,rotation:u}}class ni extends Kt{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,n){return t}getUserBounds(){let{_userMin:t,_userMax:n,_suggestedMin:i,_suggestedMax:s}=this;return t=lt(t,Number.POSITIVE_INFINITY),n=lt(n,Number.NEGATIVE_INFINITY),i=lt(i,Number.POSITIVE_INFINITY),s=lt(s,Number.NEGATIVE_INFINITY),{min:lt(t,i),max:lt(n,s),minDefined:Me(t),maxDefined:Me(n)}}getMinMax(t){let{min:n,max:i,minDefined:s,maxDefined:o}=this.getUserBounds(),r;if(s&&o)return{min:n,max:i};const a=this.getMatchingVisibleMetas();for(let l=0,c=a.length;l<c;++l)r=a[l].controller.getMinMax(this,t),s||(n=Math.min(n,r.min)),o||(i=Math.max(i,r.max));return n=o&&n>i?i:n,i=s&&n>i?n:i,{min:lt(n,lt(i,n)),max:lt(i,lt(n,i))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){ue(this.options.beforeUpdate,[this])}update(t,n,i){const{beginAtZero:s,grace:o,ticks:r}=this.options,a=r.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=n,this._margins=i=Object.assign({left:0,right:0,top:0,bottom:0},i),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+i.left+i.right:this.height+i.top+i.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=J_(this,o,s),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const l=a<this.ticks.length;this._convertTicksToLabels(l?tu(this.ticks,a):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),r.display&&(r.autoSkip||r.source==="auto")&&(this.ticks=w$(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),l&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t=this.options.reverse,n,i;this.isHorizontal()?(n=this.left,i=this.right):(n=this.top,i=this.bottom,t=!t),this._startPixel=n,this._endPixel=i,this._reversePixels=t,this._length=i-n,this._alignToPixels=this.options.alignToPixels}afterUpdate(){ue(this.options.afterUpdate,[this])}beforeSetDimensions(){ue(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){ue(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),ue(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){ue(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const n=this.options.ticks;let i,s,o;for(i=0,s=t.length;i<s;i++)o=t[i],o.label=ue(n.callback,[o.value,i,t],this)}afterTickToLabelConversion(){ue(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){ue(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,n=t.ticks,i=eu(this.ticks.length,t.ticks.maxTicksLimit),s=n.minRotation||0,o=n.maxRotation;let r=s,a,l,c;if(!this._isVisible()||!n.display||s>=o||i<=1||!this.isHorizontal()){this.labelRotation=s;return}const d=this._getLabelSizes(),u=d.widest.width,h=d.highest.height,g=We(this.chart.width-u,0,this.maxWidth);a=t.offset?this.maxWidth/i:g/(i-1),u+6>a&&(a=g/(i-(t.offset?.5:1)),l=this.maxHeight-vi(t.grid)-n.padding-nu(t.title,this.chart.options.font),c=Math.sqrt(u*u+h*h),r=w_(Math.min(Math.asin(We((d.highest.height+6)/a,-1,1)),Math.asin(We(l/c,-1,1))-Math.asin(We(h/c,-1,1)))),r=Math.max(s,Math.min(o,r))),this.labelRotation=r}afterCalculateLabelRotation(){ue(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){ue(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:n,options:{ticks:i,title:s,grid:o}}=this,r=this._isVisible(),a=this.isHorizontal();if(r){const l=nu(s,n.options.font);if(a?(t.width=this.maxWidth,t.height=vi(o)+l):(t.height=this.maxHeight,t.width=vi(o)+l),i.display&&this.ticks.length){const{first:c,last:d,widest:u,highest:h}=this._getLabelSizes(),g=i.padding*2,v=un(this.labelRotation),b=Math.cos(v),y=Math.sin(v);if(a){const A=i.mirror?0:y*u.width+b*h.height;t.height=Math.min(this.maxHeight,t.height+A+g)}else{const A=i.mirror?0:b*u.width+y*h.height;t.width=Math.min(this.maxWidth,t.width+A+g)}this._calculatePadding(c,d,y,b)}}this._handleMargins(),a?(this.width=this._length=n.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=n.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,n,i,s){const{ticks:{align:o,padding:r},position:a}=this.options,l=this.labelRotation!==0,c=a!=="top"&&this.axis==="x";if(this.isHorizontal()){const d=this.getPixelForTick(0)-this.left,u=this.right-this.getPixelForTick(this.ticks.length-1);let h=0,g=0;l?c?(h=s*t.width,g=i*n.height):(h=i*t.height,g=s*n.width):o==="start"?g=n.width:o==="end"?h=t.width:o!=="inner"&&(h=t.width/2,g=n.width/2),this.paddingLeft=Math.max((h-d+r)*this.width/(this.width-d),0),this.paddingRight=Math.max((g-u+r)*this.width/(this.width-u),0)}else{let d=n.height/2,u=t.height/2;o==="start"?(d=0,u=t.height):o==="end"&&(d=n.height,u=0),this.paddingTop=d+r,this.paddingBottom=u+r}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){ue(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:n}=this.options;return n==="top"||n==="bottom"||t==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){this.beforeTickToLabelConversion(),this.generateTickLabels(t);let n,i;for(n=0,i=t.length;n<i;n++)ce(t[n].label)&&(t.splice(n,1),i--,n--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const n=this.options.ticks.sampleSize;let i=this.ticks;n<i.length&&(i=tu(i,n)),this._labelSizes=t=this._computeLabelSizes(i,i.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,n,i){const{ctx:s,_longestTextCache:o}=this,r=[],a=[],l=Math.floor(n/eu(n,i));let c=0,d=0,u,h,g,v,b,y,A,E,R,k,T;for(u=0;u<n;u+=l){if(v=t[u].label,b=this._resolveTickFontOptions(u),s.font=y=b.string,A=o[y]=o[y]||{data:{},gc:[]},E=b.lineHeight,R=k=0,!ce(v)&&!ke(v))R=Md(s,A.data,A.gc,R,v),k=E;else if(ke(v))for(h=0,g=v.length;h<g;++h)T=v[h],!ce(T)&&!ke(T)&&(R=Md(s,A.data,A.gc,R,T),k+=E);r.push(R),a.push(k),c=Math.max(R,c),d=Math.max(k,d)}C$(o,n);const M=r.indexOf(c),m=a.indexOf(d),$=L=>({width:r[L]||0,height:a[L]||0});return{first:$(0),last:$(n-1),widest:$(M),highest:$(m),widths:r,heights:a}}getLabelForValue(t){return t}getPixelForValue(t,n){return NaN}getValueForPixel(t){}getPixelForTick(t){const n=this.ticks;return t<0||t>n.length-1?null:this.getPixelForValue(n[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const n=this._startPixel+t*this._length;return k_(this._alignToPixels?nn(this.chart,n,0):n)}getDecimalForPixel(t){const n=(t-this._startPixel)/this._length;return this._reversePixels?1-n:n}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:n}=this;return t<0&&n<0?n:t>0&&n>0?t:0}getContext(t){const n=this.ticks||[];if(t>=0&&t<n.length){const i=n[t];return i.$context||(i.$context=R$(this.getContext(),t,i))}return this.$context||(this.$context=E$(this.chart.getContext(),this))}_tickSize(){const t=this.options.ticks,n=un(this.labelRotation),i=Math.abs(Math.cos(n)),s=Math.abs(Math.sin(n)),o=this._getLabelSizes(),r=t.autoSkipPadding||0,a=o?o.widest.width+r:0,l=o?o.highest.height+r:0;return this.isHorizontal()?l*i>a*s?a/i:l/s:l*s<a*i?l/i:a/s}_isVisible(){const t=this.options.display;return t!=="auto"?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const n=this.axis,i=this.chart,s=this.options,{grid:o,position:r,border:a}=s,l=o.offset,c=this.isHorizontal(),u=this.ticks.length+(l?1:0),h=vi(o),g=[],v=a.setContext(this.getContext()),b=v.display?v.width:0,y=b/2,A=function(G){return nn(i,G,b)};let E,R,k,T,M,m,$,L,I,P,F,U;if(r==="top")E=A(this.bottom),m=this.bottom-h,L=E-y,P=A(t.top)+y,U=t.bottom;else if(r==="bottom")E=A(this.top),P=t.top,U=A(t.bottom)-y,m=E+y,L=this.top+h;else if(r==="left")E=A(this.right),M=this.right-h,$=E-y,I=A(t.left)+y,F=t.right;else if(r==="right")E=A(this.left),I=t.left,F=A(t.right)-y,M=E+y,$=this.left+h;else if(n==="x"){if(r==="center")E=A((t.top+t.bottom)/2+.5);else if(Z(r)){const G=Object.keys(r)[0],le=r[G];E=A(this.chart.scales[G].getPixelForValue(le))}P=t.top,U=t.bottom,m=E+y,L=m+h}else if(n==="y"){if(r==="center")E=A((t.left+t.right)/2);else if(Z(r)){const G=Object.keys(r)[0],le=r[G];E=A(this.chart.scales[G].getPixelForValue(le))}M=E-y,$=M-h,I=t.left,F=t.right}const W=X(s.ticks.maxTicksLimit,u),O=Math.max(1,Math.ceil(u/W));for(R=0;R<u;R+=O){const G=this.getContext(R),le=o.setContext(G),N=a.setContext(G),J=le.lineWidth,ge=le.color,Q=N.dash||[],Se=N.dashOffset,se=le.tickWidth,Te=le.tickColor,te=le.tickBorderDash||[],be=le.tickBorderDashOffset;k=T$(this,R,l),k!==void 0&&(T=nn(i,k,J),c?M=$=I=F=T:m=L=P=U=T,g.push({tx1:M,ty1:m,tx2:$,ty2:L,x1:I,y1:P,x2:F,y2:U,width:J,color:ge,borderDash:Q,borderDashOffset:Se,tickWidth:se,tickColor:Te,tickBorderDash:te,tickBorderDashOffset:be}))}return this._ticksLength=u,this._borderValue=E,g}_computeLabelItems(t){const n=this.axis,i=this.options,{position:s,ticks:o}=i,r=this.isHorizontal(),a=this.ticks,{align:l,crossAlign:c,padding:d,mirror:u}=o,h=vi(i.grid),g=h+d,v=u?-d:g,b=-un(this.labelRotation),y=[];let A,E,R,k,T,M,m,$,L,I,P,F,U="middle";if(s==="top")M=this.bottom-v,m=this._getXAxisLabelAlignment();else if(s==="bottom")M=this.top+v,m=this._getXAxisLabelAlignment();else if(s==="left"){const O=this._getYAxisLabelAlignment(h);m=O.textAlign,T=O.x}else if(s==="right"){const O=this._getYAxisLabelAlignment(h);m=O.textAlign,T=O.x}else if(n==="x"){if(s==="center")M=(t.top+t.bottom)/2+g;else if(Z(s)){const O=Object.keys(s)[0],G=s[O];M=this.chart.scales[O].getPixelForValue(G)+g}m=this._getXAxisLabelAlignment()}else if(n==="y"){if(s==="center")T=(t.left+t.right)/2-g;else if(Z(s)){const O=Object.keys(s)[0],G=s[O];T=this.chart.scales[O].getPixelForValue(G)}m=this._getYAxisLabelAlignment(h).textAlign}n==="y"&&(l==="start"?U="top":l==="end"&&(U="bottom"));const W=this._getLabelSizes();for(A=0,E=a.length;A<E;++A){R=a[A],k=R.label;const O=o.setContext(this.getContext(A));$=this.getPixelForTick(A)+o.labelOffset,L=this._resolveTickFontOptions(A),I=L.lineHeight,P=ke(k)?k.length:1;const G=P/2,le=O.color,N=O.textStrokeColor,J=O.textStrokeWidth;let ge=m;r?(T=$,m==="inner"&&(A===E-1?ge=this.options.reverse?"left":"right":A===0?ge=this.options.reverse?"right":"left":ge="center"),s==="top"?c==="near"||b!==0?F=-P*I+I/2:c==="center"?F=-W.highest.height/2-G*I+I:F=-W.highest.height+I/2:c==="near"||b!==0?F=I/2:c==="center"?F=W.highest.height/2-G*I:F=W.highest.height-P*I,u&&(F*=-1),b!==0&&!O.showLabelBackdrop&&(T+=I/2*Math.sin(b))):(M=$,F=(1-P)*I/2);let Q;if(O.showLabelBackdrop){const Se=st(O.backdropPadding),se=W.heights[A],Te=W.widths[A];let te=F-Se.top,be=0-Se.left;switch(U){case"middle":te-=se/2;break;case"bottom":te-=se;break}switch(m){case"center":be-=Te/2;break;case"right":be-=Te;break;case"inner":A===E-1?be-=Te:A>0&&(be-=Te/2);break}Q={left:be,top:te,width:Te+Se.width,height:se+Se.height,color:O.backdropColor}}y.push({label:k,font:L,textOffset:F,options:{rotation:b,color:le,strokeColor:N,strokeWidth:J,textAlign:ge,textBaseline:U,translation:[T,M],backdrop:Q}})}return y}_getXAxisLabelAlignment(){const{position:t,ticks:n}=this.options;if(-un(this.labelRotation))return t==="top"?"left":"right";let s="center";return n.align==="start"?s="left":n.align==="end"?s="right":n.align==="inner"&&(s="inner"),s}_getYAxisLabelAlignment(t){const{position:n,ticks:{crossAlign:i,mirror:s,padding:o}}=this.options,r=this._getLabelSizes(),a=t+o,l=r.widest.width;let c,d;return n==="left"?s?(d=this.right+o,i==="near"?c="left":i==="center"?(c="center",d+=l/2):(c="right",d+=l)):(d=this.right-a,i==="near"?c="right":i==="center"?(c="center",d-=l/2):(c="left",d=this.left)):n==="right"?s?(d=this.left+o,i==="near"?c="right":i==="center"?(c="center",d-=l/2):(c="left",d-=l)):(d=this.left+a,i==="near"?c="left":i==="center"?(c="center",d+=l/2):(c="right",d=this.right)):c="right",{textAlign:c,x:d}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,n=this.options.position;if(n==="left"||n==="right")return{top:0,left:this.left,bottom:t.height,right:this.right};if(n==="top"||n==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:t.width}}drawBackground(){const{ctx:t,options:{backgroundColor:n},left:i,top:s,width:o,height:r}=this;n&&(t.save(),t.fillStyle=n,t.fillRect(i,s,o,r),t.restore())}getLineWidthForValue(t){const n=this.options.grid;if(!this._isVisible()||!n.display)return 0;const s=this.ticks.findIndex(o=>o.value===t);return s>=0?n.setContext(this.getContext(s)).lineWidth:0}drawGrid(t){const n=this.options.grid,i=this.ctx,s=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let o,r;const a=(l,c,d)=>{!d.width||!d.color||(i.save(),i.lineWidth=d.width,i.strokeStyle=d.color,i.setLineDash(d.borderDash||[]),i.lineDashOffset=d.borderDashOffset,i.beginPath(),i.moveTo(l.x,l.y),i.lineTo(c.x,c.y),i.stroke(),i.restore())};if(n.display)for(o=0,r=s.length;o<r;++o){const l=s[o];n.drawOnChartArea&&a({x:l.x1,y:l.y1},{x:l.x2,y:l.y2},l),n.drawTicks&&a({x:l.tx1,y:l.ty1},{x:l.tx2,y:l.ty2},{color:l.tickColor,width:l.tickWidth,borderDash:l.tickBorderDash,borderDashOffset:l.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:n,options:{border:i,grid:s}}=this,o=i.setContext(this.getContext()),r=i.display?o.width:0;if(!r)return;const a=s.setContext(this.getContext(0)).lineWidth,l=this._borderValue;let c,d,u,h;this.isHorizontal()?(c=nn(t,this.left,r)-r/2,d=nn(t,this.right,a)+a/2,u=h=l):(u=nn(t,this.top,r)-r/2,h=nn(t,this.bottom,a)+a/2,c=d=l),n.save(),n.lineWidth=o.width,n.strokeStyle=o.color,n.beginPath(),n.moveTo(c,u),n.lineTo(d,h),n.stroke(),n.restore()}drawLabels(t){if(!this.options.ticks.display)return;const i=this.ctx,s=this._computeLabelArea();s&&Po(i,s);const o=this.getLabelItems(t);for(const r of o){const a=r.options,l=r.font,c=r.label,d=r.textOffset;uo(i,c,0,d,l,a)}s&&Do(i)}drawTitle(){const{ctx:t,options:{position:n,title:i,reverse:s}}=this;if(!i.display)return;const o=Ue(i.font),r=st(i.padding),a=i.align;let l=o.lineHeight/2;n==="bottom"||n==="center"||Z(n)?(l+=r.bottom,ke(i.text)&&(l+=o.lineHeight*(i.text.length-1))):l+=r.top;const{titleX:c,titleY:d,maxWidth:u,rotation:h}=M$(this,l,n,a);uo(t,i.text,0,0,o,{color:i.color,maxWidth:u,rotation:h,textAlign:L$(a,n,s),textBaseline:"middle",translation:[c,d]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,n=t.ticks&&t.ticks.z||0,i=X(t.grid&&t.grid.z,-1),s=X(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==ni.prototype.draw?[{z:n,draw:o=>{this.draw(o)}}]:[{z:i,draw:o=>{this.drawBackground(),this.drawGrid(o),this.drawTitle()}},{z:s,draw:()=>{this.drawBorder()}},{z:n,draw:o=>{this.drawLabels(o)}}]}getMatchingVisibleMetas(t){const n=this.chart.getSortedVisibleDatasetMetas(),i=this.axis+"AxisID",s=[];let o,r;for(o=0,r=n.length;o<r;++o){const a=n[o];a[i]===this.id&&(!t||a.type===t)&&s.push(a)}return s}_resolveTickFontOptions(t){const n=this.options.ticks.setContext(this.getContext(t));return Ue(n.font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class Ms{constructor(t,n,i){this.type=t,this.scope=n,this.override=i,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const n=Object.getPrototypeOf(t);let i;I$(n)&&(i=this.register(n));const s=this.items,o=t.id,r=this.scope+"."+o;if(!o)throw new Error("class does not have id: "+t);return o in s||(s[o]=t,P$(t,r,i),this.override&&me.override(t.id,t.overrides)),r}get(t){return this.items[t]}unregister(t){const n=this.items,i=t.id,s=this.scope;i in n&&delete n[i],s&&i in me[s]&&(delete me[s][i],this.override&&delete An[i])}}function P$(e,t,n){const i=Wi(Object.create(null),[n?me.get(n):{},me.get(t),e.defaults]);me.set(t,i),e.defaultRoutes&&D$(t,e.defaultRoutes),e.descriptors&&me.describe(t,e.descriptors)}function D$(e,t){Object.keys(t).forEach(n=>{const i=n.split("."),s=i.pop(),o=[e].concat(i).join("."),r=t[n].split("."),a=r.pop(),l=r.join(".");me.route(o,s,l,a)})}function I$(e){return"id"in e&&"defaults"in e}class O${constructor(){this.controllers=new Ms(Fi,"datasets",!0),this.elements=new Ms(Kt,"elements"),this.plugins=new Ms(Object,"plugins"),this.scales=new Ms(ni,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,n,i){[...n].forEach(s=>{const o=i||this._getRegistryForType(s);i||o.isForType(s)||o===this.plugins&&s.id?this._exec(t,o,s):re(s,r=>{const a=i||this._getRegistryForType(r);this._exec(t,a,r)})})}_exec(t,n,i){const s=gl(t);ue(i["before"+s],[],i),n[t](i),ue(i["after"+s],[],i)}_getRegistryForType(t){for(let n=0;n<this._typedRegistries.length;n++){const i=this._typedRegistries[n];if(i.isForType(t))return i}return this.plugins}_get(t,n,i){const s=n.get(t);if(s===void 0)throw new Error('"'+t+'" is not a registered '+i+".");return s}}var ht=new O$;class F${constructor(){this._init=void 0}notify(t,n,i,s){if(n==="beforeInit"&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install")),this._init===void 0)return;const o=s?this._descriptors(t).filter(s):this._descriptors(t),r=this._notify(o,t,n,i);return n==="afterDestroy"&&(this._notify(o,t,"stop"),this._notify(this._init,t,"uninstall"),this._init=void 0),r}_notify(t,n,i,s){s=s||{};for(const o of t){const r=o.plugin,a=r[i],l=[n,s,o.options];if(ue(a,l,r)===!1&&s.cancelable)return!1}return!0}invalidate(){ce(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const n=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),n}_createDescriptors(t,n){const i=t&&t.config,s=X(i.options&&i.options.plugins,{}),o=N$(i);return s===!1&&!n?[]:z$(t,o,s,n)}_notifyStateChanges(t){const n=this._oldCache||[],i=this._cache,s=(o,r)=>o.filter(a=>!r.some(l=>a.plugin.id===l.plugin.id));this._notify(s(n,i),t,"stop"),this._notify(s(i,n),t,"start")}}function N$(e){const t={},n=[],i=Object.keys(ht.plugins.items);for(let o=0;o<i.length;o++)n.push(ht.getPlugin(i[o]));const s=e.plugins||[];for(let o=0;o<s.length;o++){const r=s[o];n.indexOf(r)===-1&&(n.push(r),t[r.id]=!0)}return{plugins:n,localIds:t}}function B$(e,t){return!t&&e===!1?null:e===!0?{}:e}function z$(e,{plugins:t,localIds:n},i,s){const o=[],r=e.getContext();for(const a of t){const l=a.id,c=B$(i[l],s);c!==null&&o.push({plugin:a,options:H$(e.config,{plugin:a,local:n[l]},c,r)})}return o}function H$(e,{plugin:t,local:n},i,s){const o=e.pluginScopeKeys(t),r=e.getOptionScopes(i,o);return n&&t.defaults&&r.push(t.defaults),e.createResolver(r,s,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function fa(e,t){const n=me.datasets[e]||{};return((t.datasets||{})[e]||{}).indexAxis||t.indexAxis||n.indexAxis||"x"}function U$(e,t){let n=e;return e==="_index_"?n=t:e==="_value_"&&(n=t==="x"?"y":"x"),n}function j$(e,t){return e===t?"_index_":"_value_"}function iu(e){if(e==="x"||e==="y"||e==="r")return e}function q$(e){if(e==="top"||e==="bottom")return"x";if(e==="left"||e==="right")return"y"}function pa(e,...t){if(iu(e))return e;for(const n of t){const i=n.axis||q$(n.position)||e.length>1&&iu(e[0].toLowerCase());if(i)return i}throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`)}function su(e,t,n){if(n[t+"AxisID"]===e)return{axis:t}}function K$(e,t){if(t.data&&t.data.datasets){const n=t.data.datasets.filter(i=>i.xAxisID===e||i.yAxisID===e);if(n.length)return su(e,"x",n[0])||su(e,"y",n[0])}return{}}function W$(e,t){const n=An[e.type]||{scales:{}},i=t.scales||{},s=fa(e.type,t),o=Object.create(null);return Object.keys(i).forEach(r=>{const a=i[r];if(!Z(a))return console.error(`Invalid scale configuration for scale: ${r}`);if(a._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${r}`);const l=pa(r,a,K$(r,e),me.scales[a.type]),c=j$(l,s),d=n.scales||{};o[r]=Mi(Object.create(null),[{axis:l},a,d[l],d[c]])}),e.data.datasets.forEach(r=>{const a=r.type||e.type,l=r.indexAxis||fa(a,t),d=(An[a]||{}).scales||{};Object.keys(d).forEach(u=>{const h=U$(u,l),g=r[h+"AxisID"]||h;o[g]=o[g]||Object.create(null),Mi(o[g],[{axis:h},i[g],d[u]])})}),Object.keys(o).forEach(r=>{const a=o[r];Mi(a,[me.scales[a.type],me.scale])}),o}function cp(e){const t=e.options||(e.options={});t.plugins=X(t.plugins,{}),t.scales=W$(e,t)}function dp(e){return e=e||{},e.datasets=e.datasets||[],e.labels=e.labels||[],e}function V$(e){return e=e||{},e.data=dp(e.data),cp(e),e}const ou=new Map,up=new Set;function Ps(e,t){let n=ou.get(e);return n||(n=t(),ou.set(e,n),up.add(n)),n}const yi=(e,t,n)=>{const i=ao(t,n);i!==void 0&&e.add(i)};class G${constructor(t){this._config=V$(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=dp(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),cp(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return Ps(t,()=>[[`datasets.${t}`,""]])}datasetAnimationScopeKeys(t,n){return Ps(`${t}.transition.${n}`,()=>[[`datasets.${t}.transitions.${n}`,`transitions.${n}`],[`datasets.${t}`,""]])}datasetElementScopeKeys(t,n){return Ps(`${t}-${n}`,()=>[[`datasets.${t}.elements.${n}`,`datasets.${t}`,`elements.${n}`,""]])}pluginScopeKeys(t){const n=t.id,i=this.type;return Ps(`${i}-plugin-${n}`,()=>[[`plugins.${n}`,...t.additionalOptionScopes||[]]])}_cachedScopes(t,n){const i=this._scopeCache;let s=i.get(t);return(!s||n)&&(s=new Map,i.set(t,s)),s}getOptionScopes(t,n,i){const{options:s,type:o}=this,r=this._cachedScopes(t,i),a=r.get(n);if(a)return a;const l=new Set;n.forEach(d=>{t&&(l.add(t),d.forEach(u=>yi(l,t,u))),d.forEach(u=>yi(l,s,u)),d.forEach(u=>yi(l,An[o]||{},u)),d.forEach(u=>yi(l,me,u)),d.forEach(u=>yi(l,da,u))});const c=Array.from(l);return c.length===0&&c.push(Object.create(null)),up.has(n)&&r.set(n,c),c}chartOptionScopes(){const{options:t,type:n}=this;return[t,An[n]||{},me.datasets[n]||{},{type:n},me,da]}resolveNamedOptions(t,n,i,s=[""]){const o={$shared:!0},{resolver:r,subPrefixes:a}=ru(this._resolverCache,t,s);let l=r;if(Y$(r,n)){o.$shared=!1,i=qt(i)?i():i;const c=this.createResolver(t,i,a);l=Jn(r,i,c)}for(const c of n)o[c]=l[c];return o}createResolver(t,n,i=[""],s){const{resolver:o}=ru(this._resolverCache,t,i);return Z(n)?Jn(o,n,void 0,s):o}}function ru(e,t,n){let i=e.get(t);i||(i=new Map,e.set(t,i));const s=n.join();let o=i.get(s);return o||(o={resolver:yl(t,n),subPrefixes:n.filter(a=>!a.toLowerCase().includes("hover"))},i.set(s,o)),o}const Q$=e=>Z(e)&&Object.getOwnPropertyNames(e).some(t=>qt(e[t]));function Y$(e,t){const{isScriptable:n,isIndexable:i}=Kf(e);for(const s of t){const o=n(s),r=i(s),a=(r||o)&&e[s];if(o&&(qt(a)||Q$(a))||r&&ke(a))return!0}return!1}var X$="4.5.1";const J$=["top","bottom","left","right","chartArea"];function au(e,t){return e==="top"||e==="bottom"||J$.indexOf(e)===-1&&t==="x"}function lu(e,t){return function(n,i){return n[e]===i[e]?n[t]-i[t]:n[e]-i[e]}}function cu(e){const t=e.chart,n=t.options.animation;t.notifyPlugins("afterRender"),ue(n&&n.onComplete,[e],t)}function Z$(e){const t=e.chart,n=t.options.animation;ue(n&&n.onProgress,[e],t)}function hp(e){return xl()&&typeof e=="string"?e=document.getElementById(e):e&&e.length&&(e=e[0]),e&&e.canvas&&(e=e.canvas),e}const Ks={},du=e=>{const t=hp(e);return Object.values(Ks).filter(n=>n.canvas===t).pop()};function eS(e,t,n){const i=Object.keys(e);for(const s of i){const o=+s;if(o>=t){const r=e[s];delete e[s],(n>0||o>t)&&(e[o+n]=r)}}}function tS(e,t,n,i){return!n||e.type==="mouseout"?null:i?t:e}class mt{static register(...t){ht.add(...t),uu()}static unregister(...t){ht.remove(...t),uu()}constructor(t,n){const i=this.config=new G$(n),s=hp(t),o=du(s);if(o)throw new Error("Canvas is already in use. Chart with ID '"+o.id+"' must be destroyed before the canvas with ID '"+o.canvas.id+"' can be reused.");const r=i.createResolver(i.chartOptionScopes(),this.getContext());this.platform=new(i.platform||b$(s)),this.platform.updateConfig(i);const a=this.platform.acquireContext(s,r.aspectRatio),l=a&&a.canvas,c=l&&l.height,d=l&&l.width;if(this.id=a_(),this.ctx=a,this.canvas=l,this.width=d,this.height=c,this._options=r,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new F$,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=C_(u=>this.update(u),r.resizeDelay||0),this._dataChanges=[],Ks[this.id]=this,!a||!l){console.error("Failed to create chart: can't acquire context from the given item");return}St.listen(this,"complete",cu),St.listen(this,"progress",Z$),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:t,maintainAspectRatio:n},width:i,height:s,_aspectRatio:o}=this;return ce(t)?n&&o?o:s?i/s:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return ht}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():Od(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return Pd(this.canvas,this.ctx),this}stop(){return St.stop(this),this}resize(t,n){St.running(this)?this._resizeBeforeDraw={width:t,height:n}:this._resize(t,n)}_resize(t,n){const i=this.options,s=this.canvas,o=i.maintainAspectRatio&&this.aspectRatio,r=this.platform.getMaximumSize(s,t,n,o),a=i.devicePixelRatio||this.platform.getDevicePixelRatio(),l=this.width?"resize":"attach";this.width=r.width,this.height=r.height,this._aspectRatio=this.aspectRatio,Od(this,a,!0)&&(this.notifyPlugins("resize",{size:r}),ue(i.onResize,[this,r],this),this.attached&&this._doResize(l)&&this.render())}ensureScalesHaveIDs(){const n=this.options.scales||{};re(n,(i,s)=>{i.id=s})}buildOrUpdateScales(){const t=this.options,n=t.scales,i=this.scales,s=Object.keys(i).reduce((r,a)=>(r[a]=!1,r),{});let o=[];n&&(o=o.concat(Object.keys(n).map(r=>{const a=n[r],l=pa(r,a),c=l==="r",d=l==="x";return{options:a,dposition:c?"chartArea":d?"bottom":"left",dtype:c?"radialLinear":d?"category":"linear"}}))),re(o,r=>{const a=r.options,l=a.id,c=pa(l,a),d=X(a.type,r.dtype);(a.position===void 0||au(a.position,c)!==au(r.dposition))&&(a.position=r.dposition),s[l]=!0;let u=null;if(l in i&&i[l].type===d)u=i[l];else{const h=ht.getScale(d);u=new h({id:l,type:d,ctx:this.ctx,chart:this}),i[u.id]=u}u.init(a,t)}),re(s,(r,a)=>{r||delete i[a]}),re(i,r=>{It.configure(this,r,r.options),It.addBox(this,r)})}_updateMetasets(){const t=this._metasets,n=this.data.datasets.length,i=t.length;if(t.sort((s,o)=>s.index-o.index),i>n){for(let s=n;s<i;++s)this._destroyDatasetMeta(s);t.splice(n,i-n)}this._sortedMetasets=t.slice(0).sort(lu("order","index"))}_removeUnreferencedMetasets(){const{_metasets:t,data:{datasets:n}}=this;t.length>n.length&&delete this._stacks,t.forEach((i,s)=>{n.filter(o=>o===i._dataset).length===0&&this._destroyDatasetMeta(s)})}buildOrUpdateControllers(){const t=[],n=this.data.datasets;let i,s;for(this._removeUnreferencedMetasets(),i=0,s=n.length;i<s;i++){const o=n[i];let r=this.getDatasetMeta(i);const a=o.type||this.config.type;if(r.type&&r.type!==a&&(this._destroyDatasetMeta(i),r=this.getDatasetMeta(i)),r.type=a,r.indexAxis=o.indexAxis||fa(a,this.options),r.order=o.order||0,r.index=i,r.label=""+o.label,r.visible=this.isDatasetVisible(i),r.controller)r.controller.updateIndex(i),r.controller.linkScales();else{const l=ht.getController(a),{datasetElementType:c,dataElementType:d}=me.datasets[a];Object.assign(l,{dataElementType:ht.getElement(d),datasetElementType:c&&ht.getElement(c)}),r.controller=new l(this,i),t.push(r.controller)}}return this._updateMetasets(),t}_resetElements(){re(this.data.datasets,(t,n)=>{this.getDatasetMeta(n).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){const n=this.config;n.update();const i=this._options=n.createResolver(n.chartOptionScopes(),this.getContext()),s=this._animationsDisabled=!i.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0})===!1)return;const o=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let r=0;for(let c=0,d=this.data.datasets.length;c<d;c++){const{controller:u}=this.getDatasetMeta(c),h=!s&&o.indexOf(u)===-1;u.buildOrUpdateElements(h),r=Math.max(+u.getMaxOverflow(),r)}r=this._minPadding=i.layout.autoPadding?r:0,this._updateLayout(r),s||re(o,c=>{c.reset()}),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(lu("z","_idx"));const{_active:a,_lastEvent:l}=this;l?this._eventHandler(l,!0):a.length&&this._updateHoverStyles(a,a,!0),this.render()}_updateScales(){re(this.scales,t=>{It.removeBox(this,t)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const t=this.options,n=new Set(Object.keys(this._listeners)),i=new Set(t.events);(!kd(n,i)||!!this._responsiveListeners!==t.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:t}=this,n=this._getUniformDataChanges()||[];for(const{method:i,start:s,count:o}of n){const r=i==="_removeElements"?-o:o;eS(t,s,r)}}_getUniformDataChanges(){const t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];const n=this.data.datasets.length,i=o=>new Set(t.filter(r=>r[0]===o).map((r,a)=>a+","+r.splice(1).join(","))),s=i(0);for(let o=1;o<n;o++)if(!kd(s,i(o)))return;return Array.from(s).map(o=>o.split(",")).map(o=>({method:o[1],start:+o[2],count:+o[3]}))}_updateLayout(t){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;It.update(this,this.width,this.height,t);const n=this.chartArea,i=n.width<=0||n.height<=0;this._layers=[],re(this.boxes,s=>{i&&s.position==="chartArea"||(s.configure&&s.configure(),this._layers.push(...s._layers()))},this),this._layers.forEach((s,o)=>{s._idx=o}),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})!==!1){for(let n=0,i=this.data.datasets.length;n<i;++n)this.getDatasetMeta(n).controller.configure();for(let n=0,i=this.data.datasets.length;n<i;++n)this._updateDataset(n,qt(t)?t({datasetIndex:n}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,n){const i=this.getDatasetMeta(t),s={meta:i,index:t,mode:n,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",s)!==!1&&(i.controller._update(n),s.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",s))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(St.has(this)?this.attached&&!St.running(this)&&St.start(this):(this.draw(),cu({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){const{width:i,height:s}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(i,s)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const n=this._layers;for(t=0;t<n.length&&n[t].z<=0;++t)n[t].draw(this.chartArea);for(this._drawDatasets();t<n.length;++t)n[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){const n=this._sortedMetasets,i=[];let s,o;for(s=0,o=n.length;s<o;++s){const r=n[s];(!t||r.visible)&&i.push(r)}return i}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const t=this.getSortedVisibleDatasetMetas();for(let n=t.length-1;n>=0;--n)this._drawDataset(t[n]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){const n=this.ctx,i={meta:t,index:t.index,cancelable:!0},s=tp(this,t);this.notifyPlugins("beforeDatasetDraw",i)!==!1&&(s&&Po(n,s),t.controller.draw(),s&&Do(n),i.cancelable=!1,this.notifyPlugins("afterDatasetDraw",i))}isPointInArea(t){return Gi(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,n,i,s){const o=Jk.modes[n];return typeof o=="function"?o(this,t,i,s):[]}getDatasetMeta(t){const n=this.data.datasets[t],i=this._metasets;let s=i.filter(o=>o&&o._dataset===n).pop();return s||(s={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:n&&n.order||0,index:t,_dataset:n,_parsed:[],_sorted:!1},i.push(s)),s}getContext(){return this.$context||(this.$context=Rn(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){const n=this.data.datasets[t];if(!n)return!1;const i=this.getDatasetMeta(t);return typeof i.hidden=="boolean"?!i.hidden:!n.hidden}setDatasetVisibility(t,n){const i=this.getDatasetMeta(t);i.hidden=!n}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,n,i){const s=i?"show":"hide",o=this.getDatasetMeta(t),r=o.controller._resolveAnimations(void 0,s);lo(n)?(o.data[n].hidden=!i,this.update()):(this.setDatasetVisibility(t,i),r.update(o,{visible:i}),this.update(a=>a.datasetIndex===t?s:void 0))}hide(t,n){this._updateVisibility(t,n,!1)}show(t,n){this._updateVisibility(t,n,!0)}_destroyDatasetMeta(t){const n=this._metasets[t];n&&n.controller&&n.controller._destroy(),delete this._metasets[t]}_stop(){let t,n;for(this.stop(),St.remove(this),t=0,n=this.data.datasets.length;t<n;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:t,ctx:n}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),Pd(t,n),this.platform.releaseContext(n),this.canvas=null,this.ctx=null),delete Ks[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const t=this._listeners,n=this.platform,i=(o,r)=>{n.addEventListener(this,o,r),t[o]=r},s=(o,r,a)=>{o.offsetX=r,o.offsetY=a,this._eventHandler(o)};re(this.options.events,o=>i(o,s))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const t=this._responsiveListeners,n=this.platform,i=(l,c)=>{n.addEventListener(this,l,c),t[l]=c},s=(l,c)=>{t[l]&&(n.removeEventListener(this,l,c),delete t[l])},o=(l,c)=>{this.canvas&&this.resize(l,c)};let r;const a=()=>{s("attach",a),this.attached=!0,this.resize(),i("resize",o),i("detach",r)};r=()=>{this.attached=!1,s("resize",o),this._stop(),this._resize(0,0),i("attach",a)},n.isAttached(this.canvas)?a():r()}unbindEvents(){re(this._listeners,(t,n)=>{this.platform.removeEventListener(this,n,t)}),this._listeners={},re(this._responsiveListeners,(t,n)=>{this.platform.removeEventListener(this,n,t)}),this._responsiveListeners=void 0}updateHoverStyle(t,n,i){const s=i?"set":"remove";let o,r,a,l;for(n==="dataset"&&(o=this.getDatasetMeta(t[0].datasetIndex),o.controller["_"+s+"DatasetHoverStyle"]()),a=0,l=t.length;a<l;++a){r=t[a];const c=r&&this.getDatasetMeta(r.datasetIndex).controller;c&&c[s+"HoverStyle"](r.element,r.datasetIndex,r.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){const n=this._active||[],i=t.map(({datasetIndex:o,index:r})=>{const a=this.getDatasetMeta(o);if(!a)throw new Error("No dataset found at index "+o);return{datasetIndex:o,element:a.data[r],index:r}});!oo(i,n)&&(this._active=i,this._lastEvent=null,this._updateHoverStyles(i,n))}notifyPlugins(t,n,i){return this._plugins.notify(this,t,n,i)}isPluginEnabled(t){return this._plugins._cache.filter(n=>n.plugin.id===t).length===1}_updateHoverStyles(t,n,i){const s=this.options.hover,o=(l,c)=>l.filter(d=>!c.some(u=>d.datasetIndex===u.datasetIndex&&d.index===u.index)),r=o(n,t),a=i?t:o(t,n);r.length&&this.updateHoverStyle(r,s.mode,!1),a.length&&s.mode&&this.updateHoverStyle(a,s.mode,!0)}_eventHandler(t,n){const i={event:t,replay:n,cancelable:!0,inChartArea:this.isPointInArea(t)},s=r=>(r.options.events||this.options.events).includes(t.native.type);if(this.notifyPlugins("beforeEvent",i,s)===!1)return;const o=this._handleEvent(t,n,i.inChartArea);return i.cancelable=!1,this.notifyPlugins("afterEvent",i,s),(o||i.changed)&&this.render(),this}_handleEvent(t,n,i){const{_active:s=[],options:o}=this,r=n,a=this._getActiveElements(t,s,i,r),l=f_(t),c=tS(t,this._lastEvent,i,l);i&&(this._lastEvent=null,ue(o.onHover,[t,a,this],this),l&&ue(o.onClick,[t,a,this],this));const d=!oo(a,s);return(d||n)&&(this._active=a,this._updateHoverStyles(a,s,n)),this._lastEvent=c,d}_getActiveElements(t,n,i,s){if(t.type==="mouseout")return[];if(!i)return n;const o=this.options.hover;return this.getElementsAtEventForMode(t,o.mode,o,s)}}B(mt,"defaults",me),B(mt,"instances",Ks),B(mt,"overrides",An),B(mt,"registry",ht),B(mt,"version",X$),B(mt,"getChart",du);function uu(){return re(mt.instances,e=>e._plugins.invalidate())}function fp(e,t,n=t){e.lineCap=X(n.borderCapStyle,t.borderCapStyle),e.setLineDash(X(n.borderDash,t.borderDash)),e.lineDashOffset=X(n.borderDashOffset,t.borderDashOffset),e.lineJoin=X(n.borderJoinStyle,t.borderJoinStyle),e.lineWidth=X(n.borderWidth,t.borderWidth),e.strokeStyle=X(n.borderColor,t.borderColor)}function nS(e,t,n){e.lineTo(n.x,n.y)}function iS(e){return e.stepped?U_:e.tension||e.cubicInterpolationMode==="monotone"?j_:nS}function pp(e,t,n={}){const i=e.length,{start:s=0,end:o=i-1}=n,{start:r,end:a}=t,l=Math.max(s,r),c=Math.min(o,a),d=s<r&&o<r||s>a&&o>a;return{count:i,start:l,loop:t.loop,ilen:c<l&&!d?i+c-l:c-l}}function sS(e,t,n,i){const{points:s,options:o}=t,{count:r,start:a,loop:l,ilen:c}=pp(s,n,i),d=iS(o);let{move:u=!0,reverse:h}=i||{},g,v,b;for(g=0;g<=c;++g)v=s[(a+(h?c-g:g))%r],!v.skip&&(u?(e.moveTo(v.x,v.y),u=!1):d(e,b,v,h,o.stepped),b=v);return l&&(v=s[(a+(h?c:0))%r],d(e,b,v,h,o.stepped)),!!l}function oS(e,t,n,i){const s=t.points,{count:o,start:r,ilen:a}=pp(s,n,i),{move:l=!0,reverse:c}=i||{};let d=0,u=0,h,g,v,b,y,A;const E=k=>(r+(c?a-k:k))%o,R=()=>{b!==y&&(e.lineTo(d,y),e.lineTo(d,b),e.lineTo(d,A))};for(l&&(g=s[E(0)],e.moveTo(g.x,g.y)),h=0;h<=a;++h){if(g=s[E(h)],g.skip)continue;const k=g.x,T=g.y,M=k|0;M===v?(T<b?b=T:T>y&&(y=T),d=(u*d+k)/++u):(R(),e.lineTo(k,T),v=M,u=0,b=y=T),A=T}R()}function ga(e){const t=e.options,n=t.borderDash&&t.borderDash.length;return!e._decimated&&!e._loop&&!t.tension&&t.cubicInterpolationMode!=="monotone"&&!t.stepped&&!n?oS:sS}function rS(e){return e.stepped?_k:e.tension||e.cubicInterpolationMode==="monotone"?kk:an}function aS(e,t,n,i){let s=t._path;s||(s=t._path=new Path2D,t.path(s,n,i)&&s.closePath()),fp(e,t.options),e.stroke(s)}function lS(e,t,n,i){const{segments:s,options:o}=t,r=ga(t);for(const a of s)fp(e,o,a.style),e.beginPath(),r(e,t,a,{start:n,end:n+i-1})&&e.closePath(),e.stroke()}const cS=typeof Path2D=="function";function dS(e,t,n,i){cS&&!t.options.segment?aS(e,t,n,i):lS(e,t,n,i)}class Ot extends Kt{constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,n){const i=this.options;if((i.tension||i.cubicInterpolationMode==="monotone")&&!i.stepped&&!this._pointsUpdated){const s=i.spanGaps?this._loop:this._fullLoop;pk(this._points,i,t,s,n),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=Ek(this,this.options.segment))}first(){const t=this.segments,n=this.points;return t.length&&n[t[0].start]}last(){const t=this.segments,n=this.points,i=t.length;return i&&n[t[i-1].end]}interpolate(t,n){const i=this.options,s=t[n],o=this.points,r=ep(this,{property:n,start:s,end:s});if(!r.length)return;const a=[],l=rS(i);let c,d;for(c=0,d=r.length;c<d;++c){const{start:u,end:h}=r[c],g=o[u],v=o[h];if(g===v){a.push(g);continue}const b=Math.abs((s-g[n])/(v[n]-g[n])),y=l(g,v,b,i.stepped);y[n]=t[n],a.push(y)}return a.length===1?a[0]:a}pathSegment(t,n,i){return ga(this)(t,this,n,i)}path(t,n,i){const s=this.segments,o=ga(this);let r=this._loop;n=n||0,i=i||this.points.length-n;for(const a of s)r&=o(t,this,a,{start:n,end:n+i-1});return!!r}draw(t,n,i,s){const o=this.options||{};(this.points||[]).length&&o.borderWidth&&(t.save(),dS(t,this,i,s),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}B(Ot,"id","line"),B(Ot,"defaults",{borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0}),B(Ot,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"}),B(Ot,"descriptors",{_scriptable:!0,_indexable:t=>t!=="borderDash"&&t!=="fill"});function hu(e,t,n,i){const s=e.options,{[n]:o}=e.getProps([n],i);return Math.abs(t-o)<s.radius+s.hitRadius}class Ws extends Kt{constructor(n){super();B(this,"parsed");B(this,"skip");B(this,"stop");this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,n&&Object.assign(this,n)}inRange(n,i,s){const o=this.options,{x:r,y:a}=this.getProps(["x","y"],s);return Math.pow(n-r,2)+Math.pow(i-a,2)<Math.pow(o.hitRadius+o.radius,2)}inXRange(n,i){return hu(this,n,"x",i)}inYRange(n,i){return hu(this,n,"y",i)}getCenterPoint(n){const{x:i,y:s}=this.getProps(["x","y"],n);return{x:i,y:s}}size(n){n=n||this.options||{};let i=n.radius||0;i=Math.max(i,i&&n.hoverRadius||0);const s=i&&n.borderWidth||0;return(i+s)*2}draw(n,i){const s=this.options;this.skip||s.radius<.1||!Gi(this,i,this.size(s)/2)||(n.strokeStyle=s.borderColor,n.lineWidth=s.borderWidth,n.fillStyle=s.backgroundColor,ua(n,s,this.x,this.y))}getRange(){const n=this.options||{};return n.radius+n.hitRadius}}B(Ws,"id","point"),B(Ws,"defaults",{borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0}),B(Ws,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});function uS(e,t,n){const i=e.segments,s=e.points,o=t.points,r=[];for(const a of i){let{start:l,end:c}=a;c=Fo(l,c,s);const d=ma(n,s[l],s[c],a.loop);if(!t.segments){r.push({source:a,target:d,start:s[l],end:s[c]});continue}const u=ep(t,d);for(const h of u){const g=ma(n,o[h.start],o[h.end],h.loop),v=Zf(a,s,g);for(const b of v)r.push({source:b,target:h,start:{[n]:fu(d,g,"start",Math.max)},end:{[n]:fu(d,g,"end",Math.min)}})}}return r}function ma(e,t,n,i){if(i)return;let s=t[e],o=n[e];return e==="angle"&&(s=pt(s),o=pt(o)),{property:e,start:s,end:o}}function hS(e,t){const{x:n=null,y:i=null}=e||{},s=t.points,o=[];return t.segments.forEach(({start:r,end:a})=>{a=Fo(r,a,s);const l=s[r],c=s[a];i!==null?(o.push({x:l.x,y:i}),o.push({x:c.x,y:i})):n!==null&&(o.push({x:n,y:l.y}),o.push({x:n,y:c.y}))}),o}function Fo(e,t,n){for(;t>e;t--){const i=n[t];if(!isNaN(i.x)&&!isNaN(i.y))break}return t}function fu(e,t,n,i){return e&&t?i(e[n],t[n]):e?e[n]:t?t[n]:0}function gp(e,t){let n=[],i=!1;return ke(e)?(i=!0,n=e):n=hS(e,t),n.length?new Ot({points:n,options:{tension:0},_loop:i,_fullLoop:i}):null}function pu(e){return e&&e.fill!==!1}function fS(e,t,n){let s=e[t].fill;const o=[t];let r;if(!n)return s;for(;s!==!1&&o.indexOf(s)===-1;){if(!Me(s))return s;if(r=e[s],!r)return!1;if(r.visible)return s;o.push(s),s=r.fill}return!1}function pS(e,t,n){const i=yS(e);if(Z(i))return isNaN(i.value)?!1:i;let s=parseFloat(i);return Me(s)&&Math.floor(s)===s?gS(i[0],t,s,n):["origin","start","end","stack","shape"].indexOf(i)>=0&&i}function gS(e,t,n,i){return(e==="-"||e==="+")&&(n=t+n),n===t||n<0||n>=i?!1:n}function mS(e,t){let n=null;return e==="start"?n=t.bottom:e==="end"?n=t.top:Z(e)?n=t.getPixelForValue(e.value):t.getBasePixel&&(n=t.getBasePixel()),n}function vS(e,t,n){let i;return e==="start"?i=n:e==="end"?i=t.options.reverse?t.min:t.max:Z(e)?i=e.value:i=t.getBaseValue(),i}function yS(e){const t=e.options,n=t.fill;let i=X(n&&n.target,n);return i===void 0&&(i=!!t.backgroundColor),i===!1||i===null?!1:i===!0?"origin":i}function bS(e){const{scale:t,index:n,line:i}=e,s=[],o=i.segments,r=i.points,a=wS(t,n);a.push(gp({x:null,y:t.bottom},i));for(let l=0;l<o.length;l++){const c=o[l];for(let d=c.start;d<=c.end;d++)xS(s,r[d],a)}return new Ot({points:s,options:{}})}function wS(e,t){const n=[],i=e.getMatchingVisibleMetas("line");for(let s=0;s<i.length;s++){const o=i[s];if(o.index===t)break;o.hidden||n.unshift(o.dataset)}return n}function xS(e,t,n){const i=[];for(let s=0;s<n.length;s++){const o=n[s],{first:r,last:a,point:l}=_S(o,t,"x");if(!(!l||r&&a)){if(r)i.unshift(l);else if(e.push(l),!a)break}}e.push(...i)}function _S(e,t,n){const i=e.interpolate(t,n);if(!i)return{};const s=i[n],o=e.segments,r=e.points;let a=!1,l=!1;for(let c=0;c<o.length;c++){const d=o[c],u=r[d.start][n],h=r[d.end][n];if(Hn(s,u,h)){a=s===u,l=s===h;break}}return{first:a,last:l,point:i}}class mp{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,n,i){const{x:s,y:o,radius:r}=this;return n=n||{start:0,end:nt},t.arc(s,o,r,n.end,n.start,!0),!i.bounds}interpolate(t){const{x:n,y:i,radius:s}=this,o=t.angle;return{x:n+Math.cos(o)*s,y:i+Math.sin(o)*s,angle:o}}}function kS(e){const{chart:t,fill:n,line:i}=e;if(Me(n))return $S(t,n);if(n==="stack")return bS(e);if(n==="shape")return!0;const s=SS(e);return s instanceof mp?s:gp(s,i)}function $S(e,t){const n=e.getDatasetMeta(t);return n&&e.isDatasetVisible(t)?n.dataset:null}function SS(e){return(e.scale||{}).getPointPositionForValue?TS(e):AS(e)}function AS(e){const{scale:t={},fill:n}=e,i=mS(n,t);if(Me(i)){const s=t.isHorizontal();return{x:s?i:null,y:s?null:i}}return null}function TS(e){const{scale:t,fill:n}=e,i=t.options,s=t.getLabels().length,o=i.reverse?t.max:t.min,r=vS(n,t,o),a=[];if(i.grid.circular){const l=t.getPointPositionForValue(0,o);return new mp({x:l.x,y:l.y,radius:t.getDistanceFromCenterForValue(r)})}for(let l=0;l<s;++l)a.push(t.getPointPositionForValue(l,r));return a}function Lr(e,t,n){const i=kS(t),{chart:s,index:o,line:r,scale:a,axis:l}=t,c=r.options,d=c.fill,u=c.backgroundColor,{above:h=u,below:g=u}=d||{},v=s.getDatasetMeta(o),b=tp(s,v);i&&r.points.length&&(Po(e,n),CS(e,{line:r,target:i,above:h,below:g,area:n,scale:a,axis:l,clip:b}),Do(e))}function CS(e,t){const{line:n,target:i,above:s,below:o,area:r,scale:a,clip:l}=t,c=n._loop?"angle":t.axis;e.save();let d=o;o!==s&&(c==="x"?(gu(e,i,r.top),Mr(e,{line:n,target:i,color:s,scale:a,property:c,clip:l}),e.restore(),e.save(),gu(e,i,r.bottom)):c==="y"&&(mu(e,i,r.left),Mr(e,{line:n,target:i,color:o,scale:a,property:c,clip:l}),e.restore(),e.save(),mu(e,i,r.right),d=s)),Mr(e,{line:n,target:i,color:d,scale:a,property:c,clip:l}),e.restore()}function gu(e,t,n){const{segments:i,points:s}=t;let o=!0,r=!1;e.beginPath();for(const a of i){const{start:l,end:c}=a,d=s[l],u=s[Fo(l,c,s)];o?(e.moveTo(d.x,d.y),o=!1):(e.lineTo(d.x,n),e.lineTo(d.x,d.y)),r=!!t.pathSegment(e,a,{move:r}),r?e.closePath():e.lineTo(u.x,n)}e.lineTo(t.first().x,n),e.closePath(),e.clip()}function mu(e,t,n){const{segments:i,points:s}=t;let o=!0,r=!1;e.beginPath();for(const a of i){const{start:l,end:c}=a,d=s[l],u=s[Fo(l,c,s)];o?(e.moveTo(d.x,d.y),o=!1):(e.lineTo(n,d.y),e.lineTo(d.x,d.y)),r=!!t.pathSegment(e,a,{move:r}),r?e.closePath():e.lineTo(n,u.y)}e.lineTo(n,t.first().y),e.closePath(),e.clip()}function Mr(e,t){const{line:n,target:i,property:s,color:o,scale:r,clip:a}=t,l=uS(n,i,s);for(const{source:c,target:d,start:u,end:h}of l){const{style:{backgroundColor:g=o}={}}=c,v=i!==!0;e.save(),e.fillStyle=g,ES(e,r,a,v&&ma(s,u,h)),e.beginPath();const b=!!n.pathSegment(e,c);let y;if(v){b?e.closePath():vu(e,i,h,s);const A=!!i.pathSegment(e,d,{move:b,reverse:!0});y=b&&A,y||vu(e,i,u,s)}e.closePath(),e.fill(y?"evenodd":"nonzero"),e.restore()}}function ES(e,t,n,i){const s=t.chart.chartArea,{property:o,start:r,end:a}=i||{};if(o==="x"||o==="y"){let l,c,d,u;o==="x"?(l=r,c=s.top,d=a,u=s.bottom):(l=s.left,c=r,d=s.right,u=a),e.beginPath(),n&&(l=Math.max(l,n.left),d=Math.min(d,n.right),c=Math.max(c,n.top),u=Math.min(u,n.bottom)),e.rect(l,c,d-l,u-c),e.clip()}}function vu(e,t,n,i){const s=t.interpolate(n,i);s&&e.lineTo(s.x,s.y)}var RS={id:"filler",afterDatasetsUpdate(e,t,n){const i=(e.data.datasets||[]).length,s=[];let o,r,a,l;for(r=0;r<i;++r)o=e.getDatasetMeta(r),a=o.dataset,l=null,a&&a.options&&a instanceof Ot&&(l={visible:e.isDatasetVisible(r),index:r,fill:pS(a,r,i),chart:e,axis:o.controller.options.indexAxis,scale:o.vScale,line:a}),o.$filler=l,s.push(l);for(r=0;r<i;++r)l=s[r],!(!l||l.fill===!1)&&(l.fill=fS(s,r,n.propagate))},beforeDraw(e,t,n){const i=n.drawTime==="beforeDraw",s=e.getSortedVisibleDatasetMetas(),o=e.chartArea;for(let r=s.length-1;r>=0;--r){const a=s[r].$filler;a&&(a.line.updateControlPoints(o,a.axis),i&&a.fill&&Lr(e.ctx,a,o))}},beforeDatasetsDraw(e,t,n){if(n.drawTime!=="beforeDatasetsDraw")return;const i=e.getSortedVisibleDatasetMetas();for(let s=i.length-1;s>=0;--s){const o=i[s].$filler;pu(o)&&Lr(e.ctx,o,e.chartArea)}},beforeDatasetDraw(e,t,n){const i=t.meta.$filler;!pu(i)||n.drawTime!=="beforeDatasetDraw"||Lr(e.ctx,i,e.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const yu=(e,t)=>{let{boxHeight:n=t,boxWidth:i=t}=e;return e.usePointStyle&&(n=Math.min(n,t),i=e.pointStyleWidth||Math.min(i,t)),{boxWidth:i,boxHeight:n,itemHeight:Math.max(t,n)}},LS=(e,t)=>e!==null&&t!==null&&e.datasetIndex===t.datasetIndex&&e.index===t.index;class bu extends Kt{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,n,i){this.maxWidth=t,this.maxHeight=n,this._margins=i,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const t=this.options.labels||{};let n=ue(t.generateLabels,[this.chart],this)||[];t.filter&&(n=n.filter(i=>t.filter(i,this.chart.data))),t.sort&&(n=n.sort((i,s)=>t.sort(i,s,this.chart.data))),this.options.reverse&&n.reverse(),this.legendItems=n}fit(){const{options:t,ctx:n}=this;if(!t.display){this.width=this.height=0;return}const i=t.labels,s=Ue(i.font),o=s.size,r=this._computeTitleHeight(),{boxWidth:a,itemHeight:l}=yu(i,o);let c,d;n.font=s.string,this.isHorizontal()?(c=this.maxWidth,d=this._fitRows(r,o,a,l)+10):(d=this.maxHeight,c=this._fitCols(r,s,a,l)+10),this.width=Math.min(c,t.maxWidth||this.maxWidth),this.height=Math.min(d,t.maxHeight||this.maxHeight)}_fitRows(t,n,i,s){const{ctx:o,maxWidth:r,options:{labels:{padding:a}}}=this,l=this.legendHitBoxes=[],c=this.lineWidths=[0],d=s+a;let u=t;o.textAlign="left",o.textBaseline="middle";let h=-1,g=-d;return this.legendItems.forEach((v,b)=>{const y=i+n/2+o.measureText(v.text).width;(b===0||c[c.length-1]+y+2*a>r)&&(u+=d,c[c.length-(b>0?0:1)]=0,g+=d,h++),l[b]={left:0,top:g,row:h,width:y,height:s},c[c.length-1]+=y+a}),u}_fitCols(t,n,i,s){const{ctx:o,maxHeight:r,options:{labels:{padding:a}}}=this,l=this.legendHitBoxes=[],c=this.columnSizes=[],d=r-t;let u=a,h=0,g=0,v=0,b=0;return this.legendItems.forEach((y,A)=>{const{itemWidth:E,itemHeight:R}=MS(i,n,o,y,s);A>0&&g+R+2*a>d&&(u+=h+a,c.push({width:h,height:g}),v+=h+a,b++,h=g=0),l[A]={left:v,top:g,col:b,width:E,height:R},h=Math.max(h,E),g+=R+a}),u+=h,c.push({width:h,height:g}),u}adjustHitBoxes(){if(!this.options.display)return;const t=this._computeTitleHeight(),{legendHitBoxes:n,options:{align:i,labels:{padding:s},rtl:o}}=this,r=jn(o,this.left,this.width);if(this.isHorizontal()){let a=0,l=je(i,this.left+s,this.right-this.lineWidths[a]);for(const c of n)a!==c.row&&(a=c.row,l=je(i,this.left+s,this.right-this.lineWidths[a])),c.top+=this.top+t+s,c.left=r.leftForLtr(r.x(l),c.width),l+=c.width+s}else{let a=0,l=je(i,this.top+t+s,this.bottom-this.columnSizes[a].height);for(const c of n)c.col!==a&&(a=c.col,l=je(i,this.top+t+s,this.bottom-this.columnSizes[a].height)),c.top=l,c.left+=this.left+s,c.left=r.leftForLtr(r.x(c.left),c.width),l+=c.height+s}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const t=this.ctx;Po(t,this),this._draw(),Do(t)}}_draw(){const{options:t,columnSizes:n,lineWidths:i,ctx:s}=this,{align:o,labels:r}=t,a=me.color,l=jn(t.rtl,this.left,this.width),c=Ue(r.font),{padding:d}=r,u=c.size,h=u/2;let g;this.drawTitle(),s.textAlign=l.textAlign("left"),s.textBaseline="middle",s.lineWidth=.5,s.font=c.string;const{boxWidth:v,boxHeight:b,itemHeight:y}=yu(r,u),A=function(M,m,$){if(isNaN(v)||v<=0||isNaN(b)||b<0)return;s.save();const L=X($.lineWidth,1);if(s.fillStyle=X($.fillStyle,a),s.lineCap=X($.lineCap,"butt"),s.lineDashOffset=X($.lineDashOffset,0),s.lineJoin=X($.lineJoin,"miter"),s.lineWidth=L,s.strokeStyle=X($.strokeStyle,a),s.setLineDash(X($.lineDash,[])),r.usePointStyle){const I={radius:b*Math.SQRT2/2,pointStyle:$.pointStyle,rotation:$.rotation,borderWidth:L},P=l.xPlus(M,v/2),F=m+h;jf(s,I,P,F,r.pointStyleWidth&&v)}else{const I=m+Math.max((u-b)/2,0),P=l.leftForLtr(M,v),F=Oi($.borderRadius);s.beginPath(),Object.values(F).some(U=>U!==0)?ha(s,{x:P,y:I,w:v,h:b,radius:F}):s.rect(P,I,v,b),s.fill(),L!==0&&s.stroke()}s.restore()},E=function(M,m,$){uo(s,$.text,M,m+y/2,c,{strikethrough:$.hidden,textAlign:l.textAlign($.textAlign)})},R=this.isHorizontal(),k=this._computeTitleHeight();R?g={x:je(o,this.left+d,this.right-i[0]),y:this.top+d+k,line:0}:g={x:this.left+d,y:je(o,this.top+k+d,this.bottom-n[0].height),line:0},Yf(this.ctx,t.textDirection);const T=y+d;this.legendItems.forEach((M,m)=>{s.strokeStyle=M.fontColor,s.fillStyle=M.fontColor;const $=s.measureText(M.text).width,L=l.textAlign(M.textAlign||(M.textAlign=r.textAlign)),I=v+h+$;let P=g.x,F=g.y;l.setWidth(this.width),R?m>0&&P+I+d>this.right&&(F=g.y+=T,g.line++,P=g.x=je(o,this.left+d,this.right-i[g.line])):m>0&&F+T>this.bottom&&(P=g.x=P+n[g.line].width+d,g.line++,F=g.y=je(o,this.top+k+d,this.bottom-n[g.line].height));const U=l.x(P);if(A(U,F,M),P=E_(L,P+v+h,R?P+I:this.right,t.rtl),E(l.x(P),F,M),R)g.x+=I+d;else if(typeof M.text!="string"){const W=c.lineHeight;g.y+=vp(M,W)+d}else g.y+=T}),Xf(this.ctx,t.textDirection)}drawTitle(){const t=this.options,n=t.title,i=Ue(n.font),s=st(n.padding);if(!n.display)return;const o=jn(t.rtl,this.left,this.width),r=this.ctx,a=n.position,l=i.size/2,c=s.top+l;let d,u=this.left,h=this.width;if(this.isHorizontal())h=Math.max(...this.lineWidths),d=this.top+c,u=je(t.align,u,this.right-h);else{const v=this.columnSizes.reduce((b,y)=>Math.max(b,y.height),0);d=c+je(t.align,this.top,this.bottom-v-t.labels.padding-this._computeTitleHeight())}const g=je(a,u,u+h);r.textAlign=o.textAlign(zf(a)),r.textBaseline="middle",r.strokeStyle=n.color,r.fillStyle=n.color,r.font=i.string,uo(r,n.text,g,d,i)}_computeTitleHeight(){const t=this.options.title,n=Ue(t.font),i=st(t.padding);return t.display?n.lineHeight+i.height:0}_getLegendItemAt(t,n){let i,s,o;if(Hn(t,this.left,this.right)&&Hn(n,this.top,this.bottom)){for(o=this.legendHitBoxes,i=0;i<o.length;++i)if(s=o[i],Hn(t,s.left,s.left+s.width)&&Hn(n,s.top,s.top+s.height))return this.legendItems[i]}return null}handleEvent(t){const n=this.options;if(!IS(t.type,n))return;const i=this._getLegendItemAt(t.x,t.y);if(t.type==="mousemove"||t.type==="mouseout"){const s=this._hoveredItem,o=LS(s,i);s&&!o&&ue(n.onLeave,[t,s,this],this),this._hoveredItem=i,i&&!o&&ue(n.onHover,[t,i,this],this)}else i&&ue(n.onClick,[t,i,this],this)}}function MS(e,t,n,i,s){const o=PS(i,e,t,n),r=DS(s,i,t.lineHeight);return{itemWidth:o,itemHeight:r}}function PS(e,t,n,i){let s=e.text;return s&&typeof s!="string"&&(s=s.reduce((o,r)=>o.length>r.length?o:r)),t+n.size/2+i.measureText(s).width}function DS(e,t,n){let i=e;return typeof t.text!="string"&&(i=vp(t,n)),i}function vp(e,t){const n=e.text?e.text.length:0;return t*n}function IS(e,t){return!!((e==="mousemove"||e==="mouseout")&&(t.onHover||t.onLeave)||t.onClick&&(e==="click"||e==="mouseup"))}var OS={id:"legend",_element:bu,start(e,t,n){const i=e.legend=new bu({ctx:e.ctx,options:n,chart:e});It.configure(e,i,n),It.addBox(e,i)},stop(e){It.removeBox(e,e.legend),delete e.legend},beforeUpdate(e,t,n){const i=e.legend;It.configure(e,i,n),i.options=n},afterUpdate(e){const t=e.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(e,t){t.replay||e.legend.handleEvent(t.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(e,t,n){const i=t.datasetIndex,s=n.chart;s.isDatasetVisible(i)?(s.hide(i),t.hidden=!0):(s.show(i),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:e=>e.chart.options.color,boxWidth:40,padding:10,generateLabels(e){const t=e.data.datasets,{labels:{usePointStyle:n,pointStyle:i,textAlign:s,color:o,useBorderRadius:r,borderRadius:a}}=e.legend.options;return e._getSortedDatasetMetas().map(l=>{const c=l.controller.getStyle(n?0:void 0),d=st(c.borderWidth);return{text:t[l.index].label,fillStyle:c.backgroundColor,fontColor:o,hidden:!l.visible,lineCap:c.borderCapStyle,lineDash:c.borderDash,lineDashOffset:c.borderDashOffset,lineJoin:c.borderJoinStyle,lineWidth:(d.width+d.height)/4,strokeStyle:c.borderColor,pointStyle:i||c.pointStyle,rotation:c.rotation,textAlign:s||c.textAlign,borderRadius:r&&(a||c.borderRadius),datasetIndex:l.index}},this)}},title:{color:e=>e.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:e=>!e.startsWith("on"),labels:{_scriptable:e=>!["generateLabels","filter","sort"].includes(e)}}};const ki={average(e){if(!e.length)return!1;let t,n,i=new Set,s=0,o=0;for(t=0,n=e.length;t<n;++t){const a=e[t].element;if(a&&a.hasValue()){const l=a.tooltipPosition();i.add(l.x),s+=l.y,++o}}return o===0||i.size===0?!1:{x:[...i].reduce((a,l)=>a+l)/i.size,y:s/o}},nearest(e,t){if(!e.length)return!1;let n=t.x,i=t.y,s=Number.POSITIVE_INFINITY,o,r,a;for(o=0,r=e.length;o<r;++o){const l=e[o].element;if(l&&l.hasValue()){const c=l.getCenterPoint(),d=ca(t,c);d<s&&(s=d,a=l)}}if(a){const l=a.tooltipPosition();n=l.x,i=l.y}return{x:n,y:i}}};function ut(e,t){return t&&(ke(t)?Array.prototype.push.apply(e,t):e.push(t)),e}function At(e){return(typeof e=="string"||e instanceof String)&&e.indexOf(`
`)>-1?e.split(`
`):e}function FS(e,t){const{element:n,datasetIndex:i,index:s}=t,o=e.getDatasetMeta(i).controller,{label:r,value:a}=o.getLabelAndValue(s);return{chart:e,label:r,parsed:o.getParsed(s),raw:e.data.datasets[i].data[s],formattedValue:a,dataset:o.getDataset(),dataIndex:s,datasetIndex:i,element:n}}function wu(e,t){const n=e.chart.ctx,{body:i,footer:s,title:o}=e,{boxWidth:r,boxHeight:a}=t,l=Ue(t.bodyFont),c=Ue(t.titleFont),d=Ue(t.footerFont),u=o.length,h=s.length,g=i.length,v=st(t.padding);let b=v.height,y=0,A=i.reduce((k,T)=>k+T.before.length+T.lines.length+T.after.length,0);if(A+=e.beforeBody.length+e.afterBody.length,u&&(b+=u*c.lineHeight+(u-1)*t.titleSpacing+t.titleMarginBottom),A){const k=t.displayColors?Math.max(a,l.lineHeight):l.lineHeight;b+=g*k+(A-g)*l.lineHeight+(A-1)*t.bodySpacing}h&&(b+=t.footerMarginTop+h*d.lineHeight+(h-1)*t.footerSpacing);let E=0;const R=function(k){y=Math.max(y,n.measureText(k).width+E)};return n.save(),n.font=c.string,re(e.title,R),n.font=l.string,re(e.beforeBody.concat(e.afterBody),R),E=t.displayColors?r+2+t.boxPadding:0,re(i,k=>{re(k.before,R),re(k.lines,R),re(k.after,R)}),E=0,n.font=d.string,re(e.footer,R),n.restore(),y+=v.width,{width:y,height:b}}function NS(e,t){const{y:n,height:i}=t;return n<i/2?"top":n>e.height-i/2?"bottom":"center"}function BS(e,t,n,i){const{x:s,width:o}=i,r=n.caretSize+n.caretPadding;if(e==="left"&&s+o+r>t.width||e==="right"&&s-o-r<0)return!0}function zS(e,t,n,i){const{x:s,width:o}=n,{width:r,chartArea:{left:a,right:l}}=e;let c="center";return i==="center"?c=s<=(a+l)/2?"left":"right":s<=o/2?c="left":s>=r-o/2&&(c="right"),BS(c,e,t,n)&&(c="center"),c}function xu(e,t,n){const i=n.yAlign||t.yAlign||NS(e,n);return{xAlign:n.xAlign||t.xAlign||zS(e,t,n,i),yAlign:i}}function HS(e,t){let{x:n,width:i}=e;return t==="right"?n-=i:t==="center"&&(n-=i/2),n}function US(e,t,n){let{y:i,height:s}=e;return t==="top"?i+=n:t==="bottom"?i-=s+n:i-=s/2,i}function _u(e,t,n,i){const{caretSize:s,caretPadding:o,cornerRadius:r}=e,{xAlign:a,yAlign:l}=n,c=s+o,{topLeft:d,topRight:u,bottomLeft:h,bottomRight:g}=Oi(r);let v=HS(t,a);const b=US(t,l,c);return l==="center"?a==="left"?v+=c:a==="right"&&(v-=c):a==="left"?v-=Math.max(d,h)+s:a==="right"&&(v+=Math.max(u,g)+s),{x:We(v,0,i.width-t.width),y:We(b,0,i.height-t.height)}}function Ds(e,t,n){const i=st(n.padding);return t==="center"?e.x+e.width/2:t==="right"?e.x+e.width-i.right:e.x+i.left}function ku(e){return ut([],At(e))}function jS(e,t,n){return Rn(e,{tooltip:t,tooltipItems:n,type:"tooltip"})}function $u(e,t){const n=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return n?e.override(n):e}const yp={beforeTitle:$t,title(e){if(e.length>0){const t=e[0],n=t.chart.data.labels,i=n?n.length:0;if(this&&this.options&&this.options.mode==="dataset")return t.dataset.label||"";if(t.label)return t.label;if(i>0&&t.dataIndex<i)return n[t.dataIndex]}return""},afterTitle:$t,beforeBody:$t,beforeLabel:$t,label(e){if(this&&this.options&&this.options.mode==="dataset")return e.label+": "+e.formattedValue||e.formattedValue;let t=e.dataset.label||"";t&&(t+=": ");const n=e.formattedValue;return ce(n)||(t+=n),t},labelColor(e){const n=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{borderColor:n.borderColor,backgroundColor:n.backgroundColor,borderWidth:n.borderWidth,borderDash:n.borderDash,borderDashOffset:n.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(e){const n=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{pointStyle:n.pointStyle,rotation:n.rotation}},afterLabel:$t,afterBody:$t,beforeFooter:$t,footer:$t,afterFooter:$t};function Be(e,t,n,i){const s=e[t].call(n,i);return typeof s>"u"?yp[t].call(n,i):s}class va extends Kt{constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const t=this._cachedAnimations;if(t)return t;const n=this.chart,i=this.options.setContext(this.getContext()),s=i.enabled&&n.options.animation&&i.animations,o=new np(this.chart,s);return s._cacheable&&(this._cachedAnimations=Object.freeze(o)),o}getContext(){return this.$context||(this.$context=jS(this.chart.getContext(),this,this._tooltipItems))}getTitle(t,n){const{callbacks:i}=n,s=Be(i,"beforeTitle",this,t),o=Be(i,"title",this,t),r=Be(i,"afterTitle",this,t);let a=[];return a=ut(a,At(s)),a=ut(a,At(o)),a=ut(a,At(r)),a}getBeforeBody(t,n){return ku(Be(n.callbacks,"beforeBody",this,t))}getBody(t,n){const{callbacks:i}=n,s=[];return re(t,o=>{const r={before:[],lines:[],after:[]},a=$u(i,o);ut(r.before,At(Be(a,"beforeLabel",this,o))),ut(r.lines,Be(a,"label",this,o)),ut(r.after,At(Be(a,"afterLabel",this,o))),s.push(r)}),s}getAfterBody(t,n){return ku(Be(n.callbacks,"afterBody",this,t))}getFooter(t,n){const{callbacks:i}=n,s=Be(i,"beforeFooter",this,t),o=Be(i,"footer",this,t),r=Be(i,"afterFooter",this,t);let a=[];return a=ut(a,At(s)),a=ut(a,At(o)),a=ut(a,At(r)),a}_createItems(t){const n=this._active,i=this.chart.data,s=[],o=[],r=[];let a=[],l,c;for(l=0,c=n.length;l<c;++l)a.push(FS(this.chart,n[l]));return t.filter&&(a=a.filter((d,u,h)=>t.filter(d,u,h,i))),t.itemSort&&(a=a.sort((d,u)=>t.itemSort(d,u,i))),re(a,d=>{const u=$u(t.callbacks,d);s.push(Be(u,"labelColor",this,d)),o.push(Be(u,"labelPointStyle",this,d)),r.push(Be(u,"labelTextColor",this,d))}),this.labelColors=s,this.labelPointStyles=o,this.labelTextColors=r,this.dataPoints=a,a}update(t,n){const i=this.options.setContext(this.getContext()),s=this._active;let o,r=[];if(!s.length)this.opacity!==0&&(o={opacity:0});else{const a=ki[i.position].call(this,s,this._eventPosition);r=this._createItems(i),this.title=this.getTitle(r,i),this.beforeBody=this.getBeforeBody(r,i),this.body=this.getBody(r,i),this.afterBody=this.getAfterBody(r,i),this.footer=this.getFooter(r,i);const l=this._size=wu(this,i),c=Object.assign({},a,l),d=xu(this.chart,i,c),u=_u(i,c,d,this.chart);this.xAlign=d.xAlign,this.yAlign=d.yAlign,o={opacity:1,x:u.x,y:u.y,width:l.width,height:l.height,caretX:a.x,caretY:a.y}}this._tooltipItems=r,this.$context=void 0,o&&this._resolveAnimations().update(this,o),t&&i.external&&i.external.call(this,{chart:this.chart,tooltip:this,replay:n})}drawCaret(t,n,i,s){const o=this.getCaretPosition(t,i,s);n.lineTo(o.x1,o.y1),n.lineTo(o.x2,o.y2),n.lineTo(o.x3,o.y3)}getCaretPosition(t,n,i){const{xAlign:s,yAlign:o}=this,{caretSize:r,cornerRadius:a}=i,{topLeft:l,topRight:c,bottomLeft:d,bottomRight:u}=Oi(a),{x:h,y:g}=t,{width:v,height:b}=n;let y,A,E,R,k,T;return o==="center"?(k=g+b/2,s==="left"?(y=h,A=y-r,R=k+r,T=k-r):(y=h+v,A=y+r,R=k-r,T=k+r),E=y):(s==="left"?A=h+Math.max(l,d)+r:s==="right"?A=h+v-Math.max(c,u)-r:A=this.caretX,o==="top"?(R=g,k=R-r,y=A-r,E=A+r):(R=g+b,k=R+r,y=A+r,E=A-r),T=R),{x1:y,x2:A,x3:E,y1:R,y2:k,y3:T}}drawTitle(t,n,i){const s=this.title,o=s.length;let r,a,l;if(o){const c=jn(i.rtl,this.x,this.width);for(t.x=Ds(this,i.titleAlign,i),n.textAlign=c.textAlign(i.titleAlign),n.textBaseline="middle",r=Ue(i.titleFont),a=i.titleSpacing,n.fillStyle=i.titleColor,n.font=r.string,l=0;l<o;++l)n.fillText(s[l],c.x(t.x),t.y+r.lineHeight/2),t.y+=r.lineHeight+a,l+1===o&&(t.y+=i.titleMarginBottom-a)}}_drawColorBox(t,n,i,s,o){const r=this.labelColors[i],a=this.labelPointStyles[i],{boxHeight:l,boxWidth:c}=o,d=Ue(o.bodyFont),u=Ds(this,"left",o),h=s.x(u),g=l<d.lineHeight?(d.lineHeight-l)/2:0,v=n.y+g;if(o.usePointStyle){const b={radius:Math.min(c,l)/2,pointStyle:a.pointStyle,rotation:a.rotation,borderWidth:1},y=s.leftForLtr(h,c)+c/2,A=v+l/2;t.strokeStyle=o.multiKeyBackground,t.fillStyle=o.multiKeyBackground,ua(t,b,y,A),t.strokeStyle=r.borderColor,t.fillStyle=r.backgroundColor,ua(t,b,y,A)}else{t.lineWidth=Z(r.borderWidth)?Math.max(...Object.values(r.borderWidth)):r.borderWidth||1,t.strokeStyle=r.borderColor,t.setLineDash(r.borderDash||[]),t.lineDashOffset=r.borderDashOffset||0;const b=s.leftForLtr(h,c),y=s.leftForLtr(s.xPlus(h,1),c-2),A=Oi(r.borderRadius);Object.values(A).some(E=>E!==0)?(t.beginPath(),t.fillStyle=o.multiKeyBackground,ha(t,{x:b,y:v,w:c,h:l,radius:A}),t.fill(),t.stroke(),t.fillStyle=r.backgroundColor,t.beginPath(),ha(t,{x:y,y:v+1,w:c-2,h:l-2,radius:A}),t.fill()):(t.fillStyle=o.multiKeyBackground,t.fillRect(b,v,c,l),t.strokeRect(b,v,c,l),t.fillStyle=r.backgroundColor,t.fillRect(y,v+1,c-2,l-2))}t.fillStyle=this.labelTextColors[i]}drawBody(t,n,i){const{body:s}=this,{bodySpacing:o,bodyAlign:r,displayColors:a,boxHeight:l,boxWidth:c,boxPadding:d}=i,u=Ue(i.bodyFont);let h=u.lineHeight,g=0;const v=jn(i.rtl,this.x,this.width),b=function($){n.fillText($,v.x(t.x+g),t.y+h/2),t.y+=h+o},y=v.textAlign(r);let A,E,R,k,T,M,m;for(n.textAlign=r,n.textBaseline="middle",n.font=u.string,t.x=Ds(this,y,i),n.fillStyle=i.bodyColor,re(this.beforeBody,b),g=a&&y!=="right"?r==="center"?c/2+d:c+2+d:0,k=0,M=s.length;k<M;++k){for(A=s[k],E=this.labelTextColors[k],n.fillStyle=E,re(A.before,b),R=A.lines,a&&R.length&&(this._drawColorBox(n,t,k,v,i),h=Math.max(u.lineHeight,l)),T=0,m=R.length;T<m;++T)b(R[T]),h=u.lineHeight;re(A.after,b)}g=0,h=u.lineHeight,re(this.afterBody,b),t.y-=o}drawFooter(t,n,i){const s=this.footer,o=s.length;let r,a;if(o){const l=jn(i.rtl,this.x,this.width);for(t.x=Ds(this,i.footerAlign,i),t.y+=i.footerMarginTop,n.textAlign=l.textAlign(i.footerAlign),n.textBaseline="middle",r=Ue(i.footerFont),n.fillStyle=i.footerColor,n.font=r.string,a=0;a<o;++a)n.fillText(s[a],l.x(t.x),t.y+r.lineHeight/2),t.y+=r.lineHeight+i.footerSpacing}}drawBackground(t,n,i,s){const{xAlign:o,yAlign:r}=this,{x:a,y:l}=t,{width:c,height:d}=i,{topLeft:u,topRight:h,bottomLeft:g,bottomRight:v}=Oi(s.cornerRadius);n.fillStyle=s.backgroundColor,n.strokeStyle=s.borderColor,n.lineWidth=s.borderWidth,n.beginPath(),n.moveTo(a+u,l),r==="top"&&this.drawCaret(t,n,i,s),n.lineTo(a+c-h,l),n.quadraticCurveTo(a+c,l,a+c,l+h),r==="center"&&o==="right"&&this.drawCaret(t,n,i,s),n.lineTo(a+c,l+d-v),n.quadraticCurveTo(a+c,l+d,a+c-v,l+d),r==="bottom"&&this.drawCaret(t,n,i,s),n.lineTo(a+g,l+d),n.quadraticCurveTo(a,l+d,a,l+d-g),r==="center"&&o==="left"&&this.drawCaret(t,n,i,s),n.lineTo(a,l+u),n.quadraticCurveTo(a,l,a+u,l),n.closePath(),n.fill(),s.borderWidth>0&&n.stroke()}_updateAnimationTarget(t){const n=this.chart,i=this.$animations,s=i&&i.x,o=i&&i.y;if(s||o){const r=ki[t.position].call(this,this._active,this._eventPosition);if(!r)return;const a=this._size=wu(this,t),l=Object.assign({},r,this._size),c=xu(n,t,l),d=_u(t,l,c,n);(s._to!==d.x||o._to!==d.y)&&(this.xAlign=c.xAlign,this.yAlign=c.yAlign,this.width=a.width,this.height=a.height,this.caretX=r.x,this.caretY=r.y,this._resolveAnimations().update(this,d))}}_willRender(){return!!this.opacity}draw(t){const n=this.options.setContext(this.getContext());let i=this.opacity;if(!i)return;this._updateAnimationTarget(n);const s={width:this.width,height:this.height},o={x:this.x,y:this.y};i=Math.abs(i)<.001?0:i;const r=st(n.padding),a=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;n.enabled&&a&&(t.save(),t.globalAlpha=i,this.drawBackground(o,t,s,n),Yf(t,n.textDirection),o.y+=r.top,this.drawTitle(o,t,n),this.drawBody(o,t,n),this.drawFooter(o,t,n),Xf(t,n.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,n){const i=this._active,s=t.map(({datasetIndex:a,index:l})=>{const c=this.chart.getDatasetMeta(a);if(!c)throw new Error("Cannot find a dataset at index "+a);return{datasetIndex:a,element:c.data[l],index:l}}),o=!oo(i,s),r=this._positionChanged(s,n);(o||r)&&(this._active=s,this._eventPosition=n,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,n,i=!0){if(n&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const s=this.options,o=this._active||[],r=this._getActiveElements(t,o,n,i),a=this._positionChanged(r,t),l=n||!oo(r,o)||a;return l&&(this._active=r,(s.enabled||s.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,n))),l}_getActiveElements(t,n,i,s){const o=this.options;if(t.type==="mouseout")return[];if(!s)return n.filter(a=>this.chart.data.datasets[a.datasetIndex]&&this.chart.getDatasetMeta(a.datasetIndex).controller.getParsed(a.index)!==void 0);const r=this.chart.getElementsAtEventForMode(t,o.mode,o,i);return o.reverse&&r.reverse(),r}_positionChanged(t,n){const{caretX:i,caretY:s,options:o}=this,r=ki[o.position].call(this,t,n);return r!==!1&&(i!==r.x||s!==r.y)}}B(va,"positioners",ki);var qS={id:"tooltip",_element:va,positioners:ki,afterInit(e,t,n){n&&(e.tooltip=new va({chart:e,options:n}))},beforeUpdate(e,t,n){e.tooltip&&e.tooltip.initialize(n)},reset(e,t,n){e.tooltip&&e.tooltip.initialize(n)},afterDraw(e){const t=e.tooltip;if(t&&t._willRender()){const n={tooltip:t};if(e.notifyPlugins("beforeTooltipDraw",{...n,cancelable:!0})===!1)return;t.draw(e.ctx),e.notifyPlugins("afterTooltipDraw",n)}},afterEvent(e,t){if(e.tooltip){const n=t.replay;e.tooltip.handleEvent(t.event,n,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(e,t)=>t.bodyFont.size,boxWidth:(e,t)=>t.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:yp},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:e=>e!=="filter"&&e!=="itemSort"&&e!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]};const KS=(e,t,n,i)=>(typeof t=="string"?(n=e.push(t)-1,i.unshift({index:n,label:t})):isNaN(t)&&(n=null),n);function WS(e,t,n,i){const s=e.indexOf(t);if(s===-1)return KS(e,t,n,i);const o=e.lastIndexOf(t);return s!==o?n:s}const VS=(e,t)=>e===null?null:We(Math.round(e),0,t);function Su(e){const t=this.getLabels();return e>=0&&e<t.length?t[e]:e}class ya extends ni{constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){const n=this._addedLabels;if(n.length){const i=this.getLabels();for(const{index:s,label:o}of n)i[s]===o&&i.splice(s,1);this._addedLabels=[]}super.init(t)}parse(t,n){if(ce(t))return null;const i=this.getLabels();return n=isFinite(n)&&i[n]===t?n:WS(i,t,X(n,t),this._addedLabels),VS(n,i.length-1)}determineDataLimits(){const{minDefined:t,maxDefined:n}=this.getUserBounds();let{min:i,max:s}=this.getMinMax(!0);this.options.bounds==="ticks"&&(t||(i=0),n||(s=this.getLabels().length-1)),this.min=i,this.max=s}buildTicks(){const t=this.min,n=this.max,i=this.options.offset,s=[];let o=this.getLabels();o=t===0&&n===o.length-1?o:o.slice(t,n+1),this._valueRange=Math.max(o.length-(i?0:1),1),this._startValue=this.min-(i?.5:0);for(let r=t;r<=n;r++)s.push({value:r});return s}getLabelForValue(t){return Su.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return typeof t!="number"&&(t=this.parse(t)),t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){const n=this.ticks;return t<0||t>n.length-1?null:this.getPixelForValue(n[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}}B(ya,"id","category"),B(ya,"defaults",{ticks:{callback:Su}});function GS(e,t){const n=[],{bounds:s,step:o,min:r,max:a,precision:l,count:c,maxTicks:d,maxDigits:u,includeBounds:h}=e,g=o||1,v=d-1,{min:b,max:y}=t,A=!ce(r),E=!ce(a),R=!ce(c),k=(y-b)/(u+1);let T=Sd((y-b)/v/g)*g,M,m,$,L;if(T<1e-14&&!A&&!E)return[{value:b},{value:y}];L=Math.ceil(y/T)-Math.floor(b/T),L>v&&(T=Sd(L*T/v/g)*g),ce(l)||(M=Math.pow(10,l),T=Math.ceil(T*M)/M),s==="ticks"?(m=Math.floor(b/T)*T,$=Math.ceil(y/T)*T):(m=b,$=y),A&&E&&o&&y_((a-r)/o,T/1e3)?(L=Math.round(Math.min((a-r)/T,d)),T=(a-r)/L,m=r,$=a):R?(m=A?r:m,$=E?a:$,L=c-1,T=($-m)/L):(L=($-m)/T,Pi(L,Math.round(L),T/1e3)?L=Math.round(L):L=Math.ceil(L));const I=Math.max(Ad(T),Ad(m));M=Math.pow(10,ce(l)?I:l),m=Math.round(m*M)/M,$=Math.round($*M)/M;let P=0;for(A&&(h&&m!==r?(n.push({value:r}),m<r&&P++,Pi(Math.round((m+P*T)*M)/M,r,Au(r,k,e))&&P++):m<r&&P++);P<L;++P){const F=Math.round((m+P*T)*M)/M;if(E&&F>a)break;n.push({value:F})}return E&&h&&$!==a?n.length&&Pi(n[n.length-1].value,a,Au(a,k,e))?n[n.length-1].value=a:n.push({value:a}):(!E||$===a)&&n.push({value:$}),n}function Au(e,t,{horizontal:n,minRotation:i}){const s=un(i),o=(n?Math.sin(s):Math.cos(s))||.001,r=.75*t*(""+e).length;return Math.min(t/o,r)}class QS extends ni{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,n){return ce(t)||(typeof t=="number"||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){const{beginAtZero:t}=this.options,{minDefined:n,maxDefined:i}=this.getUserBounds();let{min:s,max:o}=this;const r=l=>s=n?s:l,a=l=>o=i?o:l;if(t){const l=Xn(s),c=Xn(o);l<0&&c<0?a(0):l>0&&c>0&&r(0)}if(s===o){let l=o===0?1:Math.abs(o*.05);a(o+l),t||r(s-l)}this.min=s,this.max=o}getTickLimit(){const t=this.options.ticks;let{maxTicksLimit:n,stepSize:i}=t,s;return i?(s=Math.ceil(this.max/i)-Math.floor(this.min/i)+1,s>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${i} would result generating up to ${s} ticks. Limiting to 1000.`),s=1e3)):(s=this.computeTickLimit(),n=n||11),n&&(s=Math.min(n,s)),s}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const t=this.options,n=t.ticks;let i=this.getTickLimit();i=Math.max(2,i);const s={maxTicks:i,bounds:t.bounds,min:t.min,max:t.max,precision:n.precision,step:n.stepSize,count:n.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:n.minRotation||0,includeBounds:n.includeBounds!==!1},o=this._range||this,r=GS(s,o);return t.bounds==="ticks"&&b_(r,this,"value"),t.reverse?(r.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),r}configure(){const t=this.ticks;let n=this.min,i=this.max;if(super.configure(),this.options.offset&&t.length){const s=(i-n)/Math.max(t.length-1,1)/2;n-=s,i+=s}this._startValue=n,this._endValue=i,this._valueRange=i-n}getLabelForValue(t){return Hf(t,this.chart.options.locale,this.options.ticks.format)}}class ba extends QS{determineDataLimits(){const{min:t,max:n}=this.getMinMax(!0);this.min=Me(t)?t:0,this.max=Me(n)?n:1,this.handleTickRangeOptions()}computeTickLimit(){const t=this.isHorizontal(),n=t?this.width:this.height,i=un(this.options.ticks.minRotation),s=(t?Math.sin(i):Math.cos(i))||.001,o=this._resolveTickFontOptions(0);return Math.ceil(n/Math.min(40,o.lineHeight/s))}getPixelForValue(t){return t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}}B(ba,"id","linear"),B(ba,"defaults",{ticks:{callback:Uf.formatters.numeric}});const No={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},ze=Object.keys(No);function Tu(e,t){return e-t}function Cu(e,t){if(ce(t))return null;const n=e._adapter,{parser:i,round:s,isoWeekday:o}=e._parseOpts;let r=t;return typeof i=="function"&&(r=i(r)),Me(r)||(r=typeof i=="string"?n.parse(r,i):n.parse(r)),r===null?null:(s&&(r=s==="week"&&(Vi(o)||o===!0)?n.startOf(r,"isoWeek",o):n.startOf(r,s)),+r)}function Eu(e,t,n,i){const s=ze.length;for(let o=ze.indexOf(e);o<s-1;++o){const r=No[ze[o]],a=r.steps?r.steps:Number.MAX_SAFE_INTEGER;if(r.common&&Math.ceil((n-t)/(a*r.size))<=i)return ze[o]}return ze[s-1]}function YS(e,t,n,i,s){for(let o=ze.length-1;o>=ze.indexOf(n);o--){const r=ze[o];if(No[r].common&&e._adapter.diff(s,i,r)>=t-1)return r}return ze[n?ze.indexOf(n):0]}function XS(e){for(let t=ze.indexOf(e)+1,n=ze.length;t<n;++t)if(No[ze[t]].common)return ze[t]}function Ru(e,t,n){if(!n)e[t]=!0;else if(n.length){const{lo:i,hi:s}=ml(n,t),o=n[i]>=t?n[i]:n[s];e[o]=!0}}function JS(e,t,n,i){const s=e._adapter,o=+s.startOf(t[0].value,i),r=t[t.length-1].value;let a,l;for(a=o;a<=r;a=+s.add(a,1,i))l=n[a],l>=0&&(t[l].major=!0);return t}function Lu(e,t,n){const i=[],s={},o=t.length;let r,a;for(r=0;r<o;++r)a=t[r],s[a]=r,i.push({value:a,major:!1});return o===0||!n?i:JS(e,i,s,n)}class po extends ni{constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,n={}){const i=t.time||(t.time={}),s=this._adapter=new Vk._date(t.adapters.date);s.init(n),Mi(i.displayFormats,s.formats()),this._parseOpts={parser:i.parser,round:i.round,isoWeekday:i.isoWeekday},super.init(t),this._normalized=n.normalized}parse(t,n){return t===void 0?null:Cu(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const t=this.options,n=this._adapter,i=t.time.unit||"day";let{min:s,max:o,minDefined:r,maxDefined:a}=this.getUserBounds();function l(c){!r&&!isNaN(c.min)&&(s=Math.min(s,c.min)),!a&&!isNaN(c.max)&&(o=Math.max(o,c.max))}(!r||!a)&&(l(this._getLabelBounds()),(t.bounds!=="ticks"||t.ticks.source!=="labels")&&l(this.getMinMax(!1))),s=Me(s)&&!isNaN(s)?s:+n.startOf(Date.now(),i),o=Me(o)&&!isNaN(o)?o:+n.endOf(Date.now(),i)+1,this.min=Math.min(s,o-1),this.max=Math.max(s+1,o)}_getLabelBounds(){const t=this.getLabelTimestamps();let n=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY;return t.length&&(n=t[0],i=t[t.length-1]),{min:n,max:i}}buildTicks(){const t=this.options,n=t.time,i=t.ticks,s=i.source==="labels"?this.getLabelTimestamps():this._generate();t.bounds==="ticks"&&s.length&&(this.min=this._userMin||s[0],this.max=this._userMax||s[s.length-1]);const o=this.min,r=this.max,a=S_(s,o,r);return this._unit=n.unit||(i.autoSkip?Eu(n.minUnit,this.min,this.max,this._getLabelCapacity(o)):YS(this,a.length,n.minUnit,this.min,this.max)),this._majorUnit=!i.major.enabled||this._unit==="year"?void 0:XS(this._unit),this.initOffsets(s),t.reverse&&a.reverse(),Lu(this,a,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(t=>+t.value))}initOffsets(t=[]){let n=0,i=0,s,o;this.options.offset&&t.length&&(s=this.getDecimalForValue(t[0]),t.length===1?n=1-s:n=(this.getDecimalForValue(t[1])-s)/2,o=this.getDecimalForValue(t[t.length-1]),t.length===1?i=o:i=(o-this.getDecimalForValue(t[t.length-2]))/2);const r=t.length<3?.5:.25;n=We(n,0,r),i=We(i,0,r),this._offsets={start:n,end:i,factor:1/(n+1+i)}}_generate(){const t=this._adapter,n=this.min,i=this.max,s=this.options,o=s.time,r=o.unit||Eu(o.minUnit,n,i,this._getLabelCapacity(n)),a=X(s.ticks.stepSize,1),l=r==="week"?o.isoWeekday:!1,c=Vi(l)||l===!0,d={};let u=n,h,g;if(c&&(u=+t.startOf(u,"isoWeek",l)),u=+t.startOf(u,c?"day":r),t.diff(i,n,r)>1e5*a)throw new Error(n+" and "+i+" are too far apart with stepSize of "+a+" "+r);const v=s.ticks.source==="data"&&this.getDataTimestamps();for(h=u,g=0;h<i;h=+t.add(h,a,r),g++)Ru(d,h,v);return(h===i||s.bounds==="ticks"||g===1)&&Ru(d,h,v),Object.keys(d).sort(Tu).map(b=>+b)}getLabelForValue(t){const n=this._adapter,i=this.options.time;return i.tooltipFormat?n.format(t,i.tooltipFormat):n.format(t,i.displayFormats.datetime)}format(t,n){const s=this.options.time.displayFormats,o=this._unit,r=n||s[o];return this._adapter.format(t,r)}_tickFormatFunction(t,n,i,s){const o=this.options,r=o.ticks.callback;if(r)return ue(r,[t,n,i],this);const a=o.time.displayFormats,l=this._unit,c=this._majorUnit,d=l&&a[l],u=c&&a[c],h=i[n],g=c&&u&&h&&h.major;return this._adapter.format(t,s||(g?u:d))}generateTickLabels(t){let n,i,s;for(n=0,i=t.length;n<i;++n)s=t[n],s.label=this._tickFormatFunction(s.value,n,t)}getDecimalForValue(t){return t===null?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){const n=this._offsets,i=this.getDecimalForValue(t);return this.getPixelForDecimal((n.start+i)*n.factor)}getValueForPixel(t){const n=this._offsets,i=this.getDecimalForPixel(t)/n.factor-n.end;return this.min+i*(this.max-this.min)}_getLabelSize(t){const n=this.options.ticks,i=this.ctx.measureText(t).width,s=un(this.isHorizontal()?n.maxRotation:n.minRotation),o=Math.cos(s),r=Math.sin(s),a=this._resolveTickFontOptions(0).size;return{w:i*o+a*r,h:i*r+a*o}}_getLabelCapacity(t){const n=this.options.time,i=n.displayFormats,s=i[n.unit]||i.millisecond,o=this._tickFormatFunction(t,0,Lu(this,[t],this._majorUnit),s),r=this._getLabelSize(o),a=Math.floor(this.isHorizontal()?this.width/r.w:this.height/r.h)-1;return a>0?a:1}getDataTimestamps(){let t=this._cache.data||[],n,i;if(t.length)return t;const s=this.getMatchingVisibleMetas();if(this._normalized&&s.length)return this._cache.data=s[0].controller.getAllParsedValues(this);for(n=0,i=s.length;n<i;++n)t=t.concat(s[n].controller.getAllParsedValues(this));return this._cache.data=this.normalize(t)}getLabelTimestamps(){const t=this._cache.labels||[];let n,i;if(t.length)return t;const s=this.getLabels();for(n=0,i=s.length;n<i;++n)t.push(Cu(this,s[n]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return T_(t.sort(Tu))}}B(po,"id","time"),B(po,"defaults",{bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}});function Is(e,t,n){let i=0,s=e.length-1,o,r,a,l;n?(t>=e[i].pos&&t<=e[s].pos&&({lo:i,hi:s}=hn(e,"pos",t)),{pos:o,time:a}=e[i],{pos:r,time:l}=e[s]):(t>=e[i].time&&t<=e[s].time&&({lo:i,hi:s}=hn(e,"time",t)),{time:o,pos:a}=e[i],{time:r,pos:l}=e[s]);const c=r-o;return c?a+(l-a)*(t-o)/c:a}class Mu extends po{constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const t=this._getTimestampsForTable(),n=this._table=this.buildLookupTable(t);this._minPos=Is(n,this.min),this._tableRange=Is(n,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){const{min:n,max:i}=this,s=[],o=[];let r,a,l,c,d;for(r=0,a=t.length;r<a;++r)c=t[r],c>=n&&c<=i&&s.push(c);if(s.length<2)return[{time:n,pos:0},{time:i,pos:1}];for(r=0,a=s.length;r<a;++r)d=s[r+1],l=s[r-1],c=s[r],Math.round((d+l)/2)!==c&&o.push({time:c,pos:r/(a-1)});return o}_generate(){const t=this.min,n=this.max;let i=super.getDataTimestamps();return(!i.includes(t)||!i.length)&&i.splice(0,0,t),(!i.includes(n)||i.length===1)&&i.push(n),i.sort((s,o)=>s-o)}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;const n=this.getDataTimestamps(),i=this.getLabelTimestamps();return n.length&&i.length?t=this.normalize(n.concat(i)):t=n.length?n:i,t=this._cache.all=t,t}getDecimalForValue(t){return(Is(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){const n=this._offsets,i=this.getDecimalForPixel(t)/n.factor-n.end;return Is(this._table,i*this._tableRange+this._minPos,!0)}}B(Mu,"id","timeseries"),B(Mu,"defaults",po.defaults);var ZS=Object.defineProperty,e2=Object.getOwnPropertyDescriptor,is=(e,t,n,i)=>{for(var s=i>1?void 0:i?e2(t,n):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(s=(i?r(t,n,s):r(s))||s);return i&&s&&ZS(t,n,s),s};mt.register(js,Ot,Ws,ba,ya,qS,OS,RS);let Tn=class extends pn{constructor(){super(...arguments),this.quotationByTime=[],this.oosByTime=[],this.shortageByTime=[],this.loading=!1,this.quotationChart=null,this.stockChart=null}render(){return f`
      <div class="chart-card">
        <div class="chart-title">${p("overview.dashboard.chart.quotationTrend")}</div>
        ${this.loading?f`<div class="empty">${p("overview.dashboard.chart.loading")}</div>`:this.quotationByTime.length===0?f`<div class="empty">${p("overview.dashboard.chart.empty")}</div>`:f`<div class="chart-wrap"><canvas id="quotation-chart"></canvas></div>`}
      </div>
      <div class="chart-card">
        <div class="chart-title">${p("overview.dashboard.chart.stockTrend")}</div>
        ${this.loading?f`<div class="empty">${p("overview.dashboard.chart.loading")}</div>`:this.oosByTime.length===0&&this.shortageByTime.length===0?f`<div class="empty">${p("overview.dashboard.chart.empty")}</div>`:f`<div class="chart-wrap"><canvas id="stock-chart"></canvas></div>`}
      </div>
    `}updated(){this.renderQuotationChart(),this.renderStockChart()}disconnectedCallback(){var e,t;super.disconnectedCallback(),(e=this.quotationChart)==null||e.destroy(),(t=this.stockChart)==null||t.destroy(),this.quotationChart=null,this.stockChart=null}renderQuotationChart(){var i,s,o;const e=(i=this.shadowRoot)==null?void 0:i.getElementById("quotation-chart");if(!e){(s=this.quotationChart)==null||s.destroy(),this.quotationChart=null;return}(o=this.quotationChart)==null||o.destroy();const t=this.quotationByTime.map(r=>(r.date??"").slice(5)),n=this.quotationByTime.map(r=>Number(r.count??0));this.quotationChart=new mt(e,{type:"line",data:{labels:t,datasets:[{label:p("overview.dashboard.chart.quotationSeries"),data:n,borderColor:"#4f8ef7",backgroundColor:"rgba(79,142,247,0.14)",fill:!0,tension:.35,pointRadius:2}]},options:{responsive:!0,maintainAspectRatio:!1,animation:!1,plugins:{legend:{display:!1}},scales:{x:{ticks:{font:{size:12}}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:12}}}},elements:{line:{borderWidth:3},point:{radius:3}}}})}renderStockChart(){var o,r,a;const e=(o=this.shadowRoot)==null?void 0:o.getElementById("stock-chart");if(!e){(r=this.stockChart)==null||r.destroy(),this.stockChart=null;return}(a=this.stockChart)==null||a.destroy();const t=[...new Set([...this.oosByTime.map(l=>l.date??""),...this.shortageByTime.map(l=>l.date??"")])].filter(Boolean).sort(),n=t.map(l=>l.slice(5)),i=Object.fromEntries(this.oosByTime.map(l=>[l.date??"",Number(l.count??0)])),s=Object.fromEntries(this.shortageByTime.map(l=>[l.date??"",Number(l.count??0)]));this.stockChart=new mt(e,{type:"line",data:{labels:n,datasets:[{label:p("overview.dashboard.chart.oosSeries"),data:t.map(l=>i[l]??0),borderColor:"#e25555",backgroundColor:"rgba(226,85,85,0.12)",fill:!0,tension:.35,pointRadius:2},{label:p("overview.dashboard.chart.shortageSeries"),data:t.map(l=>s[l]??0),borderColor:"#f5a623",backgroundColor:"rgba(245,166,35,0.12)",fill:!0,tension:.35,pointRadius:2}]},options:{responsive:!0,maintainAspectRatio:!1,animation:!1,plugins:{legend:{display:!0,position:"top",labels:{font:{size:12}}}},scales:{x:{ticks:{font:{size:12}}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:12}}}},elements:{line:{borderWidth:3},point:{radius:3}}}})}};Tn.styles=Iu`
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
  `;is([Wt({attribute:!1})],Tn.prototype,"quotationByTime",2);is([Wt({attribute:!1})],Tn.prototype,"oosByTime",2);is([Wt({attribute:!1})],Tn.prototype,"shortageByTime",2);is([Wt({type:Boolean})],Tn.prototype,"loading",2);Tn=is([$a("dashboard-charts")],Tn);function t2(e){var c,d,u,h,g,v,b,y,A;const t=(c=e.hello)==null?void 0:c.snapshot,n=t!=null&&t.uptimeMs?Zu(t.uptimeMs):p("common.na"),i=(d=t==null?void 0:t.policy)!=null&&d.tickIntervalMs?`${t.policy.tickIntervalMs}ms`:p("common.na"),o=(t==null?void 0:t.authMode)==="trusted-proxy",r=(()=>{if(e.connected||!e.lastError)return null;const E=e.lastError.toLowerCase();if(!(E.includes("unauthorized")||E.includes("connect failed")))return null;const k=!!e.settings.token.trim(),T=!!e.password.trim();return!k&&!T?f`
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
    `})(),a=(()=>{if(e.connected||!e.lastError||(typeof window<"u"?window.isSecureContext:!0))return null;const R=e.lastError.toLowerCase();return!R.includes("secure context")&&!R.includes("device identity required")?null:f`
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
            ${p("overview.stats.cronNext",{time:Xh(e.cronNext)})}
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
              @input=${E=>{const R=E.target.value;e.onSettingsChange({...e.settings,gatewayUrl:R})}}
              placeholder="ws://100.x.y.z:18789"
            />
          </label>
          ${o?"":f`
                <label class="field">
                  <span>${p("overview.access.token")}</span>
                  <input
                    .value=${e.settings.token}
                    @input=${E=>{const R=E.target.value;e.onSettingsChange({...e.settings,token:R})}}
                    placeholder="JAGENT_GATEWAY_TOKEN"
                  />
                </label>
                <label class="field">
                  <span>${p("overview.access.password")}</span>
                  <input
                    type="password"
                    .value=${e.password}
                    @input=${E=>{const R=E.target.value;e.onPasswordChange(R)}}
                    placeholder="system or shared password"
                  />
                </label>
              `}
          <label class="field">
            <span>${p("overview.access.sessionKey")}</span>
            <input
              .value=${e.settings.sessionKey}
              @input=${E=>{const R=E.target.value;e.onSessionKeyChange(R)}}
            />
          </label>
          <label class="field">
            <span>${p("overview.access.language")}</span>
            <select
              .value=${l}
          style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 160px;"
              @change=${E=>{const R=E.target.value;bn.setLocale(R),e.onSettingsChange({...e.settings,locale:R})}}
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
        .quotationByTime=${((A=e.quotationStats)==null?void 0:A.by_time)??[]}
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
  `}function n2(e){var o;const t=((o=e.report)==null?void 0:o.skills)??[],n=e.filter.trim().toLowerCase(),i=n?t.filter(r=>[r.name,r.description,r.source].join(" ").toLowerCase().includes(n)):t,s=ef(i);return f`
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

      ${e.error?f`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:S}

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
                      ${r.skills.map(l=>i2(l,e))}
                    </div>
                  </details>
                `})}
            </div>
          `}
    </section>
  `}function i2(e,t){const n=t.busyKey===e.skillKey,i=t.edits[e.skillKey]??"",s=t.messages[e.skillKey]??null,o=e.install.length>0&&e.missing.bins.length>0,r=!!(e.bundled&&e.source!=="openclaw-bundled"),a=tf(e),l=nf(e);return f`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">
          ${e.emoji?`${e.emoji} `:""}${e.name}
        </div>
        <div class="list-sub">${Or(e.description,140)}</div>
        ${sf({skill:e,showBundledBadge:r})}
        ${a.length>0?f`
              <div class="muted" style="margin-top: 6px;">
                Missing: ${a.join(", ")}
              </div>
            `:S}
        ${l.length>0?f`
              <div class="muted" style="margin-top: 6px;">
                Reason: ${l.join(", ")}
              </div>
            `:S}
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
              </button>`:S}
        </div>
        ${s?f`<div
              class="muted"
              style="margin-top: 8px; color: ${s.kind==="error"?"var(--danger-color, #d14343)":"var(--success-color, #0a7f5a)"};"
            >
              ${s.message}
            </div>`:S}
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
            `:S}
      </div>
    </div>
  `}const s2=/^data:/i,o2=/^https?:\/\//i;function r2(e){var a,l;const t=((a=e.agentsList)==null?void 0:a.agents)??[],n=Gu(e.sessionKey),i=(n==null?void 0:n.agentId)??((l=e.agentsList)==null?void 0:l.defaultId)??"main",s=t.find(c=>c.id===i),o=s==null?void 0:s.identity,r=(o==null?void 0:o.avatarUrl)??(o==null?void 0:o.avatar);if(r)return s2.test(r)||o2.test(r)?r:o==null?void 0:o.avatarUrl}function a2(e){var v,b,y,A,E,R,k,T,M;const t=e.presenceEntries.length,n=((v=e.sessionsResult)==null?void 0:v.count)??null,i=((b=e.cronStatus)==null?void 0:b.nextWakeAtMs)??null,s=e.connected?null:p("chat.disconnected"),o=e.tab==="chat",r=o&&(e.settings.chatFocusMode||e.onboarding),a=e.onboarding?!1:e.settings.chatShowThinking,l=r2(e),c=e.chatAvatarUrl??l??null,d=e.configForm??((y=e.configSnapshot)==null?void 0:y.config),u=ei(e.basePath??""),h=e.agentsSelectedId??((A=e.agentsList)==null?void 0:A.defaultId)??((k=(R=(E=e.agentsList)==null?void 0:E.agents)==null?void 0:R[0])==null?void 0:k.id)??null,g=bn.getLocale();return f`
    <div class="shell ${o?"shell--chat":""} ${r?"shell--chat-focus":""} ${e.settings.navCollapsed?"shell--nav-collapsed":""} ${e.onboarding?"shell--onboarding":""}">
      <header class="topbar">
        <div class="topbar-left">
          <button
            class="nav-collapse-toggle"
            @click=${()=>e.applySettings({...e.settings,navCollapsed:!e.settings.navCollapsed})}
            title="${e.settings.navCollapsed?p("nav.expand"):p("nav.collapse")}"
            aria-label="${e.settings.navCollapsed?p("nav.expand"):p("nav.collapse")}"
          >
            <span class="nav-collapse-toggle__icon">${$e.menu}</span>
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
          ${bb(e)}
          <label class="topbar-lang">
            <span class="sr-only">${p("overview.access.language")}</span>
            <select
              .value=${g}
              style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 140px;"
              @change=${m=>{const $=m.target.value;bn.setLocale($),e.applySettings({...e.settings,locale:$})}}
            >
              <option value="en">${p("languages.en")}</option>
              <option value="zh-CN">${p("languages.zhCN")}</option>
            </select>
          </label>
        </div>
      </header>
      <aside class="nav ${e.settings.navCollapsed?"nav--collapsed":""}">
        ${vv.map(m=>{const $=e.settings.navGroupsCollapsed[m.label]??!1,L=m.tabs.some(I=>I===e.tab);return f`
            <div class="nav-group ${$&&!L?"nav-group--collapsed":""}">
              <button
                class="nav-label"
                @click=${()=>{const I={...e.settings.navGroupsCollapsed};I[m.label]=!$,e.applySettings({...e.settings,navGroupsCollapsed:I})}}
                aria-expanded=${!$}
              >
                <span class="nav-label__text">${p(`nav.${m.label}`)}</span>
                <span class="nav-label__chevron">${$?"+":"−"}</span>
              </button>
              <div class="nav-group__items">
                ${m.tabs.map(I=>hb(e,I))}
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
              <span class="nav-item__icon" aria-hidden="true">${$e.book}</span>
              <span class="nav-item__text">${p("common.docs")}</span>
            </a>
          </div>
        </div>
      </aside>
      <main class="content ${o?"content--chat":""}">
        <section class="content-header">
          <div>
            ${e.tab==="work"?S:f`<div class="page-title">${Hr(e.tab)}</div>`}
            ${e.tab==="work"?S:f`<div class="page-sub">${wv(e.tab)}</div>`}
          </div>
          <div class="page-meta">
            ${e.lastError?f`<div class="pill danger">${e.lastError}</div>`:S}
            ${o?fb(e):S}
          </div>
        </section>

        ${e.tab==="overview"?t2({connected:e.connected,hello:e.hello,settings:e.settings,password:e.password,lastError:e.lastError,presenceCount:t,sessionsCount:n,cronEnabled:((T=e.cronStatus)==null?void 0:T.enabled)??null,cronNext:i,lastChannelsRefresh:e.channelsLastSuccess,oosStats:e.overviewOosStats,shortageStats:e.overviewShortageStats,quotationStats:e.quotationStats,oosByTime:e.dashboardOosByTime,shortageByTime:e.dashboardShortageByTime,dashboardLoading:e.dashboardLoading,dashboardError:e.dashboardError,onSettingsChange:m=>e.applySettings(m),onPasswordChange:m=>e.password=m,onSessionKeyChange:m=>{e.sessionKey=m,e.chatMessage="",e.resetToolStream(),e.applySettings({...e.settings,sessionKey:m,lastActiveSessionKey:m}),e.loadAssistantIdentity()},onConnect:()=>e.connect(),onRefresh:()=>e.loadOverview()}):S}

        ${e.tab==="channels"?o0({loading:e.bkLoading,saving:e.bkSaving,error:e.bkError,content:e.bkContent,lastSuccessAt:e.bkLastSuccess,dependentFiles:e.bkDependentFiles,onReload:()=>Ju(e),onSave:m=>zg(e,m),onContentChange:m=>e.bkContent=m}):S}

        ${e.tab==="instances"?f`
                ${n1({loading:e.oosLoading,error:e.oosError,stats:e.oosStats,list:e.oosList,byFile:e.oosByFile,byTime:e.oosByTime,db:e.oosDb??void 0,onRefresh:()=>xo(e),onDelete:m=>Wm(e,m),showAddForm:e.oosShowAddForm,onOpenAddForm:()=>e.oosShowAddForm=!0,onCloseAddForm:()=>e.oosShowAddForm=!1,onAdd:async m=>{const $=await Vm(e,m);return $&&(e.oosShowAddForm=!1),$}})}
                ${a1({loading:e.shortageLoading,error:e.shortageError,stats:e.shortageStats,list:e.shortageList,byFile:e.shortageByFile,byTime:e.shortageByTime,db:e.shortageDb??void 0,onRefresh:()=>_o(e),onDelete:m=>Qm(e,m),showAddForm:e.shortageShowAddForm,onOpenAddForm:()=>e.shortageShowAddForm=!0,onCloseAddForm:()=>e.shortageShowAddForm=!1,onAdd:async m=>{const $=await Ym(e,m);return $&&(e.shortageShowAddForm=!1),$}})}
              `:S}

        ${e.tab==="sessions"?jx({basePath:e.basePath,loading:e.procurementLoading,error:e.procurementError,suggestions:e.procurementSuggestions,selectedKeys:e.procurementSelectedKeys,approvedKeys:e.procurementApprovedKeys,approveBusy:e.procurementApproveBusy,approveResult:e.procurementApproveResult,filterQuery:e.procurementFilterQuery,sortBy:e.procurementSortBy,sortDir:e.procurementSortDir,page:e.procurementPage,pageSize:e.procurementPageSize,replenishmentDrafts:e.replenishmentDrafts,replenishmentDetail:e.replenishmentDetail,replenishmentDetailId:e.replenishmentDetailId,replenishmentLoading:e.replenishmentLoading,replenishmentError:e.replenishmentError,replenishmentConfirmBusy:e.replenishmentConfirmBusy,replenishmentConfirmResult:e.replenishmentConfirmResult,replenishmentInputLines:e.replenishmentInputLines,replenishmentCreateBusy:e.replenishmentCreateBusy,onReplenishmentLineChange:(m,$,L)=>e.onReplenishmentLineChange(m,$,L),onReplenishmentAddLine:()=>e.onReplenishmentAddLine(),onReplenishmentRemoveLine:m=>e.onReplenishmentRemoveLine(m),onCreateReplenishmentDraft:()=>e.createProcurementReplenishmentDraft(),onReplenishmentRefresh:()=>e.loadProcurementReplenishment(),onSelectReplenishmentDraft:m=>{e.loadProcurementReplenishmentDetail(m)},onConfirmReplenishment:m=>{typeof window<"u"&&!window.confirm(p("replenishment.confirmPrompt"))||e.confirmProcurementReplenishment(m)},onDeleteReplenishmentDraft:m=>{typeof window<"u"&&!window.confirm(p("replenishment.deleteConfirm"))||e.deleteProcurementReplenishmentDraft(m)},onClearReplenishmentDetail:()=>{e.replenishmentDetail=null,e.replenishmentDetailId=null},onRefresh:()=>(e.procurementPage=1,e.loadProcurementSuggestions()),onToggleSelect:m=>{e.procurementSelectedKeys.includes(m)?e.procurementSelectedKeys=e.procurementSelectedKeys.filter($=>$!==m):e.procurementSelectedKeys=[...e.procurementSelectedKeys,m]},onApprove:m=>{if(typeof window<"u"&&!window.confirm(p("procurement.approveConfirm")))return;const $=[{product_key:m.product_key,product_name:m.product_name,specification:m.specification,shortfall:m.shortfall,code:m.code}];rc(e,$).then(L=>{L&&(L.approved_count??0)>0&&(e.procurementApprovedKeys=[...e.procurementApprovedKeys,Je(m)])})},onApproveBatch:()=>{const m=e.procurementSuggestions.filter(L=>e.procurementSelectedKeys.includes(Je(L)));if(m.length===0||typeof window<"u"&&!window.confirm(p("procurement.approveBatchConfirm",{count:String(m.length)})))return;const $=m.map(L=>({product_key:L.product_key,product_name:L.product_name,specification:L.specification,shortfall:L.shortfall,code:L.code}));rc(e,$).then(L=>{if(L&&(L.approved_count??0)>0){const I=m.map(P=>Je(P));e.procurementApprovedKeys=[...e.procurementApprovedKeys,...I],e.procurementSelectedKeys=e.procurementSelectedKeys.filter(P=>!I.includes(P))}})},onFilterQueryChange:m=>{e.procurementFilterQuery=m,e.procurementPage=1},onSortByChange:m=>{e.procurementSortBy=m,e.procurementPage=1},onSortDirChange:m=>{e.procurementSortDir=m,e.procurementPage=1},onPageChange:m=>{e.procurementPage=Math.max(1,m)},onPageSizeChange:m=>{e.procurementPageSize=Math.max(1,m),e.procurementPage=1}}):S}

        ${sb(e)}

        ${e.tab==="cron"?Hx({basePath:e.basePath,loading:e.fulfillDraftsLoading,error:e.fulfillDraftsError,drafts:e.fulfillDrafts,detail:e.fulfillDetail,detailId:e.fulfillDetailId,confirmBusy:e.fulfillConfirmBusy,confirmResult:e.fulfillConfirmResult,filterQuery:e.fulfillFilterQuery,sortBy:e.fulfillSortBy,sortDir:e.fulfillSortDir,page:e.fulfillPage,pageSize:e.fulfillPageSize,onRefresh:()=>(e.fulfillPage=1,e.loadFulfillDrafts()),onSelectDraft:m=>Yg(e,m),onConfirm:m=>{var F;const $=e.fulfillDetailId===m?e.fulfillDetail:null,L=((F=$==null?void 0:$.lines)==null?void 0:F.length)??0,I=(($==null?void 0:$.lines)??[]).reduce((U,W)=>U+Number(W.amount??0),0),P=L>0?p("fulfill.confirmPrompt",{count:String(L),amount:I.toFixed(2)}):p("fulfill.confirmPromptSimple");typeof window<"u"&&window.confirm(P)&&Xg(e,m).then(U=>{U!=null&&U.order_id&&e.loadProcurementSuggestions()})},onClearDetail:()=>{e.fulfillDetail=null,e.fulfillDetailId=null,e.fulfillConfirmResult=null},onFilterQueryChange:m=>{e.fulfillFilterQuery=m,e.fulfillPage=1},onSortByChange:m=>{e.fulfillSortBy=m,e.fulfillPage=1},onSortDirChange:m=>{e.fulfillSortDir=m,e.fulfillPage=1},onPageChange:m=>{e.fulfillPage=Math.max(1,m)},onPageSizeChange:m=>{e.fulfillPageSize=Math.max(1,m),e.fulfillPage=1}}):S}

        ${e.tab==="agents"?t0({loading:e.agentsLoading,error:e.agentsError,agentsList:e.agentsList,selectedAgentId:h,activePanel:e.agentsPanel,configForm:d,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,channelsLoading:e.channelsLoading,channelsError:e.channelsError,channelsSnapshot:e.channelsSnapshot,channelsLastSuccess:e.channelsLastSuccess,cronLoading:e.cronLoading,cronStatus:e.cronStatus,cronJobs:e.cronJobs,cronError:e.cronError,agentFilesLoading:e.agentFilesLoading,agentFilesError:e.agentFilesError,agentFilesList:e.agentFilesList,agentFileActive:e.agentFileActive,agentFileContents:e.agentFileContents,agentFileDrafts:e.agentFileDrafts,agentFileSaving:e.agentFileSaving,agentIdentityLoading:e.agentIdentityLoading,agentIdentityError:e.agentIdentityError,agentIdentityById:e.agentIdentityById,agentSkillsLoading:e.agentSkillsLoading,agentSkillsReport:e.agentSkillsReport,agentSkillsError:e.agentSkillsError,agentSkillsAgentId:e.agentSkillsAgentId,skillsFilter:e.skillsFilter,reportsLoading:e.reportsLoading,reportsError:e.reportsError,reportsTasks:e.reportsTasks,reportsRecords:e.reportsRecords,reportsAdminToken:e.reportsAdminToken,reportsEditingTaskId:e.reportsEditingTaskId,reportsEditForm:e.reportsEditForm,onRefresh:async()=>{var $,L;await Ma(e);const m=((L=($=e.agentsList)==null?void 0:$.agents)==null?void 0:L.map(I=>I.id))??[];m.length>0&&Xu(e,m)},onSelectAgent:m=>{e.agentsSelectedId!==m&&(e.agentsSelectedId=m,e.agentFilesList=null,e.agentFilesError=null,e.agentFilesLoading=!1,e.agentFileActive=null,e.agentFileContents={},e.agentFileDrafts={},e.agentSkillsReport=null,e.agentSkillsError=null,e.agentSkillsAgentId=null,Yu(e,m),e.agentsPanel==="files"&&hr(e,m),e.agentsPanel==="skills"&&Bs(e,m))},onSelectPanel:m=>{var $;e.agentsPanel=m,m==="files"&&h&&(($=e.agentFilesList)==null?void 0:$.agentId)!==h&&(e.agentFilesList=null,e.agentFilesError=null,e.agentFileActive=null,e.agentFileContents={},e.agentFileDrafts={},hr(e,h)),m==="skills"&&(h&&Bs(e,h),Bt(e)),m==="channels"&&Qe(e,!1),m==="cron"&&e.loadCron()},onLoadFiles:m=>hr(e,m),onSelectFile:m=>{e.agentFileActive=m,h&&kb(e,h,m)},onFileDraftChange:(m,$)=>{e.agentFileDrafts={...e.agentFileDrafts,[m]:$}},onFileReset:m=>{const $=e.agentFileContents[m]??"";e.agentFileDrafts={...e.agentFileDrafts,[m]:$}},onFileSave:m=>{if(!h)return;const $=e.agentFileDrafts[m]??e.agentFileContents[m]??"";$b(e,h,m,$)},onToolsProfileChange:(m,$,L)=>{var U;if(!d)return;const I=(U=d.agents)==null?void 0:U.list;if(!Array.isArray(I))return;const P=I.findIndex(W=>W&&typeof W=="object"&&"id"in W&&W.id===m);if(P<0)return;const F=["agents","list",P,"tools"];$?qe(e,[...F,"profile"],$):_t(e,[...F,"profile"]),L&&_t(e,[...F,"allow"])},onToolsOverridesChange:(m,$,L)=>{var U;if(!d)return;const I=(U=d.agents)==null?void 0:U.list;if(!Array.isArray(I))return;const P=I.findIndex(W=>W&&typeof W=="object"&&"id"in W&&W.id===m);if(P<0)return;const F=["agents","list",P,"tools"];$.length>0?qe(e,[...F,"alsoAllow"],$):_t(e,[...F,"alsoAllow"]),L.length>0?qe(e,[...F,"deny"],L):_t(e,[...F,"deny"])},onConfigReload:()=>yt(e),onConfigSave:()=>Ns(e),onChannelsRefresh:()=>Qe(e,!1),onCronRefresh:()=>e.loadCron(),onSkillsFilterChange:m=>e.skillsFilter=m,onSkillsRefresh:()=>{h&&Bs(e,h)},onAgentSkillToggle:(m,$,L)=>{var N,J,ge;if(!d)return;const I=(N=d.agents)==null?void 0:N.list;if(!Array.isArray(I))return;const P=I.findIndex(Q=>Q&&typeof Q=="object"&&"id"in Q&&Q.id===m);if(P<0)return;const F=I[P],U=$.trim();if(!U)return;const W=((ge=(J=e.agentSkillsReport)==null?void 0:J.skills)==null?void 0:ge.map(Q=>Q.name).filter(Boolean))??[],G=(Array.isArray(F.skills)?F.skills.map(Q=>String(Q).trim()).filter(Boolean):void 0)??W,le=new Set(G);L?le.add(U):le.delete(U),qe(e,["agents","list",P,"skills"],[...le])},onAgentSkillsClear:m=>{var I;if(!d)return;const $=(I=d.agents)==null?void 0:I.list;if(!Array.isArray($))return;const L=$.findIndex(P=>P&&typeof P=="object"&&"id"in P&&P.id===m);L<0||_t(e,["agents","list",L,"skills"])},onAgentSkillsDisableAll:m=>{var I;if(!d)return;const $=(I=d.agents)==null?void 0:I.list;if(!Array.isArray($))return;const L=$.findIndex(P=>P&&typeof P=="object"&&"id"in P&&P.id===m);L<0||qe(e,["agents","list",L,"skills"],[])},onReportsTokenChange:m=>{e.reportsAdminToken=m},onReportsRefresh:()=>{Bt(e)},onReportsRun:m=>{fc(e,m)},onReportsEditStart:m=>{e.reportsEditingTaskId=m.task_key,e.reportsEditForm={enabled:m.enabled,cron_expr:m.cron_expr,timezone:m.timezone,title:m.title}},onReportsEditCancel:()=>{e.reportsEditingTaskId=null,e.reportsEditForm={}},onReportsEditChange:m=>{e.reportsEditForm=m},onReportsEditSave:m=>{const $=e.reportsEditForm;gv(e,m,$).then(()=>{e.reportsError||(e.reportsEditingTaskId=null,e.reportsEditForm={})})},onModelChange:(m,$)=>{var W;if(!d)return;const L=(W=d.agents)==null?void 0:W.list;if(!Array.isArray(L))return;const I=L.findIndex(O=>O&&typeof O=="object"&&"id"in O&&O.id===m);if(I<0)return;const P=["agents","list",I,"model"];if(!$){_t(e,P);return}const F=L[I],U=F==null?void 0:F.model;if(U&&typeof U=="object"&&!Array.isArray(U)){const O=U.fallbacks,G={primary:$,...Array.isArray(O)?{fallbacks:O}:{}};qe(e,P,G)}else qe(e,P,$)},onModelFallbacksChange:(m,$)=>{var N;if(!d)return;const L=(N=d.agents)==null?void 0:N.list;if(!Array.isArray(L))return;const I=L.findIndex(J=>J&&typeof J=="object"&&"id"in J&&J.id===m);if(I<0)return;const P=["agents","list",I,"model"],F=L[I],U=$.map(J=>J.trim()).filter(Boolean),W=F.model,G=(()=>{if(typeof W=="string")return W.trim()||null;if(W&&typeof W=="object"&&!Array.isArray(W)){const J=W.primary;if(typeof J=="string")return J.trim()||null}return null})();if(U.length===0){G?qe(e,P,G):_t(e,P);return}qe(e,P,G?{primary:G,fallbacks:U}:{fallbacks:U})}}):S}

        ${e.tab==="skills"?n2({loading:e.skillsLoading,report:e.skillsReport,error:e.skillsError,filter:e.skillsFilter,edits:e.skillEdits,messages:e.skillMessages,busyKey:e.skillsBusyKey,onFilterChange:m=>e.skillsFilter=m,onRefresh:()=>Ji(e,{clearMessages:!0}),onToggle:(m,$)=>ev(e,m,$),onEdit:(m,$)=>Zm(e,m,$),onSaveKey:m=>tv(e,m),onInstall:(m,$,L)=>nv(e,m,$,L)}):S}

        ${e.tab==="nodes"?A1({loading:e.nodesLoading,nodes:e.nodes,devicesLoading:e.devicesLoading,devicesError:e.devicesError,devicesList:e.devicesList,configForm:e.configForm??((M=e.configSnapshot)==null?void 0:M.config),configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,configFormMode:e.configFormMode,execApprovalsLoading:e.execApprovalsLoading,execApprovalsSaving:e.execApprovalsSaving,execApprovalsDirty:e.execApprovalsDirty,execApprovalsSnapshot:e.execApprovalsSnapshot,execApprovalsForm:e.execApprovalsForm,execApprovalsSelectedAgent:e.execApprovalsSelectedAgent,execApprovalsTarget:e.execApprovalsTarget,execApprovalsTargetNodeId:e.execApprovalsTargetNodeId,onRefresh:()=>yo(e),onDevicesRefresh:()=>Qt(e),onDeviceApprove:m=>Om(e,m),onDeviceReject:m=>Fm(e,m),onDeviceRotate:(m,$,L)=>Nm(e,{deviceId:m,role:$,scopes:L}),onDeviceRevoke:(m,$)=>Bm(e,{deviceId:m,role:$}),onLoadConfig:()=>yt(e),onLoadExecApprovals:()=>{const m=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return ja(e,m)},onBindDefault:m=>{m?qe(e,["tools","exec","node"],m):_t(e,["tools","exec","node"])},onBindAgent:(m,$)=>{const L=["agents","list",m,"tools","exec","node"];$?qe(e,L,$):_t(e,L)},onSaveBindings:()=>Ns(e),onExecApprovalsTargetChange:(m,$)=>{e.execApprovalsTarget=m,e.execApprovalsTargetNodeId=$,e.execApprovalsSnapshot=null,e.execApprovalsForm=null,e.execApprovalsDirty=!1,e.execApprovalsSelectedAgent=null},onExecApprovalsSelectAgent:m=>{e.execApprovalsSelectedAgent=m},onExecApprovalsPatch:(m,$)=>qm(e,m,$),onExecApprovalsRemove:m=>Km(e,m),onSaveExecApprovals:()=>{const m=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return jm(e,m)}}):S}

        ${e.tab==="reports"?N1({reportsLoading:e.reportsLoading,reportsError:e.reportsError,reportsTasks:e.reportsTasks,reportsRecords:e.reportsRecords,reportsAdminToken:e.reportsAdminToken,selectedRecordId:e.selectedRecordId,reportDetailLoading:e.reportDetailLoading,reportDetail:e.reportDetail,reportsCopyJustDone:e.reportsCopyJustDone,onTokenChange:m=>{e.reportsAdminToken=m},onRefresh:()=>Bt(e),onRun:m=>{fc(e,m)},onSelectRecord:m=>_h(e,m),onCopy:()=>{var m;(m=e.reportDetail)!=null&&m.report_md&&navigator.clipboard.writeText(e.reportDetail.report_md).then(()=>{e.reportsCopyJustDone=!0,window.setTimeout(()=>{e.reportsCopyJustDone=!1},2e3)}).catch($=>{e.reportsError=$ instanceof Error?$.message:String($)})},onReformat:m=>mv(e,m)}):S}

        ${e.tab==="chat"?bx({sessionKey:e.sessionKey,onSessionKeyChange:m=>{e.sessionKey=m,e.chatMessage="",e.chatAttachments=[],e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.chatQueue=[],e.resetToolStream(),e.resetToolRender(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:m,lastActiveSessionKey:m}),e.loadAssistantIdentity(),Qn(e),qr(e)},thinkingLevel:e.chatThinkingLevel,showThinking:a,loading:e.chatLoading,sending:e.chatSending,compactionStatus:e.compactionStatus,toolRenderData:e.toolRenderData,toolRenderSeq:e.toolRenderSeq,toolRenderItems:e.toolRenderItems,assistantAvatarUrl:c,messages:e.chatMessages,toolMessages:e.chatToolMessages,stream:e.chatStream,streamStartedAt:e.chatStreamStartedAt,draft:e.chatMessage,queue:e.chatQueue,connected:e.connected,canSend:e.connected,disabledReason:s,error:e.lastError,sessions:e.sessionsResult,focusMode:r,onRefresh:()=>(e.resetToolStream(),Promise.all([Qn(e),qr(e)])),onToggleFocusMode:()=>{e.onboarding||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})},onChatScroll:m=>e.handleChatScroll(m),onDraftChange:m=>e.chatMessage=m,attachments:e.chatAttachments,onAttachmentsChange:m=>e.chatAttachments=m,uploadedFile:e.chatUploadedFile,onFileSelect:m=>e.handleUploadChatFile(m),onClearUploadedFile:()=>e.clearChatUploadedFile(),composeDragOver:e.chatComposeDragOver,onComposeDragOver:()=>e.setChatComposeDragOver(!0),onComposeDragLeave:()=>e.setChatComposeDragOver(!1),onComposeDrop:m=>e.handleComposeDrop(m),onSend:()=>e.handleSendChat(),canAbort:!!e.chatRunId,onAbort:()=>void e.handleAbortChat(),onQueueRemove:m=>e.removeQueuedMessage(m),onNewSession:()=>e.handleSendChat("/new",{restoreDraft:!0}),showNewMessages:e.chatNewMessagesBelow&&!e.chatManualRefreshInFlight,onScrollToBottom:()=>e.scrollToBottom(),sidebarOpen:e.sidebarOpen,sidebarContent:e.sidebarContent,sidebarError:e.sidebarError,splitRatio:e.splitRatio,onOpenSidebar:m=>e.handleOpenSidebar(m),onCloseSidebar:()=>e.handleCloseSidebar(),onSplitRatioChange:m=>e.handleSplitRatioChange(m),assistantName:e.assistantName,assistantAvatar:e.assistantAvatar}):S}

        ${e.tab==="config"?Nx({raw:e.configRaw,originalRaw:e.configRawOriginal,valid:e.configValid,issues:e.configIssues,loading:e.configLoading,saving:e.configSaving,applying:e.configApplying,updating:e.updateRunning,connected:e.connected,schema:e.configSchema,schemaLoading:e.configSchemaLoading,uiHints:e.configUiHints,formMode:e.configFormMode,formValue:e.configForm,originalValue:e.configFormOriginal,searchQuery:e.configSearchQuery,activeSection:e.configActiveSection,activeSubsection:e.configActiveSubsection,onRawChange:m=>{e.configRaw=m},onFormModeChange:m=>e.configFormMode=m,onFormPatch:(m,$)=>qe(e,m,$),onSearchChange:m=>e.configSearchQuery=m,onSectionChange:m=>{e.configActiveSection=m,e.configActiveSubsection=null},onSubsectionChange:m=>e.configActiveSubsection=m,onReload:()=>yt(e),onSave:()=>Ns(e),onApply:()=>ug(e),onUpdate:()=>hg(e)}):S}

        ${e.tab==="admin-data"?Yx({host:{basePath:e.basePath??"",adminData:e.adminData},onLogin:async m=>{const $=e;await sv($,m),e.adminData.token&&(await gn($),await mn($))},onLogout:()=>{Rt(e)},onSubTab:m=>{e.adminData={...e.adminData,activeSubTab:m}},onPriceQueryInput:m=>{e.adminData={...e.adminData,priceQuery:m}},onPriceQueryApply:async()=>{e.adminData={...e.adminData,pricePage:1},await gn(e)},onPriceRefresh:()=>gn(e),onPriceFieldChange:(m,$)=>ov(e,m,$),onPriceSave:async m=>{const $=e.adminData.priceItems[m];$&&await av(e,$)},onPriceDelete:async m=>{await lv(e,m)},onPriceUpload:async m=>{await cv(e,m)},onPriceAddRow:()=>rv(e),onMappingQueryInput:m=>{e.adminData={...e.adminData,mappingQuery:m}},onMappingQueryApply:async()=>{e.adminData={...e.adminData,mappingPage:1},await mn(e)},onMappingRefresh:()=>mn(e),onMappingFieldChange:(m,$)=>dv(e,m,$),onMappingSave:async m=>{const $=e.adminData.mappingItems[m];$&&await hv(e,$)},onMappingDelete:async m=>{await fv(e,m)},onMappingUpload:async m=>{await pv(e,m)},onMappingAddRow:()=>uv(e)}):S}

        ${e.tab==="debug"?qx({loading:e.debugLoading,status:e.debugStatus,health:e.debugHealth,models:e.debugModels,heartbeat:e.debugHeartbeat,eventLog:e.eventLog,callMethod:e.debugCallMethod,callParams:e.debugCallParams,callResult:e.debugCallResult,callError:e.debugCallError,onCallMethodChange:m=>e.debugCallMethod=m,onCallParamsChange:m=>e.debugCallParams=m,onRefresh:()=>vo(e),onCall:()=>Lg(e)}):S}

        ${e.tab==="logs"?t1({loading:e.logsLoading,error:e.logsError,file:e.logsFile,entries:e.logsEntries,filterText:e.logsFilterText,levelFilters:e.logsLevelFilters,autoFollow:e.logsAutoFollow,truncated:e.logsTruncated,onFilterTextChange:m=>e.logsFilterText=m,onLevelToggle:(m,$)=>{e.logsLevelFilters={...e.logsLevelFilters,[m]:$}},onToggleAutoFollow:m=>e.logsAutoFollow=m,onRefresh:()=>Ta(e,{reset:!0}),onExport:(m,$)=>e.exportLogs(m,$),onScroll:m=>e.handleLogsScroll(m)}):S}
      </main>
      ${Wx(e)}
      ${Vx(e)}
    </div>
  `}var l2=Object.defineProperty,c2=Object.getOwnPropertyDescriptor,x=(e,t,n,i)=>{for(var s=i>1?void 0:i?c2(t,n):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(s=(i?r(t,n,s):r(s))||s);return i&&s&&l2(t,n,s),s};const Pr=Ga({});function d2(){if(!window.location.search)return!1;const t=new URLSearchParams(window.location.search).get("onboarding");if(!t)return!1;const n=t.trim().toLowerCase();return n==="1"||n==="true"||n==="yes"||n==="on"}let w=class extends pn{constructor(){super(),this.i18nController=new ig(this),this.settings=xv(),this.password="",this.tab="chat",this.onboarding=d2(),this.connected=!1,this.theme=this.settings.theme??"system",this.themeResolved="dark",this.hello=null,this.lastError=null,this.eventLog=[],this.eventLogBuffer=[],this.toolStreamSyncTimer=null,this.sidebarCloseTimer=null,this.assistantName=Pr.name,this.assistantAvatar=Pr.avatar,this.assistantAgentId=Pr.agentId??null,this.sessionKey=this.settings.sessionKey,this.chatLoading=!1,this.chatSending=!1,this.chatMessage="",this.chatMessages=[],this.chatToolMessages=[],this.chatStream=null,this.chatStreamStartedAt=null,this.chatRunId=null,this.compactionStatus=null,this.chatAvatarUrl=null,this.chatThinkingLevel=null,this.chatQueue=[],this.chatAttachments=[],this.chatUploadedFile=null,this.chatComposeDragOver=!1,this.chatManualRefreshInFlight=!1,this.sidebarOpen=!1,this.sidebarContent=null,this.sidebarError=null,this.splitRatio=this.settings.splitRatio,this.nodesLoading=!1,this.nodes=[],this.devicesLoading=!1,this.devicesError=null,this.devicesList=null,this.execApprovalsLoading=!1,this.execApprovalsSaving=!1,this.execApprovalsDirty=!1,this.execApprovalsSnapshot=null,this.execApprovalsForm=null,this.execApprovalsSelectedAgent=null,this.execApprovalsTarget="gateway",this.execApprovalsTargetNodeId=null,this.execApprovalQueue=[],this.execApprovalBusy=!1,this.execApprovalError=null,this.pendingGatewayUrl=null,this.configLoading=!1,this.configRaw=`{
}
`,this.configRawOriginal="",this.configValid=null,this.configIssues=[],this.configSaving=!1,this.configApplying=!1,this.updateRunning=!1,this.applySessionKey=this.settings.lastActiveSessionKey,this.configSnapshot=null,this.configSchema=null,this.configSchemaVersion=null,this.configSchemaLoading=!1,this.configUiHints={},this.configForm=null,this.configFormOriginal=null,this.configFormDirty=!1,this.configFormMode="form",this.configSearchQuery="",this.configActiveSection=null,this.configActiveSubsection=null,this.channelsLoading=!1,this.channelsSnapshot=null,this.channelsError=null,this.channelsLastSuccess=null,this.bkContent="",this.bkLoading=!1,this.bkError=null,this.bkSaving=!1,this.bkLastSuccess=null,this.bkDependentFiles=null,this.whatsappLoginMessage=null,this.whatsappLoginQrDataUrl=null,this.whatsappLoginConnected=null,this.whatsappBusy=!1,this.nostrProfileFormState=null,this.nostrProfileAccountId=null,this.presenceLoading=!1,this.presenceEntries=[],this.presenceError=null,this.presenceStatus=null,this.oosLoading=!1,this.oosError=null,this.oosStats=null,this.oosList=[],this.oosByFile=[],this.oosByTime=[],this.oosShowAddForm=!1,this.oosDb=null,this.shortageLoading=!1,this.shortageError=null,this.shortageStats=null,this.shortageList=[],this.shortageByFile=[],this.shortageByTime=[],this.shortageShowAddForm=!1,this.shortageDb=null,this.overviewOosStats=null,this.overviewOosError=null,this.overviewShortageStats=null,this.overviewShortageError=null,this.dashboardLoading=!1,this.dashboardError=null,this.quotationStats=null,this.dashboardOosByTime=[],this.dashboardShortageByTime=[],this.agentsLoading=!1,this.agentsList=null,this.agentsError=null,this.agentsSelectedId=null,this.agentsPanel="overview",this.agentFilesLoading=!1,this.agentFilesError=null,this.agentFilesList=null,this.agentFileContents={},this.agentFileDrafts={},this.agentFileActive=null,this.agentFileSaving=!1,this.agentIdentityLoading=!1,this.agentIdentityError=null,this.agentIdentityById={},this.agentSkillsLoading=!1,this.agentSkillsError=null,this.agentSkillsReport=null,this.agentSkillsAgentId=null,this.sessionsLoading=!1,this.sessionsResult=null,this.sessionsError=null,this.sessionsFilterActive="",this.sessionsFilterLimit="120",this.sessionsIncludeGlobal=!0,this.sessionsIncludeUnknown=!1,this.usageLoading=!1,this.usageResult=null,this.usageCostSummary=null,this.usageError=null,this.usageRequestSeq=0,this.usageTimeSeriesRequestSeq=0,this.usageSessionLogsRequestSeq=0,this.usageStartDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageEndDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageSelectedSessions=[],this.usageSelectedDays=[],this.usageSelectedHours=[],this.usageChartMode="tokens",this.usageDailyChartMode="by-type",this.usageTimeSeriesMode="per-turn",this.usageTimeSeriesBreakdownMode="by-type",this.usageTimeSeries=null,this.usageTimeSeriesLoading=!1,this.usageTimeSeriesCursorStart=null,this.usageTimeSeriesCursorEnd=null,this.usageSessionLogs=null,this.usageSessionLogsLoading=!1,this.usageSessionLogsExpanded=!1,this.usageQuery="",this.usageQueryDraft="",this.usageSessionSort="recent",this.usageSessionSortDir="desc",this.usageRecentSessions=[],this.usageTimeZone="local",this.usageContextExpanded=!1,this.usageHeaderPinned=!1,this.usageSessionsTab="all",this.usageVisibleColumns=["channel","agent","provider","model","messages","tools","errors","duration"],this.usageLogFilterRoles=[],this.usageLogFilterTools=[],this.usageLogFilterHasTools=!1,this.usageLogFilterQuery="",this.usageQueryDebounceTimer=null,this.workFilePaths=[],this.workOriginalFileNamesByPath={},this.workRunning=!1,this.workProgressStage=0,this._workProgressInterval=null,this.workRunStatus="idle",this.workRunId=null,this.workPendingChoices=[],this.workSelections={},this.workResult=null,this.workError=null,this.workCustomerLevel="B_QUOTE",this.workDoRegisterOos=!1,this.workPendingQuotationDraft=null,this.workQuotationDraftSaveStatus=null,this.workTextInput="",this.workTextGenerating=!1,this.workTextError=null,this.workPriceLevelOptions=[],this.cronLoading=!1,this.cronJobs=[],this.cronStatus=null,this.cronError=null,this.cronForm={...my},this.cronRunsJobId=null,this.cronRuns=[],this.cronBusy=!1,this.fulfillDraftsLoading=!1,this.fulfillDraftsError=null,this.fulfillDrafts=[],this.fulfillDetail=null,this.fulfillDetailId=null,this.fulfillConfirmBusy=!1,this.fulfillConfirmResult=null,this.fulfillFilterQuery="",this.fulfillSortBy="created_at",this.fulfillSortDir="desc",this.fulfillPage=1,this.fulfillPageSize=10,this.procurementLoading=!1,this.procurementError=null,this.procurementSuggestions=[],this.procurementSelectedKeys=[],this.procurementApprovedKeys=[],this.procurementApproveBusy=!1,this.procurementApproveResult=null,this.procurementFilterQuery="",this.procurementSortBy="uploaded_at",this.procurementSortDir="desc",this.procurementPage=1,this.procurementPageSize=10,this.replenishmentDrafts=[],this.replenishmentDetail=null,this.replenishmentDetailId=null,this.replenishmentLoading=!1,this.replenishmentError=null,this.replenishmentConfirmBusy=!1,this.replenishmentConfirmResult=null,this.replenishmentInputLines=[{product_or_code:"",quantity:0}],this.replenishmentCreateBusy=!1,this.skillsLoading=!1,this.skillsReport=null,this.skillsError=null,this.skillsFilter="",this.skillEdits={},this.skillsBusyKey=null,this.skillMessages={},this.reportsLoading=!1,this.reportsError=null,this.reportsTasks=[],this.reportsRecords=[],this.reportsAdminToken="",this.reportsEditingTaskId=null,this.reportsEditForm={},this.reportDetail=null,this.reportDetailLoading=!1,this.selectedRecordId=null,this.reportsCopyJustDone=!1,this.debugLoading=!1,this.debugStatus=null,this.debugHealth=null,this.debugModels=[],this.debugHeartbeat=null,this.debugCallMethod="",this.debugCallParams="{}",this.debugCallResult=null,this.debugCallError=null,this.logsLoading=!1,this.logsError=null,this.logsFile=null,this.logsEntries=[],this.logsFilterText="",this.logsLevelFilters={...gy},this.logsAutoFollow=!0,this.logsTruncated=!1,this.logsCursor=null,this.logsLastFetchAt=null,this.logsLimit=500,this.logsMaxBytes=25e4,this.logsAtBottom=!0,this.adminData=iv(),this.client=null,this.chatScrollFrame=null,this.chatScrollTimeout=null,this.chatHasAutoScrolled=!1,this.chatUserNearBottom=!0,this.chatNewMessagesBelow=!1,this.nodesPollInterval=null,this.logsPollInterval=null,this.debugPollInterval=null,this.logsScrollFrame=null,this.toolStreamById=new Map,this.toolStreamOrder=[],this.toolRenderData=null,this.toolRenderSeq=null,this.toolRenderItems=[],this.refreshSessionsAfterChat=new Set,this.basePath="",this.popStateHandler=()=>Dv(this),this.themeMedia=null,this.themeMediaHandler=null,this.topbarObserver=null,Sa(this.settings.locale)&&bn.setLocale(this.settings.locale)}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),Yy(this)}firstUpdated(){Xy(this)}disconnectedCallback(){Jy(this),super.disconnectedCallback()}updated(e){e.has("workRunning")&&(this.workRunning?(this.workProgressStage=this.workRunStatus==="resuming"?1:0,this._workProgressInterval!=null&&(clearInterval(this._workProgressInterval),this._workProgressInterval=null)):(this._workProgressInterval!=null&&(clearInterval(this._workProgressInterval),this._workProgressInterval=null),this.workRunStatus==="done"&&(this.workProgressStage=2))),Zy(this,e)}connect(){zh(this)}handleChatScroll(e){Tg(this,e)}handleLogsScroll(e){Cg(this,e)}exportLogs(e,t){Eg(e,t)}resetToolStream(){Ao(this)}resetToolRender(){To(this)}resetChatScroll(){tc(this)}scrollToBottom(e){tc(this),Yi(this,!0,!!(e!=null&&e.smooth))}async loadAssistantIdentity(){await Nh(this)}applySettings(e){jt(this,e)}setTab(e){Tv(this,e)}setTheme(e,t){Cv(this,e,t)}async loadOverview(){await Lh(this)}async loadCron(){await Wa(this)}async loadFulfillDrafts(){await Ov(this)}async loadProcurementSuggestions(){await Fv(this)}async loadProcurementReplenishment(){await Xi(this)}async loadProcurementReplenishmentDetail(e){await om(this,e)}async confirmProcurementReplenishment(e){await am(this,e)}async deleteProcurementReplenishmentDraft(e){await lm(this,e)}onReplenishmentLineChange(e,t,n){const i=this.replenishmentInputLines.slice();e<0||e>=i.length||(i[e]={...i[e],[t]:n},this.replenishmentInputLines=i)}onReplenishmentAddLine(){this.replenishmentInputLines=[...this.replenishmentInputLines,{product_or_code:"",quantity:0}]}onReplenishmentRemoveLine(e){const t=this.replenishmentInputLines.filter((n,i)=>i!==e);this.replenishmentInputLines=t.length>0?t:[{product_or_code:"",quantity:0}]}async createProcurementReplenishmentDraft(){if(!this.replenishmentCreateBusy){this.replenishmentCreateBusy=!0,this.replenishmentError=null;try{const e=await rm(this,this.replenishmentInputLines);e&&(this.replenishmentInputLines=[{product_or_code:"",quantity:0}],await this.loadProcurementReplenishment(),await this.loadProcurementReplenishmentDetail(e.id))}finally{this.replenishmentCreateBusy=!1}}}async handleAbortChat(){await Dh(this)}removeQueuedMessage(e){dy(this,e)}async handleUploadChatFile(e){try{const t=await iy(this.basePath,e);this.chatUploadedFile=t,this.lastError=null}catch(t){this.lastError=t instanceof Error?t.message:String(t)}}clearChatUploadedFile(){this.chatUploadedFile=null}setChatComposeDragOver(e){this.chatComposeDragOver=e}async handleComposeDrop(e){this.chatComposeDragOver=!1,await this.handleUploadChatFile(e)}async handleSendChat(e,t){await uy(this,e,t)}async handleWhatsAppStart(e){await pg(this,e)}async handleWhatsAppWait(){await gg(this)}async handleWhatsAppLogout(){await mg(this)}async handleChannelConfigSave(){await vg(this)}async handleChannelConfigReload(){await yg(this)}handleNostrProfileEdit(e,t){xg(this,e,t)}handleNostrProfileCancel(){_g(this)}handleNostrProfileFieldChange(e,t){kg(this,e,t)}async handleNostrProfileSave(){await Sg(this)}async handleNostrProfileImport(){await Ag(this)}handleNostrProfileToggleAdvanced(){$g(this)}async handleExecApprovalDecision(e){const t=this.execApprovalQueue[0];if(!(!t||!this.client||this.execApprovalBusy)){this.execApprovalBusy=!0,this.execApprovalError=null;try{await this.client.request("exec.approval.resolve",{id:t.id,decision:e}),this.execApprovalQueue=this.execApprovalQueue.filter(n=>n.id!==t.id)}catch(n){this.execApprovalError=`Exec approval failed: ${String(n)}`}finally{this.execApprovalBusy=!1}}}handleGatewayUrlConfirm(){const e=this.pendingGatewayUrl;e&&(this.pendingGatewayUrl=null,jt(this,{...this.settings,gatewayUrl:e}),this.connect())}handleGatewayUrlCancel(){this.pendingGatewayUrl=null}handleOpenSidebar(e){this.sidebarCloseTimer!=null&&(window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=null),this.sidebarContent=e,this.sidebarError=null,this.sidebarOpen=!0}handleCloseSidebar(){this.sidebarOpen=!1,this.sidebarCloseTimer!=null&&window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=window.setTimeout(()=>{this.sidebarOpen||(this.sidebarContent=null,this.sidebarError=null,this.sidebarCloseTimer=null)},200)}handleSplitRatioChange(e){const t=Math.max(.4,Math.min(.7,e));this.splitRatio=t,this.applySettings({...this.settings,splitRatio:t})}render(){return a2(this)}};x([_()],w.prototype,"settings",2);x([_()],w.prototype,"password",2);x([_()],w.prototype,"tab",2);x([_()],w.prototype,"onboarding",2);x([_()],w.prototype,"connected",2);x([_()],w.prototype,"theme",2);x([_()],w.prototype,"themeResolved",2);x([_()],w.prototype,"hello",2);x([_()],w.prototype,"lastError",2);x([_()],w.prototype,"eventLog",2);x([_()],w.prototype,"assistantName",2);x([_()],w.prototype,"assistantAvatar",2);x([_()],w.prototype,"assistantAgentId",2);x([_()],w.prototype,"sessionKey",2);x([_()],w.prototype,"chatLoading",2);x([_()],w.prototype,"chatSending",2);x([_()],w.prototype,"chatMessage",2);x([_()],w.prototype,"chatMessages",2);x([_()],w.prototype,"chatToolMessages",2);x([_()],w.prototype,"chatStream",2);x([_()],w.prototype,"chatStreamStartedAt",2);x([_()],w.prototype,"chatRunId",2);x([_()],w.prototype,"compactionStatus",2);x([_()],w.prototype,"chatAvatarUrl",2);x([_()],w.prototype,"chatThinkingLevel",2);x([_()],w.prototype,"chatQueue",2);x([_()],w.prototype,"chatAttachments",2);x([_()],w.prototype,"chatUploadedFile",2);x([_()],w.prototype,"chatComposeDragOver",2);x([_()],w.prototype,"chatManualRefreshInFlight",2);x([_()],w.prototype,"sidebarOpen",2);x([_()],w.prototype,"sidebarContent",2);x([_()],w.prototype,"sidebarError",2);x([_()],w.prototype,"splitRatio",2);x([_()],w.prototype,"nodesLoading",2);x([_()],w.prototype,"nodes",2);x([_()],w.prototype,"devicesLoading",2);x([_()],w.prototype,"devicesError",2);x([_()],w.prototype,"devicesList",2);x([_()],w.prototype,"execApprovalsLoading",2);x([_()],w.prototype,"execApprovalsSaving",2);x([_()],w.prototype,"execApprovalsDirty",2);x([_()],w.prototype,"execApprovalsSnapshot",2);x([_()],w.prototype,"execApprovalsForm",2);x([_()],w.prototype,"execApprovalsSelectedAgent",2);x([_()],w.prototype,"execApprovalsTarget",2);x([_()],w.prototype,"execApprovalsTargetNodeId",2);x([_()],w.prototype,"execApprovalQueue",2);x([_()],w.prototype,"execApprovalBusy",2);x([_()],w.prototype,"execApprovalError",2);x([_()],w.prototype,"pendingGatewayUrl",2);x([_()],w.prototype,"configLoading",2);x([_()],w.prototype,"configRaw",2);x([_()],w.prototype,"configRawOriginal",2);x([_()],w.prototype,"configValid",2);x([_()],w.prototype,"configIssues",2);x([_()],w.prototype,"configSaving",2);x([_()],w.prototype,"configApplying",2);x([_()],w.prototype,"updateRunning",2);x([_()],w.prototype,"applySessionKey",2);x([_()],w.prototype,"configSnapshot",2);x([_()],w.prototype,"configSchema",2);x([_()],w.prototype,"configSchemaVersion",2);x([_()],w.prototype,"configSchemaLoading",2);x([_()],w.prototype,"configUiHints",2);x([_()],w.prototype,"configForm",2);x([_()],w.prototype,"configFormOriginal",2);x([_()],w.prototype,"configFormDirty",2);x([_()],w.prototype,"configFormMode",2);x([_()],w.prototype,"configSearchQuery",2);x([_()],w.prototype,"configActiveSection",2);x([_()],w.prototype,"configActiveSubsection",2);x([_()],w.prototype,"channelsLoading",2);x([_()],w.prototype,"channelsSnapshot",2);x([_()],w.prototype,"channelsError",2);x([_()],w.prototype,"channelsLastSuccess",2);x([_()],w.prototype,"bkContent",2);x([_()],w.prototype,"bkLoading",2);x([_()],w.prototype,"bkError",2);x([_()],w.prototype,"bkSaving",2);x([_()],w.prototype,"bkLastSuccess",2);x([_()],w.prototype,"bkDependentFiles",2);x([_()],w.prototype,"whatsappLoginMessage",2);x([_()],w.prototype,"whatsappLoginQrDataUrl",2);x([_()],w.prototype,"whatsappLoginConnected",2);x([_()],w.prototype,"whatsappBusy",2);x([_()],w.prototype,"nostrProfileFormState",2);x([_()],w.prototype,"nostrProfileAccountId",2);x([_()],w.prototype,"presenceLoading",2);x([_()],w.prototype,"presenceEntries",2);x([_()],w.prototype,"presenceError",2);x([_()],w.prototype,"presenceStatus",2);x([_()],w.prototype,"oosLoading",2);x([_()],w.prototype,"oosError",2);x([_()],w.prototype,"oosStats",2);x([_()],w.prototype,"oosList",2);x([_()],w.prototype,"oosByFile",2);x([_()],w.prototype,"oosByTime",2);x([_()],w.prototype,"oosShowAddForm",2);x([_()],w.prototype,"oosDb",2);x([_()],w.prototype,"shortageLoading",2);x([_()],w.prototype,"shortageError",2);x([_()],w.prototype,"shortageStats",2);x([_()],w.prototype,"shortageList",2);x([_()],w.prototype,"shortageByFile",2);x([_()],w.prototype,"shortageByTime",2);x([_()],w.prototype,"shortageShowAddForm",2);x([_()],w.prototype,"shortageDb",2);x([_()],w.prototype,"overviewOosStats",2);x([_()],w.prototype,"overviewOosError",2);x([_()],w.prototype,"overviewShortageStats",2);x([_()],w.prototype,"overviewShortageError",2);x([_()],w.prototype,"dashboardLoading",2);x([_()],w.prototype,"dashboardError",2);x([_()],w.prototype,"quotationStats",2);x([_()],w.prototype,"dashboardOosByTime",2);x([_()],w.prototype,"dashboardShortageByTime",2);x([_()],w.prototype,"agentsLoading",2);x([_()],w.prototype,"agentsList",2);x([_()],w.prototype,"agentsError",2);x([_()],w.prototype,"agentsSelectedId",2);x([_()],w.prototype,"agentsPanel",2);x([_()],w.prototype,"agentFilesLoading",2);x([_()],w.prototype,"agentFilesError",2);x([_()],w.prototype,"agentFilesList",2);x([_()],w.prototype,"agentFileContents",2);x([_()],w.prototype,"agentFileDrafts",2);x([_()],w.prototype,"agentFileActive",2);x([_()],w.prototype,"agentFileSaving",2);x([_()],w.prototype,"agentIdentityLoading",2);x([_()],w.prototype,"agentIdentityError",2);x([_()],w.prototype,"agentIdentityById",2);x([_()],w.prototype,"agentSkillsLoading",2);x([_()],w.prototype,"agentSkillsError",2);x([_()],w.prototype,"agentSkillsReport",2);x([_()],w.prototype,"agentSkillsAgentId",2);x([_()],w.prototype,"sessionsLoading",2);x([_()],w.prototype,"sessionsResult",2);x([_()],w.prototype,"sessionsError",2);x([_()],w.prototype,"sessionsFilterActive",2);x([_()],w.prototype,"sessionsFilterLimit",2);x([_()],w.prototype,"sessionsIncludeGlobal",2);x([_()],w.prototype,"sessionsIncludeUnknown",2);x([_()],w.prototype,"usageLoading",2);x([_()],w.prototype,"usageResult",2);x([_()],w.prototype,"usageCostSummary",2);x([_()],w.prototype,"usageError",2);x([_()],w.prototype,"usageStartDate",2);x([_()],w.prototype,"usageEndDate",2);x([_()],w.prototype,"usageSelectedSessions",2);x([_()],w.prototype,"usageSelectedDays",2);x([_()],w.prototype,"usageSelectedHours",2);x([_()],w.prototype,"usageChartMode",2);x([_()],w.prototype,"usageDailyChartMode",2);x([_()],w.prototype,"usageTimeSeriesMode",2);x([_()],w.prototype,"usageTimeSeriesBreakdownMode",2);x([_()],w.prototype,"usageTimeSeries",2);x([_()],w.prototype,"usageTimeSeriesLoading",2);x([_()],w.prototype,"usageTimeSeriesCursorStart",2);x([_()],w.prototype,"usageTimeSeriesCursorEnd",2);x([_()],w.prototype,"usageSessionLogs",2);x([_()],w.prototype,"usageSessionLogsLoading",2);x([_()],w.prototype,"usageSessionLogsExpanded",2);x([_()],w.prototype,"usageQuery",2);x([_()],w.prototype,"usageQueryDraft",2);x([_()],w.prototype,"usageSessionSort",2);x([_()],w.prototype,"usageSessionSortDir",2);x([_()],w.prototype,"usageRecentSessions",2);x([_()],w.prototype,"usageTimeZone",2);x([_()],w.prototype,"usageContextExpanded",2);x([_()],w.prototype,"usageHeaderPinned",2);x([_()],w.prototype,"usageSessionsTab",2);x([_()],w.prototype,"usageVisibleColumns",2);x([_()],w.prototype,"usageLogFilterRoles",2);x([_()],w.prototype,"usageLogFilterTools",2);x([_()],w.prototype,"usageLogFilterHasTools",2);x([_()],w.prototype,"usageLogFilterQuery",2);x([_()],w.prototype,"workFilePaths",2);x([_()],w.prototype,"workOriginalFileNamesByPath",2);x([_()],w.prototype,"workRunning",2);x([_()],w.prototype,"workProgressStage",2);x([_()],w.prototype,"workRunStatus",2);x([_()],w.prototype,"workRunId",2);x([_()],w.prototype,"workPendingChoices",2);x([_()],w.prototype,"workSelections",2);x([_()],w.prototype,"workResult",2);x([_()],w.prototype,"workError",2);x([_()],w.prototype,"workCustomerLevel",2);x([_()],w.prototype,"workDoRegisterOos",2);x([_()],w.prototype,"workPendingQuotationDraft",2);x([_()],w.prototype,"workQuotationDraftSaveStatus",2);x([_()],w.prototype,"workTextInput",2);x([_()],w.prototype,"workTextGenerating",2);x([_()],w.prototype,"workTextError",2);x([_()],w.prototype,"workPriceLevelOptions",2);x([_()],w.prototype,"cronLoading",2);x([_()],w.prototype,"cronJobs",2);x([_()],w.prototype,"cronStatus",2);x([_()],w.prototype,"cronError",2);x([_()],w.prototype,"cronForm",2);x([_()],w.prototype,"cronRunsJobId",2);x([_()],w.prototype,"cronRuns",2);x([_()],w.prototype,"cronBusy",2);x([_()],w.prototype,"fulfillDraftsLoading",2);x([_()],w.prototype,"fulfillDraftsError",2);x([_()],w.prototype,"fulfillDrafts",2);x([_()],w.prototype,"fulfillDetail",2);x([_()],w.prototype,"fulfillDetailId",2);x([_()],w.prototype,"fulfillConfirmBusy",2);x([_()],w.prototype,"fulfillConfirmResult",2);x([_()],w.prototype,"fulfillFilterQuery",2);x([_()],w.prototype,"fulfillSortBy",2);x([_()],w.prototype,"fulfillSortDir",2);x([_()],w.prototype,"fulfillPage",2);x([_()],w.prototype,"fulfillPageSize",2);x([_()],w.prototype,"procurementLoading",2);x([_()],w.prototype,"procurementError",2);x([_()],w.prototype,"procurementSuggestions",2);x([_()],w.prototype,"procurementSelectedKeys",2);x([_()],w.prototype,"procurementApprovedKeys",2);x([_()],w.prototype,"procurementApproveBusy",2);x([_()],w.prototype,"procurementApproveResult",2);x([_()],w.prototype,"procurementFilterQuery",2);x([_()],w.prototype,"procurementSortBy",2);x([_()],w.prototype,"procurementSortDir",2);x([_()],w.prototype,"procurementPage",2);x([_()],w.prototype,"procurementPageSize",2);x([_()],w.prototype,"replenishmentDrafts",2);x([_()],w.prototype,"replenishmentDetail",2);x([_()],w.prototype,"replenishmentDetailId",2);x([_()],w.prototype,"replenishmentLoading",2);x([_()],w.prototype,"replenishmentError",2);x([_()],w.prototype,"replenishmentConfirmBusy",2);x([_()],w.prototype,"replenishmentConfirmResult",2);x([_()],w.prototype,"replenishmentInputLines",2);x([_()],w.prototype,"replenishmentCreateBusy",2);x([_()],w.prototype,"skillsLoading",2);x([_()],w.prototype,"skillsReport",2);x([_()],w.prototype,"skillsError",2);x([_()],w.prototype,"skillsFilter",2);x([_()],w.prototype,"skillEdits",2);x([_()],w.prototype,"skillsBusyKey",2);x([_()],w.prototype,"skillMessages",2);x([_()],w.prototype,"reportsLoading",2);x([_()],w.prototype,"reportsError",2);x([_()],w.prototype,"reportsTasks",2);x([_()],w.prototype,"reportsRecords",2);x([_()],w.prototype,"reportsAdminToken",2);x([_()],w.prototype,"reportsEditingTaskId",2);x([_()],w.prototype,"reportsEditForm",2);x([_()],w.prototype,"reportDetail",2);x([_()],w.prototype,"reportDetailLoading",2);x([_()],w.prototype,"selectedRecordId",2);x([_()],w.prototype,"reportsCopyJustDone",2);x([_()],w.prototype,"debugLoading",2);x([_()],w.prototype,"debugStatus",2);x([_()],w.prototype,"debugHealth",2);x([_()],w.prototype,"debugModels",2);x([_()],w.prototype,"debugHeartbeat",2);x([_()],w.prototype,"debugCallMethod",2);x([_()],w.prototype,"debugCallParams",2);x([_()],w.prototype,"debugCallResult",2);x([_()],w.prototype,"debugCallError",2);x([_()],w.prototype,"logsLoading",2);x([_()],w.prototype,"logsError",2);x([_()],w.prototype,"logsFile",2);x([_()],w.prototype,"logsEntries",2);x([_()],w.prototype,"logsFilterText",2);x([_()],w.prototype,"logsLevelFilters",2);x([_()],w.prototype,"logsAutoFollow",2);x([_()],w.prototype,"logsTruncated",2);x([_()],w.prototype,"logsCursor",2);x([_()],w.prototype,"logsLastFetchAt",2);x([_()],w.prototype,"logsLimit",2);x([_()],w.prototype,"logsMaxBytes",2);x([_()],w.prototype,"logsAtBottom",2);x([_()],w.prototype,"adminData",2);x([_()],w.prototype,"chatNewMessagesBelow",2);x([_()],w.prototype,"toolRenderData",2);x([_()],w.prototype,"toolRenderSeq",2);x([_()],w.prototype,"toolRenderItems",2);w=x([$a("openclaw-app")],w);
//# sourceMappingURL=index-B69JaN-P.js.map
