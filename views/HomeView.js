import { StyleSheet, Text, View } from 'react-native'; 
import React from 'react';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        margin: 20
    },
    buttonLogin: {
        backgroundColor: "#32a852"
    },
    buttonRegister: {
        backgroundColor: "#3c4ee8"
    }
  });

function HomeView({route, navigation}) {
    console.log(route);
    if(route.params == undefined){
      return (
        <View style={styles.container}>
          <Text>Welcome in our app!</Text>
          <Button buttonStyle ={styles.buttonLogin} title="Login" onPress={() => navigation.navigate("Login")}></Button>
          <Button buttonStyle ={styles.buttonRegister} navigation={navigation} title="Register" onPress={() => navigation.navigate("Register")}></Button>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text>Welcome in our app {route.params.email}!</Text>
        <Button buttonStyle ={styles.buttonLogin} title="Make a photo" onPress={() => navigation.navigate("Camera")}></Button>
        </View>
    );
  }
export default HomeView;
