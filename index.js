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

const proms = [];

for (let i = 0; i < files.length; i++) {
  beatmapsetPath = path.resolve(beatmapPath, files[i]);
  proms.push(selection(files[i], beatmapsetPath));
}

Promise.all(proms).then((err) => {
  console.log('Complete!');
});
