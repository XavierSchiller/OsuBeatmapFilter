const {configs, osuApi} = require('./config');
const fs = require('fs');
module.exports = processBeatmaps;

const constraints = [
  checkSR,
  checkRanked,
  checkLength,
  checkCombo,
  checkBPM,
  checkMappers,
];

/**
 * Processes the Beatmaps according to their constraints.
 * @param {*} beatmapsetName Name of the .osz file.
 * @param {*} beatmapsetPath Full Path of the .osz file.
 */
async function processBeatmaps(beatmapsetName, beatmapsetPath) {
  const beatmapsetID = beatmapsetName.split(' ')[0];
  beatmapsetInfo = await osuApi.getBeatmaps({s: beatmapsetID});
  // Sort the given mapset by their SR.

  beatmapsetInfo.sort((a, b) => {
    return (
      parseFloat(a['difficulty']['rating']) >
      parseInt(b['difficulty']['rating'])
    );
  });
  // Check With Precedence.
  // If the rule is violated, then it is true.

  constraints.some((x) => {
    return x(beatmapsetInfo, beatmapsetPath);
  });
}

/**
 * Removes the file at beatmapsetPath
 * @param {*} beatmapsetPath path to the .osz file.
 */
function remove(beatmapsetPath) {
  const violatedParameter = remove.caller.name.substring(5);
  console.log(`[${violatedParameter} Parameter Violated] Deleting File ${beatmapsetPath}`);
  // fs.unlinkSync(beatmapsetPath);
}

/**
 * Checks if Mapper Constraint is Violated.
 * @param {*} beatmapsetInfo Information of the beatmap from the API.
 * @param {*} beatmapsetPath Full Path of the .osz file.
 * @return {Boolean} True if Violated; False otherwise.
 */
function checkMappers(beatmapsetInfo, beatmapsetPath) {
  if (configs.avoidedMappers.includes(beatmapsetInfo[0]['creator'])) {
    remove(beatmapsetPath);
    return true;
  }
  return false;
}

/**
 * Checks if BPM Constraint is Violated.
 * @param {*} beatmapsetInfo Information of the beatmap from the API.
 * @param {*} beatmapsetPath Full Path of the .osz file.
 * @return {Boolean} True if Violated; False otherwise.
 */
function checkBPM(beatmapsetInfo, beatmapsetPath) {
  BPM = parseFloat(beatmapsetInfo[beatmapsetInfo.length - 1]['bpm']);
  if (BPM < configs.minimumBPM || BPM > configs.maximumBPM) {
    remove(beatmapsetPath);
    return true;
  }
  return false;
}

/**
 * Checks if Combo Constraint is Violated.
 * @param {*} beatmapsetInfo Information of the beatmap from the API.
 * @param {*} beatmapsetPath Full Path of the .osz file.
 * @return {Boolean} True if Violated; False otherwise.
 */
function checkCombo(beatmapsetInfo, beatmapsetPath) {
  Combo = parseInt(beatmapsetInfo[beatmapsetInfo.length - 1]['maxCombo']);
  if (Combo < configs.minimumCombo || Combo > configs.maximumCombo) {
    remove(beatmapsetPath);
    return true;
  }
  return false;
}

/**
 * Checks if Length Constraint is Violated.
 * @param {*} beatmapsetInfo Information of the beatmap from the API.
 * @param {*} beatmapsetPath Full Path of the .osz file.
 * @return {Boolean} True if Violated; False otherwise.
 */
function checkLength(beatmapsetInfo, beatmapsetPath) {
  length = parseFloat(
      beatmapsetInfo[beatmapsetInfo.length - 1]['time']['total']
  );
  if (length < configs.minimumLength || length > configs.maximumLength) {
    remove(beatmapsetPath);
    return true;
  }
  return false;
}

/**
 * Checks if approvalStatus Constraint is Violated.
 * @param {*} beatmapsetInfo Information of the beatmap from the API.
 * @param {*} beatmapsetPath Full Path of the .osz file.
 * @return {Boolean} True if Violated; False otherwise.
 */
function checkRanked(beatmapsetInfo, beatmapsetPath) {
  if (beatmapsetInfo[0]['approvalStatus'] != configs.approvalStatus) {
    remove(beatmapsetPath);
    return true;
  }
  return false;
}

/**
 * Checks if SR Constraint is Violated.
 * @param {*} beatmapsetInfo Information of the beatmap from the API.
 * @param {*} beatmapsetPath Full Path of the .osz file.
 * @return {boolean} True if Violated; False otherwise.
 */
function checkSR(beatmapsetInfo, beatmapsetPath) {
  const arr = [];
  beatmapsetInfo.forEach((e) =>
    parseFloat(arr.push(e['difficulty']['rating']))
  );
  if (
    arr[arr.length - 1] < configs.minimumSR ||
    arr[arr.length - 1] > configs.maximumSR
  ) {
    remove(beatmapsetPath);
    return true;
  }
  return false;
}
