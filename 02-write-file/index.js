const fs = require('fs');
const {stdin, stdout} = process;
const output = fs.createWriteStream('02-write-file/newFile.txt', 'utf-8');

console.log('Enter your text:');

stdin.on('data', data => {
    if(data == 'exit\r\n'){
        stdout.write('Bye!');
        process.exit();
    };
    output.write(data);
});

process.on('SIGINT', () => {
    stdout.write('Bye!');
    process.exit();
});