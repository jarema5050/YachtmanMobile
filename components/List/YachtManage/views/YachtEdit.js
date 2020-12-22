import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Feather } from '@expo/vector-icons'; 
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import NumericInput from '../../../../utilities/Forms/NumericInput';
import FormsTextInput from '../../../../utilities/Forms/TextInput';
import Picker from '../../../../utilities/Forms/Picker';
import ImagePicker from '../../../../utilities/Forms/ImageCameraModal';
import { Button } from 'react-native-elements';

const colors = require("../../../../utilities/Colors")

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
    }
  });

const formData = require("../../../../utilities/Forms/FormsData")

export default function YachtEditView({ navigation , route }) {
    const viewModes = {
      edit: {submitStr: "Save"},
      view: {submitStr: ""},
      create: {submitStr: "Add yacht"}
    }


    var imageUri;
    const [mode, setMode] = useState(viewModes.create);
    const [data, setData] = useState(null);
    const { itemId, initializeMode } = route.params;
    const { errors, handleSubmit, control, setValue } = useForm();

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
      humanCapacity: "Human capacity"
    }

    const setValues = (dataObj) => {
      setValue(formTitles.yachtName, dataObj.name);
      setValue(formTitles.yachtType, dataObj.type);
      setValue(formTitles.yachtLength, dataObj.length);
      setValue(formTitles.yearBuilt, dataObj.year);
      setValue(formTitles.humanCapacity, dataObj.capacity);
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
      //setValues(testObj);
      setMode(viewModes.create);
    });

    useLayoutEffect(() => {
      if(mode == viewModes.view){
        navigation.setOptions({
          headerRight: () => (
            <Button
              icon={
                  <Feather name="edit" size={20} color="white" />
              }
              type="clear"
              //onPress={()=>{showImageCallback(null)}}
            />
          ),
        });
      }
    }, [navigation]);
  
    const onSubmit = data => {
        if (imageUri !== undefined){
          data.imageUri = imageUri;
        }
        console.log(data);
    };

    const onChange = arg => {
      imageUri = arg
    };
    
    const onChangeImage = arg => {
      
    };


    const editable = mode != viewModes.view

    return (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
          <ImagePicker navigation={navigation} route={route} editable={editable} onChange={onChangeImage}></ImagePicker>
          <FormsTextInput ref={nameInputRef} name={formTitles.yachtName} errors={errors} control={control} maxLength={60} required={true} editable={editable}></FormsTextInput>
          <Picker ref={typeInputRef} errors={errors} control={control} data={formData.yachtTypeData} name={formTitles.yachtType} required={true} editable={editable}></Picker>
          <NumericInput ref={lengthInputRef} name={formTitles.yachtLength} errors={errors} control={control} maxLength={3} required={true} editable={editable}></NumericInput>
          <Picker ref={yearInputRef} errors={errors} control={control} data={formData.yearFactory(1900)} name={formTitles.yearBuilt} required={true} editable={editable}></Picker>
          <NumericInput ref={capacityInputRef} name={formTitles.humanCapacity} errors={errors} control={control} maxLength={3} required={true} editable={editable}></NumericInput>

          { editable && 
            <View style={styles.button}>
              <Button
                buttonStyle={styles.button}
                title={mode.submitStr}
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          }
          </ScrollView>
        </SafeAreaView>
      );
}



