import readline from 'node:readline';
import fs from 'node:fs';

const lineReader = readline.createInterface({
  input: fs.createReadStream('measurements_test.txt')
});

lineReader.on('line', function (line) {
  const parts = line.split(';');

  const station = parts[0];
  const temperature = parts[1];

  console.log(`station: ${station} temperature: ${temperature}`);
});