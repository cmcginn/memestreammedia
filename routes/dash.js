/**
 * Created with JetBrains WebStorm.
 * User: Chris
 * Date: 2/27/13
 * Time: 5:33 AM
 * To change this template use File | Settings | File Templates.
 */

var FB = require('fb'),
    fs = require('fs');
var oauthResponse = null;
var accessToken;
var expires;
var authorizationCode = null;
var state = null;
function log(message) {
    fs.appendFile('message.txt', '\n' + message, function (err) {
        if (err) throw err;
    });
}
function testAccess() {
    log('test using access token' + accessToken);
    FB.api('/me', {
        access_token:accessToken
    }, function (res) {
        if (!res || res.error) {
            log('exchange error occured' + JSON.stringify(res));
            return;
        } else {
            log('success:' + JSON.stringify(res));
        }
    });
}
function exchangeAccess() {
    FB.api('oauth/access_token', {
        client_id:'480063922046740',
        client_secret:'d73a40715717bb3720ea3dcff5111320',
        redirect_uri:'http://www.memestreammedia.com/dash',
        code:authorizationCode
    }, function (res) {
        if (!res || res.error) {
            log('exchange error occured' + JSON.stringify(res));
            return;
        }

        accessToken = res.access_token;
        expires = res.expires ? res.expires : 0;
        log('exchangeAccess' + JSON.stringify(res));

        testAccess();
        doPost();
    });
}
function getAuthorization() {
    FB.api('oauth/authorize', {
        client_id:'480063922046740',
        client_secret:'d73a40715717bb3720ea3dcff5111320',
        redirect_uri:'http://memestreammedia.com/authorization'
    }, function (res) {
        if (!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
        } else {
            console.log(res);
        }
        /*if (options.callback)
         options.callback(res);*/
    });
}
function getOauth() {
    var FB = require('fb');

    FB.api('oauth/access_token', {
        client_id:'480063922046740',
        client_secret:'d73a40715717bb3720ea3dcff5111320',
        grant_type:'client_credentials'
    }, function (res) {
        if (!res || res.error) {
            log('access error');
            return;
        }
       log('failed:' + JSON.stringify(res));
       accessToken = res.access_token;
       testAccess();
       doPost();
    });
}
function doPost() {
    var FB = require('fb');
    FB.setAccessToken('access_token');

    var body = 'My first post using facebook-node-sdk';
    FB.api('me/feed', 'post', { message:body, access_token:accessToken}, function (res) {
        if (!res || res.error) {
            log('PostError:' + JSON.stringify(res));
        }
    });
}

exports.authorization = function (req, res) {
    log('authorization:' + JSON.stringify(req));
    res.send(200);
}
exports.dashToken = function (req, res) {
    log('dashToken ' + JSON.stringify(req));
    res.send(200);
}
exports.dash = function (req, res) {
    getOauth();
    /*log('dash:' + req);
    authorizationCode = req.param('code');
    state = req.param('state');
    if (state == 'token')
        exchangeAccess();*/

    res.render('dash', { title:'Dashboard' });

};
exports.dashPost = function (req, res) {
    var options = {callback:function (response) {
        res.render('dash', { title:JSON.stringify(response) });
    }};
    getOauth(options);
    /* var postId = 0;
     var options = {accessToken:req.param('accessToken'),callback:function(response){
     postId = response.id;
     res.render('dash', { title:JSON.stringify(response) });
     }}
     doPost(options);*/

};