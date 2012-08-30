var phoneInfo = function(){};

phoneInfo.prototype.get = function(onSuccess, onFail){
    return cordova.exec(onSuccess, onFail, 'phoneInfo', 'get', []);
};

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.phoneInfo) {
    window.plugins.phoneInfo = new phoneInfo();
}