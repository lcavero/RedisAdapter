/**
 * Created by lcavero on 20/02/18.
 */
module.exports = Adapter;

function Adapter(redis_client, prefix){
    if(redis_client.constructor.name != 'RedisClient'){
        var type;

        if(typeof redis_client === 'object'){
            type = redis_client.constructor.name;
        }else{
            type = typeof redis_client;
        }
        console.error('node-redis-adapter Adapter expects the Redis Client instance, ' + type + ' was received. Adapter disabled.');
        return;
    }

    if(!prefix){
        console.warn('You don\'t set a prefix, "df" prefix will be used');
        prefix = 'df';
    }

    let replaceNulls = function(data) {
        if(typeof data == "object"){
            for(var i in data){
                data[i] = replaceNulls(data[i]);
            }
        }else if(typeof data === 'string'){
            if(data === 'null' || data === 'undefined'){
                data = null;
            }
        }

        return data;
    };

    redis_client.set = (function () {
        var cached_function = redis_client.set;
        return function () {
            if(Array.isArray(arguments[0])){
                arguments[0][0] = prefix + '-' + arguments[0][0];
            }else{
                arguments[0] = prefix + '-' + arguments[0];
            }
            return cached_function.apply(this, arguments);
        }
    })();

    redis_client.hset = (function () {
        var cached_function = redis_client.hset;
        return function () {
            if(Array.isArray(arguments[0])){
                arguments[0][0] = prefix + '-' + arguments[0][0];
            }else{
                arguments[0] = prefix + '-' + arguments[0];
            }
            return cached_function.apply(this, arguments);
        }
    })();

    redis_client.hmset = (function () {
        var cached_function = redis_client.hmset;
        return function () {
            if(Array.isArray(arguments[0])){
                arguments[0][0] = prefix + '-' + arguments[0][0];
            }else{
                arguments[0] = prefix + '-' + arguments[0];
            }
            return cached_function.apply(this, arguments);
        }
    })();

    redis_client.get = (function () {
        var cached_function = redis_client.get;
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
                        let new_args = replaceNulls(args);
                        return old.apply(old, new_args);
                    };
                }
            }
            return cached_function.apply(this, new_arguments);
        }
    })();

    redis_client.getAsync = (function () {
        var cached_function = redis_client.getAsync;
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
                        let new_args = replaceNulls(args);
                        return old.apply(old, new_args);
                    };
                }
            }
            return cached_function.apply(this, new_arguments);
        }
    })();

    redis_client.hgetall = (function () {
        var cached_function = redis_client.hgetall;
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
                        let new_args = replaceNulls(args);
                        return old.apply(old, new_args);
                    };
                }
            }
            return cached_function.apply(this, new_arguments);
        }
    })();

    redis_client.hkeys = (function () {
        var cached_function = redis_client.hkeys;
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
                        let new_args = replaceNulls(args);
                        return old.apply(old, new_args);
                    };
                }
            }
            return cached_function.apply(this, new_arguments);
        }
    })();
}