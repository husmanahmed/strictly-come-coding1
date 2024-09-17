const fs = require('node:fs');
const readline = require('node:readline');

var lineReader = readline.createInterface({
  input: fs.createReadStream('measurements_test.txt')
});

lineReader.on('line', function (line) {
  console.log('Line from file:', line);
});