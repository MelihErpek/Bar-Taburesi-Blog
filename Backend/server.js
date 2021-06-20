const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const Admin = require("./Models/Admin");
const Yazar = require("./Models/Yazar");
const Yazi = require("./Models/Yazi");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 100000000 }));
let port = process.env.PORT || 5000;
const url = "mongodb+srv://melihnode:meliherpek1@cluster0.g1oel.mongodb.net/BarTaburesi?re2tryWrites=true&w=majority";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
},
  (err) => { if (err) { throw err } console.log("Mongoose ile bağlantı kuruldu.") })

app.get("/AdminEkle", async (req, res) => {
  const kullaniciAdi = "admin";
  const sifre = "123";
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(sifre, salt);
  Admin.create({
    kullaniciAdi,
    sifre: passwordHash
  }, err => {
    if (err) {
      console.log("hata")
    }
    else {
      console.log("başarılı")
    }

  })

})

app.post("/AdminGiris", async (req, res) => {
  const { mail, parola } = req.body;
  const user = await Admin.findOne({ kullaniciAdi: mail })
  if (!user) {
    res.status(400);
    res.json({ hata: "Kullanıcı adı veya şifre hatalı." })
  }
  else {
    const isMatch = await bcrypt.compare(parola, user.sifre);
    if (!isMatch) {
      res.status(400);
      res.json({ hata: "Kullanıcı adı veya şifre hatalı." })
    }
    else {

      res.json({

        user: {
          id: user._id,
          isim: user.isim
        },
      });
    }
  }

})
app.post('/YazarEkle', async (req, res) => {
  const { AdSoyad, Bio, KısaBio, Konum, Twitter, baseImage, Mail } = req.body;
  if (!AdSoyad || !Bio || !KısaBio || !Konum || !Twitter || !baseImage || !Mail) {
    res.status(400);
    return res.json({ hata: "Eksik alan bırakmayınız." })
  }
  const user = await Yazar.findOne({ AdSoyad: AdSoyad })
  if (!user) {
    var resim = baseImage.toString('base64');
    Yazar.create({
      AdSoyad,
      Bio,
      KısaBio,
      Konum,
      Twitter,
      Mail,
      Foto: resim
    }, err => {
      if (err) res.sendStatus(400);
      res.sendStatus(200);
    })

  }
  else {
    res.status(400);
    res.json({ hata: "Bu isimde bir yazar var" })
  }

})

app.post('/YaziEkle', async (req, res) => {
  const { yaziSahibi, yaziİsmi, içerik, konu, BaseImage, aciklama } = req.body;
  if (!yaziSahibi || !yaziİsmi || !içerik || !konu || !BaseImage || !aciklama) {
    res.status(400);
    return res.json({ hata: "Eksik alan bırakmayınız." })
  }
  const yazar = await Yazar.findOne({ AdSoyad: yaziSahibi })
  if (!yazar) {
    res.status(400);
    return res.json({ hata: "Bu isimde bir yazar yok." })
  }
  else {
    const yazi = await Yazi.findOne({ Yaziİsmi: yaziİsmi })
    if (!yazi) {
      var resim = BaseImage.toString('base64');
      Yazi.create({
        YaziSahibi: yaziSahibi,
        Yaziİsmi: yaziİsmi,
        Konu: konu,
        İçerik: içerik,
        Foto: resim,
        Aciklama: aciklama
      }, err => {
        if (err) res.sendStatus(400);
        res.sendStatus(200);
      })
    }
    else {
      res.status(400);
      res.json({ hata: "Bu isimde bir yazı var." })
    }
  }

})

app.get("/Auth", async (req, res) => {
  const token = "60ae832e8d9f614a0443dc87";
  const user = await Admin.findById(token);
  res.json({
    user: user
  })
})

app.post("/YazarBul", async (req, res) => {
  const isim = req.body;
  const user = await Yazar.findOne({ AdSoyad: Object.values(isim).toString() });
  res.json({
    user: user
  })
})

app.post("/YaziBul", async (req, res) => {
  const baslik = req.body;
  const yazi = await Yazi.findOne({ Yaziİsmi: Object.values(baslik).toString() });
  const user = await Yazar.findOne({ AdSoyad: yazi.YaziSahibi });
  res.json({
    yazi: yazi,
    user: user
  })
})
app.post("/KategoriBul", async (req, res) => {
  const kategori = req.body;
  console.log(kategori);
  const yazi = await Yazi.find({ Konu: Object.values(kategori).toString() });
  res.json({
    yazi: yazi.reverse(),

  })
})

app.get("/YaziGetir", async (req, res) => {
  let yazi = await Yazi.find({});
  let newUser = [];
  yazi.map(item => {
    newUser.push({
      _id: item._id,
      YaziSahibi: item.YaziSahibi,
      Yaziİsmi: item.Yaziİsmi,
      Konu: item.Konu,
      Foto: item.Foto,
      Tarih: item.Tarih,
      Aciklama: item.Aciklama

    })
  })
  res.json({
    yazilar: newUser.reverse()
  })
})
app.post("/FikirIlet", async (req, res) => {

  const { mail, fikir } = req.body;
  if (!mail || !fikir) {
    res.status(400);
    return res.json({ hata: "Eksik alan bırakmayınız. Fikirleriniz bize ulaşmadı" })
  }
  var transfer = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "melihnode@gmail.com",
      pass: "meliherpek1"
    }
  });

  var mailInfo = {
    from: "melih.erpek1@ogr.sakarya.edu.tr",
    to: "melih.erpek1@ogr.sakarya.edu.tr",
    subject: "Siteme Gelen Geri Dönüşler Hakkında",
    text: "Siteme Gelen Geri Dönüşler Hakkında",
    html: mail +"<p> e-mail adresine sahip kullanıcıdan gelen geri dönüş şu şekildedir:</p>" + "<p>"+fikir + "</p>"
  };

  transfer.sendMail(mailInfo, function (err) {
    if (err) { console.log(err); }
    else console.log("gönderildi")
  });
  res.json("iletildi")
})


app.listen(port);