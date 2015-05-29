define(['react'], function (React) {

    return React.createClass({

        onClick: function (e) {
            console.log(e);
            this.props.view.render({
                success: function (container) {
                    console.log(container);
                }
            });
        },

        render: function () {
            return <h1 onClick={this.onClick}>Hello World!</h1>;
        }
    });

});