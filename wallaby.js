module.exports = function () {
    return {
        files: [
            'lib/*.js',
            '*.json'
        ],

        tests: [
            'test/*.specs.js'
        ],
        env: {
            type: 'node'
        },
        debug: false,
        "delays": {
            "edit": 500,
            "run": 150
        },
        "workers": {
            "initial": 10,
            "regular": 4,
            recycle: true
        },
        bootstrap: function (wallaby) {
            wallaby.testFramework.ui('bdd');
        },
        "testFramework": "mocha@2.1.0"
    };
};
