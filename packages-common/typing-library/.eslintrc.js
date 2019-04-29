module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "settings": {
        "react": {
            "createClass": "createReactClass",
            "pragma": "React",
            "version": "detect",
        }
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "react/prop-types": "off",
        "react/no-deprecated": "warn"
    }
};
