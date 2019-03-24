/**
 * Created by kuan on 2018/8/27.
 * Modified by Li-Xian Chen 2019/3/15
 */
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
            console.log(ODFName, data)
        };

        dan.init(pull, "http://iottalk.niu.edu.tw", mac, {
            'dm_name': 'XmasTree',
            'd_name': no.toString() + ".Voting",
            'u_name': 'yb',
            'is_sim': false,
            'df_list': ["xmas_tree_idf", "xmas_tree_odf"]

        }, function (result) {
            console.log(mac, ' has successfully registered on : ', result);
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

    var push = function (data) {
        dan.push("xmas_tree_idf", [JSON.stringify(data)]);
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

    return {
        register: register,
        deregister: deregister,
        push: push,
        mac: getMac(),
        up : up,
        down : down
    }
};

exports.dai = dai;