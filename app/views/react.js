define(['lazoView', 'react'], function (LazoView, react) {

    'use strict';

    var ReactViewFactory = react.createFactory(react.createClass({

        handleClick: function (e) {
            console.log(e);
        },

        render: function () {
            var container = react.createElement('div', { 'lazo-cmp-container': 'child' });
            var text = react.createElement('div', null, 'I am a view node.');
            return react.createElement('div', { onClick: this.handleClick }, text, container);
        }

    }));

    return LazoView.extend({

        getInnerHtml: function (options) {
            options.success(react.renderToString(ReactViewFactory({})));
        },

        delegateEvents: function () {
            if (LAZO.app.isServer || !this.el.childNodes[0]) {
                return;
            }

            react.render(ReactViewFactory({}), this.el);
        }

    });

});