// InstructionScreen.js

import React from 'react';
import { Button, View, Text, StyleSheet,Image, ScrollView, } from 'react-native';


const InstructionScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to the Instruction Screen</Text>
      <Text style={styles.subtitle}> 1. Device ID and User ID Generation</Text>
      <Text style={styles.instructions}> 
      Before capturing the image there is few initialization need to be done to effective regeneration of the 3D models      {"\n"}{"\n"}
        {"\n"}1. The initial step is to get the device id and generate a unique id for user identifications.
        {"\n"}2. After the device id and user id are generated, you can proceed to next step. {"\n"}{"\n"}
      </Text>
      <Button
        title="ID Generation"
        onPress={() => navigation.navigate('CaptureScreen')}
      />
      <Text style={styles.subtitle}> 2. Capturing Images </Text>
      <Text style={styles.instructions}>
      Please read the following instructions before going to the next step. Understanding the instructions is necessary for the effective recreation of your 3D models.
        {"\n"}{"\n"}
        1. Please be at a well lit place for taking the photos.
        2. Move to corner of the room, then step forward from the corner in the way you can strectch both hands to the walls of the room.
         {"\n"}                        or {"\n"}     
       3. Stand in front of a plain wall, and rest close to the wall.
       
      </Text>
      <Image
        style={styles.image}
        source={require('./assets/capture-angle.png')}
      />
      <Button
        title="Calibrate Camera"
        onPress={() => navigation.navigate('CaptureScreen')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding:16,
  },
  title: {
    fontSize: 24,
    color: 'navy',
    fontWeight: 'bold',
    marginBottom: 1,
    marginHorizontal: 2,
  },
  subtitle: {
    fontSize: 20,
    color: 'navy',
    fontWeight: 'bold',
    textAlign: 'justify',
    marginTop: 10,
    marginBottom: 16,
    marginHorizontal: 2,

  },
  instructions: {
    fontSize: 16,
    color: 'black',
    textAlign: 'justify',
    marginHorizontal: 4,
  },
  image: {
    width: 350,
    height: 350,
    alignItems: 'center',
    resizeMode: 'contain', 
    marginBottom: -80,
    marginTop: -80,
    marginHorizontal: 4,
  },
});

export default InstructionScreen;