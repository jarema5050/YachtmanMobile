import React from 'react';
import { Text, View, TextInput, StyleSheet} from 'react-native';
import { Controller } from 'react-hook-form';


const styles = StyleSheet.create({
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


export default React.forwardRef((props, ref) => {
    return(
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{props.name}</Text>
            <Controller
              control={props.control}
              onFocus={()=>{ref.current.focus()}}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                  ref={ref}
                />
              )}

              rules={{
                maxLength: {
                  value: props.maxLength,
                  message: `This field maximum length is ${props.maxLength}.`
                },
                required: props.required ? "This field is required." : false
              }}
              name={props.name}
              defaultValue=""
            />
            {
              props.errors[props.name] != undefined &&
                <Text style={styles.labelErr}>
                  {props.errors[props.name].message}
                </Text>
            }
          </View>

    )
  });