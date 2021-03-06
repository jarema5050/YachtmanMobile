import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';
import YachtList from "./views/YachtList"
import YachtEditView from './views/YachtEdit';
import Camera from '../../../utilities/Forms/Camera';

const colors = require("../../../utilities/Colors");

const styles = StyleSheet.create({
    hamburgerBtn: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        marginLeft: 20,
    },
    headerStyle: {
      backgroundColor: colors.brandMarine,
    }
  });

const Stack = createStackNavigator();

export default function YachtManageStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Yachts list" component={YachtList} options={{
        title: 'Owned yachts list',
        headerStyle: styles.headerStyle,
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
        headerStyle: styles.headerStyle,
        headerTintColor: '#fff'
      }}/>
      <Stack.Screen name="Take a photo" component={Camera} options={{
        headerShown: false
      }}/>
    </Stack.Navigator>
  );
}