/**
 * Created with JetBrains WebStorm.
 * User: Chris
 * Date: 2/28/13
 * Time: 6:48 AM
 * To change this template use File | Settings | File Templates.
 */
exports.admin = function(req, res){
  res.render('admin', { title: 'Administration' });
};