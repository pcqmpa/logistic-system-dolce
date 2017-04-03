const path = require('path');

const contextSrc = path.resolve(__dirname, '..');
const buildDir = path.join(contextSrc, 'build');
const assetsDir = path.join(buildDir, 'assets');
const picturesDir = path.join(buildDir, 'orders-pictures');

module.exports = {
  CONTEXT_SRC: contextSrc,
  BUILD_DIR: buildDir,
  ASSETS_DIR: assetsDir,
  PICTURES_DIR: picturesDir
};
