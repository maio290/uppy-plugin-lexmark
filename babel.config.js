module.exports = (api) => {
  const targets = {}
  if (api.env('test')) {
    targets.node = 'current'
  }

  return {
    presets: [
      'preact',
      ['@babel/preset-env', {
        modules: false,
        loose: true,
        "targets": {
          "browsers": ["ie >= 10", "last 1 version"]
        }        
      }
    ]],
    plugins: [
      '@babel/plugin-transform-object-assign',
      '@babel/plugin-proposal-class-properties'
    ]
  }
}