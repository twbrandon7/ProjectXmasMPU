const exec = require('child_process').exec;
function kill(name) {
    exec('ps | grep '+name, function (error, stdout, stderr) {
        var arr = stdout.split("\n");
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].indexOf(name) > -1) {
                var id = arr[i].split(" ");
                for (var j in id) {
                    if (Number.isInteger(parseInt(id[j]))) {
                        exec('kill ' + id[j], function (error, stdout, stderr) {
                            console.log("KILL "+id[j]);
                        });
                    }
                }
            }
        }
    });
}

module.exports = kill;