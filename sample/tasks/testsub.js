module.exports = {
    description: 'do even more thing',
    execute: function (options) {
        console.log("testmore");
    },
    commands: {
        one: {
            description: 'do one other thing',
            execute: require('./test-one')
        }
    }
};
