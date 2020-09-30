import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListView from '../views/ListView';
import SearchView from '../views/SearchView';
import MessagesView from '../views/MessagesView';
import DrawerNav from './DrawerNav';

const Tab = createBottomTabNavigator();

export default function BottomTabNav() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="List" component={ListView} />
        <Tab.Screen name="Settings" component={SearchView} />
        <Tab.Screen name="Messages" component={MessagesView} />
        <Tab.Screen name="Profile" component={DrawerNav} />
      </Tab.Navigator>
  );
}