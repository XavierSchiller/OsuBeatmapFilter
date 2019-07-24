const path = require('path');
const {configs, osuApi} = require('./config');
const fs = require('fs');

/**
 * {
  "osuApiKey": "e81348a27e0594553ea43f8251ba550ff8c50e52",
  "minimumSR": 5.6,
  "maximumSR": 10.6,
  "approvalStatus": "Ranked",
  "minimumlength": 120,
  "maximumLength": 6000,
  "minimumCombo": 500,
  "maximumCombo": -1,
  "minimumBPM": 160,
  "maximumBPM": 200,
  "avoidedMappers": ["Sotarks"]
}

 */

 
module.exports = processBeatmaps;
/**
 *
 * @param {*} beatmapsetName
 * @param {*} beatmapsetPath
 */
async function processBeatmaps(beatmapsetName, beatmapsetPath) {
  console.log(configs);
  const beatmapsetID = beatmapsetName.split(' ')[0];
  console.log('Fetching Information for beatmapsetID' + beatmapsetID);
  beatmapsetInfo = await osuApi.getBeatmaps({s: beatmapsetID});
  console.log('Fetched Information for beatmapsetID' + beatmapsetID);
  let deletebeatmap = false;
  // Sort the given mapset by their SR.

  beatmapsetInfo.sort((a, b) => {
    if (
      parseFloat(a['difficulty']['rating']) >
      parseInt(b['difficulty']['rating'])
    ) {
      return 1;
    } else return -1;
  });
  // Check With Precedence.
  // If the rule is violated, then it is true.
  deletebeatmap =
    checkSR(beatmapsetInfo) || // done
    checkRanked(beatmapsetInfo) || // done
    checkLength(beatmapsetInfo) || // done
    checkCombo(beatmapsetInfo) || // done
    checkBPM(beatmapsetInfo) || // done
    checkMappers(beatmapsetInfo);

  if (deletebeatmap === true) console.log('Deleting beatmap: ' + beatmapsetID);
}


/**
 *
 * @param {*} beatmapsetInfo
 * @return {Boolean}
 */
function checkMappers(beatmapsetInfo) {
  return config.avoidedMappers.includes(beatmapsetInfo['creators']);
}

/**
 *
 * @param {*} beatmapsetInfo
 * @return {Boolean}
 */
function checkBPM(beatmapsetInfo) {
  return (
    beatmapsetInfo[beatmapsetInfo.length - 1]['bpm'] < configs.minimumBPM ||
    beatmapsetInfo[beatmapsetInfo.length - 1]['bpm'] > configs.maximumBPM
  );
}

/**
 *
 * @param {*} beatmapsetInfo
 * @return {Boolean}
 */
function checkCombo(beatmapsetInfo) {
  return (
    beatmapsetInfo[beatmapsetInfo.length - 1]['maxCombo'] <
      configs.minimumCombo ||
    beatmapsetInfo[beatmapsetInfo.length - 1]['maxCombo'] > configs.maximumCombo
  );
}

/**
 *
 * @param {*} beatmapsetInfo
 * @return {Boolean}
 */
function checkLength(beatmapsetInfo) {
  return (
    beatmapsetInfo[beatmapsetInfo.length - 1]['time']['total'] <
      configs.minimumLength ||
    beatmapsetInfo[beatmapsetInfo.length - 1]['time']['total'] >
      configs.maximumLength
  );
}

/**
 *
 * @param {*} beatmapsetInfo
 * @return {Boolean}
 */
function checkRanked(beatmapsetInfo) {
  return beatmapsetInfo[0]['approvalStatus'] != configs.approvalStatus;
}

/**
 *
 * @param {*} beatmapsetInfo
 * @return {boolean}
 */
function checkSR(beatmapsetInfo) {
  const arr = [];
  beatmapsetInfo.forEach((e) => arr.push(e['difficulty']['rating']));
  return (
    arr[arr.length - 1] < configs.minimumSR ||
    arr[arr.length - 1] > configs.maximumSR
  );
}

processBeatmaps(
    '99611 Suirenji Ruka starring Yamazaki Haruka - Tsuki no Inori.osz',
    ''
);
