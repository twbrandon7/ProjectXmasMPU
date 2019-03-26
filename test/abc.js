require("../lib/ArrayTools");
var LampSDK = require("../lamp/LampSDK");
var playerSDK = require("../lamp/PlayerSDK");
var Lamp = LampSDK.Lamp;
var Player = playerSDK.Player;
var event = LampSDK.event;

var pk1 = new Lamp("pk1");
var pk2 = new Lamp("pk2");
var blu = new Lamp("blu");
var whi = new Lamp("whi");

var i = 0;

function runDefaultMode() {
    var defaultMode = require("../mode/default");
    defaultMode.init(pk1, pk2, blu, whi);
    defaultMode.play();
    defaultMode.on("done", function() {
        console.log("DEFAULT MODE END");
        if(i++ <= 1) {
            console.log("AGAIN");
            runDefaultMode()
        }
    });
}

event.on('serial_port_ready', function () {
    console.log("GO");
    runDefaultMode();
});