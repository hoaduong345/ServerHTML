const mongoose = require('mongoose');
// khai báo 1 lược đồ tương ứng với cơ sở dữ liệu:sv,sản phẩm, danh mục...

var spSchema = mongoose.Schema({
    Tensp:{type:String,require:true},
    Gia:{type:Number},
    Soluong:{type:Number},
    Danhmuc:{type:String},
    Giamgia:{type:Number},
    MieuTa:{type:String},
    Hinhanh:{type: Array},
});

// ánh xạ lược đồ vào cơ sở dữ liệu

const sp = mongoose.model('SP',spSchema);
// gắn nó vào module để sử dụng ở nơi khác

module.exports = sp;