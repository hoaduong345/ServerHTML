var express = require('express');
const userModel = require('../models/user');
var app = express();

app.get("/",(req,res)=>{
    res.render("signup.hbs");
});

//signup
app.get("/signup",(req,res)=>{
  res.render("signup.hbs");
});

app.post("/signup", async (req, res) => {
    //hoan thien
    
    console.log(req.body);
    if (req.body.id == "") {
      //add mới
      const s = new userModel(req.body); // lấy dữ liệu từ body
      try {
        const check = await userModel.findOne({ Email: req.body.Email });
        if(!check){
          await s.save();
          res.render("login.hbs", { tieudeUser: "dang ky thanh cong" });
          console.log("them tk tc" +s);
          
        }else{
          res.render("signup.hbs", { trungUser: "Email da su dung" });
          console.log("them tk that bai");
        }                        
      } catch (err) {
        console.log("that bai ", err);
      }
    }
    // else {
    //   //update
    //   updateRecord(req, res);
    // }
  });


//login
app.get("/login",(req,res)=>{
  res.render("login.hbs");
});

app.get("/quanly",(req,res)=>{
  res.render("quanly.hbs");
});


app.post("/login", async (req, res) => {
  try {
    const check = await userModel.findOne({ Email: req.body.Email });
    if (check.Password != null) {
      if (check.Password === req.body.Password) {
        
        console.log("dang nhap thanh cong");
        console.log("check",check);
        console.log("check Email",check.Email);
        console.log("check password",check.Password);
        var ql = check.role;
        console.log("check role",check.role);
        
        if (ql == "admin") ql = [

          `<a href="quanly"><button  id ="btn-login">Quản Lý</button></a>`,
        ];
        else ql = "";
        console.log("check ql",ql);
        res.render("index", { Email: req.body.Email, quanly: ql });
      } else {
        res.send("sai mk");
      }
    } else {
      console.log("mk =null");
    }
  } catch (err) {
    console.log("that bai ", err);
  }
});

// view user
app.get("/viewUser", async function (req, res) {
  await userModel.find().then(data => {
      const Users = {
          itemUsers: data.map((item) => {
              return {
                  _id: item.id,
                  Email: item.Email,
                  Name: item.Name,
                  Password: item.Password,
                  role: item.role,               
              }
          })
      }
      res.render('viewUser.hbs', {
        itemUsers: Users.itemUsers,     
      });

  })
});
// xoa user

app.get('/deleteUser/:id', async (req, res) => {
  try {
      const u = await userModel.findByIdAndDelete(req.params.id, req.body);
      if (!u) {
          res.send("ko co nguoi dung nay");
      } else {
          res.redirect('/user/viewUser');
          // res.render('/viewSV');
          console.log("xoa thanh cong")
      }
  } catch (error) {
      console.log(error);
  }
});

module.exports = app;