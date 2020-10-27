import React from 'react';
//import Constants from 'expo-constants';
import {View, StyleSheet, Button, SafeAreaView, ScrollView} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import NumericInput from '../../../../utilities/Forms/NumericInput';
import FormsTextInput from '../../../../utilities/Forms/TextInput';
import Picker from '../../../../utilities/Forms/Picker';
import ImagePicker from '../../../../utilities/Forms/ImagePicker';
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
      marginTop: 30,
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

export default function YachtEditView() {
    const { errors, handleSubmit, control } = useForm();

    const nameInputRef = React.useRef()
    const lengthInputRef = React.useRef()
    const capacityInputRef = React.useRef()
    const yearInputRef = React.useRef()
    const typeInputRef = React.useRef()

    const onSubmit = data => {
        console.log(data);
    };

    const onChange = arg => {
      console.log(arg)
        return {
        value: arg.nativeEvent.text,
        };
    };
    
    console.log("errors", errors)
    return (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
          <ImagePicker></ImagePicker>
          <FormsTextInput ref={nameInputRef} name={"Yacht name"} errors={errors} control={control} maxLength={60} required={true}></FormsTextInput>
          <Picker ref={typeInputRef} errors={errors} control={control} data={formData.yachtTypeData} name={"Yacht type"} required={true}></Picker>
          <NumericInput ref={lengthInputRef} name={"Yacht length"} errors={errors} control={control} maxLength={3} required={true}></NumericInput>
          <Picker ref={yearInputRef} errors={errors} control={control} data={formData.yearFactory(1900)} name={"Year built"} required={true}></Picker>
          <NumericInput ref={capacityInputRef} name={"Human capacity"} errors={errors} control={control} maxLength={3} required={true}></NumericInput>          
          <View style={styles.button}>
            <Button
              style={styles.button}
              color
              title="Add yacht"
              onPress={handleSubmit(onSubmit)}
            />
          </View>
          </ScrollView>
        </SafeAreaView>
      );
}



