const path = require('path');
const {config, osuApi} = require('./config');
const fs = require(fs);

module.exports = async function process(beatmapsetName, beatmapsetPath) {
  beatmapsetID = beatmapsetName.split(' ')[0];
  console.log('Fetching Information for beatmapsetID' + beatmapsetID);
  beatmapsetInfo = await osuApi.getBeatmaps({s: beatmapsetID});
  console.log('Fetched Information for beatmapsetID' + beatmapsetID);
};
