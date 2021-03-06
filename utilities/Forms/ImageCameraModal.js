import React, { useState } from 'react'
import { Text, TouchableOpacity, TouchableHighlight, View, StyleSheet, ImageBackground, ImageBackgroundComponent } from 'react-native'
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal'
import ImagePicker from "../Forms/ImagePicker"
import { Feather } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import { onChange } from 'react-native-reanimated';
 // 4.1.1
 const colors = require("../Colors")
 const styles = StyleSheet.create({
    trashButton: {
        backgroundColor: "red",
        borderRadius: 20,
        width: 40,
        margin: 10,
        alignSelf: "flex-end"
    },
    imageContainer: {
        flex: 1,
        justifyContent: "flex-end",
        height: 130
    },
    container: { flex: 1, justifyContent: "center", height: 130, backgroundColor: colors.brandOrange, alignItems: "center" },
    text: {fontSize: 24, color: "white", fontWeight: "600"},
    modal: {backgroundColor:"white"},
    view: {display: "flex"},
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        justifyContent: "space-evenly",
        width: "80%",
        height: 150,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
})

export default function ImageCameraModal({navigation, route, editable, setImageBase64}) {
  console.log("route.params", route.params)
  const { yachtObj, image } = route.params;
  const [isModalVisible, toggleModal] = useState(false);
  const [imageUri, setImageUri] = useState({camera: image, gallery: null, downloaded: yachtObj != null ? yachtObj.url : null });

  const showImageCallback = (cameraUri, galleryUri) => 
  {
    toggleModal(false);
    setImageUri({camera: cameraUri, gallery: galleryUri, downloaded: null})
  }
  
  let MainView;
 console.log(imageUri);
  const source = [imageUri.camera, imageUri.gallery, imageUri.downloaded].filter(Boolean)[0];

  console.log("source", source)

    if(typeof source == "undefined"){
        MainView = () => { return (
            <TouchableOpacity style={styles.container} onPress={() => {toggleModal(true)}}>
                <Text style={styles.text}>Add new photo</Text>
            </TouchableOpacity>
        )};
    }
    else {
      MainView =
      () => {return (
      <ImageBackground source={{uri: source}} style={styles.imageContainer}>
        {
          editable &&
          <Button
          icon={
              <Feather name="trash-2" size={24} color="white" />
          }
          buttonStyle={styles.trashButton}
          onPress={()=>{showImageCallback(null, null)}}
          />
        }
      </ImageBackground>
      )}; 
    }

    return (
      <View style={styles.view}>
        <MainView></MainView>
        <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <ImagePicker hideModal={toggleModal} callbackFunc={showImageCallback}></ImagePicker>
              <Button
                titleStyle={{fontSize: 12}}
                type="outline"
                onPress={() => {
                  toggleModal(false)
                  navigation.navigate("Take a photo", {callbackFunc: showImageCallback})
                }}
                title="FROM CAMERA"
              ></Button>
            
            
            <Button
              onPress={() => {
                toggleModal(false)
              }}
              type="clear"
              icon={<Entypo name="chevron-thin-down" size={16} color={colors.brandMarine} />}
            >
            </Button>
          </View>
        </View>
      </Modal>
      </View>
    )
}