import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';
import CruiseList from "./views/CruiseList"
import CruiseEditView from './views/CruiseEdit';
import Camera from '../../../utilities/Forms/Camera';
const styles = StyleSheet.create({
    hamburgerBtn: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        marginLeft: 20,
    }
  });
const Stack = createStackNavigator();
const colors = require("../../../utilities/Colors")
export default function CruiseManageStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cruise list" component={CruiseList} options={{
          title: 'Your current cruise',
          headerStyle: {
            backgroundColor: colors.brandMarine,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <Button
              icon = {<FontAwesome5 name="bars" size={16} color="white" />}
              onPress = {() => {navigation.toggleDrawer()}}
              type = "clear"
            />
          )
        }}/>
        <Stack.Screen name="Cruise edit" component={CruiseEditView} options={{
          title: 'Add cruise',
          headerStyle: {
            backgroundColor: colors.brandMarine,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <Button
              icon = {<FontAwesome5 name="bars" size={16} color="white" />}
              onPress = {() => {navigation.toggleDrawer()}}
              type = "clear"
            />
          )
        }}/>
        <Stack.Screen name="Take a photo" component={Camera} options={{
          headerShown: false
        }}/>
    </Stack.Navigator>

  );
}