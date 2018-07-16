var fs = require('fs');

eval(fs.readFileSync('pages/options.js') + '');

for (var i = 0; i < GitLabEnhancementSuiteOptions.length; ++i) {
  var option = GitLabEnhancementSuiteOptions[i];

  console.log(' - ' + option.title + ': ' + option.description);
}
