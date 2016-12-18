const path = require('path');

const contextSrc = path.resolve(__dirname, '..');
const buildDir = path.join(contextSrc, 'build');
const staticsDir = path.join(buildDir, 'static');

module.exports = {
  CONTEXT_SRC: contextSrc,
  BUILD_DIR: buildDir,
  STATICS_DIR: staticsDir
};
