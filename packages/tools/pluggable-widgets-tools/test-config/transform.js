module.exports = require("babel-jest").createTransformer({
    presets: ["@babel/preset-env", "@babel/preset-react"],
    plugins: [
        ["@babel/plugin-proposal-class-properties", { "loose": true }],
        ["@babel/plugin-transform-react-jsx", { "pragma": "createElement" }]
    ]
});
