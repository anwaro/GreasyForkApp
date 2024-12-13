// ==UserScript==
// @name         Gitlab plus
// @namespace    https://lukaszmical.pl/
// @version      2024-12-05
// @description  Gitlab utils
// @author       Łukasz Micał
// @match        https://gitlab.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&gitlab.com
// ==/UserScript==

// Libs: preact, preact/hooks, preact/compat
function importPreact(){var _,e,n,t,o,r,l,u,i,c,f,a={},s=[],p=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,h=Array.isArray;function v(_,e){for(var n in e)_[n]=e[n];return _}function d(_){_&&_.parentNode&&_.parentNode.removeChild(_)}function m(e,n,t){var o,r,l,u={};for(l in n)"key"==l?o=n[l]:"ref"==l?r=n[l]:u[l]=n[l];if(arguments.length>2&&(u.children=arguments.length>3?_.call(arguments,2):t),"function"==typeof e&&null!=e.defaultProps)for(l in e.defaultProps)void 0===u[l]&&(u[l]=e.defaultProps[l]);return y(e,u,o,r,null)}function y(_,t,o,r,l){var u={type:_,props:t,key:o,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:null==l?++n:l,__i:-1,__u:0};return null==l&&null!=e.vnode&&e.vnode(u),u}function g(_){return _.children}function b(_,e){this.props=_,this.context=e}function k(_,e){if(null==e)return _.__?k(_.__,_.__i+1):null;for(var n;e<_.__k.length;e++)if(null!=(n=_.__k[e])&&null!=n.__e)return n.__e;return"function"==typeof _.type?k(_):null}function w(_){var e,n;if(null!=(_=_.__)&&null!=_.__c){for(_.__e=_.__c.base=null,e=0;e<_.__k.length;e++)if(null!=(n=_.__k[e])&&null!=n.__e){_.__e=_.__c.base=n.__e;break}return w(_)}}function P(_){(!_.__d&&(_.__d=!0)&&t.push(_)&&!S.__r++||o!==e.debounceRendering)&&((o=e.debounceRendering)||r)(S)}function S(){var _,n,o,r,u,i,c,f;for(t.sort(l);_=t.shift();)_.__d&&(n=t.length,r=void 0,i=(u=(o=_).__v).__e,c=[],f=[],o.__P&&((r=v({},u)).__v=u.__v+1,e.vnode&&e.vnode(r),A(o.__P,r,u,o.__n,o.__P.namespaceURI,32&u.__u?[i]:null,c,null==i?k(u):i,!!(32&u.__u),f),r.__v=u.__v,r.__.__k[r.__i]=r,D(c,r,f),r.__e!=i&&w(r)),t.length>n&&t.sort(l));S.__r=0}function x(_,e,n,t,o,r,l,u,i,c,f){var p,v,d,m,b,w,P=t&&t.__k||s,S=e.length;for(i=function(_,e,n,t){var o,r,l,u,i,c=e.length,f=n.length,a=f,s=0;for(_.__k=[],o=0;o<c;o++)null!=(r=e[o])&&"boolean"!=typeof r&&"function"!=typeof r?(u=o+s,(r=_.__k[o]="string"==typeof r||"number"==typeof r||"bigint"==typeof r||r.constructor==String?y(null,r,null,null,null):h(r)?y(g,{children:r},null,null,null):void 0===r.constructor&&r.__b>0?y(r.type,r.props,r.key,r.ref?r.ref:null,r.__v):r).__=_,r.__b=_.__b+1,l=null,-1!==(i=r.__i=N(r,n,u,a))&&(a--,(l=n[i])&&(l.__u|=2)),null==l||null===l.__v?(-1==i&&s--,"function"!=typeof r.type&&(r.__u|=4)):i!==u&&(i==u-1?s--:i==u+1?s++:(i>u?s--:s++,r.__u|=4))):r=_.__k[o]=null;if(a)for(o=0;o<f;o++)null!=(l=n[o])&&!(2&l.__u)&&(l.__e==t&&(t=k(l)),M(l,l));return t}(n,e,P,i),p=0;p<S;p++)null!=(d=n.__k[p])&&(v=-1===d.__i?a:P[d.__i]||a,d.__i=p,w=A(_,d,v,o,r,l,u,i,c,f),m=d.__e,d.ref&&v.ref!=d.ref&&(v.ref&&O(v.ref,null,d),f.push(d.ref,d.__c||m,d)),null==b&&null!=m&&(b=m),4&d.__u||v.__k===d.__k?i=C(d,i,_):"function"==typeof d.type&&void 0!==w?i=w:m&&(i=m.nextSibling),d.__u&=-7);return n.__e=b,i}function C(_,e,n){var t,o;if("function"==typeof _.type){for(t=_.__k,o=0;t&&o<t.length;o++)t[o]&&(t[o].__=_,e=C(t[o],e,n));return e}_.__e!=e&&(e&&_.type&&!n.contains(e)&&(e=k(_)),n.insertBefore(_.__e,e||null),e=_.__e);do{e=e&&e.nextSibling}while(null!=e&&8===e.nodeType);return e}function H(_,e){return e=e||[],null==_||"boolean"==typeof _||(h(_)?_.some((function(_){H(_,e)})):e.push(_)),e}function N(_,e,n,t){var o=_.key,r=_.type,l=n-1,u=n+1,i=e[n];if(null===i||i&&o==i.key&&r===i.type&&!(2&i.__u))return n;if(("function"!=typeof r||r===g||o)&&t>(null==i||2&i.__u?0:1))for(;l>=0||u<e.length;){if(l>=0){if((i=e[l])&&!(2&i.__u)&&o==i.key&&r===i.type)return l;l--}if(u<e.length){if((i=e[u])&&!(2&i.__u)&&o==i.key&&r===i.type)return u;u++}}return-1}function E(_,e,n){"-"===e[0]?_.setProperty(e,null==n?"":n):_[e]=null==n?"":"number"!=typeof n||p.test(e)?n:n+"px"}function U(_,e,n,t,o){var r;_:if("style"===e)if("string"==typeof n)_.style.cssText=n;else{if("string"==typeof t&&(_.style.cssText=t=""),t)for(e in t)n&&e in n||E(_.style,e,"");if(n)for(e in n)t&&n[e]===t[e]||E(_.style,e,n[e])}else if("o"===e[0]&&"n"===e[1])r=e!==(e=e.replace(u,"$1")),e=e.toLowerCase()in _||"onFocusOut"===e||"onFocusIn"===e?e.toLowerCase().slice(2):e.slice(2),_.l||(_.l={}),_.l[e+r]=n,n?t?n.u=t.u:(n.u=i,_.addEventListener(e,r?f:c,r)):_.removeEventListener(e,r?f:c,r);else{if("http://www.w3.org/2000/svg"==o)e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!=e&&"height"!=e&&"href"!=e&&"list"!=e&&"form"!=e&&"tabIndex"!=e&&"download"!=e&&"rowSpan"!=e&&"colSpan"!=e&&"role"!=e&&"popover"!=e&&e in _)try{_[e]=null==n?"":n;break _}catch(_){}"function"==typeof n||(null==n||!1===n&&"-"!==e[4]?_.removeAttribute(e):_.setAttribute(e,"popover"==e&&1==n?"":n))}}function T(_){return function(n){if(this.l){var t=this.l[n.type+_];if(null==n.t)n.t=i++;else if(n.t<t.u)return;return t(e.event?e.event(n):n)}}}function A(n,t,o,r,l,u,i,c,f,s){var p,m,y,w,P,S,C,H,N,E,T,A,D,O,M,F,R,L=t.type;if(void 0!==t.constructor)return null;128&o.__u&&(f=!!(32&o.__u),u=[c=t.__e=o.__e]),(p=e.__b)&&p(t);_:if("function"==typeof L)try{if(H=t.props,N="prototype"in L&&L.prototype.render,E=(p=L.contextType)&&r[p.__c],T=p?E?E.props.value:p.__:r,o.__c?C=(m=t.__c=o.__c).__=m.__E:(N?t.__c=m=new L(H,T):(t.__c=m=new b(H,T),m.constructor=L,m.render=W),E&&E.sub(m),m.props=H,m.state||(m.state={}),m.context=T,m.__n=r,y=m.__d=!0,m.__h=[],m._sb=[]),N&&null==m.__s&&(m.__s=m.state),N&&null!=L.getDerivedStateFromProps&&(m.__s==m.state&&(m.__s=v({},m.__s)),v(m.__s,L.getDerivedStateFromProps(H,m.__s))),w=m.props,P=m.state,m.__v=t,y)N&&null==L.getDerivedStateFromProps&&null!=m.componentWillMount&&m.componentWillMount(),N&&null!=m.componentDidMount&&m.__h.push(m.componentDidMount);else{if(N&&null==L.getDerivedStateFromProps&&H!==w&&null!=m.componentWillReceiveProps&&m.componentWillReceiveProps(H,T),!m.__e&&(null!=m.shouldComponentUpdate&&!1===m.shouldComponentUpdate(H,m.__s,T)||t.__v===o.__v)){for(t.__v!==o.__v&&(m.props=H,m.state=m.__s,m.__d=!1),t.__e=o.__e,t.__k=o.__k,t.__k.some((function(_){_&&(_.__=t)})),A=0;A<m._sb.length;A++)m.__h.push(m._sb[A]);m._sb=[],m.__h.length&&i.push(m);break _}null!=m.componentWillUpdate&&m.componentWillUpdate(H,m.__s,T),N&&null!=m.componentDidUpdate&&m.__h.push((function(){m.componentDidUpdate(w,P,S)}))}if(m.context=T,m.props=H,m.__P=n,m.__e=!1,D=e.__r,O=0,N){for(m.state=m.__s,m.__d=!1,D&&D(t),p=m.render(m.props,m.state,m.context),M=0;M<m._sb.length;M++)m.__h.push(m._sb[M]);m._sb=[]}else do{m.__d=!1,D&&D(t),p=m.render(m.props,m.state,m.context),m.state=m.__s}while(m.__d&&++O<25);m.state=m.__s,null!=m.getChildContext&&(r=v(v({},r),m.getChildContext())),N&&!y&&null!=m.getSnapshotBeforeUpdate&&(S=m.getSnapshotBeforeUpdate(w,P)),c=x(n,h(F=null!=p&&p.type===g&&null==p.key?p.props.children:p)?F:[F],t,o,r,l,u,i,c,f,s),m.base=t.__e,t.__u&=-161,m.__h.length&&i.push(m),C&&(m.__E=m.__=null)}catch(_){if(t.__v=null,f||null!=u)if(_.then){for(t.__u|=f?160:128;c&&8===c.nodeType&&c.nextSibling;)c=c.nextSibling;u[u.indexOf(c)]=null,t.__e=c}else for(R=u.length;R--;)d(u[R]);else t.__e=o.__e,t.__k=o.__k;e.__e(_,t,o)}else null==u&&t.__v===o.__v?(t.__k=o.__k,t.__e=o.__e):c=t.__e=function(n,t,o,r,l,u,i,c,f){var s,p,v,m,y,g,b,w=o.props,P=t.props,S=t.type;if("svg"===S?l="http://www.w3.org/2000/svg":"math"===S?l="http://www.w3.org/1998/Math/MathML":l||(l="http://www.w3.org/1999/xhtml"),null!=u)for(s=0;s<u.length;s++)if((y=u[s])&&"setAttribute"in y==!!S&&(S?y.localName===S:3===y.nodeType)){n=y,u[s]=null;break}if(null==n){if(null===S)return document.createTextNode(P);n=document.createElementNS(l,S,P.is&&P),c&&(e.__m&&e.__m(t,u),c=!1),u=null}if(null===S)w===P||c&&n.data===P||(n.data=P);else{if(u=u&&_.call(n.childNodes),w=o.props||a,!c&&null!=u)for(w={},s=0;s<n.attributes.length;s++)w[(y=n.attributes[s]).name]=y.value;for(s in w)if(y=w[s],"children"==s);else if("dangerouslySetInnerHTML"==s)v=y;else if(!(s in P)){if("value"==s&&"defaultValue"in P||"checked"==s&&"defaultChecked"in P)continue;U(n,s,null,y,l)}for(s in P)y=P[s],"children"==s?m=y:"dangerouslySetInnerHTML"==s?p=y:"value"==s?g=y:"checked"==s?b=y:c&&"function"!=typeof y||w[s]===y||U(n,s,y,w[s],l);if(p)c||v&&(p.__html===v.__html||p.__html===n.innerHTML)||(n.innerHTML=p.__html),t.__k=[];else if(v&&(n.innerHTML=""),x(n,h(m)?m:[m],t,o,r,"foreignObject"===S?"http://www.w3.org/1999/xhtml":l,u,i,u?u[0]:o.__k&&k(o,0),c,f),null!=u)for(s=u.length;s--;)d(u[s]);c||(s="value","progress"===S&&null==g?n.removeAttribute("value"):void 0!==g&&(g!==n[s]||"progress"===S&&!g||"option"===S&&g!==w[s])&&U(n,s,g,w[s],l),s="checked",void 0!==b&&b!==n[s]&&U(n,s,b,w[s],l))}return n}(o.__e,t,o,r,l,u,i,f,s);return(p=e.diffed)&&p(t),128&t.__u?void 0:c}function D(_,n,t){for(var o=0;o<t.length;o++)O(t[o],t[++o],t[++o]);e.__c&&e.__c(n,_),_.some((function(n){try{_=n.__h,n.__h=[],_.some((function(_){_.call(n)}))}catch(_){e.__e(_,n.__v)}}))}function O(_,n,t){try{if("function"==typeof _){var o="function"==typeof _.__u;o&&_.__u(),o&&null==n||(_.__u=_(n))}else _.current=n}catch(_){e.__e(_,t)}}function M(_,n,t){var o,r;if(e.unmount&&e.unmount(_),(o=_.ref)&&(o.current&&o.current!==_.__e||O(o,null,n)),null!=(o=_.__c)){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(_){e.__e(_,n)}o.base=o.__P=null}if(o=_.__k)for(r=0;r<o.length;r++)o[r]&&M(o[r],n,t||"function"!=typeof _.type);t||d(_.__e),_.__c=_.__=_.__e=void 0}function W(_,e,n){return this.constructor(_,n)}_=s.slice,e={__e:function(_,e,n,t){for(var o,r,l;e=e.__;)if((o=e.__c)&&!o.__)try{if((r=o.constructor)&&null!=r.getDerivedStateFromError&&(o.setState(r.getDerivedStateFromError(_)),l=o.__d),null!=o.componentDidCatch&&(o.componentDidCatch(_,t||{}),l=o.__d),l)return o.__E=o}catch(e){_=e}throw _}},n=0,b.prototype.setState=function(_,e){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=v({},this.state),"function"==typeof _&&(_=_(v({},n),this.props)),_&&v(n,_),null!=_&&this.__v&&(e&&this._sb.push(e),P(this))},b.prototype.forceUpdate=function(_){this.__v&&(this.__e=!0,_&&this.__h.push(_),P(this))},b.prototype.render=g,t=[],r="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,l=function(_,e){return _.__v.__b-e.__v.__b},S.__r=0,u=/(PointerCapture)$|Capture$/i,i=0,c=T(!1),f=T(!0);var F=0;var R,L,$,I,V=0,B=[],j=e,q=j.__b,z=j.__r,Z=j.diffed,G=j.__c,J=j.unmount,K=j.__;function Q(){for(var _;_=B.shift();)if(_.__P&&_.__H)try{_.__H.__h.forEach(__),_.__H.__h.forEach(e_),_.__H.__h=[]}catch(e){_.__H.__h=[],j.__e(e,_.__v)}}j.__b=function(_){L=null,q&&q(_)},j.__=function(_,e){_&&e.__k&&e.__k.__m&&(_.__m=e.__k.__m),K&&K(_,e)},j.__r=function(_){z&&z(_),R=0;var e=(L=_.__c).__H;e&&($===L?(e.__h=[],L.__h=[],e.__.forEach((function(_){_.__N&&(_.__=_.__N),_.i=_.__N=void 0}))):(e.__h.forEach(__),e.__h.forEach(e_),e.__h=[],R=0)),$=L},j.diffed=function(_){Z&&Z(_);var e=_.__c;e&&e.__H&&(e.__H.__h.length&&(1!==B.push(e)&&I===j.requestAnimationFrame||((I=j.requestAnimationFrame)||Y)(Q)),e.__H.__.forEach((function(_){_.i&&(_.__H=_.i),_.i=void 0}))),$=L=null},j.__c=function(_,e){e.some((function(_){try{_.__h.forEach(__),_.__h=_.__h.filter((function(_){return!_.__||e_(_)}))}catch(n){e.some((function(_){_.__h&&(_.__h=[])})),e=[],j.__e(n,_.__v)}})),G&&G(_,e)},j.unmount=function(_){J&&J(_);var e,n=_.__c;n&&n.__H&&(n.__H.__.forEach((function(_){try{__(_)}catch(_){e=_}})),n.__H=void 0,e&&j.__e(e,n.__v))};var X="function"==typeof requestAnimationFrame;function Y(_){var e,n=function(){clearTimeout(t),X&&cancelAnimationFrame(e),setTimeout(_)},t=setTimeout(n,100);X&&(e=requestAnimationFrame(n))}function __(_){var e=L,n=_.__c;"function"==typeof n&&(_.__c=void 0,n()),L=e}function e_(_){var e=L;_.__c=_.__(),L=e}function n_(_,e){return"function"==typeof e?e(_):e}function t_(_,e){for(var n in _)if("__source"!==n&&!(n in e))return!0;for(var t in e)if("__source"!==t&&_[t]!==e[t])return!0;return!1}function o_(_,e){this.props=_,this.context=e}(o_.prototype=new b).isPureReactComponent=!0,o_.prototype.shouldComponentUpdate=function(_,e){return t_(this.props,_)||t_(this.state,e)};var r_=e.__b;e.__b=function(_){_.type&&_.type.__f&&_.ref&&(_.props.ref=_.ref,_.ref=null),r_&&r_(_)};var l_=e.__e;e.__e=function(_,e,n,t){if(_.then)for(var o,r=e;r=r.__;)if((o=r.__c)&&o.__c)return null==e.__e&&(e.__e=n.__e,e.__k=n.__k),o.__c(_,e);l_(_,e,n,t)};var u_=e.unmount;function i_(_,e,n){return _&&(_.__c&&_.__c.__H&&(_.__c.__H.__.forEach((function(_){"function"==typeof _.__c&&_.__c()})),_.__c.__H=null),null!=(_=function(_,e){for(var n in e)_[n]=e[n];return _}({},_)).__c&&(_.__c.__P===n&&(_.__c.__P=e),_.__c=null),_.__k=_.__k&&_.__k.map((function(_){return i_(_,e,n)}))),_}function c_(_,e,n){return _&&n&&(_.__v=null,_.__k=_.__k&&_.__k.map((function(_){return c_(_,e,n)})),_.__c&&_.__c.__P===e&&(_.__e&&n.appendChild(_.__e),_.__c.__e=!0,_.__c.__P=n)),_}function f_(){this.__u=0,this.o=null,this.__b=null}function a_(_){var e=_.__.__c;return e&&e.__a&&e.__a(_)}function s_(){this.i=null,this.l=null}e.unmount=function(_){var e=_.__c;e&&e.__R&&e.__R(),e&&32&_.__u&&(_.type=null),u_&&u_(_)},(f_.prototype=new b).__c=function(_,e){var n=e.__c,t=this;null==t.o&&(t.o=[]),t.o.push(n);var o=a_(t.__v),r=!1,l=function(){r||(r=!0,n.__R=null,o?o(u):u())};n.__R=l;var u=function(){if(! --t.__u){if(t.state.__a){var _=t.state.__a;t.__v.__k[0]=c_(_,_.__c.__P,_.__c.__O)}var e;for(t.setState({__a:t.__b=null});e=t.o.pop();)e.forceUpdate()}};t.__u++||32&e.__u||t.setState({__a:t.__b=t.__v.__k[0]}),_.then(l,l)},f_.prototype.componentWillUnmount=function(){this.o=[]},f_.prototype.render=function(_,e){if(this.__b){if(this.__v.__k){var n=document.createElement("div"),t=this.__v.__k[0].__c;this.__v.__k[0]=i_(this.__b,n,t.__O=t.__P)}this.__b=null}var o=e.__a&&m(g,null,_.fallback);return o&&(o.__u&=-33),[m(g,null,e.__a?null:_.children),o]};var p_=function(_,e,n){if(++n[1]===n[0]&&_.l.delete(e),_.props.revealOrder&&("t"!==_.props.revealOrder[0]||!_.l.size))for(n=_.i;n;){for(;n.length>3;)n.pop()();if(n[1]<n[0])break;_.i=n=n[2]}};(s_.prototype=new b).__a=function(_){var e=this,n=a_(e.__v),t=e.l.get(_);return t[0]++,function(o){var r=function(){e.props.revealOrder?(t.push(o),p_(e,_,t)):o()};n?n(r):r()}},s_.prototype.render=function(_){this.i=null,this.l=new Map;var e=H(_.children);_.revealOrder&&"b"===_.revealOrder[0]&&e.reverse();for(var n=e.length;n--;)this.l.set(e[n],this.i=[1,0,this.i]);return _.children},s_.prototype.componentDidUpdate=s_.prototype.componentDidMount=function(){var _=this;this.l.forEach((function(e,n){p_(_,n,e)}))};var h_="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,v_=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,d_=/^on(Ani|Tra|Tou|BeforeInp|Compo)/,m_=/[A-Z0-9]/g,y_="undefined"!=typeof document,g_=function(_){return("undefined"!=typeof Symbol&&"symbol"==typeof Symbol()?/fil|che|rad/:/fil|che|ra/).test(_)};b.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach((function(_){Object.defineProperty(b.prototype,_,{configurable:!0,get:function(){return this["UNSAFE_"+_]},set:function(e){Object.defineProperty(this,_,{configurable:!0,writable:!0,value:e})}})}));var b_=e.event;function k_(){}function w_(){return this.cancelBubble}function P_(){return this.defaultPrevented}e.event=function(_){return b_&&(_=b_(_)),_.persist=k_,_.isPropagationStopped=w_,_.isDefaultPrevented=P_,_.nativeEvent=_};var S_={enumerable:!1,configurable:!0,get:function(){return this.class}},x_=e.vnode;e.vnode=function(_){"string"==typeof _.type&&function(_){var e=_.props,n=_.type,t={},o=-1===n.indexOf("-");for(var r in e){var l=e[r];if(!("value"===r&&"defaultValue"in e&&null==l||y_&&"children"===r&&"noscript"===n||"class"===r||"className"===r)){var u=r.toLowerCase();"defaultValue"===r&&"value"in e&&null==e.value?r="value":"download"===r&&!0===l?l="":"translate"===u&&"no"===l?l=!1:"o"===u[0]&&"n"===u[1]?"ondoubleclick"===u?r="ondblclick":"onchange"!==u||"input"!==n&&"textarea"!==n||g_(e.type)?"onfocus"===u?r="onfocusin":"onblur"===u?r="onfocusout":d_.test(r)&&(r=u):u=r="oninput":o&&v_.test(r)?r=r.replace(m_,"-$&").toLowerCase():null===l&&(l=void 0),"oninput"===u&&t[r=u]&&(r="oninputCapture"),t[r]=l}}"select"==n&&t.multiple&&Array.isArray(t.value)&&(t.value=H(e.children).forEach((function(_){_.props.selected=-1!=t.value.indexOf(_.props.value)}))),"select"==n&&null!=t.defaultValue&&(t.value=H(e.children).forEach((function(_){_.props.selected=t.multiple?-1!=t.defaultValue.indexOf(_.props.value):t.defaultValue==_.props.value}))),e.class&&!e.className?(t.class=e.class,Object.defineProperty(t,"className",S_)):(e.className&&!e.class||e.class&&e.className)&&(t.class=t.className=e.className),_.props=t}(_),_.$$typeof=h_,x_&&x_(_)};var C_=e.__r;e.__r=function(_){C_&&C_(_),_.__c};var H_=e.diffed;return e.diffed=function(_){H_&&H_(_);var e=_.props,n=_.__e;null!=n&&"textarea"===_.type&&"value"in e&&e.value!==n.value&&(n.value=null==e.value?"":e.value)},{D:function(n,t,o){var r,l,u,i;t===document&&(t=document.documentElement),e.__&&e.__(n,t),l=(r="function"==typeof o)?null:t.__k,u=[],i=[],A(t,n=(!r&&o||t).__k=m(g,null,[n]),l||a,a,t.namespaceURI,!r&&o?[o]:l?null:t.firstChild?_.call(t.childNodes):null,u,!r&&o?o:l?l.__e:t.firstChild,r,i),D(u,n,i)},h:function(_){return V=1,function(_,e,n){var t=function(_,e){j.__h&&j.__h(L,_,V||e),V=0;var n=L.__H||(L.__H={__:[],__h:[]});return _>=n.__.length&&n.__.push({}),n.__[_]}(R++,2);if(t.t=_,!t.__c&&(t.__=[n?n(e):n_(void 0,e),function(_){var e=t.__N?t.__N[0]:t.__[0],n=t.t(e,_);e!==n&&(t.__N=[n,t.__[1]],t.__c.setState({}))}],t.__c=L,!L.u)){var o=function(_,e,n){if(!t.__c.__H)return!0;var o=t.__c.__H.__.filter((function(_){return!!_.__c}));if(o.every((function(_){return!_.__N})))return!r||r.call(this,_,e,n);var l=t.__c.props!==_;return o.forEach((function(_){if(_.__N){var e=_.__[0];_.__=_.__N,_.__N=void 0,e!==_.__[0]&&(l=!0)}})),r&&r.call(this,_,e,n)||l};L.u=!0;var r=L.shouldComponentUpdate,l=L.componentWillUpdate;L.componentWillUpdate=function(_,e,n){if(this.__e){var t=r;r=void 0,o(_,e,n),r=t}l&&l.call(this,_,e,n)},L.shouldComponentUpdate=o}return t.__N||t.__}(n_,_)},u:function(_,n,t,o,r,l){n||(n={});var u,i,c=n;"ref"in n&&(u=n.ref,delete n.ref);var f={type:_,props:c,key:t,ref:u,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--F,__i:-1,__u:0,__source:r,__self:l};if("function"==typeof _&&(u=_.defaultProps))for(i in u)void 0===c[i]&&(c[i]=u[i]);return e.vnode&&e.vnode(f),f}}}
// Vite helpers
var __defProp=Object.defineProperty,__defNormalProp=(e,r,o)=>r in e?__defProp(e,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[r]=o,__publicField=(e,r,o)=>__defNormalProp(e,"symbol"!=typeof r?r+"":r,o);

// App code
const { u, h, D } = importPreact();
const style1 =
  '.glp-create-related-issue-layer {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 99999;\n  display: none;\n  background: rgba(0, 0, 0, 0.6);\n  justify-content: center;\n  align-items: center;\n}\n\n.glp-create-related-issue-layer.glp-modal-visible {\n  display: flex;\n}\n\n.glp-create-related-issue-layer .glp-create-related-issue-modal {\n  width: 700px;\n  max-width: 95vw;\n}\n\n.gl-new-dropdown-item .glp-item-check {\n  opacity: 0;\n}\n\n.gl-new-dropdown-item.glp-active .gl-new-dropdown-item-content {\n  box-shadow: inset 0 0 0 2px var(--gl-focus-ring-outer-color), inset 0 0 0 3px var(--gl-focus-ring-inner-color), inset 0 0 0 1px var(--gl-focus-ring-inner-color);\n  background-color: var(--gl-dropdown-option-background-color-unselected-hover);\n  outline: none;\n}\n\n.gl-new-dropdown-item.glp-selected .glp-item-check {\n  opacity: 1;\n}\n\n';
const style2 =
  '.glp-image-preview-modal {\n  position: fixed;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.6);\n  visibility: hidden;\n  opacity: 0;\n  pointer-events: none;\n  z-index: 99999;\n}\n\n.glp-image-preview-modal.glp-modal-visible {\n  visibility: visible;\n  opacity: 1;\n  pointer-events: auto;\n}\n\n.glp-image-preview-modal .glp-modal-img {\n  max-width: 95%;\n  max-height: 95%;\n}\n\n.glp-image-preview-modal .glp-modal-close {\n  position: absolute;\n  z-index: 2;\n  top: 20px;\n  right: 20px;\n  color: black;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: white;\n  border-radius: 20px;\n  cursor: pointer;\n}\n\n';
const style3 =
  '.glp-issue-preview-modal {\n  position: fixed;\n  display: flex;\n  padding: 0 15px;\n  background-color: var(--gl-background-color-default, var(--gl-color-neutral-0, #fff));\n  border: 1px solid var(--gl-border-color-default);\n  border-radius: .25rem;\n  width: 300px;\n  min-height: 300px;\n  z-index: 99999;\n  visibility: hidden;\n  top: 0;\n  left: 0;\n  opacity: 0;\n  pointer-events: none;\n  transition: all .2s ease-out;\n  transition-property: visibility, opacity, transform;\n}\n\n.glp-issue-preview-modal.glp-modal-visible {\n  visibility: visible;\n  opacity: 1;\n}\n\n.glp-issue-preview-modal .glp-issue-modal-inner {\n  display: flex;\n  flex-direction: column;\n  max-width: 100%;\n}\n\n\n.glp-issue-preview-modal .glp-block {\n  padding: .5rem 0 .5rem;\n  border-bottom-style: solid;\n  border-bottom-color: var(--gl-border-color-subtle, var(--gl-color-neutral-50, #ececef));\n  border-bottom-width: 1px;\n  width: 100%;\n}\n\n.glp-issue-preview-modal .assignee-grid {\n  margin-top: 4px;\n  gap: 4px\n}\n';

// libs/share/src/ui/GlobalStyle.ts
class GlobalStyle {
  static addStyle(key, styles) {
    const style =
      document.getElementById(key) ||
      (function () {
        const style22 = document.createElement('style');
        style22.id = key;
        document.head.appendChild(style22);
        return style22;
      })();
    style.textContent = styles;
  }
}

// apps/gitlab-plus/src/styles/index.ts
GlobalStyle.addStyle('glp-style', [style1, style2, style3].join('\n'));

// libs/share/src/ui/SvgComponent.ts
class SvgComponent {
  constructor(tag, props = {}) {
    this.element = Dom.createSvg({ tag, ...props });
  }
  addClassName(...className) {
    this.element.classList.add(...className);
  }
  event(event, callback) {
    this.element.addEventListener(event, callback);
  }
  getElement() {
    return this.element;
  }
  mount(parent) {
    parent.appendChild(this.element);
  }
}

// libs/share/src/ui/Dom.ts
const svgTags = [
  'animate',
  'animateMotion',
  'animateTransform',
  'circle',
  'clipPath',
  'defs',
  'desc',
  'ellipse',
  'feBlend',
  'feColorMatrix',
  'feComponentTransfer',
  'feComposite',
  'feConvolveMatrix',
  'feDiffuseLighting',
  'feDisplacementMap',
  'feDistantLight',
  'feDropShadow',
  'feFlood',
  'feFuncA',
  'feFuncB',
  'feFuncG',
  'feFuncR',
  'feGaussianBlur',
  'feImage',
  'feMerge',
  'feMergeNode',
  'feMorphology',
  'feOffset',
  'fePointLight',
  'feSpecularLighting',
  'feSpotLight',
  'feTile',
  'feTurbulence',
  'filter',
  'foreignObject',
  'g',
  'image',
  'line',
  'linearGradient',
  'marker',
  'mask',
  'metadata',
  'mpath',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'radialGradient',
  'rect',
  'set',
  'stop',
  'svg',
  'switch',
  'symbol',
  'text',
  'textPath',
  'tspan',
  'use',
  'view',
];
const commonTags = ['a', 'script', 'style', 'title'];
class Dom {
  static appendChildren(element, children) {
    if (children) {
      element.append(
        ...Dom.array(children).map((item) => {
          if (typeof item === 'string') {
            return document.createTextNode(item);
          }
          if (item instanceof HTMLElement || item instanceof SVGElement) {
            return item;
          }
          if (item instanceof Component || item instanceof SvgComponent) {
            return item.getElement();
          }
          if (Dom.isSvgItem(item, element)) {
            return Dom.createSvg(item);
          }
          return Dom.create(item);
        })
      );
    }
  }
  static create(data) {
    const element = document.createElement(data.tag);
    Dom.appendChildren(element, data.children);
    Dom.applyClass(element, data.classes);
    Dom.applyAttrs(element, data.attrs);
    Dom.applyEvents(element, data.events);
    Dom.applyStyles(element, data.styles);
    return element;
  }
  static element(tag, classes, children) {
    return Dom.create({ tag, classes, children });
  }
  static createSvg(data) {
    const element = document.createElementNS(
      'http://www.w3.org/2000/svg',
      data.tag
    );
    Dom.appendChildren(element, data.children);
    Dom.applyClass(element, data.classes);
    Dom.applyAttrs(element, data.attrs);
    Dom.applyEvents(element, data.events);
    Dom.applyStyles(element, data.styles);
    return element;
  }
  static array(element) {
    return Array.isArray(element) ? element : [element];
  }
  static elementSvg(tag, classes, children) {
    return Dom.createSvg({ tag, classes, children });
  }
  static applyAttrs(element, attrs) {
    if (attrs) {
      Object.entries(attrs).forEach(([key, value]) => {
        if (value === void 0 || value === false) {
          element.removeAttribute(key);
        } else {
          element.setAttribute(key, `${value}`);
        }
      });
    }
  }
  static applyStyles(element, styles) {
    if (styles) {
      Object.entries(styles).forEach(([key, value]) => {
        const name = key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
        element.style.setProperty(name, value);
      });
    }
  }
  static applyEvents(element, events) {
    if (events) {
      Object.entries(events).forEach(([name, callback]) => {
        element.addEventListener(name, callback);
      });
    }
  }
  static applyClass(element, classes) {
    if (classes) {
      element.classList.add(...classes.split(' ').filter(Boolean));
    }
  }
  static isSvgItem(item, parent) {
    if (commonTags.includes(item.tag)) {
      return parent instanceof SVGElement;
    }
    return svgTags.includes(item.tag);
  }
}

// libs/share/src/ui/Component.ts
class Component {
  constructor(tag, props = {}) {
    this.element = Dom.create({ tag, ...props });
  }
  addClassName(...className) {
    this.element.classList.add(...className);
  }
  event(event, callback) {
    this.element.addEventListener(event, callback);
  }
  getElement() {
    return this.element;
  }
  mount(parent) {
    parent.appendChild(this.element);
  }
}

// apps/gitlab-plus/src/components/issue-preview/IssueBlock.ts
class IssueBlock extends Component {
  constructor(title = '', content, classes = '', shouldRender = true) {
    super('div', {
      classes: 'glp-block',
      children: [
        {
          tag: 'div',
          classes:
            'gl-flex gl-items-center gl-font-bold gl-leading-20 gl-text-gray-900',
          children: title,
        },
        {
          tag: 'div',
          classes,
          children: content,
        },
      ],
    });
    this.shouldRender = shouldRender;
  }
}

// apps/gitlab-plus/src/components/common/IconComponent.ts
const buildId$1 =
  '236e3b687d786d9dfe4709143a94d4c53b8d5a1f235775401e5825148297fa84';
class IconComponent extends SvgComponent {
  constructor(icon, size = 's12', ...cls) {
    var _a;
    const svgSprite =
      ((_a = unsafeWindow.gon) == null ? void 0 : _a.sprite_icons) ||
      `/assets/icons-${buildId$1}.svg`;
    super('svg', {
      classes: ['gl-icon gl-fill-current', size, ...cls].join(' '),
      children: {
        tag: 'use',
        attrs: {
          href: `${svgSprite}#${icon}`,
        },
      },
    });
  }
}

// apps/gitlab-plus/src/components/common/StatusComponent.ts
class StatusComponent extends Component {
  constructor(isOpen) {
    super('span', {
      classes: `gl-badge badge badge-pill ${
        isOpen ? 'badge-success' : 'badge-info'
      }`,
      children: [
        new IconComponent(isOpen ? 'issue-open-m' : 'issue-close', 's16'),
        {
          tag: 'span',
          classes: 'gl-badge-content',
          children: isOpen ? 'Open' : 'Closed',
        },
      ],
    });
  }
}

// apps/gitlab-plus/src/components/issue-preview/IssueTitle.ts
class IssueTitle extends IssueBlock {
  constructor(issue) {
    super(
      issue.title,
      Dom.element('div', '', [
        {
          tag: 'div',
          classes: 'gl-flex',
          children: [
            new IconComponent('issue-type-issue', 's16', 'gl-mr-2'),
            {
              tag: 'span',
              classes: 'gl-text-sm gl-text-secondary gl-mr-4',
              children: `#${issue.iid}`,
            },
            new StatusComponent(issue.state === 'opened'),
          ],
        },
        {
          tag: 'div',
          styles: { maxHeight: '100px' },
          classes: 'gl-text-sm gl-text-gray-500, gl-truncate',
          children: issue.description,
        },
      ])
    );
  }
}

// apps/gitlab-plus/src/components/common/UserComponent.ts
class UserComponent extends Component {
  constructor(user, size = 's24') {
    super('div', {
      classes: 'gl-flex gl-w-full gl-items-center',
      children: [
        {
          tag: 'img',
          classes: `gl-avatar gl-avatar-circle gl-avatar-${size}`,
          attrs: {
            src: user.avatarUrl,
            alt: "${assignee.name}'s avatar",
          },
        },
        {
          tag: 'span',
          classes: 'gl-ml-3',
          children: user.name,
          styles: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
        },
      ],
    });
  }
}

// apps/gitlab-plus/src/components/issue-preview/IssueAssignee.ts
class IssueAssignee extends IssueBlock {
  constructor(issue) {
    super(
      'Assignee',
      issue.assignees.nodes.map((assignee) =>
        new UserComponent(assignee).getElement()
      ),
      'gl-flex gl-flex-col gl-gap-3',
      !!issue.assignees.nodes.length
    );
  }
}

// apps/gitlab-plus/src/components/common/LabelComponent.ts
class LabelComponent extends Component {
  constructor(label, onRemove) {
    super('span');
    this.setClasses(label);
    this.element.append(...this.html(label, onRemove));
  }
  html(label, onRemove) {
    const [scope, text] = label.title.split('::');
    const items = [
      {
        tag: 'span',
        classes: 'gl-label-text',
        children: scope,
      },
    ];
    if (text) {
      items.push({
        tag: 'span',
        classes: 'gl-label-text-scoped',
        children: text,
      });
    }
    const elements = [
      Dom.create({
        tag: 'span',
        classes: 'gl-link gl-label-link gl-label-link-underline',
        children: items,
      }),
    ];
    if (onRemove) {
      elements.push(
        Dom.create({
          tag: 'button',
          classes:
            'btn gl-label-close !gl-p-0 btn-reset btn-sm gl-button btn-reset-tertiary',
          attrs: {
            type: 'button',
          },
          events: { click: onRemove },
          children: {
            tag: 'span',
            classes: 'gl-button-text',
            children: new IconComponent('close-xs'),
          },
        })
      );
    }
    return elements;
  }
  setClasses(label) {
    this.addClassName(
      'gl-label',
      'hide-collapsed',
      label.textColor === '#FFFFFF'
        ? 'gl-label-text-light'
        : 'gl-label-text-dark'
    );
    if (label.title.includes('::')) {
      this.addClassName('gl-label-scoped');
    }
    this.element.style.setProperty('--label-background-color', label.color);
    this.element.style.setProperty(
      '--label-inset-border',
      `inset 0 0 0 2px ${label.color}`
    );
  }
}

// apps/gitlab-plus/src/components/issue-preview/IssueLabels.ts
class IssueLabels extends IssueBlock {
  constructor(issue) {
    super(
      'Labels',
      Dom.create({
        tag: 'div',
        classes: 'issuable-show-labels',
        children: issue.labels.nodes.map((label) => new LabelComponent(label)),
      }),
      '',
      !!issue.labels.nodes.length
    );
  }
}

// apps/gitlab-plus/src/components/issue-preview/IssueMilestone.ts
class IssueMilestone extends IssueBlock {
  constructor(issue) {
    super(
      'Milestone',
      issue.milestone
        ? [
            new IconComponent('milestone', 's16', 'gl-mr-2'),
            { tag: 'span', children: issue.milestone.title },
          ]
        : '',
      '',
      !!issue.milestone
    );
  }
}

// apps/gitlab-plus/src/components/issue-preview/IssueIteration.ts
class IssueIteration extends IssueBlock {
  constructor(issue) {
    var _a, _b;
    super(
      'Iteration',
      issue.iteration
        ? [
            new IconComponent('iteration', 's16', 'gl-mr-2'),
            {
              tag: 'span',
              children: IssueIteration.label(
                (_b =
                  (_a = issue.iteration) == null
                    ? void 0
                    : _a.iterationCadence) == null
                  ? void 0
                  : _b.title,
                issue.iteration.startDate,
                issue.iteration.dueDate
              ),
            },
          ]
        : '',
      '',
      !!issue.iteration
    );
  }
  static label(title, start, end) {
    const date = (date2) => {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
      }).format(new Date(date2));
    };
    return [title, ': ', date(start), ' - ', date(end)].join('');
  }
}

// apps/gitlab-plus/src/components/common/MergeRequestComponent.ts
const iconMap = {
  merged: 'merge',
  opened: 'merge-request',
  closed: 'merge-request-close',
  locked: 'search',
};
class MergeRequestComponent extends Component {
  constructor(mr) {
    super('div', {
      styles: {
        marginTop: '10px',
      },
      classes: `item-body `,
      children: [
        {
          tag: 'div',
          classes: 'item-title gl-flex gl-min-w-0 gl-gap-3',
          children: [
            new IconComponent(
              iconMap[mr.state] || 'empty',
              's16',
              'merge-request-status',
              mr.state
            ),
            {
              tag: 'span',
              classes: 'gl-text-gray-500',
              children: `!${mr.iid}`,
            },
            new UserComponent(mr.author, 's16'),
          ],
        },
        {
          tag: 'div',
          classes: 'item-title sortable-link',
          styles: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
          children: mr.title,
        },
      ],
    });
  }
}

// apps/gitlab-plus/src/components/issue-preview/IssueMergeRequests.ts
class IssueMergeRequests extends IssueBlock {
  constructor(issue) {
    super(
      'Merge requests',
      issue.relatedMergeRequests.nodes.map((mr) =>
        new MergeRequestComponent(mr).getElement()
      ),
      '',
      !!issue.relatedMergeRequests.nodes.length
    );
  }
}

// apps/gitlab-plus/src/components/issue-preview/IssueRelatedIssue.ts
const relationMap = {
  relates_to: 'Related to:',
  blocks: 'Blocks:',
  is_blocked_by: 'Is blocked by:',
};
class IssueRelatedIssue extends IssueBlock {
  constructor(issue) {
    super(
      '',
      IssueRelatedIssue.content(issue.relatedIssues),
      '',
      !!issue.relatedIssues.length
    );
  }
  static content(issues) {
    const groups = issues.reduce(
      (acc, issue) => ({
        ...acc,
        [issue.linkType]: [...acc[issue.linkType], issue],
      }),
      {
        relates_to: [],
        blocks: [],
        is_blocked_by: [],
      }
    );
    return Object.entries(groups)
      .filter(([_, issues2]) => issues2.length)
      .map(([key, issues2]) =>
        IssueRelatedIssue.group(relationMap[key], issues2)
      );
  }
  static group(title, issues) {
    return Dom.create({
      tag: 'div',
      styles: {
        marginTop: '10px',
      },
      classes: `item-body `,
      children: [
        {
          tag: 'div',
          classes: 'item-title gl-flex gl-min-w-0 gl-gap-3',
          children: {
            tag: 'span',
            children: title,
          },
        },
        ...issues.map((issue) =>
          Dom.create({
            tag: 'div',
            classes: 'item-title sortable-link',
            styles: {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
            children: `#${issue.iid} ${issue.title}`,
          })
        ),
      ],
    });
  }
}

// apps/gitlab-plus/src/components/issue-preview/IssueModalContent.ts
class IssueModalContent extends Component {
  constructor() {
    super('div', { classes: 'glp-issue-modal-inner' });
  }
  update(issue) {
    const components = [
      IssueTitle,
      IssueAssignee,
      IssueLabels,
      IssueMilestone,
      IssueIteration,
      IssueMergeRequests,
      IssueRelatedIssue,
    ];
    this.element.replaceChildren(
      ...components
        .map((IssueComponent) => new IssueComponent(issue))
        .filter((block) => block.shouldRender)
        .map((block) => block.getElement())
    );
  }
}

// apps/gitlab-plus/src/components/common/GitlabLoader.ts
class GitlabLoader extends Component {
  constructor(size = '1em') {
    super('span', {
      classes: 'gl-spinner-container',
      attrs: {
        role: 'status',
      },
      children: {
        tag: 'span',
        classes:
          'gl-spinner gl-spinner-sm gl-spinner-dark !gl-align-text-bottom',
        styles: {
          width: size,
          height: size,
        },
      },
    });
  }
}

// apps/gitlab-plus/src/components/IssuePreviewModal.ts
class IssuePreviewModal extends Component {
  constructor() {
    super('div', {
      classes: 'glp-issue-preview-modal',
      children: IssuePreviewModal.loader(),
    });
    __publicField(this, 'content', new IssueModalContent());
    __publicField(this, 'visibleClassName', 'glp-modal-visible');
    this.mount(document.body);
  }
  static loader() {
    return Dom.create({
      tag: 'div',
      classes: 'gl-flex gl-flex-1 gl-items-center gl-justify-center',
      children: new GitlabLoader('2em'),
    });
  }
  show(event) {
    Dom.applyStyles(this.element, {
      left: `${event.clientX + 10}px`,
      top: `${event.clientY + 10}px`,
      transform: 'translateY(0px)',
    });
    this.element.classList.add(this.visibleClassName);
  }
  fixPosition() {
    const rect = this.element.getBoundingClientRect();
    const dY = rect.height + rect.top - window.innerHeight;
    if (dY > 0) {
      this.element.style.transform = `translateY(-${dY + 15}px)`;
    }
  }
  hide() {
    this.element.classList.remove(this.visibleClassName);
    this.element.replaceChildren(IssuePreviewModal.loader());
    Dom.applyStyles(this.element, {
      transform: 'translateY(0px)',
    });
  }
  updateContent(issue) {
    this.content.update(issue);
    this.element.replaceChildren(this.content.getElement());
  }
}

// apps/gitlab-plus/src/helpers/IssueLink.ts
class IssueLink {
  static parseLink(link) {
    if (!IssueLink.validateLink(link)) {
      return void 0;
    }
    const [projectPath, issue] = new URL(link).pathname
      .replace(/^\//, '')
      .split('/-/issues/');
    const slashCount = (projectPath.match(/\//g) || []).length;
    const workspacePath =
      slashCount === 1 ? projectPath : projectPath.replace(/\/[^/]+$/, '');
    return {
      issue: issue.replace(/\D/g, ''),
      projectPath,
      workspacePath,
    };
  }
  static validateLink(link) {
    return Boolean(typeof link === 'string' && link.includes('/-/issues/'));
  }
}

// libs/share/src/store/Cache.ts
class Cache {
  constructor(prefix) {
    this.prefix = prefix;
  }
  isValid(item) {
    if (item) {
      return (
        item.expirationDate === 'lifetime' ||
        new Date(item.expirationDate) > new Date()
      );
    }
    return false;
  }
  getItem(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || '');
    } catch (e) {
      return void 0;
    }
  }
  get(key) {
    try {
      const data = this.getItem(this.key(key));
      if (this.isValid(data)) {
        return data.value;
      }
    } catch (e) {
      return void 0;
    }
    return void 0;
  }
  set(key, value, minutes) {
    localStorage.setItem(
      this.key(key),
      JSON.stringify({
        expirationDate: this.expirationDate(minutes),
        value,
      })
    );
  }
  expirationDate(minutes) {
    if (typeof minutes === 'string') {
      return minutes;
    }
    const time = new Date();
    time.setMinutes(time.getMinutes() + minutes);
    return time;
  }
  key(key) {
    return `${this.prefix}${key}`;
  }
  clearInvalid() {
    for (const key in localStorage) {
      if (key.startsWith(this.prefix) && !this.isValid(this.getItem(key))) {
        localStorage.removeItem(key);
      }
    }
  }
}

// libs/share/src/utils/camelizeKeys.ts
function camelizeKeys(data) {
  if (!data || ['string', 'number', 'boolean'].includes(typeof data)) {
    return data;
  }
  if (Array.isArray(data)) {
    return data.map(camelizeKeys);
  }
  const camelize = (key) => {
    const _key = key.replace(/[\-_\s]+(.)?/g, (_, chr) =>
      chr ? chr.toUpperCase() : ''
    );
    return _key.substring(0, 1).toLowerCase() + _key.substring(1);
  };
  return Object.entries(data).reduce(
    (result, [key, value]) => ({
      ...result,
      [camelize(key)]: camelizeKeys(value),
    }),
    {}
  );
}

// apps/gitlab-plus/src/providers/GitlabProvider.ts
class GitlabProvider {
  constructor() {
    __publicField(this, 'cache', new Cache('glp-'));
    __publicField(this, 'url', 'https://gitlab.com/api/v4/');
    __publicField(this, 'graphqlApi', 'https://gitlab.com/api/graphql');
  }
  async get(path) {
    const response = await fetch(`${this.url}${path}`, {
      method: 'GET',
      headers: this.headers(),
    });
    const data = await response.json();
    return camelizeKeys(data);
  }
  async post(path, body) {
    const response = await fetch(`${this.url}${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: this.headers(),
    });
    const data = await response.json();
    return camelizeKeys(data);
  }
  async query(query, variables) {
    const response = await fetch(this.graphqlApi, {
      method: 'POST',
      body: JSON.stringify({ variables, query }),
      headers: this.headers(),
    });
    return response.json();
  }
  async queryCached(key, query, variables, minutes) {
    return this.cached(key, () => this.query(query, variables), minutes);
  }
  async getCached(key, path, minutes) {
    return this.cached(key, () => this.get(path), minutes);
  }
  async cached(key, getValue, minutes) {
    const cacheValue = this.cache.get(key);
    if (cacheValue) {
      return cacheValue;
    }
    const value = await getValue();
    this.cache.set(key, value, minutes);
    return value;
  }
  csrf() {
    const token = document.querySelector('meta[name=csrf-token]');
    if (token) {
      return token.getAttribute('content');
    }
    return '';
  }
  headers() {
    const headers = {
      'content-type': 'application/json',
    };
    const csrf = this.csrf();
    if (csrf) {
      headers['X-CSRF-Token'] = csrf;
    }
    return headers;
  }
}

// apps/gitlab-plus/src/providers/query/label.ts
const labelFragment = `
  fragment Label on Label {
    id
    title
    description
    color
    textColor
    __typename
  }
`;
const labelsQuery = `query projectLabels($fullPath: ID!, $searchTerm: String) {
  workspace: project(fullPath: $fullPath) {
    id
    labels(searchTerm: $searchTerm, includeAncestorGroups: true) {
      nodes {
        ...Label
        __typename
      }
      __typename
    }
    __typename
  }
}

${labelFragment}
`;

// apps/gitlab-plus/src/providers/query/user.ts
const userFragment = `
fragment User on User {
  id
  avatarUrl
  name
  username
  webUrl
  webPath
  __typename
}
`;
const userQuery = `
query workspaceAutocompleteUsersSearch($search: String!, $fullPath: ID!, $isProject: Boolean = true) {
  groupWorkspace: group(fullPath: $fullPath) @skip(if: $isProject) {
    id
    users: autocompleteUsers(search: $search) {
      ...User
      ...UserAvailability
      __typename
    }
    __typename
  }
  workspace: project(fullPath: $fullPath) {
    id
    users: autocompleteUsers(search: $search) {
      ...User
      ...UserAvailability
      __typename
    }
    __typename
  }
}

${userFragment}
fragment UserAvailability on User {
  status {
    availability
    __typename
  }
  __typename
}
`;

// apps/gitlab-plus/src/providers/query/issue.ts
const issueQuery = `query issueEE($projectPath: ID!, $iid: String!) {
  project(fullPath: $projectPath) {
    id
    issue(iid: $iid) {
      id
      iid
      title
      description
      createdAt
      state
      confidential
      dueDate
      milestone {
        id
        title
        startDate
        dueDate
        __typename
      }
      iteration {
        id
        title
        startDate
        dueDate
        iterationCadence {
          id
          title
          __typename
        }
        __typename
      }
      labels {
        nodes {
          ...Label
        }
      }
      relatedMergeRequests {
        nodes {
          iid
          title
          state
          author {
            ...User
          }
        }
      }
      assignees {
        nodes {
          ...User
        }
      }
      weight
      type
      __typename
    }
    __typename
  }
}

${labelFragment}
${userFragment}
`;
const issuesQuery = `query groupWorkItems($searchTerm: String, $fullPath: ID!, $types: [IssueType!], $in: [IssuableSearchableField!], $includeAncestors: Boolean = false, $includeDescendants: Boolean = false, $iid: String = null, $searchByIid: Boolean = false, $searchByText: Boolean = true, $searchEmpty: Boolean = true) {
  workspace: group(fullPath: $fullPath) {
    id
    workItems(
      search: $searchTerm
      types: $types
      in: $in
      includeAncestors: $includeAncestors
      includeDescendants: $includeDescendants
    ) @include(if: $searchByText) {
      nodes {
        id
        iid
        title
        confidential
        project {
          fullPath
        }
        __typename
      }
      __typename
    }
    workItemsByIid: workItems(
      iid: $iid
      types: $types
      includeAncestors: $includeAncestors
      includeDescendants: $includeDescendants
    ) @include(if: $searchByIid) {
      nodes {
        id
        iid
        title
        confidential
        project {
          fullPath
        }
        __typename
      }
      __typename
    }
    workItemsEmpty: workItems(
      types: $types
      includeAncestors: $includeAncestors
      includeDescendants: $includeDescendants
    ) @include(if: $searchEmpty) {
      nodes {
        id
        iid
        title
        confidential
        project {
          fullPath
        }
        __typename
      }
      __typename
    }
    __typename
  }
}
`;
const issueMutation = `
mutation CreateIssue($input: CreateIssueInput!) {
  createIssuable: createIssue(input: $input) {
    issuable: issue {
      ...Issue
      __typename
    }
    errors
    __typename
  }
}

fragment Issue on Issue {
  ...IssueNode
  id
  weight
  blocked
  blockedByCount
  epic {
    id
    __typename
  }
  iteration {
    id
    title
    startDate
    dueDate
    iterationCadence {
      id
      title
      __typename
    }
    __typename
  }
  healthStatus
  __typename
}

fragment IssueNode on Issue {
  id
  iid
  title
  referencePath: reference(full: true)
  closedAt
  dueDate
  timeEstimate
  totalTimeSpent
  humanTimeEstimate
  humanTotalTimeSpent
  emailsDisabled
  confidential
  hidden
  webUrl
  relativePosition
  projectId
  type
  severity
  milestone {
    ...MilestoneFragment
    __typename
  }
  assignees {
    nodes {
      ...User
      __typename
    }
    __typename
  }
  labels {
    nodes {
      id
      title
      color
      description
      __typename
    }
    __typename
  }
  __typename
}

fragment MilestoneFragment on Milestone {
  expired
  id
  state
  title
  __typename
}

fragment User on User {
  id
  avatarUrl
  name
  username
  webUrl
  webPath
  __typename
}
`;

// apps/gitlab-plus/src/providers/IssueProvider.ts
class IssueProvider extends GitlabProvider {
  async getIssue(projectId, issueId) {
    return this.queryCached(
      `issue-${projectId}-${issueId}`,
      issueQuery,
      {
        projectPath: projectId,
        iid: issueId,
      },
      2
    );
  }
  async getIssues(projectId, search) {
    const searchById = !!search.match(/^\d+$/);
    return await this.query(issuesQuery, {
      iid: searchById ? search : null,
      searchByIid: searchById,
      searchEmpty: !search,
      searchByText: Boolean(search),
      fullPath: projectId,
      searchTerm: search,
      includeAncestors: true,
      includeDescendants: true,
      types: ['ISSUE'],
      in: 'TITLE',
    });
  }
  async createIssue(input) {
    return await this.query(issueMutation, { input });
  }
  async createIssueRelation(input) {
    const path = [
      'projects/:PROJECT_ID',
      '/issues/:ISSUE_ID/links',
      '?target_project_id=:TARGET_PROJECT_ID',
      '&target_issue_iid=:TARGET_ISSUE_IID',
      '&link_type=:LINK_TYPE',
    ]
      .join('')
      .replace(':PROJECT_ID', `${input.projectId}`)
      .replace(':ISSUE_ID', `${input.issueId}`)
      .replace(':TARGET_PROJECT_ID', input.targetProjectId)
      .replace(':TARGET_ISSUE_IID', input.targetIssueIid)
      .replace(':LINK_TYPE', input.linkType);
    return await this.post(path, {});
  }
  async getIssueLinks(projectId, issueId) {
    const path = 'projects/:PROJECT_ID/issues/:ISSUE_ID/links'
      .replace(':PROJECT_ID', `${projectId}`)
      .replace(':ISSUE_ID', `${issueId}`);
    return await this.getCached(`issue-${projectId}-${issueId}-links`, path, 2);
  }
}

// libs/share/src/ui/Events.ts
class Events {
  static intendHover(validate, mouseover, mouseleave, timeout = 500) {
    let hover = false;
    let id = 0;
    const onHover = (event) => {
      if (!event.target || !validate(event.target)) {
        return;
      }
      const element = event.target;
      hover = true;
      element.addEventListener(
        'mouseleave',
        (ev) => {
          mouseleave.call(element, ev);
          clearTimeout(id);
          hover = false;
        },
        { once: true }
      );
      clearTimeout(id);
      id = window.setTimeout(() => {
        if (hover) {
          mouseover.call(element, event);
        }
      }, timeout);
    };
    document.body.addEventListener('mouseover', onHover);
  }
}

// apps/gitlab-plus/src/services/IssuePreview.ts
class IssuePreview {
  constructor() {
    __publicField(this, 'modal', new IssuePreviewModal());
    __publicField(this, 'issue', new IssueProvider());
  }
  init() {
    Events.intendHover(
      (element) => IssueLink.validateLink(element.href),
      this.onHover.bind(this),
      this.onLeave.bind(this)
    );
  }
  async onHover(event) {
    const anchor = event.target;
    const link = IssueLink.parseLink(anchor.href);
    if (!link) {
      return;
    }
    anchor.title = '';
    this.modal.show(event);
    const response = await this.issue.getIssue(link.projectPath, link.issue);
    const relatedIssues = await this.issue.getIssueLinks(
      response.data.project.id.replace(/\D/g, ''),
      response.data.project.issue.iid
    );
    this.modal.updateContent({ ...response.data.project.issue, relatedIssues });
    setTimeout(this.modal.fixPosition.bind(this.modal), 300);
  }
  onLeave() {
    this.modal.hide();
  }
}

// libs/share/src/utils/clsx.ts
function clsx(...args) {
  return args.filter((c) => typeof c === 'string').join('');
}

// apps/gitlab-plus/src/components/common/Icon.tsx
const buildId =
  '236e3b687d786d9dfe4709143a94d4c53b8d5a1f235775401e5825148297fa84';
const iconUrl = (icon) => {
  var _a;
  const svgSprite =
    ((_a = unsafeWindow.gon) == null ? void 0 : _a.sprite_icons) ||
    `/assets/icons-${buildId}.svg`;
  return `${svgSprite}#${icon}`;
};
function Icon({ icon, size = 12, className }) {
  return u('svg', {
    className: clsx('gl-icon gl-fill-current', `s${size}`, className),
    children: u('use', { href: iconUrl(icon) }),
  });
}

// apps/gitlab-plus/src/components/ImagePreviewModal.tsx
function ImagePreviewModal() {
  const [src, setSrc] = h('');
  return u('div', {
    className: clsx(
      'glp-image-preview-modal',
      Boolean(src) && 'glp-modal-visible'
    ),
    children: [
      u('img', { className: 'glp-modal-img', src, alt: 'Image preview' }),
      u('div', {
        className: 'glp-modal-close',
        onClose: () => setSrc(''),
        children: u(Icon, { icon: 'close-xs', size: 24 }),
      }),
    ],
  });
}

// apps/gitlab-plus/src/services/ImagePreview.tsx
class ImagePreview {
  init() {
    document.body.addEventListener('click', this.onClick.bind(this));
    const root = document.createElement('div');
    document.body.appendChild(root);
    D(u(ImagePreviewModal, {}), root);
  }
  onClick(event) {
    const element = this.getAnchor(event.target);
    if (!element) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
  validate(element) {
    return (
      element.classList.contains('no-attachment-icon') &&
      /\.(png|jpg|jpeg|heic)$/.test(element.href.toLowerCase())
    );
  }
  getAnchor(element) {
    if (!element) {
      return void 0;
    }
    if (element instanceof HTMLAnchorElement) {
      return this.validate(element) ? element : void 0;
    }
    if (
      element instanceof HTMLImageElement &&
      element.parentElement instanceof HTMLAnchorElement
    ) {
      return this.validate(element.parentElement)
        ? element.parentElement
        : void 0;
    }
    return void 0;
  }
}

// apps/gitlab-plus/src/components/common/CloseButton.ts
class CloseButton extends Component {
  constructor(onClick, title = 'Close') {
    super('button', {
      classes:
        'btn js-issue-item-remove-button gl-mr-2 btn-default btn-sm gl-button btn-default-tertiary btn-icon',
      attrs: {
        type: 'button',
        title,
      },
      events: {
        click: onClick,
      },
      children: new IconComponent('close-xs', 's16'),
    });
  }
}

// apps/gitlab-plus/src/components/create-related-issue/CreateRelatedIssueModalHeader.ts
class CreateRelatedIssueModalHeader extends Component {
  constructor(onClose) {
    super('div', {
      classes:
        'crud-header gl-border-b gl-flex gl-flex-wrap gl-justify-between gl-gap-x-5 gl-gap-y-2 gl-rounded-t-form gl-border-section gl-bg-section gl-px-5 gl-py-4 gl-relative',
      children: [
        {
          tag: 'h2',
          classes:
            'gl-m-0 gl-inline-flex gl-items-center gl-gap-3 gl-text-form gl-font-bold gl-leading-normal',
          children: 'Create related issue',
        },
        new CloseButton(onClose),
      ],
    });
  }
}

// apps/gitlab-plus/src/components/common/form/Field.ts
class Field extends Component {
  constructor(title, input, hint = '') {
    super('fieldset', {
      classes: 'form-group gl-form-group gl-w-full is-valid',
      children: [
        {
          tag: 'legend',
          classes: 'bv-no-focus-ring col-form-label pt-0 col-form-label',
          children: title,
        },
        input,
        {
          tag: 'small',
          children: hint,
        },
      ],
    });
  }
}

// apps/gitlab-plus/src/components/create-related-issue/form/FormTitle.ts
class FormTitle extends Field {
  constructor() {
    const input = Dom.create({
      tag: 'input',
      classes: 'gl-form-input gl-mb-3 form-control is-valid',
      attrs: { placeholder: 'Add a title' },
    });
    super('Title', input, 'Maximum of 255 characters');
    __publicField(this, 'value', '');
    input.addEventListener('input', this.onChange.bind(this));
  }
  onChange(e) {
    this.value = e.target.value;
  }
  reset() {
    this.value = '';
  }
}

// libs/share/src/utils/debounce.ts
function debounce(callback, wait = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => callback(...args), wait);
  };
}

// apps/gitlab-plus/src/components/common/form/DropdownSearch.ts
class DropdownSearch extends Component {
  constructor(onChange, navigate) {
    super('div', {
      classes: 'gl-border-b-1 gl-border-b-solid gl-border-b-dropdown',
    });
    __publicField(this, 'input');
    this.onChange = onChange;
    this.navigate = navigate;
    this.input = this.getSearchInput();
    this.element.append(this.getSearch());
  }
  getSearch() {
    return Dom.create({
      tag: 'div',
      classes: 'gl-listbox-search gl-listbox-topmost',
      children: [
        new IconComponent('search', 's16', 'gl-search-box-by-type-search-icon'),
        this.input,
        {
          tag: 'div',
          classes: 'gl-search-box-by-type-right-icons',
          styles: { top: '0' },
          children: new CloseButton(() => {
            this.input.value = '';
            this.onChange('');
          }, 'Clear input'),
        },
      ],
    });
  }
  getSearchInput() {
    const search = debounce(this.onChange.bind(this));
    return Dom.create({
      tag: 'input',
      classes: 'gl-listbox-search-input',
      events: {
        input: () => search(this.input.value),
        keydown: (e) => this.navigate(e.key),
      },
    });
  }
  reset() {
    this.input.value = '';
  }
  focus() {
    this.input.focus();
  }
}

// libs/share/src/utils/id.ts
function randomId(length = 5, prefix = '') {
  const rand = () => (Math.random() + 1).toString(36).replace(/[\d.]/g, '');
  const chars = new Array(Math.ceil(length / 4)).fill(0).map(rand).join('');
  return `${prefix}${chars.substring(0, length)}`;
}

// apps/gitlab-plus/src/components/common/form/DropdownList.ts
class DropdownList extends Component {
  constructor(renderItem, onClick, removeFromRecent = void 0) {
    super('div', {
      classes:
        'gl-new-dropdown-contents gl-new-dropdown-contents-with-scrim-overlay bottom-scrim-visible gl-new-dropdown-contents',
    });
    __publicField(this, 'list');
    __publicField(this, 'id', randomId(5, 'glp-list-'));
    this.renderItem = renderItem;
    this.onClick = onClick;
    this.removeFromRecent = removeFromRecent;
    this.list = Dom.element('ul', `gl-mb-0 gl-pl-0 ${this.id}`);
    this.element.append(this.list);
  }
  render(items, recently, selected) {
    this.list.replaceChildren();
    if (recently.length) {
      this.list.append(
        Dom.create({
          tag: 'li',
          classes:
            'gl-pb-2 gl-pl-4 gl-pt-3 gl-text-sm gl-font-bold gl-text-strong',
          children: 'Recently used',
        })
      );
      this.list.append(
        ...recently.map((item, i) => this.listItem(item, selected, i, true))
      );
    }
    if (items.length) {
      this.list.append(
        Dom.create({
          tag: 'li',
          classes:
            'gl-pb-2 gl-pl-4 gl-pt-3 gl-text-sm gl-font-bold gl-text-strong gl-border-t',
        })
      );
      this.list.append(
        ...items.map((item, i) =>
          this.listItem(item, selected, recently.length + i)
        )
      );
    }
    if (items.length + recently.length === 0) {
      this.list.append(
        Dom.create({
          tag: 'li',
          classes: 'gl-p-4',
          children: 'No options',
        })
      );
    }
  }
  updateActive(index) {
    const activeClass = `glp-active`;
    const itemClass = `glp-item-${index}`;
    const prevActiveItem = document.querySelector(
      `.${this.id} .${activeClass}`
    );
    if (prevActiveItem && !prevActiveItem.classList.contains(itemClass)) {
      prevActiveItem.classList.remove(activeClass);
    }
    const selectedItem = document.querySelector(`.${this.id} .${itemClass}`);
    if (selectedItem && !selectedItem.classList.contains(activeClass)) {
      selectedItem.classList.add(activeClass);
      selectedItem.scrollIntoView({ block: 'center' });
    }
  }
  updateSelected(selected) {
    const selectedIds = selected.map((i) => i.id);
    const selectedClass = `glp-selected`;
    const items = document.querySelectorAll(
      `.${this.id} .gl-new-dropdown-item`
    );
    items.forEach((item) => {
      const id = item.dataset.id;
      if (id && selectedIds.includes(id)) {
        item.classList.add(selectedClass);
      } else {
        item.classList.remove(selectedClass);
      }
    });
  }
  listItem(item, selected, index, removeItem = false) {
    const selectedIds = selected.map((i) => i.id);
    const selectedClass = selectedIds.includes(item.id) ? 'glp-selected' : '';
    return Dom.create({
      tag: 'li',
      classes: `gl-new-dropdown-item ${selectedClass} glp-item-${index}`,
      events: {
        click: () => this.onClick(item),
      },
      attrs: {
        'data-id': item.id,
      },
      children: {
        tag: 'span',
        classes: 'gl-new-dropdown-item-content',
        children: [
          new IconComponent(
            'mobile-issue-close',
            's16',
            'glp-item-check gl-pr-2'
          ),
          this.renderItem(item),
          ...(removeItem ? [this.renderRemove(item)] : []),
        ],
      },
    });
  }
  renderRemove(item) {
    const onClose = (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.removeFromRecent && this.removeFromRecent(item);
    };
    return new CloseButton(onClose, 'Remove from recently used');
  }
}

// apps/gitlab-plus/src/components/common/form/DropdownButton.ts
class DropdownButton extends Component {
  constructor(renderLabel, setVisible, reset) {
    super('button', {
      classes:
        'btn btn-default btn-md btn-block gl-button gl-new-dropdown-toggle',
      attrs: {
        type: 'button',
      },
      events: {
        click: () => setVisible(true),
      },
    });
    __publicField(
      this,
      'buttonLabel',
      Dom.element('span', 'gl-new-dropdown-button-text')
    );
    __publicField(
      this,
      'icon',
      Dom.create({
        tag: 'span',
        children: [new IconComponent('chevron-lg-down', 's16').getElement()],
      })
    );
    this.renderLabel = renderLabel;
    this.reset = reset;
    document.body.addEventListener('click', (e) => {
      if (e.target !== this.element && !this.element.contains(e.target)) {
        setVisible(false);
      }
    });
    this.element.append(this.buttonInner());
  }
  render(items) {
    this.buttonLabel.replaceChildren(this.renderLabel(items));
    const icon = new IconComponent(
      items.length ? 'close-xs' : 'chevron-lg-down',
      's16'
    ).getElement();
    if (items.length) {
      icon.addEventListener('click', (e) => {
        e.preventDefault();
        this.reset();
      });
    }
    this.icon.replaceChildren(icon);
  }
  buttonInner() {
    return Dom.create({
      tag: 'span',
      classes: 'gl-button-text gl-w-full',
      children: [this.buttonLabel, this.icon],
    });
  }
}

// apps/gitlab-plus/src/components/common/form/DropdownModal.ts
class DropdownModal extends Component {
  constructor(search, list) {
    super('div', {
      classes: 'gl-new-dropdown-panel gl-absolute',
      styles: {
        top: '100%',
        left: '0',
        width: '100%',
        maxWidth: '800px',
      },
      events: {
        click: (e) => e.stopPropagation(),
      },
      children: {
        tag: 'div',
        classes: 'gl-new-dropdown-inner',
        children: [search, list],
      },
    });
  }
  setVisible(visible) {
    if (visible) {
      this.element.classList.add('!gl-block');
    } else {
      this.element.classList.remove('!gl-block');
    }
  }
}

// apps/gitlab-plus/src/providers/RecentProvider.ts
class RecentProvider {
  constructor(key) {
    __publicField(this, 'cache', new Cache('glp-'));
    __publicField(this, 'key');
    this.key = `recent-${key}`;
  }
  get() {
    return this.cache.get(this.key) || [];
  }
  add(...items) {
    const itemsId = items.map((i) => i.id);
    this.cache.set(
      this.key,
      [...items, ...this.get().filter((el) => !itemsId.includes(el.id))],
      'lifetime'
    );
  }
  remove(...items) {
    const itemsId = items.map((i) => i.id);
    this.cache.set(
      this.key,
      this.get().filter((el) => !itemsId.includes(el.id)),
      'lifetime'
    );
  }
}

// apps/gitlab-plus/src/components/common/form/Dropdown.ts
class Dropdown extends Field {
  constructor(title, key, isMultiselect = false) {
    const container = Dom.element(
      'div',
      'gl-relative gl-w-full gl-new-dropdown !gl-block'
    );
    super(title, container);
    __publicField(this, 'value', []);
    __publicField(this, 'items', []);
    __publicField(this, 'recently', []);
    __publicField(this, 'extra', Dom.element('div'));
    __publicField(this, 'recent');
    __publicField(this, 'searchTerm', '');
    __publicField(this, 'button');
    __publicField(this, 'modal');
    __publicField(this, 'search');
    __publicField(this, 'list');
    __publicField(this, 'selectedIndex', -1);
    this.isMultiselect = isMultiselect;
    this.recent = new RecentProvider(key);
    this.search = new DropdownSearch(
      this.load.bind(this),
      this.navigate.bind(this)
    );
    this.list = new DropdownList(
      this.renderItem.bind(this),
      this.onSelect.bind(this),
      this.removeFromRecent.bind(this)
    );
    this.modal = new DropdownModal(
      this.search.getElement(),
      this.list.getElement()
    );
    this.button = new DropdownButton(
      this.renderLabel.bind(this),
      (visible) => {
        if (visible) {
          this.showList();
        } else {
          this.closeList();
        }
      },
      this.reset.bind(this)
    );
    container.append(
      this.extra,
      this.button.getElement(),
      this.modal.getElement()
    );
    this.button.render(this.value);
    this.list.render(this.items, this.recently, this.value);
  }
  updateItems(items, search = '') {
    this.searchTerm = search;
    this.items = items;
    this.render();
  }
  onSelect(item) {
    if (this.isMultiselect) {
      if (this.value.find((i) => i.id === item.id)) {
        this.value = this.value.filter((i) => i.id !== item.id);
      } else {
        this.value.push(item);
      }
      this.search.focus();
    } else {
      this.value = [item];
      this.closeList();
    }
    this.button.render(this.value);
    this.list.updateSelected(this.value);
    this.onChange();
  }
  reset() {
    this.searchTerm = '';
    this.value = [];
    this.button.render(this.value);
    this.search.reset();
    this.load(this.searchTerm);
  }
  persistRecent() {
    this.recent.add(...this.value);
    this.render();
  }
  removeFromRecent(item) {
    this.recent.remove(item);
    this.render();
  }
  getValue() {
    return this.value;
  }
  showList() {
    this.modal.setVisible(true);
    this.search.focus();
  }
  closeList() {
    this.modal.setVisible(false);
    this.search.reset();
    this.load('');
  }
  itemsToRender() {
    const recent = this.recent.get();
    const recentlyIds = recent.map((i) => i.id);
    const itemsIds = this.items.map((i) => i.id);
    const itemsToRender = this.items.filter((i) => !recentlyIds.includes(i.id));
    const recentItemsToRender = this.searchTerm.length
      ? recent.filter((i) => itemsIds.includes(i.id))
      : recent;
    return {
      items: itemsToRender,
      recent: recentItemsToRender,
    };
  }
  navigate(key) {
    if (['ArrowDown', 'ArrowUp'].includes(key)) {
      const { recent, items } = this.itemsToRender();
      const total = recent.length + items.length;
      const diff = key === 'ArrowDown' ? 1 : -1;
      this.selectedIndex = (this.selectedIndex + diff + total) % total;
      this.list.updateActive(this.selectedIndex);
    } else if (key === 'Enter') {
      const { recent, items } = this.itemsToRender();
      const allItems = [...recent, ...items];
      if (-1 < this.selectedIndex && this.selectedIndex < allItems.length) {
        this.onSelect(allItems[this.selectedIndex]);
      }
    } else if (key === 'Escape') {
      this.closeList();
    }
  }
  render() {
    const { recent, items } = this.itemsToRender();
    this.list.render(items, recent, this.value);
    this.list.updateActive(this.selectedIndex);
  }
}

// apps/gitlab-plus/src/providers/query/project.ts
const projectsQuery = `query boardsGetGroupProjects($fullPath: ID!, $search: String, $after: String) {
  group(fullPath: $fullPath) {
    id
    projects(search: $search, after: $after, first: 100, includeSubgroups: true) {
      nodes {
        id
        name
        avatarUrl
        fullPath
        nameWithNamespace
        archived
        __typename
      }
      pageInfo {
        ...PageInfo
        __typename
      }
      __typename
    }
    __typename
  }
}

fragment PageInfo on PageInfo {
  hasNextPage
  hasPreviousPage
  startCursor
  endCursor
  __typename
}

`;

// apps/gitlab-plus/src/providers/ProjectsProvider.ts
class ProjectsProvider extends GitlabProvider {
  async getProjects(projectId, search = '') {
    return this.queryCached(
      `projects-${projectId}-${search}`,
      projectsQuery,
      {
        fullPath: projectId,
        search,
      },
      search === '' ? 20 : 0.5
    );
  }
}

// apps/gitlab-plus/src/components/create-related-issue/form/FormProject.ts
class FormProject extends Dropdown {
  constructor(link) {
    super('Project', 'projects');
    __publicField(this, 'projects', new ProjectsProvider());
    this.link = link;
    this.load();
  }
  async load(search = '') {
    const projects = await this.projects.getProjects(
      this.link.workspacePath,
      search
    );
    this.updateItems(projects.data.group.projects.nodes, search);
  }
  renderItem(item) {
    const image = item.avatarUrl
      ? Dom.create({
          tag: 'img',
          attrs: {
            src: item.avatarUrl,
            alt: item.name,
          },
          classes: 'gl-mr-3 gl-avatar gl-avatar-s32',
        })
      : Dom.create({
          tag: 'div',
          classes:
            'gl-mr-3 gl-avatar gl-avatar-identicon gl-avatar-s32 gl-avatar-identicon-bg1',
          children: item.name[0].toUpperCase(),
        });
    const label = Dom.create({
      tag: 'span',
      children: [
        { tag: 'span', classes: 'gl-mr-2 gl-block', children: item.name },
        {
          tag: 'span',
          classes: 'gl-block gl-text-secondary',
          children: item.nameWithNamespace,
        },
      ],
    });
    return Dom.create({
      tag: 'span',
      classes: 'gl-new-dropdown-item-text-wrapper',
      children: [
        {
          tag: 'span',
          classes: 'gl-flex gl-w-full gl-items-center',
          children: [image, label],
        },
      ],
    });
  }
  renderLabel([item]) {
    return Dom.create({
      tag: 'div',
      children: item ? item.nameWithNamespace : 'Select project',
    });
  }
  onChange() {}
}

// apps/gitlab-plus/src/providers/LabelsProvider.ts
class LabelsProvider extends GitlabProvider {
  async getLabels(projectId, search = '') {
    return this.queryCached(
      `labels-${projectId}-${search}`,
      labelsQuery,
      {
        fullPath: projectId,
        searchTerm: search,
      },
      search === '' ? 20 : 0.5
    );
  }
}

// apps/gitlab-plus/src/components/create-related-issue/form/FormLabels.ts
class FormLabel extends Dropdown {
  constructor(link) {
    super('Labels', 'labels', true);
    __publicField(this, 'labels', new LabelsProvider());
    this.link = link;
    this.extra.classList.add(
      'gl-mt-1',
      'gl-pb-2',
      'gl-flex',
      'gl-flex-wrap',
      'gl-gap-2'
    );
    this.load();
  }
  async load(search = '') {
    const labels = await this.labels.getLabels(this.link.projectPath, search);
    this.updateItems(labels.data.workspace.labels.nodes, search);
  }
  renderItem(item) {
    return Dom.create({
      tag: 'div',
      classes: 'gl-flex gl-flex-1 gl-break-anywhere gl-pb-3 gl-pl-4 gl-pt-3',
      children: [
        {
          tag: 'span',
          classes: 'dropdown-label-box gl-top-0 gl-mr-3 gl-shrink-0',
          styles: {
            backgroundColor: item.color,
          },
        },
        {
          tag: 'span',
          children: item.title,
        },
      ],
    });
  }
  renderLabel(items) {
    let label = 'Select label';
    if (items.length !== 0) {
      label = items
        .slice(0, 2)
        .map((i) => i.title)
        .join(', ');
    }
    if (items.length > 2) {
      label += `, ${items.length - 2}+`;
    }
    return Dom.create({
      tag: 'div',
      children: label,
    });
  }
  onChange() {
    this.extra.replaceChildren(
      ...this.value.map((item) =>
        new LabelComponent(item, () => this.onSelect(item)).getElement()
      )
    );
  }
}

// apps/gitlab-plus/src/providers/query/milestone.ts
const milestoneQuery = `query projectMilestones($fullPath: ID!, $title: String, $state: MilestoneStateEnum) {
  workspace: project(fullPath: $fullPath) {
    id
    attributes: milestones(
      searchTitle: $title
      state: $state
      sort: EXPIRED_LAST_DUE_DATE_ASC
      first: 20
      includeAncestors: true
    ) {
      nodes {
        ...MilestoneFragment
        state
        __typename
      }
      __typename
    }
    __typename
  }
}

fragment MilestoneFragment on Milestone {
  id
  iid
  title
  webUrl: webPath
  dueDate
  expired
  __typename
}

`;

// apps/gitlab-plus/src/providers/MilestonesProvider.ts
class MilestonesProvider extends GitlabProvider {
  async getMilestones(projectId, title = '') {
    return this.queryCached(
      `milestones-${projectId}-${title}`,
      milestoneQuery,
      {
        fullPath: projectId,
        state: 'active',
        title,
      },
      title === '' ? 20 : 0.5
    );
  }
}

// apps/gitlab-plus/src/components/create-related-issue/form/FormMilestone.ts
class FormMilestone extends Dropdown {
  constructor(link) {
    super('Milestone', 'milestones');
    __publicField(this, 'milestones', new MilestonesProvider());
    this.link = link;
    this.load();
  }
  async load(search = '') {
    const milestones = await this.milestones.getMilestones(
      this.link.projectPath,
      search
    );
    this.updateItems(milestones.data.workspace.attributes.nodes, search);
  }
  renderItem(item) {
    return Dom.create({
      tag: 'span',
      classes: 'gl-new-dropdown-item-text-wrapper',
      children: [
        {
          tag: 'span',
          classes: 'gl-flex gl-w-full gl-items-center',
          children: {
            tag: 'span',
            classes: 'gl-mr-2 gl-block',
            children: item.title,
          },
        },
      ],
    });
  }
  renderLabel([item]) {
    return Dom.create({
      tag: 'div',
      children: item ? item.title : 'Select milestone',
    });
  }
  onChange() {}
}

// apps/gitlab-plus/src/providers/query/iteration.ts
const iterationFragment = `fragment IterationFragment on Iteration {
  id
  title
  startDate
  dueDate
  webUrl
  iterationCadence {
    id
    title
    __typename
  }
  __typename
}`;
const iterationQuery = `query issueIterationsAliased($fullPath: ID!, $title: String, $state: IterationState) {
  workspace: group(fullPath: $fullPath) {
    id
    attributes: iterations(
      search: $title
      in: [TITLE, CADENCE_TITLE]
      state: $state
    ) {
      nodes {
        ...IterationFragment
        state
        __typename
      }
      __typename
    }
    __typename
  }
}
${iterationFragment}
`;

// apps/gitlab-plus/src/providers/IterationsProvider.ts
class IterationsProvider extends GitlabProvider {
  async getIterations(projectId, title = '') {
    return this.queryCached(
      `iterations-${projectId} `,
      iterationQuery,
      {
        fullPath: projectId,
        title,
        state: 'opened',
      },
      title !== '' ? 0.5 : 20
    );
  }
}

// apps/gitlab-plus/src/components/create-related-issue/form/FormIteration.ts
class FormIteration extends Dropdown {
  constructor(link) {
    super('Iteration', 'iterations');
    __publicField(this, 'iterations', new IterationsProvider());
    this.link = link;
    this.load();
  }
  async load(search = '') {
    const response = await this.iterations.getIterations(
      this.link.workspacePath,
      search
    );
    const iterationsNamed = response.data.workspace.attributes.nodes
      .map((iteration) => ({
        ...iteration,
        name: this.iterationName(iteration),
      }))
      .toSorted((a, b) => a.name.localeCompare(b.name));
    this.updateItems(iterationsNamed, search);
  }
  iterationName(iteration) {
    const start = new Date(iteration.startDate).toLocaleDateString();
    const end = new Date(iteration.dueDate).toLocaleDateString();
    return `${iteration.iterationCadence.title}: ${start} - ${end}`;
  }
  renderItem(item) {
    return Dom.create({
      tag: 'span',
      classes: 'gl-new-dropdown-item-text-wrapper',
      children: [
        {
          tag: 'span',
          classes: 'gl-flex gl-w-full gl-items-center',
          children: {
            tag: 'span',
            classes: 'gl-mr-2 gl-block',
            children: item.name,
          },
        },
      ],
    });
  }
  renderLabel([item]) {
    return Dom.create({
      tag: 'div',
      children: item ? item.name : 'Select iteration',
    });
  }
  onChange() {}
}

// apps/gitlab-plus/src/providers/UsersProvider.ts
class UsersProvider extends GitlabProvider {
  async getUsers(projectId, search = '') {
    return this.queryCached(
      `users-${projectId}-${search}`,
      userQuery,
      {
        fullPath: projectId,
        search,
      },
      search === '' ? 20 : 0.5
    );
  }
}

// apps/gitlab-plus/src/components/create-related-issue/form/FormAssignees.ts
class FormAssignees extends Dropdown {
  constructor(link) {
    super('Assignees', 'assignees', true);
    __publicField(this, 'assignees', new UsersProvider());
    this.link = link;
    this.load('');
  }
  async load(search) {
    const response = await this.assignees.getUsers(
      this.link.projectPath,
      search
    );
    this.updateItems(response.data.workspace.users, search);
  }
  renderItem(item) {
    const image = Dom.create({
      tag: 'img',
      classes: 'gl-avatar gl-avatar-circle gl-avatar-s32',
      attrs: { src: item.avatarUrl },
    });
    const label = Dom.create({
      tag: 'div',
      classes: 'gl-avatar-labeled-labels !gl-text-left',
      children: [
        {
          tag: 'div',
          classes:
            '-gl-mx-1 -gl-my-1 gl-flex gl-flex-wrap gl-items-center !gl-text-left',
          children: {
            tag: 'span',
            classes: 'gl-avatar-labeled-label',
            children: item.name,
          },
        },
        {
          tag: 'span',
          classes: 'gl-avatar-labeled-sublabel',
          children: item.username,
        },
      ],
    });
    return Dom.create({
      tag: 'span',
      classes:
        'gl-avatar-labeled sidebar-participant gl-relative gl-items-center gl-new-dropdown-item-text-wrapper',
      children: [image, label],
    });
  }
  renderLabel(items) {
    const label = items.map((i) => i.name).join(', ');
    return Dom.create({
      tag: 'div',
      attrs: {
        title: label,
      },
      children: items.length ? label : 'Select assignee',
    });
  }
  onChange() {}
}

// apps/gitlab-plus/src/components/create-related-issue/form/FormRelation.ts
class FormRelation extends Field {
  constructor() {
    const container = Dom.element('div', 'linked-issue-type-radio');
    super('New issue', container);
    __publicField(this, 'value', '');
    container.append(
      this.radio('blocks current issue', 'blocks'),
      this.radio('is blocked by current issue', 'is_blocked_by'),
      this.radio('relates to current issue', 'related')
    );
  }
  onChange(e) {
    this.value = e.target.value;
  }
  radio(label, value) {
    const id = `input-${Math.random()}`;
    return Dom.create({
      tag: 'div',
      classes: 'gl-form-radio custom-control custom-radio',
      children: [
        {
          tag: 'input',
          classes: 'custom-control-input',
          attrs: {
            id,
            name: 'linked-issue-type-radio',
            value,
            type: 'radio',
          },
          events: {
            change: this.onChange.bind(this),
          },
        },
        {
          tag: 'label',
          classes: 'custom-control-label',
          attrs: {
            for: id,
          },
          children: label,
        },
      ],
    });
  }
  reset() {
    this.value = '';
  }
}

// apps/gitlab-plus/src/components/create-related-issue/CreateRelatedIssueModalContent.ts
class CreateRelatedIssueModalContent extends Component {
  constructor(link, onClose) {
    super('form', {
      classes: 'crud-body add-tree-form gl-mx-5 gl-my-4 gl-rounded-b-form',
    });
    __publicField(this, 'issueProvider', new IssueProvider());
    __publicField(this, 'title');
    __publicField(this, 'project');
    __publicField(this, 'labels');
    __publicField(this, 'milestone');
    __publicField(this, 'iteration');
    __publicField(this, 'assignees');
    __publicField(this, 'relation');
    this.link = link;
    this.onClose = onClose;
    this.title = new FormTitle();
    this.project = new FormProject(this.link);
    this.labels = new FormLabel(this.link);
    this.milestone = new FormMilestone(this.link);
    this.iteration = new FormIteration(this.link);
    this.assignees = new FormAssignees(this.link);
    this.relation = new FormRelation();
    this.element.append(
      this.title.getElement(),
      this.row([this.project, this.milestone]),
      this.row([this.iteration, this.assignees]),
      this.row(this.labels),
      this.row(this.relation),
      Dom.create({
        tag: 'button',
        classes: 'btn btn-confirm btn-sm gl-button',
        attrs: {
          type: 'button',
        },
        events: {
          click: this.createIssue.bind(this),
        },
        children: {
          tag: 'span',
          classes: 'gl-button-text',
          children: 'Add',
        },
      })
    );
  }
  row(items) {
    return Dom.create({
      tag: 'div',
      classes: 'gl-flex gl-gap-x-3',
      children: items,
    });
  }
  reset() {
    this.element.reset();
    this.title.reset();
    this.relation.reset();
    this.project.reset();
    this.milestone.reset();
    this.iteration.reset();
    this.assignees.reset();
    this.labels.reset();
  }
  async createIssue() {
    const data = this.getFormValue();
    const link = IssueLink.parseLink(window.location.href);
    if (!data || !link) {
      return;
    }
    const response = await this.issueProvider.createIssue(data);
    this.persistRecently();
    if (this.relation.value) {
      await this.issueProvider.createIssueRelation({
        issueId: response.data.createIssuable.issuable.iid,
        projectId: response.data.createIssuable.issuable.projectId,
        targetProjectId: link.projectPath.replace(/\//g, '%2F'),
        targetIssueIid: link.issue,
        linkType: this.relation.value,
      });
    }
    this.onClose();
    this.reset();
  }
  getFormValue() {
    const [project] = this.project.getValue();
    if (!project) {
      return;
    }
    const data = {
      title: this.title.value,
      projectPath: project.fullPath,
    };
    const [milestone] = this.milestone.getValue();
    if (milestone) {
      data['milestoneId'] = milestone.id;
    }
    const [iteration] = this.iteration.getValue();
    if (iteration) {
      data['iterationId'] = iteration.id;
      data['iterationCadenceId'] = iteration.iterationCadence.id;
    }
    const assignees = this.assignees.getValue();
    if (assignees) {
      data['assigneeIds'] = assignees.map((a) => a.id);
    }
    const labels = this.labels.getValue();
    data['labelIds'] = labels.map((label) => label.id);
    return data;
  }
  persistRecently() {
    this.project.persistRecent();
    this.milestone.persistRecent();
    this.iteration.persistRecent();
    this.assignees.persistRecent();
    this.labels.persistRecent();
  }
}

// apps/gitlab-plus/src/components/CreateRelatedIssueModal.ts
class CreateRelatedIssueModal extends Component {
  constructor() {
    const container = Dom.create({
      tag: 'div',
      classes:
        'glp-create-related-issue-modal crud gl-border gl-rounded-form gl-border-section gl-bg-subtle gl-mt-5',
    });
    super('div', {
      classes: 'glp-create-related-issue-layer',
      children: container,
    });
    __publicField(this, 'visibleClassName', 'glp-modal-visible');
    const link = IssueLink.parseLink(window.location.href);
    if (link) {
      const form = new CreateRelatedIssueModalContent(
        link,
        this.hide.bind(this)
      );
      container.append(
        new CreateRelatedIssueModalHeader(() => {
          this.hide();
          form.reset();
        }).getElement(),
        form.getElement()
      );
    }
  }
  init() {
    this.mount(document.body);
  }
  show() {
    this.element.classList.add(this.visibleClassName);
  }
  hide() {
    this.element.classList.remove(this.visibleClassName);
  }
}

// apps/gitlab-plus/src/components/create-related-issue/CreateButton.ts
class CreateButton extends Component {
  constructor() {
    super('button', {
      classes: 'btn btn-default btn-sm gl-button',
      attrs: {
        type: 'button',
      },
      children: {
        tag: 'span',
        classes: 'gl-button-text',
        children: 'Create related issue',
      },
    });
  }
  init() {
    const parent = document.querySelector(
      '#related-issues [data-testid="crud-actions"]'
    );
    if (parent && !this.element.parentNode) {
      this.mount(parent);
    }
  }
}

// apps/gitlab-plus/src/services/CreateRelatedIssue.ts
class CreateRelatedIssue {
  constructor() {
    __publicField(this, 'modal', new CreateRelatedIssueModal());
    __publicField(this, 'addButton', new CreateButton());
  }
  init() {
    this.modal.init();
    this.addButton.event('click', this.modal.show.bind(this.modal));
    this.mountButton();
  }
  mountButton() {
    setTimeout(this.addButton.init.bind(this.addButton), 1e3);
    setTimeout(this.addButton.init.bind(this.addButton), 3e3);
  }
}

// apps/gitlab-plus/src/components/related-issue-autocomplete/AutocompleteModal.ts
class AutocompleteModal extends Component {
  constructor(onSelect, renderItem, search) {
    super('div', {
      classes: 'gl-relative gl-w-full gl-new-dropdown !gl-block',
    });
    __publicField(this, 'list');
    __publicField(this, 'modal');
    const modalSearch = new DropdownSearch(search, () => {});
    this.list = new DropdownList(renderItem, onSelect);
    this.modal = new DropdownModal(
      modalSearch.getElement(),
      this.list.getElement()
    );
    this.element.append(this.modal.getElement());
    this.updateItems([]);
  }
  updateItems(items) {
    this.list.render(items, [], []);
  }
  setVisible(visible) {
    this.modal.setVisible(visible);
  }
}

// apps/gitlab-plus/src/components/RelatedIssuesAutocompleteModal.ts
class RelatedIssuesAutocompleteModal {
  constructor() {
    __publicField(this, 'readyClass', 'glp-input-ready');
    __publicField(this, 'input', Dom.element('input'));
    __publicField(this, 'autocompleteModal');
    __publicField(this, 'issueProvider', new IssueProvider());
    __publicField(this, 'search');
    __publicField(this, 'link');
    this.search = debounce(this.load.bind(this));
    this.link = IssueLink.parseLink(window.location.href);
    this.autocompleteModal = new AutocompleteModal(
      this.onSelect.bind(this),
      this.renderItem.bind(this),
      this.search.bind(this)
    );
    document.body.addEventListener('click', (e) => {
      if (e.target !== this.input && !this.input.contains(e.target)) {
        this.autocompleteModal.setVisible(false);
      }
    });
  }
  init(input) {
    if (this.isMounted(input)) {
      return;
    }
    const container = input.closest('.add-issuable-form-input-wrapper');
    if (!container) {
      return;
    }
    this.autocompleteModal.mount(container);
    this.input = input;
    this.input.classList.add(this.readyClass);
    this.input.addEventListener('focus', this.show.bind(this));
  }
  isMounted(input) {
    return input.classList.contains(this.readyClass);
  }
  show() {
    this.autocompleteModal.setVisible(true);
    this.search('');
  }
  async load(term = '') {
    var _a, _b, _c;
    if (!this.link) {
      return;
    }
    const response = await this.issueProvider.getIssues(
      this.link.workspacePath,
      term
    );
    this.autocompleteModal.updateItems([
      ...(((_a = response.data.workspace.workItems) == null
        ? void 0
        : _a.nodes) || []),
      ...(((_b = response.data.workspace.workItemsByIid) == null
        ? void 0
        : _b.nodes) || []),
      ...(((_c = response.data.workspace.workItemsEmpty) == null
        ? void 0
        : _c.nodes) || []),
    ]);
  }
  onSelect(item) {
    this.input.value = `${item.project.fullPath}#${item.iid} `;
    this.input.dispatchEvent(new Event('input'));
    this.input.dispatchEvent(new Event('change'));
    this.autocompleteModal.setVisible(false);
  }
  renderItem(item) {
    return Dom.create({
      tag: 'div',
      classes: 'gl-flex gl-gap-x-2 gl-py-2',
      children: [
        new IconComponent('issue-type-issue', 's16'),
        { tag: 'small', children: item.iid },
        { tag: 'span', classes: 'gl-flex gl-flex-wrap', children: item.title },
      ],
    });
  }
}

// apps/gitlab-plus/src/services/RelatedIssueAutocomplete.ts
class RelatedIssueAutocomplete {
  constructor() {
    __publicField(this, 'modal', new RelatedIssuesAutocompleteModal());
    __publicField(this, 'ready', false);
  }
  init() {
    this.initObserver();
    window.setTimeout(this.initObserver.bind(this), 1e3);
    window.setTimeout(this.initObserver.bind(this), 3e3);
    window.setTimeout(this.initObserver.bind(this), 5e3);
  }
  initObserver() {
    const section = document.querySelector('#related-issues');
    if (this.ready || !section) {
      return;
    }
    this.ready = true;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          this.initAutocomplete(section);
        }
      });
    });
    observer.observe(section, {
      childList: true,
    });
  }
  initAutocomplete(section) {
    const input = section.querySelector('#add-related-issues-form-input');
    if (input) {
      this.modal.init(input);
    }
  }
}

// apps/gitlab-plus/src/services/ClearCacheService.ts
class ClearCacheService {
  constructor() {
    __publicField(this, 'cache', new Cache('glp-'));
  }
  init() {
    this.cache.clearInvalid();
    window.setInterval(this.cache.clearInvalid.bind(this.cache), 60 * 1e3);
  }
}

// libs/share/src/ui/Observer.ts
class Observer {
  stop() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
  start(element, callback, options) {
    this.stop();
    this.observer = new MutationObserver(callback);
    this.observer.observe(
      element,
      options || {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
        attributeOldValue: true,
        characterDataOldValue: true,
      }
    );
  }
}

// apps/gitlab-plus/src/services/SortIssue.ts
const sortWeight = {
  ['ownIssue']: 10,
  ['ownUserStory']: 8,
  ['userStory']: 6,
  ['issue']: 4,
  ['unknown']: 2,
  ['label']: 0,
};
class SortIssue {
  init() {
    const observer = new Observer();
    const userName = this.userName();
    const board = document.querySelector('.boards-list');
    if (!userName || !board) {
      return;
    }
    observer.start(board, () => this.run(userName));
  }
  run(userName) {
    [...document.querySelectorAll('.board-list:not(.glp-ready)')].forEach(
      (board) => this.initBoard(board, userName)
    );
  }
  initBoard(board, userName) {
    Dom.applyClass(board, 'glp-ready');
    const observer = new Observer();
    observer.start(board, () => this.sortBoard(board, userName), {
      childList: true,
    });
  }
  sortBoard(board, userName) {
    Dom.applyStyles(board, {
      flexDirection: 'column',
      display: 'flex',
    });
    const children = [...board.children].map((element) => ({
      element,
      type: this.childType(element, userName),
    }));
    if (!this.shouldSort(children)) {
      return;
    }
    this.sortChildren(children).forEach(({ element }, index) => {
      const order =
        index !== children.length - 1 ? index + 1 : children.length + 100;
      element.style.order = `${order}`;
    });
  }
  childType(child, userName) {
    if (child instanceof HTMLDivElement) {
      return 'label';
    }
    const title = child.querySelector('[data-testid="board-card-title-link"]');
    if (!title) {
      return 'unknown';
    }
    const isOwn = [...child.querySelectorAll('.gl-avatar-link img')].some(
      (img) => img.alt.includes(userName)
    );
    const isUserStory = [...child.querySelectorAll('.gl-label')].some((span) =>
      span.innerText.includes('User Story')
    );
    if (isUserStory && isOwn) {
      return 'ownUserStory';
    }
    if (isOwn) {
      return 'ownIssue';
    }
    if (isUserStory) {
      return 'userStory';
    }
    return 'issue';
  }
  userName() {
    const element = document.querySelector(
      '.user-bar-dropdown-toggle .gl-button-text .gl-sr-only'
    );
    const testText = ' user’s menu';
    if (element && element.innerText.includes(testText)) {
      return element.innerText.replace(testText, '');
    }
    return void 0;
  }
  sortChildren(items) {
    return items.toSorted((a, b) => {
      return Math.sign(sortWeight[b.type] - sortWeight[a.type]);
    });
  }
  shouldSort(items) {
    return items.some((item) => {
      return ['ownIssue', 'ownUserStory'].includes(item.type);
    });
  }
}

// apps/gitlab-plus/src/main.ts
[
  ClearCacheService,
  ImagePreview,
  IssuePreview,
  CreateRelatedIssue,
  RelatedIssueAutocomplete,
  SortIssue,
].forEach((Service) => new Service().init());
