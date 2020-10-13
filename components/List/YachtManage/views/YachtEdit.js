import React from 'react';
//import Constants from 'expo-constants';
import { Text, View, StyleSheet, TextInput, Button, SafeAreaView, ScrollView} from 'react-native';
import { useForm, Controller } from 'react-hook-form';

  const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
    label: {
      color: 'white',
      margin: 20,
      marginLeft: 0,
    },
    button: {
      marginTop: 40,
      color: 'white',
      height: 40,
      backgroundColor: '#ec5990',
      borderRadius: 4,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      //paddingTop: Constants.statusBarHeight,
      padding: 8,
      backgroundColor: '#0e101c',
    },
    input: {
      backgroundColor: 'white',
      borderColor: 'none',
      height: 40,
      padding: 10,
      borderRadius: 4,
    },
  });

export default function YachtEditView() {
    const { register, setValue, handleSubmit, control } = useForm();
    const onSubmit = data => {
        console.log(data);
    };

    const onChange = arg => {
        return {
        value: arg.nativeEvent.text,
        };
    };

    return (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
          <Text style={styles.label}>First name</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="firstName"
          />
          <Text style={styles.label}>Last name</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="lastName"
          />
    
          <View style={styles.button}>
            <Button
              style={styles.buttonInner}
              color
              title="Button"
              onPress={handleSubmit(onSubmit)}
            />
          </View>
          </ScrollView>
        </SafeAreaView>
      );
}



