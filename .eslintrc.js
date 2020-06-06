module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        /* ecmaFeatures: {
        jsx: true // Allows for the parsing of JSX
      } */
    },

    /* settings: {
      react: {
        version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
      }
    }, */

    extends: [
        // "plugin:react/recommended",
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],

    rules: {
        // "@typescript-eslint/explicit-function-return-type": "off",
    },
};
