var pkg = require('../package.json');

module.exports = {
    name: 'cli.js',
    version: pkg.version,
    debug: true,
    sliceArgs: 2,
    tasks: './tasks'
};

