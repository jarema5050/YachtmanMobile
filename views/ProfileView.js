import * as React from 'react';
import { Text, View } from 'react-native';

export default function ProfileView({route}) {
  console.log(route.params)
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#121b31"}}>
      <Text>Profile View!</Text>
    </View>
  );
}