import React from 'react';
import { Text, View, ActivityIndicator, Image, StyleSheet, SliderComponent} from 'react-native';
import * as Permissions  from 'expo-permissions';
import * as Location from 'expo-location';
import { Button } from 'react-native-elements';

const colors = require("../Colors")

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        margin: 20
    },
    buttonTitle: {color: colors.brandMarine},
    buttonRegister: {
        backgroundColor: "white",
        color: "red"
    }
  });

  
export default class ImagesView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {
                latitude: null,
                longitude: null
            }
        };
    }
    
    uploadImageAndLocation = () => {

    }

    render(){
        return(
            <View style={{flex: 1, flexDirection: 'column', backgroundColor: colors.brandMarine}}>
                <Image
                    style={{ flex: 3 }}
                    source={{
                        uri: this.props.photo.uri
                      }}
                />
                <View 
                    style={{ flex: 1, margin: 20, flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'stretch'}}
                >
                    <Button buttonStyle ={styles.buttonRegister} titleStyle={styles.buttonTitle} title="Choose photo" onPress={() => {
                        this.props.callbackFunc(this.props.photo.uri, null)
                        this.props.navigation.navigate("Yacht edit")
                    }}></Button>
                    <Button buttonStyle ={styles.buttonRegister} titleStyle={styles.buttonTitle} title="Discard" onPress={() => {this.props.discardFunc()}}></Button>
                </View>
            </View>
        );
    }
}