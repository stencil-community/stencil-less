// Minimal local copies of the Stencil plugin types.
// Because of the type export difference in v4 and v5.

export interface PrintLine {
  lineIndex: number;
  lineNumber: number;
  text: string;
  errorCharStart: number;
  errorLength?: number;
}

export interface Diagnostic {
  absFilePath?: string | undefined;
  code?: string;
  columnNumber?: number | undefined;
  debugText?: string;
  header?: string;
  language?: string;
  level: 'error' | 'warn' | 'info' | 'log' | 'debug';
  lineNumber?: number | undefined;
  lines: PrintLine[];
  messageText: string;
  relFilePath?: string | undefined;
  type: string;
}

export interface PluginCtx {
  config: {
    rootDir?: string;
  };
  fs: {
    readFileSync(filePath: string): string;
    writeFile(
      filePath: string,
      content: string,
      opts?: { inMemoryOnly?: boolean },
    ): Promise<unknown>;
  };
  diagnostics: Diagnostic[];
}

export interface PluginTransformResults {
  code?: string;
  map?: string;
  id?: string;
  diagnostics?: Diagnostic[];
  dependencies?: string[];
}

export interface Plugin {
  name?: string;
  pluginType?: string;
  transform?: (
    sourceText: string,
    id: string,
    context: PluginCtx,
  ) =>
    | Promise<PluginTransformResults | string | null>
    | PluginTransformResults
    | string
    | null;
}

// Structural copy of Less.Plugin from @types/less.
// We only have @types/less in dev dependency, and there's
// no point to make users to install @types/less.
export interface LessPlugin {
  install(
    less: unknown,
    pluginManager: unknown,
    functionRegistry?: unknown,
  ): void;
  setOptions?(options: string): void;
  printUsage?(): void;
  minVersion?: [number, number, number];
}

export interface PluginOptions {
  plugins?: LessPlugin[];
  injectGlobalPaths?: string[];
}
