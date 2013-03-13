/**
 * Created with JetBrains WebStorm.
 * User: Chris
 * Date: 2/28/13
 * Time: 7:05 AM
 * To change this template use File | Settings | File Templates.
 */
//Models

var adminView = {
    self:this,
    Navigation:function () {
        return{
            items:[
                {label:'Posts', items:[
                    {label:'New Post'},
                    {label:'Post List'}
                ]},
                {label:'Users', items:[
                    {label:'Create Users'}
                ]}
            ]
        }
    },
    PostEdit:function () {
        return{
            description:'',
            displayImageUrl:''
        }
    },


    //Commands
    commands:{
        openView:function () {
            api.getUsers({});
        },
        newUserEdit:function(){
            api.getNewUser();
        },
        saveUser:function(){
            var index = userlist.viewmodel.users().length-1;
            var options = {user:userlist.viewmodel.users()[index]};
            api.saveUser(options);
        }
    },
    //event handlers
    onGetUsersComplete:function(response){
        userlist.showListView(response.data.users);
    },
    onGetNewUserComplete:function(response){
        userlist.showNewUser(response.data.users[0]);
    },
    //operations replace with amplify
    loadNewPostView:function () {
        $.when($.get('frame', {name:'adminnewpost'})).then(function (data, textStatus, jqXHR) {
            console.log(data);
        });
    },


    loadDefaultView:function () {
        //postListControl.loadPostList();
    },
    viewmodel:null,
    model:{
        menu:null,
        userlist:null
    },
    init:function () {
        ko.bindingHandlers.uniqueId = {
            init:function (element, valueAccessor) {
                var value = valueAccessor();
                value.id = value.id || ko.bindingHandlers.uniqueId.prefix + (++ko.bindingHandlers.uniqueId.counter);

                element.id = value.id;
            },
            counter:0,
            prefix:"unique"
        };
        ko.bindingHandlers.uniqueFor = {
            init:function (element, valueAccessor) {
                var value = valueAccessor();
                value.id = value.id || ko.bindingHandlers.uniqueId.prefix + (++ko.bindingHandlers.uniqueId.counter);

                element.setAttribute("for", value.id);
            }
        };
        adminView.model.menu = new adminView.Navigation();
        userlist.commands.newuseredit = adminView.commands.newUserEdit;
        userlist.commands.saveuser = adminView.commands.saveUser;

        adminView.viewmodel = ko.mapping.fromJS(adminView.model);
        ko.applyBindings(adminView.viewmodel);



        api.onGetUsersComplete(adminView.onGetUsersComplete);
        api.onGetNewUserComplete(adminView.onGetNewUserComplete);
        //api.onSaveUserComplete(adminView.onGetNewUserComplete);
    }
}
$(function () {
    adminView.init()
});