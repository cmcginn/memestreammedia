/**
 * Created with JetBrains WebStorm.
 * User: Chris
 * Date: 3/6/13
 * Time: 7:23 AM
 * To change this template use File | Settings | File Templates.
 */
ko.bindingHandlers.uniqueId = {
            init:function (element, valueAccessor) {
                var value = valueAccessor();
                value.id = value.id || ko.bindingHandlers.uniqueId.prefix + (++ko.bindingHandlers.uniqueId.counter);

                element.id = value.id;
            },
            counter:0,
            prefix:"unique"
        };