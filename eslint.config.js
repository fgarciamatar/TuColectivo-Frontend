// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const reactNativePlugin = require('eslint-plugin-react-native');

module.exports = defineConfig([
  expoConfig,
  {
    plugins: {
      'react-native': reactNativePlugin,
    },
    rules: {
      // Error si usás texto crudo fuera de <Text>
      'react-native/no-raw-text': ['error', {
        skip: ['Trans', 'TextInput'], // opcional, ajustable
      }],
    },
    languageOptions: {
      globals: {
        React: 'readonly',
      },
    },
  },
  {
    ignores: ['dist/*'],
  },
]);

