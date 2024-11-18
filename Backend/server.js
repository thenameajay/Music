const express = require("express")
const path = require('path');
const fs = require('fs');
const myroutes = require("./Routes/AllRoutes")
// const bodyParser = require("body-parser")
const app = express()
const PORT = 8123
const cors = require('cors')
  
// app.use(cors({origin:'http://localhost:3000'}))
app.use(cors({origin:'https://musicsenpai.vercel.app'}))
app.use(express.json())
app.use('/',myroutes)

const uploadsDir = path.join(__dirname, 'songs');
if (!fs.existsSync(uploadsDir)) {
  let x=  fs.mkdirSync(uploadsDir);
}

app.listen(PORT, () => {
    console.log("server activated at :" + PORT)
})