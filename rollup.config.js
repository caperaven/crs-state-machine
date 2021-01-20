// import { terser } from "rollup-plugin-terser";

function terser() {};

export default {
    input: "src/index.js",
    output: [
        {file: 'dist/crs-state-machine.min.js', format: 'cjs'},
        {file: 'dist/crs-state-machine.js', format: 'es'}
    ],
    plugins: [
        terser()
    ]
};