const mongoose = require('mongoose');
// khai báo 1 lược đồ tương ứng với cơ sở dữ liệu:sv,sản phẩm, danh mục...

var svSchema = mongoose.Schema({
    Masv:{type:String,require:true},
    Ten:{type:String},
    Lop:{type:String},
    Tuoi:{type:Number},
    Ngaysinh:{type:Date},
    Hinh:{type:String},
});

// ánh xạ lược đồ vào cơ sở dữ liệu

const sv = mongoose.model('SV',svSchema);
// gắn nó vào module để sử dụng ở nơi khác

module.exports = sv;



