import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { Button } from 'react-native-elements';
import ImagesView from './ImagesView';

const styles = StyleSheet.create({
    buttonTakeAPhoto: {
        backgroundColor: "#3c4ee8"
    }
  });

export default function CameraView() {
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
        if (this.camera) {
        let photo = await this.camera.takePictureAsync({base64: true});
        setPhoto(photo);
        console.log(JSON.stringify(photo));
        }
    };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (photo === null){
    return (
        <View style={{flex: 1, flexDirection: 'column'}}>
          
        <Camera style={{ flex: 3 }} type={type} ref={ref => {
            this.camera = ref;
        }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
              </TouchableOpacity>
            </View>
        </Camera>
          <View style={{ flex: 1, margin: 20 }}>
          <Button buttonStyle ={styles.buttonTakeAPhoto} title="Take a photo" onPress={snap}></Button>
          </View>  
        </View>
      );
  }
  else{
      return <ImagesView photo={photo}/>;
  }
  
}