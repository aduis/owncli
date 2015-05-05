module.exports = {
	commands: {
		one: {
			execute: require('./test-one'),
			options: {
				save: { pos: 0, abbr: 's', required: true }
			}
		},
		two: {
			execute: require('./test-two')
		}
	}
};