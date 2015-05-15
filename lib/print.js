var chalk = require('chalk');
var figlet = require('figlet');

var msgs = {
    version : '\n%s v.%s help',
    commandMain : '\n> %s %s%s',
    commandSub : '\n> %s %s %s%s',
    optionValues : '  Option %s%s requires one of the following values: %s%s',
    optionRequired : '  Option %s%s is required %s',
    option : '  Option %s%s %s'
};

module.exports = {
    msgs: msgs,
    help: function (config, tasks, args) {

        var mainCommand = config.mainCommand || '';

        console.log(msgs.version, figlet.textSync(config.name, {font: 'Ogre'}), config.version);

        for (var task in tasks) {

            console.log(args);
            console.log(task);

            if (args && args.length && args[0] !== task) {
                continue;
            }

            var taskDescription = tasks[task].description ? '\n' + chalk.gray(tasks[task].description) + ' ' : '';

            if (tasks[task].execute) {
                console.log(msgs.commandMain, mainCommand, task, taskDescription);
            }

            for (var subTask in tasks[task].commands) {

                var subtaskDescription = tasks[task].commands[subTask].description ? '\n' + chalk.gray(tasks[task].commands[subTask].description) + ' ' : '';

                console.log(msgs.commandSub, mainCommand, task, subTask, subtaskDescription);

                for (var optionName in tasks[task].commands[subTask].options) {

                    var value = tasks[task].commands[subTask].options[optionName];
                    var option = chalk.yellow('--' + optionName);
                    var optionAbbr = value.abbr ? ' [' + chalk.yellow('-' + value.abbr) + ']' : '';
                    var optionDescription = value.description ? ' ' + chalk.gray(value.description) + ' ' : '';
                    var optionValues = '['+chalk.yellow(value.values)+']';

                    if (value.values) {
                        console.error(msgs.optionValues, option, optionAbbr, optionValues, optionDescription);
                    } else if (value.required) {
                        console.error(msgs.optionRequired, option, optionAbbr, optionDescription);
                    } else {
                        console.error(msgs.option, option, optionAbbr, optionDescription);
                    }

                }
            }
        }
    }
};
