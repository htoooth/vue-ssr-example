module.exports = webconfig => {
  return {
    plugins: {
      'postcss-preset-env': {
        autoprefixer: { grid: true }
      }
    }
  }
}
