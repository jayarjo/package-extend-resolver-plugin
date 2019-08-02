## PackageExtendResolverPlugin

Let's you have one parent workspace and multiple child workspaces that override only specific modules (styles, assets, etc.) of the parent. That way having a main web application, you can easily adapt it to different platforms by creating child workspaces with only overrides to specific modules inside. This keeps your project clean and organized.

### Quick start

*Note:* If you are using `bundlewiz`, you do not need to include this plugin yourself as `bundlewiz` does it for you. Otherwise follow the steps below.

```js
const PackageExtendResolverPlugin = require('package-extend-resolver-plugin');

    // ...
    plugins: [
        // ...
        new PackageExtendResolverPlugin()
    ]
    // ...
```

If you do not use `.jsx` (or other fancy extensions) on the modules that you import without explicitly specifying an extension (e.g `import SomeComponent from 'components/SomeComponent` when you really mean `SomeComponent.jsx`) and keep all of your modules, and styles and other assets (like images, fonts, etc.) that you import in your modules under the `src/` folder, you do not need to provide any options!

### Options

* **lookIn** string[] = [ 'src' ] - *array of paths to look up the modules (if path is relative, workspace root will be prepended to it, `node_modules` will be looked up automatically)*
* **assumeExtensions** string[] = [] - *array of additional extensions that you are looking to omit when importing the corresponding modules (e.g. to properly resolve `.jsx` files, you need to add `.jsx` to the array)*

### Example

```js
const PackageExtendResolverPlugin = require('package-extend-resolver-plugin');

    // ...
    plugins: [
        // ...
        new PackageExtendResolverPlugin({
            lookIn: [ 'src' ], // default
            assumeExtensions: [ '.jsx' ] // now you can include JSX Components without specifying an extension
        })
    ]
    // ...
```
