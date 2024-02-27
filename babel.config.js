module.exports = {
  presets: ['module:metro-react-native-babel-preset', '@babel/preset-env', ["@babel/preset-react", {
    "runtime": "automatic"
  }]],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '*': './src'
        },
        runtime: 'automatic'
      }
    ]
  ]
};
