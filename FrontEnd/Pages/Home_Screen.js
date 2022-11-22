import * as React from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';

const Home_Screen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>

      <Button
        title="Go to Page01"
        onPress={() => navigation.navigate('Page01')}
      />

      <Button
        title="Go to Page02"
        onPress={() => navigation.navigate('Page02')}
      />
    </View>
  );
};

export default Home_Screen;

const styles = StyleSheet.create({});
