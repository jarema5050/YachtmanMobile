import React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
import AccountService from './AccountService';
class Socials extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
    }
  
    componentDidMount() {
      let endpoint = new AccountService().externalLoginProviders;
      console.log(endpoint);
      fetch(endpoint)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
            this.setState({
              isLoaded: true,
              items: result
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
    render() {
      const { error, isLoaded, items } = this.state;
      if (error) {
        return <Text>Error: {error.message}</Text>;
      } else {
        const styles = StyleSheet.create({
          container: {
            paddingVertical: 10, 
            backgroundColor: '#088DA5'
          },
        });
        return <View>
        {
          items.map((el) => (
            <Button
              title = {el.Name}
              type = "outline"
            />
          ))
        }
        </View>;
      }
    }
  }
  export default Socials;