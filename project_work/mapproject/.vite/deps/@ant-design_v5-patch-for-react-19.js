"use client";
import {
  unstableSetRender
} from "./chunk-QZJRHDBR.js";
import {
  require_client
} from "./chunk-ZYXIWDHD.js";
import "./chunk-OAZAAUMI.js";
import "./chunk-6GAV2S6I.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/@ant-design/v5-patch-for-react-19/es/index.js
var import_client = __toESM(require_client());
unstableSetRender(function(node, container) {
  container._reactRoot || (container._reactRoot = (0, import_client.createRoot)(container));
  var root = container._reactRoot;
  root.render(node);
  return function() {
    return new Promise(function(resolve) {
      setTimeout(function() {
        root.unmount();
        resolve();
      }, 0);
    });
  };
});
//# sourceMappingURL=@ant-design_v5-patch-for-react-19.js.map
