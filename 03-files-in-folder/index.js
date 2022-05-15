const fs = require('fs');
const path = require('path');

let secretFolder = '03-files-in-folder/secret-folder';

fs.readdir(secretFolder, {withFileTypes: true}, (error, files) => {
if(error) {
    console.log('Error', error.message);
    return;
}else{
    console.log('Files in folder:');
    files.forEach(file => {
        fs.stat(`${secretFolder}/${file.name}`, (error, stats) => {
            if(error) {
                console.log('Error', error.message);
                return;
            }
            console.log(`${file.name.split('.')[0]} - ${path.extname(file.name).toString().split('.')[1]} - ${Math.round(stats.size/1024)} kb`);
        });
    });
}
})