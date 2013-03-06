/**
 * Created with JetBrains WebStorm.
 * User: Chris
 * Date: 3/6/13
 * Time: 4:48 AM
 * To change this template use File | Settings | File Templates.
 */
function PostEditControl(options){
  var self = this;
  this.options = options;
  this.post=options.post;
  _viewmodel=null;
}
PostEditControl.prototype.show=function(){
    ko.applyBindingsToNode($(Utils.String.format("#{0}.{1}",post.id,'postedit'))[0], { template:{ name:'postedit-template', data:this.post} });
}
PostEditControl.prototype.init=function(){
    ko.mapping.fromJS(this._viewmodel);
}
