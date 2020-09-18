const { join } = require("path");
const webpack = require("C:/Program Files/Mendix/8.13.1.5182/modeler/tools/node/node_modules/webpack");
const RawModule = require("C:/Program Files/Mendix/8.13.1.5182/modeler/tools/node/node_modules/webpack/lib/RawModule");

module.exports = function(env) {
    const IS_PRODUCTION = env && env.prod;

    return {
        devtool: !IS_PRODUCTION ? "inline-source-map" : false,
        mode: IS_PRODUCTION ? "production" : "development",
        entry: {
            jsactions: join(__dirname, "jsactions")
        },
        output: {
            path: join(__dirname, "../web"),
            libraryTarget: "amd"
        },
        module: {
            rules: [
                {
                    test: /.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [ [ "@babel/preset-env", { targets: { ie: "11" } } ] ],
                            plugins: [ "@babel/plugin-syntax-dynamic-import", "@babel/plugin-transform-runtime" ]
                        }
                    }
                }
            ]
        },
        externals: [ "big.js", /@babel\/runtime/ ],
        plugins: [
            new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
            new EmptyModulePlugin(/react-native/)
        ],
        bail: true,
        parallelism: 2,
        stats: "errors-only"
    };
}

class EmptyModulePlugin {
    constructor(regExp) {
        this.regExp = regExp;
    }

    apply(compiler) {
        compiler.hooks.normalModuleFactory.tap("EmptyModulePlugin", nmf => {
            nmf.hooks.resolver.tap("EmptyModulePlugin", resolver => (request, callback) =>
                this.regExp.test(request.request)
                    ? callback(null, new RawModule("/* empty */", request.request, request.request + " (ignored module)"))
                    : resolver(request, callback)
            );
        });
    }
}