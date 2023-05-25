const mongoose = require('mongoose');
// khai báo 1 lược đồ tương ứng với cơ sở dữ liệu:sv,sản phẩm, danh mục...

var userSchema = mongoose.Schema({
    Email:{type:String,require:true},
    Name:{type:String},
    Password:{type:String},   
    role:{type:String},
});

// ánh xạ lược đồ vào cơ sở dữ liệu

const userModel = mongoose.model('USER',userSchema);
// gắn nó vào module để sử dụng ở nơi khác

module.exports = userModel;