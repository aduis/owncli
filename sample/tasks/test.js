module.exports = {
    commands: {
        one: {
            description: 'do one thing',
            execute: require('./test-one'),
            options: {
                save: {abbr: 's', description: 'save the settings',required: true}
            }
        },
        two: {
            description: 'do two things',
            execute: require('./test-two')
        },
        three: {
            description: 'do three things',
            execute: require('./test-three'),
            options: {
                verbose: {abbr: 'v', description: 'set verbosity'},
                save: {abbr: 's', description: 'save the settings', required: true},
                env: {abbr: 'e', description: 'set environment', required: true, values: ['dev', 'prod']}
            }
        }
    }
};
