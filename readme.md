# @stencil-community/less

This package is used to easily precompile Less files within the Stencil components.

First, npm install within the project:

```bash
npm install @stencil-community/less --save-dev
```

Next, within the project's `stencil.config.js` file, import the plugin and add it to the config's `plugins` config:

#### stencil.config.ts
```ts
import { Config } from '@stencil/core';
import { less } from '@stencil-community/less';

export const config: Config = {
  plugins: [
    less()
  ]
};
```

During development, this plugin will kick-in for `.less` style urls, and precompile them to CSS.

## Options

### Plugins

The `plugins` config is an array of Less plugins.

```js
const LessPluginAutoPrefix = require('less-plugin-autoprefix');

exports.config = {
  plugins: [
    less({
      plugins: [
        new LessPluginAutoPrefix({
          browsers: ['last 2 versions']
        })
      ]
    })
  ]
};
```

### Inject Globals Less Paths

The `injectGlobalPaths` config is an array of paths that automatically get added as `@import` declarations to all components. This can be useful to inject Less variables, mixins and functions to override defaults of external collections. Relative paths within `injectGlobalPaths` should be relative to the `stencil.config.js` file.

```js
exports.config = {
  plugins: [
    less({
      injectGlobalPaths: [
        'src/globals/variables.less',
        'src/globals/mixins.less'
      ]
    })
  ]
};
```

Note that each of these files are always added to each component, so in most cases they shouldn't contain CSS because it'll get duplicated in each component. Instead, `injectGlobalPaths` should only be used for Less variables, mixins and functions, but not contain any CSS.

## Related

* [Less](https://www.npmjs.com/package/less)
* [LessPluginAutoPrefix](https://www.npmjs.com/package/less-plugin-autoprefix)
* [Stencil](https://stenciljs.com/)
* [Stencil Worldwide Slack](https://stencil-worldwide.slack.com)
* [Ionic Components](https://www.npmjs.com/package/@ionic/core)
* [Ionicons](http://ionicons.com/)

## Contributing

Please see our [Contributor Code of Conduct](https://github.com/ionic-team/ionic/blob/master/CODE_OF_CONDUCT.md) for information on our rules of conduct.
