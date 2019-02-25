import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import url from "rollup-plugin-url";
import external from "rollup-plugin-peer-deps-external";

import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      sourcemap: true
    }
  ],
  plugins: [
    typescript({
      clean: true,
      rollupCommonJSResolveHack: true,
      exclude: ["*.d.ts", "**/*.d.ts"]
    }),
    resolve(),
    url(),
    external()
  ]
};
