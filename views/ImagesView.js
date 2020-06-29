import React from 'react';
import { Text, View, ActivityIndicator, Image, StyleSheet, SliderComponent} from 'react-native';
import * as Permissions  from 'expo-permissions';
import * as Location from 'expo-location';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        margin: 20
    },
    buttonLogin: {
        backgroundColor: "#32a852"
    },
    buttonRegister: {
        backgroundColor: "#3c4ee8"
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
    componentDidMount(){
        (async () => {
            const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
            if (status === 'granted') {
                var location = await Location.getCurrentPositionAsync({});
                location = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                }
                this.setState({location: location});
            } else {
              throw new Error('Location permission not granted');
            }
        })();
    }

    uploadImageAndLocation = () => {
        console.log(JSON.stringify({
            locationDto: this.state.location,
            base64: this.props.photo.base64.slice(0,200),
            userId: this.props.userId
        }));
        fetch("https://locatedimg.azurewebsites.net/Home/AddLocatedImage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    locationDto: this.state.location,
                    base64: this.props.photo.base64,
                    userId: this.props.userId
                })
                })
                .then((res) => {
                    console.log(JSON.stringify(res));
                    if(res.status == "200"){
                        alert("Successfully added photo!");
                        this.props.navigation.goBack();
                    }
                    else
                        alert("Something went wrong. Try again later.");
                })
                .then((data) =>console.log(JSON.stringify(data)))
                .catch((err)=>console.log(err));

    }

    render(){
        if(this.state.location.latitude == null || this.state.location.longitude == null){
            return(
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                    <Image
                        style={{ flex: 3 }}
                        source={{
                            uri: this.props.photo.uri
                          }}
                    />
                    <View 
                        style={{ flex: 1, margin: 20, justifyContent: "center"}}
                    >
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                </View>
                </View>
            );   
        }
        else {
            return(
                <View style={{flex: 1, flexDirection: 'column'}}>
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
                        <Text>latitude: {this.state.location.latitude}</Text>
                        <Text>longitude: {this.state.location.longitude}</Text>
                        <Button buttonStyle ={styles.buttonRegister} title="Add photo on your location" onPress={this.uploadImageAndLocation}></Button>
                    </View>
                </View>
            );
        }
    }
}