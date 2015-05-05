module.exports = {
    help: function (config, tasks) {

        console.log(config.name + ' help!');
        console.log('version: ' + config.version);
        for (var task in tasks) {
            console.log(task);
            for (var subTask in tasks[task].commands) {
                console.log(subTask);
                for (var option in tasks[task].commands[subTask].options) {
                    console.log(option);
                }
            }
        }
    }
};
