var fluid = require("fluid");
var shell = require('shelljs');
var jf = require('jsonfile');
var semver = require('semver');
var hoek = require('hoek');

module.exports = function (options) {
    var lastAction = {};

    var setLastAction = function (action, value) {
        lastAction = {action: action, value: value};
    };

    this.exec = function (command, callback) {

        shell.exec(command);

        setLastAction('exec');
        callback(null, command);
    };

    this.echo = function (message, callback) {

        shell.echo(message);

        setLastAction('echo');
        callback(null, message);
    };

    this.as = function (property, callback) {
        hoek.assert(lastAction.action === 'semver', 'call semver before as');

        options[property] = lastAction.value;

        setLastAction('as');
        callback(null, property);
    };

    this.to = function (property, callback) {
        hoek.assert(lastAction.action === 'in', 'call in before to');
        hoek.assert(lastAction.value.value, 'lastAction has to set value property in value');
        hoek.assert(lastAction.value.file, 'lastAction has to set file property in value');

        jf.readFile(lastAction.value.file, function (err, json) {
            json[property] = lastAction.value.value;

            jf.writeFile(lastAction.value.file, json, {}, function (err, res) {
                setLastAction('to');
                callback(err, property);
            });

        });

    };

    this.semver = function (oldVersion, callback) {
        hoek.assert(options.significance, 'significance must be set in options');
        hoek.assert(semver.valid(oldVersion), 'please enter a valid sementic version');

        var newVersion = semver.inc(oldVersion, options.significance);

        setLastAction('semver', newVersion);
        callback(null, newVersion);
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
        hoek.assert(lastAction.action === 'set', 'call set before in');

        setLastAction('in', {value: lastAction.value, file: file});
        callback(null, file);
    };

    this.from = function (file, callback) {
        hoek.assert(lastAction.action === 'get', 'call get before from');
        hoek.assert(lastAction.value, 'set propertyname in from function');

        jf.readFile(file, function (err, json) {
            setLastAction('from', json[lastAction.value]);
            callback(err, json[lastAction.value]);
        });
    };

    return fluid().series().with(this);
};
