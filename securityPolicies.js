// Acepta la conexión validando usuario y contraseña
let authenticate = function(client, username, password, callback) {
    var authorized = username === 'root' && password.toString('utf8') === 'passw';
    if (authorized) client.user = username;
    callback(null, authorized);
}


let authorizePublish = function(client, topic, payload, callback) {
    callback(null, client.user == topic.split("/")[1]);
}


let authorizeSubscribe = function(client, topic, callback) {
    callback(null, client.user == topic.split("/")[1]);
}

module.exports = {
    authenticate: authenticate,
    authorizePublish: authorizePublish,
    authorizeSubscribe: authorizeSubscribe
    }