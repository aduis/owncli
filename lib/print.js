var _ = require('lodash');
var chalk = require('chalk');
var pkg = require('../package.json');
var debug = require('debug')(pkg.name);

module.exports = {
    help: function (config, tasks, args) {

        var mainCommand = config.mainCommand || '';

        console.log('\n%s (v.%s) help', config.name, config.version);
        console.log('------------------------------');

        for (var task in tasks) {

            if (args.length && args[0] !== task) {
                continue;
            }

            var taskDescription = tasks[task].description ? '\n' + chalk.gray(tasks[task].description) + ' ' : '';

            if (!tasks[task].commands) {
                console.log('\n> %s %s%s', mainCommand, task, taskDescription);
            }

            for (var subTask in tasks[task].commands) {

                var subtaskDescription = tasks[task].commands[subTask].description ? '\n' + chalk.gray(tasks[task].commands[subTask].description) + ' ' : '';

                console.log('\n> %s %s %s%s', mainCommand, task, subTask, subtaskDescription);

                for (var optionName in tasks[task].commands[subTask].options) {

                    var value = tasks[task].commands[subTask].options[optionName];
                    var option = chalk.yellow('--' + optionName);
                    var optionAbbr = value.abbr ? ' [' + chalk.yellow('-' + value.abbr) + ']' : '';
                    var optionDescription = value.description ? ' ' + chalk.gray(value.description) + ' ' : '';
                    var optionValues = '['+chalk.yellow(value.values)+']';

                    if (value.values) {
                        console.error('  Option %s%s requires one of the following values: %s%s', option, optionAbbr, optionValues, optionDescription);
                    } else if (value.required) {
                        console.error('  Option %s%s is required %s', option, optionAbbr, optionDescription);
                    } else {
                        console.error('  Option %s%s %s', option, optionAbbr, optionDescription);
                    }

                }
            }
        }
    }
};
