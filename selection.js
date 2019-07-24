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
  if (configs.avoidedMappers.includes(beatmapsetInfo['creator'])) {
    console.log('Mapper Parameter Violated');
    return true;
  }
  return false;
}

/**
 *
 * @param {*} beatmapsetInfo
 * @return {Boolean}
 */
function checkBPM(beatmapsetInfo) {
  BPM = parseFloat(beatmapsetInfo[beatmapsetInfo.length - 1]['bpm']);
  if (BPM < configs.minimumBPM || BPM > configs.maximumBPM) {
    console.log('BPM parameter Violated.');
    return true;
  }
  return false;
}

/**
 *
 * @param {*} beatmapsetInfo
 * @return {Boolean}
 */
function checkCombo(beatmapsetInfo) {
  Combo = parseInt(beatmapsetInfo[beatmapsetInfo.length - 1]['maxCombo']);
  if (Combo < configs.minimumCombo || Combo > configs.maximumCombo) {
    console.log('Combo Parameter Violated');
    return true;
  }
  return false;
}

/**
 *
 * @param {*} beatmapsetInfo
 * @return {Boolean}
 */
function checkLength(beatmapsetInfo) {
  length = parseFloat(
      beatmapsetInfo[beatmapsetInfo.length - 1]['time']['total']
  );
  if (length < configs.minimumLength || length > configs.maximumLength) {
    console.log('Length Parameter Violated.');
    return true;
  }
  return false;
}

/**
 *
 * @param {*} beatmapsetInfo
 * @return {Boolean}
 */
function checkRanked(beatmapsetInfo) {
  if (beatmapsetInfo[0]['approvalStatus'] != configs.approvalStatus) {
    console.log('Ranked Parameter Violated');
    return true;
  }
  return false;
}

/**
 *
 * @param {*} beatmapsetInfo
 * @return {boolean}
 */
function checkSR(beatmapsetInfo) {
  const arr = [];
  beatmapsetInfo.forEach((e) =>
    parseFloat(arr.push(e['difficulty']['rating']))
  );
  if (
    arr[arr.length - 1] < configs.minimumSR ||
    arr[arr.length - 1] > configs.maximumSR
  ) {
    console.log('SR parameter Violated.');
    return true;
  }
  return false;
}

processBeatmaps(
    '99611 Suirenji Ruka starring Yamazaki Haruka - Tsuki no Inori.osz',
    ''
);
