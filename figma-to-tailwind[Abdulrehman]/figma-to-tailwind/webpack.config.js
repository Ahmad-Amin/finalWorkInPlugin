const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/code.js',
    output: {
        path: path.resolve(__dirname, 'src'),
        filename: 'main.js'
    },
    watch: true,
    resolve: {
        modules: [path.join(__dirname, "node_modules")],
        extensions: [".js", ".json", ".wasm"],
        fallback: {
            "fs": false,
            "os": require.resolve('os-browserify/browser'),
            "util": require.resolve("util"),
            "path": require.resolve("path-browserify"),
            "open": false 
        },
    },
}