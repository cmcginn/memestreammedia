/**
 * Created with JetBrains WebStorm.
 * User: Chris
 * Date: 2/24/13
 * Time: 5:47 AM
 * To change this template use File | Settings | File Templates.
 */



     window.fbAsyncInit = function () {
            // init the FB JS SDK
            FB.init({
                appId:'480063922046740', // App ID from the App Dashboard
                channelUrl:'http://www.memestreammedia.com/channel.html',
                status:true, // check the login status upon init?
                cookie:true, // set sessions cookies to allow your server to access the session?
                xfbml:true  // parse XFBML tags on this page?
            });

            getLoggedIn();
            // Additional initialization code such as adding Event Listeners goes here

        };

        // Load the SDK's source Asynchronously
        // Note that the debug version is being actively developed and might
        // contain some type checks that are overly strict.
        // Please report such bugs using the bugs tool.
        (function (d, debug) {
            var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement('script');
            js.id = id;
            js.async = true;
            js.src = "http://connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
            ref.parentNode.insertBefore(js, ref);
        }(document));

/* custom client methods */
var uid;
var accessToken;
var granted = false;
function getLoggedIn(options) {
    var options = options || {};
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            // the user is logged in and has authenticated your
            // app, and response.authResponse supplies
            // the user's ID, a valid access token, a signed
            // request, and the time the access token
            // and signed request each expire
            uid = response.authResponse.userID;
            accessToken = response.authResponse.accessToken;
            if(options.callback)
                options.callback(response);

        } else if (response.status === 'not_authorized') {
            // the user is logged in to Facebook,
            // but has not authenticated your app
            grantApp(options);
        } else {
            fbLogin(options);
        }
    });
    granted = true;
}
function grantApp(options) {

    FB.ui(
        {
            method:'oauth',
            clientId:'480063922046740',
            name:'The Facebook SDK for Javascript',
            caption:'Bringing Facebook to the desktop and mobile web',
            description:(
                'A small JavaScript library that allows you to harness ' +
                    'the power of Facebook, bringing the user\'s identity, ' +
                    'social graph and distribution power to your site.'
                ),
            link:'https://developers.facebook.com/docs/reference/dialogs/'

        },
        function (response) {
            console.log(response);
       if(options.callback)
                coptions.callback(response);
        }
    );
}
function fbLogin(options) {
    FB.login(function (response) {
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function (response) {
                console.log('Good to see you, ' + response.name + '.');

            });

        } else {

            console.log('User cancelled login or did not fully authorize.');
        }

         if(options.callback)
                coptions.callback(response);
    });
}