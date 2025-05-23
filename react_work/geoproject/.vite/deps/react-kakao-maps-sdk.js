"use client";
import {
  require_react_dom
} from "./chunk-WZVU6G5Y.js";
import {
  __commonJS,
  __publicField,
  __toESM,
  require_react
} from "./chunk-Q462PRL3.js";

// node_modules/react/cjs/react-jsx-runtime.development.js
var require_react_jsx_runtime_development = __commonJS({
  "node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
    "use strict";
    (function() {
      function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type)
          return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_ACTIVITY_TYPE:
            return "Activity";
        }
        if ("object" === typeof type)
          switch ("number" === typeof type.tag && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), type.$$typeof) {
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_CONTEXT_TYPE:
              return (type.displayName || "Context") + ".Provider";
            case REACT_CONSUMER_TYPE:
              return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
              var innerType = type.render;
              type = type.displayName;
              type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
              return type;
            case REACT_MEMO_TYPE:
              return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
              innerType = type._payload;
              type = type._init;
              try {
                return getComponentNameFromType(type(innerType));
              } catch (x) {
              }
          }
        return null;
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        try {
          testStringCoercion(value);
          var JSCompiler_inline_result = false;
        } catch (e) {
          JSCompiler_inline_result = true;
        }
        if (JSCompiler_inline_result) {
          JSCompiler_inline_result = console;
          var JSCompiler_temp_const = JSCompiler_inline_result.error;
          var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          JSCompiler_temp_const.call(
            JSCompiler_inline_result,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            JSCompiler_inline_result$jscomp$0
          );
          return testStringCoercion(value);
        }
      }
      function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
          return "<...>";
        try {
          var name = getComponentNameFromType(type);
          return name ? "<" + name + ">" : "<...>";
        } catch (x) {
          return "<...>";
        }
      }
      function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
      }
      function UnknownOwner() {
        return Error("react-stack-top-frame");
      }
      function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config, "key").get;
          if (getter && getter.isReactWarning) return false;
        }
        return void 0 !== config.key;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
          specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            displayName
          ));
        }
        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, "key", {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
      function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        ));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
      }
      function ReactElement(type, key, self, source, owner, props, debugStack, debugTask) {
        self = props.ref;
        type = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          props,
          _owner: owner
        };
        null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
          enumerable: false,
          get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: null
        });
        Object.defineProperty(type, "_debugStack", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
      }
      function jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children)
          if (isStaticChildren)
            if (isArrayImpl(children)) {
              for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)
                validateChildKeys(children[isStaticChildren]);
              Object.freeze && Object.freeze(children);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
          children = getComponentNameFromType(type);
          var keys = Object.keys(config).filter(function(k) {
            return "key" !== k;
          });
          isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
          didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error(
            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
            isStaticChildren,
            children,
            keys,
            children
          ), didWarnAboutKeySpread[children + isStaticChildren] = true);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
          maybeKey = {};
          for (var propName in config)
            "key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(
          maybeKey,
          "function" === typeof type ? type.displayName || type.name || "Unknown" : type
        );
        return ReactElement(
          type,
          children,
          self,
          source,
          getOwner(),
          maybeKey,
          debugStack,
          debugTask
        );
      }
      function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
      }
      var React23 = require_react(), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
      Symbol.for("react.provider");
      var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React23.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
      };
      React23 = {
        "react-stack-bottom-frame": function(callStackForError) {
          return callStackForError();
        }
      };
      var specialPropKeyWarningShown;
      var didWarnAboutElementRef = {};
      var unknownOwnerDebugStack = React23["react-stack-bottom-frame"].bind(
        React23,
        UnknownOwner
      )();
      var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
      var didWarnAboutKeySpread = {};
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.jsx = function(type, config, maybeKey, source, self) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(
          type,
          config,
          maybeKey,
          false,
          source,
          self,
          trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
      exports.jsxs = function(type, config, maybeKey, source, self) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(
          type,
          config,
          maybeKey,
          true,
          source,
          self,
          trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
    })();
  }
});

// node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "node_modules/react/jsx-runtime.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_jsx_runtime_development();
    }
  }
});

// node_modules/react-kakao-maps-sdk/esm/components/Map.js
var import_react2 = __toESM(require_react(), 1);

// node_modules/react-kakao-maps-sdk/esm/hooks/useIsomorphicLayoutEffect.js
var import_react = __toESM(require_react(), 1);
var useIsomorphicLayoutEffect = typeof window !== "undefined" && typeof document !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect;

// node_modules/react-kakao-maps-sdk/esm/hooks/useKakaoEvent.js
var useKakaoEvent = (target, type, callback) => {
  useIsomorphicLayoutEffect(() => {
    if (!target || !callback) return;
    const wrapCallback = function() {
      for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
        arg[_key] = arguments[_key];
      }
      if (arg === void 0) return callback(target);
      else return callback(target, ...arg);
    };
    kakao.maps.event.addListener(target, type, wrapCallback);
    return () => {
      kakao.maps.event.removeListener(target, type, wrapCallback);
    };
  }, [target, type, callback]);
};

// node_modules/react-kakao-maps-sdk/esm/util/constants.js
var SIGNATURE = `__react-kakao-maps-sdk__`;

// node_modules/react-kakao-maps-sdk/esm/util/kakaoMapApiLoader.js
var LoaderStatus = function(LoaderStatus2) {
  LoaderStatus2[LoaderStatus2["INITIALIZED"] = 0] = "INITIALIZED";
  LoaderStatus2[LoaderStatus2["LOADING"] = 1] = "LOADING";
  LoaderStatus2[LoaderStatus2["SUCCESS"] = 2] = "SUCCESS";
  LoaderStatus2[LoaderStatus2["FAILURE"] = 3] = "FAILURE";
  return LoaderStatus2;
}({});
var DEFAULT_ID = `${SIGNATURE}_Loader`;
var _Loader = class _Loader {
  constructor(_ref) {
    __publicField(this, "callbacks", []);
    __publicField(this, "done", false);
    __publicField(this, "loading", false);
    __publicField(this, "errors", []);
    let {
      appkey,
      id = DEFAULT_ID,
      libraries = [],
      nonce,
      retries = 3,
      url = "//dapi.kakao.com/v2/maps/sdk.js"
    } = _ref;
    this.id = id;
    this.appkey = appkey;
    this.libraries = libraries;
    this.nonce = nonce;
    this.retries = retries;
    this.url = url;
    if (_Loader.instance && !_Loader.equalOptions(this.options, _Loader.instance.options)) {
      if (!_Loader.equalOptions(this.options, _Loader.instance.options)) {
        switch (_Loader.instance.status) {
          case LoaderStatus.FAILURE:
            throw new Error(`Loader must not be called again with different options. 
${JSON.stringify(this.options, null, 2)}
!==
${JSON.stringify(_Loader.instance.options, null, 2)}`);
          default:
            _Loader.instance.reset();
            _Loader.instance = this;
            break;
        }
      }
    }
    if (!_Loader.instance) {
      _Loader.instance = this;
    }
    return _Loader.instance;
  }
  get options() {
    return {
      appkey: this.appkey,
      id: this.id,
      libraries: this.libraries,
      nonce: this.nonce,
      retries: this.retries,
      url: this.url
    };
  }
  static addLoadEventLisnter(callback) {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(callback);
    }
    _Loader.loadEventCallback.add(callback);
    return callback;
  }
  static removeLoadEventLisnter(callback) {
    return _Loader.loadEventCallback.delete(callback);
  }
  load() {
    return new Promise((resolve, reject) => {
      this.loadCallback((err) => {
        if (!err) {
          resolve(window.kakao);
        } else {
          reject(err);
        }
      });
    });
  }
  get status() {
    if (this.onEvent) {
      return LoaderStatus.FAILURE;
    }
    if (this.done) {
      return LoaderStatus.SUCCESS;
    }
    if (this.loading) {
      return LoaderStatus.LOADING;
    }
    return LoaderStatus.INITIALIZED;
  }
  get failed() {
    return this.done && !this.loading && this.errors.length >= this.retries + 1;
  }
  loadCallback(fn) {
    this.callbacks.push(fn);
    this.execute();
  }
  resetIfRetryingFailed() {
    if (this.failed) {
      this.reset();
    }
  }
  reset() {
    this.deleteScript();
    this.done = true;
    this.loading = false;
    this.errors = [];
    this.onEvent = void 0;
  }
  execute() {
    this.resetIfRetryingFailed();
    if (this.done) {
      this.callback();
    } else {
      if (window.kakao && window.kakao.maps) {
        console.warn("Kakao Maps이 이미 외부 요소에 의해 로딩되어 있습니다.설정한 옵션과 일치 하지 않을 수 있으며, 이에 따른 예상치 동작이 발생할 수 있습니다.");
        window.kakao.maps.load(this.callback);
        return;
      }
      if (!this.loading) {
        this.loading = true;
        this.setScript();
      }
    }
  }
  setScript() {
    if (document.getElementById(this.id)) {
      this.callback();
    }
    const url = this.createUrl();
    const script = document.createElement("script");
    script.id = this.id;
    script.type = "text/javascript";
    script.src = url;
    script.onerror = this.loadErrorCallback.bind(this);
    script.onload = this.callback.bind(this);
    script.defer = true;
    script.async = true;
    if (this.nonce) {
      script.nonce = this.nonce;
    }
    document.head.appendChild(script);
  }
  loadErrorCallback(event) {
    this.errors.push(event);
    if (this.errors.length <= this.retries) {
      const delay = this.errors.length * 2 ** this.errors.length;
      console.log(`Failed to load Kakao Maps script, retrying in ${delay} ms.`);
      setTimeout(() => {
        this.deleteScript();
        this.setScript();
      }, delay);
    } else {
      this.done = true;
      this.loading = false;
      this.onEvent = this.errors[this.errors.length - 1];
      this.callbacks.forEach((cb) => {
        cb(this.onEvent);
      });
      this.callbacks = [];
      _Loader.loadEventCallback.forEach((cb) => {
        cb(this.onEvent);
      });
    }
  }
  createUrl() {
    let url = this.url;
    url += `?appkey=${this.appkey}`;
    if (this.libraries.length) {
      url += `&libraries=${this.libraries.join(",")}`;
    }
    url += `&autoload=false`;
    return url;
  }
  deleteScript() {
    const script = document.getElementById(this.id);
    if (script) {
      script.remove();
    }
  }
  callback() {
    kakao.maps.load(() => {
      _Loader.instance.done = true;
      _Loader.instance.loading = false;
      _Loader.instance.callbacks.forEach((cb) => {
        cb(_Loader.instance.onEvent);
      });
      _Loader.instance.callbacks = [];
      _Loader.loadEventCallback.forEach((cb) => {
        cb(_Loader.instance.onEvent);
      });
    });
  }
  static equalOptions(a, b) {
    if (a.appkey !== b.appkey) return false;
    if (a.id !== b.id) return false;
    if (a.libraries.length !== b.libraries.length) return false;
    for (let i = 0; i < a.libraries.length; ++i) {
      if (a.libraries[i] !== b.libraries[i]) return false;
    }
    if (a.nonce !== b.nonce) return false;
    if (a.retries !== b.retries) return false;
    if (a.url !== b.url) return false;
    return true;
  }
};
__publicField(_Loader, "loadEventCallback", /* @__PURE__ */ new Set());
var Loader = _Loader;

// node_modules/react-kakao-maps-sdk/esm/hooks/useKakaoMapsSetEffect.js
var useKakaoMapsSetEffect = function(target, method) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  useIsomorphicLayoutEffect(() => {
    if (!target || args.every((arg) => typeof arg === "undefined")) return;
    target[method].call(target, ...args);
  }, [target, method, ...args]);
};

// node_modules/react-kakao-maps-sdk/esm/components/Map.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var KakaoMapContext = import_react2.default.createContext(void 0);
var Map = import_react2.default.forwardRef(function Map2(_ref, ref) {
  let {
    id,
    as,
    children,
    center,
    isPanto = false,
    padding = 32,
    disableDoubleClick,
    disableDoubleClickZoom,
    draggable,
    zoomable,
    keyboardShortcuts,
    level,
    maxLevel,
    minLevel,
    mapTypeId,
    projectionId,
    scrollwheel,
    tileAnimation,
    onBoundsChanged,
    onCenterChanged,
    onClick,
    onDoubleClick,
    onDrag,
    onDragEnd,
    onDragStart,
    onIdle,
    onMaptypeidChanged,
    onMouseMove,
    onRightClick,
    onTileLoaded,
    onZoomChanged,
    onZoomStart,
    onCreate,
    ...props
  } = _ref;
  const Container = as || "div";
  const [isLoaded, setIsLoaded] = (0, import_react2.useState)(false);
  const [map, setMap] = (0, import_react2.useState)();
  const container = (0, import_react2.useRef)(null);
  useIsomorphicLayoutEffect(() => {
    const callback = Loader.addLoadEventLisnter((err) => setIsLoaded(!err));
    return () => {
      Loader.removeLoadEventLisnter(callback);
    };
  }, []);
  useIsomorphicLayoutEffect(() => {
    if (!isLoaded) return;
    const MapContainer = container.current;
    if (!MapContainer) return;
    const initalMapCenter = "lat" in center ? new kakao.maps.LatLng(center.lat, center.lng) : new kakao.maps.Coords(center.x, center.y);
    const kakaoMap = new kakao.maps.Map(MapContainer, {
      center: initalMapCenter,
      disableDoubleClick,
      disableDoubleClickZoom,
      draggable,
      keyboardShortcuts,
      level,
      mapTypeId: typeof mapTypeId === "string" ? kakao.maps.MapTypeId[mapTypeId] : mapTypeId,
      projectionId,
      scrollwheel,
      tileAnimation
    });
    setMap(kakaoMap);
    return () => {
      MapContainer.innerHTML = "";
    };
  }, [isLoaded, disableDoubleClick, disableDoubleClickZoom, tileAnimation]);
  (0, import_react2.useImperativeHandle)(ref, () => map, [map]);
  useIsomorphicLayoutEffect(() => {
    if (!map || !onCreate) return;
    onCreate(map);
  }, [map, onCreate]);
  useIsomorphicLayoutEffect(() => {
    if (!map) return;
    let prevCenter = map.getCenter();
    if (prevCenter instanceof kakao.maps.Coords) {
      prevCenter = prevCenter.toLatLng();
    }
    const centerPosition = "lat" in center ? new kakao.maps.LatLng(center.lat, center.lng) : new kakao.maps.Coords(center.x, center.y);
    if (centerPosition instanceof kakao.maps.LatLng && centerPosition.equals(prevCenter) || centerPosition instanceof kakao.maps.Coords && centerPosition.toLatLng().equals(prevCenter)) {
      return;
    }
    if (isPanto) {
      map.panTo(centerPosition, padding);
    } else {
      map.setCenter(centerPosition);
    }
  }, [map, center.lat, center.lng, center.x, center.y]);
  useKakaoMapsSetEffect(map, "setDraggable", draggable);
  useKakaoMapsSetEffect(map, "setZoomable", zoomable);
  useKakaoMapsSetEffect(map, "setKeyboardShortcuts", keyboardShortcuts);
  useKakaoMapsSetEffect(map, "setLevel", level);
  useKakaoMapsSetEffect(map, "setMapTypeId", isLoaded ? typeof mapTypeId === "string" ? kakao.maps.MapTypeId[mapTypeId] : mapTypeId : void 0);
  useKakaoMapsSetEffect(map, "setProjectionId", projectionId);
  useKakaoMapsSetEffect(map, "setMinLevel", maxLevel);
  useKakaoMapsSetEffect(map, "setMaxLevel", minLevel);
  useKakaoEvent(map, "bounds_changed", onBoundsChanged);
  useKakaoEvent(map, "center_changed", onCenterChanged);
  useKakaoEvent(map, "click", onClick);
  useKakaoEvent(map, "dblclick", onDoubleClick);
  useKakaoEvent(map, "drag", onDrag);
  useKakaoEvent(map, "dragstart", onDragStart);
  useKakaoEvent(map, "dragend", onDragEnd);
  useKakaoEvent(map, "idle", onIdle);
  useKakaoEvent(map, "maptypeid_changed", onMaptypeidChanged);
  useKakaoEvent(map, "mousemove", onMouseMove);
  useKakaoEvent(map, "rightclick", onRightClick);
  useKakaoEvent(map, "tilesloaded", onTileLoaded);
  useKakaoEvent(map, "zoom_changed", onZoomChanged);
  useKakaoEvent(map, "zoom_start", onZoomStart);
  return (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
    children: [(0, import_jsx_runtime.jsx)(Container, {
      id: id || `${SIGNATURE}_Map`,
      ...props,
      ref: container
    }), map && (0, import_jsx_runtime.jsx)(KakaoMapContext.Provider, {
      value: map,
      children
    })]
  });
});

// node_modules/react-kakao-maps-sdk/esm/components/MapMarker.js
var import_react7 = __toESM(require_react(), 1);

// node_modules/react-kakao-maps-sdk/esm/hooks/useMap.js
var import_react3 = __toESM(require_react(), 1);
var useMap = (componentName) => {
  const kakaoMap = (0, import_react3.useContext)(KakaoMapContext);
  if (!kakaoMap) {
    throw new Error(`${componentName ? componentName + " Component" : "useMap"} must exist inside Map Component!`);
  }
  return kakaoMap;
};

// node_modules/react-kakao-maps-sdk/esm/components/Marker.js
var import_react6 = __toESM(require_react(), 1);

// node_modules/react-kakao-maps-sdk/esm/components/InfoWindow.js
var import_react4 = __toESM(require_react(), 1);
var import_react_dom = __toESM(require_react_dom(), 1);
var InfoWindow = import_react4.default.forwardRef(function InfoWindow2(_ref, ref) {
  let {
    map,
    position,
    marker,
    children,
    altitude,
    disableAutoPan,
    range,
    removable,
    zIndex,
    onCreate
  } = _ref;
  const infoWindow = (0, import_react4.useMemo)(() => {
    const container2 = document.createElement("div");
    container2.style.display = "none";
    const kakaoInfoWindow = new kakao.maps.InfoWindow({
      altitude,
      disableAutoPan,
      range,
      removable,
      zIndex,
      content: container2,
      position
    });
    return kakaoInfoWindow;
  }, [disableAutoPan, removable]);
  const container = (0, import_react4.useMemo)(() => infoWindow.getContent(), [infoWindow]);
  (0, import_react4.useImperativeHandle)(ref, () => infoWindow, [infoWindow]);
  (0, import_react4.useLayoutEffect)(() => {
    infoWindow.open(map, marker);
    return () => {
      infoWindow.close();
    };
  }, [map, marker]);
  (0, import_react4.useLayoutEffect)(() => {
    if (onCreate) onCreate(infoWindow);
  }, [infoWindow, onCreate]);
  useKakaoMapsSetEffect(infoWindow, "setPosition", position);
  useKakaoMapsSetEffect(infoWindow, "setAltitude", altitude);
  useKakaoMapsSetEffect(infoWindow, "setRange", range);
  useKakaoMapsSetEffect(infoWindow, "setZIndex", zIndex);
  return import_react_dom.default.createPortal(children, container.parentElement ?? container);
});

// node_modules/react-kakao-maps-sdk/esm/components/MarkerClusterer.js
var import_react5 = __toESM(require_react(), 1);
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var KakaoMapMarkerClustererContext = import_react5.default.createContext(void 0);
var MarkerClusterer = import_react5.default.forwardRef(function MarkerClusterer2(_ref, ref) {
  let {
    onClusterclick,
    onClusterdblclick,
    onClustered,
    onClusterout,
    onClusterover,
    onClusterrightclick,
    onCreate,
    ...props
  } = _ref;
  const {
    children,
    averageCenter,
    calculator,
    clickable,
    disableClickZoom,
    gridSize,
    hoverable,
    minClusterSize,
    minLevel,
    styles,
    texts
  } = props;
  const map = useMap(`MarkerClusterer`);
  const markerClusterer = (0, import_react5.useMemo)(() => {
    if (!window.kakao.maps.MarkerClusterer) {
      console.warn("clusterer 라이브러리를 별도 로드 해야 사용 가능합니다. `https://apis.map.kakao.com/web/guide/#loadlibrary`");
      return;
    }
    return new kakao.maps.MarkerClusterer({
      averageCenter,
      calculator,
      clickable,
      disableClickZoom,
      gridSize,
      hoverable,
      minClusterSize,
      minLevel,
      styles,
      texts
    });
  }, []);
  (0, import_react5.useImperativeHandle)(ref, () => markerClusterer, [markerClusterer]);
  (0, import_react5.useLayoutEffect)(() => {
    if (!markerClusterer) return;
    markerClusterer.setMap(map);
    return () => {
      markerClusterer.setMap(null);
    };
  }, [map, markerClusterer]);
  (0, import_react5.useLayoutEffect)(() => {
    if (markerClusterer && onCreate) onCreate(markerClusterer);
  }, [markerClusterer, onCreate]);
  useKakaoMapsSetEffect(markerClusterer, "setGridSize", gridSize);
  useKakaoMapsSetEffect(markerClusterer, "setMinClusterSize", minClusterSize);
  useKakaoMapsSetEffect(markerClusterer, "setAverageCenter", averageCenter);
  useKakaoMapsSetEffect(markerClusterer, "setAverageCenter", averageCenter);
  useKakaoMapsSetEffect(markerClusterer, "setMinLevel", minLevel);
  useKakaoMapsSetEffect(markerClusterer, "setTexts", texts);
  useKakaoMapsSetEffect(markerClusterer, "setCalculator", calculator);
  useKakaoMapsSetEffect(markerClusterer, "setStyles", styles);
  useKakaoEvent(markerClusterer, "clustered", onClustered);
  useKakaoEvent(markerClusterer, "clusterclick", onClusterclick);
  useKakaoEvent(markerClusterer, "clusterover", onClusterover);
  useKakaoEvent(markerClusterer, "clusterout", onClusterout);
  useKakaoEvent(markerClusterer, "clusterdblclick", onClusterdblclick);
  useKakaoEvent(markerClusterer, "clusterrightclick", onClusterrightclick);
  if (!markerClusterer) {
    return null;
  }
  return (0, import_jsx_runtime2.jsxs)(KakaoMapMarkerClustererContext.Provider, {
    value: markerClusterer,
    children: [children, (0, import_jsx_runtime2.jsx)(MarkerClustererRedraw, {
      ...props
    })]
  });
});
var MarkerClustererRedraw = () => {
  const markerClusterer = (0, import_react5.useContext)(KakaoMapMarkerClustererContext);
  useIsomorphicLayoutEffect(() => {
    markerClusterer.redraw();
  });
  return null;
};

// node_modules/react-kakao-maps-sdk/esm/components/Marker.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
var Marker = import_react6.default.forwardRef(function Marker2(_ref, ref) {
  let {
    map,
    position,
    children,
    altitude,
    clickable,
    draggable,
    image,
    infoWindowOptions,
    onCreate,
    onClick,
    onDragEnd,
    onDragStart,
    onMouseOut,
    onMouseOver,
    opacity,
    range,
    title,
    zIndex
  } = _ref;
  const markerCluster = (0, import_react6.useContext)(KakaoMapMarkerClustererContext);
  const markerImage = (0, import_react6.useMemo)(() => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    return image && new kakao.maps.MarkerImage(image.src, new kakao.maps.Size(image.size.width, image.size.height), {
      alt: (_a = image.options) == null ? void 0 : _a.alt,
      coords: (_b = image.options) == null ? void 0 : _b.coords,
      offset: ((_c = image.options) == null ? void 0 : _c.offset) && new kakao.maps.Point((_d = image.options) == null ? void 0 : _d.offset.x, (_e = image.options) == null ? void 0 : _e.offset.y),
      shape: (_f = image.options) == null ? void 0 : _f.shape,
      spriteOrigin: ((_g = image.options) == null ? void 0 : _g.spriteOrigin) && new kakao.maps.Point((_h = image.options) == null ? void 0 : _h.spriteOrigin.x, (_i = image.options) == null ? void 0 : _i.spriteOrigin.y),
      spriteSize: ((_j = image.options) == null ? void 0 : _j.spriteSize) && new kakao.maps.Size((_k = image.options) == null ? void 0 : _k.spriteSize.width, (_l = image.options) == null ? void 0 : _l.spriteSize.height)
    });
  }, [JSON.stringify(image)]);
  const marker = (0, import_react6.useMemo)(() => {
    const kakaoMarker = new kakao.maps.Marker({
      altitude,
      clickable,
      draggable,
      image: markerImage,
      opacity,
      range,
      title,
      zIndex,
      position
    });
    return kakaoMarker;
  }, []);
  (0, import_react6.useImperativeHandle)(ref, () => marker, [marker]);
  (0, import_react6.useLayoutEffect)(() => {
    if (markerCluster) {
      markerCluster.addMarker(marker, true);
      return () => markerCluster.removeMarker(marker, true);
    }
    marker.setMap(map);
    return () => marker.setMap(null);
  }, [map, markerCluster, marker]);
  (0, import_react6.useLayoutEffect)(() => {
    if (onCreate) onCreate(marker);
  }, [marker, onCreate]);
  useKakaoMapsSetEffect(marker, "setPosition", position);
  useKakaoMapsSetEffect(marker, "setImage", markerImage);
  useKakaoMapsSetEffect(marker, "setAltitude", altitude);
  useKakaoMapsSetEffect(marker, "setClickable", clickable);
  useKakaoMapsSetEffect(marker, "setDraggable", draggable);
  useKakaoMapsSetEffect(marker, "setOpacity", opacity);
  useKakaoMapsSetEffect(marker, "setRange", range);
  useKakaoMapsSetEffect(marker, "setRange", range);
  useKakaoMapsSetEffect(marker, "setTitle", title);
  useKakaoMapsSetEffect(marker, "setTitle", title);
  useKakaoMapsSetEffect(marker, "setZIndex", zIndex);
  useKakaoEvent(marker, "click", onClick);
  useKakaoEvent(marker, "dragstart", onDragStart);
  useKakaoEvent(marker, "dragend", onDragEnd);
  useKakaoEvent(marker, "mouseout", onMouseOut);
  useKakaoEvent(marker, "mouseover", onMouseOver);
  if (children) return (0, import_jsx_runtime3.jsx)(InfoWindow, {
    position,
    map,
    marker,
    altitude: infoWindowOptions == null ? void 0 : infoWindowOptions.altitude,
    disableAutoPan: infoWindowOptions == null ? void 0 : infoWindowOptions.disableAutoPan,
    range: infoWindowOptions == null ? void 0 : infoWindowOptions.range,
    removable: infoWindowOptions == null ? void 0 : infoWindowOptions.removable,
    zIndex: infoWindowOptions == null ? void 0 : infoWindowOptions.zIndex,
    children
  });
  return null;
});

// node_modules/react-kakao-maps-sdk/esm/components/MapMarker.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
var MapMarker = import_react7.default.forwardRef(function MapMarker2(_ref, ref) {
  let {
    position,
    ...args
  } = _ref;
  const map = useMap(`MapMarker`);
  const markerPosition = (0, import_react7.useMemo)(() => {
    if ("lat" in position) {
      return new kakao.maps.LatLng(position.lat, position.lng);
    }
    return new kakao.maps.Coords(position.x, position.y).toLatLng();
  }, [position.lat, position.lng, position.x, position.y]);
  return (0, import_jsx_runtime4.jsx)(Marker, {
    map,
    position: markerPosition,
    ...args,
    ref
  });
});

// node_modules/react-kakao-maps-sdk/esm/components/MapInfoWindow.js
var import_react8 = __toESM(require_react(), 1);
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
var MapInfoWindow = import_react8.default.forwardRef(function MapInfoWindow2(_ref, ref) {
  let {
    position,
    children,
    disableAutoPan,
    removable,
    zIndex,
    onCreate
  } = _ref;
  const map = useMap(`MapInfoWindow`);
  const infoPosition = (0, import_react8.useMemo)(() => {
    return new kakao.maps.LatLng(position.lat, position.lng);
  }, [position.lat, position.lng]);
  return (0, import_jsx_runtime5.jsx)(InfoWindow, {
    disableAutoPan,
    removable,
    zIndex,
    map,
    position: infoPosition,
    onCreate,
    ref,
    children
  });
});

// node_modules/react-kakao-maps-sdk/esm/components/CustomOverlayMap.js
var import_react9 = __toESM(require_react(), 1);
var import_react_dom2 = __toESM(require_react_dom(), 1);
var CustomOverlayMap = import_react9.default.forwardRef(function CustomOverlayMap2(_ref, ref) {
  let {
    position,
    children,
    clickable,
    xAnchor,
    yAnchor,
    zIndex,
    onCreate
  } = _ref;
  const markerCluster = (0, import_react9.useContext)(KakaoMapMarkerClustererContext);
  const map = useMap(`CustomOverlayMap`);
  const overlayPosition = (0, import_react9.useMemo)(() => {
    return new kakao.maps.LatLng(position.lat, position.lng);
  }, [position.lat, position.lng]);
  const overlay = (0, import_react9.useMemo)(() => {
    const container2 = document.createElement("div");
    container2.style.display = "none";
    const KakaoCustomOverlay = new kakao.maps.CustomOverlay({
      clickable,
      xAnchor,
      yAnchor,
      zIndex,
      position: overlayPosition,
      content: container2
    });
    return KakaoCustomOverlay;
  }, [clickable, xAnchor, yAnchor]);
  const container = (0, import_react9.useMemo)(() => overlay.getContent(), [overlay]);
  (0, import_react9.useImperativeHandle)(ref, () => overlay, [overlay]);
  (0, import_react9.useLayoutEffect)(() => {
    if (!map) return;
    if (markerCluster) {
      markerCluster.addMarker(overlay, true);
    } else {
      overlay.setMap(map);
    }
    return () => {
      if (markerCluster) {
        markerCluster.removeMarker(overlay, true);
      } else {
        overlay.setMap(null);
      }
    };
  }, [map, markerCluster, overlay]);
  (0, import_react9.useLayoutEffect)(() => {
    if (onCreate) onCreate(overlay);
  }, [overlay, onCreate]);
  useKakaoMapsSetEffect(overlay, "setPosition", overlayPosition);
  useKakaoMapsSetEffect(overlay, "setZIndex", zIndex);
  return container.parentElement && import_react_dom2.default.createPortal(children, container.parentElement);
});

// node_modules/react-kakao-maps-sdk/esm/components/MapTypeControl.js
var import_react10 = __toESM(require_react(), 1);
var MapTypeControl = import_react10.default.forwardRef(function MapTypeControl2(_ref, ref) {
  let {
    position: _position = kakao.maps.ControlPosition.TOPRIGHT
  } = _ref;
  const map = useMap(`MapTypeControl`);
  const position = typeof _position === "string" ? kakao.maps.ControlPosition[_position] : _position;
  const mapTypeControl = (0, import_react10.useMemo)(() => {
    return new kakao.maps.MapTypeControl();
  }, []);
  (0, import_react10.useImperativeHandle)(ref, () => mapTypeControl, [mapTypeControl]);
  (0, import_react10.useLayoutEffect)(() => {
    map.addControl(mapTypeControl, position);
    return () => {
      map.removeControl(position);
    };
  }, [map, mapTypeControl, position]);
  return null;
});

// node_modules/react-kakao-maps-sdk/esm/components/ZoomControl.js
var import_react11 = __toESM(require_react(), 1);
var ZoomControl = import_react11.default.forwardRef(function ZoomControl2(_ref, ref) {
  let {
    position: _position = kakao.maps.ControlPosition.RIGHT
  } = _ref;
  const map = useMap(`ZoomControl`);
  const position = typeof _position === "string" ? kakao.maps.ControlPosition[_position] : _position;
  const ZoomControl3 = (0, import_react11.useMemo)(() => {
    return new kakao.maps.ZoomControl();
  }, []);
  (0, import_react11.useImperativeHandle)(ref, () => ZoomControl3, [ZoomControl3]);
  (0, import_react11.useLayoutEffect)(() => {
    map.addControl(ZoomControl3, position);
    return () => {
      map.removeControl(ZoomControl3);
    };
  }, [map, position, ZoomControl3]);
  return null;
});

// node_modules/react-kakao-maps-sdk/esm/components/MapTypeId.js
var import_react12 = __toESM(require_react(), 1);
var MapTypeId = (_ref) => {
  let {
    type: _type
  } = _ref;
  const map = useMap(`MapTypeId`);
  const type = typeof _type === "string" ? kakao.maps.MapTypeId[_type] : _type;
  (0, import_react12.useLayoutEffect)(() => {
    map.addOverlayMapTypeId(type);
    return () => {
      map.removeOverlayMapTypeId(type);
    };
  }, [map, type]);
  return null;
};

// node_modules/react-kakao-maps-sdk/esm/components/Circle.js
var import_react13 = __toESM(require_react(), 1);
var Circle = import_react13.default.forwardRef(function Circle2(_ref, ref) {
  let {
    center,
    radius,
    fillColor,
    fillOpacity,
    strokeColor,
    strokeOpacity,
    strokeStyle,
    strokeWeight,
    zIndex,
    onMouseover,
    onMouseout,
    onMousemove,
    onMousedown,
    onClick,
    onCreate
  } = _ref;
  const map = useMap(`Circle`);
  const circleCenter = (0, import_react13.useMemo)(() => {
    return new kakao.maps.LatLng(center.lat, center.lng);
  }, [center.lat, center.lng]);
  const circle = (0, import_react13.useMemo)(() => {
    return new kakao.maps.Circle({
      center: circleCenter,
      radius,
      fillColor,
      fillOpacity,
      strokeColor,
      strokeOpacity,
      strokeStyle,
      strokeWeight,
      zIndex
    });
  }, []);
  (0, import_react13.useImperativeHandle)(ref, () => circle, [circle]);
  (0, import_react13.useLayoutEffect)(() => {
    circle.setMap(map);
    return () => {
      circle.setMap(null);
    };
  }, [map, circle]);
  (0, import_react13.useLayoutEffect)(() => {
    if (onCreate) onCreate(circle);
  }, [circle, onCreate]);
  useKakaoMapsSetEffect(circle, "setPosition", circleCenter);
  useKakaoMapsSetEffect(circle, "setRadius", radius);
  useKakaoMapsSetEffect(circle, "setZIndex", zIndex);
  (0, import_react13.useLayoutEffect)(() => {
    circle.setOptions({
      fillColor,
      fillOpacity,
      strokeColor,
      strokeOpacity,
      strokeStyle,
      strokeWeight
    });
  }, [circle, fillColor, fillOpacity, strokeColor, strokeOpacity, strokeStyle, strokeWeight]);
  useKakaoEvent(circle, "mouseover", onMouseover);
  useKakaoEvent(circle, "mouseout", onMouseout);
  useKakaoEvent(circle, "mousemove", onMousemove);
  useKakaoEvent(circle, "mousedown", onMousedown);
  useKakaoEvent(circle, "click", onClick);
  return null;
});

// node_modules/react-kakao-maps-sdk/esm/components/Polyline.js
var import_react14 = __toESM(require_react(), 1);
var Polyline = import_react14.default.forwardRef(function Polyline2(_ref, ref) {
  let {
    path,
    endArrow,
    onClick,
    onMousedown,
    onMousemove,
    onMouseout,
    onMouseover,
    onCreate,
    strokeColor,
    strokeOpacity,
    strokeStyle,
    strokeWeight,
    zIndex
  } = _ref;
  const map = useMap(`Polyline`);
  const polyLinePath = (0, import_react14.useMemo)(() => {
    if (path.every((v) => v instanceof Array)) {
      return path.map((v) => {
        return v.map((p) => new kakao.maps.LatLng(p.lat, p.lng));
      });
    }
    return path.map((v) => {
      return new kakao.maps.LatLng(v.lat, v.lng);
    });
  }, [path]);
  const polyline = (0, import_react14.useMemo)(() => {
    return new kakao.maps.Polyline({
      path: polyLinePath,
      endArrow,
      strokeColor,
      strokeOpacity,
      strokeStyle,
      strokeWeight,
      zIndex
    });
  }, []);
  (0, import_react14.useImperativeHandle)(ref, () => polyline, [polyline]);
  (0, import_react14.useLayoutEffect)(() => {
    polyline.setMap(map);
    return () => polyline.setMap(null);
  }, [map, polyline]);
  (0, import_react14.useLayoutEffect)(() => {
    if (onCreate) onCreate(polyline);
  }, [polyline, onCreate]);
  (0, import_react14.useLayoutEffect)(() => {
    polyline.setOptions({
      endArrow,
      strokeColor,
      strokeOpacity,
      strokeStyle,
      strokeWeight
    });
  }, [polyline, endArrow, strokeColor, strokeOpacity, strokeStyle, strokeWeight]);
  useKakaoMapsSetEffect(polyline, "setPath", polyLinePath);
  useKakaoMapsSetEffect(polyline, "setZIndex", zIndex);
  useKakaoEvent(polyline, "mouseover", onMouseover);
  useKakaoEvent(polyline, "mouseout", onMouseout);
  useKakaoEvent(polyline, "mousemove", onMousemove);
  useKakaoEvent(polyline, "mousedown", onMousedown);
  useKakaoEvent(polyline, "click", onClick);
  return null;
});

// node_modules/react-kakao-maps-sdk/esm/components/Polygon.js
var import_react15 = __toESM(require_react(), 1);
var Polygon = import_react15.default.forwardRef(function Polygon2(_ref, ref) {
  let {
    path,
    onClick,
    onMousedown,
    onMousemove,
    onMouseout,
    onMouseover,
    onCreate,
    strokeColor,
    strokeOpacity,
    strokeStyle,
    strokeWeight,
    fillColor,
    fillOpacity,
    zIndex
  } = _ref;
  const map = useMap(`Polygon`);
  const polygonPath = (0, import_react15.useMemo)(() => {
    if (path.every((v) => v instanceof Array)) {
      return path.map((v) => {
        return v.map((p) => new kakao.maps.LatLng(p.lat, p.lng));
      });
    }
    return path.map((v) => {
      return new kakao.maps.LatLng(v.lat, v.lng);
    });
  }, [path]);
  const polygon = (0, import_react15.useMemo)(() => {
    return new kakao.maps.Polygon({
      path: polygonPath,
      fillColor,
      fillOpacity,
      strokeColor,
      strokeOpacity,
      strokeStyle,
      strokeWeight,
      zIndex
    });
  }, []);
  (0, import_react15.useImperativeHandle)(ref, () => polygon, [polygon]);
  (0, import_react15.useLayoutEffect)(() => {
    polygon.setMap(map);
    return () => polygon.setMap(null);
  }, [map, polygon]);
  (0, import_react15.useLayoutEffect)(() => {
    if (onCreate) onCreate(polygon);
  }, [polygon, onCreate]);
  (0, import_react15.useLayoutEffect)(() => {
    polygon.setOptions({
      fillColor,
      fillOpacity,
      strokeColor,
      strokeOpacity,
      strokeStyle,
      strokeWeight
    });
  }, [polygon, fillColor, fillOpacity, strokeColor, strokeOpacity, strokeStyle, strokeWeight]);
  useKakaoMapsSetEffect(polygon, "setPath", polygonPath);
  useKakaoMapsSetEffect(polygon, "setZIndex", zIndex);
  useKakaoEvent(polygon, "mouseover", onMouseover);
  useKakaoEvent(polygon, "mouseout", onMouseout);
  useKakaoEvent(polygon, "mousemove", onMousemove);
  useKakaoEvent(polygon, "mousedown", onMousedown);
  useKakaoEvent(polygon, "click", onClick);
  return null;
});

// node_modules/react-kakao-maps-sdk/esm/components/Rectangle.js
var import_react16 = __toESM(require_react(), 1);
var Rectangle = import_react16.default.forwardRef(function Rectangle2(_ref, ref) {
  let {
    bounds,
    onClick,
    onMousedown,
    onMousemove,
    onMouseout,
    onMouseover,
    onCreate,
    strokeColor,
    strokeOpacity,
    strokeStyle,
    strokeWeight,
    fillColor,
    fillOpacity,
    zIndex
  } = _ref;
  const map = useMap(`Rectangle`);
  const rectangleBounds = (0, import_react16.useMemo)(() => {
    return new kakao.maps.LatLngBounds(new kakao.maps.LatLng(bounds.sw.lat, bounds.sw.lng), new kakao.maps.LatLng(bounds.ne.lat, bounds.ne.lng));
  }, [bounds]);
  const rectangle = (0, import_react16.useMemo)(() => {
    return new kakao.maps.Rectangle({
      bounds: rectangleBounds,
      fillColor,
      fillOpacity,
      strokeColor,
      strokeOpacity,
      strokeStyle,
      strokeWeight,
      zIndex
    });
  }, []);
  (0, import_react16.useImperativeHandle)(ref, () => rectangle, [rectangle]);
  (0, import_react16.useLayoutEffect)(() => {
    rectangle.setMap(map);
    return () => rectangle.setMap(null);
  }, [map, rectangle]);
  (0, import_react16.useLayoutEffect)(() => {
    if (onCreate) onCreate(rectangle);
  }, [rectangle, onCreate]);
  (0, import_react16.useLayoutEffect)(() => {
    rectangle.setOptions({
      fillColor,
      fillOpacity,
      strokeColor,
      strokeOpacity,
      strokeStyle,
      strokeWeight
    });
  }, [rectangle, fillColor, fillOpacity, strokeColor, strokeOpacity, strokeStyle, strokeWeight]);
  useKakaoMapsSetEffect(rectangle, "setBounds", rectangleBounds);
  useKakaoMapsSetEffect(rectangle, "setZIndex", zIndex);
  useKakaoEvent(rectangle, "mouseover", onMouseover);
  useKakaoEvent(rectangle, "mouseout", onMouseout);
  useKakaoEvent(rectangle, "mousemove", onMousemove);
  useKakaoEvent(rectangle, "mousedown", onMousedown);
  useKakaoEvent(rectangle, "click", onClick);
  return null;
});

// node_modules/react-kakao-maps-sdk/esm/components/Ellipse.js
var import_react17 = __toESM(require_react(), 1);
var Ellipse = import_react17.default.forwardRef(function Ellipse2(_ref, ref) {
  let {
    center,
    rx,
    ry,
    fillColor,
    fillOpacity,
    strokeColor,
    strokeOpacity,
    strokeStyle,
    strokeWeight,
    zIndex,
    onMouseover,
    onMouseout,
    onMousemove,
    onMousedown,
    onClick,
    onCreate
  } = _ref;
  const map = useMap(`Ellipse`);
  const ellipseCenter = (0, import_react17.useMemo)(() => {
    return new kakao.maps.LatLng(center.lat, center.lng);
  }, [center.lat, center.lng]);
  const ellipse = (0, import_react17.useMemo)(() => {
    return new kakao.maps.Ellipse({
      center: ellipseCenter,
      rx,
      ry,
      fillColor,
      fillOpacity,
      strokeColor,
      strokeOpacity,
      strokeStyle,
      strokeWeight,
      zIndex
    });
  }, []);
  (0, import_react17.useImperativeHandle)(ref, () => ellipse, [ellipse]);
  (0, import_react17.useLayoutEffect)(() => {
    ellipse.setMap(map);
    return () => {
      ellipse.setMap(null);
    };
  }, [map, ellipse]);
  (0, import_react17.useLayoutEffect)(() => {
    if (onCreate) onCreate(ellipse);
  }, [ellipse, onCreate]);
  useKakaoMapsSetEffect(ellipse, "setPosition", ellipseCenter);
  useKakaoMapsSetEffect(ellipse, "setRadius", rx, ry);
  useKakaoMapsSetEffect(ellipse, "setZIndex", zIndex);
  (0, import_react17.useLayoutEffect)(() => {
    ellipse.setOptions({
      fillColor,
      fillOpacity,
      strokeColor,
      strokeOpacity,
      strokeStyle,
      strokeWeight
    });
  }, [ellipse, fillColor, fillOpacity, strokeColor, strokeOpacity, strokeStyle, strokeWeight]);
  useKakaoEvent(ellipse, "mouseover", onMouseover);
  useKakaoEvent(ellipse, "mouseout", onMouseout);
  useKakaoEvent(ellipse, "mousemove", onMousemove);
  useKakaoEvent(ellipse, "mousedown", onMousedown);
  useKakaoEvent(ellipse, "click", onClick);
  return null;
});

// node_modules/react-kakao-maps-sdk/esm/components/AbstractOverlay.js
var import_react18 = __toESM(require_react(), 1);
var AbstractOverlay = import_react18.default.forwardRef(function AbstractOverlay2(_ref, ref) {
  let {
    draw,
    onAdd,
    onRemove,
    onCreate
  } = _ref;
  const map = useMap();
  const reactAbstractOverlay = (0, import_react18.useMemo)(() => {
    class ReactAbstractOveraly extends kakao.maps.AbstractOverlay {
      constructor(draw2, onAdd2, onRemove2) {
        super();
        this.draw = draw2;
        this.onAdd = onAdd2;
        this.onRemove = onRemove2;
      }
    }
    const overlay = new ReactAbstractOveraly(draw, onAdd, onRemove);
    return overlay;
  }, [draw, onAdd, onRemove]);
  (0, import_react18.useImperativeHandle)(ref, () => reactAbstractOverlay, [reactAbstractOverlay]);
  (0, import_react18.useLayoutEffect)(() => {
    reactAbstractOverlay.setMap(map);
    return () => {
      reactAbstractOverlay.setMap(null);
    };
  }, [map, reactAbstractOverlay]);
  (0, import_react18.useLayoutEffect)(() => {
    if (onCreate) onCreate(reactAbstractOverlay);
  }, [reactAbstractOverlay, onCreate]);
  return null;
});

// node_modules/react-kakao-maps-sdk/esm/components/Roadview.js
var import_react19 = __toESM(require_react(), 1);
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
var KakaoRoadviewContext = import_react19.default.createContext(void 0);
var Roadview = import_react19.default.forwardRef(function Roadview2(_ref, ref) {
  let {
    id,
    as,
    children,
    position,
    pan,
    panoId,
    panoX,
    panoY,
    tilt,
    zoom,
    onCreate,
    onInit,
    onPanoidChange,
    onPositionChanged,
    onViewpointChange,
    onErrorGetNearestPanoId,
    ...props
  } = _ref;
  const Container = as || "div";
  const [isLoaded, setIsLoaded] = (0, import_react19.useState)(false);
  const [isLoading, setIsLoading] = (0, import_react19.useState)(true);
  const [roadview, setRoadview] = (0, import_react19.useState)();
  const container = (0, import_react19.useRef)(null);
  useIsomorphicLayoutEffect(() => {
    const callback = Loader.addLoadEventLisnter((err) => setIsLoaded(!err));
    return () => {
      Loader.removeLoadEventLisnter(callback);
    };
  }, []);
  useIsomorphicLayoutEffect(() => {
    if (!isLoaded) return;
    const RoadviewContainer = container.current;
    if (!RoadviewContainer) return;
    const kakaoRoadview = new kakao.maps.Roadview(RoadviewContainer, {
      pan,
      panoId,
      panoX,
      panoY,
      tilt,
      zoom
    });
    setRoadview(kakaoRoadview);
    return () => {
      RoadviewContainer.innerHTML = "";
    };
  }, [isLoaded, panoX, panoY, zoom]);
  (0, import_react19.useImperativeHandle)(ref, () => roadview, [roadview]);
  useIsomorphicLayoutEffect(() => {
    if (!roadview || !onCreate) return;
    onCreate(roadview);
  }, [roadview, onCreate]);
  useIsomorphicLayoutEffect(() => {
    if (!roadview || panoId || roadview.getPosition().getLat() === position.lat && roadview.getPosition().getLng() === position.lng) return;
    const newPostion = new kakao.maps.LatLng(position.lat, position.lng);
    new kakao.maps.RoadviewClient().getNearestPanoId(newPostion, position.radius, (panoId2) => {
      if (panoId2 === null && onErrorGetNearestPanoId) {
        onErrorGetNearestPanoId(roadview);
      } else {
        roadview.setPanoId(panoId2, newPostion);
      }
    });
  }, [roadview, panoId, position.lat, position.lng, position.radius, onErrorGetNearestPanoId]);
  useIsomorphicLayoutEffect(() => {
    if (!roadview || !panoId || panoId === roadview.getPanoId() || roadview.getPosition().getLat() === position.lat && roadview.getPosition().getLng() === position.lng) return;
    const newPostion = new kakao.maps.LatLng(position.lat, position.lng);
    roadview.setPanoId(panoId, newPostion);
  }, [roadview, panoId, position.lat, position.lng]);
  useIsomorphicLayoutEffect(() => {
    if (!roadview) return;
    const prevViewpoint = roadview.getViewpoint();
    if (prevViewpoint.pan === pan && prevViewpoint.tilt === tilt) return;
    if (pan) prevViewpoint.pan = pan;
    if (tilt) prevViewpoint.tilt = tilt;
    roadview.setViewpoint(prevViewpoint);
  }, [roadview, pan, tilt]);
  useKakaoEvent(roadview, "init", (target) => {
    setIsLoading(false);
    if (onInit) onInit(target);
  });
  useKakaoEvent(roadview, "panoid_changed", onPanoidChange);
  useKakaoEvent(roadview, "viewpoint_changed", onViewpointChange);
  useKakaoEvent(roadview, "position_changed", onPositionChanged);
  return (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, {
    children: [(0, import_jsx_runtime6.jsx)(Container, {
      ref: container,
      id: id || `${SIGNATURE}_Roadview`,
      ...props
    }), roadview && !isLoading && (0, import_jsx_runtime6.jsx)(KakaoRoadviewContext.Provider, {
      value: roadview,
      children
    })]
  });
});

// node_modules/react-kakao-maps-sdk/esm/components/CustomOverlayRoadview.js
var import_react21 = __toESM(require_react(), 1);
var import_react_dom3 = __toESM(require_react_dom(), 1);

// node_modules/react-kakao-maps-sdk/esm/hooks/useRoadview.js
var import_react20 = __toESM(require_react(), 1);
var useRoadview = (componentName) => {
  const kakaoRoadview = (0, import_react20.useContext)(KakaoRoadviewContext);
  if (!kakaoRoadview) {
    throw new Error(`${componentName ? componentName + " Component" : "useRoadview"} must exist inside Roadview Component!`);
  }
  return kakaoRoadview;
};

// node_modules/react-kakao-maps-sdk/esm/components/CustomOverlayRoadview.js
var CustomOverlayRoadview = import_react21.default.forwardRef(function CustomOverlayRoadview2(_ref, ref) {
  let {
    position,
    children,
    clickable,
    xAnchor,
    yAnchor,
    zIndex,
    altitude,
    range,
    onCreate
  } = _ref;
  const roadview = useRoadview(`CustomOverlayRoadview`);
  const overlayPosition = (0, import_react21.useMemo)(() => {
    if ("lat" in position) {
      return new kakao.maps.LatLng(position.lat, position.lng);
    }
    return new kakao.maps.Viewpoint(position.pan, position.tilt, position.zoom, position.panoId);
  }, [
    /* eslint-disable @typescript-eslint/ban-ts-comment */
    /* @ts-ignore */
    position.lat,
    /* @ts-ignore */
    position.lng,
    /* @ts-ignore */
    position.pan,
    /* @ts-ignore */
    position.tilt,
    /* @ts-ignore */
    position.zoom,
    /* @ts-ignore */
    position.panoId
    /* eslint-enable @typescript-eslint/ban-ts-comment */
  ]);
  const overlay = (0, import_react21.useMemo)(() => {
    const container2 = document.createElement("div");
    container2.style.display = "none";
    const KakaoCustomOverlay = new kakao.maps.CustomOverlay({
      clickable,
      xAnchor,
      yAnchor,
      zIndex,
      position: overlayPosition,
      content: container2
    });
    return KakaoCustomOverlay;
  }, [clickable, xAnchor, yAnchor]);
  const container = (0, import_react21.useMemo)(() => overlay.getContent(), [overlay]);
  (0, import_react21.useImperativeHandle)(ref, () => overlay, [overlay]);
  (0, import_react21.useLayoutEffect)(() => {
    if (!roadview) return;
    overlay.setMap(roadview);
    return () => {
      overlay.setMap(null);
    };
  }, [overlay, roadview]);
  (0, import_react21.useLayoutEffect)(() => {
    if (onCreate) onCreate(overlay);
  }, [overlay, onCreate]);
  useKakaoMapsSetEffect(overlay, "setPosition", overlayPosition);
  useKakaoMapsSetEffect(overlay, "setZIndex", zIndex);
  useKakaoMapsSetEffect(overlay, "setAltitude", altitude);
  useKakaoMapsSetEffect(overlay, "setRange", range);
  return container.parentElement && import_react_dom3.default.createPortal(children, container.parentElement);
});

// node_modules/react-kakao-maps-sdk/esm/components/RoadviewMarker.js
var import_react22 = __toESM(require_react(), 1);
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
var RoadviewMarker = import_react22.default.forwardRef(function RoadviewMarker2(_ref, ref) {
  let {
    position,
    ...args
  } = _ref;
  const roadview = useRoadview(`RoadviewMarker`);
  const markerPosition = (0, import_react22.useMemo)(() => {
    if ("lat" in position) {
      return new kakao.maps.LatLng(position.lat, position.lng);
    }
    if ("x" in position) {
      return new kakao.maps.Coords(position.x, position.y).toLatLng();
    }
    return new kakao.maps.Viewpoint(position.pan, position.tilt, position.zoom, position.panoId);
  }, [
    // @ts-ignore
    position.lat,
    // @ts-ignore
    position.lng,
    // @ts-ignore
    position.x,
    // @ts-ignore
    position.y,
    // @ts-ignore
    position.pan,
    // @ts-ignore
    position.tilt,
    // @ts-ignore
    position.zoom,
    // @ts-ignore
    position == null ? void 0 : position.panoId
  ]);
  return (0, import_jsx_runtime7.jsx)(Marker, {
    map: roadview,
    position: markerPosition,
    ...args,
    ref
  });
});

// node_modules/react-kakao-maps-sdk/esm/components/RoadviewInfoWindow.js
var import_react23 = __toESM(require_react(), 1);
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
var RoadviewInfoWindow = import_react23.default.forwardRef(function RoadviewInfoWindow2(_ref, ref) {
  let {
    position,
    children,
    altitude,
    disableAutoPan,
    range,
    removable,
    zIndex,
    onCreate
  } = _ref;
  const roadview = useRoadview(`RoadviewInfoWindow`);
  const infoPosition = (0, import_react23.useMemo)(() => {
    if ("lat" in position) {
      return new kakao.maps.LatLng(position.lat, position.lng);
    }
    return new kakao.maps.Viewpoint(position.pan, position.tilt, position.zoom, position.panoId);
  }, [
    // @ts-ignore
    position.lat,
    // @ts-ignore
    position.lng,
    // @ts-ignore
    position.pan,
    // @ts-ignore
    position.tilt,
    // @ts-ignore
    position.zoom,
    // @ts-ignore
    position.panoId
  ]);
  return (0, import_jsx_runtime8.jsx)(InfoWindow, {
    altitude,
    disableAutoPan,
    range,
    removable,
    zIndex,
    map: roadview,
    position: infoPosition,
    onCreate,
    ref,
    children
  });
});

// node_modules/react-kakao-maps-sdk/esm/components/DrawingManager.js
var import_react24 = __toESM(require_react(), 1);
var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
var DrawingManagerContext = import_react24.default.createContext(void 0);
function useDrawingManagerEvent(target, type, callback) {
  (0, import_react24.useLayoutEffect)(() => {
    if (!target || !callback) return;
    const wrapCallback = function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (AbortSignal === void 0) return callback(target);
      else return callback(target, ...args);
    };
    target.addListener(type, wrapCallback);
  }, [callback, target, type]);
}
var DrawingManager = import_react24.default.forwardRef(function DrawingManager2(_ref, ref) {
  let {
    arrowOptions,
    circleOptions,
    ellipseOptions,
    markerOptions,
    polygonOptions,
    polylineOptions,
    rectangleOptions,
    drawingMode,
    guideTooltip,
    onSelect,
    onDrawstart,
    onDraw,
    onDrawend,
    onDrawnext,
    onCancle,
    onRemove,
    onStateChanged,
    onCreate,
    children
  } = _ref;
  const map = useMap("Toolbox");
  const drawingManager = (0, import_react24.useMemo)(
    () => {
      if (!window.kakao.maps.drawing) {
        console.warn("drawing 라이브러리를 별도 로드 해야 사용 가능합니다. `https://apis.map.kakao.com/web/guide/#loadlibrary`");
        return;
      }
      return new kakao.maps.drawing.DrawingManager({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        map,
        drawingMode,
        guideTooltip,
        arrowOptions,
        circleOptions,
        ellipseOptions,
        markerOptions,
        polygonOptions,
        polylineOptions,
        rectangleOptions
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  (0, import_react24.useImperativeHandle)(ref, () => drawingManager, [drawingManager]);
  (0, import_react24.useLayoutEffect)(() => {
    drawingManager && onCreate && onCreate(drawingManager);
  }, [drawingManager, onCreate]);
  useDrawingManagerEvent(drawingManager, "select", onSelect);
  useDrawingManagerEvent(drawingManager, "drawstart", onDrawstart);
  useDrawingManagerEvent(drawingManager, "draw", onDraw);
  useDrawingManagerEvent(drawingManager, "drawend", onDrawend);
  useDrawingManagerEvent(drawingManager, "drawnext", onDrawnext);
  useDrawingManagerEvent(drawingManager, "cancel", onCancle);
  useDrawingManagerEvent(drawingManager, "remove", onRemove);
  useDrawingManagerEvent(drawingManager, "state_changed", onStateChanged);
  if (!drawingManager) return null;
  return (0, import_jsx_runtime9.jsx)(DrawingManagerContext.Provider, {
    value: drawingManager,
    children
  });
});

// node_modules/react-kakao-maps-sdk/esm/components/Toolbox.js
var import_react25 = __toESM(require_react(), 1);
var Toolbox = import_react25.default.forwardRef(function Toolbox2(_ref, ref) {
  let {
    position: _position = kakao.maps.ControlPosition.TOP
  } = _ref;
  const position = typeof _position === "string" ? kakao.maps.ControlPosition[_position] : _position;
  const map = useMap("Toolbox");
  const drawingmanager = (0, import_react25.useContext)(DrawingManagerContext);
  if (!drawingmanager) {
    throw new Error("Toolbox must exist inside DrawingManager Component!`");
  }
  const toolbox = (0, import_react25.useMemo)(() => new kakao.maps.drawing.Toolbox({
    drawingManager: drawingmanager
  }), [drawingmanager]);
  (0, import_react25.useImperativeHandle)(ref, () => toolbox, [toolbox]);
  (0, import_react25.useLayoutEffect)(() => {
    const element = toolbox.getElement();
    map.addControl(element, position);
    return () => {
      map.removeControl(element);
    };
  }, [map, toolbox, position]);
  return null;
});

// node_modules/react-kakao-maps-sdk/esm/components/StaticMap.js
var import_react26 = __toESM(require_react(), 1);
var import_jsx_runtime10 = __toESM(require_jsx_runtime(), 1);
var StaticMap = import_react26.default.forwardRef(function StaticMap2(_ref, ref) {
  let {
    as,
    id,
    center,
    marker,
    level,
    mapTypeId,
    onCreate,
    ...props
  } = _ref;
  const Container = as || "div";
  const [isLoaded, setIsLoaded] = (0, import_react26.useState)(false);
  const [map, setMap] = (0, import_react26.useState)();
  const container = (0, import_react26.useRef)(null);
  useIsomorphicLayoutEffect(() => {
    const callback = Loader.addLoadEventLisnter((err) => setIsLoaded(!err));
    return () => {
      Loader.removeLoadEventLisnter(callback);
    };
  }, []);
  useIsomorphicLayoutEffect(() => {
    if (!isLoaded) return;
    const MapContainer = container.current;
    if (!MapContainer) return;
    const _marker = (() => {
      if (Array.isArray(marker)) {
        return marker.map((mk) => {
          return {
            ...mk,
            position: new kakao.maps.LatLng(mk.position.lat, mk.position.lng)
          };
        });
      }
      if (typeof marker === "object") {
        if (marker.position) {
          return {
            ...marker,
            position: new kakao.maps.LatLng(marker.position.lat, marker.position.lng)
          };
        }
        return marker;
      }
      return marker;
    })();
    const kakaoStaticMap = new kakao.maps.StaticMap(MapContainer, {
      center: new kakao.maps.LatLng(center.lat, center.lng),
      level,
      mapTypeId: typeof mapTypeId === "string" ? kakao.maps.MapTypeId[mapTypeId] : mapTypeId,
      marker: _marker
    });
    setMap(kakaoStaticMap);
    return () => {
      MapContainer.innerHTML = "";
    };
  }, [isLoaded, JSON.stringify(marker)]);
  (0, import_react26.useImperativeHandle)(ref, () => map, [map]);
  useIsomorphicLayoutEffect(() => {
    if (map && onCreate) onCreate(map);
  }, [map, onCreate]);
  useIsomorphicLayoutEffect(() => {
    if (map) map.setCenter(new kakao.maps.LatLng(center.lat, center.lng));
  }, [map, center.lat, center.lng]);
  useKakaoMapsSetEffect(map, "setLevel", level);
  useKakaoMapsSetEffect(map, "setMapTypeId", isLoaded ? typeof mapTypeId === "string" ? kakao.maps.MapTypeId[mapTypeId] : mapTypeId : void 0);
  return (0, import_jsx_runtime10.jsx)(Container, {
    id,
    ...props,
    ref: container
  });
});

// node_modules/react-kakao-maps-sdk/esm/hooks/useKakaoLoader.js
var import_react27 = __toESM(require_react(), 1);
var useKakaoLoader = (options) => {
  const [state, setState] = (0, import_react27.useState)([true, void 0]);
  (0, import_react27.useEffect)(
    () => {
      new Loader({
        ...options
      }).load().then(() => setState([false, void 0])).catch((error) => {
        setState([false, error]);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(options)]
  );
  return state;
};

// node_modules/react-kakao-maps-sdk/esm/hooks/useInjectKakaoMapApi.js
var useInjectKakaoMapApi = useKakaoLoader;
export {
  AbstractOverlay,
  Circle,
  CustomOverlayMap,
  CustomOverlayRoadview,
  DrawingManager,
  DrawingManagerContext,
  Ellipse,
  KakaoMapContext,
  KakaoMapMarkerClustererContext,
  KakaoRoadviewContext,
  Loader,
  LoaderStatus,
  Map,
  MapInfoWindow,
  MapMarker,
  MapTypeControl,
  MapTypeId,
  MarkerClusterer,
  Polygon,
  Polyline,
  Rectangle,
  Roadview,
  RoadviewInfoWindow,
  RoadviewMarker,
  StaticMap,
  Toolbox,
  ZoomControl,
  useInjectKakaoMapApi,
  useKakaoLoader,
  useMap,
  useRoadview
};
/*! Bundled license information:

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=react-kakao-maps-sdk.js.map
