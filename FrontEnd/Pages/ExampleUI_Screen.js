import * as React from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import DropDownPicker from "react-native-dropdown-picker";
import {useForm, Controller} from 'react-hook-form';
import { PrivateRoute_Context } from "../Routers/PrivateRoute";

const ExampleUI_Screen = () => {
  /////////////////////////////////////////////////////////////////
  const { authSign } = React.useContext(PrivateRoute_Context);
  /////////////////////////////////////////////////////////////////

  const [NewFlowering, setNewFlowering] = React.useState({
    name_science: "", //ชื่อวิทาศาสตร์
    clan: "", //วงศ์
    type: "", //ประเภท
    plant_stem: "", //ลำต้น
    leaf: "", //ใบ
    flowering: "", //การออกดอก
    fruitage: "", //การออกผล
    growth_rate: "", //การเจริญเติบโต
    soil: "", //ดิน
    sunlight: "", //แสงที่ต้องการ
    sunbathing_time: "", //แสงที่ต้องการ(เวลา)
    desired_water: "", //น้ำที่ต้องการ
    propagation: "", //การขยายพันธุ์
    other: "", //อื่นๆ
  });

  const [genderOpen, setGenderOpen] = React.useState(false);
  const [genderValue, setGenderValue] = React.useState(null);
  const [gender, setGender] = React.useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Prefer Not to Say", value: "neutral" },
  ]);
  const [companyOpen, setCompanyOpen] = React.useState(false);
  const [companyValue, setCompanyValue] = React.useState(null);
  const [company, setComapny] = React.useState([
    { label: "PUCIT", value: "pucit" },
    { label: "UCP", value: "ucp" },
    { label: "UET", value: "uet" },
  ]);
  const [loading, setLoading] = React.useState(false);
  const onGenderOpen = React.useCallback(() => {
    setCompanyOpen(false);
  }, []);

  const onCompanyOpen = React.useCallback(() => {
    setGenderOpen(false);
  }, []);
  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    console.log(data, "data");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <Controller
        name="name"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            selectionColor={"#5188E3"}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Text style={styles.label}>Password</Text>
      <Controller
        name="password"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            selectionColor={"#5188E3"}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <View>

      <Text style={styles.label}>Gender</Text>
      <Controller
        name="gender"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.dropdownGender}>
            <DropDownPicker
              style={styles.dropdown}
              open={genderOpen}
              value={genderValue} //genderValue
              items={gender}
              setOpen={setGenderOpen}
              setValue={setGenderValue}
              setItems={setGender}
              placeholder="Select Gender"
              placeholderStyle={styles.placeholderStyles}
              onOpen={onGenderOpen}
              onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>
        )}
      />

      <Text style={styles.label}>Institute/Organization</Text>
      <Controller
        name="company"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.dropdownCompany}>
            <DropDownPicker
              style={styles.dropdown}
              open={companyOpen}
              value={companyValue} //companyValue
              items={company}
              setOpen={setCompanyOpen}
              setValue={setCompanyValue}
              setItems={setComapny}
              placeholder="Select Company"
              placeholderStyle={styles.placeholderStyles}
              loading={loading}
              activityIndicatorColor="#5188E3"
              searchable={true}
              searchPlaceholder="Search your company here..."
              onOpen={onCompanyOpen}
              onChangeValue={onChange}
               zIndex={1000}
              zIndexInverse={3000}
            />
          </View>
        )}
      />
      </View>
      <Text style={styles.label}>Email Address</Text>
      <Controller
        name="email"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            selectionColor={"#5188E3"}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Text style={styles.label}>Invitation Code</Text>
      <Controller
        name="invitationCode"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            selectionColor={"#5188E3"}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text style={styles.getStarted}>Get Started</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.logIn}>
        <Text style={styles.links}>I have an account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExampleUI_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderStyle: "solid",
    borderColor: "#B7B7B7",
    borderRadius: 7,
    borderWidth: 1,
    fontSize: 15,
    height: 50,
    marginHorizontal: 10,
    paddingStart: 10,
    marginBottom: 15,
  },
  label: {
    marginBottom: 7,
    marginStart: 10,
  },
  placeholderStyles: {
    color: "grey",
  },
  dropdownGender: {
    marginHorizontal: 10,
    width: "50%",
    marginBottom: 15,
  },
  dropdownCompany: {
    marginHorizontal: 10,
    marginBottom: 15,
  },
  dropdown: {
    borderColor: "#B7B7B7",
    height: 50,
  },
  getStarted: {
    backgroundColor: "#5188E3",
    color: "white",
    textAlign: "center",
    marginHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 50,
    marginTop: 20,
  },
  logIn: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  links: {
    textAlign: "center",
    textDecorationLine: "underline",
    color: "#758580",
  },
});