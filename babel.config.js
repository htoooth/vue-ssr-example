module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: false,
        corejs: 2,
        useBuiltIns: 'usage'
      }
    ]
  ],
  plugins: ['@babel/plugin-syntax-dynamic-import']
}
