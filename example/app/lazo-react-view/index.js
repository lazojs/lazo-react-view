define(['lazoView'], function (LazoView) {

    'use strict';

    return LazoView.extend({

        constructor: function (options) {
            if (!this.React) {
                throw new Error('lazo-react-view: React must be defined, <lazo-react-view>.React');
            }
            if (!this.Container) {
                throw new Error('lazo-react-view: A Reacr Container component must be defined, <lazo-react-view>.Container');
            }
            LazoView.prototype.constructor.call(this, options);
            this.createContainer();
        },

        createContainer: function () {
            // expects this.Container to be a react components with
            // a render function that passes state properties to
            // stateless components; the container component should be
            // extended with functionality similar to https://github.com/magalhas/backbone-react-component
            // should set this.container to this.Container instance
            this.container = this.React.createFactory(this.Container);
        },

        getContainerState: function () {
            return {
                // extended backbone models
                models: this.ctl.ctx.models,
                // extended backbone collections
                collections: this.ctl.ctx.collections,
                // read only:
                // https://github.com/lazojs/lazo/wiki/Assets
                assets: this.ctl.ctx.assets,
                // wrapper API for this hash:
                // https://github.com/lazojs/lazo/blob/v2/docs/LazoController.md#setshareddatakey-val
                // there is also a getSharedData
                data: this.ctl.ctx._rootCtx.data
            };
        },

        render: function (options) {
            if (LAZO.app.isServer || !this.el || !this.el.parentNode) {
                return;
            }

            options.success = options.success || function () {};
            options.error = options.error || function () {};
            try {
                this.React.render(this.container(this.getContainerState()), this.el);
                // TODO:
                // typically the HTML string is passed to success
                // doesn't really add much value, but we should probably pass
                // it or the container instance just for consistency
                options.success();
            } catch (e) {
                options.error(e);
            }
        },

        getInnerHtml: function (options) {
            try {
                options.success(this.React.renderToString(this.container(this.getContainerState())));
            } catch (e) {
                options.error(e);
            }
        },

        delegateEvents: function () {
            if (LAZO.app.isServer || !this.el || !this.el.parentNode) {
                return;
            }

            this.render({
                error: function (err) {
                    throw err;
                }
            });
        }

    });

});