var pkg = require('../package.json');

module.exports = {
    name: 'cli.js',
    version: pkg.version,
    debug: false,
    sliceArgs: 2,
    tasks: './tasks'
};

