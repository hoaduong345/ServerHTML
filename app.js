var express = require('express');
var expressHandlebars = require('express-handlebars');
var app = express();
app.listen("3000");

const multer = require('multer');

app.use(express.static("public/css"));
app.use(express.static("public/image"));
app.use(express.static("public/scripts"));
app.use(express.static("upload"))
app.use(express.json());
app.use(express.urlencoded({
    extended: false,
}));

app.engine('.hbs',expressHandlebars.engine({extname:".hbs", defaultLayout:"main"}));
app.set('view engine', '.hbs')

app.get('/home', function(req,res){
    res.render('index')
});

app.get('/them', function(req,res){
    res.render('themSV')
    
});
app.get('/themsp', function(req,res){
    res.render('themsp')
    
});
app.get('/login', function(req,res){
    res.render('login')
    
});
app.get('/signup', function(req,res){
    res.render('signup')
    
});
app.get('/forgot', function(req,res){
    res.render('forgot')
    
});
app.get('/danhmuc', function(req,res){
    res.render('danhmuc')
    
});
app.get('/viewSV', function(req,res){
    res.render('viewSV')
    
});
app.get('/viewSP', function(req,res){
    res.render('viewSP')
    
});
app.get('/quanly', function(req,res){
    res.render('quanly')
    
});


// ket noi co so du lieu
var mongoose = require('mongoose');
const { options } = require('./routers/svRoute');

// khai bao duong dan
var url = "mongodb+srv://hoaduong345:123qwe@cluster0.wnwnspb.mongodb.net/QLSV?retryWrites=true&w=majority"

// khai bao option: cac lua chon kết nối

app.use(express.json());
var option = {};
mongoose.connect(url,option).then(
    ()=>{
        console.log("ket noi thanh cong");
    },
    (Error) =>{
        console.log("loi",Error);
    }
)
// thuc hien ket noi

const bodyParser = require("body-parser");
app.use(
    bodyParser.urlencoded({
        extended:true,
    })
);
app.use(express.json());
app.use(bodyParser.json());

const svRoute = require("./routers/svRoute");
app.use("/sv",svRoute);

const userRoute = require("./routers/userRoute")
app.use("/user",userRoute);

const pdRoute = require("./routers/pdRoute")
app.use("/product",pdRoute);