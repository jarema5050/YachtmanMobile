import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { Button } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons'; 
import ImagesView from "./ImagesView";
import { brandMarine } from '../Colors';

const colors = require("../Colors")

const styles = StyleSheet.create({
    buttonTakeAPhoto: {
        backgroundColor: "#3c4ee8"
    }
  });

export default function CameraView({navigation, route}) {
var camera;
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

    const snap = async () => {
        if (camera) {
        let photo = await camera.takePictureAsync({base64: true});
        setPhoto(photo);
        }
    };
    const newPhotoFunc = () => {
        setPhoto(null)
    }
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (photo === null){
    return (
        <View style={{flex: 1, flexDirection: 'column'}}>
          
        <Camera style={{ flex: 7 }} type={type} ref={ref => {
            camera = ref;
        }}>
            <View
              style={{
                flex: 6,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                    flex: 1,
                    alignItems:"flex-end",
                    paddingTop: 20
                }}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Flip</Text>
            </TouchableOpacity>
              
            </View>
            <View style={{ flex: 1, backgroundColor: "transparent", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
                    style={{
                        alignItems: "center"
                    }}
                    onPress={() => {
                    snap()
                    }}>
                    <Entypo name="circle" size={48} color={colors.brandOrange} />
            </TouchableOpacity>
          </View> 
        </Camera>
           
        </View>
      );
  }
  
  else{
    return <ImagesView navigation={navigation} discardFunc={newPhotoFunc} photo={photo}/>;
}
}
