import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import ProfileView from '../views/ProfileView';

const styles = StyleSheet.create({
    hamburgerBtn: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        marginLeft: 20,
    }
  });
const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileView" component={ProfileView}/>
    </Stack.Navigator>

  );
}