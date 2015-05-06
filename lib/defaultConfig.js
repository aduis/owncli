var pkg = require('../package.json');

module.exports = {
    name: 'cli.js',
    version: pkg.version,
    sliceArgs: 2,
    tasks: './tasks'
};

