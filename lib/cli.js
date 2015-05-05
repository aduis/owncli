var defaultConfig = require('./defaultConfig.js');
var print = require('./print.js');
var validate = require('./validate.js');

module.exports = {
    config: defaultConfig,
    options: {},
    args: {},
    tasks: {},
    execute: function () {
        var cli = this;

        if (cli.options.help) {
            return print.help(cli.options, cli.tasks);
        }

        if (!cli.args[0]) {
            return print.help(cli.options, cli.tasks);
        }

        var task;
        if (cli.args.length < 2) {
            task = cli.tasks[cli.args[0]];
        } else {
            if (!cli.args[1]) {
                return print.help(cli.options, cli.tasks);
            }

            task = cli.tasks[cli.args[0]].commands[cli.args[1]];
        }

        if (!task || !task.execute) {
            return print.help(cli.options, cli.tasks);
        }else{
            validate.options(cli.options, task, function(err, canExecute){

                if(canExecute){
                    task.execute(cli.options);
                }
            });

        }
    }
};
