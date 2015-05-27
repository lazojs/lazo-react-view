define(['lazoSyncher'], function (LazoSyncher) {

    'use strict';

    return LazoSyncher.extend({

        fetch: function (options) {
            return options.success({
                fname: 'Morty',
                lname: 'Smith'
            });
        }

    });

});