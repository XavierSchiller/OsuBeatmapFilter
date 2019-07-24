const fs = require('fs');
const path = require('path');
const selection = require('./selection');
// Select the correct beatmaps path.
// By default it assumes that it is in the
// current directory under the name beatmaps
const beatmapPath = path.resolve('./', './beatmaps');

console.log('Selecting Path ' + beatmapPath);

// Read Configuration for Selection of osu beatmaps.

// If there's no configuration

// Make sure beatmap folder exists

if (fs.existsSync(beatmapPath) === false) {
  throw new Error('Beatmaps folder does not exist! Exiting...');
}

// Get all files in
files = fs.readdirSync(beatmapPath);

// For each file in the folder, split to find the number.
// <Number> <Artist> - <Song Name>.osz is the usual file name.
// 544647 HoneyWorks feat.sana - Kawaiku Naritai (Short Ver.).osz is an example

/**
 * Sleeps for x duration of time
 * @param {int} ms Time to wait in ms
 * @return {Promise}
 */
function sleep(ms) {
  console.log('Waiting for 5 seconds before API call.');
  return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
 * Starts the Script.
 */
async function start() {
  const proms = [];

  for (let i = 0; i < files.length; i++) {
    beatmapsetPath = path.resolve(beatmapPath, files[i]);
    proms.push(selection(files[i], beatmapsetPath));
    if (i % 10 === 0) await sleep(5000);
  }
  await Promise.all(proms);
}

Promise.all([start()]).then((e) => console.log('Script Exiting!'));
