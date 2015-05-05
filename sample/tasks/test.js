module.exports = {
	commands: {
		release: {
			execute: require('./test-one'),
			options: {
				save: { pos: 0, abbr: 's', required: true }
			}
		},
		watch: {
			execute: require('./test-two')
		}
	}
};