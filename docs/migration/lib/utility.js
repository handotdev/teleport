const fs = require('fs');
const getDirName = require('path').dirname;
const path = require('path');

function* readAllFilesFromDirectory(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    if (file.isDirectory()) {
      yield* readAllFilesFromDirectory(path.join(dir, file.name));
    } else {
      yield path.join(dir, file.name);
    }
  }
}

function writeFile(path, contents) {
  fs.mkdir(getDirName(path), { recursive: true}, function (err) {
    if (err) return;

    fs.writeFileSync(path, contents, 'utf8');
  });
}

module.exports = {
  readAllFilesFromDirectory,
  writeFile
};