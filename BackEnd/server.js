const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/token", (req, res) => {
  // res.send("Hello This is app.get");
  console.log('Hello I am BackEnd')
  console.log(req)

  // console.log(
  //   "id_member&Password",
  //   req.body.InputSighIn.username,
  //   req.body.InputSighIn.password
  // ); //ได้รับข้อมูลแล้ว

  // res.json({
  //   data: Test,
  // });
});

app.listen(3000, () => {
  console.log(`API is running on https://localhost:3000`);
});
