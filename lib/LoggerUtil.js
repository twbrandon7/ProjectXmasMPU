var fs = require('fs');
var util = require('util');

var _log = console.log;
var _info = console.info;
var _warn = console.warn
var _error = console.error
var _debug = console.debug

function getDateStr() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return year + "-" + month + "-" + day;
}

function getDateTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
}

function formatArgs(args) {
    return [util.format.apply(util.format, Array.prototype.slice.call(args))];
}

function fixString(strIn) {
    if (strIn.length < 5) {
        var str = new Array(5 - strIn.length + 1).join(" ");
        strIn = strIn + str;
    }
    return strIn;
}

function getPrefix(type) {
    if (type.length < 5) {

    }
    return "[" + getDateTime() + "] " + "[" + fixString(type) + "] ";
}

function write(prefix, msg) {
    var path = __dirname + "/../logs/log-" + getDateStr() + ".log";
    try {
        if (!fs.existsSync(path)) {
            fs.writeFile(path, '');
        }
    } catch (err) { }
    fs.appendFile(path, prefix + msg + "\n", function (err) { });
}

function logger(type, msg) {
    var prefix = getPrefix(type);
    var _func = _log;
    if (type == "log") {
        var _func = _log;
    } else if (type == "info") {
        var _func = _info;
    } else if (type == "warn") {
        var _func = _warn;
    } else if (type == "error") {
        var _func = _error;
    } else if (type == "debug") {
        var _func = _debug;
    }
    // output for console
    process.stdout.write(prefix);
    _func.apply(this, msg);
    write(prefix, formatArgs(msg).join(" "));
}

console.log = function (msg) {
    logger("log", arguments);
}

console.info = function (msg) {
    logger("info", arguments);
}

console.warn = function (msg) {
    logger("warn", arguments);
}

console.error = function (msg) {
    logger("error", arguments);
}

console.debug = function (msg) {
    logger("debug", arguments);
}

// handle all error
process.on('uncaughtException', function (err) {
    console.error('Caught exception: \n' + err);
});