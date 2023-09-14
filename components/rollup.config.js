// rollup.config.js

// Import rollup plugins
import { rollupPluginHTML as html } from "@web/rollup-plugin-html";
import postcss from "rollup-plugin-postcss";
import commonjs from "@rollup/plugin-commonjs";
import litcss from "rollup-plugin-lit-css";
import del from "rollup-plugin-delete";
import copy from "rollup-plugin-copy";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import minifyHTML from "rollup-plugin-minify-html-literals";
import summary from "rollup-plugin-summary";
import typescript from "@rollup/plugin-typescript";
import fs from "fs";
import svg from "rollup-plugin-svg";

const shouldClean = process.env.CLEAN_BUILD === "true";

function getAllTsFiles(dir, filelist = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    if (fs.statSync(`${dir}/${file}`).isDirectory()) {
      filelist = getAllTsFiles(`${dir}/${file}`, filelist);
    } else if (file.endsWith(".ts") && !file.endsWith(".d.ts")) {
      filelist.push(`${dir}/${file}`);
    }
  });

  return filelist;
}

const individualEntries = {};

const tsFiles = getAllTsFiles("src");
tsFiles.forEach((file) => {
  const name = file.split("/").pop().split(".")[0];
  individualEntries[name] = file;
});

const commonPlugins = (tsOutDir) => [
  resolve(),
  commonjs(),
  typescript({ compilerOptions: { outDir: tsOutDir } }),
  svg(),
  minifyHTML.default(),
  terser({
    ecma: 2020,
    module: true,
    warnings: true,
    compress: {
      drop_console: process.env.PRODUCTION_BUILD === "true",
    },
  }),
  summary(),
  copy({
    targets: [
      { src: "images/**/*", dest: tsOutDir },
      // Removed the shoelace assets copy instruction
    ],
  }),
  postcss({
    extract: "bundle.css",
    minimize: true,
  }),
  litcss({ include: ["**/*.css"] }),
];
// Configuration for individual bundles
const individualConfig = {
  input: individualEntries,
  output: {
    dir: "prod/build/bundle", // Updated the output directory here
    format: "esm",
    entryFileNames: "[name].bundle.js",
    chunkFileNames: "shared.[name].js",
  },
  plugins: commonPlugins("./prod/build/bundle"), // Updated the path here
  preserveEntrySignatures: "strict",
};

// Configuration for a single bundle
const singleBundleConfig = {
  input: "src/main.ts",
  output: {
    dir: "build/bundle",
    format: "esm",
    entryFileNames: "bundle.js",
  },
  plugins: commonPlugins("./build/bundle"),
  preserveEntrySignatures: "strict",
};

export default [individualConfig, singleBundleConfig];
