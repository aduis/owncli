var requireDir = require('require-dir');
var minimist = require('minimist');
var hoek = require('hoek');
var chalk = require('chalk');
var _ = require('lodash');
var pkg = require('./package.json');

var printHelp = function () {
  console.log(this.config.name + ' help!');
  console.log('version: ' + this.config.version);
  for (var task in this.tasks) {
    console.log(task);
    for (var subTask in this.tasks[task].commands) {
      console.log(subTask);
      for (var option in this.tasks[task].commands[subTask].options) {
        console.log(option);
      }
    }
  }
};

var execute = function () {

  if (this.options.help) {
    return this.printHelp();
  }

  if (this.args.length < 2) {
    this.executeTask(this.tasks[this.args[0]]);
  } else {
    this.executeTask(this.tasks[this.args[0]].commands[this.args[1]]);
  }

};

var executeTask = function (task) {

  var parsedOptions = this.options || {};
  var canExecute = true;

  _.forIn(task.options, function (opt, key) {

    if (opt.required && !parsedOptions[key] && !parsedOptions[opt.abbr]) {
      console.error('Option ' + key + ' is required.');
      canExecute = false;
      return;
    }

    var matchedOption = parsedOptions[key] || parsedOptions[opt.abbr];

    if (opt.values) {

      var found = false;
      opt.values.forEach(function (value) {

        if (!found) {
          found = matchedOption === value;
        }

      });

      if (!found) {
        console.error('Option ' + key + ' requires one of the following values: ' + opt.values);
        canExecute = false;
        return;
      }

    }

  });

  if (canExecute) {
    task.execute(this.options);
  }

};

var defaultConfig = {
  name: 'cli.js',
  version: pkg.version,
  debug: false,
  sliceArgs: 2,
  tasks: './tasks'
};

var cli = {
  config: defaultConfig,
  options: [],
  args: [],
  tasks: {},
  executeTask: executeTask,
  execute: execute,
  printHelp: printHelp
};

var init = function (config, callback) {

  cli.config = hoek.applyToDefaults(cli.config, config);
    
  //pars arguments
  var parsedArgs = minimist(process.argv.slice(cli.config.sliceArgs));
  cli.args = parsedArgs._;
    
  if(cli.options.debug)
    console.log("args", parsedArgs);
    
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

  if(cli.options.debug)
    console.log("tasks", cli.tasks);

  callback(null, cli);

};

module.exports = {
  init: init
};