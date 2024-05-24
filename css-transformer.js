const { createTransformer } = require('babel-jest');
const babelOptions = require('./babel.config.js'); // Ruta a tu archivo babel.config.js

module.exports = createTransformer(babelOptions);
