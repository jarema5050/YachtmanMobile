import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Feather } from '@expo/vector-icons'; 
import {View, StyleSheet, SafeAreaView, ScrollView, Text} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import NumericInput from '../../../../utilities/Forms/NumericInput';
import FormsTextInput from '../../../../utilities/Forms/TextInput';
import { Button } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';
import { brandMarine, brandOrange } from '../../../../utilities/Colors';
import MultiSelect from 'react-native-multiple-select';
import { TextInput } from 'react-native-gesture-handler';



const colors = require("../../../../utilities/Colors")

  const styles = StyleSheet.create({
    scrollView: {
        marginHorizontal: 5,
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
    box: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      marginTop: 30,
      marginBottom: 30,
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

export default function CruiseEditView({ navigation , route }) {
    const viewModes = {
      edit: {submitStr: "Save"},
      view: {submitStr: ""},
      create: {submitStr: "Add cruise"}
    }
 
    var imageUri;
    const [mode, setMode] = useState(viewModes.create);
    const [data, setData] = useState(null);
    //const { itemId, initializeMode} = route.params;
    const { errors, handleSubmit, control, setValue } = useForm();

    const nameInputRef = React.useRef()
    const lengthInputRef = React.useRef()
    const capacityInputRef = React.useRef()
    const yearInputRef = React.useRef()
    const typeInputRef = React.useRef()

    const formTitles = {
      from: "From",
      to:"To",
      experience: "Experience in years",
      peopleLimit: "People limit",
      certificates: "Number of certificates",
      description: "Description"
    }

    const setValues = (dataObj) => {
      //setValue(formTitles.yachtName, dataObj.name);
      //setValue(formTitles.yachtType, dataObj.type);
      //setValue(formTitles.yachtLength, dataObj.length);
      //setValue(formTitles.yearBuilt, dataObj.year);
      //setValue(formTitles.humanCapacity, dataObj.capacity);
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
      //setMode(viewModes.edit);
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
    
    const onChangeImage = arg => {
      imageUri = arg
    };
    const editable = mode != viewModes.view

/* start file from Multiselect */
/*
class MultiSelectExample extends Component {

  state = {
    selectedItems : [];
  };

  
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  render() {
    const { selectedItems } = this.state;

*/

/* end files Multiselect */
    
    /* start file from calendar: szczegoły na samym dole */
   /*
    function Calendar (){
      const {selectedStartDate, setselectedStartDate} = useState(null)
      const {selectedEndDate, setselectedEndtDate} = useState(null)
      
      this.onDateChange = this.onDateChange.bind(this)
      
      onDateChange(date, type);
      {
        if (type === 'END_DATE') {
          this.setState({
            selectedEndDate: date,
          });
        } 
        else {
          this.setState({
            selectedStartDate: date,
            selectedEndDate: null,
          });
        }
      }

    selectedStartDate, selectedEndDate  = this.state;
    const minDate = new Date(); // Today
    const maxDate = new Date(2022, 6, 3);
    const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
    const endDate = selectedEndDate ? selectedEndDate.toString() : '';
    */
  /* end files calendar */
      
    return (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
          <FormsTextInput ref={nameInputRef} name={formTitles.from} errors={errors} control={control} maxLength={60} required={true} editable={editable}></FormsTextInput>
          <FormsTextInput ref={nameInputRef} name={formTitles.to} errors={errors} control={control} maxLength={60} required={true} editable={editable}></FormsTextInput>
          <View style={styles.box}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          selectedDayColor = {brandOrange}
          previousTitle="Previous"
          nextTitle="Next"
          todayBackgroundColor= "#0492C2"
        />
      </View>

      <View style={styles.box}>
        <MultiSelect
          items={formData.LanguageSelector}
          uniqueKey="id"
          displayKey="name"
          searchInputPlaceholderText="Select languages"
          selectText="Select languages"
         // onSelectedItemsChange={this.onSelectedItemsChange}
        />
      </View>
      
      <NumericInput ref={lengthInputRef} name={formTitles.peopleLimit} errors={errors} control={control} maxLength={3} required={true} editable={editable}></NumericInput>
      <NumericInput ref={lengthInputRef} name={formTitles.experience} errors={errors} control={control} maxLength={2} required={true} editable={editable}></NumericInput>
      <NumericInput ref={lengthInputRef} name={formTitles.certificates} errors={errors} control={control} maxLength={2} required={true} editable={editable}></NumericInput>
      <FormsTextInput ref={nameInputRef} name={formTitles.description} errors={errors} control={control} maxLength={100} required={true} editable={editable}></FormsTextInput>
          
          { 
            editable && 
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
    
    
      /*
      <Picker ref={typeInputRef} errors={errors} control={control} data={formData.yachtTypeData} name={formTitles.yachtType} required={true} editable={editable}></Picker>
      <NumericInput ref={lengthInputRef} name={formTitles.yachtLength} errors={errors} control={control} maxLength={3} required={true} editable={editable}></NumericInput>
      <Picker ref={yearInputRef} errors={errors} control={control} data={formData.yearFactory(1900)} name={formTitles.yearBuilt} required={true} editable={editable}></Picker>
      <NumericInput ref={capacityInputRef} name={formTitles.humanCapacity} errors={errors} control={control} maxLength={3} required={true} editable={editable}></NumericInput>
      
      Tam wyżej starałeś się przerobić na hooki i wyszło mi jak wyszło, jeszcze nie mam takiej
      wprawy by takie skomplikowane klasy przerabiać na funkcje. Poniżej oryginał kodu
      container przerobiłem na "box"
      

      import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      selectedEndDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date, type) {
    if (type === 'END_DATE') {
      this.setState({
        selectedEndDate: date,
      });
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
    }
  }

  render() {
    const { selectedStartDate, selectedEndDate } = this.state;
    const minDate = new Date(); // Today
    const maxDate = new Date(2017, 6, 3);
    const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
    const endDate = selectedEndDate ? selectedEndDate.toString() : '';

    return (
      <View style={styles.container}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={minDate}
          maxDate={maxDate}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          onDateChange={this.onDateChange}
        />

        <View>
          <Text>SELECTED START DATE:{ startDate }</Text>
          <Text>SELECTED END DATE:{ endDate }</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
  },
});
      
      
      
      */