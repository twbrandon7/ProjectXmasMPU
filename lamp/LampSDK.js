const SerialPort = require('serialport').SerialPort;
var EventEmitter = require('events').EventEmitter; 
var event = new EventEmitter(); 

var port = new SerialPort("/dev/ttyS0", {
    baudrate: 57600
});

function decToHex(dec) {
    if (dec > 255) dec = 255;
    var str = dec.toString(16);
    return (str.length > 1) ? str : "0" + str;
}

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

var pinData = {
    blu: 0,
    whi: 0,
    pk1: 0,
    pk2: 0
};

port.on("open", function () {
    console.log("Serial Port Ready!");
    event.emit('serial_port_ready'); 
    setInterval(function () {
        var toSend = decToHex(Math.round(pinData.blu)) + decToHex(Math.round(pinData.whi)) + decToHex(Math.round(pinData.pk1)) + decToHex(Math.round(pinData.pk2));
        port.write(toSend, function (err) {
            if (err) {
                return console.log('Error on write: ', err.message)
            }
        })
    }, 25);
});

// Open errors will be emitted as an error event
port.on('error', function (err) {
    console.log('Error: ', err.message)
});


function Lamp(name){
    var name = name;
    var tick = 10;

    this.scaleTo =function(val, speed, callback) {
        if(speed == 0) {
            pinData[name] = val;
            return;
        }
        var current = pinData[name];
        var internalCurrent = current;
        var duration = Math.abs(val-current) / speed * tick;
        var mag = (current > val)? -1 : 1;
        duration *= mag;
        var currentTick = 0;
        
        var timer = setInterval(function() {
            if(currentTick >= speed) {
                clearInterval(timer);
                pinData[name] = val;
                if (isFunction(callback)) {
                    callback();
                }
                return;
            }
            
            internalCurrent += duration;
            pinData[name] = internalCurrent;
            // console.log(pinData[name]);

            currentTick+=tick;
        }, tick);
    }
};

module.exports.Lamp = Lamp;
module.exports.event = event;