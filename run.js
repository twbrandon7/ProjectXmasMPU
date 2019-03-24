require("./lib/ArrayTools");

var LampSDK = require("./lamp/LampSDK");
var Lamp = LampSDK.Lamp;
var event = LampSDK.event;
var playerSDK = require("./lamp/PlayerSDK");
var player = playerSDK.player;
var Player = playerSDK.Player;
var trigger = playerSDK.trigger;

var pk1 = new Lamp("pk1");
var pk2 = new Lamp("pk2");
var blu = new Lamp("blu");
var whi = new Lamp("whi");

event.on('serial_port_ready', function () {
    pk1.scaleTo(0, 1000);
    pk2.scaleTo(0, 1000);
    blu.scaleTo(0, 1000);
    whi.scaleTo(0, 1000);

    var startPlayer = new Player("/tmp/run/mountd/mmcblk0p1/xmas/blue_line.mp3");
    startPlayer.on("player_start", function(){
        console.log("STOP");
    });
    startPlayer.play();
    // setTimeout(function(){
    //     startPlayer.stop();
    //     setTimeout(function(){
    //         process.exit();
    //     }, 1000);
    // }, 10000);
}); 