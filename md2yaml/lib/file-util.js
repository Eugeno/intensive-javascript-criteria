const fs = require(`fs`);
const deleteFolderRecursive = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file) => {
      const curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

const path = require(`path`);

const mkDirRecursive = (targetDir) => {
  const sep = path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(parentDir, childDir);
    if (!fs.existsSync(curDir)) {
      fs.mkdirSync(curDir);
    }

    return curDir;
  }, initDir);
};

module.exports = {
  mkDir(path) {
    deleteFolderRecursive(path);
    mkDirRecursive(path);
  },
  writeFile(path, content) {
    if (fs.exists(path)) {
      fs.unlinkSync(path);
    }
    fs.writeFileSync(path, content);
  }
};
