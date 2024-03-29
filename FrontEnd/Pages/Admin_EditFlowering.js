import * as React from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import axios from "axios";

import { PrivateRoute_Context } from "../Routers/PrivateRoute";

import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "react-native-vector-icons/AntDesign";

const Admin_EditFlowering = ({ navigation }) => {
  /////////////////////////////////////////////////////////////////
  const { state, otherFunction } = React.useContext(PrivateRoute_Context);
  /////////////////////////////////////////////////////////////////

  React.useEffect(() => {
    (async () => {
      if (state.FloweringPlants != null) {
        // console.log(JSON.stringify(state.FloweringPlants, null, 2));

        setNameFloweringPlants(
          await state.FloweringPlants.map(
            (dataFP) => dataFP.name_flowring_plants
          )
        );

        setFloweringPlants(await state.FloweringPlants);
      } else {
        otherFunction.getFloweringPlants({});
      }
    })();
  }, [state.FloweringPlants]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      console.log("");
      console.log(JSON.stringify(result.assets[0], null, 2));

      setSelectFloweringPlants({
        ...SelectFloweringPlants,
        img_base64: result.assets[0].base64,
      });
    }
  };

  const [SelectFloweringPlants, setSelectFloweringPlants] = React.useState([]);
  const [NameFloweringPlants, setNameFloweringPlants] = React.useState([]);
  const [Old_NameFloweringPlants, setOld_NameFloweringPlants] =
    React.useState("");
  const [FloweringPlants, setFloweringPlants] = React.useState({
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
    img_base64: null, //ลิ้งรูป
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

  // const GetArrayForDropDown = (i) => {
  //   let array = "";

  //   // if (SelectFloweringPlants.name_flowring_plants != undefined) {
  //   if (i == "clan") {
  //     // console.log("clan: ", SelectFloweringPlants.clan);
  //     array = [
  //       "Asteraceae",
  //       "Brassicaceae",
  //       "Campanulaceae",
  //       "Malvaceae",
  //       "Papaveraceae",
  //       "Solanaceae",
  //       "Lamiaceae",
  //     ];
  //   }
  //   // }

  //   return array;
  // };

  // const GetValueByName = (i) => {
  //   retrun(
  //     <SelectDropdown
  //       data={DD_lineage}
  //       // defaultValueByIndex={1}
  //       // defaultValue={'Egypt'}
  //       onSelect={(selectedItem, index) => {
  //         // console.log(selectedItem, index);

  //         setSelectFloweringPlants({
  //           ...SelectFloweringPlants,
  //           clan: selectedItem,
  //         });
  //       }}
  //       // defaultButtonText={
  //       //   SelectFloweringPlants.clan != undefined
  //       //     ? SelectFloweringPlants.clan
  //       //     : "..."
  //       // }

  //       defaultButtonText={
  //         // () => {
  //         //   return "...";
  //         // }

  //         SelectFloweringPlants.clan != undefined
  //           ? SelectFloweringPlants.clan
  //           : "..."
  //       }
  //       buttonTextAfterSelection={(selectedItem, index) => {
  //         return selectedItem;
  //       }}
  //       rowTextForSelection={(item, index) => {
  //         return item;
  //       }}
  //       buttonStyle={styles.dropdown1BtnStyle}
  //       buttonTextStyle={styles.dropdown1BtnTxtStyle}
  //       renderDropdownIcon={(isOpened) => {
  //         return (
  //           <FontAwesome
  //             name={isOpened ? "chevron-up" : "chevron-down"}
  //             color={"#444"}
  //             size={15}
  //           />
  //         );
  //       }}
  //       dropdownIconPosition={"right"}
  //       dropdownStyle={styles.dropdown1DropdownStyle}
  //       rowStyle={styles.dropdown1RowStyle}
  //       rowTextStyle={styles.dropdown1RowTxtStyle}
  //     />
  //   );
  // };

  const GetValueTime = (i) => {
    let value = "";

    // console.log("SFP001", SelectFloweringPlants.sunbathing_time);
    if (
      SelectFloweringPlants.sunbathing_time != undefined &&
      SelectFloweringPlants.sunbathing_time != ""
    ) {
      let ArrayTime = SelectFloweringPlants.sunbathing_time.split("h");

      if (i == "h") {
        value = ArrayTime[0];
      } else {
        value = ArrayTime[1].substring(0, ArrayTime[1].length - 1);
      }
    }
    return value;
  };

  React.useEffect(() => {
    GetValueTime();
    // GetArrayForDropDown();
  }, [SelectFloweringPlants]);

  return (
    <ScrollView
      contentContainerStyle={{
        // backgroundColor: "#D0F48E",
        flexGrow: 1,
        justifyContent: "center",
      }}
    >
      <Text>{"\n"}</Text>
      <Text>{"\n"}</Text>

      <View
        style={{
          alignItems: "center",
          marginBottom: 10,
          marginStart: 10,
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 15,
            marginVertical: 7,
            flex: 1,
            // backgroundColor: "red",
          }}
        >
          เลือกพืชที่จะแก้ไข
        </Text>

        <View
          style={{
            flex: 3,
            alignItems: "center",
          }}
        >
          <SelectDropdown
            data={NameFloweringPlants}
            // defaultValueByIndex={1}
            // defaultValue={'Egypt'}
            onSelect={(selectedItem, index) => {
              (async () => {
                const PositionName = await FloweringPlants.map(
                  (dataFP) => dataFP.name_flowring_plants
                ).indexOf(selectedItem);

                await setOld_NameFloweringPlants(selectedItem);

                await setSelectFloweringPlants(FloweringPlants[PositionName]);
              })();
            }}
            defaultValue={"..."}
            defaultButtonText={"..."}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={{
              width: "80%",
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

        <AntDesign
          style={{
            // backgroundColor: "red",
            // fontSize: 15,
            flex: 0.5,
          }}
          name="delete"
          size={35}
          color="black"
          onPress={async () => {
            if (SelectFloweringPlants.name_flowring_plants != "") {
              await axios
                .post("http://192.168.137.1:3000/DeleteFlowering", {
                  Role: state.userRole,
                  Old_NameFloweringPlants,
                })
                .then(async (res) => {
                  if (res.data.resError != undefined) {
                    alert(res.data.resError);
                  }

                  if (res.data.alert != undefined) {
                    alert(res.data.alert);
                  }

                  if (res.data.complete != undefined) {
                    otherFunction.getFloweringPlants();
                    alert(res.data.complete);
                    setSelectFloweringPlants([]);
                    setNameFloweringPlants([]);
                  }
                });
            } else {
              alert("กรุณาเลือกพืชที่จะลบ");
            }
          }}
        />
      </View>

      <Text style={{ textAlign: "center", fontSize: 20, marginTop: "5%" }}>
        แก้ไขพืช
      </Text>

      <Text style={styles.label}>ชื่อพืช</Text>
      <TextInput
        value={SelectFloweringPlants.name_flowring_plants}
        style={styles.input}
        onChangeText={async (e) => {
          setSelectFloweringPlants({
            ...SelectFloweringPlants,
            name_flowring_plants: e,
          });
        }}
      />

      <View style={{ alignItems: "center" }}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flex: 1,
              marginBottom: 10,
              marginStart: 10,
            }}
          >
            <Text style={{ marginVertical: 7 }}>ประเภท</Text>

            <SelectDropdown
              data={DD_flower_type}
              // defaultValueByIndex={1}
              defaultValue={
                SelectFloweringPlants.type != undefined
                  ? SelectFloweringPlants.type
                  : "..."
              }
              onSelect={(selectedItem, index) => {
                // console.log(selectedItem, index);

                setSelectFloweringPlants({
                  ...SelectFloweringPlants,
                  type: selectedItem,
                });
              }}
              defaultButtonText={
                SelectFloweringPlants.type != undefined
                  ? SelectFloweringPlants.type
                  : "..."
              }
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
        value={SelectFloweringPlants.plant_stem}
        style={styles.input}
        onChangeText={async (e) => {
          setSelectFloweringPlants({
            ...SelectFloweringPlants,
            plant_stem: e,
          });
        }}
      />

      <Text style={styles.label}>ใบ</Text>
      <TextInput
        value={SelectFloweringPlants.leaf}
        style={styles.input}
        onChangeText={async (e) => {
          setSelectFloweringPlants({
            ...SelectFloweringPlants,
            leaf: e,
          });
        }}
      />

      <Text style={styles.label}>การออกดอก</Text>
      <TextInput
        value={SelectFloweringPlants.flowering}
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
          setSelectFloweringPlants({
            ...SelectFloweringPlants,
            flowering: e,
          });
        }}
      />

      <Text style={styles.label}>การออกผล</Text>
      <TextInput
        value={SelectFloweringPlants.fruitage}
        style={styles.input}
        onChangeText={async (e) => {
          setSelectFloweringPlants({
            ...SelectFloweringPlants,
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
              defaultValue={
                SelectFloweringPlants.growth_rate != undefined
                  ? SelectFloweringPlants.growth_rate
                  : "..."
              }
              onSelect={(selectedItem, index) => {
                // console.log(selectedItem, index);

                setSelectFloweringPlants({
                  ...SelectFloweringPlants,
                  growth_rate: selectedItem,
                });
              }}
              defaultButtonText={
                SelectFloweringPlants.growth_rate != undefined
                  ? SelectFloweringPlants.growth_rate
                  : "..."
              }
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
              defaultValue={
                SelectFloweringPlants.soil != undefined
                  ? SelectFloweringPlants.soil
                  : "..."
              }
              onSelect={(selectedItem, index) => {
                // console.log(selectedItem, index);

                setSelectFloweringPlants({
                  ...SelectFloweringPlants,
                  soil: selectedItem,
                });
              }}
              defaultButtonText={
                SelectFloweringPlants.soil != undefined
                  ? SelectFloweringPlants.soil
                  : "..."
              }
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
              defaultValue={
                SelectFloweringPlants.desired_water != undefined
                  ? SelectFloweringPlants.desired_water
                  : "..."
              }
              onSelect={(selectedItem, index) => {
                // console.log(selectedItem, index);

                setSelectFloweringPlants({
                  ...SelectFloweringPlants,
                  desired_water: selectedItem,
                });
              }}
              defaultButtonText={
                SelectFloweringPlants.desired_water != undefined
                  ? SelectFloweringPlants.desired_water
                  : "..."
              }
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
              defaultValue={
                SelectFloweringPlants.sunlight != undefined
                  ? SelectFloweringPlants.sunlight
                  : "..."
              }
              onSelect={(selectedItem, index) => {
                // console.log(selectedItem, index);

                setSelectFloweringPlants({
                  ...SelectFloweringPlants,
                  sunlight: selectedItem,
                });
              }}
              defaultButtonText={
                SelectFloweringPlants.sunlight != undefined
                  ? SelectFloweringPlants.sunlight
                  : "..."
              }
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
              defaultValue={
                SelectFloweringPlants.propagation != undefined
                  ? SelectFloweringPlants.propagation
                  : "..."
              }
              onSelect={(selectedItem, index) => {
                // console.log(selectedItem, index);

                setSelectFloweringPlants({
                  ...SelectFloweringPlants,
                  propagation: selectedItem,
                });
              }}
              defaultButtonText={
                SelectFloweringPlants.propagation != undefined
                  ? SelectFloweringPlants.propagation
                  : "..."
              }
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
                defaultValue={
                  SelectFloweringPlants.sunbathing_time != undefined
                    ? GetValueTime("h")
                    : "..."
                }
                onSelect={(selectedItem, index) => {
                  // console.log(selectedItem, index);
                  let hour = String(selectedItem);
                  // if (hour == "") {
                  //   hour = 0;
                  // }

                  if (SelectFloweringPlants.sunbathing_time != undefined) {
                    let splitvalue =
                      SelectFloweringPlants.sunbathing_time.split("h");
                    setSelectFloweringPlants({
                      ...SelectFloweringPlants,
                      sunbathing_time: hour + "h" + splitvalue[1],
                    });
                  } else {
                    setSelectFloweringPlants({
                      ...SelectFloweringPlants,
                      sunbathing_time: hour + "h00m",
                    });
                  }
                }}
                defaultButtonText={
                  SelectFloweringPlants.sunbathing_time != undefined
                    ? GetValueTime("h")
                    : "..."
                }
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
                defaultValue={
                  SelectFloweringPlants.sunbathing_time != undefined
                    ? GetValueTime("m")
                    : "..."
                }
                onSelect={(selectedItem, index) => {
                  // console.log(selectedItem, index);
                  let minute = String(selectedItem);

                  if (SelectFloweringPlants.sunbathing_time != undefined) {
                    // console.log(SelectFloweringPlants.sunbathing_time);
                    let splitvalue =
                      SelectFloweringPlants.sunbathing_time.split("h");

                    setSelectFloweringPlants({
                      ...SelectFloweringPlants,
                      sunbathing_time: splitvalue[0] + "h" + minute + "m",
                    });
                  } else {
                    setSelectFloweringPlants({
                      ...SelectFloweringPlants,
                      sunbathing_time: "0h" + minute,
                    });
                  }
                }}
                defaultButtonText={
                  SelectFloweringPlants.sunbathing_time != undefined
                    ? GetValueTime("m")
                    : "..."
                }
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
        value={SelectFloweringPlants.other}
        editable={true}
        multiline={true}
        numberOfLines={7}
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
          setSelectFloweringPlants({
            ...SelectFloweringPlants,
            other: e,
          });
        }}
      />

      <Text style={styles.label}>เกร็ดน่ารู้</Text>
      <TextInput
        value={SelectFloweringPlants.tip}
        editable={true}
        multiline={true}
        numberOfLines={7}
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
          setSelectFloweringPlants({
            ...SelectFloweringPlants,
            tip: e,
          });
        }}
      />

      <Text style={styles.label}>รูปภาพ</Text>

      <View
        style={{
          alignItems: "center",
          borderStyle: "solid",
          borderColor: "black",
          // borderRadius: 5,
          // borderWidth: 1,
        }}
      >
        <Image
          style={{
            // margin: "10%",
            borderRadius: 5,
            marginBottom: "5%",
            width: 150,
            height: 150,
          }}
          source={{
            uri: `data:image/png;base64,${SelectFloweringPlants.img_base64}`,
          }}
        />
      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="เลือกรูป" onPress={pickImage} />
      </View>

      <View style={{ alignItems: "center", marginTop: "5%" }}>
        <Button
          title="Comfirm Edit Flower"
          onPress={async () => {
            // console.log("NewUpdate: ", SelectFloweringPlants);
            // console.log(
            //   "NewUpdate",
            //   JSON.stringify(SelectFloweringPlants, null, 2)
            // );

            await axios
              .post("http://192.168.137.1:3000/EditFloweringlants", {
                SelectFloweringPlants,
                Old_NameFloweringPlants,
              })
              .then(async (res) => {
                if (res.data.resError != undefined) {
                  alert(res.data.resError);
                }

                if (res.data.complete != undefined) {
                  otherFunction.getFloweringPlants();
                  alert(res.data.complete);
                  setSelectFloweringPlants([]);
                  setNameFloweringPlants([]);
                }
              });
          }}
        />
      </View>

      <Text>{"\n"}</Text>
    </ScrollView>
  );
};

export default Admin_EditFlowering;

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
