import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default {
  input: "src/main.ts",
  plugins: [
    resolve({ extensions }),
    babel({ extensions, include: ["src/**/*"] })
  ],
  output: [
    {
      file: "dist/main.esm.js",
      format: "es"
    }
  ]
};
