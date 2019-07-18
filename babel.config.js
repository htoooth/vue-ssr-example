module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: false,
        corejs: 2,
        useBuiltIns: 'usage'
      }
    ],
    ['@vue/babel-preset-jsx']
  ],
  plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-syntax-jsx']
}
