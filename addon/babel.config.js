module.exports = {
  plugins: [
    ['@embroider/addon-dev/template-colocation-plugin'],
    ['@babel/plugin-transform-typescript'],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties'],
    ['@babel/plugin-proposal-private-methods'],
  ],
  assumptions: {
    // For legacy decorator support with class fields to work
    setPublicClassFields: true,
    privateFieldsAsProperties: true,
  },
};
