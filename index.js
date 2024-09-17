import * as readline from 'node:readline';
import * as fs from 'node:fs';

const lineReader = readline.createInterface({
  input: fs.createReadStream('measurements_test.txt')
});

lineReader.on('line', function (line) {
  console.log('Line from file:', line);
});