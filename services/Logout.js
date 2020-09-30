import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import * as Application from 'expo-application';
import * as AuthSession from "expo-auth-session";
const credentialsModule = require('./AuthCredentials');

export default async function Logout(){
    const returnUrl = "https://auth.expo.io/@jarema5050/YachtmanMobile"
    const endpoint = `${credentialsModule.domain}/v2/logout?client_id=${credentialsModule.auth0ClientId}&returnTo=${returnUrl}`
    
    await WebBrowser.openBrowserAsync(endpoint)
    WebBrowser.dismissAuthSession()
    //console.log(endpoint)
    //return loginState
}