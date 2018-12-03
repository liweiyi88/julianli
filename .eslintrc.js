module.exports = {
    parser: "babel-eslint",
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        browser: true,
        es6: true,
        node: true
    },
    rules: {
        "no-console": 0,
        "no-unused-vars": 0
    },
    settings: {
        "react": {
            "createClass": "createReactClass",
            "pragma": "React",
            "version": "16.5.2"
        },
        "propWrapperFunctions": [ "forbidExtraProps" ]
    }
};
