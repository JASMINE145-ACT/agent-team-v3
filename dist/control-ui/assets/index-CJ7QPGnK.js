var Rc=Object.defineProperty;var Lc=(e,t,n)=>t in e?Rc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var V=(e,t,n)=>Lc(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Wn=globalThis,No=Wn.ShadowRoot&&(Wn.ShadyCSS===void 0||Wn.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Oo=Symbol(),Ws=new WeakMap;let Aa=class{constructor(t,n,i){if(this._$cssResult$=!0,i!==Oo)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(No&&t===void 0){const i=n!==void 0&&n.length===1;i&&(t=Ws.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Ws.set(n,t))}return t}toString(){return this.cssText}};const Ic=e=>new Aa(typeof e=="string"?e:e+"",void 0,Oo),Pc=(e,...t)=>{const n=e.length===1?e[0]:t.reduce((i,o,s)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[s+1],e[0]);return new Aa(n,e,Oo)},Dc=(e,t)=>{if(No)e.adoptedStyleSheets=t.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of t){const i=document.createElement("style"),o=Wn.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=n.cssText,e.appendChild(i)}},Qs=No?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const i of t.cssRules)n+=i.cssText;return Ic(n)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Mc,defineProperty:Fc,getOwnPropertyDescriptor:Nc,getOwnPropertyNames:Oc,getOwnPropertySymbols:Bc,getPrototypeOf:Uc}=Object,it=globalThis,Vs=it.trustedTypes,qc=Vs?Vs.emptyScript:"",Ni=it.reactiveElementPolyfillSupport,an=(e,t)=>e,Zn={toAttribute(e,t){switch(t){case Boolean:e=e?qc:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},Bo=(e,t)=>!Mc(e,t),Xs={attribute:!0,type:String,converter:Zn,reflect:!1,useDefault:!1,hasChanged:Bo};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),it.litPropertyMetadata??(it.litPropertyMetadata=new WeakMap);let Nt=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=Xs){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(t,n),!n.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,n);o!==void 0&&Fc(this.prototype,t,o)}}static getPropertyDescriptor(t,n,i){const{get:o,set:s}=Nc(this.prototype,t)??{get(){return this[n]},set(r){this[n]=r}};return{get:o,set(r){const a=o==null?void 0:o.call(this);s==null||s.call(this,r),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Xs}static _$Ei(){if(this.hasOwnProperty(an("elementProperties")))return;const t=Uc(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(an("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(an("properties"))){const n=this.properties,i=[...Oc(n),...Bc(n)];for(const o of i)this.createProperty(o,n[o])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[i,o]of n)this.elementProperties.set(i,o)}this._$Eh=new Map;for(const[n,i]of this.elementProperties){const o=this._$Eu(n,i);o!==void 0&&this._$Eh.set(o,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const o of i)n.unshift(Qs(o))}else t!==void 0&&n.push(Qs(t));return n}static _$Eu(t,n){const i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(n=>n(this))}addController(t){var n;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((n=t.hostConnected)==null||n.call(t))}removeController(t){var n;(n=this._$EO)==null||n.delete(t)}_$E_(){const t=new Map,n=this.constructor.elementProperties;for(const i of n.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Dc(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(n=>{var i;return(i=n.hostConnected)==null?void 0:i.call(n)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(n=>{var i;return(i=n.hostDisconnected)==null?void 0:i.call(n)})}attributeChangedCallback(t,n,i){this._$AK(t,i)}_$ET(t,n){var s;const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(o!==void 0&&i.reflect===!0){const r=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:Zn).toAttribute(n,i.type);this._$Em=t,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(t,n){var s,r;const i=this.constructor,o=i._$Eh.get(t);if(o!==void 0&&this._$Em!==o){const a=i.getPropertyOptions(o),l=typeof a.converter=="function"?{fromAttribute:a.converter}:((s=a.converter)==null?void 0:s.fromAttribute)!==void 0?a.converter:Zn;this._$Em=o;const c=l.fromAttribute(n,a.type);this[o]=c??((r=this._$Ej)==null?void 0:r.get(o))??c,this._$Em=null}}requestUpdate(t,n,i,o=!1,s){var r;if(t!==void 0){const a=this.constructor;if(o===!1&&(s=this[t]),i??(i=a.getPropertyOptions(t)),!((i.hasChanged??Bo)(s,n)||i.useDefault&&i.reflect&&s===((r=this._$Ej)==null?void 0:r.get(t))&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,n,{useDefault:i,reflect:o,wrapped:s},r){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,r??n??this[t]),s!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(n=void 0),this._$AL.set(t,n)),o===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[s,r]of o){const{wrapped:a}=r,l=this[s];a!==!0||this._$AL.has(s)||l===void 0||this.C(s,void 0,r,l)}}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),(i=this._$EO)==null||i.forEach(o=>{var s;return(s=o.hostUpdate)==null?void 0:s.call(o)}),this.update(n)):this._$EM()}catch(o){throw t=!1,this._$EM(),o}t&&this._$AE(n)}willUpdate(t){}_$AE(t){var n;(n=this._$EO)==null||n.forEach(i=>{var o;return(o=i.hostUpdated)==null?void 0:o.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(n=>this._$ET(n,this[n]))),this._$EM()}updated(t){}firstUpdated(t){}};Nt.elementStyles=[],Nt.shadowRootOptions={mode:"open"},Nt[an("elementProperties")]=new Map,Nt[an("finalized")]=new Map,Ni==null||Ni({ReactiveElement:Nt}),(it.reactiveElementVersions??(it.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ln=globalThis,Js=e=>e,ei=ln.trustedTypes,Ys=ei?ei.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ca="$lit$",nt=`lit$${Math.random().toFixed(9).slice(2)}$`,Ta="?"+nt,zc=`<${Ta}>`,$t=document,gn=()=>$t.createComment(""),hn=e=>e===null||typeof e!="object"&&typeof e!="function",Uo=Array.isArray,Kc=e=>Uo(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",Oi=`[ 	
\f\r]`,Vt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Zs=/-->/g,er=/>/g,ft=RegExp(`>|${Oi}(?:([^\\s"'>=/]+)(${Oi}*=${Oi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),tr=/'/g,nr=/"/g,Ea=/^(?:script|style|textarea|title)$/i,Hc=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),d=Hc(1),rt=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),ir=new WeakMap,yt=$t.createTreeWalker($t,129);function Ra(e,t){if(!Uo(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ys!==void 0?Ys.createHTML(t):t}const jc=(e,t)=>{const n=e.length-1,i=[];let o,s=t===2?"<svg>":t===3?"<math>":"",r=Vt;for(let a=0;a<n;a++){const l=e[a];let c,p,f=-1,g=0;for(;g<l.length&&(r.lastIndex=g,p=r.exec(l),p!==null);)g=r.lastIndex,r===Vt?p[1]==="!--"?r=Zs:p[1]!==void 0?r=er:p[2]!==void 0?(Ea.test(p[2])&&(o=RegExp("</"+p[2],"g")),r=ft):p[3]!==void 0&&(r=ft):r===ft?p[0]===">"?(r=o??Vt,f=-1):p[1]===void 0?f=-2:(f=r.lastIndex-p[2].length,c=p[1],r=p[3]===void 0?ft:p[3]==='"'?nr:tr):r===nr||r===tr?r=ft:r===Zs||r===er?r=Vt:(r=ft,o=void 0);const b=r===ft&&e[a+1].startsWith("/>")?" ":"";s+=r===Vt?l+zc:f>=0?(i.push(c),l.slice(0,f)+Ca+l.slice(f)+nt+b):l+nt+(f===-2?a:b)}return[Ra(e,s+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class mn{constructor({strings:t,_$litType$:n},i){let o;this.parts=[];let s=0,r=0;const a=t.length-1,l=this.parts,[c,p]=jc(t,n);if(this.el=mn.createElement(c,i),yt.currentNode=this.el.content,n===2||n===3){const f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(o=yt.nextNode())!==null&&l.length<a;){if(o.nodeType===1){if(o.hasAttributes())for(const f of o.getAttributeNames())if(f.endsWith(Ca)){const g=p[r++],b=o.getAttribute(f).split(nt),$=/([.?@])?(.*)/.exec(g);l.push({type:1,index:s,name:$[2],strings:b,ctor:$[1]==="."?Wc:$[1]==="?"?Qc:$[1]==="@"?Vc:ui}),o.removeAttribute(f)}else f.startsWith(nt)&&(l.push({type:6,index:s}),o.removeAttribute(f));if(Ea.test(o.tagName)){const f=o.textContent.split(nt),g=f.length-1;if(g>0){o.textContent=ei?ei.emptyScript:"";for(let b=0;b<g;b++)o.append(f[b],gn()),yt.nextNode(),l.push({type:2,index:++s});o.append(f[g],gn())}}}else if(o.nodeType===8)if(o.data===Ta)l.push({type:2,index:s});else{let f=-1;for(;(f=o.data.indexOf(nt,f+1))!==-1;)l.push({type:7,index:s}),f+=nt.length-1}s++}}static createElement(t,n){const i=$t.createElement("template");return i.innerHTML=t,i}}function qt(e,t,n=e,i){var r,a;if(t===rt)return t;let o=i!==void 0?(r=n._$Co)==null?void 0:r[i]:n._$Cl;const s=hn(t)?void 0:t._$litDirective$;return(o==null?void 0:o.constructor)!==s&&((a=o==null?void 0:o._$AO)==null||a.call(o,!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,i)),i!==void 0?(n._$Co??(n._$Co=[]))[i]=o:n._$Cl=o),o!==void 0&&(t=qt(e,o._$AS(e,t.values),o,i)),t}class Gc{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:i}=this._$AD,o=((t==null?void 0:t.creationScope)??$t).importNode(n,!0);yt.currentNode=o;let s=yt.nextNode(),r=0,a=0,l=i[0];for(;l!==void 0;){if(r===l.index){let c;l.type===2?c=new di(s,s.nextSibling,this,t):l.type===1?c=new l.ctor(s,l.name,l.strings,this,t):l.type===6&&(c=new Xc(s,this,t)),this._$AV.push(c),l=i[++a]}r!==(l==null?void 0:l.index)&&(s=yt.nextNode(),r++)}return yt.currentNode=$t,o}p(t){let n=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,n),n+=i.strings.length-2):i._$AI(t[n])),n++}}let di=class La{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,n,i,o){this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=i,this.options=o,this._$Cv=(o==null?void 0:o.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=qt(this,t,n),hn(t)?t===w||t==null||t===""?(this._$AH!==w&&this._$AR(),this._$AH=w):t!==this._$AH&&t!==rt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Kc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==w&&hn(this._$AH)?this._$AA.nextSibling.data=t:this.T($t.createTextNode(t)),this._$AH=t}$(t){var s;const{values:n,_$litType$:i}=t,o=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=mn.createElement(Ra(i.h,i.h[0]),this.options)),i);if(((s=this._$AH)==null?void 0:s._$AD)===o)this._$AH.p(n);else{const r=new Gc(o,this),a=r.u(this.options);r.p(n),this.T(a),this._$AH=r}}_$AC(t){let n=ir.get(t.strings);return n===void 0&&ir.set(t.strings,n=new mn(t)),n}k(t){Uo(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let i,o=0;for(const s of t)o===n.length?n.push(i=new La(this.O(gn()),this.O(gn()),this,this.options)):i=n[o],i._$AI(s),o++;o<n.length&&(this._$AR(i&&i._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,n);t!==this._$AB;){const o=Js(t).nextSibling;Js(t).remove(),t=o}}setConnected(t){var n;this._$AM===void 0&&(this._$Cv=t,(n=this._$AP)==null||n.call(this,t))}},ui=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,i,o,s){this.type=1,this._$AH=w,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=w}_$AI(t,n=this,i,o){const s=this.strings;let r=!1;if(s===void 0)t=qt(this,t,n,0),r=!hn(t)||t!==this._$AH&&t!==rt,r&&(this._$AH=t);else{const a=t;let l,c;for(t=s[0],l=0;l<s.length-1;l++)c=qt(this,a[i+l],n,l),c===rt&&(c=this._$AH[l]),r||(r=!hn(c)||c!==this._$AH[l]),c===w?t=w:t!==w&&(t+=(c??"")+s[l+1]),this._$AH[l]=c}r&&!o&&this.j(t)}j(t){t===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Wc=class extends ui{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===w?void 0:t}},Qc=class extends ui{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==w)}},Vc=class extends ui{constructor(t,n,i,o,s){super(t,n,i,o,s),this.type=5}_$AI(t,n=this){if((t=qt(this,t,n,0)??w)===rt)return;const i=this._$AH,o=t===w&&i!==w||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==w&&(i===w||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var n;typeof this._$AH=="function"?this._$AH.call(((n=this.options)==null?void 0:n.host)??this.element,t):this._$AH.handleEvent(t)}},Xc=class{constructor(t,n,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){qt(this,t)}};const Jc={I:di},Bi=ln.litHtmlPolyfillSupport;Bi==null||Bi(mn,di),(ln.litHtmlVersions??(ln.litHtmlVersions=[])).push("3.3.2");const Yc=(e,t,n)=>{const i=(n==null?void 0:n.renderBefore)??t;let o=i._$litPart$;if(o===void 0){const s=(n==null?void 0:n.renderBefore)??null;i._$litPart$=o=new di(t.insertBefore(gn(),s),s,void 0,n??{})}return o._$AI(e),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wt=globalThis;let Bt=class extends Nt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var n;const t=super.createRenderRoot();return(n=this.renderOptions).renderBefore??(n.renderBefore=t.firstChild),t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Yc(n,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return rt}};var _a;Bt._$litElement$=!0,Bt.finalized=!0,(_a=wt.litElementHydrateSupport)==null||_a.call(wt,{LitElement:Bt});const Ui=wt.litElementPolyfillSupport;Ui==null||Ui({LitElement:Bt});(wt.litElementVersions??(wt.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ia=e=>(t,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Zc={attribute:!0,type:String,converter:Zn,reflect:!1,hasChanged:Bo},ed=(e=Zc,t,n)=>{const{kind:i,metadata:o}=n;let s=globalThis.litPropertyMetadata.get(o);if(s===void 0&&globalThis.litPropertyMetadata.set(o,s=new Map),i==="setter"&&((e=Object.create(e)).wrapped=!0),s.set(n.name,e),i==="accessor"){const{name:r}=n;return{set(a){const l=t.get.call(this);t.set.call(this,a),this.requestUpdate(r,l,e,!0,a)},init(a){return a!==void 0&&this.C(r,void 0,e,a),a}}}if(i==="setter"){const{name:r}=n;return function(a){const l=this[r];t.call(this,a),this.requestUpdate(r,l,e,!0,a)}}throw Error("Unsupported decorator location: "+i)};function pi(e){return(t,n)=>typeof n=="object"?ed(e,t,n):((i,o,s)=>{const r=o.hasOwnProperty(s);return o.constructor.createProperty(s,i),r?Object.getOwnPropertyDescriptor(o,s):void 0})(e,t,n)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function v(e){return pi({...e,state:!0,attribute:!1})}const td="modulepreload",nd=function(e,t){return new URL(e,t).href},or={},id=function(t,n,i){let o=Promise.resolve();if(n&&n.length>0){let r=function(p){return Promise.all(p.map(f=>Promise.resolve(f).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};const a=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),c=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));o=r(n.map(p=>{if(p=nd(p,i),p in or)return;or[p]=!0;const f=p.endsWith(".css"),g=f?'[rel="stylesheet"]':"";if(!!i)for(let k=a.length-1;k>=0;k--){const S=a[k];if(S.href===p&&(!f||S.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${p}"]${g}`))return;const $=document.createElement("link");if($.rel=f?"stylesheet":td,f||($.as="script"),$.crossOrigin="",$.href=p,c&&$.setAttribute("nonce",c),document.head.appendChild($),f)return new Promise((k,S)=>{$.addEventListener("load",k),$.addEventListener("error",()=>S(new Error(`Unable to preload CSS for ${p}`)))})}))}function s(r){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=r,window.dispatchEvent(a),!a.defaultPrevented)throw r}return o.then(r=>{for(const a of r||[])a.status==="rejected"&&s(a.reason);return t().catch(s)})},od={common:{health:"Health",ok:"OK",offline:"Offline",connect:"Connect",refresh:"Refresh",retry:"Retry",cancel:"Cancel",close:"Close",yes:"Yes",no:"No",prev:"Prev",next:"Next",errorTitle:"Request failed",enabled:"Enabled",disabled:"Disabled",na:"n/a",docs:"Docs",resources:"Resources"},nav:{chat:"Chat",control:"Control",agent:"Agent",settings:"Settings",expand:"Expand sidebar",collapse:"Collapse sidebar"},tabs:{agents:"Agents",overview:"Overview",channels:"Business Knowledge",instances:"Out of Stock",sessions:"Procurement",work:"Quotation",cron:"Order Fulfill",skills:"Skills",nodes:"Nodes",chat:"Chat",config:"Config",debug:"Debug",logs:"Logs"},subtitles:{agents:"Manage agent workspaces, tools, and identities.",overview:"Gateway status, entry points, and a fast health read.",channels:"Edit wanding_business_knowledge.md for selection and matching.",instances:"OOS dashboard: stats and product list without asking the agent.",sessions:"Procurement suggestions from shortage; approve to save and notify buyer.",work:"Batch quotation: upload files, identify, match price and stock, fill and save.",cron:"Pending quotation drafts; confirm to create order and lock stock.",skills:"Manage skill availability and API key injection.",nodes:"Paired devices, capabilities, and command exposure.",chat:"Direct gateway chat session for quick interventions.",config:"Edit ~/.openclaw/openclaw.json safely.",debug:"Gateway snapshots, events, and manual RPC calls.",logs:"Live tail of the gateway file logs."},overview:{health:{title:"Health & stats",subtitle:"High-level view of instances, sessions, and cron.",lastErrorLabel:"Last error",noError:"No recent errors."},access:{title:"Gateway Access",subtitle:"Where the dashboard connects and how it authenticates.",wsUrl:"WebSocket URL",token:"Gateway Token",password:"Password (not stored)",sessionKey:"Default Session Key",language:"Language",connectHint:"Click Connect to apply connection changes.",trustedProxy:"Authenticated via trusted proxy."},snapshot:{title:"Snapshot",subtitle:"Latest gateway handshake information.",status:"Status",uptime:"Uptime",tickInterval:"Tick Interval",lastChannelsRefresh:"Last Channels Refresh",channelsHint:"Use Channels to link WhatsApp, Telegram, Discord, Signal, or iMessage."},stats:{instances:"Instances",instancesHint:"Presence beacons in the last 5 minutes.",sessions:"Sessions",sessionsHint:"Recent session keys tracked by the gateway.",cron:"Cron",cronNext:"Next wake {time}"},notes:{title:"Notes",subtitle:"Quick reminders for remote control setups.",tailscaleTitle:"Tailscale serve",tailscaleText:"Prefer serve mode to keep the gateway on loopback with tailnet auth.",sessionTitle:"Session hygiene",sessionText:"Use /new or sessions.patch to reset context.",cronTitle:"Cron reminders",cronText:"Use isolated sessions for recurring runs."},auth:{required:"This gateway requires auth. Add a token or password, then click Connect.",failed:"Auth failed. Re-copy a tokenized URL with {command}, or update the token, then click Connect."},insecure:{hint:"This page is HTTP, so the browser blocks device identity. Use HTTPS (Tailscale Serve) or open {url} on the gateway host.",stayHttp:"If you must stay on HTTP, set {config} (token-only)."},oos:{title:"Out-of-stock overview",subtitle:"Recent out-of-stock stats; see Instances tab for full details.",stats:{totalRecords:"Total records",outOfStockCount:"Out-of-stock items",today:"Added today",reportedGe2:"Reported out-of-stock ≥2 times"},empty:"No stats yet; check back later on the Instances tab."},shortage:{title:"Shortage overview",subtitle:"Shortage stats after Work matching; focus on critical items.",stats:{totalRecords:"Total records",shortageProductCount:"Shortage items",today:"Added today",reportedGe2:"Reported shortage ≥2 times"},empty:"No stats yet; check back later on the Instances tab."}},chat:{disconnected:"Disconnected from gateway.",refreshTitle:"Refresh chat data",thinkingToggle:"Toggle assistant thinking/working output",focusToggle:"Toggle focus mode (hide sidebar + page header)",onboardingDisabled:"Disabled during onboarding",ui:{compaction:{active:"Compacting context…",done:"Context compacted",divider:"Compaction"},attachments:{previewAlt:"Attachment preview",remove:"Remove attachment"},upload:{label:"Upload Excel or PDF",button:"Upload Excel/PDF",remove:"Remove uploaded file"},queue:{title:"Queued ({count})",imageItem:"Image ({count})",remove:"Remove queued message"},compose:{placeholder:{withImages:"Add a message or paste more images…",default:"Message (↩ to send, Shift+↩ for line breaks; paste images or upload/drag Excel/PDF)",disconnected:"Connect to the gateway to start chatting…"},newMessages:"New messages",dropHint:"Drop to upload Excel/PDF",label:"Message",stop:"Stop",newSession:"New session",send:"Send",queue:"Queue",exitFocus:"Exit focus mode"}}},work:{runHint:"Please select at least one file before running.",saveConfirm:"Confirm save quotation draft and persist to database?",saveSuccessHint:"Saved. You can confirm it on the Order Fulfill page.",stageExtract:"Extract sheet data",stageMatch:"Match price & inventory",stageFill:"Fill quotation",uploadTitle:"Quotation files (multiple)",removeFile:"Remove",noFiles:"No files uploaded (.xlsx/.xls/.xlsm).",customerLevel:"Customer level",registerOos:"Register out-of-stock items",currentStage:"Current stage",running:"Running",run:"Run",cancel:"Cancel",statusLabel:"Status",awaitingTitle:"Need your choices",awaitingHint:"Select one option for each ambiguous item, then continue.",qty:"Qty",choiceSelect:"Candidate selection",choiceOos:"Mark as out of stock",resuming:"Resuming",resume:"Confirm and continue",savedDraftNo:"Quotation draft saved: {no}",pendingDraftTitle:"Pending quotation draft",pendingDraftHint:"Review and edit before saving to database.",saving:"Saving...",saveDraft:"Confirm and save",resultTitle:"Execution result",download:"Download {name}",trace:"Trace ({count})",lineProduct:"Requested item name",lineSpec:"Requested spec",lineQty:"Qty",lineCode:"Product number",lineQuoteName:"Quoted item name",lineQuoteSpec:"Quoted spec",linePrice:"Unit price",lineAmount:"Total",lineAvailable:"Available",lineShortfall:"Shortfall",lineIsShortage:"Shortage",textInputTitle:"Text input (quotation)",textInputHint:"Enter product list (multi-line or semicolon/comma separated); generated file will run with uploaded files.",textInputPlaceholder:"e.g. Cable 3*2.5 100m; Switch 20 pcs",generateFromText:"Generate from text",textGenerating:"Generating…",priceLevels:{FACTORY_INC_TAX:"Factory price (incl. tax)",FACTORY_EXC_TAX:"Factory price (excl. tax)",PURCHASE_EXC_TAX:"Purchase price (excl. tax)",A_MARGIN:"Tier A (2nd-level agent) · margin",A_QUOTE:"Tier A (2nd-level agent) · quotation price",B_MARGIN:"Tier B (1st-level agent) · margin",B_QUOTE:"Tier B (1st-level agent) · quotation price",C_MARGIN:"Tier C (Juwan key account) · margin",C_QUOTE:"Tier C (Juwan key account) · quotation price",D_MARGIN:"Tier D (Qingshan key account) · margin",D_QUOTE:"Tier D (Qingshan key account) · quotation price",D_LOW:"Tier D (Qingshan key account) · reduced margin",E_MARGIN:"Tier E (Datang key account, freight included) · margin",E_QUOTE:"Tier E (Datang key account, freight included) · quotation price"},fileDisplayName:"Quotation file display name",status:{idle:"Idle",running:"Running",awaitingChoices:"Awaiting choices",resuming:"Resuming",done:"Done",error:"Error"},fallbackDraftName:"Untitled quotation"},fulfill:{title:"Pending quotation drafts",subtitle:"Load persisted drafts and confirm to create formal orders.",loading:"Loading...",refreshList:"Refresh list",filterPlaceholder:"Search by draft no/name/source",sortBy:"Sort by",sortDir:"Order",sortCreatedAt:"Created time",sortDraftNo:"Draft no",sortName:"Name",sortDesc:"Newest first",sortAsc:"Oldest first",pageSize:"Page size",total:"Total: {total}",page:"Page {current}/{total}",listTitle:"List",listSubtitle:"View detail first, then confirm order.",colDraftNo:"Draft No",colName:"Name",colSource:"Source",colCreatedAt:"Created At",colActions:"Actions",viewDetail:"View",confirmAction:"Confirm order",confirming:"Confirming...",detailTitle:"Draft detail · {draftNo}",closeDetail:"Close detail",lineProduct:"Product",lineSpec:"Spec",lineQty:"Qty",lineCode:"Code",lineQuoteName:"Quote name",lineQuoteSpec:"Quoted spec",linePrice:"Unit price",lineAmount:"Amount",lineAvailable:"Available",lineShortfall:"Shortfall",lineIsShortage:"Shortage",noDrafts:"No pending quotation drafts.",confirmTitle:"Order confirmed",confirmPrompt:"Confirm order? {count} line(s), total amount {amount}.",confirmPromptSimple:"Confirm to convert this quotation into a formal order?",orderId:"Order ID"},procurement:{title:"Procurement suggestions",subtitle:"Generated from shortage records; approve to persist and notify buyers.",loading:"Loading...",refreshList:"Refresh list",batchApprove:"Batch approve",approving:"Approving...",approveSingle:"Approve",approveConfirm:"Confirm approval and notify buyer?",approveBatchConfirm:"Confirm approval of {count} item(s) and notify buyer?",noSuggestions:"No shortage products; no procurement suggestions.",noPending:"No pending items (approved items are hidden).",listHint:"Select multiple to batch approve; click Approve to save and notify buyer.",filterPlaceholder:"Search by product/spec/code/key",sortBy:"Sort by",sortDir:"Order",sortUploadedAt:"Reported time",sortShortfall:"Shortfall",sortCount:"Report count",sortProduct:"Product name",sortDesc:"High to low / newest",sortAsc:"Low to high / oldest",pageSize:"Page size",total:"Total: {total}",page:"Page {current}/{total}",listTitle:"Shortage item list",selectAll:"Select all filtered items",selectItem:"Select item",colProduct:"Product",colSpec:"Spec",colShortfall:"Shortfall",colCode:"Code",colCount:"Count",colActions:"Actions",approvedCount:"Approved {count} item(s)."},replenishment:{title:"Replenishment",subtitle:"Enter product name or code and quantity to generate a draft; view and confirm in the list below to run inventory supplement.",productOrCodePlaceholder:"Product name or code",quantityPlaceholder:"Quantity",generateDraft:"Generate replenishment draft",creating:"Creating…",addRow:"Add row",removeRow:"Remove",refreshList:"Refresh list",loading:"Loading…",listTitle:"Replenishment drafts",listHint:"Drafts are created via LLM and inventory tools; confirm to run inventory changes.",noDrafts:"No replenishment drafts.",colDraftNo:"Draft No",colName:"Name",colCreatedAt:"Created",colStatus:"Status",colActions:"Actions",viewDetail:"View",confirm:"Confirm replenishment",confirming:"Executing…",confirmPrompt:"Confirm and run all inventory changes for this draft?",delete:"Delete",deleteConfirm:"Delete this replenishment draft? This cannot be undone.",detailTitle:"Draft detail ({no})",detailSubtitle:"Products, current stock and replenishment quantities.",colCode:"Code",colProduct:"Product",colSpec:"Spec",colCurrentQty:"Current qty",colQuantity:"Quantity"},oos:{title:"Out-of-stock dashboard",subtitle:"Overview and list of out-of-stock products, without asking the agent.",actions:{loading:"Loading…",refresh:"Refresh",addManual:"Add manually",confirm:"Confirm",delete:"Delete",deleteHint:"Delete this out-of-stock item"},db:{local:"Using local database"},stats:{totalRecords:"Total records",outOfStockCount:"Out-of-stock items",today:"New today",reportedGe2:"Reported out-of-stock ≥2 times",emailSentProductCount:"Products with email sent"},empty:{stats:"No stats yet.",list:"No out-of-stock records."},list:{title:"Out-of-stock product list",more:"Total {count} out-of-stock products; showing first 50 only",meta:"Qty: {qty} {unit} · Reported out-of-stock {count} time(s) · Email: {email}"},addForm:{title:"Add out-of-stock record",namePlaceholder:"Product name (required)",specPlaceholder:"Specification",qtyPlaceholder:"Quantity",unitPlaceholder:"Unit"},email:{sent:"Sent",notSent:"Not sent"},byFile:{title:"By file",empty:"None",count:"Records: {count}"},byTime:{title:"By time (last 30 days)",empty:"None",count:"New: {count}"}},shortage:{title:"Shortage records",subtitle:"Saved when Work detects insufficient stock; overview and list of shortage items.",actions:{loading:"Loading…",refresh:"Refresh",addManual:"Add manually",confirm:"Confirm",delete:"Delete",deleteHint:"Delete this shortage item"},db:{local:"Using local database"},stats:{totalRecords:"Total records",shortageProductCount:"Shortage products",today:"New today",reportedGe2:"Reported shortage ≥2 times"},empty:{stats:"No stats yet.",list:"No shortage records."},list:{title:"Shortage product list",more:"Total {count} shortage products; showing first 50 only",meta:"Required: {qty} · Available: {avail} · Shortfall: {diff} · Reported shortage {count} time(s)"},addForm:{title:"Add shortage record (product name, spec, required, available; shortfall will be auto-calculated)",namePlaceholder:"Product name (required)",specPlaceholder:"Specification",qtyPlaceholder:"Required",availPlaceholder:"Available",qtyTitle:"Required quantity",availTitle:"Available quantity",diffTitle:"Shortfall = required − available; auto-calculated on submit",diffText:"Shortfall: auto-calculated"},byFile:{title:"By file",empty:"None",count:"Records: {count}"},byTime:{title:"By time (last 30 days)",empty:"None",count:"New: {count}"}},businessKnowledge:{title:"Business knowledge",subtitle:"Edit wanding_business_knowledge.md for selection and matching. The LLM will use the latest content after saving.",lastSavedAt:"Saved at {time}",actions:{reloading:"Loading…",reload:"Reload",saving:"Saving…",save:"Save"},relatedFiles:{title:"Related data files",hint:"Selection and historical quotations rely on these Excel files. Copy the path to open them in Explorer or Excel when updating.",mappingTableLabel:"Inquiry mapping table (historical quotations):",priceLibraryLabel:"Wanding price library:",copyPath:"Copy path"},editor:{placeholder:`[Business knowledge]
1. …`}},languages:{en:"English",zhCN:"简体中文 (Simplified Chinese)",zhTW:"繁體中文 (Traditional Chinese)",ptBR:"Português (Brazilian Portuguese)"}},sd=["en","zh-CN"];function qo(e){return e!=null&&sd.includes(e)}class rd{constructor(){this.locale="en",this.translations={en:od},this.subscribers=new Set,this.loadLocale()}loadLocale(){const t=localStorage.getItem("openclaw.i18n.locale");let n;qo(t)?n=t:n=(navigator.language||"").startsWith("zh")?"zh-CN":"en",n==="en"?this.locale="en":this.setLocale(n)}getLocale(){return this.locale}async setLocale(t){if(this.locale!==t){if(!this.translations[t])try{let n;if(t==="zh-CN")n=await id(()=>import("./zh-CN-RGawi5Qb.js"),[],import.meta.url);else return;this.translations[t]=n[t.replace("-","_")]}catch(n){console.error(`Failed to load locale: ${t}`,n);return}this.locale=t,localStorage.setItem("openclaw.i18n.locale",t),this.notify()}}registerTranslation(t,n){this.translations[t]=n}subscribe(t){return this.subscribers.add(t),()=>this.subscribers.delete(t)}notify(){this.subscribers.forEach(t=>t(this.locale))}t(t,n){const i=t.split(".");let o=this.translations[this.locale]||this.translations.en;for(const s of i)if(o&&typeof o=="object")o=o[s];else{o=void 0;break}if(o===void 0&&this.locale!=="en"){o=this.translations.en;for(const s of i)if(o&&typeof o=="object")o=o[s];else{o=void 0;break}}return typeof o!="string"?t:n?o.replace(/\{(\w+)\}/g,(s,r)=>n[r]||`{${r}}`):o}}const xt=new rd,u=(e,t)=>xt.t(e,t);class ad{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){this.unsubscribe=xt.subscribe(()=>{this.host.requestUpdate()})}hostDisconnected(){var t;(t=this.unsubscribe)==null||t.call(this)}}async function Re(e,t){if(!(!e.client||!e.connected)&&!e.channelsLoading){e.channelsLoading=!0,e.channelsError=null;try{const n=await e.client.request("channels.status",{probe:t,timeoutMs:8e3});e.channelsSnapshot=n,e.channelsLastSuccess=Date.now()}catch(n){e.channelsError=String(n)}finally{e.channelsLoading=!1}}}async function ld(e,t){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const n=await e.client.request("web.login.start",{force:t,timeoutMs:3e4});e.whatsappLoginMessage=n.message??null,e.whatsappLoginQrDataUrl=n.qrDataUrl??null,e.whatsappLoginConnected=null}catch(n){e.whatsappLoginMessage=String(n),e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function cd(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const t=await e.client.request("web.login.wait",{timeoutMs:12e4});e.whatsappLoginMessage=t.message??null,e.whatsappLoginConnected=t.connected??null,t.connected&&(e.whatsappLoginQrDataUrl=null)}catch(t){e.whatsappLoginMessage=String(t),e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function dd(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{await e.client.request("channels.logout",{channel:"whatsapp"}),e.whatsappLoginMessage="Logged out.",e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}catch(t){e.whatsappLoginMessage=String(t)}finally{e.whatsappBusy=!1}}}function Te(e){if(e)return Array.isArray(e.type)?e.type.filter(n=>n!=="null")[0]??e.type[0]:e.type}function Pa(e){if(!e)return"";if(e.default!==void 0)return e.default;switch(Te(e)){case"object":return{};case"array":return[];case"boolean":return!1;case"number":case"integer":return 0;case"string":return"";default:return""}}function zo(e){return e.filter(t=>typeof t=="string").join(".")}function Ee(e,t){const n=zo(e),i=t[n];if(i)return i;const o=n.split(".");for(const[s,r]of Object.entries(t)){if(!s.includes("*"))continue;const a=s.split(".");if(a.length!==o.length)continue;let l=!0;for(let c=0;c<o.length;c+=1)if(a[c]!=="*"&&a[c]!==o[c]){l=!1;break}if(l)return r}}function Ze(e){return e.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/\s+/g," ").replace(/^./,t=>t.toUpperCase())}function sr(e,t){const n=e.trim();if(n==="")return;const i=Number(n);return!Number.isFinite(i)||t&&!Number.isInteger(i)?e:i}function rr(e){const t=e.trim();return t==="true"?!0:t==="false"?!1:e}function tt(e,t){if(e==null)return e;if(t.allOf&&t.allOf.length>0){let i=e;for(const o of t.allOf)i=tt(i,o);return i}const n=Te(t);if(t.anyOf||t.oneOf){const i=(t.anyOf??t.oneOf??[]).filter(o=>!(o.type==="null"||Array.isArray(o.type)&&o.type.includes("null")));if(i.length===1)return tt(e,i[0]);if(typeof e=="string")for(const o of i){const s=Te(o);if(s==="number"||s==="integer"){const r=sr(e,s==="integer");if(r===void 0||typeof r=="number")return r}if(s==="boolean"){const r=rr(e);if(typeof r=="boolean")return r}}for(const o of i){const s=Te(o);if(s==="object"&&typeof e=="object"&&!Array.isArray(e)||s==="array"&&Array.isArray(e))return tt(e,o)}return e}if(n==="number"||n==="integer"){if(typeof e=="string"){const i=sr(e,n==="integer");if(i===void 0||typeof i=="number")return i}return e}if(n==="boolean"){if(typeof e=="string"){const i=rr(e);if(typeof i=="boolean")return i}return e}if(n==="object"){if(typeof e!="object"||Array.isArray(e))return e;const i=e,o=t.properties??{},s=t.additionalProperties&&typeof t.additionalProperties=="object"?t.additionalProperties:null,r={};for(const[a,l]of Object.entries(i)){const c=o[a]??s,p=c?tt(l,c):l;p!==void 0&&(r[a]=p)}return r}if(n==="array"){if(!Array.isArray(e))return e;if(Array.isArray(t.items)){const o=t.items;return e.map((s,r)=>{const a=r<o.length?o[r]:void 0;return a?tt(s,a):s})}const i=t.items;return i?e.map(o=>tt(o,i)).filter(o=>o!==void 0):e}return e}function kt(e){return typeof structuredClone=="function"?structuredClone(e):JSON.parse(JSON.stringify(e))}function vn(e){return`${JSON.stringify(e,null,2).trimEnd()}
`}function Da(e,t,n){if(t.length===0)return;let i=e;for(let s=0;s<t.length-1;s+=1){const r=t[s],a=t[s+1];if(typeof r=="number"){if(!Array.isArray(i))return;i[r]==null&&(i[r]=typeof a=="number"?[]:{}),i=i[r]}else{if(typeof i!="object"||i==null)return;const l=i;l[r]==null&&(l[r]=typeof a=="number"?[]:{}),i=l[r]}}const o=t[t.length-1];if(typeof o=="number"){Array.isArray(i)&&(i[o]=n);return}typeof i=="object"&&i!=null&&(i[o]=n)}function Ma(e,t){if(t.length===0)return;let n=e;for(let o=0;o<t.length-1;o+=1){const s=t[o];if(typeof s=="number"){if(!Array.isArray(n))return;n=n[s]}else{if(typeof n!="object"||n==null)return;n=n[s]}if(n==null)return}const i=t[t.length-1];if(typeof i=="number"){Array.isArray(n)&&n.splice(i,1);return}typeof n=="object"&&n!=null&&delete n[i]}async function Ge(e){if(!(!e.client||!e.connected)){e.configLoading=!0,e.lastError=null;try{const t=await e.client.request("config.get",{});fd(e,t)}catch(t){e.lastError=String(t)}finally{e.configLoading=!1}}}async function ud(e){if(!(!e.client||!e.connected)&&!e.configSchemaLoading){e.configSchemaLoading=!0;try{const t=await e.client.request("config.schema",{});pd(e,t)}catch(t){e.lastError=String(t)}finally{e.configSchemaLoading=!1}}}function pd(e,t){e.configSchema=t.schema??null,e.configUiHints=t.uiHints??{},e.configSchemaVersion=t.version??null}function fd(e,t){e.configSnapshot=t;const n=typeof t.raw=="string"?t.raw:t.config&&typeof t.config=="object"?vn(t.config):e.configRaw;!e.configFormDirty||e.configFormMode==="raw"?e.configRaw=n:e.configForm?e.configRaw=vn(e.configForm):e.configRaw=n,e.configValid=typeof t.valid=="boolean"?t.valid:null,e.configIssues=Array.isArray(t.issues)?t.issues:[],e.configFormDirty||(e.configForm=kt(t.config??{}),e.configFormOriginal=kt(t.config??{}),e.configRawOriginal=n)}function gd(e){return!e||typeof e!="object"||Array.isArray(e)?null:e}function Fa(e){if(e.configFormMode!=="form"||!e.configForm)return e.configRaw;const t=gd(e.configSchema),n=t?tt(e.configForm,t):e.configForm;return vn(n)}async function Qn(e){var t;if(!(!e.client||!e.connected)){e.configSaving=!0,e.lastError=null;try{const n=Fa(e),i=(t=e.configSnapshot)==null?void 0:t.hash;if(!i){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.set",{raw:n,baseHash:i}),e.configFormDirty=!1,await Ge(e)}catch(n){e.lastError=String(n)}finally{e.configSaving=!1}}}async function hd(e){var t;if(!(!e.client||!e.connected)){e.configApplying=!0,e.lastError=null;try{const n=Fa(e),i=(t=e.configSnapshot)==null?void 0:t.hash;if(!i){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.apply",{raw:n,baseHash:i,sessionKey:e.applySessionKey}),e.configFormDirty=!1,await Ge(e)}catch(n){e.lastError=String(n)}finally{e.configApplying=!1}}}async function md(e){if(!(!e.client||!e.connected)){e.updateRunning=!0,e.lastError=null;try{await e.client.request("update.run",{sessionKey:e.applySessionKey})}catch(t){e.lastError=String(t)}finally{e.updateRunning=!1}}}function Ce(e,t,n){var o;const i=kt(e.configForm??((o=e.configSnapshot)==null?void 0:o.config)??{});Da(i,t,n),e.configForm=i,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=vn(i))}function Xe(e,t){var i;const n=kt(e.configForm??((i=e.configSnapshot)==null?void 0:i.config)??{});Ma(n,t),e.configForm=n,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=vn(n))}function vd(e){const t={name:(e==null?void 0:e.name)??"",displayName:(e==null?void 0:e.displayName)??"",about:(e==null?void 0:e.about)??"",picture:(e==null?void 0:e.picture)??"",banner:(e==null?void 0:e.banner)??"",website:(e==null?void 0:e.website)??"",nip05:(e==null?void 0:e.nip05)??"",lud16:(e==null?void 0:e.lud16)??""};return{values:t,original:{...t},saving:!1,importing:!1,error:null,success:null,fieldErrors:{},showAdvanced:!!(e!=null&&e.banner||e!=null&&e.website||e!=null&&e.nip05||e!=null&&e.lud16)}}async function yd(e,t){await ld(e,t),await Re(e,!0)}async function bd(e){await cd(e),await Re(e,!0)}async function wd(e){await dd(e),await Re(e,!0)}async function $d(e){await Qn(e),await Ge(e),await Re(e,!0)}async function xd(e){await Ge(e),await Re(e,!0)}function kd(e){if(!Array.isArray(e))return{};const t={};for(const n of e){if(typeof n!="string")continue;const[i,...o]=n.split(":");if(!i||o.length===0)continue;const s=i.trim(),r=o.join(":").trim();s&&r&&(t[s]=r)}return t}function Na(e){var n,i,o;return((o=(((i=(n=e.channelsSnapshot)==null?void 0:n.channelAccounts)==null?void 0:i.nostr)??[])[0])==null?void 0:o.accountId)??e.nostrProfileAccountId??"default"}function Oa(e,t=""){return`/api/channels/nostr/${encodeURIComponent(e)}/profile${t}`}function Sd(e){var o,s,r;const t=(r=(s=(o=e.hello)==null?void 0:o.auth)==null?void 0:s.deviceToken)==null?void 0:r.trim();if(t)return`Bearer ${t}`;const n=e.settings.token.trim();if(n)return`Bearer ${n}`;const i=e.password.trim();return i?`Bearer ${i}`:null}function Ba(e){const t=Sd(e);return t?{Authorization:t}:{}}function _d(e,t,n){e.nostrProfileAccountId=t,e.nostrProfileFormState=vd(n??void 0)}function Ad(e){e.nostrProfileFormState=null,e.nostrProfileAccountId=null}function Cd(e,t,n){const i=e.nostrProfileFormState;i&&(e.nostrProfileFormState={...i,values:{...i.values,[t]:n},fieldErrors:{...i.fieldErrors,[t]:""}})}function Td(e){const t=e.nostrProfileFormState;t&&(e.nostrProfileFormState={...t,showAdvanced:!t.showAdvanced})}async function Ed(e){const t=e.nostrProfileFormState;if(!t||t.saving)return;const n=Na(e);e.nostrProfileFormState={...t,saving:!0,error:null,success:null,fieldErrors:{}};try{const i=await fetch(Oa(n),{method:"PUT",headers:{"Content-Type":"application/json",...Ba(e)},body:JSON.stringify(t.values)}),o=await i.json().catch(()=>null);if(!i.ok||(o==null?void 0:o.ok)===!1||!o){const s=(o==null?void 0:o.error)??`Profile update failed (${i.status})`;e.nostrProfileFormState={...t,saving:!1,error:s,success:null,fieldErrors:kd(o==null?void 0:o.details)};return}if(!o.persisted){e.nostrProfileFormState={...t,saving:!1,error:"Profile publish failed on all relays.",success:null};return}e.nostrProfileFormState={...t,saving:!1,error:null,success:"Profile published to relays.",fieldErrors:{},original:{...t.values}},await Re(e,!0)}catch(i){e.nostrProfileFormState={...t,saving:!1,error:`Profile update failed: ${String(i)}`,success:null}}}async function Rd(e){const t=e.nostrProfileFormState;if(!t||t.importing)return;const n=Na(e);e.nostrProfileFormState={...t,importing:!0,error:null,success:null};try{const i=await fetch(Oa(n,"/import"),{method:"POST",headers:{"Content-Type":"application/json",...Ba(e)},body:JSON.stringify({autoMerge:!0})}),o=await i.json().catch(()=>null);if(!i.ok||(o==null?void 0:o.ok)===!1||!o){const l=(o==null?void 0:o.error)??`Profile import failed (${i.status})`;e.nostrProfileFormState={...t,importing:!1,error:l,success:null};return}const s=o.merged??o.imported??null,r=s?{...t.values,...s}:t.values,a=!!(r.banner||r.website||r.nip05||r.lud16);e.nostrProfileFormState={...t,importing:!1,values:r,error:null,success:o.saved?"Profile imported from relays. Review and publish.":"Profile imported. Review and publish.",showAdvanced:a},o.saved&&await Re(e,!0)}catch(i){e.nostrProfileFormState={...t,importing:!1,error:`Profile import failed: ${String(i)}`,success:null}}}function Ua(e){var s;const t=(e??"").trim();if(!t)return null;const n=t.split(":").filter(Boolean);if(n.length<3||n[0]!=="agent")return null;const i=(s=n[1])==null?void 0:s.trim(),o=n.slice(2).join(":");return!i||!o?null:{agentId:i,rest:o}}const lo=450;function $n(e,t=!1,n=!1){e.chatScrollFrame&&cancelAnimationFrame(e.chatScrollFrame),e.chatScrollTimeout!=null&&(clearTimeout(e.chatScrollTimeout),e.chatScrollTimeout=null);const i=()=>{const o=e.querySelector(".chat-thread");if(o){const s=getComputedStyle(o).overflowY;if(s==="auto"||s==="scroll"||o.scrollHeight-o.clientHeight>1)return o}return document.scrollingElement??document.documentElement};e.updateComplete.then(()=>{e.chatScrollFrame=requestAnimationFrame(()=>{e.chatScrollFrame=null;const o=i();if(!o)return;const s=o.scrollHeight-o.scrollTop-o.clientHeight,r=t&&!e.chatHasAutoScrolled;if(!(r||e.chatUserNearBottom||s<lo)){e.chatNewMessagesBelow=!0;return}r&&(e.chatHasAutoScrolled=!0);const l=n&&(typeof window>"u"||typeof window.matchMedia!="function"||!window.matchMedia("(prefers-reduced-motion: reduce)").matches),c=o.scrollHeight;typeof o.scrollTo=="function"?o.scrollTo({top:c,behavior:l?"smooth":"auto"}):o.scrollTop=c,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1;const p=r?150:120;e.chatScrollTimeout=window.setTimeout(()=>{e.chatScrollTimeout=null;const f=i();if(!f)return;const g=f.scrollHeight-f.scrollTop-f.clientHeight;(r||e.chatUserNearBottom||g<lo)&&(f.scrollTop=f.scrollHeight,e.chatUserNearBottom=!0)},p)})})}function qa(e,t=!1){e.logsScrollFrame&&cancelAnimationFrame(e.logsScrollFrame),e.updateComplete.then(()=>{e.logsScrollFrame=requestAnimationFrame(()=>{e.logsScrollFrame=null;const n=e.querySelector(".log-stream");if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;(t||i<80)&&(n.scrollTop=n.scrollHeight)})})}function Ld(e,t){const n=t.currentTarget;if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;e.chatUserNearBottom=i<lo,e.chatUserNearBottom&&(e.chatNewMessagesBelow=!1)}function Id(e,t){const n=t.currentTarget;if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;e.logsAtBottom=i<80}function ar(e){e.chatHasAutoScrolled=!1,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1}function Pd(e,t){if(e.length===0)return;const n=new Blob([`${e.join(`
`)}
`],{type:"text/plain"}),i=URL.createObjectURL(n),o=document.createElement("a"),s=new Date().toISOString().slice(0,19).replace(/[:T]/g,"-");o.href=i,o.download=`openclaw-logs-${t}-${s}.log`,o.click(),URL.revokeObjectURL(i)}function Dd(e){if(typeof ResizeObserver>"u")return;const t=e.querySelector(".topbar");if(!t)return;const n=()=>{const{height:i}=t.getBoundingClientRect();e.style.setProperty("--topbar-height",`${i}px`)};n(),e.topbarObserver=new ResizeObserver(()=>n()),e.topbarObserver.observe(t)}async function fi(e){if(!(!e.client||!e.connected)&&!e.debugLoading){e.debugLoading=!0;try{const[t,n,i,o]=await Promise.all([e.client.request("status",{}),e.client.request("health",{}),e.client.request("models.list",{}),e.client.request("last-heartbeat",{})]);e.debugStatus=t,e.debugHealth=n;const s=i;e.debugModels=Array.isArray(s==null?void 0:s.models)?s==null?void 0:s.models:[],e.debugHeartbeat=o}catch(t){e.debugCallError=String(t)}finally{e.debugLoading=!1}}}async function Md(e){if(!(!e.client||!e.connected)){e.debugCallError=null,e.debugCallResult=null;try{const t=e.debugCallParams.trim()?JSON.parse(e.debugCallParams):{},n=await e.client.request(e.debugCallMethod.trim(),t);e.debugCallResult=JSON.stringify(n,null,2)}catch(t){e.debugCallError=String(t)}}}const Fd=2e3,Nd=new Set(["trace","debug","info","warn","error","fatal"]);function Od(e){if(typeof e!="string")return null;const t=e.trim();if(!t.startsWith("{")||!t.endsWith("}"))return null;try{const n=JSON.parse(t);return!n||typeof n!="object"?null:n}catch{return null}}function Bd(e){if(typeof e!="string")return null;const t=e.toLowerCase();return Nd.has(t)?t:null}function Ud(e){if(!e.trim())return{raw:e,message:e};try{const t=JSON.parse(e),n=t&&typeof t._meta=="object"&&t._meta!==null?t._meta:null,i=typeof t.time=="string"?t.time:typeof(n==null?void 0:n.date)=="string"?n==null?void 0:n.date:null,o=Bd((n==null?void 0:n.logLevelName)??(n==null?void 0:n.level)),s=typeof t[0]=="string"?t[0]:typeof(n==null?void 0:n.name)=="string"?n==null?void 0:n.name:null,r=Od(s);let a=null;r&&(typeof r.subsystem=="string"?a=r.subsystem:typeof r.module=="string"&&(a=r.module)),!a&&s&&s.length<120&&(a=s);let l=null;return typeof t[1]=="string"?l=t[1]:!r&&typeof t[0]=="string"?l=t[0]:typeof t.message=="string"&&(l=t.message),{raw:e,time:i,level:o,subsystem:a,message:l??e,meta:n??void 0}}catch{return{raw:e,message:e}}}async function Ko(e,t){if(!(!e.client||!e.connected)&&!(e.logsLoading&&!(t!=null&&t.quiet))){t!=null&&t.quiet||(e.logsLoading=!0),e.logsError=null;try{const i=await e.client.request("logs.tail",{cursor:t!=null&&t.reset?void 0:e.logsCursor??void 0,limit:e.logsLimit,maxBytes:e.logsMaxBytes}),s=(Array.isArray(i.lines)?i.lines.filter(a=>typeof a=="string"):[]).map(Ud),r=!!(t!=null&&t.reset||i.reset||e.logsCursor==null);e.logsEntries=r?s:[...e.logsEntries,...s].slice(-Fd),typeof i.cursor=="number"&&(e.logsCursor=i.cursor),typeof i.file=="string"&&(e.logsFile=i.file),e.logsTruncated=!!i.truncated,e.logsLastFetchAt=Date.now()}catch(n){e.logsError=String(n)}finally{t!=null&&t.quiet||(e.logsLoading=!1)}}}async function gi(e,t){if(!(!e.client||!e.connected)&&!e.nodesLoading){e.nodesLoading=!0,t!=null&&t.quiet||(e.lastError=null);try{const n=await e.client.request("node.list",{});e.nodes=Array.isArray(n.nodes)?n.nodes:[]}catch(n){t!=null&&t.quiet||(e.lastError=String(n))}finally{e.nodesLoading=!1}}}function qd(e){e.nodesPollInterval==null&&(e.nodesPollInterval=window.setInterval(()=>void gi(e,{quiet:!0}),5e3))}function zd(e){e.nodesPollInterval!=null&&(clearInterval(e.nodesPollInterval),e.nodesPollInterval=null)}function Ho(e){e.logsPollInterval==null&&(e.logsPollInterval=window.setInterval(()=>{e.tab==="logs"&&Ko(e,{quiet:!0})},2e3))}function jo(e){e.logsPollInterval!=null&&(clearInterval(e.logsPollInterval),e.logsPollInterval=null)}function Go(e){e.debugPollInterval==null&&(e.debugPollInterval=window.setInterval(()=>{e.tab==="debug"&&fi(e)},3e3))}function Wo(e){e.debugPollInterval!=null&&(clearInterval(e.debugPollInterval),e.debugPollInterval=null)}async function za(e,t){if(!(!e.client||!e.connected||e.agentIdentityLoading)&&!e.agentIdentityById[t]){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{const n=await e.client.request("agent.identity.get",{agentId:t});n&&(e.agentIdentityById={...e.agentIdentityById,[t]:n})}catch(n){e.agentIdentityError=String(n)}finally{e.agentIdentityLoading=!1}}}async function Ka(e,t){if(!e.client||!e.connected||e.agentIdentityLoading)return;const n=t.filter(i=>!e.agentIdentityById[i]);if(n.length!==0){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{for(const i of n){const o=await e.client.request("agent.identity.get",{agentId:i});o&&(e.agentIdentityById={...e.agentIdentityById,[i]:o})}}catch(i){e.agentIdentityError=String(i)}finally{e.agentIdentityLoading=!1}}}async function Vn(e,t){if(!(!e.client||!e.connected)&&!e.agentSkillsLoading){e.agentSkillsLoading=!0,e.agentSkillsError=null;try{const n=await e.client.request("skills.status",{agentId:t});n&&(e.agentSkillsReport=n,e.agentSkillsAgentId=t)}catch(n){e.agentSkillsError=String(n)}finally{e.agentSkillsLoading=!1}}}async function Qo(e){var t;if(!(!e.client||!e.connected)&&!e.agentsLoading){e.agentsLoading=!0,e.agentsError=null;try{const n=await e.client.request("agents.list",{});if(n){e.agentsList=n;const i=e.agentsSelectedId,o=n.agents.some(s=>s.id===i);(!i||!o)&&(e.agentsSelectedId=n.defaultId??((t=n.agents[0])==null?void 0:t.id)??null)}}catch(n){e.agentsError=String(n)}finally{e.agentsLoading=!1}}}function Vo(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}async function Kd(e){try{const n=await(await fetch(Vo(e.basePath,"/api/business-knowledge/dependent-files"))).json().catch(()=>({}));n.success&&n.data?e.bkDependentFiles={mapping_table:n.data.mapping_table??"",price_library:n.data.price_library??""}:e.bkDependentFiles=null}catch{e.bkDependentFiles=null}}async function Ha(e){e.bkLoading=!0,e.bkError=null,Kd(e);try{const t=await fetch(Vo(e.basePath,"/api/business-knowledge")),n=await t.json().catch(()=>({}));n.success&&n.data&&typeof n.data.content=="string"?e.bkContent=n.data.content:(e.bkContent="",t.ok||(e.bkError=n.detail??`HTTP ${t.status}`))}catch(t){e.bkError=t instanceof Error?t.message:String(t),e.bkContent=""}finally{e.bkLoading=!1}}async function Hd(e,t){e.bkSaving=!0,e.bkError=null;try{const n=await fetch(Vo(e.basePath,"/api/business-knowledge"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:t})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(e.bkContent=t,e.bkLastSuccess=Date.now(),!0):(e.bkError=i.detail??`HTTP ${n.status}`,!1)}catch(n){return e.bkError=n instanceof Error?n.message:String(n),!1}finally{e.bkSaving=!1}}function ja(e){if(e==null||!Number.isFinite(e))return"n/a";const t=Math.floor(e/1e3),n=Math.floor(t/60),i=Math.floor(n/60);return i>0?`${i}h`:n>0?`${n}m`:t>0?`${t}s`:"<1s"}function Et(e){if(e==null||!Number.isFinite(e))return"n/a";const t=Date.now(),n=e-t,i=Math.abs(n),o=Math.floor(i/6e4),s=Math.floor(o/60),r=Math.floor(s/24);return n>0?o<1?"in <1m":o<60?`in ${o}m`:s<24?`in ${s}h`:`in ${r}d`:i<15e3?"just now":o<60?`${o}m ago`:s<24?`${s}h ago`:`${r}d ago`}function jd(e,t){return!e||typeof e!="string"?"":e.replace(/<think>[\s\S]*?<\/think>/gi,"").trim()}function ti(e){return!e&&e!==0?"n/a":new Date(e).toLocaleString()}function co(e){return!e||e.length===0?"none":e.filter(t=>!!(t&&t.trim())).join(", ")}function uo(e,t=120){return e.length<=t?e:`${e.slice(0,Math.max(0,t-1))}…`}function Ga(e,t){return e.length<=t?{text:e,truncated:!1,total:e.length}:{text:e.slice(0,Math.max(0,t)),truncated:!0,total:e.length}}function lr(e,t){const n=Number(e);return Number.isFinite(n)?n:t}function qi(e){return jd(e)}async function Wa(e){if(!(!e.client||!e.connected))try{const t=await e.client.request("cron.status",{});e.cronStatus=t}catch(t){e.cronError=String(t)}}async function Gd(e){if(!(!e.client||!e.connected)&&!e.cronLoading){e.cronLoading=!0,e.cronError=null;try{const t=await e.client.request("cron.list",{includeDisabled:!0});e.cronJobs=Array.isArray(t.jobs)?t.jobs:[]}catch(t){e.cronError=String(t)}finally{e.cronLoading=!1}}}class ce extends Error{constructor(t,n){super(`Invalid response schema from ${t}: ${n}`),this.name="ResponseSchemaError",this.endpoint=t}}function Qa(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function ee(e,t,n="response"){if(!Qa(e))throw new ce(t,`${n} must be an object`);return e}function lt(e,t,n){if(!Array.isArray(e))throw new ce(t,`${n} must be an array`);return e}function ot(e,t,n){if(typeof e!="string")throw new ce(t,`${n} must be a string`);return e}function hi(e,t,n){if(typeof e!="number"||Number.isNaN(e))throw new ce(t,`${n} must be a number`);return e}function U(e){return typeof e=="string"?e:void 0}function ve(e){return typeof e=="number"&&Number.isFinite(e)?e:void 0}function Xo(e){return typeof e=="boolean"?e:void 0}function ye(e,t){return Qa(e)?typeof e.detail=="string"&&e.detail.trim()?e.detail.trim():typeof e.error=="string"&&e.error.trim()?e.error.trim():typeof e.message=="string"&&e.message.trim()?e.message.trim():t:t}function oe(e,t,n,i){return`${e}失败：${t}。影响：${n}。下一步：${i}`}const Mn="/api/quotation-drafts",cr="/api/quotation-drafts/{id}",Wd="/api/quotation-drafts/{id}/confirm",dr=new WeakMap;function Qd(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",o=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return o;const s=new URLSearchParams(n);return`${o}?${s.toString()}`}function Vd(e,t){var o;const n=globalThis,i=typeof((o=n.crypto)==null?void 0:o.randomUUID)=="function"?n.crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2,10)}`;return`${e}:${t}:${i}`}function Xd(e){let t=dr.get(e);return t||(t=new Map,dr.set(e,t)),t}function Va(e,t){const n=ee(e,t,"data[]"),o=ve(n.id)??Number(n.id);return{id:Number.isFinite(o)?o:0,draft_no:ot(n.draft_no,t,"data[].draft_no"),name:ot(n.name,t,"data[].name"),source:U(n.source),file_path:typeof n.file_path=="string"?n.file_path:null,created_at:U(n.created_at)??null,status:ot(n.status,t,"data[].status"),confirmed_at:U(n.confirmed_at)??null}}function Jd(e,t){const n=ee(e,t,"data"),i=Va(n,t),s=lt(n.lines,t,"data.lines").map(r=>ee(r,t,"data.lines[]"));return{...i,lines:s}}function Yd(e,t){const n=ee(e,t),i=n.data!=null?ee(n.data,t,"data"):{},o=U(i.order_id)??U(n.order_id),s=U(i.message)??U(n.message)??"已确认成单";return{order_id:o,message:s}}async function Jo(e){e.fulfillDraftsLoading=!0,e.fulfillDraftsError=null;try{const t=Qd(e.basePath,Mn,{status:"pending",limit:"50"}),n=await fetch(t),i=await n.json().catch(()=>({}));if(!n.ok){e.fulfillDraftsError=oe("加载待确认报价单列表",ye(i,`HTTP ${n.status}`),"无法查看最新待确认报价单","点击“重试”重新加载列表"),e.fulfillDrafts=[];return}const o=ee(i,Mn),s=lt(o.data,Mn,"data");e.fulfillDrafts=s.map(r=>Va(r,Mn)).filter(r=>r.id>0)}catch(t){const n=t instanceof ce||t instanceof Error?t.message:String(t);e.fulfillDraftsError=oe("加载待确认报价单列表",n,"列表可能为空或字段错位","检查后端返回字段后重试"),e.fulfillDrafts=[]}finally{e.fulfillDraftsLoading=!1}}async function Zd(e,t){var n;e.fulfillDetailId=t;try{const i=(n=e.basePath)!=null&&n.trim()?`${e.basePath.replace(/\/$/,"")}/api/quotation-drafts/${t}`:`/api/quotation-drafts/${t}`,o=await fetch(i),s=await o.json().catch(()=>({}));if(!o.ok){e.fulfillDetail=null,e.fulfillConfirmResult={message:oe("加载报价单详情",ye(s,`HTTP ${o.status}`),"无法确认该报价单","点击“重试”或返回列表后重选")};return}const r=ee(s,cr);e.fulfillDetail=Jd(r.data,cr)}catch(i){const o=i instanceof ce||i instanceof Error?i.message:String(i);e.fulfillDetail=null,e.fulfillConfirmResult={message:oe("加载报价单详情",o,"无法确认该报价单","点击“重试”或返回列表后重选")}}}async function eu(e,t){const n=Xd(e),i=n.get(t);if(i)return i;const o=(async()=>{var s;e.fulfillConfirmBusy=!0,e.fulfillConfirmResult=null;try{const r=(s=e.basePath)!=null&&s.trim()?`${e.basePath.replace(/\/$/,"")}/api/quotation-drafts/${t}/confirm`:`/api/quotation-drafts/${t}/confirm`,a=Vd("fulfill-confirm",String(t)),l=await fetch(r,{method:"PATCH",headers:{"X-Idempotency-Key":a,"Idempotency-Key":a}}),c=await l.json().catch(()=>({}));if(!l.ok)return e.fulfillConfirmResult={message:oe("确认成单",ye(c,`HTTP ${l.status}`),"该报价单仍为待确认，库存未锁定","点击“重试”再次确认")},e.fulfillConfirmResult;const p=Yd(c,Wd);return e.fulfillConfirmResult=p,e.fulfillDetail=null,e.fulfillDetailId=null,await Jo(e),p}catch(r){const a=r instanceof ce||r instanceof Error?r.message:String(r);return e.fulfillConfirmResult={message:oe("确认成单",a,"该报价单仍为待确认，库存未锁定","点击“重试”再次确认")},e.fulfillConfirmResult}finally{e.fulfillConfirmBusy=!1,n.delete(t)}})();return n.set(t,o),o}function De(e){return`${e.product_key??""}	${e.specification??""}	${e.code??""}`}const Fn="/api/shortage/list",cn="/api/procurement/approve",re="/api/replenishment-drafts",ur=new WeakMap;function tu(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",o=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return o;const s=new URLSearchParams(n);return`${o}?${s.toString()}`}function nu(e,t){var o;const n=globalThis,i=typeof((o=n.crypto)==null?void 0:o.randomUUID)=="function"?n.crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2,10)}`;return`${e}:${t}:${i}`}function iu(e){let t=ur.get(e);return t||(t=new Map,ur.set(e,t)),t}function He(e){const t=ve(e);if(t!=null)return t;const n=Number(e);return Number.isFinite(n)?n:void 0}function ou(e,t){const n=ee(e,t,"data[]");return{id:He(n.id),product_name:U(n.product_name),specification:U(n.specification),quantity:He(n.quantity),available_qty:He(n.available_qty),shortfall:He(n.shortfall),code:U(n.code),quote_name:U(n.quote_name),unit_price:He(n.unit_price),file_name:U(n.file_name),uploaded_at:U(n.uploaded_at)??null,product_key:U(n.product_key),count:He(n.count)}}function su(e){const t=new Map;for(const n of e){const i=De(n);if(!i.trim())continue;const o=t.get(i);if(!o){t.set(i,n);continue}const s=Number(o.count??0),r=Number(n.count??0),a=o.uploaded_at?new Date(o.uploaded_at).getTime():0,l=n.uploaded_at?new Date(n.uploaded_at).getTime():0;(r>s||r===s&&l>=a)&&t.set(i,n)}return Array.from(t.values())}function ru(e){const t=ee(e,cn),n=t.data!=null?ee(t.data,cn,"data"):{},i=ve(t.approved_count)??ve(n.approved_count)??(t.approved_count!=null?hi(t.approved_count,cn,"approved_count"):void 0),o=U(t.message)??U(n.message)??"已批准并通知采购员。";return{approved_count:i,message:o}}function au(e){return e.map(n=>`${n.product_key??""}|${n.product_name??""}|${n.specification??""}|${n.code??""}|${n.shortfall??0}`).sort().join(";")}async function Yo(e){e.procurementLoading=!0,e.procurementError=null;try{const t=tu(e.basePath,Fn,{limit:"200",unapproved_only:"1"}),n=await fetch(t),i=await n.json().catch(()=>({}));if(!n.ok){e.procurementError=oe("加载采购建议列表",ye(i,`HTTP ${n.status}`),"无法查看最新缺货采购建议","点击“重试”重新加载列表"),e.procurementSuggestions=[];return}const o=ee(i,Fn),s=lt(o.data,Fn,"data");e.procurementSuggestions=su(s.map(r=>ou(r,Fn)))}catch(t){const n=t instanceof ce||t instanceof Error?t.message:String(t);e.procurementError=oe("加载采购建议列表",n,"列表可能为空或字段错位","检查后端返回字段后重试"),e.procurementSuggestions=[]}finally{e.procurementLoading=!1}}async function pr(e,t){if(!t.length)return null;const n=au(t),i=iu(e),o=i.get(n);if(o)return o;const s=(async()=>{var r;e.procurementApproveBusy=!0,e.procurementApproveResult=null;try{const a=(r=e.basePath)!=null&&r.trim()?`${e.basePath.replace(/\/$/,"")}${cn}`:cn,l=nu("procurement-approve",n||"single"),c=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json","X-Idempotency-Key":l,"Idempotency-Key":l},body:JSON.stringify({items:t})}),p=await c.json().catch(()=>({}));if(!c.ok)return e.procurementApproveResult={message:oe("采购批准",ye(p,`HTTP ${c.status}`),"这些缺货项仍待批准，采购员未收到通知","点击“重试”再次批准")},e.procurementApproveResult;const f=ru(p);return e.procurementApproveResult=f,await Yo(e),f}catch(a){const l=a instanceof ce||a instanceof Error?a.message:String(a);return e.procurementApproveResult={message:oe("采购批准",l,"这些缺货项仍待批准，采购员未收到通知","点击“重试”再次批准")},e.procurementApproveResult}finally{e.procurementApproveBusy=!1,i.delete(n)}})();return i.set(n,s),s}async function xn(e){var t;e.replenishmentLoading=!0,e.replenishmentError=null;try{const n=(t=e.basePath)!=null&&t.trim()?e.basePath.replace(/\/$/,""):"",i=n?`${n}${re}`:re,o=await fetch(i),s=await o.json().catch(()=>({}));if(!o.ok){e.replenishmentError=oe("加载补货单列表",ye(s,`HTTP ${o.status}`),"无法查看补货单列表","点击“重试”重新加载列表"),e.replenishmentDrafts=[];return}const r=ee(s,re),a=lt(r.data,re,"data");e.replenishmentDrafts=a.map(l=>{const c=ee(l,re,"data[]");return{id:hi(c.id,re,"id"),draft_no:U(c.draft_no)??"",name:U(c.name)??"",source:U(c.source)??void 0,created_at:U(c.created_at),status:U(c.status)??"",confirmed_at:U(c.confirmed_at)}})}catch(n){const i=n instanceof ce||n instanceof Error?n.message:String(n);e.replenishmentError=oe("加载补货单列表",i,"补货单列表可能为空或字段错位","检查后端返回字段后重试"),e.replenishmentDrafts=[]}finally{e.replenishmentLoading=!1}}async function lu(e,t){var n;e.replenishmentLoading=!0,e.replenishmentError=null;try{const i=(n=e.basePath)!=null&&n.trim()?e.basePath.replace(/\/$/,""):"",o=i?`${i}${re}/${t}`:`${re}/${t}`,s=await fetch(o),r=await s.json().catch(()=>({}));if(!s.ok){e.replenishmentError=oe("加载补货单详情",ye(r,`HTTP ${s.status}`),"无法查看补货单详情","稍后重试"),e.replenishmentDetail=null,e.replenishmentDetailId=null;return}const a=ee(r,re,"detail"),l=ee(a.data,re,"data"),p=lt(l.lines,re,"data.lines").map(f=>{const g=ee(f,re,"data.lines[]");return{id:He(g.id),row_index:He(g.row_index),code:U(g.code),product_name:U(g.product_name),specification:U(g.specification),quantity:He(g.quantity)??0,current_qty:He(g.current_qty),memo:U(g.memo)}});e.replenishmentDetail={id:hi(l.id,re,"id"),draft_no:U(l.draft_no)??"",name:U(l.name)??"",source:U(l.source)??void 0,created_at:U(l.created_at),status:U(l.status)??"",confirmed_at:U(l.confirmed_at),lines:p},e.replenishmentDetailId=e.replenishmentDetail.id}catch(i){const o=i instanceof ce||i instanceof Error?i.message:String(i);e.replenishmentError=oe("加载补货单详情",o,"无法查看补货单详情","稍后重试"),e.replenishmentDetail=null,e.replenishmentDetailId=null}finally{e.replenishmentLoading=!1}}async function cu(e,t){var f;const n=t.filter(g=>{const b=typeof g.product_or_code=="string"?g.product_or_code.trim():"",$=Number(g.quantity);return b.length>0&&$>0});if(n.length===0)return null;const i={lines:n.map(g=>({product_or_code:typeof g.product_or_code=="string"?g.product_or_code.trim():"",quantity:Number(g.quantity)}))},o=(f=e.basePath)!=null&&f.trim()?e.basePath.replace(/\/$/,""):"",s=o?`${o}${re}`:re,r=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}),a=await r.json().catch(()=>({}));if(!r.ok)return e.replenishmentError=oe("生成补货单",ye(a,`HTTP ${r.status}`),"补货单未创建","请检查输入后重试"),null;const l=ee(a,re),c=l.data!=null?ee(l.data,re,"data"):{},p=hi(c.id,re,"data.id");return await xn(e),{id:p}}async function du(e,t){var n;e.replenishmentConfirmBusy=!0,e.replenishmentConfirmResult=null;try{const i=(n=e.basePath)!=null&&n.trim()?e.basePath.replace(/\/$/,""):"",o=i?`${i}${re}/${t}/confirm`:`${re}/${t}/confirm`,s=await fetch(o,{method:"PATCH"}),r=await s.json().catch(()=>({}));if(!s.ok){e.replenishmentConfirmResult={message:oe("确认补货单",ye(r,`HTTP ${s.status}`),"补货未执行","稍后重试")};return}const a=ee(r,re,"confirm"),l=ee(a.data,re,"data"),c=ve(l.executed),p=U(l.message);e.replenishmentConfirmResult={executed:c??void 0,message:p||`已执行 ${c??0} 条补货操作。`},await xn(e)}catch(i){const o=i instanceof ce||i instanceof Error?i.message:String(i);e.replenishmentConfirmResult={message:oe("确认补货单",o,"补货未执行","稍后重试")}}finally{e.replenishmentConfirmBusy=!1}}async function uu(e,t){var s;const n=(s=e.basePath)!=null&&s.trim()?e.basePath.replace(/\/$/,""):"",i=n?`${n}${re}/${t}`:`${re}/${t}`,o=await fetch(i,{method:"DELETE"});if(!o.ok){const r=await o.json().catch(()=>({}));return e.replenishmentError=oe("删除补货单",ye(r,`HTTP ${o.status}`),"补货单未删除","请重试"),!1}return e.replenishmentDetailId===t&&(e.replenishmentDetail=null,e.replenishmentDetailId=null),await xn(e),!0}function Zo(e){return(e??"").trim().toLowerCase()||"viewer"}function pu(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").map(t=>t.trim()).filter(Boolean):[]}const Xa="openclaw.device.auth.v1";function es(){try{const e=window.localStorage.getItem(Xa);if(!e)return null;const t=JSON.parse(e);return!t||t.version!==1||!t.deviceId||typeof t.deviceId!="string"||!t.tokens||typeof t.tokens!="object"?null:t}catch{return null}}function Ja(e){try{window.localStorage.setItem(Xa,JSON.stringify(e))}catch{}}function fu(e){const t=es();if(!t||t.deviceId!==e.deviceId)return null;const n=Zo(e.role),i=t.tokens[n];return!i||typeof i.token!="string"?null:i}function Ya(e){const t=Zo(e.role),n={version:1,deviceId:e.deviceId,tokens:{}},i=es();i&&i.deviceId===e.deviceId&&(n.tokens={...i.tokens});const o={token:e.token,role:t,scopes:pu(e.scopes),updatedAtMs:Date.now()};return n.tokens[t]=o,Ja(n),o}function Za(e){const t=es();if(!t||t.deviceId!==e.deviceId)return;const n=Zo(e.role);if(!t.tokens[n])return;const i={...t,tokens:{...t.tokens}};delete i.tokens[n],Ja(i)}/*! noble-ed25519 - MIT License (c) 2019 Paul Miller (paulmillr.com) */const el={p:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffedn,n:0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn,h:8n,a:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffecn,d:0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3n,Gx:0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an,Gy:0x6666666666666666666666666666666666666666666666666666666666666658n},{p:me,n:Xn,Gx:fr,Gy:gr,a:zi,d:Ki,h:gu}=el,St=32,ts=64,hu=(...e)=>{"captureStackTrace"in Error&&typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(...e)},ue=(e="")=>{const t=new Error(e);throw hu(t,ue),t},mu=e=>typeof e=="bigint",vu=e=>typeof e=="string",yu=e=>e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array",ct=(e,t,n="")=>{const i=yu(e),o=e==null?void 0:e.length,s=t!==void 0;if(!i||s&&o!==t){const r=n&&`"${n}" `,a=s?` of length ${t}`:"",l=i?`length=${o}`:`type=${typeof e}`;ue(r+"expected Uint8Array"+a+", got "+l)}return e},mi=e=>new Uint8Array(e),tl=e=>Uint8Array.from(e),nl=(e,t)=>e.toString(16).padStart(t,"0"),il=e=>Array.from(ct(e)).map(t=>nl(t,2)).join(""),Je={_0:48,_9:57,A:65,F:70,a:97,f:102},hr=e=>{if(e>=Je._0&&e<=Je._9)return e-Je._0;if(e>=Je.A&&e<=Je.F)return e-(Je.A-10);if(e>=Je.a&&e<=Je.f)return e-(Je.a-10)},ol=e=>{const t="hex invalid";if(!vu(e))return ue(t);const n=e.length,i=n/2;if(n%2)return ue(t);const o=mi(i);for(let s=0,r=0;s<i;s++,r+=2){const a=hr(e.charCodeAt(r)),l=hr(e.charCodeAt(r+1));if(a===void 0||l===void 0)return ue(t);o[s]=a*16+l}return o},sl=()=>globalThis==null?void 0:globalThis.crypto,bu=()=>{var e;return((e=sl())==null?void 0:e.subtle)??ue("crypto.subtle must be defined, consider polyfill")},yn=(...e)=>{const t=mi(e.reduce((i,o)=>i+ct(o).length,0));let n=0;return e.forEach(i=>{t.set(i,n),n+=i.length}),t},wu=(e=St)=>sl().getRandomValues(mi(e)),ni=BigInt,mt=(e,t,n,i="bad number: out of range")=>mu(e)&&t<=e&&e<n?e:ue(i),D=(e,t=me)=>{const n=e%t;return n>=0n?n:t+n},rl=e=>D(e,Xn),$u=(e,t)=>{(e===0n||t<=0n)&&ue("no inverse n="+e+" mod="+t);let n=D(e,t),i=t,o=0n,s=1n;for(;n!==0n;){const r=i/n,a=i%n,l=o-s*r;i=n,n=a,o=s,s=l}return i===1n?D(o,t):ue("no inverse")},xu=e=>{const t=dl[e];return typeof t!="function"&&ue("hashes."+e+" not set"),t},Hi=e=>e instanceof _t?e:ue("Point expected"),po=2n**256n,Ke=class Ke{constructor(t,n,i,o){V(this,"X");V(this,"Y");V(this,"Z");V(this,"T");const s=po;this.X=mt(t,0n,s),this.Y=mt(n,0n,s),this.Z=mt(i,1n,s),this.T=mt(o,0n,s),Object.freeze(this)}static CURVE(){return el}static fromAffine(t){return new Ke(t.x,t.y,1n,D(t.x*t.y))}static fromBytes(t,n=!1){const i=Ki,o=tl(ct(t,St)),s=t[31];o[31]=s&-129;const r=ll(o);mt(r,0n,n?po:me);const l=D(r*r),c=D(l-1n),p=D(i*l+1n);let{isValid:f,value:g}=Su(c,p);f||ue("bad point: y not sqrt");const b=(g&1n)===1n,$=(s&128)!==0;return!n&&g===0n&&$&&ue("bad point: x==0, isLastByteOdd"),$!==b&&(g=D(-g)),new Ke(g,r,1n,D(g*r))}static fromHex(t,n){return Ke.fromBytes(ol(t),n)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}assertValidity(){const t=zi,n=Ki,i=this;if(i.is0())return ue("bad point: ZERO");const{X:o,Y:s,Z:r,T:a}=i,l=D(o*o),c=D(s*s),p=D(r*r),f=D(p*p),g=D(l*t),b=D(p*D(g+c)),$=D(f+D(n*D(l*c)));if(b!==$)return ue("bad point: equation left != right (1)");const k=D(o*s),S=D(r*a);return k!==S?ue("bad point: equation left != right (2)"):this}equals(t){const{X:n,Y:i,Z:o}=this,{X:s,Y:r,Z:a}=Hi(t),l=D(n*a),c=D(s*o),p=D(i*a),f=D(r*o);return l===c&&p===f}is0(){return this.equals(Ot)}negate(){return new Ke(D(-this.X),this.Y,this.Z,D(-this.T))}double(){const{X:t,Y:n,Z:i}=this,o=zi,s=D(t*t),r=D(n*n),a=D(2n*D(i*i)),l=D(o*s),c=t+n,p=D(D(c*c)-s-r),f=l+r,g=f-a,b=l-r,$=D(p*g),k=D(f*b),S=D(p*b),R=D(g*f);return new Ke($,k,R,S)}add(t){const{X:n,Y:i,Z:o,T:s}=this,{X:r,Y:a,Z:l,T:c}=Hi(t),p=zi,f=Ki,g=D(n*r),b=D(i*a),$=D(s*f*c),k=D(o*l),S=D((n+i)*(r+a)-g-b),R=D(k-$),I=D(k+$),F=D(b-p*g),A=D(S*R),C=D(I*F),z=D(S*F),y=D(R*I);return new Ke(A,C,y,z)}subtract(t){return this.add(Hi(t).negate())}multiply(t,n=!0){if(!n&&(t===0n||this.is0()))return Ot;if(mt(t,1n,Xn),t===1n)return this;if(this.equals(At))return Mu(t).p;let i=Ot,o=At;for(let s=this;t>0n;s=s.double(),t>>=1n)t&1n?i=i.add(s):n&&(o=o.add(s));return i}multiplyUnsafe(t){return this.multiply(t,!1)}toAffine(){const{X:t,Y:n,Z:i}=this;if(this.equals(Ot))return{x:0n,y:1n};const o=$u(i,me);D(i*o)!==1n&&ue("invalid inverse");const s=D(t*o),r=D(n*o);return{x:s,y:r}}toBytes(){const{x:t,y:n}=this.assertValidity().toAffine(),i=al(n);return i[31]|=t&1n?128:0,i}toHex(){return il(this.toBytes())}clearCofactor(){return this.multiply(ni(gu),!1)}isSmallOrder(){return this.clearCofactor().is0()}isTorsionFree(){let t=this.multiply(Xn/2n,!1).double();return Xn%2n&&(t=t.add(this)),t.is0()}};V(Ke,"BASE"),V(Ke,"ZERO");let _t=Ke;const At=new _t(fr,gr,1n,D(fr*gr)),Ot=new _t(0n,1n,1n,0n);_t.BASE=At;_t.ZERO=Ot;const al=e=>ol(nl(mt(e,0n,po),ts)).reverse(),ll=e=>ni("0x"+il(tl(ct(e)).reverse())),Ue=(e,t)=>{let n=e;for(;t-- >0n;)n*=n,n%=me;return n},ku=e=>{const n=e*e%me*e%me,i=Ue(n,2n)*n%me,o=Ue(i,1n)*e%me,s=Ue(o,5n)*o%me,r=Ue(s,10n)*s%me,a=Ue(r,20n)*r%me,l=Ue(a,40n)*a%me,c=Ue(l,80n)*l%me,p=Ue(c,80n)*l%me,f=Ue(p,10n)*s%me;return{pow_p_5_8:Ue(f,2n)*e%me,b2:n}},mr=0x2b8324804fc1df0b2b4d00993dfbd7a72f431806ad2fe478c4ee1b274a0ea0b0n,Su=(e,t)=>{const n=D(t*t*t),i=D(n*n*t),o=ku(e*i).pow_p_5_8;let s=D(e*n*o);const r=D(t*s*s),a=s,l=D(s*mr),c=r===e,p=r===D(-e),f=r===D(-e*mr);return c&&(s=a),(p||f)&&(s=l),(D(s)&1n)===1n&&(s=D(-s)),{isValid:c||p,value:s}},fo=e=>rl(ll(e)),ns=(...e)=>dl.sha512Async(yn(...e)),_u=(...e)=>xu("sha512")(yn(...e)),cl=e=>{const t=e.slice(0,St);t[0]&=248,t[31]&=127,t[31]|=64;const n=e.slice(St,ts),i=fo(t),o=At.multiply(i),s=o.toBytes();return{head:t,prefix:n,scalar:i,point:o,pointBytes:s}},is=e=>ns(ct(e,St)).then(cl),Au=e=>cl(_u(ct(e,St))),Cu=e=>is(e).then(t=>t.pointBytes),Tu=e=>ns(e.hashable).then(e.finish),Eu=(e,t,n)=>{const{pointBytes:i,scalar:o}=e,s=fo(t),r=At.multiply(s).toBytes();return{hashable:yn(r,i,n),finish:c=>{const p=rl(s+fo(c)*o);return ct(yn(r,al(p)),ts)}}},Ru=async(e,t)=>{const n=ct(e),i=await is(t),o=await ns(i.prefix,n);return Tu(Eu(i,o,n))},dl={sha512Async:async e=>{const t=bu(),n=yn(e);return mi(await t.digest("SHA-512",n.buffer))},sha512:void 0},Lu=(e=wu(St))=>e,Iu={getExtendedPublicKeyAsync:is,getExtendedPublicKey:Au,randomSecretKey:Lu},ii=8,Pu=256,ul=Math.ceil(Pu/ii)+1,go=2**(ii-1),Du=()=>{const e=[];let t=At,n=t;for(let i=0;i<ul;i++){n=t,e.push(n);for(let o=1;o<go;o++)n=n.add(t),e.push(n);t=n.double()}return e};let vr;const yr=(e,t)=>{const n=t.negate();return e?n:t},Mu=e=>{const t=vr||(vr=Du());let n=Ot,i=At;const o=2**ii,s=o,r=ni(o-1),a=ni(ii);for(let l=0;l<ul;l++){let c=Number(e&r);e>>=a,c>go&&(c-=s,e+=1n);const p=l*go,f=p,g=p+Math.abs(c)-1,b=l%2!==0,$=c<0;c===0?i=i.add(yr(b,t[f])):n=n.add(yr($,t[g]))}return e!==0n&&ue("invalid wnaf"),{p:n,f:i}},ji="openclaw-device-identity-v1";function ho(e){let t="";for(const n of e)t+=String.fromCharCode(n);return btoa(t).replaceAll("+","-").replaceAll("/","_").replace(/=+$/g,"")}function pl(e){const t=e.replaceAll("-","+").replaceAll("_","/"),n=t+"=".repeat((4-t.length%4)%4),i=atob(n),o=new Uint8Array(i.length);for(let s=0;s<i.length;s+=1)o[s]=i.charCodeAt(s);return o}function Fu(e){return Array.from(e).map(t=>t.toString(16).padStart(2,"0")).join("")}async function fl(e){const t=await crypto.subtle.digest("SHA-256",e.slice().buffer);return Fu(new Uint8Array(t))}async function Nu(){const e=Iu.randomSecretKey(),t=await Cu(e);return{deviceId:await fl(t),publicKey:ho(t),privateKey:ho(e)}}async function os(){try{const n=localStorage.getItem(ji);if(n){const i=JSON.parse(n);if((i==null?void 0:i.version)===1&&typeof i.deviceId=="string"&&typeof i.publicKey=="string"&&typeof i.privateKey=="string"){const o=await fl(pl(i.publicKey));if(o!==i.deviceId){const s={...i,deviceId:o};return localStorage.setItem(ji,JSON.stringify(s)),{deviceId:o,publicKey:i.publicKey,privateKey:i.privateKey}}return{deviceId:i.deviceId,publicKey:i.publicKey,privateKey:i.privateKey}}}}catch{}const e=await Nu(),t={version:1,deviceId:e.deviceId,publicKey:e.publicKey,privateKey:e.privateKey,createdAtMs:Date.now()};return localStorage.setItem(ji,JSON.stringify(t)),e}async function Ou(e,t){const n=pl(e),i=new TextEncoder().encode(t),o=await Ru(i,n);return ho(o)}async function dt(e,t){if(!(!e.client||!e.connected)&&!e.devicesLoading){e.devicesLoading=!0,t!=null&&t.quiet||(e.devicesError=null);try{const n=await e.client.request("device.pair.list",{});e.devicesList={pending:Array.isArray(n==null?void 0:n.pending)?n.pending:[],paired:Array.isArray(n==null?void 0:n.paired)?n.paired:[]}}catch(n){t!=null&&t.quiet||(e.devicesError=String(n))}finally{e.devicesLoading=!1}}}async function Bu(e,t){if(!(!e.client||!e.connected))try{await e.client.request("device.pair.approve",{requestId:t}),await dt(e)}catch(n){e.devicesError=String(n)}}async function Uu(e,t){if(!(!e.client||!e.connected||!window.confirm("Reject this device pairing request?")))try{await e.client.request("device.pair.reject",{requestId:t}),await dt(e)}catch(i){e.devicesError=String(i)}}async function qu(e,t){if(!(!e.client||!e.connected))try{const n=await e.client.request("device.token.rotate",t);if(n!=null&&n.token){const i=await os(),o=n.role??t.role;(n.deviceId===i.deviceId||t.deviceId===i.deviceId)&&Ya({deviceId:i.deviceId,role:o,token:n.token,scopes:n.scopes??t.scopes??[]}),window.prompt("New device token (copy and store securely):",n.token)}await dt(e)}catch(n){e.devicesError=String(n)}}async function zu(e,t){if(!(!e.client||!e.connected||!window.confirm(`Revoke token for ${t.deviceId} (${t.role})?`)))try{await e.client.request("device.token.revoke",t);const i=await os();t.deviceId===i.deviceId&&Za({deviceId:i.deviceId,role:t.role}),await dt(e)}catch(i){e.devicesError=String(i)}}function Ku(e){if(!e||e.kind==="gateway")return{method:"exec.approvals.get",params:{}};const t=e.nodeId.trim();return t?{method:"exec.approvals.node.get",params:{nodeId:t}}:null}function Hu(e,t){if(!e||e.kind==="gateway")return{method:"exec.approvals.set",params:t};const n=e.nodeId.trim();return n?{method:"exec.approvals.node.set",params:{...t,nodeId:n}}:null}async function ss(e,t){if(!(!e.client||!e.connected)&&!e.execApprovalsLoading){e.execApprovalsLoading=!0,e.lastError=null;try{const n=Ku(t);if(!n){e.lastError="Select a node before loading exec approvals.";return}const i=await e.client.request(n.method,n.params);ju(e,i)}catch(n){e.lastError=String(n)}finally{e.execApprovalsLoading=!1}}}function ju(e,t){e.execApprovalsSnapshot=t,e.execApprovalsDirty||(e.execApprovalsForm=kt(t.file??{}))}async function Gu(e,t){var n,i;if(!(!e.client||!e.connected)){e.execApprovalsSaving=!0,e.lastError=null;try{const o=(n=e.execApprovalsSnapshot)==null?void 0:n.hash;if(!o){e.lastError="Exec approvals hash missing; reload and retry.";return}const s=e.execApprovalsForm??((i=e.execApprovalsSnapshot)==null?void 0:i.file)??{},r=Hu(t,{file:s,baseHash:o});if(!r){e.lastError="Select a node before saving exec approvals.";return}await e.client.request(r.method,r.params),e.execApprovalsDirty=!1,await ss(e,t)}catch(o){e.lastError=String(o)}finally{e.execApprovalsSaving=!1}}}function Wu(e,t,n){var o;const i=kt(e.execApprovalsForm??((o=e.execApprovalsSnapshot)==null?void 0:o.file)??{});Da(i,t,n),e.execApprovalsForm=i,e.execApprovalsDirty=!0}function Qu(e,t){var i;const n=kt(e.execApprovalsForm??((i=e.execApprovalsSnapshot)==null?void 0:i.file)??{});Ma(n,t),e.execApprovalsForm=n,e.execApprovalsDirty=!0}function Ae(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",o=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return o;const s=new URLSearchParams;for(const[r,a]of Object.entries(n))s.set(r,String(a));return`${o}?${s.toString()}`}async function vi(e,t){e.oosLoading=!0,e.oosError=null;try{const[o,s,r,a]=await Promise.all([fetch(Ae(e.basePath,"/api/oos/stats")),fetch(Ae(e.basePath,"/api/oos/list",{limit:100})),fetch(Ae(e.basePath,"/api/oos/by-file",{limit:50})),fetch(Ae(e.basePath,"/api/oos/by-time",{days:30}))]),l=await o.json().catch(()=>({})),c=await s.json().catch(()=>({})),p=await r.json().catch(()=>({})),f=await a.json().catch(()=>({}));l.success&&l.data?(e.oosStats=l.data,e.oosDb=l.db??null):(e.oosStats=null,o.ok||(e.oosError=l.detail??`stats: ${o.status}`)),c.success&&Array.isArray(c.data)?e.oosList=c.data:(e.oosList=[],!e.oosError&&!s.ok&&(e.oosError=c.detail??`list: ${s.status}`)),p.success&&Array.isArray(p.data)?e.oosByFile=p.data:e.oosByFile=[],f.success&&Array.isArray(f.data)?e.oosByTime=f.data:e.oosByTime=[]}catch(o){e.oosError=o instanceof Error?o.message:String(o),e.oosStats=null,e.oosList=[],e.oosByFile=[],e.oosByTime=[]}finally{e.oosLoading=!1}}async function Vu(e,t){if(!(t!=null&&t.trim()))return!1;try{const n=await fetch(Ae(e.basePath,"/api/oos/delete"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_key:t.trim()})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(await vi(e),!0):(e.oosError=i.detail??`删除失败: ${n.status}`,!1)}catch(n){return e.oosError=n instanceof Error?n.message:String(n),!1}}async function Xu(e,t){const n=(t.product_name||"").trim();if(!n)return!1;try{const i=await fetch(Ae(e.basePath,"/api/oos/add"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_name:n,specification:(t.specification??"").trim(),quantity:t.quantity??0,unit:(t.unit??"").trim()})}),o=await i.json().catch(()=>({}));return i.ok&&o.success?(await vi(e),!0):(e.oosError=o.detail??`添加失败: ${i.status}`,!1)}catch(i){return e.oosError=i instanceof Error?i.message:String(i),!1}}async function Ju(e){try{const t=await fetch(Ae(e.basePath,"/api/oos/stats")),n=await t.json().catch(()=>({}));if(t.ok&&n.success&&n.data)e.overviewOosStats=n.data,e.overviewOosError=null;else{e.overviewOosStats=null;const i=typeof n.detail=="string"?n.detail:n.message??n.error??`oos stats: ${t.status}`;e.overviewOosError=i}}catch(t){e.overviewOosStats=null,e.overviewOosError=t instanceof Error?t.message:String(t)}}async function yi(e,t){e.shortageLoading=!0,e.shortageError=null;try{const[o,s,r,a]=await Promise.all([fetch(Ae(e.basePath,"/api/shortage/stats"),{method:"GET"}),fetch(Ae(e.basePath,"/api/shortage/list",{limit:100}),{method:"GET"}),fetch(Ae(e.basePath,"/api/shortage/by-file"),{method:"GET"}),fetch(Ae(e.basePath,"/api/shortage/by-time",{days:30}),{method:"GET"})]),l=await o.json().catch(()=>({})),c=await s.json().catch(()=>({})),p=await r.json().catch(()=>({})),f=await a.json().catch(()=>({}));if(l.success&&l.data)e.shortageStats=l.data,e.shortageDb=l.db??null;else if(e.shortageStats=null,!e.shortageError&&!o.ok){const g=typeof l.detail=="string"?l.detail:l.message??l.error;e.shortageError=g??`stats: ${o.status} ${o.statusText}`}if(c.success&&Array.isArray(c.data))e.shortageList=c.data;else if(e.shortageList=[],!e.shortageError&&!s.ok){const g=typeof c.detail=="string"?c.detail:c.message??c.error;e.shortageError=g??`list: ${s.status} ${s.statusText}`}if(p.success&&Array.isArray(p.data))e.shortageByFile=p.data;else if(e.shortageByFile=[],!e.shortageError&&!r.ok){const g=typeof p.detail=="string"?p.detail:p.message??p.error;e.shortageError=g??`by-file: ${r.status} ${r.statusText}`}if(f.success&&Array.isArray(f.data))e.shortageByTime=f.data;else if(e.shortageByTime=[],!e.shortageError&&!a.ok){const g=typeof f.detail=="string"?f.detail:f.message??f.error;e.shortageError=g??`by-time: ${a.status} ${a.statusText}`}}catch(o){e.shortageError=o instanceof Error?o.message:String(o),e.shortageStats=null,e.shortageList=[],e.shortageByFile=[],e.shortageByTime=[]}finally{e.shortageLoading=!1}}async function Yu(e,t){if(!(t!=null&&t.trim()))return!1;try{const n=await fetch(Ae(e.basePath,"/api/shortage/delete"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_key:t.trim()})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(await yi(e),!0):(e.shortageError=i.detail??`删除失败: ${n.status}`,!1)}catch(n){return e.shortageError=n instanceof Error?n.message:String(n),!1}}async function Zu(e,t){const n=(t.product_name||"").trim();if(!n)return!1;try{const i=await fetch(Ae(e.basePath,"/api/shortage/add"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_name:n,specification:(t.specification??"").trim(),quantity:t.quantity??0,available_qty:t.available_qty??0})}),o=await i.json().catch(()=>({}));return i.ok&&o.success?(await yi(e),!0):(e.shortageError=o.detail??`添加失败: ${i.status}`,!1)}catch(i){return e.shortageError=i instanceof Error?i.message:String(i),!1}}async function ep(e){try{const t=await fetch(Ae(e.basePath,"/api/shortage/stats"),{method:"GET"}),n=await t.json().catch(()=>({}));if(t.ok&&n.success&&n.data)e.overviewShortageStats=n.data,e.overviewShortageError=null;else{e.overviewShortageStats=null;const i=typeof n.detail=="string"?n.detail:n.message??n.error??`shortage stats: ${t.status}`;e.overviewShortageError=i}}catch(t){e.overviewShortageStats=null,e.overviewShortageError=t instanceof Error?t.message:String(t)}}async function tp(e){if(!(!e.client||!e.connected)&&!e.presenceLoading){e.presenceLoading=!0,e.presenceError=null,e.presenceStatus=null;try{const t=await e.client.request("system-presence",{});Array.isArray(t)?(e.presenceEntries=t,e.presenceStatus=t.length===0?"No instances yet.":null):(e.presenceEntries=[],e.presenceStatus="No presence payload.")}catch(t){e.presenceError=String(t)}finally{e.presenceLoading=!1}}}async function rs(e,t){if(!(!e.client||!e.connected)&&!e.sessionsLoading){e.sessionsLoading=!0,e.sessionsError=null;try{const n=(t==null?void 0:t.includeGlobal)??e.sessionsIncludeGlobal,i=(t==null?void 0:t.includeUnknown)??e.sessionsIncludeUnknown,o=(t==null?void 0:t.activeMinutes)??lr(e.sessionsFilterActive,0),s=(t==null?void 0:t.limit)??lr(e.sessionsFilterLimit,0),r={includeGlobal:n,includeUnknown:i};o>0&&(r.activeMinutes=o),s>0&&(r.limit=s);const a=await e.client.request("sessions.list",r);a&&(e.sessionsResult=a)}catch(n){e.sessionsError=String(n)}finally{e.sessionsLoading=!1}}}function zt(e,t,n){if(!t.trim())return;const i={...e.skillMessages};n?i[t]=n:delete i[t],e.skillMessages=i}function bi(e){return e instanceof Error?e.message:String(e)}async function kn(e,t){if(t!=null&&t.clearMessages&&Object.keys(e.skillMessages).length>0&&(e.skillMessages={}),!(!e.client||!e.connected)&&!e.skillsLoading){e.skillsLoading=!0,e.skillsError=null;try{const n=await e.client.request("skills.status",{});n&&(e.skillsReport=n)}catch(n){e.skillsError=bi(n)}finally{e.skillsLoading=!1}}}function np(e,t,n){e.skillEdits={...e.skillEdits,[t]:n}}async function ip(e,t,n){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{await e.client.request("skills.update",{skillKey:t,enabled:n}),await kn(e),zt(e,t,{kind:"success",message:n?"Skill enabled":"Skill disabled"})}catch(i){const o=bi(i);e.skillsError=o,zt(e,t,{kind:"error",message:o})}finally{e.skillsBusyKey=null}}}async function op(e,t){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const n=e.skillEdits[t]??"";await e.client.request("skills.update",{skillKey:t,apiKey:n}),await kn(e),zt(e,t,{kind:"success",message:"API key saved"})}catch(n){const i=bi(n);e.skillsError=i,zt(e,t,{kind:"error",message:i})}finally{e.skillsBusyKey=null}}}async function sp(e,t,n,i){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const o=await e.client.request("skills.install",{name:n,installId:i,timeoutMs:12e4});await kn(e),zt(e,t,{kind:"success",message:(o==null?void 0:o.message)??"Installed"})}catch(o){const s=bi(o);e.skillsError=s,zt(e,t,{kind:"error",message:s})}finally{e.skillsBusyKey=null}}}const rp=[{label:"chat",tabs:["chat"]},{label:"control",tabs:["overview","channels","instances","sessions","work","cron"]},{label:"agent",tabs:["agents","skills","nodes"]},{label:"settings",tabs:["config","debug","logs"]}],gl={agents:"/agents",overview:"/overview",channels:"/channels",instances:"/instances",sessions:"/sessions",work:"/work",cron:"/cron",skills:"/skills",nodes:"/nodes",chat:"/chat",config:"/config",debug:"/debug",logs:"/logs"},hl=new Map(Object.entries(gl).map(([e,t])=>[t,e]));function jt(e){if(!e)return"";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t==="/"?"":(t.endsWith("/")&&(t=t.slice(0,-1)),t)}function bn(e){if(!e)return"/";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t.length>1&&t.endsWith("/")&&(t=t.slice(0,-1)),t}function ml(e,t=""){const n=jt(t),i=gl[e];return n?`${n}${i}`:i}function vl(e,t=""){const n=jt(t);let i=e||"/";n&&(i===n?i="/":i.startsWith(`${n}/`)&&(i=i.slice(n.length)));let o=bn(i).toLowerCase();return o.endsWith("/index.html")&&(o="/"),o==="/"?"chat":hl.get(o)??null}function ap(e){let t=bn(e);if(t.endsWith("/index.html")&&(t=bn(t.slice(0,-11))),t==="/")return"";const n=t.split("/").filter(Boolean);if(n.length===0)return"";for(let i=0;i<n.length;i++){const o=`/${n.slice(i).join("/")}`.toLowerCase();if(hl.has(o)){const s=n.slice(0,i);return s.length?`/${s.join("/")}`:""}}return`/${n.join("/")}`}function lp(e){switch(e){case"agents":return"folder";case"chat":return"messageSquare";case"overview":return"barChart";case"channels":return"fileText";case"instances":return"radio";case"sessions":return"fileText";case"work":return"fileText";case"cron":return"loader";case"skills":return"zap";case"nodes":return"monitor";case"config":return"settings";case"debug":return"bug";case"logs":return"scrollText";default:return"folder"}}function mo(e){return u(`tabs.${e}`)}function cp(e){return u(`subtitles.${e}`)}const yl="openclaw.control.settings.v1";function dp(){const t={gatewayUrl:`${location.protocol==="https:"?"wss":"ws"}://${location.host}/ws`,token:"",sessionKey:"main",lastActiveSessionKey:"main",theme:"system",chatFocusMode:!1,chatShowThinking:!0,splitRatio:.6,navCollapsed:!1,navGroupsCollapsed:{}};try{const n=localStorage.getItem(yl);if(!n)return t;const i=JSON.parse(n);return{gatewayUrl:typeof i.gatewayUrl=="string"&&i.gatewayUrl.trim()?i.gatewayUrl.trim():t.gatewayUrl,token:typeof i.token=="string"?i.token:t.token,sessionKey:typeof i.sessionKey=="string"&&i.sessionKey.trim()?i.sessionKey.trim():t.sessionKey,lastActiveSessionKey:typeof i.lastActiveSessionKey=="string"&&i.lastActiveSessionKey.trim()?i.lastActiveSessionKey.trim():typeof i.sessionKey=="string"&&i.sessionKey.trim()||t.lastActiveSessionKey,theme:i.theme==="light"||i.theme==="dark"||i.theme==="system"?i.theme:t.theme,chatFocusMode:typeof i.chatFocusMode=="boolean"?i.chatFocusMode:t.chatFocusMode,chatShowThinking:typeof i.chatShowThinking=="boolean"?i.chatShowThinking:t.chatShowThinking,splitRatio:typeof i.splitRatio=="number"&&i.splitRatio>=.4&&i.splitRatio<=.7?i.splitRatio:t.splitRatio,navCollapsed:typeof i.navCollapsed=="boolean"?i.navCollapsed:t.navCollapsed,navGroupsCollapsed:typeof i.navGroupsCollapsed=="object"&&i.navGroupsCollapsed!==null?i.navGroupsCollapsed:t.navGroupsCollapsed,locale:qo(i.locale)?i.locale:void 0}}catch{return t}}function up(e){localStorage.setItem(yl,JSON.stringify(e))}const Nn=e=>Number.isNaN(e)?.5:e<=0?0:e>=1?1:e,pp=()=>typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches??!1,On=e=>{e.classList.remove("theme-transition"),e.style.removeProperty("--theme-switch-x"),e.style.removeProperty("--theme-switch-y")},fp=({nextTheme:e,applyTheme:t,context:n,currentTheme:i})=>{var c;if(i===e)return;const o=globalThis.document??null;if(!o){t();return}const s=o.documentElement,r=o,a=pp();if(!!r.startViewTransition&&!a){let p=.5,f=.5;if((n==null?void 0:n.pointerClientX)!==void 0&&(n==null?void 0:n.pointerClientY)!==void 0&&typeof window<"u")p=Nn(n.pointerClientX/window.innerWidth),f=Nn(n.pointerClientY/window.innerHeight);else if(n!=null&&n.element){const g=n.element.getBoundingClientRect();g.width>0&&g.height>0&&typeof window<"u"&&(p=Nn((g.left+g.width/2)/window.innerWidth),f=Nn((g.top+g.height/2)/window.innerHeight))}s.style.setProperty("--theme-switch-x",`${p*100}%`),s.style.setProperty("--theme-switch-y",`${f*100}%`),s.classList.add("theme-transition");try{const g=(c=r.startViewTransition)==null?void 0:c.call(r,()=>{t()});g!=null&&g.finished?g.finished.finally(()=>On(s)):On(s)}catch{On(s),t()}return}t(),On(s)};function gp(){return typeof window>"u"||typeof window.matchMedia!="function"||window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function as(e){return e==="system"?gp():e}function at(e,t){var i;const n={...t,lastActiveSessionKey:((i=t.lastActiveSessionKey)==null?void 0:i.trim())||t.sessionKey.trim()||"main"};e.settings=n,up(n),t.theme!==e.theme&&(e.theme=t.theme,wi(e,as(t.theme))),e.applySessionKey=e.settings.lastActiveSessionKey}function bl(e,t){const n=t.trim();n&&e.settings.lastActiveSessionKey!==n&&at(e,{...e.settings,lastActiveSessionKey:n})}function hp(e){if(!window.location.search&&!window.location.hash)return;const t=new URL(window.location.href),n=new URLSearchParams(t.search),i=new URLSearchParams(t.hash.startsWith("#")?t.hash.slice(1):t.hash),o=n.get("token")??i.get("token"),s=n.get("password")??i.get("password"),r=n.get("session")??i.get("session"),a=n.get("gatewayUrl")??i.get("gatewayUrl");let l=!1;if(o!=null){const p=o.trim();p&&p!==e.settings.token&&at(e,{...e.settings,token:p}),n.delete("token"),i.delete("token"),l=!0}if(s!=null&&(n.delete("password"),i.delete("password"),l=!0),r!=null){const p=r.trim();p&&(e.sessionKey=p,at(e,{...e.settings,sessionKey:p,lastActiveSessionKey:p}))}if(a!=null){const p=a.trim();p&&p!==e.settings.gatewayUrl&&(e.pendingGatewayUrl=p),n.delete("gatewayUrl"),i.delete("gatewayUrl"),l=!0}if(!l)return;t.search=n.toString();const c=i.toString();t.hash=c?`#${c}`:"",window.history.replaceState({},"",t.toString())}function mp(e,t){e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?Ho(e):jo(e),t==="debug"?Go(e):Wo(e),ls(e),$l(e,t,!1)}function vp(e,t,n){fp({nextTheme:t,applyTheme:()=>{e.theme=t,at(e,{...e.settings,theme:t}),wi(e,as(t))},context:n,currentTheme:e.theme})}async function ls(e){var t,n,i,o,s,r;if(e.tab==="overview"&&(await xl(e),await Promise.all([Ju(e),ep(e)])),e.tab==="channels"&&await Ha(e),e.tab==="instances"){const a=e;await vi(a),await yi(a)}if(e.tab==="sessions"&&(await Yo(e),await xn(e)),e.tab==="cron"&&await Jo(e),e.tab==="skills"&&await kn(e),e.tab==="agents"){await Qo(e),await Ge(e);const a=((n=(t=e.agentsList)==null?void 0:t.agents)==null?void 0:n.map(c=>c.id))??[];a.length>0&&Ka(e,a);const l=e.agentsSelectedId??((i=e.agentsList)==null?void 0:i.defaultId)??((r=(s=(o=e.agentsList)==null?void 0:o.agents)==null?void 0:s[0])==null?void 0:r.id);l&&(za(e,l),e.agentsPanel==="skills"&&Vn(e,l),e.agentsPanel==="channels"&&Re(e,!1),e.agentsPanel==="cron"&&cs(e))}e.tab==="nodes"&&(await gi(e),await dt(e),await Ge(e),await ss(e)),e.tab==="chat"&&(await El(e),$n(e,!e.chatHasAutoScrolled)),e.tab==="config"&&(await ud(e),await Ge(e)),e.tab==="debug"&&(await fi(e),e.eventLog=e.eventLogBuffer),e.tab==="logs"&&(e.logsAtBottom=!0,await Ko(e,{reset:!0}),qa(e,!0))}function yp(){if(typeof window>"u")return"";const e=window.__OPENCLAW_CONTROL_UI_BASE_PATH__;return typeof e=="string"&&e.trim()?jt(e):ap(window.location.pathname)}function bp(e){e.theme=e.settings.theme??"system",wi(e,as(e.theme))}function wi(e,t){if(e.themeResolved=t,typeof document>"u")return;const n=document.documentElement;n.dataset.theme=t,n.style.colorScheme=t}function wp(e){if(typeof window>"u"||typeof window.matchMedia!="function")return;if(e.themeMedia=window.matchMedia("(prefers-color-scheme: dark)"),e.themeMediaHandler=n=>{e.theme==="system"&&wi(e,n.matches?"dark":"light")},typeof e.themeMedia.addEventListener=="function"){e.themeMedia.addEventListener("change",e.themeMediaHandler);return}e.themeMedia.addListener(e.themeMediaHandler)}function $p(e){if(!e.themeMedia||!e.themeMediaHandler)return;if(typeof e.themeMedia.removeEventListener=="function"){e.themeMedia.removeEventListener("change",e.themeMediaHandler);return}e.themeMedia.removeListener(e.themeMediaHandler),e.themeMedia=null,e.themeMediaHandler=null}function xp(e,t){if(typeof window>"u")return;const n=vl(window.location.pathname,e.basePath)??"chat";wl(e,n),$l(e,n,t)}function kp(e){var o;if(typeof window>"u")return;const t=vl(window.location.pathname,e.basePath);if(!t)return;const i=(o=new URL(window.location.href).searchParams.get("session"))==null?void 0:o.trim();i&&(e.sessionKey=i,at(e,{...e.settings,sessionKey:i,lastActiveSessionKey:i})),wl(e,t)}function wl(e,t){e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?Ho(e):jo(e),t==="debug"?Go(e):Wo(e),e.connected&&ls(e)}function $l(e,t,n){if(typeof window>"u")return;const i=bn(ml(t,e.basePath)),o=bn(window.location.pathname),s=new URL(window.location.href);t==="chat"&&e.sessionKey?s.searchParams.set("session",e.sessionKey):s.searchParams.delete("session"),o!==i&&(s.pathname=i),n?window.history.replaceState({},"",s.toString()):window.history.pushState({},"",s.toString())}function Sp(e,t,n){if(typeof window>"u")return;const i=new URL(window.location.href);i.searchParams.set("session",t),window.history.replaceState({},"",i.toString())}async function xl(e){await Promise.all([Re(e,!1),tp(e),rs(e),Wa(e),fi(e)])}async function cs(e){await Promise.all([Re(e,!1),Wa(e),Gd(e)])}async function _p(e){await Jo(e)}async function Ap(e){await Yo(e)}const br=50,Cp=80,Tp=12e4,Ep="[宸叉覆鏌撳埌鍓嶇]";function Rp(e){if(!e||typeof e!="object")return null;const t=e;if(typeof t.text=="string")return t.text;const n=t.content;if(!Array.isArray(n))return null;const i=n.map(o=>{if(!o||typeof o!="object")return null;const s=o;return s.type==="text"&&typeof s.text=="string"?s.text:null}).filter(o=>!!o);return i.length===0?null:i.join(`
`)}function wr(e){if(e==null)return null;if(typeof e=="number"||typeof e=="boolean")return String(e);const t=Rp(e);let n;if(typeof e=="string")n=e;else if(t)n=t;else try{n=JSON.stringify(e,null,2)}catch{n=String(e)}const i=Ga(n,Tp);return i.truncated?`${i.text}

鈥?truncated (${i.total} chars, showing first ${i.text.length}).`:i.text}function Lp(e){const t=[];return t.push({type:"toolcall",name:e.name,arguments:e.args??{}}),e.output&&t.push({type:"toolresult",name:e.name,text:e.output}),{role:"assistant",toolCallId:e.toolCallId,runId:e.runId,content:t,timestamp:e.startedAt}}function Ip(e){if(e.toolStreamOrder.length<=br)return;const t=e.toolStreamOrder.length-br,n=e.toolStreamOrder.splice(0,t);for(const i of n)e.toolStreamById.delete(i)}function Pp(e){e.chatToolMessages=e.toolStreamOrder.map(t=>{var n;return(n=e.toolStreamById.get(t))==null?void 0:n.message}).filter(t=>!!t)}function vo(e){e.toolStreamSyncTimer!=null&&(clearTimeout(e.toolStreamSyncTimer),e.toolStreamSyncTimer=null),Pp(e)}function Dp(e,t=!1){if(t){vo(e);return}e.toolStreamSyncTimer==null&&(e.toolStreamSyncTimer=window.setTimeout(()=>vo(e),Cp))}function $i(e){e.toolStreamById.clear(),e.toolStreamOrder=[],e.chatToolMessages=[],vo(e)}function kl(e){e.toolRenderData=null,e.toolRenderSeq=null}const Mp=5e3;function Fp(e,t){var o;const n=t.data??{},i=typeof n.phase=="string"?n.phase:"";e.compactionClearTimer!=null&&(window.clearTimeout(e.compactionClearTimer),e.compactionClearTimer=null),i==="start"?e.compactionStatus={active:!0,startedAt:Date.now(),completedAt:null}:i==="end"&&(e.compactionStatus={active:!1,startedAt:((o=e.compactionStatus)==null?void 0:o.startedAt)??null,completedAt:Date.now()},e.compactionClearTimer=window.setTimeout(()=>{e.compactionStatus=null,e.compactionClearTimer=null},Mp))}function Np(e,t){const n=t.data??{};if(typeof n.formatted_response!="string"||n.formatted_response.trim().length===0){console.warn("[tool_render] malformed payload:",n);return}const i=n.chosen_index;let o=0;if(typeof i=="number"&&Number.isFinite(i))o=i;else if(typeof i=="string"&&i.trim()){const r=Number(i);o=Number.isFinite(r)?r:0}const s=typeof n.match_source=="string"?n.match_source:"";e.toolRenderData={formatted_response:n.formatted_response,chosen:n.chosen??{},chosen_index:o,match_source:s,selection_reasoning:typeof n.selection_reasoning=="string"?n.selection_reasoning:""},e.toolRenderSeq=t.seq}function Op(e,t){if(!t)return;if(t.stream==="compaction"){Fp(e,t);return}if(t.stream==="tool_render"){Np(e,t);return}if(t.stream!=="tool")return;const n=typeof t.sessionKey=="string"?t.sessionKey:void 0;if(n&&n!==e.sessionKey||!n&&e.chatRunId&&t.runId!==e.chatRunId||e.chatRunId&&t.runId!==e.chatRunId||!e.chatRunId)return;const i=t.data??{},o=typeof i.toolCallId=="string"?i.toolCallId:"";if(!o)return;const s=typeof i.name=="string"?i.name:"tool",r=typeof i.phase=="string"?i.phase:"",a=r==="start"?i.args:void 0,l=r==="update"?wr(i.partialResult):r==="result"?wr(i.result):void 0,c=Date.now();let p=e.toolStreamById.get(o);p?(p.name=s,a!==void 0&&(p.args=a),l!==void 0&&(p.output=l||void 0),p.updatedAt=c):(p={toolCallId:o,runId:t.runId,sessionKey:n,name:s,args:a,output:l||void 0,startedAt:typeof t.ts=="number"?t.ts:c,updatedAt:c,message:{}},e.toolStreamById.set(o,p),e.toolStreamOrder.push(o)),p.message=Lp(p),Ip(e),Dp(e,r==="result")}function Gi(e){return e==null?"":String(e).trim()}const Wi=new WeakMap,Qi=new WeakMap;function yo(e){const t=e,n=typeof t.role=="string"?t.role:"",i=t.content;if(typeof i=="string")return n==="assistant"?qi(i):Gi(i);if(Array.isArray(i)){const o=i.map(s=>{const r=s;return r.type==="text"&&typeof r.text=="string"?r.text:null}).filter(s=>typeof s=="string");if(o.length>0){const s=o.join(`
`);return n==="assistant"?qi(s):Gi(s)}}return typeof t.text=="string"?n==="assistant"?qi(t.text):Gi(t.text):null}function ds(e){if(!e||typeof e!="object")return yo(e);const t=e;if(Wi.has(t))return Wi.get(t)??null;const n=yo(e);return Wi.set(t,n),n}function $r(e){const n=e.content,i=[];if(Array.isArray(n))for(const a of n){const l=a;if(l.type==="thinking"&&typeof l.thinking=="string"){const c=l.thinking.trim();c&&i.push(c)}}if(i.length>0)return i.join(`
`);const o=Up(e);if(!o)return null;const r=[...o.matchAll(/<\s*think(?:ing)?\s*>([\s\S]*?)<\s*\/\s*think(?:ing)?\s*>/gi)].map(a=>(a[1]??"").trim()).filter(Boolean);return r.length>0?r.join(`
`):null}function Bp(e){if(!e||typeof e!="object")return $r(e);const t=e;if(Qi.has(t))return Qi.get(t)??null;const n=$r(e);return Qi.set(t,n),n}function Up(e){const t=e,n=t.content;if(typeof n=="string")return n;if(Array.isArray(n)){const i=n.map(o=>{const s=o;return s.type==="text"&&typeof s.text=="string"?s.text:null}).filter(o=>typeof o=="string");if(i.length>0)return i.join(`
`)}return typeof t.text=="string"?t.text:null}function qp(e){const t=e.trim();if(!t)return"";const n=t.split(/\r?\n/).map(i=>i.trim()).filter(Boolean).map(i=>`_${i}_`);return n.length?["_Reasoning:_",...n].join(`
`):""}let xr=!1;function kr(e){e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t="";for(let n=0;n<e.length;n++)t+=e[n].toString(16).padStart(2,"0");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}function zp(){const e=new Uint8Array(16),t=Date.now();for(let n=0;n<e.length;n++)e[n]=Math.floor(Math.random()*256);return e[0]^=t&255,e[1]^=t>>>8&255,e[2]^=t>>>16&255,e[3]^=t>>>24&255,e}function Kp(){xr||(xr=!0,console.warn("[uuid] crypto API missing; falling back to weak randomness"))}function us(e=globalThis.crypto){if(e&&typeof e.randomUUID=="function")return e.randomUUID();if(e&&typeof e.getRandomValues=="function"){const t=new Uint8Array(16);return e.getRandomValues(t),kr(t)}return Kp(),kr(zp())}async function Kt(e){if(!(!e.client||!e.connected)){e.chatLoading=!0,e.lastError=null;try{const t=await e.client.request("chat.history",{sessionKey:e.sessionKey,limit:200}),n=Array.isArray(t.messages)?t.messages:[];(n.length>0||e.chatMessages.length===0)&&(e.chatMessages=n),e.chatThinkingLevel=t.thinkingLevel??null}catch(t){e.lastError=String(t)}finally{e.chatLoading=!1}}}function Hp(e){const t=/^data:([^;]+);base64,(.+)$/.exec(e);return t?{mimeType:t[1],content:t[2]}:null}function jp(e){if(!e||typeof e!="object")return null;const t=e;return t.role!=="assistant"||!("content"in t)||!Array.isArray(t.content)?null:t}async function Gp(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",i=n?`${n}/api/quotation/upload`:"/api/quotation/upload",o=new FormData;o.append("file",t);try{const s=await fetch(i,{method:"POST",body:o,credentials:"same-origin"});if(!s.ok){const l=await s.text();throw new Error(l||`Upload failed: ${s.status}`)}const r=await s.json(),a=(r==null?void 0:r.data)??r;return!a||typeof a.file_path!="string"?null:{file_id:a.file_id??"",file_path:a.file_path,file_name:a.file_name??t.name,summaryMeta:a.summary_meta}}catch(s){throw console.error("uploadChatFile",s),s}}async function Wp(e,t,n,i){if(!e.client||!e.connected)return null;const o=t.trim(),s=n&&n.length>0,r=!!(i!=null&&i.file_name);if(!o&&!s&&!r)return null;const a=Date.now(),l=[];if(o&&l.push({type:"text",text:o}),s)for(const g of n)l.push({type:"image",source:{type:"base64",media_type:g.mimeType,data:g.dataUrl}});i!=null&&i.file_name&&l.push({type:"file",file_name:i.file_name,file_path:i.file_path,summaryMeta:i.summaryMeta}),e.chatMessages=[...e.chatMessages,{role:"user",content:l,timestamp:a}],e.chatSending=!0,e.lastError=null;const c=us();e.chatRunId=c,e.chatStream="",e.chatStreamStartedAt=a;const p=s?n.map(g=>{const b=Hp(g.dataUrl);return b?{type:"image",mimeType:b.mimeType,content:b.content}:null}).filter(g=>g!==null):void 0,f=i&&i.file_path?{file_path:i.file_path,...i.file_id?{file_id:i.file_id}:{}}:void 0;try{return await e.client.request("chat.send",{sessionKey:e.sessionKey,message:o,deliver:!1,idempotencyKey:c,attachments:p,...f?{context:f,file_path:i.file_path}:{}}),e.chatUploadedFile=null,c}catch(g){const b=String(g);return e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,e.lastError=b,e.chatMessages=[...e.chatMessages,{role:"assistant",content:[{type:"text",text:"Error: "+b}],timestamp:Date.now()}],null}finally{e.chatSending=!1}}async function Qp(e){if(!e.client||!e.connected)return!1;const t=e.chatRunId;try{return await e.client.request("chat.abort",t?{sessionKey:e.sessionKey,runId:t}:{sessionKey:e.sessionKey}),!0}catch(n){return e.lastError=String(n),!1}}function Vp(e,t){if(!t||t.sessionKey!==e.sessionKey)return null;if(t.runId&&e.chatRunId&&t.runId!==e.chatRunId)return t.state==="final"?"foreign_final":null;if(t.state==="delta"){const n=yo(t.message);if(typeof n=="string"){const i=e.chatStream??"";(!i||n.length>=i.length)&&(e.chatStream=n)}}else if(t.state==="final")e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null;else if(t.state==="aborted"){const n=jp(t.message);if(n)e.chatMessages=[...e.chatMessages,n];else{const i=e.chatStream??"";i.trim()&&(e.chatMessages=[...e.chatMessages,{role:"assistant",content:[{type:"text",text:i}],timestamp:Date.now()}])}e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null}else t.state==="error"&&(e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null,e.lastError=t.errorMessage??"chat error");return t.state}const Sl=120;function _l(e){return e.chatSending||!!e.chatRunId}function Xp(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/stop"?!0:n==="stop"||n==="esc"||n==="abort"||n==="wait"||n==="exit"}function Jp(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/new"||n==="/reset"?!0:n.startsWith("/new ")||n.startsWith("/reset ")}async function Al(e){e.connected&&(e.chatMessage="",await Qp(e))}function Yp(e,t,n,i){const o=t.trim(),s=!!(n&&n.length>0);!o&&!s||(e.chatQueue=[...e.chatQueue,{id:us(),text:o,createdAt:Date.now(),attachments:s?n==null?void 0:n.map(r=>({...r})):void 0,refreshSessions:i}])}async function Cl(e,t,n){var s,r;$i(e);const i=await Wp(e,t,n==null?void 0:n.attachments,e.chatUploadedFile??void 0),o=!!i;return!o&&(n==null?void 0:n.previousDraft)!=null&&(e.chatMessage=n.previousDraft),!o&&(n!=null&&n.previousAttachments)&&(e.chatAttachments=n.previousAttachments),o&&bl(e,e.sessionKey),o&&(n!=null&&n.restoreDraft)&&((s=n.previousDraft)!=null&&s.trim())&&(e.chatMessage=n.previousDraft),o&&(n!=null&&n.restoreAttachments)&&((r=n.previousAttachments)!=null&&r.length)&&(e.chatAttachments=n.previousAttachments),$n(e),o&&!e.chatRunId&&Tl(e),o&&(n!=null&&n.refreshSessions)&&i&&e.refreshSessionsAfterChat.add(i),o}async function Tl(e){if(!e.connected||_l(e))return;const[t,...n]=e.chatQueue;if(!t)return;e.chatQueue=n,await Cl(e,t.text,{attachments:t.attachments,refreshSessions:t.refreshSessions})||(e.chatQueue=[t,...e.chatQueue])}function Zp(e,t){e.chatQueue=e.chatQueue.filter(n=>n.id!==t)}async function ef(e,t,n){var p;if(!e.connected)return;const i=e.chatMessage,o=(t??e.chatMessage).trim(),s=e.chatAttachments??[],r=t==null?s:[],a=r.length>0,l=!!((p=e.chatUploadedFile)!=null&&p.file_name);if(!o&&!a&&!l)return;if(Xp(o)){await Al(e);return}const c=Jp(o);if(t==null&&(e.chatMessage="",e.chatAttachments=[]),_l(e)){Yp(e,o,r,c);return}await Cl(e,o,{previousDraft:t==null?i:void 0,restoreDraft:!!(t&&(n!=null&&n.restoreDraft)),attachments:a?r:void 0,previousAttachments:t==null?s:void 0,restoreAttachments:!!(t&&(n!=null&&n.restoreDraft)),refreshSessions:c})}async function El(e,t){await Promise.all([Kt(e),rs(e,{activeMinutes:Sl}),bo(e)]),(t==null?void 0:t.scheduleScroll)!==!1&&$n(e)}const tf=Tl;function nf(e){var o,s,r;const t=Ua(e.sessionKey);if(t!=null&&t.agentId)return t.agentId;const n=(o=e.hello)==null?void 0:o.snapshot;return((r=(s=n==null?void 0:n.sessionDefaults)==null?void 0:s.defaultAgentId)==null?void 0:r.trim())||"main"}function of(e,t){const n=jt(e),i=encodeURIComponent(t);return n?`${n}/avatar/${i}?meta=1`:`/avatar/${i}?meta=1`}async function bo(e){if(!e.connected){e.chatAvatarUrl=null;return}const t=nf(e);if(!t){e.chatAvatarUrl=null;return}e.chatAvatarUrl=null;const n=of(e.basePath,t);try{const i=await fetch(n,{method:"GET"});if(!i.ok){e.chatAvatarUrl=null;return}const o=await i.json(),s=typeof o.avatarUrl=="string"?o.avatarUrl.trim():"";e.chatAvatarUrl=s||null}catch{e.chatAvatarUrl=null}}const sf={trace:!0,debug:!0,info:!0,warn:!0,error:!0,fatal:!0},rf={name:"",description:"",agentId:"",enabled:!0,scheduleKind:"every",scheduleAt:"",everyAmount:"30",everyUnit:"minutes",cronExpr:"0 7 * * *",cronTz:"",sessionTarget:"isolated",wakeMode:"now",payloadKind:"agentTurn",payloadText:"",deliveryMode:"announce",deliveryChannel:"last",deliveryTo:"",timeoutSeconds:""},af=50,lf=200,cf="PT Vansting Agent";function Sr(e,t){if(typeof e!="string")return;const n=e.trim();if(n)return n.length<=t?n:n.slice(0,t)}function ps(e){const t=Sr(e==null?void 0:e.name,af)??cf,n=Sr((e==null?void 0:e.avatar)??void 0,lf)??null;return{agentId:typeof(e==null?void 0:e.agentId)=="string"&&e.agentId.trim()?e.agentId.trim():null,name:t,avatar:n}}async function Rl(e,t){if(!e.client||!e.connected)return;const n=e.sessionKey.trim(),i=n?{sessionKey:n}:{};try{const o=await e.client.request("agent.identity.get",i);if(!o)return;const s=ps(o);e.assistantName=s.name,e.assistantAvatar=s.avatar,e.assistantAgentId=s.agentId??null}catch{}}function wo(e){return typeof e=="object"&&e!==null}function df(e){if(!wo(e))return null;const t=typeof e.id=="string"?e.id.trim():"",n=e.request;if(!t||!wo(n))return null;const i=typeof n.command=="string"?n.command.trim():"";if(!i)return null;const o=typeof e.createdAtMs=="number"?e.createdAtMs:0,s=typeof e.expiresAtMs=="number"?e.expiresAtMs:0;return!o||!s?null:{id:t,request:{command:i,cwd:typeof n.cwd=="string"?n.cwd:null,host:typeof n.host=="string"?n.host:null,security:typeof n.security=="string"?n.security:null,ask:typeof n.ask=="string"?n.ask:null,agentId:typeof n.agentId=="string"?n.agentId:null,resolvedPath:typeof n.resolvedPath=="string"?n.resolvedPath:null,sessionKey:typeof n.sessionKey=="string"?n.sessionKey:null},createdAtMs:o,expiresAtMs:s}}function uf(e){if(!wo(e))return null;const t=typeof e.id=="string"?e.id.trim():"";return t?{id:t,decision:typeof e.decision=="string"?e.decision:null,resolvedBy:typeof e.resolvedBy=="string"?e.resolvedBy:null,ts:typeof e.ts=="number"?e.ts:null}:null}function Ll(e){const t=Date.now();return e.filter(n=>n.expiresAtMs>t)}function pf(e,t){const n=Ll(e).filter(i=>i.id!==t.id);return n.push(t),n}function _r(e,t){return Ll(e).filter(n=>n.id!==t)}function ff(e){return{}}const Ar={WEBCHAT:"webchat"},Cr={CONTROL_UI:"control-ui"},gf=4008;class hf{constructor(t){this.opts=t,this.ws=null,this.pending=new Map,this.closed=!1,this.lastSeq=null,this.connectNonce=null,this.connectSent=!1,this.connectTimer=null,this.backoffMs=800}start(){this.closed=!1,this.connect()}stop(){var t;this.closed=!0,(t=this.ws)==null||t.close(),this.ws=null,this.flushPending(new Error("gateway client stopped"))}get connected(){var t;return((t=this.ws)==null?void 0:t.readyState)===WebSocket.OPEN}connect(){this.closed||(this.ws=new WebSocket(this.opts.url),this.ws.addEventListener("open",()=>this.queueConnect()),this.ws.addEventListener("message",t=>this.handleMessage(String(t.data??""))),this.ws.addEventListener("close",t=>{var i,o;const n=String(t.reason??"");this.ws=null,this.flushPending(new Error(`gateway closed (${t.code}): ${n}`)),(o=(i=this.opts).onClose)==null||o.call(i,{code:t.code,reason:n}),this.scheduleReconnect()}),this.ws.addEventListener("error",()=>{}))}scheduleReconnect(){if(this.closed)return;const t=this.backoffMs;this.backoffMs=Math.min(this.backoffMs*1.7,15e3),window.setTimeout(()=>this.connect(),t)}flushPending(t){for(const[,n]of this.pending)n.reject(t);this.pending.clear()}async sendConnect(){var p;if(this.connectSent)return;this.connectSent=!0,this.connectTimer!==null&&(window.clearTimeout(this.connectTimer),this.connectTimer=null);const t=typeof crypto<"u"&&!!crypto.subtle,n=["operator.admin","operator.approvals","operator.pairing"],i="operator";let o=null,s=!1,r=this.opts.token;if(t){o=await os();const f=(p=fu({deviceId:o.deviceId,role:i}))==null?void 0:p.token;r=f??this.opts.token,s=!!(f&&this.opts.token)}const a=r||this.opts.password?{token:r,password:this.opts.password}:void 0;let l;if(t&&o){const f=Date.now(),g=this.connectNonce??void 0,b=ff({deviceId:o.deviceId,clientId:this.opts.clientName??Cr.CONTROL_UI,clientMode:this.opts.mode??Ar.WEBCHAT}),$=await Ou(o.privateKey,b);l={id:o.deviceId,publicKey:o.publicKey,signature:$,signedAt:f,nonce:g}}const c={minProtocol:3,maxProtocol:3,client:{id:this.opts.clientName??Cr.CONTROL_UI,version:this.opts.clientVersion??"dev",platform:this.opts.platform??navigator.platform??"web",mode:this.opts.mode??Ar.WEBCHAT,instanceId:this.opts.instanceId},role:i,scopes:n,device:l,caps:[],auth:a,userAgent:navigator.userAgent,locale:navigator.language};this.request("connect",c).then(f=>{var g,b,$;(g=f==null?void 0:f.auth)!=null&&g.deviceToken&&o&&Ya({deviceId:o.deviceId,role:f.auth.role??i,token:f.auth.deviceToken,scopes:f.auth.scopes??[]}),this.backoffMs=800,($=(b=this.opts).onHello)==null||$.call(b,f)}).catch(()=>{var f;s&&o&&Za({deviceId:o.deviceId,role:i}),(f=this.ws)==null||f.close(gf,"connect failed")})}handleMessage(t){var o,s,r,a,l;let n;try{n=JSON.parse(t)}catch{return}const i=n;if(i.type==="event"){const c=n;if(c.event==="connect.challenge"){const f=c.payload,g=f&&typeof f.nonce=="string"?f.nonce:null;g&&(this.connectNonce=g,this.sendConnect());return}const p=typeof c.seq=="number"?c.seq:null;p!==null&&(this.lastSeq!==null&&p>this.lastSeq+1&&((s=(o=this.opts).onGap)==null||s.call(o,{expected:this.lastSeq+1,received:p})),this.lastSeq=p);try{(a=(r=this.opts).onEvent)==null||a.call(r,c)}catch(f){console.error("[gateway] event handler error:",f)}return}if(i.type==="res"){const c=n,p=this.pending.get(c.id);if(!p)return;this.pending.delete(c.id),c.ok?p.resolve(c.payload):p.reject(new Error(((l=c.error)==null?void 0:l.message)??"request failed"));return}}request(t,n){if(!this.ws||this.ws.readyState!==WebSocket.OPEN)return Promise.reject(new Error("gateway not connected"));const i=us(),o={type:"req",id:i,method:t,params:n},s=new Promise((r,a)=>{this.pending.set(i,{resolve:l=>r(l),reject:a})});return this.ws.send(JSON.stringify(o)),s}queueConnect(){this.connectNonce=null,this.connectSent=!1,this.connectTimer!==null&&window.clearTimeout(this.connectTimer),this.connectTimer=window.setTimeout(()=>{this.sendConnect()},750)}}function Vi(e,t){var a,l,c;const n=(e??"").trim(),i=(a=t.mainSessionKey)==null?void 0:a.trim();if(!i)return n;if(!n)return i;const o=((l=t.mainKey)==null?void 0:l.trim())||"main",s=(c=t.defaultAgentId)==null?void 0:c.trim();return n==="main"||n===o||s&&(n===`agent:${s}:main`||n===`agent:${s}:${o}`)?i:n}function mf(e,t){if(!(t!=null&&t.mainSessionKey))return;const n=Vi(e.sessionKey,t),i=Vi(e.settings.sessionKey,t),o=Vi(e.settings.lastActiveSessionKey,t),s=n||i||e.sessionKey,r={...e.settings,sessionKey:i||s,lastActiveSessionKey:o||s},a=r.sessionKey!==e.settings.sessionKey||r.lastActiveSessionKey!==e.settings.lastActiveSessionKey;s!==e.sessionKey&&(e.sessionKey=s),a&&at(e,r)}function Il(e){e.lastError=null,e.hello=null,e.connected=!1,e.execApprovalQueue=[],e.execApprovalError=null;const t=e.client,n=new hf({url:e.settings.gatewayUrl,token:e.settings.token.trim()?e.settings.token:void 0,password:e.password.trim()?e.password:void 0,clientName:"openclaw-control-ui",mode:"webchat",onHello:i=>{e.client===n&&(e.connected=!0,e.lastError=null,e.hello=i,bf(e,i),e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,$i(e),kl(e),Rl(e),Qo(e),gi(e,{quiet:!0}),dt(e,{quiet:!0}),ls(e))},onClose:({code:i,reason:o})=>{e.client===n&&(e.connected=!1,i!==1012&&(e.lastError=`disconnected (${i}): ${o||"no reason"}`))},onEvent:i=>{e.client===n&&vf(e,i)},onGap:({expected:i,received:o})=>{e.client===n&&(e.lastError=`event gap detected (expected seq ${i}, got ${o}); refresh recommended`)}});e.client=n,t==null||t.stop(),n.start()}function vf(e,t){try{yf(e,t)}catch(n){console.error("[gateway] handleGatewayEvent error:",t.event,n)}}function yf(e,t){if(e.eventLogBuffer=[{ts:Date.now(),event:t.event,payload:t.payload},...e.eventLogBuffer].slice(0,250),e.tab==="debug"&&(e.eventLog=e.eventLogBuffer),t.event==="agent"){if(e.onboarding)return;Op(e,t.payload);return}if(t.event==="chat"){const n=t.payload;n!=null&&n.sessionKey&&bl(e,n.sessionKey);const i=Vp(e,n);let o=!1;if(i==="final"||i==="error"||i==="aborted"){$i(e),tf(e);const s=n==null?void 0:n.runId;s&&e.refreshSessionsAfterChat.has(s)&&(e.refreshSessionsAfterChat.delete(s),i==="final"&&rs(e,{activeMinutes:Sl})),i==="final"&&(n!=null&&n.newSessionKey)&&(e.sessionKey=n.newSessionKey,e.chatMessage="",e.chatAttachments=[],e.chatUploadedFile=null,e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.chatQueue=[],e.chatMessages=[],e.lastError=null,e.chatThinkingLevel=null,e.compactionStatus=null,e.compactionClearTimer!=null&&(clearTimeout(e.compactionClearTimer),e.compactionClearTimer=null),e.resetToolStream(),e.resetToolRender(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:n.newSessionKey,lastActiveSessionKey:n.newSessionKey}),e.loadAssistantIdentity(),Kt(e),o=!0)}(i==="final"||i==="foreign_final")&&(o||Kt(e));return}if(t.event==="presence"){const n=t.payload;n!=null&&n.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence,e.presenceError=null,e.presenceStatus=null);return}if(t.event==="cron"&&e.tab==="cron"&&cs(e),(t.event==="device.pair.requested"||t.event==="device.pair.resolved")&&dt(e,{quiet:!0}),t.event==="exec.approval.requested"){const n=df(t.payload);if(n){e.execApprovalQueue=pf(e.execApprovalQueue,n),e.execApprovalError=null;const i=Math.max(0,n.expiresAtMs-Date.now()+500);window.setTimeout(()=>{e.execApprovalQueue=_r(e.execApprovalQueue,n.id)},i)}return}if(t.event==="exec.approval.resolved"){const n=uf(t.payload);n&&(e.execApprovalQueue=_r(e.execApprovalQueue,n.id))}}function bf(e,t){const n=t.snapshot;n!=null&&n.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence),n!=null&&n.health&&(e.debugHealth=n.health),n!=null&&n.sessionDefaults&&mf(e,n.sessionDefaults)}const Tr="/api/bootstrap";async function wf(e){if(typeof window>"u"||typeof fetch!="function")return;const t=jt(e.basePath??""),n=t?`${t}${Tr}`:Tr;try{const i=await fetch(n,{method:"GET",headers:{Accept:"application/json"},credentials:"same-origin"});if(!i.ok)return;const o=await i.json(),s=ps({agentId:o.assistantAgentId??null,name:o.assistantName,avatar:o.assistantAvatar??null});e.assistantName=s.name,e.assistantAvatar=s.avatar,e.assistantAgentId=s.agentId??null}catch{}}const $f="Untitled quotation",xf=24e4,kf=12e4,Pl=1,Dl=800,Er=new WeakMap,Sf={idle:["running"],running:["awaiting_choices","done","error","idle"],awaiting_choices:["resuming","running","error","idle"],resuming:["awaiting_choices","done","error","idle"],done:["running","idle","error"],error:["running","idle","resuming"]};class je extends Error{constructor(t){super(t),this.name="RetryableWorkError"}}class $o extends Error{constructor(t){super(t),this.name="RunIdInvalidError"}}function Sn(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}function Gt(e){let t=Er.get(e);return t||(t={controller:null,cancelRequested:!1,timeoutReached:!1},Er.set(e,t)),t}function oi(e,t){const n=e.workRunStatus;if(n===t)return;if(!(Sf[n]??[]).includes(t))throw new Error(`invalid work state transition: ${n} -> ${t}`);e.workRunStatus=t}function Ut(e,t){e.workRunStatus=t}function fs(e){e.workRunId=null,e.workPendingChoices=[],e.workSelections={}}function Ml(e){return(e||"").trim().replace(/\\/g,"/").toLowerCase()}function _f(e,t){const n=(t.file_path||"").trim();if(n){const i=e.workOriginalFileNamesByPath[Ml(n)];if(typeof i=="string"&&i.trim())return i.trim()}return _n(t)}function _n(e){var i,o;const t=(i=e==null?void 0:e.name)==null?void 0:i.trim();if(t)return t;const n=(o=e==null?void 0:e.file_path)==null?void 0:o.trim();if(n){const s=n.replace(/\\/g,"/").split("/").filter(Boolean).pop();if(s)return s}return $f}function Af(e){try{if(typeof e!="string"||!e.trim())return null;const t=e.trim();return t.startsWith("{")&&t.endsWith("}")||t.startsWith("[")&&t.endsWith("]")?JSON.parse(t):null}catch{return null}}function Rr(e){if(typeof e!="string")return!1;const t=e.trim().toLowerCase();return t?t==="__oos__"||t==="oos"||t==="无货":!1}function Cf(e){const t=Array.isArray(e.fill_items_merged)?e.fill_items_merged:[];if(!t.length)return null;const n=Array.isArray(e.items)?e.items:[],i=Array.isArray(e.shortage)?e.shortage:[],o=new Map;for(const r of n)o.set(r.row,r);const s=t.map((r,a)=>{const l=r.row,c=o.get(l)??{},p=Number(r.qty??0),f=r.unit_price,g=f==null?null:Number(f),b=g==null||Number.isNaN(g)?null:g*p,$=String(r.code??""),k=String(r.quote_name??"").trim();let S=0,R=0;for(const F of i)if(F.row===l){S=Number(F.available_qty??0),R=Number(F.shortfall??0);break}const I=Rr($)||k.includes("库存不足");return!I&&R===0&&S===0&&$&&!Rr($)&&(S=p),{row_index:a,row:typeof l=="number"?l:void 0,product_name:String(c.product_name??""),specification:String(r.specification??c.specification??""),qty:p,code:$,quote_name:k,quote_spec:String(r.quote_spec??""),unit_price:g,amount:b,available_qty:S,shortfall:R,is_shortage:I?1:0,match_source:null}});return{name:_n({name:typeof e.name=="string"?e.name:"",file_path:typeof e.file_path=="string"?e.file_path:null}),file_path:typeof e.file_path=="string"?e.file_path:null,source:"file",lines:s}}function Tf(e){if(!Array.isArray(e))return null;let t=null;for(const n of e){const i=n.type,o=n.content;if(i!=="observation"||typeof o!="string")continue;const s=Af(o);if(!s||typeof s!="object")continue;const r=s.pending_quotation_draft;if(r&&Array.isArray(r.lines)){t={...r,name:_n(r)};continue}const a=Cf(s);a&&(t=a)}return t}function Ef(e){const t=ee(e,"/api/work","pending_choices[]"),i=lt(t.options,"/api/work","pending_choices[].options").map(o=>{const s=ee(o,"/api/work","pending_choices[].options[]");return{code:ot(s.code,"/api/work","pending_choices[].options[].code"),matched_name:U(s.matched_name),unit_price:ve(s.unit_price),reasoning:U(s.reasoning)}});return{id:ot(t.id,"/api/work","pending_choices[].id"),row:ve(t.row),keywords:U(t.keywords),product_name:U(t.product_name),specification:U(t.specification),qty:ve(t.qty)??U(t.qty),options:i}}function Rf(e){const t=ee(e,"/api/work","pending_quotation_draft"),i=lt(t.lines,"/api/work","pending_quotation_draft.lines").map((o,s)=>{const r=ee(o,"/api/work","pending_quotation_draft.lines[]"),a=ve(r.qty)??Number(r.qty??0),l=r.unit_price==null?null:Number(r.unit_price);return{row_index:ve(r.row_index)??s,row:ve(r.row),product_name:U(r.product_name),specification:U(r.specification),qty:Number.isFinite(a)?a:0,code:U(r.code),quote_name:U(r.quote_name),quote_spec:U(r.quote_spec),unit_price:l==null||Number.isNaN(l)?null:l,amount:r.amount==null?null:Number(r.amount),available_qty:ve(r.available_qty)??Number(r.available_qty??0),shortfall:ve(r.shortfall)??Number(r.shortfall??0),is_shortage:ve(r.is_shortage)??(Xo(r.is_shortage)?1:0),match_source:U(r.match_source)??null}});return{name:_n({name:U(t.name)??"",file_path:U(t.file_path)??null}),file_path:U(t.file_path)??null,source:U(t.source)??"file",lines:i}}function xo(e,t){const n=ee(e,t),o=(U(n.status)??"done")==="awaiting_choices"?"awaiting_choices":"done",s={status:o,success:Xo(n.success)??!0,answer:U(n.answer)??"",trace:Array.isArray(n.trace)?n.trace:[],error:U(n.error)};if(n.pending_quotation_draft!=null&&(s.pending_quotation_draft=Rf(n.pending_quotation_draft)),o==="awaiting_choices"){s.run_id=ot(n.run_id,t,"run_id");const r=lt(n.pending_choices,t,"pending_choices");s.pending_choices=r.map(a=>Ef(a))}return s}function ko(e,t){if(e.workResult={success:t.success,answer:t.answer,trace:t.trace,error:t.error},e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null,t.status==="awaiting_choices"){oi(e,"awaiting_choices"),e.workRunId=t.run_id??null,e.workPendingChoices=t.pending_choices??[];const n={};for(const i of e.workPendingChoices)n[i.id]="__OOS__";e.workSelections=n;return}if(fs(e),t.pending_quotation_draft&&Array.isArray(t.pending_quotation_draft.lines))e.workPendingQuotationDraft={...t.pending_quotation_draft,name:_n(t.pending_quotation_draft)};else{const n=Tf(t.trace);n&&(e.workPendingQuotationDraft=n)}t.success===!1||t.error&&t.error.trim()?(Ut(e,"error"),e.workError=oe("执行报价流程",t.error??"后端返回失败状态","本次报价流程未完成","点击“重试”重新运行，或检查后端日志")):oi(e,"done")}function Fl(e){return new Promise(t=>setTimeout(t,e))}function Nl(e){return e===408||e===429||e===500||e===502||e===503||e===504}function Ol(e,t){const n=Gt(e),i=new AbortController;n.controller=i,n.timeoutReached=!1;const o=setTimeout(()=>{n.timeoutReached=!0,i.abort("timeout")},t);return{signal:i.signal,close:()=>{clearTimeout(o),n.controller===i&&(n.controller=null)}}}function si(e){return e instanceof Error?e.name==="AbortError"||/aborted/i.test(e.message):!1}function Lf(e,t){Ut(e,"error"),fs(e),e.workResult={success:!1,error:t},e.workError=oe("执行报价流程",t,"流程被中断，未产出有效结果","点击“重试”再次执行")}function gs(e){Ut(e,"idle"),e.workError="已取消当前流程。",e.workResult=null}async function If(e,t){const n={file_paths:e.workFilePaths,customer_level:e.workCustomerLevel,do_register_oos:e.workDoRegisterOos},{signal:i,close:o}=Ol(e,xf);try{const s=await fetch(Sn(e.basePath,t),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n),credentials:"same-origin",signal:i});if(!s.ok||!s.body){const p=await s.json().catch(()=>({})),f=ye(p,`HTTP ${s.status}`);throw Nl(s.status)?new je(f):new Error(f)}const r=s.body.getReader(),a=new TextDecoder;let l="",c=!1;for(;;){const{done:p,value:f}=await r.read();if(p)break;l+=a.decode(f,{stream:!0});const g=l.split(`
`);l=g.pop()??"";for(const b of g){if(!b.startsWith("data: "))continue;const $=b.slice(6).trim();if(!$)continue;const k=ee(JSON.parse($),t,"stream_event"),S=ot(k.type,t,"stream_event.type");if(S==="stage"){const R=ve(k.stage)??Number(k.stage);if(!Number.isFinite(R))throw new ce(t,"stage must be a number");e.workProgressStage=R}else if(S==="result"){const R=xo(k.payload,t);ko(e,R),c=!0;break}}if(c)break}if(!c&&l.startsWith("data: ")){const p=l.slice(6).trim();if(p){const f=ee(JSON.parse(p),t,"stream_event_tail");if(f.type==="result"){const g=xo(f.payload,t);ko(e,g),c=!0}}}if(!c)throw new ce(t,"stream ended without result event")}catch(s){const r=Gt(e);throw r.cancelRequested?new Error("__WORK_CANCELLED__"):si(s)&&r.timeoutReached?new je("请求超时"):si(s)?new Error("请求已中断"):s instanceof ce||s instanceof je?s:s instanceof Error&&/network|failed to fetch|load failed/i.test(s.message)?new je(s.message):s}finally{o()}}function Pf(e,t){if(e===404||e===410)return!0;const n=ye(t,"").toLowerCase();return n.includes("run_id")||n.includes("run id")}async function Df(e,t,n){const i="/api/work/resume",{signal:o,close:s}=Ol(e,kf);try{const r=await fetch(Sn(e.basePath,i),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({run_id:t,selections:n}),credentials:"same-origin",signal:o}),a=await r.json().catch(()=>({}));if(!r.ok){if(Pf(r.status,a))throw new $o(ye(a,"run_id 已失效"));const c=ye(a,`HTTP ${r.status}`);throw Nl(r.status)?new je(c):new Error(c)}const l=xo(a,i);ko(e,l)}catch(r){const a=Gt(e);throw a.cancelRequested?new Error("__WORK_CANCELLED__"):r instanceof $o?r:si(r)&&a.timeoutReached?new je("请求超时"):si(r)?new Error("请求已中断"):r instanceof ce||r instanceof je?r:r instanceof Error&&/network|failed to fetch|load failed/i.test(r.message)?new je(r.message):r}finally{s()}}function Mf(e){var n;const t=Gt(e);t.cancelRequested=!0,(n=t.controller)==null||n.abort("user_cancel"),gs(e),e.workRunning=!1}async function Bl(e){if(!e.workFilePaths.length){e.workError="请先上传至少一个报价单文件";return}const t=Gt(e);t.cancelRequested=!1,e.workRunning=!0,e.workError=null,e.workResult=null,e.workRunId=null,e.workPendingChoices=[],e.workSelections={},e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null,oi(e,"running");let n=0;try{for(;;){n+=1;try{await If(e,"/api/work/run-stream");break}catch(i){if(i instanceof Error&&i.message==="__WORK_CANCELLED__"){gs(e);break}if(i instanceof je&&n<=Pl){await Fl(Dl*n);continue}const o=i instanceof ce||i instanceof Error?i.message:String(i);Lf(e,o);break}}}finally{e.workRunning=!1}}async function Ul(e){const t=e.workRunId;if(!t||e.workPendingChoices.length===0){e.workError="缺少可继续的 run_id，请重新执行。",Ut(e,"error");return}const n=e.workPendingChoices.map(s=>({item_id:s.id,selected_code:e.workSelections[s.id]??"__OOS__"})),i=Gt(e);i.cancelRequested=!1,e.workRunning=!0,e.workError=null,oi(e,"resuming");let o=0;try{for(;;){o+=1;try{await Df(e,t,n);break}catch(s){if(s instanceof Error&&s.message==="__WORK_CANCELLED__"){gs(e);break}if(s instanceof $o){fs(e),e.workResult={success:!1,error:s.message},e.workError=oe("继续流程",s.message,"当前待选项无法继续提交","请重新执行一次 Work 流程"),Ut(e,"error");break}if(s instanceof je&&o<=Pl){await Fl(Dl*o);continue}const r=s instanceof ce||s instanceof Error?s.message:String(s);e.workResult={success:!1,error:r},e.workError=oe("继续流程",r,"本次续跑失败，尚未生成完整结果","点击“重试”继续，或重新执行 Work"),Ut(e,"error");break}}}finally{e.workRunning=!1}}async function Ff(e){if(e.workRunId&&e.workPendingChoices.length>0){await Ul(e);return}await Bl(e)}async function Nf(e){const t=(e.workTextInput||"").trim();if(!t)return e.workTextError="请输入产品描述文字",!1;e.workTextGenerating=!0,e.workTextError=null;try{const n=await fetch(Sn(e.basePath,"/api/quotation/from-text"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t}),credentials:"same-origin"}),i=await n.json().catch(()=>({}));if(!n.ok){let a=typeof i.detail=="string"?i.detail:ye(i,`HTTP ${n.status}`);return n.status===405&&(a="Method Not Allowed：该接口需 POST。请确认使用 python start.py 或 run_backend.py 启动前后端一体服务，且未通过仅支持 GET 的静态托管访问页面。"),e.workTextError=a,!1}const o=i&&typeof i.data=="object"?i.data:i,s=[],r={};if(Array.isArray(o.file_paths)){const a=Array.isArray(o.file_names)?o.file_names:[];o.file_paths.forEach((l,c)=>{if(typeof l!="string"||!l.trim())return;const p=l.trim();s.push(p);const f=typeof a[c]=="string"?a[c]:"";r[p]=f||p.split(/[/\\]/).pop()||p})}if(typeof o.file_path=="string"&&o.file_path.trim()){const a=o.file_path.trim();s.includes(a)||s.push(a);const l=typeof o.file_name=="string"?o.file_name:"";r[a]=l||a.split(/[/\\]/).pop()||a}if(!s.length)return e.workTextError="接口未返回 file_path/file_paths",!1;for(const a of s){e.workFilePaths.includes(a)||(e.workFilePaths=[...e.workFilePaths,a]);const l=Ml(a);if(l){const c=(r[a]||"").trim()||a.split(/[/\\]/).pop()||a;e.workOriginalFileNamesByPath={...e.workOriginalFileNamesByPath,[l]:c}}}return e.workTextError=null,!0}catch(n){const i=n instanceof Error?n.message:String(n);return e.workTextError=oe("从文字生成报价单",i,"未生成文件","请检查网络或后端后重试"),!1}finally{e.workTextGenerating=!1}}async function Of(e){try{const t=Sn(e.basePath,"/api/config/price-levels"),n=await fetch(t);if(!n.ok)throw new Error(`HTTP ${n.status}`);const i=await n.json();i.success&&Array.isArray(i.data)&&(e.workPriceLevelOptions=i.data)}catch(t){console.warn("[work] 加载价格档位失败，使用本地默认值",t)}}async function Bf(e){var n;const t=e.workPendingQuotationDraft;if(!((n=t==null?void 0:t.lines)!=null&&n.length))return e.workQuotationDraftSaveStatus={status:"error",error:"无报价明细可保存"},!1;e.workQuotationDraftSaveStatus={status:"saving"};try{const i=await fetch(Sn(e.basePath,"/api/quotation-drafts"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:_f(e,t),source:t.source||"file",file_path:t.file_path??void 0,lines:t.lines.map(f=>({product_name:f.product_name??"",specification:f.specification??"",qty:Number(f.qty)||0,code:f.code??"",quote_name:f.quote_name??"",quote_spec:f.quote_spec??"",unit_price:f.unit_price!=null?Number(f.unit_price):null,amount:f.amount!=null?Number(f.amount):null,available_qty:Number(f.available_qty)||0,shortfall:Number(f.shortfall)||0,is_shortage:f.is_shortage?1:0,match_source:f.match_source??null}))}),credentials:"same-origin"}),o=await i.json().catch(()=>({}));if(!i.ok)return e.workQuotationDraftSaveStatus={status:"error",error:oe("保存报价单",ye(o,`HTTP ${i.status}`),"报价单仍停留在待保存状态","点击“重试”再次保存")},!1;const s=ee(o,"/api/quotation-drafts"),r=Xo(s.success),a=ee(s.data,"/api/quotation-drafts","data"),l=ot(a.draft_no,"/api/quotation-drafts","data.draft_no"),c=ve(a.draft_id)??Number(a.draft_id),p=Number.isFinite(c)?c:0;if(r===!1)throw new ce("/api/quotation-drafts","success is false");return e.workQuotationDraftSaveStatus={status:"ok",draft_no:l,draft_id:p},e.workPendingQuotationDraft=null,!0}catch(i){const o=i instanceof ce||i instanceof Error?i.message:String(i);return e.workQuotationDraftSaveStatus={status:"error",error:oe("保存报价单",o,"报价单仍停留在待保存状态","检查数据后重试")},!1}}function Uf(e){e.basePath=yp(),wf(e),Of(e),hp(e),xp(e,!0),bp(e),wp(e),window.addEventListener("popstate",e.popStateHandler),Il(e),qd(e),e.tab==="logs"&&Ho(e),e.tab==="debug"&&Go(e)}function qf(e){Dd(e)}function zf(e){var t;window.removeEventListener("popstate",e.popStateHandler),zd(e),jo(e),Wo(e),$p(e),(t=e.topbarObserver)==null||t.disconnect(),e.topbarObserver=null}function Kf(e,t){if(!(e.tab==="chat"&&e.chatManualRefreshInFlight)){if(e.tab==="chat"&&(t.has("chatMessages")||t.has("chatToolMessages")||t.has("chatStream")||t.has("chatLoading")||t.has("tab"))){const n=t.has("tab"),i=t.has("chatLoading")&&t.get("chatLoading")===!0&&!e.chatLoading;$n(e,n||i||!e.chatHasAutoScrolled)}e.tab==="logs"&&(t.has("logsEntries")||t.has("logsAutoFollow")||t.has("tab"))&&e.logsAutoFollow&&e.logsAtBottom&&qa(e,t.has("tab")||t.has("logsAutoFollow"))}}const Hf=[{value:"FACTORY_INC_TAX",labelKey:"work.priceLevels.FACTORY_INC_TAX"},{value:"FACTORY_EXC_TAX",labelKey:"work.priceLevels.FACTORY_EXC_TAX"},{value:"PURCHASE_EXC_TAX",labelKey:"work.priceLevels.PURCHASE_EXC_TAX"},{value:"A_MARGIN",labelKey:"work.priceLevels.A_MARGIN"},{value:"A_QUOTE",labelKey:"work.priceLevels.A_QUOTE"},{value:"B_MARGIN",labelKey:"work.priceLevels.B_MARGIN"},{value:"B_QUOTE",labelKey:"work.priceLevels.B_QUOTE"},{value:"C_MARGIN",labelKey:"work.priceLevels.C_MARGIN"},{value:"C_QUOTE",labelKey:"work.priceLevels.C_QUOTE"},{value:"D_MARGIN",labelKey:"work.priceLevels.D_MARGIN"},{value:"D_QUOTE",labelKey:"work.priceLevels.D_QUOTE"},{value:"D_LOW",labelKey:"work.priceLevels.D_LOW"},{value:"E_MARGIN",labelKey:"work.priceLevels.E_MARGIN"},{value:"E_QUOTE",labelKey:"work.priceLevels.E_QUOTE"}];function Lr(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}function Ir(e){try{if(typeof e!="string"||!e.trim())return null;const t=e.trim();return t.startsWith("{")&&t.endsWith("}")||t.startsWith("[")&&t.endsWith("]")?JSON.parse(t):null}catch{return null}}function Pr(e){if(!Array.isArray(e))return[];const t=[],n=i=>{if(typeof i!="string"||!i.trim())return;const o=i.replace(/\\/g,"/").split("/").filter(Boolean).pop()??"";o&&!t.includes(o)&&t.push(o)};for(const i of e){const o=i,s=o.type,r=o.content;if(s==="observation"&&typeof r=="string"){const a=Ir(r);if(a&&typeof a=="object"){n(a.output_path??a.filled_path);const c=a.result,p=typeof c=="string"?Ir(c):c&&typeof c=="object"?c:null;p&&typeof p=="object"&&n(p.output_path??p.filled_path)}const l=r.match(/[A-Za-z]:[^\s"]+\.xlsx|\/[^\s"]+\.xlsx|[^\s"']+\.xlsx/);l&&l[0]&&n(l[0])}n(o.output_path??o.filled_path)}return t}function jf(e,t,n){return d`
    <li style="margin-bottom: 14px; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
      <div style="font-size: 13px; margin-bottom: 8px;">
        ${e.product_name??e.keywords??""}
        ${e.specification?d`<span class="muted"> 路 ${e.specification}</span>`:w}
        ${e.qty!=null?d`<span class="muted"> 路 ${u("work.qty")}: ${e.qty}</span>`:w}
      </div>
      <select
        .value=${t}
        @change=${i=>n(i.target.value)}
        aria-label=${u("work.choiceSelect")}
        style="width: 100%; max-width: 460px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border);"
      >
        <option value="__OOS__">${u("work.choiceOos")}</option>
        ${(e.options??[]).map(i=>d`<option value=${i.code}>${i.code}${i.matched_name?` 路 ${i.matched_name}`:""}${i.unit_price!=null?` 路 ${i.unit_price}`:""}</option>`)}
      </select>
    </li>
  `}function Gf(e){return(e||"").trim().replace(/\\/g,"/").toLowerCase()}function Wf(e){var et,te,Ie;const{basePath:t,workFilePaths:n,workOriginalFileNamesByPath:i,workRunning:o,workProgressStage:s,workRunStatus:r,workPendingChoices:a,workSelections:l,workResult:c,workError:p,workCustomerLevel:f,workDoRegisterOos:g,workPendingQuotationDraft:b,workQuotationDraftSaveStatus:$,workTextInput:k,workTextGenerating:S,workTextError:R,workPriceLevelOptions:I,onAddFile:F,onRemoveFile:A,onRenameFileName:C,onWorkTextChange:z,onGenerateFromText:y,onCustomerLevelChange:_,onDoRegisterOosChange:T,onRun:q,onCancel:P,onRetry:j,onSelectionChange:H,onResume:G,onQuotationLineChange:N,onQuotationDraftSave:ne,onQuotationDraftDismiss:be}=e,L=[u("work.stageExtract"),u("work.stageMatch"),u("work.stageFill")],Y=(()=>{switch(r){case"idle":return u("work.status.idle");case"running":return u("work.status.running");case"awaiting_choices":return u("work.status.awaitingChoices");case"resuming":return u("work.status.resuming");case"done":return u("work.status.done");case"error":default:return u("work.status.error")}})(),ge=B=>{const K=Lr(t,"/api/quotation/upload?with_summary=0"),Z=new FormData;Z.append("file",B),fetch(K,{method:"POST",body:Z,credentials:"same-origin"}).then(ie=>ie.json()).then(ie=>{if((ie==null?void 0:ie.success)===!1)return;const we=ie.data??ie;typeof we.file_path=="string"&&F(we.file_path,we.file_name??B.name)}).catch(ie=>{console.warn("[work] upload failed",ie)})},Q=B=>{var ie;const K=B.target,Z=(ie=K.files)==null?void 0:ie[0];Z&&(ge(Z),K.value="")},Ne=B=>{var Z;B.preventDefault();const K=(Z=B.dataTransfer)==null?void 0:Z.files;if(!(!K||!K.length))for(let ie=0;ie<K.length;ie+=1){const we=K.item(ie);we&&ge(we)}},ae=B=>{B.preventDefault(),B.dataTransfer&&(B.dataTransfer.dropEffect="copy")};return d`
    <section class="card" style="margin-bottom: 16px;" aria-label=${u("tabs.work")}>
      <div class="card-title" style="margin-bottom: 8px;">${u("tabs.work")}</div>
      <p class="muted" style="margin-bottom: 12px;">${u("subtitles.work")}</p>

      <div
        style="margin-bottom: 12px; padding: 10px; border-radius: 8px; border: 1px dashed var(--border); background: var(--bg-secondary, #fafafa);"
        @dragover=${ae}
        @dragenter=${ae}
        @drop=${Ne}
      >
        <label class="card-title" style="font-size: 13px;">${u("work.uploadTitle")}</label>
        <input
          type="file"
          accept=".xlsx,.xls,.xlsm"
          @change=${Q}
          style="margin-top: 6px;"
          aria-label=${u("work.uploadTitle")}
        />
        ${n.length?d`
              <ul style="margin-top: 8px; padding-left: 20px; font-size: 13px;">
                ${n.map((B,K)=>{const Z=Gf(B),ie=B.split(/[/\\]/).pop()??B,we=Z&&i[Z]||ie;return d`
                      <li style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                        <input
                          type="text"
                          .value=${we}
                          @change=${Cn=>C(B,Cn.target.value)}
                          style="flex: 1 1 auto; min-width: 0; padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border); font-size: 13px; word-break: break-all;"
                          aria-label=${u("work.fileDisplayName")}
                        />
                        <button
                          type="button"
                          class="btn btn-sm"
                          style="padding: 2px 8px;"
                          @click=${()=>A(K)}
                          aria-label=${u("work.removeFile")}
                        >
                          ${u("work.removeFile")}
                        </button>
                      </li>
                    `})}
              </ul>
            `:d`<p class="muted" style="margin-top: 6px;">${u("work.noFiles")}</p>`}
      </div>

      <div style="margin-bottom: 12px; padding: 10px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-secondary, #fafafa);">
        <label class="card-title" style="font-size: 13px;">${u("work.textInputTitle")}</label>
        <p class="muted" style="font-size: 12px; margin: 4px 0 8px 0;">${u("work.textInputHint")}</p>
        <textarea
          .value=${k}
          @input=${B=>z(B.target.value)}
          placeholder=${u("work.textInputPlaceholder")}
          rows="4"
          style="width: 100%; max-width: 560px; padding: 8px; border-radius: 6px; border: 1px solid var(--border); font-size: 13px; resize: vertical;"
          ?disabled=${S}
          aria-label=${u("work.textInputTitle")}
       ></textarea>
        <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px; flex-wrap: wrap;">
          <button
            type="button"
            class="btn"
            style="background: var(--accent); color: var(--bg);"
            ?disabled=${!k.trim()||S}
            @click=${y}
            aria-label=${u("work.generateFromText")}
          >
            ${u(S?"work.textGenerating":"work.generateFromText")}
          </button>
          ${R?d`<span style="color: var(--danger, #c00); font-size: 13px;" role="alert">${R}</span>`:w}
        </div>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 12px;">
        <div>
          <label style="font-size: 12px; color: var(--muted);">${u("work.customerLevel")}</label>
          ${(()=>{const B=I&&I.length>0?I:Hf.map(K=>({value:K.value,label:u(K.labelKey)}));return d`<select
              .value=${f}
              @change=${K=>_(K.target.value)}
              style="margin-left: 8px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 160px;"
              aria-label=${u("work.customerLevel")}
            >
              ${B.map(K=>d`<option value=${K.value}>${K.label}</option>`)}
            </select>`})()}
        </div>
        <label style="display: flex; align-items: center; gap: 6px; font-size: 13px;">
          <input
            type="checkbox"
            ?checked=${g}
            @change=${B=>T(B.target.checked)}
            aria-label=${u("work.registerOos")}
          />
          ${u("work.registerOos")}
        </label>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${o?d`
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                ${L.map((B,K)=>d`
                    <span
                      style="
                        padding: 6px 12px;
                        border-radius: 8px;
                        font-size: 13px;
                        background: ${s>=0&&K===s?"var(--accent)":"var(--bg-secondary, #eee)"};
                        color: ${s>=0&&K===s?"var(--bg)":"var(--muted)"};
                      "
                    >
                      ${K+1}. ${B}
                    </span>
                  `)}
              </div>
              <p class="muted" style="font-size: 12px; margin: 0;">
                ${u("work.currentStage")}: ${s>=0&&s<L.length?L[s]:u("work.running")}
              </p>
            `:w}

        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
          <button
            class="btn"
            style="background: var(--accent); color: var(--bg);"
            ?disabled=${n.length===0||o}
            @click=${q}
            aria-label=${u("work.run")}
          >
            ${u(o?"work.running":"work.run")}
          </button>
          ${o?d`<button class="btn btn-sm" @click=${P} aria-label=${u("work.cancel")}>${u("work.cancel")}</button>`:w}
          ${r==="error"?d`<button class="btn btn-sm" @click=${j} aria-label=${u("common.retry")}>${u("common.retry")}</button>`:w}
          ${n.length===0?d`<span class="muted" style="font-size: 12px;">${u("work.runHint")}</span>`:w}
          <span class="muted" style="font-size: 12px;">${u("work.statusLabel")}: ${Y}</span>
        </div>
      </div>

      ${p?d`
            <div style="margin-top: 12px; padding: 10px; border: 1px solid var(--danger, #e53935); border-radius: 8px;" role="alert" aria-live="assertive">
              <p style="margin: 0; color: var(--danger, #e53935); font-size: 13px;">${p}</p>
            </div>
          `:w}
    </section>

    ${r==="awaiting_choices"&&a.length?(()=>{const B=r;return d`
            <section class="card" style="margin-bottom: 16px;" aria-live="polite">
              <div class="card-title">${u("work.awaitingTitle")}</div>
              <p class="muted" style="margin-bottom: 12px;">${u("work.awaitingHint")}</p>
              <ul style="list-style: none; padding: 0; margin: 0;">
                ${a.map(K=>jf(K,l[K.id]??"__OOS__",Z=>H(K.id,Z)))}
              </ul>
              <div style="display: flex; gap: 8px; margin-top: 12px;">
                <button class="btn" style="background: var(--accent); color: var(--bg);" ?disabled=${o} @click=${G}>
                  ${u(o||B==="resuming"?"work.resuming":"work.resume")}
                </button>
                ${B==="error"?d`<button class="btn btn-sm" @click=${j}>${u("common.retry")}</button>`:w}
              </div>
            </section>
          `})():w}

    ${($==null?void 0:$.status)==="ok"?d`
          <section class="card" style="margin-bottom: 16px;" role="status" aria-live="polite">
            <p style="color: var(--success, #2e7d32); margin: 0 0 4px 0;">${u("work.savedDraftNo",{no:$.draft_no})}</p>
            <p class="muted" style="margin: 0 0 8px 0; font-size: 12px;">${u("work.saveSuccessHint")}</p>
            <button class="btn btn-sm" @click=${be}>${u("common.close")}</button>
          </section>
        `:(et=b==null?void 0:b.lines)!=null&&et.length?d`
            <section class="card" style="margin-bottom: 16px;">
              <div class="card-title">${u("work.pendingDraftTitle")}</div>
              <p class="muted" style="margin-bottom: 10px;">${u("work.pendingDraftHint")}</p>
              <div style="overflow-x: auto; margin-bottom: 12px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                  <thead>
                    <tr style="background: var(--bg-secondary, #eee);">
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">#</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("work.lineProduct")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("work.lineSpec")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("work.lineQty")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("work.lineCode")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("work.lineQuoteName")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("work.lineQuoteSpec")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("work.linePrice")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("work.lineAmount")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("work.lineAvailable")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("work.lineShortfall")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("work.lineIsShortage")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${b.lines.map((B,K)=>d`
                        <tr>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${K+1}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${B.product_name??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${B.specification??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="number" min="0" step="1" .value=${String(B.qty??"")} @change=${Z=>N(K,"qty",Z.target.value)} style="width: 72px;" aria-label=${u("work.lineQty")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="text" .value=${B.code??""} @change=${Z=>N(K,"code",Z.target.value)} style="width: 90px;" aria-label=${u("work.lineCode")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="text" .value=${B.quote_name??""} @change=${Z=>N(K,"quote_name",Z.target.value)} style="width: 120px;" aria-label=${u("work.lineQuoteName")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="text" .value=${B.quote_spec??""} @change=${Z=>N(K,"quote_spec",Z.target.value)} style="width: 120px;" aria-label=${u("work.lineQuoteSpec")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="number" min="0" step="0.01" .value=${B.unit_price!=null?String(B.unit_price):""} @change=${Z=>N(K,"unit_price",Z.target.value)} style="width: 90px;" aria-label=${u("work.linePrice")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${B.amount!=null?B.amount:""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${B.available_qty??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${B.shortfall??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${B.is_shortage?u("common.yes"):u("common.no")}</td>
                        </tr>
                      `)}
                  </tbody>
                </table>
              </div>

              ${($==null?void 0:$.status)==="error"?d`<p style="color: var(--danger, #c00); margin-bottom: 10px;">${$.error}</p>`:w}

              <div style="display: flex; gap: 8px;">
                <button class="btn" style="background: var(--accent); color: var(--bg);" ?disabled=${($==null?void 0:$.status)==="saving"} @click=${ne}>
                  ${($==null?void 0:$.status)==="saving"?u("work.saving"):u("work.saveDraft")}
                </button>
                <button class="btn btn-sm" ?disabled=${($==null?void 0:$.status)==="saving"} @click=${be}>
                  ${u("common.cancel")}
                </button>
              </div>
            </section>
          `:w}

    ${c&&!((te=b==null?void 0:b.lines)!=null&&te.length)?d`
          <section class="card">
            <div class="card-title">${u("work.resultTitle")}</div>
            ${Pr(c.trace).length?d`
                  <div style="margin-bottom: 12px;">
                    ${Pr(c.trace).map(B=>d`
                        <a href=${Lr(t,`/api/quotation/download?path=${encodeURIComponent(B)}`)} download=${B} class="btn btn-sm" style="margin-right: 8px; margin-bottom: 6px; text-decoration: none;">
                          ${u("work.download",{name:B})}
                        </a>
                      `)}
                  </div>
                `:w}

            ${c.answer?d`<div style="white-space: pre-wrap; margin-bottom: 12px;">${c.answer}</div>`:w}
            ${c.error?d`<p style="color: var(--danger, #e53935);">${c.error}</p>`:w}

            ${(Ie=c.trace)!=null&&Ie.length?d`
                  <details style="margin-top: 12px;">
                    <summary>${u("work.trace",{count:String(c.trace.length)})}</summary>
                    <pre style="max-height: 420px; overflow: auto; margin-top: 8px; font-size: 11px; white-space: pre-wrap;">${JSON.stringify(c.trace,null,2)}</pre>
                  </details>
                `:w}
          </section>
        `:w}
  `}function Bn(e){return(e||"").trim().replace(/\\/g,"/").toLowerCase()}function Qf(e){return e.tab!=="work"?w:Wf({basePath:e.basePath,workFilePaths:e.workFilePaths,workRunning:e.workRunning,workProgressStage:e.workProgressStage,workRunStatus:e.workRunStatus,workRunId:e.workRunId,workPendingChoices:e.workPendingChoices,workSelections:e.workSelections,workResult:e.workResult,workError:e.workError,workCustomerLevel:e.workCustomerLevel,workDoRegisterOos:e.workDoRegisterOos,workOriginalFileNamesByPath:e.workOriginalFileNamesByPath,workPendingQuotationDraft:e.workPendingQuotationDraft,workQuotationDraftSaveStatus:e.workQuotationDraftSaveStatus,workTextInput:e.workTextInput,workTextGenerating:e.workTextGenerating,workTextError:e.workTextError,workPriceLevelOptions:e.workPriceLevelOptions,onWorkTextChange:t=>{e.workTextInput=t},onGenerateFromText:()=>{Nf(e)},onAddFile:(t,n)=>{e.workFilePaths.includes(t)||(e.workFilePaths=[...e.workFilePaths,t]);const i=Bn(t);i&&(e.workOriginalFileNamesByPath={...e.workOriginalFileNamesByPath,[i]:(n||"").trim()||t.split(/[/\\]/).pop()||t})},onRenameFileName:(t,n)=>{const i=Bn(t);if(!i)return;const o=(n||"").trim(),s=t.split(/[/\\]/).pop()||t;e.workOriginalFileNamesByPath={...e.workOriginalFileNamesByPath,[i]:o||s};const r=e.workPendingQuotationDraft;r&&r.file_path&&Bn(r.file_path)===i&&(e.workPendingQuotationDraft={...r,name:o||s})},onRemoveFile:t=>{const n=e.workFilePaths[t]??"";e.workFilePaths=e.workFilePaths.filter((o,s)=>s!==t);const i=Bn(n);if(i&&e.workOriginalFileNamesByPath[i]!==void 0){const o={...e.workOriginalFileNamesByPath};delete o[i],e.workOriginalFileNamesByPath=o}},onCustomerLevelChange:t=>{e.workCustomerLevel=t},onDoRegisterOosChange:t=>{e.workDoRegisterOos=t},onRun:()=>void Bl(e),onCancel:()=>Mf(e),onRetry:()=>void Ff(e),onSelectionChange:(t,n)=>{e.workSelections={...e.workSelections,[t]:n}},onResume:()=>void Ul(e),onQuotationLineChange:(t,n,i)=>{var a;const o=e.workPendingQuotationDraft;if(!((a=o==null?void 0:o.lines)!=null&&a.length)||t<0||t>=o.lines.length)return;const s=o.lines.slice(),r={...s[t]};if(n==="qty"){const l=Number(i);r.qty=Number.isFinite(l)?l:0}else if(n==="unit_price"){const l=String(i??"").trim();if(!l)r.unit_price=null;else{const c=Number(l);r.unit_price=Number.isFinite(c)?c:null}}else r[n]=i;if(n==="qty"||n==="unit_price"){const l=Number(r.qty??0),c=r.unit_price==null?NaN:Number(r.unit_price);r.amount=Number.isFinite(l)&&Number.isFinite(c)?l*c:null}s[t]=r,e.workPendingQuotationDraft={...o,lines:s}},onQuotationDraftSave:()=>{typeof window<"u"&&window.confirm(u("work.saveConfirm"))&&Bf(e).then(t=>{t&&e.loadFulfillDrafts()})},onQuotationDraftDismiss:()=>{e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null}})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const hs={CHILD:2},ms=e=>(...t)=>({_$litDirective$:e,values:t});let vs=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,i){this._$Ct=t,this._$AM=n,this._$Ci=i}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:Vf}=Jc,Dr=e=>e,Xf=e=>e.strings===void 0,Mr=()=>document.createComment(""),Xt=(e,t,n)=>{var s;const i=e._$AA.parentNode,o=t===void 0?e._$AB:t._$AA;if(n===void 0){const r=i.insertBefore(Mr(),o),a=i.insertBefore(Mr(),o);n=new Vf(r,a,e,e.options)}else{const r=n._$AB.nextSibling,a=n._$AM,l=a!==e;if(l){let c;(s=n._$AQ)==null||s.call(n,e),n._$AM=e,n._$AP!==void 0&&(c=e._$AU)!==a._$AU&&n._$AP(c)}if(r!==o||l){let c=n._$AA;for(;c!==r;){const p=Dr(c).nextSibling;Dr(i).insertBefore(c,o),c=p}}}return n},gt=(e,t,n=e)=>(e._$AI(t,n),e),Jf={},Yf=(e,t=Jf)=>e._$AH=t,Zf=e=>e._$AH,Xi=e=>{e._$AR(),e._$AA.remove()};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Fr=(e,t,n)=>{const i=new Map;for(let o=t;o<=n;o++)i.set(e[o],o);return i},ql=ms(class extends vs{constructor(e){if(super(e),e.type!==hs.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,n){let i;n===void 0?n=t:t!==void 0&&(i=t);const o=[],s=[];let r=0;for(const a of e)o[r]=i?i(a,r):r,s[r]=n(a,r),r++;return{values:s,keys:o}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,i]){const o=Zf(e),{values:s,keys:r}=this.dt(t,n,i);if(!Array.isArray(o))return this.ut=r,s;const a=this.ut??(this.ut=[]),l=[];let c,p,f=0,g=o.length-1,b=0,$=s.length-1;for(;f<=g&&b<=$;)if(o[f]===null)f++;else if(o[g]===null)g--;else if(a[f]===r[b])l[b]=gt(o[f],s[b]),f++,b++;else if(a[g]===r[$])l[$]=gt(o[g],s[$]),g--,$--;else if(a[f]===r[$])l[$]=gt(o[f],s[$]),Xt(e,l[$+1],o[f]),f++,$--;else if(a[g]===r[b])l[b]=gt(o[g],s[b]),Xt(e,o[f],o[g]),g--,b++;else if(c===void 0&&(c=Fr(r,b,$),p=Fr(a,f,g)),c.has(a[f]))if(c.has(a[g])){const k=p.get(r[b]),S=k!==void 0?o[k]:null;if(S===null){const R=Xt(e,o[f]);gt(R,s[b]),l[b]=R}else l[b]=gt(S,s[b]),Xt(e,o[f],S),o[k]=null;b++}else Xi(o[g]),g--;else Xi(o[f]),f++;for(;b<=$;){const k=Xt(e,l[$+1]);gt(k,s[b]),l[b++]=k}for(;f<=g;){const k=o[f++];k!==null&&Xi(k)}return this.ut=r,Yf(e,l),rt}}),pe={messageSquare:d`
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
  `};function eg(e){var o,s,r,a,l;const t=(o=e.hello)==null?void 0:o.snapshot,n=(r=(s=t==null?void 0:t.sessionDefaults)==null?void 0:s.mainSessionKey)==null?void 0:r.trim();if(n)return n;const i=(l=(a=t==null?void 0:t.sessionDefaults)==null?void 0:a.mainKey)==null?void 0:l.trim();return i||"main"}function tg(e,t){e.sessionKey=t,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:t,lastActiveSessionKey:t})}function ng(e,t){const n=ml(t,e.basePath);return d`
    <a
      href=${n}
      class="nav-item ${e.tab===t?"active":""}"
      @click=${i=>{if(!(i.defaultPrevented||i.button!==0||i.metaKey||i.ctrlKey||i.shiftKey||i.altKey)){if(i.preventDefault(),t==="chat"){const o=eg(e);e.sessionKey!==o&&(tg(e,o),e.loadAssistantIdentity())}e.setTab(t)}}}
      title=${mo(t)}
    >
      <span class="nav-item__icon" aria-hidden="true">${pe[lp(t)]}</span>
      <span class="nav-item__text">${mo(t)}</span>
    </a>
  `}function ig(e){const t=og(e.hello,e.sessionsResult),n=ag(e.sessionKey,e.sessionsResult,t),i=e.onboarding,o=e.onboarding,s=e.onboarding?!1:e.settings.chatShowThinking,r=e.onboarding?!0:e.settings.chatFocusMode,a=d`
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
          @change=${c=>{const p=c.target.value;e.sessionKey=p,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:p,lastActiveSessionKey:p}),e.loadAssistantIdentity(),Sp(e,p),Kt(e)}}
        >
          ${ql(n,c=>c.key,c=>d`<option value=${c.key} title=${c.key}>
                ${c.displayName??c.key}
              </option>`)}
        </select>
      </label>
      <button
        class="btn btn--sm btn--icon"
        ?disabled=${e.chatLoading||!e.connected}
        @click=${async()=>{const c=e;c.chatManualRefreshInFlight=!0,c.chatNewMessagesBelow=!1,await c.updateComplete,c.resetToolStream();try{await El(e,{scheduleScroll:!1}),c.scrollToBottom({smooth:!0})}finally{requestAnimationFrame(()=>{c.chatManualRefreshInFlight=!1,c.chatNewMessagesBelow=!1})}}}
        title=${u("chat.refreshTitle")}
      >
        ${a}
      </button>
      <span class="chat-controls__separator">|</span>
      <button
        class="btn btn--sm btn--icon ${s?"active":""}"
        ?disabled=${i}
        @click=${()=>{i||e.applySettings({...e.settings,chatShowThinking:!e.settings.chatShowThinking})}}
        aria-pressed=${s}
        title=${u(i?"chat.onboardingDisabled":"chat.thinkingToggle")}
      >
        ${pe.brain}
      </button>
      <button
        class="btn btn--sm btn--icon ${r?"active":""}"
        ?disabled=${o}
        @click=${()=>{o||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})}}
        aria-pressed=${r}
        title=${u(o?"chat.onboardingDisabled":"chat.focusToggle")}
      >
        ${l}
      </button>
    </div>
  `}function og(e,t){var s,r,a,l,c;const n=e==null?void 0:e.snapshot,i=(r=(s=n==null?void 0:n.sessionDefaults)==null?void 0:s.mainSessionKey)==null?void 0:r.trim();if(i)return i;const o=(l=(a=n==null?void 0:n.sessionDefaults)==null?void 0:a.mainKey)==null?void 0:l.trim();return o||((c=t==null?void 0:t.sessions)!=null&&c.some(p=>p.key==="main")?"main":null)}const Jn={bluebubbles:"iMessage",telegram:"Telegram",discord:"Discord",signal:"Signal",slack:"Slack",whatsapp:"WhatsApp",matrix:"Matrix",email:"Email",sms:"SMS"},sg=Object.keys(Jn);function Nr(e){return e.charAt(0).toUpperCase()+e.slice(1)}function rg(e){if(e==="main"||e==="agent:main:main")return{prefix:"",fallbackName:"Main Session"};if(e.includes(":subagent:"))return{prefix:"Subagent:",fallbackName:"Subagent:"};if(e.includes(":cron:"))return{prefix:"Cron:",fallbackName:"Cron Job:"};const t=e.match(/^agent:[^:]+:([^:]+):direct:(.+)$/);if(t){const i=t[1],o=t[2];return{prefix:"",fallbackName:`${Jn[i]??Nr(i)} · ${o}`}}const n=e.match(/^agent:[^:]+:([^:]+):group:(.+)$/);if(n){const i=n[1];return{prefix:"",fallbackName:`${Jn[i]??Nr(i)} Group`}}for(const i of sg)if(e===i||e.startsWith(`${i}:`))return{prefix:"",fallbackName:`${Jn[i]} Session`};return{prefix:"",fallbackName:e}}function Ji(e,t){var a,l;const n=((a=t==null?void 0:t.label)==null?void 0:a.trim())||"",i=((l=t==null?void 0:t.displayName)==null?void 0:l.trim())||"",{prefix:o,fallbackName:s}=rg(e),r=c=>o?new RegExp(`^${o.replace(/[.*+?^${}()|[\\]\\]/g,"\\$&")}\\s*`,"i").test(c)?c:`${o} ${c}`:c;return n&&n!==e?r(n):i&&i!==e?r(i):s}function ag(e,t,n){var a,l;const i=new Set,o=[],s=n&&((a=t==null?void 0:t.sessions)==null?void 0:a.find(c=>c.key===n)),r=(l=t==null?void 0:t.sessions)==null?void 0:l.find(c=>c.key===e);if(n&&(i.add(n),o.push({key:n,displayName:Ji(n,s||void 0)})),i.has(e)||(i.add(e),o.push({key:e,displayName:Ji(e,r)})),t!=null&&t.sessions)for(const c of t.sessions)i.has(c.key)||(i.add(c.key),o.push({key:c.key,displayName:Ji(c.key,c)}));return o}const lg=["system","light","dark"];function cg(e){const t=Math.max(0,lg.indexOf(e.theme)),n=i=>o=>{const r={element:o.currentTarget};(o.clientX||o.clientY)&&(r.pointerClientX=o.clientX,r.pointerClientY=o.clientY),e.setTheme(i,r)};return d`
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
          ${pg()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="light"?"active":""}"
          @click=${n("light")}
          aria-pressed=${e.theme==="light"}
          aria-label="Light theme"
          title="Light"
        >
          ${dg()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="dark"?"active":""}"
          @click=${n("dark")}
          aria-pressed=${e.theme==="dark"}
          aria-label="Dark theme"
          title="Dark"
        >
          ${ug()}
        </button>
      </div>
    </div>
  `}function dg(){return d`
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
  `}function ug(){return d`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
      ></path>
    </svg>
  `}function pg(){return d`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="20" height="14" x="2" y="3" rx="2"></rect>
      <line x1="8" x2="16" y1="21" y2="21"></line>
      <line x1="12" x2="12" y1="17" y2="21"></line>
    </svg>
  `}function zl(e,t){if(!e)return e;const i=e.files.some(o=>o.name===t.name)?e.files.map(o=>o.name===t.name?t:o):[...e.files,t];return{...e,files:i}}async function Yi(e,t){if(!(!e.client||!e.connected||e.agentFilesLoading)){e.agentFilesLoading=!0,e.agentFilesError=null;try{const n=await e.client.request("agents.files.list",{agentId:t});n&&(e.agentFilesList=n,e.agentFileActive&&!n.files.some(i=>i.name===e.agentFileActive)&&(e.agentFileActive=null))}catch(n){e.agentFilesError=String(n)}finally{e.agentFilesLoading=!1}}}async function fg(e,t,n,i){if(!(!e.client||!e.connected||e.agentFilesLoading)&&!Object.hasOwn(e.agentFileContents,n)){e.agentFilesLoading=!0,e.agentFilesError=null;try{const o=await e.client.request("agents.files.get",{agentId:t,name:n});if(o!=null&&o.file){const s=o.file.content??"",r=e.agentFileContents[n]??"",a=e.agentFileDrafts[n],l=(i==null?void 0:i.preserveDraft)??!0;e.agentFilesList=zl(e.agentFilesList,o.file),e.agentFileContents={...e.agentFileContents,[n]:s},(!l||!Object.hasOwn(e.agentFileDrafts,n)||a===r)&&(e.agentFileDrafts={...e.agentFileDrafts,[n]:s})}}catch(o){e.agentFilesError=String(o)}finally{e.agentFilesLoading=!1}}}async function gg(e,t,n,i){if(!(!e.client||!e.connected||e.agentFileSaving)){e.agentFileSaving=!0,e.agentFilesError=null;try{const o=await e.client.request("agents.files.set",{agentId:t,name:n,content:i});o!=null&&o.file&&(e.agentFilesList=zl(e.agentFilesList,o.file),e.agentFileContents={...e.agentFileContents,[n]:i},e.agentFileDrafts={...e.agentFileDrafts,[n]:i})}catch(o){e.agentFilesError=String(o)}finally{e.agentFileSaving=!1}}}function Kl(e){return e?`${ti(e)} (${Et(e)})`:"n/a"}function hg(e){if(e==null)return"";try{return JSON.stringify(e,null,2)}catch{return String(e)}}function mg(e){const t=e.state??{},n=t.nextRunAtMs?ti(t.nextRunAtMs):"n/a",i=t.lastRunAtMs?ti(t.lastRunAtMs):"n/a";return`${t.lastStatus??"n/a"} · next ${n} · last ${i}`}function vg(e){const t=e.schedule;if(t.kind==="at"){const n=Date.parse(t.at);return Number.isFinite(n)?`At ${ti(n)}`:`At ${t.at}`}return t.kind==="every"?`Every ${ja(t.everyMs)}`:`Cron ${t.expr}${t.tz?` (${t.tz})`:""}`}function yg(e){const t=e.payload;if(t.kind==="systemEvent")return`System: ${t.text}`;const n=`Agent: ${t.message}`,i=e.delivery;if(i&&i.mode!=="none"){const o=i.mode==="webhook"?i.to?` (${i.to})`:"":i.channel||i.to?` (${i.channel??"last"}${i.to?` -> ${i.to}`:""})`:"";return`${n} · ${i.mode}${o}`}return n}function Ye(e){const t=(e??"").trim();return t?t.replace(/\s+/g,"_").toLowerCase():""}function bg(e){return[]}function wg(e){return{allow:[],alsoAllow:[],deny:[]}}const Or=[{id:"fs",label:"Files",tools:[{id:"read",label:"read",description:"Read file contents"},{id:"write",label:"write",description:"Create or overwrite files"},{id:"edit",label:"edit",description:"Make precise edits"},{id:"apply_patch",label:"apply_patch",description:"Patch files (OpenAI)"}]},{id:"runtime",label:"Runtime",tools:[{id:"exec",label:"exec",description:"Run shell commands"},{id:"process",label:"process",description:"Manage background processes"}]},{id:"web",label:"Web",tools:[{id:"web_search",label:"web_search",description:"Search the web"},{id:"web_fetch",label:"web_fetch",description:"Fetch web content"}]},{id:"memory",label:"Memory",tools:[{id:"memory_search",label:"memory_search",description:"Semantic search"},{id:"memory_get",label:"memory_get",description:"Read memory files"}]},{id:"sessions",label:"Sessions",tools:[{id:"sessions_list",label:"sessions_list",description:"List sessions"},{id:"sessions_history",label:"sessions_history",description:"Session history"},{id:"sessions_send",label:"sessions_send",description:"Send to session"},{id:"sessions_spawn",label:"sessions_spawn",description:"Spawn sub-agent"},{id:"session_status",label:"session_status",description:"Session status"}]},{id:"ui",label:"UI",tools:[{id:"browser",label:"browser",description:"Control web browser"},{id:"canvas",label:"canvas",description:"Control canvases"}]},{id:"messaging",label:"Messaging",tools:[{id:"message",label:"message",description:"Send messages"}]},{id:"automation",label:"Automation",tools:[{id:"cron",label:"cron",description:"Schedule tasks"},{id:"gateway",label:"gateway",description:"Gateway control"}]},{id:"nodes",label:"Nodes",tools:[{id:"nodes",label:"nodes",description:"Nodes + devices"}]},{id:"agents",label:"Agents",tools:[{id:"agents_list",label:"agents_list",description:"List agents"}]},{id:"media",label:"Media",tools:[{id:"image",label:"image",description:"Image understanding"}]}],$g=[{id:"minimal",label:"Minimal"},{id:"coding",label:"Coding"},{id:"messaging",label:"Messaging"},{id:"full",label:"Full"}];function So(e){var t,n,i;return((t=e.name)==null?void 0:t.trim())||((i=(n=e.identity)==null?void 0:n.name)==null?void 0:i.trim())||e.id}function Un(e){const t=e.trim();if(!t||t.length>16)return!1;let n=!1;for(let i=0;i<t.length;i+=1)if(t.charCodeAt(i)>127){n=!0;break}return!(!n||t.includes("://")||t.includes("/")||t.includes("."))}function xi(e,t){var r,a,l,c,p,f;const n=(r=t==null?void 0:t.emoji)==null?void 0:r.trim();if(n&&Un(n))return n;const i=(l=(a=e.identity)==null?void 0:a.emoji)==null?void 0:l.trim();if(i&&Un(i))return i;const o=(c=t==null?void 0:t.avatar)==null?void 0:c.trim();if(o&&Un(o))return o;const s=(f=(p=e.identity)==null?void 0:p.avatar)==null?void 0:f.trim();return s&&Un(s)?s:""}function Hl(e,t){return t&&e===t?"default":null}function xg(e){if(e==null||!Number.isFinite(e))return"-";if(e<1024)return`${e} B`;const t=["KB","MB","GB","TB"];let n=e/1024,i=0;for(;n>=1024&&i<t.length-1;)n/=1024,i+=1;return`${n.toFixed(n<10?1:0)} ${t[i]}`}function ki(e,t){var s,r;const n=e;return{entry:(((s=n==null?void 0:n.agents)==null?void 0:s.list)??[]).find(a=>(a==null?void 0:a.id)===t),defaults:(r=n==null?void 0:n.agents)==null?void 0:r.defaults,globalTools:n==null?void 0:n.tools}}function Br(e,t,n,i,o){var b,$,k,S,R,I,F,A,C,z,y,_;const s=ki(t,e.id),a=(n&&n.agentId===e.id?n.workspace:null)||((b=s.entry)==null?void 0:b.workspace)||(($=s.defaults)==null?void 0:$.workspace)||"default",l=(k=s.entry)!=null&&k.model?dn((S=s.entry)==null?void 0:S.model):dn((R=s.defaults)==null?void 0:R.model),c=((I=o==null?void 0:o.name)==null?void 0:I.trim())||((A=(F=e.identity)==null?void 0:F.name)==null?void 0:A.trim())||((C=e.name)==null?void 0:C.trim())||((z=s.entry)==null?void 0:z.name)||e.id,p=xi(e,o)||"-",f=Array.isArray((y=s.entry)==null?void 0:y.skills)?(_=s.entry)==null?void 0:_.skills:null,g=(f==null?void 0:f.length)??null;return{workspace:a,model:l,identityName:c,identityEmoji:p,skillsLabel:f?`${g} selected`:"all skills",isDefault:!!(i&&e.id===i)}}function dn(e){var t;if(!e)return"-";if(typeof e=="string")return e.trim()||"-";if(typeof e=="object"&&e){const n=e,i=(t=n.primary)==null?void 0:t.trim();if(i){const o=Array.isArray(n.fallbacks)?n.fallbacks.length:0;return o>0?`${i} (+${o} fallback)`:i}}return"-"}function Ur(e){const t=e.match(/^(.+) \(\+\d+ fallback\)$/);return t?t[1]:e}function qr(e){if(!e)return null;if(typeof e=="string")return e.trim()||null;if(typeof e=="object"&&e){const t=e,n=typeof t.primary=="string"?t.primary:typeof t.model=="string"?t.model:typeof t.id=="string"?t.id:typeof t.value=="string"?t.value:null;return(n==null?void 0:n.trim())||null}return null}function kg(e){if(!e||typeof e=="string")return null;if(typeof e=="object"&&e){const t=e,n=Array.isArray(t.fallbacks)?t.fallbacks:Array.isArray(t.fallback)?t.fallback:null;return n?n.filter(i=>typeof i=="string"):null}return null}function Sg(e){return e.split(",").map(t=>t.trim()).filter(Boolean)}function _g(e){var o,s,r;const t=e,n=(s=(o=t==null?void 0:t.agents)==null?void 0:o.defaults)==null?void 0:s.models;if(!n||typeof n!="object")return[];const i=[];for(const[a,l]of Object.entries(n)){const c=a.trim();if(!c)continue;const p=l&&typeof l=="object"&&"alias"in l&&typeof l.alias=="string"?(r=l.alias)==null?void 0:r.trim():void 0,f=p&&p!==c?`${p} (${c})`:c;i.push({value:c,label:f})}return i}function Ag(e,t){const n=_g(e),i=t?n.some(o=>o.value===t):!1;return t&&!i&&n.unshift({value:t,label:`Current (${t})`}),n.length===0?d`
      <option value="" disabled>No configured models</option>
    `:n.map(o=>d`<option value=${o.value}>${o.label}</option>`)}function Cg(e){const t=Ye(e);if(!t)return{kind:"exact",value:""};if(t==="*")return{kind:"all"};if(!t.includes("*"))return{kind:"exact",value:t};const n=t.replace(/[.*+?^${}()|[\\]\\]/g,"\\$&");return{kind:"regex",value:new RegExp(`^${n.replaceAll("\\*",".*")}$`)}}function _o(e){return Array.isArray(e)?bg().map(Cg).filter(t=>t.kind!=="exact"||t.value.length>0):[]}function un(e,t){for(const n of t)if(n.kind==="all"||n.kind==="exact"&&e===n.value||n.kind==="regex"&&n.value.test(e))return!0;return!1}function Tg(e,t){if(!t)return!0;const n=Ye(e),i=_o(t.deny);if(un(n,i))return!1;const o=_o(t.allow);return!!(o.length===0||un(n,o)||n==="apply_patch"&&un("exec",o))}function zr(e,t){if(!Array.isArray(t)||t.length===0)return!1;const n=Ye(e),i=_o(t);return!!(un(n,i)||n==="apply_patch"&&un("exec",i))}function Eg(e){return wg()??void 0}function jl(e,t){return d`
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
  `}function Rg(e,t){var i,o;const n=(i=e.channelMeta)==null?void 0:i.find(s=>s.id===t);return n!=null&&n.label?n.label:((o=e.channelLabels)==null?void 0:o[t])??t}function Lg(e){var o;if(!e)return[];const t=new Set;for(const s of e.channelOrder??[])t.add(s);for(const s of e.channelMeta??[])t.add(s.id);for(const s of Object.keys(e.channelAccounts??{}))t.add(s);const n=[],i=(o=e.channelOrder)!=null&&o.length?e.channelOrder:Array.from(t);for(const s of i)t.has(s)&&(n.push(s),t.delete(s));for(const s of t)n.push(s);return n.map(s=>{var r;return{id:s,label:Rg(e,s),accounts:((r=e.channelAccounts)==null?void 0:r[s])??[]}})}const Ig=["groupPolicy","streamMode","dmPolicy"];function Pg(e,t){if(!e)return null;const i=(e.channels??{})[t];if(i&&typeof i=="object")return i;const o=e[t];return o&&typeof o=="object"?o:null}function Dg(e){if(e==null)return"n/a";if(typeof e=="string"||typeof e=="number"||typeof e=="boolean")return String(e);try{return JSON.stringify(e)}catch{return"n/a"}}function Mg(e,t){const n=Pg(e,t);return n?Ig.flatMap(i=>i in n?[{label:i,value:Dg(n[i])}]:[]):[]}function Fg(e){let t=0,n=0,i=0;for(const o of e){const s=o.probe&&typeof o.probe=="object"&&"ok"in o.probe?!!o.probe.ok:!1;(o.connected===!0||o.running===!0||s)&&(t+=1),o.configured&&(n+=1),o.enabled&&(i+=1)}return{total:e.length,connected:t,configured:n,enabled:i}}function Ng(e){const t=Lg(e.snapshot),n=e.lastSuccess?Et(e.lastSuccess):"never";return d`
    <section class="grid grid-cols-2">
      ${jl(e.context,"Workspace, identity, and model configuration.")}
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
                  ${t.map(i=>{const o=Fg(i.accounts),s=o.total?`${o.connected}/${o.total} connected`:"no accounts",r=o.configured?`${o.configured} configured`:"not configured",a=o.total?`${o.enabled} enabled`:"disabled",l=Mg(e.configForm,i.id);return d`
                      <div class="list-item">
                        <div class="list-main">
                          <div class="list-title">${i.label}</div>
                          <div class="list-sub mono">${i.id}</div>
                        </div>
                        <div class="list-meta">
                          <div>${s}</div>
                          <div>${r}</div>
                          <div>${a}</div>
                          ${l.length>0?l.map(c=>d`<div>${c.label}: ${c.value}</div>`):w}
                        </div>
                      </div>
                    `})}
                </div>
              `}
      </section>
    </section>
  `}function Og(e){var n,i;const t=e.jobs.filter(o=>o.agentId===e.agentId);return d`
    <section class="grid grid-cols-2">
      ${jl(e.context,"Workspace and scheduling targets.")}
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
            <div class="stat-value">${Kl(((i=e.status)==null?void 0:i.nextWakeAtMs)??null)}</div>
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
                ${t.map(o=>d`
                    <div class="list-item">
                      <div class="list-main">
                        <div class="list-title">${o.name}</div>
                        ${o.description?d`<div class="list-sub">${o.description}</div>`:w}
                        <div class="chip-row" style="margin-top: 6px;">
                          <span class="chip">${vg(o)}</span>
                          <span class="chip ${o.enabled?"chip-ok":"chip-warn"}">
                            ${o.enabled?"enabled":"disabled"}
                          </span>
                          <span class="chip">${o.sessionTarget}</span>
                        </div>
                      </div>
                      <div class="list-meta">
                        <div class="mono">${mg(o)}</div>
                        <div class="muted">${yg(o)}</div>
                      </div>
                    </div>
                  `)}
              </div>
            `}
    </section>
  `}function Bg(e){var l;const t=((l=e.agentFilesList)==null?void 0:l.agentId)===e.agentId?e.agentFilesList:null,n=(t==null?void 0:t.files)??[],i=e.agentFileActive??null,o=i?n.find(c=>c.name===i)??null:null,s=i?e.agentFileContents[i]??"":"",r=i?e.agentFileDrafts[i]??s:"",a=i?r!==s:!1;return d`
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
                        `:n.map(c=>Ug(c,i,()=>e.onSelectFile(c.name)))}
                </div>
                <div class="agent-files-editor">
                  ${o?d`
                          <div class="agent-file-header">
                            <div>
                              <div class="agent-file-title mono">${o.name}</div>
                              <div class="agent-file-sub mono">${o.path}</div>
                            </div>
                            <div class="agent-file-actions">
                              <button
                                class="btn btn--sm"
                                ?disabled=${!a}
                                @click=${()=>e.onFileReset(o.name)}
                              >
                                Reset
                              </button>
                              <button
                                class="btn btn--sm primary"
                                ?disabled=${e.agentFileSaving||!a}
                                @click=${()=>e.onFileSave(o.name)}
                              >
                                ${e.agentFileSaving?"Saving…":"Save"}
                              </button>
                            </div>
                          </div>
                          ${o.missing?d`
                                  <div class="callout info" style="margin-top: 10px">
                                    This file is missing. Saving will create it in the agent workspace.
                                  </div>
                                `:w}
                          <label class="field" style="margin-top: 12px;">
                            <span>Content</span>
                            <textarea
                              .value=${r}
                              @input=${c=>e.onFileDraftChange(o.name,c.target.value)}
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
  `}function Ug(e,t,n){const i=e.missing?"Missing":`${xg(e.size)} · ${Et(e.updatedAtMs??null)}`;return d`
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
  `}const qn=[{id:"workspace",label:"Workspace Skills",sources:["openclaw-workspace"]},{id:"built-in",label:"Built-in Skills",sources:["openclaw-bundled"]},{id:"installed",label:"Installed Skills",sources:["openclaw-managed"]},{id:"extra",label:"Extra Skills",sources:["openclaw-extra"]}];function Gl(e){var s;const t=new Map;for(const r of qn)t.set(r.id,{id:r.id,label:r.label,skills:[]});const n=qn.find(r=>r.id==="built-in"),i={id:"other",label:"Other Skills",skills:[]};for(const r of e){const a=r.bundled?n:qn.find(l=>l.sources.includes(r.source));a?(s=t.get(a.id))==null||s.skills.push(r):i.skills.push(r)}const o=qn.map(r=>t.get(r.id)).filter(r=>!!(r&&r.skills.length>0));return i.skills.length>0&&o.push(i),o}function Wl(e){return[...e.missing.bins.map(t=>`bin:${t}`),...e.missing.env.map(t=>`env:${t}`),...e.missing.config.map(t=>`config:${t}`),...e.missing.os.map(t=>`os:${t}`)]}function Ql(e){const t=[];return e.disabled&&t.push("disabled"),e.blockedByAllowlist&&t.push("blocked by allowlist"),t}function Vl(e){const t=e.skill,n=!!e.showBundledBadge;return d`
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
  `}function qg(e){var R;const t=ki(e.configForm,e.agentId),n=((R=t.entry)==null?void 0:R.tools)??{},i=t.globalTools??{},o=n.profile??i.profile??"full",s=n.profile?"agent override":i.profile?"global default":"default",r=Array.isArray(n.allow)&&n.allow.length>0,a=Array.isArray(i.allow)&&i.allow.length>0,l=!!e.configForm&&!e.configLoading&&!e.configSaving&&!r,c=r?[]:Array.isArray(n.alsoAllow)?n.alsoAllow:[],p=r?[]:Array.isArray(n.deny)?n.deny:[],f=r?{allow:n.allow??[],deny:n.deny??[]}:Eg()??void 0,g=Or.flatMap(I=>I.tools.map(F=>F.id)),b=I=>{const F=Tg(I,f),A=zr(I,c),C=zr(I,p);return{allowed:(F||A)&&!C,baseAllowed:F,denied:C}},$=g.filter(I=>b(I).allowed).length,k=(I,F)=>{const A=new Set(c.map(_=>Ye(_)).filter(_=>_.length>0)),C=new Set(p.map(_=>Ye(_)).filter(_=>_.length>0)),z=b(I).baseAllowed,y=Ye(I);F?(C.delete(y),z||A.add(y)):(A.delete(y),C.add(y)),e.onOverridesChange(e.agentId,[...A],[...C])},S=I=>{const F=new Set(c.map(C=>Ye(C)).filter(C=>C.length>0)),A=new Set(p.map(C=>Ye(C)).filter(C=>C.length>0));for(const C of g){const z=b(C).baseAllowed,y=Ye(C);I?(A.delete(y),z||F.add(y)):(F.delete(y),A.add(y))}e.onOverridesChange(e.agentId,[...F],[...A])};return d`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Tool Access</div>
          <div class="card-sub">
            Profile + per-tool overrides for this agent.
            <span class="mono">${$}/${g.length}</span> enabled.
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
      ${r?d`
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
          <div class="mono">${o}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Source</div>
          <div>${s}</div>
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
          ${$g.map(I=>d`
              <button
                class="btn btn--sm ${o===I.id?"active":""}"
                ?disabled=${!l}
                @click=${()=>e.onProfileChange(e.agentId,I.id,!0)}
              >
                ${I.label}
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
        ${Or.map(I=>d`
              <div class="agent-tools-section">
                <div class="agent-tools-header">${I.label}</div>
                <div class="agent-tools-list">
                  ${I.tools.map(F=>{const{allowed:A}=b(F.id);return d`
                      <div class="agent-tool-row">
                        <div>
                          <div class="agent-tool-title mono">${F.label}</div>
                          <div class="agent-tool-sub">${F.description}</div>
                        </div>
                        <label class="cfg-toggle">
                          <input
                            type="checkbox"
                            .checked=${A}
                            ?disabled=${!l}
                            @change=${C=>k(F.id,C.target.checked)}
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
  `}function zg(e){var b,$,k;const t=!!e.configForm&&!e.configLoading&&!e.configSaving,n=ki(e.configForm,e.agentId),i=Array.isArray((b=n.entry)==null?void 0:b.skills)?($=n.entry)==null?void 0:$.skills:void 0,o=new Set((i??[]).map(S=>S.trim()).filter(Boolean)),s=i!==void 0,r=!!(e.report&&e.activeAgentId===e.agentId),a=r?((k=e.report)==null?void 0:k.skills)??[]:[],l=e.filter.trim().toLowerCase(),c=l?a.filter(S=>[S.name,S.description,S.source].join(" ").toLowerCase().includes(l)):a,p=Gl(c),f=s?a.filter(S=>o.has(S.name)).length:a.length,g=a.length;return d`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Skills</div>
          <div class="card-sub">
            Per-agent skill allowlist and workspace skills.
            ${g>0?d`<span class="mono">${f}/${g}</span>`:w}
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
      ${s?d`
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
                ${p.map(S=>Kg(S,{agentId:e.agentId,allowSet:o,usingAllowlist:s,editable:t,onToggle:e.onToggle}))}
              </div>
            `}
    </section>
  `}function Kg(e,t){const n=e.id==="workspace"||e.id==="built-in";return d`
    <details class="agent-skills-group" ?open=${!n}>
      <summary class="agent-skills-header">
        <span>${e.label}</span>
        <span class="muted">${e.skills.length}</span>
      </summary>
      <div class="list skills-grid">
        ${e.skills.map(i=>Hg(i,{agentId:t.agentId,allowSet:t.allowSet,usingAllowlist:t.usingAllowlist,editable:t.editable,onToggle:t.onToggle}))}
      </div>
    </details>
  `}function Hg(e,t){const n=t.usingAllowlist?t.allowSet.has(e.name):!0,i=Wl(e),o=Ql(e);return d`
    <div class="list-item agent-skill-row">
      <div class="list-main">
        <div class="list-title">${e.emoji?`${e.emoji} `:""}${e.name}</div>
        <div class="list-sub">${e.description}</div>
        ${Vl({skill:e})}
        ${i.length>0?d`<div class="muted" style="margin-top: 6px;">Missing: ${i.join(", ")}</div>`:w}
        ${o.length>0?d`<div class="muted" style="margin-top: 6px;">Reason: ${o.join(", ")}</div>`:w}
      </div>
      <div class="list-meta">
        <label class="cfg-toggle">
          <input
            type="checkbox"
            .checked=${n}
            ?disabled=${!t.editable}
            @change=${s=>t.onToggle(t.agentId,e.name,s.target.checked)}
          />
          <span class="cfg-toggle__track"></span>
        </label>
      </div>
    </div>
  `}function jg(e){var s,r,a;const t=((s=e.agentsList)==null?void 0:s.agents)??[],n=((r=e.agentsList)==null?void 0:r.defaultId)??null,i=e.selectedAgentId??n??((a=t[0])==null?void 0:a.id)??null,o=i?t.find(l=>l.id===i)??null:null;return d`
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
                `:t.map(l=>{const c=Hl(l.id,n),p=xi(l,e.agentIdentityById[l.id]??null);return d`
                    <button
                      type="button"
                      class="agent-row ${i===l.id?"active":""}"
                      @click=${()=>e.onSelectAgent(l.id)}
                    >
                      <div class="agent-avatar">${p||So(l).slice(0,1)}</div>
                      <div class="agent-info">
                        <div class="agent-title">${So(l)}</div>
                        <div class="agent-sub mono">${l.id}</div>
                      </div>
                      ${c?d`<span class="agent-pill">${c}</span>`:w}
                    </button>
                  `})}
        </div>
      </section>
      <section class="agents-main">
        ${o?d`
                ${Gg(o,n,e.agentIdentityById[o.id]??null)}
                ${Wg(e.activePanel,l=>e.onSelectPanel(l))}
                ${e.activePanel==="overview"?Qg({agent:o,defaultId:n,configForm:e.configForm,agentFilesList:e.agentFilesList,agentIdentity:e.agentIdentityById[o.id]??null,agentIdentityError:e.agentIdentityError,agentIdentityLoading:e.agentIdentityLoading,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave,onModelChange:e.onModelChange,onModelFallbacksChange:e.onModelFallbacksChange}):w}
                ${e.activePanel==="files"?Bg({agentId:o.id,agentFilesList:e.agentFilesList,agentFilesLoading:e.agentFilesLoading,agentFilesError:e.agentFilesError,agentFileActive:e.agentFileActive,agentFileContents:e.agentFileContents,agentFileDrafts:e.agentFileDrafts,agentFileSaving:e.agentFileSaving,onLoadFiles:e.onLoadFiles,onSelectFile:e.onSelectFile,onFileDraftChange:e.onFileDraftChange,onFileReset:e.onFileReset,onFileSave:e.onFileSave}):w}
                ${e.activePanel==="tools"?qg({agentId:o.id,configForm:e.configForm,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,onProfileChange:e.onToolsProfileChange,onOverridesChange:e.onToolsOverridesChange,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):w}
                ${e.activePanel==="skills"?zg({agentId:o.id,report:e.agentSkillsReport,loading:e.agentSkillsLoading,error:e.agentSkillsError,activeAgentId:e.agentSkillsAgentId,configForm:e.configForm,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,filter:e.skillsFilter,onFilterChange:e.onSkillsFilterChange,onRefresh:e.onSkillsRefresh,onToggle:e.onAgentSkillToggle,onClear:e.onAgentSkillsClear,onDisableAll:e.onAgentSkillsDisableAll,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):w}
                ${e.activePanel==="channels"?Ng({context:Br(o,e.configForm,e.agentFilesList,n,e.agentIdentityById[o.id]??null),configForm:e.configForm,snapshot:e.channelsSnapshot,loading:e.channelsLoading,error:e.channelsError,lastSuccess:e.channelsLastSuccess,onRefresh:e.onChannelsRefresh}):w}
                ${e.activePanel==="cron"?Og({context:Br(o,e.configForm,e.agentFilesList,n,e.agentIdentityById[o.id]??null),agentId:o.id,jobs:e.cronJobs,status:e.cronStatus,loading:e.cronLoading,error:e.cronError,onRefresh:e.onCronRefresh}):w}
              `:d`
                <div class="card">
                  <div class="card-title">Select an agent</div>
                  <div class="card-sub">Pick an agent to inspect its workspace and tools.</div>
                </div>
              `}
      </section>
    </div>
  `}function Gg(e,t,n){var a,l;const i=Hl(e.id,t),o=So(e),s=((l=(a=e.identity)==null?void 0:a.theme)==null?void 0:l.trim())||"Agent workspace and routing.",r=xi(e,n);return d`
    <section class="card agent-header">
      <div class="agent-header-main">
        <div class="agent-avatar agent-avatar--lg">${r||o.slice(0,1)}</div>
        <div>
          <div class="card-title">${o}</div>
          <div class="card-sub">${s}</div>
        </div>
      </div>
      <div class="agent-header-meta">
        <div class="mono">${e.id}</div>
        ${i?d`<span class="agent-pill">${i}</span>`:w}
      </div>
    </section>
  `}function Wg(e,t){return d`
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
  `}function Qg(e){var N,ne,be,L,Y,ge,Q,Ne,ae,et,te,Ie,B,K,Z,ie;const{agent:t,configForm:n,agentFilesList:i,agentIdentity:o,agentIdentityLoading:s,agentIdentityError:r,configLoading:a,configSaving:l,configDirty:c,onConfigReload:p,onConfigSave:f,onModelChange:g,onModelFallbacksChange:b}=e,$=ki(n,t.id),S=(i&&i.agentId===t.id?i.workspace:null)||((N=$.entry)==null?void 0:N.workspace)||((ne=$.defaults)==null?void 0:ne.workspace)||"default",R=(be=$.entry)!=null&&be.model?dn((L=$.entry)==null?void 0:L.model):dn((Y=$.defaults)==null?void 0:Y.model),I=dn((ge=$.defaults)==null?void 0:ge.model),F=qr((Q=$.entry)==null?void 0:Q.model)||(R!=="-"?Ur(R):null),A=qr((Ne=$.defaults)==null?void 0:Ne.model)||(I!=="-"?Ur(I):null),C=F??A??null,z=kg((ae=$.entry)==null?void 0:ae.model),y=z?z.join(", "):"",_=((et=o==null?void 0:o.name)==null?void 0:et.trim())||((Ie=(te=t.identity)==null?void 0:te.name)==null?void 0:Ie.trim())||((B=t.name)==null?void 0:B.trim())||((K=$.entry)==null?void 0:K.name)||"-",q=xi(t,o)||"-",P=Array.isArray((Z=$.entry)==null?void 0:Z.skills)?(ie=$.entry)==null?void 0:ie.skills:null,j=(P==null?void 0:P.length)??null,H=s?"Loading…":r?"Unavailable":"",G=!!(e.defaultId&&t.id===e.defaultId);return d`
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
          <div>${_}</div>
          ${H?d`<div class="agent-kv-sub muted">${H}</div>`:w}
        </div>
        <div class="agent-kv">
          <div class="label">Default</div>
          <div>${G?"yes":"no"}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Identity Emoji</div>
          <div>${q}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Skills Filter</div>
          <div>${P?`${j} selected`:"all skills"}</div>
        </div>
      </div>

      <div class="agent-model-select" style="margin-top: 20px;">
        <div class="label">Model Selection</div>
        <div class="row" style="gap: 12px; flex-wrap: wrap;">
          <label class="field" style="min-width: 260px; flex: 1;">
            <span>Primary model${G?" (default)":""}</span>
            <select
              .value=${C??""}
              ?disabled=${!n||a||l}
              @change=${we=>g(t.id,we.target.value||null)}
            >
              ${G?w:d`
                      <option value="">
                        ${A?`Inherit default (${A})`:"Inherit default"}
                      </option>
                    `}
              ${Ag(n,C??void 0)}
            </select>
          </label>
          <label class="field" style="min-width: 260px; flex: 1;">
            <span>Fallbacks (comma-separated)</span>
            <input
              .value=${y}
              ?disabled=${!n||a||l}
              placeholder="provider/model, provider/model"
              @input=${we=>b(t.id,Sg(we.target.value))}
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
            @click=${f}
          >
            ${l?"Saving…":"Save"}
          </button>
        </div>
      </div>
    </section>
  `}function Kr(e){var t;e&&((t=navigator.clipboard)==null||t.writeText(e).catch(()=>{}))}function Vg(e){const{loading:t,saving:n,error:i,content:o,lastSuccessAt:s,dependentFiles:r,onReload:a,onSave:l,onContentChange:c}=e,p=s!=null?new Date(s).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"";return d`
    <section class="card">
      <div class="row" style="justify-content: space-between; align-items: flex-start;">
        <div>
          <div class="card-title">${u("businessKnowledge.title")}</div>
          <div class="card-sub">
            ${u("businessKnowledge.subtitle")}
          </div>
        </div>
        <div class="row" style="gap: 8px; align-items: center;">
          ${p?d`<span class="muted">
                ${u("businessKnowledge.lastSavedAt",{time:p})}
              </span>`:w}
          <button class="btn" ?disabled=${t} @click=${a}>
            ${u(t?"businessKnowledge.actions.reloading":"businessKnowledge.actions.reload")}
          </button>
          <button class="btn btn--primary" ?disabled=${t||n} @click=${()=>l(o)}>
            ${u(n?"businessKnowledge.actions.saving":"businessKnowledge.actions.save")}
          </button>
        </div>
      </div>
      ${i?d`<div class="callout danger" style="margin-top: 12px;">${i}</div>`:w}
      ${r&&(r.mapping_table||r.price_library)?d`
            <div class="callout" style="margin-top: 12px; padding: 12px;">
              <div style="font-weight: 600; margin-bottom: 8px;">
                ${u("businessKnowledge.relatedFiles.title")}
              </div>
              <p class="muted" style="margin: 0 0 10px 0; font-size: 0.9rem;">
                ${u("businessKnowledge.relatedFiles.hint")}
              </p>
              ${r.mapping_table?d`
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; flex-wrap: wrap;">
                      <span style="min-width: 100px;">
                        ${u("businessKnowledge.relatedFiles.mappingTableLabel")}
                      </span>
                      <code style="flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; font-size: 0.85rem;">${r.mapping_table}</code>
                      <button
                        class="btn"
                        style="flex-shrink: 0;"
                        @click=${()=>Kr(r.mapping_table)}
                        title=${u("businessKnowledge.relatedFiles.copyPath")}
                      >
                        ${u("businessKnowledge.relatedFiles.copyPath")}
                      </button>
                    </div>
                  `:w}
              ${r.price_library?d`
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                      <span style="min-width: 100px;">
                        ${u("businessKnowledge.relatedFiles.priceLibraryLabel")}
                      </span>
                      <code style="flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; font-size: 0.85rem;">${r.price_library}</code>
                      <button
                        class="btn"
                        style="flex-shrink: 0;"
                        @click=${()=>Kr(r.price_library)}
                        title=${u("businessKnowledge.relatedFiles.copyPath")}
                      >
                        ${u("businessKnowledge.relatedFiles.copyPath")}
                      </button>
                    </div>
                  `:w}
            </div>
          `:w}
      <div style="margin-top: 16px;">
        <textarea
          class="code-block"
          style="width: 100%; min-height: 360px; font-family: var(--font-mono, monospace); font-size: 0.9rem; padding: 12px; resize: vertical; box-sizing: border-box;"
          .value=${o}
          ?disabled=${t}
          @input=${f=>{const g=f.target;c((g==null?void 0:g.value)??"")}}
          placeholder=${u("businessKnowledge.editor.placeholder")}
        ></textarea>
      </div>
    </section>
  `}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pn=(e,t)=>{var i;const n=e._$AN;if(n===void 0)return!1;for(const o of n)(i=o._$AO)==null||i.call(o,t,!1),pn(o,t);return!0},ri=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while((n==null?void 0:n.size)===0)},Xl=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),Yg(t)}};function Xg(e){this._$AN!==void 0?(ri(this),this._$AM=e,Xl(this)):this._$AM=e}function Jg(e,t=!1,n=0){const i=this._$AH,o=this._$AN;if(o!==void 0&&o.size!==0)if(t)if(Array.isArray(i))for(let s=n;s<i.length;s++)pn(i[s],!1),ri(i[s]);else i!=null&&(pn(i,!1),ri(i));else pn(this,e)}const Yg=e=>{e.type==hs.CHILD&&(e._$AP??(e._$AP=Jg),e._$AQ??(e._$AQ=Xg))};class Zg extends vs{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,n,i){super._$AT(t,n,i),Xl(this),this.isConnected=t._$AU}_$AO(t,n=!0){var i,o;t!==this.isConnected&&(this.isConnected=t,t?(i=this.reconnected)==null||i.call(this):(o=this.disconnected)==null||o.call(this)),n&&(pn(this,t),ri(this))}setValue(t){if(Xf(this._$Ct))this._$Ct._$AI(t,this);else{const n=[...this._$Ct._$AH];n[this._$Ci]=t,this._$Ct._$AI(n,this,0)}}disconnected(){}reconnected(){}}const Zi=new WeakMap,eh=ms(class extends Zg{render(e){return w}update(e,[t]){var i;const n=t!==this.G;return n&&this.G!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=(i=e.options)==null?void 0:i.host,this.rt(this.ct=e.element)),w}rt(e){if(this.isConnected||(e=void 0),typeof this.G=="function"){const t=this.ht??globalThis;let n=Zi.get(t);n===void 0&&(n=new WeakMap,Zi.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){var e,t;return typeof this.G=="function"?(e=Zi.get(this.ht??globalThis))==null?void 0:e.get(this.G):(t=this.G)==null?void 0:t.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Ao extends vs{constructor(t){if(super(t),this.it=w,t.type!==hs.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===w||t==null)return this._t=void 0,this.it=t;if(t===rt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}Ao.directiveName="unsafeHTML",Ao.resultType=1;const Co=ms(Ao);/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:Jl,setPrototypeOf:Hr,isFrozen:th,getPrototypeOf:nh,getOwnPropertyDescriptor:ih}=Object;let{freeze:ke,seal:Le,create:To}=Object,{apply:Eo,construct:Ro}=typeof Reflect<"u"&&Reflect;ke||(ke=function(t){return t});Le||(Le=function(t){return t});Eo||(Eo=function(t,n){for(var i=arguments.length,o=new Array(i>2?i-2:0),s=2;s<i;s++)o[s-2]=arguments[s];return t.apply(n,o)});Ro||(Ro=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),o=1;o<n;o++)i[o-1]=arguments[o];return new t(...i)});const zn=Se(Array.prototype.forEach),oh=Se(Array.prototype.lastIndexOf),jr=Se(Array.prototype.pop),Jt=Se(Array.prototype.push),sh=Se(Array.prototype.splice),Yn=Se(String.prototype.toLowerCase),eo=Se(String.prototype.toString),to=Se(String.prototype.match),Yt=Se(String.prototype.replace),rh=Se(String.prototype.indexOf),ah=Se(String.prototype.trim),Pe=Se(Object.prototype.hasOwnProperty),$e=Se(RegExp.prototype.test),Zt=lh(TypeError);function Se(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),o=1;o<n;o++)i[o-1]=arguments[o];return Eo(e,t,i)}}function lh(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return Ro(e,n)}}function W(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Yn;Hr&&Hr(e,null);let i=t.length;for(;i--;){let o=t[i];if(typeof o=="string"){const s=n(o);s!==o&&(th(t)||(t[i]=s),o=s)}e[o]=!0}return e}function ch(e){for(let t=0;t<e.length;t++)Pe(e,t)||(e[t]=null);return e}function qe(e){const t=To(null);for(const[n,i]of Jl(e))Pe(e,n)&&(Array.isArray(i)?t[n]=ch(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=qe(i):t[n]=i);return t}function en(e,t){for(;e!==null;){const i=ih(e,t);if(i){if(i.get)return Se(i.get);if(typeof i.value=="function")return Se(i.value)}e=nh(e)}function n(){return null}return n}const Gr=ke(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),no=ke(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),io=ke(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),dh=ke(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),oo=ke(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),uh=ke(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Wr=ke(["#text"]),Qr=ke(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),so=ke(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Vr=ke(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Kn=ke(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),ph=Le(/\{\{[\w\W]*|[\w\W]*\}\}/gm),fh=Le(/<%[\w\W]*|[\w\W]*%>/gm),gh=Le(/\$\{[\w\W]*/gm),hh=Le(/^data-[\-\w.\u00B7-\uFFFF]+$/),mh=Le(/^aria-[\-\w]+$/),Yl=Le(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),vh=Le(/^(?:\w+script|data):/i),yh=Le(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Zl=Le(/^html$/i),bh=Le(/^[a-z][.\w]*(-[.\w]+)+$/i);var Xr=Object.freeze({__proto__:null,ARIA_ATTR:mh,ATTR_WHITESPACE:yh,CUSTOM_ELEMENT:bh,DATA_ATTR:hh,DOCTYPE_NAME:Zl,ERB_EXPR:fh,IS_ALLOWED_URI:Yl,IS_SCRIPT_OR_DATA:vh,MUSTACHE_EXPR:ph,TMPLIT_EXPR:gh});const tn={element:1,text:3,progressingInstruction:7,comment:8,document:9},wh=function(){return typeof window>"u"?null:window},$h=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(i=n.getAttribute(o));const s="dompurify"+(i?"#"+i:"");try{return t.createPolicy(s,{createHTML(r){return r},createScriptURL(r){return r}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},Jr=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function ec(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:wh();const t=O=>ec(O);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==tn.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,o=i.currentScript,{DocumentFragment:s,HTMLTemplateElement:r,Node:a,Element:l,NodeFilter:c,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:g,trustedTypes:b}=e,$=l.prototype,k=en($,"cloneNode"),S=en($,"remove"),R=en($,"nextSibling"),I=en($,"childNodes"),F=en($,"parentNode");if(typeof r=="function"){const O=n.createElement("template");O.content&&O.content.ownerDocument&&(n=O.content.ownerDocument)}let A,C="";const{implementation:z,createNodeIterator:y,createDocumentFragment:_,getElementsByTagName:T}=n,{importNode:q}=i;let P=Jr();t.isSupported=typeof Jl=="function"&&typeof F=="function"&&z&&z.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:j,ERB_EXPR:H,TMPLIT_EXPR:G,DATA_ATTR:N,ARIA_ATTR:ne,IS_SCRIPT_OR_DATA:be,ATTR_WHITESPACE:L,CUSTOM_ELEMENT:Y}=Xr;let{IS_ALLOWED_URI:ge}=Xr,Q=null;const Ne=W({},[...Gr,...no,...io,...oo,...Wr]);let ae=null;const et=W({},[...Qr,...so,...Vr,...Kn]);let te=Object.seal(To(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ie=null,B=null;const K=Object.seal(To(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Z=!0,ie=!0,we=!1,Cn=!0,Lt=!1,Tn=!0,ut=!1,Ci=!1,Ti=!1,It=!1,En=!1,Rn=!1,Rs=!0,Ls=!1;const xc="user-content-";let Ei=!0,Wt=!1,Pt={},Oe=null;const Ri=W({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Is=null;const Ps=W({},["audio","video","img","source","image","track"]);let Li=null;const Ds=W({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ln="http://www.w3.org/1998/Math/MathML",In="http://www.w3.org/2000/svg",We="http://www.w3.org/1999/xhtml";let Dt=We,Ii=!1,Pi=null;const kc=W({},[Ln,In,We],eo);let Pn=W({},["mi","mo","mn","ms","mtext"]),Dn=W({},["annotation-xml"]);const Sc=W({},["title","style","font","a","script"]);let Qt=null;const _c=["application/xhtml+xml","text/html"],Ac="text/html";let de=null,Mt=null;const Cc=n.createElement("form"),Ms=function(x){return x instanceof RegExp||x instanceof Function},Di=function(){let x=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Mt&&Mt===x)){if((!x||typeof x!="object")&&(x={}),x=qe(x),Qt=_c.indexOf(x.PARSER_MEDIA_TYPE)===-1?Ac:x.PARSER_MEDIA_TYPE,de=Qt==="application/xhtml+xml"?eo:Yn,Q=Pe(x,"ALLOWED_TAGS")?W({},x.ALLOWED_TAGS,de):Ne,ae=Pe(x,"ALLOWED_ATTR")?W({},x.ALLOWED_ATTR,de):et,Pi=Pe(x,"ALLOWED_NAMESPACES")?W({},x.ALLOWED_NAMESPACES,eo):kc,Li=Pe(x,"ADD_URI_SAFE_ATTR")?W(qe(Ds),x.ADD_URI_SAFE_ATTR,de):Ds,Is=Pe(x,"ADD_DATA_URI_TAGS")?W(qe(Ps),x.ADD_DATA_URI_TAGS,de):Ps,Oe=Pe(x,"FORBID_CONTENTS")?W({},x.FORBID_CONTENTS,de):Ri,Ie=Pe(x,"FORBID_TAGS")?W({},x.FORBID_TAGS,de):qe({}),B=Pe(x,"FORBID_ATTR")?W({},x.FORBID_ATTR,de):qe({}),Pt=Pe(x,"USE_PROFILES")?x.USE_PROFILES:!1,Z=x.ALLOW_ARIA_ATTR!==!1,ie=x.ALLOW_DATA_ATTR!==!1,we=x.ALLOW_UNKNOWN_PROTOCOLS||!1,Cn=x.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Lt=x.SAFE_FOR_TEMPLATES||!1,Tn=x.SAFE_FOR_XML!==!1,ut=x.WHOLE_DOCUMENT||!1,It=x.RETURN_DOM||!1,En=x.RETURN_DOM_FRAGMENT||!1,Rn=x.RETURN_TRUSTED_TYPE||!1,Ti=x.FORCE_BODY||!1,Rs=x.SANITIZE_DOM!==!1,Ls=x.SANITIZE_NAMED_PROPS||!1,Ei=x.KEEP_CONTENT!==!1,Wt=x.IN_PLACE||!1,ge=x.ALLOWED_URI_REGEXP||Yl,Dt=x.NAMESPACE||We,Pn=x.MATHML_TEXT_INTEGRATION_POINTS||Pn,Dn=x.HTML_INTEGRATION_POINTS||Dn,te=x.CUSTOM_ELEMENT_HANDLING||{},x.CUSTOM_ELEMENT_HANDLING&&Ms(x.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(te.tagNameCheck=x.CUSTOM_ELEMENT_HANDLING.tagNameCheck),x.CUSTOM_ELEMENT_HANDLING&&Ms(x.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(te.attributeNameCheck=x.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),x.CUSTOM_ELEMENT_HANDLING&&typeof x.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(te.allowCustomizedBuiltInElements=x.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Lt&&(ie=!1),En&&(It=!0),Pt&&(Q=W({},Wr),ae=[],Pt.html===!0&&(W(Q,Gr),W(ae,Qr)),Pt.svg===!0&&(W(Q,no),W(ae,so),W(ae,Kn)),Pt.svgFilters===!0&&(W(Q,io),W(ae,so),W(ae,Kn)),Pt.mathMl===!0&&(W(Q,oo),W(ae,Vr),W(ae,Kn))),x.ADD_TAGS&&(typeof x.ADD_TAGS=="function"?K.tagCheck=x.ADD_TAGS:(Q===Ne&&(Q=qe(Q)),W(Q,x.ADD_TAGS,de))),x.ADD_ATTR&&(typeof x.ADD_ATTR=="function"?K.attributeCheck=x.ADD_ATTR:(ae===et&&(ae=qe(ae)),W(ae,x.ADD_ATTR,de))),x.ADD_URI_SAFE_ATTR&&W(Li,x.ADD_URI_SAFE_ATTR,de),x.FORBID_CONTENTS&&(Oe===Ri&&(Oe=qe(Oe)),W(Oe,x.FORBID_CONTENTS,de)),x.ADD_FORBID_CONTENTS&&(Oe===Ri&&(Oe=qe(Oe)),W(Oe,x.ADD_FORBID_CONTENTS,de)),Ei&&(Q["#text"]=!0),ut&&W(Q,["html","head","body"]),Q.table&&(W(Q,["tbody"]),delete Ie.tbody),x.TRUSTED_TYPES_POLICY){if(typeof x.TRUSTED_TYPES_POLICY.createHTML!="function")throw Zt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof x.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Zt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');A=x.TRUSTED_TYPES_POLICY,C=A.createHTML("")}else A===void 0&&(A=$h(b,o)),A!==null&&typeof C=="string"&&(C=A.createHTML(""));ke&&ke(x),Mt=x}},Fs=W({},[...no,...io,...dh]),Ns=W({},[...oo,...uh]),Tc=function(x){let E=F(x);(!E||!E.tagName)&&(E={namespaceURI:Dt,tagName:"template"});const M=Yn(x.tagName),se=Yn(E.tagName);return Pi[x.namespaceURI]?x.namespaceURI===In?E.namespaceURI===We?M==="svg":E.namespaceURI===Ln?M==="svg"&&(se==="annotation-xml"||Pn[se]):!!Fs[M]:x.namespaceURI===Ln?E.namespaceURI===We?M==="math":E.namespaceURI===In?M==="math"&&Dn[se]:!!Ns[M]:x.namespaceURI===We?E.namespaceURI===In&&!Dn[se]||E.namespaceURI===Ln&&!Pn[se]?!1:!Ns[M]&&(Sc[M]||!Fs[M]):!!(Qt==="application/xhtml+xml"&&Pi[x.namespaceURI]):!1},Be=function(x){Jt(t.removed,{element:x});try{F(x).removeChild(x)}catch{S(x)}},pt=function(x,E){try{Jt(t.removed,{attribute:E.getAttributeNode(x),from:E})}catch{Jt(t.removed,{attribute:null,from:E})}if(E.removeAttribute(x),x==="is")if(It||En)try{Be(E)}catch{}else try{E.setAttribute(x,"")}catch{}},Os=function(x){let E=null,M=null;if(Ti)x="<remove></remove>"+x;else{const le=to(x,/^[\r\n\t ]+/);M=le&&le[0]}Qt==="application/xhtml+xml"&&Dt===We&&(x='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+x+"</body></html>");const se=A?A.createHTML(x):x;if(Dt===We)try{E=new g().parseFromString(se,Qt)}catch{}if(!E||!E.documentElement){E=z.createDocument(Dt,"template",null);try{E.documentElement.innerHTML=Ii?C:se}catch{}}const he=E.body||E.documentElement;return x&&M&&he.insertBefore(n.createTextNode(M),he.childNodes[0]||null),Dt===We?T.call(E,ut?"html":"body")[0]:ut?E.documentElement:he},Bs=function(x){return y.call(x.ownerDocument||x,x,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Mi=function(x){return x instanceof f&&(typeof x.nodeName!="string"||typeof x.textContent!="string"||typeof x.removeChild!="function"||!(x.attributes instanceof p)||typeof x.removeAttribute!="function"||typeof x.setAttribute!="function"||typeof x.namespaceURI!="string"||typeof x.insertBefore!="function"||typeof x.hasChildNodes!="function")},Us=function(x){return typeof a=="function"&&x instanceof a};function Qe(O,x,E){zn(O,M=>{M.call(t,x,E,Mt)})}const qs=function(x){let E=null;if(Qe(P.beforeSanitizeElements,x,null),Mi(x))return Be(x),!0;const M=de(x.nodeName);if(Qe(P.uponSanitizeElement,x,{tagName:M,allowedTags:Q}),Tn&&x.hasChildNodes()&&!Us(x.firstElementChild)&&$e(/<[/\w!]/g,x.innerHTML)&&$e(/<[/\w!]/g,x.textContent)||x.nodeType===tn.progressingInstruction||Tn&&x.nodeType===tn.comment&&$e(/<[/\w]/g,x.data))return Be(x),!0;if(!(K.tagCheck instanceof Function&&K.tagCheck(M))&&(!Q[M]||Ie[M])){if(!Ie[M]&&Ks(M)&&(te.tagNameCheck instanceof RegExp&&$e(te.tagNameCheck,M)||te.tagNameCheck instanceof Function&&te.tagNameCheck(M)))return!1;if(Ei&&!Oe[M]){const se=F(x)||x.parentNode,he=I(x)||x.childNodes;if(he&&se){const le=he.length;for(let _e=le-1;_e>=0;--_e){const Ve=k(he[_e],!0);Ve.__removalCount=(x.__removalCount||0)+1,se.insertBefore(Ve,R(x))}}}return Be(x),!0}return x instanceof l&&!Tc(x)||(M==="noscript"||M==="noembed"||M==="noframes")&&$e(/<\/no(script|embed|frames)/i,x.innerHTML)?(Be(x),!0):(Lt&&x.nodeType===tn.text&&(E=x.textContent,zn([j,H,G],se=>{E=Yt(E,se," ")}),x.textContent!==E&&(Jt(t.removed,{element:x.cloneNode()}),x.textContent=E)),Qe(P.afterSanitizeElements,x,null),!1)},zs=function(x,E,M){if(Rs&&(E==="id"||E==="name")&&(M in n||M in Cc))return!1;if(!(ie&&!B[E]&&$e(N,E))){if(!(Z&&$e(ne,E))){if(!(K.attributeCheck instanceof Function&&K.attributeCheck(E,x))){if(!ae[E]||B[E]){if(!(Ks(x)&&(te.tagNameCheck instanceof RegExp&&$e(te.tagNameCheck,x)||te.tagNameCheck instanceof Function&&te.tagNameCheck(x))&&(te.attributeNameCheck instanceof RegExp&&$e(te.attributeNameCheck,E)||te.attributeNameCheck instanceof Function&&te.attributeNameCheck(E,x))||E==="is"&&te.allowCustomizedBuiltInElements&&(te.tagNameCheck instanceof RegExp&&$e(te.tagNameCheck,M)||te.tagNameCheck instanceof Function&&te.tagNameCheck(M))))return!1}else if(!Li[E]){if(!$e(ge,Yt(M,L,""))){if(!((E==="src"||E==="xlink:href"||E==="href")&&x!=="script"&&rh(M,"data:")===0&&Is[x])){if(!(we&&!$e(be,Yt(M,L,"")))){if(M)return!1}}}}}}}return!0},Ks=function(x){return x!=="annotation-xml"&&to(x,Y)},Hs=function(x){Qe(P.beforeSanitizeAttributes,x,null);const{attributes:E}=x;if(!E||Mi(x))return;const M={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ae,forceKeepAttr:void 0};let se=E.length;for(;se--;){const he=E[se],{name:le,namespaceURI:_e,value:Ve}=he,Ft=de(le),Fi=Ve;let fe=le==="value"?Fi:ah(Fi);if(M.attrName=Ft,M.attrValue=fe,M.keepAttr=!0,M.forceKeepAttr=void 0,Qe(P.uponSanitizeAttribute,x,M),fe=M.attrValue,Ls&&(Ft==="id"||Ft==="name")&&(pt(le,x),fe=xc+fe),Tn&&$e(/((--!?|])>)|<\/(style|title|textarea)/i,fe)){pt(le,x);continue}if(Ft==="attributename"&&to(fe,"href")){pt(le,x);continue}if(M.forceKeepAttr)continue;if(!M.keepAttr){pt(le,x);continue}if(!Cn&&$e(/\/>/i,fe)){pt(le,x);continue}Lt&&zn([j,H,G],Gs=>{fe=Yt(fe,Gs," ")});const js=de(x.nodeName);if(!zs(js,Ft,fe)){pt(le,x);continue}if(A&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!_e)switch(b.getAttributeType(js,Ft)){case"TrustedHTML":{fe=A.createHTML(fe);break}case"TrustedScriptURL":{fe=A.createScriptURL(fe);break}}if(fe!==Fi)try{_e?x.setAttributeNS(_e,le,fe):x.setAttribute(le,fe),Mi(x)?Be(x):jr(t.removed)}catch{pt(le,x)}}Qe(P.afterSanitizeAttributes,x,null)},Ec=function O(x){let E=null;const M=Bs(x);for(Qe(P.beforeSanitizeShadowDOM,x,null);E=M.nextNode();)Qe(P.uponSanitizeShadowNode,E,null),qs(E),Hs(E),E.content instanceof s&&O(E.content);Qe(P.afterSanitizeShadowDOM,x,null)};return t.sanitize=function(O){let x=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},E=null,M=null,se=null,he=null;if(Ii=!O,Ii&&(O="<!-->"),typeof O!="string"&&!Us(O))if(typeof O.toString=="function"){if(O=O.toString(),typeof O!="string")throw Zt("dirty is not a string, aborting")}else throw Zt("toString is not a function");if(!t.isSupported)return O;if(Ci||Di(x),t.removed=[],typeof O=="string"&&(Wt=!1),Wt){if(O.nodeName){const Ve=de(O.nodeName);if(!Q[Ve]||Ie[Ve])throw Zt("root node is forbidden and cannot be sanitized in-place")}}else if(O instanceof a)E=Os("<!---->"),M=E.ownerDocument.importNode(O,!0),M.nodeType===tn.element&&M.nodeName==="BODY"||M.nodeName==="HTML"?E=M:E.appendChild(M);else{if(!It&&!Lt&&!ut&&O.indexOf("<")===-1)return A&&Rn?A.createHTML(O):O;if(E=Os(O),!E)return It?null:Rn?C:""}E&&Ti&&Be(E.firstChild);const le=Bs(Wt?O:E);for(;se=le.nextNode();)qs(se),Hs(se),se.content instanceof s&&Ec(se.content);if(Wt)return O;if(It){if(En)for(he=_.call(E.ownerDocument);E.firstChild;)he.appendChild(E.firstChild);else he=E;return(ae.shadowroot||ae.shadowrootmode)&&(he=q.call(i,he,!0)),he}let _e=ut?E.outerHTML:E.innerHTML;return ut&&Q["!doctype"]&&E.ownerDocument&&E.ownerDocument.doctype&&E.ownerDocument.doctype.name&&$e(Zl,E.ownerDocument.doctype.name)&&(_e="<!DOCTYPE "+E.ownerDocument.doctype.name+`>
`+_e),Lt&&zn([j,H,G],Ve=>{_e=Yt(_e,Ve," ")}),A&&Rn?A.createHTML(_e):_e},t.setConfig=function(){let O=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Di(O),Ci=!0},t.clearConfig=function(){Mt=null,Ci=!1},t.isValidAttribute=function(O,x,E){Mt||Di({});const M=de(O),se=de(x);return zs(M,se,E)},t.addHook=function(O,x){typeof x=="function"&&Jt(P[O],x)},t.removeHook=function(O,x){if(x!==void 0){const E=oh(P[O],x);return E===-1?void 0:sh(P[O],E,1)[0]}return jr(P[O])},t.removeHooks=function(O){P[O]=[]},t.removeAllHooks=function(){P=Jr()},t}var Lo=ec();function ys(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Rt=ys();function tc(e){Rt=e}var vt={exec:()=>null};function X(e,t=""){let n=typeof e=="string"?e:e.source,i={replace:(o,s)=>{let r=typeof s=="string"?s:s.source;return r=r.replace(xe.caret,"$1"),n=n.replace(o,r),i},getRegex:()=>new RegExp(n,t)};return i}var xh=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),xe={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}>`)},kh=/^(?:[ \t]*(?:\n|$))+/,Sh=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,_h=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,An=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ah=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,bs=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,nc=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ic=X(nc).replace(/bull/g,bs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ch=X(nc).replace(/bull/g,bs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ws=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Th=/^[^\n]+/,$s=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Eh=X(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",$s).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Rh=X(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,bs).getRegex(),Si="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",xs=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Lh=X("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",xs).replace("tag",Si).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),oc=X(ws).replace("hr",An).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Si).getRegex(),Ih=X(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",oc).getRegex(),ks={blockquote:Ih,code:Sh,def:Eh,fences:_h,heading:Ah,hr:An,html:Lh,lheading:ic,list:Rh,newline:kh,paragraph:oc,table:vt,text:Th},Yr=X("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",An).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Si).getRegex(),Ph={...ks,lheading:Ch,table:Yr,paragraph:X(ws).replace("hr",An).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Yr).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Si).getRegex()},Dh={...ks,html:X(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",xs).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:vt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:X(ws).replace("hr",An).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ic).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Mh=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Fh=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,sc=/^( {2,}|\\)\n(?!\s*$)/,Nh=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,_i=/[\p{P}\p{S}]/u,Ss=/[\s\p{P}\p{S}]/u,rc=/[^\s\p{P}\p{S}]/u,Oh=X(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ss).getRegex(),ac=/(?!~)[\p{P}\p{S}]/u,Bh=/(?!~)[\s\p{P}\p{S}]/u,Uh=/(?:[^\s\p{P}\p{S}]|~)/u,lc=/(?![*_])[\p{P}\p{S}]/u,qh=/(?![*_])[\s\p{P}\p{S}]/u,zh=/(?:[^\s\p{P}\p{S}]|[*_])/u,Kh=X(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",xh?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),cc=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Hh=X(cc,"u").replace(/punct/g,_i).getRegex(),jh=X(cc,"u").replace(/punct/g,ac).getRegex(),dc="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Gh=X(dc,"gu").replace(/notPunctSpace/g,rc).replace(/punctSpace/g,Ss).replace(/punct/g,_i).getRegex(),Wh=X(dc,"gu").replace(/notPunctSpace/g,Uh).replace(/punctSpace/g,Bh).replace(/punct/g,ac).getRegex(),Qh=X("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,rc).replace(/punctSpace/g,Ss).replace(/punct/g,_i).getRegex(),Vh=X(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,lc).getRegex(),Xh="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",Jh=X(Xh,"gu").replace(/notPunctSpace/g,zh).replace(/punctSpace/g,qh).replace(/punct/g,lc).getRegex(),Yh=X(/\\(punct)/,"gu").replace(/punct/g,_i).getRegex(),Zh=X(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),em=X(xs).replace("(?:-->|$)","-->").getRegex(),tm=X("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",em).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ai=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,nm=X(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ai).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),uc=X(/^!?\[(label)\]\[(ref)\]/).replace("label",ai).replace("ref",$s).getRegex(),pc=X(/^!?\[(ref)\](?:\[\])?/).replace("ref",$s).getRegex(),im=X("reflink|nolink(?!\\()","g").replace("reflink",uc).replace("nolink",pc).getRegex(),Zr=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,_s={_backpedal:vt,anyPunctuation:Yh,autolink:Zh,blockSkip:Kh,br:sc,code:Fh,del:vt,delLDelim:vt,delRDelim:vt,emStrongLDelim:Hh,emStrongRDelimAst:Gh,emStrongRDelimUnd:Qh,escape:Mh,link:nm,nolink:pc,punctuation:Oh,reflink:uc,reflinkSearch:im,tag:tm,text:Nh,url:vt},om={..._s,link:X(/^!?\[(label)\]\((.*?)\)/).replace("label",ai).getRegex(),reflink:X(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ai).getRegex()},Io={..._s,emStrongRDelimAst:Wh,emStrongLDelim:jh,delLDelim:Vh,delRDelim:Jh,url:X(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Zr).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:X(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Zr).getRegex()},sm={...Io,br:X(sc).replace("{2,}","*").getRegex(),text:X(Io.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Hn={normal:ks,gfm:Ph,pedantic:Dh},nn={normal:_s,gfm:Io,breaks:sm,pedantic:om},rm={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ea=e=>rm[e];function ze(e,t){if(t){if(xe.escapeTest.test(e))return e.replace(xe.escapeReplace,ea)}else if(xe.escapeTestNoEncode.test(e))return e.replace(xe.escapeReplaceNoEncode,ea);return e}function ta(e){try{e=encodeURI(e).replace(xe.percentDecode,"%")}catch{return null}return e}function na(e,t){var s;let n=e.replace(xe.findPipe,(r,a,l)=>{let c=!1,p=a;for(;--p>=0&&l[p]==="\\";)c=!c;return c?"|":" |"}),i=n.split(xe.splitPipe),o=0;if(i[0].trim()||i.shift(),i.length>0&&!((s=i.at(-1))!=null&&s.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;o<i.length;o++)i[o]=i[o].trim().replace(xe.slashPipe,"|");return i}function on(e,t,n){let i=e.length;if(i===0)return"";let o=0;for(;o<i&&e.charAt(i-o-1)===t;)o++;return e.slice(0,i-o)}function am(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function lm(e,t=0){let n=t,i="";for(let o of e)if(o==="	"){let s=4-n%4;i+=" ".repeat(s),n+=s}else i+=o,n++;return i}function ia(e,t,n,i,o){let s=t.href,r=t.title||null,a=e[1].replace(o.other.outputLinkReplace,"$1");i.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:r,text:a,tokens:i.inlineTokens(a)};return i.state.inLink=!1,l}function cm(e,t,n){let i=e.match(n.other.indentCodeCompensation);if(i===null)return t;let o=i[1];return t.split(`
`).map(s=>{let r=s.match(n.other.beginningSpace);if(r===null)return s;let[a]=r;return a.length>=o.length?s.slice(o.length):s}).join(`
`)}var li=class{constructor(e){V(this,"options");V(this,"rules");V(this,"lexer");this.options=e||Rt}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:on(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],i=cm(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let i=on(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:on(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=on(t[0],`
`).split(`
`),i="",o="",s=[];for(;n.length>0;){let r=!1,a=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))a.push(n[l]),r=!0;else if(!r)a.push(n[l]);else break;n=n.slice(l);let c=a.join(`
`),p=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,o=o?`${o}
${p}`:p;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,s,!0),this.lexer.state.top=f,n.length===0)break;let g=s.at(-1);if((g==null?void 0:g.type)==="code")break;if((g==null?void 0:g.type)==="blockquote"){let b=g,$=b.raw+`
`+n.join(`
`),k=this.blockquote($);s[s.length-1]=k,i=i.substring(0,i.length-b.raw.length)+k.raw,o=o.substring(0,o.length-b.text.length)+k.text;break}else if((g==null?void 0:g.type)==="list"){let b=g,$=b.raw+`
`+n.join(`
`),k=this.list($);s[s.length-1]=k,i=i.substring(0,i.length-g.raw.length)+k.raw,o=o.substring(0,o.length-b.raw.length)+k.raw,n=$.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:s,text:o}}}list(e){var n,i;let t=this.rules.block.list.exec(e);if(t){let o=t[1].trim(),s=o.length>1,r={type:"list",raw:"",ordered:s,start:s?+o.slice(0,-1):"",loose:!1,items:[]};o=s?`\\d{1,9}\\${o.slice(-1)}`:`\\${o}`,this.options.pedantic&&(o=s?o:"[*+-]");let a=this.rules.other.listItemRegex(o),l=!1;for(;e;){let p=!1,f="",g="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;f=t[0],e=e.substring(f.length);let b=lm(t[2].split(`
`,1)[0],t[1].length),$=e.split(`
`,1)[0],k=!b.trim(),S=0;if(this.options.pedantic?(S=2,g=b.trimStart()):k?S=t[1].length+1:(S=b.search(this.rules.other.nonSpaceChar),S=S>4?1:S,g=b.slice(S),S+=t[1].length),k&&this.rules.other.blankLine.test($)&&(f+=$+`
`,e=e.substring($.length+1),p=!0),!p){let R=this.rules.other.nextBulletRegex(S),I=this.rules.other.hrRegex(S),F=this.rules.other.fencesBeginRegex(S),A=this.rules.other.headingBeginRegex(S),C=this.rules.other.htmlBeginRegex(S),z=this.rules.other.blockquoteBeginRegex(S);for(;e;){let y=e.split(`
`,1)[0],_;if($=y,this.options.pedantic?($=$.replace(this.rules.other.listReplaceNesting,"  "),_=$):_=$.replace(this.rules.other.tabCharGlobal,"    "),F.test($)||A.test($)||C.test($)||z.test($)||R.test($)||I.test($))break;if(_.search(this.rules.other.nonSpaceChar)>=S||!$.trim())g+=`
`+_.slice(S);else{if(k||b.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||F.test(b)||A.test(b)||I.test(b))break;g+=`
`+$}k=!$.trim(),f+=y+`
`,e=e.substring(y.length+1),b=_.slice(S)}}r.loose||(l?r.loose=!0:this.rules.other.doubleBlankLine.test(f)&&(l=!0)),r.items.push({type:"list_item",raw:f,task:!!this.options.gfm&&this.rules.other.listIsTask.test(g),loose:!1,text:g,tokens:[]}),r.raw+=f}let c=r.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;r.raw=r.raw.trimEnd();for(let p of r.items){if(this.lexer.state.top=!1,p.tokens=this.lexer.blockTokens(p.text,[]),p.task){if(p.text=p.text.replace(this.rules.other.listReplaceTask,""),((n=p.tokens[0])==null?void 0:n.type)==="text"||((i=p.tokens[0])==null?void 0:i.type)==="paragraph"){p.tokens[0].raw=p.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),p.tokens[0].text=p.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let g=this.lexer.inlineQueue.length-1;g>=0;g--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[g].src)){this.lexer.inlineQueue[g].src=this.lexer.inlineQueue[g].src.replace(this.rules.other.listReplaceTask,"");break}}let f=this.rules.other.listTaskCheckbox.exec(p.raw);if(f){let g={type:"checkbox",raw:f[0]+" ",checked:f[0]!=="[ ]"};p.checked=g.checked,r.loose?p.tokens[0]&&["paragraph","text"].includes(p.tokens[0].type)&&"tokens"in p.tokens[0]&&p.tokens[0].tokens?(p.tokens[0].raw=g.raw+p.tokens[0].raw,p.tokens[0].text=g.raw+p.tokens[0].text,p.tokens[0].tokens.unshift(g)):p.tokens.unshift({type:"paragraph",raw:g.raw,text:g.raw,tokens:[g]}):p.tokens.unshift(g)}}if(!r.loose){let f=p.tokens.filter(b=>b.type==="space"),g=f.length>0&&f.some(b=>this.rules.other.anyLine.test(b.raw));r.loose=g}}if(r.loose)for(let p of r.items){p.loose=!0;for(let f of p.tokens)f.type==="text"&&(f.type="paragraph")}return r}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:o}}}table(e){var r;let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=na(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=(r=t[3])!=null&&r.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(let a of i)this.rules.other.tableAlignRight.test(a)?s.align.push("right"):this.rules.other.tableAlignCenter.test(a)?s.align.push("center"):this.rules.other.tableAlignLeft.test(a)?s.align.push("left"):s.align.push(null);for(let a=0;a<n.length;a++)s.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:s.align[a]});for(let a of o)s.rows.push(na(a,s.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:s.align[c]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=on(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=am(t[2],"()");if(s===-2)return;if(s>-1){let r=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(i);s&&(i=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),ia(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[i.toLowerCase()];if(!o){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return ia(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(i[1]||i[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...i[0]].length-1,s,r,a=o,l=0,c=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+o);(i=c.exec(t))!=null;){if(s=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!s)continue;if(r=[...s].length,i[3]||i[4]){a+=r;continue}else if((i[5]||i[6])&&o%3&&!((o+r)%3)){l+=r;continue}if(a-=r,a>0)continue;r=Math.min(r,r+a+l);let p=[...i[0]][0].length,f=e.slice(0,o+i.index+p+r);if(Math.min(o,r)%2){let b=f.slice(1,-1);return{type:"em",raw:f,text:b,tokens:this.lexer.inlineTokens(b)}}let g=f.slice(2,-2);return{type:"strong",raw:f,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e,t,n=""){let i=this.rules.inline.delLDelim.exec(e);if(i&&(!i[1]||!n||this.rules.inline.punctuation.exec(n))){let o=[...i[0]].length-1,s,r,a=o,l=this.rules.inline.delRDelim;for(l.lastIndex=0,t=t.slice(-1*e.length+o);(i=l.exec(t))!=null;){if(s=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!s||(r=[...s].length,r!==o))continue;if(i[3]||i[4]){a+=r;continue}if(a-=r,a>0)continue;r=Math.min(r,r+a);let c=[...i[0]][0].length,p=e.slice(0,o+i.index+c+r),f=p.slice(o,-o);return{type:"del",raw:p,text:f,tokens:this.lexer.inlineTokens(f)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,o;if(t[2]==="@")i=t[0],o="mailto:"+i;else{let s;do s=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(s!==t[0]);i=t[0],t[1]==="www."?o="http://"+t[0]:o=t[0]}return{type:"link",raw:t[0],text:i,href:o,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Me=class Po{constructor(t){V(this,"tokens");V(this,"options");V(this,"state");V(this,"inlineQueue");V(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Rt,this.options.tokenizer=this.options.tokenizer||new li,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:xe,block:Hn.normal,inline:nn.normal};this.options.pedantic?(n.block=Hn.pedantic,n.inline=nn.pedantic):this.options.gfm&&(n.block=Hn.gfm,this.options.breaks?n.inline=nn.breaks:n.inline=nn.gfm),this.tokenizer.rules=n}static get rules(){return{block:Hn,inline:nn}}static lex(t,n){return new Po(n).lex(t)}static lexInline(t,n){return new Po(n).inlineTokens(t)}lex(t){t=t.replace(xe.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var o,s,r;for(this.options.pedantic&&(t=t.replace(xe.tabCharGlobal,"    ").replace(xe.spaceLine,""));t;){let a;if((s=(o=this.options.extensions)==null?void 0:o.block)!=null&&s.some(c=>(a=c.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.space(t)){t=t.substring(a.raw.length);let c=n.at(-1);a.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(a);continue}if(a=this.tokenizer.code(t)){t=t.substring(a.raw.length);let c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=(c.raw.endsWith(`
`)?"":`
`)+a.raw,c.text+=`
`+a.text,this.inlineQueue.at(-1).src=c.text):n.push(a);continue}if(a=this.tokenizer.fences(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.heading(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.hr(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.blockquote(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.list(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.html(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.def(t)){t=t.substring(a.raw.length);let c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=(c.raw.endsWith(`
`)?"":`
`)+a.raw,c.text+=`
`+a.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[a.tag]||(this.tokens.links[a.tag]={href:a.href,title:a.title},n.push(a));continue}if(a=this.tokenizer.table(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.lheading(t)){t=t.substring(a.raw.length),n.push(a);continue}let l=t;if((r=this.options.extensions)!=null&&r.startBlock){let c=1/0,p=t.slice(1),f;this.options.extensions.startBlock.forEach(g=>{f=g.call({lexer:this},p),typeof f=="number"&&f>=0&&(c=Math.min(c,f))}),c<1/0&&c>=0&&(l=t.substring(0,c+1))}if(this.state.top&&(a=this.tokenizer.paragraph(l))){let c=n.at(-1);i&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=(c.raw.endsWith(`
`)?"":`
`)+a.raw,c.text+=`
`+a.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(a),i=l.length!==t.length,t=t.substring(a.raw.length);continue}if(a=this.tokenizer.text(t)){t=t.substring(a.raw.length);let c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=(c.raw.endsWith(`
`)?"":`
`)+a.raw,c.text+=`
`+a.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(a);continue}if(t){let c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var l,c,p,f,g;let i=t,o=null;if(this.tokens.links){let b=Object.keys(this.tokens.links);if(b.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)b.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,o.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)s=o[2]?o[2].length:0,i=i.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);i=((c=(l=this.options.hooks)==null?void 0:l.emStrongMask)==null?void 0:c.call({lexer:this},i))??i;let r=!1,a="";for(;t;){r||(a=""),r=!1;let b;if((f=(p=this.options.extensions)==null?void 0:p.inline)!=null&&f.some(k=>(b=k.call({lexer:this},t,n))?(t=t.substring(b.raw.length),n.push(b),!0):!1))continue;if(b=this.tokenizer.escape(t)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.tag(t)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.link(t)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(b.raw.length);let k=n.at(-1);b.type==="text"&&(k==null?void 0:k.type)==="text"?(k.raw+=b.raw,k.text+=b.text):n.push(b);continue}if(b=this.tokenizer.emStrong(t,i,a)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.codespan(t)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.br(t)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.del(t,i,a)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.autolink(t)){t=t.substring(b.raw.length),n.push(b);continue}if(!this.state.inLink&&(b=this.tokenizer.url(t))){t=t.substring(b.raw.length),n.push(b);continue}let $=t;if((g=this.options.extensions)!=null&&g.startInline){let k=1/0,S=t.slice(1),R;this.options.extensions.startInline.forEach(I=>{R=I.call({lexer:this},S),typeof R=="number"&&R>=0&&(k=Math.min(k,R))}),k<1/0&&k>=0&&($=t.substring(0,k+1))}if(b=this.tokenizer.inlineText($)){t=t.substring(b.raw.length),b.raw.slice(-1)!=="_"&&(a=b.raw.slice(-1)),r=!0;let k=n.at(-1);(k==null?void 0:k.type)==="text"?(k.raw+=b.raw,k.text+=b.text):n.push(b);continue}if(t){let k="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(k);break}else throw new Error(k)}}return n}},ci=class{constructor(e){V(this,"options");V(this,"parser");this.options=e||Rt}space(e){return""}code({text:e,lang:t,escaped:n}){var s;let i=(s=(t||"").match(xe.notSpaceStart))==null?void 0:s[0],o=e.replace(xe.endingNewline,"")+`
`;return i?'<pre><code class="language-'+ze(i)+'">'+(n?o:ze(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:ze(o,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,i="";for(let r=0;r<e.items.length;r++){let a=e.items[r];i+=this.listitem(a)}let o=t?"ol":"ul",s=t&&n!==1?' start="'+n+'"':"";return"<"+o+s+`>
`+i+"</"+o+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let o=0;o<e.header.length;o++)n+=this.tablecell(e.header[o]);t+=this.tablerow({text:n});let i="";for(let o=0;o<e.rows.length;o++){let s=e.rows[o];n="";for(let r=0;r<s.length;r++)n+=this.tablecell(s[r]);i+=this.tablerow({text:n})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+i+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${ze(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let i=this.parser.parseInline(n),o=ta(e);if(o===null)return i;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+ze(t)+'"'),s+=">"+i+"</a>",s}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));let o=ta(e);if(o===null)return ze(n);e=o;let s=`<img src="${e}" alt="${ze(n)}"`;return t&&(s+=` title="${ze(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:ze(e.text)}},As=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Fe=class Do{constructor(t){V(this,"options");V(this,"renderer");V(this,"textRenderer");this.options=t||Rt,this.options.renderer=this.options.renderer||new ci,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new As}static parse(t,n){return new Do(n).parse(t)}static parseInline(t,n){return new Do(n).parseInline(t)}parse(t){var i,o;let n="";for(let s=0;s<t.length;s++){let r=t[s];if((o=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&o[r.type]){let l=r,c=this.options.extensions.renderers[l.type].call({parser:this},l);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(l.type)){n+=c||"";continue}}let a=r;switch(a.type){case"space":{n+=this.renderer.space(a);break}case"hr":{n+=this.renderer.hr(a);break}case"heading":{n+=this.renderer.heading(a);break}case"code":{n+=this.renderer.code(a);break}case"table":{n+=this.renderer.table(a);break}case"blockquote":{n+=this.renderer.blockquote(a);break}case"list":{n+=this.renderer.list(a);break}case"checkbox":{n+=this.renderer.checkbox(a);break}case"html":{n+=this.renderer.html(a);break}case"def":{n+=this.renderer.def(a);break}case"paragraph":{n+=this.renderer.paragraph(a);break}case"text":{n+=this.renderer.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}parseInline(t,n=this.renderer){var o,s;let i="";for(let r=0;r<t.length;r++){let a=t[r];if((s=(o=this.options.extensions)==null?void 0:o.renderers)!=null&&s[a.type]){let c=this.options.extensions.renderers[a.type].call({parser:this},a);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type)){i+=c||"";continue}}let l=a;switch(l.type){case"escape":{i+=n.text(l);break}case"html":{i+=n.html(l);break}case"link":{i+=n.link(l);break}case"image":{i+=n.image(l);break}case"checkbox":{i+=n.checkbox(l);break}case"strong":{i+=n.strong(l);break}case"em":{i+=n.em(l);break}case"codespan":{i+=n.codespan(l);break}case"br":{i+=n.br(l);break}case"del":{i+=n.del(l);break}case"text":{i+=n.text(l);break}default:{let c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},Gn,sn=(Gn=class{constructor(e){V(this,"options");V(this,"block");this.options=e||Rt}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Me.lex:Me.lexInline}provideParser(){return this.block?Fe.parse:Fe.parseInline}},V(Gn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),V(Gn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Gn),dm=class{constructor(...e){V(this,"defaults",ys());V(this,"options",this.setOptions);V(this,"parse",this.parseMarkdown(!0));V(this,"parseInline",this.parseMarkdown(!1));V(this,"Parser",Fe);V(this,"Renderer",ci);V(this,"TextRenderer",As);V(this,"Lexer",Me);V(this,"Tokenizer",li);V(this,"Hooks",sn);this.use(...e)}walkTokens(e,t){var i,o;let n=[];for(let s of e)switch(n=n.concat(t.call(this,s)),s.type){case"table":{let r=s;for(let a of r.header)n=n.concat(this.walkTokens(a.tokens,t));for(let a of r.rows)for(let l of a)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{let r=s;n=n.concat(this.walkTokens(r.items,t));break}default:{let r=s;(o=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&o[r.type]?this.defaults.extensions.childTokens[r.type].forEach(a=>{let l=r[a].flat(1/0);n=n.concat(this.walkTokens(l,t))}):r.tokens&&(n=n.concat(this.walkTokens(r.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...r){let a=o.renderer.apply(this,r);return a===!1&&(a=s.apply(this,r)),a}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),i.extensions=t),n.renderer){let o=this.defaults.renderer||new ci(this.defaults);for(let s in n.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let r=s,a=n.renderer[r],l=o[r];o[r]=(...c)=>{let p=a.apply(o,c);return p===!1&&(p=l.apply(o,c)),p||""}}i.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new li(this.defaults);for(let s in n.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let r=s,a=n.tokenizer[r],l=o[r];o[r]=(...c)=>{let p=a.apply(o,c);return p===!1&&(p=l.apply(o,c)),p}}i.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new sn;for(let s in n.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let r=s,a=n.hooks[r],l=o[r];sn.passThroughHooks.has(s)?o[r]=c=>{if(this.defaults.async&&sn.passThroughHooksRespectAsync.has(s))return(async()=>{let f=await a.call(o,c);return l.call(o,f)})();let p=a.call(o,c);return l.call(o,p)}:o[r]=(...c)=>{if(this.defaults.async)return(async()=>{let f=await a.apply(o,c);return f===!1&&(f=await l.apply(o,c)),f})();let p=a.apply(o,c);return p===!1&&(p=l.apply(o,c)),p}}i.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,s=n.walkTokens;i.walkTokens=function(r){let a=[];return a.push(s.call(this,r)),o&&(a=a.concat(o.call(this,r))),a}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Me.lex(e,t??this.defaults)}parser(e,t){return Fe.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let i={...n},o={...this.defaults,...i},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&i.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let r=o.hooks?await o.hooks.preprocess(t):t,a=await(o.hooks?await o.hooks.provideLexer():e?Me.lex:Me.lexInline)(r,o),l=o.hooks?await o.hooks.processAllTokens(a):a;o.walkTokens&&await Promise.all(this.walkTokens(l,o.walkTokens));let c=await(o.hooks?await o.hooks.provideParser():e?Fe.parse:Fe.parseInline)(l,o);return o.hooks?await o.hooks.postprocess(c):c})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let r=(o.hooks?o.hooks.provideLexer():e?Me.lex:Me.lexInline)(t,o);o.hooks&&(r=o.hooks.processAllTokens(r)),o.walkTokens&&this.walkTokens(r,o.walkTokens);let a=(o.hooks?o.hooks.provideParser():e?Fe.parse:Fe.parseInline)(r,o);return o.hooks&&(a=o.hooks.postprocess(a)),a}catch(r){return s(r)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let i="<p>An error occurred:</p><pre>"+ze(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},Ct=new dm;function J(e,t){return Ct.parse(e,t)}J.options=J.setOptions=function(e){return Ct.setOptions(e),J.defaults=Ct.defaults,tc(J.defaults),J};J.getDefaults=ys;J.defaults=Rt;J.use=function(...e){return Ct.use(...e),J.defaults=Ct.defaults,tc(J.defaults),J};J.walkTokens=function(e,t){return Ct.walkTokens(e,t)};J.parseInline=Ct.parseInline;J.Parser=Fe;J.parser=Fe.parse;J.Renderer=ci;J.TextRenderer=As;J.Lexer=Me;J.lexer=Me.lex;J.Tokenizer=li;J.Hooks=sn;J.parse=J;J.options;J.setOptions;J.use;J.walkTokens;J.parseInline;Fe.parse;Me.lex;J.setOptions({gfm:!0,breaks:!0});const um=["a","b","blockquote","br","code","del","em","h1","h2","h3","h4","hr","i","li","ol","p","pre","strong","table","tbody","td","th","thead","tr","ul","img"],pm=["class","href","rel","target","title","start","src","alt"],oa={ALLOWED_TAGS:um,ALLOWED_ATTR:pm,ADD_DATA_URI_TAGS:["img"]};let sa=!1;const fm=14e4,gm=4e4,hm=200,ro=5e4,bt=new Map;function mm(e){const t=bt.get(e);return t===void 0?null:(bt.delete(e),bt.set(e,t),t)}function ra(e,t){if(bt.set(e,t),bt.size<=hm)return;const n=bt.keys().next().value;n&&bt.delete(n)}function vm(){sa||(sa=!0,Lo.addHook("afterSanitizeAttributes",e=>{!(e instanceof HTMLAnchorElement)||!e.getAttribute("href")||(e.setAttribute("rel","noreferrer noopener"),e.setAttribute("target","_blank"))}))}function Mo(e){const t=e.trim();if(!t)return"";if(vm(),t.length<=ro){const r=mm(t);if(r!==null)return r}const n=Ga(t,fm),i=n.truncated?`

… truncated (${n.total} chars, showing first ${n.text.length}).`:"";if(n.text.length>gm){const a=`<pre class="code-block">${gc(`${n.text}${i}`)}</pre>`,l=Lo.sanitize(a,oa);return t.length<=ro&&ra(t,l),l}const o=J.parse(`${n.text}${i}`,{renderer:fc}),s=Lo.sanitize(o,oa);return t.length<=ro&&ra(t,s),s}const fc=new J.Renderer;fc.html=({text:e})=>gc(e);function gc(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const ym=new RegExp("\\p{Script=Hebrew}|\\p{Script=Arabic}|\\p{Script=Syriac}|\\p{Script=Thaana}|\\p{Script=Nko}|\\p{Script=Samaritan}|\\p{Script=Mandaic}|\\p{Script=Adlam}|\\p{Script=Phoenician}|\\p{Script=Lydian}","u");function hc(e,t=/[\s\p{P}\p{S}]/u){if(!e)return"ltr";for(const n of e)if(!t.test(n))return ym.test(n)?"rtl":"ltr";return"ltr"}const bm=1500,wm=2e3,mc="Copy as markdown",$m="Copied",xm="Copy failed";async function km(e){if(!e)return!1;try{return await navigator.clipboard.writeText(e),!0}catch{return!1}}function jn(e,t){e.title=t,e.setAttribute("aria-label",t)}function Sm(e){const t=e.label??mc;return d`
    <button
      class="chat-copy-btn"
      type="button"
      title=${t}
      aria-label=${t}
      @click=${async n=>{const i=n.currentTarget;if(!i||i.dataset.copying==="1")return;i.dataset.copying="1",i.setAttribute("aria-busy","true"),i.disabled=!0;const o=await km(e.text());if(i.isConnected){if(delete i.dataset.copying,i.removeAttribute("aria-busy"),i.disabled=!1,!o){i.dataset.error="1",jn(i,xm),window.setTimeout(()=>{i.isConnected&&(delete i.dataset.error,jn(i,t))},wm);return}i.dataset.copied="1",jn(i,$m),window.setTimeout(()=>{i.isConnected&&(delete i.dataset.copied,jn(i,t))},bm)}}}
    >
      <span class="chat-copy-btn__icon" aria-hidden="true">
        <span class="chat-copy-btn__icon-copy">${pe.copy}</span>
        <span class="chat-copy-btn__icon-check">${pe.check}</span>
      </span>
    </button>
  `}function _m(e){return Sm({text:()=>e,label:mc})}function vc(e){const t=e;let n=typeof t.role=="string"?t.role:"unknown";const i=typeof t.toolCallId=="string"||typeof t.tool_call_id=="string",o=t.content,s=Array.isArray(o)?o:null,r=Array.isArray(s)&&s.some(f=>{const g=f,b=(typeof g.type=="string"?g.type:"").toLowerCase();return b==="toolresult"||b==="tool_result"}),a=typeof t.toolName=="string"||typeof t.tool_name=="string";(i||r||a)&&(n="toolResult");let l=[];typeof t.content=="string"?l=[{type:"text",text:t.content}]:Array.isArray(t.content)?l=t.content.map(f=>({type:f.type||"text",text:f.text,name:f.name,args:f.args||f.arguments})):typeof t.text=="string"&&(l=[{type:"text",text:t.text}]);const c=typeof t.timestamp=="number"?t.timestamp:Date.now(),p=typeof t.id=="string"?t.id:void 0;return{role:n,content:l,timestamp:c,id:p}}function Cs(e){const t=e.toLowerCase();return e==="user"||e==="User"?e:e==="assistant"?"assistant":e==="system"?"system":t==="toolresult"||t==="tool_result"||t==="tool"||t==="function"?"tool":e}function yc(e){const t=e,n=typeof t.role=="string"?t.role.toLowerCase():"";return n==="toolresult"||n==="tool_result"}function Am(e){return(e??"").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())||"Tool"}function Cm(e){const t=(e??"").trim();return t?t.replace(/\s+/g,"_").toLowerCase():""}function Tm(e){return(e??"").trim().toLowerCase()||"use"}const Em={icon:"puzzle",detailKeys:["command","path","url","targetUrl","targetId","ref","element","node","nodeId","id","requestId","to","channelId","guildId","userId","name","query","pattern","messageId"]},Rm={bash:{icon:"wrench",title:"Bash",detailKeys:["command"]},process:{icon:"wrench",title:"Process",detailKeys:["sessionId"]},read:{icon:"fileText",title:"Read",detailKeys:["path"]},write:{icon:"edit",title:"Write",detailKeys:["path"]},edit:{icon:"penLine",title:"Edit",detailKeys:["path"]},attach:{icon:"paperclip",title:"Attach",detailKeys:["path","url","fileName"]},browser:{icon:"globe",title:"Browser",actions:{status:{label:"status"},start:{label:"start"},stop:{label:"stop"},tabs:{label:"tabs"},open:{label:"open",detailKeys:["targetUrl"]},focus:{label:"focus",detailKeys:["targetId"]},close:{label:"close",detailKeys:["targetId"]},snapshot:{label:"snapshot",detailKeys:["targetUrl","targetId","ref","element","format"]},screenshot:{label:"screenshot",detailKeys:["targetUrl","targetId","ref","element"]},navigate:{label:"navigate",detailKeys:["targetUrl","targetId"]},console:{label:"console",detailKeys:["level","targetId"]},pdf:{label:"pdf",detailKeys:["targetId"]},upload:{label:"upload",detailKeys:["paths","ref","inputRef","element","targetId"]},dialog:{label:"dialog",detailKeys:["accept","promptText","targetId"]},act:{label:"act",detailKeys:["request.kind","request.ref","request.selector","request.text","request.value"]}}},canvas:{icon:"image",title:"Canvas",actions:{present:{label:"present",detailKeys:["target","node","nodeId"]},hide:{label:"hide",detailKeys:["node","nodeId"]},navigate:{label:"navigate",detailKeys:["url","node","nodeId"]},eval:{label:"eval",detailKeys:["javaScript","node","nodeId"]},snapshot:{label:"snapshot",detailKeys:["format","node","nodeId"]},a2ui_push:{label:"A2UI push",detailKeys:["jsonlPath","node","nodeId"]},a2ui_reset:{label:"A2UI reset",detailKeys:["node","nodeId"]}}},nodes:{icon:"smartphone",title:"Nodes",actions:{status:{label:"status"},describe:{label:"describe",detailKeys:["node","nodeId"]},pending:{label:"pending"},approve:{label:"approve",detailKeys:["requestId"]},reject:{label:"reject",detailKeys:["requestId"]},notify:{label:"notify",detailKeys:["node","nodeId","title","body"]},camera_snap:{label:"camera snap",detailKeys:["node","nodeId","facing","deviceId"]},camera_list:{label:"camera list",detailKeys:["node","nodeId"]},camera_clip:{label:"camera clip",detailKeys:["node","nodeId","facing","duration","durationMs"]},screen_record:{label:"screen record",detailKeys:["node","nodeId","duration","durationMs","fps","screenIndex"]}}},cron:{icon:"loader",title:"Cron",actions:{status:{label:"status"},list:{label:"list"},add:{label:"add",detailKeys:["job.name","job.id","job.schedule","job.cron"]},update:{label:"update",detailKeys:["id"]},remove:{label:"remove",detailKeys:["id"]},run:{label:"run",detailKeys:["id"]},runs:{label:"runs",detailKeys:["id"]},wake:{label:"wake",detailKeys:["text","mode"]}}},gateway:{icon:"plug",title:"Gateway",actions:{restart:{label:"restart",detailKeys:["reason","delayMs"]},"config.get":{label:"config get"},"config.schema":{label:"config schema"},"config.apply":{label:"config apply",detailKeys:["restartDelayMs"]},"update.run":{label:"update run",detailKeys:["restartDelayMs"]}}},whatsapp_login:{icon:"circle",title:"WhatsApp Login",actions:{start:{label:"start"},wait:{label:"wait"}}},discord:{icon:"messageSquare",title:"Discord",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sticker:{label:"sticker",detailKeys:["to","stickerIds"]},poll:{label:"poll",detailKeys:["question","to"]},permissions:{label:"permissions",detailKeys:["channelId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},threadCreate:{label:"thread create",detailKeys:["channelId","name"]},threadList:{label:"thread list",detailKeys:["guildId","channelId"]},threadReply:{label:"thread reply",detailKeys:["channelId","content"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},searchMessages:{label:"search",detailKeys:["guildId","content"]},memberInfo:{label:"member",detailKeys:["guildId","userId"]},roleInfo:{label:"roles",detailKeys:["guildId"]},emojiList:{label:"emoji list",detailKeys:["guildId"]},roleAdd:{label:"role add",detailKeys:["guildId","userId","roleId"]},roleRemove:{label:"role remove",detailKeys:["guildId","userId","roleId"]},channelInfo:{label:"channel",detailKeys:["channelId"]},channelList:{label:"channels",detailKeys:["guildId"]},voiceStatus:{label:"voice",detailKeys:["guildId","userId"]},eventList:{label:"events",detailKeys:["guildId"]},eventCreate:{label:"event create",detailKeys:["guildId","name"]},timeout:{label:"timeout",detailKeys:["guildId","userId"]},kick:{label:"kick",detailKeys:["guildId","userId"]},ban:{label:"ban",detailKeys:["guildId","userId"]}}},slack:{icon:"messageSquare",title:"Slack",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},memberInfo:{label:"member",detailKeys:["userId"]},emojiList:{label:"emoji list"}}}},Lm={fallback:Em,tools:Rm},bc=Lm,aa=bc.fallback??{icon:"puzzle"},Im=bc.tools??{};function Pm(e){if(!e)return e;const t=[{re:/^\/Users\/[^/]+(\/|$)/,replacement:"~$1"},{re:/^\/home\/[^/]+(\/|$)/,replacement:"~$1"},{re:/^C:\\Users\\[^\\]+(\\|$)/i,replacement:"~$1"}];for(const n of t)if(n.re.test(e))return e.replace(n.re,n.replacement);return e}function Dm(e){const t=Cm(e.name),n=t.toLowerCase(),i=Im[n],o=(i==null?void 0:i.icon)??aa.icon??"puzzle",s=(i==null?void 0:i.title)??Am(t),r=(i==null?void 0:i.label)??s,a=e.args&&typeof e.args=="object"?e.args.action:void 0,l=typeof a=="string"?a.trim():void 0,c=n==="web_search"?"search":n==="web_fetch"?"fetch":n.replace(/_/g," ").replace(/\./g," "),p=Tm(l??c);let f;n==="exec"&&(f=void 0),!f&&n==="read"&&(f=void 0),!f&&(n==="write"||n==="edit"||n==="attach")&&(f=void 0),!f&&n==="web_search"&&(f=void 0),!f&&n==="web_fetch"&&(f=void 0);const g=(i==null?void 0:i.detailKeys)??aa.detailKeys??[];return!f&&g.length>0&&(f=void 0),!f&&e.meta&&(f=e.meta),f&&(f=Pm(f)),{name:t,icon:o,title:s,label:r,verb:p,detail:f}}function Mm(e){if(e.detail){if(e.detail.includes(" · ")){const t=e.detail.split(" · ").map(n=>n.trim()).filter(n=>n.length>0).join(", ");return t?`with ${t}`:void 0}return e.detail}}const Fm=80,Nm=2,la=100;function Om(e){const t=e.trim();if(t.startsWith("{")||t.startsWith("["))try{const n=JSON.parse(t);return"```json\n"+JSON.stringify(n,null,2)+"\n```"}catch{}return e}function Bm(e){const t=e.split(`
`),n=t.slice(0,Nm),i=n.join(`
`);return i.length>la?i.slice(0,la)+"…":n.length<t.length?i+"…":i}function Um(e){const t=e,n=qm(t.content),i=[];for(const o of n){const s=(typeof o.type=="string"?o.type:"").toLowerCase();(["toolcall","tool_call","tooluse","tool_use"].includes(s)||typeof o.name=="string"&&o.arguments!=null)&&i.push({kind:"call",name:o.name??"tool",args:zm(o.arguments??o.args)})}for(const o of n){const s=(typeof o.type=="string"?o.type:"").toLowerCase();if(s!=="toolresult"&&s!=="tool_result")continue;const r=Km(o),a=typeof o.name=="string"?o.name:"tool";i.push({kind:"result",name:a,text:r})}if(yc(e)&&!i.some(o=>o.kind==="result")){const o=typeof t.toolName=="string"&&t.toolName||typeof t.tool_name=="string"&&t.tool_name||"tool",s=ds(e)??void 0;i.push({kind:"result",name:o,text:s})}return i}function ca(e,t){var f,g;const n=Dm({name:e.name,args:e.args}),i=Mm(n),o=!!((f=e.text)!=null&&f.trim()),s=!!t,r=s?()=>{if(o){t(Om(e.text));return}const b=`## ${n.label}

${i?`**Command:** \`${i}\`

`:""}*No output — tool completed successfully.*`;t(b)}:void 0,a=o&&(((g=e.text)==null?void 0:g.length)??0)<=Fm,l=o&&!a,c=o&&a,p=!o;return d`
    <div
      class="chat-tool-card ${s?"chat-tool-card--clickable":""}"
      @click=${r}
      role=${s?"button":w}
      tabindex=${s?"0":w}
      @keydown=${s?b=>{b.key!=="Enter"&&b.key!==" "||(b.preventDefault(),r==null||r())}:w}
    >
      <div class="chat-tool-card__header">
        <div class="chat-tool-card__title">
          <span class="chat-tool-card__icon">${pe[n.icon]}</span>
          <span>${n.label}</span>
        </div>
        ${s?d`<span class="chat-tool-card__action">${o?"View":""} ${pe.check}</span>`:w}
        ${p&&!s?d`<span class="chat-tool-card__status">${pe.check}</span>`:w}
      </div>
      ${i?d`<div class="chat-tool-card__detail">${i}</div>`:w}
      ${p?d`
              <div class="chat-tool-card__status-text muted">Completed</div>
            `:w}
      ${l?d`<div class="chat-tool-card__preview mono">${Bm(e.text)}</div>`:w}
      ${c?d`<div class="chat-tool-card__inline mono">${e.text}</div>`:w}
    </div>
  `}function qm(e){return Array.isArray(e)?e.filter(Boolean):[]}function zm(e){if(typeof e!="string")return e;const t=e.trim();if(!t||!t.startsWith("{")&&!t.startsWith("["))return e;try{return JSON.parse(t)}catch{return e}}function Km(e){if(typeof e.text=="string")return e.text;if(typeof e.content=="string")return e.content}function Hm(e){const n=e.content,i=[];if(!Array.isArray(n))return i;for(const o of n){if(typeof o!="object"||o===null)continue;const s=o;if(s.type!=="file"||typeof s.file_name!="string")continue;const r=s.summaryMeta;i.push({file_name:s.file_name,file_path:typeof s.file_path=="string"?s.file_path:void 0,rows_count:r==null?void 0:r.rows_count,preview_count:r==null?void 0:r.preview_count,truncated:r==null?void 0:r.truncated})}return i}function jm(e){const n=e.content,i=[];if(Array.isArray(n))for(const o of n){if(typeof o!="object"||o===null)continue;const s=o;if(s.type==="image"){const r=s.source;if((r==null?void 0:r.type)==="base64"&&typeof r.data=="string"){const a=r.data,l=r.media_type||"image/png",c=a.startsWith("data:")?a:`data:${l};base64,${a}`;i.push({url:c})}else typeof s.url=="string"&&i.push({url:s.url})}else if(s.type==="image_url"){const r=s.image_url;typeof(r==null?void 0:r.url)=="string"&&i.push({url:r.url})}}return i}function Gm(e){return d`
    <div class="chat-group assistant">
      ${Ts("assistant",e)}
      <div class="chat-group-messages">
        <div class="chat-bubble chat-reading-indicator" aria-hidden="true">
          <span class="chat-reading-indicator__dots">
            <span></span><span></span><span></span>
          </span>
        </div>
      </div>
    </div>
  `}function Wm(e,t,n,i){const o=new Date(t).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}),s=(i==null?void 0:i.name)??"Assistant";return d`
    <div class="chat-group assistant">
      ${Ts("assistant",i)}
      <div class="chat-group-messages">
        ${wc({role:"assistant",content:[{type:"text",text:e}],timestamp:t},{isStreaming:!0,showReasoning:!1},n)}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${s}</span>
          <span class="chat-group-timestamp">${o}</span>
        </div>
      </div>
    </div>
  `}function Qm(e,t){const n=Cs(e.role),i=t.assistantName??"Assistant",o=n==="user"?"You":n==="assistant"?i:n,s=n==="user"?"user":n==="assistant"?"assistant":"other",r=new Date(e.timestamp).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return d`
    <div class="chat-group ${s}">
      ${Ts(e.role,{name:i,avatar:t.assistantAvatar??null})}
      <div class="chat-group-messages">
        ${e.messages.map((a,l)=>wc(a.message,{isStreaming:e.isStreaming&&l===e.messages.length-1,showReasoning:t.showReasoning},t.onOpenSidebar))}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${o}</span>
          <span class="chat-group-timestamp">${r}</span>
        </div>
      </div>
    </div>
  `}function Ts(e,t){var a,l;const n=Cs(e),i=((a=t==null?void 0:t.name)==null?void 0:a.trim())||"Assistant",o=((l=t==null?void 0:t.avatar)==null?void 0:l.trim())||"",s=n==="user"?"U":n==="assistant"?i.charAt(0).toUpperCase()||"A":n==="tool"?"⚙":"?",r=n==="user"?"user":n==="assistant"?"assistant":n==="tool"?"tool":"other";return o&&n==="assistant"?Vm(o)?d`<img
        class="chat-avatar ${r}"
        src="${o}"
        alt="${i}"
      />`:d`<div class="chat-avatar ${r}">${o}</div>`:d`<div class="chat-avatar ${r}">${s}</div>`}function Vm(e){return/^https?:\/\//i.test(e)||/^data:image\//i.test(e)||e.startsWith("/")}function Xm(e){return e.length===0?w:d`
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
  `}function Jm(e){return e.length===0?w:d`
    <div class="chat-message-files">
      ${e.map(t=>d`
          <span class="chat-message-file" title=${t.file_path??t.file_name}>
            <span class="chat-message-file__name">${t.file_name}</span>
            ${[t.rows_count!=null?`rows=${t.rows_count}`:"",t.preview_count!=null?`preview=${t.preview_count}`:"",t.truncated?"…truncated":""].filter(Boolean).length?d`<span class="chat-message-file__meta">
                  ${[t.rows_count!=null?`rows=${t.rows_count}`:"",t.preview_count!=null?`preview=${t.preview_count}`:"",t.truncated?"…truncated":""].filter(Boolean).join(" / ")}
                </span>`:w}
          </span>
        `)}
    </div>
  `}function wc(e,t,n){const i=e,o=typeof i.role=="string"?i.role:"unknown",s=yc(e)||o.toLowerCase()==="toolresult"||o.toLowerCase()==="tool_result"||typeof i.toolCallId=="string"||typeof i.tool_call_id=="string",r=Um(e),a=r.length>0,l=jm(e),c=l.length>0,p=Hm(e),f=p.length>0,g=ds(e),b=t.showReasoning&&o==="assistant"?Bp(e):null,$=g!=null&&g.trim()?g:null,k=b?qp(b):null,S=$,R=o==="assistant"&&!!(S!=null&&S.trim()),I=["chat-bubble",R?"has-copy":"",t.isStreaming?"streaming":"","fade-in"].filter(Boolean).join(" ");return!S&&a&&s?d`${r.map(F=>ca(F,n))}`:!S&&!k&&!a&&!c&&!f?w:d`
    <div class="${I}">
      ${R?_m(S):w}
      ${Xm(l)}
      ${Jm(p)}
      ${k?d`<div class="chat-thinking">${Co(Mo(k))}</div>`:w}
      ${S?d`<div class="chat-text" dir="${hc(S)}">${Co(Mo(S))}</div>`:w}
      ${r.map(F=>ca(F,n))}
    </div>
  `}function Ym(e){return d`
    <div class="sidebar-panel">
      <div class="sidebar-header">
        <div class="sidebar-title">Tool Output</div>
        <button @click=${e.onClose} class="btn" title="Close sidebar">
          ${pe.x}
        </button>
      </div>
      <div class="sidebar-content">
        ${e.error?d`
              <div class="callout danger">${e.error}</div>
              <button @click=${e.onViewRawText} class="btn" style="margin-top: 12px;">
                View Raw Text
              </button>
            `:e.content?d`<div class="sidebar-markdown">${Co(Mo(e.content))}</div>`:d`
                  <div class="muted">No content available</div>
                `}
      </div>
    </div>
  `}var Zm=Object.defineProperty,ev=Object.getOwnPropertyDescriptor,Ai=(e,t,n,i)=>{for(var o=i>1?void 0:i?ev(t,n):t,s=e.length-1,r;s>=0;s--)(r=e[s])&&(o=(i?r(t,n,o):r(o))||o);return i&&o&&Zm(t,n,o),o};let Ht=class extends Bt{constructor(){super(...arguments),this.splitRatio=.6,this.minRatio=.4,this.maxRatio=.7,this.isDragging=!1,this.startX=0,this.startRatio=0,this.handleMouseDown=e=>{this.isDragging=!0,this.startX=e.clientX,this.startRatio=this.splitRatio,this.classList.add("dragging"),document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),e.preventDefault()},this.handleMouseMove=e=>{if(!this.isDragging)return;const t=this.parentElement;if(!t)return;const n=t.getBoundingClientRect().width,o=(e.clientX-this.startX)/n;let s=this.startRatio+o;s=Math.max(this.minRatio,Math.min(this.maxRatio,s)),this.dispatchEvent(new CustomEvent("resize",{detail:{splitRatio:s},bubbles:!0,composed:!0}))},this.handleMouseUp=()=>{this.isDragging=!1,this.classList.remove("dragging"),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}}render(){return w}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}};Ht.styles=Pc`
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
  `;Ai([pi({type:Number})],Ht.prototype,"splitRatio",2);Ai([pi({type:Number})],Ht.prototype,"minRatio",2);Ai([pi({type:Number})],Ht.prototype,"maxRatio",2);Ht=Ai([Ia("resizable-divider")],Ht);const tv=5e3,nv=/\.(xlsx|xls|xlsm|pdf)$/i;function iv(e){for(let t=0;t<e.length;t++)if(nv.test(e[t].name))return e[t];return null}function da(e){e.style.height="auto",e.style.height=`${e.scrollHeight}px`}function ov(e){return e?e.active?d`
      <div class="compaction-indicator compaction-indicator--active" role="status" aria-live="polite">
        ${pe.loader} ${u("chat.ui.compaction.active")}
      </div>
    `:e.completedAt&&Date.now()-e.completedAt<tv?d`
        <div class="compaction-indicator compaction-indicator--complete" role="status" aria-live="polite">
          ${pe.check} ${u("chat.ui.compaction.done")}
        </div>
      `:w:w}function sv(){return`att-${Date.now()}-${Math.random().toString(36).slice(2,9)}`}function rv(e,t){var o;const n=(o=e.clipboardData)==null?void 0:o.items;if(!n||!t.onAttachmentsChange)return;const i=[];for(let s=0;s<n.length;s++){const r=n[s];r.type.startsWith("image/")&&i.push(r)}if(i.length!==0){e.preventDefault();for(const s of i){const r=s.getAsFile();if(!r)continue;const a=new FileReader;a.addEventListener("load",()=>{var f;const l=a.result,c={id:sv(),dataUrl:l,mimeType:r.type},p=t.attachments??[];(f=t.onAttachmentsChange)==null||f.call(t,[...p,c])}),a.readAsDataURL(r)}}}function av(e){const t=e.attachments??[];return t.length===0?w:d`
    <div class="chat-attachments">
      ${t.map(n=>d`
          <div class="chat-attachment">
            <img
              src=${n.dataUrl}
              alt=${u("chat.ui.attachments.previewAlt")}
              class="chat-attachment__img"
            />
            <button
              class="chat-attachment__remove"
              type="button"
              aria-label=${u("chat.ui.attachments.remove")}
              @click=${()=>{var o;const i=(e.attachments??[]).filter(s=>s.id!==n.id);(o=e.onAttachmentsChange)==null||o.call(e,i)}}
            >
              ${pe.x}
            </button>
          </div>
        `)}
    </div>
  `}function lv(e){const t=e.uploadedFile,n=e.onFileSelect,i=e.onClearUploadedFile;if(t!=null&&t.file_name){const o=t.summaryMeta;return d`
      <div class="chat-uploaded-file">
        <span class="chat-uploaded-file__name" title=${t.file_path}>${t.file_name}</span>
        <button
          type="button"
          class="btn chat-uploaded-file__clear"
          aria-label=${u("chat.ui.upload.remove")}
          @click=${i}
        >
          ${pe.x}
        </button>
        ${o?d`<span class="chat-uploaded-file__meta">
              ${[o.rows_count!=null?`rows=${o.rows_count}`:"",o.preview_count!=null?`preview=${o.preview_count}`:"",o.truncated?"…truncated":""].filter(Boolean).join(" / ")}
            </span>`:w}
      </div>
    `}return!n||!e.connected?w:d`
    <div class="chat-uploaded-file-row">
      <input
        type="file"
        accept=".xlsx,.xls,.xlsm,.pdf"
        aria-label=${u("chat.ui.upload.label")}
        class="chat-uploaded-file-input"
        @change=${async o=>{var a;const s=o.target,r=(a=s.files)==null?void 0:a[0];r&&(await n(r),s.value="")}}
      />
      <button
        type="button"
        class="btn chat-upload-file-btn"
        @click=${o=>{var s,r;return(r=(s=o.currentTarget.parentElement)==null?void 0:s.querySelector("input[type=file]"))==null?void 0:r.click()}}
      >
        ${u("chat.ui.upload.button")}
      </button>
    </div>
  `}function cv(e){var S,R,I,F;const t=e.connected,n=e.sending||e.stream!==null,i=!!(e.canAbort&&e.onAbort),o=(R=(S=e.sessions)==null?void 0:S.sessions)==null?void 0:R.find(A=>A.key===e.sessionKey),s=e.showThinking&&(o==null?void 0:o.reasoningLevel)!=="off",r={name:e.assistantName,avatar:e.assistantAvatar??e.assistantAvatarUrl??null},a=(((I=e.attachments)==null?void 0:I.length)??0)>0;(F=e.uploadedFile)!=null&&F.file_name;const l=e.connected?u(a?"chat.ui.compose.placeholder.withImages":"chat.ui.compose.placeholder.default"):u("chat.ui.compose.placeholder.disconnected"),c=e.splitRatio??.6,p=!!(e.sidebarOpen&&e.onCloseSidebar),f=d`
    <div
      class="chat-thread"
      role="log"
      aria-live="polite"
      @scroll=${e.onChatScroll}
    >
      ${e.loading?d`
              <div class="muted">Loading chat…</div>
            `:w}
      ${ql(uv(e),A=>A.key,A=>A.kind==="divider"?d`
              <div class="chat-divider" role="separator" data-ts=${String(A.timestamp)}>
                <span class="chat-divider__line"></span>
                <span class="chat-divider__label">${A.label}</span>
                <span class="chat-divider__line"></span>
              </div>
            `:A.kind==="reading-indicator"?Gm(r):A.kind==="stream"?Wm(A.text,A.startedAt,e.onOpenSidebar,r):A.kind==="group"?Qm(A,{onOpenSidebar:e.onOpenSidebar,showReasoning:s,assistantName:e.assistantName,assistantAvatar:r.avatar}):w)}
    </div>
  `,g=A=>{var C;A.preventDefault(),A.stopPropagation(),A.dataTransfer&&(A.dataTransfer.dropEffect="copy"),(C=e.onComposeDragOver)==null||C.call(e)},b=A=>{var C;A.preventDefault(),A.stopPropagation(),A.dataTransfer&&(A.dataTransfer.dropEffect="copy"),(C=e.onComposeDragOver)==null||C.call(e)},$=A=>{var y;const C=A.currentTarget,z=A.relatedTarget;z!=null&&(C.contains(z)||(y=e.onComposeDragLeave)==null||y.call(e))},k=A=>{var z,y,_;A.preventDefault(),A.stopPropagation(),(z=e.onComposeDragLeave)==null||z.call(e);const C=(_=(y=A.dataTransfer)==null?void 0:y.files)!=null&&_.length?iv(A.dataTransfer.files):null;C&&e.onComposeDrop&&e.onComposeDrop(C)};return d`
    <section
      class="card chat ${e.composeDragOver?"chat--drag-over":""}"
      @dragenter=${g}
      @dragover=${b}
      @dragleave=${$}
      @drop=${k}
    >
      ${e.disabledReason?d`<div class="callout">${e.disabledReason}</div>`:w}

      ${e.error?d`<div class="callout danger">${e.error}</div>`:w}

      ${e.focusMode?d`
            <button
              class="chat-focus-exit"
              type="button"
              @click=${e.onToggleFocusMode}
              aria-label=${u("chat.ui.compose.exitFocus")}
              title=${u("chat.ui.compose.exitFocus")}
            >
              ${pe.x}
            </button>
          `:w}

      <div
        class="chat-split-container ${p?"chat-split-container--open":""}"
      >
        <div
          class="chat-main"
          style="flex: ${p?`0 0 ${c*100}%`:"1 1 100%"}"
        >
          ${f}
        </div>

        ${p?d`
              <resizable-divider
                .splitRatio=${c}
                @resize=${A=>{var C;return(C=e.onSplitRatioChange)==null?void 0:C.call(e,A.detail.splitRatio)}}
              ></resizable-divider>
              <div class="chat-sidebar">
                ${Ym({content:e.sidebarContent??null,error:e.sidebarError??null,onClose:e.onCloseSidebar,onViewRawText:()=>{!e.sidebarContent||!e.onOpenSidebar||e.onOpenSidebar(`\`\`\`
${e.sidebarContent}
\`\`\``)}})}
              </div>
            `:w}
      </div>

      ${e.queue.length?d`
            <div class="chat-queue" role="status" aria-live="polite">
              <div class="chat-queue__title">
                ${u("chat.ui.queue.title",{count:String(e.queue.length)})}
              </div>
              <div class="chat-queue__list">
                ${e.queue.map(A=>{var C;return d`
                    <div class="chat-queue__item">
                      <div class="chat-queue__text">
                        ${A.text||((C=A.attachments)!=null&&C.length?u("chat.ui.queue.imageItem",{count:String(A.attachments.length)}):"")}
                      </div>
                      <button
                        class="btn chat-queue__remove"
                        type="button"
                        aria-label=${u("chat.ui.queue.remove")}
                        @click=${()=>e.onQueueRemove(A.id)}
                      >
                        ${pe.x}
                      </button>
                    </div>
                  `})}
              </div>
            </div>
          `:w}

      ${ov(e.compactionStatus)}

      ${e.showNewMessages?d`
            <button
              class="btn chat-new-messages"
              type="button"
              @click=${e.onScrollToBottom}
            >
              ${u("chat.ui.compose.newMessages")} ${pe.arrowDown}
            </button>
          `:w}

      <div class="chat-compose ${e.composeDragOver?"chat-compose--drag-over":""}">
        ${e.composeDragOver?d`<div class="chat-compose__drop-hint">
              ${u("chat.ui.compose.dropHint")}
            </div>`:w}
        ${av(e)}
        ${lv(e)}
        <div class="chat-compose__row">
          <label class="field chat-compose__field">
            <span>${u("chat.ui.compose.label")}</span>
            <textarea
              ${eh(A=>A&&da(A))}
              .value=${e.draft}
              dir=${hc(e.draft)}
              ?disabled=${!e.connected}
              @keydown=${A=>{A.key==="Enter"&&(A.isComposing||A.keyCode===229||A.shiftKey||e.connected&&(A.preventDefault(),t&&e.onSend()))}}
              @input=${A=>{const C=A.target;da(C),e.onDraftChange(C.value)}}
              @paste=${A=>rv(A,e)}
              placeholder=${l}
            ></textarea>
          </label>
          <div class="chat-compose__actions">
            <button
              class="btn"
              ?disabled=${!e.connected||!i&&e.sending}
              @click=${i?e.onAbort:e.onNewSession}
            >
              ${u(i?"chat.ui.compose.stop":"chat.ui.compose.newSession")}
            </button>
            <button
              class="btn primary"
              ?disabled=${!e.connected}
              @click=${e.onSend}
            >
              ${u(n?"chat.ui.compose.queue":"chat.ui.compose.send")}<kbd
                class="btn-kbd"
                >↵</kbd
              >
            </button>
          </div>
        </div>
      </div>
    </section>
  `}const ua=200;function dv(e){const t=[];let n=null;for(const i of e){if(i.kind!=="message"){n&&(t.push(n),n=null),t.push(i);continue}const o=vc(i.message),s=Cs(o.role),r=o.timestamp||Date.now();!n||n.role!==s?(n&&t.push(n),n={kind:"group",key:`group:${s}:${i.key}`,role:s,messages:[{message:i.message,key:i.key}],timestamp:r,isStreaming:!1}):n.messages.push({message:i.message,key:i.key})}return n&&t.push(n),t}function uv(e){var r,a,l;const t=[],n=Array.isArray(e.messages)?e.messages:[],i=Array.isArray(e.toolMessages)?e.toolMessages:[],o=Math.max(0,n.length-ua);o>0&&t.push({kind:"message",key:"chat:history:notice",message:{role:"system",content:`Showing last ${ua} messages (${o} hidden).`,timestamp:Date.now()}});for(let c=o;c<n.length;c++){const p=n[c],f=vc(p),g=((r=ds(p))==null?void 0:r.trim())??"";if(e.toolRenderData&&f.role.toLowerCase()==="assistant"&&g.startsWith(Ep))continue;const $=p.__openclaw;if($&&$.kind==="compaction"){t.push({kind:"divider",key:typeof $.id=="string"?`divider:compaction:${$.id}`:`divider:compaction:${f.timestamp}:${c}`,label:u("chat.ui.compaction.divider"),timestamp:f.timestamp??Date.now()});continue}!e.showThinking&&f.role.toLowerCase()==="toolresult"||t.push({kind:"message",key:pa(p,c),message:p})}if(e.showThinking)for(let c=0;c<i.length;c++)t.push({kind:"message",key:pa(i[c],c+n.length),message:i[c]});const s=((l=(a=e.toolRenderData)==null?void 0:a.formatted_response)==null?void 0:l.trim())??"";if(s){const c=e.toolRenderSeq??Date.now();t.push({kind:"message",key:`tool-render:${e.sessionKey}:${c}`,message:{role:"assistant",content:[{type:"text",text:s}],timestamp:c,__openclaw:{kind:"tool_render",seq:c}}})}if(e.stream!==null){const c=`stream:${e.sessionKey}:${e.streamStartedAt??"live"}`;e.stream.trim().length>0?t.push({kind:"stream",key:c,text:e.stream,startedAt:e.streamStartedAt??Date.now()}):t.push({kind:"reading-indicator",key:c})}return dv(t)}function pa(e,t){const n=e,i=typeof n.toolCallId=="string"?n.toolCallId:"";if(i)return`tool:${i}`;const o=typeof n.id=="string"?n.id:"";if(o)return`msg:${o}`;const s=typeof n.messageId=="string"?n.messageId:"";if(s)return`msg:${s}`;const r=typeof n.timestamp=="number"?n.timestamp:null,a=typeof n.role=="string"?n.role:"unknown";return r!=null?`msg:${a}:${r}:${t}`:`msg:${a}:${t}`}const pv=new Set(["title","description","default","nullable"]);function fv(e){return Object.keys(e??{}).filter(n=>!pv.has(n)).length===0}function gv(e){if(e===void 0)return"";try{return JSON.stringify(e,null,2)??""}catch{return""}}const wn={chevronDown:d`
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
  `};function Tt(e){const{schema:t,value:n,path:i,hints:o,unsupported:s,disabled:r,onPatch:a}=e,l=e.showLabel??!0,c=Te(t),p=Ee(i,o),f=(p==null?void 0:p.label)??t.title??Ze(String(i.at(-1))),g=(p==null?void 0:p.help)??t.description,b=zo(i);if(s.has(b))return d`<div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${f}</div>
      <div class="cfg-field__error">Unsupported schema node. Use Raw mode.</div>
    </div>`;if(t.anyOf||t.oneOf){const k=(t.anyOf??t.oneOf??[]).filter(C=>!(C.type==="null"||Array.isArray(C.type)&&C.type.includes("null")));if(k.length===1)return Tt({...e,schema:k[0]});const S=C=>{if(C.const!==void 0)return C.const;if(C.enum&&C.enum.length===1)return C.enum[0]},R=k.map(S),I=R.every(C=>C!==void 0);if(I&&R.length>0&&R.length<=5){const C=n??t.default;return d`
        <div class="cfg-field">
          ${l?d`<label class="cfg-field__label">${f}</label>`:w}
          ${g?d`<div class="cfg-field__help">${g}</div>`:w}
          <div class="cfg-segmented">
            ${R.map(z=>d`
              <button
                type="button"
                class="cfg-segmented__btn ${z===C||String(z)===String(C)?"active":""}"
                ?disabled=${r}
                @click=${()=>a(i,z)}
              >
                ${String(z)}
              </button>
            `)}
          </div>
        </div>
      `}if(I&&R.length>5)return ga({...e,options:R,value:n??t.default});const F=new Set(k.map(C=>Te(C)).filter(Boolean)),A=new Set([...F].map(C=>C==="integer"?"number":C));if([...A].every(C=>["string","number","boolean"].includes(C))){const C=A.has("string"),z=A.has("number");if(A.has("boolean")&&A.size===1)return Tt({...e,schema:{...t,type:"boolean",anyOf:void 0,oneOf:void 0}});if(C||z)return fa({...e,inputType:z&&!C?"number":"text"})}}if(t.enum){const $=t.enum;if($.length<=5){const k=n??t.default;return d`
        <div class="cfg-field">
          ${l?d`<label class="cfg-field__label">${f}</label>`:w}
          ${g?d`<div class="cfg-field__help">${g}</div>`:w}
          <div class="cfg-segmented">
            ${$.map(S=>d`
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
      `}return ga({...e,options:$,value:n??t.default})}if(c==="object")return mv(e);if(c==="array")return vv(e);if(c==="boolean"){const $=typeof n=="boolean"?n:typeof t.default=="boolean"?t.default:!1;return d`
      <label class="cfg-toggle-row ${r?"disabled":""}">
        <div class="cfg-toggle-row__content">
          <span class="cfg-toggle-row__label">${f}</span>
          ${g?d`<span class="cfg-toggle-row__help">${g}</span>`:w}
        </div>
        <div class="cfg-toggle">
          <input
            type="checkbox"
            .checked=${$}
            ?disabled=${r}
            @change=${k=>a(i,k.target.checked)}
          />
          <span class="cfg-toggle__track"></span>
        </div>
      </label>
    `}return c==="number"||c==="integer"?hv(e):c==="string"?fa({...e,inputType:"text"}):d`
    <div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${f}</div>
      <div class="cfg-field__error">Unsupported type: ${c}. Use Raw mode.</div>
    </div>
  `}function fa(e){const{schema:t,value:n,path:i,hints:o,disabled:s,onPatch:r,inputType:a}=e,l=e.showLabel??!0,c=Ee(i,o),p=(c==null?void 0:c.label)??t.title??Ze(String(i.at(-1))),f=(c==null?void 0:c.help)??t.description,g=((c==null?void 0:c.sensitive)??!1)&&!/^\$\{[^}]*\}$/.test(String(n??"").trim()),b=(c==null?void 0:c.placeholder)??(g?"••••":t.default!==void 0?`Default: ${String(t.default)}`:""),$=n??"";return d`
    <div class="cfg-field">
      ${l?d`<label class="cfg-field__label">${p}</label>`:w}
      ${f?d`<div class="cfg-field__help">${f}</div>`:w}
      <div class="cfg-input-wrap">
        <input
          type=${g?"password":a}
          class="cfg-input"
          placeholder=${b}
          .value=${$==null?"":String($)}
          ?disabled=${s}
          @input=${k=>{const S=k.target.value;if(a==="number"){if(S.trim()===""){r(i,void 0);return}const R=Number(S);r(i,Number.isNaN(R)?S:R);return}r(i,S)}}
          @change=${k=>{if(a==="number")return;const S=k.target.value;r(i,S.trim())}}
        />
        ${t.default!==void 0?d`
          <button
            type="button"
            class="cfg-input__reset"
            title="Reset to default"
            ?disabled=${s}
            @click=${()=>r(i,t.default)}
          >↺</button>
        `:w}
      </div>
    </div>
  `}function hv(e){const{schema:t,value:n,path:i,hints:o,disabled:s,onPatch:r}=e,a=e.showLabel??!0,l=Ee(i,o),c=(l==null?void 0:l.label)??t.title??Ze(String(i.at(-1))),p=(l==null?void 0:l.help)??t.description,f=n??t.default??"",g=typeof f=="number"?f:0;return d`
    <div class="cfg-field">
      ${a?d`<label class="cfg-field__label">${c}</label>`:w}
      ${p?d`<div class="cfg-field__help">${p}</div>`:w}
      <div class="cfg-number">
        <button
          type="button"
          class="cfg-number__btn"
          ?disabled=${s}
          @click=${()=>r(i,g-1)}
        >−</button>
        <input
          type="number"
          class="cfg-number__input"
          .value=${f==null?"":String(f)}
          ?disabled=${s}
          @input=${b=>{const $=b.target.value,k=$===""?void 0:Number($);r(i,k)}}
        />
        <button
          type="button"
          class="cfg-number__btn"
          ?disabled=${s}
          @click=${()=>r(i,g+1)}
        >+</button>
      </div>
    </div>
  `}function ga(e){const{schema:t,value:n,path:i,hints:o,disabled:s,options:r,onPatch:a}=e,l=e.showLabel??!0,c=Ee(i,o),p=(c==null?void 0:c.label)??t.title??Ze(String(i.at(-1))),f=(c==null?void 0:c.help)??t.description,g=n??t.default,b=r.findIndex(k=>k===g||String(k)===String(g)),$="__unset__";return d`
    <div class="cfg-field">
      ${l?d`<label class="cfg-field__label">${p}</label>`:w}
      ${f?d`<div class="cfg-field__help">${f}</div>`:w}
      <select
        class="cfg-select"
        ?disabled=${s}
        .value=${b>=0?String(b):$}
        @change=${k=>{const S=k.target.value;a(i,S===$?void 0:r[Number(S)])}}
      >
        <option value=${$}>Select...</option>
        ${r.map((k,S)=>d`
          <option value=${String(S)}>${String(k)}</option>
        `)}
      </select>
    </div>
  `}function mv(e){const{schema:t,value:n,path:i,hints:o,unsupported:s,disabled:r,onPatch:a}=e,l=Ee(i,o),c=(l==null?void 0:l.label)??t.title??Ze(String(i.at(-1))),p=(l==null?void 0:l.help)??t.description,f=n??t.default,g=f&&typeof f=="object"&&!Array.isArray(f)?f:{},b=t.properties??{},k=Object.entries(b).toSorted((A,C)=>{var _,T;const z=((_=Ee([...i,A[0]],o))==null?void 0:_.order)??0,y=((T=Ee([...i,C[0]],o))==null?void 0:T.order)??0;return z!==y?z-y:A[0].localeCompare(C[0])}),S=new Set(Object.keys(b)),R=t.additionalProperties,I=!!R&&typeof R=="object",F=d`
    ${k.map(([A,C])=>Tt({schema:C,value:g[A],path:[...i,A],hints:o,unsupported:s,disabled:r,onPatch:a}))}
    ${I?yv({schema:R,value:g,path:i,hints:o,unsupported:s,disabled:r,reservedKeys:S,onPatch:a}):w}
  `;return i.length===1?d`
      <div class="cfg-fields">
        ${F}
      </div>
    `:d`
    <details class="cfg-object" open>
      <summary class="cfg-object__header">
        <span class="cfg-object__title">${c}</span>
        <span class="cfg-object__chevron">${wn.chevronDown}</span>
      </summary>
      ${p?d`<div class="cfg-object__help">${p}</div>`:w}
      <div class="cfg-object__content">
        ${F}
      </div>
    </details>
  `}function vv(e){const{schema:t,value:n,path:i,hints:o,unsupported:s,disabled:r,onPatch:a}=e,l=e.showLabel??!0,c=Ee(i,o),p=(c==null?void 0:c.label)??t.title??Ze(String(i.at(-1))),f=(c==null?void 0:c.help)??t.description,g=Array.isArray(t.items)?t.items[0]:t.items;if(!g)return d`
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
          ?disabled=${r}
          @click=${()=>{const $=[...b,Pa(g)];a(i,$)}}
        >
          <span class="cfg-array__add-icon">${wn.plus}</span>
          Add
        </button>
      </div>
      ${f?d`<div class="cfg-array__help">${f}</div>`:w}

      ${b.length===0?d`
              <div class="cfg-array__empty">No items yet. Click "Add" to create one.</div>
            `:d`
        <div class="cfg-array__items">
          ${b.map(($,k)=>d`
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
                  ${wn.trash}
                </button>
              </div>
              <div class="cfg-array__item-content">
                ${Tt({schema:g,value:$,path:[...i,k],hints:o,unsupported:s,disabled:r,showLabel:!1,onPatch:a})}
              </div>
            </div>
          `)}
        </div>
      `}
    </div>
  `}function yv(e){const{schema:t,value:n,path:i,hints:o,unsupported:s,disabled:r,reservedKeys:a,onPatch:l}=e,c=fv(t),p=Object.entries(n??{}).filter(([f])=>!a.has(f));return d`
    <div class="cfg-map">
      <div class="cfg-map__header">
        <span class="cfg-map__label">Custom entries</span>
        <button
          type="button"
          class="cfg-map__add"
          ?disabled=${r}
          @click=${()=>{const f={...n};let g=1,b=`custom-${g}`;for(;b in f;)g+=1,b=`custom-${g}`;f[b]=c?{}:Pa(t),l(i,f)}}
        >
          <span class="cfg-map__add-icon">${wn.plus}</span>
          Add Entry
        </button>
      </div>

      ${p.length===0?d`
              <div class="cfg-map__empty">No custom entries.</div>
            `:d`
        <div class="cfg-map__items">
          ${p.map(([f,g])=>{const b=[...i,f],$=gv(g);return d`
              <div class="cfg-map__item">
                <div class="cfg-map__item-key">
                  <input
                    type="text"
                    class="cfg-input cfg-input--sm"
                    placeholder="Key"
                    .value=${f}
                    ?disabled=${r}
                    @change=${k=>{const S=k.target.value.trim();if(!S||S===f)return;const R={...n};S in R||(R[S]=R[f],delete R[f],l(i,R))}}
                  />
                </div>
                <div class="cfg-map__item-value">
                  ${c?d`
                        <textarea
                          class="cfg-textarea cfg-textarea--sm"
                          placeholder="JSON value"
                          rows="2"
                          .value=${$}
                          ?disabled=${r}
                          @change=${k=>{const S=k.target,R=S.value.trim();if(!R){l(b,void 0);return}try{l(b,JSON.parse(R))}catch{S.value=$}}}
                        ></textarea>
                      `:Tt({schema:t,value:g,path:b,hints:o,unsupported:s,disabled:r,showLabel:!1,onPatch:l})}
                </div>
                <button
                  type="button"
                  class="cfg-map__item-remove"
                  title="Remove entry"
                  ?disabled=${r}
                  @click=${()=>{const k={...n};delete k[f],l(i,k)}}
                >
                  ${wn.trash}
                </button>
              </div>
            `})}
        </div>
      `}
    </div>
  `}const ha={env:d`
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
  `},Es={env:{label:"Environment Variables",description:"Environment variables passed to the gateway process"},update:{label:"Updates",description:"Auto-update settings and release channel"},agents:{label:"Agents",description:"Agent configurations, models, and identities"},auth:{label:"Authentication",description:"API keys and authentication profiles"},channels:{label:"Channels",description:"Messaging channels (Telegram, Discord, Slack, etc.)"},messages:{label:"Messages",description:"Message handling and routing settings"},commands:{label:"Commands",description:"Custom slash commands"},hooks:{label:"Hooks",description:"Webhooks and event hooks"},skills:{label:"Skills",description:"Skill packs and capabilities"},tools:{label:"Tools",description:"Tool configurations (browser, search, etc.)"},gateway:{label:"Gateway",description:"Gateway server settings (port, auth, binding)"},wizard:{label:"Setup Wizard",description:"Setup wizard state and history"},meta:{label:"Metadata",description:"Gateway metadata and version information"},logging:{label:"Logging",description:"Log levels and output configuration"},browser:{label:"Browser",description:"Browser automation settings"},ui:{label:"UI",description:"User interface preferences"},models:{label:"Models",description:"AI model configurations and providers"},bindings:{label:"Bindings",description:"Key bindings and shortcuts"},broadcast:{label:"Broadcast",description:"Broadcast and notification settings"},audio:{label:"Audio",description:"Audio input/output settings"},session:{label:"Session",description:"Session management and persistence"},cron:{label:"Cron",description:"Scheduled tasks and automation"},web:{label:"Web",description:"Web server and API settings"},discovery:{label:"Discovery",description:"Service discovery and networking"},canvasHost:{label:"Canvas Host",description:"Canvas rendering and display"},talk:{label:"Talk",description:"Voice and speech settings"},plugins:{label:"Plugins",description:"Plugin management and extensions"}};function ma(e){return ha[e]??ha.default}function bv(e,t,n){if(!n)return!0;const i=n.toLowerCase(),o=Es[e];return e.toLowerCase().includes(i)||o&&(o.label.toLowerCase().includes(i)||o.description.toLowerCase().includes(i))?!0:rn(t,i)}function rn(e,t){var i,o,s;if((i=e.title)!=null&&i.toLowerCase().includes(t)||(o=e.description)!=null&&o.toLowerCase().includes(t)||(s=e.enum)!=null&&s.some(r=>String(r).toLowerCase().includes(t)))return!0;if(e.properties){for(const[r,a]of Object.entries(e.properties))if(r.toLowerCase().includes(t)||rn(a,t))return!0}if(e.items){const r=Array.isArray(e.items)?e.items:[e.items];for(const a of r)if(a&&rn(a,t))return!0}if(e.additionalProperties&&typeof e.additionalProperties=="object"&&rn(e.additionalProperties,t))return!0;const n=e.anyOf??e.oneOf??e.allOf;if(n){for(const r of n)if(r&&rn(r,t))return!0}return!1}function wv(e){var f;if(!e.schema)return d`
      <div class="muted">Schema unavailable.</div>
    `;const t=e.schema,n=e.value??{};if(Te(t)!=="object"||!t.properties)return d`
      <div class="callout danger">Unsupported schema. Use Raw.</div>
    `;const i=new Set(e.unsupportedPaths??[]),o=t.properties,s=e.searchQuery??"",r=e.activeSection,a=e.activeSubsection??null,c=Object.entries(o).toSorted((g,b)=>{var S,R;const $=((S=Ee([g[0]],e.uiHints))==null?void 0:S.order)??50,k=((R=Ee([b[0]],e.uiHints))==null?void 0:R.order)??50;return $!==k?$-k:g[0].localeCompare(b[0])}).filter(([g,b])=>!(r&&g!==r||s&&!bv(g,b,s)));let p=null;if(r&&a&&c.length===1){const g=(f=c[0])==null?void 0:f[1];g&&Te(g)==="object"&&g.properties&&g.properties[a]&&(p={sectionKey:r,subsectionKey:a,schema:g.properties[a]})}return c.length===0?d`
      <div class="config-empty">
        <div class="config-empty__icon">${pe.search}</div>
        <div class="config-empty__text">
          ${s?`No settings match "${s}"`:"No settings in this section"}
        </div>
      </div>
    `:d`
    <div class="config-form config-form--modern">
      ${p?(()=>{const{sectionKey:g,subsectionKey:b,schema:$}=p,k=Ee([g,b],e.uiHints),S=(k==null?void 0:k.label)??$.title??Ze(b),R=(k==null?void 0:k.help)??$.description??"",I=n[g],F=I&&typeof I=="object"?I[b]:void 0,A=`config-section-${g}-${b}`;return d`
              <section class="config-section-card" id=${A}>
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${ma(g)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${S}</h3>
                    ${R?d`<p class="config-section-card__desc">${R}</p>`:w}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${Tt({schema:$,value:F,path:[g,b],hints:e.uiHints,unsupported:i,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})():c.map(([g,b])=>{const $=Es[g]??{label:g.charAt(0).toUpperCase()+g.slice(1),description:b.description??""};return d`
              <section class="config-section-card" id="config-section-${g}">
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${ma(g)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${$.label}</h3>
                    ${$.description?d`<p class="config-section-card__desc">${$.description}</p>`:w}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${Tt({schema:b,value:n[g],path:[g],hints:e.uiHints,unsupported:i,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})}
    </div>
  `}const $v=new Set(["title","description","default","nullable"]);function xv(e){return Object.keys(e??{}).filter(n=>!$v.has(n)).length===0}function $c(e){const t=e.filter(o=>o!=null),n=t.length!==e.length,i=[];for(const o of t)i.some(s=>Object.is(s,o))||i.push(o);return{enumValues:i,nullable:n}}function kv(e){return!e||typeof e!="object"?{schema:null,unsupportedPaths:["<root>"]}:fn(e,[])}function fn(e,t){const n=new Set,i={...e},o=zo(t)||"<root>";if(e.anyOf||e.oneOf||e.allOf){const a=Sv(e,t);return a||{schema:e,unsupportedPaths:[o]}}const s=Array.isArray(e.type)&&e.type.includes("null"),r=Te(e)??(e.properties||e.additionalProperties?"object":void 0);if(i.type=r??e.type,i.nullable=s||e.nullable,i.enum){const{enumValues:a,nullable:l}=$c(i.enum);i.enum=a,l&&(i.nullable=!0),a.length===0&&n.add(o)}if(r==="object"){const a=e.properties??{},l={};for(const[c,p]of Object.entries(a)){const f=fn(p,[...t,c]);f.schema&&(l[c]=f.schema);for(const g of f.unsupportedPaths)n.add(g)}if(i.properties=l,e.additionalProperties===!0)n.add(o);else if(e.additionalProperties===!1)i.additionalProperties=!1;else if(e.additionalProperties&&typeof e.additionalProperties=="object"&&!xv(e.additionalProperties)){const c=fn(e.additionalProperties,[...t,"*"]);i.additionalProperties=c.schema??e.additionalProperties,c.unsupportedPaths.length>0&&n.add(o)}}else if(r==="array"){const a=Array.isArray(e.items)?e.items[0]:e.items;if(!a)n.add(o);else{const l=fn(a,[...t,"*"]);i.items=l.schema??a,l.unsupportedPaths.length>0&&n.add(o)}}else r!=="string"&&r!=="number"&&r!=="integer"&&r!=="boolean"&&!i.enum&&n.add(o);return{schema:i,unsupportedPaths:Array.from(n)}}function Sv(e,t){if(e.allOf)return null;const n=e.anyOf??e.oneOf;if(!n)return null;const i=[],o=[];let s=!1;for(const a of n){if(!a||typeof a!="object")return null;if(Array.isArray(a.enum)){const{enumValues:l,nullable:c}=$c(a.enum);i.push(...l),c&&(s=!0);continue}if("const"in a){if(a.const==null){s=!0;continue}i.push(a.const);continue}if(Te(a)==="null"){s=!0;continue}o.push(a)}if(i.length>0&&o.length===0){const a=[];for(const l of i)a.some(c=>Object.is(c,l))||a.push(l);return{schema:{...e,enum:a,nullable:s,anyOf:void 0,oneOf:void 0,allOf:void 0},unsupportedPaths:[]}}if(o.length===1){const a=fn(o[0],t);return a.schema&&(a.schema.nullable=s||a.schema.nullable),a}const r=new Set(["string","number","integer","boolean"]);return o.length>0&&i.length===0&&o.every(a=>a.type&&r.has(String(a.type)))?{schema:{...e,nullable:s},unsupportedPaths:[]}:null}const Fo={all:d`
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
  `},va=[{key:"env",label:"Environment"},{key:"update",label:"Updates"},{key:"agents",label:"Agents"},{key:"auth",label:"Authentication"},{key:"channels",label:"Channels"},{key:"messages",label:"Messages"},{key:"commands",label:"Commands"},{key:"hooks",label:"Hooks"},{key:"skills",label:"Skills"},{key:"tools",label:"Tools"},{key:"gateway",label:"Gateway"},{key:"wizard",label:"Setup Wizard"}],ya="__all__";function ba(e){return Fo[e]??Fo.default}function _v(e,t){const n=Es[e];return n||{label:(t==null?void 0:t.title)??Ze(e),description:(t==null?void 0:t.description)??""}}function Av(e){const{key:t,schema:n,uiHints:i}=e;if(!n||Te(n)!=="object"||!n.properties)return[];const o=Object.entries(n.properties).map(([s,r])=>{const a=Ee([t,s],i),l=(a==null?void 0:a.label)??r.title??Ze(s),c=(a==null?void 0:a.help)??r.description??"",p=(a==null?void 0:a.order)??50;return{key:s,label:l,description:c,order:p}});return o.sort((s,r)=>s.order!==r.order?s.order-r.order:s.key.localeCompare(r.key)),o}function Cv(e,t){if(!e||!t)return[];const n=[];function i(o,s,r){if(o===s)return;if(typeof o!=typeof s){n.push({path:r,from:o,to:s});return}if(typeof o!="object"||o===null||s===null){o!==s&&n.push({path:r,from:o,to:s});return}if(Array.isArray(o)&&Array.isArray(s)){JSON.stringify(o)!==JSON.stringify(s)&&n.push({path:r,from:o,to:s});return}const a=o,l=s,c=new Set([...Object.keys(a),...Object.keys(l)]);for(const p of c)i(a[p],l[p],r?`${r}.${p}`:p)}return i(e,t,""),n}function wa(e,t=40){let n;try{n=JSON.stringify(e)??String(e)}catch{n=String(e)}return n.length<=t?n:n.slice(0,t-3)+"..."}function Tv(e){var z,y,_;const t=e.valid==null?"unknown":e.valid?"valid":"invalid",n=kv(e.schema),i=n.schema?n.unsupportedPaths.length>0:!1,o=((z=n.schema)==null?void 0:z.properties)??{},s=va.filter(T=>T.key in o),r=new Set(va.map(T=>T.key)),a=Object.keys(o).filter(T=>!r.has(T)).map(T=>({key:T,label:T.charAt(0).toUpperCase()+T.slice(1)})),l=[...s,...a],c=e.activeSection&&n.schema&&Te(n.schema)==="object"?(y=n.schema.properties)==null?void 0:y[e.activeSection]:void 0,p=e.activeSection?_v(e.activeSection,c):null,f=e.activeSection?Av({key:e.activeSection,schema:c,uiHints:e.uiHints}):[],g=e.formMode==="form"&&!!e.activeSection&&f.length>0,b=e.activeSubsection===ya,$=e.searchQuery||b?null:e.activeSubsection??((_=f[0])==null?void 0:_.key)??null,k=e.formMode==="form"?Cv(e.originalValue,e.formValue):[],S=e.formMode==="raw"&&e.raw!==e.originalRaw,R=e.formMode==="form"?k.length>0:S,I=!!e.formValue&&!e.loading&&!!n.schema,F=e.connected&&!e.saving&&R&&(e.formMode==="raw"?!0:I),A=e.connected&&!e.applying&&!e.updating&&R&&(e.formMode==="raw"?!0:I),C=e.connected&&!e.applying&&!e.updating;return d`
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
            @input=${T=>e.onSearchChange(T.target.value)}
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
            <span class="config-nav__icon">${Fo.all}</span>
            <span class="config-nav__label">All Settings</span>
          </button>
          ${l.map(T=>d`
              <button
                class="config-nav__item ${e.activeSection===T.key?"active":""}"
                @click=${()=>e.onSectionChange(T.key)}
              >
                <span class="config-nav__icon"
                  >${ba(T.key)}</span
                >
                <span class="config-nav__label">${T.label}</span>
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
              ?disabled=${!A}
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
                  ${k.map(T=>d`
                      <div class="config-diff__item">
                        <div class="config-diff__path">${T.path}</div>
                        <div class="config-diff__values">
                          <span class="config-diff__from"
                            >${wa(T.from)}</span
                          >
                          <span class="config-diff__arrow">→</span>
                          <span class="config-diff__to"
                            >${wa(T.to)}</span
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
                  ${ba(e.activeSection??"")}
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
        ${g?d`
              <div class="config-subnav">
                <button
                  class="config-subnav__item ${$===null?"active":""}"
                  @click=${()=>e.onSubsectionChange(ya)}
                >
                  All
                </button>
                ${f.map(T=>d`
                    <button
                      class="config-subnav__item ${$===T.key?"active":""}"
                      title=${T.description||T.label}
                      @click=${()=>e.onSubsectionChange(T.key)}
                    >
                      ${T.label}
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
                      `:wv({schema:n.schema,uiHints:e.uiHints,value:e.formValue,disabled:e.loading||!e.formValue,unsupportedPaths:n.unsupportedPaths,onPatch:e.onFormPatch,searchQuery:e.searchQuery,activeSection:e.activeSection,activeSubsection:$})}
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
                    @input=${T=>e.onRawChange(T.target.value)}
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
  `}function $a(e){const t=(e??"").trim();return t?t==="Untitled quotation"||t==="未命名报价单"?u("work.fallbackDraftName"):t:""}function Ev(e){if(!e)return"-";try{return new Date(e).toLocaleString()}catch{return e??"-"}}function Rv(e,t,n,i){const o=i==="asc"?1:-1;if(n==="created_at"){const s=e.created_at?new Date(e.created_at).getTime():0,r=t.created_at?new Date(t.created_at).getTime():0;return(s-r)*o}return n==="name"?(e.name??"").localeCompare(t.name??"")*o:(e.draft_no??"").localeCompare(t.draft_no??"")*o}function Lv(e){const{loading:t,error:n,drafts:i,detail:o,detailId:s,confirmBusy:r,confirmResult:a,filterQuery:l,sortBy:c,sortDir:p,page:f,pageSize:g,onRefresh:b,onSelectDraft:$,onConfirm:k,onClearDetail:S,onFilterQueryChange:R,onSortByChange:I,onSortDirChange:F,onPageChange:A,onPageSizeChange:C}=e,z=l.trim().toLowerCase(),_=[...z?i.filter(N=>`${N.draft_no??""}
${N.name??""}
${N.source??""}`.toLowerCase().includes(z)):i].sort((N,ne)=>Rv(N,ne,c,p)),T=_.length,q=Math.max(1,g||10),P=Math.max(1,Math.ceil(T/q)),j=Math.min(Math.max(1,f),P),H=(j-1)*q,G=_.slice(H,H+q);return d`
    <section class="grid grid-cols-2" aria-label=${u("tabs.cron")}>
      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${u("fulfill.title")}</div>
        <div class="card-sub">${u("fulfill.subtitle")}</div>
        <div style="margin-top: 12px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <button class="btn" ?disabled=${t} @click=${b} aria-label=${u("fulfill.refreshList")}>
            ${u(t?"fulfill.loading":"fulfill.refreshList")}
          </button>
          <input
            type="search"
            .value=${l}
            placeholder=${u("fulfill.filterPlaceholder")}
            @input=${N=>R(N.target.value)}
            aria-label=${u("fulfill.filterPlaceholder")}
            style="min-width: 220px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border);"
          />
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${u("fulfill.sortBy")}</span>
            <select
              .value=${c}
              @change=${N=>I(N.target.value)}
              aria-label=${u("fulfill.sortBy")}
              style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 160px;"
            >
              <option value="created_at">${u("fulfill.sortCreatedAt")}</option>
              <option value="draft_no">${u("fulfill.sortDraftNo")}</option>
              <option value="name">${u("fulfill.sortName")}</option>
            </select>
          </label>
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${u("fulfill.sortDir")}</span>
            <select
              .value=${p}
              @change=${N=>F(N.target.value)}
              aria-label=${u("fulfill.sortDir")}
              style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 140px;"
            >
              <option value="desc">${u("fulfill.sortDesc")}</option>
              <option value="asc">${u("fulfill.sortAsc")}</option>
            </select>
          </label>
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${u("fulfill.pageSize")}</span>
            <select
              .value=${String(q)}
              @change=${N=>C(Number(N.target.value)||10)}
              aria-label=${u("fulfill.pageSize")}
              style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 120px;"
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
              <div class="card-title" style="color: var(--danger, #c62828);">${u("common.errorTitle")}</div>
              <div class="card-sub">${n}</div>
              <div style="margin-top: 10px;">
                <button class="btn" @click=${b}>${u("common.retry")}</button>
              </div>
            </div>
          `:w}

      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${u("fulfill.listTitle")}</div>
        <div class="card-sub">${u("fulfill.listSubtitle")}</div>

        ${t&&i.length===0?d`<p class="muted" style="margin-top: 12px;">${u("fulfill.loading")}</p>`:T===0?d`<p class="muted" style="margin-top: 12px;">${u("fulfill.noDrafts")}</p>`:d`
                <div class="muted" style="font-size: 12px; margin-top: 10px;">
                  ${u("fulfill.total",{total:String(T)})}
                </div>
                <div style="overflow-x: auto; margin-top: 8px;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <thead>
                      <tr style="background: var(--bg-secondary, #eee);">
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("fulfill.colDraftNo")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("fulfill.colName")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("fulfill.colSource")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("fulfill.colCreatedAt")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("fulfill.colActions")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${G.map(N=>d`
                          <tr style=${s===N.id?"background: var(--bg-secondary, #f5f5f5);":""}>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${N.draft_no}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${$a(N.name)}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${N.source??"-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${Ev(N.created_at)}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border); display: flex; gap: 6px; flex-wrap: wrap;">
                              <button
                                class="btn btn-sm"
                                @click=${()=>$(N.id)}
                                aria-label=${u("fulfill.viewDetail")}
                              >
                                ${u("fulfill.viewDetail")}
                              </button>
                              <button
                                class="btn"
                                style="font-size: 12px; padding: 4px 8px;"
                                ?disabled=${r}
                                @click=${()=>k(N.id)}
                                aria-label=${u("fulfill.confirmAction")}
                              >
                                ${r&&s===N.id?u("fulfill.confirming"):u("fulfill.confirmAction")}
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
                    aria-label=${u("common.prev")}
                  >
                    ${u("common.prev")}
                  </button>
                  <span class="muted" style="font-size: 12px;">${u("fulfill.page",{current:String(j),total:String(P)})}</span>
                  <button
                    class="btn btn-sm"
                    ?disabled=${j>=P}
                    @click=${()=>A(j+1)}
                    aria-label=${u("common.next")}
                  >
                    ${u("common.next")}
                  </button>
                </div>
              `}
      </div>

      ${o?d`
            <div class="card" style="grid-column: 1 / -1;" tabindex="-1">
              <div class="card-title">${u("fulfill.detailTitle",{draftNo:o.draft_no})}</div>
              <div class="card-sub">${$a(o.name)}</div>
              <div style="margin-top: 8px; display: flex; gap: 8px;">
                <button class="btn btn-sm" @click=${S}>${u("fulfill.closeDetail")}</button>
                <button
                  class="btn"
                  style="background: var(--accent); color: var(--bg);"
                  ?disabled=${r}
                  @click=${()=>k(o.id)}
                >
                  ${u(r?"fulfill.confirming":"fulfill.confirmAction")}
                </button>
              </div>
              <div style="overflow-x: auto; margin-top: 12px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                  <thead>
                    <tr style="background: var(--bg-secondary, #eee);">
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">#</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("fulfill.lineProduct")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("fulfill.lineSpec")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("fulfill.lineQty")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("fulfill.lineCode")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("fulfill.lineQuoteName")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("fulfill.lineQuoteSpec")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("fulfill.linePrice")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("fulfill.lineAmount")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("fulfill.lineAvailable")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("fulfill.lineShortfall")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("fulfill.lineIsShortage")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${(o.lines??[]).map((N,ne)=>d`
                        <tr>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${ne+1}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${N.product_name??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${N.specification??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${N.qty??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${N.code??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${N.quote_name??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${N.quote_spec??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${N.unit_price??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${N.amount??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${N.available_qty??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${N.shortfall??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${N.is_shortage?u("common.yes"):u("common.no")}</td>
                        </tr>
                      `)}
                  </tbody>
                </table>
              </div>
            </div>
          `:w}

      ${a?d`
            <div class="card" style="grid-column: 1 / -1; border-color: var(--success, #2e7d32);" role="status" aria-live="polite">
              <div class="card-title" style="color: var(--success, #2e7d32);">${u("fulfill.confirmTitle")}</div>
              ${a.order_id?d`<p style="margin: 0 0 4px 0; font-weight: 600;">${u("fulfill.orderId")}: ${a.order_id}</p>`:w}
              <div class="card-sub">${a.message??""}</div>
            </div>
          `:w}
    </section>
  `}function Iv(e,t,n,i){const o=i==="asc"?1:-1;if(n==="uploaded_at"){const s=e.uploaded_at?new Date(e.uploaded_at).getTime():0,r=t.uploaded_at?new Date(t.uploaded_at).getTime():0;return(s-r)*o}return n==="shortfall"?(Number(e.shortfall??0)-Number(t.shortfall??0))*o:n==="count"?(Number(e.count??0)-Number(t.count??0))*o:(e.product_name??"").localeCompare(t.product_name??"")*o}function Pv(e){const{loading:t,error:n,suggestions:i,selectedKeys:o,approvedKeys:s,approveBusy:r,approveResult:a,filterQuery:l,sortBy:c,sortDir:p,page:f,pageSize:g,onRefresh:b,onToggleSelect:$,onApprove:k,onApproveBatch:S,onFilterQueryChange:R,onSortByChange:I,onSortDirChange:F,onPageChange:A,onPageSizeChange:C}=e,z=i.filter(L=>!s.includes(De(L))),y=l.trim().toLowerCase(),_=y?z.filter(L=>`${L.product_name??""}
${L.specification??""}
${L.code??""}
${L.product_key??""}`.toLowerCase().includes(y)):z,T=[..._].sort((L,Y)=>Iv(L,Y,c,p)),q=T.length,P=Math.max(1,g||10),j=Math.max(1,Math.ceil(q/P)),H=Math.min(Math.max(1,f),j),G=(H-1)*P,N=T.slice(G,G+P),ne=_.filter(L=>o.includes(De(L))).length,be=_.length>0&&_.every(L=>o.includes(De(L)));return d`
    <section class="grid grid-cols-2" aria-label=${u("tabs.sessions")}>
      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${u("procurement.title")}</div>
        <div class="card-sub">${u("procurement.subtitle")}</div>
        <div style="margin-top: 12px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <button class="btn" ?disabled=${t} @click=${b} aria-label=${u("procurement.refreshList")}>
            ${u(t?"procurement.loading":"procurement.refreshList")}
          </button>
          <input
            type="search"
            .value=${l}
            placeholder=${u("procurement.filterPlaceholder")}
            @input=${L=>R(L.target.value)}
            aria-label=${u("procurement.filterPlaceholder")}
            style="min-width: 240px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border);"
          />
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${u("procurement.sortBy")}</span>
            <select
              .value=${c}
              @change=${L=>I(L.target.value)}
              aria-label=${u("procurement.sortBy")}
              style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 160px;"
            >
              <option value="uploaded_at">${u("procurement.sortUploadedAt")}</option>
              <option value="shortfall">${u("procurement.sortShortfall")}</option>
              <option value="count">${u("procurement.sortCount")}</option>
              <option value="product_name">${u("procurement.sortProduct")}</option>
            </select>
          </label>
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${u("procurement.sortDir")}</span>
            <select
              .value=${p}
              @change=${L=>F(L.target.value)}
              aria-label=${u("procurement.sortDir")}
              style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 140px;"
            >
              <option value="desc">${u("procurement.sortDesc")}</option>
              <option value="asc">${u("procurement.sortAsc")}</option>
            </select>
          </label>
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${u("procurement.pageSize")}</span>
            <select
              .value=${String(P)}
              @change=${L=>C(Number(L.target.value)||10)}
              aria-label=${u("procurement.pageSize")}
              style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 120px;"
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
              <div class="card-title" style="color: var(--danger, #c62828);">${u("common.errorTitle")}</div>
              <div class="card-sub">${n}</div>
              <div style="margin-top: 10px;">
                <button class="btn" @click=${b}>${u("common.retry")}</button>
              </div>
            </div>
          `:w}

      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${u("procurement.listTitle")}</div>
        <div class="card-sub">${u("procurement.listHint")}</div>

        ${ne>0?d`
              <div style="margin-top: 12px;">
                <button
                  class="btn"
                  style="font-size: 12px;"
                  ?disabled=${r}
                  @click=${S}
                  aria-label=${u("procurement.batchApprove")}
                >
                  ${r?u("procurement.approving"):`${u("procurement.batchApprove")} (${ne})`}
                </button>
              </div>
            `:w}

        ${t&&i.length===0?d`<p class="muted" style="margin-top: 12px;">${u("procurement.loading")}</p>`:_.length===0?d`<p class="muted" style="margin-top: 12px;">${i.length===0?u("procurement.noSuggestions"):u("procurement.noPending")}</p>`:d`
                <div class="muted" style="font-size: 12px; margin-top: 10px;">
                  ${u("procurement.total",{total:String(q)})}
                </div>
                <div style="overflow-x: auto; margin-top: 8px;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <thead>
                      <tr style="background: var(--bg-secondary, #eee);">
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border); width: 36px;">
                          <input
                            type="checkbox"
                            .checked=${be}
                            .indeterminate=${ne>0&&ne<_.length}
                            aria-label=${u("procurement.selectAll")}
                            @change=${()=>{be?_.forEach(L=>$(De(L))):_.forEach(L=>{const Y=De(L);o.includes(Y)||$(Y)})}}
                          />
                        </th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("procurement.colProduct")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("procurement.colSpec")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("procurement.colShortfall")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("procurement.colCode")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("procurement.colCount")}</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${u("procurement.colActions")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${N.map(L=>d`
                          <tr>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">
                              <input
                                type="checkbox"
                                .checked=${o.includes(De(L))}
                                aria-label=${u("procurement.selectItem")}
                                @change=${()=>$(De(L))}
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
                                ?disabled=${r}
                                @click=${()=>k(L)}
                                aria-label=${u("procurement.approveSingle")}
                              >
                                ${u(r?"procurement.approving":"procurement.approveSingle")}
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
                    @click=${()=>A(H-1)}
                    aria-label=${u("common.prev")}
                  >
                    ${u("common.prev")}
                  </button>
                  <span class="muted" style="font-size: 12px;">${u("procurement.page",{current:String(H),total:String(j)})}</span>
                  <button
                    class="btn btn-sm"
                    ?disabled=${H>=j}
                    @click=${()=>A(H+1)}
                    aria-label=${u("common.next")}
                  >
                    ${u("common.next")}
                  </button>
                </div>
              `}
      </div>

      ${a?d`
            <div class="card" style="grid-column: 1 / -1;" role="status" aria-live="polite">
              <div class="card-sub">
                ${a.approved_count!=null?`${u("procurement.approvedCount",{count:String(a.approved_count)})} `:""}${a.message??""}
              </div>
            </div>
          `:w}

      <div class="card" style="grid-column: 1 / -1; margin-top: 16px;">
        <div class="card-title">${u("replenishment.title")}</div>
        <div class="card-sub">${u("replenishment.subtitle")}</div>
        <div style="margin-top: 12px;">
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
              <thead>
                <tr style="background: var(--bg-secondary, #eee);">
                  <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">
                    ${u("replenishment.productOrCodePlaceholder")}
                  </th>
                  <th style="padding: 6px 8px; text-align: right; border: 1px solid var(--border); width: 120px;">
                    ${u("replenishment.quantityPlaceholder")}
                  </th>
                  <th style="padding: 6px 8px; border: 1px solid var(--border); width: 60px;"></th>
                </tr>
              </thead>
              <tbody>
                ${e.replenishmentInputLines.map((L,Y)=>d`
                    <tr>
                      <td style="padding: 6px 8px; border: 1px solid var(--border);">
                        <input
                          type="text"
                          .value=${L.product_or_code}
                          placeholder=${u("replenishment.productOrCodePlaceholder")}
                          @input=${ge=>e.onReplenishmentLineChange(Y,"product_or_code",ge.target.value)}
                          style="width: 100%; padding: 6px 8px; border-radius: 4px; border: 1px solid var(--border);"
                          aria-label=${u("replenishment.productOrCodePlaceholder")}
                        />
                      </td>
                      <td style="padding: 6px 8px; border: 1px solid var(--border); text-align: right;">
                        <input
                          type="number"
                          min="1"
                          .value=${String(L.quantity||"")}
                          placeholder=${u("replenishment.quantityPlaceholder")}
                          @input=${ge=>{const Q=ge.target.value,Ne=Q===""?0:Number(Q);e.onReplenishmentLineChange(Y,"quantity",Number.isFinite(Ne)?Ne:0)}}
                          style="width: 80px; padding: 6px 8px; border-radius: 4px; border: 1px solid var(--border); text-align: right;"
                          aria-label=${u("replenishment.quantityPlaceholder")}
                        />
                      </td>
                      <td style="padding: 6px 8px; border: 1px solid var(--border);">
                        ${e.replenishmentInputLines.length>1?d`
                              <button
                                type="button"
                                class="btn btn-sm"
                                style="font-size: 12px; padding: 4px 8px;"
                                @click=${()=>e.onReplenishmentRemoveLine(Y)}
                                aria-label=${u("replenishment.removeRow")}
                              >
                                ${u("replenishment.removeRow")}
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
              aria-label=${u("replenishment.addRow")}
            >
              ${u("replenishment.addRow")}
            </button>
            <button
              class="btn"
              ?disabled=${e.replenishmentCreateBusy||e.replenishmentLoading}
              @click=${e.onCreateReplenishmentDraft}
              aria-label=${u("replenishment.generateDraft")}
            >
              ${e.replenishmentCreateBusy?u("replenishment.creating"):u("replenishment.generateDraft")}
            </button>
            <button
              class="btn"
              ?disabled=${e.replenishmentLoading}
              @click=${e.onReplenishmentRefresh}
              aria-label=${u("replenishment.refreshList")}
            >
              ${e.replenishmentLoading?u("replenishment.loading"):u("replenishment.refreshList")}
            </button>
          </div>
        </div>
      </div>

      ${e.replenishmentError?d`
            <div class="card" style="grid-column: 1 / -1; border-color: var(--danger, #c62828);" role="alert" aria-live="assertive">
              <div class="card-title" style="color: var(--danger, #c62828);">${u("common.errorTitle")}</div>
              <div class="card-sub">${e.replenishmentError}</div>
            </div>
          `:w}

      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${u("replenishment.listTitle")}</div>
        <div class="card-sub">${u("replenishment.listHint")}</div>

        ${e.replenishmentLoading&&e.replenishmentDrafts.length===0?d`<p class="muted" style="margin-top: 12px;">${u("replenishment.loading")}</p>`:e.replenishmentDrafts.length===0?d`<p class="muted" style="margin-top: 12px;">${u("replenishment.noDrafts")}</p>`:d`
                <div style="overflow-x: auto; margin-top: 8px;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <thead>
                      <tr style="background: var(--bg-secondary, #eee);">
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">
                          ${u("replenishment.colDraftNo")}
                        </th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">
                          ${u("replenishment.colName")}
                        </th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">
                          ${u("replenishment.colCreatedAt")}
                        </th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">
                          ${u("replenishment.colStatus")}
                        </th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">
                          ${u("replenishment.colActions")}
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
                                ${u("replenishment.viewDetail")}
                              </button>
                              <button
                                class="btn btn-sm"
                                style="font-size: 12px; padding: 4px 8px;"
                                ?disabled=${e.replenishmentConfirmBusy||L.status==="confirmed"}
                                @click=${()=>e.onConfirmReplenishment(L.id)}
                              >
                                ${e.replenishmentConfirmBusy?u("replenishment.confirming"):u("replenishment.confirm")}
                              </button>
                              <button
                                class="btn btn-sm"
                                style="font-size: 12px; padding: 4px 8px; color: var(--danger, #c62828);"
                                @click=${()=>e.onDeleteReplenishmentDraft(L.id)}
                                aria-label=${u("replenishment.delete")}
                              >
                                ${u("replenishment.delete")}
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
                ${u("replenishment.detailTitle",{no:e.replenishmentDetail.draft_no})}
              </div>
              <div class="card-sub">
                ${u("replenishment.detailSubtitle")}
              </div>
              <div style="overflow-x: auto; margin-top: 8px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                  <thead>
                    <tr style="background: var(--bg-secondary, #eee);">
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">
                        ${u("replenishment.colCode")}
                      </th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">
                        ${u("replenishment.colProduct")}
                      </th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">
                        ${u("replenishment.colSpec")}
                      </th>
                      <th style="padding: 6px 8px; text-align: right; border: 1px solid var(--border);">
                        ${u("replenishment.colCurrentQty")}
                      </th>
                      <th style="padding: 6px 8px; text-align: right; border: 1px solid var(--border);">
                        ${u("replenishment.colQuantity")}
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
                  ${u("common.close")}
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
  `}function Dv(e){const t=e.status&&typeof e.status=="object"?e.status.securityAudit:null,n=(t==null?void 0:t.summary)??null,i=(n==null?void 0:n.critical)??0,o=(n==null?void 0:n.warn)??0,s=(n==null?void 0:n.info)??0,r=i>0?"danger":o>0?"warn":"success",a=i>0?`${i} critical`:o>0?`${o} warnings`:"No critical issues";return d`
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
                  Security audit: ${a}${s>0?` · ${s} info`:""}. Run
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
                      <pre class="code-block">${hg(l.payload)}</pre>
                    </div>
                  </div>
                `)}
            </div>
          `}
    </section>
  `}function Mv(e){const t=Math.max(0,e),n=Math.floor(t/1e3);if(n<60)return`${n}s`;const i=Math.floor(n/60);return i<60?`${i}m`:`${Math.floor(i/60)}h`}function ht(e,t){return t?d`<div class="exec-approval-meta-row"><span>${e}</span><span>${t}</span></div>`:w}function Fv(e){const t=e.execApprovalQueue[0];if(!t)return w;const n=t.request,i=t.expiresAtMs-Date.now(),o=i>0?`expires in ${Mv(i)}`:"expired",s=e.execApprovalQueue.length;return d`
    <div class="exec-approval-overlay" role="dialog" aria-live="polite">
      <div class="exec-approval-card">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">Exec approval needed</div>
            <div class="exec-approval-sub">${o}</div>
          </div>
          ${s>1?d`<div class="exec-approval-queue">${s} pending</div>`:w}
        </div>
        <div class="exec-approval-command mono">${n.command}</div>
        <div class="exec-approval-meta">
          ${ht("Host",n.host)}
          ${ht("Agent",n.agentId)}
          ${ht("Session",n.sessionKey)}
          ${ht("CWD",n.cwd)}
          ${ht("Resolved",n.resolvedPath)}
          ${ht("Security",n.security)}
          ${ht("Ask",n.ask)}
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
  `}function Nv(e){const{pendingGatewayUrl:t}=e;return t?d`
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
  `:w}const xa=["trace","debug","info","warn","error","fatal"];function Ov(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleTimeString()}function Bv(e,t){return t?[e.message,e.subsystem,e.raw].filter(Boolean).join(" ").toLowerCase().includes(t):!0}function Uv(e){const t=e.filterText.trim().toLowerCase(),n=xa.some(s=>!e.levelFilters[s]),i=e.entries.filter(s=>s.level&&!e.levelFilters[s.level]?!1:Bv(s,t)),o=t||n?"filtered":"visible";return d`
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
            @click=${()=>e.onExport(i.map(s=>s.raw),o)}
          >
            Export ${o}
          </button>
        </div>
      </div>

      <div class="filters" style="margin-top: 14px;">
        <label class="field" style="min-width: 220px;">
          <span>Filter</span>
          <input
            .value=${e.filterText}
            @input=${s=>e.onFilterTextChange(s.target.value)}
            placeholder="Search logs"
          />
        </label>
        <label class="field checkbox">
          <span>Auto-follow</span>
          <input
            type="checkbox"
            .checked=${e.autoFollow}
            @change=${s=>e.onToggleAutoFollow(s.target.checked)}
          />
        </label>
      </div>

      <div class="chip-row" style="margin-top: 12px;">
        ${xa.map(s=>d`
            <label class="chip log-chip ${s}">
              <input
                type="checkbox"
                .checked=${e.levelFilters[s]}
                @change=${r=>e.onLevelToggle(s,r.target.checked)}
              />
              <span>${s}</span>
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
              `:i.map(s=>d`
                <div class="log-row">
                  <div class="log-time mono">${Ov(s.time)}</div>
                  <div class="log-level ${s.level??""}">${s.level??""}</div>
                  <div class="log-subsystem mono">${s.subsystem??""}</div>
                  <div class="log-message mono">${s.message??s.raw}</div>
                </div>
              `)}
      </div>
    </section>
  `}function qv(e){return d`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">${u("oos.title")}</div>
          <div class="card-sub">${u("oos.subtitle")}</div>
        </div>
        <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
          ${e.loading?u("oos.actions.loading"):u("oos.actions.refresh")}
        </button>
      </div>
      ${e.db==="sqlite"?d`<div
            class="callout"
            style="margin-top: 12px; background: var(--bg-muted, #f5f5f5); color: var(--text-muted, #666);"
          >
            ${u("oos.db.local")}
          </div>`:w}
      ${e.error?d`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:w}
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        ${e.stats?zv(e.stats):e.loading?w:d`<div class="muted">${u("oos.empty.stats")}</div>`}
      </div>
      <div style="margin-top: 24px;">
        <div class="row" style="justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="card-title" style="font-size: 1rem;">${u("oos.list.title")}</div>
          ${e.onOpenAddForm&&!e.showAddForm?d`<button class="btn btn--primary" ?disabled=${e.loading} @click=${e.onOpenAddForm}>${u("oos.actions.addManual")}</button>`:w}
        </div>
        ${e.showAddForm&&e.onAdd&&e.onCloseAddForm?d`
              <div class="callout" style="margin-bottom: 12px; padding: 12px;">
                <div style="font-weight: 600; margin-bottom: 8px;">${u("oos.addForm.title")}</div>
                <form @submit=${async t=>{var s,r,a,l,c,p,f;t.preventDefault();const n=t.target,i=((r=(s=n.querySelector('[name="oos_add_name"]'))==null?void 0:s.value)==null?void 0:r.trim())??"";if(!i)return;await e.onAdd({product_name:i,specification:((l=(a=n.querySelector('[name="oos_add_spec"]'))==null?void 0:a.value)==null?void 0:l.trim())??"",quantity:parseFloat(((c=n.querySelector('[name="oos_add_qty"]'))==null?void 0:c.value)??"0")||0,unit:((f=(p=n.querySelector('[name="oos_add_unit"]'))==null?void 0:p.value)==null?void 0:f.trim())??""})&&e.onCloseAddForm()}}>
                  <div class="row" style="gap: 8px; flex-wrap: wrap; align-items: center;">
                    <input
                      name="oos_add_name"
                      type="text"
                      placeholder=${u("oos.addForm.namePlaceholder")}
                      required
                      style="min-width: 140px;"
                    />
                    <input
                      name="oos_add_spec"
                      type="text"
                      placeholder=${u("oos.addForm.specPlaceholder")}
                      style="min-width: 80px;"
                    />
                    <input
                      name="oos_add_qty"
                      type="number"
                      placeholder=${u("oos.addForm.qtyPlaceholder")}
                      min="0"
                      step="1"
                      value="0"
                      style="width: 80px;"
                    />
                    <input
                      name="oos_add_unit"
                      type="text"
                      placeholder=${u("oos.addForm.unitPlaceholder")}
                      style="width: 60px;"
                    />
                    <button type="submit" class="btn btn--primary">
                      ${u("oos.actions.confirm")}
                    </button>
                    <button type="button" class="btn" @click=${e.onCloseAddForm}>
                      ${u("common.cancel")}
                    </button>
                  </div>
                </form>
              </div>
            `:w}
        <div class="list" style="margin-top: 8px;">
          ${e.list.length===0?d`<div class="muted">${u("oos.empty.list")}</div>`:e.list.slice(0,50).map(t=>Kv(t,e.onDelete))}
        </div>
        ${e.list.length>50?d`<div class="muted" style="margin-top: 8px;">
              ${u("oos.list.more",{count:String(e.list.length)})}
            </div>`:w}
      </div>
      <div class="row" style="margin-top: 24px; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">
            ${u("oos.byFile.title")}
          </div>
          <div class="list" style="margin-top: 8px;">
            ${e.byFile.length===0?d`<div class="muted">${u("oos.byFile.empty")}</div>`:e.byFile.slice(0,10).map(t=>Hv(t))}
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">
            ${u("oos.byTime.title")}
          </div>
          <div class="list" style="margin-top: 8px;">
            ${e.byTime.length===0?d`<div class="muted">${u("oos.byTime.empty")}</div>`:e.byTime.slice(0,10).map(t=>jv(t))}
          </div>
        </div>
      </div>
    </section>
  `}function zv(e){return[{label:u("oos.stats.totalRecords"),value:e.total_records},{label:u("oos.stats.outOfStockCount"),value:e.out_of_stock_count},{label:u("oos.stats.today"),value:e.today_count},{label:u("oos.stats.reportedGe2"),value:e.notified_count},{label:u("oos.stats.emailSentProductCount"),value:e.email_sent_product_count}].map(n=>d`
      <div class="card stat-card" style="min-width: 100px;">
        <div class="stat-value">${n.value}</div>
        <div class="stat-label">${n.label}</div>
      </div>
    `)}function Kv(e,t){const n=e.product_name??"",i=e.specification??"",o=e.unit??"",s=e.quantity??"",r=e.count??1,a=(e.email_sent_count??0)>0||e.email_status==="sent",l=u(a?"oos.email.sent":"oos.email.notSent"),c=e.product_key??"";return d`
    <div class="list-item" style="display: flex; justify-content: space-between; align-items: center;">
      <div class="list-main">
        <div class="list-title">${n} ${i}</div>
        <div class="list-sub">
          ${u("oos.list.meta",{qty:String(s),unit:o,count:String(r),email:l})}
        </div>
      </div>
      ${t&&c?d`<button
            class="btn"
            style="flex-shrink: 0;"
            title=${u("oos.actions.deleteHint")}
            @click=${()=>t(c)}
          >
            ${u("oos.actions.delete")}
          </button>`:w}
    </div>
  `}function Hv(e){const t=e.file_name??"",n=e.total_records??0,i=e.uploaded_at?String(e.uploaded_at).length>19?String(e.uploaded_at).slice(0,10)+" "+String(e.uploaded_at).slice(11,19):String(e.uploaded_at):"";return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${t}</div>
        <div class="list-sub">
          ${u("oos.byFile.count",{count:String(n)})}${i?` · ${i}`:""}
        </div>
      </div>
    </div>
  `}function jv(e){return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.date??""}</div>
        <div class="list-sub">
          ${u("oos.byTime.count",{count:String(e.count??0)})}
        </div>
      </div>
    </div>
  `}function Gv(e){return d`
    <section class="card" style="margin-top: 24px;">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">${u("shortage.title")}</div>
          <div class="card-sub">${u("shortage.subtitle")}</div>
        </div>
        <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
          ${e.loading?u("shortage.actions.loading"):u("shortage.actions.refresh")}
        </button>
      </div>
      ${e.db==="sqlite"?d`<div
            class="callout"
            style="margin-top: 12px; background: var(--bg-muted, #f5f5f5); color: var(--text-muted, #666);"
          >
            ${u("shortage.db.local")}
          </div>`:w}
      ${e.error?d`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:w}
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        ${e.stats?Wv(e.stats):e.loading?w:d`<div class="muted">${u("shortage.empty.stats")}</div>`}
      </div>
      <div style="margin-top: 24px;">
        <div class="row" style="justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="card-title" style="font-size: 1rem;">${u("shortage.list.title")}</div>
          ${e.onOpenAddForm&&!e.showAddForm?d`<button class="btn btn--primary" ?disabled=${e.loading} @click=${e.onOpenAddForm}>${u("shortage.actions.addManual")}</button>`:w}
        </div>
        ${e.showAddForm&&e.onAdd&&e.onCloseAddForm?d`
              <div class="callout" style="margin-bottom: 12px; padding: 12px;">
                <div style="font-weight: 600; margin-bottom: 8px;">
                  ${u("shortage.addForm.title")}
                </div>
                <form @submit=${async t=>{var a,l,c,p,f,g;t.preventDefault();const n=t.target,i=((l=(a=n.querySelector('[name="shortage_add_name"]'))==null?void 0:a.value)==null?void 0:l.trim())??"";if(!i)return;const o=parseFloat(((c=n.querySelector('[name="shortage_add_qty"]'))==null?void 0:c.value)??"0")||0,s=parseFloat(((p=n.querySelector('[name="shortage_add_avail"]'))==null?void 0:p.value)??"0")||0;await e.onAdd({product_name:i,specification:((g=(f=n.querySelector('[name="shortage_add_spec"]'))==null?void 0:f.value)==null?void 0:g.trim())??"",quantity:o,available_qty:s})&&e.onCloseAddForm()}}>
                  <div class="row" style="gap: 8px; flex-wrap: wrap; align-items: center;">
                    <input
                      name="shortage_add_name"
                      type="text"
                      placeholder=${u("shortage.addForm.namePlaceholder")}
                      required
                      style="min-width: 140px;"
                    />
                    <input
                      name="shortage_add_spec"
                      type="text"
                      placeholder=${u("shortage.addForm.specPlaceholder")}
                      style="min-width: 80px;"
                    />
                    <input
                      name="shortage_add_qty"
                      type="number"
                      placeholder=${u("shortage.addForm.qtyPlaceholder")}
                      min="0"
                      step="1"
                      value="0"
                      style="width: 80px;"
                      title=${u("shortage.addForm.qtyTitle")}
                    />
                    <input
                      name="shortage_add_avail"
                      type="number"
                      placeholder=${u("shortage.addForm.availPlaceholder")}
                      min="0"
                      step="1"
                      value="0"
                      style="width: 80px;"
                      title=${u("shortage.addForm.availTitle")}
                    />
                    <span
                      class="muted"
                      style="font-size: 0.9rem;"
                      title=${u("shortage.addForm.diffTitle")}
                    >
                      ${u("shortage.addForm.diffText")}
                    </span>
                    <button type="submit" class="btn btn--primary">
                      ${u("shortage.actions.confirm")}
                    </button>
                    <button type="button" class="btn" @click=${e.onCloseAddForm}>
                      ${u("common.cancel")}
                    </button>
                  </div>
                </form>
              </div>
            `:w}
        <div class="list" style="margin-top: 8px;">
          ${e.list.length===0?d`<div class="muted">${u("shortage.empty.list")}</div>`:e.list.slice(0,50).map(t=>Qv(t,e.onDelete))}
        </div>
        ${e.list.length>50?d`<div class="muted" style="margin-top: 8px;">
              ${u("shortage.list.more",{count:String(e.list.length)})}
            </div>`:w}
      </div>
      <div class="row" style="margin-top: 24px; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">
            ${u("shortage.byFile.title")}
          </div>
          <div class="list" style="margin-top: 8px;">
            ${e.byFile.length===0?d`<div class="muted">${u("shortage.byFile.empty")}</div>`:e.byFile.slice(0,10).map(t=>Vv(t))}
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">
            ${u("shortage.byTime.title")}
          </div>
          <div class="list" style="margin-top: 8px;">
            ${e.byTime.length===0?d`<div class="muted">${u("shortage.byTime.empty")}</div>`:e.byTime.slice(0,10).map(t=>Xv(t))}
          </div>
        </div>
      </div>
    </section>
  `}function Wv(e){return[{label:u("shortage.stats.totalRecords"),value:e.total_records},{label:u("shortage.stats.shortageProductCount"),value:e.shortage_product_count},{label:u("shortage.stats.today"),value:e.today_count},{label:u("shortage.stats.reportedGe2"),value:e.reported_ge2_count}].map(n=>d`
      <div class="card stat-card" style="min-width: 100px;">
        <div class="stat-value">${n.value}</div>
        <div class="stat-label">${n.label}</div>
      </div>
    `)}function Qv(e,t){const n=e.product_name??"",i=e.specification??"",o=e.quantity??0,s=e.available_qty??0,r=e.shortfall??0,a=e.count??1,l=e.product_key??"";return d`
    <div class="list-item" style="display: flex; justify-content: space-between; align-items: center;">
      <div class="list-main">
        <div class="list-title">${n} ${i?` · ${i}`:""}</div>
        <div class="list-sub">
          ${u("shortage.list.meta",{qty:String(o),avail:String(s),diff:String(r),count:String(a)})}
        </div>
      </div>
      ${t&&l?d`<button
            class="btn"
            style="flex-shrink: 0;"
            title=${u("shortage.actions.deleteHint")}
            @click=${()=>t(l)}
          >
            ${u("shortage.actions.delete")}
          </button>`:w}
    </div>
  `}function Vv(e){const t=e.file_name??"",n=e.total_records??0,i=e.uploaded_at?String(e.uploaded_at).length>19?String(e.uploaded_at).slice(0,10)+" "+String(e.uploaded_at).slice(11,19):String(e.uploaded_at):"";return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${t}</div>
        <div class="list-sub">
          ${u("shortage.byFile.count",{count:String(n)})}${i?` · ${i}`:""}
        </div>
      </div>
    </div>
  `}function Xv(e){return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.date??""}</div>
        <div class="list-sub">
          ${u("shortage.byTime.count",{count:String(e.count??0)})}
        </div>
      </div>
    </div>
  `}const st="__defaults__",ka=[{value:"deny",label:"Deny"},{value:"allowlist",label:"Allowlist"},{value:"full",label:"Full"}],Jv=[{value:"off",label:"Off"},{value:"on-miss",label:"On miss"},{value:"always",label:"Always"}];function Sa(e){return e==="allowlist"||e==="full"||e==="deny"?e:"deny"}function Yv(e){return e==="always"||e==="off"||e==="on-miss"?e:"on-miss"}function Zv(e){const t=(e==null?void 0:e.defaults)??{};return{security:Sa(t.security),ask:Yv(t.ask),askFallback:Sa(t.askFallback??"deny"),autoAllowSkills:!!(t.autoAllowSkills??!1)}}function ey(e){const t=(e==null?void 0:e.agents)??{},n=Array.isArray(t.list)?t.list:[],i=[];return n.forEach(o=>{if(!o||typeof o!="object")return;const s=o,r=typeof s.id=="string"?s.id.trim():"";if(!r)return;const a=typeof s.name=="string"?s.name.trim():void 0,l=s.default===!0;i.push({id:r,name:a||void 0,isDefault:l})}),i}function ty(e,t){const n=ey(e),i=Object.keys((t==null?void 0:t.agents)??{}),o=new Map;n.forEach(r=>o.set(r.id,r)),i.forEach(r=>{o.has(r)||o.set(r,{id:r})});const s=Array.from(o.values());return s.length===0&&s.push({id:"main",isDefault:!0}),s.sort((r,a)=>{var p,f;if(r.isDefault&&!a.isDefault)return-1;if(!r.isDefault&&a.isDefault)return 1;const l=(p=r.name)!=null&&p.trim()?r.name:r.id,c=(f=a.name)!=null&&f.trim()?a.name:a.id;return l.localeCompare(c)}),s}function ny(e,t){return e===st?st:e&&t.some(n=>n.id===e)?e:st}function iy(e){var f;const t=e.execApprovalsForm??((f=e.execApprovalsSnapshot)==null?void 0:f.file)??null,n=!!t,i=Zv(t),o=ty(e.configForm,t),s=dy(e.nodes),r=e.execApprovalsTarget;let a=r==="node"&&e.execApprovalsTargetNodeId?e.execApprovalsTargetNodeId:null;r==="node"&&a&&!s.some(g=>g.id===a)&&(a=null);const l=ny(e.execApprovalsSelectedAgent,o),c=l!==st?((t==null?void 0:t.agents)??{})[l]??null:null,p=Array.isArray(c==null?void 0:c.allowlist)?c.allowlist??[]:[];return{ready:n,disabled:e.execApprovalsSaving||e.execApprovalsLoading,dirty:e.execApprovalsDirty,loading:e.execApprovalsLoading,saving:e.execApprovalsSaving,form:t,defaults:i,selectedScope:l,selectedAgent:c,agents:o,allowlist:p,target:r,targetNodeId:a,targetNodes:s,onSelectScope:e.onExecApprovalsSelectAgent,onSelectTarget:e.onExecApprovalsTargetChange,onPatch:e.onExecApprovalsPatch,onRemove:e.onExecApprovalsRemove,onLoad:e.onLoadExecApprovals,onSave:e.onSaveExecApprovals}}function oy(e){const t=e.ready,n=e.target!=="node"||!!e.targetNodeId;return d`
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

      ${sy(e)}

      ${t?d`
            ${ry(e)}
            ${ay(e)}
            ${e.selectedScope===st?w:ly(e)}
          `:d`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load exec approvals to edit allowlists.</div>
            <button class="btn" ?disabled=${e.loading||!n} @click=${e.onLoad}>
              ${e.loading?"Loading…":"Load approvals"}
            </button>
          </div>`}
    </section>
  `}function sy(e){const t=e.targetNodes.length>0,n=e.targetNodeId??"";return d`
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
                    @change=${i=>{const s=i.target.value.trim();e.onSelectTarget("node",s||null)}}
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
  `}function ry(e){return d`
    <div class="row" style="margin-top: 12px; gap: 8px; flex-wrap: wrap;">
      <span class="label">Scope</span>
      <div class="row" style="gap: 8px; flex-wrap: wrap;">
        <button
          class="btn btn--sm ${e.selectedScope===st?"active":""}"
          @click=${()=>e.onSelectScope(st)}
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
  `}function ay(e){const t=e.selectedScope===st,n=e.defaults,i=e.selectedAgent??{},o=t?["defaults"]:["agents",e.selectedScope],s=typeof i.security=="string"?i.security:void 0,r=typeof i.ask=="string"?i.ask:void 0,a=typeof i.askFallback=="string"?i.askFallback:void 0,l=t?n.security:s??"__default__",c=t?n.ask:r??"__default__",p=t?n.askFallback:a??"__default__",f=typeof i.autoAllowSkills=="boolean"?i.autoAllowSkills:void 0,g=f??n.autoAllowSkills,b=f==null;return d`
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
              @change=${$=>{const S=$.target.value;!t&&S==="__default__"?e.onRemove([...o,"security"]):e.onPatch([...o,"security"],S)}}
            >
              ${t?w:d`<option value="__default__" ?selected=${l==="__default__"}>
                    Use default (${n.security})
                  </option>`}
              ${ka.map($=>d`<option
                    value=${$.value}
                    ?selected=${l===$.value}
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
              @change=${$=>{const S=$.target.value;!t&&S==="__default__"?e.onRemove([...o,"ask"]):e.onPatch([...o,"ask"],S)}}
            >
              ${t?w:d`<option value="__default__" ?selected=${c==="__default__"}>
                    Use default (${n.ask})
                  </option>`}
              ${Jv.map($=>d`<option
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
              @change=${$=>{const S=$.target.value;!t&&S==="__default__"?e.onRemove([...o,"askFallback"]):e.onPatch([...o,"askFallback"],S)}}
            >
              ${t?w:d`<option value="__default__" ?selected=${p==="__default__"}>
                    Use default (${n.askFallback})
                  </option>`}
              ${ka.map($=>d`<option
                    value=${$.value}
                    ?selected=${p===$.value}
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
            ${t?"Allow skill executables listed by the Gateway.":b?`Using default (${n.autoAllowSkills?"on":"off"}).`:`Override (${g?"on":"off"}).`}
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>Enabled</span>
            <input
              type="checkbox"
              ?disabled=${e.disabled}
              .checked=${g}
              @change=${$=>{const k=$.target;e.onPatch([...o,"autoAllowSkills"],k.checked)}}
            />
          </label>
          ${!t&&!b?d`<button
                class="btn btn--sm"
                ?disabled=${e.disabled}
                @click=${()=>e.onRemove([...o,"autoAllowSkills"])}
              >
                Use default
              </button>`:w}
        </div>
      </div>
    </div>
  `}function ly(e){const t=["agents",e.selectedScope,"allowlist"],n=e.allowlist;return d`
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
            `:n.map((i,o)=>cy(e,i,o))}
    </div>
  `}function cy(e,t,n){var r;const i=t.lastUsedAt?Et(t.lastUsedAt):"never",o=t.lastUsedCommand?uo(t.lastUsedCommand,120):null,s=t.lastResolvedPath?uo(t.lastResolvedPath,120):null;return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${(r=t.pattern)!=null&&r.trim()?t.pattern:"New pattern"}</div>
        <div class="list-sub">Last used: ${i}</div>
        ${o?d`<div class="list-sub mono">${o}</div>`:w}
        ${s?d`<div class="list-sub mono">${s}</div>`:w}
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
  `}function dy(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(a=>String(a)==="system.execApprovals.get"||String(a)==="system.execApprovals.set"))continue;const s=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!s)continue;const r=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():s;t.push({id:s,label:r===s?s:`${r} · ${s}`})}return t.sort((n,i)=>n.label.localeCompare(i.label)),t}function uy(e){const t=my(e),n=iy(e);return d`
    ${oy(n)}
    ${vy(t)}
    ${py(e)}
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
              `:e.nodes.map(i=>$y(i))}
      </div>
    </section>
  `}function py(e){const t=e.devicesList??{pending:[],paired:[]},n=Array.isArray(t.pending)?t.pending:[],i=Array.isArray(t.paired)?t.paired:[];return d`
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
              ${n.map(o=>fy(o,e))}
            `:w}
        ${i.length>0?d`
              <div class="muted" style="margin-top: 12px; margin-bottom: 8px;">Paired</div>
              ${i.map(o=>gy(o,e))}
            `:w}
        ${n.length===0&&i.length===0?d`
                <div class="muted">No paired devices.</div>
              `:w}
      </div>
    </section>
  `}function fy(e,t){var a,l;const n=((a=e.displayName)==null?void 0:a.trim())||e.deviceId,i=typeof e.ts=="number"?Et(e.ts):"n/a",o=(l=e.role)!=null&&l.trim()?`role: ${e.role}`:"role: -",s=e.isRepair?" · repair":"",r=e.remoteIp?` · ${e.remoteIp}`:"";return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${n}</div>
        <div class="list-sub">${e.deviceId}${r}</div>
        <div class="muted" style="margin-top: 6px;">
          ${o} · requested ${i}${s}
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
  `}function gy(e,t){var a;const n=((a=e.displayName)==null?void 0:a.trim())||e.deviceId,i=e.remoteIp?` · ${e.remoteIp}`:"",o=`roles: ${co(e.roles)}`,s=`scopes: ${co(e.scopes)}`,r=Array.isArray(e.tokens)?e.tokens:[];return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${n}</div>
        <div class="list-sub">${e.deviceId}${i}</div>
        <div class="muted" style="margin-top: 6px;">${o} · ${s}</div>
        ${r.length===0?d`
                <div class="muted" style="margin-top: 6px">Tokens: none</div>
              `:d`
              <div class="muted" style="margin-top: 10px;">Tokens</div>
              <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 6px;">
                ${r.map(l=>hy(e.deviceId,l,t))}
              </div>
            `}
      </div>
    </div>
  `}function hy(e,t,n){const i=t.revokedAtMs?"revoked":"active",o=`scopes: ${co(t.scopes)}`,s=Et(t.rotatedAtMs??t.createdAtMs??t.lastUsedAtMs??null);return d`
    <div class="row" style="justify-content: space-between; gap: 8px;">
      <div class="list-sub">${t.role} · ${i} · ${o} · ${s}</div>
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
  `}function my(e){const t=e.configForm,n=by(e.nodes),{defaultBinding:i,agents:o}=wy(t),s=!!t,r=e.configSaving||e.configFormMode==="raw";return{ready:s,disabled:r,configDirty:e.configDirty,configLoading:e.configLoading,configSaving:e.configSaving,defaultBinding:i,agents:o,nodes:n,onBindDefault:e.onBindDefault,onBindAgent:e.onBindAgent,onSave:e.onSaveBindings,onLoadConfig:e.onLoadConfig,formMode:e.configFormMode}}function vy(e){const t=e.nodes.length>0,n=e.defaultBinding??"";return d`
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
                      @change=${i=>{const s=i.target.value.trim();e.onBindDefault(s||null)}}
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
                    `:e.agents.map(i=>yy(i,e))}
            </div>
          `:d`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load config to edit bindings.</div>
            <button class="btn" ?disabled=${e.configLoading} @click=${e.onLoadConfig}>
              ${e.configLoading?"Loading…":"Load config"}
            </button>
          </div>`}
    </section>
  `}function yy(e,t){var s;const n=e.binding??"__default__",i=(s=e.name)!=null&&s.trim()?`${e.name} (${e.id})`:e.id,o=t.nodes.length>0;return d`
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
            ?disabled=${t.disabled||!o}
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
  `}function by(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(a=>String(a)==="system.run"))continue;const s=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!s)continue;const r=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():s;t.push({id:s,label:r===s?s:`${r} · ${s}`})}return t.sort((n,i)=>n.label.localeCompare(i.label)),t}function wy(e){const t={id:"main",name:void 0,index:0,isDefault:!0,binding:null};if(!e||typeof e!="object")return{defaultBinding:null,agents:[t]};const i=(e.tools??{}).exec??{},o=typeof i.node=="string"&&i.node.trim()?i.node.trim():null,s=e.agents??{},r=Array.isArray(s.list)?s.list:[];if(r.length===0)return{defaultBinding:o,agents:[t]};const a=[];return r.forEach((l,c)=>{if(!l||typeof l!="object")return;const p=l,f=typeof p.id=="string"?p.id.trim():"";if(!f)return;const g=typeof p.name=="string"?p.name.trim():void 0,b=p.default===!0,k=(p.tools??{}).exec??{},S=typeof k.node=="string"&&k.node.trim()?k.node.trim():null;a.push({id:f,name:g||void 0,index:c,isDefault:b,binding:S})}),a.length===0&&a.push(t),{defaultBinding:o,agents:a}}function $y(e){const t=!!e.connected,n=!!e.paired,i=typeof e.displayName=="string"&&e.displayName.trim()||(typeof e.nodeId=="string"?e.nodeId:"unknown"),o=Array.isArray(e.caps)?e.caps:[],s=Array.isArray(e.commands)?e.commands:[];return d`
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
          ${o.slice(0,12).map(r=>d`<span class="chip">${String(r)}</span>`)}
          ${s.slice(0,8).map(r=>d`<span class="chip">${String(r)}</span>`)}
        </div>
      </div>
    </div>
  `}function xy(e){var c,p;const t=(c=e.hello)==null?void 0:c.snapshot,n=t!=null&&t.uptimeMs?ja(t.uptimeMs):u("common.na"),i=(p=t==null?void 0:t.policy)!=null&&p.tickIntervalMs?`${t.policy.tickIntervalMs}ms`:u("common.na"),s=(t==null?void 0:t.authMode)==="trusted-proxy",r=(()=>{if(e.connected||!e.lastError)return null;const f=e.lastError.toLowerCase();if(!(f.includes("unauthorized")||f.includes("connect failed")))return null;const b=!!e.settings.token.trim(),$=!!e.password.trim();return!b&&!$?d`
        <div class="muted" style="margin-top: 8px">
          ${u("overview.auth.required")}
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
        ${u("overview.auth.failed",{command:"openclaw dashboard --no-open"})}
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
    `})(),a=(()=>{if(e.connected||!e.lastError||(typeof window<"u"?window.isSecureContext:!0))return null;const g=e.lastError.toLowerCase();return!g.includes("secure context")&&!g.includes("device identity required")?null:d`
      <div class="muted" style="margin-top: 8px">
        ${u("overview.insecure.hint",{url:"http://127.0.0.1:18789"})}
        <div style="margin-top: 6px">
          ${u("overview.insecure.stayHttp",{config:"gateway.controlUi.allowInsecureAuth: true"})}
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
    `})(),l=xt.getLocale();return d`
    <section class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <div>
          <div class="card-title">${u("overview.health.title")}</div>
          <div class="card-sub">
            ${u("overview.health.subtitle")}
          </div>
        </div>
        <div
          class="pill ${e.connected?"success":"danger"}"
          style="font-weight: 600; min-width: 96px; justify-content: center;"
        >
          ${e.connected?u("common.ok"):u("common.offline")}
        </div>
      </div>
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        <div class="card stat-card" style="min-width: 140px;">
          <div class="stat-label">${u("overview.stats.instances")}</div>
          <div class="stat-value">${e.presenceCount}</div>
          <div class="muted">${u("overview.stats.instancesHint")}</div>
        </div>
        <div class="card stat-card" style="min-width: 140px;">
          <div class="stat-label">${u("overview.stats.sessions")}</div>
          <div class="stat-value">${e.sessionsCount??u("common.na")}</div>
          <div class="muted">${u("overview.stats.sessionsHint")}</div>
        </div>
        <div class="card stat-card" style="min-width: 140px;">
          <div class="stat-label">${u("overview.stats.cron")}</div>
          <div class="stat-value">
            ${e.cronEnabled==null?u("common.na"):e.cronEnabled?u("common.enabled"):u("common.disabled")}
          </div>
          <div class="muted">
            ${u("overview.stats.cronNext",{time:Kl(e.cronNext)})}
          </div>
        </div>
      </div>
      ${e.lastError?d`<div class="callout danger" style="margin-top: 12px;">
              <div style="font-weight: 600; margin-bottom: 4px;">
                ${u("overview.health.lastErrorLabel")}
              </div>
              <div>${e.lastError}</div>
            </div>`:d`<div class="muted" style="margin-top: 12px;">
              ${u("overview.health.noError")}
            </div>`}
    </section>

    <section class="grid grid-cols-2">
      <div class="card">
        <div class="card-title">${u("overview.access.title")}</div>
        <div class="card-sub">${u("overview.access.subtitle")}</div>
        <div class="form-grid" style="margin-top: 16px;">
          <label class="field">
            <span>${u("overview.access.wsUrl")}</span>
            <input
              .value=${e.settings.gatewayUrl}
              @input=${f=>{const g=f.target.value;e.onSettingsChange({...e.settings,gatewayUrl:g})}}
              placeholder="ws://100.x.y.z:18789"
            />
          </label>
          ${s?"":d`
                <label class="field">
                  <span>${u("overview.access.token")}</span>
                  <input
                    .value=${e.settings.token}
                    @input=${f=>{const g=f.target.value;e.onSettingsChange({...e.settings,token:g})}}
                    placeholder="JAGENT_GATEWAY_TOKEN"
                  />
                </label>
                <label class="field">
                  <span>${u("overview.access.password")}</span>
                  <input
                    type="password"
                    .value=${e.password}
                    @input=${f=>{const g=f.target.value;e.onPasswordChange(g)}}
                    placeholder="system or shared password"
                  />
                </label>
              `}
          <label class="field">
            <span>${u("overview.access.sessionKey")}</span>
            <input
              .value=${e.settings.sessionKey}
              @input=${f=>{const g=f.target.value;e.onSessionKeyChange(g)}}
            />
          </label>
          <label class="field">
            <span>${u("overview.access.language")}</span>
            <select
              .value=${l}
          style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 160px;"
              @change=${f=>{const g=f.target.value;xt.setLocale(g),e.onSettingsChange({...e.settings,locale:g})}}
            >
              <option value="en">${u("languages.en")}</option>
              <option value="zh-CN">${u("languages.zhCN")}</option>
            </select>
          </label>
        </div>
        <div class="row" style="margin-top: 14px;">
          <button class="btn" @click=${()=>e.onConnect()}>${u("common.connect")}</button>
          <button class="btn" @click=${()=>e.onRefresh()}>${u("common.refresh")}</button>
          <span class="muted">${u(s?"overview.access.trustedProxy":"overview.access.connectHint")}</span>
        </div>
      </div>

      <div class="card">
        <div class="card-title">${u("overview.snapshot.title")}</div>
        <div class="card-sub">${u("overview.snapshot.subtitle")}</div>
        <div class="stat-grid" style="margin-top: 16px;">
          <div class="stat">
            <div class="stat-label">${u("overview.snapshot.status")}</div>
            <div class="stat-value ${e.connected?"ok":"warn"}">
              ${e.connected?u("common.ok"):u("common.offline")}
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">${u("overview.snapshot.uptime")}</div>
            <div class="stat-value">${n}</div>
          </div>
          <div class="stat">
            <div class="stat-label">${u("overview.snapshot.tickInterval")}</div>
            <div class="stat-value">${i}</div>
          </div>
          <div class="stat">
            <div class="stat-label">${u("overview.snapshot.lastChannelsRefresh")}</div>
            <div class="stat-value">
              ${e.lastChannelsRefresh?Et(e.lastChannelsRefresh):u("common.na")}
            </div>
          </div>
        </div>
        ${e.lastError?d`<div class="callout danger" style="margin-top: 14px;">
              <div>${e.lastError}</div>
              ${r??""}
              ${a??""}
            </div>`:d`
                <div class="callout" style="margin-top: 14px">
                  ${u("overview.snapshot.channelsHint")}
                </div>
              `}
      </div>
    </section>

    <section class="grid grid-cols-2" style="margin-top: 18px;">
      <div class="card">
        <div class="card-title">${u("overview.oos.title")}</div>
        <div class="card-sub">${u("overview.oos.subtitle")}</div>
        <div class="row" style="margin-top: 12px; gap: 12px; flex-wrap: wrap;">
          ${e.oosStats?[{label:u("overview.oos.stats.totalRecords"),value:e.oosStats.total_records},{label:u("overview.oos.stats.outOfStockCount"),value:e.oosStats.out_of_stock_count},{label:u("overview.oos.stats.today"),value:e.oosStats.today_count},{label:u("overview.oos.stats.reportedGe2"),value:e.oosStats.notified_count}].map(f=>d`
                  <div class="card stat-card" style="min-width: 120px;">
                    <div class="stat-value">${f.value}</div>
                    <div class="stat-label">${f.label}</div>
                  </div>
                `):d`<div class="muted">${u("overview.oos.empty")}</div>`}
        </div>
      </div>
      <div class="card">
        <div class="card-title">${u("overview.shortage.title")}</div>
        <div class="card-sub">${u("overview.shortage.subtitle")}</div>
        <div class="row" style="margin-top: 12px; gap: 12px; flex-wrap: wrap;">
          ${e.shortageStats?[{label:u("overview.shortage.stats.totalRecords"),value:e.shortageStats.total_records},{label:u("overview.shortage.stats.shortageProductCount"),value:e.shortageStats.shortage_product_count},{label:u("overview.shortage.stats.today"),value:e.shortageStats.today_count},{label:u("overview.shortage.stats.reportedGe2"),value:e.shortageStats.reported_ge2_count}].map(f=>d`
                  <div class="card stat-card" style="min-width: 120px;">
                    <div class="stat-value">${f.value}</div>
                    <div class="stat-label">${f.label}</div>
                  </div>
                `):d`<div class="muted">${u("overview.shortage.empty")}</div>`}
        </div>
      </div>
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">${u("overview.notes.title")}</div>
      <div class="card-sub">${u("overview.notes.subtitle")}</div>
      <div class="note-grid" style="margin-top: 14px;">
        <div>
          <div class="note-title">${u("overview.notes.tailscaleTitle")}</div>
          <div class="muted">
            ${u("overview.notes.tailscaleText")}
          </div>
        </div>
        <div>
          <div class="note-title">${u("overview.notes.sessionTitle")}</div>
          <div class="muted">${u("overview.notes.sessionText")}</div>
        </div>
        <div>
          <div class="note-title">${u("overview.notes.cronTitle")}</div>
          <div class="muted">${u("overview.notes.cronText")}</div>
        </div>
      </div>
    </section>
  `}function ky(e){var s;const t=((s=e.report)==null?void 0:s.skills)??[],n=e.filter.trim().toLowerCase(),i=n?t.filter(r=>[r.name,r.description,r.source].join(" ").toLowerCase().includes(n)):t,o=Gl(i);return d`
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

      ${e.error?d`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:w}

      ${i.length===0?d`
              <div class="muted" style="margin-top: 16px">No skills found.</div>
            `:d`
            <div class="agent-skills-groups" style="margin-top: 16px;">
              ${o.map(r=>{const a=r.id==="workspace"||r.id==="built-in";return d`
                  <details class="agent-skills-group" ?open=${!a}>
                    <summary class="agent-skills-header">
                      <span>${r.label}</span>
                      <span class="muted">${r.skills.length}</span>
                    </summary>
                    <div class="list skills-grid">
                      ${r.skills.map(l=>Sy(l,e))}
                    </div>
                  </details>
                `})}
            </div>
          `}
    </section>
  `}function Sy(e,t){const n=t.busyKey===e.skillKey,i=t.edits[e.skillKey]??"",o=t.messages[e.skillKey]??null,s=e.install.length>0&&e.missing.bins.length>0,r=!!(e.bundled&&e.source!=="openclaw-bundled"),a=Wl(e),l=Ql(e);return d`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">
          ${e.emoji?`${e.emoji} `:""}${e.name}
        </div>
        <div class="list-sub">${uo(e.description,140)}</div>
        ${Vl({skill:e,showBundledBadge:r})}
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
          ${s?d`<button
                class="btn"
                ?disabled=${n}
                @click=${()=>t.onInstall(e.skillKey,e.name,e.install[0].id)}
              >
                ${n?"Installing…":e.install[0].label}
              </button>`:w}
        </div>
        ${o?d`<div
              class="muted"
              style="margin-top: 8px; color: ${o.kind==="error"?"var(--danger-color, #d14343)":"var(--success-color, #0a7f5a)"};"
            >
              ${o.message}
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
  `}const _y=/^data:/i,Ay=/^https?:\/\//i;function Cy(e){var a,l;const t=((a=e.agentsList)==null?void 0:a.agents)??[],n=Ua(e.sessionKey),i=(n==null?void 0:n.agentId)??((l=e.agentsList)==null?void 0:l.defaultId)??"main",o=t.find(c=>c.id===i),s=o==null?void 0:o.identity,r=(s==null?void 0:s.avatarUrl)??(s==null?void 0:s.avatar);if(r)return _y.test(r)||Ay.test(r)?r:s==null?void 0:s.avatarUrl}function Ty(e){var $,k,S,R,I,F,A,C,z;const t=e.presenceEntries.length,n=(($=e.sessionsResult)==null?void 0:$.count)??null,i=((k=e.cronStatus)==null?void 0:k.nextWakeAtMs)??null,o=e.connected?null:u("chat.disconnected"),s=e.tab==="chat",r=s&&(e.settings.chatFocusMode||e.onboarding),a=e.onboarding?!1:e.settings.chatShowThinking,l=Cy(e),c=e.chatAvatarUrl??l??null,p=e.configForm??((S=e.configSnapshot)==null?void 0:S.config),f=jt(e.basePath??""),g=e.agentsSelectedId??((R=e.agentsList)==null?void 0:R.defaultId)??((A=(F=(I=e.agentsList)==null?void 0:I.agents)==null?void 0:F[0])==null?void 0:A.id)??null,b=xt.getLocale();return d`
    <div class="shell ${s?"shell--chat":""} ${r?"shell--chat-focus":""} ${e.settings.navCollapsed?"shell--nav-collapsed":""} ${e.onboarding?"shell--onboarding":""}">
      <header class="topbar">
        <div class="topbar-left">
          <button
            class="nav-collapse-toggle"
            @click=${()=>e.applySettings({...e.settings,navCollapsed:!e.settings.navCollapsed})}
            title="${e.settings.navCollapsed?u("nav.expand"):u("nav.collapse")}"
            aria-label="${e.settings.navCollapsed?u("nav.expand"):u("nav.collapse")}"
          >
            <span class="nav-collapse-toggle__icon">${pe.menu}</span>
          </button>
          <div class="brand">
            <div class="brand-logo">
              <img src=${f?`${f}/favicon.svg`:"/favicon.svg"} alt="PT Vansting Agent" />
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
            <span>${u("common.health")}</span>
            <span class="mono">${e.connected?u("common.ok"):u("common.offline")}</span>
          </div>
          ${cg(e)}
          <label class="topbar-lang">
            <span class="sr-only">${u("overview.access.language")}</span>
            <select
              .value=${b}
              style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 140px;"
              @change=${y=>{const _=y.target.value;xt.setLocale(_),e.applySettings({...e.settings,locale:_})}}
            >
              <option value="en">${u("languages.en")}</option>
              <option value="zh-CN">${u("languages.zhCN")}</option>
            </select>
          </label>
        </div>
      </header>
      <aside class="nav ${e.settings.navCollapsed?"nav--collapsed":""}">
        ${rp.map(y=>{const _=e.settings.navGroupsCollapsed[y.label]??!1,T=y.tabs.some(q=>q===e.tab);return d`
            <div class="nav-group ${_&&!T?"nav-group--collapsed":""}">
              <button
                class="nav-label"
                @click=${()=>{const q={...e.settings.navGroupsCollapsed};q[y.label]=!_,e.applySettings({...e.settings,navGroupsCollapsed:q})}}
                aria-expanded=${!_}
              >
                <span class="nav-label__text">${u(`nav.${y.label}`)}</span>
                <span class="nav-label__chevron">${_?"+":"−"}</span>
              </button>
              <div class="nav-group__items">
                ${y.tabs.map(q=>ng(e,q))}
              </div>
            </div>
          `})}
        <div class="nav-group nav-group--links">
          <div class="nav-label nav-label--static">
            <span class="nav-label__text">${u("common.resources")}</span>
          </div>
          <div class="nav-group__items">
            <a
              class="nav-item nav-item--external"
              href="https://docs.openclaw.ai"
              target="_blank"
              rel="noreferrer"
              title="${u("common.docs")} (opens in new tab)"
            >
              <span class="nav-item__icon" aria-hidden="true">${pe.book}</span>
              <span class="nav-item__text">${u("common.docs")}</span>
            </a>
          </div>
        </div>
      </aside>
      <main class="content ${s?"content--chat":""}">
        <section class="content-header">
          <div>
            ${e.tab==="work"?w:d`<div class="page-title">${mo(e.tab)}</div>`}
            ${e.tab==="work"?w:d`<div class="page-sub">${cp(e.tab)}</div>`}
          </div>
          <div class="page-meta">
            ${e.lastError?d`<div class="pill danger">${e.lastError}</div>`:w}
            ${s?ig(e):w}
          </div>
        </section>

        ${e.tab==="overview"?xy({connected:e.connected,hello:e.hello,settings:e.settings,password:e.password,lastError:e.lastError,presenceCount:t,sessionsCount:n,cronEnabled:((C=e.cronStatus)==null?void 0:C.enabled)??null,cronNext:i,lastChannelsRefresh:e.channelsLastSuccess,oosStats:e.overviewOosStats,shortageStats:e.overviewShortageStats,onSettingsChange:y=>e.applySettings(y),onPasswordChange:y=>e.password=y,onSessionKeyChange:y=>{e.sessionKey=y,e.chatMessage="",e.resetToolStream(),e.applySettings({...e.settings,sessionKey:y,lastActiveSessionKey:y}),e.loadAssistantIdentity()},onConnect:()=>e.connect(),onRefresh:()=>e.loadOverview()}):w}

        ${e.tab==="channels"?Vg({loading:e.bkLoading,saving:e.bkSaving,error:e.bkError,content:e.bkContent,lastSuccessAt:e.bkLastSuccess,dependentFiles:e.bkDependentFiles,onReload:()=>Ha(e),onSave:y=>Hd(e,y),onContentChange:y=>e.bkContent=y}):w}

        ${e.tab==="instances"?d`
                ${qv({loading:e.oosLoading,error:e.oosError,stats:e.oosStats,list:e.oosList,byFile:e.oosByFile,byTime:e.oosByTime,db:e.oosDb??void 0,onRefresh:()=>vi(e),onDelete:y=>Vu(e,y),showAddForm:e.oosShowAddForm,onOpenAddForm:()=>e.oosShowAddForm=!0,onCloseAddForm:()=>e.oosShowAddForm=!1,onAdd:async y=>{const _=await Xu(e,y);return _&&(e.oosShowAddForm=!1),_}})}
                ${Gv({loading:e.shortageLoading,error:e.shortageError,stats:e.shortageStats,list:e.shortageList,byFile:e.shortageByFile,byTime:e.shortageByTime,db:e.shortageDb??void 0,onRefresh:()=>yi(e),onDelete:y=>Yu(e,y),showAddForm:e.shortageShowAddForm,onOpenAddForm:()=>e.shortageShowAddForm=!0,onCloseAddForm:()=>e.shortageShowAddForm=!1,onAdd:async y=>{const _=await Zu(e,y);return _&&(e.shortageShowAddForm=!1),_}})}
              `:w}

        ${e.tab==="sessions"?Pv({basePath:e.basePath,loading:e.procurementLoading,error:e.procurementError,suggestions:e.procurementSuggestions,selectedKeys:e.procurementSelectedKeys,approvedKeys:e.procurementApprovedKeys,approveBusy:e.procurementApproveBusy,approveResult:e.procurementApproveResult,filterQuery:e.procurementFilterQuery,sortBy:e.procurementSortBy,sortDir:e.procurementSortDir,page:e.procurementPage,pageSize:e.procurementPageSize,replenishmentDrafts:e.replenishmentDrafts,replenishmentDetail:e.replenishmentDetail,replenishmentDetailId:e.replenishmentDetailId,replenishmentLoading:e.replenishmentLoading,replenishmentError:e.replenishmentError,replenishmentConfirmBusy:e.replenishmentConfirmBusy,replenishmentConfirmResult:e.replenishmentConfirmResult,replenishmentInputLines:e.replenishmentInputLines,replenishmentCreateBusy:e.replenishmentCreateBusy,onReplenishmentLineChange:(y,_,T)=>e.onReplenishmentLineChange(y,_,T),onReplenishmentAddLine:()=>e.onReplenishmentAddLine(),onReplenishmentRemoveLine:y=>e.onReplenishmentRemoveLine(y),onCreateReplenishmentDraft:()=>e.createProcurementReplenishmentDraft(),onReplenishmentRefresh:()=>e.loadProcurementReplenishment(),onSelectReplenishmentDraft:y=>{e.loadProcurementReplenishmentDetail(y)},onConfirmReplenishment:y=>{typeof window<"u"&&!window.confirm(u("replenishment.confirmPrompt"))||e.confirmProcurementReplenishment(y)},onDeleteReplenishmentDraft:y=>{typeof window<"u"&&!window.confirm(u("replenishment.deleteConfirm"))||e.deleteProcurementReplenishmentDraft(y)},onClearReplenishmentDetail:()=>{e.replenishmentDetail=null,e.replenishmentDetailId=null},onRefresh:()=>(e.procurementPage=1,e.loadProcurementSuggestions()),onToggleSelect:y=>{e.procurementSelectedKeys.includes(y)?e.procurementSelectedKeys=e.procurementSelectedKeys.filter(_=>_!==y):e.procurementSelectedKeys=[...e.procurementSelectedKeys,y]},onApprove:y=>{if(typeof window<"u"&&!window.confirm(u("procurement.approveConfirm")))return;const _=[{product_key:y.product_key,product_name:y.product_name,specification:y.specification,shortfall:y.shortfall,code:y.code}];pr(e,_).then(T=>{T&&(T.approved_count??0)>0&&(e.procurementApprovedKeys=[...e.procurementApprovedKeys,De(y)])})},onApproveBatch:()=>{const y=e.procurementSuggestions.filter(T=>e.procurementSelectedKeys.includes(De(T)));if(y.length===0||typeof window<"u"&&!window.confirm(u("procurement.approveBatchConfirm",{count:String(y.length)})))return;const _=y.map(T=>({product_key:T.product_key,product_name:T.product_name,specification:T.specification,shortfall:T.shortfall,code:T.code}));pr(e,_).then(T=>{if(T&&(T.approved_count??0)>0){const q=y.map(P=>De(P));e.procurementApprovedKeys=[...e.procurementApprovedKeys,...q],e.procurementSelectedKeys=e.procurementSelectedKeys.filter(P=>!q.includes(P))}})},onFilterQueryChange:y=>{e.procurementFilterQuery=y,e.procurementPage=1},onSortByChange:y=>{e.procurementSortBy=y,e.procurementPage=1},onSortDirChange:y=>{e.procurementSortDir=y,e.procurementPage=1},onPageChange:y=>{e.procurementPage=Math.max(1,y)},onPageSizeChange:y=>{e.procurementPageSize=Math.max(1,y),e.procurementPage=1}}):w}

        ${Qf(e)}

        ${e.tab==="cron"?Lv({basePath:e.basePath,loading:e.fulfillDraftsLoading,error:e.fulfillDraftsError,drafts:e.fulfillDrafts,detail:e.fulfillDetail,detailId:e.fulfillDetailId,confirmBusy:e.fulfillConfirmBusy,confirmResult:e.fulfillConfirmResult,filterQuery:e.fulfillFilterQuery,sortBy:e.fulfillSortBy,sortDir:e.fulfillSortDir,page:e.fulfillPage,pageSize:e.fulfillPageSize,onRefresh:()=>(e.fulfillPage=1,e.loadFulfillDrafts()),onSelectDraft:y=>Zd(e,y),onConfirm:y=>{var j;const _=e.fulfillDetailId===y?e.fulfillDetail:null,T=((j=_==null?void 0:_.lines)==null?void 0:j.length)??0,q=((_==null?void 0:_.lines)??[]).reduce((H,G)=>H+Number(G.amount??0),0),P=T>0?u("fulfill.confirmPrompt",{count:String(T),amount:q.toFixed(2)}):u("fulfill.confirmPromptSimple");typeof window<"u"&&window.confirm(P)&&eu(e,y).then(H=>{H!=null&&H.order_id&&e.loadProcurementSuggestions()})},onClearDetail:()=>{e.fulfillDetail=null,e.fulfillDetailId=null,e.fulfillConfirmResult=null},onFilterQueryChange:y=>{e.fulfillFilterQuery=y,e.fulfillPage=1},onSortByChange:y=>{e.fulfillSortBy=y,e.fulfillPage=1},onSortDirChange:y=>{e.fulfillSortDir=y,e.fulfillPage=1},onPageChange:y=>{e.fulfillPage=Math.max(1,y)},onPageSizeChange:y=>{e.fulfillPageSize=Math.max(1,y),e.fulfillPage=1}}):w}

        ${e.tab==="agents"?jg({loading:e.agentsLoading,error:e.agentsError,agentsList:e.agentsList,selectedAgentId:g,activePanel:e.agentsPanel,configForm:p,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,channelsLoading:e.channelsLoading,channelsError:e.channelsError,channelsSnapshot:e.channelsSnapshot,channelsLastSuccess:e.channelsLastSuccess,cronLoading:e.cronLoading,cronStatus:e.cronStatus,cronJobs:e.cronJobs,cronError:e.cronError,agentFilesLoading:e.agentFilesLoading,agentFilesError:e.agentFilesError,agentFilesList:e.agentFilesList,agentFileActive:e.agentFileActive,agentFileContents:e.agentFileContents,agentFileDrafts:e.agentFileDrafts,agentFileSaving:e.agentFileSaving,agentIdentityLoading:e.agentIdentityLoading,agentIdentityError:e.agentIdentityError,agentIdentityById:e.agentIdentityById,agentSkillsLoading:e.agentSkillsLoading,agentSkillsReport:e.agentSkillsReport,agentSkillsError:e.agentSkillsError,agentSkillsAgentId:e.agentSkillsAgentId,skillsFilter:e.skillsFilter,onRefresh:async()=>{var _,T;await Qo(e);const y=((T=(_=e.agentsList)==null?void 0:_.agents)==null?void 0:T.map(q=>q.id))??[];y.length>0&&Ka(e,y)},onSelectAgent:y=>{e.agentsSelectedId!==y&&(e.agentsSelectedId=y,e.agentFilesList=null,e.agentFilesError=null,e.agentFilesLoading=!1,e.agentFileActive=null,e.agentFileContents={},e.agentFileDrafts={},e.agentSkillsReport=null,e.agentSkillsError=null,e.agentSkillsAgentId=null,za(e,y),e.agentsPanel==="files"&&Yi(e,y),e.agentsPanel==="skills"&&Vn(e,y))},onSelectPanel:y=>{var _;e.agentsPanel=y,y==="files"&&g&&((_=e.agentFilesList)==null?void 0:_.agentId)!==g&&(e.agentFilesList=null,e.agentFilesError=null,e.agentFileActive=null,e.agentFileContents={},e.agentFileDrafts={},Yi(e,g)),y==="skills"&&g&&Vn(e,g),y==="channels"&&Re(e,!1),y==="cron"&&e.loadCron()},onLoadFiles:y=>Yi(e,y),onSelectFile:y=>{e.agentFileActive=y,g&&fg(e,g,y)},onFileDraftChange:(y,_)=>{e.agentFileDrafts={...e.agentFileDrafts,[y]:_}},onFileReset:y=>{const _=e.agentFileContents[y]??"";e.agentFileDrafts={...e.agentFileDrafts,[y]:_}},onFileSave:y=>{if(!g)return;const _=e.agentFileDrafts[y]??e.agentFileContents[y]??"";gg(e,g,y,_)},onToolsProfileChange:(y,_,T)=>{var H;if(!p)return;const q=(H=p.agents)==null?void 0:H.list;if(!Array.isArray(q))return;const P=q.findIndex(G=>G&&typeof G=="object"&&"id"in G&&G.id===y);if(P<0)return;const j=["agents","list",P,"tools"];_?Ce(e,[...j,"profile"],_):Xe(e,[...j,"profile"]),T&&Xe(e,[...j,"allow"])},onToolsOverridesChange:(y,_,T)=>{var H;if(!p)return;const q=(H=p.agents)==null?void 0:H.list;if(!Array.isArray(q))return;const P=q.findIndex(G=>G&&typeof G=="object"&&"id"in G&&G.id===y);if(P<0)return;const j=["agents","list",P,"tools"];_.length>0?Ce(e,[...j,"alsoAllow"],_):Xe(e,[...j,"alsoAllow"]),T.length>0?Ce(e,[...j,"deny"],T):Xe(e,[...j,"deny"])},onConfigReload:()=>Ge(e),onConfigSave:()=>Qn(e),onChannelsRefresh:()=>Re(e,!1),onCronRefresh:()=>e.loadCron(),onSkillsFilterChange:y=>e.skillsFilter=y,onSkillsRefresh:()=>{g&&Vn(e,g)},onAgentSkillToggle:(y,_,T)=>{var L,Y,ge;if(!p)return;const q=(L=p.agents)==null?void 0:L.list;if(!Array.isArray(q))return;const P=q.findIndex(Q=>Q&&typeof Q=="object"&&"id"in Q&&Q.id===y);if(P<0)return;const j=q[P],H=_.trim();if(!H)return;const G=((ge=(Y=e.agentSkillsReport)==null?void 0:Y.skills)==null?void 0:ge.map(Q=>Q.name).filter(Boolean))??[],ne=(Array.isArray(j.skills)?j.skills.map(Q=>String(Q).trim()).filter(Boolean):void 0)??G,be=new Set(ne);T?be.add(H):be.delete(H),Ce(e,["agents","list",P,"skills"],[...be])},onAgentSkillsClear:y=>{var q;if(!p)return;const _=(q=p.agents)==null?void 0:q.list;if(!Array.isArray(_))return;const T=_.findIndex(P=>P&&typeof P=="object"&&"id"in P&&P.id===y);T<0||Xe(e,["agents","list",T,"skills"])},onAgentSkillsDisableAll:y=>{var q;if(!p)return;const _=(q=p.agents)==null?void 0:q.list;if(!Array.isArray(_))return;const T=_.findIndex(P=>P&&typeof P=="object"&&"id"in P&&P.id===y);T<0||Ce(e,["agents","list",T,"skills"],[])},onModelChange:(y,_)=>{var G;if(!p)return;const T=(G=p.agents)==null?void 0:G.list;if(!Array.isArray(T))return;const q=T.findIndex(N=>N&&typeof N=="object"&&"id"in N&&N.id===y);if(q<0)return;const P=["agents","list",q,"model"];if(!_){Xe(e,P);return}const j=T[q],H=j==null?void 0:j.model;if(H&&typeof H=="object"&&!Array.isArray(H)){const N=H.fallbacks,ne={primary:_,...Array.isArray(N)?{fallbacks:N}:{}};Ce(e,P,ne)}else Ce(e,P,_)},onModelFallbacksChange:(y,_)=>{var L;if(!p)return;const T=(L=p.agents)==null?void 0:L.list;if(!Array.isArray(T))return;const q=T.findIndex(Y=>Y&&typeof Y=="object"&&"id"in Y&&Y.id===y);if(q<0)return;const P=["agents","list",q,"model"],j=T[q],H=_.map(Y=>Y.trim()).filter(Boolean),G=j.model,ne=(()=>{if(typeof G=="string")return G.trim()||null;if(G&&typeof G=="object"&&!Array.isArray(G)){const Y=G.primary;if(typeof Y=="string")return Y.trim()||null}return null})();if(H.length===0){ne?Ce(e,P,ne):Xe(e,P);return}Ce(e,P,ne?{primary:ne,fallbacks:H}:{fallbacks:H})}}):w}

        ${e.tab==="skills"?ky({loading:e.skillsLoading,report:e.skillsReport,error:e.skillsError,filter:e.skillsFilter,edits:e.skillEdits,messages:e.skillMessages,busyKey:e.skillsBusyKey,onFilterChange:y=>e.skillsFilter=y,onRefresh:()=>kn(e,{clearMessages:!0}),onToggle:(y,_)=>ip(e,y,_),onEdit:(y,_)=>np(e,y,_),onSaveKey:y=>op(e,y),onInstall:(y,_,T)=>sp(e,y,_,T)}):w}

        ${e.tab==="nodes"?uy({loading:e.nodesLoading,nodes:e.nodes,devicesLoading:e.devicesLoading,devicesError:e.devicesError,devicesList:e.devicesList,configForm:e.configForm??((z=e.configSnapshot)==null?void 0:z.config),configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,configFormMode:e.configFormMode,execApprovalsLoading:e.execApprovalsLoading,execApprovalsSaving:e.execApprovalsSaving,execApprovalsDirty:e.execApprovalsDirty,execApprovalsSnapshot:e.execApprovalsSnapshot,execApprovalsForm:e.execApprovalsForm,execApprovalsSelectedAgent:e.execApprovalsSelectedAgent,execApprovalsTarget:e.execApprovalsTarget,execApprovalsTargetNodeId:e.execApprovalsTargetNodeId,onRefresh:()=>gi(e),onDevicesRefresh:()=>dt(e),onDeviceApprove:y=>Bu(e,y),onDeviceReject:y=>Uu(e,y),onDeviceRotate:(y,_,T)=>qu(e,{deviceId:y,role:_,scopes:T}),onDeviceRevoke:(y,_)=>zu(e,{deviceId:y,role:_}),onLoadConfig:()=>Ge(e),onLoadExecApprovals:()=>{const y=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return ss(e,y)},onBindDefault:y=>{y?Ce(e,["tools","exec","node"],y):Xe(e,["tools","exec","node"])},onBindAgent:(y,_)=>{const T=["agents","list",y,"tools","exec","node"];_?Ce(e,T,_):Xe(e,T)},onSaveBindings:()=>Qn(e),onExecApprovalsTargetChange:(y,_)=>{e.execApprovalsTarget=y,e.execApprovalsTargetNodeId=_,e.execApprovalsSnapshot=null,e.execApprovalsForm=null,e.execApprovalsDirty=!1,e.execApprovalsSelectedAgent=null},onExecApprovalsSelectAgent:y=>{e.execApprovalsSelectedAgent=y},onExecApprovalsPatch:(y,_)=>Wu(e,y,_),onExecApprovalsRemove:y=>Qu(e,y),onSaveExecApprovals:()=>{const y=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return Gu(e,y)}}):w}

        ${e.tab==="chat"?cv({sessionKey:e.sessionKey,onSessionKeyChange:y=>{e.sessionKey=y,e.chatMessage="",e.chatAttachments=[],e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.chatQueue=[],e.resetToolStream(),e.resetToolRender(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:y,lastActiveSessionKey:y}),e.loadAssistantIdentity(),Kt(e),bo(e)},thinkingLevel:e.chatThinkingLevel,showThinking:a,loading:e.chatLoading,sending:e.chatSending,compactionStatus:e.compactionStatus,toolRenderData:e.toolRenderData,toolRenderSeq:e.toolRenderSeq,assistantAvatarUrl:c,messages:e.chatMessages,toolMessages:e.chatToolMessages,stream:e.chatStream,streamStartedAt:e.chatStreamStartedAt,draft:e.chatMessage,queue:e.chatQueue,connected:e.connected,canSend:e.connected,disabledReason:o,error:e.lastError,sessions:e.sessionsResult,focusMode:r,onRefresh:()=>(e.resetToolStream(),Promise.all([Kt(e),bo(e)])),onToggleFocusMode:()=>{e.onboarding||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})},onChatScroll:y=>e.handleChatScroll(y),onDraftChange:y=>e.chatMessage=y,attachments:e.chatAttachments,onAttachmentsChange:y=>e.chatAttachments=y,uploadedFile:e.chatUploadedFile,onFileSelect:y=>e.handleUploadChatFile(y),onClearUploadedFile:()=>e.clearChatUploadedFile(),composeDragOver:e.chatComposeDragOver,onComposeDragOver:()=>e.setChatComposeDragOver(!0),onComposeDragLeave:()=>e.setChatComposeDragOver(!1),onComposeDrop:y=>e.handleComposeDrop(y),onSend:()=>e.handleSendChat(),canAbort:!!e.chatRunId,onAbort:()=>void e.handleAbortChat(),onQueueRemove:y=>e.removeQueuedMessage(y),onNewSession:()=>e.handleSendChat("/new",{restoreDraft:!0}),showNewMessages:e.chatNewMessagesBelow&&!e.chatManualRefreshInFlight,onScrollToBottom:()=>e.scrollToBottom(),sidebarOpen:e.sidebarOpen,sidebarContent:e.sidebarContent,sidebarError:e.sidebarError,splitRatio:e.splitRatio,onOpenSidebar:y=>e.handleOpenSidebar(y),onCloseSidebar:()=>e.handleCloseSidebar(),onSplitRatioChange:y=>e.handleSplitRatioChange(y),assistantName:e.assistantName,assistantAvatar:e.assistantAvatar}):w}

        ${e.tab==="config"?Tv({raw:e.configRaw,originalRaw:e.configRawOriginal,valid:e.configValid,issues:e.configIssues,loading:e.configLoading,saving:e.configSaving,applying:e.configApplying,updating:e.updateRunning,connected:e.connected,schema:e.configSchema,schemaLoading:e.configSchemaLoading,uiHints:e.configUiHints,formMode:e.configFormMode,formValue:e.configForm,originalValue:e.configFormOriginal,searchQuery:e.configSearchQuery,activeSection:e.configActiveSection,activeSubsection:e.configActiveSubsection,onRawChange:y=>{e.configRaw=y},onFormModeChange:y=>e.configFormMode=y,onFormPatch:(y,_)=>Ce(e,y,_),onSearchChange:y=>e.configSearchQuery=y,onSectionChange:y=>{e.configActiveSection=y,e.configActiveSubsection=null},onSubsectionChange:y=>e.configActiveSubsection=y,onReload:()=>Ge(e),onSave:()=>Qn(e),onApply:()=>hd(e),onUpdate:()=>md(e)}):w}

        ${e.tab==="debug"?Dv({loading:e.debugLoading,status:e.debugStatus,health:e.debugHealth,models:e.debugModels,heartbeat:e.debugHeartbeat,eventLog:e.eventLog,callMethod:e.debugCallMethod,callParams:e.debugCallParams,callResult:e.debugCallResult,callError:e.debugCallError,onCallMethodChange:y=>e.debugCallMethod=y,onCallParamsChange:y=>e.debugCallParams=y,onRefresh:()=>fi(e),onCall:()=>Md(e)}):w}

        ${e.tab==="logs"?Uv({loading:e.logsLoading,error:e.logsError,file:e.logsFile,entries:e.logsEntries,filterText:e.logsFilterText,levelFilters:e.logsLevelFilters,autoFollow:e.logsAutoFollow,truncated:e.logsTruncated,onFilterTextChange:y=>e.logsFilterText=y,onLevelToggle:(y,_)=>{e.logsLevelFilters={...e.logsLevelFilters,[y]:_}},onToggleAutoFollow:y=>e.logsAutoFollow=y,onRefresh:()=>Ko(e,{reset:!0}),onExport:(y,_)=>e.exportLogs(y,_),onScroll:y=>e.handleLogsScroll(y)}):w}
      </main>
      ${Fv(e)}
      ${Nv(e)}
    </div>
  `}var Ey=Object.defineProperty,Ry=Object.getOwnPropertyDescriptor,m=(e,t,n,i)=>{for(var o=i>1?void 0:i?Ry(t,n):t,s=e.length-1,r;s>=0;s--)(r=e[s])&&(o=(i?r(t,n,o):r(o))||o);return i&&o&&Ey(t,n,o),o};const ao=ps({});function Ly(){if(!window.location.search)return!1;const t=new URLSearchParams(window.location.search).get("onboarding");if(!t)return!1;const n=t.trim().toLowerCase();return n==="1"||n==="true"||n==="yes"||n==="on"}let h=class extends Bt{constructor(){super(),this.i18nController=new ad(this),this.settings=dp(),this.password="",this.tab="chat",this.onboarding=Ly(),this.connected=!1,this.theme=this.settings.theme??"system",this.themeResolved="dark",this.hello=null,this.lastError=null,this.eventLog=[],this.eventLogBuffer=[],this.toolStreamSyncTimer=null,this.sidebarCloseTimer=null,this.assistantName=ao.name,this.assistantAvatar=ao.avatar,this.assistantAgentId=ao.agentId??null,this.sessionKey=this.settings.sessionKey,this.chatLoading=!1,this.chatSending=!1,this.chatMessage="",this.chatMessages=[],this.chatToolMessages=[],this.chatStream=null,this.chatStreamStartedAt=null,this.chatRunId=null,this.compactionStatus=null,this.chatAvatarUrl=null,this.chatThinkingLevel=null,this.chatQueue=[],this.chatAttachments=[],this.chatUploadedFile=null,this.chatComposeDragOver=!1,this.chatManualRefreshInFlight=!1,this.sidebarOpen=!1,this.sidebarContent=null,this.sidebarError=null,this.splitRatio=this.settings.splitRatio,this.nodesLoading=!1,this.nodes=[],this.devicesLoading=!1,this.devicesError=null,this.devicesList=null,this.execApprovalsLoading=!1,this.execApprovalsSaving=!1,this.execApprovalsDirty=!1,this.execApprovalsSnapshot=null,this.execApprovalsForm=null,this.execApprovalsSelectedAgent=null,this.execApprovalsTarget="gateway",this.execApprovalsTargetNodeId=null,this.execApprovalQueue=[],this.execApprovalBusy=!1,this.execApprovalError=null,this.pendingGatewayUrl=null,this.configLoading=!1,this.configRaw=`{
}
`,this.configRawOriginal="",this.configValid=null,this.configIssues=[],this.configSaving=!1,this.configApplying=!1,this.updateRunning=!1,this.applySessionKey=this.settings.lastActiveSessionKey,this.configSnapshot=null,this.configSchema=null,this.configSchemaVersion=null,this.configSchemaLoading=!1,this.configUiHints={},this.configForm=null,this.configFormOriginal=null,this.configFormDirty=!1,this.configFormMode="form",this.configSearchQuery="",this.configActiveSection=null,this.configActiveSubsection=null,this.channelsLoading=!1,this.channelsSnapshot=null,this.channelsError=null,this.channelsLastSuccess=null,this.bkContent="",this.bkLoading=!1,this.bkError=null,this.bkSaving=!1,this.bkLastSuccess=null,this.bkDependentFiles=null,this.whatsappLoginMessage=null,this.whatsappLoginQrDataUrl=null,this.whatsappLoginConnected=null,this.whatsappBusy=!1,this.nostrProfileFormState=null,this.nostrProfileAccountId=null,this.presenceLoading=!1,this.presenceEntries=[],this.presenceError=null,this.presenceStatus=null,this.oosLoading=!1,this.oosError=null,this.oosStats=null,this.oosList=[],this.oosByFile=[],this.oosByTime=[],this.oosShowAddForm=!1,this.oosDb=null,this.shortageLoading=!1,this.shortageError=null,this.shortageStats=null,this.shortageList=[],this.shortageByFile=[],this.shortageByTime=[],this.shortageShowAddForm=!1,this.shortageDb=null,this.overviewOosStats=null,this.overviewOosError=null,this.overviewShortageStats=null,this.overviewShortageError=null,this.agentsLoading=!1,this.agentsList=null,this.agentsError=null,this.agentsSelectedId=null,this.agentsPanel="overview",this.agentFilesLoading=!1,this.agentFilesError=null,this.agentFilesList=null,this.agentFileContents={},this.agentFileDrafts={},this.agentFileActive=null,this.agentFileSaving=!1,this.agentIdentityLoading=!1,this.agentIdentityError=null,this.agentIdentityById={},this.agentSkillsLoading=!1,this.agentSkillsError=null,this.agentSkillsReport=null,this.agentSkillsAgentId=null,this.sessionsLoading=!1,this.sessionsResult=null,this.sessionsError=null,this.sessionsFilterActive="",this.sessionsFilterLimit="120",this.sessionsIncludeGlobal=!0,this.sessionsIncludeUnknown=!1,this.usageLoading=!1,this.usageResult=null,this.usageCostSummary=null,this.usageError=null,this.usageRequestSeq=0,this.usageTimeSeriesRequestSeq=0,this.usageSessionLogsRequestSeq=0,this.usageStartDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageEndDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageSelectedSessions=[],this.usageSelectedDays=[],this.usageSelectedHours=[],this.usageChartMode="tokens",this.usageDailyChartMode="by-type",this.usageTimeSeriesMode="per-turn",this.usageTimeSeriesBreakdownMode="by-type",this.usageTimeSeries=null,this.usageTimeSeriesLoading=!1,this.usageTimeSeriesCursorStart=null,this.usageTimeSeriesCursorEnd=null,this.usageSessionLogs=null,this.usageSessionLogsLoading=!1,this.usageSessionLogsExpanded=!1,this.usageQuery="",this.usageQueryDraft="",this.usageSessionSort="recent",this.usageSessionSortDir="desc",this.usageRecentSessions=[],this.usageTimeZone="local",this.usageContextExpanded=!1,this.usageHeaderPinned=!1,this.usageSessionsTab="all",this.usageVisibleColumns=["channel","agent","provider","model","messages","tools","errors","duration"],this.usageLogFilterRoles=[],this.usageLogFilterTools=[],this.usageLogFilterHasTools=!1,this.usageLogFilterQuery="",this.usageQueryDebounceTimer=null,this.workFilePaths=[],this.workOriginalFileNamesByPath={},this.workRunning=!1,this.workProgressStage=0,this._workProgressInterval=null,this.workRunStatus="idle",this.workRunId=null,this.workPendingChoices=[],this.workSelections={},this.workResult=null,this.workError=null,this.workCustomerLevel="B_QUOTE",this.workDoRegisterOos=!1,this.workPendingQuotationDraft=null,this.workQuotationDraftSaveStatus=null,this.workTextInput="",this.workTextGenerating=!1,this.workTextError=null,this.workPriceLevelOptions=[],this.cronLoading=!1,this.cronJobs=[],this.cronStatus=null,this.cronError=null,this.cronForm={...rf},this.cronRunsJobId=null,this.cronRuns=[],this.cronBusy=!1,this.fulfillDraftsLoading=!1,this.fulfillDraftsError=null,this.fulfillDrafts=[],this.fulfillDetail=null,this.fulfillDetailId=null,this.fulfillConfirmBusy=!1,this.fulfillConfirmResult=null,this.fulfillFilterQuery="",this.fulfillSortBy="created_at",this.fulfillSortDir="desc",this.fulfillPage=1,this.fulfillPageSize=10,this.procurementLoading=!1,this.procurementError=null,this.procurementSuggestions=[],this.procurementSelectedKeys=[],this.procurementApprovedKeys=[],this.procurementApproveBusy=!1,this.procurementApproveResult=null,this.procurementFilterQuery="",this.procurementSortBy="uploaded_at",this.procurementSortDir="desc",this.procurementPage=1,this.procurementPageSize=10,this.replenishmentDrafts=[],this.replenishmentDetail=null,this.replenishmentDetailId=null,this.replenishmentLoading=!1,this.replenishmentError=null,this.replenishmentConfirmBusy=!1,this.replenishmentConfirmResult=null,this.replenishmentInputLines=[{product_or_code:"",quantity:0}],this.replenishmentCreateBusy=!1,this.skillsLoading=!1,this.skillsReport=null,this.skillsError=null,this.skillsFilter="",this.skillEdits={},this.skillsBusyKey=null,this.skillMessages={},this.debugLoading=!1,this.debugStatus=null,this.debugHealth=null,this.debugModels=[],this.debugHeartbeat=null,this.debugCallMethod="",this.debugCallParams="{}",this.debugCallResult=null,this.debugCallError=null,this.logsLoading=!1,this.logsError=null,this.logsFile=null,this.logsEntries=[],this.logsFilterText="",this.logsLevelFilters={...sf},this.logsAutoFollow=!0,this.logsTruncated=!1,this.logsCursor=null,this.logsLastFetchAt=null,this.logsLimit=500,this.logsMaxBytes=25e4,this.logsAtBottom=!0,this.client=null,this.chatScrollFrame=null,this.chatScrollTimeout=null,this.chatHasAutoScrolled=!1,this.chatUserNearBottom=!0,this.chatNewMessagesBelow=!1,this.nodesPollInterval=null,this.logsPollInterval=null,this.debugPollInterval=null,this.logsScrollFrame=null,this.toolStreamById=new Map,this.toolStreamOrder=[],this.toolRenderData=null,this.toolRenderSeq=null,this.refreshSessionsAfterChat=new Set,this.basePath="",this.popStateHandler=()=>kp(this),this.themeMedia=null,this.themeMediaHandler=null,this.topbarObserver=null,qo(this.settings.locale)&&xt.setLocale(this.settings.locale)}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),Uf(this)}firstUpdated(){qf(this)}disconnectedCallback(){zf(this),super.disconnectedCallback()}updated(e){e.has("workRunning")&&(this.workRunning?(this.workProgressStage=this.workRunStatus==="resuming"?1:0,this._workProgressInterval!=null&&(clearInterval(this._workProgressInterval),this._workProgressInterval=null)):(this._workProgressInterval!=null&&(clearInterval(this._workProgressInterval),this._workProgressInterval=null),this.workRunStatus==="done"&&(this.workProgressStage=2))),Kf(this,e)}connect(){Il(this)}handleChatScroll(e){Ld(this,e)}handleLogsScroll(e){Id(this,e)}exportLogs(e,t){Pd(e,t)}resetToolStream(){$i(this)}resetToolRender(){kl(this)}resetChatScroll(){ar(this)}scrollToBottom(e){ar(this),$n(this,!0,!!(e!=null&&e.smooth))}async loadAssistantIdentity(){await Rl(this)}applySettings(e){at(this,e)}setTab(e){mp(this,e)}setTheme(e,t){vp(this,e,t)}async loadOverview(){await xl(this)}async loadCron(){await cs(this)}async loadFulfillDrafts(){await _p(this)}async loadProcurementSuggestions(){await Ap(this)}async loadProcurementReplenishment(){await xn(this)}async loadProcurementReplenishmentDetail(e){await lu(this,e)}async confirmProcurementReplenishment(e){await du(this,e)}async deleteProcurementReplenishmentDraft(e){await uu(this,e)}onReplenishmentLineChange(e,t,n){const i=this.replenishmentInputLines.slice();e<0||e>=i.length||(i[e]={...i[e],[t]:n},this.replenishmentInputLines=i)}onReplenishmentAddLine(){this.replenishmentInputLines=[...this.replenishmentInputLines,{product_or_code:"",quantity:0}]}onReplenishmentRemoveLine(e){const t=this.replenishmentInputLines.filter((n,i)=>i!==e);this.replenishmentInputLines=t.length>0?t:[{product_or_code:"",quantity:0}]}async createProcurementReplenishmentDraft(){if(!this.replenishmentCreateBusy){this.replenishmentCreateBusy=!0,this.replenishmentError=null;try{const e=await cu(this,this.replenishmentInputLines);e&&(this.replenishmentInputLines=[{product_or_code:"",quantity:0}],await this.loadProcurementReplenishment(),await this.loadProcurementReplenishmentDetail(e.id))}finally{this.replenishmentCreateBusy=!1}}}async handleAbortChat(){await Al(this)}removeQueuedMessage(e){Zp(this,e)}async handleUploadChatFile(e){try{const t=await Gp(this.basePath,e);this.chatUploadedFile=t,this.lastError=null}catch(t){this.lastError=t instanceof Error?t.message:String(t)}}clearChatUploadedFile(){this.chatUploadedFile=null}setChatComposeDragOver(e){this.chatComposeDragOver=e}async handleComposeDrop(e){this.chatComposeDragOver=!1,await this.handleUploadChatFile(e)}async handleSendChat(e,t){await ef(this,e,t)}async handleWhatsAppStart(e){await yd(this,e)}async handleWhatsAppWait(){await bd(this)}async handleWhatsAppLogout(){await wd(this)}async handleChannelConfigSave(){await $d(this)}async handleChannelConfigReload(){await xd(this)}handleNostrProfileEdit(e,t){_d(this,e,t)}handleNostrProfileCancel(){Ad(this)}handleNostrProfileFieldChange(e,t){Cd(this,e,t)}async handleNostrProfileSave(){await Ed(this)}async handleNostrProfileImport(){await Rd(this)}handleNostrProfileToggleAdvanced(){Td(this)}async handleExecApprovalDecision(e){const t=this.execApprovalQueue[0];if(!(!t||!this.client||this.execApprovalBusy)){this.execApprovalBusy=!0,this.execApprovalError=null;try{await this.client.request("exec.approval.resolve",{id:t.id,decision:e}),this.execApprovalQueue=this.execApprovalQueue.filter(n=>n.id!==t.id)}catch(n){this.execApprovalError=`Exec approval failed: ${String(n)}`}finally{this.execApprovalBusy=!1}}}handleGatewayUrlConfirm(){const e=this.pendingGatewayUrl;e&&(this.pendingGatewayUrl=null,at(this,{...this.settings,gatewayUrl:e}),this.connect())}handleGatewayUrlCancel(){this.pendingGatewayUrl=null}handleOpenSidebar(e){this.sidebarCloseTimer!=null&&(window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=null),this.sidebarContent=e,this.sidebarError=null,this.sidebarOpen=!0}handleCloseSidebar(){this.sidebarOpen=!1,this.sidebarCloseTimer!=null&&window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=window.setTimeout(()=>{this.sidebarOpen||(this.sidebarContent=null,this.sidebarError=null,this.sidebarCloseTimer=null)},200)}handleSplitRatioChange(e){const t=Math.max(.4,Math.min(.7,e));this.splitRatio=t,this.applySettings({...this.settings,splitRatio:t})}render(){return Ty(this)}};m([v()],h.prototype,"settings",2);m([v()],h.prototype,"password",2);m([v()],h.prototype,"tab",2);m([v()],h.prototype,"onboarding",2);m([v()],h.prototype,"connected",2);m([v()],h.prototype,"theme",2);m([v()],h.prototype,"themeResolved",2);m([v()],h.prototype,"hello",2);m([v()],h.prototype,"lastError",2);m([v()],h.prototype,"eventLog",2);m([v()],h.prototype,"assistantName",2);m([v()],h.prototype,"assistantAvatar",2);m([v()],h.prototype,"assistantAgentId",2);m([v()],h.prototype,"sessionKey",2);m([v()],h.prototype,"chatLoading",2);m([v()],h.prototype,"chatSending",2);m([v()],h.prototype,"chatMessage",2);m([v()],h.prototype,"chatMessages",2);m([v()],h.prototype,"chatToolMessages",2);m([v()],h.prototype,"chatStream",2);m([v()],h.prototype,"chatStreamStartedAt",2);m([v()],h.prototype,"chatRunId",2);m([v()],h.prototype,"compactionStatus",2);m([v()],h.prototype,"chatAvatarUrl",2);m([v()],h.prototype,"chatThinkingLevel",2);m([v()],h.prototype,"chatQueue",2);m([v()],h.prototype,"chatAttachments",2);m([v()],h.prototype,"chatUploadedFile",2);m([v()],h.prototype,"chatComposeDragOver",2);m([v()],h.prototype,"chatManualRefreshInFlight",2);m([v()],h.prototype,"sidebarOpen",2);m([v()],h.prototype,"sidebarContent",2);m([v()],h.prototype,"sidebarError",2);m([v()],h.prototype,"splitRatio",2);m([v()],h.prototype,"nodesLoading",2);m([v()],h.prototype,"nodes",2);m([v()],h.prototype,"devicesLoading",2);m([v()],h.prototype,"devicesError",2);m([v()],h.prototype,"devicesList",2);m([v()],h.prototype,"execApprovalsLoading",2);m([v()],h.prototype,"execApprovalsSaving",2);m([v()],h.prototype,"execApprovalsDirty",2);m([v()],h.prototype,"execApprovalsSnapshot",2);m([v()],h.prototype,"execApprovalsForm",2);m([v()],h.prototype,"execApprovalsSelectedAgent",2);m([v()],h.prototype,"execApprovalsTarget",2);m([v()],h.prototype,"execApprovalsTargetNodeId",2);m([v()],h.prototype,"execApprovalQueue",2);m([v()],h.prototype,"execApprovalBusy",2);m([v()],h.prototype,"execApprovalError",2);m([v()],h.prototype,"pendingGatewayUrl",2);m([v()],h.prototype,"configLoading",2);m([v()],h.prototype,"configRaw",2);m([v()],h.prototype,"configRawOriginal",2);m([v()],h.prototype,"configValid",2);m([v()],h.prototype,"configIssues",2);m([v()],h.prototype,"configSaving",2);m([v()],h.prototype,"configApplying",2);m([v()],h.prototype,"updateRunning",2);m([v()],h.prototype,"applySessionKey",2);m([v()],h.prototype,"configSnapshot",2);m([v()],h.prototype,"configSchema",2);m([v()],h.prototype,"configSchemaVersion",2);m([v()],h.prototype,"configSchemaLoading",2);m([v()],h.prototype,"configUiHints",2);m([v()],h.prototype,"configForm",2);m([v()],h.prototype,"configFormOriginal",2);m([v()],h.prototype,"configFormDirty",2);m([v()],h.prototype,"configFormMode",2);m([v()],h.prototype,"configSearchQuery",2);m([v()],h.prototype,"configActiveSection",2);m([v()],h.prototype,"configActiveSubsection",2);m([v()],h.prototype,"channelsLoading",2);m([v()],h.prototype,"channelsSnapshot",2);m([v()],h.prototype,"channelsError",2);m([v()],h.prototype,"channelsLastSuccess",2);m([v()],h.prototype,"bkContent",2);m([v()],h.prototype,"bkLoading",2);m([v()],h.prototype,"bkError",2);m([v()],h.prototype,"bkSaving",2);m([v()],h.prototype,"bkLastSuccess",2);m([v()],h.prototype,"bkDependentFiles",2);m([v()],h.prototype,"whatsappLoginMessage",2);m([v()],h.prototype,"whatsappLoginQrDataUrl",2);m([v()],h.prototype,"whatsappLoginConnected",2);m([v()],h.prototype,"whatsappBusy",2);m([v()],h.prototype,"nostrProfileFormState",2);m([v()],h.prototype,"nostrProfileAccountId",2);m([v()],h.prototype,"presenceLoading",2);m([v()],h.prototype,"presenceEntries",2);m([v()],h.prototype,"presenceError",2);m([v()],h.prototype,"presenceStatus",2);m([v()],h.prototype,"oosLoading",2);m([v()],h.prototype,"oosError",2);m([v()],h.prototype,"oosStats",2);m([v()],h.prototype,"oosList",2);m([v()],h.prototype,"oosByFile",2);m([v()],h.prototype,"oosByTime",2);m([v()],h.prototype,"oosShowAddForm",2);m([v()],h.prototype,"oosDb",2);m([v()],h.prototype,"shortageLoading",2);m([v()],h.prototype,"shortageError",2);m([v()],h.prototype,"shortageStats",2);m([v()],h.prototype,"shortageList",2);m([v()],h.prototype,"shortageByFile",2);m([v()],h.prototype,"shortageByTime",2);m([v()],h.prototype,"shortageShowAddForm",2);m([v()],h.prototype,"shortageDb",2);m([v()],h.prototype,"overviewOosStats",2);m([v()],h.prototype,"overviewOosError",2);m([v()],h.prototype,"overviewShortageStats",2);m([v()],h.prototype,"overviewShortageError",2);m([v()],h.prototype,"agentsLoading",2);m([v()],h.prototype,"agentsList",2);m([v()],h.prototype,"agentsError",2);m([v()],h.prototype,"agentsSelectedId",2);m([v()],h.prototype,"agentsPanel",2);m([v()],h.prototype,"agentFilesLoading",2);m([v()],h.prototype,"agentFilesError",2);m([v()],h.prototype,"agentFilesList",2);m([v()],h.prototype,"agentFileContents",2);m([v()],h.prototype,"agentFileDrafts",2);m([v()],h.prototype,"agentFileActive",2);m([v()],h.prototype,"agentFileSaving",2);m([v()],h.prototype,"agentIdentityLoading",2);m([v()],h.prototype,"agentIdentityError",2);m([v()],h.prototype,"agentIdentityById",2);m([v()],h.prototype,"agentSkillsLoading",2);m([v()],h.prototype,"agentSkillsError",2);m([v()],h.prototype,"agentSkillsReport",2);m([v()],h.prototype,"agentSkillsAgentId",2);m([v()],h.prototype,"sessionsLoading",2);m([v()],h.prototype,"sessionsResult",2);m([v()],h.prototype,"sessionsError",2);m([v()],h.prototype,"sessionsFilterActive",2);m([v()],h.prototype,"sessionsFilterLimit",2);m([v()],h.prototype,"sessionsIncludeGlobal",2);m([v()],h.prototype,"sessionsIncludeUnknown",2);m([v()],h.prototype,"usageLoading",2);m([v()],h.prototype,"usageResult",2);m([v()],h.prototype,"usageCostSummary",2);m([v()],h.prototype,"usageError",2);m([v()],h.prototype,"usageStartDate",2);m([v()],h.prototype,"usageEndDate",2);m([v()],h.prototype,"usageSelectedSessions",2);m([v()],h.prototype,"usageSelectedDays",2);m([v()],h.prototype,"usageSelectedHours",2);m([v()],h.prototype,"usageChartMode",2);m([v()],h.prototype,"usageDailyChartMode",2);m([v()],h.prototype,"usageTimeSeriesMode",2);m([v()],h.prototype,"usageTimeSeriesBreakdownMode",2);m([v()],h.prototype,"usageTimeSeries",2);m([v()],h.prototype,"usageTimeSeriesLoading",2);m([v()],h.prototype,"usageTimeSeriesCursorStart",2);m([v()],h.prototype,"usageTimeSeriesCursorEnd",2);m([v()],h.prototype,"usageSessionLogs",2);m([v()],h.prototype,"usageSessionLogsLoading",2);m([v()],h.prototype,"usageSessionLogsExpanded",2);m([v()],h.prototype,"usageQuery",2);m([v()],h.prototype,"usageQueryDraft",2);m([v()],h.prototype,"usageSessionSort",2);m([v()],h.prototype,"usageSessionSortDir",2);m([v()],h.prototype,"usageRecentSessions",2);m([v()],h.prototype,"usageTimeZone",2);m([v()],h.prototype,"usageContextExpanded",2);m([v()],h.prototype,"usageHeaderPinned",2);m([v()],h.prototype,"usageSessionsTab",2);m([v()],h.prototype,"usageVisibleColumns",2);m([v()],h.prototype,"usageLogFilterRoles",2);m([v()],h.prototype,"usageLogFilterTools",2);m([v()],h.prototype,"usageLogFilterHasTools",2);m([v()],h.prototype,"usageLogFilterQuery",2);m([v()],h.prototype,"workFilePaths",2);m([v()],h.prototype,"workOriginalFileNamesByPath",2);m([v()],h.prototype,"workRunning",2);m([v()],h.prototype,"workProgressStage",2);m([v()],h.prototype,"workRunStatus",2);m([v()],h.prototype,"workRunId",2);m([v()],h.prototype,"workPendingChoices",2);m([v()],h.prototype,"workSelections",2);m([v()],h.prototype,"workResult",2);m([v()],h.prototype,"workError",2);m([v()],h.prototype,"workCustomerLevel",2);m([v()],h.prototype,"workDoRegisterOos",2);m([v()],h.prototype,"workPendingQuotationDraft",2);m([v()],h.prototype,"workQuotationDraftSaveStatus",2);m([v()],h.prototype,"workTextInput",2);m([v()],h.prototype,"workTextGenerating",2);m([v()],h.prototype,"workTextError",2);m([v()],h.prototype,"workPriceLevelOptions",2);m([v()],h.prototype,"cronLoading",2);m([v()],h.prototype,"cronJobs",2);m([v()],h.prototype,"cronStatus",2);m([v()],h.prototype,"cronError",2);m([v()],h.prototype,"cronForm",2);m([v()],h.prototype,"cronRunsJobId",2);m([v()],h.prototype,"cronRuns",2);m([v()],h.prototype,"cronBusy",2);m([v()],h.prototype,"fulfillDraftsLoading",2);m([v()],h.prototype,"fulfillDraftsError",2);m([v()],h.prototype,"fulfillDrafts",2);m([v()],h.prototype,"fulfillDetail",2);m([v()],h.prototype,"fulfillDetailId",2);m([v()],h.prototype,"fulfillConfirmBusy",2);m([v()],h.prototype,"fulfillConfirmResult",2);m([v()],h.prototype,"fulfillFilterQuery",2);m([v()],h.prototype,"fulfillSortBy",2);m([v()],h.prototype,"fulfillSortDir",2);m([v()],h.prototype,"fulfillPage",2);m([v()],h.prototype,"fulfillPageSize",2);m([v()],h.prototype,"procurementLoading",2);m([v()],h.prototype,"procurementError",2);m([v()],h.prototype,"procurementSuggestions",2);m([v()],h.prototype,"procurementSelectedKeys",2);m([v()],h.prototype,"procurementApprovedKeys",2);m([v()],h.prototype,"procurementApproveBusy",2);m([v()],h.prototype,"procurementApproveResult",2);m([v()],h.prototype,"procurementFilterQuery",2);m([v()],h.prototype,"procurementSortBy",2);m([v()],h.prototype,"procurementSortDir",2);m([v()],h.prototype,"procurementPage",2);m([v()],h.prototype,"procurementPageSize",2);m([v()],h.prototype,"replenishmentDrafts",2);m([v()],h.prototype,"replenishmentDetail",2);m([v()],h.prototype,"replenishmentDetailId",2);m([v()],h.prototype,"replenishmentLoading",2);m([v()],h.prototype,"replenishmentError",2);m([v()],h.prototype,"replenishmentConfirmBusy",2);m([v()],h.prototype,"replenishmentConfirmResult",2);m([v()],h.prototype,"replenishmentInputLines",2);m([v()],h.prototype,"replenishmentCreateBusy",2);m([v()],h.prototype,"skillsLoading",2);m([v()],h.prototype,"skillsReport",2);m([v()],h.prototype,"skillsError",2);m([v()],h.prototype,"skillsFilter",2);m([v()],h.prototype,"skillEdits",2);m([v()],h.prototype,"skillsBusyKey",2);m([v()],h.prototype,"skillMessages",2);m([v()],h.prototype,"debugLoading",2);m([v()],h.prototype,"debugStatus",2);m([v()],h.prototype,"debugHealth",2);m([v()],h.prototype,"debugModels",2);m([v()],h.prototype,"debugHeartbeat",2);m([v()],h.prototype,"debugCallMethod",2);m([v()],h.prototype,"debugCallParams",2);m([v()],h.prototype,"debugCallResult",2);m([v()],h.prototype,"debugCallError",2);m([v()],h.prototype,"logsLoading",2);m([v()],h.prototype,"logsError",2);m([v()],h.prototype,"logsFile",2);m([v()],h.prototype,"logsEntries",2);m([v()],h.prototype,"logsFilterText",2);m([v()],h.prototype,"logsLevelFilters",2);m([v()],h.prototype,"logsAutoFollow",2);m([v()],h.prototype,"logsTruncated",2);m([v()],h.prototype,"logsCursor",2);m([v()],h.prototype,"logsLastFetchAt",2);m([v()],h.prototype,"logsLimit",2);m([v()],h.prototype,"logsMaxBytes",2);m([v()],h.prototype,"logsAtBottom",2);m([v()],h.prototype,"chatNewMessagesBelow",2);m([v()],h.prototype,"toolRenderData",2);m([v()],h.prototype,"toolRenderSeq",2);h=m([Ia("openclaw-app")],h);
//# sourceMappingURL=index-CJ7QPGnK.js.map
