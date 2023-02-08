import * as React from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import axios from "axios";

import { PrivateRoute_Context } from "../Routers/PrivateRoute";

import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
var FormData = require("form-data");

const Admin_AddFlowering = ({ navigation }) => {
  /////////////////////////////////////////////////////////////////
  const { state, otherFunction } = React.useContext(PrivateRoute_Context);
  /////////////////////////////////////////////////////////////////
  const [Image, setImage] = React.useState(null);


  const pickImage = async () => {
    const FormData_Image = new FormData();

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log(JSON.stringify("result", result, null, 2));

    // if (formInput.has("Image") == true) {
    //   formInput = new FormData();
    // }

    if (!result.canceled) {
      // console.log("result.assets[0].uri: ", result.assets[0].uri);
      // console.log(JSON.stringify(result, null, 2));
      // setImage(result.assets[0].uri);

      let localUri = result.assets[0].uri;
      let filename = localUri.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      console.log("");
      console.log(JSON.stringify(result.assets[0], null, 2));

      // console.log(result.assets[0].uri);
      // console.log("uri: ", localUri);
      // console.log("name: ", filename);
      // console.log("type: ", type);

      // Assume "photo" is the name of the form field the server expects
      FormData_Image.append("Image", { uri: localUri, name: filename, type });
    }

    setImage(FormData_Image)
  };

  const [NewFlowering, setNewFlowering] = React.useState({
    name_flowring_plants: "", //ชื่อ
    // name_science: "", //ชื่อวิทาศาสตร์
    // clan: "", //วงศ์
    type: "", //ประเภท
    plant_stem: "", //ลำต้น
    leaf: "", //ใบ
    flowering: "", //การออกดอก
    fruitage: "", //การออกผล
    growth_rate: "", //การเจริญเติบโต
    soil: "", //ดิน
    desired_water: "", //น้ำที่ต้องการ
    sunlight: "", //แสงที่ต้องการ
    propagation: "", //การขยายพันธุ์
    sunbathing_time: "", //แสงที่ต้องการ(เวลา)
    other: "", //อื่นๆ
    tip: "", //เกร็ดน่ารู้
    img_file: null, //ลิ้งรูป
  });

  // const DD_lineage = [
  //   "Asteraceae",
  //   "Brassicaceae",
  //   "Campanulaceae",
  //   "Malvaceae",
  //   "Papaveraceae",
  //   "Solanaceae",
  //   "Lamiaceae",
  //   "Lythraceae",
  // ];
  const DD_flower_type = ["ไม้ดอก", "ไ้ม้ล้มลุก", "ไม้ดอกและไม้ล้มลุก"];
  const DD_growth = ["เร็ว", "ปานกลาง", "ช้า"];
  const DD_soil = [
    "ดินร่วนระบายน้ำดี",
    "ดินร่วนปนทราย ระบายน้ำดี",
    "วัสดุระบายน้ำดี ปลูกในน้ำแทนวัสดุได้",
  ];
  const DD_sunlight = [
    "รำไร ทนร่มได้ดี",
    "รำไร ชอบอากาศเย็น",
    "ครึ่งวัน",
    "ตลอดวัน",
    "ตลอดวัน ถึงครึ่งวัน",
    "ตลอดวัน ชอบอากาศเย็น",
    "ตลอดวัน ชอบอากาศเย็น ทนร้อน ",
    "ตลอดวัน ชอบอากาศเย็น ทนทาน",
  ];
  const DD_water = ["น้อย", "ปานกลาง", "มาก"];
  const DD_propagation = [
    "เพาะเมล็ด",
    "ปักชำกิ่ง",
    "แยกหัว",
    "ตอนกิ่ง ปักชำกิ่ง",
    "เพาะเมล็ด หรือแยกหัว",
    "เพาะเมล็ดหรือปักชำกิ่ง",
    "เพาะเมล็ด ปักชำกิ่ง หรือแยกกอ",
    "เพาะเมล็ด หรือแยกเหง้า",
  ];
  const DD_hour = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];
  const DD_miute = [0, 10, 20, 30, 40, 50];

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: "#D0F48E",
        flexGrow: 1,
        justifyContent: "center",
      }}
    >
      <Text>{"\n"}</Text>
      <Text>{"\n"}</Text>

      <Text style={{ textAlign: "center", fontSize: 20 }}>
        เพิ่มข้อมูลพืชชนิดใหม่
      </Text>

      <Text style={styles.label}>ชื่อพืช</Text>
      <TextInput
        style={styles.input}
        onChangeText={async (e) => {
          setNewFlowering({
            ...NewFlowering,
            name_flowring_plants: e,
          });
        }}
      />

      {/* <Text style={styles.label}>ชื่อวิทยาศาสตร์</Text>
      <TextInput
        style={styles.input}
        onChangeText={async (e) => {
          setNewFlowering({
            ...NewFlowering,
            name_science: e,
          });
        }}
      /> */}

      <View style={{ alignItems: "center" }}>
        <View style={{ flexDirection: "row" }}>
          {/* <View
            style={{
              flex: 1,
              alignItems: "center",
              marginBottom: 10,
              paddingStart: "1%",
            }}
          >
            <Text style={{ marginVertical: 7 }}>วงศ์ตระกูล</Text>

            <SelectDropdown
              data={DD_lineage}
              // defaultValueByIndex={1}
              // defaultValue={'Egypt'}
              onSelect={(selectedItem, index) => {
                // console.log(selectedItem, index);

                setNewFlowering({
                  ...NewFlowering,
                  clan: selectedItem,
                });
              }}
              defaultButtonText={"..."}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#444"}
                    size={15}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
          </View> */}

          <View
            style={{
              flex: 1,
              marginBottom: 10,
              marginStart: 10,
            }}
          >
            <Text style={{ marginVertical: 7 }}>ประเภท</Text>

            <SelectDropdown
              data={DD_propagation}
              // defaultValueByIndex={1}
              // defaultValue={'Egypt'}
              onSelect={(selectedItem, index) => {
                // console.log(selectedItem, index);

                setNewFlowering({
                  ...NewFlowering,
                  type: selectedItem,
                });
              }}
              defaultButtonText={"..."}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={{
                width: "97.5%",
                height: 45,
                backgroundColor: "#FFF",
                borderRadius: 7,
                borderWidth: 1,
                borderColor: "#444",
              }}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#444"}
                    size={15}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
          </View>
        </View>
      </View>

      <Text style={styles.label}>ลำต้น</Text>
      <TextInput
        style={styles.input}
        onChangeText={async (e) => {
          setNewFlowering({
            ...NewFlowering,
            plant_stem: e,
          });
        }}
      />

      <Text style={styles.label}>ใบ</Text>
      <TextInput
        style={styles.input}
        onChangeText={async (e) => {
          setNewFlowering({
            ...NewFlowering,
            leaf: e,
          });
        }}
      />

      <Text style={styles.label}>การออกดอก</Text>
      <TextInput
        editable={true}
        multiline={true}
        numberOfLines={6}
        style={{
          backgroundColor: "white",
          borderStyle: "solid",
          borderColor: "#B7B7B7",
          borderRadius: 7,
          borderWidth: 1,
          fontSize: 13,
          marginHorizontal: 10,
          paddingStart: 10,
          marginBottom: 10,
        }}
        onChangeText={async (e) => {
          setNewFlowering({
            ...NewFlowering,
            flowering: e,
          });
        }}
      />

      <Text style={styles.label}>การออกผล</Text>
      <TextInput
        style={styles.input}
        onChangeText={async (e) => {
          setNewFlowering({
            ...NewFlowering,
            fruitage: e,
          });
        }}
      />

      <View style={{ alignItems: "center" }}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              marginBottom: 10,
              paddingStart: "1.8%",
            }}
          >
            <Text style={{ marginVertical: 7 }}>การเจริญเติบโต</Text>

            <SelectDropdown
              data={DD_growth}
              // defaultValueByIndex={1}
              // defaultValue={'Egypt'}
              onSelect={(selectedItem, index) => {
                // console.log(selectedItem, index);

                setNewFlowering({
                  ...NewFlowering,
                  growth_rate: selectedItem,
                });
              }}
              defaultButtonText={"..."}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#444"}
                    size={15}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
          </View>

          <View
            style={{
              flex: 2,
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text style={{ marginVertical: 7 }}>ดิน</Text>

            <SelectDropdown
              data={DD_soil}
              // defaultValueByIndex={1}
              // defaultValue={'Egypt'}
              onSelect={(selectedItem, index) => {
                // console.log(selectedItem, index);

                setNewFlowering({
                  ...NewFlowering,
                  soil: selectedItem,
                });
              }}
              defaultButtonText={"..."}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#444"}
                    size={15}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={{ color: "#444", textAlign: "left", fontSize: 13 }}
            />
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              marginBottom: 10,
              paddingStart: "1.8%",
            }}
          >
            <Text style={{ marginVertical: 7 }}>น้ำที่ต้องการ</Text>

            <SelectDropdown
              data={DD_water}
              // defaultValueByIndex={1}
              // defaultValue={'Egypt'}
              onSelect={(selectedItem, index) => {
                // console.log(selectedItem, index);

                setNewFlowering({
                  ...NewFlowering,
                  desired_water: selectedItem,
                });
              }}
              defaultButtonText={"..."}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#444"}
                    size={15}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
          </View>

          <View
            style={{
              flex: 2,
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text style={{ marginVertical: 7 }}>แสงที่ต้องการ</Text>

            <SelectDropdown
              data={DD_sunlight}
              // defaultValueByIndex={1}
              // defaultValue={'Egypt'}
              onSelect={(selectedItem, index) => {
                // console.log(selectedItem, index);

                setNewFlowering({
                  ...NewFlowering,
                  sunlight: selectedItem,
                });
              }}
              defaultButtonText={"..."}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#444"}
                    size={15}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={{ color: "#444", textAlign: "left", fontSize: 15 }}
            />
          </View>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 7 }}>
          <View
            style={{
              flex: 1,
              marginBottom: 10,
              marginStart: 10,
            }}
          >
            <Text style={{ marginVertical: 7 }}>การขยายพันธุ์</Text>

            <SelectDropdown
              data={DD_propagation}
              // defaultValueByIndex={1}
              // defaultValue={'Egypt'}
              onSelect={(selectedItem, index) => {
                // console.log(selectedItem, index);

                setNewFlowering({
                  ...NewFlowering,
                  propagation: selectedItem,
                });
              }}
              defaultButtonText={"..."}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={{
                width: "97.5%",
                height: 45,
                backgroundColor: "#FFF",
                borderRadius: 7,
                borderWidth: 1,
                borderColor: "#444",
              }}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#444"}
                    size={15}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
          </View>
        </View>
      </View>

      <View style={{ flexDirection: "row", marginBottom: 7 }}>
        <View
          style={{
            flex: 1,
            marginBottom: 10,
          }}
        >
          <Text style={styles.label}>เวลาการอาบแดดต่อวัน</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingStart: "3%",
            }}
          >
            <View style={{ flex: 1.75 }}>
              <SelectDropdown
                data={DD_hour}
                // defaultValueByIndex={1}
                // defaultValue={'Egypt'}
                onSelect={(selectedItem, index) => {
                  // console.log(selectedItem, index);
                  let hour = String(selectedItem);

                  if (NewFlowering.sunbathing_time != "") {
                    let splitvalue = NewFlowering.sunbathing_time.split("h");
                    setNewFlowering({
                      ...NewFlowering,
                      sunbathing_time: hour + "h" + splitvalue[1],
                    });
                  } else {
                    setNewFlowering({
                      ...NewFlowering,
                      sunbathing_time: hour + "h00m",
                    });
                  }
                }}
                defaultButtonText={"..."}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                buttonStyle={{
                  width: "100%",
                  height: 45,
                  backgroundColor: "#FFF",
                  borderRadius: 7,
                  borderWidth: 1,
                  borderColor: "#444",
                }}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <FontAwesome
                      name={isOpened ? "chevron-up" : "chevron-down"}
                      color={"#444"}
                      size={15}
                    />
                  );
                }}
                dropdownIconPosition={"right"}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
              />
            </View>
            <View style={{ flex: 0.8, alignItems: "center" }}>
              <Text style={{ fontSize: 17 }}>ชั่วโมง</Text>
            </View>

            <View style={{ flex: 1.75 }}>
              <SelectDropdown
                data={DD_miute}
                // defaultValueByIndex={1}
                // defaultValue={'Egypt'}
                onSelect={(selectedItem, index) => {
                  // console.log(selectedItem, index);
                  let minute = String(selectedItem);

                  if (NewFlowering.sunbathing_time != "") {
                    // console.log(NewFlowering.sunbathing_time);
                    let splitvalue = NewFlowering.sunbathing_time.split("h");

                    setNewFlowering({
                      ...NewFlowering,
                      sunbathing_time: splitvalue[0] + "h" + minute + "m",
                    });
                  } else {
                    setNewFlowering({
                      ...NewFlowering,
                      sunbathing_time: "0h" + minute,
                    });
                  }
                }}
                defaultButtonText={"..."}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                buttonStyle={{
                  width: "100%",
                  height: 45,
                  backgroundColor: "#FFF",
                  borderRadius: 7,
                  borderWidth: 1,
                  borderColor: "#444",
                }}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <FontAwesome
                      name={isOpened ? "chevron-up" : "chevron-down"}
                      color={"#444"}
                      size={15}
                    />
                  );
                }}
                dropdownIconPosition={"right"}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
              />
            </View>
            <View style={{ flex: 0.8, alignItems: "center" }}>
              <Text style={{ fontSize: 17 }}>นาที</Text>
            </View>
          </View>
        </View>
      </View>

      <Text style={styles.label}>การใช้งานและอื่นๆ</Text>
      <TextInput
        editable={true}
        multiline={true}
        numberOfLines={10}
        style={{
          backgroundColor: "white",
          borderStyle: "solid",
          borderColor: "#B7B7B7",
          borderRadius: 7,
          borderWidth: 1,
          fontSize: 13,
          marginHorizontal: 10,
          paddingStart: 10,
          marginBottom: 10,
        }}
        onChangeText={async (e) => {
          setNewFlowering({
            ...NewFlowering,
            other: e,
          });
        }}
      />

      <Text style={styles.label}>เกร็ดน่ารู้</Text>
      <TextInput
        style={styles.input}
        onChangeText={async (e) => {
          setNewFlowering({
            ...NewFlowering,
            tip: e,
          });
        }}
      />

      <Text style={styles.label}>URL Image</Text>
      {/* <TextInput
        style={styles.input}
        onChangeText={async (e) => {
          setNewFlowering({
            ...NewFlowering,
            url_image: e,
          });
        }}
      /> */}

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="เลือกรูป" onPress={pickImage} />
        {/* {Image && (
          <Image source={{ uri: Image }} style={{ width: 200, height: 200 }} />
        )} */}

        {/* <Image
          style={{ width: 200, height: 200 }}
          source={{
            uri: Image,
          }}
        /> */}
      </View>

      <View style={{ alignItems: "center", marginTop: "5%" }}>
        <Button
          title="Add New Flower"
          onPress={async () => {
            // console.log("AllInput: ", NewFlowering);
            // formInput.append("NewFlowering", NewFlowering);

            await axios
              .post("http://192.168.137.1:3000/Upload_Image", Image, {
                headers: { "Content-Type": "multipart/form-data" },
              })

              // console.log("formInput: ", typeof formInput);
              // console.log("formInput: ", formInput)

              .then(async (res) => {
                // if (res.data.complete != undefined) {
                //   console.log(res.data.complete);
                // }
              });

            // await axios
            //   .post("http://192.168.137.1:3000/NewFlowering", {
            //     NewFlowering,
            //     Role: state.userRole,
            //   })
            //   .then(async (res) => {
            //     if (res.data.alert != undefined) {
            //       alert(res.data.alert);
            //     }

            //     if (res.data.complete != undefined) {
            //       alert(res.data.complete);
            //       // navigation.navigate("Admin_Profile");

            //       await otherFunction.getFloweringPlants();

            //       setNewFlowering({
            //         name_flowring_plants: "", //ชื่อ
            //         name_science: "", //ชื่อวิทาศาสตร์
            //         clan: "", //วงศ์
            //         type: "", //ประเภท
            //         plant_stem: "", //ลำต้น
            //         leaf: "", //ใบ
            //         flowering: "", //การออกดอก
            //         fruitage: "", //การออกผล
            //         growth_rate: "", //การเจริญเติบโต
            //         soil: "", //ดิน
            //         desired_water: "", //น้ำที่ต้องการ
            //         sunlight: "", //แสงที่ต้องการ
            //         propagation: "", //การขยายพันธุ์
            //         sunbathing_time: "", //แสงที่ต้องการ(เวลา)
            //         other: "", //อื่นๆ
            //         tip: "", //เกร็ดน่รู้
            //         img_file: null, //ลิ้งรูป
            //       });
            //     }
            //   });
          }}
        />
      </View>

      <Text>{"\n"}</Text>
    </ScrollView>
  );
};

export default Admin_AddFlowering;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D0F48E",
    flex: 1,
    justifyContent: "center",
  },
  square: {
    backgroundColor: "#7cb48f",
    width: 100,
    height: 100,
    margin: 4,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    elevation: 3,
    backgroundColor: "#2196f3",

    // paddingVertical: 8,
    // paddingHorizontal: 10,
    height: 40,
    width: 100,
  },

  input: {
    backgroundColor: "white",
    borderStyle: "solid",
    borderColor: "#B7B7B7",
    borderRadius: 7,
    borderWidth: 1,
    fontSize: 13,
    height: 45,
    marginHorizontal: 10,
    paddingStart: 10,
    marginBottom: 10,
  },

  label: {
    marginBottom: 7,
    marginStart: 10,
  },

  dropdown1BtnStyle: {
    width: "92%",
    height: 45,
    backgroundColor: "#FFF",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },
});
