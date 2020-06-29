import {createStackNavigator} from '@react-navigation/stack';
import HomeView from '../views/HomeView';
import RegisterView from '../views/RegisterView';
import LoginView from '../views/LoginView';
import CameraView from '../views/CameraView';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

function homeStack(){
    return(
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeView}/>
            <Stack.Screen name="Register" component={RegisterView}/>
            <Stack.Screen name="Login" component={LoginView}/>
            <Stack.Screen name="Camera" component={CameraView}/>
        </Stack.Navigator>
    </NavigationContainer>
    );
}

export default homeStack;