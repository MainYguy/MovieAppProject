module.exports = {
  root: true,
  extends: ["airbnb"],
  // extends: ['@react-native-community', "airbnb"],
  parser: "babel-eslint",
  plugins: ["react", "react-native"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      classes: true,
    },
  },
  env: {
    "react-native/react-native": true,
  },
  rules: {
    quotes: "off",
    "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx"] }],
  },
};
