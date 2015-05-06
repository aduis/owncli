var config = {
    tasks: __dirname + '/tasks',
    mainCommand : 'do'
};

require('../index.js').init(config, function(err, cli){
  
  cli.execute();
  
});
