import React from 'react';
import {
  createDrawerNavigator
} from '@react-navigation/drawer';
const colors = require("../utilities/Colors")


const Drawer = createDrawerNavigator();
export default function DrawerNav({screensArray, customContent}) {

  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: "rgba(255, 255, 255, 0.95)"
      }}
      
      drawerContent={
        customContent
      }
      drawerContentOptions={{
        activeTintColor: colors.brandOrange,
        inactiveTintColor: colors.navBorderGrey
      }}
      >
      {
        screensArray.map((screen, i) => {
          return <Drawer.Screen key={i} name={screen.name} component={screen.component}/>
        })
        
      }
    </Drawer.Navigator>
    ) 
}