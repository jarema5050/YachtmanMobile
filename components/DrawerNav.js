import * as React from 'react';
import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import BottomTabNav from './BottomTabNav';

function FirstScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function SecondScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (
      <Drawer.Navigator>
        <Drawer.Screen name="First" component={FirstScreen} />
        <Drawer.Screen name="Seconds" component={SecondScreen} />
      </Drawer.Navigator>
  );
}