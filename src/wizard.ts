import type { StencilWizardPlugin, WizardContext } from '@stencil/cli';

/**
 * Stencil CLI wizard plugin for `@stencil-community/less`.
 *
 * Contributes:
 * - `init` - adds the `less()` plugin (and its import) to `stencil.config.ts`.
 * - `generate` - offers `.less` as stylesheet option in `stencil generate`.
 */
export const wizard: StencilWizardPlugin = {
  generate: {
    styleExtensions: ['less'],
  },

  init: {
    id: '@stencil-community/less',
    displayName: 'Less',
    description: 'Less styles',

    async run({ prompts, openStencilConfig }: WizardContext): Promise<void> {
      const { intro, outro, log } = prompts;

      intro('Less styles for Stencil');

      const editor = await openStencilConfig();

      const hasImport = editor.hasImport('@stencil-community/less');
      const hasPlugin = editor.pluginsContains('less(');

      if (hasImport && hasPlugin) {
        log.info('less() is already configured in stencil.config.ts');
        outro('Nothing to do');
        return;
      }

      editor.addImport('@stencil-community/less', ['less']);
      if (!hasPlugin) {
        editor.addPlugin('less()');
      }
      await editor.save();

      outro('Less configured - use .less styleUrls in your components');
    },
  },
};
