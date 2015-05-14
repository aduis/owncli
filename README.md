# owncli
nodejs command line utility

[![Build Status](https://travis-ci.org/aduis/owncli.svg?branch=master)](https://travis-ci.org/aduis/owncli) [![Coverage Status](https://coveralls.io/repos/aduis/owncli/badge.svg)](https://coveralls.io/r/aduis/owncli) [![npm version](https://badge.fury.io/js/owncli.svg)](http://badge.fury.io/js/owncli)

## getting started

### setup new npm project sample cli

    mkdir samplecli
    cd samplecli
    npm init
    npm install owncli --save

### create your cli startup file

    touch index.js

    var config = {
        tasks: __dirname + '/tasks',
        mainCommand : 'sample'
    };

    require('owncli').init(config, function(err, cli){
      cli.execute();
    });

### create your first tasks

    mkdir tasks
    cd tasks

    touch test.js

    module.exports = {
        commands: {
            one: {
                description: 'do one thing',
                execute: require('./test-one'),
                options: {
                    significance: {abbr: 's', description: 'significance of version',required: true}
                }
            }
            two: {
                description: 'do two things',
                execute: require('./test-two'),
                options: {
                    verbose: {abbr: 'v', description: 'set verbosity'},
                    save: {abbr: 's', description: 'save the settings', required: true},
                    env: {abbr: 'e', description: 'set environment', required: true, values: ['dev', 'prod']}
                }
            }
        }
    };

    touch test-one.js

    var runner = require('owncli').runner;

    module.exports = function(options){

        runner(options)

            .echo("Here we go!")
            .exec("cat index.js")
            .get('version').from('package.json').as('oldVersion')
            .semver('oldVersion').as('newVersion')
            .set('version').in('package.json').to('newVersion')
            .echo("Done!")

            .go(function (err, results) {
                console.log('options', options);
                console.log(err || results || '');
            });

    };

    touch test-two.js

    module.exports = function(options){
    	console.log("three");
    };


### try your cli

    node index //=> outputs help

    node index test //=> outputs help for the test command

    node index test one -s patch //call test-one command


## debug
    WINDOWS: SET DEBUG=owncli & node index.js
    *nix: DEBUG=owncli & node index.js
