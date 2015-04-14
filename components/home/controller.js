define(['lazoCtl'], function (LazoCtl) {

    'use strict';

    return LazoCtl.extend({

        index: function (options) {
            this.addChild('child', 'child', {
                success: function () {
                    options.success('a:react');
                },
                error: function (err) {
                    options.error(err)
                }
            });
        }

    });

});