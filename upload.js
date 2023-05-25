var express = require('express');
var app = express();
app.listen("3000");
var expressHbs = require('express-handlebars');

app.engine('.hbs',expressHbs.engine({extname:".hbs", defaultLayout:"main"}));
app.set('view engine', '.hbs')

app.get('/themsp', function(req,res){
    res.render('themsp')
});

//multer
var multer = require('multer');

var store = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"./upload");
    },
    filename: function(req, file, cb){
        cb(null,file.originalname);
    }
});

var upload = multer({storage:store});

// up 1 file
app.post("/themsp", upload.single("inputfile"), (req,res) =>{
    console.log(req.file);
    res.send("t c");
});

// up nhieu file

app.post("/themsp", upload.array("inputfile",5), (req,res) =>{
    console.log(req.file);
    res.send("t c");
});
