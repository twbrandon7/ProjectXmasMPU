require("./lib/ArrayTools");

console.log("Ready to run.");

var macaddress = require('macaddress');
var macAddr = macaddress.networkInterfaces();

var connectivity = require('connectivity');
var LampSDK = require("./lamp/LampSDK");
var playerSDK = require("./lamp/PlayerSDK");
var EventEmitter = require('events').EventEmitter;
var dai = require('./da/dai').dai(macAddr, 32);

var Lamp = LampSDK.Lamp;
var event = LampSDK.event;
var player = playerSDK.player;
var Player = playerSDK.Player;
var trigger = playerSDK.trigger;
var localEvent = new EventEmitter();

var pk1 = new Lamp("pk1");
var pk2 = new Lamp("pk2");
var blu = new Lamp("blu");
var whi = new Lamp("whi");

var sync = false;
var startPlayer = new Player(__dirname + "/" + "./audio/blue_line.mp3");
startPlayer.play();
startPlayer.on("player_exit", function () {
    console.log("DONE");
    sync = true;
});

event.on('serial_port_ready', function () {
    
    while(!sync);

    pk1.scaleTo(0, 1000);
    pk2.scaleTo(0, 1000);
    blu.scaleTo(0, 1000);
    whi.scaleTo(0, 1000);

    setTimeout(function () {
        var networkSound = new Player(__dirname + "/" + "./audio/waiting_network.mp3");
        networkSound.play();
        networkSound.on("player_exit", function () {
            connectivity(function (online) {
                pk1.scaleTo(125, 1000);
                if (online) {
                    localEvent.emit('network_online');
                } else {
                    localEvent.emit('network_offline');
                }
            });
        });
    }, 1000);

    localEvent.on("network_online", function () {
        pk1.scaleTo(0, 1000);
        var networkSound = new Player(__dirname + "/" + "./audio/connected.mp3");
        networkSound.play();
        networkSound.on("player_exit", function () {
            networkSound = new Player(__dirname + "/" + "./audio/waiting_iottalk.mp3");
            networkSound.play();
            networkSound.on("player_exit", function () {
                localEvent.emit("ready_to_iottalk");
            });
        });
    });

    localEvent.on("ready_to_iottalk", function () {
        dai.register();
        blu.scaleTo(125, 1000);
    });

    dai.on("registered", function () {
        var connectedSound = new Player(__dirname + "/" + "./audio/connected.mp3");
        connectedSound.play();
        connectedSound.on("player_exit", function () {
            blu.scaleTo(0, 1000);
            whi.scaleTo(255, 1000, function () {
                whi.scaleTo(0, 1000, function () {
                    localEvent.emit("ready");
                });
            });
        });
    });
});

localEvent.on("ready", function () {
    console.log("\n\n READY");
});