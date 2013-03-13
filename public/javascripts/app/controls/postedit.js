/**
 * Created with JetBrains WebStorm.
 * User: Chris
 * Date: 3/6/13
 * Time: 4:48 AM
 * To change this template use File | Settings | File Templates.
 */
!function ($) {

    "use strict"; // jshint ;_;
    var PostEdit = function (element, options) {
        var self = this;
        this.options = options;
        this.element = element;
        this.post = options.post;
        this.init('postedit', element, options)
    };
    PostEdit.prototype = {
        show:function () {
            ko.applyBindingsToNode(this.element[0], { template:{ name:'postedit-template', data:this.post} });
        }
    };

    var old = $.fn.postedit

    $.fn.postedit = function (option) {
        return this.each(function () {
            var self = $(this)
                , data = self.data('postedit')
                , options = $.extend({}, $.fn.postedit.defaults, typeof option == 'object' && option)
                , action = typeof option == 'string' ? option : options.slide
        });
    };

    $.fn.postedit.Constructor = PostEdit;
    /* PostEdit NO CONFLICT
     * ==================== */

    $.fn.postedit.noConflict = function () {
        $.fn.postedit = old
        return this
    }
}(window.jQuery);

