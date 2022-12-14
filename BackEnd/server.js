const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const jwt = require("jsonwebtoken");
const e = require("express");

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

app.post("/getDB_IOT", urlencodedParser, async (req, res) => {
  try {
    const DB_TeePoT = await mongoose.connect(mongoUrl, config);

    if (DB_TeePoT) {
      const MyKey = req.body.InputKey;

      // const { ObjectId } = require('mongodb');
      // const MyKey = ObjectId("63a053a60504451cf44da2cd")
      // console.log('MyKey typeof: ', typeof MyKey)
      // const OldKey = await DB_TeePoT.db("TeePoT").collection("IOT").findOne({_id: MyKey})
      // console.log("OldKey", OldKey);

      const DBKey = await DB_TeePoT.db("TeePoT")
        .collection("IOT")
        .find({ keyiot: MyKey })
        .sort({ timerecord: -1 })
        .limit(1)
        .toArray();

      res.json({
        Key: DBKey[0],
      });
    }
  } catch (error) {
    res.json({
      resError: "NetWork Error",
    });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/loadMemberData", urlencodedParser, async (req, res) => {
  // console.log("userToken: ", req.body.userToken);
  console.log("");
  console.log("loadMemberData");
  let username = req.body.username;

  try {
    const DB_TeePoT = await mongoose.connect(mongoUrl, config);
    if (DB_TeePoT) {
      // console.log("Test if loadMemberData");
      const MemberData = await DB_TeePoT.db("TeePoT")
        .collection("Member_Data")
        .findOne({ username });

      if (MemberData != null) {
        console.log(MemberData);

        res.json({
          mdata: MemberData,
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

app.post("/loadFloweringlants", urlencodedParser, async (req, res) => {
  // console.log("userToken: ", req.body.userToken);
  console.log("");
  console.log("loadFloweringlants");

  try {
    const DB_TeePoT = await mongoose.connect(mongoUrl, config);
    if (DB_TeePoT) {
      const getFloweringlants = async () => {
        let Data = await DB_TeePoT.db("TeePoT")
          .collection("Flowering_Plants")
          .find({})
          .toArray();

        return Data;
      };
      // console.log("Floweringlants", await getFloweringlants());

      res.json({
        fp: await getFloweringlants(),
      });
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
//????????????????????????????????????

app.post("/SelectFloweringlants", urlencodedParser, async (req, res) => {
  // console.log("userToken: ", req.body.userToken);
  console.log("");
  console.log("SelectFloweringlants");

  // console.log(req.body.UserUsername)
  // console.log(req.body.name_flowring_plants)
  // console.log(req.body.sunbathing_time)

  let Username = req.body.UserUsername;
  let NFP = req.body.name_flowring_plants;
  let ST = req.body.sunbathing_time;

  try {
    const DB_TeePoT = await mongoose.connect(mongoUrl, config);
    if (DB_TeePoT) {
      const DataUpdate = await DB_TeePoT.db("TeePoT")
        .collection("Member_Data")
        .updateOne(
          { username: Username },
          { $set: { name_flowring_plants: NFP, sunbathing_time: ST } }
        );

      // res.json({
      //   alert: "?????????????????????????????????????????????",
      // });

      if (DataUpdate) {
        res.json({
          alert: "?????????????????????????????????????????????",
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
//Admin
app.post("/NewFlowering", urlencodedParser, async (req, res) => {
  // console.log("req.body.NewFlowering", req.body.NewFlowering);
  console.log("req.body.Role: ", req.body.Role);
  let ResNewFlowering = req.body.NewFlowering;
  let name_flowring_plants = req.body.NewFlowering.name_flowring_plants;

  if (req.body.Role == "Admin") {
    try {
      const DB_TeePoT = await mongoose.connect(mongoUrl, config);
      if (DB_TeePoT) {
        var myobj = ResNewFlowering;
        const Old_name = await DB_TeePoT.db("TeePoT")
          .collection("Flowering_Plants")
          .findOne({ name_flowring_plants });

        if (Old_name == null) {
          await DB_TeePoT.db("TeePoT")
            .collection("Flowering_Plants")
            .insertOne(myobj, function (err, res2) {
              if (err) throw err;
              console.log("'1' document inserted complete");
              res.json({
                alert: "????????????????????????????????????????????????",
              });
              DB_TeePoT.close();
            });
        } else {
          if (Old_name != null) {
            res.json({
              alert: "????????????????????????????????????",
            });
          }
        }
      }
    } catch (error) {
      // console.error(error);
      console.log("NetWork Error");

      res.json({
        resError: "NetWork Error",
      });
    }
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/ctoken", urlencodedParser, async (req, res) => {
  // console.log("userToken: ", req.body.userToken);
  jwt.verify(req.body.userToken, accessTokenSecret, (err, User) => {
    if (err) {
      // console.log('error token: ', accessTokenSecret)
      res.json({
        error: "Not Found Token",
      });
    } else {
      res.json({
        name: User.user,
        role: User.role,
      });
    }
  });
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
      let username = req.body.value.username.toUpperCase();
      let password = req.body.value.password;

      // console.log("username", username.substring(0, 6));
      // console.log("usernamesss", username);

      let CollectionWhere = "";

      if (username.substring(0, 6) == "@ADMIN") {
        CollectionWhere = "Admin";
      } else {
        CollectionWhere = "Member";
      }

      const OldUser = await DB_TeePoT.db("User")
        .collection(CollectionWhere)
        .findOne({ username });

      // console.log(OldUser)

      if (OldUser != null) {
        //???????????? User ?????????????????? DB
        if (OldUser.password == password) {
          //?????????????????????????????????????????????
          console.log("?????????????????????????????????????????????");
          const accessToken = jwt.sign(
            { user: username, role: CollectionWhere },
            accessTokenSecret
          );

          // console.log("accessToken", accessToken)

          res.json({
            token: accessToken,
            role: CollectionWhere,
            member_username: username
          });
        } else {
          //??????????????????????????????????????????????????????
          res.json({
            alert: "??????????????????????????????????????????????????????",
          });
        }
      } else {
        //????????????????????????????????????????????????????????????????????????
        res.json({
          alert: "????????????????????????????????????????????????????????????????????????",
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

app.post("/register", urlencodedParser, async (req, res) => {
  // console.log("??????????????????????????????????????????", req.body.username)
  // const encryptedPassword = await bcrypt.hash(req.body.password, 10);

  let email = req.body.InputSighUp.email;
  let username = req.body.InputSighUp.username.toUpperCase();
  let password = req.body.InputSighUp.password1;

  console.log(email, username, password);

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
        console.log("Old_Username", Old_Username);

        // await DB_TeePoT.db("User")
        //   .collection("Member")
        //   .insertOne(myobj, function (err, res2) {
        //     if (err) throw err;
        //     console.log("'1' document inserted complete");
        //     res.json({
        //       nav: "??????????????????????????????????????????????????????",
        //     });
        //     DB_TeePoT.close();
        //   });

        const NewMemberData = await DB_TeePoT.db("TeePoT")
          .collection("Member_Data")
          .insertOne({
            username: username,
            name_flowring_plants: null,
            sunbathing_time: null,
          });
        const NewMember = await DB_TeePoT.db("User")
          .collection("Member")
          .insertOne(myobj);

        if (NewMemberData && NewMember) {
          res.json({
            alert: "??????????????????????????????????????????????????????",
          });
        }
      } else {
        if (Old_Username != null) {
          res.json({
            alert: "??????????????????????????????????????????????????????????????????",
          });
        }
      }
    }
  } catch (e) {
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
  //???????????????????????????????????? IOS ???????????????????????????????????????????????????????????????????????? localhost ????????????????????? IPv4 ????????? CMD:ipconfig
  console.log(
    `API is running on http://localhost:3000, http://192.168.137.1:3000`
  );
});
