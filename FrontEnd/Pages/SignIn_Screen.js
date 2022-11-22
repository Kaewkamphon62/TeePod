// import {types} from '@babel/core';
import * as React from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
  Form,
  Input,
} from 'react-native';
// import axios from 'axios';

const SignIn_Screen = ({navigation}) => {
  const [InputSighIn, setInputSighIn] = React.useState({
    username: '',
    password: '',
  });

  // const {signIn} = React.useContext(AuthContext);

  const handleSubmit = async () => {
    //Fake SignIn_Screen
    console.log('');
    console.log(InputSighIn);

    // await axios
    //   .post('https://localhost:3000/Token', { InputSighIn })
    //   .then(function (res) {
    //     console.log('res', res);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    // if (InputSighIn.username == 'Kaewkamphon' && InputSighIn.password == '1') {
    //   navigation.navigate('Home');
    // }
  };

  return (
    <View style={styles.app}>
      <Text style={{color: 'black'}}>SignIn_Screen Form</Text>

      <View style={styles.row}>
        <Text style={{color: 'black'}}>Usrename</Text>
        <TextInput
          style={styles.input}
          onChangeText={e => {
            setInputSighIn({
              username: e,
              password: InputSighIn.password,
            });
          }}
        />
      </View>

      <View style={styles.row}>
        <Text style={{color: 'black'}}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={e => {
            setInputSighIn({
              username: InputSighIn.username,
              password: e,
            });
          }}
        />
      </View>

      <Text></Text>
      <View style={styles.row}>
        <Button title="Sign IN" onPress={handleSubmit} />
        <Button title="Sign UP" onPress={() => navigation.navigate('SignUp')} />
      </View>
    </View>
  );
};

export default SignIn_Screen;

const styles = StyleSheet.create({
  app: {
    backgroundColor: '#B1D76B',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  row: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '1rem',
  },

  input: {
    backgroundColor: 'white',
    height: 35,
    width: '65%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
