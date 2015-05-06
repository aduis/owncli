var _ = require('lodash');
var chalk = require('chalk');

module.exports = {
    options: function (options, task, callback) {

        var canExecute = true;

        _.forIn(task.options, function (opt, key) {

            var optionAbbr = task.options[key].abbr ? ' [' + chalk.yellow('-' + task.options[key].abbr) + ']' : '';
            var option = chalk.yellow('--' + key);
            var optionValues = '['+chalk.yellow(opt.values)+']';
            var found = false;

            if (opt.required && !options[key] && !options[opt.abbr]) {
                canExecute = false;
            }

            if (!options[key]) {
                options[key] = options[opt.abbr];
            }

            if (opt.values) {

                opt.values.forEach(function (value) {
                    if (!found) {
                        found = options[key] === value;
                    }
                });

                if (!found) {
                    canExecute = false;
                }
            }

            // output errors
            if (opt.values && !found) {
                console.error('  Option %s%s requires one of the following values: %s', option, optionAbbr, optionValues);
            } else if (opt.required && !options[key] && !options[opt.abbr]) {
                console.error('  Option %s%s is required.', option, optionAbbr);
            }

        });

        callback(null, canExecute);
    }
};
