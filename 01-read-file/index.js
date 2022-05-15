const fs = require('fs');

const stream = fs.createReadStream('01-read-file/text.txt', 'utf-8');

let res = '';

stream.on('data', chunk => res += chunk);
stream.on('end', () => console.log(res));
stream.on('error', error => console.log('Error', error.message));