var runner = require('../../index.js').runner;

module.exports = function(options){
    
    runner(options)
    
        .echo("Here we go!")
        .exec("grunt test")
        .get('version').from('package.json').as('oldVersion')
        .semver('oldVersion').as('newVersion')
        .set('version').in('package.json').to('newVersion')
        .echo("Done!")
        
        .go(function (err, results) {
            console.log(err || results || '');
        });
      
};
