/**
 * Created with JetBrains WebStorm.
 * User: Chris
 * Date: 3/1/13
 * Time: 5:01 AM
 * To change this template use File | Settings | File Templates.
 */
exports.frame=function(req,res){
    //var name = req.param('name');
    //res.render(name,{frameSource:name});
    res.render('frame');
}
exports.framesource=function(req,res){
    res.render('blanklayout');
}