import commonjs from '@rollup/plugin-commonjs';





const config = {
  input: ['lib/index.js'],
  output: {
        format: "es",
        dir: "dist",
        name: "index"
  },
   external: ["@uppy/core", "@uppy/utils/lib/Translator", "preact"],
  plugins: [commonjs()]
};

export default config;