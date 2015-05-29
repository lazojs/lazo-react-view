define(['lazoView'], function (LazoView) {

    'use strict';

    return LazoView.extend({

        constructor: function (options) {
            if (!this.React) {
                throw new Error('lazo-react-view: React must be defined, <lazo-react-view>.React');
            }
            if (!this.Container) {
                throw new Error('lazo-react-view: A React Container component must be defined, <lazo-react-view>.Container');
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
            this.ContainerFactory = this.React.createFactory(this.Container);
            this.container = this.ContainerFactory(this.getContainerState());
        },

        getContainerState: function () {
            return {
                view: this,
                // extended backbone models
                models: this.ctl.ctx.models,
                // extended backbone collections
                collections: this.ctl.ctx.collections,
                // constants:
                // https://github.com/lazojs/lazo/wiki/Assets
                assets: this.ctl.ctx.assets,
                // wrapper API for this hash:
                // https://github.com/lazojs/lazo/blob/v2/docs/LazoController.md#setshareddatakey-val
                // there is also a getSharedData;
                // TODO: need a way to keep these in sync; add an on setSharedData event to this view???
                data: this.ctl.ctx._rootCtx.data
            };
        },

        render: function (options) {
            if (LAZO.app.isServer || !this.el || !this.el.parentNode) {
                return;
            }

            options.success = options.success || function () {};
            options.error = options.error || function (err) {
                throw err;
            };
            try {
                options.success(this.React.render(this.container, this.el));
            } catch (e) {
                options.error(e);
            }
        },

        getInnerHtml: function (options) {
            try {
                options.success(this.React.renderToString(this.container));
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
        },

        // TODO: react specific clean up goes here
        onRemove: function () {

        }

    });

});