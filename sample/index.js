var config = {
    tasks: __dirname + '/tasks'
};

require('../index.js').init(config, function(err, cli){
  
  cli.execute();
  
});
