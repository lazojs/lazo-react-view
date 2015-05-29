define(['app/lazo-react-view/index', 'react', 'jsx!../components/HelloWorld'],
    function (LazoReactView, React, HelloWorld) {

   'use strict';

    return LazoReactView.extend({

        Container: HelloWorld,

        React: React

    });

});