
import React, {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import BottomTabNav from './BottomTabNav';
import IntroView from '../views/IntroductionView';
import { NavigationContainer } from '@react-navigation/native';
import LoginContext from '../Contexts/LoginContext'
function homeStack(){

    const [showIntro, setShowIntro] = useState(true);
    function changeView(){
        const getJwt = async () => {
            try {
              const jsonValue = await AsyncStorage.getItem('@auth_token')
              return jsonValue
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
    async function logoutEffect(){
      setShowIntro(true);
      try {
        await AsyncStorage.removeItem('@auth_token')
        return true
      } catch(e) {
        // error reading value
      }
    }
    //const LoginContext = React.createContext(defaultValue);
    
    
    if(showIntro)
        return(<IntroView task={changeView}></IntroView>);
    else
       return(
        <LoginContext.Provider value={{logoutFunc: logoutEffect}}>
          <NavigationContainer>
              <BottomTabNav></BottomTabNav>
            </NavigationContainer>
        </LoginContext.Provider>
        );
}

export default homeStack;