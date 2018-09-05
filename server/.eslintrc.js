module.exports = {
    "env": {
        "jest": true,
        "node": true
    },
    "extends":[ "airbnb-base","plugin:prettier/recommended"],
    "rules": {
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
        "no-console":0,
        "no-unused-vars":0,
        "import/prefer-default-export":0,
        "no-underscore-dangle":0,
        "consistent-return":0
    },
};