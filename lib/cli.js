var defaultConfig = require('./defaultConfig.js');
var print = require('./print.js');
var validate = require('./validate.js');
var pkg = require('../package.json');
var debug = require('debug')(pkg.name);

module.exports = {
    config: defaultConfig,
    options: {},
    args: {},
    tasks: {},
    execute: function (callback) {
        var cli = this;

        if (cli.options.help || cli.options.h) {
            return print.help(cli.config, cli.tasks, cli.args);
        }

        if (!cli.args[0]) {
            return print.help(cli.config, cli.tasks);
        }

        var task;
        if (cli.args.length < 2) {
            task = cli.tasks[cli.args[0]];
        } else {
            if (!cli.args[1]) {
                return print.help(cli.config, cli.tasks);
            }
            task = cli.tasks[cli.args[0]].commands[cli.args[1]];
        }

        if (!task || !task.execute) {
            return print.help(cli.config, cli.tasks);
        } else {

            debug('task', task);

            validate.options(cli.options, task, function (err, canExecute) {
                if (canExecute) {
                    task.execute(cli.options, callback);
                }
            });
        }
    }
};
