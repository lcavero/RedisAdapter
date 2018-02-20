/**
 * Created by lcavero on 20/02/18.
 */
var redis = require('redis');

module.exports = Adapter;

function Adapter(prefix){
    if(!prefix){
        prefix = 'df';
    }

    redis.RedisClient.prototype.hmset = (function () {
        var cached_function = redis.RedisClient.prototype.hmset;

        return function () {
            if(Array.isArray(arguments[0])){
                arguments[0][0] = prefix + '-' + arguments[0][0];
            }else{
                arguments[0] = prefix + '-' + arguments[0];
            }
            return cached_function.apply(this, arguments);
        }
    })();

    redis.RedisClient.prototype.hgetall = (function () {
        var cached_function = redis.RedisClient.prototype.hgetall;

        return function () {
            if(Array.isArray(arguments[0])){
                arguments[0][0] = prefix + '-' + arguments[0][0];
            }else{
                arguments[0] = prefix + '-' + arguments[0];
            }

            var new_arguments = Array.prototype.slice.call(arguments);

            for(var i in new_arguments){
                if(typeof new_arguments[i] === 'function'){
                    var old = new_arguments[i];

                    new_arguments[i] = function () {
                        var args = Array.prototype.slice.call(arguments);
                        let new_args = this.replaceNulls(args);
                        return old.apply(old, new_args);
                    };
                }
            }
            return cached_function.apply(this, new_arguments);
        }
    })();

    this.replaceNulls = function(data) {
        if(typeof data == "object" || typeof data == "array"){
            for(var i in data){
                data[i] = replaceNulls(data[i]);
            }
        }else if(typeof data === 'string'){
            if(data === 'null' || data === 'undefined'){
                data = null;
            }
        }

        return data;
    }
}