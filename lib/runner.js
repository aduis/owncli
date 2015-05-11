var fluid = require("fluid");

module.exports = function (options) {
    var lastAction = {};
    
    var setLastAction = function(action, value){
        //console.log(action, value);
        lastAction = { action: action, value: value };
    };
    
    this.exec = function (command, callback) {
        setLastAction('exec');
        callback(null, command);
    };
    
    this.echo = function (command, callback) {
        setLastAction('echo');
        callback(null, command);
    };
    
    this.as = function (property, callback) {
        options[property] = lastAction.value;
        
        setLastAction('as');
        callback(null, property);
    };
      
    this.to = function (property, callback) {
        //console.log(lastAction.value.property, lastAction.value.file, options[property]);
        setLastAction('to');
        callback(null, property);
    };
    
    this.semver = function (property, callback) {
        setLastAction('semver', '0.15.0');
        callback(null, property);
    };
    
    this.get = function (property, callback) {
        setLastAction('get', property);
        callback(null, property);
    };
        
    this.set = function (property, callback) {
        setLastAction('set', property);
        callback(null, property);
    };
    
    this.in = function (file, callback) {
        setLastAction('in', { property: lastAction.value, file: file });
        callback(null, file);
    };
    
    this.from = function (file, callback) {
        //console.log('get ' + lastAction.value + ' from ' + file);
        
        setLastAction('from', '0.14.9');
        callback(null, file);
    };

    return fluid().series().with(this);
};