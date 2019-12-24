require("./lib/ArrayTools");
require("./lib/LoggerUtil");

var macaddress = require('macaddress');
var macAddr = macaddress.networkInterfaces();

var defaultMode = require("./mode/default");
var blinkMode = require("./mode/blink");
var connectivity = require('connectivity');
var LampSDK = require("./lamp/LampSDK");
var playerSDK = require("./lamp/PlayerSDK");
var EventEmitter = require('events').EventEmitter;
var dai = require('./da/dai').dai(macAddr, 32);

var Lamp = LampSDK.Lamp;
var event = LampSDK.event;
var Player = playerSDK.Player;
var localEvent = new EventEmitter();

var pk1 = new Lamp("pk1");
var pk2 = new Lamp("pk2");
var blu = new Lamp("blu");
var whi = new Lamp("whi");

event.on('serial_port_ready', function () {
    pk1.scaleTo(0, 1000);
    pk2.scaleTo(0, 1000);
    blu.scaleTo(0, 1000);
    whi.scaleTo(0, 1000);

    defaultMode.init(pk1, pk2, blu, whi);
    blinkMode.init(pk1, pk2, blu, whi);

    var startPlayer = new Player(__dirname + "/" + "./audio/blue_line.mp3");
    startPlayer.play();
    startPlayer.on("player_exit", function () {
        connectivity(function (online) {
            pk1.scaleTo(125, 1000);
            if (online) {
                localEvent.emit('network_online');
            } else {
                var networkSound = new Player(__dirname + "/" + "./audio/waiting_network.mp3");
                networkSound.play();
                networkSound.on("player_exit", function () {
                    localEvent.emit('network_retry');
                });

            }
        });
    });

    localEvent.on("network_retry", function () {
        connectivity(function (online) {
            pk1.scaleTo(125, 1000);
            if (online) {
                pk1.scaleTo(0, 1000);
                var networkSound = new Player(__dirname + "/" + "./audio/connected.mp3");
                networkSound.play();
                networkSound.on("player_exit", function () {
                    localEvent.emit('network_online');
                });
            } else {
                pk1.scaleTo(0, 2000, function () {
                    localEvent.emit('network_retry');
                });
            }
        });
    });

    localEvent.on("network_online", function () {
        pk1.scaleTo(0, 1000);
        var networkSound = new Player(__dirname + "/" + "./audio/waiting_iottalk.mp3");
        networkSound.play();
        networkSound.on("player_exit", function () {
            localEvent.emit("ready_to_iottalk");
        });
    });

    localEvent.on("ready_to_iottalk", function () {
        dai.register();
    });

    dai.on("registered", function () {
        dai.up();
        var connectedSound = new Player(__dirname + "/" + "./audio/connected.mp3");
        connectedSound.play();
        connectedSound.on("player_exit", function () {
            whi.scaleTo(255, 1000, function () {
                whi.scaleTo(0, 1000, function () {
                    localEvent.emit("ready");
                });
            });
        });
    });

});

function getStatusString(status) {
    return JSON.stringify({
        time: (new Date()).getTime(),
        status: status
    });
}



var currentStatus = "ready";

localEvent.on("ready", function () {
    console.log("\n\n READY");

    // heartbeat
    setInterval(function () {
        dai.push("xmas_tree_idf", getStatusString(currentStatus));
    }, 5000);

    blinkMode.play();

    dai.on("pull", function (obj) {
        try {
            if (obj.odf == "xmas_tree_odf") {
                var json = JSON.parse(obj.data);
                if ((new Date()).getTime() - json.time <= 10000) {
                    if (json.action == "play") {
                        if (currentStatus == "ready") {

                            blinkMode.stop();
                            setTimeout(function() {
                                currentStatus = "playing";
                                defaultMode.play();
                                defaultMode.on("done", function() {
                                    currentStatus = "ready";
                                    console.log("DEFAULT MODE END");
                                    blinkMode.play();
                                });
                            }, 1000);

                        } else {
                            console.log("WAIT");
                        }
                    }
                }
            }
        } catch (e) {
            console.error(e);
        }
    });
});