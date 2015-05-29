define(['lazoView', 'react', 'underscore'], function (LazoView, React, _) {

    'use strict';

    return LazoView.extend({

        constructor: function (options) {
            this.containerFactory = React.createFactory(React.createClass({
                handleClick: function (e) {
                    console.log(e);
                },

                render: function () {
                    var container = React.createElement('div', { 'lazo-cmp-container': 'child' });
                    var text = React.createElement('div', null, 'I am a view node.');
                    return React.createElement('div', { onClick: this.handleClick }, text, container);
                }
            }));

            LazoView.prototype.constructor.call(this, options);
        },

        getState: function () {
            return {
                models: this.ctl.ctx.models,
                collections: this.ctl.ctx.collections,
                assets: this.ctl.ctx.assets,
                data: this.ctl.ctx._rootCtx.data
            };
        },

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
            React.render(this.containerFactory(_.omit(data, 'ref')), this.el);
        },

        getInnerHtml: function (options) {
            var self = this;
            this.serializeData({
                success: function (data) {
                    options.success(React.renderToString(self.containerFactory(data)));
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