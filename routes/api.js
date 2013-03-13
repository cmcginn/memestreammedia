/**
 * Created with JetBrains WebStorm.
 * User: Chris
 * Date: 3/4/13
 * Time: 5:54 AM
 * To change this template use File | Settings | File Templates.
 */
var dataservice = require("dataservice")
    , events = require('events')
    , Api = require("mockapi");

var api = new Api();
var mapper = new Api.Mapper();
var options = {api:api, mapper:mapper};
var ds = new dataservice(options);

var posts = {
    save:function (req, res) {
        res.send(200);
    },
    get:function (req, res) {
        res.send(200);
    }
}
var users = {
    get:function (req, res) {
        ds.once(ds.events.getUsers, function (data) {
            res.send(data, 200);
        });
        ds.getUsers();

    }

}
var user = {
    get:function (req, res) {
        ds.once(ds.events.getNewUser, function (data) {
            res.send(data, 200);
        });
        ds.getNewUser();

    },
    post:function (req, res) {
        ds.once(ds.events.saveUser, function (data) {
            res.send(data, 200);
        });
        ds.saveUser(req.body);
    }
}
exports.posts = posts;
exports.users = users;
exports.user = user;