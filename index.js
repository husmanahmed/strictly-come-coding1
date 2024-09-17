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
  const temperature = parseFloat(parts[1]);

  const existingData = data.get(station);

  // if there is no existingData
  if (!existingData) {
    data.set(station, {
      min:  temperature,
      sum: temperature,
      count: 0,
      max: temperature,
    });
  } else {
    existingData.min = Math.min(existingData.min, temperature);
    existingData.sum += temperature;
    existingData.count++;
    existingData.max = Math.max(existingData.max, temperature);
  }
});

// log data when file is closed
lineReader.on('close', () => {
  //alphabetically sorted keys
  let keys =[ ...data.keys() ].sort();

  keys.forEach((station) => {
    let temperature = data.get(station);
    console.log(`${station};
      ${(Math.round(temperature.min * 10) / 10).toFixed(1)};
      ${(Math.round((temperature.sum/temperature.count) * 10) / 10).toFixed(1)};
      ${(Math.round(temperature.max * 10) / 10).toFixed(1)}`);
  });
});