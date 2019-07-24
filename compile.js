const {compile} = require('nexe');

compile({
  input: './index.js',
  output: './build/osufilter',
  targets: [
    {platform: 'win', arch: 'amd64'},
    {platform: 'win', arch: 'ia32'},
    {platform: 'linux', arch: 'amd64'},
  ],
});
