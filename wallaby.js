module.exports = function () {
    return {
        files: [
            'lib/*.js',
            'package.json'
        ],

        tests: [
            'test/*.specs.js'
        ],
        env: {
            type: 'node'
        },
        debug: false,
        "testFramework": "mocha@2.1.0"
    };
};
