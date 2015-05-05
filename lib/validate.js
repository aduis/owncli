var _ = require('lodash');

module.exports = {
    options: function(options, task, callback){

        var canExecute = true;

        _.forIn(task.options, function (opt, key) {

            if (opt.required && !options[key] && !options[opt.abbr]) {
                console.error('Option ' + key + ' is required.');
                canExecute = false;
            }

            if (!options[key]) {
                options[key] = options[opt.abbr];
            }

            if (opt.values) {

                var found = false;
                opt.values.forEach(function (value) {
                    if (!found) {
                        found = options[key] === value;
                    }
                });

                if (!found) {
                    console.error('Option ' + key + ' requires one of the following values: ' + opt.values);
                    canExecute = false;
                }
            }
        });

        callback(null, canExecute);
    }
};
