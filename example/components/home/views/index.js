define(['app/lazo-react-view/index', 'react', 'jsx!../ui-components/HelloWorld'],
    function (LazoReactView, React, HelloWorld) {

   'use strict';

    return LazoReactView.extend({

        Container: HelloWorld,

        React: React

    });

});