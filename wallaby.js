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
        "workers": {
            "initial": 1,
            "regular": 1
        },
        debug: false,
        "testFramework": "mocha@2.1.0"
    };
};
