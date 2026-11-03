import type * as d from '../src/declarations';
import { less } from '../src/index';

function createContext(): d.PluginCtx {
  return {
    config: { rootDir: '/app/' },
    fs: {
      readFileSync: () => '',
      writeFile: jest.fn(() => Promise.resolve()),
    },
    diagnostics: [],
  };
}

describe('less plugin', () => {
  it('should be a stencil css plugin', () => {
    const plugin = less();
    expect(plugin.name).toBe('less');
    expect(plugin.pluginType).toBe('css');
  });

  it('should skip non-less files', () => {
    expect(less().transform('a{}', '/app/a.css', createContext())).toBeNull();
  });

  it('should compile less to css', async () => {
    const ctx = createContext();
    const result = (await less().transform(
      '@c: blue; a { color: @c; }',
      '/app/a.less',
      ctx,
    )) as d.PluginTransformResults;
    expect(result.id).toBe('/app/a.css');
    expect(result.code).toContain('color: blue');
    expect(ctx.fs.writeFile).toHaveBeenCalledWith('/app/a.css', result.code, {
      inMemoryOnly: true,
    });
    expect(ctx.diagnostics).toHaveLength(0);
  });

  it('should report a diagnostic on error', async () => {
    const ctx = createContext();
    await less().transform('a { color: @missing; }', '/app/a.less', ctx);
    expect(ctx.diagnostics).toHaveLength(1);
    expect(ctx.diagnostics[0].level).toBe('error');
  });
});
