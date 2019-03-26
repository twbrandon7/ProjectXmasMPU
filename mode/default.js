var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
var playerSDK = require("../lamp/PlayerSDK");
var Player = playerSDK.Player;
var trigger = playerSDK.trigger;

var pk1 = null, pk2 = null, blu = null, whi = null;

var player = new Player(__dirname + "/../audio/Kataware_Doki.mp3");

function stop() {
    pk1.scaleTo(0, 0);
    pk2.scaleTo(0, 0);
    blu.scaleTo(0, 0);
    whi.scaleTo(0, 0);
    player.stop();
}

function fadeInOut(obj) {
    obj.scaleTo(255, 1000, function(){
        obj.scaleTo(0, 1000);
    });
}

function play() {
    fadeInOut(pk1);
    fadeInOut(pk2);
    fadeInOut(blu);
    fadeInOut(whi);

    function dimmer(target, to, high, low) {
        setTimeout(function () {
            target.scaleTo(/*190*/high, 360, function () {
                target.scaleTo(/*100*/low, 1440, function () {
                    var playerTime = player.currentTime();
                    if (playerTime < to) {
                        dimmer(target, to, high, low);
                    } else {
                        target.scaleTo(0, 300);
                    }
                });
            });
        }, 0);
    }

    // var player = document.getElementById("music");
    var debugI = 0;

    setTimeout(function () {
        player.play();
        console.log("DEFULT MUSIC START");
        setInterval(function () {
            // var time = player.currentTime;
            // $("#timer").text(player.currentTime);
            // console.log(player.currentTime() + "\r")

            trigger(0, function () {
                blu.scaleTo(255, 6500, function () {
                    blu.scaleTo(0, 5000);
                });
            });

            trigger(6, function () {
                whi.scaleTo(255, 6000);
            });

            trigger(13.4, function () {
                whi.scaleTo(0, 3600);
            });

            //////////

            trigger(19.8, function () {
                dimmer(blu, 56.0, 190, 100);
            });

            //////////

            trigger(23.5, function () {
                whi.scaleTo(255, 100, function () {
                    whi.scaleTo(0, 1000);
                });
            });

            trigger(25.3, function () {
                whi.scaleTo(255, 100, function () {
                    whi.scaleTo(0, 1000);
                });
            });

            trigger(32.8, function () {
                whi.scaleTo(255, 100, function () {
                    whi.scaleTo(0, 1000);
                });
            });

            trigger(38.3, function () {
                whi.scaleTo(255, 100, function () {
                    whi.scaleTo(0, 1000);
                });
            });

            trigger(40.1, function () {
                whi.scaleTo(255, 100, function () {
                    whi.scaleTo(0, 1000);
                });
            });

            trigger(42.2, function () {
                whi.scaleTo(255, 100, function () {
                    whi.scaleTo(0, 1000);
                });
            });

            trigger(43.8, function () {
                whi.scaleTo(255, 100, function () {
                    whi.scaleTo(0, 1000);
                });
            });

            trigger(45.7, function () {
                whi.scaleTo(255, 100, function () {
                    whi.scaleTo(0, 1000);
                });
            });

            trigger(47.5, function () {
                whi.scaleTo(255, 100, function () {
                    whi.scaleTo(0, 1000);
                });
            });

            trigger(49.3, function () {
                whi.scaleTo(255, 100, function () {
                    whi.scaleTo(0, 1000);
                });
            });

            trigger(51.2, function () {
                whi.scaleTo(255, 100, function () {
                    whi.scaleTo(0, 1000);
                });
            });

            trigger(51.2, function () {
                whi.scaleTo(255, 100, function () {
                    whi.scaleTo(0, 1000);
                });
            });

            trigger(53.0, function () {
                whi.scaleTo(255, 80, function () {
                    whi.scaleTo(0, 1000);
                });
            });

            trigger(54.9, function () {
                whi.scaleTo(255, 100, function () {
                    whi.scaleTo(0, 1000);
                });
            });

            //////

            trigger(56.8, function () {
                whi.scaleTo(42, 400); //1
            });

            trigger(58.1, function () {
                whi.scaleTo(84, 400); //2
            });

            trigger(59.9, function () {
                whi.scaleTo(127, 400); //3
            });

            trigger(62.2, function () {
                blu.scaleTo(128, 50, function () {
                    blu.scaleTo(0, 1000);
                });
            });

            trigger(64.1, function () {
                whi.scaleTo(170, 400); //4
            });

            trigger(65.5, function () {
                whi.scaleTo(212, 400); //5
            });

            trigger(67.3, function () {
                whi.scaleTo(256, 400); //6
            });

            trigger(69.4, function () {
                whi.scaleTo(0, 2000); //White OFF
            });

            //////

            //白燈低音
            function slowDimmer(start, cycle) {
                for (var j = 0; j < cycle; j++) {
                    for (var i = 0; i < 4; i++) {
                        trigger((j * 7.378) + start + 1.89 * i, function () {
                            // console.log(++debugI);
                            whi.scaleTo(255, 100, function () {
                                whi.scaleTo(0, 1000);
                            });
                        });
                    }
                }
            }

            slowDimmer(71.5, 10);

            //藍色
            trigger(71.49, function () {
                dimmer(blu, 107.0, 255, 100);
            });

            //紅色-提琴
            function pinkDimmer(start, cycle) {
                for (var i = 0; i < cycle; i++) {
                    trigger(start + i * 3.7, function () {
                        pk1.scaleTo(240, 400, function () {
                            pk1.scaleTo(0, 1000);
                        });
                    });
                }
            }
            pinkDimmer(74.4, 8);

            //藍色-重音
            function blueDimmer(start, cycle) {
                for (var i = 0; i < cycle; i++) {
                    trigger(start + i * 3.7, function () {
                        blu.scaleTo(255, 100, function () {
                            blu.scaleTo(0, 500);
                        });
                    });
                }
            }
            blueDimmer(123.2, 6);

            //紅色-漸強
            trigger(103.8, function () {
                pk2.scaleTo(70, 2800);
            });

            trigger(106.6, function () {
                pk2.scaleTo(255, 1900);
            });

            trigger(108.5, function () {
                pk2.scaleTo(70, 5500);
            });

            trigger(114.0, function () {
                pk2.scaleTo(255, 5700);
            });

            trigger(119.7, function () {
                pk2.scaleTo(70, 3500);
            });

            trigger(123.21, function () {
                pk2.scaleTo(255, 2700);
            });

            trigger(125.9, function () {
                pk2.scaleTo(70, 2800);
            });

            trigger(128.7, function () {
                pk2.scaleTo(255, 1000);
            });

            trigger(129.7, function () {
                pk2.scaleTo(70, 800);
            });

            //紅色-主旋律
            function pk12Dimmer(start) {
                trigger(start, function () {
                    pk2.scaleTo(255, 800);
                });
                trigger(start + 0.8, function () {
                    pk1.scaleTo(255, 800);
                });
                trigger(start + 1.6, function () {
                    pk1.scaleTo(0, 2200);
                    pk2.scaleTo(0, 2200);
                });
                trigger(start + 3.8, function () {
                    pk1.scaleTo(255, 900);
                });
                trigger(start + 4, function () {
                    pk2.scaleTo(255, 900, function () {
                        pk1.scaleTo(0, 1500);
                        pk2.scaleTo(0, 1500);
                    });
                });
            }
            pk12Dimmer(130.501);
            pk12Dimmer(137.901);

            trigger(145.41, function () {
                pk1.scaleTo(128, 1460);
                pk2.scaleTo(128, 1460, function () {
                    pk1.scaleTo(0, 5840);
                    pk2.scaleTo(0, 5840);
                });
            });

            //藍白收尾
            trigger(145.3, function () {
                whi.scaleTo(128, 800);
            });

            trigger(146.7, function () {
                blu.scaleTo(128, 800);
            });

            trigger(148.5, function () {
                whi.scaleTo(255, 800);
                blu.scaleTo(255, 800);
            });

            ///
            trigger(152.8, function () {
                blu.scaleTo(128, 800);
            });

            trigger(154.2, function () {
                whi.scaleTo(128, 800);
            });

            trigger(156.0, function () {
                whi.scaleTo(0, 1600);
                blu.scaleTo(0, 1600, function () {
                    player.stop();
                    console.log("DONE");
                    event.emit("done");
                });
            });

        }, 25);
    }, 1500);
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