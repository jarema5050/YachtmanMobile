
import React, {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import BottomTabNav from './BottomTabNav';
import DrawerNav from './DrawerNav';
import IntroView from '../views/IntroductionView';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
function homeStack(){

    const [showIntro, setShowIntro] = useState(true);
    function changeView(){
        const getJwt = async () => {
            try {
              const jsonValue = await AsyncStorage.getItem('@auth_jwt')
              return jsonValue != null ? JSON.parse(jsonValue) : null;
            } catch(e) {
              // error reading value
            }
          }
    
        getJwt().then((result) => {
            if(result == null)
                setShowIntro(true);
            else
                setShowIntro(false);
        })
    }
    
    if(showIntro)
        return(<IntroView task={changeView}></IntroView>);
    else
        return(
          <NavigationContainer>
              <BottomTabNav></BottomTabNav>
            </NavigationContainer>
        );
}

export default homeStack;