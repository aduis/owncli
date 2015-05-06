module.exports = {
	commands: {
		one: {
			execute: require('./test-one'),
			options: {
				save: { abbr: 's', required: true }
			}
		},
		two: {
			execute: require('./test-two')
		},
        three: {
            execute: require('./test-three'),
            options: {
                verbose: { abbr: 'v' },
                save: { abbr: 's', required: true },
                env: { abbr: 'e', required: true, values:['dev','prod'] }
            }
        }
	}
};
