import { StyleSheet, Text, View, Image } from 'react-native'; 
import React from 'react';
import { Button } from 'react-native-elements';
import ReusableStyles from '../styles/reusableStyles';
import Auth from '../services/Authentication';
import Authentication from '../services/Authentication';

const styles = StyleSheet.create({
    containerTop: {
        margin: 20,
        flex:3,
        justifyContent: 'flex-start',
        alignItems: "center"
    },
    containerBottom: {
        flex: 2,
        height: 200,
        margin: 40,
        justifyContent: "flex-end",
        paddingBottom: 60
    },
    containerGeneral: {
        backgroundColor: ReusableStyles.defaultNavy,
        flexDirection: 'column',
        alignItems: 'stretch',
        margin: 20
    },
    buttonProceedBody: {
        backgroundColor: ReusableStyles.defaultWhiteBtn,
        height: 60
    },
    buttonProceedTitle: {
        color: ReusableStyles.defaultNavy
    },
    container: {
        flex:1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "stretch",
        backgroundColor: ReusableStyles.defaultNavy
    },
    welcomeTxt: {
        color: "#fff",
        fontSize: 28
    },
    logo: {
        width: 200
    }
  });

function IntroductionView({route, navigation, task}) {
    
    return (
        <View style={styles.container}>
            
            <View style={styles.containerTop}>
                <Image
                style = {styles.logo}
                source={require('../assets/logo-1-2.png')}
                resizeMode="contain"
                />
                <Text style={styles.welcomeTxt}>Welcome to Yachtman!</Text>
            </View>
            <View style={styles.containerBottom}>
                <Authentication buttonParams={
                    {
                        parentView: styles.containerBottom,
                        styleBtnBody: styles.buttonProceedBody,
                        styleBtnTitle: styles.buttonProceedTitle,
                        titleTxt: "Start your travel"
                    }
                } task={task}>
                </Authentication>
            </View>
        </View>
    );

  }
export default IntroductionView;
