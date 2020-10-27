import React, { Component } from 'react'
import { Text, TouchableOpacity, TouchableHighlight, View, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import ImagePicker from "../Forms/ImagePicker"
 // 4.1.1
 const colors = require("../Colors")
 const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center",height: 130, backgroundColor: colors.brandOrange, alignItems: "center" },
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

export default class ModalTester extends Component {
  state = {
    isModalVisible: false
  }
  
  _showModal = () => this.setState({ isModalVisible: true })
 
  _hideModal = () => this.setState({ isModalVisible: false })
 
  render () {
    return (
      <View style={styles.view}>
        <TouchableOpacity style={styles.container} onPress={this._showModal}>
          <Text style={styles.text}>Add new photo</Text>
        </TouchableOpacity>
        <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ImagePicker></ImagePicker>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "gray" }}
              onPress={() => {
                this.props.navigation.navigate("Take a photo")
              }}
            >
              <Text style={styles.textStyle}>Take a photo</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                this._hideModal();
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
}