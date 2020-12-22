import * as AuthSession from "expo-auth-session";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import auth0 from '../services/Auth0';
import * as Crypto from 'expo-crypto';
// You need to swap out the Auth0 client id and domain with the one from your Auth0 client.
// In your Auth0 client, you need to also add a url to your authorized redirect urls.
//
// For this application, I added https://auth.expo.io/@arielweinberger/with-auth0 because I am
// signed in as the "arielweinberger" account on Expo and the name/slug for this app is "with-auth0".
//
// You can open this app in the Expo client and check your logs to find out your redirect URL.
const credentialsModule = require('./AuthCredentials');
const webAuth = auth0.webAuth;
const auth0ClientId = credentialsModule.auth0ClientId;
const authorizationEndpoint = credentialsModule.domain + "/authorize";

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

function base64URLEncode(str) {
  return str.toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
}

function randomBytes(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

var verifier = base64URLEncode(randomBytes(32));

async function sha256(buffer) {
  return await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, buffer);
}

var challenge = base64URLEncode(sha256(verifier));

export default function Authentication({buttonParams, task}) {
  const [name, setName] = React.useState(null);

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: auth0ClientId,
      // id_token will return a JWT token
      responseType: "code",
      // retrieve the user's profile
      scopes: ["openid", "profile", "email"],
      extraParams: {
        // ideally, this will be a random value
        nonce: "nonce",
        audience: "https://dev-7lggsq0x.eu.auth0.com/api/v2/"
      },
      codeChallenge: challenge,
      codeChallengeMethod: "S256",
    },
    { authorizationEndpoint },
  );

  // Retrieve the redirect URL, add this to the callback URL list
  // of your Auth0 application.
  console.log(`Redirect URL: ${redirectUri}`);

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
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@auth_token', jsonValue)
    } catch (e) {
      console.log("Storing JWT token failed -"+e.message)
    }
  }
  const fetchUserData = async (authToken) => {
    const userData = await webAuth.client.userInfo({token:authToken}, function(err) {
      console.log("userInfo " + err.message)
    });
    if (userData != null){
      console.log(userData)
      storeUserData(userData)
      setName(userData.givenName)
      task()
    }  
  }

  var requestJWT = require("request");

  var options = {
    method: 'POST',
    url: credentialsModule.domain + '/oauth/token',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: {
      grant_type:"authorization_code",
      client_id: auth0ClientId,
      code_verifier: verifier,
      //code: "AUTHORIZATION_CODE",
      //redirect_uri: "https://YOUR_APP/callback"
    }
  };

  React.useEffect(() => {
    if (result) {
      console.log(result)
      if (result.error) {
        Alert.alert(
          "Authentication error",
          result.params.error_description || "something went wrong"
        );
        return;
      }
      if (result.type === "success") {
        const authToken = result.params.access_token
        console.log("authTokeni", authToken)
        //storeToken(authToken)
        //fetchUserData(authToken)
        options.form.code = result.params.code
        requestJWT(options, function (error, response, body) {
          if (error) throw new Error(error);
          console.log(response);
          console.log(body);
        });
      }
    }
  }, [result]);

  return (
    <View>
      {name ? (
        <Text style={styles.containerBottom}>You are logged in, {name}!</Text>
      ) : (
        <Button
          disabled={!request}
          buttonStyle ={buttonParams.styleBtnBody}
          titleStyle = {buttonParams.styleBtnTitle}
          title= {buttonParams.titleTxt}
          onPress={() => promptAsync({ useProxy })}
        />
      )}
    </View>
  );
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