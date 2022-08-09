module.exports = {
  root: true,
  extends: ['@extensionengine', 'plugin:prettier/recommended'],
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['no-relative-import-paths'],
  rules: {
    'no-relative-import-paths/no-relative-import-paths': ['warn', { allowSameFolder: true }],
  },
};
