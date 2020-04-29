module.exports = require("babel-jest").createTransformer({
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
        ["@babel/plugin-proposal-class-properties", { "loose": true }],
        ["@babel/plugin-transform-react-jsx", { "pragma": "createElement" }]
    ]
});
