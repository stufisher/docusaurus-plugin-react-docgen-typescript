var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var useDynamicImport_exports = {};
__export(useDynamicImport_exports, {
  useDynamicImport: () => useDynamicImport
});
module.exports = __toCommonJS(useDynamicImport_exports);
var import_react = require("react");
const useDynamicImport = (name) => {
  const [props, setProps] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    let resolved = false;
    import(`@docgen/${name}.json`).then((props2) => {
      if (!resolved) {
        resolved = true;
        setProps(props2.default);
      }
    }).catch(console.error);
    return () => {
      resolved = true;
    };
  }, [name]);
  return props;
};
//# sourceMappingURL=useDynamicImport.js.map
