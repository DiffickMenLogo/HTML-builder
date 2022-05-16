const fs = require('fs');
const path = require('path');


const directory = '06-build-page'
const mas = [];


fs.readdir(`06-build-page/project-dist`, (err) => {
    if(err) {
        fs.mkdir(`06-build-page/project-dist`, err => {
            if(err) throw err;
            console.log('Папка создана');
        })
    }; 
 });

fs.readFile(`${directory}/template.html`,'utf-8', (err, content) => {
    if(err) throw err;
    fs.readdir(`${directory}/components`, (err, files) =>{
        if(err) throw err;
        var toWrite = content;
        var masInsert = ['articles','footer','header'];
        for(let i = 0; i < files.length; i++){
            fs.readFile(`${directory}/components/${files[i]}`,'utf-8',(err, content) => {
                if(err) throw err;
                toWrite = toWrite.replace(`{{${masInsert[i]}}}\r\n`, `${content}\r\n`);
                fs.writeFile(`${directory}/project-dist/index.html`, toWrite, (err) =>{
                    if(err) throw err;
                });
            })
        }
    })

})
fs.readdir(`${directory}/styles`, (err, files) => {
    if(err){
        console.log(err.message);
    }else{
        for(file of files){
            if(path.extname(file) == '.css'){
                fs.readFile(`${directory}/styles/${file}`, 'utf8', function(error, fileContent){
                    if(error) throw error; 
                    mas[0] = mas[0] + fileContent; 
                    fs.writeFile('06-build-page/project-dist/style.css', `${mas[0]}`, function(error){
                        if(error) throw error;
                     });
                 });
            }
        }
    }
})
fs.readdir(`06-build-page/project-dist/assets`, (err) => {
    if(err) {
        fs.mkdir(`06-build-page/project-dist/assets`, err => {
            if(err) throw err;
            console.log('Папка создана');
        })
    }; 
 });
 fs.readdir(`${directory}/assets`, (err, files) => {
     if(err) throw err;
     for(let i = 0; i < files.length; i++){
        fs.readdir(`06-build-page/project-dist/assets/${files[i]}`, (err) => {
            if(err) {
                fs.mkdir(`06-build-page/project-dist/assets/${files[i]}`, err => {
                    if(err) throw err;
                    console.log(`Папка создана ${files[i]}`);
                })
            }; 
         });
     }
     
     for(file of files){
         var CurrentDir = '';
        fs.readdir(`${directory}/assets/${file}`, (err, files) => {
            for(let i = 0; i < files.length; i++){
                if(path.extname(files[i]).toString() == '.woff2'){
                    CurrentDir = 'fonts';
                }
                if(path.extname(files[i]).toString() == '.svg'){
                    CurrentDir = 'svg';
                }
                if(path.extname(files[i]).toString() == '.jpg'){
                    CurrentDir = 'img';
                }
                fs.copyFile(`${directory}/assets/${CurrentDir}/${files[i]}`, `${directory}/project-dist/assets/${CurrentDir}/${files[i]}`, err => {
                    if(err) throw err; // не удалось скопировать файл
                 });
            }
        })
     }
 })
