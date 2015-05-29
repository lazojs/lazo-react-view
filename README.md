# lazo-react-view
The `lazo-react-view` is designed to integrate [React](https://facebook.github.io/react/) with
[Lazo](http://lazojs.org/) at the view level. The Lazo view acts as a bridge to a
[React container component](https://medium.com/@learnreact/container-components-c0e67432e005).

> The React container component is the entry point to React land. You CANNOT add Lazo child
components, views, widgets, etc. beneath the React container component!

## Open Design Issues and Tasks

* Syncing React component `props` with Lazo data sources, e.g.,
[backbone-react-component](https://github.com/magalhas/backbone-react-component).
* More robust example (TodoMVC???)
  * Incorporate assets
  * Render model, collection and assets data
  * Add stateless React components as children of the container component
  * DOM events and data changes that trigger re-rendering

## Example
An example usaged can be found in `.example/`.

### Running the Example

Install:

```shell
npm install
```

Start the Lazo server:

```shell
npm start
```

Open browser:

[http://localhost:8080/](http://localhost:8080/)

### Overview
The example leverages [jsx-requirejs-plugin](https://github.com/philix/jsx-requirejs-plugin)
loader plugin to load AMD modules that contain [JSX](https://facebook.github.io/jsx/). This
plugin and React are pulled in via [Bower](http://bower.io/) (See [`bower.json`](bower.json) and
[`.bowerrc`](.bowerrc)).

The [RequireJS](http://requirejs.org/) configuration for these is in
[`./example/conf.json`](example/conf.json).

[http://localhost:8080/](http://localhost:8080/) returns the response from
[`./exmaple/components/home`](example/components/home). The Lazo view extends
`lazo-react-view` adding a reference to React and the
[container component](example/components/home/ui-components/HelloWorld.jsx).

Below is the example file structure with brief descriptions in parentheses next to the pertinent files. For
more information on the directory structure of Lazo application please refer to the Lazo
[documentation](http://lazojs.org/).

```shell
example
├── app
│   ├── app.json (routes)
│   ├── application.js (initialization)
│   ├── lazo-react-view (lazo-react bridge)
│   │   └── index.js
│   ├── server (debugging)
│   │   └── server.js
│   └── vendor (bower modules)
│       ├── ...
├── components
│   └── home (responds to route (/))
│       ├── components
│       │   └── HelloWorld.jsx (component container)
│       ├── controller.js (fetches model and collection data)
│       └── views
│           └── index.js (extends lazo-react-view)
├── conf.json (RequireJS configuration)
└── models (example data)
    ├── collection-example
    │   └── server
    │       └── syncher.js
    └── model-example
        └── server
            └── syncher.js

```