define(['lazoSyncher'], function (LazoSyncher) {

    'use strict';

    return LazoSyncher.extend({

        fetch: function (options) {
            return options.success([
                { fname: 'Rick', lname: 'Sanchez' },
                { fname: 'Jerry', lname: 'Smith' }
            ]);
        }

    });

});