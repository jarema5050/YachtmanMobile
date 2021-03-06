import { Button } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';
import YachtList from "./views/YachtList"
import YachtEditView from './views/YachtEdit';
import { StyleSheet } from 'react-native';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const styles = StyleSheet.create({
    hamburgerBtn: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        marginLeft: 20,
    }
  });
const Stack = createStackNavigator();
const colors = require("../../../utilities/Colors")
export default function RoutesManageStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Yachts list" component={YachtList} options={{
          title: 'Owned yachts list',
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
        <Stack.Screen name="Yacht edit" component={YachtEditView} options={{
          title: 'Add yacht',
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
    </Stack.Navigator>

  );
}