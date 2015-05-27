# lazo-react-view
The `lazo-react-view` is designed to integrated react with lazo at the view level. It is intended to be
a [react container component](https://medium.com/@learnreact/container-components-c0e67432e005).

## Open Design Questions/Tasks

* Including React Component, JSX in AMD
    * Currently a compile step is not required for lazo; it would be nice to leverage loader
      for this, e.g., `define(['jsx!app/views/react/a.jsx'], function (cmp) {})`, so that users
      can easily integrate their react components.
    * Should be be part of `./example`, so the users can see the best practice for integrating with lazo
* How should we be serliazing and linking the following data between the lazo view and
  react container component? Maybe something like `<lazo-react-view>.sync(objName, prop, val)`
  for getting changes back to lazo and for getting data to react listen for changes and
  `<lazo-react-view>.serializeData()`.
    * models, collections
    * lazo view properties
    * context shared data
    * assets

