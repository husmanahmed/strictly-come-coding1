import readline from 'node:readline';
import fs from 'node:fs';

const data = new Map();

const lineReader = readline.createInterface({
  input: fs.createReadStream('measurements_test.txt')
});

// read file line by line
lineReader.on('line', (line) => {
  const parts = line.split(';');

  const station = parts[0];
  const temperature = parts[1];

  data.set(station, {
    min:  temperature,
    mean: temperature,
    max: temperature
  });
});

// log data when file is closed
lineReader.on('close', () => {
  //alphabetically sorted keys
  let keys =[ ...data.keys() ].sort();

  keys.forEach((station) => {
    let temperature = data.get(station);
    console.log(`${station};${(Math.round(temperature.min * 10) / 10).toFixed(1)};${(Math.round(temperature.mean * 10) / 10).toFixed(1)};${(Math.round(temperature.max * 10) / 10).toFixed(1)}`);
  });
});