var mongo = require('mongodb');
var monk = require('monk');
var bcrypt = require('bcrypt');
var db = monk('localhost:27017/chatserver');
var usercol = db.get("users");

function addUser(username, password, callback) {
    bcrypt.hash(password, 10, function(err, hash) {
        if(err) return callback(err);
        usercol.insert({"username": username, "hash": hash}, function (err, doc) {
            if (err) {
                return callback(err);
            }
            else {
                console.log('new user added');
                callback();
            }
        });
    });
}

function authenticate(username, password, callback) {
    usercol.find({"username": username},{"hash": 1}, function(e,docs){
        if (e) return callback(e);
        bcrypt.compare(password, docs[0].hash, function(err, res) {
            if (err) return callback(err);
            if (res) callback(null, docs);
            else callback(null, null);
        });
    });
}

module.exports.addUser = addUser;
module.exports.authenticate = authenticate;