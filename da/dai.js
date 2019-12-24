/**
 * Created by kuan on 2018/8/27.
 * Modified by Li-Xian Chen 2019/3/15
 */
var EventEmitter = require('events').EventEmitter; 
var event = new EventEmitter(); 

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

var dai = function (mac, no) {

    var dan = require('./dan').dan(),
        config = require('./config');

    var deregister = function () {
        dan.deregister();
    };

    var register = function (callback, forcePull) {

        var pull = function (ODFName, data) {
            event.emit('pull', {odf: ODFName, data: data});
        };

        dan.init(pull, "http://iottalk.niu.edu.tw:9999", mac, {
            'dm_name': 'XmasTree',
            'd_name': no.toString() + ".XmasTree",
            'u_name': 'yb',
            'is_sim': false,
            'df_list': ["xmas_tree_idf", "xmas_tree_odf"]

        }, function (result) {
            console.log(mac, ' has successfully registered on : ', result);
            event.emit('registered');
            if(isFunction(callback)) {
                callback();
            }
            // //deregister when app is closing
            // process.on('exit', dan.deregister);
            // //catches ctrl+c event
            // process.on('SIGINT', function () {
            //     dan.deregister(function () {
            //         process.exit(1);
            //     });
            // });
            // //catches uncaught exceptions
            // process.on('uncaughtException', dan.deregister);
        }, forcePull);

    };

    var push = function(idf, data) {
        dan.push(idf, [data]);
    }

    var push = function (idf_name, data) {
        dan.push(/*"xmas_tree_idf"*/idf_name, [data]);
    };

    var getMac = function () {
        return mac;
    };

    var up = function() {
        dan.up();
    }

    var down = function() {
        dan.down();
    }

    var on = function(name, cb) {
        event.on(name, cb);
    }

    return {
        register: register,
        deregister: deregister,
        push: push,
        mac: getMac(),
        up : up,
        down : down,
        on: on
    }
};

//module.exports = dai;
exports.dai = dai;