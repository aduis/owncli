var config = {
    tasks: __dirname + '/tasks',
    mainCommand : 'sample'
};

require('../index.js').init(config, function(err, cli){
  cli.execute();
});
