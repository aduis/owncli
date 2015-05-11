var requireDir = require('require-dir');
var minimist = require('minimist');
var hoek = require('hoek');
var _ = require('lodash');
var cli = require('./cli.js');
var pkg = require('../package.json');
var debug = require('debug')(pkg.name);

module.exports = {
    init: function (config, callback) {

        cli.config = hoek.applyToDefaults(cli.config, config);

        debug("config", cli.config);

        //parse arguments
        var parsedArgs = minimist(process.argv.slice(cli.config.sliceArgs));
        cli.args = parsedArgs._;

        debug("args", parsedArgs);

        //fill options
        delete parsedArgs._;
        cli.options = parsedArgs;

        //load all tasks
        var allTasks = requireDir(cli.config.tasks);

        for (var task in allTasks) {
            if (!_.includes(task, '-')) {
                cli.tasks[task] = allTasks[task];
            }
        }

        debug("tasks", cli.tasks);

        callback(null, cli);

    }
};
