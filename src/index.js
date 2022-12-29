const path = require('path');
const express = require('express')
const app = express()
const methodOverride = require('method-override')
const {conn,sql} = require('./config/connect')
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser')
const { mutipleMongooseToOBject } = require('./until/mongoose');
const { json } = require('express');
const port = 3000

app.use(bodyParser.json())

app.use(methodOverride('_method'));

app.use(
  express.urlencoded({
      extended: true,
  }),
);

// Get maybay
app.get('/may-bay', async function(req,res){
  const pool = await conn;
  let tickets;
  let sqlString = "select * from LoaiMayBay"
  return pool.request().query(sqlString, function (err, data) {
    // console.log(err, data.recordset);
    // res.send(data.recordset);
    // console.log('data'+data)
    res.render('./plane/planes', {data})
  })
})
// Edit may bay
app.put('/may-bay/edit/:id', async function(req,res){
  const pool = await conn;
  let tickets;
  let sqlString = "Update LoaiMayBay set  TenLoaiMayBay=@tenloaimaybay, SoGhe = @soghe where  MaLoaiMayBay=@maloaimaybay "
  return pool.request()
  .input('TenLoaiMayBay', sql.NVarChar, req.body.TenLoaiMayBay)
  .input('SoGhe', sql.Int, req.body.SoGhe)
  .input('MaLoaiMayBay', sql.NVarChar, req.params.id)
  .query(sqlString, function (err, data) {
    // console.log(err, data.recordset);
    // res.send(data.recordset);
    // console.log('data'+data)
    console.log(req)
    res.redirect('/may-bay')
  })
})


app.get('/may-bay/edit/:id', async function(req,res){
  const pool = await conn;
  let sqlString = "select * from LoaiMaybay where MaLoaiMayBay = @maloaimaybay"
  return pool
    .request()
    .input('maloaimaybay',sql.NVarChar,req.params.id)
    .query(sqlString, function (err, data) {
      // console.log(data);
      res.render('./plane/editPlane',{data})
      // console.log(data)
    })
})

//Create may bay
app.get('/them-may-bay', async function(req,res){
  res.render('./plane/createPlane')
})


app.post('/may-bay', async function(req,res){
  const pool = await conn;
  let sqlString = "Insert into  LoaiMayBay (MaLoaiMayBay,TenLoaiMayBay,SoGhe) Values(@MaLoaiMayBay,@TenLoaiMayBay,@SoGhe) "
  return pool
    .request()
    .input('MaLoaiMayBay', sql.NVarChar, req.body.MaLoaiMayBay)
    .input('TenLoaiMayBay', sql.NVarChar, req.body.TenLoaiMayBay)
    .input('SoGhe', sql.Int, req.body.SoGhe)
    .query(sqlString, function (err, data) {
      console.log(req.body)
    res.redirect('may-bay'); 
    })
})

// Xoa may bay
app.get('/may-bay/delete/:id', async function(req,res){
  const pool = await conn;
  let sqlString = "delete  from LoaiMayBay where MaLoaiMayBay = @maloaimaybay "
  return pool
    .request()
    .input('MaLoaiMayBay', sql.NVarChar, req.params.id)
    .query(sqlString, function (err, data) {
      console.log(req.params.id)
    res.redirect('/may-bay'); 
    })
})



app.get('/DS-Ve', async function(req,res){
    const pool = await conn;
    let tickets;
    let sqlString = "select * from PhieuDatVe"
    return pool.request().query(sqlString, function (err, data) {
      // console.log(err, data.recordset);
      // res.send(data.recordset);
      // console.log('data'+data)
      res.render('./ticket/ticket', {data})
    })
})

app.get('/Them-ve', async function(req,res){
    res.render('./ticket/createTicket')
})

// them ve
app.post('/DS-Ve', async function(req,res){
    const pool = await conn;
    let sqlString = "Insert into  PhieuDatVe (MaPhieu,MaTK,NgayGio,TrangThai,TTThanhToan,MaChuyen) Values(@MaPhieu,@MaTK,@NgayGio,@TrangThai,@TTThanhToan,@MaChuyen) "
    return pool
      .request()
      .input('MaPhieu', sql.NVarChar, req.body.MaPhieu)
      .input('MaTK', sql.NVarChar, req.body.MaTK)
      .input('NgayGio', sql.Date, req.body.NgayGio)
      .input('TrangThai', sql.NVarChar, req.body.TrangThai)
      .input('TTThanhToan', sql.NVarChar, req.body.TTThanhToan)
      .input('MaChuyen', sql.NVarChar, req.body.MaChuyen)
      .query(sqlString, function (err, data) {
      
      res.redirect('ds-ve'); 
      })
})

// edit ve

app.put('/ve/edit/:id', async function(req,res){
  const pool = await conn;
  let tickets;
  let sqlString = "Update PhieuDatVe set   MaTK = @MaTK, NgayGio=@NgayGio, TrangThai=@TrangThai, TTThanhToan = @TTThanhToan,MaChuyen =@MaChuyen where  MaPhieu=@MaPhieu "
  return pool.request()
  .input('MaTK', sql.NVarChar, req.body.MaTK)
  .input('NgayGio', sql.Date, req.body.NgayGio)
  .input('TrangThai', sql.NVarChar, req.body.TrangThai)
  .input('TTThanhToan', sql.NVarChar, req.body.TTThanhToan)
  .input('MaChuyen', sql.NVarChar, req.body.MaChuyen)
  .input('MaPhieu', sql.NVarChar, req.params.id)
  .query(sqlString, function (err, data) {
    // console.log(err, data.recordset);
    // res.send(data.recordset);
    // console.log('data'+data)
    console.log(req)
    res.redirect('/Ds-ve')
  })
})
//xoa ve
app.get('/ve/delete/:id', async function(req,res){
  const pool = await conn;
  let sqlString = "delete  from PhieuDatVe where MaPhieu = @MaPhieu "
  return pool
    .request()
    .input('MaPhieu', sql.NVarChar, req.params.id)
    .query(sqlString, function (err, data) {
      console.log(req.params.id)
    res.redirect('/Ds-ve'); 
    })
})



app.get('/ve/edit/:id', async function(req,res){
  const pool = await conn;
  let sqlString = "select * from PhieuDatVe where MaPhieu = @maPhieu"
  return pool
    .request()
    .input('MaPhieu',sql.NVarChar,req.params.id)
    .query(sqlString, function (err, data) {
      console.log(data);
      res.render('./ticket/editTicket',{data})
      // console.log(data)
    })
})



app.post('/tai-khoan', async function(req,res){
  const pool = await conn;
  let sqlString = "Insert into  TaiKhoan (MaTK,TenTK,HoTen,SDT,DiaChi,MatKhau) Values(@MaTK,@TenTK,@HoTen,@SDT,@DiaChi,@MatKhau) "
  return pool
    .request()
    .input('maTK', sql.NVarChar, req.body.MaTK)
    .input('tenTK', sql.NVarChar, req.body.TenTK)
    .input('hoTen', sql.NVarChar, req.body.HoTen)
    .input('sdt', sql.NVarChar, req.body.SDT)
    .input('diaChi', sql.NVarChar, req.body.DiaChi)
    .input('matKhau', sql.NVarChar, req.body.MatKhau)
    .query(sqlString, function (err, data) {
      console.log(req.body);
      res.send({ result: data });
    })
})

app.get('/tai-khoan', async function(req,res){
  const pool = await conn;
  let sqlString = "select * from taikhoan"
  return pool
    .request()
    .query(sqlString, function (err, data) {
      // console.log(data);
      res.send(data);
    })
})

app.get('/', async function(req,res){
  res.render('home')
})


app.engine(
  'hbs',
  handlebars.engine({
      extname: 'hbs', // thay doi cai nay thi phai thay doi ca cho khac (chuyen tu handlebars sang hbs cho ngan)
      helpers: {
          sum: (a, b) => a + b,
      },
  }),
); // khoi tao handle
app.set('view engine', 'hbs'); // su dung handle bar

app.set('views', path.join(__dirname, 'resource', 'views')); // do thay doi cau truc
console.log(path.join(__dirname, 'resource', 'views'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})