const fs = require('fs');
const path = require('path');

const folder = '05-merge-styles/styles';
const buffer = [];

fs.readdir(folder, (err, files) => {
    if(err) {
        console.log('Error', err.message);
        return;
    }else{
        files.forEach(file => {
            if(path.extname(file) === '.css') {
                fs.readFile(`${folder}/${file}`, 'utf8', (err, data) => {
                    if(err) {
                        console.log('Error', err.message);
                        return;
                    }else{
                        buffer.push(data);
                    }
                    fs.writeFile('05-merge-styles/project-dist/bundle.css', buffer.join('\n'), (err) => {
                        if(err) {
                            console.log('Error', err.message);
                        }else{
                            console.log('Success');
                        }
                    });
                });
            }
        });
    }
});