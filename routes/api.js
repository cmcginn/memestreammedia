/**
 * Created with JetBrains WebStorm.
 * User: Chris
 * Date: 3/1/13
 * Time: 6:50 AM
 * To change this template use File | Settings | File Templates.
 */
var rdfstore = require('rdfstore')
    ,schema = require('../public/javascripts/app/schema.js')
    ,api=require('../public/javascripts/app/rdfapi.js');
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


exports.save = function (req, res) {
    var post = new api.RDFType(store,'BlogPosting','posts');
    post.create({name:'AboutDogs',callback:function(s,r){
        if (s)
            res.send(200, {success:true});
        else
            res.send(500, {success:e, response:r});
    }});

}
exports.getPost = function (req, res) {
    var post = new api.RDFType(store,'BlogPosting','posts');
    post.get({name:'AboutDogs',callback:function(s,r){
         if (s)
            res.send(200, {success:true, response:r});
        else
            res.send(500, {success:s, response:r});
    }});

}