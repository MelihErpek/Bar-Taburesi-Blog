var mongoose = require('mongoose')
const Schema = mongoose.Schema
const yaziSchema = new Schema({

    YaziSahibi:{
        type:String
    },
    Yaziİsmi:{
        type:String
    },
    İçerik:{
        type:String
    },
    Tarih:{
        type:Date,
        default:Date.now
    },
    Foto:{
        type:String
    },
    Konu:{
        type:String
    },
    Aciklama:{
        type:String
    }
})
const Yazi = mongoose.model('Yazi',yaziSchema)

module.exports = Yazi;