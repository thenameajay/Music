const express = require("express")
const path = require('path');
const fs = require('fs');
const myroutes = require("./Routes/AllRoutes")
// const bodyParser = require("body-parser")
const app = express()
const PORT = 8123
app.use(express.json())
app.use('/',myroutes)

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended:true}))











const uploadsDir = path.join(__dirname, 'songs');
if (!fs.existsSync(uploadsDir)) {
  let x=  fs.mkdirSync(uploadsDir);
}


app.listen(PORT, () => {
    console.log("server activated at :" + PORT)
})