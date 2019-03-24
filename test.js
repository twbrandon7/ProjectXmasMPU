const exec = require('child_process').exec;


function isConnected() {
    var result = null;
    exec('ping 8.8.8.8 -c 5', function (error, stdout, stderr) {
        var arr = stdout.split("\n");
        var hasConnection = false;
        console.log(arr);
        for(var i in arr) {
            if(arr[i].indexOf("5 packets received") >= 0) {
                hasConnection = true;
                break;
            }
        }
        result = hasConnection;
        console.log("DONE" + result);
    });
    while(result == null);
    return result;
}

console.log(isConnected());