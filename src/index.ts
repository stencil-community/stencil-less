import { render } from 'less';
import { loadDiagnostic } from './diagnostics';
import * as d from './declarations';
import * as util from './util';


export function less(opts: d.PluginOptions = {}) {

  return {
    name: 'less',
    transform(sourceText: string, fileName: string, context: d.PluginCtx) {
      if (!context || !util.usePlugin(fileName)) {
        return null;
      }

      const renderOpts = util.getRenderOptions(opts, sourceText, context);

      const results: d.PluginTransformResults = {
        id: util.createResultsId(fileName)
      };

      if (sourceText.trim() === '') {
        results.code = '';
        return Promise.resolve(results);
      }

      return new Promise<d.PluginTransformResults>(resolve => {

        render(renderOpts.data, {
          plugins: renderOpts.plugins,
          filename: fileName
        }, (err: any, lessResult: any) => {
          if (err) {
            loadDiagnostic(context, err, fileName);
            results.code = `/**  less error${err && err.message ? ': ' + err.message : ''}  **/`;
            resolve(results);

          } else {
            results.code = lessResult.css.toString();

            // write this css content to memory only so it can be referenced
            // later by other plugins (autoprefixer)
            // but no need to actually write to disk
            context.fs.writeFile(results.id, results.code, { inMemoryOnly: true }).then(() => {
              resolve(results);
            });
          }
        });
      });
    }
  };
}
