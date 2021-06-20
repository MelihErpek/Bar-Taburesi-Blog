var mongoose = require('mongoose')
const Schema = mongoose.Schema
const adminSchema = new Schema({

    kullaniciAdi:{
        type:String
    },
    sifre:{
        type:String
    }

    
})
const Admin = mongoose.model('Admin',adminSchema)

module.exports = Admin;