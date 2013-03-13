/**
 * Created with JetBrains WebStorm.
 * User: Chris
 * Date: 3/1/13
 * Time: 6:50 AM
 * To change this template use File | Settings | File Templates.
 */
var rdfstore = require('rdfstore')
    , schema = require('../node_modules/schema/lib/schema.js')
    , api = require('../public/javascripts/app/rdfapi.js');
var store;
new rdfstore.Store({persistent:true,
    engine:'mongodb',
    name:'test', // quads in MongoDB will be stored in a DB named myappstore
    overwrite:false, // delete all the data already present in the MongoDB server
    mongoDomain:'localhost', // location of the MongoDB instance, localhost by default
    mongoPort:27017 // port where the MongoDB server is running, 27017 by default
}, function (s) {
    graph = s.rdf.createGraph();
    store = s;
});
function apiPost(type,collection,req,res){
    var name = req.params[0];
        var post = new api.RDFType(store, type, collection);
        post.create({name:name, callback:function (s, r) {
            if (s)
                res.send(200, {success:true});
            else
                res.send(500, {success:e, response:r});
        }});
}
function apiGet(type,collection,req,res){
        var name = req.params[0];
        var d = new api.RDFType(store, type,collection);
        d.get({name:name, callback:function (s, r) {
            if (s)
                res.send(200, {success:true, response:r});
            else
                res.send(500, {success:s, response:r});
        }});
}
var posts = {
    save:function(req,res){apiPost('BlogPosting','posts',req,res)},
    get:function(req,res){apiGet('BlogPosting','posts',req,res)}
}

exports.posts = posts;
