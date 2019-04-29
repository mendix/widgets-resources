module.exports = require("babel-jest").createTransformer({
    presets: ["react-native"],
    plugins: [
        "transform-es2015-modules-commonjs",
        "transform-class-properties",
        ["transform-react-jsx", { "pragma": "createElement" }]
    ]
});
