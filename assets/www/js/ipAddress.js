var ipAddress = function(){};

ipAddress.prototype.getipaddress = function(onSuccess, onFail){
    return cordova.exec(onSuccess, onFail, 'ipAddress', 'getipaddress', []);
};


if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.ipAddress) {
    window.plugins.ipAddress = new ipAddress();
}