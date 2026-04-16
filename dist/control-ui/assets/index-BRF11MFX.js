var yg=Object.defineProperty;var vg=(e,t,n)=>t in e?yg(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var D=(e,t,n)=>vg(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const so=globalThis,Xa=so.ShadowRoot&&(so.ShadyCSS===void 0||so.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ja=Symbol(),_c=new WeakMap;let bh=class{constructor(t,n,i){if(this._$cssResult$=!0,i!==Ja)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(Xa&&t===void 0){const i=n!==void 0&&n.length===1;i&&(t=_c.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&_c.set(n,t))}return t}toString(){return this.cssText}};const xg=e=>new bh(typeof e=="string"?e:e+"",void 0,Ja),Za=(e,...t)=>{const n=e.length===1?e[0]:t.reduce((i,s,o)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[o+1],e[0]);return new bh(n,e,Ja)},wg=(e,t)=>{if(Xa)e.adoptedStyleSheets=t.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of t){const i=document.createElement("style"),s=so.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=n.cssText,e.appendChild(i)}},kc=Xa?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const i of t.cssRules)n+=i.cssText;return xg(n)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:_g,defineProperty:kg,getOwnPropertyDescriptor:Sg,getOwnPropertyNames:$g,getOwnPropertySymbols:Ag,getPrototypeOf:Tg}=Object,jt=globalThis,Sc=jt.trustedTypes,Cg=Sc?Sc.emptyScript:"",xr=jt.reactiveElementPolyfillSupport,Ni=(e,t)=>e,yo={toAttribute(e,t){switch(t){case Boolean:e=e?Cg:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},el=(e,t)=>!_g(e,t),$c={attribute:!0,type:String,converter:yo,reflect:!1,useDefault:!1,hasChanged:el};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),jt.litPropertyMetadata??(jt.litPropertyMetadata=new WeakMap);let Vn=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=$c){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(t,n),!n.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,n);s!==void 0&&kg(this.prototype,t,s)}}static getPropertyDescriptor(t,n,i){const{get:s,set:o}=Sg(this.prototype,t)??{get(){return this[n]},set(r){this[n]=r}};return{get:s,set(r){const a=s==null?void 0:s.call(this);o==null||o.call(this,r),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$c}static _$Ei(){if(this.hasOwnProperty(Ni("elementProperties")))return;const t=Tg(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Ni("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ni("properties"))){const n=this.properties,i=[...$g(n),...Ag(n)];for(const s of i)this.createProperty(s,n[s])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[i,s]of n)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[n,i]of this.elementProperties){const s=this._$Eu(n,i);s!==void 0&&this._$Eh.set(s,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)n.unshift(kc(s))}else t!==void 0&&n.push(kc(t));return n}static _$Eu(t,n){const i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(n=>n(this))}addController(t){var n;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((n=t.hostConnected)==null||n.call(t))}removeController(t){var n;(n=this._$EO)==null||n.delete(t)}_$E_(){const t=new Map,n=this.constructor.elementProperties;for(const i of n.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return wg(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(n=>{var i;return(i=n.hostConnected)==null?void 0:i.call(n)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(n=>{var i;return(i=n.hostDisconnected)==null?void 0:i.call(n)})}attributeChangedCallback(t,n,i){this._$AK(t,i)}_$ET(t,n){var o;const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const r=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:yo).toAttribute(n,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,n){var o,r;const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const a=i.getPropertyOptions(s),l=typeof a.converter=="function"?{fromAttribute:a.converter}:((o=a.converter)==null?void 0:o.fromAttribute)!==void 0?a.converter:yo;this._$Em=s;const c=l.fromAttribute(n,a.type);this[s]=c??((r=this._$Ej)==null?void 0:r.get(s))??c,this._$Em=null}}requestUpdate(t,n,i,s=!1,o){var r;if(t!==void 0){const a=this.constructor;if(s===!1&&(o=this[t]),i??(i=a.getPropertyOptions(t)),!((i.hasChanged??el)(o,n)||i.useDefault&&i.reflect&&o===((r=this._$Ej)==null?void 0:r.get(t))&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,n,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,r??n??this[t]),o!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(n=void 0),this._$AL.set(t,n)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,r]of this._$Ep)this[o]=r;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,r]of s){const{wrapped:a}=r,l=this[o];a!==!0||this._$AL.has(o)||l===void 0||this.C(o,void 0,r,l)}}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),(i=this._$EO)==null||i.forEach(s=>{var o;return(o=s.hostUpdate)==null?void 0:o.call(s)}),this.update(n)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(n)}willUpdate(t){}_$AE(t){var n;(n=this._$EO)==null||n.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(n=>this._$ET(n,this[n]))),this._$EM()}updated(t){}firstUpdated(t){}};Vn.elementStyles=[],Vn.shadowRootOptions={mode:"open"},Vn[Ni("elementProperties")]=new Map,Vn[Ni("finalized")]=new Map,xr==null||xr({ReactiveElement:Vn}),(jt.reactiveElementVersions??(jt.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bi=globalThis,Ac=e=>e,vo=Bi.trustedTypes,Tc=vo?vo.createPolicy("lit-html",{createHTML:e=>e}):void 0,yh="$lit$",Bt=`lit$${Math.random().toFixed(9).slice(2)}$`,vh="?"+Bt,Eg=`<${vh}>`,$n=document,Ji=()=>$n.createComment(""),Zi=e=>e===null||typeof e!="object"&&typeof e!="function",tl=Array.isArray,Rg=e=>tl(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",wr=`[ 	
\f\r]`,gi=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Cc=/-->/g,Ec=/>/g,rn=RegExp(`>|${wr}(?:([^\\s"'>=/]+)(${wr}*=${wr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Rc=/'/g,Mc=/"/g,xh=/^(?:script|style|textarea|title)$/i,Mg=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),p=Mg(1),Qt=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),Pc=new WeakMap,bn=$n.createTreeWalker($n,129);function wh(e,t){if(!tl(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Tc!==void 0?Tc.createHTML(t):t}const Pg=(e,t)=>{const n=e.length-1,i=[];let s,o=t===2?"<svg>":t===3?"<math>":"",r=gi;for(let a=0;a<n;a++){const l=e[a];let c,d,u=-1,h=0;for(;h<l.length&&(r.lastIndex=h,d=r.exec(l),d!==null);)h=r.lastIndex,r===gi?d[1]==="!--"?r=Cc:d[1]!==void 0?r=Ec:d[2]!==void 0?(xh.test(d[2])&&(s=RegExp("</"+d[2],"g")),r=rn):d[3]!==void 0&&(r=rn):r===rn?d[0]===">"?(r=s??gi,u=-1):d[1]===void 0?u=-2:(u=r.lastIndex-d[2].length,c=d[1],r=d[3]===void 0?rn:d[3]==='"'?Mc:Rc):r===Mc||r===Rc?r=rn:r===Cc||r===Ec?r=gi:(r=rn,s=void 0);const f=r===rn&&e[a+1].startsWith("/>")?" ":"";o+=r===gi?l+Eg:u>=0?(i.push(c),l.slice(0,u)+yh+l.slice(u)+Bt+f):l+Bt+(u===-2?a:f)}return[wh(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class es{constructor({strings:t,_$litType$:n},i){let s;this.parts=[];let o=0,r=0;const a=t.length-1,l=this.parts,[c,d]=Pg(t,n);if(this.el=es.createElement(c,i),bn.currentNode=this.el.content,n===2||n===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=bn.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(const u of s.getAttributeNames())if(u.endsWith(yh)){const h=d[r++],f=s.getAttribute(u).split(Bt),m=/([.?@])?(.*)/.exec(h);l.push({type:1,index:o,name:m[2],strings:f,ctor:m[1]==="."?Lg:m[1]==="?"?Ig:m[1]==="@"?Og:zo}),s.removeAttribute(u)}else u.startsWith(Bt)&&(l.push({type:6,index:o}),s.removeAttribute(u));if(xh.test(s.tagName)){const u=s.textContent.split(Bt),h=u.length-1;if(h>0){s.textContent=vo?vo.emptyScript:"";for(let f=0;f<h;f++)s.append(u[f],Ji()),bn.nextNode(),l.push({type:2,index:++o});s.append(u[h],Ji())}}}else if(s.nodeType===8)if(s.data===vh)l.push({type:2,index:o});else{let u=-1;for(;(u=s.data.indexOf(Bt,u+1))!==-1;)l.push({type:7,index:o}),u+=Bt.length-1}o++}}static createElement(t,n){const i=$n.createElement("template");return i.innerHTML=t,i}}function Zn(e,t,n=e,i){var r,a;if(t===Qt)return t;let s=i!==void 0?(r=n._$Co)==null?void 0:r[i]:n._$Cl;const o=Zi(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==o&&((a=s==null?void 0:s._$AO)==null||a.call(s,!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,i)),i!==void 0?(n._$Co??(n._$Co=[]))[i]=s:n._$Cl=s),s!==void 0&&(t=Zn(e,s._$AS(e,t.values),s,i)),t}class Dg{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??$n).importNode(n,!0);bn.currentNode=s;let o=bn.nextNode(),r=0,a=0,l=i[0];for(;l!==void 0;){if(r===l.index){let c;l.type===2?c=new Bo(o,o.nextSibling,this,t):l.type===1?c=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(c=new Fg(o,this,t)),this._$AV.push(c),l=i[++a]}r!==(l==null?void 0:l.index)&&(o=bn.nextNode(),r++)}return bn.currentNode=$n,s}p(t){let n=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,n),n+=i.strings.length-2):i._$AI(t[n])),n++}}let Bo=class _h{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,n,i,s){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Zn(this,t,n),Zi(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==Qt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Rg(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==$&&Zi(this._$AH)?this._$AA.nextSibling.data=t:this.T($n.createTextNode(t)),this._$AH=t}$(t){var o;const{values:n,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=es.createElement(wh(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===s)this._$AH.p(n);else{const r=new Dg(s,this),a=r.u(this.options);r.p(n),this.T(a),this._$AH=r}}_$AC(t){let n=Pc.get(t.strings);return n===void 0&&Pc.set(t.strings,n=new es(t)),n}k(t){tl(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let i,s=0;for(const o of t)s===n.length?n.push(i=new _h(this.O(Ji()),this.O(Ji()),this,this.options)):i=n[s],i._$AI(o),s++;s<n.length&&(this._$AR(i&&i._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,n);t!==this._$AB;){const s=Ac(t).nextSibling;Ac(t).remove(),t=s}}setConnected(t){var n;this._$AM===void 0&&(this._$Cv=t,(n=this._$AP)==null||n.call(this,t))}},zo=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,i,s,o){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=$}_$AI(t,n=this,i,s){const o=this.strings;let r=!1;if(o===void 0)t=Zn(this,t,n,0),r=!Zi(t)||t!==this._$AH&&t!==Qt,r&&(this._$AH=t);else{const a=t;let l,c;for(t=o[0],l=0;l<o.length-1;l++)c=Zn(this,a[i+l],n,l),c===Qt&&(c=this._$AH[l]),r||(r=!Zi(c)||c!==this._$AH[l]),c===$?t=$:t!==$&&(t+=(c??"")+o[l+1]),this._$AH[l]=c}r&&!s&&this.j(t)}j(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Lg=class extends zo{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$?void 0:t}},Ig=class extends zo{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==$)}},Og=class extends zo{constructor(t,n,i,s,o){super(t,n,i,s,o),this.type=5}_$AI(t,n=this){if((t=Zn(this,t,n,0)??$)===Qt)return;const i=this._$AH,s=t===$&&i!==$||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==$&&(i===$||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var n;typeof this._$AH=="function"?this._$AH.call(((n=this.options)==null?void 0:n.host)??this.element,t):this._$AH.handleEvent(t)}},Fg=class{constructor(t,n,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Zn(this,t)}};const Ng={I:Bo},_r=Bi.litHtmlPolyfillSupport;_r==null||_r(es,Bo),(Bi.litHtmlVersions??(Bi.litHtmlVersions=[])).push("3.3.2");const Bg=(e,t,n)=>{const i=(n==null?void 0:n.renderBefore)??t;let s=i._$litPart$;if(s===void 0){const o=(n==null?void 0:n.renderBefore)??null;i._$litPart$=s=new Bo(t.insertBefore(Ji(),o),o,void 0,n??{})}return s._$AI(e),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xn=globalThis;let Kt=class extends Vn{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var n;const t=super.createRenderRoot();return(n=this.renderOptions).renderBefore??(n.renderBefore=t.firstChild),t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Bg(n,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return Qt}};var mh;Kt._$litElement$=!0,Kt.finalized=!0,(mh=xn.litElementHydrateSupport)==null||mh.call(xn,{LitElement:Kt});const kr=xn.litElementPolyfillSupport;kr==null||kr({LitElement:Kt});(xn.litElementVersions??(xn.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ho=e=>(t,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const zg={attribute:!0,type:String,converter:yo,reflect:!1,hasChanged:el},Hg=(e=zg,t,n)=>{const{kind:i,metadata:s}=n;let o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),i==="setter"&&((e=Object.create(e)).wrapped=!0),o.set(n.name,e),i==="accessor"){const{name:r}=n;return{set(a){const l=t.get.call(this);t.set.call(this,a),this.requestUpdate(r,l,e,!0,a)},init(a){return a!==void 0&&this.C(r,void 0,e,a),a}}}if(i==="setter"){const{name:r}=n;return function(a){const l=this[r];t.call(this,a),this.requestUpdate(r,l,e,!0,a)}}throw Error("Unsupported decorator location: "+i)};function _t(e){return(t,n)=>typeof n=="object"?Hg(e,t,n):((i,s,o)=>{const r=s.hasOwnProperty(o);return s.constructor.createProperty(o,i),r?Object.getOwnPropertyDescriptor(s,o):void 0})(e,t,n)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function _(e){return _t({...e,state:!0,attribute:!1})}const Ug="modulepreload",qg=function(e,t){return new URL(e,t).href},Dc={},jg=function(t,n,i){let s=Promise.resolve();if(n&&n.length>0){let r=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};const a=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),c=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));s=r(n.map(d=>{if(d=qg(d,i),d in Dc)return;Dc[d]=!0;const u=d.endsWith(".css"),h=u?'[rel="stylesheet"]':"";if(!!i)for(let b=a.length-1;b>=0;b--){const v=a[b];if(v.href===d&&(!u||v.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${h}`))return;const m=document.createElement("link");if(m.rel=u?"stylesheet":Ug,u||(m.as="script"),m.crossOrigin="",m.href=d,c&&m.setAttribute("nonce",c),document.head.appendChild(m),u)return new Promise((b,v)=>{m.addEventListener("load",b),m.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${d}`)))})}))}function o(r){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=r,window.dispatchEvent(a),!a.defaultPrevented)throw r}return s.then(r=>{for(const a of r||[])a.status==="rejected"&&o(a.reason);return t().catch(o)})},Kg={common:{health:"Health",ok:"OK",offline:"Offline",connect:"Connect",refresh:"Refresh",retry:"Retry",cancel:"Cancel",close:"Close",yes:"Yes",no:"No",prev:"Prev",next:"Next",errorTitle:"Request failed",enabled:"Enabled",disabled:"Disabled",na:"n/a",docs:"Docs",resources:"Resources",loading:"Loading…",save:"Save",edit:"Edit"},nav:{chat:"Chat",control:"Control",agent:"Agent",settings:"Settings",expand:"Expand sidebar",collapse:"Collapse sidebar"},tabs:{agents:"Agents",overview:"Overview",channels:"Business Knowledge",instances:"Out of Stock",sessions:"Procurement",work:"Quotation",cron:"Order Fulfill",skills:"Skills",reports:"Reports",nodes:"Nodes",chat:"Chat",config:"Config",debug:"Debug",logs:"Logs","admin-data":"Data"},subtitles:{agents:"Manage agent workspaces, tools, and identities.",overview:"Gateway status, entry points, and a fast health read.",channels:"Edit wanding_business_knowledge.md for selection and matching.",instances:"OOS dashboard: stats and product list without asking the agent.",sessions:"Procurement suggestions from shortage; approve to save and notify buyer.",work:"Batch quotation: upload files, identify, match price and stock, fill and save.",cron:"Pending quotation drafts; confirm to create order and lock stock.",skills:"Manage skill availability and API key injection.",reports:"Weekly sales invoice reports. Click a record to view full content.",nodes:"Paired devices, capabilities, and command exposure.",chat:"Direct gateway chat session for quick interventions.",config:"Edit ~/.openclaw/openclaw.json safely.",debug:"Gateway snapshots, events, and manual RPC calls.",logs:"Live tail of the gateway file logs.","admin-data":"Wanding price library and product mapping (admin password)."},overview:{health:{title:"Health & stats",subtitle:"High-level view of instances, sessions, and cron.",lastErrorLabel:"Last error",noError:"No recent errors."},access:{title:"Gateway Access",subtitle:"Where the dashboard connects and how it authenticates.",wsUrl:"WebSocket URL",token:"Gateway Token",password:"Password (not stored)",sessionKey:"Default Session Key",language:"Language",connectHint:"Click Connect to apply connection changes.",trustedProxy:"Authenticated via trusted proxy."},snapshot:{title:"Snapshot",subtitle:"Latest gateway handshake information.",status:"Status",uptime:"Uptime",tickInterval:"Tick Interval",lastChannelsRefresh:"Last Channels Refresh",channelsHint:"Use Channels to link WhatsApp, Telegram, Discord, Signal, or iMessage."},stats:{instances:"Instances",instancesHint:"Presence beacons in the last 5 minutes.",sessions:"Sessions",sessionsHint:"Recent session keys tracked by the gateway.",cron:"Cron",cronNext:"Next wake {time}"},notes:{title:"Notes",subtitle:"Quick reminders for remote control setups.",tailscaleTitle:"Tailscale serve",tailscaleText:"Prefer serve mode to keep the gateway on loopback with tailnet auth.",sessionTitle:"Session hygiene",sessionText:"Use /new or sessions.patch to reset context.",cronTitle:"Cron reminders",cronText:"Use isolated sessions for recurring runs."},auth:{required:"This gateway requires auth. Add a token or password, then click Connect.",failed:"Auth failed. Re-copy a tokenized URL with {command}, or update the token, then click Connect."},insecure:{hint:"This page is HTTP, so the browser blocks device identity. Use HTTPS (Tailscale Serve) or open {url} on the gateway host.",stayHttp:"If you must stay on HTTP, set {config} (token-only)."},oos:{title:"Out-of-stock overview",subtitle:"Recent out-of-stock stats; see Instances tab for full details.",stats:{totalRecords:"Total records",outOfStockCount:"Out-of-stock items",today:"Added today",reportedGe2:"Reported out-of-stock ≥2 times"},empty:"No stats yet; check back later on the Instances tab."},shortage:{title:"Shortage overview",subtitle:"Shortage stats after Work matching; focus on critical items.",stats:{totalRecords:"Total records",shortageProductCount:"Shortage items",today:"Added today",reportedGe2:"Reported shortage ≥2 times"},empty:"No stats yet; check back later on the Instances tab."},dashboard:{kpi:{oosProducts:"Out-of-stock products",shortageProducts:"Shortage products",pendingQuotations:"Pending quotations",todayNewQuotations:"New quotations today",shortageQuotations:"Shortage quotations",replenishmentDrafts:"Replenishment drafts"},chart:{quotationTrend:"Quotation trend (last 7 days)",stockTrend:"Out-of-stock / shortage trend (last 7 days)",quotationSeries:"Quotations",oosSeries:"Out-of-stock",shortageSeries:"Shortage",loading:"Loading...",empty:"No data"},error:"Dashboard data load failed: {error}"}},chat:{disconnected:"Disconnected from gateway.",refreshTitle:"Refresh chat data",thinkingToggle:"Toggle assistant thinking/working output",focusToggle:"Toggle focus mode (hide sidebar + page header)",onboardingDisabled:"Disabled during onboarding",ui:{compaction:{active:"Compacting context…",done:"Context compacted",divider:"Compaction"},attachments:{previewAlt:"Attachment preview",remove:"Remove attachment"},upload:{label:"Upload Excel or PDF",button:"Upload Excel/PDF",remove:"Remove uploaded file"},queue:{title:"Queued ({count})",imageItem:"Image ({count})",remove:"Remove queued message"},candidatesPreview:{query:"Searching: {keywords}",colCode:"Code",colName:"Product",colPrice:"Unit price",more:"…and {n} more",selecting:"AI is choosing the best match from {n} candidate(s)…"},compose:{placeholder:{withImages:"Add a message or paste more images…",default:"Message (↩ to send, Shift+↩ for line breaks; paste images or upload/drag Excel/PDF)",disconnected:"Connect to the gateway to start chatting…"},newMessages:"New messages",dropHint:"Drop to upload Excel/PDF",label:"Message",stop:"Stop",newSession:"New session",send:"Send",queue:"Queue",exitFocus:"Exit focus mode"}}},work:{runHint:"Please select at least one file before running.",saveConfirm:"Confirm save quotation draft and persist to database?",saveSuccessHint:"Saved. You can confirm it on the Order Fulfill page.",stageExtract:"Extract sheet data",stageMatch:"Match price & inventory",stageFill:"Fill quotation",uploadTitle:"Quotation files (multiple)",removeFile:"Remove",noFiles:"No files uploaded (.xlsx/.xls/.xlsm).",customerLevel:"Customer level",registerOos:"Register out-of-stock items",currentStage:"Current stage",running:"Running",run:"Run",cancel:"Cancel",statusLabel:"Status",awaitingTitle:"Need your choices",awaitingHint:"Select one option for each ambiguous item, then continue.",qty:"Qty",choiceSelect:"Candidate selection",choiceOos:"Mark as out of stock",resuming:"Resuming",resume:"Confirm and continue",savedDraftNo:"Quotation draft saved: {no}",pendingDraftTitle:"Pending quotation draft",pendingDraftHint:"Review and edit before saving to database.",saving:"Saving...",saveDraft:"Confirm and save",resultTitle:"Execution result",download:"Download {name}",trace:"Trace ({count})",traceTimelineTitle:"Execution steps",traceRawDebug:"Raw trace (debug)",traceStep:"Step {n}",traceTypeToolCall:"Call",traceTypeObservation:"Result",traceTypeMetrics:"Timing",traceToolExtract:"Extract quotation rows",traceToolMatch:"Match price & stock",traceToolFill:"Fill Excel",traceToolShortageReport:"Shortage report",traceToolFallback:"{name}",traceParseError:"Could not parse as JSON; raw content:",traceFieldSuccess:"Success",traceFieldRows:"Rows",traceFieldFilled:"Filled rows",traceFieldOutput:"Output file",traceFieldSummary:"Summary",traceFieldError:"Error",lineProduct:"Requested item name",lineSpec:"Requested spec",lineQty:"Qty",lineCode:"Product number",lineQuoteName:"Quoted item name",lineQuoteSpec:"Quoted spec",linePrice:"Unit price",lineAmount:"Total",lineAvailable:"Available",lineShortfall:"Shortfall",lineIsShortage:"Shortage",textInputTitle:"Text input (quotation)",textInputHint:"Enter product list (multi-line or semicolon/comma separated); generated file will run with uploaded files.",textInputPlaceholder:"e.g. Cable 3*2.5 100m; Switch 20 pcs",generateFromText:"Generate from text",textGenerating:"Generating…",priceLevels:{FACTORY_INC_TAX:"Factory price (incl. tax)",FACTORY_EXC_TAX:"Factory price (excl. tax)",PURCHASE_EXC_TAX:"Purchase price (excl. tax)",A_MARGIN:"Tier A (2nd-level agent) · margin",A_QUOTE:"Tier A (2nd-level agent) · quotation price",B_MARGIN:"Tier B (1st-level agent) · margin",B_QUOTE:"Tier B (1st-level agent) · quotation price",C_MARGIN:"Tier C (Juwan key account) · margin",C_QUOTE:"Tier C (Juwan key account) · quotation price",D_MARGIN:"Tier D (Qingshan key account) · margin",D_QUOTE:"Tier D (Qingshan key account) · quotation price",D_LOW:"Tier D (Qingshan key account) · reduced margin",E_MARGIN:"Tier E (Datang key account, freight included) · margin",E_QUOTE:"Tier E (Datang key account, freight included) · quotation price"},fileDisplayName:"Quotation file display name",status:{idle:"Idle",running:"Running",awaitingChoices:"Awaiting choices",resuming:"Resuming",done:"Done",error:"Error"},fallbackDraftName:"Untitled quotation"},fulfill:{title:"Pending quotation drafts",subtitle:"Load persisted drafts and confirm to create formal orders.",loading:"Loading...",refreshList:"Refresh list",filterPlaceholder:"Search by draft no/name/source",sortBy:"Sort by",sortDir:"Order",sortCreatedAt:"Created time",sortDraftNo:"Draft no",sortName:"Name",sortDesc:"Newest first",sortAsc:"Oldest first",pageSize:"Page size",total:"Total: {total}",page:"Page {current}/{total}",listTitle:"List",listSubtitle:"View detail first, then confirm order.",colDraftNo:"Draft No",colName:"Name",colSource:"Source",colCreatedAt:"Created At",colActions:"Actions",viewDetail:"View",confirmAction:"Confirm order",confirming:"Confirming...",detailTitle:"Draft detail · {draftNo}",closeDetail:"Close detail",lineProduct:"Product",lineSpec:"Spec",lineQty:"Qty",lineCode:"Code",lineQuoteName:"Quote name",lineQuoteSpec:"Quoted spec",linePrice:"Unit price",lineAmount:"Amount",lineAvailable:"Available",lineShortfall:"Shortfall",lineIsShortage:"Shortage",noDrafts:"No pending quotation drafts.",confirmTitle:"Order confirmed",confirmPrompt:"Confirm order? {count} line(s), total amount {amount}.",confirmPromptSimple:"Confirm to convert this quotation into a formal order?",orderId:"Order ID"},procurement:{title:"Procurement suggestions",subtitle:"Generated from shortage records; approve to persist and notify buyers.",loading:"Loading...",refreshList:"Refresh list",batchApprove:"Batch approve",approving:"Approving...",approveSingle:"Approve",approveConfirm:"Confirm approval and notify buyer?",approveBatchConfirm:"Confirm approval of {count} item(s) and notify buyer?",noSuggestions:"No shortage products; no procurement suggestions.",noPending:"No pending items (approved items are hidden).",listHint:"Select multiple to batch approve; click Approve to save and notify buyer.",filterPlaceholder:"Search by product/spec/code/key",sortBy:"Sort by",sortDir:"Order",sortUploadedAt:"Reported time",sortShortfall:"Shortfall",sortCount:"Report count",sortProduct:"Product name",sortDesc:"High to low / newest",sortAsc:"Low to high / oldest",pageSize:"Page size",total:"Total: {total}",page:"Page {current}/{total}",listTitle:"Shortage item list",selectAll:"Select all filtered items",selectItem:"Select item",colProduct:"Product",colSpec:"Spec",colShortfall:"Shortfall",colCode:"Code",colCount:"Count",colActions:"Actions",approvedCount:"Approved {count} item(s)."},replenishment:{title:"Replenishment",subtitle:"Enter product name or code and quantity to generate a draft; view and confirm in the list below to run inventory supplement.",productOrCodePlaceholder:"Product name or code",quantityPlaceholder:"Quantity",generateDraft:"Generate replenishment draft",creating:"Creating…",addRow:"Add row",removeRow:"Remove",refreshList:"Refresh list",loading:"Loading…",listTitle:"Replenishment drafts",listHint:"Drafts are created via LLM and inventory tools; confirm to run inventory changes.",noDrafts:"No replenishment drafts.",colDraftNo:"Draft No",colName:"Name",colCreatedAt:"Created",colStatus:"Status",colActions:"Actions",viewDetail:"View",confirm:"Confirm replenishment",confirming:"Executing…",confirmPrompt:"Confirm and run all inventory changes for this draft?",delete:"Delete",deleteConfirm:"Delete this replenishment draft? This cannot be undone.",detailTitle:"Draft detail ({no})",detailSubtitle:"Products, current stock and replenishment quantities.",colCode:"Code",colProduct:"Product",colSpec:"Spec",colCurrentQty:"Current qty",colQuantity:"Quantity"},oos:{title:"Out-of-stock dashboard",subtitle:"Overview and list of out-of-stock products, without asking the agent.",actions:{loading:"Loading…",refresh:"Refresh",addManual:"Add manually",confirm:"Confirm",delete:"Delete",deleteHint:"Delete this out-of-stock item"},db:{local:"Using local database"},stats:{totalRecords:"Total records",outOfStockCount:"Out-of-stock items",today:"New today",reportedGe2:"Reported out-of-stock ≥2 times",emailSentProductCount:"Products with email sent"},empty:{stats:"No stats yet.",list:"No out-of-stock records."},list:{title:"Out-of-stock product list",more:"Total {count} out-of-stock products; showing first 50 only",meta:"Qty: {qty} {unit} · Reported out-of-stock {count} time(s) · Email: {email}"},addForm:{title:"Add out-of-stock record",namePlaceholder:"Product name (required)",specPlaceholder:"Specification",qtyPlaceholder:"Quantity",unitPlaceholder:"Unit"},email:{sent:"Sent",notSent:"Not sent"},byFile:{title:"By file",empty:"None",count:"Records: {count}"},byTime:{title:"By time (last 30 days)",empty:"None",count:"New: {count}"}},shortage:{title:"Shortage records",subtitle:"Saved when Work detects insufficient stock; overview and list of shortage items.",actions:{loading:"Loading…",refresh:"Refresh",addManual:"Add manually",confirm:"Confirm",delete:"Delete",deleteHint:"Delete this shortage item"},db:{local:"Using local database"},stats:{totalRecords:"Total records",shortageProductCount:"Shortage products",today:"New today",reportedGe2:"Reported shortage ≥2 times"},empty:{stats:"No stats yet.",list:"No shortage records."},list:{title:"Shortage product list",more:"Total {count} shortage products; showing first 50 only",meta:"Required: {qty} · Available: {avail} · Shortfall: {diff} · Reported shortage {count} time(s)"},addForm:{title:"Add shortage record (product name, spec, required, available; shortfall will be auto-calculated)",namePlaceholder:"Product name (required)",specPlaceholder:"Specification",qtyPlaceholder:"Required",availPlaceholder:"Available",qtyTitle:"Required quantity",availTitle:"Available quantity",diffTitle:"Shortfall = required − available; auto-calculated on submit",diffText:"Shortfall: auto-calculated"},byFile:{title:"By file",empty:"None",count:"Records: {count}"},byTime:{title:"By time (last 30 days)",empty:"None",count:"New: {count}"}},businessKnowledge:{title:"Business knowledge",subtitle:"Edit wanding_business_knowledge.md for selection and matching. The LLM will use the latest content after saving.",lastSavedAt:"Saved at {time}",actions:{reloading:"Loading…",reload:"Reload",saving:"Saving…",save:"Save"},relatedFiles:{title:"Related data files",hint:"Selection and historical quotations rely on these Excel files. Copy the path to open them in Explorer or Excel when updating.",mappingTableLabel:"Inquiry mapping table (historical quotations):",priceLibraryLabel:"Wanding price library:",copyPath:"Copy path"},editor:{placeholder:`[Business knowledge]
1. …`}},agents:{reports:{whereHint:"Weekly reports live here: open Agents, pick an agent, then the Skills sub-tab (not the sidebar Skills catalog).",title:"Weekly reports",subtitle:"Scheduled tasks and recent runs for this agent.",tokenLabel:"Reports admin token",tasks:"Tasks",noTasks:"No report tasks configured.",enabled:"Enabled",cron:"Cron",timezone:"Timezone",run:"Run now",latestRecords:"Latest runs",noRecords:"No run history yet.",detailLoading:"Loading report...",detailEmpty:"Select a record on the left to view the report.",detailNoMd:"No report text is stored yet for this record.",copyBtn:"Copy",copiedBtn:"Copied!",reformatBtn:"Regenerate text",tabData:"Data Report",tabAnalysis:"AI Analysis",analysisLoading:"Generating analysis…",analysisPending:"Pending analysis, please wait…",analysisEmpty:"No analysis content yet.",analysisFailed:"Analysis generation failed.",reanalyzeBtn:"Re-analyze",metricTotal:"Total Invoice Amount",metricCount:"Invoice Count",tableDaily:"Daily Trend",tableCustomers:"Top 10 Customers",tableStatus:"Status Summary",colDate:"Date",colCount:"Count",colAmount:"Amount",colCustomer:"Customer",colStatus:"Status",colRank:"Rank"}},languages:{en:"English",zhCN:"简体中文 (Simplified Chinese)",zhTW:"繁體中文 (Traditional Chinese)",ptBR:"Português (Brazilian Portuguese)"}},Wg=["en","zh-CN"];function nl(e){return e!=null&&Wg.includes(e)}class Vg{constructor(){this.locale="en",this.translations={en:Kg},this.subscribers=new Set,this.loadLocale()}loadLocale(){const t=localStorage.getItem("openclaw.i18n.locale");let n;nl(t)?n=t:n=(navigator.language||"").startsWith("zh")?"zh-CN":"en",n==="en"?this.locale="en":this.setLocale(n)}getLocale(){return this.locale}async setLocale(t){if(this.locale!==t){if(!this.translations[t])try{let n;if(t==="zh-CN")n=await jg(()=>import("./zh-CN-W9SVouFV.js"),[],import.meta.url);else return;this.translations[t]=n[t.replace("-","_")]}catch(n){console.error(`Failed to load locale: ${t}`,n);return}this.locale=t,localStorage.setItem("openclaw.i18n.locale",t),this.notify()}}registerTranslation(t,n){this.translations[t]=n}subscribe(t){return this.subscribers.add(t),()=>this.subscribers.delete(t)}notify(){this.subscribers.forEach(t=>t(this.locale))}t(t,n){const i=t.split(".");let s=this.translations[this.locale]||this.translations.en;for(const o of i)if(s&&typeof s=="object")s=s[o];else{s=void 0;break}if(s===void 0&&this.locale!=="en"){s=this.translations.en;for(const o of i)if(s&&typeof s=="object")s=s[o];else{s=void 0;break}}return typeof s!="string"?t:n?s.replace(/\{(\w+)\}/g,(o,r)=>n[r]||`{${r}}`):s}}const An=new Vg,g=(e,t)=>An.t(e,t);class Gg{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){this.unsubscribe=An.subscribe(()=>{this.host.requestUpdate()})}hostDisconnected(){var t;(t=this.unsubscribe)==null||t.call(this)}}async function Ot(e,t){if(!(!e.client||!e.connected)&&!e.channelsLoading){e.channelsLoading=!0,e.channelsError=null;try{const n=await e.client.request("channels.status",{probe:t,timeoutMs:8e3});e.channelsSnapshot=n,e.channelsLastSuccess=Date.now()}catch(n){e.channelsError=String(n)}finally{e.channelsLoading=!1}}}async function Qg(e,t){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const n=await e.client.request("web.login.start",{force:t,timeoutMs:3e4});e.whatsappLoginMessage=n.message??null,e.whatsappLoginQrDataUrl=n.qrDataUrl??null,e.whatsappLoginConnected=null}catch(n){e.whatsappLoginMessage=String(n),e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function Yg(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const t=await e.client.request("web.login.wait",{timeoutMs:12e4});e.whatsappLoginMessage=t.message??null,e.whatsappLoginConnected=t.connected??null,t.connected&&(e.whatsappLoginQrDataUrl=null)}catch(t){e.whatsappLoginMessage=String(t),e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function Xg(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{await e.client.request("channels.logout",{channel:"whatsapp"}),e.whatsappLoginMessage="Logged out.",e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}catch(t){e.whatsappLoginMessage=String(t)}finally{e.whatsappBusy=!1}}}function et(e){if(e)return Array.isArray(e.type)?e.type.filter(n=>n!=="null")[0]??e.type[0]:e.type}function kh(e){if(!e)return"";if(e.default!==void 0)return e.default;switch(et(e)){case"object":return{};case"array":return[];case"boolean":return!1;case"number":case"integer":return 0;case"string":return"";default:return""}}function il(e){return e.filter(t=>typeof t=="string").join(".")}function tt(e,t){const n=il(e),i=t[n];if(i)return i;const s=n.split(".");for(const[o,r]of Object.entries(t)){if(!o.includes("*"))continue;const a=o.split(".");if(a.length!==s.length)continue;let l=!0;for(let c=0;c<s.length;c+=1)if(a[c]!=="*"&&a[c]!==s[c]){l=!1;break}if(l)return r}}function Ft(e){return e.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/\s+/g," ").replace(/^./,t=>t.toUpperCase())}function Lc(e,t){const n=e.trim();if(n==="")return;const i=Number(n);return!Number.isFinite(i)||t&&!Number.isInteger(i)?e:i}function Ic(e){const t=e.trim();return t==="true"?!0:t==="false"?!1:e}function Nt(e,t){if(e==null)return e;if(t.allOf&&t.allOf.length>0){let i=e;for(const s of t.allOf)i=Nt(i,s);return i}const n=et(t);if(t.anyOf||t.oneOf){const i=(t.anyOf??t.oneOf??[]).filter(s=>!(s.type==="null"||Array.isArray(s.type)&&s.type.includes("null")));if(i.length===1)return Nt(e,i[0]);if(typeof e=="string")for(const s of i){const o=et(s);if(o==="number"||o==="integer"){const r=Lc(e,o==="integer");if(r===void 0||typeof r=="number")return r}if(o==="boolean"){const r=Ic(e);if(typeof r=="boolean")return r}}for(const s of i){const o=et(s);if(o==="object"&&typeof e=="object"&&!Array.isArray(e)||o==="array"&&Array.isArray(e))return Nt(e,s)}return e}if(n==="number"||n==="integer"){if(typeof e=="string"){const i=Lc(e,n==="integer");if(i===void 0||typeof i=="number")return i}return e}if(n==="boolean"){if(typeof e=="string"){const i=Ic(e);if(typeof i=="boolean")return i}return e}if(n==="object"){if(typeof e!="object"||Array.isArray(e))return e;const i=e,s=t.properties??{},o=t.additionalProperties&&typeof t.additionalProperties=="object"?t.additionalProperties:null,r={};for(const[a,l]of Object.entries(i)){const c=s[a]??o,d=c?Nt(l,c):l;d!==void 0&&(r[a]=d)}return r}if(n==="array"){if(!Array.isArray(e))return e;if(Array.isArray(t.items)){const s=t.items;return e.map((o,r)=>{const a=r<s.length?s[r]:void 0;return a?Nt(o,a):o})}const i=t.items;return i?e.map(s=>Nt(s,i)).filter(s=>s!==void 0):e}return e}function Tn(e){return typeof structuredClone=="function"?structuredClone(e):JSON.parse(JSON.stringify(e))}function ts(e){return`${JSON.stringify(e,null,2).trimEnd()}
`}function Sh(e,t,n){if(t.length===0)return;let i=e;for(let o=0;o<t.length-1;o+=1){const r=t[o],a=t[o+1];if(typeof r=="number"){if(!Array.isArray(i))return;i[r]==null&&(i[r]=typeof a=="number"?[]:{}),i=i[r]}else{if(typeof i!="object"||i==null)return;const l=i;l[r]==null&&(l[r]=typeof a=="number"?[]:{}),i=l[r]}}const s=t[t.length-1];if(typeof s=="number"){Array.isArray(i)&&(i[s]=n);return}typeof i=="object"&&i!=null&&(i[s]=n)}function $h(e,t){if(t.length===0)return;let n=e;for(let s=0;s<t.length-1;s+=1){const o=t[s];if(typeof o=="number"){if(!Array.isArray(n))return;n=n[o]}else{if(typeof n!="object"||n==null)return;n=n[o]}if(n==null)return}const i=t[t.length-1];if(typeof i=="number"){Array.isArray(n)&&n.splice(i,1);return}typeof n=="object"&&n!=null&&delete n[i]}async function It(e){if(!(!e.client||!e.connected)){e.configLoading=!0,e.lastError=null;try{const t=await e.client.request("config.get",{});em(e,t)}catch(t){e.lastError=String(t)}finally{e.configLoading=!1}}}async function Jg(e){if(!(!e.client||!e.connected)&&!e.configSchemaLoading){e.configSchemaLoading=!0;try{const t=await e.client.request("config.schema",{});Zg(e,t)}catch(t){e.lastError=String(t)}finally{e.configSchemaLoading=!1}}}function Zg(e,t){e.configSchema=t.schema??null,e.configUiHints=t.uiHints??{},e.configSchemaVersion=t.version??null}function em(e,t){e.configSnapshot=t;const n=typeof t.raw=="string"?t.raw:t.config&&typeof t.config=="object"?ts(t.config):e.configRaw;!e.configFormDirty||e.configFormMode==="raw"?e.configRaw=n:e.configForm?e.configRaw=ts(e.configForm):e.configRaw=n,e.configValid=typeof t.valid=="boolean"?t.valid:null,e.configIssues=Array.isArray(t.issues)?t.issues:[],e.configFormDirty||(e.configForm=Tn(t.config??{}),e.configFormOriginal=Tn(t.config??{}),e.configRawOriginal=n)}function tm(e){return!e||typeof e!="object"||Array.isArray(e)?null:e}function Ah(e){if(e.configFormMode!=="form"||!e.configForm)return e.configRaw;const t=tm(e.configSchema),n=t?Nt(e.configForm,t):e.configForm;return ts(n)}async function da(e){var t;if(!(!e.client||!e.connected)){e.configSaving=!0,e.lastError=null;try{const n=Ah(e),i=(t=e.configSnapshot)==null?void 0:t.hash;if(!i){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.set",{raw:n,baseHash:i}),e.configFormDirty=!1,await It(e)}catch(n){e.lastError=String(n)}finally{e.configSaving=!1}}}async function nm(e){var t;if(!(!e.client||!e.connected)){e.configApplying=!0,e.lastError=null;try{const n=Ah(e),i=(t=e.configSnapshot)==null?void 0:t.hash;if(!i){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.apply",{raw:n,baseHash:i,sessionKey:e.applySessionKey}),e.configFormDirty=!1,await It(e)}catch(n){e.lastError=String(n)}finally{e.configApplying=!1}}}async function im(e){if(!(!e.client||!e.connected)){e.updateRunning=!0,e.lastError=null;try{await e.client.request("update.run",{sessionKey:e.applySessionKey})}catch(t){e.lastError=String(t)}finally{e.updateRunning=!1}}}function Sr(e,t,n){var s;const i=Tn(e.configForm??((s=e.configSnapshot)==null?void 0:s.config)??{});Sh(i,t,n),e.configForm=i,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=ts(i))}function Oc(e,t){var i;const n=Tn(e.configForm??((i=e.configSnapshot)==null?void 0:i.config)??{});$h(n,t),e.configForm=n,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=ts(n))}function sm(e){const t={name:(e==null?void 0:e.name)??"",displayName:(e==null?void 0:e.displayName)??"",about:(e==null?void 0:e.about)??"",picture:(e==null?void 0:e.picture)??"",banner:(e==null?void 0:e.banner)??"",website:(e==null?void 0:e.website)??"",nip05:(e==null?void 0:e.nip05)??"",lud16:(e==null?void 0:e.lud16)??""};return{values:t,original:{...t},saving:!1,importing:!1,error:null,success:null,fieldErrors:{},showAdvanced:!!(e!=null&&e.banner||e!=null&&e.website||e!=null&&e.nip05||e!=null&&e.lud16)}}async function om(e,t){await Qg(e,t),await Ot(e,!0)}async function rm(e){await Yg(e),await Ot(e,!0)}async function am(e){await Xg(e),await Ot(e,!0)}async function lm(e){await da(e),await It(e),await Ot(e,!0)}async function cm(e){await It(e),await Ot(e,!0)}function dm(e){if(!Array.isArray(e))return{};const t={};for(const n of e){if(typeof n!="string")continue;const[i,...s]=n.split(":");if(!i||s.length===0)continue;const o=i.trim(),r=s.join(":").trim();o&&r&&(t[o]=r)}return t}function Th(e){var n,i,s;return((s=(((i=(n=e.channelsSnapshot)==null?void 0:n.channelAccounts)==null?void 0:i.nostr)??[])[0])==null?void 0:s.accountId)??e.nostrProfileAccountId??"default"}function Ch(e,t=""){return`/api/channels/nostr/${encodeURIComponent(e)}/profile${t}`}function um(e){var s,o,r;const t=(r=(o=(s=e.hello)==null?void 0:s.auth)==null?void 0:o.deviceToken)==null?void 0:r.trim();if(t)return`Bearer ${t}`;const n=e.settings.token.trim();if(n)return`Bearer ${n}`;const i=e.password.trim();return i?`Bearer ${i}`:null}function Eh(e){const t=um(e);return t?{Authorization:t}:{}}function hm(e,t,n){e.nostrProfileAccountId=t,e.nostrProfileFormState=sm(n??void 0)}function fm(e){e.nostrProfileFormState=null,e.nostrProfileAccountId=null}function pm(e,t,n){const i=e.nostrProfileFormState;i&&(e.nostrProfileFormState={...i,values:{...i.values,[t]:n},fieldErrors:{...i.fieldErrors,[t]:""}})}function gm(e){const t=e.nostrProfileFormState;t&&(e.nostrProfileFormState={...t,showAdvanced:!t.showAdvanced})}async function mm(e){const t=e.nostrProfileFormState;if(!t||t.saving)return;const n=Th(e);e.nostrProfileFormState={...t,saving:!0,error:null,success:null,fieldErrors:{}};try{const i=await fetch(Ch(n),{method:"PUT",headers:{"Content-Type":"application/json",...Eh(e)},body:JSON.stringify(t.values)}),s=await i.json().catch(()=>null);if(!i.ok||(s==null?void 0:s.ok)===!1||!s){const o=(s==null?void 0:s.error)??`Profile update failed (${i.status})`;e.nostrProfileFormState={...t,saving:!1,error:o,success:null,fieldErrors:dm(s==null?void 0:s.details)};return}if(!s.persisted){e.nostrProfileFormState={...t,saving:!1,error:"Profile publish failed on all relays.",success:null};return}e.nostrProfileFormState={...t,saving:!1,error:null,success:"Profile published to relays.",fieldErrors:{},original:{...t.values}},await Ot(e,!0)}catch(i){e.nostrProfileFormState={...t,saving:!1,error:`Profile update failed: ${String(i)}`,success:null}}}async function bm(e){const t=e.nostrProfileFormState;if(!t||t.importing)return;const n=Th(e);e.nostrProfileFormState={...t,importing:!0,error:null,success:null};try{const i=await fetch(Ch(n,"/import"),{method:"POST",headers:{"Content-Type":"application/json",...Eh(e)},body:JSON.stringify({autoMerge:!0})}),s=await i.json().catch(()=>null);if(!i.ok||(s==null?void 0:s.ok)===!1||!s){const l=(s==null?void 0:s.error)??`Profile import failed (${i.status})`;e.nostrProfileFormState={...t,importing:!1,error:l,success:null};return}const o=s.merged??s.imported??null,r=o?{...t.values,...o}:t.values,a=!!(r.banner||r.website||r.nip05||r.lud16);e.nostrProfileFormState={...t,importing:!1,values:r,error:null,success:s.saved?"Profile imported from relays. Review and publish.":"Profile imported. Review and publish.",showAdvanced:a},s.saved&&await Ot(e,!0)}catch(i){e.nostrProfileFormState={...t,importing:!1,error:`Profile import failed: ${String(i)}`,success:null}}}function Rh(e){var o;const t=(e??"").trim();if(!t)return null;const n=t.split(":").filter(Boolean);if(n.length<3||n[0]!=="agent")return null;const i=(o=n[1])==null?void 0:o.trim(),s=n.slice(2).join(":");return!i||!s?null:{agentId:i,rest:s}}const ua=450;function ps(e,t=!1,n=!1){e.chatScrollFrame&&cancelAnimationFrame(e.chatScrollFrame),e.chatScrollTimeout!=null&&(clearTimeout(e.chatScrollTimeout),e.chatScrollTimeout=null);const i=()=>{const s=e.querySelector(".chat-thread");if(s){const o=getComputedStyle(s).overflowY;if(o==="auto"||o==="scroll"||s.scrollHeight-s.clientHeight>1)return s}return document.scrollingElement??document.documentElement};e.updateComplete.then(()=>{e.chatScrollFrame=requestAnimationFrame(()=>{e.chatScrollFrame=null;const s=i();if(!s)return;const o=s.scrollHeight-s.scrollTop-s.clientHeight,r=t&&!e.chatHasAutoScrolled;if(!(r||e.chatUserNearBottom||o<ua)){e.chatNewMessagesBelow=!0;return}r&&(e.chatHasAutoScrolled=!0);const l=n&&(typeof window>"u"||typeof window.matchMedia!="function"||!window.matchMedia("(prefers-reduced-motion: reduce)").matches),c=s.scrollHeight;typeof s.scrollTo=="function"?s.scrollTo({top:c,behavior:l?"smooth":"auto"}):s.scrollTop=c,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1;const d=r?150:120;e.chatScrollTimeout=window.setTimeout(()=>{e.chatScrollTimeout=null;const u=i();if(!u)return;const h=u.scrollHeight-u.scrollTop-u.clientHeight;(r||e.chatUserNearBottom||h<ua)&&(u.scrollTop=u.scrollHeight,e.chatUserNearBottom=!0)},d)})})}function Mh(e,t=!1){e.logsScrollFrame&&cancelAnimationFrame(e.logsScrollFrame),e.updateComplete.then(()=>{e.logsScrollFrame=requestAnimationFrame(()=>{e.logsScrollFrame=null;const n=e.querySelector(".log-stream");if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;(t||i<80)&&(n.scrollTop=n.scrollHeight)})})}function ym(e,t){const n=t.currentTarget;if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;e.chatUserNearBottom=i<ua,e.chatUserNearBottom&&(e.chatNewMessagesBelow=!1)}function vm(e,t){const n=t.currentTarget;if(!n)return;const i=n.scrollHeight-n.scrollTop-n.clientHeight;e.logsAtBottom=i<80}function Fc(e){e.chatHasAutoScrolled=!1,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1}function xm(e,t){if(e.length===0)return;const n=new Blob([`${e.join(`
`)}
`],{type:"text/plain"}),i=URL.createObjectURL(n),s=document.createElement("a"),o=new Date().toISOString().slice(0,19).replace(/[:T]/g,"-");s.href=i,s.download=`openclaw-logs-${t}-${o}.log`,s.click(),URL.revokeObjectURL(i)}function wm(e){if(typeof ResizeObserver>"u")return;const t=e.querySelector(".topbar");if(!t)return;const n=()=>{const{height:i}=t.getBoundingClientRect();e.style.setProperty("--topbar-height",`${i}px`)};n(),e.topbarObserver=new ResizeObserver(()=>n()),e.topbarObserver.observe(t)}async function Uo(e){if(!(!e.client||!e.connected)&&!e.debugLoading){e.debugLoading=!0;try{const[t,n,i,s]=await Promise.all([e.client.request("status",{}),e.client.request("health",{}),e.client.request("models.list",{}),e.client.request("last-heartbeat",{})]);e.debugStatus=t,e.debugHealth=n;const o=i;e.debugModels=Array.isArray(o==null?void 0:o.models)?o==null?void 0:o.models:[],e.debugHeartbeat=s}catch(t){e.debugCallError=String(t)}finally{e.debugLoading=!1}}}async function _m(e){if(!(!e.client||!e.connected)){e.debugCallError=null,e.debugCallResult=null;try{const t=e.debugCallParams.trim()?JSON.parse(e.debugCallParams):{},n=await e.client.request(e.debugCallMethod.trim(),t);e.debugCallResult=JSON.stringify(n,null,2)}catch(t){e.debugCallError=String(t)}}}const km=2e3,Sm=new Set(["trace","debug","info","warn","error","fatal"]);function $m(e){if(typeof e!="string")return null;const t=e.trim();if(!t.startsWith("{")||!t.endsWith("}"))return null;try{const n=JSON.parse(t);return!n||typeof n!="object"?null:n}catch{return null}}function Am(e){if(typeof e!="string")return null;const t=e.toLowerCase();return Sm.has(t)?t:null}function Tm(e){if(!e.trim())return{raw:e,message:e};try{const t=JSON.parse(e),n=t&&typeof t._meta=="object"&&t._meta!==null?t._meta:null,i=typeof t.time=="string"?t.time:typeof(n==null?void 0:n.date)=="string"?n==null?void 0:n.date:null,s=Am((n==null?void 0:n.logLevelName)??(n==null?void 0:n.level)),o=typeof t[0]=="string"?t[0]:typeof(n==null?void 0:n.name)=="string"?n==null?void 0:n.name:null,r=$m(o);let a=null;r&&(typeof r.subsystem=="string"?a=r.subsystem:typeof r.module=="string"&&(a=r.module)),!a&&o&&o.length<120&&(a=o);let l=null;return typeof t[1]=="string"?l=t[1]:!r&&typeof t[0]=="string"?l=t[0]:typeof t.message=="string"&&(l=t.message),{raw:e,time:i,level:s,subsystem:a,message:l??e,meta:n??void 0}}catch{return{raw:e,message:e}}}async function sl(e,t){if(!(!e.client||!e.connected)&&!(e.logsLoading&&!(t!=null&&t.quiet))){t!=null&&t.quiet||(e.logsLoading=!0),e.logsError=null;try{const i=await e.client.request("logs.tail",{cursor:t!=null&&t.reset?void 0:e.logsCursor??void 0,limit:e.logsLimit,maxBytes:e.logsMaxBytes}),o=(Array.isArray(i.lines)?i.lines.filter(a=>typeof a=="string"):[]).map(Tm),r=!!(t!=null&&t.reset||i.reset||e.logsCursor==null);e.logsEntries=r?o:[...e.logsEntries,...o].slice(-km),typeof i.cursor=="number"&&(e.logsCursor=i.cursor),typeof i.file=="string"&&(e.logsFile=i.file),e.logsTruncated=!!i.truncated,e.logsLastFetchAt=Date.now()}catch(n){e.logsError=String(n)}finally{t!=null&&t.quiet||(e.logsLoading=!1)}}}async function qo(e,t){if(!(!e.client||!e.connected)&&!e.nodesLoading){e.nodesLoading=!0,t!=null&&t.quiet||(e.lastError=null);try{const n=await e.client.request("node.list",{});e.nodes=Array.isArray(n.nodes)?n.nodes:[]}catch(n){t!=null&&t.quiet||(e.lastError=String(n))}finally{e.nodesLoading=!1}}}function Cm(e){e.nodesPollInterval==null&&(e.nodesPollInterval=window.setInterval(()=>void qo(e,{quiet:!0}),5e3))}function Em(e){e.nodesPollInterval!=null&&(clearInterval(e.nodesPollInterval),e.nodesPollInterval=null)}function ol(e){e.logsPollInterval==null&&(e.logsPollInterval=window.setInterval(()=>{e.tab==="logs"&&sl(e,{quiet:!0})},2e3))}function rl(e){e.logsPollInterval!=null&&(clearInterval(e.logsPollInterval),e.logsPollInterval=null)}function al(e){e.debugPollInterval==null&&(e.debugPollInterval=window.setInterval(()=>{e.tab==="debug"&&Uo(e)},3e3))}function ll(e){e.debugPollInterval!=null&&(clearInterval(e.debugPollInterval),e.debugPollInterval=null)}async function Ph(e,t){if(!(!e.client||!e.connected||e.agentIdentityLoading)&&!e.agentIdentityById[t]){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{const n=await e.client.request("agent.identity.get",{agentId:t});n&&(e.agentIdentityById={...e.agentIdentityById,[t]:n})}catch(n){e.agentIdentityError=String(n)}finally{e.agentIdentityLoading=!1}}}async function Dh(e,t){if(!e.client||!e.connected||e.agentIdentityLoading)return;const n=t.filter(i=>!e.agentIdentityById[i]);if(n.length!==0){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{for(const i of n){const s=await e.client.request("agent.identity.get",{agentId:i});s&&(e.agentIdentityById={...e.agentIdentityById,[i]:s})}}catch(i){e.agentIdentityError=String(i)}finally{e.agentIdentityLoading=!1}}}async function cl(e){var t;if(!(!e.client||!e.connected)&&!e.agentsLoading){e.agentsLoading=!0,e.agentsError=null;try{const n=await e.client.request("agents.list",{});if(n){e.agentsList=n;const i=e.agentsSelectedId,s=n.agents.some(o=>o.id===i);(!i||!s)&&(e.agentsSelectedId=n.defaultId??((t=n.agents[0])==null?void 0:t.id)??null)}}catch(n){e.agentsError=String(n)}finally{e.agentsLoading=!1}}}async function Lh(e){if(!e.agentInfoLoading){e.agentInfoLoading=!0,e.agentInfoError=null;try{const t=await fetch("/api/agent/info");if(!t.ok)throw new Error(`HTTP ${t.status}`);e.agentInfo=await t.json()}catch(t){e.agentInfoError=String(t)}finally{e.agentInfoLoading=!1}}}function dl(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}async function Rm(e){try{const n=await(await fetch(dl(e.basePath,"/api/business-knowledge/dependent-files"))).json().catch(()=>({}));n.success&&n.data?e.bkDependentFiles={mapping_table:n.data.mapping_table??"",price_library:n.data.price_library??""}:e.bkDependentFiles=null}catch{e.bkDependentFiles=null}}async function Ih(e){e.bkLoading=!0,e.bkError=null,Rm(e);try{const t=await fetch(dl(e.basePath,"/api/business-knowledge")),n=await t.json().catch(()=>({}));n.success&&n.data&&typeof n.data.content=="string"?e.bkContent=n.data.content:(e.bkContent="",t.ok||(e.bkError=n.detail??`HTTP ${t.status}`))}catch(t){e.bkError=t instanceof Error?t.message:String(t),e.bkContent=""}finally{e.bkLoading=!1}}async function Mm(e,t){e.bkSaving=!0,e.bkError=null;try{const n=await fetch(dl(e.basePath,"/api/business-knowledge"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:t})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(e.bkContent=t,e.bkLastSuccess=Date.now(),!0):(e.bkError=i.detail??`HTTP ${n.status}`,!1)}catch(n){return e.bkError=n instanceof Error?n.message:String(n),!1}finally{e.bkSaving=!1}}function Pm(e){if(e==null||!Number.isFinite(e))return"n/a";const t=Math.floor(e/1e3),n=Math.floor(t/60),i=Math.floor(n/60);return i>0?`${i}h`:n>0?`${n}m`:t>0?`${t}s`:"<1s"}function gs(e){if(e==null||!Number.isFinite(e))return"n/a";const t=Date.now(),n=e-t,i=Math.abs(n),s=Math.floor(i/6e4),o=Math.floor(s/60),r=Math.floor(o/24);return n>0?s<1?"in <1m":s<60?`in ${s}m`:o<24?`in ${o}h`:`in ${r}d`:i<15e3?"just now":s<60?`${s}m ago`:o<24?`${o}h ago`:`${r}d ago`}function Dm(e,t){return!e||typeof e!="string"?"":e.replace(/<think>[\s\S]*?<\/think>/gi,"").trim()}function Lm(e){return!e&&e!==0?"n/a":new Date(e).toLocaleString()}function ha(e){return!e||e.length===0?"none":e.filter(t=>!!(t&&t.trim())).join(", ")}function fa(e,t=120){return e.length<=t?e:`${e.slice(0,Math.max(0,t-1))}…`}function Oh(e,t){return e.length<=t?{text:e,truncated:!1,total:e.length}:{text:e.slice(0,Math.max(0,t)),truncated:!0,total:e.length}}function Nc(e,t){const n=Number(e);return Number.isFinite(n)?n:t}function $r(e){return Dm(e)}async function Fh(e){if(!(!e.client||!e.connected))try{const t=await e.client.request("cron.status",{});e.cronStatus=t}catch(t){e.cronError=String(t)}}async function Im(e){if(!(!e.client||!e.connected)&&!e.cronLoading){e.cronLoading=!0,e.cronError=null;try{const t=await e.client.request("cron.list",{includeDisabled:!0});e.cronJobs=Array.isArray(t.jobs)?t.jobs:[]}catch(t){e.cronError=String(t)}finally{e.cronLoading=!1}}}function Ar(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams;for(const[r,a]of Object.entries(n))o.set(r,String(a));return`${s}?${o.toString()}`}async function Om(e){e.dashboardLoading=!0,e.dashboardError=null;try{const[t,n,i]=await Promise.allSettled([fetch(Ar(e.basePath,"/api/quotation-drafts/stats",{days:7})),fetch(Ar(e.basePath,"/api/oos/by-time",{days:7})),fetch(Ar(e.basePath,"/api/shortage/by-time",{days:7}))]),s=[];if(t.status==="fulfilled"){const o=await t.value.json().catch(()=>({}));o.success&&o.data?e.quotationStats=o.data:(e.quotationStats=null,s.push(o.detail??`quotation/stats: ${t.value.status}`))}else e.quotationStats=null,s.push(`quotation/stats: ${String(t.reason)}`);if(n.status==="fulfilled"){const o=await n.value.json().catch(()=>({}));e.dashboardOosByTime=o.success&&Array.isArray(o.data)?o.data:[],o.success||s.push(o.detail??`oos/by-time: ${n.value.status}`)}else e.dashboardOosByTime=[],s.push(`oos/by-time: ${String(n.reason)}`);if(i.status==="fulfilled"){const o=await i.value.json().catch(()=>({}));e.dashboardShortageByTime=o.success&&Array.isArray(o.data)?o.data:[],o.success||s.push(o.detail??`shortage/by-time: ${i.value.status}`)}else e.dashboardShortageByTime=[],s.push(`shortage/by-time: ${String(i.reason)}`);e.dashboardError=s.length>0?s.join(" | "):null}catch(t){e.dashboardError=t instanceof Error?t.message:String(t),e.quotationStats=null,e.dashboardOosByTime=[],e.dashboardShortageByTime=[]}finally{e.dashboardLoading=!1}}class _e extends Error{constructor(t,n){super(`Invalid response schema from ${t}: ${n}`),this.name="ResponseSchemaError",this.endpoint=t}}function Nh(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function ae(e,t,n="response"){if(!Nh(e))throw new _e(t,`${n} must be an object`);return e}function Zt(e,t,n){if(!Array.isArray(e))throw new _e(t,`${n} must be an array`);return e}function Wt(e,t,n){if(typeof e!="string")throw new _e(t,`${n} must be a string`);return e}function jo(e,t,n){if(typeof e!="number"||Number.isNaN(e))throw new _e(t,`${n} must be a number`);return e}function W(e){return typeof e=="string"?e:void 0}function $e(e){return typeof e=="number"&&Number.isFinite(e)?e:void 0}function ul(e){return typeof e=="boolean"?e:void 0}function Ne(e,t){return Nh(e)?typeof e.detail=="string"&&e.detail.trim()?e.detail.trim():typeof e.error=="string"&&e.error.trim()?e.error.trim():typeof e.message=="string"&&e.message.trim()?e.message.trim():t:t}function fe(e,t,n,i){return`${e}失败：${t}。影响：${n}。下一步：${i}`}const Ds="/api/quotation-drafts",Bc="/api/quotation-drafts/{id}",Fm="/api/quotation-drafts/{id}/confirm",zc=new WeakMap;function Nm(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams(n);return`${s}?${o.toString()}`}function Bm(e,t){var s;const n=globalThis,i=typeof((s=n.crypto)==null?void 0:s.randomUUID)=="function"?n.crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2,10)}`;return`${e}:${t}:${i}`}function zm(e){let t=zc.get(e);return t||(t=new Map,zc.set(e,t)),t}function Bh(e,t){const n=ae(e,t,"data[]"),s=$e(n.id)??Number(n.id);return{id:Number.isFinite(s)?s:0,draft_no:Wt(n.draft_no,t,"data[].draft_no"),name:Wt(n.name,t,"data[].name"),source:W(n.source),file_path:typeof n.file_path=="string"?n.file_path:null,created_at:W(n.created_at)??null,status:Wt(n.status,t,"data[].status"),confirmed_at:W(n.confirmed_at)??null}}function Hm(e,t){const n=ae(e,t,"data"),i=Bh(n,t),o=Zt(n.lines,t,"data.lines").map(r=>{const a=ae(r,t,"data.lines[]"),l=$e(a.warehouse_qty),c=$e(a.available_qty);return{...a,warehouse_qty:l??c??null}});return{...i,lines:o}}function Um(e,t){const n=ae(e,t),i=n.data!=null?ae(n.data,t,"data"):{},s=W(i.order_id)??W(n.order_id),o=W(i.message)??W(n.message)??"已确认成单";return{order_id:s,message:o}}async function hl(e){e.fulfillDraftsLoading=!0,e.fulfillDraftsError=null;try{const t=Nm(e.basePath,Ds,{status:"pending",limit:"50"}),n=await fetch(t),i=await n.json().catch(()=>({}));if(!n.ok){e.fulfillDraftsError=fe("加载待确认报价单列表",Ne(i,`HTTP ${n.status}`),"无法查看最新待确认报价单","点击“重试”重新加载列表"),e.fulfillDrafts=[];return}const s=ae(i,Ds),o=Zt(s.data,Ds,"data");e.fulfillDrafts=o.map(r=>Bh(r,Ds)).filter(r=>r.id>0)}catch(t){const n=t instanceof _e||t instanceof Error?t.message:String(t);e.fulfillDraftsError=fe("加载待确认报价单列表",n,"列表可能为空或字段错位","检查后端返回字段后重试"),e.fulfillDrafts=[]}finally{e.fulfillDraftsLoading=!1}}async function qm(e,t){var n;e.fulfillDetailId=t;try{const i=(n=e.basePath)!=null&&n.trim()?`${e.basePath.replace(/\/$/,"")}/api/quotation-drafts/${t}`:`/api/quotation-drafts/${t}`,s=await fetch(i),o=await s.json().catch(()=>({}));if(!s.ok){e.fulfillDetail=null,e.fulfillConfirmResult={message:fe("加载报价单详情",Ne(o,`HTTP ${s.status}`),"无法确认该报价单","点击“重试”或返回列表后重选")};return}const r=ae(o,Bc);e.fulfillDetail=Hm(r.data,Bc)}catch(i){const s=i instanceof _e||i instanceof Error?i.message:String(i);e.fulfillDetail=null,e.fulfillConfirmResult={message:fe("加载报价单详情",s,"无法确认该报价单","点击“重试”或返回列表后重选")}}}async function jm(e,t){const n=zm(e),i=n.get(t);if(i)return i;const s=(async()=>{var o;e.fulfillConfirmBusy=!0,e.fulfillConfirmResult=null;try{const r=(o=e.basePath)!=null&&o.trim()?`${e.basePath.replace(/\/$/,"")}/api/quotation-drafts/${t}/confirm`:`/api/quotation-drafts/${t}/confirm`,a=Bm("fulfill-confirm",String(t)),l=await fetch(r,{method:"PATCH",headers:{"X-Idempotency-Key":a,"Idempotency-Key":a}}),c=await l.json().catch(()=>({}));if(!l.ok)return e.fulfillConfirmResult={message:fe("确认成单",Ne(c,`HTTP ${l.status}`),"该报价单仍为待确认，库存未锁定","点击“重试”再次确认")},e.fulfillConfirmResult;const d=Um(c,Fm);return e.fulfillConfirmResult=d,e.fulfillDetail=null,e.fulfillDetailId=null,await hl(e),d}catch(r){const a=r instanceof _e||r instanceof Error?r.message:String(r);return e.fulfillConfirmResult={message:fe("确认成单",a,"该报价单仍为待确认，库存未锁定","点击“重试”再次确认")},e.fulfillConfirmResult}finally{e.fulfillConfirmBusy=!1,n.delete(t)}})();return n.set(t,s),s}function ot(e){return`${e.product_key??""}	${e.specification??""}	${e.code??""}`}const Ls="/api/shortage/list",zi="/api/procurement/approve",ge="/api/replenishment-drafts",Hc=new WeakMap;function Km(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams(n);return`${s}?${o.toString()}`}function Wm(e,t){var s;const n=globalThis,i=typeof((s=n.crypto)==null?void 0:s.randomUUID)=="function"?n.crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2,10)}`;return`${e}:${t}:${i}`}function Vm(e){let t=Hc.get(e);return t||(t=new Map,Hc.set(e,t)),t}function vt(e){const t=$e(e);if(t!=null)return t;const n=Number(e);return Number.isFinite(n)?n:void 0}function Gm(e,t){const n=ae(e,t,"data[]");return{id:vt(n.id),product_name:W(n.product_name),specification:W(n.specification),quantity:vt(n.quantity),available_qty:vt(n.available_qty),shortfall:vt(n.shortfall),code:W(n.code),quote_name:W(n.quote_name),unit_price:vt(n.unit_price),file_name:W(n.file_name),uploaded_at:W(n.uploaded_at)??null,product_key:W(n.product_key),count:vt(n.count)}}function Qm(e){const t=new Map;for(const n of e){const i=ot(n);if(!i.trim())continue;const s=t.get(i);if(!s){t.set(i,n);continue}const o=Number(s.count??0),r=Number(n.count??0),a=s.uploaded_at?new Date(s.uploaded_at).getTime():0,l=n.uploaded_at?new Date(n.uploaded_at).getTime():0;(r>o||r===o&&l>=a)&&t.set(i,n)}return Array.from(t.values())}function Ym(e){const t=ae(e,zi),n=t.data!=null?ae(t.data,zi,"data"):{},i=$e(t.approved_count)??$e(n.approved_count)??(t.approved_count!=null?jo(t.approved_count,zi,"approved_count"):void 0),s=W(t.message)??W(n.message)??"已批准并通知采购员。";return{approved_count:i,message:s}}function Xm(e){return e.map(n=>`${n.product_key??""}|${n.product_name??""}|${n.specification??""}|${n.code??""}|${n.shortfall??0}`).sort().join(";")}async function fl(e){e.procurementLoading=!0,e.procurementError=null;try{const t=Km(e.basePath,Ls,{limit:"200",unapproved_only:"1"}),n=await fetch(t),i=await n.json().catch(()=>({}));if(!n.ok){e.procurementError=fe("加载采购建议列表",Ne(i,`HTTP ${n.status}`),"无法查看最新缺货采购建议","点击“重试”重新加载列表"),e.procurementSuggestions=[];return}const s=ae(i,Ls),o=Zt(s.data,Ls,"data");e.procurementSuggestions=Qm(o.map(r=>Gm(r,Ls)))}catch(t){const n=t instanceof _e||t instanceof Error?t.message:String(t);e.procurementError=fe("加载采购建议列表",n,"列表可能为空或字段错位","检查后端返回字段后重试"),e.procurementSuggestions=[]}finally{e.procurementLoading=!1}}async function Uc(e,t){if(!t.length)return null;const n=Xm(t),i=Vm(e),s=i.get(n);if(s)return s;const o=(async()=>{var r;e.procurementApproveBusy=!0,e.procurementApproveResult=null;try{const a=(r=e.basePath)!=null&&r.trim()?`${e.basePath.replace(/\/$/,"")}${zi}`:zi,l=Wm("procurement-approve",n||"single"),c=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json","X-Idempotency-Key":l,"Idempotency-Key":l},body:JSON.stringify({items:t})}),d=await c.json().catch(()=>({}));if(!c.ok)return e.procurementApproveResult={message:fe("采购批准",Ne(d,`HTTP ${c.status}`),"这些缺货项仍待批准，采购员未收到通知","点击“重试”再次批准")},e.procurementApproveResult;const u=Ym(d);return e.procurementApproveResult=u,await fl(e),u}catch(a){const l=a instanceof _e||a instanceof Error?a.message:String(a);return e.procurementApproveResult={message:fe("采购批准",l,"这些缺货项仍待批准，采购员未收到通知","点击“重试”再次批准")},e.procurementApproveResult}finally{e.procurementApproveBusy=!1,i.delete(n)}})();return i.set(n,o),o}async function ms(e){var t;e.replenishmentLoading=!0,e.replenishmentError=null;try{const n=(t=e.basePath)!=null&&t.trim()?e.basePath.replace(/\/$/,""):"",i=n?`${n}${ge}`:ge,s=await fetch(i),o=await s.json().catch(()=>({}));if(!s.ok){e.replenishmentError=fe("加载补货单列表",Ne(o,`HTTP ${s.status}`),"无法查看补货单列表","点击“重试”重新加载列表"),e.replenishmentDrafts=[];return}const r=ae(o,ge),a=Zt(r.data,ge,"data");e.replenishmentDrafts=a.map(l=>{const c=ae(l,ge,"data[]");return{id:jo(c.id,ge,"id"),draft_no:W(c.draft_no)??"",name:W(c.name)??"",source:W(c.source)??void 0,created_at:W(c.created_at),status:W(c.status)??"",confirmed_at:W(c.confirmed_at)}})}catch(n){const i=n instanceof _e||n instanceof Error?n.message:String(n);e.replenishmentError=fe("加载补货单列表",i,"补货单列表可能为空或字段错位","检查后端返回字段后重试"),e.replenishmentDrafts=[]}finally{e.replenishmentLoading=!1}}async function Jm(e,t){var n;e.replenishmentLoading=!0,e.replenishmentError=null;try{const i=(n=e.basePath)!=null&&n.trim()?e.basePath.replace(/\/$/,""):"",s=i?`${i}${ge}/${t}`:`${ge}/${t}`,o=await fetch(s),r=await o.json().catch(()=>({}));if(!o.ok){e.replenishmentError=fe("加载补货单详情",Ne(r,`HTTP ${o.status}`),"无法查看补货单详情","稍后重试"),e.replenishmentDetail=null,e.replenishmentDetailId=null;return}const a=ae(r,ge,"detail"),l=ae(a.data,ge,"data"),d=Zt(l.lines,ge,"data.lines").map(u=>{const h=ae(u,ge,"data.lines[]");return{id:vt(h.id),row_index:vt(h.row_index),code:W(h.code),product_name:W(h.product_name),specification:W(h.specification),quantity:vt(h.quantity)??0,current_qty:vt(h.current_qty),memo:W(h.memo)}});e.replenishmentDetail={id:jo(l.id,ge,"id"),draft_no:W(l.draft_no)??"",name:W(l.name)??"",source:W(l.source)??void 0,created_at:W(l.created_at),status:W(l.status)??"",confirmed_at:W(l.confirmed_at),lines:d},e.replenishmentDetailId=e.replenishmentDetail.id}catch(i){const s=i instanceof _e||i instanceof Error?i.message:String(i);e.replenishmentError=fe("加载补货单详情",s,"无法查看补货单详情","稍后重试"),e.replenishmentDetail=null,e.replenishmentDetailId=null}finally{e.replenishmentLoading=!1}}async function Zm(e,t){var u;const n=t.filter(h=>{const f=typeof h.product_or_code=="string"?h.product_or_code.trim():"",m=Number(h.quantity);return f.length>0&&m>0});if(n.length===0)return null;const i={lines:n.map(h=>({product_or_code:typeof h.product_or_code=="string"?h.product_or_code.trim():"",quantity:Number(h.quantity)}))},s=(u=e.basePath)!=null&&u.trim()?e.basePath.replace(/\/$/,""):"",o=s?`${s}${ge}`:ge,r=await fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}),a=await r.json().catch(()=>({}));if(!r.ok)return e.replenishmentError=fe("生成补货单",Ne(a,`HTTP ${r.status}`),"补货单未创建","请检查输入后重试"),null;const l=ae(a,ge),c=l.data!=null?ae(l.data,ge,"data"):{},d=jo(c.id,ge,"data.id");return await ms(e),{id:d}}async function eb(e,t){var n;e.replenishmentConfirmBusy=!0,e.replenishmentConfirmResult=null;try{const i=(n=e.basePath)!=null&&n.trim()?e.basePath.replace(/\/$/,""):"",s=i?`${i}${ge}/${t}/confirm`:`${ge}/${t}/confirm`,o=await fetch(s,{method:"PATCH"}),r=await o.json().catch(()=>({}));if(!o.ok){e.replenishmentConfirmResult={message:fe("确认补货单",Ne(r,`HTTP ${o.status}`),"补货未执行","稍后重试")};return}const a=ae(r,ge,"confirm"),l=ae(a.data,ge,"data"),c=$e(l.executed),d=W(l.message);e.replenishmentConfirmResult={executed:c??void 0,message:d||`已执行 ${c??0} 条补货操作。`},await ms(e)}catch(i){const s=i instanceof _e||i instanceof Error?i.message:String(i);e.replenishmentConfirmResult={message:fe("确认补货单",s,"补货未执行","稍后重试")}}finally{e.replenishmentConfirmBusy=!1}}async function tb(e,t){var o;const n=(o=e.basePath)!=null&&o.trim()?e.basePath.replace(/\/$/,""):"",i=n?`${n}${ge}/${t}`:`${ge}/${t}`,s=await fetch(i,{method:"DELETE"});if(!s.ok){const r=await s.json().catch(()=>({}));return e.replenishmentError=fe("删除补货单",Ne(r,`HTTP ${s.status}`),"补货单未删除","请重试"),!1}return e.replenishmentDetailId===t&&(e.replenishmentDetail=null,e.replenishmentDetailId=null),await ms(e),!0}function pl(e){return(e??"").trim().toLowerCase()||"viewer"}function nb(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").map(t=>t.trim()).filter(Boolean):[]}const zh="openclaw.device.auth.v1";function gl(){try{const e=window.localStorage.getItem(zh);if(!e)return null;const t=JSON.parse(e);return!t||t.version!==1||!t.deviceId||typeof t.deviceId!="string"||!t.tokens||typeof t.tokens!="object"?null:t}catch{return null}}function Hh(e){try{window.localStorage.setItem(zh,JSON.stringify(e))}catch{}}function ib(e){const t=gl();if(!t||t.deviceId!==e.deviceId)return null;const n=pl(e.role),i=t.tokens[n];return!i||typeof i.token!="string"?null:i}function Uh(e){const t=pl(e.role),n={version:1,deviceId:e.deviceId,tokens:{}},i=gl();i&&i.deviceId===e.deviceId&&(n.tokens={...i.tokens});const s={token:e.token,role:t,scopes:nb(e.scopes),updatedAtMs:Date.now()};return n.tokens[t]=s,Hh(n),s}function qh(e){const t=gl();if(!t||t.deviceId!==e.deviceId)return;const n=pl(e.role);if(!t.tokens[n])return;const i={...t,tokens:{...t.tokens}};delete i.tokens[n],Hh(i)}/*! noble-ed25519 - MIT License (c) 2019 Paul Miller (paulmillr.com) */const jh={p:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffedn,n:0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn,h:8n,a:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffecn,d:0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3n,Gx:0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an,Gy:0x6666666666666666666666666666666666666666666666666666666666666658n},{p:Le,n:oo,Gx:qc,Gy:jc,a:Tr,d:Cr,h:sb}=jh,Cn=32,ml=64,ob=(...e)=>{"captureStackTrace"in Error&&typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(...e)},Te=(e="")=>{const t=new Error(e);throw ob(t,Te),t},rb=e=>typeof e=="bigint",ab=e=>typeof e=="string",lb=e=>e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array",en=(e,t,n="")=>{const i=lb(e),s=e==null?void 0:e.length,o=t!==void 0;if(!i||o&&s!==t){const r=n&&`"${n}" `,a=o?` of length ${t}`:"",l=i?`length=${s}`:`type=${typeof e}`;Te(r+"expected Uint8Array"+a+", got "+l)}return e},Ko=e=>new Uint8Array(e),Kh=e=>Uint8Array.from(e),Wh=(e,t)=>e.toString(16).padStart(t,"0"),Vh=e=>Array.from(en(e)).map(t=>Wh(t,2)).join(""),At={_0:48,_9:57,A:65,F:70,a:97,f:102},Kc=e=>{if(e>=At._0&&e<=At._9)return e-At._0;if(e>=At.A&&e<=At.F)return e-(At.A-10);if(e>=At.a&&e<=At.f)return e-(At.a-10)},Gh=e=>{const t="hex invalid";if(!ab(e))return Te(t);const n=e.length,i=n/2;if(n%2)return Te(t);const s=Ko(i);for(let o=0,r=0;o<i;o++,r+=2){const a=Kc(e.charCodeAt(r)),l=Kc(e.charCodeAt(r+1));if(a===void 0||l===void 0)return Te(t);s[o]=a*16+l}return s},Qh=()=>globalThis==null?void 0:globalThis.crypto,cb=()=>{var e;return((e=Qh())==null?void 0:e.subtle)??Te("crypto.subtle must be defined, consider polyfill")},ns=(...e)=>{const t=Ko(e.reduce((i,s)=>i+en(s).length,0));let n=0;return e.forEach(i=>{t.set(i,n),n+=i.length}),t},db=(e=Cn)=>Qh().getRandomValues(Ko(e)),xo=BigInt,fn=(e,t,n,i="bad number: out of range")=>rb(e)&&t<=e&&e<n?e:Te(i),H=(e,t=Le)=>{const n=e%t;return n>=0n?n:t+n},Yh=e=>H(e,oo),ub=(e,t)=>{(e===0n||t<=0n)&&Te("no inverse n="+e+" mod="+t);let n=H(e,t),i=t,s=0n,o=1n;for(;n!==0n;){const r=i/n,a=i%n,l=s-o*r;i=n,n=a,s=o,o=l}return i===1n?H(s,t):Te("no inverse")},hb=e=>{const t=ef[e];return typeof t!="function"&&Te("hashes."+e+" not set"),t},Er=e=>e instanceof En?e:Te("Point expected"),pa=2n**256n,yt=class yt{constructor(t,n,i,s){D(this,"X");D(this,"Y");D(this,"Z");D(this,"T");const o=pa;this.X=fn(t,0n,o),this.Y=fn(n,0n,o),this.Z=fn(i,1n,o),this.T=fn(s,0n,o),Object.freeze(this)}static CURVE(){return jh}static fromAffine(t){return new yt(t.x,t.y,1n,H(t.x*t.y))}static fromBytes(t,n=!1){const i=Cr,s=Kh(en(t,Cn)),o=t[31];s[31]=o&-129;const r=Jh(s);fn(r,0n,n?pa:Le);const l=H(r*r),c=H(l-1n),d=H(i*l+1n);let{isValid:u,value:h}=pb(c,d);u||Te("bad point: y not sqrt");const f=(h&1n)===1n,m=(o&128)!==0;return!n&&h===0n&&m&&Te("bad point: x==0, isLastByteOdd"),m!==f&&(h=H(-h)),new yt(h,r,1n,H(h*r))}static fromHex(t,n){return yt.fromBytes(Gh(t),n)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}assertValidity(){const t=Tr,n=Cr,i=this;if(i.is0())return Te("bad point: ZERO");const{X:s,Y:o,Z:r,T:a}=i,l=H(s*s),c=H(o*o),d=H(r*r),u=H(d*d),h=H(l*t),f=H(d*H(h+c)),m=H(u+H(n*H(l*c)));if(f!==m)return Te("bad point: equation left != right (1)");const b=H(s*o),v=H(r*a);return b!==v?Te("bad point: equation left != right (2)"):this}equals(t){const{X:n,Y:i,Z:s}=this,{X:o,Y:r,Z:a}=Er(t),l=H(n*a),c=H(o*s),d=H(i*a),u=H(r*s);return l===c&&d===u}is0(){return this.equals(Qn)}negate(){return new yt(H(-this.X),this.Y,this.Z,H(-this.T))}double(){const{X:t,Y:n,Z:i}=this,s=Tr,o=H(t*t),r=H(n*n),a=H(2n*H(i*i)),l=H(s*o),c=t+n,d=H(H(c*c)-o-r),u=l+r,h=u-a,f=l-r,m=H(d*h),b=H(u*f),v=H(d*f),k=H(h*u);return new yt(m,b,k,v)}add(t){const{X:n,Y:i,Z:s,T:o}=this,{X:r,Y:a,Z:l,T:c}=Er(t),d=Tr,u=Cr,h=H(n*r),f=H(i*a),m=H(o*u*c),b=H(s*l),v=H((n+i)*(r+a)-h-f),k=H(b-m),T=H(b+m),M=H(f-d*h),S=H(v*k),C=H(T*M),y=H(v*M),E=H(k*T);return new yt(S,C,E,y)}subtract(t){return this.add(Er(t).negate())}multiply(t,n=!0){if(!n&&(t===0n||this.is0()))return Qn;if(fn(t,1n,oo),t===1n)return this;if(this.equals(Rn))return $b(t).p;let i=Qn,s=Rn;for(let o=this;t>0n;o=o.double(),t>>=1n)t&1n?i=i.add(o):n&&(s=s.add(o));return i}multiplyUnsafe(t){return this.multiply(t,!1)}toAffine(){const{X:t,Y:n,Z:i}=this;if(this.equals(Qn))return{x:0n,y:1n};const s=ub(i,Le);H(i*s)!==1n&&Te("invalid inverse");const o=H(t*s),r=H(n*s);return{x:o,y:r}}toBytes(){const{x:t,y:n}=this.assertValidity().toAffine(),i=Xh(n);return i[31]|=t&1n?128:0,i}toHex(){return Vh(this.toBytes())}clearCofactor(){return this.multiply(xo(sb),!1)}isSmallOrder(){return this.clearCofactor().is0()}isTorsionFree(){let t=this.multiply(oo/2n,!1).double();return oo%2n&&(t=t.add(this)),t.is0()}};D(yt,"BASE"),D(yt,"ZERO");let En=yt;const Rn=new En(qc,jc,1n,H(qc*jc)),Qn=new En(0n,1n,1n,0n);En.BASE=Rn;En.ZERO=Qn;const Xh=e=>Gh(Wh(fn(e,0n,pa),ml)).reverse(),Jh=e=>xo("0x"+Vh(Kh(en(e)).reverse())),ft=(e,t)=>{let n=e;for(;t-- >0n;)n*=n,n%=Le;return n},fb=e=>{const n=e*e%Le*e%Le,i=ft(n,2n)*n%Le,s=ft(i,1n)*e%Le,o=ft(s,5n)*s%Le,r=ft(o,10n)*o%Le,a=ft(r,20n)*r%Le,l=ft(a,40n)*a%Le,c=ft(l,80n)*l%Le,d=ft(c,80n)*l%Le,u=ft(d,10n)*o%Le;return{pow_p_5_8:ft(u,2n)*e%Le,b2:n}},Wc=0x2b8324804fc1df0b2b4d00993dfbd7a72f431806ad2fe478c4ee1b274a0ea0b0n,pb=(e,t)=>{const n=H(t*t*t),i=H(n*n*t),s=fb(e*i).pow_p_5_8;let o=H(e*n*s);const r=H(t*o*o),a=o,l=H(o*Wc),c=r===e,d=r===H(-e),u=r===H(-e*Wc);return c&&(o=a),(d||u)&&(o=l),(H(o)&1n)===1n&&(o=H(-o)),{isValid:c||d,value:o}},ga=e=>Yh(Jh(e)),bl=(...e)=>ef.sha512Async(ns(...e)),gb=(...e)=>hb("sha512")(ns(...e)),Zh=e=>{const t=e.slice(0,Cn);t[0]&=248,t[31]&=127,t[31]|=64;const n=e.slice(Cn,ml),i=ga(t),s=Rn.multiply(i),o=s.toBytes();return{head:t,prefix:n,scalar:i,point:s,pointBytes:o}},yl=e=>bl(en(e,Cn)).then(Zh),mb=e=>Zh(gb(en(e,Cn))),bb=e=>yl(e).then(t=>t.pointBytes),yb=e=>bl(e.hashable).then(e.finish),vb=(e,t,n)=>{const{pointBytes:i,scalar:s}=e,o=ga(t),r=Rn.multiply(o).toBytes();return{hashable:ns(r,i,n),finish:c=>{const d=Yh(o+ga(c)*s);return en(ns(r,Xh(d)),ml)}}},xb=async(e,t)=>{const n=en(e),i=await yl(t),s=await bl(i.prefix,n);return yb(vb(i,s,n))},ef={sha512Async:async e=>{const t=cb(),n=ns(e);return Ko(await t.digest("SHA-512",n.buffer))},sha512:void 0},wb=(e=db(Cn))=>e,_b={getExtendedPublicKeyAsync:yl,getExtendedPublicKey:mb,randomSecretKey:wb},wo=8,kb=256,tf=Math.ceil(kb/wo)+1,ma=2**(wo-1),Sb=()=>{const e=[];let t=Rn,n=t;for(let i=0;i<tf;i++){n=t,e.push(n);for(let s=1;s<ma;s++)n=n.add(t),e.push(n);t=n.double()}return e};let Vc;const Gc=(e,t)=>{const n=t.negate();return e?n:t},$b=e=>{const t=Vc||(Vc=Sb());let n=Qn,i=Rn;const s=2**wo,o=s,r=xo(s-1),a=xo(wo);for(let l=0;l<tf;l++){let c=Number(e&r);e>>=a,c>ma&&(c-=o,e+=1n);const d=l*ma,u=d,h=d+Math.abs(c)-1,f=l%2!==0,m=c<0;c===0?i=i.add(Gc(f,t[u])):n=n.add(Gc(m,t[h]))}return e!==0n&&Te("invalid wnaf"),{p:n,f:i}},Rr="openclaw-device-identity-v1";function ba(e){let t="";for(const n of e)t+=String.fromCharCode(n);return btoa(t).replaceAll("+","-").replaceAll("/","_").replace(/=+$/g,"")}function nf(e){const t=e.replaceAll("-","+").replaceAll("_","/"),n=t+"=".repeat((4-t.length%4)%4),i=atob(n),s=new Uint8Array(i.length);for(let o=0;o<i.length;o+=1)s[o]=i.charCodeAt(o);return s}function Ab(e){return Array.from(e).map(t=>t.toString(16).padStart(2,"0")).join("")}async function sf(e){const t=await crypto.subtle.digest("SHA-256",e.slice().buffer);return Ab(new Uint8Array(t))}async function Tb(){const e=_b.randomSecretKey(),t=await bb(e);return{deviceId:await sf(t),publicKey:ba(t),privateKey:ba(e)}}async function vl(){try{const n=localStorage.getItem(Rr);if(n){const i=JSON.parse(n);if((i==null?void 0:i.version)===1&&typeof i.deviceId=="string"&&typeof i.publicKey=="string"&&typeof i.privateKey=="string"){const s=await sf(nf(i.publicKey));if(s!==i.deviceId){const o={...i,deviceId:s};return localStorage.setItem(Rr,JSON.stringify(o)),{deviceId:s,publicKey:i.publicKey,privateKey:i.privateKey}}return{deviceId:i.deviceId,publicKey:i.publicKey,privateKey:i.privateKey}}}}catch{}const e=await Tb(),t={version:1,deviceId:e.deviceId,publicKey:e.publicKey,privateKey:e.privateKey,createdAtMs:Date.now()};return localStorage.setItem(Rr,JSON.stringify(t)),e}async function Cb(e,t){const n=nf(e),i=new TextEncoder().encode(t),s=await xb(i,n);return ba(s)}async function tn(e,t){if(!(!e.client||!e.connected)&&!e.devicesLoading){e.devicesLoading=!0,t!=null&&t.quiet||(e.devicesError=null);try{const n=await e.client.request("device.pair.list",{});e.devicesList={pending:Array.isArray(n==null?void 0:n.pending)?n.pending:[],paired:Array.isArray(n==null?void 0:n.paired)?n.paired:[]}}catch(n){t!=null&&t.quiet||(e.devicesError=String(n))}finally{e.devicesLoading=!1}}}async function Eb(e,t){if(!(!e.client||!e.connected))try{await e.client.request("device.pair.approve",{requestId:t}),await tn(e)}catch(n){e.devicesError=String(n)}}async function Rb(e,t){if(!(!e.client||!e.connected||!window.confirm("Reject this device pairing request?")))try{await e.client.request("device.pair.reject",{requestId:t}),await tn(e)}catch(i){e.devicesError=String(i)}}async function Mb(e,t){if(!(!e.client||!e.connected))try{const n=await e.client.request("device.token.rotate",t);if(n!=null&&n.token){const i=await vl(),s=n.role??t.role;(n.deviceId===i.deviceId||t.deviceId===i.deviceId)&&Uh({deviceId:i.deviceId,role:s,token:n.token,scopes:n.scopes??t.scopes??[]}),window.prompt("New device token (copy and store securely):",n.token)}await tn(e)}catch(n){e.devicesError=String(n)}}async function Pb(e,t){if(!(!e.client||!e.connected||!window.confirm(`Revoke token for ${t.deviceId} (${t.role})?`)))try{await e.client.request("device.token.revoke",t);const i=await vl();t.deviceId===i.deviceId&&qh({deviceId:i.deviceId,role:t.role}),await tn(e)}catch(i){e.devicesError=String(i)}}function Db(e){if(!e||e.kind==="gateway")return{method:"exec.approvals.get",params:{}};const t=e.nodeId.trim();return t?{method:"exec.approvals.node.get",params:{nodeId:t}}:null}function Lb(e,t){if(!e||e.kind==="gateway")return{method:"exec.approvals.set",params:t};const n=e.nodeId.trim();return n?{method:"exec.approvals.node.set",params:{...t,nodeId:n}}:null}async function xl(e,t){if(!(!e.client||!e.connected)&&!e.execApprovalsLoading){e.execApprovalsLoading=!0,e.lastError=null;try{const n=Db(t);if(!n){e.lastError="Select a node before loading exec approvals.";return}const i=await e.client.request(n.method,n.params);Ib(e,i)}catch(n){e.lastError=String(n)}finally{e.execApprovalsLoading=!1}}}function Ib(e,t){e.execApprovalsSnapshot=t,e.execApprovalsDirty||(e.execApprovalsForm=Tn(t.file??{}))}async function Ob(e,t){var n,i;if(!(!e.client||!e.connected)){e.execApprovalsSaving=!0,e.lastError=null;try{const s=(n=e.execApprovalsSnapshot)==null?void 0:n.hash;if(!s){e.lastError="Exec approvals hash missing; reload and retry.";return}const o=e.execApprovalsForm??((i=e.execApprovalsSnapshot)==null?void 0:i.file)??{},r=Lb(t,{file:o,baseHash:s});if(!r){e.lastError="Select a node before saving exec approvals.";return}await e.client.request(r.method,r.params),e.execApprovalsDirty=!1,await xl(e,t)}catch(s){e.lastError=String(s)}finally{e.execApprovalsSaving=!1}}}function Fb(e,t,n){var s;const i=Tn(e.execApprovalsForm??((s=e.execApprovalsSnapshot)==null?void 0:s.file)??{});Sh(i,t,n),e.execApprovalsForm=i,e.execApprovalsDirty=!0}function Nb(e,t){var i;const n=Tn(e.execApprovalsForm??((i=e.execApprovalsSnapshot)==null?void 0:i.file)??{});$h(n,t),e.execApprovalsForm=n,e.execApprovalsDirty=!0}function Qe(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams;for(const[r,a]of Object.entries(n))o.set(r,String(a));return`${s}?${o.toString()}`}async function Wo(e,t){e.oosLoading=!0,e.oosError=null;try{const[s,o,r,a]=await Promise.all([fetch(Qe(e.basePath,"/api/oos/stats")),fetch(Qe(e.basePath,"/api/oos/list",{limit:100})),fetch(Qe(e.basePath,"/api/oos/by-file",{limit:50})),fetch(Qe(e.basePath,"/api/oos/by-time",{days:30}))]),l=await s.json().catch(()=>({})),c=await o.json().catch(()=>({})),d=await r.json().catch(()=>({})),u=await a.json().catch(()=>({}));l.success&&l.data?(e.oosStats=l.data,e.oosDb=l.db??null):(e.oosStats=null,s.ok||(e.oosError=l.detail??`stats: ${s.status}`)),c.success&&Array.isArray(c.data)?e.oosList=c.data:(e.oosList=[],!e.oosError&&!o.ok&&(e.oosError=c.detail??`list: ${o.status}`)),d.success&&Array.isArray(d.data)?e.oosByFile=d.data:e.oosByFile=[],u.success&&Array.isArray(u.data)?e.oosByTime=u.data:e.oosByTime=[]}catch(s){e.oosError=s instanceof Error?s.message:String(s),e.oosStats=null,e.oosList=[],e.oosByFile=[],e.oosByTime=[]}finally{e.oosLoading=!1}}async function Bb(e,t){if(!(t!=null&&t.trim()))return!1;try{const n=await fetch(Qe(e.basePath,"/api/oos/delete"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_key:t.trim()})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(await Wo(e),!0):(e.oosError=i.detail??`删除失败: ${n.status}`,!1)}catch(n){return e.oosError=n instanceof Error?n.message:String(n),!1}}async function zb(e,t){const n=(t.product_name||"").trim();if(!n)return!1;try{const i=await fetch(Qe(e.basePath,"/api/oos/add"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_name:n,specification:(t.specification??"").trim(),quantity:t.quantity??0,unit:(t.unit??"").trim()})}),s=await i.json().catch(()=>({}));return i.ok&&s.success?(await Wo(e),!0):(e.oosError=s.detail??`添加失败: ${i.status}`,!1)}catch(i){return e.oosError=i instanceof Error?i.message:String(i),!1}}async function Hb(e){try{const t=await fetch(Qe(e.basePath,"/api/oos/stats")),n=await t.json().catch(()=>({}));if(t.ok&&n.success&&n.data)e.overviewOosStats=n.data,e.overviewOosError=null;else{e.overviewOosStats=null;const i=typeof n.detail=="string"?n.detail:n.message??n.error??`oos stats: ${t.status}`;e.overviewOosError=i}}catch(t){e.overviewOosStats=null,e.overviewOosError=t instanceof Error?t.message:String(t)}}async function Vo(e,t){e.shortageLoading=!0,e.shortageError=null;try{const[s,o,r,a]=await Promise.all([fetch(Qe(e.basePath,"/api/shortage/stats"),{method:"GET"}),fetch(Qe(e.basePath,"/api/shortage/list",{limit:100}),{method:"GET"}),fetch(Qe(e.basePath,"/api/shortage/by-file"),{method:"GET"}),fetch(Qe(e.basePath,"/api/shortage/by-time",{days:30}),{method:"GET"})]),l=await s.json().catch(()=>({})),c=await o.json().catch(()=>({})),d=await r.json().catch(()=>({})),u=await a.json().catch(()=>({}));if(l.success&&l.data)e.shortageStats=l.data,e.shortageDb=l.db??null;else if(e.shortageStats=null,!e.shortageError&&!s.ok){const h=typeof l.detail=="string"?l.detail:l.message??l.error;e.shortageError=h??`stats: ${s.status} ${s.statusText}`}if(c.success&&Array.isArray(c.data))e.shortageList=c.data;else if(e.shortageList=[],!e.shortageError&&!o.ok){const h=typeof c.detail=="string"?c.detail:c.message??c.error;e.shortageError=h??`list: ${o.status} ${o.statusText}`}if(d.success&&Array.isArray(d.data))e.shortageByFile=d.data;else if(e.shortageByFile=[],!e.shortageError&&!r.ok){const h=typeof d.detail=="string"?d.detail:d.message??d.error;e.shortageError=h??`by-file: ${r.status} ${r.statusText}`}if(u.success&&Array.isArray(u.data))e.shortageByTime=u.data;else if(e.shortageByTime=[],!e.shortageError&&!a.ok){const h=typeof u.detail=="string"?u.detail:u.message??u.error;e.shortageError=h??`by-time: ${a.status} ${a.statusText}`}}catch(s){e.shortageError=s instanceof Error?s.message:String(s),e.shortageStats=null,e.shortageList=[],e.shortageByFile=[],e.shortageByTime=[]}finally{e.shortageLoading=!1}}async function Ub(e,t){if(!(t!=null&&t.trim()))return!1;try{const n=await fetch(Qe(e.basePath,"/api/shortage/delete"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_key:t.trim()})}),i=await n.json().catch(()=>({}));return n.ok&&i.success?(await Vo(e),!0):(e.shortageError=i.detail??`删除失败: ${n.status}`,!1)}catch(n){return e.shortageError=n instanceof Error?n.message:String(n),!1}}async function qb(e,t){const n=(t.product_name||"").trim();if(!n)return!1;try{const i=await fetch(Qe(e.basePath,"/api/shortage/add"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_name:n,specification:(t.specification??"").trim(),quantity:t.quantity??0,available_qty:t.available_qty??0})}),s=await i.json().catch(()=>({}));return i.ok&&s.success?(await Vo(e),!0):(e.shortageError=s.detail??`添加失败: ${i.status}`,!1)}catch(i){return e.shortageError=i instanceof Error?i.message:String(i),!1}}async function jb(e){try{const t=await fetch(Qe(e.basePath,"/api/shortage/stats"),{method:"GET"}),n=await t.json().catch(()=>({}));if(t.ok&&n.success&&n.data)e.overviewShortageStats=n.data,e.overviewShortageError=null;else{e.overviewShortageStats=null;const i=typeof n.detail=="string"?n.detail:n.message??n.error??`shortage stats: ${t.status}`;e.overviewShortageError=i}}catch(t){e.overviewShortageStats=null,e.overviewShortageError=t instanceof Error?t.message:String(t)}}async function Kb(e){if(!(!e.client||!e.connected)&&!e.presenceLoading){e.presenceLoading=!0,e.presenceError=null,e.presenceStatus=null;try{const t=await e.client.request("system-presence",{});Array.isArray(t)?(e.presenceEntries=t,e.presenceStatus=t.length===0?"No instances yet.":null):(e.presenceEntries=[],e.presenceStatus="No presence payload.")}catch(t){e.presenceError=String(t)}finally{e.presenceLoading=!1}}}async function wl(e,t){if(!(!e.client||!e.connected)&&!e.sessionsLoading){e.sessionsLoading=!0,e.sessionsError=null;try{const n=(t==null?void 0:t.includeGlobal)??e.sessionsIncludeGlobal,i=(t==null?void 0:t.includeUnknown)??e.sessionsIncludeUnknown,s=(t==null?void 0:t.activeMinutes)??Nc(e.sessionsFilterActive,0),o=(t==null?void 0:t.limit)??Nc(e.sessionsFilterLimit,0),r={includeGlobal:n,includeUnknown:i};s>0&&(r.activeMinutes=s),o>0&&(r.limit=o);const a=await e.client.request("sessions.list",r);a&&(e.sessionsResult=a)}catch(n){e.sessionsError=String(n)}finally{e.sessionsLoading=!1}}}function ei(e,t,n){if(!t.trim())return;const i={...e.skillMessages};n?i[t]=n:delete i[t],e.skillMessages=i}function Go(e){return e instanceof Error?e.message:String(e)}async function bs(e,t){if(t!=null&&t.clearMessages&&Object.keys(e.skillMessages).length>0&&(e.skillMessages={}),!(!e.client||!e.connected)&&!e.skillsLoading){e.skillsLoading=!0,e.skillsError=null;try{const n=await e.client.request("skills.status",{});n&&(e.skillsReport=n)}catch(n){e.skillsError=Go(n)}finally{e.skillsLoading=!1}}}function Wb(e,t,n){e.skillEdits={...e.skillEdits,[t]:n}}async function Vb(e,t,n){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{await e.client.request("skills.update",{skillKey:t,enabled:n}),await bs(e),ei(e,t,{kind:"success",message:n?"Skill enabled":"Skill disabled"})}catch(i){const s=Go(i);e.skillsError=s,ei(e,t,{kind:"error",message:s})}finally{e.skillsBusyKey=null}}}async function Gb(e,t){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const n=e.skillEdits[t]??"";await e.client.request("skills.update",{skillKey:t,apiKey:n}),await bs(e),ei(e,t,{kind:"success",message:"API key saved"})}catch(n){const i=Go(n);e.skillsError=i,ei(e,t,{kind:"error",message:i})}finally{e.skillsBusyKey=null}}}async function Qb(e,t,n,i){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const s=await e.client.request("skills.install",{name:n,installId:i,timeoutMs:12e4});await bs(e),ei(e,t,{kind:"success",message:(s==null?void 0:s.message)??"Installed"})}catch(s){const o=Go(s);e.skillsError=o,ei(e,t,{kind:"error",message:o})}finally{e.skillsBusyKey=null}}}function Ee(e,t,n){const i=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",s=i?`${i}${t}`:t;if(!n||Object.keys(n).length===0)return s;const o=new URLSearchParams;for(const[r,a]of Object.entries(n))o.set(r,String(a));return`${s}?${o.toString()}`}function On(e){return{"X-Admin-Token":e,"Content-Type":"application/json"}}function q(e,t){e.adminData={...e.adminData,...t}}function Yb(){let e=null;return typeof sessionStorage<"u"&&(e=sessionStorage.getItem("admin_token")),{token:e,loginError:null,loginLoading:!1,activeSubTab:"price",priceItems:[],priceTotal:0,pricePage:1,pricePageSize:100,priceQuery:"",priceLoading:!1,priceError:null,priceUploading:!1,mappingItems:[],mappingTotal:0,mappingPage:1,mappingPageSize:100,mappingQuery:"",mappingLoading:!1,mappingError:null,mappingUploading:!1,libraries:[],librariesLoading:!1,librariesError:null,libraryUploading:!1,libraryUploadWarnings:[],activeLibraryId:null,libraryData:[],libraryDataTotal:0,libraryDataPage:1,libraryDataQuery:"",libraryDataLoading:!1,libraryDataError:null}}async function Xb(e,t){q(e,{loginLoading:!0,loginError:null});try{const n=await fetch(Ee(e.basePath,"/api/admin/login"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:t})}),i=await n.json().catch(()=>({}));if(n.status===503){q(e,{loginError:"管理功能未启用（服务端未配置 ADMIN_PASSWORD）",loginLoading:!1});return}if(!n.ok){const s=i.detail,o=typeof s=="string"?s:Array.isArray(s)&&s[0]&&typeof s[0].msg=="string"?s[0].msg:"登录失败";q(e,{loginError:o,loginLoading:!1});return}i.token?(sessionStorage.setItem("admin_token",i.token),q(e,{token:i.token,loginLoading:!1,loginError:null})):q(e,{loginError:"未返回 token",loginLoading:!1})}catch(n){q(e,{loginError:String(n),loginLoading:!1})}}function je(e){sessionStorage.removeItem("admin_token"),q(e,{token:null})}async function wn(e){const t=e.adminData.token;if(t){q(e,{priceLoading:!0,priceError:null});try{const n={q:e.adminData.priceQuery,page:e.adminData.pricePage,page_size:e.adminData.pricePageSize},i=await fetch(Ee(e.basePath,"/api/admin/price-library",n),{headers:On(t)});if(i.status===401){je(e);return}if(i.status===503){q(e,{priceLoading:!1,priceError:"管理功能未启用（服务端未配置 ADMIN_PASSWORD）"});return}if(!i.ok){const o=await i.text();q(e,{priceLoading:!1,priceError:o||`HTTP ${i.status}`});return}const s=await i.json();q(e,{priceItems:s.items,priceTotal:s.total,priceLoading:!1})}catch(n){q(e,{priceLoading:!1,priceError:String(n)})}}}function Jb(e,t,n){const i=e.adminData.priceItems.slice();t<0||t>=i.length||(i[t]={...i[t],...n},q(e,{priceItems:i}))}function Zb(e){q(e,{priceItems:[...e.adminData.priceItems,{material:"",description:"",price_a:null,price_b:null,price_c:null,price_d:null}]})}async function ey(e,t){const n=e.adminData.token;if(n)try{const i=t.id==null,s=i?Ee(e.basePath,"/api/admin/price-library"):Ee(e.basePath,`/api/admin/price-library/${t.id}`),o=await fetch(s,{method:i?"POST":"PUT",headers:On(n),body:JSON.stringify({material:t.material,description:t.description,price_a:t.price_a,price_b:t.price_b,price_c:t.price_c,price_d:t.price_d})});if(o.status===401){je(e);return}if(!o.ok){q(e,{priceError:await o.text()});return}await wn(e)}catch(i){q(e,{priceError:String(i)})}}async function ty(e,t){const n=e.adminData.token;if(n)try{const i=await fetch(Ee(e.basePath,`/api/admin/price-library/${t}`),{method:"DELETE",headers:{"X-Admin-Token":n}});if(i.status===401){je(e);return}if(!i.ok){q(e,{priceError:await i.text()||`HTTP ${i.status}`});return}await wn(e)}catch(i){q(e,{priceError:String(i)})}}async function ny(e,t){const n=e.adminData.token;if(n){q(e,{priceUploading:!0,priceError:null});try{const i=new FormData;i.append("file",t);const s=await fetch(Ee(e.basePath,"/api/admin/price-library/upload"),{method:"POST",headers:{"X-Admin-Token":n},body:i});if(s.status===401){je(e);return}if(!s.ok){q(e,{priceError:await s.text(),priceUploading:!1});return}await wn(e),q(e,{priceUploading:!1})}catch(i){q(e,{priceError:String(i),priceUploading:!1})}}}async function _n(e){const t=e.adminData.token;if(t){q(e,{mappingLoading:!0,mappingError:null});try{const n={q:e.adminData.mappingQuery,page:e.adminData.mappingPage,page_size:e.adminData.mappingPageSize},i=await fetch(Ee(e.basePath,"/api/admin/product-mapping",n),{headers:On(t)});if(i.status===401){je(e);return}if(i.status===503){q(e,{mappingLoading:!1,mappingError:"管理功能未启用（服务端未配置 ADMIN_PASSWORD）"});return}if(!i.ok){q(e,{mappingLoading:!1,mappingError:await i.text()});return}const s=await i.json();q(e,{mappingItems:s.items,mappingTotal:s.total,mappingLoading:!1})}catch(n){q(e,{mappingLoading:!1,mappingError:String(n)})}}}function iy(e,t,n){const i=e.adminData.mappingItems.slice();t<0||t>=i.length||(i[t]={...i[t],...n},q(e,{mappingItems:i}))}function sy(e){q(e,{mappingItems:[...e.adminData.mappingItems,{inquiry_name:"",spec:"",product_code:"",quotation_name:""}]})}async function oy(e,t){const n=e.adminData.token;if(n)try{const i=t.id==null,s=i?Ee(e.basePath,"/api/admin/product-mapping"):Ee(e.basePath,`/api/admin/product-mapping/${t.id}`),o=await fetch(s,{method:i?"POST":"PUT",headers:On(n),body:JSON.stringify({inquiry_name:t.inquiry_name,spec:t.spec,product_code:t.product_code,quotation_name:t.quotation_name})});if(o.status===401){je(e);return}if(!o.ok){q(e,{mappingError:await o.text()});return}await _n(e)}catch(i){q(e,{mappingError:String(i)})}}async function ry(e,t){const n=e.adminData.token;if(n)try{const i=await fetch(Ee(e.basePath,`/api/admin/product-mapping/${t}`),{method:"DELETE",headers:{"X-Admin-Token":n}});if(i.status===401){je(e);return}if(!i.ok){q(e,{mappingError:await i.text()||`HTTP ${i.status}`});return}await _n(e)}catch(i){q(e,{mappingError:String(i)})}}async function ay(e,t){const n=e.adminData.token;if(n){q(e,{mappingUploading:!0,mappingError:null});try{const i=new FormData;i.append("file",t);const s=await fetch(Ee(e.basePath,"/api/admin/product-mapping/upload"),{method:"POST",headers:{"X-Admin-Token":n},body:i});if(s.status===401){je(e);return}if(!s.ok){q(e,{mappingError:await s.text(),mappingUploading:!1});return}await _n(e),q(e,{mappingUploading:!1})}catch(i){q(e,{mappingError:String(i),mappingUploading:!1})}}}async function _l(e){const t=e.adminData.token;if(t){q(e,{librariesLoading:!0,librariesError:null});try{const n=await fetch(Ee(e.basePath,"/api/admin/libraries"),{headers:On(t)});if(n.status===401){je(e);return}if(!n.ok){q(e,{librariesLoading:!1,librariesError:await n.text()});return}const i=await n.json();q(e,{libraries:i.items,librariesLoading:!1})}catch(n){q(e,{librariesLoading:!1,librariesError:String(n)})}}}async function ly(e,t,n){const i=e.adminData.token;if(i){q(e,{libraryUploading:!0,librariesError:null,libraryUploadWarnings:[]});try{const s=new FormData;s.append("file",t),s.append("name",n);const o=await fetch(Ee(e.basePath,"/api/admin/libraries/upload"),{method:"POST",headers:{"X-Admin-Token":i},body:s});if(o.status===401){je(e);return}if(!o.ok){q(e,{librariesError:await o.text(),libraryUploading:!1});return}const r=await o.json();q(e,{libraryUploading:!1,libraryUploadWarnings:r.warnings??[]}),await _l(e)}catch(s){q(e,{librariesError:String(s),libraryUploading:!1})}}}async function Hi(e,t){const n=e.adminData.token;if(n){q(e,{activeLibraryId:t,libraryDataLoading:!0,libraryDataError:null});try{const i={q:e.adminData.libraryDataQuery,page:e.adminData.libraryDataPage,page_size:100},s=await fetch(Ee(e.basePath,`/api/admin/libraries/${t}/data`,i),{headers:On(n)});if(s.status===401){je(e);return}if(!s.ok){q(e,{libraryDataLoading:!1,libraryDataError:await s.text()});return}const o=await s.json();q(e,{libraryData:o.items,libraryDataTotal:o.total,libraryDataLoading:!1})}catch(i){q(e,{libraryDataLoading:!1,libraryDataError:String(i)})}}}function cy(e,t,n,i){const s=e.adminData.libraryData.slice();t<0||t>=s.length||(s[t]={...s[t],[n]:i},q(e,{libraryData:s}))}function dy(e,t){const n=e.adminData.libraries.find(s=>s.id===t);if(!n)return;const i={};for(const s of n.columns)i[s.name]=s.type==="NUMERIC"?null:"";q(e,{libraryData:[...e.adminData.libraryData,i]})}async function uy(e,t,n){const i=e.adminData.token;if(i)try{const s=e.adminData.libraries.find(c=>c.id===t);if(!s)return;const o=n.id==null,r={};for(const c of s.columns)r[c.name]=n[c.name]??(c.type==="NUMERIC"?null:"");const a=o?Ee(e.basePath,`/api/admin/libraries/${t}/data`):Ee(e.basePath,`/api/admin/libraries/${t}/data/${n.id}`),l=await fetch(a,{method:o?"POST":"PUT",headers:On(i),body:JSON.stringify(r)});if(l.status===401){je(e);return}if(!l.ok){q(e,{libraryDataError:await l.text()});return}await Hi(e,t)}catch(s){q(e,{libraryDataError:String(s)})}}async function hy(e,t,n){const i=e.adminData.token;if(i)try{const s=await fetch(Ee(e.basePath,`/api/admin/libraries/${t}/data/${n}`),{method:"DELETE",headers:{"X-Admin-Token":i}});if(s.status===401){je(e);return}if(!s.ok){q(e,{libraryDataError:await s.text()||`HTTP ${s.status}`});return}await Hi(e,t)}catch(s){q(e,{libraryDataError:String(s)})}}async function fy(e,t){const n=e.adminData.token;if(n)try{const i=await fetch(Ee(e.basePath,`/api/admin/libraries/${t}`),{method:"DELETE",headers:{"X-Admin-Token":n}});if(i.status===401){je(e);return}if(!i.ok){q(e,{librariesError:await i.text()||`HTTP ${i.status}`});return}q(e,{activeLibraryId:null,libraryData:[]}),await _l(e)}catch(i){q(e,{librariesError:String(i)})}}function ti(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}function ni(e){return{"Content-Type":"application/json","x-reports-token":e}}async function ii(e){const t=await e.json().catch(()=>({}));if(!e.ok||!t.success){const n=t.detail;throw Array.isArray(n)?new Error(n.map(i=>JSON.stringify(i)).join("; ")):typeof n=="object"&&n!==null?new Error(JSON.stringify(n)):new Error(typeof n=="string"&&n||`HTTP ${e.status}`)}return t.data}async function Qo(e){e.reportsLoading=!0,e.reportsError=null;try{const[t,n]=await Promise.all([fetch(ti(e.basePath,"/api/reports/tasks"),{headers:ni(e.reportsAdminToken)}),fetch(ti(e.basePath,"/api/reports/records?limit=20"),{headers:ni(e.reportsAdminToken)})]);e.reportsTasks=await ii(t),e.reportsRecords=await ii(n)}catch(t){e.reportsError=t instanceof Error?t.message:String(t)}finally{e.reportsLoading=!1}}async function py(e,t){e.reportsError=null;try{const n=await fetch(ti(e.basePath,`/api/reports/tasks/${t}/run`),{method:"POST",headers:ni(e.reportsAdminToken)});await ii(n),await Qo(e)}catch(n){e.reportsError=n instanceof Error?n.message:String(n)}}async function gy(e,t,n){e.reportsError=null;try{const i=await fetch(ti(e.basePath,`/api/reports/tasks/${t}`),{method:"PATCH",headers:ni(e.reportsAdminToken),body:JSON.stringify(n)});await ii(i),await Qo(e)}catch(i){e.reportsError=i instanceof Error?i.message:String(i)}}async function kl(e,t,n){const i=(n==null?void 0:n.soft)===!0;i||(e.selectedRecordId=t,e.reportDetailLoading=!0,e.reportsError=null);const s=t;try{const o=await fetch(ti(e.basePath,`/api/reports/records/${t}`),{headers:ni(e.reportsAdminToken)}),r=await ii(o);if(e.selectedRecordId===s){e.reportDetail=r;const a=r==null?void 0:r.analysis_status;i||(a==="running"||a==="pending"?of(e,t):Yn())}}catch(o){i||(e.reportsError=o instanceof Error?o.message:String(o)),e.selectedRecordId===s&&!i&&(e.reportDetail=null)}finally{!i&&e.selectedRecordId===s&&(e.reportDetailLoading=!1)}}let ro=null,ao=!1,ya=0;const my=80;function Yn(){ro!==null&&(window.clearInterval(ro),ro=null),ao=!1,ya=0}function of(e,t){Yn(),ro=window.setInterval(async()=>{var n,i;if(e.selectedRecordId!==t){Yn();return}if(!ao){if(ya+=1,ya>my){Yn();const s=(n=e.reportDetail)==null?void 0:n.analysis_status;(s==="running"||s==="pending")&&e.reportsError==null&&(e.reportsError="智能分析等待超时。请检查服务端日志与 ANTHROPIC_API_KEY，或稍后点击「重新分析」。");return}ao=!0;try{await kl(e,t,{soft:!0});const s=(i=e.reportDetail)==null?void 0:i.analysis_status;(s==="done"||s==="failed")&&Yn()}finally{ao=!1}}},3e3)}async function by(e,t){e.reportsError=null;try{const n=await fetch(ti(e.basePath,`/api/reports/records/${t}/reanalyze`),{method:"POST",headers:ni(e.reportsAdminToken)});await ii(n),await kl(e,t),of(e,t)}catch(n){e.reportsError=n instanceof Error?n.message:String(n)}}const yy=[{label:"chat",tabs:["chat"]},{label:"control",tabs:["overview","channels","instances","sessions","work","cron"]},{label:"agent",tabs:["agents","skills","nodes","reports"]},{label:"settings",tabs:["config","debug","logs","admin-data"]}],rf={agents:"/agents",overview:"/overview",channels:"/channels",instances:"/instances",sessions:"/sessions",work:"/work",cron:"/cron",skills:"/skills",nodes:"/nodes",reports:"/reports",chat:"/chat",config:"/config",debug:"/debug",logs:"/logs","admin-data":"/admin-data"},af=new Map(Object.entries(rf).map(([e,t])=>[t,e]));function ui(e){if(!e)return"";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t==="/"?"":(t.endsWith("/")&&(t=t.slice(0,-1)),t)}function is(e){if(!e)return"/";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t.length>1&&t.endsWith("/")&&(t=t.slice(0,-1)),t}function lf(e,t=""){const n=ui(t),i=rf[e];return n?`${n}${i}`:i}function cf(e,t=""){const n=ui(t);let i=e||"/";n&&(i===n?i="/":i.startsWith(`${n}/`)&&(i=i.slice(n.length)));let s=is(i).toLowerCase();return s.endsWith("/index.html")&&(s="/"),s==="/"?"chat":af.get(s)??null}function vy(e){let t=is(e);if(t.endsWith("/index.html")&&(t=is(t.slice(0,-11))),t==="/")return"";const n=t.split("/").filter(Boolean);if(n.length===0)return"";for(let i=0;i<n.length;i++){const s=`/${n.slice(i).join("/")}`.toLowerCase();if(af.has(s)){const o=n.slice(0,i);return o.length?`/${o.join("/")}`:""}}return`/${n.join("/")}`}function xy(e){switch(e){case"agents":return"folder";case"chat":return"messageSquare";case"overview":return"barChart";case"channels":return"fileText";case"instances":return"radio";case"sessions":return"fileText";case"work":return"fileText";case"cron":return"loader";case"skills":return"zap";case"nodes":return"monitor";case"reports":return"barChart";case"config":return"settings";case"debug":return"bug";case"logs":return"scrollText";case"admin-data":return"database";default:return"folder"}}function va(e){return g(`tabs.${e}`)}function wy(e){return g(`subtitles.${e}`)}const df="openclaw.control.settings.v1";function _y(){const t={gatewayUrl:`${location.protocol==="https:"?"wss":"ws"}://${location.host}/ws`,token:"",sessionKey:"main",lastActiveSessionKey:"main",theme:"system",chatFocusMode:!1,chatShowThinking:!0,splitRatio:.6,navCollapsed:!1,navGroupsCollapsed:{}};try{const n=localStorage.getItem(df);if(!n)return t;const i=JSON.parse(n);return{gatewayUrl:typeof i.gatewayUrl=="string"&&i.gatewayUrl.trim()?i.gatewayUrl.trim():t.gatewayUrl,token:typeof i.token=="string"?i.token:t.token,sessionKey:typeof i.sessionKey=="string"&&i.sessionKey.trim()?i.sessionKey.trim():t.sessionKey,lastActiveSessionKey:typeof i.lastActiveSessionKey=="string"&&i.lastActiveSessionKey.trim()?i.lastActiveSessionKey.trim():typeof i.sessionKey=="string"&&i.sessionKey.trim()||t.lastActiveSessionKey,theme:i.theme==="light"||i.theme==="dark"||i.theme==="system"?i.theme:t.theme,chatFocusMode:typeof i.chatFocusMode=="boolean"?i.chatFocusMode:t.chatFocusMode,chatShowThinking:typeof i.chatShowThinking=="boolean"?i.chatShowThinking:t.chatShowThinking,splitRatio:typeof i.splitRatio=="number"&&i.splitRatio>=.4&&i.splitRatio<=.7?i.splitRatio:t.splitRatio,navCollapsed:typeof i.navCollapsed=="boolean"?i.navCollapsed:t.navCollapsed,navGroupsCollapsed:typeof i.navGroupsCollapsed=="object"&&i.navGroupsCollapsed!==null?i.navGroupsCollapsed:t.navGroupsCollapsed,locale:nl(i.locale)?i.locale:void 0}}catch{return t}}function ky(e){localStorage.setItem(df,JSON.stringify(e))}const Is=e=>Number.isNaN(e)?.5:e<=0?0:e>=1?1:e,Sy=()=>typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches??!1,Os=e=>{e.classList.remove("theme-transition"),e.style.removeProperty("--theme-switch-x"),e.style.removeProperty("--theme-switch-y")},$y=({nextTheme:e,applyTheme:t,context:n,currentTheme:i})=>{var c;if(i===e)return;const s=globalThis.document??null;if(!s){t();return}const o=s.documentElement,r=s,a=Sy();if(!!r.startViewTransition&&!a){let d=.5,u=.5;if((n==null?void 0:n.pointerClientX)!==void 0&&(n==null?void 0:n.pointerClientY)!==void 0&&typeof window<"u")d=Is(n.pointerClientX/window.innerWidth),u=Is(n.pointerClientY/window.innerHeight);else if(n!=null&&n.element){const h=n.element.getBoundingClientRect();h.width>0&&h.height>0&&typeof window<"u"&&(d=Is((h.left+h.width/2)/window.innerWidth),u=Is((h.top+h.height/2)/window.innerHeight))}o.style.setProperty("--theme-switch-x",`${d*100}%`),o.style.setProperty("--theme-switch-y",`${u*100}%`),o.classList.add("theme-transition");try{const h=(c=r.startViewTransition)==null?void 0:c.call(r,()=>{t()});h!=null&&h.finished?h.finished.finally(()=>Os(o)):Os(o)}catch{Os(o),t()}return}t(),Os(o)};function Ay(){return typeof window>"u"||typeof window.matchMedia!="function"||window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function Sl(e){return e==="system"?Ay():e}function Yt(e,t){var i;const n={...t,lastActiveSessionKey:((i=t.lastActiveSessionKey)==null?void 0:i.trim())||t.sessionKey.trim()||"main"};e.settings=n,ky(n),t.theme!==e.theme&&(e.theme=t.theme,Yo(e,Sl(t.theme))),e.applySessionKey=e.settings.lastActiveSessionKey}function uf(e,t){const n=t.trim();n&&e.settings.lastActiveSessionKey!==n&&Yt(e,{...e.settings,lastActiveSessionKey:n})}function Ty(e){if(!window.location.search&&!window.location.hash)return;const t=new URL(window.location.href),n=new URLSearchParams(t.search),i=new URLSearchParams(t.hash.startsWith("#")?t.hash.slice(1):t.hash),s=n.get("token")??i.get("token"),o=n.get("password")??i.get("password"),r=n.get("session")??i.get("session"),a=n.get("gatewayUrl")??i.get("gatewayUrl");let l=!1;if(s!=null){const d=s.trim();d&&d!==e.settings.token&&Yt(e,{...e.settings,token:d}),n.delete("token"),i.delete("token"),l=!0}if(o!=null&&(n.delete("password"),i.delete("password"),l=!0),r!=null){const d=r.trim();d&&(e.sessionKey=d,Yt(e,{...e.settings,sessionKey:d,lastActiveSessionKey:d}))}if(a!=null){const d=a.trim();d&&d!==e.settings.gatewayUrl&&(e.pendingGatewayUrl=d),n.delete("gatewayUrl"),i.delete("gatewayUrl"),l=!0}if(!l)return;t.search=n.toString();const c=i.toString();t.hash=c?`#${c}`:"",window.history.replaceState({},"",t.toString())}function Cy(e,t){e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?ol(e):rl(e),t==="debug"?al(e):ll(e),_o(e),ff(e,t,!1)}function Ey(e,t,n){$y({nextTheme:t,applyTheme:()=>{e.theme=t,Yt(e,{...e.settings,theme:t}),Yo(e,Sl(t))},context:n,currentTheme:e.theme})}async function _o(e){var t,n,i,s,o,r;if(e.tab==="overview"&&(await pf(e),await Promise.all([Hb(e),jb(e)])),e.tab==="channels"&&await Ih(e),e.tab==="instances"){const a=e;await Wo(a),await Vo(a)}if(e.tab==="sessions"&&(await fl(e),await ms(e)),e.tab==="cron"&&await hl(e),e.tab==="skills"&&await bs(e),e.tab==="reports"&&await Qo(e),e.tab==="agents"){await cl(e),Lh(e),await It(e);const a=((n=(t=e.agentsList)==null?void 0:t.agents)==null?void 0:n.map(c=>c.id))??[];a.length>0&&Dh(e,a);const l=e.agentsSelectedId??((i=e.agentsList)==null?void 0:i.defaultId)??((r=(o=(s=e.agentsList)==null?void 0:s.agents)==null?void 0:o[0])==null?void 0:r.id);l&&Ph(e,l)}if(e.tab==="nodes"&&(await qo(e),await tn(e),await It(e),await xl(e)),e.tab==="chat"&&(await _f(e),ps(e,!e.chatHasAutoScrolled)),e.tab==="config"&&(await Jg(e),await It(e)),e.tab==="debug"&&(await Uo(e),e.eventLog=e.eventLogBuffer),e.tab==="logs"&&(e.logsAtBottom=!0,await sl(e,{reset:!0}),Mh(e,!0)),e.tab==="admin-data"){const a=e;a.adminData.token&&(await wn(a),await _n(a))}}function Ry(){if(typeof window>"u")return"";const e=window.__OPENCLAW_CONTROL_UI_BASE_PATH__;return typeof e=="string"&&e.trim()?ui(e):vy(window.location.pathname)}function My(e){e.theme=e.settings.theme??"system",Yo(e,Sl(e.theme))}function Yo(e,t){if(e.themeResolved=t,typeof document>"u")return;const n=document.documentElement;n.dataset.theme=t,n.style.colorScheme=t}function Py(e){if(typeof window>"u"||typeof window.matchMedia!="function")return;if(e.themeMedia=window.matchMedia("(prefers-color-scheme: dark)"),e.themeMediaHandler=n=>{e.theme==="system"&&Yo(e,n.matches?"dark":"light")},typeof e.themeMedia.addEventListener=="function"){e.themeMedia.addEventListener("change",e.themeMediaHandler);return}e.themeMedia.addListener(e.themeMediaHandler)}function Dy(e){if(!e.themeMedia||!e.themeMediaHandler)return;if(typeof e.themeMedia.removeEventListener=="function"){e.themeMedia.removeEventListener("change",e.themeMediaHandler);return}e.themeMedia.removeListener(e.themeMediaHandler),e.themeMedia=null,e.themeMediaHandler=null}function Ly(e,t){if(typeof window>"u")return;const n=cf(window.location.pathname,e.basePath)??"chat";hf(e,n),ff(e,n,t)}function Iy(e){var s;if(typeof window>"u")return;const t=cf(window.location.pathname,e.basePath);if(!t)return;const i=(s=new URL(window.location.href).searchParams.get("session"))==null?void 0:s.trim();i&&(e.sessionKey=i,Yt(e,{...e.settings,sessionKey:i,lastActiveSessionKey:i})),hf(e,t)}function hf(e,t){e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?ol(e):rl(e),t==="debug"?al(e):ll(e),e.connected&&_o(e)}function ff(e,t,n){if(typeof window>"u")return;const i=is(lf(t,e.basePath)),s=is(window.location.pathname),o=new URL(window.location.href);t==="chat"&&e.sessionKey?o.searchParams.set("session",e.sessionKey):o.searchParams.delete("session"),s!==i&&(o.pathname=i),n?window.history.replaceState({},"",o.toString()):window.history.pushState({},"",o.toString())}function Oy(e,t,n){if(typeof window>"u")return;const i=new URL(window.location.href);i.searchParams.set("session",t),window.history.replaceState({},"",i.toString())}async function pf(e){await Promise.all([Ot(e,!1),Kb(e),wl(e),Fh(e),Uo(e),Om(e)])}async function gf(e){await Promise.all([Ot(e,!1),Fh(e),Im(e)])}async function Fy(e){await hl(e)}async function Ny(e){await fl(e)}const Qc=50,By=80,zy=12e4,Hy="[已渲染到前端]";function Uy(e){if(!e||typeof e!="object")return null;const t=e;if(typeof t.text=="string")return t.text;const n=t.content;if(!Array.isArray(n))return null;const i=n.map(s=>{if(!s||typeof s!="object")return null;const o=s;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(s=>!!s);return i.length===0?null:i.join(`
`)}function Yc(e){if(e==null)return null;if(typeof e=="number"||typeof e=="boolean")return String(e);const t=Uy(e);let n;if(typeof e=="string")n=e;else if(t)n=t;else try{n=JSON.stringify(e,null,2)}catch{n=String(e)}const i=Oh(n,zy);return i.truncated?`${i.text}

鈥?truncated (${i.total} chars, showing first ${i.text.length}).`:i.text}function qy(e){const t=[];return t.push({type:"toolcall",name:e.name,arguments:e.args??{}}),e.output&&t.push({type:"toolresult",name:e.name,text:e.output}),{role:"assistant",toolCallId:e.toolCallId,runId:e.runId,content:t,timestamp:e.startedAt}}function jy(e){if(e.toolStreamOrder.length<=Qc)return;const t=e.toolStreamOrder.length-Qc,n=e.toolStreamOrder.splice(0,t);for(const i of n)e.toolStreamById.delete(i)}function Ky(e){e.chatToolMessages=e.toolStreamOrder.map(t=>{var n;return(n=e.toolStreamById.get(t))==null?void 0:n.message}).filter(t=>!!t)}function xa(e){e.toolStreamSyncTimer!=null&&(clearTimeout(e.toolStreamSyncTimer),e.toolStreamSyncTimer=null),Ky(e)}function Wy(e,t=!1){if(t){xa(e);return}e.toolStreamSyncTimer==null&&(e.toolStreamSyncTimer=window.setTimeout(()=>xa(e),By))}function Xo(e){e.toolStreamById.clear(),e.toolStreamOrder=[],e.chatToolMessages=[],xa(e)}function Jo(e){e.toolRenderData=null,e.toolRenderSeq=null,e.toolRenderItems=[],e.candidatePreviews=[]}const Vy=5e3;function Gy(e,t){var s;const n=t.data??{},i=typeof n.phase=="string"?n.phase:"";e.compactionClearTimer!=null&&(window.clearTimeout(e.compactionClearTimer),e.compactionClearTimer=null),i==="start"?e.compactionStatus={active:!0,startedAt:Date.now(),completedAt:null}:i==="end"&&(e.compactionStatus={active:!1,startedAt:((s=e.compactionStatus)==null?void 0:s.startedAt)??null,completedAt:Date.now()},e.compactionClearTimer=window.setTimeout(()=>{e.compactionStatus=null,e.compactionClearTimer=null},Vy))}function Mr(e,t){if(!Array.isArray(e.candidatePreviews)||e.candidatePreviews.length===0)return;const n=e.candidatePreviews.findIndex(i=>i.runId===t);n!==-1&&(e.candidatePreviews=[...e.candidatePreviews.slice(0,n),...e.candidatePreviews.slice(n+1)])}function Qy(e,t){const n=t.data??{},i=Array.isArray(n.candidates)?n.candidates:[];if(i.length===0)return;Array.isArray(e.candidatePreviews)||(e.candidatePreviews=[]);const s=e.candidatePreviews.length;e.candidatePreviews=[...e.candidatePreviews,{id:`${t.runId}:candidates:${s}`,runId:t.runId,keywords:typeof n.keywords=="string"?n.keywords:"",candidates:i,match_source:typeof n.match_source=="string"?n.match_source:""}]}function Yy(e,t){const n=t.data??{};if(typeof n.formatted_response!="string"||n.formatted_response.trim().length===0){console.warn("[tool_render] malformed payload:",n);return}const i=n.chosen_index;let s=0;if(typeof i=="number"&&Number.isFinite(i))s=i;else if(typeof i=="string"&&i.trim()){const d=Number(i);s=Number.isFinite(d)?d:0}const o=typeof n.match_source=="string"?n.match_source:"";e.toolRenderData={formatted_response:n.formatted_response,chosen:n.chosen??{},chosen_index:s,match_source:o,selection_reasoning:typeof n.selection_reasoning=="string"?n.selection_reasoning:"",batch_mode:!!n.batch_mode,resolved_items:Array.isArray(n.resolved_items)?n.resolved_items:[],pending_items:Array.isArray(n.pending_items)?n.pending_items:[],unmatched_items:Array.isArray(n.unmatched_items)?n.unmatched_items:[]},e.toolRenderSeq=t.seq,Array.isArray(e.toolRenderItems)||(e.toolRenderItems=[]);const r=`${t.runId}:${t.seq}`,a={id:r,runId:t.runId,seq:t.seq,ts:typeof t.ts=="number"?t.ts:Date.now(),sessionKey:typeof t.sessionKey=="string"?t.sessionKey:void 0,payload:e.toolRenderData},l=e.toolRenderItems.find(d=>d.id===r);if(l){l.payload=a.payload,l.ts=a.ts,l.sessionKey=a.sessionKey,Mr(e,t.runId);return}const c=e.toolRenderItems.find(d=>d.runId===a.runId&&d.payload.formatted_response===a.payload.formatted_response);if(c){c.seq=a.seq,c.ts=a.ts,c.sessionKey=a.sessionKey,c.payload=a.payload,Mr(e,t.runId);return}e.toolRenderItems.push(a),Mr(e,t.runId)}function Xy(e,t){if(!t)return;if(t.stream==="compaction"){Gy(e,t);return}if(t.stream==="tool_candidates"){const u=typeof t.sessionKey=="string"?t.sessionKey:void 0;if(u&&u!==e.sessionKey||!u&&e.chatRunId&&t.runId!==e.chatRunId||e.chatRunId&&t.runId!==e.chatRunId||!e.chatRunId)return;Qy(e,t);return}if(t.stream==="tool_render"){const u=typeof t.sessionKey=="string"?t.sessionKey:void 0;if(u&&u!==e.sessionKey||!u&&e.chatRunId&&t.runId!==e.chatRunId||e.chatRunId&&t.runId!==e.chatRunId||!e.chatRunId)return;Yy(e,t);return}if(t.stream!=="tool")return;const n=typeof t.sessionKey=="string"?t.sessionKey:void 0;if(n&&n!==e.sessionKey||!n&&e.chatRunId&&t.runId!==e.chatRunId||e.chatRunId&&t.runId!==e.chatRunId||!e.chatRunId)return;const i=t.data??{},s=typeof i.toolCallId=="string"?i.toolCallId:"";if(!s)return;const o=typeof i.name=="string"?i.name:"tool",r=typeof i.phase=="string"?i.phase:"",a=r==="start"?i.args:void 0,l=r==="update"?Yc(i.partialResult):r==="result"?Yc(i.result):void 0,c=Date.now();let d=e.toolStreamById.get(s);d?(d.name=o,a!==void 0&&(d.args=a),l!==void 0&&(d.output=l||void 0),d.updatedAt=c):(d={toolCallId:s,runId:t.runId,sessionKey:n,name:o,args:a,output:l||void 0,startedAt:typeof t.ts=="number"?t.ts:c,updatedAt:c,message:{}},e.toolStreamById.set(s,d),e.toolStreamOrder.push(s)),d.message=qy(d),jy(e),Wy(e,r==="result")}function Pr(e){return e==null?"":String(e).trim()}const Dr=new WeakMap,Lr=new WeakMap;function wa(e){const t=e,n=typeof t.role=="string"?t.role:"",i=t.content;if(typeof i=="string")return n==="assistant"?$r(i):Pr(i);if(Array.isArray(i)){const s=i.map(o=>{const r=o;return r.type==="text"&&typeof r.text=="string"?r.text:null}).filter(o=>typeof o=="string");if(s.length>0){const o=s.join(`
`);return n==="assistant"?$r(o):Pr(o)}}return typeof t.text=="string"?n==="assistant"?$r(t.text):Pr(t.text):null}function Ui(e){if(!e||typeof e!="object")return wa(e);const t=e;if(Dr.has(t))return Dr.get(t)??null;const n=wa(e);return Dr.set(t,n),n}function Xc(e){const n=e.content,i=[];if(Array.isArray(n))for(const a of n){const l=a;if(l.type==="thinking"&&typeof l.thinking=="string"){const c=l.thinking.trim();c&&i.push(c)}}if(i.length>0)return i.join(`
`);const s=Zy(e);if(!s)return null;const r=[...s.matchAll(/<\s*think(?:ing)?\s*>([\s\S]*?)<\s*\/\s*think(?:ing)?\s*>/gi)].map(a=>(a[1]??"").trim()).filter(Boolean);return r.length>0?r.join(`
`):null}function Jy(e){if(!e||typeof e!="object")return Xc(e);const t=e;if(Lr.has(t))return Lr.get(t)??null;const n=Xc(e);return Lr.set(t,n),n}function Zy(e){const t=e,n=t.content;if(typeof n=="string")return n;if(Array.isArray(n)){const i=n.map(s=>{const o=s;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(s=>typeof s=="string");if(i.length>0)return i.join(`
`)}return typeof t.text=="string"?t.text:null}function ev(e){const t=e.trim();if(!t)return"";const n=t.split(/\r?\n/).map(i=>i.trim()).filter(Boolean).map(i=>`_${i}_`);return n.length?["_Reasoning:_",...n].join(`
`):""}const mf="【以下为上传图片的识别结果】";function tv(e){return e.includes(mf)}function nv(e){const t=e.indexOf(mf);return t===-1?e:e.slice(0,t).trim()}let Jc=!1;function Zc(e){e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t="";for(let n=0;n<e.length;n++)t+=e[n].toString(16).padStart(2,"0");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}function iv(){const e=new Uint8Array(16),t=Date.now();for(let n=0;n<e.length;n++)e[n]=Math.floor(Math.random()*256);return e[0]^=t&255,e[1]^=t>>>8&255,e[2]^=t>>>16&255,e[3]^=t>>>24&255,e}function sv(){Jc||(Jc=!0,console.warn("[uuid] crypto API missing; falling back to weak randomness"))}function $l(e=globalThis.crypto){if(e&&typeof e.randomUUID=="function")return e.randomUUID();if(e&&typeof e.getRandomValues=="function"){const t=new Uint8Array(16);return e.getRandomValues(t),Zc(t)}return sv(),Zc(iv())}async function si(e){if(!(!e.client||!e.connected)){e.chatLoading=!0,e.lastError=null;try{const t=await e.client.request("chat.history",{sessionKey:e.sessionKey,limit:200}),n=Array.isArray(t.messages)?t.messages:[];(n.length>0||e.chatMessages.length===0)&&(e.chatMessages=n),e.chatThinkingLevel=t.thinkingLevel??null}catch(t){e.lastError=String(t)}finally{e.chatLoading=!1}}}function ov(e){const t=/^data:([^;]+);base64,(.+)$/.exec(e);return t?{mimeType:t[1],content:t[2]}:null}function rv(e){if(!e||typeof e!="object")return null;const t=e;return t.role!=="assistant"||!("content"in t)||!Array.isArray(t.content)?null:t}async function av(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"",i=n?`${n}/api/quotation/upload`:"/api/quotation/upload",s=new FormData;s.append("file",t);try{const o=await fetch(i,{method:"POST",body:s,credentials:"same-origin"});if(!o.ok){const l=await o.text();throw new Error(l||`Upload failed: ${o.status}`)}const r=await o.json(),a=(r==null?void 0:r.data)??r;return!a||typeof a.file_path!="string"?null:{file_id:a.file_id??"",file_path:a.file_path,file_name:a.file_name??t.name,summaryMeta:a.summary_meta}}catch(o){throw console.error("uploadChatFile",o),o}}async function lv(e,t,n,i){if(!e.client||!e.connected)return null;const s=t.trim(),o=n&&n.length>0,r=!!(i!=null&&i.file_name);if(!s&&!o&&!r)return null;const a=Date.now(),l=[];if(s&&l.push({type:"text",text:s}),o)for(const h of n)l.push({type:"image",source:{type:"base64",media_type:h.mimeType,data:h.dataUrl}});i!=null&&i.file_name&&l.push({type:"file",file_name:i.file_name,file_path:i.file_path,summaryMeta:i.summaryMeta}),e.chatMessages=[...e.chatMessages,{role:"user",content:l,timestamp:a}],e.chatSending=!0,e.lastError=null;const c=$l();e.chatRunId=c,e.chatStream="",e.chatStreamStartedAt=a;const d=o?n.map(h=>{const f=ov(h.dataUrl);return f?{type:"image",mimeType:f.mimeType,content:f.content}:null}).filter(h=>h!==null):void 0,u=i&&i.file_path?{file_path:i.file_path,...i.file_id?{file_id:i.file_id}:{}}:void 0;try{return await e.client.request("chat.send",{sessionKey:e.sessionKey,message:s,deliver:!1,idempotencyKey:c,attachments:d,...u?{context:u,file_path:i.file_path}:{}}),e.chatUploadedFile=null,c}catch(h){const f=String(h);return e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,e.lastError=f,e.chatMessages=[...e.chatMessages,{role:"assistant",content:[{type:"text",text:"Error: "+f}],timestamp:Date.now()}],null}finally{e.chatSending=!1}}async function cv(e){if(!e.client||!e.connected)return!1;const t=e.chatRunId;try{return await e.client.request("chat.abort",t?{sessionKey:e.sessionKey,runId:t}:{sessionKey:e.sessionKey}),!0}catch(n){return e.lastError=String(n),!1}}function dv(e,t){if(!t||t.sessionKey!==e.sessionKey)return null;if(t.runId&&e.chatRunId&&t.runId!==e.chatRunId)return t.state==="final"?"foreign_final":null;if(t.state==="delta"){const n=wa(t.message);if(typeof n=="string"){const i=e.chatStream??"";(!i||n.length>=i.length)&&(e.chatStream=n)}}else if(t.state==="final")e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null;else if(t.state==="aborted"){const n=rv(t.message);if(n)e.chatMessages=[...e.chatMessages,n];else{const i=e.chatStream??"";i.trim()&&(e.chatMessages=[...e.chatMessages,{role:"assistant",content:[{type:"text",text:i}],timestamp:Date.now()}])}e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null}else t.state==="error"&&(e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null,e.lastError=t.errorMessage??"chat error");return t.state}const bf=120;function yf(e){return e.chatSending||!!e.chatRunId}function uv(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/stop"?!0:n==="stop"||n==="esc"||n==="abort"||n==="wait"||n==="exit"}function hv(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/new"||n==="/reset"?!0:n.startsWith("/new ")||n.startsWith("/reset ")}async function vf(e){e.connected&&(e.chatMessage="",await cv(e))}function fv(e,t,n,i){const s=t.trim(),o=!!(n&&n.length>0);!s&&!o||(e.chatQueue=[...e.chatQueue,{id:$l(),text:s,createdAt:Date.now(),attachments:o?n==null?void 0:n.map(r=>({...r})):void 0,refreshSessions:i}])}async function xf(e,t,n){var o,r;Xo(e),Jo(e),e.ocrResultCards=[];const i=await lv(e,t,n==null?void 0:n.attachments,e.chatUploadedFile??void 0),s=!!i;return!s&&(n==null?void 0:n.previousDraft)!=null&&(e.chatMessage=n.previousDraft),!s&&(n!=null&&n.previousAttachments)&&(e.chatAttachments=n.previousAttachments),s&&uf(e,e.sessionKey),s&&(n!=null&&n.restoreDraft)&&((o=n.previousDraft)!=null&&o.trim())&&(e.chatMessage=n.previousDraft),s&&(n!=null&&n.restoreAttachments)&&((r=n.previousAttachments)!=null&&r.length)&&(e.chatAttachments=n.previousAttachments),ps(e),s&&!e.chatRunId&&wf(e),s&&(n!=null&&n.refreshSessions)&&i&&e.refreshSessionsAfterChat.add(i),s}async function wf(e){if(!e.connected||yf(e))return;const[t,...n]=e.chatQueue;if(!t)return;e.chatQueue=n,await xf(e,t.text,{attachments:t.attachments,refreshSessions:t.refreshSessions})||(e.chatQueue=[t,...e.chatQueue])}function pv(e,t){e.chatQueue=e.chatQueue.filter(n=>n.id!==t)}async function gv(e,t,n){var d;if(!e.connected)return;const i=e.chatMessage,s=(t??e.chatMessage).trim(),o=e.chatAttachments??[],r=t==null?o:[],a=r.length>0,l=!!((d=e.chatUploadedFile)!=null&&d.file_name);if(!s&&!a&&!l)return;if(uv(s)){await vf(e);return}const c=hv(s);if(t==null&&(e.chatMessage="",e.chatAttachments=[]),yf(e)){fv(e,s,r,c);return}await xf(e,s,{previousDraft:t==null?i:void 0,restoreDraft:!!(t&&(n!=null&&n.restoreDraft)),attachments:a?r:void 0,previousAttachments:t==null?o:void 0,restoreAttachments:!!(t&&(n!=null&&n.restoreDraft)),refreshSessions:c})}async function _f(e,t){await Promise.all([si(e),wl(e,{activeMinutes:bf}),_a(e)]),(t==null?void 0:t.scheduleScroll)!==!1&&ps(e)}const mv=wf;function bv(e){var s,o,r;const t=Rh(e.sessionKey);if(t!=null&&t.agentId)return t.agentId;const n=(s=e.hello)==null?void 0:s.snapshot;return((r=(o=n==null?void 0:n.sessionDefaults)==null?void 0:o.defaultAgentId)==null?void 0:r.trim())||"main"}function yv(e,t){const n=ui(e),i=encodeURIComponent(t);return n?`${n}/avatar/${i}?meta=1`:`/avatar/${i}?meta=1`}async function _a(e){if(!e.connected){e.chatAvatarUrl=null;return}const t=bv(e);if(!t){e.chatAvatarUrl=null;return}e.chatAvatarUrl=null;const n=yv(e.basePath,t);try{const i=await fetch(n,{method:"GET"});if(!i.ok){e.chatAvatarUrl=null;return}const s=await i.json(),o=typeof s.avatarUrl=="string"?s.avatarUrl.trim():"";e.chatAvatarUrl=o||null}catch{e.chatAvatarUrl=null}}const vv={trace:!0,debug:!0,info:!0,warn:!0,error:!0,fatal:!0},xv={name:"",description:"",agentId:"",enabled:!0,scheduleKind:"every",scheduleAt:"",everyAmount:"30",everyUnit:"minutes",cronExpr:"0 7 * * *",cronTz:"",sessionTarget:"isolated",wakeMode:"now",payloadKind:"agentTurn",payloadText:"",deliveryMode:"announce",deliveryChannel:"last",deliveryTo:"",timeoutSeconds:""},wv=50,_v=200,kv="PT Vansting Agent";function ed(e,t){if(typeof e!="string")return;const n=e.trim();if(n)return n.length<=t?n:n.slice(0,t)}function Al(e){const t=ed(e==null?void 0:e.name,wv)??kv,n=ed((e==null?void 0:e.avatar)??void 0,_v)??null;return{agentId:typeof(e==null?void 0:e.agentId)=="string"&&e.agentId.trim()?e.agentId.trim():null,name:t,avatar:n}}async function kf(e,t){if(!e.client||!e.connected)return;const n=e.sessionKey.trim(),i=n?{sessionKey:n}:{};try{const s=await e.client.request("agent.identity.get",i);if(!s)return;const o=Al(s);e.assistantName=o.name,e.assistantAvatar=o.avatar,e.assistantAgentId=o.agentId??null}catch{}}function ka(e){return typeof e=="object"&&e!==null}function Sv(e){if(!ka(e))return null;const t=typeof e.id=="string"?e.id.trim():"",n=e.request;if(!t||!ka(n))return null;const i=typeof n.command=="string"?n.command.trim():"";if(!i)return null;const s=typeof e.createdAtMs=="number"?e.createdAtMs:0,o=typeof e.expiresAtMs=="number"?e.expiresAtMs:0;return!s||!o?null:{id:t,request:{command:i,cwd:typeof n.cwd=="string"?n.cwd:null,host:typeof n.host=="string"?n.host:null,security:typeof n.security=="string"?n.security:null,ask:typeof n.ask=="string"?n.ask:null,agentId:typeof n.agentId=="string"?n.agentId:null,resolvedPath:typeof n.resolvedPath=="string"?n.resolvedPath:null,sessionKey:typeof n.sessionKey=="string"?n.sessionKey:null},createdAtMs:s,expiresAtMs:o}}function $v(e){if(!ka(e))return null;const t=typeof e.id=="string"?e.id.trim():"";return t?{id:t,decision:typeof e.decision=="string"?e.decision:null,resolvedBy:typeof e.resolvedBy=="string"?e.resolvedBy:null,ts:typeof e.ts=="number"?e.ts:null}:null}function Sf(e){const t=Date.now();return e.filter(n=>n.expiresAtMs>t)}function Av(e,t){const n=Sf(e).filter(i=>i.id!==t.id);return n.push(t),n}function td(e,t){return Sf(e).filter(n=>n.id!==t)}function Tv(e){return{}}const nd={WEBCHAT:"webchat"},id={CONTROL_UI:"control-ui"},Cv=4008;class Ev{constructor(t){this.opts=t,this.ws=null,this.pending=new Map,this.closed=!1,this.lastSeq=null,this.connectNonce=null,this.connectSent=!1,this.connectTimer=null,this.backoffMs=800}start(){this.closed=!1,this.connect()}stop(){var t;this.closed=!0,(t=this.ws)==null||t.close(),this.ws=null,this.flushPending(new Error("gateway client stopped"))}get connected(){var t;return((t=this.ws)==null?void 0:t.readyState)===WebSocket.OPEN}connect(){this.closed||(this.ws=new WebSocket(this.opts.url),this.ws.addEventListener("open",()=>this.queueConnect()),this.ws.addEventListener("message",t=>this.handleMessage(String(t.data??""))),this.ws.addEventListener("close",t=>{var i,s;const n=String(t.reason??"");this.ws=null,this.flushPending(new Error(`gateway closed (${t.code}): ${n}`)),(s=(i=this.opts).onClose)==null||s.call(i,{code:t.code,reason:n}),this.scheduleReconnect()}),this.ws.addEventListener("error",()=>{}))}scheduleReconnect(){if(this.closed)return;const t=this.backoffMs;this.backoffMs=Math.min(this.backoffMs*1.7,15e3),window.setTimeout(()=>this.connect(),t)}flushPending(t){for(const[,n]of this.pending)n.reject(t);this.pending.clear()}async sendConnect(){var d;if(this.connectSent)return;this.connectSent=!0,this.connectTimer!==null&&(window.clearTimeout(this.connectTimer),this.connectTimer=null);const t=typeof crypto<"u"&&!!crypto.subtle,n=["operator.admin","operator.approvals","operator.pairing"],i="operator";let s=null,o=!1,r=this.opts.token;if(t){s=await vl();const u=(d=ib({deviceId:s.deviceId,role:i}))==null?void 0:d.token;r=u??this.opts.token,o=!!(u&&this.opts.token)}const a=r||this.opts.password?{token:r,password:this.opts.password}:void 0;let l;if(t&&s){const u=Date.now(),h=this.connectNonce??void 0,f=Tv({deviceId:s.deviceId,clientId:this.opts.clientName??id.CONTROL_UI,clientMode:this.opts.mode??nd.WEBCHAT}),m=await Cb(s.privateKey,f);l={id:s.deviceId,publicKey:s.publicKey,signature:m,signedAt:u,nonce:h}}const c={minProtocol:3,maxProtocol:3,client:{id:this.opts.clientName??id.CONTROL_UI,version:this.opts.clientVersion??"dev",platform:this.opts.platform??navigator.platform??"web",mode:this.opts.mode??nd.WEBCHAT,instanceId:this.opts.instanceId},role:i,scopes:n,device:l,caps:[],auth:a,userAgent:navigator.userAgent,locale:navigator.language};this.request("connect",c).then(u=>{var h,f,m;(h=u==null?void 0:u.auth)!=null&&h.deviceToken&&s&&Uh({deviceId:s.deviceId,role:u.auth.role??i,token:u.auth.deviceToken,scopes:u.auth.scopes??[]}),this.backoffMs=800,(m=(f=this.opts).onHello)==null||m.call(f,u)}).catch(()=>{var u;o&&s&&qh({deviceId:s.deviceId,role:i}),(u=this.ws)==null||u.close(Cv,"connect failed")})}handleMessage(t){var s,o,r,a,l;let n;try{n=JSON.parse(t)}catch{return}const i=n;if(i.type==="event"){const c=n;if(c.event==="connect.challenge"){const u=c.payload,h=u&&typeof u.nonce=="string"?u.nonce:null;h&&(this.connectNonce=h,this.sendConnect());return}const d=typeof c.seq=="number"?c.seq:null;d!==null&&(this.lastSeq!==null&&d>this.lastSeq+1&&((o=(s=this.opts).onGap)==null||o.call(s,{expected:this.lastSeq+1,received:d})),this.lastSeq=d);try{(a=(r=this.opts).onEvent)==null||a.call(r,c)}catch(u){console.error("[gateway] event handler error:",u)}return}if(i.type==="res"){const c=n,d=this.pending.get(c.id);if(!d)return;this.pending.delete(c.id),c.ok?d.resolve(c.payload):d.reject(new Error(((l=c.error)==null?void 0:l.message)??"request failed"));return}}request(t,n){if(!this.ws||this.ws.readyState!==WebSocket.OPEN)return Promise.reject(new Error("gateway not connected"));const i=$l(),s={type:"req",id:i,method:t,params:n},o=new Promise((r,a)=>{this.pending.set(i,{resolve:l=>r(l),reject:a})});return this.ws.send(JSON.stringify(s)),o}queueConnect(){this.connectNonce=null,this.connectSent=!1,this.connectTimer!==null&&window.clearTimeout(this.connectTimer),this.connectTimer=window.setTimeout(()=>{this.sendConnect()},750)}}function Ir(e,t){var a,l,c;const n=(e??"").trim(),i=(a=t.mainSessionKey)==null?void 0:a.trim();if(!i)return n;if(!n)return i;const s=((l=t.mainKey)==null?void 0:l.trim())||"main",o=(c=t.defaultAgentId)==null?void 0:c.trim();return n==="main"||n===s||o&&(n===`agent:${o}:main`||n===`agent:${o}:${s}`)?i:n}function Rv(e,t){if(!(t!=null&&t.mainSessionKey))return;const n=Ir(e.sessionKey,t),i=Ir(e.settings.sessionKey,t),s=Ir(e.settings.lastActiveSessionKey,t),o=n||i||e.sessionKey,r={...e.settings,sessionKey:i||o,lastActiveSessionKey:s||o},a=r.sessionKey!==e.settings.sessionKey||r.lastActiveSessionKey!==e.settings.lastActiveSessionKey;o!==e.sessionKey&&(e.sessionKey=o),a&&Yt(e,r)}function $f(e){e.lastError=null,e.hello=null,e.connected=!1,e.execApprovalQueue=[],e.execApprovalError=null;const t=e.client,n=new Ev({url:e.settings.gatewayUrl,token:e.settings.token.trim()?e.settings.token:void 0,password:e.password.trim()?e.password:void 0,clientName:"openclaw-control-ui",mode:"webchat",onHello:i=>{if(e.client===n){if(e.connected=!0,e.lastError=null,e.hello=i,Dv(e,i),e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,Xo(e),Jo(e),e.ocrResultCards=[],kf(e),cl(e),qo(e,{quiet:!0}),tn(e,{quiet:!0}),e.pendingVisibleRefreshHandler&&typeof document<"u"&&(document.removeEventListener("visibilitychange",e.pendingVisibleRefreshHandler),e.pendingVisibleRefreshHandler=null),typeof document>"u"||document.visibilityState==="visible")_o(e);else if(typeof document<"u"){const s=()=>{document.visibilityState==="visible"&&(document.removeEventListener("visibilitychange",s),e.pendingVisibleRefreshHandler=null,!(e.client!==n||!e.connected)&&_o(e))};e.pendingVisibleRefreshHandler=s,document.addEventListener("visibilitychange",s)}}},onClose:({code:i,reason:s})=>{e.client===n&&(e.connected=!1,i!==1012&&(e.lastError=`disconnected (${i}): ${s||"no reason"}`))},onEvent:i=>{e.client===n&&Mv(e,i)},onGap:({expected:i,received:s})=>{e.client===n&&(e.lastError=`event gap detected (expected seq ${i}, got ${s}); refresh recommended`)}});e.client=n,t==null||t.stop(),n.start()}function Mv(e,t){try{Pv(e,t)}catch(n){console.error("[gateway] handleGatewayEvent error:",t.event,n)}}function Pv(e,t){if(e.eventLogBuffer=[{ts:Date.now(),event:t.event,payload:t.payload},...e.eventLogBuffer].slice(0,250),e.tab==="debug"&&(e.eventLog=e.eventLogBuffer),t.event==="agent"){if(e.onboarding)return;Xy(e,t.payload);return}if(t.event==="chat"){const n=t.payload;n!=null&&n.sessionKey&&uf(e,n.sessionKey);const i=dv(e,n);let s=!1;if(i==="final"||i==="error"||i==="aborted"){Xo(e),Jo(e),mv(e);const o=n==null?void 0:n.runId;o&&e.refreshSessionsAfterChat.has(o)&&(e.refreshSessionsAfterChat.delete(o),i==="final"&&wl(e,{activeMinutes:bf})),i==="final"&&(n!=null&&n.newSessionKey)&&(e.sessionKey=n.newSessionKey,e.chatMessage="",e.chatAttachments=[],e.chatUploadedFile=null,e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.chatQueue=[],e.chatMessages=[],e.lastError=null,e.chatThinkingLevel=null,e.compactionStatus=null,e.compactionClearTimer!=null&&(clearTimeout(e.compactionClearTimer),e.compactionClearTimer=null),e.resetToolStream(),e.resetToolRender(),e.ocrResultCards=[],e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:n.newSessionKey,lastActiveSessionKey:n.newSessionKey}),e.loadAssistantIdentity(),si(e),s=!0)}(i==="final"||i==="foreign_final")&&(s||si(e));return}if(t.event==="presence"){const n=t.payload;n!=null&&n.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence,e.presenceError=null,e.presenceStatus=null);return}if(t.event==="cron"&&e.tab==="cron"&&gf(e),t.event==="ocr_result"){const n=t.payload,i=((n==null?void 0:n.text)??"").trim();if(i){const s=e;s.ocrResultCards=[...s.ocrResultCards,{id:`ocr-${Date.now()}`,text:i,createdAt:Date.now()}],s.requestUpdate()}return}if((t.event==="device.pair.requested"||t.event==="device.pair.resolved")&&tn(e,{quiet:!0}),t.event==="exec.approval.requested"){const n=Sv(t.payload);if(n){e.execApprovalQueue=Av(e.execApprovalQueue,n),e.execApprovalError=null;const i=Math.max(0,n.expiresAtMs-Date.now()+500);window.setTimeout(()=>{e.execApprovalQueue=td(e.execApprovalQueue,n.id)},i)}return}if(t.event==="exec.approval.resolved"){const n=$v(t.payload);n&&(e.execApprovalQueue=td(e.execApprovalQueue,n.id))}}function Dv(e,t){const n=t.snapshot;n!=null&&n.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence),n!=null&&n.health&&(e.debugHealth=n.health),n!=null&&n.sessionDefaults&&Rv(e,n.sessionDefaults)}const sd="/api/bootstrap";async function Lv(e){if(typeof window>"u"||typeof fetch!="function")return;const t=ui(e.basePath??""),n=t?`${t}${sd}`:sd;try{const i=await fetch(n,{method:"GET",headers:{Accept:"application/json"},credentials:"same-origin"});if(!i.ok)return;const s=await i.json(),o=Al({agentId:s.assistantAgentId??null,name:s.assistantName,avatar:s.assistantAvatar??null});e.assistantName=o.name,e.assistantAvatar=o.avatar,e.assistantAgentId=o.agentId??null}catch{}}const Iv="Untitled quotation",Ov=24e4,Fv=12e4,Af=1,Tf=800,od=new WeakMap,Nv={idle:["running"],running:["awaiting_choices","done","error","idle"],awaiting_choices:["resuming","running","error","idle"],resuming:["awaiting_choices","done","error","idle"],done:["running","idle","error"],error:["running","idle","resuming"]};class xt extends Error{constructor(t){super(t),this.name="RetryableWorkError"}}class Sa extends Error{constructor(t){super(t),this.name="RunIdInvalidError"}}function ys(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}function hi(e){let t=od.get(e);return t||(t={controller:null,cancelRequested:!1,timeoutReached:!1},od.set(e,t)),t}function ko(e,t){const n=e.workRunStatus;if(n===t)return;if(!(Nv[n]??[]).includes(t))throw new Error(`invalid work state transition: ${n} -> ${t}`);e.workRunStatus=t}function Xn(e,t){e.workRunStatus=t}function Tl(e){e.workRunId=null,e.workPendingChoices=[],e.workSelections={}}function Cf(e){return(e||"").trim().replace(/\\/g,"/").toLowerCase()}function Bv(e,t){const n=(t.file_path||"").trim();if(n){const i=e.workOriginalFileNamesByPath[Cf(n)];if(typeof i=="string"&&i.trim())return i.trim()}return vs(t)}function vs(e){var i,s;const t=(i=e==null?void 0:e.name)==null?void 0:i.trim();if(t)return t;const n=(s=e==null?void 0:e.file_path)==null?void 0:s.trim();if(n){const o=n.replace(/\\/g,"/").split("/").filter(Boolean).pop();if(o)return o}return Iv}function zv(e){try{if(typeof e!="string"||!e.trim())return null;const t=e.trim();return t.startsWith("{")&&t.endsWith("}")||t.startsWith("[")&&t.endsWith("]")?JSON.parse(t):null}catch{return null}}function Or(e){if(typeof e!="string")return!1;const t=e.trim().toLowerCase();return t?t==="__oos__"||t==="oos"||t==="无货":!1}function Hv(e){const t=Array.isArray(e.fill_items_merged)?e.fill_items_merged:[];if(!t.length)return null;const n=Array.isArray(e.items)?e.items:[],i=Array.isArray(e.shortage)?e.shortage:[],s=new Map;for(const r of n)s.set(r.row,r);const o=t.map((r,a)=>{const l=r.row,c=s.get(l)??{},d=Number(r.qty??0),u=r.unit_price,h=u==null?null:Number(u),f=h==null||Number.isNaN(h)?null:h*d,m=String(r.code??""),b=String(r.quote_name??"").trim();let v=0,k=0,T=0;for(const S of i)if(S.row===l){k=Number(S.warehouse_qty??S.qty_warehouse??S.available_qty??0),v=Number(S.available_qty??0),T=Number(S.shortfall??0);break}const M=Or(m)||b.includes("库存不足");return!M&&T===0&&k===0&&m&&!Or(m)&&(k=d),!M&&T===0&&v===0&&m&&!Or(m)&&(v=d),{row_index:a,row:typeof l=="number"?l:void 0,product_name:String(c.product_name??""),specification:String(r.specification??c.specification??""),qty:d,code:m,quote_name:b,quote_spec:String(r.quote_spec??""),unit_price:h,amount:f,warehouse_qty:k,available_qty:v,shortfall:T,is_shortage:M?1:0,match_source:null}});return{name:vs({name:typeof e.name=="string"?e.name:"",file_path:typeof e.file_path=="string"?e.file_path:null}),file_path:typeof e.file_path=="string"?e.file_path:null,source:"file",lines:o}}function Uv(e){if(!Array.isArray(e))return null;let t=null;for(const n of e){const i=n.type,s=n.content;if(i!=="observation"||typeof s!="string")continue;const o=zv(s);if(!o||typeof o!="object")continue;const r=o.pending_quotation_draft;if(r&&Array.isArray(r.lines)){t={...r,name:vs(r)};continue}const a=Hv(o);a&&(t=a)}return t}function qv(e){const t=ae(e,"/api/work","pending_choices[]"),i=Zt(t.options,"/api/work","pending_choices[].options").map(s=>{const o=ae(s,"/api/work","pending_choices[].options[]");return{code:Wt(o.code,"/api/work","pending_choices[].options[].code"),matched_name:W(o.matched_name),unit_price:$e(o.unit_price),reasoning:W(o.reasoning)}});return{id:Wt(t.id,"/api/work","pending_choices[].id"),row:$e(t.row),keywords:W(t.keywords),product_name:W(t.product_name),specification:W(t.specification),qty:$e(t.qty)??W(t.qty),options:i}}function jv(e){const t=ae(e,"/api/work","pending_quotation_draft"),i=Zt(t.lines,"/api/work","pending_quotation_draft.lines").map((s,o)=>{const r=ae(s,"/api/work","pending_quotation_draft.lines[]"),a=$e(r.qty)??Number(r.qty??0),l=r.unit_price==null?null:Number(r.unit_price);return{row_index:$e(r.row_index)??o,row:$e(r.row),product_name:W(r.product_name),specification:W(r.specification),qty:Number.isFinite(a)?a:0,code:W(r.code),quote_name:W(r.quote_name),quote_spec:W(r.quote_spec),unit_price:l==null||Number.isNaN(l)?null:l,amount:r.amount==null?null:Number(r.amount),warehouse_qty:$e(r.warehouse_qty),available_qty:$e(r.available_qty)??Number(r.available_qty??0),shortfall:$e(r.shortfall)??Number(r.shortfall??0),is_shortage:$e(r.is_shortage)??(ul(r.is_shortage)?1:0),match_source:W(r.match_source)??null}});return{name:vs({name:W(t.name)??"",file_path:W(t.file_path)??null}),file_path:W(t.file_path)??null,source:W(t.source)??"file",lines:i}}function $a(e,t){const n=ae(e,t),s=(W(n.status)??"done")==="awaiting_choices"?"awaiting_choices":"done",o={status:s,success:ul(n.success)??!0,answer:W(n.answer)??"",trace:Array.isArray(n.trace)?n.trace:[],error:W(n.error)};if(n.pending_quotation_draft!=null&&(o.pending_quotation_draft=jv(n.pending_quotation_draft)),s==="awaiting_choices"){o.run_id=Wt(n.run_id,t,"run_id");const r=Zt(n.pending_choices,t,"pending_choices");o.pending_choices=r.map(a=>qv(a))}return o}function Aa(e,t){if(e.workResult={success:t.success,answer:t.answer,trace:t.trace,error:t.error},e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null,t.status==="awaiting_choices"){ko(e,"awaiting_choices"),e.workRunId=t.run_id??null,e.workPendingChoices=t.pending_choices??[];const n={};for(const i of e.workPendingChoices)n[i.id]="__OOS__";e.workSelections=n;return}if(Tl(e),t.pending_quotation_draft&&Array.isArray(t.pending_quotation_draft.lines))e.workPendingQuotationDraft={...t.pending_quotation_draft,name:vs(t.pending_quotation_draft)};else{const n=Uv(t.trace);n&&(e.workPendingQuotationDraft=n)}t.success===!1||t.error&&t.error.trim()?(Xn(e,"error"),e.workError=fe("执行报价流程",t.error??"后端返回失败状态","本次报价流程未完成","点击“重试”重新运行，或检查后端日志")):ko(e,"done")}function Ef(e){return new Promise(t=>setTimeout(t,e))}function Rf(e){return e===408||e===429||e===500||e===502||e===503||e===504}function Mf(e,t){const n=hi(e),i=new AbortController;n.controller=i,n.timeoutReached=!1;const s=setTimeout(()=>{n.timeoutReached=!0,i.abort("timeout")},t);return{signal:i.signal,close:()=>{clearTimeout(s),n.controller===i&&(n.controller=null)}}}function So(e){return e instanceof Error?e.name==="AbortError"||/aborted/i.test(e.message):!1}function Kv(e,t){Xn(e,"error"),Tl(e),e.workResult={success:!1,error:t},e.workError=fe("执行报价流程",t,"流程被中断，未产出有效结果","点击“重试”再次执行")}function Cl(e){Xn(e,"idle"),e.workError="已取消当前流程。",e.workResult=null}async function Wv(e,t){const n={file_paths:e.workFilePaths,customer_level:e.workCustomerLevel,do_register_oos:e.workDoRegisterOos},{signal:i,close:s}=Mf(e,Ov);try{const o=await fetch(ys(e.basePath,t),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n),credentials:"same-origin",signal:i});if(!o.ok||!o.body){const d=await o.json().catch(()=>({})),u=Ne(d,`HTTP ${o.status}`);throw Rf(o.status)?new xt(u):new Error(u)}const r=o.body.getReader(),a=new TextDecoder;let l="",c=!1;for(;;){const{done:d,value:u}=await r.read();if(d)break;l+=a.decode(u,{stream:!0});const h=l.split(`
`);l=h.pop()??"";for(const f of h){if(!f.startsWith("data: "))continue;const m=f.slice(6).trim();if(!m)continue;const b=ae(JSON.parse(m),t,"stream_event"),v=Wt(b.type,t,"stream_event.type");if(v==="stage"){const k=$e(b.stage)??Number(b.stage);if(!Number.isFinite(k))throw new _e(t,"stage must be a number");e.workProgressStage=k}else if(v==="result"){const k=$a(b.payload,t);Aa(e,k),c=!0;break}}if(c)break}if(!c&&l.startsWith("data: ")){const d=l.slice(6).trim();if(d){const u=ae(JSON.parse(d),t,"stream_event_tail");if(u.type==="result"){const h=$a(u.payload,t);Aa(e,h),c=!0}}}if(!c)throw new _e(t,"stream ended without result event")}catch(o){const r=hi(e);throw r.cancelRequested?new Error("__WORK_CANCELLED__"):So(o)&&r.timeoutReached?new xt("请求超时"):So(o)?new Error("请求已中断"):o instanceof _e||o instanceof xt?o:o instanceof Error&&/network|failed to fetch|load failed/i.test(o.message)?new xt(o.message):o}finally{s()}}function Vv(e,t){if(e===404||e===410)return!0;const n=Ne(t,"").toLowerCase();return n.includes("run_id")||n.includes("run id")}async function Gv(e,t,n){const i="/api/work/resume",{signal:s,close:o}=Mf(e,Fv);try{const r=await fetch(ys(e.basePath,i),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({run_id:t,selections:n}),credentials:"same-origin",signal:s}),a=await r.json().catch(()=>({}));if(!r.ok){if(Vv(r.status,a))throw new Sa(Ne(a,"run_id 已失效"));const c=Ne(a,`HTTP ${r.status}`);throw Rf(r.status)?new xt(c):new Error(c)}const l=$a(a,i);Aa(e,l)}catch(r){const a=hi(e);throw a.cancelRequested?new Error("__WORK_CANCELLED__"):r instanceof Sa?r:So(r)&&a.timeoutReached?new xt("请求超时"):So(r)?new Error("请求已中断"):r instanceof _e||r instanceof xt?r:r instanceof Error&&/network|failed to fetch|load failed/i.test(r.message)?new xt(r.message):r}finally{o()}}function Qv(e){var n;const t=hi(e);t.cancelRequested=!0,(n=t.controller)==null||n.abort("user_cancel"),Cl(e),e.workRunning=!1}async function Pf(e){if(!e.workFilePaths.length){e.workError="请先上传至少一个报价单文件";return}const t=hi(e);t.cancelRequested=!1,e.workRunning=!0,e.workError=null,e.workResult=null,e.workRunId=null,e.workPendingChoices=[],e.workSelections={},e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null,ko(e,"running");let n=0;try{for(;;){n+=1;try{await Wv(e,"/api/work/run-stream");break}catch(i){if(i instanceof Error&&i.message==="__WORK_CANCELLED__"){Cl(e);break}if(i instanceof xt&&n<=Af){await Ef(Tf*n);continue}const s=i instanceof _e||i instanceof Error?i.message:String(i);Kv(e,s);break}}}finally{e.workRunning=!1}}async function Df(e){const t=e.workRunId;if(!t||e.workPendingChoices.length===0){e.workError="缺少可继续的 run_id，请重新执行。",Xn(e,"error");return}const n=e.workPendingChoices.map(o=>({item_id:o.id,selected_code:e.workSelections[o.id]??"__OOS__"})),i=hi(e);i.cancelRequested=!1,e.workRunning=!0,e.workError=null,ko(e,"resuming");let s=0;try{for(;;){s+=1;try{await Gv(e,t,n);break}catch(o){if(o instanceof Error&&o.message==="__WORK_CANCELLED__"){Cl(e);break}if(o instanceof Sa){Tl(e),e.workResult={success:!1,error:o.message},e.workError=fe("继续流程",o.message,"当前待选项无法继续提交","请重新执行一次 Work 流程"),Xn(e,"error");break}if(o instanceof xt&&s<=Af){await Ef(Tf*s);continue}const r=o instanceof _e||o instanceof Error?o.message:String(o);e.workResult={success:!1,error:r},e.workError=fe("继续流程",r,"本次续跑失败，尚未生成完整结果","点击“重试”继续，或重新执行 Work"),Xn(e,"error");break}}}finally{e.workRunning=!1}}async function Yv(e){if(e.workRunId&&e.workPendingChoices.length>0){await Df(e);return}await Pf(e)}async function Xv(e){const t=(e.workTextInput||"").trim();if(!t)return e.workTextError="请输入产品描述文字",!1;e.workTextGenerating=!0,e.workTextError=null;try{const n=await fetch(ys(e.basePath,"/api/quotation/from-text"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t}),credentials:"same-origin"}),i=await n.json().catch(()=>({}));if(!n.ok){let a=typeof i.detail=="string"?i.detail:Ne(i,`HTTP ${n.status}`);return n.status===405&&(a="Method Not Allowed：该接口需 POST。请确认使用 python start.py 或 run_backend.py 启动前后端一体服务，且未通过仅支持 GET 的静态托管访问页面。"),e.workTextError=a,!1}const s=i&&typeof i.data=="object"?i.data:i,o=[],r={};if(Array.isArray(s.file_paths)){const a=Array.isArray(s.file_names)?s.file_names:[];s.file_paths.forEach((l,c)=>{if(typeof l!="string"||!l.trim())return;const d=l.trim();o.push(d);const u=typeof a[c]=="string"?a[c]:"";r[d]=u||d.split(/[/\\]/).pop()||d})}if(typeof s.file_path=="string"&&s.file_path.trim()){const a=s.file_path.trim();o.includes(a)||o.push(a);const l=typeof s.file_name=="string"?s.file_name:"";r[a]=l||a.split(/[/\\]/).pop()||a}if(!o.length)return e.workTextError="接口未返回 file_path/file_paths",!1;for(const a of o){e.workFilePaths.includes(a)||(e.workFilePaths=[...e.workFilePaths,a]);const l=Cf(a);if(l){const c=(r[a]||"").trim()||a.split(/[/\\]/).pop()||a;e.workOriginalFileNamesByPath={...e.workOriginalFileNamesByPath,[l]:c}}}return e.workTextError=null,!0}catch(n){const i=n instanceof Error?n.message:String(n);return e.workTextError=fe("从文字生成报价单",i,"未生成文件","请检查网络或后端后重试"),!1}finally{e.workTextGenerating=!1}}async function Jv(e){try{const t=ys(e.basePath,"/api/config/price-levels"),n=await fetch(t);if(!n.ok)throw new Error(`HTTP ${n.status}`);const i=await n.json();i.success&&Array.isArray(i.data)&&(e.workPriceLevelOptions=i.data)}catch(t){console.warn("[work] 加载价格档位失败，使用本地默认值",t)}}async function Zv(e){var n;const t=e.workPendingQuotationDraft;if(!((n=t==null?void 0:t.lines)!=null&&n.length))return e.workQuotationDraftSaveStatus={status:"error",error:"无报价明细可保存"},!1;e.workQuotationDraftSaveStatus={status:"saving"};try{const i=await fetch(ys(e.basePath,"/api/quotation-drafts"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:Bv(e,t),source:t.source||"file",file_path:t.file_path??void 0,lines:t.lines.map(u=>({product_name:u.product_name??"",specification:u.specification??"",qty:Number(u.qty)||0,code:u.code??"",quote_name:u.quote_name??"",quote_spec:u.quote_spec??"",unit_price:u.unit_price!=null?Number(u.unit_price):null,amount:u.amount!=null?Number(u.amount):null,available_qty:Number(u.warehouse_qty??u.available_qty)||0,shortfall:Number(u.shortfall)||0,is_shortage:u.is_shortage?1:0,match_source:u.match_source??null}))}),credentials:"same-origin"}),s=await i.json().catch(()=>({}));if(!i.ok)return e.workQuotationDraftSaveStatus={status:"error",error:fe("保存报价单",Ne(s,`HTTP ${i.status}`),"报价单仍停留在待保存状态","点击“重试”再次保存")},!1;const o=ae(s,"/api/quotation-drafts"),r=ul(o.success),a=ae(o.data,"/api/quotation-drafts","data"),l=Wt(a.draft_no,"/api/quotation-drafts","data.draft_no"),c=$e(a.draft_id)??Number(a.draft_id),d=Number.isFinite(c)?c:0;if(r===!1)throw new _e("/api/quotation-drafts","success is false");return e.workQuotationDraftSaveStatus={status:"ok",draft_no:l,draft_id:d},e.workPendingQuotationDraft=null,!0}catch(i){const s=i instanceof _e||i instanceof Error?i.message:String(i);return e.workQuotationDraftSaveStatus={status:"error",error:fe("保存报价单",s,"报价单仍停留在待保存状态","检查数据后重试")},!1}}function e0(e){e.basePath=Ry(),Lv(e),Jv(e),Ty(e),Ly(e,!0),My(e),Py(e),window.addEventListener("popstate",e.popStateHandler),$f(e),Cm(e),e.tab==="logs"&&ol(e),e.tab==="debug"&&al(e)}function t0(e){wm(e)}function n0(e){var t;window.removeEventListener("popstate",e.popStateHandler),Em(e),rl(e),ll(e),Dy(e),(t=e.topbarObserver)==null||t.disconnect(),e.topbarObserver=null}function i0(e,t){if(!(e.tab==="chat"&&e.chatManualRefreshInFlight)){if(e.tab==="chat"&&(t.has("chatMessages")||t.has("chatToolMessages")||t.has("chatStream")||t.has("chatLoading")||t.has("tab"))){const n=t.has("tab"),i=t.has("chatLoading")&&t.get("chatLoading")===!0&&!e.chatLoading;ps(e,n||i||!e.chatHasAutoScrolled)}e.tab==="logs"&&(t.has("logsEntries")||t.has("logsAutoFollow")||t.has("tab"))&&e.logsAutoFollow&&e.logsAtBottom&&Mh(e,t.has("tab")||t.has("logsAutoFollow"))}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const El={CHILD:2},Rl=e=>(...t)=>({_$litDirective$:e,values:t});let Ml=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,i){this._$Ct=t,this._$AM=n,this._$Ci=i}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Ta extends Ml{constructor(t){if(super(t),this.it=$,t.type!==El.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===$||t==null)return this._t=void 0,this.it=t;if(t===Qt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}Ta.directiveName="unsafeHTML",Ta.resultType=1;const oi=Rl(Ta);/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:Lf,setPrototypeOf:rd,isFrozen:s0,getPrototypeOf:o0,getOwnPropertyDescriptor:r0}=Object;let{freeze:Ue,seal:nt,create:Ca}=Object,{apply:Ea,construct:Ra}=typeof Reflect<"u"&&Reflect;Ue||(Ue=function(t){return t});nt||(nt=function(t){return t});Ea||(Ea=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),o=2;o<i;o++)s[o-2]=arguments[o];return t.apply(n,s)});Ra||(Ra=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const Fs=qe(Array.prototype.forEach),a0=qe(Array.prototype.lastIndexOf),ad=qe(Array.prototype.pop),mi=qe(Array.prototype.push),l0=qe(Array.prototype.splice),lo=qe(String.prototype.toLowerCase),Fr=qe(String.prototype.toString),Nr=qe(String.prototype.match),bi=qe(String.prototype.replace),c0=qe(String.prototype.indexOf),d0=qe(String.prototype.trim),st=qe(Object.prototype.hasOwnProperty),ze=qe(RegExp.prototype.test),yi=u0(TypeError);function qe(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return Ea(e,t,i)}}function u0(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return Ra(e,n)}}function J(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:lo;rd&&rd(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const o=n(s);o!==s&&(s0(t)||(t[i]=o),s=o)}e[s]=!0}return e}function h0(e){for(let t=0;t<e.length;t++)st(e,t)||(e[t]=null);return e}function pt(e){const t=Ca(null);for(const[n,i]of Lf(e))st(e,n)&&(Array.isArray(i)?t[n]=h0(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=pt(i):t[n]=i);return t}function vi(e,t){for(;e!==null;){const i=r0(e,t);if(i){if(i.get)return qe(i.get);if(typeof i.value=="function")return qe(i.value)}e=o0(e)}function n(){return null}return n}const ld=Ue(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Br=Ue(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),zr=Ue(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),f0=Ue(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Hr=Ue(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),p0=Ue(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),cd=Ue(["#text"]),dd=Ue(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ur=Ue(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ud=Ue(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ns=Ue(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),g0=nt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),m0=nt(/<%[\w\W]*|[\w\W]*%>/gm),b0=nt(/\$\{[\w\W]*/gm),y0=nt(/^data-[\-\w.\u00B7-\uFFFF]+$/),v0=nt(/^aria-[\-\w]+$/),If=nt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),x0=nt(/^(?:\w+script|data):/i),w0=nt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Of=nt(/^html$/i),_0=nt(/^[a-z][.\w]*(-[.\w]+)+$/i);var hd=Object.freeze({__proto__:null,ARIA_ATTR:v0,ATTR_WHITESPACE:w0,CUSTOM_ELEMENT:_0,DATA_ATTR:y0,DOCTYPE_NAME:Of,ERB_EXPR:m0,IS_ALLOWED_URI:If,IS_SCRIPT_OR_DATA:x0,MUSTACHE_EXPR:g0,TMPLIT_EXPR:b0});const xi={element:1,text:3,progressingInstruction:7,comment:8,document:9},k0=function(){return typeof window>"u"?null:window},S0=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const o="dompurify"+(i?"#"+i:"");try{return t.createPolicy(o,{createHTML(r){return r},createScriptURL(r){return r}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},fd=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ff(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:k0();const t=K=>Ff(K);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==xi.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:o,HTMLTemplateElement:r,Node:a,Element:l,NodeFilter:c,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:u,DOMParser:h,trustedTypes:f}=e,m=l.prototype,b=vi(m,"cloneNode"),v=vi(m,"remove"),k=vi(m,"nextSibling"),T=vi(m,"childNodes"),M=vi(m,"parentNode");if(typeof r=="function"){const K=n.createElement("template");K.content&&K.content.ownerDocument&&(n=K.content.ownerDocument)}let S,C="";const{implementation:y,createNodeIterator:E,createDocumentFragment:P,getElementsByTagName:R}=n,{importNode:O}=i;let L=fd();t.isSupported=typeof Lf=="function"&&typeof M=="function"&&y&&y.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:N,ERB_EXPR:j,TMPLIT_EXPR:Q,DATA_ATTR:I,ARIA_ATTR:z,IS_SCRIPT_OR_DATA:X,ATTR_WHITESPACE:B,CUSTOM_ELEMENT:se}=hd;let{IS_ALLOWED_URI:Me}=hd,le=null;const Ke=J({},[...ld,...Br,...zr,...Hr,...cd]);let ce=null;const Ye=J({},[...dd,...Ur,...ud,...Ns]);let oe=Object.seal(Ca(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Pe=null,V=null;const Y=Object.seal(Ca(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let de=!0,ye=!0,it=!1,$s=!0,Bn=!1,As=!0,sn=!1,dr=!1,ur=!1,zn=!1,Ts=!1,Cs=!1,oc=!0,rc=!1;const dg="user-content-";let hr=!0,fi=!1,Hn={},ut=null;const fr=J({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let ac=null;const lc=J({},["audio","video","img","source","image","track"]);let pr=null;const cc=J({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Es="http://www.w3.org/1998/Math/MathML",Rs="http://www.w3.org/2000/svg",kt="http://www.w3.org/1999/xhtml";let Un=kt,gr=!1,mr=null;const ug=J({},[Es,Rs,kt],Fr);let Ms=J({},["mi","mo","mn","ms","mtext"]),Ps=J({},["annotation-xml"]);const hg=J({},["title","style","font","a","script"]);let pi=null;const fg=["application/xhtml+xml","text/html"],pg="text/html";let Se=null,qn=null;const gg=n.createElement("form"),dc=function(A){return A instanceof RegExp||A instanceof Function},br=function(){let A=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(qn&&qn===A)){if((!A||typeof A!="object")&&(A={}),A=pt(A),pi=fg.indexOf(A.PARSER_MEDIA_TYPE)===-1?pg:A.PARSER_MEDIA_TYPE,Se=pi==="application/xhtml+xml"?Fr:lo,le=st(A,"ALLOWED_TAGS")?J({},A.ALLOWED_TAGS,Se):Ke,ce=st(A,"ALLOWED_ATTR")?J({},A.ALLOWED_ATTR,Se):Ye,mr=st(A,"ALLOWED_NAMESPACES")?J({},A.ALLOWED_NAMESPACES,Fr):ug,pr=st(A,"ADD_URI_SAFE_ATTR")?J(pt(cc),A.ADD_URI_SAFE_ATTR,Se):cc,ac=st(A,"ADD_DATA_URI_TAGS")?J(pt(lc),A.ADD_DATA_URI_TAGS,Se):lc,ut=st(A,"FORBID_CONTENTS")?J({},A.FORBID_CONTENTS,Se):fr,Pe=st(A,"FORBID_TAGS")?J({},A.FORBID_TAGS,Se):pt({}),V=st(A,"FORBID_ATTR")?J({},A.FORBID_ATTR,Se):pt({}),Hn=st(A,"USE_PROFILES")?A.USE_PROFILES:!1,de=A.ALLOW_ARIA_ATTR!==!1,ye=A.ALLOW_DATA_ATTR!==!1,it=A.ALLOW_UNKNOWN_PROTOCOLS||!1,$s=A.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Bn=A.SAFE_FOR_TEMPLATES||!1,As=A.SAFE_FOR_XML!==!1,sn=A.WHOLE_DOCUMENT||!1,zn=A.RETURN_DOM||!1,Ts=A.RETURN_DOM_FRAGMENT||!1,Cs=A.RETURN_TRUSTED_TYPE||!1,ur=A.FORCE_BODY||!1,oc=A.SANITIZE_DOM!==!1,rc=A.SANITIZE_NAMED_PROPS||!1,hr=A.KEEP_CONTENT!==!1,fi=A.IN_PLACE||!1,Me=A.ALLOWED_URI_REGEXP||If,Un=A.NAMESPACE||kt,Ms=A.MATHML_TEXT_INTEGRATION_POINTS||Ms,Ps=A.HTML_INTEGRATION_POINTS||Ps,oe=A.CUSTOM_ELEMENT_HANDLING||{},A.CUSTOM_ELEMENT_HANDLING&&dc(A.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(oe.tagNameCheck=A.CUSTOM_ELEMENT_HANDLING.tagNameCheck),A.CUSTOM_ELEMENT_HANDLING&&dc(A.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(oe.attributeNameCheck=A.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),A.CUSTOM_ELEMENT_HANDLING&&typeof A.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(oe.allowCustomizedBuiltInElements=A.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Bn&&(ye=!1),Ts&&(zn=!0),Hn&&(le=J({},cd),ce=[],Hn.html===!0&&(J(le,ld),J(ce,dd)),Hn.svg===!0&&(J(le,Br),J(ce,Ur),J(ce,Ns)),Hn.svgFilters===!0&&(J(le,zr),J(ce,Ur),J(ce,Ns)),Hn.mathMl===!0&&(J(le,Hr),J(ce,ud),J(ce,Ns))),A.ADD_TAGS&&(typeof A.ADD_TAGS=="function"?Y.tagCheck=A.ADD_TAGS:(le===Ke&&(le=pt(le)),J(le,A.ADD_TAGS,Se))),A.ADD_ATTR&&(typeof A.ADD_ATTR=="function"?Y.attributeCheck=A.ADD_ATTR:(ce===Ye&&(ce=pt(ce)),J(ce,A.ADD_ATTR,Se))),A.ADD_URI_SAFE_ATTR&&J(pr,A.ADD_URI_SAFE_ATTR,Se),A.FORBID_CONTENTS&&(ut===fr&&(ut=pt(ut)),J(ut,A.FORBID_CONTENTS,Se)),A.ADD_FORBID_CONTENTS&&(ut===fr&&(ut=pt(ut)),J(ut,A.ADD_FORBID_CONTENTS,Se)),hr&&(le["#text"]=!0),sn&&J(le,["html","head","body"]),le.table&&(J(le,["tbody"]),delete Pe.tbody),A.TRUSTED_TYPES_POLICY){if(typeof A.TRUSTED_TYPES_POLICY.createHTML!="function")throw yi('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof A.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw yi('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');S=A.TRUSTED_TYPES_POLICY,C=S.createHTML("")}else S===void 0&&(S=S0(f,s)),S!==null&&typeof C=="string"&&(C=S.createHTML(""));Ue&&Ue(A),qn=A}},uc=J({},[...Br,...zr,...f0]),hc=J({},[...Hr,...p0]),mg=function(A){let F=M(A);(!F||!F.tagName)&&(F={namespaceURI:Un,tagName:"template"});const U=lo(A.tagName),pe=lo(F.tagName);return mr[A.namespaceURI]?A.namespaceURI===Rs?F.namespaceURI===kt?U==="svg":F.namespaceURI===Es?U==="svg"&&(pe==="annotation-xml"||Ms[pe]):!!uc[U]:A.namespaceURI===Es?F.namespaceURI===kt?U==="math":F.namespaceURI===Rs?U==="math"&&Ps[pe]:!!hc[U]:A.namespaceURI===kt?F.namespaceURI===Rs&&!Ps[pe]||F.namespaceURI===Es&&!Ms[pe]?!1:!hc[U]&&(hg[U]||!uc[U]):!!(pi==="application/xhtml+xml"&&mr[A.namespaceURI]):!1},ht=function(A){mi(t.removed,{element:A});try{M(A).removeChild(A)}catch{v(A)}},on=function(A,F){try{mi(t.removed,{attribute:F.getAttributeNode(A),from:F})}catch{mi(t.removed,{attribute:null,from:F})}if(F.removeAttribute(A),A==="is")if(zn||Ts)try{ht(F)}catch{}else try{F.setAttribute(A,"")}catch{}},fc=function(A){let F=null,U=null;if(ur)A="<remove></remove>"+A;else{const we=Nr(A,/^[\r\n\t ]+/);U=we&&we[0]}pi==="application/xhtml+xml"&&Un===kt&&(A='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+A+"</body></html>");const pe=S?S.createHTML(A):A;if(Un===kt)try{F=new h().parseFromString(pe,pi)}catch{}if(!F||!F.documentElement){F=y.createDocument(Un,"template",null);try{F.documentElement.innerHTML=gr?C:pe}catch{}}const De=F.body||F.documentElement;return A&&U&&De.insertBefore(n.createTextNode(U),De.childNodes[0]||null),Un===kt?R.call(F,sn?"html":"body")[0]:sn?F.documentElement:De},pc=function(A){return E.call(A.ownerDocument||A,A,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},yr=function(A){return A instanceof u&&(typeof A.nodeName!="string"||typeof A.textContent!="string"||typeof A.removeChild!="function"||!(A.attributes instanceof d)||typeof A.removeAttribute!="function"||typeof A.setAttribute!="function"||typeof A.namespaceURI!="string"||typeof A.insertBefore!="function"||typeof A.hasChildNodes!="function")},gc=function(A){return typeof a=="function"&&A instanceof a};function St(K,A,F){Fs(K,U=>{U.call(t,A,F,qn)})}const mc=function(A){let F=null;if(St(L.beforeSanitizeElements,A,null),yr(A))return ht(A),!0;const U=Se(A.nodeName);if(St(L.uponSanitizeElement,A,{tagName:U,allowedTags:le}),As&&A.hasChildNodes()&&!gc(A.firstElementChild)&&ze(/<[/\w!]/g,A.innerHTML)&&ze(/<[/\w!]/g,A.textContent)||A.nodeType===xi.progressingInstruction||As&&A.nodeType===xi.comment&&ze(/<[/\w]/g,A.data))return ht(A),!0;if(!(Y.tagCheck instanceof Function&&Y.tagCheck(U))&&(!le[U]||Pe[U])){if(!Pe[U]&&yc(U)&&(oe.tagNameCheck instanceof RegExp&&ze(oe.tagNameCheck,U)||oe.tagNameCheck instanceof Function&&oe.tagNameCheck(U)))return!1;if(hr&&!ut[U]){const pe=M(A)||A.parentNode,De=T(A)||A.childNodes;if(De&&pe){const we=De.length;for(let We=we-1;We>=0;--We){const $t=b(De[We],!0);$t.__removalCount=(A.__removalCount||0)+1,pe.insertBefore($t,k(A))}}}return ht(A),!0}return A instanceof l&&!mg(A)||(U==="noscript"||U==="noembed"||U==="noframes")&&ze(/<\/no(script|embed|frames)/i,A.innerHTML)?(ht(A),!0):(Bn&&A.nodeType===xi.text&&(F=A.textContent,Fs([N,j,Q],pe=>{F=bi(F,pe," ")}),A.textContent!==F&&(mi(t.removed,{element:A.cloneNode()}),A.textContent=F)),St(L.afterSanitizeElements,A,null),!1)},bc=function(A,F,U){if(oc&&(F==="id"||F==="name")&&(U in n||U in gg))return!1;if(!(ye&&!V[F]&&ze(I,F))){if(!(de&&ze(z,F))){if(!(Y.attributeCheck instanceof Function&&Y.attributeCheck(F,A))){if(!ce[F]||V[F]){if(!(yc(A)&&(oe.tagNameCheck instanceof RegExp&&ze(oe.tagNameCheck,A)||oe.tagNameCheck instanceof Function&&oe.tagNameCheck(A))&&(oe.attributeNameCheck instanceof RegExp&&ze(oe.attributeNameCheck,F)||oe.attributeNameCheck instanceof Function&&oe.attributeNameCheck(F,A))||F==="is"&&oe.allowCustomizedBuiltInElements&&(oe.tagNameCheck instanceof RegExp&&ze(oe.tagNameCheck,U)||oe.tagNameCheck instanceof Function&&oe.tagNameCheck(U))))return!1}else if(!pr[F]){if(!ze(Me,bi(U,B,""))){if(!((F==="src"||F==="xlink:href"||F==="href")&&A!=="script"&&c0(U,"data:")===0&&ac[A])){if(!(it&&!ze(X,bi(U,B,"")))){if(U)return!1}}}}}}}return!0},yc=function(A){return A!=="annotation-xml"&&Nr(A,se)},vc=function(A){St(L.beforeSanitizeAttributes,A,null);const{attributes:F}=A;if(!F||yr(A))return;const U={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ce,forceKeepAttr:void 0};let pe=F.length;for(;pe--;){const De=F[pe],{name:we,namespaceURI:We,value:$t}=De,jn=Se(we),vr=$t;let Re=we==="value"?vr:d0(vr);if(U.attrName=jn,U.attrValue=Re,U.keepAttr=!0,U.forceKeepAttr=void 0,St(L.uponSanitizeAttribute,A,U),Re=U.attrValue,rc&&(jn==="id"||jn==="name")&&(on(we,A),Re=dg+Re),As&&ze(/((--!?|])>)|<\/(style|title|textarea)/i,Re)){on(we,A);continue}if(jn==="attributename"&&Nr(Re,"href")){on(we,A);continue}if(U.forceKeepAttr)continue;if(!U.keepAttr){on(we,A);continue}if(!$s&&ze(/\/>/i,Re)){on(we,A);continue}Bn&&Fs([N,j,Q],wc=>{Re=bi(Re,wc," ")});const xc=Se(A.nodeName);if(!bc(xc,jn,Re)){on(we,A);continue}if(S&&typeof f=="object"&&typeof f.getAttributeType=="function"&&!We)switch(f.getAttributeType(xc,jn)){case"TrustedHTML":{Re=S.createHTML(Re);break}case"TrustedScriptURL":{Re=S.createScriptURL(Re);break}}if(Re!==vr)try{We?A.setAttributeNS(We,we,Re):A.setAttribute(we,Re),yr(A)?ht(A):ad(t.removed)}catch{on(we,A)}}St(L.afterSanitizeAttributes,A,null)},bg=function K(A){let F=null;const U=pc(A);for(St(L.beforeSanitizeShadowDOM,A,null);F=U.nextNode();)St(L.uponSanitizeShadowNode,F,null),mc(F),vc(F),F.content instanceof o&&K(F.content);St(L.afterSanitizeShadowDOM,A,null)};return t.sanitize=function(K){let A=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},F=null,U=null,pe=null,De=null;if(gr=!K,gr&&(K="<!-->"),typeof K!="string"&&!gc(K))if(typeof K.toString=="function"){if(K=K.toString(),typeof K!="string")throw yi("dirty is not a string, aborting")}else throw yi("toString is not a function");if(!t.isSupported)return K;if(dr||br(A),t.removed=[],typeof K=="string"&&(fi=!1),fi){if(K.nodeName){const $t=Se(K.nodeName);if(!le[$t]||Pe[$t])throw yi("root node is forbidden and cannot be sanitized in-place")}}else if(K instanceof a)F=fc("<!---->"),U=F.ownerDocument.importNode(K,!0),U.nodeType===xi.element&&U.nodeName==="BODY"||U.nodeName==="HTML"?F=U:F.appendChild(U);else{if(!zn&&!Bn&&!sn&&K.indexOf("<")===-1)return S&&Cs?S.createHTML(K):K;if(F=fc(K),!F)return zn?null:Cs?C:""}F&&ur&&ht(F.firstChild);const we=pc(fi?K:F);for(;pe=we.nextNode();)mc(pe),vc(pe),pe.content instanceof o&&bg(pe.content);if(fi)return K;if(zn){if(Ts)for(De=P.call(F.ownerDocument);F.firstChild;)De.appendChild(F.firstChild);else De=F;return(ce.shadowroot||ce.shadowrootmode)&&(De=O.call(i,De,!0)),De}let We=sn?F.outerHTML:F.innerHTML;return sn&&le["!doctype"]&&F.ownerDocument&&F.ownerDocument.doctype&&F.ownerDocument.doctype.name&&ze(Of,F.ownerDocument.doctype.name)&&(We="<!DOCTYPE "+F.ownerDocument.doctype.name+`>
`+We),Bn&&Fs([N,j,Q],$t=>{We=bi(We,$t," ")}),S&&Cs?S.createHTML(We):We},t.setConfig=function(){let K=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};br(K),dr=!0},t.clearConfig=function(){qn=null,dr=!1},t.isValidAttribute=function(K,A,F){qn||br({});const U=Se(K),pe=Se(A);return bc(U,pe,F)},t.addHook=function(K,A){typeof A=="function"&&mi(L[K],A)},t.removeHook=function(K,A){if(A!==void 0){const F=a0(L[K],A);return F===-1?void 0:l0(L[K],F,1)[0]}return ad(L[K])},t.removeHooks=function(K){L[K]=[]},t.removeAllHooks=function(){L=fd()},t}var Ma=Ff();function Pl(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Fn=Pl();function Nf(e){Fn=e}var mn={exec:()=>null};function te(e,t=""){let n=typeof e=="string"?e:e.source,i={replace:(s,o)=>{let r=typeof o=="string"?o:o.source;return r=r.replace(He.caret,"$1"),n=n.replace(s,r),i},getRegex:()=>new RegExp(n,t)};return i}var $0=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),He={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}>`)},A0=/^(?:[ \t]*(?:\n|$))+/,T0=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,C0=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,xs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,E0=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Dl=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,Bf=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,zf=te(Bf).replace(/bull/g,Dl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),R0=te(Bf).replace(/bull/g,Dl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ll=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,M0=/^[^\n]+/,Il=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,P0=te(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Il).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),D0=te(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Dl).getRegex(),Zo="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ol=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,L0=te("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ol).replace("tag",Zo).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Hf=te(Ll).replace("hr",xs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Zo).getRegex(),I0=te(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Hf).getRegex(),Fl={blockquote:I0,code:T0,def:P0,fences:C0,heading:E0,hr:xs,html:L0,lheading:zf,list:D0,newline:A0,paragraph:Hf,table:mn,text:M0},pd=te("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",xs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Zo).getRegex(),O0={...Fl,lheading:R0,table:pd,paragraph:te(Ll).replace("hr",xs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",pd).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Zo).getRegex()},F0={...Fl,html:te(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ol).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:mn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:te(Ll).replace("hr",xs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",zf).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},N0=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,B0=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Uf=/^( {2,}|\\)\n(?!\s*$)/,z0=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,er=/[\p{P}\p{S}]/u,Nl=/[\s\p{P}\p{S}]/u,qf=/[^\s\p{P}\p{S}]/u,H0=te(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Nl).getRegex(),jf=/(?!~)[\p{P}\p{S}]/u,U0=/(?!~)[\s\p{P}\p{S}]/u,q0=/(?:[^\s\p{P}\p{S}]|~)/u,Kf=/(?![*_])[\p{P}\p{S}]/u,j0=/(?![*_])[\s\p{P}\p{S}]/u,K0=/(?:[^\s\p{P}\p{S}]|[*_])/u,W0=te(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",$0?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Wf=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,V0=te(Wf,"u").replace(/punct/g,er).getRegex(),G0=te(Wf,"u").replace(/punct/g,jf).getRegex(),Vf="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Q0=te(Vf,"gu").replace(/notPunctSpace/g,qf).replace(/punctSpace/g,Nl).replace(/punct/g,er).getRegex(),Y0=te(Vf,"gu").replace(/notPunctSpace/g,q0).replace(/punctSpace/g,U0).replace(/punct/g,jf).getRegex(),X0=te("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,qf).replace(/punctSpace/g,Nl).replace(/punct/g,er).getRegex(),J0=te(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,Kf).getRegex(),Z0="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",ex=te(Z0,"gu").replace(/notPunctSpace/g,K0).replace(/punctSpace/g,j0).replace(/punct/g,Kf).getRegex(),tx=te(/\\(punct)/,"gu").replace(/punct/g,er).getRegex(),nx=te(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),ix=te(Ol).replace("(?:-->|$)","-->").getRegex(),sx=te("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",ix).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),$o=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,ox=te(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",$o).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Gf=te(/^!?\[(label)\]\[(ref)\]/).replace("label",$o).replace("ref",Il).getRegex(),Qf=te(/^!?\[(ref)\](?:\[\])?/).replace("ref",Il).getRegex(),rx=te("reflink|nolink(?!\\()","g").replace("reflink",Gf).replace("nolink",Qf).getRegex(),gd=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Bl={_backpedal:mn,anyPunctuation:tx,autolink:nx,blockSkip:W0,br:Uf,code:B0,del:mn,delLDelim:mn,delRDelim:mn,emStrongLDelim:V0,emStrongRDelimAst:Q0,emStrongRDelimUnd:X0,escape:N0,link:ox,nolink:Qf,punctuation:H0,reflink:Gf,reflinkSearch:rx,tag:sx,text:z0,url:mn},ax={...Bl,link:te(/^!?\[(label)\]\((.*?)\)/).replace("label",$o).getRegex(),reflink:te(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",$o).getRegex()},Pa={...Bl,emStrongRDelimAst:Y0,emStrongLDelim:G0,delLDelim:J0,delRDelim:ex,url:te(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",gd).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:te(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",gd).getRegex()},lx={...Pa,br:te(Uf).replace("{2,}","*").getRegex(),text:te(Pa.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Bs={normal:Fl,gfm:O0,pedantic:F0},wi={normal:Bl,gfm:Pa,breaks:lx,pedantic:ax},cx={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},md=e=>cx[e];function gt(e,t){if(t){if(He.escapeTest.test(e))return e.replace(He.escapeReplace,md)}else if(He.escapeTestNoEncode.test(e))return e.replace(He.escapeReplaceNoEncode,md);return e}function bd(e){try{e=encodeURI(e).replace(He.percentDecode,"%")}catch{return null}return e}function yd(e,t){var o;let n=e.replace(He.findPipe,(r,a,l)=>{let c=!1,d=a;for(;--d>=0&&l[d]==="\\";)c=!c;return c?"|":" |"}),i=n.split(He.splitPipe),s=0;if(i[0].trim()||i.shift(),i.length>0&&!((o=i.at(-1))!=null&&o.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(He.slashPipe,"|");return i}function _i(e,t,n){let i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function dx(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function ux(e,t=0){let n=t,i="";for(let s of e)if(s==="	"){let o=4-n%4;i+=" ".repeat(o),n+=o}else i+=s,n++;return i}function vd(e,t,n,i,s){let o=t.href,r=t.title||null,a=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:r,text:a,tokens:i.inlineTokens(a)};return i.state.inLink=!1,l}function hx(e,t,n){let i=e.match(n.other.indentCodeCompensation);if(i===null)return t;let s=i[1];return t.split(`
`).map(o=>{let r=o.match(n.other.beginningSpace);if(r===null)return o;let[a]=r;return a.length>=s.length?o.slice(s.length):o}).join(`
`)}var Ao=class{constructor(e){D(this,"options");D(this,"rules");D(this,"lexer");this.options=e||Fn}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:_i(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],i=hx(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let i=_i(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:_i(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=_i(t[0],`
`).split(`
`),i="",s="",o=[];for(;n.length>0;){let r=!1,a=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))a.push(n[l]),r=!0;else if(!r)a.push(n[l]);else break;n=n.slice(l);let c=a.join(`
`),d=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,s=s?`${s}
${d}`:d;let u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=u,n.length===0)break;let h=o.at(-1);if((h==null?void 0:h.type)==="code")break;if((h==null?void 0:h.type)==="blockquote"){let f=h,m=f.raw+`
`+n.join(`
`),b=this.blockquote(m);o[o.length-1]=b,i=i.substring(0,i.length-f.raw.length)+b.raw,s=s.substring(0,s.length-f.text.length)+b.text;break}else if((h==null?void 0:h.type)==="list"){let f=h,m=f.raw+`
`+n.join(`
`),b=this.list(m);o[o.length-1]=b,i=i.substring(0,i.length-h.raw.length)+b.raw,s=s.substring(0,s.length-f.raw.length)+b.raw,n=m.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:o,text:s}}}list(e){var n,i;let t=this.rules.block.list.exec(e);if(t){let s=t[1].trim(),o=s.length>1,r={type:"list",raw:"",ordered:o,start:o?+s.slice(0,-1):"",loose:!1,items:[]};s=o?`\\d{1,9}\\${s.slice(-1)}`:`\\${s}`,this.options.pedantic&&(s=o?s:"[*+-]");let a=this.rules.other.listItemRegex(s),l=!1;for(;e;){let d=!1,u="",h="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let f=ux(t[2].split(`
`,1)[0],t[1].length),m=e.split(`
`,1)[0],b=!f.trim(),v=0;if(this.options.pedantic?(v=2,h=f.trimStart()):b?v=t[1].length+1:(v=f.search(this.rules.other.nonSpaceChar),v=v>4?1:v,h=f.slice(v),v+=t[1].length),b&&this.rules.other.blankLine.test(m)&&(u+=m+`
`,e=e.substring(m.length+1),d=!0),!d){let k=this.rules.other.nextBulletRegex(v),T=this.rules.other.hrRegex(v),M=this.rules.other.fencesBeginRegex(v),S=this.rules.other.headingBeginRegex(v),C=this.rules.other.htmlBeginRegex(v),y=this.rules.other.blockquoteBeginRegex(v);for(;e;){let E=e.split(`
`,1)[0],P;if(m=E,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),P=m):P=m.replace(this.rules.other.tabCharGlobal,"    "),M.test(m)||S.test(m)||C.test(m)||y.test(m)||k.test(m)||T.test(m))break;if(P.search(this.rules.other.nonSpaceChar)>=v||!m.trim())h+=`
`+P.slice(v);else{if(b||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||M.test(f)||S.test(f)||T.test(f))break;h+=`
`+m}b=!m.trim(),u+=E+`
`,e=e.substring(E.length+1),f=P.slice(v)}}r.loose||(l?r.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(l=!0)),r.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(h),loose:!1,text:h,tokens:[]}),r.raw+=u}let c=r.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;r.raw=r.raw.trimEnd();for(let d of r.items){if(this.lexer.state.top=!1,d.tokens=this.lexer.blockTokens(d.text,[]),d.task){if(d.text=d.text.replace(this.rules.other.listReplaceTask,""),((n=d.tokens[0])==null?void 0:n.type)==="text"||((i=d.tokens[0])==null?void 0:i.type)==="paragraph"){d.tokens[0].raw=d.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),d.tokens[0].text=d.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let h=this.lexer.inlineQueue.length-1;h>=0;h--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[h].src)){this.lexer.inlineQueue[h].src=this.lexer.inlineQueue[h].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(d.raw);if(u){let h={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};d.checked=h.checked,r.loose?d.tokens[0]&&["paragraph","text"].includes(d.tokens[0].type)&&"tokens"in d.tokens[0]&&d.tokens[0].tokens?(d.tokens[0].raw=h.raw+d.tokens[0].raw,d.tokens[0].text=h.raw+d.tokens[0].text,d.tokens[0].tokens.unshift(h)):d.tokens.unshift({type:"paragraph",raw:h.raw,text:h.raw,tokens:[h]}):d.tokens.unshift(h)}}if(!r.loose){let u=d.tokens.filter(f=>f.type==="space"),h=u.length>0&&u.some(f=>this.rules.other.anyLine.test(f.raw));r.loose=h}}if(r.loose)for(let d of r.items){d.loose=!0;for(let u of d.tokens)u.type==="text"&&(u.type="paragraph")}return r}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var r;let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=yd(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(r=t[3])!=null&&r.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(let a of i)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(yd(a,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=_i(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=dx(t[2],"()");if(o===-2)return;if(o>-1){let r=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(i);o&&(i=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),vd(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return vd(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(i[1]||i[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...i[0]].length-1,o,r,a=s,l=0,c=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+s);(i=c.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(r=[...o].length,i[3]||i[4]){a+=r;continue}else if((i[5]||i[6])&&s%3&&!((s+r)%3)){l+=r;continue}if(a-=r,a>0)continue;r=Math.min(r,r+a+l);let d=[...i[0]][0].length,u=e.slice(0,s+i.index+d+r);if(Math.min(s,r)%2){let f=u.slice(1,-1);return{type:"em",raw:u,text:f,tokens:this.lexer.inlineTokens(f)}}let h=u.slice(2,-2);return{type:"strong",raw:u,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e,t,n=""){let i=this.rules.inline.delLDelim.exec(e);if(i&&(!i[1]||!n||this.rules.inline.punctuation.exec(n))){let s=[...i[0]].length-1,o,r,a=s,l=this.rules.inline.delRDelim;for(l.lastIndex=0,t=t.slice(-1*e.length+s);(i=l.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o||(r=[...o].length,r!==s))continue;if(i[3]||i[4]){a+=r;continue}if(a-=r,a>0)continue;r=Math.min(r,r+a);let c=[...i[0]][0].length,d=e.slice(0,s+i.index+c+r),u=d.slice(s,-s);return{type:"del",raw:d,text:u,tokens:this.lexer.inlineTokens(u)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let o;do o=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(o!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},rt=class Da{constructor(t){D(this,"tokens");D(this,"options");D(this,"state");D(this,"inlineQueue");D(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Fn,this.options.tokenizer=this.options.tokenizer||new Ao,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:He,block:Bs.normal,inline:wi.normal};this.options.pedantic?(n.block=Bs.pedantic,n.inline=wi.pedantic):this.options.gfm&&(n.block=Bs.gfm,this.options.breaks?n.inline=wi.breaks:n.inline=wi.gfm),this.tokenizer.rules=n}static get rules(){return{block:Bs,inline:wi}}static lex(t,n){return new Da(n).lex(t)}static lexInline(t,n){return new Da(n).inlineTokens(t)}lex(t){t=t.replace(He.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,o,r;for(this.options.pedantic&&(t=t.replace(He.tabCharGlobal,"    ").replace(He.spaceLine,""));t;){let a;if((o=(s=this.options.extensions)==null?void 0:s.block)!=null&&o.some(c=>(a=c.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.space(t)){t=t.substring(a.raw.length);let c=n.at(-1);a.raw.length===1&&c!==void 0?c.raw+=`
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
`+a.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(a);continue}if(t){let c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var l,c,d,u,h;let i=t,s=null;if(this.tokens.links){let f=Object.keys(this.tokens.links);if(f.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)f.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)o=s[2]?s[2].length:0,i=i.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);i=((c=(l=this.options.hooks)==null?void 0:l.emStrongMask)==null?void 0:c.call({lexer:this},i))??i;let r=!1,a="";for(;t;){r||(a=""),r=!1;let f;if((u=(d=this.options.extensions)==null?void 0:d.inline)!=null&&u.some(b=>(f=b.call({lexer:this},t,n))?(t=t.substring(f.raw.length),n.push(f),!0):!1))continue;if(f=this.tokenizer.escape(t)){t=t.substring(f.raw.length),n.push(f);continue}if(f=this.tokenizer.tag(t)){t=t.substring(f.raw.length),n.push(f);continue}if(f=this.tokenizer.link(t)){t=t.substring(f.raw.length),n.push(f);continue}if(f=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(f.raw.length);let b=n.at(-1);f.type==="text"&&(b==null?void 0:b.type)==="text"?(b.raw+=f.raw,b.text+=f.text):n.push(f);continue}if(f=this.tokenizer.emStrong(t,i,a)){t=t.substring(f.raw.length),n.push(f);continue}if(f=this.tokenizer.codespan(t)){t=t.substring(f.raw.length),n.push(f);continue}if(f=this.tokenizer.br(t)){t=t.substring(f.raw.length),n.push(f);continue}if(f=this.tokenizer.del(t,i,a)){t=t.substring(f.raw.length),n.push(f);continue}if(f=this.tokenizer.autolink(t)){t=t.substring(f.raw.length),n.push(f);continue}if(!this.state.inLink&&(f=this.tokenizer.url(t))){t=t.substring(f.raw.length),n.push(f);continue}let m=t;if((h=this.options.extensions)!=null&&h.startInline){let b=1/0,v=t.slice(1),k;this.options.extensions.startInline.forEach(T=>{k=T.call({lexer:this},v),typeof k=="number"&&k>=0&&(b=Math.min(b,k))}),b<1/0&&b>=0&&(m=t.substring(0,b+1))}if(f=this.tokenizer.inlineText(m)){t=t.substring(f.raw.length),f.raw.slice(-1)!=="_"&&(a=f.raw.slice(-1)),r=!0;let b=n.at(-1);(b==null?void 0:b.type)==="text"?(b.raw+=f.raw,b.text+=f.text):n.push(f);continue}if(t){let b="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(b);break}else throw new Error(b)}}return n}},To=class{constructor(e){D(this,"options");D(this,"parser");this.options=e||Fn}space(e){return""}code({text:e,lang:t,escaped:n}){var o;let i=(o=(t||"").match(He.notSpaceStart))==null?void 0:o[0],s=e.replace(He.endingNewline,"")+`
`;return i?'<pre><code class="language-'+gt(i)+'">'+(n?s:gt(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:gt(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${gt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let i=this.parser.parseInline(n),s=bd(e);if(s===null)return i;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+gt(t)+'"'),o+=">"+i+"</a>",o}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));let s=bd(e);if(s===null)return gt(n);e=s;let o=`<img src="${e}" alt="${gt(n)}"`;return t&&(o+=` title="${gt(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:gt(e.text)}},zl=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},at=class La{constructor(t){D(this,"options");D(this,"renderer");D(this,"textRenderer");this.options=t||Fn,this.options.renderer=this.options.renderer||new To,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new zl}static parse(t,n){return new La(n).parse(t)}static parseInline(t,n){return new La(n).parseInline(t)}parse(t){var i,s;let n="";for(let o=0;o<t.length;o++){let r=t[o];if((s=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&s[r.type]){let l=r,c=this.options.extensions.renderers[l.type].call({parser:this},l);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(l.type)){n+=c||"";continue}}let a=r;switch(a.type){case"space":{n+=this.renderer.space(a);break}case"hr":{n+=this.renderer.hr(a);break}case"heading":{n+=this.renderer.heading(a);break}case"code":{n+=this.renderer.code(a);break}case"table":{n+=this.renderer.table(a);break}case"blockquote":{n+=this.renderer.blockquote(a);break}case"list":{n+=this.renderer.list(a);break}case"checkbox":{n+=this.renderer.checkbox(a);break}case"html":{n+=this.renderer.html(a);break}case"def":{n+=this.renderer.def(a);break}case"paragraph":{n+=this.renderer.paragraph(a);break}case"text":{n+=this.renderer.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}parseInline(t,n=this.renderer){var s,o;let i="";for(let r=0;r<t.length;r++){let a=t[r];if((o=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&o[a.type]){let c=this.options.extensions.renderers[a.type].call({parser:this},a);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type)){i+=c||"";continue}}let l=a;switch(l.type){case"escape":{i+=n.text(l);break}case"html":{i+=n.html(l);break}case"link":{i+=n.link(l);break}case"image":{i+=n.image(l);break}case"checkbox":{i+=n.checkbox(l);break}case"strong":{i+=n.strong(l);break}case"em":{i+=n.em(l);break}case"codespan":{i+=n.codespan(l);break}case"br":{i+=n.br(l);break}case"del":{i+=n.del(l);break}case"text":{i+=n.text(l);break}default:{let c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},io,Ei=(io=class{constructor(e){D(this,"options");D(this,"block");this.options=e||Fn}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?rt.lex:rt.lexInline}provideParser(){return this.block?at.parse:at.parseInline}},D(io,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),D(io,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),io),fx=class{constructor(...e){D(this,"defaults",Pl());D(this,"options",this.setOptions);D(this,"parse",this.parseMarkdown(!0));D(this,"parseInline",this.parseMarkdown(!1));D(this,"Parser",at);D(this,"Renderer",To);D(this,"TextRenderer",zl);D(this,"Lexer",rt);D(this,"Tokenizer",Ao);D(this,"Hooks",Ei);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(let o of e)switch(n=n.concat(t.call(this,o)),o.type){case"table":{let r=o;for(let a of r.header)n=n.concat(this.walkTokens(a.tokens,t));for(let a of r.rows)for(let l of a)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{let r=o;n=n.concat(this.walkTokens(r.items,t));break}default:{let r=o;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[r.type]?this.defaults.extensions.childTokens[r.type].forEach(a=>{let l=r[a].flat(1/0);n=n.concat(this.walkTokens(l,t))}):r.tokens&&(n=n.concat(this.walkTokens(r.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...r){let a=s.renderer.apply(this,r);return a===!1&&(a=o.apply(this,r)),a}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){let s=this.defaults.renderer||new To(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let r=o,a=n.renderer[r],l=s[r];s[r]=(...c)=>{let d=a.apply(s,c);return d===!1&&(d=l.apply(s,c)),d||""}}i.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new Ao(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let r=o,a=n.tokenizer[r],l=s[r];s[r]=(...c)=>{let d=a.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new Ei;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let r=o,a=n.hooks[r],l=s[r];Ei.passThroughHooks.has(o)?s[r]=c=>{if(this.defaults.async&&Ei.passThroughHooksRespectAsync.has(o))return(async()=>{let u=await a.call(s,c);return l.call(s,u)})();let d=a.call(s,c);return l.call(s,d)}:s[r]=(...c)=>{if(this.defaults.async)return(async()=>{let u=await a.apply(s,c);return u===!1&&(u=await l.apply(s,c)),u})();let d=a.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;i.walkTokens=function(r){let a=[];return a.push(o.call(this,r)),s&&(a=a.concat(s.call(this,r))),a}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return rt.lex(e,t??this.defaults)}parser(e,t){return at.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let i={...n},s={...this.defaults,...i},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&i.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let r=s.hooks?await s.hooks.preprocess(t):t,a=await(s.hooks?await s.hooks.provideLexer():e?rt.lex:rt.lexInline)(r,s),l=s.hooks?await s.hooks.processAllTokens(a):a;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():e?at.parse:at.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let r=(s.hooks?s.hooks.provideLexer():e?rt.lex:rt.lexInline)(t,s);s.hooks&&(r=s.hooks.processAllTokens(r)),s.walkTokens&&this.walkTokens(r,s.walkTokens);let a=(s.hooks?s.hooks.provideParser():e?at.parse:at.parseInline)(r,s);return s.hooks&&(a=s.hooks.postprocess(a)),a}catch(r){return o(r)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let i="<p>An error occurred:</p><pre>"+gt(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},Mn=new fx;function ie(e,t){return Mn.parse(e,t)}ie.options=ie.setOptions=function(e){return Mn.setOptions(e),ie.defaults=Mn.defaults,Nf(ie.defaults),ie};ie.getDefaults=Pl;ie.defaults=Fn;ie.use=function(...e){return Mn.use(...e),ie.defaults=Mn.defaults,Nf(ie.defaults),ie};ie.walkTokens=function(e,t){return Mn.walkTokens(e,t)};ie.parseInline=Mn.parseInline;ie.Parser=at;ie.parser=at.parse;ie.Renderer=To;ie.TextRenderer=zl;ie.Lexer=rt;ie.lexer=rt.lex;ie.Tokenizer=Ao;ie.Hooks=Ei;ie.parse=ie;ie.options;ie.setOptions;ie.use;ie.walkTokens;ie.parseInline;at.parse;rt.lex;ie.setOptions({gfm:!0,breaks:!0});const px=["a","b","blockquote","br","code","del","em","h1","h2","h3","h4","hr","i","li","ol","p","pre","strong","table","tbody","td","th","thead","tr","ul","img"],gx=["class","href","rel","target","title","start","src","alt"],xd={ALLOWED_TAGS:px,ALLOWED_ATTR:gx,ADD_DATA_URI_TAGS:["img"]};let wd=!1;const mx=14e4,bx=4e4,yx=200,qr=5e4,yn=new Map;function vx(e){const t=yn.get(e);return t===void 0?null:(yn.delete(e),yn.set(e,t),t)}function _d(e,t){if(yn.set(e,t),yn.size<=yx)return;const n=yn.keys().next().value;n&&yn.delete(n)}function xx(){wd||(wd=!0,Ma.addHook("afterSanitizeAttributes",e=>{!(e instanceof HTMLAnchorElement)||!e.getAttribute("href")||(e.setAttribute("rel","noreferrer noopener"),e.setAttribute("target","_blank"))}))}function ri(e){const t=e.trim();if(!t)return"";if(xx(),t.length<=qr){const r=vx(t);if(r!==null)return r}const n=Oh(t,mx),i=n.truncated?`

… truncated (${n.total} chars, showing first ${n.text.length}).`:"";if(n.text.length>bx){const a=`<pre class="code-block">${Xf(`${n.text}${i}`)}</pre>`,l=Ma.sanitize(a,xd);return t.length<=qr&&_d(t,l),l}const s=ie.parse(`${n.text}${i}`,{renderer:Yf}),o=Ma.sanitize(s,xd);return t.length<=qr&&_d(t,o),o}const Yf=new ie.Renderer;Yf.html=({text:e})=>Xf(e);function Xf(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function wx(e){const n={work_quotation_extract:"work.traceToolExtract",work_quotation_match:"work.traceToolMatch",work_quotation_fill:"work.traceToolFill",work_quotation_shortage_report:"work.traceToolShortageReport"}[e];return n?g(n):g("work.traceToolFallback",{name:e})}function _x(e){const t=typeof e=="number"?e:Number(e);if(!Number.isFinite(t)||t<0)return"—";if(t<1e3)return`${Math.round(t)} ms`;const n=t/1e3;return n>=10?`${Math.round(n)} s`:`${n.toFixed(1)} s`}function kx(e){if(typeof e!="string"||!e.trim())return"";const t=e.replace(/\\/g,"/"),n=t.split("/").filter(Boolean);return n.length?n[n.length-1]:t}function Sx(e){if(e&&typeof e=="object"&&!Array.isArray(e))return e;if(typeof e!="string"||!e.trim())return null;try{return JSON.parse(e)}catch{return null}}function $x(e){try{return JSON.stringify(e??{},null,2)}catch{return String(e)}}function Ax(e,t){if(!e){const r=typeof t=="string"?t:(()=>{try{return JSON.stringify(t,null,2)}catch{return String(t)}})();return p`
      <p class="muted work-trace__parse-fail">${g("work.traceParseError")}</p>
      <pre class="work-trace__fallback-pre">${r}</pre>
    `}const n=e.markdown,i=[];e.success!==void 0&&i.push(p`<div><span class="work-trace__k">${g("work.traceFieldSuccess")}</span> ${String(e.success)}</div>`),e.rows_count!==void 0&&i.push(p`<div><span class="work-trace__k">${g("work.traceFieldRows")}</span> ${String(e.rows_count)}</div>`),e.filled_count!==void 0&&i.push(p`<div><span class="work-trace__k">${g("work.traceFieldFilled")}</span> ${String(e.filled_count)}</div>`),e.output_path!==void 0&&i.push(p`
      <div>
        <span class="work-trace__k">${g("work.traceFieldOutput")}</span>
        ${kx(e.output_path)}
      </div>
    `),e.summary!==void 0&&typeof e.summary=="string"&&i.push(p`<div><span class="work-trace__k">${g("work.traceFieldSummary")}</span> ${e.summary}</div>`),e.error!=null&&String(e.error).trim()&&i.push(p`<div class="work-trace__err"><span class="work-trace__k">${g("work.traceFieldError")}</span> ${String(e.error)}</div>`);const s=typeof n=="string"&&n.trim().length>0,o=i.length>0;return p`
    ${o?p`<div class="work-trace__summary">${i}</div>`:$}
    ${s?p`
          <div class="work-trace__md markdown-body">${oi(ri(n))}</div>
        `:$}
    ${!o&&!s?p`<pre class="work-trace__json-pre">${JSON.stringify(e,null,2)}</pre>`:$}
  `}function Tx(e,t){if(!e||typeof e!="object")return p`
      <div class="work-trace__card work-trace__card--unknown">
        <span class="work-trace__step-num">${g("work.traceStep",{n:String(t)})}</span>
        <pre class="work-trace__fallback-pre">${JSON.stringify(e)}</pre>
      </div>
    `;const n=e,i=n.type;if(i==="tool_call"){const s=String(n.name??"");return p`
      <div class="work-trace__card work-trace__card--tool">
        <div class="work-trace__card-head">
          <span class="work-trace__step-num">${g("work.traceStep",{n:String(t)})}</span>
          <span class="work-trace__type-tag">${g("work.traceTypeToolCall")}</span>
          <span class="work-trace__tool-name">${wx(s)}</span>
        </div>
        <pre class="work-trace__args-pre">${$x(n.arguments)}</pre>
      </div>
    `}if(i==="observation"){const s=n.content,o=Sx(s);return p`
      <div class="work-trace__card work-trace__card--obs">
        <div class="work-trace__card-head">
          <span class="work-trace__step-num">${g("work.traceStep",{n:String(t)})}</span>
          <span class="work-trace__type-tag">${g("work.traceTypeObservation")}</span>
        </div>
        ${Ax(o,s)}
      </div>
    `}if(i==="metrics"){const s=n.stage!=null?String(n.stage):"—",o=_x(n.duration_ms);return p`
      <div class="work-trace__card work-trace__card--metrics">
        <div class="work-trace__card-head">
          <span class="work-trace__step-num">${g("work.traceStep",{n:String(t)})}</span>
          <span class="work-trace__type-tag">${g("work.traceTypeMetrics")}</span>
        </div>
        <div class="work-trace__metrics-row">
          <span class="work-trace__badge">${s}</span>
          <span class="work-trace__duration">${o}</span>
        </div>
      </div>
    `}return p`
    <div class="work-trace__card work-trace__card--unknown">
      <span class="work-trace__step-num">${g("work.traceStep",{n:String(t)})}</span>
      <pre class="work-trace__fallback-pre">${JSON.stringify(e,null,2)}</pre>
    </div>
  `}function Cx(e){return!Array.isArray(e)||e.length===0?p``:p`
    <div class="work-trace" aria-label=${g("work.traceTimelineTitle")}>
      <div class="work-trace__heading">${g("work.traceTimelineTitle")}</div>
      <ol class="work-trace__list">
        ${e.map((t,n)=>p`<li class="work-trace__li">${Tx(t,n+1)}</li>`)}
      </ol>
      <details class="work-trace__raw">
        <summary class="work-trace__raw-summary">${g("work.traceRawDebug")}</summary>
        <pre class="work-trace__raw-pre">${JSON.stringify(e,null,2)}</pre>
      </details>
    </div>
  `}const Ex=[{value:"FACTORY_INC_TAX",labelKey:"work.priceLevels.FACTORY_INC_TAX"},{value:"FACTORY_EXC_TAX",labelKey:"work.priceLevels.FACTORY_EXC_TAX"},{value:"PURCHASE_EXC_TAX",labelKey:"work.priceLevels.PURCHASE_EXC_TAX"},{value:"A_MARGIN",labelKey:"work.priceLevels.A_MARGIN"},{value:"A_QUOTE",labelKey:"work.priceLevels.A_QUOTE"},{value:"B_MARGIN",labelKey:"work.priceLevels.B_MARGIN"},{value:"B_QUOTE",labelKey:"work.priceLevels.B_QUOTE"},{value:"C_MARGIN",labelKey:"work.priceLevels.C_MARGIN"},{value:"C_QUOTE",labelKey:"work.priceLevels.C_QUOTE"},{value:"D_MARGIN",labelKey:"work.priceLevels.D_MARGIN"},{value:"D_QUOTE",labelKey:"work.priceLevels.D_QUOTE"},{value:"D_LOW",labelKey:"work.priceLevels.D_LOW"},{value:"E_MARGIN",labelKey:"work.priceLevels.E_MARGIN"},{value:"E_QUOTE",labelKey:"work.priceLevels.E_QUOTE"}];function kd(e,t){const n=e!=null&&e.trim()?e.trim().replace(/\/$/,""):"";return n?`${n}${t}`:t}function Sd(e){try{if(typeof e!="string"||!e.trim())return null;const t=e.trim();return t.startsWith("{")&&t.endsWith("}")||t.startsWith("[")&&t.endsWith("]")?JSON.parse(t):null}catch{return null}}function $d(e){if(!Array.isArray(e))return[];const t=[],n=i=>{if(typeof i!="string"||!i.trim())return;const s=i.replace(/\\/g,"/").split("/").filter(Boolean).pop()??"";s&&!t.includes(s)&&t.push(s)};for(const i of e){const s=i,o=s.type,r=s.content;if(o==="observation"&&typeof r=="string"){const a=Sd(r);if(a&&typeof a=="object"){n(a.output_path??a.filled_path);const c=a.result,d=typeof c=="string"?Sd(c):c&&typeof c=="object"?c:null;d&&typeof d=="object"&&n(d.output_path??d.filled_path)}const l=r.match(/[A-Za-z]:[^\s"]+\.xlsx|\/[^\s"]+\.xlsx|[^\s"']+\.xlsx/);l&&l[0]&&n(l[0])}n(s.output_path??s.filled_path)}return t}function Rx(e,t,n){return p`
    <li style="margin-bottom: 14px; padding: 12px; border: 1px solid var(--border); border-radius: 8px;">
      <div style="font-size: 13px; margin-bottom: 8px;">
        ${e.product_name??e.keywords??""}
        ${e.specification?p`<span class="muted"> 路 ${e.specification}</span>`:$}
        ${e.qty!=null?p`<span class="muted"> 路 ${g("work.qty")}: ${e.qty}</span>`:$}
      </div>
      <select
        .value=${t}
        @change=${i=>n(i.target.value)}
        aria-label=${g("work.choiceSelect")}
        style="width: 100%; max-width: 460px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border);"
      >
        <option value="__OOS__">${g("work.choiceOos")}</option>
        ${(e.options??[]).map(i=>p`<option value=${i.code}>${i.code}${i.matched_name?` 路 ${i.matched_name}`:""}${i.unit_price!=null?` 路 ${i.unit_price}`:""}</option>`)}
      </select>
    </li>
  `}function Mx(e){return(e||"").trim().replace(/\\/g,"/").toLowerCase()}function Px(e){var Ye,oe,Pe;const{basePath:t,workFilePaths:n,workOriginalFileNamesByPath:i,workRunning:s,workProgressStage:o,workRunStatus:r,workPendingChoices:a,workSelections:l,workResult:c,workError:d,workCustomerLevel:u,workDoRegisterOos:h,workPendingQuotationDraft:f,workQuotationDraftSaveStatus:m,workTextInput:b,workTextGenerating:v,workTextError:k,workPriceLevelOptions:T,onAddFile:M,onRemoveFile:S,onRenameFileName:C,onWorkTextChange:y,onGenerateFromText:E,onCustomerLevelChange:P,onDoRegisterOosChange:R,onRun:O,onCancel:L,onRetry:N,onSelectionChange:j,onResume:Q,onQuotationLineChange:I,onQuotationDraftSave:z,onQuotationDraftDismiss:X}=e,B=[g("work.stageExtract"),g("work.stageMatch"),g("work.stageFill")],se=(()=>{switch(r){case"idle":return g("work.status.idle");case"running":return g("work.status.running");case"awaiting_choices":return g("work.status.awaitingChoices");case"resuming":return g("work.status.resuming");case"done":return g("work.status.done");case"error":default:return g("work.status.error")}})(),Me=V=>{const Y=kd(t,"/api/quotation/upload?with_summary=0"),de=new FormData;de.append("file",V),fetch(Y,{method:"POST",body:de,credentials:"same-origin"}).then(ye=>ye.json()).then(ye=>{if((ye==null?void 0:ye.success)===!1)return;const it=ye.data??ye;typeof it.file_path=="string"&&M(it.file_path,it.file_name??V.name)}).catch(ye=>{console.warn("[work] upload failed",ye)})},le=V=>{var ye;const Y=V.target,de=(ye=Y.files)==null?void 0:ye[0];de&&(Me(de),Y.value="")},Ke=V=>{var de;V.preventDefault();const Y=(de=V.dataTransfer)==null?void 0:de.files;if(!(!Y||!Y.length))for(let ye=0;ye<Y.length;ye+=1){const it=Y.item(ye);it&&Me(it)}},ce=V=>{V.preventDefault(),V.dataTransfer&&(V.dataTransfer.dropEffect="copy")};return p`
    <section class="card work-quotation" style="margin-bottom: 16px;" aria-label=${g("tabs.work")}>
      <div class="work-quotation__inner">
        <header class="work-quotation__head">
          <div class="card-title">${g("tabs.work")}</div>
          <p class="muted">${g("subtitles.work")}</p>
        </header>

        <div
          class="work-quotation__panel work-quotation__panel--upload"
          @dragover=${ce}
          @dragenter=${ce}
          @drop=${Ke}
        >
          <label class="work-quotation__panel-label">${g("work.uploadTitle")}</label>
          <input
            type="file"
            accept=".xlsx,.xls,.xlsm"
            class="work-quotation__file-input"
            @change=${le}
            aria-label=${g("work.uploadTitle")}
          />
          ${n.length?p`
                <ul class="work-quotation__file-list">
                  ${n.map((V,Y)=>{const de=Mx(V),ye=V.split(/[/\\]/).pop()??V,it=de&&i[de]||ye;return p`
                        <li style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                          <input
                            type="text"
                            .value=${it}
                            @change=${$s=>C(V,$s.target.value)}
                            style="flex: 1 1 auto; min-width: 0; padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border); font-size: 13px; word-break: break-all;"
                            aria-label=${g("work.fileDisplayName")}
                          />
                          <button
                            type="button"
                            class="btn btn-sm"
                            style="padding: 2px 8px;"
                            @click=${()=>S(Y)}
                            aria-label=${g("work.removeFile")}
                          >
                            ${g("work.removeFile")}
                          </button>
                        </li>
                      `})}
                </ul>
              `:p`<p class="muted" style="margin-top: 8px;">${g("work.noFiles")}</p>`}
        </div>

        <div class="work-quotation__panel">
          <label class="work-quotation__panel-label">${g("work.textInputTitle")}</label>
          <p class="muted work-quotation__panel-hint">${g("work.textInputHint")}</p>
          <textarea
            class="work-quotation__textarea"
            .value=${b}
            @input=${V=>y(V.target.value)}
            placeholder=${g("work.textInputPlaceholder")}
            rows="6"
            ?disabled=${v}
            aria-label=${g("work.textInputTitle")}
          ></textarea>
          <div class="work-quotation__text-actions">
            <button
              type="button"
              class="btn"
              style="background: var(--accent); color: var(--bg);"
              ?disabled=${!b.trim()||v}
              @click=${E}
              aria-label=${g("work.generateFromText")}
            >
              ${g(v?"work.textGenerating":"work.generateFromText")}
            </button>
            ${k?p`<span style="color: var(--danger, #c00); font-size: 13px;" role="alert">${k}</span>`:$}
          </div>
        </div>

        <div class="work-quotation__options">
          <div class="work-quotation__customer-level">
            <label>${g("work.customerLevel")}</label>
            ${(()=>{const V=T&&T.length>0?T:Ex.map(Y=>({value:Y.value,label:g(Y.labelKey)}));return p`<select
                .value=${u}
                @change=${Y=>P(Y.target.value)}
                style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 160px;"
                aria-label=${g("work.customerLevel")}
              >
                ${V.map(Y=>p`<option value=${Y.value}>${Y.label}</option>`)}
              </select>`})()}
          </div>
          <label style="display: flex; align-items: center; gap: 6px; font-size: 13px;">
            <input
              type="checkbox"
              ?checked=${h}
              @change=${V=>R(V.target.checked)}
              aria-label=${g("work.registerOos")}
            />
            ${g("work.registerOos")}
          </label>
        </div>

        <div class="work-quotation__run-block">
          ${s?p`
                <div class="work-quotation__stages">
                  ${B.map((V,Y)=>p`
                      <span
                        style="
                        padding: 6px 12px;
                        border-radius: 8px;
                        font-size: 13px;
                        background: ${o>=0&&Y===o?"var(--accent)":"var(--bg-secondary, #eee)"};
                        color: ${o>=0&&Y===o?"var(--bg)":"var(--muted)"};
                      "
                      >
                        ${Y+1}. ${V}
                      </span>
                    `)}
                </div>
                <p class="muted" style="font-size: 12px; margin: 0;">
                  ${g("work.currentStage")}: ${o>=0&&o<B.length?B[o]:g("work.running")}
                </p>
              `:$}

          <div class="work-quotation__actions">
            <div class="work-quotation__action-row">
              <button
                class="btn"
                style="background: var(--accent); color: var(--bg);"
                ?disabled=${n.length===0||s}
                @click=${O}
                aria-label=${g("work.run")}
              >
                ${g(s?"work.running":"work.run")}
              </button>
              ${s?p`<button class="btn btn-sm" @click=${L} aria-label=${g("work.cancel")}>${g("work.cancel")}</button>`:$}
              ${r==="error"?p`<button class="btn btn-sm" @click=${N} aria-label=${g("common.retry")}>${g("common.retry")}</button>`:$}
            </div>
            ${n.length===0?p`<span class="muted work-quotation__status-line">${g("work.runHint")}</span>`:$}
            <span class="muted work-quotation__status-line">${g("work.statusLabel")}: ${se}</span>
          </div>
        </div>

        ${d?p`
              <div class="work-quotation__error-banner" role="alert" aria-live="assertive">
                <p style="margin: 0; color: var(--danger, #e53935); font-size: 13px;">${d}</p>
              </div>
            `:$}
      </div>
    </section>

    ${r==="awaiting_choices"&&a.length?(()=>{const V=r;return p`
            <section class="card work-quotation--follow" style="margin-bottom: 16px;" aria-live="polite">
              <div class="work-quotation__inner">
                <div class="card-title">${g("work.awaitingTitle")}</div>
                <p class="muted" style="margin-bottom: 14px;">${g("work.awaitingHint")}</p>
                <ul style="list-style: none; padding: 0; margin: 0;">
                  ${a.map(Y=>Rx(Y,l[Y.id]??"__OOS__",de=>j(Y.id,de)))}
                </ul>
                <div style="display: flex; gap: 10px; margin-top: 14px; flex-wrap: wrap;">
                  <button class="btn" style="background: var(--accent); color: var(--bg);" ?disabled=${s} @click=${Q}>
                    ${g(s||V==="resuming"?"work.resuming":"work.resume")}
                  </button>
                  ${V==="error"?p`<button class="btn btn-sm" @click=${N}>${g("common.retry")}</button>`:$}
                </div>
              </div>
            </section>
          `})():$}

    ${(m==null?void 0:m.status)==="ok"?p`
          <section class="card work-quotation--follow" style="margin-bottom: 16px;" role="status" aria-live="polite">
            <div class="work-quotation__inner">
              <p style="color: var(--success, #2e7d32); margin: 0 0 4px 0;">${g("work.savedDraftNo",{no:m.draft_no})}</p>
              <p class="muted" style="margin: 0 0 10px 0; font-size: 12px;">${g("work.saveSuccessHint")}</p>
              <button class="btn btn-sm" @click=${X}>${g("common.close")}</button>
            </div>
          </section>
        `:(Ye=f==null?void 0:f.lines)!=null&&Ye.length?p`
            <section class="card work-quotation--follow" style="margin-bottom: 16px;">
              <div class="work-quotation__inner">
                <div class="card-title">${g("work.pendingDraftTitle")}</div>
                <p class="muted" style="margin-bottom: 12px;">${g("work.pendingDraftHint")}</p>
                <div style="overflow-x: auto; margin-bottom: 14px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                  <thead>
                    <tr style="background: var(--bg-secondary, #eee);">
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">#</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("work.lineProduct")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("work.lineSpec")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("work.lineQty")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("work.lineCode")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("work.lineQuoteName")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("work.lineQuoteSpec")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("work.linePrice")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("work.lineAmount")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("work.lineAvailable")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("work.lineShortfall")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("work.lineIsShortage")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${f.lines.map((V,Y)=>p`
                        <tr>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${Y+1}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${V.product_name??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${V.specification??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="number" min="0" step="1" .value=${String(V.qty??"")} @change=${de=>I(Y,"qty",de.target.value)} style="width: 72px;" aria-label=${g("work.lineQty")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="text" .value=${V.code??""} @change=${de=>I(Y,"code",de.target.value)} style="width: 90px;" aria-label=${g("work.lineCode")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="text" .value=${V.quote_name??""} @change=${de=>I(Y,"quote_name",de.target.value)} style="width: 120px;" aria-label=${g("work.lineQuoteName")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="text" .value=${V.quote_spec??""} @change=${de=>I(Y,"quote_spec",de.target.value)} style="width: 120px;" aria-label=${g("work.lineQuoteSpec")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">
                            <input type="number" min="0" step="0.01" .value=${V.unit_price!=null?String(V.unit_price):""} @change=${de=>I(Y,"unit_price",de.target.value)} style="width: 90px;" aria-label=${g("work.linePrice")} />
                          </td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${V.amount!=null?V.amount:""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${V.warehouse_qty??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${V.shortfall??""}</td>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${V.is_shortage?g("common.yes"):g("common.no")}</td>
                        </tr>
                      `)}
                  </tbody>
                </table>
              </div>

              ${(m==null?void 0:m.status)==="error"?p`<p style="color: var(--danger, #c00); margin-bottom: 10px;">${m.error}</p>`:$}

                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                  <button class="btn" style="background: var(--accent); color: var(--bg);" ?disabled=${(m==null?void 0:m.status)==="saving"} @click=${z}>
                    ${(m==null?void 0:m.status)==="saving"?g("work.saving"):g("work.saveDraft")}
                  </button>
                  <button class="btn btn-sm" ?disabled=${(m==null?void 0:m.status)==="saving"} @click=${X}>
                    ${g("common.cancel")}
                  </button>
                </div>
              </div>
            </section>
          `:$}

    ${c&&!((oe=f==null?void 0:f.lines)!=null&&oe.length)?p`
          <section class="card work-quotation--follow">
            <div class="work-quotation__inner">
              <div class="card-title">${g("work.resultTitle")}</div>
              ${$d(c.trace).length?p`
                    <div style="margin-bottom: 14px;">
                      ${$d(c.trace).map(V=>p`
                          <a href=${kd(t,`/api/quotation/download?path=${encodeURIComponent(V)}`)} download=${V} class="btn btn-sm" style="margin-right: 8px; margin-bottom: 6px; text-decoration: none;">
                            ${g("work.download",{name:V})}
                          </a>
                        `)}
                    </div>
                  `:$}

              ${c.answer?p`<div style="white-space: pre-wrap; margin-bottom: 14px;">${c.answer}</div>`:$}
              ${c.error?p`<p style="color: var(--danger, #e53935);">${c.error}</p>`:$}

              ${(Pe=c.trace)!=null&&Pe.length?p`<div style="margin-top: 16px;">${Cx(c.trace)}</div>`:$}
            </div>
          </section>
        `:$}
  `}function zs(e){return(e||"").trim().replace(/\\/g,"/").toLowerCase()}function Dx(e){return e.tab!=="work"?$:Px({basePath:e.basePath,workFilePaths:e.workFilePaths,workRunning:e.workRunning,workProgressStage:e.workProgressStage,workRunStatus:e.workRunStatus,workRunId:e.workRunId,workPendingChoices:e.workPendingChoices,workSelections:e.workSelections,workResult:e.workResult,workError:e.workError,workCustomerLevel:e.workCustomerLevel,workDoRegisterOos:e.workDoRegisterOos,workOriginalFileNamesByPath:e.workOriginalFileNamesByPath,workPendingQuotationDraft:e.workPendingQuotationDraft,workQuotationDraftSaveStatus:e.workQuotationDraftSaveStatus,workTextInput:e.workTextInput,workTextGenerating:e.workTextGenerating,workTextError:e.workTextError,workPriceLevelOptions:e.workPriceLevelOptions,onWorkTextChange:t=>{e.workTextInput=t},onGenerateFromText:()=>{Xv(e)},onAddFile:(t,n)=>{e.workFilePaths.includes(t)||(e.workFilePaths=[...e.workFilePaths,t]);const i=zs(t);i&&(e.workOriginalFileNamesByPath={...e.workOriginalFileNamesByPath,[i]:(n||"").trim()||t.split(/[/\\]/).pop()||t})},onRenameFileName:(t,n)=>{const i=zs(t);if(!i)return;const s=(n||"").trim(),o=t.split(/[/\\]/).pop()||t;e.workOriginalFileNamesByPath={...e.workOriginalFileNamesByPath,[i]:s||o};const r=e.workPendingQuotationDraft;r&&r.file_path&&zs(r.file_path)===i&&(e.workPendingQuotationDraft={...r,name:s||o})},onRemoveFile:t=>{const n=e.workFilePaths[t]??"";e.workFilePaths=e.workFilePaths.filter((s,o)=>o!==t);const i=zs(n);if(i&&e.workOriginalFileNamesByPath[i]!==void 0){const s={...e.workOriginalFileNamesByPath};delete s[i],e.workOriginalFileNamesByPath=s}},onCustomerLevelChange:t=>{e.workCustomerLevel=t},onDoRegisterOosChange:t=>{e.workDoRegisterOos=t},onRun:()=>void Pf(e),onCancel:()=>Qv(e),onRetry:()=>void Yv(e),onSelectionChange:(t,n)=>{e.workSelections={...e.workSelections,[t]:n}},onResume:()=>void Df(e),onQuotationLineChange:(t,n,i)=>{var a;const s=e.workPendingQuotationDraft;if(!((a=s==null?void 0:s.lines)!=null&&a.length)||t<0||t>=s.lines.length)return;const o=s.lines.slice(),r={...o[t]};if(n==="qty"){const l=Number(i);r.qty=Number.isFinite(l)?l:0}else if(n==="unit_price"){const l=String(i??"").trim();if(!l)r.unit_price=null;else{const c=Number(l);r.unit_price=Number.isFinite(c)?c:null}}else r[n]=i;if(n==="qty"||n==="unit_price"){const l=Number(r.qty??0),c=r.unit_price==null?NaN:Number(r.unit_price);r.amount=Number.isFinite(l)&&Number.isFinite(c)?l*c:null}o[t]=r,e.workPendingQuotationDraft={...s,lines:o}},onQuotationDraftSave:()=>{typeof window<"u"&&window.confirm(g("work.saveConfirm"))&&Zv(e).then(t=>{t&&e.loadFulfillDrafts()})},onQuotationDraftDismiss:()=>{e.workPendingQuotationDraft=null,e.workQuotationDraftSaveStatus=null}})}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:Lx}=Ng,Ad=e=>e,Ix=e=>e.strings===void 0,Td=()=>document.createComment(""),ki=(e,t,n)=>{var o;const i=e._$AA.parentNode,s=t===void 0?e._$AB:t._$AA;if(n===void 0){const r=i.insertBefore(Td(),s),a=i.insertBefore(Td(),s);n=new Lx(r,a,e,e.options)}else{const r=n._$AB.nextSibling,a=n._$AM,l=a!==e;if(l){let c;(o=n._$AQ)==null||o.call(n,e),n._$AM=e,n._$AP!==void 0&&(c=e._$AU)!==a._$AU&&n._$AP(c)}if(r!==s||l){let c=n._$AA;for(;c!==r;){const d=Ad(c).nextSibling;Ad(i).insertBefore(c,s),c=d}}}return n},an=(e,t,n=e)=>(e._$AI(t,n),e),Ox={},Fx=(e,t=Ox)=>e._$AH=t,Nx=e=>e._$AH,jr=e=>{e._$AR(),e._$AA.remove()};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Cd=(e,t,n)=>{const i=new Map;for(let s=t;s<=n;s++)i.set(e[s],s);return i},Jf=Rl(class extends Ml{constructor(e){if(super(e),e.type!==El.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,n){let i;n===void 0?n=t:t!==void 0&&(i=t);const s=[],o=[];let r=0;for(const a of e)s[r]=i?i(a,r):r,o[r]=n(a,r),r++;return{values:o,keys:s}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,i]){const s=Nx(e),{values:o,keys:r}=this.dt(t,n,i);if(!Array.isArray(s))return this.ut=r,o;const a=this.ut??(this.ut=[]),l=[];let c,d,u=0,h=s.length-1,f=0,m=o.length-1;for(;u<=h&&f<=m;)if(s[u]===null)u++;else if(s[h]===null)h--;else if(a[u]===r[f])l[f]=an(s[u],o[f]),u++,f++;else if(a[h]===r[m])l[m]=an(s[h],o[m]),h--,m--;else if(a[u]===r[m])l[m]=an(s[u],o[m]),ki(e,l[m+1],s[u]),u++,m--;else if(a[h]===r[f])l[f]=an(s[h],o[f]),ki(e,s[u],s[h]),h--,f++;else if(c===void 0&&(c=Cd(r,f,m),d=Cd(a,u,h)),c.has(a[u]))if(c.has(a[h])){const b=d.get(r[f]),v=b!==void 0?s[b]:null;if(v===null){const k=ki(e,s[u]);an(k,o[f]),l[f]=k}else l[f]=an(v,o[f]),ki(e,s[u],v),s[b]=null;f++}else jr(s[h]),h--;else jr(s[u]),u++;for(;f<=m;){const b=ki(e,l[m+1]);an(b,o[f]),l[f++]=b}for(;u<=h;){const b=s[u++];b!==null&&jr(b)}return this.ut=r,Fx(e,l),Qt}}),ke={messageSquare:p`
    <svg viewBox="0 0 24 24">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  `,barChart:p`
    <svg viewBox="0 0 24 24">
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  `,link:p`
    <svg viewBox="0 0 24 24">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  `,radio:p`
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="2" />
      <path
        d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"
      />
    </svg>
  `,fileText:p`
    <svg viewBox="0 0 24 24">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  `,database:p`
    <svg viewBox="0 0 24 24">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  `,zap:p`
    <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
  `,monitor:p`
    <svg viewBox="0 0 24 24">
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  `,settings:p`
    <svg viewBox="0 0 24 24">
      <path
        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
  `,bug:p`
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
  `,scrollText:p`
    <svg viewBox="0 0 24 24">
      <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
      <path d="M19 17V5a2 2 0 0 0-2-2H4" />
      <path d="M15 8h-5" />
      <path d="M15 12h-5" />
    </svg>
  `,folder:p`
    <svg viewBox="0 0 24 24">
      <path
        d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      />
    </svg>
  `,menu:p`
    <svg viewBox="0 0 24 24">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  `,x:p`
    <svg viewBox="0 0 24 24">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  `,check:p`
    <svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg>
  `,arrowDown:p`
    <svg viewBox="0 0 24 24">
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  `,copy:p`
    <svg viewBox="0 0 24 24">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  `,search:p`
    <svg viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  `,brain:p`
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
  `,book:p`
    <svg viewBox="0 0 24 24">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  `,loader:p`
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
  `,wrench:p`
    <svg viewBox="0 0 24 24">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      />
    </svg>
  `,fileCode:p`
    <svg viewBox="0 0 24 24">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="m10 13-2 2 2 2" />
      <path d="m14 17 2-2-2-2" />
    </svg>
  `,edit:p`
    <svg viewBox="0 0 24 24">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  `,penLine:p`
    <svg viewBox="0 0 24 24">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  `,paperclip:p`
    <svg viewBox="0 0 24 24">
      <path
        d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"
      />
    </svg>
  `,globe:p`
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  `,image:p`
    <svg viewBox="0 0 24 24">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  `,smartphone:p`
    <svg viewBox="0 0 24 24">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  `,plug:p`
    <svg viewBox="0 0 24 24">
      <path d="M12 22v-5" />
      <path d="M9 8V2" />
      <path d="M15 8V2" />
      <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
    </svg>
  `,circle:p`
    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
  `,puzzle:p`
    <svg viewBox="0 0 24 24">
      <path
        d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.076.874.54 1.02 1.02a2.5 2.5 0 1 0 3.237-3.237c-.48-.146-.944-.505-1.02-1.02a.98.98 0 0 1 .303-.917l1.526-1.526A2.402 2.402 0 0 1 11.998 2c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.236 3.236c-.464.18-.894.527-.967 1.02Z"
      />
    </svg>
  `};function Bx(e){var s,o,r,a,l;const t=(s=e.hello)==null?void 0:s.snapshot,n=(r=(o=t==null?void 0:t.sessionDefaults)==null?void 0:o.mainSessionKey)==null?void 0:r.trim();if(n)return n;const i=(l=(a=t==null?void 0:t.sessionDefaults)==null?void 0:a.mainKey)==null?void 0:l.trim();return i||"main"}function zx(e,t){e.sessionKey=t,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:t,lastActiveSessionKey:t})}function Hx(e,t){const n=lf(t,e.basePath);return p`
    <a
      href=${n}
      class="nav-item ${e.tab===t?"active":""}"
      @click=${i=>{if(!(i.defaultPrevented||i.button!==0||i.metaKey||i.ctrlKey||i.shiftKey||i.altKey)){if(i.preventDefault(),t==="chat"){const s=Bx(e);e.sessionKey!==s&&(zx(e,s),e.loadAssistantIdentity())}e.setTab(t)}}}
      title=${va(t)}
    >
      <span class="nav-item__icon" aria-hidden="true">${ke[xy(t)]}</span>
      <span class="nav-item__text">${va(t)}</span>
    </a>
  `}function Ux(e){const t=qx(e.hello,e.sessionsResult),n=Wx(e.sessionKey,e.sessionsResult,t),i=e.onboarding,s=e.onboarding,o=e.onboarding?!1:e.settings.chatShowThinking,r=e.onboarding?!0:e.settings.chatFocusMode,a=p`
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
  `,l=p`
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
  `;return p`
    <div class="chat-controls">
      <label class="field chat-controls__session">
        <select
          .value=${e.sessionKey}
          ?disabled=${!e.connected}
          @change=${c=>{const d=c.target.value;e.sessionKey=d,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:d,lastActiveSessionKey:d}),e.loadAssistantIdentity(),Oy(e,d),si(e)}}
        >
          ${Jf(n,c=>c.key,c=>p`<option value=${c.key} title=${c.key}>
                ${c.displayName??c.key}
              </option>`)}
        </select>
      </label>
      <button
        class="btn btn--sm btn--icon"
        ?disabled=${e.chatLoading||!e.connected}
        @click=${async()=>{const c=e;c.chatManualRefreshInFlight=!0,c.chatNewMessagesBelow=!1,await c.updateComplete,c.resetToolStream();try{await _f(e,{scheduleScroll:!1}),c.scrollToBottom({smooth:!0})}finally{requestAnimationFrame(()=>{c.chatManualRefreshInFlight=!1,c.chatNewMessagesBelow=!1})}}}
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
        ${ke.brain}
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
  `}function qx(e,t){var o,r,a,l,c;const n=e==null?void 0:e.snapshot,i=(r=(o=n==null?void 0:n.sessionDefaults)==null?void 0:o.mainSessionKey)==null?void 0:r.trim();if(i)return i;const s=(l=(a=n==null?void 0:n.sessionDefaults)==null?void 0:a.mainKey)==null?void 0:l.trim();return s||((c=t==null?void 0:t.sessions)!=null&&c.some(d=>d.key==="main")?"main":null)}const co={bluebubbles:"iMessage",telegram:"Telegram",discord:"Discord",signal:"Signal",slack:"Slack",whatsapp:"WhatsApp",matrix:"Matrix",email:"Email",sms:"SMS"},jx=Object.keys(co);function Ed(e){return e.charAt(0).toUpperCase()+e.slice(1)}function Kx(e){if(e==="main"||e==="agent:main:main")return{prefix:"",fallbackName:"Main Session"};if(e.includes(":subagent:"))return{prefix:"Subagent:",fallbackName:"Subagent:"};if(e.includes(":cron:"))return{prefix:"Cron:",fallbackName:"Cron Job:"};const t=e.match(/^agent:[^:]+:([^:]+):direct:(.+)$/);if(t){const i=t[1],s=t[2];return{prefix:"",fallbackName:`${co[i]??Ed(i)} · ${s}`}}const n=e.match(/^agent:[^:]+:([^:]+):group:(.+)$/);if(n){const i=n[1];return{prefix:"",fallbackName:`${co[i]??Ed(i)} Group`}}for(const i of jx)if(e===i||e.startsWith(`${i}:`))return{prefix:"",fallbackName:`${co[i]} Session`};return{prefix:"",fallbackName:e}}function Kr(e,t){var a,l;const n=((a=t==null?void 0:t.label)==null?void 0:a.trim())||"",i=((l=t==null?void 0:t.displayName)==null?void 0:l.trim())||"",{prefix:s,fallbackName:o}=Kx(e),r=c=>s?new RegExp(`^${s.replace(/[.*+?^${}()|[\\]\\]/g,"\\$&")}\\s*`,"i").test(c)?c:`${s} ${c}`:c;return n&&n!==e?r(n):i&&i!==e?r(i):o}function Wx(e,t,n){var a,l;const i=new Set,s=[],o=n&&((a=t==null?void 0:t.sessions)==null?void 0:a.find(c=>c.key===n)),r=(l=t==null?void 0:t.sessions)==null?void 0:l.find(c=>c.key===e);if(n&&(i.add(n),s.push({key:n,displayName:Kr(n,o||void 0)})),i.has(e)||(i.add(e),s.push({key:e,displayName:Kr(e,r)})),t!=null&&t.sessions)for(const c of t.sessions)i.has(c.key)||(i.add(c.key),s.push({key:c.key,displayName:Kr(c.key,c)}));return s}const Vx=["system","light","dark"];function Gx(e){const t=Math.max(0,Vx.indexOf(e.theme)),n=i=>s=>{const r={element:s.currentTarget};(s.clientX||s.clientY)&&(r.pointerClientX=s.clientX,r.pointerClientY=s.clientY),e.setTheme(i,r)};return p`
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
          ${Xx()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="light"?"active":""}"
          @click=${n("light")}
          aria-pressed=${e.theme==="light"}
          aria-label="Light theme"
          title="Light"
        >
          ${Qx()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="dark"?"active":""}"
          @click=${n("dark")}
          aria-pressed=${e.theme==="dark"}
          aria-label="Dark theme"
          title="Dark"
        >
          ${Yx()}
        </button>
      </div>
    </div>
  `}function Qx(){return p`
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
  `}function Yx(){return p`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
      ></path>
    </svg>
  `}function Xx(){return p`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="20" height="14" x="2" y="3" rx="2"></rect>
      <line x1="8" x2="16" y1="21" y2="21"></line>
      <line x1="12" x2="12" y1="17" y2="21"></line>
    </svg>
  `}function Ia(e){var t,n,i;return((t=e.name)==null?void 0:t.trim())||((i=(n=e.identity)==null?void 0:n.name)==null?void 0:i.trim())||e.id}function Hs(e){const t=e.trim();if(!t||t.length>16)return!1;let n=!1;for(let i=0;i<t.length;i+=1)if(t.charCodeAt(i)>127){n=!0;break}return!(!n||t.includes("://")||t.includes("/")||t.includes("."))}function Zf(e,t){var r,a,l,c,d,u;const n=(r=t==null?void 0:t.emoji)==null?void 0:r.trim();if(n&&Hs(n))return n;const i=(l=(a=e.identity)==null?void 0:a.emoji)==null?void 0:l.trim();if(i&&Hs(i))return i;const s=(c=t==null?void 0:t.avatar)==null?void 0:c.trim();if(s&&Hs(s))return s;const o=(u=(d=e.identity)==null?void 0:d.avatar)==null?void 0:u.trim();return o&&Hs(o)?o:""}function ep(e,t){return t&&e===t?"default":null}const Us=[{id:"workspace",label:"Workspace Skills",sources:["openclaw-workspace"]},{id:"built-in",label:"Built-in Skills",sources:["openclaw-bundled"]},{id:"installed",label:"Installed Skills",sources:["openclaw-managed"]},{id:"extra",label:"Extra Skills",sources:["openclaw-extra"]}];function Jx(e){var o;const t=new Map;for(const r of Us)t.set(r.id,{id:r.id,label:r.label,skills:[]});const n=Us.find(r=>r.id==="built-in"),i={id:"other",label:"Other Skills",skills:[]};for(const r of e){const a=r.bundled?n:Us.find(l=>l.sources.includes(r.source));a?(o=t.get(a.id))==null||o.skills.push(r):i.skills.push(r)}const s=Us.map(r=>t.get(r.id)).filter(r=>!!(r&&r.skills.length>0));return i.skills.length>0&&s.push(i),s}function Zx(e){return[...e.missing.bins.map(t=>`bin:${t}`),...e.missing.env.map(t=>`env:${t}`),...e.missing.config.map(t=>`config:${t}`),...e.missing.os.map(t=>`os:${t}`)]}function ew(e){const t=[];return e.disabled&&t.push("disabled"),e.blockedByAllowlist&&t.push("blocked by allowlist"),t}function tw(e){const t=e.skill,n=!!e.showBundledBadge;return p`
    <div class="chip-row" style="margin-top: 6px;">
      <span class="chip">${t.source}</span>
      ${n?p`
              <span class="chip">bundled</span>
            `:$}
      <span class="chip ${t.eligible?"chip-ok":"chip-warn"}">
        ${t.eligible?"eligible":"blocked"}
      </span>
      ${t.disabled?p`
              <span class="chip chip-warn">disabled</span>
            `:$}
    </div>
  `}function nw(e){const{tools:t}=e;return t.length===0?p`
      <section class="card">
        <div class="card-title">Tools</div>
        <div class="muted" style="margin-top: 12px;">暂无已注册工具</div>
      </section>
    `:p`
    <section class="card">
      <div class="card-title">Tools</div>
      <div class="card-sub">${t.length} registered</div>
      <div style="margin-top: 12px; display: flex; flex-direction: column; gap: 4px;">
        ${t.map(n=>iw(n))}
      </div>
    </section>
  `}function iw(e){const t=JSON.stringify(e.parameters,null,2),n=e.description.length>80?e.description.slice(0,80)+"…":e.description;return p`
    <details class="tool-row">
      <summary class="tool-row-summary">
        <span class="mono" style="font-weight: 600; min-width: 220px; display: inline-block;"
          >${e.name}</span
        >
        <span class="muted">${n}</span>
      </summary>
      <pre class="tool-row-params">${t}</pre>
    </details>
  `}function sw(e){var o,r,a,l;const t=((o=e.agentsList)==null?void 0:o.agents)??[],n=((r=e.agentsList)==null?void 0:r.defaultId)??null,i=e.selectedAgentId??n??((a=t[0])==null?void 0:a.id)??null,s=i?t.find(c=>c.id===i)??null:null;return p`
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
        ${e.error?p`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:$}
        <div class="agent-list" style="margin-top: 12px;">
          ${t.length===0?p`
                  <div class="muted">No agents found.</div>
                `:t.map(c=>{const d=ep(c.id,n),u=Zf(c,e.agentIdentityById[c.id]??null);return p`
                    <button
                      type="button"
                      class="agent-row ${i===c.id?"active":""}"
                      @click=${()=>e.onSelectAgent(c.id)}
                    >
                      <div class="agent-avatar">${u||Ia(c).slice(0,1)}</div>
                      <div class="agent-info">
                        <div class="agent-title">${Ia(c)}</div>
                        <div class="agent-sub mono">${c.id}</div>
                      </div>
                      ${d?p`<span class="agent-pill">${d}</span>`:$}
                    </button>
                  `})}
        </div>
      </section>
      <section class="agents-main">
        ${s?p`
                ${ow(s,n,e.agentIdentityById[s.id]??null)}
                ${rw(e.activePanel,c=>e.onSelectPanel(c))}
                ${e.activePanel==="overview"?aw({agentInfo:e.agentInfo,agentInfoLoading:e.agentInfoLoading,agentInfoError:e.agentInfoError}):$}
                ${e.activePanel==="tools"?nw({tools:((l=e.agentInfo)==null?void 0:l.tools)??[]}):$}
              `:p`
                <div class="card">
                  <div class="card-title">Select an agent</div>
                  <div class="card-sub">Pick an agent to inspect its workspace and tools.</div>
                </div>
              `}
      </section>
    </div>
  `}function ow(e,t,n){var a,l;const i=ep(e.id,t),s=Ia(e),o=((l=(a=e.identity)==null?void 0:a.theme)==null?void 0:l.trim())||"Agent workspace and routing.",r=Zf(e,n);return p`
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
        ${i?p`<span class="agent-pill">${i}</span>`:$}
      </div>
    </section>
  `}function rw(e,t){return p`
    <div class="agent-tabs">
      ${[{id:"overview",label:"Overview"},{id:"tools",label:"Tools"}].map(i=>p`
          <button
            class="agent-tab ${e===i.id?"active":""}"
            type="button"
            @click=${()=>t(i.id)}
          >
            ${i.label}
          </button>
        `)}
    </div>
  `}function aw(e){const{agentInfo:t,agentInfoLoading:n,agentInfoError:i}=e;if(n)return p`<section class="card"><div class="muted">Loading…</div></section>`;if(i)return p`<section class="card"><div class="callout danger">${i}</div></section>`;if(!t)return p`<section class="card"><div class="muted">No data.</div></section>`;const{llm:s,health:o,agent:r}=t;return p`
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
          ${s.fallback_configured?p`<div class="mono">${s.fallback_model}</div>`:p`<div class="muted">未配置</div>`}
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
  `}function Rd(e){var t;e&&((t=navigator.clipboard)==null||t.writeText(e).catch(()=>{}))}function lw(e){const{loading:t,saving:n,error:i,content:s,lastSuccessAt:o,dependentFiles:r,onReload:a,onSave:l,onContentChange:c}=e,d=o!=null?new Date(o).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"";return p`
    <section class="card">
      <div class="row" style="justify-content: space-between; align-items: flex-start;">
        <div>
          <div class="card-title">${g("businessKnowledge.title")}</div>
          <div class="card-sub">
            ${g("businessKnowledge.subtitle")}
          </div>
        </div>
        <div class="row" style="gap: 8px; align-items: center;">
          ${d?p`<span class="muted">
                ${g("businessKnowledge.lastSavedAt",{time:d})}
              </span>`:$}
          <button class="btn" ?disabled=${t} @click=${a}>
            ${g(t?"businessKnowledge.actions.reloading":"businessKnowledge.actions.reload")}
          </button>
          <button class="btn btn--primary" ?disabled=${t||n} @click=${()=>l(s)}>
            ${g(n?"businessKnowledge.actions.saving":"businessKnowledge.actions.save")}
          </button>
        </div>
      </div>
      ${i?p`<div class="callout danger" style="margin-top: 12px;">${i}</div>`:$}
      ${r&&(r.mapping_table||r.price_library)?p`
            <div class="callout" style="margin-top: 12px; padding: 12px;">
              <div style="font-weight: 600; margin-bottom: 8px;">
                ${g("businessKnowledge.relatedFiles.title")}
              </div>
              <p class="muted" style="margin: 0 0 10px 0; font-size: 0.9rem;">
                ${g("businessKnowledge.relatedFiles.hint")}
              </p>
              ${r.mapping_table?p`
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; flex-wrap: wrap;">
                      <span style="min-width: 100px;">
                        ${g("businessKnowledge.relatedFiles.mappingTableLabel")}
                      </span>
                      <code style="flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; font-size: 0.85rem;">${r.mapping_table}</code>
                      <button
                        class="btn"
                        style="flex-shrink: 0;"
                        @click=${()=>Rd(r.mapping_table)}
                        title=${g("businessKnowledge.relatedFiles.copyPath")}
                      >
                        ${g("businessKnowledge.relatedFiles.copyPath")}
                      </button>
                    </div>
                  `:$}
              ${r.price_library?p`
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                      <span style="min-width: 100px;">
                        ${g("businessKnowledge.relatedFiles.priceLibraryLabel")}
                      </span>
                      <code style="flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; font-size: 0.85rem;">${r.price_library}</code>
                      <button
                        class="btn"
                        style="flex-shrink: 0;"
                        @click=${()=>Rd(r.price_library)}
                        title=${g("businessKnowledge.relatedFiles.copyPath")}
                      >
                        ${g("businessKnowledge.relatedFiles.copyPath")}
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
          placeholder=${g("businessKnowledge.editor.placeholder")}
        ></textarea>
      </div>
    </section>
  `}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const qi=(e,t)=>{var i;const n=e._$AN;if(n===void 0)return!1;for(const s of n)(i=s._$AO)==null||i.call(s,t,!1),qi(s,t);return!0},Co=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while((n==null?void 0:n.size)===0)},tp=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),uw(t)}};function cw(e){this._$AN!==void 0?(Co(this),this._$AM=e,tp(this)):this._$AM=e}function dw(e,t=!1,n=0){const i=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(t)if(Array.isArray(i))for(let o=n;o<i.length;o++)qi(i[o],!1),Co(i[o]);else i!=null&&(qi(i,!1),Co(i));else qi(this,e)}const uw=e=>{e.type==El.CHILD&&(e._$AP??(e._$AP=dw),e._$AQ??(e._$AQ=cw))};class hw extends Ml{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,n,i){super._$AT(t,n,i),tp(this),this.isConnected=t._$AU}_$AO(t,n=!0){var i,s;t!==this.isConnected&&(this.isConnected=t,t?(i=this.reconnected)==null||i.call(this):(s=this.disconnected)==null||s.call(this)),n&&(qi(this,t),Co(this))}setValue(t){if(Ix(this._$Ct))this._$Ct._$AI(t,this);else{const n=[...this._$Ct._$AH];n[this._$Ci]=t,this._$Ct._$AI(n,this,0)}}disconnected(){}reconnected(){}}const Wr=new WeakMap,fw=Rl(class extends hw{render(e){return $}update(e,[t]){var i;const n=t!==this.G;return n&&this.G!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=(i=e.options)==null?void 0:i.host,this.rt(this.ct=e.element)),$}rt(e){if(this.isConnected||(e=void 0),typeof this.G=="function"){const t=this.ht??globalThis;let n=Wr.get(t);n===void 0&&(n=new WeakMap,Wr.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){var e,t;return typeof this.G=="function"?(e=Wr.get(this.ht??globalThis))==null?void 0:e.get(this.G):(t=this.G)==null?void 0:t.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),pw=new RegExp("\\p{Script=Hebrew}|\\p{Script=Arabic}|\\p{Script=Syriac}|\\p{Script=Thaana}|\\p{Script=Nko}|\\p{Script=Samaritan}|\\p{Script=Mandaic}|\\p{Script=Adlam}|\\p{Script=Phoenician}|\\p{Script=Lydian}","u");function np(e,t=/[\s\p{P}\p{S}]/u){if(!e)return"ltr";for(const n of e)if(!t.test(n))return pw.test(n)?"rtl":"ltr";return"ltr"}const gw=1500,mw=2e3,ip="Copy as markdown",bw="Copied",yw="Copy failed";async function vw(e){if(!e)return!1;try{return await navigator.clipboard.writeText(e),!0}catch{return!1}}function qs(e,t){e.title=t,e.setAttribute("aria-label",t)}function xw(e){const t=e.label??ip;return p`
    <button
      class="chat-copy-btn"
      type="button"
      title=${t}
      aria-label=${t}
      @click=${async n=>{const i=n.currentTarget;if(!i||i.dataset.copying==="1")return;i.dataset.copying="1",i.setAttribute("aria-busy","true"),i.disabled=!0;const s=await vw(e.text());if(i.isConnected){if(delete i.dataset.copying,i.removeAttribute("aria-busy"),i.disabled=!1,!s){i.dataset.error="1",qs(i,yw),window.setTimeout(()=>{i.isConnected&&(delete i.dataset.error,qs(i,t))},mw);return}i.dataset.copied="1",qs(i,bw),window.setTimeout(()=>{i.isConnected&&(delete i.dataset.copied,qs(i,t))},gw)}}}
    >
      <span class="chat-copy-btn__icon" aria-hidden="true">
        <span class="chat-copy-btn__icon-copy">${ke.copy}</span>
        <span class="chat-copy-btn__icon-check">${ke.check}</span>
      </span>
    </button>
  `}function ww(e){return xw({text:()=>e,label:ip})}function Gn(e){const t=e;let n=typeof t.role=="string"?t.role:"unknown";const i=typeof t.toolCallId=="string"||typeof t.tool_call_id=="string",s=t.content,o=Array.isArray(s)?s:null,r=Array.isArray(o)&&o.some(u=>{const h=u,f=(typeof h.type=="string"?h.type:"").toLowerCase();return f==="toolresult"||f==="tool_result"}),a=typeof t.toolName=="string"||typeof t.tool_name=="string";(i||r||a)&&(n="toolResult");let l=[];typeof t.content=="string"?l=[{type:"text",text:t.content}]:Array.isArray(t.content)?l=t.content.map(u=>({type:u.type||"text",text:u.text,name:u.name,args:u.args||u.arguments})):typeof t.text=="string"&&(l=[{type:"text",text:t.text}]);const c=typeof t.timestamp=="number"?t.timestamp:Date.now(),d=typeof t.id=="string"?t.id:void 0;return{role:n,content:l,timestamp:c,id:d}}function tr(e){const t=e.toLowerCase();return e==="user"||e==="User"?e:e==="assistant"?"assistant":e==="system"?"system":t==="toolresult"||t==="tool_result"||t==="tool"||t==="function"?"tool":e}function sp(e){const t=e,n=typeof t.role=="string"?t.role.toLowerCase():"";return n==="toolresult"||n==="tool_result"}function _w(e){return(e??"").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())||"Tool"}function kw(e){const t=(e??"").trim();return t?t.replace(/\s+/g,"_").toLowerCase():""}function Sw(e){return(e??"").trim().toLowerCase()||"use"}const $w={icon:"puzzle",detailKeys:["command","path","url","targetUrl","targetId","ref","element","node","nodeId","id","requestId","to","channelId","guildId","userId","name","query","pattern","messageId"]},Aw={bash:{icon:"wrench",title:"Bash",detailKeys:["command"]},process:{icon:"wrench",title:"Process",detailKeys:["sessionId"]},read:{icon:"fileText",title:"Read",detailKeys:["path"]},write:{icon:"edit",title:"Write",detailKeys:["path"]},edit:{icon:"penLine",title:"Edit",detailKeys:["path"]},attach:{icon:"paperclip",title:"Attach",detailKeys:["path","url","fileName"]},browser:{icon:"globe",title:"Browser",actions:{status:{label:"status"},start:{label:"start"},stop:{label:"stop"},tabs:{label:"tabs"},open:{label:"open",detailKeys:["targetUrl"]},focus:{label:"focus",detailKeys:["targetId"]},close:{label:"close",detailKeys:["targetId"]},snapshot:{label:"snapshot",detailKeys:["targetUrl","targetId","ref","element","format"]},screenshot:{label:"screenshot",detailKeys:["targetUrl","targetId","ref","element"]},navigate:{label:"navigate",detailKeys:["targetUrl","targetId"]},console:{label:"console",detailKeys:["level","targetId"]},pdf:{label:"pdf",detailKeys:["targetId"]},upload:{label:"upload",detailKeys:["paths","ref","inputRef","element","targetId"]},dialog:{label:"dialog",detailKeys:["accept","promptText","targetId"]},act:{label:"act",detailKeys:["request.kind","request.ref","request.selector","request.text","request.value"]}}},canvas:{icon:"image",title:"Canvas",actions:{present:{label:"present",detailKeys:["target","node","nodeId"]},hide:{label:"hide",detailKeys:["node","nodeId"]},navigate:{label:"navigate",detailKeys:["url","node","nodeId"]},eval:{label:"eval",detailKeys:["javaScript","node","nodeId"]},snapshot:{label:"snapshot",detailKeys:["format","node","nodeId"]},a2ui_push:{label:"A2UI push",detailKeys:["jsonlPath","node","nodeId"]},a2ui_reset:{label:"A2UI reset",detailKeys:["node","nodeId"]}}},nodes:{icon:"smartphone",title:"Nodes",actions:{status:{label:"status"},describe:{label:"describe",detailKeys:["node","nodeId"]},pending:{label:"pending"},approve:{label:"approve",detailKeys:["requestId"]},reject:{label:"reject",detailKeys:["requestId"]},notify:{label:"notify",detailKeys:["node","nodeId","title","body"]},camera_snap:{label:"camera snap",detailKeys:["node","nodeId","facing","deviceId"]},camera_list:{label:"camera list",detailKeys:["node","nodeId"]},camera_clip:{label:"camera clip",detailKeys:["node","nodeId","facing","duration","durationMs"]},screen_record:{label:"screen record",detailKeys:["node","nodeId","duration","durationMs","fps","screenIndex"]}}},cron:{icon:"loader",title:"Cron",actions:{status:{label:"status"},list:{label:"list"},add:{label:"add",detailKeys:["job.name","job.id","job.schedule","job.cron"]},update:{label:"update",detailKeys:["id"]},remove:{label:"remove",detailKeys:["id"]},run:{label:"run",detailKeys:["id"]},runs:{label:"runs",detailKeys:["id"]},wake:{label:"wake",detailKeys:["text","mode"]}}},gateway:{icon:"plug",title:"Gateway",actions:{restart:{label:"restart",detailKeys:["reason","delayMs"]},"config.get":{label:"config get"},"config.schema":{label:"config schema"},"config.apply":{label:"config apply",detailKeys:["restartDelayMs"]},"update.run":{label:"update run",detailKeys:["restartDelayMs"]}}},whatsapp_login:{icon:"circle",title:"WhatsApp Login",actions:{start:{label:"start"},wait:{label:"wait"}}},discord:{icon:"messageSquare",title:"Discord",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sticker:{label:"sticker",detailKeys:["to","stickerIds"]},poll:{label:"poll",detailKeys:["question","to"]},permissions:{label:"permissions",detailKeys:["channelId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},threadCreate:{label:"thread create",detailKeys:["channelId","name"]},threadList:{label:"thread list",detailKeys:["guildId","channelId"]},threadReply:{label:"thread reply",detailKeys:["channelId","content"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},searchMessages:{label:"search",detailKeys:["guildId","content"]},memberInfo:{label:"member",detailKeys:["guildId","userId"]},roleInfo:{label:"roles",detailKeys:["guildId"]},emojiList:{label:"emoji list",detailKeys:["guildId"]},roleAdd:{label:"role add",detailKeys:["guildId","userId","roleId"]},roleRemove:{label:"role remove",detailKeys:["guildId","userId","roleId"]},channelInfo:{label:"channel",detailKeys:["channelId"]},channelList:{label:"channels",detailKeys:["guildId"]},voiceStatus:{label:"voice",detailKeys:["guildId","userId"]},eventList:{label:"events",detailKeys:["guildId"]},eventCreate:{label:"event create",detailKeys:["guildId","name"]},timeout:{label:"timeout",detailKeys:["guildId","userId"]},kick:{label:"kick",detailKeys:["guildId","userId"]},ban:{label:"ban",detailKeys:["guildId","userId"]}}},slack:{icon:"messageSquare",title:"Slack",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},memberInfo:{label:"member",detailKeys:["userId"]},emojiList:{label:"emoji list"}}}},Tw={fallback:$w,tools:Aw},op=Tw,Md=op.fallback??{icon:"puzzle"},Cw=op.tools??{};function Ew(e){if(!e)return e;const t=[{re:/^\/Users\/[^/]+(\/|$)/,replacement:"~$1"},{re:/^\/home\/[^/]+(\/|$)/,replacement:"~$1"},{re:/^C:\\Users\\[^\\]+(\\|$)/i,replacement:"~$1"}];for(const n of t)if(n.re.test(e))return e.replace(n.re,n.replacement);return e}function Rw(e){const t=kw(e.name),n=t.toLowerCase(),i=Cw[n],s=(i==null?void 0:i.icon)??Md.icon??"puzzle",o=(i==null?void 0:i.title)??_w(t),r=(i==null?void 0:i.label)??o,a=e.args&&typeof e.args=="object"?e.args.action:void 0,l=typeof a=="string"?a.trim():void 0,c=n==="web_search"?"search":n==="web_fetch"?"fetch":n.replace(/_/g," ").replace(/\./g," "),d=Sw(l??c);let u;n==="exec"&&(u=void 0),!u&&n==="read"&&(u=void 0),!u&&(n==="write"||n==="edit"||n==="attach")&&(u=void 0),!u&&n==="web_search"&&(u=void 0),!u&&n==="web_fetch"&&(u=void 0);const h=(i==null?void 0:i.detailKeys)??Md.detailKeys??[];return!u&&h.length>0&&(u=void 0),!u&&e.meta&&(u=e.meta),u&&(u=Ew(u)),{name:t,icon:s,title:o,label:r,verb:d,detail:u}}function Mw(e){if(e.detail){if(e.detail.includes(" · ")){const t=e.detail.split(" · ").map(n=>n.trim()).filter(n=>n.length>0).join(", ");return t?`with ${t}`:void 0}return e.detail}}const Pw=80,Dw=2,Pd=100;function Lw(e){const t=e.trim();if(t.startsWith("{")||t.startsWith("["))try{const n=JSON.parse(t);return"```json\n"+JSON.stringify(n,null,2)+"\n```"}catch{}return e}function Iw(e){const t=e.split(`
`),n=t.slice(0,Dw),i=n.join(`
`);return i.length>Pd?i.slice(0,Pd)+"…":n.length<t.length?i+"…":i}function Ow(e){const t=e,n=Fw(t.content),i=[];for(const s of n){const o=(typeof s.type=="string"?s.type:"").toLowerCase();(["toolcall","tool_call","tooluse","tool_use"].includes(o)||typeof s.name=="string"&&s.arguments!=null)&&i.push({kind:"call",name:s.name??"tool",args:Nw(s.arguments??s.args)})}for(const s of n){const o=(typeof s.type=="string"?s.type:"").toLowerCase();if(o!=="toolresult"&&o!=="tool_result")continue;const r=Bw(s),a=typeof s.name=="string"?s.name:"tool";i.push({kind:"result",name:a,text:r})}if(sp(e)&&!i.some(s=>s.kind==="result")){const s=typeof t.toolName=="string"&&t.toolName||typeof t.tool_name=="string"&&t.tool_name||"tool",o=Ui(e)??void 0;i.push({kind:"result",name:s,text:o})}return i}function Dd(e,t){var u,h;const n=Rw({name:e.name,args:e.args}),i=Mw(n),s=!!((u=e.text)!=null&&u.trim()),o=!!t,r=o?()=>{if(s){t(Lw(e.text));return}const f=`## ${n.label}

${i?`**Command:** \`${i}\`

`:""}*No output — tool completed successfully.*`;t(f)}:void 0,a=s&&(((h=e.text)==null?void 0:h.length)??0)<=Pw,l=s&&!a,c=s&&a,d=!s;return p`
    <div
      class="chat-tool-card ${o?"chat-tool-card--clickable":""}"
      @click=${r}
      role=${o?"button":$}
      tabindex=${o?"0":$}
      @keydown=${o?f=>{f.key!=="Enter"&&f.key!==" "||(f.preventDefault(),r==null||r())}:$}
    >
      <div class="chat-tool-card__header">
        <div class="chat-tool-card__title">
          <span class="chat-tool-card__icon">${ke[n.icon]}</span>
          <span>${n.label}</span>
        </div>
        ${o?p`<span class="chat-tool-card__action">${s?"View":""} ${ke.check}</span>`:$}
        ${d&&!o?p`<span class="chat-tool-card__status">${ke.check}</span>`:$}
      </div>
      ${i?p`<div class="chat-tool-card__detail">${i}</div>`:$}
      ${d?p`
              <div class="chat-tool-card__status-text muted">Completed</div>
            `:$}
      ${l?p`<div class="chat-tool-card__preview mono">${Iw(e.text)}</div>`:$}
      ${c?p`<div class="chat-tool-card__inline mono">${e.text}</div>`:$}
    </div>
  `}function Fw(e){return Array.isArray(e)?e.filter(Boolean):[]}function Nw(e){if(typeof e!="string")return e;const t=e.trim();if(!t||!t.startsWith("{")&&!t.startsWith("["))return e;try{return JSON.parse(t)}catch{return e}}function Bw(e){if(typeof e.text=="string")return e.text;if(typeof e.content=="string")return e.content}function zw(e){const n=e.content,i=[];if(!Array.isArray(n))return i;for(const s of n){if(typeof s!="object"||s===null)continue;const o=s;if(o.type!=="file"||typeof o.file_name!="string")continue;const r=o.summaryMeta;i.push({file_name:o.file_name,file_path:typeof o.file_path=="string"?o.file_path:void 0,rows_count:r==null?void 0:r.rows_count,preview_count:r==null?void 0:r.preview_count,truncated:r==null?void 0:r.truncated})}return i}function Hw(e){const n=e.content,i=[];if(Array.isArray(n))for(const s of n){if(typeof s!="object"||s===null)continue;const o=s;if(o.type==="image"){const r=o.source;if((r==null?void 0:r.type)==="base64"&&typeof r.data=="string"){const a=r.data,l=r.media_type||"image/png",c=a.startsWith("data:")?a:`data:${l};base64,${a}`;i.push({url:c})}else typeof o.url=="string"&&i.push({url:o.url})}else if(o.type==="image_url"){const r=o.image_url;typeof(r==null?void 0:r.url)=="string"&&i.push({url:r.url})}}return i}function Uw(e){return p`
    <div class="chat-group assistant">
      ${ws("assistant",e)}
      <div class="chat-group-messages">
        <div class="chat-bubble chat-reading-indicator" aria-hidden="true">
          <span class="chat-reading-indicator__dots">
            <span></span><span></span><span></span>
          </span>
        </div>
      </div>
    </div>
  `}function qw(e,t,n,i){const s=new Date(t).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}),o=(i==null?void 0:i.name)??"Assistant";return p`
    <div class="chat-group assistant">
      ${ws("assistant",i)}
      <div class="chat-group-messages">
        ${rp({role:"assistant",content:[{type:"text",text:e}],timestamp:t},{isStreaming:!0,showReasoning:!1},n)}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${o}</span>
          <span class="chat-group-timestamp">${s}</span>
        </div>
      </div>
    </div>
  `}function jw(e,t){const n=tr(e.role),i=t.assistantName??"Assistant",s=n==="user"?"You":n==="assistant"?i:n,o=n==="user"?"user":n==="assistant"?"assistant":"other",r=new Date(e.timestamp).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return p`
    <div class="chat-group ${o}">
      ${ws(e.role,{name:i,avatar:t.assistantAvatar??null})}
      <div class="chat-group-messages">
        ${e.messages.map((a,l)=>rp(a.message,{isStreaming:e.isStreaming&&l===e.messages.length-1,showReasoning:t.showReasoning},t.onOpenSidebar))}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${s}</span>
          <span class="chat-group-timestamp">${r}</span>
        </div>
      </div>
    </div>
  `}function ws(e,t){var a,l;const n=tr(e),i=((a=t==null?void 0:t.name)==null?void 0:a.trim())||"Assistant",s=((l=t==null?void 0:t.avatar)==null?void 0:l.trim())||"",o=n==="user"?"U":n==="assistant"?i.charAt(0).toUpperCase()||"A":n==="tool"?"⚙":"?",r=n==="user"?"user":n==="assistant"?"assistant":n==="tool"?"tool":"other";return s&&n==="assistant"?Kw(s)?p`<img
        class="chat-avatar ${r}"
        src="${s}"
        alt="${i}"
      />`:p`<div class="chat-avatar ${r}">${s}</div>`:p`<div class="chat-avatar ${r}">${o}</div>`}function Kw(e){return/^https?:\/\//i.test(e)||/^data:image\//i.test(e)||e.startsWith("/")}function Ww(e){return e.length===0?$:p`
    <div class="chat-message-images">
      ${e.map(t=>p`
          <img
            src=${t.url}
            alt=${t.alt??"Attached image"}
            class="chat-message-image"
            @click=${()=>window.open(t.url,"_blank")}
          />
        `)}
    </div>
  `}function Vw(e){return e.length===0?$:p`
    <div class="chat-message-files">
      ${e.map(t=>p`
          <span class="chat-message-file" title=${t.file_path??t.file_name}>
            <span class="chat-message-file__name">${t.file_name}</span>
            ${[t.rows_count!=null?`rows=${t.rows_count}`:"",t.preview_count!=null?`preview=${t.preview_count}`:"",t.truncated?"…truncated":""].filter(Boolean).length?p`<span class="chat-message-file__meta">
                  ${[t.rows_count!=null?`rows=${t.rows_count}`:"",t.preview_count!=null?`preview=${t.preview_count}`:"",t.truncated?"…truncated":""].filter(Boolean).join(" / ")}
                </span>`:$}
          </span>
        `)}
    </div>
  `}function rp(e,t,n){const i=e,s=typeof i.role=="string"?i.role:"unknown",o=sp(e)||s.toLowerCase()==="toolresult"||s.toLowerCase()==="tool_result"||typeof i.toolCallId=="string"||typeof i.tool_call_id=="string",r=Ow(e),a=r.length>0,l=Hw(e),c=l.length>0,d=zw(e),u=d.length>0,h=Ui(e),f=t.showReasoning&&s==="assistant"?Jy(e):null,m=h!=null&&h.trim()?h:null,b=f?ev(f):null,v=tr(s)==="user",k=!!(m&&v&&tv(m)),T=k&&m?nv(m):m,M=s==="assistant"&&!!(T!=null&&T.trim()),S=["chat-bubble",M?"has-copy":"",t.isStreaming?"streaming":"","fade-in"].filter(Boolean).join(" ");return!T&&a&&o?p`${r.map(C=>Dd(C,n))}`:!T&&!b&&!a&&!c&&!u?$:p`
    <div class="${S}">
      ${M?ww(T):$}
      ${Ww(l)}
      ${k&&l.length>0?p`<span class="chat-ocr-badge">已识别 ✓</span>`:$}
      ${Vw(d)}
      ${b?p`<div class="chat-thinking">${oi(ri(b))}</div>`:$}
      ${T?p`<div class="chat-text" dir="${np(T)}">${oi(ri(T))}</div>`:$}
      ${r.map(C=>Dd(C,n))}
    </div>
  `}function Gw(e){return p`
    <div class="sidebar-panel">
      <div class="sidebar-header">
        <div class="sidebar-title">Tool Output</div>
        <button @click=${e.onClose} class="btn" title="Close sidebar">
          ${ke.x}
        </button>
      </div>
      <div class="sidebar-content">
        ${e.error?p`
              <div class="callout danger">${e.error}</div>
              <button @click=${e.onViewRawText} class="btn" style="margin-top: 12px;">
                View Raw Text
              </button>
            `:e.content?p`<div class="sidebar-markdown">${oi(ri(e.content))}</div>`:p`
                  <div class="muted">No content available</div>
                `}
      </div>
    </div>
  `}var Qw=Object.defineProperty,Yw=Object.getOwnPropertyDescriptor,nr=(e,t,n,i)=>{for(var s=i>1?void 0:i?Yw(t,n):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(s=(i?r(t,n,s):r(s))||s);return i&&s&&Qw(t,n,s),s};let ai=class extends Kt{constructor(){super(...arguments),this.splitRatio=.6,this.minRatio=.4,this.maxRatio=.7,this.isDragging=!1,this.startX=0,this.startRatio=0,this.handleMouseDown=e=>{this.isDragging=!0,this.startX=e.clientX,this.startRatio=this.splitRatio,this.classList.add("dragging"),document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),e.preventDefault()},this.handleMouseMove=e=>{if(!this.isDragging)return;const t=this.parentElement;if(!t)return;const n=t.getBoundingClientRect().width,s=(e.clientX-this.startX)/n;let o=this.startRatio+s;o=Math.max(this.minRatio,Math.min(this.maxRatio,o)),this.dispatchEvent(new CustomEvent("resize",{detail:{splitRatio:o},bubbles:!0,composed:!0}))},this.handleMouseUp=()=>{this.isDragging=!1,this.classList.remove("dragging"),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}}render(){return $}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}};ai.styles=Za`
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
  `;nr([_t({type:Number})],ai.prototype,"splitRatio",2);nr([_t({type:Number})],ai.prototype,"minRatio",2);nr([_t({type:Number})],ai.prototype,"maxRatio",2);ai=nr([Ho("resizable-divider")],ai);const Xw=5e3,Vr=5,Jw=/\.(xlsx|xls|xlsm|pdf)$/i;function Zw(e){return Number.isFinite(e)?Number.isInteger(e)?String(e):e.toFixed(2):"—"}function e_(e,t){const n=e.candidates,i=n.length,s=n.slice(0,Vr),o=i>Vr?i-Vr:0;return p`
    <div class="chat-group assistant">
      ${ws("assistant",t)}
      <div class="chat-group-messages">
        <div class="chat-tool-render chat-candidates-preview" role="status" aria-live="polite">
          <div class="candidates-preview-card">
            <div class="candidates-preview-card__title">
              ${ke.search}
              <span>${g("chat.ui.candidatesPreview.query",{keywords:e.keywords||"—"})}</span>
            </div>
            <table class="candidates-preview-card__table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>${g("chat.ui.candidatesPreview.colCode")}</th>
                  <th>${g("chat.ui.candidatesPreview.colName")}</th>
                  <th>${g("chat.ui.candidatesPreview.colPrice")}</th>
                </tr>
              </thead>
              <tbody>
                ${s.map((r,a)=>p`
                    <tr>
                      <td>${a+1}</td>
                      <td>${r.code}</td>
                      <td>${r.matched_name}</td>
                      <td>${Zw(r.unit_price)}</td>
                    </tr>
                  `)}
              </tbody>
            </table>
            ${o>0?p`<p class="candidates-preview-card__more">
                  ${g("chat.ui.candidatesPreview.more",{n:String(o)})}
                </p>`:$}
            <div class="candidates-preview-card__status">
              ${ke.loader}
              <span>${g("chat.ui.candidatesPreview.selecting",{n:String(i)})}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}function t_(e){for(let t=0;t<e.length;t++)if(Jw.test(e[t].name))return e[t];return null}function Ld(e){e.style.height="auto",e.style.height=`${e.scrollHeight}px`}function n_(e){return e?e.active?p`
      <div class="compaction-indicator compaction-indicator--active" role="status" aria-live="polite">
        ${ke.loader} ${g("chat.ui.compaction.active")}
      </div>
    `:e.completedAt&&Date.now()-e.completedAt<Xw?p`
        <div class="compaction-indicator compaction-indicator--complete" role="status" aria-live="polite">
          ${ke.check} ${g("chat.ui.compaction.done")}
        </div>
      `:$:$}function i_(){return`att-${Date.now()}-${Math.random().toString(36).slice(2,9)}`}function s_(e,t){var s;const n=(s=e.clipboardData)==null?void 0:s.items;if(!n||!t.onAttachmentsChange)return;const i=[];for(let o=0;o<n.length;o++){const r=n[o];r.type.startsWith("image/")&&i.push(r)}if(i.length!==0){e.preventDefault();for(const o of i){const r=o.getAsFile();if(!r)continue;const a=new FileReader;a.addEventListener("load",()=>{var u;const l=a.result,c={id:i_(),dataUrl:l,mimeType:r.type},d=t.attachments??[];(u=t.onAttachmentsChange)==null||u.call(t,[...d,c])}),a.readAsDataURL(r)}}}function o_(e){const t=e.attachments??[];return t.length===0?$:p`
    <div class="chat-attachments">
      ${t.map(n=>p`
          <div class="chat-attachment">
            <img
              src=${n.dataUrl}
              alt=${g("chat.ui.attachments.previewAlt")}
              class="chat-attachment__img"
            />
            <button
              class="chat-attachment__remove"
              type="button"
              aria-label=${g("chat.ui.attachments.remove")}
              @click=${()=>{var s;const i=(e.attachments??[]).filter(o=>o.id!==n.id);(s=e.onAttachmentsChange)==null||s.call(e,i)}}
            >
              ${ke.x}
            </button>
          </div>
        `)}
    </div>
  `}function r_(e){const t=e.uploadedFile,n=e.onFileSelect,i=e.onClearUploadedFile;if(t!=null&&t.file_name){const s=t.summaryMeta;return p`
      <div class="chat-uploaded-file">
        <span class="chat-uploaded-file__name" title=${t.file_path}>${t.file_name}</span>
        <button
          type="button"
          class="btn chat-uploaded-file__clear"
          aria-label=${g("chat.ui.upload.remove")}
          @click=${i}
        >
          ${ke.x}
        </button>
        ${s?p`<span class="chat-uploaded-file__meta">
              ${[s.rows_count!=null?`rows=${s.rows_count}`:"",s.preview_count!=null?`preview=${s.preview_count}`:"",s.truncated?"…truncated":""].filter(Boolean).join(" / ")}
            </span>`:$}
      </div>
    `}return!n||!e.connected?$:p`
    <div class="chat-uploaded-file-row">
      <input
        type="file"
        accept=".xlsx,.xls,.xlsm,.pdf"
        aria-label=${g("chat.ui.upload.label")}
        class="chat-uploaded-file-input"
        @change=${async s=>{var a;const o=s.target,r=(a=o.files)==null?void 0:a[0];r&&(await n(r),o.value="")}}
      />
      <button
        type="button"
        class="btn chat-upload-file-btn"
        @click=${s=>{var o,r;return(r=(o=s.currentTarget.parentElement)==null?void 0:o.querySelector("input[type=file]"))==null?void 0:r.click()}}
      >
        ${g("chat.ui.upload.button")}
      </button>
    </div>
  `}function a_(e){var v,k,T,M;const t=e.connected,n=e.sending||e.stream!==null,i=!!(e.canAbort&&e.onAbort),s=(k=(v=e.sessions)==null?void 0:v.sessions)==null?void 0:k.find(S=>S.key===e.sessionKey),o=e.showThinking&&(s==null?void 0:s.reasoningLevel)!=="off",r={name:e.assistantName,avatar:e.assistantAvatar??e.assistantAvatarUrl??null},a=(((T=e.attachments)==null?void 0:T.length)??0)>0;(M=e.uploadedFile)!=null&&M.file_name;const l=e.connected?g(a?"chat.ui.compose.placeholder.withImages":"chat.ui.compose.placeholder.default"):g("chat.ui.compose.placeholder.disconnected"),c=e.splitRatio??.6,d=!!(e.sidebarOpen&&e.onCloseSidebar),u=p`
    <div
      class="chat-thread"
      role="log"
      aria-live="polite"
      @scroll=${e.onChatScroll}
    >
      ${e.loading?p`
              <div class="muted">Loading chat…</div>
            `:$}
      ${Jf(c_(e),S=>S.key,S=>S.kind==="divider"?p`
              <div class="chat-divider" role="separator" data-ts=${String(S.timestamp)}>
                <span class="chat-divider__line"></span>
                <span class="chat-divider__label">${S.label}</span>
                <span class="chat-divider__line"></span>
              </div>
            `:S.kind==="reading-indicator"?Uw(r):S.kind==="stream"?qw(S.text,S.startedAt,e.onOpenSidebar,r):S.kind==="candidates-preview"?e_(S.preview,r):S.kind==="ocr-result"?p`
              <div class="chat-group assistant">
                ${ws("assistant",r)}
                <div class="chat-group-messages">
                  <div class="chat-ocr-card" role="region" aria-label="OCR">
                    <div class="chat-ocr-card__label">📄 图片识别结果</div>
                    <div class="chat-ocr-card__body">
                      ${oi(ri(S.card.text))}
                    </div>
                  </div>
                </div>
              </div>
            `:S.kind==="group"?jw(S,{onOpenSidebar:e.onOpenSidebar,showReasoning:o,assistantName:e.assistantName,assistantAvatar:r.avatar}):$)}
    </div>
  `,h=S=>{var C;S.preventDefault(),S.stopPropagation(),S.dataTransfer&&(S.dataTransfer.dropEffect="copy"),(C=e.onComposeDragOver)==null||C.call(e)},f=S=>{var C;S.preventDefault(),S.stopPropagation(),S.dataTransfer&&(S.dataTransfer.dropEffect="copy"),(C=e.onComposeDragOver)==null||C.call(e)},m=S=>{var E;const C=S.currentTarget,y=S.relatedTarget;y!=null&&(C.contains(y)||(E=e.onComposeDragLeave)==null||E.call(e))},b=S=>{var y,E,P;S.preventDefault(),S.stopPropagation(),(y=e.onComposeDragLeave)==null||y.call(e);const C=(P=(E=S.dataTransfer)==null?void 0:E.files)!=null&&P.length?t_(S.dataTransfer.files):null;C&&e.onComposeDrop&&e.onComposeDrop(C)};return p`
    <section
      class="card chat ${e.composeDragOver?"chat--drag-over":""}"
      @dragenter=${h}
      @dragover=${f}
      @dragleave=${m}
      @drop=${b}
    >
      ${e.disabledReason?p`<div class="callout">${e.disabledReason}</div>`:$}

      ${e.error?p`<div class="callout danger">${e.error}</div>`:$}

      ${e.focusMode?p`
            <button
              class="chat-focus-exit"
              type="button"
              @click=${e.onToggleFocusMode}
              aria-label=${g("chat.ui.compose.exitFocus")}
              title=${g("chat.ui.compose.exitFocus")}
            >
              ${ke.x}
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

        ${d?p`
              <resizable-divider
                .splitRatio=${c}
                @resize=${S=>{var C;return(C=e.onSplitRatioChange)==null?void 0:C.call(e,S.detail.splitRatio)}}
              ></resizable-divider>
              <div class="chat-sidebar">
                ${Gw({content:e.sidebarContent??null,error:e.sidebarError??null,onClose:e.onCloseSidebar,onViewRawText:()=>{!e.sidebarContent||!e.onOpenSidebar||e.onOpenSidebar(`\`\`\`
${e.sidebarContent}
\`\`\``)}})}
              </div>
            `:$}
      </div>

      ${e.queue.length?p`
            <div class="chat-queue" role="status" aria-live="polite">
              <div class="chat-queue__title">
                ${g("chat.ui.queue.title",{count:String(e.queue.length)})}
              </div>
              <div class="chat-queue__list">
                ${e.queue.map(S=>{var C;return p`
                    <div class="chat-queue__item">
                      <div class="chat-queue__text">
                        ${(C=S.attachments)!=null&&C.length?p`<span class="chat-queue__ocr-status">🔍 识别中…</span>`:S.text||""}
                      </div>
                      <button
                        class="btn chat-queue__remove"
                        type="button"
                        aria-label=${g("chat.ui.queue.remove")}
                        @click=${()=>e.onQueueRemove(S.id)}
                      >
                        ${ke.x}
                      </button>
                    </div>
                  `})}
              </div>
            </div>
          `:$}

      ${n_(e.compactionStatus)}

      ${e.showNewMessages?p`
            <button
              class="btn chat-new-messages"
              type="button"
              @click=${e.onScrollToBottom}
            >
              ${g("chat.ui.compose.newMessages")} ${ke.arrowDown}
            </button>
          `:$}

      <div class="chat-compose ${e.composeDragOver?"chat-compose--drag-over":""}">
        ${e.composeDragOver?p`<div class="chat-compose__drop-hint">
              ${g("chat.ui.compose.dropHint")}
            </div>`:$}
        ${o_(e)}
        ${r_(e)}
        <div class="chat-compose__row">
          <label class="field chat-compose__field">
            <span>${g("chat.ui.compose.label")}</span>
            <textarea
              ${fw(S=>S&&Ld(S))}
              .value=${e.draft}
              dir=${np(e.draft)}
              ?disabled=${!e.connected}
              @keydown=${S=>{S.key==="Enter"&&(S.isComposing||S.keyCode===229||S.shiftKey||e.connected&&(S.preventDefault(),t&&e.onSend()))}}
              @input=${S=>{const C=S.target;Ld(C),e.onDraftChange(C.value)}}
              @paste=${S=>s_(S,e)}
              placeholder=${l}
            ></textarea>
          </label>
          <div class="chat-compose__actions">
            <button
              class="btn"
              ?disabled=${!e.connected||!i&&e.sending}
              @click=${i?e.onAbort:e.onNewSession}
            >
              ${g(i?"chat.ui.compose.stop":"chat.ui.compose.newSession")}
            </button>
            <button
              class="btn primary"
              ?disabled=${!e.connected}
              @click=${e.onSend}
            >
              ${g(n?"chat.ui.compose.queue":"chat.ui.compose.send")}<kbd
                class="btn-kbd"
                >↵</kbd
              >
            </button>
          </div>
        </div>
      </div>
    </section>
  `}const Id=200;function l_(e){const t=[];let n=null;for(const i of e){if(i.kind!=="message"){n&&(t.push(n),n=null),t.push(i);continue}const s=Gn(i.message),o=tr(s.role),r=s.timestamp||Date.now(),a=i.message.__openclaw;if((a==null?void 0:a.kind)==="tool_render"){n&&(t.push(n),n=null),t.push({kind:"group",key:`group:${o}:${i.key}`,role:o,messages:[{message:i.message,key:i.key}],timestamp:r,isStreaming:!1});continue}!n||n.role!==o?(n&&t.push(n),n={kind:"group",key:`group:${o}:${i.key}`,role:o,messages:[{message:i.message,key:i.key}],timestamp:r,isStreaming:!1}):n.messages.push({message:i.message,key:i.key})}return n&&t.push(n),t}function c_(e){var C,y,E,P;const t=[],n=new Set,i=Array.isArray(e.messages)?e.messages:[],s=Array.isArray(e.toolMessages)?e.toolMessages:[];let r=[...Array.isArray(e.toolRenderItems)?e.toolRenderItems:[]].sort((R,O)=>R.ts-O.ts);r.length===0&&e.toolRenderData&&r.push({id:`legacy:${e.toolRenderSeq??Date.now()}`,runId:"",seq:e.toolRenderSeq??0,ts:Date.now(),payload:e.toolRenderData});const a=new Set([Hy,"[已渲染到前端]"]),l=R=>{for(const O of a)if(O&&R.startsWith(O))return!0;return!1},c=R=>{const O=R.input_index;if(typeof O=="number"&&Number.isFinite(O))return O;if(typeof O=="string"){const L=Number(O);return Number.isFinite(L)?L:0}return 0},d=R=>{const O=(Array.isArray(R.resolved_items)?R.resolved_items:[]).slice().sort((I,z)=>c(I)-c(z)),L=(Array.isArray(R.pending_items)?R.pending_items:[]).slice().sort((I,z)=>c(I)-c(z)),N=(Array.isArray(R.unmatched_items)?R.unmatched_items:[]).slice().sort((I,z)=>c(I)-c(z)),j=[];j.push("**批处理总表**"),j.push(""),j.push("| 序号 | 状态 | 产品编号(code) | 产品名称 |"),j.push("|---|---|---|---|");const Q=[];for(const I of O){const z=I.chosen??{},X=c(I);Q.push({idx:X,line:`| ${X+1} | matched | ${String(z.code??"—")} | ${String(z.matched_name??"—")} |`})}for(const I of L){const X=(Array.isArray(I.options)?I.options:[])[0]??{},B=c(I);Q.push({idx:B,line:`| ${B+1} | needs_selection | ${String(X.code??"—")} | ${String(X.matched_name??"待确认")} |`})}for(const I of N){const z=c(I);Q.push({idx:z,line:`| ${z+1} | unmatched | — | — |`})}Q.sort((I,z)=>I.idx-z.idx);for(const I of Q)j.push(I.line);return j.join(`
`)},u=(R,O,L)=>{var j;const N=(R.payload.batch_mode?d(R.payload):((j=R.payload.formatted_response)==null?void 0:j.trim())??"").trim();N&&(t.push({kind:"message",key:`tool-render:${e.sessionKey}:${R.id}:${L}`,message:{role:"assistant",content:[{type:"text",text:N}],timestamp:O,__openclaw:{kind:"tool_render",runId:R.runId,seq:R.seq}}}),n.add(N))},h=Math.max(0,i.length-Id),f=i.length>h?Gn(i[h]).timestamp??0:0,m=i.length>0?Gn(i[i.length-1]).timestamp??0:0,b=new Set,v=[];for(let R=h;R<i.length;R++){const O=i[R],L=Gn(O),N=((C=Ui(O))==null?void 0:C.trim())??"";L.role.toLowerCase()==="assistant"&&l(N)&&v.push(R)}const k=new Map;if(v.length>0&&r.length>0){const R=v.map(L=>{const N=i[L],j=Gn(N);return{index:L,timestamp:j.timestamp??0}}),O=[];for(const L of r){const N=typeof L.ts=="number"?L.ts:0;if(N<f)continue;let j=null;for(const I of R){const z=I.timestamp-N;z<0||(j==null||z<j.delta)&&(j={index:I.index,delta:z})}if(!j){N>m&&O.push(L);continue}const Q=k.get(j.index);Q?Q.push(L):k.set(j.index,[L])}for(const L of k.values())L.sort((N,j)=>N.ts-j.ts);r=O}h>0&&t.push({kind:"message",key:"chat:history:notice",message:{role:"system",content:`Showing last ${Id} messages (${h} hidden).`,timestamp:Date.now()}});for(let R=h;R<i.length;R++){const O=i[R],L=Gn(O),N=((y=Ui(O))==null?void 0:y.trim())??"",Q=O.__openclaw;if(Q&&Q.kind==="compaction"){t.push({kind:"divider",key:typeof Q.id=="string"?`divider:compaction:${Q.id}`:`divider:compaction:${L.timestamp}:${R}`,label:g("chat.ui.compaction.divider"),timestamp:L.timestamp??Date.now()});continue}if(Q&&Q.kind==="ocr_result"&&typeof Q.text=="string"){const z=Q.text.trim();z&&(b.add(z),t.push({kind:"ocr-result",key:`history-ocr:${R}:${String(L.timestamp??0)}`,card:{id:`history-ocr-${R}-${String(L.timestamp??0)}`,text:z,createdAt:typeof L.timestamp=="number"?L.timestamp:Date.now()}}));continue}if(!e.showThinking&&L.role.toLowerCase()==="toolresult")continue;if(L.role.toLowerCase()==="assistant"&&l(N)){const z=k.get(R);if(z&&z.length>0)for(let X=0;X<z.length;X++){const B=z[X];u(B,L.timestamp??Date.now(),R*1e3+X)}else t.push({kind:"message",key:Gr(O,R),message:O});continue}const I=O.__openclaw;if((I==null?void 0:I.kind)==="tool_render"){const z=((E=Ui(O))==null?void 0:E.trim())??"";z&&n.add(z)}t.push({kind:"message",key:Gr(O,R),message:O})}if(e.showThinking)for(let R=0;R<s.length;R++)t.push({kind:"message",key:Gr(s[R],R+i.length),message:s[R]});const T=Array.isArray(e.candidatePreviews)?e.candidatePreviews:[];for(let R=0;R<T.length;R++)t.push({kind:"candidates-preview",key:`candidates-preview:${T[R].id}`,preview:T[R]});const M=Array.isArray(e.ocrResultCards)?e.ocrResultCards:[];for(const R of M){const O=(R.text??"").trim();!O||b.has(O)||t.push({kind:"ocr-result",key:R.id,card:R})}const S=new Set;for(let R=0;R<r.length;R++){const O=r[R],L=typeof O.ts=="number"?O.ts:0;if(f>0&&L<f)continue;const N=((P=O.payload.formatted_response)==null?void 0:P.trim())??"";N&&(n.has(N)||S.has(N)||(S.add(N),u(O,O.ts||Date.now(),i.length+R)))}if(e.stream!==null){const R=`stream:${e.sessionKey}:${e.streamStartedAt??"live"}`;e.stream.trim().length>0?t.push({kind:"stream",key:R,text:e.stream,startedAt:e.streamStartedAt??Date.now()}):t.push({kind:"reading-indicator",key:R})}return l_(t)}function Gr(e,t){const n=e,i=typeof n.toolCallId=="string"?n.toolCallId:"";if(i)return`tool:${i}`;const s=typeof n.id=="string"?n.id:"";if(s)return`msg:${s}`;const o=typeof n.messageId=="string"?n.messageId:"";if(o)return`msg:${o}`;const r=typeof n.timestamp=="number"?n.timestamp:null,a=typeof n.role=="string"?n.role:"unknown";return r!=null?`msg:${a}:${r}:${t}`:`msg:${a}:${t}`}const d_=new Set(["title","description","default","nullable"]);function u_(e){return Object.keys(e??{}).filter(n=>!d_.has(n)).length===0}function h_(e){if(e===void 0)return"";try{return JSON.stringify(e,null,2)??""}catch{return""}}const ss={chevronDown:p`
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
  `,plus:p`
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
  `,minus:p`
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
  `,trash:p`
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
  `,edit:p`
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
  `};function Pn(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:r,onPatch:a}=e,l=e.showLabel??!0,c=et(t),d=tt(i,s),u=(d==null?void 0:d.label)??t.title??Ft(String(i.at(-1))),h=(d==null?void 0:d.help)??t.description,f=il(i);if(o.has(f))return p`<div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${u}</div>
      <div class="cfg-field__error">Unsupported schema node. Use Raw mode.</div>
    </div>`;if(t.anyOf||t.oneOf){const b=(t.anyOf??t.oneOf??[]).filter(C=>!(C.type==="null"||Array.isArray(C.type)&&C.type.includes("null")));if(b.length===1)return Pn({...e,schema:b[0]});const v=C=>{if(C.const!==void 0)return C.const;if(C.enum&&C.enum.length===1)return C.enum[0]},k=b.map(v),T=k.every(C=>C!==void 0);if(T&&k.length>0&&k.length<=5){const C=n??t.default;return p`
        <div class="cfg-field">
          ${l?p`<label class="cfg-field__label">${u}</label>`:$}
          ${h?p`<div class="cfg-field__help">${h}</div>`:$}
          <div class="cfg-segmented">
            ${k.map(y=>p`
              <button
                type="button"
                class="cfg-segmented__btn ${y===C||String(y)===String(C)?"active":""}"
                ?disabled=${r}
                @click=${()=>a(i,y)}
              >
                ${String(y)}
              </button>
            `)}
          </div>
        </div>
      `}if(T&&k.length>5)return Fd({...e,options:k,value:n??t.default});const M=new Set(b.map(C=>et(C)).filter(Boolean)),S=new Set([...M].map(C=>C==="integer"?"number":C));if([...S].every(C=>["string","number","boolean"].includes(C))){const C=S.has("string"),y=S.has("number");if(S.has("boolean")&&S.size===1)return Pn({...e,schema:{...t,type:"boolean",anyOf:void 0,oneOf:void 0}});if(C||y)return Od({...e,inputType:y&&!C?"number":"text"})}}if(t.enum){const m=t.enum;if(m.length<=5){const b=n??t.default;return p`
        <div class="cfg-field">
          ${l?p`<label class="cfg-field__label">${u}</label>`:$}
          ${h?p`<div class="cfg-field__help">${h}</div>`:$}
          <div class="cfg-segmented">
            ${m.map(v=>p`
              <button
                type="button"
                class="cfg-segmented__btn ${v===b||String(v)===String(b)?"active":""}"
                ?disabled=${r}
                @click=${()=>a(i,v)}
              >
                ${String(v)}
              </button>
            `)}
          </div>
        </div>
      `}return Fd({...e,options:m,value:n??t.default})}if(c==="object")return p_(e);if(c==="array")return g_(e);if(c==="boolean"){const m=typeof n=="boolean"?n:typeof t.default=="boolean"?t.default:!1;return p`
      <label class="cfg-toggle-row ${r?"disabled":""}">
        <div class="cfg-toggle-row__content">
          <span class="cfg-toggle-row__label">${u}</span>
          ${h?p`<span class="cfg-toggle-row__help">${h}</span>`:$}
        </div>
        <div class="cfg-toggle">
          <input
            type="checkbox"
            .checked=${m}
            ?disabled=${r}
            @change=${b=>a(i,b.target.checked)}
          />
          <span class="cfg-toggle__track"></span>
        </div>
      </label>
    `}return c==="number"||c==="integer"?f_(e):c==="string"?Od({...e,inputType:"text"}):p`
    <div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${u}</div>
      <div class="cfg-field__error">Unsupported type: ${c}. Use Raw mode.</div>
    </div>
  `}function Od(e){const{schema:t,value:n,path:i,hints:s,disabled:o,onPatch:r,inputType:a}=e,l=e.showLabel??!0,c=tt(i,s),d=(c==null?void 0:c.label)??t.title??Ft(String(i.at(-1))),u=(c==null?void 0:c.help)??t.description,h=((c==null?void 0:c.sensitive)??!1)&&!/^\$\{[^}]*\}$/.test(String(n??"").trim()),f=(c==null?void 0:c.placeholder)??(h?"••••":t.default!==void 0?`Default: ${String(t.default)}`:""),m=n??"";return p`
    <div class="cfg-field">
      ${l?p`<label class="cfg-field__label">${d}</label>`:$}
      ${u?p`<div class="cfg-field__help">${u}</div>`:$}
      <div class="cfg-input-wrap">
        <input
          type=${h?"password":a}
          class="cfg-input"
          placeholder=${f}
          .value=${m==null?"":String(m)}
          ?disabled=${o}
          @input=${b=>{const v=b.target.value;if(a==="number"){if(v.trim()===""){r(i,void 0);return}const k=Number(v);r(i,Number.isNaN(k)?v:k);return}r(i,v)}}
          @change=${b=>{if(a==="number")return;const v=b.target.value;r(i,v.trim())}}
        />
        ${t.default!==void 0?p`
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
  `}function f_(e){const{schema:t,value:n,path:i,hints:s,disabled:o,onPatch:r}=e,a=e.showLabel??!0,l=tt(i,s),c=(l==null?void 0:l.label)??t.title??Ft(String(i.at(-1))),d=(l==null?void 0:l.help)??t.description,u=n??t.default??"",h=typeof u=="number"?u:0;return p`
    <div class="cfg-field">
      ${a?p`<label class="cfg-field__label">${c}</label>`:$}
      ${d?p`<div class="cfg-field__help">${d}</div>`:$}
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
          @input=${f=>{const m=f.target.value,b=m===""?void 0:Number(m);r(i,b)}}
        />
        <button
          type="button"
          class="cfg-number__btn"
          ?disabled=${o}
          @click=${()=>r(i,h+1)}
        >+</button>
      </div>
    </div>
  `}function Fd(e){const{schema:t,value:n,path:i,hints:s,disabled:o,options:r,onPatch:a}=e,l=e.showLabel??!0,c=tt(i,s),d=(c==null?void 0:c.label)??t.title??Ft(String(i.at(-1))),u=(c==null?void 0:c.help)??t.description,h=n??t.default,f=r.findIndex(b=>b===h||String(b)===String(h)),m="__unset__";return p`
    <div class="cfg-field">
      ${l?p`<label class="cfg-field__label">${d}</label>`:$}
      ${u?p`<div class="cfg-field__help">${u}</div>`:$}
      <select
        class="cfg-select"
        ?disabled=${o}
        .value=${f>=0?String(f):m}
        @change=${b=>{const v=b.target.value;a(i,v===m?void 0:r[Number(v)])}}
      >
        <option value=${m}>Select...</option>
        ${r.map((b,v)=>p`
          <option value=${String(v)}>${String(b)}</option>
        `)}
      </select>
    </div>
  `}function p_(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:r,onPatch:a}=e,l=tt(i,s),c=(l==null?void 0:l.label)??t.title??Ft(String(i.at(-1))),d=(l==null?void 0:l.help)??t.description,u=n??t.default,h=u&&typeof u=="object"&&!Array.isArray(u)?u:{},f=t.properties??{},b=Object.entries(f).toSorted((S,C)=>{var P,R;const y=((P=tt([...i,S[0]],s))==null?void 0:P.order)??0,E=((R=tt([...i,C[0]],s))==null?void 0:R.order)??0;return y!==E?y-E:S[0].localeCompare(C[0])}),v=new Set(Object.keys(f)),k=t.additionalProperties,T=!!k&&typeof k=="object",M=p`
    ${b.map(([S,C])=>Pn({schema:C,value:h[S],path:[...i,S],hints:s,unsupported:o,disabled:r,onPatch:a}))}
    ${T?m_({schema:k,value:h,path:i,hints:s,unsupported:o,disabled:r,reservedKeys:v,onPatch:a}):$}
  `;return i.length===1?p`
      <div class="cfg-fields">
        ${M}
      </div>
    `:p`
    <details class="cfg-object" open>
      <summary class="cfg-object__header">
        <span class="cfg-object__title">${c}</span>
        <span class="cfg-object__chevron">${ss.chevronDown}</span>
      </summary>
      ${d?p`<div class="cfg-object__help">${d}</div>`:$}
      <div class="cfg-object__content">
        ${M}
      </div>
    </details>
  `}function g_(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:r,onPatch:a}=e,l=e.showLabel??!0,c=tt(i,s),d=(c==null?void 0:c.label)??t.title??Ft(String(i.at(-1))),u=(c==null?void 0:c.help)??t.description,h=Array.isArray(t.items)?t.items[0]:t.items;if(!h)return p`
      <div class="cfg-field cfg-field--error">
        <div class="cfg-field__label">${d}</div>
        <div class="cfg-field__error">Unsupported array schema. Use Raw mode.</div>
      </div>
    `;const f=Array.isArray(n)?n:Array.isArray(t.default)?t.default:[];return p`
    <div class="cfg-array">
      <div class="cfg-array__header">
        ${l?p`<span class="cfg-array__label">${d}</span>`:$}
        <span class="cfg-array__count">${f.length} item${f.length!==1?"s":""}</span>
        <button
          type="button"
          class="cfg-array__add"
          ?disabled=${r}
          @click=${()=>{const m=[...f,kh(h)];a(i,m)}}
        >
          <span class="cfg-array__add-icon">${ss.plus}</span>
          Add
        </button>
      </div>
      ${u?p`<div class="cfg-array__help">${u}</div>`:$}

      ${f.length===0?p`
              <div class="cfg-array__empty">No items yet. Click "Add" to create one.</div>
            `:p`
        <div class="cfg-array__items">
          ${f.map((m,b)=>p`
            <div class="cfg-array__item">
              <div class="cfg-array__item-header">
                <span class="cfg-array__item-index">#${b+1}</span>
                <button
                  type="button"
                  class="cfg-array__item-remove"
                  title="Remove item"
                  ?disabled=${r}
                  @click=${()=>{const v=[...f];v.splice(b,1),a(i,v)}}
                >
                  ${ss.trash}
                </button>
              </div>
              <div class="cfg-array__item-content">
                ${Pn({schema:h,value:m,path:[...i,b],hints:s,unsupported:o,disabled:r,showLabel:!1,onPatch:a})}
              </div>
            </div>
          `)}
        </div>
      `}
    </div>
  `}function m_(e){const{schema:t,value:n,path:i,hints:s,unsupported:o,disabled:r,reservedKeys:a,onPatch:l}=e,c=u_(t),d=Object.entries(n??{}).filter(([u])=>!a.has(u));return p`
    <div class="cfg-map">
      <div class="cfg-map__header">
        <span class="cfg-map__label">Custom entries</span>
        <button
          type="button"
          class="cfg-map__add"
          ?disabled=${r}
          @click=${()=>{const u={...n};let h=1,f=`custom-${h}`;for(;f in u;)h+=1,f=`custom-${h}`;u[f]=c?{}:kh(t),l(i,u)}}
        >
          <span class="cfg-map__add-icon">${ss.plus}</span>
          Add Entry
        </button>
      </div>

      ${d.length===0?p`
              <div class="cfg-map__empty">No custom entries.</div>
            `:p`
        <div class="cfg-map__items">
          ${d.map(([u,h])=>{const f=[...i,u],m=h_(h);return p`
              <div class="cfg-map__item">
                <div class="cfg-map__item-key">
                  <input
                    type="text"
                    class="cfg-input cfg-input--sm"
                    placeholder="Key"
                    .value=${u}
                    ?disabled=${r}
                    @change=${b=>{const v=b.target.value.trim();if(!v||v===u)return;const k={...n};v in k||(k[v]=k[u],delete k[u],l(i,k))}}
                  />
                </div>
                <div class="cfg-map__item-value">
                  ${c?p`
                        <textarea
                          class="cfg-textarea cfg-textarea--sm"
                          placeholder="JSON value"
                          rows="2"
                          .value=${m}
                          ?disabled=${r}
                          @change=${b=>{const v=b.target,k=v.value.trim();if(!k){l(f,void 0);return}try{l(f,JSON.parse(k))}catch{v.value=m}}}
                        ></textarea>
                      `:Pn({schema:t,value:h,path:f,hints:s,unsupported:o,disabled:r,showLabel:!1,onPatch:l})}
                </div>
                <button
                  type="button"
                  class="cfg-map__item-remove"
                  title="Remove entry"
                  ?disabled=${r}
                  @click=${()=>{const b={...n};delete b[u],l(i,b)}}
                >
                  ${ss.trash}
                </button>
              </div>
            `})}
        </div>
      `}
    </div>
  `}const Nd={env:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="3"></circle>
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
      ></path>
    </svg>
  `,update:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  `,agents:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path
        d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"
      ></path>
      <circle cx="8" cy="14" r="1"></circle>
      <circle cx="16" cy="14" r="1"></circle>
    </svg>
  `,auth:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  `,channels:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  `,messages:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  `,commands:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
  `,hooks:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
  `,skills:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      ></polygon>
    </svg>
  `,tools:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      ></path>
    </svg>
  `,gateway:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      ></path>
    </svg>
  `,wizard:p`
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
  `,meta:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
    </svg>
  `,logging:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  `,browser:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="4"></circle>
      <line x1="21.17" y1="8" x2="12" y2="8"></line>
      <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
      <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
    </svg>
  `,ui:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>
  `,models:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path
        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
      ></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  `,bindings:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
      <line x1="6" y1="6" x2="6.01" y2="6"></line>
      <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
  `,broadcast:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path>
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path>
      <circle cx="12" cy="12" r="2"></circle>
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path>
      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path>
    </svg>
  `,audio:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M9 18V5l12-2v13"></path>
      <circle cx="6" cy="18" r="3"></circle>
      <circle cx="18" cy="16" r="3"></circle>
    </svg>
  `,session:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  `,cron:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  `,web:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      ></path>
    </svg>
  `,discovery:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  `,canvasHost:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  `,talk:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line x1="12" y1="19" x2="12" y2="23"></line>
      <line x1="8" y1="23" x2="16" y2="23"></line>
    </svg>
  `,plugins:p`
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
  `,default:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
    </svg>
  `},Hl={env:{label:"Environment Variables",description:"Environment variables passed to the gateway process"},update:{label:"Updates",description:"Auto-update settings and release channel"},agents:{label:"Agents",description:"Agent configurations, models, and identities"},auth:{label:"Authentication",description:"API keys and authentication profiles"},channels:{label:"Channels",description:"Messaging channels (Telegram, Discord, Slack, etc.)"},messages:{label:"Messages",description:"Message handling and routing settings"},commands:{label:"Commands",description:"Custom slash commands"},hooks:{label:"Hooks",description:"Webhooks and event hooks"},skills:{label:"Skills",description:"Skill packs and capabilities"},tools:{label:"Tools",description:"Tool configurations (browser, search, etc.)"},gateway:{label:"Gateway",description:"Gateway server settings (port, auth, binding)"},wizard:{label:"Setup Wizard",description:"Setup wizard state and history"},meta:{label:"Metadata",description:"Gateway metadata and version information"},logging:{label:"Logging",description:"Log levels and output configuration"},browser:{label:"Browser",description:"Browser automation settings"},ui:{label:"UI",description:"User interface preferences"},models:{label:"Models",description:"AI model configurations and providers"},bindings:{label:"Bindings",description:"Key bindings and shortcuts"},broadcast:{label:"Broadcast",description:"Broadcast and notification settings"},audio:{label:"Audio",description:"Audio input/output settings"},session:{label:"Session",description:"Session management and persistence"},cron:{label:"Cron",description:"Scheduled tasks and automation"},web:{label:"Web",description:"Web server and API settings"},discovery:{label:"Discovery",description:"Service discovery and networking"},canvasHost:{label:"Canvas Host",description:"Canvas rendering and display"},talk:{label:"Talk",description:"Voice and speech settings"},plugins:{label:"Plugins",description:"Plugin management and extensions"}};function Bd(e){return Nd[e]??Nd.default}function b_(e,t,n){if(!n)return!0;const i=n.toLowerCase(),s=Hl[e];return e.toLowerCase().includes(i)||s&&(s.label.toLowerCase().includes(i)||s.description.toLowerCase().includes(i))?!0:Ri(t,i)}function Ri(e,t){var i,s,o;if((i=e.title)!=null&&i.toLowerCase().includes(t)||(s=e.description)!=null&&s.toLowerCase().includes(t)||(o=e.enum)!=null&&o.some(r=>String(r).toLowerCase().includes(t)))return!0;if(e.properties){for(const[r,a]of Object.entries(e.properties))if(r.toLowerCase().includes(t)||Ri(a,t))return!0}if(e.items){const r=Array.isArray(e.items)?e.items:[e.items];for(const a of r)if(a&&Ri(a,t))return!0}if(e.additionalProperties&&typeof e.additionalProperties=="object"&&Ri(e.additionalProperties,t))return!0;const n=e.anyOf??e.oneOf??e.allOf;if(n){for(const r of n)if(r&&Ri(r,t))return!0}return!1}function y_(e){var u;if(!e.schema)return p`
      <div class="muted">Schema unavailable.</div>
    `;const t=e.schema,n=e.value??{};if(et(t)!=="object"||!t.properties)return p`
      <div class="callout danger">Unsupported schema. Use Raw.</div>
    `;const i=new Set(e.unsupportedPaths??[]),s=t.properties,o=e.searchQuery??"",r=e.activeSection,a=e.activeSubsection??null,c=Object.entries(s).toSorted((h,f)=>{var v,k;const m=((v=tt([h[0]],e.uiHints))==null?void 0:v.order)??50,b=((k=tt([f[0]],e.uiHints))==null?void 0:k.order)??50;return m!==b?m-b:h[0].localeCompare(f[0])}).filter(([h,f])=>!(r&&h!==r||o&&!b_(h,f,o)));let d=null;if(r&&a&&c.length===1){const h=(u=c[0])==null?void 0:u[1];h&&et(h)==="object"&&h.properties&&h.properties[a]&&(d={sectionKey:r,subsectionKey:a,schema:h.properties[a]})}return c.length===0?p`
      <div class="config-empty">
        <div class="config-empty__icon">${ke.search}</div>
        <div class="config-empty__text">
          ${o?`No settings match "${o}"`:"No settings in this section"}
        </div>
      </div>
    `:p`
    <div class="config-form config-form--modern">
      ${d?(()=>{const{sectionKey:h,subsectionKey:f,schema:m}=d,b=tt([h,f],e.uiHints),v=(b==null?void 0:b.label)??m.title??Ft(f),k=(b==null?void 0:b.help)??m.description??"",T=n[h],M=T&&typeof T=="object"?T[f]:void 0,S=`config-section-${h}-${f}`;return p`
              <section class="config-section-card" id=${S}>
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${Bd(h)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${v}</h3>
                    ${k?p`<p class="config-section-card__desc">${k}</p>`:$}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${Pn({schema:m,value:M,path:[h,f],hints:e.uiHints,unsupported:i,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})():c.map(([h,f])=>{const m=Hl[h]??{label:h.charAt(0).toUpperCase()+h.slice(1),description:f.description??""};return p`
              <section class="config-section-card" id="config-section-${h}">
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${Bd(h)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${m.label}</h3>
                    ${m.description?p`<p class="config-section-card__desc">${m.description}</p>`:$}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${Pn({schema:f,value:n[h],path:[h],hints:e.uiHints,unsupported:i,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})}
    </div>
  `}const v_=new Set(["title","description","default","nullable"]);function x_(e){return Object.keys(e??{}).filter(n=>!v_.has(n)).length===0}function ap(e){const t=e.filter(s=>s!=null),n=t.length!==e.length,i=[];for(const s of t)i.some(o=>Object.is(o,s))||i.push(s);return{enumValues:i,nullable:n}}function w_(e){return!e||typeof e!="object"?{schema:null,unsupportedPaths:["<root>"]}:ji(e,[])}function ji(e,t){const n=new Set,i={...e},s=il(t)||"<root>";if(e.anyOf||e.oneOf||e.allOf){const a=__(e,t);return a||{schema:e,unsupportedPaths:[s]}}const o=Array.isArray(e.type)&&e.type.includes("null"),r=et(e)??(e.properties||e.additionalProperties?"object":void 0);if(i.type=r??e.type,i.nullable=o||e.nullable,i.enum){const{enumValues:a,nullable:l}=ap(i.enum);i.enum=a,l&&(i.nullable=!0),a.length===0&&n.add(s)}if(r==="object"){const a=e.properties??{},l={};for(const[c,d]of Object.entries(a)){const u=ji(d,[...t,c]);u.schema&&(l[c]=u.schema);for(const h of u.unsupportedPaths)n.add(h)}if(i.properties=l,e.additionalProperties===!0)n.add(s);else if(e.additionalProperties===!1)i.additionalProperties=!1;else if(e.additionalProperties&&typeof e.additionalProperties=="object"&&!x_(e.additionalProperties)){const c=ji(e.additionalProperties,[...t,"*"]);i.additionalProperties=c.schema??e.additionalProperties,c.unsupportedPaths.length>0&&n.add(s)}}else if(r==="array"){const a=Array.isArray(e.items)?e.items[0]:e.items;if(!a)n.add(s);else{const l=ji(a,[...t,"*"]);i.items=l.schema??a,l.unsupportedPaths.length>0&&n.add(s)}}else r!=="string"&&r!=="number"&&r!=="integer"&&r!=="boolean"&&!i.enum&&n.add(s);return{schema:i,unsupportedPaths:Array.from(n)}}function __(e,t){if(e.allOf)return null;const n=e.anyOf??e.oneOf;if(!n)return null;const i=[],s=[];let o=!1;for(const a of n){if(!a||typeof a!="object")return null;if(Array.isArray(a.enum)){const{enumValues:l,nullable:c}=ap(a.enum);i.push(...l),c&&(o=!0);continue}if("const"in a){if(a.const==null){o=!0;continue}i.push(a.const);continue}if(et(a)==="null"){o=!0;continue}s.push(a)}if(i.length>0&&s.length===0){const a=[];for(const l of i)a.some(c=>Object.is(c,l))||a.push(l);return{schema:{...e,enum:a,nullable:o,anyOf:void 0,oneOf:void 0,allOf:void 0},unsupportedPaths:[]}}if(s.length===1){const a=ji(s[0],t);return a.schema&&(a.schema.nullable=o||a.schema.nullable),a}const r=new Set(["string","number","integer","boolean"]);return s.length>0&&i.length===0&&s.every(a=>a.type&&r.has(String(a.type)))?{schema:{...e,nullable:o},unsupportedPaths:[]}:null}const Oa={all:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
  `,env:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="3"></circle>
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
      ></path>
    </svg>
  `,update:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  `,agents:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path
        d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"
      ></path>
      <circle cx="8" cy="14" r="1"></circle>
      <circle cx="16" cy="14" r="1"></circle>
    </svg>
  `,auth:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  `,channels:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  `,messages:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  `,commands:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
  `,hooks:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
  `,skills:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      ></polygon>
    </svg>
  `,tools:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      ></path>
    </svg>
  `,gateway:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      ></path>
    </svg>
  `,wizard:p`
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
  `,meta:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
    </svg>
  `,logging:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  `,browser:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="4"></circle>
      <line x1="21.17" y1="8" x2="12" y2="8"></line>
      <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
      <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
    </svg>
  `,ui:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>
  `,models:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path
        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
      ></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  `,bindings:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
      <line x1="6" y1="6" x2="6.01" y2="6"></line>
      <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
  `,broadcast:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path>
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path>
      <circle cx="12" cy="12" r="2"></circle>
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path>
      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path>
    </svg>
  `,audio:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M9 18V5l12-2v13"></path>
      <circle cx="6" cy="18" r="3"></circle>
      <circle cx="18" cy="16" r="3"></circle>
    </svg>
  `,session:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  `,cron:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  `,web:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      ></path>
    </svg>
  `,discovery:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  `,canvasHost:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  `,talk:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line x1="12" y1="19" x2="12" y2="23"></line>
      <line x1="8" y1="23" x2="16" y2="23"></line>
    </svg>
  `,plugins:p`
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
  `,default:p`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
    </svg>
  `},zd=[{key:"env",label:"Environment"},{key:"update",label:"Updates"},{key:"agents",label:"Agents"},{key:"auth",label:"Authentication"},{key:"channels",label:"Channels"},{key:"messages",label:"Messages"},{key:"commands",label:"Commands"},{key:"hooks",label:"Hooks"},{key:"skills",label:"Skills"},{key:"tools",label:"Tools"},{key:"gateway",label:"Gateway"},{key:"wizard",label:"Setup Wizard"}],Hd="__all__";function Ud(e){return Oa[e]??Oa.default}function k_(e,t){const n=Hl[e];return n||{label:(t==null?void 0:t.title)??Ft(e),description:(t==null?void 0:t.description)??""}}function S_(e){const{key:t,schema:n,uiHints:i}=e;if(!n||et(n)!=="object"||!n.properties)return[];const s=Object.entries(n.properties).map(([o,r])=>{const a=tt([t,o],i),l=(a==null?void 0:a.label)??r.title??Ft(o),c=(a==null?void 0:a.help)??r.description??"",d=(a==null?void 0:a.order)??50;return{key:o,label:l,description:c,order:d}});return s.sort((o,r)=>o.order!==r.order?o.order-r.order:o.key.localeCompare(r.key)),s}function $_(e,t){if(!e||!t)return[];const n=[];function i(s,o,r){if(s===o)return;if(typeof s!=typeof o){n.push({path:r,from:s,to:o});return}if(typeof s!="object"||s===null||o===null){s!==o&&n.push({path:r,from:s,to:o});return}if(Array.isArray(s)&&Array.isArray(o)){JSON.stringify(s)!==JSON.stringify(o)&&n.push({path:r,from:s,to:o});return}const a=s,l=o,c=new Set([...Object.keys(a),...Object.keys(l)]);for(const d of c)i(a[d],l[d],r?`${r}.${d}`:d)}return i(e,t,""),n}function qd(e,t=40){let n;try{n=JSON.stringify(e)??String(e)}catch{n=String(e)}return n.length<=t?n:n.slice(0,t-3)+"..."}function A_(e){var y,E,P;const t=e.valid==null?"unknown":e.valid?"valid":"invalid",n=w_(e.schema),i=n.schema?n.unsupportedPaths.length>0:!1,s=((y=n.schema)==null?void 0:y.properties)??{},o=zd.filter(R=>R.key in s),r=new Set(zd.map(R=>R.key)),a=Object.keys(s).filter(R=>!r.has(R)).map(R=>({key:R,label:R.charAt(0).toUpperCase()+R.slice(1)})),l=[...o,...a],c=e.activeSection&&n.schema&&et(n.schema)==="object"?(E=n.schema.properties)==null?void 0:E[e.activeSection]:void 0,d=e.activeSection?k_(e.activeSection,c):null,u=e.activeSection?S_({key:e.activeSection,schema:c,uiHints:e.uiHints}):[],h=e.formMode==="form"&&!!e.activeSection&&u.length>0,f=e.activeSubsection===Hd,m=e.searchQuery||f?null:e.activeSubsection??((P=u[0])==null?void 0:P.key)??null,b=e.formMode==="form"?$_(e.originalValue,e.formValue):[],v=e.formMode==="raw"&&e.raw!==e.originalRaw,k=e.formMode==="form"?b.length>0:v,T=!!e.formValue&&!e.loading&&!!n.schema,M=e.connected&&!e.saving&&k&&(e.formMode==="raw"?!0:T),S=e.connected&&!e.applying&&!e.updating&&k&&(e.formMode==="raw"?!0:T),C=e.connected&&!e.applying&&!e.updating;return p`
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
          ${e.searchQuery?p`
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
            <span class="config-nav__icon">${Oa.all}</span>
            <span class="config-nav__label">All Settings</span>
          </button>
          ${l.map(R=>p`
              <button
                class="config-nav__item ${e.activeSection===R.key?"active":""}"
                @click=${()=>e.onSectionChange(R.key)}
              >
                <span class="config-nav__icon"
                  >${Ud(R.key)}</span
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
            ${k?p`
                  <span class="config-changes-badge"
                    >${e.formMode==="raw"?"Unsaved changes":`${b.length} unsaved change${b.length!==1?"s":""}`}</span
                  >
                `:p`
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
              ?disabled=${!S}
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
        ${k&&e.formMode==="form"?p`
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
                  ${b.map(R=>p`
                      <div class="config-diff__item">
                        <div class="config-diff__path">${R.path}</div>
                        <div class="config-diff__values">
                          <span class="config-diff__from"
                            >${qd(R.from)}</span
                          >
                          <span class="config-diff__arrow">→</span>
                          <span class="config-diff__to"
                            >${qd(R.to)}</span
                          >
                        </div>
                      </div>
                    `)}
                </div>
              </details>
            `:$}
        ${d&&e.formMode==="form"?p`
              <div class="config-section-hero">
                <div class="config-section-hero__icon">
                  ${Ud(e.activeSection??"")}
                </div>
                <div class="config-section-hero__text">
                  <div class="config-section-hero__title">
                    ${d.label}
                  </div>
                  ${d.description?p`<div class="config-section-hero__desc">
                        ${d.description}
                      </div>`:$}
                </div>
              </div>
            `:$}
        ${h?p`
              <div class="config-subnav">
                <button
                  class="config-subnav__item ${m===null?"active":""}"
                  @click=${()=>e.onSubsectionChange(Hd)}
                >
                  All
                </button>
                ${u.map(R=>p`
                    <button
                      class="config-subnav__item ${m===R.key?"active":""}"
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
          ${e.formMode==="form"?p`
                ${e.schemaLoading?p`
                        <div class="config-loading">
                          <div class="config-loading__spinner"></div>
                          <span>Loading schema…</span>
                        </div>
                      `:y_({schema:n.schema,uiHints:e.uiHints,value:e.formValue,disabled:e.loading||!e.formValue,unsupportedPaths:n.unsupportedPaths,onPatch:e.onFormPatch,searchQuery:e.searchQuery,activeSection:e.activeSection,activeSubsection:m})}
                ${i?p`
                        <div class="callout danger" style="margin-top: 12px">
                          Form view can't safely edit some fields. Use Raw to avoid losing config entries.
                        </div>
                      `:$}
              `:p`
                <label class="field config-raw-field">
                  <span>Raw JSON5</span>
                  <textarea
                    .value=${e.raw}
                    @input=${R=>e.onRawChange(R.target.value)}
                  ></textarea>
                </label>
              `}
        </div>

        ${e.issues.length>0?p`<div class="callout danger" style="margin-top: 12px;">
              <pre class="code-block">
${JSON.stringify(e.issues,null,2)}</pre
              >
            </div>`:$}
      </main>
    </div>
  `}function jd(e){const t=(e??"").trim();return t?t==="Untitled quotation"||t==="未命名报价单"?g("work.fallbackDraftName"):t:""}function T_(e){if(!e)return"-";try{return new Date(e).toLocaleString()}catch{return e??"-"}}function C_(e,t,n,i){const s=i==="asc"?1:-1;if(n==="created_at"){const o=e.created_at?new Date(e.created_at).getTime():0,r=t.created_at?new Date(t.created_at).getTime():0;return(o-r)*s}return n==="name"?(e.name??"").localeCompare(t.name??"")*s:(e.draft_no??"").localeCompare(t.draft_no??"")*s}function E_(e){const{loading:t,error:n,drafts:i,detail:s,detailId:o,confirmBusy:r,confirmResult:a,filterQuery:l,sortBy:c,sortDir:d,page:u,pageSize:h,onRefresh:f,onSelectDraft:m,onConfirm:b,onClearDetail:v,onFilterQueryChange:k,onSortByChange:T,onSortDirChange:M,onPageChange:S,onPageSizeChange:C}=e,y=l.trim().toLowerCase(),P=[...y?i.filter(I=>`${I.draft_no??""}
${I.name??""}
${I.source??""}`.toLowerCase().includes(y)):i].sort((I,z)=>C_(I,z,c,d)),R=P.length,O=Math.max(1,h||10),L=Math.max(1,Math.ceil(R/O)),N=Math.min(Math.max(1,u),L),j=(N-1)*O,Q=P.slice(j,j+O);return p`
    <section class="grid grid-cols-2" aria-label=${g("tabs.cron")}>
      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${g("fulfill.title")}</div>
        <div class="card-sub">${g("fulfill.subtitle")}</div>
        <div style="margin-top: 12px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <button class="btn" ?disabled=${t} @click=${f} aria-label=${g("fulfill.refreshList")}>
            ${g(t?"fulfill.loading":"fulfill.refreshList")}
          </button>
          <input
            type="search"
            .value=${l}
            placeholder=${g("fulfill.filterPlaceholder")}
            @input=${I=>k(I.target.value)}
            aria-label=${g("fulfill.filterPlaceholder")}
            style="min-width: 220px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border);"
          />
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${g("fulfill.sortBy")}</span>
            <select
              .value=${c}
              @change=${I=>T(I.target.value)}
              aria-label=${g("fulfill.sortBy")}
              style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 160px;"
            >
              <option value="created_at">${g("fulfill.sortCreatedAt")}</option>
              <option value="draft_no">${g("fulfill.sortDraftNo")}</option>
              <option value="name">${g("fulfill.sortName")}</option>
            </select>
          </label>
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${g("fulfill.sortDir")}</span>
            <select
              .value=${d}
              @change=${I=>M(I.target.value)}
              aria-label=${g("fulfill.sortDir")}
              style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 140px;"
            >
              <option value="desc">${g("fulfill.sortDesc")}</option>
              <option value="asc">${g("fulfill.sortAsc")}</option>
            </select>
          </label>
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${g("fulfill.pageSize")}</span>
            <select
              .value=${String(O)}
              @change=${I=>C(Number(I.target.value)||10)}
              aria-label=${g("fulfill.pageSize")}
              style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 120px;"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </label>
        </div>
      </div>

      ${n?p`
            <div class="card" style="grid-column: 1 / -1; border-color: var(--danger, #c62828);" role="alert" aria-live="assertive">
              <div class="card-title" style="color: var(--danger, #c62828);">${g("common.errorTitle")}</div>
              <div class="card-sub">${n}</div>
              <div style="margin-top: 10px;">
                <button class="btn" @click=${f}>${g("common.retry")}</button>
              </div>
            </div>
          `:$}

      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${g("fulfill.listTitle")}</div>
        <div class="card-sub">${g("fulfill.listSubtitle")}</div>

        ${t&&i.length===0?p`<p class="muted" style="margin-top: 12px;">${g("fulfill.loading")}</p>`:R===0?p`<p class="muted" style="margin-top: 12px;">${g("fulfill.noDrafts")}</p>`:p`
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
                      ${Q.map(I=>p`
                          <tr style=${o===I.id?"background: var(--bg-secondary, #f5f5f5);":""}>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${I.draft_no}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${jd(I.name)}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${I.source??"-"}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">${T_(I.created_at)}</td>
                            <td style="padding: 6px 8px; border: 1px solid var(--border); display: flex; gap: 6px; flex-wrap: wrap;">
                              <button
                                class="btn btn-sm"
                                @click=${()=>m(I.id)}
                                aria-label=${g("fulfill.viewDetail")}
                              >
                                ${g("fulfill.viewDetail")}
                              </button>
                              <button
                                class="btn"
                                style="font-size: 12px; padding: 4px 8px;"
                                ?disabled=${r}
                                @click=${()=>b(I.id)}
                                aria-label=${g("fulfill.confirmAction")}
                              >
                                ${r&&o===I.id?g("fulfill.confirming"):g("fulfill.confirmAction")}
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
                    @click=${()=>S(N-1)}
                    aria-label=${g("common.prev")}
                  >
                    ${g("common.prev")}
                  </button>
                  <span class="muted" style="font-size: 12px;">${g("fulfill.page",{current:String(N),total:String(L)})}</span>
                  <button
                    class="btn btn-sm"
                    ?disabled=${N>=L}
                    @click=${()=>S(N+1)}
                    aria-label=${g("common.next")}
                  >
                    ${g("common.next")}
                  </button>
                </div>
              `}
      </div>

      ${s?p`
            <div class="card" style="grid-column: 1 / -1;" tabindex="-1">
              <div class="card-title">${g("fulfill.detailTitle",{draftNo:s.draft_no})}</div>
              <div class="card-sub">${jd(s.name)}</div>
              <div style="margin-top: 8px; display: flex; gap: 8px;">
                <button class="btn btn-sm" @click=${v}>${g("fulfill.closeDetail")}</button>
                <button
                  class="btn"
                  style="background: var(--accent); color: var(--bg);"
                  ?disabled=${r}
                  @click=${()=>b(s.id)}
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
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("fulfill.lineQuoteSpec")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("fulfill.linePrice")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("fulfill.lineAmount")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("fulfill.lineAvailable")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("fulfill.lineShortfall")}</th>
                      <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border);">${g("fulfill.lineIsShortage")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${(s.lines??[]).map((I,z)=>p`
                        <tr>
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${z+1}</td>
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
                          <td style="padding: 4px 8px; border: 1px solid var(--border);">${I.is_shortage?g("common.yes"):g("common.no")}</td>
                        </tr>
                      `)}
                  </tbody>
                </table>
              </div>
            </div>
          `:$}

      ${a?p`
            <div class="card" style="grid-column: 1 / -1; border-color: var(--success, #2e7d32);" role="status" aria-live="polite">
              <div class="card-title" style="color: var(--success, #2e7d32);">${g("fulfill.confirmTitle")}</div>
              ${a.order_id?p`<p style="margin: 0 0 4px 0; font-weight: 600;">${g("fulfill.orderId")}: ${a.order_id}</p>`:$}
              <div class="card-sub">${a.message??""}</div>
            </div>
          `:$}
    </section>
  `}function R_(e,t,n,i){const s=i==="asc"?1:-1;if(n==="uploaded_at"){const o=e.uploaded_at?new Date(e.uploaded_at).getTime():0,r=t.uploaded_at?new Date(t.uploaded_at).getTime():0;return(o-r)*s}return n==="shortfall"?(Number(e.shortfall??0)-Number(t.shortfall??0))*s:n==="count"?(Number(e.count??0)-Number(t.count??0))*s:(e.product_name??"").localeCompare(t.product_name??"")*s}function M_(e){const{loading:t,error:n,suggestions:i,selectedKeys:s,approvedKeys:o,approveBusy:r,approveResult:a,filterQuery:l,sortBy:c,sortDir:d,page:u,pageSize:h,onRefresh:f,onToggleSelect:m,onApprove:b,onApproveBatch:v,onFilterQueryChange:k,onSortByChange:T,onSortDirChange:M,onPageChange:S,onPageSizeChange:C}=e,y=i.filter(B=>!o.includes(ot(B))),E=l.trim().toLowerCase(),P=E?y.filter(B=>`${B.product_name??""}
${B.specification??""}
${B.code??""}
${B.product_key??""}`.toLowerCase().includes(E)):y,R=[...P].sort((B,se)=>R_(B,se,c,d)),O=R.length,L=Math.max(1,h||10),N=Math.max(1,Math.ceil(O/L)),j=Math.min(Math.max(1,u),N),Q=(j-1)*L,I=R.slice(Q,Q+L),z=P.filter(B=>s.includes(ot(B))).length,X=P.length>0&&P.every(B=>s.includes(ot(B)));return p`
    <section class="grid grid-cols-2" aria-label=${g("tabs.sessions")}>
      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${g("procurement.title")}</div>
        <div class="card-sub">${g("procurement.subtitle")}</div>
        <div style="margin-top: 12px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <button class="btn" ?disabled=${t} @click=${f} aria-label=${g("procurement.refreshList")}>
            ${g(t?"procurement.loading":"procurement.refreshList")}
          </button>
          <input
            type="search"
            .value=${l}
            placeholder=${g("procurement.filterPlaceholder")}
            @input=${B=>k(B.target.value)}
            aria-label=${g("procurement.filterPlaceholder")}
            style="min-width: 240px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border);"
          />
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${g("procurement.sortBy")}</span>
            <select
              .value=${c}
              @change=${B=>T(B.target.value)}
              aria-label=${g("procurement.sortBy")}
              style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 160px;"
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
              .value=${d}
              @change=${B=>M(B.target.value)}
              aria-label=${g("procurement.sortDir")}
              style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 140px;"
            >
              <option value="desc">${g("procurement.sortDesc")}</option>
              <option value="asc">${g("procurement.sortAsc")}</option>
            </select>
          </label>
          <label>
            <span class="muted" style="font-size: 12px; margin-right: 6px;">${g("procurement.pageSize")}</span>
            <select
              .value=${String(L)}
              @change=${B=>C(Number(B.target.value)||10)}
              aria-label=${g("procurement.pageSize")}
              style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 120px;"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </label>
        </div>
      </div>

      ${n?p`
            <div class="card" style="grid-column: 1 / -1; border-color: var(--danger, #c62828);" role="alert" aria-live="assertive">
              <div class="card-title" style="color: var(--danger, #c62828);">${g("common.errorTitle")}</div>
              <div class="card-sub">${n}</div>
              <div style="margin-top: 10px;">
                <button class="btn" @click=${f}>${g("common.retry")}</button>
              </div>
            </div>
          `:$}

      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${g("procurement.listTitle")}</div>
        <div class="card-sub">${g("procurement.listHint")}</div>

        ${z>0?p`
              <div style="margin-top: 12px;">
                <button
                  class="btn"
                  style="font-size: 12px;"
                  ?disabled=${r}
                  @click=${v}
                  aria-label=${g("procurement.batchApprove")}
                >
                  ${r?g("procurement.approving"):`${g("procurement.batchApprove")} (${z})`}
                </button>
              </div>
            `:$}

        ${t&&i.length===0?p`<p class="muted" style="margin-top: 12px;">${g("procurement.loading")}</p>`:P.length===0?p`<p class="muted" style="margin-top: 12px;">${i.length===0?g("procurement.noSuggestions"):g("procurement.noPending")}</p>`:p`
                <div class="muted" style="font-size: 12px; margin-top: 10px;">
                  ${g("procurement.total",{total:String(O)})}
                </div>
                <div style="overflow-x: auto; margin-top: 8px;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <thead>
                      <tr style="background: var(--bg-secondary, #eee);">
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid var(--border); width: 36px;">
                          <input
                            type="checkbox"
                            .checked=${X}
                            .indeterminate=${z>0&&z<P.length}
                            aria-label=${g("procurement.selectAll")}
                            @change=${()=>{X?P.forEach(B=>m(ot(B))):P.forEach(B=>{const se=ot(B);s.includes(se)||m(se)})}}
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
                      ${I.map(B=>p`
                          <tr>
                            <td style="padding: 6px 8px; border: 1px solid var(--border);">
                              <input
                                type="checkbox"
                                .checked=${s.includes(ot(B))}
                                aria-label=${g("procurement.selectItem")}
                                @change=${()=>m(ot(B))}
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
                                @click=${()=>b(B)}
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
                    ?disabled=${j<=1}
                    @click=${()=>S(j-1)}
                    aria-label=${g("common.prev")}
                  >
                    ${g("common.prev")}
                  </button>
                  <span class="muted" style="font-size: 12px;">${g("procurement.page",{current:String(j),total:String(N)})}</span>
                  <button
                    class="btn btn-sm"
                    ?disabled=${j>=N}
                    @click=${()=>S(j+1)}
                    aria-label=${g("common.next")}
                  >
                    ${g("common.next")}
                  </button>
                </div>
              `}
      </div>

      ${a?p`
            <div class="card" style="grid-column: 1 / -1;" role="status" aria-live="polite">
              <div class="card-sub">
                ${a.approved_count!=null?`${g("procurement.approvedCount",{count:String(a.approved_count)})} `:""}${a.message??""}
              </div>
            </div>
          `:$}

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
                ${e.replenishmentInputLines.map((B,se)=>p`
                    <tr>
                      <td style="padding: 6px 8px; border: 1px solid var(--border);">
                        <input
                          type="text"
                          .value=${B.product_or_code}
                          placeholder=${g("replenishment.productOrCodePlaceholder")}
                          @input=${Me=>e.onReplenishmentLineChange(se,"product_or_code",Me.target.value)}
                          style="width: 100%; padding: 6px 8px; border-radius: 4px; border: 1px solid var(--border);"
                          aria-label=${g("replenishment.productOrCodePlaceholder")}
                        />
                      </td>
                      <td style="padding: 6px 8px; border: 1px solid var(--border); text-align: right;">
                        <input
                          type="number"
                          min="1"
                          .value=${String(B.quantity||"")}
                          placeholder=${g("replenishment.quantityPlaceholder")}
                          @input=${Me=>{const le=Me.target.value,Ke=le===""?0:Number(le);e.onReplenishmentLineChange(se,"quantity",Number.isFinite(Ke)?Ke:0)}}
                          style="width: 80px; padding: 6px 8px; border-radius: 4px; border: 1px solid var(--border); text-align: right;"
                          aria-label=${g("replenishment.quantityPlaceholder")}
                        />
                      </td>
                      <td style="padding: 6px 8px; border: 1px solid var(--border);">
                        ${e.replenishmentInputLines.length>1?p`
                              <button
                                type="button"
                                class="btn btn-sm"
                                style="font-size: 12px; padding: 4px 8px;"
                                @click=${()=>e.onReplenishmentRemoveLine(se)}
                                aria-label=${g("replenishment.removeRow")}
                              >
                                ${g("replenishment.removeRow")}
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

      ${e.replenishmentError?p`
            <div class="card" style="grid-column: 1 / -1; border-color: var(--danger, #c62828);" role="alert" aria-live="assertive">
              <div class="card-title" style="color: var(--danger, #c62828);">${g("common.errorTitle")}</div>
              <div class="card-sub">${e.replenishmentError}</div>
            </div>
          `:$}

      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-title">${g("replenishment.listTitle")}</div>
        <div class="card-sub">${g("replenishment.listHint")}</div>

        ${e.replenishmentLoading&&e.replenishmentDrafts.length===0?p`<p class="muted" style="margin-top: 12px;">${g("replenishment.loading")}</p>`:e.replenishmentDrafts.length===0?p`<p class="muted" style="margin-top: 12px;">${g("replenishment.noDrafts")}</p>`:p`
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
                      ${e.replenishmentDrafts.map(B=>p`
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
                                ${g("replenishment.viewDetail")}
                              </button>
                              <button
                                class="btn btn-sm"
                                style="font-size: 12px; padding: 4px 8px;"
                                ?disabled=${e.replenishmentConfirmBusy||B.status==="confirmed"}
                                @click=${()=>e.onConfirmReplenishment(B.id)}
                              >
                                ${e.replenishmentConfirmBusy?g("replenishment.confirming"):g("replenishment.confirm")}
                              </button>
                              <button
                                class="btn btn-sm"
                                style="font-size: 12px; padding: 4px 8px; color: var(--danger, #c62828);"
                                @click=${()=>e.onDeleteReplenishmentDraft(B.id)}
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

      ${e.replenishmentDetail&&e.replenishmentDetailId!=null?p`
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
                    ${e.replenishmentDetail.lines.map(B=>p`
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
                  ${g("common.close")}
                </button>
              </div>
            </div>
          `:$}

      ${e.replenishmentConfirmResult?p`
            <div class="card" style="grid-column: 1 / -1;" role="status" aria-live="polite">
              <div class="card-sub">${e.replenishmentConfirmResult.message??""}</div>
            </div>
          `:$}
    </section>
  `}function P_(e){return e?`${Lm(e)} (${gs(e)})`:"n/a"}function D_(e){if(e==null)return"";try{return JSON.stringify(e,null,2)}catch{return String(e)}}function L_(e){const t=e.status&&typeof e.status=="object"?e.status.securityAudit:null,n=(t==null?void 0:t.summary)??null,i=(n==null?void 0:n.critical)??0,s=(n==null?void 0:n.warn)??0,o=(n==null?void 0:n.info)??0,r=i>0?"danger":s>0?"warn":"success",a=i>0?`${i} critical`:s>0?`${s} warnings`:"No critical issues";return p`
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
            ${n?p`<div class="callout ${r}" style="margin-top: 8px;">
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
        ${e.callError?p`<div class="callout danger" style="margin-top: 12px;">
              ${e.callError}
            </div>`:$}
        ${e.callResult?p`<pre class="code-block" style="margin-top: 12px;">${e.callResult}</pre>`:$}
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
      ${e.eventLog.length===0?p`
              <div class="muted" style="margin-top: 12px">No events yet.</div>
            `:p`
            <div class="list" style="margin-top: 12px;">
              ${e.eventLog.map(l=>p`
                  <div class="list-item">
                    <div class="list-main">
                      <div class="list-title">${l.event}</div>
                      <div class="list-sub">${new Date(l.ts).toLocaleTimeString()}</div>
                    </div>
                    <div class="list-meta">
                      <pre class="code-block">${D_(l.payload)}</pre>
                    </div>
                  </div>
                `)}
            </div>
          `}
    </section>
  `}function I_(e){const t=Math.max(0,e),n=Math.floor(t/1e3);if(n<60)return`${n}s`;const i=Math.floor(n/60);return i<60?`${i}m`:`${Math.floor(i/60)}h`}function ln(e,t){return t?p`<div class="exec-approval-meta-row"><span>${e}</span><span>${t}</span></div>`:$}function O_(e){const t=e.execApprovalQueue[0];if(!t)return $;const n=t.request,i=t.expiresAtMs-Date.now(),s=i>0?`expires in ${I_(i)}`:"expired",o=e.execApprovalQueue.length;return p`
    <div class="exec-approval-overlay" role="dialog" aria-live="polite">
      <div class="exec-approval-card">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">Exec approval needed</div>
            <div class="exec-approval-sub">${s}</div>
          </div>
          ${o>1?p`<div class="exec-approval-queue">${o} pending</div>`:$}
        </div>
        <div class="exec-approval-command mono">${n.command}</div>
        <div class="exec-approval-meta">
          ${ln("Host",n.host)}
          ${ln("Agent",n.agentId)}
          ${ln("Session",n.sessionKey)}
          ${ln("CWD",n.cwd)}
          ${ln("Resolved",n.resolvedPath)}
          ${ln("Security",n.security)}
          ${ln("Ask",n.ask)}
        </div>
        ${e.execApprovalError?p`<div class="exec-approval-error">${e.execApprovalError}</div>`:$}
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
  `}function F_(e){const{pendingGatewayUrl:t}=e;return t?p`
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
  `:$}function lp(e){const t=e.trim();if(t==="")return null;const n=Number(t);return Number.isFinite(n)?n:null}function N_(e){const t=e.host.adminData;return p`
    <form
      class="admin-login"
      @submit=${n=>{var o;n.preventDefault();const s=((o=n.currentTarget.elements.namedItem("admin-password"))==null?void 0:o.value)??"";e.onLogin(s)}}
    >
      <h2 class="admin-login__title">数据管理 — 登录</h2>
      <input
        name="admin-password"
        type="password"
        class="admin-input"
        placeholder="管理员密码"
      />
      ${t.loginError?p`<p class="admin-err">${t.loginError}</p>`:$}
      <button type="submit" class="admin-btn admin-btn--primary" ?disabled=${t.loginLoading}>
        ${t.loginLoading?"登录中…":"登录"}
      </button>
    </form>
  `}function cp(e,t,n){return p`
    <label class="admin-upload">
      <input
        type="file"
        accept=".xlsx"
        ?disabled=${t}
        @change=${i=>{var o;const s=(o=i.target.files)==null?void 0:o[0];s&&n(s),i.target.value=""}}
      />
      <span>${t?"上传中…":e}</span>
    </label>
  `}function B_(e){const t=e.host.adminData;return t.token?p`
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
        <button
          type="button"
          class="admin-subtab ${t.activeSubTab==="library"?"is-active":""}"
          @click=${e.onLibraryTab}
        >
          自定义库
        </button>
      </div>
      ${t.activeSubTab==="price"?z_(e):t.activeSubTab==="mapping"?H_(e):q_(e)}
    </section>
  `:p`<section class="admin-panel">${N_(e)}</section>`}function z_(e){const t=e.host.adminData;return p`
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
        ${cp("上传 Excel（全表替换）",t.priceUploading,n=>{confirm("将用上传文件全表替换万鼎价格库，确认？")&&e.onPriceUpload(n)})}
        <button type="button" class="admin-btn admin-btn--primary" @click=${e.onPriceAddRow}>+ 新增一行</button>
      </div>
      ${t.priceError?p`<p class="admin-err">${t.priceError}</p>`:$}
      ${t.priceLoading?p`<p class="admin-muted">加载中…</p>`:$}
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
            ${t.priceItems.map((n,i)=>p`
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
                  ${["price_a","price_b","price_c","price_d"].map(s=>p`
                      <td>
                        <input
                          class="admin-cell admin-cell--num"
                          .value=${n[s]??""}
                          @input=${o=>e.onPriceFieldChange(i,{[s]:lp(o.target.value)})}
                        />
                      </td>
                    `)}
                  <td class="admin-actions">
                    <button type="button" class="admin-btn admin-btn--sm" @click=${()=>e.onPriceSave(i)}>
                      保存
                    </button>
                    ${n.id!=null?p`<button
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
  `}function H_(e){const t=e.host.adminData;return p`
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
        ${cp("上传 Excel（全表替换）",t.mappingUploading,n=>{confirm("将用上传文件全表替换产品映射表，确认？")&&e.onMappingUpload(n)})}
        <button type="button" class="admin-btn admin-btn--primary" @click=${e.onMappingAddRow}>+ 新增一行</button>
      </div>
      ${t.mappingError?p`<p class="admin-err">${t.mappingError}</p>`:$}
      ${t.mappingLoading?p`<p class="admin-muted">加载中…</p>`:$}
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
            ${t.mappingItems.map((n,i)=>p`
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
                    ${n.id!=null?p`<button
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
  `}function U_(e){const t=e.host.adminData;return p`
    <div class="admin-row" style="gap:8px;flex-wrap:wrap;">
      <input
        data-library-name-input="true"
        type="text"
        class="admin-input"
        placeholder="库名（可选，默认文件名）"
        style="width:180px"
      />
      <label class="admin-upload">
        <input
          type="file"
          accept=".xlsx,.csv"
          ?disabled=${t.libraryUploading}
          @change=${n=>{var l,c;const i=n.target,s=(l=i.files)==null?void 0:l[0],o=i.closest(".admin-row"),r=o==null?void 0:o.querySelector('[data-library-name-input="true"]'),a=((c=r==null?void 0:r.value)==null?void 0:c.trim())??"";s&&e.onLibraryUpload(s,a||s.name.replace(/\.[^.]+$/,"")),i.value=""}}
        />
        <span>${t.libraryUploading?"上传中…":"上传新库 (.xlsx/.csv)"}</span>
      </label>
    </div>
  `}function q_(e){const t=e.host.adminData,n=t.activeLibraryId!=null?t.libraries.find(i=>i.id===t.activeLibraryId)??null:null;return p`
    <div class="admin-block">
      ${t.libraryUploadWarnings.length>0?p`<div class="admin-warn-bar">
            <strong>上传警告（数据已导入）：</strong>
            <ul>
              ${t.libraryUploadWarnings.map(i=>p`<li>${i}</li>`)}
            </ul>
            <button type="button" class="admin-btn admin-btn--sm" @click=${e.onLibraryWarningsDismiss}>
              知道了
            </button>
          </div>`:$}
      ${t.librariesError?p`<p class="admin-err">${t.librariesError}</p>`:$}

      ${n==null?j_(e):K_(e,n)}
    </div>
  `}function j_(e){const t=e.host.adminData;return p`
    <div class="admin-row" style="margin-bottom:12px;">
      ${U_(e)}
    </div>
    ${t.librariesLoading?p`<p class="admin-muted">加载中…</p>`:$}
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>库名</th>
            <th>列数</th>
            <th>行数</th>
            <th>上传时间</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${t.libraries.length===0&&!t.librariesLoading?p`<tr>
                <td colspan="5" class="admin-muted" style="text-align:center">暂无自定义库，点击上传新库</td>
              </tr>`:t.libraries.map(n=>p`
                  <tr>
                    <td>${n.name}</td>
                    <td>${n.columns.length}</td>
                    <td>${n.row_count.toLocaleString()}</td>
                    <td>${n.created_at.slice(0,10)}</td>
                    <td class="admin-actions">
                      <button type="button" class="admin-btn admin-btn--sm" @click=${()=>e.onLibraryView(n.id)}>
                        查看
                      </button>
                      <button
                        type="button"
                        class="admin-btn admin-btn--sm admin-btn--danger"
                        @click=${()=>{confirm(`确认删除库「${n.name}」及其所有数据？此操作不可恢复。`)&&e.onLibraryDrop(n.id)}}
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                `)}
        </tbody>
      </table>
    </div>
  `}function K_(e,t){const n=e.host.adminData;return p`
    <div class="admin-row" style="margin-bottom:8px;">
      <button type="button" class="admin-btn admin-btn--ghost" @click=${e.onLibraryBack}>← 返回</button>
      <strong style="margin-left:8px;">${t.name}</strong>
      <span class="admin-muted" style="margin-left:8px;">${t.columns.length} 列 · ${n.libraryDataTotal} 行</span>
      <input
        type="search"
        class="admin-input admin-input--grow"
        style="margin-left:auto;"
        placeholder="搜索（仅文本列）"
        .value=${n.libraryDataQuery}
        @input=${i=>e.onLibraryQueryInput(i.target.value)}
      />
      <button type="button" class="admin-btn" @click=${()=>e.onLibraryQueryApply(t.id)}>应用筛选</button>
      <button type="button" class="admin-btn" @click=${()=>e.onLibraryRefresh(t.id)}>刷新</button>
      <button type="button" class="admin-btn admin-btn--primary" @click=${()=>e.onLibraryAddRow(t.id)}>
        + 新增一行
      </button>
    </div>
    ${n.libraryDataError?p`<p class="admin-err">${n.libraryDataError}</p>`:$}
    ${n.libraryDataLoading?p`<p class="admin-muted">加载中…</p>`:$}
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            ${t.columns.map(i=>p`<th title=${i.original_name}>${i.name}</th>`)}
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${n.libraryData.map((i,s)=>p`
              <tr>
                ${t.columns.map(o=>p`
                    <td>
                      <input
                        class="admin-cell ${o.type==="NUMERIC"?"admin-cell--num":""}"
                        .value=${i[o.name]!=null?String(i[o.name]):""}
                        @input=${r=>e.onLibraryFieldChange(s,o.name,o.type==="NUMERIC"?lp(r.target.value):r.target.value)}
                      />
                    </td>
                  `)}
                <td class="admin-actions">
                  <button type="button" class="admin-btn admin-btn--sm" @click=${()=>e.onLibrarySave(t.id,s)}>
                    保存
                  </button>
                  ${i.id!=null?p`<button
                        type="button"
                        class="admin-btn admin-btn--sm admin-btn--danger"
                        @click=${()=>{confirm("确认删除此行？")&&e.onLibraryDeleteRow(t.id,i.id)}}
                      >
                        删除
                      </button>`:$}
                </td>
              </tr>
            `)}
        </tbody>
      </table>
    </div>
  `}const Kd=["trace","debug","info","warn","error","fatal"];function W_(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleTimeString()}function V_(e,t){return t?[e.message,e.subsystem,e.raw].filter(Boolean).join(" ").toLowerCase().includes(t):!0}function G_(e){const t=e.filterText.trim().toLowerCase(),n=Kd.some(o=>!e.levelFilters[o]),i=e.entries.filter(o=>o.level&&!e.levelFilters[o.level]?!1:V_(o,t)),s=t||n?"filtered":"visible";return p`
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
        ${Kd.map(o=>p`
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

      ${e.file?p`<div class="muted" style="margin-top: 10px;">File: ${e.file}</div>`:$}
      ${e.truncated?p`
              <div class="callout" style="margin-top: 10px">Log output truncated; showing latest chunk.</div>
            `:$}
      ${e.error?p`<div class="callout danger" style="margin-top: 10px;">${e.error}</div>`:$}

      <div class="log-stream" style="margin-top: 12px;" @scroll=${e.onScroll}>
        ${i.length===0?p`
                <div class="muted" style="padding: 12px">No log entries.</div>
              `:i.map(o=>p`
                <div class="log-row">
                  <div class="log-time mono">${W_(o.time)}</div>
                  <div class="log-level ${o.level??""}">${o.level??""}</div>
                  <div class="log-subsystem mono">${o.subsystem??""}</div>
                  <div class="log-message mono">${o.message??o.raw}</div>
                </div>
              `)}
      </div>
    </section>
  `}function Q_(e){return p`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">${g("oos.title")}</div>
          <div class="card-sub">${g("oos.subtitle")}</div>
        </div>
        <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
          ${e.loading?g("oos.actions.loading"):g("oos.actions.refresh")}
        </button>
      </div>
      ${e.db==="sqlite"?p`<div
            class="callout"
            style="margin-top: 12px; background: var(--bg-muted, #f5f5f5); color: var(--text-muted, #666);"
          >
            ${g("oos.db.local")}
          </div>`:$}
      ${e.error?p`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:$}
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        ${e.stats?Y_(e.stats):e.loading?$:p`<div class="muted">${g("oos.empty.stats")}</div>`}
      </div>
      <div style="margin-top: 24px;">
        <div class="row" style="justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="card-title" style="font-size: 1rem;">${g("oos.list.title")}</div>
          ${e.onOpenAddForm&&!e.showAddForm?p`<button class="btn btn--primary" ?disabled=${e.loading} @click=${e.onOpenAddForm}>${g("oos.actions.addManual")}</button>`:$}
        </div>
        ${e.showAddForm&&e.onAdd&&e.onCloseAddForm?p`
              <div class="callout" style="margin-bottom: 12px; padding: 12px;">
                <div style="font-weight: 600; margin-bottom: 8px;">${g("oos.addForm.title")}</div>
                <form @submit=${async t=>{var o,r,a,l,c,d,u;t.preventDefault();const n=t.target,i=((r=(o=n.querySelector('[name="oos_add_name"]'))==null?void 0:o.value)==null?void 0:r.trim())??"";if(!i)return;await e.onAdd({product_name:i,specification:((l=(a=n.querySelector('[name="oos_add_spec"]'))==null?void 0:a.value)==null?void 0:l.trim())??"",quantity:parseFloat(((c=n.querySelector('[name="oos_add_qty"]'))==null?void 0:c.value)??"0")||0,unit:((u=(d=n.querySelector('[name="oos_add_unit"]'))==null?void 0:d.value)==null?void 0:u.trim())??""})&&e.onCloseAddForm()}}>
                  <div class="row" style="gap: 8px; flex-wrap: wrap; align-items: center;">
                    <input
                      name="oos_add_name"
                      type="text"
                      placeholder=${g("oos.addForm.namePlaceholder")}
                      required
                      style="min-width: 140px;"
                    />
                    <input
                      name="oos_add_spec"
                      type="text"
                      placeholder=${g("oos.addForm.specPlaceholder")}
                      style="min-width: 80px;"
                    />
                    <input
                      name="oos_add_qty"
                      type="number"
                      placeholder=${g("oos.addForm.qtyPlaceholder")}
                      min="0"
                      step="1"
                      value="0"
                      style="width: 80px;"
                    />
                    <input
                      name="oos_add_unit"
                      type="text"
                      placeholder=${g("oos.addForm.unitPlaceholder")}
                      style="width: 60px;"
                    />
                    <button type="submit" class="btn btn--primary">
                      ${g("oos.actions.confirm")}
                    </button>
                    <button type="button" class="btn" @click=${e.onCloseAddForm}>
                      ${g("common.cancel")}
                    </button>
                  </div>
                </form>
              </div>
            `:$}
        <div class="list" style="margin-top: 8px;">
          ${e.list.length===0?p`<div class="muted">${g("oos.empty.list")}</div>`:e.list.slice(0,50).map(t=>X_(t,e.onDelete))}
        </div>
        ${e.list.length>50?p`<div class="muted" style="margin-top: 8px;">
              ${g("oos.list.more",{count:String(e.list.length)})}
            </div>`:$}
      </div>
      <div class="row" style="margin-top: 24px; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">
            ${g("oos.byFile.title")}
          </div>
          <div class="list" style="margin-top: 8px;">
            ${e.byFile.length===0?p`<div class="muted">${g("oos.byFile.empty")}</div>`:e.byFile.slice(0,10).map(t=>J_(t))}
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">
            ${g("oos.byTime.title")}
          </div>
          <div class="list" style="margin-top: 8px;">
            ${e.byTime.length===0?p`<div class="muted">${g("oos.byTime.empty")}</div>`:e.byTime.slice(0,10).map(t=>Z_(t))}
          </div>
        </div>
      </div>
    </section>
  `}function Y_(e){return[{label:g("oos.stats.totalRecords"),value:e.total_records},{label:g("oos.stats.outOfStockCount"),value:e.out_of_stock_count},{label:g("oos.stats.today"),value:e.today_count},{label:g("oos.stats.reportedGe2"),value:e.notified_count},{label:g("oos.stats.emailSentProductCount"),value:e.email_sent_product_count}].map(n=>p`
      <div class="card stat-card" style="min-width: 100px;">
        <div class="stat-value">${n.value}</div>
        <div class="stat-label">${n.label}</div>
      </div>
    `)}function X_(e,t){const n=e.product_name??"",i=e.specification??"",s=e.unit??"",o=e.quantity??"",r=e.count??1,a=(e.email_sent_count??0)>0||e.email_status==="sent",l=g(a?"oos.email.sent":"oos.email.notSent"),c=e.product_key??"";return p`
    <div class="list-item" style="display: flex; justify-content: space-between; align-items: center;">
      <div class="list-main">
        <div class="list-title">${n} ${i}</div>
        <div class="list-sub">
          ${g("oos.list.meta",{qty:String(o),unit:s,count:String(r),email:l})}
        </div>
      </div>
      ${t&&c?p`<button
            class="btn"
            style="flex-shrink: 0;"
            title=${g("oos.actions.deleteHint")}
            @click=${()=>t(c)}
          >
            ${g("oos.actions.delete")}
          </button>`:$}
    </div>
  `}function J_(e){const t=e.file_name??"",n=e.total_records??0,i=e.uploaded_at?String(e.uploaded_at).length>19?String(e.uploaded_at).slice(0,10)+" "+String(e.uploaded_at).slice(11,19):String(e.uploaded_at):"";return p`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${t}</div>
        <div class="list-sub">
          ${g("oos.byFile.count",{count:String(n)})}${i?` · ${i}`:""}
        </div>
      </div>
    </div>
  `}function Z_(e){return p`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.date??""}</div>
        <div class="list-sub">
          ${g("oos.byTime.count",{count:String(e.count??0)})}
        </div>
      </div>
    </div>
  `}function e1(e){return p`
    <section class="card" style="margin-top: 24px;">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">${g("shortage.title")}</div>
          <div class="card-sub">${g("shortage.subtitle")}</div>
        </div>
        <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
          ${e.loading?g("shortage.actions.loading"):g("shortage.actions.refresh")}
        </button>
      </div>
      ${e.db==="sqlite"?p`<div
            class="callout"
            style="margin-top: 12px; background: var(--bg-muted, #f5f5f5); color: var(--text-muted, #666);"
          >
            ${g("shortage.db.local")}
          </div>`:$}
      ${e.error?p`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:$}
      <div class="row" style="margin-top: 16px; gap: 12px; flex-wrap: wrap;">
        ${e.stats?t1(e.stats):e.loading?$:p`<div class="muted">${g("shortage.empty.stats")}</div>`}
      </div>
      <div style="margin-top: 24px;">
        <div class="row" style="justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="card-title" style="font-size: 1rem;">${g("shortage.list.title")}</div>
          ${e.onOpenAddForm&&!e.showAddForm?p`<button class="btn btn--primary" ?disabled=${e.loading} @click=${e.onOpenAddForm}>${g("shortage.actions.addManual")}</button>`:$}
        </div>
        ${e.showAddForm&&e.onAdd&&e.onCloseAddForm?p`
              <div class="callout" style="margin-bottom: 12px; padding: 12px;">
                <div style="font-weight: 600; margin-bottom: 8px;">
                  ${g("shortage.addForm.title")}
                </div>
                <form @submit=${async t=>{var a,l,c,d,u,h;t.preventDefault();const n=t.target,i=((l=(a=n.querySelector('[name="shortage_add_name"]'))==null?void 0:a.value)==null?void 0:l.trim())??"";if(!i)return;const s=parseFloat(((c=n.querySelector('[name="shortage_add_qty"]'))==null?void 0:c.value)??"0")||0,o=parseFloat(((d=n.querySelector('[name="shortage_add_avail"]'))==null?void 0:d.value)??"0")||0;await e.onAdd({product_name:i,specification:((h=(u=n.querySelector('[name="shortage_add_spec"]'))==null?void 0:u.value)==null?void 0:h.trim())??"",quantity:s,available_qty:o})&&e.onCloseAddForm()}}>
                  <div class="row" style="gap: 8px; flex-wrap: wrap; align-items: center;">
                    <input
                      name="shortage_add_name"
                      type="text"
                      placeholder=${g("shortage.addForm.namePlaceholder")}
                      required
                      style="min-width: 140px;"
                    />
                    <input
                      name="shortage_add_spec"
                      type="text"
                      placeholder=${g("shortage.addForm.specPlaceholder")}
                      style="min-width: 80px;"
                    />
                    <input
                      name="shortage_add_qty"
                      type="number"
                      placeholder=${g("shortage.addForm.qtyPlaceholder")}
                      min="0"
                      step="1"
                      value="0"
                      style="width: 80px;"
                      title=${g("shortage.addForm.qtyTitle")}
                    />
                    <input
                      name="shortage_add_avail"
                      type="number"
                      placeholder=${g("shortage.addForm.availPlaceholder")}
                      min="0"
                      step="1"
                      value="0"
                      style="width: 80px;"
                      title=${g("shortage.addForm.availTitle")}
                    />
                    <span
                      class="muted"
                      style="font-size: 0.9rem;"
                      title=${g("shortage.addForm.diffTitle")}
                    >
                      ${g("shortage.addForm.diffText")}
                    </span>
                    <button type="submit" class="btn btn--primary">
                      ${g("shortage.actions.confirm")}
                    </button>
                    <button type="button" class="btn" @click=${e.onCloseAddForm}>
                      ${g("common.cancel")}
                    </button>
                  </div>
                </form>
              </div>
            `:$}
        <div class="list" style="margin-top: 8px;">
          ${e.list.length===0?p`<div class="muted">${g("shortage.empty.list")}</div>`:e.list.slice(0,50).map(t=>n1(t,e.onDelete))}
        </div>
        ${e.list.length>50?p`<div class="muted" style="margin-top: 8px;">
              ${g("shortage.list.more",{count:String(e.list.length)})}
            </div>`:$}
      </div>
      <div class="row" style="margin-top: 24px; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">
            ${g("shortage.byFile.title")}
          </div>
          <div class="list" style="margin-top: 8px;">
            ${e.byFile.length===0?p`<div class="muted">${g("shortage.byFile.empty")}</div>`:e.byFile.slice(0,10).map(t=>i1(t))}
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <div class="card-title" style="font-size: 1rem;">
            ${g("shortage.byTime.title")}
          </div>
          <div class="list" style="margin-top: 8px;">
            ${e.byTime.length===0?p`<div class="muted">${g("shortage.byTime.empty")}</div>`:e.byTime.slice(0,10).map(t=>s1(t))}
          </div>
        </div>
      </div>
    </section>
  `}function t1(e){return[{label:g("shortage.stats.totalRecords"),value:e.total_records},{label:g("shortage.stats.shortageProductCount"),value:e.shortage_product_count},{label:g("shortage.stats.today"),value:e.today_count},{label:g("shortage.stats.reportedGe2"),value:e.reported_ge2_count}].map(n=>p`
      <div class="card stat-card" style="min-width: 100px;">
        <div class="stat-value">${n.value}</div>
        <div class="stat-label">${n.label}</div>
      </div>
    `)}function n1(e,t){const n=e.product_name??"",i=e.specification??"",s=e.quantity??0,o=e.available_qty??0,r=e.shortfall??0,a=e.count??1,l=e.product_key??"";return p`
    <div class="list-item" style="display: flex; justify-content: space-between; align-items: center;">
      <div class="list-main">
        <div class="list-title">${n} ${i?` · ${i}`:""}</div>
        <div class="list-sub">
          ${g("shortage.list.meta",{qty:String(s),avail:String(o),diff:String(r),count:String(a)})}
        </div>
      </div>
      ${t&&l?p`<button
            class="btn"
            style="flex-shrink: 0;"
            title=${g("shortage.actions.deleteHint")}
            @click=${()=>t(l)}
          >
            ${g("shortage.actions.delete")}
          </button>`:$}
    </div>
  `}function i1(e){const t=e.file_name??"",n=e.total_records??0,i=e.uploaded_at?String(e.uploaded_at).length>19?String(e.uploaded_at).slice(0,10)+" "+String(e.uploaded_at).slice(11,19):String(e.uploaded_at):"";return p`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${t}</div>
        <div class="list-sub">
          ${g("shortage.byFile.count",{count:String(n)})}${i?` · ${i}`:""}
        </div>
      </div>
    </div>
  `}function s1(e){return p`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.date??""}</div>
        <div class="list-sub">
          ${g("shortage.byTime.count",{count:String(e.count??0)})}
        </div>
      </div>
    </div>
  `}const Vt="__defaults__",Wd=[{value:"deny",label:"Deny"},{value:"allowlist",label:"Allowlist"},{value:"full",label:"Full"}],o1=[{value:"off",label:"Off"},{value:"on-miss",label:"On miss"},{value:"always",label:"Always"}];function Vd(e){return e==="allowlist"||e==="full"||e==="deny"?e:"deny"}function r1(e){return e==="always"||e==="off"||e==="on-miss"?e:"on-miss"}function a1(e){const t=(e==null?void 0:e.defaults)??{};return{security:Vd(t.security),ask:r1(t.ask),askFallback:Vd(t.askFallback??"deny"),autoAllowSkills:!!(t.autoAllowSkills??!1)}}function l1(e){const t=(e==null?void 0:e.agents)??{},n=Array.isArray(t.list)?t.list:[],i=[];return n.forEach(s=>{if(!s||typeof s!="object")return;const o=s,r=typeof o.id=="string"?o.id.trim():"";if(!r)return;const a=typeof o.name=="string"?o.name.trim():void 0,l=o.default===!0;i.push({id:r,name:a||void 0,isDefault:l})}),i}function c1(e,t){const n=l1(e),i=Object.keys((t==null?void 0:t.agents)??{}),s=new Map;n.forEach(r=>s.set(r.id,r)),i.forEach(r=>{s.has(r)||s.set(r,{id:r})});const o=Array.from(s.values());return o.length===0&&o.push({id:"main",isDefault:!0}),o.sort((r,a)=>{var d,u;if(r.isDefault&&!a.isDefault)return-1;if(!r.isDefault&&a.isDefault)return 1;const l=(d=r.name)!=null&&d.trim()?r.name:r.id,c=(u=a.name)!=null&&u.trim()?a.name:a.id;return l.localeCompare(c)}),o}function d1(e,t){return e===Vt?Vt:e&&t.some(n=>n.id===e)?e:Vt}function u1(e){var u;const t=e.execApprovalsForm??((u=e.execApprovalsSnapshot)==null?void 0:u.file)??null,n=!!t,i=a1(t),s=c1(e.configForm,t),o=y1(e.nodes),r=e.execApprovalsTarget;let a=r==="node"&&e.execApprovalsTargetNodeId?e.execApprovalsTargetNodeId:null;r==="node"&&a&&!o.some(h=>h.id===a)&&(a=null);const l=d1(e.execApprovalsSelectedAgent,s),c=l!==Vt?((t==null?void 0:t.agents)??{})[l]??null:null,d=Array.isArray(c==null?void 0:c.allowlist)?c.allowlist??[]:[];return{ready:n,disabled:e.execApprovalsSaving||e.execApprovalsLoading,dirty:e.execApprovalsDirty,loading:e.execApprovalsLoading,saving:e.execApprovalsSaving,form:t,defaults:i,selectedScope:l,selectedAgent:c,agents:s,allowlist:d,target:r,targetNodeId:a,targetNodes:o,onSelectScope:e.onExecApprovalsSelectAgent,onSelectTarget:e.onExecApprovalsTargetChange,onPatch:e.onExecApprovalsPatch,onRemove:e.onExecApprovalsRemove,onLoad:e.onLoadExecApprovals,onSave:e.onSaveExecApprovals}}function h1(e){const t=e.ready,n=e.target!=="node"||!!e.targetNodeId;return p`
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

      ${f1(e)}

      ${t?p`
            ${p1(e)}
            ${g1(e)}
            ${e.selectedScope===Vt?$:m1(e)}
          `:p`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load exec approvals to edit allowlists.</div>
            <button class="btn" ?disabled=${e.loading||!n} @click=${e.onLoad}>
              ${e.loading?"Loading…":"Load approvals"}
            </button>
          </div>`}
    </section>
  `}function f1(e){const t=e.targetNodes.length>0,n=e.targetNodeId??"";return p`
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
          ${e.target==="node"?p`
                <label class="field">
                  <span>Node</span>
                  <select
                    ?disabled=${e.disabled||!t}
                    @change=${i=>{const o=i.target.value.trim();e.onSelectTarget("node",o||null)}}
                  >
                    <option value="" ?selected=${n===""}>Select node</option>
                    ${e.targetNodes.map(i=>p`<option
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
      ${e.target==="node"&&!t?p`
              <div class="muted">No nodes advertise exec approvals yet.</div>
            `:$}
    </div>
  `}function p1(e){return p`
    <div class="row" style="margin-top: 12px; gap: 8px; flex-wrap: wrap;">
      <span class="label">Scope</span>
      <div class="row" style="gap: 8px; flex-wrap: wrap;">
        <button
          class="btn btn--sm ${e.selectedScope===Vt?"active":""}"
          @click=${()=>e.onSelectScope(Vt)}
        >
          Defaults
        </button>
        ${e.agents.map(t=>{var i;const n=(i=t.name)!=null&&i.trim()?`${t.name} (${t.id})`:t.id;return p`
            <button
              class="btn btn--sm ${e.selectedScope===t.id?"active":""}"
              @click=${()=>e.onSelectScope(t.id)}
            >
              ${n}
            </button>
          `})}
      </div>
    </div>
  `}function g1(e){const t=e.selectedScope===Vt,n=e.defaults,i=e.selectedAgent??{},s=t?["defaults"]:["agents",e.selectedScope],o=typeof i.security=="string"?i.security:void 0,r=typeof i.ask=="string"?i.ask:void 0,a=typeof i.askFallback=="string"?i.askFallback:void 0,l=t?n.security:o??"__default__",c=t?n.ask:r??"__default__",d=t?n.askFallback:a??"__default__",u=typeof i.autoAllowSkills=="boolean"?i.autoAllowSkills:void 0,h=u??n.autoAllowSkills,f=u==null;return p`
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
              @change=${m=>{const v=m.target.value;!t&&v==="__default__"?e.onRemove([...s,"security"]):e.onPatch([...s,"security"],v)}}
            >
              ${t?$:p`<option value="__default__" ?selected=${l==="__default__"}>
                    Use default (${n.security})
                  </option>`}
              ${Wd.map(m=>p`<option
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
              @change=${m=>{const v=m.target.value;!t&&v==="__default__"?e.onRemove([...s,"ask"]):e.onPatch([...s,"ask"],v)}}
            >
              ${t?$:p`<option value="__default__" ?selected=${c==="__default__"}>
                    Use default (${n.ask})
                  </option>`}
              ${o1.map(m=>p`<option
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
              @change=${m=>{const v=m.target.value;!t&&v==="__default__"?e.onRemove([...s,"askFallback"]):e.onPatch([...s,"askFallback"],v)}}
            >
              ${t?$:p`<option value="__default__" ?selected=${d==="__default__"}>
                    Use default (${n.askFallback})
                  </option>`}
              ${Wd.map(m=>p`<option
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
            ${t?"Allow skill executables listed by the Gateway.":f?`Using default (${n.autoAllowSkills?"on":"off"}).`:`Override (${h?"on":"off"}).`}
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>Enabled</span>
            <input
              type="checkbox"
              ?disabled=${e.disabled}
              .checked=${h}
              @change=${m=>{const b=m.target;e.onPatch([...s,"autoAllowSkills"],b.checked)}}
            />
          </label>
          ${!t&&!f?p`<button
                class="btn btn--sm"
                ?disabled=${e.disabled}
                @click=${()=>e.onRemove([...s,"autoAllowSkills"])}
              >
                Use default
              </button>`:$}
        </div>
      </div>
    </div>
  `}function m1(e){const t=["agents",e.selectedScope,"allowlist"],n=e.allowlist;return p`
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
      ${n.length===0?p`
              <div class="muted">No allowlist entries yet.</div>
            `:n.map((i,s)=>b1(e,i,s))}
    </div>
  `}function b1(e,t,n){var r;const i=t.lastUsedAt?gs(t.lastUsedAt):"never",s=t.lastUsedCommand?fa(t.lastUsedCommand,120):null,o=t.lastResolvedPath?fa(t.lastResolvedPath,120):null;return p`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${(r=t.pattern)!=null&&r.trim()?t.pattern:"New pattern"}</div>
        <div class="list-sub">Last used: ${i}</div>
        ${s?p`<div class="list-sub mono">${s}</div>`:$}
        ${o?p`<div class="list-sub mono">${o}</div>`:$}
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
  `}function y1(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(a=>String(a)==="system.execApprovals.get"||String(a)==="system.execApprovals.set"))continue;const o=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!o)continue;const r=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():o;t.push({id:o,label:r===o?o:`${r} · ${o}`})}return t.sort((n,i)=>n.label.localeCompare(i.label)),t}function v1(e){const t=S1(e),n=u1(e);return p`
    ${h1(n)}
    ${$1(t)}
    ${x1(e)}
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
        ${e.nodes.length===0?p`
                <div class="muted">No nodes found.</div>
              `:e.nodes.map(i=>E1(i))}
      </div>
    </section>
  `}function x1(e){const t=e.devicesList??{pending:[],paired:[]},n=Array.isArray(t.pending)?t.pending:[],i=Array.isArray(t.paired)?t.paired:[];return p`
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
      ${e.devicesError?p`<div class="callout danger" style="margin-top: 12px;">${e.devicesError}</div>`:$}
      <div class="list" style="margin-top: 16px;">
        ${n.length>0?p`
              <div class="muted" style="margin-bottom: 8px;">Pending</div>
              ${n.map(s=>w1(s,e))}
            `:$}
        ${i.length>0?p`
              <div class="muted" style="margin-top: 12px; margin-bottom: 8px;">Paired</div>
              ${i.map(s=>_1(s,e))}
            `:$}
        ${n.length===0&&i.length===0?p`
                <div class="muted">No paired devices.</div>
              `:$}
      </div>
    </section>
  `}function w1(e,t){var a,l;const n=((a=e.displayName)==null?void 0:a.trim())||e.deviceId,i=typeof e.ts=="number"?gs(e.ts):"n/a",s=(l=e.role)!=null&&l.trim()?`role: ${e.role}`:"role: -",o=e.isRepair?" · repair":"",r=e.remoteIp?` · ${e.remoteIp}`:"";return p`
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
  `}function _1(e,t){var a;const n=((a=e.displayName)==null?void 0:a.trim())||e.deviceId,i=e.remoteIp?` · ${e.remoteIp}`:"",s=`roles: ${ha(e.roles)}`,o=`scopes: ${ha(e.scopes)}`,r=Array.isArray(e.tokens)?e.tokens:[];return p`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${n}</div>
        <div class="list-sub">${e.deviceId}${i}</div>
        <div class="muted" style="margin-top: 6px;">${s} · ${o}</div>
        ${r.length===0?p`
                <div class="muted" style="margin-top: 6px">Tokens: none</div>
              `:p`
              <div class="muted" style="margin-top: 10px;">Tokens</div>
              <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 6px;">
                ${r.map(l=>k1(e.deviceId,l,t))}
              </div>
            `}
      </div>
    </div>
  `}function k1(e,t,n){const i=t.revokedAtMs?"revoked":"active",s=`scopes: ${ha(t.scopes)}`,o=gs(t.rotatedAtMs??t.createdAtMs??t.lastUsedAtMs??null);return p`
    <div class="row" style="justify-content: space-between; gap: 8px;">
      <div class="list-sub">${t.role} · ${i} · ${s} · ${o}</div>
      <div class="row" style="justify-content: flex-end; gap: 6px; flex-wrap: wrap;">
        <button
          class="btn btn--sm"
          @click=${()=>n.onDeviceRotate(e,t.role,t.scopes)}
        >
          Rotate
        </button>
        ${t.revokedAtMs?$:p`
              <button
                class="btn btn--sm danger"
                @click=${()=>n.onDeviceRevoke(e,t.role)}
              >
                Revoke
              </button>
            `}
      </div>
    </div>
  `}function S1(e){const t=e.configForm,n=T1(e.nodes),{defaultBinding:i,agents:s}=C1(t),o=!!t,r=e.configSaving||e.configFormMode==="raw";return{ready:o,disabled:r,configDirty:e.configDirty,configLoading:e.configLoading,configSaving:e.configSaving,defaultBinding:i,agents:s,nodes:n,onBindDefault:e.onBindDefault,onBindAgent:e.onBindAgent,onSave:e.onSaveBindings,onLoadConfig:e.onLoadConfig,formMode:e.configFormMode}}function $1(e){const t=e.nodes.length>0,n=e.defaultBinding??"";return p`
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

      ${e.formMode==="raw"?p`
              <div class="callout warn" style="margin-top: 12px">
                Switch the Config tab to <strong>Form</strong> mode to edit bindings here.
              </div>
            `:$}

      ${e.ready?p`
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
                      ${e.nodes.map(i=>p`<option
                            value=${i.id}
                            ?selected=${n===i.id}
                          >
                            ${i.label}
                          </option>`)}
                    </select>
                  </label>
                  ${t?$:p`
                          <div class="muted">No nodes with system.run available.</div>
                        `}
                </div>
              </div>

              ${e.agents.length===0?p`
                      <div class="muted">No agents found.</div>
                    `:e.agents.map(i=>A1(i,e))}
            </div>
          `:p`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load config to edit bindings.</div>
            <button class="btn" ?disabled=${e.configLoading} @click=${e.onLoadConfig}>
              ${e.configLoading?"Loading…":"Load config"}
            </button>
          </div>`}
    </section>
  `}function A1(e,t){var o;const n=e.binding??"__default__",i=(o=e.name)!=null&&o.trim()?`${e.name} (${e.id})`:e.id,s=t.nodes.length>0;return p`
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
            ${t.nodes.map(r=>p`<option
                  value=${r.id}
                  ?selected=${n===r.id}
                >
                  ${r.label}
                </option>`)}
          </select>
        </label>
      </div>
    </div>
  `}function T1(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(a=>String(a)==="system.run"))continue;const o=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!o)continue;const r=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():o;t.push({id:o,label:r===o?o:`${r} · ${o}`})}return t.sort((n,i)=>n.label.localeCompare(i.label)),t}function C1(e){const t={id:"main",name:void 0,index:0,isDefault:!0,binding:null};if(!e||typeof e!="object")return{defaultBinding:null,agents:[t]};const i=(e.tools??{}).exec??{},s=typeof i.node=="string"&&i.node.trim()?i.node.trim():null,o=e.agents??{},r=Array.isArray(o.list)?o.list:[];if(r.length===0)return{defaultBinding:s,agents:[t]};const a=[];return r.forEach((l,c)=>{if(!l||typeof l!="object")return;const d=l,u=typeof d.id=="string"?d.id.trim():"";if(!u)return;const h=typeof d.name=="string"?d.name.trim():void 0,f=d.default===!0,b=(d.tools??{}).exec??{},v=typeof b.node=="string"&&b.node.trim()?b.node.trim():null;a.push({id:u,name:h||void 0,index:c,isDefault:f,binding:v})}),a.length===0&&a.push(t),{defaultBinding:s,agents:a}}function E1(e){const t=!!e.connected,n=!!e.paired,i=typeof e.displayName=="string"&&e.displayName.trim()||(typeof e.nodeId=="string"?e.nodeId:"unknown"),s=Array.isArray(e.caps)?e.caps:[],o=Array.isArray(e.commands)?e.commands:[];return p`
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
          ${s.slice(0,12).map(r=>p`<span class="chip">${String(r)}</span>`)}
          ${o.slice(0,8).map(r=>p`<span class="chip">${String(r)}</span>`)}
        </div>
      </div>
    </div>
  `}/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */function _s(e){return e+.5|0}const zt=(e,t,n)=>Math.max(Math.min(e,n),t);function Mi(e){return zt(_s(e*2.55),0,255)}function Gt(e){return zt(_s(e*255),0,255)}function Rt(e){return zt(_s(e/2.55)/100,0,1)}function Gd(e){return zt(_s(e*100),0,100)}const Ze={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},Fa=[..."0123456789ABCDEF"],R1=e=>Fa[e&15],M1=e=>Fa[(e&240)>>4]+Fa[e&15],js=e=>(e&240)>>4===(e&15),P1=e=>js(e.r)&&js(e.g)&&js(e.b)&&js(e.a);function D1(e){var t=e.length,n;return e[0]==="#"&&(t===4||t===5?n={r:255&Ze[e[1]]*17,g:255&Ze[e[2]]*17,b:255&Ze[e[3]]*17,a:t===5?Ze[e[4]]*17:255}:(t===7||t===9)&&(n={r:Ze[e[1]]<<4|Ze[e[2]],g:Ze[e[3]]<<4|Ze[e[4]],b:Ze[e[5]]<<4|Ze[e[6]],a:t===9?Ze[e[7]]<<4|Ze[e[8]]:255})),n}const L1=(e,t)=>e<255?t(e):"";function I1(e){var t=P1(e)?R1:M1;return e?"#"+t(e.r)+t(e.g)+t(e.b)+L1(e.a,t):void 0}const O1=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function dp(e,t,n){const i=t*Math.min(n,1-n),s=(o,r=(o+e/30)%12)=>n-i*Math.max(Math.min(r-3,9-r,1),-1);return[s(0),s(8),s(4)]}function F1(e,t,n){const i=(s,o=(s+e/60)%6)=>n-n*t*Math.max(Math.min(o,4-o,1),0);return[i(5),i(3),i(1)]}function N1(e,t,n){const i=dp(e,1,.5);let s;for(t+n>1&&(s=1/(t+n),t*=s,n*=s),s=0;s<3;s++)i[s]*=1-t-n,i[s]+=t;return i}function B1(e,t,n,i,s){return e===s?(t-n)/i+(t<n?6:0):t===s?(n-e)/i+2:(e-t)/i+4}function Ul(e){const n=e.r/255,i=e.g/255,s=e.b/255,o=Math.max(n,i,s),r=Math.min(n,i,s),a=(o+r)/2;let l,c,d;return o!==r&&(d=o-r,c=a>.5?d/(2-o-r):d/(o+r),l=B1(n,i,s,d,o),l=l*60+.5),[l|0,c||0,a]}function ql(e,t,n,i){return(Array.isArray(t)?e(t[0],t[1],t[2]):e(t,n,i)).map(Gt)}function jl(e,t,n){return ql(dp,e,t,n)}function z1(e,t,n){return ql(N1,e,t,n)}function H1(e,t,n){return ql(F1,e,t,n)}function up(e){return(e%360+360)%360}function U1(e){const t=O1.exec(e);let n=255,i;if(!t)return;t[5]!==i&&(n=t[6]?Mi(+t[5]):Gt(+t[5]));const s=up(+t[2]),o=+t[3]/100,r=+t[4]/100;return t[1]==="hwb"?i=z1(s,o,r):t[1]==="hsv"?i=H1(s,o,r):i=jl(s,o,r),{r:i[0],g:i[1],b:i[2],a:n}}function q1(e,t){var n=Ul(e);n[0]=up(n[0]+t),n=jl(n),e.r=n[0],e.g=n[1],e.b=n[2]}function j1(e){if(!e)return;const t=Ul(e),n=t[0],i=Gd(t[1]),s=Gd(t[2]);return e.a<255?`hsla(${n}, ${i}%, ${s}%, ${Rt(e.a)})`:`hsl(${n}, ${i}%, ${s}%)`}const Qd={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},Yd={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function K1(){const e={},t=Object.keys(Yd),n=Object.keys(Qd);let i,s,o,r,a;for(i=0;i<t.length;i++){for(r=a=t[i],s=0;s<n.length;s++)o=n[s],a=a.replace(o,Qd[o]);o=parseInt(Yd[r],16),e[a]=[o>>16&255,o>>8&255,o&255]}return e}let Ks;function W1(e){Ks||(Ks=K1(),Ks.transparent=[0,0,0,0]);const t=Ks[e.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}const V1=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function G1(e){const t=V1.exec(e);let n=255,i,s,o;if(t){if(t[7]!==i){const r=+t[7];n=t[8]?Mi(r):zt(r*255,0,255)}return i=+t[1],s=+t[3],o=+t[5],i=255&(t[2]?Mi(i):zt(i,0,255)),s=255&(t[4]?Mi(s):zt(s,0,255)),o=255&(t[6]?Mi(o):zt(o,0,255)),{r:i,g:s,b:o,a:n}}}function Q1(e){return e&&(e.a<255?`rgba(${e.r}, ${e.g}, ${e.b}, ${Rt(e.a)})`:`rgb(${e.r}, ${e.g}, ${e.b})`)}const Qr=e=>e<=.0031308?e*12.92:Math.pow(e,1/2.4)*1.055-.055,Kn=e=>e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4);function Y1(e,t,n){const i=Kn(Rt(e.r)),s=Kn(Rt(e.g)),o=Kn(Rt(e.b));return{r:Gt(Qr(i+n*(Kn(Rt(t.r))-i))),g:Gt(Qr(s+n*(Kn(Rt(t.g))-s))),b:Gt(Qr(o+n*(Kn(Rt(t.b))-o))),a:e.a+n*(t.a-e.a)}}function Ws(e,t,n){if(e){let i=Ul(e);i[t]=Math.max(0,Math.min(i[t]+i[t]*n,t===0?360:1)),i=jl(i),e.r=i[0],e.g=i[1],e.b=i[2]}}function hp(e,t){return e&&Object.assign(t||{},e)}function Xd(e){var t={r:0,g:0,b:0,a:255};return Array.isArray(e)?e.length>=3&&(t={r:e[0],g:e[1],b:e[2],a:255},e.length>3&&(t.a=Gt(e[3]))):(t=hp(e,{r:0,g:0,b:0,a:1}),t.a=Gt(t.a)),t}function X1(e){return e.charAt(0)==="r"?G1(e):U1(e)}class os{constructor(t){if(t instanceof os)return t;const n=typeof t;let i;n==="object"?i=Xd(t):n==="string"&&(i=D1(t)||W1(t)||X1(t)),this._rgb=i,this._valid=!!i}get valid(){return this._valid}get rgb(){var t=hp(this._rgb);return t&&(t.a=Rt(t.a)),t}set rgb(t){this._rgb=Xd(t)}rgbString(){return this._valid?Q1(this._rgb):void 0}hexString(){return this._valid?I1(this._rgb):void 0}hslString(){return this._valid?j1(this._rgb):void 0}mix(t,n){if(t){const i=this.rgb,s=t.rgb;let o;const r=n===o?.5:n,a=2*r-1,l=i.a-s.a,c=((a*l===-1?a:(a+l)/(1+a*l))+1)/2;o=1-c,i.r=255&c*i.r+o*s.r+.5,i.g=255&c*i.g+o*s.g+.5,i.b=255&c*i.b+o*s.b+.5,i.a=r*i.a+(1-r)*s.a,this.rgb=i}return this}interpolate(t,n){return t&&(this._rgb=Y1(this._rgb,t._rgb,n)),this}clone(){return new os(this.rgb)}alpha(t){return this._rgb.a=Gt(t),this}clearer(t){const n=this._rgb;return n.a*=1-t,this}greyscale(){const t=this._rgb,n=_s(t.r*.3+t.g*.59+t.b*.11);return t.r=t.g=t.b=n,this}opaquer(t){const n=this._rgb;return n.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return Ws(this._rgb,2,t),this}darken(t){return Ws(this._rgb,2,-t),this}saturate(t){return Ws(this._rgb,1,t),this}desaturate(t){return Ws(this._rgb,1,-t),this}rotate(t){return q1(this._rgb,t),this}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */function Tt(){}const J1=(()=>{let e=0;return()=>e++})();function Z(e){return e==null}function me(e){if(Array.isArray&&Array.isArray(e))return!0;const t=Object.prototype.toString.call(e);return t.slice(0,7)==="[object"&&t.slice(-6)==="Array]"}function ee(e){return e!==null&&Object.prototype.toString.call(e)==="[object Object]"}function ve(e){return(typeof e=="number"||e instanceof Number)&&isFinite(+e)}function Xe(e,t){return ve(e)?e:t}function G(e,t){return typeof e>"u"?t:e}const Z1=(e,t)=>typeof e=="string"&&e.endsWith("%")?parseFloat(e)/100:+e/t,fp=(e,t)=>typeof e=="string"&&e.endsWith("%")?parseFloat(e)/100*t:+e;function ue(e,t,n){if(e&&typeof e.call=="function")return e.apply(n,t)}function re(e,t,n,i){let s,o,r;if(me(e))for(o=e.length,s=0;s<o;s++)t.call(n,e[s],s);else if(ee(e))for(r=Object.keys(e),o=r.length,s=0;s<o;s++)t.call(n,e[r[s]],r[s])}function Eo(e,t){let n,i,s,o;if(!e||!t||e.length!==t.length)return!1;for(n=0,i=e.length;n<i;++n)if(s=e[n],o=t[n],s.datasetIndex!==o.datasetIndex||s.index!==o.index)return!1;return!0}function Ro(e){if(me(e))return e.map(Ro);if(ee(e)){const t=Object.create(null),n=Object.keys(e),i=n.length;let s=0;for(;s<i;++s)t[n[s]]=Ro(e[n[s]]);return t}return e}function pp(e){return["__proto__","prototype","constructor"].indexOf(e)===-1}function ek(e,t,n,i){if(!pp(e))return;const s=t[e],o=n[e];ee(s)&&ee(o)?rs(s,o,i):t[e]=Ro(o)}function rs(e,t,n){const i=me(t)?t:[t],s=i.length;if(!ee(e))return e;n=n||{};const o=n.merger||ek;let r;for(let a=0;a<s;++a){if(r=i[a],!ee(r))continue;const l=Object.keys(r);for(let c=0,d=l.length;c<d;++c)o(l[c],e,r,n)}return e}function Ki(e,t){return rs(e,t,{merger:tk})}function tk(e,t,n){if(!pp(e))return;const i=t[e],s=n[e];ee(i)&&ee(s)?Ki(i,s):Object.prototype.hasOwnProperty.call(t,e)||(t[e]=Ro(s))}const Jd={"":e=>e,x:e=>e.x,y:e=>e.y};function nk(e){const t=e.split("."),n=[];let i="";for(const s of t)i+=s,i.endsWith("\\")?i=i.slice(0,-1)+".":(n.push(i),i="");return n}function ik(e){const t=nk(e);return n=>{for(const i of t){if(i==="")break;n=n&&n[i]}return n}}function Xt(e,t){return(Jd[t]||(Jd[t]=ik(t)))(e)}function Kl(e){return e.charAt(0).toUpperCase()+e.slice(1)}const as=e=>typeof e<"u",Jt=e=>typeof e=="function",Zd=(e,t)=>{if(e.size!==t.size)return!1;for(const n of e)if(!t.has(n))return!1;return!0};function sk(e){return e.type==="mouseup"||e.type==="click"||e.type==="contextmenu"}const ne=Math.PI,he=2*ne,ok=he+ne,Mo=Number.POSITIVE_INFINITY,rk=ne/180,xe=ne/2,cn=ne/4,eu=ne*2/3,Ht=Math.log10,wt=Math.sign;function Wi(e,t,n){return Math.abs(e-t)<n}function tu(e){const t=Math.round(e);e=Wi(e,t,e/1e3)?t:e;const n=Math.pow(10,Math.floor(Ht(e))),i=e/n;return(i<=1?1:i<=2?2:i<=5?5:10)*n}function ak(e){const t=[],n=Math.sqrt(e);let i;for(i=1;i<n;i++)e%i===0&&(t.push(i),t.push(e/i));return n===(n|0)&&t.push(n),t.sort((s,o)=>s-o).pop(),t}function lk(e){return typeof e=="symbol"||typeof e=="object"&&e!==null&&!(Symbol.toPrimitive in e||"toString"in e||"valueOf"in e)}function li(e){return!lk(e)&&!isNaN(parseFloat(e))&&isFinite(e)}function ck(e,t){const n=Math.round(e);return n-t<=e&&n+t>=e}function gp(e,t,n){let i,s,o;for(i=0,s=e.length;i<s;i++)o=e[i][n],isNaN(o)||(t.min=Math.min(t.min,o),t.max=Math.max(t.max,o))}function lt(e){return e*(ne/180)}function Wl(e){return e*(180/ne)}function nu(e){if(!ve(e))return;let t=1,n=0;for(;Math.round(e*t)/t!==e;)t*=10,n++;return n}function mp(e,t){const n=t.x-e.x,i=t.y-e.y,s=Math.sqrt(n*n+i*i);let o=Math.atan2(i,n);return o<-.5*ne&&(o+=he),{angle:o,distance:s}}function Na(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function dk(e,t){return(e-t+ok)%he-ne}function Oe(e){return(e%he+he)%he}function ls(e,t,n,i){const s=Oe(e),o=Oe(t),r=Oe(n),a=Oe(o-s),l=Oe(r-s),c=Oe(s-o),d=Oe(s-r);return s===o||s===r||i&&o===r||a>l&&c<d}function Ce(e,t,n){return Math.max(t,Math.min(n,e))}function uk(e){return Ce(e,-32768,32767)}function Mt(e,t,n,i=1e-6){return e>=Math.min(t,n)-i&&e<=Math.max(t,n)+i}function Vl(e,t,n){n=n||(r=>e[r]<t);let i=e.length-1,s=0,o;for(;i-s>1;)o=s+i>>1,n(o)?s=o:i=o;return{lo:s,hi:i}}const Pt=(e,t,n,i)=>Vl(e,n,i?s=>{const o=e[s][t];return o<n||o===n&&e[s+1][t]===n}:s=>e[s][t]<n),hk=(e,t,n)=>Vl(e,n,i=>e[i][t]>=n);function fk(e,t,n){let i=0,s=e.length;for(;i<s&&e[i]<t;)i++;for(;s>i&&e[s-1]>n;)s--;return i>0||s<e.length?e.slice(i,s):e}const bp=["push","pop","shift","splice","unshift"];function pk(e,t){if(e._chartjs){e._chartjs.listeners.push(t);return}Object.defineProperty(e,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),bp.forEach(n=>{const i="_onData"+Kl(n),s=e[n];Object.defineProperty(e,n,{configurable:!0,enumerable:!1,value(...o){const r=s.apply(this,o);return e._chartjs.listeners.forEach(a=>{typeof a[i]=="function"&&a[i](...o)}),r}})})}function iu(e,t){const n=e._chartjs;if(!n)return;const i=n.listeners,s=i.indexOf(t);s!==-1&&i.splice(s,1),!(i.length>0)&&(bp.forEach(o=>{delete e[o]}),delete e._chartjs)}function yp(e){const t=new Set(e);return t.size===e.length?e:Array.from(t)}const vp=(function(){return typeof window>"u"?function(e){return e()}:window.requestAnimationFrame})();function xp(e,t){let n=[],i=!1;return function(...s){n=s,i||(i=!0,vp.call(window,()=>{i=!1,e.apply(t,n)}))}}function gk(e,t){let n;return function(...i){return t?(clearTimeout(n),n=setTimeout(e,t,i)):e.apply(this,i),t}}const Gl=e=>e==="start"?"left":e==="end"?"right":"center",Ie=(e,t,n)=>e==="start"?t:e==="end"?n:(t+n)/2,mk=(e,t,n,i)=>e===(i?"left":"right")?n:e==="center"?(t+n)/2:t;function wp(e,t,n){const i=t.length;let s=0,o=i;if(e._sorted){const{iScale:r,vScale:a,_parsed:l}=e,c=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null,d=r.axis,{min:u,max:h,minDefined:f,maxDefined:m}=r.getUserBounds();if(f){if(s=Math.min(Pt(l,d,u).lo,n?i:Pt(t,d,r.getPixelForValue(u)).lo),c){const b=l.slice(0,s+1).reverse().findIndex(v=>!Z(v[a.axis]));s-=Math.max(0,b)}s=Ce(s,0,i-1)}if(m){let b=Math.max(Pt(l,r.axis,h,!0).hi+1,n?0:Pt(t,d,r.getPixelForValue(h),!0).hi+1);if(c){const v=l.slice(b-1).findIndex(k=>!Z(k[a.axis]));b+=Math.max(0,v)}o=Ce(b,s,i)-s}else o=i-s}return{start:s,count:o}}function _p(e){const{xScale:t,yScale:n,_scaleRanges:i}=e,s={xmin:t.min,xmax:t.max,ymin:n.min,ymax:n.max};if(!i)return e._scaleRanges=s,!0;const o=i.xmin!==t.min||i.xmax!==t.max||i.ymin!==n.min||i.ymax!==n.max;return Object.assign(i,s),o}const Vs=e=>e===0||e===1,su=(e,t,n)=>-(Math.pow(2,10*(e-=1))*Math.sin((e-t)*he/n)),ou=(e,t,n)=>Math.pow(2,-10*e)*Math.sin((e-t)*he/n)+1,Vi={linear:e=>e,easeInQuad:e=>e*e,easeOutQuad:e=>-e*(e-2),easeInOutQuad:e=>(e/=.5)<1?.5*e*e:-.5*(--e*(e-2)-1),easeInCubic:e=>e*e*e,easeOutCubic:e=>(e-=1)*e*e+1,easeInOutCubic:e=>(e/=.5)<1?.5*e*e*e:.5*((e-=2)*e*e+2),easeInQuart:e=>e*e*e*e,easeOutQuart:e=>-((e-=1)*e*e*e-1),easeInOutQuart:e=>(e/=.5)<1?.5*e*e*e*e:-.5*((e-=2)*e*e*e-2),easeInQuint:e=>e*e*e*e*e,easeOutQuint:e=>(e-=1)*e*e*e*e+1,easeInOutQuint:e=>(e/=.5)<1?.5*e*e*e*e*e:.5*((e-=2)*e*e*e*e+2),easeInSine:e=>-Math.cos(e*xe)+1,easeOutSine:e=>Math.sin(e*xe),easeInOutSine:e=>-.5*(Math.cos(ne*e)-1),easeInExpo:e=>e===0?0:Math.pow(2,10*(e-1)),easeOutExpo:e=>e===1?1:-Math.pow(2,-10*e)+1,easeInOutExpo:e=>Vs(e)?e:e<.5?.5*Math.pow(2,10*(e*2-1)):.5*(-Math.pow(2,-10*(e*2-1))+2),easeInCirc:e=>e>=1?e:-(Math.sqrt(1-e*e)-1),easeOutCirc:e=>Math.sqrt(1-(e-=1)*e),easeInOutCirc:e=>(e/=.5)<1?-.5*(Math.sqrt(1-e*e)-1):.5*(Math.sqrt(1-(e-=2)*e)+1),easeInElastic:e=>Vs(e)?e:su(e,.075,.3),easeOutElastic:e=>Vs(e)?e:ou(e,.075,.3),easeInOutElastic(e){return Vs(e)?e:e<.5?.5*su(e*2,.1125,.45):.5+.5*ou(e*2-1,.1125,.45)},easeInBack(e){return e*e*((1.70158+1)*e-1.70158)},easeOutBack(e){return(e-=1)*e*((1.70158+1)*e+1.70158)+1},easeInOutBack(e){let t=1.70158;return(e/=.5)<1?.5*(e*e*(((t*=1.525)+1)*e-t)):.5*((e-=2)*e*(((t*=1.525)+1)*e+t)+2)},easeInBounce:e=>1-Vi.easeOutBounce(1-e),easeOutBounce(e){return e<1/2.75?7.5625*e*e:e<2/2.75?7.5625*(e-=1.5/2.75)*e+.75:e<2.5/2.75?7.5625*(e-=2.25/2.75)*e+.9375:7.5625*(e-=2.625/2.75)*e+.984375},easeInOutBounce:e=>e<.5?Vi.easeInBounce(e*2)*.5:Vi.easeOutBounce(e*2-1)*.5+.5};function Ql(e){if(e&&typeof e=="object"){const t=e.toString();return t==="[object CanvasPattern]"||t==="[object CanvasGradient]"}return!1}function ru(e){return Ql(e)?e:new os(e)}function Yr(e){return Ql(e)?e:new os(e).saturate(.5).darken(.1).hexString()}const bk=["x","y","borderWidth","radius","tension"],yk=["color","borderColor","backgroundColor"];function vk(e){e.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),e.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>t!=="onProgress"&&t!=="onComplete"&&t!=="fn"}),e.set("animations",{colors:{type:"color",properties:yk},numbers:{type:"number",properties:bk}}),e.describe("animations",{_fallback:"animation"}),e.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>t|0}}}})}function xk(e){e.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const au=new Map;function wk(e,t){t=t||{};const n=e+JSON.stringify(t);let i=au.get(n);return i||(i=new Intl.NumberFormat(e,t),au.set(n,i)),i}function ks(e,t,n){return wk(t,n).format(e)}const kp={values(e){return me(e)?e:""+e},numeric(e,t,n){if(e===0)return"0";const i=this.chart.options.locale;let s,o=e;if(n.length>1){const c=Math.max(Math.abs(n[0].value),Math.abs(n[n.length-1].value));(c<1e-4||c>1e15)&&(s="scientific"),o=_k(e,n)}const r=Ht(Math.abs(o)),a=isNaN(r)?1:Math.max(Math.min(-1*Math.floor(r),20),0),l={notation:s,minimumFractionDigits:a,maximumFractionDigits:a};return Object.assign(l,this.options.ticks.format),ks(e,i,l)},logarithmic(e,t,n){if(e===0)return"0";const i=n[t].significand||e/Math.pow(10,Math.floor(Ht(e)));return[1,2,3,5,10,15].includes(i)||t>.8*n.length?kp.numeric.call(this,e,t,n):""}};function _k(e,t){let n=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(n)>=1&&e!==Math.floor(e)&&(n=e-Math.floor(e)),n}var ir={formatters:kp};function kk(e){e.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,n)=>n.lineWidth,tickColor:(t,n)=>n.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:ir.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),e.route("scale.ticks","color","","color"),e.route("scale.grid","color","","borderColor"),e.route("scale.border","color","","borderColor"),e.route("scale.title","color","","color"),e.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&t!=="callback"&&t!=="parser",_indexable:t=>t!=="borderDash"&&t!=="tickBorderDash"&&t!=="dash"}),e.describe("scales",{_fallback:"scale"}),e.describe("scale.ticks",{_scriptable:t=>t!=="backdropPadding"&&t!=="callback",_indexable:t=>t!=="backdropPadding"})}const Dn=Object.create(null),Ba=Object.create(null);function Gi(e,t){if(!t)return e;const n=t.split(".");for(let i=0,s=n.length;i<s;++i){const o=n[i];e=e[o]||(e[o]=Object.create(null))}return e}function Xr(e,t,n){return typeof t=="string"?rs(Gi(e,t),n):rs(Gi(e,""),t)}class Sk{constructor(t,n){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=i=>i.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(i,s)=>Yr(s.backgroundColor),this.hoverBorderColor=(i,s)=>Yr(s.borderColor),this.hoverColor=(i,s)=>Yr(s.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(n)}set(t,n){return Xr(this,t,n)}get(t){return Gi(this,t)}describe(t,n){return Xr(Ba,t,n)}override(t,n){return Xr(Dn,t,n)}route(t,n,i,s){const o=Gi(this,t),r=Gi(this,i),a="_"+n;Object.defineProperties(o,{[a]:{value:o[n],writable:!0},[n]:{enumerable:!0,get(){const l=this[a],c=r[s];return ee(l)?Object.assign({},c,l):G(l,c)},set(l){this[a]=l}}})}apply(t){t.forEach(n=>n(this))}}var be=new Sk({_scriptable:e=>!e.startsWith("on"),_indexable:e=>e!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[vk,xk,kk]);function $k(e){return!e||Z(e.size)||Z(e.family)?null:(e.style?e.style+" ":"")+(e.weight?e.weight+" ":"")+e.size+"px "+e.family}function Po(e,t,n,i,s){let o=t[s];return o||(o=t[s]=e.measureText(s).width,n.push(s)),o>i&&(i=o),i}function Ak(e,t,n,i){i=i||{};let s=i.data=i.data||{},o=i.garbageCollect=i.garbageCollect||[];i.font!==t&&(s=i.data={},o=i.garbageCollect=[],i.font=t),e.save(),e.font=t;let r=0;const a=n.length;let l,c,d,u,h;for(l=0;l<a;l++)if(u=n[l],u!=null&&!me(u))r=Po(e,s,o,r,u);else if(me(u))for(c=0,d=u.length;c<d;c++)h=u[c],h!=null&&!me(h)&&(r=Po(e,s,o,r,h));e.restore();const f=o.length/2;if(f>n.length){for(l=0;l<f;l++)delete s[o[l]];o.splice(0,f)}return r}function dn(e,t,n){const i=e.currentDevicePixelRatio,s=n!==0?Math.max(n/2,.5):0;return Math.round((t-s)*i)/i+s}function lu(e,t){!t&&!e||(t=t||e.getContext("2d"),t.save(),t.resetTransform(),t.clearRect(0,0,e.width,e.height),t.restore())}function za(e,t,n,i){Sp(e,t,n,i,null)}function Sp(e,t,n,i,s){let o,r,a,l,c,d,u,h;const f=t.pointStyle,m=t.rotation,b=t.radius;let v=(m||0)*rk;if(f&&typeof f=="object"&&(o=f.toString(),o==="[object HTMLImageElement]"||o==="[object HTMLCanvasElement]")){e.save(),e.translate(n,i),e.rotate(v),e.drawImage(f,-f.width/2,-f.height/2,f.width,f.height),e.restore();return}if(!(isNaN(b)||b<=0)){switch(e.beginPath(),f){default:s?e.ellipse(n,i,s/2,b,0,0,he):e.arc(n,i,b,0,he),e.closePath();break;case"triangle":d=s?s/2:b,e.moveTo(n+Math.sin(v)*d,i-Math.cos(v)*b),v+=eu,e.lineTo(n+Math.sin(v)*d,i-Math.cos(v)*b),v+=eu,e.lineTo(n+Math.sin(v)*d,i-Math.cos(v)*b),e.closePath();break;case"rectRounded":c=b*.516,l=b-c,r=Math.cos(v+cn)*l,u=Math.cos(v+cn)*(s?s/2-c:l),a=Math.sin(v+cn)*l,h=Math.sin(v+cn)*(s?s/2-c:l),e.arc(n-u,i-a,c,v-ne,v-xe),e.arc(n+h,i-r,c,v-xe,v),e.arc(n+u,i+a,c,v,v+xe),e.arc(n-h,i+r,c,v+xe,v+ne),e.closePath();break;case"rect":if(!m){l=Math.SQRT1_2*b,d=s?s/2:l,e.rect(n-d,i-l,2*d,2*l);break}v+=cn;case"rectRot":u=Math.cos(v)*(s?s/2:b),r=Math.cos(v)*b,a=Math.sin(v)*b,h=Math.sin(v)*(s?s/2:b),e.moveTo(n-u,i-a),e.lineTo(n+h,i-r),e.lineTo(n+u,i+a),e.lineTo(n-h,i+r),e.closePath();break;case"crossRot":v+=cn;case"cross":u=Math.cos(v)*(s?s/2:b),r=Math.cos(v)*b,a=Math.sin(v)*b,h=Math.sin(v)*(s?s/2:b),e.moveTo(n-u,i-a),e.lineTo(n+u,i+a),e.moveTo(n+h,i-r),e.lineTo(n-h,i+r);break;case"star":u=Math.cos(v)*(s?s/2:b),r=Math.cos(v)*b,a=Math.sin(v)*b,h=Math.sin(v)*(s?s/2:b),e.moveTo(n-u,i-a),e.lineTo(n+u,i+a),e.moveTo(n+h,i-r),e.lineTo(n-h,i+r),v+=cn,u=Math.cos(v)*(s?s/2:b),r=Math.cos(v)*b,a=Math.sin(v)*b,h=Math.sin(v)*(s?s/2:b),e.moveTo(n-u,i-a),e.lineTo(n+u,i+a),e.moveTo(n+h,i-r),e.lineTo(n-h,i+r);break;case"line":r=s?s/2:Math.cos(v)*b,a=Math.sin(v)*b,e.moveTo(n-r,i-a),e.lineTo(n+r,i+a);break;case"dash":e.moveTo(n,i),e.lineTo(n+Math.cos(v)*(s?s/2:b),i+Math.sin(v)*b);break;case!1:e.closePath();break}e.fill(),t.borderWidth>0&&e.stroke()}}function Dt(e,t,n){return n=n||.5,!t||e&&e.x>t.left-n&&e.x<t.right+n&&e.y>t.top-n&&e.y<t.bottom+n}function sr(e,t){e.save(),e.beginPath(),e.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),e.clip()}function or(e){e.restore()}function Tk(e,t,n,i,s){if(!t)return e.lineTo(n.x,n.y);if(s==="middle"){const o=(t.x+n.x)/2;e.lineTo(o,t.y),e.lineTo(o,n.y)}else s==="after"!=!!i?e.lineTo(t.x,n.y):e.lineTo(n.x,t.y);e.lineTo(n.x,n.y)}function Ck(e,t,n,i){if(!t)return e.lineTo(n.x,n.y);e.bezierCurveTo(i?t.cp1x:t.cp2x,i?t.cp1y:t.cp2y,i?n.cp2x:n.cp1x,i?n.cp2y:n.cp1y,n.x,n.y)}function Ek(e,t){t.translation&&e.translate(t.translation[0],t.translation[1]),Z(t.rotation)||e.rotate(t.rotation),t.color&&(e.fillStyle=t.color),t.textAlign&&(e.textAlign=t.textAlign),t.textBaseline&&(e.textBaseline=t.textBaseline)}function Rk(e,t,n,i,s){if(s.strikethrough||s.underline){const o=e.measureText(i),r=t-o.actualBoundingBoxLeft,a=t+o.actualBoundingBoxRight,l=n-o.actualBoundingBoxAscent,c=n+o.actualBoundingBoxDescent,d=s.strikethrough?(l+c)/2:c;e.strokeStyle=e.fillStyle,e.beginPath(),e.lineWidth=s.decorationWidth||2,e.moveTo(r,d),e.lineTo(a,d),e.stroke()}}function Mk(e,t){const n=e.fillStyle;e.fillStyle=t.color,e.fillRect(t.left,t.top,t.width,t.height),e.fillStyle=n}function Ln(e,t,n,i,s,o={}){const r=me(t)?t:[t],a=o.strokeWidth>0&&o.strokeColor!=="";let l,c;for(e.save(),e.font=s.string,Ek(e,o),l=0;l<r.length;++l)c=r[l],o.backdrop&&Mk(e,o.backdrop),a&&(o.strokeColor&&(e.strokeStyle=o.strokeColor),Z(o.strokeWidth)||(e.lineWidth=o.strokeWidth),e.strokeText(c,n,i,o.maxWidth)),e.fillText(c,n,i,o.maxWidth),Rk(e,n,i,c,o),i+=Number(s.lineHeight);e.restore()}function cs(e,t){const{x:n,y:i,w:s,h:o,radius:r}=t;e.arc(n+r.topLeft,i+r.topLeft,r.topLeft,1.5*ne,ne,!0),e.lineTo(n,i+o-r.bottomLeft),e.arc(n+r.bottomLeft,i+o-r.bottomLeft,r.bottomLeft,ne,xe,!0),e.lineTo(n+s-r.bottomRight,i+o),e.arc(n+s-r.bottomRight,i+o-r.bottomRight,r.bottomRight,xe,0,!0),e.lineTo(n+s,i+r.topRight),e.arc(n+s-r.topRight,i+r.topRight,r.topRight,0,-xe,!0),e.lineTo(n+r.topLeft,i)}const Pk=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,Dk=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function Lk(e,t){const n=(""+e).match(Pk);if(!n||n[1]==="normal")return t*1.2;switch(e=+n[2],n[3]){case"px":return e;case"%":e/=100;break}return t*e}const Ik=e=>+e||0;function Yl(e,t){const n={},i=ee(t),s=i?Object.keys(t):t,o=ee(e)?i?r=>G(e[r],e[t[r]]):r=>e[r]:()=>e;for(const r of s)n[r]=Ik(o(r));return n}function $p(e){return Yl(e,{top:"y",right:"x",bottom:"y",left:"x"})}function kn(e){return Yl(e,["topLeft","topRight","bottomLeft","bottomRight"])}function Be(e){const t=$p(e);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function Ae(e,t){e=e||{},t=t||be.font;let n=G(e.size,t.size);typeof n=="string"&&(n=parseInt(n,10));let i=G(e.style,t.style);i&&!(""+i).match(Dk)&&(console.warn('Invalid font style specified: "'+i+'"'),i=void 0);const s={family:G(e.family,t.family),lineHeight:Lk(G(e.lineHeight,t.lineHeight),n),size:n,style:i,weight:G(e.weight,t.weight),string:""};return s.string=$k(s),s}function Pi(e,t,n,i){let s,o,r;for(s=0,o=e.length;s<o;++s)if(r=e[s],r!==void 0&&r!==void 0)return r}function Ok(e,t,n){const{min:i,max:s}=e,o=fp(t,(s-i)/2),r=(a,l)=>n&&a===0?0:a+l;return{min:r(i,-Math.abs(o)),max:r(s,o)}}function nn(e,t){return Object.assign(Object.create(e),t)}function Xl(e,t=[""],n,i,s=()=>e[0]){const o=n||e;typeof i>"u"&&(i=Ep("_fallback",e));const r={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:e,_rootScopes:o,_fallback:i,_getTarget:s,override:a=>Xl([a,...e],t,o,i)};return new Proxy(r,{deleteProperty(a,l){return delete a[l],delete a._keys,delete e[0][l],!0},get(a,l){return Tp(a,l,()=>jk(l,t,e,a))},getOwnPropertyDescriptor(a,l){return Reflect.getOwnPropertyDescriptor(a._scopes[0],l)},getPrototypeOf(){return Reflect.getPrototypeOf(e[0])},has(a,l){return du(a).includes(l)},ownKeys(a){return du(a)},set(a,l,c){const d=a._storage||(a._storage=s());return a[l]=d[l]=c,delete a._keys,!0}})}function ci(e,t,n,i){const s={_cacheable:!1,_proxy:e,_context:t,_subProxy:n,_stack:new Set,_descriptors:Ap(e,i),setContext:o=>ci(e,o,n,i),override:o=>ci(e.override(o),t,n,i)};return new Proxy(s,{deleteProperty(o,r){return delete o[r],delete e[r],!0},get(o,r,a){return Tp(o,r,()=>Nk(o,r,a))},getOwnPropertyDescriptor(o,r){return o._descriptors.allKeys?Reflect.has(e,r)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(e,r)},getPrototypeOf(){return Reflect.getPrototypeOf(e)},has(o,r){return Reflect.has(e,r)},ownKeys(){return Reflect.ownKeys(e)},set(o,r,a){return e[r]=a,delete o[r],!0}})}function Ap(e,t={scriptable:!0,indexable:!0}){const{_scriptable:n=t.scriptable,_indexable:i=t.indexable,_allKeys:s=t.allKeys}=e;return{allKeys:s,scriptable:n,indexable:i,isScriptable:Jt(n)?n:()=>n,isIndexable:Jt(i)?i:()=>i}}const Fk=(e,t)=>e?e+Kl(t):t,Jl=(e,t)=>ee(t)&&e!=="adapters"&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function Tp(e,t,n){if(Object.prototype.hasOwnProperty.call(e,t)||t==="constructor")return e[t];const i=n();return e[t]=i,i}function Nk(e,t,n){const{_proxy:i,_context:s,_subProxy:o,_descriptors:r}=e;let a=i[t];return Jt(a)&&r.isScriptable(t)&&(a=Bk(t,a,e,n)),me(a)&&a.length&&(a=zk(t,a,e,r.isIndexable)),Jl(t,a)&&(a=ci(a,s,o&&o[t],r)),a}function Bk(e,t,n,i){const{_proxy:s,_context:o,_subProxy:r,_stack:a}=n;if(a.has(e))throw new Error("Recursion detected: "+Array.from(a).join("->")+"->"+e);a.add(e);let l=t(o,r||i);return a.delete(e),Jl(e,l)&&(l=Zl(s._scopes,s,e,l)),l}function zk(e,t,n,i){const{_proxy:s,_context:o,_subProxy:r,_descriptors:a}=n;if(typeof o.index<"u"&&i(e))return t[o.index%t.length];if(ee(t[0])){const l=t,c=s._scopes.filter(d=>d!==l);t=[];for(const d of l){const u=Zl(c,s,e,d);t.push(ci(u,o,r&&r[e],a))}}return t}function Cp(e,t,n){return Jt(e)?e(t,n):e}const Hk=(e,t)=>e===!0?t:typeof e=="string"?Xt(t,e):void 0;function Uk(e,t,n,i,s){for(const o of t){const r=Hk(n,o);if(r){e.add(r);const a=Cp(r._fallback,n,s);if(typeof a<"u"&&a!==n&&a!==i)return a}else if(r===!1&&typeof i<"u"&&n!==i)return null}return!1}function Zl(e,t,n,i){const s=t._rootScopes,o=Cp(t._fallback,n,i),r=[...e,...s],a=new Set;a.add(i);let l=cu(a,r,n,o||n,i);return l===null||typeof o<"u"&&o!==n&&(l=cu(a,r,o,l,i),l===null)?!1:Xl(Array.from(a),[""],s,o,()=>qk(t,n,i))}function cu(e,t,n,i,s){for(;n;)n=Uk(e,t,n,i,s);return n}function qk(e,t,n){const i=e._getTarget();t in i||(i[t]={});const s=i[t];return me(s)&&ee(n)?n:s||{}}function jk(e,t,n,i){let s;for(const o of t)if(s=Ep(Fk(o,e),n),typeof s<"u")return Jl(e,s)?Zl(n,i,e,s):s}function Ep(e,t){for(const n of t){if(!n)continue;const i=n[e];if(typeof i<"u")return i}}function du(e){let t=e._keys;return t||(t=e._keys=Kk(e._scopes)),t}function Kk(e){const t=new Set;for(const n of e)for(const i of Object.keys(n).filter(s=>!s.startsWith("_")))t.add(i);return Array.from(t)}function Rp(e,t,n,i){const{iScale:s}=e,{key:o="r"}=this._parsing,r=new Array(i);let a,l,c,d;for(a=0,l=i;a<l;++a)c=a+n,d=t[c],r[a]={r:s.parse(Xt(d,o),c)};return r}const Wk=Number.EPSILON||1e-14,di=(e,t)=>t<e.length&&!e[t].skip&&e[t],Mp=e=>e==="x"?"y":"x";function Vk(e,t,n,i){const s=e.skip?t:e,o=t,r=n.skip?t:n,a=Na(o,s),l=Na(r,o);let c=a/(a+l),d=l/(a+l);c=isNaN(c)?0:c,d=isNaN(d)?0:d;const u=i*c,h=i*d;return{previous:{x:o.x-u*(r.x-s.x),y:o.y-u*(r.y-s.y)},next:{x:o.x+h*(r.x-s.x),y:o.y+h*(r.y-s.y)}}}function Gk(e,t,n){const i=e.length;let s,o,r,a,l,c=di(e,0);for(let d=0;d<i-1;++d)if(l=c,c=di(e,d+1),!(!l||!c)){if(Wi(t[d],0,Wk)){n[d]=n[d+1]=0;continue}s=n[d]/t[d],o=n[d+1]/t[d],a=Math.pow(s,2)+Math.pow(o,2),!(a<=9)&&(r=3/Math.sqrt(a),n[d]=s*r*t[d],n[d+1]=o*r*t[d])}}function Qk(e,t,n="x"){const i=Mp(n),s=e.length;let o,r,a,l=di(e,0);for(let c=0;c<s;++c){if(r=a,a=l,l=di(e,c+1),!a)continue;const d=a[n],u=a[i];r&&(o=(d-r[n])/3,a[`cp1${n}`]=d-o,a[`cp1${i}`]=u-o*t[c]),l&&(o=(l[n]-d)/3,a[`cp2${n}`]=d+o,a[`cp2${i}`]=u+o*t[c])}}function Yk(e,t="x"){const n=Mp(t),i=e.length,s=Array(i).fill(0),o=Array(i);let r,a,l,c=di(e,0);for(r=0;r<i;++r)if(a=l,l=c,c=di(e,r+1),!!l){if(c){const d=c[t]-l[t];s[r]=d!==0?(c[n]-l[n])/d:0}o[r]=a?c?wt(s[r-1])!==wt(s[r])?0:(s[r-1]+s[r])/2:s[r-1]:s[r]}Gk(e,s,o),Qk(e,o,t)}function Gs(e,t,n){return Math.max(Math.min(e,n),t)}function Xk(e,t){let n,i,s,o,r,a=Dt(e[0],t);for(n=0,i=e.length;n<i;++n)r=o,o=a,a=n<i-1&&Dt(e[n+1],t),o&&(s=e[n],r&&(s.cp1x=Gs(s.cp1x,t.left,t.right),s.cp1y=Gs(s.cp1y,t.top,t.bottom)),a&&(s.cp2x=Gs(s.cp2x,t.left,t.right),s.cp2y=Gs(s.cp2y,t.top,t.bottom)))}function Jk(e,t,n,i,s){let o,r,a,l;if(t.spanGaps&&(e=e.filter(c=>!c.skip)),t.cubicInterpolationMode==="monotone")Yk(e,s);else{let c=i?e[e.length-1]:e[0];for(o=0,r=e.length;o<r;++o)a=e[o],l=Vk(c,a,e[Math.min(o+1,r-(i?0:1))%r],t.tension),a.cp1x=l.previous.x,a.cp1y=l.previous.y,a.cp2x=l.next.x,a.cp2y=l.next.y,c=a}t.capBezierPoints&&Xk(e,n)}function ec(){return typeof window<"u"&&typeof document<"u"}function tc(e){let t=e.parentNode;return t&&t.toString()==="[object ShadowRoot]"&&(t=t.host),t}function Do(e,t,n){let i;return typeof e=="string"?(i=parseInt(e,10),e.indexOf("%")!==-1&&(i=i/100*t.parentNode[n])):i=e,i}const rr=e=>e.ownerDocument.defaultView.getComputedStyle(e,null);function Zk(e,t){return rr(e).getPropertyValue(t)}const e2=["top","right","bottom","left"];function Sn(e,t,n){const i={};n=n?"-"+n:"";for(let s=0;s<4;s++){const o=e2[s];i[o]=parseFloat(e[t+"-"+o+n])||0}return i.width=i.left+i.right,i.height=i.top+i.bottom,i}const t2=(e,t,n)=>(e>0||t>0)&&(!n||!n.shadowRoot);function n2(e,t){const n=e.touches,i=n&&n.length?n[0]:e,{offsetX:s,offsetY:o}=i;let r=!1,a,l;if(t2(s,o,e.target))a=s,l=o;else{const c=t.getBoundingClientRect();a=i.clientX-c.left,l=i.clientY-c.top,r=!0}return{x:a,y:l,box:r}}function pn(e,t){if("native"in e)return e;const{canvas:n,currentDevicePixelRatio:i}=t,s=rr(n),o=s.boxSizing==="border-box",r=Sn(s,"padding"),a=Sn(s,"border","width"),{x:l,y:c,box:d}=n2(e,n),u=r.left+(d&&a.left),h=r.top+(d&&a.top);let{width:f,height:m}=t;return o&&(f-=r.width+a.width,m-=r.height+a.height),{x:Math.round((l-u)/f*n.width/i),y:Math.round((c-h)/m*n.height/i)}}function i2(e,t,n){let i,s;if(t===void 0||n===void 0){const o=e&&tc(e);if(!o)t=e.clientWidth,n=e.clientHeight;else{const r=o.getBoundingClientRect(),a=rr(o),l=Sn(a,"border","width"),c=Sn(a,"padding");t=r.width-c.width-l.width,n=r.height-c.height-l.height,i=Do(a.maxWidth,o,"clientWidth"),s=Do(a.maxHeight,o,"clientHeight")}}return{width:t,height:n,maxWidth:i||Mo,maxHeight:s||Mo}}const Ut=e=>Math.round(e*10)/10;function s2(e,t,n,i){const s=rr(e),o=Sn(s,"margin"),r=Do(s.maxWidth,e,"clientWidth")||Mo,a=Do(s.maxHeight,e,"clientHeight")||Mo,l=i2(e,t,n);let{width:c,height:d}=l;if(s.boxSizing==="content-box"){const h=Sn(s,"border","width"),f=Sn(s,"padding");c-=f.width+h.width,d-=f.height+h.height}return c=Math.max(0,c-o.width),d=Math.max(0,i?c/i:d-o.height),c=Ut(Math.min(c,r,l.maxWidth)),d=Ut(Math.min(d,a,l.maxHeight)),c&&!d&&(d=Ut(c/2)),(t!==void 0||n!==void 0)&&i&&l.height&&d>l.height&&(d=l.height,c=Ut(Math.floor(d*i))),{width:c,height:d}}function uu(e,t,n){const i=t||1,s=Ut(e.height*i),o=Ut(e.width*i);e.height=Ut(e.height),e.width=Ut(e.width);const r=e.canvas;return r.style&&(n||!r.style.height&&!r.style.width)&&(r.style.height=`${e.height}px`,r.style.width=`${e.width}px`),e.currentDevicePixelRatio!==i||r.height!==s||r.width!==o?(e.currentDevicePixelRatio=i,r.height=s,r.width=o,e.ctx.setTransform(i,0,0,i,0,0),!0):!1}const o2=(function(){let e=!1;try{const t={get passive(){return e=!0,!1}};ec()&&(window.addEventListener("test",null,t),window.removeEventListener("test",null,t))}catch{}return e})();function hu(e,t){const n=Zk(e,t),i=n&&n.match(/^(\d+)(\.\d+)?px$/);return i?+i[1]:void 0}function gn(e,t,n,i){return{x:e.x+n*(t.x-e.x),y:e.y+n*(t.y-e.y)}}function r2(e,t,n,i){return{x:e.x+n*(t.x-e.x),y:i==="middle"?n<.5?e.y:t.y:i==="after"?n<1?e.y:t.y:n>0?t.y:e.y}}function a2(e,t,n,i){const s={x:e.cp2x,y:e.cp2y},o={x:t.cp1x,y:t.cp1y},r=gn(e,s,n),a=gn(s,o,n),l=gn(o,t,n),c=gn(r,a,n),d=gn(a,l,n);return gn(c,d,n)}const l2=function(e,t){return{x(n){return e+e+t-n},setWidth(n){t=n},textAlign(n){return n==="center"?n:n==="right"?"left":"right"},xPlus(n,i){return n-i},leftForLtr(n,i){return n-i}}},c2=function(){return{x(e){return e},setWidth(e){},textAlign(e){return e},xPlus(e,t){return e+t},leftForLtr(e,t){return e}}};function Jn(e,t,n){return e?l2(t,n):c2()}function Pp(e,t){let n,i;(t==="ltr"||t==="rtl")&&(n=e.canvas.style,i=[n.getPropertyValue("direction"),n.getPropertyPriority("direction")],n.setProperty("direction",t,"important"),e.prevTextDirection=i)}function Dp(e,t){t!==void 0&&(delete e.prevTextDirection,e.canvas.style.setProperty("direction",t[0],t[1]))}function Lp(e){return e==="angle"?{between:ls,compare:dk,normalize:Oe}:{between:Mt,compare:(t,n)=>t-n,normalize:t=>t}}function fu({start:e,end:t,count:n,loop:i,style:s}){return{start:e%n,end:t%n,loop:i&&(t-e+1)%n===0,style:s}}function d2(e,t,n){const{property:i,start:s,end:o}=n,{between:r,normalize:a}=Lp(i),l=t.length;let{start:c,end:d,loop:u}=e,h,f;if(u){for(c+=l,d+=l,h=0,f=l;h<f&&r(a(t[c%l][i]),s,o);++h)c--,d--;c%=l,d%=l}return d<c&&(d+=l),{start:c,end:d,loop:u,style:e.style}}function Ip(e,t,n){if(!n)return[e];const{property:i,start:s,end:o}=n,r=t.length,{compare:a,between:l,normalize:c}=Lp(i),{start:d,end:u,loop:h,style:f}=d2(e,t,n),m=[];let b=!1,v=null,k,T,M;const S=()=>l(s,M,k)&&a(s,M)!==0,C=()=>a(o,k)===0||l(o,M,k),y=()=>b||S(),E=()=>!b||C();for(let P=d,R=d;P<=u;++P)T=t[P%r],!T.skip&&(k=c(T[i]),k!==M&&(b=l(k,s,o),v===null&&y()&&(v=a(k,s)===0?P:R),v!==null&&E()&&(m.push(fu({start:v,end:P,loop:h,count:r,style:f})),v=null),R=P,M=k));return v!==null&&m.push(fu({start:v,end:u,loop:h,count:r,style:f})),m}function Op(e,t){const n=[],i=e.segments;for(let s=0;s<i.length;s++){const o=Ip(i[s],e.points,t);o.length&&n.push(...o)}return n}function u2(e,t,n,i){let s=0,o=t-1;if(n&&!i)for(;s<t&&!e[s].skip;)s++;for(;s<t&&e[s].skip;)s++;for(s%=t,n&&(o+=s);o>s&&e[o%t].skip;)o--;return o%=t,{start:s,end:o}}function h2(e,t,n,i){const s=e.length,o=[];let r=t,a=e[t],l;for(l=t+1;l<=n;++l){const c=e[l%s];c.skip||c.stop?a.skip||(i=!1,o.push({start:t%s,end:(l-1)%s,loop:i}),t=r=c.stop?l:null):(r=l,a.skip&&(t=l)),a=c}return r!==null&&o.push({start:t%s,end:r%s,loop:i}),o}function f2(e,t){const n=e.points,i=e.options.spanGaps,s=n.length;if(!s)return[];const o=!!e._loop,{start:r,end:a}=u2(n,s,o,i);if(i===!0)return pu(e,[{start:r,end:a,loop:o}],n,t);const l=a<r?a+s:a,c=!!e._fullLoop&&r===0&&a===s-1;return pu(e,h2(n,r,l,c),n,t)}function pu(e,t,n,i){return!i||!i.setContext||!n?t:p2(e,t,n,i)}function p2(e,t,n,i){const s=e._chart.getContext(),o=gu(e.options),{_datasetIndex:r,options:{spanGaps:a}}=e,l=n.length,c=[];let d=o,u=t[0].start,h=u;function f(m,b,v,k){const T=a?-1:1;if(m!==b){for(m+=l;n[m%l].skip;)m-=T;for(;n[b%l].skip;)b+=T;m%l!==b%l&&(c.push({start:m%l,end:b%l,loop:v,style:k}),d=k,u=b%l)}}for(const m of t){u=a?u:m.start;let b=n[u%l],v;for(h=u+1;h<=m.end;h++){const k=n[h%l];v=gu(i.setContext(nn(s,{type:"segment",p0:b,p1:k,p0DataIndex:(h-1)%l,p1DataIndex:h%l,datasetIndex:r}))),g2(v,d)&&f(u,h-1,m.loop,d),b=k,d=v}u<h-1&&f(u,h-1,m.loop,d)}return c}function gu(e){return{backgroundColor:e.backgroundColor,borderCapStyle:e.borderCapStyle,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderJoinStyle:e.borderJoinStyle,borderWidth:e.borderWidth,borderColor:e.borderColor}}function g2(e,t){if(!t)return!1;const n=[],i=function(s,o){return Ql(o)?(n.includes(o)||n.push(o),n.indexOf(o)):o};return JSON.stringify(e,i)!==JSON.stringify(t,i)}function Qs(e,t,n){return e.options.clip?e[n]:t[n]}function m2(e,t){const{xScale:n,yScale:i}=e;return n&&i?{left:Qs(n,t,"left"),right:Qs(n,t,"right"),top:Qs(i,t,"top"),bottom:Qs(i,t,"bottom")}:t}function Fp(e,t){const n=t._clip;if(n.disabled)return!1;const i=m2(t,e.chartArea);return{left:n.left===!1?0:i.left-(n.left===!0?0:n.left),right:n.right===!1?e.width:i.right+(n.right===!0?0:n.right),top:n.top===!1?0:i.top-(n.top===!0?0:n.top),bottom:n.bottom===!1?e.height:i.bottom+(n.bottom===!0?0:n.bottom)}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */class b2{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,n,i,s){const o=n.listeners[s],r=n.duration;o.forEach(a=>a({chart:t,initial:n.initial,numSteps:r,currentStep:Math.min(i-n.start,r)}))}_refresh(){this._request||(this._running=!0,this._request=vp.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(t=Date.now()){let n=0;this._charts.forEach((i,s)=>{if(!i.running||!i.items.length)return;const o=i.items;let r=o.length-1,a=!1,l;for(;r>=0;--r)l=o[r],l._active?(l._total>i.duration&&(i.duration=l._total),l.tick(t),a=!0):(o[r]=o[o.length-1],o.pop());a&&(s.draw(),this._notify(s,i,t,"progress")),o.length||(i.running=!1,this._notify(s,i,t,"complete"),i.initial=!1),n+=o.length}),this._lastDate=t,n===0&&(this._running=!1)}_getAnims(t){const n=this._charts;let i=n.get(t);return i||(i={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},n.set(t,i)),i}listen(t,n,i){this._getAnims(t).listeners[n].push(i)}add(t,n){!n||!n.length||this._getAnims(t).items.push(...n)}has(t){return this._getAnims(t).items.length>0}start(t){const n=this._charts.get(t);n&&(n.running=!0,n.start=Date.now(),n.duration=n.items.reduce((i,s)=>Math.max(i,s._duration),0),this._refresh())}running(t){if(!this._running)return!1;const n=this._charts.get(t);return!(!n||!n.running||!n.items.length)}stop(t){const n=this._charts.get(t);if(!n||!n.items.length)return;const i=n.items;let s=i.length-1;for(;s>=0;--s)i[s].cancel();n.items=[],this._notify(t,n,Date.now(),"complete")}remove(t){return this._charts.delete(t)}}var Ct=new b2;const mu="transparent",y2={boolean(e,t,n){return n>.5?t:e},color(e,t,n){const i=ru(e||mu),s=i.valid&&ru(t||mu);return s&&s.valid?s.mix(i,n).hexString():t},number(e,t,n){return e+(t-e)*n}};class v2{constructor(t,n,i,s){const o=n[i];s=Pi([t.to,s,o,t.from]);const r=Pi([t.from,o,s]);this._active=!0,this._fn=t.fn||y2[t.type||typeof r],this._easing=Vi[t.easing]||Vi.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=n,this._prop=i,this._from=r,this._to=s,this._promises=void 0}active(){return this._active}update(t,n,i){if(this._active){this._notify(!1);const s=this._target[this._prop],o=i-this._start,r=this._duration-o;this._start=i,this._duration=Math.floor(Math.max(r,t.duration)),this._total+=o,this._loop=!!t.loop,this._to=Pi([t.to,n,s,t.from]),this._from=Pi([t.from,s,n])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const n=t-this._start,i=this._duration,s=this._prop,o=this._from,r=this._loop,a=this._to;let l;if(this._active=o!==a&&(r||n<i),!this._active){this._target[s]=a,this._notify(!0);return}if(n<0){this._target[s]=o;return}l=n/i%2,l=r&&l>1?2-l:l,l=this._easing(Math.min(1,Math.max(0,l))),this._target[s]=this._fn(o,a,l)}wait(){const t=this._promises||(this._promises=[]);return new Promise((n,i)=>{t.push({res:n,rej:i})})}_notify(t){const n=t?"res":"rej",i=this._promises||[];for(let s=0;s<i.length;s++)i[s][n]()}}class Np{constructor(t,n){this._chart=t,this._properties=new Map,this.configure(n)}configure(t){if(!ee(t))return;const n=Object.keys(be.animation),i=this._properties;Object.getOwnPropertyNames(t).forEach(s=>{const o=t[s];if(!ee(o))return;const r={};for(const a of n)r[a]=o[a];(me(o.properties)&&o.properties||[s]).forEach(a=>{(a===s||!i.has(a))&&i.set(a,r)})})}_animateOptions(t,n){const i=n.options,s=w2(t,i);if(!s)return[];const o=this._createAnimations(s,i);return i.$shared&&x2(t.options.$animations,i).then(()=>{t.options=i},()=>{}),o}_createAnimations(t,n){const i=this._properties,s=[],o=t.$animations||(t.$animations={}),r=Object.keys(n),a=Date.now();let l;for(l=r.length-1;l>=0;--l){const c=r[l];if(c.charAt(0)==="$")continue;if(c==="options"){s.push(...this._animateOptions(t,n));continue}const d=n[c];let u=o[c];const h=i.get(c);if(u)if(h&&u.active()){u.update(h,d,a);continue}else u.cancel();if(!h||!h.duration){t[c]=d;continue}o[c]=u=new v2(h,t,c,d),s.push(u)}return s}update(t,n){if(this._properties.size===0){Object.assign(t,n);return}const i=this._createAnimations(t,n);if(i.length)return Ct.add(this._chart,i),!0}}function x2(e,t){const n=[],i=Object.keys(t);for(let s=0;s<i.length;s++){const o=e[i[s]];o&&o.active()&&n.push(o.wait())}return Promise.all(n)}function w2(e,t){if(!t)return;let n=e.options;if(!n){e.options=t;return}return n.$shared&&(e.options=n=Object.assign({},n,{$shared:!1,$animations:{}})),n}function bu(e,t){const n=e&&e.options||{},i=n.reverse,s=n.min===void 0?t:0,o=n.max===void 0?t:0;return{start:i?o:s,end:i?s:o}}function _2(e,t,n){if(n===!1)return!1;const i=bu(e,n),s=bu(t,n);return{top:s.end,right:i.end,bottom:s.start,left:i.start}}function k2(e){let t,n,i,s;return ee(e)?(t=e.top,n=e.right,i=e.bottom,s=e.left):t=n=i=s=e,{top:t,right:n,bottom:i,left:s,disabled:e===!1}}function Bp(e,t){const n=[],i=e._getSortedDatasetMetas(t);let s,o;for(s=0,o=i.length;s<o;++s)n.push(i[s].index);return n}function yu(e,t,n,i={}){const s=e.keys,o=i.mode==="single";let r,a,l,c;if(t===null)return;let d=!1;for(r=0,a=s.length;r<a;++r){if(l=+s[r],l===n){if(d=!0,i.all)continue;break}c=e.values[l],ve(c)&&(o||t===0||wt(t)===wt(c))&&(t+=c)}return!d&&!i.all?0:t}function S2(e,t){const{iScale:n,vScale:i}=t,s=n.axis==="x"?"x":"y",o=i.axis==="x"?"x":"y",r=Object.keys(e),a=new Array(r.length);let l,c,d;for(l=0,c=r.length;l<c;++l)d=r[l],a[l]={[s]:d,[o]:e[d]};return a}function Jr(e,t){const n=e&&e.options.stacked;return n||n===void 0&&t.stack!==void 0}function $2(e,t,n){return`${e.id}.${t.id}.${n.stack||n.type}`}function A2(e){const{min:t,max:n,minDefined:i,maxDefined:s}=e.getUserBounds();return{min:i?t:Number.NEGATIVE_INFINITY,max:s?n:Number.POSITIVE_INFINITY}}function T2(e,t,n){const i=e[t]||(e[t]={});return i[n]||(i[n]={})}function vu(e,t,n,i){for(const s of t.getMatchingVisibleMetas(i).reverse()){const o=e[s.index];if(n&&o>0||!n&&o<0)return s.index}return null}function xu(e,t){const{chart:n,_cachedMeta:i}=e,s=n._stacks||(n._stacks={}),{iScale:o,vScale:r,index:a}=i,l=o.axis,c=r.axis,d=$2(o,r,i),u=t.length;let h;for(let f=0;f<u;++f){const m=t[f],{[l]:b,[c]:v}=m,k=m._stacks||(m._stacks={});h=k[c]=T2(s,d,b),h[a]=v,h._top=vu(h,r,!0,i.type),h._bottom=vu(h,r,!1,i.type);const T=h._visualValues||(h._visualValues={});T[a]=v}}function Zr(e,t){const n=e.scales;return Object.keys(n).filter(i=>n[i].axis===t).shift()}function C2(e,t){return nn(e,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:"default",type:"dataset"})}function E2(e,t,n){return nn(e,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:n,index:t,mode:"default",type:"data"})}function Si(e,t){const n=e.controller.index,i=e.vScale&&e.vScale.axis;if(i){t=t||e._parsed;for(const s of t){const o=s._stacks;if(!o||o[i]===void 0||o[i][n]===void 0)return;delete o[i][n],o[i]._visualValues!==void 0&&o[i]._visualValues[n]!==void 0&&delete o[i]._visualValues[n]}}}const ea=e=>e==="reset"||e==="none",wu=(e,t)=>t?e:Object.assign({},e),R2=(e,t,n)=>e&&!t.hidden&&t._stacked&&{keys:Bp(n,!0),values:null};class ct{constructor(t,n){this.chart=t,this._ctx=t.ctx,this.index=n,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=Jr(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&Si(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,n=this._cachedMeta,i=this.getDataset(),s=(u,h,f,m)=>u==="x"?h:u==="r"?m:f,o=n.xAxisID=G(i.xAxisID,Zr(t,"x")),r=n.yAxisID=G(i.yAxisID,Zr(t,"y")),a=n.rAxisID=G(i.rAxisID,Zr(t,"r")),l=n.indexAxis,c=n.iAxisID=s(l,o,r,a),d=n.vAxisID=s(l,r,o,a);n.xScale=this.getScaleForId(o),n.yScale=this.getScaleForId(r),n.rScale=this.getScaleForId(a),n.iScale=this.getScaleForId(c),n.vScale=this.getScaleForId(d)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const n=this._cachedMeta;return t===n.iScale?n.vScale:n.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&iu(this._data,this),t._stacked&&Si(t)}_dataCheck(){const t=this.getDataset(),n=t.data||(t.data=[]),i=this._data;if(ee(n)){const s=this._cachedMeta;this._data=S2(n,s)}else if(i!==n){if(i){iu(i,this);const s=this._cachedMeta;Si(s),s._parsed=[]}n&&Object.isExtensible(n)&&pk(n,this),this._syncList=[],this._data=n}}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const n=this._cachedMeta,i=this.getDataset();let s=!1;this._dataCheck();const o=n._stacked;n._stacked=Jr(n.vScale,n),n.stack!==i.stack&&(s=!0,Si(n),n.stack=i.stack),this._resyncElements(t),(s||o!==n._stacked)&&(xu(this,n._parsed),n._stacked=Jr(n.vScale,n))}configure(){const t=this.chart.config,n=t.datasetScopeKeys(this._type),i=t.getOptionScopes(this.getDataset(),n,!0);this.options=t.createResolver(i,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,n){const{_cachedMeta:i,_data:s}=this,{iScale:o,_stacked:r}=i,a=o.axis;let l=t===0&&n===s.length?!0:i._sorted,c=t>0&&i._parsed[t-1],d,u,h;if(this._parsing===!1)i._parsed=s,i._sorted=!0,h=s;else{me(s[t])?h=this.parseArrayData(i,s,t,n):ee(s[t])?h=this.parseObjectData(i,s,t,n):h=this.parsePrimitiveData(i,s,t,n);const f=()=>u[a]===null||c&&u[a]<c[a];for(d=0;d<n;++d)i._parsed[d+t]=u=h[d],l&&(f()&&(l=!1),c=u);i._sorted=l}r&&xu(this,h)}parsePrimitiveData(t,n,i,s){const{iScale:o,vScale:r}=t,a=o.axis,l=r.axis,c=o.getLabels(),d=o===r,u=new Array(s);let h,f,m;for(h=0,f=s;h<f;++h)m=h+i,u[h]={[a]:d||o.parse(c[m],m),[l]:r.parse(n[m],m)};return u}parseArrayData(t,n,i,s){const{xScale:o,yScale:r}=t,a=new Array(s);let l,c,d,u;for(l=0,c=s;l<c;++l)d=l+i,u=n[d],a[l]={x:o.parse(u[0],d),y:r.parse(u[1],d)};return a}parseObjectData(t,n,i,s){const{xScale:o,yScale:r}=t,{xAxisKey:a="x",yAxisKey:l="y"}=this._parsing,c=new Array(s);let d,u,h,f;for(d=0,u=s;d<u;++d)h=d+i,f=n[h],c[d]={x:o.parse(Xt(f,a),h),y:r.parse(Xt(f,l),h)};return c}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,n,i){const s=this.chart,o=this._cachedMeta,r=n[t.axis],a={keys:Bp(s,!0),values:n._stacks[t.axis]._visualValues};return yu(a,r,o.index,{mode:i})}updateRangeFromParsed(t,n,i,s){const o=i[n.axis];let r=o===null?NaN:o;const a=s&&i._stacks[n.axis];s&&a&&(s.values=a,r=yu(s,o,this._cachedMeta.index)),t.min=Math.min(t.min,r),t.max=Math.max(t.max,r)}getMinMax(t,n){const i=this._cachedMeta,s=i._parsed,o=i._sorted&&t===i.iScale,r=s.length,a=this._getOtherScale(t),l=R2(n,i,this.chart),c={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:d,max:u}=A2(a);let h,f;function m(){f=s[h];const b=f[a.axis];return!ve(f[t.axis])||d>b||u<b}for(h=0;h<r&&!(!m()&&(this.updateRangeFromParsed(c,t,f,l),o));++h);if(o){for(h=r-1;h>=0;--h)if(!m()){this.updateRangeFromParsed(c,t,f,l);break}}return c}getAllParsedValues(t){const n=this._cachedMeta._parsed,i=[];let s,o,r;for(s=0,o=n.length;s<o;++s)r=n[s][t.axis],ve(r)&&i.push(r);return i}getMaxOverflow(){return!1}getLabelAndValue(t){const n=this._cachedMeta,i=n.iScale,s=n.vScale,o=this.getParsed(t);return{label:i?""+i.getLabelForValue(o[i.axis]):"",value:s?""+s.getLabelForValue(o[s.axis]):""}}_update(t){const n=this._cachedMeta;this.update(t||"default"),n._clip=k2(G(this.options.clip,_2(n.xScale,n.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,n=this.chart,i=this._cachedMeta,s=i.data||[],o=n.chartArea,r=[],a=this._drawStart||0,l=this._drawCount||s.length-a,c=this.options.drawActiveElementsOnTop;let d;for(i.dataset&&i.dataset.draw(t,o,a,l),d=a;d<a+l;++d){const u=s[d];u.hidden||(u.active&&c?r.push(u):u.draw(t,o))}for(d=0;d<r.length;++d)r[d].draw(t,o)}getStyle(t,n){const i=n?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(i):this.resolveDataElementOptions(t||0,i)}getContext(t,n,i){const s=this.getDataset();let o;if(t>=0&&t<this._cachedMeta.data.length){const r=this._cachedMeta.data[t];o=r.$context||(r.$context=E2(this.getContext(),t,r)),o.parsed=this.getParsed(t),o.raw=s.data[t],o.index=o.dataIndex=t}else o=this.$context||(this.$context=C2(this.chart.getContext(),this.index)),o.dataset=s,o.index=o.datasetIndex=this.index;return o.active=!!n,o.mode=i,o}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,n){return this._resolveElementOptions(this.dataElementType.id,n,t)}_resolveElementOptions(t,n="default",i){const s=n==="active",o=this._cachedDataOpts,r=t+"-"+n,a=o[r],l=this.enableOptionSharing&&as(i);if(a)return wu(a,l);const c=this.chart.config,d=c.datasetElementScopeKeys(this._type,t),u=s?[`${t}Hover`,"hover",t,""]:[t,""],h=c.getOptionScopes(this.getDataset(),d),f=Object.keys(be.elements[t]),m=()=>this.getContext(i,s,n),b=c.resolveNamedOptions(h,f,m,u);return b.$shared&&(b.$shared=l,o[r]=Object.freeze(wu(b,l))),b}_resolveAnimations(t,n,i){const s=this.chart,o=this._cachedDataOpts,r=`animation-${n}`,a=o[r];if(a)return a;let l;if(s.options.animation!==!1){const d=this.chart.config,u=d.datasetAnimationScopeKeys(this._type,n),h=d.getOptionScopes(this.getDataset(),u);l=d.createResolver(h,this.getContext(t,i,n))}const c=new Np(s,l&&l.animations);return l&&l._cacheable&&(o[r]=Object.freeze(c)),c}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,n){return!n||ea(t)||this.chart._animationsDisabled}_getSharedOptions(t,n){const i=this.resolveDataElementOptions(t,n),s=this._sharedOptions,o=this.getSharedOptions(i),r=this.includeOptions(n,o)||o!==s;return this.updateSharedOptions(o,n,i),{sharedOptions:o,includeOptions:r}}updateElement(t,n,i,s){ea(s)?Object.assign(t,i):this._resolveAnimations(n,s).update(t,i)}updateSharedOptions(t,n,i){t&&!ea(n)&&this._resolveAnimations(void 0,n).update(t,i)}_setStyle(t,n,i,s){t.active=s;const o=this.getStyle(n,s);this._resolveAnimations(n,i,s).update(t,{options:!s&&this.getSharedOptions(o)||o})}removeHoverStyle(t,n,i){this._setStyle(t,i,"active",!1)}setHoverStyle(t,n,i){this._setStyle(t,i,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const n=this._data,i=this._cachedMeta.data;for(const[a,l,c]of this._syncList)this[a](l,c);this._syncList=[];const s=i.length,o=n.length,r=Math.min(o,s);r&&this.parse(0,r),o>s?this._insertElements(s,o-s,t):o<s&&this._removeElements(o,s-o)}_insertElements(t,n,i=!0){const s=this._cachedMeta,o=s.data,r=t+n;let a;const l=c=>{for(c.length+=n,a=c.length-1;a>=r;a--)c[a]=c[a-n]};for(l(o),a=t;a<r;++a)o[a]=new this.dataElementType;this._parsing&&l(s._parsed),this.parse(t,n),i&&this.updateElements(o,t,n,"reset")}updateElements(t,n,i,s){}_removeElements(t,n){const i=this._cachedMeta;if(this._parsing){const s=i._parsed.splice(t,n);i._stacked&&Si(i,s)}i.data.splice(t,n)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[n,i,s]=t;this[n](i,s)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,n){n&&this._sync(["_removeElements",t,n]);const i=arguments.length-2;i&&this._sync(["_insertElements",t,i])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}D(ct,"defaults",{}),D(ct,"datasetElementType",null),D(ct,"dataElementType",null);function M2(e,t){if(!e._cache.$bar){const n=e.getMatchingVisibleMetas(t);let i=[];for(let s=0,o=n.length;s<o;s++)i=i.concat(n[s].controller.getAllParsedValues(e));e._cache.$bar=yp(i.sort((s,o)=>s-o))}return e._cache.$bar}function P2(e){const t=e.iScale,n=M2(t,e.type);let i=t._length,s,o,r,a;const l=()=>{r===32767||r===-32768||(as(a)&&(i=Math.min(i,Math.abs(r-a)||i)),a=r)};for(s=0,o=n.length;s<o;++s)r=t.getPixelForValue(n[s]),l();for(a=void 0,s=0,o=t.ticks.length;s<o;++s)r=t.getPixelForTick(s),l();return i}function D2(e,t,n,i){const s=n.barThickness;let o,r;return Z(s)?(o=t.min*n.categoryPercentage,r=n.barPercentage):(o=s*i,r=1),{chunk:o/i,ratio:r,start:t.pixels[e]-o/2}}function L2(e,t,n,i){const s=t.pixels,o=s[e];let r=e>0?s[e-1]:null,a=e<s.length-1?s[e+1]:null;const l=n.categoryPercentage;r===null&&(r=o-(a===null?t.end-t.start:a-o)),a===null&&(a=o+o-r);const c=o-(o-Math.min(r,a))/2*l;return{chunk:Math.abs(a-r)/2*l/i,ratio:n.barPercentage,start:c}}function I2(e,t,n,i){const s=n.parse(e[0],i),o=n.parse(e[1],i),r=Math.min(s,o),a=Math.max(s,o);let l=r,c=a;Math.abs(r)>Math.abs(a)&&(l=a,c=r),t[n.axis]=c,t._custom={barStart:l,barEnd:c,start:s,end:o,min:r,max:a}}function zp(e,t,n,i){return me(e)?I2(e,t,n,i):t[n.axis]=n.parse(e,i),t}function _u(e,t,n,i){const s=e.iScale,o=e.vScale,r=s.getLabels(),a=s===o,l=[];let c,d,u,h;for(c=n,d=n+i;c<d;++c)h=t[c],u={},u[s.axis]=a||s.parse(r[c],c),l.push(zp(h,u,o,c));return l}function ta(e){return e&&e.barStart!==void 0&&e.barEnd!==void 0}function O2(e,t,n){return e!==0?wt(e):(t.isHorizontal()?1:-1)*(t.min>=n?1:-1)}function F2(e){let t,n,i,s,o;return e.horizontal?(t=e.base>e.x,n="left",i="right"):(t=e.base<e.y,n="bottom",i="top"),t?(s="end",o="start"):(s="start",o="end"),{start:n,end:i,reverse:t,top:s,bottom:o}}function N2(e,t,n,i){let s=t.borderSkipped;const o={};if(!s){e.borderSkipped=o;return}if(s===!0){e.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}const{start:r,end:a,reverse:l,top:c,bottom:d}=F2(e);s==="middle"&&n&&(e.enableBorderRadius=!0,(n._top||0)===i?s=c:(n._bottom||0)===i?s=d:(o[ku(d,r,a,l)]=!0,s=c)),o[ku(s,r,a,l)]=!0,e.borderSkipped=o}function ku(e,t,n,i){return i?(e=B2(e,t,n),e=Su(e,n,t)):e=Su(e,t,n),e}function B2(e,t,n){return e===t?n:e===n?t:e}function Su(e,t,n){return e==="start"?t:e==="end"?n:e}function z2(e,{inflateAmount:t},n){e.inflateAmount=t==="auto"?n===1?.33:0:t}class uo extends ct{parsePrimitiveData(t,n,i,s){return _u(t,n,i,s)}parseArrayData(t,n,i,s){return _u(t,n,i,s)}parseObjectData(t,n,i,s){const{iScale:o,vScale:r}=t,{xAxisKey:a="x",yAxisKey:l="y"}=this._parsing,c=o.axis==="x"?a:l,d=r.axis==="x"?a:l,u=[];let h,f,m,b;for(h=i,f=i+s;h<f;++h)b=n[h],m={},m[o.axis]=o.parse(Xt(b,c),h),u.push(zp(Xt(b,d),m,r,h));return u}updateRangeFromParsed(t,n,i,s){super.updateRangeFromParsed(t,n,i,s);const o=i._custom;o&&n===this._cachedMeta.vScale&&(t.min=Math.min(t.min,o.min),t.max=Math.max(t.max,o.max))}getMaxOverflow(){return 0}getLabelAndValue(t){const n=this._cachedMeta,{iScale:i,vScale:s}=n,o=this.getParsed(t),r=o._custom,a=ta(r)?"["+r.start+", "+r.end+"]":""+s.getLabelForValue(o[s.axis]);return{label:""+i.getLabelForValue(o[i.axis]),value:a}}initialize(){this.enableOptionSharing=!0,super.initialize();const t=this._cachedMeta;t.stack=this.getDataset().stack}update(t){const n=this._cachedMeta;this.updateElements(n.data,0,n.data.length,t)}updateElements(t,n,i,s){const o=s==="reset",{index:r,_cachedMeta:{vScale:a}}=this,l=a.getBasePixel(),c=a.isHorizontal(),d=this._getRuler(),{sharedOptions:u,includeOptions:h}=this._getSharedOptions(n,s);for(let f=n;f<n+i;f++){const m=this.getParsed(f),b=o||Z(m[a.axis])?{base:l,head:l}:this._calculateBarValuePixels(f),v=this._calculateBarIndexPixels(f,d),k=(m._stacks||{})[a.axis],T={horizontal:c,base:b.base,enableBorderRadius:!k||ta(m._custom)||r===k._top||r===k._bottom,x:c?b.head:v.center,y:c?v.center:b.head,height:c?v.size:Math.abs(b.size),width:c?Math.abs(b.size):v.size};h&&(T.options=u||this.resolveDataElementOptions(f,t[f].active?"active":s));const M=T.options||t[f].options;N2(T,M,k,r),z2(T,M,d.ratio),this.updateElement(t[f],f,T,s)}}_getStacks(t,n){const{iScale:i}=this._cachedMeta,s=i.getMatchingVisibleMetas(this._type).filter(d=>d.controller.options.grouped),o=i.options.stacked,r=[],a=this._cachedMeta.controller.getParsed(n),l=a&&a[i.axis],c=d=>{const u=d._parsed.find(f=>f[i.axis]===l),h=u&&u[d.vScale.axis];if(Z(h)||isNaN(h))return!0};for(const d of s)if(!(n!==void 0&&c(d))&&((o===!1||r.indexOf(d.stack)===-1||o===void 0&&d.stack===void 0)&&r.push(d.stack),d.index===t))break;return r.length||r.push(void 0),r}_getStackCount(t){return this._getStacks(void 0,t).length}_getAxisCount(){return this._getAxis().length}getFirstScaleIdForIndexAxis(){const t=this.chart.scales,n=this.chart.options.indexAxis;return Object.keys(t).filter(i=>t[i].axis===n).shift()}_getAxis(){const t={},n=this.getFirstScaleIdForIndexAxis();for(const i of this.chart.data.datasets)t[G(this.chart.options.indexAxis==="x"?i.xAxisID:i.yAxisID,n)]=!0;return Object.keys(t)}_getStackIndex(t,n,i){const s=this._getStacks(t,i),o=n!==void 0?s.indexOf(n):-1;return o===-1?s.length-1:o}_getRuler(){const t=this.options,n=this._cachedMeta,i=n.iScale,s=[];let o,r;for(o=0,r=n.data.length;o<r;++o)s.push(i.getPixelForValue(this.getParsed(o)[i.axis],o));const a=t.barThickness;return{min:a||P2(n),pixels:s,start:i._startPixel,end:i._endPixel,stackCount:this._getStackCount(),scale:i,grouped:t.grouped,ratio:a?1:t.categoryPercentage*t.barPercentage}}_calculateBarValuePixels(t){const{_cachedMeta:{vScale:n,_stacked:i,index:s},options:{base:o,minBarLength:r}}=this,a=o||0,l=this.getParsed(t),c=l._custom,d=ta(c);let u=l[n.axis],h=0,f=i?this.applyStack(n,l,i):u,m,b;f!==u&&(h=f-u,f=u),d&&(u=c.barStart,f=c.barEnd-c.barStart,u!==0&&wt(u)!==wt(c.barEnd)&&(h=0),h+=u);const v=!Z(o)&&!d?o:h;let k=n.getPixelForValue(v);if(this.chart.getDataVisibility(t)?m=n.getPixelForValue(h+f):m=k,b=m-k,Math.abs(b)<r){b=O2(b,n,a)*r,u===a&&(k-=b/2);const T=n.getPixelForDecimal(0),M=n.getPixelForDecimal(1),S=Math.min(T,M),C=Math.max(T,M);k=Math.max(Math.min(k,C),S),m=k+b,i&&!d&&(l._stacks[n.axis]._visualValues[s]=n.getValueForPixel(m)-n.getValueForPixel(k))}if(k===n.getPixelForValue(a)){const T=wt(b)*n.getLineWidthForValue(a)/2;k+=T,b-=T}return{size:b,base:k,head:m,center:m+b/2}}_calculateBarIndexPixels(t,n){const i=n.scale,s=this.options,o=s.skipNull,r=G(s.maxBarThickness,1/0);let a,l;const c=this._getAxisCount();if(n.grouped){const d=o?this._getStackCount(t):n.stackCount,u=s.barThickness==="flex"?L2(t,n,s,d*c):D2(t,n,s,d*c),h=this.chart.options.indexAxis==="x"?this.getDataset().xAxisID:this.getDataset().yAxisID,f=this._getAxis().indexOf(G(h,this.getFirstScaleIdForIndexAxis())),m=this._getStackIndex(this.index,this._cachedMeta.stack,o?t:void 0)+f;a=u.start+u.chunk*m+u.chunk/2,l=Math.min(r,u.chunk*u.ratio)}else a=i.getPixelForValue(this.getParsed(t)[i.axis],t),l=Math.min(r,n.min*n.ratio);return{base:a-l/2,head:a+l/2,center:a,size:l}}draw(){const t=this._cachedMeta,n=t.vScale,i=t.data,s=i.length;let o=0;for(;o<s;++o)this.getParsed(o)[n.axis]!==null&&!i[o].hidden&&i[o].draw(this._ctx)}}D(uo,"id","bar"),D(uo,"defaults",{datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}}),D(uo,"overrides",{scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}});class ho extends ct{initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(t,n,i,s){const o=super.parsePrimitiveData(t,n,i,s);for(let r=0;r<o.length;r++)o[r]._custom=this.resolveDataElementOptions(r+i).radius;return o}parseArrayData(t,n,i,s){const o=super.parseArrayData(t,n,i,s);for(let r=0;r<o.length;r++){const a=n[i+r];o[r]._custom=G(a[2],this.resolveDataElementOptions(r+i).radius)}return o}parseObjectData(t,n,i,s){const o=super.parseObjectData(t,n,i,s);for(let r=0;r<o.length;r++){const a=n[i+r];o[r]._custom=G(a&&a.r&&+a.r,this.resolveDataElementOptions(r+i).radius)}return o}getMaxOverflow(){const t=this._cachedMeta.data;let n=0;for(let i=t.length-1;i>=0;--i)n=Math.max(n,t[i].size(this.resolveDataElementOptions(i))/2);return n>0&&n}getLabelAndValue(t){const n=this._cachedMeta,i=this.chart.data.labels||[],{xScale:s,yScale:o}=n,r=this.getParsed(t),a=s.getLabelForValue(r.x),l=o.getLabelForValue(r.y),c=r._custom;return{label:i[t]||"",value:"("+a+", "+l+(c?", "+c:"")+")"}}update(t){const n=this._cachedMeta.data;this.updateElements(n,0,n.length,t)}updateElements(t,n,i,s){const o=s==="reset",{iScale:r,vScale:a}=this._cachedMeta,{sharedOptions:l,includeOptions:c}=this._getSharedOptions(n,s),d=r.axis,u=a.axis;for(let h=n;h<n+i;h++){const f=t[h],m=!o&&this.getParsed(h),b={},v=b[d]=o?r.getPixelForDecimal(.5):r.getPixelForValue(m[d]),k=b[u]=o?a.getBasePixel():a.getPixelForValue(m[u]);b.skip=isNaN(v)||isNaN(k),c&&(b.options=l||this.resolveDataElementOptions(h,f.active?"active":s),o&&(b.options.radius=0)),this.updateElement(f,h,b,s)}}resolveDataElementOptions(t,n){const i=this.getParsed(t);let s=super.resolveDataElementOptions(t,n);s.$shared&&(s=Object.assign({},s,{$shared:!1}));const o=s.radius;return n!=="active"&&(s.radius=0),s.radius+=G(i&&i._custom,o),s}}D(ho,"id","bubble"),D(ho,"defaults",{datasetElementType:!1,dataElementType:"point",animations:{numbers:{type:"number",properties:["x","y","borderWidth","radius"]}}}),D(ho,"overrides",{scales:{x:{type:"linear"},y:{type:"linear"}}});function H2(e,t,n){let i=1,s=1,o=0,r=0;if(t<he){const a=e,l=a+t,c=Math.cos(a),d=Math.sin(a),u=Math.cos(l),h=Math.sin(l),f=(M,S,C)=>ls(M,a,l,!0)?1:Math.max(S,S*n,C,C*n),m=(M,S,C)=>ls(M,a,l,!0)?-1:Math.min(S,S*n,C,C*n),b=f(0,c,u),v=f(xe,d,h),k=m(ne,c,u),T=m(ne+xe,d,h);i=(b-k)/2,s=(v-T)/2,o=-(b+k)/2,r=-(v+T)/2}return{ratioX:i,ratioY:s,offsetX:o,offsetY:r}}class vn extends ct{constructor(t,n){super(t,n),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(t,n){const i=this.getDataset().data,s=this._cachedMeta;if(this._parsing===!1)s._parsed=i;else{let o=l=>+i[l];if(ee(i[t])){const{key:l="value"}=this._parsing;o=c=>+Xt(i[c],l)}let r,a;for(r=t,a=t+n;r<a;++r)s._parsed[r]=o(r)}}_getRotation(){return lt(this.options.rotation-90)}_getCircumference(){return lt(this.options.circumference)}_getRotationExtents(){let t=he,n=-he;for(let i=0;i<this.chart.data.datasets.length;++i)if(this.chart.isDatasetVisible(i)&&this.chart.getDatasetMeta(i).type===this._type){const s=this.chart.getDatasetMeta(i).controller,o=s._getRotation(),r=s._getCircumference();t=Math.min(t,o),n=Math.max(n,o+r)}return{rotation:t,circumference:n-t}}update(t){const n=this.chart,{chartArea:i}=n,s=this._cachedMeta,o=s.data,r=this.getMaxBorderWidth()+this.getMaxOffset(o)+this.options.spacing,a=Math.max((Math.min(i.width,i.height)-r)/2,0),l=Math.min(Z1(this.options.cutout,a),1),c=this._getRingWeight(this.index),{circumference:d,rotation:u}=this._getRotationExtents(),{ratioX:h,ratioY:f,offsetX:m,offsetY:b}=H2(u,d,l),v=(i.width-r)/h,k=(i.height-r)/f,T=Math.max(Math.min(v,k)/2,0),M=fp(this.options.radius,T),S=Math.max(M*l,0),C=(M-S)/this._getVisibleDatasetWeightTotal();this.offsetX=m*M,this.offsetY=b*M,s.total=this.calculateTotal(),this.outerRadius=M-C*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-C*c,0),this.updateElements(o,0,o.length,t)}_circumference(t,n){const i=this.options,s=this._cachedMeta,o=this._getCircumference();return n&&i.animation.animateRotate||!this.chart.getDataVisibility(t)||s._parsed[t]===null||s.data[t].hidden?0:this.calculateCircumference(s._parsed[t]*o/he)}updateElements(t,n,i,s){const o=s==="reset",r=this.chart,a=r.chartArea,c=r.options.animation,d=(a.left+a.right)/2,u=(a.top+a.bottom)/2,h=o&&c.animateScale,f=h?0:this.innerRadius,m=h?0:this.outerRadius,{sharedOptions:b,includeOptions:v}=this._getSharedOptions(n,s);let k=this._getRotation(),T;for(T=0;T<n;++T)k+=this._circumference(T,o);for(T=n;T<n+i;++T){const M=this._circumference(T,o),S=t[T],C={x:d+this.offsetX,y:u+this.offsetY,startAngle:k,endAngle:k+M,circumference:M,outerRadius:m,innerRadius:f};v&&(C.options=b||this.resolveDataElementOptions(T,S.active?"active":s)),k+=M,this.updateElement(S,T,C,s)}}calculateTotal(){const t=this._cachedMeta,n=t.data;let i=0,s;for(s=0;s<n.length;s++){const o=t._parsed[s];o!==null&&!isNaN(o)&&this.chart.getDataVisibility(s)&&!n[s].hidden&&(i+=Math.abs(o))}return i}calculateCircumference(t){const n=this._cachedMeta.total;return n>0&&!isNaN(t)?he*(Math.abs(t)/n):0}getLabelAndValue(t){const n=this._cachedMeta,i=this.chart,s=i.data.labels||[],o=ks(n._parsed[t],i.options.locale);return{label:s[t]||"",value:o}}getMaxBorderWidth(t){let n=0;const i=this.chart;let s,o,r,a,l;if(!t){for(s=0,o=i.data.datasets.length;s<o;++s)if(i.isDatasetVisible(s)){r=i.getDatasetMeta(s),t=r.data,a=r.controller;break}}if(!t)return 0;for(s=0,o=t.length;s<o;++s)l=a.resolveDataElementOptions(s),l.borderAlign!=="inner"&&(n=Math.max(n,l.borderWidth||0,l.hoverBorderWidth||0));return n}getMaxOffset(t){let n=0;for(let i=0,s=t.length;i<s;++i){const o=this.resolveDataElementOptions(i);n=Math.max(n,o.offset||0,o.hoverOffset||0)}return n}_getRingWeightOffset(t){let n=0;for(let i=0;i<t;++i)this.chart.isDatasetVisible(i)&&(n+=this._getRingWeight(i));return n}_getRingWeight(t){return Math.max(G(this.chart.data.datasets[t].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}D(vn,"id","doughnut"),D(vn,"defaults",{datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"}),D(vn,"descriptors",{_scriptable:t=>t!=="spacing",_indexable:t=>t!=="spacing"&&!t.startsWith("borderDash")&&!t.startsWith("hoverBorderDash")}),D(vn,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const n=t.data,{labels:{pointStyle:i,textAlign:s,color:o,useBorderRadius:r,borderRadius:a}}=t.legend.options;return n.labels.length&&n.datasets.length?n.labels.map((l,c)=>{const u=t.getDatasetMeta(0).controller.getStyle(c);return{text:l,fillStyle:u.backgroundColor,fontColor:o,hidden:!t.getDataVisibility(c),lineDash:u.borderDash,lineDashOffset:u.borderDashOffset,lineJoin:u.borderJoinStyle,lineWidth:u.borderWidth,strokeStyle:u.borderColor,textAlign:s,pointStyle:i,borderRadius:r&&(a||u.borderRadius),index:c}}):[]}},onClick(t,n,i){i.chart.toggleDataVisibility(n.index),i.chart.update()}}}});class Qi extends ct{initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){const n=this._cachedMeta,{dataset:i,data:s=[],_dataset:o}=n,r=this.chart._animationsDisabled;let{start:a,count:l}=wp(n,s,r);this._drawStart=a,this._drawCount=l,_p(n)&&(a=0,l=s.length),i._chart=this.chart,i._datasetIndex=this.index,i._decimated=!!o._decimated,i.points=s;const c=this.resolveDatasetElementOptions(t);this.options.showLine||(c.borderWidth=0),c.segment=this.options.segment,this.updateElement(i,void 0,{animated:!r,options:c},t),this.updateElements(s,a,l,t)}updateElements(t,n,i,s){const o=s==="reset",{iScale:r,vScale:a,_stacked:l,_dataset:c}=this._cachedMeta,{sharedOptions:d,includeOptions:u}=this._getSharedOptions(n,s),h=r.axis,f=a.axis,{spanGaps:m,segment:b}=this.options,v=li(m)?m:Number.POSITIVE_INFINITY,k=this.chart._animationsDisabled||o||s==="none",T=n+i,M=t.length;let S=n>0&&this.getParsed(n-1);for(let C=0;C<M;++C){const y=t[C],E=k?y:{};if(C<n||C>=T){E.skip=!0;continue}const P=this.getParsed(C),R=Z(P[f]),O=E[h]=r.getPixelForValue(P[h],C),L=E[f]=o||R?a.getBasePixel():a.getPixelForValue(l?this.applyStack(a,P,l):P[f],C);E.skip=isNaN(O)||isNaN(L)||R,E.stop=C>0&&Math.abs(P[h]-S[h])>v,b&&(E.parsed=P,E.raw=c.data[C]),u&&(E.options=d||this.resolveDataElementOptions(C,y.active?"active":s)),k||this.updateElement(y,C,E,s),S=P}}getMaxOverflow(){const t=this._cachedMeta,n=t.dataset,i=n.options&&n.options.borderWidth||0,s=t.data||[];if(!s.length)return i;const o=s[0].size(this.resolveDataElementOptions(0)),r=s[s.length-1].size(this.resolveDataElementOptions(s.length-1));return Math.max(i,o,r)/2}draw(){const t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}}D(Qi,"id","line"),D(Qi,"defaults",{datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1}),D(Qi,"overrides",{scales:{_index_:{type:"category"},_value_:{type:"linear"}}});class Yi extends ct{constructor(t,n){super(t,n),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(t){const n=this._cachedMeta,i=this.chart,s=i.data.labels||[],o=ks(n._parsed[t].r,i.options.locale);return{label:s[t]||"",value:o}}parseObjectData(t,n,i,s){return Rp.bind(this)(t,n,i,s)}update(t){const n=this._cachedMeta.data;this._updateRadius(),this.updateElements(n,0,n.length,t)}getMinMax(){const t=this._cachedMeta,n={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};return t.data.forEach((i,s)=>{const o=this.getParsed(s).r;!isNaN(o)&&this.chart.getDataVisibility(s)&&(o<n.min&&(n.min=o),o>n.max&&(n.max=o))}),n}_updateRadius(){const t=this.chart,n=t.chartArea,i=t.options,s=Math.min(n.right-n.left,n.bottom-n.top),o=Math.max(s/2,0),r=Math.max(i.cutoutPercentage?o/100*i.cutoutPercentage:1,0),a=(o-r)/t.getVisibleDatasetCount();this.outerRadius=o-a*this.index,this.innerRadius=this.outerRadius-a}updateElements(t,n,i,s){const o=s==="reset",r=this.chart,l=r.options.animation,c=this._cachedMeta.rScale,d=c.xCenter,u=c.yCenter,h=c.getIndexAngle(0)-.5*ne;let f=h,m;const b=360/this.countVisibleElements();for(m=0;m<n;++m)f+=this._computeAngle(m,s,b);for(m=n;m<n+i;m++){const v=t[m];let k=f,T=f+this._computeAngle(m,s,b),M=r.getDataVisibility(m)?c.getDistanceFromCenterForValue(this.getParsed(m).r):0;f=T,o&&(l.animateScale&&(M=0),l.animateRotate&&(k=T=h));const S={x:d,y:u,innerRadius:0,outerRadius:M,startAngle:k,endAngle:T,options:this.resolveDataElementOptions(m,v.active?"active":s)};this.updateElement(v,m,S,s)}}countVisibleElements(){const t=this._cachedMeta;let n=0;return t.data.forEach((i,s)=>{!isNaN(this.getParsed(s).r)&&this.chart.getDataVisibility(s)&&n++}),n}_computeAngle(t,n,i){return this.chart.getDataVisibility(t)?lt(this.resolveDataElementOptions(t,n).angle||i):0}}D(Yi,"id","polarArea"),D(Yi,"defaults",{dataElementType:"arc",animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:"number",properties:["x","y","startAngle","endAngle","innerRadius","outerRadius"]}},indexAxis:"r",startAngle:0}),D(Yi,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const n=t.data;if(n.labels.length&&n.datasets.length){const{labels:{pointStyle:i,color:s}}=t.legend.options;return n.labels.map((o,r)=>{const l=t.getDatasetMeta(0).controller.getStyle(r);return{text:o,fillStyle:l.backgroundColor,strokeStyle:l.borderColor,fontColor:s,lineWidth:l.borderWidth,pointStyle:i,hidden:!t.getDataVisibility(r),index:r}})}return[]}},onClick(t,n,i){i.chart.toggleDataVisibility(n.index),i.chart.update()}}},scales:{r:{type:"radialLinear",angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}});class Ha extends vn{}D(Ha,"id","pie"),D(Ha,"defaults",{cutout:0,rotation:0,circumference:360,radius:"100%"});class fo extends ct{getLabelAndValue(t){const n=this._cachedMeta.vScale,i=this.getParsed(t);return{label:n.getLabels()[t],value:""+n.getLabelForValue(i[n.axis])}}parseObjectData(t,n,i,s){return Rp.bind(this)(t,n,i,s)}update(t){const n=this._cachedMeta,i=n.dataset,s=n.data||[],o=n.iScale.getLabels();if(i.points=s,t!=="resize"){const r=this.resolveDatasetElementOptions(t);this.options.showLine||(r.borderWidth=0);const a={_loop:!0,_fullLoop:o.length===s.length,options:r};this.updateElement(i,void 0,a,t)}this.updateElements(s,0,s.length,t)}updateElements(t,n,i,s){const o=this._cachedMeta.rScale,r=s==="reset";for(let a=n;a<n+i;a++){const l=t[a],c=this.resolveDataElementOptions(a,l.active?"active":s),d=o.getPointPositionForValue(a,this.getParsed(a).r),u=r?o.xCenter:d.x,h=r?o.yCenter:d.y,f={x:u,y:h,angle:d.angle,skip:isNaN(u)||isNaN(h),options:c};this.updateElement(l,a,f,s)}}}D(fo,"id","radar"),D(fo,"defaults",{datasetElementType:"line",dataElementType:"point",indexAxis:"r",showLine:!0,elements:{line:{fill:"start"}}}),D(fo,"overrides",{aspectRatio:1,scales:{r:{type:"radialLinear"}}});class po extends ct{getLabelAndValue(t){const n=this._cachedMeta,i=this.chart.data.labels||[],{xScale:s,yScale:o}=n,r=this.getParsed(t),a=s.getLabelForValue(r.x),l=o.getLabelForValue(r.y);return{label:i[t]||"",value:"("+a+", "+l+")"}}update(t){const n=this._cachedMeta,{data:i=[]}=n,s=this.chart._animationsDisabled;let{start:o,count:r}=wp(n,i,s);if(this._drawStart=o,this._drawCount=r,_p(n)&&(o=0,r=i.length),this.options.showLine){this.datasetElementType||this.addElements();const{dataset:a,_dataset:l}=n;a._chart=this.chart,a._datasetIndex=this.index,a._decimated=!!l._decimated,a.points=i;const c=this.resolveDatasetElementOptions(t);c.segment=this.options.segment,this.updateElement(a,void 0,{animated:!s,options:c},t)}else this.datasetElementType&&(delete n.dataset,this.datasetElementType=!1);this.updateElements(i,o,r,t)}addElements(){const{showLine:t}=this.options;!this.datasetElementType&&t&&(this.datasetElementType=this.chart.registry.getElement("line")),super.addElements()}updateElements(t,n,i,s){const o=s==="reset",{iScale:r,vScale:a,_stacked:l,_dataset:c}=this._cachedMeta,d=this.resolveDataElementOptions(n,s),u=this.getSharedOptions(d),h=this.includeOptions(s,u),f=r.axis,m=a.axis,{spanGaps:b,segment:v}=this.options,k=li(b)?b:Number.POSITIVE_INFINITY,T=this.chart._animationsDisabled||o||s==="none";let M=n>0&&this.getParsed(n-1);for(let S=n;S<n+i;++S){const C=t[S],y=this.getParsed(S),E=T?C:{},P=Z(y[m]),R=E[f]=r.getPixelForValue(y[f],S),O=E[m]=o||P?a.getBasePixel():a.getPixelForValue(l?this.applyStack(a,y,l):y[m],S);E.skip=isNaN(R)||isNaN(O)||P,E.stop=S>0&&Math.abs(y[f]-M[f])>k,v&&(E.parsed=y,E.raw=c.data[S]),h&&(E.options=u||this.resolveDataElementOptions(S,C.active?"active":s)),T||this.updateElement(C,S,E,s),M=y}this.updateSharedOptions(u,s,d)}getMaxOverflow(){const t=this._cachedMeta,n=t.data||[];if(!this.options.showLine){let a=0;for(let l=n.length-1;l>=0;--l)a=Math.max(a,n[l].size(this.resolveDataElementOptions(l))/2);return a>0&&a}const i=t.dataset,s=i.options&&i.options.borderWidth||0;if(!n.length)return s;const o=n[0].size(this.resolveDataElementOptions(0)),r=n[n.length-1].size(this.resolveDataElementOptions(n.length-1));return Math.max(s,o,r)/2}}D(po,"id","scatter"),D(po,"defaults",{datasetElementType:!1,dataElementType:"point",showLine:!1,fill:!1}),D(po,"overrides",{interaction:{mode:"point"},scales:{x:{type:"linear"},y:{type:"linear"}}});var U2=Object.freeze({__proto__:null,BarController:uo,BubbleController:ho,DoughnutController:vn,LineController:Qi,PieController:Ha,PolarAreaController:Yi,RadarController:fo,ScatterController:po});function un(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class nc{constructor(t){D(this,"options");this.options=t||{}}static override(t){Object.assign(nc.prototype,t)}init(){}formats(){return un()}parse(){return un()}format(){return un()}add(){return un()}diff(){return un()}startOf(){return un()}endOf(){return un()}}var q2={_date:nc};function j2(e,t,n,i){const{controller:s,data:o,_sorted:r}=e,a=s._cachedMeta.iScale,l=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null;if(a&&t===a.axis&&t!=="r"&&r&&o.length){const c=a._reversePixels?hk:Pt;if(i){if(s._sharedOptions){const d=o[0],u=typeof d.getRange=="function"&&d.getRange(t);if(u){const h=c(o,t,n-u),f=c(o,t,n+u);return{lo:h.lo,hi:f.hi}}}}else{const d=c(o,t,n);if(l){const{vScale:u}=s._cachedMeta,{_parsed:h}=e,f=h.slice(0,d.lo+1).reverse().findIndex(b=>!Z(b[u.axis]));d.lo-=Math.max(0,f);const m=h.slice(d.hi).findIndex(b=>!Z(b[u.axis]));d.hi+=Math.max(0,m)}return d}}return{lo:0,hi:o.length-1}}function ar(e,t,n,i,s){const o=e.getSortedVisibleDatasetMetas(),r=n[t];for(let a=0,l=o.length;a<l;++a){const{index:c,data:d}=o[a],{lo:u,hi:h}=j2(o[a],t,r,s);for(let f=u;f<=h;++f){const m=d[f];m.skip||i(m,c,f)}}}function K2(e){const t=e.indexOf("x")!==-1,n=e.indexOf("y")!==-1;return function(i,s){const o=t?Math.abs(i.x-s.x):0,r=n?Math.abs(i.y-s.y):0;return Math.sqrt(Math.pow(o,2)+Math.pow(r,2))}}function na(e,t,n,i,s){const o=[];return!s&&!e.isPointInArea(t)||ar(e,n,t,function(a,l,c){!s&&!Dt(a,e.chartArea,0)||a.inRange(t.x,t.y,i)&&o.push({element:a,datasetIndex:l,index:c})},!0),o}function W2(e,t,n,i){let s=[];function o(r,a,l){const{startAngle:c,endAngle:d}=r.getProps(["startAngle","endAngle"],i),{angle:u}=mp(r,{x:t.x,y:t.y});ls(u,c,d)&&s.push({element:r,datasetIndex:a,index:l})}return ar(e,n,t,o),s}function V2(e,t,n,i,s,o){let r=[];const a=K2(n);let l=Number.POSITIVE_INFINITY;function c(d,u,h){const f=d.inRange(t.x,t.y,s);if(i&&!f)return;const m=d.getCenterPoint(s);if(!(!!o||e.isPointInArea(m))&&!f)return;const v=a(t,m);v<l?(r=[{element:d,datasetIndex:u,index:h}],l=v):v===l&&r.push({element:d,datasetIndex:u,index:h})}return ar(e,n,t,c),r}function ia(e,t,n,i,s,o){return!o&&!e.isPointInArea(t)?[]:n==="r"&&!i?W2(e,t,n,s):V2(e,t,n,i,s,o)}function $u(e,t,n,i,s){const o=[],r=n==="x"?"inXRange":"inYRange";let a=!1;return ar(e,n,t,(l,c,d)=>{l[r]&&l[r](t[n],s)&&(o.push({element:l,datasetIndex:c,index:d}),a=a||l.inRange(t.x,t.y,s))}),i&&!a?[]:o}var G2={modes:{index(e,t,n,i){const s=pn(t,e),o=n.axis||"x",r=n.includeInvisible||!1,a=n.intersect?na(e,s,o,i,r):ia(e,s,o,!1,i,r),l=[];return a.length?(e.getSortedVisibleDatasetMetas().forEach(c=>{const d=a[0].index,u=c.data[d];u&&!u.skip&&l.push({element:u,datasetIndex:c.index,index:d})}),l):[]},dataset(e,t,n,i){const s=pn(t,e),o=n.axis||"xy",r=n.includeInvisible||!1;let a=n.intersect?na(e,s,o,i,r):ia(e,s,o,!1,i,r);if(a.length>0){const l=a[0].datasetIndex,c=e.getDatasetMeta(l).data;a=[];for(let d=0;d<c.length;++d)a.push({element:c[d],datasetIndex:l,index:d})}return a},point(e,t,n,i){const s=pn(t,e),o=n.axis||"xy",r=n.includeInvisible||!1;return na(e,s,o,i,r)},nearest(e,t,n,i){const s=pn(t,e),o=n.axis||"xy",r=n.includeInvisible||!1;return ia(e,s,o,n.intersect,i,r)},x(e,t,n,i){const s=pn(t,e);return $u(e,s,"x",n.intersect,i)},y(e,t,n,i){const s=pn(t,e);return $u(e,s,"y",n.intersect,i)}}};const Hp=["left","top","right","bottom"];function $i(e,t){return e.filter(n=>n.pos===t)}function Au(e,t){return e.filter(n=>Hp.indexOf(n.pos)===-1&&n.box.axis===t)}function Ai(e,t){return e.sort((n,i)=>{const s=t?i:n,o=t?n:i;return s.weight===o.weight?s.index-o.index:s.weight-o.weight})}function Q2(e){const t=[];let n,i,s,o,r,a;for(n=0,i=(e||[]).length;n<i;++n)s=e[n],{position:o,options:{stack:r,stackWeight:a=1}}=s,t.push({index:n,box:s,pos:o,horizontal:s.isHorizontal(),weight:s.weight,stack:r&&o+r,stackWeight:a});return t}function Y2(e){const t={};for(const n of e){const{stack:i,pos:s,stackWeight:o}=n;if(!i||!Hp.includes(s))continue;const r=t[i]||(t[i]={count:0,placed:0,weight:0,size:0});r.count++,r.weight+=o}return t}function X2(e,t){const n=Y2(e),{vBoxMaxWidth:i,hBoxMaxHeight:s}=t;let o,r,a;for(o=0,r=e.length;o<r;++o){a=e[o];const{fullSize:l}=a.box,c=n[a.stack],d=c&&a.stackWeight/c.weight;a.horizontal?(a.width=d?d*i:l&&t.availableWidth,a.height=s):(a.width=i,a.height=d?d*s:l&&t.availableHeight)}return n}function J2(e){const t=Q2(e),n=Ai(t.filter(c=>c.box.fullSize),!0),i=Ai($i(t,"left"),!0),s=Ai($i(t,"right")),o=Ai($i(t,"top"),!0),r=Ai($i(t,"bottom")),a=Au(t,"x"),l=Au(t,"y");return{fullSize:n,leftAndTop:i.concat(o),rightAndBottom:s.concat(l).concat(r).concat(a),chartArea:$i(t,"chartArea"),vertical:i.concat(s).concat(l),horizontal:o.concat(r).concat(a)}}function Tu(e,t,n,i){return Math.max(e[n],t[n])+Math.max(e[i],t[i])}function Up(e,t){e.top=Math.max(e.top,t.top),e.left=Math.max(e.left,t.left),e.bottom=Math.max(e.bottom,t.bottom),e.right=Math.max(e.right,t.right)}function Z2(e,t,n,i){const{pos:s,box:o}=n,r=e.maxPadding;if(!ee(s)){n.size&&(e[s]-=n.size);const u=i[n.stack]||{size:0,count:1};u.size=Math.max(u.size,n.horizontal?o.height:o.width),n.size=u.size/u.count,e[s]+=n.size}o.getPadding&&Up(r,o.getPadding());const a=Math.max(0,t.outerWidth-Tu(r,e,"left","right")),l=Math.max(0,t.outerHeight-Tu(r,e,"top","bottom")),c=a!==e.w,d=l!==e.h;return e.w=a,e.h=l,n.horizontal?{same:c,other:d}:{same:d,other:c}}function eS(e){const t=e.maxPadding;function n(i){const s=Math.max(t[i]-e[i],0);return e[i]+=s,s}e.y+=n("top"),e.x+=n("left"),n("right"),n("bottom")}function tS(e,t){const n=t.maxPadding;function i(s){const o={left:0,top:0,right:0,bottom:0};return s.forEach(r=>{o[r]=Math.max(t[r],n[r])}),o}return i(e?["left","right"]:["top","bottom"])}function Di(e,t,n,i){const s=[];let o,r,a,l,c,d;for(o=0,r=e.length,c=0;o<r;++o){a=e[o],l=a.box,l.update(a.width||t.w,a.height||t.h,tS(a.horizontal,t));const{same:u,other:h}=Z2(t,n,a,i);c|=u&&s.length,d=d||h,l.fullSize||s.push(a)}return c&&Di(s,t,n,i)||d}function Ys(e,t,n,i,s){e.top=n,e.left=t,e.right=t+i,e.bottom=n+s,e.width=i,e.height=s}function Cu(e,t,n,i){const s=n.padding;let{x:o,y:r}=t;for(const a of e){const l=a.box,c=i[a.stack]||{placed:0,weight:1},d=a.stackWeight/c.weight||1;if(a.horizontal){const u=t.w*d,h=c.size||l.height;as(c.start)&&(r=c.start),l.fullSize?Ys(l,s.left,r,n.outerWidth-s.right-s.left,h):Ys(l,t.left+c.placed,r,u,h),c.start=r,c.placed+=u,r=l.bottom}else{const u=t.h*d,h=c.size||l.width;as(c.start)&&(o=c.start),l.fullSize?Ys(l,o,s.top,h,n.outerHeight-s.bottom-s.top):Ys(l,o,t.top+c.placed,h,u),c.start=o,c.placed+=u,o=l.right}}t.x=o,t.y=r}var Fe={addBox(e,t){e.boxes||(e.boxes=[]),t.fullSize=t.fullSize||!1,t.position=t.position||"top",t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(n){t.draw(n)}}]},e.boxes.push(t)},removeBox(e,t){const n=e.boxes?e.boxes.indexOf(t):-1;n!==-1&&e.boxes.splice(n,1)},configure(e,t,n){t.fullSize=n.fullSize,t.position=n.position,t.weight=n.weight},update(e,t,n,i){if(!e)return;const s=Be(e.options.layout.padding),o=Math.max(t-s.width,0),r=Math.max(n-s.height,0),a=J2(e.boxes),l=a.vertical,c=a.horizontal;re(e.boxes,b=>{typeof b.beforeLayout=="function"&&b.beforeLayout()});const d=l.reduce((b,v)=>v.box.options&&v.box.options.display===!1?b:b+1,0)||1,u=Object.freeze({outerWidth:t,outerHeight:n,padding:s,availableWidth:o,availableHeight:r,vBoxMaxWidth:o/2/d,hBoxMaxHeight:r/2}),h=Object.assign({},s);Up(h,Be(i));const f=Object.assign({maxPadding:h,w:o,h:r,x:s.left,y:s.top},s),m=X2(l.concat(c),u);Di(a.fullSize,f,u,m),Di(l,f,u,m),Di(c,f,u,m)&&Di(l,f,u,m),eS(f),Cu(a.leftAndTop,f,u,m),f.x+=f.w,f.y+=f.h,Cu(a.rightAndBottom,f,u,m),e.chartArea={left:f.left,top:f.top,right:f.left+f.w,bottom:f.top+f.h,height:f.h,width:f.w},re(a.chartArea,b=>{const v=b.box;Object.assign(v,e.chartArea),v.update(f.w,f.h,{left:0,top:0,right:0,bottom:0})})}};class qp{acquireContext(t,n){}releaseContext(t){return!1}addEventListener(t,n,i){}removeEventListener(t,n,i){}getDevicePixelRatio(){return 1}getMaximumSize(t,n,i,s){return n=Math.max(0,n||t.width),i=i||t.height,{width:n,height:Math.max(0,s?Math.floor(n/s):i)}}isAttached(t){return!0}updateConfig(t){}}class nS extends qp{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const go="$chartjs",iS={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},Eu=e=>e===null||e==="";function sS(e,t){const n=e.style,i=e.getAttribute("height"),s=e.getAttribute("width");if(e[go]={initial:{height:i,width:s,style:{display:n.display,height:n.height,width:n.width}}},n.display=n.display||"block",n.boxSizing=n.boxSizing||"border-box",Eu(s)){const o=hu(e,"width");o!==void 0&&(e.width=o)}if(Eu(i))if(e.style.height==="")e.height=e.width/(t||2);else{const o=hu(e,"height");o!==void 0&&(e.height=o)}return e}const jp=o2?{passive:!0}:!1;function oS(e,t,n){e&&e.addEventListener(t,n,jp)}function rS(e,t,n){e&&e.canvas&&e.canvas.removeEventListener(t,n,jp)}function aS(e,t){const n=iS[e.type]||e.type,{x:i,y:s}=pn(e,t);return{type:n,chart:t,native:e,x:i!==void 0?i:null,y:s!==void 0?s:null}}function Lo(e,t){for(const n of e)if(n===t||n.contains(t))return!0}function lS(e,t,n){const i=e.canvas,s=new MutationObserver(o=>{let r=!1;for(const a of o)r=r||Lo(a.addedNodes,i),r=r&&!Lo(a.removedNodes,i);r&&n()});return s.observe(document,{childList:!0,subtree:!0}),s}function cS(e,t,n){const i=e.canvas,s=new MutationObserver(o=>{let r=!1;for(const a of o)r=r||Lo(a.removedNodes,i),r=r&&!Lo(a.addedNodes,i);r&&n()});return s.observe(document,{childList:!0,subtree:!0}),s}const ds=new Map;let Ru=0;function Kp(){const e=window.devicePixelRatio;e!==Ru&&(Ru=e,ds.forEach((t,n)=>{n.currentDevicePixelRatio!==e&&t()}))}function dS(e,t){ds.size||window.addEventListener("resize",Kp),ds.set(e,t)}function uS(e){ds.delete(e),ds.size||window.removeEventListener("resize",Kp)}function hS(e,t,n){const i=e.canvas,s=i&&tc(i);if(!s)return;const o=xp((a,l)=>{const c=s.clientWidth;n(a,l),c<s.clientWidth&&n()},window),r=new ResizeObserver(a=>{const l=a[0],c=l.contentRect.width,d=l.contentRect.height;c===0&&d===0||o(c,d)});return r.observe(s),dS(e,o),r}function sa(e,t,n){n&&n.disconnect(),t==="resize"&&uS(e)}function fS(e,t,n){const i=e.canvas,s=xp(o=>{e.ctx!==null&&n(aS(o,e))},e);return oS(i,t,s),s}class pS extends qp{acquireContext(t,n){const i=t&&t.getContext&&t.getContext("2d");return i&&i.canvas===t?(sS(t,n),i):null}releaseContext(t){const n=t.canvas;if(!n[go])return!1;const i=n[go].initial;["height","width"].forEach(o=>{const r=i[o];Z(r)?n.removeAttribute(o):n.setAttribute(o,r)});const s=i.style||{};return Object.keys(s).forEach(o=>{n.style[o]=s[o]}),n.width=n.width,delete n[go],!0}addEventListener(t,n,i){this.removeEventListener(t,n);const s=t.$proxies||(t.$proxies={}),r={attach:lS,detach:cS,resize:hS}[n]||fS;s[n]=r(t,n,i)}removeEventListener(t,n){const i=t.$proxies||(t.$proxies={}),s=i[n];if(!s)return;({attach:sa,detach:sa,resize:sa}[n]||rS)(t,n,s),i[n]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,n,i,s){return s2(t,n,i,s)}isAttached(t){const n=t&&tc(t);return!!(n&&n.isConnected)}}function gS(e){return!ec()||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas?nS:pS}class dt{constructor(){D(this,"x");D(this,"y");D(this,"active",!1);D(this,"options");D(this,"$animations")}tooltipPosition(t){const{x:n,y:i}=this.getProps(["x","y"],t);return{x:n,y:i}}hasValue(){return li(this.x)&&li(this.y)}getProps(t,n){const i=this.$animations;if(!n||!i)return this;const s={};return t.forEach(o=>{s[o]=i[o]&&i[o].active()?i[o]._to:this[o]}),s}}D(dt,"defaults",{}),D(dt,"defaultRoutes");function mS(e,t){const n=e.options.ticks,i=bS(e),s=Math.min(n.maxTicksLimit||i,i),o=n.major.enabled?vS(t):[],r=o.length,a=o[0],l=o[r-1],c=[];if(r>s)return xS(t,c,o,r/s),c;const d=yS(o,t,s);if(r>0){let u,h;const f=r>1?Math.round((l-a)/(r-1)):null;for(Xs(t,c,d,Z(f)?0:a-f,a),u=0,h=r-1;u<h;u++)Xs(t,c,d,o[u],o[u+1]);return Xs(t,c,d,l,Z(f)?t.length:l+f),c}return Xs(t,c,d),c}function bS(e){const t=e.options.offset,n=e._tickSize(),i=e._length/n+(t?0:1),s=e._maxLength/n;return Math.floor(Math.min(i,s))}function yS(e,t,n){const i=wS(e),s=t.length/n;if(!i)return Math.max(s,1);const o=ak(i);for(let r=0,a=o.length-1;r<a;r++){const l=o[r];if(l>s)return l}return Math.max(s,1)}function vS(e){const t=[];let n,i;for(n=0,i=e.length;n<i;n++)e[n].major&&t.push(n);return t}function xS(e,t,n,i){let s=0,o=n[0],r;for(i=Math.ceil(i),r=0;r<e.length;r++)r===o&&(t.push(e[r]),s++,o=n[s*i])}function Xs(e,t,n,i,s){const o=G(i,0),r=Math.min(G(s,e.length),e.length);let a=0,l,c,d;for(n=Math.ceil(n),s&&(l=s-i,n=l/Math.floor(l/n)),d=o;d<0;)a++,d=Math.round(o+a*n);for(c=Math.max(o,0);c<r;c++)c===d&&(t.push(e[c]),a++,d=Math.round(o+a*n))}function wS(e){const t=e.length;let n,i;if(t<2)return!1;for(i=e[0],n=1;n<t;++n)if(e[n]-e[n-1]!==i)return!1;return i}const _S=e=>e==="left"?"right":e==="right"?"left":e,Mu=(e,t,n)=>t==="top"||t==="left"?e[t]+n:e[t]-n,Pu=(e,t)=>Math.min(t||e,e);function Du(e,t){const n=[],i=e.length/t,s=e.length;let o=0;for(;o<s;o+=i)n.push(e[Math.floor(o)]);return n}function kS(e,t,n){const i=e.ticks.length,s=Math.min(t,i-1),o=e._startPixel,r=e._endPixel,a=1e-6;let l=e.getPixelForTick(s),c;if(!(n&&(i===1?c=Math.max(l-o,r-l):t===0?c=(e.getPixelForTick(1)-l)/2:c=(l-e.getPixelForTick(s-1))/2,l+=s<t?c:-c,l<o-a||l>r+a)))return l}function SS(e,t){re(e,n=>{const i=n.gc,s=i.length/2;let o;if(s>t){for(o=0;o<s;++o)delete n.data[i[o]];i.splice(0,s)}})}function Ti(e){return e.drawTicks?e.tickLength:0}function Lu(e,t){if(!e.display)return 0;const n=Ae(e.font,t),i=Be(e.padding);return(me(e.text)?e.text.length:1)*n.lineHeight+i.height}function $S(e,t){return nn(e,{scale:t,type:"scale"})}function AS(e,t,n){return nn(e,{tick:n,index:t,type:"tick"})}function TS(e,t,n){let i=Gl(e);return(n&&t!=="right"||!n&&t==="right")&&(i=_S(i)),i}function CS(e,t,n,i){const{top:s,left:o,bottom:r,right:a,chart:l}=e,{chartArea:c,scales:d}=l;let u=0,h,f,m;const b=r-s,v=a-o;if(e.isHorizontal()){if(f=Ie(i,o,a),ee(n)){const k=Object.keys(n)[0],T=n[k];m=d[k].getPixelForValue(T)+b-t}else n==="center"?m=(c.bottom+c.top)/2+b-t:m=Mu(e,n,t);h=a-o}else{if(ee(n)){const k=Object.keys(n)[0],T=n[k];f=d[k].getPixelForValue(T)-v+t}else n==="center"?f=(c.left+c.right)/2-v+t:f=Mu(e,n,t);m=Ie(i,r,s),u=n==="left"?-xe:xe}return{titleX:f,titleY:m,maxWidth:h,rotation:u}}class Nn extends dt{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,n){return t}getUserBounds(){let{_userMin:t,_userMax:n,_suggestedMin:i,_suggestedMax:s}=this;return t=Xe(t,Number.POSITIVE_INFINITY),n=Xe(n,Number.NEGATIVE_INFINITY),i=Xe(i,Number.POSITIVE_INFINITY),s=Xe(s,Number.NEGATIVE_INFINITY),{min:Xe(t,i),max:Xe(n,s),minDefined:ve(t),maxDefined:ve(n)}}getMinMax(t){let{min:n,max:i,minDefined:s,maxDefined:o}=this.getUserBounds(),r;if(s&&o)return{min:n,max:i};const a=this.getMatchingVisibleMetas();for(let l=0,c=a.length;l<c;++l)r=a[l].controller.getMinMax(this,t),s||(n=Math.min(n,r.min)),o||(i=Math.max(i,r.max));return n=o&&n>i?i:n,i=s&&n>i?n:i,{min:Xe(n,Xe(i,n)),max:Xe(i,Xe(n,i))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){ue(this.options.beforeUpdate,[this])}update(t,n,i){const{beginAtZero:s,grace:o,ticks:r}=this.options,a=r.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=n,this._margins=i=Object.assign({left:0,right:0,top:0,bottom:0},i),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+i.left+i.right:this.height+i.top+i.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=Ok(this,o,s),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const l=a<this.ticks.length;this._convertTicksToLabels(l?Du(this.ticks,a):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),r.display&&(r.autoSkip||r.source==="auto")&&(this.ticks=mS(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),l&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t=this.options.reverse,n,i;this.isHorizontal()?(n=this.left,i=this.right):(n=this.top,i=this.bottom,t=!t),this._startPixel=n,this._endPixel=i,this._reversePixels=t,this._length=i-n,this._alignToPixels=this.options.alignToPixels}afterUpdate(){ue(this.options.afterUpdate,[this])}beforeSetDimensions(){ue(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){ue(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),ue(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){ue(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const n=this.options.ticks;let i,s,o;for(i=0,s=t.length;i<s;i++)o=t[i],o.label=ue(n.callback,[o.value,i,t],this)}afterTickToLabelConversion(){ue(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){ue(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,n=t.ticks,i=Pu(this.ticks.length,t.ticks.maxTicksLimit),s=n.minRotation||0,o=n.maxRotation;let r=s,a,l,c;if(!this._isVisible()||!n.display||s>=o||i<=1||!this.isHorizontal()){this.labelRotation=s;return}const d=this._getLabelSizes(),u=d.widest.width,h=d.highest.height,f=Ce(this.chart.width-u,0,this.maxWidth);a=t.offset?this.maxWidth/i:f/(i-1),u+6>a&&(a=f/(i-(t.offset?.5:1)),l=this.maxHeight-Ti(t.grid)-n.padding-Lu(t.title,this.chart.options.font),c=Math.sqrt(u*u+h*h),r=Wl(Math.min(Math.asin(Ce((d.highest.height+6)/a,-1,1)),Math.asin(Ce(l/c,-1,1))-Math.asin(Ce(h/c,-1,1)))),r=Math.max(s,Math.min(o,r))),this.labelRotation=r}afterCalculateLabelRotation(){ue(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){ue(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:n,options:{ticks:i,title:s,grid:o}}=this,r=this._isVisible(),a=this.isHorizontal();if(r){const l=Lu(s,n.options.font);if(a?(t.width=this.maxWidth,t.height=Ti(o)+l):(t.height=this.maxHeight,t.width=Ti(o)+l),i.display&&this.ticks.length){const{first:c,last:d,widest:u,highest:h}=this._getLabelSizes(),f=i.padding*2,m=lt(this.labelRotation),b=Math.cos(m),v=Math.sin(m);if(a){const k=i.mirror?0:v*u.width+b*h.height;t.height=Math.min(this.maxHeight,t.height+k+f)}else{const k=i.mirror?0:b*u.width+v*h.height;t.width=Math.min(this.maxWidth,t.width+k+f)}this._calculatePadding(c,d,v,b)}}this._handleMargins(),a?(this.width=this._length=n.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=n.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,n,i,s){const{ticks:{align:o,padding:r},position:a}=this.options,l=this.labelRotation!==0,c=a!=="top"&&this.axis==="x";if(this.isHorizontal()){const d=this.getPixelForTick(0)-this.left,u=this.right-this.getPixelForTick(this.ticks.length-1);let h=0,f=0;l?c?(h=s*t.width,f=i*n.height):(h=i*t.height,f=s*n.width):o==="start"?f=n.width:o==="end"?h=t.width:o!=="inner"&&(h=t.width/2,f=n.width/2),this.paddingLeft=Math.max((h-d+r)*this.width/(this.width-d),0),this.paddingRight=Math.max((f-u+r)*this.width/(this.width-u),0)}else{let d=n.height/2,u=t.height/2;o==="start"?(d=0,u=t.height):o==="end"&&(d=n.height,u=0),this.paddingTop=d+r,this.paddingBottom=u+r}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){ue(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:n}=this.options;return n==="top"||n==="bottom"||t==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){this.beforeTickToLabelConversion(),this.generateTickLabels(t);let n,i;for(n=0,i=t.length;n<i;n++)Z(t[n].label)&&(t.splice(n,1),i--,n--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const n=this.options.ticks.sampleSize;let i=this.ticks;n<i.length&&(i=Du(i,n)),this._labelSizes=t=this._computeLabelSizes(i,i.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,n,i){const{ctx:s,_longestTextCache:o}=this,r=[],a=[],l=Math.floor(n/Pu(n,i));let c=0,d=0,u,h,f,m,b,v,k,T,M,S,C;for(u=0;u<n;u+=l){if(m=t[u].label,b=this._resolveTickFontOptions(u),s.font=v=b.string,k=o[v]=o[v]||{data:{},gc:[]},T=b.lineHeight,M=S=0,!Z(m)&&!me(m))M=Po(s,k.data,k.gc,M,m),S=T;else if(me(m))for(h=0,f=m.length;h<f;++h)C=m[h],!Z(C)&&!me(C)&&(M=Po(s,k.data,k.gc,M,C),S+=T);r.push(M),a.push(S),c=Math.max(M,c),d=Math.max(S,d)}SS(o,n);const y=r.indexOf(c),E=a.indexOf(d),P=R=>({width:r[R]||0,height:a[R]||0});return{first:P(0),last:P(n-1),widest:P(y),highest:P(E),widths:r,heights:a}}getLabelForValue(t){return t}getPixelForValue(t,n){return NaN}getValueForPixel(t){}getPixelForTick(t){const n=this.ticks;return t<0||t>n.length-1?null:this.getPixelForValue(n[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const n=this._startPixel+t*this._length;return uk(this._alignToPixels?dn(this.chart,n,0):n)}getDecimalForPixel(t){const n=(t-this._startPixel)/this._length;return this._reversePixels?1-n:n}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:n}=this;return t<0&&n<0?n:t>0&&n>0?t:0}getContext(t){const n=this.ticks||[];if(t>=0&&t<n.length){const i=n[t];return i.$context||(i.$context=AS(this.getContext(),t,i))}return this.$context||(this.$context=$S(this.chart.getContext(),this))}_tickSize(){const t=this.options.ticks,n=lt(this.labelRotation),i=Math.abs(Math.cos(n)),s=Math.abs(Math.sin(n)),o=this._getLabelSizes(),r=t.autoSkipPadding||0,a=o?o.widest.width+r:0,l=o?o.highest.height+r:0;return this.isHorizontal()?l*i>a*s?a/i:l/s:l*s<a*i?l/i:a/s}_isVisible(){const t=this.options.display;return t!=="auto"?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const n=this.axis,i=this.chart,s=this.options,{grid:o,position:r,border:a}=s,l=o.offset,c=this.isHorizontal(),u=this.ticks.length+(l?1:0),h=Ti(o),f=[],m=a.setContext(this.getContext()),b=m.display?m.width:0,v=b/2,k=function(z){return dn(i,z,b)};let T,M,S,C,y,E,P,R,O,L,N,j;if(r==="top")T=k(this.bottom),E=this.bottom-h,R=T-v,L=k(t.top)+v,j=t.bottom;else if(r==="bottom")T=k(this.top),L=t.top,j=k(t.bottom)-v,E=T+v,R=this.top+h;else if(r==="left")T=k(this.right),y=this.right-h,P=T-v,O=k(t.left)+v,N=t.right;else if(r==="right")T=k(this.left),O=t.left,N=k(t.right)-v,y=T+v,P=this.left+h;else if(n==="x"){if(r==="center")T=k((t.top+t.bottom)/2+.5);else if(ee(r)){const z=Object.keys(r)[0],X=r[z];T=k(this.chart.scales[z].getPixelForValue(X))}L=t.top,j=t.bottom,E=T+v,R=E+h}else if(n==="y"){if(r==="center")T=k((t.left+t.right)/2);else if(ee(r)){const z=Object.keys(r)[0],X=r[z];T=k(this.chart.scales[z].getPixelForValue(X))}y=T-v,P=y-h,O=t.left,N=t.right}const Q=G(s.ticks.maxTicksLimit,u),I=Math.max(1,Math.ceil(u/Q));for(M=0;M<u;M+=I){const z=this.getContext(M),X=o.setContext(z),B=a.setContext(z),se=X.lineWidth,Me=X.color,le=B.dash||[],Ke=B.dashOffset,ce=X.tickWidth,Ye=X.tickColor,oe=X.tickBorderDash||[],Pe=X.tickBorderDashOffset;S=kS(this,M,l),S!==void 0&&(C=dn(i,S,se),c?y=P=O=N=C:E=R=L=j=C,f.push({tx1:y,ty1:E,tx2:P,ty2:R,x1:O,y1:L,x2:N,y2:j,width:se,color:Me,borderDash:le,borderDashOffset:Ke,tickWidth:ce,tickColor:Ye,tickBorderDash:oe,tickBorderDashOffset:Pe}))}return this._ticksLength=u,this._borderValue=T,f}_computeLabelItems(t){const n=this.axis,i=this.options,{position:s,ticks:o}=i,r=this.isHorizontal(),a=this.ticks,{align:l,crossAlign:c,padding:d,mirror:u}=o,h=Ti(i.grid),f=h+d,m=u?-d:f,b=-lt(this.labelRotation),v=[];let k,T,M,S,C,y,E,P,R,O,L,N,j="middle";if(s==="top")y=this.bottom-m,E=this._getXAxisLabelAlignment();else if(s==="bottom")y=this.top+m,E=this._getXAxisLabelAlignment();else if(s==="left"){const I=this._getYAxisLabelAlignment(h);E=I.textAlign,C=I.x}else if(s==="right"){const I=this._getYAxisLabelAlignment(h);E=I.textAlign,C=I.x}else if(n==="x"){if(s==="center")y=(t.top+t.bottom)/2+f;else if(ee(s)){const I=Object.keys(s)[0],z=s[I];y=this.chart.scales[I].getPixelForValue(z)+f}E=this._getXAxisLabelAlignment()}else if(n==="y"){if(s==="center")C=(t.left+t.right)/2-f;else if(ee(s)){const I=Object.keys(s)[0],z=s[I];C=this.chart.scales[I].getPixelForValue(z)}E=this._getYAxisLabelAlignment(h).textAlign}n==="y"&&(l==="start"?j="top":l==="end"&&(j="bottom"));const Q=this._getLabelSizes();for(k=0,T=a.length;k<T;++k){M=a[k],S=M.label;const I=o.setContext(this.getContext(k));P=this.getPixelForTick(k)+o.labelOffset,R=this._resolveTickFontOptions(k),O=R.lineHeight,L=me(S)?S.length:1;const z=L/2,X=I.color,B=I.textStrokeColor,se=I.textStrokeWidth;let Me=E;r?(C=P,E==="inner"&&(k===T-1?Me=this.options.reverse?"left":"right":k===0?Me=this.options.reverse?"right":"left":Me="center"),s==="top"?c==="near"||b!==0?N=-L*O+O/2:c==="center"?N=-Q.highest.height/2-z*O+O:N=-Q.highest.height+O/2:c==="near"||b!==0?N=O/2:c==="center"?N=Q.highest.height/2-z*O:N=Q.highest.height-L*O,u&&(N*=-1),b!==0&&!I.showLabelBackdrop&&(C+=O/2*Math.sin(b))):(y=P,N=(1-L)*O/2);let le;if(I.showLabelBackdrop){const Ke=Be(I.backdropPadding),ce=Q.heights[k],Ye=Q.widths[k];let oe=N-Ke.top,Pe=0-Ke.left;switch(j){case"middle":oe-=ce/2;break;case"bottom":oe-=ce;break}switch(E){case"center":Pe-=Ye/2;break;case"right":Pe-=Ye;break;case"inner":k===T-1?Pe-=Ye:k>0&&(Pe-=Ye/2);break}le={left:Pe,top:oe,width:Ye+Ke.width,height:ce+Ke.height,color:I.backdropColor}}v.push({label:S,font:R,textOffset:N,options:{rotation:b,color:X,strokeColor:B,strokeWidth:se,textAlign:Me,textBaseline:j,translation:[C,y],backdrop:le}})}return v}_getXAxisLabelAlignment(){const{position:t,ticks:n}=this.options;if(-lt(this.labelRotation))return t==="top"?"left":"right";let s="center";return n.align==="start"?s="left":n.align==="end"?s="right":n.align==="inner"&&(s="inner"),s}_getYAxisLabelAlignment(t){const{position:n,ticks:{crossAlign:i,mirror:s,padding:o}}=this.options,r=this._getLabelSizes(),a=t+o,l=r.widest.width;let c,d;return n==="left"?s?(d=this.right+o,i==="near"?c="left":i==="center"?(c="center",d+=l/2):(c="right",d+=l)):(d=this.right-a,i==="near"?c="right":i==="center"?(c="center",d-=l/2):(c="left",d=this.left)):n==="right"?s?(d=this.left+o,i==="near"?c="right":i==="center"?(c="center",d-=l/2):(c="left",d-=l)):(d=this.left+a,i==="near"?c="left":i==="center"?(c="center",d+=l/2):(c="right",d=this.right)):c="right",{textAlign:c,x:d}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,n=this.options.position;if(n==="left"||n==="right")return{top:0,left:this.left,bottom:t.height,right:this.right};if(n==="top"||n==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:t.width}}drawBackground(){const{ctx:t,options:{backgroundColor:n},left:i,top:s,width:o,height:r}=this;n&&(t.save(),t.fillStyle=n,t.fillRect(i,s,o,r),t.restore())}getLineWidthForValue(t){const n=this.options.grid;if(!this._isVisible()||!n.display)return 0;const s=this.ticks.findIndex(o=>o.value===t);return s>=0?n.setContext(this.getContext(s)).lineWidth:0}drawGrid(t){const n=this.options.grid,i=this.ctx,s=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let o,r;const a=(l,c,d)=>{!d.width||!d.color||(i.save(),i.lineWidth=d.width,i.strokeStyle=d.color,i.setLineDash(d.borderDash||[]),i.lineDashOffset=d.borderDashOffset,i.beginPath(),i.moveTo(l.x,l.y),i.lineTo(c.x,c.y),i.stroke(),i.restore())};if(n.display)for(o=0,r=s.length;o<r;++o){const l=s[o];n.drawOnChartArea&&a({x:l.x1,y:l.y1},{x:l.x2,y:l.y2},l),n.drawTicks&&a({x:l.tx1,y:l.ty1},{x:l.tx2,y:l.ty2},{color:l.tickColor,width:l.tickWidth,borderDash:l.tickBorderDash,borderDashOffset:l.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:n,options:{border:i,grid:s}}=this,o=i.setContext(this.getContext()),r=i.display?o.width:0;if(!r)return;const a=s.setContext(this.getContext(0)).lineWidth,l=this._borderValue;let c,d,u,h;this.isHorizontal()?(c=dn(t,this.left,r)-r/2,d=dn(t,this.right,a)+a/2,u=h=l):(u=dn(t,this.top,r)-r/2,h=dn(t,this.bottom,a)+a/2,c=d=l),n.save(),n.lineWidth=o.width,n.strokeStyle=o.color,n.beginPath(),n.moveTo(c,u),n.lineTo(d,h),n.stroke(),n.restore()}drawLabels(t){if(!this.options.ticks.display)return;const i=this.ctx,s=this._computeLabelArea();s&&sr(i,s);const o=this.getLabelItems(t);for(const r of o){const a=r.options,l=r.font,c=r.label,d=r.textOffset;Ln(i,c,0,d,l,a)}s&&or(i)}drawTitle(){const{ctx:t,options:{position:n,title:i,reverse:s}}=this;if(!i.display)return;const o=Ae(i.font),r=Be(i.padding),a=i.align;let l=o.lineHeight/2;n==="bottom"||n==="center"||ee(n)?(l+=r.bottom,me(i.text)&&(l+=o.lineHeight*(i.text.length-1))):l+=r.top;const{titleX:c,titleY:d,maxWidth:u,rotation:h}=CS(this,l,n,a);Ln(t,i.text,0,0,o,{color:i.color,maxWidth:u,rotation:h,textAlign:TS(a,n,s),textBaseline:"middle",translation:[c,d]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,n=t.ticks&&t.ticks.z||0,i=G(t.grid&&t.grid.z,-1),s=G(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==Nn.prototype.draw?[{z:n,draw:o=>{this.draw(o)}}]:[{z:i,draw:o=>{this.drawBackground(),this.drawGrid(o),this.drawTitle()}},{z:s,draw:()=>{this.drawBorder()}},{z:n,draw:o=>{this.drawLabels(o)}}]}getMatchingVisibleMetas(t){const n=this.chart.getSortedVisibleDatasetMetas(),i=this.axis+"AxisID",s=[];let o,r;for(o=0,r=n.length;o<r;++o){const a=n[o];a[i]===this.id&&(!t||a.type===t)&&s.push(a)}return s}_resolveTickFontOptions(t){const n=this.options.ticks.setContext(this.getContext(t));return Ae(n.font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class Js{constructor(t,n,i){this.type=t,this.scope=n,this.override=i,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const n=Object.getPrototypeOf(t);let i;MS(n)&&(i=this.register(n));const s=this.items,o=t.id,r=this.scope+"."+o;if(!o)throw new Error("class does not have id: "+t);return o in s||(s[o]=t,ES(t,r,i),this.override&&be.override(t.id,t.overrides)),r}get(t){return this.items[t]}unregister(t){const n=this.items,i=t.id,s=this.scope;i in n&&delete n[i],s&&i in be[s]&&(delete be[s][i],this.override&&delete Dn[i])}}function ES(e,t,n){const i=rs(Object.create(null),[n?be.get(n):{},be.get(t),e.defaults]);be.set(t,i),e.defaultRoutes&&RS(t,e.defaultRoutes),e.descriptors&&be.describe(t,e.descriptors)}function RS(e,t){Object.keys(t).forEach(n=>{const i=n.split("."),s=i.pop(),o=[e].concat(i).join("."),r=t[n].split("."),a=r.pop(),l=r.join(".");be.route(o,s,l,a)})}function MS(e){return"id"in e&&"defaults"in e}class PS{constructor(){this.controllers=new Js(ct,"datasets",!0),this.elements=new Js(dt,"elements"),this.plugins=new Js(Object,"plugins"),this.scales=new Js(Nn,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,n,i){[...n].forEach(s=>{const o=i||this._getRegistryForType(s);i||o.isForType(s)||o===this.plugins&&s.id?this._exec(t,o,s):re(s,r=>{const a=i||this._getRegistryForType(r);this._exec(t,a,r)})})}_exec(t,n,i){const s=Kl(t);ue(i["before"+s],[],i),n[t](i),ue(i["after"+s],[],i)}_getRegistryForType(t){for(let n=0;n<this._typedRegistries.length;n++){const i=this._typedRegistries[n];if(i.isForType(t))return i}return this.plugins}_get(t,n,i){const s=n.get(t);if(s===void 0)throw new Error('"'+t+'" is not a registered '+i+".");return s}}var bt=new PS;class DS{constructor(){this._init=void 0}notify(t,n,i,s){if(n==="beforeInit"&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install")),this._init===void 0)return;const o=s?this._descriptors(t).filter(s):this._descriptors(t),r=this._notify(o,t,n,i);return n==="afterDestroy"&&(this._notify(o,t,"stop"),this._notify(this._init,t,"uninstall"),this._init=void 0),r}_notify(t,n,i,s){s=s||{};for(const o of t){const r=o.plugin,a=r[i],l=[n,s,o.options];if(ue(a,l,r)===!1&&s.cancelable)return!1}return!0}invalidate(){Z(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const n=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),n}_createDescriptors(t,n){const i=t&&t.config,s=G(i.options&&i.options.plugins,{}),o=LS(i);return s===!1&&!n?[]:OS(t,o,s,n)}_notifyStateChanges(t){const n=this._oldCache||[],i=this._cache,s=(o,r)=>o.filter(a=>!r.some(l=>a.plugin.id===l.plugin.id));this._notify(s(n,i),t,"stop"),this._notify(s(i,n),t,"start")}}function LS(e){const t={},n=[],i=Object.keys(bt.plugins.items);for(let o=0;o<i.length;o++)n.push(bt.getPlugin(i[o]));const s=e.plugins||[];for(let o=0;o<s.length;o++){const r=s[o];n.indexOf(r)===-1&&(n.push(r),t[r.id]=!0)}return{plugins:n,localIds:t}}function IS(e,t){return!t&&e===!1?null:e===!0?{}:e}function OS(e,{plugins:t,localIds:n},i,s){const o=[],r=e.getContext();for(const a of t){const l=a.id,c=IS(i[l],s);c!==null&&o.push({plugin:a,options:FS(e.config,{plugin:a,local:n[l]},c,r)})}return o}function FS(e,{plugin:t,local:n},i,s){const o=e.pluginScopeKeys(t),r=e.getOptionScopes(i,o);return n&&t.defaults&&r.push(t.defaults),e.createResolver(r,s,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function Ua(e,t){const n=be.datasets[e]||{};return((t.datasets||{})[e]||{}).indexAxis||t.indexAxis||n.indexAxis||"x"}function NS(e,t){let n=e;return e==="_index_"?n=t:e==="_value_"&&(n=t==="x"?"y":"x"),n}function BS(e,t){return e===t?"_index_":"_value_"}function Iu(e){if(e==="x"||e==="y"||e==="r")return e}function zS(e){if(e==="top"||e==="bottom")return"x";if(e==="left"||e==="right")return"y"}function qa(e,...t){if(Iu(e))return e;for(const n of t){const i=n.axis||zS(n.position)||e.length>1&&Iu(e[0].toLowerCase());if(i)return i}throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`)}function Ou(e,t,n){if(n[t+"AxisID"]===e)return{axis:t}}function HS(e,t){if(t.data&&t.data.datasets){const n=t.data.datasets.filter(i=>i.xAxisID===e||i.yAxisID===e);if(n.length)return Ou(e,"x",n[0])||Ou(e,"y",n[0])}return{}}function US(e,t){const n=Dn[e.type]||{scales:{}},i=t.scales||{},s=Ua(e.type,t),o=Object.create(null);return Object.keys(i).forEach(r=>{const a=i[r];if(!ee(a))return console.error(`Invalid scale configuration for scale: ${r}`);if(a._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${r}`);const l=qa(r,a,HS(r,e),be.scales[a.type]),c=BS(l,s),d=n.scales||{};o[r]=Ki(Object.create(null),[{axis:l},a,d[l],d[c]])}),e.data.datasets.forEach(r=>{const a=r.type||e.type,l=r.indexAxis||Ua(a,t),d=(Dn[a]||{}).scales||{};Object.keys(d).forEach(u=>{const h=NS(u,l),f=r[h+"AxisID"]||h;o[f]=o[f]||Object.create(null),Ki(o[f],[{axis:h},i[f],d[u]])})}),Object.keys(o).forEach(r=>{const a=o[r];Ki(a,[be.scales[a.type],be.scale])}),o}function Wp(e){const t=e.options||(e.options={});t.plugins=G(t.plugins,{}),t.scales=US(e,t)}function Vp(e){return e=e||{},e.datasets=e.datasets||[],e.labels=e.labels||[],e}function qS(e){return e=e||{},e.data=Vp(e.data),Wp(e),e}const Fu=new Map,Gp=new Set;function Zs(e,t){let n=Fu.get(e);return n||(n=t(),Fu.set(e,n),Gp.add(n)),n}const Ci=(e,t,n)=>{const i=Xt(t,n);i!==void 0&&e.add(i)};class jS{constructor(t){this._config=qS(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=Vp(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),Wp(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return Zs(t,()=>[[`datasets.${t}`,""]])}datasetAnimationScopeKeys(t,n){return Zs(`${t}.transition.${n}`,()=>[[`datasets.${t}.transitions.${n}`,`transitions.${n}`],[`datasets.${t}`,""]])}datasetElementScopeKeys(t,n){return Zs(`${t}-${n}`,()=>[[`datasets.${t}.elements.${n}`,`datasets.${t}`,`elements.${n}`,""]])}pluginScopeKeys(t){const n=t.id,i=this.type;return Zs(`${i}-plugin-${n}`,()=>[[`plugins.${n}`,...t.additionalOptionScopes||[]]])}_cachedScopes(t,n){const i=this._scopeCache;let s=i.get(t);return(!s||n)&&(s=new Map,i.set(t,s)),s}getOptionScopes(t,n,i){const{options:s,type:o}=this,r=this._cachedScopes(t,i),a=r.get(n);if(a)return a;const l=new Set;n.forEach(d=>{t&&(l.add(t),d.forEach(u=>Ci(l,t,u))),d.forEach(u=>Ci(l,s,u)),d.forEach(u=>Ci(l,Dn[o]||{},u)),d.forEach(u=>Ci(l,be,u)),d.forEach(u=>Ci(l,Ba,u))});const c=Array.from(l);return c.length===0&&c.push(Object.create(null)),Gp.has(n)&&r.set(n,c),c}chartOptionScopes(){const{options:t,type:n}=this;return[t,Dn[n]||{},be.datasets[n]||{},{type:n},be,Ba]}resolveNamedOptions(t,n,i,s=[""]){const o={$shared:!0},{resolver:r,subPrefixes:a}=Nu(this._resolverCache,t,s);let l=r;if(WS(r,n)){o.$shared=!1,i=Jt(i)?i():i;const c=this.createResolver(t,i,a);l=ci(r,i,c)}for(const c of n)o[c]=l[c];return o}createResolver(t,n,i=[""],s){const{resolver:o}=Nu(this._resolverCache,t,i);return ee(n)?ci(o,n,void 0,s):o}}function Nu(e,t,n){let i=e.get(t);i||(i=new Map,e.set(t,i));const s=n.join();let o=i.get(s);return o||(o={resolver:Xl(t,n),subPrefixes:n.filter(a=>!a.toLowerCase().includes("hover"))},i.set(s,o)),o}const KS=e=>ee(e)&&Object.getOwnPropertyNames(e).some(t=>Jt(e[t]));function WS(e,t){const{isScriptable:n,isIndexable:i}=Ap(e);for(const s of t){const o=n(s),r=i(s),a=(r||o)&&e[s];if(o&&(Jt(a)||KS(a))||r&&me(a))return!0}return!1}var VS="4.5.1";const GS=["top","bottom","left","right","chartArea"];function Bu(e,t){return e==="top"||e==="bottom"||GS.indexOf(e)===-1&&t==="x"}function zu(e,t){return function(n,i){return n[e]===i[e]?n[t]-i[t]:n[e]-i[e]}}function Hu(e){const t=e.chart,n=t.options.animation;t.notifyPlugins("afterRender"),ue(n&&n.onComplete,[e],t)}function QS(e){const t=e.chart,n=t.options.animation;ue(n&&n.onProgress,[e],t)}function Qp(e){return ec()&&typeof e=="string"?e=document.getElementById(e):e&&e.length&&(e=e[0]),e&&e.canvas&&(e=e.canvas),e}const mo={},Uu=e=>{const t=Qp(e);return Object.values(mo).filter(n=>n.canvas===t).pop()};function YS(e,t,n){const i=Object.keys(e);for(const s of i){const o=+s;if(o>=t){const r=e[s];delete e[s],(n>0||o>t)&&(e[o+n]=r)}}}function XS(e,t,n,i){return!n||e.type==="mouseout"?null:i?t:e}class Je{static register(...t){bt.add(...t),qu()}static unregister(...t){bt.remove(...t),qu()}constructor(t,n){const i=this.config=new jS(n),s=Qp(t),o=Uu(s);if(o)throw new Error("Canvas is already in use. Chart with ID '"+o.id+"' must be destroyed before the canvas with ID '"+o.canvas.id+"' can be reused.");const r=i.createResolver(i.chartOptionScopes(),this.getContext());this.platform=new(i.platform||gS(s)),this.platform.updateConfig(i);const a=this.platform.acquireContext(s,r.aspectRatio),l=a&&a.canvas,c=l&&l.height,d=l&&l.width;if(this.id=J1(),this.ctx=a,this.canvas=l,this.width=d,this.height=c,this._options=r,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new DS,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=gk(u=>this.update(u),r.resizeDelay||0),this._dataChanges=[],mo[this.id]=this,!a||!l){console.error("Failed to create chart: can't acquire context from the given item");return}Ct.listen(this,"complete",Hu),Ct.listen(this,"progress",QS),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:t,maintainAspectRatio:n},width:i,height:s,_aspectRatio:o}=this;return Z(t)?n&&o?o:s?i/s:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return bt}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():uu(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return lu(this.canvas,this.ctx),this}stop(){return Ct.stop(this),this}resize(t,n){Ct.running(this)?this._resizeBeforeDraw={width:t,height:n}:this._resize(t,n)}_resize(t,n){const i=this.options,s=this.canvas,o=i.maintainAspectRatio&&this.aspectRatio,r=this.platform.getMaximumSize(s,t,n,o),a=i.devicePixelRatio||this.platform.getDevicePixelRatio(),l=this.width?"resize":"attach";this.width=r.width,this.height=r.height,this._aspectRatio=this.aspectRatio,uu(this,a,!0)&&(this.notifyPlugins("resize",{size:r}),ue(i.onResize,[this,r],this),this.attached&&this._doResize(l)&&this.render())}ensureScalesHaveIDs(){const n=this.options.scales||{};re(n,(i,s)=>{i.id=s})}buildOrUpdateScales(){const t=this.options,n=t.scales,i=this.scales,s=Object.keys(i).reduce((r,a)=>(r[a]=!1,r),{});let o=[];n&&(o=o.concat(Object.keys(n).map(r=>{const a=n[r],l=qa(r,a),c=l==="r",d=l==="x";return{options:a,dposition:c?"chartArea":d?"bottom":"left",dtype:c?"radialLinear":d?"category":"linear"}}))),re(o,r=>{const a=r.options,l=a.id,c=qa(l,a),d=G(a.type,r.dtype);(a.position===void 0||Bu(a.position,c)!==Bu(r.dposition))&&(a.position=r.dposition),s[l]=!0;let u=null;if(l in i&&i[l].type===d)u=i[l];else{const h=bt.getScale(d);u=new h({id:l,type:d,ctx:this.ctx,chart:this}),i[u.id]=u}u.init(a,t)}),re(s,(r,a)=>{r||delete i[a]}),re(i,r=>{Fe.configure(this,r,r.options),Fe.addBox(this,r)})}_updateMetasets(){const t=this._metasets,n=this.data.datasets.length,i=t.length;if(t.sort((s,o)=>s.index-o.index),i>n){for(let s=n;s<i;++s)this._destroyDatasetMeta(s);t.splice(n,i-n)}this._sortedMetasets=t.slice(0).sort(zu("order","index"))}_removeUnreferencedMetasets(){const{_metasets:t,data:{datasets:n}}=this;t.length>n.length&&delete this._stacks,t.forEach((i,s)=>{n.filter(o=>o===i._dataset).length===0&&this._destroyDatasetMeta(s)})}buildOrUpdateControllers(){const t=[],n=this.data.datasets;let i,s;for(this._removeUnreferencedMetasets(),i=0,s=n.length;i<s;i++){const o=n[i];let r=this.getDatasetMeta(i);const a=o.type||this.config.type;if(r.type&&r.type!==a&&(this._destroyDatasetMeta(i),r=this.getDatasetMeta(i)),r.type=a,r.indexAxis=o.indexAxis||Ua(a,this.options),r.order=o.order||0,r.index=i,r.label=""+o.label,r.visible=this.isDatasetVisible(i),r.controller)r.controller.updateIndex(i),r.controller.linkScales();else{const l=bt.getController(a),{datasetElementType:c,dataElementType:d}=be.datasets[a];Object.assign(l,{dataElementType:bt.getElement(d),datasetElementType:c&&bt.getElement(c)}),r.controller=new l(this,i),t.push(r.controller)}}return this._updateMetasets(),t}_resetElements(){re(this.data.datasets,(t,n)=>{this.getDatasetMeta(n).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){const n=this.config;n.update();const i=this._options=n.createResolver(n.chartOptionScopes(),this.getContext()),s=this._animationsDisabled=!i.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0})===!1)return;const o=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let r=0;for(let c=0,d=this.data.datasets.length;c<d;c++){const{controller:u}=this.getDatasetMeta(c),h=!s&&o.indexOf(u)===-1;u.buildOrUpdateElements(h),r=Math.max(+u.getMaxOverflow(),r)}r=this._minPadding=i.layout.autoPadding?r:0,this._updateLayout(r),s||re(o,c=>{c.reset()}),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(zu("z","_idx"));const{_active:a,_lastEvent:l}=this;l?this._eventHandler(l,!0):a.length&&this._updateHoverStyles(a,a,!0),this.render()}_updateScales(){re(this.scales,t=>{Fe.removeBox(this,t)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const t=this.options,n=new Set(Object.keys(this._listeners)),i=new Set(t.events);(!Zd(n,i)||!!this._responsiveListeners!==t.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:t}=this,n=this._getUniformDataChanges()||[];for(const{method:i,start:s,count:o}of n){const r=i==="_removeElements"?-o:o;YS(t,s,r)}}_getUniformDataChanges(){const t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];const n=this.data.datasets.length,i=o=>new Set(t.filter(r=>r[0]===o).map((r,a)=>a+","+r.splice(1).join(","))),s=i(0);for(let o=1;o<n;o++)if(!Zd(s,i(o)))return;return Array.from(s).map(o=>o.split(",")).map(o=>({method:o[1],start:+o[2],count:+o[3]}))}_updateLayout(t){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;Fe.update(this,this.width,this.height,t);const n=this.chartArea,i=n.width<=0||n.height<=0;this._layers=[],re(this.boxes,s=>{i&&s.position==="chartArea"||(s.configure&&s.configure(),this._layers.push(...s._layers()))},this),this._layers.forEach((s,o)=>{s._idx=o}),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})!==!1){for(let n=0,i=this.data.datasets.length;n<i;++n)this.getDatasetMeta(n).controller.configure();for(let n=0,i=this.data.datasets.length;n<i;++n)this._updateDataset(n,Jt(t)?t({datasetIndex:n}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,n){const i=this.getDatasetMeta(t),s={meta:i,index:t,mode:n,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",s)!==!1&&(i.controller._update(n),s.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",s))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(Ct.has(this)?this.attached&&!Ct.running(this)&&Ct.start(this):(this.draw(),Hu({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){const{width:i,height:s}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(i,s)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const n=this._layers;for(t=0;t<n.length&&n[t].z<=0;++t)n[t].draw(this.chartArea);for(this._drawDatasets();t<n.length;++t)n[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){const n=this._sortedMetasets,i=[];let s,o;for(s=0,o=n.length;s<o;++s){const r=n[s];(!t||r.visible)&&i.push(r)}return i}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const t=this.getSortedVisibleDatasetMetas();for(let n=t.length-1;n>=0;--n)this._drawDataset(t[n]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){const n=this.ctx,i={meta:t,index:t.index,cancelable:!0},s=Fp(this,t);this.notifyPlugins("beforeDatasetDraw",i)!==!1&&(s&&sr(n,s),t.controller.draw(),s&&or(n),i.cancelable=!1,this.notifyPlugins("afterDatasetDraw",i))}isPointInArea(t){return Dt(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,n,i,s){const o=G2.modes[n];return typeof o=="function"?o(this,t,i,s):[]}getDatasetMeta(t){const n=this.data.datasets[t],i=this._metasets;let s=i.filter(o=>o&&o._dataset===n).pop();return s||(s={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:n&&n.order||0,index:t,_dataset:n,_parsed:[],_sorted:!1},i.push(s)),s}getContext(){return this.$context||(this.$context=nn(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){const n=this.data.datasets[t];if(!n)return!1;const i=this.getDatasetMeta(t);return typeof i.hidden=="boolean"?!i.hidden:!n.hidden}setDatasetVisibility(t,n){const i=this.getDatasetMeta(t);i.hidden=!n}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,n,i){const s=i?"show":"hide",o=this.getDatasetMeta(t),r=o.controller._resolveAnimations(void 0,s);as(n)?(o.data[n].hidden=!i,this.update()):(this.setDatasetVisibility(t,i),r.update(o,{visible:i}),this.update(a=>a.datasetIndex===t?s:void 0))}hide(t,n){this._updateVisibility(t,n,!1)}show(t,n){this._updateVisibility(t,n,!0)}_destroyDatasetMeta(t){const n=this._metasets[t];n&&n.controller&&n.controller._destroy(),delete this._metasets[t]}_stop(){let t,n;for(this.stop(),Ct.remove(this),t=0,n=this.data.datasets.length;t<n;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:t,ctx:n}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),lu(t,n),this.platform.releaseContext(n),this.canvas=null,this.ctx=null),delete mo[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const t=this._listeners,n=this.platform,i=(o,r)=>{n.addEventListener(this,o,r),t[o]=r},s=(o,r,a)=>{o.offsetX=r,o.offsetY=a,this._eventHandler(o)};re(this.options.events,o=>i(o,s))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const t=this._responsiveListeners,n=this.platform,i=(l,c)=>{n.addEventListener(this,l,c),t[l]=c},s=(l,c)=>{t[l]&&(n.removeEventListener(this,l,c),delete t[l])},o=(l,c)=>{this.canvas&&this.resize(l,c)};let r;const a=()=>{s("attach",a),this.attached=!0,this.resize(),i("resize",o),i("detach",r)};r=()=>{this.attached=!1,s("resize",o),this._stop(),this._resize(0,0),i("attach",a)},n.isAttached(this.canvas)?a():r()}unbindEvents(){re(this._listeners,(t,n)=>{this.platform.removeEventListener(this,n,t)}),this._listeners={},re(this._responsiveListeners,(t,n)=>{this.platform.removeEventListener(this,n,t)}),this._responsiveListeners=void 0}updateHoverStyle(t,n,i){const s=i?"set":"remove";let o,r,a,l;for(n==="dataset"&&(o=this.getDatasetMeta(t[0].datasetIndex),o.controller["_"+s+"DatasetHoverStyle"]()),a=0,l=t.length;a<l;++a){r=t[a];const c=r&&this.getDatasetMeta(r.datasetIndex).controller;c&&c[s+"HoverStyle"](r.element,r.datasetIndex,r.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){const n=this._active||[],i=t.map(({datasetIndex:o,index:r})=>{const a=this.getDatasetMeta(o);if(!a)throw new Error("No dataset found at index "+o);return{datasetIndex:o,element:a.data[r],index:r}});!Eo(i,n)&&(this._active=i,this._lastEvent=null,this._updateHoverStyles(i,n))}notifyPlugins(t,n,i){return this._plugins.notify(this,t,n,i)}isPluginEnabled(t){return this._plugins._cache.filter(n=>n.plugin.id===t).length===1}_updateHoverStyles(t,n,i){const s=this.options.hover,o=(l,c)=>l.filter(d=>!c.some(u=>d.datasetIndex===u.datasetIndex&&d.index===u.index)),r=o(n,t),a=i?t:o(t,n);r.length&&this.updateHoverStyle(r,s.mode,!1),a.length&&s.mode&&this.updateHoverStyle(a,s.mode,!0)}_eventHandler(t,n){const i={event:t,replay:n,cancelable:!0,inChartArea:this.isPointInArea(t)},s=r=>(r.options.events||this.options.events).includes(t.native.type);if(this.notifyPlugins("beforeEvent",i,s)===!1)return;const o=this._handleEvent(t,n,i.inChartArea);return i.cancelable=!1,this.notifyPlugins("afterEvent",i,s),(o||i.changed)&&this.render(),this}_handleEvent(t,n,i){const{_active:s=[],options:o}=this,r=n,a=this._getActiveElements(t,s,i,r),l=sk(t),c=XS(t,this._lastEvent,i,l);i&&(this._lastEvent=null,ue(o.onHover,[t,a,this],this),l&&ue(o.onClick,[t,a,this],this));const d=!Eo(a,s);return(d||n)&&(this._active=a,this._updateHoverStyles(a,s,n)),this._lastEvent=c,d}_getActiveElements(t,n,i,s){if(t.type==="mouseout")return[];if(!i)return n;const o=this.options.hover;return this.getElementsAtEventForMode(t,o.mode,o,s)}}D(Je,"defaults",be),D(Je,"instances",mo),D(Je,"overrides",Dn),D(Je,"registry",bt),D(Je,"version",VS),D(Je,"getChart",Uu);function qu(){return re(Je.instances,e=>e._plugins.invalidate())}function JS(e,t,n){const{startAngle:i,x:s,y:o,outerRadius:r,innerRadius:a,options:l}=t,{borderWidth:c,borderJoinStyle:d}=l,u=Math.min(c/r,Oe(i-n));if(e.beginPath(),e.arc(s,o,r-c/2,i+u/2,n-u/2),a>0){const h=Math.min(c/a,Oe(i-n));e.arc(s,o,a+c/2,n-h/2,i+h/2,!0)}else{const h=Math.min(c/2,r*Oe(i-n));if(d==="round")e.arc(s,o,h,n-ne/2,i+ne/2,!0);else if(d==="bevel"){const f=2*h*h,m=-f*Math.cos(n+ne/2)+s,b=-f*Math.sin(n+ne/2)+o,v=f*Math.cos(i+ne/2)+s,k=f*Math.sin(i+ne/2)+o;e.lineTo(m,b),e.lineTo(v,k)}}e.closePath(),e.moveTo(0,0),e.rect(0,0,e.canvas.width,e.canvas.height),e.clip("evenodd")}function ZS(e,t,n){const{startAngle:i,pixelMargin:s,x:o,y:r,outerRadius:a,innerRadius:l}=t;let c=s/a;e.beginPath(),e.arc(o,r,a,i-c,n+c),l>s?(c=s/l,e.arc(o,r,l,n+c,i-c,!0)):e.arc(o,r,s,n+xe,i-xe),e.closePath(),e.clip()}function e$(e){return Yl(e,["outerStart","outerEnd","innerStart","innerEnd"])}function t$(e,t,n,i){const s=e$(e.options.borderRadius),o=(n-t)/2,r=Math.min(o,i*t/2),a=l=>{const c=(n-Math.min(o,l))*i/2;return Ce(l,0,Math.min(o,c))};return{outerStart:a(s.outerStart),outerEnd:a(s.outerEnd),innerStart:Ce(s.innerStart,0,r),innerEnd:Ce(s.innerEnd,0,r)}}function Wn(e,t,n,i){return{x:n+e*Math.cos(t),y:i+e*Math.sin(t)}}function Io(e,t,n,i,s,o){const{x:r,y:a,startAngle:l,pixelMargin:c,innerRadius:d}=t,u=Math.max(t.outerRadius+i+n-c,0),h=d>0?d+i+n+c:0;let f=0;const m=s-l;if(i){const I=d>0?d-i:0,z=u>0?u-i:0,X=(I+z)/2,B=X!==0?m*X/(X+i):m;f=(m-B)/2}const b=Math.max(.001,m*u-n/ne)/u,v=(m-b)/2,k=l+v+f,T=s-v-f,{outerStart:M,outerEnd:S,innerStart:C,innerEnd:y}=t$(t,h,u,T-k),E=u-M,P=u-S,R=k+M/E,O=T-S/P,L=h+C,N=h+y,j=k+C/L,Q=T-y/N;if(e.beginPath(),o){const I=(R+O)/2;if(e.arc(r,a,u,R,I),e.arc(r,a,u,I,O),S>0){const se=Wn(P,O,r,a);e.arc(se.x,se.y,S,O,T+xe)}const z=Wn(N,T,r,a);if(e.lineTo(z.x,z.y),y>0){const se=Wn(N,Q,r,a);e.arc(se.x,se.y,y,T+xe,Q+Math.PI)}const X=(T-y/h+(k+C/h))/2;if(e.arc(r,a,h,T-y/h,X,!0),e.arc(r,a,h,X,k+C/h,!0),C>0){const se=Wn(L,j,r,a);e.arc(se.x,se.y,C,j+Math.PI,k-xe)}const B=Wn(E,k,r,a);if(e.lineTo(B.x,B.y),M>0){const se=Wn(E,R,r,a);e.arc(se.x,se.y,M,k-xe,R)}}else{e.moveTo(r,a);const I=Math.cos(R)*u+r,z=Math.sin(R)*u+a;e.lineTo(I,z);const X=Math.cos(O)*u+r,B=Math.sin(O)*u+a;e.lineTo(X,B)}e.closePath()}function n$(e,t,n,i,s){const{fullCircles:o,startAngle:r,circumference:a}=t;let l=t.endAngle;if(o){Io(e,t,n,i,l,s);for(let c=0;c<o;++c)e.fill();isNaN(a)||(l=r+(a%he||he))}return Io(e,t,n,i,l,s),e.fill(),l}function i$(e,t,n,i,s){const{fullCircles:o,startAngle:r,circumference:a,options:l}=t,{borderWidth:c,borderJoinStyle:d,borderDash:u,borderDashOffset:h,borderRadius:f}=l,m=l.borderAlign==="inner";if(!c)return;e.setLineDash(u||[]),e.lineDashOffset=h,m?(e.lineWidth=c*2,e.lineJoin=d||"round"):(e.lineWidth=c,e.lineJoin=d||"bevel");let b=t.endAngle;if(o){Io(e,t,n,i,b,s);for(let v=0;v<o;++v)e.stroke();isNaN(a)||(b=r+(a%he||he))}m&&ZS(e,t,b),l.selfJoin&&b-r>=ne&&f===0&&d!=="miter"&&JS(e,t,b),o||(Io(e,t,n,i,b,s),e.stroke())}class Li extends dt{constructor(n){super();D(this,"circumference");D(this,"endAngle");D(this,"fullCircles");D(this,"innerRadius");D(this,"outerRadius");D(this,"pixelMargin");D(this,"startAngle");this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,n&&Object.assign(this,n)}inRange(n,i,s){const o=this.getProps(["x","y"],s),{angle:r,distance:a}=mp(o,{x:n,y:i}),{startAngle:l,endAngle:c,innerRadius:d,outerRadius:u,circumference:h}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],s),f=(this.options.spacing+this.options.borderWidth)/2,m=G(h,c-l),b=ls(r,l,c)&&l!==c,v=m>=he||b,k=Mt(a,d+f,u+f);return v&&k}getCenterPoint(n){const{x:i,y:s,startAngle:o,endAngle:r,innerRadius:a,outerRadius:l}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],n),{offset:c,spacing:d}=this.options,u=(o+r)/2,h=(a+l+d+c)/2;return{x:i+Math.cos(u)*h,y:s+Math.sin(u)*h}}tooltipPosition(n){return this.getCenterPoint(n)}draw(n){const{options:i,circumference:s}=this,o=(i.offset||0)/4,r=(i.spacing||0)/2,a=i.circular;if(this.pixelMargin=i.borderAlign==="inner"?.33:0,this.fullCircles=s>he?Math.floor(s/he):0,s===0||this.innerRadius<0||this.outerRadius<0)return;n.save();const l=(this.startAngle+this.endAngle)/2;n.translate(Math.cos(l)*o,Math.sin(l)*o);const c=1-Math.sin(Math.min(ne,s||0)),d=o*c;n.fillStyle=i.backgroundColor,n.strokeStyle=i.borderColor,n$(n,this,d,r,a),i$(n,this,d,r,a),n.restore()}}D(Li,"id","arc"),D(Li,"defaults",{borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1}),D(Li,"defaultRoutes",{backgroundColor:"backgroundColor"}),D(Li,"descriptors",{_scriptable:!0,_indexable:n=>n!=="borderDash"});function Yp(e,t,n=t){e.lineCap=G(n.borderCapStyle,t.borderCapStyle),e.setLineDash(G(n.borderDash,t.borderDash)),e.lineDashOffset=G(n.borderDashOffset,t.borderDashOffset),e.lineJoin=G(n.borderJoinStyle,t.borderJoinStyle),e.lineWidth=G(n.borderWidth,t.borderWidth),e.strokeStyle=G(n.borderColor,t.borderColor)}function s$(e,t,n){e.lineTo(n.x,n.y)}function o$(e){return e.stepped?Tk:e.tension||e.cubicInterpolationMode==="monotone"?Ck:s$}function Xp(e,t,n={}){const i=e.length,{start:s=0,end:o=i-1}=n,{start:r,end:a}=t,l=Math.max(s,r),c=Math.min(o,a),d=s<r&&o<r||s>a&&o>a;return{count:i,start:l,loop:t.loop,ilen:c<l&&!d?i+c-l:c-l}}function r$(e,t,n,i){const{points:s,options:o}=t,{count:r,start:a,loop:l,ilen:c}=Xp(s,n,i),d=o$(o);let{move:u=!0,reverse:h}=i||{},f,m,b;for(f=0;f<=c;++f)m=s[(a+(h?c-f:f))%r],!m.skip&&(u?(e.moveTo(m.x,m.y),u=!1):d(e,b,m,h,o.stepped),b=m);return l&&(m=s[(a+(h?c:0))%r],d(e,b,m,h,o.stepped)),!!l}function a$(e,t,n,i){const s=t.points,{count:o,start:r,ilen:a}=Xp(s,n,i),{move:l=!0,reverse:c}=i||{};let d=0,u=0,h,f,m,b,v,k;const T=S=>(r+(c?a-S:S))%o,M=()=>{b!==v&&(e.lineTo(d,v),e.lineTo(d,b),e.lineTo(d,k))};for(l&&(f=s[T(0)],e.moveTo(f.x,f.y)),h=0;h<=a;++h){if(f=s[T(h)],f.skip)continue;const S=f.x,C=f.y,y=S|0;y===m?(C<b?b=C:C>v&&(v=C),d=(u*d+S)/++u):(M(),e.lineTo(S,C),m=y,u=0,b=v=C),k=C}M()}function ja(e){const t=e.options,n=t.borderDash&&t.borderDash.length;return!e._decimated&&!e._loop&&!t.tension&&t.cubicInterpolationMode!=="monotone"&&!t.stepped&&!n?a$:r$}function l$(e){return e.stepped?r2:e.tension||e.cubicInterpolationMode==="monotone"?a2:gn}function c$(e,t,n,i){let s=t._path;s||(s=t._path=new Path2D,t.path(s,n,i)&&s.closePath()),Yp(e,t.options),e.stroke(s)}function d$(e,t,n,i){const{segments:s,options:o}=t,r=ja(t);for(const a of s)Yp(e,o,a.style),e.beginPath(),r(e,t,a,{start:n,end:n+i-1})&&e.closePath(),e.stroke()}const u$=typeof Path2D=="function";function h$(e,t,n,i){u$&&!t.options.segment?c$(e,t,n,i):d$(e,t,n,i)}class Lt extends dt{constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,n){const i=this.options;if((i.tension||i.cubicInterpolationMode==="monotone")&&!i.stepped&&!this._pointsUpdated){const s=i.spanGaps?this._loop:this._fullLoop;Jk(this._points,i,t,s,n),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=f2(this,this.options.segment))}first(){const t=this.segments,n=this.points;return t.length&&n[t[0].start]}last(){const t=this.segments,n=this.points,i=t.length;return i&&n[t[i-1].end]}interpolate(t,n){const i=this.options,s=t[n],o=this.points,r=Op(this,{property:n,start:s,end:s});if(!r.length)return;const a=[],l=l$(i);let c,d;for(c=0,d=r.length;c<d;++c){const{start:u,end:h}=r[c],f=o[u],m=o[h];if(f===m){a.push(f);continue}const b=Math.abs((s-f[n])/(m[n]-f[n])),v=l(f,m,b,i.stepped);v[n]=t[n],a.push(v)}return a.length===1?a[0]:a}pathSegment(t,n,i){return ja(this)(t,this,n,i)}path(t,n,i){const s=this.segments,o=ja(this);let r=this._loop;n=n||0,i=i||this.points.length-n;for(const a of s)r&=o(t,this,a,{start:n,end:n+i-1});return!!r}draw(t,n,i,s){const o=this.options||{};(this.points||[]).length&&o.borderWidth&&(t.save(),h$(t,this,i,s),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}D(Lt,"id","line"),D(Lt,"defaults",{borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0}),D(Lt,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"}),D(Lt,"descriptors",{_scriptable:!0,_indexable:t=>t!=="borderDash"&&t!=="fill"});function ju(e,t,n,i){const s=e.options,{[n]:o}=e.getProps([n],i);return Math.abs(t-o)<s.radius+s.hitRadius}class Xi extends dt{constructor(n){super();D(this,"parsed");D(this,"skip");D(this,"stop");this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,n&&Object.assign(this,n)}inRange(n,i,s){const o=this.options,{x:r,y:a}=this.getProps(["x","y"],s);return Math.pow(n-r,2)+Math.pow(i-a,2)<Math.pow(o.hitRadius+o.radius,2)}inXRange(n,i){return ju(this,n,"x",i)}inYRange(n,i){return ju(this,n,"y",i)}getCenterPoint(n){const{x:i,y:s}=this.getProps(["x","y"],n);return{x:i,y:s}}size(n){n=n||this.options||{};let i=n.radius||0;i=Math.max(i,i&&n.hoverRadius||0);const s=i&&n.borderWidth||0;return(i+s)*2}draw(n,i){const s=this.options;this.skip||s.radius<.1||!Dt(this,i,this.size(s)/2)||(n.strokeStyle=s.borderColor,n.lineWidth=s.borderWidth,n.fillStyle=s.backgroundColor,za(n,s,this.x,this.y))}getRange(){const n=this.options||{};return n.radius+n.hitRadius}}D(Xi,"id","point"),D(Xi,"defaults",{borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0}),D(Xi,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});function Jp(e,t){const{x:n,y:i,base:s,width:o,height:r}=e.getProps(["x","y","base","width","height"],t);let a,l,c,d,u;return e.horizontal?(u=r/2,a=Math.min(n,s),l=Math.max(n,s),c=i-u,d=i+u):(u=o/2,a=n-u,l=n+u,c=Math.min(i,s),d=Math.max(i,s)),{left:a,top:c,right:l,bottom:d}}function qt(e,t,n,i){return e?0:Ce(t,n,i)}function f$(e,t,n){const i=e.options.borderWidth,s=e.borderSkipped,o=$p(i);return{t:qt(s.top,o.top,0,n),r:qt(s.right,o.right,0,t),b:qt(s.bottom,o.bottom,0,n),l:qt(s.left,o.left,0,t)}}function p$(e,t,n){const{enableBorderRadius:i}=e.getProps(["enableBorderRadius"]),s=e.options.borderRadius,o=kn(s),r=Math.min(t,n),a=e.borderSkipped,l=i||ee(s);return{topLeft:qt(!l||a.top||a.left,o.topLeft,0,r),topRight:qt(!l||a.top||a.right,o.topRight,0,r),bottomLeft:qt(!l||a.bottom||a.left,o.bottomLeft,0,r),bottomRight:qt(!l||a.bottom||a.right,o.bottomRight,0,r)}}function g$(e){const t=Jp(e),n=t.right-t.left,i=t.bottom-t.top,s=f$(e,n/2,i/2),o=p$(e,n/2,i/2);return{outer:{x:t.left,y:t.top,w:n,h:i,radius:o},inner:{x:t.left+s.l,y:t.top+s.t,w:n-s.l-s.r,h:i-s.t-s.b,radius:{topLeft:Math.max(0,o.topLeft-Math.max(s.t,s.l)),topRight:Math.max(0,o.topRight-Math.max(s.t,s.r)),bottomLeft:Math.max(0,o.bottomLeft-Math.max(s.b,s.l)),bottomRight:Math.max(0,o.bottomRight-Math.max(s.b,s.r))}}}}function oa(e,t,n,i){const s=t===null,o=n===null,a=e&&!(s&&o)&&Jp(e,i);return a&&(s||Mt(t,a.left,a.right))&&(o||Mt(n,a.top,a.bottom))}function m$(e){return e.topLeft||e.topRight||e.bottomLeft||e.bottomRight}function b$(e,t){e.rect(t.x,t.y,t.w,t.h)}function ra(e,t,n={}){const i=e.x!==n.x?-t:0,s=e.y!==n.y?-t:0,o=(e.x+e.w!==n.x+n.w?t:0)-i,r=(e.y+e.h!==n.y+n.h?t:0)-s;return{x:e.x+i,y:e.y+s,w:e.w+o,h:e.h+r,radius:e.radius}}class bo extends dt{constructor(t){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,t&&Object.assign(this,t)}draw(t){const{inflateAmount:n,options:{borderColor:i,backgroundColor:s}}=this,{inner:o,outer:r}=g$(this),a=m$(r.radius)?cs:b$;t.save(),(r.w!==o.w||r.h!==o.h)&&(t.beginPath(),a(t,ra(r,n,o)),t.clip(),a(t,ra(o,-n,r)),t.fillStyle=i,t.fill("evenodd")),t.beginPath(),a(t,ra(o,n)),t.fillStyle=s,t.fill(),t.restore()}inRange(t,n,i){return oa(this,t,n,i)}inXRange(t,n){return oa(this,t,null,n)}inYRange(t,n){return oa(this,null,t,n)}getCenterPoint(t){const{x:n,y:i,base:s,horizontal:o}=this.getProps(["x","y","base","horizontal"],t);return{x:o?(n+s)/2:n,y:o?i:(i+s)/2}}getRange(t){return t==="x"?this.width/2:this.height/2}}D(bo,"id","bar"),D(bo,"defaults",{borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0}),D(bo,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});var y$=Object.freeze({__proto__:null,ArcElement:Li,BarElement:bo,LineElement:Lt,PointElement:Xi});const Ka=["rgb(54, 162, 235)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(153, 102, 255)","rgb(201, 203, 207)"],Ku=Ka.map(e=>e.replace("rgb(","rgba(").replace(")",", 0.5)"));function Zp(e){return Ka[e%Ka.length]}function eg(e){return Ku[e%Ku.length]}function v$(e,t){return e.borderColor=Zp(t),e.backgroundColor=eg(t),++t}function x$(e,t){return e.backgroundColor=e.data.map(()=>Zp(t++)),t}function w$(e,t){return e.backgroundColor=e.data.map(()=>eg(t++)),t}function _$(e){let t=0;return(n,i)=>{const s=e.getDatasetMeta(i).controller;s instanceof vn?t=x$(n,t):s instanceof Yi?t=w$(n,t):s&&(t=v$(n,t))}}function Wu(e){let t;for(t in e)if(e[t].borderColor||e[t].backgroundColor)return!0;return!1}function k$(e){return e&&(e.borderColor||e.backgroundColor)}function S$(){return be.borderColor!=="rgba(0,0,0,0.1)"||be.backgroundColor!=="rgba(0,0,0,0.1)"}var $$={id:"colors",defaults:{enabled:!0,forceOverride:!1},beforeLayout(e,t,n){if(!n.enabled)return;const{data:{datasets:i},options:s}=e.config,{elements:o}=s,r=Wu(i)||k$(s)||o&&Wu(o)||S$();if(!n.forceOverride&&r)return;const a=_$(e);i.forEach(a)}};function A$(e,t,n,i,s){const o=s.samples||i;if(o>=n)return e.slice(t,t+n);const r=[],a=(n-2)/(o-2);let l=0;const c=t+n-1;let d=t,u,h,f,m,b;for(r[l++]=e[d],u=0;u<o-2;u++){let v=0,k=0,T;const M=Math.floor((u+1)*a)+1+t,S=Math.min(Math.floor((u+2)*a)+1,n)+t,C=S-M;for(T=M;T<S;T++)v+=e[T].x,k+=e[T].y;v/=C,k/=C;const y=Math.floor(u*a)+1+t,E=Math.min(Math.floor((u+1)*a)+1,n)+t,{x:P,y:R}=e[d];for(f=m=-1,T=y;T<E;T++)m=.5*Math.abs((P-v)*(e[T].y-R)-(P-e[T].x)*(k-R)),m>f&&(f=m,h=e[T],b=T);r[l++]=h,d=b}return r[l++]=e[c],r}function T$(e,t,n,i){let s=0,o=0,r,a,l,c,d,u,h,f,m,b;const v=[],k=t+n-1,T=e[t].x,S=e[k].x-T;for(r=t;r<t+n;++r){a=e[r],l=(a.x-T)/S*i,c=a.y;const C=l|0;if(C===d)c<m?(m=c,u=r):c>b&&(b=c,h=r),s=(o*s+a.x)/++o;else{const y=r-1;if(!Z(u)&&!Z(h)){const E=Math.min(u,h),P=Math.max(u,h);E!==f&&E!==y&&v.push({...e[E],x:s}),P!==f&&P!==y&&v.push({...e[P],x:s})}r>0&&y!==f&&v.push(e[y]),v.push(a),d=C,o=0,m=b=c,u=h=f=r}}return v}function tg(e){if(e._decimated){const t=e._data;delete e._decimated,delete e._data,Object.defineProperty(e,"data",{configurable:!0,enumerable:!0,writable:!0,value:t})}}function Vu(e){e.data.datasets.forEach(t=>{tg(t)})}function C$(e,t){const n=t.length;let i=0,s;const{iScale:o}=e,{min:r,max:a,minDefined:l,maxDefined:c}=o.getUserBounds();return l&&(i=Ce(Pt(t,o.axis,r).lo,0,n-1)),c?s=Ce(Pt(t,o.axis,a).hi+1,i,n)-i:s=n-i,{start:i,count:s}}var E$={id:"decimation",defaults:{algorithm:"min-max",enabled:!1},beforeElementsUpdate:(e,t,n)=>{if(!n.enabled){Vu(e);return}const i=e.width;e.data.datasets.forEach((s,o)=>{const{_data:r,indexAxis:a}=s,l=e.getDatasetMeta(o),c=r||s.data;if(Pi([a,e.options.indexAxis])==="y"||!l.controller.supportsDecimation)return;const d=e.scales[l.xAxisID];if(d.type!=="linear"&&d.type!=="time"||e.options.parsing)return;let{start:u,count:h}=C$(l,c);const f=n.threshold||4*i;if(h<=f){tg(s);return}Z(r)&&(s._data=c,delete s.data,Object.defineProperty(s,"data",{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(b){this._data=b}}));let m;switch(n.algorithm){case"lttb":m=A$(c,u,h,i,n);break;case"min-max":m=T$(c,u,h,i);break;default:throw new Error(`Unsupported decimation algorithm '${n.algorithm}'`)}s._decimated=m})},destroy(e){Vu(e)}};function R$(e,t,n){const i=e.segments,s=e.points,o=t.points,r=[];for(const a of i){let{start:l,end:c}=a;c=lr(l,c,s);const d=Wa(n,s[l],s[c],a.loop);if(!t.segments){r.push({source:a,target:d,start:s[l],end:s[c]});continue}const u=Op(t,d);for(const h of u){const f=Wa(n,o[h.start],o[h.end],h.loop),m=Ip(a,s,f);for(const b of m)r.push({source:b,target:h,start:{[n]:Gu(d,f,"start",Math.max)},end:{[n]:Gu(d,f,"end",Math.min)}})}}return r}function Wa(e,t,n,i){if(i)return;let s=t[e],o=n[e];return e==="angle"&&(s=Oe(s),o=Oe(o)),{property:e,start:s,end:o}}function M$(e,t){const{x:n=null,y:i=null}=e||{},s=t.points,o=[];return t.segments.forEach(({start:r,end:a})=>{a=lr(r,a,s);const l=s[r],c=s[a];i!==null?(o.push({x:l.x,y:i}),o.push({x:c.x,y:i})):n!==null&&(o.push({x:n,y:l.y}),o.push({x:n,y:c.y}))}),o}function lr(e,t,n){for(;t>e;t--){const i=n[t];if(!isNaN(i.x)&&!isNaN(i.y))break}return t}function Gu(e,t,n,i){return e&&t?i(e[n],t[n]):e?e[n]:t?t[n]:0}function ng(e,t){let n=[],i=!1;return me(e)?(i=!0,n=e):n=M$(e,t),n.length?new Lt({points:n,options:{tension:0},_loop:i,_fullLoop:i}):null}function Qu(e){return e&&e.fill!==!1}function P$(e,t,n){let s=e[t].fill;const o=[t];let r;if(!n)return s;for(;s!==!1&&o.indexOf(s)===-1;){if(!ve(s))return s;if(r=e[s],!r)return!1;if(r.visible)return s;o.push(s),s=r.fill}return!1}function D$(e,t,n){const i=F$(e);if(ee(i))return isNaN(i.value)?!1:i;let s=parseFloat(i);return ve(s)&&Math.floor(s)===s?L$(i[0],t,s,n):["origin","start","end","stack","shape"].indexOf(i)>=0&&i}function L$(e,t,n,i){return(e==="-"||e==="+")&&(n=t+n),n===t||n<0||n>=i?!1:n}function I$(e,t){let n=null;return e==="start"?n=t.bottom:e==="end"?n=t.top:ee(e)?n=t.getPixelForValue(e.value):t.getBasePixel&&(n=t.getBasePixel()),n}function O$(e,t,n){let i;return e==="start"?i=n:e==="end"?i=t.options.reverse?t.min:t.max:ee(e)?i=e.value:i=t.getBaseValue(),i}function F$(e){const t=e.options,n=t.fill;let i=G(n&&n.target,n);return i===void 0&&(i=!!t.backgroundColor),i===!1||i===null?!1:i===!0?"origin":i}function N$(e){const{scale:t,index:n,line:i}=e,s=[],o=i.segments,r=i.points,a=B$(t,n);a.push(ng({x:null,y:t.bottom},i));for(let l=0;l<o.length;l++){const c=o[l];for(let d=c.start;d<=c.end;d++)z$(s,r[d],a)}return new Lt({points:s,options:{}})}function B$(e,t){const n=[],i=e.getMatchingVisibleMetas("line");for(let s=0;s<i.length;s++){const o=i[s];if(o.index===t)break;o.hidden||n.unshift(o.dataset)}return n}function z$(e,t,n){const i=[];for(let s=0;s<n.length;s++){const o=n[s],{first:r,last:a,point:l}=H$(o,t,"x");if(!(!l||r&&a)){if(r)i.unshift(l);else if(e.push(l),!a)break}}e.push(...i)}function H$(e,t,n){const i=e.interpolate(t,n);if(!i)return{};const s=i[n],o=e.segments,r=e.points;let a=!1,l=!1;for(let c=0;c<o.length;c++){const d=o[c],u=r[d.start][n],h=r[d.end][n];if(Mt(s,u,h)){a=s===u,l=s===h;break}}return{first:a,last:l,point:i}}class ig{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,n,i){const{x:s,y:o,radius:r}=this;return n=n||{start:0,end:he},t.arc(s,o,r,n.end,n.start,!0),!i.bounds}interpolate(t){const{x:n,y:i,radius:s}=this,o=t.angle;return{x:n+Math.cos(o)*s,y:i+Math.sin(o)*s,angle:o}}}function U$(e){const{chart:t,fill:n,line:i}=e;if(ve(n))return q$(t,n);if(n==="stack")return N$(e);if(n==="shape")return!0;const s=j$(e);return s instanceof ig?s:ng(s,i)}function q$(e,t){const n=e.getDatasetMeta(t);return n&&e.isDatasetVisible(t)?n.dataset:null}function j$(e){return(e.scale||{}).getPointPositionForValue?W$(e):K$(e)}function K$(e){const{scale:t={},fill:n}=e,i=I$(n,t);if(ve(i)){const s=t.isHorizontal();return{x:s?i:null,y:s?null:i}}return null}function W$(e){const{scale:t,fill:n}=e,i=t.options,s=t.getLabels().length,o=i.reverse?t.max:t.min,r=O$(n,t,o),a=[];if(i.grid.circular){const l=t.getPointPositionForValue(0,o);return new ig({x:l.x,y:l.y,radius:t.getDistanceFromCenterForValue(r)})}for(let l=0;l<s;++l)a.push(t.getPointPositionForValue(l,r));return a}function aa(e,t,n){const i=U$(t),{chart:s,index:o,line:r,scale:a,axis:l}=t,c=r.options,d=c.fill,u=c.backgroundColor,{above:h=u,below:f=u}=d||{},m=s.getDatasetMeta(o),b=Fp(s,m);i&&r.points.length&&(sr(e,n),V$(e,{line:r,target:i,above:h,below:f,area:n,scale:a,axis:l,clip:b}),or(e))}function V$(e,t){const{line:n,target:i,above:s,below:o,area:r,scale:a,clip:l}=t,c=n._loop?"angle":t.axis;e.save();let d=o;o!==s&&(c==="x"?(Yu(e,i,r.top),la(e,{line:n,target:i,color:s,scale:a,property:c,clip:l}),e.restore(),e.save(),Yu(e,i,r.bottom)):c==="y"&&(Xu(e,i,r.left),la(e,{line:n,target:i,color:o,scale:a,property:c,clip:l}),e.restore(),e.save(),Xu(e,i,r.right),d=s)),la(e,{line:n,target:i,color:d,scale:a,property:c,clip:l}),e.restore()}function Yu(e,t,n){const{segments:i,points:s}=t;let o=!0,r=!1;e.beginPath();for(const a of i){const{start:l,end:c}=a,d=s[l],u=s[lr(l,c,s)];o?(e.moveTo(d.x,d.y),o=!1):(e.lineTo(d.x,n),e.lineTo(d.x,d.y)),r=!!t.pathSegment(e,a,{move:r}),r?e.closePath():e.lineTo(u.x,n)}e.lineTo(t.first().x,n),e.closePath(),e.clip()}function Xu(e,t,n){const{segments:i,points:s}=t;let o=!0,r=!1;e.beginPath();for(const a of i){const{start:l,end:c}=a,d=s[l],u=s[lr(l,c,s)];o?(e.moveTo(d.x,d.y),o=!1):(e.lineTo(n,d.y),e.lineTo(d.x,d.y)),r=!!t.pathSegment(e,a,{move:r}),r?e.closePath():e.lineTo(n,u.y)}e.lineTo(n,t.first().y),e.closePath(),e.clip()}function la(e,t){const{line:n,target:i,property:s,color:o,scale:r,clip:a}=t,l=R$(n,i,s);for(const{source:c,target:d,start:u,end:h}of l){const{style:{backgroundColor:f=o}={}}=c,m=i!==!0;e.save(),e.fillStyle=f,G$(e,r,a,m&&Wa(s,u,h)),e.beginPath();const b=!!n.pathSegment(e,c);let v;if(m){b?e.closePath():Ju(e,i,h,s);const k=!!i.pathSegment(e,d,{move:b,reverse:!0});v=b&&k,v||Ju(e,i,u,s)}e.closePath(),e.fill(v?"evenodd":"nonzero"),e.restore()}}function G$(e,t,n,i){const s=t.chart.chartArea,{property:o,start:r,end:a}=i||{};if(o==="x"||o==="y"){let l,c,d,u;o==="x"?(l=r,c=s.top,d=a,u=s.bottom):(l=s.left,c=r,d=s.right,u=a),e.beginPath(),n&&(l=Math.max(l,n.left),d=Math.min(d,n.right),c=Math.max(c,n.top),u=Math.min(u,n.bottom)),e.rect(l,c,d-l,u-c),e.clip()}}function Ju(e,t,n,i){const s=t.interpolate(n,i);s&&e.lineTo(s.x,s.y)}var sg={id:"filler",afterDatasetsUpdate(e,t,n){const i=(e.data.datasets||[]).length,s=[];let o,r,a,l;for(r=0;r<i;++r)o=e.getDatasetMeta(r),a=o.dataset,l=null,a&&a.options&&a instanceof Lt&&(l={visible:e.isDatasetVisible(r),index:r,fill:D$(a,r,i),chart:e,axis:o.controller.options.indexAxis,scale:o.vScale,line:a}),o.$filler=l,s.push(l);for(r=0;r<i;++r)l=s[r],!(!l||l.fill===!1)&&(l.fill=P$(s,r,n.propagate))},beforeDraw(e,t,n){const i=n.drawTime==="beforeDraw",s=e.getSortedVisibleDatasetMetas(),o=e.chartArea;for(let r=s.length-1;r>=0;--r){const a=s[r].$filler;a&&(a.line.updateControlPoints(o,a.axis),i&&a.fill&&aa(e.ctx,a,o))}},beforeDatasetsDraw(e,t,n){if(n.drawTime!=="beforeDatasetsDraw")return;const i=e.getSortedVisibleDatasetMetas();for(let s=i.length-1;s>=0;--s){const o=i[s].$filler;Qu(o)&&aa(e.ctx,o,e.chartArea)}},beforeDatasetDraw(e,t,n){const i=t.meta.$filler;!Qu(i)||n.drawTime!=="beforeDatasetDraw"||aa(e.ctx,i,e.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const Zu=(e,t)=>{let{boxHeight:n=t,boxWidth:i=t}=e;return e.usePointStyle&&(n=Math.min(n,t),i=e.pointStyleWidth||Math.min(i,t)),{boxWidth:i,boxHeight:n,itemHeight:Math.max(t,n)}},Q$=(e,t)=>e!==null&&t!==null&&e.datasetIndex===t.datasetIndex&&e.index===t.index;class eh extends dt{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,n,i){this.maxWidth=t,this.maxHeight=n,this._margins=i,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const t=this.options.labels||{};let n=ue(t.generateLabels,[this.chart],this)||[];t.filter&&(n=n.filter(i=>t.filter(i,this.chart.data))),t.sort&&(n=n.sort((i,s)=>t.sort(i,s,this.chart.data))),this.options.reverse&&n.reverse(),this.legendItems=n}fit(){const{options:t,ctx:n}=this;if(!t.display){this.width=this.height=0;return}const i=t.labels,s=Ae(i.font),o=s.size,r=this._computeTitleHeight(),{boxWidth:a,itemHeight:l}=Zu(i,o);let c,d;n.font=s.string,this.isHorizontal()?(c=this.maxWidth,d=this._fitRows(r,o,a,l)+10):(d=this.maxHeight,c=this._fitCols(r,s,a,l)+10),this.width=Math.min(c,t.maxWidth||this.maxWidth),this.height=Math.min(d,t.maxHeight||this.maxHeight)}_fitRows(t,n,i,s){const{ctx:o,maxWidth:r,options:{labels:{padding:a}}}=this,l=this.legendHitBoxes=[],c=this.lineWidths=[0],d=s+a;let u=t;o.textAlign="left",o.textBaseline="middle";let h=-1,f=-d;return this.legendItems.forEach((m,b)=>{const v=i+n/2+o.measureText(m.text).width;(b===0||c[c.length-1]+v+2*a>r)&&(u+=d,c[c.length-(b>0?0:1)]=0,f+=d,h++),l[b]={left:0,top:f,row:h,width:v,height:s},c[c.length-1]+=v+a}),u}_fitCols(t,n,i,s){const{ctx:o,maxHeight:r,options:{labels:{padding:a}}}=this,l=this.legendHitBoxes=[],c=this.columnSizes=[],d=r-t;let u=a,h=0,f=0,m=0,b=0;return this.legendItems.forEach((v,k)=>{const{itemWidth:T,itemHeight:M}=Y$(i,n,o,v,s);k>0&&f+M+2*a>d&&(u+=h+a,c.push({width:h,height:f}),m+=h+a,b++,h=f=0),l[k]={left:m,top:f,col:b,width:T,height:M},h=Math.max(h,T),f+=M+a}),u+=h,c.push({width:h,height:f}),u}adjustHitBoxes(){if(!this.options.display)return;const t=this._computeTitleHeight(),{legendHitBoxes:n,options:{align:i,labels:{padding:s},rtl:o}}=this,r=Jn(o,this.left,this.width);if(this.isHorizontal()){let a=0,l=Ie(i,this.left+s,this.right-this.lineWidths[a]);for(const c of n)a!==c.row&&(a=c.row,l=Ie(i,this.left+s,this.right-this.lineWidths[a])),c.top+=this.top+t+s,c.left=r.leftForLtr(r.x(l),c.width),l+=c.width+s}else{let a=0,l=Ie(i,this.top+t+s,this.bottom-this.columnSizes[a].height);for(const c of n)c.col!==a&&(a=c.col,l=Ie(i,this.top+t+s,this.bottom-this.columnSizes[a].height)),c.top=l,c.left+=this.left+s,c.left=r.leftForLtr(r.x(c.left),c.width),l+=c.height+s}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const t=this.ctx;sr(t,this),this._draw(),or(t)}}_draw(){const{options:t,columnSizes:n,lineWidths:i,ctx:s}=this,{align:o,labels:r}=t,a=be.color,l=Jn(t.rtl,this.left,this.width),c=Ae(r.font),{padding:d}=r,u=c.size,h=u/2;let f;this.drawTitle(),s.textAlign=l.textAlign("left"),s.textBaseline="middle",s.lineWidth=.5,s.font=c.string;const{boxWidth:m,boxHeight:b,itemHeight:v}=Zu(r,u),k=function(y,E,P){if(isNaN(m)||m<=0||isNaN(b)||b<0)return;s.save();const R=G(P.lineWidth,1);if(s.fillStyle=G(P.fillStyle,a),s.lineCap=G(P.lineCap,"butt"),s.lineDashOffset=G(P.lineDashOffset,0),s.lineJoin=G(P.lineJoin,"miter"),s.lineWidth=R,s.strokeStyle=G(P.strokeStyle,a),s.setLineDash(G(P.lineDash,[])),r.usePointStyle){const O={radius:b*Math.SQRT2/2,pointStyle:P.pointStyle,rotation:P.rotation,borderWidth:R},L=l.xPlus(y,m/2),N=E+h;Sp(s,O,L,N,r.pointStyleWidth&&m)}else{const O=E+Math.max((u-b)/2,0),L=l.leftForLtr(y,m),N=kn(P.borderRadius);s.beginPath(),Object.values(N).some(j=>j!==0)?cs(s,{x:L,y:O,w:m,h:b,radius:N}):s.rect(L,O,m,b),s.fill(),R!==0&&s.stroke()}s.restore()},T=function(y,E,P){Ln(s,P.text,y,E+v/2,c,{strikethrough:P.hidden,textAlign:l.textAlign(P.textAlign)})},M=this.isHorizontal(),S=this._computeTitleHeight();M?f={x:Ie(o,this.left+d,this.right-i[0]),y:this.top+d+S,line:0}:f={x:this.left+d,y:Ie(o,this.top+S+d,this.bottom-n[0].height),line:0},Pp(this.ctx,t.textDirection);const C=v+d;this.legendItems.forEach((y,E)=>{s.strokeStyle=y.fontColor,s.fillStyle=y.fontColor;const P=s.measureText(y.text).width,R=l.textAlign(y.textAlign||(y.textAlign=r.textAlign)),O=m+h+P;let L=f.x,N=f.y;l.setWidth(this.width),M?E>0&&L+O+d>this.right&&(N=f.y+=C,f.line++,L=f.x=Ie(o,this.left+d,this.right-i[f.line])):E>0&&N+C>this.bottom&&(L=f.x=L+n[f.line].width+d,f.line++,N=f.y=Ie(o,this.top+S+d,this.bottom-n[f.line].height));const j=l.x(L);if(k(j,N,y),L=mk(R,L+m+h,M?L+O:this.right,t.rtl),T(l.x(L),N,y),M)f.x+=O+d;else if(typeof y.text!="string"){const Q=c.lineHeight;f.y+=og(y,Q)+d}else f.y+=C}),Dp(this.ctx,t.textDirection)}drawTitle(){const t=this.options,n=t.title,i=Ae(n.font),s=Be(n.padding);if(!n.display)return;const o=Jn(t.rtl,this.left,this.width),r=this.ctx,a=n.position,l=i.size/2,c=s.top+l;let d,u=this.left,h=this.width;if(this.isHorizontal())h=Math.max(...this.lineWidths),d=this.top+c,u=Ie(t.align,u,this.right-h);else{const m=this.columnSizes.reduce((b,v)=>Math.max(b,v.height),0);d=c+Ie(t.align,this.top,this.bottom-m-t.labels.padding-this._computeTitleHeight())}const f=Ie(a,u,u+h);r.textAlign=o.textAlign(Gl(a)),r.textBaseline="middle",r.strokeStyle=n.color,r.fillStyle=n.color,r.font=i.string,Ln(r,n.text,f,d,i)}_computeTitleHeight(){const t=this.options.title,n=Ae(t.font),i=Be(t.padding);return t.display?n.lineHeight+i.height:0}_getLegendItemAt(t,n){let i,s,o;if(Mt(t,this.left,this.right)&&Mt(n,this.top,this.bottom)){for(o=this.legendHitBoxes,i=0;i<o.length;++i)if(s=o[i],Mt(t,s.left,s.left+s.width)&&Mt(n,s.top,s.top+s.height))return this.legendItems[i]}return null}handleEvent(t){const n=this.options;if(!Z$(t.type,n))return;const i=this._getLegendItemAt(t.x,t.y);if(t.type==="mousemove"||t.type==="mouseout"){const s=this._hoveredItem,o=Q$(s,i);s&&!o&&ue(n.onLeave,[t,s,this],this),this._hoveredItem=i,i&&!o&&ue(n.onHover,[t,i,this],this)}else i&&ue(n.onClick,[t,i,this],this)}}function Y$(e,t,n,i,s){const o=X$(i,e,t,n),r=J$(s,i,t.lineHeight);return{itemWidth:o,itemHeight:r}}function X$(e,t,n,i){let s=e.text;return s&&typeof s!="string"&&(s=s.reduce((o,r)=>o.length>r.length?o:r)),t+n.size/2+i.measureText(s).width}function J$(e,t,n){let i=e;return typeof t.text!="string"&&(i=og(t,n)),i}function og(e,t){const n=e.text?e.text.length:0;return t*n}function Z$(e,t){return!!((e==="mousemove"||e==="mouseout")&&(t.onHover||t.onLeave)||t.onClick&&(e==="click"||e==="mouseup"))}var rg={id:"legend",_element:eh,start(e,t,n){const i=e.legend=new eh({ctx:e.ctx,options:n,chart:e});Fe.configure(e,i,n),Fe.addBox(e,i)},stop(e){Fe.removeBox(e,e.legend),delete e.legend},beforeUpdate(e,t,n){const i=e.legend;Fe.configure(e,i,n),i.options=n},afterUpdate(e){const t=e.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(e,t){t.replay||e.legend.handleEvent(t.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(e,t,n){const i=t.datasetIndex,s=n.chart;s.isDatasetVisible(i)?(s.hide(i),t.hidden=!0):(s.show(i),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:e=>e.chart.options.color,boxWidth:40,padding:10,generateLabels(e){const t=e.data.datasets,{labels:{usePointStyle:n,pointStyle:i,textAlign:s,color:o,useBorderRadius:r,borderRadius:a}}=e.legend.options;return e._getSortedDatasetMetas().map(l=>{const c=l.controller.getStyle(n?0:void 0),d=Be(c.borderWidth);return{text:t[l.index].label,fillStyle:c.backgroundColor,fontColor:o,hidden:!l.visible,lineCap:c.borderCapStyle,lineDash:c.borderDash,lineDashOffset:c.borderDashOffset,lineJoin:c.borderJoinStyle,lineWidth:(d.width+d.height)/4,strokeStyle:c.borderColor,pointStyle:i||c.pointStyle,rotation:c.rotation,textAlign:s||c.textAlign,borderRadius:r&&(a||c.borderRadius),datasetIndex:l.index}},this)}},title:{color:e=>e.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:e=>!e.startsWith("on"),labels:{_scriptable:e=>!["generateLabels","filter","sort"].includes(e)}}};class ic extends dt{constructor(t){super(),this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,n){const i=this.options;if(this.left=0,this.top=0,!i.display){this.width=this.height=this.right=this.bottom=0;return}this.width=this.right=t,this.height=this.bottom=n;const s=me(i.text)?i.text.length:1;this._padding=Be(i.padding);const o=s*Ae(i.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=o:this.width=o}isHorizontal(){const t=this.options.position;return t==="top"||t==="bottom"}_drawArgs(t){const{top:n,left:i,bottom:s,right:o,options:r}=this,a=r.align;let l=0,c,d,u;return this.isHorizontal()?(d=Ie(a,i,o),u=n+t,c=o-i):(r.position==="left"?(d=i+t,u=Ie(a,s,n),l=ne*-.5):(d=o-t,u=Ie(a,n,s),l=ne*.5),c=s-n),{titleX:d,titleY:u,maxWidth:c,rotation:l}}draw(){const t=this.ctx,n=this.options;if(!n.display)return;const i=Ae(n.font),o=i.lineHeight/2+this._padding.top,{titleX:r,titleY:a,maxWidth:l,rotation:c}=this._drawArgs(o);Ln(t,n.text,0,0,i,{color:n.color,maxWidth:l,rotation:c,textAlign:Gl(n.align),textBaseline:"middle",translation:[r,a]})}}function eA(e,t){const n=new ic({ctx:e.ctx,options:t,chart:e});Fe.configure(e,n,t),Fe.addBox(e,n),e.titleBlock=n}var tA={id:"title",_element:ic,start(e,t,n){eA(e,n)},stop(e){const t=e.titleBlock;Fe.removeBox(e,t),delete e.titleBlock},beforeUpdate(e,t,n){const i=e.titleBlock;Fe.configure(e,i,n),i.options=n},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const eo=new WeakMap;var nA={id:"subtitle",start(e,t,n){const i=new ic({ctx:e.ctx,options:n,chart:e});Fe.configure(e,i,n),Fe.addBox(e,i),eo.set(e,i)},stop(e){Fe.removeBox(e,eo.get(e)),eo.delete(e)},beforeUpdate(e,t,n){const i=eo.get(e);Fe.configure(e,i,n),i.options=n},defaults:{align:"center",display:!1,font:{weight:"normal"},fullSize:!0,padding:0,position:"top",text:"",weight:1500},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const Ii={average(e){if(!e.length)return!1;let t,n,i=new Set,s=0,o=0;for(t=0,n=e.length;t<n;++t){const a=e[t].element;if(a&&a.hasValue()){const l=a.tooltipPosition();i.add(l.x),s+=l.y,++o}}return o===0||i.size===0?!1:{x:[...i].reduce((a,l)=>a+l)/i.size,y:s/o}},nearest(e,t){if(!e.length)return!1;let n=t.x,i=t.y,s=Number.POSITIVE_INFINITY,o,r,a;for(o=0,r=e.length;o<r;++o){const l=e[o].element;if(l&&l.hasValue()){const c=l.getCenterPoint(),d=Na(t,c);d<s&&(s=d,a=l)}}if(a){const l=a.tooltipPosition();n=l.x,i=l.y}return{x:n,y:i}}};function mt(e,t){return t&&(me(t)?Array.prototype.push.apply(e,t):e.push(t)),e}function Et(e){return(typeof e=="string"||e instanceof String)&&e.indexOf(`
`)>-1?e.split(`
`):e}function iA(e,t){const{element:n,datasetIndex:i,index:s}=t,o=e.getDatasetMeta(i).controller,{label:r,value:a}=o.getLabelAndValue(s);return{chart:e,label:r,parsed:o.getParsed(s),raw:e.data.datasets[i].data[s],formattedValue:a,dataset:o.getDataset(),dataIndex:s,datasetIndex:i,element:n}}function th(e,t){const n=e.chart.ctx,{body:i,footer:s,title:o}=e,{boxWidth:r,boxHeight:a}=t,l=Ae(t.bodyFont),c=Ae(t.titleFont),d=Ae(t.footerFont),u=o.length,h=s.length,f=i.length,m=Be(t.padding);let b=m.height,v=0,k=i.reduce((S,C)=>S+C.before.length+C.lines.length+C.after.length,0);if(k+=e.beforeBody.length+e.afterBody.length,u&&(b+=u*c.lineHeight+(u-1)*t.titleSpacing+t.titleMarginBottom),k){const S=t.displayColors?Math.max(a,l.lineHeight):l.lineHeight;b+=f*S+(k-f)*l.lineHeight+(k-1)*t.bodySpacing}h&&(b+=t.footerMarginTop+h*d.lineHeight+(h-1)*t.footerSpacing);let T=0;const M=function(S){v=Math.max(v,n.measureText(S).width+T)};return n.save(),n.font=c.string,re(e.title,M),n.font=l.string,re(e.beforeBody.concat(e.afterBody),M),T=t.displayColors?r+2+t.boxPadding:0,re(i,S=>{re(S.before,M),re(S.lines,M),re(S.after,M)}),T=0,n.font=d.string,re(e.footer,M),n.restore(),v+=m.width,{width:v,height:b}}function sA(e,t){const{y:n,height:i}=t;return n<i/2?"top":n>e.height-i/2?"bottom":"center"}function oA(e,t,n,i){const{x:s,width:o}=i,r=n.caretSize+n.caretPadding;if(e==="left"&&s+o+r>t.width||e==="right"&&s-o-r<0)return!0}function rA(e,t,n,i){const{x:s,width:o}=n,{width:r,chartArea:{left:a,right:l}}=e;let c="center";return i==="center"?c=s<=(a+l)/2?"left":"right":s<=o/2?c="left":s>=r-o/2&&(c="right"),oA(c,e,t,n)&&(c="center"),c}function nh(e,t,n){const i=n.yAlign||t.yAlign||sA(e,n);return{xAlign:n.xAlign||t.xAlign||rA(e,t,n,i),yAlign:i}}function aA(e,t){let{x:n,width:i}=e;return t==="right"?n-=i:t==="center"&&(n-=i/2),n}function lA(e,t,n){let{y:i,height:s}=e;return t==="top"?i+=n:t==="bottom"?i-=s+n:i-=s/2,i}function ih(e,t,n,i){const{caretSize:s,caretPadding:o,cornerRadius:r}=e,{xAlign:a,yAlign:l}=n,c=s+o,{topLeft:d,topRight:u,bottomLeft:h,bottomRight:f}=kn(r);let m=aA(t,a);const b=lA(t,l,c);return l==="center"?a==="left"?m+=c:a==="right"&&(m-=c):a==="left"?m-=Math.max(d,h)+s:a==="right"&&(m+=Math.max(u,f)+s),{x:Ce(m,0,i.width-t.width),y:Ce(b,0,i.height-t.height)}}function to(e,t,n){const i=Be(n.padding);return t==="center"?e.x+e.width/2:t==="right"?e.x+e.width-i.right:e.x+i.left}function sh(e){return mt([],Et(e))}function cA(e,t,n){return nn(e,{tooltip:t,tooltipItems:n,type:"tooltip"})}function oh(e,t){const n=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return n?e.override(n):e}const ag={beforeTitle:Tt,title(e){if(e.length>0){const t=e[0],n=t.chart.data.labels,i=n?n.length:0;if(this&&this.options&&this.options.mode==="dataset")return t.dataset.label||"";if(t.label)return t.label;if(i>0&&t.dataIndex<i)return n[t.dataIndex]}return""},afterTitle:Tt,beforeBody:Tt,beforeLabel:Tt,label(e){if(this&&this.options&&this.options.mode==="dataset")return e.label+": "+e.formattedValue||e.formattedValue;let t=e.dataset.label||"";t&&(t+=": ");const n=e.formattedValue;return Z(n)||(t+=n),t},labelColor(e){const n=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{borderColor:n.borderColor,backgroundColor:n.backgroundColor,borderWidth:n.borderWidth,borderDash:n.borderDash,borderDashOffset:n.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(e){const n=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{pointStyle:n.pointStyle,rotation:n.rotation}},afterLabel:Tt,afterBody:Tt,beforeFooter:Tt,footer:Tt,afterFooter:Tt};function Ve(e,t,n,i){const s=e[t].call(n,i);return typeof s>"u"?ag[t].call(n,i):s}class Va extends dt{constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const t=this._cachedAnimations;if(t)return t;const n=this.chart,i=this.options.setContext(this.getContext()),s=i.enabled&&n.options.animation&&i.animations,o=new Np(this.chart,s);return s._cacheable&&(this._cachedAnimations=Object.freeze(o)),o}getContext(){return this.$context||(this.$context=cA(this.chart.getContext(),this,this._tooltipItems))}getTitle(t,n){const{callbacks:i}=n,s=Ve(i,"beforeTitle",this,t),o=Ve(i,"title",this,t),r=Ve(i,"afterTitle",this,t);let a=[];return a=mt(a,Et(s)),a=mt(a,Et(o)),a=mt(a,Et(r)),a}getBeforeBody(t,n){return sh(Ve(n.callbacks,"beforeBody",this,t))}getBody(t,n){const{callbacks:i}=n,s=[];return re(t,o=>{const r={before:[],lines:[],after:[]},a=oh(i,o);mt(r.before,Et(Ve(a,"beforeLabel",this,o))),mt(r.lines,Ve(a,"label",this,o)),mt(r.after,Et(Ve(a,"afterLabel",this,o))),s.push(r)}),s}getAfterBody(t,n){return sh(Ve(n.callbacks,"afterBody",this,t))}getFooter(t,n){const{callbacks:i}=n,s=Ve(i,"beforeFooter",this,t),o=Ve(i,"footer",this,t),r=Ve(i,"afterFooter",this,t);let a=[];return a=mt(a,Et(s)),a=mt(a,Et(o)),a=mt(a,Et(r)),a}_createItems(t){const n=this._active,i=this.chart.data,s=[],o=[],r=[];let a=[],l,c;for(l=0,c=n.length;l<c;++l)a.push(iA(this.chart,n[l]));return t.filter&&(a=a.filter((d,u,h)=>t.filter(d,u,h,i))),t.itemSort&&(a=a.sort((d,u)=>t.itemSort(d,u,i))),re(a,d=>{const u=oh(t.callbacks,d);s.push(Ve(u,"labelColor",this,d)),o.push(Ve(u,"labelPointStyle",this,d)),r.push(Ve(u,"labelTextColor",this,d))}),this.labelColors=s,this.labelPointStyles=o,this.labelTextColors=r,this.dataPoints=a,a}update(t,n){const i=this.options.setContext(this.getContext()),s=this._active;let o,r=[];if(!s.length)this.opacity!==0&&(o={opacity:0});else{const a=Ii[i.position].call(this,s,this._eventPosition);r=this._createItems(i),this.title=this.getTitle(r,i),this.beforeBody=this.getBeforeBody(r,i),this.body=this.getBody(r,i),this.afterBody=this.getAfterBody(r,i),this.footer=this.getFooter(r,i);const l=this._size=th(this,i),c=Object.assign({},a,l),d=nh(this.chart,i,c),u=ih(i,c,d,this.chart);this.xAlign=d.xAlign,this.yAlign=d.yAlign,o={opacity:1,x:u.x,y:u.y,width:l.width,height:l.height,caretX:a.x,caretY:a.y}}this._tooltipItems=r,this.$context=void 0,o&&this._resolveAnimations().update(this,o),t&&i.external&&i.external.call(this,{chart:this.chart,tooltip:this,replay:n})}drawCaret(t,n,i,s){const o=this.getCaretPosition(t,i,s);n.lineTo(o.x1,o.y1),n.lineTo(o.x2,o.y2),n.lineTo(o.x3,o.y3)}getCaretPosition(t,n,i){const{xAlign:s,yAlign:o}=this,{caretSize:r,cornerRadius:a}=i,{topLeft:l,topRight:c,bottomLeft:d,bottomRight:u}=kn(a),{x:h,y:f}=t,{width:m,height:b}=n;let v,k,T,M,S,C;return o==="center"?(S=f+b/2,s==="left"?(v=h,k=v-r,M=S+r,C=S-r):(v=h+m,k=v+r,M=S-r,C=S+r),T=v):(s==="left"?k=h+Math.max(l,d)+r:s==="right"?k=h+m-Math.max(c,u)-r:k=this.caretX,o==="top"?(M=f,S=M-r,v=k-r,T=k+r):(M=f+b,S=M+r,v=k+r,T=k-r),C=M),{x1:v,x2:k,x3:T,y1:M,y2:S,y3:C}}drawTitle(t,n,i){const s=this.title,o=s.length;let r,a,l;if(o){const c=Jn(i.rtl,this.x,this.width);for(t.x=to(this,i.titleAlign,i),n.textAlign=c.textAlign(i.titleAlign),n.textBaseline="middle",r=Ae(i.titleFont),a=i.titleSpacing,n.fillStyle=i.titleColor,n.font=r.string,l=0;l<o;++l)n.fillText(s[l],c.x(t.x),t.y+r.lineHeight/2),t.y+=r.lineHeight+a,l+1===o&&(t.y+=i.titleMarginBottom-a)}}_drawColorBox(t,n,i,s,o){const r=this.labelColors[i],a=this.labelPointStyles[i],{boxHeight:l,boxWidth:c}=o,d=Ae(o.bodyFont),u=to(this,"left",o),h=s.x(u),f=l<d.lineHeight?(d.lineHeight-l)/2:0,m=n.y+f;if(o.usePointStyle){const b={radius:Math.min(c,l)/2,pointStyle:a.pointStyle,rotation:a.rotation,borderWidth:1},v=s.leftForLtr(h,c)+c/2,k=m+l/2;t.strokeStyle=o.multiKeyBackground,t.fillStyle=o.multiKeyBackground,za(t,b,v,k),t.strokeStyle=r.borderColor,t.fillStyle=r.backgroundColor,za(t,b,v,k)}else{t.lineWidth=ee(r.borderWidth)?Math.max(...Object.values(r.borderWidth)):r.borderWidth||1,t.strokeStyle=r.borderColor,t.setLineDash(r.borderDash||[]),t.lineDashOffset=r.borderDashOffset||0;const b=s.leftForLtr(h,c),v=s.leftForLtr(s.xPlus(h,1),c-2),k=kn(r.borderRadius);Object.values(k).some(T=>T!==0)?(t.beginPath(),t.fillStyle=o.multiKeyBackground,cs(t,{x:b,y:m,w:c,h:l,radius:k}),t.fill(),t.stroke(),t.fillStyle=r.backgroundColor,t.beginPath(),cs(t,{x:v,y:m+1,w:c-2,h:l-2,radius:k}),t.fill()):(t.fillStyle=o.multiKeyBackground,t.fillRect(b,m,c,l),t.strokeRect(b,m,c,l),t.fillStyle=r.backgroundColor,t.fillRect(v,m+1,c-2,l-2))}t.fillStyle=this.labelTextColors[i]}drawBody(t,n,i){const{body:s}=this,{bodySpacing:o,bodyAlign:r,displayColors:a,boxHeight:l,boxWidth:c,boxPadding:d}=i,u=Ae(i.bodyFont);let h=u.lineHeight,f=0;const m=Jn(i.rtl,this.x,this.width),b=function(P){n.fillText(P,m.x(t.x+f),t.y+h/2),t.y+=h+o},v=m.textAlign(r);let k,T,M,S,C,y,E;for(n.textAlign=r,n.textBaseline="middle",n.font=u.string,t.x=to(this,v,i),n.fillStyle=i.bodyColor,re(this.beforeBody,b),f=a&&v!=="right"?r==="center"?c/2+d:c+2+d:0,S=0,y=s.length;S<y;++S){for(k=s[S],T=this.labelTextColors[S],n.fillStyle=T,re(k.before,b),M=k.lines,a&&M.length&&(this._drawColorBox(n,t,S,m,i),h=Math.max(u.lineHeight,l)),C=0,E=M.length;C<E;++C)b(M[C]),h=u.lineHeight;re(k.after,b)}f=0,h=u.lineHeight,re(this.afterBody,b),t.y-=o}drawFooter(t,n,i){const s=this.footer,o=s.length;let r,a;if(o){const l=Jn(i.rtl,this.x,this.width);for(t.x=to(this,i.footerAlign,i),t.y+=i.footerMarginTop,n.textAlign=l.textAlign(i.footerAlign),n.textBaseline="middle",r=Ae(i.footerFont),n.fillStyle=i.footerColor,n.font=r.string,a=0;a<o;++a)n.fillText(s[a],l.x(t.x),t.y+r.lineHeight/2),t.y+=r.lineHeight+i.footerSpacing}}drawBackground(t,n,i,s){const{xAlign:o,yAlign:r}=this,{x:a,y:l}=t,{width:c,height:d}=i,{topLeft:u,topRight:h,bottomLeft:f,bottomRight:m}=kn(s.cornerRadius);n.fillStyle=s.backgroundColor,n.strokeStyle=s.borderColor,n.lineWidth=s.borderWidth,n.beginPath(),n.moveTo(a+u,l),r==="top"&&this.drawCaret(t,n,i,s),n.lineTo(a+c-h,l),n.quadraticCurveTo(a+c,l,a+c,l+h),r==="center"&&o==="right"&&this.drawCaret(t,n,i,s),n.lineTo(a+c,l+d-m),n.quadraticCurveTo(a+c,l+d,a+c-m,l+d),r==="bottom"&&this.drawCaret(t,n,i,s),n.lineTo(a+f,l+d),n.quadraticCurveTo(a,l+d,a,l+d-f),r==="center"&&o==="left"&&this.drawCaret(t,n,i,s),n.lineTo(a,l+u),n.quadraticCurveTo(a,l,a+u,l),n.closePath(),n.fill(),s.borderWidth>0&&n.stroke()}_updateAnimationTarget(t){const n=this.chart,i=this.$animations,s=i&&i.x,o=i&&i.y;if(s||o){const r=Ii[t.position].call(this,this._active,this._eventPosition);if(!r)return;const a=this._size=th(this,t),l=Object.assign({},r,this._size),c=nh(n,t,l),d=ih(t,l,c,n);(s._to!==d.x||o._to!==d.y)&&(this.xAlign=c.xAlign,this.yAlign=c.yAlign,this.width=a.width,this.height=a.height,this.caretX=r.x,this.caretY=r.y,this._resolveAnimations().update(this,d))}}_willRender(){return!!this.opacity}draw(t){const n=this.options.setContext(this.getContext());let i=this.opacity;if(!i)return;this._updateAnimationTarget(n);const s={width:this.width,height:this.height},o={x:this.x,y:this.y};i=Math.abs(i)<.001?0:i;const r=Be(n.padding),a=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;n.enabled&&a&&(t.save(),t.globalAlpha=i,this.drawBackground(o,t,s,n),Pp(t,n.textDirection),o.y+=r.top,this.drawTitle(o,t,n),this.drawBody(o,t,n),this.drawFooter(o,t,n),Dp(t,n.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,n){const i=this._active,s=t.map(({datasetIndex:a,index:l})=>{const c=this.chart.getDatasetMeta(a);if(!c)throw new Error("Cannot find a dataset at index "+a);return{datasetIndex:a,element:c.data[l],index:l}}),o=!Eo(i,s),r=this._positionChanged(s,n);(o||r)&&(this._active=s,this._eventPosition=n,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,n,i=!0){if(n&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const s=this.options,o=this._active||[],r=this._getActiveElements(t,o,n,i),a=this._positionChanged(r,t),l=n||!Eo(r,o)||a;return l&&(this._active=r,(s.enabled||s.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,n))),l}_getActiveElements(t,n,i,s){const o=this.options;if(t.type==="mouseout")return[];if(!s)return n.filter(a=>this.chart.data.datasets[a.datasetIndex]&&this.chart.getDatasetMeta(a.datasetIndex).controller.getParsed(a.index)!==void 0);const r=this.chart.getElementsAtEventForMode(t,o.mode,o,i);return o.reverse&&r.reverse(),r}_positionChanged(t,n){const{caretX:i,caretY:s,options:o}=this,r=Ii[o.position].call(this,t,n);return r!==!1&&(i!==r.x||s!==r.y)}}D(Va,"positioners",Ii);var lg={id:"tooltip",_element:Va,positioners:Ii,afterInit(e,t,n){n&&(e.tooltip=new Va({chart:e,options:n}))},beforeUpdate(e,t,n){e.tooltip&&e.tooltip.initialize(n)},reset(e,t,n){e.tooltip&&e.tooltip.initialize(n)},afterDraw(e){const t=e.tooltip;if(t&&t._willRender()){const n={tooltip:t};if(e.notifyPlugins("beforeTooltipDraw",{...n,cancelable:!0})===!1)return;t.draw(e.ctx),e.notifyPlugins("afterTooltipDraw",n)}},afterEvent(e,t){if(e.tooltip){const n=t.replay;e.tooltip.handleEvent(t.event,n,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(e,t)=>t.bodyFont.size,boxWidth:(e,t)=>t.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:ag},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:e=>e!=="filter"&&e!=="itemSort"&&e!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]},dA=Object.freeze({__proto__:null,Colors:$$,Decimation:E$,Filler:sg,Legend:rg,SubTitle:nA,Title:tA,Tooltip:lg});const uA=(e,t,n,i)=>(typeof t=="string"?(n=e.push(t)-1,i.unshift({index:n,label:t})):isNaN(t)&&(n=null),n);function hA(e,t,n,i){const s=e.indexOf(t);if(s===-1)return uA(e,t,n,i);const o=e.lastIndexOf(t);return s!==o?n:s}const fA=(e,t)=>e===null?null:Ce(Math.round(e),0,t);function rh(e){const t=this.getLabels();return e>=0&&e<t.length?t[e]:e}class Oo extends Nn{constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){const n=this._addedLabels;if(n.length){const i=this.getLabels();for(const{index:s,label:o}of n)i[s]===o&&i.splice(s,1);this._addedLabels=[]}super.init(t)}parse(t,n){if(Z(t))return null;const i=this.getLabels();return n=isFinite(n)&&i[n]===t?n:hA(i,t,G(n,t),this._addedLabels),fA(n,i.length-1)}determineDataLimits(){const{minDefined:t,maxDefined:n}=this.getUserBounds();let{min:i,max:s}=this.getMinMax(!0);this.options.bounds==="ticks"&&(t||(i=0),n||(s=this.getLabels().length-1)),this.min=i,this.max=s}buildTicks(){const t=this.min,n=this.max,i=this.options.offset,s=[];let o=this.getLabels();o=t===0&&n===o.length-1?o:o.slice(t,n+1),this._valueRange=Math.max(o.length-(i?0:1),1),this._startValue=this.min-(i?.5:0);for(let r=t;r<=n;r++)s.push({value:r});return s}getLabelForValue(t){return rh.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return typeof t!="number"&&(t=this.parse(t)),t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){const n=this.ticks;return t<0||t>n.length-1?null:this.getPixelForValue(n[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}}D(Oo,"id","category"),D(Oo,"defaults",{ticks:{callback:rh}});function pA(e,t){const n=[],{bounds:s,step:o,min:r,max:a,precision:l,count:c,maxTicks:d,maxDigits:u,includeBounds:h}=e,f=o||1,m=d-1,{min:b,max:v}=t,k=!Z(r),T=!Z(a),M=!Z(c),S=(v-b)/(u+1);let C=tu((v-b)/m/f)*f,y,E,P,R;if(C<1e-14&&!k&&!T)return[{value:b},{value:v}];R=Math.ceil(v/C)-Math.floor(b/C),R>m&&(C=tu(R*C/m/f)*f),Z(l)||(y=Math.pow(10,l),C=Math.ceil(C*y)/y),s==="ticks"?(E=Math.floor(b/C)*C,P=Math.ceil(v/C)*C):(E=b,P=v),k&&T&&o&&ck((a-r)/o,C/1e3)?(R=Math.round(Math.min((a-r)/C,d)),C=(a-r)/R,E=r,P=a):M?(E=k?r:E,P=T?a:P,R=c-1,C=(P-E)/R):(R=(P-E)/C,Wi(R,Math.round(R),C/1e3)?R=Math.round(R):R=Math.ceil(R));const O=Math.max(nu(C),nu(E));y=Math.pow(10,Z(l)?O:l),E=Math.round(E*y)/y,P=Math.round(P*y)/y;let L=0;for(k&&(h&&E!==r?(n.push({value:r}),E<r&&L++,Wi(Math.round((E+L*C)*y)/y,r,ah(r,S,e))&&L++):E<r&&L++);L<R;++L){const N=Math.round((E+L*C)*y)/y;if(T&&N>a)break;n.push({value:N})}return T&&h&&P!==a?n.length&&Wi(n[n.length-1].value,a,ah(a,S,e))?n[n.length-1].value=a:n.push({value:a}):(!T||P===a)&&n.push({value:P}),n}function ah(e,t,{horizontal:n,minRotation:i}){const s=lt(i),o=(n?Math.sin(s):Math.cos(s))||.001,r=.75*t*(""+e).length;return Math.min(t/o,r)}class Fo extends Nn{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,n){return Z(t)||(typeof t=="number"||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){const{beginAtZero:t}=this.options,{minDefined:n,maxDefined:i}=this.getUserBounds();let{min:s,max:o}=this;const r=l=>s=n?s:l,a=l=>o=i?o:l;if(t){const l=wt(s),c=wt(o);l<0&&c<0?a(0):l>0&&c>0&&r(0)}if(s===o){let l=o===0?1:Math.abs(o*.05);a(o+l),t||r(s-l)}this.min=s,this.max=o}getTickLimit(){const t=this.options.ticks;let{maxTicksLimit:n,stepSize:i}=t,s;return i?(s=Math.ceil(this.max/i)-Math.floor(this.min/i)+1,s>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${i} would result generating up to ${s} ticks. Limiting to 1000.`),s=1e3)):(s=this.computeTickLimit(),n=n||11),n&&(s=Math.min(n,s)),s}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const t=this.options,n=t.ticks;let i=this.getTickLimit();i=Math.max(2,i);const s={maxTicks:i,bounds:t.bounds,min:t.min,max:t.max,precision:n.precision,step:n.stepSize,count:n.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:n.minRotation||0,includeBounds:n.includeBounds!==!1},o=this._range||this,r=pA(s,o);return t.bounds==="ticks"&&gp(r,this,"value"),t.reverse?(r.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),r}configure(){const t=this.ticks;let n=this.min,i=this.max;if(super.configure(),this.options.offset&&t.length){const s=(i-n)/Math.max(t.length-1,1)/2;n-=s,i+=s}this._startValue=n,this._endValue=i,this._valueRange=i-n}getLabelForValue(t){return ks(t,this.chart.options.locale,this.options.ticks.format)}}class No extends Fo{determineDataLimits(){const{min:t,max:n}=this.getMinMax(!0);this.min=ve(t)?t:0,this.max=ve(n)?n:1,this.handleTickRangeOptions()}computeTickLimit(){const t=this.isHorizontal(),n=t?this.width:this.height,i=lt(this.options.ticks.minRotation),s=(t?Math.sin(i):Math.cos(i))||.001,o=this._resolveTickFontOptions(0);return Math.ceil(n/Math.min(40,o.lineHeight/s))}getPixelForValue(t){return t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}}D(No,"id","linear"),D(No,"defaults",{ticks:{callback:ir.formatters.numeric}});const us=e=>Math.floor(Ht(e)),hn=(e,t)=>Math.pow(10,us(e)+t);function lh(e){return e/Math.pow(10,us(e))===1}function ch(e,t,n){const i=Math.pow(10,n),s=Math.floor(e/i);return Math.ceil(t/i)-s}function gA(e,t){const n=t-e;let i=us(n);for(;ch(e,t,i)>10;)i++;for(;ch(e,t,i)<10;)i--;return Math.min(i,us(e))}function mA(e,{min:t,max:n}){t=Xe(e.min,t);const i=[],s=us(t);let o=gA(t,n),r=o<0?Math.pow(10,Math.abs(o)):1;const a=Math.pow(10,o),l=s>o?Math.pow(10,s):0,c=Math.round((t-l)*r)/r,d=Math.floor((t-l)/a/10)*a*10;let u=Math.floor((c-d)/Math.pow(10,o)),h=Xe(e.min,Math.round((l+d+u*Math.pow(10,o))*r)/r);for(;h<n;)i.push({value:h,major:lh(h),significand:u}),u>=10?u=u<15?15:20:u++,u>=20&&(o++,u=2,r=o>=0?1:r),h=Math.round((l+d+u*Math.pow(10,o))*r)/r;const f=Xe(e.max,h);return i.push({value:f,major:lh(f),significand:u}),i}class Ga extends Nn{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(t,n){const i=Fo.prototype.parse.apply(this,[t,n]);if(i===0){this._zero=!0;return}return ve(i)&&i>0?i:null}determineDataLimits(){const{min:t,max:n}=this.getMinMax(!0);this.min=ve(t)?Math.max(0,t):null,this.max=ve(n)?Math.max(0,n):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!ve(this._userMin)&&(this.min=t===hn(this.min,0)?hn(this.min,-1):hn(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){const{minDefined:t,maxDefined:n}=this.getUserBounds();let i=this.min,s=this.max;const o=a=>i=t?i:a,r=a=>s=n?s:a;i===s&&(i<=0?(o(1),r(10)):(o(hn(i,-1)),r(hn(s,1)))),i<=0&&o(hn(s,-1)),s<=0&&r(hn(i,1)),this.min=i,this.max=s}buildTicks(){const t=this.options,n={min:this._userMin,max:this._userMax},i=mA(n,this);return t.bounds==="ticks"&&gp(i,this,"value"),t.reverse?(i.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),i}getLabelForValue(t){return t===void 0?"0":ks(t,this.chart.options.locale,this.options.ticks.format)}configure(){const t=this.min;super.configure(),this._startValue=Ht(t),this._valueRange=Ht(this.max)-Ht(t)}getPixelForValue(t){return(t===void 0||t===0)&&(t=this.min),t===null||isNaN(t)?NaN:this.getPixelForDecimal(t===this.min?0:(Ht(t)-this._startValue)/this._valueRange)}getValueForPixel(t){const n=this.getDecimalForPixel(t);return Math.pow(10,this._startValue+n*this._valueRange)}}D(Ga,"id","logarithmic"),D(Ga,"defaults",{ticks:{callback:ir.formatters.logarithmic,major:{enabled:!0}}});function Qa(e){const t=e.ticks;if(t.display&&e.display){const n=Be(t.backdropPadding);return G(t.font&&t.font.size,be.font.size)+n.height}return 0}function bA(e,t,n){return n=me(n)?n:[n],{w:Ak(e,t.string,n),h:n.length*t.lineHeight}}function dh(e,t,n,i,s){return e===i||e===s?{start:t-n/2,end:t+n/2}:e<i||e>s?{start:t-n,end:t}:{start:t,end:t+n}}function yA(e){const t={l:e.left+e._padding.left,r:e.right-e._padding.right,t:e.top+e._padding.top,b:e.bottom-e._padding.bottom},n=Object.assign({},t),i=[],s=[],o=e._pointLabels.length,r=e.options.pointLabels,a=r.centerPointLabels?ne/o:0;for(let l=0;l<o;l++){const c=r.setContext(e.getPointLabelContext(l));s[l]=c.padding;const d=e.getPointPosition(l,e.drawingArea+s[l],a),u=Ae(c.font),h=bA(e.ctx,u,e._pointLabels[l]);i[l]=h;const f=Oe(e.getIndexAngle(l)+a),m=Math.round(Wl(f)),b=dh(m,d.x,h.w,0,180),v=dh(m,d.y,h.h,90,270);vA(n,t,f,b,v)}e.setCenterPoint(t.l-n.l,n.r-t.r,t.t-n.t,n.b-t.b),e._pointLabelItems=_A(e,i,s)}function vA(e,t,n,i,s){const o=Math.abs(Math.sin(n)),r=Math.abs(Math.cos(n));let a=0,l=0;i.start<t.l?(a=(t.l-i.start)/o,e.l=Math.min(e.l,t.l-a)):i.end>t.r&&(a=(i.end-t.r)/o,e.r=Math.max(e.r,t.r+a)),s.start<t.t?(l=(t.t-s.start)/r,e.t=Math.min(e.t,t.t-l)):s.end>t.b&&(l=(s.end-t.b)/r,e.b=Math.max(e.b,t.b+l))}function xA(e,t,n){const i=e.drawingArea,{extra:s,additionalAngle:o,padding:r,size:a}=n,l=e.getPointPosition(t,i+s+r,o),c=Math.round(Wl(Oe(l.angle+xe))),d=$A(l.y,a.h,c),u=kA(c),h=SA(l.x,a.w,u);return{visible:!0,x:l.x,y:d,textAlign:u,left:h,top:d,right:h+a.w,bottom:d+a.h}}function wA(e,t){if(!t)return!0;const{left:n,top:i,right:s,bottom:o}=e;return!(Dt({x:n,y:i},t)||Dt({x:n,y:o},t)||Dt({x:s,y:i},t)||Dt({x:s,y:o},t))}function _A(e,t,n){const i=[],s=e._pointLabels.length,o=e.options,{centerPointLabels:r,display:a}=o.pointLabels,l={extra:Qa(o)/2,additionalAngle:r?ne/s:0};let c;for(let d=0;d<s;d++){l.padding=n[d],l.size=t[d];const u=xA(e,d,l);i.push(u),a==="auto"&&(u.visible=wA(u,c),u.visible&&(c=u))}return i}function kA(e){return e===0||e===180?"center":e<180?"left":"right"}function SA(e,t,n){return n==="right"?e-=t:n==="center"&&(e-=t/2),e}function $A(e,t,n){return n===90||n===270?e-=t/2:(n>270||n<90)&&(e-=t),e}function AA(e,t,n){const{left:i,top:s,right:o,bottom:r}=n,{backdropColor:a}=t;if(!Z(a)){const l=kn(t.borderRadius),c=Be(t.backdropPadding);e.fillStyle=a;const d=i-c.left,u=s-c.top,h=o-i+c.width,f=r-s+c.height;Object.values(l).some(m=>m!==0)?(e.beginPath(),cs(e,{x:d,y:u,w:h,h:f,radius:l}),e.fill()):e.fillRect(d,u,h,f)}}function TA(e,t){const{ctx:n,options:{pointLabels:i}}=e;for(let s=t-1;s>=0;s--){const o=e._pointLabelItems[s];if(!o.visible)continue;const r=i.setContext(e.getPointLabelContext(s));AA(n,r,o);const a=Ae(r.font),{x:l,y:c,textAlign:d}=o;Ln(n,e._pointLabels[s],l,c+a.lineHeight/2,a,{color:r.color,textAlign:d,textBaseline:"middle"})}}function cg(e,t,n,i){const{ctx:s}=e;if(n)s.arc(e.xCenter,e.yCenter,t,0,he);else{let o=e.getPointPosition(0,t);s.moveTo(o.x,o.y);for(let r=1;r<i;r++)o=e.getPointPosition(r,t),s.lineTo(o.x,o.y)}}function CA(e,t,n,i,s){const o=e.ctx,r=t.circular,{color:a,lineWidth:l}=t;!r&&!i||!a||!l||n<0||(o.save(),o.strokeStyle=a,o.lineWidth=l,o.setLineDash(s.dash||[]),o.lineDashOffset=s.dashOffset,o.beginPath(),cg(e,n,r,i),o.closePath(),o.stroke(),o.restore())}function EA(e,t,n){return nn(e,{label:n,index:t,type:"pointLabel"})}class Oi extends Fo{constructor(t){super(t),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){const t=this._padding=Be(Qa(this.options)/2),n=this.width=this.maxWidth-t.width,i=this.height=this.maxHeight-t.height;this.xCenter=Math.floor(this.left+n/2+t.left),this.yCenter=Math.floor(this.top+i/2+t.top),this.drawingArea=Math.floor(Math.min(n,i)/2)}determineDataLimits(){const{min:t,max:n}=this.getMinMax(!1);this.min=ve(t)&&!isNaN(t)?t:0,this.max=ve(n)&&!isNaN(n)?n:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/Qa(this.options))}generateTickLabels(t){Fo.prototype.generateTickLabels.call(this,t),this._pointLabels=this.getLabels().map((n,i)=>{const s=ue(this.options.pointLabels.callback,[n,i],this);return s||s===0?s:""}).filter((n,i)=>this.chart.getDataVisibility(i))}fit(){const t=this.options;t.display&&t.pointLabels.display?yA(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(t,n,i,s){this.xCenter+=Math.floor((t-n)/2),this.yCenter+=Math.floor((i-s)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(t,n,i,s))}getIndexAngle(t){const n=he/(this._pointLabels.length||1),i=this.options.startAngle||0;return Oe(t*n+lt(i))}getDistanceFromCenterForValue(t){if(Z(t))return NaN;const n=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*n:(t-this.min)*n}getValueForDistanceFromCenter(t){if(Z(t))return NaN;const n=t/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-n:this.min+n}getPointLabelContext(t){const n=this._pointLabels||[];if(t>=0&&t<n.length){const i=n[t];return EA(this.getContext(),t,i)}}getPointPosition(t,n,i=0){const s=this.getIndexAngle(t)-xe+i;return{x:Math.cos(s)*n+this.xCenter,y:Math.sin(s)*n+this.yCenter,angle:s}}getPointPositionForValue(t,n){return this.getPointPosition(t,this.getDistanceFromCenterForValue(n))}getBasePosition(t){return this.getPointPositionForValue(t||0,this.getBaseValue())}getPointLabelPosition(t){const{left:n,top:i,right:s,bottom:o}=this._pointLabelItems[t];return{left:n,top:i,right:s,bottom:o}}drawBackground(){const{backgroundColor:t,grid:{circular:n}}=this.options;if(t){const i=this.ctx;i.save(),i.beginPath(),cg(this,this.getDistanceFromCenterForValue(this._endValue),n,this._pointLabels.length),i.closePath(),i.fillStyle=t,i.fill(),i.restore()}}drawGrid(){const t=this.ctx,n=this.options,{angleLines:i,grid:s,border:o}=n,r=this._pointLabels.length;let a,l,c;if(n.pointLabels.display&&TA(this,r),s.display&&this.ticks.forEach((d,u)=>{if(u!==0||u===0&&this.min<0){l=this.getDistanceFromCenterForValue(d.value);const h=this.getContext(u),f=s.setContext(h),m=o.setContext(h);CA(this,f,l,r,m)}}),i.display){for(t.save(),a=r-1;a>=0;a--){const d=i.setContext(this.getPointLabelContext(a)),{color:u,lineWidth:h}=d;!h||!u||(t.lineWidth=h,t.strokeStyle=u,t.setLineDash(d.borderDash),t.lineDashOffset=d.borderDashOffset,l=this.getDistanceFromCenterForValue(n.reverse?this.min:this.max),c=this.getPointPosition(a,l),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(c.x,c.y),t.stroke())}t.restore()}}drawBorder(){}drawLabels(){const t=this.ctx,n=this.options,i=n.ticks;if(!i.display)return;const s=this.getIndexAngle(0);let o,r;t.save(),t.translate(this.xCenter,this.yCenter),t.rotate(s),t.textAlign="center",t.textBaseline="middle",this.ticks.forEach((a,l)=>{if(l===0&&this.min>=0&&!n.reverse)return;const c=i.setContext(this.getContext(l)),d=Ae(c.font);if(o=this.getDistanceFromCenterForValue(this.ticks[l].value),c.showLabelBackdrop){t.font=d.string,r=t.measureText(a.label).width,t.fillStyle=c.backdropColor;const u=Be(c.backdropPadding);t.fillRect(-r/2-u.left,-o-d.size/2-u.top,r+u.width,d.size+u.height)}Ln(t,a.label,0,-o,d,{color:c.color,strokeColor:c.textStrokeColor,strokeWidth:c.textStrokeWidth})}),t.restore()}drawTitle(){}}D(Oi,"id","radialLinear"),D(Oi,"defaults",{display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:ir.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback(t){return t},padding:5,centerPointLabels:!1}}),D(Oi,"defaultRoutes",{"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"}),D(Oi,"descriptors",{angleLines:{_fallback:"grid"}});const cr={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},Ge=Object.keys(cr);function uh(e,t){return e-t}function hh(e,t){if(Z(t))return null;const n=e._adapter,{parser:i,round:s,isoWeekday:o}=e._parseOpts;let r=t;return typeof i=="function"&&(r=i(r)),ve(r)||(r=typeof i=="string"?n.parse(r,i):n.parse(r)),r===null?null:(s&&(r=s==="week"&&(li(o)||o===!0)?n.startOf(r,"isoWeek",o):n.startOf(r,s)),+r)}function fh(e,t,n,i){const s=Ge.length;for(let o=Ge.indexOf(e);o<s-1;++o){const r=cr[Ge[o]],a=r.steps?r.steps:Number.MAX_SAFE_INTEGER;if(r.common&&Math.ceil((n-t)/(a*r.size))<=i)return Ge[o]}return Ge[s-1]}function RA(e,t,n,i,s){for(let o=Ge.length-1;o>=Ge.indexOf(n);o--){const r=Ge[o];if(cr[r].common&&e._adapter.diff(s,i,r)>=t-1)return r}return Ge[n?Ge.indexOf(n):0]}function MA(e){for(let t=Ge.indexOf(e)+1,n=Ge.length;t<n;++t)if(cr[Ge[t]].common)return Ge[t]}function ph(e,t,n){if(!n)e[t]=!0;else if(n.length){const{lo:i,hi:s}=Vl(n,t),o=n[i]>=t?n[i]:n[s];e[o]=!0}}function PA(e,t,n,i){const s=e._adapter,o=+s.startOf(t[0].value,i),r=t[t.length-1].value;let a,l;for(a=o;a<=r;a=+s.add(a,1,i))l=n[a],l>=0&&(t[l].major=!0);return t}function gh(e,t,n){const i=[],s={},o=t.length;let r,a;for(r=0;r<o;++r)a=t[r],s[a]=r,i.push({value:a,major:!1});return o===0||!n?i:PA(e,i,s,n)}class hs extends Nn{constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,n={}){const i=t.time||(t.time={}),s=this._adapter=new q2._date(t.adapters.date);s.init(n),Ki(i.displayFormats,s.formats()),this._parseOpts={parser:i.parser,round:i.round,isoWeekday:i.isoWeekday},super.init(t),this._normalized=n.normalized}parse(t,n){return t===void 0?null:hh(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const t=this.options,n=this._adapter,i=t.time.unit||"day";let{min:s,max:o,minDefined:r,maxDefined:a}=this.getUserBounds();function l(c){!r&&!isNaN(c.min)&&(s=Math.min(s,c.min)),!a&&!isNaN(c.max)&&(o=Math.max(o,c.max))}(!r||!a)&&(l(this._getLabelBounds()),(t.bounds!=="ticks"||t.ticks.source!=="labels")&&l(this.getMinMax(!1))),s=ve(s)&&!isNaN(s)?s:+n.startOf(Date.now(),i),o=ve(o)&&!isNaN(o)?o:+n.endOf(Date.now(),i)+1,this.min=Math.min(s,o-1),this.max=Math.max(s+1,o)}_getLabelBounds(){const t=this.getLabelTimestamps();let n=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY;return t.length&&(n=t[0],i=t[t.length-1]),{min:n,max:i}}buildTicks(){const t=this.options,n=t.time,i=t.ticks,s=i.source==="labels"?this.getLabelTimestamps():this._generate();t.bounds==="ticks"&&s.length&&(this.min=this._userMin||s[0],this.max=this._userMax||s[s.length-1]);const o=this.min,r=this.max,a=fk(s,o,r);return this._unit=n.unit||(i.autoSkip?fh(n.minUnit,this.min,this.max,this._getLabelCapacity(o)):RA(this,a.length,n.minUnit,this.min,this.max)),this._majorUnit=!i.major.enabled||this._unit==="year"?void 0:MA(this._unit),this.initOffsets(s),t.reverse&&a.reverse(),gh(this,a,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(t=>+t.value))}initOffsets(t=[]){let n=0,i=0,s,o;this.options.offset&&t.length&&(s=this.getDecimalForValue(t[0]),t.length===1?n=1-s:n=(this.getDecimalForValue(t[1])-s)/2,o=this.getDecimalForValue(t[t.length-1]),t.length===1?i=o:i=(o-this.getDecimalForValue(t[t.length-2]))/2);const r=t.length<3?.5:.25;n=Ce(n,0,r),i=Ce(i,0,r),this._offsets={start:n,end:i,factor:1/(n+1+i)}}_generate(){const t=this._adapter,n=this.min,i=this.max,s=this.options,o=s.time,r=o.unit||fh(o.minUnit,n,i,this._getLabelCapacity(n)),a=G(s.ticks.stepSize,1),l=r==="week"?o.isoWeekday:!1,c=li(l)||l===!0,d={};let u=n,h,f;if(c&&(u=+t.startOf(u,"isoWeek",l)),u=+t.startOf(u,c?"day":r),t.diff(i,n,r)>1e5*a)throw new Error(n+" and "+i+" are too far apart with stepSize of "+a+" "+r);const m=s.ticks.source==="data"&&this.getDataTimestamps();for(h=u,f=0;h<i;h=+t.add(h,a,r),f++)ph(d,h,m);return(h===i||s.bounds==="ticks"||f===1)&&ph(d,h,m),Object.keys(d).sort(uh).map(b=>+b)}getLabelForValue(t){const n=this._adapter,i=this.options.time;return i.tooltipFormat?n.format(t,i.tooltipFormat):n.format(t,i.displayFormats.datetime)}format(t,n){const s=this.options.time.displayFormats,o=this._unit,r=n||s[o];return this._adapter.format(t,r)}_tickFormatFunction(t,n,i,s){const o=this.options,r=o.ticks.callback;if(r)return ue(r,[t,n,i],this);const a=o.time.displayFormats,l=this._unit,c=this._majorUnit,d=l&&a[l],u=c&&a[c],h=i[n],f=c&&u&&h&&h.major;return this._adapter.format(t,s||(f?u:d))}generateTickLabels(t){let n,i,s;for(n=0,i=t.length;n<i;++n)s=t[n],s.label=this._tickFormatFunction(s.value,n,t)}getDecimalForValue(t){return t===null?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){const n=this._offsets,i=this.getDecimalForValue(t);return this.getPixelForDecimal((n.start+i)*n.factor)}getValueForPixel(t){const n=this._offsets,i=this.getDecimalForPixel(t)/n.factor-n.end;return this.min+i*(this.max-this.min)}_getLabelSize(t){const n=this.options.ticks,i=this.ctx.measureText(t).width,s=lt(this.isHorizontal()?n.maxRotation:n.minRotation),o=Math.cos(s),r=Math.sin(s),a=this._resolveTickFontOptions(0).size;return{w:i*o+a*r,h:i*r+a*o}}_getLabelCapacity(t){const n=this.options.time,i=n.displayFormats,s=i[n.unit]||i.millisecond,o=this._tickFormatFunction(t,0,gh(this,[t],this._majorUnit),s),r=this._getLabelSize(o),a=Math.floor(this.isHorizontal()?this.width/r.w:this.height/r.h)-1;return a>0?a:1}getDataTimestamps(){let t=this._cache.data||[],n,i;if(t.length)return t;const s=this.getMatchingVisibleMetas();if(this._normalized&&s.length)return this._cache.data=s[0].controller.getAllParsedValues(this);for(n=0,i=s.length;n<i;++n)t=t.concat(s[n].controller.getAllParsedValues(this));return this._cache.data=this.normalize(t)}getLabelTimestamps(){const t=this._cache.labels||[];let n,i;if(t.length)return t;const s=this.getLabels();for(n=0,i=s.length;n<i;++n)t.push(hh(this,s[n]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return yp(t.sort(uh))}}D(hs,"id","time"),D(hs,"defaults",{bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}});function no(e,t,n){let i=0,s=e.length-1,o,r,a,l;n?(t>=e[i].pos&&t<=e[s].pos&&({lo:i,hi:s}=Pt(e,"pos",t)),{pos:o,time:a}=e[i],{pos:r,time:l}=e[s]):(t>=e[i].time&&t<=e[s].time&&({lo:i,hi:s}=Pt(e,"time",t)),{time:o,pos:a}=e[i],{time:r,pos:l}=e[s]);const c=r-o;return c?a+(l-a)*(t-o)/c:a}class Ya extends hs{constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const t=this._getTimestampsForTable(),n=this._table=this.buildLookupTable(t);this._minPos=no(n,this.min),this._tableRange=no(n,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){const{min:n,max:i}=this,s=[],o=[];let r,a,l,c,d;for(r=0,a=t.length;r<a;++r)c=t[r],c>=n&&c<=i&&s.push(c);if(s.length<2)return[{time:n,pos:0},{time:i,pos:1}];for(r=0,a=s.length;r<a;++r)d=s[r+1],l=s[r-1],c=s[r],Math.round((d+l)/2)!==c&&o.push({time:c,pos:r/(a-1)});return o}_generate(){const t=this.min,n=this.max;let i=super.getDataTimestamps();return(!i.includes(t)||!i.length)&&i.splice(0,0,t),(!i.includes(n)||i.length===1)&&i.push(n),i.sort((s,o)=>s-o)}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;const n=this.getDataTimestamps(),i=this.getLabelTimestamps();return n.length&&i.length?t=this.normalize(n.concat(i)):t=n.length?n:i,t=this._cache.all=t,t}getDecimalForValue(t){return(no(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){const n=this._offsets,i=this.getDecimalForPixel(t)/n.factor-n.end;return no(this._table,i*this._tableRange+this._minPos,!0)}}D(Ya,"id","timeseries"),D(Ya,"defaults",hs.defaults);var DA=Object.freeze({__proto__:null,CategoryScale:Oo,LinearScale:No,LogarithmicScale:Ga,RadialLinearScale:Oi,TimeScale:hs,TimeSeriesScale:Ya});const LA=[U2,y$,dA,DA];var IA=Object.defineProperty,OA=Object.getOwnPropertyDescriptor,sc=(e,t,n,i)=>{for(var s=i>1?void 0:i?OA(t,n):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(s=(i?r(t,n,s):r(s))||s);return i&&s&&IA(t,n,s),s};Je.register(...LA);let fs=class extends Kt{constructor(){super(...arguments),this.data=[],this.type="daily",this._chart=null}render(){const e=this.type==="customers"?Math.max(220,this.data.length*30):200;return p`
      <div class="chart-wrap" style="height:${e}px;">
        <canvas></canvas>
      </div>
    `}updated(e){(e.has("data")||e.has("type")||!this._chart)&&this._rebuild()}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._chart)==null||e.destroy(),this._chart=null}_rebuild(){var i;(i=this._chart)==null||i.destroy(),this._chart=null;const e=this.renderRoot.querySelector("canvas");if(!e||!this.data.length)return;const t="rgba(99,102,241,0.72)",n="rgba(99,102,241,1)";if(this.type==="daily"){const s=this.data;this._chart=new Je(e,{type:"bar",data:{labels:s.map(o=>o.date),datasets:[{label:"销售额",data:s.map(o=>o.sales_amount),backgroundColor:t,borderColor:n,borderWidth:1,borderRadius:4}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:o=>`Rp ${Number(o.raw).toLocaleString("id-ID",{maximumFractionDigits:0})}`,afterLabel:o=>`订单数: ${s[o.dataIndex].order_count}`}}},scales:{y:{ticks:{callback:o=>`Rp ${Number(o).toLocaleString("id-ID",{maximumFractionDigits:0})}`,maxTicksLimit:5}}}}})}else{const s=[...this.data].reverse();this._chart=new Je(e,{type:"bar",data:{labels:s.map(o=>o.customer_name.length>24?`${o.customer_name.slice(0,24)}...`:o.customer_name),datasets:[{label:"销售额",data:s.map(o=>o.sales_amount),backgroundColor:t,borderColor:n,borderWidth:1,borderRadius:4}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:o=>`Rp ${Number(o.raw).toLocaleString("id-ID",{maximumFractionDigits:0})}`,afterLabel:o=>`订单数: ${s[o.dataIndex].order_count}`}}},scales:{x:{ticks:{callback:o=>`Rp ${Number(o).toLocaleString("id-ID",{maximumFractionDigits:0})}`,maxTicksLimit:5}}}}})}}};fs.styles=Za`
    :host {
      display: block;
    }
    .chart-wrap {
      position: relative;
      width: 100%;
    }
  `;sc([_t({type:Array})],fs.prototype,"data",2);sc([_t({type:String})],fs.prototype,"type",2);fs=sc([Ho("report-chart")],fs);function Fi(e){return`Rp ${e.toLocaleString("id-ID",{maximumFractionDigits:0})}`}function FA(e){return e==="done"?p`<span style="color: var(--color-success, #22c55e); font-size: 11px; font-weight: 600;">✓ 已分析</span>`:e==="running"||e==="pending"?p`<span style="color: #f59e0b; font-size: 11px; font-weight: 600;">⏳ 分析中</span>`:e==="failed"?p`<span style="color: var(--color-danger, #ef4444); font-size: 11px; font-weight: 600;">✗ 失败</span>`:p`<span style="color: var(--text-muted, #888); font-size: 11px;">—</span>`}function NA(e){if(e.reportDetailLoading)return p`<div class="muted" style="padding:24px;">${g("agents.reports.detailLoading")}</div>`;if(!e.reportDetail)return p`<div class="muted" style="padding:24px;">${g("agents.reports.detailEmpty")}</div>`;const t=e.reportDetail.report_json??{},n=t.total_sales_amount??0,i=t.total_order_count??0,s=t.daily_stats??[],o=t.top_customers??[],r=t.status_stats??[];return p`
    <div style="display:flex;flex-direction:column;gap:16px;padding:16px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:10px;padding:14px 16px;">
          <div
            style="font-size:11px;color:var(--text-muted,#888);margin-bottom:4px;text-transform:uppercase;letter-spacing:.05em;"
          >
            ${g("agents.reports.metricTotal")}
          </div>
          <div style="font-size:18px;font-weight:700;color:var(--text-primary);">${Fi(n)}</div>
        </div>
        <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:10px;padding:14px 16px;">
          <div
            style="font-size:11px;color:var(--text-muted,#888);margin-bottom:4px;text-transform:uppercase;letter-spacing:.05em;"
          >
            ${g("agents.reports.metricCount")}
          </div>
          <div style="font-size:18px;font-weight:700;color:var(--text-primary);">${i}</div>
        </div>
      </div>

      ${s.length>0?p`
            <report-chart type="daily" .data=${s}></report-chart>
            <div>
              <div style="font-size:12px;font-weight:600;margin-bottom:8px;color:var(--text-secondary);">
                ${g("agents.reports.tableDaily")}
              </div>
              <table style="width:100%;border-collapse:collapse;font-size:13px;">
                <thead>
                  <tr style="border-bottom:1px solid var(--border);">
                    <th style="text-align:left;padding:6px 8px;color:var(--text-muted);">${g("agents.reports.colDate")}</th>
                    <th style="text-align:right;padding:6px 8px;color:var(--text-muted);">${g("agents.reports.colCount")}</th>
                    <th style="text-align:right;padding:6px 8px;color:var(--text-muted);">${g("agents.reports.colAmount")}</th>
                  </tr>
                </thead>
                <tbody>
                  ${s.map(a=>p`
                      <tr style="border-bottom:1px solid var(--border);">
                        <td style="padding:6px 8px;" class="mono">${a.date}</td>
                        <td style="padding:6px 8px;text-align:right;">${a.order_count}</td>
                        <td style="padding:6px 8px;text-align:right;">${Fi(a.sales_amount)}</td>
                      </tr>
                    `)}
                </tbody>
              </table>
            </div>
          `:$}

      ${o.length>0?p`
            <report-chart type="customers" .data=${o}></report-chart>
            <div>
              <div style="font-size:12px;font-weight:600;margin-bottom:8px;color:var(--text-secondary);">
                ${g("agents.reports.tableCustomers")}
              </div>
              <table style="width:100%;border-collapse:collapse;font-size:13px;">
                <thead>
                  <tr style="border-bottom:1px solid var(--border);">
                    <th style="text-align:left;padding:6px 8px;color:var(--text-muted);">${g("agents.reports.colRank")}</th>
                    <th style="text-align:left;padding:6px 8px;color:var(--text-muted);">${g("agents.reports.colCustomer")}</th>
                    <th style="text-align:right;padding:6px 8px;color:var(--text-muted);">${g("agents.reports.colCount")}</th>
                    <th style="text-align:right;padding:6px 8px;color:var(--text-muted);">${g("agents.reports.colAmount")}</th>
                  </tr>
                </thead>
                <tbody>
                  ${o.map((a,l)=>p`
                      <tr style="border-bottom:1px solid var(--border);">
                        <td style="padding:6px 8px;color:var(--text-muted);">${l+1}</td>
                        <td style="padding:6px 8px;">${a.customer_name}</td>
                        <td style="padding:6px 8px;text-align:right;">${a.order_count}</td>
                        <td style="padding:6px 8px;text-align:right;">${Fi(a.sales_amount)}</td>
                      </tr>
                    `)}
                </tbody>
              </table>
            </div>
          `:$}

      ${r.length>0?p`
            <div>
              <div style="font-size:12px;font-weight:600;margin-bottom:8px;color:var(--text-secondary);">
                ${g("agents.reports.tableStatus")}
              </div>
              <table style="width:100%;border-collapse:collapse;font-size:13px;">
                <thead>
                  <tr style="border-bottom:1px solid var(--border);">
                    <th style="text-align:left;padding:6px 8px;color:var(--text-muted);">${g("agents.reports.colStatus")}</th>
                    <th style="text-align:right;padding:6px 8px;color:var(--text-muted);">${g("agents.reports.colCount")}</th>
                    <th style="text-align:right;padding:6px 8px;color:var(--text-muted);">${g("agents.reports.colAmount")}</th>
                  </tr>
                </thead>
                <tbody>
                  ${r.map(a=>p`
                      <tr style="border-bottom:1px solid var(--border);">
                        <td style="padding:6px 8px;">${a.status_name}</td>
                        <td style="padding:6px 8px;text-align:right;">${a.count}</td>
                        <td style="padding:6px 8px;text-align:right;">${Fi(a.total_amount)}</td>
                      </tr>
                    `)}
                </tbody>
              </table>
            </div>
          `:$}
    </div>
  `}function BA(e){if(e.reportDetailLoading)return p`<div class="muted" style="padding:24px;">${g("agents.reports.detailLoading")}</div>`;if(!e.reportDetail)return p`<div class="muted" style="padding:24px;">${g("agents.reports.detailEmpty")}</div>`;const t=e.reportDetail.analysis_status,n=e.reportDetail.analysis_md;return t==="running"?p`
      <div style="padding:24px;display:flex;flex-direction:column;align-items:center;gap:12px;">
        <div style="font-size:24px;">⏳</div>
        <div style="color:var(--text-muted);">${g("agents.reports.analysisLoading")}</div>
      </div>
    `:t==="pending"?p`
      <div style="padding:24px;display:flex;flex-direction:column;align-items:center;gap:12px;">
        <div style="font-size:24px;">🕐</div>
        <div style="color:var(--text-muted);">${g("agents.reports.analysisPending")}</div>
      </div>
    `:t==="failed"?p`
      <div style="padding:24px;display:flex;flex-direction:column;align-items:center;gap:12px;">
        <div style="color:var(--color-danger,#ef4444);">${g("agents.reports.analysisFailed")}</div>
        <button class="btn btn--sm" @click=${()=>e.onReanalyze(e.reportDetail.id)}>${g("agents.reports.reanalyzeBtn")}</button>
      </div>
    `:n?p`
    <div style="padding:16px;">
      <div class="markdown-body" style="font-size:13px;line-height:1.65;">${oi(ri(n))}</div>
    </div>
  `:p`<div class="muted" style="padding:24px;">${g("agents.reports.analysisEmpty")}</div>`}function zA(e){return e.reportsTasks.length===0?$:p`
    <details style="margin-top:8px;">
      <summary style="cursor:pointer;font-size:12px;color:var(--text-muted);padding:8px 0;">任务配置</summary>
      <div style="padding:8px 0;display:flex;flex-direction:column;gap:10px;">
        ${e.reportsTasks.map(t=>{const n=e.reportsEditingTaskId===t.task_key;return p`
            <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:8px;padding:12px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:${n?"10px":"0"};">
                <span style="font-size:13px;font-weight:600;">${t.title}</span>
                ${n?$:p`<button class="btn btn--sm" @click=${()=>e.onEditTask(t)}>编辑</button>`}
              </div>
              ${n?p`
                    <div style="display:flex;flex-direction:column;gap:8px;">
                      <label class="field">
                        <span style="font-size:12px;">${g("agents.reports.cron")}</span>
                        <input
                          .value=${e.reportsEditForm.cron_expr??t.cron_expr}
                          @input=${i=>e.onEditFormChange({...e.reportsEditForm,cron_expr:i.target.value})}
                        />
                      </label>
                      <label class="field">
                        <span style="font-size:12px;">${g("agents.reports.timezone")}</span>
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
                        <span style="font-size:12px;">${g("agents.reports.enabled")}</span>
                      </div>
                      <div style="display:flex;gap:8px;margin-top:4px;">
                        <button class="btn btn--sm primary" @click=${()=>e.onSaveEdit(t.task_key)}>保存</button>
                        <button class="btn btn--sm" @click=${e.onCancelEdit}>取消</button>
                      </div>
                    </div>
                  `:p`
                    <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">
                      ${t.cron_expr} · ${t.timezone} · ${t.enabled?"启用":"禁用"}
                    </div>
                  `}
            </div>
          `})}
      </div>
    </details>
  `}function HA(e){return p`
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
          ${e.reportsTasks.map(t=>p`
              <button class="btn btn--sm primary" ?disabled=${e.reportsLoading} @click=${()=>e.onRun(t.task_key)}>
                立即运行
              </button>
            `)}
          <button class="btn btn--sm" ?disabled=${e.reportsLoading} @click=${e.onRefresh}>
            ${e.reportsLoading?g("common.loading"):g("common.refresh")}
          </button>
        </div>
      </div>

      ${e.reportsError?p`<div class="callout danger" style="margin:8px 12px;">${e.reportsError}</div>`:$}

      <div style="display:grid;grid-template-columns:260px 1fr;min-height:540px;">
        <div style="border-right:1px solid var(--border);display:flex;flex-direction:column;overflow:hidden;">
          <div
            style="font-size:11px;color:var(--text-muted);padding:10px 12px 6px;text-transform:uppercase;letter-spacing:.06em;border-bottom:1px solid var(--border);"
          >
            历史记录
          </div>
          <div style="overflow-y:auto;flex:1;padding:8px;">
            ${e.reportsRecords.length===0?p`<div class="muted" style="font-size:13px;padding:8px;">${g("agents.reports.noRecords")}</div>`:e.reportsRecords.map(t=>{var a;const n=t.id===e.selectedRecordId,i=t.summary_json??{},s=Number(i.total_order_count??0),o=Number(i.total_sales_amount??0),r=((a=t.started_at)==null?void 0:a.slice(0,10))??"—";return p`
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
                        ${FA(t.analysis_status)}
                      </div>
                      <div style="font-size:12px;color:var(--text-muted);">${s} 张 · ${Fi(o)}</div>
                      ${t.analysis_status==="failed"?p`
                            <button
                              class="btn btn--sm"
                              style="margin-top:6px;font-size:11px;"
                              @click=${l=>{l.stopPropagation(),e.onReanalyze(t.id)}}
                            >
                              ${g("agents.reports.reanalyzeBtn")}
                            </button>
                          `:$}
                    </button>
                  `})}
          </div>

          <div style="padding:8px 12px;border-top:1px solid var(--border);">${zA(e)}</div>
        </div>

        <div style="display:flex;flex-direction:column;overflow:hidden;">
          <div style="display:flex;border-bottom:1px solid var(--border);padding:0 16px;">
            ${["data","analysis"].map(t=>{const n=g(t==="data"?"agents.reports.tabData":"agents.reports.tabAnalysis"),i=e.reportsDetailTab===t;return p`
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
            ${e.reportsDetailTab==="data"?NA(e):BA(e)}
          </div>
        </div>
      </div>
    </section>
  `}var UA=Object.defineProperty,qA=Object.getOwnPropertyDescriptor,Ss=(e,t,n,i)=>{for(var s=i>1?void 0:i?qA(t,n):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(s=(i?r(t,n,s):r(s))||s);return i&&s&&UA(t,n,s),s};Je.register(Qi,Lt,Xi,No,Oo,lg,rg,sg);let In=class extends Kt{constructor(){super(...arguments),this.quotationByTime=[],this.oosByTime=[],this.shortageByTime=[],this.loading=!1,this.quotationChart=null,this.stockChart=null}render(){return p`
      <div class="chart-card">
        <div class="chart-title">${g("overview.dashboard.chart.quotationTrend")}</div>
        ${this.loading?p`<div class="empty">${g("overview.dashboard.chart.loading")}</div>`:this.quotationByTime.length===0?p`<div class="empty">${g("overview.dashboard.chart.empty")}</div>`:p`<div class="chart-wrap"><canvas id="quotation-chart"></canvas></div>`}
      </div>
      <div class="chart-card">
        <div class="chart-title">${g("overview.dashboard.chart.stockTrend")}</div>
        ${this.loading?p`<div class="empty">${g("overview.dashboard.chart.loading")}</div>`:this.oosByTime.length===0&&this.shortageByTime.length===0?p`<div class="empty">${g("overview.dashboard.chart.empty")}</div>`:p`<div class="chart-wrap"><canvas id="stock-chart"></canvas></div>`}
      </div>
    `}updated(){this.renderQuotationChart(),this.renderStockChart()}disconnectedCallback(){var e,t;super.disconnectedCallback(),(e=this.quotationChart)==null||e.destroy(),(t=this.stockChart)==null||t.destroy(),this.quotationChart=null,this.stockChart=null}renderQuotationChart(){var i,s,o;const e=(i=this.shadowRoot)==null?void 0:i.getElementById("quotation-chart");if(!e){(s=this.quotationChart)==null||s.destroy(),this.quotationChart=null;return}(o=this.quotationChart)==null||o.destroy();const t=this.quotationByTime.map(r=>(r.date??"").slice(5)),n=this.quotationByTime.map(r=>Number(r.count??0));this.quotationChart=new Je(e,{type:"line",data:{labels:t,datasets:[{label:g("overview.dashboard.chart.quotationSeries"),data:n,borderColor:"#4f8ef7",backgroundColor:"rgba(79,142,247,0.14)",fill:!0,tension:.35,pointRadius:2}]},options:{responsive:!0,maintainAspectRatio:!1,animation:!1,plugins:{legend:{display:!1}},scales:{x:{ticks:{font:{size:12}}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:12}}}},elements:{line:{borderWidth:3},point:{radius:3}}}})}renderStockChart(){var o,r,a;const e=(o=this.shadowRoot)==null?void 0:o.getElementById("stock-chart");if(!e){(r=this.stockChart)==null||r.destroy(),this.stockChart=null;return}(a=this.stockChart)==null||a.destroy();const t=[...new Set([...this.oosByTime.map(l=>l.date??""),...this.shortageByTime.map(l=>l.date??"")])].filter(Boolean).sort(),n=t.map(l=>l.slice(5)),i=Object.fromEntries(this.oosByTime.map(l=>[l.date??"",Number(l.count??0)])),s=Object.fromEntries(this.shortageByTime.map(l=>[l.date??"",Number(l.count??0)]));this.stockChart=new Je(e,{type:"line",data:{labels:n,datasets:[{label:g("overview.dashboard.chart.oosSeries"),data:t.map(l=>i[l]??0),borderColor:"#e25555",backgroundColor:"rgba(226,85,85,0.12)",fill:!0,tension:.35,pointRadius:2},{label:g("overview.dashboard.chart.shortageSeries"),data:t.map(l=>s[l]??0),borderColor:"#f5a623",backgroundColor:"rgba(245,166,35,0.12)",fill:!0,tension:.35,pointRadius:2}]},options:{responsive:!0,maintainAspectRatio:!1,animation:!1,plugins:{legend:{display:!0,position:"top",labels:{font:{size:12}}}},scales:{x:{ticks:{font:{size:12}}},y:{beginAtZero:!0,ticks:{precision:0,font:{size:12}}}},elements:{line:{borderWidth:3},point:{radius:3}}}})}};In.styles=Za`
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
  `;Ss([_t({attribute:!1})],In.prototype,"quotationByTime",2);Ss([_t({attribute:!1})],In.prototype,"oosByTime",2);Ss([_t({attribute:!1})],In.prototype,"shortageByTime",2);Ss([_t({type:Boolean})],In.prototype,"loading",2);In=Ss([Ho("dashboard-charts")],In);function jA(e){var c,d,u,h,f,m,b,v,k;const t=(c=e.hello)==null?void 0:c.snapshot,n=t!=null&&t.uptimeMs?Pm(t.uptimeMs):g("common.na"),i=(d=t==null?void 0:t.policy)!=null&&d.tickIntervalMs?`${t.policy.tickIntervalMs}ms`:g("common.na"),o=(t==null?void 0:t.authMode)==="trusted-proxy",r=(()=>{if(e.connected||!e.lastError)return null;const T=e.lastError.toLowerCase();if(!(T.includes("unauthorized")||T.includes("connect failed")))return null;const S=!!e.settings.token.trim(),C=!!e.password.trim();return!S&&!C?p`
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
      `:p`
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
    `})(),a=(()=>{if(e.connected||!e.lastError||(typeof window<"u"?window.isSecureContext:!0))return null;const M=e.lastError.toLowerCase();return!M.includes("secure context")&&!M.includes("device identity required")?null:p`
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
    `})(),l=An.getLocale();return p`
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
            ${g("overview.stats.cronNext",{time:P_(e.cronNext)})}
          </div>
        </div>
      </div>
      ${e.lastError?p`<div class="callout danger" style="margin-top: 12px;">
              <div style="font-weight: 600; margin-bottom: 4px;">
                ${g("overview.health.lastErrorLabel")}
              </div>
              <div>${e.lastError}</div>
            </div>`:p`<div class="muted" style="margin-top: 12px;">
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
              @input=${T=>{const M=T.target.value;e.onSettingsChange({...e.settings,gatewayUrl:M})}}
              placeholder="ws://100.x.y.z:18789"
            />
          </label>
          ${o?"":p`
                <label class="field">
                  <span>${g("overview.access.token")}</span>
                  <input
                    .value=${e.settings.token}
                    @input=${T=>{const M=T.target.value;e.onSettingsChange({...e.settings,token:M})}}
                    placeholder="JAGENT_GATEWAY_TOKEN"
                  />
                </label>
                <label class="field">
                  <span>${g("overview.access.password")}</span>
                  <input
                    type="password"
                    .value=${e.password}
                    @input=${T=>{const M=T.target.value;e.onPasswordChange(M)}}
                    placeholder="system or shared password"
                  />
                </label>
              `}
          <label class="field">
            <span>${g("overview.access.sessionKey")}</span>
            <input
              .value=${e.settings.sessionKey}
              @input=${T=>{const M=T.target.value;e.onSessionKeyChange(M)}}
            />
          </label>
          <label class="field">
            <span>${g("overview.access.language")}</span>
            <select
              .value=${l}
          style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 160px;"
              @change=${T=>{const M=T.target.value;An.setLocale(M),e.onSettingsChange({...e.settings,locale:M})}}
            >
              <option value="en">${g("languages.en")}</option>
              <option value="zh-CN">${g("languages.zhCN")}</option>
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
              ${e.lastChannelsRefresh?gs(e.lastChannelsRefresh):g("common.na")}
            </div>
          </div>
        </div>
        ${e.lastError?p`<div class="callout danger" style="margin-top: 14px;">
              <div>${e.lastError}</div>
              ${r??""}
              ${a??""}
            </div>`:p`
                <div class="callout" style="margin-top: 14px">
                  ${g("overview.snapshot.channelsHint")}
                </div>
              `}
      </div>
    </section>

    <section style="margin-top: 18px;">
      <div class="row" style="gap: 12px; flex-wrap: wrap;">
        <div class="card stat-card" style="min-width: 130px;">
          <div class="stat-value">${((u=e.oosStats)==null?void 0:u.out_of_stock_count)??"—"}</div>
          <div class="stat-label">${g("overview.dashboard.kpi.oosProducts")}</div>
        </div>
        <div class="card stat-card" style="min-width: 130px;">
          <div class="stat-value">${((h=e.shortageStats)==null?void 0:h.shortage_product_count)??"—"}</div>
          <div class="stat-label">${g("overview.dashboard.kpi.shortageProducts")}</div>
        </div>
        <div class="card stat-card" style="min-width: 130px;">
          <div class="stat-value">${((f=e.quotationStats)==null?void 0:f.pending_count)??"—"}</div>
          <div class="stat-label">${g("overview.dashboard.kpi.pendingQuotations")}</div>
        </div>
        <div class="card stat-card" style="min-width: 130px;">
          <div class="stat-value">${((m=e.quotationStats)==null?void 0:m.today_count)??"—"}</div>
          <div class="stat-label">${g("overview.dashboard.kpi.todayNewQuotations")}</div>
        </div>
        <div class="card stat-card" style="min-width: 130px;">
          <div class="stat-value">${((b=e.quotationStats)==null?void 0:b.shortage_count)??"—"}</div>
          <div class="stat-label">${g("overview.dashboard.kpi.shortageQuotations")}</div>
        </div>
        <div class="card stat-card" style="min-width: 130px;">
          <div class="stat-value">${((v=e.quotationStats)==null?void 0:v.replenishment_count)??"—"}</div>
          <div class="stat-label">${g("overview.dashboard.kpi.replenishmentDrafts")}</div>
        </div>
      </div>
    </section>

    ${e.dashboardError?p`<section style="margin-top: 12px;">
            <div class="callout danger">${g("overview.dashboard.error",{error:e.dashboardError})}</div>
          </section>`:""}

    <section style="margin-top: 18px;">
      <dashboard-charts
        .quotationByTime=${((k=e.quotationStats)==null?void 0:k.by_time)??[]}
        .oosByTime=${e.oosByTime}
        .shortageByTime=${e.shortageByTime}
        .loading=${e.dashboardLoading}
      ></dashboard-charts>
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
  `}function KA(e){var o;const t=((o=e.report)==null?void 0:o.skills)??[],n=e.filter.trim().toLowerCase(),i=n?t.filter(r=>[r.name,r.description,r.source].join(" ").toLowerCase().includes(n)):t,s=Jx(i);return p`
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

      ${e.error?p`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:$}

      ${i.length===0?p`
              <div class="muted" style="margin-top: 16px">No skills found.</div>
            `:p`
            <div class="agent-skills-groups" style="margin-top: 16px;">
              ${s.map(r=>{const a=r.id==="workspace"||r.id==="built-in";return p`
                  <details class="agent-skills-group" ?open=${!a}>
                    <summary class="agent-skills-header">
                      <span>${r.label}</span>
                      <span class="muted">${r.skills.length}</span>
                    </summary>
                    <div class="list skills-grid">
                      ${r.skills.map(l=>WA(l,e))}
                    </div>
                  </details>
                `})}
            </div>
          `}
    </section>
  `}function WA(e,t){const n=t.busyKey===e.skillKey,i=t.edits[e.skillKey]??"",s=t.messages[e.skillKey]??null,o=e.install.length>0&&e.missing.bins.length>0,r=!!(e.bundled&&e.source!=="openclaw-bundled"),a=Zx(e),l=ew(e);return p`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">
          ${e.emoji?`${e.emoji} `:""}${e.name}
        </div>
        <div class="list-sub">${fa(e.description,140)}</div>
        ${tw({skill:e,showBundledBadge:r})}
        ${a.length>0?p`
              <div class="muted" style="margin-top: 6px;">
                Missing: ${a.join(", ")}
              </div>
            `:$}
        ${l.length>0?p`
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
          ${o?p`<button
                class="btn"
                ?disabled=${n}
                @click=${()=>t.onInstall(e.skillKey,e.name,e.install[0].id)}
              >
                ${n?"Installing…":e.install[0].label}
              </button>`:$}
        </div>
        ${s?p`<div
              class="muted"
              style="margin-top: 8px; color: ${s.kind==="error"?"var(--danger-color, #d14343)":"var(--success-color, #0a7f5a)"};"
            >
              ${s.message}
            </div>`:$}
        ${e.primaryEnv?p`
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
  `}const VA=/^data:/i,GA=/^https?:\/\//i;function QA(e){var a,l;const t=((a=e.agentsList)==null?void 0:a.agents)??[],n=Rh(e.sessionKey),i=(n==null?void 0:n.agentId)??((l=e.agentsList)==null?void 0:l.defaultId)??"main",s=t.find(c=>c.id===i),o=s==null?void 0:s.identity,r=(o==null?void 0:o.avatarUrl)??(o==null?void 0:o.avatar);if(r)return VA.test(r)||GA.test(r)?r:o==null?void 0:o.avatarUrl}function YA(e){var f,m,b,v,k,T,M,S,C;const t=e.presenceEntries.length,n=((f=e.sessionsResult)==null?void 0:f.count)??null,i=((m=e.cronStatus)==null?void 0:m.nextWakeAtMs)??null,s=e.connected?null:g("chat.disconnected"),o=e.tab==="chat",r=o&&(e.settings.chatFocusMode||e.onboarding),a=e.onboarding?!1:e.settings.chatShowThinking,l=QA(e),c=e.chatAvatarUrl??l??null;e.configForm??((b=e.configSnapshot)==null||b.config);const d=ui(e.basePath??""),u=e.agentsSelectedId??((v=e.agentsList)==null?void 0:v.defaultId)??((M=(T=(k=e.agentsList)==null?void 0:k.agents)==null?void 0:T[0])==null?void 0:M.id)??null,h=An.getLocale();return p`
    <div class="shell ${o?"shell--chat":""} ${r?"shell--chat-focus":""} ${e.settings.navCollapsed?"shell--nav-collapsed":""} ${e.onboarding?"shell--onboarding":""}">
      <header class="topbar">
        <div class="topbar-left">
          <button
            class="nav-collapse-toggle"
            @click=${()=>e.applySettings({...e.settings,navCollapsed:!e.settings.navCollapsed})}
            title="${e.settings.navCollapsed?g("nav.expand"):g("nav.collapse")}"
            aria-label="${e.settings.navCollapsed?g("nav.expand"):g("nav.collapse")}"
          >
            <span class="nav-collapse-toggle__icon">${ke.menu}</span>
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
            <span>${g("common.health")}</span>
            <span class="mono">${e.connected?g("common.ok"):g("common.offline")}</span>
          </div>
          ${Gx(e)}
          <label class="topbar-lang">
            <span class="sr-only">${g("overview.access.language")}</span>
            <select
              .value=${h}
              style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 140px;"
              @change=${y=>{const E=y.target.value;An.setLocale(E),e.applySettings({...e.settings,locale:E})}}
            >
              <option value="en">${g("languages.en")}</option>
              <option value="zh-CN">${g("languages.zhCN")}</option>
            </select>
          </label>
        </div>
      </header>
      <aside class="nav ${e.settings.navCollapsed?"nav--collapsed":""}">
        ${yy.map(y=>{const E=e.settings.navGroupsCollapsed[y.label]??!1,P=y.tabs.some(R=>R===e.tab);return p`
            <div class="nav-group ${E&&!P?"nav-group--collapsed":""}">
              <button
                class="nav-label"
                @click=${()=>{const R={...e.settings.navGroupsCollapsed};R[y.label]=!E,e.applySettings({...e.settings,navGroupsCollapsed:R})}}
                aria-expanded=${!E}
              >
                <span class="nav-label__text">${g(`nav.${y.label}`)}</span>
                <span class="nav-label__chevron">${E?"+":"−"}</span>
              </button>
              <div class="nav-group__items">
                ${y.tabs.map(R=>Hx(e,R))}
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
              <span class="nav-item__icon" aria-hidden="true">${ke.book}</span>
              <span class="nav-item__text">${g("common.docs")}</span>
            </a>
          </div>
        </div>
      </aside>
      <main class="content ${o?"content--chat":""}">
        <section class="content-header">
          <div>
            ${e.tab==="work"?$:p`<div class="page-title">${va(e.tab)}</div>`}
            ${e.tab==="work"?$:p`<div class="page-sub">${wy(e.tab)}</div>`}
          </div>
          <div class="page-meta">
            ${e.lastError?p`<div class="pill danger">${e.lastError}</div>`:$}
            ${o?Ux(e):$}
          </div>
        </section>

        ${e.tab==="overview"?jA({connected:e.connected,hello:e.hello,settings:e.settings,password:e.password,lastError:e.lastError,presenceCount:t,sessionsCount:n,cronEnabled:((S=e.cronStatus)==null?void 0:S.enabled)??null,cronNext:i,lastChannelsRefresh:e.channelsLastSuccess,oosStats:e.overviewOosStats,shortageStats:e.overviewShortageStats,quotationStats:e.quotationStats,oosByTime:e.dashboardOosByTime,shortageByTime:e.dashboardShortageByTime,dashboardLoading:e.dashboardLoading,dashboardError:e.dashboardError,onSettingsChange:y=>e.applySettings(y),onPasswordChange:y=>e.password=y,onSessionKeyChange:y=>{e.sessionKey=y,e.chatMessage="",e.resetToolStream(),e.applySettings({...e.settings,sessionKey:y,lastActiveSessionKey:y}),e.loadAssistantIdentity()},onConnect:()=>e.connect(),onRefresh:()=>e.loadOverview()}):$}

        ${e.tab==="channels"?lw({loading:e.bkLoading,saving:e.bkSaving,error:e.bkError,content:e.bkContent,lastSuccessAt:e.bkLastSuccess,dependentFiles:e.bkDependentFiles,onReload:()=>Ih(e),onSave:y=>Mm(e,y),onContentChange:y=>e.bkContent=y}):$}

        ${e.tab==="instances"?p`
                ${Q_({loading:e.oosLoading,error:e.oosError,stats:e.oosStats,list:e.oosList,byFile:e.oosByFile,byTime:e.oosByTime,db:e.oosDb??void 0,onRefresh:()=>Wo(e),onDelete:y=>Bb(e,y),showAddForm:e.oosShowAddForm,onOpenAddForm:()=>e.oosShowAddForm=!0,onCloseAddForm:()=>e.oosShowAddForm=!1,onAdd:async y=>{const E=await zb(e,y);return E&&(e.oosShowAddForm=!1),E}})}
                ${e1({loading:e.shortageLoading,error:e.shortageError,stats:e.shortageStats,list:e.shortageList,byFile:e.shortageByFile,byTime:e.shortageByTime,db:e.shortageDb??void 0,onRefresh:()=>Vo(e),onDelete:y=>Ub(e,y),showAddForm:e.shortageShowAddForm,onOpenAddForm:()=>e.shortageShowAddForm=!0,onCloseAddForm:()=>e.shortageShowAddForm=!1,onAdd:async y=>{const E=await qb(e,y);return E&&(e.shortageShowAddForm=!1),E}})}
              `:$}

        ${e.tab==="sessions"?M_({basePath:e.basePath,loading:e.procurementLoading,error:e.procurementError,suggestions:e.procurementSuggestions,selectedKeys:e.procurementSelectedKeys,approvedKeys:e.procurementApprovedKeys,approveBusy:e.procurementApproveBusy,approveResult:e.procurementApproveResult,filterQuery:e.procurementFilterQuery,sortBy:e.procurementSortBy,sortDir:e.procurementSortDir,page:e.procurementPage,pageSize:e.procurementPageSize,replenishmentDrafts:e.replenishmentDrafts,replenishmentDetail:e.replenishmentDetail,replenishmentDetailId:e.replenishmentDetailId,replenishmentLoading:e.replenishmentLoading,replenishmentError:e.replenishmentError,replenishmentConfirmBusy:e.replenishmentConfirmBusy,replenishmentConfirmResult:e.replenishmentConfirmResult,replenishmentInputLines:e.replenishmentInputLines,replenishmentCreateBusy:e.replenishmentCreateBusy,onReplenishmentLineChange:(y,E,P)=>e.onReplenishmentLineChange(y,E,P),onReplenishmentAddLine:()=>e.onReplenishmentAddLine(),onReplenishmentRemoveLine:y=>e.onReplenishmentRemoveLine(y),onCreateReplenishmentDraft:()=>e.createProcurementReplenishmentDraft(),onReplenishmentRefresh:()=>e.loadProcurementReplenishment(),onSelectReplenishmentDraft:y=>{e.loadProcurementReplenishmentDetail(y)},onConfirmReplenishment:y=>{typeof window<"u"&&!window.confirm(g("replenishment.confirmPrompt"))||e.confirmProcurementReplenishment(y)},onDeleteReplenishmentDraft:y=>{typeof window<"u"&&!window.confirm(g("replenishment.deleteConfirm"))||e.deleteProcurementReplenishmentDraft(y)},onClearReplenishmentDetail:()=>{e.replenishmentDetail=null,e.replenishmentDetailId=null},onRefresh:()=>(e.procurementPage=1,e.loadProcurementSuggestions()),onToggleSelect:y=>{e.procurementSelectedKeys.includes(y)?e.procurementSelectedKeys=e.procurementSelectedKeys.filter(E=>E!==y):e.procurementSelectedKeys=[...e.procurementSelectedKeys,y]},onApprove:y=>{if(typeof window<"u"&&!window.confirm(g("procurement.approveConfirm")))return;const E=[{product_key:y.product_key,product_name:y.product_name,specification:y.specification,shortfall:y.shortfall,code:y.code}];Uc(e,E).then(P=>{P&&(P.approved_count??0)>0&&(e.procurementApprovedKeys=[...e.procurementApprovedKeys,ot(y)])})},onApproveBatch:()=>{const y=e.procurementSuggestions.filter(P=>e.procurementSelectedKeys.includes(ot(P)));if(y.length===0||typeof window<"u"&&!window.confirm(g("procurement.approveBatchConfirm",{count:String(y.length)})))return;const E=y.map(P=>({product_key:P.product_key,product_name:P.product_name,specification:P.specification,shortfall:P.shortfall,code:P.code}));Uc(e,E).then(P=>{if(P&&(P.approved_count??0)>0){const R=y.map(O=>ot(O));e.procurementApprovedKeys=[...e.procurementApprovedKeys,...R],e.procurementSelectedKeys=e.procurementSelectedKeys.filter(O=>!R.includes(O))}})},onFilterQueryChange:y=>{e.procurementFilterQuery=y,e.procurementPage=1},onSortByChange:y=>{e.procurementSortBy=y,e.procurementPage=1},onSortDirChange:y=>{e.procurementSortDir=y,e.procurementPage=1},onPageChange:y=>{e.procurementPage=Math.max(1,y)},onPageSizeChange:y=>{e.procurementPageSize=Math.max(1,y),e.procurementPage=1}}):$}

        ${Dx(e)}

        ${e.tab==="cron"?E_({basePath:e.basePath,loading:e.fulfillDraftsLoading,error:e.fulfillDraftsError,drafts:e.fulfillDrafts,detail:e.fulfillDetail,detailId:e.fulfillDetailId,confirmBusy:e.fulfillConfirmBusy,confirmResult:e.fulfillConfirmResult,filterQuery:e.fulfillFilterQuery,sortBy:e.fulfillSortBy,sortDir:e.fulfillSortDir,page:e.fulfillPage,pageSize:e.fulfillPageSize,onRefresh:()=>(e.fulfillPage=1,e.loadFulfillDrafts()),onSelectDraft:y=>qm(e,y),onConfirm:y=>{var L;const E=e.fulfillDetailId===y?e.fulfillDetail:null,P=((L=E==null?void 0:E.lines)==null?void 0:L.length)??0,R=((E==null?void 0:E.lines)??[]).reduce((N,j)=>N+Number(j.amount??0),0),O=P>0?g("fulfill.confirmPrompt",{count:String(P),amount:R.toFixed(2)}):g("fulfill.confirmPromptSimple");typeof window<"u"&&window.confirm(O)&&jm(e,y).then(N=>{N!=null&&N.order_id&&e.loadProcurementSuggestions()})},onClearDetail:()=>{e.fulfillDetail=null,e.fulfillDetailId=null,e.fulfillConfirmResult=null},onFilterQueryChange:y=>{e.fulfillFilterQuery=y,e.fulfillPage=1},onSortByChange:y=>{e.fulfillSortBy=y,e.fulfillPage=1},onSortDirChange:y=>{e.fulfillSortDir=y,e.fulfillPage=1},onPageChange:y=>{e.fulfillPage=Math.max(1,y)},onPageSizeChange:y=>{e.fulfillPageSize=Math.max(1,y),e.fulfillPage=1}}):$}

        ${e.tab==="agents"?sw({loading:e.agentsLoading,error:e.agentsError,agentsList:e.agentsList,selectedAgentId:u,activePanel:e.agentsPanel,agentInfo:e.agentInfo,agentInfoLoading:e.agentInfoLoading,agentInfoError:e.agentInfoError,agentIdentityLoading:e.agentIdentityLoading,agentIdentityError:e.agentIdentityError,agentIdentityById:e.agentIdentityById,onRefresh:async()=>{var E,P;await cl(e),Lh(e);const y=((P=(E=e.agentsList)==null?void 0:E.agents)==null?void 0:P.map(R=>R.id))??[];y.length>0&&Dh(e,y)},onSelectAgent:y=>{e.agentsSelectedId!==y&&(e.agentsSelectedId=y,Ph(e,y))},onSelectPanel:y=>{e.agentsPanel=y}}):$}

        ${e.tab==="skills"?KA({loading:e.skillsLoading,report:e.skillsReport,error:e.skillsError,filter:e.skillsFilter,edits:e.skillEdits,messages:e.skillMessages,busyKey:e.skillsBusyKey,onFilterChange:y=>e.skillsFilter=y,onRefresh:()=>bs(e,{clearMessages:!0}),onToggle:(y,E)=>Vb(e,y,E),onEdit:(y,E)=>Wb(e,y,E),onSaveKey:y=>Gb(e,y),onInstall:(y,E,P)=>Qb(e,y,E,P)}):$}

        ${e.tab==="nodes"?v1({loading:e.nodesLoading,nodes:e.nodes,devicesLoading:e.devicesLoading,devicesError:e.devicesError,devicesList:e.devicesList,configForm:e.configForm??((C=e.configSnapshot)==null?void 0:C.config),configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,configFormMode:e.configFormMode,execApprovalsLoading:e.execApprovalsLoading,execApprovalsSaving:e.execApprovalsSaving,execApprovalsDirty:e.execApprovalsDirty,execApprovalsSnapshot:e.execApprovalsSnapshot,execApprovalsForm:e.execApprovalsForm,execApprovalsSelectedAgent:e.execApprovalsSelectedAgent,execApprovalsTarget:e.execApprovalsTarget,execApprovalsTargetNodeId:e.execApprovalsTargetNodeId,onRefresh:()=>qo(e),onDevicesRefresh:()=>tn(e),onDeviceApprove:y=>Eb(e,y),onDeviceReject:y=>Rb(e,y),onDeviceRotate:(y,E,P)=>Mb(e,{deviceId:y,role:E,scopes:P}),onDeviceRevoke:(y,E)=>Pb(e,{deviceId:y,role:E}),onLoadConfig:()=>It(e),onLoadExecApprovals:()=>{const y=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return xl(e,y)},onBindDefault:y=>{y?Sr(e,["tools","exec","node"],y):Oc(e,["tools","exec","node"])},onBindAgent:(y,E)=>{const P=["agents","list",y,"tools","exec","node"];E?Sr(e,P,E):Oc(e,P)},onSaveBindings:()=>da(e),onExecApprovalsTargetChange:(y,E)=>{e.execApprovalsTarget=y,e.execApprovalsTargetNodeId=E,e.execApprovalsSnapshot=null,e.execApprovalsForm=null,e.execApprovalsDirty=!1,e.execApprovalsSelectedAgent=null},onExecApprovalsSelectAgent:y=>{e.execApprovalsSelectedAgent=y},onExecApprovalsPatch:(y,E)=>Fb(e,y,E),onExecApprovalsRemove:y=>Nb(e,y),onSaveExecApprovals:()=>{const y=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return Ob(e,y)}}):$}

        ${e.tab==="reports"?HA({reportsLoading:e.reportsLoading,reportsError:e.reportsError,reportsTasks:e.reportsTasks,reportsRecords:e.reportsRecords,reportsAdminToken:e.reportsAdminToken,selectedRecordId:e.selectedRecordId,reportDetailLoading:e.reportDetailLoading,reportDetail:e.reportDetail,reportsDetailTab:e.reportsDetailTab,reportsEditingTaskId:e.reportsEditingTaskId,reportsEditForm:e.reportsEditForm,onTokenChange:y=>{e.reportsAdminToken=y},onRefresh:()=>Qo(e),onRun:y=>{py(e,y)},onSelectRecord:y=>{Yn(),kl(e,y)},onDetailTabChange:y=>{e.reportsDetailTab=y},onReanalyze:y=>{by(e,y)},onEditTask:y=>{e.reportsEditingTaskId=y.task_key,e.reportsEditForm={enabled:y.enabled,cron_expr:y.cron_expr,timezone:y.timezone,title:y.title}},onCancelEdit:()=>{e.reportsEditingTaskId=null,e.reportsEditForm={}},onEditFormChange:y=>{e.reportsEditForm=y},onSaveEdit:y=>{gy(e,y,e.reportsEditForm).then(()=>{e.reportsError||(e.reportsEditingTaskId=null,e.reportsEditForm={})})}}):$}

        ${e.tab==="chat"?a_({sessionKey:e.sessionKey,onSessionKeyChange:y=>{e.sessionKey=y,e.chatMessage="",e.chatAttachments=[],e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.chatQueue=[],e.resetToolStream(),e.resetToolRender(),e.ocrResultCards=[],e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:y,lastActiveSessionKey:y}),e.loadAssistantIdentity(),si(e),_a(e)},thinkingLevel:e.chatThinkingLevel,showThinking:a,loading:e.chatLoading,sending:e.chatSending,compactionStatus:e.compactionStatus,toolRenderData:e.toolRenderData,toolRenderSeq:e.toolRenderSeq,toolRenderItems:e.toolRenderItems,candidatePreviews:e.candidatePreviews,ocrResultCards:e.ocrResultCards,assistantAvatarUrl:c,messages:e.chatMessages,toolMessages:e.chatToolMessages,stream:e.chatStream,streamStartedAt:e.chatStreamStartedAt,draft:e.chatMessage,queue:e.chatQueue,connected:e.connected,canSend:e.connected,disabledReason:s,error:e.lastError,sessions:e.sessionsResult,focusMode:r,onRefresh:()=>(e.resetToolStream(),Promise.all([si(e),_a(e)])),onToggleFocusMode:()=>{e.onboarding||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})},onChatScroll:y=>e.handleChatScroll(y),onDraftChange:y=>e.chatMessage=y,attachments:e.chatAttachments,onAttachmentsChange:y=>e.chatAttachments=y,uploadedFile:e.chatUploadedFile,onFileSelect:y=>e.handleUploadChatFile(y),onClearUploadedFile:()=>e.clearChatUploadedFile(),composeDragOver:e.chatComposeDragOver,onComposeDragOver:()=>e.setChatComposeDragOver(!0),onComposeDragLeave:()=>e.setChatComposeDragOver(!1),onComposeDrop:y=>e.handleComposeDrop(y),onSend:()=>e.handleSendChat(),canAbort:!!e.chatRunId,onAbort:()=>void e.handleAbortChat(),onQueueRemove:y=>e.removeQueuedMessage(y),onNewSession:()=>e.handleSendChat("/new",{restoreDraft:!0}),showNewMessages:e.chatNewMessagesBelow&&!e.chatManualRefreshInFlight,onScrollToBottom:()=>e.scrollToBottom(),sidebarOpen:e.sidebarOpen,sidebarContent:e.sidebarContent,sidebarError:e.sidebarError,splitRatio:e.splitRatio,onOpenSidebar:y=>e.handleOpenSidebar(y),onCloseSidebar:()=>e.handleCloseSidebar(),onSplitRatioChange:y=>e.handleSplitRatioChange(y),assistantName:e.assistantName,assistantAvatar:e.assistantAvatar}):$}

        ${e.tab==="config"?A_({raw:e.configRaw,originalRaw:e.configRawOriginal,valid:e.configValid,issues:e.configIssues,loading:e.configLoading,saving:e.configSaving,applying:e.configApplying,updating:e.updateRunning,connected:e.connected,schema:e.configSchema,schemaLoading:e.configSchemaLoading,uiHints:e.configUiHints,formMode:e.configFormMode,formValue:e.configForm,originalValue:e.configFormOriginal,searchQuery:e.configSearchQuery,activeSection:e.configActiveSection,activeSubsection:e.configActiveSubsection,onRawChange:y=>{e.configRaw=y},onFormModeChange:y=>e.configFormMode=y,onFormPatch:(y,E)=>Sr(e,y,E),onSearchChange:y=>e.configSearchQuery=y,onSectionChange:y=>{e.configActiveSection=y,e.configActiveSubsection=null},onSubsectionChange:y=>e.configActiveSubsection=y,onReload:()=>It(e),onSave:()=>da(e),onApply:()=>nm(e),onUpdate:()=>im(e)}):$}

        ${e.tab==="admin-data"?B_({host:{basePath:e.basePath??"",adminData:e.adminData},onLogin:async y=>{const E=e;await Xb(E,y),e.adminData.token&&(await wn(E),await _n(E))},onLogout:()=>{je(e)},onSubTab:y=>{e.adminData={...e.adminData,activeSubTab:y}},onPriceQueryInput:y=>{e.adminData={...e.adminData,priceQuery:y}},onPriceQueryApply:async()=>{e.adminData={...e.adminData,pricePage:1},await wn(e)},onPriceRefresh:()=>wn(e),onPriceFieldChange:(y,E)=>Jb(e,y,E),onPriceSave:async y=>{const E=e.adminData.priceItems[y];E&&await ey(e,E)},onPriceDelete:async y=>{await ty(e,y)},onPriceUpload:async y=>{await ny(e,y)},onPriceAddRow:()=>Zb(e),onMappingQueryInput:y=>{e.adminData={...e.adminData,mappingQuery:y}},onMappingQueryApply:async()=>{e.adminData={...e.adminData,mappingPage:1},await _n(e)},onMappingRefresh:()=>_n(e),onMappingFieldChange:(y,E)=>iy(e,y,E),onMappingSave:async y=>{const E=e.adminData.mappingItems[y];E&&await oy(e,E)},onMappingDelete:async y=>{await ry(e,y)},onMappingUpload:async y=>{await ay(e,y)},onMappingAddRow:()=>sy(e),onLibraryTab:()=>{e.adminData={...e.adminData,activeSubTab:"library",activeLibraryId:null},_l(e)},onLibraryUpload:(y,E)=>ly(e,y,E),onLibraryView:y=>Hi(e,y),onLibraryBack:()=>{e.adminData={...e.adminData,activeLibraryId:null,libraryData:[]}},onLibraryQueryInput:y=>{e.adminData={...e.adminData,libraryDataQuery:y}},onLibraryQueryApply:y=>Hi(e,y),onLibraryRefresh:y=>Hi(e,y),onLibraryFieldChange:(y,E,P)=>cy(e,y,E,P),onLibrarySave:(y,E)=>{const P=e.adminData.libraryData[E];if(P)return uy(e,y,P)},onLibraryDeleteRow:(y,E)=>hy(e,y,E),onLibraryAddRow:y=>dy(e,y),onLibraryDrop:y=>fy(e,y),onLibraryWarningsDismiss:()=>{e.adminData={...e.adminData,libraryUploadWarnings:[]}}}):$}

        ${e.tab==="debug"?L_({loading:e.debugLoading,status:e.debugStatus,health:e.debugHealth,models:e.debugModels,heartbeat:e.debugHeartbeat,eventLog:e.eventLog,callMethod:e.debugCallMethod,callParams:e.debugCallParams,callResult:e.debugCallResult,callError:e.debugCallError,onCallMethodChange:y=>e.debugCallMethod=y,onCallParamsChange:y=>e.debugCallParams=y,onRefresh:()=>Uo(e),onCall:()=>_m(e)}):$}

        ${e.tab==="logs"?G_({loading:e.logsLoading,error:e.logsError,file:e.logsFile,entries:e.logsEntries,filterText:e.logsFilterText,levelFilters:e.logsLevelFilters,autoFollow:e.logsAutoFollow,truncated:e.logsTruncated,onFilterTextChange:y=>e.logsFilterText=y,onLevelToggle:(y,E)=>{e.logsLevelFilters={...e.logsLevelFilters,[y]:E}},onToggleAutoFollow:y=>e.logsAutoFollow=y,onRefresh:()=>sl(e,{reset:!0}),onExport:(y,E)=>e.exportLogs(y,E),onScroll:y=>e.handleLogsScroll(y)}):$}
      </main>
      ${O_(e)}
      ${F_(e)}
    </div>
  `}var XA=Object.defineProperty,JA=Object.getOwnPropertyDescriptor,w=(e,t,n,i)=>{for(var s=i>1?void 0:i?JA(t,n):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(s=(i?r(t,n,s):r(s))||s);return i&&s&&XA(t,n,s),s};const ca=Al({});function ZA(){if(!window.location.search)return!1;const t=new URLSearchParams(window.location.search).get("onboarding");if(!t)return!1;const n=t.trim().toLowerCase();return n==="1"||n==="true"||n==="yes"||n==="on"}let x=class extends Kt{constructor(){super(),this.i18nController=new Gg(this),this.settings=_y(),this.password="",this.tab="chat",this.onboarding=ZA(),this.connected=!1,this.theme=this.settings.theme??"system",this.themeResolved="dark",this.hello=null,this.lastError=null,this.eventLog=[],this.eventLogBuffer=[],this.toolStreamSyncTimer=null,this.sidebarCloseTimer=null,this.assistantName=ca.name,this.assistantAvatar=ca.avatar,this.assistantAgentId=ca.agentId??null,this.sessionKey=this.settings.sessionKey,this.chatLoading=!1,this.chatSending=!1,this.chatMessage="",this.chatMessages=[],this.chatToolMessages=[],this.chatStream=null,this.chatStreamStartedAt=null,this.chatRunId=null,this.compactionStatus=null,this.chatAvatarUrl=null,this.chatThinkingLevel=null,this.chatQueue=[],this.chatAttachments=[],this.chatUploadedFile=null,this.chatComposeDragOver=!1,this.chatManualRefreshInFlight=!1,this.sidebarOpen=!1,this.sidebarContent=null,this.sidebarError=null,this.splitRatio=this.settings.splitRatio,this.nodesLoading=!1,this.nodes=[],this.devicesLoading=!1,this.devicesError=null,this.devicesList=null,this.execApprovalsLoading=!1,this.execApprovalsSaving=!1,this.execApprovalsDirty=!1,this.execApprovalsSnapshot=null,this.execApprovalsForm=null,this.execApprovalsSelectedAgent=null,this.execApprovalsTarget="gateway",this.execApprovalsTargetNodeId=null,this.execApprovalQueue=[],this.execApprovalBusy=!1,this.execApprovalError=null,this.pendingGatewayUrl=null,this.configLoading=!1,this.configRaw=`{
}
`,this.configRawOriginal="",this.configValid=null,this.configIssues=[],this.configSaving=!1,this.configApplying=!1,this.updateRunning=!1,this.applySessionKey=this.settings.lastActiveSessionKey,this.configSnapshot=null,this.configSchema=null,this.configSchemaVersion=null,this.configSchemaLoading=!1,this.configUiHints={},this.configForm=null,this.configFormOriginal=null,this.configFormDirty=!1,this.configFormMode="form",this.configSearchQuery="",this.configActiveSection=null,this.configActiveSubsection=null,this.channelsLoading=!1,this.channelsSnapshot=null,this.channelsError=null,this.channelsLastSuccess=null,this.bkContent="",this.bkLoading=!1,this.bkError=null,this.bkSaving=!1,this.bkLastSuccess=null,this.bkDependentFiles=null,this.whatsappLoginMessage=null,this.whatsappLoginQrDataUrl=null,this.whatsappLoginConnected=null,this.whatsappBusy=!1,this.nostrProfileFormState=null,this.nostrProfileAccountId=null,this.presenceLoading=!1,this.presenceEntries=[],this.presenceError=null,this.presenceStatus=null,this.oosLoading=!1,this.oosError=null,this.oosStats=null,this.oosList=[],this.oosByFile=[],this.oosByTime=[],this.oosShowAddForm=!1,this.oosDb=null,this.shortageLoading=!1,this.shortageError=null,this.shortageStats=null,this.shortageList=[],this.shortageByFile=[],this.shortageByTime=[],this.shortageShowAddForm=!1,this.shortageDb=null,this.overviewOosStats=null,this.overviewOosError=null,this.overviewShortageStats=null,this.overviewShortageError=null,this.dashboardLoading=!1,this.dashboardError=null,this.quotationStats=null,this.dashboardOosByTime=[],this.dashboardShortageByTime=[],this.agentsLoading=!1,this.agentsList=null,this.agentsError=null,this.agentsSelectedId=null,this.agentsPanel="overview",this.agentInfo=null,this.agentInfoLoading=!1,this.agentInfoError=null,this.agentFilesLoading=!1,this.agentFilesError=null,this.agentFilesList=null,this.agentFileContents={},this.agentFileDrafts={},this.agentFileActive=null,this.agentFileSaving=!1,this.agentIdentityLoading=!1,this.agentIdentityError=null,this.agentIdentityById={},this.agentSkillsLoading=!1,this.agentSkillsError=null,this.agentSkillsReport=null,this.agentSkillsAgentId=null,this.sessionsLoading=!1,this.sessionsResult=null,this.sessionsError=null,this.sessionsFilterActive="",this.sessionsFilterLimit="120",this.sessionsIncludeGlobal=!0,this.sessionsIncludeUnknown=!1,this.usageLoading=!1,this.usageResult=null,this.usageCostSummary=null,this.usageError=null,this.usageRequestSeq=0,this.usageTimeSeriesRequestSeq=0,this.usageSessionLogsRequestSeq=0,this.usageStartDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageEndDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageSelectedSessions=[],this.usageSelectedDays=[],this.usageSelectedHours=[],this.usageChartMode="tokens",this.usageDailyChartMode="by-type",this.usageTimeSeriesMode="per-turn",this.usageTimeSeriesBreakdownMode="by-type",this.usageTimeSeries=null,this.usageTimeSeriesLoading=!1,this.usageTimeSeriesCursorStart=null,this.usageTimeSeriesCursorEnd=null,this.usageSessionLogs=null,this.usageSessionLogsLoading=!1,this.usageSessionLogsExpanded=!1,this.usageQuery="",this.usageQueryDraft="",this.usageSessionSort="recent",this.usageSessionSortDir="desc",this.usageRecentSessions=[],this.usageTimeZone="local",this.usageContextExpanded=!1,this.usageHeaderPinned=!1,this.usageSessionsTab="all",this.usageVisibleColumns=["channel","agent","provider","model","messages","tools","errors","duration"],this.usageLogFilterRoles=[],this.usageLogFilterTools=[],this.usageLogFilterHasTools=!1,this.usageLogFilterQuery="",this.usageQueryDebounceTimer=null,this.workFilePaths=[],this.workOriginalFileNamesByPath={},this.workRunning=!1,this.workProgressStage=0,this._workProgressInterval=null,this.workRunStatus="idle",this.workRunId=null,this.workPendingChoices=[],this.workSelections={},this.workResult=null,this.workError=null,this.workCustomerLevel="B_QUOTE",this.workDoRegisterOos=!1,this.workPendingQuotationDraft=null,this.workQuotationDraftSaveStatus=null,this.workTextInput="",this.workTextGenerating=!1,this.workTextError=null,this.workPriceLevelOptions=[],this.cronLoading=!1,this.cronJobs=[],this.cronStatus=null,this.cronError=null,this.cronForm={...xv},this.cronRunsJobId=null,this.cronRuns=[],this.cronBusy=!1,this.fulfillDraftsLoading=!1,this.fulfillDraftsError=null,this.fulfillDrafts=[],this.fulfillDetail=null,this.fulfillDetailId=null,this.fulfillConfirmBusy=!1,this.fulfillConfirmResult=null,this.fulfillFilterQuery="",this.fulfillSortBy="created_at",this.fulfillSortDir="desc",this.fulfillPage=1,this.fulfillPageSize=10,this.procurementLoading=!1,this.procurementError=null,this.procurementSuggestions=[],this.procurementSelectedKeys=[],this.procurementApprovedKeys=[],this.procurementApproveBusy=!1,this.procurementApproveResult=null,this.procurementFilterQuery="",this.procurementSortBy="uploaded_at",this.procurementSortDir="desc",this.procurementPage=1,this.procurementPageSize=10,this.replenishmentDrafts=[],this.replenishmentDetail=null,this.replenishmentDetailId=null,this.replenishmentLoading=!1,this.replenishmentError=null,this.replenishmentConfirmBusy=!1,this.replenishmentConfirmResult=null,this.replenishmentInputLines=[{product_or_code:"",quantity:0}],this.replenishmentCreateBusy=!1,this.skillsLoading=!1,this.skillsReport=null,this.skillsError=null,this.skillsFilter="",this.skillEdits={},this.skillsBusyKey=null,this.skillMessages={},this.reportsLoading=!1,this.reportsError=null,this.reportsTasks=[],this.reportsRecords=[],this.reportsAdminToken="",this.reportsEditingTaskId=null,this.reportsEditForm={},this.reportDetail=null,this.reportDetailLoading=!1,this.selectedRecordId=null,this.reportsCopyJustDone=!1,this.reportsDetailTab="data",this.debugLoading=!1,this.debugStatus=null,this.debugHealth=null,this.debugModels=[],this.debugHeartbeat=null,this.debugCallMethod="",this.debugCallParams="{}",this.debugCallResult=null,this.debugCallError=null,this.logsLoading=!1,this.logsError=null,this.logsFile=null,this.logsEntries=[],this.logsFilterText="",this.logsLevelFilters={...vv},this.logsAutoFollow=!0,this.logsTruncated=!1,this.logsCursor=null,this.logsLastFetchAt=null,this.logsLimit=500,this.logsMaxBytes=25e4,this.logsAtBottom=!0,this.adminData=Yb(),this.client=null,this.chatScrollFrame=null,this.chatScrollTimeout=null,this.chatHasAutoScrolled=!1,this.chatUserNearBottom=!0,this.chatNewMessagesBelow=!1,this.nodesPollInterval=null,this.logsPollInterval=null,this.debugPollInterval=null,this.logsScrollFrame=null,this.toolStreamById=new Map,this.toolStreamOrder=[],this.toolRenderData=null,this.toolRenderSeq=null,this.toolRenderItems=[],this.candidatePreviews=[],this.ocrResultCards=[],this.refreshSessionsAfterChat=new Set,this.basePath="",this.popStateHandler=()=>Iy(this),this.themeMedia=null,this.themeMediaHandler=null,this.topbarObserver=null,nl(this.settings.locale)&&An.setLocale(this.settings.locale)}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),e0(this)}firstUpdated(){t0(this)}disconnectedCallback(){n0(this),super.disconnectedCallback()}updated(e){e.has("workRunning")&&(this.workRunning?(this.workProgressStage=this.workRunStatus==="resuming"?1:0,this._workProgressInterval!=null&&(clearInterval(this._workProgressInterval),this._workProgressInterval=null)):(this._workProgressInterval!=null&&(clearInterval(this._workProgressInterval),this._workProgressInterval=null),this.workRunStatus==="done"&&(this.workProgressStage=2))),i0(this,e)}connect(){$f(this)}handleChatScroll(e){ym(this,e)}handleLogsScroll(e){vm(this,e)}exportLogs(e,t){xm(e,t)}resetToolStream(){Xo(this)}resetToolRender(){Jo(this)}resetChatScroll(){Fc(this)}scrollToBottom(e){Fc(this),ps(this,!0,!!(e!=null&&e.smooth))}async loadAssistantIdentity(){await kf(this)}applySettings(e){Yt(this,e)}setTab(e){Cy(this,e)}setTheme(e,t){Ey(this,e,t)}async loadOverview(){await pf(this)}async loadCron(){await gf(this)}async loadFulfillDrafts(){await Fy(this)}async loadProcurementSuggestions(){await Ny(this)}async loadProcurementReplenishment(){await ms(this)}async loadProcurementReplenishmentDetail(e){await Jm(this,e)}async confirmProcurementReplenishment(e){await eb(this,e)}async deleteProcurementReplenishmentDraft(e){await tb(this,e)}onReplenishmentLineChange(e,t,n){const i=this.replenishmentInputLines.slice();e<0||e>=i.length||(i[e]={...i[e],[t]:n},this.replenishmentInputLines=i)}onReplenishmentAddLine(){this.replenishmentInputLines=[...this.replenishmentInputLines,{product_or_code:"",quantity:0}]}onReplenishmentRemoveLine(e){const t=this.replenishmentInputLines.filter((n,i)=>i!==e);this.replenishmentInputLines=t.length>0?t:[{product_or_code:"",quantity:0}]}async createProcurementReplenishmentDraft(){if(!this.replenishmentCreateBusy){this.replenishmentCreateBusy=!0,this.replenishmentError=null;try{const e=await Zm(this,this.replenishmentInputLines);e&&(this.replenishmentInputLines=[{product_or_code:"",quantity:0}],await this.loadProcurementReplenishment(),await this.loadProcurementReplenishmentDetail(e.id))}finally{this.replenishmentCreateBusy=!1}}}async handleAbortChat(){await vf(this)}removeQueuedMessage(e){pv(this,e)}async handleUploadChatFile(e){try{const t=await av(this.basePath,e);this.chatUploadedFile=t,this.lastError=null}catch(t){this.lastError=t instanceof Error?t.message:String(t)}}clearChatUploadedFile(){this.chatUploadedFile=null}setChatComposeDragOver(e){this.chatComposeDragOver=e}async handleComposeDrop(e){this.chatComposeDragOver=!1,await this.handleUploadChatFile(e)}async handleSendChat(e,t){await gv(this,e,t)}async handleWhatsAppStart(e){await om(this,e)}async handleWhatsAppWait(){await rm(this)}async handleWhatsAppLogout(){await am(this)}async handleChannelConfigSave(){await lm(this)}async handleChannelConfigReload(){await cm(this)}handleNostrProfileEdit(e,t){hm(this,e,t)}handleNostrProfileCancel(){fm(this)}handleNostrProfileFieldChange(e,t){pm(this,e,t)}async handleNostrProfileSave(){await mm(this)}async handleNostrProfileImport(){await bm(this)}handleNostrProfileToggleAdvanced(){gm(this)}async handleExecApprovalDecision(e){const t=this.execApprovalQueue[0];if(!(!t||!this.client||this.execApprovalBusy)){this.execApprovalBusy=!0,this.execApprovalError=null;try{await this.client.request("exec.approval.resolve",{id:t.id,decision:e}),this.execApprovalQueue=this.execApprovalQueue.filter(n=>n.id!==t.id)}catch(n){this.execApprovalError=`Exec approval failed: ${String(n)}`}finally{this.execApprovalBusy=!1}}}handleGatewayUrlConfirm(){const e=this.pendingGatewayUrl;e&&(this.pendingGatewayUrl=null,Yt(this,{...this.settings,gatewayUrl:e}),this.connect())}handleGatewayUrlCancel(){this.pendingGatewayUrl=null}handleOpenSidebar(e){this.sidebarCloseTimer!=null&&(window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=null),this.sidebarContent=e,this.sidebarError=null,this.sidebarOpen=!0}handleCloseSidebar(){this.sidebarOpen=!1,this.sidebarCloseTimer!=null&&window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=window.setTimeout(()=>{this.sidebarOpen||(this.sidebarContent=null,this.sidebarError=null,this.sidebarCloseTimer=null)},200)}handleSplitRatioChange(e){const t=Math.max(.4,Math.min(.7,e));this.splitRatio=t,this.applySettings({...this.settings,splitRatio:t})}render(){return YA(this)}};w([_()],x.prototype,"settings",2);w([_()],x.prototype,"password",2);w([_()],x.prototype,"tab",2);w([_()],x.prototype,"onboarding",2);w([_()],x.prototype,"connected",2);w([_()],x.prototype,"theme",2);w([_()],x.prototype,"themeResolved",2);w([_()],x.prototype,"hello",2);w([_()],x.prototype,"lastError",2);w([_()],x.prototype,"eventLog",2);w([_()],x.prototype,"assistantName",2);w([_()],x.prototype,"assistantAvatar",2);w([_()],x.prototype,"assistantAgentId",2);w([_()],x.prototype,"sessionKey",2);w([_()],x.prototype,"chatLoading",2);w([_()],x.prototype,"chatSending",2);w([_()],x.prototype,"chatMessage",2);w([_()],x.prototype,"chatMessages",2);w([_()],x.prototype,"chatToolMessages",2);w([_()],x.prototype,"chatStream",2);w([_()],x.prototype,"chatStreamStartedAt",2);w([_()],x.prototype,"chatRunId",2);w([_()],x.prototype,"compactionStatus",2);w([_()],x.prototype,"chatAvatarUrl",2);w([_()],x.prototype,"chatThinkingLevel",2);w([_()],x.prototype,"chatQueue",2);w([_()],x.prototype,"chatAttachments",2);w([_()],x.prototype,"chatUploadedFile",2);w([_()],x.prototype,"chatComposeDragOver",2);w([_()],x.prototype,"chatManualRefreshInFlight",2);w([_()],x.prototype,"sidebarOpen",2);w([_()],x.prototype,"sidebarContent",2);w([_()],x.prototype,"sidebarError",2);w([_()],x.prototype,"splitRatio",2);w([_()],x.prototype,"nodesLoading",2);w([_()],x.prototype,"nodes",2);w([_()],x.prototype,"devicesLoading",2);w([_()],x.prototype,"devicesError",2);w([_()],x.prototype,"devicesList",2);w([_()],x.prototype,"execApprovalsLoading",2);w([_()],x.prototype,"execApprovalsSaving",2);w([_()],x.prototype,"execApprovalsDirty",2);w([_()],x.prototype,"execApprovalsSnapshot",2);w([_()],x.prototype,"execApprovalsForm",2);w([_()],x.prototype,"execApprovalsSelectedAgent",2);w([_()],x.prototype,"execApprovalsTarget",2);w([_()],x.prototype,"execApprovalsTargetNodeId",2);w([_()],x.prototype,"execApprovalQueue",2);w([_()],x.prototype,"execApprovalBusy",2);w([_()],x.prototype,"execApprovalError",2);w([_()],x.prototype,"pendingGatewayUrl",2);w([_()],x.prototype,"configLoading",2);w([_()],x.prototype,"configRaw",2);w([_()],x.prototype,"configRawOriginal",2);w([_()],x.prototype,"configValid",2);w([_()],x.prototype,"configIssues",2);w([_()],x.prototype,"configSaving",2);w([_()],x.prototype,"configApplying",2);w([_()],x.prototype,"updateRunning",2);w([_()],x.prototype,"applySessionKey",2);w([_()],x.prototype,"configSnapshot",2);w([_()],x.prototype,"configSchema",2);w([_()],x.prototype,"configSchemaVersion",2);w([_()],x.prototype,"configSchemaLoading",2);w([_()],x.prototype,"configUiHints",2);w([_()],x.prototype,"configForm",2);w([_()],x.prototype,"configFormOriginal",2);w([_()],x.prototype,"configFormDirty",2);w([_()],x.prototype,"configFormMode",2);w([_()],x.prototype,"configSearchQuery",2);w([_()],x.prototype,"configActiveSection",2);w([_()],x.prototype,"configActiveSubsection",2);w([_()],x.prototype,"channelsLoading",2);w([_()],x.prototype,"channelsSnapshot",2);w([_()],x.prototype,"channelsError",2);w([_()],x.prototype,"channelsLastSuccess",2);w([_()],x.prototype,"bkContent",2);w([_()],x.prototype,"bkLoading",2);w([_()],x.prototype,"bkError",2);w([_()],x.prototype,"bkSaving",2);w([_()],x.prototype,"bkLastSuccess",2);w([_()],x.prototype,"bkDependentFiles",2);w([_()],x.prototype,"whatsappLoginMessage",2);w([_()],x.prototype,"whatsappLoginQrDataUrl",2);w([_()],x.prototype,"whatsappLoginConnected",2);w([_()],x.prototype,"whatsappBusy",2);w([_()],x.prototype,"nostrProfileFormState",2);w([_()],x.prototype,"nostrProfileAccountId",2);w([_()],x.prototype,"presenceLoading",2);w([_()],x.prototype,"presenceEntries",2);w([_()],x.prototype,"presenceError",2);w([_()],x.prototype,"presenceStatus",2);w([_()],x.prototype,"oosLoading",2);w([_()],x.prototype,"oosError",2);w([_()],x.prototype,"oosStats",2);w([_()],x.prototype,"oosList",2);w([_()],x.prototype,"oosByFile",2);w([_()],x.prototype,"oosByTime",2);w([_()],x.prototype,"oosShowAddForm",2);w([_()],x.prototype,"oosDb",2);w([_()],x.prototype,"shortageLoading",2);w([_()],x.prototype,"shortageError",2);w([_()],x.prototype,"shortageStats",2);w([_()],x.prototype,"shortageList",2);w([_()],x.prototype,"shortageByFile",2);w([_()],x.prototype,"shortageByTime",2);w([_()],x.prototype,"shortageShowAddForm",2);w([_()],x.prototype,"shortageDb",2);w([_()],x.prototype,"overviewOosStats",2);w([_()],x.prototype,"overviewOosError",2);w([_()],x.prototype,"overviewShortageStats",2);w([_()],x.prototype,"overviewShortageError",2);w([_()],x.prototype,"dashboardLoading",2);w([_()],x.prototype,"dashboardError",2);w([_()],x.prototype,"quotationStats",2);w([_()],x.prototype,"dashboardOosByTime",2);w([_()],x.prototype,"dashboardShortageByTime",2);w([_()],x.prototype,"agentsLoading",2);w([_()],x.prototype,"agentsList",2);w([_()],x.prototype,"agentsError",2);w([_()],x.prototype,"agentsSelectedId",2);w([_()],x.prototype,"agentsPanel",2);w([_()],x.prototype,"agentInfo",2);w([_()],x.prototype,"agentInfoLoading",2);w([_()],x.prototype,"agentInfoError",2);w([_()],x.prototype,"agentFilesLoading",2);w([_()],x.prototype,"agentFilesError",2);w([_()],x.prototype,"agentFilesList",2);w([_()],x.prototype,"agentFileContents",2);w([_()],x.prototype,"agentFileDrafts",2);w([_()],x.prototype,"agentFileActive",2);w([_()],x.prototype,"agentFileSaving",2);w([_()],x.prototype,"agentIdentityLoading",2);w([_()],x.prototype,"agentIdentityError",2);w([_()],x.prototype,"agentIdentityById",2);w([_()],x.prototype,"agentSkillsLoading",2);w([_()],x.prototype,"agentSkillsError",2);w([_()],x.prototype,"agentSkillsReport",2);w([_()],x.prototype,"agentSkillsAgentId",2);w([_()],x.prototype,"sessionsLoading",2);w([_()],x.prototype,"sessionsResult",2);w([_()],x.prototype,"sessionsError",2);w([_()],x.prototype,"sessionsFilterActive",2);w([_()],x.prototype,"sessionsFilterLimit",2);w([_()],x.prototype,"sessionsIncludeGlobal",2);w([_()],x.prototype,"sessionsIncludeUnknown",2);w([_()],x.prototype,"usageLoading",2);w([_()],x.prototype,"usageResult",2);w([_()],x.prototype,"usageCostSummary",2);w([_()],x.prototype,"usageError",2);w([_()],x.prototype,"usageStartDate",2);w([_()],x.prototype,"usageEndDate",2);w([_()],x.prototype,"usageSelectedSessions",2);w([_()],x.prototype,"usageSelectedDays",2);w([_()],x.prototype,"usageSelectedHours",2);w([_()],x.prototype,"usageChartMode",2);w([_()],x.prototype,"usageDailyChartMode",2);w([_()],x.prototype,"usageTimeSeriesMode",2);w([_()],x.prototype,"usageTimeSeriesBreakdownMode",2);w([_()],x.prototype,"usageTimeSeries",2);w([_()],x.prototype,"usageTimeSeriesLoading",2);w([_()],x.prototype,"usageTimeSeriesCursorStart",2);w([_()],x.prototype,"usageTimeSeriesCursorEnd",2);w([_()],x.prototype,"usageSessionLogs",2);w([_()],x.prototype,"usageSessionLogsLoading",2);w([_()],x.prototype,"usageSessionLogsExpanded",2);w([_()],x.prototype,"usageQuery",2);w([_()],x.prototype,"usageQueryDraft",2);w([_()],x.prototype,"usageSessionSort",2);w([_()],x.prototype,"usageSessionSortDir",2);w([_()],x.prototype,"usageRecentSessions",2);w([_()],x.prototype,"usageTimeZone",2);w([_()],x.prototype,"usageContextExpanded",2);w([_()],x.prototype,"usageHeaderPinned",2);w([_()],x.prototype,"usageSessionsTab",2);w([_()],x.prototype,"usageVisibleColumns",2);w([_()],x.prototype,"usageLogFilterRoles",2);w([_()],x.prototype,"usageLogFilterTools",2);w([_()],x.prototype,"usageLogFilterHasTools",2);w([_()],x.prototype,"usageLogFilterQuery",2);w([_()],x.prototype,"workFilePaths",2);w([_()],x.prototype,"workOriginalFileNamesByPath",2);w([_()],x.prototype,"workRunning",2);w([_()],x.prototype,"workProgressStage",2);w([_()],x.prototype,"workRunStatus",2);w([_()],x.prototype,"workRunId",2);w([_()],x.prototype,"workPendingChoices",2);w([_()],x.prototype,"workSelections",2);w([_()],x.prototype,"workResult",2);w([_()],x.prototype,"workError",2);w([_()],x.prototype,"workCustomerLevel",2);w([_()],x.prototype,"workDoRegisterOos",2);w([_()],x.prototype,"workPendingQuotationDraft",2);w([_()],x.prototype,"workQuotationDraftSaveStatus",2);w([_()],x.prototype,"workTextInput",2);w([_()],x.prototype,"workTextGenerating",2);w([_()],x.prototype,"workTextError",2);w([_()],x.prototype,"workPriceLevelOptions",2);w([_()],x.prototype,"cronLoading",2);w([_()],x.prototype,"cronJobs",2);w([_()],x.prototype,"cronStatus",2);w([_()],x.prototype,"cronError",2);w([_()],x.prototype,"cronForm",2);w([_()],x.prototype,"cronRunsJobId",2);w([_()],x.prototype,"cronRuns",2);w([_()],x.prototype,"cronBusy",2);w([_()],x.prototype,"fulfillDraftsLoading",2);w([_()],x.prototype,"fulfillDraftsError",2);w([_()],x.prototype,"fulfillDrafts",2);w([_()],x.prototype,"fulfillDetail",2);w([_()],x.prototype,"fulfillDetailId",2);w([_()],x.prototype,"fulfillConfirmBusy",2);w([_()],x.prototype,"fulfillConfirmResult",2);w([_()],x.prototype,"fulfillFilterQuery",2);w([_()],x.prototype,"fulfillSortBy",2);w([_()],x.prototype,"fulfillSortDir",2);w([_()],x.prototype,"fulfillPage",2);w([_()],x.prototype,"fulfillPageSize",2);w([_()],x.prototype,"procurementLoading",2);w([_()],x.prototype,"procurementError",2);w([_()],x.prototype,"procurementSuggestions",2);w([_()],x.prototype,"procurementSelectedKeys",2);w([_()],x.prototype,"procurementApprovedKeys",2);w([_()],x.prototype,"procurementApproveBusy",2);w([_()],x.prototype,"procurementApproveResult",2);w([_()],x.prototype,"procurementFilterQuery",2);w([_()],x.prototype,"procurementSortBy",2);w([_()],x.prototype,"procurementSortDir",2);w([_()],x.prototype,"procurementPage",2);w([_()],x.prototype,"procurementPageSize",2);w([_()],x.prototype,"replenishmentDrafts",2);w([_()],x.prototype,"replenishmentDetail",2);w([_()],x.prototype,"replenishmentDetailId",2);w([_()],x.prototype,"replenishmentLoading",2);w([_()],x.prototype,"replenishmentError",2);w([_()],x.prototype,"replenishmentConfirmBusy",2);w([_()],x.prototype,"replenishmentConfirmResult",2);w([_()],x.prototype,"replenishmentInputLines",2);w([_()],x.prototype,"replenishmentCreateBusy",2);w([_()],x.prototype,"skillsLoading",2);w([_()],x.prototype,"skillsReport",2);w([_()],x.prototype,"skillsError",2);w([_()],x.prototype,"skillsFilter",2);w([_()],x.prototype,"skillEdits",2);w([_()],x.prototype,"skillsBusyKey",2);w([_()],x.prototype,"skillMessages",2);w([_()],x.prototype,"reportsLoading",2);w([_()],x.prototype,"reportsError",2);w([_()],x.prototype,"reportsTasks",2);w([_()],x.prototype,"reportsRecords",2);w([_()],x.prototype,"reportsAdminToken",2);w([_()],x.prototype,"reportsEditingTaskId",2);w([_()],x.prototype,"reportsEditForm",2);w([_()],x.prototype,"reportDetail",2);w([_()],x.prototype,"reportDetailLoading",2);w([_()],x.prototype,"selectedRecordId",2);w([_()],x.prototype,"reportsCopyJustDone",2);w([_()],x.prototype,"reportsDetailTab",2);w([_()],x.prototype,"debugLoading",2);w([_()],x.prototype,"debugStatus",2);w([_()],x.prototype,"debugHealth",2);w([_()],x.prototype,"debugModels",2);w([_()],x.prototype,"debugHeartbeat",2);w([_()],x.prototype,"debugCallMethod",2);w([_()],x.prototype,"debugCallParams",2);w([_()],x.prototype,"debugCallResult",2);w([_()],x.prototype,"debugCallError",2);w([_()],x.prototype,"logsLoading",2);w([_()],x.prototype,"logsError",2);w([_()],x.prototype,"logsFile",2);w([_()],x.prototype,"logsEntries",2);w([_()],x.prototype,"logsFilterText",2);w([_()],x.prototype,"logsLevelFilters",2);w([_()],x.prototype,"logsAutoFollow",2);w([_()],x.prototype,"logsTruncated",2);w([_()],x.prototype,"logsCursor",2);w([_()],x.prototype,"logsLastFetchAt",2);w([_()],x.prototype,"logsLimit",2);w([_()],x.prototype,"logsMaxBytes",2);w([_()],x.prototype,"logsAtBottom",2);w([_()],x.prototype,"adminData",2);w([_()],x.prototype,"chatNewMessagesBelow",2);w([_()],x.prototype,"toolRenderData",2);w([_()],x.prototype,"toolRenderSeq",2);w([_()],x.prototype,"toolRenderItems",2);w([_()],x.prototype,"candidatePreviews",2);w([_()],x.prototype,"ocrResultCards",2);x=w([Ho("openclaw-app")],x);
//# sourceMappingURL=index-BRF11MFX.js.map
