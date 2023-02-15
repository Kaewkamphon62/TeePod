const MongoClient = require("mongodb").MongoClient; //mongoose
const jwt = require("jsonwebtoken");
const express = require("express");
const fileupload = require("express-fileupload");

const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

// Register and set up the middleware
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(fileupload());
app.use(express.urlencoded({ extended: true }));

// const bodyParser = require("body-parser");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// const baseUrl = "mongodb+srv://TeePoT:34190@cluster0.39vukvx.mongodb.net/test";
const baseUrl = "mongodb://localhost:27017/";

const config = {
  connectTimeoutMS: 5000,
  socketTimeoutMS: 5000,
  useUnifiedTopology: true,
};

const accessTokenSecret = "TokenSecret";

const storage = new GridFsStorage({ url: baseUrl });
const upload = multer({ storage });

////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/loadIotData", async (req, res) => {
  try {
    const DB_TeePoT = await MongoClient.connect(baseUrl, config);
    // console.log()

    if (DB_TeePoT) {
      const MyKey = req.body.KeyIOT;

      // const FindKey = await DB_TeePoT.db("TeePoT")
      //   .collection("IOT")
      //   .findOne({ keyiot: MyKey });

      // if (FindKey != null) {
      const DBKey = await DB_TeePoT.db("TeePoT")
        .collection("IOT")
        .find({ keyiot: MyKey })
        .sort({ timerecord: -1 })
        .limit(1)
        .toArray();

      res.json({
        keyzero: DBKey[0],
      });
      // }
    }
  } catch (error) {
    res.json({
      resError: "NetWork Error",
    });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/Member_InputKey", async (req, res) => {
  try {
    let Username = req.body.InputKey.Username;
    let Key = req.body.InputKey.Key.toUpperCase();

    const DB_TeePoT = await MongoClient.connect(baseUrl, config);

    if (DB_TeePoT) {
      const FindKey = await DB_TeePoT.db("TeePoT")
        .collection("IOT")
        .findOne({ keyiot: Key });

      if (FindKey != null) {
        // console.log(FindKey);

        const DataUpdate = await DB_TeePoT.db("User")
          .collection("Member")
          .updateOne({ username: Username }, { $set: { keyIOT: Key } });

        if (DataUpdate) {
          res.json({
            complete: "อัพเดตเรียบร้อย",
          });
        }
      } else {
        res.json({
          resError: `ไม่มี Key: ${Key} ในระบบ`,
        });
      }
    }
  } catch (error) {
    res.json({
      resError: "NetWork Error",
    });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/Member_DeleteKey", async (req, res) => {
  try {
    let Username = req.body.InputKey.Username;

    const DB_TeePoT = await MongoClient.connect(baseUrl, config);
    if (DB_TeePoT) {
      const KeyToNull = await DB_TeePoT.db("User")
        .collection("Member")
        .updateOne({ username: Username }, { $set: { keyIOT: null } });

      if (KeyToNull != null) {
        res.json({
          complete: "อัพเดตเรียบร้อย",
        });
      } else {
        res.json({
          resError: "ErrorCode500",
        });
      }
    }
  } catch (error) {
    res.json({
      resError: "NetWork Error",
    });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/loadMemberData", async (req, res) => {
  // console.log("userToken: ", req.body.userToken);
  console.log("");
  console.log("loadMemberData");
  let username = req.body.username;

  try {
    const DB_TeePoT = await MongoClient.connect(baseUrl, config);
    if (DB_TeePoT) {
      // console.log("Test if loadMemberData");
      const MemberData = await DB_TeePoT.db("User")
        .collection("Member")
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

app.post("/loadFloweringPlants", async (req, res) => {
  // console.log("userToken: ", req.body.userToken);
  console.log("");
  console.log("loadFloweringPlants");

  try {
    const DB_TeePoT = await MongoClient.connect(baseUrl, config);
    if (DB_TeePoT) {
      const getFloweringplants = async () => {
        let Data = await DB_TeePoT.db("TeePoT")
          .collection("Flowering_Plants")
          .find({})
          .toArray();

        return Data;
      };
      // console.log("Floweringlants", await getFloweringlants());

      res.json({
        fp: await getFloweringplants(),
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
//หน้าเลือกพืช

app.post("/SelectFloweringPlants", async (req, res) => {
  // console.log("userToken: ", req.body.userToken);
  console.log("");
  console.log("SelectFloweringPlants");

  // console.log(req.body.UserUsername)
  // console.log(req.body.name_flowring_plants)
  // console.log(req.body.sunbathing_time)

  let Username = req.body.UserUsername;
  const NFP = req.body.name_flowring_plants;
  const ST = req.body.sunbathing_time;

  try {
    const DB_TeePoT = await MongoClient.connect(baseUrl, config);
    if (DB_TeePoT) {
      const DataUpdate = await DB_TeePoT.db("User")
        .collection("Member")
        .updateOne(
          { username: Username },
          { $set: { name_flowring_plants: NFP, sunbathing_time: ST } }
        );

      // res.json({
      //   alert: "อัพเดตเรียบร้อย",
      // });

      if (DataUpdate) {
        res.json({
          alert: "อัพเดตเรียบร้อย",
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
//หน้าอัพเดตพืช

app.post("/EditFloweringlants", async (req, res) => {
  // console.log("userToken: ", req.body.userToken);
  console.log("");
  console.log("EditFloweringlants");

  const SelectFlowering = req.body.SelectFloweringPlants;
  let Old_Name = req.body.Old_NameFloweringPlants;
  // console.log(Old_Name);

  try {
    const DB_TeePoT = await MongoClient.connect(baseUrl, config);
    if (DB_TeePoT) {
      const DataUpdate = await DB_TeePoT.db("TeePoT")
        .collection("Flowering_Plants")
        .updateOne(
          { name_flowring_plants: Old_Name },
          {
            $set: {
              name_flowring_plants: SelectFlowering.name_flowring_plants, //ชื่อ
              name_science: SelectFlowering.name_science, //ชื่อวิทาศาสตร์
              clan: SelectFlowering.clan, //วงศ์
              type: SelectFlowering.type, //ประเภท
              plant_stem: SelectFlowering.plant_stem, //ลำต้น
              leaf: SelectFlowering.leaf, //ใบ
              flowering: SelectFlowering.flowering, //การออกดอก
              fruitage: SelectFlowering.fruitage, //การออกผล
              growth_rate: SelectFlowering.growth_rate, //การเจริญเติบโต
              soil: SelectFlowering.soil, //ดิน
              desired_water: SelectFlowering.desired_water, //น้ำที่ต้องการ
              sunlight: SelectFlowering.sunlight, //แสงที่ต้องการ
              propagation: SelectFlowering.propagation, //การขยายพันธุ์
              sunbathing_time: SelectFlowering.sunbathing_time, //แสงที่ต้องการ(เวลา)
              other: SelectFlowering.other, //อื่นๆ
              tip: SelectFlowering.tip, //เกร็ดน่ารู้
              img_base64: SelectFlowering.img_base64, //ลิ้งรูป
            },
          }
        );

      // res.json({
      //   alert: "อัพเดตเรียบร้อย",
      // });

      if (DataUpdate) {
        res.json({
          complete: "อัพเดตเรียบร้อย",
        });
      } else {
        res.json({
          resError: "ErrorCode500",
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

// app.post("/Upload_Image", async (req, res) => {
//   try {
//     const DB_TeePoT = await MongoClient.connect(baseUrl, config);
//     if (DB_TeePoT) {
//       console.log("Imageeeeee: ", req.files);
//     }
//   } catch (error) {
//     // console.error(error);
//     console.log("NetWork Error");

//     res.json({
//       resError: "NetWork Error",
//     });
//   }
// });

// app.post("/Upload_Image", upload.single("image"), async (req, res, next) => {
//   console.log("req.files", await req.files);

// });

app.post("/NewFlowering", async (req, res) => {
  // console.log("req.body.NewFlowering", req.body.NewFlowering);
  // console.log("req.body.Role: ", req.body.Role);
  let ResNewFlowering = req.body.NewFlowering;
  let name_flowring_plants = req.body.NewFlowering.name_flowring_plants;

  if (req.body.Role == "Admin") {
    try {
      const DB_TeePoT = await MongoClient.connect(baseUrl, config);
      if (DB_TeePoT) {
        let myobj = ResNewFlowering;

        const Old_name = await DB_TeePoT.db("TeePoT")
          .collection("Flowering_Plants")
          .findOne({ name_flowring_plants });

        if (Old_name == null) {
          console.log("myobj", myobj);

          const AddNewFlowering = await DB_TeePoT.db("TeePoT")
            .collection("Flowering_Plants")
            .insertOne(myobj);

          if (AddNewFlowering) {
            res.json({
              complete: "เพิ่มพืชใหม่แล้ว",
            });
          }
        } else {
          if (Old_name != null) {
            res.json({
              alert: "มีชื่อพืชนี้ในระบบแล้ว",
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

app.post("/DeleteFlowering", async (req, res) => {
  let Old_Name = req.body.Old_NameFloweringPlants;
  console.log(Old_Name);

  if (req.body.Role == "Admin") {
    try {
      const DB_TeePoT = await MongoClient.connect(baseUrl, config);
      if (DB_TeePoT) {
        const Old_name = await DB_TeePoT.db("TeePoT")
          .collection("Flowering_Plants")
          .findOne({ name_flowring_plants: Old_Name });

        if (Old_name != null) {
          await DB_TeePoT.db("TeePoT")
            .collection("Flowering_Plants")
            .deleteOne({ name_flowring_plants: Old_Name });

          res.json({
            complete: "ลบแล้ว",
          });
        } else {
          res.json({
            alert: "ไม่มีข้อมูลพืชนี้ในระบบ",
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
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/ctoken", async (req, res) => {
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
app.post("/login", async (req, res) => {
  try {
    const DB_TeePoT = await MongoClient.connect(baseUrl, config);
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
        //เช็ค User ในระบบ DB
        if (OldUser.password == password) {
          //ตรวจสอบรหัสผ่าน
          console.log("เข้าสู่ระบบแล้ว");
          const accessToken = jwt.sign(
            { user: username, role: CollectionWhere },
            accessTokenSecret
          );

          // console.log("accessToken", accessToken)

          res.json({
            token: accessToken,
            role: CollectionWhere,
            member_username: username,
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

app.post("/register", async (req, res) => {
  // console.log("ทดสอบการส่งค่า", req.body.username)
  // const encryptedPassword = await bcrypt.hash(req.body.password, 10);

  let email = req.body.InputSignUp.email;
  let username = req.body.InputSignUp.username.toUpperCase();
  let password = req.body.InputSignUp.password1;

  console.log(email, username, password);

  try {
    const DB_TeePoT = await MongoClient.connect(baseUrl, config);
    if (DB_TeePoT) {
      // var dbo = db.db("User");
      var myobj = {
        email,
        username,
        password,
        name_flowring_plants: null,
        sunbathing_time: null,
        keyIOT: null,
      };
      const Old_Username = await DB_TeePoT.db("User")
        .collection("Member")
        .findOne({ username });

      // const Old_Email = await Database.db("User")
      //   .collection("Member")
      //   .findOne({ email });
      // console.log("username: ", Old_Username, "email:  Old_Email);
      // const OldUser = await Database.db("User").collection("Member").findOne({$or: [{'username': username}, {'email': email}]})

      if (Old_Username == null) {
        // console.log("Old_Username", Old_Username);
        console.log("myobj: ", myobj);

        const NewMember = await DB_TeePoT.db("User")
          .collection("Member")
          .insertOne(myobj);

        if (NewMember) {
          res.json({
            alert: "ลงทะเบียนเสร็จสิ้น",
          });
        }
      } else {
        res.json({
          alert: "มีชื่อผู้ใช้ในระบบแล้ว",
        });
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
  //เป็นปัญหาของ IOS ที่ไม่อนุญาติให้ส่งมาที่ localhost ใช้เป็น IPv4 แทน CMD:ipconfig
  console.log(
    `API is running on http://localhost:3000, http://192.168.137.1:3000`
  );
});
