import path from "path";
import { promisify } from "util";
import Glob from "glob";
import {
  withCustomConfig,
  withCompilerOptions,
  withDefaultConfig
} from "react-docgen-typescript";
const glob = promisify(Glob);
const getParser = (config, options, parserOptions) => {
  if (config) {
    return withCustomConfig(config, parserOptions).parse;
  } else if (options) {
    return withCompilerOptions(options, parserOptions).parse;
  }
  return withDefaultConfig(parserOptions).parse;
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
            "@docgen": path.join(
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
        addRoute({
          ...route,
          modules: {
            docgen: await createData("docgen.json", JSON.stringify(content))
          }
        });
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
export {
  plugin as default
};
//# sourceMappingURL=index.js.map
