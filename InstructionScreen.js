// InstructionScreen.js 

import React, { useState } from 'react';
import { Button, Text, StyleSheet, Image, ScrollView, Alert, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info'; 
import { v4 as uuidv4 } from 'uuid'; 
import { useNavigation } from '@react-navigation/native';

const InstructionScreen = ({ navigation }) => {
  const [deviceId, setDeviceId] = useState('');
  const [userId, setUserId] = useState('');
  const [mobileOS, setMobileOS] = useState('');


  const generateUserId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };


  const handleIdGeneration = () => {
    const model = DeviceInfo.getModel();
    setDeviceId(model);

    const userId = uuidv4();
    setUserId(userId);

    const os = Platform.OS;
    const mobileOSType = Platform.select({
      ios: 'iOS',
      android: 'Android',
      default: 'Web App',
    });
    setMobileOS(mobileOSType);

    Alert.alert(
      'ID Generation',
      `Device Model: ${model}\nUser ID: ${userId}\nMobile OS: ${mobileOSType}`,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  };


  const handleUploadDetails = () => {
    navigation.navigate('CaptureScreen', {
      deviceModel: deviceId,
      userId: userId,
      mobileOS: mobileOS,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Instructions</Text>
      <Text style={styles.instructions}>{"\n"}Before capturing the image there is few initialization need to be done to effective regeneration of the 3D models {"\n"}</Text>

      <Text style={styles.subtitle}> 1. Device and User ID Generation</Text>
      <Text style={styles.instructions}> 
        {"\n"}1. Click on the User ID Generation button to generate a unique user identification.{"\n"}
        {"\n"}2. After the user ID is generated, you can proceed to the next step. {"\n"}{"\n"}
      </Text>
      <Button
        title="ID Generation"
        onPress={handleIdGeneration} 
      />
      {userId !== '' && (
        <>
        <Text style={styles.output}>Device Model: {deviceId}</Text>
        <Text style={styles.output}>User ID: {userId}</Text>
        <Text style={styles.output}>Mobile OS: {mobileOS}</Text>
        </>
      )}


      <Text style={styles.subtitle}> 2. Capturing Images </Text>
      <Text style={styles.instructions}>
        Please read the following instructions before going to the next step. Understanding the instructions is necessary for the effective recreation of your 3D models.
        {"\n"}
        {"\n"}1. Please be at a well-lit place for taking the photos.(not too dark or not too bright){"\n"}
        {"\n"}2. Make sure the light source is in front of you, and there is no light source in behind you.{"\n"}
        {"\n"}3. Stand in front of a plain wall and rest close to the wall.{"\n"}
        {"\n"}4. Images are capturing the following pattern as the image shows. The angle of captures are mentioned as in clock hand position for easy Understanding.{"\n"}      </Text>
        <Image style={styles.image}source={require('./assets/capture-angle.png')} />
        <Text style={styles.instructions}>
        {"\n"}5. The Images are captured in three planes, In upper plane tilt the phone forward and lower plane tilt the phone backward to capture the face. {"\n"}
        {"\n"}6. You need to stand still and dont move the head till the capture process is completed{"\n"}
        {"\n"}7. For your convinience, There will be audio and on screen prompts for the angles of capture.{"\n"}
        {"\n"}8. Only Click on the whitespace in the screen after completion of voice prompt to capture the images.{"\n"}
        {"\n"}9. There will be total of 18 images to capture, and 2 for capture of your facial deformities at end of the sequence{"\n"}
        {"\n"}10. If you have no facial deformities to capture, capture image in initial position{"\n"}
        {"\n"}11. After capturing all images, you can proceed to the next step.{"\n"}
      </Text>
      
      <Button
        title="Capture Images"
        onPress={handleUploadDetails}
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