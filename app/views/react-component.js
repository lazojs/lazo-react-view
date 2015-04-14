define(['react'], function(react) {

    var ReactViewFactory = react.createClass({

        render: function () {
            return jsx.transform('I am the view text.');
        }

    });

});