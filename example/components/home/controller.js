define(['lazoCtl', 'async'], function (LazoCtl, async) {

    'use strict';

    return LazoCtl.extend({

        index: function (options) {
            var self = this;

            async.parallel([
                function (callback) {
                    self.loadCollection('collection-example', {
                        success: function (collection) {
                            self.ctx.collections['collection-example'] = collection;
                            callback(null);
                        },
                        error: function (err) {
                            callback(err);
                        }
                    });
                },
                function (callback) {
                    self.loadCollection('model-example', {
                        success: function (model) {
                            self.ctx.models['model-example'] = model;
                            callback(null);
                        },
                        error: function (err) {
                            callback(err);
                        }
                    });
                }
            ], function (err, models) {
                if (err) {
                    return options.error(err);
                }

                options.success('a:react');
            });
        }

    });

});