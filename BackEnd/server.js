const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const jwt = require('jsonwebtoken');

const accessTokenSecret = 'TokenSecret';

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

app.get("/", (req, res) => {
  // res.send("Hello World!");
  res.json({ message: "Hello!" });
});

app.post("/Token", urlencodedParser, (req, res) => {
  // res.send("Hello This is app.get");
  console.log("");
  // console.log("Hello I'am BackEnd. What do you want for me?");
  // console.log(req.body.InputSighIn);

  const accessToken = jwt.sign({ user: req.body.InputSighIn.username }, accessTokenSecret, { expiresIn: "1h" });

  // console.log(
  //   "id_member&Password",
  //   req.body.InputSighIn.username,
  //   req.body.InputSighIn.password
  // ); //ได้รับข้อมูลแล้ว

  res.json({
    token: accessToken,
  });
});

app.listen(3000, () => {
  //เป็นปัญหาของ IOS ที่ไม่อนุญาติให้ส่งมาที่ localhost ใช้เป็น IPv4 แทน CMD:ipconfig
  console.log(
    `API is running on http://localhost:3000, http://192.168.137.1:3000`
  );
});
