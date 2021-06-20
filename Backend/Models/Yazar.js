var mongoose = require('mongoose')
const Schema = mongoose.Schema
const yazarSchema = new Schema({

    AdSoyad:{
        type:String
    },
    Bio:{
        type:String
    },
    KısaBio:{
        type:String
    },
    Konum:{
        type:String
    },
    Twitter:{
        type:String
    },
    Mail:{
        type:String
    },
    Foto:{
        type:String
    }

    
})
const Yazar = mongoose.model('Yazar',yazarSchema)

module.exports = Yazar;