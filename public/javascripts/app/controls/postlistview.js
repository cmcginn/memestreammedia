function PostList() {
    return{
        postlist:[
            {displayUrl:'http://rack.3.mshcdn.com/media/ZgkyMDEyLzEyLzA0LzUzL3RoZXRvcDEwbWVtLmJpSi5qcGcKcAl0aHVtYgk5NTB4NTM0IwplCWpwZw/d16af8ca/356/the-top-10-memes-of-the-olympics-will-impress-even-mckayla-6396d0255e.jpg', description:'England Thing'},
            {displayUrl:'http://s6.favim.com/orig/61/funny-quotes-funny-images-funny-memes-2013-derp-and-derpina-funny-animals-with-sayings-Favim.com-604405.jpg', description:'Mom Humor'}
        ]
    }
}

var postListControl = {
//Commands
    Commands:(function () {
        Commands = {
            openView:function (sender, options) {
                var data = ko.toJS(sender);
                switch (data.label) {
                    case 'New Post':
                        loadNewPostView();
                        break;
                    default:
                        break;
                }
            }
        }
        Commands.execute = function (name) {
            return Commands[name] && Commands[name].apply(Commands, [].slice.call(arguments, 1));
        };
    }()),
    posts:null,
    loadPostList:function () {
        api.getAllPosts();
    },
    onAllPostsComplete:function(result){
        posts = result.data;
        var postViewModel = ko.mapping.fromJS(posts);
        ko.applyBindingsToNode(document.getElementById('main'), { template:{ name:'adminpostlist-template', data:postViewModel} });
    },
    init:function(){
        api.onAllPostsComplete(this.onAllPostsComplete);
    }
}

