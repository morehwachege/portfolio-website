/*


   Magic Scroll v2.0.53 DEMO
   Copyright 2021 Magic Toolbox
   Buy a license: https://www.magictoolbox.com/magicscroll/
   License agreement: https://www.magictoolbox.com/license/


*/
window.MagicScroll = (function () {
   var u, v;
   u = v = (function () {
       var S = {
           version: "v3.3.7",
           UUID: 0,
           storage: {},
           $uuid: function (W) {
               return (W.$J_UUID || (W.$J_UUID = ++M.UUID))
           },
           getStorage: function (W) {
               return (M.storage[W] || (M.storage[W] = {}))
           },
           $F: function () {},
           $false: function () {
               return false
           },
           $true: function () {
               return true
           },
           stylesId: "mjs-" + Math.floor(Math.random() * new Date().getTime()),
           defined: function (W) {
               return (W != null)
           },
           ifndef: function (X, W) {
               return (X != null) ? X : W
           },
           exists: function (W) {
               return !!(W)
           },
           jTypeOf: function (Y) {
               var W = 9007199254740991;

               function X(Z) {
                   return typeof Z === "number" && Z > -1 && Z % 1 === 0 && Z <= W
               }
               if (!M.defined(Y)) {
                   return false
               }
               if (Y.$J_TYPE) {
                   return Y.$J_TYPE
               }
               if (!!Y.nodeType) {
                   if (Y.nodeType === 1) {
                       return "element"
                   }
                   if (Y.nodeType === 3) {
                       return "textnode"
                   }
               }
               if (Y === window) {
                   return "window"
               }
               if (Y === document) {
                   return "document"
               }
               if (Y instanceof window.Function) {
                   return "function"
               }
               if (Y instanceof window.String) {
                   return "string"
               }
               if (Y instanceof window.Array) {
                   return "array"
               }
               if (Y instanceof window.Date) {
                   return "date"
               }
               if (Y instanceof window.RegExp) {
                   return "regexp"
               }
               if (X(Y.length) && Y.item) {
                   return "collection"
               }
               if (X(Y.length) && Y.callee) {
                   return "arguments"
               }
               if ((Y instanceof window.Object || Y instanceof window.Function) && Y.constructor === M.Class) {
                   return "class"
               }
               if (M.browser.trident) {
                   if (M.defined(Y.cancelBubble)) {
                       return "event"
                   }
               } else {
                   if (Y === window.event || Y.constructor === window.Event || Y.constructor === window.MouseEvent || Y.constructor === window.UIEvent || Y.constructor === window.KeyboardEvent || Y.constructor === window.KeyEvent) {
                       return "event"
                   }
               }
               return typeof (Y)
           },
           extend: function (ab, aa) {
               if (!(ab instanceof window.Array)) {
                   ab = [ab]
               }
               if (!aa) {
                   return ab[0]
               }
               for (var Z = 0, X = ab.length; Z < X; Z++) {
                   if (!M.defined(ab)) {
                       continue
                   }
                   for (var Y in aa) {
                       if (!Object.prototype.hasOwnProperty.call(aa, Y)) {
                           continue
                       }
                       try {
                           ab[Z][Y] = aa[Y]
                       } catch (W) {}
                   }
               }
               return ab[0]
           },
           implement: function (aa, Z) {
               if (!(aa instanceof window.Array)) {
                   aa = [aa]
               }
               for (var Y = 0, W = aa.length; Y < W; Y++) {
                   if (!M.defined(aa[Y])) {
                       continue
                   }
                   if (!aa[Y].prototype) {
                       continue
                   }
                   for (var X in (Z || {})) {
                       if (!aa[Y].prototype[X]) {
                           aa[Y].prototype[X] = Z[X]
                       }
                   }
               }
               return aa[0]
           },
           nativize: function (Y, X) {
               if (!M.defined(Y)) {
                   return Y
               }
               for (var W in (X || {})) {
                   if (!Y[W]) {
                       Y[W] = X[W]
                   }
               }
               return Y
           },
           $try: function () {
               for (var X = 0, W = arguments.length; X < W; X++) {
                   try {
                       return arguments[X]()
                   } catch (Y) {}
               }
               return null
           },
           $A: function (Y) {
               if (!M.defined(Y)) {
                   return M.$([])
               }
               if (Y.toArray) {
                   return M.$(Y.toArray())
               }
               if (Y.item) {
                   var X = Y.length || 0,
                       W = new Array(X);
                   while (X--) {
                       W[X] = Y[X]
                   }
                   return M.$(W)
               }
               return M.$(Array.prototype.slice.call(Y))
           },
           now: function () {
               return new Date().getTime()
           },
           detach: function (aa) {
               var Y;
               switch (M.jTypeOf(aa)) {
               case "object":
                   Y = {};
                   for (var Z in aa) {
                       Y[Z] = M.detach(aa[Z])
                   }
                   break;
               case "array":
                   Y = [];
                   for (var X = 0, W = aa.length; X < W; X++) {
                       Y[X] = M.detach(aa[X])
                   }
                   break;
               default:
                   return aa
               }
               return M.$(Y)
           },
           $: function (Y) {
               var W = true;
               if (!M.defined(Y)) {
                   return null
               }
               if (Y.$J_EXT) {
                   return Y
               }
               switch (M.jTypeOf(Y)) {
               case "array":
                   Y = M.nativize(Y, M.extend(M.Array, {
                       $J_EXT: M.$F
                   }));
                   Y.jEach = Y.forEach;
                   Y.contains = M.Array.contains;
                   return Y;
                   break;
               case "string":
                   var X = document.getElementById(Y);
                   if (M.defined(X)) {
                       return M.$(X)
                   }
                   return null;
                   break;
               case "window":
               case "document":
                   M.$uuid(Y);
                   Y = M.extend(Y, M.Doc);
                   break;
               case "element":
                   M.$uuid(Y);
                   Y = M.extend(Y, M.Element);
                   break;
               case "event":
                   Y = M.extend(Y, M.Event);
                   break;
               case "textnode":
               case "function":
               case "date":
               default:
                   W = false;
                   break
               }
               if (W) {
                   return M.extend(Y, {
                       $J_EXT: M.$F
                   })
               } else {
                   return Y
               }
           },
           $new: function (W, Y, X) {
               return M.$(M.doc.createElement(W)).setProps(Y || {}).jSetCss(X || {})
           },
           addCSS: function (Z, aa, X) {
               var W, ac, Y, ae = [],
                   ad = -1;
               X || (X = M.stylesId);
               W = M.$(X) || M.$new("style", {
                   id: X,
                   type: "text/css"
               }).jAppendTo((document.head || document.body), "top");
               ac = W.sheet || W.styleSheet;
               if (M.jTypeOf(aa) !== "string") {
                   for (var Y in aa) {
                       ae.push(Y + ":" + aa[Y])
                   }
                   aa = ae.join(";")
               }
               if (ac.insertRule) {
                   ad = ac.insertRule(Z + " {" + aa + "}", ac.cssRules.length)
               } else {
                   try {
                       ad = ac.addRule(Z, aa, ac.rules.length)
                   } catch (ab) {}
               }
               return ad
           },
           removeCSS: function (Z, W) {
               var Y, X;
               Y = M.$(Z);
               if (M.jTypeOf(Y) !== "element") {
                   return
               }
               X = Y.sheet || Y.styleSheet;
               if (X.deleteRule) {
                   X.deleteRule(W)
               } else {
                   if (X.removeRule) {
                       X.removeRule(W)
                   }
               }
           },
           generateUUID: function () {
               return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (Y) {
                   var X = Math.random() * 16 | 0,
                       W = Y === "x" ? X : (X & 3 | 8);
                   return W.toString(16)
               }).toUpperCase()
           },
           getAbsoluteURL: (function () {
               var W;
               return function (X) {
                   if (!W) {
                       W = document.createElement("a")
                   }
                   W.setAttribute("href", X);
                   return ("!!" + W.href).replace("!!", "")
               }
           })(),
           getHashCode: function (Y) {
               var Z = 0,
                   W = Y.length;
               for (var X = 0; X < W; ++X) {
                   Z = 31 * Z + Y.charCodeAt(X);
                   Z %= 4294967296
               }
               return Z
           }
       };
       var M = S;
       var N = S.$;
       if (!window.magicJS) {
           window.magicJS = S;
           window.$mjs = S.$
       }
       M.Array = {
           $J_TYPE: "array",
           indexOf: function (Z, aa) {
               var W = this.length;
               for (var X = this.length, Y = (aa < 0) ? Math.max(0, X + aa) : aa || 0; Y < X; Y++) {
                   if (this[Y] === Z) {
                       return Y
                   }
               }
               return -1
           },
           contains: function (W, X) {
               return this.indexOf(W, X) != -1
           },
           forEach: function (W, Z) {
               for (var Y = 0, X = this.length; Y < X; Y++) {
                   if (Y in this) {
                       W.call(Z, this[Y], Y, this)
                   }
               }
           },
           filter: function (W, ab) {
               var aa = [];
               for (var Z = 0, X = this.length; Z < X; Z++) {
                   if (Z in this) {
                       var Y = this[Z];
                       if (W.call(ab, this[Z], Z, this)) {
                           aa.push(Y)
                       }
                   }
               }
               return aa
           },
           map: function (W, aa) {
               var Z = [];
               for (var Y = 0, X = this.length; Y < X; Y++) {
                   if (Y in this) {
                       Z[Y] = W.call(aa, this[Y], Y, this)
                   }
               }
               return Z
           }
       };
       M.implement(String, {
           $J_TYPE: "string",
           jTrim: function () {
               return this.replace(/^\s+|\s+$/g, "")
           },
           eq: function (W, X) {
               return (X || false) ? (this.toString() === W.toString()) : (this.toLowerCase().toString() === W.toLowerCase().toString())
           },
           jCamelize: function () {
               return this.replace(/-\D/g, function (W) {
                   return W.charAt(1).toUpperCase()
               })
           },
           dashize: function () {
               return this.replace(/[A-Z]/g, function (W) {
                   return ("-" + W.charAt(0).toLowerCase())
               })
           },
           jToInt: function (W) {
               return parseInt(this, W || 10)
           },
           toFloat: function () {
               return parseFloat(this)
           },
           jToBool: function () {
               return !this.replace(/true/i, "").jTrim()
           },
           has: function (X, W) {
               W = W || "";
               return (W + this + W).indexOf(W + X + W) > -1
           }
       });
       S.implement(Function, {
           $J_TYPE: "function",
           jBind: function () {
               var X = M.$A(arguments),
                   W = this,
                   Y = X.shift();
               return function () {
                   return W.apply(Y || null, X.concat(M.$A(arguments)))
               }
           },
           jBindAsEvent: function () {
               var X = M.$A(arguments),
                   W = this,
                   Y = X.shift();
               return function (Z) {
                   return W.apply(Y || null, M.$([Z || (M.browser.ieMode ? window.event : null)]).concat(X))
               }
           },
           jDelay: function () {
               var X = M.$A(arguments),
                   W = this,
                   Y = X.shift();
               return window.setTimeout(function () {
                   return W.apply(W, X)
               }, Y || 0)
           },
           jDefer: function () {
               var X = M.$A(arguments),
                   W = this;
               return function () {
                   return W.jDelay.apply(W, X)
               }
           },
           interval: function () {
               var X = M.$A(arguments),
                   W = this,
                   Y = X.shift();
               return window.setInterval(function () {
                   return W.apply(W, X)
               }, Y || 0)
           }
       });
       var T = {};
       var L = navigator.userAgent.toLowerCase();
       var K = L.match(/(webkit|gecko|trident|presto)\/(\d+\.?\d*)/i);
       var P = L.match(/(edge|opr)\/(\d+\.?\d*)/i) || L.match(/(crios|chrome|safari|firefox|opera|opr)\/(\d+\.?\d*)/i);
       var R = L.match(/version\/(\d+\.?\d*)/i);
       var G = document.documentElement.style;

       function H(X) {
           var W = X.charAt(0).toUpperCase() + X.slice(1);
           return X in G || ("Webkit" + W) in G || ("Moz" + W) in G || ("ms" + W) in G || ("O" + W) in G
       }
       M.browser = {
           features: {
               xpath: !!(document.evaluate),
               air: !!(window.runtime),
               query: !!(document.querySelector),
               fullScreen: !!(document.fullscreenEnabled || document.msFullscreenEnabled || document.exitFullscreen || document.cancelFullScreen || document.webkitexitFullscreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.oCancelFullScreen || document.msCancelFullScreen),
               xhr2: !!(window.ProgressEvent) && !!(window.FormData) && (window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest),
               transition: H("transition"),
               transform: H("transform"),
               perspective: H("perspective"),
               animation: H("animation"),
               requestAnimationFrame: false,
               multibackground: false,
               cssFilters: false,
               canvas: false,
               svg: (function () {
                   return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")
               }())
           },
           touchScreen: (function () {
               return "ontouchstart" in window || (window.DocumentTouch && document instanceof DocumentTouch) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)
           }()),
           mobile: !!L.match(/(android|bb\d+|meego).+|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/),
           engine: (K && K[1]) ? K[1].toLowerCase() : (window.opera) ? "presto" : !!(window.ActiveXObject) ? "trident" : (document.getBoxObjectFor !== undefined || window.mozInnerScreenY !== null) ? "gecko" : (window.WebKitPoint !== null || !navigator.taintEnabled) ? "webkit" : "unknown",
           version: (K && K[2]) ? parseFloat(K[2]) : 0,
           uaName: (P && P[1]) ? P[1].toLowerCase() : "",
           uaVersion: (P && P[2]) ? parseFloat(P[2]) : 0,
           cssPrefix: "",
           cssDomPrefix: "",
           domPrefix: "",
           ieMode: 0,
           platform: L.match(/ip(?:ad|od|hone)/) ? "ios" : (L.match(/(?:webos|android)/) || navigator.platform.match(/mac|win|linux/i) || ["other"])[0].toLowerCase(),
           backCompat: document.compatMode && document.compatMode.toLowerCase() === "backcompat",
           scrollbarsWidth: 0,
           getDoc: function () {
               return (document.compatMode && document.compatMode.toLowerCase() === "backcompat") ? document.body : document.documentElement
           },
           requestAnimationFrame: window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || undefined,
           cancelAnimationFrame: window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || undefined,
           ready: false,
           onready: function () {
               if (M.browser.ready) {
                   return
               }
               var Z;
               var Y;
               M.browser.ready = true;
               M.body = M.$(document.body);
               M.win = M.$(window);
               try {
                   var X = M.$new("div").jSetCss({
                       width: 100,
                       height: 100,
                       overflow: "scroll",
                       position: "absolute",
                       top: -9999
                   }).jAppendTo(document.body);
                   M.browser.scrollbarsWidth = X.offsetWidth - X.clientWidth;
                   X.jRemove()
               } catch (W) {}
               try {
                   Z = M.$new("div");
                   Y = Z.style;
                   Y.cssText = "background:url(https://),url(https://),red url(https://)";
                   M.browser.features.multibackground = (/(url\s*\(.*?){3}/).test(Y.background);
                   Y = null;
                   Z = null
               } catch (W) {}
               if (!M.browser.cssTransformProp) {
                   M.browser.cssTransformProp = M.normalizeCSS("transform").dashize()
               }
               try {
                   Z = M.$new("div");
                   Z.style.cssText = M.normalizeCSS("filter").dashize() + ":blur(2px);";
                   M.browser.features.cssFilters = !!Z.style.length && (!M.browser.ieMode || M.browser.ieMode > 9);
                   Z = null
               } catch (W) {}
               if (!M.browser.features.cssFilters) {
                   M.$(document.documentElement).jAddClass("no-cssfilters-magic")
               }
               try {
                   M.browser.features.canvas = (function () {
                       var aa = M.$new("canvas");
                       return !!(aa.getContext && aa.getContext("2d"))
                   }())
               } catch (W) {}
               if (window.TransitionEvent === undefined && window.WebKitTransitionEvent !== undefined) {
                   T.transitionend = "webkitTransitionEnd"
               }
               M.Doc.jCallEvent.call(M.$(document), "domready")
           }
       };
       (function () {
           var X = [],
               aa, Z, ab;

           function W() {
               return !!(arguments.callee.caller)
           }
           switch (M.browser.engine) {
           case "trident":
               if (!M.browser.version) {
                   M.browser.version = !!(window.XMLHttpRequest) ? 3 : 2
               }
               break;
           case "gecko":
               M.browser.version = (P && P[2]) ? parseFloat(P[2]) : 0;
               break
           }
           M.browser[M.browser.engine] = true;
           if (P && P[1] === "crios") {
               M.browser.uaName = "chrome"
           }
           if (!!window.chrome) {
               M.browser.chrome = true
           }
           if (P && P[1] === "opr") {
               M.browser.uaName = "opera";
               M.browser.opera = true
           }
           if (M.browser.uaName === "safari" && (R && R[1])) {
               M.browser.uaVersion = parseFloat(R[1])
           }
           if (M.browser.platform === "android" && M.browser.webkit && (R && R[1])) {
               M.browser.androidBrowser = true
           }
           aa = ({
               gecko: ["-moz-", "Moz", "moz"],
               webkit: ["-webkit-", "Webkit", "webkit"],
               trident: ["-ms-", "ms", "ms"],
               presto: ["-o-", "O", "o"]
           })[M.browser.engine] || ["", "", ""];
           M.browser.cssPrefix = aa[0];
           M.browser.cssDomPrefix = aa[1];
           M.browser.domPrefix = aa[2];
           M.browser.ieMode = !M.browser.trident ? undefined : (document.documentMode) ? document.documentMode : (function () {
               var ac = 0;
               if (M.browser.backCompat) {
                   return 5
               }
               switch (M.browser.version) {
               case 2:
                   ac = 6;
                   break;
               case 3:
                   ac = 7;
                   break
               }
               return ac
           }());
           if (!M.browser.mobile && M.browser.platform === "mac" && M.browser.touchScreen) {
               M.browser.mobile = true;
               M.browser.platform = "ios"
           }
           X.push(M.browser.platform + "-magic");
           if (M.browser.mobile) {
               X.push("mobile-magic")
           }
           if (M.browser.androidBrowser) {
               X.push("android-browser-magic")
           }
           if (M.browser.ieMode) {
               M.browser.uaName = "ie";
               M.browser.uaVersion = M.browser.ieMode;
               X.push("ie" + M.browser.ieMode + "-magic");
               for (Z = 11; Z > M.browser.ieMode; Z--) {
                   X.push("lt-ie" + Z + "-magic")
               }
           }
           if (M.browser.webkit && M.browser.version < 536) {
               M.browser.features.fullScreen = false
           }
           if (M.browser.requestAnimationFrame) {
               M.browser.requestAnimationFrame.call(window, function () {
                   M.browser.features.requestAnimationFrame = true
               })
           }
           if (M.browser.features.svg) {
               X.push("svg-magic")
           } else {
               X.push("no-svg-magic")
           }
           ab = (document.documentElement.className || "").match(/\S+/g) || [];
           document.documentElement.className = M.$(ab).concat(X).join(" ");
           try {
               document.documentElement.setAttribute("data-magic-ua", M.browser.uaName);
               document.documentElement.setAttribute("data-magic-ua-ver", M.browser.uaVersion);
               document.documentElement.setAttribute("data-magic-engine", M.browser.engine);
               document.documentElement.setAttribute("data-magic-engine-ver", M.browser.version)
           } catch (Y) {}
           if (M.browser.ieMode && M.browser.ieMode < 9) {
               document.createElement("figure");
               document.createElement("figcaption")
           }
           if (!window.navigator.pointerEnabled) {
               M.$(["Down", "Up", "Move", "Over", "Out"]).jEach(function (ac) {
                   T["pointer" + ac.toLowerCase()] = window.navigator.msPointerEnabled ? "MSPointer" + ac : -1
               })
           }
       }());
       (function () {
           M.browser.fullScreen = {
               capable: M.browser.features.fullScreen,
               enabled: function () {
                   return !!(document.fullscreenElement || document[M.browser.domPrefix + "FullscreenElement"] || document.fullScreen || document.webkitIsFullScreen || document[M.browser.domPrefix + "FullScreen"])
               },
               request: function (W, X) {
                   if (!X) {
                       X = {}
                   }
                   if (this.capable) {
                       M.$(document).jAddEvent(this.changeEventName, this.onchange = function (Y) {
                           if (this.enabled()) {
                               if (X.onEnter) {
                                   X.onEnter()
                               }
                           } else {
                               M.$(document).jRemoveEvent(this.changeEventName, this.onchange);
                               if (X.onExit) {
                                   X.onExit()
                               }
                           }
                       }.jBindAsEvent(this));
                       M.$(document).jAddEvent(this.errorEventName, this.onerror = function (Y) {
                           if (X.fallback) {
                               X.fallback()
                           }
                           M.$(document).jRemoveEvent(this.errorEventName, this.onerror)
                       }.jBindAsEvent(this));
                       (W.requestFullscreen || W[M.browser.domPrefix + "RequestFullscreen"] || W[M.browser.domPrefix + "RequestFullScreen"] || function () {}).call(W)
                   } else {
                       if (X.fallback) {
                           X.fallback()
                       }
                   }
               },
               cancel: (document.exitFullscreen || document.cancelFullScreen || document[M.browser.domPrefix + "ExitFullscreen"] || document[M.browser.domPrefix + "CancelFullScreen"] || function () {}).jBind(document),
               changeEventName: document.msExitFullscreen ? "MSFullscreenChange" : (document.exitFullscreen ? "" : M.browser.domPrefix) + "fullscreenchange",
               errorEventName: document.msExitFullscreen ? "MSFullscreenError" : (document.exitFullscreen ? "" : M.browser.domPrefix) + "fullscreenerror",
               prefix: M.browser.domPrefix,
               activeElement: null
           }
       }());
       var V = /\S+/g,
           J = /^(border(Top|Bottom|Left|Right)Width)|((padding|margin)(Top|Bottom|Left|Right))$/,
           O = {
               "float": ("undefined" === typeof (G.styleFloat)) ? "cssFloat" : "styleFloat"
           },
           Q = {
               fontWeight: true,
               lineHeight: true,
               opacity: true,
               zIndex: true,
               zoom: true
           },
           I = (window.getComputedStyle) ? function (Y, W) {
               var X = window.getComputedStyle(Y, null);
               return X ? X.getPropertyValue(W) || X[W] : null
           } : function (Z, X) {
               var Y = Z.currentStyle,
                   W = null;
               W = Y ? Y[X] : null;
               if (null == W && Z.style && Z.style[X]) {
                   W = Z.style[X]
               }
               return W
           };

       function U(Y) {
           var W, X;
           X = (M.browser.webkit && "filter" == Y) ? false : (Y in G);
           if (!X) {
               W = M.browser.cssDomPrefix + Y.charAt(0).toUpperCase() + Y.slice(1);
               if (W in G) {
                   return W
               }
           }
           return Y
       }
       M.normalizeCSS = U;
       M.Element = {
           jHasClass: function (W) {
               return !(W || "").has(" ") && (this.className || "").has(W, " ")
           },
           jAddClass: function (aa) {
               var X = (this.className || "").match(V) || [],
                   Z = (aa || "").match(V) || [],
                   W = Z.length,
                   Y = 0;
               for (; Y < W; Y++) {
                   if (!M.$(X).contains(Z[Y])) {
                       X.push(Z[Y])
                   }
               }
               this.className = X.join(" ");
               return this
           },
           jRemoveClass: function (ab) {
               var X = (this.className || "").match(V) || [],
                   aa = (ab || "").match(V) || [],
                   W = aa.length,
                   Z = 0,
                   Y;
               for (; Z < W; Z++) {
                   if ((Y = M.$(X).indexOf(aa[Z])) > -1) {
                       X.splice(Y, 1)
                   }
               }
               this.className = ab ? X.join(" ") : "";
               return this
           },
           jToggleClass: function (W) {
               return this.jHasClass(W) ? this.jRemoveClass(W) : this.jAddClass(W)
           },
           jGetCss: function (X) {
               var Y = X.jCamelize(),
                   W = null;
               X = O[Y] || (O[Y] = U(Y));
               W = I(this, X);
               if ("auto" === W) {
                   W = null
               }
               if (null !== W) {
                   if ("opacity" == X) {
                       return M.defined(W) ? parseFloat(W) : 1
                   }
                   if (J.test(X)) {
                       W = parseInt(W, 10) ? W : "0px"
                   }
               }
               return W
           },
           jSetCssProp: function (X, W) {
               var Z = X.jCamelize();
               try {
                   if ("opacity" == X) {
                       this.jSetOpacity(W);
                       return this
                   }
                   X = O[Z] || (O[Z] = U(Z));
                   this.style[X] = W + (("number" == M.jTypeOf(W) && !Q[Z]) ? "px" : "")
               } catch (Y) {}
               return this
           },
           jSetCss: function (X) {
               for (var W in X) {
                   this.jSetCssProp(W, X[W])
               }
               return this
           },
           jGetStyles: function () {
               var W = {};
               M.$A(arguments).jEach(function (X) {
                   W[X] = this.jGetCss(X)
               }, this);
               return W
           },
           jSetOpacity: function (Y, W) {
               var X;
               W = W || false;
               this.style.opacity = Y;
               Y = parseInt(parseFloat(Y) * 100);
               if (W) {
                   if (0 === Y) {
                       if ("hidden" != this.style.visibility) {
                           this.style.visibility = "hidden"
                       }
                   } else {
                       if ("visible" != this.style.visibility) {
                           this.style.visibility = "visible"
                       }
                   }
               }
               if (M.browser.ieMode && M.browser.ieMode < 9) {
                   if (!isNaN(Y)) {
                       if (!~this.style.filter.indexOf("Alpha")) {
                           this.style.filter += " progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Y + ")"
                       } else {
                           this.style.filter = this.style.filter.replace(/Opacity=\d*/i, "Opacity=" + Y)
                       }
                   } else {
                       this.style.filter = this.style.filter.replace(/progid:DXImageTransform.Microsoft.Alpha\(Opacity=\d*\)/i, "").jTrim();
                       if ("" === this.style.filter) {
                           this.style.removeAttribute("filter")
                       }
                   }
               }
               return this
           },
           setProps: function (W) {
               for (var X in W) {
                   if ("class" === X) {
                       this.jAddClass("" + W[X])
                   } else {
                       this.setAttribute(X, "" + W[X])
                   }
               }
               return this
           },
           jGetTransitionDuration: function () {
               var X = 0,
                   W = 0;
               X = this.jGetCss("transition-duration");
               W = this.jGetCss("transition-delay");
               X = X.indexOf("ms") > -1 ? parseFloat(X) : X.indexOf("s") > -1 ? parseFloat(X) * 1000 : 0;
               W = W.indexOf("ms") > -1 ? parseFloat(W) : W.indexOf("s") > -1 ? parseFloat(W) * 1000 : 0;
               return X + W
           },
           hide: function () {
               return this.jSetCss({
                   display: "none",
                   visibility: "hidden"
               })
           },
           show: function () {
               return this.jSetCss({
                   display: "",
                   visibility: "visible"
               })
           },
           jGetSize: function () {
               return {
                   width: this.offsetWidth,
                   height: this.offsetHeight
               }
           },
           getInnerSize: function (X) {
               var W = this.jGetSize();
               W.width -= (parseFloat(this.jGetCss("border-left-width") || 0) + parseFloat(this.jGetCss("border-right-width") || 0));
               W.height -= (parseFloat(this.jGetCss("border-top-width") || 0) + parseFloat(this.jGetCss("border-bottom-width") || 0));
               if (!X) {
                   W.width -= (parseFloat(this.jGetCss("padding-left") || 0) + parseFloat(this.jGetCss("padding-right") || 0));
                   W.height -= (parseFloat(this.jGetCss("padding-top") || 0) + parseFloat(this.jGetCss("padding-bottom") || 0))
               }
               return W
           },
           jGetScroll: function () {
               return {
                   top: this.scrollTop,
                   left: this.scrollLeft
               }
           },
           jGetFullScroll: function () {
               var W = this,
                   X = {
                       top: 0,
                       left: 0
                   };
               do {
                   X.left += W.scrollLeft || 0;
                   X.top += W.scrollTop || 0;
                   W = W.parentNode
               } while (W);
               return X
           },
           jGetPosition: function () {
               var aa = this,
                   X = 0,
                   Z = 0;
               if (M.defined(document.documentElement.getBoundingClientRect)) {
                   var W = this.getBoundingClientRect(),
                       Y = M.$(document).jGetScroll(),
                       ab = M.browser.getDoc();
                   return {
                       top: W.top + Y.y - ab.clientTop,
                       left: W.left + Y.x - ab.clientLeft
                   }
               }
               do {
                   X += aa.offsetLeft || 0;
                   Z += aa.offsetTop || 0;
                   aa = aa.offsetParent
               } while (aa && !(/^(?:body|html)$/i).test(aa.tagName));
               return {
                   top: Z,
                   left: X
               }
           },
           jGetOffset: function () {
               var W = this;
               var Y = 0;
               var X = 0;
               do {
                   Y += W.offsetLeft || 0;
                   X += W.offsetTop || 0;
                   W = W.offsetParent
               } while (W && !(/^(?:body|html)$/i).test(W.tagName));
               return {
                   top: X,
                   left: Y
               }
           },
           jGetRect: function () {
               var X = this.jGetPosition();
               var W = this.jGetSize();
               return {
                   top: X.top,
                   bottom: X.top + W.height,
                   left: X.left,
                   right: X.left + W.width
               }
           },
           changeContent: function (X) {
               try {
                   this.innerHTML = X
               } catch (W) {
                   this.innerText = X
               }
               return this
           },
           jRemove: function () {
               return (this.parentNode) ? this.parentNode.removeChild(this) : this
           },
           kill: function () {
               M.$A(this.childNodes).jEach(function (W) {
                   if (3 == W.nodeType || 8 == W.nodeType) {
                       return
                   }
                   M.$(W).kill()
               });
               this.jRemove();
               this.jClearEvents();
               if (this.$J_UUID) {
                   M.storage[this.$J_UUID] = null;
                   delete M.storage[this.$J_UUID]
               }
               return null
           },
           append: function (Y, X) {
               X = X || "bottom";
               var W = this.firstChild;
               ("top" == X && W) ? this.insertBefore(Y, W): this.appendChild(Y);
               return this
           },
           jAppendTo: function (Y, X) {
               var W = M.$(Y).append(this, X);
               return this
           },
           enclose: function (W) {
               this.append(W.parentNode.replaceChild(this, W));
               return this
           },
           hasChild: function (W) {
               if ("element" !== M.jTypeOf("string" == M.jTypeOf(W) ? W = document.getElementById(W) : W)) {
                   return false
               }
               return (this == W) ? false : (this.contains && !(M.browser.webkit419)) ? (this.contains(W)) : (this.compareDocumentPosition) ? !!(this.compareDocumentPosition(W) & 16) : M.$A(this.byTag(W.tagName)).contains(W)
           }
       };
       M.Element.jGetStyle = M.Element.jGetCss;
       M.Element.jSetStyle = M.Element.jSetCss;
       if (!window.Element) {
           window.Element = M.$F;
           if (M.browser.engine.webkit) {
               window.document.createElement("iframe")
           }
           window.Element.prototype = (M.browser.engine.webkit) ? window["[[DOMElement.prototype]]"] : {}
       }
       M.implement(window.Element, {
           $J_TYPE: "element"
       });
       M.Doc = {
           jGetSize: function () {
               if (M.browser.touchScreen || M.browser.presto925 || M.browser.webkit419) {
                   return {
                       width: window.innerWidth,
                       height: window.innerHeight
                   }
               }
               return {
                   width: M.browser.getDoc().clientWidth,
                   height: M.browser.getDoc().clientHeight
               }
           },
           jGetScroll: function () {
               return {
                   x: window.pageXOffset || M.browser.getDoc().scrollLeft,
                   y: window.pageYOffset || M.browser.getDoc().scrollTop
               }
           },
           jGetFullSize: function () {
               var W = this.jGetSize();
               return {
                   width: Math.max(M.browser.getDoc().scrollWidth, W.width),
                   height: Math.max(M.browser.getDoc().scrollHeight, W.height)
               }
           }
       };
       M.extend(document, {
           $J_TYPE: "document"
       });
       M.extend(window, {
           $J_TYPE: "window"
       });
       M.extend([M.Element, M.Doc], {
           jFetch: function (Z, X) {
               var W = M.getStorage(this.$J_UUID),
                   Y = W[Z];
               if (undefined !== X && undefined === Y) {
                   Y = W[Z] = X
               }
               return (M.defined(Y) ? Y : null)
           },
           jStore: function (Y, X) {
               var W = M.getStorage(this.$J_UUID);
               W[Y] = X;
               return this
           },
           jDel: function (X) {
               var W = M.getStorage(this.$J_UUID);
               delete W[X];
               return this
           }
       });
       if (!(window.HTMLElement && window.HTMLElement.prototype && window.HTMLElement.prototype.getElementsByClassName)) {
           M.extend([M.Element, M.Doc], {
               getElementsByClassName: function (W) {
                   return M.$A(this.getElementsByTagName("*")).filter(function (Y) {
                       try {
                           return (1 == Y.nodeType && Y.className.has(W, " "))
                       } catch (X) {}
                   })
               }
           })
       }
       M.extend([M.Element, M.Doc], {
           byClass: function () {
               return this.getElementsByClassName(arguments[0])
           },
           byTag: function () {
               return this.getElementsByTagName(arguments[0])
           }
       });
       if (M.browser.fullScreen.capable && !document.requestFullScreen) {
           M.Element.requestFullScreen = function () {
               M.browser.fullScreen.request(this)
           }
       }
       M.Event = {
           $J_TYPE: "event",
           isQueueStopped: M.$false,
           stop: function () {
               return this.stopDistribution().stopDefaults()
           },
           stopDistribution: function () {
               if (this.stopPropagation) {
                   this.stopPropagation()
               } else {
                   this.cancelBubble = true
               }
               return this
           },
           stopDefaults: function () {
               if (this.preventDefault) {
                   this.preventDefault()
               } else {
                   this.returnValue = false
               }
               return this
           },
           stopQueue: function () {
               this.isQueueStopped = M.$true;
               return this
           },
           getClientXY: function () {
               var W = (/touch/i).test(this.type) ? this.changedTouches[0] : this;
               return !M.defined(W) ? {
                   x: 0,
                   y: 0
               } : {
                   x: W.clientX,
                   y: W.clientY
               }
           },
           jGetPageXY: function () {
               var W = (/touch/i).test(this.type) ? this.changedTouches[0] : this;
               return !M.defined(W) ? {
                   x: 0,
                   y: 0
               } : {
                   x: W.pageX || W.clientX + M.browser.getDoc().scrollLeft,
                   y: W.pageY || W.clientY + M.browser.getDoc().scrollTop
               }
           },
           getTarget: function () {
               var W = this.target || this.srcElement;
               while (W && W.nodeType === 3) {
                   W = W.parentNode
               }
               return W
           },
           getRelated: function () {
               var X = null;
               switch (this.type) {
               case "mouseover":
               case "pointerover":
               case "MSPointerOver":
                   X = this.relatedTarget || this.fromElement;
                   break;
               case "mouseout":
               case "pointerout":
               case "MSPointerOut":
                   X = this.relatedTarget || this.toElement;
                   break;
               default:
                   return X
               }
               try {
                   while (X && X.nodeType === 3) {
                       X = X.parentNode
                   }
               } catch (W) {
                   X = null
               }
               return X
           },
           getButton: function () {
               if (!this.which && this.button !== undefined) {
                   return (this.button & 1 ? 1 : (this.button & 2 ? 3 : (this.button & 4 ? 2 : 0)))
               }
               return this.which
           },
           isTouchEvent: function () {
               return (this.pointerType && (this.pointerType === "touch" || this.pointerType === this.MSPOINTER_TYPE_TOUCH)) || (/touch/i).test(this.type)
           },
           isPrimaryTouch: function () {
               if (this.pointerType) {
                   return (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) && this.isPrimary
               } else {
                   if (this instanceof window.TouchEvent) {
                       return this.changedTouches.length === 1 && (this.targetTouches.length ? this.targetTouches.length === 1 && this.targetTouches[0].identifier === this.changedTouches[0].identifier : true)
                   }
               }
               return false
           },
           getPrimaryTouch: function () {
               if (this.pointerType) {
                   return this.isPrimary && (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) ? this : null
               } else {
                   if (this instanceof window.TouchEvent) {
                       return this.changedTouches[0]
                   }
               }
               return null
           },
           getPrimaryTouchId: function () {
               if (this.pointerType) {
                   return this.isPrimary && (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) ? this.pointerId : null
               } else {
                   if (this instanceof window.TouchEvent) {
                       return this.changedTouches[0].identifier
                   }
               }
               return null
           }
       };
       M._event_add_ = "addEventListener";
       M._event_del_ = "removeEventListener";
       M._event_prefix_ = "";
       if (!document.addEventListener) {
           M._event_add_ = "attachEvent";
           M._event_del_ = "detachEvent";
           M._event_prefix_ = "on"
       }
       M.Event.Custom = {
           type: "",
           x: null,
           y: null,
           timeStamp: null,
           button: null,
           target: null,
           relatedTarget: null,
           $J_TYPE: "event.custom",
           isQueueStopped: M.$false,
           events: M.$([]),
           pushToEvents: function (W) {
               var X = W;
               this.events.push(X)
           },
           stop: function () {
               return this.stopDistribution().stopDefaults()
           },
           stopDistribution: function () {
               this.events.jEach(function (X) {
                   try {
                       X.stopDistribution()
                   } catch (W) {}
               });
               return this
           },
           stopDefaults: function () {
               this.events.jEach(function (X) {
                   try {
                       X.stopDefaults()
                   } catch (W) {}
               });
               return this
           },
           stopQueue: function () {
               this.isQueueStopped = M.$true;
               return this
           },
           getClientXY: function () {
               return {
                   x: this.clientX,
                   y: this.clientY
               }
           },
           jGetPageXY: function () {
               return {
                   x: this.x,
                   y: this.y
               }
           },
           getTarget: function () {
               return this.target
           },
           getRelated: function () {
               return this.relatedTarget
           },
           getButton: function () {
               return this.button
           },
           getOriginalTarget: function () {
               return this.events.length > 0 ? this.events[0].getTarget() : undefined
           },
           isTouchEvent: function () {
               return (this.pointerType && (this.pointerType === "touch" || this.pointerType === this.MSPOINTER_TYPE_TOUCH)) || (/touch/i).test(this.type)
           },
           isPrimaryTouch: function () {
               if (this.pointerType) {
                   return (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) && this.isPrimary
               } else {
                   if (this instanceof window.TouchEvent) {
                       return this.changedTouches.length === 1 && (this.targetTouches.length ? this.targetTouches[0].identifier === this.changedTouches[0].identifier : true)
                   }
               }
               return false
           },
           getPrimaryTouch: function () {
               if (this.pointerType) {
                   return this.isPrimary && (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) ? this : null
               } else {
                   if (this instanceof window.TouchEvent) {
                       return this.changedTouches[0]
                   }
               }
               return null
           },
           getPrimaryTouchId: function () {
               if (this.pointerType) {
                   return this.isPrimary && (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) ? this.pointerId : null
               } else {
                   if (this instanceof window.TouchEvent) {
                       return this.changedTouches[0].identifier
                   }
               }
               return null
           }
       };
       M.extend([M.Element, M.Doc], {
           jAddEvent: function (Y, aa, ab, ae) {
               var ad, W, Z, ac, X;
               if (M.jTypeOf(Y) === "string") {
                   X = Y.split(" ");
                   if (X.length > 1) {
                       Y = X
                   }
               }
               if (M.jTypeOf(Y) === "array") {
                   M.$(Y).jEach(this.jAddEvent.jBindAsEvent(this, aa, ab, ae));
                   return this
               }
               Y = T[Y] || Y;
               if (!Y || !aa || M.jTypeOf(Y) !== "string" || M.jTypeOf(aa) !== "function") {
                   return this
               }
               if (Y === "domready" && M.browser.ready) {
                   aa.call(this);
                   return this
               }
               ab = parseInt(ab || 50, 10);
               if (!aa.$J_EUID) {
                   aa.$J_EUID = Math.floor(Math.random() * M.now())
               }
               ad = M.Doc.jFetch.call(this, "_EVENTS_", {});
               W = ad[Y];
               if (!W) {
                   ad[Y] = W = M.$([]);
                   Z = this;
                   if (M.Event.Custom[Y]) {
                       M.Event.Custom[Y].handler.add.call(this, ae)
                   } else {
                       W.handle = function (af) {
                           af = M.extend(af || window.e, {
                               $J_TYPE: "event"
                           });
                           M.Doc.jCallEvent.call(Z, Y, M.$(af))
                       };
                       this[M._event_add_](M._event_prefix_ + Y, W.handle, false)
                   }
               }
               ac = {
                   type: Y,
                   fn: aa,
                   priority: ab,
                   euid: aa.$J_EUID
               };
               W.push(ac);
               W.sort(function (ag, af) {
                   return ag.priority - af.priority
               });
               return this
           },
           jRemoveEvent: function (ac) {
               var aa = M.Doc.jFetch.call(this, "_EVENTS_", {});
               var Y;
               var W;
               var X;
               var ad;
               var ab;
               var Z;
               ab = arguments.length > 1 ? arguments[1] : -100;
               if (M.jTypeOf(ac) === "string") {
                   Z = ac.split(" ");
                   if (Z.length > 1) {
                       ac = Z
                   }
               }
               if (M.jTypeOf(ac) === "array") {
                   M.$(ac).jEach(this.jRemoveEvent.jBindAsEvent(this, ab));
                   return this
               }
               ac = T[ac] || ac;
               if (!ac || M.jTypeOf(ac) !== "string" || !aa || !aa[ac]) {
                   return this
               }
               Y = aa[ac] || [];
               for (X = 0; X < Y.length; X++) {
                   W = Y[X];
                   if (ab === -100 || !!ab && ab.$J_EUID === W.euid) {
                       ad = Y.splice(X--, 1)
                   }
               }
               if (Y.length === 0) {
                   if (M.Event.Custom[ac]) {
                       M.Event.Custom[ac].handler.jRemove.call(this)
                   } else {
                       this[M._event_del_](M._event_prefix_ + ac, Y.handle, false)
                   }
                   delete aa[ac]
               }
               return this
           },
           jCallEvent: function (Z, ab) {
               var Y = M.Doc.jFetch.call(this, "_EVENTS_", {});
               var X;
               var W;
               Z = T[Z] || Z;
               if (!Z || M.jTypeOf(Z) !== "string" || !Y || !Y[Z]) {
                   return this
               }
               try {
                   ab = M.extend(ab || {}, {
                       type: Z
                   })
               } catch (aa) {}
               if (ab.timeStamp === undefined) {
                   ab.timeStamp = M.now()
               }
               X = Y[Z] || [];
               for (W = 0; W < X.length && !(ab.isQueueStopped && ab.isQueueStopped()); W++) {
                   X[W].fn.call(this, ab)
               }
           },
           jRaiseEvent: function (X, W) {
               var aa = (X !== "domready");
               var Z = this;
               var Y;
               X = T[X] || X;
               if (!aa) {
                   M.Doc.jCallEvent.call(this, X);
                   return this
               }
               if (Z === document && document.createEvent && !Z.dispatchEvent) {
                   Z = document.documentElement
               }
               if (document.createEvent) {
                   Y = document.createEvent(X);
                   Y.initEvent(W, true, true)
               } else {
                   Y = document.createEventObject();
                   Y.eventType = X
               }
               if (document.createEvent) {
                   Z.dispatchEvent(Y)
               } else {
                   Z.fireEvent("on" + W, Y)
               }
               return Y
           },
           jClearEvents: function () {
               var X = M.Doc.jFetch.call(this, "_EVENTS_");
               if (!X) {
                   return this
               }
               for (var W in X) {
                   M.Doc.jRemoveEvent.call(this, W)
               }
               M.Doc.jDel.call(this, "_EVENTS_");
               return this
           }
       });
       (function (W) {
           if (document.readyState === "complete") {
               return W.browser.onready.jDelay(1)
           }
           if (W.browser.webkit && W.browser.version < 420) {
               (function () {
                   if (W.$(["loaded", "complete"]).contains(document.readyState)) {
                       W.browser.onready()
                   } else {
                       arguments.callee.jDelay(50)
                   }
               }())
           } else {
               if (W.browser.trident && W.browser.ieMode < 9 && window === top) {
                   (function () {
                       if (W.$try(function () {
                               W.browser.getDoc().doScroll("left");
                               return true
                           })) {
                           W.browser.onready()
                       } else {
                           arguments.callee.jDelay(50)
                       }
                   }())
               } else {
                   W.Doc.jAddEvent.call(W.$(document), "DOMContentLoaded", W.browser.onready);
                   W.Doc.jAddEvent.call(W.$(window), "load", W.browser.onready)
               }
           }
       }(S));
       M.Class = function () {
           var aa = null,
               X = M.$A(arguments);
           if ("class" == M.jTypeOf(X[0])) {
               aa = X.shift()
           }
           var W = function () {
               for (var ad in this) {
                   this[ad] = M.detach(this[ad])
               }
               if (this.constructor.$parent) {
                   this.$parent = {};
                   var af = this.constructor.$parent;
                   for (var ae in af) {
                       var ac = af[ae];
                       switch (M.jTypeOf(ac)) {
                       case "function":
                           this.$parent[ae] = M.Class.wrap(this, ac);
                           break;
                       case "object":
                           this.$parent[ae] = M.detach(ac);
                           break;
                       case "array":
                           this.$parent[ae] = M.detach(ac);
                           break
                       }
                   }
               }
               var ab = (this.init) ? this.init.apply(this, arguments) : this;
               delete this.caller;
               return ab
           };
           if (!W.prototype.init) {
               W.prototype.init = M.$F
           }
           if (aa) {
               var Z = function () {};
               Z.prototype = aa.prototype;
               W.prototype = new Z;
               W.$parent = {};
               for (var Y in aa.prototype) {
                   W.$parent[Y] = aa.prototype[Y]
               }
           } else {
               W.$parent = null
           }
           W.constructor = M.Class;
           W.prototype.constructor = W;
           M.extend(W.prototype, X[0]);
           M.extend(W, {
               $J_TYPE: "class"
           });
           return W
       };
       S.Class.wrap = function (W, X) {
           return function () {
               var Z = this.caller;
               var Y = X.apply(W, arguments);
               return Y
           }
       };
       (function (Z) {
           var Y = Z.$;
           var W = 5,
               X = 300;
           Z.Event.Custom.btnclick = new Z.Class(Z.extend(Z.Event.Custom, {
               type: "btnclick",
               init: function (ac, ab) {
                   var aa = ab.jGetPageXY();
                   this.x = aa.x;
                   this.y = aa.y;
                   this.clientX = ab.clientX;
                   this.clientY = ab.clientY;
                   this.timeStamp = ab.timeStamp;
                   this.button = ab.getButton();
                   this.target = ac;
                   this.pushToEvents(ab)
               }
           }));
           Z.Event.Custom.btnclick.handler = {
               options: {
                   threshold: X,
                   button: 1
               },
               add: function (aa) {
                   this.jStore("event:btnclick:options", Z.extend(Z.detach(Z.Event.Custom.btnclick.handler.options), aa || {}));
                   this.jAddEvent("mousedown", Z.Event.Custom.btnclick.handler.handle, 1);
                   this.jAddEvent("mouseup", Z.Event.Custom.btnclick.handler.handle, 1);
                   this.jAddEvent("click", Z.Event.Custom.btnclick.handler.onclick, 1);
                   if (Z.browser.trident && Z.browser.ieMode < 9) {
                       this.jAddEvent("dblclick", Z.Event.Custom.btnclick.handler.handle, 1)
                   }
               },
               jRemove: function () {
                   this.jRemoveEvent("mousedown", Z.Event.Custom.btnclick.handler.handle);
                   this.jRemoveEvent("mouseup", Z.Event.Custom.btnclick.handler.handle);
                   this.jRemoveEvent("click", Z.Event.Custom.btnclick.handler.onclick);
                   if (Z.browser.trident && Z.browser.ieMode < 9) {
                       this.jRemoveEvent("dblclick", Z.Event.Custom.btnclick.handler.handle)
                   }
               },
               onclick: function (aa) {
                   aa.stopDefaults()
               },
               handle: function (ad) {
                   var ac, aa, ab;
                   aa = this.jFetch("event:btnclick:options");
                   if (ad.type != "dblclick" && ad.getButton() != aa.button) {
                       return
                   }
                   if (this.jFetch("event:btnclick:ignore")) {
                       this.jDel("event:btnclick:ignore");
                       return
                   }
                   if ("mousedown" == ad.type) {
                       ac = new Z.Event.Custom.btnclick(this, ad);
                       this.jStore("event:btnclick:btnclickEvent", ac)
                   } else {
                       if ("mouseup" == ad.type) {
                           ac = this.jFetch("event:btnclick:btnclickEvent");
                           if (!ac) {
                               return
                           }
                           ab = ad.jGetPageXY();
                           this.jDel("event:btnclick:btnclickEvent");
                           ac.pushToEvents(ad);
                           if (ad.timeStamp - ac.timeStamp <= aa.threshold && Math.sqrt(Math.pow(ab.x - ac.x, 2) + Math.pow(ab.y - ac.y, 2)) <= W) {
                               this.jCallEvent("btnclick", ac)
                           }
                           document.jCallEvent("mouseup", ad)
                       } else {
                           if (ad.type == "dblclick") {
                               ac = new Z.Event.Custom.btnclick(this, ad);
                               this.jCallEvent("btnclick", ac)
                           }
                       }
                   }
               }
           }
       })(S);
       (function (X) {
           var W = X.$;
           X.Event.Custom.mousedrag = new X.Class(X.extend(X.Event.Custom, {
               type: "mousedrag",
               state: "dragstart",
               dragged: false,
               init: function (ab, aa, Z) {
                   var Y = aa.jGetPageXY();
                   this.x = Y.x;
                   this.y = Y.y;
                   this.clientX = aa.clientX;
                   this.clientY = aa.clientY;
                   this.timeStamp = aa.timeStamp;
                   this.button = aa.getButton();
                   this.target = ab;
                   this.pushToEvents(aa);
                   this.state = Z
               }
           }));
           X.Event.Custom.mousedrag.handler = {
               add: function () {
                   var Z = X.Event.Custom.mousedrag.handler.handleMouseMove.jBindAsEvent(this);
                   var Y = X.Event.Custom.mousedrag.handler.handleMouseUp.jBindAsEvent(this);
                   this.jAddEvent("mousedown", X.Event.Custom.mousedrag.handler.handleMouseDown, 1);
                   this.jAddEvent("mouseup", X.Event.Custom.mousedrag.handler.handleMouseUp, 1);
                   document.jAddEvent("mousemove", Z, 1);
                   document.jAddEvent("mouseup", Y, 1);
                   this.jStore("event:mousedrag:listeners:document:move", Z);
                   this.jStore("event:mousedrag:listeners:document:end", Y)
               },
               jRemove: function () {
                   this.jRemoveEvent("mousedown", X.Event.Custom.mousedrag.handler.handleMouseDown);
                   this.jRemoveEvent("mouseup", X.Event.Custom.mousedrag.handler.handleMouseUp);
                   W(document).jRemoveEvent("mousemove", this.jFetch("event:mousedrag:listeners:document:move") || X.$F);
                   W(document).jRemoveEvent("mouseup", this.jFetch("event:mousedrag:listeners:document:end") || X.$F);
                   this.jDel("event:mousedrag:listeners:document:move");
                   this.jDel("event:mousedrag:listeners:document:end")
               },
               handleMouseDown: function (Z) {
                   var Y;
                   if (Z.getButton() !== 1) {
                       return
                   }
                   Y = new X.Event.Custom.mousedrag(this, Z, "dragstart");
                   this.jStore("event:mousedrag:dragstart", Y)
               },
               handleMouseUp: function (Z) {
                   var Y;
                   Y = this.jFetch("event:mousedrag:dragstart");
                   if (!Y) {
                       return
                   }
                   if (Y.dragged) {
                       Z.stopDefaults()
                   }
                   Y = new X.Event.Custom.mousedrag(this, Z, "dragend");
                   this.jDel("event:mousedrag:dragstart");
                   this.jCallEvent("mousedrag", Y)
               },
               handleMouseMove: function (Z) {
                   var Y;
                   Y = this.jFetch("event:mousedrag:dragstart");
                   if (!Y) {
                       return
                   }
                   Z.stopDefaults();
                   if (!Y.dragged) {
                       Y.dragged = true;
                       this.jCallEvent("mousedrag", Y)
                   }
                   Y = new X.Event.Custom.mousedrag(this, Z, "dragmove");
                   this.jCallEvent("mousedrag", Y)
               }
           }
       })(S);
       (function (X) {
           var W = X.$;
           X.Event.Custom.dblbtnclick = new X.Class(X.extend(X.Event.Custom, {
               type: "dblbtnclick",
               timedout: false,
               tm: null,
               init: function (aa, Z) {
                   var Y = Z.jGetPageXY();
                   this.x = Y.x;
                   this.y = Y.y;
                   this.clientX = Z.clientX;
                   this.clientY = Z.clientY;
                   this.timeStamp = Z.timeStamp;
                   this.button = Z.getButton();
                   this.target = aa;
                   this.pushToEvents(Z)
               }
           }));
           X.Event.Custom.dblbtnclick.handler = {
               options: {
                   threshold: 200
               },
               add: function (Y) {
                   this.jStore("event:dblbtnclick:options", X.extend(X.detach(X.Event.Custom.dblbtnclick.handler.options), Y || {}));
                   this.jAddEvent("btnclick", X.Event.Custom.dblbtnclick.handler.handle, 1)
               },
               jRemove: function () {
                   this.jRemoveEvent("btnclick", X.Event.Custom.dblbtnclick.handler.handle)
               },
               handle: function (aa) {
                   var Z, Y;
                   Z = this.jFetch("event:dblbtnclick:event");
                   Y = this.jFetch("event:dblbtnclick:options");
                   if (!Z) {
                       Z = new X.Event.Custom.dblbtnclick(this, aa);
                       Z.tm = setTimeout(function () {
                           Z.timedout = true;
                           aa.isQueueStopped = X.$false;
                           this.jCallEvent("btnclick", aa);
                           this.jDel("event:dblbtnclick:event")
                       }.jBind(this), Y.threshold + 10);
                       this.jStore("event:dblbtnclick:event", Z);
                       aa.stopQueue()
                   } else {
                       clearTimeout(Z.tm);
                       this.jDel("event:dblbtnclick:event");
                       if (!Z.timedout) {
                           Z.pushToEvents(aa);
                           aa.stopQueue().stop();
                           this.jCallEvent("dblbtnclick", Z)
                       } else {}
                   }
               }
           }
       })(S);
       (function (Z) {
           var Y = Z.$;
           var W = 10;
           var X = 200;
           Z.Event.Custom.tap = new Z.Class(Z.extend(Z.Event.Custom, {
               type: "tap",
               id: null,
               init: function (ab, aa) {
                   var ac = aa.getPrimaryTouch();
                   this.id = ac.pointerId || ac.identifier;
                   this.x = ac.pageX;
                   this.y = ac.pageY;
                   this.pageX = ac.pageX;
                   this.pageY = ac.pageY;
                   this.clientX = ac.clientX;
                   this.clientY = ac.clientY;
                   this.timeStamp = aa.timeStamp;
                   this.button = 0;
                   this.target = ab;
                   this.pushToEvents(aa)
               }
           }));
           Z.Event.Custom.tap.handler = {
               add: function (aa) {
                   this.jAddEvent(["touchstart", "pointerdown"], Z.Event.Custom.tap.handler.onTouchStart, 1);
                   this.jAddEvent(["touchend", "pointerup"], Z.Event.Custom.tap.handler.onTouchEnd, 1);
                   this.jAddEvent("click", Z.Event.Custom.tap.handler.onClick, 1)
               },
               jRemove: function () {
                   this.jRemoveEvent(["touchstart", "pointerdown"], Z.Event.Custom.tap.handler.onTouchStart);
                   this.jRemoveEvent(["touchend", "pointerup"], Z.Event.Custom.tap.handler.onTouchEnd);
                   this.jRemoveEvent("click", Z.Event.Custom.tap.handler.onClick)
               },
               onClick: function (aa) {
                   aa.stopDefaults()
               },
               onTouchStart: function (aa) {
                   if (!aa.isPrimaryTouch()) {
                       this.jDel("event:tap:event");
                       return
                   }
                   this.jStore("event:tap:event", new Z.Event.Custom.tap(this, aa));
                   this.jStore("event:btnclick:ignore", true)
               },
               onTouchEnd: function (ad) {
                   var ab = Z.now();
                   var ac = this.jFetch("event:tap:event");
                   var aa = this.jFetch("event:tap:options");
                   if (!ac || !ad.isPrimaryTouch()) {
                       return
                   }
                   this.jDel("event:tap:event");
                   if (ac.id === ad.getPrimaryTouchId() && ad.timeStamp - ac.timeStamp <= X && Math.sqrt(Math.pow(ad.getPrimaryTouch().pageX - ac.x, 2) + Math.pow(ad.getPrimaryTouch().pageY - ac.y, 2)) <= W) {
                       this.jDel("event:btnclick:btnclickEvent");
                       ad.stop();
                       ac.pushToEvents(ad);
                       this.jCallEvent("tap", ac)
                   }
               }
           }
       }(S));
       M.Event.Custom.dbltap = new M.Class(M.extend(M.Event.Custom, {
           type: "dbltap",
           timedout: false,
           tm: null,
           init: function (X, W) {
               this.x = W.x;
               this.y = W.y;
               this.clientX = W.clientX;
               this.clientY = W.clientY;
               this.timeStamp = W.timeStamp;
               this.button = 0;
               this.target = X;
               this.pushToEvents(W)
           }
       }));
       M.Event.Custom.dbltap.handler = {
           options: {
               threshold: 300
           },
           add: function (W) {
               this.jStore("event:dbltap:options", M.extend(M.detach(M.Event.Custom.dbltap.handler.options), W || {}));
               this.jAddEvent("tap", M.Event.Custom.dbltap.handler.handle, 1)
           },
           jRemove: function () {
               this.jRemoveEvent("tap", M.Event.Custom.dbltap.handler.handle)
           },
           handle: function (Y) {
               var X, W;
               X = this.jFetch("event:dbltap:event");
               W = this.jFetch("event:dbltap:options");
               if (!X) {
                   X = new M.Event.Custom.dbltap(this, Y);
                   X.tm = setTimeout(function () {
                       X.timedout = true;
                       Y.isQueueStopped = M.$false;
                       this.jCallEvent("tap", Y)
                   }.jBind(this), W.threshold + 10);
                   this.jStore("event:dbltap:event", X);
                   Y.stopQueue()
               } else {
                   clearTimeout(X.tm);
                   this.jDel("event:dbltap:event");
                   if (!X.timedout) {
                       X.pushToEvents(Y);
                       Y.stopQueue().stop();
                       this.jCallEvent("dbltap", X)
                   } else {}
               }
           }
       };
       (function (Y) {
           var X = Y.$;
           var W = 10;
           Y.Event.Custom.touchdrag = new Y.Class(Y.extend(Y.Event.Custom, {
               type: "touchdrag",
               state: "dragstart",
               id: null,
               dragged: false,
               init: function (ab, aa, Z) {
                   var ac = aa.getPrimaryTouch();
                   this.id = ac.pointerId || ac.identifier;
                   this.clientX = ac.clientX;
                   this.clientY = ac.clientY;
                   this.pageX = ac.pageX;
                   this.pageY = ac.pageY;
                   this.x = ac.pageX;
                   this.y = ac.pageY;
                   this.timeStamp = aa.timeStamp;
                   this.button = 0;
                   this.target = ab;
                   this.pushToEvents(aa);
                   this.state = Z
               }
           }));
           Y.Event.Custom.touchdrag.handler = {
               add: function () {
                   var aa = Y.Event.Custom.touchdrag.handler.onTouchMove.jBind(this);
                   var Z = Y.Event.Custom.touchdrag.handler.onTouchEnd.jBind(this);
                   this.jAddEvent(["touchstart", "pointerdown"], Y.Event.Custom.touchdrag.handler.onTouchStart, 1);
                   this.jAddEvent(["touchend", "pointerup"], Y.Event.Custom.touchdrag.handler.onTouchEnd, 1);
                   this.jAddEvent(["touchmove", "pointermove"], Y.Event.Custom.touchdrag.handler.onTouchMove, 1);
                   this.jStore("event:touchdrag:listeners:document:move", aa);
                   this.jStore("event:touchdrag:listeners:document:end", Z);
                   X(document).jAddEvent("pointermove", aa, 1);
                   X(document).jAddEvent("pointerup", Z, 1)
               },
               jRemove: function () {
                   this.jRemoveEvent(["touchstart", "pointerdown"], Y.Event.Custom.touchdrag.handler.onTouchStart);
                   this.jRemoveEvent(["touchend", "pointerup"], Y.Event.Custom.touchdrag.handler.onTouchEnd);
                   this.jRemoveEvent(["touchmove", "pointermove"], Y.Event.Custom.touchdrag.handler.onTouchMove);
                   X(document).jRemoveEvent("pointermove", this.jFetch("event:touchdrag:listeners:document:move") || Y.$F, 1);
                   X(document).jRemoveEvent("pointerup", this.jFetch("event:touchdrag:listeners:document:end") || Y.$F, 1);
                   this.jDel("event:touchdrag:listeners:document:move");
                   this.jDel("event:touchdrag:listeners:document:end")
               },
               onTouchStart: function (aa) {
                   var Z;
                   if (!aa.isPrimaryTouch()) {
                       return
                   }
                   Z = new Y.Event.Custom.touchdrag(this, aa, "dragstart");
                   this.jStore("event:touchdrag:dragstart", Z)
               },
               onTouchEnd: function (aa) {
                   var Z;
                   Z = this.jFetch("event:touchdrag:dragstart");
                   if (!Z || !Z.dragged || Z.id !== aa.getPrimaryTouchId()) {
                       return
                   }
                   Z = new Y.Event.Custom.touchdrag(this, aa, "dragend");
                   this.jDel("event:touchdrag:dragstart");
                   this.jCallEvent("touchdrag", Z)
               },
               onTouchMove: function (aa) {
                   var Z;
                   Z = this.jFetch("event:touchdrag:dragstart");
                   if (!Z || !aa.isPrimaryTouch()) {
                       return
                   }
                   if (Z.id !== aa.getPrimaryTouchId()) {
                       this.jDel("event:touchdrag:dragstart");
                       return
                   }
                   if (!Z.dragged && Math.sqrt(Math.pow(aa.getPrimaryTouch().pageX - Z.x, 2) + Math.pow(aa.getPrimaryTouch().pageY - Z.y, 2)) > W) {
                       Z.dragged = true;
                       this.jCallEvent("touchdrag", Z)
                   }
                   if (!Z.dragged) {
                       return
                   }
                   Z = new Y.Event.Custom.touchdrag(this, aa, "dragmove");
                   this.jCallEvent("touchdrag", Z)
               }
           }
       }(S));
       (function (Z) {
           var ad = Z.$;
           var aa = null;

           function W(am, al) {
               var ak = al.x - am.x;
               var an = al.y - am.y;
               return Math.sqrt(ak * ak + an * an)
           }

           function af(aq, ar) {
               var ap = Array.prototype.slice.call(aq);
               var ao = Math.abs(ap[1].pageX - ap[0].pageX);
               var am = Math.abs(ap[1].pageY - ap[0].pageY);
               var an = Math.min(ap[1].pageX, ap[0].pageX) + ao / 2;
               var al = Math.min(ap[1].pageY, ap[0].pageY) + am / 2;
               var ak = 0;
               ar.points = [ap[0], ap[1]];
               ak = Math.pow(W({
                   x: ap[0].pageX,
                   y: ap[0].pageY
               }, {
                   x: ap[1].pageX,
                   y: ap[1].pageY
               }), 2);
               ar.centerPoint = {
                   x: an,
                   y: al
               };
               ar.x = ar.centerPoint.x;
               ar.y = ar.centerPoint.y;
               return ak
           }

           function ai(ak) {
               return ak / aa
           }

           function X(am, al) {
               var ak;
               if (am.targetTouches && am.changedTouches) {
                   if (am.targetTouches) {
                       ak = am.targetTouches
                   } else {
                       ak = am.changedTouches
                   }
                   ak = Array.prototype.slice.call(ak)
               } else {
                   ak = [];
                   if (al) {
                       al.forEach(function (an) {
                           ak.push(an)
                       })
                   }
               }
               return ak
           }

           function Y(an, am, al) {
               var ak = false;
               if (an.pointerId && an.pointerType === "touch" && (!al || am.has(an.pointerId))) {
                   am.set(an.pointerId, an);
                   ak = true
               }
               return ak
           }

           function ae(al, ak) {
               if (al.pointerId && al.pointerType === "touch" && ak && ak.has(al.pointerId)) {
                   ak["delete"](al.pointerId)
               }
           }

           function ah(al) {
               var ak;
               if (al.pointerId && al.pointerType === "touch") {
                   ak = al.pointerId
               } else {
                   ak = al.identifier
               }
               return ak
           }

           function ac(an, al) {
               var am;
               var ao;
               var ak = false;
               for (am = 0; am < an.length; am++) {
                   if (al.length === 2) {
                       break
                   } else {
                       ao = ah(an[am]);
                       if (!al.contains(ao)) {
                           al.push(ao);
                           ak = true
                       }
                   }
               }
               return ak
           }

           function ag(al) {
               var ak = ad([]);
               al.forEach(function (am) {
                   ak.push(ah(am))
               });
               return ak
           }

           function aj(ao, al) {
               var am;
               var an;
               var ak = false;
               if (al) {
                   an = ag(ao);
                   for (am = 0; am < al.length; am++) {
                       if (!an.contains(al[am])) {
                           al.splice(am, 1);
                           ak = true;
                           break
                       }
                   }
               }
               return ak
           }

           function ab(an, al) {
               var am;
               var ak = ad([]);
               for (am = 0; am < an.length; am++) {
                   if (al.contains(ah(an[am]))) {
                       ak.push(an[am]);
                       if (ak.length === 2) {
                           break
                       }
                   }
               }
               return ak
           }
           Z.Event.Custom.pinch = new Z.Class(Z.extend(Z.Event.Custom, {
               type: "pinch",
               state: "pinchstart",
               init: function (am, al, ak, an) {
                   this.target = am;
                   this.state = ak;
                   this.x = an.x;
                   this.y = an.y;
                   this.timeStamp = al.timeStamp;
                   this.scale = an.scale;
                   this.space = an.space;
                   this.zoom = an.zoom;
                   this.state = ak;
                   this.centerPoint = an.centerPoint;
                   this.points = an.points;
                   this.pushToEvents(al)
               }
           }));
           Z.Event.Custom.pinch.handler = {
               variables: {
                   x: 0,
                   y: 0,
                   space: 0,
                   scale: 1,
                   zoom: 0,
                   startSpace: 0,
                   startScale: 1,
                   started: false,
                   dragged: false,
                   points: [],
                   centerPoint: {
                       x: 0,
                       y: 0
                   }
               },
               add: function (am) {
                   if (!aa) {
                       aa = (function () {
                           var an = ad(window).jGetSize();
                           an.width = Math.min(an.width, an.height);
                           an.height = an.width;
                           return Math.pow(W({
                               x: 0,
                               y: 0
                           }, {
                               x: an.width,
                               y: an.height
                           }), 2)
                       })()
                   }
                   var al = Z.Event.Custom.pinch.handler.onTouchMove.jBind(this);
                   var ak = Z.Event.Custom.pinch.handler.onTouchEnd.jBind(this);
                   this.jAddEvent(["click", "tap"], Z.Event.Custom.pinch.handler.onClick, 1);
                   this.jAddEvent(["touchstart", "pointerdown"], Z.Event.Custom.pinch.handler.onTouchStart, 1);
                   this.jAddEvent(["touchend", "pointerup"], Z.Event.Custom.pinch.handler.onTouchEnd, 1);
                   this.jAddEvent(["touchmove", "pointermove"], Z.Event.Custom.pinch.handler.onTouchMove, 1);
                   this.jStore("event:pinch:listeners:touchmove", al);
                   this.jStore("event:pinch:listeners:touchend", ak);
                   Z.doc.jAddEvent("pointermove", al, 1);
                   Z.doc.jAddEvent("pointerup", ak, 1)
               },
               jRemove: function () {
                   this.jRemoveEvent(["click", "tap"], Z.Event.Custom.pinch.handler.onClick);
                   this.jRemoveEvent(["touchstart", "pointerdown"], Z.Event.Custom.pinch.handler.onTouchStart);
                   this.jRemoveEvent(["touchend", "pointerup"], Z.Event.Custom.pinch.handler.onTouchEnd);
                   this.jRemoveEvent(["touchmove", "pointermove"], Z.Event.Custom.pinch.handler.onTouchMove);
                   Z.doc.jRemoveEvent("pointermove", this.jFetch("event:pinch:listeners:touchmove"));
                   Z.doc.jRemoveEvent("pointerup", this.jFetch("event:pinch:listeners:touchend"));
                   this.jDel("event:pinch:listeners:touchmove");
                   this.jDel("event:pinch:listeners:touchend");
                   this.jDel("event:pinch:pinchstart");
                   this.jDel("event:pinch:variables");
                   this.jDel("event:pinch:activepoints");
                   var ak = this.jFetch("event:pinch:cache");
                   if (ak) {
                       ak.clear()
                   }
                   this.jDel("event:pinch:cache")
               },
               onClick: function (ak) {
                   ak.stop()
               },
               setVariables: function (al, am) {
                   var ak = am.space;
                   if (al.length > 1) {
                       am.space = af(al, am);
                       if (!am.startSpace) {
                           am.startSpace = am.space
                       }
                       if (ak > am.space) {
                           am.zoom = -1
                       } else {
                           if (ak < am.space) {
                               am.zoom = 1
                           } else {
                               am.zoom = 0
                           }
                       }
                       am.scale = ai(am.space)
                   } else {
                       am.points = Array.prototype.slice.call(al, 0, 2)
                   }
               },
               onTouchMove: function (am) {
                   var al;
                   var ak = this.jFetch("event:pinch:cache");
                   var ao = this.jFetch("event:pinch:variables") || Z.extend({}, Z.Event.Custom.pinch.handler.variables);
                   var an = this.jFetch("event:pinch:activepoints");
                   if (ao.started) {
                       if (am.pointerId && !Y(am, ak, true)) {
                           return
                       }
                       am.stop();
                       Z.Event.Custom.pinch.handler.setVariables(ab(X(am, ak), an), ao);
                       al = new Z.Event.Custom.pinch(this, am, "pinchmove", ao);
                       this.jCallEvent("pinch", al)
                   }
               },
               onTouchStart: function (an) {
                   var al;
                   var ap;
                   var am;
                   var ak = this.jFetch("event:pinch:cache");
                   var ao = this.jFetch("event:pinch:activepoints");
                   if (an.pointerType === "mouse") {
                       return
                   }
                   if (!ao) {
                       ao = ad([]);
                       this.jStore("event:pinch:activepoints", ao)
                   }
                   if (!ao.length) {
                       ad(an.target).jAddEvent(["touchend", "pointerup"], this.jFetch("event:pinch:listeners:touchend"), 1)
                   }
                   if (!ak) {
                       ak = new Map();
                       this.jStore("event:pinch:cache", ak)
                   }
                   Y(an, ak);
                   am = X(an, ak);
                   ac(am, ao);
                   if (am.length === 2) {
                       al = this.jFetch("event:pinch:pinchstart");
                       ap = this.jFetch("event:pinch:variables") || Z.extend({}, Z.Event.Custom.pinch.handler.variables);
                       Z.Event.Custom.pinch.handler.setVariables(ab(am, ao), ap);
                       if (!al) {
                           al = new Z.Event.Custom.pinch(this, an, "pinchstart", ap);
                           this.jStore("event:pinch:pinchstart", al);
                           this.jStore("event:pinch:variables", ap);
                           aa = ap.space;
                           this.jCallEvent("pinch", al);
                           ap.started = true
                       }
                   }
               },
               onTouchEnd: function (ap) {
                   var ao;
                   var an;
                   var ar;
                   var al;
                   var am = this.jFetch("event:pinch:cache");
                   var aq;
                   var ak;
                   if (ap.pointerType === "mouse" || ap.pointerId && (!am || !am.has(ap.pointerId))) {
                       return
                   }
                   an = this.jFetch("event:pinch:pinchstart");
                   ar = this.jFetch("event:pinch:variables");
                   aq = this.jFetch("event:pinch:activepoints");
                   ao = X(ap, am);
                   ae(ap, am);
                   ak = aj(ao, aq);
                   if (!an || !ar || !ar.started || !ak || !aq) {
                       return
                   }
                   if (ak) {
                       ac(ao, aq)
                   }
                   al = "pinchend";
                   if (ao.length > 1) {
                       al = "pinchresize"
                   } else {
                       ap.target.jRemoveEvent(["touchend", "pointerup"], this.jFetch("event:pinch:listeners:touchend"));
                       if (am) {
                           am.clear()
                       }
                       this.jDel("event:pinch:pinchstart");
                       this.jDel("event:pinch:variables");
                       this.jDel("event:pinch:cache");
                       this.jDel("event:pinch:activepoints")
                   }
                   Z.Event.Custom.pinch.handler.setVariables(ab(ao, aq), ar);
                   an = new Z.Event.Custom.pinch(this, ap, al, ar);
                   this.jCallEvent("pinch", an)
               }
           }
       }(S));
       (function (ab) {
           var Z = ab.$;
           ab.Event.Custom.mousescroll = new ab.Class(ab.extend(ab.Event.Custom, {
               type: "mousescroll",
               init: function (ah, ag, aj, ad, ac, ai, ae) {
                   var af = ag.jGetPageXY();
                   this.x = af.x;
                   this.y = af.y;
                   this.timeStamp = ag.timeStamp;
                   this.target = ah;
                   this.delta = aj || 0;
                   this.deltaX = ad || 0;
                   this.deltaY = ac || 0;
                   this.deltaZ = ai || 0;
                   this.deltaFactor = ae || 0;
                   this.deltaMode = ag.deltaMode || 0;
                   this.isMouse = false;
                   this.pushToEvents(ag)
               }
           }));
           var aa, X;

           function W() {
               aa = null
           }

           function Y(ac, ad) {
               return (ac > 50) || (1 === ad && !("win" == ab.browser.platform && ac < 1)) || (0 === ac % 12) || (0 == ac % 4.000244140625)
           }
           ab.Event.Custom.mousescroll.handler = {
               eventType: "onwheel" in document || ab.browser.ieMode > 8 ? "wheel" : "mousewheel",
               add: function () {
                   this.jAddEvent(ab.Event.Custom.mousescroll.handler.eventType, ab.Event.Custom.mousescroll.handler.handle, 1)
               },
               jRemove: function () {
                   this.jRemoveEvent(ab.Event.Custom.mousescroll.handler.eventType, ab.Event.Custom.mousescroll.handler.handle, 1)
               },
               handle: function (ah) {
                   var ai = 0,
                       af = 0,
                       ad = 0,
                       ac = 0,
                       ag, ae;
                   if (ah.detail) {
                       ad = ah.detail * -1
                   }
                   if (ah.wheelDelta !== undefined) {
                       ad = ah.wheelDelta
                   }
                   if (ah.wheelDeltaY !== undefined) {
                       ad = ah.wheelDeltaY
                   }
                   if (ah.wheelDeltaX !== undefined) {
                       af = ah.wheelDeltaX * -1
                   }
                   if (ah.deltaY) {
                       ad = -1 * ah.deltaY
                   }
                   if (ah.deltaX) {
                       af = ah.deltaX
                   }
                   if (0 === ad && 0 === af) {
                       return
                   }
                   ai = 0 === ad ? af : ad;
                   ac = Math.max(Math.abs(ad), Math.abs(af));
                   if (!aa || ac < aa) {
                       aa = ac
                   }
                   ag = ai > 0 ? "floor" : "ceil";
                   ai = Math[ag](ai / aa);
                   af = Math[ag](af / aa);
                   ad = Math[ag](ad / aa);
                   if (X) {
                       clearTimeout(X)
                   }
                   X = setTimeout(W, 200);
                   ae = new ab.Event.Custom.mousescroll(this, ah, ai, af, ad, 0, aa);
                   ae.isMouse = Y(aa, ah.deltaMode || 0);
                   this.jCallEvent("mousescroll", ae)
               }
           }
       })(S);
       M.win = M.$(window);
       M.doc = M.$(document);
       return S
   })();
   (function (I) {
       if (!I) {
           throw "MagicJS not found"
       }
       var H = I.$;
       var G = window.URL || window.webkitURL || null;
       u.ImageLoader = new I.Class({
           img: null,
           ready: false,
           options: {
               onprogress: I.$F,
               onload: I.$F,
               onabort: I.$F,
               onerror: I.$F,
               oncomplete: I.$F,
               onxhrerror: I.$F,
               xhr: false,
               progressiveLoad: true
           },
           size: null,
           _timer: null,
           loadedBytes: 0,
           _handlers: {
               onprogress: function (J) {
                   if (J.target && (200 === J.target.status || 304 === J.target.status) && J.lengthComputable) {
                       this.options.onprogress.jBind(null, (J.loaded - (this.options.progressiveLoad ? this.loadedBytes : 0)) / J.total).jDelay(1);
                       this.loadedBytes = J.loaded
                   }
               },
               onload: function (J) {
                   if (J) {
                       H(J).stop()
                   }
                   this._unbind();
                   if (this.ready) {
                       return
                   }
                   this.ready = true;
                   this._cleanup();
                   !this.options.xhr && this.options.onprogress.jBind(null, 1).jDelay(1);
                   this.options.onload.jBind(null, this).jDelay(1);
                   this.options.oncomplete.jBind(null, this).jDelay(1)
               },
               onabort: function (J) {
                   if (J) {
                       H(J).stop()
                   }
                   this._unbind();
                   this.ready = false;
                   this._cleanup();
                   this.options.onabort.jBind(null, this).jDelay(1);
                   this.options.oncomplete.jBind(null, this).jDelay(1)
               },
               onerror: function (J) {
                   if (J) {
                       H(J).stop()
                   }
                   this._unbind();
                   this.ready = false;
                   this._cleanup();
                   this.options.onerror.jBind(null, this).jDelay(1);
                   this.options.oncomplete.jBind(null, this).jDelay(1)
               }
           },
           _bind: function () {
               H(["load", "abort", "error"]).jEach(function (J) {
                   this.img.jAddEvent(J, this._handlers["on" + J].jBindAsEvent(this).jDefer(1))
               }, this)
           },
           _unbind: function () {
               if (this._timer) {
                   try {
                       clearTimeout(this._timer)
                   } catch (J) {}
                   this._timer = null
               }
               H(["load", "abort", "error"]).jEach(function (K) {
                   this.img.jRemoveEvent(K)
               }, this)
           },
           _cleanup: function () {
               this.jGetSize();
               if (this.img.jFetch("new")) {
                   var J = this.img.parentNode;
                   this.img.jRemove().jDel("new").jSetCss({
                       position: "static",
                       top: "auto"
                   });
                   J.kill()
               }
           },
           loadBlob: function (K) {
               var L = new XMLHttpRequest(),
                   J;
               H(["abort", "progress"]).jEach(function (M) {
                   L["on" + M] = H(function (N) {
                       this._handlers["on" + M].call(this, N)
                   }).jBind(this)
               }, this);
               L.onerror = H(function () {
                   this.options.onxhrerror.jBind(null, this).jDelay(1);
                   this.options.xhr = false;
                   this._bind();
                   this.img.src = K
               }).jBind(this);
               L.onload = H(function () {
                   if (200 !== L.status && 304 !== L.status) {
                       this._handlers.onerror.call(this);
                       return
                   }
                   J = L.response;
                   this._bind();
                   if (G && !I.browser.trident && !("ios" === I.browser.platform && I.browser.version < 537)) {
                       this.img.setAttribute("src", G.createObjectURL(J))
                   } else {
                       this.img.src = K
                   }
               }).jBind(this);
               L.open("GET", K);
               L.responseType = "blob";
               L.send()
           },
           init: function (K, J) {
               this.options = I.extend(this.options, J);
               this.img = H(K) || I.$new("img").jSetCss({
                   maxWidth: "none",
                   maxHeight: "none"
               }).jAppendTo(I.$new("div").jAddClass("magic-temporary-img").jSetCss({
                   position: "absolute",
                   top: -10000,
                   width: 10,
                   height: 10,
                   overflow: "hidden"
               }).jAppendTo(document.body)).jStore("new", true);
               if (J.referrerPolicy) {
                   this.img.setAttribute("referrerpolicy", J.referrerPolicy)
               }
               if (I.browser.features.xhr2 && this.options.xhr && I.jTypeOf(K) === "string") {
                   this.loadBlob(K);
                   return
               }
               var L = function () {
                   if (this.isReady()) {
                       this._handlers.onload.call(this)
                   } else {
                       this._handlers.onerror.call(this)
                   }
                   L = null
               }.jBind(this);
               this._bind();
               if ("string" == I.jTypeOf(K)) {
                   this.img.src = K
               } else {
                   if (I.browser.trident && 5 == I.browser.version && I.browser.ieMode < 9) {
                       this.img.onreadystatechange = function () {
                           if (/loaded|complete/.test(this.img.readyState)) {
                               this.img.onreadystatechange = null;
                               L && L()
                           }
                       }.jBind(this)
                   }
                   this.img.src = K.getAttribute("src")
               }
               this.img && this.img.complete && L && (this._timer = L.jDelay(100))
           },
           destroy: function () {
               this._unbind();
               this._cleanup();
               this.ready = false;
               return this
           },
           isReady: function () {
               var J = this.img;
               return (J.naturalWidth) ? (J.naturalWidth > 0) : (J.readyState) ? ("complete" == J.readyState) : J.width > 0
           },
           jGetSize: function () {
               return this.size || (this.size = {
                   width: this.img.naturalWidth || this.img.width,
                   height: this.img.naturalHeight || this.img.height
               })
           }
       })
   })(u);
   (function (H) {
       if (!H) {
           throw "MagicJS not found"
       }
       if (H.FX) {
           return
       }
       var G = H.$;
       H.FX = new H.Class({
           init: function (J, I) {
               var K;
               this.el = H.$(J);
               this.options = H.extend(this.options, I);
               this.timer = false;
               this.easeFn = this.cubicBezierAtTime;
               K = H.FX.Transition[this.options.transition] || this.options.transition;
               if ("function" === H.jTypeOf(K)) {
                   this.easeFn = K
               } else {
                   this.cubicBezier = this.parseCubicBezier(K) || this.parseCubicBezier("ease")
               }
               if ("string" == H.jTypeOf(this.options.cycles)) {
                   this.options.cycles = "infinite" === this.options.cycles ? Infinity : parseInt(this.options.cycles) || 1
               }
           },
           options: {
               fps: 60,
               duration: 600,
               transition: "ease",
               cycles: 1,
               direction: "normal",
               onStart: H.$F,
               onComplete: H.$F,
               onBeforeRender: H.$F,
               onAfterRender: H.$F,
               forceAnimation: false,
               roundCss: false
           },
           styles: null,
           cubicBezier: null,
           easeFn: null,
           setTransition: function (I) {
               this.options.transition = I;
               I = H.FX.Transition[this.options.transition] || this.options.transition;
               if ("function" === H.jTypeOf(I)) {
                   this.easeFn = I
               } else {
                   this.easeFn = this.cubicBezierAtTime;
                   this.cubicBezier = this.parseCubicBezier(I) || this.parseCubicBezier("ease")
               }
           },
           start: function (K) {
               var I = /\%$/,
                   J;
               this.styles = K || {};
               this.cycle = 0;
               this.state = 0;
               this.curFrame = 0;
               this.pStyles = {};
               this.alternate = "alternate" === this.options.direction || "alternate-reverse" === this.options.direction;
               this.continuous = "continuous" === this.options.direction || "continuous-reverse" === this.options.direction;
               for (J in this.styles) {
                   I.test(this.styles[J][0]) && (this.pStyles[J] = true);
                   if ("reverse" === this.options.direction || "alternate-reverse" === this.options.direction || "continuous-reverse" === this.options.direction) {
                       this.styles[J].reverse()
                   }
               }
               this.startTime = H.now();
               this.finishTime = this.startTime + this.options.duration;
               this.options.onStart.call();
               if (0 === this.options.duration) {
                   this.render(1);
                   this.options.onComplete.call()
               } else {
                   this.loopBind = this.loop.jBind(this);
                   if (!this.options.forceAnimation && H.browser.features.requestAnimationFrame) {
                       this.timer = H.browser.requestAnimationFrame.call(window, this.loopBind)
                   } else {
                       this.timer = this.loopBind.interval(Math.round(1000 / this.options.fps))
                   }
               }
               return this
           },
           stopAnimation: function () {
               if (this.timer) {
                   if (!this.options.forceAnimation && H.browser.features.requestAnimationFrame && H.browser.cancelAnimationFrame) {
                       H.browser.cancelAnimationFrame.call(window, this.timer)
                   } else {
                       clearInterval(this.timer)
                   }
                   this.timer = false
               }
           },
           stop: function (I) {
               I = H.defined(I) ? I : false;
               this.stopAnimation();
               if (I) {
                   this.render(1);
                   this.options.onComplete.jDelay(10)
               }
               return this
           },
           calc: function (K, J, I) {
               K = parseFloat(K);
               J = parseFloat(J);
               return (J - K) * I + K
           },
           loop: function () {
               var J = H.now(),
                   I = (J - this.startTime) / this.options.duration,
                   K = Math.floor(I);
               if (J >= this.finishTime && K >= this.options.cycles) {
                   this.stopAnimation();
                   this.render(1);
                   this.options.onComplete.jDelay(10);
                   return this
               }
               if (this.alternate && this.cycle < K) {
                   for (var L in this.styles) {
                       this.styles[L].reverse()
                   }
               }
               this.cycle = K;
               if (!this.options.forceAnimation && H.browser.features.requestAnimationFrame) {
                   this.timer = H.browser.requestAnimationFrame.call(window, this.loopBind)
               }
               this.render((this.continuous ? K : 0) + this.easeFn(I % 1))
           },
           render: function (I) {
               var J = {},
                   L = I;
               for (var K in this.styles) {
                   if ("opacity" === K) {
                       J[K] = Math.round(this.calc(this.styles[K][0], this.styles[K][1], I) * 100) / 100
                   } else {
                       J[K] = this.calc(this.styles[K][0], this.styles[K][1], I);
                       this.pStyles[K] && (J[K] += "%")
                   }
               }
               this.options.onBeforeRender(J, this.el);
               this.set(J);
               this.options.onAfterRender(J, this.el)
           },
           set: function (I) {
               return this.el.jSetCss(I)
           },
           parseCubicBezier: function (I) {
               var J, K = null;
               if ("string" !== H.jTypeOf(I)) {
                   return null
               }
               switch (I) {
               case "linear":
                   K = G([0, 0, 1, 1]);
                   break;
               case "ease":
                   K = G([0.25, 0.1, 0.25, 1]);
                   break;
               case "ease-in":
                   K = G([0.42, 0, 1, 1]);
                   break;
               case "ease-out":
                   K = G([0, 0, 0.58, 1]);
                   break;
               case "ease-in-out":
                   K = G([0.42, 0, 0.58, 1]);
                   break;
               case "easeInSine":
                   K = G([0.47, 0, 0.745, 0.715]);
                   break;
               case "easeOutSine":
                   K = G([0.39, 0.575, 0.565, 1]);
                   break;
               case "easeInOutSine":
                   K = G([0.445, 0.05, 0.55, 0.95]);
                   break;
               case "easeInQuad":
                   K = G([0.55, 0.085, 0.68, 0.53]);
                   break;
               case "easeOutQuad":
                   K = G([0.25, 0.46, 0.45, 0.94]);
                   break;
               case "easeInOutQuad":
                   K = G([0.455, 0.03, 0.515, 0.955]);
                   break;
               case "easeInCubic":
                   K = G([0.55, 0.055, 0.675, 0.19]);
                   break;
               case "easeOutCubic":
                   K = G([0.215, 0.61, 0.355, 1]);
                   break;
               case "easeInOutCubic":
                   K = G([0.645, 0.045, 0.355, 1]);
                   break;
               case "easeInQuart":
                   K = G([0.895, 0.03, 0.685, 0.22]);
                   break;
               case "easeOutQuart":
                   K = G([0.165, 0.84, 0.44, 1]);
                   break;
               case "easeInOutQuart":
                   K = G([0.77, 0, 0.175, 1]);
                   break;
               case "easeInQuint":
                   K = G([0.755, 0.05, 0.855, 0.06]);
                   break;
               case "easeOutQuint":
                   K = G([0.23, 1, 0.32, 1]);
                   break;
               case "easeInOutQuint":
                   K = G([0.86, 0, 0.07, 1]);
                   break;
               case "easeInExpo":
                   K = G([0.95, 0.05, 0.795, 0.035]);
                   break;
               case "easeOutExpo":
                   K = G([0.19, 1, 0.22, 1]);
                   break;
               case "easeInOutExpo":
                   K = G([1, 0, 0, 1]);
                   break;
               case "easeInCirc":
                   K = G([0.6, 0.04, 0.98, 0.335]);
                   break;
               case "easeOutCirc":
                   K = G([0.075, 0.82, 0.165, 1]);
                   break;
               case "easeInOutCirc":
                   K = G([0.785, 0.135, 0.15, 0.86]);
                   break;
               case "easeInBack":
                   K = G([0.6, -0.28, 0.735, 0.045]);
                   break;
               case "easeOutBack":
                   K = G([0.175, 0.885, 0.32, 1.275]);
                   break;
               case "easeInOutBack":
                   K = G([0.68, -0.55, 0.265, 1.55]);
                   break;
               default:
                   I = I.replace(/\s/g, "");
                   if (I.match(/^cubic-bezier\((?:-?[0-9\.]{0,}[0-9]{1,},){3}(?:-?[0-9\.]{0,}[0-9]{1,})\)$/)) {
                       K = I.replace(/^cubic-bezier\s*\(|\)$/g, "").split(",");
                       for (J = K.length - 1; J >= 0; J--) {
                           K[J] = parseFloat(K[J])
                       }
                   }
               }
               return G(K)
           },
           cubicBezierAtTime: function (U) {
               var I = 0,
                   T = 0,
                   Q = 0,
                   V = 0,
                   S = 0,
                   O = 0,
                   P = this.options.duration;

               function N(W) {
                   return ((I * W + T) * W + Q) * W
               }

               function M(W) {
                   return ((V * W + S) * W + O) * W
               }

               function K(W) {
                   return (3 * I * W + 2 * T) * W + Q
               }

               function R(W) {
                   return 1 / (200 * W)
               }

               function J(W, X) {
                   return M(L(W, X))
               }

               function L(ad, ae) {
                   var ac, ab, aa, X, W, Z;

                   function Y(af) {
                       if (af >= 0) {
                           return af
                       } else {
                           return 0 - af
                       }
                   }
                   for (aa = ad, Z = 0; Z < 8; Z++) {
                       X = N(aa) - ad;
                       if (Y(X) < ae) {
                           return aa
                       }
                       W = K(aa);
                       if (Y(W) < 0.000001) {
                           break
                       }
                       aa = aa - X / W
                   }
                   ac = 0;
                   ab = 1;
                   aa = ad;
                   if (aa < ac) {
                       return ac
                   }
                   if (aa > ab) {
                       return ab
                   }
                   while (ac < ab) {
                       X = N(aa);
                       if (Y(X - ad) < ae) {
                           return aa
                       }
                       if (ad > X) {
                           ac = aa
                       } else {
                           ab = aa
                       }
                       aa = (ab - ac) * 0.5 + ac
                   }
                   return aa
               }
               Q = 3 * this.cubicBezier[0];
               T = 3 * (this.cubicBezier[2] - this.cubicBezier[0]) - Q;
               I = 1 - Q - T;
               O = 3 * this.cubicBezier[1];
               S = 3 * (this.cubicBezier[3] - this.cubicBezier[1]) - O;
               V = 1 - O - S;
               return J(U, R(P))
           }
       });
       H.FX.Transition = {
           linear: "linear",
           sineIn: "easeInSine",
           sineOut: "easeOutSine",
           expoIn: "easeInExpo",
           expoOut: "easeOutExpo",
           quadIn: "easeInQuad",
           quadOut: "easeOutQuad",
           cubicIn: "easeInCubic",
           cubicOut: "easeOutCubic",
           backIn: "easeInBack",
           backOut: "easeOutBack",
           elasticIn: function (J, I) {
               I = I || [];
               return Math.pow(2, 10 * --J) * Math.cos(20 * J * Math.PI * (I[0] || 1) / 3)
           },
           elasticOut: function (J, I) {
               return 1 - H.FX.Transition.elasticIn(1 - J, I)
           },
           bounceIn: function (K) {
               for (var J = 0, I = 1; 1; J += I, I /= 2) {
                   if (K >= (7 - 4 * J) / 11) {
                       return I * I - Math.pow((11 - 6 * J - 11 * K) / 4, 2)
                   }
               }
           },
           bounceOut: function (I) {
               return 1 - H.FX.Transition.bounceIn(1 - I)
           },
           none: function (I) {
               return 0
           }
       }
   })(u);
   (function (H) {
       if (!H) {
           throw "MagicJS not found"
       }
       if (H.PFX) {
           return
       }
       var G = H.$;
       H.PFX = new H.Class(H.FX, {
           init: function (I, J) {
               this.el_arr = I;
               this.options = H.extend(this.options, J);
               this.timer = false;
               this.$parent.init()
           },
           start: function (M) {
               var I = /\%$/,
                   L, K, J = M.length;
               this.styles_arr = M;
               this.pStyles_arr = new Array(J);
               for (K = 0; K < J; K++) {
                   this.pStyles_arr[K] = {};
                   for (L in M[K]) {
                       I.test(M[K][L][0]) && (this.pStyles_arr[K][L] = true);
                       if ("reverse" === this.options.direction || "alternate-reverse" === this.options.direction || "continuous-reverse" === this.options.direction) {
                           this.styles_arr[K][L].reverse()
                       }
                   }
               }
               this.$parent.start({});
               return this
           },
           render: function (I) {
               for (var J = 0; J < this.el_arr.length; J++) {
                   this.el = H.$(this.el_arr[J]);
                   this.styles = this.styles_arr[J];
                   this.pStyles = this.pStyles_arr[J];
                   this.$parent.render(I)
               }
           }
       })
   })(u);
   (function (H) {
       if (!H) {
           throw "MagicJS not found";
           return
       }
       if (H.Tooltip) {
           return
       }
       var G = H.$;
       H.Tooltip = function (J, K) {
           var I = this.tooltip = H.$new("div", null, {
               position: "absolute",
               "z-index": 999
           }).jAddClass("MagicToolboxTooltip");
           H.$(J).jAddEvent("mouseover", function () {
               I.jAppendTo(document.body)
           });
           H.$(J).jAddEvent("mouseout", function () {
               I.jRemove()
           });
           H.$(J).jAddEvent("mousemove", function (P) {
               var R = 20,
                   O = H.$(P).jGetPageXY(),
                   N = I.jGetSize(),
                   M = H.$(window).jGetSize(),
                   Q = H.$(window).jGetScroll();

               function L(U, S, T) {
                   return (T < (U - S) / 2) ? T : ((T > (U + S) / 2) ? (T - S) : (U - S) / 2)
               }
               I.jSetCss({
                   left: Q.x + L(M.width, N.width + 2 * R, O.x - Q.x) + R,
                   top: Q.y + L(M.height, N.height + 2 * R, O.y - Q.y) + R
               })
           });
           this.text(K)
       };
       H.Tooltip.prototype.text = function (I) {
           this.tooltip.firstChild && this.tooltip.removeChild(this.tooltip.firstChild);
           this.tooltip.append(document.createTextNode(I))
       }
   })(u);
   (function (H) {
       if (!H) {
           throw "MagicJS not found";
           return
       }
       if (H.MessageBox) {
           return
       }
       var G = H.$;
       H.Message = function (L, K, J, I) {
           this.hideTimer = null;
           this.messageBox = H.$new("span", null, {
               position: "absolute",
               "z-index": 999,
               visibility: "hidden",
               opacity: 0.8
           }).jAddClass(I || "").jAppendTo(J || document.body);
           this.setMessage(L);
           this.show(K)
       };
       H.Message.prototype.show = function (I) {
           this.messageBox.show();
           this.hideTimer = this.hide.jBind(this).jDelay(H.ifndef(I, 5000))
       };
       H.Message.prototype.hide = function (I) {
           clearTimeout(this.hideTimer);
           this.hideTimer = null;
           if (this.messageBox && !this.hideFX) {
               this.hideFX = new u.FX(this.messageBox, {
                   duration: H.ifndef(I, 500),
                   onComplete: function () {
                       this.messageBox.kill();
                       delete this.messageBox;
                       this.hideFX = null
                   }.jBind(this)
               }).start({
                   opacity: [this.messageBox.jGetCss("opacity"), 0]
               })
           }
       };
       H.Message.prototype.setMessage = function (I) {
           this.messageBox.firstChild && this.tooltip.removeChild(this.messageBox.firstChild);
           this.messageBox.append(document.createTextNode(I))
       }
   })(u);
   (function (H) {
       if (!H) {
           throw "MagicJS not found"
       }
       if (H.Options) {
           return
       }
       var K = H.$,
           G = null,
           O = {
               "boolean": 1,
               array: 2,
               number: 3,
               "function": 4,
               string: 100
           },
           I = {
               "boolean": function (R, Q, P) {
                   if ("boolean" != H.jTypeOf(Q)) {
                       if (P || "string" != H.jTypeOf(Q)) {
                           return false
                       } else {
                           if (!/^(true|false)$/.test(Q)) {
                               return false
                           } else {
                               Q = Q.jToBool()
                           }
                       }
                   }
                   if (R.hasOwnProperty("enum") && !K(R["enum"]).contains(Q)) {
                       return false
                   }
                   G = Q;
                   return true
               },
               string: function (R, Q, P) {
                   if ("string" !== H.jTypeOf(Q)) {
                       return false
                   } else {
                       if (R.hasOwnProperty("enum") && !K(R["enum"]).contains(Q)) {
                           return false
                       } else {
                           G = "" + Q;
                           return true
                       }
                   }
               },
               number: function (S, R, Q) {
                   var P = false,
                       U = /%$/,
                       T = (H.jTypeOf(R) == "string" && U.test(R));
                   if (Q && !"number" == typeof R) {
                       return false
                   }
                   R = parseFloat(R);
                   if (isNaN(R)) {
                       return false
                   }
                   if (isNaN(S.minimum)) {
                       S.minimum = Number.NEGATIVE_INFINITY
                   }
                   if (isNaN(S.maximum)) {
                       S.maximum = Number.POSITIVE_INFINITY
                   }
                   if (S.hasOwnProperty("enum") && !K(S["enum"]).contains(R)) {
                       return false
                   }
                   if (S.minimum > R || R > S.maximum) {
                       return false
                   }
                   G = T ? (R + "%") : R;
                   return true
               },
               array: function (S, Q, P) {
                   if ("string" === H.jTypeOf(Q)) {
                       try {
                           Q = window.JSON.parse(Q)
                       } catch (R) {
                           return false
                       }
                   }
                   if (H.jTypeOf(Q) === "array") {
                       G = Q;
                       return true
                   } else {
                       return false
                   }
               },
               "function": function (R, Q, P) {
                   if (H.jTypeOf(Q) === "function") {
                       G = Q;
                       return true
                   } else {
                       return false
                   }
               }
           },
           J = function (U, T, Q) {
               var S;
               S = U.hasOwnProperty("oneOf") ? U.oneOf : [U];
               if ("array" != H.jTypeOf(S)) {
                   return false
               }
               for (var R = 0, P = S.length - 1; R <= P; R++) {
                   if (I[S[R].type](S[R], T, Q)) {
                       return true
                   }
               }
               return false
           },
           M = function (U) {
               var S, R, T, P, Q;
               if (U.hasOwnProperty("oneOf")) {
                   P = U.oneOf.length;
                   for (S = 0; S < P; S++) {
                       for (R = S + 1; R < P; R++) {
                           if (O[U.oneOf[S]["type"]] > O[U.oneOf[R].type]) {
                               Q = U.oneOf[S];
                               U.oneOf[S] = U.oneOf[R];
                               U.oneOf[R] = Q
                           }
                       }
                   }
               }
               return U
           },
           N = function (S) {
               var R;
               R = S.hasOwnProperty("oneOf") ? S.oneOf : [S];
               if ("array" != H.jTypeOf(R)) {
                   return false
               }
               for (var Q = R.length - 1; Q >= 0; Q--) {
                   if (!R[Q].type || !O.hasOwnProperty(R[Q].type)) {
                       return false
                   }
                   if (H.defined(R[Q]["enum"])) {
                       if ("array" !== H.jTypeOf(R[Q]["enum"])) {
                           return false
                       }
                       for (var P = R[Q]["enum"].length - 1; P >= 0; P--) {
                           if (!I[R[Q].type]({
                                   type: R[Q].type
                               }, R[Q]["enum"][P], true)) {
                               return false
                           }
                       }
                   }
               }
               if (S.hasOwnProperty("default") && !J(S, S["default"], true)) {
                   return false
               }
               return true
           },
           L = function (P) {
               this.schema = {};
               this.options = {};
               this.parseSchema(P)
           };
       H.extend(L.prototype, {
           parseSchema: function (R) {
               var Q, P, S;
               for (Q in R) {
                   if (!R.hasOwnProperty(Q)) {
                       continue
                   }
                   P = (Q + "").jTrim().jCamelize();
                   if (!this.schema.hasOwnProperty(P)) {
                       this.schema[P] = M(R[Q]);
                       if (!N(this.schema[P])) {
                           throw "Incorrect definition of the '" + Q + "' parameter in " + R
                       }
                       this.options[P] = undefined
                   }
               }
           },
           set: function (Q, P) {
               Q = (Q + "").jTrim().jCamelize();
               if (H.jTypeOf(P) == "string") {
                   P = P.jTrim()
               }
               if (this.schema.hasOwnProperty(Q)) {
                   G = P;
                   if (J(this.schema[Q], P)) {
                       this.options[Q] = G
                   }
                   G = null
               }
           },
           get: function (P) {
               P = (P + "").jTrim().jCamelize();
               if (this.schema.hasOwnProperty(P)) {
                   return H.defined(this.options[P]) ? this.options[P] : this.schema[P]["default"]
               }
           },
           fromJSON: function (Q) {
               for (var P in Q) {
                   this.set(P, Q[P])
               }
           },
           getJSON: function () {
               var Q = H.extend({}, this.options);
               for (var P in Q) {
                   if (undefined === Q[P] && undefined !== this.schema[P]["default"]) {
                       Q[P] = this.schema[P]["default"]
                   }
               }
               return Q
           },
           fromString: function (P) {
               K(P.split(";")).jEach(K(function (Q) {
                   Q = Q.split(":");
                   this.set(Q.shift().jTrim(), Q.join(":"))
               }).jBind(this))
           },
           exists: function (P) {
               P = (P + "").jTrim().jCamelize();
               return this.schema.hasOwnProperty(P)
           },
           isset: function (P) {
               P = (P + "").jTrim().jCamelize();
               return this.exists(P) && H.defined(this.options[P])
           },
           jRemove: function (P) {
               P = (P + "").jTrim().jCamelize();
               if (this.exists(P)) {
                   delete this.options[P];
                   delete this.schema[P]
               }
           }
       });
       H.Options = L
   })(u);
   v.$AA = function (G) {
       var I = [],
           H;
       for (H in G) {
           if (!G.hasOwnProperty(H) || (H + "").substring(0, 2) == "$J") {
               continue
           }
           I.push(G[H])
       }
       return v.$A(I)
   };
   v.nativeEvents = {
       click: 2,
       dblclick: 2,
       mouseup: 2,
       mousedown: 2,
       contextmenu: 2,
       mousewheel: 2,
       DOMMouseScroll: 2,
       mouseover: 2,
       mouseout: 2,
       mousemove: 2,
       selectstart: 2,
       selectend: 2,
       keydown: 2,
       keypress: 2,
       keyup: 2,
       focus: 2,
       blur: 2,
       change: 2,
       reset: 2,
       select: 2,
       submit: 2,
       load: 1,
       unload: 1,
       beforeunload: 2,
       resize: 1,
       move: 1,
       DOMContentLoaded: 1,
       readystatechange: 1,
       error: 1,
       abort: 1
   };
   v.customEventsAllowed = {
       document: true,
       element: true,
       "class": true,
       object: true
   };
   v.customEvents = {
       bindEvent: function (K, J, H) {
           if (v.jTypeOf(K) == "array") {
               k(K).jEach(this.bindEvent.jBindAsEvent(this, J, H));
               return this
           }
           if (!K || !J || v.jTypeOf(K) != "string" || v.jTypeOf(J) != "function") {
               return this
           }
           if (K == "domready" && v.browser.ready) {
               J.call(this);
               return this
           }
           H = parseInt(H || 10);
           if (!J.$J_EUID) {
               J.$J_EUID = Math.floor(Math.random() * v.now())
           }
           var I = this.jFetch("_events", {});
           I[K] || (I[K] = {});
           I[K][H] || (I[K][H] = {});
           I[K]["orders"] || (I[K]["orders"] = {});
           if (I[K][H][J.$J_EUID]) {
               return this
           }
           if (I[K]["orders"][J.$J_EUID]) {
               this.unbindEvent(K, J)
           }
           var G = this,
               L = function (M) {
                   return J.call(G, k(M))
               };
           if (v.nativeEvents[K] && !I[K]["function"]) {
               if (v.nativeEvents[K] == 2) {
                   L = function (M) {
                       M = v.extend(M || window.e, {
                           $J_TYPE: "event"
                       });
                       return J.call(G, k(M))
                   }
               }
               I[K]["function"] = function (M) {
                   G.jCallEvent(K, M)
               };
               this[v._event_add_](v._event_prefix_ + K, I[K]["function"], false)
           }
           I[K][H][J.$J_EUID] = L;
           I[K]["orders"][J.$J_EUID] = H;
           return this
       },
       jCallEvent: function (H, J) {
           try {
               J = v.extend(J || {}, {
                   type: H
               })
           } catch (I) {}
           if (!H || v.jTypeOf(H) != "string") {
               return this
           }
           var G = this.jFetch("_events", {});
           G[H] || (G[H] = {});
           G[H]["orders"] || (G[H]["orders"] = {});
           v.$AA(G[H]).jEach(function (K) {
               if (K != G[H]["orders"] && K != G[H]["function"]) {
                   v.$AA(K).jEach(function (L) {
                       L(this)
                   }, this)
               }
           }, J);
           return this
       },
       unbindEvent: function (J, I) {
           if (!J || !I || v.jTypeOf(J) != "string" || v.jTypeOf(I) != "function") {
               return this
           }
           if (!I.$J_EUID) {
               I.$J_EUID = Math.floor(Math.random() * v.now())
           }
           var H = this.jFetch("_events", {});
           H[J] || (H[J] = {});
           H[J]["orders"] || (H[J]["orders"] = {});
           order = H[J]["orders"][I.$J_EUID];
           H[J][order] || (H[J][order] = {});
           if (order >= 0 && H[J][order][I.$J_EUID]) {
               delete H[J][order][I.$J_EUID];
               delete H[J]["orders"][I.$J_EUID];
               if (v.$AA(H[J][order]).length == 0) {
                   delete H[J][order];
                   if (v.nativeEvents[J] && v.$AA(H[J]).length == 0) {
                       var G = this;
                       this[v._event_del_](v._event_prefix_ + J, H[J]["function"], false)
                   }
               }
           }
           return this
       },
       destroyEvent: function (I) {
           if (!I || v.jTypeOf(I) != "string") {
               return this
           }
           var H = this.jFetch("_events", {});
           if (v.nativeEvents[I]) {
               var G = this;
               this[v._event_del_](v._event_prefix_ + I, H[I]["function"], false)
           }
           H[I] = {};
           return this
       },
       cloneEvents: function (I, H) {
           var G = this.jFetch("_events", {});
           for (t in G) {
               if (H && t != H) {
                   continue
               }
               for (order in G[t]) {
                   if (order == "orders" || order == "function") {
                       continue
                   }
                   for (f in G[t][order]) {
                       k(I).bindEvent(t, G[t][order][f], order)
                   }
               }
           }
           return this
       },
       jCopyEvents: function (J, I) {
           if (1 !== J.nodeType) {
               return this
           }
           var H = this.jFetch("events");
           if (!H) {
               return this
           }
           for (var G in H) {
               if (I && G != I) {
                   continue
               }
               for (var K in H[G]) {
                   k(J).bindEvent(G, H[G][K])
               }
           }
           return this
       },
       jFetch: v.Element.jFetch,
       jStore: v.Element.jStore
   };
   (function (G) {
       if (!G) {
           throw "MagicJS not found";
           return
       }
       G.extend = function (O, N) {
           if (!(O instanceof window.Array)) {
               O = [O]
           }
           if (!(N instanceof window.Array)) {
               N = [N]
           }
           for (var L = 0, I = O.length; L < I; L++) {
               if (!G.defined(O[L])) {
                   continue
               }
               for (var K = 0, M = N.length; K < M; K++) {
                   if (!G.defined(N[K])) {
                       continue
                   }
                   for (var J in (N[K] || {})) {
                       try {
                           O[L][J] = N[K][J]
                       } catch (H) {}
                   }
               }
           }
           return O[0]
       };
       G.inherit = function (J, I) {
           function H() {}
           H.prototype = I.prototype;
           J.$parent = I.prototype;
           J.prototype = new H();
           J.prototype.constructor = J
       };
       G.extend([G.Element, window.magicJS.Element], {
           jGetSize_: G.Element.jGetSize,
           jGetSize: function (H, J) {
               var I, K = {
                   width: 0,
                   height: 0
               };
               if (J) {
                   K = this.jGetSize_()
               } else {
                   I = this.getBoundingClientRect();
                   K.width = I.width;
                   K.height = I.height
               }
               if (H) {
                   K.width += (parseInt(this.jGetCss("margin-left") || 0) + parseInt(this.jGetCss("margin-right") || 0));
                   K.height += (parseInt(this.jGetCss("margin-top") || 0) + ((this.jGetCss("display") != "block") ? parseInt(this.jGetCss("margin-bottom") || 0) : 0))
               }
               return K
           }
       })
   })(u);
   v.Modules || (v.Modules = {});
   v.Modules.ArrowsPair = (function () {
       var G = ["next", "prev"],
           J;

       function K(M, L) {
           return v.$new("button", {
               type: "button"
           }, {
               display: "inline-block"
           }).jAddClass(J["class"]).jAddClass(J.orientation).jAddClass(J["class"] + "-arrow").jAddClass(J["class"] + "-arrow-" + M).jAppendTo(L)
       }

       function H(L, M) {
           M.stopDistribution();
           this.jCallEvent(L)
       }
       var I = function (M, L) {
           v.$uuid(this);
           this.options = {
               "class": "",
               classHidden: "",
               classDisabled: "",
               position: "inside",
               orientation: "ms-horizontal",
               form: "button"
           };
           J = this.o = this.options;
           v.extend(this.o, M);
           this.prev = K("prev", L);
           this.next = K("next", L);
           this.next.jAddEvent("click", function (N) {
               N.stop()
           }).jAddEvent("btnclick tap", H.jBind(this, "forward"));
           this.prev.jAddEvent("click", function (N) {
               N.stop()
           }).jAddEvent("btnclick tap", H.jBind(this, "backward"))
       };
       I.prototype = {
           disable: function (L) {
               j(L && [L] || G).jEach(function (M) {
                   this[M].jAddClass(J.classDisabled)
               }, this)
           },
           enable: function (L) {
               j(L && [L] || G).jEach(function (M) {
                   this[M].jRemoveClass(J.classDisabled)
               }, this)
           },
           hide: function (L) {
               j(L && [L] || G).jEach(function (M) {
                   this[M].jAddClass(J.classHidden)
               }, this)
           },
           show: function (L) {
               j(L && [L] || G).jEach(function (M) {
                   this[M].jRemoveClass(J.classHidden)
               }, this)
           },
           jRemove: function (L) {
               j(L && [L] || G).jEach(function (M) {
                   this[M].kill()
               }, this)
           },
           setOrientation: function (L) {
               j(G).jEach(function (M) {
                   this[M].jRemoveClass("mcs-" + J.orientation);
                   this[M].jAddClass("mcs-" + L)
               }, this);
               this.o.orientation = "mcs-" + L
           }
       };
       v.extend(I.prototype, v.customEvents);
       return I
   })();
   v.Modules || (v.Modules = {});
   v.Modules.Bullets = (function () {
       var H = "active",
           G = function (K, J, I) {
               v.$uuid(this);
               this._options = {};
               this.o = this._options;
               v.extend(this.o, K);
               this.bullets = v.$([]);
               this.callback = I;
               this.activeBullet = {};
               this.ban = false;
               this.container = v.$new("div", {
                   "class": "mcs-bullets"
               });
               this.container.jAppendTo(J)
           };
       G.prototype = {
           push: function (I) {
               var J = j(function (L) {
                   var K = this.bullets.length;
                   this.bullets.push({
                       index: K,
                       enable: false,
                       jump: L,
                       node: v.$new("div", {
                           "class": "mcs-bullet mcs-bullet-" + K
                       })
                   });
                   if (!K) {
                       this.activeBullet = this.bullets[K];
                       this.activate(this.bullets[K]);
                       this.bullets[K].enable = true
                   }
                   this.bullets[K].node.jAddEvent("click", j(function (M) {
                       M.stop();
                       if (this.bullets[K].index == this.activeBullet.index) {
                           return
                       }
                       this.ban = this.callback();
                       !this.ban && this.jCallEvent("bullets-click", {
                           direction: this.getDirection(this.bullets[K]),
                           jumpIndex: this.bullets[K].jump
                       })
                   }).jBind(this));
                   this.bullets[K].node.jAppendTo(this.container)
               }).jBind(this);
               this.reset();
               I.jEach(j(function (K) {
                   J(K)
               }).jBind(this))
           },
           setActiveBullet: function (I, J) {
               this.activate(this.getBulletIndex(I, J))
           },
           show: function () {
               this.container.jAddClass("show")
           },
           update: function () {
               if (this.activeBullet.node) {
                   this.deactivate();
                   this.activate(this.bullets[0])
               }
           },
           jRemove: function () {
               this.bullets.jEach(function (I) {
                   I.node.kill()
               });
               this.container.kill()
           },
           deactivate: function () {
               this.activeBullet.enable = false;
               this.activeBullet.node.jRemoveClass(H)
           },
           activate: function (I) {
               this.deactivate();
               this.activeBullet = I;
               I.enable = true;
               I.node.jAddClass(H)
           },
           getDirection: function (I) {
               var J = this.activeBullet.index > I.index ? "backward" : "forward";
               this.activate(I);
               return J
           },
           getBulletIndex: function (I, L) {
               var M, K = this.bullets.length - 1,
                   J = this.activeBullet;
               for (var M = K; M >= 0; M--) {
                   if (this.bullets[M].jump <= I[0]) {
                       J = this.bullets[M];
                       break
                   }
               }
               if (L) {
                   if (this.o.items - 1 == I[I.length - 1]) {
                       J = this.bullets[K]
                   }
               }
               return J
           },
           reset: function () {
               this.ban = false;
               this.activeBullet = {};
               this.bullets.jEach(function (I) {
                   I.node.kill()
               });
               this.bullets.length = 0
           }
       };
       v.extend(G.prototype, v.customEvents);
       return G
   })();
   v.Modules || (v.Modules = {});
   v.Modules.Progress = (function () {
       var H = 300,
           G = function (I, J) {
               this.flag = "none";
               this.node = v.$new("div", {
                   "class": "mcs-loader"
               });
               if (v.browser.ieMode && v.browser.ieMode < 10) {
                   this.node.append(v.$new("div", {
                       "class": "mcs-loader-text"
                   }).append(v.doc.createTextNode("Loading...")))
               } else {
                   if (J) {
                       this.node.append(v.$new("div", {
                           "class": "mcs-loader-circles"
                       }).append(v.$new("div", {
                           "class": "mcs-item-loader"
                       }, {
                           "z-index": 100000
                       })))
                   } else {
                       this.node.append(v.$new("div", {
                           "class": "mcs-loader-circles"
                       }).append(v.$new("div", {
                           "class": "mcs-loader-circle mcs-loader-circle_01"
                       })).append(v.$new("div", {
                           "class": "mcs-loader-circle mcs-loader-circle_02"
                       })).append(v.$new("div", {
                           "class": "mcs-loader-circle mcs-loader-circle_03"
                       })).append(v.$new("div", {
                           "class": "mcs-loader-circle mcs-loader-circle_04"
                       })).append(v.$new("div", {
                           "class": "mcs-loader-circle mcs-loader-circle_05"
                       })).append(v.$new("div", {
                           "class": "mcs-loader-circle mcs-loader-circle_06"
                       })).append(v.$new("div", {
                           "class": "mcs-loader-circle mcs-loader-circle_07"
                       })).append(v.$new("div", {
                           "class": "mcs-loader-circle mcs-loader-circle_08"
                       })))
                   }
               }
               this.node.jAppendTo(I);
               this.node.hide()
           };
       G.prototype = {
           show: function () {
               if (this.flag === "show") {
                   return
               }
               if (this.node) {
                   this.flag = "show";
                   this.node.jSetOpacity(1);
                   this.node.show()
               }
           },
           hide: function (I) {
               if (this.flag === "hide") {
                   return
               }
               if (this.node) {
                   this.flag = "hide";
                   this.node.jSetOpacity(0);
                   this.node.hide()
               }
           },
           jRemove: function () {
               this.node && this.node.kill()
           }
       };
       return G
   })();
   v.Modules || (v.Modules = {});
   v.Modules.ShowItems = (function () {
       var G = function () {
           var N = [],
               I = 300,
               K = 0,
               L = 0,
               O = false,
               M = this;
           v.$uuid(this);

           function J() {
               var R;
               if (N.length == 0) {
                   M.jCallEvent("complete");
                   return
               }
               if (!O && N.length > 0) {
                   O = true;
                   R = N.shift();
                   var Q = j([]);
                   Q.push(R.item);
                   if (R.item.clone && R.item.clone.length > 0) {
                       j(R.item.clone).jEach(j(function (S) {
                           Q.push(S)
                       }).jBind(this))
                   }
                   Q.jEach(function (T, S) {
                       L += 1;
                       if (R.visible) {
                           if (S) {
                               R.visible = false
                           }
                       }
                       P(T, !!S, R.visible, R.callback, function () {
                           O = false;
                           J()
                       }, R.showReflection)
                   })
               }
           }

           function H(R, T, Q, S) {
               if (R.progress) {
                   R.progress.hide(true)
               }
               K++;
               if (K == L) {
                   L = K = 0;
                   Q();
                   S()
               }
           }

           function P(W, V, S, T, R, Q) {
               var X, Y, U = j(W.content);
               if (W.load == "loaded") {
                   H(W, V, T, R);
                   return
               }
               if (S) {
                   if (v.browser.ieMode && v.browser.ieMode < 10) {
                       Y = j(U).jGetSize();
                       X = {
                           opacity: [0, 1],
                           top: [Y.height / 2, 0],
                           left: [Y.width / 2, 0],
                           width: [0, Y.width],
                           height: [0, Y.height]
                       };
                       this.itemFX = new v.FX(U, {
                           duration: I,
                           onComplete: j(function (aa, Z) {
                               U.jSetCss({
                                   overflow: "",
                                   position: "",
                                   top: "",
                                   left: "",
                                   width: "",
                                   height: ""
                               });
                               V && (W.load = "loaded");
                               H(W, V, aa, Z)
                           }).jBind(this, T, R),
                           onStart: j(function () {
                               U.jSetCss({
                                   position: "relative",
                                   overflow: "hidden"
                               })
                           }).jBind(this)
                       });
                       this.itemFX.start(X)
                   } else {
                       U.jSetCssProp(g, "scale(0.2, 0.2)");
                       U.jSetCssProp("transition", "none");
                       U.jSetOpacity(0);
                       U.offsetHeight;
                       U.parentNode.offsetHeight;
                       U.jAddEvent("transitionend", j(function (Z) {
                           if (Z.target == U) {
                               this.jRemoveEvent(Z.type);
                               this.jSetCssProp(g, "");
                               this.jSetCssProp("transition", "")
                           }
                       }).jBind(U));
                       if (!V && Q) {
                           Q(W)
                       }
                       U.jSetCssProp("transition", g + " " + I + "ms cubic-bezier(.5,.5,.69,1.9), opacity " + I + "ms linear");
                       U.offsetHeight;
                       U.parentNode.offsetHeight;
                       U.jSetCssProp(g, "scale(1.0, 1.0)");
                       U.jSetOpacity(1);
                       V && (W.load = "loaded");
                       H(W, V, T, R)
                   }
               } else {
                   U.jSetOpacity(1);
                   if (V) {
                       W.load = "loaded"
                   } else {
                       Q(W)
                   }
                   H(W, V, T, R)
               }
           }
           this.push = function (S, R, Q, T) {
               N.push({
                   item: S,
                   visible: R,
                   callback: Q,
                   showReflection: T
               });
               J()
           }
       };
       v.extend(G.prototype, v.customEvents);
       return G
   })();
   (function (G) {
       G.QImageLoader = function (N, I) {
           var H = 0,
               M = this,
               L, J;

           function Q(R) {
               return function (S) {
                   (I[R] || G.$F).call(M, S, S.origItem);
                   H--;
                   P()
               }
           }

           function P() {
               var R;
               if (!N.length) {} else {
                   if (H < (I.queue || 3)) {
                       L = N.shift();
                       R = K(L.node);
                       if (R) {
                           J = new G.ImageLoader(R, {
                               onload: Q("onload"),
                               onerror: Q("onerror"),
                               onabort: Q("onabort"),
                               oncomplete: Q("oncomplete")
                           });
                           J.origItem = L
                       } else {
                           (I.onload || G.$F).call(M, {
                               size: j(L.node).jGetSize(),
                               img: R
                           }, L);
                           H--;
                           P()
                       }
                       H++
                   }
               }
           }

           function O(R) {
               var S, T;
               S = (R && R instanceof HTMLImageElement);
               if (S) {
                   T = R.getAttribute("data-src") || null;
                   if (T) {
                       R.setAttribute("src", T)
                   }
               }
               return (S && R.getAttribute("src")) ? R : null
           }

           function K(R) {
               return G.jTypeOf(L) == "string" ? R : (G.jTypeOf(R) == "object" ? O(R.img) : ((R.tagName == "A" || R.tagName.toLowerCase() == "figure") ? O(j(R).byTag("IMG")[0] || R.firstChild) : (R.tagName == "IMG" ? O(R) : null)))
           }
           this.push = function (R, S) {
               N[S ? "unshift" : "push"](R);
               I.delay || P();
               return this
           };
           this.abort = function () {
               J.destroy();
               count--
           };
           this.load = P;
           I.delay || N.length && P()
       }
   })(u);
   var m, j = v.$,
       E = j,
       k = j;
   var o;
   var p = function () {
       return "mgctlbxN$MSC mgctlbxV$" + "v2.0.53".replace("v", "") + " mgctlbxL$" + "t".toUpperCase() + ((window.mgctlbx$Pltm && "string" == v.jTypeOf(window.mgctlbx$Pltm)) ? " mgctlbxP$" + window.mgctlbx$Pltm.toLowerCase() : "")
   };

   function c() {
       v.addCSS(".msc-tmp-hdn-holder", {
           display: "block !important",
           "min-height": "0 !important",
           "min-width": "0 !important",
           "max-height": "none !important",
           "max-width": "none !important",
           width: "10px !important",
           height: "10px !important",
           position: "absolute !important",
           top: "-10000px !important",
           left: "0 !important",
           overflow: "hidden !important",
           "-webkit-transform": "none !important",
           transform: "none !important",
           "-webkit-transition": "none !important",
           transition: "none !important"
       }, "magicsroll-reset-css")
   }
   v.Scroll = {};
   m = {
       width: {
           oneOf: [{
               type: "number",
               minimum: 1
           }, {
               type: "string",
               "enum": ["auto"]
           }],
           "default": "auto"
       },
       height: {
           oneOf: [{
               type: "number",
               minimum: 1
           }, {
               type: "string",
               "enum": ["auto"]
           }],
           "default": "auto"
       },
       rwd: {
           type: "boolean",
           "default": false
       },
       items: {
           oneOf: [{
               type: "number",
               minimum: 1
           }, {
               type: "array"
           }, {
               type: "string",
               "enum": ["auto", "fit"]
           }],
           "default": "auto"
       },
       scrollOnWheel: {
           oneOf: [{
               type: "boolean"
           }, {
               type: "string",
               "enum": ["auto"]
           }],
           "default": "auto"
       },
       arrows: {
           oneOf: [{
               type: "boolean"
           }, {
               type: "string",
               "enum": ["inside", "outside", "off"]
           }],
           "default": "outside"
       },
       autoplay: {
           type: "number",
           "default": 0
       },
       speed: {
           type: "number",
           "default": 600
       },
       loop: {
           oneOf: [{
               type: "string",
               "enum": ["infinite", "rewind", "off"]
           }, {
               type: "boolean",
               "enum": [false]
           }],
           "default": "infinite"
       },
       lazyLoad: {
           type: "boolean",
           "default": false
       },
       orientation: {
           type: "string",
           "enum": ["horizontal", "vertical"],
           "default": "horizontal"
       },
       step: {
           oneOf: [{
               type: "number",
               minimum: 0
           }, {
               type: "string",
               "enum": ["auto"]
           }],
           "default": "auto"
       },
       draggable: {
           type: "boolean",
           "default": true
       },
       mode: {
           type: "string",
           "enum": ["scroll", "animation", "carousel", "cover-flow"],
           "default": "scroll"
       },
       pagination: {
           type: "boolean",
           "default": false
       },
       easing: {
           type: "string",
           "default": "cubic-bezier(.8, 0, .5, 1)"
       },
       keyboard: {
           type: "boolean",
           "default": false
       },
       autostart: {
           type: "boolean",
           "default": true
       },
       onItemHover: {
           type: "function",
           "default": v.$F
       },
       onItemOut: {
           type: "function",
           "default": v.$F
       },
       onReady: {
           type: "function",
           "default": v.$F
       },
       onStop: {
           type: "function",
           "default": v.$F
       },
       onMoveStart: {
           type: "function",
           "default": v.$F
       },
       onMoveEnd: {
           type: "function",
           "default": v.$F
       }
   };
   document.createElement("figure");
   document.createElement("figcaption");
   var n = function (G) {
           return {
               width: ((parseInt(G.jGetCss("margin-left")) || 0) + (parseInt(G.jGetCss("margin-right")) || 0)),
               height: ((parseInt(G.jGetCss("margin-top")) || 0) + (parseInt(G.jGetCss("margin-bottom")) || 0))
           }
       },
       i = function (G) {
           return {
               width: ((parseInt(G.jGetCss("padding-left")) || 0) + (parseInt(G.jGetCss("padding-right")) || 0)),
               height: ((parseInt(G.jGetCss("padding-top")) || 0) + (parseInt(G.jGetCss("padding-bottom")) || 0))
           }
       },
       r = function (G) {
           return {
               width: ((parseInt(G.jGetCss("border-left-width")) || 0) + (parseInt(G.jGetCss("border-right-width")) || 0)),
               height: ((parseInt(G.jGetCss("border-top-width")) || 0) + (parseInt(G.jGetCss("border-bottom-width")) || 0))
           }
       },
       F = function (G) {
           return {
               width: j(G).jGetCss("width"),
               height: j(G).jGetCss("height")
           }
       },
       w = v.browser.domPrefix,
       g = v.normalizeCSS("transform").dashize(),
       b = function (H, I) {
           var G = false,
               J = 0;
           v.$uuid(this);
           this._options = {
               stopDownload: true,
               timingFunction: "cubic-bezier(.8, 0, .5, 1)",
               effect: "scroll",
               continuous: false,
               progress: false,
               debug: false,
               orientation: "horizontal",
               duration: 500,
               loop: true,
               lazyLoad: true,
               step: "auto",
               draggable: true,
               keyboard: false
           };
           this.o = this._options;
           v.extend(this.o, I);
           this.container = j(H).jSetCssProp("white-space", "nowrap");
           this.loop = {
               firstItem: false,
               lastItem: false
           };
           this._setProperties();
           this.keyboardCallback = j(function (M) {
               var L = {},
                   K = true;
               if (37 === M.keyCode || 39 === M.keyCode) {
                   L.direction = M.keyCode == 39 ? "forward" : "backward";
                   if (!this.o.loop) {
                       if ("forward" === L.direction) {
                           if (this.loop.lastItem) {
                               K = false
                           }
                       } else {
                           if (this.loop.firstItem) {
                               K = false
                           }
                       }
                   }
                   K && this.jCallEvent("key_down", L)
               }
           }).jBind(this);
           this.name = "scroll";
           this.items = j([]);
           this.fullscreenChanged = false;
           this.itemsFirstClones = j([]);
           this.itemsLastClones = j([]);
           this.exitItems = j([]);
           this.enterItems = j([]);
           this.last = 0;
           this.globalIndex = 0;
           this.itemStep = this.o.step;
           this.containerPosition = 0;
           this.l = null;
           this.globalLength = null;
           this.distance = null;
           this.allSize = 0;
           this.correctPosition = 0;
           this.containerWidth = 0;
           this.direction = "forward";
           this.callback = v.$F;
           this.fullViewedItems = 0;
           this.stopScroll = false;
           this.moveTimer = null;
           this.wheelDiff = 0;
           this.tempArray = null;
           this.prevIndex = this.last;
           this.wheel_ = false;
           this.preloadAllFlag = false;
           this.disableReflection = false;
           this.loadAll = false;
           this.allNodes = null;
           this.doneFlag = {};
           this.wrapperPosition = 0;
           this.moveSettings = {
               direction: "forward",
               disableEffect: false
           };
           this.onDrag = null;
           this.queue = new v.QImageLoader([], {
               queue: 1,
               onerror: j(function (L, M) {
                   var K = this.items[M.index];
                   K.load = "error";
                   if (K.progress) {
                       K.progress.jRemove();
                       K.progress = null
                   }
                   K.node.jAddClass("mcs-noimg");
                   this.performedOnClones(j(function (O, N) {
                       if (O.index == K.index) {
                           O.append = true;
                           if (O.progress) {
                               O.progress.jRemove();
                               O.progress = null
                           }
                           O.node.load = "error";
                           O.node.jAddClass("mcs-noimg")
                       }
                   }).jBind(this));
                   J++;
                   if (this.o.lazyLoad) {
                       if (this.checkLoadingVisibleItems()) {
                           if (this.o.stopDownload || !this.doneFlag.two) {
                               this.jCallEvent("hideProgress");
                               this.jCallEvent("groupLoad")
                           }
                           if (!this.move_) {
                               this.changeClones()
                           }!this.doneFlag.two && this.jCallEvent("complete")
                       }
                   } else {
                       if (J == this.l && !this.o.lazyLoad) {
                           this.loadAll = true;
                           !this.doneFlag.two && this.jCallEvent("complete")
                       }
                   }
                   this.checkLoadedItems()
               }).jBind(this),
               onload: (function (O, P) {
                   var N = [];
                   var M = this.items[P.index];
                   var K;
                   var L = O.origItem;
                   if (L && L.originItem) {
                       M = this.items[L.originItem.index]
                   }
                   if (!M) {
                       return
                   }
                   M.node.append(M.content);
                   try {
                       this.setReflection(M)
                   } catch (O) {}
                   if (!this.disableReflection) {
                       try {
                           this.setCanvasPosition(M)
                       } catch (O) {
                           this.disableReflection = true
                       }
                   }
                   this.addCloneContent(M, j(function () {
                       var Q = true;
                       if (j(["scroll", "animation"]).contains(this.name)) {
                           if (!this.doneFlag.two && !this.o.lazyLoad) {
                               Q = P.index < this.fullViewedItems
                           }
                       }
                       this.showItem(M, Q, this.showReflection);
                       M.load = "loaded";
                       J++;
                       if (this.o.lazyLoad) {
                           this.onLazyLoad(J)
                       } else {
                           if (J == this.l) {
                               this.loadAll = true;
                               !this.doneFlag.two && this.jCallEvent("complete")
                           }
                       }
                       this.checkLoadedItems()
                   }).jBind(this))
               }).jBind(this)
           })
       };
   b.prototype = {
       constructor: b,
       showReflection: v.$F,
       setCanvasPosition: v.$F,
       setReflection: v.$F,
       onLazyLoad: function (G) {
           if (this.checkLoadingVisibleItems()) {
               if (this.o.stopDownload || !this.doneFlag.two) {
                   this.jCallEvent("hideProgress");
                   this.jCallEvent("groupLoad")
               }
               if (!this.doneFlag.two) {
                   this.jCallEvent("complete")
               }
           }
       },
       showItem: function (K, N, M) {
           var G;
           var J;
           var I;
           var L = 500;
           var H = K.content;
           if (N) {
               if (v.browser.ieMode && v.browser.ieMode < 10) {
                   G = j(H).jGetSize();
                   J = {
                       opacity: [0, 1],
                       top: [G.height / 2, 0],
                       left: [G.width / 2, 0],
                       width: [0, G.width],
                       height: [0, G.height]
                   };
                   I = new v.FX(H, {
                       duration: L,
                       onComplete: j(function (P, O) {
                           H.jSetCss({
                               overflow: "",
                               position: "",
                               top: "",
                               left: "",
                               width: "",
                               height: ""
                           });
                           if (K.progress) {
                               K.progress.jRemove();
                               K.progress = null
                           }
                       }).jBind(this),
                       onStart: j(function () {
                           H.jSetCss({
                               position: "relative",
                               overflow: "hidden"
                           })
                       }).jBind(this)
                   });
                   I.start(J)
               } else {
                   H.jSetCssProp("transition", "none");
                   H.jSetOpacity(0);
                   H.offsetHeight;
                   H.parentNode.offsetHeight;
                   H.jAddEvent("transitionend", j(function (O) {
                       if (O.target == H) {
                           this.jRemoveEvent(O.type);
                           this.jSetCssProp(g, "");
                           this.jSetCssProp("transition", "");
                           if (K.progress) {
                               K.progress.jRemove();
                               K.progress = null
                           }
                       }
                   }).jBind(H));
                   H.jSetCssProp("transition", g + " " + L + "ms cubic-bezier(.5,.5,.69,1.9), opacity " + L + "ms linear");
                   H.offsetHeight;
                   H.parentNode.offsetHeight;
                   H.jSetOpacity(1);
                   M && M(K)
               }
           } else {
               H.jSetOpacity(1);
               if (K.progress) {
                   K.progress.jRemove();
                   K.progress = null
               }
           }
           K.clone.length > 0 && j(K.clone).jEach(j(function (O) {
               if (O) {
                   j(O.content).jSetOpacity(1);
                   O.load = "loaded";
                   if (O.progress) {
                       O.progress.jRemove();
                       O.progress = null
                   }
               }
           }).jBind(this))
       },
       checkLoadedItems: function () {
           var G = 0;
           this.items.jEach(j(function (H) {
               if (H.load == "loaded" || H.load == "error") {
                   G++
               }
               if (this.l == G) {
                   this.loadAll = true;
                   this.jCallEvent("hideProgress")
               }
           }).jBind(this))
       },
       checkLoadingVisibleItems: function () {
           var G = 0;
           var H = 0;
           if (this.loadAll) {
               return true
           }
           for (; G < this.fullViewedItems; G++) {
               if (this.items[this._getItemIndex(this.last + G)].load == "loaded" || this.items[this._getItemIndex(this.last + G)].load == "error") {
                   H += 1
               }
           }
           return H == this.fullViewedItems
       },
       _sWidth: function () {
           return this.container.parentNode.jGetSize()[this.p_.size]
       },
       _setProperties: function () {
           var G = {
               horizontal: {
                   size: "width",
                   pos: "left",
                   otherSize: "height"
               },
               vertical: {
                   size: "height",
                   pos: "top",
                   otherSize: "width"
               }
           };
           this.p_ = G[this.o.orientation];
           if (this.o.step == 0) {
               this.o.step = "auto"
           }
           if (!this.o.loop || "rewind" === this.o.loop) {
               this.loop.firstItem = true
           }
           if (v.browser.ieMode && v.browser.ieMode < 10) {
               this.container.jSetCssProp(this.p_.pos, 0)
           } else {
               this.container.jSetCssProp(g, "translate3d(0, 0, 0)")
           }
       },
       _render: function () {
           this.container.offsetHeight
       },
       preloadAll: function () {
           if (this.loadAll || this.preloadAllFlag) {
               return
           }
           this.preloadAllFlag = true;
           this.jCallEvent("showProgress");
           this.items.jEach(j(function (G) {
               if (G.load == "notLoaded") {
                   if (G.progress) {
                       G.progress.jRemove();
                       G.progress = null
                   }
                   G.clone.length > 0 && j(G.clone).jEach(function (H) {
                       if (H.progress) {
                           H.progress.jRemove();
                           H.progress = null
                       }
                   });
                   this.queue.push({
                       node: G.content,
                       index: G.index
                   })
               }
           }).jBind(this));
           this.loadAll = true
       },
       preloadItem: function (H) {
           var K = this.last;
           var G = j([]);
           var J;
           var L;
           if (this.loadAll) {
               return
           }
           if (this.o.lazyLoad) {
               H && (K = (H == "forward") ? this._getItemIndex(K + this.fullViewedItems) : this._getItemIndex(K - this.fullViewedItems));
               L = j(function (M) {
                   if (M.load == "notLoaded") {
                       if (this.o.stopDownload) {
                           !H && this.jCallEvent("showProgress")
                       } else {
                           M.progress && M.progress.show()
                       }
                       M.load = "load";
                       this.queue.push({
                           node: M.content,
                           index: M.index
                       })
                   }
               }).jBind(this);
               for (var I = 0; I < this.fullViewedItems; I++) {
                   J = this.items[this._getItemIndex(K + I)];
                   L(J);
                   if (!H) {
                       L(this.items[this._getItemIndex(J.index + this.fullViewedItems)]);
                       L(this.items[this._getItemIndex(J.index - this.fullViewedItems)])
                   }
               }
           }
       },
       loadItem: function (H) {
           var G = this.items[H];
           if (G.load === "notLoaded") {
               this.jCallEvent("showProgress");
               G.load = "load";
               this.queue.push({
                   node: G.content,
                   index: G.index,
                   originItem: G
               });
               this.doneFlag.one = false
           }
       },
       freeTouchPreload: function (L) {
           var M;
           var H;
           var J;
           var I;
           var G = 0;
           var K = this.allNodes.length;
           if (L == "backward") {
               G = K - 1;
               K = -1
           }
           if (!this.loadAll) {
               while (G != K) {
                   I = this.allNodes[G];
                   M = I.jGetPosition();
                   H = I.getAttribute("data-item");
                   if (M[this.p_.pos] + this.items[0].size[this.p_.size] > this.wrapperPosition[this.p_.pos] && M[this.p_.pos] < this.wrapperPosition[this.p_.pos] + this.containerWidth) {
                       J = this.items[H];
                       if (J.load == "notLoaded") {
                           J.load = "load";
                           J.progress && J.progress.show();
                           j(J.clone).jEach(j(function (N) {
                               N.progress && N.progress.show()
                           }).jBind(this));
                           this.queue.push({
                               node: J.content,
                               index: J.index
                           })
                       }
                   }
                   L == "forward" ? G++ : G--
               }
           }
       },
       done: function (K) {
           var G;
           var J;
           var I;
           if (this.doneFlag.one) {
               return
           }
           this.doneFlag.one = true;
           G = this.l = this.items.length;
           this.containerWidth = this._sWidth();
           J = j(this.container.parentNode).jGetPosition();
           for (var H = 0; H < this.l; H++) {
               I = this.items[H];
               I.size = I.node.jGetSize(true);
               this.allSize += I.size[this.p_.size]
           }
           this.onResize()
       },
       done2: function (H) {
           this.doneFlag.two = true;
           this.setItemStep();
           if (!v.browser.ieMode || v.browser.ieMode && v.browser.ieMode > 9) {
               if (this.o.draggable) {
                   this._initDragOnScroll()
               }
           }
           this.itemEvent();
           if ((!v.browser.ieMode || v.browser.ieMode && v.browser.ieMode > 9) && "scroll" === this.o.effect && this.o.scrollOnWheel) {
               this._initOnWheel()
           }
           if (j(["scroll", "animation"]).contains(this.name)) {
               for (var G = 0; G < this.items.length; G++) {
                   if (G >= this.fullViewedItems) {
                       this.items[G].progress && this.items[G].progress.show()
                   }
               }
           }
           this.last = 0;
           this.globalIndex = this.itemsFirstClones.length;
           j(window).jAddEvent("resize", this.onResize.jBind(this));
           if (this.o.keyboard) {
               j(document).jAddEvent("keydown", this.keyboardCallback)
           }
           this.onResize();
           this.addFullscreenEvent();
           H && H()
       },
       addItem: function (H, G) {
           this.loadItem(G);
           this.done()
       },
       removeItem: function (G) {
           var I = this.items[G];
           this.removeEventByIndex(G);
           this.removeByIndex(G);
           for (var H = 0; H < I.clone.length; H++) {
               I.clone[H].node.jRemove()
           }
           I.node.jRemove();
           this.clearClones(j(function () {
               this._prepareClones();
               this.globalLength = this.container.childNodes.length;
               this.rightQueue()
           }).jBind(this));
           this.onResize()
       },
       removeByIndex: function (G) {
           var I = this.items.length;
           var H = j(function (O) {
               var M = j([]);
               var L = 0;
               var J = true;
               for (var K = 0; K < I; K++) {
                   if (K !== O) {
                       var N = this.items[K];
                       N.index = L;
                       N.node.setAttribute("data-item", L);
                       M.push(N);
                       L++
                   }
               }
               return M
           }).jBind(this);
           if (G === 0) {
               this.items = H(G)
           } else {
               if (G === I - 1) {
                   this.items.pop()
               } else {
                   if (G > 0 && G < I - 1) {
                       this.items = H(G)
                   }
               }
           }
           this.l = this.items.length;
           if (this.last >= this.l) {
               this.last = this.l - 1
           }
       },
       afterAddItem: function (G, I) {
           this.setItemStep();
           this.itemEventByIndex(G);
           if (j(["scroll", "animation"]).contains(this.name)) {
               for (var H = 0; H < this.items.length; H++) {
                   if (H >= this.fullViewedItems) {
                       this.items[H].progress && this.items[H].progress.show()
                   }
               }
           }
           this.last = 0;
           this.globalIndex = this.itemsFirstClones.length;
           this.clearClones(j(function () {
               this._prepareClones();
               this.rightQueue()
           }).jBind(this));
           this.onResize();
           I && I()
       },
       jGetSizeItems: function () {
           return this.items.length
       },
       getItems: function () {
           return this.items
       },
       addFullscreenEvent: function () {
           if (this.o.effect === "animation") {
               return
           }
           var G = this.container.querySelectorAll("iframe");
           v.$A(G).jEach(j(function (H) {
               j(H).jAddEvent(v.browser.fullScreen.prefix + v.browser.fullScreen.changeEventName, j(function (I) {
                   I.stop();
                   this.fullscreenChanged = false;
                   if (v.browser.fullScreen.enabled()) {
                       this.fullscreenChanged = true
                   }
               }).jBind(this))
           }).jBind(this))
       },
       itemEvent: function () {
           this.items.jEach(j(function (G) {
               G.content.showThis = j(function () {
                   this.jCallEvent("show-this", {
                       index: G.index
                   })
               }).jBind(this);
               G.content.jAddEvent("click", j(function (H) {
                   if (this.move_) {
                       H.stop()
                   }
               }).jBind(this))
           }).jBind(this))
       },
       itemEventByIndex: function (G) {
           var H = this.items[G];
           if (H) {
               H.content.showThis = j(function () {
                   this.jCallEvent("show-this", {
                       index: H.index
                   })
               }).jBind(this);
               H.content.jAddEvent("click", j(function (I) {
                   if (this.move_) {
                       I.stop()
                   }
               }).jBind(this))
           }
       },
       removeEventByIndex: function (G) {
           var H = this.items[G];
           if (H) {
               H.content.jRemoveEvent("click")
           }
       },
       setItemStep: function (I) {
           var H = 0;
           if (this.stopScroll) {
               return
           }
           if (this.o.continuous) {
               this.itemStep = this.fullViewedItems;
               return
           }
           for (var G = 0; G < this.l; G++) {
               H += this.items[G].size[this.p_.size];
               if (H >= this.containerWidth) {
                   if (this.itemStep == "auto" || this.itemStep >= G) {
                       if (this.o.effect == "animation" && H - this.items[G].size[this.p_.size] + 5 < this.containerWidth || H == this.containerWidth) {
                           G += 1
                       }
                       this.itemStep = G;
                       if (this.o.step != "auto" && this.o.step < this.itemStep) {
                           this.itemStep = this.o.step
                       }
                   }
                   break
               }
           }!this.itemStep && (this.itemStep = 1)
       },
       cloneFigure: function (H) {
           var G = H.cloneNode();
           figure = document.createElement("figure"), figcaption = document.createElement("figcaption");
           v.$A(H.firstChild.childNodes).jEach(j(function (I) {
               if (I.tagName.toLowerCase() == "figcaption") {
                   v.$A(I.childNodes).jEach(j(function (J) {
                       j(figcaption).append(J.cloneNode(true))
                   }).jBind(this));
                   v.$A(I.attributes).jEach(j(function (J) {
                       figure.setAttribute(J, J.nodeValue)
                   }).jBind(this));
                   figure.append(figcaption)
               } else {
                   j(figure).append(I.cloneNode(true))
               }
           }).jBind(this));
           v.$A(H.firstChild.attributes).jEach(j(function (I) {
               figure.setAttribute(I, I.nodeValue)
           }).jBind(this));
           G.append(figure);
           return G
       },
       performedOnClones: function (G) {
           if (this.itemsFirstClones.length > 0) {
               j([this.itemsFirstClones, this.itemsLastClones]).jEach(j(function (H) {
                   H.jEach(j(function (J, I) {
                       G(J, I)
                   }).jBind(this))
               }).jBind(this))
           }
       },
       addCloneContent: function (H, I) {
           if (this.itemsFirstClones.length > 0) {
               var G = j(function () {
                   var J;
                   if (v.browser.ieMode && v.browser.ieMode < 9 && H.node.firstChild.tagName.toLowerCase() == "figure") {
                       J = this.cloneFigure(H.content.cloneNode(true))
                   } else {
                       J = H.content.cloneNode(true)
                   }
                   this.stopDefaultsItemContent(j(J));
                   J.childNodes && v.$A(J.childNodes).jEach(j(function (K) {
                       if (j(K).jHasClass && j(K).jHasClass("MagicScroll-progress-bar")) {
                           K.kill()
                       }
                   }).jBind(this));
                   return J
               }).jBind(this);
               this.performedOnClones(j(function (K, J) {
                   if (K.index == H.index && !K.append) {
                       K.content = G();
                       this.items[H.index].clone.push(K);
                       K.append = true;
                       K.node.append(K.content)
                   }
               }).jBind(this))
           }
           I && I()
       },
       clearClones: function (J) {
           if (this.itemsFirstClones.length > 0) {
               for (var I = 0; I < this.itemsFirstClones.length; I++) {
                   this.itemsFirstClones[I].node.jRemove()
               }
               this.itemsFirstClones = j([])
           }
           if (this.itemsLastClones.length > 0) {
               for (var H = 0; H < this.itemsLastClones.length; H++) {
                   this.itemsLastClones[H].node.jRemove()
               }
               this.itemsLastClones = j([])
           }
           for (var G = 0; G < this.items.length; G++) {
               this.items[G].clone = j([])
           }
           J && J()
       },
       _prepareClones: function () {
           var G;
           var H = 0;
           var K = 0;
           var M = 0;
           var J = {
               left: 0,
               top: 0
           };
           var L;
           var I;
           if (this.stopScroll) {
               return
           }
           for (G = 0; G < this.l; G++) {
               H += this.items[G].size[this.p_.size];
               M++;
               if (this.containerWidth <= H) {
                   break
               }
           }
           if (this.l > 1 && (M > this.fullViewedItems || this.itemsFirstClones.length == 0)) {
               K = this.itemsFirstClones.length;
               for (G = K; G < M; G++) {
                   L = {
                       node: this.items[this.l - 1 - G].node.cloneNode(),
                       load: "notLoaded",
                       append: false
                   };
                   j(L.node).setAttribute("data-item", this.l - 1 - G);
                   L.index = this.items[this.l - 1 - G].index;
                   if (this.o.lazyLoad && this.o.progress) {
                       L.progress = new v.Modules.Progress(L.node);
                       L.progress.show()
                   }
                   this.itemsFirstClones.push(L);
                   I = {
                       node: this.items[G].node.cloneNode(),
                       load: "notLoaded",
                       append: false
                   };
                   j(I.node).setAttribute("data-item", G);
                   I.index = this.items[G].index;
                   if (this.o.lazyLoad && this.o.progress) {
                       I.progress = new v.Modules.Progress(I.node);
                       I.progress.show()
                   }
                   this.itemsLastClones.push(I);
                   j([I.node, L.node]).jEach(j(function (N) {
                       N.jAddEvent("click", j(function (O) {
                           if (this.move_) {
                               O.stop()
                           }
                       }).jBind(this))
                   }).jBind(this));
                   this.container.append(I.node);
                   this.container.append(L.node, "top");
                   j([this.items[this.l - 1 - G], this.items[G]]).jEach(j(function (N) {
                       if (N.load == "loaded") {
                           this.addCloneContent(N, j(function () {
                               var O = true;
                               if (j(["scroll", "animation"]).contains(this.name)) {
                                   if (!this.doneFlag.two && !this.o.lazyLoad) {
                                       O = N.index < this.fullViewedItems
                                   }
                               }
                               this.showItem(N, O);
                               N.clone.length > 0 && j(N.clone).jEach(function (P) {
                                   if (P.progress) {
                                       P.progress.jRemove();
                                       P.progress = null
                                   }
                               })
                           }).jBind(this))
                       }
                   }).jBind(this))
               }
               if (K) {
                   this.fullViewedItems += M - K
               } else {
                   this.fullViewedItems = M
               }
           } else {
               this.fullViewedItems = M
           }
           this.correctPosition = this.containerPosition = 0;
           H = 0;
           for (G = 0; G < this.itemsFirstClones.length; G++) {
               H += this.items[this.l - 1 - G].size[this.p_.size]
           }
           this.correctPosition += H;
           this.containerPosition -= H;
           J[this.p_.pos] = this.containerPosition;
           if (v.browser.ieMode && v.browser.ieMode < 10) {
               this.container.jSetCssProp(this.p_.pos, J[this.p_.pos])
           } else {
               this.correctContainerPosition()
           }
       },
       push: function (G) {
           this.l = this.items.length;
           G.index = this.l;
           G.load = "notLoaded";
           G.clone = [];
           this.itemProcessing(G);
           this.items.push(G)
       },
       pushByIndex: function (N, K) {
           var J = this.items.length;
           var L = K;
           N.load = "notLoaded";
           N.clone = [];
           if (L >= J) {
               N.index = J;
               this.items.push(N)
           } else {
               if (L <= 0) {
                   L = 0;
                   N.index = L;
                   this.items.unshift(N);
                   for (var M = 1; M < this.items.length; M++) {
                       this.items[M].index = M;
                       this.items[M].node.setAttribute("data-item", this.items[M].index)
                   }
               } else {
                   if (L > 0 && L < J) {
                       var I = 0;
                       var G = new Array(J + 1);
                       G = j(G);
                       for (var H = 0; H < G.length; H++) {
                           if (H === L) {
                               N.index = H;
                               G[H] = N
                           } else {
                               G[H] = this.items[I];
                               G[H].index = H;
                               G[H].node.setAttribute("data-item", G[H].index);
                               I++
                           }
                       }
                       this.items = G
                   }
               }
           }
           this.itemProcessing(N)
       },
       stopDefaultsItemContent: function (I) {
           var H = ["dragstart", "selectstart", "mousedown"];
           var G = I.querySelector("input");
           if (G && G.getAttribute("type") === "text") {
               H.pop()
           }
           I.jAddEvent(H, function (J) {
               J.preventDefault()
           })
       },
       itemProcessing: function (G) {
           this.stopDefaultsItemContent(G.content);
           if (this.o.progress && this.o.lazyLoad) {
               G.progress = new v.Modules.Progress(G.node, true);
               if (!this.o.stopDownload) {
                   G.progress.show()
               }
           }
           G.node.setAttribute("data-item", G.index);
           G.node.jAddEvent("mouseover mouseout", j(function (I) {
               var H = I.getRelated();
               while (H && H !== G.node) {
                   H = H.parentNode
               }
               if (H == G.node) {
                   return
               }
               if ("mouseover" === I.type) {
                   this.jCallEvent("on-item-hover", {
                       itemIndex: G.index
                   })
               } else {
                   this.jCallEvent("on-item-out", {
                       itemIndex: G.index
                   })
               }
           }).jBind(this))
       },
       _getItemIndex: function (G) {
           G %= this.l;
           G < 0 && (G = G + this.l);
           return G
       },
       jump: function (H, I) {
           var G;
           if (H == "forward" || H == "backward") {
               this.direction = H
           }
           if (this.move_ || this.wheel_) {
               return
           }
           this.move_ = true;
           if (v.jTypeOf(H) == "object") {
               this.direction = H.direction;
               H.disableEffect = false;
               H.defaultMove = false
           } else {
               if (/forward|backward|^\+|^\-/.test(H)) {
                   if (/^\+|^\-/.test(H)) {
                       G = /^\+/.test(H) ? "forward" : "backward";
                       H = {
                           goTo: Math.abs(parseInt(H)),
                           direction: G
                       };
                       H.goTo > this.l && (H.goTo = this.l);
                       H.target = this._getItemIndex(H.direction == "forward" ? (this.last + H.goTo) : (this.last - H.goTo))
                   } else {
                       H = {
                           direction: H
                       };
                       H.target = this._getItemIndex(H.direction == "forward" ? (this.last + this.itemStep) : (this.last - this.itemStep))
                   }
                   H.disableEffect = false;
                   H.defaultMove = true
               } else {
                   if (v.jTypeOf(parseInt(H)) == "number") {
                       H = {
                           target: this._getItemIndex(H),
                           disableEffect: true,
                           defaultMove: false
                       }
                   }
               }
           }
           H.callback = I;
           if (!this.o.loop) {
               if (this.loop.firstItem || this.loop.lastItem) {
                   if (this.loop.firstItem) {
                       if ("backward" === H.direction) {
                           this.move_ = false;
                           I(null, true);
                           return
                       }
                   } else {
                       if ("forward" === H.direction) {
                           this.move_ = false;
                           I(null, true);
                           return
                       }
                   }
               }
           }
           this["_" + this.name](H)
       },
       _shiftContainer: function (J, H) {
           var I = {
               left: 0,
               top: 0
           };
           var K = false;
           var G = H || this.containerPosition;
           if (J == "forward") {
               if (G + this.correctPosition - this.distance + this.allSize < 0) {
                   this.containerPosition = G + this.allSize;
                   I[this.p_.pos] = this.containerPosition;
                   K = true
               }
           } else {
               if (G + this.distance > 0) {
                   this.containerPosition = G - this.allSize;
                   I[this.p_.pos] = this.containerPosition;
                   K = true
               }
           }
           if (K) {
               if (v.browser.ieMode && v.browser.ieMode < 10) {
                   this.container.jSetCssProp(this.p_.pos, I[this.p_.pos] + "px")
               } else {
                   this.container.jSetCssProp(g, "translate3d(" + I.left + "px, " + I.top + "px, 0)");
                   this.container.jSetCssProp("transition", g + " 0ms " + this.o.timingFunction);
                   this._render();
                   if (this.o.effect == "animation") {
                       this.previous = this.globalIndex = this._getGlobalIndex();
                       if (J == "forward") {
                           this.globalIndex += this.itemStep
                       } else {
                           this.globalIndex -= this.itemStep
                       }
                   }
               }
           }
           return K
       },
       _calcDistance: function (J, I) {
           var G = true;
           if (!I) {
               if (this.o.step == "auto") {
                   this.itemStep = "auto";
                   this.setItemStep(J == "backward")
               }
               G = false;
               I = this.itemStep
           } else {
               this.o.stopDownload = false
           }
           for (var H = I; H > 0; H--) {
               this.last = this._getItemIndex((J == "forward") ? (this.last + 1) : (this.last - 1));
               this.globalIndex = (J == "forward") ? (this.globalIndex + 1) : (this.globalIndex - 1);
               this.distance += this.items[(J == "forward") ? this._getItemIndex(this.last - 1) : this.last].size[this.p_.size]
           }
           if ("infinite" === this.o.loop) {
               if (!this.o.continuous) {
                   this.jCallEvent("on-start-effect", {
                       arr: this.getVisibleIndexes()
                   })
               }
           } else {
               if ("scroll" === this.o.effect && this.loop.lastItem && J == "backward") {
                   if (G) {
                       this.last -= (this.itemsVisible - 1)
                   } else {
                       this.last -= (I - 1)
                   }
                   if (this.last < 0) {
                       this.last = 0
                   }
               }
               this.jCallEvent("enable");
               if (this.loop.lastItem && J == "forward") {
                   this.loop.lastItem = false;
                   this.loop.firstItem = true;
                   this.containerPosition = 0;
                   this.distance = 0;
                   this.last = 0;
                   this.globalIndex = 0;
                   this.jCallEvent("first-frame");
                   this.jCallEvent("on-start-effect", {
                       arr: this.getVisibleIndexes()
                   })
               } else {
                   if (this.loop.firstItem && J == "backward") {
                       this.loop.firstItem = false;
                       this.loop.lastItem = true;
                       this.distance = 0;
                       this.last = this.l - 1;
                       if (this.o.effect == "scroll") {
                           this.globalIndex = this.l - this.itemsVisible;
                           this.containerPosition = (this.allSize - this.containerWidth) * (-1)
                       } else {
                           this.globalIndex = this.l - this.l % this.itemsVisible;
                           this.containerPosition = (Math.ceil(this.l / this.itemStep) - 1) * this.containerWidth * (-1)
                       }
                       this.jCallEvent("last-frame");
                       this.jCallEvent("on-start-effect", {
                           arr: this.getVisibleIndexes(true)
                       })
                   } else {
                       this.loop.lastItem = false;
                       this.loop.firstItem = false;
                       if (J == "forward") {
                           if (this.containerPosition - this.distance <= this.containerWidth - this.allSize || this.containerPosition - this.distance + 1 <= this.containerWidth - this.allSize) {
                               this.jCallEvent("last-frame");
                               if (this.o.effect == "scroll" || this.o.effect == "animation" && "infinite" === this.o.loop) {
                                   this.distance = this.containerPosition - (this.containerWidth - this.allSize)
                               } else {
                                   this.distance = this.containerWidth
                               }
                               this.loop.lastItem = true;
                               this.last = this.l - 1;
                               this.jCallEvent("on-start-effect", {
                                   arr: this.getVisibleIndexes(true)
                               })
                           } else {
                               this.jCallEvent("on-start-effect", {
                                   arr: this.getVisibleIndexes()
                               })
                           }
                       } else {
                           if (Math.ceil(this.containerPosition + this.distance) >= 0 || this.containerPosition + this.distance === -1) {
                               this.jCallEvent("first-frame");
                               this.distance = Math.abs(this.containerPosition);
                               this.loop.firstItem = true;
                               this.globalIndex = 0;
                               this.last = 0;
                               this.jCallEvent("on-start-effect", {
                                   arr: this.getVisibleIndexes()
                               })
                           } else {
                               this.jCallEvent("on-start-effect", {
                                   arr: this.getVisibleIndexes()
                               })
                           }
                       }
                   }
               }
           }
       },
       jumpToNumber: function (K) {
           var I = 0;
           var J;
           if (!K.direction) {
               I = Math.floor(this.fullViewedItems / 2);
               if (this.fullViewedItems % 2 == 0) {
                   I -= 1
               }
               I < 0 && (I = 0)
           }
           if ("infinite" === this.o.loop) {
               K.target = this._getItemIndex(K.target - I)
           }
           if (this.last != K.target) {
               this.o.stopDownload = false;
               J = j(function (O) {
                   var M = this.last,
                       N = 0,
                       L;
                   do {
                       N++;
                       !O ? M++ : M--;
                       L = this._getItemIndex(M)
                   } while (L != K.target);
                   return N
               }).jBind(this);
               if (!K.direction) {
                   if ("infinite" === this.o.loop) {
                       K.direction = J() <= J(true) ? "forward" : "backward"
                   } else {
                       K.direction = K.target > this.last ? "forward" : "backward"
                   }
               }
               this.jCallEvent("enable");
               if ("infinite" === this.o.loop) {
                   while (this.last != K.target) {
                       this.last = this._getItemIndex(K.direction == "forward" ? ++this.last : --this.last);
                       this.globalIndex = K.direction == "forward" ? ++this.globalIndex : --this.globalIndex;
                       this.distance += this.items[this.last].size[this.p_.size]
                   }
                   this.jCallEvent("on-start-effect", {
                       arr: this.getVisibleIndexes()
                   })
               } else {
                   this.loop.lastItem = false;
                   this.loop.firstItem = false;
                   this.last = K.target;
                   var H = 0;
                   for (var G = 0; G < K.target - I; G++) {
                       H += this.items[G].size[this.p_.size]
                   }
                   this.globalIndex = K.target;
                   this.containerPosition = 0 - this.correctPosition - H;
                   if (this.o.effect == "scroll" && this.containerPosition <= 0 - (this.allSize - this.containerWidth) || this.containerPosition <= 0 - ((this.allSize + (this.l % this.itemStep) * this.items[0].size[this.p_.size]) - this.containerWidth)) {
                       if (this.o.effect == "scroll") {
                           this.containerPosition = 0 - (this.allSize - this.containerWidth)
                       }
                       this.loop.lastItem = true;
                       this.jCallEvent("last-frame");
                       this.last = this.l - 1;
                       this.jCallEvent("on-start-effect", {
                           arr: this.getVisibleIndexes(true)
                       })
                   } else {
                       this.jCallEvent("on-start-effect", {
                           arr: this.getVisibleIndexes()
                       })
                   }
                   if (this.containerPosition >= 0) {
                       this.containerPosition = 0;
                       this.jCallEvent("first-frame");
                       this.loop.firstItem = true;
                       this.last = 0;
                       this.jCallEvent("on-start-effect", {
                           arr: this.getVisibleIndexes()
                       })
                   }
               }
           } else {
               this.move_ = false;
               this.wheel_ = false;
               this.jCallEvent("disableHold")
           }
       },
       _scroll: function (J) {
           var G = this.containerPosition;
           var H = false;
           var I;
           this.previous = this.globalIndex;
           this.distance = 0;
           if ((!this.o.loop || "rewind" === this.o.loop) && this.o.effect == "animation") {
               if (this.loop.lastItem && J.direction == "forward" || this.loop.firstItem && J.direction == "backward") {
                   H = true
               }
           }
           if (J.defaultMove) {
               this._calcDistance(J.direction, J.goTo)
           } else {
               this.jumpToNumber(J);
               if (!this.o.loop) {
                   if (G === this.containerPosition) {
                       this.move_ = false;
                       this.wheel_ = false;
                       this.jCallEvent("disableHold")
                   }
               }
           }
           if (H) {
               J.direction = J.direction == "forward" ? "backward" : "forward"
           }
           if (0 !== this.wheelDiff) {
               I = this.items[this.prevIndex].size[this.p_.size] - this.wheelDiff;
               if (J.direction == "forward") {
                   this.distance -= I
               } else {
                   this.distance += I
               }
               this.wheelDiff = 0
           }
           "infinite" === this.o.loop && this._shiftContainer(J.direction);
           if (J.direction == "forward") {
               this.containerPosition -= this.distance
           } else {
               this.containerPosition += this.distance
           }
           if ((!this.o.loop || this.o.loop === "rewind") && this.o.effect === "scroll") {
               var K = 0;
               j(this.getVisibleIndexes(this.loop.lastItem)).jEach(function (L) {
                   K += this.items[L].size.width
               }.jBind(this));
               if (this.containerPosition > 0) {
                   this.containerPosition = 0
               } else {
                   if (Math.abs(G) + K >= this.allSize - this.containerWidth && J.direction === "forward") {
                       if (this.containerPosition !== 0 || !this.o.loop) {
                           this.containerPosition = (this.allSize - this.containerWidth) * (-1)
                       }
                   }
               }
           }
           this.moveSettings.direction = J.direction;
           this.moveSettings.disableEffect = J.disableEffect;
           if (G != this.containerPosition) {
               this.callback = J.callback;
               if (this.o.stopDownload && !this.loadAll && !this.checkLoadingVisibleItems()) {
                   this.jCallEvent("showProgress");
                   this.preloadItem();
                   this.bindEvent("groupLoad", j(function (L) {
                       this.move_ && this._move(null, L.direction, L.disableEffect)
                   }).jBind(this, this.moveSettings))
               } else {
                   if (!this.loadAll) {
                       this.preloadItem()
                   }
                   this._move(null, J.direction, J.disableEffect)
               }
           } else {
               this.move_ = false;
               this.wheel_ = false;
               this.jCallEvent("hold")
           }
       },
       _move: function (H, G, J) {
           var I = {
               left: 0,
               top: 0
           };
           this.move_ = true;
           if (v.browser.ieMode && v.browser.ieMode < 10) {
               I = {};
               I[this.p_.pos] = [parseInt(this.container.jGetCss(this.p_.pos)), this.containerPosition];
               this.fx = new v.FX(this.container, {
                   transition: this.o.timingFunction,
                   duration: H || this.o.duration,
                   onComplete: this._onComplete.jBind(this),
                   onStart: j(function () {
                       this.stop_ = false
                   }).jBind(this)
               }).start(I)
           } else {
               I[this.p_.pos] = this.containerPosition;
               if (this.o.effect == "animation" && !J) {
                   this._moveEffect(G, I)
               } else {
                   this.container.jRemoveEvent("transitionend");
                   this.container.jAddEvent("transitionend", j(function (K) {
                       if (K.target == this.container) {
                           this.container.jRemoveEvent(K.type);
                           if (J) {
                               this.globalIndex = this._getGlobalIndex();
                               this._cleansingStyles()
                           }
                           this._onComplete()
                       }
                   }).jBind(this));
                   this.container.jSetCssProp(g, "translate3d(" + I.left + "px, " + I.top + "px, 0)");
                   this.container.jSetCssProp("transition", g + " " + (H || this.o.duration) + "ms " + this.o.timingFunction)
               }
           }
       },
       _moveEffect: function (M, L) {
           var H;
           var J;
           var I = this.container.childNodes;
           var G = I.length;
           var N = j(function (O) {
               O %= this.globalLength;
               O < 0 && (O = O + this.globalLength);
               return O
           }).jBind(this);
           this.exitItems.length = 0;
           this.enterItems.length = 0;
           for (var K = 0; K < this.itemStep; K++) {
               if ("infinite" === this.o.loop) {
                   H = N(this.previous + K)
               } else {
                   H = this.previous + K < G ? this.previous + K : null
               }
               H != null && this.exitItems.push(I[H]);
               if ("infinite" === this.o.loop) {
                   J = N(this.globalIndex + K)
               } else {
                   J = this.globalIndex + K < G ? this.globalIndex + K : null
               }
               J != null && this.enterItems.push(I[J])
           }
           if (M == "backward") {
               this.exitItems.reverse();
               this.enterItems.reverse()
           }
           this.container.setAttribute("data-" + M, "");
           this.exitItems.jEach(j(function (P, O) {
               P.jAddEvent(w + "AnimationEnd animationend", j(function (Q, R, S) {
                   if (Q == this.exitItems[R]) {
                       Q.jRemoveEvent(w + "AnimationEnd animationend").setAttribute("data-exited", "");
                       if (R == this.exitItems.length - 1) {
                           this.exitItems.jEach(j(function (U, T) {
                               U.removeAttribute("data-animation-nth");
                               U.removeAttribute("data-action")
                           }).jBind(this));
                           this.enterItems.jEach(j(function (U, T) {
                               if (T == this.enterItems.length - 1) {
                                   U.jAddEvent(w + "AnimationEnd animationend", j(function (V) {
                                       if (V.target == U) {
                                           U.jRemoveEvent(w + "AnimationEnd animationend");
                                           this.enterItems.jEach(j(function (W, X) {
                                               W.removeAttribute("data-animation-nth");
                                               W.removeAttribute("data-action")
                                           }).jBind(this));
                                           this.exitItems.jEach(j(function (W, X) {
                                               W.removeAttribute("data-exited")
                                           }).jBind(this));
                                           this.container.removeAttribute("data-" + M);
                                           this._render();
                                           this._onComplete()
                                       }
                                   }).jBind(this))
                               }
                               U.setAttribute("data-entering", "");
                               U.jAddEvent(w + "AnimationStart animationstart", j(function (V) {
                                   if (V.target == this) {
                                       this.jRemoveEvent(w + "AnimationStart animationstart");
                                       U.removeAttribute("data-entering")
                                   }
                               }).jBind(U));
                               U.setAttribute("data-action", "enter");
                               U.setAttribute("data-animation-nth", (T + 1))
                           }).jBind(this));
                           this.container.jSetCssProp(g, "translate3d(" + L.left + "px, " + L.top + "px, 0)")
                       }
                   }
               }).jBind(this, P, O))
           }).jBind(this));
           this.exitItems.jEach(j(function (P, O) {
               P.setAttribute("data-exiting", "");
               P.jAddEvent(w + "AnimationStart animationstart", j(function (Q) {
                   if (Q.target == this) {
                       P.jRemoveEvent(w + "AnimationStart animationstart");
                       this.removeAttribute("data-exiting")
                   }
               }).jBind(P));
               P.setAttribute("data-action", "exit");
               P.setAttribute("data-animation-nth", (O + 1))
           }).jBind(this))
       },
       getVisibleIndexes: function (J) {
           var K = 0;
           var I = this.itemStep;
           var G = [];
           var H;
           if (J) {
               if (this.o.effect == "scroll") {
                   K = this.l - this.itemStep
               } else {
                   K = this.l % this.itemStep ? this.l - this.l % this.itemStep : this.l - this.itemStep
               }
               I = this.l
           }
           for (; K < I; K++) {
               if (!J) {
                   H = this.last + K
               } else {
                   H = K
               }
               G.push(this._getItemIndex(H))
           }
           return G
       },
       _onComplete: function () {
           this.move_ = false;
           this.continuousPause = false;
           this.callback && this.callback(this.getVisibleIndexes(this.loop.lastItem))
       },
       _cleansingStyles: function () {
           this.container.jSetCssProp("transition", g + " 0ms")
       },
       getMatrixPosition: function (L) {
           var K = {
               x: 0,
               y: 0
           };
           var I = L.jGetCss(g) || "";
           var J = /3d/.test(I) ? (/matrix3d\(([^\)]+)\)/) : (/matrix\(([^\)]+)\)/);
           var H = /3d/.test(I) ? 12 : 4;
           var G = /3d/.test(I) ? 13 : 5;
           (L.jGetCss(g) || "").replace(J, function (O, N) {
               var M = N.split(",");
               K.x += parseInt(M[H], 10);
               K.y += parseInt(M[G])
           });
           return K
       },
       _getGlobalIndex: function () {
           var I;
           var G;
           var H = Number.MAX_VALUE;
           var K = this.container.parentNode.jGetPosition()[this.p_.pos];
           for (var J = 0; J < this.globalLength; J++) {
               I = this.container.childNodes[J].jGetPosition()[this.p_.pos];
               if (H > Math.abs(K - I)) {
                   H = Math.abs(K - I);
                   G = J
               } else {
                   break
               }
           }
           return G
       },
       changeClones: function () {
           if (this.itemsFirstClones.length == 0) {
               return
           }
           var G;
           var I = j(function (K, L) {
               var M, J;
               if (this.items[L].node != K && this.items[L].load == "loaded") {
                   for (J = 0; J < this.globalLength; J++) {
                       if (this.items[L].node == this.container.childNodes[J]) {
                           M = J;
                           break
                       }
                   }
                   if (M < G) {
                       this.container.insertBefore(K, this.container.childNodes[M]);
                       if (G + 1 <= this.globalLength - 1) {
                           this.container.insertBefore(this.items[L].node, this.container.childNodes[G + 1])
                       } else {
                           this.container.appendChild(this.items[L].node)
                       }
                   } else {
                       this.container.insertBefore(this.items[L].node, K);
                       if (M + 1 <= this.globalLength - 1) {
                           this.container.insertBefore(K, this.container.childNodes[M + 1])
                       } else {
                           this.container.appendChild(K)
                       }
                   }
               }
           }).jBind(this);
           G = this._getGlobalIndex();
           for (var H = 0; H < this.fullViewedItems; H++) {
               I(this.container.childNodes[G], this._getItemIndex(this.last + H));
               G++
           }
       },
       correctItemPosition: function (O) {
           var K;
           var L;
           var R = 0;
           var H = 0;
           var Q;
           var N = this.container.parentNode.jGetPosition()[this.p_.pos] + 1;
           var J = this.container.jGetPosition()[this.p_.pos] - N;
           var P = Math.abs(Math.abs(J) - Math.abs(this.containerPosition));
           var I;
           var G = j(function (S) {
               return parseInt(this.container.childNodes[S].getAttribute("data-item"))
           }).jBind(this);
           (P > 0 && P < 1) && (P = 0);
           if (O == "forward") {
               N += P
           } else {
               N -= P
           }
           for (var M = 0; M < this.globalLength; M++) {
               L = this.container.childNodes[M].jGetPosition()[this.p_.pos];
               if (L == N) {
                   this.last = G(M);
                   return 0
               }
               Q = parseInt(this.container.childNodes[M].jGetSize()[this.p_.size]);
               if (L < N && L + Q > N) {
                   I = M;
                   if (O == "forward") {
                       I = M + 1 > this.globalLength - 1 ? this.globalLength - 1 : M + 1;
                       M++
                   }
                   for (K = 0; K < M; K++) {
                       H += this.items[G(K)].size[this.p_.size]
                   }
                   R = Math.abs(Math.abs(this.containerPosition) - H);
                   this.last = G(I);
                   break
               }
           }
           return R
       },
       _initDragOnScroll: function () {
           var R = (this.allSize / this.l) * this.itemStep;
           var ag = 0;
           var U = false;
           var aj, M, ah, Y, ai, L, H = (this.p_.pos == "left") ? "x" : "y",
               N = {
                   x: 0,
                   y: 0
               },
               W = this.o.effect == "scroll",
               Z, ac = true,
               Q = {
                   x: 0,
                   y: 0
               },
               J = false,
               aa = false,
               O = null,
               T = 0,
               ab = null,
               V = false,
               I = j(function (am) {
                   var al, ak = 0;
                   if (am > this.containerWidth) {
                       am = this.containerWidth
                   }
                   for (al = 1.5; al <= 90; al += 1.5) {
                       ak += (am * Math.cos(al / Math.PI / 2))
                   }
                   return this.containerWidth > ak ? ak : this.containerWidth
               }).jBind(this),
               K = j(function (am) {
                   var an, ak = 0,
                       al, ao;
                   while (ak > this.containerPosition) {
                       ak -= this.containerWidth
                   }
                   if (Math.abs(ak - this.containerPosition) > this.containerWidth / 2) {
                       ak += this.containerWidth
                   }
                   ao = ak;
                   for (an = 0; an < this.globalLength; an++) {
                       al = parseInt(this.container.childNodes[an].getAttribute("data-item"));
                       if (ao == 0) {
                           this.last = al;
                           break
                       }
                       ao += this.items[al].size[this.p_.size]
                   }
                   return ak
               }).jBind(this),
               ae = j(function (ak) {
                   aa = true;
                   j(document.body).jAddClass("mcs-dragging");
                   this.o.stopDownload = false;
                   ac = true;
                   clearTimeout(this.moveTimer);
                   if (this.o.effect == "animation") {
                       this.stopEffect()
                   }
                   this.stopWhell && this.stopWhell();
                   N = {
                       x: 0,
                       y: 0
                   };
                   H = (this.p_.pos == "left") ? "x" : "y";
                   this.jCallEvent("drag-start");
                   this.container.jRemoveEvent("transitionend");
                   this.containerPosition = this.getMatrixPosition(this.container)[H];
                   N[H] = this.containerPosition;
                   this.container.jSetCssProp(g, "translate3d(" + N.x + "px, " + N.y + "px, 0)");
                   this.container.jSetCssProp("transition", "none");
                   this._render();
                   this.o.effect == "scroll" && (W = true);
                   this.move_ = true
               }).jBind(this),
               G = j(function () {
                   if (this.o.effect == "animation") {
                       this.container.jSetCssProp("transition", "none");
                       this.globalIndex = this._getGlobalIndex()
                   }
                   if (this.o.effect == "animation") {
                       this.last = parseInt(this.container.childNodes[this._getGlobalIndex()].getAttribute("data-item"))
                   }
                   if ("infinite" === this.o.loop) {
                       this.changeClones()
                   }
                   this.move_ = false;
                   this.wheel_ = false;
                   W = false;
                   ac = true;
                   this.preloadItem();
                   this.jCallEvent("drag-end", {
                       arr: this.getVisibleIndexes(this.loop.lastItem)
                   })
               }).jBind(this),
               X = j(function (ao) {
                   j(document.body).jRemoveClass("mcs-dragging");
                   if (aa) {
                       aa = false;
                       var am = this.containerPosition;
                       if (!ac) {
                           ao.returnValue = false;
                           S();
                           M = ao.timeStamp - aj;
                           if (this.o.effect == "scroll") {
                               if (M > 200) {
                                   L = ai;
                                   W = false
                               } else {
                                   L = I(Math.abs(Q[H] - ao[H]))
                               }
                               if (v.browser.mobile && this.o.step !== "auto") {
                                   var an = j(function () {
                                       var ar = this.itemStep;
                                       var aq = this.allSize / this.l;
                                       for (var ap = 0; ap < this.itemStep - 1; ap++) {
                                           if (ah === "forward") {
                                               if (ag > aq * (ap + 1)) {
                                                   ar--
                                               } else {
                                                   return ar
                                               }
                                           } else {
                                               if (ag < (aq * -1) * (ap + 1)) {
                                                   ar--
                                               } else {
                                                   return ar
                                               }
                                           }
                                       }
                                       return ar
                                   }).jBind(this);
                                   var al = an();
                                   var ak = (this.allSize / this.l) * (al - 1);
                                   L = ak
                               }
                               ai = L;
                               if ("infinite" === this.o.loop) {
                                   this.distance = Math.abs(ai);
                                   this._shiftContainer(ah)
                               }
                               if ("infinite" === this.o.loop || this.containerPosition <= 0) {
                                   if (Math.abs(this.containerPosition) < ai) {
                                       ai = Math.abs(this.containerPosition)
                                   }
                                   this.containerPosition -= ai
                               }
                               ah == "forward" ? this.containerPosition -= this.correctItemPosition(ah) : this.containerPosition += this.correctItemPosition(ah);
                               if (!this.o.loop || "rewind" === this.o.loop) {
                                   this.jCallEvent("enable");
                                   this.loop.firstItem = false;
                                   this.loop.lastItem = false;
                                   if (this.containerPosition > 0) {
                                       this.containerPosition = 0;
                                       this.last = 0;
                                       W = true;
                                       this.jCallEvent("first-frame");
                                       this.loop.firstItem = true
                                   }
                                   if (this.containerPosition < this.containerWidth - this.allSize) {
                                       this.containerPosition = this.containerWidth - this.allSize;
                                       this.last = this.l - 1;
                                       W = true;
                                       this.jCallEvent("last-frame");
                                       this.loop.lastItem = true
                                   }
                               }
                               Z = W ? 600 : 300
                           } else {
                               W = true;
                               this.distance = 0;
                               this.containerPosition = K();
                               "infinite" === this.o.loop && this._shiftContainer(ah);
                               if (M < 200) {
                                   this.distance = this.containerWidth;
                                   "infinite" === this.o.loop && this._shiftContainer(ah);
                                   if (ah == "forward") {
                                       this.containerPosition -= this.containerWidth
                                   } else {
                                       this.containerPosition += this.containerWidth
                                   }
                               }
                               if (!this.o.loop || "rewind" === this.o.loop) {
                                   this.jCallEvent("enable");
                                   this.loop.firstItem = false;
                                   this.loop.lastItem = false;
                                   if (this.containerPosition >= 0) {
                                       this.containerPosition = 0;
                                       this.last = 0;
                                       this.loop.firstItem = true;
                                       this.jCallEvent("first-frame")
                                   }
                                   if (this.containerPosition <= (Math.ceil(this.l / this.itemStep) - 1) * this.containerWidth * (-1)) {
                                       this.containerPosition = (Math.ceil(this.l / this.itemStep) - 1) * this.containerWidth * (-1);
                                       this.last = this.l - 1;
                                       this.loop.lastItem = true;
                                       this.jCallEvent("last-frame")
                                   }
                               }
                               Z = 500
                           }
                           N[H] = this.containerPosition;
                           this.container.jAddEvent("transitionend", j(function (ap) {
                               if (ap.target == this.container) {
                                   G()
                               }
                           }).jBind(this));
                           if (am == this.containerPosition) {
                               this.move_ = false;
                               W = false;
                               ac = true
                           }
                           this.container.jSetCssProp("transition", g + " " + Z + "ms cubic-bezier(.22,.63,.49,.8)");
                           this.container.jSetCssProp(g, "translate3d(" + N.x + "px, " + N.y + "px, 0)")
                       } else {
                           if (!v.browser.mobile) {
                               G()
                           } else {
                               this.move_ = false
                           }
                       }
                   }
               }).jBind(this),
               P = 0,
               S = j(function () {
                   clearTimeout(ab);
                   ab = null;
                   V = false;
                   P = 0
               }).jBind(this),
               af = j(function () {
                   var ak = P * 0.2;
                   if (Math.abs(ak) < 0.0001) {
                       S();
                       return
                   }
                   P -= ak;
                   this.containerPosition -= ak;
                   N[H] = this.containerPosition;
                   this.container.jSetCssProp(g, "translate3d(" + N.x + "px, " + N.y + "px, 0)");
                   ab = setTimeout(af, 16)
               }).jBind(this),
               ad = j(function (al) {
                   if (aa) {
                       var ak = al[H] - T > 0 ? "backward" : "forward";
                       ac = false;
                       if ("infinite" === this.o.loop) {
                           this.distance = Math.abs(ai);
                           this._shiftContainer(ak)
                       }
                       if (v.browser.ieMode) {
                           P += ai;
                           if (!V) {
                               V = true;
                               af()
                           }
                       } else {
                           this.container.jSetCssProp("transition", g + " 0ms");
                           if (this.o.effect == "animation") {}
                           if (v.browser.mobile && this.o.step !== "auto") {
                               if (U) {
                                   return
                               }
                               if (ah === "forward") {
                                   if (ag + ai > R) {
                                       ai = R - ag;
                                       ai -= 3;
                                       U = true
                                   } else {
                                       ag += ai
                                   }
                               } else {
                                   if (ag + ai < (R * -1)) {
                                       ai = (R * -1) - ag;
                                       ai += 3;
                                       U = true
                                   } else {
                                       ag += ai
                                   }
                               }
                           }
                           this.containerPosition -= ai;
                           N[H] = this.containerPosition;
                           this.container.jSetCssProp(g, "translate3d(" + N.x + "px, " + N.y + "px, 0)")
                       }
                       this.freeTouchPreload(ak)
                   }
               }).jBind(this);
           this.onDrag = j(function (ak) {
               if (this.stopScroll || this.o.effect == "animation" && W) {
                   return
               }
               if ("dragstart" == ak.state) {
                   aj = ak.timeStamp;
                   Q.x = ak.x;
                   Q.y = ak.y;
                   T = ak[H];
                   ag = 0
               } else {
                   ah = (ai > 0) ? "forward" : "backward";
                   ai = T - ak[H];
                   this.moveSettings.direction = ah;
                   if ("dragend" == ak.state) {
                       if (J) {
                           J = false;
                           U = false;
                           X(ak)
                       }
                   } else {
                       if (this.o.orientation == "vertical" || Math.abs(ak.x - Q.x) > Math.abs(ak.y - Q.y)) {
                           ak.stopDefaults();
                           if (!J) {
                               if (this.o.effect == "animation" && this.move_) {
                                   return
                               }
                               J = true;
                               U = false;
                               ae(ak)
                           } else {
                               ad(ak)
                           }
                       }
                   }
               }
               T = ak[H]
           }).jBind(this);
           if (!v.browser.ieMode || v.browser.ieMode && v.browser.ieMode > 9) {
               this.container.parentNode.jAddEvent("mousedrag touchdrag", this.onDrag)
           }
       },
       _initOnWheel: function () {
           var L;
           var M;
           var I = 0;
           var K = {
               x: 0,
               y: 0
           };
           var J = (this.p_.pos == "left") ? "x" : "y";
           var H = j(function (O) {
               var N = I * (O || 0.2);
               L = N > 0 ? "forward" : "backward";
               I -= N;
               if (Math.abs(N) < 0.00001) {
                   clearTimeout(this.moveTimer);
                   this.last = parseInt(this.container.childNodes[this._getGlobalIndex()].getAttribute("data-item"));
                   this.changeClones();
                   this.wheelDiff = this._getWheelDiff();
                   this.prevIndex = this.last;
                   I = 0;
                   this.distance = 0;
                   this.moveTimer = null;
                   this.wheel_ = false;
                   this.move_ = false;
                   this.jCallEvent("drag-end", {
                       arr: this.getVisibleIndexes(this.loop.lastItem)
                   });
                   G();
                   return
               }
               this.distance = Math.abs(N);
               "infinite" === this.o.loop && this._shiftContainer(L);
               this.containerPosition -= N;
               this.distance = 0;
               this.freeTouchPreload(L);
               if (!this.o.loop || "rewind" === this.o.loop) {
                   if (this.containerPosition > 0) {
                       this.containerPosition = 0;
                       I = 0.00001;
                       this.jCallEvent("first-frame")
                   } else {
                       if (this.containerPosition < this.containerWidth - this.allSize) {
                           this.containerPosition = this.containerWidth - this.allSize;
                           I = 0.00001;
                           this.jCallEvent("last-frame")
                       } else {
                           this.jCallEvent("enable")
                       }
                   }
               }
               K[J] = this.containerPosition;
               this.container.jSetCssProp(g, "translate3d(" + K.x + "px, " + K.y + "px, 0)");
               this.moveTimer = setTimeout(H.jBind(this, O), 30)
           }).jBind(this);
           if (v.browser.ieMode && v.browser.ieMode < 10 || this.stopScroll) {
               return
           }
           this.stopWhell = j(function () {
               if (this.wheel_) {
                   clearTimeout(this.moveTimer);
                   I = 0;
                   this.distance = 0;
                   this.moveTimer = null;
                   this.wheel_ = false;
                   this.move_ = false
               }
           }).jBind(this);
           var G = function () {
               if ((!this.o.loop || this.o.loop === "rewind") && this.o.effect === "scroll") {
                   if (this.containerPosition < 0) {
                       this.loop.firstItem = false
                   }
                   if (this.containerPosition > this.containerWidth - this.allSize) {
                       this.loop.lastItem = false
                   }
               }
           }.jBind(this);
           this.container.jAddEvent("mousescroll", j(function (N) {
               var O = (Math.abs(N.deltaY) < Math.abs(N.deltaX) ? N.deltaX : N.deltaY * (!N.isMouse ? -1 : -30));
               if (this.move_) {
                   return
               }
               if ((true === this.o.scrollOnWheel && N.isMouse) || "vertical" === this.o.orientation && Math.abs(N.deltaY) > Math.abs(N.deltaX) || "horizontal" === this.o.orientation && Math.abs(N.deltaY) < Math.abs(N.deltaX)) {
                   N.stop();
                   this.wheel_ = true;
                   if (0 === I) {
                       this.container.jSetCssProp("transition", g + " 0ms");
                       K = {
                           x: 0,
                           y: 0
                       };
                       J = (this.p_.pos == "left") ? "x" : "y"
                   }
                   this.jCallEvent("drag-start");
                   I += O;
                   if (!this.moveTimer) {
                       H(0.4)
                   }
               }
           }).jBind(this))
       },
       _getWheelDiff: function () {
           var G;
           var I = this.containerPosition;
           var J = j(["tempArray", "items", "itemsLastClones"]);
           this.tempArray = [];
           this.itemsFirstClones.jEach(j(function (K) {
               this.tempArray.push(K)
           }).jBind(this));
           this.tempArray.reverse();
           for (var H = 0; H < J.length; H++) {
               for (G = 0; G < this[J[H]].length; G++) {
                   I += this.items[this[J[H]][G].index].size[this.p_.size];
                   if (I > 0) {
                       this.last = this[J[H]][G].index;
                       this.tempArray = null;
                       if (I > 0 && I < 1) {
                           I = 0
                       }
                       return I
                   }
               }
           }
       },
       pause: function () {
           var G;
           var H;
           if (!this.o.continuous || this.continuousPause || !this.move_ || this.o.effect == "animation") {
               return
           }
           this.continuousPause = true;
           if (v.browser.ieMode && v.browser.ieMode < 10) {
               this.fx && (this.fx.options.onComplete = v.$F);
               this.fx && this.fx.stop();
               this.fx = null;
               this.containerPosition = Math.round(parseInt(this.container.jGetCss(this.p_.pos)))
           } else {
               this.containerPosition = this.getMatrixPosition(this.container)[(this.p_.pos == "left") ? "x" : "y"]
           }
           G = this.correctItemPosition(this.direction);
           H = this.o.duration / this.distance * G;
           if (this.direction == "forward") {
               this.containerPosition -= G
           } else {
               this.containerPosition += G
           }
           this._move(H)
       },
       stop: function () {
           this.stop_ = true;
           this.move_ = false;
           this.stopWhell && this.stopWhell();
           if (this.o.effect == "animation") {
               this.stopEffect()
           }
           if (v.browser.ieMode && v.browser.ieMode < 10) {
               this.fx && this.fx.stop(true);
               this.fx = null
           } else {
               this._cleansingStyles()
           }
       },
       stopEffect: function () {
           var G = {
               x: 0,
               y: 0
           };
           if (!v.browser.ieMode || v.browser.ieMode && v.browser.ieMode > 10) {
               G[this.p_.pos] = this.containerPosition;
               this.container.removeAttribute("data-forward");
               this.container.removeAttribute("data-backward");
               j([this.exitItems, this.enterItems]).jEach(j(function (H, I) {
                   if (H.length > 0) {
                       H.jEach(j(function (K, J) {
                           K.jRemoveEvent(w + "AnimationStart animationstart " + w + "AnimationEnd animationend");
                           K.removeAttribute("data-animation-nth");
                           K.removeAttribute("data-action");
                           if (!I) {
                               K.removeAttribute("data-exiting");
                               K.removeAttribute("data-exited")
                           } else {
                               K.removeAttribute("data-entering")
                           }
                       }).jBind(this))
                   }
               }).jBind(this));
               this.container.jSetCssProp(g, "translate3d(" + G.left + "px, " + G.top + "px, 0)");
               this.move_ = false;
               this._render()
           }
       },
       onResize: function () {
           var H;
           var J;
           this.stop();
           this.continuousPause = false;
           this.wrapperPosition = j(this.container.parentNode).jGetPosition();
           this.containerWidth = this._sWidth();
           this.itemsVisible = 0;
           this.allSize = 0;
           for (var G = 0; G < this.l; G++) {
               this.items[G].size = this.items[G].node.jGetSize(true);
               this.allSize += this.items[G].size[this.p_.size];
               if (this.allSize <= this.containerWidth) {
                   this.itemsVisible += 1
               }
           }
           if (v.browser.ieMode && v.browser.ieMode < 10) {
               this.last = 0
           } else {
               this.correctContainerPosition()
           }
           this.distance = 0;
           this.itemStep = this.o.step;
           if (this.allSize <= this.containerWidth) {
               this.stopScroll = true;
               this.jCallEvent("hideArrows");
               this.jCallEvent("disable");
               this.correctPosition = 0;
               this.containerPosition = 0;
               if (v.browser.ieMode && v.browser.ieMode < 10) {
                   this.container.jSetCssProp(this.p_.pos, 0)
               } else {
                   this.container.jSetCssProp(g, "translate3d(0px, 0px, 0)")
               }
               this._removeClones()
           } else {
               this.stopScroll = false;
               this.jCallEvent("showArrows");
               this.jCallEvent("enable");
               if (!this.o.loop || "rewind" === this.o.loop) {
                   if (this.loop.firstItem) {
                       this.jCallEvent("first-frame")
                   }
                   if (this.loop.lastItem) {
                       this.jCallEvent("last-frame")
                   }
               }
           }
           if ((this.allSize > this.containerWidth) && ("infinite" === this.o.loop || this.o.continuous)) {
               this._prepareClones()
           } else {
               var I = 0;
               this.fullViewedItems = I;
               for (var G = 0; G < this.l; G++) {
                   I += this.items[G].size[this.p_.size];
                   this.fullViewedItems++;
                   if (this.containerWidth <= I) {
                       break
                   }
               }
           }
           this._shiftContainer("forward");
           this.container.jRemoveEvent("transitionend");
           this.globalIndex = this._getGlobalIndex();
           this.globalLength = this.container.childNodes.length;
           this.setItemStep();
           this.changeClones();
           this.allNodes = v.$A(this.container.childNodes);
           this.o.lazyLoad ? this.preloadItem() : this.preloadAll()
       },
       correctContainerPosition: function () {
           if (this.items.length === 0) {
               return
           }
           var I;
           var K;
           var J = {
               left: 0,
               top: 0
           };
           var H = this.items[this.last].node.jGetPosition()[this.p_.pos];
           var G = this.container.parentNode.jGetPosition()[this.p_.pos];
           if (v.browser.ieMode && v.browser.ieMode < 10) {} else {
               if (!this.o.loop && this.loop.lastItem) {
                   if ("scroll" === this.o.effect) {
                       J[this.p_.pos] = this.containerWidth - this.allSize
                   } else {
                       K = this.itemsVisible - this.l % this.itemsVisible;
                       J[this.p_.pos] = this.containerWidth - (this.allSize + this.items[0].size[this.p_.size] * K)
                   }
               } else {
                   I = this.getMatrixPosition(this.container)["left" === this.p_.pos ? "x" : "y"];
                   J[this.p_.pos] = I - (H - G)
               }
               this.containerPosition = J[this.p_.pos];
               this.container.jSetCssProp(g, "translate3d(" + J.left + "px, " + J.top + "px, 0)")
           }
       },
       rightQueue: function (H) {
           var N = 0,
               M = true,
               I = this.l - 1,
               J = j(["itemsLastClones", "items", "itemsFirstClones"]),
               L = j(function (R, P) {
                   var O, Q = null;
                   for (O = 0; O < R.length; O++) {
                       if (R[O].index == P) {
                           Q = R[O].node;
                           break
                       }
                   }
                   return Q
               }).jBind(this),
               K = j(function (O) {
                   return (N == 0) ? O - 1 : (N - 1)
               }).jBind(this),
               G = j(function (R, P) {
                   var Q, O = R.length;
                   if (O > 0) {
                       for (Q = 0; Q < O; Q++) {
                           if (M) {
                               M = false;
                               N = O - 1;
                               this.container.appendChild(R[N].node)
                           } else {
                               this.container.insertBefore(L(R, !N ? I : K(O)), L(!N ? this[J[P - 1]] : R, N));
                               N = !N ? I : N - 1
                           }
                       }
                   }
               }).jBind(this);
           if (this.itemsLastClones.length || this.itemsFirstClones.length) {
               J.jEach(j(function (O, P) {
                   G(this[O], P);
                   N = 0
               }).jBind(this));
               if (!H) {
                   this.last = 0
               }
           }
       },
       _removeClones: function () {
           this.itemsFirstClones.jEach(function (G) {
               G.node.kill()
           });
           this.itemsFirstClones = j([]);
           this.itemsLastClones.jEach(function (G) {
               G.node.kill()
           });
           this.itemsLastClones = j([])
       },
       update: function (H) {
           if (this.fullscreenChanged) {
               this.fullscreenChanged = false;
               return
           }
           var G = {
               left: 0,
               top: 0
           };
           this.stop();
           if (H) {
               this.containerPosition = this.last = 0
           }
           if (v.browser.ieMode && v.browser.ieMode < 10) {
               this.container.jSetCss(G)
           } else {
               if (H) {
                   this.container.jSetCssProp(g, "translate3d(" + G.left + "px, " + G.top + "px, 0)")
               } else {
                   this.correctContainerPosition()
               }
           }
           this.itemStep = this.o.step;
           if ((!this.o.continuous && (!this.o.loop || "rewind" === this.o.loop)) && this.itemsFirstClones.length > 0) {
               this.correctPosition = 0;
               this._removeClones()
           }
           this.onResize();
           this.rightQueue(!H);
           if (H) {
               this.container.parentNode.jRemoveEvent("mousedrag touchdrag", this.onDrag);
               if (this.o.draggable) {
                   this.container.parentNode.jAddEvent("mousedrag touchdrag", this.onDrag)
               }
           }
           this.move_ = false
       },
       setNewOptions: function (G) {
           for (var H in G) {
               this.o[H] = G[H]
           }
           this._setProperties()
       },
       dispose: function () {
           this.stop();
           this._removeClones();
           j(window).jRemoveEvent("resize");
           j(document).jRemoveEvent("keydown");
           this.container.jRemoveEvent("touchdrag mousedrag");
           v.$A(this.container.querySelectorAll("iframe")).jEach(j(function (G) {
               G.jRemoveEvent("iframe")
           }).jBind(this));
           this.items.jEach(j(function (G) {
               G.node.jRemoveEvent("mouseover mouseout");
               if (G.figcaption) {
                   G.figcaption.jSetCss({
                       top: "",
                       opacity: ""
                   })
               }
               delete G.content.showThis
           }).jBind(this))
       }
   };
   v.extend(b.prototype, v.customEvents);
   v.Scroll.Effect = b;
   var z = function (G, H) {
       v.Scroll.Effect.apply(this, arguments);
       this._options = {
           radius: "auto",
           gradientBezier: j([0.44, 0.59, 0.35, 0.89]),
           startAlpha: 255,
           timingFunction: "cubic-bezier(.8, 0, .5, 1)"
       };
       this.name = "carousel";
       this.o = this._options;
       v.extend(this.o, H);
       this.distance = 70;
       this.lastAngle = 0;
       this.nextAngle = 0;
       this.moveTimer = null;
       this.fxk = Math.pow(10, 8);
       this.circle = 2 * Math.PI;
       this.last = 0;
       this.getVisibleItems = j([]);
       this.originSize = null;
       this.angle = null;
       this.endItem = null;
       this.radius = 0;
       this.l = 0;
       this.originFontSize = null
   };
   v.inherit(z, v.Scroll.Effect);
   v.extend(z.prototype, {
       constructor: z,
       _prepareClones: v.$F,
       changeClones: v.$F,
       _scroll: v.$F,
       pause: v.$F,
       resetZIndex: v.$F,
       performedOnClones: v.$F,
       cloneFigure: v.$F,
       preloadItem: v.$F,
       _getWheelDiff: v.$F,
       gradientBezier: v.extend({}, v.FX.prototype),
       _shiftContainer: function () {
           this.lastAngle %= this.circle;
           this.nextAngle = this.lastAngle
       },
       done: function (I) {
           var G;
           if (this.doneFlag.one) {
               return
           }
           this.doneFlag.one = true;
           G = this.l = this.items.length;
           this.containerWidth = this._sWidth();
           if (v.browser.ieMode && v.browser.ieMode < 10 && this.items[0].content.length && this.items[0].content.lastChild.tagName.toLowerCase() == "figcaption") {
               this.originFontSize = parseInt(this.items[0].content.lastChild.jGetCss("font-size"))
           }
           this.gradientBezier.cubicBezier = this.o.gradientBezier;
           for (var H = 0; H < this.l; H++) {
               this.items[H].size = this.items[H].node.jGetSize(true, true);
               this.allSize += this.items[H].size[this.p_.size];
               this.items[H].node.jSetCssProp("position", "absolute");
               this.items[H].img = this.getImg(this.items[H])
           }
           if ("infinite" === this.o.loop) {
               this.jCallEvent("enable")
           }
           this.items.jEach(j(function (J) {
               if (J.figcaption && !J.captionA) {
                   if (J.content.tagName.toLowerCase() != "figure") {
                       J.captionA = true
                   }
               }
           }).jBind(this));
           this.onResize();
           this.preloadAll()
       },
       done2: function (G) {
           this.doneFlag.two = true;
           this.itemEvent();
           this.angle = this.circle / this.l;
           this.endItem = (this.circle - this.angle) * (-1);
           this.itemStep = 1;
           this._initDragOnScroll();
           this.o.scrollOnWheel && this._initOnWheel();
           j(window).jAddEvent("resize", this.onResize.jBind(this));
           if (this.o.keyboard) {
               j(document).jAddEvent("keydown", this.keyboardCallback)
           }
           G && G();
           this.onResize()
       },
       afterAddItem: function (G, H) {
           this.itemEventByIndex(G);
           this.angle = this.circle / this.l;
           this.endItem = (this.circle - this.angle) * (-1);
           this.itemStep = 1;
           H && H();
           this.onResize()
       },
       removeItem: function (G) {
           var H = this.items[G];
           this.removeEventByIndex(G);
           this.removeByIndex(G);
           H.node.jRemove();
           this.onResize()
       },
       itemEvent: function () {
           z.$parent.itemEvent.apply(this);
           this.items.jEach(j(function (G) {
               G.node.jAddEvent("click", j(function (H) {
                   this.jCallEvent("item-click", {
                       index: G.index
                   })
               }).jBind(this))
           }).jBind(this))
       },
       itemEventByIndex: function (G) {
           z.$parent.itemEventByIndex.apply(this, [G]);
           var H = this.items[G];
           if (H) {
               this.items[G].node.jAddEvent("click", j(function (I) {
                   this.jCallEvent("item-click", {
                       index: H.index
                   })
               }).jBind(this))
           }
       },
       removeEventByIndex: function (G) {
           z.$parent.removeEventByIndex.apply(this, [G]);
           var H = this.items[G];
           if (H) {
               H.node.jRemoveEvent("click")
           }
       },
       showReflection: function (H) {
           var G = 1000;
           if (v.browser.ieMode && v.browser.ieMode < 10 || !H.canvas) {
               return
           }
           H.canvas.jSetOpacity(1);
           H.canvas.jSetCssProp("transition", "opacity " + G + "ms")
       },
       setCanvasPosition: function (I) {
           var G;
           var H;
           var J = j(function (K) {
               if (K.canvas || K.captionA) {
                   G = K.img.jGetSize(false, true);
                   H = K.img.offsetTop + G.height;
                   if (K.canvas) {
                       K.canvas.jSetCss({
                           top: H,
                           left: K.img.offsetLeft,
                           width: G.width
                       })
                   }
                   if (K.captionA && K.figcaption) {
                       K.figcaption.jSetCss({
                           top: H
                       })
                   }
               }
           }).jBind(this);
           I ? J(I) : this.items.jEach(j(function (K) {
               J(K)
           }).jBind(this))
       },
       getImg: function (I) {
           var G;
           var H = I.content;
           if (H.tagName == "IMG") {
               G = H
           } else {
               if (H.firstChild.tagName == "IMG") {
                   G = H.firstChild
               } else {
                   if (H.firstChild.tagName == "PICTURE" && j(H.firstChild).byTag("IMG")[0]) {
                       G = j(H.firstChild).byTag("IMG")[0]
                   } else {
                       if (H.firstChild.tagName == "FIGURE" && H.firstChild.firstChild.tagName == "IMG") {
                           G = H.firstChild.firstChild
                       } else {
                           G = null
                       }
                   }
               }
           }
           if (G) {
               j(G).jSetCssProp("z-index", 100)
           }
           return G
       },
       setReflection: function (T) {
           if (this.o.orientation == "vertical") {
               return
           }
           var I = v.$new("canvas", {}, {
               opacity: 0
           });
           var U = v.$new("canvas");
           var H;
           var G;
           var L;
           var R;
           var Q;
           var S;
           var V = 1;
           var O;
           var P;
           var M;
           var J;
           var K;
           if (v.browser.ieMode && v.browser.ieMode < 10) {
               return
           }
           if (I.getContext) {
               H = I.getContext("2d");
               G = U.getContext("2d");
               if (!T.img) {
                   return
               }
               Q = j(T.img).jGetSize(false, true);
               S = Q.height / 100 * 30;
               U.width = Q.width;
               U.height = Q.height;
               G.save();
               G.scale(1, -1);
               G.drawImage(T.img, 0, Q.height * (-1), Q.width, Q.height);
               L = G.getImageData(0, 0, Q.width, S);
               G.restore();
               I.width = Q.width;
               I.height = S;
               H.save();
               P = L.data;
               K = P.length;
               J = K / 4 / Q.width;
               M = this.o.startAlpha;
               O = K / J;
               for (var N = 3; N < K; N += 4) {
                   if (N > O) {
                       O += (K / J);
                       V++;
                       M = Math.round(this.o.startAlpha - this.o.startAlpha * this.gradientBezier.cubicBezierAtTime(1 / (J / V)))
                   }
                   P[N] = M
               }
               H.putImageData(L, 0, 0);
               H.restore();
               T.canvas = I;
               if ((!T.content.childNodes || T.content.childNodes.length < 2) && T.content.tagName.toLowerCase() !== "a") {
                   T.node.appendChild(I)
               } else {
                   T.content.insertBefore(I, T.content.childNodes[1])
               }
               I.jAddClass("mcs-reflection")
           }
       },
       showCaption: function (H) {
           var I = 0;
           var G = this.distance / (this.l / 2);
           var J = 100 - G;
           if (H > J) {
               I = (H - J) / G
           }
           return I
       },
       renderCarousel: function (N) {
           var K = {
               left: 0,
               top: 0
           };
           var I = {
               left: 0,
               top: 0
           };
           var U = {
               left: 0,
               top: 0
           };
           var O;
           var T;
           var S = this.l;
           var P = this.distance;
           var G = this.circle / S;
           var R;
           var J;
           var H;
           var M;
           var Q;
           K[this.p_.pos] = this.radius;
           v.defined(N) || (N = 0);
           this.lastAngle = N;
           for (var L = 0; L < S; L++) {
               J = H = L * G + N;
               H %= this.circle;
               J %= this.circle;
               if (H != 0 && H != Math.PI) {
                   if (Math.ceil(Math.abs(H) / Math.PI) % 2 == 0) {
                       if (Math.abs(H) % Math.PI != 0) {
                           J = Math.PI - (Math.abs(H) % Math.PI)
                       }
                   } else {
                       J = Math.abs(H)
                   }
               }
               J = Math.abs(J * 100 / Math.PI);
               if (this.items[L].figcaption) {
                   this.items[L].figcaption.jSetOpacity(this.showCaption(100 - (J * P / 100)))
               }
               J = 100 - Math.round(J * P / 100);
               !this.originSize && (this.originSize = this.items[L].size);
               O = Math.abs(H);
               if (O > Math.PI / 2 && O < Math.PI + Math.PI / 2) {
                   if (O > Math.PI) {
                       O = Math.PI / 2 - Math.abs(O - Math.PI)
                   } else {
                       O = O - Math.PI / 2
                   }
                   O = (1 - Math.sin(O)) * 0.7
               } else {
                   O = 1
               }
               if (v.browser.ieMode && v.browser.ieMode < 10) {
                   M = {
                       width: this.setItemSide("width", J),
                       height: this.setItemSide("height", J)
                   };
                   this.items[L].node.jSetCss(M);
                   this.items[L].node.jSetCss({
                       top: Math.sin(H) * K.top + parseInt(this.containerSize.height) / 2 - parseInt(M.height) / 2,
                       left: Math.sin(H) * K.left + parseInt(this.containerSize.width) / 2 - parseInt(M.width) / 2
                   });
                   if (this.items[L].content.length && this.items[L].content.lastChild.tagName.toLowerCase() == "figcaption") {
                       this.items[L].content.lastChild.style.fontSize = this.setFontSize(J / 100 * J)
                   }
                   if (this.items[L].captionA) {
                       R = this.items[L].img.jGetSize(false, true);
                       this.items[L].figcaption.jSetCss({
                           top: this.items[L].img.offsetTop + R.height
                       })
                   }
               } else {
                   U[this.p_.pos] = 360 / this.circle * H;
                   this.o.orientation == "vertical" && (U[this.p_.pos] *= (-1));
                   Q = Math.abs(H);
                   T = Math.sqrt(1 - Math.sin(Q) * Math.sin(Q));
                   if (Q > Math.PI / 2 && Q < Math.PI + Math.PI / 2) {
                       Q = this.radius * (T) + this.radius
                   } else {
                       Q = this.radius * (1 - T)
                   }
                   Q > 0 && (Q *= (-1));
                   I[this.p_.pos] = (Math.sin(H) * K[this.p_.pos] + parseInt(this.containerSize[this.p_.size]) / 2 - this.items[L].size[this.p_.size] / 2);
                   this.items[L].node.jSetCssProp(g, "translateX(" + I.left + "px)translateY(" + I.top + "px)translateZ(" + Q + "px)rotateX(" + U.top + "deg)rotateY(" + U.left + "deg)")
               }
               this.items[L].node.jSetCssProp("z-index", 0 + J);
               this.items[L].node.jSetOpacity(O)
           }
       },
       round: function (G, H) {
           var I = Math.pow(10, H || 15);
           return Math.round(G * I) / I
       },
       _calcDistance: function (J) {
           var H;
           var I;
           var G = 360 / this.l;
           if (J.defaultMove) {
               if (J.goTo) {
                   if (J.direction == "forward" && this.last > J.target) {
                       H = this.l - this.last;
                       H += J.target
                   } else {
                       if (J.direction == "backward" && this.last < J.target) {
                           H = this.l - J.target;
                           H += this.last
                       }
                   }!H && (H = Math.abs(this.last - J.target));
                   this.last = J.target
               } else {
                   H = this.itemStep;
                   this.last = this._getItemIndex(J.direction == "forward" ? this.last + H : this.last - H)
               }
           } else {
               I = (360 - this.last * G + J.target * G) % 360;
               if (I >= 0 && I <= 180) {
                   !J.direction && (J.direction = "forward")
               } else {
                   if (I >= 180 && I <= 360) {
                       !J.direction && (J.direction = "backward")
                   }
               }
               if (J.direction == "forward") {
                   H = Math.round(I / G)
               } else {
                   H = Math.round((360 - I) / G)
               }
               this.last = J.target
           }
           return v.extend(J, {
               angle: H * this.angle
           })
       },
       _carousel: function (H) {
           var G;
           H = this._calcDistance(H);
           G = H.angle;
           if (!this.o.loop) {
               this.jCallEvent("enable")
           }
           if (H.direction == "forward") {
               this.nextAngle -= G;
               if (!this.o.loop) {
                   if (this.nextAngle == this.endItem) {
                       this.jCallEvent("last-frame")
                   } else {
                       if (this.nextAngle < this.endItem) {
                           this.last = 0;
                           this.nextAngle = 0;
                           this.jCallEvent("first-frame")
                       }
                   }
               }
           } else {
               this.nextAngle += G;
               if (!this.o.loop) {
                   if (this.nextAngle == 0) {
                       this.jCallEvent("first-frame")
                   } else {
                       if (this.nextAngle > 0) {
                           this.last = this.l - 1;
                           this.nextAngle = this.endItem;
                           this.jCallEvent("last-frame")
                       }
                   }
               }
           }
           this.jCallEvent("on-start-effect", {
               arr: [this.last]
           });
           this.callback = H.callback;
           this._move(this.nextAngle)
       },
       setItemSide: function (G, H) {
           return this.originSize[G] / 100 * H
       },
       setFontSize: function (G) {
           return Math.round(this.originFontSize / 100 * G) + "px"
       },
       _move: function (G) {
           this.fx = new v.FX(this.container, {
               duration: this.o.duration,
               transition: this.o.timingFunction,
               onBeforeRender: (function (H) {
                   this.renderCarousel(H.angle / this.fxk)
               }).jBind(this),
               onComplete: j(function () {
                   this._onComplete()
               }).jBind(this)
           }).start({
               angle: [this.fxk * this.lastAngle, this.fxk * G]
           })
       },
       _onComplete: function () {
           this._shiftContainer();
           z.$parent._onComplete.apply(this)
       },
       _move2: function (H) {
           var G = Math.abs(this.nextAngle - this.lastAngle) * (H || 0.2);
           if (Math.abs(G) < 0.00001) {
               clearTimeout(this.moveTimer);
               this.moveTimer = null;
               this.move_ = false;
               this.jCallEvent("drag-end", {
                   arr: [this.last]
               });
               return
           }
           if (this.nextAngle < this.lastAngle) {
               G *= (-1)
           }
           this.renderCarousel(this.lastAngle + G);
           this.moveTimer = setTimeout(this._move2.jBind(this, H), 30)
       },
       searchIndex: function () {
           var J = this.nextAngle % this.circle;
           var I = parseInt(Math.abs(this.nextAngle / this.circle));
           var L;
           var K;
           var G = j(function (M) {
               while (I != 0) {
                   I--;
                   if (J <= 0) {
                       M -= this.circle
                   } else {
                       M += this.circle
                   }
               }
               return M
           }).jBind(this);
           for (var H = 0; H < this.l; H++) {
               L = (H * this.circle) / this.l;
               K = ((H + 1) * this.circle) / this.l;
               if (J <= 0) {
                   L *= (-1);
                   K *= (-1)
               } else {
                   L = this.circle - L;
                   K = this.circle - K
               }
               if (L != J) {
                   if (L > J && J > K) {
                       if (Math.abs(J - L) <= Math.abs(K - J)) {
                           this.nextAngle = G(L);
                           this.last = H
                       } else {
                           this.nextAngle = G(K);
                           this.last = this._getItemIndex(H + 1)
                       }
                   }
               } else {
                   this.last = H
               }
           }
       },
       _initOnWheel: function () {
           var I;
           var H;
           var G = this.circle / 360 * 15;
           this.container.jAddEvent("mousescroll", j(function (J) {
               if (true === this.o.scrollOnWheel || J.isMouse || "vertical" === this.o.orientation && Math.abs(J.deltaY) > Math.abs(J.deltaX) || "horizontal" === this.o.orientation && Math.abs(J.deltaY) < Math.abs(J.deltaX)) {
                   this.jCallEvent("drag-start");
                   this.fx && this.fx.stop(true);
                   this.fx = null;
                   J.stop();
                   if (v.browser.ieMode && v.browser.ieMode < 10) {
                       J.isMouse = true
                   }
                   H = Math.abs(J.deltaY) < Math.abs(J.deltaX) ? J.deltaX : -1 * J.deltaY;
                   H = J.isMouse ? (H * G) : (H * (8 / 864));
                   !J.isMouse && (H = H > 0 ? Math.min(this.angle / 4, H) : Math.max(this.angle / 4 * (-1), H));
                   this.nextAngle -= H;
                   clearTimeout(I);
                   I = setTimeout(j(function () {
                       this.searchIndex()
                   }).jBind(this), 100);
                   if (!this.o.loop) {
                       if (this.nextAngle >= 0) {
                           this.jCallEvent("first-frame");
                           this.nextAngle = 0;
                           this.last = 0
                       } else {
                           if (this.nextAngle <= this.endItem) {
                               this.jCallEvent("last-frame");
                               this.nextAngle = this.endItem;
                               this.last = this.l - 1
                           }
                       }
                   }
                   if (!this.moveTimer) {
                       this._move2(0.08)
                   }
               }
           }).jBind(this))
       },
       _initDragOnScroll: function () {
           var L = (this.p_.pos == "left") ? "x" : "y";
           var N = {
               x: 0,
               y: 0
           };
           var M = {
               x: 0,
               y: 0
           };
           var K;
           var H = false;
           var J = "forward";
           var G = false;
           var I = j(function (O) {
               if ("dragstart" == O.state) {
                   j(document.body).jAddClass("mcs-dragging");
                   G = true;
                   N.x = M.x = O.x;
                   N.y = M.y = O.y
               } else {
                   if (G) {
                       N.x = O.x;
                       N.y = O.y;
                       if ("dragend" == O.state) {
                           j(document.body).jRemoveClass("mcs-dragging");
                           G = false;
                           if (H) {
                               H = false;
                               this.searchIndex()
                           }
                       } else {
                           if (this.o.orientation == "vertical" || Math.abs(O.x - M.x) > Math.abs(O.y - M.y)) {
                               O.stopDefaults();
                               if (!H) {
                                   H = true;
                                   this.move_ = true;
                                   this.fx && this.fx.stop();
                                   this.jCallEvent("drag-start");
                                   clearTimeout(this.moveTimer);
                                   this.moveTimer = null
                               }
                               J = M[L] < N[L] ? "backward" : "forward";
                               K = Math.abs(M[L] - N[L]) / this.radius;
                               if (J == "forward") {
                                   this.nextAngle -= K;
                                   if (!this.o.loop) {
                                       if (this.nextAngle <= this.endItem) {
                                           this.jCallEvent("last-frame");
                                           this.nextAngle = this.endItem;
                                           this.last = this.l - 1
                                       }
                                   }
                               } else {
                                   this.nextAngle += K;
                                   if (!this.o.loop) {
                                       if (this.nextAngle >= 0) {
                                           this.jCallEvent("first-frame");
                                           this.nextAngle = 0;
                                           this.last = 0
                                       }
                                   }
                               }!this.moveTimer && this._move2()
                           }
                           M.x = N.x;
                           M.y = N.y
                       }
                   }
               }
           }).jBind(this);
           this.container.jAddEvent("touchdrag mousedrag", I)
       },
       stop: function () {
           this.fx && this.fx.stop(true);
           this.fx = null;
           clearTimeout(this.moveTimer);
           this.moveTimer = null;
           this.nextAngle && this.renderCarousel(this.nextAngle)
       },
       onResize: function () {
           var I;
           var H;
           var J;
           this.stop();
           this.containerWidth = this._sWidth();
           this.containerSize = this.container.parentNode.jGetSize(false, true);
           this.allSize = 0;
           for (var G = 0; G < this.l; G++) {
               this.items[G].size = this.items[G].node.jGetSize(true, true);
               this.allSize += this.items[G].size[this.p_.size]
           }
           this.angle = 1 * this.circle / this.l;
           this.endItem = (this.circle - this.angle) * (-1);
           I = this.allSize / this.circle;
           this.radius = this.containerSize[this.p_.size] / 2;
           (this.radius < I) && (this.radius = I);
           (v.browser.ieMode && v.browser.ieMode < 10) && (this.radius -= (this.items[0].size[this.p_.size] / 2));
           this.lastAngle = this.nextAngle = 0;
           this.renderCarousel();
           this.setCanvasPosition();
           H = this.last;
           this.last = 0;
           J = this._calcDistance({
               target: H
           });
           if ("forward" === J.direction) {
               this.nextAngle -= J.angle
           } else {
               this.nextAngle += J.angle
           }
           this.renderCarousel(this.nextAngle)
       },
       update: function (G) {
           this.stop();
           this.last = 0;
           if (this.o.orientation == "vertical") {
               this.removeCanvas()
           } else {
               this.items.jEach(j(function (H) {
                   if (!H.canvas) {
                       this.setReflection(H)
                   }
               }).jBind(this))
           }
           this.container.jRemoveEvent("touchdrag mousedrag mousescroll");
           this._initDragOnScroll();
           this.o.scrollOnWheel && this._initOnWheel();
           this.resetZIndex();
           this._setProperties();
           this.onResize();
           if (this.o.orientation == "horizontal") {
               this.items.jEach(j(function (H) {
                   this.showReflection(H)
               }).jBind(this))
           }
           this.move_ = false
       },
       removeCanvas: function () {
           this.items.jEach(j(function (G) {
               if (G.canvas) {
                   G.canvas.jRemove();
                   delete G.canvas
               }
           }).jBind(this))
       },
       dispose: function () {
           z.$parent.dispose.apply(this);
           this.container.jRemoveEvent("mousescroll");
           this.removeCanvas();
           this.items.jEach(j(function (G) {
               G.node.jRemoveEvent("click")
           }).jBind(this))
       }
   });
   v.extend(z.prototype, v.customEvents);
   v.Scroll.Carousel = z;
   var d = function (G, H) {
       v.Scroll.Carousel.apply(this, arguments);
       this.name = "coverFlow";
       this.center = null;
       this.distance = null;
       this.moiety = null;
       this.lastPosition = null;
       this.nextPosition = null;
       this.depth = 350;
       this.itemStep = 1;
       this.moveTimer = null;
       this.firstSide = null;
       this.lastSide = null;
       this.stepDistance = null;
       this.lastItemLoad = 0
   };
   v.inherit(d, v.Scroll.Carousel);
   v.extend(d.prototype, {
       constructor: d,
       _shiftContainer: v.$F,
       _carousel: v.$F,
       showCaption: v.$F,
       setItemsPosition: function () {
           var I;
           var H;
           this.stepDistance = this.moiety;
           if (this.o.orientation == "vertical") {
               H = this.moiety + this.moiety * 0.8;
               this.stepDistance /= 2
           } else {
               H = this.moiety * 2
           }
           for (var G = 0; G < this.l; G++) {
               I = (G == 1) ? H : this.stepDistance;
               this.items[G].position = !G ? (this.center - this.moiety) : (this.items[G - 1].position + I)
           }
       },
       zIndex: function (G) {
           if (this.o.orientation == "horizontal") {
               return Math.round(this.allSize - Math.abs(this.center - (G.position + this.moiety)))
           }
       },
       done: function (I) {
           var G;
           if (this.doneFlag.one) {
               return
           }
           this.doneFlag.one = true;
           G = this.l = this.items.length;
           this.containerWidth = this._sWidth();
           this.gradientBezier.cubicBezier = this.o.gradientBezier;
           for (var H = 0; H < this.l; H++) {
               this.items[H].size = this.items[H].node.jGetSize(true, true);
               this.allSize += this.items[H].size[this.p_.size];
               this.items[H].node.jSetCssProp("position", "absolute");
               this.items[H].img = this.getImg(this.items[H]);
               this.items[H].figcaption && j(this.items[H].figcaption).jSetOpacity(0)
           }
           this.o.loop = false;
           this.items.jEach(j(function (J) {
               if (J.figcaption && !J.captionA) {
                   if (J.content.tagName.toLowerCase() != "figure") {
                       J.captionA = true
                   }
               }
           }).jBind(this));
           this.onResize();
           !this.o.lazyLoad && this.preloadAll()
       },
       done2: function (G) {
           this.doneFlag.two = true;
           this.itemEvent();
           this.itemStep = 1;
           this._initDragOnScroll();
           this.o.scrollOnWheel && this._initOnWheel();
           j(window).jAddEvent("resize", this.onResize.jBind(this));
           if (this.o.keyboard) {
               j(document).jAddEvent("keydown", this.keyboardCallback)
           }
           G && G();
           this.onResize()
       },
       afterAddItem: function (G, H) {
           this.itemEventByIndex(G);
           this.itemStep = 1;
           H && H();
           this.onResize()
       },
       zoom: function (O) {
           var M;
           var H;
           var N;
           var L;
           var I = 1;
           var G;
           var J = O.position + this.moiety;
           var K = O.position + this.moiety <= this.center;
           L = K ? (this.center - J) : (J - this.center);
           L /= ((K ? (this.center - this.firstSide) : (this.lastSide - this.center)) / 100);
           H = (90 / 100 * L) * (Math.PI / 180);
           M = 60 * Math.sin(H);
           G = 1 - 1 * Math.sin(H);
           if (this.o.orientation == "horizontal") {
               !K && (M *= (-1))
           } else {
               M *= (-1);
               K && (I = 1 - 0.7 * Math.sin(H))
           }
           N = this.depth * Math.sin(H) * (-1);
           return {
               rotate: M,
               translateZ: N,
               opacity: I,
               captionOpasity: G
           }
       },
       calcItemPosition: function (K, M) {
           var I;
           var H = false;
           var L = false;
           var G = K.position + this.moiety;
           var N;
           var J = {
               rotate: 60,
               translateZ: this.depth * (-1),
               opacity: 1
           };
           N = G - M;
           if (G >= this.lastSide) {
               if (G - M < this.lastSide) {
                   I = G - this.lastSide;
                   L = true;
                   M -= I;
                   if (M <= this.moiety) {
                       M = (this.lastSide - this.center) / this.stepDistance * M
                   } else {
                       if (M <= this.moiety * 2) {
                           M = (this.lastSide - this.firstSide) / (this.stepDistance * 2) * M
                       } else {
                           M += (this.moiety * 2);
                           L = false
                       }
                   }
                   K.position -= I
               }
               H = true;
               K.position -= M
           } else {
               if (G <= this.firstSide) {
                   if (this.o.orientation == "vertical") {
                       M = (this.lastSide - this.center) / this.stepDistance * M
                   } else {
                       if (G - M > this.firstSide) {
                           L = true;
                           I = this.firstSide - G;
                           M += I;
                           if (M >= this.moiety * (-1)) {
                               M = (this.lastSide - this.center) / this.stepDistance * M
                           } else {
                               if (M >= this.moiety * 2 * (-1)) {
                                   M = (this.lastSide - this.firstSide) / (this.stepDistance * 2) * M
                               } else {
                                   M -= (this.moiety * 2)
                               }
                           }
                           K.position += I
                       }
                   }
                   H = true;
                   K.position -= M
               } else {
                   if (G > this.firstSide && G < this.lastSide) {
                       M = (this.lastSide - this.center) / this.stepDistance * M;
                       if (G - M >= this.lastSide) {
                           I = this.lastSide - G;
                           M += I;
                           M = this.stepDistance / ((this.lastSide - this.center) / M);
                           K.position += I
                       } else {
                           if (G - M <= this.firstSide) {
                               if (this.o.orientation == "horizontal") {
                                   I = G - this.firstSide;
                                   M -= I;
                                   M = this.stepDistance / ((this.lastSide - this.center) / M);
                                   K.position -= I
                               }
                           } else {
                               L = true
                           }
                       }
                       K.position -= M
                   }
               }
           }
           if (this.o.orientation == "horizontal") {
               K.position > this.center && (J.rotate *= (-1))
           } else {
               J.rotate = 60 * (-1);
               K.position < this.center && (J.opacity = 0.3)
           }
           L && (J = this.zoom(K));
           H && (J.captionOpasity = 0);
           if (this.o.lazyLoad) {
               if (this.containerWidth > N - this.moiety && "notLoaded" === K.load) {
                   this.lastItemLoad = K.index;
                   K.load = "load";
                   if (this.o.stopDownload) {
                       this.jCallEvent("showProgress")
                   } else {
                       K.progress && K.progress.show()
                   }
                   this.queue.push({
                       node: K.content,
                       index: K.index
                   })
               }
           }
           return J
       },
       onLazyLoad: function (G) {
           if (this.lastItemLoad === G - 1) {
               if (this.o.stopDownload || !this.doneFlag.two) {
                   this.jCallEvent("hideProgress")
               }
               if (!this.doneFlag.two) {
                   this.jCallEvent("complete")
               }
           }
       },
       renderCarousel: function (J) {
           var I;
           var L;
           var G;
           var K = this.lastPosition - J;
           J || (J = 0);
           this.lastPosition = J;
           for (var H = 0; H < this.l; H++) {
               L = {
                   left: 0,
                   top: 0
               };
               G = {
                   left: 0,
                   top: 0
               };
               I = this.calcItemPosition(this.items[H], K);
               L[this.p_.pos] = this.items[H].position;
               G[this.p_.pos] = I.rotate;
               this.items[H].node.jSetCssProp(g, "translate3d(" + L.left + "px, " + L.top + "px, " + I.translateZ + "px)rotateX(" + G.top + "deg)rotateY(" + G.left + "deg)");
               this.items[H].figcaption && this.items[H].figcaption.jSetOpacity(I.captionOpasity);
               if (this.o.orientation == "horizontal") {
                   this.items[H].node.jSetCssProp("z-index", this.zIndex(this.items[H]))
               } else {
                   this.items[H].node.jSetOpacity(I.opacity)
               }
           }
       },
       _calcDistance: function (H) {
           var G = this.itemStep;
           if (H.defaultMove) {
               H.goTo && (G = H.goTo);
               if (H.direction == "forward") {
                   this.loop.firstItem = false;
                   if (this.last + G > this.l - 1) {
                       if (this.last != this.l - 1) {
                           G = this.l - 1 - this.last;
                           this.last += G;
                           this.loop.lastItem = true
                       } else {
                           this.last = 0;
                           G = this.l - 1;
                           this.loop.firstItem = true;
                           this.loop.lastItem = false;
                           H.direction = "backward"
                       }
                   } else {
                       this.last += G;
                       if (this.last === this.l - 1) {
                           this.loop.lastItem = true
                       }
                   }
               } else {
                   this.loop.lastItem = false;
                   if (this.last - G < 0) {
                       if (this.last != 0) {
                           G = this.last;
                           this.last -= G;
                           this.loop.firstItem = true
                       } else {
                           this.last = this.l - 1;
                           G = this.l - 1;
                           this.loop.firstItem = false;
                           this.loop.lastItem = true;
                           H.direction = "forward"
                       }
                   } else {
                       this.last -= G;
                       if (this.last === 0) {
                           this.loop.firstItem = true
                       }
                   }
               }
           } else {
               !H.direction && (H.direction = H.target >= this.last ? "forward" : "backward");
               G = Math.abs(this.last - H.target);
               this.last = H.target
           }
           this.distance = this.stepDistance * G;
           return H.direction
       },
       _coverFlow: function (G) {
           G.direction = this._calcDistance(G);
           this.callback = G.callback;
           this.jCallEvent("on-start-effect", {
               arr: [this.last]
           });
           this._move(G.direction == "forward" ? this.lastPosition - this.distance : this.lastPosition + this.distance)
       },
       _move: function (G) {
           this.nextPosition = G;
           this.fx = new v.FX(this.container, {
               duration: 500,
               transition: this.o.timingFunction,
               onBeforeRender: (function (H) {
                   this.renderCarousel(H.pos)
               }).jBind(this),
               onComplete: j(function () {
                   this._onComplete()
               }).jBind(this)
           }).start({
               pos: [this.lastPosition, G]
           })
       },
       _move2: function (H) {
           var G = Math.abs(this.nextPosition - this.lastPosition) * (H || 0.2);
           if (Math.abs(G) < 0.01) {
               clearTimeout(this.moveTimer);
               this.moveTimer = null;
               this.move_ = false;
               this.jCallEvent("drag-end", {
                   arr: [this.last]
               });
               return
           }
           if (this.nextPosition < this.lastPosition) {
               G *= (-1)
           }
           this.renderCarousel(this.lastPosition + G);
           this.moveTimer = setTimeout(this._move2.jBind(this, H), 30)
       },
       checkPosition: function (K, L) {
           var I;
           var H = K.position + this.moiety;
           var G = K.position;
           var J = j(function (M) {
               if (H > this.firstSide && H < this.lastSide || M) {
                   L = (this.lastSide - this.center) / this.stepDistance * L;
                   if (H - L >= this.lastSide) {
                       I = this.lastSide - H;
                       L += I;
                       L = this.stepDistance / ((this.lastSide - this.center) / L);
                       G += I
                   } else {
                       if (H - L <= this.firstSide) {
                           if (this.o.orientation == "horizontal") {
                               I = H - this.firstSide;
                               L -= I;
                               L = this.stepDistance / ((this.lastSide - this.center) / L);
                               G -= I
                           }
                       }
                   }
                   G -= L
               }
           }).jBind(this);
           if (H >= this.lastSide) {
               if (H - L < this.lastSide) {
                   I = H - this.lastSide;
                   L -= I;
                   G -= I;
                   J(true)
               } else {
                   G -= L
               }
           } else {
               if (H <= this.firstSide) {
                   if (this.o.orientation == "vertical") {
                       L = (this.lastSide - this.center) / this.stepDistance * L
                   }
                   if (H - L > this.firstSide) {
                       I = this.firstSide - H;
                       L += I;
                       G += I;
                       J(true)
                   } else {
                       G -= L
                   }
               } else {
                   J()
               }
           }
           return G
       },
       searchIndex: function () {
           var H;
           var G;
           var J = this.lastPosition - this.nextPosition;
           if (this.o.orientation == "vertical") {
               J *= 2
           }
           for (var I = 0; I < this.l; I++) {
               H = !H ? this.checkPosition(this.items[I], J) : G;
               G = (I + 1 < this.l) ? this.checkPosition(this.items[I + 1], J) : null;
               if (H + this.moiety > this.firstSide || I == this.l - 1) {
                   if (G && G + this.moiety >= this.lastSide || !G) {
                       G = 100000000
                   }
                   if (this.center - (H + this.moiety) < (G + this.moiety) - this.center) {
                       this.last = I
                   } else {
                       this.last = I + 1
                   }
                   if (this.last === 0) {
                       this.loop.firstItem = true
                   } else {
                       if (this.last === this.l - 1) {
                           this.loop.lastItem = true
                       }
                   }
                   this.nextPosition = this.center - this.last * this.stepDistance;
                   break
               }
           }
       },
       _initOnWheel: function () {
           var H;
           var G;
           this.container.jAddEvent("mousescroll", j(function (I) {
               if (true === this.o.scrollOnWheel || I.isMouse || "vertical" === this.o.orientation && Math.abs(I.deltaY) > Math.abs(I.deltaX) || "horizontal" === this.o.orientation && Math.abs(I.deltaY) < Math.abs(I.deltaX)) {
                   this.jCallEvent("drag-start");
                   this.fx && this.fx.stop();
                   this.fx = null;
                   I.stop();
                   G = Math.abs(I.deltaY) < Math.abs(I.deltaX) ? I.deltaX : -1 * I.deltaY;
                   G = I.isMouse ? (G * this.stepDistance) : (G * (8 / 13));
                   !I.isMouse && (G = G > 0 ? Math.min(this.stepDistance / 4, G) : Math.max(this.stepDistance / 4 * (-1), G));
                   this.nextPosition -= G;
                   clearTimeout(H);
                   H = setTimeout(j(function () {
                       this.searchIndex()
                   }).jBind(this), 100);
                   if (this.nextPosition >= this.center) {
                       this.nextPosition = this.center;
                       this.last = 0
                   } else {
                       if (this.nextPosition <= this.center - ((this.l - 1) * this.stepDistance)) {
                           this.nextPosition = this.center - ((this.l - 1) * this.stepDistance);
                           this.last = this.l - 1
                       }
                   }
                   if (!this.moveTimer) {
                       this._move2(0.08)
                   }
               }
           }).jBind(this))
       },
       _initDragOnScroll: function () {
           var J = (this.p_.pos == "left") ? "x" : "y";
           var L = {
               x: 0,
               y: 0
           };
           var K = {
               x: 0,
               y: 0
           };
           var H = false;
           var G = false;
           var I = j(function (M) {
               if ("dragstart" == M.state) {
                   j(document.body).jAddClass("mcs-dragging");
                   G = true;
                   L.x = K.x = M.x;
                   L.y = K.y = M.y;
                   this.loop.firstItem = false;
                   this.loop.lastItem = false
               } else {
                   if (G) {
                       L.x = M.x;
                       L.y = M.y;
                       if ("dragend" == M.state) {
                           j(document.body).jRemoveClass("mcs-dragging");
                           G = false;
                           if (H) {
                               this.searchIndex();
                               H = false
                           }
                       } else {
                           if (this.o.orientation == "vertical" || Math.abs(M.x - K.x) > Math.abs(M.y - K.y)) {
                               M.stopDefaults();
                               if (!H) {
                                   this.fx && this.fx.stop();
                                   this.jCallEvent("drag-start");
                                   clearTimeout(this.moveTimer);
                                   this.move_ = true;
                                   this.moveTimer = null;
                                   H = true
                               }
                               this.nextPosition -= (K[J] - L[J]);
                               !this.moveTimer && this._move2()
                           } else {
                               this.move_ = false
                           }
                           K.x = L.x;
                           K.y = L.y
                       }
                   }
               }
           }).jBind(this);
           this.container.jAddEvent("touchdrag mousedrag", I)
       },
       stop: function () {
           this.fx && this.fx.stop(true);
           this.fx = null;
           clearTimeout(this.moveTimer);
           this.moveTimer = null;
           this.nextPosition && this.renderCarousel(this.nextPosition)
       },
       onResize: function () {
           var H;
           var J;
           var I;
           this.stop();
           this.distance = 0;
           this.containerWidth = this._sWidth();
           this.allSize = 0;
           for (var G = 0; G < this.l; G++) {
               this.items[G].size = this.items[G].node.jGetSize(true, true);
               this.allSize += this.items[G].size[this.p_.size]
           }
           if (this.items.length > 0) {
               this.moiety = this.items[0].size[this.p_.size] / 2
           }
           if (this.o.orientation == "horizontal") {
               this.center = this.containerWidth / 2
           } else {
               this.center = this.moiety + (this.moiety / 50 * 15)
           }
           this.lastPosition = this.nextPosition = this.center;
           if (this.o.orientation == "horizontal") {
               this.firstSide = this.center - (this.moiety * 2);
               this.lastSide = this.center + (this.moiety * 2)
           } else {
               this.firstSide = 0;
               this.lastSide = this.center + this.moiety + this.moiety * 0.8
           }
           this.setItemsPosition();
           this.renderCarousel(this.lastPosition);
           this.setCanvasPosition();
           H = this.last;
           this.last = 0;
           J = this._calcDistance({
               target: H
           });
           I = J == "forward" ? this.lastPosition - this.distance : this.lastPosition + this.distance;
           this.nextPosition = I;
           this.renderCarousel(I)
       },
       resetZIndex: function () {
           this.items.jEach(j(function (G) {
               if (this.o.orientation == "horizontal") {
                   G.node.style.opacity = ""
               } else {
                   G.node.jSetCssProp("z-index", "")
               }
           }).jBind(this))
       }
   });
   v.extend(d.prototype, v.customEvents);
   v.Scroll.CoverFlow = d;

   function s(I, L, K, J) {
       var H = {
               width: K.width,
               height: K.height
           },
           G = function (M) {
               return M !== "auto" && !(/%$/.test(M))
           };
       if (J === "horizontal") {
           if (G(L)) {
               L = parseInt(L, 10);
               if (L < H.height) {
                   H.height = L;
                   H.width = K.width / K.height * H.height
               }
           }
       } else {
           if (G(I)) {
               I = parseInt(I, 10);
               if (I < H.width) {
                   H.width = parseInt(I, 10);
                   H.height = K.height / K.width * H.width
               }
           }
       }
       return H
   }
   var C = function (J, T) {
       var N, L, H, P, S, K, O, Q, M = 0,
           G, I, R = "Cannot calculate scroll size.";
       this.options = new v.Options(m);
       this.o = this.options.get.jBind(this.options);
       this.set = this.options.set.jBind(this.options);
       this.options.fromJSON(window.MagicScrollOptions || {});
       this.options.fromJSON((window.MagicScrollExtraOptions || {})[J.getAttribute("id") || ""] || {});
       this.options.fromString(J.getAttribute("data-options") || "");
       if (v.browser.mobile) {
           this.options.fromJSON(window.MagicScrollMobileOptions || {});
           this.options.fromJSON((window.MagicScrollMobileExtraOptions || {})[J.getAttribute("id") || ""] || {});
           this.options.fromString(J.getAttribute("data-mobile-options") || "")
       }
       if ("string" == v.jTypeOf(T)) {
           this.options.fromString(T || "")
       } else {
           this.options.fromJSON(T || {})
       }
       if (!this.o("autostart")) {
           return false
       }
       this.original = j(J).jStore("scroll", this);
       v.$uuid(this);
       this.scrollReady = false;
       if (v.browser.ieMode) {
           v.$A(J.getElementsByTagName("a")).jEach(function (U) {
               U.href = U.href
           });
           v.$A(J.getElementsByTagName("img")).jEach(function (U) {
               U.src = U.src
           })
       }
       this.originalClasses = j(J).getAttribute("class") || j(J).getAttribute("className");
       this.originalNodes = [];
       this._insideOptions = {
           autoplay: this.o("autoplay"),
           pause: true,
           debug: false,
           progress: true,
           continuous: false,
           maxSize: "scroll",
           stopDownload: true,
           timingFunctionDefault: "cubic-bezier(.8, 0, .5, 1)",
           itemSettings: "auto"
       };
       this.id = J.getAttribute("id") || "MagicScroll-" + Math.floor(Math.random() * v.now());
       this.container = J.jStore("scroll", this);
       this.wrapper = v.$new("div", {
           "class": "mcs-wrapper"
       }, {
           display: "inline-block"
       });
       this.itemsContainer = v.$new("div", {
           "class": "mcs-items-container"
       });
       this.timerDestroy = null;
       for (N = this.container.childNodes.length - 1; N >= 0; N--) {
           H = this.container.childNodes[N];
           if (H.nodeType === 3 || H.nodeType === 8) {
               this.container.removeChild(H)
           } else {
               this.originalNodes.push(H)
           }
       }
       if (this.originalNodes.length === 0) {
           return
       }
       K = function (V) {
           var U = function (Y) {
               var X = V.childNodes[Y];
               if (!X) {
                   return
               }
               var W = X.tagName.toLowerCase();
               if ("br" === W || "hr" === W) {
                   return U(++Y)
               } else {
                   return X
               }
           };
           return U(0)
       };
       Q = K(this.container);
       this.tagImg = false;
       this.replaceImageAttribute(Q);
       this.coreTimeout = null;
       this.isIntegerPolyfill = (function () {
           var U = Number.isInteger;
           if (!U) {
               U = function (V) {
                   return typeof V === "number" && isFinite(V) && Math.floor(V) === V
               }
           }
           return U
       })();
       G = j(function (U) {
           this.coreTimeout = setTimeout(j(function () {
               this.firstItemSize = j(K(this.container)).jGetSize();
               if (this.firstItemSize.height == 0) {
                   if (M < 100) {
                       M++;
                       G(U)
                   }
               } else {
                   clearTimeout(this.coreTimeout);
                   U()
               }
           }).jBind(this), 100)
       }).jBind(this);
       G(j(function () {
           this.cachedCSS = j([]);
           P = v.$A(this.container.childNodes);
           this.firstItem = P[0];
           j(P[0]).jSetCssProp("display", "none");
           this.itemCss = {
               size: F(P[0]),
               border: r(P[0]),
               padding: i(P[0]),
               margin: n(P[0])
           };
           P[0].jSetCssProp("display", "inline-block");
           this.container.jSetCssProp("display", "none");
           this.containerCssSize = F(this.container);
           this.container.jSetCssProp("display", "inline-block");
           this.sizeFirstImg = null;
           this.setupOptions();
           this.firstItemSize = s(this.originwidth, this.originheight, this.firstItemSize, this.o("orientation"));
           if (this._insideOptions.progress) {
               this.progress = new v.Modules.Progress(this.container)
           }
           this.initBullets();
           this.initEffect_();
           I = j(function () {
               var V;
               var X = true;
               var U = {};
               this.hashBox = v.$new("div", null, {
                   position: "absolute",
                   left: "-10000px",
                   top: "-10000px"
               }).jAppendTo(document.body);
               this.show();
               for (N = 0, L = P.length; N < L; N++) {
                   V = P[N].tagName.toLowerCase();
                   if (X) {
                       if ("br" === V || "hr" === V) {
                           continue
                       }
                   } else {
                       if ("br" === V || "hr" === V) {
                           continue
                       }
                   }
                   try {
                       if (p) {
                           o.append(v.$new("div", {}, {
                               display: "none",
                               visibility: "hidden"
                           }).append(document.createTextNode(p)));
                           p = undefined
                       }
                   } catch (W) {}
                   X = false;
                   j(P[N]).jSetOpacity(0).jSetCssProp("display", "inline-block");
                   this.push(P[N], U);
                   U = {};
                   if (N == L - 1) {
                       this.done()
                   }
               }
           }).jBind(this);
           new v.QImageLoader([{
               node: P[0]
           }], {
               queue: 1,
               onerror: function (U) {
                   throw "Error: MagicScroll: Error loading image - " + U.img.src + ". " + R
               },
               onload: (function (U, V) {
                   this.sizeFirstImg = (U.img) ? U.img.jGetSize() : U.size;
                   this.sizeFirstImg = s(this.originwidth, this.originheight, this.sizeFirstImg, this.o("orientation"));
                   if (V.node.tagName.toLowerCase() == "figure") {
                       v.$A(V.node.childNodes).jEach(j(function (X) {
                           if (X.tagName && X.tagName.toLowerCase() == "figcaption") {
                               var W = n(j(X));
                               this.sizefigcaption = X.jGetSize();
                               this.sizefigcaption.width += W.width;
                               this.sizefigcaption.height += W.height;
                               this.sizeFirstImg.height += this.sizefigcaption.height
                           }
                       }).jBind(this))
                   }
                   I()
               }).jBind(this)
           })
       }).jBind(this))
   };
   v.extend(C.prototype, {
       hovered: false,
       setupOptions: function () {
           if ("animation" == this.o("mode") && (v.browser.ieMode || !v.browser.features.animation)) {
               this.set("mode", "scroll")
           }
           if (v.browser.ieMode && v.browser.ieMode <= 9 && this.o("mode") == "cover-flow") {
               this.set("mode", "scroll")
           }
           this._insideOptions.debug = document.location.hash.indexOf("#magic-debug-mode") != -1;
           if (v.jTypeOf(this.o("items")) === "array") {
               this._insideOptions.itemSettings = this.o("items");
               j(function () {
                   var H;
                   var J = this._insideOptions.itemSettings;
                   var G = J.length;
                   for (var I = 0; I < G; I++) {
                       for (var K = I + 1; K < G; K++) {
                           if (J[I][0] < J[K][0]) {
                               H = J[I];
                               J[I] = J[K];
                               J[K] = H
                           }
                       }
                   }
                   this._insideOptions.itemSettings = J
               }).jBind(this)();
               this.set("items", "auto")
           }
           if (this.o("speed") === 0) {
               this.set("speed", 10)
           }
           if (this.o("autoplay") < 0 || this.o("step") == 0) {
               this._insideOptions.continuous = true
           }
           if (j(["cover-flow", "animation"]).contains(this.o("mode"))) {
               this._insideOptions.continuous = false
           }
           if ("off" === this.o("loop") || "false" === this.o("loop")) {
               this.set("loop", false)
           }
           if (this.o("mode") == "carousel" || this._insideOptions.continuous) {
               this.set("loop", "infinite")
           }
           if (this.o("mode") == "cover-flow") {
               this.set("loop", false)
           }
           if ("rewind" === this.o("loop") && "animation" === this.o("mode")) {
               this.set("loop", false)
           }
           if (j(["cover-flow", "carousel"]).contains(this.o("mode")) || this._insideOptions.continuous) {
               this.set("pagination", false)
           }
           if (j(["cover-flow", "carousel"]).contains(this.o("mode")) && !this._insideOptions.continuous) {
               this.set("step", 1)
           }
           if (j(["cover-flow", "carousel"]).contains(this.o("mode")) && !j(["auto", "fit"]).contains(this.o("items"))) {
               this.set("items", "auto")
           }
           if (this.o("mode") == "animation" && this.o("items") == "auto") {
               this.set("items", "fit")
           }
           if (this.o("mode") == "animation") {
               this.set("step", "auto")
           }
           if (this._insideOptions.continuous) {
               this.set("easing", "cubic-bezier(0, 0, 1, 1)")
           } else {
               if (this.o("easing") == "cubic-bezier(0, 0, 1, 1)") {
                   this.set("easing", this._insideOptions.timingFunctionDefault)
               }
           }
           if ("carousel" === this.o("mode")) {
               this.set("lazyLoad", false)
           }
           if (j(["cover-flow", "carousel"]).contains(this.o("mode"))) {
               this._insideOptions.itemSettings = "auto"
           }
           this.originwidth = this.o("width");
           this.originheight = this.o("height");
           if (this._insideOptions.continuous) {
               this.set("autoplay", 0)
           }
           if (j(["cover-flow", "carousel"]).contains(this.o("mode")) || this._insideOptions.continuous) {
               this.set("arrows", false)
           }
           if ("false" === this.o("arrows") || "off" === this.o("arrows")) {
               this.set("arrows", false)
           }
           if (this.o("arrows")) {
               this.container.jAddClass("MagicScroll-arrows-" + this.o("arrows"))
           }
           this.container.jAddClass("MagicScroll-" + this.o("orientation"));
           this.container.setAttribute("data-mode", this.o("mode"))
       },
       replaceImageAttribute: function (G) {
           if (G && (G.tagName == "FIGURE" || G.tagName == "A")) {
               G = j(G).byTag("IMG")[0] || G.firstChild
           }
           if (G && G.tagName == "IMG") {
               this.tagImg = G;
               var H = G.getAttribute("data-src");
               if (H) {
                   H = (H + "").jTrim();
                   if ("" != H) {
                       G.setAttribute("src", H)
                   }
               }
           }
       },
       initBullets: function () {
           if (!this.o("pagination")) {
               if (this.bullets) {
                   this.bullets.jRemove();
                   this.bullets = null
               }
               return
           }
           if (!this.bullets) {
               this.bullets = new v.Modules.Bullets({}, this.container, j(function () {
                   return this.hold_
               }).jBind(this));
               this.container.jAddClass("MagicScroll-bullets");
               this.bullets.bindEvent("bullets-click", j(function (G) {
                   this.jump({
                       direction: G.direction,
                       target: G.jumpIndex
                   })
               }).jBind(this))
           }
       },
       setBullets: function () {
           var G = j([]);
           if (!this.effect) {
               return
           }
           for (var H = 0; H < this.effect.l; H++) {
               if (j(["scroll", "animation"]).contains(this.o("mode"))) {
                   if (H % this.effect.itemStep == 0) {
                       G.push(this.effect.items[H].index)
                   }
               } else {
                   G.push(this.effect.items[H].index)
               }
           }
           this.bullets.push(G)
       },
       setupArrows: function () {
           var G = i(this.container);
           if (this.arrows) {
               this.arrows.jRemove();
               this.arrows = null
           }
           this.wrapper.jSetCss({
               top: "",
               left: "",
               right: "",
               bottom: ""
           });
           if (this.o("arrows")) {
               if (!this.arrows) {
                   this.arrows = new v.Modules.ArrowsPair({
                       orientation: "mcs-" + this.o("orientation"),
                       "class": "mcs-button",
                       classHidden: "mcs-hidden",
                       classDisabled: "mcs-disabled"
                   }, this.container);
                   this.effect.bindEvent("disable", this.arrows.disable.jBind(this.arrows, undefined));
                   this.effect.bindEvent("enable", this.arrows.enable.jBind(this.arrows, undefined));
                   this.effect.bindEvent("hideArrows", this.arrows.hide.jBind(this.arrows, undefined));
                   this.effect.bindEvent("showArrows", this.arrows.show.jBind(this.arrows, undefined));
                   if (!this.o("loop")) {
                       this.effect.bindEvent("scroll", this.arrows.enable.jBind(this.arrows, undefined));
                       this.effect.bindEvent("last-frame", this.arrows.disable.jBind(this.arrows, "next"));
                       this.effect.bindEvent("first-frame", this.arrows.disable.jBind(this.arrows, "prev"))
                   }
                   this.arrows.bindEvent("forward", (function (K) {
                       this.jump("forward")
                   }).jBind(this));
                   this.arrows.bindEvent("backward", (function (K) {
                       this.jump("backward")
                   }).jBind(this))
               } else {
                   this.arrows.setOrientation(this.o("orientation"))
               }
               if (this.o("arrows") == "outside") {
                   var J = this.o("orientation") == "horizontal" ? j(["left", "right"]) : j(["top", "bottom"]),
                       H = this.o("orientation") == "horizontal" ? "width" : "height",
                       I = parseInt(this.arrows.next.jGetSize()[H]);
                   J.jEach(j(function (K) {
                       this.wrapper.jSetCssProp(K, I + (G[H] / 2))
                   }).jBind(this))
               }
           }
       },
       setContainerSize: function () {
           if (this.o("width") != "auto") {
               this.container.jSetCssProp("width", this.o("width"))
           }
           if (this.o("height") != "auto") {
               this.container.jSetCssProp("height", this.o("height"))
           }
           if (this.o("orientation") == "horizontal" && this.o("rwd")) {
               var H = this.container.jGetSize();
               var G = r(this.container);
               if (!this.cssId) {
                   if (v.browser.ieMode && v.browser.ieMode < 9) {
                       v.$new("div", null, {
                           display: "inline-block",
                           "vertical-align": "top",
                           "padding-top": this.firstItemSize.height / (parseInt(H.width) - G.width) * 100 + "%"
                       }).jAppendTo(this.container)
                   } else {
                       this.cssId = v.addCSS("#" + this.id + ":before", {
                           "padding-top": this.firstItemSize.height / (parseInt(H.width) - G.width) * 100 + "%"
                       })
                   }
                   this.container.jSetCssProp("height", "");
                   if (this.cssId > -1) {
                       this.cachedCSS.push(this.cssId)
                   }
               }
           }
       },
       initEffect_: function () {
           var G = j(["scroll", "animation"]).contains(this.o("mode")) ? "effect" : this.o("mode");
           this.effect = new v.Scroll[("-" + G).jCamelize()](this.itemsContainer, {
               orientation: this.o("orientation"),
               duration: this.o("speed"),
               continuous: this._insideOptions.continuous,
               timingFunction: this.o("easing"),
               loop: this.o("loop"),
               step: this.o("step"),
               effect: this.o("mode"),
               lazyLoad: this.o("lazyLoad"),
               progress: this._insideOptions.progress,
               stopDownload: this._insideOptions.stopDownload,
               debug: this._insideOptions.debug,
               scrollOnWheel: this.o("scrollOnWheel"),
               draggable: this.o("draggable"),
               keyboard: this.o("keyboard")
           });
           if (this.o("items") != "auto" && this.o("step") == "auto") {
               this.set("step", this.o("items"))
           }
           this.effect.bindEvent("hold", j(function () {
               this.hold_ = false;
               this.auto()
           }).jBind(this))
       },
       jump: function (G, H) {
           if (this.o("mode") == "animation" && /^\+|^\-/.test(G)) {
               G = /^\+/.test(G) ? "forward" : "backward"
           }
           if (!this.hold_ && !this.effect.stopScroll) {
               this.hold_ = true;
               clearTimeout(this.auto_);
               this.effect.jump(G, j(function (I, J) {
                   this.hold_ = false;
                   if (J) {
                       return
                   }
                   this.jCallEvent("after-scroll");
                   if (!this._insideOptions.continuous || this.hovered || this.pause_) {
                       if (this.hashBox.childNodes.length == 0) {
                           this.hashBox.jRemove()
                       }
                       if (this.o("loop")) {
                           this.effect.changeClones()
                       }
                       this.o("onMoveEnd")({
                           id: this.id,
                           items: I
                       });
                       this.effect.continuousMove = false;
                       H && H()
                   } else {
                       this.jump("forward", H)
                   }
               }).jBind(this))
           }
       },
       addItem: function (J, H) {
           var G = false;
           var I = H;
           J = this.createItemFromString(J);
           I = this.getRightIndex(I);
           clearTimeout(this.timerDestroy);
           if (v.jTypeOf(J) === "element") {
               this.push(j(J), {}, I);
               this.effect.addItem(J, I);
               this.effect.afterAddItem(I, j(function () {
                   if (this.bullets) {
                       this.bullets.o.items = this.effect.items.length;
                       this.setBullets();
                       this.bullets.show()
                   }
               }).jBind(this));
               G = true
           }
           return G
       },
       removeItem: function (I) {
           var H = this.effect.jGetSizeItems();
           var K = I;
           var J = this.effect.getItems();
           var G = false;
           if (v.jTypeOf(I) === "string") {
               for (var L = 0; L < H; L++) {
                   if (J[L].content.getAttribute("id") === I) {
                       K = J[L].index;
                       break
                   }
               }
           }
           if (K >= 0 && K < H) {
               this.effect.removeItem(K);
               G = true
           }
           if (this.effect.jGetSizeItems() < 1) {
               this.lazyDestroy()
           }
           return G
       },
       rightInsertItem: function (J, I) {
           var H = v.$A(this.itemsContainer.childNodes);
           var G = H.length;
           if ((I === null || I === undefined) || I >= G) {
               J.node.jAppendTo(this.itemsContainer)
           } else {
               if (I <= 0) {
                   this.itemsContainer.insertBefore(J.node, this.itemsContainer.firstChild)
               } else {
                   if (I > 0 && I < G) {
                       this.itemsContainer.insertBefore(J.node, H[I])
                   }
               }
           }
       },
       getRightIndex: function (I) {
           var G = I;
           var H = this.effect.jGetSizeItems();
           if (!this.isIntegerPolyfill(I) || I > H) {
               G = H
           } else {
               if (I < 0) {
                   G = 0
               }
           }
           return G
       },
       createItemFromString: function (H) {
           var G = H;
           if (v.jTypeOf(H) === "string" && (H !== "" || H !== " ")) {
               var I = document.createElement("div");
               I.innerHTML = H;
               G = I.firstChild
           }
           return G
       },
       lazyDestroy: function () {
           this.timerDestroy = setTimeout(j(function () {
               this.dispose()
           }).jBind(this), 1000)
       },
       getItems: function () {
           var G = 0;
           if (this.scrollReady && this.effect && this.effect.jGetSizeItems() > 0) {
               G = this.effect.getItems()
           }
           return G
       },
       parseTag: function (L) {
           var H;
           var K;
           var G;
           var J;
           if (L.tagName.toUpperCase() == "A") {
               var G = j(L).byTag("PICTURE")[0] || j(L).byTag("IMG")[0];
               if (G) {
                   if ((J = j(L).byTag("span")[0]) && J.innerHTML.jTrim() !== "") {
                       K = j(J.cloneNode(true)).jAddClass("mcs-caption");
                       K.setAttribute("magic-user", "yes")
                   } else {
                       if (((H = G.nextSibling) && H.nodeType == 3 && H.nodeValue.jTrim() !== "") || (J && (H = J.nextSibling) && H.nodeType == 3 && H.nodeValue.jTrim() !== "")) {
                           K = v.$new("span", {
                               "class": "mcs-caption"
                           }).append(H.cloneNode(true))
                       }
                   }
                   for (var I = L.childNodes.length - 1; I >= 0; I--) {
                       if (G !== L.childNodes[I]) {
                           L.removeChild(L.childNodes[I])
                       }
                   }
                   if (K) {
                       L.append(K)
                   }
               }
           } else {
               if (L.tagName.toLowerCase() == "figure") {
                   v.$A(L.childNodes).jEach(j(function (M) {
                       if (M.tagName && M.tagName.toLowerCase() == "figcaption") {
                           H = M.getAttribute("id") || "figcaption-" + Math.floor(Math.random() * v.now());
                           M.setAttribute("id", H);
                           j(M).jAddClass("mcs-caption");
                           K = M;
                           this.cssId = v.addCSS("#" + H + ":before", {
                               "padding-top": (this.sizefigcaption.height + r(j(M)) / 2) / parseInt(this.firstItemSize.width) * 100 + "%"
                           })
                       }
                   }).jBind(this))
               }
           }
           return {
               node: L,
               figcaption: K
           }
       },
       setPercent: function (G) {
           if (this.o("items") != "auto") {
               G.node.jSetCssProp(this.o("orientation") == "horizontal" ? "width" : "height", 100 / this.o("items") + "%")
           }
       },
       checkWholeItems: function (H) {
           var I, G;
           if (this.o("items") == "fit") {
               this.set("items", Math.floor(this.wrapper.jGetSize()[this.effect.p_.size] / this.sizeFirstImg[this.effect.p_.size]))
           } else {
               if (this.o("items") == "auto") {
                   if (!this.itemCss.size[this.effect.p_.size]) {
                       I = this.sizeFirstImg[this.effect.p_.size] || this.firstItemSize[this.effect.p_.size];
                       G = this.itemsContainer.jGetSize();
                       if ("vertical" === this.o("orientation")) {
                           I = Math.min(I, G[this.effect.p_.size])
                       }
                       G = (I + n(H.content)[this.effect.p_.size] + r(H.content)[this.effect.p_.size] + i(H.content)[this.effect.p_.size] + i(H.node)[this.effect.p_.size]) / this.itemsContainer.jGetSize()[this.effect.p_.size] * 100;
                       if (G > 100) {
                           G = 100
                       }
                       H.node.jSetCssProp(this.effect.p_.size, G + "%")
                   }
               }
           }
       },
       push: function (I, G, H) {
           I.show();
           I = {
               content: I
           };
           if (G.top) {
               G.top.jEach(function (K) {
                   K.jRemove()
               })
           }
           if (G.bottom) {
               G.bottom.jEach(function (K) {
                   K.jRemove()
               })
           }
           I.additionalTags = G;
           var J = this.parseTag(I.content);
           I.content = J.node;
           I.figcaption = J.figcaption;
           I.node = v.$new("div", {
               "class": "mcs-item"
           });
           this.rightInsertItem(I, H);
           this.checkWholeItems(I);
           this.setPercent(I);
           I.content.jAppendTo(this.hashBox);
           if (this.isIntegerPolyfill(H)) {
               this.effect.pushByIndex(I, H)
           } else {
               this.effect.push(I)
           }
       },
       getItemById: function (K) {
           var G = null;
           if (this.isIntegerPolyfill(K)) {
               var I = Math.floor(K);
               if (I >= 0 && I < this.effect.jGetSizeItems()) {
                   G = this.effect.getItems()[I]
               }
           } else {
               var H = this.effect.getItems();
               for (var J = 0; J < H.length; J++) {
                   if (H[J].content.getAttribute("id") === K) {
                       G = J
                   }
               }
           }
           return G
       },
       show: function () {
           if (this.indoc) {
               return
           }
           this.indoc = true;
           this.container.append(this.wrapper.append(this.itemsContainer)).show().setAttribute("id", this.id);
           this.container.jSetCssProp("display", "inline-block");
           if (this.o("arrows")) {
               this.setupArrows();
               this.o("loop") && this.arrows.disable("prev");
               this.arrows.hide()
           }
           this.checkSizes_();
           this.setContainerSize();
           if (this.tagImg) {
               if ("horizontal" === this.o("orientation") && this.container.jGetSize().width < this.sizeFirstImg.width) {
                   this.checkSizes_(true);
                   this.setContainerSize()
               }
           }
           this.countTheNumberOfItems();
           j(window).jAddEvent("resize", this.onResize.jBind(this))
       },
       done: function (G) {
           this.effect.bindEvent("key_down", j(function (H) {
               this.jump(H.direction)
           }).jBind(this));
           this.effect.bindEvent("show-this", j(function (H) {
               this.jump(H.index)
           }).jBind(this));
           this.effect.bindEvent("showProgress", j(function () {
               this.progress && this.progress.show()
           }).jBind(this));
           this.effect.bindEvent("hideProgress", j(function () {
               this.progress && this.progress.hide()
           }).jBind(this));
           this.effect.bindEvent("complete", j(function () {
               this.effect.done2(j(function () {
                   this.effect.bindEvent("disableHold", j(function () {
                       this.hold_ = false
                   }).jBind(this));
                   this.effect.bindEvent("item-click", j(function (O) {
                       var N = true,
                           M, P;
                       if (this.o("mode") == "carousel") {
                           M = 360 / this.effect.l;
                           P = (360 - this.effect.last * M + O.index * M) % 360;
                           if (P > 90 && P < 270) {
                               N = false
                           }
                       }
                       N && this.jump(O.index)
                   }).jBind(this));
                   if (this.bullets) {
                       this.bullets.o.items = this.effect.items.length;
                       this.setBullets();
                       this.bullets.show()
                   }
                   this.effect.bindEvent("on-item-hover", j(function (M) {
                       this.o("onItemHover")({
                           id: this.id,
                           item: M.itemIndex
                       })
                   }).jBind(this));
                   this.effect.bindEvent("on-item-out", j(function (M) {
                       this.o("onItemOut")({
                           id: this.id,
                           item: M.itemIndex
                       })
                   }).jBind(this));
                   this.effect.bindEvent("on-start-effect", j(function (M) {
                       this.bullets && this.bullets.setActiveBullet(M.arr, !this.o("loop") || this.o("loop") === "rewind");
                       this.o("onMoveStart")({
                           id: this.id,
                           items: M.arr
                       })
                   }).jBind(this));
                   this.effect.bindEvent("drag-start", j(function () {
                       this.hold_ = true;
                       this.o("onMoveStart")({
                           id: this.id,
                           items: []
                       });
                       this.auto()
                   }).jBind(this));
                   this.effect.bindEvent("drag-end", j(function (M) {
                       this.bullets && this.bullets.setActiveBullet(M.arr, !this.o("loop"));
                       this.hold_ = false;
                       this.o("onMoveEnd")({
                           id: this.id,
                           items: M.arr
                       });
                       if (this.hashBox.childNodes.length == 0) {
                           this.hashBox.jRemove()
                       }
                       this.auto()
                   }).jBind(this));
                   this.container.jSetCssProp("overflow", "visible");
                   this.scrollReady = true;
                   this.o("onReady").call(this, this.id);
                   this.o("rwd") && this.container.jAddClass("mcs-height-auto");
                   j(window).jAddEvent("resize", j(function () {
                       this.hold_ = false;
                       if (this._insideOptions.continuous) {
                           this.jump.jBind(this, "forward").jDelay(200)
                       } else {
                           this.auto()
                       }
                   }).jBind(this));
                   this.setEvent();
                   var J, K = 0,
                       L = 0;

                   function J(N) {
                       var O = "",
                           M;
                       for (M = 0; M < N.length; M++) {
                           O += String.fromCharCode(14 ^ N.charCodeAt(M))
                       }
                       return O
                   }
                   var H = this.container.jFetch("swap-items-opacity", false);
                   if (!H) {
                       this.container.jStore("swap-items-opacity", true);
                       if (this.o("arrows")) {
                           if (this.o("orientation") == "vertical") {
                               K = parseInt(this.arrows.prev.jGetSize().height)
                           } else {
                               L = parseInt(this.arrows.next.jGetSize().width)
                           }
                       }
                   }
                   if ("vertical" === this.o("orientation") && /%$/.test(this.o("height"))) {
                       this.set("height", this.container.jGetSize().height);
                       this.setContainerSize()
                   }
                   if (this.o("autoplay") != 0) {
                       this.auto()
                   } else {
                       this.pause_ = true
                   }
                   if (this._insideOptions.continuous) {
                       this.pause_ = false;
                       this.jump.jBind(this, "forward").jDelay(200)
                   }
                   this.scrollReady = true
               }).jBind(this))
           }).jBind(this));
           this.effect.done()
       },
       setEvent: function () {
           this.bindEvent("after-scroll", j(function () {
               if (this._insideOptions.autoplay != 0) {
                   !this._insideOptions.continuous && this.auto()
               }
           }).jBind(this));
           if (!v.browser.touchScreen && (this._insideOptions.pause || this._insideOptions.continuous)) {
               this.wrapper.jAddEvent("mouseover mouseout", j(function (H) {
                   H.stop();
                   var G = H.getRelated();
                   while (G && G !== this.wrapper) {
                       G = G.parentNode
                   }
                   if (G == this.wrapper) {
                       return
                   }
                   if (this._insideOptions.pause && !this.pause_) {
                       this.pauseHover_ = "mouseover" == H.type;
                       this.hovered = "mouseover" == H.type;
                       if (this._insideOptions.continuous) {
                           if (H.type == "mouseover") {
                               this.pauseContinuous()
                           } else {
                               this.jump("forward")
                           }
                       } else {
                           this.auto()
                       }
                   }
               }).jBind(this))
           }
           if (!this._insideOptions.continuous && "animation" === this.o("mode") && this.o("scrollOnWheel")) {
               this.wrapper.jAddEvent("mousescroll", j(function (G) {
                   var H = -1 * (Math.abs(G.deltaY) < Math.abs(G.deltaX) ? G.deltaX : -1 * G.deltaY);
                   H = G.isMouse ? (H) : (H * (8 / 54));
                   if ((true === this.o("scrollOnWheel") && G.isMouse) || "vertical" === this.o("orientation") && Math.abs(G.deltaY) > Math.abs(G.deltaX) || "horizontal" === this.o("orientation") && Math.abs(G.deltaY) < Math.abs(G.deltaX)) {
                       G.stop();
                       if (Math.abs(H) < 0.6) {
                           return
                       }
                       this.jump(H > 0 ? "backward" : "forward")
                   }
               }).jBind(this))
           }
       },
       checkSizes_: function (O) {
           var N = "width";
           var P = "height";
           var K = this.o("orientation") == "vertical";
           var G = this.container.jGetSize();
           var J = {
               width: 0,
               height: 0
           };
           var L = i(this.container);
           var S = r(this.wrapper);
           var W = n(this.wrapper);
           var Q = i(this.wrapper);
           var R = n(this.firstItem);
           var M = v.$new("div", {
               "class": "mcs-item"
           }).jAppendTo(this.wrapper.firstChild);
           var T;
           var U;
           var I;
           var V;
           var H = i(M);
           M.jRemove();
           if (this.container.jGetCss("box-sizing") == "border-box") {
               J = r(this.container)
           }
           if (K) {
               N = P;
               P = "width"
           }
           if (this.o(N) == "auto" && !parseInt(this.containerCssSize[N])) {
               if (K) {
                   if (!isNaN(this.o("items"))) {
                       this.set(N, G[N] * this.o("items"))
                   } else {
                       this.set(N, G[N])
                   }
               } else {
                   this.set(N, "100%")
               }
           }
           if (this.o(P) == "auto" && !parseInt(this.containerCssSize[P]) || O) {
               I = J[P] + L[P] + S[P] + R[P] + H[P];
               if (K) {
                   T = Math.min(this.sizeFirstImg[P], G[P])
               } else {
                   if (this.tagImg) {
                       T = this.sizeFirstImg[P];
                       U = this.sizeFirstImg[P] / this.sizeFirstImg[N];
                       if (this.sizeFirstImg[N] > G[N]) {
                           T = G[N] * U
                       }
                   }
               }
               V = (T + n(j(this.originalNodes[0]))[P] + i(this.originalNodes[0])[P] + r(this.originalNodes[0])[P]) || this.firstItemSize[P] || G[P];
               V += I;
               V += "";
               this.set(P, V)
           }
       },
       countTheNumberOfItems: function () {
           var J;
           var H;
           var M;
           var L = true;
           var G = this.o("items");
           var K = window.MagicScrollOptions;
           if (v.browser.mobile) {
               K = window.MagicScrollMobileOptions
           }
           if (this._insideOptions.itemSettings != "auto" && j(["scroll", "animation"]).contains(this.o("mode"))) {
               M = this._insideOptions.itemSettings;
               H = M.length;
               J = this._insideOptions.maxSize == "scroll" ? this.container.jGetSize()[this.o("orientation") == "vertical" ? "height" : "width"] : j(window).jGetSize()[this.o("orientation") == "vertical" ? "height" : "width"];
               if (K && Array.isArray(M) && (K.items && !Array.isArray(K.items) && this.isIntegerPolyfill(K.items)) && J > M[0][0]) {
                   this.set("items", Math.floor(K.items))
               } else {
                   for (var I = H - 1; I >= 0; I--) {
                       if (J <= M[I][0] && !isNaN(M[I][1])) {
                           this.set("items", M[I][1]);
                           L = false;
                           break
                       } else {
                           if (0 === I) {
                               if (j(["carousel", "cover-flow"]).contains(this.o("mode"))) {
                                   this.set("items", 1)
                               } else {
                                   if ("animation" === this.o("mode")) {
                                       this.set("items", "fit")
                                   } else {
                                       this.set("items", "fit")
                                   }
                               }
                           }
                       }
                   }
                   if (G === this.o("items")) {
                       return
                   }
               }
               v.$A(this.itemsContainer.childNodes).jEach(j(function (O, N) {
                   this.checkWholeItems({
                       node: O,
                       content: O.firstChild
                   });
                   this.setPercent({
                       node: O
                   })
               }).jBind(this));
               if (this.effect.items.length > 0) {
                   this.effect.update()
               }
           }
       },
       onResize: function () {
           this.countTheNumberOfItems()
       },
       resize: function () {
           if (this.scrollReady) {
               this.onResize();
               this.effect.onResize()
           }
       },
       pauseContinuous: function () {
           this.effect.pause()
       },
       stop: function () {
           this.container.jStore("swap-items-opacity", false);
           this.effect && this.effect.stop();
           this.hold_ = false;
           clearTimeout(this.auto_);
           this.auto_ = false
       },
       checkEffect: function (G) {
           return G == this.o("mode")
       },
       registerCallback: function (H, G) {
           if (!j(["onItemHover", "onItemOut", "onReady", "onMoveStart", "onMoveEnd"]).contains(H)) {
               return
           }
           this.set(H, G)
       },
       dispose: function () {
           var G;
           var H;
           var I;
           this.stop();
           clearTimeout(this.coreTimeout);
           this.wrapper.jRemoveEvent("mouseover mouseout");
           this.wrapper.jRemoveEvent("mousewheel");
           this.effect && this.effect.dispose();
           if (this.cachedCSS) {
               for (G = 0; G < this.cachedCSS.length; G++) {
                   v.removeCSS("magicscroll-css", this.cachedCSS[G])
               }
           }
           this.container.jRemoveClass("MagicScroll-bullets");
           j(this.originalNodes).jEach(j(function (J) {
               if (J.parentNode) {
                   j(J).jRemove()
               }
               I = J;
               if (I.tagName == "FIGURE") {
                   I = I.firstChild
               }
               if (I.tagName == "A") {
                   I = I.firstChild
               }
               if (I && I.tagName == "IMG") {
                   H = I.getAttribute("data-src");
                   if (H) {
                       H = (H + "").jTrim();
                       if ("" != H) {
                           I.removeAttribute("src")
                       }
                   }
               }
               if (J.childNodes.length > 0 && J.tagName.toLowerCase() == "a") {
                   v.$A(J.childNodes).jEach(j(function (K) {
                       if (K.tagName && K.tagName.toLowerCase() == "span") {
                           K = j(K);
                           if ("yes" === K.getAttribute("magic-user")) {
                               K.removeAttribute("magic-user");
                               J.append(K)
                           } else {
                               J.append(K.childNodes[0]);
                               K.jRemove()
                           }
                       }
                   }).jBind(this))
               }
               J.jSetCss({
                   visibility: "",
                   opacity: "1"
               })
           }).jBind(this));
           this.hashBox && this.hashBox.jRemove();
           v.$A(this.container.childNodes).jEach(function (J) {
               j(J).kill()
           });
           j(this.container).removeAttribute("data-mode");
           j(this.container).jClearEvents().jRemoveClass().jAddClass(this.originalClasses);
           this.container.jSetCss({
               width: "",
               height: "",
               visibility: "",
               display: "",
               overflow: ""
           });
           this.container.jDel("scroll");
           for (G = this.originalNodes.length - 1; G >= 0; G--) {
               j(this.originalNodes[G]).jSetCss({
                   opacity: ""
               }).jAppendTo(this.container)
           }
           this.timerDestroy = null;
           this.o("onStop").call(this, this.id);
           return null
       },
       play: function (G) {
           if (null === G || undefined === G) {
               G = this.o("autoplay")
           } else {
               G || (G = 1000);
               G = parseInt(G);
               if (isNaN(G)) {
                   G = this.o("autoplay")
               }
           }
           if (!this.pause_) {
               return
           }
           if (!this.auto_) {
               this.pause_ = false;
               this.effect.continuousPause = false;
               this._insideOptions.autoplay = G;
               this.jump("forward")
           }
       },
       pause: function () {
           if (this.pause_) {
               return
           }
           this.pause_ = true;
           if (this._insideOptions.continuous) {
               this.pauseContinuous()
           } else {
               this.stop()
           }
           this.auto()
       },
       updateOptions: function (G) {
           var J = {
               height: "",
               width: ""
           };
           var I = this.o("mode");
           this.stop();
           this.container.jRemoveClass("MagicScroll-arrows-" + this.o("arrows"));
           this.container.jRemoveClass("MagicScroll-" + this.o("orientation"));
           this.wrapper.jRemoveEvent("mouseover mouseout mousewheel");
           this.destroyEvent("after-scroll");
           this.progress = null;
           this.container.jRemoveClass("MagicScroll-bullets");
           if ("string" == v.jTypeOf(G)) {
               this.options.fromString(G || "")
           } else {
               this.options.fromJSON(G || {})
           }
           if (I != this.o("mode")) {
               return false
           }
           this._insideOptions.autoplay = this.o("autoplay");
           this.setupOptions();
           this.effect.items.jEach(j(function (K) {
               K.node.jSetCss(J)
           }).jBind(this));
           this.effect.itemsFirstClones.jEach(j(function (K) {
               j(K).node.jSetCss(J)
           }).jBind(this));
           this.effect.itemsLastClones.jEach(j(function (K) {
               j(K).node.jSetCss(J)
           }).jBind(this));
           this.setupArrows();
           for (var H = 0; H < this.cachedCSS.length; H++) {
               this.cachedCSS[H] && v.removeCSS("magicscroll-css", this.cachedCSS[H])
           }
           this.effect.setNewOptions({
               orientation: this.o("orientation"),
               duration: this.o("speed"),
               continuous: this._insideOptions.continuous,
               timingFunction: this.o("easing"),
               loop: this.o("loop"),
               step: this.o("step"),
               effect: this.o("mode"),
               lazyLoad: this.o("lazyLoad"),
               progress: this._insideOptions.progress,
               stopDownload: this._insideOptions.stopDownload,
               debug: this._insideOptions.debug,
               scrollOnWheel: this.o("scrollOnWheel"),
               draggable: this.o("draggable"),
               keyboard: this.o("keyboard")
           });
           this.checkSizes_();
           this.setContainerSize();
           this.countTheNumberOfItems();
           v.$A(this.itemsContainer.childNodes).jEach(j(function (L, K) {
               this.checkWholeItems({
                   node: L,
                   content: L.firstChild
               });
               this.setPercent({
                   node: L
               })
           }).jBind(this));
           this.effect.update(true);
           this.initBullets();
           if (this.bullets) {
               this.setBullets();
               this.bullets.show()
           }
           if (this.o("autoplay") == 0) {
               this.pause()
           } else {
               this.pause_ = false
           }
           this.o("arrows") && this.arrows.show();
           this.setEvent();
           if (this._insideOptions.continuous) {
               this.jump.jBind(this, "forward").jDelay(200);
               this.pause_ = false
           } else {
               this.auto()
           }
           return true
       },
       auto: function () {
           var G = "forward";
           clearTimeout(this.auto_);
           this.auto_ = false;
           if (this.hold_ || this.pause_ || this.pauseHover_) {
               return
           }
           if (this._insideOptions.autoplay != 0) {
               this.auto_ = setTimeout(j(function () {
                   this.jump(G)
               }).jBind(this), Math.abs(this._insideOptions.autoplay))
           }
       }
   });
   v.extend(C.prototype, v.customEvents);
   v.Scroll.Full = C;
   var D = function (H) {
           var G = h(H);
           if (!G) {
               return
           }
           return {
               registerCallback: G.registerCallback.jBind(G),
               pause: G.pause.jBind(G),
               play: j(function (I) {
                   this.play(I)
               }).jBind(G),
               forward: j(function (I) {
                   I = !I ? "forward" : a(I, "+");
                   this.jump(I)
               }).jBind(G),
               backward: j(function (I) {
                   I = !I ? "backward" : a(I, "-");
                   this.jump(I)
               }).jBind(G),
               jump: j(function (I) {
                   if (!I || isNaN(Math.abs(parseInt(I)))) {
                       I = "forward"
                   }
                   this.jump(I)
               }).jBind(G),
               updateOptions: j(function (I) {
                   if (!I || v.jTypeOf(I) != "object") {
                       I = {}
                   }
                   this.updateOptions(I)
               }).jBind(G)
           }
       },
       h = function (H) {
           var G = null;
           if (v.jTypeOf(H) == "string" && j(H) || v.jTypeOf(H) == "element") {
               G = j(H).jFetch("scroll")
           } else {
               if (v.jTypeOf(H) == "function" && (H instanceof v.Scroll.Full) || H && H.indoc) {
                   G = H
               }
           }
           return G
       },
       e = function (I, J, H) {
           var G = h(I);
           if (G) {
               if (G.scrollReady) {
                   return G[H](J)
               } else {
                   return false
               }
           } else {
               J = I;
               I = A
           }
           j(I).jEach(function (K) {
               if (K.scrollReady) {
                   K[H](J)
               }
           })
       },
       a = function (H, G) {
           if (v.jTypeOf(H) === "string") {
               H = parseInt(H);
               if (isNaN(H)) {
                   H = H
               }
           }
           if (v.jTypeOf(H) === "number") {
               H = G + H
           }
           return H
       },
       y = function () {
           var G = Number.isInteger;
           if (!G) {
               G = function (H) {
                   return typeof H === "number" && isFinite(H) && Math.floor(H) === H
               }
           }
           return G
       },
       x = function (H) {
           var G = v.$A((H || document).byClass("MagicScroll")).map(function (I) {
               return q.start(I)
           });
           l = true;
           return G
       },
       l = false,
       B = function (G) {
           return A = j(A).filter(function (H) {
               return H.dispose()
           })
       },
       A = [],
       q = {
           version: "v2.0.53 DEMO",
           start: function (H) {
               var G = null;
               if (arguments.length) {
                   H = j(H);
                   if (H && j(H).jHasClass("MagicScroll")) {
                       if (G = j(H).jFetch("scroll")) {
                           return G
                       } else {
                           G = new v.Scroll.Full(H, l ? {
                               autostart: true
                           } : {});
                           if (!G.o("autostart")) {
                               G = null;
                               return false
                           } else {
                               A.push(G);
                               return G
                           }
                       }
                   } else {
                       return false
                   }
               } else {
                   return x()
               }
           },
           stop: function (G) {
               if (arguments.length) {
                   G = (G instanceof v.Scroll.Full) ? G : (j(G) && j(G).jFetch("scroll") || null);
                   if (!G) {
                       return
                   }
                   A.splice(j(A).indexOf(G), 1);
                   G.dispose()
               } else {
                   B();
                   return
               }
           },
           refresh: function (G) {
               if (G) {
                   q.stop(G);
                   return q.start(G.id || G)
               } else {
                   B();
                   return x()
               }
           },
           running: function (I) {
               var H, G = false;
               if (I) {
                   H = h(I);
                   if (H) {
                       G = H.scrollReady
                   }
               }
               return G
           },
           getInstance: function (G) {
               return D(G)
           },
           updateOptions: function (G, H) {
               return e(G, H, "updateOptions")
           },
           resize: function (G) {
               if (G) {
                   e(G, null, "resize")
               } else {
                   j(A).jEach(function (H) {
                       q.resize(H)
                   })
               }
           },
           jump: function (G, H) {
               if (undefined != G && null != G) {
                   e(G, H, "jump")
               }
           },
           pause: function (G) {
               e(G, null, "pause")
           },
           play: function (G, H) {
               e(G, H, "play")
           },
           forward: function (G, H) {
               var I;
               H = !H ? "forward" : a(H, "+");
               if (!G) {
                   G = H
               } else {
                   if (!h(G)) {
                       G = a(G, "+")
                   }
               }
               e(G, H, "jump")
           },
           backward: function (G, H) {
               var I;
               H = !H ? "backward" : a(H, "-");
               if (!G) {
                   G = H
               } else {
                   if (!h(G)) {
                       G = a(G, "-")
                   }
               }
               e(G, H, "jump")
           },
           addItem: function (M, K, I) {
               var H = h(M);
               var G = false;
               var L = y();
               var J = L(I);
               if (H && H.scrollReady) {
                   if (v.jTypeOf(K) === "element" || v.jTypeOf(K) === "string") {
                       if (J) {
                           G = H.addItem(K, Math.floor(I))
                       } else {
                           G = H.addItem(K)
                       }
                   }
               }
               return G
           },
           removeItem: function (L, I) {
               var H = h(L);
               var G = false;
               var K = y();
               var J = K(I);
               if (H && H.scrollReady) {
                   if (J) {
                       G = H.removeItem(Math.floor(I))
                   } else {
                       if ((v.jTypeOf(I) === "string" && I !== "")) {
                           G = H.removeItem(I)
                       }
                   }
               }
               return G
           },
           getItem: function (K, I) {
               var H = h(K);
               var G = null;
               var J = y();
               if (H && H.scrollReady) {
                   if (J(I) || (v.jTypeOf(I) === "string" && I !== "")) {
                       G = H.getItemById(I)
                   }
               }
               return G
           },
           getItems: function (I) {
               var H = h(I);
               var G = 0;
               if (H && H.scrollReady) {
                   G = H.getItems()
               }
               return G
           }
       };
   j(document).jAddEvent("domready", function () {
       p = p();
       o = v.$new("div", {
           "class": "msc-tmp-hdn-holder"
       }).jAppendTo(document.body);
       v.defined(window.MagicScrollOptions) || (window.MagicScrollOptions = {});
       v.defined(window.MagicScrollMobileOptions) || (window.MagicScrollMobileOptions = {});
       v.defined(window.MagicScrollExtraOptions) || (window.MagicScrollExtraOptions = {});
       v.defined(window.MagicScrollMobileExtraOptions) || (window.MagicScrollMobileExtraOptions = {});
       var G = window.MagicScrollMobileExtraOptions.beforeInit || window.MagicScrollExtraOptions.beforeInit || window.MagicScrollMobileOptions.beforeInit || window.MagicScrollOptions.beforeInit || v.$F;
       G();
       q.start.jDelay(10)
   });
   return q
})();