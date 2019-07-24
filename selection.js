const {configs, osuApi} = require('./config');
const fs = require('fs');

module.exports = processBeatmaps;
/**
 * Processes the Beatmaps according to their constraints.
 * @param {*} beatmapsetName Name of the .isz file.
 * @param {*} beatmapsetPath Full Path of the .osz file.
 */
async function processBeatmaps(beatmapsetName, beatmapsetPath) {
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

  if (deletebeatmap === true) {
    remove(beatmapsetPath);
  }
}

/**
 * Removes the file at beatmapsetPath
 * @param {*} beatmapsetPath path to the .osz file.
 */
function remove(beatmapsetPath) {
  console.log('Deleting File...' + beatmapsetPath);
  fs.unlinkSync(beatmapsetPath);
}

/**
 * Checks if Mapper Constraint is Violated.
 * @param {*} beatmapsetInfo Information of the beatmap from the API.
 * @return {Boolean} True if Violated; False otherwise.
 */
function checkMappers(beatmapsetInfo) {
  if (configs.avoidedMappers.includes(beatmapsetInfo[0]['creator'])) {
    console.log('Mapper Parameter Violated');
    return true;
  }
  return false;
}

/**
 * Checks if BPM Constraint is Violated.
 * @param {*} beatmapsetInfo Information of the beatmap from the API.
 * @return {Boolean} True if Violated; False otherwise.
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
 * Checks if Combo Constraint is Violated.
 * @param {*} beatmapsetInfo Information of the beatmap from the API.
 * @return {Boolean} True if Violated; False otherwise.
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
 * Checks if Length Constraint is Violated.
 * @param {*} beatmapsetInfo Information of the beatmap from the API.
 * @return {Boolean} True if Violated; False otherwise.
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
 * Checks if approvalStatus Constraint is Violated.
 * @param {*} beatmapsetInfo Information of the beatmap from the API.
 * @return {Boolean} True if Violated; False otherwise.
 */
function checkRanked(beatmapsetInfo) {
  if (beatmapsetInfo[0]['approvalStatus'] != configs.approvalStatus) {
    console.log('Ranked Parameter Violated');
    return true;
  }
  return false;
}

/**
 * Checks if SR Constraint is Violated.
 * @param {*} beatmapsetInfo Information of the beatmap from the API.
 * @return {boolean} True if Violated; False otherwise.
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
