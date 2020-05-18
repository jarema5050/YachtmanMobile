import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Socials from './components/Socials';

export default function App() {
  return (
    <View style={styles.container}>
      <Socials/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
