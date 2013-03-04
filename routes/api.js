/**
 * Created with JetBrains WebStorm.
 * User: Chris
 * Date: 3/4/13
 * Time: 5:54 AM
 * To change this template use File | Settings | File Templates.
 */
/*models*/
var models=require('../public/javascripts/app/mock/models/mockmodels.js')
var postListModel={}

var posts = {
    save:function(req,res){
        res.send(200);
    },
    get:function(req,res){
        res.send(200,models.posts);
    }
}
exports.posts = posts;