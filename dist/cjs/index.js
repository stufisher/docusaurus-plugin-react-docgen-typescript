var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var src_exports = {};
__export(src_exports, {
  default: () => plugin
});
module.exports = __toCommonJS(src_exports);
var import_path = __toESM(require("path"));
var import_util = require("util");
var import_glob = __toESM(require("glob"));
var import_react_docgen_typescript = require("react-docgen-typescript");
const glob = (0, import_util.promisify)(import_glob.default);
const getParser = (config, options, parserOptions) => {
  if (config) {
    return (0, import_react_docgen_typescript.withCustomConfig)(config, parserOptions).parse;
  } else if (options) {
    return (0, import_react_docgen_typescript.withCompilerOptions)(options, parserOptions).parse;
  }
  return (0, import_react_docgen_typescript.withDefaultConfig)(parserOptions).parse;
};
function plugin(context, { src, global = false, route, tsConfig, compilerOptions, parserOptions }) {
  return {
    name: "docusaurus-plugin-react-docgen-typescript",
    async loadContent() {
      return getParser(
        tsConfig,
        compilerOptions,
        parserOptions
      )(
        await glob(Array.isArray(src) ? src.join(",") : src, {
          absolute: true
        })
      );
    },
    configureWebpack(config) {
      return {
        resolve: {
          alias: {
            "@docgen": import_path.default.join(
              config.resolve.alias["@generated"],
              "docusaurus-plugin-react-docgen-typescript",
              "default"
            )
          }
        }
      };
    },
    async contentLoaded({ content, actions }) {
      const { createData, setGlobalData, addRoute } = actions;
      if (global) {
        console.warn(
          "Using global data can potentially slow down your entire app. Use with care \u2764\uFE0F"
        );
        setGlobalData(content);
      } else if (route) {
        addRoute(__spreadProps(__spreadValues({}, route), {
          modules: {
            docgen: await createData("docgen.json", JSON.stringify(content))
          }
        }));
      } else {
        const processed = {};
        content.map((component) => {
          let fileName = component.displayName;
          if (component.displayName in processed) {
            console.warn(
              `Duplicate component '${component.displayName}' found (existing: ${processed[fileName][0]})`
            );
            fileName += `${processed[fileName].length}`;
            console.warn(`'${component.filePath}' will be written to '${fileName}.json'`);
          }
          createData(`${fileName}.json`, JSON.stringify(component.props));
          if (!(fileName in processed)) {
            processed[fileName] = [];
          }
          processed[fileName].push(component.filePath);
        });
      }
    }
  };
}
//# sourceMappingURL=index.js.map
