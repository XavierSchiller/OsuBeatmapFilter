# OsuBeatmapFilter

Created to filter out local beatmap packs once extracted.

## Why?

Because I didn't want to go through dozens of map packs manually. That's no fun.

## How do I use it

Either you build it or download from the release [page](https://github.com/XavierSchiller/OsuBeatmapFilter/releases).

## Release Versions Usage

Create a directory where you'll place the .exe downloaded to your system.

Create a `selection.json` file in that directory, follow this pattern:
```json
{
  "osuApiKey": "KeyHere.",
  "minimumSR": 5.0,
  "maximumSR": 7.0,
  "approvalStatus": "Ranked", 
  "minimumlength": 120,
  "maximumLength": 6000,
  "minimumCombo": 500,
  "maximumCombo": 6000,
  "minimumBPM": 90,
  "maximumBPM": 240,
  "avoidedMappers": ["SomeBlahMapper","SomeMorePP","GIMMEPP"]
}
```

The directory should then have two files respectively

```bash
osuFilter.exe
selection.json
```

Create another Directory with the name `beatmaps` and deposit all your .osz files there.

The directory should then have

```bash
osuFilter.exe
selection.json
beatmaps/
```

and `beatmaps/` should have

```bash
1239809 Artist - Song Title.osz
.
.
.
```

Then run Filter.exe and wait for it to complete. 


## Building

Clone the repository and then execute

```bash
npm install
node compile.js
```

The resulting target should be in `build/` 

## TODO

Additional Section where I detail what remains to be Implemented.

- Add Inclusive Parameters (If between 4-5, then if 4.5 diff exists, do not delete.)
- Make a GUI for this. (Electron is hopefully lightweight.)
- Add linux builds into Releases. 
- Add Bypass Mappers. (Mappers where if their maps exist, do not delete no matter what.)
- Use Local beatmap calculations rather than depend on API. (Need to read .osz for this.)
