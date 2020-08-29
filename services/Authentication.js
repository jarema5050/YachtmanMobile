import * as AuthSession from "expo-auth-session";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
// You need to swap out the Auth0 client id and domain with the one from your Auth0 client.
// In your Auth0 client, you need to also add a url to your authorized redirect urls.
//
// For this application, I added https://auth.expo.io/@arielweinberger/with-auth0 because I am
// signed in as the "arielweinberger" account on Expo and the name/slug for this app is "with-auth0".
//
// You can open this app in the Expo client and check your logs to find out your redirect URL.

const auth0ClientId = "hZLG9l8utsdVSYGuCrki0oYhiejuW4jW";
const authorizationEndpoint = "https://dev-7lggsq0x.eu.auth0.com/authorize";

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

export default function Authentication({buttonParams, task}) {
  const [name, setName] = React.useState(null);

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: auth0ClientId,
      // id_token will return a JWT token
      responseType: "id_token",
      // retrieve the user's profile
      scopes: ["openid", "profile"],
      extraParams: {
        // ideally, this will be a random value
        nonce: "nonce",
      },
    },
    { authorizationEndpoint }
  );

  // Retrieve the redirect URL, add this to the callback URL list
  // of your Auth0 application.
  console.log(`Redirect URL: ${redirectUri}`);

  const storeJwt = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@auth_jwt', jsonValue)
    } catch (e) {
      console.log("Storing JWT token failed -"+e.message)
    }
  }

  React.useEffect(() => {
    if (result) {
      if (result.error) {
        Alert.alert(
          "Authentication error",
          result.params.error_description || "something went wrong"
        );
        return;
      }
      if (result.type === "success") {
        // Retrieve the JWT token and decode it
        const jwtToken = result.params.id_token;
        const decoded = jwtDecode(jwtToken);
        console.log(decoded);
        const { name } = decoded;
        storeJwt(decoded);
        task()
        setName(name);
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