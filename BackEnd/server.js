const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const jwt = require("jsonwebtoken");

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

const accessTokenSecret = "TokenSecret";

const mongoose = require("mongodb").MongoClient;
const mongoUrl = "mongodb+srv://TeePoT:34190@cluster0.39vukvx.mongodb.net/test";

const config = {
  connectTimeoutMS: 5000,
  socketTimeoutMS: 5000,
  useUnifiedTopology: true,
};

////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/register", urlencodedParser, async (req, res) => {
  // console.log("ทดสอบการส่งค่า", req.body.username)
  // const encryptedPassword = await bcrypt.hash(req.body.password, 10);

  let email = req.body.email;
  let username = (req.body.username).toUpperCase();
  let password = req.body.password1;

  try {
    const DB_TeePoT = await mongoose.connect(mongoUrl, config);
    if (DB_TeePoT) {
      // var dbo = db.db("User");
      var myobj = { email, username, password };
      const Old_Username = await DB_TeePoT.db("User")
        .collection("Member")
        .findOne({ username });

      // const Old_Email = await Database.db("User")
      //   .collection("Member")
      //   .findOne({ email });
      // console.log("username: ", Old_Username, "email:  Old_Email);
      // const OldUser = await Database.db("User").collection("Member").findOne({$or: [{'username': username}, {'email': email}]})

      if (Old_Username == null) {

        console.log("Old_Username", Old_Username)
        await DB_TeePoT.db("User").collection("Member").insertOne(myobj, function (err, res2) {
            if (err) throw err;
            console.log("'1' document inserted complete");
            res.json({
              alert: "ลงทะเบียนเสร็จสิ้น",
            });
            DB_TeePoT.close();
          });
      } else {
        if (Old_Username != null) {
          res.json({
            alert: "มีชื่อผู้ใช้ในระบบแล้ว",
          });
        }
      }

    }
  } catch (e) {
    console.log("status", e);
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/login", urlencodedParser, async (req, res) => {
  try {
    const DB_TeePoT = await mongoose.connect(mongoUrl, config);
    if (DB_TeePoT) {
      //Connected
      const milliseconds = new Date().getTime();
      const seconds = Math.floor((milliseconds / 1000) % 60);
      const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
      const hours = Math.floor(((milliseconds / 1000 / 60 / 60) % 24) + 7);
      console.log(`TokenCall-${hours}:${minutes}:${seconds}`);

      // console.log(req.body.user);
      let username = (req.body.value.username).toUpperCase();
      let password = req.body.value.password;

      const OldUser = await DB_TeePoT.db("User")
        .collection("Member")
        .findOne({ username });

      if (OldUser != null) {
        //เช็ค User ในระบบ DB
        if (OldUser.password == password) {
          //ตรวจสอบรหัสผ่าน
          console.log("เข้าสู่ระบบแล้ว");
          const accessToken = jwt.sign({ user: username }, accessTokenSecret, {
            expiresIn: "1h",
          });

          res.json({
            token: accessToken,
          });
        } else {
          //รหัสผ่านไม่ถูกต้อง
          res.json({
            alert: "รหัสผ่านไม่ถูกต้อง",
          });
        }
      } else {
        //ไม่มีผู้ใช้งานอยู่ในระบบ
        res.json({
          alert: "ไม่มีผู้ใช้งานอยู่ในระบบ",
        });
      }
    }
  } catch (error) {
    // console.error(error);
    console.log("NetWork Error");

    res.json({
      resError: "NetWork Error",
    });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////

// app.get("/", (req, res) => {
//   // res.send("Hello World!");
//   res.json({ message: "Hello!" });
// });

////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(3000, () => {
  //เป็นปัญหาของ IOS ที่ไม่อนุญาติให้ส่งมาที่ localhost ใช้เป็น IPv4 แทน CMD:ipconfig
  console.log(
    `API is running on http://localhost:3000, http://192.168.137.1:3000`
  );
});
