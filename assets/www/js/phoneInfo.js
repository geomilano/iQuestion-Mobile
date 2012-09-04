var phoneInfo = function(){};

phoneInfo.prototype.getmsisdn = function(onSuccess, onFail){
    return cordova.exec(onSuccess, onFail, 'phoneInfo', 'getmsisdn', []);
};

phoneInfo.prototype.getcountry = function(onSuccess, onFail){
    return cordova.exec(onSuccess, onFail, 'phoneInfo', 'getcountry', []);
};

phoneInfo.prototype.getSimSerialNumber = function(onSuccess, onFail){
    return cordova.exec(onSuccess, onFail, 'phoneInfo', 'getSimSerialNumber', []);
};
phoneInfo.prototype.getNetworkOperatorName = function(onSuccess, onFail){
    return cordova.exec(onSuccess, onFail, 'phoneInfo', 'getNetworkOperatorName', []);
};
phoneInfo.prototype.getSubscriberId = function(onSuccess, onFail){
    return cordova.exec(onSuccess, onFail, 'phoneInfo', 'getSubscriberId', []);
};
phoneInfo.prototype.getDeviceId = function(onSuccess, onFail){
    return cordova.exec(onSuccess, onFail, 'phoneInfo', 'getDeviceId', []);
};

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.phoneInfo) {
    window.plugins.phoneInfo = new phoneInfo();
}