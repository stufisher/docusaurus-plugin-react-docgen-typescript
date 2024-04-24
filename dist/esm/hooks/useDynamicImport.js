import { useEffect, useState } from "react";
const useDynamicImport = (name) => {
  const [props, setProps] = useState(null);
  useEffect(() => {
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
export {
  useDynamicImport
};
//# sourceMappingURL=useDynamicImport.js.map
