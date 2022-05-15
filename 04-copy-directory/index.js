const fs = require('fs');
const path = require('path');
const folder = '04-copy-directory/files';

fs.readdir(`04-copy-directory/files-copy`, (err) =>{
    if(err) {
        fs.mkdir(`04-copy-directory/files-copy`, (err) => {
            if(err) {
                console.log('Error', err.message);
                return;
            }
            console.log('Folder created');
        });
    };
});

fs.readdir(folder, (err, files) => {
    if(err) {
        console.log('Error', err.message);
        return;
    }else{
        files.forEach(file => {
            fs.copyFile(`${folder}/${file}`, `04-copy-directory/files-copy/${file}`, (err) => {
                if(err) {
                    console.log('Error', err.message);
                    return;
                };
                console.log('File copied');
            });
        });
    }
});
