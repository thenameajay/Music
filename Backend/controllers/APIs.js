const path = require('path');   //requiring path and fs modules
const fs = require('fs');

//joining path of directory 
// const directoryPath = path.join(__dirname, '../songs');
//passsing directoryPath and callback function

exports.songList=async (req, res)=>{
    const directoryPath = path.join(__dirname, '../songs');
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            console.log('Unable to scan directory: ' + err);
            res.send("error occured")
        }
        //listing all files using forEach
        // files.forEach(function (file) {
            // Do whatever you want to do with the file
            // console.log(typeof file)
            // console.log(file);
            // console.log(typeof files)
        // });
        res.send(files)
    })
}

// function readFiles(dirname, onFileContent, onError) {
//     fs.readdir(dirname, function (err, filenames) {
//         if (err) {
//             onError(err);
//             return;
//         }
//         filenames.forEach(function (filename) {
//             fs.readFile(dirname + filename, 'utf-8', function (err, content) {
//                 if (err) {
//                     onError(err);
//                     return;
//                 }
//                 onFileContent(filename, content);
//             });
//         });
//     });
// }

  

exports.uploadSong=(req, res)=>{
    //post
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send(`File uploaded successfully: ${req.file.filename}`);
}


exports.getAudio = (req, res) => {
    //get
    const {searched_song} = req.body;
    // const searched_song = req.query.body;
    console.log(JSON.stringify(req.params));
    const filePath = path.join(__dirname, `../songs/${searched_song}`); // ENTER YOUR DESIRED SONGNAME  HERE
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.status(500).send('Error reading audio file');
        } else {
            res.setHeader('Content-Type', 'audio/mpeg');
            res.send(data);
        }
    });
}