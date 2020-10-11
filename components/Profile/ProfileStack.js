import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import ProfileView from '../../views/ProfileView';
import { Button } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';
const styles = StyleSheet.create({
    hamburgerBtn: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        marginLeft: 20,
    }
  });
const Stack = createStackNavigator();
const colors = require("../../utilities/Colors")
export default function ProfileStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileView" component={ProfileView} options={{
          title: 'Jędrzej Sokołowski',
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