var express = require('express');
var spSchema = require('../models/product');

const multer = require('multer')
var app = express();

app.get("/", (req, res) => {
    res.render("themsp.hbs");
});

//storage
var storage = multer.diskStorage({
    destination: (req, file, res) => {
        res(null, './upload')
    },
    filename: (req, file, res) => {
        res(null, file.originalname)
    }
});
var upload = multer({ storage: storage, limits: { fieldSize: 4000 } })



app.post('/uploadsp', upload.array('Hinhanh', 5), async (req, res) => {
    let arrImage = [];
    await req.files.forEach((item) => {
        arrImage.push(item.filename)

    });

    const product = {
        Tensp: req.body.Tensp,
        Soluong: req.body.Soluong,
        Danhmuc: req.body.Danhmuc,
        Giamgia: req.body.Giamgia,
        Gia: req.body.Gia,
        Hinhanh: arrImage,
        MieuTa: req.body.MieuTa,
    }
    console.log(product);
    //Up data database
    await spSchema.insertMany([product])

    await spSchema.find().then(data => {
        const products = {
            itemProduct: data.map((item) => {
                return {
                    _id: item.id,
                    Tensp: item.Tensp,
                    Soluong: item.Soluong,
                    Gia: item.Gia,
                    Giamgia: item.Giamgia,
                    Danhmuc: item.Danhmuc,
                    Hinhanh: item.Hinhanh,
                    MieuTa: item.MieuTa,
                }
            })
        }
        // console.log(products.itemProduct)
        return res.render('viewSP', { itemProduct: products.itemProduct })
    })
})

// xem chi tiet san pham
// app.get('/viewDetails/:id', async (req, res) => {
//     try {
//         // Find the product in the database by its ID
//         const product = await spSchema.findById(req.params.id);

//         // If the product was not found, return a 404 error
//         if (!product) {
//             return res.status(404).send('Product not found');
//         }

//         // If the product was found, render the viewDetails template with the product data
//         res.render('viewDetails', {
//             product: {
//                 id: product.id,
//                 name: product.Tensp,
//                 category: product.Danhmuc,
//                 price: product.Gia,
//                 images: product.Hinhanh,
//                 description: product.MieuTa
//             }
//         });

//     } catch (error) {
//         // If there was an error while retrieving the product, return an error message
//         console.error(error);
//         return res.status(500).send('Internal server error');
//     }
// });

app.get("/viewDetails/:id", async (req, res) => {
    try {
      const doc = await spSchema.findById(req.params.id);
      if (doc) {
        res.render("viewDetails.hbs", { itemProduct: doc.toJSON() });
      } else {
        res.render("timkiem.hbs", { message: "Product not found" });
      }
    } catch (err) {
      console.error(err);
      res.render("timkiem.hbs", { message: "Something went wrong" });
    }
  });
  


// render san pham ra trang admin va index
app.get("/viewSP", async function (req, res) {
    await spSchema.find().then(data => {
        const products = {
            itemProduct: data.map((item) => {
                return {
                    _id: item.id,
                    Tensp: item.Tensp,
                    Danhmuc: item.Danhmuc,
                    Gia: item.Gia,
                    Giamgia: item.Giamgia,
                    Hinhanh: item.Hinhanh,
                    MieuTa: item.MieuTa,
                }
            })
        }
  

        res.render('viewSP', {
            itemProduct: products.itemProduct,
        
        });

    })
});
app.get("/index", async function (req, res) {
    await spSchema.find().then(data => {
        const products = {
            itemProduct: data.map((item) => {
                return {
                    _id: item.id,
                    Tensp: item.Tensp,
                    Danhmuc: item.Danhmuc,
                    Gia: item.Gia,
                    Giamgia: item.Giamgia,
                    Hinhanh: item.Hinhanh,
                    MieuTa: item.MieuTa,
                }
            })
        }

        res.render('index', {
            itemProduct: products.itemProduct,
        
        });
    })
});

// tim kiem san pham

app.post("/search_product", (req, res) => {
    spSchema.find({ Tensp: { $regex: req.body.SearchHome, $options: 'i' } }).then(data => {
        const products = {
            itemProduct: data.map((item) => {
                return {
                    _id: item.id,
                    Tensp: item.Tensp,
                    Danhmuc: item.Danhmuc,
                    Gia: item.Gia,
                    Giamgia: item.Giamgia,
                    Hinhanh: item.Hinhanh,
                    MieuTa: item.MieuTa,
                }
            })
        }

        res.render('timkiem', {
            itemProduct: products.itemProduct,
            dem: products.itemProduct.length,


        });
    })
});

// xoa san pham
app.get('/delete/:id', async (req, res) => {
    try {
        const u = await spSchema.findByIdAndDelete(req.params.id, req.body);
        if (!u) {
            res.send("ko co sp nay");
        } else {
            res.redirect('/product/viewSP');
            // res.render('/viewSV');
            console.log("xoa thanh cong")
        }
    } catch (error) {
        console.log(error);
    }
});
// update san pham

app.get('/updateSP/:id', async (req, res) => {
    
    try {
        await spSchema.findOne({ _id: req.params.id }).then((item) => {
            const products = {
                _id: item.id,
                Tensp: item.Tensp,
                Soluong:item.Soluong,
                Danhmuc: item.Danhmuc,
                Gia: item.Gia,
                Giamgia: item.Giamgia,
                Hinhanh: item.Hinhanh,
                MieuTa: item.MieuTa,
            }
        
                res.render('updateSP.hbs', { itemProduct: products, })
   
        })
    } catch (error) {
        return res.send(error)
    }
})



app.post('/updateSP/:id', upload.array('Hinhanh', 5), async (req, res) => {
    
    console.log("1")
    try {
        console.log("2")
      const id = req.params.id;
      let { Tensp, Gia, Soluong, Danhmuc, Giamgia, MieuTa, Hinhanh } = req.body;
  
      let product = await spSchema.findById(id);
  
      if (!product) {
        return res.status(404).send('Product not found');
      }
  
      let arrImage = [];
  
      if (req.files != null) {
        await req.files.forEach((item) => {
          arrImage.push(item.filename);
        });
  
        if (arrImage.length > 0) {
          Hinhanh = arrImage;
        }
      } else {
        Hinhanh = product.Hinhanh;
      }
  
      product.Tensp = Tensp;
      product.Gia = Gia;
      product.Soluong = Soluong;
      product.Danhmuc = Danhmuc;
      product.Giamgia = Giamgia;
      product.MieuTa = MieuTa;
      product.Hinhanh = Hinhanh;
  
      await product.save();
  
      const data = await spSchema.find();
      const products = {
        itemProduct: data.map((item) => {
          return {
            _id: item.id,
            Tensp: item.Tensp,
            Danhmuc: item.Danhmuc,
            Gia: item.Gia,
            Giamgia: item.Giamgia,
            Hinhanh: item.Hinhanh,
            MieuTa: item.MieuTa,
          };
        }),
      };
  
      res.render('index', { itemProduct: products.itemProduct });
    } catch (error) {
      console.log(error);
      res.status(500).send('Error updating product');
    }
  });






module.exports = app;