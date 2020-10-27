import React from 'react';
import { Text, View, TextInput, StyleSheet, Picker} from 'react-native';
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
                <Picker
                    ref={ref}
                    selectedValue={value}
                    style={{
                        height: 99,
                        backgroundColor: 'white',
                        borderRadius: 4
                      }}
                    itemStyle = {
                        {
                            height: 99,
                            fontSize: 16
                          }
                    }
                    onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
                >
                    {props.data.map((item,i) => <Picker.Item key={i} label={item.label} value={item.value} />)}
                </Picker>
              )}

              rules={{
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