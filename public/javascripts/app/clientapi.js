amplify.request.define( "api", "ajax", {
    url: "/api/{type}/{id}",
    dataType: "json",
    type: "GET"
});

var api = {
    onAllPostsComplete:function(callback){
        amplify.subscribe('onAllPostsComplete',callback);
    },
    getAllPosts:function(){
        amplify.request( "api",{type:'posts',id:''}, function( data ) {
            amplify.publish('onAllPostsComplete',{data:data});
        });
    }
}