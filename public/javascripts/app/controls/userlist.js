/**
 * Created with JetBrains WebStorm.
 * User: Chris
 * Date: 3/13/13
 * Time: 8:04 AM
 * To change this template use File | Settings | File Templates.
 */
var userlist = {
    viewmodel:null,
    model:{users:null},
    showListView:function(data){
        userlist.model.users = data;
        userlist.viewmodel = ko.mapping.fromJS(userlist.model);
        ko.applyBindingsToNode(document.getElementById('main'), { template:{ name:'userlist-template', data:userlist.viewmodel } });
    }
}