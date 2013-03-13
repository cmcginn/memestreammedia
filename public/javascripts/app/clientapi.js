amplify.request.define( "api", "ajax", {
    url: "/api/{type}/{id}",
    dataType: "json",
    type: "GET"
});

var api = {
    events : {
    getUsersComplete:'getUsersComplete'
    },
    onAllPostsComplete:function(callback){
        amplify.subscribe('onAllPostsComplete',callback);
    },
    onGetUsersComplete:function(callback){
        amplify.subscribe(api.events.getUsersComplete,callback);
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
    }
}