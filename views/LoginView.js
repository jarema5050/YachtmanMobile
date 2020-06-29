import {Button} from 'react-native-elements'
import React from 'react';
import {View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "stretch",
        margin: 20
    },
    textInput: { 
        height: 40,
        borderColor: "gray",
        borderWidth: 1
    },
    warningfield: {
        color: "red"
    },
    picker: {
        height: 80
    },
    buttonRegister: {
        backgroundColor: "#32a852"
    }
  });

class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                password: null,
                email: null
            },
            correctMessage : ""
        };
    }
    handleChange(name, value) {
        this.state.form[name] = value;
        console.log(this.state.form);
    }

   onSubmit = () => {
        var fetchForbidden = false;
        if(this.state.form.password === null){
            this.state.correctMessage += "Password cannot be null. "
            fetchForbidden = true;
            console.log(3);
        }
        if(this.state.form.email === null){
            this.state.correctMessage += "Email cannot be null. "
            fetchForbidden = true;
            console.log(4);
        }
        this.setState({correctMessage: this.state.correctMessage});
        if(fetchForbidden === false)
        {
            this.state.correctMessage = "";
            fetch("https://locatedimg.azurewebsites.net/Home/Login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    email: this.state.form.email,
                    password: this.state.form.password
                })
                })
                .then((response) => response.json())
                .then((json) => {
                    alert(json.message);
                    if(json.status=="Ok"){
                        this.props.navigation.navigate("Home", {email: json.email, userId: json.id})
                    }
                })
                .catch((error) => console.error(error))
        }
    }
    render(){
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View>
                        <Text>Email</Text>
                        <TextInput style={styles.textInput} onChangeText={(txt) => this.handleChange("email", txt)}/>
                    </View>
                    <View>
                        <Text>Password</Text>
                        <TextInput textContentType="password" autoCompleteType="password" style={styles.textInput} onChangeText={(txt) => this.handleChange("password", txt)}/>
                        </View>
                    <View>
                        <Text>{this.state.correctMessage}</Text>
                    </View>
                    <Button buttonStyle ={styles.buttonRegister} title="Login" onPress={this.onSubmit}></Button>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
export default LoginView;