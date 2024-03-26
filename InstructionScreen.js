// InstructionScreen.js

import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';


const InstructionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={{ color: 'navy', fontSize: 25, fontWeight: 'bold', textAlign: 'left', padding: 15 }}>
        Welcome to the Instruction Screen</Text>
      <Text style={{ color: 'black', fontSize: 14, textAlign: 'justify', padding: 15 }}> 
        Please read the instructions before going to the next step. Understanding the instructions is necessary for the effective recreation of your 3D models.{"\n"}
        {"\n"}1. Please be at a well lit place for taking the photos.
        {"\n"}2. Move to corner of the room, then step forward from the corner in the way you can strectch both hands to the walls of the room.
        {"\n"}3. Make sure to take the photos in a well lit place.
        {"\n"}4. Make sure to take the photos in a well lit place.
        {"\n"}5. Make sure to take the photos in a well lit place.
        {"\n"}6. Make sure to take the photos in a well lit place.
        {"\n"}7. Make sure to take the photos in a well lit place.
        {"\n"}8. Make sure to take the photos in a well lit place.
        {"\n"}9. Make sure to take the photos in a well lit place.
        {"\n"}10. Make sure to take the photos in a well lit place.
      </Text>
      <Button
        title="Calibrate Camera"
        onPress={() => navigation.navigate('CaptureScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 32,
  },
});

export default InstructionScreen;