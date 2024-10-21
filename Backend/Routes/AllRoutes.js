const express=require("express")
const router=express.Router()
const controller=require("../controllers/APIs")
const multer = require("multer")
  // Create a multer instance with the storage configuration

// Set up storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'songs'); // Directory where files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`); // Rename the file
    }
});

const upload = multer({ storage: storage });

router.get('/getaudio',controller.getAudio)
router.get('/songlist',controller.songList)
router.post('/upload', upload.single('file'),controller.uploadSong)

module.exports=router