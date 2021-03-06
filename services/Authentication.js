/* Adapted from expo/examples/with-auth0 */
import * as AuthSession from "expo-auth-session";
import jwtDecode from "jwt-decode";
import * as React from "react";
import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import LoadingModal from "../views/LoadingModal";
import AsyncStorage from '@react-native-community/async-storage';
import { Button } from 'react-native-elements';

// You need to swap out the Auth0 client id and domain with the one from your Auth0 client.
// In your Auth0 client, you need to also add a url to your authorized redirect urls.
//
// For this application, I added https://auth.expo.io/@arielweinberger/with-auth0 because I am
// signed in as the "arielweinberger" account on Expo and the name/slug for this app is "with-auth0".
//
// You can open this app in the Expo client and check your logs to find out your redirect URL.
const credentialsModule = require('./AuthCredentials');

const auth0ClientId = credentialsModule.auth0ClientId;
const auth0_domain = credentialsModule.domain;
const authorizationEndpoint = credentialsModule.domain + "/authorize";

const useProxy = Platform.select({ web: false, default: true });

export default class LoginPage extends React.Component {
    state = {
        name: null,        // user's name
        loading: false     // decides whether to show the loading modal
    };

    signIn = async () => {
        // prepares the login request.
        this.setState({loading: true});
        console.log({useProxy});
        const redirectUri = AuthSession.makeRedirectUri({ useProxy });
        const authenticationOptions = {
            redirectUri: redirectUri,
            responseType: 'code',
            codeChallengeMethod: 'S256',
            clientId: auth0ClientId,
            scopes: ["openid", "profile", "offline_access"],
            audience: "https://dev-7lggsq0x.eu.auth0.com/api/v2/",
            extraParams: {
                // ideally, this will be a random value
                nonce: "nonce",
                prompt: "login",
            },
        };
        const discovery = await AuthSession.fetchDiscoveryAsync(auth0_domain);
        const request = await AuthSession.loadAsync(authenticationOptions, discovery);
        console.log("request",request)
        const code_verifier = request.codeVerifier;

        // prompts the user for login
        this.setState({loading: false});
        const code_response = await request.promptAsync(null, { useProxy });
        if (!code_response || !code_response.params || !code_response.params.code ) {
            Alert.alert("Server Error", "Something wrong happened when retrieving your credentials. Please try again soon.");
            return;
        } else if (!code_response.params.state || code_response.params.state != request.state) {
            Alert.alert("Server Error", "Could not verify the authenticity of the login server. Please try again soon.")
        }

        // gets token from the server
        this.setState({loading: true});
        const access_token_req = {
            clientId: auth0ClientId,
            code: code_response.params.code,
            redirectUri: redirectUri,
            scopes: ["openid", "profile", "offline_access"],
            extraParams: {
                "code_verifier": code_verifier
            }
        };
        const token_response = await AuthSession.exchangeCodeAsync(access_token_req, discovery);
        const {accessToken, idToken, refreshToken, issuedAt, expiresIn} = token_response;
        
        console.log("accesstoken", token_response);
        // Retrieve the JWT token and decode it
        const decoded = jwtDecode(idToken);
        //const accessDecoded = jwtDecode(accessToken);
        const { name } = decoded;
        console.log(decoded);

        const storeUserData = async (value) => {
          try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@user_data', jsonValue)
          } catch (e) {
            console.log("Storing encoded data failed -"+e.message)
          }
        }
        
        const storeToken = async (value) => {
          try {
            //const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@auth_token', value)
          } catch (e) {
            console.log("Storing JWT token failed -"+e.message)
          }
        }

        const storeInAsyncStorage = async (key, value) => {
          try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, value)
          } catch (e) {
            console.log(`Storing ${key} failed -`+e.message)
          }
        }


        storeToken(idToken);
        storeUserData(decoded);
        storeInAsyncStorage("id_token", idToken);
        storeInAsyncStorage("access_token", accessToken);
        storeInAsyncStorage("expire_time", (issuedAt + expiresIn).toString());
        storeInAsyncStorage("refresh_token", refreshToken);

        this.setState({name, loading: false});
        this.props.refresh();
    }

    render() {
        return (
            <View>
                <LoadingModal loading={this.state.loading}/>
                {this.state.name ? (
                    <Text style={styles.title}>You are logged in, {this.state.name}!</Text>
                ) : (
                    <Button
                      buttonStyle ={this.props.buttonParams.styleBtnBody}
                      titleStyle = {this.props.buttonParams.styleBtnTitle}
                      title= {this.props.buttonParams.titleTxt}
                      onPress={this.signIn}
                    />
                    
                )}
            </View>
        );
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 40,
  },
});