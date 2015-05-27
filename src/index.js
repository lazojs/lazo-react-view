define(['lazoView', 'react', 'underscore'], function (LazoView, react, _) {

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

        initialize: function () {
            var self = this;
            if (LAZO.app.isServer) {
                return;
            }

            setTimeout(function () {
                if (self.ctl.name === 'home') {
                    self.render();
                }
            }, 2000);
        },

        render: function (options) {
            var self = this;
            if (LAZO.app.isServer || !this.el || !this.el.parentNode) {
                return;
            }

            this.serializeData({
                success: function (data) {
                    self.reactFactory(data);
                    // TODO: widget and child component re-rendering
                    for (var k in self.ctl.children) {
                        for (var i = 0; i < self.ctl.children[k].length; i++) {
                            self.ctl.children[k][i].currentView.render();
                        }
                    }

                    if (options && options.success) {
                        options.success();
                    }
                },
                error: function (err) {
                    throw err;
                }
            });
        },

        reactFactory: function (data) {
            // 'ref' is a key word
            react.render(ReactViewFactory(_.omit(data, 'ref')), this.el);
        },

        getInnerHtml: function (options) {
            this.serializeData({
                success: function (data) {
                    options.success(react.renderToString(ReactViewFactory(data)));
                },
                error: options.error
            });
        },

        delegateEvents: function () {
            var self = this;
            if (LAZO.app.isServer || !this.el || !this.el.parentNode) {
                return;
            }
            this.serializeData({
                success: function (data) {
                    self.reactFactory(data);
                },
                error: function (err) {
                    throw err;
                }
            });
        }

    });

});