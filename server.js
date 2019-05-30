'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
const multer = require('multer')
const upload = multer({ dest: 'uploads/'})
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});


app.use("/api/fileanalyse", upload.single('upfile'))


app.use("/api/fileanalyse", (req, res, next)=>{
  next()
})

app.post("/api/fileanalyse", (req, res)=>{
  if (!req.file) res.send("No file sent")
  else
    res.json({name: req.file.originalname, size: req.file.size})
})






app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
