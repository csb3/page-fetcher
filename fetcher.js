const fs = require('fs');
const args = process.argv.slice(2);
const address = args[0];
const filePath = args[1];

const request = require('request');
request(address, (error, response, body) => {
  if (error) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
  } else {
    fs.writeFile(filePath, body, done);
  }
});

const done = function() {
  fs.stat(filePath, (err, stats) => {
    if (err) {
      throw err;
    } else {
      const bytes = stats.size;
      console.log(`Downloaded and saved ${bytes} bytes to ${filePath}`);
    }
  });
};