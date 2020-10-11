import * as React from 'react';
import { Ionicons, MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListDrawer from './List/ListDrawer';
import SearchView from '../views/SearchView';
import MessagesView from '../views/MessagesView';
import ProfileDrawer from './Profile/ProfileDrawer';

const Tab = createBottomTabNavigator();
const colors = require("../utilities/Colors");
export default function BottomTabNav() {
  return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case "Profile":
                return <MaterialIcons name="person-outline" size={size} color={color} />
              case "List":
                return <Ionicons name="ios-list" size={size} color={color} />
              case "Search":
                return <Feather name="search" size={size} color={color} />
              case "Search":
                return <Feather name="search" size={size} color={color} />
              case "Messages":
                return <AntDesign name="message1" size={size} color={color} />
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: colors.brandOrange,
          inactiveTintColor: 'white',
          showLabel: false,
          style: {
            backgroundColor: colors.brandMarine,
            borderColor: "#bcbcbc",
            borderTopWidth: 0.5
          }
        }}
      >
        <Tab.Screen name="List" component={ListDrawer} />
        <Tab.Screen name="Search" component={SearchView} />
        <Tab.Screen name="Messages" component={MessagesView} />
        <Tab.Screen name="Profile" component={ProfileDrawer} />
      </Tab.Navigator>
  );
}