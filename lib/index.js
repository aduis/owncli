var requireDir = require('require-dir');
var minimist = require('minimist');
var hoek = require('hoek');
var _ = require('lodash');

var cli = require('./cli.js');

module.exports = {
    init: function (config, callback) {

        cli.config = hoek.applyToDefaults(cli.config, config);

        if (cli.config.debug) {
            console.log("config", cli.config);
        }

        //pars arguments
        var parsedArgs = minimist(process.argv.slice(cli.config.sliceArgs));
        cli.args = parsedArgs._;

        if (cli.config.debug) {
            console.log("args", parsedArgs);
        }

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

        if (cli.config.debug) {
            console.log("tasks", cli.tasks);
        }

        callback(null, cli);

    }
};
