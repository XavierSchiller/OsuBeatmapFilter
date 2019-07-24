const osu = require('node-osu');
const fs = require('fs');
// Obtain all the configurations
const configs = JSON.parse(
    fs.readFileSync('./selection.json', {encoding: 'utf-8'})
);

if (configs === undefined) throw new Error('No Configuration!');

const osuApi = new osu.Api(configs.osuApiKey, {
  completeScores: true,
});

module.exports.configs = configs;
module.exports.osuApi = osuApi;
