// khai báo app.get post, add data,liệt kê,thêm xoá sửa
// cu phap try catch

var express = require('express');
var svSchema = require('../models/sv');
const sv = require('../models/sv');
var app = express();

app.get("/",(req,res)=>{
    res.render("themSV",{tieudeSV: "them sv",});
});
// add sv
app.get("/addsv",(req,res)=>{
    res.render("themSV",{tieudeSV: "them sv",});
});

app.post('/addsv',async(req,res)=> {
    const s = new svSchema(req.body);
    try{
        await s.save();
        console.log("them sv thanh cong");
        res.render("themSv.hbs",{tieudeSV:"da them sv"});
        // res.redirect("/sv/viewsv");
    }catch(error){

    }
});
// xem sinh vien
app.get('/viewsv',(req,res)=>{
    svSchema.find({}).then(sv_ar =>{
        res.render("viewSV",{
            sv_ar:sv_ar.map(s => s.toJSON())
        });
    });
});
//load and update
// app.get('/editSV/:id',(req,res)=>{
//     svSchema.findById({}).then(sv_ar =>{
//         res.render('editSV.hbs',{
//             sv_ar:sv_ar.map(s => s.toJSON)});
//     });
// });

// app.post('/edit',async(req,res)=> {
//     svSchema.findByIdAndUpdate(req.body);
//     res.redirect('/')
// });
 
// delete

app.get('/delete/:id',async(req,res) =>{
    try {
        const u = await svSchema.findByIdAndDelete(req.params.id, req.body);
        if(!u){
            res.send("ko co sv nay");
        }else{
            res.redirect('/sv/viewSV');
            // res.render('/viewSV');
            console.log("xoa thanh cong")
        }
    } catch (error) {
        console.log(error);     
    }
});

module.exports = app; 