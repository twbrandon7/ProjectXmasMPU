var EventEmitter = require('events').EventEmitter;
const exec = require('child_process').exec;
const kill = require('../lib/killSDK');

function Player(path) {
    var time = 0;
    var isPlaying = false;
    var startTime = 0;
    var script = null;

    this.event = new EventEmitter();

    this.on = function (name, cb) {
        console.log("YO");
        this.event.on(name, cb);
    }

    this.currentTime = function () {
        return time;
    };

    this.stop = function () {
        time = 0;
        isPlaying = false;
        kill("aplay");
    }

    this.play = function () {
        isPlaying = true;
        var date = new Date();
        startTime = date.getTime();
        this.event.emit('player_start', { path: path });
        var eventLocal = this.event;
        script = exec('sh ' + __dirname + '/../bin/play.sh ' + path,
            function (error, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
                if (error !== null) {
                    console.log("exec error:", error);
                }
                console.log("Exit Player");
                eventLocal.emit('player_exit', { path: path });
            });
    }

    setInterval(function () {
        if (isPlaying) {
            var date = new Date();
            current = date.getTime();
            time = (current - startTime) / 1000;
        }
    }, 1);
}

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

var player = new Player("/tmp/run/mountd/mmcblk0p1/xmas/Kataware_Doki.mp3");
var sectionLock = [];

function setSection(name) {
    if (sectionLock.includes(name)) {
        return false;
    } else {
        sectionLock.push(name);
        return true;
    }
}

module.exports.Player = Player;
module.exports.player = player;
module.exports.trigger = function (time, func) {
    var playerTime = player.currentTime();
    if (playerTime >= time && playerTime < time + 1 && setSection(time + "")) {
        if (isFunction(func)) {
            func();
        }
    }
}