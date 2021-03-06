var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
var pk1 = null, pk2 = null, blu = null, whi = null;

var isRunning = false;

var playerTimerId = null;

function getRandom(min,max){
    return Math.floor(Math.random()*max)+min;
}

function play() {
    if(isRunning) return;
    isRunning = true;
    console.log("BLINK MODE START");
    var lamps = [pk1, pk2, blu, whi];
    var running = [false, false, false, false];
    var values = [0, 0, 0, 0, 0];
    var waiting = [1000, 1250, 1500, 1750, 2000];
    playerTimerId = setInterval(function() {
        var id = getRandom(0, 4);
        if(!running[id]) {
            var target = lamps[id];
            running[id] = true;

            values[id] = (values[id] == 255)? 0 : 255;

            var val = values[id];
            target.scaleTo(val, waiting[getRandom(0, waiting.length)], function() {
                setTimeout(function(){
                    running[id] = false;
                }, 800);
            });
        }
    }, 950);
}

function stop() {
    if(!isRunning) return;
    isRunning = false;
    console.log("BLINK MODE STOP");
    if(playerTimerId != null) {
        clearInterval(playerTimerId);
    }
    setTimeout(function(){
        pk1.scaleTo(0, 500);
        pk2.scaleTo(0, 500);
        blu.scaleTo(0, 500);
        whi.scaleTo(0, 500);
    }, 2000);
}

function init(_pk1, _pk2, _blu, _whi) {
    pk1 = _pk1;
    pk2 = _pk2;
    blu = _blu;
    whi = _whi;
}

function on(name, func) {
    event.on(name, func);
}

module.exports.init = init;
module.exports.play = play;
module.exports.stop = stop;
module.exports.on = on;