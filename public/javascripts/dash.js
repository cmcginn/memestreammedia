/**
 * Created with JetBrains WebStorm.
 * User: Chris
 * Date: 2/27/13
 * Time: 5:36 AM
 * To change this template use File | Settings | File Templates.
 */

$(function () {

    $('#post').click(function (e) {

            var options = {callback:function (data) {
                console.log(data);
                $('#accessToken').val(data.authResponse.accessToken);
                $('#uid').val(data.authResponse.uid);
            }};
            getLoggedIn(options);

    });
});
