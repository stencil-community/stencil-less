import pkg from './package.json' assert {type: "json"};


export default {
  input: 'dist/index.js',

  external: [
    'path',
    'less'
  ],

  output: [{
    format: 'cjs',
    file: pkg.main
  },
    {
      format: 'es',
      file: pkg.module
    }
  ]
};
