import readline from 'node:readline';
import fs from 'node:fs';

const data = new Map();

const lineReader = readline.createInterface({
  input: fs.createReadStream('measurements_test.txt')
});

// read file line by line
lineReader.on('line', function (line) {
  const parts = line.split(';');

  const station = parts[0];
  const temperature = parts[1];

  data.set(station, temperature);
});

// log data when file is closed
lineReader.on('close', () => {
  data.forEach((temperature, station) => {
    console.log(`${station};${temperature}`);
  })
});