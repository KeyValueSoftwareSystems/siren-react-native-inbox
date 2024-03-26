module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  setupFiles: ['./jest.setup.js'], // Ensure this points to your setup file
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      babelConfig: true,
      diagnostics: false
    }],
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-community|YOUR_SPECIFIC_MODULE)/)',
  ],
};
