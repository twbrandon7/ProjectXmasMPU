var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
var pk1 = null, pk2 = null, blu = null, whi = null;

var playerTimerId = null;

function getRandom(min,max){
    return Math.floor(Math.random()*max)+min;
}

function play() {
    console.log("BLINK MODE START");
    var lamps = [pk1, pk2, blu, whi];
    var running = [false, false, false, false]
    playerTimerId = setInterval(function() {
        var id = getRandom(0, 4);
        if(!running[id]) {
            var target = lamps[id];
            running[id] = true;

            target.scaleTo(getRandom(0, 255), getRandom(1000, 2000), function() {
                running[id] = false;
            });
        }
    }, 500);
}

function stop() {
    console.log("BLINK MODE STOP");
    if(playerTimerId != null) {
        clearInterval(playerTimerId);
    }
    pk1.scaleTo(0, 1000);
    pk2.scaleTo(0, 1000);
    blu.scaleTo(0, 1000);
    whi.scaleTo(0, 1000);
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