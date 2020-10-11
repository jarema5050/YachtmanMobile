import React, { useEffect } from 'react';
import { View } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Button } from 'react-native-elements';
import ProfileStack from './ProfileStack';
import Animated from 'react-native-reanimated';
import Logout from '../../services/Logout';
import LoginContext from '../../Contexts/LoginContext'
import ChangePassword from '../ChangePassword'
import AsyncStorage from '@react-native-community/async-storage';
import DrawerNav from "../DrawerNav"

const colors = require("../../utilities/Colors")
function FirstScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  )
}

function SecondScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  )
}

function ProfileDrawerContent({ isLoggedInSocial, progress, onLogoutPressed, ...rest}) {
  const translateX = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  })
  async function fetchData() {
    const convertSub = (sub) => {
      const array = sub.split('|');
      return array[0];
    }
    try {
        const userData = await AsyncStorage.getItem('@user_data');
        if (userData !== null) {
            const email = JSON.parse(userData).email
            const sub = JSON.parse(userData).sub
            return {email: email, connection: convertSub(sub)}
            
        }
      } catch (error) {
        console.log("Err " + error.message)
        return null
      }
  }
  var isLoggedInSocial = null;
  useEffect(() => {
    isLoggedInSocial = fetchData()
  });
  

  return (
    <DrawerContentScrollView {...rest}>
      <Animated.View style={{ transform: [{ translateX }] }}>
        <DrawerItemList {...rest} />
        <DrawerItem activeTintColor={colors.brandOrange} inactiveTintColor={colors.navBorderGrey} label="Logout" onPress={() => {
          Logout()
          onLogoutPressed()
        } 
        } />
        {
          isLoggedInSocial == 'auth0' &&
            <DrawerItem activeTintColor={colors.brandOrange} inactiveTintColor={colors.navBorderGrey} label="Change Password" onPress={() => ChangePassword()}/>
        }
      </Animated.View>
    </DrawerContentScrollView>
  )
}


export default function ProfileDrawerNav() {
  return (
    <LoginContext.Consumer>
      {value => {
        console.log(value);
        return (
          <DrawerNav
            screensArray={[
              {name: "Profile", component: ProfileStack},
              {name: "Second", component: SecondScreen}
            ]}
            customContent={props => <ProfileDrawerContent {...props} onLogoutPressed = {value.logoutFunc}/>}
          ></DrawerNav>
        )
      }}
    </LoginContext.Consumer>
  )
}