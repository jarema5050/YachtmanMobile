import React, { useState } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import { AsyncStorage } from 'react-native';
import auth0 from '../services/Auth0'

const credentialsModule = require('../services/AuthCredentials');
const auth = auth0.auth;
const changePassword = async (userData) => {
    try{
      if(userData != null){
        auth.resetPassword({
            connection: userData.connection,
            email:   userData.email
          }, function (err, resp) {
            if(err){
              console.log(err.message);
            }else{
              console.log(resp);
            }
          });
      }
    }
    catch(err)
    {
        console.log(err.message)
    }
}

const alertPasswordReset = () =>
    Alert.alert(
      "Reset password",
      "Your password will be deleted and you will receive an email with link to password change form.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Reset my password", onPress: () => changePassword() }
      ],
      { cancelable: false }
    );
export default alertPasswordReset;