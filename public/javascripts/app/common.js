/**
 * Created with JetBrains WebStorm.
 * User: Chris
 * Date: 3/6/13
 * Time: 5:38 AM
 * To change this template use File | Settings | File Templates.
 */
var Utils = {
    String:{
        format:function () {
            var s = arguments[0];
            for (var i = 0; i < arguments.length - 1; i++) {
                var reg = new RegExp("\\{" + i + "\\}", "gm");
                s = s.replace(reg, arguments[i + 1]);
            }

            return s;
        }
    }
};