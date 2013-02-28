/**
 * Created with JetBrains WebStorm.
 * User: Chris
 * Date: 2/28/13
 * Time: 7:05 AM
 * To change this template use File | Settings | File Templates.
 */

function Navigation() {
    return{
        items:[
            {label:'Posts', items:[
                {label:'New Post'},
                {label:'Post List'}
            ]},
            {label:'Users', items:[
                {label:'Create Users'}
            ]}
        ]
    }
}
var Commands;
(function () {
    Commands = {
        openView:function (sender, options) {
            console.log(sender);
        }
    }
    Commands.execute = function (name) {
        return Commands[name] && Commands[name].apply(Commands, [].slice.call(arguments, 1));
    };
}());


var viewmodel;
var model = {
    menu:null
}

$(function () {
    ko.bindingHandlers.uniqueId = {
        init:function (element, valueAccessor) {
            var value = valueAccessor();
            value.id = value.id || ko.bindingHandlers.uniqueId.prefix + (++ko.bindingHandlers.uniqueId.counter);

            element.id = value.id;
        },
        counter:0,
        prefix:"unique"
    };
    ko.bindingHandlers.uniqueFor = {
        init:function (element, valueAccessor) {
            var value = valueAccessor();
            value.id = value.id || ko.bindingHandlers.uniqueId.prefix + (++ko.bindingHandlers.uniqueId.counter);

            element.setAttribute("for", value.id);
        }
    };
    model.menu = new Navigation();
    viewmodel = ko.mapping.fromJS(model);
    ko.applyBindings(viewmodel);
    $('*[command]').each(function (item) {
        $(this).click(function () {
            Commands.execute($(this).attr('command'), ko.dataFor(this));
        });

    });
});

