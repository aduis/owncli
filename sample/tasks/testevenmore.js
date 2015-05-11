module.exports = {
    description: 'do even more thing',
    execute: function (options) {
        console.log("testmore");
    },
    commands: {
        one: {
            description: 'do one other thing',
            execute: require('./test-one'),
            options: {
                save: {abbr: 's', description: 'save the settings', required: true}
            }
        }
    }
};
