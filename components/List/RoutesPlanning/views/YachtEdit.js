import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Feather, Fontisto } from '@expo/vector-icons';
import {View, StyleSheet, SafeAreaView, ScrollView, Alert} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import NumericInput from '../../../../utilities/Forms/NumericInput';
import FormsTextInput from '../../../../utilities/Forms/TextInput';
import Picker from '../../../../utilities/Forms/Picker';
import ImagePicker from '../../../../utilities/Forms/ImageCameraModal';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

const token = AsyncStorage.getItem('id_token');
const colors = require("../../../../utilities/Colors")
const endpoint = require("../../../../utilities/RestEndpoints").yachts

  const styles = StyleSheet.create({
    scrollView: {
        marginHorizontal: 20,
    },
    label: {
      color: 'white',
      marginTop: 10,
      marginBottom: 5,
      marginLeft: 0,
    },
    labelErr: {
      color: 'red',
      marginTop: 10,
      fontSize: 14
    },
    button: {
      color: 'white',
      height: 40,
      backgroundColor: '#ec5990',
      borderRadius: 4,
      marginTop: 20
    },
    buttonDelete: {
      backgroundColor: "red",
      color: 'white',
      height: 40,
      borderRadius: 4,
      marginTop: 20,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 8,
      backgroundColor: colors.brandMarine,
    },
    input: {
      backgroundColor: 'white',
      borderColor: '#000',
      height: 40,
      padding: 10,
      borderRadius: 4,
    },
    inputContainer: {
      marginBottom: 10
    },
    buttonDeleteTitle:{
      marginLeft: 20,
      fontSize: 14,
    }
  });

const formData = require("../../../../utilities/Forms/FormsData")

export default function YachtEditView({ navigation , route }) {
    const viewModes = {
      edit: {modeNameTitle: "Yacht edit", submitStr: "Save", alertText: "view and leave your changes?", rightNavIcon: <Fontisto name="preview" size={20} color="white" />},
      view: {modeNameTitle: "Yacht view", submitStr: "", alertText: "edit?", rightNavIcon: <Feather name="edit" size={20} color="white" />},
      create: {modeNameTitle: "Yacht create", submitStr: "Add yacht", rightNavIcon: null}
    }


    var imageUri;
    const { yachtObj } = route.params;

    const [mode, setMode] = useState(yachtObj == null ? viewModes.create : viewModes.view);
    const [data, setData] = useState(null);
    const { errors, handleSubmit, control, setValue, getValues } = useForm();

    const nameInputRef = React.useRef()
    const lengthInputRef = React.useRef()
    const capacityInputRef = React.useRef()
    const yearInputRef = React.useRef()
    const typeInputRef = React.useRef()

    const formTitles = {
      yachtName: "Yacht name",
      yachtType: "Yacht type",
      yachtLength: "Yacht length",
      yearBuilt: "Year built",
      humanCapacity: "Human capacity",
      yachtImage: "Yacht Image"
    }

    const setValues = (dataObj) => {
      setValue(formTitles.yachtName, dataObj.name);
      setValue(formTitles.yachtType, dataObj.type);
      setValue(formTitles.yachtLength, dataObj.length);
      setValue(formTitles.yearBuilt, dataObj.year);
      setValue(formTitles.humanCapacity, dataObj.capacity);
    }
    
    const toggle = () => {
      setMode(viewModes.edit);
    }

    useEffect(() => {
      var testObj = {
        id: 11,
        name: "Syrius 2",
        type: "Open Yacht",
        length: "26",
        year: "2000",
        capacity: "10"
      }
      if(yachtObj != null){
        setValues(yachtObj);
      }

      navigation.setOptions({
        headerRight: () => (
            <Button
            icon={
              mode.rightNavIcon
            }
            type="clear"
            onPress={() => modeChangeAlert()}
          />
        ),
        title: mode.modeNameTitle
      });
    });
  
    const modeChangeAlert = () => {
      const onPress = () => {
        switch (mode.modeNameTitle) {
          case viewModes.view.modeNameTitle:
            setMode(viewModes.edit);
            break;
          
          case viewModes.edit.modeNameTitle:
            setMode(viewModes.view);
            break;
        }
      }

      Alert.alert(
        "Change mode",
        "Are you sure you want change mode to " + mode.alertText,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: onPress }
        ],
        { cancelable: false }
      )
    }

    const onSubmit = data => {
      if (mode.modeNameTitle == viewModes.create.modeNameTitle){

        if (token !== null) {
          console.log("control",control);
          let data = getValues();

          let sendData = {
            "yachtName": data["Yacht name"],
            "type": data["Yacht type"],
            "length": parseInt(data["Yacht length"]),
            "yearBuilt": parseInt(data["Year built"]),
            "humanCapacity": parseInt(data["Human capacity"])
          }
          console.log(data);
          const errorAlert = Alert.alert(
            "Send yacht",
            "Something went wrong try again later.",
            [
              { text: "OK" }
            ],
            { cancelable: false }
          );
          /*
          fetch(endpoint, {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(sendData)
          })
          .then(response => {
            if(response.status = "403")
              throw new Error("403");
            else
              return response.json();
          })
          .then(result => {
            console.log('Success:', result);
            navigation.navigate("Yachts list");
          })
          .catch(error => {
            errorAlert()
          });
          */
        }
      }
    };
    
    function postYacht(){
      
    }

    function deleteYachtTapped() {
      Alert.alert(
        "Delete yacht",
        "Are you sure you want to delete yacht",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: deleteYacht, style: 'negative' }
        ],
        { cancelable: false }
      )
  }

  async function deleteYacht() {
    const errorAlert = Alert.alert(
      "Delete yacht",
      "Something went wrong try again later.",
      [
        { text: "OK" }
      ],
      { cancelable: false }
    );
    console.log("hello")
    const value = await AsyncStorage.getItem('id_token');
    if (value !== null) {
      fetch(endpoint + yachtObj.id, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + value
        }
      })
      .then(response => {
        if(response.status = "403")
          throw new Error("403");
        else
          return response.json();
      })
      .then(result => {
        console.log('Success:', result);
        navigation.navigate("Yachts list");
      })
      .catch(() => {
        errorAlert()
      });
    }
}

  const setImage = (image) => {
   setValue(formTitles.yachtImage, image);
  }

    var editable = mode.modeNameTitle != viewModes.view.modeNameTitle;

    return (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
          <ImagePicker navigation={navigation} route={route} editable={editable}></ImagePicker>
          <FormsTextInput ref={nameInputRef} name={formTitles.yachtName} errors={errors} control={control} maxLength={60} required={true} editable={editable} setImageBase64={setImage}></FormsTextInput>
          <Picker ref={typeInputRef} errors={errors} control={control} data={formData.yachtTypeData} name={formTitles.yachtType} required={true} editable={editable}></Picker>
          <NumericInput ref={lengthInputRef} name={formTitles.yachtLength} errors={errors} control={control} maxLength={3} required={true} editable={editable}></NumericInput>
          <Picker ref={yearInputRef} errors={errors} control={control} data={formData.yearFactory(1900)} name={formTitles.yearBuilt} required={true} editable={editable}></Picker>
          <NumericInput ref={capacityInputRef} name={formTitles.humanCapacity} errors={errors} control={control} maxLength={3} required={true} editable={editable}></NumericInput>
      
          { 
            editable && 
              <Button
                buttonStyle={styles.button}
                title={mode.submitStr}
                onPress={handleSubmit(onSubmit)}
              />
          }
          { 
            !editable && 
            <Button
            icon={
                <Feather name="trash-2" size={24} color="white" />
            }
            buttonStyle={styles.buttonDelete}
            titleStyle={styles.buttonDeleteTitle}
            onPress={deleteYachtTapped}
            />
          }
          </ScrollView>
        </SafeAreaView>
      );
}

