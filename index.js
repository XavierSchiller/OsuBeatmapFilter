const osu = require('node-osu')
const fs = require('fs')
const path = require('path')
var configs;


//Obtain all the configurations
configs = JSON.parse(fs.readFileSync('./selection.json', { encoding: 'utf-8' }))

const osuApi = new osu.Api(configs.osuApiKey, {
    completeScores: true
})

//Select the correct beatmaps path.
//By default it assumes that it is in the current directory under the name beatmaps
const beatmapPath = path.resolve("./", "./beatmaps")

console.log("Selecting Path " + beatmapPath)


//Read Configuration for Selection of osu beatmaps.


//If there's no configuration
if (configs === undefined)
    throw new Error("No Configuration!")

//Make sure beatmap folder exists

if (fs.existsSync(beatmapPath) === false)
    throw new Error("Beatmaps folder does not exist! Exiting...")


//Get all files in 
files = fs.readdirSync(beatmapPath)

//For each file in the folder, split to find the number.
//<Number> <Artist> - <Song Name>.osz is the usual file name.
//544647 HoneyWorks feat.sana - Kawaiku Naritai (Short Ver.).osz is an example
files.forEach(file => {
    console.log(file.split(' ')[0])
});