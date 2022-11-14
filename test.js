const fs = require("fs");
const findTree = require("./utils/findTree");
fs.readFile(`translated-1668399769582.txt`, 'utf8', function(err, data) {
  if (err) throw err;
  console.log(findTree(data, "ADITHYA VARDHAN"));
});
