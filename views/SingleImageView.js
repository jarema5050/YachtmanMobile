import React from 'react';
import { Text, View, Image, StyleSheet} from 'react-native';
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

  
export default class SingleImageView extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
            let params = this.props.route.params;
            return(
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <Image
                        style={{ flex: 3 }}
                        source={
                            params.image
                        }
                    />
                    <View 
                        style={{ flex: 1, margin: 20, flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'stretch'}}
                    >
                        <Text>latitude: {params.coordinate.latitude}</Text>
                        <Text>longitude: {params.coordinate.longitude}</Text>
                        </View>
                </View>
            );
    }
}