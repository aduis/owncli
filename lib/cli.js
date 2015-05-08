var defaultConfig = require('./defaultConfig.js');
var print = require('./print.js');
var validate = require('./validate.js');
var pkg = require('../package.json');
var debug = require('debug')(pkg.name);
var deep = require('deep-dot');

module.exports = {
    config: defaultConfig,
    options: {},
    args: [],
    tasks: {},
    execute: function (callback) {
        var self = this;

        if (!callback) {
            callback = function () {};
        }

        if (self.options.help || self.options.h) {
            print.help(self.config, self.tasks, self.args);
            return callback();
        }

        if (self.args.length < 2) {
            self.task = self.tasks[self.args[0]];
        } else {
            self.task = deep(self.tasks, self.args[0] + '.commands.' + self.args[1]);
        }

        if (!self.task || !self.task.execute) {
            print.help(self.config, self.tasks);
            return callback();
        } else {

            debug('current task:', self.task);

            validate.options(self.options, self.task, function (err, canExecute) {
                if (canExecute) {
                    self.task.execute(self.options, callback);
                }
            });
        }
    }
};
