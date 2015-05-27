define(['lazoServer'], function (LazoServer) {

    'use strict';

    return LazoServer.extend({
        // register good with lazo server pack
        // hapi - a reference to the hapi module itself
        // pack - the lazo server pack
        // servers - the servers that belong to the lazo pack
        // options.success and options.error
        setup: function (hapi, pack, servers, options) {
            for (var k in servers) {
                // debugging
                servers[k].on('internalError', function (req, err) {
                    console.log(err.stack);
                });
            }

            options.success();
        }
    });

});