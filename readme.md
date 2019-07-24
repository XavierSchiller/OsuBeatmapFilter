# OsuBeatmapFilter

Created to filter out local beatmap packs once extracted.

## Why?

Because I didn't want to go through dozens of map packs manually. That's no fun.

## How do I use it

Either you build it or download from the release [page](https://github.com/XavierSchiller/OsuBeatmapFilter/releases).

## Release Versions Usage

1) Create a directory where you'll place the .exe downloaded to your system.

2) Create a `selection.json` file in that directory, follow this pattern:
```json
{
  "osuApiKey": "your osu!Api Key Here.",
  "minimumSR": 5.0,
  "maximumSR": 7.0,
  "approvalStatus": "Ranked", 
  "minimumlength": 120,
  "maximumLength": 6000,
  "minimumCombo": 500,
  "maximumCombo": 6000,
  "minimumBPM": 90,
  "maximumBPM": 240,
  "avoidedMappers": ["Mapper1","Mapper2","Mapper3"]
}
```
Please do look at the constraints that you wish to add to your filter by changing the values at `selection.json`

3) The directory should then have two files respectively

```bash
osuFilter.exe
selection.json
```

4) Create another Directory with the name `beatmaps` and deposit all your .osz files there.

The directory should then have

```bash
osuFilter.exe
selection.json
beatmaps/
```

and `beatmaps/` should have

```bash
1239809 PPmap - PPTitle (PPSize).osz
.
.
.
```

5) Then run Filter.exe and wait for it to complete. 


## Building

Clone the repository and then execute

```bash
npm install
node compile.js
```

The resulting target should be in `build/` 

### I should really put some license here.
