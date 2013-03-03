var schema = require('./schema.js');
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

var baseUri = 'http://memestreammedia.com';
var RDFType = function(store,name,collection){
    var self = this;
    schema.Type.call(this,name);
    _graph = store.rdf.createGraph();
    _store = store;
    _graphUri = Utils.String.format("{0}/{1}",baseUri,collection);
    _createTriples = function(p,o){
        var subject = store.rdf.createNamedNode(self.properties.url);
        var predicate = store.rdf.createNamedNode(p);
        var object = store.rdf.createNamedNode(o);
        var triple = store.rdf.createTriple(subject, predicate, object);
        return triple;
    }
	_createProperty = function(p,l){
		var subject = store.rdf.createNamedNode(self.properties.url);
        var predicate = store.rdf.createNamedNode(p);
        var object = store.rdf.createLiteral(l);
        var triple = store.rdf.createTriple(subject, predicate, object);
		return triple;
	}
}
RDFType.prototype.create=function(options){
    this.properties.url = Utils.String.format('{0}/{1}',_graphUri,options.name);
    var triple = _createTriples('rdf:type',this.uri);
    _graph.add(triple);

	for(x in this.properties)
	{
		if(this.properties[x]!=null && x != 'url')
			_graph.add(_createProperty(x,this.properties[x]));

	}
	_store.insert(_graph,_graphUri,options.callback);
}
RDFType.prototype.get=function(options){
        console.log(Utils.String.format('{0}/{1}',_graphUri,options.name));
		if(options.name)
			_store.node(Utils.String.format('{0}/{1}',_graphUri,options.name),_graphUri,options.callback);
		else
			_store.graph(_graphUri,options.callback);

}
exports.RDFType = RDFType;