import * as d from '../src/declarations';
import * as util from '../src/util';


describe('getRenderOptions', () => {

  const sourceText = 'body { color: blue; }';
  const fileName = '/some/path/file-name.less';
  const context: d.PluginCtx = {
    config: {
      rootDir: '/Users/my/app/',
      srcDir: '/Users/my/app/src/',
    },
    fs: {},
    diagnostics: []
  };


  it('should inject global less array and not change input options', () => {
    const input: d.PluginOptions = {
      injectGlobalPaths: ['/my/global/variables.less']
    };
    const output = util.getRenderOptions(input, sourceText, context);
    expect(output.data).toBe(`@import "/my/global/variables.less";${sourceText}`);
    expect(input.injectGlobalPaths).toHaveLength(1);
    expect(input.injectGlobalPaths[0]).toBe('/my/global/variables.less');
  });

  it('should pass the plugins array', () => {
    const dummyPlugin: any = () => null;
    const input: d.PluginOptions = {
      plugins: [dummyPlugin]
    };
    const output = util.getRenderOptions(input, sourceText, context);
    expect(output.plugins).toBe(input.plugins);
    expect(input.plugins).toHaveLength(1);
    expect(input.plugins[0]).toBe(dummyPlugin);
  });

  it('should set data', () => {
    const input: d.PluginOptions = {};
    const output = util.getRenderOptions(input, sourceText, context);
    expect(output.data).toBe(sourceText);
  });

});


describe('usePlugin', () => {

  it('should use the plugin for .less file', () => {
    const fileName = 'my-file.less';
    expect(util.usePlugin(fileName)).toBe(true);
  });

  it('should not use the plugin for .css file', () => {
    const fileName = 'my-file.css';
    expect(util.usePlugin(fileName)).toBe(false);
  });

});

describe('createResultsId', () => {

  it('should change less the extension to be css', () => {
    const input = '/my/path/my-file.less';
    const output = util.createResultsId(input);
    expect(output).toBe('/my/path/my-file.css');
  });

});
