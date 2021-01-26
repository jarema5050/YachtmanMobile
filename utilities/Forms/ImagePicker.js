import React, { useState, useEffect } from 'react';
import { Image, View, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { color } from 'react-native-reanimated';
import { brandMarine } from '../Colors';


const colors = require("../Colors")
export default function ImPicker({callbackFunc, hideModal}) {

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
          return
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      callbackFunc(null, result.uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="FROM IMAGES" titleStyle={{fontSize: 12}} type="outline" onPress={() =>{pickImage()}} />
      {/* image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />  */}
    </View>
  );
}