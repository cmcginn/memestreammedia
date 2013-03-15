amplify.request.define( "api", "ajax", {
    url: "/api/{type}/{id}",
    dataType: "json",
    type: "GET"
});
amplify.request.define( "apipost", "ajax", {
    url: "/api/{type}",
    dataType: "json",
    type: "POST"
});
var api = {
    events : {
        getUsersComplete:'getUsersComplete',
        getNewUserComplete:'getNewUserComplete',
        saveUserComplete:'saveUserComplete'
    },
    onAllPostsComplete:function(callback){
        amplify.subscribe('onAllPostsComplete',callback);
    },
    onGetNewUserComplete:function(callback){
        amplify.subscribe(api.events.getNewUserComplete,callback);
    },
    onGetUsersComplete:function(callback){
        amplify.subscribe(api.events.getUsersComplete,callback);
    },
    onSaveUserComplete:function(callback){
      amplify.subscribe(api.events.saveUserComplete,callback);
    },
    getAllPosts:function(){
        amplify.request( "api",{type:'posts',id:''}, function( data ) {
            amplify.publish('onAllPostsComplete',{data:data});
        });
    },
    getUsers:function(options){
        amplify.request("api",{type:'users',id:options.id||null},function(data){
            amplify.publish(api.events.getUsersComplete,data);
        })
    },
    getNewUser:function(options){
        amplify.request("api",{type:'user'},function(data){
            amplify.publish(api.events.getNewUserComplete,data);
        })
    },
    saveUser:function(options){
         amplify.request("apipost",{type:'user',user:options.user},function(data){
            amplify.publish(api.events.saveUserComplete,data);
        })
    }
}