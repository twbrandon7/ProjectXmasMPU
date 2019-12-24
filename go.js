var request = require("request");
var process = require("process");
const fs = require('fs');

function getBlankStream() {
    return fs.createReadStream('./blank.mp3');
}

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

function getTs(url, callback) {
    var res = request(url)
        .on("error", function (err) {
            if(isFunction(callback)) {
                callback(getBlankStream());
            }
        })
        .on("response", (res) => {
            if(res.statusCode == 200) {
                if(isFunction(callback)) {
                    callback(res);
                }
            } else {
                if(isFunction(callback)) {
                    callback(getBlankStream());
                }
            }
        });
    return res;
}

function writeToStream(buffer, callback) {
    buffer.on('data', function (chunk) {
        process.stdout.write(chunk);
    }).on('end', function () {
        if(typeof callback === "boolean") {
            if(callback == true) {
                return;
            } else {
                process.stdout.end();
            }
        } else if(isFunction(callback)) {
            callback();
        } else {
            process.stdout.end();
        }
    });
}

// var url = "http://localhost:3000/live/go0.ts";

// writeToStream(getTs(url), function() {
//     writeToStream(getTs("http://localhost:3000/live/go81.ts"), function(){
//         writeToStream(getTs("http://localhost:3000/live/go1.ts"));
//     });
// });

module.exports.getTs = getTs;
module.exports.writeToStream = writeToStream;
