const mongoose = require('mongoose');
const { NVarChar, DateTime } = require('mssql');
const Schema = mongoose.Schema;



const Ticket = new Schema(
    {
        MaPhieu: { type: NVarChar, maxLength: 50 },
        MaTK: { type: NVarChar, maxLength: 50},
        NgayGio: { type: DateTime},
        TrangThai: { type: NVarChar, maxLength: 50 }, 
        TTThanhToan: { type: NVarChar, maxLength: 50 },
        MaChuyen: {  type: NVarChar, maxLength: 50 },
    }
);


module.exports = mongoose.model('Ticket', Ticket);
