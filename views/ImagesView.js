import React from 'react';
import { Text, View, ActivityIndicator, Image, StyleSheet} from 'react-native';
import * as Permissions  from 'expo-permissions';
import * as Location from 'expo-location';
import { Button } from 'react-native-elements';

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

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
        //var dataURL = canvas.toDataURL('image/jpeg', 0.5);
        console.log(this.props.photo.base64);
        var blob = dataURItoBlob(this.props.photo.base64);
        var data = new FormData();
        data.append("location", this.state.location);
        data.append("file", blob);
        fetch("https://locatedimg.azurewebsites.net/Home/AddLocatedImage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: data
                })
                .then((res) => {
                    res.json()
                    console.log(JSON.stringify(res))
                })
                .then((res) => console.log(res))
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