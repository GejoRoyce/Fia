import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, Image, ScrollView, Alert, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info'; // Import react-native-device-info for fetching device information
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 for generating UUIDs

const InstructionScreen = ({ navigation }) => {
  const [deviceId, setDeviceId] = useState('');
  const [userId, setUserId] = useState('');
  const [mobileOS, setMobileOS] = useState('');

  // Function to generate a unique 6-digit alphanumeric user ID
  const generateUserId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  // Function to handle ID Generation button press
  const handleIdGeneration = () => {

    // Fetch and display the device model name
    const model = DeviceInfo.getModel();
    setDeviceId(model);

    // Generate unique user ID using UUID
    const userId = uuidv4();
    setUserId(userId);

   // Detect mobile OS
    const os = Platform.OS;
    const mobileOSType = Platform.select({
      ios: 'iOS',
      android: 'Android',
      default: 'Web App',
    });
    setMobileOS(mobileOSType);

    // Show alert with device model name and user ID
    Alert.alert(
      'ID Generation',
      `Device Model: ${model}\nUser ID: ${userId}\nMobile OS: ${mobileOSType}`,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Instructions</Text>


      <Text style={styles.subtitle}> 1. Device and User ID Generation</Text>
      <Text style={styles.instructions}> 
        Before capturing the image there is few initialization need to be done to effective regeneration of the 3D models {"\n"}
        {"\n"}1. Click on the User ID Generation button to generate a unique user identification.{"\n"}
        {"\n"}2. After the user ID is generated, you can proceed to the next step. {"\n"}{"\n"}
      </Text>
      <Button
        title="ID Generation"
        onPress={handleIdGeneration} // Call handleIdGeneration function on button press
      />
      {userId !== '' && (
        <>
        <Text style={styles.output}>Device Model: {deviceId}</Text>
        <Text style={styles.output}>User ID: {userId}</Text>
        <Text style={styles.output}>Mobile OS: {mobileOS}</Text>
        </>
      )}

      
      <Text style={styles.subtitle}> 2. Identify Camera Calibration </Text>
      <Text style={styles.instructions}>
        Before capturing the images, it is important to identify the camera calibration. {"\n"} 
        {"\n"}1. Click on the Camera Calibration button to fetch the focal length, sensor size and sensor information from the camera matrix. {"\n"}
        {"\n"}2. After the camera calibration is done, you can proceed to the next step. {"\n"}
      </Text>
      <Button
        title="Fetch Camera Calibration"
        onPress={handleIdGeneration} // Call handleIdGeneration function on button press
      />


      <Text style={styles.subtitle}> 3. Capturing Images </Text>
      <Text style={styles.instructions}>
        Please read the following instructions before going to the next step. Understanding the instructions is necessary for the effective recreation of your 3D models.
        {"\n"}
        {"\n"}1. Please be at a well-lit place for taking the photos.{"\n"}
        {"\n"}2. Move to the corner of the room, then step forward from the corner in a way you can stretch both hands to the walls of the room.
        {"\n"}                        or {"\n"}     
        {"\n"}3. Stand in front of a plain wall and rest close to the wall.{"\n"}
      </Text>
      <Image
        style={styles.image}
        source={require('./assets/capture-angle.png')}
      />
      <Button
        title="Capture Images"
        onPress={() => navigation.navigate('CaptureScreen')}
      />

    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
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
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 16,
    marginHorizontal: 2,
  },
  output: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'left',
    marginHorizontal: 2,
  },
  instructions: {
    fontSize: 16,
    color: 'black',
    textAlign: 'justify',
    marginHorizontal: 4,
  },
  image: {
    width: 360,
    height: 360,
    alignItems: 'center',
    resizeMode: 'contain',
    marginBottom: -60,
    marginTop: -80,
    marginHorizontal: 4,
  },
});

export default InstructionScreen;
