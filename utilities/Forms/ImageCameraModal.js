import React, { useState } from 'react'
import { Text, TouchableOpacity, TouchableHighlight, View, StyleSheet, ImageBackground } from 'react-native'
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal'
import ImagePicker from "../Forms/ImagePicker"
import { Feather } from '@expo/vector-icons'; 
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
        height: 200,
        width: "80%",
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
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
      }
})

export default function ImageCameraModal({navigation, route, editable, onChange}) {

const image = (typeof route.params != "undefined") ? route.params.image : null;
console.log(image)    
  const [isModalVisible, toggleModal] = useState(false);
    //console.log("received",image)
  const [imageUri, setImageUri] = useState(image);
    console.log(imageUri)

  const showImageCallback = (uri) => 
  {
    toggleModal(false)
    setImageUri(uri)
    //onChange(uri)
  }
  

  let MainView;
  
    if(imageUri != null){
        MainView =
        () => {return (
        <ImageBackground source={{ uri: imageUri }} style={styles.imageContainer}>

          {
            editable &&
            <Button
            icon={
                <Feather name="trash-2" size={24} color="white" />
            }
            buttonStyle={styles.trashButton}
            onPress={()=>{showImageCallback(null)}}
            />
          }
        </ImageBackground>
        )};
    }
    else{
        MainView = () => { return (
            <TouchableOpacity style={styles.container} onPress={() => {toggleModal(true)}}>
                <Text style={styles.text}>Add new photo</Text>
            </TouchableOpacity>
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
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "gray" }}
              onPress={() => {
                toggleModal(false)
                navigation.navigate("Take a photo")
              }}
            >
              <Text style={styles.textStyle}>Take a photo</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                toggleModal(false)
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      </View>
    )
}